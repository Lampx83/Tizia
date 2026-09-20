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

/**
 * Domain có đang do một app KHÁC (không phải server Express của repo này) phục
 * vụ không? Express/Caddy trong repo không đặt các header này. Nhận ra sớm để
 * không đổ lỗi nhầm cho key/deploy của EduVerse (đo thật 2026-09-19).
 */
function frontedByNext(res) {
  const poweredBy = String(res.headers.get('x-powered-by') || '');
  const vary = String(res.headers.get('vary') || '');
  return /next\.?js/i.test(poweredBy) || res.headers.has('x-nextjs-cache') || /\brsc\b/i.test(vary);
}

/**
 * Hỏi thêm trang gốc của domain. CẦN THIẾT vì trang lỗi 5xx thường bị proxy
 * thay bằng body trần, KHÔNG còn header nhận dạng (đo thật 2026-09-19: tizia.vn
 * trả 500 "Internal Server Error" không header, trong khi '/' trả 200 kèm
 * `x-powered-by: Next.js`). Chỉ gọi ở nhánh lỗi, và nuốt mọi lỗi mạng — đây là
 * thông tin thêm cho chẩn đoán, không được làm hỏng luồng báo lỗi chính.
 */
async function frontedByNextAtRoot(base) {
  try {
    const res = await fetch(`${base}/`, { signal: AbortSignal.timeout(10000) });
    return frontedByNext(res);
  } catch {
    return false;
  }
}

let payload;
try {
  const res = await fetch(url, {
    headers: { 'x-ai-board-key': KEY, accept: 'application/json' },
    signal: AbortSignal.timeout(30000),
  });
  if (!res.ok) {
    const body = await res.text().catch(() => '');
    console.error(`[fetch-inbox] ✖ ${url} → HTTP ${res.status}`);
    // PHÂN BIỆT 3 nguyên nhân khác hẳn nhau — đoán sai là người vận hành đi sửa
    // nhầm chỗ (đo thật ngày 2026-09-17: server trả 401 needLogin, script cũ
    // bảo "key sai" trong khi thực ra server chưa deploy code có route).
    //
    //   401 + {"needLogin":true} → auth gate CHUNG nuốt request ⇒ server đang
    //       chạy code CŨ, chưa có '/api/ai-board/' trong PUBLIC_PATH_PREFIXES
    //       (xem server/contexts/identity/auth.js). Sửa bằng DEPLOY, không phải
    //       bằng đổi key.
    //   401 không có needLogin → route đã có, chỉ thiếu header x-ai-board-key.
    //   403                    → route đã có, key gửi lên không khớp.
    //   404                    → code đã deploy nhưng AI_BOARD_KEY chưa set/quá
    //       ngắn ⇒ route không được mount.
    const staleBuild = res.status === 401 && /"needLogin"\s*:\s*true/.test(body);
    if (staleBuild) {
      console.error('  → Server CHƯA deploy code có route này (auth gate chung trả 401 needLogin).');
      console.error('    Key KHÔNG phải vấn đề. Người vận hành cần deploy nhánh main rồi restart:');
      console.error('      git pull && docker compose up -d --build');
    } else if (res.status === 404) {
      console.error('  → Code đã có nhưng route chưa bật: AI_BOARD_KEY chưa set hoặc <24 ký tự. Set key rồi khởi động lại server.');
    } else if (res.status === 401) {
      console.error('  → Route đã bật nhưng thiếu header x-ai-board-key (lỗi phía script/proxy).');
    } else if (res.status === 403) {
      console.error('  → Key sai. Đối chiếu AI_BOARD_KEY với giá trị đặt trên server.');
    } else if (res.status >= 500) {
      // Trước 2026-09-19 script im lặng ở nhánh này: chỉ in "HTTP 500" rồi thoát,
      // người vận hành không biết nhìn đi đâu. Hôm đó tizia.vn trả 500 cho MỌI
      // /api/* trong khi '/' vẫn 200 — header cho thấy domain đã do một app
      // Next.js phục vụ, tức server Express của repo này không còn nhận /api nữa.
      console.error('  → Server trả lỗi 5xx cho chính route hộp thư. Đây KHÔNG phải chuyện key.');
      if (frontedByNext(res) || await frontedByNextAtRoot(BASE)) {
        console.error('    Header (x-powered-by / x-nextjs-cache / vary: rsc) cho thấy domain đang do một app');
        console.error('    Next.js phục vụ, không phải server Express của repo này ⇒ /api/* rơi vào catch-all.');
        console.error('    Cần: trỏ lại /api/* về container eduverse, hoặc đặt TIZIA_BASE_URL sang host thật của API:');
        console.error('      TIZIA_BASE_URL=https://<host-api-that> AI_BOARD_KEY=<key> node scripts/fetch-inbox.mjs');
      } else {
        console.error('    Kiểm tra app còn sống không: curl -i $TIZIA_BASE_URL/api/health, rồi xem log container.');
      }
    }
    if (body) console.error(`  ${body.slice(0, 200)}`);
    process.exit(1);
  }
  // 200 vẫn có thể KHÔNG phải hộp thư: một front-end catch-all (Next.js, trang
  // lỗi của proxy…) cũng trả 200 kèm HTML. res.json() khi đó ném lỗi cú pháp khó
  // hiểu — chặn trước và nói thẳng nguyên nhân.
  const ctype = String(res.headers.get('content-type') || '');
  if (!/\bjson\b/i.test(ctype)) {
    console.error(`[fetch-inbox] ✖ ${url} → HTTP 200 nhưng content-type "${ctype || '(không có)'}", không phải JSON.`);
    console.error('  → Request rơi vào một app khác đang phục vụ domain, không tới được route hộp thư.');
    if (frontedByNext(res)) console.error('    Header cho thấy đó là một app Next.js.');
    console.error('    Đặt TIZIA_BASE_URL trỏ đúng host đang chạy server Express của repo này.');
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
