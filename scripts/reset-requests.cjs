// Local dev only: clear requests and AI Board history. Accounts, wallets, curriculum
// and AI settings stay. Stop the AI worker and back up the DB before deleting.
//   docker cp scripts/reset-requests.cjs tizia-dev:/app/reset-requests.cjs
//   docker exec tizia-dev node /app/reset-requests.cjs        (dry run)
//   docker exec tizia-dev node /app/reset-requests.cjs --yes  (deletes)
// AI_BOARD_DB=postgres: requests / board tables live in PostgreSQL, this SQLite file no longer holds them. Stop instead of
// silently reading or deleting stale rows.
if (String(process.env.AI_BOARD_DB || '').trim().toLowerCase() === 'postgres') {
  console.error('[reset-requests] AI_BOARD_DB=postgres: clear the board in PostgreSQL (TRUNCATE requests, request_messages and the ai_* tables) instead; this script only knows the SQLite file.');
  process.exit(2);
}
const Database = require('better-sqlite3');
const confirmed = process.argv.includes('--yes');
const db = new Database(process.argv.find(a => a.endsWith('.db')) || '/data/tizia.db', {
  fileMustExist: true, readonly: !confirmed,
});
const exists = (t) => !!db.prepare("SELECT 1 FROM sqlite_master WHERE type='table' AND name=?").get(t);
const hasColumn = (t, column) => exists(t) && db.prepare(`PRAGMA table_info(${t})`).all().some(c => c.name === column);
// Children before parents. Missing tables are normal on older dev databases.
const TABLES = [
  'ai_workers', 'ai_gate_traces', 'ai_alert_receipts', 'ai_alerts', 'ai_events', 'ai_release_receipts',
  'ai_authorizations', 'ai_plans', 'ai_ticket_tags', 'ai_eval_tasks', 'ai_runs', 'ai_tickets',
  'ai_decisions', 'request_messages', 'requests', 'ai_feature_releases', 'ai_feature_folder_votes',
  'ai_feature_folders', 'ai_post_merge_watch', 'ai_frozen_benchmark_scores', 'ai_pull_requests',
  'ai_self_improve_nights', 'gate_trace', 'skill_proposals',
].filter(exists);
for (const t of TABLES) console.log(t.padEnd(28), db.prepare(`SELECT COUNT(*) n FROM ${t}`).get().n);
const hasNotifications = hasColumn('notifications', 'request_id');
console.log('notifications (request)', hasNotifications
  ? db.prepare('SELECT COUNT(*) n FROM notifications WHERE request_id IS NOT NULL').get().n : 0);
if (!confirmed) { db.close(); console.log('\nDry run. Add --yes to delete.'); process.exit(0); }

db.pragma('foreign_keys = ON');
db.transaction(() => {
  db.pragma('defer_foreign_keys = ON');
  for (const t of TABLES) db.prepare(`DELETE FROM ${t}`).run();
  if (hasNotifications) db.prepare('DELETE FROM notifications WHERE request_id IS NOT NULL').run();
  // The deleted eval set must be frozen again; keep the admin's enabled setting.
  if (hasColumn('ai_self_improve_state', 'frozen_at')) {
    db.prepare('UPDATE ai_self_improve_state SET frozen_at = NULL').run();
  }
  if (TABLES.length && exists('sqlite_sequence')) {
    db.prepare(`DELETE FROM sqlite_sequence WHERE name IN (${TABLES.map(() => '?').join(',')})`).run(...TABLES);
  }
  if (db.pragma('foreign_key_check').length) throw new Error('Foreign key violation: reset rolled back.');
}).immediate();
db.close();
console.log('\nĐã xóa. Request mới sẽ bắt đầu lại từ #1.');
