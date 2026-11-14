// ============================================================
// Admin reply CLI — đóng / từ chối / cập nhật 1 yêu cầu của HS
// ============================================================
// Tương đương POST /api/admin/requests/:id/reply nhưng chạy local
// (không cần admin login). Cập nhật:
//   1. requests.status + admin_note
//   2. ai_decisions (decided_by='human', audit trail)
//   3. request_messages (giữ luồng trao đổi trong thread)
//   4. notifications (gửi tin cho HS — bỏ qua nếu student='Ẩn danh')
//
// Cách dùng:
//   node scripts/admin-reply.js <id> <status> "<message>"
//   Status: done | rejected | reviewing | awaiting_user
//
// Ví dụ:
//   node scripts/admin-reply.js 3 done "Đã thêm game tại /lop2-ghep-van.html. Chúc bé học vui!"
//   node scripts/admin-reply.js 1 rejected "Yêu cầu này trùng với module sắp triển khai..."
//
// ⚠️ Sau khi migrate Postgres, MỌI hàm trong db.js đều async — bản cũ gọi kiểu
// sync (db.prepare().get(), setRequestStatus() không await) nên chạy "thành công"
// mà DB không đổi gì. Giữ await ở tất cả lời gọi bên dưới.
// ============================================================

import { db, setRequestStatus, createNotification, addRequestMessage } from '../server/db.js';

const [, , idRaw, statusRaw, ...rest] = process.argv;
const message = rest.join(' ').trim();
const id = Number(idRaw);
const status = String(statusRaw || '').toLowerCase();
const STATUSES = ['done', 'rejected', 'reviewing', 'awaiting_user'];

if (!id || !STATUSES.includes(status) || message.length < 4) {
  console.error(`Usage: node scripts/admin-reply.js <id> <${STATUSES.join('|')}> "<message>"`);
  process.exit(1);
}

const reqRow = await db.prepare(`SELECT id, student, title, domain FROM requests WHERE id = ?`).get(id);
if (!reqRow) {
  console.error(`✖ Không tìm thấy request #${id}`);
  process.exit(1);
}

const ok = await setRequestStatus(id, status, message);
if (!ok) { console.error('✖ setRequestStatus thất bại'); process.exit(1); }

const titleByStatus = {
  done:          'Yêu cầu của bạn đã hoàn thành ✓',
  rejected:      'Phản hồi về yêu cầu của bạn',
  reviewing:     'Yêu cầu của bạn đang được xử lý',
  awaiting_user: 'Yêu cầu của bạn cần bạn bổ sung thêm ⏳',
};

// Ghi vào thread trước để HS thấy đủ luồng trao đổi khi bấm vào thông báo.
try {
  await addRequestMessage({ request_id: id, role: 'ai', author_name: 'Ban điều hành AI', body: message });
} catch (e) { console.warn('  ⚠ thread append failed:', e?.message || e); }

const notif = await createNotification({
  user_display_name: reqRow.student,
  request_id: id,
  kind: 'reply',
  title: titleByStatus[status],
  body: `「${reqRow.title}」 — ${message}`,
  url: `/space.html?domain=${encodeURIComponent(reqRow.domain || '')}#requests`,
});

const actionByStatus = { done: 'approve', rejected: 'reject', reviewing: 'approve', awaiting_user: 'approve' };
await db.prepare(`
  INSERT INTO ai_decisions (request_id, decided_by, action, status_applied, reason, public_note, priority_score, confidence, created_at)
  VALUES (?, 'human', ?, ?, ?, ?, 100, 1.0, ?)
`).run(id, actionByStatus[status], status, `[admin CLI] ${status}`, message.slice(0, 500), Date.now());

// Đọc lại từ DB để chắc chắn đã ghi (bản cũ báo ✓ trong khi DB không đổi).
const after = await db.prepare(`SELECT status FROM requests WHERE id = ?`).get(id);
if (after?.status !== status) {
  console.error(`✖ Ghi hỏng: status trong DB là "${after?.status}" chứ không phải "${status}"`);
  process.exit(1);
}

console.log(`✓ #${id} (${reqRow.domain}) → ${status}`);
console.log(`  HS: ${reqRow.student}`);
console.log(`  Lời nhắn: ${message}`);
console.log(`  Notification: ${notif ? `id=${notif.id} (HS sẽ thấy 🔔)` : 'bỏ qua (student=Ẩn danh hoặc rỗng)'}`);
process.exit(0);
