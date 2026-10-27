-- LF/106: ticket con giữ DAG của plan (depends_on = JSON mảng số thứ tự 1-based) và lớp db/backend/frontend/wiring.
ALTER TABLE ai_tickets ADD COLUMN layer TEXT;
ALTER TABLE ai_tickets ADD COLUMN depends_on TEXT;
