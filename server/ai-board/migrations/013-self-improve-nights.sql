-- Vòng tự cải thiện ban đêm: công tắc admin + 1 dòng mỗi đêm.
-- Công tắc: 1 dòng duy nhất; chưa có dòng = contract limits.self_improve.enabled. enabled_at: mốc đếm tự dừng
-- (bật lại = đếm lại từ đầu).
CREATE TABLE ai_self_improve_state (
  id         INTEGER PRIMARY KEY CHECK (id = 1),
  enabled    INTEGER NOT NULL,
  enabled_at INTEGER,
  updated_by INTEGER,
  updated_at INTEGER NOT NULL
);
-- night = ngày địa phương (múi giờ cửa sổ) lúc đêm bắt đầu. variants: JSON
-- [{cluster, diagnosis, request_id, root_ticket_id, status: waiting|accepted|rejected|dropped, reason, eval}];
-- verdict của lượt self (có thể sau đêm đó) cập nhật biến thể + gpu_s_eval.
CREATE TABLE ai_self_improve_nights (
  night          TEXT PRIMARY KEY,
  started_at     INTEGER NOT NULL,
  finished_at    INTEGER,
  status         TEXT NOT NULL DEFAULT 'running' CHECK (status IN ('running', 'done', 'stopped')),
  note           TEXT,
  pr_sync        TEXT,
  gpu_s_propose  REAL NOT NULL DEFAULT 0,
  gpu_s_eval     REAL NOT NULL DEFAULT 0,
  variants       TEXT NOT NULL DEFAULT '[]'
);
