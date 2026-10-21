CREATE TABLE ai_skill_rewrites (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  version_id INTEGER NOT NULL UNIQUE REFERENCES ai_skill_versions(id),
  status TEXT NOT NULL DEFAULT 'queued' CHECK(status IN ('queued','running','succeeded','failed')),
  confirmed_by INTEGER NOT NULL REFERENCES users(id),
  confirmed_at INTEGER NOT NULL,
  claim_token TEXT,
  claimed_at INTEGER,
  finished_at INTEGER,
  model TEXT,
  raw_response TEXT,
  error TEXT,
  usage_json TEXT
);
CREATE INDEX idx_ai_skill_rewrites_status ON ai_skill_rewrites(status,id);
ALTER TABLE ai_skill_versions ADD COLUMN rewritten_hash TEXT;
ALTER TABLE ai_skill_versions ADD COLUMN rewrite_lint_json TEXT;
ALTER TABLE ai_skill_versions ADD COLUMN parent_version_id INTEGER REFERENCES ai_skill_versions(id);
ALTER TABLE ai_skill_versions ADD COLUMN rejected_by INTEGER REFERENCES users(id);
ALTER TABLE ai_skill_versions ADD COLUMN rejected_at INTEGER;
