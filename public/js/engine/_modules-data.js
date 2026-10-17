// ============================================================
// Raw MODULE data — Pharmacy (5-year curriculum + 5 side clusters)
// ============================================================
// ⚠️ Đây là raw data, KHÔNG tự augment với experiences.
//
// Flow:
//   raw  →  domains/pharmacy/modules.js (gắn experiences)
//        →  engine/learning-path.js (re-export + helpers)
//
// Để di chuyển sang domain khác (medicine, IT), tạo file
// tương ứng: domains/medicine/modules.js, không sửa file này.
// File này sẽ trở thành domain pharmacy module raw data.
// ============================================================

/** @type {import('./types.js').CourseModule[]} */
export const MODULES = [
  // ══════════════════════════════════════════════════════════════
  //                    CỤM 1 — CURRICULUM (35)
  // ══════════════════════════════════════════════════════════════

  // ────────── NĂM 1 — HỌC (Tutorial Mode) ──────────
  { category: 'curriculum', id: 'L1.1', title: 'Hoá hữu cơ tương tác',        yearLevel: 1, subject: 'hoa-huu-co',     scenarioIds: ['L1.1-functional-groups'], minStarsToUnlock: 0 },
  { category: 'curriculum', id: 'L1.2', title: 'Giải phẫu – Sinh lý 3D',      yearLevel: 1, subject: 'giai-phau',      scenarioIds: ['L1.2-anatomy-physiology'], minStarsToUnlock: 0 },
  { category: 'curriculum', id: 'L1.3', title: 'An toàn phòng thí nghiệm',    yearLevel: 1, subject: 'lab-safety',     scenarioIds: ['L1.3-lab-safety'], minStarsToUnlock: 0 },
  { category: 'curriculum', id: 'L1.4', title: 'Dụng cụ cơ bản',              yearLevel: 1, subject: 'lab-basics',     scenarioIds: ['L1.4-basic-equipment'], minStarsToUnlock: 0, prerequisites: ['L1.3'] },
  { category: 'curriculum', id: 'L1.5', title: 'Tiếng Anh dược',              yearLevel: 1, subject: 'pharm-english',  scenarioIds: ['L1.5-english-pharmacy'], minStarsToUnlock: 0 },
  { category: 'curriculum', id: 'L1.6', title: 'Đạo đức nghề Dược',           yearLevel: 1, subject: 'ethics',         scenarioIds: ['L1.6-pharmacy-ethics'], minStarsToUnlock: 0 },

  // ────────── NĂM 2 — TẬP (Guided Practice) ──────────
  { category: 'curriculum', id: 'L2.1', title: 'Hoá phân tích · Chuẩn độ 3D', yearLevel: 2, subject: 'hoa-phan-tich',  scenarioIds: ['L2.1-analytical-chemistry', 'L2.1-titration-3d'], minStarsToUnlock: 6, prerequisites: ['L1.4'] },
  { category: 'curriculum', id: 'L2.2', title: 'Dược liệu — Nhận diện',       yearLevel: 2, subject: 'duoc-lieu',      scenarioIds: ['L2.2-medicinal-plants-quiz', 'L2.2-plant-identification'], minStarsToUnlock: 6 },
  { category: 'curriculum', id: 'L2.3', title: 'Vi sinh — Ký sinh',           yearLevel: 2, subject: 'vi-sinh',        scenarioIds: ['L2.3-microbiology-parasitology'], minStarsToUnlock: 6 },
  { category: 'curriculum', id: 'L2.4', title: 'Sinh hoá — Enzyme kinetics',  yearLevel: 2, subject: 'sinh-hoa',       scenarioIds: ['L2.4-enzyme-kinetics-quiz', 'L2.4-km-vmax-calculator'], minStarsToUnlock: 6 },
  { category: 'curriculum', id: 'L2.5', title: 'Hoá lý',                      yearLevel: 2, subject: 'hoa-ly',         scenarioIds: ['L2.5-physical-chemistry'], minStarsToUnlock: 6 },
  { category: 'curriculum', id: 'L2.6', title: 'Sắc ký lớp mỏng (TLC)',      yearLevel: 2, subject: 'hoa-phan-tich',  scenarioIds: ['sac-ky-2d', 'sac-ky-3d', 'sac-ky-vr-web'], minStarsToUnlock: 6, prerequisites: ['L2.1'] },

  // ────────── NĂM 3 — ÁP DỤNG (Independent) ──────────
  { category: 'curriculum', id: 'L3.1', title: 'Dược lý — ATC',               yearLevel: 3, subject: 'duoc-ly',        scenarioIds: ['L3.1-atc-01'], minStarsToUnlock: 12, prerequisites: ['L2.6'] },
  { category: 'curriculum', id: 'L3.2', title: 'Dược lý — Cơ chế tác dụng',   yearLevel: 3, subject: 'duoc-ly',        scenarioIds: ['L3.2-mechanism-01'], minStarsToUnlock: 12, prerequisites: ['L3.1'] },
  { category: 'curriculum', id: 'L3.3', title: 'Tương tác thuốc',             yearLevel: 3, subject: 'duoc-ly',        scenarioIds: ['L3.3-quiz-01', 'L3.3-drag-01'], minStarsToUnlock: 18, prerequisites: ['L3.2'] },
  { category: 'curriculum', id: 'L3.4', title: 'Dược liệu nâng cao',          yearLevel: 3, subject: 'duoc-lieu',      scenarioIds: ['L3.4-duoclieu-01'], minStarsToUnlock: 12, prerequisites: ['L2.2'] },
  { category: 'curriculum', id: 'L3.5', title: 'Hoá dược — SAR',              yearLevel: 3, subject: 'hoa-duoc',       scenarioIds: ['L3.5-sar-01'], minStarsToUnlock: 12, prerequisites: ['L1.1'] },
  { category: 'curriculum', id: 'L3.6', title: 'Bào chế — 8 dạng',            yearLevel: 3, subject: 'bao-che',        scenarioIds: ['L3.6-baoche-01', 'compounding-lab'], minStarsToUnlock: 12, prerequisites: ['L2.5'] },
  { category: 'curriculum', id: 'L3.7', title: 'Kiểm nghiệm — HPLC/UV/GC/IR', yearLevel: 3, subject: 'kiem-nghiem',    scenarioIds: ['L3.7-kiemnghiem-01'], minStarsToUnlock: 12, prerequisites: ['L2.6'] },
  { category: 'curriculum', id: 'L3.8', title: 'Dược động học — PK',          yearLevel: 3, subject: 'duoc-dong-hoc',  scenarioIds: ['L3.8-pk-auc-01', 'L3.8-pk-quiz-01'], minStarsToUnlock: 12, prerequisites: ['L3.2'] },

  // ────────── NĂM 4 — TÍCH HỢP (Case-based) ──────────
  { category: 'curriculum', id: 'L4.1', title: 'Đọc đơn + phát hiện DRP',     yearLevel: 4, subject: 'duoc-lam-sang',  scenarioIds: ['L4.1-drp-01'], minStarsToUnlock: 18, prerequisites: ['L3.3'] },
  { category: 'curriculum', id: 'L4.2', title: 'SOAP note',                   yearLevel: 4, subject: 'duoc-lam-sang',  scenarioIds: ['L4.2-soap-cases'], minStarsToUnlock: 18, prerequisites: ['L4.1'] },
  { category: 'curriculum', id: 'L4.3', title: 'TDM — Theo dõi nồng độ',      yearLevel: 4, subject: 'duoc-lam-sang',  scenarioIds: ['L4.3-tdm-vanco-01', 'L4.3-tdm-quiz'], minStarsToUnlock: 18, prerequisites: ['L3.8'] },
  { category: 'curriculum', id: 'L4.4', title: 'Liều đặc biệt',               yearLevel: 4, subject: 'duoc-lam-sang',  scenarioIds: ['L4.4-pediatric-01', 'L4.4-renal-01', 'L4.4-pregnancy-01'], minStarsToUnlock: 18, prerequisites: ['L3.8'] },
  { category: 'curriculum', id: 'L4.5', title: 'Bào chế CN cao',              yearLevel: 4, subject: 'bao-che',        scenarioIds: ['L4.5-advanced-form-01'], minStarsToUnlock: 18, prerequisites: ['L3.6'] },
  { category: 'curriculum', id: 'L4.6', title: 'Sinh dược học',               yearLevel: 4, subject: 'sinh-duoc-hoc',  scenarioIds: ['L4.6-biopharm-01'], minStarsToUnlock: 18, prerequisites: ['L3.8'] },
  { category: 'curriculum', id: 'L4.7', title: 'Pháp luật dược',              yearLevel: 4, subject: 'phap-luat-duoc', scenarioIds: ['L4.7-phapluat-01'], minStarsToUnlock: 18 },
  { category: 'curriculum', id: 'L4.8', title: 'Marketing dược',              yearLevel: 4, subject: 'marketing',      scenarioIds: ['L4.8-marketing-01'], minStarsToUnlock: 18, prerequisites: ['L3.2'] },

  // ────────── NĂM 5 — THỰC HÀNH (OSCE / Portfolio) ──────────
  { category: 'curriculum', id: 'L5.1', title: 'Dược lâm sàng đa khoa',       yearLevel: 5, subject: 'duoc-lam-sang',  scenarioIds: ['L5.1-soap-01-ca-004-nmct-cap-dual-antiplatelet','L5.1-soap-02-ca-005-dka-type1','L5.1-soap-03-ca-006-aecopd','L5.1-soap-04-ca-007-xhth-nsaid','L5.1-soap-05-ca-008-ckd-thieu-mau','L5.1-soap-06-ca-009-folfox-antiemetic','L5.1-soap-07-ca-010-dengue-nhi','L5.1-soap-08-ca-011-lao-polypharmacy','L5.1-soap-09-ca-012-thai-tha','L5.1-soap-10-ca-013-tram-cam-tu-sat'], minStarsToUnlock: 24, prerequisites: ['L4.2'] },
  { category: 'curriculum', id: 'L5.2', title: 'AI Patient role-play',        yearLevel: 5, subject: 'tu-van-bn',      scenarioIds: ['L5.2-roleplay-01-otc-flu'], minStarsToUnlock: 24, prerequisites: ['L4.1'], hasCertificate: true },
  { category: 'curriculum', id: 'L5.3', title: 'Nhà thuốc GPP đầy đủ',        yearLevel: 5, subject: 'quan-ly-duoc',   scenarioIds: ['L5.3-gpp-01-otc-cam-cum'], minStarsToUnlock: 24, prerequisites: ['L3.1', 'L4.7'], hasCertificate: true },
  { category: 'curriculum', id: 'L5.4', title: 'Dược bệnh viện',              yearLevel: 5, subject: 'duoc-bv',        scenarioIds: ['L5.4-bv-quiz'], minStarsToUnlock: 24, prerequisites: ['L4.5'] },
  { category: 'curriculum', id: 'L5.5', title: 'Dược cộng đồng',              yearLevel: 5, subject: 'duoc-cd',        scenarioIds: ['L5.5-otc-01-cam-cum'], minStarsToUnlock: 24, prerequisites: ['L4.1'] },
  { category: 'curriculum', id: 'L5.6', title: 'Khoá luận — Data tool',       yearLevel: 5, subject: 'data-research',  scenarioIds: ['L5.6-thesis-stats'], minStarsToUnlock: 24 },
  { category: 'curriculum', id: 'L5.7', title: 'OSCE Exam',                   yearLevel: 5, subject: 'osce',           scenarioIds: ['L5.7-osce-info'], minStarsToUnlock: 60, prerequisites: ['L5.1','L5.2','L5.3','L5.4','L5.5'], hasCertificate: true },

  // ══════════════════════════════════════════════════════════════
  //              CỤM 2 — PRACTICE SITES (20)
  // ══════════════════════════════════════════════════════════════

  // ── Bệnh viện mô phỏng (10 khoa) ──
  { category: 'practice', id: 'PS01', title: 'Phòng Cấp cứu (ER)',           subject: 'er-pharmacy',       scenarioIds: ['PS01-quiz-01'], minStarsToUnlock: 30, icon: '🚨' },
  { category: 'practice', id: 'PS02', title: 'ICU Dược',                     subject: 'icu-pharmacy',      scenarioIds: ['PS02-quiz-01'], minStarsToUnlock: 30, icon: '🛏️' },
  { category: 'practice', id: 'PS03', title: 'Khoa Nội (Tim mạch, Nội khoa)', subject: 'internal-med',     scenarioIds: ['PS03-quiz-01'], minStarsToUnlock: 24, icon: '❤️' },
  { category: 'practice', id: 'PS04', title: 'Khoa Ngoại (Pre/Post-op)',     subject: 'surgical-pharm',    scenarioIds: ['PS04-quiz-01'], minStarsToUnlock: 24, icon: '🔪' },
  { category: 'practice', id: 'PS05', title: 'Khoa Nhi',                     subject: 'pediatric-pharm',   scenarioIds: ['PS05-quiz-01'], minStarsToUnlock: 24, icon: '👶' },
  { category: 'practice', id: 'PS06', title: 'Khoa Sản — Phụ khoa',          subject: 'obgyn-pharm',       scenarioIds: ['PS06-quiz-01'], minStarsToUnlock: 24, icon: '🤰' },
  { category: 'practice', id: 'PS07', title: 'Khoa Ung bướu — Hoá trị',      subject: 'onco-pharm',        scenarioIds: ['PS07-quiz-01'], minStarsToUnlock: 30, icon: '🎗️', hasCertificate: true },
  { category: 'practice', id: 'PS08', title: 'Khoa Tâm thần',                subject: 'psych-pharm',       scenarioIds: ['PS08-quiz-01'], minStarsToUnlock: 24, icon: '🧠' },
  { category: 'practice', id: 'PS09', title: 'Khoa Truyền nhiễm (HIV/lao)',  subject: 'infectious-pharm',  scenarioIds: ['PS09-quiz-01'], minStarsToUnlock: 24, icon: '🦠' },
  { category: 'practice', id: 'PS10', title: 'Phòng pha thuốc UT + TPN',     subject: 'iv-admixture',      scenarioIds: ['L5.4-wf-01-pha-hoa-tri','L5.4-wf-02-tpn-pha','L5.4-wf-03-iv-compat'], minStarsToUnlock: 30, icon: '💉', hasCertificate: true },

  // ── Nhà thuốc cộng đồng (4) ──
  { category: 'practice', id: 'PS11', title: 'Nhà thuốc GPP đầy đủ',          subject: 'community-pharm',   scenarioIds: ['L5.3-gpp-01-otc-cam-cum','L5.3-gpp-02-don-rx','L5.3-gpp-03-gay-nghien','L5.3-gpp-04-tre-em','L5.3-gpp-05-yeu-cau-thuoc-khong-don'], minStarsToUnlock: 18, icon: '🏪', hasCertificate: true },
  { category: 'practice', id: 'PS12', title: 'Nhà thuốc 24/7 — Cấp cứu OTC',  subject: 'community-pharm',   scenarioIds: ['PS12-quiz-01'], knowledgeQuiz: 'PS12-quiz-01', minStarsToUnlock: 18, icon: '🌙' },
  { category: 'practice', id: 'PS13', title: 'Nhà thuốc đại học',             subject: 'community-pharm',   scenarioIds: ['PS13-quiz-01'], knowledgeQuiz: 'PS13-quiz-01', minStarsToUnlock: 12, icon: '🎓' },
  { category: 'practice', id: 'PS14', title: 'Nhà thuốc BV — Ngoại trú',      subject: 'community-pharm',   scenarioIds: ['PS14-quiz-01'], knowledgeQuiz: 'PS14-quiz-01', minStarsToUnlock: 18, icon: '🏥' },

  // ── Công nghiệp dược (6) ──
  { category: 'practice', id: 'PS15', title: 'Nhà máy GMP — Tour quy trình',  subject: 'industrial',        scenarioIds: ['PS15-quiz-01'], minStarsToUnlock: 24, icon: '🏭' },
  { category: 'practice', id: 'PS16', title: 'Phòng QC — Kiểm nghiệm',        subject: 'quality-control',   scenarioIds: ['L3.7-kiemnghiem-01'], minStarsToUnlock: 18, icon: '🔬' },
  { category: 'practice', id: 'PS17', title: 'Phòng QA — Audit & SOP',        subject: 'quality-assurance', scenarioIds: ['PS17-quiz-01'], knowledgeQuiz: 'PS17-quiz-01', minStarsToUnlock: 24, icon: '📋' },
  { category: 'practice', id: 'PS18', title: 'Đăng ký thuốc — Dossier CTD',   subject: 'regulatory',        scenarioIds: ['PS18-quiz-01'], knowledgeQuiz: 'PS18-quiz-01', minStarsToUnlock: 24, icon: '📑' },
  { category: 'practice', id: 'PS19', title: 'Đấu thầu BV — Bid preparation', subject: 'tender',            scenarioIds: ['PS19-quiz-01'], knowledgeQuiz: 'PS19-quiz-01', minStarsToUnlock: 24, icon: '💰' },
  { category: 'practice', id: 'PS20', title: 'Pharmacovigilance — Báo cáo ADR', subject: 'pharmacovig',     scenarioIds: ['PS20-quiz-01'], knowledgeQuiz: 'PS20-quiz-01', minStarsToUnlock: 24, icon: '⚠️' },

  // ══════════════════════════════════════════════════════════════
  //              CỤM 3 — SKILL CENTERS (15)
  // ══════════════════════════════════════════════════════════════

  { category: 'skill', id: 'SC01', title: 'Trung tâm OSCE — 10 trạm',         subject: 'osce',          scenarioIds: ['L5.7-osce-info'], minStarsToUnlock: 30, icon: '🎯', hasCertificate: true },
  { category: 'skill', id: 'SC02', title: 'Phòng tư vấn AI Patient',          subject: 'roleplay',      scenarioIds: ['L5.2-roleplay-01-otc-flu','L5.2-roleplay-02-rx-dapt','L5.2-roleplay-03-opioid','L5.2-roleplay-04-side-effect','L5.2-roleplay-05-acute-pharma','L5.2-roleplay-06-emergency','L5.2-roleplay-07-discharge','L5.2-roleplay-08-pregnancy','L5.2-roleplay-09-pediatric','L5.2-roleplay-10-mental'], minStarsToUnlock: 18, icon: '🤖' },
  { category: 'skill', id: 'SC03', title: 'Phòng kỹ năng giao tiếp',          subject: 'communication', scenarioIds: ['SC03-quiz-01'], knowledgeQuiz: 'SC03-quiz-01', minStarsToUnlock: 12, icon: '💬' },
  { category: 'skill', id: 'SC04', title: 'Phòng đa văn hoá',                 subject: 'cultural',      scenarioIds: ['SC04-quiz-01'], knowledgeQuiz: 'SC04-quiz-01', minStarsToUnlock: 18, icon: '🌏' },
  { category: 'skill', id: 'SC05', title: 'Cấp cứu sống — CPR, AED',          subject: 'emergency',     scenarioIds: ['SC05-quiz-01'], knowledgeQuiz: 'SC05-quiz-01', minStarsToUnlock: 12, icon: '🆘' },
  { category: 'skill', id: 'SC06', title: 'Phòng tiêm chủng',                 subject: 'vaccination',   scenarioIds: ['SC06-quiz-01'], knowledgeQuiz: 'SC06-quiz-01', minStarsToUnlock: 18, icon: '💉' },
  { category: 'skill', id: 'SC07', title: 'Đo HA + Đường huyết tại nhà thuốc', subject: 'poc-testing',  scenarioIds: ['SC07-quiz-01'], knowledgeQuiz: 'SC07-quiz-01', minStarsToUnlock: 12, icon: '🩺' },
  { category: 'skill', id: 'SC08', title: 'Tư vấn cai thuốc lá',              subject: 'smoking',       scenarioIds: ['SC08-quiz-01'], knowledgeQuiz: 'SC08-quiz-01', minStarsToUnlock: 12, icon: '🚭' },
  { category: 'skill', id: 'SC09', title: 'Tư vấn giảm cân — béo phì',        subject: 'obesity',       scenarioIds: ['SC09-quiz-01'], knowledgeQuiz: 'SC09-quiz-01', minStarsToUnlock: 12, icon: '⚖️' },
  { category: 'skill', id: 'SC10', title: 'Tư vấn dinh dưỡng đặc biệt',       subject: 'nutrition',     scenarioIds: ['SC10-quiz-01'], knowledgeQuiz: 'SC10-quiz-01', minStarsToUnlock: 12, icon: '🥗' },
  { category: 'skill', id: 'SC11', title: 'Tư vấn du lịch — Vaccine + thuốc', subject: 'travel-med',    scenarioIds: ['SC11-quiz-01'], knowledgeQuiz: 'SC11-quiz-01', minStarsToUnlock: 18, icon: '✈️' },
  { category: 'skill', id: 'SC12', title: 'Tư vấn tránh thai',                 subject: 'contraception', scenarioIds: ['SC12-quiz-01'], knowledgeQuiz: 'SC12-quiz-01', minStarsToUnlock: 12, icon: '🌹' },
  { category: 'skill', id: 'SC13', title: 'Tư vấn HIV/STI',                   subject: 'hiv-sti',       scenarioIds: ['SC13-quiz-01'], knowledgeQuiz: 'SC13-quiz-01', minStarsToUnlock: 18, icon: '🎗️' },
  { category: 'skill', id: 'SC14', title: 'Quản lý đau — Cấp & mạn',          subject: 'pain-mgmt',     scenarioIds: ['SC14-quiz-01'], knowledgeQuiz: 'SC14-quiz-01', minStarsToUnlock: 18, icon: '💊' },
  { category: 'skill', id: 'SC15', title: 'MTM — Medication Therapy Management', subject: 'mtm',        scenarioIds: ['SC15-quiz-01'], knowledgeQuiz: 'SC15-quiz-01', minStarsToUnlock: 24, icon: '📋', hasCertificate: true },

  // ══════════════════════════════════════════════════════════════
  //              CỤM 4 — LIBRARY & RESEARCH (12)
  // ══════════════════════════════════════════════════════════════

  { category: 'library', id: 'LR01', title: 'Thư viện điện tử',                subject: 'library',       scenarioIds: ['LR01-quiz-01'], knowledgeQuiz: 'LR01-quiz-01', minStarsToUnlock: 0, icon: '📚' },
  { category: 'library', id: 'LR02', title: 'Phòng Thống kê y học',            subject: 'stats',         scenarioIds: ['L5.6-thesis-stats'], minStarsToUnlock: 12, icon: '📊' },
  { category: 'library', id: 'LR03', title: 'NC định tính — Phỏng vấn, FG',    subject: 'qualitative',   scenarioIds: ['LR03-quiz-01'], knowledgeQuiz: 'LR03-quiz-01', minStarsToUnlock: 18, icon: '🗣️' },
  { category: 'library', id: 'LR04', title: 'NC định lượng — RCT, Cohort',     subject: 'quantitative',  scenarioIds: ['LR04-quiz-01'], knowledgeQuiz: 'LR04-quiz-01', minStarsToUnlock: 18, icon: '📈' },
  { category: 'library', id: 'LR05', title: 'Systematic Review + Meta-analysis', subject: 'sr-ma',       scenarioIds: ['LR05-quiz-01'], knowledgeQuiz: 'LR05-quiz-01', minStarsToUnlock: 24, icon: '🔍' },
  { category: 'library', id: 'LR06', title: 'Viết khoá luận tốt nghiệp',       subject: 'thesis',        scenarioIds: ['LR06-quiz-01'], knowledgeQuiz: 'LR06-quiz-01', minStarsToUnlock: 24, icon: '✏️' },
  { category: 'library', id: 'LR07', title: 'Submit paper khoa học',           subject: 'publishing',    scenarioIds: ['LR07-quiz-01'], knowledgeQuiz: 'LR07-quiz-01', minStarsToUnlock: 30, icon: '📤' },
  { category: 'library', id: 'LR08', title: 'Tra cứu thuốc — Lexicomp/UpToDate', subject: 'drug-ref',    scenarioIds: ['LR08-quiz-01'], knowledgeQuiz: 'LR08-quiz-01', minStarsToUnlock: 12, icon: '🔎' },
  { category: 'library', id: 'LR09', title: 'EBM — Evidence-based Medicine',    subject: 'ebm',          scenarioIds: ['LR09-quiz-01'], knowledgeQuiz: 'LR09-quiz-01', minStarsToUnlock: 18, icon: '🎯' },
  { category: 'library', id: 'LR10', title: 'Pharmacoeconomics',                subject: 'pharmacoecon', scenarioIds: ['LR10-quiz-01'], knowledgeQuiz: 'LR10-quiz-01', minStarsToUnlock: 24, icon: '💵' },
  { category: 'library', id: 'LR11', title: 'AI/ML trong Dược',                 subject: 'pharma-ai',    scenarioIds: ['LR11-quiz-01'], knowledgeQuiz: 'LR11-quiz-01', minStarsToUnlock: 18, icon: '🤖' },
  { category: 'library', id: 'LR12', title: 'Viết đề cương nghiên cứu',         subject: 'protocol',     scenarioIds: ['LR12-quiz-01'], knowledgeQuiz: 'LR12-quiz-01', minStarsToUnlock: 18, icon: '📋' },

  // ══════════════════════════════════════════════════════════════
  //              CỤM 5 — CAREER PATHS (10)
  // ══════════════════════════════════════════════════════════════

  { category: 'career', id: 'CP01', title: 'Sự nghiệp Dược lâm sàng BV',       subject: 'career',        scenarioIds: ['CP01-quiz-01'], knowledgeQuiz: 'CP01-quiz-01', minStarsToUnlock: 30, icon: '🏥' },
  { category: 'career', id: 'CP02', title: 'Sự nghiệp Nhà thuốc cộng đồng',    subject: 'career',        scenarioIds: ['CP02-quiz-01'], knowledgeQuiz: 'CP02-quiz-01', minStarsToUnlock: 24, icon: '🏪' },
  { category: 'career', id: 'CP03', title: 'Sự nghiệp Công nghiệp dược',       subject: 'career',        scenarioIds: ['CP03-quiz-01'], knowledgeQuiz: 'CP03-quiz-01', minStarsToUnlock: 24, icon: '🏭' },
  { category: 'career', id: 'CP04', title: 'Sự nghiệp Học thuật — Giảng viên', subject: 'career',        scenarioIds: ['CP04-quiz-01'], knowledgeQuiz: 'CP04-quiz-01', minStarsToUnlock: 30, icon: '🎓' },
  { category: 'career', id: 'CP05', title: 'Quân y — Dược quân đội',           subject: 'career',        scenarioIds: ['CP05-quiz-01'], knowledgeQuiz: 'CP05-quiz-01', minStarsToUnlock: 24, icon: '⚔️' },
  { category: 'career', id: 'CP06', title: 'Cảnh giác dược — Pharmacovigilance', subject: 'career',      scenarioIds: ['CP06-quiz-01'], knowledgeQuiz: 'CP06-quiz-01', minStarsToUnlock: 30, icon: '⚠️' },
  { category: 'career', id: 'CP07', title: 'Regulatory Affairs — DAV',         subject: 'career',        scenarioIds: ['CP07-quiz-01'], knowledgeQuiz: 'CP07-quiz-01', minStarsToUnlock: 30, icon: '📑' },
  { category: 'career', id: 'CP08', title: 'Y học cổ truyền + Đông dược',      subject: 'career',        scenarioIds: ['CP08-quiz-01'], knowledgeQuiz: 'CP08-quiz-01', minStarsToUnlock: 24, icon: '🌿' },
  { category: 'career', id: 'CP09', title: 'Khởi nghiệp dược — Startup',       subject: 'career',        scenarioIds: ['CP09-quiz-01'], knowledgeQuiz: 'CP09-quiz-01', minStarsToUnlock: 30, icon: '🚀' },
  { category: 'career', id: 'CP10', title: 'Tiếp tục đào tạo — CKII, Tiến sĩ', subject: 'career',        scenarioIds: ['CP10-quiz-01'], knowledgeQuiz: 'CP10-quiz-01', minStarsToUnlock: 30, icon: '📜' },

  // ══════════════════════════════════════════════════════════════
  //              CỤM 6 — GAMES & COMPETITIONS (10)
  // ══════════════════════════════════════════════════════════════

  { category: 'game', id: 'GC01', title: 'Race Xếp thuốc 1v1',                 subject: 'game',          scenarioIds: ['race'], minStarsToUnlock: 6, icon: '🎮' },
  { category: 'game', id: 'GC02', title: 'Time Attack ATC',                    subject: 'game',          scenarioIds: ['time-attack'], minStarsToUnlock: 6, icon: '⚡' },
  { category: 'game', id: 'GC03', title: 'Drug Interaction Speed Challenge',   subject: 'game',          scenarioIds: ['GC03-quiz-01'], knowledgeQuiz: 'GC03-quiz-01', minStarsToUnlock: 12, icon: '🔗' },
  { category: 'game', id: 'GC04', title: 'OTC Consultation Speed',             subject: 'game',          scenarioIds: ['GC04-quiz-01'], knowledgeQuiz: 'GC04-quiz-01', minStarsToUnlock: 12, icon: '💊' },
  { category: 'game', id: 'GC05', title: 'Calculator Championship',            subject: 'game',          scenarioIds: ['GC05-quiz-01'], knowledgeQuiz: 'GC05-quiz-01', minStarsToUnlock: 12, icon: '🧮' },
  { category: 'game', id: 'GC06', title: 'Herb ID Race',                       subject: 'game',          scenarioIds: ['GC06-quiz-01'], knowledgeQuiz: 'GC06-quiz-01', minStarsToUnlock: 12, icon: '🌿' },
  { category: 'game', id: 'GC07', title: 'OSCE Championship',                  subject: 'game',          scenarioIds: ['GC07-quiz-01'], knowledgeQuiz: 'GC07-quiz-01', minStarsToUnlock: 30, icon: '🏆' },
  { category: 'game', id: 'GC08', title: 'Metaverse — Phòng học chung',        subject: 'game',          scenarioIds: ['metaverse'], minStarsToUnlock: 6, icon: '🌐' },
  { category: 'game', id: 'GC09', title: 'Pharmacy Quiz Bowl (đội)',           subject: 'game',          scenarioIds: ['GC09-quiz-01'], knowledgeQuiz: 'GC09-quiz-01', minStarsToUnlock: 18, icon: '🧠' },
  { category: 'game', id: 'GC10', title: 'Hội nghị Dược ảo — Hằng năm',        subject: 'game',          scenarioIds: ['GC10-quiz-01'], knowledgeQuiz: 'GC10-quiz-01', minStarsToUnlock: 24, icon: '🎤' },
];
