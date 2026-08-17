"""每日更新股價與技術訊號。

用法：
  scripts/.venv/bin/python scripts/update_prices.py            # 正常更新並寫檔
  scripts/.venv/bin/python scripts/update_prices.py --dry-run  # 只印統計，不寫檔
"""
from __future__ import annotations

import argparse
import datetime as dt
import json
import pathlib
import sys

import pandas as pd
import yfinance as yf

sys.path.insert(0, str(pathlib.Path(__file__).resolve().parent))
import fx  # noqa: E402
import signals  # noqa: E402

ROOT = pathlib.Path(__file__).resolve().parents[1]
TICKERS = ROOT / "scripts/.tickers.json"
PRICES = ROOT / "src/data/generated/prices.json"
FINANCIALS = ROOT / "src/data/generated/financials.json"
FX = ROOT / "src/data/generated/fx.json"
META = ROOT / "src/data/generated/meta.json"
HISTORY = ROOT / "data/history/prices"

CHUNK = 40
MAX_FAIL_RATIO = 0.20


def fetch_chunk(tickers: list[str]) -> dict[str, dict]:
    """抓一批 ticker 的日 K，回傳 {ticker: {closes, volumes, highs}}。

    抓 15 個月而非 1 年：一年僅約 250 個交易日，剛好不足以計算 1 年報酬率。
    """
    raw = yf.download(
        tickers,
        period="15mo",
        interval="1d",
        group_by="ticker",
        auto_adjust=True,
        threads=True,
        progress=False,
    )
    if raw is None or raw.empty:
        return {}
    out: dict[str, dict] = {}
    for t in tickers:
        try:
            if isinstance(raw.columns, pd.MultiIndex):
                if t not in raw.columns.get_level_values(0):
                    continue
                df = raw[t]
            else:
                df = raw
            df = df.dropna(subset=["Close"])
            if len(df) < 30:
                continue
            out[t] = {
                "closes": [float(x) for x in df["Close"].tolist()],
                "volumes": [float(x) for x in df["Volume"].fillna(0).tolist()],
                "highs": [float(x) for x in df["High"].dropna().tolist()],
            }
        except (KeyError, TypeError, ValueError):
            continue
    return out


def market_cap_usd(price: float, fin: dict | None, rates: dict[str, float]) -> float | None:
    """市值（十億美元）＝ 股價 × 在外流通股數 × 該報價幣別兌美元匯率。

    股數與報價幣別由每月的 update_financials.py 寫入 financials.json。
    """
    if not fin:
        return None
    shares = fin.get("shares_outstanding")
    if not shares:
        return None
    ccy = fin.get("quote_currency") or fin.get("currency") or "USD"
    rate = rates.get(ccy.upper())
    if not rate:
        return None
    return round(price * shares * rate / 1e9, 2)


