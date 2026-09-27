#!/usr/bin/env node
// ============================================================
// ai-board-preflight.mjs — BƯỚC ĐẦU TIÊN của mọi phiên "Ban điều hành AI"
//
// Chạy:  node scripts/ai-board-preflight.mjs
//        node scripts/ai-board-preflight.mjs --no-net   (bỏ qua phần gọi mạng)
//
// ── VÌ SAO CÓ FILE NÀY ──
// Routine hàng ngày là một prompt lưu ngoài repo, không ai version nó. Ba lần
// hỏng lặp đi lặp lại trong 14 phiên (xem public/CHANGELOG-eduverse.md):
//   1. Hộp thư 401 nhiều ngày liền mà không có cơ chế nào BUỘC con người quyết định.
//   2. Khi hộp thư chết, phiên tự nghĩ ra việc — rủi ro cao nhất là bịa việc.
//   3. Không ai đếm được "đã hỏng bao nhiêu ngày" ngoài cách đọc văn xuôi CHANGELOG.
// Script này biến cả ba thành dữ liệu: đo hộp thư, đếm số ngày hỏng liên tiếp
// (lưu ở ai-board/inbox-status.json), chạy bậc thang việc dự phòng, rồi in ra
// KẾT LUẬN duy nhất mà phiên phải tuân theo.
//
// Script CHỈ ĐỌC + ghi đúng một file trạng thái. Không sửa học liệu, không commit.
// Mã thoát luôn là 0 — đây là công cụ chẩn đoán, không phải cổng CI.
// ============================================================

import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const STATE_FILE = path.join(ROOT, 'ai-board', 'inbox-status.json');
const NO_NET = process.argv.includes('--no-net');
const TODAY = new Date().toISOString().slice(0, 10);

const BASE = process.env.TIZIA_BASE_URL || 'https://tizia.vn';
const PATHS = [
  '/api/ai-board/inbox', '/api/requests', '/api/public/requests',
  '/api/board/inbox', '/api/admin/requests', '/api/ai-board/requests',
];
const ESCALATE_AFTER_DAYS = 3;

const line = (s = '') => console.log(s);
const rule = () => line('─'.repeat(62));

// ── 1. Đo hộp thư ────────────────────────────────────────────
async function probeInbox() {
  if (NO_NET) return { skipped: true, readable: false, results: [] };
  const key = process.env.AI_BOARD_KEY || '';
  const results = [];
  let readable = false, items = null;
  for (const p of PATHS) {
    try {
      const res = await fetch(BASE + p, {
        headers: key ? { 'x-ai-board-key': key } : {},
        signal: AbortSignal.timeout(20_000),
      });
      const body = await res.text();
      results.push({ path: p, status: res.status, body: body.slice(0, 120) });
      if (res.ok && !readable) {
        readable = true;
        try { items = JSON.parse(body).items ?? null; } catch { /* không phải JSON — vẫn tính là đọc được */ }
      }
    } catch (e) {
      results.push({ path: p, status: 'ERR', body: String(e.message).slice(0, 120) });
    }
  }
  return { skipped: false, readable, items, results, keyPresent: Boolean(key) };
}

// ── 2. Đếm số ngày hỏng liên tiếp ────────────────────────────
function updateState(readable, skipped) {
  let st = { first_failure_date: null, consecutive_failures: 0, last_checked: null, history: [] };
  try { st = { ...st, ...JSON.parse(fs.readFileSync(STATE_FILE, 'utf8')) }; } catch { /* lần đầu */ }
  if (skipped) return st;                       // --no-net: không làm bẩn số liệu
  if (st.last_checked === TODAY) return st;     // chạy lại trong ngày: không đếm trùng

  if (readable) {
    st.consecutive_failures = 0;
    st.first_failure_date = null;
  } else {
    st.consecutive_failures = (st.consecutive_failures || 0) + 1;
    st.first_failure_date = st.first_failure_date || TODAY;
  }
  st.last_checked = TODAY;
  st.history = [...(st.history || []), { date: TODAY, readable }].slice(-60);
  fs.mkdirSync(path.dirname(STATE_FILE), { recursive: true });
  fs.writeFileSync(STATE_FILE, JSON.stringify(st, null, 2) + '\n');
  return st;
}

// ── 3. Bậc thang việc dự phòng — mỗi bậc phải ĐO ĐƯỢC ────────
const runNode = (script, args = []) => {
  try {
    return { ok: true, out: execFileSync(process.execPath, [path.join(ROOT, 'scripts', script), ...args],
      { cwd: ROOT, encoding: 'utf8', timeout: 300_000, maxBuffer: 64 * 1024 * 1024 }) };
  } catch (e) {
    return { ok: false, out: String(e.stdout || '') + String(e.stderr || e.message) };
  }
};

function tier1Integrity() {
  const r = runNode('check-content-integrity.mjs');
  const m = r.out.match(/Tổng:\s*(\d+)\s*file có vấn đề/);
  const count = m ? Number(m[1]) : (/không phát hiện vấn đề/.test(r.out) ? 0 : null);
  return { name: 'Bài lí thuyết mồ côi / lỗi toàn vẹn học liệu',
           cmd: 'node scripts/check-content-integrity.mjs',
           count, clean: count === 0 };
}

