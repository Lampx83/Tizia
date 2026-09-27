import express from 'express';
import compression from 'compression';
import http from 'node:http';
import path from 'node:path';
import fs from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { db, initDb, insertAttempt, getLeaderboard, getStats, getRecent, getAllAttempts, getHistogram, getConfusion, getAchievements, unlockAchievement, createClass, getClassByCode, listClasses, getClassMembers, getClassAttempts, getPlayerAttempts, createRequest, listRequests, voteRequest, setRequestStatus, getRequestStats, getRequestById, addRequestMessage, listRequestMessages, reopenRequestIfClosed, listNotifications, countUnreadNotifications, markNotificationRead, markAllNotificationsRead, getUserWallet, upsertUserWallet, getScenarioRunsForUser, recordScenarioRunDb, getUserState, putUserState, UserStateValueTooLargeError } from './db.js';
import { attachRoom } from './room.js';
import { attachAi } from './ai.js';
import { attachTts } from './tts.js';
import { attachPharmacy } from './pharmacy.js';
import { acknowledgeNewRequest, getDecisionsForRequest, getRecentDecisions } from './contexts/ai-agent/decisions.js';
import { attachAiBoardInbox } from './contexts/ai-agent/inbox-api.js';
import { attachAppProxies } from './app-proxy.js';
import { attachScoreUpWebhook } from './contexts/integration/scoreup-webhook.js';
import { attachCodelabWebhook } from './contexts/integration/codelab-webhook.js';
import * as scoreup from './integrations/scoreup.js';
import * as codelab from './integrations/codelab.js';
import { getContestProblemSlugs, getContestName, hasContestMapping } from './integrations/codelab-contests.js';
import { countCodelabAcceptedProblems, DATA_DIR } from './db.js';
import { recordQuestionAttempt, getRecentQuestionAttempts, getSrsStateByPrefix, recordSrsReview, pruneScoreUpEventsSeen } from './db.js';
import { attachAssets } from './assets.js';
import { attachAdaptive } from './adaptive.js';
import { attachLessons } from './lessons.js';
import { attachUser, makeAuthGate, makeProfileGate, requireAuth, requireEnrolled, attachAuth } from './contexts/identity/auth.js';
import { attachOAuth, listEnabledProviders } from './contexts/identity/oauth.js';
import { attachSeo } from './contexts/seo/index.js';
import { injectSeoHead, originOf as seoOriginOf } from './contexts/seo/inject.js';
import { attachAnalytics } from './contexts/analytics/index.js';
import { sendGA4Event } from './contexts/analytics/ga4-mp.js';
import { attachBilling } from './contexts/billing/index.js';
import { attachIntegration } from './contexts/integration/index.js';
import { attachAdmin, requireAdmin, requireSchoolAccess } from './contexts/admin/index.js';
import { attachAdminDb } from './contexts/admin/db-admin.js';
import { attachEngagement, trackEngagementProgress, initEngagement } from './contexts/engagement/index.js';
import { addLeagueWeekXp } from './contexts/engagement/league.js';
import { attachLearning, updateIrt, initLearning } from './contexts/learning/index.js';
import { attachCurriculum } from './contexts/curriculum/index.js';
import { attachContent } from './contexts/content/index.js';
import { attachPresence } from './contexts/multiplayer/presence.js';
import { attachUgc } from './contexts/ugc/index.js';
import { attachEconomy, addBpXp, initEconomy } from './contexts/economy/index.js';
import { attachParentReport } from './contexts/parent-report/index.js';
import { attachTeacher } from './contexts/teacher/index.js';
import { attachExperiments, getVariant, checkFlag, initExperiments } from './contexts/experiments/index.js';
import { attachLiveQuizHttp, attachLiveQuizWs } from './contexts/live-quiz/index.js';
import { attachSrs } from './contexts/srs/index.js';
import { attachSmartNotif, scheduleSmartNudges, logActivity, initSmartNotif } from './contexts/smart-notif/index.js';
import { attachFeatureGate } from './contexts/feature-gate/index.js';
import { attachDashboard } from './contexts/dashboard/index.js';
import { attachCampusLayout } from './contexts/campus/layout.js';
import { attachPortalApps } from './contexts/portal-apps/index.js';
import { attachPortalAgents } from './contexts/portal-agents/index.js';
import { attachSkills, grantSkillsForSpace, grantSkillsForScenario } from './skills.js';
import { attachSecurity, securityHeaders, csrf, apiLimiter, sensitiveAuthLimiter } from './contexts/security/index.js';
import { log, initErrorTracking, installProcessGuards, requestContext, requestLogger, expressErrorHandler } from './observability.js';
// Payment context — chỉ nạp khi PAYMENT_ENABLED=1 (dynamic import bên dưới) để bảng
// payment + route KHÔNG xuất hiện ở deployment chưa bật thanh toán.
const PAYMENT_ENABLED = process.env.PAYMENT_ENABLED === '1';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = path.resolve(__dirname, '..');
const PUBLIC_DIR = path.resolve(ROOT_DIR, 'public');
const MEDIAPIPE_DIR = path.resolve(ROOT_DIR, 'node_modules', '@mediapipe', 'tasks-vision');
// Thư mục lưu ảnh/file đính kèm cho "Ban điều hành AI". Tạo lười khi cần.
// File phục vụ qua /uploads/requests/... (mount express.static phía dưới).
// Đặt dưới DATA_DIR (volume) chứ KHÔNG dưới ROOT_DIR: /app nằm trong image nên
// mọi file SV gửi kèm sẽ bị xoá mỗi lần container recreate/rebuild.
const REQUEST_UPLOADS_DIR = path.resolve(DATA_DIR, 'uploads', 'requests');
const PORT = Number(process.env.PORT) || 8041;
const HOST = process.env.HOST || '0.0.0.0';
// Optional path prefix when deployed behind a reverse proxy at a sub-path
// e.g. https://tizia.vn/ps/* → set BASE_PATH=/ps so all routes work under /ps.
const BASE_PATH = (process.env.BASE_PATH || '').replace(/\/$/, '');

const VALID_VERSIONS = new Set([
  '2d-arcade', '3d-shelf', 'quiz', 'metaverse', 'time-attack', 'race',
  'sac-ky-2d', 'sac-ky-3d', 'sac-ky-vr-web', 'sac-ky-quiz', 'sac-ky-meta',
  'compounding-lab',
]);

// Module L1–L5 scenario IDs từ engine (format "L<year>.<idx>-<slug>") đều hợp lệ.
// Cho phép qua bằng regex để khỏi phải liệt kê 38 module.
const SCENARIO_ID_PATTERN = /^L[1-5]\.\d+(-[a-z0-9-]+)?$/;
function isValidVersion(v) {
  return VALID_VERSIONS.has(v) || SCENARIO_ID_PATTERN.test(v);
}

// Badge definitions used by both backend (auto-unlock) and frontend (display).
// Trục 3: audience phân biệt HS / SV.
//   - 'all'     : hiện cho mọi role (chung)
//   - 'pupil'   : chỉ HS thấy (cute, dễ đạt, nhịp ngắn)
//   - 'student' : chỉ SV thấy (chuyên ngành, cạnh tranh, khó hơn)
// Backend dùng audience để skip không tự unlock badge "ngoài role" (vd HS không
// bao giờ trigger tlc-* dù tình cờ chạy version sắc ký demo).
const BADGES = [
  // Common (mọi role)
  { id: 'first-play',     icon: '🎮', label: 'Lần đầu chơi',         desc: 'Hoàn thành lượt đầu tiên',           audience: 'all' },
  { id: 'perfect-1',      icon: '🎯', label: 'Perfect đầu tay',      desc: 'Đạt 100% lần đầu',                   audience: 'all' },
  { id: 'perfect-5',      icon: '⭐', label: '5 lần Perfect',         desc: 'Đạt 100% năm lần',                   audience: 'all' },
  { id: 'speed-demon',    icon: '⚡', label: 'Tốc độ ánh sáng',       desc: 'Hoàn thành < 20 giây',               audience: 'all' },
  { id: 'all-modes',      icon: '🏆', label: 'Bậc thầy đa mode',     desc: 'Chơi đủ cả 4 mode chính',            audience: 'all' },
  // Student (chuyên ngành, khó)
  { id: 'hard-perfect',   icon: '👑', label: 'Vua khó nhằn',         desc: 'Perfect ở chế độ Khó (8 loại)',      audience: 'student' },
  { id: 'metaverse-host', icon: '🌐', label: 'Cư dân Metaverse',     desc: 'Tham gia phòng metaverse',           audience: 'student' },
  // Sắc ký TLC badges — chuyên Dược (SV)
  { id: 'tlc-first',      icon: '🧪', label: 'Nhà phân tích TLC',    desc: 'Hoàn thành lượt sắc ký đầu tiên',    audience: 'student' },
  { id: 'tlc-perfect-rf', icon: '🎯', label: 'Rf hoàn hảo',          desc: 'Đo cả 3 Rf chính xác trong ±0.05',   audience: 'student' },
  { id: 'tlc-speed',      icon: '⚡', label: 'Tốc độ sắc ký',         desc: 'Hoàn thành TLC dưới 60 giây',        audience: 'student' },
  { id: 'tlc-all-modes',  icon: '🏅', label: 'Đa nền tảng TLC',      desc: 'Chơi đủ 5 phiên bản web Sắc ký',     audience: 'student' },
  { id: 'tlc-meta-host',  icon: '🌐', label: 'Học viên Meta-Sắc-ký', desc: 'Tham gia phòng Metaverse Sắc ký',    audience: 'student' },
  // Pupil (HS — vui, dễ đạt, nhịp ngắn, thưởng sticker/pet feel)
  { id: 'sticker-collector', icon: '🌟', label: 'Sao học sinh',       desc: 'Hoàn thành 3 bài bất kỳ',            audience: 'pupil' },
  { id: 'streak-3',          icon: '🔥', label: 'Chuỗi 3 ngày',       desc: 'Học 3 ngày liên tiếp',               audience: 'pupil' },
  { id: 'streak-7',          icon: '🌈', label: 'Tuần lễ chăm chỉ',   desc: 'Học 7 ngày liên tiếp',               audience: 'pupil' },
  { id: 'math-hero',         icon: '➕', label: 'Anh hùng Toán',      desc: 'Perfect 3 bài Toán liên tiếp',       audience: 'pupil' },
  { id: 'reading-hero',      icon: '📖', label: 'Mọt sách Tiếng Việt', desc: 'Đọc xong 5 bài Tiếng Việt',         audience: 'pupil' },
  { id: 'parent-show',       icon: '👨‍👩‍👧', label: 'Khoe bố mẹ',         desc: 'Bấm "khoe điểm" với phụ huynh',     audience: 'pupil' },
];

// True nếu badge này phù hợp với role hiện tại. role='all' luôn pass.
function badgeApplies(badge, role) {
  if (!badge.audience || badge.audience === 'all') return true;
  return badge.audience === role;
}

// Đếm số ngày liên tiếp tính ngược từ ngày mới nhất. Input là array string ngày
// 'YYYY-MM-DD' đã sort DESC. Vd ['2026-05-31','2026-05-30','2026-05-29','2026-05-27']
// → 3 (đứt ở 28). Empty → 0.
function consecutiveDays(days) {
  if (!days || !days.length) return 0;
  let count = 1;
  for (let i = 1; i < days.length; i++) {
    const prev = new Date(days[i - 1] + 'T00:00:00Z').getTime();
    const cur  = new Date(days[i]     + 'T00:00:00Z').getTime();
    if (prev - cur === 86400000) count++;
    else break;
  }
  return count;
}

