-- Chu kỳ nhánh/PR của folder chức năng (feature-folders ticket 05): mọi lượt của 1 chu kỳ commit lên cùng 1 nhánh,
-- 1 PR draft vào dev. Phát hành xong thì chu kỳ mới (cycle+1) bắt đầu nhánh mới từ dev.
ALTER TABLE ai_feature_folders ADD COLUMN branch TEXT;
ALTER TABLE ai_feature_folders ADD COLUMN head_sha TEXT;
ALTER TABLE ai_feature_folders ADD COLUMN pr_number INTEGER;
ALTER TABLE ai_feature_folders ADD COLUMN pr_url TEXT;
ALTER TABLE ai_feature_folders ADD COLUMN cycle INTEGER NOT NULL DEFAULT 1;