function tier2MissingWeek36() {
  const missing = [];
  const scenDir = path.join(ROOT, 'public', 'js', 'scenarios');
  for (const lop of fs.readdirSync(scenDir).sort()) {
    const dir = path.join(scenDir, lop);
    if (!fs.statSync(dir).isDirectory()) continue;
    for (const f of fs.readdirSync(dir)) {
      if (!f.endsWith('.js') || f.startsWith('_')) continue;
      const src = fs.readFileSync(path.join(dir, f), 'utf8');
      if (!/^\s*M\(\s*35\s*,/m.test(src)) continue;   // chỉ xét môn theo mô hình 35/36 tuần
      if (!/^\s*M\(\s*36\s*,/m.test(src)) missing.push(`${lop}/${f}`);
    }
  }
  return { name: 'Môn dừng ở 35 tuần (cần soạn CẢ bài lí thuyết lẫn quiz tuần 36)',
           cmd: 'node scripts/ai-board-preflight.mjs', count: missing.length, clean: missing.length === 0, missing };
}

function tier3AnswerBias() {
  const r = runNode('audit-answer-distribution.js', ['--json']);
  let data = null;
  try { data = JSON.parse(r.out.slice(r.out.indexOf('{'))); } catch { /* ignore */ }
  if (!data) return { name: 'Lệch phân bố đáp án A/B/C/D', cmd: 'node scripts/audit-answer-distribution.js',
                      count: null, clean: false, note: 'không đọc được JSON' };
  const skewed = [];
  for (const [subject, s] of Object.entries(data.bySubject || {})) {
    if (!s.total || s.total < 30) continue;
    const top = Math.max(s.A, s.B, s.C, s.D) / s.total;
    if (top >= 0.60) skewed.push({ subject, total: s.total, topShare: Math.round(top * 100) });
  }
  skewed.sort((a, b) => b.topShare - a.topShare);
  const anomalies = (data.total?.anomalies || []).length;
  return { name: 'Lệch phân bố đáp án A/B/C/D (≥60% dồn vào một vị trí)',
           cmd: 'node scripts/audit-answer-distribution.js',
           count: skewed.length, clean: skewed.length === 0 && anomalies === 0, skewed, anomalies };
}

// ── Chạy ─────────────────────────────────────────────────────
rule();
line(`  PREFLIGHT BAN ĐIỀU HÀNH AI — ${TODAY}`);
rule();

const probe = await probeInbox();
const st = updateState(probe.readable, probe.skipped);

line('\n① HỘP THƯ YÊU CẦU');
if (probe.skipped) {
  line('   (bỏ qua — chạy với --no-net)');
} else {
  for (const r of probe.results) line(`   ${String(r.status).padEnd(4)} ${r.path}`);
  line(`   AI_BOARD_KEY trong môi trường: ${probe.keyPresent ? 'CÓ' : 'CHƯA CÓ'}`);
  line(probe.readable
    ? `   ✅ ĐỌC ĐƯỢC — ${probe.items ? probe.items.length : '?'} yêu cầu.`
    : `   ❌ KHÔNG đọc được — ngày hỏng liên tiếp thứ ${st.consecutive_failures}` +
      (st.first_failure_date ? ` (từ ${st.first_failure_date})` : ''));
}

const tiers = [tier1Integrity(), tier2MissingWeek36(), tier3AnswerBias()];
line('\n② BẬC THANG VIỆC DỰ PHÒNG (chỉ dùng khi hộp thư chết)');
tiers.forEach((t, i) => {
  line(`   Bậc ${i + 1}: ${t.clean ? '✅ sạch' : `⚠️  ${t.count} mục`} — ${t.name}`);
});
const t2 = tiers[1], t3 = tiers[2];
if (!t2.clean) line(`            → ${t2.missing.join(', ')}`);
if (!t3.clean && t3.skewed?.length) {
  line(`            → nặng nhất: ${t3.skewed.slice(0, 5).map(s => `${s.subject} (${s.topShare}%)`).join(', ')}`);
  if (t3.anomalies) line(`            → ${t3.anomalies} câu dị dạng (không đủ 4 lựa chọn)`);
}

line('\n③ KẾT LUẬN — phiên hôm nay PHẢI làm gì');
rule();
if (probe.readable) {
  line('   ▶ Xử lý yêu cầu THẬT trong hộp thư. Bậc thang dự phòng KHÔNG dùng đến.');
} else {
  if (!probe.skipped && st.consecutive_failures >= ESCALATE_AFTER_DAYS) {
    line(`   ⚠️  LEO THANG (đã ${st.consecutive_failures} ngày ≥ ngưỡng ${ESCALATE_AFTER_DAYS}):`);
    line('      Việc ĐẦU TIÊN là gửi thông báo cho chủ sở hữu, nêu đúng 2 việc cần người bấm nút:');
    line('        (a) merge PR #97 — route đọc-chỉ /api/ai-board/inbox vào nhánh production');
    line('        (b) đặt AI_BOARD_KEY trên production rồi redeploy');
    line('      Hai việc này KHÔNG được tự làm: chúng đụng auth/routing nhánh production và secret.');
  }
  const next = tiers.find(t => !t.clean);
  if (next) {
    line(`   ▶ Làm bậc thấp nhất còn việc: ${next.name}`);
    line(`     Lệnh chứng minh trước-và-sau: ${next.cmd}`);
  } else {
    line('   ▶ CẢ BA BẬC ĐỀU SẠCH và hộp thư chết.');
    line('     ⇒ Ghi 1 dòng kết luận. KHÔNG tạo PR. KHÔNG bịa việc.');
    line('     ⇒ Báo cho chủ sở hữu rằng routine đã hết việc dự phòng đo được.');
  }
}
rule();
line('  Luật đầy đủ: ai-board/ROUTINE.md');
rule();
