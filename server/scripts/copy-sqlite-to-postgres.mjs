/**
 * One-off copy of an existing SQLite database (every table: users, sessions, requests, ai_*, ...) into the app's PostgreSQL.
 * Rows are copied verbatim, password hashes included (they are real account data), but this script only ever logs table
 * names and counts, and rewrites database errors without the row detail, so no value reaches a log.
 *
 *   1. Boot the app once on an EMPTY PostgreSQL (DATABASE_URL=...) so it creates the schema (it also seeds the skills catalog), stop it.
 *   2. node server/scripts/copy-sqlite-to-postgres.mjs --dry-run     # exhaustive table/column preflight, writes nothing
 *   3. node server/scripts/copy-sqlite-to-postgres.mjs --replace     # copy; seeded target tables are emptied first
 *
 *   --replace         allow target tables that already hold rows (their rows are deleted first). Without it: refuse.
 *   --skip-missing    rejected; exceptions require a separately user-approved mapping manifest.
 *   --sqlite <file>   source file (default DATA_DIR/tizia.db), opened read-only.
 *
 * Every source table is checked, including schema_migrations. No implicit table or column exceptions.
 *
 * Needs DATABASE_URL (target). Source reading uses better-sqlite3, which is NOT an app dependency any more: install it
 * for this one run (`npm i --no-save better-sqlite3`). Rows, content hashes and FK checks are verified before commit.
 * Identity sequences advance after verification (PostgreSQL sequence state itself is not transactional).
 * Use an owned, consistent offline snapshot. SQLite is opened read-only in a read transaction and never modified.
 */
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';
import { createPgDb } from '../ai-board/db/index.js';

const MAX_PARAMS = 60_000;

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
  try {
  if (skipMissing) throw new Error('skip-missing is disabled: every source table and column requires a mapping; exceptions require user approval');
  const sourceTables = sqlite.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%' ORDER BY name").all().map((r) => r.name);
  const targetTables = new Set((await pg.all("SELECT table_name FROM information_schema.tables WHERE table_schema = current_schema() AND table_type = 'BASE TABLE'")).map((r) => r.table_name));
  const missing = sourceTables.filter((t) => !targetTables.has(t));
  let plan = sourceTables.filter((t) => targetTables.has(t));

  // Inspect EVERY source field before either dry-run or writes (including migration bookkeeping).
  const mappings = {};
  const problems = missing.map((t) => `${t}: missing target table`);
  for (const t of plan) {
    const source = sqlite.prepare(`PRAGMA table_xinfo(${q(t)})`).all().map((c) => c.name);
    const target = await pg.all('SELECT column_name, data_type, is_generated FROM information_schema.columns WHERE table_schema = current_schema() AND table_name = ? ORDER BY ordinal_position', [t]);
    mappings[t] = source.map((name) => ({ name, target: target.find((c) => c.column_name === name) }));
    for (const c of mappings[t]) {
      if (!c.target) problems.push(`${t}.${c.name}: missing target column`);
      else if (c.target.is_generated !== 'NEVER') problems.push(`${t}.${c.name}: generated target column requires an explicit mapping`);
      else if (!['smallint', 'integer', 'bigint', 'real', 'double precision', 'text', 'character varying', 'character', 'bytea', 'boolean'].includes(c.target.data_type)) problems.push(`${t}.${c.name}: unsupported target type ${c.target.data_type}`);
    }
  }
  if (problems.length) throw new Error(`mapping preflight failed: ${problems.join('; ')}; no data was written`);
  const sourceFkFailures = sqlite.prepare('PRAGMA foreign_key_check').all();
  if (sourceFkFailures.length) throw new Error(`source foreign key verification failed: ${[...new Set(sourceFkFailures.map((r) => r.table))].join(', ')}; no data was written`);
  // Receipts control startup migrations. A raw copy is safe only when initialized source/target keys agree;
  // otherwise an explicit, approved compatibility mapping is needed, not a silent overwrite or exclusion.
  if (plan.includes('schema_migrations')) {
    if (!['scope', 'version'].every((name) => mappings.schema_migrations.some((c) => c.name === name))) throw new Error('schema_migrations: receipt representation requires an approved mapping; no data was written');
    const sourceReceipts = sqlite.prepare('SELECT scope, version FROM schema_migrations ORDER BY scope, version').all();
    const targetReceipts = await pg.all('SELECT scope, version FROM schema_migrations ORDER BY scope, version');
    // Approved by the user (2026-10-08): the target may be newer. Every source receipt must exist in the target; the target keeps its
    // own receipts and the table is not copied (the target schema is the newer one). A source receipt missing in the target still fails.
    const targetKeys = new Set(targetReceipts.map((r) => `${r.scope}|${r.version}`));
    if (sourceReceipts.some((r) => !targetKeys.has(`${r.scope}|${r.version}`))) throw new Error('schema_migrations: source/target receipt identities differ; approved mapping required; no data was written');
    plan = plan.filter((t) => t !== 'schema_migrations');
  }

  const counts = {};
  for (const t of plan) counts[t] = sqlite.prepare(`SELECT COUNT(*) AS n FROM ${q(t)}`).get().n;
  const seeded = [];
  for (const t of plan) if ((await pg.get(`SELECT COUNT(*) AS n FROM ${q(t)}`)).n > 0) seeded.push(t);
  const result = { dryRun, counts, skipped: [], replacing: seeded, droppedColumns: {}, mapping: Object.fromEntries(plan.map((t) => [t, mappings[t].map((c) => c.name)])), content: {}, foreignKeysVerified: false, sequences: {} };
  if (dryRun) return result;
  if (seeded.length && !replace) throw new Error(`target tables already hold rows: ${seeded.join(', ')} (--replace to overwrite them)`);

  const ordered = await insertOrder(pg, plan);
  await pg.tx(async () => {
    for (const t of [...ordered].reverse()) if (seeded.includes(t)) await pg.run(`DELETE FROM ${q(t)}`);
    for (const t of ordered) {
      const columns = mappings[t].map((c) => c.name);
      const per = Math.max(1, Math.min(500, Math.floor(MAX_PARAMS / columns.length)));
      const select = sqlite.prepare(`SELECT ${columns.map(q).join(', ')} FROM ${q(t)}`);
      if (select.safeIntegers) select.safeIntegers(true);
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
      log(`${t}: ${counts[t]}`);
    }
    for (const t of plan) {
      const copied = (await pg.get(`SELECT COUNT(*) AS n FROM ${q(t)}`)).n;
      if (copied !== counts[t]) throw new Error(`${t}: copied ${copied} rows, source has ${counts[t]}`);
      const sourceSelect = sqlite.prepare(`SELECT ${mappings[t].map((c) => q(c.name)).join(', ')} FROM ${q(t)}`);
      if (sourceSelect.safeIntegers) sourceSelect.safeIntegers(true);
      const sourceHash = contentHash(sourceSelect.iterate(), mappings[t]);
      const targetRows = await pg.all(`SELECT ${mappings[t].map((c) => `${q(c.name)}${['smallint', 'integer', 'bigint', 'numeric'].includes(c.target.data_type) ? '::text' : ''} AS ${q(c.name)}`).join(', ')} FROM ${q(t)}`);
      const targetHash = contentHash(targetRows, mappings[t]);
      if (sourceHash !== targetHash) throw new Error(`${t}: content verification failed; transaction rolled back`);
      result.content[t] = { rows: copied, sha256: sourceHash };
    }
    // Immediate and deferred foreign keys must both pass before reporting success.
    await pg.exec('SET CONSTRAINTS ALL IMMEDIATE');
    result.foreignKeysVerified = true;
    // Only advance sequences after content/FK checks. PostgreSQL sequence changes are not transactional.
    const hasSqliteSequence = Boolean(sqlite.prepare("SELECT 1 FROM sqlite_master WHERE type='table' AND name='sqlite_sequence'").get());
    for (const t of plan) for (const c of mappings[t]) {
      const seq = (await pg.get('SELECT pg_get_serial_sequence(?, ?) AS s', [q(t), c.name])).s;
      if (!seq) continue;
      const maximum = (await pg.get(`SELECT MAX(${q(c.name)})::text AS n FROM ${q(t)}`)).n;
      const sourceSequence = hasSqliteSequence && c.name === 'id' ? sqlite.prepare('SELECT CAST(seq AS TEXT) AS n FROM sqlite_sequence WHERE name = ?').get(t)?.n : null;
      const state = await pg.get(`SELECT last_value::text AS n, is_called FROM ${seq}`);
      const highWater = [maximum, sourceSequence].filter((n) => n !== null && n !== undefined).reduce((n, v) => BigInt(v) > n ? BigInt(v) : n, 0n);
      if (highWater > 0n && (!state.is_called || BigInt(state.n) < highWater)) await pg.get('SELECT setval(?::regclass, ?::bigint, true)', [seq, highWater.toString()]);
      const verified = await pg.get(`SELECT last_value::text AS n, is_called FROM ${seq}`);
      if (highWater > 0n && (!verified.is_called || BigInt(verified.n) < highWater)) throw new Error(`${t}.${c.name}: sequence verification failed`);
      result.sequences[`${t}.${c.name}`] = { verified: true, sourceHighWaterPreserved: true };
    }
  });
  return result;
  } catch (error) {
    if (error.code) throw safeError('copy', error);
    throw error;
  }
}

