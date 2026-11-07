// SQL "Tiếp tục" yêu cầu dừng giữa plan: đọc root của yêu cầu, đưa ticket về hàng đợi, ghi sự kiện.
export function createPartialResumeRepository(db) {
  return {
    rootForRequest: requestId => db.get(`
    SELECT r.id, r.owner_user_id, t.id AS root_id, t.status, t.phase
    FROM requests r JOIN ai_tickets t ON t.source_request_id = r.id AND t.parent_id IS NULL
    WHERE r.id = ?
  `, [requestId]),
    requeueRoot: (rootId, note, now) => db.run(`UPDATE ai_tickets SET status='queued', phase='authorized', public_note=?,
      lease_owner=NULL, lease_token=NULL, lease_expires_at=NULL, updated_at=? WHERE id=?`, [note, now, rootId]),
    insertContinueEvent: (rootId, actorId, note, key, now) => db.run(`INSERT INTO ai_events(ticket_id, event_type, actor_type, actor_id, transition,
      public_message, idempotency_key, created_at)
    VALUES (?, 'requester_continue', 'requester', ?, 'waiting_admin->queued', ?, ?, ?)`, [rootId, actorId, note, key, now]),
  };
}
