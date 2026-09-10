// Đăng nhập cho Tizia: scrypt password + opaque session token (cookie httpOnly).
// Không thêm thư viện ngoài — dùng node:crypto + better-sqlite3 sẵn có.

import { scryptSync, randomBytes, timingSafeEqual } from 'node:crypto';
import {
  createUser, getUserByUsername, getUserById, touchLogin, updateDisplayName, updateUserEditable,
  createSession, getSession, deleteSession,
  getBestParentPlanForChild,
  getEnrolledDomain, setEnrolledDomain,
  listUserDomainGrants, listManagedDomains,
} from '../../db.js';
import { effectivePlan, effectivePlanWithFamily, meetsPlan, USER_PLANS } from '../billing/user-plans.js';

const COOKIE_NAME = 'tizia_sid';
const SESSION_TTL_MS = 30 * 24 * 60 * 60 * 1000; // 30 ngày
const SCRYPT_KEYLEN = 64;

// ── Password hashing (scrypt) ──
function hashPassword(password) {
  const salt = randomBytes(16);
  const hash = scryptSync(String(password), salt, SCRYPT_KEYLEN);
  return `scrypt$${salt.toString('hex')}$${hash.toString('hex')}`;
}

function verifyPassword(password, stored) {
  try {
    const [algo, saltHex, hashHex] = String(stored || '').split('$');
    if (algo !== 'scrypt' || !saltHex || !hashHex) return false;
    const expected = Buffer.from(hashHex, 'hex');
    const actual = scryptSync(String(password), Buffer.from(saltHex, 'hex'), expected.length);
    return expected.length === actual.length && timingSafeEqual(expected, actual);
  } catch { return false; }
}

// ── Cookie helpers (tránh phụ thuộc cookie-parser) ──
function parseCookies(req) {
  const raw = req.headers.cookie;
  if (!raw) return {};
  const out = {};
  for (const part of raw.split(';')) {
    const i = part.indexOf('=');
    if (i < 0) continue;
    const k = part.slice(0, i).trim();
    const v = part.slice(i + 1).trim();
    if (k) out[k] = decodeURIComponent(v);
  }
  return out;
}

function buildSetCookie(name, value, { maxAge, expires, path = '/', sameSite = 'Lax' } = {}) {
  const parts = [`${name}=${encodeURIComponent(value)}`, `Path=${path}`, 'HttpOnly', `SameSite=${sameSite}`];
  if (maxAge != null) parts.push(`Max-Age=${Math.floor(maxAge / 1000)}`);
  if (expires) parts.push(`Expires=${new Date(expires).toUTCString()}`);
  return parts.join('; ');
}

function setSessionCookie(res, token, expiresAt) {
  res.setHeader('Set-Cookie', buildSetCookie(COOKIE_NAME, token, {
    maxAge: expiresAt - Date.now(), expires: expiresAt,
  }));
}

function clearSessionCookie(res) {
  res.setHeader('Set-Cookie', `${COOKIE_NAME}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0`);
}

// ── Lấy user hiện tại từ cookie ──
export function getCurrentUser(req) {
  const cookies = parseCookies(req);
  const token = cookies[COOKIE_NAME];
  if (!token) return null;
  const sess = getSession(token);
  if (!sess) return null;
  return {
    id: sess.user_id,
    username: sess.username,
    display_name: sess.display_name,
    role: sess.role,
    plan: sess.plan || 'free',
    plan_expires_at: sess.plan_expires_at || null,
    // Per-school enrollment: NULL = chưa chọn trường → FE bắt mở modal. Admin
    // cũng để NULL, bypass requireEnrollment middleware (Phase 2).
    enrolled_domain: sess.enrolled_domain || null,
    token: sess.token,
  };
}

// ── Middleware: gắn req.user (nullable) ──
export function attachUser(req, _res, next) {
  req.user = getCurrentUser(req);
  next();
}

// ── Middleware: bắt buộc đăng nhập cho API ──
export function requireAuth(req, res, next) {
  if (!req.user) req.user = getCurrentUser(req);
  if (!req.user) return res.status(401).json({ error: 'unauthorized', needLogin: true });
  next();
}