// Trục 3: nhận thêm `role` để gate badge audience. Nếu role không khớp audience,
// silent skip (vd HS không trigger 'hard-perfect' dù chạy mode khó). Caller (route
// /api/attempts) phải truyền role; default 'student' để backward-compat.
async function checkAndUnlockBadges(playerName, attempt, role = 'student') {
  const newly = [];
  const tryUnlock = async (badgeId) => {
    const b = BADGES.find(x => x.id === badgeId);
    if (!b || !badgeApplies(b, role)) return;       // skip nếu badge không cho role này
    if (await unlockAchievement(playerName, badgeId)) newly.push(b);
  };
  await tryUnlock('first-play');
  if (attempt.correct === attempt.total && attempt.total > 0) {
    await tryUnlock('perfect-1');
    const allPerfect = await db.prepare(`
      SELECT COUNT(*) AS c FROM attempts
      WHERE player_name = ? AND correct = total AND total > 0
    `).get(playerName);
    if ((allPerfect?.c ?? 0) >= 5) await tryUnlock('perfect-5');
    if (attempt.total >= 8) await tryUnlock('hard-perfect');
  }
  if (attempt.durationMs && attempt.durationMs < 20000) await tryUnlock('speed-demon');
  const distinct = await db.prepare(`
    SELECT COUNT(DISTINCT version) AS c FROM attempts WHERE player_name = ?
  `).get(playerName);
  if ((distinct?.c ?? 0) >= 4) await tryUnlock('all-modes');
  if (attempt.version === 'metaverse') await tryUnlock('metaverse-host');

  // ── HS-specific (Trục 3) ──
  if (role === 'pupil') {
    const totalAttempts = (await db.prepare(`SELECT COUNT(*) AS c FROM attempts WHERE player_name = ?`).get(playerName))?.c || 0;
    if (totalAttempts >= 3) await tryUnlock('sticker-collector');
    // Streak ngày: dùng DATE(created_at/1000, 'unixepoch') để gom theo ngày.
    const days = (await db.prepare(`
      SELECT DISTINCT to_char(to_timestamp(created_at/1000.0) AT TIME ZONE 'UTC', 'YYYY-MM-DD') AS d FROM attempts
      WHERE player_name = ? ORDER BY d DESC LIMIT 10
    `).all(playerName)).map(r => r.d);
    const streak = consecutiveDays(days);
    if (streak >= 3) await tryUnlock('streak-3');
    if (streak >= 7) await tryUnlock('streak-7');
    // Math hero: 3 bài Toán liên tiếp perfect — phát hiện qua version chứa 'toan' hoặc subject='Toán'
    if (attempt.correct === attempt.total && attempt.total > 0
        && (String(attempt.version || '').toLowerCase().includes('toan')
            || String(attempt.subject || '').toLowerCase().includes('toán'))) {
      const last3 = await db.prepare(`
        SELECT correct, total, version FROM attempts
        WHERE player_name = ? AND (lower(version) LIKE '%toan%' OR lower(version) LIKE '%math%')
        ORDER BY created_at DESC LIMIT 3
      `).all(playerName);
      if (last3.length >= 3 && last3.every(a => a.correct === a.total && a.total > 0)) await tryUnlock('math-hero');
    }
    // Reading hero: 5 lượt môn Tiếng Việt
    const tvCount = (await db.prepare(`
      SELECT COUNT(*) AS c FROM attempts
      WHERE player_name = ? AND (lower(version) LIKE '%tieng-viet%' OR lower(version) LIKE '%tv-%')
    `).get(playerName))?.c || 0;
    if (tvCount >= 5) await tryUnlock('reading-hero');
  }

  // === Sắc ký TLC badges ===
  const SACKY_VERSIONS = ['sac-ky-2d', 'sac-ky-3d', 'sac-ky-vr-web', 'sac-ky-quiz', 'sac-ky-meta'];
  if (SACKY_VERSIONS.includes(attempt.version)) {
    await tryUnlock('tlc-first');
    if (attempt.version === 'sac-ky-meta') await tryUnlock('tlc-meta-host');
    // Perfect Rf: parse details — at least 3 measurements within ±0.05
    try {
      if (attempt.details) {
        const d = JSON.parse(attempt.details);
        if (Array.isArray(d.samples)) {
          const allClose = d.samples.length >= 3 && d.samples.every(s =>
            s.measuredRf != null && Math.abs(s.measuredRf - s.trueRf) <= 0.05
          );
          if (allClose) await tryUnlock('tlc-perfect-rf');
        }
      }
    } catch {}
    if (attempt.durationMs && attempt.durationMs < 60000) await tryUnlock('tlc-speed');
    // All 5 sắc ký versions
    const sackyDistinct = await db.prepare(`
      SELECT COUNT(DISTINCT version) AS c FROM attempts
      WHERE player_name = ? AND version IN ('sac-ky-2d', 'sac-ky-3d', 'sac-ky-vr-web', 'sac-ky-quiz', 'sac-ky-meta')
    `).get(playerName);
    if ((sackyDistinct?.c ?? 0) >= 5) await tryUnlock('tlc-all-modes');
  }
  return newly;
}

// Lưới an toàn process-level: bắt unhandledRejection/uncaughtException → log +
// report (trước đây không có → lỗi async làm crash âm thầm, không dấu vết).
installProcessGuards();

const app = express();
app.disable('x-powered-by');
// Tin tưởng reverse proxy (NPM) phía trước — để req.protocol/x-forwarded-* trả đúng
// https://, dùng cho canonical SEO + cookie secure flag chuẩn.
app.set('trust proxy', 1);

// req.id ngắn cho mỗi request (nối các dòng log + trả về header X-Request-Id).
// Đặt sớm nhất để mọi middleware/route phía sau đều có. Log request là opt-in
// (LOG_REQUESTS=1) để tránh ồn ở prod khi chưa cần.
app.use(requestContext);
if (process.env.LOG_REQUESTS === '1') app.use(requestLogger());

// gzip/deflate cho mọi response text-based. SEO bonus: trang nhẹ → Lighthouse cao
// → Core Web Vitals tốt. Skip nếu client gửi x-no-compression hoặc đã có CE.
app.use(compression({ threshold: 1024 }));

// Security headers (R6) — an toàn áp mọi response. Rate-limit auth (pre-auth, theo IP).
app.use(securityHeaders);
app.use(['/api/auth/login', '/api/auth/register'], sensitiveAuthLimiter);

// SEO: Content-Language vi cho mọi response (Tizia là sản phẩm VN), + X-Robots-Tag
// noindex,nofollow cho trang nội bộ/quản trị/cast (backup ngoài auth gate + meta robots).
// Áp sớm để cả file static lẫn route động đều nhận header.
const NOINDEX_HEADER_EXACT = new Set([
  '/admin.html', '/dashboard.html', '/family.html', '/teacher.html',
  '/complete-profile.html', '/lesson-builder.html', '/cast.html', '/devices.html',
]);
const NOINDEX_HEADER_PREFIXES = ['/admin/', '/parent/', '/gv/', '/live-quiz/', '/api/', '/sim/', '/uploads/'];
app.use((req, res, next) => {
  res.setHeader('Content-Language', 'vi');
  const p = req.path;
  const noindex = NOINDEX_HEADER_EXACT.has(p)
    || NOINDEX_HEADER_PREFIXES.some((pref) => p.startsWith(pref));
  if (noindex) res.setHeader('X-Robots-Tag', 'noindex, nofollow');
  next();
});

// Đăng nhập là điều kiện tiên quyết để dùng Tizia.
// attachUser luôn gắn req.user (nullable). makeAuthGate redirect HTML chưa login về /login.html
// và trả 401 cho /api/* (trừ /api/auth/*, /api/health). Phải nằm TRƯỚC attachAppProxies để
// các app anh em (/scoreup, /codelab, …) cũng được gate trên cùng origin.
app.use((req, _res, next) => { attachUser(req, _res, next).catch(next); });
app.use(makeAuthGate({ basePath: BASE_PATH }));
// Trục 1: ép user (đã login) khai bổ sung profile HS/SV nếu thiếu. SAU makeAuthGate
// (để chỉ áp dụng cho user đã login) và TRƯỚC attachAppProxies (để app anh em cũng
// bị chặn nếu user chưa hoàn tất profile).
app.use(makeProfileGate({ basePath: BASE_PATH }));
// Rate-limit CHỈ /api/* (không tính static asset) + key theo user (R5) — SAU attachUser.
app.use('/api', apiLimiter);

// Integrated sibling apps — each reverse-proxied under its own sub-path so the
// whole suite is reachable on Tizia's single origin (iframe + cookie/auth
// friendly). Targets are configurable per deployment via *_TARGET env vars;
// *_PUBLIC_PATH only when the upstream was built with a basePath != its mount.
// Apps that aren't running degrade to a graceful "chưa chạy" page. Surfaced to
// users via public/apps.html. MUST stay before express.json (stream POST bodies).
attachAppProxies(app, [
  {
    id: 'scoreup', label: 'ScoreUp', mount: `${BASE_PATH}/scoreup`,
    target: process.env.SCOREUP_TARGET || 'http://127.0.0.1:3000',
    publicPath: process.env.SCOREUP_PUBLIC_PATH || undefined,
    startHint: 'cd ScoreUp && ./scripts/dev.sh up',
  },
  {
    id: 'codelab', label: 'Codelab (NEU OJ)', mount: `${BASE_PATH}/codelab`,
    target: process.env.CODELAB_TARGET || 'http://127.0.0.1:8024',
    publicPath: process.env.CODELAB_PUBLIC_PATH || undefined,
    startHint: 'cd Codelab && docker compose up -d',
  },
  {
    id: 'smartdoc', label: 'Smartdoc', mount: `${BASE_PATH}/smartdoc`,
    target: process.env.SMARTDOC_TARGET || 'http://127.0.0.1:8017',
    publicPath: process.env.SMARTDOC_PUBLIC_PATH || undefined,
    startHint: 'cd Smartdoc && docker compose up -d',
  },
  {
    id: 'feedback', label: 'FeedBackMe', mount: `${BASE_PATH}/feedback`,
    target: process.env.FEEDBACK_TARGET || 'http://127.0.0.1:3300',
    publicPath: process.env.FEEDBACK_PUBLIC_PATH || undefined,
    startHint: 'cd FeedBackMe && pnpm db:up && pnpm dev',
  },
].map((c) => ({ ...c, publicPath: c.publicPath || c.mount, backHref: `${BASE_PATH || ''}/apps.html` })));

// ScoreUp webhook receiver — POST /api/webhooks/scoreup với express.raw()
// (cần raw bytes để verify HMAC). MUST nằm trước express.json. Auth gate đã
// whitelist '/api/webhooks/' để webhook ScoreUp không có session vẫn qua được.
attachScoreUpWebhook(app);
// Codelab webhook receiver — POST /api/webhooks/codelab. Cùng yêu cầu raw bytes
// + cùng whitelist '/api/webhooks/'. Fire khi Judge0 chấm xong submission Tizia.
attachCodelabWebhook(app);

