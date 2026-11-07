// SQL công tắc tự chạy lại lỗi thoáng qua (ai_transient_retry_state) và ticket chờ admin vì transient_blocked.
export function createTransientRetryRepository(db) {
  return {
    state: () => db.get('SELECT enabled FROM ai_transient_retry_state WHERE id=1'),
    upsertState: (enabledInt, adminUserId, now) => db.run(`INSERT INTO ai_transient_retry_state(id, enabled, updated_by, updated_at) VALUES (1, ?, ?, ?)
    ON CONFLICT(id) DO UPDATE SET enabled=excluded.enabled, updated_by=excluded.updated_by, updated_at=excluded.updated_at`, [enabledInt, adminUserId, now]),
    blockedTickets: limit => db.all(`
    SELECT t.id, t.source_request_id, r.title, r.type, r.domain, t.public_note, t.updated_at
    FROM ai_tickets t JOIN requests r ON r.id = t.source_request_id
    WHERE t.kind='root' AND t.status='waiting_admin' AND t.phase='transient_blocked'
    ORDER BY t.updated_at DESC LIMIT ?
  `, [limit]),
    rootTicket: id => db.get(`SELECT * FROM ai_tickets WHERE id=? AND kind='root'`, [id]),
    requeueRoot: (rootId, now) => db.run(`UPDATE ai_tickets SET status='queued', phase='authorized',
      lease_owner=NULL, lease_token=NULL, lease_expires_at=NULL, updated_at=? WHERE id=?`, [now, rootId]),
  };
}
