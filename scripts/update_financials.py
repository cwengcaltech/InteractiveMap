"""每月更新公司財務資料（年報/季報/分析師預估）。

用法：
  scripts/.venv/bin/python scripts/update_financials.py            # 只在每月 1 號執行
  scripts/.venv/bin/python scripts/update_financials.py --force    # 強制執行
  scripts/.venv/bin/python scripts/update_financials.py --dry-run  # 不寫檔

規則：
- 數值單位一律為「該公司幣別的十億」，與既有 unit: billion_<ccy> 一致。
- 抓不到的欄位保留既有值，絕不寫入 0 或 null 蓋掉舊資料。
- 最後套用 data/overrides/financials.json，人工修正優先權最高。
"""
from __future__ import annotations

import argparse
import datetime as dt
import json
import pathlib
import sys

import yfinance as yf

ROOT = pathlib.Path(__file__).resolve().parents[1]
TICKERS = ROOT / "scripts/.tickers.json"
FIN = ROOT / "src/data/generated/financials.json"
META = ROOT / "src/data/generated/meta.json"
OVERRIDES = ROOT / "data/overrides/financials.json"

BILLION = 1e9
MAX_FAIL_RATIO = 0.50  # 財報欄位缺漏常見（台/日/港股），門檻放寬


def _row(df, *names):
    """從 yfinance 財報 DataFrame 取一列，回傳 {期間: 值}。"""
    if df is None or df.empty:
        return {}
    for name in names:
        if name in df.index:
            return {col: df.loc[name, col] for col in df.columns}
    return {}


def _f(value):
    try:
        v = float(value)
    except (TypeError, ValueError):
        return None
    return None if v != v else v  # NaN


def build_annual(stmt) -> list[dict]:
    revenue = _row(stmt, "Total Revenue", "Operating Revenue")
    net = _row(stmt, "Net Income", "Net Income Common Stockholders")
    gross = _row(stmt, "Gross Profit")
    op = _row(stmt, "Operating Income", "EBIT")
    rows = []
    for col in sorted(revenue, key=lambda c: c.year):
        rev = _f(revenue.get(col))
        if not rev:
            continue
        ni = _f(net.get(col))
        gp = _f(gross.get(col))
        oi = _f(op.get(col))
        rows.append(
            {
                "year": col.year,
                "revenue": round(rev / BILLION, 2),
                "net_income": round(ni / BILLION, 2) if ni is not None else 0.0,
                "gross_margin": round(gp / rev, 3) if gp is not None else 0.0,
                "operating_margin": round(oi / rev, 3) if oi is not None else 0.0,
                "growth_rate": 0.0,
            }
        )
    for i in range(1, len(rows)):
        prev = rows[i - 1]["revenue"]
        if prev:
            rows[i]["growth_rate"] = round(rows[i]["revenue"] / prev - 1, 3)
    return rows[-4:]


def build_quarterly(stmt) -> list[dict]:
    revenue = _row(stmt, "Total Revenue", "Operating Revenue")
    net = _row(stmt, "Net Income", "Net Income Common Stockholders")
    gross = _row(stmt, "Gross Profit")
    rows = []
    for col in sorted(revenue, key=lambda c: (c.year, c.month)):
        rev = _f(revenue.get(col))
        if not rev:
            continue
        ni = _f(net.get(col))
        gp = _f(gross.get(col))
        rows.append(
            {
                "quarter": f"{col.year}Q{(col.month - 1) // 3 + 1}",
                "revenue": round(rev / BILLION, 2),
                "net_income": round(ni / BILLION, 2) if ni is not None else 0.0,
                "gross_margin": round(gp / rev, 3) if gp is not None else 0.0,
                "growth_rate": 0.0,
            }
        )
    for i in range(1, len(rows)):
        prev = rows[i - 1]["revenue"]
        if prev:
            rows[i]["growth_rate"] = round(rows[i]["revenue"] / prev - 1, 3)
    return rows[-5:]


