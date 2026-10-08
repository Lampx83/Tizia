// App-wide database handle with the shape the app has always used (`prepare().get/all/run`, `exec`, `transaction`),
// backed by PostgreSQL (pool, ambient transactions, savepoints; see ai-board/db/index.js). Callers `await` every call.
//
// SQL is written once, SQLite-flavoured but portable: `?`, `@name` (named or mixed with `?`), ON CONFLICT, COALESCE.
// PostgreSQL gets: placeholders -> $n, `ADD COLUMN IF NOT EXISTS`, INTEGER->BIGINT, REAL->DOUBLE PRECISION in DDL,
// `lastInsertRowid` via RETURNING id for tables that have an id column.
import { createPgDb, toPgDdl } from './ai-board/db/index.js';

const TX_LOCK = 7_000_102; // legacy transactions run one at a time, like SQLite's single writer

/** Scan SQL once: `?` / `@name` / `:name` -> `$n`. Returns { sql, slots } where a slot is a position index or a name. */
export function compileParams(sql) {
  const slots = [];
  const named = new Map();
  let out = '';
  let i = 0;
  const push = (slot, key) => {
    if (key !== undefined && named.has(key)) return named.get(key);
    slots.push(slot);
    if (key !== undefined) named.set(key, slots.length);
    return slots.length;
  };
  while (i < sql.length) {
    const ch = sql[i];
    if (ch === "'") { // string literal, '' escapes
      let j = i + 1;
      while (j < sql.length && !(sql[j] === "'" && sql[j + 1] !== "'")) j += sql[j] === "'" ? 2 : 1;
      out += sql.slice(i, j + 1); i = j + 1; continue;
    }
    if (ch === '-' && sql[i + 1] === '-') { // line comment
      const j = sql.indexOf('\n', i); const end = j < 0 ? sql.length : j;
      out += sql.slice(i, end); i = end; continue;
    }
    if (ch === '/' && sql[i + 1] === '*') {
      const j = sql.indexOf('*/', i + 2); const end = j < 0 ? sql.length : j + 2;
      out += sql.slice(i, end); i = end; continue;
    }
    if (ch === '?') { out += `$${push({ pos: slots.filter((s) => s.pos !== undefined).length })}`; i++; continue; }
    if ((ch === '@' || ch === ':') && sql[i + 1] !== ':' && sql[i - 1] !== ':' && /[A-Za-z_]/.test(sql[i + 1] || '')) {
      const m = /^[A-Za-z_][A-Za-z0-9_]*/.exec(sql.slice(i + 1));
      out += `$${push({ name: m[0] }, m[0])}`; i += 1 + m[0].length; continue;
    }
    out += ch; i++;
  }
  return { sql: out, slots };
}

