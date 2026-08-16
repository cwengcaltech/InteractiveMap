"""技術指標與訊號規則。

規則門檻由既有 src/data/generated/prices.json 反推而得：
bullish_score 權重 100% 吻合、近期突破 287/287、rapid_rise 284/287。
本模組不做任何 I/O，方便測試。
"""
from __future__ import annotations


def sma(closes: list[float], n: int) -> float | None:
    if len(closes) < n:
        return None
    return round(sum(closes[-n:]) / n, 2)


def pct_change(closes: list[float], days: int) -> float | None:
    if len(closes) <= days:
        return None
    past = closes[-1 - days]
    if past == 0:
        return None
    return round((closes[-1] / past - 1) * 100, 2)


def rsi(closes: list[float], period: int = 14) -> float:
    if len(closes) <= period:
        return 50.0
    gains, losses = [], []
    for prev, cur in zip(closes[-period - 1 : -1], closes[-period:]):
        diff = cur - prev
        gains.append(max(diff, 0.0))
        losses.append(max(-diff, 0.0))
    avg_gain = sum(gains) / period
    avg_loss = sum(losses) / period
    if avg_loss == 0:
        return 100.0 if avg_gain > 0 else 50.0
    if avg_gain == 0:
        return 0.0
    rs = avg_gain / avg_loss
    return round(100 - 100 / (1 + rs), 1)


def _ema(values: list[float], span: int) -> list[float]:
    k = 2 / (span + 1)
    out = [values[0]]
    for v in values[1:]:
        out.append(v * k + out[-1] * (1 - k))
    return out


def macd_hist(closes: list[float]) -> list[float]:
    if len(closes) < 35:
        return [0.0]
    ema12 = _ema(closes, 12)
    ema26 = _ema(closes, 26)
    macd = [a - b for a, b in zip(ema12, ema26)]
    signal_line = _ema(macd, 9)
    return [m - s for m, s in zip(macd, signal_line)]


def build_metrics(
    closes: list[float], volumes: list[float], highs: list[float]
) -> dict:
    """把一年份日 K 轉成 prices.json 需要的數值欄位。"""
    price = round(closes[-1], 2)
    hist = macd_hist(closes)
    high_52w = max(highs) if highs else price
    vol_avg = sum(volumes[-20:]) / 20 if len(volumes) >= 20 else None
    return {
        "price": price,
        "return_1w": pct_change(closes, 5),
        "return_1m": pct_change(closes, 21),
        "return_3m": pct_change(closes, 63),
        "return_1y": pct_change(closes, 250),
        "rsi": rsi(closes),
        "ma_50": sma(closes, 50),
        "ma_200": sma(closes, 200),
        "dist_from_52w_high": round((price / high_52w - 1) * 100, 1)
        if high_52w
        else 0.0,
        "macd_hist_now": hist[-1],
        "macd_hist_prev5": hist[-6] if len(hist) >= 6 else hist[0],
        "vol_ratio": round(volumes[-1] / vol_avg, 2) if vol_avg else 1.0,
    }


def _num(value, default=0.0) -> float:
    return default if value is None else value


def compute_signals(m: dict) -> tuple[list[str], int, bool]:
    """回傳 (signals, bullish_score, rapid_rise)。權重：黃金交叉 2、RSI 超買 0、其餘 1。"""
    sigs: list[str] = []
    score = 0
    price = m["price"]
    ma_50, ma_200 = m.get("ma_50"), m.get("ma_200")
    r1m, r3m = _num(m.get("return_1m")), _num(m.get("return_3m"))
    rsi_v = m["rsi"]

    if ma_50 and ma_200 and ma_50 > ma_200:
        sigs.append("黃金交叉 (50日 > 200日)")
        score += 2
    if ma_50 and price > ma_50:
        sigs.append("價格突破 50日均線")
        score += 1
    if r1m >= 10:
        sigs.append(f"1月強勢 +{r1m}%")
        score += 1
    if r3m >= 25:
        sigs.append(f"3月動能 +{r3m}%")
        score += 1
    if rsi_v >= 70:
        sigs.append(f"RSI 超買 ({rsi_v:.0f}) — 注意回檔")
    elif rsi_v >= 50:
        sigs.append(f"RSI 強勢區 ({rsi_v:.0f})")
        score += 1
    if _num(m.get("dist_from_52w_high"), -100) >= -0.4:
        sigs.append("近期突破")
        score += 1

    rapid_rise = bool(r1m >= 5 and rsi_v >= 50 and ma_50 and price > ma_50)
    return sigs, score, rapid_rise


