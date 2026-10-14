CREATE TABLE ai_lessons (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  ticket_id INTEGER REFERENCES ai_tickets(id),
  run_id INTEGER REFERENCES ai_runs(id),
  owner_user_id INTEGER NOT NULL REFERENCES users(id),
  domain TEXT NOT NULL,
  folder_id INTEGER REFERENCES ai_feature_folders(id),
  repository TEXT NOT NULL DEFAULT 'Tizia',
  ingestion_key TEXT NOT NULL,
  input_hash TEXT NOT NULL,
  kind TEXT NOT NULL CHECK(kind IN ('observation','proposed','legacy')),
  state TEXT NOT NULL CHECK(state IN ('proposed','verified','curated','legacy','rejected','expired','superseded','deleted')),
  visibility TEXT NOT NULL DEFAULT 'private' CHECK(visibility IN ('private','repository')),
  version INTEGER NOT NULL DEFAULT 1,
  payload_json TEXT NOT NULL,
  evidence_trace_id INTEGER,
  evidence_hash TEXT,
  plan_hash TEXT,
  dependencies_json TEXT NOT NULL DEFAULT '{}',
  created_at INTEGER NOT NULL,
  verified_at INTEGER,
  review_due_at INTEGER,
  ended_at INTEGER,
  source_expires_at INTEGER,
  import_batch TEXT,
  UNIQUE(ticket_id, ingestion_key)
);
CREATE INDEX idx_ai_lessons_scope ON ai_lessons(domain, owner_user_id, folder_id, state);
CREATE TABLE ai_lesson_audit (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  lesson_id INTEGER NOT NULL,
  version INTEGER NOT NULL,
  operation TEXT NOT NULL,
  actor_user_id INTEGER REFERENCES users(id),
  created_at INTEGER NOT NULL,
  ended_at INTEGER
);
CREATE TABLE ai_lesson_imports (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  batch_key TEXT NOT NULL,
  entry_key TEXT NOT NULL,
  input_hash TEXT NOT NULL,
  actor_user_id INTEGER NOT NULL REFERENCES users(id),
  lesson_id INTEGER REFERENCES ai_lessons(id) ON DELETE SET NULL,
  disposition TEXT NOT NULL,
  created_at INTEGER NOT NULL,
  ended_at INTEGER,
  UNIQUE(actor_user_id, batch_key, entry_key)
);
CREATE TABLE ai_lesson_tombstones (
  identity_hash TEXT PRIMARY KEY,
  expires_at INTEGER NOT NULL
);
