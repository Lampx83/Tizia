import { setReleaseStatus } from '../services/releases.js';

// SQL vòng đời feature folder: role admin, folder/release/incident, sự kiện release. Thứ tự và biên transaction giữ nguyên ở service.
export function createFeatureLifecycleRepository(db) {
  return {
    tx: fn => db.tx(fn),
    lockRow: db.lockRow,
    adminRole: actorId => db.get('SELECT role FROM users WHERE id=? FOR SHARE', [actorId]),
    folder: (id, lock) => db.get(`SELECT * FROM ai_feature_folders WHERE id=?${lock ? db.lockRow : ''}`, [id]),
    openIncident: folderId => db.get('SELECT * FROM ai_feature_incidents WHERE folder_id=? AND resolved_at IS NULL', [folderId]),
    maxReleaseEventId: async folderId => (await db.get('SELECT MAX(id) AS id FROM ai_feature_release_events WHERE folder_id=?', [folderId])).id,
    history: folderId => db.all('SELECT * FROM ai_feature_release_events WHERE folder_id=? ORDER BY id DESC LIMIT 50', [folderId]),
    lockedRelease: folderId => db.get(`SELECT * FROM ai_feature_releases WHERE folder_id=?${db.lockRow}`, [folderId]),
    lockedReleaseSlug: folderId => db.get(`SELECT slug FROM ai_feature_releases WHERE folder_id=?${db.lockRow}`, [folderId]),
    clearApproval: (folderId, now) => db.run('UPDATE ai_feature_folders SET approved_by=NULL,approved_at=NULL,updated_at=? WHERE id=?', [now, folderId]),
    insertIncident: r => db.insert(`INSERT INTO ai_feature_incidents(folder_id,kind,evidence,opened_by,opened_at,
        prior_release_status,prior_approved_by,prior_approved_at) VALUES(?,?,?,?,?,?,?,?)`,
      [r.folderId, r.kind, r.evidence, r.openedBy, r.openedAt, r.priorReleaseStatus, r.priorApprovedBy, r.priorApprovedAt]),
    resolveIncident: (id, actorId, now, evidence) => db.run('UPDATE ai_feature_incidents SET resolved_by=?,resolved_at=?,resolution_evidence=? WHERE id=?',
      [actorId, now, evidence, id]),
    restoreApproval: (folderId, approvedBy, approvedAt, now) => db.run('UPDATE ai_feature_folders SET approved_by=?,approved_at=?,updated_at=? WHERE id=?',
      [approvedBy, approvedAt, now, folderId]),
    setRelease: (slug, status, actorId, now) => setReleaseStatus(db, slug, status, actorId, now),
  };
}
