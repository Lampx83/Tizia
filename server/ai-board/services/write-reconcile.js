// Đối chiếu bước ghi chưa rõ (unknown write) của tool-loop: người có quyền chốt applied / not_applied / compensate.
// Bảng tool_run/tool_step do migration 025 tạo; worker Python ghi qua services/tool-checkpoint.js, không cần DB credential.
// Platform tự đối chiếu bằng dữ liệu đã lưu ở worker; ở đây chỉ phần còn lại cần người, mọi quyết định có audit.
import { WorkerContractError } from '../repositories/store-contract.js';
import { createWriteReconcileRepository } from '../repositories/write-reconcile.js';

const DECISIONS = { applied: 'applied', not_applied: 'void', compensate: 'compensate' };
const OPEN = ['intent', 'unknown', 'compensate'];
const IDENTITY = /^[0-9a-f]{32}$/;
const MAX_REASON = 2000;
const MAX_EVIDENCE = 8000;

const scopeLike = (ticketId) => `ticket-${Number(ticketId)}:%`;

// Worker cũ tạo bảng thiếu cột run_scope/resolved_at: coi như chưa có dữ liệu để đối chiếu.
const hasTables = async (repo) => Number((await repo.hasTables())?.n) === 2;

async function rootOrThrow(repo, ticketId, lock = '') {
  const root = Number.isInteger(Number(ticketId)) && await repo.rootTicket(Number(ticketId), lock);
  if (!root) throw new WorkerContractError('ticket not found', 404, 'ticket_not_found');
  return root;
}

const parseJson = (text) => { try { return JSON.parse(text); } catch { return null; } };

/** Bước ghi còn mở + bước đã chốt (kèm người/lý do/evidence) của ticket; rỗng khi worker chưa từng tạo bảng. */
export async function listUnknownWrites(repo, ticketId) {
  await rootOrThrow(repo, ticketId);
  if (!await hasTables(repo)) return { open: [], resolved: [] };
  const rows = await repo.listSteps(scopeLike(ticketId));
  const shape = (row) => ({
    identity: row.identity, child: row.child, step: row.step, tool: row.tool, status: row.status,
    args_preview: String(row.args_json || '').slice(0, 500), run_scope: row.run_scope, updated_at: row.updated_at,
    resolved_by: row.resolved_by, reason: row.resolution_reason, evidence: parseJson(row.resolution_evidence), resolved_at: row.resolved_at,
  });
  return { open: rows.filter((r) => OPEN.includes(r.status)).map(shape), resolved: rows.filter((r) => !OPEN.includes(r.status)).map(shape) };
}

function checkInput({ identity, decision, reason, evidence }) {
  if (!IDENTITY.test(String(identity))) throw new WorkerContractError('invalid step identity', 400, 'invalid_identity');
  if (!Object.hasOwn(DECISIONS, decision)) throw new WorkerContractError('decision must be applied | not_applied | compensate', 400, 'invalid_decision');
  const text = typeof reason === 'string' ? reason.trim() : '';
  if (!text || text.length > MAX_REASON) throw new WorkerContractError(`reason required (max ${MAX_REASON} chars)`, 400, 'reason_required');
  const filled = evidence && typeof evidence === 'object' ? Object.keys(evidence).length > 0 : typeof evidence === 'string' && evidence.trim() !== '';
  const json = filled ? JSON.stringify(evidence) : '';
  if (!filled || json.length > MAX_EVIDENCE) throw new WorkerContractError(`evidence required (max ${MAX_EVIDENCE} chars)`, 400, 'evidence_required');
  return { text, json };
}

/** Người có quyền hiện tại chốt 1 bước unknown; quyền đọc lại trong cùng transaction (revoke đang chạy chờ ta xong). */
export async function reconcileWrite(repo, { ticketId, identity, decision, reason, evidence, resume = false, user, now = Date.now() }) {
  const { text, json } = checkInput({ identity, decision, reason, evidence });
  return await repo.tx(async (t) => {
    const tx = createWriteReconcileRepository(t);
    const lock = t.lockRow;
    const actor = user?.id != null && await tx.actorRole(Number(user.id), lock);
    if (!actor || actor.role !== 'admin') throw new WorkerContractError('operator permission required', 403, 'not_authorized');
    const root = await rootOrThrow(tx, ticketId, lock);
    if (!await hasTables(tx)) throw new WorkerContractError('write not found', 404, 'unknown_write_not_found');
    const step = await tx.lockedStep(identity, scopeLike(ticketId));
    if (!step) throw new WorkerContractError('write not found for this ticket', 404, 'unknown_write_not_found');
    const from = decision === 'compensate' ? ['unknown'] : ['unknown', 'compensate'];
    if (!from.includes(step.status)) {
      throw new WorkerContractError(`step is ${step.status}, cannot become ${decision}`, 409, 'not_reconcilable');
    }
    const status = DECISIONS[decision];
    // keyed by identity: 60-bit proposal_id does not survive the Number bigint parser
    const changed = (await tx.resolveStep({ status, by: `admin:${user.id}`, text, json, now, identity, from, scopeLike: scopeLike(ticketId) })).changes;
    if (!changed) throw new WorkerContractError('step changed concurrently', 409, 'not_reconcilable');
    await tx.insertReconcileEvent({ rootId: root.id, actorId: String(user.id),
      detail: JSON.stringify({ identity, tool: step.tool, step: step.step, from: step.status, decision, status, reason: text, evidence }),
      key: `unknown-write:${identity}:${decision}`, now });
    const remaining = (await tx.remainingOpen(scopeLike(ticketId))).n;
    const resumable = remaining === 0 && root.status === 'waiting_admin' && root.phase === 'critical_violation';
    if (resume && resumable) {
      await tx.resumeRoot(root.id, now);
    }
    return { ok: true, identity, decision, status, remaining_open: Number(remaining), resumed: !!(resume && resumable) };
  });
}
