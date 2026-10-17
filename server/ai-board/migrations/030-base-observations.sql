CREATE TABLE ai_base_observations (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  ref TEXT NOT NULL,
  sha TEXT NOT NULL CHECK(length(sha) = 40),
  observed_at INTEGER NOT NULL
);
CREATE INDEX idx_ai_base_observations_ref ON ai_base_observations(ref, id);
