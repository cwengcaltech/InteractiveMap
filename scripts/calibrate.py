"""把 signals.py 的規則套用在既有 prices.json 的數值上，報告一致率。

既有 prices.json 的數值欄位（price/rsi/ma/報酬率）直接當作 build_metrics 的輸出，
藉此驗證「規則」本身是否還原得出既有的 signals / score / view_type。
MACD 與成交量欄位在既有資料中不存在，校準時以既有 early_signals 反推填入，
因此 early 相關數字僅供參考。

用途分兩階段：
1. 遷移期對照人工產生的舊資料，確認規則語意一致（當時 signals 99.3%、view_type 94.1%）。
2. 之後 prices.json 由本 pipeline 產生，此腳本成為迴歸檢查：
   改動 signals.py 後若一致率掉下來，即代表既有資料會被大量重新分類。
"""
import json
import pathlib
import sys

sys.path.insert(0, str(pathlib.Path(__file__).resolve().parent))

import signals  # noqa: E402

PRICES = pathlib.Path("src/data/generated/prices.json")


def main() -> None:
    data = json.loads(PRICES.read_text(encoding="utf-8"))
    stats = {"signals": 0, "bullish_score": 0, "rapid_rise": 0, "view_type": 0}
    mismatches = {k: [] for k in stats}

    for cid, row in data.items():
        m = {
            "price": row["price"],
            "return_1w": row.get("return_1w"),
            "return_1m": row.get("return_1m"),
            "return_3m": row.get("return_3m"),
            "return_1y": row.get("return_1y"),
            "rsi": row["rsi"],
            "ma_50": row.get("ma_50"),
            "ma_200": row.get("ma_200"),
            "dist_from_52w_high": row.get("dist_from_52w_high"),
            # 既有資料沒有 MACD/量能，用既有 early_signals 反推以免干擾比對
            "macd_hist_now": 1.0
            if any(s.startswith("MACD") for s in row.get("early_signals", []))
            else -1.0,
            "macd_hist_prev5": 0.5
            if any(s.startswith("MACD 動能") for s in row.get("early_signals", []))
            else 0.0,
            "vol_ratio": 2.5
            if any(s.startswith("成交量") for s in row.get("early_signals", []))
            else 1.0,
        }
        sigs, score, rapid = signals.compute_signals(m)
        _, _, early_flag = signals.compute_early_signals(m)
        _, view_type = signals.compute_view(m, rapid, row.get("early_signal", False))

        checks = {
            "signals": sorted(sigs) == sorted(row["signals"]),
            "bullish_score": score == row["bullish_score"],
            "rapid_rise": rapid == row["rapid_rise"],
            "view_type": view_type == row.get("view_type"),
        }
        for key, ok in checks.items():
            if ok:
                stats[key] += 1
            elif len(mismatches[key]) < 5:
                mismatches[key].append(cid)

    total = len(data)
    print(f"對照 {total} 檔既有資料：")
    for key, hit in stats.items():
        pct = hit / total * 100
        print(f"  {key:14s} {hit:3d}/{total} ({pct:5.1f}%)  例外: {mismatches[key]}")


if __name__ == "__main__":
    main()
