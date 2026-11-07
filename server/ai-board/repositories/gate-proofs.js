// SQL cho ai_gate_proofs và ai_events do cổng proof ghi; quy tắc pin/reuse nằm ở services/gate-proofs.js.
export function createGateProofRepository(db) {
  return {
    tx: fn => db.tx(fn),
    insertEvent: ({ ticketId, type, detail, key, now }) => db.run(`INSERT INTO ai_events(ticket_id, event_type, actor_type, actor_id, transition, public_message, internal_detail, idempotency_key, created_at)
      VALUES (?, ?, 'worker', NULL, NULL, NULL, ?, ?, ?)`, [ticketId, type, JSON.stringify(detail), key, now]),
    upsertProof: r => db.run(`INSERT INTO ai_gate_proofs(ticket_id, gate, run_id, pins_json, result_json, result_digest, created_at)
        VALUES (?, ?, ?, ?, ?, ?, ?)
        ON CONFLICT (ticket_id, gate) DO UPDATE SET run_id=EXCLUDED.run_id, pins_json=EXCLUDED.pins_json, result_json=EXCLUDED.result_json,
          result_digest=EXCLUDED.result_digest, created_at=EXCLUDED.created_at`,
      [r.ticketId, r.gate, r.runId, r.pinsJson, r.resultJson, r.digest, r.now]),
    proof: (ticketId, gate) => db.get('SELECT * FROM ai_gate_proofs WHERE ticket_id=? AND gate=?', [ticketId, gate]),
  };
}
