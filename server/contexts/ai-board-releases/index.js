// ============================================================
// AI Board — cờ phát hành chức năng
// ============================================================
// Folder đã duyệt → release (mặc định owner_only). Chặn trang /<slug>.html khi người xem
// không được thấy; trả danh sách tile cho school.html; admin đổi status ở tab "Chức năng".
// PHẢI attach TRƯỚC route HTML + express.static trong server/index.js.
// ============================================================
import { RELEASE_STATUSES, canSee, getRelease, listReleases, setReleaseStatus } from '../../ai-board/releases.js';

const PAGE = /^\/([a-z0-9-]+)(?:\.html)?$/;
const HIDDEN_HTML = `<!doctype html><html lang="vi"><head><meta charset="utf-8"><meta name="robots" content="noindex">
<meta name="viewport" content="width=device-width,initial-scale=1"><title>Chức năng chưa phát hành</title></head>
<body style="font-family:system-ui,sans-serif;text-align:center;padding:60px 16px">
<h1>Chức năng này chưa phát hành</h1><p>Chức năng đang được hoàn thiện, bạn quay lại sau nhé.</p>
<p><a href="/school.html">← Về trường</a></p></body></html>`;

export function attachAiBoardReleases(router, { db, requireAuth, requireAdmin, requireStrictCsrf }) {
  // Page gate: chỉ slug đã đăng ký release; trang thường đi tiếp như cũ.
  router.use((req, res, next) => {
    if (req.method !== 'GET' && req.method !== 'HEAD') return next();
    const m = PAGE.exec(req.path);
    const release = m && getRelease(db, m[1]);
    if (!release || canSee(release, req.user)) return next();
    res.status(403).type('html').setHeader('Cache-Control', 'no-store');
    res.send(HIDDEN_HTML);
  });

  router.get('/api/ai-board/releases', requireAuth, (req, res) => {
    // Không có ?domain → trường đang học; ?domain= rỗng → mọi trường (tab admin).
    const domain = String(('domain' in req.query ? req.query.domain : req.user.enrolled_domain) || '').trim();
    res.json({ releases: listReleases(db, req.user, domain) });
  });

  router.post('/api/admin/ai-board/releases/:slug', requireAuth, requireAdmin, requireStrictCsrf, (req, res) => {
    const status = req.body?.status;
    if (!RELEASE_STATUSES.includes(status)) return res.status(400).json({ error: 'invalid_status' });
    if (!setReleaseStatus(db, req.params.slug, status, req.user.id)) return res.status(404).json({ error: 'release_not_found' });
    res.json({ ok: true });
  });
}
