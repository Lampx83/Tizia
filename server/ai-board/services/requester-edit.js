// Requester edits a stopped request and sends it back for planning.
// The run is stopped (no live lease), so the new title/detail replace the old text, the clarified spec is
// dropped (it described the old request) and the root goes back to needs_replan. The thread keeps both the
// old and the new text, so the planner sees what changed.
import { WorkerContractError } from '../repositories/store-contract.js';

// Phases where nobody is working on the request: the requester may rewrite it and send it again.
export const EDITABLE_PHASES = new Set([
  'clarifying', 'partial', 'plan_blocked', 'precheck_blocked', 'budget_exhausted', 'plan_unfit',
  'transient_blocked', 'critical_violation',
]);

export async function editRequestAndReplan(db, requestId, { ownerUserId, title, detail, authorName = null }, now = Date.now()) {
  const row = await db.get(`
    SELECT r.id, r.owner_user_id, r.status, r.student, t.id AS root_id, t.status AS ticket_status, t.phase,
           t.lease_owner, t.lease_expires_at
    FROM requests r JOIN ai_tickets t ON t.source_request_id = r.id AND t.parent_id IS NULL
    WHERE r.id = ?
  `, [Number(requestId)]);
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
  await db.run('UPDATE requests SET title = ?, detail = ?, clarified_spec = NULL, updated_at = ? WHERE id = ?',
    [nextTitle, nextDetail, now, row.id]);
  await db.run(`INSERT INTO request_messages (request_id, role, author_name, body, attachments, created_at)
    VALUES (?, 'student', ?, ?, NULL, ?)`,
    [row.id, String(authorName || row.student || '').slice(0, 60), nextDetail, now]);
  await db.run(`UPDATE ai_tickets SET status = 'queued', phase = 'needs_replan', public_note = ?,
      lease_owner = NULL, lease_token = NULL, lease_expires_at = NULL, updated_at = ?
    WHERE id = ?`,
    ['Người gửi đã sửa yêu cầu; lập lại kế hoạch theo nội dung mới.', now, row.root_id]);
  await db.run(`INSERT INTO ai_events (ticket_id, event_type, actor_type, actor_id, transition,
      public_message, idempotency_key, created_at)
    VALUES (?, 'requester_edit', 'requester', ?, 'stopped->needs_replan', ?, ?, ?)`,
    [row.root_id, ownerUserId == null ? null : String(ownerUserId), 'Yêu cầu được sửa và gửi lại.',
      `requester-edit:${row.root_id}:${now}`, now]);
  return { ok: true, id: row.id, root_ticket_id: row.root_id, status: 'queued', phase: 'needs_replan' };
}
