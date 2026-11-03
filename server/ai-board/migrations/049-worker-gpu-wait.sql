ALTER TABLE ai_workers ADD COLUMN gpu_busy_model TEXT;
ALTER TABLE ai_workers ADD COLUMN gpu_retry_at BIGINT;
ALTER TABLE ai_workers ADD COLUMN gpu_error TEXT;
