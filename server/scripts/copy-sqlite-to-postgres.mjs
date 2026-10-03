/**
 * One-off copy of an existing SQLite database (every table: users, sessions, requests, ai_*, ...) into the app's PostgreSQL.
 * Rows are copied verbatim, password hashes included (they are real account data), but this script only ever logs table
 * names and counts, and rewrites database errors without the row detail, so no value reaches a log.
 *
 *   1. Boot the app once on an EMPTY PostgreSQL (DATABASE_URL=...) so it creates the schema (it also seeds the skills catalog), stop it.
 *   2. node server/scripts/copy-sqlite-to-postgres.mjs --dry-run     # counts only, writes nothing
 *   3. node server/scripts/copy-sqlite-to-postgres.mjs --replace     # copy; seeded target tables are emptied first
 *
 *   --replace         allow target tables that already hold rows (their rows are deleted first). Without it: refuse.
 *   --skip-missing    source tables with no target table are skipped (default: refuse, so nothing is silently lost).
 *   --sqlite <file>   source file (default DATA_DIR/tizia.db), opened read-only.
 *
 * schema_migrations is never copied (the target ran its own migrations when the app booted).
 *
 * Needs DATABASE_URL (target). Source reading uses better-sqlite3, which is NOT an app dependency any more: install it
 * for this one run (`npm i --no-save better-sqlite3`). All-or-nothing in one transaction; per-table row counts are verified
 * before commit. Identity sequences are moved past the copied ids. SQLite is never modified; rollback = drop the schema.
 */
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createPgDb } from '../ai-board/db/index.js';

const MAX_PARAMS = 60_000;
const NEVER_COPY = new Set(['schema_migrations']); // migration bookkeeping belongs to each backend; the booted target already ran its own

const q = (name) => `"${String(name).replace(/"/g, '""')}"`;

/** Parents before children by the target's foreign keys; cycles/self references keep source order. */
async function insertOrder(pg, tables) {
  const fks = await pg.all(`
    SELECT cl.relname AS child, pl.relname AS parent
    FROM pg_constraint c
    JOIN pg_class cl ON cl.oid = c.conrelid JOIN pg_class pl ON pl.oid = c.confrelid
    JOIN pg_namespace n ON n.oid = cl.relnamespace
    WHERE c.contype = 'f' AND n.nspname = current_schema()`);
  const wants = new Map(tables.map((t) => [t, new Set()]));
  for (const { child, parent } of fks) if (child !== parent && wants.has(child) && wants.has(parent)) wants.get(child).add(parent);
  const done = new Set();
  const out = [];
  while (out.length < tables.length) {
    const ready = tables.filter((t) => !done.has(t) && [...wants.get(t)].every((p) => done.has(p)));
    const batch = ready.length ? ready : tables.filter((t) => !done.has(t)); // cycle: take the rest as is
    for (const t of batch) { done.add(t); out.push(t); }
  }
  return out;
}

/** pg errors carry the offending row in `detail`; keep only where and which rule. */
const safeError = (table, err) => new Error(`${table}: ${err.code || 'error'}${err.constraint ? ` (${err.constraint})` : ''}`);

