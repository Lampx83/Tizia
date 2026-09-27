-- Task eval từ lần hỏng / lần thắng ở production (self-improve ticket 02). Không lưu tên hay mã người gửi.
-- 1 lượt (run) = tối đa 1 task mỗi nguồn: sự kiện lặp lại (verdict gửi lại, "Thử cách khác", hoàn tác) không ghi trùng.
-- Xoá = xoá nội dung, giữ khoá (status 'retired', deleted_at) để sự kiện sau của cùng lượt không hồi sinh task.
CREATE TABLE ai_eval_tasks (
  id               INTEGER PRIMARY KEY AUTOINCREMENT,
  source           TEXT NOT NULL CHECK (source IN ('miss', 'win')),
  trigger          TEXT NOT NULL,          -- verdict_blocked | retry | undo (ticket 03: pr_closed | pr_merged)
  request_id       INTEGER NOT NULL,       -- yêu cầu gốc; cùng run_id là tham chiếu trace
  run_id           INTEGER NOT NULL,
  request_text     TEXT NOT NULL,
  clarified_spec   TEXT,
  base_sha         TEXT,
  gate             REAL,                   -- cổng chặn (lần hỏng ở verdict)
  failure_class    TEXT,
  skill            TEXT,
  expected_files   TEXT NOT NULL DEFAULT '[]', -- JSON; ứng viên: gợi ý từ plan/commit, admin sửa khi gắn nhãn
  must_contain     TEXT,                   -- JSON mảng chuỗi, tuỳ chọn
  must_not_contain TEXT,
  status           TEXT NOT NULL DEFAULT 'candidate' CHECK (status IN ('candidate', 'labelled', 'retired')),
  created_at       INTEGER NOT NULL,
  labelled_at      INTEGER,
  retired_at       INTEGER,
  deleted_at       INTEGER,
  UNIQUE(source, run_id)
);
CREATE INDEX idx_ai_eval_tasks_status ON ai_eval_tasks(status, created_at);
