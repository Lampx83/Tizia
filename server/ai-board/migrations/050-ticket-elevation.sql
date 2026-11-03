ALTER TABLE ai_tickets ADD COLUMN elevation TEXT NOT NULL DEFAULT 'none';
ALTER TABLE ai_tickets ADD COLUMN elevation_scope TEXT;
ALTER TABLE ai_tickets ADD COLUMN elevated_by BIGINT;
ALTER TABLE ai_tickets ADD COLUMN elevated_at BIGINT;
ALTER TABLE ai_tickets ADD COLUMN elevation_reason TEXT;
