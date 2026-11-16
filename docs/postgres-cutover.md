# Cutover SQLite → Postgres (prod)

Toàn bộ code đã chuyển sang Postgres và **đã test end-to-end trên PG local với dữ liệu prod thật**
(branch `feat/postgres-migration`). Tài liệu này là các bước CUT-OVER trên prod — **đụng prod thật**,
làm khi đã quyết định.

## Kiến trúc
- Adapter async: [`server/pg.js`](../server/pg.js) — giữ API `db.prepare/.get/.all/.run`, `db.transaction`, `db.exec`.
- Schema Postgres: [`server/schema.sql`](../server/schema.sql) — chạy 1 lần lúc boot qua `initDb()`.
- Migrate data: [`scripts/migrate-sqlite-to-pg.mjs`](../scripts/migrate-sqlite-to-pg.mjs).
- Regenerate schema (nếu cần): `node scripts/translate-schema.cjs` (đọc dump schema SQLite).

## Chuẩn bị (idempotent, có thể chạy trước)
1. **Dựng container Postgres cạnh `tizia`** trong compose prod (network `126_default`), volume riêng:
   ```yaml
   tizia-postgres:
     image: postgres:16-alpine
     environment: { POSTGRES_USER: tizia, POSTGRES_PASSWORD: <mạnh>, POSTGRES_DB: tizia }
     volumes: [ tizia-pgdata:/var/lib/postgresql/data ]
     networks: [ 126_default ]      # KHÔNG mở ports ra ngoài
   ```
   (Xem `docker-compose.yml` ở repo làm mẫu — bản prod bỏ `ports`, thêm networks pin IP như `tizia`.)
2. Set env cho container `tizia`: `DATABASE_URL=postgres://tizia:<mạnh>@tizia-postgres:5432/tizia`.

## Cut-over (cửa sổ bảo trì ngắn)
1. **Backup SQLite hiện tại** (an toàn quay lui):
   ```bash
   docker exec tizia node -e "const D=require('better-sqlite3');new D('/data/tizia.db',{readonly:true}).exec(\"VACUUM INTO '/data/tizia-precutover.db'\")"
   ```
2. **Nạp schema + migrate data** (chạy TRONG mạng prod, target là superuser postgres của container):
   ```bash
   # schema
   docker exec -i tizia-postgres psql -U tizia -d tizia < server/schema.sql
   # data (chạy từ container tizia — có better-sqlite3 + pg + /data/tizia.db)
   docker exec tizia sh -lc 'SQLITE_PATH=/data/tizia.db TARGET_URL="postgres://tizia:<mạnh>@tizia-postgres:5432/tizia" node scripts/migrate-sqlite-to-pg.mjs'
   ```
   Script tự TRUNCATE + nạp + reset sequence + verify count khớp (thoát code ≠0 nếu mismatch).
   > Lưu ý: `SET session_replication_role=replica` cần quyền cao — nếu role `tizia` không đủ,
   > tạm cấp `ALTER ROLE tizia SUPERUSER;` khi migrate rồi thu lại, hoặc chạy migrate bằng role `postgres`.
3. **Deploy code mới** (rebuild image từ branch đã merge) — image mới đọc `DATABASE_URL`, bỏ better-sqlite3 runtime.
4. **Verify**: login, /api/auth/me, /api/wallet, /api/requests, /admin (db/tables, timeseries), battle-pass, league.

## Quay lui (rollback)
- Gỡ `DATABASE_URL` khỏi env `tizia` + deploy lại image cũ (đọc `/data/tizia.db`) → về SQLite ngay.
  `/data/tizia.db` KHÔNG bị migration đụng (chỉ đọc) nên còn nguyên.

## Sau cut-over
- Backup: [`server/contexts/admin/backup.js`](../server/contexts/admin/backup.js) + admin db-console đã chuyển sang `pg_dump` (cần `PG_DUMP_BIN` khớp version, hoặc pg_dump có sẵn trong image).
- Cân nhắc cron `pg_dump` thay pipeline VACUUM-SQLite cũ.
