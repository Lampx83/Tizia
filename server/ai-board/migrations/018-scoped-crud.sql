-- Platform-owned record storage: feature code never chooses SQL/table names.
CREATE TABLE ai_feature_resources (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  feature_id INTEGER NOT NULL REFERENCES ai_feature_folders(id),
  name TEXT NOT NULL,
  fields_json TEXT NOT NULL,
  created_by INTEGER NOT NULL REFERENCES users(id),
  created_at INTEGER NOT NULL,
  UNIQUE(feature_id, name)
);
CREATE TABLE ai_resource_grants (
  resource_id INTEGER NOT NULL REFERENCES ai_feature_resources(id),
  user_id INTEGER NOT NULL REFERENCES users(id),
  owner_user_id INTEGER NOT NULL REFERENCES users(id),
  permission TEXT NOT NULL CHECK(permission IN ('read', 'write')),
  PRIMARY KEY(resource_id, user_id, owner_user_id)
);
CREATE TABLE ai_feature_records (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  resource_id INTEGER NOT NULL REFERENCES ai_feature_resources(id),
  owner_user_id INTEGER NOT NULL REFERENCES users(id),
  created_by INTEGER NOT NULL REFERENCES users(id),
  revision INTEGER NOT NULL DEFAULT 1,
  payload_json TEXT NOT NULL,
  deleted INTEGER NOT NULL DEFAULT 0 CHECK(deleted IN (0, 1)),
  updated_at INTEGER NOT NULL
);
CREATE INDEX ai_feature_records_scope ON ai_feature_records(resource_id, owner_user_id);
CREATE TABLE ai_record_revisions (
  record_id INTEGER NOT NULL REFERENCES ai_feature_records(id),
  revision INTEGER NOT NULL,
  actor_user_id INTEGER NOT NULL REFERENCES users(id),
  owner_user_id INTEGER NOT NULL REFERENCES users(id),
  operation TEXT NOT NULL,
  payload_json TEXT NOT NULL,
  deleted INTEGER NOT NULL,
  created_at INTEGER NOT NULL,
  PRIMARY KEY(record_id, revision)
);
CREATE TABLE ai_resource_audit (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  resource_id INTEGER NOT NULL REFERENCES ai_feature_resources(id),
  actor_user_id INTEGER NOT NULL REFERENCES users(id),
  operation TEXT NOT NULL,
  detail_json TEXT NOT NULL,
  created_at INTEGER NOT NULL
);
