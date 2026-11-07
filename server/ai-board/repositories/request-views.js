// Đọc cho màn hình admin/người gửi và đếm rate-limit trên store.queryGet/queryAll (SQL giữ nguyên từ api/routes.js).
export function createRequestViewRepository(store) {
  return {
    recentRequestCount: windowStart => store.queryGet('SELECT COUNT(*) AS n FROM requests WHERE created_at >= ?', [windowStart]),
    ticketPhase: rootTicketId => store.queryGet('SELECT phase FROM ai_tickets WHERE id=?', [rootTicketId]),
    intakeRejections: () => store.queryAll(`SELECT id, created_at, public_message, internal_detail FROM ai_alerts
        WHERE category='intake_rejected' ORDER BY id DESC LIMIT 50`),
    requestDetail: requestId => store.queryGet(`SELECT id, domain, type, title, status, student, detail, attachments, created_at, updated_at
      FROM requests WHERE id=?`, [requestId]),
    requestMessages: requestId => store.queryAll(`SELECT id, role, author_name, body, attachments, created_at
      FROM request_messages WHERE request_id=? ORDER BY created_at, id`, [requestId]),
    ticketSourceRequest: ticketId => store.queryGet('SELECT source_request_id FROM ai_tickets WHERE id=? AND parent_id IS NULL', [ticketId]),
  };
}

/** Số tin của học viên từ mốc since: giới hạn tốc độ gửi tin. */
export const studentMessageCount = (db, since) => db.get("SELECT COUNT(*) AS n FROM request_messages WHERE role='student' AND created_at >= ?", [since]);
