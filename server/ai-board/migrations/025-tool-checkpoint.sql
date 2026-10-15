CREATE TABLE IF NOT EXISTS tool_run (
  proposal_id BIGINT NOT NULL,
  child INTEGER NOT NULL,
  pins_json TEXT NOT NULL,
  ledger_json TEXT,
  updated_at BIGINT NOT NULL,
  run_scope TEXT,
  PRIMARY KEY (proposal_id, child)
);
CREATE TABLE IF NOT EXISTS tool_step (
  proposal_id BIGINT NOT NULL,
  child INTEGER NOT NULL,
  step INTEGER NOT NULL,
  identity TEXT NOT NULL,
  tool TEXT NOT NULL,
  args_json TEXT NOT NULL,
  status TEXT NOT NULL,
  kind TEXT,
  observation TEXT,
  resolved_by TEXT,
  updated_at BIGINT NOT NULL,
  resolution_reason TEXT,
  resolution_evidence TEXT,
  resolved_at BIGINT,
  observation_digest TEXT,
  PRIMARY KEY (proposal_id, child, step)
);
ALTER TABLE tool_run ADD COLUMN IF NOT EXISTS run_scope TEXT;
ALTER TABLE tool_step ADD COLUMN IF NOT EXISTS resolution_reason TEXT;
ALTER TABLE tool_step ADD COLUMN IF NOT EXISTS resolution_evidence TEXT;
ALTER TABLE tool_step ADD COLUMN IF NOT EXISTS resolved_at BIGINT;
ALTER TABLE tool_step ADD COLUMN IF NOT EXISTS observation_digest TEXT;
