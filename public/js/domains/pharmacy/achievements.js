// ============================================================
// Pharmacy domain — Achievement catalog
// ============================================================
// 12 achievement đầu tiên. Cấu trúc trigger được kiểm bởi
// engine/wallet.js · checkAchievements().
//
// Thêm achievement mới: chỉ cần push. Engine sẽ auto-pick up.
// ============================================================

/** @type {import('../../engine/types.js').Achievement[]} */
export const ACHIEVEMENTS = [
  { id: 'first-step',  icon: '👶', title: 'Bước đầu',
    desc: 'Hoàn thành quiz đầu tiên',
    trigger: { quizzesPassed: 1 } },

  { id: 'double',      icon: '⚡', title: 'Cú đúp',
    desc: 'Hoàn thành 2 module trong cùng 1 ngày',
    trigger: { modulesIn1Day: 2 } },

  { id: 'bookworm',    icon: '📚', title: 'Mọt sách',
    desc: '10 quiz hoàn thành',
    trigger: { quizzesPassed: 10 } },

  { id: 'streak-3',    icon: '🌱', title: 'Học đều 3 ngày',
    desc: 'Học liên tiếp 3 ngày — bước khởi đầu của thói quen',
    trigger: { streak: 3 } },

  { id: 'streak-5',    icon: '🔥', title: 'Cháy 5 ngày',
    desc: 'Streak 5 ngày liên tiếp',
    trigger: { streak: 5 } },

  { id: 'streak-7',    icon: '📅', title: 'Một tuần kiên trì',
    desc: 'Học đều đặn suốt một tuần — thói quen đang hình thành',
    trigger: { streak: 7 } },

  { id: 'streak-14',   icon: '⚡', title: '2 tuần không gián đoạn',
    desc: 'Streak 14 ngày — cam kết học nghiêm túc',
    trigger: { streak: 14 } },

  { id: 'streak-30',   icon: '🏆', title: 'Vua streak',
    desc: 'Streak 30 ngày liên tiếp — không nghỉ học',
    trigger: { streak: 30 } },

  { id: 'star-30',     icon: '🌟', title: 'Sao tay',
    desc: 'Đạt 30 sao tích luỹ',
    trigger: { totalStars: 30 } },

  { id: 'star-60',     icon: '💫', title: 'Sao bạch kim',
    desc: 'Đạt 60 sao — đã chinh phục hơn nửa hành trình Dược',
    trigger: { totalStars: 60 } },

  { id: 'star-100',    icon: '✨', title: 'Sao bạc',
    desc: 'Đạt 100 sao — gần như nửa hành trình',
    trigger: { totalStars: 100 } },

  { id: 'star-120',    icon: '🌠', title: 'Dược sĩ 120 sao',
    desc: 'Đạt 120 sao — ngang tầm cử nhân đại học 4 năm, sẵn sàng chuyên sâu lâm sàng',
    trigger: { totalStars: 120 } },

  { id: 'star-150',    icon: '🏆', title: 'Dược sĩ tinh hoa',
    desc: 'Đạt 150 sao — chinh phục đỉnh cao 5 năm học Dược, xứng danh dược sĩ ưu tú',
    trigger: { totalStars: 150 } },

  { id: 'compounder',  icon: '🧪', title: 'Bào chế gia',
    desc: 'Pass L3.6 (Bào chế) với 3 sao',
    trigger: { moduleStars: { 'L3.6': 3 } } },

  { id: 'osce-pass',   icon: '🎯', title: 'OSCE warrior',
    desc: 'Pass OSCE 10 trạm',
    trigger: { moduleStars: { 'L5.7': 2 } } },

  { id: 'vr-explorer', icon: '🥽', title: 'Người tiên phong VR',
    desc: 'Thử 3 phiên bản VR / XR khác nhau',
    trigger: { vrSessions: 3 } },

  { id: 'social',      icon: '🌐', title: 'Bạn cùng phòng',
    desc: 'Vào Metaverse multiplayer',
    trigger: { metaverseVisit: 1 } },

  { id: 'all-year-1',  icon: '🎓', title: 'Tốt nghiệp Năm 1',
    desc: 'Hoàn thành mọi module Năm 1',
    trigger: { yearComplete: 1 } },

  { id: 'all-year-2',  icon: '⚗️', title: 'Tốt nghiệp Năm 2',
    desc: 'Hoàn thành mọi module Năm 2 — nắm vững phân tích & dược liệu',
    trigger: { yearComplete: 2 } },

  { id: 'all-year-3',  icon: '💊', title: 'Tốt nghiệp Năm 3',
    desc: 'Hoàn thành mọi module Năm 3 — thành thạo dược lý & bào chế',
    trigger: { yearComplete: 3 } },

  { id: 'all-year-4',  icon: '🏥', title: 'Tốt nghiệp Năm 4',
    desc: 'Hoàn thành mọi module Năm 4 — sẵn sàng thực hành lâm sàng',
    trigger: { yearComplete: 4 } },

  { id: 'all-year-5',  icon: '🏅', title: 'Dược sĩ tốt nghiệp',
    desc: 'Hoàn thành toàn bộ 5 năm — sẵn sàng hành nghề Dược',
    trigger: { yearComplete: 5 } },

  // ── L5.1 — Dược lâm sàng đa khoa ──
  { id: 'clinical-generalist', icon: '🩺', title: 'Dược sĩ lâm sàng đa khoa',
    desc: 'Hoàn thành L5.1 — thành thạo viết SOAP đa chuyên khoa',
    trigger: { moduleStars: { 'L5.1': 2 } } },

  // ── Thư viện & Nghiên cứu (LR03–LR10) ──
  { id: 'qual-researcher',   icon: '🗣️', title: 'Nhà NC định tính',
    desc: 'Hoàn thành LR03 — NC định tính, phỏng vấn sâu, FG',
    trigger: { moduleStars: { 'LR03': 3 } } },

  { id: 'rct-master',        icon: '📈', title: 'RCT Master',
    desc: 'Hoàn thành LR04 — NC định lượng, RCT, Cohort, Case-control',
    trigger: { moduleStars: { 'LR04': 3 } } },

  { id: 'sr-expert',         icon: '🔍', title: 'Systematic Review Expert',
    desc: 'Hoàn thành LR05 — Systematic Review + Meta-analysis PRISMA',
    trigger: { moduleStars: { 'LR05': 3 } } },

  { id: 'thesis-writer',     icon: '✏️', title: 'Nhà khoa học trẻ',
    desc: 'Hoàn thành LR06 — Viết khoá luận tốt nghiệp',
    trigger: { moduleStars: { 'LR06': 3 } } },

  { id: 'publisher',         icon: '📤', title: 'Nhà xuất bản khoa học',
    desc: 'Hoàn thành LR07 — Submit paper khoa học quốc tế',
    trigger: { moduleStars: { 'LR07': 3 } } },

  { id: 'drug-info-pro',     icon: '🔎', title: 'Drug Information Pro',
    desc: 'Hoàn thành LR08 — Tra cứu thuốc Lexicomp/UpToDate',
    trigger: { moduleStars: { 'LR08': 3 } } },

  { id: 'ebm-champion',      icon: '🎯', title: 'EBM Champion',
    desc: 'Hoàn thành LR09 — Evidence-based Medicine',
    trigger: { moduleStars: { 'LR09': 3 } } },

  { id: 'pharmacoecon-pro',  icon: '💵', title: 'Pharmacoeconomics Pro',
    desc: 'Hoàn thành LR10 — Pharmacoeconomics, ICER, QALY',
    trigger: { moduleStars: { 'LR10': 3 } } },

  // ── Career Paths (CP01-07) ──
  { id: 'hospital-pharmacist', icon: '🏥', title: 'Dược sĩ BV tương lai',
    desc: 'Hoàn thành CP01 — Sự nghiệp Dược lâm sàng bệnh viện',
    trigger: { moduleStars: { 'CP01': 2 } } },

  { id: 'community-pharmacist', icon: '🏪', title: 'Chủ nhà thuốc',
    desc: 'Hoàn thành CP02 — Sự nghiệp Nhà thuốc cộng đồng GPP',
    trigger: { moduleStars: { 'CP02': 2 } } },

  { id: 'industry-pro',      icon: '🏭', title: 'Dược công nghiệp',
    desc: 'Hoàn thành CP03 — Sự nghiệp Công nghiệp dược GMP',
    trigger: { moduleStars: { 'CP03': 2 } } },

  { id: 'pv-officer',        icon: '⚠️', title: 'Cảnh giác dược viên',
    desc: 'Hoàn thành CP06 — Pharmacovigilance, báo cáo ADR',
    trigger: { moduleStars: { 'CP06': 2 } } },

  { id: 'regulatory-expert', icon: '📑', title: 'Regulatory Affairs Expert',
    desc: 'Hoàn thành CP07 — Regulatory Affairs, đăng ký thuốc DAV/EMA',
    trigger: { moduleStars: { 'CP07': 2 } } },

  // ── Games (GC03, GC05) ──
  { id: 'interaction-racer', icon: '🔗', title: 'Tương tác tốc độ',
    desc: 'Hoàn thành GC03 — Drug Interaction Speed Challenge',
    trigger: { moduleStars: { 'GC03': 3 } } },

  { id: 'calculator-champ',  icon: '🧮', title: 'Calculator Champion',
    desc: 'Hoàn thành GC05 — Calculator Championship liều dùng',
    trigger: { moduleStars: { 'GC05': 3 } } },

  // ── Practice Sites — Bệnh viện mô phỏng (PS01–PS09, PS15) ──
  { id: 'er-pharmacist',       icon: '🚑', title: 'Dược sĩ Cấp cứu',
    desc: 'Hoàn thành PS01 — Quyết định dược lâm sàng phòng cấp cứu',
    trigger: { moduleStars: { 'PS01': 2 } } },

  { id: 'icu-pharmacist',      icon: '🫁', title: 'Dược sĩ ICU',
    desc: 'Hoàn thành PS02 — Dược lâm sàng hồi sức tích cực, vasopressor & an thần',
    trigger: { moduleStars: { 'PS02': 2 } } },

  { id: 'internal-pharmacist', icon: '🫀', title: 'Dược sĩ Nội khoa',
    desc: 'Hoàn thành PS03 — Dược lâm sàng Tim mạch & Nội khoa',
    trigger: { moduleStars: { 'PS03': 2 } } },

  { id: 'surgical-pharmacist', icon: '✂️', title: 'Dược sĩ Ngoại khoa',
    desc: 'Hoàn thành PS04 — Dược lâm sàng perioperative, kháng sinh dự phòng',
    trigger: { moduleStars: { 'PS04': 2 } } },

  { id: 'peds-pharmacist',     icon: '🍼', title: 'Dược sĩ Nhi khoa',
    desc: 'Hoàn thành PS05 — Dược lâm sàng Khoa Nhi, tính liều nhi',
    trigger: { moduleStars: { 'PS05': 2 } } },

  { id: 'obgyn-pharmacist',    icon: '🤱', title: 'Dược sĩ Sản phụ khoa',
    desc: 'Hoàn thành PS06 — Dược lâm sàng thai kỳ & phụ khoa',
    trigger: { moduleStars: { 'PS06': 2 } } },

  { id: 'onco-pharmacist',     icon: '🎀', title: 'Dược sĩ Ung bướu',
    desc: 'Hoàn thành PS07 — Dược lâm sàng Ung bướu & hoá trị liệu',
    trigger: { moduleStars: { 'PS07': 2 } } },

  { id: 'psych-pharmacist',    icon: '💭', title: 'Dược sĩ Tâm thần',
    desc: 'Hoàn thành PS08 — Dược lâm sàng tâm thần, antipsychotic & SSRI',
    trigger: { moduleStars: { 'PS08': 2 } } },

  { id: 'infectious-pharmacist', icon: '🦠', title: 'Dược sĩ Truyền nhiễm',
    desc: 'Hoàn thành PS09 — Dược lâm sàng HIV, Lao & Truyền nhiễm',
    trigger: { moduleStars: { 'PS09': 2 } } },

  { id: 'gmp-pharmacist',      icon: '🔩', title: 'GMP Pharmacist',
    desc: 'Hoàn thành PS15 — Nhà máy GMP, nắm vững quy trình sản xuất đạt chuẩn',
    trigger: { moduleStars: { 'PS15': 2 } } },

  // ── Skill Centers (SC03–SC08, SC11, SC13–SC15) ──
  { id: 'comm-specialist',   icon: '💬', title: 'Chuyên gia Giao tiếp',
    desc: 'Hoàn thành SC03 — Kỹ năng giao tiếp, teach-back & health literacy',
    trigger: { moduleStars: { 'SC03': 3 } } },

  { id: 'cultural-liaison',  icon: '🌍', title: 'Cầu nối Đa văn hoá',
    desc: 'Hoàn thành SC04 — Tư vấn đa văn hoá, tránh rào cản ngôn ngữ',
    trigger: { moduleStars: { 'SC04': 3 } } },

  { id: 'lifesaver',         icon: '💓', title: 'Người cứu sống',
    desc: 'Hoàn thành SC05 — CPR & AED, sơ cứu ngưng tim tại nhà thuốc',
    trigger: { moduleStars: { 'SC05': 3 } } },

  { id: 'vaccine-counselor', icon: '🧬', title: 'Chuyên gia Tiêm chủng',
    desc: 'Hoàn thành SC06 — Tư vấn vaccine, lịch tiêm & phản ứng sau tiêm',
    trigger: { moduleStars: { 'SC06': 3 } } },

  { id: 'poc-master',        icon: '📊', title: 'POC Master',
    desc: 'Hoàn thành SC07 — Đo HA, đường huyết tại điểm chăm sóc',
    trigger: { moduleStars: { 'SC07': 3 } } },

  { id: 'cessation-hero',    icon: '🚭', title: 'Anh hùng cai thuốc',
    desc: 'Hoàn thành SC08 — Tư vấn cai thuốc lá, NRT & varenicline',
    trigger: { moduleStars: { 'SC08': 3 } } },

  { id: 'travel-pharmacist', icon: '✈️', title: 'Dược sĩ Du lịch',
    desc: 'Hoàn thành SC11 — Tư vấn vaccine & thuốc cho người đi du lịch',
    trigger: { moduleStars: { 'SC11': 3 } } },

  { id: 'hiv-counselor',     icon: '❤️‍🩹', title: 'Chuyên gia HIV/STI',
    desc: 'Hoàn thành SC13 — Tư vấn HIV/STI, PrEP, giảm kỳ thị',
    trigger: { moduleStars: { 'SC13': 3 } } },

  { id: 'pain-specialist',   icon: '🩹', title: 'Chuyên gia Quản lý Đau',
    desc: 'Hoàn thành SC14 — Quản lý đau cấp & mạn, thang đau WHO',
    trigger: { moduleStars: { 'SC14': 3 } } },

  { id: 'mtm-specialist',    icon: '🗂️', title: 'MTM Specialist',
    desc: 'Hoàn thành SC15 — Medication Therapy Management toàn diện',
    trigger: { moduleStars: { 'SC15': 3 } } },

  // ── Nhà thuốc cộng đồng mở rộng (PS12–PS14) ──
  { id: 'night-pharmacist',  icon: '🌙', title: 'Dược sĩ Trực đêm',
    desc: 'Hoàn thành PS12 — Nhà thuốc 24/7, xử lý cấp cứu OTC ban đêm',
    trigger: { moduleStars: { 'PS12': 2 } } },

  { id: 'campus-pharmacist', icon: '🎓', title: 'Dược sĩ Đại học',
    desc: 'Hoàn thành PS13 — Nhà thuốc đại học, tư vấn sức khoẻ sinh viên',
    trigger: { moduleStars: { 'PS13': 2 } } },

  { id: 'outpatient-expert', icon: '🏥', title: 'Chuyên gia Ngoại trú',
    desc: 'Hoàn thành PS14 — Nhà thuốc BV Ngoại trú, tư vấn ra viện & polypharmacy',
    trigger: { moduleStars: { 'PS14': 2 } } },

  // ── Kỹ năng tư vấn đặc biệt (SC09, SC10, SC12) ──
  { id: 'weight-counselor',  icon: '⚖️', title: 'Chuyên gia Cân nặng',
    desc: 'Hoàn thành SC09 — Tư vấn giảm cân & béo phì, dược lý chống béo phì',
    trigger: { moduleStars: { 'SC09': 3 } } },

  { id: 'nutrition-expert',  icon: '🥗', title: 'Chuyên gia Dinh dưỡng',
    desc: 'Hoàn thành SC10 — Tư vấn dinh dưỡng đặc biệt: CKD, xơ gan, ung thư',
    trigger: { moduleStars: { 'SC10': 3 } } },

  { id: 'family-planner',    icon: '🌹', title: 'Chuyên gia Kế hoạch hoá',
    desc: 'Hoàn thành SC12 — Tư vấn tránh thai toàn diện, WHO MEC & tương tác thuốc',
    trigger: { moduleStars: { 'SC12': 3 } } },

  // ── Công nghiệp dược (PS17–PS20) ──
  { id: 'qa-auditor',        icon: '📋', title: 'QA Auditor',
    desc: 'Hoàn thành PS17 — Phòng QA: audit GMP, SOP, CAPA & data integrity',
    trigger: { moduleStars: { 'PS17': 2 } } },

  { id: 'regulatory-specialist', icon: '📑', title: 'Chuyên gia Đăng ký Thuốc',
    desc: 'Hoàn thành PS18 — Đăng ký thuốc: CTD dossier, BE, stability & variations',
    trigger: { moduleStars: { 'PS18': 2 } } },

  { id: 'tender-expert',     icon: '💰', title: 'Chuyên gia Đấu thầu BV',
    desc: 'Hoàn thành PS19 — Đấu thầu bệnh viện: hồ sơ mời thầu & phân nhóm kỹ thuật',
    trigger: { moduleStars: { 'PS19': 2 } } },

  { id: 'pharmacovigilance-officer', icon: '⚠️', title: 'PV Officer',
    desc: 'Hoàn thành PS20 — Pharmacovigilance: báo cáo ADR, causality & signal detection',
    trigger: { moduleStars: { 'PS20': 3 } } },

  // ── Thư viện & Games mới (LR01, GC04, GC06) ──
  { id: 'library-explorer',  icon: '🔍', title: 'Nhà thám hiểm Thư viện',
    desc: 'Hoàn thành LR01 — Thư viện điện tử: PubMed, MeSH, UpToDate & nguồn DI',
    trigger: { moduleStars: { 'LR01': 2 } } },

  { id: 'otc-speedster',     icon: '⚡', title: 'OTC Speed Counsellor',
    desc: 'Hoàn thành GC04 — OTC Consultation Speed: tư vấn nhà thuốc nhanh & chính xác',
    trigger: { moduleStars: { 'GC04': 3 } } },

  { id: 'herb-master',       icon: '🌿', title: 'Herb Master',
    desc: 'Hoàn thành GC06 — Herb ID Race: nhận dạng dược liệu Việt Nam',
    trigger: { moduleStars: { 'GC06': 3 } } },

  // ── Thư viện nâng cao & Career mới (LR11, LR12, CP04, CP05, CP08) ──
  { id: 'ai-pharmacist',     icon: '🤖', title: 'AI Pharmacist',
    desc: 'Hoàn thành LR11 — AI/ML trong Dược: machine learning, NLP, precision medicine',
    trigger: { moduleStars: { 'LR11': 2 } } },

  { id: 'protocol-writer',   icon: '📋', title: 'Protocol Writer',
    desc: 'Hoàn thành LR12 — Viết đề cương nghiên cứu: SMART objectives, cỡ mẫu & đạo đức',
    trigger: { moduleStars: { 'LR12': 2 } } },

  { id: 'academic-pharmacist', icon: '🎓', title: 'Nhà khoa học Dược',
    desc: 'Hoàn thành CP04 — Sự nghiệp Học thuật: giảng viên, NCS, publish & nghiên cứu',
    trigger: { moduleStars: { 'CP04': 3 } } },

  { id: 'military-pharmacist', icon: '⚔️', title: 'Dược sĩ Quân y',
    desc: 'Hoàn thành CP05 — Quân y: dược phẩm dã chiến, TCCC & gìn giữ hoà bình LHQ',
    trigger: { moduleStars: { 'CP05': 2 } } },

  { id: 'tcm-specialist',    icon: '🌿', title: 'Chuyên gia Đông dược',
    desc: 'Hoàn thành CP08 — Y học cổ truyền + Đông dược: dược liệu, pháp lý & tích hợp',
    trigger: { moduleStars: { 'CP08': 3 } } },

  // ── Career & Games mới (CP09, CP10, GC07, GC09, GC10) ──
  { id: 'pharma-founder',    icon: '🚀', title: 'Pharma Founder',
    desc: 'Hoàn thành CP09 — Khởi nghiệp dược: startup healthtech, vốn, pháp lý & pitch deck',
    trigger: { moduleStars: { 'CP09': 2 } } },

  { id: 'phd-pharmacist',    icon: '📜', title: 'Nhà Dược học Tiến sĩ',
    desc: 'Hoàn thành CP10 — Tiếp tục đào tạo: CKII, NCS, postdoc & sự nghiệp học thuật',
    trigger: { moduleStars: { 'CP10': 2 } } },

  { id: 'osce-champion',     icon: '🏆', title: 'OSCE Champion',
    desc: 'Hoàn thành GC07 — OSCE Championship: thi OSCE đỉnh cao, rubrics & bệnh nhân chuẩn',
    trigger: { moduleStars: { 'GC07': 3 } } },

  { id: 'quiz-bowl-mvp',     icon: '🧠', title: 'Quiz Bowl MVP',
    desc: 'Hoàn thành GC09 — Pharmacy Quiz Bowl: thi đấu nhanh pharmacology & medication safety',
    trigger: { moduleStars: { 'GC09': 3 } } },

  { id: 'conference-speaker', icon: '🎤', title: 'Conference Speaker',
    desc: 'Hoàn thành GC10 — Hội nghị Dược ảo: trình bày khoa học, CPD & networking quốc tế',
    trigger: { moduleStars: { 'GC10': 2 } } },
];
