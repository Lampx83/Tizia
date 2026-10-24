// Admin DB CRUD — cho phép admin browse tables, run SQL (cả write), tạo/tải backup.
// Mọi non-SELECT đều ghi audit log vào admin_db_audit + console.
// Mount qua attachAdminDb(router) trong server/contexts/admin/index.js.
//
// Postgres: schema introspection qua information_schema/pg_catalog (thay PRAGMA/
// sqlite_master); backup qua pg_dump (thay better-sqlite3 db.backup()).
import fs from 'node:fs';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { db, pool, DATA_DIR } from '../../db.js';
import { requireAdmin } from './index.js';

// admin_db_audit table do server/schema.sql sở hữu (không tạo inline nữa).
const _auditInsert = db.prepare(
  `INSERT INTO admin_db_audit (user_id, username, sql, changes, last_id, error, created_at)
   VALUES (@user_id, @username, @sql, @changes, @last_id, @error, @t)`
);
async function audit(row) { try { await _auditInsert.run(row); } catch { /* audit best-effort */ } }

// Read-only: các câu KHÔNG ghi dữ liệu (Postgres). Bỏ PRAGMA (SQLite), thêm SHOW/TABLE/VALUES.
const SELECT_RE = /^\s*(SELECT|WITH|EXPLAIN|SHOW|TABLE|VALUES)\b/i;
const FORBIDDEN_TABLES = new Set([]);

function isReadOnly(sql) { return SELECT_RE.test(sql); }
async function tableExists(name) {
  return !!(await db.prepare(
    `SELECT 1 FROM information_schema.tables WHERE table_schema='public' AND table_name = ?`
  ).get(name));
}
function validIdent(name) { return /^[A-Za-z_][A-Za-z0-9_]*$/.test(String(name || '')); }
const PG_DUMP_BIN = process.env.PG_DUMP_BIN || 'pg_dump';

