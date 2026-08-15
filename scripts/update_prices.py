#!/usr/bin/env python3
"""Regenerate src/data/priceData.ts from yfinance.

Usage:  python3 scripts/update_prices.py
Rules were reverse-engineered from the 2026-07-24 vintage of priceData.ts so
regenerated data keeps the same schema and signal semantics:
  signals   黃金交叉 ma50>ma200 (+2 分) / 價格突破50日均線 / 1月強勢 >=10% /
            3月動能 >=25% / RSI 強勢區 50-70 / RSI 超買 >=70 (0 分) / 近期突破
  rapid_rise    1m>=5% 且 (價>ma50 或 3m>=15%)
  early_signals RSI 中性回升 40-55 / 接近52週高點 / 長期上升通道整理 /
                MACD 動能轉強 / MACD 黃金交叉 / 盤整後突破 / 成交量爆量
  early_signal  early_score>=3 且 非 rapid_rise 且 RSI<70
  view      決策樹:breakout_setup → 週跌深分支(healthy/oversold/shallow/
            pullback/broken) → 月跌深(deep_oversold/downtrend) → extended →
            strong_uptrend → steady → consolidation → neutral
"""
import json
import re
import sys
import time
from datetime import date
from pathlib import Path

import numpy as np
import pandas as pd
import yfinance as yf

ROOT = Path(__file__).resolve().parent.parent
COMPANIES = ROOT / "src" / "data" / "companies.ts"
OUT = ROOT / "src" / "data" / "priceData.ts"
TODAY = date.today().isoformat()


def company_tickers():
    src = COMPANIES.read_text()
    pairs = re.findall(r'id:\s*"([^"]+)"[\s\S]*?ticker:\s*"([^"]+)"', src)
    return dict(pairs)


def rsi14(close):
    delta = close.diff()
    up = delta.clip(lower=0).ewm(alpha=1 / 14, min_periods=14).mean()
    dn = (-delta.clip(upper=0)).ewm(alpha=1 / 14, min_periods=14).mean()
    rs = up / dn.replace(0, np.nan)
    return float((100 - 100 / (1 + rs)).iloc[-1])


def pct(close, days):
    if len(close) <= days:
        return None
    return round(float(close.iloc[-1] / close.iloc[-1 - days] - 1) * 100, 2)


def macd(close):
    ema12 = close.ewm(span=12).mean()
    ema26 = close.ewm(span=26).mean()
    line = ema12 - ema26
    sig = line.ewm(span=9).mean()
    return line, sig, line - sig


