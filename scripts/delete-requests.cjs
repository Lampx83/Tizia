// Local dev only: delete chosen requests and their AI Board tickets/runs/events. Accounts, curriculum,
// AI settings and every other request stay. Stop the AI worker and back up the DB (pg_dump) first.
//   docker cp scripts/delete-requests.cjs tizia-dev:/app/delete-requests.cjs
//   docker exec tizia-dev node /app/delete-requests.cjs --ids 1,2,5-9              (dry run)
//   docker exec tizia-dev node /app/delete-requests.cjs --before 2026-10-30 --yes  (deletes)
// Selectors (combine = AND): --ids 1,2,5-9 | --before YYYY-MM-DD | --status pending,done | --keep-last N (protect newest N)
// Options: --folders also delete feature folders left without any request | --yes execute | postgres:// URL as argument.
// Target: DATABASE_URL (PostgreSQL). Refuses a request whose ticket is still leased by a live worker.
const { Client } = require('pg');

const arg = (name) => { const i = process.argv.indexOf(name); return i > 0 ? process.argv[i + 1] : undefined; };
const flag = (name) => process.argv.includes(name);
const url = process.argv.find((a) => /^postgres(ql)?:\/\//.test(a)) || process.env.DATABASE_URL;
if (!url) { console.error('DATABASE_URL (PostgreSQL) is required'); process.exit(1); }

const parseIds = (text) => (text ? text.split(',').flatMap((part) => {
  const [a, b] = part.split('-').map(Number);
  if (!Number.isInteger(a) || (b !== undefined && (!Number.isInteger(b) || b < a))) throw new Error(`bad --ids part: ${part}`);
  return b === undefined ? [a] : Array.from({ length: b - a + 1 }, (_, i) => a + i);
}) : null);

// Child tables first; the column that points at each id set is detected at run time.
const TABLES = [
  'ai_work_reservation_phases', 'ai_work_reservations', 'ai_root_allowances',
  'ai_spans', 'ai_gate_traces', 'ai_hsm_events', 'ai_hsm_states', 'ai_gate_proofs', 'ai_candidate_approvals',
  'ai_folder_decisions', 'ai_request_appeals', 'ai_lessons', 'ai_alerts', 'ai_release_receipts',
  'ai_ticket_admins', 'ai_ticket_tags', 'ai_events', 'ai_authorizations', 'ai_plans', 'ai_eval_tasks',
  'ai_runs', 'ai_pull_requests', 'ai_tickets', 'request_messages', 'ai_decisions', 'requests',
];
const COLUMNS = {
  request: ['request_id', 'source_request_id', 'revision_request_id'],
  ticket: ['ticket_id', 'root_ticket_id'],
  run: ['run_id'],
};

(async () => {
  const ids = parseIds(arg('--ids'));
  const before = arg('--before');
  const statuses = arg('--status') ? arg('--status').split(',') : null;
  const keepLast = arg('--keep-last') ? Number(arg('--keep-last')) : 0;
  if (!ids && !before && !statuses) { console.error('Give at least one selector: --ids, --before or --status'); process.exit(1); }

  const db = new Client({ connectionString: url });
  await db.connect();
  try {
    const q = async (sql, p) => (await db.query(sql, p)).rows;
    const exists = async (t) => (await q(`SELECT 1 FROM information_schema.tables WHERE table_schema = current_schema() AND table_name = $1`, [t])).length > 0;
    const hasColumn = async (t, c) => (await q(`SELECT 1 FROM information_schema.columns WHERE table_schema = current_schema() AND table_name = $1 AND column_name = $2`, [t, c])).length > 0;

    const where = []; const params = [];
    if (ids) { params.push(ids); where.push(`id = ANY($${params.length}::bigint[])`); }
    if (before) { params.push(before); where.push(`created_at < (extract(epoch FROM $${params.length}::date) * 1000)::bigint`); }
    if (statuses) { params.push(statuses); where.push(`status = ANY($${params.length}::text[])`); }
    let picked = (await q(`SELECT id FROM requests WHERE ${where.join(' AND ')} ORDER BY id`, params)).map((r) => Number(r.id));
    if (keepLast > 0) {
      const newest = (await q('SELECT id FROM requests ORDER BY id DESC LIMIT $1', [keepLast])).map((r) => Number(r.id));
      picked = picked.filter((id) => !newest.includes(id));
    }
    if (!picked.length) { console.log('No request matches.'); return; }

    const tickets = (await q(`WITH RECURSIVE t AS (
        SELECT id FROM ai_tickets WHERE source_request_id = ANY($1::bigint[])
        UNION SELECT c.id FROM ai_tickets c JOIN t ON c.parent_id = t.id) SELECT id FROM t`, [picked])).map((r) => Number(r.id));
    const runs = tickets.length ? (await q('SELECT id FROM ai_runs WHERE ticket_id = ANY($1::bigint[])', [tickets])).map((r) => Number(r.id)) : [];
    const live = tickets.length ? await q(`SELECT id FROM ai_tickets WHERE id = ANY($1::bigint[]) AND lease_owner IS NOT NULL AND lease_expires_at > $2`, [tickets, Date.now()]) : [];
    if (live.length) throw new Error(`ticket(s) ${live.map((r) => r.id).join(',')} still leased by a live worker; stop the worker first`);

    console.log(`requests ${picked.length}: ${picked.join(',')}`);
    console.log(`tickets ${tickets.length}, runs ${runs.length}`);
    const sets = { request: picked, ticket: tickets, run: runs };
    const rows = [];
    for (const table of TABLES) {
      if (!(await exists(table))) continue;
      if (table === 'requests') { rows.push({ table, kind: 'request', col: 'id' }); continue; }
      if (table === 'ai_tickets') { rows.push({ table, kind: 'ticket', col: 'id' }); continue; }
      for (const [kind, columns] of Object.entries(COLUMNS)) {
        for (const col of columns) if (sets[kind].length && await hasColumn(table, col)) rows.push({ table, kind, col });
      }
    }
    for (const p of rows) {
      const n = (await q(`SELECT COUNT(*)::int AS n FROM "${p.table}" WHERE "${p.col}" = ANY($1::bigint[])`, [sets[p.kind]]))[0].n;
      if (n) console.log(`  ${p.table}.${p.col}`.padEnd(40), n);
    }
    if (!flag('--yes')) { console.log('\nDry run. Add --yes to delete.'); return; }

    await db.query('BEGIN');
    try {
      if (tickets.length && await hasColumn('ai_workers', 'current_ticket_id')) {
        await db.query('UPDATE ai_workers SET current_ticket_id = NULL WHERE current_ticket_id = ANY($1::bigint[])', [tickets]);
      }
      for (const p of rows) await db.query(`DELETE FROM "${p.table}" WHERE "${p.col}" = ANY($1::bigint[])`, [sets[p.kind]]);
      if (await exists('notifications') && await hasColumn('notifications', 'request_id')) {
        await db.query('DELETE FROM notifications WHERE request_id = ANY($1::bigint[])', [picked]);
      }
      if (flag('--folders') && await exists('ai_feature_folders')) {
        await db.query(`DELETE FROM ai_feature_folder_votes WHERE folder_id IN (SELECT id FROM ai_feature_folders f WHERE NOT EXISTS (SELECT 1 FROM requests r WHERE r.folder_id = f.id))`);
        const gone = await db.query(`DELETE FROM ai_feature_folders f WHERE NOT EXISTS (SELECT 1 FROM requests r WHERE r.folder_id = f.id)`);
        console.log(`folders removed: ${gone.rowCount}`);
      }
      await db.query('COMMIT');
    } catch (e) {
      await db.query('ROLLBACK');
      throw new Error(`delete rolled back: ${e.message}`);
    }
    console.log('\nĐã xóa.');
  } finally {
    await db.end();
  }
})().catch((e) => { console.error(e.message); process.exit(1); });
