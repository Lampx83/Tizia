CREATE TABLE ai_root_allowance_extensions (
  id SERIAL PRIMARY KEY,
  root_ticket_id INTEGER NOT NULL,
  group_name TEXT NOT NULL,
  from_limit INTEGER NOT NULL,
  to_limit INTEGER NOT NULL,
  admin_user_id INTEGER NOT NULL,
  reason TEXT NOT NULL,
  created_at INTEGER NOT NULL
);
CREATE INDEX idx_ai_root_allowance_extensions_root ON ai_root_allowance_extensions(root_ticket_id);
