// ============================================================
// Bản nháp sau mỗi lượt
// ============================================================
// Worker đăng ảnh chụp cổng 5 (trước/sau × 375/1280 px) → lưu như đính kèm FAB
// (/uploads/requests/<ngày>/…png) + 1 tin AI trong thread yêu cầu. Verdict xong
// → chuông cho người gửi. Lượt hỏng → nút "Thử cách khác" (lập plan mới), hỏng
// 2 lượt liền → chuyển quản trị viên.
// ============================================================
import fs from 'node:fs/promises';
import path from 'node:path';
import { randomBytes } from 'node:crypto';
import { WorkerContractError } from './store.js';

// Khớp ai-board/worker.py (SHOTS_TYPE, MAX_SHOT_BYTES, MAX_SHOTS).
export const SHOTS_TYPE = 'application/vnd.tizia.screenshots+json'; // tránh express.json 64kb chung
export const MAX_SHOT_BYTES = 2 * 1024 * 1024;
export const MAX_SHOTS = 8;
export const SHOTS_BODY_LIMIT = '24mb'; // 8 × 2 MB base64 + lề
export const DRAFT_AUTHOR = 'Ban điều hành AI · bản nháp';
export const HANDOFF_NOTE = 'Đã chuyển quản trị viên xem giúp.';
const PNG_SIGNATURE = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
const PASSING = new Set(['ready_for_pr', 'needs_review']);
// Lượt hỏng người gửi tự thử lại được. critical/budget/plan_blocked (rào an toàn) vẫn chỉ admin.
const RETRY_PHASES = new Set(['pre_pr_blocked', 'plan_unfit']);
export const MAX_FAILED_RUNS = 2;

/** base64 → Buffer PNG đã kiểm. Raise WorkerContractError 413/415/400. */
function decodePng(image) {
  const b64 = typeof image?.png_base64 === 'string' ? image.png_base64 : '';
  if (b64.length > Math.ceil(MAX_SHOT_BYTES / 3) * 4 + 4) throw new WorkerContractError('image too large', 413, 'image_too_large');
  const buf = Buffer.from(b64, 'base64');
  if (buf.length > MAX_SHOT_BYTES) throw new WorkerContractError('image too large', 413, 'image_too_large');
  if (buf.length <= PNG_SIGNATURE.length || !buf.subarray(0, 8).equals(PNG_SIGNATURE)) {
    throw new WorkerContractError('only PNG screenshots are accepted', 415, 'not_png');
  }
  return buf;
}

const label = (image) => {
  const page = String(image?.page || '').replace(/[^\w./?=&-]/g, '').slice(0, 80) || 'trang';
  const width = Number(image?.width) > 0 ? `${Math.round(Number(image.width))}px` : '';
  return [image?.phase === 'before' ? 'Trước' : 'Sau', width, page].filter(Boolean).join(' · ');
};

/** Lưu ảnh bản nháp của lượt runId + 1 tin AI trong thread. Lặp lại cùng run → trả tin cũ, không ghi thêm. */
export async function saveDraftScreenshots(store, ticketId, { workerId, leaseToken, runId, images, uploadsDir, now = Date.now() }) {
  const { db } = store;
  const root = store.assertLease(ticketId, workerId, leaseToken, now);
  const run = db.prepare('SELECT id FROM ai_runs WHERE id=? AND ticket_id=?').get(Number(runId), root.id);
  if (!run) throw new WorkerContractError('run does not belong to ticket');
  const idem = `draft-shots:${run.id}`;
  const prior = db.prepare('SELECT internal_detail FROM ai_events WHERE ticket_id=? AND idempotency_key=?').get(root.id, idem);
  if (prior) return { ...JSON.parse(prior.internal_detail), duplicate: true };
  if (!Array.isArray(images) || !images.length || images.length > MAX_SHOTS) {
    throw new WorkerContractError(`images must be 1–${MAX_SHOTS} PNG`, 400, 'invalid_screenshots');
  }
  const pngs = images.map(decodePng); // kiểm hết trước khi ghi file nào
  const day = new Date(now).toISOString().slice(0, 10);
  await fs.mkdir(path.join(uploadsDir, day), { recursive: true });
  const attachments = [];
  for (const [i, buf] of pngs.entries()) {
    const fname = `${now}-${randomBytes(6).toString('hex')}.png`;
    await fs.writeFile(path.join(uploadsDir, day, fname), buf);
    attachments.push({ url: `/uploads/requests/${day}/${fname}`, name: label(images[i]), mime: 'image/png',
      size: buf.length, kind: 'screenshot' });
  }
  return db.transaction(() => {
    const again = db.prepare('SELECT internal_detail FROM ai_events WHERE ticket_id=? AND idempotency_key=?').get(root.id, idem);
    if (again) return { ...JSON.parse(again.internal_detail), duplicate: true };
    const message = db.prepare(`
      INSERT INTO request_messages(request_id, role, author_name, body, attachments, created_at) VALUES (?, 'ai', ?, ?, ?, ?)
    `).run(root.source_request_id, DRAFT_AUTHOR,
      'Bản nháp sau lượt này (ảnh điện thoại 375px và máy tính 1280px; "Trước" là bản đang chạy).',
      JSON.stringify(attachments), now);
    db.prepare('UPDATE requests SET updated_at=? WHERE id=?').run(now, root.source_request_id);
    const out = { message_id: Number(message.lastInsertRowid), stored: attachments.length };
    db.prepare(`
      INSERT INTO ai_events(ticket_id, run_id, event_type, actor_type, actor_id, transition,
        public_message, internal_detail, idempotency_key, created_at)
      VALUES (?, ?, 'draft_screenshots', 'worker', ?, NULL, NULL, ?, ?, ?)
    `).run(root.id, run.id, workerId, JSON.stringify(out), idem, now);
    return out;
  })();
}

