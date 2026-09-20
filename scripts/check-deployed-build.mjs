#!/usr/bin/env node
// ============================================================
// check-deployed-build.mjs — Bản build đang chạy trên production CŨ tới mức nào?
// ============================================================
// VÌ SAO CÓ FILE NÀY
// Suốt các phiên 62→67, Ban điều hành AI không đọc được hộp thư và mỗi phiên lại
// chẩn đoán ra một nguyên nhân khác ("chưa deploy", "sai key", "domain do app
// khác phục vụ"). Nguyên nhân thật chỉ lộ ra khi ĐO tuổi bản build: 2026-09-20
// production vẫn đang phục vụ code từ TRƯỚC 2026-07-14, tức cũ hơn 2 tháng, nên
// mọi route thêm sau đó (kể cả /api/ai-board/inbox) đều không tồn tại ở đó.
//
// Script này tự động hoá đúng phép đo ấy để không ai phải đoán nữa:
//   1) tải vài file JS tĩnh public từ production
//   2) băm theo đúng công thức blob của git (sha1 "blob <len>\0" + nội dung)
//   3) dò ngược lịch sử git xem nội dung đó khớp commit nào
//   4) kết luận tuổi bản deploy + route hộp thư đã sống chưa
//
// KHÔNG dependency (chỉ fetch/node:crypto/child_process) và ĐỌC-CHỈ: không ghi
// file, không gọi route ghi nào. Chạy được trên repo sạch chưa npm install.
//
// CÁCH DÙNG:
//   node scripts/check-deployed-build.mjs
//   TIZIA_BASE_URL=https://tizia.vn node scripts/check-deployed-build.mjs
//
// Exit code: 0 = build khớp HEAD, 1 = build cũ/không khớp, 2 = không đo được.
// ============================================================

import crypto from 'node:crypto';
import { execFileSync } from 'node:child_process';

const BASE = String(process.env.TIZIA_BASE_URL || 'https://tizia.vn').replace(/\/+$/, '');
const REF = String(process.env.TIZIA_GIT_REF || 'main');

// Các file "chứng cứ": JS tĩnh, nằm dưới /js/ nên KHÔNG bị auth gate chặn (xem
// PUBLIC_PATH_PREFIXES trong server/contexts/identity/auth.js), và đều đổi nội
// dung thường xuyên qua các phiên → đủ nhạy để phân biệt các bản build gần nhau.
// Đây là đường dẫn URL; trong repo chúng nằm dưới `public/` (xem repoPath()).
const PROBES = [
  'js/engine/domain.js',
  'js/engine/wallet.js',
  'js/engine/path-renderer.js',
  'js/domains/it/achievements.js',
  'js/domains/pharmacy/achievements.js',
];

/** URL path → đường dẫn trong repo. `public/` là document root của Express. */
const repoPath = p => `public/${p}`;

/** Băm nội dung theo đúng công thức object của git → so được với `git rev-parse <commit>:<path>`. */
function gitBlobHash(buf) {
  const body = Buffer.isBuffer(buf) ? buf : Buffer.from(String(buf), 'utf8');
  return crypto.createHash('sha1')
    .update(Buffer.concat([Buffer.from(`blob ${body.length}\0`, 'utf8'), body]))
    .digest('hex');
}

function git(args) {
  try {
    // stderr: 'ignore' — nhánh "không tìm thấy path/commit" là chuyện BÌNH THƯỜNG
    // ở đây (ta dò ngược lịch sử, file có thể chưa tồn tại ở commit đang xét).
    // Để mặc định thì git in "fatal: …" thẳng ra màn hình, lẫn vào báo cáo.
    return execFileSync('git', args, {
      encoding: 'utf8',
      maxBuffer: 64 * 1024 * 1024,
      stdio: ['ignore', 'pipe', 'ignore'],
    }).trim();
  } catch {
    return '';
  }
}

/**
 * Commit GẦN NHẤT (theo thứ tự rev-list, mới → cũ) mà nội dung file khớp `hash`.
 * Trả null nếu không bản nào khớp — nghĩa là production đang chạy code không nằm
 * trong lịch sử của ref này (bản cũ hơn lịch sử đã ghi, hoặc một nhánh khác).
 */
function findCommitByBlob(path, hash) {
  const commits = git(['rev-list', REF, '--', path]).split('\n').filter(Boolean);
  for (const c of commits) {
    if (git(['rev-parse', `${c}:${path}`]) === hash) {
      const [sha, date, ...subj] = git(['log', '-1', '--format=%h\t%ad\t%s', '--date=short', c]).split('\t');
      return { sha, date, subject: subj.join('\t') };
    }
  }
  return null;
}

