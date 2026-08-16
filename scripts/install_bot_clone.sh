#!/usr/bin/env bash
# 在不受 macOS 隱私保護（TCC）限制的位置建立一份「機器人專用 clone」，
# 並把每日排程指向它。你原本的工作副本完全不受影響。
#
# 用法：
#   ./scripts/install_bot_clone.sh                 # 預設 ~/.local/share/interactivemap-bot
#   ./scripts/install_bot_clone.sh ~/dev/imap-bot  # 指定位置
#
# 為什麼需要這個：launchd 無法讀取 ~/Documents、~/Desktop、~/Downloads
# 底下的檔案。把排程要用的 checkout 放在其他位置即可完全繞開，
# 不必搬移你的 repo，也不必授予任何系統權限。
set -euo pipefail

SRC="$(cd "$(dirname "$0")/.." && pwd)"
BOT_DIR="${1:-$HOME/.local/share/interactivemap-bot}"
BOT_NAME="${IMAP_BOT_NAME:-InteractiveMap Bot}"
BOT_EMAIL="${IMAP_BOT_EMAIL:-$(git -C "$SRC" config user.email || true)}"
[ -n "$BOT_EMAIL" ] || BOT_EMAIL="chingchih@gmail.com"

REMOTE="$(git -C "$SRC" remote get-url origin)"

# 目標位置若同樣受保護，排程一樣會失敗，先擋下來
case "$BOT_DIR" in
  "$HOME/Documents"/*|"$HOME/Desktop"/*|"$HOME/Downloads"/*)
    echo "❌ $BOT_DIR 位於受 macOS 隱私保護的目錄，排程會讀不到。"
    echo "   請改用 ~/.local/share、~/dev 等位置。"
    exit 1
    ;;
esac

echo "來源 remote : $REMOTE"
echo "機器人位置  : $BOT_DIR"
echo

if [ -d "$BOT_DIR/.git" ]; then
  echo "==> 已存在，更新中"
  git -C "$BOT_DIR" fetch origin main
  git -C "$BOT_DIR" reset --hard origin/main
else
  echo "==> Clone"
  mkdir -p "$(dirname "$BOT_DIR")"
  git clone "$REMOTE" "$BOT_DIR"
fi

git -C "$BOT_DIR" config user.name "$BOT_NAME"
git -C "$BOT_DIR" config user.email "$BOT_EMAIL"
echo "==> commit 身分：$BOT_NAME <$BOT_EMAIL>"

echo "==> 安裝 npm 相依套件（build 驗證需要）"
(cd "$BOT_DIR" && npm install --silent)

echo "==> 建立 python venv"
"$BOT_DIR/scripts/setup.sh" >/dev/null

echo "==> 註冊每日排程（指向機器人 clone）"
"$BOT_DIR/scripts/install_launchd.sh" "${IMAP_BOT_HOUR:-21}"

cat <<EOF

完成。之後的運作方式：

  排程每天更新機器人 clone 並 push 到 GitHub。
  你這份工作副本要拿到最新資料時，執行：

      git -C "$SRC" pull

  機器人 clone 位置：$BOT_DIR
  執行紀錄：        $BOT_DIR/scripts/logs/update-YYYY-MM-DD.log
  手動觸發一次：    "$BOT_DIR/scripts/daily_update.sh"
EOF
