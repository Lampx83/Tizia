import { WorkerContractError } from '../repositories/store-contract.js';
import { createFeatureLifecycleRepository } from '../repositories/feature-lifecycle.js';

const KINDS = new Set(['permission_breach', 'data_corruption', 'mandatory_health_failure']);
const fail = (code, status = 409) => { throw new WorkerContractError(code, status, code); };

export function createFeatureLifecycle(store, repo = createFeatureLifecycleRepository(store.db)) {
  async function admin(actorId) {
    if ((await repo.adminRole(Number(actorId)))?.role !== 'admin') fail('admin_required', 403);
  }
  async function feature(id, lock = false) {
    if (!Number.isSafeInteger(Number(id)) || Number(id) < 1) fail('invalid_folder_id', 400);
    const row = await repo.folder(Number(id), lock);
    if (!row) fail('folder_not_found', 404);
    return row;
  }
  const incident = id => repo.openIncident(Number(id));
  const releaseEvent = id => repo.maxReleaseEventId(Number(id));
  function evidence(input) {
    if (input?.confirmed !== true || typeof input.evidence !== 'string' || input.evidence.trim().length < 10 || input.evidence.length > 2000) {
      fail('confirmed_evidence_required', 400);
    }
    return input.evidence.trim();
  }
  async function state(id, actorId) {
    return repo.tx(async () => {
      await admin(actorId);
      const row = await feature(id, true);
      return { feature: { id: row.id, state: row.state, updated_at: row.updated_at }, incident: await incident(id) || null,
        release_event_id: await releaseEvent(id),
        history: await repo.history(row.id) };
    });
  }
  async function isolate(id, actorId, input) {
    const proof = evidence(input);
    if (!KINDS.has(input.kind)) fail('invalid_incident_kind', 400);
    return repo.tx(async () => {
      await admin(actorId);
      const row = await feature(id, true);
      const release = await repo.lockedRelease(row.id);
      if (!release) fail('release_not_found', 404);
      if (await incident(id)) fail('feature_already_isolated');
      const now = Date.now();
      await repo.setRelease(row.slug, 'off', actorId, now);
      await store.stopFolderWork(row, 'feature_isolated', 'admin', actorId, now);
      await repo.clearApproval(row.id, now);
      const incidentId = await repo.insertIncident({ folderId: row.id, kind: input.kind, evidence: proof, openedBy: Number(actorId), openedAt: now,
        priorReleaseStatus: release.status, priorApprovedBy: row.approved_by, priorApprovedAt: row.approved_at });
      return { ok: true, incident_id: incidentId };
    });
  }
  async function restore(id, actorId, input) {
    const proof = evidence(input);
    return repo.tx(async () => {
      await admin(actorId);
      const row = await feature(id, true);
      await repo.lockedReleaseSlug(row.id);
      const open = await incident(id);
      if (!open || open.id !== input.incident_id || row.updated_at !== input.feature_updated_at
        || await releaseEvent(id) !== input.release_event_id) fail('lifecycle_changed');
      const now = Date.now();
      await repo.resolveIncident(open.id, Number(actorId), now, proof);
      await repo.restoreApproval(row.id, open.prior_approved_by, open.prior_approved_at, now);
      await repo.setRelease(row.slug, open.prior_release_status, actorId, now);
      return { ok: true };
    });
  }
  return { state, isolate, restore };
}
