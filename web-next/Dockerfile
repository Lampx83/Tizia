# syntax=docker/dockerfile:1.7
# ---- Cửa trước Next.js (front door) cho Tizia ----
# Build standalone (next.config: output:'standalone') → image slim, chạy node server.js.
# Next proxy /api/* + fallback /:path* sang Express (BACKEND_URL), nên KHÔNG cần DB ở đây.

# ---- Stage 1: deps ----
FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci --no-audit --no-fund

# ---- Stage 2: build ----
FROM node:20-alpine AS builder
WORKDIR /app
# QUAN TRỌNG: next.config rewrites (/api/* + fallback) BAKE BACKEND_URL lúc BUILD.
# Phải truyền địa chỉ Express của prod tại đây (mặc định tên service compose).
ARG BACKEND_URL=http://tizia:8041
ENV BACKEND_URL=$BACKEND_URL
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1 NODE_ENV=production
RUN npm run build

# ---- Stage 3: runner (standalone) ----
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=3200 \
    HOSTNAME=0.0.0.0
# BACKEND_URL do compose truyền (http://tizia:8041) — Next đọc lúc runtime cho rewrites/fetch.
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
USER node
EXPOSE 3200
HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
  CMD wget -qO- http://127.0.0.1:3200/ >/dev/null 2>&1 || exit 1
CMD ["node", "server.js"]
