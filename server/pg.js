// ─────────────────────────────────────────────────────────────────────────────
// Postgres adapter — thay better-sqlite3 (sync) bằng pg (async) mà GIỮ NGUYÊN
// hình dạng gọi của better-sqlite3: `db.prepare(sql).get/all/run(...)`,
// `db.transaction(fn)`, `db.exec(sql)`. Nhờ vậy call-site chỉ cần thêm `await`.
//
// Cơ chế:
//   • pg.Pool cho query thường.
//   • AsyncLocalStorage giữ 1 client riêng trong phạm vi transaction → mọi
//     prepared-statement gọi bên trong tx tự chạy trên đúng client đó.
//   • convert(): dịch placeholder `?` / `@name` → `$1..$n`, và `INSERT OR IGNORE`
//     → `... ON CONFLICT DO NOTHING`, bỏ `COLLATE NOCASE` (dùng citext ở schema).
// ─────────────────────────────────────────────────────────────────────────────
import pg from 'pg';
import { AsyncLocalStorage } from 'node:async_hooks';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { resolveDatabaseUrl, currentDbLabel } from './db-config.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// bigint (int8) + numeric → JS Number. Toàn bộ bigint của app là id hoặc mốc
// thời gian ms epoch, đều < 2^53 nên parse Number an toàn (giữ đúng hành vi cũ
// của SQLite vốn trả number). Không parse → pg trả string, làm hỏng số học.
pg.types.setTypeParser(20, (v) => (v === null ? null : Number(v)));   // int8
pg.types.setTypeParser(1700, (v) => (v === null ? null : Number(v))); // numeric

const _dbUrl = resolveDatabaseUrl();
console.log(`[db] target = ${currentDbLabel()}`);
export const pool = new pg.Pool({
  connectionString: _dbUrl,
  max: Number(process.env.PG_POOL_MAX) || 10,
});
pool.on('error', (e) => console.error('[pg] idle client error', e.message));

// Client hiện hành của transaction (nếu đang trong tx), else null → dùng pool.
const als = new AsyncLocalStorage();
export { als };
function executor() {
  return als.getStore() || pool;
}

function isPlainObject(v) {
  return v !== null && typeof v === 'object' && !Array.isArray(v)
    && (v.constructor === Object || v.constructor === undefined);
}

// Dịch 1 câu SQL kiểu SQLite → { text, refs } cho pg. refs là danh sách thứ tự
// mô tả cách dựng mảng tham số $1..$n từ (positional, named).
function convert(rawSql) {
  // Bỏ `COLLATE NOCASE` — cột phân biệt hoa/thường xử lý bằng kiểu citext ở schema.
  let sql = rawSql.replace(/\s+COLLATE\s+NOCASE/gi, '');

  // INSERT OR IGNORE → INSERT (+ cờ nối ON CONFLICT DO NOTHING ở cuối).
  let conflictNothing = false;
  sql = sql.replace(/INSERT\s+OR\s+IGNORE/gi, () => { conflictNothing = true; return 'INSERT'; });

  const refs = [];
  let out = '';
  let n = 0;
  for (let i = 0; i < sql.length; i++) {
    const ch = sql[i];
    // string literal
    if (ch === "'") {
      out += ch; i++;
      while (i < sql.length) {
        out += sql[i];
        if (sql[i] === "'") {
          if (sql[i + 1] === "'") { out += sql[++i]; } // '' escape
          else break;
        }
        i++;
      }
      continue;
    }
    // quoted identifier
    if (ch === '"') {
      out += ch; i++;
      while (i < sql.length) { out += sql[i]; if (sql[i] === '"') break; i++; }
      continue;
    }
    // line comment
    if (ch === '-' && sql[i + 1] === '-') {
      while (i < sql.length && sql[i] !== '\n') { out += sql[i]; i++; }
      out += '\n'; continue;
    }
    // block comment
    if (ch === '/' && sql[i + 1] === '*') {
      out += '/*'; i += 2;
      while (i < sql.length && !(sql[i] === '*' && sql[i + 1] === '/')) { out += sql[i]; i++; }
      out += '*/'; i++; continue;
    }
    // positional placeholder
    if (ch === '?') { n++; refs.push({ pos: true }); out += '$' + n; continue; }
    // named placeholder @name
    if (ch === '@') {
      const m = /^@([A-Za-z_][A-Za-z0-9_]*)/.exec(sql.slice(i));
      if (m) { n++; refs.push({ name: m[1] }); out += '$' + n; i += m[0].length - 1; continue; }
    }
    out += ch;
  }

  if (conflictNothing && !/ON\s+CONFLICT/i.test(out)) {
    const ret = out.search(/\bRETURNING\b/i);
    if (ret >= 0) out = out.slice(0, ret) + ' ON CONFLICT DO NOTHING ' + out.slice(ret);
    else out = out.replace(/\s*;?\s*$/, '') + ' ON CONFLICT DO NOTHING';
  }
  return { text: out, refs };
}

function buildParams(refs, args) {
  const positional = [];
  let named = null;
  for (const a of args) {
    if (isPlainObject(a)) named = named ? Object.assign(named, a) : { ...a };
    else positional.push(a);
  }
  let p = 0;
  return refs.map((r) => (r.name !== undefined
    ? (named ? named[r.name] : undefined)
    : positional[p++]));
}

// Trả về "prepared statement" giả lập API better-sqlite3, nhưng async.
function prepare(sql) {
  const { text, refs } = convert(sql);
  return {
    text,
    async get(...args) {
      const r = await executor().query(text, buildParams(refs, args));
      return r.rows[0]; // undefined nếu không có row (khớp better-sqlite3)
    },
    async all(...args) {
      const r = await executor().query(text, buildParams(refs, args));
      return r.rows;
    },
    async run(...args) {
      const r = await executor().query(text, buildParams(refs, args));
      // lastInsertRowid chỉ có khi SQL có `RETURNING id`; else undefined.
      return { changes: r.rowCount, lastInsertRowid: r.rows[0]?.id };
    },
  };
}

export const db = {
  prepare,
  async exec(sql) { return executor().query(sql); },
  pragma() { /* no-op: WAL/foreign_keys không áp dụng cho Postgres */ },
  // db.transaction(fn) → hàm async chạy fn trong BEGIN/COMMIT trên 1 client riêng.
  // fn có thể async; mọi statement gọi bên trong tự route về client này qua ALS.
  transaction(fn) {
    return async (...args) => {
      const client = await pool.connect();
      try {
        await client.query('BEGIN');
        const res = await als.run(client, () => fn(...args));
        await client.query('COMMIT');
        return res;
      } catch (e) {
        try { await client.query('ROLLBACK'); } catch { /* ignore */ }
        throw e;
      } finally {
        client.release();
      }
    };
  },
};

// Chạy schema.sql (idempotent: CREATE TABLE/INDEX IF NOT EXISTS). Gọi 1 lần lúc
// boot, TRƯỚC khi server.listen(). initDb() ở db.js sẽ gọi hàm này rồi seed.
export async function initSchema() {
  const schemaPath = path.join(__dirname, 'schema.sql');
  const sql = fs.readFileSync(schemaPath, 'utf8');
  await pool.query(sql);
}
