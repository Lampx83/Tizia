// ============================================================
// Seed content_datasets từ các file data gốc → DB.
// ============================================================
// Data heterogeneous (nhân vật LS, ca lâm sàng, thuốc, 34 tỉnh/thành…) hardcode trong
// các file _data/*.js (hoặc trích từ HTML). Script này nạp vào content_datasets.
//
// Idempotent — không đè bản source='admin'.
//
// Dùng:  node server/scripts/seed-content.mjs [--dry] [--only=a,b] [--force]
// Prod:  docker exec tizia node server/scripts/seed-content.mjs --only=vocab-en
//
// --only: chỉ seed các collection nêu tên. Chạy KHÔNG --only là seed lại TẤT CẢ,
// mà pruneSeed sẽ bật/tắt active theo file gốc → collection nào đã chỉnh tay trên
// prod (vd driving-600) có thể đổi số item. Vá 1 collection thì luôn dùng --only.
// ============================================================

import { pathToFileURL } from 'node:url';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DRY = process.argv.includes('--dry');
// 🪤 02/08: upsert bản seed CÓ ĐIỀU KIỆN `source <> 'admin'` — item nào đã sửa qua
// trang admin sẽ bị seed BỎ QUA IM LẶNG (script vẫn in "✓ N item" như thường, rất dễ
// tưởng đã cập nhật). Muốn đẩy nội dung mới đè lên bản admin thì chạy kèm --force:
// ghi bằng đường admin nên vẫn giữ quyền sở hữu 'admin' cho các lần seed sau.
const FORCE = process.argv.includes('--force');
const ONLY = (process.argv.find((a) => a.startsWith('--only=')) || '').slice(7)
  .split(',').map((s) => s.trim()).filter(Boolean);
const dataUrl = (p) => pathToFileURL(resolve(__dirname, '../../public/js/scenarios/_data', p)).href;

// collection → { file, export } : tên file trong _data/ + tên export mảng data.
// file: đường dẫn từ _data/ (dùng '../x.js' để đọc file gốc còn vai seed khác).
// wrap: data là 1 object (không phải mảng) → bọc thành 1 item.
// key: tên field dùng làm item_key (mặc định item.id, không có thì lấy chỉ số).
const REGISTRY = [
  { collection: 'history-characters', file: 'history-characters.js', export: 'HISTORY_CHARACTERS' },
  { collection: 'patient-cases',      file: 'patient-cases.js',      export: 'PATIENT_CASES' },
  { collection: 'math2-topics',       file: 'math2-fun.js',          export: 'MATH2_TOPICS' },
  { collection: 'math6-topics',       file: 'math6-quest.js',        export: 'MATH6_TOPICS' },
  { collection: 'negotiation',        file: 'negotiation.js',        export: 'NEGOTIATION_SCENARIOS' },
  { collection: 'osce-exam',          file: 'year5.js',              export: 'L57_OSCE_EXAM', wrap: true },
  // math6-chapters: đọc file gốc (vẫn là seed cho _all-content qua side-effect).
  { collection: 'math6-chapters',     file: '../secondary-math6-lessons.js', export: 'MATH6_CHAPTERS' },
  { collection: 'drug-catalog',       file: 'pharmacy-drugs.js',     export: 'ALL_DRUGS' },
  // lab-recipes: file gốc (vẫn seed cho bao-che-labs → _all-content). REAGENTS
  // là object map → wrap 1 doc.
  { collection: 'lab-recipes',        file: '../../lab-recipes.js',     export: 'RECIPES' },
  { collection: 'lab-reagents',       file: '../../lab-recipes.js',     export: 'REAGENTS', wrap: true },
  // baoche-lessons: 12 bài Thực hành Bào chế theo giáo trình DUOC 04 (schema v2).
  { collection: 'baoche-lessons',     file: '../../baoche-curriculum.js', export: 'BAOCHE_LESSONS' },
  { collection: 'provinces',          file: 'provinces.js',          export: 'PROVINCES' },
  { collection: 'pronunciation',      file: 'pronunciation.js',      export: 'SENTENCES', wrap: true },
  { collection: 'pet-quiz-banks',    file: 'pet-quiz-banks.js',    export: 'QUIZ_BANKS', wrap: true },
  { collection: 'lop2-anh-memory',   file: 'lop2-anh-memory.js',   export: 'POOL' },
  { collection: 'lop2-ghep-van',     file: 'lop2-ghep-van.js',     export: 'ROUNDS' },
  { collection: 'space-sets',        file: 'space-sets.js',        export: 'SPACE_SETS_ITEMS' },
  { collection: 'driving-600',        file: 'driving-bank.js',        export: 'ITEMS' },
  { collection: 'exam-sets',          file: 'exam-sets.js',          export: 'EXAM_SETS' },
  // 2026-08-15: danh mục tra cứu biển báo GPLX (235 biển: cấm/hiệu lệnh/chỉ dẫn/phụ,
  // nhóm cấm có mức phạt NĐ 168/2024) — bổ sung cho /luat-giao-thong-600, KHÔNG trùng
  // collection 'traffic-signs' (21 biển SVG minh hoạ cho khối tiểu học).
  { collection: 'gplx-bien-bao',      file: 'gplx-bien-bao-catalog.js', export: 'GPLX_BIEN_BAO_CATALOG' },
  // 2026-07-05: content còn hardcode khi migrate Next → đưa vào DB.
  { collection: 'traffic-signs',      file: 'bien-bao-giao-thong.js', export: 'TRAFFIC_SIGNS' },
  { collection: 'code-quest-levels',  file: 'code-quest.js',          export: 'CODE_QUEST_LEVELS' },
  { collection: 'lop2-dao-duc',       file: 'lop2-dao-duc.js',        export: 'POOL' },
  // 2026-07-16: từ vựng trường Ngoại ngữ — trước kẹt trong inline script của
  // trang HTML cũ, trang Next scrape lại nên vỡ khi .html bị 308 → nay vào DB.
  { collection: 'vocab-en',           file: 'vocab-en.js',            export: 'VOCAB_EN_TOPICS', key: 'topic' },
  // Chương trình đào tạo Cử nhân CNTT 4 năm (req #107) — trang /it-curriculum.html.
  { collection: 'it-program',         file: 'it-program.js',          export: 'IT_PROGRAM',     key: 'key' },
  // Đọc hiểu tiếng Anh chuyên ngành (req #82 SV Duc anh) — trang doc-hieu-tieng-anh.html.
  { collection: 'reading-en',         file: 'reading-en.js',          export: 'READING_EN', key: 'id' },
];

