// ============================================================
// Admin context — trang quản trị TOÀN HỆ THỐNG
// ============================================================
// Super-admin (role='admin') quản trị toàn hệ thống: số liệu tổng, người dùng,
// góp ý, quyết định AI (audit), học liệu (kiểm duyệt), gói cước.
//
// Bảo mật: requireAdmin gate role='admin'. Admin KHÔNG tự đăng ký được (register chỉ
// cho pupil/student/teacher) — phải promote qua env ADMIN_PROMOTE_USERNAME hoặc SQL.
// Đây là foundation; UI ở public/admin.html.
// ============================================================

import { scryptSync, randomBytes } from 'node:crypto';
import { db, createNotification, addRequestMessage, setUserPlan, createUser, getUserById, getUserByUsername, updateUserEditable, isSchoolAdmin } from '../../db.js';
import { VALID_USER_PLANS, expiresAtFor } from '../billing/user-plans.js';
import { listAiPrompts, listAiPromptsForUser } from '../../ai-quota.js';
import { attachBackup, scheduleAutoBackup } from './backup.js';
import { attachAdminDb } from './db-admin.js';
import { getPageviewStats } from '../analytics/index.js';
import { startImpersonation } from '../identity/auth.js';

// Scrypt hash — đồng bộ format với contexts/identity/auth.js (scrypt$salt$hash)
function hashPassword(password) {
  const salt = randomBytes(16);
  const hash = scryptSync(String(password), salt, 64);
  return `scrypt$${salt.toString('hex')}$${hash.toString('hex')}`;
}
const USERNAME_RE = /^[a-z0-9_.-]{3,32}$/i;

// ── Bootstrap admin từ env (an toàn: chỉ promote user đã tồn tại) ──
export async function ensureAdminBootstrap() {
  const uname = process.env.ADMIN_PROMOTE_USERNAME;
  if (!uname) return;
  try {
    const info = await db.prepare(`UPDATE users SET role='admin' WHERE username = ? COLLATE NOCASE`).run(String(uname));
    if (info.changes > 0) console.log(`[admin] promoted '${uname}' → admin`);
    else console.log(`[admin] ADMIN_PROMOTE_USERNAME='${uname}' chưa tồn tại (đăng ký trước rồi restart)`);
  } catch (e) { console.warn('[admin] bootstrap lỗi:', e?.message); }
}

export function requireAdmin(req, res, next) {
  if (req.user?.role !== 'admin') {
    return res.status(403).json({ error: 'forbidden', message: 'Cần quyền quản trị hệ thống (admin).' });
  }
  next();
}

// Gate cho endpoint THEO-TRƯỜNG: cho super-admin (role='admin', mọi trường) HOẶC
// school-admin của đúng trường đó (school_admins grant). getDomain(req) trích domain
// mục tiêu từ req (query.domain hoặc params.domain). Trả 403 nếu không đủ quyền.
// LƯU Ý: school-admin bắt buộc kèm domain hợp lệ (không có domain → không phải admin
// → 403), nên KHÔNG lấy được số liệu toàn cục.
export function requireSchoolAccess(getDomain) {
  return async (req, res, next) => {
    if (req.user?.role === 'admin') return next();
    if (!req.user) return res.status(401).json({ error: 'unauthorized', needLogin: true });
    const domain = typeof getDomain === 'function' ? getDomain(req) : null;
    if (domain && await isSchoolAdmin(req.user.id, domain)) return next();
    return res.status(403).json({ error: 'forbidden', message: 'Cần quyền quản trị trường này.' });
  };
}

// ── Queries (toàn hệ thống) ──
const Q = {
  overview: db.prepare(`SELECT
    (SELECT COUNT(*) FROM users) AS users,
    (SELECT COUNT(*) FROM attempts) AS attempts,
    (SELECT COUNT(*) FROM requests) AS requests,
    (SELECT COUNT(*) FROM requests WHERE status='pending') AS requests_pending`),
  // LEFT JOIN user_wallets BUCKET trường HS đang theo học (enrolled_domain). Vì
  // user_wallets giờ là composite (user_id, domain), nếu không filter domain thì
  // user có nhiều bucket sẽ ra nhiều row → sai số liệu admin. enrolled_domain
  // NULL (admin/chưa enroll) → bucket '' = legacy.
  users: db.prepare(`
    SELECT u.id, u.username, u.display_name, u.role, u.email, u.age,
           u.grade, u.major, u.cohort, u.school_name,
           u.plan, u.plan_expires_at, u.billing_cycle, u.created_at, u.last_login,
           u.enrolled_domain,
           w.xp, w.coins, w.streak, w.longest_streak, w.last_visit_day,
           w.quizzes_passed, w.updated_at AS wallet_updated_at
    FROM users u
    LEFT JOIN user_wallets w
      ON w.user_id = u.id AND w.domain = COALESCE(u.enrolled_domain, '')
    ORDER BY u.created_at DESC LIMIT @limit
  `),
  // Wallet chi tiết — cùng nguyên tắc: chỉ ví trường HS đang học.
  userWalletDetail: db.prepare(`
    SELECT u.id, u.username, u.display_name, u.role, u.enrolled_domain,
           w.coins, w.xp, w.streak, w.longest_streak, w.streak_shields,
           w.last_visit_day, w.achievements, w.vr_sessions, w.meta_sessions,
           w.quizzes_passed, w.modules_by_day, w.daily, w.quests_claimed,
           w.updated_at
    FROM users u
    LEFT JOIN user_wallets w
      ON w.user_id = u.id AND w.domain = COALESCE(u.enrolled_domain, '')
    WHERE u.id = ?
  `),
  setUserRole: db.prepare(`UPDATE users SET role=@role WHERE id=@id`),
  requests: db.prepare(`SELECT id, domain, type, title, detail, status, votes, student, admin_note, created_at, updated_at
    FROM requests ORDER BY created_at DESC LIMIT @limit`),
  setRequestStatus: db.prepare(`UPDATE requests SET status=@status, admin_note=@note, updated_at=@t WHERE id=@id`),
};

async function tableExists(name) {
  return !!(await db.prepare(`SELECT 1 FROM information_schema.tables WHERE table_schema='public' AND table_name = ?`).get(name));
}

