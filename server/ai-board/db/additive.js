// Additive-only application of the AI Board migrations to an existing production PostgreSQL.
// The new-table set is derived from the migration files and every statement is checked against an explicit allowlist
// before anything runs; the same set drives preflight, apply and rollback. Never match tables by an `ai_` prefix:
// production already owns ai_decisions, ai_prompt_log, ai_token_usage and ai_lesson_content.
import { listMigrationVersions, loadMigrationSql, MIGRATION_LOCK } from './index.js';

export const EXPECTED_NEW_TABLES = 36;
export const PROD_OWNED = new Set(['users', 'requests', 'schema_migrations', 'ai_decisions', 'ai_prompt_log', 'ai_token_usage', 'ai_lesson_content']);
// AI Board tables the app creates at boot (db.js), outside the migration set. Kept apart from the 30: apply/rollback must not drop them.
export const AI_BOARD_BOOT_TABLES = ['skill_proposals', 'gate_trace'];
export const REQUESTS_ALLOW = {
  columns: ['owner_user_id', 'owner_domain', 'idempotency_key', 'owner_state', 'clarified_spec', 'folder_id'],
  indexes: ['ux_requests_owner_idempotency', 'idx_requests_owner'],
};
export const FUNCTION_ALLOW = { ai_root_request_status_fn: { writes: ['requests'] } };
const EXTERNAL_REFS_ALLOW = new Set(['users.id', 'requests.id']);
const SCOPE = 'ai-board';

/** Split SQL into statements outside comments/quotes/dollar bodies; `masked` hides literals and function bodies. */
export function splitStatements(sql) {
  const out = [];
  let text = ''; let masked = ''; let i = 0;
  const flush = () => { if (masked.trim()) out.push({ text: text.trim(), masked: masked.replace(/\s+/g, ' ').trim(), body: bodies.splice(0).join('\n') }); text = ''; masked = ''; };
  const bodies = [];
  while (i < sql.length) {
    const c = sql[i];
    if (c === '-' && sql[i + 1] === '-') { while (i < sql.length && sql[i] !== '\n') i++; continue; }
    if (c === '/' && sql[i + 1] === '*') { const e = sql.indexOf('*/', i + 2); i = e < 0 ? sql.length : e + 2; continue; }
    if (c === "'" || c === '"') {
      let j = i + 1;
      while (j < sql.length && !(sql[j] === c && sql[j + 1] !== c)) j += sql[j] === c ? 2 : 1;
      text += sql.slice(i, j + 1); masked += c === "'" ? "''" : sql.slice(i, j + 1); i = j + 1; continue;
    }
    const tag = c === '$' ? /^\$[A-Za-z_]*\$/.exec(sql.slice(i, i + 40))?.[0] : null;
    if (tag) {
      const e = sql.indexOf(tag, i + tag.length);
      if (e < 0) throw new Error('unterminated dollar-quoted body');
      bodies.push(sql.slice(i + tag.length, e));
      text += sql.slice(i, e + tag.length); masked += '$$'; i = e + tag.length; continue;
    }
    if (c === ';') { flush(); i++; continue; }
    text += c; masked += c; i++;
  }
  flush();
  return out;
}

