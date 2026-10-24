// ============================================================
// Payment context — routes (attachPayment)
// ============================================================
// Chỉ mount khi PAYMENT_ENABLED=1. Cung cấp:
//   POST /api/payment/create-order      — tạo invoice + trả URL VNPay (yêu cầu login)
//   GET  /api/payment/vnpay/return      — browser quay về (chỉ HIỂN THỊ, không chốt đơn)
//   GET  /api/payment/vnpay/ipn         — server↔server, NGUỒN CHÂN LÝ chốt đơn + ghi sổ
//   GET  /api/payment/invoices/:orderRef — tra cứu trạng thái (cho client poll)
//
// Idempotency: IPN ghi webhook_inbox theo (gateway, event_key) UNIQUE → xử lý 1 lần,
// retry của VNPay không tạo bút toán trùng. Ledger ghi qua double-entry cân bằng.
// ============================================================

import './schema.js'; // side-effect: tạo bảng payment khi context được nạp
import { db, setUserPlan } from '../../db.js';
import { requireAuth } from '../identity/auth.js';
import {
  buildPaymentUrl, verifyCallback, isSuccessCode, isVnpayConfigured, IPN_RESPONSES,
} from './gateways/vnpay.js';
import { recordPaymentSettled } from './ledger.js';
import { reconcile, refundPayment } from './reconcile.js';
import { VALID_USER_PLANS, priceFor, expiresAtFor, USER_PLANS } from '../billing/user-plans.js';

// ── Data access ──
const insertInvoiceStmt = db.prepare(`
  INSERT INTO invoices (user_id, order_ref, amount, currency, description, status, gateway, metadata, created_at, updated_at)
  VALUES (@user_id, @order_ref, @amount, @currency, @description, 'pending', @gateway, @metadata, @t, @t)
`);
const getInvoiceByRefStmt = db.prepare(`SELECT * FROM invoices WHERE order_ref = ?`);
const markInvoicePaidStmt = db.prepare(`UPDATE invoices SET status = 'paid', paid_at = @t, updated_at = @t WHERE id = @id`);
const markInvoiceFailedStmt = db.prepare(`UPDATE invoices SET status = 'failed', updated_at = @t WHERE id = @id`);
const insertPaymentStmt = db.prepare(`
  INSERT INTO payments (invoice_id, gateway, gateway_txn_ref, amount, status, response_code, raw_response, created_at)
  VALUES (@invoice_id, @gateway, @gateway_txn_ref, @amount, @status, @response_code, @raw_response, @t)
`);
const insertInboxStmt = db.prepare(`
  INSERT INTO webhook_inbox (gateway, event_key, order_ref, payload, signature_valid, processed, received_at)
  VALUES (@gateway, @event_key, @order_ref, @payload, @signature_valid, 0, @t)
`);
const markInboxProcessedStmt = db.prepare(`UPDATE webhook_inbox SET processed = 1, processed_at = @t WHERE gateway = @gateway AND event_key = @event_key`);

let _orderSeq = 0;
function genOrderRef() {
  _orderSeq = (_orderSeq + 1) % 100000;
  return `EDU${Date.now().toString(36).toUpperCase()}${_orderSeq.toString(36).toUpperCase()}`;
}
function clientIp(req) {
  return (req.headers['x-forwarded-for'] || '').split(',')[0].trim() || req.socket?.remoteAddress || '127.0.0.1';
}

