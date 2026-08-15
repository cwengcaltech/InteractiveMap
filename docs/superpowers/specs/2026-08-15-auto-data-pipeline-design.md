# 自動化資料更新 Pipeline — 設計文件

日期：2026-08-15
狀態：已由使用者核准

## 目標

取代目前「在對話中臨時跑 yfinance、手動貼回 `priceData.ts`」的更新方式，
建立在使用者 Mac 上**本地自動執行**的每日資料更新 pipeline：

1. 每日自動更新股價與技術訊號，並累積每日歷史快照（供未來時間軸功能使用）。
2. 每月自動更新公司財務資料（營收、淨利、毛利率、成長率、分析師預估）。
3. 更新完成後自動 commit + push 到 GitHub（觸發 Vercel 部署）。
4. 人工修正的資料（如 histock.tw 台股財報修正）永遠不被自動更新覆蓋。

## 背景與現狀

- `src/data/priceData.ts`（~300 檔股票）：全機器產生（yfinance），目前手動更新。
- `src/data/companies.ts`（6,749 行）：手寫內容（名稱、分類、描述、網站）與
  機器產生的 financials 混在同一個檔案。部分台股財報曾以 histock.tw 手動修正。
- `src/data/topics.ts` 的 section companies 含有 `companies.ts` 沒有的公司
  （如健康類），ticker 清單必須同時涵蓋兩處。
- 產生資料的 script 不在 repo 內，等於每次更新都要重新發明。

## 決策記錄

| 決策 | 選擇 |
|---|---|
| 執行環境 | 本地 Mac、自動排程（launchd） |
| 更新頻率 | 股價每日一次（21:00）；財務每月 1 號 |
| git 行為 | 自動 commit + push（僅 stage 產生的檔案） |
| 更新範圍 | 股價 + 技術訊號 + 財務資料全部自動 |
| 架構 | 方案 A：資料分離（機器產 JSON、手寫留 TS） |

## 架構

### 1. 資料層重構（一次性遷移）

新增目錄與檔案：

```
src/data/generated/
  prices.json       # Record<companyId, PriceData>（欄位同現有 PriceData）
  financials.json   # Record<companyId, Financials>（currency/unit/annual/quarterly/predictions）
  meta.json         # { prices_updated, financials_updated, stats: {rapid_rise, early_signal, ...} }
data/history/prices/
  YYYY-MM-DD.json   # 每日 prices.json 完整快照
data/overrides/
  financials.json   # 人工修正資料，pipeline 最後合併，優先權最高
```

改動既有檔案：

- `src/data/priceData.ts` → 薄包裝：import `prices.json`，套用現有 `PriceData` 型別後輸出。
  對外 API（`priceData` 具名匯出、型別）完全不變，元件零改動。
- `src/data/companies.ts` → 移除每家公司的 `financials` 區塊，只留手寫欄位。
  新增合併層（`src/data/companyData.ts` 或在 `companies.ts` 內）於載入時把
  `financials.json` 併回，對外仍輸出同形狀的 `Company[]`。
- 遷移 script（一次性）：以 `tsx` 載入現有 TS 資料檔，dump 出
  `prices.json` / `financials.json`，並重產無 financials 的 `companies.ts`。
  現有台股手動修正值在遷移時原樣進入 `financials.json`；之後若要保護特定值
  再放入 `data/overrides/financials.json`。

### 2. Python pipeline（`scripts/`）

```
scripts/
  requirements.txt        # yfinance, pandas
  setup.sh                # 建 venv + pip install
  export_tickers.mjs      # 以 tsx 從 companies.ts + topics.ts 匯出 id→ticker 清單
  update_prices.py        # 每日股價 + 技術訊號
  update_financials.py    # 每月財務資料
  daily_update.sh         # 排程進入點（orchestrator）
  install_launchd.sh      # 一鍵安裝 launchd 排程
  logs/                   # 執行 log（gitignore）
  tests/                  # pytest
```

`update_prices.py`（每日）：

- 輸入：`export_tickers.mjs` 產出的 id→ticker 清單（每次執行時重新匯出，
  之後在 TS 加新公司會自動納入 pipeline）。
- 抓 yfinance 一年日 K，計算：現價、報酬率（1w/1m/3m/1y）、RSI(14)、
  MA50/MA200、距 52 週高點百分比。
