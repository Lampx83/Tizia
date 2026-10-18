// Mục «Hợp tác» (18/10/2026): form liên hệ của tổ chức, mục admin, endpoint leads
// cho CRM SIM (HMAC). Chạy trên Postgres tạm (xem test/helpers/server.mjs).
import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { createHmac } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { startServer, loginAs, SKIP } from './helpers/server.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const KEY = 'k'.repeat(16) + '0123456789abcdef0123'; // 36 ký tự, chỉ dùng cho test
const LEADS = '/api/internal/growth/leads';
const LEAD_KEYS = ['leadId', 'kind', 'occurredAt', 'email', 'name', 'organization', 'orgType', 'phone', 'seats',
  'need', 'plan', 'marketingConsent', 'source'].sort();

let srv; // có khoá + email liên hệ
let bare; // không đặt khoá
before(async () => {
  if (SKIP) return;
  srv = await startServer({ GROWTH_LEADS_KEY: KEY, PARTNERSHIP_CONTACT_EMAIL: 'hoptac@tizia.vn' });
  bare = await startServer({});
});
after(async () => { await srv?.stop(); await bare?.stop(); });

let ipSeq = 0;
const freshIp = () => ({ 'x-forwarded-for': `10.9.${Math.floor(++ipSeq / 250)}.${ipSeq % 250}` });

function form(extra = {}) {
  return {
    organization: 'Trường THPT Nguyễn Trãi', orgType: 'school', contactName: 'Nguyễn Văn An',
    email: 'an.nguyen@thpt-nguyentrai.edu.vn', phone: '0912 345 678', area: 'org_license',
    message: 'Nhà trường muốn dùng Tizia cho khối 10–12, cần trao đổi về triển khai và đăng nhập.',
    seats: 450, consent: true, website: '',
    source: { utmSource: 'zalo', utmMedium: 'social', utmCampaign: 'hk1-2026', landingPath: '/hop-tac' },
    ...extra,
  };
}

// PATCH/DELETE kèm cookie phiên của client (helper chung chỉ có GET/POST).
function send(c, method, url, body) {
  const headers = { cookie: [...c.jar].map(([k, v]) => `${k}=${v}`).join('; ') };
  if (body !== undefined) headers['content-type'] = 'application/json';
  return fetch(srv.base + url, { method, headers, body: body === undefined ? undefined : JSON.stringify(body) });
}

function vnToday() { return new Date(Date.now() + 7 * 3600000).toISOString().slice(0, 10); }

function signed(s, query, { ts = Math.floor(Date.now() / 1000), key = KEY, path: p = LEADS } = {}) {
  const sig = createHmac('sha256', key).update(`${ts}\nGET\n${p}\n${query}`).digest('hex');
  return s.client().get(`${LEADS}?${query}`, { 'x-growth-timestamp': String(ts), 'x-growth-signature': sig });
}

test('form: tổ chức gửi được, lưu đủ trường, không gắn tài khoản', { skip: SKIP }, async () => {
  const r = await srv.client().post('/api/partnership/requests', form(), freshIp());
  assert.equal(r.status, 200, r.text);
  assert.equal(r.json.ok, true);
  const { rows } = await srv.sql(`SELECT * FROM partnership_requests WHERE email=$1`, ['an.nguyen@thpt-nguyentrai.edu.vn']);
  assert.equal(rows.length, 1);
  const row = rows[0];
  assert.equal(row.org_type, 'school');
  assert.equal(row.area, 'org_license');
  assert.equal(row.seats, 450);
  assert.equal(row.status, 'new');
  assert.equal(row.consent_version, 'hop-tac-2026-10');
  assert.ok(row.consent_at > 0);
  assert.equal(row.utm_source, 'zalo');
  assert.equal(row.landing_path, '/hop-tac');
  // Bảng không có cột gắn người dùng hay IP.
  const cols = Object.keys(row);
  for (const bad of ['user_id', 'ip', 'ip_hash', 'anon_id']) assert.ok(!cols.includes(bad), bad);

  // Đang đăng nhập (người học) gửi form vẫn KHÔNG gắn tài khoản: bảng không có cột
  // người dùng, route không đọc phiên.
  const learner = await loginAs(srv, 'sv_hoptac');
  const r2 = await learner.post('/api/partnership/requests', form({ email: 'lienhe@trungtam-abc.vn', orgType: 'training_center' }), freshIp());
  assert.equal(r2.status, 200);
  const again = await srv.sql(`SELECT * FROM partnership_requests WHERE email='lienhe@trungtam-abc.vn'`);
  assert.equal(again.rows.length, 1);
});

