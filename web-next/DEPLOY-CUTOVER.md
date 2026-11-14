# Runbook: Cutover prod sang Next.js (cửa trước)

> Trạng thái hạ tầng prod (khảo sát 2026-07-08):
> - `tizia` (Express+public, image `tizia:latest`) — `172.31.24.2:8041`, network **external `126_default`**
> - `tizia-postgres` — `172.31.24.50:5432`
> - Compose prod: `/home/codelab/tizia-dev/docker-compose.yml` (**vá tay**, KHÁC repo — đừng rsync đè)
> - Reverse proxy: `dc-npmapp` (NPM) qua Cloudflare tunnel → hiện trỏ `tizia.vn` → `tizia:8041`
> - KHÔNG có CI → deploy thủ công: `git pull` trong `/home/codelab/tizia-dev` rồi `docker compose build/up`

Mô hình sau cutover: **Next (`tizia-next:3200`) làm cửa trước**; `/api/*` + fallback → Express (`tizia:8041`). Giữ nguyên `tizia` để làm backend + **rollback tức thì** (NPM trỏ lại `tizia:8041`).

## B0. Chuẩn bị (an toàn, chưa đổi traffic)
```bash
ssh tizia-prod
cd /home/codelab/tizia-dev
git fetch origin
git checkout feat/postgres-migration && git pull      # tới ff141a9 (release-candidate)
# backup compose prod đang chạy
cp docker-compose.yml docker-compose.yml.bak-$(date +%s)
```

## B1. Rebuild Express (đưa driving-600 + WIP lên vanilla — an toàn, prod vốn là nhánh này)
```bash
docker compose build tizia && docker compose up -d tizia
# re-seed content driving-600 (342 câu) vào Postgres prod
docker exec tizia node server/scripts/seed-content.mjs
curl -s localhost:8041/api/content/driving-600 | head -c 120   # kỳ vọng 342 item
```
→ Tới đây 9 request driving đã LIVE trên bản vanilla (kể cả khi chưa bật Next).

## B2. Thêm service `tizia-next` vào compose PROD (sửa TAY, giữ network 126_default)
Thêm khối sau vào `/home/codelab/tizia-dev/docker-compose.yml` (KHÔNG rsync từ local):
```yaml
  tizia-next:
    build:
      context: ./web-next
      args:
        # BẮT BUỘC: next.config bake BACKEND_URL vào rewrites lúc BUILD (đã kiểm chứng
        # cục bộ — thiếu arg này thì /api + fallback trả 500/ECONNREFUSED).
        BACKEND_URL: http://172.31.24.2:8041
    image: tizia-next:latest
    container_name: tizia-next
    restart: unless-stopped
    depends_on: [tizia]
    environment:
      NODE_ENV: production
      PORT: "3200"
      HOSTNAME: 0.0.0.0
      # Express backend qua IP pin (bài học: pin IP trên external net)
      BACKEND_URL: http://172.31.24.2:8041
    networks:
      "126_default":
        ipv4_address: 172.31.24.3   # IP trống kế tiếp — kiểm trước bằng: docker network inspect 126_default
    ports:
      - "127.0.0.1:3200:3200"       # chỉ localhost, NPM sẽ vào qua network nội bộ
```

## B3. Build + chạy Next (CHƯA đổi traffic) + smoke test nội bộ
```bash
docker compose build tizia-next && docker compose up -d tizia-next
# QUAN TRỌNG — kiểm proxy /api hoạt động (BACKEND_URL đọc đúng lúc runtime):
docker exec tizia-next wget -qO- http://127.0.0.1:3200/api/content/driving-600 | head -c 120  # phải ra 342 item
docker exec tizia-next wget -qO- http://127.0.0.1:3200/luat-giao-thong-600 | grep -c lgt-sidebar # >0
```
Nếu `/api` KHÔNG ra data → BACKEND_URL bị bake lúc build: rebuild với `--build-arg` hoặc set env rồi `up -d` lại, kiểm lại. **Không sang B4 tới khi B3 xanh.**

## B4. Chuyển NPM `tizia.vn` → `tizia-next:3200` (BƯỚC ĐỔI TRAFFIC — khó lùi)
- Trong `dc-npmapp` (NPM), sửa Proxy Host `tizia.vn`: forward hostname/port `tizia` `8041` → `tizia-next` `3200` (giữ SSL/cert như cũ).
- Test ngay: mở `https://tizia.vn/` (home), `/login`, `/luat-giao-thong-600` (sidebar+ảnh), 1 trang 3D (vd `/nha-thuoc-3d`), `/api/health`.

## Rollback (bất cứ lúc nào sau B4)
- NPM: trỏ `tizia.vn` **lại** `tizia:8041` → về vanilla Express tức thì (data không đổi, cùng Postgres).
- Hoặc `docker compose stop tizia-next`. `tizia` chưa từng dừng nên không mất gì.

## Cập nhật request sau khi LIVE
```bash
# cập nhật #46-54 → done + notification (chạy trên prod DB Postgres)
```
(13 câu ảnh 36,37,286-290,295-300 vẫn nhãn "đang bổ sung" — chờ SV gửi ảnh.)
