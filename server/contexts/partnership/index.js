// ============================================================
// Partnership context — mục «Hợp tác» của Tizia (18/10/2026)
// ============================================================
// Ba nhóm route:
//   1. CÔNG KHAI (ngoài auth gate — xem PUBLIC_PATH_PREFIXES ở identity/auth.js):
//        GET  /api/partnership/info       email liên hệ hợp tác (biến PARTNERSHIP_CONTACT_EMAIL)
//        POST /api/partnership/requests   form liên hệ hợp tác của TỔ CHỨC (trang /hop-tac)
//   2. QUẢN TRỊ (requireAdmin, role='admin'):
//        GET    /api/admin/partnership            danh sách (lọc trạng thái, tìm kiếm)
//        GET    /api/admin/partnership/:id        chi tiết
//        PATCH  /api/admin/partnership/:id        {status?, adminNote?, spam?}
//        POST   /api/admin/partnership/:id/withdraw   đánh dấu rút đồng ý (xoá email + điện thoại)
//        DELETE /api/admin/partnership/:id        xoá hẳn
//      Giao diện: public/admin-hop-tac.html.
//   3. CRM (HMAC, cho SIM kéo lead — đặc tả SIM docs/growth-agent.md §5.1.3):
//        GET /api/internal/growth/leads?from=YYYY-MM-DD&to=YYYY-MM-DD
//      Khoá GROWTH_LEADS_KEY (≥24 ký tự). Chưa đặt → 503 (bản không bán hàng không lộ gì).
//
// Nguyên tắc dữ liệu:
//   • Form CHỈ dành cho tổ chức, người gửi từ 18 tuổi, đại diện đơn vị. KHÔNG bao giờ
//     gắn với tài khoản Tizia: route không đọc req.user, không lưu user_id, client
//     gửi với credentials:'omit'.
//   • Không lưu IP (kể cả dạng băm) — chống spam bằng ô bẫy + bộ đếm in-memory.
//   • Endpoint leads chỉ trả lead tổ chức tự gửi qua form; không bao giờ có người dùng
//     cá nhân, email tài khoản, id người dùng hay anonId.
//   • Lưu tối đa 24 tháng kể từ lần trao đổi cuối (updated_at) — job dọn mỗi ngày.
// ============================================================

import { createHmac, timingSafeEqual } from 'node:crypto';
import { db } from '../../db.js';
import { rateLimit } from '../security/index.js';

export const CONSENT_VERSION = 'hop-tac-2026-10';
export const LEADS_PATH = '/api/internal/growth/leads';

export const ORG_TYPES = {
  university: 'Trường đại học/cao đẳng',
  school: 'Trường phổ thông',
  training_center: 'Trung tâm đào tạo',
  company: 'Doanh nghiệp',
  government: 'Cơ quan nhà nước',
  other: 'Tổ chức khác',
};

// Lĩnh vực hợp tác — khớp các nhóm trên trang /hop-tac (web-next/app/hop-tac).
export const AREAS = {
  org_license: 'Dùng Tizia cho đơn vị (gói tổ chức, triển khai riêng)',
  integration: 'Tích hợp và API',
  reseller: 'Đối tác giới thiệu và phân phối',
  content: 'Hợp tác nội dung, học liệu',
  research: 'Nghiên cứu chung',
  other: 'Khác',
};

export const STATUSES = ['new', 'contacted', 'closed'];

const DAY_MS = 86400000;
const RETENTION_MS = 730 * DAY_MS; // 24 tháng
const VN_OFFSET_MS = 7 * 3600000;
const LEADS_MAX = 5000;
const LEADS_MAX_DAYS = 366;
const SIG_WINDOW_S = 300;
const KEY_MIN = 24;

