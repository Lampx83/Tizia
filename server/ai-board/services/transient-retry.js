// ============================================================
// Tự chạy lại yêu cầu bị chặn do lỗi hạ tầng thoáng qua (áp mọi loại yêu cầu, không riêng self)
// ============================================================
// Cổng eval (self) và cổng 5 (mọi loại) đều có thể trả verdict blocked, failure_class='transient' sau khi
// backoff gọi model (main.py MODEL_RETRY_BACKOFF_S) đã hết. submitPrePrVerdictTransaction (store.js) đọc công
// tắc này: bật → dời lease sang retry_after_ms, ticket tự về hàng đợi qua claimTransaction hiện có; tắt (mặc
// định) → status='waiting_admin', phase='transient_blocked', admin tự xem Grafana rồi bấm "Chạy lại ngay".
// ============================================================
import { LIMITS, WorkerContractError } from '../repositories/store.js';

const TR = LIMITS.transient_retry;

export function transientRetryState(db) {
  const row = db.prepare('SELECT enabled FROM ai_transient_retry_state WHERE id=1').get();
  return { enabled: row ? !!row.enabled : !!TR.enabled, retry_after_ms: TR.retry_after_ms };
}

export function setTransientRetryEnabled(db, enabled, adminUserId, now = Date.now()) {
  if (typeof enabled !== 'boolean') throw new WorkerContractError('enabled must be boolean');
  db.prepare(`INSERT INTO ai_transient_retry_state(id, enabled, updated_by, updated_at) VALUES (1, ?, ?, ?)
    ON CONFLICT(id) DO UPDATE SET enabled=excluded.enabled, updated_by=excluded.updated_by, updated_at=excluded.updated_at`)
    .run(enabled ? 1 : 0, adminUserId ?? null, now);
  return transientRetryState(db);
}

/** Danh sách ticket đang chờ admin vì transient_blocked (tab admin, mọi loại yêu cầu). */
export function listTransientBlocked(db, limit = 100) {
  return db.prepare(`
    SELECT t.id, t.source_request_id, r.title, r.type, r.domain, t.public_note, t.updated_at
    FROM ai_tickets t JOIN requests r ON r.id = t.source_request_id
    WHERE t.kind='root' AND t.status='waiting_admin' AND t.phase='transient_blocked'
    ORDER BY t.updated_at DESC LIMIT ?
  `).all(Math.min(Math.max(Number(limit) || 100, 1), 300));
}

/** Admin bấm "Chạy lại ngay": về hàng đợi ngay (phase='authorized', như 1 plan protected vừa được cho phép) —
 * claimTransaction (nhánh PLAN_QUEUE) nhận lại ở lượt poll tới, worker thực hiện lại từ cổng 3. */
export function retryTransientTicket(db, rootTicketId, now = Date.now()) {
  const root = db.prepare(`SELECT * FROM ai_tickets WHERE id=? AND kind='root'`).get(Number(rootTicketId));
  if (!root) throw new WorkerContractError('ticket not found', 404, 'ticket_not_found');
  if (root.status !== 'waiting_admin' || root.phase !== 'transient_blocked') {
    throw new WorkerContractError('ticket is not waiting on a transient block', 409, 'not_transient_blocked');
  }
  db.prepare(`UPDATE ai_tickets SET status='queued', phase='authorized',
      lease_owner=NULL, lease_token=NULL, lease_expires_at=NULL, updated_at=? WHERE id=?`)
    .run(now, root.id);
  return { ok: true, id: root.id, status: 'queued', phase: 'authorized' };
}