const { seedCollection, collectionCount, upsertItem } = DRY ? {} : await import('../contexts/content/index.js');

// Ghi đè cả bản source='admin'. GIỮ NGUYÊN source cũ của từng item: hàng nào vốn là
// 'seed' thì vẫn là 'seed' (để seed thường sau này tiếp tục cập nhật được), hàng nào
// đang là 'admin' thì giữ 'admin' (trang admin vẫn là chủ sở hữu).
async function forceSeed(collection, items, keyFn) {
  const { db } = await import('../db.js');
  const rows = await db.prepare(
    `SELECT item_key, source FROM content_datasets WHERE collection = ?`
  ).all(collection);
  const srcOf = new Map(rows.map((r) => [String(r.item_key), r.source]));
  for (let i = 0; i < items.length; i++) {
    const key = String(keyFn ? keyFn(items[i], i) : (items[i]?.id ?? String(i)));
    await upsertItem(collection, key, items[i], { source: srcOf.get(key) || 'seed', ord: i });
  }
  return items.length;
}

let grand = 0;
for (const r of REGISTRY) {
  if (ONLY.length && !ONLY.includes(r.collection)) continue;
  let arr = [];
  try {
    const mod = await import(dataUrl(r.file));
    const data = mod[r.export];
    arr = r.wrap ? (data ? [data] : []) : (data || []);
  } catch (e) {
    console.log(`[seed-content] ✗ ${r.collection}: không đọc được ${r.file} (${e.message.slice(0,60)})`);
    continue;
  }
  if (!Array.isArray(arr) || !arr.length) {
    console.log(`[seed-content] ✗ ${r.collection}: export ${r.export} rỗng/không phải mảng`);
    continue;
  }
  if (DRY) {
    console.log(`[seed-content] (dry) ${r.collection}: ${arr.length} item`);
    grand += arr.length;
    continue;
  }
  const keyFn = r.key ? ((it, i) => it[r.key] ?? i) : undefined;
  const n = FORCE
    ? await forceSeed(r.collection, arr, keyFn)
    : await seedCollection(r.collection, arr, keyFn);
  console.log(`[seed-content] ✓ ${r.collection}: ${n} item${FORCE ? ' (--force: ĐÈ cả bản admin)' : ''} (DB có ${await collectionCount(r.collection)})`);
  grand += n;
}
console.log(`[seed-content] tổng ${grand} item.`);
process.exit(0);