/** Số lượt hỏng liên tiếp gần nhất của root (tính từ lượt đạt cuối). */
export function failedRunStreak(db, rootId) {
  return db.prepare(`
    SELECT COUNT(*) AS n FROM ai_runs WHERE ticket_id=? AND outcome='blocked' AND id > COALESCE(
      (SELECT MAX(id) FROM ai_runs WHERE ticket_id=? AND outcome IN ('ready_for_pr', 'needs_review')), 0)
  `).get(Number(rootId), Number(rootId)).n;
}

/** Nút trên thẻ yêu cầu: 'retry' (Thử cách khác) | 'admin' (đã chuyển quản trị viên) | null. */
export function retryState(db, rootId, phase) {
  if (!rootId || !RETRY_PHASES.has(phase)) return null;
  return failedRunStreak(db, rootId) >= MAX_FAILED_RUNS ? 'admin' : 'retry';
}

/** Sau verdict: hỏng lượt thứ MAX_FAILED_RUNS → root chờ admin. Trả dữ liệu chuông (kind draft|retry|handoff|admin). */
export function afterVerdict(db, ticketId, verdict, now = Date.now()) {
  const root = db.prepare(`
    SELECT t.id, t.phase, r.id AS request_id, r.title, r.domain, r.student
    FROM ai_tickets t JOIN requests r ON r.id = t.source_request_id WHERE t.id=? AND t.parent_id IS NULL
  `).get(Number(ticketId));
  if (!root) return null;
  if (PASSING.has(verdict?.outcome)) return { ...root, kind: 'draft' };
  const state = retryState(db, root.id, root.phase);
  if (state === 'admin') {
    db.prepare(`UPDATE ai_tickets SET status='waiting_admin', public_note=?, updated_at=? WHERE id=?`)
      .run(HANDOFF_NOTE, now, root.id);
  }
  return { ...root, kind: state === 'retry' ? 'retry' : state === 'admin' ? 'handoff' : 'admin' };
}

/** Người gửi bấm "Thử cách khác": root hỏng của chính họ → hàng đợi, lập plan mới. */
export function retryRequest(store, requestId, ownerUserId, now = Date.now()) {
  const { db } = store;
  return db.transaction(() => {
    const row = db.prepare(`
      SELECT r.id, r.owner_user_id, t.id AS root_id, t.status, t.phase, t.lease_token, t.lease_expires_at
      FROM requests r JOIN ai_tickets t ON t.source_request_id = r.id AND t.parent_id IS NULL WHERE r.id=?
    `).get(Number(requestId));
    // Yêu cầu của người khác trông như không tồn tại.
    if (!row || row.owner_user_id !== Number(ownerUserId)) throw new WorkerContractError('request not found', 404, 'request_not_found');
    if (row.lease_token && row.lease_expires_at > now) {
      throw new WorkerContractError('AI Board is working on this request', 409, 'ticket_busy');
    }
    const state = row.status === 'cancelled' ? null : retryState(db, row.root_id, row.phase);
    if (state === 'admin') throw new WorkerContractError('handed to an admin after repeated failures', 409, 'admin_handoff');
    if (state !== 'retry' || !store.invalidatePlanForRequest(row.id, 'requester_retry')) {
      throw new WorkerContractError('request is not in a failed state', 409, 'not_retryable');
    }
    db.prepare('UPDATE ai_tickets SET public_note=? WHERE id=?').run('Ban sẽ thử một cách khác.', row.root_id);
    return { ok: true, status: 'queued' };
  })();
}

const NOTICES = {
  draft: ['🏛️ Bản nháp đã xong', (t) => `Ban vừa làm xong bản nháp của ${t} — xem ảnh`],
  retry: ['🏛️ Lượt này chưa làm được', (t) => `Ban chưa làm được ${t} ở lượt này. Bấm «Thử cách khác» để Ban lập kế hoạch mới.`],
  handoff: ['🏛️ Đã chuyển quản trị viên', (t) => `Ban đã thử 2 lượt chưa làm được ${t} — đã chuyển quản trị viên xem giúp.`],
  admin: ['🏛️ Lượt này chưa làm được', (t) => `Ban chưa làm được ${t}; quản trị viên sẽ xem giúp.`],
};

/** onVerdict cho worker routes: chuông cho người gửi, bấm vào mở thread yêu cầu trong FAB. */
export function draftNotifier(createNotification) {
  return ({ request_id: requestId, title, domain, student, kind }) => {
    const [heading, body] = NOTICES[kind] || NOTICES.admin;
    return createNotification({
      user_display_name: student, request_id: requestId, kind: 'reply', title: heading,
      body: body(`«${String(title).slice(0, 120)}»`),
      url: `/school.html?domain=${encodeURIComponent(domain)}#sgf-thread-${Number(requestId)}`,
    });
  };
}
