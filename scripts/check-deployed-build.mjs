#!/usr/bin/env node
// ============================================================
// check-deployed-build.mjs — Production đang chạy CHÍNH XÁC commit nào, nhánh nào?
// ============================================================
// VÌ SAO CÓ FILE NÀY
// Suốt các phiên 62→67, Ban điều hành AI không đọc được hộp thư và mỗi phiên lại
// chẩn đoán ra một nguyên nhân khác ("chưa deploy", "sai key", "domain do app khác
// phục vụ"). Phiên 67 đo được tuổi bản build nhưng CHỈ dò trong lịch sử của `main`
// nên kết luận cụt: "2/5 file không khớp bản nào trong lịch sử".
//
// Phiên 68 (2026-09-21) dò lại trên TOÀN BỘ nhánh và ra đáp án thật:
//   Production chạy `feat/postgres-migration` @ 40fd384 (2026-07-24) — một nhánh
//   KHÔNG CHUNG GỐC LỊCH SỬ với `main` (`git merge-base` rỗng). `main` là một
//   lịch sử được gieo lại từ 7632aaf (2026-07-14). Vì thế mọi phép dò "trong lịch
//   sử main" đều phải trượt, và mọi cải tiến merge vào `main` chưa từng tới tay
//   người học.
//
// Bài học đã mã hoá vào script: ĐỪNG giả định production dựng từ `main`. Dò hết
// mọi ref rồi mới kết luận.
//
// PHÉP ĐO
//   1) tải vài file JS tĩnh public từ production
//   2) băm theo đúng công thức blob của git (sha1 "blob <len>\0" + nội dung)
//   3) quét MỌI ref tìm commit MỚI NHẤT mà cả bộ file khớp cùng lúc
//   4) kiểm chứng độc lập bằng file chỉ-có-ở-một-nhánh (200 vs 404)
//   5) kết luận: nhánh + commit + độ trễ + route hộp thư đã sống chưa
//
// KHÔNG dependency (chỉ fetch/node:crypto/child_process) và ĐỌC-CHỈ: không ghi
// file, không gọi route ghi nào. Chạy được trên repo sạch chưa npm install.
//
// LƯU Ý: chỉ dò được trong các ref mà bản clone này CÓ. Nếu nhánh production nằm
// ở remote chưa fetch, chạy `git fetch origin --prune` trước.
//
// CÁCH DÙNG:
//   node scripts/check-deployed-build.mjs
//   TIZIA_BASE_URL=https://tizia.vn node scripts/check-deployed-build.mjs
//   TIZIA_GIT_REF=main node scripts/check-deployed-build.mjs   # ref muốn đối chiếu
//
// Exit code: 0 = build khớp HEAD của REF, 1 = build khác/cũ, 2 = không đo được.
// ============================================================

import crypto from 'node:crypto';
import { execFileSync } from 'node:child_process';

const BASE = String(process.env.TIZIA_BASE_URL || 'https://tizia.vn').replace(/\/+$/, '');
const REF = String(process.env.TIZIA_GIT_REF || 'main');
// Trần số commit quét ở bước "dò toàn bộ ref". Repo hiện ~500 commit trên mọi
// nhánh nên 5000 là dư; đặt trần để script không treo nếu lịch sử phình to.
const MAX_SCAN = Number(process.env.TIZIA_MAX_SCAN || 5000);

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

/** Metadata gọn của 1 commit. */
function commitInfo(sha) {
  const line = git(['log', '-1', '--format=%h\t%ad\t%s', '--date=short', sha]);
  if (!line) return null;
  const [short, date, ...subj] = line.split('\t');
  return { sha, short, date, subject: subj.join('\t') };
}

/**
 * Blob hash của NHIỀU path tại 1 commit — MỘT lần gọi git thay vì N lần.
 * Quan trọng về tốc độ: bước 3 quét hàng trăm commit, mỗi commit mà gọi 5 lần
 * `rev-parse` thì chậm gấp 5.
 */
function blobsAt(sha, paths) {
  const out = git(['ls-tree', sha, '--', ...paths]);
  const map = new Map();
  for (const line of out.split('\n')) {
    // format: "<mode> blob <sha>\t<path>"
    const m = /^\d+ blob ([0-9a-f]{40})\t(.+)$/.exec(line);
    if (m) map.set(m[2], m[1]);
  }
  return map;
}

