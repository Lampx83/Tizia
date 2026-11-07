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
import { createPartialResumeRepository } from '../repositories/partial-resume.js';

/** Owner (hoặc admin) bấm tiếp tục; chỉ đúng yêu cầu đang chờ ở phase partial. */
export async function continuePartialRequest(repo, requestId, ownerUserId, now = Date.now()) {
  const row = await repo.rootForRequest(Number(requestId));
  if (!row) throw new WorkerContractError('request not found', 404, 'request_not_found');
  if (ownerUserId != null && Number(row.owner_user_id) !== Number(ownerUserId)) {
    throw new WorkerContractError('not your request', 403, 'not_owner');
  }
  if (row.status !== 'waiting_admin' || row.phase !== 'partial') {
    throw new WorkerContractError('request is not waiting to continue', 409, 'not_partial');
  }
  await repo.requeueRoot(row.root_id, 'Người gửi bấm tiếp tục; chạy nốt phần còn lại của kế hoạch.', now);
  await repo.insertContinueEvent(row.root_id, ownerUserId == null ? null : String(ownerUserId),
    'Yêu cầu được chạy nốt phần còn lại.', `partial-continue:${row.root_id}:${now}`, now);
  return { ok: true, id: row.id, root_ticket_id: row.root_id, status: 'queued', phase: 'authorized' };
}
