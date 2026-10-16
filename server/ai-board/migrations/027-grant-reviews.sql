CREATE TABLE ai_resource_grant_reviews (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  resource_id INTEGER NOT NULL REFERENCES ai_feature_resources(id),
  requested_by INTEGER NOT NULL REFERENCES users(id),
  user_id INTEGER NOT NULL REFERENCES users(id),
  owner_user_id INTEGER NOT NULL REFERENCES users(id),
  permission TEXT NOT NULL CHECK(permission IN ('read', 'write')),
  status TEXT NOT NULL DEFAULT 'pending' CHECK(status IN ('pending', 'approved', 'rejected')),
  decided_by INTEGER REFERENCES users(id),
  created_at INTEGER NOT NULL,
  decided_at INTEGER
);
CREATE INDEX idx_ai_grant_reviews_resource ON ai_resource_grant_reviews(resource_id, status);
