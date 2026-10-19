CREATE TABLE IF NOT EXISTS ai_feature_release_events (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  folder_id INTEGER NOT NULL REFERENCES ai_feature_folders(id),
  previous_status TEXT NOT NULL,
  next_status TEXT NOT NULL,
  actor_id INTEGER NOT NULL REFERENCES users(id),
  created_at INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS ai_feature_incidents (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  folder_id INTEGER NOT NULL REFERENCES ai_feature_folders(id),
  kind TEXT NOT NULL CHECK(kind IN ('permission_breach','data_corruption','mandatory_health_failure')),
  evidence TEXT NOT NULL,
  opened_by INTEGER NOT NULL REFERENCES users(id),
  opened_at INTEGER NOT NULL,
  prior_release_status TEXT NOT NULL,
  prior_approved_by INTEGER REFERENCES users(id),
  prior_approved_at INTEGER,
  resolved_by INTEGER REFERENCES users(id),
  resolved_at INTEGER,
  resolution_evidence TEXT
);
CREATE UNIQUE INDEX IF NOT EXISTS ai_feature_one_open_incident ON ai_feature_incidents(folder_id) WHERE resolved_at IS NULL;
