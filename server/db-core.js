// App-wide database handle with the shape the app has always used (`prepare().get/all/run`, `exec`, `transaction`),
// backed by SQLite (transition only) or PostgreSQL. Callers `await` every call: with PostgreSQL they are promises,
// with SQLite they are plain values (await on a plain value is fine), so one code path serves both backends.
//
//   DATABASE_URL set  -> PostgreSQL (pool, ambient transactions, savepoints; see ai-board/db/index.js)
//   otherwise         -> better-sqlite3 file (transition; removed with the SQLite dependency)
//
// SQL is written once, SQLite-flavoured but portable: `?`, `@name` (named or mixed with `?`), ON CONFLICT, COALESCE.
// PostgreSQL gets: placeholders -> $n, `ADD COLUMN IF NOT EXISTS`, INTEGER->BIGINT, REAL->DOUBLE PRECISION in DDL,
// `lastInsertRowid` via RETURNING id for tables that have an id column.
import { createPgDb, createSqliteDb, toPgDdl } from './ai-board/db/index.js';

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

/** better-sqlite3 call style (positional values, arrays, one named-object, or both) -> positional list for `slots`. */
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

/** SQLite DDL -> PostgreSQL DDL. */
export function pgDdl(sql) {
  return toPgDdl(sql).replace(/\bADD COLUMN (?!IF NOT EXISTS)/gi, 'ADD COLUMN IF NOT EXISTS ');
}

const INSERT_TABLE = /^\s*INSERT\s+INTO\s+"?([A-Za-z_][A-Za-z0-9_]*)"?/i;

function pgHandle(d) {
  const compiled = new Map();
  const compile = (sql) => compiled.get(sql) ?? (compiled.set(sql, compileParams(sql)), compiled.get(sql));
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
    exec: (sql) => d.exec(pgDdl(sql)),
    transaction: (fn) => (...args) => d.tx(async (t) => {
      await t.get('SELECT pg_advisory_xact_lock(?)', [TX_LOCK]);
      return fn(...args);
    }),
  };
}

function sqliteHandle(raw, d) {
  return {
    dialect: 'sqlite',
    prepare: (sql) => raw.prepare(sql),
    exec: (sql) => raw.exec(sql),
    transaction: (fn) => (...args) => d.tx(() => fn(...args)),
  };
}

/** raw: open better-sqlite3 Database (transition). url: PostgreSQL connection string. Exactly one is used (url wins). */
export function createAppDb({ url, raw } = {}) {
  if (url) {
    const d = createPgDb({ url, max: Number(process.env.PG_POOL_MAX) || 10 });
    return { ...pgHandle(d), d, close: () => d.close() };
  }
  if (!raw) throw new Error('createAppDb: DATABASE_URL or a SQLite handle is required');
  const d = createSqliteDb(raw);
  return { ...sqliteHandle(raw, d), d, raw, close: async () => raw.close() };
}
