CREATE TABLE ai_root_allowances (
  root_ticket_id INTEGER PRIMARY KEY REFERENCES ai_tickets(id),
  limits_json TEXT,
  blocked_reason TEXT,
  created_at INTEGER NOT NULL
);
INSERT INTO ai_root_allowances(root_ticket_id, blocked_reason, created_at)
  SELECT id, 'legacy_allowance_unknown', created_at FROM ai_tickets WHERE kind='root';
CREATE TABLE ai_work_reservations (
  root_ticket_id INTEGER NOT NULL REFERENCES ai_root_allowances(root_ticket_id),
  attempt_key TEXT NOT NULL,
  kind TEXT NOT NULL,
  provider TEXT,
  lease_hash TEXT NOT NULL,
  tokens_reserved INTEGER NOT NULL,
  tokens_used INTEGER,
  metrics_json TEXT,
  created_at INTEGER NOT NULL,
  settled_at INTEGER,
  PRIMARY KEY(root_ticket_id, attempt_key)
);
CREATE INDEX idx_ai_work_reservations_created ON ai_work_reservations(created_at);
