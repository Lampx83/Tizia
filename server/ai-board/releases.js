// Cờ phát hành chức năng (feature-folders ticket 10) — bảng ai_feature_releases (migration 010).
export const RELEASE_STATUSES = ['owner_only', 'school', 'off'];

/** Đăng ký release 'owner_only' cho folder vừa duyệt. Idempotent: duyệt lại không reset status. */
export function registerRelease(db, folder, adminUserId, now = Date.now()) {
  db.prepare(`INSERT INTO ai_feature_releases (slug, folder_id, owner_user_id, status, updated_by, updated_at)
    VALUES (?, ?, ?, 'owner_only', ?, ?) ON CONFLICT (slug) DO NOTHING`)
    .run(folder.slug, folder.id, folder.owner_user_id, Number(adminUserId), now);
}

const SELECT = `SELECT r.slug, r.status, r.owner_user_id, f.title, f.domain
  FROM ai_feature_releases r JOIN ai_feature_folders f ON f.id = r.folder_id`;

export function getRelease(db, slug) {
  return db.prepare(`${SELECT} WHERE r.slug = ?`).get(String(slug));
}

/** Admin thấy hết; off chỉ admin; owner_only chỉ người tạo; school: người tạo + ai học đúng trường đó. */
export function canSee(release, user) {
  if (user?.role === 'admin') return true;
  if (!user || release.status === 'off') return false;
  if (release.owner_user_id === Number(user.id)) return true;
  return release.status === 'school' && release.domain === user.enrolled_domain;
}

/** Release người này được thấy; domain rỗng = mọi trường. */
export function listReleases(db, user, domain) {
  const rows = domain
    ? db.prepare(`${SELECT} WHERE f.domain = ? ORDER BY r.updated_at DESC LIMIT 200`).all(String(domain))
    : db.prepare(`${SELECT} ORDER BY r.updated_at DESC LIMIT 200`).all();
  return rows.filter((r) => canSee(r, user))
    .map((r) => ({ slug: r.slug, title: r.title, url: `/${r.slug}.html`, status: r.status }));
}

/** Đổi status; false khi slug chưa đăng ký. Throw TypeError khi status lạ. */
export function setReleaseStatus(db, slug, status, adminUserId, now = Date.now()) {
  if (!RELEASE_STATUSES.includes(status)) throw new TypeError('invalid status');
  return db.prepare('UPDATE ai_feature_releases SET status = ?, updated_by = ?, updated_at = ? WHERE slug = ?')
    .run(status, Number(adminUserId), now, String(slug)).changes > 0;
}
