# 自動化資料更新 Pipeline Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 建立在使用者 Mac 上每日自動執行的資料更新 pipeline，自動更新股價/技術訊號與公司財務資料，並自動 commit + push。

**Architecture:** 先把機器產生的資料從 TypeScript 檔分離成 JSON（`src/data/generated/`），既有 TS 檔改為薄包裝層以維持元件零改動；再以 Python + yfinance 產生這些 JSON；最後由 shell orchestrator + launchd 排程串起「抓取 → build 驗證 → commit → push」。

**Tech Stack:** Next.js 16 / TypeScript（既有）、Python 3.9 + yfinance 1.2 + pandas（venv）、pytest、bash、launchd、tsx（一次性遷移用）。

## Global Constraints

- Repo 根目錄：`/Users/chingchihweng/Documents/myAgents/AIGap/InteractiveMap`
- 前端元件（`src/components/`、`src/app/`）**不得修改**。資料層重構必須對元件完全透明：`priceData`、`companies`、`type Company` 三個匯出的名稱與形狀維持不變。
- 財務數值單位一律為「該公司幣別的十億」（`unit: "billion_<currency小寫>"`），例如台積電 2024 revenue = 2894.3（billion TWD）。
- 所有 Python 程式使用 repo 內 venv：`scripts/.venv/bin/python`。
- 所有新增的 shell script 需 `chmod +x`。
- 產生的檔案只有這些路徑，orchestrator 只能 `git add` 這些路徑：
  `src/data/generated/`、`data/history/`
- Commit 訊息沿用既有風格（見 Task 7），並附上：
  ```
  Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>
  ```
- 每個 Task 結束前必須 `npm run build` 通過才可 commit。

## File Structure

| 路徑 | 職責 |
|---|---|
| `src/data/generated/prices.json` | 機器產生：`Record<companyId, PriceData>` |
| `src/data/generated/financials.json` | 機器產生：`Record<companyId, Financials>` |
| `src/data/generated/meta.json` | 機器產生：更新時間戳與訊號統計 |
| `src/data/priceData.ts` | 薄包裝：型別定義 + import JSON（改寫） |
| `src/data/companyProfiles.ts` | 手寫公司資料（由 `companies.ts` 移除 financials 後產生） |
| `src/data/companies.ts` | 薄合併層：profiles + financials → `Company[]`（改寫） |
| `data/overrides/financials.json` | 人工修正財務值，優先權最高 |
| `data/history/prices/YYYY-MM-DD.json` | 每日股價快照 |
| `scripts/signals.py` | 純函式：技術指標與訊號規則（無 I/O） |
| `scripts/update_prices.py` | 每日股價抓取與寫檔 |
| `scripts/update_financials.py` | 每月財務抓取與寫檔 |
| `scripts/export_tickers.mjs` | 從 TS 資料檔匯出 id→ticker 清單 |
| `scripts/calibrate.py` | 驗證訊號規則與既有資料的一致率 |
| `scripts/daily_update.sh` | 排程進入點：抓取 → build → commit → push |
| `scripts/install_launchd.sh` | 安裝 launchd 每日排程 |
| `scripts/tests/test_signals.py` | pytest：訊號規則測試 |

---

### Task 1: 股價資料分離（prices.json + priceData.ts 包裝層）

**Files:**
- Create: `src/data/generated/prices.json`
- Create: `scripts/migrate/dump_prices.mjs`
- Modify: `src/data/priceData.ts`（整檔改寫為包裝層）
- Modify: `package.json`（新增 devDependency `tsx`）
- Modify: `.gitignore`（新增 `scripts/.venv/`、`scripts/logs/`、`__pycache__/`、`.pytest_cache/`）

**Interfaces:**
- Consumes: 既有 `src/data/priceData.ts` 的 `priceData` 匯出。
- Produces: `src/data/generated/prices.json`（`Record<string, PriceData>`）；`src/data/priceData.ts` 繼續匯出 `priceData` 與 `interface PriceData`（新增選用欄位 `stale?: boolean`）。

- [ ] **Step 1: 安裝 tsx 並記錄遷移前快照**

```bash
cd /Users/chingchihweng/Documents/myAgents/AIGap/InteractiveMap
npm install -D tsx
mkdir -p scripts/migrate src/data/generated
```

- [ ] **Step 2: 寫 dump script**

Create `scripts/migrate/dump_prices.mjs`:

```js
// 一次性遷移：把 priceData.ts 的內容 dump 成 generated/prices.json
import { writeFileSync } from "node:fs";
import { priceData } from "../../src/data/priceData.ts";

const sorted = Object.fromEntries(
  Object.entries(priceData).sort(([a], [b]) => a.localeCompare(b)),
);
writeFileSync(
  new URL("../../src/data/generated/prices.json", import.meta.url),
  JSON.stringify(sorted, null, 2) + "\n",
);
console.log(`wrote ${Object.keys(sorted).length} entries`);
```

- [ ] **Step 3: 執行 dump 並確認筆數**

Run: `npx tsx scripts/migrate/dump_prices.mjs`
Expected: `wrote 287 entries`

- [ ] **Step 4: 保存遷移前的比對基準**

```bash
npx tsx -e 'import {priceData} from "./src/data/priceData.ts"; console.log(JSON.stringify(priceData))' > /tmp/prices-before.json
```

