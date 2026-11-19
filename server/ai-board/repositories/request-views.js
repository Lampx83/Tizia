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
    /** ticket ids → Map(id → {tags: ['guard:*'], flagEvent}) cho thẻ quyết định của hàng đợi admin. */
    async guardFlags(ticketIds) {
      const ids = [...new Set(ticketIds.map(Number).filter(Number.isSafeInteger))];
      const out = new Map(ids.map((id) => [id, { tags: [], flagEvent: null }]));
      if (!ids.length) return out;
      const marks = ids.map(() => '?').join(',');
      for (const row of await store.queryAll(`SELECT ticket_id, tag FROM ai_ticket_tags WHERE tag LIKE 'guard:%' AND ticket_id IN (${marks})`, ids)) {
        out.get(Number(row.ticket_id))?.tags.push(row.tag);
      }
      for (const row of await store.queryAll(`SELECT ticket_id, internal_detail FROM ai_events WHERE event_type='intake_flagged' AND ticket_id IN (${marks})`, ids)) {
        const entry = out.get(Number(row.ticket_id));
        if (entry) entry.flagEvent = row.internal_detail;
      }
      return out;
    },
  };
}

/** Số tin của học viên từ mốc since: giới hạn tốc độ gửi tin. */
export const studentMessageCount = (db, since) => db.get("SELECT COUNT(*) AS n FROM request_messages WHERE role='student' AND created_at >= ?", [since]);