/**
 * Commit MỚI NHẤT (trên MỌI ref) mà TẤT CẢ file chứng cứ khớp cùng lúc.
 *
 * Vì sao phải khớp CÙNG LÚC: dò từng file riêng lẻ cho ra các mốc lệch nhau (một
 * file có thể giữ nguyên nội dung suốt 2 tháng) và ghép lại thành bức tranh sai.
 * Khớp đồng thời cả bộ mới định vị được đúng một bản build.
 *
 * Vì sao quét MỌI ref chứ không riêng `main`: xem phần đầu file — production đang
 * chạy một nhánh không chung gốc lịch sử với `main`.
 */
function findDeployCommit(want) {
  const paths = [...want.keys()];
  const revs = git(['rev-list', '--all', '--date-order']).split('\n').filter(Boolean);
  for (const sha of revs.slice(0, MAX_SCAN)) {
    const have = blobsAt(sha, paths);
    if (have.size !== paths.length) continue;
    let ok = true;
    for (const [p, h] of want) if (have.get(p) !== h) { ok = false; break; }
    if (ok) return commitInfo(sha);
  }
  return null;
}

/** Các nhánh remote chứa commit này — để người vận hành biết deploy từ đâu. */
function branchesContaining(sha) {
  const out = git(['branch', '-r', '--contains', sha]);
  return out.split('\n').map(s => s.trim().replace(/^origin\//, '')).filter(Boolean);
}

async function getText(url) {
  const res = await fetch(url, { signal: AbortSignal.timeout(20000) });
  return { ok: res.ok, status: res.status, ctype: String(res.headers.get('content-type') || ''), body: await res.text() };
}

/**
 * Như getText nhưng thử lại 1 lần khi gặp lỗi mạng / 5xx.
 * Đo thật 2026-09-21: một file chứng cứ trả 503 thoáng qua, lần gọi ngay sau đó
 * lại 200. Mất 1 file là mất 1 điểm tựa để định vị bản build, trong khi nguyên
 * nhân chỉ là nhiễu tạm thời — thử lại 1 lần là đủ và vẫn rẻ.
 */
async function getTextRetry(url) {
  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const r = await getText(url);
      if (r.ok || (r.status < 500 && r.status !== 429)) return r;
      if (attempt === 0) await new Promise(res => setTimeout(res, 1500));
      else return r;
    } catch (err) {
      if (attempt === 1) throw err;
      await new Promise(res => setTimeout(res, 1500));
    }
  }
  return null;
}

async function headStatus(url) {
  try {
    const res = await fetch(url, { method: 'GET', signal: AbortSignal.timeout(20000) });
    return res.status;
  } catch {
    return 0;
  }
}

console.log(`[check-build] Đo bản build đang chạy tại ${BASE} (đối chiếu '${REF}' + mọi nhánh khác)\n`);

