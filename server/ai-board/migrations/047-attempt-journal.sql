CREATE TABLE ai_attempt_journal (
  id BIGSERIAL PRIMARY KEY,
  ticket_id BIGINT NOT NULL,
  run_id BIGINT NOT NULL,
  node TEXT NOT NULL,
  outcome TEXT NOT NULL,
  state_delta TEXT NOT NULL DEFAULT '{}',
  ledger TEXT NOT NULL DEFAULT '{}',
  created_at BIGINT NOT NULL,
  UNIQUE (ticket_id, run_id, node)
);
