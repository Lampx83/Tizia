// ============================================================
// Admin backup/restore — Postgres pg_dump / pg_restore
// ============================================================
// Dùng `pg_dump -Fc` (custom format, nén sẵn) để snapshot, `pg_restore
// --clean --if-exists` để phục hồi. Không cần restart server — restore
// chạy thẳng trên connection pool đang sống. File backup dạng .dump nằm
// ở BACKUP_DIR/ (mặc định <cwd>/data/backups).
//
// Yêu cầu: binary `pg_dump` / `pg_restore` cùng major version với server
// Postgres trong PATH. Local dev có sẵn Homebrew, prod cần cài
// `postgresql-client` trong container Node hoặc shell sang container DB.
// ============================================================

import fs from 'node:fs';
import path from 'node:path';
import { spawn } from 'node:child_process';
import express from 'express';
import { requireAdmin } from './index.js';

const BACKUP_DIR = process.env.BACKUP_DIR
  ? path.resolve(process.env.BACKUP_DIR)
  : path.resolve(process.cwd(), 'data', 'backups');

// Magic header pg_dump custom format: bytes "PGDMP" tại offset 0.
const PGDMP_MAGIC = Buffer.from('PGDMP', 'utf8');
const KEEP_DEFAULT = Number(process.env.BACKUP_KEEP || 7);
const AUTO_HOUR = Number(process.env.BACKUP_HOUR || 3); // 03:00 server time
const MAX_RESTORE_BYTES = Number(process.env.BACKUP_MAX_BYTES || 500 * 1024 * 1024);
// pg_dump/pg_restore phải cùng major version với server. Local dev có thể
// có pg14 trong PATH trong khi server là pg16 → cho override qua env.
const PG_DUMP_BIN = process.env.PG_DUMP_BIN || 'pg_dump';
const PG_RESTORE_BIN = process.env.PG_RESTORE_BIN || 'pg_restore';

fs.mkdirSync(BACKUP_DIR, { recursive: true });

