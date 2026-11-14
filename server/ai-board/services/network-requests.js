// Hàng đợi yêu cầu mạng: run dừng ở waiting_admin/network_request, admin duyệt từng mục, hết mục chờ thì run về hàng đợi
// và resume từ checkpoint. Quyết định là cuối cùng (duyệt lại → 409). Broker thật nằm ngoài module này.
import { WorkerContractError } from '../repositories/store-contract.js';

const text = (value, max) => String(value ?? '').slice(0, max);

/** Ghi các mục chờ từ verdict; lặp lại cùng call_id thì bỏ qua. */
export async function recordPending(repo, rootId, requestId, report, now = Date.now()) {
  for (const { call_id, kind, reason, ...rest } of report?.pending ?? []) {
    await repo.insertPending({ rootId, requestId, call_id, kind, payload: JSON.stringify(rest), reason, now });
  }
}

const view = (row) => ({ id: row.id, call_id: row.call_id, kind: row.kind, ...JSON.parse(row.payload_json), reason: row.reason, status: row.status,
  decision_reason: row.decision_reason ?? null, decided_at: row.decided_at ?? null });

export async function listForRequest(repo, requestId, status = null) {
  if (!await repo.rootForRequest(Number(requestId))) throw new WorkerContractError('request not found', 404, 'request_not_found');
  return (await repo.list(Number(requestId), status)).map(view);
}

export async function pendingCounts(repo) {
  return Object.fromEntries((await repo.pendingByRequest()).map((row) => [row.request_id, Number(row.n)]));
}

/** Quyết định đã chốt của root, theo call_id: worker nạp vào Queue khi resume. */
export async function decisionsForRoot(repo, rootId) {
  return Object.fromEntries((await repo.decisions(Number(rootId))).map((row) => [row.call_id,
    { decision: row.status, ...(row.decision_reason ? { reason: row.decision_reason } : {}) }]));
}

/** Duyệt/từ chối 1 mục. 404 không có, 409 đã quyết. Mục chờ cuối cùng xong → root về hàng đợi. */
export async function decide(repo, id, { decision, reason = null, adminId, now = Date.now() }) {
  if (!['approved', 'rejected'].includes(decision)) throw new WorkerContractError('decision must be approved or rejected', 400, 'invalid_decision');
  return repo.tx(async () => {
    const row = await repo.get(Number(id));
    if (!row) throw new WorkerContractError('network request not found', 404, 'network_request_not_found');
    if (row.status !== 'pending') throw new WorkerContractError('network request already decided', 409, 'already_decided');
    const done = await repo.decide({ id: row.id, status: decision, adminId: String(adminId), reason: reason ? text(reason, 500) : null, now });
    if (!done.changes) throw new WorkerContractError('network request already decided', 409, 'already_decided');
    const left = Number((await repo.pendingCount(row.root_ticket_id)).n);
    let resumed = false;
    if (left === 0 && (await repo.requeueRoot(row.root_ticket_id, 'Quản trị viên đã quyết định các yêu cầu mạng; chạy tiếp từ checkpoint.', now)).changes) {
      resumed = true;
      await repo.insertEvent({ rootId: row.root_ticket_id, adminId: String(adminId), note: 'Đã quyết định hết yêu cầu mạng.', key: `network-decided:${row.root_ticket_id}:${now}`, now });
    }
    return { ok: true, id: row.id, status: decision, pending_left: left, resumed };
  });
}
