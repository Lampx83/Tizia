// Admin DB CRUD — cho phép admin browse tables, run SQL (cả write), download
// backup. Mọi non-SELECT đều ghi audit log vào admin_db_audit + console.
// Mount qua attachAdminDb(router) trong server/contexts/admin/index.js.
import fs from 'node:fs';
import path from 'node:path';
import { db, dbPath, DATA_DIR } from '../../db.js';
import { requireAdmin } from './index.js';

// Bootstrap audit table — ghi mọi query write từ admin UI để truy vết.
db.exec(`
  CREATE TABLE IF NOT EXISTS admin_db_audit (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id     INTEGER NOT NULL,
    username    TEXT,
    sql         TEXT    NOT NULL,
    changes     INTEGER,
    last_id     INTEGER,
    error       TEXT,
    created_at  INTEGER NOT NULL
  );
  CREATE INDEX IF NOT EXISTS idx_admin_db_audit_user ON admin_db_audit(user_id, created_at);
`);

const _auditInsert = db.prepare(
  `INSERT INTO admin_db_audit (user_id, username, sql, changes, last_id, error, created_at)
   VALUES (@user_id, @username, @sql, @changes, @last_id, @error, @t)`
);

const SELECT_RE = /^\s*(SELECT|WITH|EXPLAIN|PRAGMA)\b/i;
const FORBIDDEN_TABLES = new Set(['sqlite_sequence']);

function isReadOnly(sql) { return SELECT_RE.test(sql); }
function tableExists(name) {
  return !!db.prepare(`SELECT 1 FROM sqlite_master WHERE type='table' AND name=?`).get(name);
}
function validIdent(name) { return /^[A-Za-z_][A-Za-z0-9_]*$/.test(String(name || '')); }

