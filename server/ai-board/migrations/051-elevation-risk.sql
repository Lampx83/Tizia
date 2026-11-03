CREATE TABLE IF NOT EXISTS ai_elevation_risks (
  plan_hash    TEXT NOT NULL,
  scope_hash   TEXT NOT NULL,
  level        TEXT NOT NULL,
  payload_json TEXT NOT NULL,
  model        TEXT,
  created_at   BIGINT NOT NULL,
  PRIMARY KEY (plan_hash, scope_hash)
);
