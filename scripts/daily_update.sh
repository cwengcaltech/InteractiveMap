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

# launchd 不會載入 shell profile，須自行組出可用的 PATH
PATH="$HOME/.local/bin:/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin"
PY="$REPO/scripts/.venv/bin/python"

fail() { echo "[$(date +%T)] FAILED: $1"; exit 1; }

echo "=== $(date '+%F %T') 開始更新 ==="

command -v npx >/dev/null || fail "找不到 npx（PATH=$PATH）"
[ -x "$PY" ] || fail "找不到 python venv，請先執行 scripts/setup.sh"

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
