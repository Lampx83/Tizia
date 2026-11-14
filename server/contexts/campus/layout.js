// ============================================================
// Campus layout context — override 2.5D map config từ DB
// ============================================================
// b-iso-canvas.html hardcode CAMPUSES[domain] làm default. Super-admin có thể
// đè qua /admin/campus-editor → POST /api/admin/campus-layout/:domain để lưu.
// View page (mọi user, kể cả guest) đọc qua GET /api/campus-layout/:domain.
//
// Lưu vào bảng campus_layouts (domain PK, layout JSON text, updated_at ms).
// Bảng được CREATE IF NOT EXISTS lúc module load — không cần migration riêng.
// ============================================================

import { db } from '../../db.js';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PUBLIC_DIR = path.resolve(__dirname, '..', '..', '..', 'public');

// Danh sách model tĩnh cho palette — quét lúc server start, cache mãi (không đổi khi chạy).
// Chia 2 pack: suburban (Kenney City Kit Suburban) và kay (KayKit Mini-Game pack).
let MODEL_CATALOGUE = null;
function buildCatalogue() {
  if (MODEL_CATALOGUE) return MODEL_CATALOGUE;
  const subDir = path.join(PUBLIC_DIR, 'campus-proto', 'assets', 'suburban', 'Models', 'GLB format');
  const kayDir = path.join(PUBLIC_DIR, 'campus-proto', 'assets', 'kaykit');

  function glbsIn(dir, pack, urlBase) {
    try {
      return fs.readdirSync(dir)
        .filter(f => f.endsWith('.glb'))
        .map(f => ({
          pack,
          key: `${pack}:${f.replace('.glb', '')}`,
          name: f.replace('.glb', '').replace(/-/g, ' '),
          url: `${urlBase}/${encodeURIComponent(f)}`,
        }));
    } catch { return []; }
  }

  // encodeURI mã hoá space → %20 nhưng giữ / — cần cho GLTFLoader fetch đúng
  const suburban = glbsIn(subDir, 'sub', 'assets/suburban/Models/GLB%20format');
  // KayKit — folder lưu theo thư mục con; quét 2 level
  const kay = [];
  if (fs.existsSync(kayDir)) {
    for (const entry of fs.readdirSync(kayDir)) {
      const sub = path.join(kayDir, entry);
      if (fs.statSync(sub).isDirectory()) {
        const items = glbsIn(sub, 'kay', `assets/kaykit/${entry}`);
        kay.push(...items);
      } else if (entry.endsWith('.glb')) {
        kay.push({ pack: 'kay', key: `kay:${entry.replace('.glb','')}`, name: entry.replace('.glb','').replace(/-/g,' '), url: `assets/kaykit/${entry}` });
      }
    }
  }

  MODEL_CATALOGUE = { suburban, kay, total: suburban.length + kay.length };
  return MODEL_CATALOGUE;
}

const stmtGet    = db.prepare(`SELECT layout FROM campus_layouts WHERE domain = ?`);
const stmtUpsert = db.prepare(`
  INSERT INTO campus_layouts (domain, layout, updated_at)
  VALUES (?, ?, ?)
  ON CONFLICT(domain) DO UPDATE SET layout = excluded.layout, updated_at = excluded.updated_at
`);
const stmtDelete = db.prepare(`DELETE FROM campus_layouts WHERE domain = ?`);

// Whitelist domain để tránh injection qua :domain
const ALLOWED_DOMAINS = new Set(['preschool', 'primary', 'secondary', 'it', 'pharmacy', 'language', 'driving']);

// Whitelist key cấp 1 — body chỉ giữ đúng các field này.
// Bám theo schema CAMPUSES trong public/campus-proto/b-iso-canvas.html.
const ALLOWED_KEYS = new Set([
  'title', 'credit', 'grass', 'vroads', 'hroads', 'autoPaths', 'roads',
  'buildings', 'facilities', 'fields', 'playthings', 'critters',
  'trees', 'cars', 'props', 'walkways', 'tints', 'sportTargets',
  'walls',
]);

function sanitize(input) {
  if (!input || typeof input !== 'object') return null;
  const out = {};
  for (const k of Object.keys(input)) {
    if (ALLOWED_KEYS.has(k)) out[k] = input[k];
  }
  return Object.keys(out).length ? out : null;
}

async function readLayout(domain) {
  const row = await stmtGet.get(domain);
  if (!row) return null;
  try { return JSON.parse(row.layout); } catch { return null; }
}

// requireSchoolAccess(getDomain) — cho super-admin HOẶC school-admin đúng trường.
// Nếu không truyền (backward-compat) thì POST/DELETE fallback về requireAdmin.
export function attachCampusLayout(r, requireAdmin, requireSchoolAccess) {
  const schoolGate = requireSchoolAccess
    ? requireSchoolAccess((req) => String(req.params.domain || '').toLowerCase())
    : requireAdmin;
  // GET public — danh sách model cho palette (không cần login)
  r.get('/api/campus-models', (_req, res) => {
    res.json(buildCatalogue());
  });
  // GET public — view page fetch để override default
  r.get('/api/campus-layout/:domain', async (req, res) => {
    const domain = String(req.params.domain || '').toLowerCase();
    if (!ALLOWED_DOMAINS.has(domain)) return res.status(404).json({ error: 'unknown_domain' });
    try {
      const layout = await readLayout(domain);
      res.json({ domain, layout });
    } catch (e) {
      res.status(500).json({ error: 'read_failed', message: e.message });
    }
  });

  // POST — lưu đè. Super-admin (mọi trường) hoặc school-admin của trường đó.
  r.post('/api/admin/campus-layout/:domain', schoolGate, async (req, res) => {
    const domain = String(req.params.domain || '').toLowerCase();
    if (!ALLOWED_DOMAINS.has(domain)) return res.status(400).json({ error: 'unknown_domain' });
    const clean = sanitize(req.body?.layout);
    if (!clean) return res.status(400).json({ error: 'invalid_body', message: 'Cần {layout:{...}}' });
    try {
      await stmtUpsert.run(domain, JSON.stringify(clean), Date.now());
      res.json({ ok: true, domain });
    } catch (e) {
      res.status(500).json({ error: 'write_failed', message: e.message });
    }
  });

  // DELETE — xoá override (về default hardcoded). Super-admin hoặc school-admin trường đó.
  r.delete('/api/admin/campus-layout/:domain', schoolGate, async (req, res) => {
    const domain = String(req.params.domain || '').toLowerCase();
    if (!ALLOWED_DOMAINS.has(domain)) return res.status(400).json({ error: 'unknown_domain' });
    try {
      const info = await stmtDelete.run(domain);
      res.json({ ok: true, domain, deleted: info.changes > 0 });
    } catch (e) {
      res.status(500).json({ error: 'delete_failed', message: e.message });
    }
  });

  // GET list (admin only) — xem tất cả override đang có
  r.get('/api/admin/campus-layouts', requireAdmin, async (_req, res) => {
    const rows = await db.prepare(`SELECT domain, updated_at FROM campus_layouts ORDER BY domain`).all();
    res.json({ layouts: rows });
  });

  console.log('[campus-layout] routes mounted (DB backend): GET /api/campus-layout/:domain · POST/DELETE /api/admin/campus-layout/:domain');
}
