// ============================================================
// GA4 Measurement Protocol (server-side event)
// ============================================================
// Dùng cho event canonical mà chỉ server biết chính xác:
//   • quiz_submit  (server tính điểm + lưu DB)
//   • ai_chat      (server gọi LLM — biết model, tokens, status)
//   • badge_unlock (server quyết định khi nào unlock)
//   • payment_success / subscribe (chỉ webhook server biết)
//
// Yêu cầu env:
//   GA_MEASUREMENT_ID = G-XXXXXXX
//   GA_API_SECRET     = secret tạo trong GA4 Admin → Data Streams → Web → Measurement Protocol API secrets
//
// Cách lấy client_id (để event server-side gắn vào đúng user web):
//   • Đọc cookie `_ga` (format "GA1.<n>.<rand>.<ts>") → ghép phần thứ 3+4.
//   • Fallback: cookie `tizia_anon_id` (UUID server tự cấp lần đầu request)
//     → không khớp được với phiên web nhưng vẫn tracked được unique subject.
// ============================================================

import { randomBytes } from 'node:crypto';

const GA_MEASUREMENT_ID = process.env.GA_MEASUREMENT_ID || '';
const GA_API_SECRET = process.env.GA_API_SECRET || '';
const GA_DEBUG = process.env.GA_DEBUG === '1';
const MP_URL = 'https://www.google-analytics.com/mp/collect';
const MP_DEBUG_URL = 'https://www.google-analytics.com/debug/mp/collect';

const ANON_COOKIE = 'tizia_anon_id';
const ANON_TTL_DAYS = 365;

export function gaConfigured() {
  return Boolean(GA_MEASUREMENT_ID && GA_API_SECRET);
}

/** Đọc client_id từ cookie `_ga` (gtag.js đã set sau khi consent granted). */
function readGaClientId(req) {
  const raw = req.headers.cookie || '';
  const m = raw.match(/(?:^|; )_ga=GA1\.\d+\.(\d+\.\d+)/);
  return m ? m[1] : null;
}

/** Đảm bảo client có anon_id (fallback khi chưa có _ga cookie). Set Set-Cookie nếu mới. */
export function ensureAnonId(req, res) {
  const cookies = req.headers.cookie || '';
  const m = cookies.match(new RegExp('(?:^|; )' + ANON_COOKIE + '=([^;]+)'));
  if (m) return m[1];
  const id = randomBytes(8).toString('hex');
  if (res && !res.headersSent) {
    const exp = new Date(Date.now() + ANON_TTL_DAYS * 24 * 3600 * 1000).toUTCString();
    // Append (không ghi đè Set-Cookie khác đã có, vd session login).
    const prev = res.getHeader('Set-Cookie');
    const cookie = `${ANON_COOKIE}=${id}; Path=/; Expires=${exp}; SameSite=Lax`;
    res.setHeader('Set-Cookie', prev ? [].concat(prev, cookie) : cookie);
  }
  return id;
}

/**
 * Bắn 1 event GA4 từ server. Best-effort: không throw — analytics KHÔNG được
 * làm vỡ request chính.
 * @param {object} req  - Express request (để lấy client_id + user_id)
 * @param {string} name - event_name (snake_case, ≤40 ký tự, GA4 reserved word tránh)
 * @param {object} [params] - event params (≤25 key, value ≤100 ký tự)
 */
export function sendGA4Event(req, name, params = {}) {
  if (!gaConfigured() || !name) return;
  const clientId = readGaClientId(req) || ensureAnonId(req, req.res || null);
  const userId = req.user?.id ? String(req.user.id) : undefined;
  const enriched = Object.assign({}, params);
  // engagement_time_msec yêu cầu của GA4 — không có sẽ không tính realtime.
  if (enriched.engagement_time_msec == null) enriched.engagement_time_msec = 1;

  const body = {
    client_id: clientId,
    ...(userId ? { user_id: userId } : {}),
    timestamp_micros: Date.now() * 1000,
    non_personalized_ads: true,
    events: [{ name: String(name).slice(0, 40), params: enriched }],
  };

  const url = `${GA_DEBUG ? MP_DEBUG_URL : MP_URL}?measurement_id=${encodeURIComponent(GA_MEASUREMENT_ID)}&api_secret=${encodeURIComponent(GA_API_SECRET)}`;
  // Fire-and-forget. Node 18+ có fetch toàn cục.
  fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  }).then(async (r) => {
    if (GA_DEBUG) {
      const txt = await r.text().catch(() => '');
      console.log('[ga4-mp]', name, r.status, txt.slice(0, 400));
    }
  }).catch((e) => {
    if (GA_DEBUG) console.warn('[ga4-mp] send failed:', e?.message || e);
  });
}
