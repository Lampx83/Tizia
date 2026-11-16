// Chọn Postgres nào để kết nối — điểm cấu hình DUY NHẤT.
//
// Thứ tự ưu tiên:
//   1. DATABASE_URL tường minh (container prod, CI, script migrate) — LUÔN thắng.
//   2. Dev: DB_TARGET = 'local' | 'prod' (đọc từ .env).
//        local → LOCAL_DATABASE_URL (Postgres local, docker compose, cổng 5433)
//        prod  → PROD_DATABASE_URL  (chọc thẳng DB prod QUA SSH tunnel — nhớ
//                `npm run db:tunnel` trước). ⚠️ Ghi = SỬA DATA THẬT của user.
export function resolveDatabaseUrl() {
  if (process.env.DATABASE_URL) return process.env.DATABASE_URL;

  const target = String(process.env.DB_TARGET || 'local').toLowerCase();
  if (target === 'prod') {
    const url = process.env.PROD_DATABASE_URL;
    if (!url) {
      throw new Error(
        '[db-config] DB_TARGET=prod nhưng thiếu PROD_DATABASE_URL trong .env. ' +
        'Cấu hình PROD_DATABASE_URL + mở tunnel: `npm run db:tunnel`.'
      );
    }
    console.warn(
      '\n' + '='.repeat(64) +
      '\n⚠️  DB_TARGET=prod — LOCALHOST ĐANG CHỌC THẲNG VÀO DATABASE PROD!' +
      '\n   Mọi thao tác GHI (đăng ký / ví / request / sửa content…) SẼ THAY ĐỔI' +
      '\n   DỮ LIỆU THẬT của người dùng. Đổi về local: DB_TARGET=local trong .env.' +
      '\n' + '='.repeat(64) + '\n'
    );
    return url;
  }

  return process.env.LOCAL_DATABASE_URL
    || 'postgres://tizia:tizia_dev_pw@127.0.0.1:5433/tizia';
}

// Nhãn ngắn để log/hiển thị biết đang nối DB nào.
export function currentDbLabel() {
  if (process.env.DATABASE_URL) return 'env:DATABASE_URL';
  return String(process.env.DB_TARGET || 'local').toLowerCase() === 'prod'
    ? 'PROD (tunnel)' : 'local';
}
