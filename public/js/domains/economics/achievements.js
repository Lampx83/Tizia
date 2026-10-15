// ============================================================
// Economics domain — Achievement catalog
// ============================================================

/** @type {import('../../engine/types.js').Achievement[]} */
export const ACHIEVEMENTS = [
  { id: 'first-trade',  icon: '📈', title: 'Lần đầu giao dịch',
    desc: 'Hoàn thành quiz đầu tiên',
    trigger: { quizzesPassed: 1 } },

  { id: 'double',       icon: '⚡', title: 'Cú đúp Kinh tế',
    desc: 'Hoàn thành 2 module trong cùng 1 ngày — năng suất nhà kinh tế',
    trigger: { modulesIn1Day: 2 } },

  { id: 'streak-3',     icon: '🌱', title: 'Học Kinh tế 3 ngày liên tiếp',
    desc: 'Streak 3 ngày — thói quen tích luỹ tri thức kinh tế hàng ngày',
    trigger: { streak: 3 } },

  { id: 'streak-5',     icon: '🔥', title: 'Cháy 5 ngày',
    desc: 'Streak 5 ngày liên tiếp',
    trigger: { streak: 5 } },

  { id: 'streak-7',     icon: '📅', title: 'Một tuần học kinh tế',
    desc: 'Streak 7 ngày liên tiếp — một tuần đầu tư vào tri thức kinh tế mỗi ngày',
    trigger: { streak: 7 } },

  { id: 'streak-14',    icon: '⚡', title: '2 tuần học kinh tế liên tục',
    desc: 'Streak 14 ngày liên tiếp — đầu tư vào bản thân mỗi ngày',
    trigger: { streak: 14 } },

  { id: 'streak-30',    icon: '🏆', title: '1 tháng học kinh tế',
    desc: 'Streak 30 ngày — kỷ luật học tập nền tảng của mọi nhà kinh tế',
    trigger: { streak: 30 } },

  { id: 'star-60',      icon: '💫', title: '60 sao Kinh tế',
    desc: 'Tích luỹ 60 sao — đã qua nửa hành trình Cử nhân Kinh tế',
    trigger: { totalStars: 60 } },

  { id: 'star-90',      icon: '🌠', title: '90 sao Kinh tế',
    desc: 'Tích luỹ 90 sao — sắp hoàn thành toàn bộ chương trình Kinh tế',
    trigger: { totalStars: 90 } },

  { id: 'star-120',     icon: '🏆', title: 'Cử nhân 120 sao',
    desc: 'Tích luỹ 120 sao — chinh phục toàn bộ 4 năm chương trình Cử nhân Kinh tế',
    trigger: { totalStars: 120 } },

  { id: 'bookworm',     icon: '📚', title: 'Mọt sách kinh tế',
    desc: '10 quiz hoàn thành',
    trigger: { quizzesPassed: 10 } },

  { id: 'thesis',       icon: '🎓', title: 'Khoá luận xuất sắc',
    desc: 'Pass khoá luận E4.6',
    trigger: { moduleStars: { 'E4.6': 2 } } },

  { id: 'star-30',      icon: '🌟', title: 'Sao đầu tiên',
    desc: '30 sao tích luỹ',
    trigger: { totalStars: 30 } },

  { id: 'all-year-1',   icon: '🥇', title: 'Tốt nghiệp Năm 1',
    desc: 'Hoàn thành mọi module Năm 1',
    trigger: { yearComplete: 1 } },

  { id: 'micro-star',   icon: '📉', title: 'Chuyên gia Vi mô',
    desc: 'Hoàn thành module Kinh tế Vi mô 1 (E1.1) với 3 sao',
    trigger: { moduleStars: { 'E1.1': 3 } } },

  { id: 'math-ace',     icon: '🔢', title: 'Toán tài ba',
    desc: 'Hoàn thành module Toán cho kinh tế (E1.2) với 3 sao',
    trigger: { moduleStars: { 'E1.2': 3 } } },

  { id: 'accounting-ace', icon: '📒', title: 'Kế toán xuất sắc',
    desc: 'Hoàn thành module Nguyên lý kế toán (E1.3) với 3 sao',
    trigger: { moduleStars: { 'E1.3': 3 } } },

  { id: 'law-aware',    icon: '⚖️', title: 'Hiểu luật kinh doanh',
    desc: 'Hoàn thành module Pháp luật kinh tế (E1.4) với 3 sao',
    trigger: { moduleStars: { 'E1.4': 3 } } },

  { id: 'tech-savvy',   icon: '💻', title: 'Công nghệ thành thạo',
    desc: 'Hoàn thành module Tin học cho kinh tế (E1.5) với 3 sao',
    trigger: { moduleStars: { 'E1.5': 3 } } },

  // ── Năm 2 ──────────────────────────────────────────────────
  { id: 'macro-master',    icon: '🏦', title: 'Macro Master',
    desc: 'Hoàn thành module Kinh tế Vĩ mô 1 (E2.1) với 3 sao',
    trigger: { moduleStars: { 'E2.1': 3 } } },

  { id: 'stats-pro',       icon: '📊', title: 'Chuyên gia Thống kê',
    desc: 'Hoàn thành module Thống kê cho kinh tế (E2.2) với 3 sao',
    trigger: { moduleStars: { 'E2.2': 3 } } },

  { id: 'finance-guru',    icon: '💰', title: 'Tài chính – Tiền tệ Pro',
    desc: 'Hoàn thành module Tài chính – Tiền tệ (E2.3) với 3 sao',
    trigger: { moduleStars: { 'E2.3': 3 } } },

  { id: 'mgmt-leader',     icon: '🧭', title: 'Nhà Quản trị Xuất sắc',
    desc: 'Hoàn thành module Quản trị học đại cương (E2.4) với 3 sao',
    trigger: { moduleStars: { 'E2.4': 3 } } },

  { id: 'marketing-star',  icon: '📣', title: 'Marketing Star',
    desc: 'Hoàn thành module Marketing căn bản (E2.5) với 3 sao',
    trigger: { moduleStars: { 'E2.5': 3 } } },

  { id: 'all-year-2-econ', icon: '🥈', title: 'Tốt nghiệp Năm 2 Kinh tế',
    desc: 'Hoàn thành toàn bộ module Năm 2 Kinh tế',
    trigger: { yearComplete: 2 } },

  // ── Năm 3 ──────────────────────────────────────────────────
  { id: 'econometrics-pro',  icon: '📐', title: 'Kinh tế lượng Pro',
    desc: 'Hoàn thành module Kinh tế lượng (E3.1) với 3 sao',
    trigger: { moduleStars: { 'E3.1': 3 } } },

  { id: 'corp-finance-star', icon: '💼', title: 'Tài chính doanh nghiệp',
    desc: 'Hoàn thành module Tài chính doanh nghiệp (E3.2) với 3 sao',
    trigger: { moduleStars: { 'E3.2': 3 } } },

  { id: 'mgmt-accounting',   icon: '📋', title: 'Kế toán quản trị Master',
    desc: 'Hoàn thành module Kế toán quản trị (E3.3) với 3 sao',
    trigger: { moduleStars: { 'E3.3': 3 } } },

  { id: 'financial-analyst', icon: '🔍', title: 'Nhà phân tích tài chính',
    desc: 'Hoàn thành module Phân tích tài chính (E3.4) với 3 sao',
    trigger: { moduleStars: { 'E3.4': 3 } } },

  { id: 'digital-marketer',  icon: '📲', title: 'Digital Marketer',
    desc: 'Hoàn thành module Marketing số & E-commerce (E3.5) với 3 sao',
    trigger: { moduleStars: { 'E3.5': 3 } } },

  { id: 'supply-chain-boss', icon: '🔗', title: 'Chuỗi cung ứng chuyên gia',
    desc: 'Hoàn thành module Quản trị chuỗi cung ứng (E3.6) với 3 sao',
    trigger: { moduleStars: { 'E3.6': 3 } } },

  { id: 'global-trader',     icon: '🌏', title: 'Nhà kinh doanh quốc tế',
    desc: 'Hoàn thành module Kinh doanh quốc tế (E3.7) với 3 sao',
    trigger: { moduleStars: { 'E3.7': 3 } } },

  { id: 'all-year-3-econ',   icon: '🎖️', title: 'Tốt nghiệp Năm 3 Kinh tế',
    desc: 'Hoàn thành toàn bộ module Năm 3 Kinh tế',
    trigger: { yearComplete: 3 } },

  // ── Năm 4 ──────────────────────────────────────────────────
  { id: 'strategist',        icon: '♟️', title: 'Chiến lược gia',
    desc: 'Hoàn thành module Quản trị chiến lược (E4.1) với 3 sao',
    trigger: { moduleStars: { 'E4.1': 3 } } },

  { id: 'lean-founder',      icon: '🌱', title: 'Lean Founder',
    desc: 'Hoàn thành module Khởi nghiệp – Lean Canvas (E4.2) với 3 sao',
    trigger: { moduleStars: { 'E4.2': 3 } } },

  { id: 'auditor-pro',       icon: '🔎', title: 'Kiểm toán viên xuất sắc',
    desc: 'Hoàn thành module Kiểm toán (E4.3) với 3 sao',
    trigger: { moduleStars: { 'E4.3': 3 } } },

  { id: 'tax-expert',        icon: '📑', title: 'Chuyên gia Thuế',
    desc: 'Hoàn thành module Thuế Việt Nam (E4.4) với 3 sao',
    trigger: { moduleStars: { 'E4.4': 3 } } },

  { id: 'ethics-champion',   icon: '⚖️', title: 'Nhà kinh doanh Chính trực',
    desc: 'Hoàn thành module Đạo đức kinh doanh (E4.5) với 3 sao',
    trigger: { moduleStars: { 'E4.5': 3 } } },

  { id: 'year4-econ-complete', icon: '🏅', title: 'Tốt nghiệp Năm 4 Kinh tế',
    desc: 'Hoàn thành toàn bộ module Năm 4 Kinh tế — kết thúc lộ trình Cử nhân Kinh tế',
    trigger: { yearComplete: 4 } },

  // ── Practice achievements ───────────────────────────────────
  { id: 'biz-ops-master',    icon: '🏢', title: 'Chuyên gia Vận hành Doanh nghiệp',
    desc: 'Hoàn thành mô phỏng doanh nghiệp (EP01) với 3 sao — thành thạo OEE, Lean, KPI',
    trigger: { moduleStars: { 'EP01': 3 } } },

  { id: 'stock-trader',      icon: '📈', title: 'Nhà giao dịch chứng khoán',
    desc: 'Chinh phục Stock Sim (EP02) với 3 sao — nắm vững MPT, RSI, CAPM, Short Selling',
    trigger: { moduleStars: { 'EP02': 3 } } },

  { id: 'startup-founder',   icon: '🌱', title: 'Startup Founder',
    desc: 'Tốt nghiệp Vườn ươm khởi nghiệp (EP03) với 3 sao — PMF, Lean Canvas, Fundraising',
    trigger: { moduleStars: { 'EP03': 3 } } },

  { id: 'fintech-expert',    icon: '💳', title: 'FinTech Expert',
    desc: 'Chinh phục FinTech Lab (EP04) với 3 sao — Open Banking, BNPL, KYC, Blockchain',
    trigger: { moduleStars: { 'EP04': 3 } } },

  { id: 'practice-champion', icon: '🏅', title: 'Practice Champion',
    desc: 'Hoàn thành cả 4 module thực hành (EP01 + EP02 + EP03 + EP04) với ít nhất 2 sao',
    trigger: { moduleStars: { 'EP01': 2, 'EP02': 2, 'EP03': 2, 'EP04': 2 } } },

  // ── Career achievements ─────────────────────────────────────
  { id: 'accounting-career',  icon: '📒', title: 'Nhà kế toán – kiểm toán',
    desc: 'Khám phá lộ trình nghề Kế toán – Kiểm toán (EC01) với 3 sao',
    trigger: { moduleStars: { 'EC01': 3 } } },

  { id: 'finance-career',     icon: '🏦', title: 'Chuyên gia Tài chính – Ngân hàng',
    desc: 'Khám phá lộ trình nghề Tài chính – Ngân hàng (EC02) với 3 sao',
    trigger: { moduleStars: { 'EC02': 3 } } },

  { id: 'marketing-career',   icon: '📣', title: 'Marketer & Brand Builder',
    desc: 'Khám phá lộ trình nghề Marketing & Brand manager (EC03) với 3 sao',
    trigger: { moduleStars: { 'EC03': 3 } } },

  { id: 'founder-career',     icon: '🚀', title: 'Founder tiềm năng',
    desc: 'Khám phá lộ trình Khởi nghiệp & Founder (EC04) với 3 sao',
    trigger: { moduleStars: { 'EC04': 3 } } },

  { id: 'career-explorer',    icon: '🧭', title: 'Nhà thám hiểm nghề nghiệp',
    desc: 'Hoàn thành cả 4 career path Kinh tế (EC01 + EC02 + EC03 + EC04)',
    trigger: { moduleStars: { 'EC01': 2, 'EC02': 2, 'EC03': 2, 'EC04': 2 } } },

  // ── Game achievements ───────────────────────────────────────
  { id: 'bull-bear-trader',  icon: '🐂', title: 'Bull & Bear Trader',
    desc: 'Chinh phục quiz thị trường chứng khoán (EG01) — biết mua bán đúng thời điểm',
    trigger: { moduleStars: { 'EG01': 3 } } },

  { id: 'pitch-master',      icon: '🎤', title: 'Pitch Master',
    desc: 'Chinh phục Pitch Battle (EG02) — thuyết phục được nhà đầu tư tại Demo Day',
    trigger: { moduleStars: { 'EG02': 3 } } },

  { id: 'tycoon-ceo',        icon: '🏭', title: 'Tycoon CEO',
    desc: 'Chinh phục quiz Quản lý công ty (EG03) — điều hành doanh nghiệp xuất sắc',
    trigger: { moduleStars: { 'EG03': 3 } } },

  { id: 'econ-game-master',  icon: '🏆', title: 'Kinh tế Game Master',
    desc: 'Hoàn thành cả 3 game Kinh tế (EG01 + EG02 + EG03) với 3 sao',
    trigger: { moduleStars: { 'EG01': 3, 'EG02': 3, 'EG03': 3 } } },
];
