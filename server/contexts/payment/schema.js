// ============================================================
// Payment context — schema (SQLite, lazy-create on import)
// ============================================================
// Chỉ được import khi PAYMENT_ENABLED=1 (xem server/index.js) → bảng payment
// KHÔNG xuất hiện trong DB mặc định, không ảnh hưởng runtime hiện tại.
//
// Đơn vị tiền: VND nguyên (đồng) — VND không có đơn vị lẻ. Khi gọi VNPay mới
// nhân ×100 (yêu cầu của cổng). Mọi bảng dưới đây lưu VND nguyên.
//
// Thiết kế:
//   invoices       — nghĩa vụ thanh toán (1 đơn hàng). order_ref UNIQUE = idempotency.
//   payments       — giao dịch thực tế từ cổng (1 invoice có thể nhiều lần thử).
//   refunds        — hoàn tiền (first-class, không phải nghĩ sau).
//   ledger_entries — sổ cái double-entry. Mỗi txn_group SUM(amount_signed)=0.
//   webhook_inbox  — nhận IPN từ cổng. event dedupe theo (gateway, event_key).
// ============================================================

import { db } from '../../db.js';

await db.exec(`
  CREATE TABLE IF NOT EXISTS invoices (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id     INTEGER,
    order_ref   TEXT    NOT NULL UNIQUE,        -- mã đơn nội bộ (idempotency key)
    amount      INTEGER NOT NULL,               -- VND nguyên
    currency    TEXT    NOT NULL DEFAULT 'VND',
    description TEXT,
    status      TEXT    NOT NULL DEFAULT 'pending',  -- pending|paid|failed|cancelled|refunded
    gateway     TEXT,                           -- vnpay|momo|zalopay|...
    created_at  INTEGER NOT NULL,
    updated_at  INTEGER NOT NULL,
    paid_at     INTEGER
  );
  CREATE INDEX IF NOT EXISTS idx_invoices_order  ON invoices(order_ref);
  CREATE INDEX IF NOT EXISTS idx_invoices_user   ON invoices(user_id, created_at DESC);
  CREATE INDEX IF NOT EXISTS idx_invoices_status ON invoices(status, created_at DESC);
`);
// metadata JSON: gắn payload tuỳ ý vào invoice (vd {plan,cycle} cho upgrade gói B2C).
// IPN parse để biết phải kích hoạt gì sau khi settled. Lazy add column.
try { await db.exec(`ALTER TABLE invoices ADD COLUMN metadata TEXT`); } catch {}
await db.exec(`

  CREATE TABLE IF NOT EXISTS payments (
    id               INTEGER PRIMARY KEY AUTOINCREMENT,
    invoice_id       INTEGER NOT NULL,
    gateway          TEXT    NOT NULL,
    gateway_txn_ref  TEXT,                       -- mã giao dịch phía cổng (vnp_TransactionNo)
    amount           INTEGER NOT NULL,
    status           TEXT    NOT NULL,           -- success|failed|pending
    response_code    TEXT,                       -- mã trả về của cổng (vnp_ResponseCode)
    raw_response     TEXT,                       -- JSON full callback (audit)
    created_at       INTEGER NOT NULL,
    FOREIGN KEY (invoice_id) REFERENCES invoices(id) ON DELETE CASCADE
  );
  CREATE INDEX IF NOT EXISTS idx_payments_invoice ON payments(invoice_id);

  CREATE TABLE IF NOT EXISTS refunds (
    id                 INTEGER PRIMARY KEY AUTOINCREMENT,
    payment_id         INTEGER NOT NULL,
    amount             INTEGER NOT NULL,
    reason             TEXT,
    status             TEXT    NOT NULL DEFAULT 'pending',  -- pending|done|rejected
    gateway_refund_ref TEXT,
    created_at         INTEGER NOT NULL,
    FOREIGN KEY (payment_id) REFERENCES payments(id) ON DELETE CASCADE
  );
  CREATE INDEX IF NOT EXISTS idx_refunds_payment ON refunds(payment_id);

  -- Sổ cái double-entry: mỗi txn_group là 1 bút toán cân bằng (SUM amount_signed = 0).
  -- amount_signed: nợ (debit) = +, có (credit) = -. Tài khoản là chuỗi tự do, vd:
  --   'gateway:vnpay'  (tài sản — tiền đang ở cổng)
  --   'revenue'         (doanh thu)
  --   'wallet:user:15'  (ví học viên — nếu nạp tiền)
  CREATE TABLE IF NOT EXISTS ledger_entries (
    id            INTEGER PRIMARY KEY AUTOINCREMENT,
    txn_group     TEXT    NOT NULL,             -- nhóm bút toán cân bằng
    account       TEXT    NOT NULL,
    amount_signed INTEGER NOT NULL,             -- VND, debit + / credit -
    currency      TEXT    NOT NULL DEFAULT 'VND',
    ref_type      TEXT,                          -- 'invoice'|'payment'|'refund'
    ref_id        INTEGER,
    memo          TEXT,
    created_at    INTEGER NOT NULL
  );
  CREATE INDEX IF NOT EXISTS idx_ledger_group   ON ledger_entries(txn_group);
  CREATE INDEX IF NOT EXISTS idx_ledger_account ON ledger_entries(account, created_at DESC);

  -- Webhook inbox: IPN từ cổng. Dedupe theo (gateway, event_key) → xử lý 1 lần.
  CREATE TABLE IF NOT EXISTS webhook_inbox (
    id              INTEGER PRIMARY KEY AUTOINCREMENT,
    gateway         TEXT    NOT NULL,
    event_key       TEXT    NOT NULL,           -- khoá idempotency (vd order_ref + txn_ref)
    order_ref       TEXT,
    payload         TEXT,                        -- JSON query/body nhận được
    signature_valid INTEGER NOT NULL DEFAULT 0,  -- 0|1
    processed       INTEGER NOT NULL DEFAULT 0,  -- 0|1
    received_at     INTEGER NOT NULL,
    processed_at    INTEGER,
    UNIQUE(gateway, event_key)
  );
  CREATE INDEX IF NOT EXISTS idx_webhook_order ON webhook_inbox(order_ref);
`);

console.log('[payment] schema ready (invoices, payments, refunds, ledger_entries, webhook_inbox)');
