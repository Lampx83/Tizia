const KINDS = new Set(['package', 'fetch_url']);
const MAX_REQUESTS = 20;
const text = (value, max) => String(value ?? '').slice(0, max);

/** Làm sạch phần `network_requests` của verdict; bỏ mục sai hình dạng. */
export function cleanNetworkReport(raw) {
  if (!raw || typeof raw !== 'object') return null;
  const pending = (Array.isArray(raw.pending) ? raw.pending : []).filter((item) => item && KINDS.has(item.kind) && /^[A-Za-z0-9_.:@/-]{1,120}$/.test(String(item.call_id)))
    .slice(0, MAX_REQUESTS).map((item) => ({
      kind: item.kind, call_id: String(item.call_id), reason: text(item.reason, 500),
      ...(item.kind === 'package' ? { name: text(item.name, 214), version_range: text(item.version_range, 80) } : { url: text(item.url, 500) }),
    }));
  const autoDenied = Number.isInteger(raw.auto_denied) && raw.auto_denied > 0 ? raw.auto_denied : 0;
  return pending.length || autoDenied ? { pending, auto_denied: autoDenied } : null;
}

// SQL cho hàng đợi yêu cầu mạng của run (package/fetch_url); logic nằm ở services/network-requests.js.
export function createNetworkRequestRepository(db) {
  return {
    insertPending: ({ rootId, requestId, call_id, kind, payload, reason, now }) => db.run(`INSERT INTO ai_network_requests(root_ticket_id, request_id,
      call_id, kind, payload_json, reason, status, created_at) VALUES (?, ?, ?, ?, ?, ?, 'pending', ?)
      ON CONFLICT (root_ticket_id, call_id) DO NOTHING`, [rootId, requestId, call_id, kind, payload, reason, now]),
    rootForRequest: requestId => db.get(`SELECT r.id, t.id AS root_id, t.status, t.phase
      FROM requests r JOIN ai_tickets t ON t.source_request_id = r.id AND t.parent_id IS NULL WHERE r.id = ?`, [requestId]),
    rootForTicket: ticketId => db.get(`SELECT t.id AS root_id, t.source_request_id AS request_id FROM ai_tickets t
      WHERE t.id = ? AND t.parent_id IS NULL`, [ticketId]),
    list: (requestId, status) => db.all(`SELECT id, root_ticket_id, request_id, call_id, kind, payload_json, reason, status, decided_by,
      decision_reason, created_at, decided_at FROM ai_network_requests WHERE request_id = ?${status ? ' AND status = ?' : ''} ORDER BY id`,
    status ? [requestId, status] : [requestId]),
    get: id => db.get('SELECT * FROM ai_network_requests WHERE id = ?', [id]),
    decide: ({ id, status, adminId, reason, now }) => db.run(`UPDATE ai_network_requests SET status=?, decided_by=?, decision_reason=?, decided_at=?
      WHERE id=? AND status='pending'`, [status, adminId, reason, now, id]),
    pendingCount: rootId => db.get(`SELECT COUNT(*) AS n FROM ai_network_requests WHERE root_ticket_id = ? AND status = 'pending'`, [rootId]),
    pendingByRequest: () => db.all(`SELECT request_id, COUNT(*) AS n FROM ai_network_requests WHERE status = 'pending' GROUP BY request_id`, []),
    decisions: rootId => db.all(`SELECT call_id, status, decision_reason FROM ai_network_requests WHERE root_ticket_id = ? AND status <> 'pending'`, [rootId]),
    requeueRoot: (rootId, note, now) => db.run(`UPDATE ai_tickets SET status='queued', phase='authorized', public_note=?,
      lease_owner=NULL, lease_token=NULL, lease_expires_at=NULL, updated_at=? WHERE id=? AND status='waiting_admin' AND phase='network_request'`,
    [note, now, rootId]),
    insertEvent: ({ rootId, adminId, note, key, now }) => db.run(`INSERT INTO ai_events(ticket_id, event_type, actor_type, actor_id, transition,
      public_message, idempotency_key, created_at) VALUES (?, 'network_requests_decided', 'admin', ?, 'waiting_admin->queued', ?, ?, ?)`,
    [rootId, adminId, note, key, now]),
    tx: fn => db.tx(fn),
  };
}
