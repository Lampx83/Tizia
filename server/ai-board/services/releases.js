// Cờ phát hành chức năng — bảng ai_feature_releases.
import { WorkerContractError } from '../repositories/store-contract.js';
import { createReleaseRepository } from '../repositories/releases.js';
export const RELEASE_STATUSES = ['owner_only', 'school', 'off'];

export async function assertFeatureNotIsolated(db, folderId) {
  if (await createReleaseRepository(db).openIncident(Number(folderId))) {
    throw new WorkerContractError('feature is isolated; explicit recovery is required', 409, 'feature_isolated');
  }
}

/** Đăng ký release 'owner_only' cho folder vừa duyệt. Idempotent: duyệt lại không reset status. */
export async function registerRelease(db, folder, adminUserId, now = Date.now()) {
  await createReleaseRepository(db).register(folder, Number(adminUserId), now);
}

export async function getRelease(db, slug) {
  return await createReleaseRepository(db).bySlug(String(slug));
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
  const repo = createReleaseRepository(db);
  const rows = domain ? await repo.listByDomain(String(domain)) : await repo.listAll();
  return rows.filter((r) => canSee(r, user))
    .map((r) => ({ slug: r.slug, title: r.title, url: `/${r.slug}.html`, status: r.status }));
}

/** Đổi status; false khi slug chưa đăng ký. Throw TypeError khi status lạ. */
export async function setReleaseStatus(db, slug, status, adminUserId, now = Date.now()) {
  if (!RELEASE_STATUSES.includes(status)) throw new TypeError('invalid status');
  const repo = createReleaseRepository(db);
  return repo.tx(async () => {
    const release = await repo.lockedBySlug(String(slug));
    if (!release) return false;
    if (status !== 'off') await assertFeatureNotIsolated(db, release.folder_id);
    await repo.setStatus(String(slug), status, Number(adminUserId), now);
    await repo.insertEvent(release.folder_id, release.status, status, Number(adminUserId), now);
    return true;
  });
}