// ── Middleware: bắt buộc đã chọn trường (enrolled_domain) ──
// Mỗi tài khoản tại 1 thời điểm chỉ THAM GIA 1 trường. Mọi route ghi (submit
// quiz, run code, grant skill, sync wallet, scenario-runs, requests…) yêu cầu:
//   1. Đã đăng nhập (requireAuth).
//   2. Đã chọn trường (enrolled_domain != null) — admin bypass.
//   3. Nếu request có `domain` (body/query) → phải khớp enrolled_domain.
//      Khác trường → 403 viewOnly để FE bật banner "Bạn chỉ tham quan trường này".
//
// Admin (role='admin'): bypass cả 2/3 — có quyền thao tác trên mọi trường để
// chấm/duyệt. Giáo viên/phụ huynh: vẫn enforce (sẽ exempt sau khi xử lý xong
// luồng riêng cho 2 role này).
export function requireEnrolled(req, res, next) {
  if (!req.user) req.user = getCurrentUser(req);
  if (!req.user) return res.status(401).json({ error: 'unauthorized', needLogin: true });
  if (req.user.role === 'admin') return next();
  const enrolled = req.user.enrolled_domain || null;
  if (!enrolled) {
    return res.status(403).json({
      error: 'enrollment_required',
      needEnroll: true,
      message: 'Bạn cần chọn trường để bắt đầu học.',
    });
  }
  // Kiểm cross-domain nếu request có chỉ định trường mục tiêu
  const target = (req.body && req.body.domain) || (req.query && req.query.domain) || null;
  if (target && String(target) !== enrolled) {
    return res.status(403).json({
      error: 'view_only',
      viewOnly: true,
      your_school: enrolled,
      target_school: String(target),
      message: 'Bạn đang tham quan trường khác — chỉ xem được, không tương tác/làm bài/chơi game.',
    });
  }
  next();
}

// ── Middleware: bắt buộc gói cước ≥ level (B2C user plan) ──
// Dùng cho route premium (vd /api/ai/grade-essay yêu cầu 'pro'). Trả 402 Payment
// Required + meta để FE bật paywall modal. requireAuth phải chạy trước để có req.user.
export function requirePlan(minPlan) {
  return (req, res, next) => {
    if (!req.user) req.user = getCurrentUser(req);
    if (!req.user) return res.status(401).json({ error: 'unauthorized', needLogin: true });
    const eff = effectivePlan(req.user);
    if (!meetsPlan(eff.id, minPlan)) {
      return res.status(402).json({
        error: 'plan_required', current_plan: eff.id, required_plan: minPlan,
        message: `Tính năng này cần gói "${USER_PLANS[minPlan]?.name || minPlan}". Gói hiện tại: ${eff.name}.`,
        upgrade_url: '/pricing.html',
      });
    }
    next();
  };
}

