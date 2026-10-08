-- Theo dõi production sau merge + tự revert. Mỗi self PR đã merge có tối đa 1 dòng:
-- 'waiting' = cửa sổ sau merge chưa đủ 10 lượt production mỗi bên, chưa kết luận, kiểm lại đêm sau;
-- 'ok' / 'dropped' = đã kết luận, không kiểm lại (idempotent theo pr_number, như ai_frozen_benchmark_scores).
-- 'dropped' kèm đúng 1 yêu cầu self revert (revert_request_id) — tạo qua createSelfRequest, tier protected,
-- không tự merge (idempotency_key theo pr_number nên báo lại không tạo trùng).
CREATE TABLE ai_post_merge_watch (
  pr_number         INTEGER PRIMARY KEY,
  sha               TEXT,
  status            TEXT NOT NULL CHECK (status IN ('waiting', 'ok', 'dropped')),
  before_runs       INTEGER NOT NULL DEFAULT 0,
  after_runs        INTEGER NOT NULL DEFAULT 0,
  before_ready_pct  REAL,
  after_ready_pct   REAL,
  before_merge_pct  REAL,
  after_merge_pct   REAL,
  drop_ready_pts    REAL,
  drop_merge_pts    REAL,
  revert_request_id INTEGER,
  checked_at        INTEGER NOT NULL
);
