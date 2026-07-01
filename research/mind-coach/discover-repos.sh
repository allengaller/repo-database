#!/usr/bin/env bash
# 简单入口：调用同目录下的 discover-repos.py
set -euo pipefail
exec python3 "$(dirname "$0")/discover-repos.py" "$@"
