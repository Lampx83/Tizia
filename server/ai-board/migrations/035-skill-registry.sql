CREATE TABLE ai_skills (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL UNIQUE,
  task_types_json TEXT NOT NULL,
  source TEXT NOT NULL DEFAULT 'admin' CHECK(source='admin'),
  status TEXT NOT NULL DEFAULT 'draft' CHECK(status IN ('draft','approved','disabled')),
  active_version_id INTEGER,
  created_by INTEGER NOT NULL REFERENCES users(id),
  updated_by INTEGER NOT NULL REFERENCES users(id),
  created_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL,
  CHECK(status<>'approved' OR active_version_id IS NOT NULL)
);
CREATE TABLE ai_skill_versions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  skill_id INTEGER NOT NULL REFERENCES ai_skills(id),
  version INTEGER NOT NULL,
  task_types_json TEXT NOT NULL,
  original_text TEXT NOT NULL,
  rewritten_text TEXT,
  hash TEXT NOT NULL,
  token_count INTEGER NOT NULL,
  token_method TEXT NOT NULL DEFAULT 'utf8_upper_bound',
  lint_json TEXT NOT NULL,
  eval_json TEXT,
  approved_by INTEGER REFERENCES users(id),
  approved_at INTEGER,
  created_by INTEGER NOT NULL REFERENCES users(id),
  created_at INTEGER NOT NULL,
  UNIQUE(skill_id,version)
);
CREATE INDEX idx_ai_skill_versions_skill ON ai_skill_versions(skill_id,version);
