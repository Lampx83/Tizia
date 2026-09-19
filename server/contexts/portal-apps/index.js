/* PORTAL APPS — cài app theo chuẩn AI Portal (embedded zip) vào EduVerse.
 *
 * Mô hình:
 *   • Developer đã login upload .zip chứa manifest.json + public/index.html.
 *   • Server validate manifest, extract vào data/portal-apps/<owner_id>/<alias>/,
 *     ghi vào bảng portal_apps (per-owner sandbox).
 *   • Static serve dưới /portal-apps/u/<owner_id>/<alias>/...
 *   • App hiện trong apps.html qua GET /api/portal-apps (own + public).
 *
 * KHÔNG hỗ trợ (giảm bề mặt attack & scope MVP):
 *   • hasBackend: bundled Node code KHÔNG được thực thi — chỉ frontend-only.
 *   • apiProxyTarget: KHÔNG reverse-proxy ra URL ngoài.
 *   • portal-embedded.sql: KHÔNG chạy SQL từ zip (app chỉ là SPA tĩnh).
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
} from '../../db.js';
import { BUILTIN_APPS, CATALOG_VERSION } from './builtin-catalog.js';
import { requireAuth } from '../identity/auth.js';
import { requireAdmin } from '../admin/index.js';

// Seed builtin catalog vào DB (upsert theo alias). Chỉ chạy 1 lần / catalog version.
// Lưu marker version trong file để tránh re-seed mỗi khi server restart.
let _seeded = false;
export function seedBuiltinAppsOnce() {
  if (_seeded) return;
  const sysOwner = getSystemOwnerId();
  if (!sysOwner) {
    // Chưa có admin → defer; sẽ thử lại lần sau khi 1 request đi qua attachUser.
    return;
  }
  try {
    let inserted = 0, updated = 0;
    for (const app of BUILTIN_APPS) {
      const r = upsertBuiltinApp(sysOwner, app);
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
const ALIAS_RE             = /^[a-z][a-z0-9-]{1,40}$/; // lowercase, kebab, 2-41 ký tự
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

function validateManifest(json) {
  if (!json || typeof json !== 'object') return { ok: false, error: 'manifest không phải JSON object' };
  const alias = String(json.alias ?? json.id ?? '').trim().toLowerCase();
  if (!ALIAS_RE.test(alias)) return { ok: false, error: 'alias không hợp lệ (cần [a-z0-9-], 2-41 ký tự, bắt đầu bằng chữ)' };
  if (!json.name || typeof json.name !== 'string') return { ok: false, error: 'manifest.name (string) là bắt buộc' };
  // Note: chấp nhận hasBackend=true nhưng CHỈ extract public/ — backend Node code KHÔNG chạy.
  // App sẽ hoạt động một phần (UI hiển thị, API call → 404). Người cài tự chịu.
  return {
    ok: true,
    alias,
    name: String(json.name).slice(0, 120),
    description: json.description ? String(json.description).slice(0, 500) : null,
    icon: json.icon ? String(json.icon).slice(0, 60) : null,
    version: json.version ? String(json.version).slice(0, 40) : null,
    needsBackend: json.hasBackend === true,
  };
}

/**
 * @param {import('express').Router} r
 * @param {{ requireAuth: import('express').RequestHandler,
 *           requireAdmin: import('express').RequestHandler }} mw
 */
export function attachPortalApps(r, { requireAuth, requireAdmin }) {
  const PORTAL_APPS_DIR = getPortalAppsDir();

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

  // ── LIST: own + public + builtin ──
  // builtin = trỏ target_url nội bộ (vd /bao-so-hoc.html); embedded = static folder.
  // Một lần cơ hội seed nếu chưa: gọi sau khi đã có session admin.
  r.get('/api/portal-apps', requireAuth, (req, res) => {
    seedBuiltinAppsOnce();
    const ownerId = req.user.id;
    const own = listPortalAppsByOwner(ownerId).filter(a => !a.kind || a.kind === 'embedded');
    const pub = listPortalAppsPublic().filter(a => a.owner_id !== ownerId && (!a.kind || a.kind === 'embedded'));
    const builtins = listBuiltinApps();
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
  r.get('/api/portal-apps/catalog', (req, res) => {
    seedBuiltinAppsOnce();
    const builtins = listBuiltinApps();
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
    (req, res) => {
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
      const row = upsertPortalApp({
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
  r.delete('/api/portal-apps/:id', requireAuth, (req, res) => {
    const id = Number(req.params.id);
    const row = getPortalAppById(id);
    if (!row) return res.status(404).json({ error: 'not_found' });
    const isOwner = row.owner_id === req.user.id;
    const isAdmin = req.user.role === 'admin';
    if (!isOwner && !isAdmin) return res.status(403).json({ error: 'forbidden' });
    // Xoá thư mục trên disk
    const targetDir = path.join(PORTAL_APPS_DIR, String(row.owner_id), row.alias);
    try { fs.rmSync(targetDir, { recursive: true, force: true }); } catch {}
    deletePortalApp(id);
    res.json({ ok: true });
  });

  // ── PUBLISH/UNPUBLISH (admin) ──
  r.post('/api/portal-apps/:id/publish', requireAuth, requireAdmin, (req, res) => {
    const id = Number(req.params.id);
    const row = getPortalAppById(id);
    if (!row) return res.status(404).json({ error: 'not_found' });
    const isPublic = req.body?.public !== false; // default true
    setPortalAppPublic(id, isPublic);
    res.json({ ok: true, isPublic });
  });
}

export const plugin = {
  name: 'portal-apps',
  origin: 'dev-owned',
  sourceModule: 'server/contexts/portal-apps/index.js',
  mount(router) {
    attachPortalApps(router, { requireAuth, requireAdmin });
  },
};