// Đọc & validate ?domain= cho các endpoint dashboard scoped-theo-trường. Trả
// domain hợp lệ (dùng trong parameterized query, an toàn injection) hoặc null =
// toàn hệ thống. Thống kê theo trường: users theo enrolled_domain, attempts join
// player_name=display_name, requests theo cột domain. (pageview/AI token là toàn
// cục — không tách được theo trường nên endpoint scoped bỏ qua.)
function scopeDomain(req) {
  const d = String(req.query?.domain || '').trim();
  return /^[a-z][a-z0-9-]+$/.test(d) ? d : null;
}

export function attachAdmin(r) {
  ensureAdminBootstrap();

  r.get('/api/admin/overview', requireAdmin, async (_req, res) => {
    const base = await Q.overview.get();
    // số liệu từ context có-thể-chưa-tạo-bảng (analytics/billing/ai_decisions)
    const extra = {};
    if (await tableExists('ai_decisions')) extra.ai_decisions = (await db.prepare(`SELECT COUNT(*) c FROM ai_decisions`).get()).c;
    if (await tableExists('analytics_events')) extra.events = (await db.prepare(`SELECT COUNT(*) c FROM analytics_events`).get()).c;
    if (await tableExists('subscriptions')) extra.paid_users = (await db.prepare(`SELECT COUNT(*) c FROM subscriptions WHERE plan<>'free' AND status='active'`).get()).c;
    if (await tableExists('ai_lesson_content')) extra.ai_content = (await db.prepare(`SELECT COUNT(*) c FROM ai_lesson_content`).get()).c;
    res.json({ ...base, ...extra });
  });

  // Người dùng — toàn hệ thống; đổi vai trò
  r.get('/api/admin/users', requireAdmin, async (req, res) => {
    const limit = Math.min(Math.max(Number(req.query.limit) || 100, 1), 500);
    res.json({ users: await Q.users.all({ limit }) });
  });
  r.post('/api/admin/users/:id/role', requireAdmin, async (req, res) => {
    const role = String(req.body?.role || '');
    if (!['pupil', 'student', 'teacher', 'admin'].includes(role)) return res.status(400).json({ error: 'invalid_role' });
    await Q.setUserRole.run({ id: Number(req.params.id), role });
    res.json({ ok: true });
  });

  // POST /api/admin/users/:id/impersonate — "đăng nhập với tư cách" user này.
  // Đổi cookie phiên sang user đích; token admin gốc được cất để quay lại (xem
  // startImpersonation). FE điều hướng về redirectTo để xem app đúng như user.
  r.post('/api/admin/users/:id/impersonate', requireAdmin, async (req, res) => {
    const id = Number(req.params.id);
    const target = await getUserById(id);
    if (!target) return res.status(404).json({ error: 'user_not_found' });
    if (target.id === req.user.id) return res.status(400).json({ error: 'cannot_impersonate_self' });
    try {
      await startImpersonation(req, res, target.id);
    } catch (e) {
      return res.status(400).json({ error: 'no_admin_session', message: e?.message });
    }
    res.json({
      ok: true, redirectTo: '/',
      user: { id: target.id, username: target.username, display_name: target.display_name, role: target.role },
    });
  });

  // ─── Per-user DOMAIN GRANTS — admin mở quyền vào trường (kể cả locked) ───
  // Đặc biệt hữu ích cho B2B: admin gán giáo viên/HS vào trường đang phát triển
  // hoặc cho phép 1 user thử trường khác miễn phí.

  // GET /api/admin/domain-grants — list tất cả grants gần đây (500 mới nhất)
  r.get('/api/admin/domain-grants', requireAdmin, async (_req, res) => {
    const { listAllDomainGrants } = await import('../../db.js');
    res.json({ grants: await listAllDomainGrants() });
  });

  // GET /api/admin/users/:id/grants — list grants của 1 user
  r.get('/api/admin/users/:id/grants', requireAdmin, async (req, res) => {
    const { listUserDomainGrantsFull } = await import('../../db.js');
    res.json({ grants: await listUserDomainGrantsFull(Number(req.params.id)) });
  });

  // POST /api/admin/users/:id/grant-domain — { domain_id, expires_at?, note? }
  r.post('/api/admin/users/:id/grant-domain', requireAdmin, async (req, res) => {
    const { grantUserDomain } = await import('../../db.js');
    const domain_id = String(req.body?.domain_id || '').trim();
    if (!domain_id || !/^[a-z][a-z0-9-]+$/.test(domain_id)) {
      return res.status(400).json({ error: 'invalid_domain_id' });
    }
    const expires_at = req.body?.expires_at ? Number(req.body.expires_at) : null;
    if (expires_at != null && (!Number.isFinite(expires_at) || expires_at < Date.now())) {
      return res.status(400).json({ error: 'invalid_expires_at', message: 'expires_at phải > now (epoch ms)' });
    }
    await grantUserDomain({
      userId: Number(req.params.id),
      domainId: domain_id,
      grantedBy: req.user.id,
      expiresAt: expires_at,
      note: req.body?.note || null,
    });
    res.json({ ok: true, user_id: Number(req.params.id), domain_id, expires_at });
  });

  // DELETE /api/admin/users/:id/grant-domain/:domain_id
  r.delete('/api/admin/users/:id/grant-domain/:domain_id', requireAdmin, async (req, res) => {
    const { revokeUserDomain } = await import('../../db.js');
    const changes = await revokeUserDomain(Number(req.params.id), String(req.params.domain_id));
    res.json({ ok: true, removed: changes });
  });

  // ─── SCHOOL ADMINS — bổ nhiệm user làm quản lý 1 trường ───
  // GET /api/admin/school-admins → list tất cả school admin
  r.get('/api/admin/school-admins', requireAdmin, async (_req, res) => {
    const { listAllSchoolAdmins } = await import('../../db.js');
    res.json({ admins: await listAllSchoolAdmins() });
  });

  // GET /api/admin/content-by-domain → số content (curriculum) theo từng trường.
  // Phục vụ bảng tổng quan trường ở admin dashboard. Chia theo kind (quiz/lesson…).
  r.get('/api/admin/content-by-domain', requireAdmin, async (_req, res) => {
    let rows = [];
    try {
      rows = await db.prepare(`
        SELECT COALESCE(domain,'') AS domain, COUNT(*) AS total,
               SUM(CASE WHEN kind='quiz'   THEN 1 ELSE 0 END) AS quiz,
               SUM(CASE WHEN kind='lesson' THEN 1 ELSE 0 END) AS lesson
        FROM curriculum_content WHERE active = 1 GROUP BY domain
      `).all();
    } catch { rows = []; }
    const counts = {};
    for (const r0 of rows) counts[r0.domain] = { total: r0.total, quiz: r0.quiz, lesson: r0.lesson };
    res.json({ counts });
  });

  // GET /api/admin/schools/:domain_id/admins → list admin của 1 trường cụ thể
  r.get('/api/admin/schools/:domain_id/admins', requireAdmin, async (req, res) => {
    const { listSchoolAdminsByDomain } = await import('../../db.js');
    res.json({ admins: await listSchoolAdminsByDomain(String(req.params.domain_id)) });
  });

  // POST /api/admin/users/:id/school-admin → { domain_id, note? }
  r.post('/api/admin/users/:id/school-admin', requireAdmin, async (req, res) => {
    const { setSchoolAdmin } = await import('../../db.js');
    const domain_id = String(req.body?.domain_id || '').trim();
    if (!domain_id || !/^[a-z][a-z0-9-]+$/.test(domain_id)) {
      return res.status(400).json({ error: 'invalid_domain_id' });
    }
    await setSchoolAdmin({
      userId: Number(req.params.id),
      domainId: domain_id,
      grantedBy: req.user.id,
      note: req.body?.note || null,
    });
    res.json({ ok: true, user_id: Number(req.params.id), domain_id });
  });

  // DELETE /api/admin/users/:id/school-admin/:domain_id
  r.delete('/api/admin/users/:id/school-admin/:domain_id', requireAdmin, async (req, res) => {
    const { revokeSchoolAdmin } = await import('../../db.js');
    const changes = await revokeSchoolAdmin(Number(req.params.id), String(req.params.domain_id));
    res.json({ ok: true, removed: changes });
  });

  // Admin set/đổi enrolled_domain. value=null → bỏ gắn trường (admin/no-school).
  // Bucket ví/skill cũ KHÔNG bị xoá (đúng chính sách giữ ẩn — anh Lâm xác nhận).
  r.post('/api/admin/users/:id/enrollment', requireAdmin, async (req, res) => {
    const { setEnrolledDomain } = await import('../../db.js');
    const { ENROLLABLE_DOMAINS } = await import('../identity/auth.js');
    const raw = req.body?.enrolled_domain;
    const target = (raw == null || raw === '') ? null : String(raw);
    if (target != null && !ENROLLABLE_DOMAINS.has(target)) {
      return res.status(400).json({ error: 'invalid_domain', valid: [...ENROLLABLE_DOMAINS] });
    }
    await setEnrolledDomain(Number(req.params.id), target);
    res.json({ ok: true, enrolled_domain: target });
  });

  // GET /api/admin/users/:id/wallet — chi tiết ví game của 1 HS/SV. Parse JSON
  // string achievements/modules_by_day/daily/quests_claimed về object để FE
  // không phải parse 2 lần. Null nếu user chưa từng có wallet row.
  r.get('/api/admin/users/:id/wallet', requireAdmin, async (req, res) => {
    const row = await Q.userWalletDetail.get(Number(req.params.id));
    if (!row) return res.status(404).json({ error: 'user_not_found' });
    const parse = (s, fb) => { try { return JSON.parse(s || ''); } catch { return fb; } };
    res.json({
      user: { id: row.id, username: row.username, display_name: row.display_name, role: row.role },
      wallet: row.xp == null ? null : {
        coins: row.coins, xp: row.xp,
        streak: row.streak, longest_streak: row.longest_streak, streak_shields: row.streak_shields,
        last_visit_day: row.last_visit_day,
        achievements: parse(row.achievements, []),
        vr_sessions: row.vr_sessions, meta_sessions: row.meta_sessions,
        quizzes_passed: row.quizzes_passed,
        modules_by_day: parse(row.modules_by_day, {}),
        daily: parse(row.daily, {}),
        quests_claimed: parse(row.quests_claimed, {}),
        updated_at: row.updated_at,
      },
    });
  });

  // PATCH /api/admin/users/:id/wallet — admin chỉnh ví thủ công (vd khôi phục
  // XP user mất do bug, thưởng coin cho sự kiện, reset streak). Chỉ field nào
  // truyền lên mới update; field còn lại giữ nguyên. Clamp ≥0 để chống nhập âm.
  const ALLOWED_WALLET_FIELDS = ['xp', 'coins', 'streak', 'longest_streak', 'streak_shields',
                                  'vr_sessions', 'meta_sessions', 'quizzes_passed'];
  r.patch('/api/admin/users/:id/wallet', requireAdmin, async (req, res) => {
    const id = Number(req.params.id);
    const cur = await Q.userWalletDetail.get(id);
    if (!cur) return res.status(404).json({ error: 'user_not_found' });
    const patch = req.body || {};
    const sets = [], vals = { id, updated_at: Date.now() };
    for (const f of ALLOWED_WALLET_FIELDS) {
      if (patch[f] != null) {
        sets.push(`${f} = @${f}`);
        vals[f] = Math.max(0, Math.floor(Number(patch[f])) || 0);
      }
    }
    if (!sets.length) return res.status(400).json({ error: 'no_fields' });
    // Wallet row có thể chưa tồn tại → INSERT trước với defaults rồi UPDATE.
    if (cur.xp == null) {
      await db.prepare(`INSERT INTO user_wallets (user_id, updated_at) VALUES (?, ?)`).run(id, Date.now());
    }
    await db.prepare(`UPDATE user_wallets SET ${sets.join(', ')}, updated_at = @updated_at WHERE user_id = @id`).run(vals);
    res.json({ ok: true, wallet: await Q.userWalletDetail.get(id) });
  });

  // Admin set gói cước thủ công (cấp/gia hạn/huỷ). cycle 'month'|'year'|null;
  // null + plan 'free' → vĩnh viễn. days override để cấp thử (vd trial 7 ngày).
  r.post('/api/admin/users/:id/plan', requireAdmin, async (req, res) => {
    const plan = String(req.body?.plan || '').toLowerCase();
    if (!VALID_USER_PLANS.has(plan)) return res.status(400).json({ error: 'invalid_plan' });
    const cycle = ['month', 'year'].includes(req.body?.cycle) ? req.body.cycle : null;
    const days = Number(req.body?.days) || 0;
    let expires_at = null;
    if (plan !== 'free' && plan !== 'guest') {
      if (days > 0) expires_at = Date.now() + days * 24 * 3600 * 1000;
      else if (cycle) expires_at = expiresAtFor(cycle);
      else expires_at = expiresAtFor('month');
    }
    await setUserPlan(Number(req.params.id), { plan, expires_at, cycle });
    res.json({ ok: true, plan, expires_at, cycle });
  });

  // Góp ý — xuyên tenant (giám sát Ban điều hành AI) + can thiệp status
  r.get('/api/admin/requests', requireAdmin, async (req, res) => {
    const limit = Math.min(Math.max(Number(req.query.limit) || 100, 1), 500);
    res.json({ requests: await Q.requests.all({ limit }) });
  });
  r.post('/api/admin/requests/:id/status', requireAdmin, async (req, res) => {
    const status = String(req.body?.status || '');
    if (!['pending', 'reviewing', 'awaiting_user', 'done', 'rejected'].includes(status)) return res.status(400).json({ error: 'invalid_status' });
    await Q.setRequestStatus.run({ id: Number(req.params.id), status, note: req.body?.note ? String(req.body.note).slice(0, 500) : null, t: Date.now() });
    res.json({ ok: true });
  });

  // Đóng góp ý + GỬI PHẢN HỒI cá nhân cho HS. Khác /status: bắt buộc message,
  // gửi notification vào hộp thư của HS (key theo display_name). Dùng khi đã xử
  // lý xong yêu cầu — UI bell ở HS sẽ kêu báo.
  const getRequestForReply = db.prepare(`SELECT id, student, title, domain FROM requests WHERE id = ?`);
  // Ghi audit trail vào ai_decisions với decided_by='human' để admin override trùng
  // schema với AI auto-decision — bảng audit chỉ có 1 nguồn sự thật.
  const insertHumanDecision = db.prepare(`
    INSERT INTO ai_decisions (request_id, decided_by, action, status_applied, reason, public_note, priority_score, confidence, created_at)
    VALUES (@request_id, 'human', @action, @status, @reason, @public_note, 100, 1.0, @t)
  `);
  const ACTION_BY_STATUS = { done: 'approve', rejected: 'reject', reviewing: 'approve', awaiting_user: 'defer' };

  r.post('/api/admin/requests/:id/reply', requireAdmin, async (req, res) => {
    const id = Number(req.params.id);
    const status = String(req.body?.status || 'done');
    if (!['done', 'rejected', 'reviewing', 'awaiting_user'].includes(status)) return res.status(400).json({ error: 'invalid_status' });
    const message = String(req.body?.message || '').trim();
    if (message.length < 4) return res.status(400).json({ error: 'message_too_short' });

    const reqRow = await getRequestForReply.get(id);
    if (!reqRow) return res.status(404).json({ error: 'request_not_found' });

    await Q.setRequestStatus.run({ id, status, note: message.slice(0, 500), t: Date.now() });

    await insertHumanDecision.run({
      request_id: id,
      action: ACTION_BY_STATUS[status],
      status, reason: `[admin] ${req.user.username} → ${status}`,
      public_note: message.slice(0, 500), t: Date.now(),
    });

    // Ghi tin vào thread để giữ luồng trao đổi nhiều lượt (HS có thể nhắn lại).
    // Hiển thị dưới danh nghĩa "Ban điều hành AI" — trường do AI điều hành.
    try {
      await addRequestMessage({ request_id: id, role: 'ai', author_name: 'Ban điều hành AI', body: message });
    } catch (e) { console.warn('[admin/reply] thread append failed:', e?.message || e); }

    const titleByStatus = {
      done:      'Yêu cầu của bạn đã hoàn thành ✓',
      rejected:  'Phản hồi về yêu cầu của bạn',
      reviewing: 'Yêu cầu của bạn đang được xử lý',
      awaiting_user: 'Yêu cầu của bạn cần bạn bổ sung thêm ⏳',
    };
    const notif = await createNotification({
      user_display_name: reqRow.student,
      request_id: id,
      kind: 'reply',
      title: titleByStatus[status],
      body: `「${reqRow.title}」 — ${message}`,
      url: `/space.html?domain=${encodeURIComponent(reqRow.domain || '')}#requests`,
    });
    res.json({ ok: true, status, notified: !!notif, notification_id: notif?.id || null });
  });

  // Audit quyết định AI — xuyên tenant (minh bạch "AI điều hành")
  r.get('/api/admin/ai-decisions', requireAdmin, async (req, res) => {
    if (!(await tableExists('ai_decisions'))) return res.json({ decisions: [] });
    const limit = Math.min(Math.max(Number(req.query.limit) || 100, 1), 500);
    res.json({ decisions: await db.prepare(`SELECT id, request_id, decided_by, action, status_applied, confidence, reason, created_at FROM ai_decisions ORDER BY created_at DESC LIMIT ?`).all(limit) });
  });

  // Kiểm duyệt học liệu AI sinh — gắn/bỏ cờ nội dung sai
  r.get('/api/admin/content', requireAdmin, async (req, res) => {
    if (!(await tableExists('ai_lesson_content'))) return res.json({ content: [] });
    const limit = Math.min(Math.max(Number(req.query.limit) || 100, 1), 500);
    res.json({ content: await db.prepare(`SELECT id, week_id, subject, kind, stem, flagged, created_at FROM ai_lesson_content ORDER BY created_at DESC LIMIT ?`).all(limit) });
  });
  r.post('/api/admin/content/:id/flag', requireAdmin, async (req, res) => {
    if (!(await tableExists('ai_lesson_content'))) return res.status(404).json({ error: 'no_content_table' });
    const flagged = req.body?.flagged ? 1 : 0;
    await db.prepare(`UPDATE ai_lesson_content SET flagged=? WHERE id=?`).run(flagged, Number(req.params.id));
    res.json({ ok: true, flagged: !!flagged });
  });

  // Gói cước — toàn hệ thống
  r.get('/api/admin/billing', requireAdmin, async (_req, res) => {
    if (!(await tableExists('subscriptions'))) return res.json({ subscriptions: [] });
    res.json({ subscriptions: await db.prepare(`SELECT s.* FROM subscriptions s ORDER BY s.id`).all() });
  });

  // ─────────────────────────────────────────────────────────────
  // Dashboard endpoints (single-page admin)
  // ─────────────────────────────────────────────────────────────

  // GET /api/admin/timeseries?days=30
  // Trả về [{date:'2026-05-31', attempts, users, requests, ai_tokens}] cho dashboard line/bar charts.
  // Lấp ngày trống = 0 để chart không gãy.
  r.get('/api/admin/timeseries', requireSchoolAccess(scopeDomain), async (req, res) => {
    const days = Math.min(Math.max(Number(req.query.days) || 30, 1), 90);
    const now = Date.now();
    const startMs = now - days * 86400_000;
    const domain = scopeDomain(req);
    const bucket = async (tbl, col = 'created_at') => {
      if (!(await tableExists(tbl))) return new Map();
      const rows = await db.prepare(`SELECT to_char(to_timestamp(${col}/1000.0) AT TIME ZONE 'Asia/Ho_Chi_Minh', 'YYYY-MM-DD') AS d, COUNT(*) AS n
                               FROM ${tbl} WHERE ${col} >= ? GROUP BY d`).all(startMs);
      return new Map(rows.map(r => [r.d, r.n]));
    };
    // Scoped-theo-trường: users theo enrolled_domain, attempts join qua display_name,
    // requests theo cột domain. AI tokens toàn cục → bỏ (series = 0).
    const bucketWhere = async (sql, ...args) => {
      const rows = await db.prepare(sql).all(...args);
      return new Map(rows.map(r => [r.d, r.n]));
    };
    let attempts, users, requests;
    if (domain) {
      users = await bucketWhere(`SELECT to_char(to_timestamp(created_at/1000.0) AT TIME ZONE 'Asia/Ho_Chi_Minh', 'YYYY-MM-DD') AS d, COUNT(*) AS n
                           FROM users WHERE enrolled_domain=? AND created_at>=? GROUP BY d`, domain, startMs);
      attempts = await bucketWhere(`SELECT to_char(to_timestamp(a.created_at/1000.0) AT TIME ZONE 'Asia/Ho_Chi_Minh', 'YYYY-MM-DD') AS d, COUNT(*) AS n
                              FROM attempts a JOIN users u ON a.player_name=u.display_name
                              WHERE u.enrolled_domain=? AND a.created_at>=? GROUP BY d`, domain, startMs);
      requests = await bucketWhere(`SELECT to_char(to_timestamp(created_at/1000.0) AT TIME ZONE 'Asia/Ho_Chi_Minh', 'YYYY-MM-DD') AS d, COUNT(*) AS n
                              FROM requests WHERE domain=? AND created_at>=? GROUP BY d`, domain, startMs);
    } else {
      attempts = await bucket('attempts');
      users = await bucket('users');
      requests = await bucket('requests');
    }
    let aiTokens = new Map(); // AI token toàn cục — scoped-theo-trường bỏ qua (giữ 0)
    if (!domain && await tableExists('ai_token_usage')) {
      const rows = await db.prepare(`SELECT to_char(to_timestamp(created_at/1000.0) AT TIME ZONE 'Asia/Ho_Chi_Minh', 'YYYY-MM-DD') AS d,
                                      SUM(prompt_tokens + completion_tokens) AS n
                               FROM ai_token_usage WHERE created_at >= ? GROUP BY d`).all(startMs);
      aiTokens = new Map(rows.map(r => [r.d, r.n || 0]));
    }
    const series = [];
    for (let i = days - 1; i >= 0; i--) {
      const d = new Date(now - i * 86400_000);
      d.setUTCHours(d.getUTCHours() + 7); // +07 VN
      const key = d.toISOString().slice(0, 10);
      series.push({
        date: key,
        attempts: attempts.get(key) || 0,
        users: users.get(key) || 0,
        requests: requests.get(key) || 0,
        ai_tokens: aiTokens.get(key) || 0,
      });
    }
    res.json({ days, series });
  });

  // GET /api/admin/ai-tokens-by-model?days=30 — breakdown tokens by model (bar/donut chart)
  r.get('/api/admin/ai-tokens-by-model', requireAdmin, async (req, res) => {
    if (!(await tableExists('ai_token_usage'))) return res.json({ models: [] });
    const days = Math.min(Math.max(Number(req.query.days) || 30, 1), 90);
    const startMs = Date.now() - days * 86400_000;
    const rows = await db.prepare(`SELECT model, provider,
        SUM(prompt_tokens) AS pin, SUM(completion_tokens) AS pout,
        COUNT(*) AS calls, SUM(cost_usd_micros) AS cost_micros
      FROM ai_token_usage WHERE created_at >= ? GROUP BY model, provider
      ORDER BY (SUM(prompt_tokens) + SUM(completion_tokens)) DESC`).all(startMs);
    res.json({ days, models: rows });
  });

  // GET /api/admin/top?metric=students&limit=10
  r.get('/api/admin/top', requireSchoolAccess(scopeDomain), async (req, res) => {
    const metric = String(req.query.metric || 'students');
    const limit = Math.min(Math.max(Number(req.query.limit) || 10, 1), 50);
    const domain = scopeDomain(req);
    if (metric === 'students') {
      // Top theo lượt học (link attempts ↔ users qua player_name = display_name).
      // ?domain= → chỉ HS/SV đang theo trường đó (enrolled_domain).
      const rows = await db.prepare(`SELECT u.id, u.username, u.display_name, u.role,
          COUNT(a.id) AS attempts, COALESCE(SUM(a.score), 0) AS total_score, MAX(a.created_at) AS last_played
        FROM users u LEFT JOIN attempts a ON a.player_name = u.display_name
        WHERE u.role IN ('pupil','student')${domain ? ' AND u.enrolled_domain = @domain' : ''}
        GROUP BY u.id ORDER BY attempts DESC, total_score DESC LIMIT @limit`)
        .all(domain ? { domain, limit } : { limit });
      return res.json({ metric, domain: domain || null, rows });
    }
    res.status(400).json({ error: 'unknown_metric' });
  });

  // GET /api/admin/system — runtime info (uptime, memory, db size, node version)
  r.get('/api/admin/system', requireAdmin, async (_req, res) => {
    const mem = process.memoryUsage();
    let dbSize = null;
    try {
      const { statSync } = await import('node:fs');
      const dbPath = process.env.DATA_DIR ? `${process.env.DATA_DIR}/tizia.db` : null;
      if (dbPath) dbSize = statSync(dbPath).size;
    } catch {}
    res.json({
      uptime_seconds: Math.floor(process.uptime()),
      memory: { rss: mem.rss, heap_used: mem.heapUsed, heap_total: mem.heapTotal },
      node_version: process.version,
      platform: process.platform,
      db_size_bytes: dbSize,
      now_ms: Date.now(),
    });
  });

  // GET /api/admin/pageviews?days=30 — thống kê page_view cho dashboard
  // Bảng analytics_events có thể chưa tồn tại trên môi trường mới → fallback rỗng.
  r.get('/api/admin/pageviews', requireAdmin, async (req, res) => {
    const days = Math.min(Math.max(Number(req.query.days) || 30, 1), 90);
    if (!(await tableExists('analytics_events'))) {
      return res.json({ days, totals: { last_24h:0, last_7d:0, last_30d:0, unique_24h:0, unique_7d:0, unique_30d:0 }, by_day: [], top_paths: [], by_role: [] });
    }
    try { res.json(await getPageviewStats(days)); }
    catch (e) { res.status(500).json({ error: 'pageview_stats_failed', detail: String(e.message) }); }
  });

  // GET /api/admin/activity?limit=50 — feed gom new users, attempts, requests, analytics events
  r.get('/api/admin/activity', requireAdmin, async (req, res) => {
    const limit = Math.min(Math.max(Number(req.query.limit) || 50, 1), 200);
    const items = [];
    (await db.prepare(`SELECT id, username, display_name, role, created_at AS t
                FROM users ORDER BY created_at DESC LIMIT ?`).all(limit)).forEach(u => {
      items.push({ kind: 'user_register', t: u.t, user_id: u.id,
                   label: `@${u.username} (${u.display_name}) · ${u.role}` });
    });
    (await db.prepare(`SELECT id, player_name, version, score, total, correct, created_at AS t
                FROM attempts ORDER BY created_at DESC LIMIT ?`).all(limit)).forEach(a => {
      items.push({ kind: 'attempt', t: a.t,
                   label: `${a.player_name} · ${a.version} · ${a.score}đ (${a.correct}/${a.total})` });
    });
    (await db.prepare(`SELECT id, student, title, status, domain, created_at AS t
                FROM requests ORDER BY created_at DESC LIMIT ?`).all(limit)).forEach(r => {
      items.push({ kind: 'request', t: r.t,
                   label: `${r.student} · ${r.domain} · ${r.title}`.slice(0, 120), meta: { status: r.status } });
    });
    if (await tableExists('analytics_events')) {
      (await db.prepare(`SELECT id, name, user_id, path, ts AS t
                  FROM analytics_events ORDER BY ts DESC LIMIT ?`).all(limit)).forEach(e => {
        items.push({ kind: 'event', t: e.t, user_id: e.user_id,
                     label: `${e.name}${e.path ? ' · ' + e.path : ''}` });
      });
    }
    items.sort((a, b) => (b.t || 0) - (a.t || 0));
    res.json({ items: items.slice(0, limit) });
  });

  // GET /api/admin/overview2 — extend overview với delta 24h (không break /overview cũ)
  // ?domain=<id> → thống kê CHỈ trường đó (bỏ qua pageview/AI token toàn cục).
  r.get('/api/admin/overview2', requireSchoolAccess(scopeDomain), async (req, res) => {
    const now = Date.now();
    const t24 = now - 86400_000;
    const t48 = now - 2 * 86400_000;
    const count = async (sql, ...args) => { try { return (await db.prepare(sql).get(...args))?.c || 0; } catch { return 0; } };
    const domain = scopeDomain(req);
    if (domain) {
      // Scoped: attempts liên kết user qua player_name = display_name.
      const base = {
        users: await count(`SELECT COUNT(*) c FROM users WHERE enrolled_domain=?`, domain),
        attempts: await count(`SELECT COUNT(*) c FROM attempts a JOIN users u ON a.player_name=u.display_name WHERE u.enrolled_domain=?`, domain),
        requests: await count(`SELECT COUNT(*) c FROM requests WHERE domain=?`, domain),
        requests_pending: await count(`SELECT COUNT(*) c FROM requests WHERE domain=? AND status='pending'`, domain),
      };
      const delta = {
        users_24h: await count(`SELECT COUNT(*) c FROM users WHERE enrolled_domain=? AND created_at>=?`, domain, t24),
        users_prev_24h: await count(`SELECT COUNT(*) c FROM users WHERE enrolled_domain=? AND created_at>=? AND created_at<?`, domain, t48, t24),
        attempts_24h: await count(`SELECT COUNT(*) c FROM attempts a JOIN users u ON a.player_name=u.display_name WHERE u.enrolled_domain=? AND a.created_at>=?`, domain, t24),
        attempts_prev_24h: await count(`SELECT COUNT(*) c FROM attempts a JOIN users u ON a.player_name=u.display_name WHERE u.enrolled_domain=? AND a.created_at>=? AND a.created_at<?`, domain, t48, t24),
        requests_24h: await count(`SELECT COUNT(*) c FROM requests WHERE domain=? AND created_at>=?`, domain, t24),
        requests_prev_24h: await count(`SELECT COUNT(*) c FROM requests WHERE domain=? AND created_at>=? AND created_at<?`, domain, t48, t24),
      };
      const active_sessions = await count(`SELECT COUNT(DISTINCT s.user_id) c FROM sessions s JOIN users u ON u.id=s.user_id WHERE s.expires_at>? AND u.enrolled_domain=?`, now, domain);
      return res.json({ ...base, active_sessions, domain, delta });
    }
    const base = await Q.overview.get();
    const delta = {
      users_24h: await count(`SELECT COUNT(*) c FROM users WHERE created_at >= ?`, t24),
      users_prev_24h: await count(`SELECT COUNT(*) c FROM users WHERE created_at >= ? AND created_at < ?`, t48, t24),
      attempts_24h: await count(`SELECT COUNT(*) c FROM attempts WHERE created_at >= ?`, t24),
      attempts_prev_24h: await count(`SELECT COUNT(*) c FROM attempts WHERE created_at >= ? AND created_at < ?`, t48, t24),
      requests_24h: await count(`SELECT COUNT(*) c FROM requests WHERE created_at >= ?`, t24),
      requests_prev_24h: await count(`SELECT COUNT(*) c FROM requests WHERE created_at >= ? AND created_at < ?`, t48, t24),
    };
    const extra = {};
    if (await tableExists('ai_decisions')) extra.ai_decisions = await count(`SELECT COUNT(*) c FROM ai_decisions`);
    if (await tableExists('analytics_events')) {
      extra.events = await count(`SELECT COUNT(*) c FROM analytics_events`);
      extra.pageviews_24h = await count(`SELECT COUNT(*) c FROM analytics_events WHERE name='page_view' AND ts >= ?`, t24);
      extra.pageviews_7d = await count(`SELECT COUNT(*) c FROM analytics_events WHERE name='page_view' AND ts >= ?`, now - 7 * 86400_000);
      extra.pageviews_total = await count(`SELECT COUNT(*) c FROM analytics_events WHERE name='page_view'`);
    }
    if (await tableExists('subscriptions')) extra.paid_users = await count(`SELECT COUNT(*) c FROM subscriptions WHERE plan<>'free' AND status='active'`);
    if (await tableExists('ai_lesson_content')) extra.ai_content = await count(`SELECT COUNT(*) c FROM ai_lesson_content`);
    if (await tableExists('ai_token_usage')) {
      extra.ai_tokens_total = await count(`SELECT SUM(prompt_tokens + completion_tokens) c FROM ai_token_usage`);
      extra.ai_tokens_24h = await count(`SELECT SUM(prompt_tokens + completion_tokens) c FROM ai_token_usage WHERE created_at >= ?`, t24);
    }
    // "Đang online" = số user phân biệt còn session hợp lệ. Trước đây dùng
    // COUNT(*) → đếm row session (1 user x N tab/device = N session) khiến
    // số online vượt cả tổng user. DISTINCT user_id phản ánh đúng "ai đang
    // có session". Lưu ý: cookie session 30 ngày nên đây vẫn là "có thể vào
    // không cần đăng nhập lại", không phải realtime — để realtime cần track
    // last_seen riêng (chưa có cột này trong schema).
    extra.active_sessions = await count(`SELECT COUNT(DISTINCT user_id) c FROM sessions WHERE expires_at > ?`, now);
    res.json({ ...base, ...extra, delta });
  });

  // ─────────────────────────────────────────────────────────────
  // CRUD: Users (thêm Create / Edit / Reset password / Delete)
  // ─────────────────────────────────────────────────────────────

  // POST /api/admin/users — tạo user mới (admin có thể chọn mọi role kể cả admin)
  r.post('/api/admin/users', requireAdmin, async (req, res) => {
    const b = req.body ?? {};
    const username = String(b.username || '').trim();
    const password = String(b.password || '');
    const display_name = String(b.display_name || b.displayName || username).trim().slice(0, 60);
    const role = ['pupil', 'student', 'teacher', 'admin'].includes(b.role) ? b.role : 'student';
    const age = b.age != null && Number.isFinite(Number(b.age)) ? Math.floor(Number(b.age)) : null;
    const email = b.email ? String(b.email).trim().toLowerCase() : null;

    if (!USERNAME_RE.test(username)) return res.status(400).json({ error: 'invalid_username', message: 'username 3–32 ký tự a-z0-9_.- (case-insensitive)' });
    if (password.length < 6) return res.status(400).json({ error: 'weak_password', message: 'password tối thiểu 6 ký tự' });
    if (!display_name) return res.status(400).json({ error: 'missing_display_name' });
    if (await getUserByUsername(username)) return res.status(409).json({ error: 'username_exists' });
    if (age != null && (age < 3 || age > 100)) return res.status(400).json({ error: 'invalid_age', message: 'tuổi 3–100' });

    try {
      // createUser() chỉ cho role pupil/student/teacher → tạo trước rồi promote nếu cần admin.
      const safeRole = ['pupil','student','teacher'].includes(role) ? role : 'student';
      const { id } = await createUser({
        username, display_name, password_hash: hashPassword(password),
        role: safeRole, age,
      });
      if (role === 'admin') await db.prepare(`UPDATE users SET role='admin' WHERE id=?`).run(id);
      if (email) await db.prepare(`UPDATE users SET email=? WHERE id=?`).run(email, id);
      res.json({ ok: true, id, username, display_name, role });
    } catch (e) { res.status(500).json({ error: 'create_failed', detail: String(e.message) }); }
  });

  // PATCH /api/admin/users/:id — sửa thông tin partial (display_name/email/age)
  // Dùng dynamic SQL thay vì updateUserEditable() vì cái kia yêu cầu nguyên trường profile.
  r.patch('/api/admin/users/:id', requireAdmin, async (req, res) => {
    const id = Number(req.params.id);
    const u = await getUserById(id);
    if (!u) return res.status(404).json({ error: 'user_not_found' });
    const sets = [], vals = {};
    if (req.body?.display_name != null) {
      const v = String(req.body.display_name).trim().slice(0, 60);
      if (!v) return res.status(400).json({ error: 'empty_display_name' });
      sets.push('display_name = @display_name'); vals.display_name = v;
    }
    if (req.body?.email != null) {
      sets.push('email = @email');
      vals.email = req.body.email ? String(req.body.email).trim().toLowerCase().slice(0, 120) : null;
    }
    if (req.body?.age != null) {
      const a = Number(req.body.age);
      if (req.body.age === '' || a === 0) { sets.push('age = NULL'); }
      else if (!Number.isFinite(a) || a < 3 || a > 100) return res.status(400).json({ error: 'invalid_age', message: 'tuổi 3–100' });
      else { sets.push('age = @age'); vals.age = Math.floor(a); }
    }
    // Vai trò
    if (req.body?.role != null) {
      const role = String(req.body.role);
      if (!['pupil', 'student', 'teacher', 'admin'].includes(role)) return res.status(400).json({ error: 'invalid_role' });
      sets.push('role = @role'); vals.role = role;
    }
    // Lớp (HS 1–12) — '' hoặc 0 → NULL
    if (req.body?.grade != null) {
      if (req.body.grade === '' || Number(req.body.grade) === 0) { sets.push('grade = NULL'); }
      else {
        const g = Number(req.body.grade);
        if (!Number.isFinite(g) || g < 1 || g > 12) return res.status(400).json({ error: 'invalid_grade', message: 'lớp 1–12' });
        sets.push('grade = @grade'); vals.grade = Math.floor(g);
      }
    }
    // Ngành / Khoá / Tên trường / Trường đang học (enrolled_domain) — '' → NULL
    if (req.body?.major != null) { sets.push('major = @major'); vals.major = req.body.major ? String(req.body.major).trim().slice(0, 40) : null; }
    if (req.body?.cohort != null) { sets.push('cohort = @cohort'); vals.cohort = req.body.cohort ? String(req.body.cohort).trim().slice(0, 20) : null; }
    if (req.body?.school_name != null) { sets.push('school_name = @school_name'); vals.school_name = req.body.school_name ? String(req.body.school_name).trim().slice(0, 120) : null; }
    if (req.body?.enrolled_domain != null) { sets.push('enrolled_domain = @enrolled_domain'); vals.enrolled_domain = req.body.enrolled_domain ? String(req.body.enrolled_domain).trim().slice(0, 40) : null; }
    if (!sets.length) return res.status(400).json({ error: 'no_changes' });
    vals.id = id;
    try {
      await db.prepare(`UPDATE users SET ${sets.join(', ')} WHERE id = @id`).run(vals);
      res.json({ ok: true, user: await getUserById(id) });
    } catch (e) { res.status(500).json({ error: 'update_failed', detail: String(e.message) }); }
  });

  // POST /api/admin/users/:id/password — reset mật khẩu (admin override)
  r.post('/api/admin/users/:id/password', requireAdmin, async (req, res) => {
    const id = Number(req.params.id);
    const password = String(req.body?.password || '');
    if (password.length < 6) return res.status(400).json({ error: 'weak_password', message: 'password tối thiểu 6 ký tự' });
    const u = await getUserById(id);
    if (!u) return res.status(404).json({ error: 'user_not_found' });
    await db.prepare(`UPDATE users SET password_hash = ? WHERE id = ?`).run(hashPassword(password), id);
    // Invalidate mọi session hiện tại của user → buộc login lại
    await db.prepare(`DELETE FROM sessions WHERE user_id = ?`).run(id);
    res.json({ ok: true, message: 'password đã đổi, đã invalidate mọi session' });
  });

  // DELETE /api/admin/users/:id — xoá user (cascade sessions + oauth_identities)
  // Bảo vệ: không cho admin tự xoá; không cho xoá admin cuối cùng.
  r.delete('/api/admin/users/:id', requireAdmin, async (req, res) => {
    const id = Number(req.params.id);
    const u = await getUserById(id);
    if (!u) return res.status(404).json({ error: 'user_not_found' });
    if (id === req.user.id) return res.status(400).json({ error: 'cannot_delete_self', message: 'không thể xoá chính mình' });
    if (u.role === 'admin') {
      const adminCount = (await db.prepare(`SELECT COUNT(*) c FROM users WHERE role='admin'`).get()).c;
      if (adminCount <= 1) return res.status(400).json({ error: 'last_admin', message: 'không thể xoá admin cuối cùng' });
    }
    const tx = db.transaction(async (uid, displayName) => {
      await db.prepare(`DELETE FROM sessions WHERE user_id = ?`).run(uid);
      if (await tableExists('oauth_identities')) await db.prepare(`DELETE FROM oauth_identities WHERE user_id = ?`).run(uid);
      // notifications dùng user_display_name (chuỗi), không user_id — xoá theo display_name
      if (await tableExists('notifications') && displayName) {
        await db.prepare(`DELETE FROM notifications WHERE user_display_name = ?`).run(displayName);
      }
      // subscriptions là user-level — xoá theo user.
      if (await tableExists('subscriptions')) await db.prepare(`DELETE FROM subscriptions WHERE user_id = ?`).run(uid);
      // attempts/achievements link bằng player_name=display_name, để lại làm thống kê lịch sử.
      await db.prepare(`DELETE FROM users WHERE id = ?`).run(uid);
    });
    try { await tx(id, u.display_name); res.json({ ok: true, deleted: u.username }); }
    catch (e) { res.status(500).json({ error: 'delete_failed', detail: String(e.message) }); }
  });

  // ─────────────────────────────────────────────────────────────
  // CRUD: Requests + Content — chỉ thêm DELETE (status/reply đã có)
  // ─────────────────────────────────────────────────────────────

  r.delete('/api/admin/requests/:id', requireAdmin, async (req, res) => {
    const id = Number(req.params.id);
    const cur = await db.prepare(`SELECT id FROM requests WHERE id = ?`).get(id);
    if (!cur) return res.status(404).json({ error: 'request_not_found' });
    const tx = db.transaction(async (rid) => {
      if (await tableExists('ai_decisions')) await db.prepare(`DELETE FROM ai_decisions WHERE request_id = ?`).run(rid);
      await db.prepare(`DELETE FROM requests WHERE id = ?`).run(rid);
    });
    try { await tx(id); res.json({ ok: true, deleted: id }); }
    catch (e) { res.status(500).json({ error: 'delete_failed', detail: String(e.message) }); }
  });

  r.delete('/api/admin/content/:id', requireAdmin, async (req, res) => {
    if (!(await tableExists('ai_lesson_content'))) return res.status(404).json({ error: 'no_content_table' });
    const id = Number(req.params.id);
    const info = await db.prepare(`DELETE FROM ai_lesson_content WHERE id = ?`).run(id);
    if (info.changes === 0) return res.status(404).json({ error: 'content_not_found' });
    res.json({ ok: true, deleted: id });
  });

  // Trục 2: log prompt AI của HS — GV/admin xem được. ?blocked=1 lọc prompt đã bị filter chặn.
  r.get('/api/teacher/ai-prompts', async (req, res) => {
    if (!req.user) return res.status(401).json({ error: 'unauthorized' });
    if (!['teacher', 'admin'].includes(req.user.role)) {
      return res.status(403).json({ error: 'forbidden', message: 'Chỉ giảng viên hoặc admin xem được' });
    }
    const blockedOnly = req.query.blocked === '1' || req.query.blocked === 'true';
    const limit = Number(req.query.limit) || 50;
    res.json({ logs: await listAiPrompts({ blockedOnly, limit }) });
  });

  r.get('/api/admin/ai-prompts', requireAdmin, async (req, res) => {
    const blockedOnly = req.query.blocked === '1';
    const limit = Number(req.query.limit) || 100;
    res.json({ logs: await listAiPrompts({ blockedOnly, limit }) });
  });

  // GET /api/me/ai-prompts — chính user xem log của mình (HS xem lại câu mình hỏi
  // hôm qua, hoặc cùng PH coi). Không có phân quyền chéo.
  r.get('/api/me/ai-prompts', async (req, res) => {
    if (!req.user) return res.status(401).json({ error: 'unauthorized' });
    const limit = Number(req.query.limit) || 50;
    res.json({ logs: await listAiPromptsForUser(req.user.id, limit) });
  });

  // Backup/restore (xuất nhập file SQLite + auto snapshot hàng ngày)
  attachBackup(r);
  scheduleAutoBackup();

  // Admin DB CRUD (browse/edit table + SQL console + audit) — tab CSDL ở FE
  attachAdminDb(r);

  console.log('[admin] routes mounted: /api/admin/* (role=admin) + dashboard + CRUD + ai-prompt logs + backup + db-admin');
}