- 訊號規則（把過去臨時計算的規則正式碼化，維持與現有資料相同的欄位語意）：
  - `signals`：價格突破 50 日均線、黃金交叉（50>200）、1 月強勢（>10%）、
    3 月動能（>20%）、RSI 強勢區（50–70）、近期突破。
  - `bullish_score`：signals 加總分數。`rapid_rise`：score 與報酬率門檻判定。
  - `early_signals` / `early_score` / `early_signal`：MACD 動能轉強、
    RSI 中性回升區（40–55）、接近 52 週高點（>-15%）、長期上升通道整理、
    盤整後突破。
  - `view` / `view_type`：依訊號組合產生中文評語與分類
    （strong_uptrend / breakout_setup / consolidation / neutral /
    deep_oversold / downtrend / broken_trend）。
  - 實作時以現有 `prices.json`（遷移自 priceData.ts）為 fixture 驗證分類規則
    與既有資料語意一致。
- 輸出：覆寫 `src/data/generated/prices.json`、寫入
  `data/history/prices/YYYY-MM-DD.json`、更新 `meta.json` 統計。

`update_financials.py`（每月 1 號，或手動 `--force`）：

- yfinance `income_stmt` / `quarterly_income_stmt` / `info`：
  年度（近 4 年）與季度（近 5 季）營收、淨利、毛利率、營業利益率、成長率。
- `revenue_estimate`：分析師營收共識 → `predictions`（source 標
  "yfinance analyst consensus"）。
- 欄位缺漏（常見於台/日/港股）：保留該公司既有值，只更新抓得到的欄位。
- 最後合併 `data/overrides/financials.json`（override 優先）。

### 3. 排程與 git 自動化

`daily_update.sh` 流程：

1. `cd` 到 repo；`git pull --rebase origin main`（失敗即中止並 log）。
2. `node scripts/export_tickers.mjs` → venv python `update_prices.py`。
3. 每月 1 號（或 `--financials`）加跑 `update_financials.py`。
4. `npm run build` 驗證資料沒有弄壞網站；失敗即中止、不 commit。
5. 只 `git add` 產生的檔案（`src/data/generated/`、`data/history/`）。
   使用者其他未 commit 的改動不受影響。
6. commit 訊息沿用現有風格：
   `update: refresh price data + technical views` +
   `🚀 N rapid_rise | 👀 N early_signal | 💎 N pullback | ⚠ N broken_trend`。
7. `git push`；全程 stdout/stderr 寫入 `scripts/logs/update-YYYY-MM-DD.log`。

launchd：

- `com.interactivemap.daily-update.plist`，`StartCalendarInterval` 每日 21:00
  （美股前一日收盤與台股當日收盤皆已出爐）。
- 選 launchd 而非 cron：Mac 睡眠錯過排程時間，喚醒後會補跑。
- `install_launchd.sh` 產生 plist（填入 repo 絕對路徑）並 `launchctl load`。

### 4. 錯誤處理

| 情況 | 行為 |
|---|---|
| 單一 ticker 抓取失敗 | 重試 2 次；仍失敗則保留該檔既有資料並標 `stale: true`，繼續其他檔 |
| 失敗比例 > 20% | 視為網路/API 大面積異常：中止、不寫檔、不 commit、log 記錄 |
| `npm run build` 失敗 | 中止、不 commit（資料已寫入工作區，供人工檢查），log 記錄 |
| `git pull --rebase` 衝突 | `rebase --abort` 後中止並 log |
| push 失敗 | 保留本地 commit，下次執行 pull --rebase 後一併 push |

`stale` 為 `PriceData` 新增的選用欄位；前端可先忽略，之後再決定是否顯示。

### 5. 測試

- pytest：報酬率、RSI、MA、訊號規則、view 分類 — 用固定的合成 K 線 fixture。
- 遷移驗證：遷移後 `npm run build` 通過，且新舊 `priceData` / `companies`
  內容 deep-equal（一次性檢查 script）。
- `update_prices.py --dry-run`：印出統計與 diff 摘要，不寫檔不動 git。

## 不做的事（YAGNI）

- 不建後端 / 資料庫 / API — 維持全靜態架構。
- 不做盤中即時更新。
- 不自動更新手寫內容（描述、關係、主題）。
- 不處理多台機器同時排程的情境（單一 Mac）。

## 成功標準

1. launchd 每日自動執行，隔天 GitHub 上看得到自動 commit，Vercel 自動部署。
2. 網站外觀與行為與重構前完全一致（資料層重構對元件透明）。
3. `data/history/prices/` 每日累積一份快照。
4. 台股人工修正值放入 overrides 後，任何自動更新都不會覆蓋它。
