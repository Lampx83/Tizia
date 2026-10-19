// Cờ phát hành chức năng — bảng ai_feature_releases.
import { WorkerContractError } from '../repositories/store-contract.js';
export const RELEASE_STATUSES = ['owner_only', 'school', 'off'];

export async function assertFeatureNotIsolated(db, folderId) {
  if (await db.get('SELECT id FROM ai_feature_incidents WHERE folder_id=? AND resolved_at IS NULL', [Number(folderId)])) {
    throw new WorkerContractError('feature is isolated; explicit recovery is required', 409, 'feature_isolated');
  }
}

/** Đăng ký release 'owner_only' cho folder vừa duyệt. Idempotent: duyệt lại không reset status. */
export async function registerRelease(db, folder, adminUserId, now = Date.now()) {
  await db.run(`INSERT INTO ai_feature_releases (slug, folder_id, owner_user_id, status, updated_by, updated_at)
    VALUES (?, ?, ?, 'owner_only', ?, ?) ON CONFLICT (slug) DO NOTHING`, [folder.slug, folder.id, folder.owner_user_id, Number(adminUserId), now]);
}

const SELECT = `SELECT r.slug, r.status, r.owner_user_id, f.title, f.domain
  FROM ai_feature_releases r JOIN ai_feature_folders f ON f.id = r.folder_id`;

export async function getRelease(db, slug) {
  return await db.get(`${SELECT} WHERE r.slug = ?`, [String(slug)]);
}

/** Admin thấy hết; off chỉ admin; owner_only chỉ người tạo; school: người tạo + ai học đúng trường đó. */
export function canSee(release, user) {
  if (user?.role === 'admin') return true;
  if (!user || release.status === 'off') return false;
  if (release.owner_user_id === Number(user.id)) return true;
  return release.status === 'school' && release.domain === user.enrolled_domain;
}

/** Release người này được thấy; domain rỗng = mọi trường. */
export async function listReleases(db, user, domain) {
  const rows = domain
    ? await db.all(`${SELECT} WHERE f.domain = ? ORDER BY r.updated_at DESC LIMIT 200`, [String(domain)])
    : await db.all(`${SELECT} ORDER BY r.updated_at DESC LIMIT 200`);
  return rows.filter((r) => canSee(r, user))
    .map((r) => ({ slug: r.slug, title: r.title, url: `/${r.slug}.html`, status: r.status }));
}

/** Đổi status; false khi slug chưa đăng ký. Throw TypeError khi status lạ. */
export async function setReleaseStatus(db, slug, status, adminUserId, now = Date.now()) {
  if (!RELEASE_STATUSES.includes(status)) throw new TypeError('invalid status');
  return db.tx(async () => {
    const release = await db.get(`SELECT * FROM ai_feature_releases WHERE slug=?${db.lockRow}`, [String(slug)]);
    if (!release) return false;
    if (status !== 'off') await assertFeatureNotIsolated(db, release.folder_id);
    await db.run('UPDATE ai_feature_releases SET status=?, updated_by=?, updated_at=? WHERE slug=?', [status, Number(adminUserId), now, String(slug)]);
    await db.run(`INSERT INTO ai_feature_release_events(folder_id,previous_status,next_status,actor_id,created_at)
      VALUES(?,?,?,?,?)`, [release.folder_id, release.status, status, Number(adminUserId), now]);
    return true;
  });
}
