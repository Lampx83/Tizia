// SQL cho ai_request_appeals và sự kiện kháng nghị; quy tắc trạng thái nằm ở api/appeals.js.
export function createAppealRepository(db) {
  const many = (sql, args) => db.all(sql, args);
  const one = (sql, args) => db.get(sql, args);
  const exec = (sql, args) => db.run(sql, args);

  return {
    tx: fn => db.tx(fn),
    request: id => one('SELECT id, owner_user_id, title, detail, type, folder_id, owner_domain, status FROM requests WHERE id=?', [id]),
    requestFull: id => one('SELECT * FROM requests WHERE id=?', [id]),
    flagTags: ticketId => many('SELECT tag FROM ai_ticket_tags WHERE ticket_id=? ORDER BY tag', [ticketId]),
    rootTicket: requestId => one("SELECT id FROM ai_tickets WHERE source_request_id=? AND kind='root'", [requestId]),
    appealsOf: requestId => many('SELECT * FROM ai_request_appeals WHERE request_id=? ORDER BY id DESC', [requestId]),
    appealRow: id => one('SELECT * FROM ai_request_appeals WHERE id=?', [id]),
    insertAppeal: r => db.insert(`INSERT INTO ai_request_appeals(request_id, ticket_id, owner_user_id, reason, proposed_title, proposed_detail, flags_json, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`, [r.requestId, r.ticketId, r.ownerUserId, r.reason, r.proposedTitle, r.proposedDetail, r.flagsJson, Date.now()]),
    event: (ticketId, type, actor, detail, key) => exec(`INSERT INTO ai_events(ticket_id, event_type, actor_type, actor_id, transition, public_message, internal_detail, idempotency_key, created_at)
      VALUES (?, ?, ?, ?, NULL, NULL, ?, ?, ?) ON CONFLICT DO NOTHING`, [ticketId, type, actor.type, String(actor.id), JSON.stringify(detail), key, Date.now()]),
    listByStatus: status => many(`SELECT a.*, r.title AS request_title, r.detail AS request_detail FROM ai_request_appeals a JOIN requests r ON r.id=a.request_id
      WHERE a.status=? ORDER BY a.id DESC LIMIT 100`, [status]),
    decide: r => exec(`UPDATE ai_request_appeals SET status=?, version=version+1, adjudicator_user_id=?, adjudication_reason=?, revision_request_id=?, decided_at=?
      WHERE id=? AND version=? AND status='pending'`, [r.decision, r.adjudicatorId, r.reason, r.revisionId, Date.now(), r.id, r.version]),
  };
}
