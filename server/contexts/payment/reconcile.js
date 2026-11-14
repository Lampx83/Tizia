// ============================================================
// Payment reconciliation + refund (hardening go-live #2)
// ============================================================
// Reconciliation: đối soát SỔ CÁI nội bộ (ledger) với GIAO DỊCH (payments/refunds)
// → phát hiện lệch (gian lận/bug/IPN trùng/thiếu). Chạy cron hằng ngày + cho admin
// gọi tay. KHÔNG tin số cổng — luôn so với ledger.
//
// Refund: hoàn tiền là first-class — tạo bản ghi refund + bút toán đảo chiều
// (recordRefund) + cập nhật invoice. (Bản này ghi sổ nội bộ; nối API refund VNPay
// thật là điểm tích hợp đánh dấu TODO.)
// ============================================================

import { db } from '../../db.js';
import { recordRefund, getBalance } from './ledger.js';

// ── Reconciliation ──
const paySuccessStmt = db.prepare(`SELECT COALESCE(SUM(amount),0) AS s FROM payments WHERE status='success'`);
const refundDoneStmt = db.prepare(`SELECT COALESCE(SUM(amount),0) AS s FROM refunds WHERE status='done'`);

/**
 * Đối soát toàn hệ thống.
 * revenue_ledger (doanh thu ghi sổ) PHẢI = payments_success − refunds_done.
 */
export async function reconcile() {
  const revenueLedger = -(await getBalance(`revenue`)); // revenue là credit (âm) → đảo dấu
  const paid = (await paySuccessStmt.get()).s;
  const refunded = (await refundDoneStmt.get()).s;
  const expected = paid - refunded;
  const diff = revenueLedger - expected;
  const row = { revenue_ledger: revenueLedger, payments_success: paid, refunds_done: refunded, expected, diff, ok: diff === 0 };
  return { checked: 1, ok: row.ok, mismatches: row.ok ? [] : [row], rows: [row] };
}

// ── Refund ──
const getPaymentStmt = db.prepare(`SELECT * FROM payments WHERE id = ?`);
const refundedForPaymentStmt = db.prepare(`SELECT COALESCE(SUM(amount),0) AS s FROM refunds WHERE payment_id=? AND status='done'`);
const insertRefundStmt = db.prepare(`
  INSERT INTO refunds (payment_id, amount, reason, status, gateway_refund_ref, created_at)
  VALUES (@payment_id, @amount, @reason, 'done', @ref, @t)
  RETURNING id
`);
const markInvoiceRefundedStmt = db.prepare(`UPDATE invoices SET status='refunded', updated_at=@t WHERE id=@id`);

/**
 * Hoàn tiền 1 payment (toàn phần/một phần). Ghi refund + bút toán đảo + cập nhật invoice.
 * @returns {{ ok, refund_id, txn_group, remaining }}
 */
export async function refundPayment({ payment_id, amount, reason = null }) {
  const pay = await getPaymentStmt.get(Number(payment_id));
  if (!pay) throw new Error('payment không tồn tại');
  if (pay.status !== 'success') throw new Error('chỉ hoàn được payment success');
  const already = (await refundedForPaymentStmt.get(pay.id)).s;
  const amt = Math.round(Number(amount));
  if (!Number.isFinite(amt) || amt <= 0) throw new Error('amount không hợp lệ');
  if (already + amt > pay.amount) throw new Error(`vượt quá số đã thu (đã hoàn ${already}/${pay.amount})`);

  const now = Date.now();
  let refund_id, txn_group;
  const tx = db.transaction(async () => {
    // TODO go-live: gọi API refund VNPay ở đây, chỉ ghi 'done' khi cổng xác nhận.
    const info = await insertRefundStmt.run({ payment_id: pay.id, amount: amt, reason: reason ? String(reason).slice(0, 300) : null, ref: `RF${now.toString(36).toUpperCase()}`, t: now });
    refund_id = info.lastInsertRowid;
    ({ txn_group } = await recordRefund({ gateway: pay.gateway, amount: amt, payment_id: pay.id }));
    if (already + amt >= pay.amount) await markInvoiceRefundedStmt.run({ id: pay.invoice_id, t: now });
  });
  await tx();
  return { ok: true, refund_id, txn_group, remaining: pay.amount - already - amt };
}

// ── e-invoice stub (TT 78/2021) — điểm tích hợp Misa/VNPT eInvoice ──
export function issueEInvoiceStub(invoice) {
  // Go-live: gọi API Misa/VNPT, lưu mã tra cứu + link PDF. Hiện trả placeholder.
  return {
    provider: process.env.EINVOICE_PROVIDER || 'stub',
    invoice_no: `STUB-${invoice.id}`,
    status: 'not_issued',
    note: 'Tích hợp Misa/VNPT eInvoice ở go-live (TT 78/2021).',
  };
}