const EMAIL_RE = /^[^\s@<>()[\],;:"]+@[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?(?:\.[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?)+$/;
const PHONE_RE = /^[0-9+().\s-]{6,30}$/;
// Email thử / tên miền dành riêng: lưu bình thường nhưng KHÔNG đưa sang CRM.
const TEST_EMAIL_RE = /@(?:example\.(?:com|org|net)|(?:[^@]+\.)?(?:test|invalid|local|localhost|example))$/i;
const CLICK_ID_KINDS = new Set(['gclid', 'fbclid', 'ttclid', 'msclkid', 'zclid']);

class FieldError extends Error {
  constructor(field, message) { super(message); this.field = field; }
}

// Chuẩn hoá chuỗi: bỏ NUL, gộp khoảng trắng (trừ nội dung nhiều dòng).
function text(v, { field, label, max, min = 0, required = true, multiline = false }) {
  let s = String(v ?? '').replace(/\u0000/g, '');
  s = multiline ? s.replace(/\r\n?/g, '\n').trim() : s.replace(/\s+/g, ' ').trim();
  if (!s) {
    if (required) throw new FieldError(field, `Vui lòng nhập «${label}».`);
    return null;
  }
  if (s.length < min) throw new FieldError(field, `«${label}» cần ít nhất ${min} ký tự.`);
  if (s.length > max) throw new FieldError(field, `«${label}» tối đa ${max} ký tự.`);
  return s;
}

// Giá trị UTM: ngắn, không chứa '@' (tránh lọt email vào dữ liệu nguồn).
function utm(v, max = 100) {
  const s = String(v ?? '').replace(/[\u0000-\u001f]/g, '').trim();
  if (!s || s.includes('@')) return null;
  return s.slice(0, max);
}

export function validateRequest(b = {}) {
  const organization = text(b.organization, { field: 'organization', label: 'Tên đơn vị', min: 2, max: 200 });
  const orgType = String(b.orgType || '');
  if (!ORG_TYPES[orgType]) throw new FieldError('orgType', 'Vui lòng chọn «Loại đơn vị».');
  const contactName = text(b.contactName, { field: 'contactName', label: 'Người liên hệ', min: 2, max: 100 });
  const email = text(b.email, { field: 'email', label: 'Email', max: 200 }).toLowerCase();
  if (!EMAIL_RE.test(email)) throw new FieldError('email', '«Email» không đúng định dạng.');
  const phone = text(b.phone, { field: 'phone', label: 'Điện thoại', max: 30, required: false });
  if (phone && !PHONE_RE.test(phone)) throw new FieldError('phone', '«Điện thoại» chỉ gồm chữ số và các ký tự + ( ) . -');
  const area = String(b.area || '');
  if (!AREAS[area]) throw new FieldError('area', 'Vui lòng chọn «Lĩnh vực hợp tác».');
  const message = text(b.message, { field: 'message', label: 'Nội dung', min: 10, max: 3000, multiline: true });
  let seats = null;
  if (b.seats !== undefined && b.seats !== null && String(b.seats).trim() !== '') {
    seats = Number(String(b.seats).trim());
    if (!Number.isInteger(seats) || seats < 1 || seats > 1000000) {
      throw new FieldError('seats', '«Số người dùng dự kiến» là số nguyên từ 1 đến 1.000.000.');
    }
  }
  if (b.consent !== true) {
    throw new FieldError('consent', 'Vui lòng xác nhận bạn từ 18 tuổi, đại diện đơn vị và đồng ý để Tizia liên hệ.');
  }
  const s = b.source && typeof b.source === 'object' ? b.source : {};
  let landingPath = utm(s.landingPath, 300);
  if (landingPath && !landingPath.startsWith('/')) landingPath = null;
  let referrerHost = utm(s.referrerHost, 200);
  if (referrerHost && !/^[a-z0-9.-]+(?::\d+)?$/i.test(referrerHost)) referrerHost = null;
  const clickIdKind = CLICK_ID_KINDS.has(String(s.clickIdKind || '')) ? String(s.clickIdKind) : null;
  return {
    organization, orgType, contactName, email, phone, area, message, seats,
    source: {
      utmSource: utm(s.utmSource), utmMedium: utm(s.utmMedium), utmCampaign: utm(s.utmCampaign),
      utmContent: utm(s.utmContent), utmTerm: utm(s.utmTerm), clickIdKind, landingPath, referrerHost,
    },
  };
}

const Q = {
  insert: db.prepare(`
    INSERT INTO partnership_requests
      (organization, org_type, contact_name, email, phone, area, message, seats,
       consent_at, consent_version, utm_source, utm_medium, utm_campaign, utm_content, utm_term,
       click_id_kind, landing_path, referrer_host, is_test, status, created_at, updated_at)
    VALUES (@organization, @orgType, @contactName, @email, @phone, @area, @message, @seats,
       @t, @consentVersion, @utmSource, @utmMedium, @utmCampaign, @utmContent, @utmTerm,
       @clickIdKind, @landingPath, @referrerHost, @isTest, 'new', @t, @t)
    RETURNING id`),
  get: db.prepare(`SELECT * FROM partnership_requests WHERE id = ?`),
  counts: db.prepare(`SELECT status, COUNT(*)::int AS n FROM partnership_requests GROUP BY status`),
  withdraw: db.prepare(`UPDATE partnership_requests
    SET withdrawn_at = @t, email = NULL, phone = NULL, updated_at = @t
    WHERE id = @id AND withdrawn_at IS NULL`),
  del: db.prepare(`DELETE FROM partnership_requests WHERE id = ?`),
  purge: db.prepare(`DELETE FROM partnership_requests WHERE updated_at < ?`),
  leads: db.prepare(`SELECT * FROM partnership_requests
    WHERE created_at >= @start AND created_at < @end
      AND withdrawn_at IS NULL AND is_test = 0 AND spam = 0
    ORDER BY created_at, id LIMIT @limit`),
  optOuts: db.prepare(`SELECT id, withdrawn_at FROM partnership_requests
    WHERE withdrawn_at IS NOT NULL AND withdrawn_at >= @start AND withdrawn_at < @end
      AND is_test = 0 AND spam = 0
    ORDER BY withdrawn_at, id LIMIT @limit`),
};

export async function saveRequest(v, now = Date.now()) {
  const row = await Q.insert.get({
    ...v, ...v.source, t: now, consentVersion: CONSENT_VERSION, isTest: TEST_EMAIL_RE.test(v.email) ? 1 : 0,
  });
  return row.id;
}

// Xoá yêu cầu quá 24 tháng kể từ lần trao đổi cuối (updated_at đổi mỗi khi admin
// cập nhật trạng thái/ghi chú). Trả số bản ghi đã xoá.
export async function purgeExpired(now = Date.now()) {
  const r = await Q.purge.run(now - RETENTION_MS);
  return r.changes || 0;
}

function contactEmail() {
  const e = String(process.env.PARTNERSHIP_CONTACT_EMAIL || '').trim();
  return EMAIL_RE.test(e) ? e : null;
}

// ── CRM: endpoint leads (HMAC) ──────────────────────────────────────────────
export function leadsKey() {
  const k = String(process.env.GROWTH_LEADS_KEY || '').trim();
  return k.length >= KEY_MIN ? k : '';
}

export function signLeads(key, ts, method, path, rawQuery) {
  const msg = `${ts}\n${String(method).toUpperCase()}\n${path}\n${String(rawQuery || '').replace(/^\?/, '')}`;
  return createHmac('sha256', key).update(msg, 'utf8').digest('hex');
}

export function verifyLeads(key, tsHeader, sigHeader, method, paths, rawQuery, nowMs = Date.now()) {
  const ts = String(tsHeader || '');
  const sig = String(sigHeader || '');
  if (!key || !/^\d{1,12}$/.test(ts) || !/^[0-9a-f]{64}$/.test(sig)) return false;
  if (Math.abs(Number(ts) - nowMs / 1000) > SIG_WINDOW_S) return false;
  let ok = false;
  for (const p of paths) {
    const exp = Buffer.from(signLeads(key, ts, method, p, rawQuery), 'utf8');
    ok = timingSafeEqual(exp, Buffer.from(sig, 'utf8')) || ok;
  }
  return ok;
}

export function leadRef(key, id) {
  return 'org:' + createHmac('sha256', key).update(`lead\n${id}`, 'utf8').digest('hex').slice(0, 16);
}

function iso(ms) { return new Date(Number(ms)).toISOString(); }

// 'YYYY-MM-DD' theo giờ Việt Nam → ms UTC đầu ngày (hoặc hết ngày nếu end=true).
function parseVnDay(s, key, end) {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s);
  if (!m) throw new FieldError(`${key}_invalid`, `${key}_invalid`);
  const [y, mo, d] = [Number(m[1]), Number(m[2]), Number(m[3])];
  const utc = Date.UTC(y, mo - 1, d);
  const chk = new Date(utc);
  if (chk.getUTCFullYear() !== y || chk.getUTCMonth() !== mo - 1 || chk.getUTCDate() !== d) {
    throw new FieldError(`${key}_invalid`, `${key}_invalid`);
  }
  return utc - VN_OFFSET_MS + (end ? DAY_MS : 0);
}