// ── Gate trang HTML: chưa đăng nhập → redirect /login.html ──
// Whitelist các path không cần login (login/register, asset chung, health, /api/auth, PWA).
const PUBLIC_PATH_PREFIXES = [
  '/api/auth/', '/api/health',
  // Bootstrap GA4 measurement ID — public để banner consent + gtag chạy được ở
  // mọi trang (kể cả login/register/guest mode). Không trả bí mật, chỉ ID + role.
  '/api/analytics/bootstrap',
  // Pageview tracker — cần public để guest cũng đếm được (chiếm phần lớn
  // top-of-funnel). Server cứng-set name='page_view' và rate-limit theo IP,
  // không tin name từ client.
  '/api/track/pageview',
  // Cổng thanh toán callback (VNPay return + IPN). Xác thực bằng chữ ký HMAC,
  // KHÔNG bằng cookie — VNPay gọi server-to-server không kèm session. create-order
  // KHÔNG nằm ở đây nên vẫn yêu cầu đăng nhập.
  '/api/payment/vnpay/',
  // Webhook ScoreUp (& các vendor sau này) — auth bằng HMAC qua header riêng,
  // KHÔNG cookie. Receiver tự verify chữ ký rồi mới trust payload.
  '/api/webhooks/',
  // Bundle JS/scenarios không phải bí mật — guest cần để render trang chủ + trường Mầm non.
  '/js/',
  // Bundle i18n (public/i18n/*.json) — i18n.js fetch() ngay từ đầu trang, kể cả
  // guest/login.html. Thiếu whitelist này thì fetch bị auth gate redirect sang
  // /login.html (trả HTML thay vì JSON) — cùng dạng bug với /api/requests (#73).
  '/i18n/',
  // Bản đồ khuôn viên (iframe nhúng vào school.html) — không có bí mật, là HTML/JS thuần.
  '/campus-proto/',
  // Layout override của bản đồ — guest cũng cần fetch để render đúng map đã chỉnh.
  // POST (super-admin sửa) ở /api/admin/campus-layout — đã có requireAdmin riêng.
  '/api/campus-layout/',
  // Danh sách model cho palette editor — không có dữ liệu nhạy cảm.
  '/api/campus-models',
  // Catalog khung GDPT 2018 (5 phẩm chất + 10 năng lực + 164 sub-skill) — public
  // để trang giới thiệu năng lực render cho cả khách. /me, /grant, /space vẫn requireAuth.
  '/api/skills/catalog',
  // Content học (quiz + lý thuyết) — public vì FE vốn import JS scenario không
  // cần login (guest xem được trường Mầm non). GET đọc thoải mái; PUT/POST/DELETE
  // sửa content đã có requireAdmin riêng trong contexts/curriculum nên vẫn an toàn.
  '/api/curriculum/',
  // Content store tổng quát (data heterogeneous) — GET public như curriculum;
  // PUT/DELETE có requireAdmin riêng trong contexts/content.
  '/api/content',
  // Nhà thuốc 3D GPP — session/chat/action/score chỉ lưu in-memory (Map),
  // không ghi DB hay xài AI tốn quota nhạy cảm. Cho guest để mô phỏng
  // trải nghiệm như SV Dược (alert "kiểm tra đăng nhập" nếu chặn 401 →
  // UX tệ). Login user vẫn dùng được, không có dữ liệu nhạy cảm bị lộ.
  '/api/pharmacy/',
  '/manifest.webmanifest', '/sw.js', '/favicon',
  '/vendor/', '/models/',
  // Hộp thư "Ban điều hành AI" (bug #73: comment ở dưới từng khẳng định GET đã
  // công khai nhưng prefix này chưa từng có trong whitelist — 65% phiên AI board
  // ghi "hộp thư trống" vì route bị 401 trước khi tới handler). Route ghi (POST
  // /api/requests, /api/requests/attachments, /api/requests/:id/messages) đã có
  // requireAuth/requireEnrolled riêng ở handler nên vẫn được bảo vệ; các route
  // còn lại (GET /api/requests, /vote, /status, /decisions, /thread) vốn không
  // có gate riêng — handler GET /api/requests đã tự trả rỗng cho khách (xem
  // comment "không 401" ở server/index.js) nên để công khai đúng như thiết kế.
  '/api/requests',
  // Đính kèm yêu cầu (ảnh chụp màn hình / file HS gửi cho "Ban điều hành AI").
  // GET công khai vì inbox /api/requests cũng công khai; POST upload đã có
  // requireAuth + requireEnrolled gate riêng ở route /api/requests/attachments.
  '/uploads/requests/',
];
const PUBLIC_PATH_EXACT = new Set([
  '/login.html', '/register.html', '/login', '/register',
  // SEO: trang công khai crawlable cho Googlebot (xem contexts/seo).
  '/welcome', '/robots.txt', '/sitemap.xml',
  // CHẾ ĐỘ KHÁCH (không đăng nhập): được xem trang chủ + chợ app + trang trường
  // và các trang nội dung lớp học. Frontend tự khoá các trường ngoài danh sách
  // GUEST_DOMAINS cho khách (xem public/js/engine/domain.js). Mọi /api/* ghi dữ liệu
  // (attempts, classes, lessons…) vẫn yêu cầu đăng nhập, nên không có lỗ hổng.
  '/', '/index.html',
  '/apps.html',
  '/school.html',
  // Không gian (phòng học) trong từng trường — guest xem được như school.html.
  // FE tự khoá nếu domain ngoài GUEST_DOMAINS (xem public/js/engine/domain.js).
  '/space.html',
  '/subject.html', '/module.html', '/lesson.html', '/weekly-lesson.html',
  '/quiz.html',
  // Mini-game lớp 2 (primary domain — nằm trong GUEST_DOMAINS). Standalone,
  // guest chơi được; mọi /api/* ghi tiến độ vẫn yêu cầu login.
  '/lop2-ghep-van.html', '/lop2-am-nhac.html', '/lop2-anh-memory.html',
  '/lop2-dao-duc.html', '/lop2-phan-loai-rac.html', '/lop2-the-thao.html',
  // Cây Tri Thức — visualize tuần học đã hoàn thành. Trang đọc-only, guest cũng xem
  // được (render empty state nếu chưa có dữ liệu trong wallet/scenario-runs).
  '/cay-tri-thuc.html',
  // Bão Số Học — arcade luyện tính nhẩm. Standalone game, guest chơi được không cần login.
  '/bao-so-hoc.html',
  // Bản đồ Việt Nam Tri thức — game khám phá 34 tỉnh/thành. Standalone, guest chơi được.
  '/ban-do-vn.html',
  // Lab Hoá Học Ảo — kéo thả 2 hoá chất xem phản ứng. Standalone, guest chơi được.
  '/lab-hoa-ao.html',
  // Đố Chữ Ghép Vần — ghép âm tiết Tiếng Việt cho lớp 1-3. Standalone, guest chơi được.
  '/do-chu-ghep-van.html',
  // Pet Tri Thức — virtual pet "Tiziamon" tiến hoá theo XP. State trong localStorage,
  // sync XP với /api/wallet khi đã login (best-effort). Guest chơi được offline.
  '/pet-tri-thuc.html',
  // Bảng Phong Thần — leaderboard tổng hợp. Đọc /api/leaderboard, guest cũng xem được.
  '/bang-phong-than.html',
  // Trang Năng lực — guest cũng vào được, sẽ thấy CTA login nếu chưa đăng nhập.
  '/nang-luc.html',
  // Pixel Art Studio — canvas vẽ pixel 16/32. Lưu vào localStorage, guest dùng được.
  '/pixel-art-studio.html',
  // Code Quest — block-based programming puzzle. State trong localStorage, guest chơi được.
  '/code-quest.html',
  // Trang bảng giá — khách phải xem được trước khi đăng ký/mua.
  '/pricing.html', '/pricing',
  // Engagement / showcase pages — mới (Sprint W1+ → W3, Hour 1-6, Bonus). Guest
  // xem được, các action /api/* sẽ trả 401 và FE degrade graceful.
  '/kham-pha.html', '/tinh-nang.html',
  '/league.html', '/battle-pass.html', '/cua-hang.html',
  '/tran-dau.html', '/lap-trinh-game.html', '/hoc-thong-minh.html',
  '/campus-mp.html', '/srs.html', '/ai-quiz-gen.html',
  // Nhà thuốc 3D GPP — mô phỏng GPP cho SV Dược. Guest xem 3D + click hộp
  // thuốc + xoay camera được; /api/pharmacy/* (session/chat/score) vẫn
  // yêu cầu login, FE degrade graceful nếu chưa đăng nhập.
  '/nha-thuoc-3d.html',
]);

