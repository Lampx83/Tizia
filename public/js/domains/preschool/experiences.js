// ============================================================
// Trường Mầm non — Experience registry
// ============================================================
// Mapping moduleId → ExperienceMode[]. Mỗi entry là một "trò chơi trải nghiệm"
// standalone (đã có file HTML thật trong /public) gắn vào module phù hợp. Các
// trang này chơi được cả ở chế độ khách (guest), login thì đồng bộ sao/XP.
//
// index.js gọi getExperiencesFor(m.id) để bơm field `experiences[]` vào module;
// module.html/path-renderer render thành thẻ ở nhóm "Thực hành".
//
// LƯU Ý id module: Nhận thức là N1/N2/N3; các lĩnh vực khác là N1TC, N2NN…
// (không gạch nối — xem domains/preschool/modules.js).
// ============================================================

/** @typedef {import('../../engine/types.js').ExperienceMode} ExperienceMode */

/** Catalog game dùng chung — khai báo 1 lần, gắn nhiều module. */
const GAME = {
  'dem-ngon-tay': {
    mode: 'native', icon: '✋', label: 'Đếm ngón tay', tech: 'Tap · TTS · Big Bubble', url: 'dem-ngon-tay.html',
    desc: 'Nhìn bàn tay giơ mấy ngón rồi bấm đúng số (1–10). Có đọc to & pháo hoa khi đúng.',
    specs: ['ok:3–5 tuổi', 'Đọc to (TTS)', 'Không cần biết chữ'],
  },
  'dem-qua': {
    mode: 'native', icon: '🍎', label: 'Đếm quả trên cây', tech: 'Hái quả · SVG · Confetti', url: 'dem-qua.html',
    desc: 'Hái đúng số quả cô yêu cầu trên cây. Rèn đếm 1–10 bằng thao tác chạm.',
    specs: ['ok:3–5 tuổi', 'Đếm 1–10', 'Chạm trực quan'],
  },
  'bao-so-hoc': {
    mode: '2d', icon: '📦', label: 'Bão Số Học', tech: 'Canvas · phép tính rơi', url: 'bao-so-hoc.html',
    desc: 'Bắt đúng đáp án phép tính đơn giản trong "cơn bão số". Nhanh tay, nhanh mắt.',
    specs: ['ok:4–5 tuổi', 'Đếm & so sánh', 'Phản xạ'],
  },
  'ghep-chu-cai': {
    mode: 'native', icon: '🔤', label: 'Ghép chữ cái', tech: 'Tap · Bảng chữ cái · TTS', url: 'ghep-chu-cai.html',
    desc: 'Bấm đúng chữ cái cô đọc trong bảng chữ cái Tiếng Việt. Làm quen mặt chữ.',
    specs: ['ok:4–5 tuổi', 'Làm quen 29 chữ cái', 'Đọc to'],
  },
  'do-chu-ghep-van': {
    mode: 'native', icon: '📝', label: 'Ghép vần', tech: 'Ghép âm–vần · TTS', url: 'do-chu-ghep-van.html',
    desc: 'Ghép phụ âm với vần thành tiếng có nghĩa. Bước chuẩn bị đọc – viết vào lớp 1.',
    specs: ['ok:5 tuổi (Lá)', 'Ghép vần', 'Chuẩn bị vào lớp 1'],
  },
  'cay-tri-thuc': {
    mode: 'native', icon: '🌳', label: 'Cây Tri Thức', tech: 'Khám phá · sưu tầm', url: 'cay-tri-thuc.html',
    desc: 'Trả lời câu hỏi để cây lớn lên, nở hoa kết quả. Khơi gợi tò mò khám phá.',
    specs: ['ok:3–5 tuổi', 'Khám phá', 'Tích luỹ'],
  },
};

/** @type {Record<string, ExperienceMode[]>} */
const MODULE_PAGES = {
  // ── Lĩnh vực 2: Nhận thức (Toán) ──
  'N1': [GAME['dem-ngon-tay'], GAME['dem-qua'], GAME['cay-tri-thuc']],   // Mầm
  'N2': [GAME['dem-qua'], GAME['bao-so-hoc']],                            // Chồi
  'N3': [GAME['bao-so-hoc'], GAME['dem-qua']],                            // Lá
  // ── Lĩnh vực 3: Ngôn ngữ (làm quen chữ cái / ghép vần) ──
  'N2NN': [GAME['ghep-chu-cai']],                                         // Chồi
  'N3NN': [GAME['ghep-chu-cai'], GAME['do-chu-ghep-van']],               // Lá
};

export function getExperiencesFor(moduleId) { return MODULE_PAGES[moduleId] || []; }
export function listModulesWithExperiences() { return Object.keys(MODULE_PAGES); }