export function parseWindow(query, nowMs = Date.now()) {
  const from = typeof query.from === 'string' ? query.from : (query.from == null ? '' : null);
  const to = typeof query.to === 'string' ? query.to : (query.to == null ? '' : null);
  if (to === null) throw new FieldError('to_invalid', 'to_invalid');
  if (from === null) throw new FieldError('from_invalid', 'from_invalid');
  let end = to ? parseVnDay(to, 'to', true) : nowMs;
  const start = from ? parseVnDay(from, 'from', false) : end - 30 * DAY_MS;
  end = Math.min(end, nowMs);
  if (start >= end || end - start > LEADS_MAX_DAYS * DAY_MS) throw new FieldError('range_invalid', 'range_invalid');
  return { start, end };
}

function leadSource(r) {
  const s = {
    utmSource: r.utm_source || null, utmMedium: r.utm_medium || null, utmCampaign: r.utm_campaign || null,
    utmContent: r.utm_content || null, utmTerm: r.utm_term || null, clickIdKind: r.click_id_kind || null,
    landingPath: r.landing_path || null, referrerHost: r.referrer_host || null,
  };
  return Object.values(s).some((v) => v) ? s : null;
}

export async function collectLeads(key, start, end) {
  const rows = await Q.leads.all({ start, end, limit: LEADS_MAX + 1 });
  const opt = await Q.optOuts.all({ start, end, limit: LEADS_MAX + 1 });
  const leads = rows.slice(0, LEADS_MAX).map((r) => ({
    leadId: leadRef(key, r.id),
    kind: 'org_contact',
    occurredAt: iso(r.created_at),
    email: r.email,
    name: r.contact_name,
    organization: r.organization,
    orgType: r.org_type,
    phone: r.phone || null,
    seats: r.seats == null ? null : Number(r.seats),
    need: `${AREAS[r.area] || r.area}: ${r.message}`,
    plan: r.area,
    marketingConsent: false, // form chỉ có ô đồng ý ĐƯỢC LIÊN HỆ, không phải nhận tin tiếp thị
    source: leadSource(r),
  }));
  return {
    from: iso(start),
    to: iso(end),
    count: leads.length,
    truncated: rows.length > LEADS_MAX || opt.length > LEADS_MAX,
    leads,
    optOuts: opt.slice(0, LEADS_MAX).map((r) => ({ leadId: leadRef(key, r.id), withdrawnAt: iso(r.withdrawn_at) })),
  };
}

