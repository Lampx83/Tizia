-- Onboarding của người gửi yêu cầu (ticket 05): trả lời 1 lần, admin miễn. Harness đọc qua snapshot để chọn giọng văn.
CREATE TABLE IF NOT EXISTS ai_board_profile (
  user_id          INTEGER PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  role             TEXT    NOT NULL,
  domain_expertise TEXT    NOT NULL DEFAULT '[]',
  tech_level       TEXT    NOT NULL,
  answered_at      INTEGER NOT NULL
);