app.use(express.json({ limit: '64kb' }));
// CSRF double-submit (R4) — sau express.json (cần req.body cho fallback _csrf).
// Log-only mặc định; CSRF_ENFORCE=1 để chặn (khi FE đã gửi header X-CSRF-Token).
app.use(csrf);

// All routes attached to this Router. The Router is then mounted at
// BASE_PATH (defaults to '/') so the same code serves either at root
// or under a sub-path like /ps.
const r = express.Router();

r.get('/api/health', (_req, res) => {
  // ok:true giữ nguyên để Docker HEALTHCHECK (wget /api/health) vẫn pass; bổ sung
  // uptime + memory để phát hiện sớm memory leak / process vừa restart.
  const mem = process.memoryUsage();
  res.json({
    ok: true, service: 'tizia', port: PORT, basePath: BASE_PATH, time: Date.now(),
    uptime_s: Math.round(process.uptime()),
    rss_mb: Math.round(mem.rss / 1048576),
    heap_used_mb: Math.round(mem.heapUsed / 1048576),
    node: process.version,
    env: process.env.NODE_ENV || 'development',
  });
});

// SEO public (robots.txt, sitemap.xml, /welcome) — crawlable, ngoài auth gate.
attachSeo(r, { basePath: BASE_PATH });

// Đăng ký / đăng nhập / logout / me
attachAuth(r);
// SSO/OAuth providers (Google/Microsoft/GitHub). Chỉ bật những provider có env CLIENT_ID/SECRET.
attachOAuth(r, { basePath: BASE_PATH });
// Analytics (#6 pipeline + #5 funnel), Billing (#5 gói/entitlement), Integration (#3 outbox).
attachAnalytics(r);
attachBilling(r);
attachIntegration(r);
// Security token endpoint (/api/csrf) + Admin xuyên tenant (role=admin).
attachSecurity(r);
attachAdmin(r);
attachAdminDb(r);
// Hộp thư Ban điều hành AI (đọc-chỉ, auth bằng header x-ai-board-key). Chỉ được
// mount khi env AI_BOARD_KEY đủ mạnh — không set thì không có route nào thêm.
attachAiBoardInbox(r);
attachCampusLayout(r, requireAdmin, requireSchoolAccess);
// Portal Apps — Developer cài SPA theo chuẩn AI Portal (manifest + zip).
attachPortalApps(r, { requireAuth, requireAdmin, basePath: BASE_PATH });
attachPortalAgents(r, { requireAuth, requireAdmin });
attachSkills(r, { requireAuth, requireEnrolled });
// Engagement loop — Streak / Hearts / Daily Quests (Trục A — Duolingo/Prodigy)
attachEngagement(r);
// Learning depth — Knowledge graph + Adaptive next-question (Trục B — Khanmigo/Squirrel)
attachLearning(r);
// Curriculum — content học (quiz + lý thuyết) lưu DB, sửa nóng + admin CRUD
attachCurriculum(r);
// Content store tổng quát — data heterogeneous (ca lâm sàng, nhân vật LS, thuốc…)
attachContent(r);
// UGC marketplace — Quest Builder + Play + Like/Flag (Trục C — Roblox Edu)
attachUgc(r);
// Economy — Battle Pass + Skin Shop + Daily Login Bonus
attachEconomy(r);
// Parent Weekly Report
attachParentReport(r);
// Teacher — Team Quest + Class Leaderboard
attachTeacher(r);
// Experiments + Feature Flags + Event Registry
attachExperiments(r);
// Live Quiz HTTP routes (WebSocket /ws-live attached later khi có httpServer)
attachLiveQuizHttp(r);
// SRS Flashcards — review queue + decks
attachSrs(r);
// Smart Notifications — activity log + best-time-to-nudge analytics + web push
attachSmartNotif(r);
scheduleSmartNudges();
// Feature Gate — Progressive Disclosure (Duolingo-style)
attachFeatureGate(r);
// Dashboard — single source of truth (personal + engagement + league + recs)
attachDashboard(r);


r.post('/api/attempts', requireAuth, requireEnrolled, async (req, res) => {
  const b = req.body ?? {};
  const version = String(b.version || '');
  if (!isValidVersion(version)) {
    return res.status(400).json({ error: `version must be one of ${[...VALID_VERSIONS].join(', ')}` });
  }
  const score   = Number.isFinite(b.score)   ? Math.floor(b.score)   : null;
  const correct = Number.isFinite(b.correct) ? Math.floor(b.correct) : null;
  const total   = Number.isFinite(b.total)   ? Math.floor(b.total)   : null;
  if (score === null || correct === null || total === null) {
    return res.status(400).json({ error: 'score, correct, total are required numbers' });
  }
  // playerName lấy từ session — client không thể giả mạo. Không login → 401 ở requireAuth.
  const playerName = String(req.user.display_name || req.user.username || 'Ẩn danh').slice(0, 60);
  const durationMs = Number.isFinite(b.durationMs) ? Math.floor(b.durationMs) : null;
  const details = b.details != null ? JSON.stringify(b.details).slice(0, 4000) : null;
  const classCode = (typeof b.classCode === 'string' && b.classCode.trim())
    ? b.classCode.trim().slice(0, 16) : null;
  const levelN = Number.isFinite(b.level) ? Math.floor(b.level) : null;
  const result = await insertAttempt({
    version, player_name: playerName, score, correct, total,
    duration_ms: durationMs, details, created_at: Date.now(),
    class_code: classCode, level_n: levelN,
  });
  const newBadges = await checkAndUnlockBadges(playerName, { version, score, correct, total, durationMs, details }, req.user.role);
  // GA4: bắn quiz_submit từ server (nguồn chân lý — client không can thiệp được
  // vào score). + 1 event badge_unlock cho mỗi huy hiệu mới mở.
  sendGA4Event(req, 'quiz_submit', {
    version, score, correct, total,
    accuracy: total > 0 ? Math.round((correct / total) * 100) : 0,
    duration_ms: durationMs || 0,
    is_perfect: total > 0 && correct === total ? 1 : 0,
  });
  for (const b of (newBadges || [])) {
    if (b?.id) sendGA4Event(req, 'badge_unlock', { badge_id: b.id, badge_label: b.label || '' });
  }
  res.json({ ...result, newBadges });
});

r.get('/api/leaderboard', async (req, res) => {
  const version = String(req.query.version || '');
  if (!isValidVersion(version)) return res.status(400).json({ error: 'invalid version' });
  const limit = Math.min(Math.max(Number(req.query.limit) || 10, 1), 100);
  res.json(await getLeaderboard(version, limit));
});

r.get('/api/stats', async (req, res) => {
  const version = String(req.query.version || '');
  if (!isValidVersion(version)) return res.status(400).json({ error: 'invalid version' });
  res.json(await getStats(version));
});

r.get('/api/recent', async (req, res) => {
  const limit = Math.min(Math.max(Number(req.query.limit) || 20, 1), 100);
  res.json(await getRecent(limit));
});

r.get('/api/histogram', async (req, res) => {
  const version = String(req.query.version || '');
  if (!isValidVersion(version)) return res.status(400).json({ error: 'invalid version' });
  res.json(await getHistogram(version));
});

r.get('/api/confusion', async (req, res) => {
  const version = String(req.query.version || '');
  if (!isValidVersion(version)) return res.status(400).json({ error: 'invalid version' });
  res.json(await getConfusion(version));
});

// Ví XP/coin/streak per-user. Trước đây ví chỉ ở localStorage → mất khi đổi máy.
// GET trả ví hiện tại (rỗng nếu chưa có row); PUT ghi đè bằng payload client gửi
// lên. Last-write-wins — chấp nhận vì 1 user thường chỉ chơi 1 tab tại 1 thời điểm,
// và FE merge với local trước khi PUT (lấy MAX để tránh tab cũ ghi đè ngược).
r.get('/api/wallet', requireAuth, async (req, res) => {
  res.json((await getUserWallet(req.user.id)) || null);
});
// PUT ghi ví → bắt phải đã chọn trường (requireEnrolled). Ví ghi vào bucket của
// trường HS đang theo học (helper tự đọc enrolled_domain). FE submit thử ở trường
// khác sẽ bị 403 view_only (FE Phase 4 đã ẩn nút submit từ trước, đây là lớp 2).
r.put('/api/wallet', requireAuth, requireEnrolled, async (req, res) => {
  const w = await upsertUserWallet(req.user.id, req.body || {});
  res.json(w);
});

// Scenario runs — đếm số lần hoàn thành theo familyId per-user, cross-device.
// GET trả map { familyId: { runs, bestStars, bestScore, lastTs } } của user.
// POST upsert monotonic (runs++, MAX stars/score). Body: { familyId, stars, score }.
r.get('/api/scenario-runs', requireAuth, async (req, res) => {
  try {
    const map = await getScenarioRunsForUser(req.user.id);
    res.json(map);
  } catch (e) {
    console.warn('[scenario-runs] GET failed', e?.message);
    res.status(500).json({ error: 'db_error' });
  }
});
r.post('/api/scenario-runs', requireAuth, requireEnrolled, async (req, res) => {
  const familyId = String(req.body?.familyId || '').trim().slice(0, 64);
  if (!familyId) return res.status(400).json({ error: 'familyId required' });
  const stars = Number(req.body?.stars) || 0;
  const score = Number(req.body?.score) || 0;
  try {
    const row = await recordScenarioRunDb(req.user.id, familyId, stars, score);
    // Grant skills nếu familyId có mapping (skills-scenario-map.json) và HS
    // đạt ngưỡng (score≥70 hoặc stars≥2). Fire-and-best-effort: lỗi không
    // block response của scenario-runs. UNIQUE đảm bảo idempotent.
    let skillsGranted = null;
    try {
      const g = await grantSkillsForScenario({
        user_id: req.user.id,
        family_id: familyId,
        score: row?.best_score ?? score,
        stars: row?.best_stars ?? stars,
      });
      if (g.granted_count > 0) skillsGranted = g;
    } catch (e) { console.warn('[scenario-runs] grant skills failed', e?.message); }
    // Engagement: mỗi scenario hoàn thành (bất kể điểm) = 1 lượt minigame.
    try { await trackEngagementProgress(req.user.id, 'minigame', 1); } catch {}
    try { await addLeagueWeekXp(req.user.id, Math.max(5, Math.floor(score / 10))); } catch {}
    res.json({ familyId, ...(row || {}), skillsGranted });
  } catch (e) {
    console.warn('[scenario-runs] POST failed', e?.message);
    res.status(500).json({ error: 'db_error' });
  }
});

