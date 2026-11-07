// Requester edits a stopped request and sends it back for planning.
// The run is stopped (no live lease), so the new title/detail replace the old text, the clarified spec is
// dropped (it described the old request) and the root goes back to needs_replan. The thread keeps both the
// old and the new text, so the planner sees what changed.
import { WorkerContractError } from '../repositories/store-contract.js';
import { createRequesterEditRepository } from '../repositories/requester-edit.js';

// Phases where nobody is working on the request: the requester may rewrite it and send it again.
export const EDITABLE_PHASES = new Set([
  'clarifying', 'partial', 'plan_blocked', 'precheck_blocked', 'budget_exhausted', 'root_allowance_exhausted', 'plan_unfit',
  'transient_blocked', 'critical_violation',
]);

export async function editRequestAndReplan(repo, requestId, { ownerUserId, title, detail, authorName = null }, now = Date.now()) {
  const row = await repo.rootForRequest(Number(requestId));
  if (!row) throw new WorkerContractError('request not found', 404, 'request_not_found');
  if (ownerUserId != null && Number(row.owner_user_id) !== Number(ownerUserId)) {
    throw new WorkerContractError('not your request', 403, 'not_owner');
  }
  const live = row.ticket_status === 'running' && !!row.lease_owner && Number(row.lease_expires_at) > now;
  if (live) throw new WorkerContractError('request is running; stop it before editing', 409, 'not_stopped');
  if (!EDITABLE_PHASES.has(row.phase)) {
    throw new WorkerContractError('request cannot be edited at this step', 409, 'not_editable');
  }
  const nextTitle = String(title || '').trim().slice(0, 200);
  const nextDetail = String(detail || '').slice(0, 10000);
  await repo.updateRequest(row.id, nextTitle, nextDetail, now);
  await repo.insertStudentMessage(row.id, String(authorName || row.student || '').slice(0, 60), nextDetail, now);
  await repo.replanRoot(row.root_id, 'Người gửi đã sửa yêu cầu; lập lại kế hoạch theo nội dung mới.', now);
  await repo.insertEditEvent(row.root_id, ownerUserId == null ? null : String(ownerUserId), 'Yêu cầu được sửa và gửi lại.',
    `requester-edit:${row.root_id}:${now}`, now);
  return { ok: true, id: row.id, root_ticket_id: row.root_id, status: 'queued', phase: 'needs_replan' };
}
