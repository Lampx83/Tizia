// SQL đối chiếu unknown write (tool_run/tool_step, ai_tickets, ai_events). Dùng trên handle db hoặc handle tx.
const OPEN = ['intent', 'unknown', 'compensate'];

export function createWriteReconcileRepository(db) {
  const tx = fn => db.tx(fn);
  return {
    tx,
    hasTables: () => db.get(`
      SELECT COUNT(*) AS n FROM information_schema.columns WHERE table_schema = current_schema()
        AND ((table_name = 'tool_run' AND column_name = 'run_scope') OR (table_name = 'tool_step' AND column_name = 'resolved_at'))
    `),
    rootTicket: (ticketId, lock = '') => db.get(`SELECT * FROM ai_tickets WHERE id=? AND kind='root'${lock}`, [ticketId]),
    listSteps: (scopeLike) => db.all(`
      SELECT s.identity, s.child, s.step, s.tool, s.args_json, s.status, s.resolved_by, s.resolution_reason,
             s.resolution_evidence, s.resolved_at, s.updated_at, r.run_scope
      FROM tool_step s JOIN tool_run r ON r.proposal_id = s.proposal_id AND r.child = s.child
      WHERE r.run_scope LIKE ? AND (s.status IN (${OPEN.map(() => '?').join(',')}) OR s.resolved_by IS NOT NULL)
      ORDER BY s.updated_at DESC, s.step
    `, [scopeLike, ...OPEN]),
    actorRole: (userId, lock) => db.get(`SELECT role FROM users WHERE id=?${lock}`, [userId]),
    lockedStep: (identity, scopeLike) => db.get(`
      SELECT s.child, s.step, s.status, s.tool FROM tool_step s
      JOIN tool_run r ON r.proposal_id = s.proposal_id AND r.child = s.child
      WHERE s.identity = ? AND r.run_scope LIKE ? FOR UPDATE OF s
    `, [identity, scopeLike]),
    resolveStep: ({ status, by, text, json, now, identity, from, scopeLike }) => db.run(`
      UPDATE tool_step SET status=?, resolved_by=?, resolution_reason=?, resolution_evidence=?, resolved_at=?, updated_at=?
      WHERE identity=? AND status IN (${from.map(() => '?').join(',')})
        AND (proposal_id, child) IN (SELECT proposal_id, child FROM tool_run WHERE run_scope LIKE ?)
    `, [status, by, text, json, now, now, identity, ...from, scopeLike]),
    insertReconcileEvent: ({ rootId, actorId, detail, key, now }) => db.run(`
      INSERT INTO ai_events(ticket_id, event_type, actor_type, actor_id, transition, public_message, internal_detail, idempotency_key, created_at)
      VALUES (?, 'unknown_write_reconciled', 'admin', ?, NULL, NULL, ?, ?, ?)
    `, [rootId, actorId, detail, key, now]),
    remainingOpen: (scopeLike) => db.get(`
      SELECT COUNT(*) AS n FROM tool_step s JOIN tool_run r ON r.proposal_id = s.proposal_id AND r.child = s.child
      WHERE r.run_scope LIKE ? AND s.status IN (${OPEN.map(() => '?').join(',')})
    `, [scopeLike, ...OPEN]),
    resumeRoot: (rootId, now) => db.run(`UPDATE ai_tickets SET status='queued', phase='authorized', lease_owner=NULL, lease_token=NULL,
        lease_expires_at=NULL, updated_at=? WHERE id=?`, [now, rootId]),
  };
}