// Hash sorted row hashes so tables without primary keys and duplicate rows are verified as multisets.
// Values never enter diagnostics; casts preserve integers larger than Number.MAX_SAFE_INTEGER.
function contentHash(rows, mapping) {
  const hashes = [];
  for (const row of rows) {
    const values = mapping.map(({ name, target }) => {
      const value = row[name];
      if (value === null || value === undefined) return null;
      if (target.data_type === 'bytea') return ['bytes', Buffer.from(value).toString('hex')];
      if (['smallint', 'integer', 'bigint'].includes(target.data_type)) return ['integer', BigInt(value).toString()];
      if (['real', 'double precision', 'numeric'].includes(target.data_type)) return ['number', String(Number(value))];
      if (target.data_type === 'boolean') return ['boolean', value === true || value === 1 || value === 1n || value === '1'];
      return ['text', String(value)];
    });
    hashes.push(createHash('sha256').update(JSON.stringify(values)).digest('hex'));
  }
  return createHash('sha256').update(hashes.sort().join('\n')).digest('hex');
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
  sqlite.exec('BEGIN'); // consistent read snapshot across preflight and verification
  const pg = createPgDb({ url: process.env.DATABASE_URL, max: 2 });
  try {
    const r = await copySqliteToPostgres({ sqlite, pg, dryRun: flag('--dry-run'), replace: flag('--replace'), skipMissing: flag('--skip-missing'), log: console.log });
    console.log(r.dryRun ? 'dry run, nothing written:' : 'copied:', JSON.stringify(r.counts));
    if (r.skipped.length) console.log('skipped (no target table):', r.skipped.join(', '));
  } catch (e) { console.error(e.message); process.exitCode = 1; } finally {
    sqlite.exec('ROLLBACK');
    sqlite.close();
    await pg.close();
  }
}
