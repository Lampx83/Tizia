-- Cờ phát hành chức năng: ai thấy trang /<slug>.html của folder.
-- owner_only = chỉ người tạo; school = cả trường của folder; off = chỉ admin. Admin luôn thấy.
CREATE TABLE ai_feature_releases (
  slug           TEXT PRIMARY KEY,
  folder_id      INTEGER NOT NULL UNIQUE REFERENCES ai_feature_folders(id),
  owner_user_id  INTEGER NOT NULL,
  status         TEXT NOT NULL DEFAULT 'owner_only' CHECK (status IN ('owner_only', 'school', 'off')),
  updated_by     INTEGER,
  updated_at     INTEGER NOT NULL
);

-- Folder đã duyệt trước migration này: đăng ký luôn, mặc định chỉ người tạo.
INSERT INTO ai_feature_releases (slug, folder_id, owner_user_id, status, updated_by, updated_at)
SELECT slug, id, owner_user_id, 'owner_only', approved_by, approved_at FROM ai_feature_folders WHERE approved_at IS NOT NULL;
