-- Keep the source request consistent with every root transition, including old worker paths.
CREATE TRIGGER ai_root_request_status
AFTER UPDATE OF status, phase, public_note ON ai_tickets
WHEN NEW.parent_id IS NULL AND NEW.kind = 'root'
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
    updated_at = MAX(updated_at, NEW.updated_at)
  WHERE id = NEW.source_request_id;
END;

-- Reconcile pre-existing local requests as well as future transitions.
UPDATE ai_tickets SET phase = phase WHERE parent_id IS NULL AND kind = 'root';