function isPublicPath(p) {
  if (PUBLIC_PATH_EXACT.has(p)) return true;
  for (const pref of PUBLIC_PATH_PREFIXES) if (p.startsWith(pref)) return true;
  // Cho phép các file css/png/svg/woff lẻ — chúng vô hại và sẽ được duyệt qua.
  return /\.(css|png|jpg|jpeg|gif|svg|webp|ico|woff2?|ttf|map)$/i.test(p);
}

export function makeAuthGate({ basePath = '' } = {}) {
  return function authGate(req, res, next) {
    if (isPublicPath(req.path)) return next();
    if (!req.user) req.user = getCurrentUser(req);
    if (req.user) return next();

    // API → 401 JSON; trang HTML → redirect login.
    if (req.path.startsWith('/api/')) {
      return res.status(401).json({ error: 'unauthorized', needLogin: true });
    }
    if (req.method !== 'GET' && req.method !== 'HEAD') {
      return res.status(401).send('Cần đăng nhập');
    }
    const ret = encodeURIComponent((basePath || '') + req.originalUrl);
    return res.redirect(`${basePath || ''}/login.html?return=${ret}`);
  };
}

// ── Helpers cho phân biệt HS/SV ──
// Valid major IDs cho SV — phải khớp DOMAIN_META trong public/js/engine/domain.js
// (chỉ cho phép trường ĐH/CĐ, không cho 'preschool'/'primary'/… vốn dành HS).
// 'driving' (Trường Lái xe) là trường dạy nghề/người lớn — không phải ngành ĐH
// nhưng vẫn cho SV/người lớn chọn để enroll & học, nên xếp chung ở đây.
const VALID_STUDENT_MAJORS = new Set([
  'pharmacy', 'it', 'economics', 'business', 'finance', 'medicine', 'nursing',
  'law', 'education', 'engineering', 'architecture', 'languages', 'agriculture',
  'tourism', 'arts', 'media', 'social-sciences', 'natural-sciences',
  'logistics', 'public-admin', 'driving',
]);

