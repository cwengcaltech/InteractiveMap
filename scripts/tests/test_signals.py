import pathlib
import sys

sys.path.insert(0, str(pathlib.Path(__file__).resolve().parents[1]))

import signals  # noqa: E402


def test_sma_returns_none_when_not_enough_data():
    assert signals.sma([1.0, 2.0, 3.0], 5) is None


def test_sma_averages_last_n():
    assert signals.sma([1.0, 2.0, 3.0, 4.0], 2) == 3.5


def test_pct_change_over_n_days():
    closes = [100.0] * 20 + [110.0]
    assert signals.pct_change(closes, 5) == 10.0


def test_rsi_all_gains_is_100():
    closes = [float(i) for i in range(1, 40)]
    assert signals.rsi(closes) == 100.0


def test_rsi_all_losses_is_zero():
    closes = [float(i) for i in range(40, 1, -1)]
    assert signals.rsi(closes) == 0.0


def test_golden_cross_scores_two_points():
    m = _metrics(price=100, ma_50=90, ma_200=80, return_1m=0, return_3m=0, rsi=45)
    sigs, score, _ = signals.compute_signals(m)
    assert "黃金交叉 (50日 > 200日)" in sigs
    assert "價格突破 50日均線" in sigs
    assert score == 3  # 黃金交叉 2 + 突破 50MA 1


def test_overbought_signal_scores_zero():
    m = _metrics(price=100, ma_50=110, ma_200=120, return_1m=0, return_3m=0, rsi=75)
    sigs, score, _ = signals.compute_signals(m)
    assert sigs == ["RSI 超買 (75) — 注意回檔"]
    assert score == 0


def test_strong_month_and_quarter_thresholds():
    m = _metrics(price=100, ma_50=110, ma_200=120, return_1m=10.0, return_3m=25.0, rsi=45)
    sigs, score, _ = signals.compute_signals(m)
    assert "1月強勢 +10.0%" in sigs
    assert "3月動能 +25.0%" in sigs
    assert score == 2


def test_rapid_rise_requires_month_rsi_and_above_ma50():
    hot = _metrics(price=100, ma_50=90, ma_200=80, return_1m=5.0, return_3m=0, rsi=50)
    _, _, rapid = signals.compute_signals(hot)
    assert rapid is True

    below_ma = _metrics(price=80, ma_50=90, ma_200=70, return_1m=5.0, return_3m=0, rsi=50)
    _, _, rapid = signals.compute_signals(below_ma)
    assert rapid is False


def test_new_52w_high_is_breakout_signal():
    m = _metrics(price=100, ma_50=90, ma_200=80, return_1m=0, return_3m=0, rsi=45,
                 dist_from_52w_high=-0.2)
    sigs, _, _ = signals.compute_signals(m)
    assert "近期突破" in sigs


def test_early_signals_each_score_one_point():
    m = _metrics(price=100, ma_50=90, ma_200=80, return_1m=0, return_3m=0, rsi=45,
                 dist_from_52w_high=-5.0, macd_hist_now=0.5, macd_hist_prev5=0.4)
    early, score, flag = signals.compute_early_signals(m)
    assert early == [
        "RSI 中性回升區 (45)",
        "MACD 動能轉強",
        "接近 52週高點 (-5.0%)",
        "長期上升通道整理",
    ]
    assert score == 4
    assert flag is True


def test_early_signal_flag_false_below_three_points():
    m = _metrics(price=100, ma_50=110, ma_200=120, return_1m=0, return_3m=0, rsi=45,
                 dist_from_52w_high=-30.0, macd_hist_now=0.5, macd_hist_prev5=0.4)
    early, score, flag = signals.compute_early_signals(m)
    assert early == ["RSI 中性回升區 (45)", "MACD 動能轉強"]
    assert score == 2
    assert flag is False


def test_macd_cross_takes_precedence_over_momentum():
    m = _metrics(price=100, ma_50=110, ma_200=120, rsi=60,
                 macd_hist_now=0.3, macd_hist_prev5=-0.2)
    early, _, _ = signals.compute_early_signals(m)
    assert "MACD 黃金交叉 (剛轉多)" in early
    assert "MACD 動能轉強" not in early


def test_view_type_priority_broken_trend_over_others():
    m = _metrics(price=70, ma_50=90, ma_200=80, return_1w=-15.0, return_1m=-20.0, rsi=35)
    view, view_type = signals.compute_view(m, rapid_rise=False, early_signal=False)
    assert view_type == "broken_trend"
    assert view.startswith("⚠ 趨勢轉弱")


def test_view_type_extended_when_overbought():
    m = _metrics(price=100, ma_50=90, ma_200=80, return_1m=20.0, return_3m=30.0, rsi=75)
    _, view_type = signals.compute_view(m, rapid_rise=True, early_signal=False)
    assert view_type == "extended"


def test_view_type_strong_uptrend_when_rapid_rise():
    m = _metrics(price=100, ma_50=90, ma_200=80, return_1m=20.0, return_3m=30.0, rsi=60)
    _, view_type = signals.compute_view(m, rapid_rise=True, early_signal=False)
    assert view_type == "strong_uptrend"


def test_view_type_breakout_setup_when_early_signal():
    m = _metrics(price=95, ma_50=100, ma_200=80, return_1m=-2.0, return_3m=3.0, rsi=48)
    _, view_type = signals.compute_view(m, rapid_rise=False, early_signal=True)
    assert view_type == "breakout_setup"


def test_view_type_neutral_fallback():
    m = _metrics(price=95, ma_50=100, ma_200=110, return_1m=-8.0, return_3m=-7.0, rsi=40)
    _, view_type = signals.compute_view(m, rapid_rise=False, early_signal=False)
    assert view_type == "neutral"


def _metrics(**kwargs):
    base = {
        "price": 100.0,
        "return_1w": 0.0,
        "return_1m": 0.0,
        "return_3m": 0.0,
        "return_1y": 0.0,
        "rsi": 50.0,
        "ma_50": 100.0,
        "ma_200": 100.0,
        "dist_from_52w_high": -20.0,
        "macd_hist_now": -1.0,
        "macd_hist_prev5": -1.0,
        "vol_ratio": 1.0,
    }
    base.update(kwargs)
    return base
