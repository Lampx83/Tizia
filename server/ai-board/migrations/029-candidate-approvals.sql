CREATE TABLE ai_candidate_approvals (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  ticket_id INTEGER NOT NULL REFERENCES ai_tickets(id),
  run_id INTEGER NOT NULL REFERENCES ai_runs(id),
  base_sha TEXT NOT NULL,
  head_sha TEXT NOT NULL,
  scope_json TEXT NOT NULL,
  audience TEXT NOT NULL CHECK(audience IN ('owner_only', 'school')),
  decision TEXT NOT NULL CHECK(decision IN ('approved', 'rejected', 'served', 'withdrawn')),
  basis TEXT NOT NULL CHECK(basis IN ('admin', 'envelope')),
  reasons_json TEXT NOT NULL,
  actor_user_id INTEGER REFERENCES users(id),
  note TEXT,
  created_at INTEGER NOT NULL
);
CREATE INDEX idx_ai_candidate_approvals_ticket ON ai_candidate_approvals(ticket_id, id);
