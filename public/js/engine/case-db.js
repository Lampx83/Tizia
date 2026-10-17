// ============================================================
// CaseDB — Catalog ca lâm sàng cho Dược lâm sàng (Năm 4–5)
// ============================================================
// Schema xem types.js (typedef ClinicalCase).
// Mỗi ca có:
//   - Thông tin BN: tuổi, giới, cân nặng, lab, comorbidity
//   - Đơn thuốc hiện tại
//   - DRP (Drug-Related Problems) cần SV phát hiện
//   - SOAP rubric: tiêu chí chấm cho Subjective, Objective, Assessment, Plan
//   - keyLearningPoints + specialties
//
// File này có 3 ca mẫu để demo schema. Đầy đủ 150 ca sẽ bổ sung dần.
// ============================================================

/** @type {import('./types.js').ClinicalCase[]} */
export const CASES = [
  // ──────────────────────────────────────────────────────────
  // Ca 1: Tương tác warfarin + clarithromycin (P0 — phổ biến)
  // ──────────────────────────────────────────────────────────
  {
    id: 'ca-001-warfarin-clarithromycin',
    title: 'Ca 1 · BN AF dùng warfarin nhập viện vì xuất huyết tiêu hoá',
    chiefComplaint: 'Nôn ra máu đỏ tươi 2 lần trong sáng nay',
    history: `BN nam 68 tuổi, có tiền sử rung nhĩ mạn → dùng warfarin 5mg/ngày từ 3 năm nay, INR thường ổn 2.3–2.7.
Cách đây 5 ngày, BN được BS phòng khám kê clarithromycin 500mg × 2/ngày × 7 ngày để điều trị viêm phế quản cấp.
Sáng nay BN nôn ra máu đỏ tươi 2 lần, mệt nhiều, da xanh xao.`,
    patient: {
      id: 'p-001', initials: 'L.V.T', ageYears: 68, sex: 'M',
      weightKg: 65, heightCm: 168,
      comorbidities: ['Rung nhĩ mạn', 'Suy thận giai đoạn 2', 'Tăng huyết áp'],
      currentMeds: ['warfarin', 'amlodipin', 'clarithromycin'],
      labs: { eGFR: 65, INR: 7.8, Hb: 8.5, ALT: 32 },
      allergies: [],
    },
    prescriptions: [
      { drugId: 'warfarin',       dose: '5mg',   route: 'PO', frequency: '× 1/ngày tối', duration: 'dài hạn' },
      { drugId: 'clarithromycin', dose: '500mg', route: 'PO', frequency: '× 2/ngày',     duration: '7 ngày' },
      { drugId: 'amlodipin',      dose: '5mg',   route: 'PO', frequency: '× 1/ngày',     duration: 'dài hạn' },
    ],
    drps: [
      {
        type: 'interaction',
        description: 'Clarithromycin (ức chế CYP3A4) làm tăng nồng độ warfarin → INR tăng vọt, nguy cơ chảy máu cao',
        drugId: 'clarithromycin',
        resolution: 'Ngưng clarithromycin ngay; thay bằng kháng sinh khác (azithromycin hoặc beta-lactam); đảo ngược chống đông (Vitamin K + plasma tươi nếu cần)',
        severity: 3,
      },
      {
        type: 'monitoring',
        description: 'Không xét nghiệm INR trong 5 ngày sau khi thêm thuốc tương tác',
        drugId: 'warfarin',
        resolution: 'Thiết lập quy trình: mỗi lần thêm/ngưng thuốc trên BN dùng warfarin → kiểm tra INR sau 3–5 ngày',
        severity: 2,
      },
    ],
    soapRubric: {
      subjective: [
        'Mô tả triệu chứng nôn ra máu đỏ tươi',
        'Khai thác đầy đủ tiền sử AF + warfarin',
        'Khai thác thuốc mới kê 5 ngày trước (clarithromycin)',
      ],
      objective: [
        'INR 7.8 (rất cao, mục tiêu 2–3)',
        'Hb 8.5 (giảm: mất máu)',
        'Sinh hiệu (nếu có dấu hiệu sốc)',
      ],
      assessment: [
        'Chẩn đoán: Xuất huyết tiêu hoá do quá liều warfarin',
        'Nguyên nhân: tương tác warfarin × clarithromycin (CYP3A4)',
        'Mức độ nặng: nguy hiểm, INR > 5 + chảy máu hoạt động',
      ],
      plan: [
        'Ngưng warfarin + ngưng clarithromycin ngay',
        'Vitamin K 10mg IV chậm + xem xét plasma tươi đông lạnh',
        'Đổi kháng sinh: azithromycin (ít tương tác hơn) hoặc cephalosporin',
        'Sau ổn định: re-start warfarin khi INR <2, theo dõi INR mỗi 3 ngày',
        'Tư vấn BN: thông báo TẤT CẢ thuốc mới cho BS chuyên khoa',
      ],
    },
    keyLearningPoints: [
      'Macrolide (clarithromycin, erythromycin) ức chế CYP3A4 mạnh → tăng tác dụng warfarin',
      'Mỗi lần thêm/ngưng thuốc trên BN warfarin: re-check INR sau 3–5 ngày',
      'Azithromycin là macrolide ít tương tác CYP3A4 nhất',
    ],
    specialties: ['cardio', 'infect', 'geri'],
    difficulty: 4,
    usedInYears: [4, 5],
  },

  // ──────────────────────────────────────────────────────────
  // Ca 2: Liều amoxicillin ở trẻ em (cơ bản — Năm 4)
  // ──────────────────────────────────────────────────────────
  {
    id: 'ca-002-pedi-amoxicillin',
    title: 'Ca 2 · Trẻ 3 tuổi viêm tai giữa, kê amoxicillin',
    chiefComplaint: 'Trẻ sốt 38.8°C, đau tai trái, quấy khóc 2 ngày',
    history: `Bệnh nhi nữ, 3 tuổi, cân nặng 15kg, khoẻ mạnh trước đây, không dị ứng thuốc.
Khám: màng nhĩ trái đỏ, phồng, mất tam giác sáng.
Bác sĩ kê đơn: Amoxicillin 250mg × 3 lần/ngày × 7 ngày.`,
    patient: {
      id: 'p-002', initials: 'N.T.M', ageYears: 3, sex: 'F',
      weightKg: 15, heightCm: 95,
      comorbidities: [],
      currentMeds: [],
      labs: {},
      allergies: [],
    },
    prescriptions: [
      { drugId: 'amoxicillin', dose: '250mg', route: 'PO', frequency: '× 3/ngày', duration: '7 ngày' },
    ],
    drps: [
      {
        type: 'dose-low',
        description: 'Liều amoxicillin 50mg/kg/ngày DƯỚI CHUẨN cho viêm tai giữa, AAP/AAFP 2013 khuyến cáo high-dose 80–90 mg/kg/ngày là STANDARD (do tỷ lệ kháng penicillin cao ở phế cầu)',
        drugId: 'amoxicillin',
        resolution: 'Tăng lên 90 mg/kg/ngày chia 2 lần (≈ 675mg × 2 cho 15kg); chọn dạng bột pha hỗn dịch 250mg/5mL',
        severity: 3,
      },
    ],
    soapRubric: {
      subjective: ['Triệu chứng đau tai + sốt', 'Tiền sử không dị ứng', 'Khai thác kháng sinh đã dùng gần đây'],
      objective: ['Cân nặng 15kg', 'Khám tai mô tả màng nhĩ', 'Sinh hiệu'],
      assessment: ['Chẩn đoán viêm tai giữa cấp', 'Đánh giá nguy cơ kháng penicillin', 'Liều hiện tại đủ hay chưa'],
      plan: [
        'Tính liều theo cân nặng: 80–90 mg/kg/ngày chia 2–3 lần',
        'Chọn dạng phù hợp trẻ em: bột pha hỗn dịch 250mg/5mL',
        'Tư vấn cha mẹ: lắc đều, bảo quản tủ lạnh sau pha, uống đủ 7 ngày',
        'Cảnh báo dấu hiệu cần khám lại: sốt cao trở lại, chảy mủ tai',
      ],
    },
    keyLearningPoints: [
      'Trẻ em: liều theo cân nặng (mg/kg), không theo tuổi',
      'Viêm tai giữa khuyến cáo amoxicillin liều cao 80–90 mg/kg/ngày',
      'Dạng siro/hỗn dịch phù hợp hơn viên nang cho trẻ <6 tuổi',
    ],
    specialties: ['pedi', 'infect'],
    difficulty: 2,
    usedInYears: [4, 5],
  },

  // ──────────────────────────────────────────────────────────
  // Ca 3: Đa cơ quan ở người già — polypharmacy (Năm 5)
  // ──────────────────────────────────────────────────────────
  {
    id: 'ca-003-geri-polypharmacy',
    title: 'Ca 3 · Cụ bà 78 tuổi nhiều bệnh, review đơn polypharmacy',
    chiefComplaint: 'Mệt mỏi, chóng mặt khi đứng dậy, hay ngã',
    history: `BN nữ 78 tuổi, sống một mình.
Bệnh nền: ĐTĐ type 2 (15 năm), THA, suy thận giai đoạn 3 (eGFR 38), trầm cảm nhẹ, mất ngủ.
Đơn hiện tại 7 thuốc, đến khám vì mệt, chóng mặt, ngã 2 lần trong tháng qua.`,
    patient: {
      id: 'p-003', initials: 'T.T.L', ageYears: 78, sex: 'F',
      weightKg: 52, heightCm: 152,
      comorbidities: ['ĐTĐ type 2', 'Tăng huyết áp', 'Suy thận giai đoạn 3', 'Trầm cảm nhẹ', 'Mất ngủ'],
      currentMeds: ['metformin', 'glibenclamid', 'amlodipin', 'aspirin', 'omeprazol', 'diazepam', 'atorvastatin'],
      labs: { eGFR: 38, HbA1c: 6.2, Hb: 11.0, K: 4.2, ALT: 40 },
      allergies: [],
    },
    prescriptions: [
      { drugId: 'metformin',    dose: '850mg', route: 'PO', frequency: '× 2/ngày', duration: 'dài hạn' },
      { drugId: 'glibenclamid', dose: '5mg',   route: 'PO', frequency: '× 1/ngày sáng', duration: 'dài hạn' },
      { drugId: 'amlodipin',    dose: '10mg',  route: 'PO', frequency: '× 1/ngày', duration: 'dài hạn' },
      { drugId: 'aspirin',      dose: '81mg',  route: 'PO', frequency: '× 1/ngày', duration: 'dài hạn' },
      { drugId: 'omeprazol',    dose: '20mg',  route: 'PO', frequency: '× 1/ngày sáng', duration: 'dài hạn (2 năm)' },
      { drugId: 'diazepam',     dose: '5mg',   route: 'PO', frequency: '× 1/ngày tối', duration: '6 tháng' },
      { drugId: 'atorvastatin', dose: '20mg',  route: 'PO', frequency: '× 1/ngày tối', duration: 'dài hạn' },
    ],
    drps: [
      {
        type: 'contraindication',
        description: 'Metformin: eGFR 38, gần ngưỡng cấm (eGFR <30), cần theo dõi sát',
        drugId: 'metformin', severity: 2,
        resolution: 'Theo dõi eGFR mỗi 3–6 tháng; cân nhắc giảm liều xuống 500mg × 2 nếu eGFR giảm thêm',
      },
      {
        type: 'contraindication',
        description: 'Glibenclamid CHỐNG CHỈ ĐỊNH ở người già (sulfonylurea tác dụng dài → hạ ĐH kéo dài, ngã)',
        drugId: 'glibenclamid', severity: 3,
        resolution: 'Đổi sang sulfonylurea ngắn hơn (gliclazid) hoặc DPP-4 inhibitor; HbA1c 6.2 ở cụ 78 tuổi là QUÁ THẤP, nguy cơ hạ ĐH',
      },
      {
        type: 'dose-high',
        description: 'HbA1c 6.2 quá chặt cho cụ 78t, mục tiêu nên 7.5–8.0',
        drugId: 'glibenclamid', severity: 3,
        resolution: 'Nới mục tiêu HbA1c lên 7.5–8.0; có thể giảm liều glibenclamid hoặc bỏ',
      },
      {
        type: 'contraindication',
        description: 'Diazepam ở người già, tăng nguy cơ ngã + lú lẫn (Beers list)',
        drugId: 'diazepam', severity: 3,
        resolution: 'Ngưng diazepam (cắt giảm dần để tránh phản hồi); thay bằng zolpidem ngắn ngày hoặc CBT-I',
      },
      {
        type: 'monitoring',
        description: 'Omeprazol dùng dài 2 năm, nguy cơ thiếu B12, Mg, loãng xương',
        drugId: 'omeprazol', severity: 2,
        resolution: 'Đánh giá lại chỉ định; nếu không còn cần thì step-down sang H2 blocker hoặc PRN',
      },
      {
        type: 'interaction',
        description: 'Amlodipin × atorvastatin: amlodipin tăng nồng độ atorvastatin → có thể tăng nguy cơ cơ',
        drugId: 'atorvastatin', severity: 1,
        resolution: 'Giới hạn liều atorvastatin ≤ 20mg khi dùng cùng amlodipin (đã đang 20mg → ok, không nên tăng)',
      },
    ],
    soapRubric: {
      subjective: [
        'Mệt mỏi, chóng mặt khi đứng dậy → gợi ý hạ ĐH hoặc hạ HA tư thế',
        'Ngã 2 lần: yếu tố nguy cơ (thuốc?)',
        'Khai thác đầy đủ 7 thuốc + thời gian dùng',
        'Lối sống: ăn uống, vận động, sống một mình',
      ],
      objective: [
        'HbA1c 6.2 (quá thấp cho người 78t)',
        'eGFR 38 (giai đoạn 3)',
        'Đo HA tư thế (đứng vs nằm)',
        'Đường máu mao mạch lúc đói + 2h sau ăn',
      ],
      assessment: [
        'Triệu chứng nghi do hạ ĐH (glibenclamid) + diazepam (lú lẫn, ngã)',
        'Polypharmacy với nhiều thuốc trong Beers list',
        'Mục tiêu HbA1c quá chặt cho lứa tuổi',
      ],
      plan: [
        'Ngừng diazepam (cắt giảm dần 25%/tuần)',
        'Thay glibenclamid → gliclazid 30–60mg hoặc giữ metformin đơn độc',
        'Nới mục tiêu HbA1c lên 7.5–8.0',
        'Đánh giá lại PPI, step-down nếu không còn loét',
        'Tư vấn BN + người nhà về dấu hiệu hạ ĐH, ngã, lú lẫn',
        'Lịch tái khám 2 tuần để đánh giá triệu chứng + đường huyết',
      ],
    },
    keyLearningPoints: [
      'Beers Criteria: danh sách thuốc cần TRÁNH ở người già (diazepam, glibenclamid)',
      'Mục tiêu HbA1c cá thể hoá theo tuổi + bệnh nền: KHÔNG phải càng thấp càng tốt',
      'PPI dùng dài hạn cần định kỳ đánh giá lại chỉ định',
      'Polypharmacy = nguy cơ tương tác cấp số nhân',
      'Cắt giảm BZD phải DẦN (không ngưng đột ngột)',
    ],
    specialties: ['geri', 'endo', 'cardio', 'psy'],
    difficulty: 5,
    usedInYears: [4, 5],
  },

  // ─── ADDITIONAL CURRICULUM-ALIGNED ENTRIES (Agent #13, 2026-05-27) ───
  { id: 'ca-004-dtd-suy-than', title: 'Ca 4 · BN ĐTĐ type 2 mới phát hiện suy thận giai đoạn 3, chỉnh thuốc', chiefComplaint: 'Tái khám định kỳ ĐTĐ, kết quả xét nghiệm bất thường', history: `BN nam 62 tuổi, ĐTĐ type 2 phát hiện 8 năm, đang dùng metformin 1000mg × 2/ngày + glibenclamid 5mg sáng. HbA1c gần nhất 7.4%. Tái khám phát hiện creatinin tăng (eGFR giảm còn 28 mL/phút/1.73m²). BN không có triệu chứng, không bệnh cấp tính. THA điều trị bằng amlodipin 5mg, lipid bằng atorvastatin 20mg.`, patient: { id: 'p-004', initials: 'N.V.B', ageYears: 62, sex: 'M', weightKg: 70, heightCm: 165, comorbidities: ['ĐTĐ type 2 (8 năm)', 'Tăng huyết áp', 'Suy thận mạn giai đoạn 3b'], currentMeds: ['metformin', 'glibenclamid', 'amlodipin', 'atorvastatin'], labs: { eGFR: 28, HbA1c: 7.4, creatinine: 220, K: 4.5, ALT: 30 }, allergies: [] }, prescriptions: [ { drugId: 'metformin', dose: '1000mg', route: 'PO', frequency: '× 2/ngày', duration: 'dài hạn' }, { drugId: 'glibenclamid', dose: '5mg', route: 'PO', frequency: '× 1/ngày sáng', duration: 'dài hạn' }, { drugId: 'amlodipin', dose: '5mg', route: 'PO', frequency: '× 1/ngày', duration: 'dài hạn' }, { drugId: 'atorvastatin', dose: '20mg', route: 'PO', frequency: '× 1/ngày tối', duration: 'dài hạn' } ], drps: [ { type: 'contraindication', description: 'Metformin: eGFR 28 < 30, CHỐNG CHỈ ĐỊNH (nguy cơ acidosis lactic)', drugId: 'metformin', resolution: 'Ngừng metformin ngay; chuyển sang DPP-4 inhibitor (linagliptin: an toàn ở suy thận) hoặc gliclazid liều thấp', severity: 3 }, { type: 'contraindication', description: 'Glibenclamid không khuyến cáo khi eGFR <30 do thải qua thận → hạ ĐH kéo dài', drugId: 'glibenclamid', resolution: 'Đổi glibenclamid → gliclazid 30mg (chuyển hoá gan, ít phụ thuộc thận); hoặc bổ sung insulin nền', severity: 3 }, { type: 'monitoring', description: 'Không có dự liệu HbA1c cá thể hoá, mục tiêu 7.4% có thể chấp nhận ở BN suy thận 62 tuổi', drugId: 'glibenclamid', resolution: 'Đặt mục tiêu HbA1c 7.0–7.5% (tránh hạ ĐH nặng); kiểm tra glucose máu mao mạch tự đo nhiều lần/tuần', severity: 1 } ], soapRubric: { subjective: ['Khai thác triệu chứng hạ đường huyết tiềm ẩn (vã mồ hôi, đói cồn cào)', 'Tiền sử dùng metformin và sulfonylurea bao lâu', 'Đánh giá tuân thủ thuốc', 'Hỏi tiền sử nhập viện do hạ ĐH'], objective: ['eGFR 28 (CKD giai đoạn 3b, gần 4)', 'HbA1c 7.4%', 'Creatinin 220 µmol/L', 'Đường máu mao mạch lúc đói + sau ăn'], assessment: ['Chẩn đoán: ĐTĐ type 2 + Suy thận mạn giai đoạn 3b', 'DRP1: Metformin chống chỉ định ở eGFR <30', 'DRP2: Glibenclamid tăng nguy cơ hạ ĐH ở suy thận', 'Cần đổi phác đồ hạ ĐH'], plan: ['Ngừng metformin (eGFR <30 = chống chỉ định tuyệt đối)', 'Đổi glibenclamid → gliclazid 30mg/ngày HOẶC chuyển sang insulin nền (glargin) 0.1–0.2 IU/kg', 'Thêm DPP-4 inhibitor (linagliptin 5mg): an toàn nhất ở suy thận', 'Tiếp tục amlodipin + atorvastatin (an toàn ở suy thận)', 'Tư vấn BN: theo dõi glucose máu tự đo, dấu hiệu hạ ĐH, nhập viện sớm nếu nôn/sốt/tiêu chảy (mất nước → suy thận cấp + acidosis)', 'Hẹn kiểm tra eGFR + HbA1c sau 1 tháng'] }, keyLearningPoints: ['Metformin: eGFR <30 = chống chỉ định tuyệt đối; 30–45: cân nhắc giảm liều 50%', 'Glibenclamid: tránh ở người già và suy thận, đổi gliclazid hoặc DPP-4 inhibitor', 'Linagliptin là DPP-4i an toàn nhất ở suy thận (không cần chỉnh liều)', 'Mục tiêu HbA1c cá thể hoá: 7.0–7.5% ở BN suy thận + lớn tuổi (không cố ép xuống <7%)', 'BN dùng metformin: phải nhận biết acidosis lactic, đặc biệt khi mất nước'], specialties: ['endo', 'renal', 'geri'], difficulty: 4, usedInYears: [4, 5] },
    { id: 'ca-005-hen-tre-em', title: 'Ca 5 · Bé 6 tuổi cơn hen cấp, kỹ thuật dùng bình xịt', chiefComplaint: 'Khó thở, khò khè 4 giờ qua sau khi chạy chơi', history: `Bé trai 6 tuổi, cân nặng 20kg. Tiền sử hen từ 2 tuổi, đợt khò khè 4–5 lần/năm. Mẹ cho dùng salbutamol bình xịt khi có triệu chứng nhưng "thường không thấy hiệu quả". Không dùng ICS dự phòng. Hôm nay sau chạy chơi → khò khè, khó thở rút lõm liên sườn nhẹ, SpO2 94%. Mẹ đem bình xịt salbutamol đến, không dùng buồng đệm (spacer).`, patient: { id: 'p-005', initials: 'L.M.K', ageYears: 6, sex: 'M', weightKg: 20, heightCm: 115, comorbidities: ['Hen phế quản từ nhỏ', 'Viêm mũi dị ứng'], currentMeds: ['salbutamol-inh'], labs: { SpO2: 94, PEF: '60% predicted' }, allergies: [] }, prescriptions: [ { drugId: 'salbutamol-inh', dose: '100mcg × 2 nhát', route: 'inhalation', frequency: 'PRN khi khó thở', duration: 'kéo dài' } ], drps: [ { type: 'adherence', description: 'Kỹ thuật dùng bình xịt SAI, không có buồng đệm + trẻ 6 tuổi khó phối hợp hít vào, lượng thuốc xuống phổi rất thấp', drugId: 'salbutamol-inh', resolution: 'TRANG BỊ BUỒNG ĐỆM (spacer) + mặt nạ: trẻ <8 tuổi gần như BẮT BUỘC; xịt 1 nhát vào spacer, trẻ thở bình thường 5–6 nhịp', severity: 3 }, { type: 'no-indication', description: 'Hen khò khè ≥4 đợt/năm + dùng SABA hàng tuần → cần ICS dự phòng (GINA Step 2)', drugId: 'salbutamol-inh', resolution: 'Thêm budesonid hít 100–200 mcg × 2/ngày, kèm hướng dẫn súc miệng sau hít', severity: 3 }, { type: 'monitoring', description: 'Không có kế hoạch hành động cho hen (asthma action plan)', resolution: 'Lập kế hoạch hành động 3 vùng (xanh/vàng/đỏ) bằng văn bản cho gia đình', severity: 2 } ], soapRubric: { subjective: ['Khai thác cơn cấp: thời gian, yếu tố khởi phát (chạy chơi gợi ý EIB)', 'Số đợt khò khè/năm', 'Số lần dùng SABA/tuần', 'Tiền sử nhập viện do hen', 'Kỹ thuật dùng bình xịt (có buồng đệm không?)'], objective: ['SpO2 94% (cơn cấp vừa)', 'PEF 60% predicted (cơn vừa)', 'Mức độ rút lõm', 'Khả năng nói cả câu hay câu ngắn'], assessment: ['Cơn hen cấp mức độ vừa', 'Hen kiểm soát kém, cần leo thang điều trị (GINA Step 2)', 'Kỹ thuật dùng bình xịt sai → liều thực tế không đủ'], plan: ['Cấp cứu: salbutamol 4–8 nhát qua spacer mỗi 20 phút × 3 lần đầu', 'Đánh giá lại sau 1 giờ, nếu SpO2 >94%, PEF >80% → cho về', 'Khi cho về: thêm prednisolon uống 1 mg/kg × 3–5 ngày (cơn cấp vừa)', 'Bắt đầu budesonid hít 200 mcg × 2/ngày dự phòng', 'HƯỚNG DẪN dùng spacer (mặt nạ cho trẻ <4t, ngậm miệng cho 4–8t)', 'Lập kế hoạch hành động hen cho gia đình', 'Tái khám sau 2–4 tuần đánh giá kiểm soát'] }, keyLearningPoints: ['Trẻ em <8 tuổi BẮT BUỘC dùng buồng đệm (spacer): bình xịt định liều đơn thuần không hiệu quả', 'Hen kiểm soát kém = cần ICS, không phải chỉ SABA', 'ICS sau khi hít: SÚC MIỆNG để tránh nấm và khàn tiếng', 'Cơn hen cấp vừa-nặng: bổ sung prednisolon uống 3–5 ngày', 'Mỗi BN hen cần "kế hoạch hành động" bằng văn bản'], specialties: ['respi', 'pedi'], difficulty: 3, usedInYears: [4, 5] },
    { id: 'ca-006-suy-tim-mn', title: 'Ca 6 · BN suy tim mạn HFrEF, đa thuốc theo guideline GDMT', chiefComplaint: 'Khó thở khi gắng sức nhẹ, phù chân tăng', history: `BN nam 65 tuổi, suy tim mạn EF 28% sau nhồi máu cơ tim 2 năm trước. Hiện đang dùng: bisoprolol 5mg, lisinopril 20mg, furosemid 40mg, aspirin 81mg, atorvastatin 40mg. Gần đây khó thở khi đi 100m phẳng (trước đây đi được 500m), phù 2 mắt cá chân. K máu 4.8, eGFR 55, creatinin 130, Na 138, NT-proBNP 1800.`, patient: { id: 'p-006', initials: 'T.V.H', ageYears: 65, sex: 'M', weightKg: 72, heightCm: 170, comorbidities: ['Suy tim mạn HFrEF (EF 28%)', 'Tăng huyết áp', 'Bệnh động mạch vành (sau NMCT)', 'Suy thận giai đoạn 3a'], currentMeds: ['bisoprolol', 'lisinopril', 'furosemid', 'aspirin', 'atorvastatin'], labs: { eGFR: 55, K: 4.8, Na: 138, NTproBNP: 1800, EF: 28 }, allergies: [] }, prescriptions: [ { drugId: 'bisoprolol', dose: '5mg', route: 'PO', frequency: '× 1/ngày', duration: 'dài hạn' }, { drugId: 'lisinopril', dose: '20mg', route: 'PO', frequency: '× 1/ngày', duration: 'dài hạn' }, { drugId: 'furosemid', dose: '40mg', route: 'PO', frequency: '× 1/ngày sáng', duration: 'dài hạn' }, { drugId: 'aspirin', dose: '81mg', route: 'PO', frequency: '× 1/ngày', duration: 'dài hạn' }, { drugId: 'atorvastatin', dose: '40mg', route: 'PO', frequency: '× 1/ngày tối', duration: 'dài hạn' } ], drps: [ { type: 'untreated', description: 'Thiếu spironolacton (MRA): chỉ định cấp 1 cho HFrEF NYHA II–IV', drugId: 'spironolacton', resolution: 'Thêm spironolacton 12.5–25mg/ngày; theo dõi K + creatinin sau 1 tuần và 1 tháng', severity: 3 }, { type: 'dose-low', description: 'Bisoprolol mới 5mg: chưa đạt liều mục tiêu 10mg theo CIBIS-II/HF trials', drugId: 'bisoprolol', resolution: 'Nếu HA và nhịp tim cho phép (HATT >90, nhịp >60), tăng dần lên 7.5mg → 10mg mỗi 2 tuần', severity: 2 }, { type: 'no-indication', description: 'Triệu chứng xấu đi mặc dù đã ổn ACEi + BB tối đa dung nạp → cân nhắc đổi sang sacubitril/valsartan (ARNI) theo PARADIGM-HF', drugId: 'lisinopril', resolution: 'Cần WASH-OUT 36h sau ngừng ACEi rồi mới bắt đầu sacubitril/valsartan (nguy cơ phù mạch)', severity: 2 }, { type: 'monitoring', description: 'Phù tăng + K máu cận trần (4.8) → cần đánh giá dùng furosemid và bắt đầu MRA cẩn thận', drugId: 'furosemid', resolution: 'Có thể tăng furosemid lên 80mg/ngày ngắn hạn; theo dõi K cẩn thận khi thêm spironolacton', severity: 2 } ], soapRubric: { subjective: ['Đánh giá NYHA functional class', 'Phù chân, đêm khó thở phải ngồi (orthopnea), khó thở kịch phát về đêm (PND)', 'Tăng/giảm cân tuần qua', 'Tuân thủ thuốc + chế độ ăn (muối)'], objective: ['EF 28% (HFrEF)', 'NT-proBNP 1800 (gợi ý đợt cấp)', 'K 4.8 (cận trần: thận trọng khi thêm MRA)', 'eGFR 55, creatinin 130', 'Phù 2 mắt cá chân, ran ẩm đáy phổi', 'HA và nhịp tim'], assessment: ['Suy tim HFrEF (EF 28%) đợt cấp: NYHA II→III', 'Chưa đạt phác đồ GDMT đầy đủ (thiếu MRA)', 'Liều BB dưới mục tiêu', 'Cân nhắc chuyển ACEi → ARNI'], plan: ['THÊM spironolacton 25mg/ngày: kiểm tra K + creatinin sau 1 tuần', 'TĂNG bisoprolol từ 5mg → 7.5mg sau 2 tuần (nếu dung nạp)', 'CÂN NHẮC chuyển lisinopril → sacubitril/valsartan (wash-out 36h)', 'TIẾP TỤC furosemid (có thể tăng nếu phù tiếp diễn)', 'Tiếp tục aspirin + atorvastatin (sau NMCT)', 'GIÁO DỤC: cân hằng ngày, hạn chế muối <2g/ngày, hạn chế dịch nếu Na thấp, dấu hiệu cần cấp cứu', 'Hẹn tái khám 2 tuần: đánh giá NYHA, K, creatinin'] }, keyLearningPoints: ['Phác đồ HFrEF tối ưu (GDMT) gồm 4 trụ cột: ACEi/ARB/ARNI + BB + MRA + SGLT2i', 'Bisoprolol mục tiêu 10mg/ngày trong suy tim (CIBIS-II)', 'Spironolacton cải thiện tử vong trong HFrEF (RALES trial): chỉ định khi NYHA II–IV', 'Khi chuyển ACEi → ARNI: WASH-OUT 36h để tránh phù mạch', 'Theo dõi K + creatinin sau khởi đầu/tăng liều MRA và ACEi'], specialties: ['cardio', 'renal'], difficulty: 5, usedInYears: [5] },
    { id: 'ca-007-thai-phu-viem-phoi', title: 'Ca 7 · Thai phụ 28 tuần viêm phổi cộng đồng, chọn kháng sinh an toàn', chiefComplaint: 'Sốt 38.7°C, ho có đờm xanh, đau ngực 3 ngày qua', history: `BN nữ 30 tuổi, thai 28 tuần (con đầu), sốt 38.7°C, ho khạc đờm xanh đặc, đau ngực phải khi hít sâu 3 ngày qua. Không tiền sử dị ứng thuốc. Chưa dùng kháng sinh. Khám: phổi phải có ran ẩm hạ đáy, SpO2 96% khí trời. X-quang: thâm nhiễm thuỳ dưới phổi phải.`, patient: { id: 'p-007', initials: 'P.T.N', ageYears: 30, sex: 'F', weightKg: 68, heightCm: 160, comorbidities: ['Thai 28 tuần (G1P0)'], currentMeds: ['acid-folic', 'sat-sulfat'], labs: { WBC: 14000, CRP: 85, SpO2: 96 }, allergies: [], pregnancy: 'Đang mang thai 28 tuần' }, prescriptions: [ { drugId: 'amoxicillin', dose: '1g', route: 'PO', frequency: '× 3/ngày', duration: '7 ngày' }, { drugId: 'azithromycin', dose: '500mg', route: 'PO', frequency: '× 1/ngày', duration: '3 ngày' } ], drps: [ { type: 'monitoring', description: 'Thai phụ: phải kiểm tra MỌI thuốc về pregnancy category trước khi kê', resolution: 'Amoxicillin (B) + azithromycin (B): AN TOÀN. KHÔNG dùng doxycyclin (D), ciprofloxacin/levofloxacin (C nhưng tránh), tetracyclin (D)', severity: 1 }, { type: 'monitoring', description: 'Viêm phổi ở thai phụ cần đánh giá nguy cơ NẶNG hơn (chèn ép phổi, giảm dự trữ chức năng)', resolution: 'Theo dõi sát SpO2, nhịp thở; cân nhắc nhập viện sớm nếu SpO2 <94% hoặc khó thở tăng', severity: 2 } ], soapRubric: { subjective: ['Triệu chứng hô hấp: ho, sốt, đau ngực', 'Tuần thai (ảnh hưởng dùng thuốc)', 'Tiền sử dị ứng kháng sinh', 'Yếu tố nguy cơ phổi không điển hình'], objective: ['Sốt 38.7°C, SpO2 96%', 'X-quang: thâm nhiễm thuỳ dưới phải', 'WBC 14000, CRP 85', 'Tim thai bình thường'], assessment: ['Viêm phổi cộng đồng (CAP) mức độ nhẹ ở thai phụ 28 tuần', 'CURB-65 không áp dụng đầy đủ cho thai phụ', 'Cần phác đồ KS phủ cả phế cầu và vi khuẩn không điển hình AN TOÀN VỚI THAI'], plan: ['Amoxicillin 1g × 3/ngày × 7 ngày (B: an toàn)', 'Azithromycin 500mg ngày 1, sau 250mg × 4 ngày HOẶC 500mg × 3 ngày (B: an toàn)', 'TRÁNH: fluoroquinolon (sụn), tetracyclin (răng + xương), trimethoprim-sulfamethoxazole (folate antagonist)', 'Paracetamol cho sốt (B: an toàn)', 'KHÔNG dùng aspirin/NSAID (D ở 3 tháng cuối)', 'Theo dõi tim thai + dấu hiệu chuyển dạ', 'Tái khám 48–72 giờ nếu không cải thiện'] }, keyLearningPoints: ['Thai phụ: KS an toàn nhất là penicillin (B) + cephalosporin (B) + macrolid (B, trừ clarithromycin C)', 'TRÁNH ở thai: fluoroquinolon, tetracyclin (sau 4 tháng), aminoglycosid (D), TMP-SMX 3 tháng cuối', 'Paracetamol là thuốc giảm đau-hạ sốt an toàn nhất khi mang thai', 'NSAID + aspirin: chống chỉ định 3 tháng cuối (đóng sớm ống động mạch)', 'Thai phụ viêm phổi cần đánh giá nặng hơn, ngưỡng nhập viện thấp hơn'], specialties: ['obgyn', 'respi', 'infect'], difficulty: 4, usedInYears: [4, 5] },
    { id: 'ca-008-nguoi-gia-nga', title: 'Ca 8 · Cụ ông 82 tuổi té ngã, review thuốc Beers + STOPP', chiefComplaint: 'Ngã trong phòng tắm sáng nay, đau hông trái', history: `BN nam 82 tuổi, sống cùng vợ. Bệnh nền: THA, ĐTĐ type 2, mất ngủ mãn, tăng tiền liệt tuyến lành tính, đau khớp gối mạn. Đang dùng 9 thuốc: amlodipin 10mg, hydrochlorothiazid 25mg, metformin 1000mg×2, gliclazid 60mg, diazepam 5mg tối (10 năm), diclofenac 50mg×3 PRN, omeprazol 20mg, oxybutynin (cho tiền liệt), diphenhydramin tối. Té ngã sáng nay sau khi đứng dậy. HA đứng 105/65 (nằm 135/85). Đường máu 4.2 mmol/L.`, patient: { id: 'p-008', initials: 'V.D.T', ageYears: 82, sex: 'M', weightKg: 60, heightCm: 165, comorbidities: ['THA', 'ĐTĐ type 2', 'Mất ngủ mãn', 'Tăng sản tiền liệt tuyến lành tính', 'Thoái hoá khớp gối'], currentMeds: ['amlodipin', 'hydrochlorothiazid', 'metformin', 'gliclazid', 'diazepam', 'diclofenac', 'omeprazol'], labs: { eGFR: 48, glucose: 4.2, K: 3.4, Na: 134 }, allergies: [] }, prescriptions: [ { drugId: 'amlodipin', dose: '10mg', route: 'PO', frequency: '× 1/ngày', duration: 'dài hạn' }, { drugId: 'hydrochlorothiazid', dose: '25mg', route: 'PO', frequency: '× 1/ngày', duration: 'dài hạn' }, { drugId: 'metformin', dose: '1000mg', route: 'PO', frequency: '× 2/ngày', duration: 'dài hạn' }, { drugId: 'gliclazid', dose: '60mg', route: 'PO', frequency: '× 1/ngày', duration: 'dài hạn' }, { drugId: 'diazepam', dose: '5mg', route: 'PO', frequency: '× 1/ngày tối', duration: '10 năm' }, { drugId: 'diclofenac', dose: '50mg', route: 'PO', frequency: '× 3/ngày khi đau', duration: 'PRN' }, { drugId: 'omeprazol', dose: '20mg', route: 'PO', frequency: '× 1/ngày', duration: 'dài hạn' } ], drps: [ { type: 'contraindication', description: 'Diazepam ở cụ 82t, Beers list: cấm BZD tác dụng dài; ngã, lú lẫn, lệ thuộc', drugId: 'diazepam', resolution: 'Cắt giảm diazepam DẦN (25%/2 tuần) → ngừng hoàn toàn; thay bằng CBT-I, melatonin liều thấp', severity: 3 }, { type: 'contraindication', description: 'Diclofenac ở cụ 82t có eGFR 48, STOPP: NSAID + suy thận; tăng nguy cơ NMCT, suy thận cấp, loét', drugId: 'diclofenac', resolution: 'Ngừng diclofenac; chuyển sang paracetamol 1g × 3–4/ngày (max 3g ở người già); chườm + vật lý trị liệu', severity: 3 }, { type: 'dose-high', description: 'Hạ HA tư thế (135/85 nằm → 105/65 đứng) gợi ý quá liều thuốc hạ HA: amlodipin 10mg + HCTZ 25mg', drugId: 'amlodipin', resolution: 'Giảm amlodipin xuống 5mg HOẶC ngừng HCTZ (đặc biệt K thấp 3.4)', severity: 3 }, { type: 'dose-high', description: 'Đường máu 4.2 mmol/L: hạ ĐH ở BN dùng gliclazid + metformin → góp phần té ngã', drugId: 'gliclazid', resolution: 'Giảm gliclazid xuống 30mg; mục tiêu HbA1c 7.5–8% cho cụ 82t', severity: 3 }, { type: 'no-indication', description: 'Omeprazol dài hạn: nguy cơ gãy xương hông, thiếu B12, Mg, viêm phổi', drugId: 'omeprazol', resolution: 'Đánh giá lại chỉ định; nếu chỉ phòng loét do NSAID → khi ngừng NSAID có thể step-down PPI', severity: 2 } ], soapRubric: { subjective: ['Hoàn cảnh té ngã (đứng dậy nhanh? đêm? khi đi tắm?)', 'Tiền sử ngã trong 1 năm qua', 'Triệu chứng chóng mặt, hồi hộp, hạ ĐH', 'Liều và thời gian dùng từng thuốc (đặc biệt diazepam 10 năm)'], objective: ['HA nằm 135/85 vs đứng 105/65 = hạ HA tư thế', 'Glucose máu 4.2 mmol/L = hạ ĐH', 'K 3.4 (hạ K: do HCTZ)', 'eGFR 48 (CKD giai đoạn 3a)', 'Kiểm tra mắt cá chân (Romberg test, Timed Up and Go)'], assessment: ['Té ngã đa yếu tố do polypharmacy', 'Hạ HA tư thế do quá liều hạ HA + lợi tiểu', 'Hạ ĐH do sulfonylurea + chế độ ăn người già', 'Bệnh nhân nằm trong Beers list cho diazepam, diclofenac'], plan: ['DEPRESCRIBE, đơn giản hoá phác đồ:', '1. Diazepam: cắt giảm 25%/2 tuần → ngừng; thay melatonin 1–3mg tối', '2. Diclofenac: NGỪNG NGAY → chuyển paracetamol 500mg–1g × 3/ngày', '3. Amlodipin giảm 10 → 5mg HOẶC ngừng HCTZ', '4. Gliclazid giảm 60 → 30mg; mục tiêu HbA1c 7.5–8.0%', '5. Omeprazol step-down sau khi ngừng NSAID', '6. Bổ sung K nếu vẫn dùng HCTZ', 'GIÁO DỤC: đứng dậy chậm, gậy chống, nhà tắm có tay vịn', 'Hẹn tái khám 2 tuần: theo dõi HA, ĐH, đường huyết tự đo', 'Đo mật độ xương + bổ sung vitamin D + calci'] }, keyLearningPoints: ['Beers Criteria, danh sách thuốc nên TRÁNH ở người ≥65t: BZD, anticholinergic, NSAID, sulfonylurea tác dụng dài', 'STOPP/START, bộ tiêu chuẩn châu Âu: STOPP = thuốc cần ngừng, START = thuốc cần bắt đầu', 'Té ngã ở người già: đo HA tư thế (nằm-ngồi-đứng) bắt buộc', 'Mục tiêu HbA1c người ≥75t: 7.5–8.0% (không ép xuống <7%)', 'Polypharmacy ≥5 thuốc = yếu tố nguy cơ độc lập của té ngã', 'Deprescribing là kỹ năng cốt lõi của dược sĩ lâm sàng người già'], specialties: ['geri', 'cardio', 'endo'], difficulty: 5, usedInYears: [5] },
    { id: 'ca-009-loet-hp', title: 'Ca 9 · BN loét dạ dày + H.pylori dương: phác đồ 4 thuốc và tuân thủ', chiefComplaint: 'Đau bụng thượng vị âm ỉ 2 tháng, ợ hơi, ợ chua', history: `BN nữ 45 tuổi, đau thượng vị 2 tháng, đặc biệt sau ăn 1–2 giờ, đôi khi đêm. Ợ chua, đầy bụng. Nội soi: loét tá tràng D1 (loét nông 8mm), CLO test (+). Đã uống omeprazol OTC 2 tuần đỡ ít. Không dùng NSAID. Không hút thuốc, uống rượu thỉnh thoảng. Không dị ứng. Không có thai.`, patient: { id: 'p-009', initials: 'D.T.M', ageYears: 45, sex: 'F', weightKg: 55, heightCm: 158, comorbidities: ['Loét tá tràng', 'Nhiễm H.pylori'], currentMeds: [], labs: { Hb: 13, ALT: 25 }, allergies: [] }, prescriptions: [ { drugId: 'omeprazol', dose: '20mg', route: 'PO', frequency: '× 2/ngày trước ăn 30 phút', duration: '14 ngày' }, { drugId: 'amoxicillin', dose: '1g', route: 'PO', frequency: '× 2/ngày', duration: '14 ngày' }, { drugId: 'clarithromycin', dose: '500mg', route: 'PO', frequency: '× 2/ngày', duration: '14 ngày' }, { drugId: 'metronidazol', dose: '500mg', route: 'PO', frequency: '× 2/ngày', duration: '14 ngày' } ], drps: [ { type: 'monitoring', description: 'Tỷ lệ kháng clarithromycin tại VN >20% (theo nghiên cứu BYT): phác đồ tam trị PAC có thể thất bại', drugId: 'clarithromycin', resolution: 'Ưu tiên phác đồ 4 thuốc (đồng thời concomitant): PPI + amoxicillin + clarithromycin + metronidazol × 14 ngày HOẶC phác đồ bismuth (nếu có)', severity: 2 }, { type: 'adherence', description: 'Phác đồ 4 thuốc × 14 ngày = >50 viên thuốc/tuần: nguy cơ không tuân thủ cao', resolution: 'Tư vấn kỹ: viết lịch dùng thuốc, dùng hộp chia liều, giải thích KHÔNG bỏ giữa chừng (gây kháng kháng sinh)', severity: 2 }, { type: 'interaction', description: 'Metronidazol + rượu = phản ứng disulfiram (đỏ mặt, nôn, hồi hộp)', drugId: 'metronidazol', resolution: 'TUYỆT ĐỐI kiêng rượu trong và 48 giờ sau ngưng metronidazol', severity: 2 } ], soapRubric: { subjective: ['Đặc điểm đau (thượng vị, sau ăn 1–2h, đêm)', 'Tiền sử dùng NSAID, aspirin, corticoid', 'Hút thuốc, uống rượu', 'Tiền sử dị ứng (đặc biệt penicillin)', 'Khả năng tuân thủ phác đồ dài'], objective: ['Nội soi: loét tá tràng D1 (8mm)', 'CLO test (+) → H.pylori (+)', 'Hb 13 (không thiếu máu)', 'Không có dấu hiệu báo động (sụt cân, nôn máu, đại tiện đen)'], assessment: ['Loét tá tràng có H.pylori (+): chỉ định diệt H.pylori', 'BN không tiền sử dùng macrolid → có thể ưu tiên phác đồ chứa clarithromycin nhưng VN có kháng cao', 'Loét nhỏ, không biến chứng: không cần nhập viện'], plan: ['PHÁC ĐỒ 4 THUỐC ĐỒNG THỜI 14 ngày (theo Maastricht VI và Hội Tiêu hoá VN):', '- Omeprazol 20mg × 2/ngày trước ăn 30 phút', '- Amoxicillin 1g × 2/ngày', '- Clarithromycin 500mg × 2/ngày', '- Metronidazol 500mg × 2/ngày', 'Sau 14 ngày KS: tiếp tục omeprazol đơn trị 4–8 tuần nữa cho lành loét', 'XÉT NGHIỆM lại H.pylori sau 4 tuần ngừng KS (urea breath test hoặc test phân kháng nguyên): KHÔNG dùng huyết thanh', 'TƯ VẤN BN: kiêng rượu, uống đủ thuốc đúng giờ, tác dụng phụ tạm thời (vị kim loại, tiêu chảy nhẹ)', 'Ngừng cà phê, hút thuốc; ăn nhỏ chia nhiều bữa'] }, keyLearningPoints: ['VN có tỷ lệ kháng clarithromycin >20% → phác đồ 3 thuốc PAC dần kém hiệu quả; ưu tiên phác đồ 4 thuốc đồng thời hoặc bismuth', 'Diệt H.pylori cần 14 ngày (không phải 7) theo Maastricht VI', 'Metronidazol + rượu = phản ứng disulfiram-like (kiêng rượu 48h sau ngừng)', 'Đánh giá thành công sau ≥4 tuần ngừng KS bằng test thở urea HOẶC kháng nguyên phân (KHÔNG huyết thanh)', 'PPI + clarithromycin: clarithromycin ức chế CYP3A4 → kiểm tra tương tác với thuốc khác BN đang dùng', 'Tuân thủ là yếu tố quyết định thành công, phải tư vấn kỹ'], specialties: ['gi', 'infect'], difficulty: 4, usedInYears: [4, 5] },
    { id: 'ca-010-dot-quy', title: 'Ca 10 · Đột quỵ thiếu máu não cấp, cửa sổ tPA và chống đông dài hạn', chiefComplaint: 'Yếu nửa người phải đột ngột 1 giờ trước', history: `BN nam 70 tuổi, đang ăn sáng thì đột ngột tay phải buông đũa, miệng méo, nói lắp 1 giờ trước. Vợ gọi 115 → đến cấp cứu sau 1h45'. Tiền sử: rung nhĩ phát hiện 6 tháng trước (chưa dùng chống đông vì sợ chảy máu), THA, ĐTĐ type 2. Đang dùng: amlodipin 5mg, metformin 1000mg×2, aspirin 81mg. HA vào viện 175/95, nhịp 105 không đều. NIHSS 9. CT sọ: không xuất huyết, ASPECTS 9. CT mạch: tắc động mạch não giữa trái M2.`, patient: { id: 'p-010', initials: 'L.T.S', ageYears: 70, sex: 'M', weightKg: 65, heightCm: 168, comorbidities: ['Rung nhĩ không van', 'Tăng huyết áp', 'ĐTĐ type 2'], currentMeds: ['amlodipin', 'metformin', 'aspirin'], labs: { glucose: 8.2, INR: 1.0, platelet: 220, eGFR: 60, BP: '175/95', NIHSS: 9, ASPECTS: 9 }, allergies: [] }, prescriptions: [ { drugId: 'aspirin', dose: '81mg', route: 'PO', frequency: '× 1/ngày', duration: 'dài hạn (trước đột quỵ)' } ], drps: [ { type: 'untreated', description: 'Rung nhĩ với CHA2DS2-VASc cao (tuổi 70 + THA + ĐTĐ = 4) → CẦN chống đông; aspirin KHÔNG đủ phòng đột quỵ trong AF', drugId: 'aspirin', resolution: 'Sau giai đoạn cấp (3–14 ngày tuỳ kích thước nhồi máu), khởi đầu DOAC (apixaban 5mg×2 hoặc dabigatran 150mg×2 hoặc rivaroxaban 20mg): KHÔNG dùng warfarin trừ chỉ định đặc biệt; NGỪNG aspirin (không cộng tích lợi ích, tăng chảy máu)', severity: 3 }, { type: 'monitoring', description: 'Cửa sổ alteplase (tPA) IV: <4.5h từ khởi phát; BN này 1h45 vào viện + thời gian đánh giá → trong cửa sổ', resolution: 'Kiểm tra chống chỉ định (HA <185/110, INR <1.7, không xuất huyết, không phẫu thuật gần), hạ HA nếu cần (labetalol/nicardipin), cho alteplase 0.9 mg/kg (10% bolus + 90% truyền 1h)', severity: 3 }, { type: 'monitoring', description: 'Tắc động mạch lớn (LVO: M2) + NIHSS 9 → CÂN NHẮC lấy huyết khối cơ học (thrombectomy) trong 6–24h', resolution: 'Hội chẩn ngay với khoa thần kinh can thiệp; tiêu chuẩn DAWN/DEFUSE-3 nếu vào sau 6h', severity: 3 }, { type: 'dose-high', description: 'HA 175/95: chấp nhận được cho tPA (giới hạn <185/110); sau tPA cần giữ <180/105', drugId: 'amlodipin', resolution: 'Trong giai đoạn cấp KHÔNG hạ HA tích cực (chỉ hạ nếu >220/120 hoặc cho tPA); sau ổn định: kiểm soát HA mục tiêu <140/90', severity: 2 } ], soapRubric: { subjective: ['Thời gian KHỞI PHÁT triệu chứng (quyết định cửa sổ tPA)', 'Triệu chứng: yếu, méo miệng, nói khó, mất ý thức?', 'Tiền sử AF, đột quỵ, chảy máu, phẫu thuật gần', 'Thuốc hiện tại (đặc biệt chống đông, chống tiểu cầu)'], objective: ['NIHSS 9 (mức độ vừa-nặng)', 'CT không xuất huyết, ASPECTS 9 (vùng nhồi máu chưa rõ)', 'CT mạch: LVO ở M2 trái', 'HA 175/95, glucose 8.2', 'INR 1.0, tiểu cầu 220'], assessment: ['Đột quỵ thiếu máu não cấp do AF (tim mạch)', 'Trong cửa sổ tPA + cửa sổ thrombectomy', 'AF chưa được chống đông → đột quỵ là biến cố có thể PHÒNG được'], plan: ['CẤP TÍNH:', '1. Kiểm tra điều kiện tPA, KHÔNG có chống chỉ định → alteplase 0.9 mg/kg IV (max 90mg): 10% bolus 1 phút + 90% truyền 1h', '2. Đồng thời hội chẩn thần kinh can thiệp cho thrombectomy', '3. Hạ HA chỉ nếu >185/110 trước tPA (labetalol 10mg IV)', '4. Theo dõi NIHSS mỗi 15 phút × 2h, 30 phút × 6h, 60 phút × 24h', '5. CT sọ kiểm tra sau 24h trước khi khởi đầu chống đông', 'TIẾP THEO (sau 24h ổn định):', '6. Khởi đầu DOAC (apixaban 5mg × 2, chỉnh liều nếu ≥2 trong: tuổi ≥80, cân nặng ≤60kg, creatinin ≥1.5)', '7. NGỪNG aspirin (không phối hợp DOAC trừ chỉ định đặc biệt)', '8. Kiểm soát HA <140/90, ĐTĐ HbA1c <7%, statin (atorvastatin 80mg)', '9. Phục hồi chức năng sớm'] }, keyLearningPoints: ['Cửa sổ alteplase IV: 4.5 giờ từ khởi phát; cửa sổ thrombectomy có thể đến 24h ở BN chọn lọc', 'Rung nhĩ với CHA2DS2-VASc ≥2 (nam) hoặc ≥3 (nữ): bắt buộc chống đông; aspirin KHÔNG đủ', 'DOAC (apixaban, dabigatran, rivaroxaban, edoxaban) ưu tiên hơn warfarin trong AF không van: ít chảy máu nội sọ, không cần INR', 'Sau đột quỵ thiếu máu: không khởi đầu chống đông ngay, chờ 1–14 ngày tuỳ kích thước nhồi máu', 'Sau đột quỵ: KHÔNG kết hợp aspirin + DOAC trừ có stent vành mới đặt', 'Apixaban giảm liều khi có ≥2 trong: tuổi ≥80, cân ≤60kg, creatinin ≥1.5 mg/dL'], specialties: ['neuro', 'cardio'], difficulty: 5, usedInYears: [5] },
];

/** @param {string} id */
export function getCase(id) { return CASES.find(c => c.id === id); }

/** @param {string} specialty */
export function getCasesBySpecialty(specialty) {
  return CASES.filter(c => c.specialties.includes(specialty));
}

/** @param {number} difficulty */
export function getCasesByDifficulty(diff) {
  return CASES.filter(c => c.difficulty === diff);
}