async function getText(url) {
  const res = await fetch(url, { signal: AbortSignal.timeout(20000) });
  return { ok: res.ok, status: res.status, ctype: String(res.headers.get('content-type') || ''), body: await res.text() };
}

console.log(`[check-build] Đo bản build đang chạy tại ${BASE} (đối chiếu lịch sử '${REF}')\n`);

// ── 1. Đối chiếu từng file chứng cứ ──
const rows = [];
for (const p of PROBES) {
  let r;
  try {
    r = await getText(`${BASE}/${p}`);
  } catch (err) {
    rows.push({ p, note: `lỗi mạng: ${err?.message || err}` });
    continue;
  }
  if (!r.ok) { rows.push({ p, note: `HTTP ${r.status}` }); continue; }
  // Front-end catch-all trả HTML kèm 200 — không phải asset, đừng đem đi băm.
  if (/html/i.test(r.ctype) || /^\s*<!DOCTYPE/i.test(r.body)) {
    rows.push({ p, note: 'trả HTML (request rơi vào catch-all, không tới được server này)' });
    continue;
  }
  const hash = gitBlobHash(r.body);
  const local = git(['rev-parse', `${REF}:${repoPath(p)}`]);
  if (hash === local) { rows.push({ p, match: 'HEAD', note: `khớp ${REF} hiện tại` }); continue; }
  const hit = findCommitByBlob(repoPath(p), hash);
  rows.push(hit
    ? { p, match: hit.date, note: `khớp ${hit.sha} (${hit.date}) — ${hit.subject.slice(0, 60)}` }
    : { p, match: null, note: 'KHÔNG khớp bản nào trong lịch sử ⇒ cũ hơn lịch sử đã ghi, hoặc nhánh khác' });
}

const width = Math.max(...PROBES.map(p => p.length));
for (const r of rows) console.log(`  ${r.p.padEnd(width)}  ${r.note}`);

// ── 2. Route hộp thư đã sống chưa ──
console.log('');
let inboxNote = '(không gọi được)';
try {
  const r = await getText(`${BASE}/api/ai-board/inbox`);
  if (r.status === 401 && /"needLogin"\s*:\s*true/.test(r.body)) {
    inboxNote = '401 needLogin ⇒ auth gate chung nuốt request — bản deploy CHƯA có "/api/ai-board/" trong PUBLIC_PATH_PREFIXES';
  } else if (r.status === 404) {
    inboxNote = '404 ⇒ code đã deploy nhưng AI_BOARD_KEY chưa set (hoặc <24 ký tự) nên route không mount';
  } else if (r.status === 401 || r.status === 403) {
    inboxNote = `${r.status} ⇒ route ĐÃ sống, chỉ là header/key chưa đúng — đây là trạng thái mong muốn`;
  } else {
    inboxNote = `HTTP ${r.status}`;
  }
} catch (err) {
  inboxNote = `lỗi mạng: ${err?.message || err}`;
}
console.log(`  /api/ai-board/inbox  ${inboxNote}`);

// ── 3. Kết luận ──
const dated = rows.filter(r => r.match && r.match !== 'HEAD').map(r => r.match).sort();
const missing = rows.filter(r => r.match === null);
const atHead = rows.filter(r => r.match === 'HEAD');

console.log('');
if (atHead.length === rows.length) {
  console.log(`[check-build] ✅ Production đang chạy đúng '${REF}' hiện tại.`);
  process.exit(0);
}
if (!dated.length && !missing.length) {
  console.log('[check-build] ⚠ Không đo được file chứng cứ nào — xem cột ghi chú ở trên.');
  process.exit(2);
}
// Lấy mốc MỚI NHẤT trong các file khớp được: bản build không thể cũ hơn mốc đó.
const newest = dated[dated.length - 1];
if (newest) {
  const lagDays = Math.round((Date.now() - Date.parse(newest)) / 86400000);
  console.log(`[check-build] ✖ Production KHÔNG chạy '${REF}' hiện tại. Bản build tương ứng khoảng ${newest}` +
    ` — cũ hơn hôm nay ~${lagDays} ngày.`);
} else {
  console.log(`[check-build] ✖ Production KHÔNG chạy '${REF}' hiện tại.`);
}
if (missing.length) {
  console.log(`  ${missing.length}/${rows.length} file không khớp BẤT KỲ bản nào trong lịch sử ⇒ bản deploy còn cũ hơn nữa,` +
    ' hoặc dựng từ nhánh khác.');
}
console.log('  → Deploy lại rồi khởi động lại container:  git pull && docker compose up -d --build');
process.exit(1);
