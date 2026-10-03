/**
 * One-off copy of the AI board's rows from the app's SQLite file into the board's PostgreSQL database (run before flipping
 * AI_BOARD_DB=postgres on a deployment that already has requests). Safe to dry-run; all-or-nothing in one transaction.
 *
 *   node server/scripts/copy-ai-board-to-postgres.mjs --dry-run     # counts only
 *   node server/scripts/copy-ai-board-to-postgres.mjs               # copy into an EMPTY board database
 *   node server/scripts/copy-ai-board-to-postgres.mjs --force       # also when the board database already has rows (duplicates fail)
 *
 * Reads DATA_DIR/tizia.db (read-only) and AI_BOARD_DATABASE_URL. Tables: requests, request_messages, a users projection
 * (never password hashes), every ai_* table. Afterwards the identity sequences are moved past the copied ids.
 * Rollback of the copy itself: drop the schema / truncate in PostgreSQL; SQLite is never modified.
 */
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import Database from 'better-sqlite3';
import { applyMigrations, applyPgBaseSchema, createPgDb } from '../ai-board/db/index.js';

// Parents before children (foreign keys); each entry: table, optional column whitelist, order for self-references.
const TABLES = [
  { name: 'users', columns: ['id', 'username', 'display_name', 'role', 'enrolled_domain', 'email', 'created_at', 'last_login'] },
  { name: 'ai_feature_folders' },
  { name: 'requests' },
  { name: 'request_messages' },
  { name: 'ai_feature_folder_votes' },
  { name: 'ai_feature_releases' },
  { name: 'ai_board_profile' },
  { name: 'ai_tickets' },
  { name: 'ai_ticket_tags' },
  { name: 'ai_runs' },
  { name: 'ai_events' },
  { name: 'ai_release_receipts' },
  { name: 'ai_gate_traces' },
  { name: 'ai_alerts' },
  { name: 'ai_alert_receipts' },
  { name: 'ai_workers' },
  { name: 'ai_plans' },
  { name: 'ai_authorizations' },
  { name: 'ai_eval_tasks' },
  { name: 'ai_pull_requests' },
  { name: 'ai_self_improve_state' },
  { name: 'ai_self_improve_nights' },
  { name: 'ai_frozen_benchmark_scores' },
  { name: 'ai_post_merge_watch' },
  { name: 'ai_transient_retry_state' },
];
const USER_ID_FLOOR = 1_000_000_000; // board-created users start here (db/pg/base.sql); never move the sequence below it
const BATCH = 200;

const exists = (sqlite, table) => !!sqlite.prepare("SELECT 1 FROM sqlite_master WHERE type='table' AND name=?").get(table);

export async function copyAiBoardToPostgres({ sqlite, pg, dryRun = false, force = false, log = () => {} }) {
  const counts = {};
  const plan = TABLES.filter((t) => exists(sqlite, t.name));
  for (const t of plan) counts[t.name] = sqlite.prepare(`SELECT COUNT(*) AS n FROM ${t.name}`).get().n;
  if (dryRun) return { dryRun: true, counts };

  await applyPgBaseSchema(pg);
  await applyMigrations(pg);
  if (!force) {
    for (const probe of ['requests', 'ai_tickets']) {
      if ((await pg.get(`SELECT COUNT(*) AS n FROM ${probe}`)).n > 0) {
        throw new Error(`PostgreSQL already has rows in ${probe}; refusing to copy (use --force to try anyway)`);
      }
    }
  }
  await pg.tx(async () => {
    for (const t of plan) {
      const target = (await pg.all('SELECT column_name FROM information_schema.columns WHERE table_schema = current_schema() AND table_name = ?', [t.name]))
        .map((c) => c.column_name);
      const source = sqlite.prepare(`PRAGMA table_info(${t.name})`).all().map((c) => c.name);
      const columns = (t.columns ?? source).filter((c) => source.includes(c) && target.includes(c));
      const order = source.includes('id') ? 'ORDER BY id' : '';
      const rows = sqlite.prepare(`SELECT ${columns.join(', ')} FROM ${t.name} ${order}`).all();
      for (let i = 0; i < rows.length; i += BATCH) {
        const chunk = rows.slice(i, i + BATCH);
        const marks = chunk.map(() => `(${columns.map(() => '?').join(', ')})`).join(', ');
        await pg.run(`INSERT INTO ${t.name} (${columns.join(', ')}) VALUES ${marks}`, chunk.flatMap((r) => columns.map((c) => r[c] ?? null)));
      }
      log(`${t.name}: ${rows.length}`);
      if (target.includes('id') && rows.length) {
        const floor = t.name === 'users' ? USER_ID_FLOOR : 1;
        await pg.get(`SELECT setval(pg_get_serial_sequence('${t.name}', 'id'), GREATEST((SELECT MAX(id) FROM ${t.name}), ${floor}))`);
      }
    }
    // The projection may miss users that only exist as foreign keys (never signed in since the copy); counts must match.
    for (const t of plan) {
      const copied = (await pg.get(`SELECT COUNT(*) AS n FROM ${t.name}`)).n;
      if (copied !== counts[t.name]) throw new Error(`${t.name}: copied ${copied} rows, source has ${counts[t.name]}`);
    }
  });
  return { dryRun: false, counts };
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const args = new Set(process.argv.slice(2));
  const dataDir = process.env.DATA_DIR ? path.resolve(process.env.DATA_DIR) : path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..', 'data');
  if (!process.env.AI_BOARD_DATABASE_URL) { console.error('AI_BOARD_DATABASE_URL is required'); process.exit(1); }
  const sqlite = new Database(path.join(dataDir, 'tizia.db'), { readonly: true, fileMustExist: true });
  const pg = createPgDb({ url: process.env.AI_BOARD_DATABASE_URL, max: 2 });
  try {
    const result = await copyAiBoardToPostgres({ sqlite, pg, dryRun: args.has('--dry-run'), force: args.has('--force'), log: console.log });
    console.log(result.dryRun ? 'dry run, nothing written:' : 'copied:', JSON.stringify(result.counts));
  } finally {
    sqlite.close();
    await pg.close();
  }
}