/** SQLite scalar MAX(a, b) / MIN(a, b) (a top-level comma; the aggregate has one argument) -> GREATEST / LEAST. */
export function pgScalarMinMax(sql) {
  return sql.replace(/\b(MAX|MIN)\s*\(/gi, (m, fn, at) => {
    let depth = 1;
    for (let i = at + m.length; i < sql.length && depth > 0; i++) {
      const ch = sql[i];
      if (ch === "'") { i = sql.indexOf("'", i + 1); if (i < 0) break; continue; }
      if (ch === '(') depth++;
      else if (ch === ')') depth--;
      else if (ch === ',' && depth === 1) return m.replace(/max/i, 'GREATEST').replace(/min/i, 'LEAST');
    }
    return m;
  });
}

/** Top-level argument list of the call whose '(' is at `open`. Returns { args:[text], end } (end = index after ')'). */
function callArgs(sql, open) {
  const args = [];
  let depth = 0; let start = open + 1;
  for (let i = open; i < sql.length; i++) {
    const ch = sql[i];
    if (ch === "'") { i = sql.indexOf("'", i + 1); if (i < 0) break; continue; }
    if (ch === '(') depth++;
    else if (ch === ')') { depth--; if (depth === 0) { args.push(sql.slice(start, i).trim()); return { args, end: i + 1 }; } }
    else if (ch === ',' && depth === 1) { args.push(sql.slice(start, i).trim()); start = i + 1; }
  }
  return null;
}

/** SQLite date(<ms/1000>, 'unixepoch'[, '+7 hours']) -> 'YYYY-MM-DD' text (UTC plus the optional hour offset). */
export function pgDateUnixepoch(sql) {
  let out = ''; let i = 0;
  const re = /\bdate\s*\(/gi;
  let m;
  while ((m = re.exec(sql))) {
    const call = callArgs(sql, m.index + m[0].length - 1);
    if (!call || call.args.length < 2 || !/^'unixepoch'$/i.test(call.args[1])) continue;
    const mod = call.args[2] ? /^'([+-]\d+) hours?'$/i.exec(call.args[2]) : null;
    const shift = mod ? ` + interval '${mod[1]} hours'` : '';
    out += sql.slice(i, m.index) + `to_char((to_timestamp(${pgDateUnixepoch(call.args[0])}) AT TIME ZONE 'UTC')${shift}, 'YYYY-MM-DD')`;
    i = call.end; re.lastIndex = call.end;
  }
  return out + sql.slice(i);
}

/** All SQLite -> PostgreSQL rewrites applied to DML text. */
export function pgDialect(sql) { return pgScalarMinMax(pgDateUnixepoch(sql)); }

/** Legacy call style (positional values, arrays, one named-object, or both) -> positional list for `slots`. */
export function bindParams(slots, args) {
  const flat = args.flat();
  const obj = flat.find((a) => a && typeof a === 'object' && !Buffer.isBuffer(a) && !(a instanceof Date));
  const positional = flat.filter((a) => a !== obj);
  return slots.map((s) => {
    if (s.pos !== undefined) return positional[s.pos];
    if (!obj || !(s.name in obj)) throw new RangeError(`Missing named parameter "${s.name}"`);
    return obj[s.name];
  });
}

/** SQLite-flavoured DDL (as written in db.js) -> PostgreSQL DDL. */
export function pgDdl(sql) {
  return toPgDdl(sql).replace(/\bADD COLUMN (?!IF NOT EXISTS)/gi, 'ADD COLUMN IF NOT EXISTS ');
}

/** Top-level `;` split that skips quotes and comments. */
export function splitStatements(sql) {
  const out = [];
  let cur = '';
  for (let i = 0; i < sql.length; i++) {
    const ch = sql[i];
    if (ch === "'") { const j = sql.indexOf("'", i + 1); const end = j < 0 ? sql.length : j + 1; cur += sql.slice(i, end); i = end - 1; continue; }
    if (ch === '-' && sql[i + 1] === '-') { const j = sql.indexOf('\n', i); const end = j < 0 ? sql.length : j; cur += sql.slice(i, end); i = end - 1; continue; }
    if (ch === ';') { if (cur.trim()) out.push(cur.trim()); cur = ''; continue; }
    cur += ch;
  }
  if (cur.trim()) out.push(cur.trim());
  return out.filter((s) => s.replace(/--[^\n]*/g, '').trim());
}

/** DDL batch: SQLite tolerates a FOREIGN KEY to a table created later in the same script, PostgreSQL does not.
 * Run statements in order; the ones that fail with "relation does not exist" are retried until nothing more succeeds. */
async function execDdl(d, sql) {
  let pending = splitStatements(sql);
  let lastError;
  while (pending.length) {
    const failed = [];
    for (const stmt of pending) {
      try { await d.exec(stmt); } catch (error) {
        if (error.code !== '42P01') throw error;
        failed.push(stmt); lastError = error;
      }
    }
    if (failed.length === pending.length) throw lastError;
    pending = failed;
  }
}

const INSERT_TABLE =/^\s*INSERT\s+INTO\s+"?([A-Za-z_][A-Za-z0-9_]*)"?/i;

function pgHandle(d) {
  const compiled = new Map();
  const compile = (sql) => compiled.get(sql) ?? (compiled.set(sql, compileParams(pgDialect(sql))), compiled.get(sql));
  const hasId = new Map();
  const tableHasId = async (table) => {
    if (!hasId.has(table)) {
      const row = await d.get(
        `SELECT 1 AS ok FROM information_schema.columns WHERE table_schema = current_schema() AND table_name = $1 AND column_name = 'id'`,
        [table.toLowerCase()]);
      hasId.set(table, !!row);
    }
    return hasId.get(table);
  };
  const stmt = (sql) => {
    const { sql: text, slots } = compile(sql);
    const table = INSERT_TABLE.exec(sql)?.[1];
    const wantId = table && !/\bRETURNING\b/i.test(sql);
    return {
      get: (...a) => d.get(text, bindParams(slots, a)),
      all: (...a) => d.all(text, bindParams(slots, a)),
      async run(...a) {
        const params = bindParams(slots, a);
        if (wantId && await tableHasId(table)) {
          const rows = await d.all(`${text.trim().replace(/;$/, '')} RETURNING id`, params);
          return { changes: rows.length, lastInsertRowid: rows.length ? rows[rows.length - 1].id : 0 };
        }
        return { changes: (await d.run(text, params)).changes, lastInsertRowid: 0 };
      },
    };
  };
  return {
    dialect: 'postgres',
    prepare: stmt,
    async tableExists(name) {
      return !!(await d.get(`SELECT 1 AS ok FROM information_schema.tables WHERE table_schema = current_schema() AND table_name = $1`, [String(name).toLowerCase()]));
    },
    async listTables() {
      return d.all(`SELECT table_name AS name FROM information_schema.tables WHERE table_schema = current_schema() AND table_type = 'BASE TABLE' ORDER BY table_name`);
    },
    /** { columns:[{cid,name,type,notnull,dflt_value,pk}], indexes:[{name,unique,def}], foreign_keys:[{from,table,to}], ddl } */
    async describeTable(table) {
      const t = String(table).toLowerCase();
      const pk = new Set((await d.all(`SELECT a.attname AS name FROM pg_index i JOIN pg_attribute a ON a.attrelid = i.indrelid AND a.attnum = ANY(i.indkey)
        WHERE i.indisprimary AND i.indrelid = to_regclass($1)`, [t])).map((r) => r.name));
      const columns = (await d.all(`SELECT ordinal_position AS cid, column_name AS name, data_type AS type, is_nullable, column_default AS dflt_value
        FROM information_schema.columns WHERE table_schema = current_schema() AND table_name = $1 ORDER BY ordinal_position`, [t]))
        .map((c) => ({ cid: c.cid - 1, name: c.name, type: c.type, notnull: c.is_nullable === 'NO' ? 1 : 0, dflt_value: c.dflt_value, pk: pk.has(c.name) ? 1 : 0 }));
      const indexes = (await d.all(`SELECT indexname AS name, indexdef AS def FROM pg_indexes WHERE schemaname = current_schema() AND tablename = $1 ORDER BY indexname`, [t]))
        .map((i) => ({ name: i.name, unique: /CREATE UNIQUE/i.test(i.def) ? 1 : 0, def: i.def }));
      const foreign_keys = await d.all(`SELECT kcu.column_name AS "from", ccu.table_name AS "table", ccu.column_name AS "to"
        FROM information_schema.table_constraints tc
        JOIN information_schema.key_column_usage kcu ON kcu.constraint_name = tc.constraint_name AND kcu.table_schema = tc.table_schema
        JOIN information_schema.constraint_column_usage ccu ON ccu.constraint_name = tc.constraint_name AND ccu.table_schema = tc.table_schema
        WHERE tc.constraint_type = 'FOREIGN KEY' AND tc.table_schema = current_schema() AND tc.table_name = $1`, [t]);
      const colDdl = columns.map((c) => `  ${c.name} ${c.type}${c.notnull ? ' NOT NULL' : ''}${c.dflt_value ? ` DEFAULT ${c.dflt_value}` : ''}${c.pk ? ' -- primary key' : ''}`);
      const ddl = [`CREATE TABLE ${t} (`, colDdl.join(',\n'), ');', ...indexes.map((i) => `${i.def};`)].join('\n');
      return { columns, indexes, foreign_keys, ddl };
    },
    exec: (sql) => execDdl(d, pgDdl(sql)),
    transaction: (fn) => (...args) => d.tx(async (t) => {
      await t.get('SELECT pg_advisory_xact_lock(?)', [TX_LOCK]);
      return fn(...args);
    }),
  };
}

/** url: PostgreSQL connection string. */
export function createAppDb({ url } = {}) {
  if (!url) throw new Error('createAppDb: DATABASE_URL is required');
  const d = createPgDb({ url, max: Number(process.env.PG_POOL_MAX) || 10 });
  return { ...pgHandle(d), d, close: () => d.close() };
}
