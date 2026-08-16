#!/usr/bin/env bash
# 安裝 launchd 每日排程（預設 21:00）。重跑此腳本即可更新設定。
# 移除排程：launchctl bootout gui/$(id -u)/com.interactivemap.daily-update
set -euo pipefail

REPO="$(cd "$(dirname "$0")/.." && pwd)"
LABEL="com.interactivemap.daily-update"
PLIST="$HOME/Library/LaunchAgents/$LABEL.plist"
HOUR="${1:-21}"

mkdir -p "$HOME/Library/LaunchAgents" "$REPO/scripts/logs"
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

launchctl bootout "gui/$(id -u)/$LABEL" 2>/dev/null || true
launchctl bootstrap "gui/$(id -u)" "$PLIST"
echo "已安裝：每日 ${HOUR}:00 執行 $REPO/scripts/daily_update.sh"

# 權限自檢：macOS TCC 會阻擋 launchd「讀取」~/Documents、~/Desktop 等受保護目錄
# （寫入通常仍可行，所以必須測讀取才測得準）。避免真正的更新流程靜默失敗。
PROBE="$LABEL.probe"
PROBE_OUT="$REPO/scripts/logs/probe.log"
rm -f "$PROBE_OUT"
launchctl bootout "gui/$(id -u)/$PROBE" 2>/dev/null || true
cat > "$HOME/Library/LaunchAgents/$PROBE.plist" <<PROBEEOF
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>Label</key><string>$PROBE</string>
  <key>ProgramArguments</key>
  <array><string>/bin/bash</string><string>-c</string>
  <string>head -1 "$REPO/scripts/daily_update.sh" > "$PROBE_OUT" 2>&1</string></array>
  <key>RunAtLoad</key><true/>
</dict>
</plist>
PROBEEOF
launchctl bootstrap "gui/$(id -u)" "$HOME/Library/LaunchAgents/$PROBE.plist" 2>/dev/null || true
sleep 3
launchctl bootout "gui/$(id -u)/$PROBE" 2>/dev/null || true
rm -f "$HOME/Library/LaunchAgents/$PROBE.plist"

if grep -q '^#!' "$PROBE_OUT" 2>/dev/null; then
  rm -f "$PROBE_OUT"
  echo "✅ 權限檢查通過，排程可以讀取 repo。"
else
  rm -f "$PROBE_OUT"
  cat <<'PERMEOF'

⚠️  權限檢查失敗：launchd 無法讀取此 repo 內的檔案。

macOS 的隱私保護（TCC）預設不允許背景排程「讀取」~/Documents、~/Desktop、
~/Downloads 底下的檔案（寫入通常可以，所以問題不會馬上顯現）。
排程會啟動但立刻失敗，錯誤訊息見 scripts/logs/launchd.err.log 的
"Operation not permitted"。

解法（建議第一個）：

  A. 建立機器人專用 clone —— 不搬 repo、不授權限
     ./scripts/install_bot_clone.sh
     會在 ~/.local/share/ 另外 clone 一份給排程用，你這份原地不動。

  B. 把 repo 移到不受保護的位置
     mv <此 repo> ~/dev/InteractiveMap
     cd ~/dev/InteractiveMap && ./scripts/install_launchd.sh

  C. 授予完整取用權
     系統設定 → 隱私權與安全性 → 完整取用磁碟 → 「+」→ Cmd+Shift+G
     輸入 /bin/bash → 加入並開啟開關，然後重新執行本腳本。
     代價：所有 bash 腳本從此都能讀取受保護目錄。

在此之前，仍可隨時手動執行 ./scripts/daily_update.sh。
PERMEOF
fi
