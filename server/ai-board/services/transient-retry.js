// ============================================================
// Tự chạy lại yêu cầu bị chặn do lỗi hạ tầng thoáng qua (áp mọi loại yêu cầu, không riêng self)
// ============================================================
// Cổng eval (self) và cổng 5 (mọi loại) đều có thể trả verdict blocked, failure_class='transient' sau khi
// backoff gọi model (main.py MODEL_RETRY_BACKOFF_S) đã hết. submitPrePrVerdictTransaction (store.js) đọc công
// tắc này: bật → dời lease sang retry_after_ms, ticket tự về hàng đợi qua claimTransaction hiện có; tắt (mặc
// định) → status='waiting_admin', phase='transient_blocked', admin tự xem Grafana rồi bấm "Chạy lại ngay".
// ============================================================
import { LIMITS, WorkerContractError } from '../repositories/store-contract.js';
import { createTransientRetryRepository } from '../repositories/transient-retry.js';

const TR = LIMITS.transient_retry;

export async function transientRetryState(repo) {
  const row = await repo.state();
  return { enabled: row ? !!row.enabled : !!TR.enabled, retry_after_ms: TR.retry_after_ms };
}

export async function setTransientRetryEnabled(repo, enabled, adminUserId, now = Date.now()) {
  if (typeof enabled !== 'boolean') throw new WorkerContractError('enabled must be boolean');
  await repo.upsertState(enabled ? 1 : 0, adminUserId ?? null, now);
  return await transientRetryState(repo);
}

/** Danh sách ticket đang chờ admin vì transient_blocked (tab admin, mọi loại yêu cầu). */
export async function listTransientBlocked(repo, limit = 100) {
  return await repo.blockedTickets(Math.min(Math.max(Number(limit) || 100, 1), 300));
}

/** Admin bấm "Chạy lại ngay": về hàng đợi ngay (phase='authorized', như 1 plan protected vừa được cho phép) —
 * claimTransaction (nhánh PLAN_QUEUE) nhận lại ở lượt poll tới, worker thực hiện lại từ cổng 3. */
export async function retryTransientTicket(repo, rootTicketId, now = Date.now()) {
  const root = await repo.rootTicket(Number(rootTicketId));
  if (!root) throw new WorkerContractError('ticket not found', 404, 'ticket_not_found');
  if (root.status !== 'waiting_admin' || root.phase !== 'transient_blocked') {
    throw new WorkerContractError('ticket is not waiting on a transient block', 409, 'not_transient_blocked');
  }
  await repo.requeueRoot(root.id, now);
  return { ok: true, id: root.id, status: 'queued', phase: 'authorized' };
}
