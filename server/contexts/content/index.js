// ============================================================
// Content store TỔNG QUÁT — data heterogeneous (không phải scenario tuần).
// ============================================================
// curriculum_content lo bộ scenario tuần (quiz + lý thuyết). Còn nhiều data
// khác vẫn hardcode trong code: ca lâm sàng, nhân vật lịch sử, danh mục thuốc,
// 34 tỉnh/thành, đề OSCE… Mỗi loại cấu trúc khác nhau → KHÔNG nhét chung 1 schema.
//
// Bảng này lưu MỌI loại theo (collection, item_key) → body JSON tự do. FE đọc
// qua /api/content/:collection. Seed từ các file JS gốc (seed-content.mjs).
//
// source: 'seed' (từ file JS, re-seed ghi đè) | 'admin' (sửa tay, re-seed giữ).
// ============================================================

import { db } from '../../db.js';
import { requireAdmin } from '../admin/index.js';

db.exec(`
  CREATE TABLE IF NOT EXISTS content_datasets (
    collection  TEXT NOT NULL,            -- 'history-characters', 'drug-catalog', 'provinces'…
    item_key    TEXT NOT NULL,            -- id item trong collection (hoặc '_doc' nếu cả khối)
    body        TEXT NOT NULL,            -- JSON item
    ord         INTEGER NOT NULL DEFAULT 0,  -- giữ thứ tự gốc
    source      TEXT NOT NULL DEFAULT 'seed',
    active      INTEGER NOT NULL DEFAULT 1,
    updated_at  INTEGER NOT NULL,
    PRIMARY KEY (collection, item_key)
  );
  CREATE INDEX IF NOT EXISTS idx_content_ds_coll ON content_datasets(collection, active, ord);
`);

const upsertSeedStmt = db.prepare(`
  INSERT INTO content_datasets (collection, item_key, body, ord, source, active, updated_at)
  VALUES (@collection, @item_key, @body, @ord, 'seed', 1, @updated_at)
  ON CONFLICT(collection, item_key) DO UPDATE SET
    body=@body, ord=@ord, updated_at=@updated_at
  WHERE content_datasets.source <> 'admin'
`);
const upsertEditStmt = db.prepare(`
  INSERT INTO content_datasets (collection, item_key, body, ord, source, active, updated_at)
  VALUES (@collection, @item_key, @body, @ord, @source, @active, @updated_at)
  ON CONFLICT(collection, item_key) DO UPDATE SET
    body=@body, ord=@ord, source=@source, active=@active, updated_at=@updated_at
`);

export function upsertItem(collection, item_key, body, { source = 'seed', ord = 0, active = 1 } = {}) {
  const row = { collection, item_key: String(item_key), body: JSON.stringify(body), ord, source, active, updated_at: Date.now() };
  if (source === 'seed') upsertSeedStmt.run(row);
  else upsertEditStmt.run(row);
  return { ok: true };
}

// Deactivate các item source='seed' không còn trong danh sách keep (giữ nguyên bản 'admin').
const pruneSeedStmt = db.prepare(`
  UPDATE content_datasets SET active = 0, updated_at = ?
   WHERE collection = ? AND source = 'seed' AND active = 1
     AND item_key NOT IN (SELECT value FROM json_each(?))
`);

// Seed cả 1 collection từ mảng items. keyFn(item, i) → item_key (mặc định item.id || i).
// Sau khi upsert, deactivate các bản seed cũ không còn trong items (vd: tỉnh đã sáp nhập).
export const seedCollection = db.transaction((collection, items, keyFn) => {
  let n = 0;
  const keys = [];
  items.forEach((item, i) => {
    const key = keyFn ? keyFn(item, i) : (item?.id ?? String(i));
    upsertItem(collection, key, item, { source: 'seed', ord: i });
    keys.push(String(key));
    n++;
  });
  pruneSeedStmt.run(Date.now(), collection, JSON.stringify(keys));
  return n;
});

const getCollStmt = db.prepare(`
  SELECT body FROM content_datasets
   WHERE collection = ? AND active = 1
   ORDER BY ord ASC, item_key ASC
`);
const countCollStmt = db.prepare(`SELECT COUNT(*) c FROM content_datasets WHERE collection = ? AND active = 1`);
const listCollsStmt = db.prepare(`SELECT collection, COUNT(*) c FROM content_datasets WHERE active = 1 GROUP BY collection ORDER BY collection`);

export function getCollection(collection) {
  return getCollStmt.all(collection).map(r => JSON.parse(r.body));
}
export function collectionCount(collection) {
  return countCollStmt.get(collection).c;
}

export function attachContent(router) {
  // FE đọc 1 collection (thay import file data).
  router.get('/api/content/:collection', (req, res) => {
    const items = getCollection(req.params.collection);
    res.json({ ok: true, collection: req.params.collection, items });
  });

  // Liệt kê collection + số item (admin/debug).
  router.get('/api/content', (_req, res) => {
    res.json({ ok: true, collections: listCollsStmt.all() });
  });

  // Admin sửa 1 item.
  router.put('/api/content/:collection/:key', requireAdmin, (req, res) => {
    const body = req.body?.body ?? req.body;
    upsertItem(req.params.collection, req.params.key, body, { source: 'admin', ord: Number(req.body?.ord) || 0 });
    res.json({ ok: true });
  });

  router.delete('/api/content/:collection/:key', requireAdmin, (req, res) => {
    const info = db.prepare(`UPDATE content_datasets SET active=0, updated_at=? WHERE collection=? AND item_key=?`)
      .run(Date.now(), req.params.collection, req.params.key);
    if (!info.changes) return res.status(404).json({ error: 'not_found' });
    res.json({ ok: true });
  });

  const total = listCollsStmt.all().reduce((s, r) => s + r.c, 0);
  console.log(`[content] routes mounted: /api/content/* (${total} item trong DB)`);
}

export const plugin = {
  name: 'content',
  mount(router) {
    attachContent(router);
  },
};
