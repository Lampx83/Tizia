/* PORTAL APPS — cài app theo chuẩn AI Portal vào EduVerse/Tizia.
 *
 * MỤC TIÊU: cùng một gói .zip cài được trên AI Portal thì cũng cài được trên Tizia
 * (Convertum, Scorum, QRCode, …). Tizia tái tạo đúng "hợp đồng" host↔app của AI Portal.
 *
 * Mô hình:
 *   • Developer đã login upload .zip chứa manifest.json + public/index.html.
 *   • Server validate manifest, extract vào data/portal-apps/<owner_id>/<alias>/,
 *     ghi vào bảng portal_apps (per-owner sandbox).
 *   • Static serve dưới /portal-apps/u/<owner_id>/<alias>/...
 *   • App hiện trong apps.html qua GET /api/portal-apps (own + public).
 *
 * HỢP ĐỒNG TƯƠNG THÍCH AI PORTAL:
 *   • [Tầng 0] Khi serve index.html, CHÈN các global mà app AI Portal mong đợi:
 *       window.__PORTAL_USER__ / __WRITE_API_BASE__ / __DATA_API_BASE__
 *       / __PORTAL_THEME__ / __AI_PORTAL_LOCALE__ / __PORTAL_BASE_PATH__
 *     ⇒ app frontend-only (hasFrontendOnly) chạy y như trên AI Portal, không sửa code.
 *   • [Tầng 1] App có backend riêng (manifest.apiProxyTarget/base_url): request
 *       /api/apps/<alias>/*  được reverse-proxy tới target, kèm header danh tính
 *       X-User-Id / X-User-Email / X-User-Name lấy từ session Tizia — đúng như proxy
 *       của AI Portal (apps-proxy.ts). Có chặn SSRF (địa chỉ nội bộ) theo mặc định.
 *
 * KHÔNG hỗ trợ (giảm bề mặt attack):
 *   • Bundled Node code (dist/embed.js) KHÔNG chạy in-process — app có backend phải
 *     tự chạy như service riêng rồi khai báo apiProxyTarget (khác AI Portal dùng Postgres
 *     schema-per-app + require() in-process). Đóng gói kiểu đó → dùng Tầng 1.
 *   • KHÔNG chạy SQL từ zip.
 */

import path from 'node:path';
import fs from 'node:fs';
import express from 'express';
import AdmZip from 'adm-zip';
import {
  upsertPortalApp,
  listPortalAppsByOwner,
  listPortalAppsPublic,
  getPortalAppById,
  deletePortalApp,
  setPortalAppPublic,
  upsertBuiltinApp,
  listBuiltinApps,
  getSystemOwnerId,
  findInstalledPortalAppByAlias,
} from '../../db.js';
import { BUILTIN_APPS, CATALOG_VERSION } from './builtin-catalog.js';
import {
  ALIAS_RE,
  INDEX_INJECT_RE,
  validateManifest,
  injectPortalConfig,
  isSafeProxyTarget,
} from './embed.js';

// Seed builtin catalog vào DB (upsert theo alias). Chỉ chạy 1 lần / catalog version.
// Lưu marker version trong file để tránh re-seed mỗi khi server restart.
let _seeded = false;
export async function seedBuiltinAppsOnce() {
  if (_seeded) return;
  const sysOwner = await getSystemOwnerId();
  if (!sysOwner) {
    // Chưa có admin → defer; sẽ thử lại lần sau khi 1 request đi qua attachUser.
    return;
  }
  try {
    let inserted = 0, updated = 0;
    for (const app of BUILTIN_APPS) {
      const r = await upsertBuiltinApp(sysOwner, app);
      if (r.action === 'inserted') inserted++;
      else updated++;
    }
    console.log(`[portal-apps] seeded ${BUILTIN_APPS.length} builtin (${inserted} new, ${updated} updated) — catalog ${CATALOG_VERSION}`);
    _seeded = true;
  } catch (err) {
    console.warn('[portal-apps] seed failed:', err?.message || err);
  }
}

// Giới hạn an toàn
const MAX_ZIP_BYTES        = 30 * 1024 * 1024;   // 30 MB zip
const MAX_UNCOMPRESSED     = 100 * 1024 * 1024;  // 100 MB sau giải nén (chống zip-bomb)
const MAX_FILES_PER_APP    = 2000;
const ALLOWED_TOP_DIRS     = new Set(['public', 'schema']); // schema chấp nhận để upload nhưng KHÔNG chạy
const REQUIRED_INDEX       = 'public/index.html';

