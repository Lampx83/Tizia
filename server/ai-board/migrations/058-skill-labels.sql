CREATE TABLE ai_skill_labels (
  skill_id INTEGER NOT NULL REFERENCES ai_skills(id),
  label TEXT NOT NULL CHECK(label IN ('staging')),
  version_id INTEGER NOT NULL REFERENCES ai_skill_versions(id),
  updated_by INTEGER NOT NULL REFERENCES users(id),
  updated_at INTEGER NOT NULL,
  PRIMARY KEY (skill_id, label)
);
CREATE TABLE ai_skill_label_receipts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  skill_id INTEGER NOT NULL REFERENCES ai_skills(id),
  label TEXT NOT NULL CHECK(label IN ('production','staging')),
  from_version_id INTEGER,
  to_version_id INTEGER NOT NULL REFERENCES ai_skill_versions(id),
  kind TEXT NOT NULL CHECK(kind IN ('set','rollback')),
  actor INTEGER NOT NULL REFERENCES users(id),
  reason TEXT NOT NULL DEFAULT '',
  created_at INTEGER NOT NULL
);
CREATE INDEX idx_ai_skill_label_receipts_skill ON ai_skill_label_receipts(skill_id,label,id);