// ── User-state KV (generic) ──────────────────────────────────────
// Đồng bộ các state local-only nhỏ (math2/math6 stars, code-lab drafts,
// tutor history, …) lên server theo whitelist phía client. Mỗi key cap 32KB,
// tối đa ~200 key/user (đủ rộng so với nhu cầu thực tế).
//
// GET /api/user-state                   → { key: { value, updatedAt } }
// PUT /api/user-state  body: { key:val }  upsert (value rỗng = xoá)
r.get('/api/user-state', requireAuth, async (req, res) => {
  try {
    res.json(await getUserState(req.user.id));
  } catch (e) {
    console.warn('[user-state] GET failed', e?.message);
    res.status(500).json({ error: 'db_error' });
  }
});
async function _putUserStateHandler(req, res) {
  const body = req.body || {};
  if (typeof body !== 'object' || Array.isArray(body)) {
    return res.status(400).json({ error: 'body must be object {key: value}' });
  }
  const keys = Object.keys(body);
  if (keys.length > 100) {
    return res.status(413).json({ error: 'too many keys in one request (max 100)' });
  }
  try {
    const n = await putUserState(req.user.id, body);
    res.json({ ok: true, written: n });
  } catch (e) {
    // Value > 32KB: trả 413 + key + max để client biết phải chunk/nén thay vì
    // truncate ngầm (truncate JSON giữa chừng → hỏng dữ liệu vĩnh viễn ở hydrate).
    if (e instanceof UserStateValueTooLargeError) {
      return res.status(413).json({
        error: 'value_too_large',
        key: e.key, size: e.size, maxBytes: e.maxBytes,
      });
    }
    console.warn('[user-state] write failed', e?.message);
    res.status(500).json({ error: 'db_error' });
  }
}
r.put('/api/user-state', requireAuth, _putUserStateHandler);
// POST alias dùng cho navigator.sendBeacon (chỉ hỗ trợ POST) khi tab unload.
// sendBeacon vẫn gửi cookie nên requireAuth hoạt động bình thường.
r.post('/api/user-state', requireAuth, _putUserStateHandler);

// ── Quiz qua ScoreUp ──────────────────────────────────────────────
// Tizia KHÔNG tự lưu câu hỏi nữa (xem memory: project_quiz_code_apis). Mọi câu
// trắc nghiệm lấy từ ScoreUp Public API qua adapter server/integrations/scoreup.js.
// Server proxy giúp: (1) giấu X-API-Key khỏi browser, (2) cache theo URL ở
// adapter để giảm rate-limit, (3) chấm điểm + lưu attempt vào DB Tizia.
//
r.get('/api/quiz/subjects', requireAuth, async (req, res) => {
  if (!scoreup.isConfigured()) return res.status(503).json({ error: 'scoreup_not_configured' });
  try {
    const data = await scoreup.listSubjects({
      page: Number(req.query.page) || 1,
      limit: Math.min(Math.max(Number(req.query.limit) || 50, 1), 100),
      faculty: req.query.faculty,
    });
    res.json(data);
  } catch (e) {
    console.warn('[quiz/subjects]', e.message);
    res.status(e.status || 502).json({ error: 'scoreup_error', message: e.message });
  }
});

r.get('/api/quiz/chapters', requireAuth, async (req, res) => {
  const sid = String(req.query.subject_id || '');
  if (!sid) return res.status(400).json({ error: 'subject_id required' });
  if (!scoreup.isConfigured()) return res.status(503).json({ error: 'scoreup_not_configured' });
  try {
    res.json(await scoreup.listChapters(sid));
  } catch (e) {
    res.status(e.status || 502).json({ error: 'scoreup_error', message: e.message });
  }
});

// Lấy N câu random — client không bao giờ thấy correct_answer (server chấm).
r.get('/api/quiz/random', requireAuth, async (req, res) => {
  if (!scoreup.isConfigured()) return res.status(503).json({ error: 'scoreup_not_configured' });
  const subjectId = req.query.subject_id;
  const chapterId = req.query.chapter_id;
  if (!subjectId && !chapterId) {
    return res.status(400).json({ error: 'subject_id_or_chapter_id_required' });
  }
  try {
    const data = await scoreup.getRandomQuestions({
      subject_id: subjectId, chapter_id: chapterId,
      level: req.query.level, bloom_level: req.query.bloom_level,
      question_type: req.query.question_type, grade_level: req.query.grade_level,
      curriculum: req.query.curriculum, lang: req.query.lang, tags: req.query.tags,
      limit: Math.min(Math.max(Number(req.query.limit) || 10, 1), 100),
    });
    // include_answers=1 (default cho weekly-lesson tiểu học, instant-feedback): trả
    // đầy đủ correct_answer/correct_index/explanation để engine chấm + show giải
    // thích ngay tại client. include_answers=0: cho mode "thi" (anti-cheat).
    const includeAnswers = req.query.include_answers !== '0' && req.query.include_answers !== 'false';
    const items = includeAnswers ? (data.items || []) : (data.items || []).map((q) => {
      const { correct_answer, correct_answers, correct_index, explanation, ...safe } = q;
      return safe;
    });
    res.json({ status: data.status, items, count: data.count });
  } catch (e) {
    console.warn('[quiz/random]', e.message);
    res.status(e.status || 502).json({ error: 'scoreup_error', message: e.message });
  }
});

// Submit câu trả lời: server fetch lại câu để chấm (không tin client), lưu attempt.
r.post('/api/quiz/attempt', requireAuth, requireEnrolled, async (req, res) => {
  if (!scoreup.isConfigured()) return res.status(503).json({ error: 'scoreup_not_configured' });
  const qid = String(req.body?.question_id || '');
  const userAnswer = req.body?.answer; // string hoặc array (mcq_multi/matching/ordering)
  const durationMs = Number.isFinite(req.body?.durationMs) ? Math.floor(req.body.durationMs) : null;
  if (!qid) return res.status(400).json({ error: 'question_id required' });

  try {
    const data = await scoreup.getQuestion(qid);
    const q = data.data || data;
    if (!q?.id) return res.status(404).json({ error: 'question_not_found' });

    const correctSet = new Set(
      Array.isArray(q.correct_answers) ? q.correct_answers.map(String)
      : (q.correct_answer != null ? [String(q.correct_answer)] : []),
    );
    const userArr = Array.isArray(userAnswer) ? userAnswer.map(String)
      : (userAnswer != null ? [String(userAnswer)] : []);

    // Score: tỉ lệ overlap (mcq_single → 0/1, mcq_multi → %).
    let score = 0, correct = false;
    if (correctSet.size > 0) {
      const userSet = new Set(userArr);
      const intersect = [...correctSet].filter((k) => userSet.has(k)).length;
      const wrong = [...userSet].filter((k) => !correctSet.has(k)).length;
      score = Math.max(0, (intersect - wrong) / correctSet.size);
      correct = (q.question_type === 'mcq_multi')
        ? (intersect === correctSet.size && wrong === 0)
        : (userArr.length === 1 && correctSet.has(userArr[0]));
    }

    const attempt = await recordQuestionAttempt({
      user_id: req.user.id,
      scoreup_question_id: q.id, question_external_id: q.external_id,
      subject_id: q.subject_id, chapter_id: q.chapter_id,
      answers: userArr, correct, score, duration_ms: durationMs,
    });

    // Tracking engagement: chỉ cộng tiến triển quest "quiz" khi câu đúng.
    if (correct) {
      try { await trackEngagementProgress(req.user.id, 'quiz', 1); } catch {}
      try { await addLeagueWeekXp(req.user.id, 5); } catch {}    // 5 XP / câu đúng
    }
    // Update IRT θ user + b câu hỏi (cho cả đúng/sai).
    try {
      await updateIrt({
        user_id: req.user.id,
        question_id: q.id,
        subject_id: q.subject_id || '',
        correct,
      });
    } catch {}

    res.json({
      ok: true, attempt_id: attempt.id, correct, score,
      correct_answers: [...correctSet],
      explanation: q.explanation || null,
    });
  } catch (e) {
    console.warn('[quiz/attempt]', e.message);
    res.status(e.status || 502).json({ error: 'scoreup_error', message: e.message });
  }
});

r.get('/api/quiz/recent', requireAuth, async (req, res) => {
  const limit = Math.min(Math.max(Number(req.query.limit) || 50, 1), 500);
  res.json({ items: await getRecentQuestionAttempts(req.user.id, limit) });
});

// ── Code qua Codelab (NEU Online Judge) ─────────────────────────────
// Tizia KHÔNG tự host sandbox nữa. Mọi bài tập + chạy code đi qua Codelab API.
// Server proxy giúp: (1) giấu X-API-Key khỏi browser, (2) gắn externalUserRef
// = "tizia:user:<id>" từ session để Codelab quy điểm về đúng HS Tizia,
// (3) cache list/detail ở adapter, (4) webhook chấm xong → cộng XP qua
// /api/webhooks/codelab. Spec: https://fit.neu.edu.vn/codelab/api-backend/docs
const codelabFail = (res, e) => res.status(e.status || 502).json({
  error: 'codelab_error', message: e.message, body: e.body,
});
const codelabReady = (res) => {
  if (!codelab.isConfigured()) {
    res.status(503).json({ error: 'codelab_not_configured' });
    return false;
  }
  return true;
};
const refOf = (req) => codelab.makeExternalUserRef(req.user.id);

// PROBLEMS — danh sách + chi tiết + embed (auth optional cho list để guest nhìn
// catalog; chi tiết/run cần login để gắn externalUserRef thật).
//
// Khi gọi với ?contest=<slug>: dùng mapping Tizia-side (xem codelab-contests.js)
// vì endpoint /contests/{slug} của Codelab hiện chưa handle system principal
// (controller crash với userToken undefined). Khi bug Codelab fix, có thể bỏ
// mapping và chuyển sang gọi codelab.getContest(slug) trực tiếp.
r.get('/api/codelab/problems', async (req, res) => {
  if (!codelabReady(res)) return;
  try {
    const contestSlug = req.query.contest ? String(req.query.contest) : null;
    if (contestSlug && hasContestMapping(contestSlug)) {
      const slugs = getContestProblemSlugs(contestSlug);
      // Fetch chi tiết từng bài song song. Adapter cache 5 phút → lần 2 nhanh.
      const items = await Promise.all(slugs.map((s) =>
        codelab.getProblem(s).catch((e) => {
          console.warn(`[codelab] getProblem ${s} fail:`, e.message);
          return null;
        }),
      ));
      return res.json({
        data: items.filter(Boolean),
        contestName: getContestName(contestSlug),
        contestSlug,
      });
    }
    // Fallback: list toàn bộ catalog Codelab (filter qua tag/difficulty).
    const data = await codelab.listProblems({
      page:       Number(req.query.page) || 1,
      limit:      Math.min(Math.max(Number(req.query.limit) || 20, 1), 100),
      tag:        req.query.tag,
      difficulty: req.query.difficulty,
      search:     req.query.search,
      sortBy:     req.query.sortBy,
    });
    res.json(data);
  } catch (e) { codelabFail(res, e); }
});

r.get('/api/codelab/problems/:slug', async (req, res) => {
  if (!codelabReady(res)) return;
  try { res.json(await codelab.getProblem(req.params.slug)); }
  catch (e) { codelabFail(res, e); }
});

r.get('/api/codelab/problems/:slug/embed', async (req, res) => {
  if (!codelabReady(res)) return;
  // Login? gắn externalUserRef + hideSolution mặc định để Codelab ẩn nút "Xem
  // lời giải" trong iframe (đáp án Tizia tự kéo qua /answer route ở dưới).
  const opts = { hideSolution: 1, theme: req.query.theme || 'dark' };
  if (req.user) opts.externalUserRef = refOf(req);
  try { res.json(await codelab.getEmbed(req.params.slug, opts)); }
  catch (e) { codelabFail(res, e); }
});