- [ ] **Step 5: 改寫 priceData.ts 為包裝層**

整檔內容替換為：

```ts
import rawPrices from "./generated/prices.json";

export interface PriceData {
  ticker: string;
  price: number;
  return_1w: number | null;
  return_1m: number | null;
  return_3m: number | null;
  return_1y: number | null;
  rsi: number;
  ma_50?: number | null;
  ma_200?: number | null;
  signals: string[];
  bullish_score: number;
  rapid_rise: boolean;
  early_signals?: string[];
  early_score?: number;
  early_signal?: boolean;
  dist_from_52w_high?: number;
  view?: string;
  view_type?: string;
  updated: string;
  /** true 表示本次更新抓取失敗、沿用前次資料 */
  stale?: boolean;
}

export const priceData: Record<string, PriceData> = rawPrices as Record<
  string,
  PriceData
>;
```

- [ ] **Step 6: 驗證資料內容完全一致**

```bash
npx tsx -e 'import {priceData} from "./src/data/priceData.ts"; console.log(JSON.stringify(priceData))' > /tmp/prices-after.json
node -e '
const a=require("/tmp/prices-before.json"), b=require("/tmp/prices-after.json");
const ka=Object.keys(a).sort(), kb=Object.keys(b).sort();
if(JSON.stringify(ka)!==JSON.stringify(kb)) throw new Error("key set differs");
for(const k of ka){ if(JSON.stringify(a[k])!==JSON.stringify(b[k])) throw new Error("value differs: "+k); }
console.log("IDENTICAL", ka.length, "entries");
'
```

Expected: `IDENTICAL 287 entries`

- [ ] **Step 7: 更新 .gitignore**

在 `.gitignore` 末尾附加：

```
# python pipeline
scripts/.venv/
scripts/logs/
__pycache__/
.pytest_cache/
```

- [ ] **Step 8: build 驗證**

Run: `npm run build`
Expected: `✓ Compiled successfully`，且路由列表與遷移前相同（`/`、`/_not-found`、`/[category]/[slug]`）

- [ ] **Step 9: Commit**

```bash
git add src/data/generated/prices.json src/data/priceData.ts scripts/migrate/dump_prices.mjs package.json package-lock.json .gitignore
git commit -m "refactor: extract price data to generated/prices.json

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 2: 財務資料分離（financials.json + companyProfiles.ts + 合併層）

**Files:**
- Create: `src/data/generated/financials.json`
- Create: `src/data/companyProfiles.ts`（由既有 `companies.ts` 機械化產生）
- Create: `scripts/migrate/dump_financials.mjs`
- Create: `scripts/migrate/strip_financials.py`
- Create: `data/overrides/financials.json`（內容為 `{}`）
- Modify: `src/data/companies.ts`（整檔改寫為合併層）

**Interfaces:**
- Consumes: Task 1 的 `src/data/generated/` 目錄與 `tsx`。
- Produces:
  - `src/data/companyProfiles.ts`：`export interface CompanyProfile`（等同舊 `Company` 但無 `financials`）、`export const companyProfiles: CompanyProfile[]`
  - `src/data/companies.ts`：`export interface Financials`、`export interface Company extends CompanyProfile { financials: Financials }`、`export const companies: Company[]`
  - `src/data/generated/financials.json`：`Record<companyId, Financials>`

- [ ] **Step 1: 保存比對基準並 dump financials**

Create `scripts/migrate/dump_financials.mjs`:

```js
// 一次性遷移：把 companies.ts 各公司的 financials dump 成 generated/financials.json
import { writeFileSync } from "node:fs";
import { companies } from "../../src/data/companies.ts";

const out = {};
for (const c of companies) out[c.id] = c.financials;
writeFileSync(
  new URL("../../src/data/generated/financials.json", import.meta.url),
  JSON.stringify(out, null, 2) + "\n",
);
console.log(`wrote ${Object.keys(out).length} entries`);
```

Run:

```bash
npx tsx -e 'import {companies} from "./src/data/companies.ts"; console.log(JSON.stringify(companies))' > /tmp/companies-before.json
npx tsx scripts/migrate/dump_financials.mjs
```

Expected: `wrote 292 entries`

- [ ] **Step 2: 寫 strip script（把 financials 區塊從 TS 文字中移除）**

Create `scripts/migrate/strip_financials.py`:

```python
"""一次性遷移：從 companies.ts 移除 financials 區塊，產生 companyProfiles.ts。

以大括號配對切除 `financials: { ... },` 整段，保留所有手寫內容與註解。
"""
import pathlib
import re

SRC = pathlib.Path("src/data/companies.ts")
DST = pathlib.Path("src/data/companyProfiles.ts")

text = SRC.read_text(encoding="utf-8")

# 1. 移除 interface 中的 financials 型別區塊
iface_start = text.index("export interface Company {")
iface_end = text.index("\n}", iface_start) + 2
iface = text[iface_start:iface_end]
fin_start = iface.index("  financials: {")
fin_end = iface.index("\n  };", fin_start) + len("\n  };\n")
new_iface = (iface[:fin_start] + iface[fin_end:]).replace(
    "export interface Company {", "export interface CompanyProfile {"
)
text = text[:iface_start] + new_iface + text[iface_end:]

