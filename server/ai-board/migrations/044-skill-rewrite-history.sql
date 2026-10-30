ALTER TABLE ai_skill_rewrites ADD COLUMN attempts INTEGER DEFAULT 0;
ALTER TABLE ai_skill_rewrites ADD COLUMN history_json TEXT;
CREATE TABLE ai_skill_rewrite_requests (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  version_id INTEGER NOT NULL REFERENCES ai_skill_versions(id),
  admin_id INTEGER NOT NULL REFERENCES users(id),
  created_at INTEGER NOT NULL
);
CREATE INDEX idx_ai_skill_rewrite_requests_version ON ai_skill_rewrite_requests(version_id,created_at);
CREATE INDEX idx_ai_skill_rewrite_requests_admin ON ai_skill_rewrite_requests(admin_id,created_at);
