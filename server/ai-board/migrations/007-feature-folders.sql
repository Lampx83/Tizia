-- Folder chức năng (feature-folders ticket 04): gom các yêu cầu của 1 chức năng mới.
-- Duyệt 1 lần cho cả folder; chưa duyệt thì mọi plan trong folder chờ admin.
CREATE TABLE ai_feature_folders (
  id                INTEGER PRIMARY KEY AUTOINCREMENT,
  slug              TEXT NOT NULL UNIQUE,
  title             TEXT NOT NULL,
  owner_user_id     INTEGER NOT NULL,
  domain            TEXT NOT NULL,
  state             TEXT NOT NULL DEFAULT 'draft',
  approved_by       INTEGER,
  approved_at       INTEGER,
  created_at        INTEGER NOT NULL,
  updated_at        INTEGER NOT NULL,
  last_activity_at  INTEGER NOT NULL
);
CREATE INDEX idx_ai_feature_folders_owner ON ai_feature_folders(owner_user_id, state);
CREATE INDEX idx_ai_feature_folders_domain ON ai_feature_folders(domain, state);

CREATE TABLE ai_feature_folder_votes (
  folder_id   INTEGER NOT NULL REFERENCES ai_feature_folders(id),
  user_id     INTEGER NOT NULL,
  created_at  INTEGER NOT NULL,
  PRIMARY KEY (folder_id, user_id)
);

ALTER TABLE requests ADD COLUMN folder_id INTEGER REFERENCES ai_feature_folders(id);
