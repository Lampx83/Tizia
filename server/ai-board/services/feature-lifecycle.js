import { WorkerContractError } from '../repositories/store-contract.js';
import { setReleaseStatus } from './releases.js';

const KINDS = new Set(['permission_breach', 'data_corruption', 'mandatory_health_failure']);
const fail = (code, status = 409) => { throw new WorkerContractError(code, status, code); };

export function createFeatureLifecycle(store) {
  const db = store.db;
  async function admin(actorId) {
    if ((await db.get('SELECT role FROM users WHERE id=? FOR SHARE', [Number(actorId)]))?.role !== 'admin') fail('admin_required', 403);
  }
  async function feature(id, lock = false) {
    if (!Number.isSafeInteger(Number(id)) || Number(id) < 1) fail('invalid_folder_id', 400);
    const row = await db.get(`SELECT * FROM ai_feature_folders WHERE id=?${lock ? db.lockRow : ''}`, [Number(id)]);
    if (!row) fail('folder_not_found', 404);
    return row;
  }
  const incident = id => db.get('SELECT * FROM ai_feature_incidents WHERE folder_id=? AND resolved_at IS NULL', [Number(id)]);
  const releaseEvent = async id => (await db.get('SELECT MAX(id) AS id FROM ai_feature_release_events WHERE folder_id=?', [Number(id)])).id;
  function evidence(input) {
    if (input?.confirmed !== true || typeof input.evidence !== 'string' || input.evidence.trim().length < 10 || input.evidence.length > 2000) {
      fail('confirmed_evidence_required', 400);
    }
    return input.evidence.trim();
  }
  async function state(id, actorId) {
    return db.tx(async () => {
      await admin(actorId);
      const row = await feature(id, true);
      return { feature: { id: row.id, state: row.state, updated_at: row.updated_at }, incident: await incident(id) || null,
        release_event_id: await releaseEvent(id),
        history: await db.all('SELECT * FROM ai_feature_release_events WHERE folder_id=? ORDER BY id DESC LIMIT 50', [row.id]) };
    });
  }
  async function isolate(id, actorId, input) {
    const proof = evidence(input);
    if (!KINDS.has(input.kind)) fail('invalid_incident_kind', 400);
    return db.tx(async () => {
      await admin(actorId);
      const row = await feature(id, true);
      const release = await db.get(`SELECT * FROM ai_feature_releases WHERE folder_id=?${db.lockRow}`, [row.id]);
      if (!release) fail('release_not_found', 404);
      if (await incident(id)) fail('feature_already_isolated');
      const now = Date.now();
      await setReleaseStatus(db, row.slug, 'off', actorId, now);
      await store.stopFolderWork(row, 'feature_isolated', 'admin', actorId, now);
      await db.run('UPDATE ai_feature_folders SET approved_by=NULL,approved_at=NULL,updated_at=? WHERE id=?', [now, row.id]);
      const incidentId = await db.insert(`INSERT INTO ai_feature_incidents(folder_id,kind,evidence,opened_by,opened_at,
        prior_release_status,prior_approved_by,prior_approved_at) VALUES(?,?,?,?,?,?,?,?)`,
      [row.id, input.kind, proof, Number(actorId), now, release.status, row.approved_by, row.approved_at]);
      return { ok: true, incident_id: incidentId };
    });
  }
  async function restore(id, actorId, input) {
    const proof = evidence(input);
    return db.tx(async () => {
      await admin(actorId);
      const row = await feature(id, true);
      await db.get(`SELECT slug FROM ai_feature_releases WHERE folder_id=?${db.lockRow}`, [row.id]);
      const open = await incident(id);
      if (!open || open.id !== input.incident_id || row.updated_at !== input.feature_updated_at
        || await releaseEvent(id) !== input.release_event_id) fail('lifecycle_changed');
      const now = Date.now();
      await db.run('UPDATE ai_feature_incidents SET resolved_by=?,resolved_at=?,resolution_evidence=? WHERE id=?',
        [Number(actorId), now, proof, open.id]);
      await db.run('UPDATE ai_feature_folders SET approved_by=?,approved_at=?,updated_at=? WHERE id=?',
        [open.prior_approved_by, open.prior_approved_at, now, row.id]);
      await setReleaseStatus(db, row.slug, open.prior_release_status, actorId, now);
      return { ok: true };
    });
  }
  return { state, isolate, restore };
}