test('form: kiểm tra ở server (đồng ý, email, loại đơn vị, độ dài)', { skip: SKIP }, async () => {
  const c = srv.client();
  const cases = [
    [{ consent: false }, 'consent'],
    [{ consent: 'true' }, 'consent'],
    [{ email: 'khong-phai-email' }, 'email'],
    [{ orgType: 'person' }, 'orgType'],
    [{ area: 'ads' }, 'area'],
    [{ organization: '' }, 'organization'],
    [{ message: 'x'.repeat(3001) }, 'message'],
    [{ seats: 'nhiều' }, 'seats'],
    [{ phone: 'gọi tôi' }, 'phone'],
  ];
  for (const [patch, field] of cases) {
    const r = await c.post('/api/partnership/requests', form({ ...patch, email: patch.email ?? `v${field}@donvi.vn` }), freshIp());
    assert.equal(r.status, 400, `${field}: ${r.text}`);
    assert.equal(r.json.field, field);
    assert.ok(r.json.message);
  }
  const { rows } = await srv.sql(`SELECT COUNT(*)::int n FROM partnership_requests WHERE email LIKE 'v%@donvi.vn'`);
  assert.equal(rows[0].n, 0);
});

test('form: ô bẫy trả thành công giả, không lưu; quá 5 lần/giờ/IP → 429', { skip: SKIP }, async () => {
  const c = srv.client();
  const ip = freshIp();
  const bot = await c.post('/api/partnership/requests', form({ website: 'http://spam.example', email: 'bot@spam-x.vn' }), ip);
  assert.equal(bot.status, 200);
  assert.equal(bot.json.ok, true);
  assert.equal((await srv.sql(`SELECT COUNT(*)::int n FROM partnership_requests WHERE email='bot@spam-x.vn'`)).rows[0].n, 0);
  for (let i = 0; i < 4; i++) {
    assert.equal((await c.post('/api/partnership/requests', form({ email: `rl${i}@donvi-rl.vn` }), ip)).status, 200);
  }
  const over = await c.post('/api/partnership/requests', form({ email: 'rl9@donvi-rl.vn' }), ip);
  assert.equal(over.status, 429);
  // IP khác vẫn gửi được.
  assert.equal((await c.post('/api/partnership/requests', form({ email: 'khac@donvi-rl.vn' }), freshIp())).status, 200);
});

test('info: email liên hệ lấy từ biến cấu hình, trống thì null', { skip: SKIP }, async () => {
  assert.equal((await srv.client().get('/api/partnership/info')).json.contactEmail, 'hoptac@tizia.vn');
  const b = await bare.client().get('/api/partnership/info');
  assert.equal(b.status, 200);
  assert.equal(b.json.contactEmail, null);
});

test('admin: chỉ role admin xem/sửa; rút đồng ý xoá email + điện thoại; xoá được', { skip: SKIP }, async () => {
  const anon = srv.client();
  assert.equal((await anon.get('/api/admin/partnership')).status, 401);
  const teacher = await loginAs(srv, 'gv_hoptac', { role: 'teacher', age: 35 });
  assert.equal((await teacher.get('/api/admin/partnership')).status, 403);
  const admin = await loginAs(srv, 'ad_hoptac', { role: 'admin', age: 40 });

  await anon.post('/api/partnership/requests', form({ email: 'admin-flow@cty-xyz.vn', orgType: 'company', organization: 'Công ty XYZ' }), freshIp());
  const list = await admin.get('/api/admin/partnership?q=' + encodeURIComponent('Công ty XYZ'));
  assert.equal(list.status, 200);
  assert.equal(list.json.items.length, 1);
  const it = list.json.items[0];
  assert.equal(it.organization, 'Công ty XYZ');
  assert.equal(it.orgTypeLabel, 'Doanh nghiệp');

  const patch = await send(admin, 'PATCH', `/api/admin/partnership/${it.id}`, { status: 'contacted', adminNote: 'Đã gọi, hẹn demo.' });
  assert.equal(patch.status, 200);
  const pj = await patch.json();
  assert.equal(pj.item.status, 'contacted');
  assert.equal(pj.item.adminNote, 'Đã gọi, hẹn demo.');

  const wd = await admin.post(`/api/admin/partnership/${it.id}/withdraw`, {});
  assert.equal(wd.status, 200);
  assert.ok(wd.json.item.withdrawnAt > 0);
  assert.equal(wd.json.item.email, null);
  assert.equal(wd.json.item.phone, null);

  const del = await send(admin, 'DELETE', `/api/admin/partnership/${it.id}`);
  assert.equal(del.status, 200);
  assert.equal((await admin.get(`/api/admin/partnership/${it.id}`)).status, 404);
});

