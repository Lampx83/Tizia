CREATE TABLE ai_request_appeals (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  request_id INTEGER NOT NULL REFERENCES requests(id),
  ticket_id INTEGER NOT NULL REFERENCES ai_tickets(id),
  owner_user_id INTEGER NOT NULL REFERENCES users(id),
  reason TEXT NOT NULL,
  proposed_title TEXT,
  proposed_detail TEXT,
  flags_json TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK(status IN ('pending', 'corrected', 'upheld')),
  version INTEGER NOT NULL DEFAULT 1,
  adjudicator_user_id INTEGER REFERENCES users(id),
  adjudication_reason TEXT,
  revision_request_id INTEGER REFERENCES requests(id),
  created_at INTEGER NOT NULL,
  decided_at INTEGER
);
CREATE UNIQUE INDEX ux_ai_request_appeals_open ON ai_request_appeals(request_id) WHERE status = 'pending';
CREATE INDEX idx_ai_request_appeals_owner ON ai_request_appeals(owner_user_id, id);