export function attachAdminDb(r) {
  // ─── List tables + row counts ────────────────────────────────────────────
  r.get('/api/admin/db/tables', requireAdmin, async (_req, res) => {
    const rows = await db.prepare(
      `SELECT table_name AS name FROM information_schema.tables
       WHERE table_schema='public' ORDER BY table_name`
    ).all();
    const out = [];
    for (const { name } of rows) {
      let rowCount = null;
      try { rowCount = (await db.prepare(`SELECT COUNT(*) c FROM "${name}"`).get()).c; }
      catch { rowCount = -1; }
      out.push({ name, rowCount });
    }
    res.json({ tables: out, dbPath: process.env.DATABASE_URL ? '(postgres)' : null });
  });

  // ─── Schema + indices của 1 bảng ─────────────────────────────────────────
  r.get('/api/admin/db/schema/:table', requireAdmin, async (req, res) => {
    const t = String(req.params.table);
    if (!validIdent(t)) return res.status(400).json({ error: 'invalid_table' });
    if (!(await tableExists(t))) return res.status(404).json({ error: 'not_found' });
    const cols = await db.prepare(
      `SELECT column_name AS name, data_type AS type, is_nullable, column_default
       FROM information_schema.columns
       WHERE table_schema='public' AND table_name = ? ORDER BY ordinal_position`
    ).all(t);
    const indexes = await db.prepare(
      `SELECT indexname AS name, indexdef FROM pg_indexes
       WHERE schemaname='public' AND tablename = ?`
    ).all(t);
    const fks = await db.prepare(
      `SELECT kcu.column_name, ccu.table_name AS ref_table, ccu.column_name AS ref_column
       FROM information_schema.table_constraints tc
       JOIN information_schema.key_column_usage kcu ON kcu.constraint_name = tc.constraint_name
       JOIN information_schema.constraint_column_usage ccu ON ccu.constraint_name = tc.constraint_name
       WHERE tc.constraint_type='FOREIGN KEY' AND tc.table_schema='public' AND tc.table_name = ?`
    ).all(t);
    res.json({ table: t, columns: cols, indexes, foreign_keys: fks, ddl: null });
  });

  // ─── Browse rows của 1 bảng (paginated) ──────────────────────────────────
  r.get('/api/admin/db/rows/:table', requireAdmin, async (req, res) => {
    const t = String(req.params.table);
    if (!validIdent(t)) return res.status(400).json({ error: 'invalid_table' });
    if (!(await tableExists(t))) return res.status(404).json({ error: 'not_found' });
    const limit  = Math.min(Math.max(Number(req.query.limit)  || 100, 1), 1000);
    const offset = Math.max(Number(req.query.offset) || 0, 0);
    const orderBy = req.query.order_by && validIdent(req.query.order_by) ? req.query.order_by : null;
    const dir = req.query.dir === 'asc' ? 'ASC' : 'DESC';
    const orderClause = orderBy ? ` ORDER BY "${orderBy}" ${dir}` : '';
    const total = (await db.prepare(`SELECT COUNT(*) c FROM "${t}"`).get()).c;
    const rows  = await db.prepare(`SELECT * FROM "${t}"${orderClause} LIMIT ? OFFSET ?`).all(limit, offset);
    res.json({ table: t, total, limit, offset, rows });
  });

  // ─── Update 1 row theo PK ────────────────────────────────────────────────
  r.post('/api/admin/db/rows/:table/update', requireAdmin, async (req, res) => {
    const t = String(req.params.table);
    if (!validIdent(t)) return res.status(400).json({ error: 'invalid_table' });
    if (!(await tableExists(t))) return res.status(404).json({ error: 'not_found' });
    if (FORBIDDEN_TABLES.has(t)) return res.status(403).json({ error: 'forbidden_table' });
    const { pk_col, pk_val, set } = req.body || {};
    if (!validIdent(pk_col)) return res.status(400).json({ error: 'invalid_pk_col' });
    if (!set || typeof set !== 'object' || !Object.keys(set).length) {
      return res.status(400).json({ error: 'empty_set' });
    }
    const cols = Object.keys(set).filter(validIdent);
    if (!cols.length) return res.status(400).json({ error: 'invalid_columns' });
    const setClause = cols.map(c => `"${c}"=?`).join(', ');
    const sql = `UPDATE "${t}" SET ${setClause} WHERE "${pk_col}"=?`;
    const params = [...cols.map(c => set[c]), pk_val];
    try {
      const info = await db.prepare(sql).run(...params);
      await audit({ user_id: req.user.id, username: req.user.username,
        sql: `${sql}  -- params: ${JSON.stringify(params)}`,
        changes: info.changes, last_id: info.lastInsertRowid ?? null, error: null, t: Date.now() });
      res.json({ ok: true, changes: info.changes });
    } catch (e) {
      await audit({ user_id: req.user.id, username: req.user.username,
        sql, changes: 0, last_id: null, error: String(e.message), t: Date.now() });
      res.status(400).json({ error: 'update_failed', message: String(e.message) });
    }
  });

  // ─── Delete 1 row theo PK ────────────────────────────────────────────────
  r.post('/api/admin/db/rows/:table/delete', requireAdmin, async (req, res) => {
    const t = String(req.params.table);
    if (!validIdent(t)) return res.status(400).json({ error: 'invalid_table' });
    if (!(await tableExists(t))) return res.status(404).json({ error: 'not_found' });
    if (FORBIDDEN_TABLES.has(t)) return res.status(403).json({ error: 'forbidden_table' });
    const { pk_col, pk_val } = req.body || {};
    if (!validIdent(pk_col)) return res.status(400).json({ error: 'invalid_pk_col' });
    const sql = `DELETE FROM "${t}" WHERE "${pk_col}"=?`;
    try {
      const info = await db.prepare(sql).run(pk_val);
      await audit({ user_id: req.user.id, username: req.user.username,
        sql: `${sql}  -- ${pk_col}=${JSON.stringify(pk_val)}`,
        changes: info.changes, last_id: null, error: null, t: Date.now() });
      res.json({ ok: true, changes: info.changes });
    } catch (e) {
      await audit({ user_id: req.user.id, username: req.user.username,
        sql, changes: 0, last_id: null, error: String(e.message), t: Date.now() });
      res.status(400).json({ error: 'delete_failed', message: String(e.message) });
    }
  });

  // ─── Insert 1 row ────────────────────────────────────────────────────────
  r.post('/api/admin/db/rows/:table/insert', requireAdmin, async (req, res) => {
    const t = String(req.params.table);
    if (!validIdent(t)) return res.status(400).json({ error: 'invalid_table' });
    if (!(await tableExists(t))) return res.status(404).json({ error: 'not_found' });
    if (FORBIDDEN_TABLES.has(t)) return res.status(403).json({ error: 'forbidden_table' });
    const { values } = req.body || {};
    if (!values || typeof values !== 'object' || !Object.keys(values).length) {
      return res.status(400).json({ error: 'empty_values' });
    }
    const cols = Object.keys(values).filter(validIdent);
    if (!cols.length) return res.status(400).json({ error: 'invalid_columns' });
    const placeholders = cols.map(() => '?').join(', ');
    const colList = cols.map(c => `"${c}"`).join(', ');
    const sql = `INSERT INTO "${t}" (${colList}) VALUES (${placeholders})`;
    const params = cols.map(c => values[c]);
    try {
      const info = await db.prepare(sql).run(...params);
      await audit({ user_id: req.user.id, username: req.user.username,
        sql: `${sql}  -- params: ${JSON.stringify(params)}`,
        changes: info.changes, last_id: info.lastInsertRowid ?? null, error: null, t: Date.now() });
      res.json({ ok: true, last_id: info.lastInsertRowid ?? null });
    } catch (e) {
      await audit({ user_id: req.user.id, username: req.user.username,
        sql, changes: 0, last_id: null, error: String(e.message), t: Date.now() });
      res.status(400).json({ error: 'insert_failed', message: String(e.message) });
    }
  });

  // ─── SQL Console — chạy SQL tự do (raw qua pool, không dịch placeholder) ──
  r.post('/api/admin/db/query', requireAdmin, async (req, res) => {
    const sql = String(req.body?.sql || '').trim();
    if (!sql) return res.status(400).json({ error: 'empty_sql' });
    if (sql.length > 50_000) return res.status(413).json({ error: 'sql_too_large' });
    const readOnly = isReadOnly(sql);
    if (!readOnly && !req.body?.allow_write) {
      return res.status(403).json({ error: 'write_requires_confirm', message: 'Set allow_write=true để chạy non-SELECT' });
    }
    try {
      // Dùng pool.query trực tiếp: SQL admin tự do KHÔNG đi qua bộ dịch ?/@name.
      const result = await pool.query(sql);
      if (readOnly) {
        const rows = result.rows || [];
        const cols = rows.length ? Object.keys(rows[0]) : (result.fields || []).map(f => f.name);
        return res.json({ ok: true, mode: 'read', columns: cols, rows, row_count: rows.length });
      }
      await audit({ user_id: req.user.id, username: req.user.username,
        sql, changes: result.rowCount, last_id: null, error: null, t: Date.now() });
      console.log(`[admin-db] WRITE by @${req.user.username} (uid=${req.user.id}): ${sql.slice(0, 200)}${sql.length > 200 ? '…' : ''} → ${result.rowCount} rows`);
      return res.json({ ok: true, mode: 'write', changes: result.rowCount, last_id: null });
    } catch (e) {
      if (!readOnly) {
        await audit({ user_id: req.user.id, username: req.user.username,
          sql, changes: 0, last_id: null, error: String(e.message), t: Date.now() });
      }
      return res.status(400).json({ error: 'query_failed', message: String(e.message) });
    }
  });

  // ─── Audit log viewer ────────────────────────────────────────────────────
  r.get('/api/admin/db/audit', requireAdmin, async (_req, res) => {
    const rows = await db.prepare(
      `SELECT id, user_id, username, sql, changes, last_id, error, created_at
       FROM admin_db_audit ORDER BY id DESC LIMIT 200`
    ).all();
    res.json({ audit: rows });
  });

  // ─── Backup operations (pg_dump) ─────────────────────────────────────────
  // List file backup *.dump trong DATA_DIR.
  r.get('/api/admin/db/backups', requireAdmin, (_req, res) => {
    try {
      const files = fs.readdirSync(DATA_DIR)
        .filter(f => f.startsWith('tizia-') && f.endsWith('.dump'))
        .map(f => {
          const st = fs.statSync(path.join(DATA_DIR, f));
          return { name: f, size: st.size, mtime: st.mtimeMs };
        })
        .sort((a, b) => b.mtime - a.mtime);
      res.json({ backups: files, data_dir: DATA_DIR });
    } catch (e) {
      res.status(500).json({ error: 'list_failed', message: String(e.message) });
    }
  });

  // Tạo backup snapshot mới bằng pg_dump (custom format -Fc, an toàn + nén).
  r.post('/api/admin/db/backup', requireAdmin, async (req, res) => {
    const stamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
    const fname = `tizia-${stamp}.dump`;
    const target = path.join(DATA_DIR, fname);
    try {
      await pgDump(target);
      const st = fs.statSync(target);
      console.log(`[admin-db] pg_dump by @${req.user.username}: ${fname} (${st.size} bytes)`);
      res.json({ ok: true, name: fname, size: st.size });
    } catch (e) {
      res.status(500).json({ error: 'backup_failed', message: String(e.message) });
    }
  });

  // Download 1 backup file.
  r.get('/api/admin/db/backup/download', requireAdmin, (req, res) => {
    const name = String(req.query.name || '');
    if (!/^tizia-[a-zA-Z0-9._\-]*\.dump$/.test(name) || name.includes('/')) {
      return res.status(400).json({ error: 'invalid_name' });
    }
    const filePath = path.join(DATA_DIR, name);
    if (!fs.existsSync(filePath)) return res.status(404).json({ error: 'not_found' });
    res.setHeader('Content-Type', 'application/octet-stream');
    res.setHeader('Content-Disposition', `attachment; filename="${name}"`);
    fs.createReadStream(filePath).pipe(res);
  });
}

// Chạy pg_dump ra file custom-format. Dùng DATABASE_URL.
function pgDump(target) {
  return new Promise((resolve, reject) => {
    const url = process.env.DATABASE_URL;
    if (!url) return reject(new Error('DATABASE_URL not set'));
    const p = spawn(PG_DUMP_BIN, ['-Fc', '-f', target, url], { stdio: ['ignore', 'ignore', 'pipe'] });
    let err = '';
    p.stderr.on('data', (d) => { err += d.toString(); });
    p.on('error', reject);
    p.on('close', (code) => code === 0 ? resolve() : reject(new Error(`pg_dump exit ${code}: ${err.slice(0, 500)}`)));
  });
}
