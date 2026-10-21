ALTER TABLE ai_skill_versions ADD COLUMN proposal_id INTEGER;
ALTER TABLE ai_skill_versions ADD COLUMN proposal_source TEXT CHECK(proposal_source IN ('model','retro'));
ALTER TABLE ai_skill_versions ADD COLUMN proposal_reason TEXT;
