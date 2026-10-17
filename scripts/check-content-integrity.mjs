/**
 * check-content-integrity.mjs — Kiểm tra toàn vẹn học liệu EduVerse
 *
 * Chạy:  node scripts/check-content-integrity.mjs
 * Thoát mã 1 nếu phát hiện lỗi → dùng được trong CI / pre-commit.
 *
 * ── Vì sao cần script này ──
 * Bài lí thuyết được gắn vào quiz bằng cách tra CỨU THEO ID QUIZ:
 *     if (LOPnn_LESSONS[id]) sc.lesson = LOPnn_LESSONS[id];
 * Nghĩa là một bài lí thuyết có key KHÔNG khớp id quiz nào sẽ không bao giờ
 * được đọc — học sinh không thấy, nhưng file vẫn nằm trong repo và trông như
 * đã hoàn thành. Đây là lỗi im lặng, không gây crash, không bị `node --check`
 * bắt được. Phiên Ban điều hành AI 58 (2026-09-07) phát hiện 110 bài như vậy.
 *
 * ── Ba nhóm kiểm tra ──
 *   1. ORPHAN_LESSON     bài lí thuyết có key không khớp quiz nào  → nội dung chết
 *   2. UNIMPORTED_LESSON file lessons/*.js không được import vào _index.js
 *   3. DUP_ACHIEVEMENT   hai achievement trùng id trong cùng domain
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const SCENARIOS = path.join(ROOT, 'public', 'js', 'scenarios');
const DOMAINS = path.join(ROOT, 'public', 'js', 'domains');

/** @type {{kind:string, where:string, detail:string}[]} */
const problems = [];
const report = (kind, where, detail) => problems.push({ kind, where, detail });

const read = (f) => fs.readFileSync(f, 'utf8');
const isSubjectFile = (name) => name.endsWith('.js') && !name.startsWith('_');

/**
 * Trích tập id quiz mà một file scenario định nghĩa.
 * Hai nguồn:
 *   a) id literal viết thẳng:  'H10TOAN-w12-quiz'
 *   b) id sinh qua helper:     const M = (n,…) => W('H10TOAN', …)  +  M(12, …)
 */
function quizIdsOf(file) {
  const src = read(file);
  const ids = new Set();

  for (const m of src.matchAll(/['"`]([A-Za-z0-9]+-w\d{2}-quiz)['"`]/g)) ids.add(m[1]);

  const prefixMatch = src.match(/W\(\s*['"]([A-Za-z0-9]+)['"]/);
  if (prefixMatch) {
    const prefix = prefixMatch[1];
    for (const m of src.matchAll(/^\s*M\(\s*(\d+)\s*,/gm)) {
      ids.add(`${prefix}-w${String(m[1]).padStart(2, '0')}-quiz`);
    }
  }
  return ids;
}

/** Trích tập key mà một file lessons/*.js khai báo ('XXX-wNN-quiz': …). */
function lessonKeysOf(file) {
  const keys = new Set();
  for (const m of read(file).matchAll(/['"`]([A-Za-z0-9]+-w\d{2}-quiz)['"`]\s*:/g)) keys.add(m[1]);
  return keys;
}

// ── 1 + 2. Quét từng thư mục scenario có lessons/ ──────────────
for (const lop of fs.readdirSync(SCENARIOS).sort()) {
  const lopDir = path.join(SCENARIOS, lop);
  const lessonsDir = path.join(lopDir, 'lessons');
  if (!fs.statSync(lopDir).isDirectory() || !fs.existsSync(lessonsDir)) continue;

  // 2. File lesson không được import → nội dung chết theo cách khác
  const indexFile = path.join(lessonsDir, '_index.js');
  if (!fs.existsSync(indexFile)) {
    report('UNIMPORTED_LESSON', `${lop}/lessons`, 'thiếu _index.js — toàn bộ bài học không được nạp');
  } else {
    const indexSrc = read(indexFile);
    for (const name of fs.readdirSync(lessonsDir).filter(isSubjectFile)) {
      if (!indexSrc.includes(name)) {
        report('UNIMPORTED_LESSON', `${lop}/lessons/${name}`, 'không được import vào _index.js');
      }
    }
  }

  // 1. Bài lí thuyết mồ côi
  for (const name of fs.readdirSync(lopDir).filter(isSubjectFile)) {
    const lessonFile = path.join(lessonsDir, name);
    if (!fs.existsSync(lessonFile)) continue;

    const quizIds = quizIdsOf(path.join(lopDir, name));
    const orphans = [...lessonKeysOf(lessonFile)].filter((k) => !quizIds.has(k)).sort();
    if (orphans.length) {
      report(
        'ORPHAN_LESSON',
        `${lop}/lessons/${name}`,
        `${orphans.length} bài không khớp quiz nào: ${orphans.join(', ')}`,
      );
    }
  }
}

// ── 3. Achievement trùng id trong cùng domain ──────────────────
for (const domain of fs.readdirSync(DOMAINS).sort()) {
  const dir = path.join(DOMAINS, domain);
  if (!fs.statSync(dir).isDirectory()) continue;

  for (const name of ['achievements.js', 'index.js']) {
    const file = path.join(dir, name);
    if (!fs.existsSync(file)) continue;

    const seen = new Set();
    const dups = new Set();
    for (const m of read(file).matchAll(/\bid:\s*['"]([^'"]+)['"]/g)) {
      if (seen.has(m[1])) dups.add(m[1]);
      seen.add(m[1]);
    }
    if (dups.size) {
      report('DUP_ACHIEVEMENT', `domains/${domain}/${name}`, `id trùng: ${[...dups].join(', ')}`);
    }
  }
}

// ── Kết xuất ───────────────────────────────────────────────────
const LABEL = {
  ORPHAN_LESSON: 'Bài lí thuyết mồ côi (học sinh KHÔNG thấy)',
  UNIMPORTED_LESSON: 'File bài học không được import',
  DUP_ACHIEVEMENT: 'Achievement trùng id',
};

if (!problems.length) {
  console.log('✅ Toàn vẹn học liệu: không phát hiện vấn đề.');
  process.exit(0);
}

let orphanTotal = 0;
for (const kind of Object.keys(LABEL)) {
  const group = problems.filter((p) => p.kind === kind);
  if (!group.length) continue;
  console.log(`\n${LABEL[kind]} — ${group.length} file:`);
  for (const p of group) {
    console.log(`  ${p.where}\n      ${p.detail}`);
    if (kind === 'ORPHAN_LESSON') orphanTotal += Number(p.detail.match(/^(\d+)/)?.[1] ?? 0);
  }
}

console.log(`\n──────────────────────────────────────────────`);
console.log(`Tổng: ${problems.length} file có vấn đề.`);
if (orphanTotal) console.log(`Trong đó ${orphanTotal} bài lí thuyết đang là nội dung chết.`);
process.exit(1);