# 2. 移除每家公司的 financials 物件
out = []
i = 0
removed = 0
marker = "    financials: {"
while True:
    j = text.find(marker, i)
    if j == -1:
        out.append(text[i:])
        break
    out.append(text[i:j])
    depth = 0
    k = text.index("{", j)
    while True:
        if text[k] == "{":
            depth += 1
        elif text[k] == "}":
            depth -= 1
            if depth == 0:
                break
        k += 1
    k += 1
    if text[k] == ",":
        k += 1
    if text[k] == "\n":
        k += 1
    i = k
    removed += 1

text = "".join(out)

# 3. 改名匯出
text = text.replace(
    "export const companies: Company[] = [",
    "export const companyProfiles: CompanyProfile[] = [",
)
text = re.sub(r"\n{3,}", "\n\n", text)

DST.write_text(text, encoding="utf-8")
print(f"removed {removed} financials blocks -> {DST}")
```

- [ ] **Step 3: 執行 strip 並確認移除筆數**

Run: `python3 scripts/migrate/strip_financials.py`
Expected: `removed 292 financials blocks -> src/data/companyProfiles.ts`

- [ ] **Step 4: 改寫 companies.ts 為合併層**

整檔內容替換為：

```ts
import { companyProfiles, type CompanyProfile } from "./companyProfiles";
import rawFinancials from "./generated/financials.json";

export type { CompanyProfile };

export interface AnnualFinancial {
  year: number;
  revenue: number;
  net_income: number;
  gross_margin: number;
  operating_margin: number;
  growth_rate: number;
}

export interface QuarterlyFinancial {
  quarter: string;
  revenue: number;
  net_income: number;
  gross_margin: number;
  growth_rate: number;
}

export interface PredictionFinancial {
  year: number;
  revenue_est: number;
  growth_est: number;
  source: string;
}

export interface Financials {
  currency: string;
  unit: string;
  annual: AnnualFinancial[];
  quarterly: QuarterlyFinancial[];
  predictions: PredictionFinancial[];
}

export interface Company extends CompanyProfile {
  financials: Financials;
}

const financialsById = rawFinancials as Record<string, Financials>;

const EMPTY_FINANCIALS: Financials = {
  currency: "USD",
  unit: "billion_usd",
  annual: [],
  quarterly: [],
  predictions: [],
};

export const companies: Company[] = companyProfiles.map((profile) => ({
  ...profile,
  financials: financialsById[profile.id] ?? EMPTY_FINANCIALS,
}));
```

- [ ] **Step 5: 建立 overrides 檔**

```bash
mkdir -p data/overrides
printf '{}\n' > data/overrides/financials.json
```

- [ ] **Step 6: 驗證合併後資料與遷移前完全一致**

```bash
npx tsx -e 'import {companies} from "./src/data/companies.ts"; console.log(JSON.stringify(companies))' > /tmp/companies-after.json
node -e '
const a=require("/tmp/companies-before.json"), b=require("/tmp/companies-after.json");
if(a.length!==b.length) throw new Error("length differs "+a.length+" vs "+b.length);
const norm=(c)=>JSON.stringify(Object.keys(c).sort().reduce((o,k)=>(o[k]=c[k],o),{}));
for(let i=0;i<a.length;i++){ if(norm(a[i])!==norm(b[i])) throw new Error("company differs: "+a[i].id); }
console.log("IDENTICAL", a.length, "companies");
'
```

Expected: `IDENTICAL 292 companies`

- [ ] **Step 7: build 驗證**

Run: `npm run build`
Expected: `✓ Compiled successfully`，TypeScript 無錯誤

- [ ] **Step 8: Commit**

```bash
git add src/data/generated/financials.json src/data/companyProfiles.ts src/data/companies.ts scripts/migrate/ data/overrides/financials.json
git commit -m "refactor: split company financials into generated/financials.json

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 3: Python 環境與訊號規則模組（TDD）

**Files:**
- Create: `scripts/requirements.txt`
- Create: `scripts/setup.sh`
- Create: `scripts/signals.py`
- Create: `scripts/tests/test_signals.py`

**Interfaces:**
- Consumes: 無（純函式模組）。
- Produces: `scripts/signals.py` 匯出以下函式，供 Task 4/5 使用：
  - `sma(closes: list[float], n: int) -> float | None`
  - `rsi(closes: list[float], period: int = 14) -> float`
  - `macd_hist(closes: list[float]) -> list[float]`
  - `pct_change(closes: list[float], days: int) -> float | None`
  - `build_metrics(closes, volumes, highs) -> dict`
  - `compute_signals(m: dict) -> tuple[list[str], int, bool]` → `(signals, bullish_score, rapid_rise)`
  - `compute_early_signals(m: dict) -> tuple[list[str], int, bool]` → `(early_signals, early_score, early_signal)`
  - `compute_view(m: dict, rapid_rise: bool, early_signal: bool) -> tuple[str, str]` → `(view, view_type)`

  `build_metrics` 回傳的 dict 欄位（Task 5 直接寫入 JSON）：
  `price, return_1w, return_1m, return_3m, return_1y, rsi, ma_50, ma_200,
   dist_from_52w_high, macd_hist_now, macd_hist_prev5, vol_ratio`

- [ ] **Step 1: 建立 venv 與相依套件**

