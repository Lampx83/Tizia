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

// active=1: item có mặt trong file seed thì phải hiện lại. Thiếu vế này, item từng
// bị pruneSeed tắt (vd biển báo/sa hình lọc ra khi chưa có ảnh) sẽ nằm im vĩnh viễn
// dù đã quay lại file gốc — seed chạy xong vẫn 0 câu, rất khó lần ra.
const upsertSeedStmt = db.prepare(`
  INSERT INTO content_datasets (collection, item_key, body, ord, source, active, updated_at)
  VALUES (@collection, @item_key, @body, @ord, 'seed', 1, @updated_at)
  ON CONFLICT(collection, item_key) DO UPDATE SET
    body=@body, ord=@ord, active=1, updated_at=@updated_at
  WHERE content_datasets.source <> 'admin'
`);
const upsertEditStmt = db.prepare(`
  INSERT INTO content_datasets (collection, item_key, body, ord, source, active, updated_at)
  VALUES (@collection, @item_key, @body, @ord, @source, @active, @updated_at)
  ON CONFLICT(collection, item_key) DO UPDATE SET
    body=@body, ord=@ord, source=@source, active=@active, updated_at=@updated_at
`);

export async function upsertItem(collection, item_key, body, { source = 'seed', ord = 0, active = 1 } = {}) {
  const row = { collection, item_key: String(item_key), body: JSON.stringify(body), ord, source, active, updated_at: Date.now() };
  if (source === 'seed') await upsertSeedStmt.run(row);
  else await upsertEditStmt.run(row);
  return { ok: true };
}

// Deactivate các item source='seed' không còn trong danh sách keep (giữ nguyên bản 'admin').
const pruneSeedStmt = db.prepare(`
  UPDATE content_datasets SET active = 0, updated_at = ?
   WHERE collection = ? AND source = 'seed' AND active = 1
     AND item_key NOT IN (SELECT jsonb_array_elements_text(?::jsonb))
`);

// Seed cả 1 collection từ mảng items. keyFn(item, i) → item_key (mặc định item.id || i).
// Sau khi upsert, deactivate các bản seed cũ không còn trong items (vd: tỉnh đã sáp nhập).
export const seedCollection = db.transaction(async (collection, items, keyFn) => {
  let n = 0;
  const keys = [];
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    const key = keyFn ? keyFn(item, i) : (item?.id ?? String(i));
    await upsertItem(collection, key, item, { source: 'seed', ord: i });
    keys.push(String(key));
    n++;
  }
  await pruneSeedStmt.run(Date.now(), collection, JSON.stringify(keys));
  return n;
});

const getCollStmt = db.prepare(`
  SELECT body FROM content_datasets
   WHERE collection = ? AND active = 1
   ORDER BY ord ASC, item_key ASC
`);
const countCollStmt = db.prepare(`SELECT COUNT(*) c FROM content_datasets WHERE collection = ? AND active = 1`);
const listCollsStmt = db.prepare(`SELECT collection, COUNT(*) c FROM content_datasets WHERE active = 1 GROUP BY collection ORDER BY collection`);

export async function getCollection(collection) {
  return (await getCollStmt.all(collection)).map(r => JSON.parse(r.body));
}
export async function collectionCount(collection) {
  return (await countCollStmt.get(collection)).c;
}

export async function attachContent(router) {
  // FE đọc 1 collection (thay import file data).
  router.get('/api/content/:collection', async (req, res) => {
    const items = await getCollection(req.params.collection);
    res.json({ ok: true, collection: req.params.collection, items });
  });

  // Liệt kê collection + số item (admin/debug).
  router.get('/api/content', async (_req, res) => {
    res.json({ ok: true, collections: await listCollsStmt.all() });
  });

  // Admin sửa 1 item.
  router.put('/api/content/:collection/:key', requireAdmin, async (req, res) => {
    const body = req.body?.body ?? req.body;
    await upsertItem(req.params.collection, req.params.key, body, { source: 'admin', ord: Number(req.body?.ord) || 0 });
    res.json({ ok: true });
  });

  // source='admin' để lần seed sau không bật lại item admin vừa tắt.
  router.delete('/api/content/:collection/:key', requireAdmin, async (req, res) => {
    const info = await db.prepare(`UPDATE content_datasets SET active=0, source='admin', updated_at=? WHERE collection=? AND item_key=?`)
      .run(Date.now(), req.params.collection, req.params.key);
    if (!info.changes) return res.status(404).json({ error: 'not_found' });
    res.json({ ok: true });
  });

  const total = (await listCollsStmt.all()).reduce((s, r) => s + r.c, 0);
  console.log(`[content] routes mounted: /api/content/* (${total} item trong DB)`);
}
