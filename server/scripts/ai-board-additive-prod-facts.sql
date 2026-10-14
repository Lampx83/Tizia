-- READ-ONLY facts for the additive AI Board migration. Run: psql "$PROD_URL" -X -f ai-board-additive-prod-facts.sql > facts.txt
-- Returns schema metadata and counts only; no row values. Safe to send back.
SET default_transaction_read_only = on;

\echo '== 1 environment'
SELECT current_user, current_database(), current_schema() AS schema, current_setting('search_path') AS search_path,
       version() AS version, pg_is_in_recovery() AS standby,
       (SELECT rolsuper FROM pg_roles WHERE rolname = current_user) AS superuser,
       (SELECT datcollate FROM pg_database WHERE datname = current_database()) AS collate,
       (SELECT pg_encoding_to_char(encoding) FROM pg_database WHERE datname = current_database()) AS encoding;
SELECT has_schema_privilege(current_user, current_schema(), 'CREATE') AS can_create_in_schema,
       pg_has_role(current_user, (SELECT relowner FROM pg_class WHERE oid = to_regclass('requests')), 'USAGE') AS owns_requests,
       has_column_privilege(current_user, 'users'::regclass, 'id', 'REFERENCES') AS ref_users,
       has_column_privilege(current_user, 'requests'::regclass, 'id', 'REFERENCES') AS ref_requests;
SELECT extname, extversion FROM pg_extension ORDER BY 1;
SELECT lanname FROM pg_language WHERE lanname = 'plpgsql';

\echo '== 2 referenced tables: columns (users, requests)'
SELECT table_name, ordinal_position AS pos, column_name, data_type, udt_name, is_nullable, column_default, is_identity
FROM information_schema.columns WHERE table_schema = current_schema() AND table_name IN ('users', 'requests') ORDER BY 1, 2;

\echo '== 3 referenced tables: keys, owner, indexes, triggers, dependents'
SELECT c.relname, pg_get_userbyid(c.relowner) AS owner, c.reltuples::bigint AS est_rows, pg_size_pretty(pg_total_relation_size(c.oid)) AS size
FROM pg_class c WHERE c.relnamespace = current_schema()::regnamespace AND c.relname IN ('users', 'requests');
SELECT conrelid::regclass AS tbl, conname, contype, pg_get_constraintdef(oid) AS def
FROM pg_constraint WHERE conrelid IN (to_regclass('users'), to_regclass('requests')) ORDER BY 1, 2;
SELECT tablename, indexname, indexdef FROM pg_indexes WHERE schemaname = current_schema() AND tablename IN ('users', 'requests') ORDER BY 1, 2;
SELECT tgrelid::regclass AS tbl, tgname, pg_get_triggerdef(oid) AS def FROM pg_trigger WHERE NOT tgisinternal AND tgrelid IN (to_regclass('users'), to_regclass('requests'));
SELECT DISTINCT d.refobjid::regclass AS referenced, v.relname AS dependent_view
FROM pg_depend d JOIN pg_rewrite r ON r.oid = d.objid JOIN pg_class v ON v.oid = r.ev_class
WHERE d.refobjid IN (to_regclass('users'), to_regclass('requests')) AND v.oid <> d.refobjid;
SELECT max(id) AS users_max_id, count(*) AS users_rows, max(id) > 2147483647 AS users_id_over_int4 FROM users;
SELECT max(id) AS requests_max_id, count(*) AS requests_rows, max(id) > 2147483647 AS requests_id_over_int4 FROM requests;
SELECT count(*) AS case_insensitive_duplicate_usernames FROM (SELECT lower(username::text) FROM users GROUP BY 1 HAVING count(*) > 1) x;

\echo '== 4 name clashes: must all return zero rows'
SELECT n.nspname, c.relname, c.relkind FROM pg_class c JOIN pg_namespace n ON n.oid = c.relnamespace
WHERE c.relname IN ('ai_tickets','ai_ticket_tags','ai_runs','ai_events','ai_release_receipts','ai_gate_traces','ai_alerts','ai_alert_receipts','ai_workers','ai_plans','ai_authorizations','ai_board_profile','ai_feature_folders','ai_feature_folder_votes','ai_feature_releases','ai_eval_tasks','ai_pull_requests','ai_self_improve_state','ai_self_improve_nights','ai_frozen_benchmark_scores','ai_post_merge_watch','ai_transient_retry_state','ai_feature_resources','ai_resource_grants','ai_feature_records','ai_record_revisions','ai_resource_audit','ai_online_operations','ai_online_ui','ai_online_audit',
                    'ux_requests_owner_idempotency','idx_requests_owner','ux_ai_tickets_one_root','ux_ai_tickets_child_sequence','idx_ai_tickets_queue','idx_ai_plans_root_hash','idx_ai_feature_folders_owner','idx_ai_feature_folders_domain','idx_ai_eval_tasks_status','ai_feature_records_scope','ai_record_revisions_retention','ai_resource_audit_retention','ai_feature_records_deleted_retention','ai_online_audit_created','gate_trace','skill_proposals','idx_gate_trace_proposal','idx_skill_proposals_template','ai_private_previews','ai_preview_grants')
   OR c.relname LIKE 'ai\_%\_id\_seq';
SELECT n.nspname, p.proname FROM pg_proc p JOIN pg_namespace n ON n.oid = p.pronamespace WHERE p.proname = 'ai_root_request_status_fn';
SELECT column_name FROM information_schema.columns WHERE table_schema = current_schema() AND table_name = 'requests'
  AND column_name IN ('owner_user_id','owner_domain','idempotency_key','owner_state','clarified_spec','folder_id');

\echo '== 5 schema_migrations (may not exist)'
SELECT column_name, data_type FROM information_schema.columns WHERE table_schema = current_schema() AND table_name = 'schema_migrations' ORDER BY ordinal_position;
SELECT to_regclass('schema_migrations') IS NOT NULL AS has_schema_migrations \gset
\if :has_schema_migrations
  SELECT scope, count(*) AS receipts FROM schema_migrations GROUP BY 1;
\endif

\echo '== 6 tables the app boot would create or touch outside the migrations'
SELECT table_name, count(*) AS columns FROM information_schema.columns
WHERE table_schema = current_schema() AND table_name IN ('gate_trace','skill_proposals','ai_decisions','ai_prompt_log','ai_token_usage','ai_lesson_content','competencies','league_seasons','notif_config') GROUP BY 1 ORDER BY 1;
SELECT indexname FROM pg_indexes WHERE schemaname = current_schema() AND tablename = 'users' AND indexname IN ('ux_users_username_ci','idx_users_username','idx_users_enrolled_domain','idx_users_plan');

\echo '== 7 roles: who runs the app, who owns the schema'
SELECT n.nspname, pg_get_userbyid(n.nspowner) AS owner, n.nspacl FROM pg_namespace n WHERE n.nspname = current_schema();
SELECT rolname, rolsuper, rolcreaterole, rolcanlogin FROM pg_roles WHERE rolname !~ '^pg_' ORDER BY 1;
SELECT grantee, privilege_type FROM information_schema.role_table_grants WHERE table_schema = current_schema() AND table_name = 'requests' ORDER BY 1, 2;
