-- Online egress control: platform-approved operations, declarative UI + isolated backend script, safe audit trace.
CREATE TABLE ai_online_operations (
  feature_id INTEGER NOT NULL REFERENCES ai_feature_folders(id),
  operation TEXT NOT NULL,
  adapter TEXT NOT NULL,
  resource_id INTEGER NOT NULL REFERENCES ai_feature_resources(id),
  fields_json TEXT NOT NULL,
  response_fields_json TEXT NOT NULL,
  updated_by INTEGER NOT NULL,
  updated_at INTEGER NOT NULL,
  PRIMARY KEY(feature_id, operation)
);
CREATE TABLE ai_online_ui (
  feature_id INTEGER PRIMARY KEY REFERENCES ai_feature_folders(id),
  schema_json TEXT NOT NULL,
  backend_script TEXT,
  updated_by INTEGER NOT NULL,
  updated_at INTEGER NOT NULL
);
-- actor/operation/outcome only: never payloads, credentials, session tokens or URLs
CREATE TABLE ai_online_audit (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  feature_id INTEGER,
  actor_user_id INTEGER,
  operation TEXT,
  adapter TEXT,
  outcome TEXT NOT NULL,
  created_at INTEGER NOT NULL
);
CREATE INDEX ai_online_audit_created ON ai_online_audit(created_at);
