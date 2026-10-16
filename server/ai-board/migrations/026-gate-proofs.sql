CREATE TABLE ai_gate_proofs (
  ticket_id INTEGER NOT NULL REFERENCES ai_tickets(id),
  gate INTEGER NOT NULL,
  run_id INTEGER,
  pins_json TEXT NOT NULL,
  result_json TEXT NOT NULL,
  result_digest TEXT NOT NULL,
  created_at INTEGER NOT NULL,
  PRIMARY KEY (ticket_id, gate)
);