export async function copySqliteToPostgres({ sqlite, pg, dryRun = false, replace = false, skipMissing = false, log = () => {} }) {
  const sourceTables = sqlite.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%' ORDER BY name").all().map((r) => r.name)
    .filter((t) => !NEVER_COPY.has(t));
  const targetTables = new Set((await pg.all("SELECT table_name FROM information_schema.tables WHERE table_schema = current_schema() AND table_type = 'BASE TABLE'")).map((r) => r.table_name));
  const missing = sourceTables.filter((t) => !targetTables.has(t));
  if (missing.length && !skipMissing) throw new Error(`target has no table for: ${missing.join(', ')} (boot the app on this PostgreSQL first, or --skip-missing)`);
  const plan = sourceTables.filter((t) => targetTables.has(t));

  const counts = {};
  for (const t of plan) counts[t] = sqlite.prepare(`SELECT COUNT(*) AS n FROM ${q(t)}`).get().n;
  const seeded = [];
  for (const t of plan) if ((await pg.get(`SELECT COUNT(*) AS n FROM ${q(t)}`)).n > 0) seeded.push(t);
  const result = { dryRun, counts, skipped: missing, replacing: seeded, droppedColumns: {} };
  if (dryRun) return result;
  if (seeded.length && !replace) throw new Error(`target tables already hold rows: ${seeded.join(', ')} (--replace to overwrite them)`);

  const ordered = await insertOrder(pg, plan);
  await pg.tx(async () => {
    for (const t of [...ordered].reverse()) if (seeded.includes(t)) await pg.run(`DELETE FROM ${q(t)}`);
    for (const t of ordered) {
      const target = (await pg.all('SELECT column_name FROM information_schema.columns WHERE table_schema = current_schema() AND table_name = ?', [t])).map((c) => c.column_name);
      const source = sqlite.prepare(`PRAGMA table_info(${q(t)})`).all().map((c) => c.name);
      const columns = source.filter((c) => target.includes(c));
      const dropped = source.filter((c) => !target.includes(c));
      if (dropped.length) { result.droppedColumns[t] = dropped; log(`${t}: columns not in target, not copied: ${dropped.join(', ')}`); }
      if (!columns.length) continue;
      const per = Math.max(1, Math.min(500, Math.floor(MAX_PARAMS / columns.length)));
      const select = sqlite.prepare(`SELECT ${columns.map(q).join(', ')} FROM ${q(t)}${source.includes('id') ? ' ORDER BY id' : ''}`);
      const insert = (chunk) => {
        const marks = chunk.map(() => `(${columns.map(() => '?').join(', ')})`).join(', ');
        return pg.run(`INSERT INTO ${q(t)} (${columns.map(q).join(', ')}) VALUES ${marks}`, chunk.flatMap((r) => columns.map((c) => r[c] ?? null)));
      };
      try {
        let chunk = [];
        for (const row of select.iterate()) {
          chunk.push(row);
          if (chunk.length >= per) { await insert(chunk); chunk = []; }
        }
        if (chunk.length) await insert(chunk);
      } catch (err) { throw safeError(t, err); }
      const seq = counts[t] && target.includes('id') ? (await pg.get(`SELECT pg_get_serial_sequence('${q(t)}', 'id') AS s`)).s : null;
      if (seq) await pg.get(`SELECT setval('${seq}', (SELECT MAX(id) FROM ${q(t)}))`);
      log(`${t}: ${counts[t]}`);
    }
    for (const t of plan) {
      const copied = (await pg.get(`SELECT COUNT(*) AS n FROM ${q(t)}`)).n;
      if (copied !== counts[t]) throw new Error(`${t}: copied ${copied} rows, source has ${counts[t]}`);
    }
  });
  return result;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const argv = process.argv.slice(2);
  const flag = (n) => argv.includes(n);
  const val = (n) => (argv.includes(n) ? argv[argv.indexOf(n) + 1] : undefined);
  if (!process.env.DATABASE_URL) { console.error('DATABASE_URL (target PostgreSQL) is required'); process.exit(1); }
  const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
  const file = path.resolve(val('--sqlite') || path.join(process.env.DATA_DIR ? path.resolve(process.env.DATA_DIR) : path.join(root, 'data'), 'tizia.db'));
  let Database;
  try { ({ default: Database } = await import('better-sqlite3')); } catch {
    console.error('better-sqlite3 is needed only to read the old file: run `npm i --no-save better-sqlite3` and retry'); process.exit(1);
  }
  const sqlite = new Database(file, { readonly: true, fileMustExist: true });
  const pg = createPgDb({ url: process.env.DATABASE_URL, max: 2 });
  try {
    const r = await copySqliteToPostgres({ sqlite, pg, dryRun: flag('--dry-run'), replace: flag('--replace'), skipMissing: flag('--skip-missing'), log: console.log });
    console.log(r.dryRun ? 'dry run, nothing written:' : 'copied:', JSON.stringify(r.counts));
    if (r.skipped.length) console.log('skipped (no target table):', r.skipped.join(', '));
  } catch (e) { console.error(e.message); process.exitCode = 1; } finally {
    sqlite.close();
    await pg.close();
  }
}
