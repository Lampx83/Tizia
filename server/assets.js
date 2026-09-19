// ============================================================
// Asset Library (GAP 4) — quét tự động 3D model GLB/GLTF dưới public/
// và trả về JSON catalogue có tag, thumbnail (tự sinh từ R3F viewer),
// size, category để FE lazy preview + drag-drop sau này (cho Lesson
// Builder ở GAP 3).
// ============================================================

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const PUBLIC_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', 'public');

const SUPPORTED = new Set(['.glb', '.gltf', '.fbx', '.obj']);

// Heuristic tag từ tên file / thư mục — gán nhanh cho catalogue đầu tiên.
// (Sau này GV có thể override qua API; lúc đầu lấy quick win.)
const TAG_HEURISTICS = [
  { re: /(building|sky|tower|office|comm)/i, tags: ['building', 'urban'] },
  { re: /(suburb|house|villa|residen)/i, tags: ['building', 'suburban'] },
  { re: /(school|college|campus|class)/i, tags: ['campus', 'education'] },
  { re: /(tree|plant|grass|flower|herb|leaf)/i, tags: ['nature', 'plant'] },
  { re: /(road|street|path|lamp|stop|sign)/i, tags: ['street', 'urban'] },
  { re: /(park|bench|seat|fountain|stat)/i, tags: ['park', 'outdoor'] },
  { re: /(car|truck|bus|bike|vehic)/i, tags: ['vehicle'] },
  { re: /(person|people|man|woman|kid|student|teach)/i, tags: ['character'] },
  { re: /(food|drink|coffee|tea|cake|fruit)/i, tags: ['food'] },
  { re: /(book|paper|pen|desk|chair|table|board)/i, tags: ['classroom'] },
  { re: /(lab|beaker|flask|tube|microsc)/i, tags: ['lab', 'science'] },
  { re: /(grandstand|stadium|sport)/i, tags: ['sport', 'arena'] },
  { re: /(parasol|umbrella|low-detail)/i, tags: ['outdoor'] },
];

function inferTags(filename, relPath) {
  const tags = new Set();
  const probe = filename + ' ' + relPath;
  for (const { re, tags: tt } of TAG_HEURISTICS) {
    if (re.test(probe)) tt.forEach(t => tags.add(t));
  }
  // Pack name → tag riêng (commercial/suburban/pp)
  const m = relPath.match(/assets\/([a-z-]+)\//i);
  if (m) tags.add('pack:' + m[1].toLowerCase());
  if (tags.size === 0) tags.add('misc');
  return [...tags];
}

function inferCategory(tags) {
  const order = ['character', 'lab', 'classroom', 'building', 'nature', 'street', 'park', 'vehicle', 'food', 'sport', 'outdoor'];
  for (const cat of order) if (tags.includes(cat)) return cat;
  return 'other';
}

function prettyName(filename) {
  return filename
    .replace(/\.(glb|gltf|fbx|obj)$/i, '')
    .replace(/[-_]+/g, ' ')
    .replace(/\b\w/g, c => c.toUpperCase())
    .trim();
}

/**
 * Quét đệ quy thư mục root, trả về list asset có metadata.
 * @param {string} publicDir absolute path đến /public
 * @returns {{ items: Array, packs: Object, tags: Object, count: number, scannedAt: number }}
 */
function scanAssets(publicDir) {
  const items = [];
  const stack = [publicDir];
  while (stack.length) {
    const dir = stack.pop();
    let entries;
    try { entries = fs.readdirSync(dir, { withFileTypes: true }); }
    catch { continue; }
    for (const ent of entries) {
      const full = path.join(dir, ent.name);
      if (ent.isDirectory()) {
        // skip node_modules / hidden / sw caches
        if (ent.name === 'node_modules' || ent.name.startsWith('.')) continue;
        stack.push(full);
        continue;
      }
      const ext = path.extname(ent.name).toLowerCase();
      if (!SUPPORTED.has(ext)) continue;
      let size = 0;
      try { size = fs.statSync(full).size; } catch {}
      const relFs = path.relative(publicDir, full).split(path.sep).join('/');
      const url = './' + relFs;
      const tags = inferTags(ent.name, relFs);
      const category = inferCategory(tags);
      items.push({
        id: relFs.replace(/[^a-z0-9]+/gi, '-').toLowerCase(),
        name: prettyName(ent.name),
        file: ent.name,
        url,
        relPath: relFs,
        format: ext.slice(1),
        sizeBytes: size,
        sizeHuman: humanSize(size),
        tags,
        category,
      });
    }
  }
  items.sort((a, b) => a.category.localeCompare(b.category) || a.name.localeCompare(b.name));

  // Aggregate
  const packs = {};
  const tagsCount = {};
  for (const it of items) {
    const pack = it.tags.find(t => t.startsWith('pack:')) || 'pack:misc';
    packs[pack] = (packs[pack] || 0) + 1;
    for (const t of it.tags) tagsCount[t] = (tagsCount[t] || 0) + 1;
  }

  return { items, packs, tags: tagsCount, count: items.length, scannedAt: Date.now() };
}

function humanSize(b) {
  if (!b) return '—';
  if (b < 1024) return b + ' B';
  if (b < 1024 * 1024) return (b / 1024).toFixed(1) + ' KB';
  return (b / 1024 / 1024).toFixed(1) + ' MB';
}

let CACHE = null;
let CACHE_AT = 0;
const CACHE_TTL = 60_000;

/**
 * Attach asset routes to Express router.
 * @param {import('express').Router} r
 * @param {string} publicDir
 */
export function attachAssets(r, publicDir) {
  r.get('/api/assets', (_req, res) => {
    if (!CACHE || Date.now() - CACHE_AT > CACHE_TTL) {
      CACHE = scanAssets(publicDir);
      CACHE_AT = Date.now();
    }
    res.json(CACHE);
  });

  // Force refresh (after upload new model)
  r.post('/api/assets/rescan', (_req, res) => {
    CACHE = scanAssets(publicDir);
    CACHE_AT = Date.now();
    res.json({ ok: true, count: CACHE.count });
  });
}

export const plugin = {
  name: 'assets',
  mount(router) {
    attachAssets(router, PUBLIC_DIR);
  },
};
