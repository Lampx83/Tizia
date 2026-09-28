-- Bộ đánh giá đóng băng + đường cong học (self-improve ticket 08).
-- frozen: cờ trên ai_eval_tasks — task đã đóng băng (chụp lúc bật vòng lần đầu + 2 tuần sau, contract.json
-- limits.self_improve.frozen_window_days) không bao giờ vào phần học/kiểm tra (eval-tasks.js evalTaskSplit).
-- frozen_at trên ai_self_improve_state: mốc chụp, ghi đúng 1 lần (khác enabled_at, không đổi khi tắt/bật lại).
ALTER TABLE ai_eval_tasks ADD COLUMN frozen INTEGER NOT NULL DEFAULT 0;
ALTER TABLE ai_self_improve_state ADD COLUMN frozen_at INTEGER;

-- Điểm bộ đóng băng, đo đúng 1 lần sau mỗi lần merge thay đổi self (ticket 03 báo state='merged' cho PR loại
-- self qua ai_pull_requests). UNIQUE(pr_number) + INSERT OR IGNORE: báo lại không sinh trùng.
CREATE TABLE ai_frozen_benchmark_scores (
  pr_number   INTEGER PRIMARY KEY,
  sha         TEXT NOT NULL,
  config_hash TEXT NOT NULL DEFAULT '{}',
  strata      TEXT NOT NULL DEFAULT '{}',
  gpu_s       REAL NOT NULL DEFAULT 0,
  measured_at INTEGER NOT NULL
);
