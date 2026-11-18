CREATE TABLE ai_prompt_eval_receipts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  prompt_hash TEXT NOT NULL,
  baseline_hash TEXT NOT NULL,
  result_json TEXT NOT NULL,
  passed INTEGER NOT NULL CHECK(passed IN (0,1)),
  reasons TEXT NOT NULL DEFAULT '',
  recorded_by INTEGER NOT NULL REFERENCES users(id),
  created_at INTEGER NOT NULL
);
CREATE INDEX idx_ai_prompt_eval_receipts_version ON ai_prompt_eval_receipts(name,prompt_hash,id);
CREATE TABLE ai_prompt_label_refusals (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  label TEXT NOT NULL CHECK(label IN ('production','staging')),
  from_hash TEXT,
  to_hash TEXT NOT NULL,
  actor INTEGER NOT NULL REFERENCES users(id),
  reason TEXT NOT NULL,
  created_at INTEGER NOT NULL
);
