-- PostgreSQL form of migrations/017 (SQLite trigger uses MAX(a,b) and a bare body; PG needs a function).
CREATE OR REPLACE FUNCTION ai_root_request_status_fn() RETURNS trigger AS $$
BEGIN
  UPDATE requests SET
    status = CASE
      WHEN NEW.phase = 'admin_rejected' OR NEW.status = 'rejected' THEN 'rejected'
      WHEN NEW.status = 'cancelled' OR NEW.phase = 'rolled_back' THEN 'cancelled'
      WHEN NEW.status = 'done' THEN 'done'
      WHEN NEW.status IN ('running', 'planned') THEN 'reviewing'
      ELSE 'pending'
    END,
    admin_note = COALESCE(NEW.public_note, admin_note),
    updated_at = GREATEST(updated_at, NEW.updated_at)
  WHERE id = NEW.source_request_id;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER ai_root_request_status
AFTER UPDATE OF status, phase, public_note ON ai_tickets
FOR EACH ROW WHEN (NEW.parent_id IS NULL AND NEW.kind = 'root')
EXECUTE FUNCTION ai_root_request_status_fn();

UPDATE ai_tickets SET phase = phase WHERE parent_id IS NULL AND kind = 'root';
