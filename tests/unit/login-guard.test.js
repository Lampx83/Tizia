import test from 'node:test';
import assert from 'node:assert/strict';
import { createLoginGuard } from '../../server/contexts/security/login-guard.js';

test('khoá sau khi sai đủ số lần, tính theo tài khoản không phân biệt hoa thường', () => {
  const g = createLoginGuard({ maxFails: 3, windowMs: 1000 });
  const t = 1000;
  g.fail('GiangVien', t); g.fail('giangvien ', t);
  assert.equal(g.retryAfter('giangvien', t), 0);
  g.fail('giangvien', t);
  assert.equal(g.retryAfter('GIANGVIEN', t), 1);
  assert.equal(g.retryAfter('nguoi-khac', t), 0);
});

test('hết cửa sổ thì mở lại; đăng nhập đúng thì xoá bộ đếm', () => {
  const g = createLoginGuard({ maxFails: 2, windowMs: 1000 });
  g.fail('a', 0); g.fail('a', 0);
  assert.ok(g.retryAfter('a', 500) > 0);
  assert.equal(g.retryAfter('a', 1000), 0);
  g.fail('b', 0); g.success('b'); g.fail('b', 0);
  assert.equal(g.retryAfter('b', 0), 0);
});
