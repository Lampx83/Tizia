CREATE TABLE ai_resource_rate (
  feature_id INTEGER NOT NULL REFERENCES ai_feature_folders(id),
  actor_id INTEGER NOT NULL REFERENCES users(id),
  window_ms INTEGER NOT NULL,
  requests_count INTEGER NOT NULL,
  PRIMARY KEY(feature_id, actor_id, window_ms)
);
CREATE INDEX idx_ai_resource_rate_window ON ai_resource_rate(window_ms);