export function attachAdminDb(r) {
  // ─── List tables + row counts ────────────────────────────────────────────
  r.get('/api/admin/db/tables', requireAdmin, (_req, res) => {
    const rows = db.prepare(
      `SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%' ORDER BY name`
    ).all();
    const out = rows.map(({ name }) => {
      let rowCount = null;
      try { rowCount = db.prepare(`SELECT COUNT(*) c FROM "${name}"`).get().c; }
      catch (e) { rowCount = -1; }
      return { name, rowCount };
    });
    res.json({ tables: out, dbPath });
  });

  // ─── Schema + indices của 1 bảng ─────────────────────────────────────────
  r.get('/api/admin/db/schema/:table', requireAdmin, (req, res) => {
    const t = String(req.params.table);
    if (!validIdent(t)) return res.status(400).json({ error: 'invalid_table' });
    if (!tableExists(t)) return res.status(404).json({ error: 'not_found' });
    const cols    = db.prepare(`PRAGMA table_info("${t}")`).all();
    const indexes = db.prepare(`PRAGMA index_list("${t}")`).all();
    const fks     = db.prepare(`PRAGMA foreign_key_list("${t}")`).all();
    const ddl     = db.prepare(`SELECT sql FROM sqlite_master WHERE type='table' AND name=?`).get(t)?.sql || null;
    res.json({ table: t, columns: cols, indexes, foreign_keys: fks, ddl });
  });

  // ─── Browse rows của 1 bảng (paginated) ──────────────────────────────────
  r.get('/api/admin/db/rows/:table', requireAdmin, (req, res) => {
    const t = String(req.params.table);
    if (!validIdent(t)) return res.status(400).json({ error: 'invalid_table' });
    if (!tableExists(t)) return res.status(404).json({ error: 'not_found' });
    const limit  = Math.min(Math.max(Number(req.query.limit)  || 100, 1), 1000);
    const offset = Math.max(Number(req.query.offset) || 0, 0);
    const orderBy = req.query.order_by && validIdent(req.query.order_by) ? req.query.order_by : null;
    const dir = req.query.dir === 'asc' ? 'ASC' : 'DESC';
    const orderClause = orderBy ? ` ORDER BY "${orderBy}" ${dir}` : '';
    const total = db.prepare(`SELECT COUNT(*) c FROM "${t}"`).get().c;
    const rows  = db.prepare(`SELECT * FROM "${t}"${orderClause} LIMIT ? OFFSET ?`).all(limit, offset);
    res.json({ table: t, total, limit, offset, rows });
  });

  // ─── Update 1 row theo PK (đơn giản, dùng cho table có cột id) ───────────
  r.post('/api/admin/db/rows/:table/update', requireAdmin, (req, res) => {
    const t = String(req.params.table);
    if (!validIdent(t)) return res.status(400).json({ error: 'invalid_table' });
    if (!tableExists(t)) return res.status(404).json({ error: 'not_found' });
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
      const info = db.prepare(sql).run(...params);
      _auditInsert.run({ user_id: req.user.id, username: req.user.username,
        sql: `${sql}  -- params: ${JSON.stringify(params)}`,
        changes: info.changes, last_id: info.lastInsertRowid, error: null, t: Date.now() });
      res.json({ ok: true, changes: info.changes });
    } catch (e) {
      _auditInsert.run({ user_id: req.user.id, username: req.user.username,
        sql, changes: 0, last_id: null, error: String(e.message), t: Date.now() });
      res.status(400).json({ error: 'update_failed', message: String(e.message) });
    }
  });

  // ─── Delete 1 row theo PK ────────────────────────────────────────────────
  r.post('/api/admin/db/rows/:table/delete', requireAdmin, (req, res) => {
    const t = String(req.params.table);
    if (!validIdent(t)) return res.status(400).json({ error: 'invalid_table' });
    if (!tableExists(t)) return res.status(404).json({ error: 'not_found' });
    if (FORBIDDEN_TABLES.has(t)) return res.status(403).json({ error: 'forbidden_table' });
    const { pk_col, pk_val } = req.body || {};
    if (!validIdent(pk_col)) return res.status(400).json({ error: 'invalid_pk_col' });
    const sql = `DELETE FROM "${t}" WHERE "${pk_col}"=?`;
    try {
      const info = db.prepare(sql).run(pk_val);
      _auditInsert.run({ user_id: req.user.id, username: req.user.username,
        sql: `${sql}  -- ${pk_col}=${JSON.stringify(pk_val)}`,
        changes: info.changes, last_id: null, error: null, t: Date.now() });
      res.json({ ok: true, changes: info.changes });
    } catch (e) {
      _auditInsert.run({ user_id: req.user.id, username: req.user.username,
        sql, changes: 0, last_id: null, error: String(e.message), t: Date.now() });
      res.status(400).json({ error: 'delete_failed', message: String(e.message) });
    }
  });

  // ─── Insert 1 row ────────────────────────────────────────────────────────
  r.post('/api/admin/db/rows/:table/insert', requireAdmin, (req, res) => {
    const t = String(req.params.table);
    if (!validIdent(t)) return res.status(400).json({ error: 'invalid_table' });
    if (!tableExists(t)) return res.status(404).json({ error: 'not_found' });
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
      const info = db.prepare(sql).run(...params);
      _auditInsert.run({ user_id: req.user.id, username: req.user.username,
        sql: `${sql}  -- params: ${JSON.stringify(params)}`,
        changes: info.changes, last_id: info.lastInsertRowid, error: null, t: Date.now() });
      res.json({ ok: true, last_id: info.lastInsertRowid });
    } catch (e) {
      _auditInsert.run({ user_id: req.user.id, username: req.user.username,
        sql, changes: 0, last_id: null, error: String(e.message), t: Date.now() });
      res.status(400).json({ error: 'insert_failed', message: String(e.message) });
    }
  });

  // ─── SQL Console — chạy SQL tự do ────────────────────────────────────────
  // Read-only (SELECT/WITH/EXPLAIN/PRAGMA) chạy thẳng → trả rows.
  // Write phải set allow_write=true, audit + run + trả changes/lastInsertRowid.
  // FE cần confirm 2 lần trước khi gửi allow_write.
  r.post('/api/admin/db/query', requireAdmin, (req, res) => {
    const sql = String(req.body?.sql || '').trim();
    if (!sql) return res.status(400).json({ error: 'empty_sql' });
    if (sql.length > 50_000) return res.status(413).json({ error: 'sql_too_large' });
    const readOnly = isReadOnly(sql);
    if (!readOnly && !req.body?.allow_write) {
      return res.status(403).json({ error: 'write_requires_confirm', message: 'Set allow_write=true để chạy non-SELECT' });
    }
    try {
      if (readOnly) {
        const stmt = db.prepare(sql);
        // better-sqlite3 .raw() unavailable on PRAGMA — fall back to .all()
        const rows = stmt.all();
        const cols = rows.length ? Object.keys(rows[0]) : [];
        return res.json({ ok: true, mode: 'read', columns: cols, rows, row_count: rows.length });
      }
      const info = db.prepare(sql).run();
      _auditInsert.run({ user_id: req.user.id, username: req.user.username,
        sql, changes: info.changes, last_id: info.lastInsertRowid, error: null, t: Date.now() });
      console.log(`[admin-db] WRITE by @${req.user.username} (uid=${req.user.id}): ${sql.slice(0, 200)}${sql.length > 200 ? '…' : ''} → ${info.changes} rows`);
      return res.json({ ok: true, mode: 'write', changes: info.changes, last_id: info.lastInsertRowid });
    } catch (e) {
      if (!readOnly) {
        _auditInsert.run({ user_id: req.user.id, username: req.user.username,
          sql, changes: 0, last_id: null, error: String(e.message), t: Date.now() });
      }
      return res.status(400).json({ error: 'query_failed', message: String(e.message) });
    }
  });

  // ─── Audit log viewer ────────────────────────────────────────────────────
  r.get('/api/admin/db/audit', requireAdmin, (_req, res) => {
    const rows = db.prepare(
      `SELECT id, user_id, username, sql, changes, last_id, error, created_at
       FROM admin_db_audit ORDER BY id DESC LIMIT 200`
    ).all();
    res.json({ audit: rows });
  });

  // ─── Backup operations ───────────────────────────────────────────────────
  // List file *.bak / *.bak-* trong DATA_DIR (cùng folder với tizia.db)
  r.get('/api/admin/db/backups', requireAdmin, (_req, res) => {
    try {
      const files = fs.readdirSync(DATA_DIR)
        .filter(f => f.startsWith('tizia.db') && f !== 'tizia.db' && !f.endsWith('-wal') && !f.endsWith('-shm'))
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

  // Tạo backup snapshot mới (dùng better-sqlite3 db.backup() — an toàn với WAL)
  r.post('/api/admin/db/backup', requireAdmin, async (req, res) => {
    const stamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
    const fname = `tizia.db.bak-admin-${stamp}`;
    const target = path.join(DATA_DIR, fname);
    try {
      await db.backup(target);
      const st = fs.statSync(target);
      console.log(`[admin-db] backup by @${req.user.username}: ${fname} (${st.size} bytes)`);
      res.json({ ok: true, name: fname, size: st.size });
    } catch (e) {
      res.status(500).json({ error: 'backup_failed', message: String(e.message) });
    }
  });

  // Stream download 1 backup file (hoặc tizia.db hiện tại nếu name=current)
  r.get('/api/admin/db/backup/download', requireAdmin, (req, res) => {
    const name = String(req.query.name || 'current');
    let filePath, fileName;
    if (name === 'current') {
      filePath = dbPath;
      fileName = `tizia.db.live-${Date.now()}`;
    } else {
      if (!/^tizia\.db[a-zA-Z0-9._\-]*$/.test(name) || name.includes('/')) {
        return res.status(400).json({ error: 'invalid_name' });
      }
      filePath = path.join(DATA_DIR, name);
      fileName = name;
    }
    if (!fs.existsSync(filePath)) return res.status(404).json({ error: 'not_found' });
    res.setHeader('Content-Type', 'application/octet-stream');
    res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
    fs.createReadStream(filePath).pipe(res);
  });
}

export const plugin = {
  name: 'admin-db',
  catalog: {
    kind: 'context', tier: 'dev-owned',
    provides: ['raw DB admin tools (role=admin)'],
    description: 'Công cụ đọc/sửa DB thô cho admin — chạm core.db trực tiếp.',
  },
  mount(router) {
    attachAdminDb(router);
  },
};
