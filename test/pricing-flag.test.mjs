// Vấn đề #4 (17/10/2026): /pricing chào bán gói trả phí qua VNPay khi chưa có pháp
// nhân. Sau bản vá: cờ PRICING_ENABLED (TẮT mặc định) ẩn trang giá, chặn đăng ký
// gói trả phí, và không mount route thanh toán dù PAYMENT_ENABLED=1.
import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { startServer, loginAs, SKIP } from './helpers/server.mjs';

let off, on;
before(async () => {
  if (SKIP) return;
  // Mặc định (không đặt PRICING_ENABLED) nhưng CÓ PAYMENT_ENABLED=1 — thanh toán vẫn phải tắt.
  off = await startServer({ PAYMENT_ENABLED: '1' });
  on = await startServer({ PRICING_ENABLED: '1', PAYMENT_ENABLED: '1' });
});
after(async () => { await off?.stop(); await on?.stop(); });

test('mặc định: trang giá chỉ là thông báo, không có bảng giá/VNPay', { skip: SKIP }, async () => {
  const anon = off.client();
  for (const u of ['/pricing.html', '/pricing']) {
    const r = await anon.get(u);
    assert.equal(r.status, 200, u);
    assert.match(r.text, /Gói trả phí đang tạm dừng/);
    assert.doesNotMatch(r.text, /VNPay/i);
    assert.match(r.headers.get('x-robots-tag') || '', /noindex/);
  }
  assert.doesNotMatch((await anon.get('/sitemap.xml')).text, /\/pricing</);
});

test('mặc định: không đăng ký được gói trả phí, không có route thanh toán', { skip: SKIP }, async () => {
  const u = await loginAs(off, 'nguoi_mua');
  const sub = await u.post('/api/billing/subscribe', { plan: 'pro' });
  assert.equal(sub.status, 403);
  assert.equal(sub.json.error, 'sales_disabled');
  const { rows } = await off.sql(`SELECT COUNT(*) n FROM subscriptions WHERE user_id=$1 AND plan <> 'free'`, [u.user.id]);
  assert.equal(Number(rows[0].n), 0, 'không tạo subscription pending');
  assert.equal((await u.post('/api/billing/subscribe', { plan: 'free' })).status, 200, 'gói miễn phí vẫn chạy');
  assert.equal((await u.get('/api/billing/plans')).json.sales_enabled, false);
  const order = await u.post('/api/payment/create-order', { amount: 99000 });
  assert.equal(order.status, 404, 'route VNPay không được mount');
});

test('bật cờ: trang giá gốc + luồng đăng ký gói trả phí hoạt động lại (code giữ nguyên)', { skip: SKIP }, async () => {
  const r = await on.client().get('/pricing.html');
  assert.equal(r.status, 200);
  assert.doesNotMatch(r.text, /Gói trả phí đang tạm dừng/);
  const u = await loginAs(on, 'nguoi_mua2');
  const sub = await u.post('/api/billing/subscribe', { plan: 'pro' });
  assert.equal(sub.status, 200);
  assert.equal(sub.json.activated, false, 'chuyển sang thanh toán');
  assert.notEqual((await u.post('/api/payment/create-order', { amount: 99000 })).status, 404, 'route thanh toán có mount');
});
