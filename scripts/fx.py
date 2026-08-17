"""匯率抓取：把各幣別換算成美元，供跨市場比較使用。

Yahoo 的 `XXX=X` 代碼是「1 美元等於多少 XXX」，取倒數即得「1 XXX 等於多少美元」。
（`XXXUSD=X` 對台幣、韓元等部分幣別查不到資料，因此一律用短代碼。）
"""
from __future__ import annotations

import sys

import yfinance as yf


def fetch_usd_rates(currencies: list[str]) -> dict[str, float]:
    """回傳 {幣別: 1 單位等於多少美元}；USD 固定為 1.0。抓不到的幣別會被省略。"""
    rates: dict[str, float] = {"USD": 1.0}
    wanted = sorted({c.upper() for c in currencies} - {"USD"})
    for ccy in wanted:
        try:
            hist = yf.Ticker(f"{ccy}=X").history(period="5d")
            if hist.empty:
                raise ValueError("no data")
            usd_per_ccy = float(hist["Close"].iloc[-1])
            if usd_per_ccy <= 0:
                raise ValueError(f"invalid rate {usd_per_ccy}")
            rates[ccy] = round(1 / usd_per_ccy, 8)
        except Exception as exc:  # noqa: BLE001 — 單一幣別失敗不應中斷整批
            print(f"  FX {ccy} failed: {exc}", file=sys.stderr)
    return rates
