import { getRelease, canSee } from '../services/releases.js';

/** Current release visibility, re-read per call. Missing release row = not released (fail closed). */
export function createReleaseGate(db) {
  return async (identity, featureId) => {
    const folder = await db.get('SELECT slug FROM ai_feature_folders WHERE id=?', [Number(featureId)]);
    const user = await db.get('SELECT id, role, enrolled_domain FROM users WHERE id=?', [Number(identity.id)]);
    const release = folder && await getRelease(db, folder.slug);
    return !!(release && release.status !== 'off' && user && canSee(release, user)); // off blocks egress even for admins
  };
}