const RX = {
  createTable: /^CREATE TABLE (?:IF NOT EXISTS )?(\w+) \(/i,
  createIndex: /^CREATE (?:UNIQUE )?INDEX (?:IF NOT EXISTS )?(\w+) ON (\w+)\s*\(/i,
  alterAdd: /^ALTER TABLE (\w+) ADD COLUMN (?:IF NOT EXISTS )?(\w+) /i,
  insert: /^INSERT INTO (\w+)/i,
  update: /^UPDATE (\w+) /i,
  fn: /^CREATE (?:OR REPLACE )?FUNCTION (\w+)\s*\(/i,
  trigger: /^CREATE TRIGGER (\w+) .*? ON (\w+) /i,
  ref: /REFERENCES (\w+)\s*\(\s*(\w+)\s*\)/gi,
};

/** Parse + police every migration statement. Returns the object inventory and violations (empty when additive-only). */
export function analyzeMigrations({ dir } = {}) {
  const versions = listMigrationVersions(dir);
  const files = versions.map((version) => ({ version, statements: splitStatements(loadMigrationSql(version, { dir })) }));
  const newTables = [];
  for (const f of files) for (const s of f.statements) {
    const m = RX.createTable.exec(s.masked);
    if (m) newTables.push(m[1].toLowerCase());
  }
  const inNew = (t) => newTables.includes(String(t).toLowerCase());
  const violations = [];
  const inv = { versions, newTables, requestsColumns: [], requestsIndexes: [], indexes: [], functions: [], triggers: [], externalRefs: [] };
  const bad = (f, s, why) => violations.push(`${f.version}: ${why}: ${s.masked.slice(0, 90)}`);
  for (const f of files) for (const s of f.statements) {
    let m;
    if ((m = RX.createTable.exec(s.masked))) {
      if (PROD_OWNED.has(m[1].toLowerCase())) bad(f, s, 'creates a production-owned table name');
    } else if ((m = RX.createIndex.exec(s.masked))) {
      const [, name, table] = m;
      if (inNew(table)) inv.indexes.push(name);
      else if (table.toLowerCase() === 'requests' && REQUESTS_ALLOW.indexes.includes(name)) { inv.requestsIndexes.push(name); inv.indexes.push(name); }
      else bad(f, s, 'index on a table outside the AI Board set');
    } else if ((m = RX.alterAdd.exec(s.masked))) {
      const [, table, col] = m;
      if (inNew(table)) continue;
      if (table.toLowerCase() === 'requests' && REQUESTS_ALLOW.columns.includes(col)) inv.requestsColumns.push(col);
      else bad(f, s, 'ALTER on a table/column outside the allowlist');
    } else if ((m = RX.insert.exec(s.masked)) || (m = RX.update.exec(s.masked))) {
      if (!inNew(m[1])) bad(f, s, 'DML on a table outside the AI Board set');
    } else if ((m = RX.fn.exec(s.masked))) {
      const allow = FUNCTION_ALLOW[m[1]];
      const writes = [...s.body.matchAll(/\b(?:UPDATE|INSERT INTO|DELETE FROM)\s+(\w+)/gi)].map((x) => x[1].toLowerCase());
      if (!allow) bad(f, s, 'function not allowlisted');
      else if (writes.some((t) => !allow.writes.includes(t) && !inNew(t))) bad(f, s, 'function body writes an unexpected table');
      else inv.functions.push(m[1]);
    } else if ((m = RX.trigger.exec(s.masked))) {
      if (inNew(m[2])) inv.triggers.push({ name: m[1], table: m[2] }); else bad(f, s, 'trigger on a table outside the AI Board set');
    } else bad(f, s, 'statement type not allowed');
    for (const r of s.masked.matchAll(RX.ref)) {
      if (inNew(r[1])) continue;
      const key = `${r[1].toLowerCase()}.${r[2].toLowerCase()}`;
      if (!EXTERNAL_REFS_ALLOW.has(key)) bad(f, s, `FK target ${key} not allowlisted`);
      else inv.externalRefs.push(key);
    }
  }
  inv.externalRefs = [...new Set(inv.externalRefs)].sort();
  if (newTables.length !== EXPECTED_NEW_TABLES) violations.push(`expected ${EXPECTED_NEW_TABLES} new tables, found ${newTables.length}`);
  if (new Set(newTables).size !== newTables.length) violations.push('duplicate CREATE TABLE across files');
  const missing = REQUESTS_ALLOW.columns.filter((c) => !inv.requestsColumns.includes(c));
  if (missing.length) violations.push(`requests columns not added by any file: ${missing.join(',')}`);
  return { ...inv, violations, files };
}

export function assertAdditive(analysis) {
  if (analysis.violations.length) throw new Error(`not additive-only:\n  ${analysis.violations.join('\n  ')}`);
  return analysis;
}

const PROBLEM = (level, check, detail) => ({ level, check, detail });
const q = (c, sql, p) => c.query(sql, p).then((r) => r.rows);

/** Read-only inspection of the target DB; each problem is {level: FAIL|WARN|INFO, check, detail}. */
export async function preflight(c, analysis) {
  const out = [];
  const add = (level, check, detail) => out.push(PROBLEM(level, check, detail));
  const [env] = await q(c, `SELECT current_user AS u, current_schema() AS s, current_setting('search_path') AS sp,
    current_setting('server_version_num')::int AS v, current_setting('server_version') AS vs, pg_is_in_recovery() AS ro,
    (SELECT rolsuper FROM pg_roles WHERE rolname = current_user) AS su,
    current_setting('default_transaction_read_only') AS dtro,
    (SELECT datcollate FROM pg_database WHERE datname = current_database()) AS collate,
    (SELECT pg_encoding_to_char(encoding) FROM pg_database WHERE datname = current_database()) AS enc`);
  add('INFO', 'environment', JSON.stringify(env));
  if (!env.s) add('FAIL', 'search_path', `no usable schema in search_path (${env.sp})`);
  if (env.v < 110000) add('FAIL', 'version', `PostgreSQL ${env.vs}: need >= 11 (identity columns, EXECUTE FUNCTION)`);
  if (env.ro) add('FAIL', 'recovery', 'connected to a read-only standby');
  if (env.dtro === 'on') add('FAIL', 'read_only_default', 'default_transaction_read_only=on');
  if (env.su) add('WARN', 'role', 'migration role is superuser; the rehearsed path is a non-superuser role');
  const [pl] = await q(c, `SELECT count(*)::int AS n FROM pg_language WHERE lanname = 'plpgsql'`);
  if (!pl.n) add('FAIL', 'plpgsql', 'language plpgsql missing');
  const [cr] = await q(c, `SELECT has_schema_privilege(current_user, current_schema(), 'CREATE') AS ok`);
  if (!cr.ok) add('FAIL', 'schema_create', `no CREATE on schema ${env.s}`);

  let presentCols = [];
  for (const t of ['users', 'requests']) {
    const rel = await q(c, `SELECT c.oid, n.nspname, pg_get_userbyid(c.relowner) AS owner, pg_has_role(current_user, c.relowner, 'USAGE') AS owned,
      has_column_privilege(current_user, c.oid, 'id', 'REFERENCES') AS refs
      FROM pg_class c JOIN pg_namespace n ON n.oid = c.relnamespace WHERE c.relname = $1 AND c.relkind IN ('r','p') AND n.nspname = current_schema()`, [t]);
    if (!rel.length) { add('FAIL', `${t}.exists`, `${t} not in schema ${env.s}`); continue; }
    const resolved = await q(c, `SELECT (to_regclass($1))::oid AS oid`, [t]);
    if (String(resolved[0].oid) !== String(rel[0].oid)) add('FAIL', `${t}.search_path`, `unqualified ${t} resolves to a different table than ${env.s}.${t}`);
    if (!rel[0].refs) add('FAIL', `${t}.references`, `no REFERENCES privilege on ${t}(id)`);
    if (t === 'requests' && !rel[0].owned) add('FAIL', 'requests.owner', `ALTER TABLE requests needs ownership; owner is ${rel[0].owner}, not a role of ${env.u}`);
    const col = await q(c, `SELECT a.attname, format_type(a.atttypid, a.atttypmod) AS typ FROM pg_attribute a WHERE a.attrelid = $1 AND a.attnum > 0 AND NOT a.attisdropped`, [rel[0].oid]);
    const byName = Object.fromEntries(col.map((x) => [x.attname, x.typ]));
    if (byName.id !== 'bigint') add(byName.id === 'integer' ? 'WARN' : 'FAIL', `${t}.id.type`, `${t}.id is ${byName.id}; AI Board FK columns are bigint (integer works, anything else fails)`);
    const [uq] = await q(c, `SELECT count(*)::int AS n FROM pg_index i WHERE i.indrelid = $1 AND (i.indisprimary OR i.indisunique) AND i.indnatts = 1
      AND i.indkey[0] = (SELECT attnum FROM pg_attribute WHERE attrelid = $1 AND attname = 'id')`, [rel[0].oid]);
    if (!uq.n) add('FAIL', `${t}.id.unique`, `${t}.id has no single-column PK/unique index (required by FK)`);
    if (t === 'requests') {
      for (const [n, want] of [['status', 'text'], ['admin_note', 'text'], ['updated_at', 'bigint'], ['created_at', 'bigint']]) {
        if (byName[n] !== want) add('FAIL', `requests.${n}`, `trigger and index on requests need requests.${n} ${want}; found ${byName[n] ?? 'missing'}`);
      }
      presentCols = REQUESTS_ALLOW.columns.filter((n) => n in byName);
    }
  }

  const names = [...analysis.newTables, 'schema_migrations'];
  const existing = await q(c, `SELECT c.relname, c.relkind, n.nspname FROM pg_class c JOIN pg_namespace n ON n.oid = c.relnamespace
    WHERE c.relname = ANY($1) AND c.relkind IN ('r','p','v','m','f')`, [names]);
  const [rc] = await q(c, `SELECT to_regclass('schema_migrations') IS NOT NULL AS has`).catch(() => [{ has: false }]);
  let receipts = [];
  if (rc.has) {
    const cols = await q(c, `SELECT column_name FROM information_schema.columns WHERE table_schema = current_schema() AND table_name = 'schema_migrations'`);
    const have = cols.map((x) => x.column_name).sort().join(',');
    if (have !== 'applied_at,scope,version') add('FAIL', 'schema_migrations.shape', `existing schema_migrations has columns (${have}); runner needs (scope, version, applied_at)`);
    else {
      const pk = await q(c, `SELECT count(*)::int AS n FROM pg_index WHERE indrelid = 'schema_migrations'::regclass AND indisprimary AND indnatts = 2`);
      if (!pk[0].n) add('FAIL', 'schema_migrations.pk', 'existing schema_migrations lacks PRIMARY KEY(scope, version)');
      receipts = (await q(c, `SELECT version FROM schema_migrations WHERE scope = $1`, [SCOPE])).map((x) => x.version);
    }
    add('INFO', 'schema_migrations', `exists; ${receipts.length} ${SCOPE} receipts`);
  }
  const clash = existing.filter((e) => e.relname !== 'schema_migrations');
  const state = receipts.length === 0 ? 'fresh' : [...receipts].sort().join() === analysis.versions.join() && clash.length === analysis.newTables.length ? 'applied' : 'partial';
  if (state === 'partial') add('FAIL', 'state', `${receipts.length}/${analysis.versions.length} receipts and ${clash.length}/${analysis.newTables.length} tables: partial state, stop`);
  if (state === 'fresh' && clash.length) add('FAIL', 'name_clash', `tables already exist without receipts (CREATE IF NOT EXISTS would skip them silently): ${clash.map((e) => `${e.nspname}.${e.relname}`).join(', ')}`);
  const other = existing.filter((e) => e.nspname !== env.s && e.relname !== 'schema_migrations');
  if (other.length) add('WARN', 'other_schema', `same names in other schemas: ${other.map((e) => `${e.nspname}.${e.relname}`).join(', ')}`);
  if (state === 'applied') add('INFO', 'state', 'already applied; apply is a no-op');
  else if (presentCols.length) add('FAIL', 'requests.columns', `already present: ${presentCols.join(', ')} (ADD COLUMN would fail or hide a different shape)`);

  if (state === 'fresh') {
    const objs = [...analysis.indexes, ...analysis.newTables.map((t) => `${t}_id_seq`)];
    const taken = await q(c, `SELECT relname, relkind FROM pg_class WHERE relnamespace = current_schema()::regnamespace AND relname = ANY($1)`, [objs]);
    if (taken.length) add('FAIL', 'name_clash.relation', `index/sequence names in use: ${taken.map((x) => x.relname).join(', ')}`);
    const fn = await q(c, `SELECT proname FROM pg_proc WHERE pronamespace = current_schema()::regnamespace AND proname = ANY($1)`, [analysis.functions]);
    if (fn.length) add('FAIL', 'name_clash.function', `CREATE OR REPLACE would overwrite: ${fn.map((x) => x.proname).join(', ')}`);
  }
  const ext = await q(c, `SELECT extname FROM pg_extension ORDER BY 1`);
  add('INFO', 'extensions', `installed: ${ext.map((x) => x.extname).join(', ')}; AI Board DDL requires none`);
  return { state, problems: out, ok: !out.some((p) => p.level === 'FAIL') };
}

/** Per-table schema items (columns, constraints, indexes, triggers) of the current schema, plus function names. */
export async function schemaSnapshot(c) {
  const tables = new Map();
  const put = (t, item) => { if (!tables.has(t)) tables.set(t, []); tables.get(t).push(item); };
  const ns = `current_schema()::regnamespace`;
  for (const r of await q(c, `SELECT c.relname t FROM pg_class c WHERE c.relnamespace = ${ns} AND c.relkind IN ('r','p')`)) if (!tables.has(r.t)) tables.set(r.t, []);
  for (const r of await q(c, `SELECT c.relname t, a.attname n, format_type(a.atttypid, a.atttypmod) typ, a.attnotnull nn, pg_get_expr(d.adbin, d.adrelid) def, a.attidentity idn
    FROM pg_attribute a JOIN pg_class c ON c.oid = a.attrelid LEFT JOIN pg_attrdef d ON d.adrelid = a.attrelid AND d.adnum = a.attnum
    WHERE c.relnamespace = ${ns} AND c.relkind IN ('r','p') AND a.attnum > 0 AND NOT a.attisdropped`)) put(r.t, `col:${r.n}:${r.typ}:${r.nn}:${r.def ?? ''}:${r.idn}`);
  for (const r of await q(c, `SELECT c.relname t, k.conname n, pg_get_constraintdef(k.oid) def FROM pg_constraint k JOIN pg_class c ON c.oid = k.conrelid WHERE c.relnamespace = ${ns} AND c.relkind IN ('r','p')`)) put(r.t, `con:${r.n}:${r.def}`);
  for (const r of await q(c, `SELECT tablename t, indexname n, indexdef def FROM pg_indexes WHERE schemaname = current_schema()`)) put(r.t, `idx:${r.n}:${r.def}`);
  for (const r of await q(c, `SELECT c.relname t, g.tgname n, pg_get_triggerdef(g.oid) def FROM pg_trigger g JOIN pg_class c ON c.oid = g.tgrelid WHERE c.relnamespace = ${ns} AND NOT g.tgisinternal`)) put(r.t, `trg:${r.n}:${r.def}`);
  const procs = (await q(c, `SELECT proname FROM pg_proc WHERE pronamespace = ${ns} ORDER BY 1`)).map((r) => r.proname);
  return { tables, procs };
}

/** Differences between two snapshots that fall outside the additive allowlist. Empty array = clean. */
export function unexpectedChanges(before, after, analysis, { createdSchemaMigrations = false, allowNew = [] } = {}) {
  const bad = [];
  const fresh = new Set([...analysis.newTables, ...(createdSchemaMigrations ? ['schema_migrations'] : [])]);
  for (const t of after.tables.keys()) if (!before.tables.has(t) && !fresh.has(t) && !allowNew.includes(t)) bad.push(`unexpected new table ${t}`);
  for (const t of fresh) if (before.tables.has(t) && t !== 'schema_migrations') bad.push(`table ${t} existed before`);
  for (const [t, items] of before.tables) {
    const now = new Set(after.tables.get(t) ?? []);
    if (!after.tables.has(t)) { bad.push(`table ${t} disappeared`); continue; }
    for (const i of items) if (!now.has(i)) bad.push(`${t}: lost/changed ${i.slice(0, 80)}`);
    const was = new Set(items);
    const added = [...now].filter((i) => !was.has(i));
    if (t !== 'requests') { for (const i of added) bad.push(`${t}: gained ${i.slice(0, 80)}`); continue; }
    const cols = added.filter((i) => i.startsWith('col:')).map((i) => i.split(':')[1]).sort();
    if (cols.join() !== [...REQUESTS_ALLOW.columns].sort().join()) bad.push(`requests: added columns ${cols.join(',')}`);
    const idx = added.filter((i) => i.startsWith('idx:')).map((i) => i.split(':')[1]).sort();
    if (idx.join() !== [...REQUESTS_ALLOW.indexes].sort().join()) bad.push(`requests: added indexes ${idx.join(',')}`);
    const con = added.filter((i) => i.startsWith('con:'));
    const okCon = con.length === 2 && con.some((i) => /FOREIGN KEY \(owner_user_id\) REFERENCES users\(id\)/.test(i)) && con.some((i) => /FOREIGN KEY \(folder_id\) REFERENCES ai_feature_folders\(id\)/.test(i));
    if (!okCon) bad.push(`requests: added constraints ${con.join(' | ')}`);
    if (added.some((i) => i.startsWith('trg:'))) bad.push('requests: gained a trigger');
  }
  const newProcs = after.procs.filter((p) => !before.procs.includes(p));
  if (newProcs.join() !== analysis.functions.join()) bad.push(`functions added: ${newProcs.join(',')}`);
  if (before.procs.some((p) => !after.procs.includes(p))) bad.push('a function disappeared');
  return bad;
}

const ident = (n) => { if (!/^[a-z_][a-z0-9_]*$/.test(n)) throw new Error(`bad identifier ${n}`); return `"${n}"`; };

async function begin(c, { lockTimeout, statementTimeout }) {
  await c.query('BEGIN');
  await c.query(`SET LOCAL lock_timeout = '${lockTimeout}'`);
  await c.query(`SET LOCAL statement_timeout = '${statementTimeout}'`);
  await c.query('SELECT pg_advisory_xact_lock($1)', [MIGRATION_LOCK]);
}

/** One transaction: preflight, migrate, verify allowlisted diff + receipts, optional grants. Commits only when commit=true. */
export async function applyAdditive(c, { commit = false, grantTo, lockTimeout = '5s', statementTimeout = '120s', dir } = {}) {
  const analysis = assertAdditive(analyzeMigrations({ dir }));
  await begin(c, { lockTimeout, statementTimeout });
  try {
    const pre = await preflight(c, analysis);
    if (!pre.ok) throw Object.assign(new Error('preflight failed'), { problems: pre.problems });
    if (pre.state === 'applied') { await c.query('ROLLBACK'); return { applied: [], state: 'applied', committed: false }; }
    const before = await schemaSnapshot(c);
    const counts = async () => (await q(c, `SELECT (SELECT count(*) FROM users)::text u, (SELECT count(*) FROM requests)::text r`))[0];
    const countBefore = await counts();
    const createdSchemaMigrations = !before.tables.has('schema_migrations');
    await c.query(`CREATE TABLE IF NOT EXISTS schema_migrations (scope TEXT NOT NULL, version TEXT NOT NULL, applied_at BIGINT NOT NULL, PRIMARY KEY(scope, version))`);
    for (const f of analysis.files) {
      await c.query(loadMigrationSql(f.version, { dir }));
      await c.query('INSERT INTO schema_migrations(scope, version, applied_at) VALUES ($1, $2, $3)', [SCOPE, f.version, Date.now()]);
    }
    if (grantTo) {
      const tabs = [...analysis.newTables, 'schema_migrations'].map(ident).join(', ');
      await c.query(`GRANT SELECT, INSERT, UPDATE, DELETE ON ${tabs} TO ${ident(grantTo)}`);
      const seqs = await q(c, `SELECT pg_get_serial_sequence(c.relname, a.attname) AS s FROM pg_attribute a JOIN pg_class c ON c.oid = a.attrelid
        WHERE c.relnamespace = current_schema()::regnamespace AND c.relname = ANY($1) AND a.attidentity <> ''`, [analysis.newTables]);
      for (const { s } of seqs) await c.query(`GRANT USAGE, SELECT ON SEQUENCE ${s} TO ${ident(grantTo)}`);
    }
    const after = await schemaSnapshot(c);
    const bad = unexpectedChanges(before, after, analysis, { createdSchemaMigrations });
    const got = (await q(c, `SELECT version FROM schema_migrations WHERE scope = $1 ORDER BY version`, [SCOPE])).map((x) => x.version);
    if (got.join() !== analysis.versions.join()) bad.push(`receipts ${got.join(',')} != ${analysis.versions.join(',')}`);
    const countAfter = await counts();
    if (countAfter.u !== countBefore.u || countAfter.r !== countBefore.r) bad.push(`row counts changed ${JSON.stringify(countBefore)} -> ${JSON.stringify(countAfter)}`);
    if (bad.length) throw Object.assign(new Error(`post-check failed:\n  ${bad.join('\n  ')}`), { problems: bad });
    await c.query(commit ? 'COMMIT' : 'ROLLBACK');
    return { applied: analysis.versions, state: 'fresh', committed: commit, warnings: pre.problems.filter((p) => p.level === 'WARN') };
  } catch (e) {
    await c.query('ROLLBACK').catch(() => {});
    throw e;
  }
}

/** Reverse of applyAdditive: drops exactly the new objects. Refuses non-empty tables/columns unless allowDataLoss. */
export async function rollbackAdditive(c, { commit = false, allowDataLoss = false, dropSchemaMigrations = false, lockTimeout = '5s', statementTimeout = '120s', dir } = {}) {
  const analysis = assertAdditive(analyzeMigrations({ dir }));
  const set = analysis.newTables;
  await begin(c, { lockTimeout, statementTimeout });
  try {
    const present = (await q(c, `SELECT relname FROM pg_class WHERE relnamespace = current_schema()::regnamespace AND relkind IN ('r','p') AND relname = ANY($1)`, [set])).map((x) => x.relname);
    if (present.length !== set.length) throw new Error(`only ${present.length}/${set.length} AI Board tables present; refusing a partial rollback`);
    const deps = await q(c, `SELECT k.conname, c.relname AS from_table, r.relname AS to_table FROM pg_constraint k
      JOIN pg_class c ON c.oid = k.conrelid JOIN pg_class r ON r.oid = k.confrelid
      WHERE k.contype = 'f' AND r.relname = ANY($1) AND r.relnamespace = current_schema()::regnamespace AND NOT (c.relname = ANY($1)) AND c.relname <> 'requests'`, [set]);
    if (deps.length) throw new Error(`outside tables reference AI Board tables: ${deps.map((d) => `${d.from_table}->${d.to_table}`).join(', ')}`);
    const nonEmpty = [];
    for (const t of set) { const [n] = await q(c, `SELECT count(*)::int AS n FROM ${ident(t)}`); if (n.n) nonEmpty.push(`${t}=${n.n}`); }
    const [rq] = await q(c, `SELECT count(*) FILTER (WHERE owner_user_id IS NOT NULL OR owner_domain IS NOT NULL OR idempotency_key IS NOT NULL OR clarified_spec IS NOT NULL OR folder_id IS NOT NULL OR owner_state IS DISTINCT FROM 'legacy_uncertain')::int AS n FROM requests`);
    if (rq.n) nonEmpty.push(`requests.new_columns=${rq.n} rows with data`);
    if (nonEmpty.length && !allowDataLoss) throw new Error(`refusing: data would be lost (${nonEmpty.join(', ')}); pass allowDataLoss to confirm`);
    const before = await schemaSnapshot(c);
    for (const t of analysis.triggers) await c.query(`DROP TRIGGER ${ident(t.name)} ON ${ident(t.table)}`);
    for (const f of analysis.functions) await c.query(`DROP FUNCTION ${ident(f)}()`);
    for (const col of [...REQUESTS_ALLOW.columns].reverse()) await c.query(`ALTER TABLE requests DROP COLUMN ${ident(col)}`);
    await c.query(`DROP TABLE ${[...set].reverse().map(ident).join(', ')}`);
    await c.query('DELETE FROM schema_migrations WHERE scope = $1', [SCOPE]);
    const [left] = await q(c, `SELECT count(*)::int AS n FROM schema_migrations`);
    if (dropSchemaMigrations && !left.n) await c.query('DROP TABLE schema_migrations');
    const after = await schemaSnapshot(c);
    const gone = [...before.tables.keys()].filter((t) => !after.tables.has(t)).sort();
    const expectGone = [...set, ...(dropSchemaMigrations && !left.n ? ['schema_migrations'] : [])].sort();
    const bad = [];
    if (gone.join() !== expectGone.join()) bad.push(`dropped ${gone.join(',')} != ${expectGone.join(',')}`);
    for (const [t, items] of before.tables) {
      if (set.includes(t) || !after.tables.has(t)) continue;
      const now = new Set(after.tables.get(t));
      const lost = items.filter((i) => !now.has(i));
      if (t !== 'requests' && lost.length) bad.push(`${t}: lost ${lost.join(' | ').slice(0, 120)}`);
      if (t === 'requests') {
        const extra = [...now].filter((i) => !items.includes(i));
        if (extra.length) bad.push(`requests gained ${extra.join(' | ')}`);
        const want = REQUESTS_ALLOW.columns.length + REQUESTS_ALLOW.indexes.length + 2;
        if (lost.length !== want) bad.push(`requests lost ${lost.length} items, expected ${want}`);
      }
    }
    if (bad.length) throw Object.assign(new Error(`rollback post-check failed:\n  ${bad.join('\n  ')}`), { problems: bad });
    await c.query(commit ? 'COMMIT' : 'ROLLBACK');
    return { dropped: set.length, committed: commit, dataLossConfirmed: nonEmpty.length ? nonEmpty : [] };
  } catch (e) {
    await c.query('ROLLBACK').catch(() => {});
    throw e;
  }
}
