#!/usr/bin/env node
// ============================================================
// fetch-inbox.mjs — Kéo hộp thư production qua HTTP → ai-board/inbox.json
// ============================================================
// Anh em song sinh của server/scripts/sync-inbox.mjs:
//   sync-inbox.mjs   đọc THẲNG file SQLite  → chỉ chạy được TRÊN máy production
//   fetch-inbox.mjs  đọc QUA HTTP           → chạy được từ BẤT KỲ đâu
//
// Script này tồn tại để phiên "Ban điều hành AI" hàng ngày (chạy trong môi
// trường agent/CI, không có volume production) đọc được yêu cầu thật của sinh
// viên. Xem public/CHANGELOG-eduverse.md phiên 62 để biết vì sao.
//
// CHỦ Ý: KHÔNG dùng dependency nào — chỉ `fetch` sẵn có của Node ≥18 và
// node:fs/path. Môi trường agent thường chưa `npm install`, script phải chạy
// được ngay trên repo sạch.
//
// CÁCH DÙNG:
//   AI_BOARD_KEY=<key> node scripts/fetch-inbox.mjs
//   AI_BOARD_KEY=<key> TIZIA_BASE_URL=https://tizia.vn node scripts/fetch-inbox.mjs
//
// Key do người vận hành cấp, KHÔNG commit vào repo (xem .env.example).
// ============================================================

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const INBOX_PATH = path.join(ROOT, 'ai-board', 'inbox.json');

const BASE = String(process.env.TIZIA_BASE_URL || 'https://tizia.vn').replace(/\/+$/, '');
const KEY = String(process.env.AI_BOARD_KEY || '').trim();

if (!KEY) {
  console.error('[fetch-inbox] ✖ Thiếu biến môi trường AI_BOARD_KEY.');
  console.error('  → AI_BOARD_KEY=<key> node scripts/fetch-inbox.mjs');
  process.exit(1);
}

const url = `${BASE}/api/ai-board/inbox`;
let payload;
try {
  const res = await fetch(url, {
    headers: { 'x-ai-board-key': KEY, accept: 'application/json' },
    signal: AbortSignal.timeout(30000),
  });
  if (!res.ok) {
    const body = await res.text().catch(() => '');
    console.error(`[fetch-inbox] ✖ ${url} → HTTP ${res.status}`);
    if (res.status === 404) {
      console.error('  → Route chưa bật trên server. Người vận hành cần set AI_BOARD_KEY (≥24 ký tự) rồi khởi động lại.');
    } else if (res.status === 401 || res.status === 403) {
      console.error('  → Key sai hoặc thiếu. Đối chiếu AI_BOARD_KEY với giá trị đặt trên server.');
    }
    if (body) console.error(`  ${body.slice(0, 200)}`);
    process.exit(1);
  }
  payload = await res.json();
} catch (err) {
  console.error(`[fetch-inbox] ✖ Không gọi được ${url}: ${err?.message || err}`);
  process.exit(1);
}

const items = Array.isArray(payload?.items) ? payload.items : [];

// Bảo toàn các item đã xử lý ('done'/'skipped') từ inbox cũ — server chỉ trả
// pending/reviewing, nếu ghi đè trắng sẽ mất lịch sử phiên trước. Giống hệt cách
// sync-inbox.mjs làm.
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
  _source: url,
  items: [...items, ...existingDone],
};

fs.mkdirSync(path.dirname(INBOX_PATH), { recursive: true });
fs.writeFileSync(INBOX_PATH, JSON.stringify(inbox, null, 2), 'utf8');

console.log(`[fetch-inbox] ✅ Đã ghi ${items.length} yêu cầu pending/reviewing vào ${INBOX_PATH}`);
if (items.length === 0) {
  console.log('  → Hộp thư trống — không có yêu cầu nào cần xử lý.');
} else {
  for (const it of items) {
    const tag = it.status === 'reviewing' ? '🔵' : '🟡';
    console.log(`  ${tag} #${it.db_id} [${it.domain}] "${it.subject}" — ${it.from} (${it.votes} votes)`);
  }
}
