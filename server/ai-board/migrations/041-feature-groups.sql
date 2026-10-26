-- LF/103: nhóm hiển thị theo tên chức năng (không cần admin duyệt, khác folder_id).
CREATE TABLE IF NOT EXISTS ai_features (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  created_at BIGINT NOT NULL
);
CREATE UNIQUE INDEX IF NOT EXISTS ux_ai_features_name ON ai_features(name);
ALTER TABLE requests ADD COLUMN IF NOT EXISTS feature_id BIGINT REFERENCES ai_features(id);