// Mỗi tài khoản 1 trường tại 1 thời điểm. Union HS-K12 + ĐH (= VALID_STUDENT_MAJORS).
// FE đọc cùng danh sách qua DOMAIN_META (public/js/engine/domain.js). Nếu thêm
// trường mới, cập nhật cả 2 nơi.
export const ENROLLABLE_DOMAINS = new Set([
  'preschool', 'primary', 'secondary', 'highschool',
  ...VALID_STUDENT_MAJORS,
]);

/** Profile đã đủ thông tin để vào app chưa? Teacher luôn đủ; pupil cần grade;
 *  student cần major. school_name + cohort là tuỳ chọn (không chặn). */
export function isProfileComplete(user) {
  if (!user) return false;
  if (user.role === 'teacher') return true;
  if (user.role === 'pupil') return Number.isFinite(user.grade) && user.grade >= 1 && user.grade <= 12;
  if (user.role === 'student') return !!user.major && VALID_STUDENT_MAJORS.has(user.major);
  return true; // role lạ → để qua, không chặn
}

/** Quyết định URL HS/SV/GV được điều hướng tới sau login. Trả relative path. */
export function defaultRouteForUser(user) {
  if (!user) return '/';
  if (user.role === 'teacher') return '/dashboard.html';
  if (user.role === 'pupil') {
    const g = Number(user.grade);
    if (g >= 1 && g <= 5) return '/school.html?domain=primary';
    if (g >= 6 && g <= 9) return '/school.html?domain=secondary';
    if (g >= 10 && g <= 12) return '/school.html?domain=highschool';
    return '/school.html?domain=preschool'; // chưa khai grade → coi như Mầm non
  }
  if (user.role === 'student' && user.major && VALID_STUDENT_MAJORS.has(user.major)) {
    return `/school.html?domain=${encodeURIComponent(user.major)}`;
  }
  return '/'; // fallback: trang chủ có school selector
}

// ── Routes ──
const USERNAME_RE = /^[a-z0-9_.-]{3,32}$/i;

