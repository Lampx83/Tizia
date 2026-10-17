/**
 * sync-inbox.mjs — Đồng bộ bảng `requests` (production DB) → ai-board/inbox.json
 *
 * Chạy mỗi ngày trước phiên Ban điều hành AI:
 *   node server/scripts/sync-inbox.mjs
 *
 * Chỉ export các yêu cầu có status 'pending' hoặc 'reviewing'.
 * Yêu cầu 'done'/'rejected' bị bỏ qua.
 */

import Database from 'better-sqlite3';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..', '..');

const DATA_DIR = process.env.DATA_DIR
  ? path.resolve(process.env.DATA_DIR)
  : path.join(ROOT, 'data');

const DB_PATH = path.join(DATA_DIR, 'tizia.db');
const INBOX_PATH = path.join(ROOT, 'ai-board', 'inbox.json');

if (!fs.existsSync(DB_PATH)) {
  console.error(`[sync-inbox] DB không tồn tại: ${DB_PATH}`);
  console.error('  → Chạy server ít nhất 1 lần để tạo DB, hoặc trỏ DATA_DIR vào production volume.');
  process.exit(1);
}

const db = new Database(DB_PATH, { readonly: true });

// Đọc yêu cầu pending + reviewing, sắp xếp theo votes giảm dần rồi ngày tạo mới nhất
const requests = db.prepare(`
  SELECT id, domain, type, title, detail, student, status, votes, admin_note,
         created_at, updated_at, attachments
  FROM requests
  WHERE status IN ('pending', 'reviewing')
  ORDER BY votes DESC, created_at DESC
`).all();

// Đọc thread messages cho từng yêu cầu (để AI board hiểu ngữ cảnh đã trao đổi)
const getMessages = db.prepare(`
  SELECT role, author_name, body, created_at
  FROM request_messages
  WHERE request_id = ?
  ORDER BY created_at ASC
`);

const items = requests.map(r => {
  const messages = getMessages.all(r.id);
  let attachments = [];
  try { if (r.attachments) attachments = JSON.parse(r.attachments); } catch {}

  return {
    id: `req-${r.id}`,
    db_id: r.id,
    from: r.student,
    domain: r.domain,
    type: r.type,
    subject: r.title,
    body: r.detail || '',
    status: r.status,
    votes: r.votes,
    admin_note: r.admin_note || null,
    attachments,
    thread: messages.map(m => ({
      role: m.role,
      author: m.author_name || null,
      body: m.body,
      at: new Date(m.created_at).toISOString(),
    })),
    created_at: new Date(r.created_at).toISOString(),
    updated_at: new Date(r.updated_at).toISOString(),
  };
});

db.close();

// Bảo toàn các item đã xử lý (status: 'done'/'skipped') từ inbox cũ nếu có
let existingDone = [];
if (fs.existsSync(INBOX_PATH)) {
  try {
    const old = JSON.parse(fs.readFileSync(INBOX_PATH, 'utf8'));
    existingDone = (old.items || []).filter(i => ['done', 'skipped'].includes(i.status));
  } catch {}
}

const inbox = {
  _doc: 'Hộp thư yêu cầu của Ban điều hành AI. Thêm item vào mảng items[] để AI board xử lý trong phiên tiếp theo. Sau khi xử lý, AI board cập nhật status → \'done\' và ghi pr_url.',
  _synced_at: new Date().toISOString(),
  _source: DB_PATH,
  items: [...items, ...existingDone],
};

fs.writeFileSync(INBOX_PATH, JSON.stringify(inbox, null, 2), 'utf8');

console.log(`[sync-inbox] ✅ Đã ghi ${items.length} yêu cầu pending/reviewing vào ${INBOX_PATH}`);
if (items.length === 0) {
  console.log('  → Không có yêu cầu nào cần xử lý.');
} else {
  for (const it of items) {
    const tag = it.status === 'reviewing' ? '🔵' : '🟡';
    console.log(`  ${tag} #${it.db_id} [${it.domain}] "${it.subject}" — ${it.from} (${it.votes} votes)`);
  }
}
