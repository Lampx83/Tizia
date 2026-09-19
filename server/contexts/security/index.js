// ============================================================
// Security context — vá R4/R5/R6 của NO-FRAMEWORK-REVIEW (không lib ngoài)
// ============================================================
// Những thứ một framework "tặng kèm" mà Express thuần thiếu:
//   - rate limit (chống brute-force/DoS/spam AI)
//   - security headers (chống clickjacking/MIME-sniff/leak referrer)
//   - CSRF double-submit (cookie auth dễ bị CSRF)
//
// CSRF + CSP để ENFORCE=off mặc định (mechanism sẵn sàng, bật khi FE đã gửi token /
// CSP đã tinh chỉnh) → KHÔNG phá client đang chạy. Rate limit + headers an toàn bật ngay.
// ============================================================

import { createHmac, randomBytes, timingSafeEqual } from 'node:crypto';

function clientIp(req) {
  return (req.headers['x-forwarded-for'] || '').split(',')[0].trim() || req.socket?.remoteAddress || 'unknown';
}

// ── R6: Security headers ──
export function securityHeaders(_req, res, next) {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');              // khớp thiết kế iframe same-origin (apps.html)
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Permissions-Policy', 'geolocation=(), microphone=(self), camera=(self)'); // mic/cam cho VR/voice
  res.setHeader('X-XSS-Protection', '0');                      // tắt bộ lọc cũ (đã deprecated, dùng CSP)
  // CSP chỉ bật khi CSP_ENFORCE=1 (CSP sai sẽ phá three.js unpkg + inline). Mặc định off.
  if (process.env.CSP_ENFORCE === '1') {
    res.setHeader('Content-Security-Policy',
      "default-src 'self'; img-src 'self' data: blob:; " +
      "script-src 'self' 'unsafe-inline' https://unpkg.com; " +
      "style-src 'self' 'unsafe-inline'; connect-src 'self' https:; " +
      "worker-src 'self' blob:; frame-ancestors 'self'");
  }
  next();
}

// ── R5: Rate limit (in-memory sliding window theo IP+bucket) ──
// Bộ nhớ đủ cho 1 instance; multi-instance (Phase 2) chuyển sang Redis.
const buckets = new Map(); // key → number[] (timestamps)
function hit(key, windowMs, max) {
  const now = Date.now();
  let arr = buckets.get(key);
  if (!arr) { arr = []; buckets.set(key, arr); }
  // prune
  while (arr.length && arr[0] <= now - windowMs) arr.shift();
  if (arr.length >= max) return { ok: false, retryAfter: Math.ceil((arr[0] + windowMs - now) / 1000) };
  arr.push(now);
  return { ok: true, remaining: max - arr.length };
}
// dọn rác định kỳ
setInterval(() => {
  const now = Date.now();
  for (const [k, arr] of buckets) { if (!arr.length || arr[arr.length - 1] <= now - 600000) buckets.delete(k); }
}, 300000).unref?.();

/** Tạo middleware rate-limit. opts: { windowMs, max, bucket, keyFn }.
 *  keyFn(req) cho phép key theo USER thay vì IP — quan trọng vì cả trường thường
 *  chung 1 IP công cộng (NAT); key theo IP sẽ chặn nhầm cả lớp. */
export function rateLimit({ windowMs = 60000, max = 120, bucket = 'g', keyFn = null } = {}) {
  return (req, res, next) => {
    const id = keyFn ? keyFn(req) : clientIp(req);
    const r = hit(`${bucket}:${id}`, windowMs, max);
    if (!r.ok) {
      res.setHeader('Retry-After', String(r.retryAfter || 60));
      return res.status(429).json({ error: 'rate_limited', retry_after_seconds: r.retryAfter });
    }
    res.setHeader('X-RateLimit-Remaining', String(r.remaining ?? ''));
    next();
  };
}

// ── R4: CSRF double-submit ──
const CSRF_COOKIE = 'tizia_csrf';
const CSRF_SECRET = process.env.CSRF_SECRET || 'dev-csrf-secret-change-me';
const CSRF_ENFORCE = process.env.CSRF_ENFORCE === '1';
const SAFE_METHODS = new Set(['GET', 'HEAD', 'OPTIONS']);
// Miễn CSRF: webhook (HMAC), health, login/register (chưa có session để CSRF).
const CSRF_EXEMPT_PREFIX = ['/api/payment/vnpay/', '/api/health', '/api/auth/login', '/api/auth/register', '/api/csrf'];

