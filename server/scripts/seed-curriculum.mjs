// ============================================================
// Seed curriculum_content từ scenario JS gốc → DB.
// ============================================================
// Đọc public/js/scenarios/index.js (ALL_SCENARIOS) — toàn bộ content K-12 + Dược
// hiện hardcode trong JS — và nạp vào bảng curriculum_content (source='seed').
//
// Idempotent: chạy lại ghi đè bản 'seed' cũ nhưng KHÔNG đè bản admin sửa tay.
//
// Dùng:
//   node server/scripts/seed-curriculum.mjs            # seed thật
//   node server/scripts/seed-curriculum.mjs --dry      # chỉ đếm, không ghi
//
// Trên prod (memory: mọi DB work trên prod):
//   docker exec <container> node server/scripts/seed-curriculum.mjs
// ============================================================

import { pathToFileURL } from 'node:url';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DRY = process.argv.includes('--dry');

// Nguồn content gốc: _all-content.js (aggregator data) — KHÔNG phải index.js
// (index.js giờ logic-only, ALL_SCENARIOS rỗng).
const scenariosUrl = pathToFileURL(resolve(__dirname, '../../public/js/scenarios/_all-content.js')).href;
const { ALL_SCENARIOS } = await import(scenariosUrl);

const all = Object.values(ALL_SCENARIOS).filter(s => s && s.id);
console.log(`[seed-curriculum] đọc ${all.length} scenario từ ALL_SCENARIOS`);

// thống kê nhanh
const withLesson = all.filter(s => s.lesson).length;
const withQ = all.filter(s => Array.isArray(s.questions) && s.questions.length).length;
console.log(`[seed-curriculum]   · có lesson: ${withLesson} · có questions[]: ${withQ}`);

if (DRY) {
  console.log('[seed-curriculum] --dry: không ghi DB. Thoát.');
  process.exit(0);
}

const { seedMany, curriculumCount } = await import('../contexts/curriculum/index.js');

// ⚠️ Sau khi cut-over Postgres, curriculumCount/seedMany đều async — phải await,
// nếu không process.exit(0) bên dưới sẽ cắt ngang transaction và seed hụt.
const before = await curriculumCount();
const n = await seedMany(all, 'seed');
const after = await curriculumCount();

console.log(`[seed-curriculum] đã upsert ${n} bản ghi (seed). active: ${before} → ${after}.`);
console.log('[seed-curriculum] xong.');
process.exit(0);
