# syntax=docker/dockerfile:1.7

# ---- Stage 1: Tizia prod deps (pure JS, no native build) ----
FROM node:20-alpine AS tizia-deps
WORKDIR /app
COPY package*.json ./
RUN npm install --omit=dev --no-audit --no-fund

# ---- Runtime: slim image ----
FROM node:20-alpine
# pg_dump / pg_restore for the admin backups. Major version = the postgres image major (compose: postgres:17).
RUN apk add --no-cache postgresql17-client
WORKDIR /app
ENV NODE_ENV=production \
    PORT=8041 \
    HOST=0.0.0.0 \
    DATA_DIR=/data \
    BACKUP_DIR=/data/backups

# Tizia (Express + PostgreSQL + WebSocket)
COPY --from=tizia-deps /app/node_modules ./node_modules
COPY package*.json ./
COPY server/ ./server/
COPY public/ ./public/
# scripts/ chứa migration một-lần (vd skills catalog). Cần có trong image để
# db.js init có thể tự gọi nếu phát hiện bảng skills/competencies rỗng. Chỉ
# +~30KB nên rẻ.
COPY scripts/ ./scripts/
# Prompt làm rõ yêu cầu (server/contexts/ai-board-intake) dùng chung file khoá hash với harness.
COPY ai-board/harness/prompts/ ./ai-board/harness/prompts/
# Trusted preview startup is read as source by the serving broker; it runs inside the pinned guest.
COPY ai-board/harness/verification/preview_guest.py ./ai-board/harness/verification/preview_guest.py

RUN mkdir -p /data && chown -R node:node /data /app
USER node
EXPOSE 8041

HEALTHCHECK --interval=30s --timeout=5s --start-period=15s --retries=3 \
  CMD wget -qO- http://127.0.0.1:8041/api/health > /dev/null 2>&1 || exit 1

CMD ["node", "server/index.js"]
