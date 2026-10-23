CREATE TABLE ai_folder_decisions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  root_ticket_id INTEGER NOT NULL UNIQUE REFERENCES ai_tickets(id),
  folder_id INTEGER NOT NULL REFERENCES ai_feature_folders(id),
  request_id INTEGER NOT NULL REFERENCES requests(id),
  title TEXT NOT NULL,
  outcome TEXT NOT NULL CHECK (outcome IN ('done', 'blocked', 'cancelled')),
  stop_reason TEXT,
  spec TEXT,
  cut_json TEXT,
  subtasks_json TEXT NOT NULL,
  verdict_json TEXT,
  pr_url TEXT,
  created_at INTEGER NOT NULL,
  finished_at INTEGER NOT NULL
);
CREATE INDEX idx_ai_folder_decisions_folder ON ai_folder_decisions(folder_id, finished_at, id);
