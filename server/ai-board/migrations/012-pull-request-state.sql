-- Trạng thái PR ai-board/* worker hỏi GitHub rồi báo về. Không webhook.
-- Có dòng = PR đã đóng (merged | closed); PR đang mở không có dòng. Nối về lượt qua
-- json_extract(ai_runs.evidence_json, '$.pull_request.number') — 1 PR folder có thể gom nhiều lượt.
CREATE TABLE ai_pull_requests (
  number      INTEGER PRIMARY KEY,
  state       TEXT NOT NULL CHECK (state IN ('merged', 'closed')),
  closed_at   INTEGER NOT NULL,          -- merged_at / closed_at của GitHub (ms)
  files       TEXT NOT NULL DEFAULT '[]', -- JSON: file PR đổi
  reported_at INTEGER NOT NULL
);