def compute_early_signals(m: dict) -> tuple[list[str], int, bool]:
    """回傳 (early_signals, early_score, early_signal)。每項 1 分，>=3 分為 early_signal。"""
    early: list[str] = []
    price = m["price"]
    ma_50, ma_200 = m.get("ma_50"), m.get("ma_200")
    rsi_v = m["rsi"]
    r1w, r1m = _num(m.get("return_1w")), _num(m.get("return_1m"))
    dist = _num(m.get("dist_from_52w_high"), -100)
    hist_now, hist_prev = m.get("macd_hist_now", 0.0), m.get("macd_hist_prev5", 0.0)

    if 40 <= rsi_v <= 55:
        early.append(f"RSI 中性回升區 ({rsi_v:.0f})")
    if hist_now > 0 and hist_prev <= 0:
        early.append("MACD 黃金交叉 (剛轉多)")
    elif hist_now > hist_prev:
        early.append("MACD 動能轉強")
    if dist >= -10:
        early.append(f"接近 52週高點 ({dist}%)")
    if ma_200 and ma_50 and price > ma_200 and ma_50 > ma_200 and -6 <= r1m <= 5:
        early.append("長期上升通道整理")
    if r1w >= 5 and r1m < 5:
        early.append("盤整後突破 (1週走強)")
    if m.get("vol_ratio", 1.0) >= 2.0:
        early.append("成交量爆量")

    score = len(early)
    return early, score, score >= 3


def compute_view(m: dict, rapid_rise: bool, early_signal: bool) -> tuple[str, str]:
    """回傳 (view, view_type)。判斷順序即優先權。"""
    price = m["price"]
    ma_50, ma_200 = m.get("ma_50"), m.get("ma_200")
    rsi_v = m["rsi"]
    r1w, r1m = _num(m.get("return_1w")), _num(m.get("return_1m"))
    r3m, r1y = _num(m.get("return_3m")), _num(m.get("return_1y"))
    dist = _num(m.get("dist_from_52w_high"))
    above_50 = bool(ma_50 and price > ma_50)
    above_200 = bool(ma_200 and price > ma_200)

    if r1w <= -9 and not above_200:
        return (
            f"⚠ 趨勢轉弱:1週 {r1w}% 跌破 200日均線。RSI {rsi_v:.0f}。需確認支撐",
            "broken_trend",
        )
    if r1w <= -12 and above_200 and r1y >= 50:
        return (
            f"健康回檔:1週 {r1w}% 但仍在長期上升趨勢,1年 +{r1y}%。RSI {rsi_v:.0f}",
            "healthy_pullback",
        )
    if r1w <= -7.5 and above_50:
        return (
            f"淺幅回檔:1週 {r1w}% 但仍在 50日均線之上,趨勢未破。RSI {rsi_v:.0f}",
            "shallow_pullback",
        )
    if r1w <= -7.5 and above_200:
        return (
            f"回檔整理:1週 {r1w}%,價格仍在 200日均線之上。RSI {rsi_v:.0f},觀望為宜",
            "pullback",
        )
    if rsi_v >= 70:
        return (
            f"強勢但偏高:1月 +{r1m}%、RSI {rsi_v:.0f} 超買。技術面強但宜等回檔。3月 +{r3m}%",
            "extended",
        )
    # 動能足夠即視為強勢上漲；rapid_rise 另外要求站上 50 日均線，此處放寬
    if rapid_rise or (r1m >= 5 and rsi_v >= 50):
        return (
            f"強勢上漲:1月 +{r1m}%、3月 +{r3m}%。距 52週高點 {dist}%,動能延續",
            "strong_uptrend",
        )
    if early_signal:
        return (
            f"突破前夕:MACD/量能轉強,RSI {rsi_v:.0f}。早期介入機會",
            "breakout_setup",
        )
    if 0 <= r1m <= 5 and rsi_v >= 48 and above_50 and r3m >= 5:
        return (
            f"穩健上升:1月 +{r1m}%、3月 +{r3m}%。RSI {rsi_v:.0f},可繼續持有",
            "steady",
        )
    if -5 <= r1m <= 5 and not above_50 and -7 <= r1w <= 7 and rsi_v >= 40:
        return (
            f"區間整理:1月 {r1m}%。等待方向訊號。在 50日均線下方需警戒",
            "consolidation",
        )
    if r1m <= -15:
        tail = "尚有 200日均線支撐" if above_200 else "已破 200日均線"
        return (f"⚠ 下跌趨勢:1月 {r1m}%、3月 {r3m}%。{tail}", "downtrend")
    return (f"中性:1月 {r1m}%、3月 {r3m}%。RSI {rsi_v:.0f}", "neutral")