// 60 yêu cầu/phút (toàn cục, chỉ đếm yêu cầu đã ký đúng) — như luồng sự kiện Vidgen.
const leadsHits = [];
function leadsRateOk(nowMs = Date.now()) {
  while (leadsHits.length && leadsHits[0] <= nowMs - 60000) leadsHits.shift();
  if (leadsHits.length >= 60) return false;
  leadsHits.push(nowMs);
  return true;
}

// ── Chống spam form ─────────────────────────────────────────────────────────
// 5 lần/giờ/IP + 200 lần/giờ toàn hệ thống. Bộ đếm in-memory của security context,
// KHÔNG lưu IP vào CSDL. Đếm cả lần gửi bị ô bẫy chặn.
const formPerIp = rateLimit({ windowMs: 3600000, max: 5, bucket: 'partnership' });
const formGlobal = rateLimit({ windowMs: 3600000, max: 200, bucket: 'partnership-all', keyFn: () => 'all' });

function adminRow(r) {
  if (!r) return null;
  return {
    id: r.id,
    organization: r.organization,
    orgType: r.org_type,
    orgTypeLabel: ORG_TYPES[r.org_type] || r.org_type,
    contactName: r.contact_name,
    email: r.email,
    phone: r.phone,
    area: r.area,
    areaLabel: AREAS[r.area] || r.area,
    message: r.message,
    seats: r.seats,
    consentAt: r.consent_at,
    consentVersion: r.consent_version,
    source: leadSource(r),
    status: r.status,
    spam: !!r.spam,
    isTest: !!r.is_test,
    adminNote: r.admin_note,
    withdrawnAt: r.withdrawn_at,
    createdAt: r.created_at,
    updatedAt: r.updated_at,
  };
}