export function attachAuth(r) {
  // POST /api/auth/register
  r.post('/api/auth/register', (req, res) => {
    const b = req.body ?? {};
    const username = String(b.username || '').trim();
    const password = String(b.password || '');
    const display_name = String(b.displayName || b.display_name || username).trim().slice(0, 60);
    const roleRaw = String(b.role || 'student').toLowerCase();
    const role = ['pupil', 'student', 'teacher'].includes(roleRaw) ? roleRaw : 'student';
    const ageRaw = Number(b.age);
    const age = Number.isFinite(ageRaw) ? Math.floor(ageRaw) : null;

    // Trục 1: profile theo role. Validate ở dưới sau check chung — cho user thấy lỗi
    // cơ bản (username/password) trước rồi mới đến lỗi field role-specific.
    const gradeRaw = Number(b.grade);
    const grade = Number.isFinite(gradeRaw) ? Math.floor(gradeRaw) : null;
    const major = String(b.major || '').trim() || null;
    const cohort = String(b.cohort || '').trim().slice(0, 20) || null;
    const school_name = String(b.schoolName || b.school_name || '').trim().slice(0, 120) || null;

    if (!USERNAME_RE.test(username)) {
      return res.status(400).json({ error: 'username không hợp lệ (3-32 ký tự a-z, 0-9, _ . -)' });
    }
    if (password.length < 6) {
      return res.status(400).json({ error: 'mật khẩu tối thiểu 6 ký tự' });
    }
    if (!display_name) {
      return res.status(400).json({ error: 'cần tên hiển thị' });
    }
    if (age == null || age < 3 || age > 100) {
      return res.status(400).json({ error: 'tuổi phải từ 3 đến 100' });
    }
    if (getUserByUsername(username)) {
      return res.status(409).json({ error: 'username đã tồn tại' });
    }

    // Validate field role-specific. Cho phép thiếu (sẽ rơi vào /complete-profile)
    // nhưng nếu user CÓ điền thì phải hợp lệ — tránh major lạ chui vào DB.
    if (role === 'pupil' && grade != null && (grade < 1 || grade > 12)) {
      return res.status(400).json({ error: 'lớp phải từ 1 đến 12 (Tiểu học → THPT)' });
    }
    if (role === 'student' && major && !VALID_STUDENT_MAJORS.has(major)) {
      return res.status(400).json({ error: 'ngành học không hợp lệ' });
    }

    const { id } = createUser({
      username, display_name,
      password_hash: hashPassword(password),
      role, age,
      grade, major, cohort, school_name,
    });
    const token = randomBytes(32).toString('hex');
    const { expires_at } = createSession({ token, user_id: id, ttlMs: SESSION_TTL_MS });
    touchLogin(id);
    setSessionCookie(res, token, expires_at);
    // Gợi ý FE redirect: nếu profile đủ → vào trường phù hợp; thiếu → /complete-profile.
    const userObj = { id, username, display_name, role, age, grade, major, cohort, school_name };
    const redirectTo = isProfileComplete(userObj) ? defaultRouteForUser(userObj) : '/complete-profile.html';
    res.json({ ok: true, user: userObj, redirectTo });
  });

  // POST /api/auth/login
  r.post('/api/auth/login', (req, res) => {
    const b = req.body ?? {};
    const username = String(b.username || '').trim();
    const password = String(b.password || '');
    const user = getUserByUsername(username);
    if (!user || !verifyPassword(password, user.password_hash)) {
      return res.status(401).json({ error: 'tài khoản hoặc mật khẩu không đúng' });
    }
    const token = randomBytes(32).toString('hex');
    const { expires_at } = createSession({ token, user_id: user.id, ttlMs: SESSION_TTL_MS });
    touchLogin(user.id);
    setSessionCookie(res, token, expires_at);
    const userObj = {
      id: user.id, username: user.username, display_name: user.display_name,
      role: user.role, age: user.age,
      grade: user.grade, major: user.major, cohort: user.cohort, school_name: user.school_name,
    };
    const redirectTo = isProfileComplete(userObj) ? defaultRouteForUser(userObj) : '/complete-profile.html';
    res.json({ ok: true, user: userObj, redirectTo });
  });

  // POST /api/auth/logout
  r.post('/api/auth/logout', (req, res) => {
    const cookies = parseCookies(req);
    const token = cookies[COOKIE_NAME];
    if (token) deleteSession(token);
    clearSessionCookie(res);
    res.json({ ok: true });
  });

  // GET /api/auth/me
  r.get('/api/auth/me', (req, res) => {
    const u = req.user || getCurrentUser(req);
    if (!u) return res.status(401).json({ error: 'unauthorized' });
    const full = getUserById(u.id);
    const eff = full ? effectivePlan(full) : null;
    // Trục 4: nếu HS có PH linked với gói cao hơn → kế thừa. Báo cờ inherited_plan
    // để UI hiển thị "Bạn được PH chia sẻ gói Plus" thay vì cho mua nâng cấp.
    let effFamily = eff;
    let inheritedFromParent = false;
    if (full && full.role === 'pupil') {
      const parent = getBestParentPlanForChild(full.id);
      if (parent) {
        // Map field name: SQL trả parent_plan/parent_plan_expires_at, helper cần plan/plan_expires_at.
        effFamily = effectivePlanWithFamily(full, { plan: parent.parent_plan, plan_expires_at: parent.parent_plan_expires_at });
        if (effFamily.id !== eff.id) inheritedFromParent = true;
      }
    }
    res.json({
      user: full ? {
        id: full.id, username: full.username, display_name: full.display_name,
        role: full.role, age: full.age,
        email: full.email, avatar_url: full.avatar_url,
        created_at: full.created_at, last_login: full.last_login,
        // Plan: stored = cột raw trong DB; effective = đã xét hết hạn (degrade về free)
        plan: full.plan || 'free',
        plan_expires_at: full.plan_expires_at || null,
        billing_cycle: full.billing_cycle || null,
        effective_plan: effFamily?.id || 'free',
        inherited_from_parent: inheritedFromParent,
        // Trục 1: phân biệt HS/SV
        grade: full.grade, major: full.major, cohort: full.cohort, school_name: full.school_name,
        // Mỗi tài khoản 1 trường tại 1 thời điểm. NULL = chưa chọn → FE bắt mở
        // modal. Admin (role='admin') để NULL = không bound vào trường, bypass
        // requireEnrollment ở mọi /api/* ghi.
        enrolled_domain: full.enrolled_domain || null,
        // Per-user grants — admin đã mở thêm trường nào cho user này (kể cả
        // trường khoá). FE dùng để bỏ qua isDomainOpen/plan check.
        granted_domains: listUserDomainGrants(full.id),
        // Per-user school-admin role: user có quyền QUẢN LÝ trường nào (xem HS,
        // cấu hình campus, gán app vào toà nhà…). Khác với granted_domains
        // (chỉ ACCESS). 1 user có thể quản lý nhiều trường.
        managed_domains: listManagedDomains(full.id),
        profile_complete: isProfileComplete(full),
        default_route: defaultRouteForUser(full),
      } : null,
    });
  });

  // POST /api/auth/me — người dùng tự sửa hồ sơ (tên hiển thị + tuổi + email)
  r.post('/api/auth/me', (req, res) => {
    if (!req.user) req.user = getCurrentUser(req);
    if (!req.user) return res.status(401).json({ error: 'unauthorized' });
    const b = req.body ?? {};
    const name = String(b.displayName || '').trim().slice(0, 60);
    if (!name) return res.status(400).json({ error: 'tên hiển thị không được trống' });

    // age: bắt buộc hợp lệ nếu có gửi (giữ ràng buộc giống đăng ký 3–100)
    const ageRaw = Number(b.age);
    const age = Number.isFinite(ageRaw) ? Math.floor(ageRaw) : null;
    if (age == null || age < 3 || age > 100) {
      return res.status(400).json({ error: 'tuổi phải từ 3 đến 100' });
    }

    // email: tuỳ chọn; nếu có phải đúng định dạng cơ bản
    let email = b.email == null ? '' : String(b.email).trim().slice(0, 120);
    if (email && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      return res.status(400).json({ error: 'email không hợp lệ' });
    }

    // Trục 1: cho phép sửa thêm grade/major/cohort/school_name. Giữ giá trị cũ nếu
    // body không gửi (undefined) — chỉ ghi đè khi key có trong b.
    const cur = getUserById(req.user.id) || {};
    const grade = b.grade === undefined ? cur.grade
      : (Number.isFinite(Number(b.grade)) ? Math.floor(Number(b.grade)) : null);
    const major = b.major === undefined ? cur.major
      : (String(b.major || '').trim() || null);
    const cohort = b.cohort === undefined ? cur.cohort
      : (String(b.cohort || '').trim().slice(0, 20) || null);
    const school_name = (b.schoolName === undefined && b.school_name === undefined) ? cur.school_name
      : (String(b.schoolName || b.school_name || '').trim().slice(0, 120) || null);

    if (cur.role === 'pupil' && grade != null && (grade < 1 || grade > 12)) {
      return res.status(400).json({ error: 'lớp phải từ 1 đến 12' });
    }
    if (cur.role === 'student' && major && !VALID_STUDENT_MAJORS.has(major)) {
      return res.status(400).json({ error: 'ngành học không hợp lệ' });
    }

    updateUserEditable(req.user.id, { display_name: name, age, email, grade, major, cohort, school_name });
    const full = getUserById(req.user.id);
    res.json({
      ok: true,
      user: full ? {
        id: full.id, username: full.username, display_name: full.display_name,
        role: full.role, age: full.age, email: full.email, avatar_url: full.avatar_url,
        grade: full.grade, major: full.major, cohort: full.cohort, school_name: full.school_name,
        profile_complete: isProfileComplete(full),
        default_route: defaultRouteForUser(full),
      } : null,
    });
  });

  // POST /api/auth/complete-profile — endpoint riêng cho modal khai bổ sung (user
  // cũ trước migration). Chỉ cập nhật 4 trường HS/SV, không đụng display_name/age/email.
  // Trả redirectTo để FE bay thẳng tới trường phù hợp.
  r.post('/api/auth/complete-profile', (req, res) => {
    if (!req.user) req.user = getCurrentUser(req);
    if (!req.user) return res.status(401).json({ error: 'unauthorized' });
    const cur = getUserById(req.user.id);
    if (!cur) return res.status(404).json({ error: 'user not found' });

    const b = req.body ?? {};
    const gradeRaw = Number(b.grade);
    const grade = Number.isFinite(gradeRaw) ? Math.floor(gradeRaw) : null;
    const major = String(b.major || '').trim() || null;
    const cohort = String(b.cohort || '').trim().slice(0, 20) || null;
    const school_name = String(b.schoolName || b.school_name || '').trim().slice(0, 120) || null;

    if (cur.role === 'pupil') {
      if (!Number.isFinite(grade) || grade < 1 || grade > 12) {
        return res.status(400).json({ error: 'Vui lòng chọn lớp (1–12)' });
      }
    } else if (cur.role === 'student') {
      if (!major || !VALID_STUDENT_MAJORS.has(major)) {
        return res.status(400).json({ error: 'Vui lòng chọn ngành học' });
      }
    }
    // teacher: cho qua, không bắt buộc.

    updateUserEditable(cur.id, {
      display_name: cur.display_name, age: cur.age, email: cur.email,
      grade, major, cohort, school_name,
    });
    const full = getUserById(cur.id);
    res.json({
      ok: true,
      user: full,
      redirectTo: defaultRouteForUser(full),
    });
  });

  // ── Per-school enrollment ───────────────────────────────────────────
  // POST /api/me/enroll {domain}: chọn trường LẦN ĐẦU. Chỉ chấp nhận khi user
  // chưa có enrolled_domain (tránh dùng để bypass switch-school). Sau khi gọi,
  // mọi route ghi (wallet, scenario-runs, skills/grant, requests…) đi qua bucket
  // mới. Bucket cũ (domain='') vẫn lưu → admin có thể truy xuất nếu cần audit.
  r.post('/api/me/enroll', (req, res) => {
    if (!req.user) req.user = getCurrentUser(req);
    if (!req.user) return res.status(401).json({ error: 'unauthorized' });
    const domain = String(req.body?.domain || '').trim().slice(0, 40);
    if (!ENROLLABLE_DOMAINS.has(domain)) {
      return res.status(400).json({ error: 'invalid domain', valid: [...ENROLLABLE_DOMAINS] });
    }
    const cur = getEnrolledDomain(req.user.id);
    if (cur) {
      return res.status(409).json({
        error: 'already_enrolled',
        enrolled_domain: cur,
        message: 'Bạn đã chọn trường rồi. Nếu muốn đổi trường, dùng /api/me/switch-school.',
      });
    }
    setEnrolledDomain(req.user.id, domain);
    res.json({ ok: true, enrolled_domain: domain });
  });

  // POST /api/me/switch-school {domain}: đổi trường. Bucket cũ (ví/skill/level
  // ở trường trước) KHÔNG bị xoá — chỉ ẩn vì query luôn lọc theo enrolled_domain
  // hiện tại. Quay lại trường cũ → bucket cũ tự hiện lại đúng tiến trình. FE phải
  // hiện cảnh báo "đổi trường = bắt đầu lại XP/coin/level/skill ở trường mới"
  // trước khi gọi (anh Lâm xác nhận giữ ẩn, không xoá).
  r.post('/api/me/switch-school', (req, res) => {
    if (!req.user) req.user = getCurrentUser(req);
    if (!req.user) return res.status(401).json({ error: 'unauthorized' });
    const domain = String(req.body?.domain || '').trim().slice(0, 40);
    if (!ENROLLABLE_DOMAINS.has(domain)) {
      return res.status(400).json({ error: 'invalid domain', valid: [...ENROLLABLE_DOMAINS] });
    }
    const previous = getEnrolledDomain(req.user.id);
    if (previous === domain) {
      return res.json({ ok: true, enrolled_domain: domain, unchanged: true });
    }
    setEnrolledDomain(req.user.id, domain);
    res.json({ ok: true, enrolled_domain: domain, previous_domain: previous });
  });
}

