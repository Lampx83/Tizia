// Lỗ hổng #1 (17/10/2026): bất kỳ tài khoản SV/GV nào gọi POST /api/family/link
// {childUsername} là liên kết ngay và xem được dashboard, báo cáo tuần, cây năng
// lực của một học sinh bất kỳ. Sau bản vá: liên kết chỉ là YÊU CẦU, phải được
// chính học sinh hoặc quản trị chấp nhận thì mới xem được dữ liệu.
import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { startServer, loginAs, SKIP } from './helpers/server.mjs';

let srv, child, stranger, parent, admin;

before(async () => {
  if (SKIP) return;
  srv = await startServer();
  child = await loginAs(srv, 'hs_con', { role: 'pupil', age: 16, grade: 11 });
  stranger = await loginAs(srv, 'nguoi_la', { role: 'teacher', age: 35 });
  parent = await loginAs(srv, 'phu_huynh', { role: 'teacher', age: 40 });
  admin = await loginAs(srv, 'quan_tri', { role: 'admin', age: 40 });
});
after(async () => { if (srv) await srv.stop(); });

const childReadRoutes = () => [
  `/api/parent/report/${child.user.id}`,
  `/api/skills/child/${child.user.id}`,
];

test('chưa đăng nhập: không gọi được API liên kết/báo cáo', { skip: SKIP }, async () => {
  const anon = srv.client();
  assert.equal((await anon.post('/api/family/link', { childUsername: 'hs_con' })).status, 401);
  for (const u of childReadRoutes()) assert.equal((await anon.get(u)).status, 401, u);
  assert.equal((await anon.get('/api/parent/dashboard')).status, 401);
});

test('nhập username KHÔNG đủ để xem dữ liệu học sinh', { skip: SKIP }, async () => {
  const r = await stranger.post('/api/family/link', { childUsername: 'hs_con' });
  assert.equal(r.status, 202);
  assert.equal(r.json.pending, true);
  assert.equal(r.json.child, undefined, 'không trả thông tin học sinh');
  for (const u of childReadRoutes()) assert.equal((await stranger.get(u)).status, 403, u);
  const dash = await stranger.get('/api/parent/dashboard');
  assert.equal(dash.status, 200);
  assert.deepEqual(dash.json.children, []);
  const me = await stranger.get('/api/family/me');
  assert.deepEqual(me.json.children, []);
  assert.equal(me.json.pending.length, 1);
  assert.deepEqual(Object.keys(me.json.pending[0]).sort(), ['created_at', 'link_id', 'status', 'username']);
});

test('username không tồn tại / không phải học sinh: cùng câu trả lời (không dò được tài khoản)', { skip: SKIP }, async () => {
  const a = await stranger.post('/api/family/link', { childUsername: 'khong_ton_tai' });
  const b = await stranger.post('/api/family/link', { childUsername: 'phu_huynh' });
  assert.equal(a.status, 202); assert.equal(b.status, 202);
  assert.deepEqual(a.json, b.json);
});

test('người khác không duyệt hộ được yêu cầu', { skip: SKIP }, async () => {
  const { rows } = await srv.sql(`SELECT id FROM family_links WHERE parent_user_id=$1`, [stranger.user.id]);
  const id = rows[0].id;
  assert.equal((await stranger.post(`/api/family/links/${id}/approve`)).status, 404, 'chính người xin không tự duyệt được');
  assert.equal((await parent.post(`/api/family/links/${id}/approve`)).status, 404);
  for (const u of childReadRoutes()) assert.equal((await stranger.get(u)).status, 403, u);
});

test('học sinh chấp nhận → phụ huynh xem được; thu hồi → mất quyền', { skip: SKIP }, async () => {
  await parent.post('/api/family/link', { childUsername: 'hs_con' });
  const inc = await child.get('/api/family/me');
  const req = inc.json.incoming.find((x) => x.parent_username === 'phu_huynh');
  assert.ok(req, 'học sinh thấy yêu cầu');
  assert.equal(req.status, 'pending');
  assert.equal((await child.post(`/api/family/links/${req.link_id}/approve`)).status, 200);

  for (const u of childReadRoutes()) assert.equal((await parent.get(u)).status, 200, u);
  const dash = await parent.get('/api/parent/dashboard');
  assert.equal(dash.json.children.length, 1);
  assert.equal(dash.json.children[0].id, child.user.id);
  // người lạ vẫn bị chặn
  for (const u of childReadRoutes()) assert.equal((await stranger.get(u)).status, 403, u);

  assert.equal((await child.post(`/api/family/links/${req.link_id}/reject`)).status, 200);
  for (const u of childReadRoutes()) assert.equal((await parent.get(u)).status, 403, u);
  const { rows } = await srv.sql(`SELECT status FROM family_links WHERE id=$1`, [req.link_id]);
  assert.equal(rows[0].status, 'rejected', 'thu hồi không xoá dòng');
});

test('quản trị duyệt được yêu cầu', { skip: SKIP }, async () => {
  const list = await admin.get('/api/admin/family-links?status=pending');
  assert.equal(list.status, 200);
  const row = list.json.links.find((l) => l.parent_username === 'nguoi_la');
  assert.ok(row);
  assert.equal((await stranger.get('/api/admin/family-links')).status, 403);
  assert.equal((await admin.post(`/api/family/links/${row.id}/approve`)).status, 200);
  assert.equal((await stranger.get(`/api/parent/report/${child.user.id}`)).status, 200);
});

test('liên kết cũ (trước bản vá) mặc định chờ xác nhận, không bị xoá', { skip: SKIP }, async () => {
  const legacyParent = await loginAs(srv, 'ph_cu', { role: 'student', age: 30 });
  // Mô phỏng dòng cũ: INSERT không có cột status (như code trước bản vá).
  await srv.sql(`INSERT INTO family_links (parent_user_id, child_user_id, created_at) VALUES ($1,$2,$3)`,
    [legacyParent.user.id, child.user.id, Date.now()]);
  const { rows } = await srv.sql(`SELECT status FROM family_links WHERE parent_user_id=$1`, [legacyParent.user.id]);
  assert.equal(rows[0].status, 'pending');
  assert.equal((await legacyParent.get(`/api/parent/report/${child.user.id}`)).status, 403);
});
