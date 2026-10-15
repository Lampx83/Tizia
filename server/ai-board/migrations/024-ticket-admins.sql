CREATE TABLE ai_ticket_admins (
  ticket_id INTEGER PRIMARY KEY REFERENCES ai_tickets(id),
  admin_user_id INTEGER NOT NULL,
  claimed_at INTEGER NOT NULL,
  last_admin_id INTEGER NOT NULL,
  last_action TEXT NOT NULL,
  last_action_at INTEGER NOT NULL
);
