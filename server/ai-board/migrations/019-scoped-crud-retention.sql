-- Bound the platform retention sweep without changing record contracts.
CREATE INDEX ai_record_revisions_retention ON ai_record_revisions(created_at);
CREATE INDEX ai_resource_audit_retention ON ai_resource_audit(created_at);
CREATE INDEX ai_feature_records_deleted_retention ON ai_feature_records(deleted, updated_at);
