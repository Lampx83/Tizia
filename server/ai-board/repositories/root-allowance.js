// SQL của root allowance và ledger reservation (move-only: câu lệnh giữ nguyên từ services/root-allowance.js).
export function createRootAllowanceRepository(db) {
  return {
    tx: fn => db.tx(fn),
    ticketPlanHash: root => db.get('SELECT plan_hash FROM ai_tickets WHERE id=?', [root]),
    latestPlan: (root, planHash) => db.get('SELECT plan_json FROM ai_plans WHERE root_ticket_id=? AND plan_hash=? ORDER BY revision DESC LIMIT 1', [root, planHash]),
    allowanceRow: root => db.get('SELECT * FROM ai_root_allowances WHERE root_ticket_id=?', [root]),
    reservations: root => db.all(`SELECT r.*, p.phase AS bucket FROM ai_work_reservations r
    LEFT JOIN ai_work_reservation_phases p ON p.root_ticket_id=r.root_ticket_id AND p.attempt_key=r.attempt_key
    WHERE r.root_ticket_id=? ORDER BY r.created_at, r.attempt_key`, [root]),
    insertLegacyAllowance: (rootId, now) => db.run(`INSERT INTO ai_root_allowances(root_ticket_id, limits_json, blocked_reason, created_at)
        SELECT ?, ?, CASE WHEN EXISTS(SELECT 1 FROM ai_gate_traces g JOIN ai_runs r ON r.id=g.run_id
          WHERE r.ticket_id=? AND g.status='model_call') THEN 'legacy_allowance_unknown' ELSE NULL END, ? ON CONFLICT DO NOTHING`,
      [rootId, null, rootId, now]),
    admissionLock: () => db.get('SELECT pg_advisory_xact_lock(hashtext(current_schema()),7000103)'),
    priorAttempt: (root, key) => db.get('SELECT * FROM ai_work_reservations WHERE root_ticket_id=? AND attempt_key=?', [root, key]),
    insertReservation: (root, key, kind, provider, leaseHash, tokens, now) => db.run(`INSERT INTO ai_work_reservations(root_ticket_id, attempt_key, kind, provider, lease_hash, tokens_reserved, created_at)
          VALUES (?, ?, ?, ?, ?, ?, ?)`, [root, key, kind, provider, leaseHash, tokens, now]),
    insertPhase: (root, key, bucket) => db.run('INSERT INTO ai_work_reservation_phases(root_ticket_id, attempt_key, phase) VALUES (?, ?, ?)', [root, key, bucket]),
    settleReservation: (root, key, tokens, encoded, now) => db.run(`UPDATE ai_work_reservations SET tokens_used=?, metrics_json=?, settled_at=? WHERE root_ticket_id=? AND attempt_key=?`,
      [tokens, encoded, now, root, key]),
    markTokenViolation: root => db.run("UPDATE ai_root_allowances SET blocked_reason='model_token_bound_violation' WHERE root_ticket_id=?", [root]),
  };
}
