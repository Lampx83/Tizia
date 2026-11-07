// SQL cờ phát hành (ai_feature_releases, ai_feature_release_events) và sự cố đang mở của folder.
const SELECT = `SELECT r.slug, r.status, r.owner_user_id, f.title, f.domain
  FROM ai_feature_releases r JOIN ai_feature_folders f ON f.id = r.folder_id`;

export function createReleaseRepository(db) {
  return {
    openIncident: folderId => db.get('SELECT id FROM ai_feature_incidents WHERE folder_id=? AND resolved_at IS NULL', [folderId]),
    register: (folder, adminUserId, now) => db.run(`INSERT INTO ai_feature_releases (slug, folder_id, owner_user_id, status, updated_by, updated_at)
      VALUES (?, ?, ?, 'owner_only', ?, ?) ON CONFLICT (slug) DO NOTHING`, [folder.slug, folder.id, folder.owner_user_id, adminUserId, now]),
    bySlug: slug => db.get(`${SELECT} WHERE r.slug = ?`, [slug]),
    listByDomain: domain => db.all(`${SELECT} WHERE f.domain = ? ORDER BY r.updated_at DESC LIMIT 200`, [domain]),
    listAll: () => db.all(`${SELECT} ORDER BY r.updated_at DESC LIMIT 200`),
    lockedBySlug: slug => db.get(`SELECT * FROM ai_feature_releases WHERE slug=?${db.lockRow}`, [slug]),
    setStatus: (slug, status, adminUserId, now) => db.run('UPDATE ai_feature_releases SET status=?, updated_by=?, updated_at=? WHERE slug=?', [status, adminUserId, now, slug]),
    insertEvent: (folderId, previous, next, adminUserId, now) => db.run(`INSERT INTO ai_feature_release_events(folder_id,previous_status,next_status,actor_id,created_at)
      VALUES(?,?,?,?,?)`, [folderId, previous, next, adminUserId, now]),
    tx: fn => db.tx(fn),
  };
}