function makeToken() {
  const raw = randomBytes(20).toString('hex');
  const mac = createHmac('sha256', CSRF_SECRET).update(raw).digest('hex').slice(0, 16);
  return `${raw}.${mac}`;
}
function validToken(t) {
  const [raw, mac] = String(t || '').split('.');
  if (!raw || !mac) return false;
  const exp = createHmac('sha256', CSRF_SECRET).update(raw).digest('hex').slice(0, 16);
  try { return timingSafeEqual(Buffer.from(mac), Buffer.from(exp)); } catch { return false; }
}
function getCookie(req, name) {
  const raw = req.headers.cookie; if (!raw) return null;
  for (const p of raw.split(';')) { const i = p.indexOf('='); if (i < 0) continue;
    if (p.slice(0, i).trim() === name) return decodeURIComponent(p.slice(i + 1).trim()); }
  return null;
}

/** Middleware CSRF. Cấp token (cookie không httpOnly) ở mọi GET; verify ở method ghi. */
export function csrf(req, res, next) {
  // Cấp/đảm bảo có token cho client đọc.
  let token = getCookie(req, CSRF_COOKIE);
  if (!token || !validToken(token)) {
    token = makeToken();
    const prev = res.getHeader('Set-Cookie');
    const cookie = `${CSRF_COOKIE}=${token}; Path=/; SameSite=Lax`; // KHÔNG httpOnly: client JS phải đọc được
    res.setHeader('Set-Cookie', prev ? [].concat(prev, cookie) : cookie);
  }
  req.csrfToken = token;

  if (SAFE_METHODS.has(req.method)) return next();
  if (CSRF_EXEMPT_PREFIX.some((p) => req.path.startsWith(p))) return next();
  // Chỉ kiểm khi request dùng cookie session (API gọi bằng Bearer/HMAC không cần).
  const hasSession = !!getCookie(req, 'tizia_sid');
  if (!hasSession) return next();

  const sent = req.headers['x-csrf-token'] || req.body?._csrf;
  const ok = validToken(sent) && sent === token;
  if (!ok) {
    if (CSRF_ENFORCE) return res.status(403).json({ error: 'csrf_failed', message: 'Thiếu/sai CSRF token (gửi header X-CSRF-Token).' });
    // Mặc định: log mà KHÔNG chặn (tránh phá client chưa cập nhật).
    console.warn(`[security] CSRF would-block ${req.method} ${req.path} (ip=${clientIp(req)}) — set CSRF_ENFORCE=1 để chặn`);
  }
  next();
}

/** Route cấp token tường minh cho client SPA/fetch. */
export function attachSecurity(r) {
  r.get('/api/csrf', (req, res) => res.json({ token: req.csrfToken || null }));
  console.log(`[security] headers + rate-limit ON; CSRF enforce=${CSRF_ENFORCE ? 'ON' : 'log-only'}; CSP=${process.env.CSP_ENFORCE === '1' ? 'ON' : 'off'}`);
}

export const plugin = {
  name: 'security',
  origin: 'dev-owned',
  sourceModule: 'server/contexts/security/index.js',
  mount(router) {
    attachSecurity(router);
  },
};

// Tiện ích export cho index.js gắn app-level.
// apiLimiter: CHỈ áp cho /api/* (mount app.use('/api', apiLimiter)), KHÔNG đụng
// static asset (1 lần tải trang giàu asset không được tính). Key theo user khi đã
// đăng nhập → 1 student spam không chặn cả lớp cùng IP trường. PHẢI mount SAU attachUser.
export const apiLimiter = rateLimit({
  windowMs: 60000, max: 600, bucket: 'api',
  keyFn: (req) => (req.user?.id ? `u${req.user.id}` : `ip${clientIp(req)}`),
});
// login/register: pre-auth nên key theo IP; nới đủ cho 1 lớp đăng nhập cùng lúc (60/phút).
export const sensitiveAuthLimiter = rateLimit({ windowMs: 60000, max: 60, bucket: 'auth' });
// Giữ alias cũ để không vỡ import (deprecated — dùng apiLimiter).
export const globalLimiter = apiLimiter;