// ── Middleware: ép user (đã login) khai bổ sung profile nếu thiếu ──
// Đặt SAU makeAuthGate trong server/index.js. Bỏ qua: API auth, page /complete-profile
// chính nó, asset tĩnh, /logout. Không động tới guest (req.user == null) — guest đã
// được makeAuthGate xử lý.
const PROFILE_GATE_EXEMPT = new Set([
  '/complete-profile.html', '/complete-profile',
  '/logout', '/api/auth/logout', '/api/auth/me', '/api/auth/complete-profile',
  '/api/analytics/bootstrap',
]);
function isProfileGateExempt(p) {
  if (PROFILE_GATE_EXEMPT.has(p)) return true;
  if (p.startsWith('/api/auth/')) return true;
  if (p.startsWith('/js/') || p.startsWith('/vendor/')) return true;
  if (/\.(css|png|jpg|jpeg|gif|svg|webp|ico|woff2?|ttf|map|js|webmanifest)$/i.test(p)) return true;
  return false;
}
export function makeProfileGate({ basePath = '' } = {}) {
  return function profileGate(req, res, next) {
    if (!req.user) return next();                       // guest → để authGate lo
    if (isProfileGateExempt(req.path)) return next();
    // Đọc full user 1 lần để check profile (req.user chỉ có vài field từ session).
    const full = getUserById(req.user.id);
    if (!full || isProfileComplete(full)) return next();
    if (req.path.startsWith('/api/')) {
      return res.status(409).json({ error: 'profile_incomplete', complete_profile_url: '/complete-profile.html' });
    }
    return res.redirect(`${basePath || ''}/complete-profile.html`);
  };
}
