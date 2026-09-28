-- Tự chạy lại yêu cầu bị chặn do lỗi hạ tầng thoáng qua (transient), sau khi backoff gọi model đã hết mà vẫn
-- hỏng. Công tắc: 1 dòng duy nhất, giống ai_self_improve_state; chưa có dòng = tắt (mặc định admin tự quyết
-- lúc nào chạy lại, qua Grafana). Bật: ticket tự về hàng đợi sau limits.transient_retry.retry_after_ms.
CREATE TABLE ai_transient_retry_state (
  id         INTEGER PRIMARY KEY CHECK (id = 1),
  enabled    INTEGER NOT NULL,
  updated_by INTEGER,
  updated_at INTEGER NOT NULL
);
