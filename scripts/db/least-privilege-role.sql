-- Chuyển app Tizia sang role không phải superuser. Role tizia (superuser, bootstrap) giữ lại
-- cho bảo trì/sao lưu ở máy chủ; app chỉ dùng tizia_app (chủ các bảng, không superuser).
-- Mật khẩu truyền qua biến psql :app_pw.
-- Chạy (máy chủ prod): docker exec -i tizia-postgres psql -U tizia -d tizia -v ON_ERROR_STOP=1 -v app_pw="$PW" -f - < scripts/db/least-privilege-role.sql
-- rồi đổi DATABASE_URL trong /home/codelab/tizia-dev/.env sang tizia_app. Idempotent, chạy lại được.
SELECT format('CREATE ROLE tizia_app LOGIN NOSUPERUSER NOCREATEDB NOCREATEROLE NOREPLICATION PASSWORD %L', :'app_pw')
WHERE NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'tizia_app') \gexec
SELECT format('ALTER ROLE tizia_app LOGIN NOSUPERUSER PASSWORD %L', :'app_pw') \gexec
BEGIN;
ALTER DATABASE tizia OWNER TO tizia_app;
ALTER SCHEMA public OWNER TO tizia_app;
DO $$
DECLARE r record;
BEGIN
  -- bảng, sequence độc lập, view (sequence của cột identity/serial đi theo bảng)
  FOR r IN
    SELECT c.oid, c.relname, c.relkind FROM pg_class c JOIN pg_namespace n ON n.oid = c.relnamespace
    WHERE n.nspname = 'public' AND c.relkind IN ('r','p','v','m','S','f')
      AND NOT EXISTS (SELECT 1 FROM pg_depend d WHERE d.objid = c.oid AND d.deptype IN ('e','a','i'))
      AND pg_get_userbyid(c.relowner) <> 'tizia_app'
  LOOP
    EXECUTE format('ALTER %s public.%I OWNER TO tizia_app',
      CASE r.relkind WHEN 'S' THEN 'SEQUENCE' WHEN 'v' THEN 'VIEW' WHEN 'm' THEN 'MATERIALIZED VIEW'
                     WHEN 'f' THEN 'FOREIGN TABLE' ELSE 'TABLE' END, r.relname);
  END LOOP;
  -- hàm/thủ tục (trigger function) — bỏ qua hàm của extension citext
  FOR r IN
    SELECT p.oid FROM pg_proc p JOIN pg_namespace n ON n.oid = p.pronamespace
    WHERE n.nspname = 'public'
      AND NOT EXISTS (SELECT 1 FROM pg_depend d WHERE d.objid = p.oid AND d.deptype = 'e')
      AND pg_get_userbyid(p.proowner) <> 'tizia_app'
  LOOP
    EXECUTE format('ALTER ROUTINE %s OWNER TO tizia_app', r.oid::regprocedure);
  END LOOP;
  -- kiểu tự định nghĩa (enum/domain/composite) — bỏ qua của extension
  FOR r IN
    SELECT t.oid FROM pg_type t JOIN pg_namespace n ON n.oid = t.typnamespace
    WHERE n.nspname = 'public' AND t.typtype IN ('e','d','c') AND t.typrelid = 0
      AND NOT EXISTS (SELECT 1 FROM pg_depend d WHERE d.objid = t.oid AND d.deptype = 'e')
  LOOP
    EXECUTE format('ALTER TYPE %s OWNER TO tizia_app', r.oid::regtype);
  END LOOP;
END $$;
COMMIT;
-- Kiểm tra: không còn đối tượng (ngoài extension) do role khác sở hữu
SELECT 'left_tables', count(*) FROM pg_tables WHERE schemaname='public' AND tableowner <> 'tizia_app';
SELECT 'left_funcs', count(*) FROM pg_proc p JOIN pg_namespace n ON n.oid=p.pronamespace
  WHERE n.nspname='public' AND pg_get_userbyid(p.proowner) <> 'tizia_app'
  AND NOT EXISTS (SELECT 1 FROM pg_depend d WHERE d.objid=p.oid AND d.deptype='e');
SELECT 'app_super', rolsuper FROM pg_roles WHERE rolname='tizia_app';
