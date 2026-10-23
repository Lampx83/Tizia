// ============================================================
// AI Board — xem ảnh nháp đã lưu (admin)
// ============================================================
// Ảnh gom theo yêu cầu, lấy từ request_messages.attachments (kind:"screenshot").
// Chỉ trả URL qua proxy /uploads/requests (shotKey lọc); không bao giờ trả URL SeaweedFS.
// ============================================================
import { shotKey } from '../../ai-board/shot-storage.js';
import { asyncRoutes } from '../../ai-board/async-routes.js';

export const PAGE_SIZE = 10; // yêu cầu / trang
const SHOT_LIKE = '%"kind":"screenshot"%'; // JSON.stringify không có khoảng trắng

/** Attachments JSON → ảnh nháp hợp lệ. Bỏ qua JSON hỏng và URL lạ. */
export function parseShots(raw) {
  let list;
  try { list = JSON.parse(raw || '[]'); } catch { return []; }
  if (!Array.isArray(list)) return [];
  return list.filter((a) => a && a.kind === 'screenshot' && shotKey(a.url) !== null)
    .map((a) => ({ url: a.url, name: String(a.name || 'screenshot') }));
}

/** Hàng (request_id, title, created_at, attachments) → nhóm theo yêu cầu, giữ thứ tự hàng. */
export function groupShots(rows) {
  const groups = new Map();
  for (const row of rows) {
    const shots = parseShots(row.attachments).map((s) => ({ ...s, created_at: Number(row.created_at) }));
    if (!shots.length) continue;
    if (!groups.has(row.request_id)) groups.set(row.request_id, { request_id: Number(row.request_id), title: row.title, shots: [] });
    groups.get(row.request_id).shots.push(...shots);
  }
  return [...groups.values()];
}

/** Trang yêu cầu có ảnh, mới nhất trước. Trả { page, pages, total, groups }. */
export async function listShotGroups(db, page = 1) {
  const total = Number((await db.all(
    `SELECT COUNT(DISTINCT request_id) AS n FROM request_messages WHERE attachments LIKE ?`, [SHOT_LIKE]))[0]?.n || 0);
  const pages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const current = Math.min(Math.max(1, page), pages);
  const ids = (await db.all(
    `SELECT request_id, MAX(created_at) AS last FROM request_messages WHERE attachments LIKE ?
     GROUP BY request_id ORDER BY last DESC, request_id DESC LIMIT ? OFFSET ?`,
    [SHOT_LIKE, PAGE_SIZE, (current - 1) * PAGE_SIZE])).map((r) => Number(r.request_id));
  if (!ids.length) return { page: current, pages, total, groups: [] };
  const marks = ids.map(() => '?').join(',');
  const rows = await db.all(
    `SELECT m.request_id, r.title, m.attachments, m.created_at FROM request_messages m
     JOIN requests r ON r.id = m.request_id
     WHERE m.request_id IN (${marks}) AND m.attachments LIKE ?
     ORDER BY m.created_at DESC, m.id DESC`, [...ids, SHOT_LIKE]);
  const byId = new Map(groupShots(rows).map((g) => [g.request_id, g]));
  return { page: current, pages, total, groups: ids.map((id) => byId.get(id)).filter(Boolean) };
}

export function attachAiBoardShots(router, { db, requireAuth, requireAdmin }) {
  const route = asyncRoutes(router);
  route.get('/api/admin/ai-board/shots', requireAuth, requireAdmin, async (req, res) => {
    res.json(await listShotGroups(db, Number.parseInt(req.query.page, 10) || 1));
  });
}
