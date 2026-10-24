#!/bin/bash
# SSH tunnel localhost → Postgres PROD (container tizia-postgres, KHÔNG phơi ra internet).
# Cần khi DB_TARGET=prod. Cách dùng:
#   npm run db:tunnel         # mở  (scripts/proddb-tunnel.sh start)
#   npm run db:tunnel:stop    # đóng
#   bash scripts/proddb-tunnel.sh status
#
# Env override được: PROD_DB_LOCAL_PORT (mặc định 5544), PROD_SSH_HOST (tizia-prod),
# PROD_PG_CONTAINER_IP (172.31.24.50 — IP của tizia-postgres trên 126_default).
set -euo pipefail
LOCAL_PORT="${PROD_DB_LOCAL_PORT:-5544}"
PG_IP="${PROD_PG_CONTAINER_IP:-172.31.24.50}"
REMOTE="${PG_IP}:5432"
SSH_HOST="${PROD_SSH_HOST:-tizia-prod}"
MATCH="${LOCAL_PORT}:${REMOTE}"

is_up() { lsof -iTCP:"${LOCAL_PORT}" -sTCP:LISTEN -t >/dev/null 2>&1; }

case "${1:-start}" in
  start)
    if is_up; then echo "Tunnel đã mở ở 127.0.0.1:${LOCAL_PORT}"; exit 0; fi
    ssh -f -N -L "127.0.0.1:${LOCAL_PORT}:${REMOTE}" "${SSH_HOST}"
    sleep 1
    is_up && echo "✅ Tunnel mở: 127.0.0.1:${LOCAL_PORT} → PROD Postgres (${SSH_HOST} ${REMOTE}). Giờ DB_TARGET=prod dùng được." \
          || { echo "✗ Mở tunnel thất bại"; exit 1; }
    ;;
  stop)
    pkill -f "${MATCH}" 2>/dev/null && echo "Tunnel đóng." || echo "Không có tunnel nào đang chạy."
    ;;
  status)
    is_up && echo "Tunnel ĐANG mở (127.0.0.1:${LOCAL_PORT})" || echo "Tunnel đóng."
    ;;
  *) echo "Cách dùng: $0 {start|stop|status}"; exit 1;;
esac
