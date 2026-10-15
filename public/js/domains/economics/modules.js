// ============================================================
// Economics domain — Module list (skeleton, 4 năm)
// ============================================================
// Lộ trình mô phỏng chương trình Cử nhân Kinh tế VN
// (NEU, Khoa Kinh tế, Foreign Trade…). Skeleton chỉ 14
// module curriculum + 6 practice/skill/career/game để demo
// multi-school. Quiz nội dung sẽ bổ sung dần (auto-stub).
// ============================================================

/** @type {import('../../engine/types.js').CourseModule[]} */
export const MODULES = [
  // ──────────── NĂM 1 — ĐẠI CƯƠNG ────────────
  { category: 'curriculum', id: 'E1.1', title: 'Kinh tế Vi mô 1',         yearLevel: 1, subject: 'kinh-te-vi-mo-1', scenarioIds: ['E1.1-micro-quiz'],       knowledgeQuiz: 'E1.1-micro-quiz',       minStarsToUnlock: 0 },
  { category: 'curriculum', id: 'E1.2', title: 'Toán cho kinh tế',         yearLevel: 1, subject: 'toan-kinh-te',    scenarioIds: ['E1.2-math-econ-quiz'],   knowledgeQuiz: 'E1.2-math-econ-quiz',   minStarsToUnlock: 0 },
  { category: 'curriculum', id: 'E1.3', title: 'Nguyên lý kế toán',        yearLevel: 1, subject: 'ke-toan',         scenarioIds: ['E1.3-accounting-quiz'], knowledgeQuiz: 'E1.3-accounting-quiz', minStarsToUnlock: 0 },
  { category: 'curriculum', id: 'E1.4', title: 'Pháp luật kinh tế',        yearLevel: 1, subject: 'phap-luat-kt',    scenarioIds: ['E1.4-bizlaw-quiz'],     knowledgeQuiz: 'E1.4-bizlaw-quiz',     minStarsToUnlock: 0 },
  { category: 'curriculum', id: 'E1.5', title: 'Tin học cho kinh tế',      yearLevel: 1, subject: 'tin-hoc-kt',      scenarioIds: ['E1.5-it-econ-quiz'],    knowledgeQuiz: 'E1.5-it-econ-quiz',    minStarsToUnlock: 0 },

  // ──────────── NĂM 2 — CƠ SỞ NGÀNH ────────────
  { category: 'curriculum', id: 'E2.1', title: 'Kinh tế Vĩ mô 1',          yearLevel: 2, subject: 'kinh-te-vi-mo-3', scenarioIds: ['E2.1-macro-quiz'],      knowledgeQuiz: 'E2.1-macro-quiz',      minStarsToUnlock: 5, prerequisites: ['E1.1'] },
  { category: 'curriculum', id: 'E2.2', title: 'Thống kê cho kinh tế',     yearLevel: 2, subject: 'thong-ke',        scenarioIds: ['E2.2-statistics-quiz'], knowledgeQuiz: 'E2.2-statistics-quiz', minStarsToUnlock: 5, prerequisites: ['E1.2'] },
  { category: 'curriculum', id: 'E2.3', title: 'Tài chính – Tiền tệ',      yearLevel: 2, subject: 'tai-chinh-tien-te', scenarioIds: ['E2.3-money-quiz'],    knowledgeQuiz: 'E2.3-money-quiz',      minStarsToUnlock: 5 },
  { category: 'curriculum', id: 'E2.4', title: 'Quản trị học đại cương',   yearLevel: 2, subject: 'quan-tri',        scenarioIds: ['E2.4-management-quiz'], knowledgeQuiz: 'E2.4-management-quiz', minStarsToUnlock: 5 },
  { category: 'curriculum', id: 'E2.5', title: 'Marketing căn bản',        yearLevel: 2, subject: 'marketing',       scenarioIds: ['E2.5-marketing-quiz'],  knowledgeQuiz: 'E2.5-marketing-quiz',  minStarsToUnlock: 5 },

  // ──────────── NĂM 3 — CHUYÊN NGÀNH ────────────
  { category: 'curriculum', id: 'E3.1', title: 'Kinh tế lượng',            yearLevel: 3, subject: 'kinh-te-luong',   scenarioIds: ['E3.1-econometrics-quiz'],       knowledgeQuiz: 'E3.1-econometrics-quiz',       minStarsToUnlock: 12, prerequisites: ['E2.2'] },
  { category: 'curriculum', id: 'E3.2', title: 'Tài chính doanh nghiệp',   yearLevel: 3, subject: 'tai-chinh-doanh-nghiep', scenarioIds: ['E3.2-corporate-finance-quiz'], knowledgeQuiz: 'E3.2-corporate-finance-quiz', minStarsToUnlock: 12, prerequisites: ['E2.3'] },
  { category: 'curriculum', id: 'E3.3', title: 'Kế toán quản trị',         yearLevel: 3, subject: 'ke-toan-quan-tri', scenarioIds: ['E3.3-management-accounting-quiz'], knowledgeQuiz: 'E3.3-management-accounting-quiz', minStarsToUnlock: 12, prerequisites: ['E1.3'] },
  { category: 'curriculum', id: 'E3.4', title: 'Phân tích tài chính',      yearLevel: 3, subject: 'phan-tich-tai-chinh', scenarioIds: ['E3.4-financial-analysis-quiz'], knowledgeQuiz: 'E3.4-financial-analysis-quiz', minStarsToUnlock: 12, prerequisites: ['E3.2'] },
  { category: 'curriculum', id: 'E3.5', title: 'Marketing số + E-commerce', yearLevel: 3, subject: 'thuong-mai-dt',   scenarioIds: ['E3.5-digital-marketing-quiz'],  knowledgeQuiz: 'E3.5-digital-marketing-quiz',  minStarsToUnlock: 12, prerequisites: ['E2.5'] },
  { category: 'curriculum', id: 'E3.6', title: 'Quản trị chuỗi cung ứng',  yearLevel: 3, subject: 'chuoi-cung-ung',  scenarioIds: ['E3.6-supply-chain-quiz'],       knowledgeQuiz: 'E3.6-supply-chain-quiz',       minStarsToUnlock: 12 },
  { category: 'curriculum', id: 'E3.7', title: 'Kinh doanh quốc tế',       yearLevel: 3, subject: 'kinh-doanh-quoc-te', scenarioIds: ['E3.7-international-business-quiz'], knowledgeQuiz: 'E3.7-international-business-quiz', minStarsToUnlock: 12 },

  // ──────────── NĂM 4 — TÍCH HỢP ────────────
  { category: 'curriculum', id: 'E4.1', title: 'Quản trị chiến lược',      yearLevel: 4, subject: 'quan-tri-chien-luoc', scenarioIds: ['E4.1-strategy-quiz'],           knowledgeQuiz: 'E4.1-strategy-quiz',           minStarsToUnlock: 20, prerequisites: ['E2.4'] },
  { category: 'curriculum', id: 'E4.2', title: 'Khởi nghiệp – Lean canvas', yearLevel: 4, subject: 'khoi-nghiep',     scenarioIds: ['E4.2-entrepreneurship-quiz'],   knowledgeQuiz: 'E4.2-entrepreneurship-quiz',   minStarsToUnlock: 20 },
  { category: 'curriculum', id: 'E4.3', title: 'Kiểm toán',                yearLevel: 4, subject: 'kiem-toan',       scenarioIds: ['E4.3-auditing-quiz'],           knowledgeQuiz: 'E4.3-auditing-quiz',           minStarsToUnlock: 20, prerequisites: ['E1.3'] },
  { category: 'curriculum', id: 'E4.4', title: 'Thuế Việt Nam',            yearLevel: 4, subject: 'thue',            scenarioIds: ['E4.4-tax-quiz'],                knowledgeQuiz: 'E4.4-tax-quiz',                minStarsToUnlock: 20 },
  { category: 'curriculum', id: 'E4.5', title: 'Đạo đức kinh doanh',       yearLevel: 4, subject: 'dao-duc-kd',      scenarioIds: ['E4.5-business-ethics-quiz'],    knowledgeQuiz: 'E4.5-business-ethics-quiz',    minStarsToUnlock: 20 },
  { category: 'curriculum', id: 'E4.6', title: 'Khoá luận kinh tế',        yearLevel: 4, subject: 'khoa-luan-kt',    scenarioIds: ['E4.6-capstone-quiz'],           knowledgeQuiz: 'E4.6-capstone-quiz',           minStarsToUnlock: 24, prerequisites: ['E3.1', 'E3.4'], hasCertificate: true },

  // ──────────── PRACTICE / SKILL ────────────
  { category: 'practice', id: 'EP01', title: 'Mô phỏng doanh nghiệp — Vận hành', subject: 'doanh-nghiep-ao', scenarioIds: ['EP01-biz-ops-quiz'],  knowledgeQuiz: 'EP01-biz-ops-quiz',  minStarsToUnlock: 18, icon: '🏢' },
  { category: 'practice', id: 'EP02', title: 'Mô phỏng TTCK — Stock sim',   subject: 'stock-sim',         scenarioIds: ['EP02-stock-sim-quiz'], knowledgeQuiz: 'EP02-stock-sim-quiz', minStarsToUnlock: 12, icon: '📈' },
  { category: 'practice', id: 'EP03', title: 'Vườn ươm khởi nghiệp',        subject: 'startup-incubator', scenarioIds: ['EP03-startup-quiz'],   knowledgeQuiz: 'EP03-startup-quiz',   minStarsToUnlock: 18, icon: '🌱' },
  { category: 'practice', id: 'EP04', title: 'FinTech Lab — Mobile banking', subject: 'fintech-lab',       scenarioIds: ['EP04-fintech-quiz'],   knowledgeQuiz: 'EP04-fintech-quiz',   minStarsToUnlock: 18, icon: '💳' },

  // ──────────── CAREER ────────────
  { category: 'career', id: 'EC01', title: 'Kế toán – Kiểm toán',          subject: 'career', scenarioIds: ['EC01-career-quiz'], knowledgeQuiz: 'EC01-career-quiz', minStarsToUnlock: 18, icon: '📒' },
  { category: 'career', id: 'EC02', title: 'Tài chính – Ngân hàng',         subject: 'career', scenarioIds: ['EC02-career-quiz'], knowledgeQuiz: 'EC02-career-quiz', minStarsToUnlock: 18, icon: '🏦' },
  { category: 'career', id: 'EC03', title: 'Marketing & Brand manager',     subject: 'career', scenarioIds: ['EC03-career-quiz'], knowledgeQuiz: 'EC03-career-quiz', minStarsToUnlock: 18, icon: '📣' },
  { category: 'career', id: 'EC04', title: 'Khởi nghiệp – Founder',         subject: 'career', scenarioIds: ['EC04-career-quiz'], knowledgeQuiz: 'EC04-career-quiz', minStarsToUnlock: 24, icon: '🚀' },

  // ──────────── GAMES ────────────
  { category: 'game', id: 'EG01', title: 'Bull vs Bear — Stock race',       subject: 'game', scenarioIds: ['EG01-bull-bear-quiz'],   knowledgeQuiz: 'EG01-bull-bear-quiz',   minStarsToUnlock: 6,  icon: '🐂' },
  { category: 'game', id: 'EG02', title: 'Pitch Battle — Demo Day',         subject: 'game', scenarioIds: ['EG02-pitch-battle-quiz'], knowledgeQuiz: 'EG02-pitch-battle-quiz', minStarsToUnlock: 12, icon: '🎤' },
  { category: 'game', id: 'EG03', title: 'Tycoon — Quản lý công ty',        subject: 'game', scenarioIds: ['EG03-tycoon-quiz'],       knowledgeQuiz: 'EG03-tycoon-quiz',       minStarsToUnlock: 12, icon: '🏭' },
];