def build_predictions(tk, annual: list[dict]) -> list[dict]:
    try:
        est = tk.revenue_estimate
    except Exception:  # noqa: BLE001 — yfinance 對部分市場無此資料
        return []
    if est is None or getattr(est, "empty", True):
        return []
    # yfinance 的 "0y" 是「當前會計年度」，也就是 income_stmt 最後一個已公布年度的下一年
    base_year = annual[-1]["year"] if annual else dt.date.today().year - 1
    prev_rev = annual[-1]["revenue"] if annual else None
    out = []
    for period, offset in (("0y", 1), ("+1y", 2)):
        if period not in est.index or "avg" not in est.columns:
            continue
        value = _f(est.loc[period, "avg"])
        if not value:
            continue
        rev = round(value / BILLION, 2)
        out.append(
            {
                "year": base_year + offset,
                "revenue_est": rev,
                "growth_est": round(rev / prev_rev - 1, 3) if prev_rev else 0.0,
                "source": "yfinance analyst consensus",
            }
        )
        prev_rev = rev  # 下一年的成長率以本年預估為基準
    return sorted(out, key=lambda r: r["year"])


def fetch_share_info(tk) -> tuple[int | None, str | None]:
    """回傳 (在外流通股數, 股票報價幣別)，供每日計算市值使用。

    報價幣別可能與財報幣別不同（例如 ADR），因此分開存。
    """
    shares = None
    quote_ccy = None
    try:
        shares = tk.info.get("sharesOutstanding")
        shares = int(shares) if shares else None
    except Exception:  # noqa: BLE001 — 部分市場無此欄位
        pass
    try:
        quote_ccy = tk.fast_info.get("currency")
    except Exception:  # noqa: BLE001
        pass
    return shares, (quote_ccy.upper() if quote_ccy else None)


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--force", action="store_true")
    parser.add_argument("--dry-run", action="store_true")
    args = parser.parse_args()

    today = dt.date.today()
    if today.day != 1 and not args.force:
        print("非每月 1 號，略過財務更新（--force 可強制執行）")
        return 0

    tickers = json.loads(TICKERS.read_text(encoding="utf-8"))
    existing = json.loads(FIN.read_text(encoding="utf-8"))

    updated = 0
    failed = 0
    for cid, ticker in tickers.items():
        current = existing.get(cid)
        if current is None:
            continue  # 只更新既有公司，不新增沒有手寫 profile 的條目
        try:
            tk = yf.Ticker(ticker)
            annual = build_annual(tk.income_stmt)
            quarterly = build_quarterly(tk.quarterly_income_stmt)
            predictions = build_predictions(tk, annual)
            shares, quote_ccy = fetch_share_info(tk)
        except Exception as exc:  # noqa: BLE001 — 單檔失敗不應中斷整批
            print(f"  {cid} ({ticker}) failed: {exc}", file=sys.stderr)
            failed += 1
            continue
        if not annual and not quarterly:
            failed += 1
            continue
        if annual:
            current["annual"] = annual
        if quarterly:
            current["quarterly"] = quarterly
        if predictions:
            current["predictions"] = predictions
        if shares:
            current["shares_outstanding"] = shares
        if quote_ccy:
            current["quote_currency"] = quote_ccy
        updated += 1

    ratio = failed / max(len(existing), 1)
    print(f"財務更新：{updated} 家成功、{failed} 家無資料（{ratio:.0%}）")
    if ratio > MAX_FAIL_RATIO:
        print(f"ABORT: 失敗比例 {ratio:.0%} 超過 {MAX_FAIL_RATIO:.0%}", file=sys.stderr)
        return 1

    overrides = json.loads(OVERRIDES.read_text(encoding="utf-8"))
    for cid, patch in overrides.items():
        if cid in existing:
            existing[cid].update(patch)
    if overrides:
        print(f"套用 {len(overrides)} 筆人工修正")

    if args.dry_run:
        print("dry-run: 未寫入任何檔案")
        return 0

    FIN.write_text(
        json.dumps(dict(sorted(existing.items())), ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )
    meta = json.loads(META.read_text(encoding="utf-8")) if META.exists() else {}
    meta["financials_updated"] = today.isoformat()
    META.write_text(
        json.dumps(meta, ensure_ascii=False, indent=2) + "\n", encoding="utf-8"
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