Create `scripts/requirements.txt`:

```
yfinance>=1.2.0
pandas>=2.0
pytest>=8.0
```

Create `scripts/setup.sh`:

```bash
#!/usr/bin/env bash
# 建立 pipeline 專用 venv 並安裝相依套件
set -euo pipefail
cd "$(dirname "$0")"
python3 -m venv .venv
./.venv/bin/pip install --upgrade pip
./.venv/bin/pip install -r requirements.txt
echo "venv ready: $(pwd)/.venv"
```

Run:

```bash
chmod +x scripts/setup.sh
./scripts/setup.sh
```

Expected: 最後一行印出 `venv ready: .../scripts/.venv`

- [ ] **Step 2: 寫失敗測試**

Create `scripts/tests/test_signals.py`:

```python
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


def test_early_signal_flag_needs_score_three():
    m = _metrics(price=100, ma_50=90, ma_200=80, return_1m=0, return_3m=0, rsi=45,
                 dist_from_52w_high=-5.0, macd_hist_now=0.5, macd_hist_prev5=0.4)
    early, score, flag = signals.compute_early_signals(m)
    assert "RSI 中性回升區 (45)" in early
    assert "接近 52週高點 (-5.0%)" in early
    assert "MACD 動能轉強" in early
    assert score == 3
    assert flag is True


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
```

- [ ] **Step 3: 執行測試確認失敗**

Run: `scripts/.venv/bin/pytest scripts/tests/test_signals.py -q`
Expected: FAIL — `ModuleNotFoundError: No module named 'signals'`

- [ ] **Step 4: 實作 signals.py**

Create `scripts/signals.py`:

```python
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
        "vol_ratio": round(volumes[-1] / vol_avg, 2)
        if vol_avg
        else 1.0,
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
    if rapid_rise:
        return (
            f"強勢上漲:1月 +{r1m}%、3月 +{r3m}%。距 52週高點 {dist}%,動能延續",
            "strong_uptrend",
        )
    if early_signal:
        return (
            f"突破前夕:MACD/量能轉強,RSI {rsi_v:.0f}。早期介入機會",
            "breakout_setup",
        )
    if 0 <= r1m <= 5 and rsi_v >= 48 and above_50:
        return (
            f"穩健上升:1月 +{r1m}%、3月 +{r3m}%。RSI {rsi_v:.0f},可繼續持有",
            "steady",
        )
    if -5 <= r1m <= 5 and not above_50:
        return (
            f"區間整理:1月 {r1m}%。等待方向訊號。在 50日均線下方需警戒",
            "consolidation",
        )
    if r1m <= -15:
        tail = "尚有 200日均線支撐" if above_200 else "已破 200日均線"
        return (f"⚠ 下跌趨勢:1月 {r1m}%、3月 {r3m}%。{tail}", "downtrend")
    return (f"中性:1月 {r1m}%、3月 {r3m}%。RSI {rsi_v:.0f}", "neutral")
```

- [ ] **Step 5: 執行測試確認全數通過**

Run: `scripts/.venv/bin/pytest scripts/tests/test_signals.py -q`
Expected: `16 passed`

- [ ] **Step 6: Commit**