def analyze(tkr, px, vol):
    close = px.dropna()
    if len(close) < 60:
        return None
    price = float(close.iloc[-1])
    r1w, r1m, r3m, r1y = pct(close, 5), pct(close, 21), pct(close, 63), pct(close, 252)
    rsi = round(rsi14(close), 1)
    ma50 = round(float(close.rolling(50).mean().iloc[-1]), 2) if len(close) >= 50 else None
    ma200 = round(float(close.rolling(200).mean().iloc[-1]), 2) if len(close) >= 200 else None
    hi52 = float(close.tail(252).max())
    dist = round((price / hi52 - 1) * 100, 1)

    signals, score = [], 0
    if ma50 and ma200 and ma50 > ma200:
        signals.append("黃金交叉 (50日 > 200日)"); score += 2
    if ma50 and price > ma50:
        signals.append("價格突破 50日均線"); score += 1
    if r1m is not None and r1m >= 10:
        signals.append(f"1月強勢 +{r1m}%"); score += 1
    if r3m is not None and r3m >= 25:
        signals.append(f"3月動能 +{r3m}%"); score += 1
    if 50 <= rsi < 70:
        signals.append(f"RSI 強勢區 ({rsi:.0f})"); score += 1
    if rsi >= 70:
        signals.append(f"RSI 超買 ({rsi:.0f}) — 注意回檔")
    if dist >= -3 and price >= float(close.tail(60).max()) * 0.999:
        signals.append("近期突破"); score += 1

    rapid = bool(r1m is not None and r1m >= 5 and ((ma50 and price > ma50) or (r3m is not None and r3m >= 15)))

    line, sig, hist = macd(close)
    early, esc = [], 0
    if 40 <= rsi < 55:
        early.append(f"RSI 中性回升區 ({rsi:.0f})"); esc += 1
    if dist >= -10:
        early.append(f"接近 52週高點 ({dist}%)"); esc += 1
    if ma200 and price > ma200 and r1m is not None and abs(r1m) < 5 and \
       float(close.rolling(200).mean().diff(20).iloc[-1] or 0) > 0:
        early.append("長期上升通道整理"); esc += 1
    h = hist.dropna()
    if len(h) > 5 and h.iloc[-1] > h.iloc[-3] > h.iloc[-5]:
        early.append("MACD 動能轉強"); esc += 1
    cross = (line > sig) & (line.shift(5) <= sig.shift(5))
    if bool(cross.iloc[-1]):
        early.append("MACD 黃金交叉 (剛轉多)"); esc += 1
    band = close.iloc[-40:-10]
    if len(band) == 30 and (band.max() / band.min() - 1) < 0.10 and price > float(band.max()):
        early.append("盤整後突破 (2週走強)"); esc += 1
    v = vol.dropna() if vol is not None else pd.Series(dtype=float)
    if len(v) > 60 and float(v.tail(5).mean()) > 2.0 * float(v.tail(60).mean()):
        early.append("成交量爆量"); esc += 1
    early_flag = bool(esc >= 3 and not rapid and rsi < 70)

    a50 = bool(ma50 and price > ma50)
    a200 = bool(ma200 and price > ma200)
    if early_flag:
        vt, view = "breakout_setup", f"突破前夕:MACD/量能轉強,RSI {rsi:.0f}。早期介入機會"
    elif r1w is not None and r1w <= -7:
        if r1y is not None and r1y > 100 and a200:
            vt = "healthy_pullback"
            view = f"健康回檔:1週 {r1w}% 但仍在長期上升趨勢,1年 +{r1y}%。RSI {rsi:.0f}" + \
                   (",已進入超賣區,反彈機率高" if rsi < 30 else "")
        elif rsi < 20:
            vt, view = "oversold_rebound", f"超賣反彈機會:1週 {r1w}%,RSI {rsi:.0f} 進入超賣。需技術面配合確認"
        elif a50:
            vt, view = "shallow_pullback", f"淺幅回檔:1週 {r1w}% 但仍在 50日均線之上,趨勢未破。RSI {rsi:.0f}"
        elif a200:
            vt, view = "pullback", f"回檔整理:1週 {r1w}%,價格仍在 200日均線之上。RSI {rsi:.0f},觀望為宜"
        else:
            vt, view = "broken_trend", f"⚠ 趨勢轉弱:1週 {r1w}% 跌破 200日均線。RSI {rsi:.0f}。需確認支撐"
    elif r1m is not None and r1m <= -15:
        if rsi < 30:
            vt, view = "deep_oversold", f"深度超賣:1月 {r1m}%、RSI {rsi:.0f}。短線反彈機率高但需確認基本面"
        else:
            vt = "downtrend"
            view = f"⚠ 下跌趨勢:1月 {r1m}%、3月 {r3m}%。" + ("尚有 200日均線支撐" if a200 else "已破 200日均線")
    elif rsi >= 70:
        vt, view = "extended", f"強勢但偏高:1月 +{r1m}%、RSI {rsi:.0f} 超買。技術面強但宜等回檔。3月 +{r3m}%"
    elif rapid or (r1m is not None and r1m >= 10):
        vt, view = "strong_uptrend", f"強勢上漲:1月 +{r1m}%、3月 +{r3m}%。距 52週高點 {dist}%,動能延續"
    elif r1m is not None and r1m > 0 and r3m is not None and r3m > 5:
        vt, view = "steady", f"穩健上升:1月 +{r1m}%、3月 +{r3m}%。RSI {rsi:.0f},可繼續持有"
    elif r1m is not None and abs(r1m) < 5 and r3m is not None and r3m < -10:
        vt, view = "consolidation", f"區間整理:1月 {r1m}%。等待方向訊號。" + ("在 50日均線下方需警戒" if not a50 else "")
    else:
        vt, view = "neutral", f"中性:1月 {r1m}%、3月 {r3m}%。RSI {rsi:.0f}"

    return dict(ticker=tkr, price=round(price, 2), return_1w=r1w, return_1m=r1m,
                return_3m=r3m, return_1y=r1y, rsi=rsi, ma_50=ma50, ma_200=ma200,
                signals=signals, bullish_score=score, rapid_rise=rapid,
                early_signals=early, early_score=esc, early_signal=early_flag,
                dist_from_52w_high=dist, view=view, view_type=vt, updated=TODAY)


def main():
    id2tkr = company_tickers()
    tickers = sorted(set(id2tkr.values()))
    print(f"{len(id2tkr)} companies / {len(tickers)} unique tickers")
    px = yf.download(tickers, period="18mo", interval="1d", auto_adjust=True,
                     progress=False, threads=True)
    closes, vols = px["Close"], px["Volume"]
    out, missing = {}, []
    for cid, tkr in id2tkr.items():
        try:
            row = analyze(tkr, closes[tkr], vols.get(tkr))
        except Exception:
            row = None
        if row is None:
            missing.append(tkr)
            continue
        out[cid] = row
    print(f"ok {len(out)}, missing {len(missing)}: {missing[:12]}")
    if len(out) < 0.9 * len(id2tkr):
        print("too many failures — aborting without writing"); sys.exit(1)

    body = ",\n".join(f'  "{cid}": {json.dumps(row, ensure_ascii=False)}' for cid, row in out.items())
    iface = (OUT.read_text().split("export const priceData")[0]
             if OUT.exists() else "")
    iface = re.sub(r"// Auto-generated.*\n", "", iface, count=1)
    OUT.write_text(f"// Auto-generated from yfinance. Updated: {TODAY}\n" + iface.lstrip("\n") +
                   "export const priceData: Record<string, PriceData> = {\n" + body + "\n};\n")
    print(f"wrote {OUT} ({len(out)} entries, {TODAY})")


if __name__ == "__main__":
    main()
