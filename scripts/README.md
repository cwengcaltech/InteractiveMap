# 資料更新 Pipeline

每日自動更新股價與技術訊號，每月 1 號更新公司財務資料，
完成後自動 commit + push（觸發 Vercel 部署）。

## 首次設定

```bash
./scripts/setup.sh              # 建立 python venv
./scripts/install_launchd.sh    # 安裝每日 21:00 排程（可傳小時參數，如 ./scripts/install_launchd.sh 18）
```

安裝腳本最後會做一次權限自檢。若顯示 ⚠️ 失敗，見下方「macOS 權限」。

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
| `calibrate.py` | 對照既有資料檢查訊號規則一致率（改動 signals.py 後的迴歸檢查） |
| `migrate/` | 一次性資料分離腳本，已執行完畢，保留供追溯 |

## 訊號規則

`signals.py` 的門檻是從既有 `priceData.ts` 反推而得，遷移時的一致率：
signals 99.3%、bullish_score 99.7%、rapid_rise 99.0%、view_type 94.1%。

| 訊號 | 條件 | 分數 |
|---|---|---|
| 黃金交叉 | MA50 > MA200 | 2 |
| 價格突破 50日均線 | price > MA50 | 1 |
| 1月強勢 | 1 月報酬 ≥ 10% | 1 |
| 3月動能 | 3 月報酬 ≥ 25% | 1 |
| RSI 強勢區 | 50 ≤ RSI < 70 | 1 |
| RSI 超買 | RSI ≥ 70 | 0 |
| 近期突破 | 距 52 週高點 ≥ -0.4% | 1 |

`rapid_rise`（🚀）＝ 1 月報酬 ≥ 5% 且 RSI ≥ 50 且站上 50 日均線。
`early_signal`（👀）＝ early_signals 累積 ≥ 3 項。

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

## macOS 權限

macOS 的隱私保護（TCC）預設不允許 launchd 背景排程「讀取」
`~/Documents`、`~/Desktop`、`~/Downloads` 底下的檔案。
若 repo 放在這些目錄，排程會啟動但立刻以 `Operation not permitted` 失敗
（見 `scripts/logs/launchd.err.log`）。兩種解法擇一：

- **A. 授予完整取用權**：系統設定 → 隱私權與安全性 → 完整取用磁碟 →
  「+」→ `Cmd+Shift+G` 輸入 `/bin/bash` → 加入並開啟，然後重跑
  `./scripts/install_launchd.sh`。代價是所有 bash 腳本都能讀取受保護目錄。
- **B. 把 repo 移到不受保護的位置**（建議）：例如 `~/dev/InteractiveMap`，
  再於新位置執行 `./scripts/install_launchd.sh`。

在此之前手動執行 `./scripts/daily_update.sh` 不受影響。

## 故障排除

- 執行紀錄：`scripts/logs/update-YYYY-MM-DD.log`
- 既有股票抓取失敗超過 20% 會中止且不 commit（避免髒資料進 repo）
- 未上市公司（OpenAI、SpaceX 等）本來就沒有行情，計入「無行情」不算失敗
- `npm run build` 失敗會中止且不 commit，資料仍留在工作區供檢查
- 停用排程：`launchctl bootout gui/$(id -u)/com.interactivemap.daily-update`