```bash
git add scripts/requirements.txt scripts/setup.sh scripts/signals.py scripts/tests/test_signals.py
git commit -m "feat: add technical signal rules module with tests

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 4: 規則校準腳本（對照既有資料）

**Files:**
- Create: `scripts/calibrate.py`

**Interfaces:**
- Consumes: `scripts/signals.py` 的 `compute_signals` / `compute_early_signals` / `compute_view`；`src/data/generated/prices.json`。
- Produces: 終端報表，列出各欄位與既有資料的一致率。無寫檔。

- [ ] **Step 1: 寫 calibrate.py**

Create `scripts/calibrate.py`:

```python
"""把 signals.py 的規則套用在既有 prices.json 的數值上，報告一致率。

既有 prices.json 的數值欄位（price/rsi/ma/報酬率）直接當作 build_metrics 的輸出，
藉此驗證「規則」本身是否還原得出既有的 signals / score / view_type。
MACD 與成交量欄位在既有資料中不存在，校準時以既有 early_signals 反推填入，
因此 early 相關數字僅供參考。
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
```

- [ ] **Step 2: 執行校準**

Run: `scripts/.venv/bin/python scripts/calibrate.py`
Expected: 各欄位一致率如下（低於此門檻表示規則被改壞，需回頭修 `signals.py`）：
- `signals` ≥ 95%
- `bullish_score` ≥ 95%
- `rapid_rise` ≥ 95%
- `view_type` ≥ 85%

- [ ] **Step 3: Commit**

```bash
git add scripts/calibrate.py
git commit -m "test: add signal rule calibration against existing price data

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 5: 每日股價更新（ticker 匯出 + update_prices.py）

**Files:**
- Create: `scripts/export_tickers.mjs`
- Create: `scripts/update_prices.py`
- Create: `data/history/prices/.gitkeep`

**Interfaces:**
- Consumes: `scripts/signals.py`（Task 3）；`src/data/companyProfiles.ts` 與 `src/data/topics.ts`。
- Produces:
  - `scripts/export_tickers.mjs` → 寫出 `scripts/.tickers.json`：`{ [companyId]: ticker }`
  - `scripts/update_prices.py` → 覆寫 `src/data/generated/prices.json`、寫入 `data/history/prices/YYYY-MM-DD.json`、更新 `src/data/generated/meta.json`
  - `meta.json` 形狀：
    ```json
    { "prices_updated": "YYYY-MM-DD",
      "financials_updated": "YYYY-MM-DD",
      "stats": { "total": 0, "rapid_rise": 0, "early_signal": 0, "pullback": 0, "broken_trend": 0, "stale": 0 } }
    ```

- [ ] **Step 1: 寫 ticker 匯出腳本**

Create `scripts/export_tickers.mjs`:

```js
// 從 TS 資料檔匯出 id -> ticker 清單，供 Python pipeline 使用。
// 之後在 companyProfiles.ts / topics.ts 新增公司，pipeline 下次執行會自動納入。
import { writeFileSync } from "node:fs";
import { companyProfiles } from "../src/data/companyProfiles.ts";
import { topics } from "../src/data/topics.ts";

const tickers = {};
for (const c of companyProfiles) {
  if (c.ticker) tickers[c.id] = c.ticker;
}
for (const topic of topics) {
  if (topic.category === "hl") continue; // 健康主題無股票資料
  for (const section of topic.sections) {
    for (const c of section.companies) {
      if (c.ticker && !tickers[c.id]) tickers[c.id] = c.ticker;
    }
  }
}

const sorted = Object.fromEntries(
  Object.entries(tickers).sort(([a], [b]) => a.localeCompare(b)),
);
writeFileSync(
  new URL("./.tickers.json", import.meta.url),
  JSON.stringify(sorted, null, 2) + "\n",
);
console.log(`exported ${Object.keys(sorted).length} tickers`);
```

- [ ] **Step 2: 執行匯出並確認涵蓋現有資料**

```bash
npx tsx scripts/export_tickers.mjs
node -e '
const t=require("./scripts/.tickers.json"), p=require("./src/data/generated/prices.json");
const missing=Object.keys(p).filter(k=>!t[k]);
console.log("tickers:",Object.keys(t).length,"prices:",Object.keys(p).length,"missing from tickers:",missing.length, missing.slice(0,10));
'
```

Expected: `missing from tickers: 0`。若非 0，表示 `export_tickers.mjs` 漏掉某些來源，需修正後重跑。

在 `.gitignore` 附加一行：

```
scripts/.tickers.json
```

- [ ] **Step 3: 寫 update_prices.py**

Create `scripts/update_prices.py`:

```python
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

import yfinance as yf

sys.path.insert(0, str(pathlib.Path(__file__).resolve().parent))
import signals  # noqa: E402

ROOT = pathlib.Path(__file__).resolve().parents[1]
TICKERS = ROOT / "scripts/.tickers.json"
PRICES = ROOT / "src/data/generated/prices.json"
META = ROOT / "src/data/generated/meta.json"
HISTORY = ROOT / "data/history/prices"

CHUNK = 40
MAX_FAIL_RATIO = 0.20


def fetch_chunk(tickers: list[str]) -> dict[str, dict]:
    """抓一批 ticker 的一年日 K，回傳 {ticker: {closes, volumes, highs}}。"""
    raw = yf.download(
        tickers,
        period="1y",
        interval="1d",
        group_by="ticker",
        auto_adjust=True,
        threads=True,
        progress=False,
    )
    out: dict[str, dict] = {}
    for t in tickers:
        try:
            df = raw[t] if len(tickers) > 1 else raw
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


def build_row(ticker: str, bars: dict, today: str) -> dict:
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
    today = dt.date.today().isoformat()

    unique = sorted(set(tickers.values()))
    bars: dict[str, dict] = {}
    for i in range(0, len(unique), CHUNK):
        chunk = unique[i : i + CHUNK]
        for attempt in range(3):
            fetched = fetch_chunk(chunk)
            bars.update(fetched)
            missing = [t for t in chunk if t not in bars]
            if not missing:
                break
            chunk = missing
            print(f"retry {attempt + 1}: {len(missing)} tickers", file=sys.stderr)

    result: dict[str, dict] = {}
    stale = 0
    for cid, ticker in tickers.items():
        if ticker in bars:
            result[cid] = build_row(ticker, bars[ticker], today)
        elif cid in previous:
            row = dict(previous[cid])
            row["stale"] = True
            result[cid] = row
            stale += 1
        else:
            stale += 1

    fail_ratio = stale / max(len(tickers), 1)
    if fail_ratio > MAX_FAIL_RATIO:
        print(
            f"ABORT: {stale}/{len(tickers)} tickers failed "
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
    }
    print(
        f"🚀 {stats['rapid_rise']} rapid_rise | 👀 {stats['early_signal']} early_signal | "
        f"💎 {stats['pullback']} pullback | ⚠ {stats['broken_trend']} broken_trend | "
        f"stale {stale}/{len(tickers)}"
    )

    if args.dry_run:
        print("dry-run: 未寫入任何檔案")
        return 0

    ordered = dict(sorted(result.items()))
    PRICES.write_text(json.dumps(ordered, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    HISTORY.mkdir(parents=True, exist_ok=True)
    (HISTORY / f"{today}.json").write_text(
        json.dumps(ordered, ensure_ascii=False) + "\n", encoding="utf-8"
    )

    meta = json.loads(META.read_text(encoding="utf-8")) if META.exists() else {}
    meta["prices_updated"] = today
    meta.setdefault("financials_updated", None)
    meta["stats"] = stats
    META.write_text(json.dumps(meta, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
```

- [ ] **Step 4: 以 dry-run 驗證（不寫檔）**

```bash
mkdir -p data/history/prices && touch data/history/prices/.gitkeep
scripts/.venv/bin/python scripts/update_prices.py --dry-run
```

Expected: 印出一行 `🚀 N rapid_rise | 👀 N early_signal | 💎 N pullback | ⚠ N broken_trend | stale N/M`，
其中 `stale` 佔比 < 20%，最後一行 `dry-run: 未寫入任何檔案`。若 stale 過高，先確認網路與 ticker 代碼。

- [ ] **Step 5: 實際執行並確認產出**

```bash
scripts/.venv/bin/python scripts/update_prices.py
ls data/history/prices/
node -e 'const p=require("./src/data/generated/prices.json");const k=Object.keys(p);console.log(k.length,"entries, sample:",JSON.stringify(p[k[0]]).slice(0,200));'
cat src/data/generated/meta.json
```

Expected: `data/history/prices/` 出現今日日期的 JSON；`meta.json` 含 `prices_updated` 與 `stats`。

- [ ] **Step 6: build 驗證**

Run: `npm run build`
Expected: `✓ Compiled successfully`

- [ ] **Step 7: Commit**

```bash
git add scripts/export_tickers.mjs scripts/update_prices.py .gitignore \
        src/data/generated/prices.json src/data/generated/meta.json data/history/
git commit -m "feat: add daily price update pipeline

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 6: 每月財務更新（update_financials.py + overrides）

**Files:**
- Create: `scripts/update_financials.py`
- Modify: `src/data/generated/financials.json`（執行後由腳本更新）
- Modify: `src/data/generated/meta.json`（新增 `financials_updated`）

**Interfaces:**
- Consumes: `scripts/.tickers.json`（Task 5）、`src/data/generated/financials.json`（既有值作為預設）、`data/overrides/financials.json`。
- Produces: 更新後的 `src/data/generated/financials.json`（形狀同 Task 2 的 `Financials`），`meta.json.financials_updated`。

- [ ] **Step 1: 寫 update_financials.py**

Create `scripts/update_financials.py`:

```python
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
    except Exception:
        return []
    if est is None or getattr(est, "empty", True):
        return []
    base_year = annual[-1]["year"] if annual else dt.date.today().year - 1
    base_rev = annual[-1]["revenue"] if annual else None
    out = []
    for period, label in (("+1y", 1), ("0y", 0)):
        if period not in est.index or "avg" not in est.columns:
            continue
        value = _f(est.loc[period, "avg"])
        if not value:
            continue
        rev = round(value / BILLION, 2)
        out.append(
            {
                "year": base_year + label,
                "revenue_est": rev,
                "growth_est": round(rev / base_rev - 1, 3) if base_rev else 0.0,
                "source": "yfinance analyst consensus",
            }
        )
    return sorted(out, key=lambda r: r["year"])


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
    META.write_text(json.dumps(meta, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    return 0
```

檔案結尾加上：

```python


if __name__ == "__main__":
    raise SystemExit(main())
```

- [ ] **Step 2: 驗證非 1 號時會跳過**

Run: `scripts/.venv/bin/python scripts/update_financials.py`
Expected（若今天不是 1 號）: `非每月 1 號，略過財務更新（--force 可強制執行）`

- [ ] **Step 3: 以 dry-run 驗證抓取邏輯**

Run: `scripts/.venv/bin/python scripts/update_financials.py --force --dry-run`
Expected: 印出 `財務更新：N 家成功、M 家無資料（X%）`，X < 50%，最後 `dry-run: 未寫入任何檔案`

- [ ] **Step 4: 驗證 overrides 生效**

```bash
cat > /tmp/ov-test.json <<'JSON'
{ "tsmc": { "currency": "TWD", "unit": "billion_twd" } }
JSON
cp data/overrides/financials.json /tmp/ov-backup.json
cp /tmp/ov-test.json data/overrides/financials.json
scripts/.venv/bin/python scripts/update_financials.py --force --dry-run | grep "人工修正"
cp /tmp/ov-backup.json data/overrides/financials.json
```

Expected: 出現 `套用 1 筆人工修正`

- [ ] **Step 5: 實際執行並 build 驗證**

```bash
scripts/.venv/bin/python scripts/update_financials.py --force
npm run build
```

Expected: build `✓ Compiled successfully`

- [ ] **Step 6: 檢查財務數值合理性（防止單位錯誤）**

```bash
node -e '
const f=require("./src/data/generated/financials.json");
const t=f.tsmc.annual.at(-1), n=f.nvidia.annual.at(-1);
console.log("tsmc", t); console.log("nvidia", n);
if(t.revenue < 1000 || t.revenue > 10000) throw new Error("TSMC revenue 單位可能有誤 (應為千級 billion TWD)");
if(n.revenue < 50 || n.revenue > 1000) throw new Error("NVIDIA revenue 單位可能有誤 (應為百級 billion USD)");
console.log("單位檢查通過");
'
```

Expected: `單位檢查通過`。若失敗，檢查 `BILLION` 換算與 `currency` 是否對應。

- [ ] **Step 7: Commit**

```bash
git add scripts/update_financials.py src/data/generated/financials.json src/data/generated/meta.json
git commit -m "feat: add monthly financials update pipeline

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 7: 每日排程 orchestrator（含 git 自動化）

**Files:**
- Create: `scripts/daily_update.sh`

**Interfaces:**
- Consumes: `scripts/export_tickers.mjs`、`scripts/update_prices.py`、`scripts/update_financials.py`。
- Produces: 可執行的 `scripts/daily_update.sh`；log 寫入 `scripts/logs/update-YYYY-MM-DD.log`。

- [ ] **Step 1: 寫 orchestrator**

Create `scripts/daily_update.sh`:

```bash
#!/usr/bin/env bash
# 每日資料更新：抓取 → build 驗證 → commit → push
# 由 launchd 呼叫；也可手動執行。加 --no-push 只 commit 不推送。
set -uo pipefail

REPO="$(cd "$(dirname "$0")/.." && pwd)"
cd "$REPO"

LOG_DIR="$REPO/scripts/logs"
mkdir -p "$LOG_DIR"
LOG="$LOG_DIR/update-$(date +%F).log"
exec >>"$LOG" 2>&1

PUSH=1
[ "${1:-}" = "--no-push" ] && PUSH=0

PATH="/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin"
PY="$REPO/scripts/.venv/bin/python"

fail() { echo "[$(date +%T)] FAILED: $1"; exit 1; }

echo "=== $(date '+%F %T') 開始更新 ==="

git rev-parse --abbrev-ref HEAD | grep -qx main || fail "不在 main 分支，中止"

git pull --rebase origin main || { git rebase --abort 2>/dev/null; fail "git pull --rebase"; }

npx tsx scripts/export_tickers.mjs || fail "export_tickers"

STATS="$("$PY" scripts/update_prices.py | tail -1)" || fail "update_prices"
echo "$STATS"

if [ "$(date +%d)" = "01" ]; then
  "$PY" scripts/update_financials.py || fail "update_financials"
fi

npm run build || fail "npm run build（資料已寫入工作區，未 commit，請人工檢查）"

git add src/data/generated data/history
if git diff --cached --quiet; then
  echo "無資料變動，結束"
  exit 0
fi

git commit -m "update: refresh price data + technical views

$STATS

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>" || fail "git commit"

if [ "$PUSH" = "1" ]; then
  git push origin main || echo "push 失敗，保留本地 commit，下次執行會一併推送"
fi

echo "=== $(date '+%F %T') 完成 ==="
```

- [ ] **Step 2: 賦予執行權限並以 --no-push 試跑**

```bash
chmod +x scripts/daily_update.sh
./scripts/daily_update.sh --no-push
cat "scripts/logs/update-$(date +%F).log"
```

Expected: log 內出現 `開始更新`、統計行、`完成`；`git log -1` 顯示新的 `update: refresh price data + technical views` commit（或 `無資料變動，結束`）。

- [ ] **Step 3: 驗證未追蹤的其他改動不會被誤 commit**

```bash
echo "scratch" > /tmp/probe.txt && cp /tmp/probe.txt src/data/PROBE.txt
./scripts/daily_update.sh --no-push
git status --short src/data/PROBE.txt
rm src/data/PROBE.txt
```

Expected: `?? src/data/PROBE.txt` 仍為未追蹤狀態，未被納入 commit。

- [ ] **Step 4: Commit**

```bash
git add scripts/daily_update.sh
git commit -m "feat: add daily update orchestrator with git automation

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 8: launchd 排程安裝與文件

**Files:**
- Create: `scripts/install_launchd.sh`
- Create: `scripts/README.md`
- Modify: `README.md`（新增「資料更新」段落）

**Interfaces:**
- Consumes: `scripts/daily_update.sh`（Task 7）。
- Produces: `~/Library/LaunchAgents/com.interactivemap.daily-update.plist`；使用說明文件。

- [ ] **Step 1: 寫安裝腳本**

Create `scripts/install_launchd.sh`:

```bash
#!/usr/bin/env bash
# 安裝 launchd 每日排程（21:00）。重跑此腳本即可更新設定。
# 移除排程：launchctl bootout gui/$(id -u)/com.interactivemap.daily-update
set -euo pipefail

REPO="$(cd "$(dirname "$0")/.." && pwd)"
LABEL="com.interactivemap.daily-update"
PLIST="$HOME/Library/LaunchAgents/$LABEL.plist"
HOUR="${1:-21}"

mkdir -p "$HOME/Library/LaunchAgents"
cat > "$PLIST" <<PLISTEOF
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>Label</key><string>$LABEL</string>
  <key>ProgramArguments</key>
  <array>
    <string>/bin/bash</string>
    <string>$REPO/scripts/daily_update.sh</string>
  </array>
  <key>WorkingDirectory</key><string>$REPO</string>
  <key>StartCalendarInterval</key>
  <dict>
    <key>Hour</key><integer>$HOUR</integer>
    <key>Minute</key><integer>0</integer>
  </dict>
  <key>StandardOutPath</key><string>$REPO/scripts/logs/launchd.out.log</string>
  <key>StandardErrorPath</key><string>$REPO/scripts/logs/launchd.err.log</string>
</dict>
</plist>
PLISTEOF

mkdir -p "$REPO/scripts/logs"
launchctl bootout "gui/$(id -u)/$LABEL" 2>/dev/null || true
launchctl bootstrap "gui/$(id -u)" "$PLIST"
echo "已安裝：每日 ${HOUR}:00 執行 $REPO/scripts/daily_update.sh"
launchctl print "gui/$(id -u)/$LABEL" | grep -E "state|program" | head -5
```

- [ ] **Step 2: 安裝並確認已載入**

```bash
chmod +x scripts/install_launchd.sh
./scripts/install_launchd.sh
launchctl list | grep interactivemap
```

Expected: `launchctl list` 出現 `com.interactivemap.daily-update` 一列。

- [ ] **Step 3: 手動觸發一次驗證排程可執行**

```bash
launchctl kickstart -k "gui/$(id -u)/com.interactivemap.daily-update"
sleep 60
tail -20 "scripts/logs/update-$(date +%F).log"
```

Expected: log 尾端出現本次執行的 `=== ... 完成 ===`（或明確的失敗訊息）。

註：`launchd` 環境中的 `git push` 需要憑證。若 log 顯示認證失敗，
在終端機執行一次 `git push` 讓 macOS keychain 記住憑證，或改用 SSH remote。

- [ ] **Step 4: 寫 scripts/README.md**

Create `scripts/README.md`:

```markdown
# 資料更新 Pipeline

每日自動更新股價與技術訊號，每月 1 號更新公司財務資料，
完成後自動 commit + push（觸發 Vercel 部署）。

## 首次設定

```bash
./scripts/setup.sh              # 建立 python venv
./scripts/install_launchd.sh    # 安裝每日 21:00 排程（可傳入其他小時，如 ./scripts/install_launchd.sh 18）
```

## 手動執行

```bash
./scripts/daily_update.sh                 # 完整流程（含 push）
./scripts/daily_update.sh --no-push       # 只 commit 不推送

scripts/.venv/bin/python scripts/update_prices.py --dry-run          # 只看統計
scripts/.venv/bin/python scripts/update_financials.py --force        # 強制更新財務
scripts/.venv/bin/python scripts/calibrate.py                        # 檢查訊號規則一致率
scripts/.venv/bin/pytest scripts/tests -q                            # 跑測試
```

## 檔案說明

| 檔案 | 說明 |
|---|---|
| `signals.py` | 技術指標與訊號規則（純函式，有測試） |
| `update_prices.py` | 每日股價 → `src/data/generated/prices.json` + `data/history/prices/` |
| `update_financials.py` | 每月財務 → `src/data/generated/financials.json` |
| `export_tickers.mjs` | 從 TS 資料檔匯出 ticker 清單（新增公司會自動納入） |
| `daily_update.sh` | 排程進入點：pull → 抓取 → build → commit → push |
| `calibrate.py` | 對照既有資料檢查訊號規則一致率 |

## 保護人工修正的財務數字

`data/overrides/financials.json` 內的值在每次財務更新後套用，優先權最高：

```json
{
  "tsmc": {
    "annual": [
      { "year": 2024, "revenue": 2894.3, "net_income": 1173.3,
        "gross_margin": 0.567, "operating_margin": 0.457, "growth_rate": 0.339 }
    ]
  }
}
```

以公司 id 為 key，值會覆蓋該公司 `financials` 的對應欄位。

## 故障排除

- 執行紀錄：`scripts/logs/update-YYYY-MM-DD.log`
- 抓取失敗超過 20% 會中止且不 commit（避免髒資料進 repo）
- `npm run build` 失敗會中止且不 commit，資料仍留在工作區供檢查
- 停用排程：`launchctl bootout gui/$(id -u)/com.interactivemap.daily-update`
```

- [ ] **Step 5: 在根 README.md 新增資料更新段落**

在 `README.md` 末尾附加：

```markdown

## 資料更新

股價與財務資料由 `scripts/` 下的 pipeline 自動更新，
詳見 [`scripts/README.md`](scripts/README.md)。

- 每日 21:00：股價與技術訊號（`src/data/generated/prices.json`）
- 每月 1 號：公司財務資料（`src/data/generated/financials.json`）
- 每日快照保存於 `data/history/prices/`
- 人工修正的財務數字放在 `data/overrides/financials.json`，不會被自動更新覆蓋
```

- [ ] **Step 6: Commit**

```bash
git add scripts/install_launchd.sh scripts/README.md README.md
git commit -m "docs: add pipeline setup, launchd scheduling and usage docs

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

- [ ] **Step 7: 推送全部成果**

```bash
git push origin main
git log --oneline -8
```

Expected: GitHub 上可見 Task 1–8 的 commits。

---

## 完成標準

1. `npm run build` 通過，網站行為與重構前一致（元件未修改）。
2. `scripts/.venv/bin/pytest scripts/tests -q` 全數通過。
3. `scripts/.venv/bin/python scripts/calibrate.py` 各項一致率達標。
4. `launchctl list | grep interactivemap` 顯示排程已載入。
5. `data/history/prices/` 至少有一份今日快照。
6. `./scripts/daily_update.sh --no-push` 可重複執行且不會誤 commit 其他檔案。