test('leads: 503 khi chưa đặt khoá; 401 chữ ký sai/hết hạn; no-store', { skip: SKIP }, async () => {
  const q = `from=${vnToday()}&to=${vnToday()}`;
  const none = await signed(bare, q);
  assert.equal(none.status, 503);
  assert.equal(none.headers.get('cache-control'), 'no-store');

  const wrongKey = await signed(srv, q, { key: 'sai'.repeat(10) });
  assert.equal(wrongKey.status, 401);
  assert.equal(wrongKey.headers.get('cache-control'), 'no-store');
  const expired = await signed(srv, q, { ts: Math.floor(Date.now() / 1000) - 301 });
  assert.equal(expired.status, 401);
  const otherPath = await signed(srv, q, { path: '/api/khac' });
  assert.equal(otherPath.status, 401);
  const unsigned = await srv.client().get(`${LEADS}?${q}`);
  assert.equal(unsigned.status, 401);
  // Chữ ký đúng cho query khác (đổi tham số sau khi ký) → 401.
  const ts = Math.floor(Date.now() / 1000);
  const sig = createHmac('sha256', KEY).update(`${ts}\nGET\n${LEADS}\n${q}`).digest('hex');
  const tampered = await srv.client().get(`${LEADS}?from=2025-01-01&to=${vnToday()}`, { 'x-growth-timestamp': String(ts), 'x-growth-signature': sig });
  assert.equal(tampered.status, 401);
});

test('leads: khoảng ngày sai → 400 from_invalid|to_invalid|range_invalid', { skip: SKIP }, async () => {
  const bad = [
    ['from=2026-13-01&to=2026-10-18', 'from_invalid'],
    ['from=18/10/2026&to=2026-10-18', 'from_invalid'],
    ['from=2026-10-01&to=2026-02-30', 'to_invalid'],
    ['from=2026-10-18&to=2026-10-01', 'range_invalid'],
    ['from=2024-01-01&to=2026-10-18', 'range_invalid'],
  ];
  for (const [q, err] of bad) {
    const r = await signed(srv, q);
    assert.equal(r.status, 400, q);
    assert.equal(r.json.error, err, q);
  }
});

