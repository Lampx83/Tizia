CREATE TABLE ai_hsm_states (
  run_id INTEGER NOT NULL REFERENCES ai_runs(id),
  ticket_id INTEGER NOT NULL REFERENCES ai_tickets(id),
  attempt INTEGER NOT NULL,
  contract_hash TEXT NOT NULL,
  state TEXT NOT NULL,
  version INTEGER NOT NULL,
  plan_hash TEXT NOT NULL,
  result_json TEXT,
  updated_at INTEGER NOT NULL,
  PRIMARY KEY(run_id,attempt)
);
CREATE TABLE ai_hsm_events (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  ticket_id INTEGER NOT NULL REFERENCES ai_tickets(id),
  run_id INTEGER NOT NULL REFERENCES ai_runs(id),
  attempt INTEGER NOT NULL,
  worker_id TEXT NOT NULL,
  event TEXT NOT NULL,
  identity TEXT NOT NULL,
  input_hash TEXT NOT NULL,
  accepted INTEGER NOT NULL,
  reason TEXT,
  response_json TEXT NOT NULL,
  created_at INTEGER NOT NULL,
  UNIQUE(run_id,identity,input_hash)
);
CREATE INDEX idx_ai_hsm_states_ticket ON ai_hsm_states(ticket_id,run_id,attempt);
CREATE INDEX idx_ai_hsm_events_ticket ON ai_hsm_events(ticket_id,id);
