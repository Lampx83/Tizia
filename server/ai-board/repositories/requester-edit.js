// SQL người gửi sửa yêu cầu đã dừng: đọc root, cập nhật requests/ai_tickets, thêm tin nhắn và sự kiện.
export function createRequesterEditRepository(db) {
  return {
    rootForRequest: requestId => db.get(`
    SELECT r.id, r.owner_user_id, r.status, r.student, t.id AS root_id, t.status AS ticket_status, t.phase,
           t.lease_owner, t.lease_expires_at
    FROM requests r JOIN ai_tickets t ON t.source_request_id = r.id AND t.parent_id IS NULL
    WHERE r.id = ?
  `, [requestId]),
    updateRequest: (requestId, title, detail, now) => db.run('UPDATE requests SET title = ?, detail = ?, clarified_spec = NULL, updated_at = ? WHERE id = ?',
      [title, detail, now, requestId]),
    insertStudentMessage: (requestId, author, body, now) => db.run(`INSERT INTO request_messages (request_id, role, author_name, body, attachments, created_at)
    VALUES (?, 'student', ?, ?, NULL, ?)`, [requestId, author, body, now]),
    replanRoot: (rootId, note, now) => db.run(`UPDATE ai_tickets SET status = 'queued', phase = 'needs_replan', public_note = ?,
      lease_owner = NULL, lease_token = NULL, lease_expires_at = NULL, updated_at = ?
    WHERE id = ?`, [note, now, rootId]),
    insertEditEvent: (rootId, actorId, note, key, now) => db.run(`INSERT INTO ai_events (ticket_id, event_type, actor_type, actor_id, transition,
      public_message, idempotency_key, created_at)
    VALUES (?, 'requester_edit', 'requester', ?, 'stopped->needs_replan', ?, ?, ?)`, [rootId, actorId, note, key, now]),
  };
}
