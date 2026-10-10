// Đối chiếu bước ghi chưa rõ (unknown write) của tool-loop: người có quyền chốt applied / not_applied / compensate.
// Bảng tool_run/tool_step do worker Python sở hữu (ai-board/harness/repositories/tool_steps.py); cùng DATABASE_URL.
// Platform tự đối chiếu bằng dữ liệu đã lưu ở worker; ở đây chỉ phần còn lại cần người, mọi quyết định có audit.
import { WorkerContractError } from '../repositories/store-contract.js';

const DECISIONS = { applied: 'applied', not_applied: 'void', compensate: 'compensate' };
const OPEN = ['intent', 'unknown', 'compensate'];
const IDENTITY = /^[0-9a-f]{32}$/;
const MAX_REASON = 2000;
const MAX_EVIDENCE = 8000;

const scopeLike = (ticketId) => `ticket-${Number(ticketId)}:%`;

// Worker cũ tạo bảng thiếu cột run_scope/resolved_at: coi như chưa có dữ liệu để đối chiếu.
const hasTables = async (db) => {
  const row = await db.get(`
    SELECT COUNT(*) AS n FROM information_schema.columns WHERE table_schema = current_schema()
      AND ((table_name = 'tool_run' AND column_name = 'run_scope') OR (table_name = 'tool_step' AND column_name = 'resolved_at'))
  `);
  return Number(row?.n) === 2;
};

async function rootOrThrow(db, ticketId, lock = '') {
  const root = Number.isInteger(Number(ticketId)) && await db.get(`SELECT * FROM ai_tickets WHERE id=? AND kind='root'${lock}`, [Number(ticketId)]);
  if (!root) throw new WorkerContractError('ticket not found', 404, 'ticket_not_found');
  return root;
}

const parseJson = (text) => { try { return JSON.parse(text); } catch { return null; } };

/** Bước ghi còn mở + bước đã chốt (kèm người/lý do/evidence) của ticket; rỗng khi worker chưa từng tạo bảng. */
export async function listUnknownWrites(db, ticketId) {
  await rootOrThrow(db, ticketId);
  if (!await hasTables(db)) return { open: [], resolved: [] };
  const rows = await db.all(`
    SELECT s.identity, s.child, s.step, s.tool, s.args_json, s.status, s.resolved_by, s.resolution_reason,
           s.resolution_evidence, s.resolved_at, s.updated_at, r.run_scope
    FROM tool_step s JOIN tool_run r ON r.proposal_id = s.proposal_id AND r.child = s.child
    WHERE r.run_scope LIKE ? AND (s.status IN (${OPEN.map(() => '?').join(',')}) OR s.resolved_by IS NOT NULL)
    ORDER BY s.updated_at DESC, s.step
  `, [scopeLike(ticketId), ...OPEN]);
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
export async function reconcileWrite(db, { ticketId, identity, decision, reason, evidence, resume = false, user, now = Date.now() }) {
  const { text, json } = checkInput({ identity, decision, reason, evidence });
  return await db.tx(async (t) => {
    const actor = user?.id != null && await t.get(`SELECT role FROM users WHERE id=?${t.lockRow}`, [Number(user.id)]);
    if (!actor || actor.role !== 'admin') throw new WorkerContractError('operator permission required', 403, 'not_authorized');
    const root = await rootOrThrow(t, ticketId, t.lockRow);
    if (!await hasTables(t)) throw new WorkerContractError('write not found', 404, 'unknown_write_not_found');
    const step = await t.get(`
      SELECT s.proposal_id, s.child, s.step, s.status, s.tool FROM tool_step s
      JOIN tool_run r ON r.proposal_id = s.proposal_id AND r.child = s.child
      WHERE s.identity = ? AND r.run_scope LIKE ? FOR UPDATE OF s
    `, [identity, scopeLike(ticketId)]);
    if (!step) throw new WorkerContractError('write not found for this ticket', 404, 'unknown_write_not_found');
    const from = decision === 'compensate' ? ['unknown'] : ['unknown', 'compensate'];
    if (!from.includes(step.status)) {
      throw new WorkerContractError(`step is ${step.status}, cannot become ${decision}`, 409, 'not_reconcilable');
    }
    const status = DECISIONS[decision];
    const changed = (await t.run(`
      UPDATE tool_step SET status=?, resolved_by=?, resolution_reason=?, resolution_evidence=?, resolved_at=?, updated_at=?
      WHERE proposal_id=? AND child=? AND step=? AND status IN (${from.map(() => '?').join(',')})
    `, [status, `admin:${user.id}`, text, json, now, now, step.proposal_id, step.child, step.step, ...from])).changes;
    if (!changed) throw new WorkerContractError('step changed concurrently', 409, 'not_reconcilable');
    await t.run(`
      INSERT INTO ai_events(ticket_id, event_type, actor_type, actor_id, transition, public_message, internal_detail, idempotency_key, created_at)
      VALUES (?, 'unknown_write_reconciled', 'admin', ?, NULL, NULL, ?, ?, ?)
    `, [root.id, String(user.id), JSON.stringify({ identity, tool: step.tool, step: step.step, from: step.status, decision, status, reason: text, evidence }),
      `unknown-write:${identity}:${decision}`, now]);
    const remaining = (await t.get(`
      SELECT COUNT(*) AS n FROM tool_step s JOIN tool_run r ON r.proposal_id = s.proposal_id AND r.child = s.child
      WHERE r.run_scope LIKE ? AND s.status IN (${OPEN.map(() => '?').join(',')})
    `, [scopeLike(ticketId), ...OPEN])).n;
    const resumable = remaining === 0 && root.status === 'waiting_admin' && root.phase === 'critical_violation';
    if (resume && resumable) {
      await t.run(`UPDATE ai_tickets SET status='queued', phase='authorized', lease_owner=NULL, lease_token=NULL,
        lease_expires_at=NULL, updated_at=? WHERE id=?`, [now, root.id]);
    }
    return { ok: true, identity, decision, status, remaining_open: Number(remaining), resumed: !!(resume && resumable) };
  });
}
