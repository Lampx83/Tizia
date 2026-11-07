// SQL bản nháp sau lượt: ảnh chụp (request_messages, ai_events), chuỗi lượt hỏng (ai_runs), root cho thông báo và thử lại.
export function createDraftRepository(db) {
  return {
    tx: fn => db.tx(fn),
    runInTicket: (runId, rootId) => db.get('SELECT id FROM ai_runs WHERE id=? AND ticket_id=?', [runId, rootId]),
    draftEvent: (rootId, idem) => db.get('SELECT internal_detail FROM ai_events WHERE ticket_id=? AND idempotency_key=?', [rootId, idem]),
    insertDraftMessage: (requestId, author, body, attachments, now) => db.insert(`
      INSERT INTO request_messages(request_id, role, author_name, body, attachments, created_at) VALUES (?, 'ai', ?, ?, ?, ?)
    `, [requestId, author, body, attachments, now]),
    touchRequest: (requestId, now) => db.run('UPDATE requests SET updated_at=? WHERE id=?', [now, requestId]),
    insertDraftEvent: (r) => db.run(`
      INSERT INTO ai_events(ticket_id, run_id, event_type, actor_type, actor_id, transition,
        public_message, internal_detail, idempotency_key, created_at)
      VALUES (?, ?, 'draft_screenshots', 'worker', ?, NULL, NULL, ?, ?, ?)
    `, [r.rootId, r.runId, r.workerId, r.detail, r.idem, r.now]),
    failedRunCount: (rootId) => {
      const failureClass = db.jsonText('evidence_json', 'verdict.failure_class');
      return db.get(`
        SELECT COUNT(*) AS n FROM ai_runs WHERE ticket_id=? AND outcome='blocked'
          AND COALESCE(${failureClass}, 'ordinary') <> 'partial' AND id > COALESCE(
          (SELECT MAX(id) FROM ai_runs WHERE ticket_id=? AND outcome IN ('ready_for_pr', 'needs_review')), 0)
      `, [rootId, rootId]);
    },
    rootForTicket: ticketId => db.get(`
      SELECT t.id, t.phase, r.id AS request_id, r.title, r.domain, r.student
      FROM ai_tickets t JOIN requests r ON r.id = t.source_request_id WHERE t.id=? AND t.parent_id IS NULL
    `, [ticketId]),
    markWaitingAdmin: (rootId, note, now) => db.run(`UPDATE ai_tickets SET status='waiting_admin', public_note=?, updated_at=? WHERE id=?`, [note, now, rootId]),
    requestRoot: requestId => db.get(`
      SELECT r.id, r.owner_user_id, t.id AS root_id, t.status, t.phase, t.lease_token, t.lease_expires_at
      FROM requests r JOIN ai_tickets t ON t.source_request_id = r.id AND t.parent_id IS NULL WHERE r.id=?
    `, [requestId]),
    setRootNote: (rootId, note) => db.run('UPDATE ai_tickets SET public_note=? WHERE id=?', [note, rootId]),
  };
}