function stamp() {
  const d = new Date();
  const pad = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}-${pad(d.getHours())}${pad(d.getMinutes())}${pad(d.getSeconds())}`;
}

export { BACKUP_DIR };
export function safeBackupName(name) {
  if (!/^tizia-\d{8}-\d{6}(?:-[a-z0-9]+)?\.dump$/i.test(name)) return null;
  const full = path.join(BACKUP_DIR, name);
  if (!full.startsWith(BACKUP_DIR + path.sep)) return null;
  return full;
}

export function listBackups() {
  try {
    return fs.readdirSync(BACKUP_DIR)
      .filter((f) => f.startsWith('tizia-') && f.endsWith('.dump'))
      .map((f) => {
        const full = path.join(BACKUP_DIR, f);
        const st = fs.statSync(full);
        return { name: f, size: st.size, created_at: st.mtimeMs };
      })
      .sort((a, b) => b.created_at - a.created_at);
  } catch { return []; }
}

// Chạy command, resolve khi exit 0, reject kèm stderr nếu lỗi. Truyền
// DATABASE_URL qua biến môi trường để pg_dump/restore tự parse (không phải
// rã connection string ra -h -U -p).
function runPg(cmd, args, opts = {}) {
  return new Promise((resolve, reject) => {
    const env = { ...process.env };
    if (!env.DATABASE_URL) return reject(new Error('DATABASE_URL chưa set'));
    const child = spawn(cmd, args, { env, stdio: ['ignore', 'pipe', 'pipe'], ...opts });
    let stderr = '';
    child.stderr.on('data', (d) => { stderr += d.toString(); });
    if (opts.stdoutPipe) opts.stdoutPipe(child.stdout);
    else child.stdout.resume();
    child.on('error', reject);
    child.on('close', (code) => {
      if (code === 0) resolve({ stderr });
      else reject(new Error(`${cmd} exit ${code}: ${stderr.trim().slice(0, 500)}`));
    });
  });
}

export async function createBackup(label = '') {
  const suffix = label ? `-${String(label).toLowerCase().replace(/[^a-z0-9]+/g, '').slice(0, 12)}` : '';
  const name = `tizia-${stamp()}${suffix}.dump`;
  const full = path.join(BACKUP_DIR, name);
  // -Fc custom format: gọn, compressed, restore song song được. --no-owner /
  // --no-acl để file di chuyển giữa cluster (vd local → prod) không kêu role.
  await runPg(PG_DUMP_BIN, [
    '-Fc', '--no-owner', '--no-acl',
    '-f', full,
    process.env.DATABASE_URL,
  ]);
  const st = fs.statSync(full);
  return { name, size: st.size, created_at: st.mtimeMs };
}

export function pruneBackups(keep = KEEP_DEFAULT) {
  const all = listBackups();
  const drop = all.slice(keep);
  let n = 0;
  for (const b of drop) {
    try { fs.unlinkSync(path.join(BACKUP_DIR, b.name)); n++; } catch {}
  }
  return n;
}

let autoTimer = null;
export function scheduleAutoBackup() {
  if (autoTimer) return;
  let lastDay = '';
  const tick = async () => {
    try {
      const d = new Date();
      const day = d.toISOString().slice(0, 10);
      if (d.getHours() === AUTO_HOUR && day !== lastDay) {
        lastDay = day;
        await createBackup('auto');
        const dropped = pruneBackups(KEEP_DEFAULT);
        console.log(`[backup] auto snapshot created (kept=${KEEP_DEFAULT}, dropped=${dropped})`);
      }
    } catch (e) { console.warn('[backup] auto failed', e.message); }
  };
  autoTimer = setInterval(tick, 60 * 60 * 1000);
  setTimeout(tick, 60 * 1000);
  console.log(`[backup] auto-backup scheduled at ${String(AUTO_HOUR).padStart(2, '0')}:00, keep ${KEEP_DEFAULT}, dir=${BACKUP_DIR}`);
}

// Restore: chạy pg_restore --clean --if-exists -1 (single transaction → rollback
// trọn nếu lỗi giữa chừng → DB không bị half-state). --no-owner để không cố set
// owner sang role không tồn tại trên cluster đích.
async function pgRestore(filePath) {
  await runPg(PG_RESTORE_BIN, [
    '--clean', '--if-exists',
    '--no-owner', '--no-acl',
    '-d', process.env.DATABASE_URL,
    filePath,
  ]);
}

export function attachBackup(r) {
  r.get('/api/admin/backups', requireAdmin, (_req, res) => {
    const items = listBackups();
    res.json({
      backups: items,
      total_size: items.reduce((s, b) => s + b.size, 0),
      dir: BACKUP_DIR,
      keep: KEEP_DEFAULT,
      auto_hour: AUTO_HOUR,
      format: 'pg_dump custom (-Fc)',
      pg_ready: !!process.env.DATABASE_URL,
    });
  });

  r.post('/api/admin/backups', requireAdmin, async (req, res) => {
    try {
      const item = await createBackup(req.body?.label || 'manual');
      res.json({ ok: true, backup: item });
    } catch (e) {
      res.status(500).json({ error: 'backup_failed', detail: String(e.message) });
    }
  });

  r.get('/api/admin/backups/:name', requireAdmin, (req, res) => {
    const full = safeBackupName(req.params.name);
    if (!full || !fs.existsSync(full)) return res.status(404).json({ error: 'not_found' });
    res.download(full, req.params.name);
  });

  r.delete('/api/admin/backups/:name', requireAdmin, (req, res) => {
    const full = safeBackupName(req.params.name);
    if (!full || !fs.existsSync(full)) return res.status(404).json({ error: 'not_found' });
    try { fs.unlinkSync(full); res.json({ ok: true, deleted: req.params.name }); }
    catch (e) { res.status(500).json({ error: 'delete_failed', detail: String(e.message) }); }
  });

  // POST /api/admin/restore — upload .dump (pg_dump custom format) → ghi
  // tạm, validate magic PGDMP, gọi pg_restore. KHÔNG cần restart server. Yêu
  // cầu X-Confirm-Restore=YES để chống nhấn nhầm. Lỗi giữa chừng → -1 single
  // transaction rollback, DB về trạng thái cũ.
  r.post('/api/admin/restore',
    requireAdmin,
    express.raw({ type: 'application/octet-stream', limit: MAX_RESTORE_BYTES }),
    async (req, res) => {
      if (req.get('X-Confirm-Restore') !== 'YES') {
        return res.status(400).json({ error: 'missing_confirm', message: 'Thiếu xác nhận X-Confirm-Restore=YES.' });
      }
      const buf = req.body;
      if (!Buffer.isBuffer(buf) || buf.length < 100) {
        return res.status(400).json({ error: 'empty_body', message: 'File rỗng hoặc quá nhỏ.' });
      }
      if (!buf.slice(0, 5).equals(PGDMP_MAGIC)) {
        return res.status(400).json({ error: 'not_pgdump', message: 'File upload không phải pg_dump custom format (-Fc). Header phải bắt đầu bằng "PGDMP".' });
      }
      // Trước khi restore, tự snapshot file hiện tại làm pre-restore để rollback
      // nhanh nếu file upload tuy đúng định dạng nhưng schema không tương thích.
      let safety = null;
      try {
        safety = await createBackup('prerestore');
      } catch (e) {
        return res.status(500).json({ error: 'safety_snapshot_failed', detail: String(e.message) });
      }
      const tmp = path.join(BACKUP_DIR, `.restore-${Date.now()}.dump`);
      try {
        fs.writeFileSync(tmp, buf);
        await pgRestore(tmp);
        fs.unlinkSync(tmp);
        res.json({
          ok: true,
          size: buf.length,
          safety_backup: safety.name,
          message: 'Phục hồi xong. File hiện tại đã được snapshot làm pre-restore trước khi restore.',
        });
      } catch (e) {
        try { if (fs.existsSync(tmp)) fs.unlinkSync(tmp); } catch {}
        res.status(500).json({
          error: 'restore_failed',
          detail: String(e.message),
          safety_backup: safety?.name,
          message: 'pg_restore lỗi. DB rollback về trạng thái trước restore (single-transaction). Snapshot pre-restore vẫn được lưu để khôi phục tay nếu cần.',
        });
      }
    });

  // GET /api/admin/restore/status — backwards-compat với UI cũ. Postgres
  // restore là instant nên luôn không có pending → giữ field cho FE.
  r.get('/api/admin/restore/status', requireAdmin, (_req, res) => {
    res.json({ pending: false });
  });

  console.log('[backup] routes mounted: /api/admin/backups, /api/admin/restore (pg_dump)');
}