function idParam(req) {
  const id = Number(req.params.id);
  return Number.isSafeInteger(id) && id > 0 ? id : null;
}

export function attachPartnership(r, { requireAdmin, basePath = '' } = {}) {
  // ── Công khai ──
  r.get('/api/partnership/info', (_req, res) => {
    res.json({ contactEmail: contactEmail(), consentVersion: CONSENT_VERSION });
  });

  r.post('/api/partnership/requests', formGlobal, formPerIp, async (req, res) => {
    const b = req.body && typeof req.body === 'object' ? req.body : {};
    // Ô bẫy: người thật không thấy ô "website" → có giá trị là bot. Trả thành công giả.
    if (String(b.website ?? '').trim() !== '') return res.json({ ok: true });
    let v;
    try {
      v = validateRequest(b);
    } catch (e) {
      if (e instanceof FieldError) return res.status(400).json({ error: 'invalid', field: e.field, message: e.message });
      throw e;
    }
    try {
      await saveRequest(v);
      res.json({ ok: true });
    } catch (e) {
      console.error('[partnership] lưu yêu cầu lỗi:', e?.message);
      res.status(500).json({ error: 'internal_error', message: 'Chưa gửi được, vui lòng thử lại sau.' });
    }
  });

  // ── CRM (HMAC) ──
  r.get(LEADS_PATH, async (req, res) => {
    res.setHeader('Cache-Control', 'no-store');
    const key = leadsKey();
    if (!key) return res.status(503).json({ error: 'not_configured' });
    const raw = req.originalUrl || req.url || '';
    const qi = raw.indexOf('?');
    const rawQuery = qi >= 0 ? raw.slice(qi + 1) : '';
    const reqPath = qi >= 0 ? raw.slice(0, qi) : raw;
    const paths = [...new Set([reqPath, `${basePath}${LEADS_PATH}`])];
    if (!verifyLeads(key, req.get('x-growth-timestamp'), req.get('x-growth-signature'), 'GET', paths, rawQuery)) {
      return res.status(401).json({ error: 'unauthorized' });
    }
    if (!leadsRateOk()) {
      res.setHeader('Retry-After', '60');
      return res.status(429).json({ error: 'rate_limited' });
    }
    let win;
    try {
      win = parseWindow(req.query || {});
    } catch (e) {
      if (e instanceof FieldError) return res.status(400).json({ error: e.field });
      throw e;
    }
    try {
      res.json(await collectLeads(key, win.start, win.end));
    } catch (e) {
      console.error('[partnership] API leads lỗi:', e?.name);
      res.status(500).json({ error: 'internal_error' });
    }
  });

  // ── Quản trị ──
  r.get('/api/admin/partnership', requireAdmin, async (req, res) => {
    const where = ['1=1'];
    const params = [];
    const status = String(req.query.status || '');
    if (STATUSES.includes(status)) { params.push(status); where.push('status = ?'); }
    if (req.query.spam === '1') where.push('spam = 1');
    else if (req.query.spam !== 'all') where.push('spam = 0');
    const q = String(req.query.q || '').trim().slice(0, 100);
    if (q) {
      const like = `%${q.replace(/[\\%_]/g, (c) => '\\' + c)}%`;
      params.push(like, like, like);
      where.push('(organization ILIKE ? OR contact_name ILIKE ? OR email ILIKE ?)');
    }
    const limit = Math.min(Math.max(Number(req.query.limit) || 50, 1), 200);
    const offset = Math.max(Number(req.query.offset) || 0, 0);
    const w = where.join(' AND ');
    const total = await db.prepare(`SELECT COUNT(*)::int AS n FROM partnership_requests WHERE ${w}`).get(...params);
    const rows = await db.prepare(`SELECT * FROM partnership_requests WHERE ${w}
      ORDER BY created_at DESC, id DESC LIMIT ${limit} OFFSET ${offset}`).all(...params);
    const counts = Object.fromEntries((await Q.counts.all()).map((c) => [c.status, c.n]));
    res.json({ items: rows.map(adminRow), total: total?.n || 0, counts, orgTypes: ORG_TYPES, areas: AREAS });
  });

  r.get('/api/admin/partnership/:id', requireAdmin, async (req, res) => {
    const id = idParam(req);
    const row = id && await Q.get.get(id);
    if (!row) return res.status(404).json({ error: 'not_found' });
    res.json({ item: adminRow(row) });
  });

  r.patch('/api/admin/partnership/:id', requireAdmin, async (req, res) => {
    const id = idParam(req);
    if (!id || !(await Q.get.get(id))) return res.status(404).json({ error: 'not_found' });
    const b = req.body || {};
    const sets = [];
    const params = [];
    if (b.status !== undefined) {
      if (!STATUSES.includes(b.status)) return res.status(400).json({ error: 'invalid', field: 'status' });
      params.push(b.status); sets.push('status = ?');
    }
    if (b.adminNote !== undefined) {
      const note = String(b.adminNote ?? '').slice(0, 5000);
      params.push(note || null); sets.push('admin_note = ?');
    }
    if (b.spam !== undefined) {
      params.push(b.spam ? 1 : 0); sets.push('spam = ?');
    }
    if (!sets.length) return res.status(400).json({ error: 'nothing_to_update' });
    params.push(Date.now()); sets.push('updated_at = ?');
    params.push(id);
    await db.prepare(`UPDATE partnership_requests SET ${sets.join(', ')} WHERE id = ?`).run(...params);
    res.json({ ok: true, item: adminRow(await Q.get.get(id)) });
  });

  r.post('/api/admin/partnership/:id/withdraw', requireAdmin, async (req, res) => {
    const id = idParam(req);
    if (!id || !(await Q.get.get(id))) return res.status(404).json({ error: 'not_found' });
    await Q.withdraw.run({ id, t: Date.now() });
    res.json({ ok: true, item: adminRow(await Q.get.get(id)) });
  });

  r.delete('/api/admin/partnership/:id', requireAdmin, async (req, res) => {
    const id = idParam(req);
    const info = id ? await Q.del.run(id) : { changes: 0 };
    if (!info.changes) return res.status(404).json({ error: 'not_found' });
    res.json({ ok: true });
  });

  const k = String(process.env.GROWTH_LEADS_KEY || '').trim();
  if (k && k.length < KEY_MIN) console.warn(`[partnership] GROWTH_LEADS_KEY ngắn hơn ${KEY_MIN} ký tự — endpoint leads tắt (503).`);

  // Dọn yêu cầu quá 24 tháng: chạy sau khởi động 1 phút rồi mỗi ngày một lần.
  const run = () => purgeExpired().then((n) => { if (n) console.log(`[partnership] đã xoá ${n} yêu cầu quá 24 tháng`); })
    .catch((e) => console.warn('[partnership] dọn hạn lưu lỗi:', e?.message));
  setTimeout(run, 60000).unref?.();
  setInterval(run, DAY_MS).unref?.();
}