// ĐÁP ÁN — chỉ trả khi HS đã pass (Codelab tự enforce, Tizia chỉ forward).
r.get('/api/codelab/problems/:slug/answer', requireAuth, async (req, res) => {
  if (!codelabReady(res)) return;
  try { res.json(await codelab.getAnswer(req.params.slug, { externalUserRef: refOf(req) })); }
  catch (e) { codelabFail(res, e); }
});

// LANGUAGES — guest cũng xem được để hiển thị bộ lọc trong trang catalog.
r.get('/api/codelab/languages', async (_req, res) => {
  if (!codelabReady(res)) return;
  try { res.json(await codelab.listLanguages()); }
  catch (e) { codelabFail(res, e); }
});

// TAGS — render bộ lọc theo chủ đề.
r.get('/api/codelab/tags', async (_req, res) => {
  if (!codelabReady(res)) return;
  try { res.json(await codelab.listTags()); }
  catch (e) { codelabFail(res, e); }
});

// CONTESTS — module Tizia I1.1 / I2.1 trỏ vào 1 contest cụ thể trong Codelab.
r.get('/api/codelab/contests', async (req, res) => {
  if (!codelabReady(res)) return;
  try {
    res.json(await codelab.listContests({
      page:   Number(req.query.page) || 1,
      limit:  Math.min(Math.max(Number(req.query.limit) || 50, 1), 100),
      search: req.query.search,
    }));
  } catch (e) { codelabFail(res, e); }
});
r.get('/api/codelab/contests/:slug', async (req, res) => {
  if (!codelabReady(res)) return;
  try { res.json(await codelab.getContest(req.params.slug)); }
  catch (e) { codelabFail(res, e); }
});

// CHẠY THỬ — sandbox không gắn bài. requireAuth để có externalUserRef.
r.post('/api/codelab/run', requireAuth, requireEnrolled, async (req, res) => {
  if (!codelabReady(res)) return;
  const b = req.body || {};
  if (!b.source_code || !b.language_id) {
    return res.status(400).json({ error: 'source_code + language_id required' });
  }
  try {
    const data = await codelab.runCode({
      source_code:     String(b.source_code).slice(0, 100_000),
      language_id:     Number(b.language_id),
      stdin:           b.stdin != null ? String(b.stdin).slice(0, 64_000) : undefined,
      expected_output: b.expected_output != null ? String(b.expected_output).slice(0, 64_000) : undefined,
      wait:            b.wait !== false,
      cpu_time_limit:  b.cpu_time_limit,
      memory_limit:    b.memory_limit,
      externalUserRef: refOf(req),
    });
    res.json(data);
  } catch (e) { codelabFail(res, e); }
});

// Poll run-code async (khi caller gửi wait=false).
r.get('/api/codelab/run/:token', requireAuth, async (req, res) => {
  if (!codelabReady(res)) return;
  try { res.json(await codelab.getRunCodeResult(req.params.token)); }
  catch (e) { codelabFail(res, e); }
});

// NỘP BÀI chính thức — Codelab chấm + fire webhook về /api/webhooks/codelab,
// receiver tự cộng XP/coin nếu accepted lần đầu.
r.post('/api/codelab/submit', requireAuth, requireEnrolled, async (req, res) => {
  if (!codelabReady(res)) return;
  const b = req.body || {};
  if (!b.problemSlug || !b.source_code || !b.language_id) {
    return res.status(400).json({ error: 'problemSlug + source_code + language_id required' });
  }
  try {
    const data = await codelab.submit({
      problemSlug:     String(b.problemSlug),
      contestSlug:     b.contestSlug ? String(b.contestSlug) : undefined,
      language_id:     Number(b.language_id),
      source_code:     String(b.source_code).slice(0, 200_000),
      externalUserRef: refOf(req),
    });
    res.json(data);
  } catch (e) { codelabFail(res, e); }
});

// CHI TIẾT 1 SUBMISSION — Codelab cô lập theo apiKeyId nên Tizia chỉ nhìn được
// submission do chính Tizia tạo. Vẫn check ownership cấp Tizia qua DB tracking
// (codelab_submissions.user_id) để tránh leak nếu request từ user khác.
r.get('/api/codelab/submissions/:id', requireAuth, async (req, res) => {
  if (!codelabReady(res)) return;
  try {
    const sub = await codelab.getSubmission(req.params.id);
    res.json(sub);
  } catch (e) { codelabFail(res, e); }
});

// CLAIM REWARD — workaround cho bug Codelab: queue processor không fire webhook
// khi update status terminal qua polling (chỉ fire khi callbackRunCode trực tiếp).
// FE polling /submissions/:id, khi thấy Accepted → POST claim → server verify
// với Codelab, ghi codelab_submissions + cộng XP/coin. Idempotent qua PK
// (submission_id, status).
//
// Khi bug Codelab fix + webhook về đều đặn, có thể giữ endpoint này như fallback
// (record same row 2 lần là no-op nhờ INSERT OR IGNORE).
r.post('/api/codelab/me/claim/:submissionId', requireAuth, requireEnrolled, async (req, res) => {
  if (!codelabReady(res)) return;
  try {
    const submissionId = String(req.params.submissionId);
    const sub = await codelab.getSubmission(submissionId);
    // Chống user khác claim hộ: Codelab phải xác nhận submission do CHÍNH user
    // Tizia hiện tại tạo, qua externalUserRef.
    const expectedRef = refOf(req);
    const actualRef = sub.externalUserRef;
    if (actualRef && actualRef !== expectedRef) {
      return res.status(403).json({ error: 'forbidden_not_owner', expected: expectedRef, got: actualRef });
    }
    // Map status numeric (Codelab StatusSubmissionEnum) → name string cho DB.
    // 3 Accepted | 4 WrongAnswer | 5..9 Error variants | 1..2 InProgress
    const STATUS_MAP = {
      3: 'accepted', 4: 'wrong_answer',
      5: 'time_limit', 6: 'compile_error', 7: 'runtime_error',
      8: 'system_error', 9: 'memory_limit',
    };
    const statusName = STATUS_MAP[sub.status] || `status_${sub.status}`;
    if (sub.status === 1 || sub.status === 2) {
      return res.status(409).json({ error: 'not_yet_completed', status: sub.status });
    }

    // Re-use logic webhook: ghi DB (dedup), cộng XP nếu accepted lần đầu.
    const { recordCodelabSubmission, hasAcceptedCodelabProblem, getUserWallet: gw, upsertUserWallet: uw } = await import('./db.js');

    // Lookup problem slug: sub.problem có thể là object populated hoặc id thuần.
    let problemSlug = sub.problemSlug || sub.problem?.slug || null;
    if (!problemSlug && sub.problem) {
      // problem có thể là _id mongo string. Adapter không có getById nên skip.
      // Hậu quả: codelab_submissions.problem_slug = null khi missing.
    }

    const { firstSeen, userId } = await recordCodelabSubmission({
      submissionId, status: statusName, problemSlug,
      externalUserRef: actualRef || expectedRef,
      score: sub.score, passedCases: sub.passedCases || sub.passed_test_cases,
      totalCases: sub.totalCases || sub.total_test_cases,
      languageId: sub.language?.id, completedAt: Date.now(),
    });

    let reward = null;
    if (firstSeen && statusName === 'accepted' && userId && problemSlug) {
      // Exclude row VỪA INSERT khỏi check — nếu không, hasAcceptedCodelabProblem
      // sẽ thấy chính row mới này và luôn return true → never reward.
      if (!(await hasAcceptedCodelabProblem(userId, problemSlug, submissionId))) {
        const cur = (await gw(userId)) || {};
        await uw(userId, {
          xp: (cur.xp || 0) + 20,
          coins: (cur.coins || 0) + 5,
          quizzesPassed: (cur.quizzesPassed || 0) + 1,
        }, { monotonic: true });
        reward = { xp: 20, coin: 5 };
      }
    }
    res.json({ ok: true, status: statusName, firstSeen, reward });
  } catch (e) { codelabFail(res, e); }
});

// LỊCH SỬ submission của chính user hiện tại (theo externalUserRef từ session).
r.get('/api/codelab/submissions', requireAuth, async (req, res) => {
  if (!codelabReady(res)) return;
  try {
    res.json(await codelab.listSubmissionsForUser({
      externalUserRef: refOf(req),
      problemSlug:  req.query.problemSlug,
      contestSlug:  req.query.contestSlug,
      page:  Number(req.query.page) || 1,
      limit: Math.min(Math.max(Number(req.query.limit) || 20, 1), 100),
    }));
  } catch (e) { codelabFail(res, e); }
});

// SUBMISSION mới nhất của user cho 1 bài (FE cần để hiện "đã accepted" + ẩn nút submit).
r.get('/api/codelab/submissions/latest/problem/:slug', requireAuth, async (req, res) => {
  if (!codelabReady(res)) return;
  try {
    res.json(await codelab.getLatestSubmission({
      externalUserRef: refOf(req),
      problemSlug: req.params.slug,
    }));
  } catch (e) { codelabFail(res, e); }
});

// THỐNG KÊ Codelab của user — đếm số bài accepted, dùng cho dashboard học sinh
// và quest "giải N bài Codelab". Chỉ đọc DB Tizia (codelab_submissions), không
// gọi Codelab → trả nhanh.
r.get('/api/codelab/me/stats', requireAuth, async (req, res) => {
  res.json({
    acceptedProblems: await countCodelabAcceptedProblems(req.user.id),
    externalUserRef:  refOf(req),
  });
});

// ── Spaced repetition (SM-2-lite) ──────────────────────────────────
// Cá nhân hoá "Củng cố kiến thức": GET state theo prefix (vd space:mam:),
// POST mỗi review → server cập nhật ease/interval/due_at, trả về state mới.
// Guest 401 → FE tự fallback localStorage (xem public/js/engine/spaced-quiz.js).
r.get('/api/srs/state', requireAuth, async (req, res) => {
  const prefix = String(req.query.prefix || '').slice(0, 64);
  if (!prefix) return res.status(400).json({ error: 'prefix_required' });
  try {
    res.json({ items: await getSrsStateByPrefix(req.user.id, prefix) });
  } catch (e) {
    console.warn('[srs/state]', e?.message);
    res.status(500).json({ error: 'db_error' });
  }
});

r.post('/api/srs/review', requireAuth, requireEnrolled, async (req, res) => {
  const cardKey = String(req.body?.card_key || '').slice(0, 128);
  const correct = !!req.body?.correct;
  if (!cardKey) return res.status(400).json({ error: 'card_key_required' });
  try {
    const card = await recordSrsReview({
      user_id: req.user.id,
      card_key: cardKey, correct,
    });
    res.json(card);
  } catch (e) {
    console.warn('[srs/review]', e?.message);
    res.status(500).json({ error: 'db_error' });
  }
});

// Trục 3: ?role=pupil|student|teacher → trả về badge phù hợp audience + 'all'.
// Không truyền role → trả tất cả (legacy + admin dashboard).
r.get('/api/badges', (req, res) => {
  const role = req.query.role || req.user?.role;
  if (!role) return res.json(BADGES);
  res.json(BADGES.filter(b => badgeApplies(b, role)));
});

// ============================================================
// AI TUTOR — Claude API endpoints (grade-soap, patient-turn, evaluate-roleplay, tutor-chat)
// ============================================================
attachAi(r);

