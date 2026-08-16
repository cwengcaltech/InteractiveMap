#!/usr/bin/env bash
# 建立 pipeline 專用 venv 並安裝相依套件
set -euo pipefail
cd "$(dirname "$0")"
python3 -m venv .venv
./.venv/bin/pip install --upgrade pip
./.venv/bin/pip install -r requirements.txt
echo "venv ready: $(pwd)/.venv"
