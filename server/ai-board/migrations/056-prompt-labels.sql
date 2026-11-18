CREATE TABLE ai_prompt_versions (
  name TEXT NOT NULL,
  prompt_hash TEXT NOT NULL,
  content TEXT NOT NULL,
  reported_by TEXT NOT NULL,
  created_at INTEGER NOT NULL,
  PRIMARY KEY (name, prompt_hash)
);
CREATE TABLE ai_prompt_labels (
  name TEXT NOT NULL,
  label TEXT NOT NULL CHECK(label IN ('production','staging')),
  prompt_hash TEXT NOT NULL,
  updated_by INTEGER NOT NULL REFERENCES users(id),
  updated_at INTEGER NOT NULL,
  PRIMARY KEY (name, label)
);
CREATE TABLE ai_prompt_label_receipts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  label TEXT NOT NULL CHECK(label IN ('production','staging')),
  from_hash TEXT,
  to_hash TEXT NOT NULL,
  kind TEXT NOT NULL CHECK(kind IN ('set','rollback')),
  actor INTEGER NOT NULL REFERENCES users(id),
  reason TEXT NOT NULL DEFAULT '',
  created_at INTEGER NOT NULL
);
CREATE INDEX idx_ai_prompt_label_receipts_name ON ai_prompt_label_receipts(name,label,id);
