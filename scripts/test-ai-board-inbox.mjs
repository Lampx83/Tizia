// ============================================================
// Kiểm thử /api/ai-board/inbox (hộp thư Ban điều hành AI) — KHÔNG cần Postgres
// ============================================================
//   node scripts/test-ai-board-inbox.mjs     # exit 0 = pass
//
// Chặn pg.Pool.prototype.query để trả row giả. Nhờ vậy kiểm được cả câu SQL SAU
// KHI qua convert() của server/pg.js (@limit phải thành $1) lẫn hành vi route
// (401 thiếu header · 403 key sai · 200 payload · 500 khi DB lỗi) mà không cần
// dựng DB — chạy được trong CI và trên máy dev chưa có Postgres.
import assert from 'node:assert/strict';
import pg from 'pg';
import express from 'express';

process.env.DATABASE_URL = 'postgres://u:p@127.0.0.1:1/none';
process.env.DB_TARGET = 'local';

const seen = [];
const NOW = 1_700_000_000_000;
pg.Pool.prototype.query = async function (text, params) {
  seen.push({ text, params });
  if (/FROM requests/.test(text) && /status IN \('pending', 'reviewing'\)/.test(text)) {
    return { rows: [
      { id: 7, domain: 'it', type: 'feature', title: 'Thêm bài Python', detail: 'chi tiết',
        student: 'Nam', status: 'pending', votes: 3, admin_note: null,
        created_at: NOW, updated_at: NOW, attachments: '[{"url":"/uploads/requests/a.png","name":"a.png"}]' },
      { id: 8, domain: 'pharmacy', type: 'bug', title: 'Lỗi cân', detail: null,
        student: 'Lan', status: 'reviewing', votes: 1, admin_note: 'đang xem',
        created_at: NOW, updated_at: NOW, attachments: null },
    ], rowCount: 2 };
  }
  if (/FROM request_messages/.test(text)) {
    return { rows: [{ id: 1, request_id: 7, role: 'ai', author_name: 'Ban điều hành AI',
      body: 'đã ghi nhận', attachments: null, created_at: NOW }], rowCount: 1 };
  }
  return { rows: [], rowCount: 0 };
};

const { listBoardInbox } = await import('../server/db.js');
const { attachAiBoardInbox, readBoardKey } = await import('../server/contexts/ai-agent/inbox-api.js');

// ── 1. listBoardInbox: SQL đã dịch đúng + hình dạng bản ghi giữ nguyên ──
const items = await listBoardInbox(9999); // vượt trần → phải bị cap về 500
const inboxSql = seen.find(s => /FROM requests/.test(s.text));
assert.match(inboxSql.text, /LIMIT \$1/, 'placeholder @limit phải thành $1');
assert.ok(!inboxSql.text.includes('@'), 'không được còn @named trong SQL gửi pg');
assert.deepEqual(inboxSql.params, [500], 'limit phải bị cap ở 500');
assert.equal(items.length, 2);
assert.equal(items[0].id, 'req-7');
assert.equal(items[0].db_id, 7);
assert.equal(items[0].from, 'Nam');
assert.equal(items[0].subject, 'Thêm bài Python');
assert.equal(items[0].body, 'chi tiết');
assert.equal(items[1].body, '', 'detail NULL → body rỗng, không phải null');
assert.equal(items[0].attachments[0].url, '/uploads/requests/a.png');
assert.deepEqual(items[1].attachments, [], 'attachments NULL → mảng rỗng');
assert.equal(items[0].thread[0].role, 'ai');
assert.equal(items[0].thread[0].at, new Date(NOW).toISOString());
assert.equal(items[0].created_at, new Date(NOW).toISOString());
await listBoardInbox(); // không truyền limit → mặc định 200
assert.deepEqual(seen.filter(s => /FROM requests/.test(s.text)).at(-1).params, [200]);
console.log('✔ listBoardInbox: SQL → $1, cap limit, hình dạng bản ghi đúng');

// ── 2. readBoardKey: tắt mặc định / từ chối key yếu ──
assert.equal(readBoardKey({}), null);
assert.equal(readBoardKey({ AI_BOARD_KEY: 'ngan-qua' }), null);
assert.equal(readBoardKey({ AI_BOARD_KEY: 'k'.repeat(24) }), 'k'.repeat(24));
console.log('✔ readBoardKey: trống & <24 ký tự → không bật');

// ── 3. Route thật qua express ──
const KEY = 'x'.repeat(32);
const app = express();
assert.equal(attachAiBoardInbox(app, { env: {} }), false, 'không key → không mount');
assert.equal(attachAiBoardInbox(app, { env: { AI_BOARD_KEY: KEY } }), true);
// Bản lỗi DB để kiểm nhánh 500
const appErr = express();
attachAiBoardInbox(appErr, { env: { AI_BOARD_KEY: KEY }, list: async () => { throw new Error('pg down'); } });
app.use((req, res) => res.status(404).json({ error: 'not_found' }));

const srv = app.listen(0, '127.0.0.1');
const srvErr = appErr.listen(0, '127.0.0.1');
// Gắn listener cho CẢ HAI trước khi await: nếu await tuần tự thì server thứ hai
// đã phát 'listening' xong từ lâu và promise sau không bao giờ resolve.
const ready = (s) => new Promise(r => (s.listening ? r() : s.once('listening', r)));
await Promise.all([ready(srv), ready(srvErr)]);
const base = `http://127.0.0.1:${srv.address().port}`;
const baseErr = `http://127.0.0.1:${srvErr.address().port}`;

let res = await fetch(`${base}/api/ai-board/inbox`);
assert.equal(res.status, 401, 'thiếu header → 401');

res = await fetch(`${base}/api/ai-board/inbox`, { headers: { 'x-ai-board-key': 'sai-key' } });
assert.equal(res.status, 403, 'key sai → 403');

res = await fetch(`${base}/api/ai-board/inbox`, { headers: { 'x-ai-board-key': KEY } });
assert.equal(res.status, 200);
assert.equal(res.headers.get('cache-control'), 'no-store');
const body = await res.json();
assert.equal(body.ok, true);
assert.equal(body.count, 2);
assert.deepEqual(body.stats, { pending: 1, reviewing: 1 });
assert.deepEqual(body.by_domain, { it: 1, pharmacy: 1 });
assert.equal(body.items[0].subject, 'Thêm bài Python');

res = await fetch(`${baseErr}/api/ai-board/inbox`, { headers: { 'x-ai-board-key': KEY } });
assert.equal(res.status, 500, 'DB lỗi → 500 JSON, không treo request');
assert.equal((await res.json()).error, 'server_error');

srv.close(); srvErr.close();
console.log('✔ route: 401 thiếu header · 403 key sai · 200 + payload đúng · 500 khi DB lỗi');
console.log('\n✅ TẤT CẢ KIỂM THỬ PASS');
process.exit(0);
