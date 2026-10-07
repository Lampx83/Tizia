// Local dev only: clear requests and AI Board history. Accounts, wallets, curriculum
// and AI settings stay. Stop the AI worker and back up the DB (pg_dump) before deleting.
//   docker cp scripts/reset-requests.cjs tizia-dev:/app/reset-requests.cjs
//   docker exec tizia-dev node /app/reset-requests.cjs        (dry run)
//   docker exec tizia-dev node /app/reset-requests.cjs --yes  (deletes)
// Target: DATABASE_URL (PostgreSQL), or a connection string passed as the first postgres:// argument.
const { Client } = require('pg');
const confirmed = process.argv.includes('--yes');
const url = process.argv.find((a) => /^postgres(ql)?:\/\//.test(a)) || process.env.DATABASE_URL;
if (!url) { console.error('DATABASE_URL (PostgreSQL) is required'); process.exit(1); }

// Children before parents. Missing tables are normal on older dev databases.
const ALL = [
  'ai_preview_grants', 'ai_private_previews', 'ai_record_revisions', 'ai_resource_audit',
  'ai_feature_records', 'ai_resource_grants', 'ai_feature_resources',
  'ai_workers', 'ai_gate_traces', 'ai_alert_receipts', 'ai_alerts', 'ai_events', 'ai_release_receipts',
  'ai_authorizations', 'ai_plans', 'ai_ticket_tags', 'ai_eval_tasks', 'ai_runs', 'ai_tickets',
  'ai_decisions', 'request_messages', 'requests', 'ai_feature_releases', 'ai_feature_folder_votes',
  'ai_feature_folders', 'ai_post_merge_watch', 'ai_frozen_benchmark_scores', 'ai_pull_requests',
  'ai_self_improve_nights', 'gate_trace', 'skill_proposals',
];

(async () => {
  const db = new Client({ connectionString: url });
  await db.connect();
  try {
    const one = async (sql, p) => (await db.query(sql, p)).rows[0];
    const exists = async (t) => !!(await one(`SELECT 1 FROM information_schema.tables WHERE table_schema = current_schema() AND table_name = $1`, [t]));
    const hasColumn = async (t, c) => !!(await one(`SELECT 1 FROM information_schema.columns WHERE table_schema = current_schema() AND table_name = $1 AND column_name = $2`, [t, c]));
    const TABLES = [];
    for (const t of ALL) if (await exists(t)) TABLES.push(t);
    for (const t of TABLES) console.log(t.padEnd(28), (await one(`SELECT COUNT(*)::int AS n FROM "${t}"`)).n);
    const hasNotifications = await hasColumn('notifications', 'request_id');
    console.log('notifications (request)', hasNotifications
      ? (await one('SELECT COUNT(*)::int AS n FROM notifications WHERE request_id IS NOT NULL')).n : 0);
    if (!confirmed) { console.log('\nDry run. Add --yes to delete.'); return; }

    await db.query('BEGIN');
    try {
      // One TRUNCATE for every table: foreign keys between them are fine, one that reaches outside the list fails the statement.
      if (TABLES.length) await db.query(`TRUNCATE ${TABLES.map((t) => `"${t}"`).join(', ')} RESTART IDENTITY`);
      if (hasNotifications) await db.query('DELETE FROM notifications WHERE request_id IS NOT NULL');
      // The deleted eval set must be frozen again; keep the admin's enabled setting.
      if (await hasColumn('ai_self_improve_state', 'frozen_at')) await db.query('UPDATE ai_self_improve_state SET frozen_at = NULL');
      await db.query('COMMIT');
    } catch (e) {
      await db.query('ROLLBACK');
      throw new Error(`reset rolled back: ${e.message}`);
    }
    console.log('\nĐã xóa. Request mới sẽ bắt đầu lại từ #1.');
  } finally {
    await db.end();
  }
})().catch((e) => { console.error(e.message); process.exit(1); });