// ── 1. Tải & băm từng file chứng cứ ──
const rows = [];
const want = new Map();
for (const p of PROBES) {
  let r;
  try {
    r = await getTextRetry(`${BASE}/${p}`);
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
  want.set(repoPath(p), hash);
  const atRefHead = git(['rev-parse', `${REF}:${repoPath(p)}`]);
  // "trùng REF hiện tại" ≠ "production chạy REF": file không đổi giữa các nhánh
  // thì nhánh nào cũng trùng. Chỉ khi CẢ BỘ cùng trùng mới kết luận được.
  rows.push(hash === atRefHead
    ? { p, match: 'HEAD', note: `trùng ${REF} hiện tại` }
    : { p, match: 'other', note: `khác ${REF} hiện tại (blob ${hash.slice(0, 8)})` });
}

const width = Math.max(...PROBES.map(p => p.length));
for (const r of rows) console.log(`  ${r.p.padEnd(width)}  ${r.note}`);

const atHead = rows.filter(r => r.match === 'HEAD');
if (!want.size) {
  console.log('\n[check-build] ⚠ Không tải được file chứng cứ nào — xem cột ghi chú ở trên.');
  process.exit(2);
}

// ── 2. Dò commit trên MỌI nhánh ──
console.log('\n[check-build] Dò commit khớp cả bộ chứng cứ trên mọi ref…');
const deploy = findDeployCommit(want);
let deployBranches = [];
let sharesHistory = null;
if (deploy) {
  deployBranches = branchesContaining(deploy.sha);
  // `merge-base` rỗng = hai lịch sử rời nhau hoàn toàn. Đây chính là cái bẫy đã
  // làm 6 phiên chẩn đoán sai, nên phải nói thẳng ra.
  sharesHistory = Boolean(git(['merge-base', REF, deploy.sha]));
  console.log(`  ✔ Khớp ${deploy.short} (${deploy.date}) — ${deploy.subject.slice(0, 64)}`);
  console.log(`    nhánh chứa commit này: ${deployBranches.length ? deployBranches.join(', ') : '(không nhánh remote nào)'}`);
  console.log(`    chung gốc lịch sử với '${REF}'? ${sharesHistory ? 'CÓ' : 'KHÔNG — hai lịch sử rời nhau'}`);
} else {
  console.log(`  ✖ Không commit nào trong repo này khớp cả bộ (đã quét tối đa ${MAX_SCAN} commit).`);
  console.log('    → Bản deploy dựng từ code chưa từng push lên đây, hoặc thiếu ref: `git fetch origin --prune` rồi chạy lại.');
}

// ── 3. Kiểm chứng độc lập: file chỉ-có-ở-một-nhánh ──
// Băm nội dung có thể trùng nhau giữa các nhánh; sự CÓ MẶT / VẮNG MẶT của file thì
// không. Lấy file chỉ tồn tại ở bản deploy (kỳ vọng 200) và file chỉ tồn tại ở REF
// (kỳ vọng 404) — hai phép thử ngược chiều nhau, khó trùng hợp ngẫu nhiên.
// Chạy bất cứ khi nào production KHÔNG khớp hẳn REF: vài file có thể trùng nội
// dung giữa hai nhánh (file không đổi), nên `atHead.length > 0` KHÔNG có nghĩa là
// production chạy REF. Đo thật 2026-09-21: 2/5 file trùng main nhưng bản deploy
// thật lại nằm ở một nhánh rời lịch sử — điều kiện cũ (`!atHead.length`) đã bỏ
// qua đúng phép kiểm chứng cần nhất lúc đó.
if (deploy && atHead.length !== rows.length) {
  const onlyDeploy = git(['diff', '--name-only', '--diff-filter=A', `${REF}`, deploy.sha, '--', 'public/js'])
    .split('\n').filter(Boolean).slice(0, 2);
  const onlyRef = git(['diff', '--name-only', '--diff-filter=A', deploy.sha, `${REF}`, '--', 'public/js'])
    .split('\n').filter(Boolean).slice(0, 2);
  if (onlyDeploy.length || onlyRef.length) {
    console.log('\n[check-build] Kiểm chứng bằng file chỉ-có-ở-một-nhánh:');
    for (const f of onlyDeploy) {
      const url = f.replace(/^public\//, '');
      const st = await headStatus(`${BASE}/${url}`);
      console.log(`  ${st === 200 ? '✔' : '✖'} /${url}  → ${st || 'lỗi mạng'}  (chỉ có ở bản deploy, kỳ vọng 200)`);
    }
    for (const f of onlyRef) {
      const url = f.replace(/^public\//, '');
      const st = await headStatus(`${BASE}/${url}`);
      console.log(`  ${st === 404 ? '✔' : '✖'} /${url}  → ${st || 'lỗi mạng'}  (chỉ có ở '${REF}', kỳ vọng 404)`);
    }
  }
}

// ── 4. Route hộp thư đã sống chưa ──
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

// ── 5. Kết luận ──
console.log('');
if (atHead.length === rows.length) {
  console.log(`[check-build] ✅ Production đang chạy đúng '${REF}' hiện tại.`);
  process.exit(0);
}
if (!deploy) {
  console.log(`[check-build] ⚠ Production KHÔNG chạy '${REF}' hiện tại, và không định vị được commit đang chạy.`);
  process.exit(2);
}

const lagDays = Math.round((Date.now() - Date.parse(deploy.date)) / 86400000);
console.log(`[check-build] ✖ Production KHÔNG chạy '${REF}'. Đang chạy ${deploy.short} (${deploy.date})` +
  ` — cũ hơn hôm nay ~${lagDays} ngày.`);
if (deployBranches.length) {
  console.log(`  Nhánh của bản đang chạy: ${deployBranches.join(', ')}`);
}
if (sharesHistory === false) {
  console.log(`  ⚠ Nhánh đó KHÔNG chung gốc lịch sử với '${REF}'. "git checkout ${REF} && docker compose up -d --build"`);
  console.log(`     sẽ KHÔNG phải là "cập nhật" mà là ĐỔI HẲN sang một cây code khác — phải rà trước khi làm.`);
  console.log(`  → Trước hết quyết định nhánh nào là nhánh production, rồi hợp nhất, rồi mới deploy.`);
} else {
  console.log(`  → Deploy lại rồi khởi động lại container:  git pull && docker compose up -d --build`);
}
process.exit(1);