test('leads: chỉ lead tổ chức, lọc email thử/spam, optOuts, không lộ người dùng cá nhân', { skip: SKIP }, async () => {
  const anon = srv.client();
  // Người dùng cá nhân có email tài khoản — không bao giờ được xuất hiện.
  await loginAs(srv, 'sv_canhan', { email: 'sv.canhan@st.neu.edu.vn' });
  const sent = [
    form({ email: 'giamdoc@benhvien-a.vn', orgType: 'other', organization: 'Bệnh viện A', area: 'content', seats: '' }),
    form({ email: 'tester@example.com', organization: 'Thử nghiệm' }),
    form({ email: 'qa@donvi.test', organization: 'Thử nghiệm 2' }),
    form({ email: 'spam@quangcao-z.vn', organization: 'Spam Z' }),
    form({ email: 'rut@daihoc-b.edu.vn', orgType: 'university', organization: 'Đại học B', area: 'research' }),
  ];
  for (const b of sent) assert.equal((await anon.post('/api/partnership/requests', b, freshIp())).status, 200);
  await srv.sql(`UPDATE partnership_requests SET spam=1 WHERE email='spam@quangcao-z.vn'`);
  const admin = await loginAs(srv, 'ad_leads', { role: 'admin', age: 40 });
  const { rows: [rut] } = await srv.sql(`SELECT id FROM partnership_requests WHERE email='rut@daihoc-b.edu.vn'`);
  assert.equal((await admin.post(`/api/admin/partnership/${rut.id}/withdraw`, {})).status, 200);

  const r = await signed(srv, `from=${vnToday()}&to=${vnToday()}`);
  assert.equal(r.status, 200, r.text);
  assert.equal(r.headers.get('cache-control'), 'no-store');
  const body = r.json;
  assert.deepEqual(Object.keys(body).sort(), ['count', 'from', 'leads', 'optOuts', 'to', 'truncated']);
  assert.match(body.from, /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/);
  assert.equal(body.truncated, false);
  assert.equal(body.count, body.leads.length);

  const emails = body.leads.map((l) => l.email);
  assert.ok(emails.includes('giamdoc@benhvien-a.vn'));
  for (const e of ['tester@example.com', 'qa@donvi.test', 'spam@quangcao-z.vn', 'rut@daihoc-b.edu.vn', 'sv.canhan@st.neu.edu.vn']) {
    assert.ok(!emails.includes(e), e);
  }
  const raw = JSON.stringify(body);
  assert.ok(!raw.includes('sv.canhan@st.neu.edu.vn'), 'không có email tài khoản');
  assert.ok(!/anonId|userId|user_id/.test(raw), 'không có định danh người dùng');

  for (const l of body.leads) {
    assert.deepEqual(Object.keys(l).sort(), LEAD_KEYS);
    assert.match(l.leadId, /^org:[0-9a-f]{16}$/);
    assert.equal(l.kind, 'org_contact');
    assert.equal(l.marketingConsent, false);
  }
  const sorted = [...body.leads].sort((a, b) => a.occurredAt.localeCompare(b.occurredAt));
  assert.deepEqual(body.leads.map((l) => l.leadId), sorted.map((l) => l.leadId), 'tăng dần theo occurredAt');

  const bv = body.leads.find((l) => l.email === 'giamdoc@benhvien-a.vn');
  assert.equal(bv.organization, 'Bệnh viện A');
  assert.equal(bv.orgType, 'other');
  assert.equal(bv.plan, 'content');
  assert.equal(bv.seats, null);
  assert.match(bv.need, /^Hợp tác nội dung, học liệu: /);
  assert.equal(bv.phone, '0912 345 678');
  assert.deepEqual(bv.source, {
    utmSource: 'zalo', utmMedium: 'social', utmCampaign: 'hk1-2026', utmContent: null, utmTerm: null,
    clickIdKind: null, landingPath: '/hop-tac', referrerHost: null,
  });

  // optOuts: lead đã rút đồng ý, leadId tính lại được từ id nội bộ.
  const expected = 'org:' + createHmac('sha256', KEY).update(`lead\n${rut.id}`).digest('hex').slice(0, 16);
  assert.equal(body.optOuts.length, 1);
  assert.equal(body.optOuts[0].leadId, expected);
  assert.match(body.optOuts[0].withdrawnAt, /Z$/);
  assert.deepEqual(Object.keys(body.optOuts[0]).sort(), ['leadId', 'withdrawnAt']);

  // Mặc định (không from/to) = 30 ngày gần nhất, vẫn thấy lead hôm nay.
  const def = await signed(srv, '');
  assert.equal(def.status, 200);
  assert.ok(def.json.leads.some((l) => l.email === 'giamdoc@benhvien-a.vn'));
});

test('hạn lưu 24 tháng: job dọn xoá yêu cầu quá hạn kể từ lần trao đổi cuối', { skip: SKIP }, async () => {
  await srv.client().post('/api/partnership/requests', form({ email: 'cu@donvi-cu.vn' }), freshIp());
  await srv.client().post('/api/partnership/requests', form({ email: 'moi@donvi-moi.vn' }), freshIp());
  const old = Date.now() - 731 * 86400000;
  await srv.sql(`UPDATE partnership_requests SET updated_at=$1, created_at=$1 WHERE email='cu@donvi-cu.vn'`, [old]);
  const out = execFileSync(process.execPath, ['--input-type=module', '-e',
    "const m = await import('./server/contexts/partnership/index.js'); console.log('PURGED=' + await m.purgeExpired()); process.exit(0);"],
  { cwd: ROOT, env: { PATH: process.env.PATH, HOME: process.env.HOME, NODE_ENV: 'test', DATABASE_URL: srv.pool.options.connectionString }, stdio: 'pipe' }).toString();
  assert.match(out, /PURGED=1/);
  const { rows } = await srv.sql(`SELECT email FROM partnership_requests WHERE email IN ('cu@donvi-cu.vn','moi@donvi-moi.vn')`);
  assert.deepEqual(rows.map((r) => r.email), ['moi@donvi-moi.vn']);
});
