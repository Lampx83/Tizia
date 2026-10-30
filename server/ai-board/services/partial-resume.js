// ============================================================
// "Tiếp tục" một yêu cầu đã xong một phần plan (LF/107)
// ============================================================
// Worker dừng giữa cổng 3 (hết ngân sách, GPU bận, một nhánh lỗi) → verdict blocked với
// failure_class='partial'; server để status='waiting_admin'/phase='partial' và GIỮ checkpoint
// (tool_run/tool_step theo ticket + plan_hash). Người gửi bấm "Tiếp tục" → về queued/authorized,
// claimTransaction nhận lại, worker chạy cổng 3 với đúng plan cũ nên checkpoint tự bỏ qua subtask đã xong.
// Không mở plan mới, không tính lượt hỏng, không đụng trần retry của "Thử cách khác".
// ============================================================
import { WorkerContractError } from '../repositories/store-contract.js';

/** Owner (hoặc admin) bấm tiếp tục; chỉ đúng yêu cầu đang chờ ở phase partial. */
export async function continuePartialRequest(db, requestId, ownerUserId, now = Date.now()) {
  const row = await db.get(`
    SELECT r.id, r.owner_user_id, t.id AS root_id, t.status, t.phase
    FROM requests r JOIN ai_tickets t ON t.source_request_id = r.id AND t.parent_id IS NULL
    WHERE r.id = ?
  `, [Number(requestId)]);
  if (!row) throw new WorkerContractError('request not found', 404, 'request_not_found');
  if (ownerUserId != null && Number(row.owner_user_id) !== Number(ownerUserId)) {
    throw new WorkerContractError('not your request', 403, 'not_owner');
  }
  if (row.status !== 'waiting_admin' || row.phase !== 'partial') {
    throw new WorkerContractError('request is not waiting to continue', 409, 'not_partial');
  }
  await db.run(`UPDATE ai_tickets SET status='queued', phase='authorized', public_note=?,
      lease_owner=NULL, lease_token=NULL, lease_expires_at=NULL, updated_at=? WHERE id=?`,
    ['Người gửi bấm tiếp tục; chạy nốt phần còn lại của kế hoạch.', now, row.root_id]);
  await db.run(`INSERT INTO ai_events(ticket_id, event_type, actor_type, actor_id, transition,
      public_message, idempotency_key, created_at)
    VALUES (?, 'requester_continue', 'requester', ?, 'waiting_admin->queued', ?, ?, ?)`,
    [row.root_id, ownerUserId == null ? null : String(ownerUserId),
      'Yêu cầu được chạy nốt phần còn lại.', `partial-continue:${row.root_id}:${now}`, now]);
  return { ok: true, id: row.id, root_ticket_id: row.root_id, status: 'queued', phase: 'authorized' };
}