def build_row(
    ticker: str,
    bars: dict,
    today: str,
    fin: dict | None = None,
    rates: dict[str, float] | None = None,
) -> dict:
    m = signals.build_metrics(bars["closes"], bars["volumes"], bars["highs"])
    sigs, score, rapid = signals.compute_signals(m)
    early, early_score, early_flag = signals.compute_early_signals(m)
    view, view_type = signals.compute_view(m, rapid, early_flag)
    return {
        "ticker": ticker,
        "price": m["price"],
        "return_1w": m["return_1w"],
        "return_1m": m["return_1m"],
        "return_3m": m["return_3m"],
        "return_1y": m["return_1y"],
        "rsi": m["rsi"],
        "ma_50": m["ma_50"],
        "ma_200": m["ma_200"],
        "signals": sigs,
        "bullish_score": score,
        "rapid_rise": rapid,
        "early_signals": early,
        "early_score": early_score,
        "early_signal": early_flag,
        "dist_from_52w_high": m["dist_from_52w_high"],
        "market_cap_usd": market_cap_usd(m["price"], fin, rates or {}),
        "view": view,
        "view_type": view_type,
        "updated": today,
    }


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--dry-run", action="store_true")
    args = parser.parse_args()

    tickers = json.loads(TICKERS.read_text(encoding="utf-8"))
    previous = json.loads(PRICES.read_text(encoding="utf-8")) if PRICES.exists() else {}
    financials = (
        json.loads(FINANCIALS.read_text(encoding="utf-8")) if FINANCIALS.exists() else {}
    )
    today = dt.date.today().isoformat()

    needed_ccy = {
        f.get("quote_currency") or f.get("currency") or "USD" for f in financials.values()
    }
    rates = fx.fetch_usd_rates(sorted(needed_ccy))
    print(f"匯率：{len(rates)} 種幣別")

    unique = sorted(set(tickers.values()))
    bars: dict[str, dict] = {}
    for i in range(0, len(unique), CHUNK):
        chunk = unique[i : i + CHUNK]
        for attempt in range(3):
            bars.update(fetch_chunk(chunk))
            missing = [t for t in chunk if t not in bars]
            if not missing:
                break
            chunk = missing
            print(f"retry {attempt + 1}: {len(missing)} tickers", file=sys.stderr)

    result: dict[str, dict] = {}
    stale = 0  # 原本有資料、本次抓取失敗 → 沿用舊值
    unavailable = 0  # 從未有行情（未上市公司等）→ 不納入結果
    for cid, ticker in tickers.items():
        if ticker in bars:
            result[cid] = build_row(
                ticker, bars[ticker], today, financials.get(cid), rates
            )
        elif cid in previous:
            row = dict(previous[cid])
            row["stale"] = True
            result[cid] = row
            stale += 1
        else:
            unavailable += 1

    fail_ratio = stale / max(len(previous), 1)
    if fail_ratio > MAX_FAIL_RATIO:
        print(
            f"ABORT: {stale}/{len(previous)} 檔既有股票抓取失敗 "
            f"({fail_ratio:.0%} > {MAX_FAIL_RATIO:.0%})",
            file=sys.stderr,
        )
        return 1

    pullback_types = {"pullback", "shallow_pullback", "healthy_pullback"}
    stats = {
        "total": len(result),
        "rapid_rise": sum(1 for r in result.values() if r.get("rapid_rise")),
        "early_signal": sum(1 for r in result.values() if r.get("early_signal")),
        "pullback": sum(
            1 for r in result.values() if r.get("view_type") in pullback_types
        ),
        "broken_trend": sum(
            1 for r in result.values() if r.get("view_type") == "broken_trend"
        ),
        "stale": stale,
        "unavailable": unavailable,
    }
    print(
        f"🚀 {stats['rapid_rise']} rapid_rise | 👀 {stats['early_signal']} early_signal | "
        f"💎 {stats['pullback']} pullback | ⚠ {stats['broken_trend']} broken_trend | "
        f"stale {stale} | 無行情 {unavailable}"
    )

    if args.dry_run:
        print("dry-run: 未寫入任何檔案")
        return 0

    FX.write_text(
        json.dumps({"updated": today, "usd_per": rates}, ensure_ascii=False, indent=2)
        + "\n",
        encoding="utf-8",
    )
    ordered = dict(sorted(result.items()))
    PRICES.write_text(
        json.dumps(ordered, ensure_ascii=False, indent=2) + "\n", encoding="utf-8"
    )
    HISTORY.mkdir(parents=True, exist_ok=True)
    (HISTORY / f"{today}.json").write_text(
        json.dumps(ordered, ensure_ascii=False) + "\n", encoding="utf-8"
    )

    meta = json.loads(META.read_text(encoding="utf-8")) if META.exists() else {}
    meta["prices_updated"] = today
    meta.setdefault("financials_updated", None)
    meta["stats"] = stats
    META.write_text(
        json.dumps(meta, ensure_ascii=False, indent=2) + "\n", encoding="utf-8"
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