// ============================================================
// TTS NEURAL — /api/tts qua FPT.AI (cache /data/tts-cache). Public cho guest
// (whitelist trong makeAuthGate); không có FPT_TTS_API_KEY → 503, client
// fallback Web Speech. Xem server/tts.js.
// ============================================================
attachTts(r);

// ============================================================
// PHARMACY-AI — port từ github.com/Lampx83/Pharmacy-AI (nhà thuốc 3D GPP).
// Session + chat + action + SEGUE scoring + fatal-error detection.
// ============================================================
attachPharmacy(r);

// ============================================================
// PAYMENT (Phase 1) — chỉ bật khi PAYMENT_ENABLED=1. Dynamic import để bảng
// payment + routes không tồn tại ở deployment chưa cần thanh toán.
// ============================================================
if (PAYMENT_ENABLED) {
  const { attachPayment } = await import('./contexts/payment/index.js');
  attachPayment(r, { basePath: BASE_PATH });
}

// ============================================================
// ASSET LIBRARY (GAP 4) — quét tự động 3D model, trả JSON catalogue
// ============================================================
attachAssets(r, PUBLIC_DIR);

// ============================================================
// ADAPTIVE QUIZ (GAP 11) — BKT-lite (local)
// ============================================================
attachAdaptive(r);

// ============================================================
// LESSON BUILDER + MARKETPLACE (GAP 3 + 5)
// ============================================================
attachLessons(r);

// ============================================================
// CLASS MANAGEMENT
// ============================================================
function genCode(len = 6) {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let s = '';
  for (let i = 0; i < len; i++) s += chars[Math.floor(Math.random() * chars.length)];
  return s;
}

r.post('/api/classes', async (req, res) => {
  const name = String(req.body?.name || '').trim().slice(0, 60);
  const teacherName = String(req.body?.teacherName || 'GV').trim().slice(0, 40);
  if (!name) return res.status(400).json({ error: 'name required' });
  let code = null;
  for (let i = 0; i < 8; i++) {
    const c = genCode(6);
    if (!(await getClassByCode(c))) { code = c; break; }
  }
  if (!code) return res.status(500).json({ error: 'could not generate code' });
  const result = await createClass({ code, name, teacher_name: teacherName });
  res.json({ id: result.id, code, name, teacherName });
});

r.get('/api/classes', async (_req, res) => res.json(await listClasses()));

r.get('/api/classes/:code', async (req, res) => {
  const cls = await getClassByCode(req.params.code);
  if (!cls) return res.status(404).json({ error: 'class not found' });
  res.json(cls);
});

r.get('/api/classes/:code/members', async (req, res) => {
  const cls = await getClassByCode(req.params.code);
  if (!cls) return res.status(404).json({ error: 'class not found' });
  res.json(await getClassMembers(req.params.code));
});

r.get('/api/classes/:code/attempts', async (req, res) => {
  const cls = await getClassByCode(req.params.code);
  if (!cls) return res.status(404).json({ error: 'class not found' });
  const limit = Math.min(Math.max(Number(req.query.limit) || 100, 1), 500);
  res.json(await getClassAttempts(req.params.code, limit));
});

