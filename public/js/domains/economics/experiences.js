// ============================================================
// Economics domain — Experience registry
// ============================================================

/** @typedef {import('../../engine/types.js').ExperienceMode} ExperienceMode */

const PAGES = {
  scoreup: {
    mode: 'quiz', icon: '📝', label: 'ScoreUp', tech: 'Trắc nghiệm · Ngân hàng câu hỏi', url: 'apps.html?app=scoreup',
    desc: 'Mở ScoreUp — luyện & thi trắc nghiệm với câu hỏi thật, chấm điểm tức thì.',
    specs: ['ok:Câu hỏi thật', 'Đề thi', 'Gợi ý AI', 'bad:Cần ScoreUp chạy'],
  },
  smartdoc: {
    mode: 'meta', icon: '📚', label: 'Smartdoc', tech: 'Giáo trình tương tác', url: 'apps.html?app=smartdoc',
    desc: 'Mở Smartdoc — giáo trình & bài giảng web tương tác.',
    specs: ['ok:Word → web', 'Sách điện tử', 'Phòng học', 'bad:Cần Smartdoc chạy'],
  },
};

/** @type {Record<string, ExperienceMode[]>} */
const MODULE_PAGES = {
  // ── Năm 1 — Đại cương ──
  'E1.1': [PAGES.scoreup],   // Kinh tế Vi mô 1
  'E1.2': [PAGES.scoreup],   // Toán cho kinh tế
  'E1.3': [PAGES.scoreup],   // Nguyên lý kế toán
  'E1.4': [PAGES.scoreup],   // Pháp luật kinh tế
  'E1.5': [PAGES.scoreup],   // Tin học cho kinh tế
  // ── Năm 2 — Cơ sở ngành ──
  'E2.1': [PAGES.scoreup],   // Kinh tế Vĩ mô 1
  'E2.2': [PAGES.scoreup],   // Thống kê cho kinh tế
  'E2.3': [PAGES.scoreup],   // Tài chính – Tiền tệ
  'E2.4': [PAGES.scoreup],   // Quản trị học đại cương
  'E2.5': [PAGES.scoreup],   // Marketing căn bản
  // ── Năm 3 — Chuyên ngành ──
  'E3.1': [PAGES.scoreup],   // Kinh tế lượng
  'E3.2': [PAGES.scoreup],   // Tài chính doanh nghiệp
  'E3.3': [PAGES.scoreup],   // Kế toán quản trị
  'E3.4': [PAGES.scoreup],   // Phân tích tài chính
  'E3.5': [PAGES.scoreup],   // Marketing số + E-commerce
  'E3.6': [PAGES.scoreup],   // Quản trị chuỗi cung ứng
  'E3.7': [PAGES.scoreup],   // Kinh doanh quốc tế
  // ── Năm 4 — Tích hợp ──
  'E4.1': [PAGES.scoreup],   // Quản trị chiến lược
  'E4.2': [PAGES.scoreup],   // Khởi nghiệp – Lean canvas
  'E4.3': [PAGES.scoreup],   // Kiểm toán
  'E4.4': [PAGES.scoreup],   // Thuế Việt Nam
  'E4.5': [PAGES.scoreup],   // Đạo đức kinh doanh
  'E4.6': [PAGES.smartdoc],  // Khoá luận kinh tế — giáo trình
  // ── Practice ──
  'EP01': [PAGES.scoreup],   // Mô phỏng doanh nghiệp — Vận hành
  'EP02': [PAGES.scoreup],   // Mô phỏng TTCK — Stock sim
  'EP03': [PAGES.scoreup],   // Vườn ươm khởi nghiệp
  'EP04': [PAGES.scoreup],   // FinTech Lab — Mobile banking
  // ── Career ──
  'EC01': [PAGES.scoreup],   // Kế toán – Kiểm toán
  'EC02': [PAGES.scoreup],   // Tài chính – Ngân hàng
  'EC03': [PAGES.scoreup],   // Marketing & Brand manager
  'EC04': [PAGES.scoreup],   // Khởi nghiệp – Founder
  // ── Games ──
  'EG01': [PAGES.scoreup],   // Bull vs Bear — Stock race
  'EG02': [PAGES.scoreup],   // Pitch Battle — Demo Day
  'EG03': [PAGES.scoreup],   // Tycoon — Quản lý công ty
};

export function getExperiencesFor(moduleId) {
  return MODULE_PAGES[moduleId] || [];
}

export function listModulesWithExperiences() {
  return Object.keys(MODULE_PAGES);
}