function getPortalAppsDir() {
  const ROOT_DIR = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..', '..', '..');
  const DATA_DIR = process.env.DATA_DIR
    ? path.resolve(process.env.DATA_DIR)
    : path.resolve(ROOT_DIR, 'data');
  const dir = path.join(DATA_DIR, 'portal-apps');
  fs.mkdirSync(dir, { recursive: true });
  return dir;
}

function safeEntryPath(rawName) {
  // Bỏ leading slash, normalize, chặn path traversal.
  let p = String(rawName || '').replace(/^[/\\]+/, '');
  if (!p || p.endsWith('/')) return null; // bỏ directory entries
  p = p.replace(/\\/g, '/');
  // Reject .., absolute, null bytes
  if (p.includes('..') || p.includes('\0')) return null;
  if (path.isAbsolute(p)) return null;
  return p;
}


/**
 * @param {import('express').Router} r
 * @param {{ requireAuth: import('express').RequestHandler,
 *           requireAdmin: import('express').RequestHandler,
 *           basePath?: string }} mw
 */
export function attachPortalApps(r, { requireAuth, requireAdmin, basePath = '' }) {
  const PORTAL_APPS_DIR = getPortalAppsDir();
  const BASE_PATH = (basePath || process.env.BASE_PATH || '').replace(/\/$/, '');

  // ── [Tầng 0] INJECT index.html: chèn window.__PORTAL_*__ theo hợp đồng AI Portal ──
  // Bắt ĐÚNG request tới index (thư mục "…/<alias>/" hoặc "…/<alias>/index.html"), đọc file
  // từ disk, chèn config rồi trả. Mọi asset khác rơi xuống express.static bên dưới.
  // PHẢI đứng TRƯỚC static mount để chặn được request index trước khi static tự serve.
  r.get(INDEX_INJECT_RE, (req, res, next) => {
    const ownerId = req.params[0];
    const alias = req.params[1];
    const indexPath = path.join(PORTAL_APPS_DIR, ownerId, alias, 'index.html');
    // Guard path-traversal (ownerId là số, alias đã qua regex — vẫn kiểm tra prefix cho chắc).
    if (!indexPath.startsWith(PORTAL_APPS_DIR + path.sep)) return next();
    fs.readFile(indexPath, 'utf-8', (err, html) => {
      if (err) return next(); // không có index → để static trả 404 như cũ
      const theme = (req.query.theme === 'dark' || req.query.theme === 'light') ? req.query.theme : null;
      const out = injectPortalConfig(html, {
        alias, ownerId, basePath: BASE_PATH,
        user: req.user || null,
        theme,
        locale: 'vi',
      });
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      res.setHeader('Cache-Control', 'no-store'); // HTML đã cá nhân hoá (user) → không cache
      res.setHeader('X-Content-Type-Options', 'nosniff');
      res.send(out);
    });
  });

  // ── STATIC SERVE: /portal-apps/u/<owner_id>/<alias>/* ──
  // Mỗi user có namespace riêng để tránh đụng alias. extension html cho clean URL.
  r.use('/portal-apps/u', express.static(PORTAL_APPS_DIR, {
    fallthrough: false,
    index: 'index.html',
    extensions: ['html'],
    setHeaders: (res, filePath) => {
      // Static assets cache mạnh; HTML index thì stale-while-revalidate nhẹ.
      if (filePath.endsWith('.html')) {
        res.setHeader('Cache-Control', 'public, max-age=60, stale-while-revalidate=600');
      } else if (/\.(?:js|css|png|jpg|jpeg|gif|webp|svg|woff2?|ttf)$/i.test(filePath)) {
        res.setHeader('Cache-Control', 'public, max-age=86400, stale-while-revalidate=604800');
      }
      // Sandbox: không cho parent trang đăng nhập snoop iframe content qua opener.
      res.setHeader('X-Content-Type-Options', 'nosniff');
    },
  }));

  // ── [Tầng 1] PROXY BACKEND: /api/apps/<alias>/*  →  manifest.apiProxyTarget ──
  // App có backend riêng (service ngoài) khai `apiProxyTarget` trong manifest. Request từ FE
  // của app (window.__WRITE_API_BASE__ = /api/apps/<alias>) được forward tới target, KÈM header
  // danh tính X-User-Id / X-User-Email / X-User-Name — đúng hợp đồng AI Portal (apps-proxy.ts).
  // App tin tưởng header này (Tizia là identity provider). Có chặn SSRF trong isSafeProxyTarget.
  r.all('/api/apps/:alias/*', requireAuth, async (req, res) => {
    const alias = String(req.params.alias || '').trim().toLowerCase();
    if (!ALIAS_RE.test(alias)) return res.status(400).json({ error: 'bad_alias' });

    const row = await findInstalledPortalAppByAlias(req.user.id, alias);
    if (!row) return res.status(404).json({ error: 'app_not_found', message: `Chưa cài app: ${alias}` });

    let manifest = {};
    try { manifest = JSON.parse(row.manifest_json || '{}'); } catch {}
    const target = String(manifest.apiProxyTarget || manifest.base_url || '').replace(/\/+$/, '');
    if (!target) {
      return res.status(404).json({ error: 'no_backend', message: 'App này là frontend-only (không khai apiProxyTarget).' });
    }
    if (!isSafeProxyTarget(target)) {
      return res.status(502).json({ error: 'unsafe_target', message: 'apiProxyTarget bị chặn (địa chỉ nội bộ/không phải http).' });
    }

    // Ghép URL đích: phần sau /api/apps/<alias>/ + query string gốc.
    const rest = req.params[0] ? '/' + req.params[0].replace(/^\/+/, '') : '/';
    const qIdx = req.originalUrl.indexOf('?');
    const qs = qIdx >= 0 ? req.originalUrl.slice(qIdx) : '';
    const targetUrl = target + rest + qs;

    const headers = {
      'X-User-Id': String(req.user.id),
      'X-User-Email': req.user.email || '',
      'X-User-Name': req.user.display_name || req.user.username || '',
    };
    if (req.headers['content-type']) headers['Content-Type'] = req.headers['content-type'];
    if (req.headers['accept']) headers['Accept'] = req.headers['accept'];

    // express.json() (app-level, 64kb) đã parse body TRƯỚC router này → tái tuần tự hoá.
    let body;
    if (req.method !== 'GET' && req.method !== 'HEAD' && req.body != null) {
      if (Buffer.isBuffer(req.body)) body = req.body;
      else if (typeof req.body === 'string') body = req.body;
      else if (Object.keys(req.body).length > 0) body = JSON.stringify(req.body);
    }

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 60_000);
    try {
      const upstream = await fetch(targetUrl, { method: req.method, headers, body, signal: controller.signal });
      res.status(upstream.status);
      const ct = upstream.headers.get('content-type');
      if (ct) res.setHeader('Content-Type', ct);
      const cd = upstream.headers.get('content-disposition');
      if (cd) res.setHeader('Content-Disposition', cd);
      const buf = Buffer.from(await upstream.arrayBuffer());
      res.send(buf);
    } catch (e) {
      if (!res.headersSent) {
        const aborted = e && e.name === 'AbortError';
        res.status(aborted ? 504 : 502).json({ error: aborted ? 'upstream_timeout' : 'upstream_failed', message: String(e?.message || e) });
      }
    } finally {
      clearTimeout(timer);
    }
  });

  // ── LIST: own + public + builtin ──
  // builtin = trỏ target_url nội bộ (vd /bao-so-hoc.html); embedded = static folder.
  // Một lần cơ hội seed nếu chưa: gọi sau khi đã có session admin.
  r.get('/api/portal-apps', requireAuth, async (req, res) => {
    await seedBuiltinAppsOnce();
    const ownerId = req.user.id;
    const own = (await listPortalAppsByOwner(ownerId)).filter(a => !a.kind || a.kind === 'embedded');
    const pub = (await listPortalAppsPublic()).filter(a => a.owner_id !== ownerId && (!a.kind || a.kind === 'embedded'));
    const builtins = await listBuiltinApps();
    const decorate = (rows, kind = 'embedded') => rows.map(a => ({
      id: a.id,
      alias: a.alias,
      name: a.name,
      description: a.description,
      icon: a.icon,
      version: a.version,
      isPublic: !!a.is_public,
      sizeBytes: a.size_bytes || 0,
      installedAt: a.installed_at,
      updatedAt: a.updated_at,
      ownerId: a.owner_id,
      ownerName: a.owner_display_name || a.owner_username || null,
      kind,
      category: a.category || null,
      domain: a.domain || null,
      // URL: builtin trỏ target_url, embedded trỏ static folder.
      url: kind === 'builtin' ? a.target_url : `/portal-apps/u/${a.owner_id}/${a.alias}/`,
    }));
    res.json({
      own: decorate(own),
      public: decorate(pub),
      builtin: decorate(builtins, 'builtin'),
    });
  });

  // Public list cho campus map / homepage — không cần login (guest mode).
  r.get('/api/portal-apps/catalog', async (req, res) => {
    await seedBuiltinAppsOnce();
    const builtins = await listBuiltinApps();
    res.json({
      builtin: builtins.map(a => ({
        id: a.id, alias: a.alias, name: a.name, description: a.description,
        icon: a.icon, version: a.version,
        category: a.category, domain: a.domain, url: a.target_url, kind: 'builtin',
      })),
      version: CATALOG_VERSION,
    });
  });

  // ── INSTALL: upload .zip (raw body) ──
  r.post('/api/portal-apps/install',
    requireAuth,
    express.raw({ type: () => true, limit: MAX_ZIP_BYTES }),
    async (req, res) => {
      const ownerId = req.user.id;
      const buf = req.body;
      if (!Buffer.isBuffer(buf) || buf.length === 0) {
        return res.status(400).json({ error: 'empty_body', message: 'File rỗng.' });
      }
      let zip;
      try { zip = new AdmZip(buf); }
      catch (e) { return res.status(400).json({ error: 'bad_zip', message: 'File không phải zip hợp lệ.' }); }

      const entries = zip.getEntries();
      if (entries.length > MAX_FILES_PER_APP) {
        return res.status(413).json({ error: 'too_many_files', max: MAX_FILES_PER_APP });
      }

      // Tìm manifest.json (root hoặc 1 cấp con)
      const manifestEntry = entries.find(e => {
        const n = e.entryName;
        return n === 'manifest.json' || /^[^/]+\/manifest\.json$/.test(n);
      });
      if (!manifestEntry || manifestEntry.isDirectory) {
        return res.status(400).json({ error: 'no_manifest', message: 'Zip không có manifest.json.' });
      }

      // Strip prefix nếu manifest ở 1 cấp con (vd "my-app/manifest.json")
      const prefix = manifestEntry.entryName.replace(/manifest\.json$/, '');

      let manifest;
      try { manifest = JSON.parse(manifestEntry.getData().toString('utf-8')); }
      catch { return res.status(400).json({ error: 'bad_manifest', message: 'manifest.json không phải JSON hợp lệ.' }); }

      const v = validateManifest(manifest);
      if (!v.ok) return res.status(400).json({ error: 'invalid_manifest', message: v.error });

      // Kiểm public/index.html tồn tại
      const indexEntry = entries.find(e => e.entryName === prefix + REQUIRED_INDEX);
      if (!indexEntry) {
        return res.status(400).json({ error: 'no_index_html', message: 'Thiếu public/index.html (entry point).' });
      }

      // Tính tổng kích thước uncompressed để chặn zip-bomb
      let totalUncompressed = 0;
      for (const e of entries) {
        if (!e.isDirectory) totalUncompressed += (e.header.size | 0);
        if (totalUncompressed > MAX_UNCOMPRESSED) {
          return res.status(413).json({ error: 'too_large_uncompressed', max: MAX_UNCOMPRESSED });
        }
      }

      // Extract vào thư mục TẠM rồi swap (atomic-ish) để tránh app cũ bị xoá nửa chừng.
      const targetDir = path.join(PORTAL_APPS_DIR, String(ownerId), v.alias);
      const stagingDir = targetDir + '.staging-' + Date.now();
      try {
        fs.mkdirSync(stagingDir, { recursive: true });

        // Extract CHỈ nội dung trong public/ (strip prefix "public/") để static mount
        // /portal-apps/u/<owner>/<alias>/ → file thẳng dưới <owner>/<alias>/ không cần nested public.
        // Manifest đã lưu trong DB; schema/ chấp nhận nhưng KHÔNG chạy (chưa hỗ trợ).
        for (const e of entries) {
          if (e.isDirectory) continue;
          const raw = e.entryName.startsWith(prefix) ? e.entryName.slice(prefix.length) : e.entryName;
          const rel = safeEntryPath(raw);
          if (!rel) continue;
          // Chỉ giải nén file trong public/ ; manifest.json đã có trong DB, schema/ bỏ qua.
          if (!rel.startsWith('public/')) continue;
          const innerPath = rel.slice('public/'.length); // bỏ prefix
          if (!innerPath) continue; // chính là folder public/, bỏ qua
          const dest = path.join(stagingDir, innerPath);
          // Path-traversal final guard
          if (!dest.startsWith(stagingDir + path.sep) && dest !== stagingDir) continue;
          fs.mkdirSync(path.dirname(dest), { recursive: true });
          fs.writeFileSync(dest, e.getData());
        }

        // Đảm bảo embed-config.json tồn tại (theo convention AI Portal)
        const embedCfg = path.join(stagingDir, 'embed-config.json');
        if (!fs.existsSync(embedCfg)) {
          fs.writeFileSync(embedCfg, '{}');
        }

        // Swap: xoá cũ, rename staging → targetDir
        if (fs.existsSync(targetDir)) {
          fs.rmSync(targetDir, { recursive: true, force: true });
        }
        fs.mkdirSync(path.dirname(targetDir), { recursive: true });
        fs.renameSync(stagingDir, targetDir);
      } catch (err) {
        try { fs.rmSync(stagingDir, { recursive: true, force: true }); } catch {}
        console.warn('[portal-apps] install failed:', err?.message || err);
        return res.status(500).json({ error: 'extract_failed', message: 'Không giải nén được zip.' });
      }

      // Ghi DB
      const row = await upsertPortalApp({
        ownerId,
        alias: v.alias,
        name: v.name,
        description: v.description,
        icon: v.icon,
        version: v.version,
        manifestJson: JSON.stringify(manifest),
        sizeBytes: totalUncompressed,
      });

      res.json({
        ok: true,
        app: {
          id: row.id,
          alias: row.alias,
          name: row.name,
          version: row.version,
          url: `/portal-apps/u/${ownerId}/${row.alias}/`,
        },
      });
    }
  );

  // ── UNINSTALL ──
  r.delete('/api/portal-apps/:id', requireAuth, async (req, res) => {
    const id = Number(req.params.id);
    const row = await getPortalAppById(id);
    if (!row) return res.status(404).json({ error: 'not_found' });
    const isOwner = row.owner_id === req.user.id;
    const isAdmin = req.user.role === 'admin';
    if (!isOwner && !isAdmin) return res.status(403).json({ error: 'forbidden' });
    // Xoá thư mục trên disk
    const targetDir = path.join(PORTAL_APPS_DIR, String(row.owner_id), row.alias);
    try { fs.rmSync(targetDir, { recursive: true, force: true }); } catch {}
    await deletePortalApp(id);
    res.json({ ok: true });
  });

  // ── PUBLISH/UNPUBLISH (admin) ──
  r.post('/api/portal-apps/:id/publish', requireAuth, requireAdmin, async (req, res) => {
    const id = Number(req.params.id);
    const row = await getPortalAppById(id);
    if (!row) return res.status(404).json({ error: 'not_found' });
    const isPublic = req.body?.public !== false; // default true
    await setPortalAppPublic(id, isPublic);
    res.json({ ok: true, isPublic });
  });

  // ── LIBRARY (admin): thêm app vào THƯ VIỆN dùng chung (kind='builtin') ──
  // "DB-managed library": admin đăng ký 1 trang/URL thành app mà KHÔNG cần sửa
  // builtin-catalog.js + restart. Trỏ target_url (nội bộ /x.html hoặc http ngoài),
  // gắn domain = cấp học để trường lọc/dùng. Quy mọi tính năng thành app qua đây.
  r.post('/api/portal-apps/library', requireAuth, requireAdmin, async (req, res) => {
    const b = req.body || {};
    const alias = String(b.alias || '').trim().toLowerCase();
    const name = String(b.name || '').trim();
    const targetUrl = String(b.targetUrl || b.target_url || '').trim();
    if (!ALIAS_RE.test(alias)) return res.status(400).json({ error: 'bad_alias', message: 'alias cần [a-z0-9-], 2-41 ký tự.' });
    if (!name) return res.status(400).json({ error: 'bad_name', message: 'Cần tên app.' });
    if (!(targetUrl.startsWith('/') || /^https?:\/\//i.test(targetUrl))) {
      return res.status(400).json({ error: 'bad_target', message: 'target_url phải là /trang.html nội bộ hoặc http(s)://…' });
    }
    const sysOwner = await getSystemOwnerId();
    if (!sysOwner) return res.status(503).json({ error: 'no_system_owner', message: 'Chưa có admin để sở hữu app thư viện.' });
    const r2 = await upsertBuiltinApp(sysOwner, {
      alias, name,
      description: b.description ? String(b.description).slice(0, 500) : null,
      icon: b.icon ? String(b.icon).slice(0, 60) : '🧩',
      version: '1.0.0',
      target_url: targetUrl,
      category: b.category ? String(b.category).slice(0, 40) : 'tool',
      domain: b.domain ? String(b.domain).slice(0, 40) : null,
    });
    res.json({ ok: true, action: r2.action, alias });
  });
}
