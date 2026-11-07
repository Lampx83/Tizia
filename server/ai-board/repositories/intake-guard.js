// SQL ghi cảnh báo từ chối nội dung và cờ human_review của guardrail nhận yêu cầu (ai_alerts, ai_events, ai_ticket_tags).
export function createIntakeGuardRepository(db) {
  return {
    tx: fn => db.tx(fn),
    insertRejectionAlert: (message, detail, now) => db.run(`INSERT INTO ai_alerts(severity, category, public_message, internal_detail, created_at, updated_at)
    VALUES ('high', 'intake_rejected', ?, ?, ?, ?)`, [message, detail, now, now]),
    insertFlagEvent: (rootTicketId, detail, key, now) => db.run(`
        INSERT INTO ai_events (
          ticket_id, event_type, actor_type, actor_id, transition,
          public_message, internal_detail, idempotency_key, created_at
        ) VALUES (?, 'intake_flagged', 'system', 'intake-guard', NULL, NULL, ?, ?, ?)
        ON CONFLICT DO NOTHING
      `, [rootTicketId, detail, key, now]),
    insertTag: (rootTicketId, name) => db.run('INSERT INTO ai_ticket_tags(ticket_id, tag) VALUES (?, ?) ON CONFLICT DO NOTHING', [rootTicketId, name]),
  };
}