r.get('/api/classes/:code/export.csv', async (req, res) => {
  const cls = await getClassByCode(req.params.code);
  if (!cls) return res.status(404).send('class not found');
  const rows = await getClassAttempts(req.params.code, 5000);
  const esc = v => v == null ? '' : (/[",\n]/.test(String(v)) ? `"${String(v).replace(/"/g,'""')}"` : String(v));
  const lines = ['id,version,level,player_name,score,correct,total,duration_ms,created_at_iso'];
  for (const row of rows) {
    lines.push([row.id, row.version, row.level_n ?? '', esc(row.player_name), row.score, row.correct, row.total, row.duration_ms ?? '', new Date(row.created_at).toISOString()].join(','));
  }
  res.setHeader('Content-Type', 'text/csv; charset=utf-8');
  res.setHeader('Content-Disposition', `attachment; filename="class-${cls.code}-${new Date().toISOString().slice(0,10)}.csv"`);
  res.send('﻿' + lines.join('\n'));
});

r.get('/api/players/:name/attempts', async (req, res) => {
  const limit = Math.min(Math.max(Number(req.query.limit) || 50, 1), 200);
  res.json(await getPlayerAttempts(req.params.name, limit));
});

r.get('/api/achievements', async (req, res) => {
  // Mặc định trả huy hiệu của user đang đăng nhập; cho phép override ?player=
  // (giáo viên xem học sinh — sau có thể gate theo role).
  const player = String(req.query.player || req.user?.display_name || '').trim();
  if (!player) return res.status(400).json({ error: 'player required' });
  const rows = await getAchievements(player);
  res.json(rows.map(row => ({ ...row, badge: BADGES.find(b => b.id === row.badge_id) })));
});

// ── Requests — "Ban điều hành AI" inbox ──
// POST /api/requests/attachments — nhận raw binary 1 file (ảnh chụp màn hình,
// hoặc file đính kèm tuỳ chọn). FE gửi body = bytes file, header:
//   Content-Type: <mime>
//   X-Filename:   <tên gốc>  (optional)
//   X-Kind:       'screenshot' | 'file'  (optional, default 'file')
// Lý do tách route + raw thay vì multipart: tránh thêm dep (multer) + payload
// đơn giản (1 file/req). Trả URL public + meta để FE nhồi vào array attachments.
// LƯU Ý BẢO MẬT: cố tình KHÔNG cho image/svg+xml. SVG là XML có thể nhúng
// <script>; nếu serve inline từ chính origin → stored-XSS khi mở link/ảnh. Ảnh
// minh hoạ feedback dùng PNG/JPEG là đủ. Mọi file vẫn được serve với nosniff +
// CSP sandbox + ép tải về (xem mount /uploads/requests) như lớp phòng thủ.
const REQUEST_UPLOAD_MIME_WHITELIST = new Set([
  'image/png', 'image/jpeg', 'image/webp', 'image/gif',
  'application/pdf', 'text/plain', 'text/csv',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  'application/msword', 'application/vnd.ms-excel', 'application/vnd.ms-powerpoint',
  'application/zip',
]);
const MIME_TO_EXT = {
  'image/png': '.png', 'image/jpeg': '.jpg', 'image/webp': '.webp',
  'image/gif': '.gif', 'application/pdf': '.pdf',
  'text/plain': '.txt', 'text/csv': '.csv',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': '.docx',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': '.xlsx',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation': '.pptx',
  'application/msword': '.doc', 'application/vnd.ms-excel': '.xls',
  'application/vnd.ms-powerpoint': '.ppt', 'application/zip': '.zip',
};
// Ảnh raster an toàn để render inline (img src + mở thẳng). Mọi định dạng khác
// (pdf/office/zip/txt/csv/db/sql) bị ép tải về để không bao giờ thực thi trong origin.
const REQUEST_INLINE_SAFE_EXT = new Set(['.png', '.jpg', '.jpeg', '.webp', '.gif']);
// File DỮ LIỆU (CSDL SQLite + script SQL). Định danh theo PHẦN MỞ RỘNG vì trình
// duyệt hay để Content-Type rỗng/application/octet-stream cho các đuôi này → không
// thể tin whitelist MIME. SQLite kiểm magic header; .sql là văn bản. Tất cả đều
// bị ép tải về (không nằm trong INLINE_SAFE) nên không thực thi trong origin.
const REQUEST_SQLITE_EXTS = new Set(['.db', '.sqlite', '.sqlite3']);
const REQUEST_DATA_EXTS = new Set(['.db', '.sqlite', '.sqlite3', '.sql']);
// Magic-byte sniffing chống Content-Type spoofing: client tự đặt header Content-Type
// nên với định dạng có chữ ký rõ ràng ta kiểm bytes đầu. text/plain & text/csv không
// có chữ ký tin cậy → chấp nhận. Trả false nếu không khớp (handler sẽ từ chối 415).
function requestUploadSniffOk(mime, buf) {
  if (!Buffer.isBuffer(buf) || buf.length < 4) return false;
  const at = (...sig) => sig.every((v, i) => buf[i] === v);
  const ascii = (off, str) => buf.slice(off, off + str.length).toString('latin1') === str;
  switch (mime) {
    case 'image/png':  return at(0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a);
    case 'image/jpeg': return at(0xff, 0xd8, 0xff);
    case 'image/gif':  return ascii(0, 'GIF87a') || ascii(0, 'GIF89a');
    case 'image/webp': return ascii(0, 'RIFF') && ascii(8, 'WEBP');
    case 'application/pdf': return ascii(0, '%PDF-');
    // OOXML (docx/xlsx/pptx) + zip đều là container ZIP: PK\x03\x04 (hoặc empty/spanned).
    case 'application/zip':
    case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
    case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
    case 'application/vnd.openxmlformats-officedocument.presentationml.presentation':
      return ascii(0, 'PK\x03\x04') || ascii(0, 'PK\x05\x06') || ascii(0, 'PK\x07\x08');
    // Office cũ (.doc/.xls/.ppt) = OLE compound file.
    case 'application/msword':
    case 'application/vnd.ms-excel':
    case 'application/vnd.ms-powerpoint':
      return at(0xd0, 0xcf, 0x11, 0xe0, 0xa1, 0xb1, 0x1a, 0xe1);
    case 'text/plain':
    case 'text/csv':
      return true;
    default: return false;
  }
}
r.post('/api/requests/attachments',
  requireAuth, requireEnrolled,
  // 50MB: ảnh/office nhỏ, nhưng file dữ liệu (.db SQLite, .sql dump) có thể lớn.
  express.raw({ type: () => true, limit: '50mb' }),
  async (req, res) => {
    try {
      const mime = String(req.headers['content-type'] || '').split(';')[0].trim().toLowerCase();
      const rawName = String(req.headers['x-filename'] || '').slice(0, 200);
      const nameExt = path.extname(rawName).toLowerCase();
      const isSqlite = REQUEST_SQLITE_EXTS.has(nameExt);
      const isData = REQUEST_DATA_EXTS.has(nameExt);
      // File dữ liệu (DB/SQL) nhận theo ĐUÔI vì Content-Type không tin được; còn
      // lại bắt buộc nằm trong whitelist MIME.
      if (!isData && !REQUEST_UPLOAD_MIME_WHITELIST.has(mime)) {
        return res.status(415).json({ error: 'unsupported_media_type', mime, message: 'Định dạng file không hỗ trợ.' });
      }
      const buf = req.body;
      if (!Buffer.isBuffer(buf) || buf.length === 0) {
        return res.status(400).json({ error: 'empty_body', message: 'File rỗng.' });
      }
      // Chống Content-Type spoofing: nội dung phải khớp định dạng khai báo.
      if (isSqlite) {
        // SQLite có magic header cố định 16 byte: 15 ký tự "SQLite format 3" + 1 byte NUL.
        const sqliteOk = buf.length >= 16
          && buf.subarray(0, 15).toString('latin1') === 'SQLite format 3'
          && buf[15] === 0x00;
        if (!sqliteOk) {
          return res.status(415).json({ error: 'content_mismatch', message: 'File không phải cơ sở dữ liệu SQLite hợp lệ.' });
        }
      } else if (isData) {
        // .sql là văn bản: chặn nếu trông như nhị phân (có null byte ở 8KB đầu).
        if (buf.subarray(0, 8192).includes(0x00)) {
          return res.status(415).json({ error: 'content_mismatch', message: 'File .sql phải là văn bản SQL (không phải nhị phân).' });
        }
      } else if (!requestUploadSniffOk(mime, buf)) {
        return res.status(415).json({ error: 'content_mismatch', mime, message: 'Nội dung file không khớp định dạng khai báo.' });
      }
      const kind = String(req.headers['x-kind'] || 'file').toLowerCase() === 'screenshot' ? 'screenshot' : 'file';
      // Sanitize tên hiển thị: loại bỏ ký tự nguy hiểm để tránh XSS khi render trong inbox.
      const safeName = rawName.replace(/[\\/\x00-\x1f<>"|?*]/g, '_').trim()
        || (kind === 'screenshot' ? 'screenshot.png' : 'attachment');
      // Phân thư mục theo ngày để dễ housekeeping + tránh 1 dir quá đông.
      const day = new Date().toISOString().slice(0, 10);
      const targetDir = path.join(REQUEST_UPLOADS_DIR, day);
      await fs.mkdir(targetDir, { recursive: true });
      // Data file giữ đúng đuôi gốc; còn lại suy từ MIME đã kiểm.
      const ext = isData ? nameExt : (MIME_TO_EXT[mime] || path.extname(safeName).toLowerCase().slice(0, 8) || '');
      const fname = `${Date.now()}-${Math.random().toString(36).slice(2, 10)}${ext}`;
      const fpath = path.join(targetDir, fname);
      await fs.writeFile(fpath, buf);
      const url = `/uploads/requests/${day}/${fname}`;
      // Chuẩn hoá MIME trả về cho data file để FE/inbox hiển thị đúng (không phải ảnh).
      const reportMime = isSqlite ? 'application/x-sqlite3' : (nameExt === '.sql' ? 'application/sql' : mime);
      res.json({ ok: true, url, name: safeName, mime: reportMime, size: buf.length, kind });
    } catch (err) {
      console.warn('[requests/attachments] upload failed:', err?.message || err);
      res.status(500).json({ error: 'upload_failed', message: 'Không lưu được file.' });
    }
  });

r.post('/api/requests', requireAuth, requireEnrolled, async (req, res) => {
  // requireEnrolled đã đảm bảo body.domain == enrolled_domain (nếu có) → HS chỉ
  // gửi yêu cầu trong trường đang theo học. Admin bypass (gửi mọi trường).
  const b = req.body ?? {};
  const domain = String(b.domain || '').trim();
  const title = String(b.title || '').trim();
  if (!domain) return res.status(400).json({ error: 'domain required' });
  if (title.length < 4) return res.status(400).json({ error: 'title quá ngắn (≥4 ký tự)' });
  const row = await createRequest({
    domain, type: b.type, title, detail: b.detail, student: b.student,
    attachments: Array.isArray(b.attachments) ? b.attachments : null,
  });
  res.json({ ok: true, ...row });

  // Server CHỈ tự GHI NHẬN góp ý (giữ pending) + báo chuông cho HS. KHÔNG tự
  // quyết định nữa — Ollama đã gỡ; quyết định approve/reject/defer/priority do
  // Ban điều hành AI (Routine Claude Opus trên Claude Desktop) xử lý riêng.
  // Không chặn response, lỗi chỉ log.
  try {
    await acknowledgeNewRequest({
      requestId: row.id, domain, title,
      student: String(b.student || '').trim() || null,
    });
  } catch (err) { console.warn('[requests] acknowledge failed:', err?.message || err); }
});

r.get('/api/requests', async (req, res) => {
  const domain = String(req.query.domain || '').trim();
  if (!domain) return res.status(400).json({ error: 'domain required' });
  const limit = Math.min(Math.max(Number(req.query.limit) || 50, 1), 200);
  // RIÊNG TƯ: mỗi tài khoản CHỈ thấy yêu cầu của CHÍNH MÌNH — không thấy của
  // tài khoản khác. Lọc server-side theo display_name lấy từ session (attachUser
  // luôn gắn req.user, client không giả mạo được). Khách chưa đăng nhập → không
  // có yêu cầu cá nhân → trả rỗng để board degrade mượt (không 401).
  // Quy mô nhỏ (vài chục/ trường) nên lọc trong JS sau khi lấy tối đa 200 là đủ.
  const me = String(req.user?.display_name || '').trim();
  if (!me) return res.json({ items: [], stats: {} });
  // Lấy TOÀN BỘ yêu cầu của user trước (500 = thừa cho quy mô vài chục/trường), rồi
  // mới cắt theo limit cho phần items. stats phải đếm trên TOÀN BỘ — nếu đếm sau khi
  // slice thì "✓ N hoàn thành" hụt đi khi user có nhiều hơn limit yêu cầu (lịch sử dài).
  const mine = (await listRequests(domain, 500)).filter(it => it.student === me);
  const stats = {};
  for (const it of mine) stats[it.status] = (stats[it.status] || 0) + 1;
  res.json({ items: mine.slice(0, limit), stats });
});

r.post('/api/requests/:id/vote', async (req, res) => {
  const ok = await voteRequest(req.params.id);
  res.json({ ok });
});

// Đổi trạng thái request — CHỈ admin. Trước đây endpoint này để MỞ (không auth)
// nên bất kỳ ai cũng đổi được status của mọi request, không để lại audit → đã
// từng khiến request đã đóng bị lật ngược "loạn". Nay gate requireAuth+requireAdmin.
// Đường chuẩn để đóng + phản hồi HS là POST /api/admin/requests/:id/reply
// (kèm audit ai_decisions + thông báo); endpoint này chỉ để đổi status nhanh.
r.post('/api/requests/:id/status', requireAuth, requireAdmin, async (req, res) => {
  const b = req.body ?? {};
  const ok = await setRequestStatus(req.params.id, String(b.status || ''), b.note);
  res.json({ ok });
});

// Audit trail quyết định của AI Agent cho 1 góp ý (minh bạch + cho phép xem lại).
r.get('/api/requests/:id/decisions', async (req, res) => {
  res.json({ decisions: await getDecisionsForRequest(req.params.id) });
});

// ── Phiên trao đổi (thread) của 1 yêu cầu ──────────────────────────────────
// Mở luồng hội thoại: HS gửi yêu cầu → Ban điều hành AI phản hồi → HS trao đổi
// tiếp… tới khi hoàn thành. GET công khai (như board); POST chỉ chủ yêu cầu.
//
// GET trả { request, messages }. messages[0] = tin mở đầu dựng từ chính nội dung
// yêu cầu (head, không lưu lặp ở request_messages). Yêu cầu cũ (trước tính năng
// này) có admin_note nhưng chưa có message → bù 1 tin AI ảo để không mất phản hồi.
r.get('/api/requests/:id/thread', async (req, res) => {
  const reqRow = await getRequestById(req.params.id);
  if (!reqRow) return res.status(404).json({ error: 'not_found' });
  const msgs = await listRequestMessages(reqRow.id);
  const hasBoardMsg = msgs.some(m => m.role === 'ai' || m.role === 'admin');
  const thread = [{
    id: 0, request_id: reqRow.id, role: 'student', author_name: reqRow.student,
    body: reqRow.detail || reqRow.title, attachments: reqRow.attachments,
    created_at: reqRow.created_at,
  }];
  // admin_note giữ phản hồi/ghi nhận gần nhất của Ban điều hành. Nếu thread chưa
  // có tin nào từ Ban điều hành (yêu cầu cũ trước tính năng thread, hoặc mới chỉ
  // được ghi nhận) thì bù vào ngay sau tin mở đầu để không mất ngữ cảnh.
  if (reqRow.admin_note && !hasBoardMsg) {
    thread.push({
      id: -1, request_id: reqRow.id, role: 'ai', author_name: 'Ban điều hành AI',
      body: reqRow.admin_note, attachments: [], created_at: reqRow.created_at,
    });
  }
  thread.push(...msgs);
  res.json({
    request: {
      id: reqRow.id, domain: reqRow.domain, type: reqRow.type, title: reqRow.title,
      status: reqRow.status, student: reqRow.student, votes: reqRow.votes,
      created_at: reqRow.created_at, updated_at: reqRow.updated_at,
    },
    messages: thread,
  });
});

// HS (chủ yêu cầu) hoặc admin gửi tin nhắn tiếp theo vào thread. Yêu cầu đã đóng
// (done/rejected) tự mở lại 'reviewing' để Ban điều hành xem tiếp. KHÔNG gọi LLM
// — Ban điều hành AI (Routine Claude Opus) trả lời bất đồng bộ qua /admin/.../reply.
r.post('/api/requests/:id/messages', requireAuth, async (req, res) => {
  const reqRow = await getRequestById(req.params.id);
  if (!reqRow) return res.status(404).json({ error: 'not_found' });
  const me = req.user.display_name;
  const isAdmin = req.user.role === 'admin';
  const isOwner = !!me && me === reqRow.student;
  if (!isOwner && !isAdmin) return res.status(403).json({ error: 'forbidden' });
  const body = String(req.body?.body || '').trim();
  if (!body) return res.status(400).json({ error: 'empty' });
  const attachments = Array.isArray(req.body?.attachments) ? req.body.attachments : null;
  const role = isOwner ? 'student' : 'admin';
  const msg = await addRequestMessage({ request_id: reqRow.id, role, author_name: me, body, attachments });
  const reopened = role === 'student' ? await reopenRequestIfClosed(reqRow.id) : false;
  res.json({ ok: true, message_id: msg.id, reopened });
});
// Bảng quyết định AI gần đây của trường (cho dashboard "Ban điều hành AI").
r.get('/api/ai-decisions', async (req, res) => {
  const limit = Math.min(Math.max(Number(req.query.limit) || 50, 1), 200);
  res.json({ decisions: await getRecentDecisions(limit) });
});

// ── Notifications — hộp thư cá nhân của HS (phản hồi từ Ban điều hành AI) ──
// Key theo display_name (vì requests lưu tên HS, có cả guest gửi → user_id chưa
// có lúc tạo). Guest chưa đăng nhập → trả 401 mượt để FE ẩn bell.
r.get('/api/notifications', async (req, res) => {
  if (!req.user) return res.status(401).json({ error: 'unauthorized', items: [], unread: 0 });
  const u = req.user.display_name;
  const limit = Math.min(Math.max(Number(req.query.limit) || 20, 1), 100);
  res.json({
    items: await listNotifications(u, limit),
    unread: await countUnreadNotifications(u),
  });
});
r.post('/api/notifications/:id/read', async (req, res) => {
  if (!req.user) return res.status(401).json({ error: 'unauthorized' });
  const ok = await markNotificationRead(req.params.id, req.user.display_name);
  res.json({ ok });
});
r.post('/api/notifications/read-all', async (req, res) => {
  if (!req.user) return res.status(401).json({ error: 'unauthorized' });
  const n = await markAllNotificationsRead(req.user.display_name);
  res.json({ ok: true, marked: n });
});

r.get('/api/export.csv', async (_req, res) => {
  const rows = await getAllAttempts();
  const esc = v => {
    if (v == null) return '';
    const s = String(v);
    return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  };
  const lines = ['id,version,player_name,score,correct,total,duration_ms,created_at_iso,details'];
  for (const row of rows) {
    lines.push([
      row.id, row.version, esc(row.player_name), row.score, row.correct, row.total,
      row.duration_ms ?? '', new Date(row.created_at).toISOString(), esc(row.details),
    ].join(','));
  }
  res.setHeader('Content-Type', 'text/csv; charset=utf-8');
  res.setHeader('Content-Disposition', `attachment; filename="tizia-attempts-${new Date().toISOString().slice(0,10)}.csv"`);
  res.send('﻿' + lines.join('\n'));
});

// HTML injection middleware — gắn các widget global vào mọi trang HTML:
//   • auth-header.js: header chung (logo Tizia + breadcrumb + chuông + chip user)
//   • suggestion-fab.js: nút "🏛️ Đề nghị" góc dưới phải
//   • notifications-bell.js: chuông notification (tự mount vào slot trong header)
// Page muốn opt-out: thêm thuộc tính tương ứng vào <body>:
//   data-no-auth-header, data-no-notifications-bell, data-no-suggestion-fab.
// Tránh phải sửa thủ công 59+ file.
// Đường dẫn TUYỆT ĐỐI (kèm BASE_PATH) — KHÔNG dùng relative "js/...": trang nằm
// trong thư mục con (vd /campus-proto/b-iso-canvas.html) sẽ phân giải relative
// thành /campus-proto/js/... → 404. Absolute /js/... đúng cho mọi độ sâu.
const HEADER_TAG = `<script type="module" src="${BASE_PATH}/js/auth-header.js"></script>`;
// suggestion-fab.js (?v=data-files cache-bust) + notifications-bell.js được
// dựng inline trong middleware để áp opt-out per-page (xem bên dưới).
// Analytics: chỉ gtag loader (analytics.js). Consent banner đã được bỏ theo
// yêu cầu user (jun 2026) — gây phiền và che nội dung. Analytics vẫn hoạt
// động theo mặc định "denied" (xem analytics.js) cho đến khi có cơ chế consent
// khác. `analytics.js` phải là script thường (không module) để global
// window.tiziaTrack/gtag khả dụng cho mọi inline script + module sau này.
const ANALYTICS_TAG = `<script src="${BASE_PATH}/js/analytics.js"></script>`;
r.get(/.*/, async (req, res, next) => {
  const u = req.path;
  if (u.startsWith('/api/') || u.startsWith('/vendor/')) return next();
  let rel;
  if (u === '/' || u.endsWith('/')) rel = (u + 'index.html').slice(1);
  else if (u.endsWith('.html')) rel = u.slice(1);
  else if (/\.[a-z0-9]+$/i.test(u)) return next();        // không phải HTML
  else rel = u.slice(1) + '.html';                         // express.static({extensions:['html']})
  const file = path.resolve(PUBLIC_DIR, rel);
  if (u === '/cay-tri-thuc.html') console.log('[HTML-DEBUG] rel=', rel, 'file=', file);
  if (!file.startsWith(PUBLIC_DIR + path.sep)) return next(); // chống path traversal
  try {
    const html = await fs.readFile(file, 'utf8');
    // Tránh nhúng trùng nếu trang đã include sẵn auth-header.js / analytics.js.
    const hasHeader = /auth-header\.js/i.test(html);
    const hasAnalytics = /\banalytics\.js/i.test(html);
    // Opt-out (đúng như phần chú thích trên): trang tự tắt widget global qua
    //   <body data-no-auth-header|data-no-suggestion-fab|data-no-notifications-bell|data-no-analytics>.
    // KHÔNG chỉ tự-vô-hiệu ở runtime — phải BỎ HẲN thẻ, vì các script này gọi
    // fetch('api/...') tương đối; trang ở thư mục con (vd /campus-proto/*) sẽ
    // phân giải thành /campus-proto/api/... → 404. Ngoài ra ?embed=1 (canvas
    // nhúng trong iframe) không cần bất kỳ chrome global nào → bỏ tất cả.
    const bodyOpen = (html.match(/<body[^>]*>/i) || [''])[0];
    const embed = req.query.embed != null || /\bdata-embed\b/i.test(bodyOpen);
    const noHeader = embed || /\bdata-no-auth-header\b/i.test(bodyOpen);
    const noSgf    = embed || /\bdata-no-suggestion-fab\b/i.test(bodyOpen);
    const noBell   = embed || /\bdata-no-notifications-bell\b/i.test(bodyOpen);
    const noAnalytics = embed || /\bdata-no-analytics\b/i.test(bodyOpen);
    const sgfTag =
      (noSgf ? '' : `<script type="module" src="${BASE_PATH}/js/suggestion-fab.js?v=fabauth1"></script>\n`)
      + (noBell ? '' : `<script type="module" src="${BASE_PATH}/js/notifications-bell.js"></script>`);
    const tags =
      ((hasAnalytics || noAnalytics) ? '' : ANALYTICS_TAG + '\n')
      + ((hasHeader || noHeader) ? '' : HEADER_TAG + '\n')
      + sgfTag;
    const idx = html.lastIndexOf('</body>');
    let out = idx >= 0 ? html.slice(0, idx) + tags + '\n' + html.slice(idx) : html + tags;
    // SEO: bổ sung default meta (favicon, og:image, canonical, twitter card, robots)
    // vào trang nào còn thiếu. Idempotent — không đè meta thủ công đã có.
    try {
      const origin = seoOriginOf(req, BASE_PATH);
      out = injectSeoHead(out, { origin, urlPath: req.path, basePath: BASE_PATH });
    } catch {}
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('Cache-Control', 'public, max-age=300, must-revalidate');
    res.send(out);
  } catch {
    next();
  }
});

// Vendored MediaPipe (mounted as relative path inside the Router)
// Đính kèm "Ban điều hành AI" — ảnh chụp màn hình + file của HS gửi kèm yêu cầu.
// Read-only (POST đi qua /api/requests/attachments có gate). Cache vài giờ vì
// asset bất biến (tên file random, ghi đè bất khả thi). NO directory listing.
r.use('/uploads/requests', express.static(REQUEST_UPLOADS_DIR, {
  fallthrough: false,
  index: false,
  setHeaders: (res, filePath) => {
    res.setHeader('Cache-Control', 'public, max-age=3600');
    // Phòng thủ nhiều lớp cho nội dung do người dùng tải lên:
    //  • nosniff: trình duyệt không tự đoán lại Content-Type.
    //  • CSP sandbox + default-src 'none': kể cả file HTML/SVG lọt vào cũng KHÔNG
    //    chạy được script khi mở thẳng.
    //  • Content-Disposition: ép tải về với mọi định dạng trừ ảnh raster an toàn —
    //    SVG/PDF/Office… không bao giờ render inline trong origin.
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('Content-Security-Policy', "default-src 'none'; sandbox");
    const ext = path.extname(filePath).toLowerCase();
    if (!REQUEST_INLINE_SAFE_EXT.has(ext)) res.setHeader('Content-Disposition', 'attachment');
  },
}));
r.use('/vendor/mediapipe', express.static(MEDIAPIPE_DIR, {
  maxAge: '7d',
  setHeaders: (res, p) => {
    if (p.endsWith('.wasm')) res.setHeader('Content-Type', 'application/wasm');
    if (p.endsWith('.mjs'))  res.setHeader('Content-Type', 'application/javascript');
  },
}));

// Static frontend (served last so /api/* wins on conflicts). Cache aggressively
// cho asset có hash/version, vừa phải cho HTML (HTML đã có middleware riêng phía trên).
// SEO bonus: header Cache-Control giúp Lighthouse score + giảm tải server.
r.use(express.static(PUBLIC_DIR, {
  extensions: ['html'],
  setHeaders: (res, filePath) => {
    if (/\.(?:js|css|woff2?|ttf|otf|eot)$/i.test(filePath)) {
      res.setHeader('Cache-Control', 'public, max-age=86400, stale-while-revalidate=604800');
    } else if (/\.(?:png|jpg|jpeg|gif|webp|avif|svg|ico|glb|gltf|hdr|exr|mp3|ogg|wav|mp4|webm)$/i.test(filePath)) {
      res.setHeader('Cache-Control', 'public, max-age=604800, stale-while-revalidate=2592000');
    } else if (/\.(?:webmanifest|json)$/i.test(filePath)) {
      res.setHeader('Cache-Control', 'public, max-age=3600');
    }
  },
}));

// 404 fallback → trang 404 chuyên dụng (status 404 + body riêng, không "soft 404").
// Google phân biệt: 404 + nội dung "không tìm thấy" → drop; 404 + landing page → soft 404
// và có thể giữ index nhầm. Trang 404.html đã có meta noindex,follow.
r.use((_req, res) => {
  res.status(404).sendFile(path.join(PUBLIC_DIR, '404.html'));
});

// Mount the Router. With BASE_PATH='/ps', all routes serve under /ps.
// With BASE_PATH='', all routes serve at root (default behavior).
if (BASE_PATH) {
  app.use(BASE_PATH, r);
  // Optional: 301 redirect root to BASE_PATH/ so bare domain still works
  app.get('/', (_req, res) => res.redirect(BASE_PATH + '/'));
} else {
  app.use(r);
}

// Error handler TẬP TRUNG — phải đặt SAU khi mount router. Mọi lỗi rơi ra route
// (throw đồng bộ hoặc next(err)) tới đây: report + trả JSON gọn kèm rid, không
// lộ stack ở prod. Route nào tự try/catch trả 500 thì không chạm tới đây.
app.use(expressErrorHandler);

// Khởi tạo schema Postgres + seed trước khi nhận traffic.
await initDb();
// Seed/khởi tạo các context (sau khi schema sẵn sàng). Bọc try/catch để 1 seed
// lỗi không chặn cả server; mỗi initX idempotent.
for (const [name, fn] of Object.entries({ initEconomy, initEngagement, initLearning, initExperiments, initSmartNotif })) {
  try { await fn(); } catch (e) { console.warn(`[init] ${name} failed:`, e.message); }
}

const httpServer = http.createServer(app);
attachRoom(httpServer, BASE_PATH);
attachPresence(httpServer);  // /ws-presence — multiplayer campus avatars
attachLiveQuizWs(httpServer, BASE_PATH);  // /ws-live
// Prune scoreup_webhook_events_seen mỗi 6h, giữ 7 ngày. Bảng nhỏ nhưng dedup
// theo event_id sẽ tích luỹ nếu ScoreUp gửi vài nghìn event/ngày — cleanup để
// tránh phình index. Không cần block startup.
setInterval(() => {
  pruneScoreUpEventsSeen().then(n => {
    if (n > 0) console.log(`[scoreup-webhook] pruned ${n} old event rows`);
  }).catch(e => console.warn('[scoreup-webhook] prune error:', e.message));
}, 6 * 3600 * 1000).unref?.();

// Bật error tracking (Sentry nếu có SENTRY_DSN) trước khi nhận traffic.
await initErrorTracking();

httpServer.listen(PORT, HOST, () => {
  log.info(`[tizia] listening on http://${HOST}:${PORT}`, { basePath: BASE_PATH || undefined });
  const oauthList = listEnabledProviders();
  if (oauthList.length) {
    log.info('[oauth] enabled providers', { providers: oauthList.map(p => p.label) });
  } else {
    log.info('[oauth] no providers configured (set GOOGLE_/MICROSOFT_/GITHUB_CLIENT_ID+SECRET to enable)');
  }
});
