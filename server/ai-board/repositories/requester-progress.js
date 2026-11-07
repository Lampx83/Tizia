// Đọc của người gửi: trạng thái yêu cầu + ticket gốc, và danh sách lượt chạy của ticket (chỉ đọc).
export function createRequesterProgressRepository(db) {
  return {
    requestRow: (requestId, ownerUserId) => db.get(`
      SELECT r.id, r.status, t.id AS root_id, t.status AS ticket_status, t.phase, t.public_note,
             t.lease_owner, t.lease_expires_at, t.cumulative_budget, t.budget_limit
      FROM requests r LEFT JOIN ai_tickets t ON t.source_request_id = r.id AND t.parent_id IS NULL
      WHERE r.id = ? AND r.owner_user_id = ?
    `, [requestId, ownerUserId]),
    runIds: async rootId => (await db.all('SELECT id FROM ai_runs WHERE ticket_id = ? ORDER BY created_at, id', [rootId])).map((r) => r.id),
  };
}
