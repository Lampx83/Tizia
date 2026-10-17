// ============================================================
// Payment context — double-entry ledger
// ============================================================
// Nguyên tắc: mỗi giao dịch là 1 nhóm bút toán (txn_group) mà tổng amount_signed
// PHẢI bằng 0 (nợ = có). postTransaction tự kiểm tra cân bằng và insert atomically;
// không cân bằng → throw, không ghi gì. Đây là chốt chặn để sổ sách không lệch —
// KHÔNG bao giờ tin số dư trên cổng, luôn đối soát với ledger nội bộ.
//
// Quy ước dấu: debit (nợ) = số dương, credit (có) = số âm.
//   Tài sản/chi phí tăng → debit (+). Doanh thu/nợ phải trả tăng → credit (-).
// Số dư tài khoản = SUM(amount_signed). Diễn giải dấu tuỳ loại tài khoản (caller).
// ============================================================

import { db } from '../../db.js';

const insertEntryStmt = db.prepare(`
  INSERT INTO ledger_entries (txn_group, account, amount_signed, currency, ref_type, ref_id, memo, created_at)
  VALUES (@txn_group, @account, @amount_signed, @currency, @ref_type, @ref_id, @memo, @created_at)
`);

let _seq = 0;
// txn_group id ổn định, không phụ thuộc Math.random (dễ trace + test). Thời điểm + seq.
function makeTxnGroup(prefix = 'txn') {
  _seq = (_seq + 1) % 1e6;
  return `${prefix}_${Date.now().toString(36)}_${_seq.toString(36)}`;
}

/**
 * Ghi 1 giao dịch sổ cái cân bằng.
 * @param {Object} p
 * @param {Array<{account:string, amount:number, direction:'debit'|'credit'}>} p.entries
 * @param {string} [p.ref_type]  'invoice'|'payment'|'refund'
 * @param {number} [p.ref_id]
 * @param {string} [p.memo]
 * @param {string} [p.currency='VND']
 * @param {string} [p.txn_group] override (mặc định tự sinh)
 * @returns {{ txn_group:string, entries:number }}
 */
export async function postTransaction({ entries, ref_type = null, ref_id = null, memo = null, currency = 'VND', txn_group } = {}) {
  if (!Array.isArray(entries) || entries.length < 2) {
    throw new Error('postTransaction: cần ít nhất 2 bút toán (nợ + có)');
  }
  const signed = entries.map((e) => {
    const amt = Math.round(Number(e.amount));
    if (!Number.isFinite(amt) || amt <= 0) throw new Error(`postTransaction: amount không hợp lệ cho account ${e.account}`);
    if (e.direction !== 'debit' && e.direction !== 'credit') throw new Error(`postTransaction: direction phải debit|credit (account ${e.account})`);
    return { account: String(e.account), amount_signed: e.direction === 'debit' ? amt : -amt };
  });
  const sum = signed.reduce((s, e) => s + e.amount_signed, 0);
  if (sum !== 0) {
    throw new Error(`postTransaction: bút toán KHÔNG cân bằng (sum=${sum}, phải =0). Nợ phải bằng Có.`);
  }
  const group = txn_group || makeTxnGroup();
  const now = Date.now();
  const tx = db.transaction(async () => {
    for (const e of signed) {
      await insertEntryStmt.run({
        txn_group: group, account: e.account, amount_signed: e.amount_signed,
        currency, ref_type, ref_id, memo, created_at: now,
      });
    }
  });
  await tx();
  return { txn_group: group, entries: signed.length };
}

const balanceStmt = db.prepare(`
  SELECT COALESCE(SUM(amount_signed), 0) AS bal FROM ledger_entries WHERE account = ?
`);
const balanceAllStmt = db.prepare(`
  SELECT account, COALESCE(SUM(amount_signed), 0) AS bal
  FROM ledger_entries GROUP BY account ORDER BY account
`);
const txnGroupStmt = db.prepare(`
  SELECT account, amount_signed, ref_type, ref_id, memo, created_at
  FROM ledger_entries WHERE txn_group = ? ORDER BY id
`);

/** Số dư 1 tài khoản (VND, signed). */
export async function getBalance(account) {
  return (await balanceStmt.get(String(account)))?.bal ?? 0;
}
/** Bảng số dư mọi tài khoản toàn hệ thống. */
export async function getAllBalances() {
  return await balanceAllStmt.all();
}
/** Đọc lại các bút toán của 1 txn_group (audit/trace). */
export async function getTransaction(txn_group) {
  return await txnGroupStmt.all(String(txn_group));
}

// ── Helpers cao cấp cho luồng thanh toán ──

/** Khi 1 payment thành công: tiền vào cổng (debit asset) + ghi nhận doanh thu (credit). */
export async function recordPaymentSettled({ gateway, amount, invoice_id, memo }) {
  return postTransaction({
    ref_type: 'payment', ref_id: invoice_id, memo: memo || `Thu tiền đơn ${invoice_id}`,
    entries: [
      { account: `gateway:${gateway}`, amount, direction: 'debit'  }, // tài sản tăng
      { account: `revenue`,            amount, direction: 'credit' }, // doanh thu tăng
    ],
  });
}

/** Khi hoàn tiền: đảo chiều — giảm doanh thu (debit) + tiền rời cổng (credit). */
export async function recordRefund({ gateway, amount, payment_id, memo }) {
  return postTransaction({
    ref_type: 'refund', ref_id: payment_id, memo: memo || `Hoàn tiền payment ${payment_id}`,
    entries: [
      { account: `revenue`,            amount, direction: 'debit'  },
      { account: `gateway:${gateway}`, amount, direction: 'credit' },
    ],
  });
}
