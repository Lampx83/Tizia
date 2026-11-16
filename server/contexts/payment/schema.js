// ============================================================
// Payment context — schema (DDL moved to server/schema.sql)
// ============================================================
// Trước đây file này tạo bảng payment (invoices, payments, refunds,
// ledger_entries, webhook_inbox) qua db.exec() lúc import. Sau khi migrate
// sang Postgres, schema do server/schema.sql sở hữu (đã có đủ bảng).
// File này giữ lại chỉ để import không lỗi (side-effect import ở index.js).
// ============================================================

export const PAYMENT_SCHEMA_OWNED_BY = 'server/schema.sql';