export function attachPayment(r, { basePath = '' } = {}) {
  // ── Tạo đơn + lấy URL thanh toán ──
  // Hỗ trợ 2 mode:
  //   - upgrade gói cá nhân: body={plan,cycle} → amount tự tính theo bảng giá
  //   - generic: body={amount,description} (giữ tương thích cũ)
  r.post('/api/payment/create-order', requireAuth, async (req, res) => {
    if (!isVnpayConfigured()) {
      return res.status(503).json({ error: 'payment_unconfigured', detail: 'VNPay chưa cấu hình TMN_CODE/HASH_SECRET' });
    }
    const planReq = String(req.body?.plan || '').toLowerCase();
    const cycle = ['month', 'year'].includes(req.body?.cycle) ? req.body.cycle : 'month';
    let amount, description, metadata = null;
    if (planReq && VALID_USER_PLANS.has(planReq)) {
      amount = priceFor(planReq, cycle);
      if (amount < 1000) {
        return res.status(400).json({ error: 'free_plan_not_payable', detail: 'Gói miễn phí không cần thanh toán.' });
      }
      const planName = USER_PLANS[planReq]?.name || planReq;
      description = `Tizia ${planName} — ${cycle === 'year' ? '1 năm' : '1 tháng'}`;
      metadata = JSON.stringify({ kind: 'user_plan', plan: planReq, cycle, user_id: req.user.id });
    } else {
      amount = Math.round(Number(req.body?.amount));
      description = String(req.body?.description || '').slice(0, 200) || 'Thanh toán Tizia';
      if (!Number.isFinite(amount) || amount < 1000) {
        return res.status(400).json({ error: 'invalid_amount', detail: 'amount tối thiểu 1000 VND' });
      }
    }
    const order_ref = genOrderRef();
    const now = Date.now();
    await insertInvoiceStmt.run({
      user_id: req.user.id, order_ref, amount, currency: 'VND',
      description, gateway: 'vnpay', metadata, t: now,
    });
    try {
      const { url } = buildPaymentUrl({
        orderRef: order_ref, amount,
        orderInfo: description,
        ipAddr: clientIp(req),
      });
      res.json({ ok: true, orderRef: order_ref, amount, payUrl: url });
    } catch (e) {
      res.status(500).json({ error: 'build_url_failed', detail: String(e.message) });
    }
  });

  // ── IPN: server-to-server, chốt đơn (nguồn chân lý) ──
  r.get('/api/payment/vnpay/ipn', async (req, res) => {
    const q = req.query || {};
    const v = verifyCallback(q);
    const now = Date.now();
    const event_key = `${v.orderRef}:${v.gatewayTxnNo || q.vnp_TransactionNo || ''}:${v.responseCode}`;

    if (!v.valid) {
      try { await insertInboxStmt.run({ gateway: 'vnpay', event_key, order_ref: v.orderRef, payload: JSON.stringify(q), signature_valid: 0, t: now }); } catch {}
      return res.json(IPN_RESPONSES.invalidSig);
    }

    const invoice = await getInvoiceByRefStmt.get(v.orderRef);
    if (!invoice) return res.json(IPN_RESPONSES.orderNotFound);
    if (Math.round(invoice.amount) !== Math.round(v.amount)) return res.json(IPN_RESPONSES.amountInvalid);

    // Idempotency: nếu đã ghi inbox event này → đã xử lý, trả alreadyConfirmed.
    try {
      await insertInboxStmt.run({ gateway: 'vnpay', event_key, order_ref: v.orderRef, payload: JSON.stringify(q), signature_valid: 1, t: now });
    } catch (e) {
      // UNIQUE(gateway, event_key) vi phạm → retry trùng, coi như đã confirm.
      return res.json(IPN_RESPONSES.alreadyConfirmed);
    }

    // Đơn đã chốt trước đó (qua event khác) → không ghi sổ lần nữa.
    if (invoice.status === 'paid') {
      await markInboxProcessedStmt.run({ gateway: 'vnpay', event_key, t: now });
      return res.json(IPN_RESPONSES.alreadyConfirmed);
    }

    const success = isSuccessCode(v.responseCode);
    const tx = db.transaction(async () => {
      await insertPaymentStmt.run({
        invoice_id: invoice.id, gateway: 'vnpay',
        gateway_txn_ref: v.gatewayTxnNo || null, amount: v.amount,
        status: success ? 'success' : 'failed', response_code: v.responseCode,
        raw_response: JSON.stringify(q), t: now,
      });
      if (success) {
        await markInvoicePaidStmt.run({ id: invoice.id, t: now });
        await recordPaymentSettled({ gateway: 'vnpay', amount: v.amount, invoice_id: invoice.id });
        // Kích hoạt gói cá nhân nếu invoice gắn metadata kind=user_plan.
        try {
          const meta = invoice.metadata ? JSON.parse(invoice.metadata) : null;
          if (meta?.kind === 'user_plan' && meta.user_id && VALID_USER_PLANS.has(meta.plan)) {
            await setUserPlan(meta.user_id, {
              plan: meta.plan,
              expires_at: expiresAtFor(meta.cycle || 'month'),
              cycle: meta.cycle || 'month',
            });
          }
        } catch (e) { console.warn('[payment] activate user_plan failed:', e?.message); }
      } else {
        await markInvoiceFailedStmt.run({ id: invoice.id, t: now });
      }
      await markInboxProcessedStmt.run({ gateway: 'vnpay', event_key, t: now });
    });
    await tx();

    return res.json(IPN_RESPONSES.success);
  });

  // ── Return URL: browser quay về — CHỈ hiển thị, KHÔNG chốt đơn ──
  r.get('/api/payment/vnpay/return', async (req, res) => {
    const v = verifyCallback(req.query || {});
    if (!v.valid) {
      return res.status(400).json({ ok: false, error: 'invalid_signature' });
    }
    const invoice = await getInvoiceByRefStmt.get(v.orderRef);
    const success = isSuccessCode(v.responseCode);
    res.json({
      ok: true,
      orderRef: v.orderRef,
      success,
      responseCode: v.responseCode,
      // Trạng thái CHÍNH THỨC lấy từ invoice (do IPN cập nhật), không từ return URL.
      invoiceStatus: invoice?.status || 'unknown',
      note: 'Trạng thái cuối cùng được xác nhận qua IPN (server-to-server).',
    });
  });

  // ── Tra cứu trạng thái đơn (cho client poll sau khi quay về) ──
  r.get('/api/payment/invoices/:orderRef', requireAuth, async (req, res) => {
    const invoice = await getInvoiceByRefStmt.get(String(req.params.orderRef));
    if (!invoice) return res.status(404).json({ error: 'not_found' });
    // Chỉ chủ đơn (hoặc cùng trường + teacher) xem được — đơn giản: chủ đơn.
    if (invoice.user_id !== req.user.id && req.user.role !== 'teacher') {
      return res.status(403).json({ error: 'forbidden' });
    }
    res.json({
      orderRef: invoice.order_ref, amount: invoice.amount, currency: invoice.currency,
      status: invoice.status, description: invoice.description,
      created_at: invoice.created_at, paid_at: invoice.paid_at,
    });
  });

  // ── Hoàn tiền (teacher/admin) — ghi refund + bút toán đảo ──
  r.post('/api/payment/refunds', requireAuth, async (req, res) => {
    if (req.user.role !== 'teacher' && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'forbidden', message: 'Chỉ giáo viên/quản trị được hoàn tiền.' });
    }
    try {
      const out = await refundPayment({ payment_id: req.body?.paymentId, amount: req.body?.amount, reason: req.body?.reason });
      res.json(out);
    } catch (e) { res.status(400).json({ error: 'refund_failed', detail: String(e.message) }); }
  });

  // ── Đối soát ledger ↔ payments (admin) — phát hiện lệch sổ ──
  r.get('/api/payment/reconcile', requireAuth, async (req, res) => {
    if (req.user.role !== 'admin' && req.user.role !== 'teacher') {
      return res.status(403).json({ error: 'forbidden' });
    }
    res.json(await reconcile());
  });

  console.log('[payment] routes mounted: /api/payment/* (vnpay + refund + reconcile)');
}
