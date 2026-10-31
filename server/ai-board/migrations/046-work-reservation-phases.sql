CREATE TABLE ai_work_reservation_phases (
  root_ticket_id INTEGER NOT NULL,
  attempt_key TEXT NOT NULL,
  phase TEXT NOT NULL,
  PRIMARY KEY(root_ticket_id, attempt_key)
);
