// Lỗ hổng #3 (17/10/2026): đăng ký nhận cả trẻ 3 tuổi, không có đồng ý của cha mẹ
// hoặc người giám hộ. Sau bản vá: người dưới 16 tuổi chưa tự đăng ký được (chờ luồng
// đồng ý); tài khoản trẻ em ĐÃ CÓ không bị xoá/khoá.
import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { startServer, loginAs, SKIP } from './helpers/server.mjs';

let srv;
before(async () => { if (!SKIP) srv = await startServer(); });
after(async () => { if (srv) await srv.stop(); });

const count = async (u) => Number((await srv.sql(`SELECT COUNT(*) n FROM users WHERE username=$1`, [u])).rows[0].n);

test('dưới 16 tuổi: bị từ chối, không tạo tài khoản', { skip: SKIP }, async () => {
  const c = srv.client();
  for (const [u, opts] of [
    ['be_3t', { role: 'pupil', age: 3 }],
    ['hs_12t', { role: 'pupil', age: 12, grade: 6 }],
    ['sv_15t', { role: 'student', age: 15 }],
    ['gv_15t', { role: 'teacher', age: 15 }],
    ['hs_lop9', { role: 'pupil', age: 17, grade: 9 }],   // khai lớp 1–9 ⇒ dưới 16
  ]) {
    const r = await c.register(u, opts);
    assert.equal(r.status, 403, u);
    assert.equal(r.json.code, 'under_16_requires_guardian', u);
    assert.equal(await count(u), 0, u + ' không được tạo');
    assert.ok(!c.jar.has('tizia_sid'), 'không cấp phiên đăng nhập');
  }
});

test('từ 16 tuổi: vẫn đăng ký được', { skip: SKIP }, async () => {
  assert.equal((await srv.client().register('hs_16t', { role: 'pupil', age: 16, grade: 11 })).status, 200);
  assert.equal((await srv.client().register('sv_20t', { role: 'student', age: 20 })).status, 200);
});

test('không tự sửa tuổi xuống dưới 16; tài khoản trẻ em cũ vẫn dùng được', { skip: SKIP }, async () => {
  const sv = await loginAs(srv, 'sv_doi_tuoi', { age: 18 });
  assert.equal((await sv.post('/api/auth/me', { displayName: 'sv_doi_tuoi', age: 12 })).status, 403);

  // Tài khoản cũ (trước bản vá) 10 tuổi: đăng nhập và lưu hồ sơ (giữ tuổi) vẫn được.
  const child = await loginAs(srv, 'hs_cu', { role: 'pupil', age: 16, grade: 11 });
  await srv.sql(`UPDATE users SET age=10, grade=5 WHERE id=$1`, [child.user.id]);
  const relog = srv.client();
  assert.equal((await relog.post('/api/auth/login', { username: 'hs_cu', password: 'matkhau123' })).status, 200);
  assert.equal((await relog.get('/api/auth/me')).status, 200);
  assert.equal((await relog.post('/api/auth/me', { displayName: 'hs_cu', age: 10 })).status, 200);
});
