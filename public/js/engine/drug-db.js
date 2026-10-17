// ============================================================
// DrugDB v2 — Catalog thuốc đầy đủ cho 38 module 5 năm Dược
// ============================================================
// Schema xem trong types.js (typedef Drug).
//
// Triết lý:
//   - Tất cả thuốc đều có TRƯỜNG TỐI THIỂU (id, inn, nameVN, atc, atcL1,
//     therapeuticClass, pharmClass, forms, rxStatus, color) — dùng được
//     cho Năm 1–2.
//   - Trường NÂNG CAO (pk, dosing, safety) có thể OPTIONAL — bổ sung dần
//     khi module cần. Năm 3 cần pharmClass + mechanism; Năm 4 cần dosing +
//     safety; Năm 5 cần đầy đủ.
//   - Backward-compat: vẫn xuất ra MEDICINES với schema cũ (id, name,
//     dose, form, short, category, color, atc, indication) để các game
//     hiện tại không gãy.
// ============================================================

/** @type {import('./types.js').Drug[]} */
export const DRUGS = [
  // ────────── KHÁNG SINH (J — Anti-infectives) ──────────
  {
    id: 'amoxicillin',
    inn: 'Amoxicillin',
    nameVN: 'Amoxicilin',
    brandNames: ['Augmentin', 'Klamentin', 'Amoxil'],
    atc: 'J01CA04',
    atcL1: 'J',
    short: 'AMOX',
    therapeuticClass: 'Kháng sinh',
    pharmClass: 'Penicillin phổ rộng (Beta-lactam)',
    mechanism: 'Ức chế tổng hợp peptidoglycan thành tế bào vi khuẩn (gắn PBP)',
    target: 'PBP (Penicillin-Binding Protein)',
    forms: [
      { form: 'Viên nang', strength: '500mg', route: 'PO', vnBrand: 'Augmentin' },
      { form: 'Bột pha hỗn dịch', strength: '125mg/5mL', route: 'PO' },
      { form: 'Tiêm', strength: '1g', route: 'IV' },
    ],
    pk: {
      bioavailability: 0.95, halfLifeH: 1.3, proteinBinding: 0.18,
      metabolism: 'Ít chuyển hoá', elimination: 'Renal 60–70% nguyên dạng',
      onsetMin: 30, durationH: 6,
    },
    indications: ['Nhiễm khuẩn hô hấp trên/dưới', 'Tiết niệu', 'Da và mô mềm', 'H.pylori (phối hợp)'],
    dosing: {
      adult: '500mg × 3 lần/ngày × 7–10 ngày',
      pediatric: '25–50 mg/kg/ngày chia 3 lần',
      renal: 'CrCl <30: kéo dài khoảng cách lên 12h',
      maxDaily: '6g/ngày',
    },
    safety: {
      contraindications: ['Quá mẫn với β-lactam'],
      commonAdverse: ['Tiêu chảy', 'Buồn nôn', 'Phát ban'],
      seriousAdverse: ['Sốc phản vệ', 'Steven-Johnson syndrome'],
      interactionsMajor: ['methotrexate', 'warfarin'],
      pregnancyCat: 'B',
      lactation: 'safe',
    },
    rxStatus: 'Rx',
    color: '#43a047', icon: '💊',
    smiles: 'CC1([C@@H](N2[C@H](S1)[C@@H](C2=O)NC(=O)[C@@H](C3=CC=C(C=C3)O)N)C(=O)O)C',
    usedInYears: [2, 3, 4, 5],
    keyPoints: [
      'Phổ rộng nhưng kém bền với β-lactamase',
      'Phải hỏi dị ứng penicillin TRƯỚC khi kê',
      'Trẻ em: theo cân nặng, không theo tuổi',
    ],
  },

  {
    id: 'aspirin',
    inn: 'Acetylsalicylic acid',
    nameVN: 'Aspirin',
    brandNames: ['Aspirin pH8', 'Aspegic'],
    atc: 'B01AC06', atcL1: 'B', short: 'ASP',
    therapeuticClass: 'Tim mạch',
    pharmClass: 'NSAID · Chống kết tập tiểu cầu',
    mechanism: 'Ức chế không hồi phục COX-1 → giảm TXA2 → chống kết tập tiểu cầu',
    target: 'COX-1 (irreversible)',
    forms: [
      { form: 'Viên nén', strength: '81mg', route: 'PO' },
      { form: 'Viên nén', strength: '325mg', route: 'PO' },
    ],
    pk: { bioavailability: 0.7, halfLifeH: 0.3, proteinBinding: 0.85, metabolism: 'Hepatic → acid salicylic' },
    indications: ['Phòng nhồi máu cơ tim', 'Phòng đột quỵ', 'Hạ sốt (liều cao)'],
    dosing: {
      adult: '75–100mg/ngày (phòng huyết khối)',
      pediatric: 'KHÔNG dùng dưới 16 tuổi do nguy cơ hội chứng Reye (BNF/MHRA UK 2003)',
      maxDaily: '4g/ngày (đau, kháng viêm)',
    },
    safety: {
      contraindications: ['Loét dạ dày đang chảy máu', 'Hen do NSAID', 'Trẻ <16 tuổi đang sốt do virus (Reye)'],
      warnings: ['Phối hợp warfarin → chảy máu', 'Suy thận'],
      commonAdverse: ['Khó tiêu', 'Chảy máu nhẹ'],
      seriousAdverse: ['Xuất huyết tiêu hoá', 'Sốc phản vệ', 'Hội chứng Reye'],
      interactionsMajor: ['warfarin', 'methotrexate', 'ibuprofen'],
      pregnancyCat: 'C (D 3 tháng cuối)',
      lactation: 'caution',
    },
    rxStatus: 'OTC',
    color: '#e53935', icon: '💗',
    usedInYears: [2, 3, 4, 5],
    keyPoints: [
      'Liều phòng huyết khối (81–100mg) ≠ liều giảm đau (>300mg)',
      'Không dùng cho trẻ <12 tuổi đang sốt do virus',
      'Phối hợp với chống đông → tăng nguy cơ chảy máu',
    ],
  },

  {
    id: 'paracetamol',
    inn: 'Paracetamol',
    nameVN: 'Paracetamol',
    brandNames: ['Panadol', 'Efferalgan', 'Tylenol', 'Hapacol'],
    atc: 'N02BE01', atcL1: 'N', short: 'PARA',
    therapeuticClass: 'Giảm đau',
    pharmClass: 'Giảm đau – hạ sốt non-opioid',
    mechanism: 'Ức chế COX trung ương + hoạt hoá đường serotonin descending (chưa rõ hoàn toàn)',
    forms: [
      { form: 'Viên nén', strength: '500mg', route: 'PO' },
      { form: 'Viên sủi', strength: '500mg', route: 'PO' },
      { form: 'Siro', strength: '120mg/5mL', route: 'PO' },
      { form: 'Đặt hậu môn', strength: '150mg', route: 'rectal' },
      { form: 'Tiêm', strength: '1g/100mL', route: 'IV' },
    ],
    pk: { bioavailability: 0.88, halfLifeH: 2, proteinBinding: 0.25, metabolism: 'Hepatic CYP2E1 → NAPQI (độc gan)' },
    indications: ['Đau nhẹ–vừa', 'Hạ sốt'],
    dosing: {
      adult: '500–1000mg × 4–6 lần/ngày',
      pediatric: '10–15 mg/kg × 4–6 lần/ngày',
      hepatic: 'Tránh hoặc giảm 50% (Child-Pugh B/C)',
      maxDaily: '4g/ngày (3g nếu nghiện rượu hoặc gan yếu)',
    },
    safety: {
      contraindications: ['Suy gan nặng', 'Quá mẫn'],
      warnings: ['Quá liều → hoại tử gan cấp; xử trí: N-acetylcystein <8h'],
      pregnancyCat: 'B', lactation: 'safe',
    },
    rxStatus: 'OTC',
    color: '#1e88e5', icon: '🩹',
    usedInYears: [1, 2, 3, 4, 5],
    keyPoints: [
      'Liều tối đa 4g/ngày, quá liều phá huỷ gan qua chuyển hoá NAPQI',
      'An toàn nhất khi có thai',
      'Không cộng đồng vận với rượu',
    ],
  },

  // ────────── TIM MẠCH (C — Cardiovascular) ──────────
  {
    id: 'amlodipin',
    inn: 'Amlodipine',
    nameVN: 'Amlodipin',
    brandNames: ['Amlor', 'Norvasc'],
    atc: 'C08CA01', atcL1: 'C', short: 'AMLO',
    therapeuticClass: 'Huyết áp',
    pharmClass: 'Chẹn kênh Canxi DHP (Dihydropyridine)',
    mechanism: 'Chẹn kênh L-Ca²⁺ chọn lọc trên mạch máu → giãn mạch',
    target: 'L-type calcium channel',
    forms: [{ form: 'Viên nén', strength: '5mg', route: 'PO' }, { form: 'Viên nén', strength: '10mg', route: 'PO' }],
    pk: { bioavailability: 0.64, halfLifeH: 35, proteinBinding: 0.93, metabolism: 'Hepatic CYP3A4', cypInteractions: ['CYP3A4 substrate'] },
    indications: ['Tăng huyết áp', 'Đau thắt ngực ổn định', 'Đau thắt ngực Prinzmetal'],
    dosing: { adult: '5–10mg × 1 lần/ngày', elderly: 'Bắt đầu 2.5mg', hepatic: 'Giảm liều', maxDaily: '10mg' },
    safety: {
      commonAdverse: ['Phù mắt cá chân', 'Đỏ bừng mặt', 'Đau đầu', 'Đánh trống ngực'],
      interactionsModerate: ['simvastatin (giảm liều simva)', 'clarithromycin'],
      pregnancyCat: 'C',
    },
    rxStatus: 'Rx', color: '#be185d', icon: '❤️',
    usedInYears: [3, 4, 5],
    keyPoints: ['t½ rất dài (35h) → tác dụng 24h, dùng 1 lần/ngày', 'Phù chân là ADR điển hình', 'Tương tác CYP3A4'],
  },

  {
    id: 'atorvastatin',
    inn: 'Atorvastatin',
    nameVN: 'Atorvastatin',
    brandNames: ['Lipitor', 'Atorlip'],
    atc: 'C10AA05', atcL1: 'C', short: 'ATOR',
    therapeuticClass: 'Mỡ máu',
    pharmClass: 'Statin (Ức chế HMG-CoA reductase)',
    mechanism: 'Ức chế HMG-CoA reductase → giảm tổng hợp cholesterol gan → tăng LDL receptor',
    forms: [{ form: 'Viên nén', strength: '10mg', route: 'PO' }, { form: 'Viên nén', strength: '20mg', route: 'PO' }, { form: 'Viên nén', strength: '40mg', route: 'PO' }],
    pk: { bioavailability: 0.14, halfLifeH: 14, proteinBinding: 0.98, metabolism: 'Hepatic CYP3A4', cypInteractions: ['CYP3A4 substrate'] },
    indications: ['Tăng cholesterol máu', 'Phòng tim mạch nguyên phát/thứ phát'],
    dosing: { adult: '10–80mg buổi tối', hepatic: 'Tránh dùng nếu men gan tăng >3× ULN', maxDaily: '80mg' },
    safety: {
      contraindications: ['Bệnh gan đang hoạt động', 'Có thai', 'Cho con bú'],
      seriousAdverse: ['Tiêu cơ vân (rhabdomyolysis)', 'Tăng men gan'],
      interactionsMajor: ['clarithromycin', 'erythromycin', 'cyclosporin', 'gemfibrozil', 'grapefruit juice'],
      pregnancyCat: 'X',
    },
    rxStatus: 'Rx', color: '#0891b2', icon: '🩸',
    usedInYears: [3, 4, 5],
    keyPoints: ['Uống buổi tối (HMG-CoA hoạt động cao nhất ban đêm)', 'Theo dõi CK + ALT định kỳ', 'TUYỆT ĐỐI tránh khi có thai'],
  },

  // ────────── TIÊU HOÁ / DẠ DÀY (A) ──────────
  {
    id: 'omeprazol',
    inn: 'Omeprazole',
    nameVN: 'Omeprazol',
    brandNames: ['Losec', 'Omez'],
    atc: 'A02BC01', atcL1: 'A', short: 'OMEP',
    therapeuticClass: 'Dạ dày',
    pharmClass: 'Ức chế bơm proton (PPI)',
    mechanism: 'Ức chế không hồi phục H⁺/K⁺-ATPase tế bào viền dạ dày',
    forms: [{ form: 'Viên nang', strength: '20mg', route: 'PO' }, { form: 'Tiêm', strength: '40mg', route: 'IV' }],
    pk: { bioavailability: 0.4, halfLifeH: 1, proteinBinding: 0.95, metabolism: 'Hepatic CYP2C19', cypInteractions: ['CYP2C19 inhibitor'] },
    indications: ['Loét dạ dày–tá tràng', 'GERD', 'H.pylori (phối hợp)', 'Zollinger-Ellison'],
    dosing: { adult: '20–40mg buổi sáng, trước ăn 30 phút', maxDaily: '40mg (loét), 80mg (Zollinger)' },
    safety: {
      warnings: ['Dùng dài hạn → loãng xương, thiếu Mg, B12'],
      interactionsMajor: ['clopidogrel (giảm hoạt tính)', 'methotrexate', 'rilpivirine'],
      pregnancyCat: 'C',
    },
    rxStatus: 'Rx', color: '#5e35b1', icon: '🫧',
    usedInYears: [3, 4, 5],
    keyPoints: ['Uống trước ăn sáng 30 phút', 'Ức chế CYP2C19 → giảm hoạt clopidogrel', 'Dùng dài hạn cần đánh giá nguy cơ'],
  },

  {
    id: 'smecta',
    inn: 'Diosmectite',
    nameVN: 'Diosmectit',
    brandNames: ['Smecta'],
    atc: 'A07BC05', atcL1: 'A', short: 'SME',
    therapeuticClass: 'Tiêu hóa',
    pharmClass: 'Chất hấp phụ silicat',
    mechanism: 'Hấp phụ vi khuẩn, độc tố + tăng độ nhớt chất nhầy bảo vệ niêm mạc',
    forms: [{ form: 'Bột pha', strength: '3g', route: 'PO' }],
    indications: ['Tiêu chảy cấp', 'Đau dạ dày', 'Trào ngược thực quản'],
    dosing: { adult: '1 gói × 3 lần/ngày', pediatric: 'Trẻ <1t: 1 gói/ngày; 1–2t: 1–2 gói; >2t: 2–3 gói chia 3' },
    safety: { commonAdverse: ['Táo bón'], warnings: ['Uống cách thuốc khác 2h (giảm hấp thu)'] },
    rxStatus: 'OTC', color: '#fb8c00', icon: '🫙',
    usedInYears: [2, 3, 4, 5],
  },

  // ────────── HÔ HẤP (R) ──────────
  {
    id: 'salbutamol-inh',
    inn: 'Salbutamol',
    nameVN: 'Salbutamol (Ventolin)',
    brandNames: ['Ventolin', 'Asthalin'],
    atc: 'R03AC02', atcL1: 'R', short: 'VENT',
    therapeuticClass: 'Hô hấp',
    pharmClass: 'Đồng vận β₂ ngắn (SABA)',
    mechanism: 'Kích thích β₂ adrenergic → giãn cơ trơn phế quản',
    target: 'β₂ adrenergic receptor',
    forms: [
      { form: 'Bình xịt định liều', strength: '100mcg/nhát', route: 'inhalation' },
      { form: 'Khí dung', strength: '2.5mg/2.5mL', route: 'inhalation' },
      { form: 'Siro', strength: '2mg/5mL', route: 'PO' },
    ],
    pk: { onsetMin: 5, durationH: 4 },
    indications: ['Cơn hen cấp', 'Co thắt phế quản', 'COPD đợt cấp'],
    dosing: { adult: 'Xịt 1–2 nhát mỗi 4–6h khi cần; cơn cấp: 4–8 nhát mỗi 20 phút × 3', pediatric: 'Tương tự với buồng đệm' },
    safety: {
      commonAdverse: ['Run tay', 'Hồi hộp', 'Đánh trống ngực', 'Hạ K máu'],
      warnings: ['Lạm dụng → giảm đáp ứng', 'Hen kiểm soát kém cần ICS'],
      pregnancyCat: 'C',
    },
    rxStatus: 'Rx', color: '#00897b', icon: '💨',
    usedInYears: [3, 4, 5],
    keyPoints: ['SABA: cắt cơn, không phòng', 'Lạm dụng = kiểm soát hen kém', 'Bình xịt → kèm buồng đệm cho trẻ'],
  },

  // ────────── ĐÁI THÁO ĐƯỜNG (A10) ──────────
  {
    id: 'metformin',
    inn: 'Metformin',
    nameVN: 'Metformin',
    brandNames: ['Glucophage', 'Glucofast'],
    atc: 'A10BA02', atcL1: 'A', short: 'METF',
    therapeuticClass: 'Tiểu đường',
    pharmClass: 'Biguanide',
    mechanism: 'Giảm tân tạo glucose gan + tăng nhạy insulin ngoại biên',
    forms: [{ form: 'Viên nén', strength: '500mg', route: 'PO' }, { form: 'Viên nén', strength: '850mg', route: 'PO' }, { form: 'Viên giải phóng kéo dài', strength: '750mg', route: 'PO' }],
    pk: { bioavailability: 0.55, halfLifeH: 6.5, proteinBinding: 0, metabolism: 'Không chuyển hoá', elimination: 'Renal 100% nguyên dạng' },
    indications: ['ĐTĐ type 2 (đầu tay)', 'Tiền ĐTĐ', 'Hội chứng buồng trứng đa nang (PCOS)'],
    dosing: {
      adult: '500mg × 2/ngày sau ăn, tăng dần đến 2000mg',
      renal: 'CrCl <30: CHỐNG CHỈ ĐỊNH (nguy cơ acidosis lactic)',
      maxDaily: '3000mg (BNF; 2550mg = 850mg × 3 nếu dùng dạng 850)',
    },
    safety: {
      contraindications: ['eGFR <30', 'Suy gan nặng', 'Acidosis lactic'],
      warnings: ['Ngưng 48h trước chụp cản quang', 'Suy tim mất bù', 'Theo dõi B12 mỗi 1–2 năm (BMJ 2020)'],
      commonAdverse: ['Tiêu chảy', 'Đau bụng', 'Buồn nôn (giảm khi uống sau ăn)'],
      seriousAdverse: ['Acidosis lactic (hiếm nhưng tử vong cao)'],
      pregnancyCat: 'B',
    },
    rxStatus: 'Rx', color: '#ea580c', icon: '🩸',
    usedInYears: [3, 4, 5],
    keyPoints: ['Đầu tay ĐTĐ type 2', 'Theo dõi eGFR thường xuyên', 'Ngưng trước chụp cản quang'],
  },

  {
    id: 'glibenclamid',
    inn: 'Glibenclamide',
    nameVN: 'Glibenclamid',
    brandNames: ['Daonil'],
    atc: 'A10BB01', atcL1: 'A', short: 'GLIB',
    therapeuticClass: 'Tiểu đường',
    pharmClass: 'Sulfonylurea thế hệ 2',
    mechanism: 'Đóng kênh K-ATP tế bào β tuỵ → khử cực → mở Ca²⁺ → tiết insulin',
    forms: [{ form: 'Viên nén', strength: '5mg', route: 'PO' }],
    pk: { bioavailability: 0.85, halfLifeH: 10, proteinBinding: 0.99, metabolism: 'Hepatic CYP2C9' },
    indications: ['ĐTĐ type 2 (sau metformin)'],
    dosing: { adult: '2.5–5mg trước ăn sáng, tăng dần', elderly: 'Tránh (nguy cơ hạ ĐH kéo dài)', renal: 'CrCl <50: thận trọng', maxDaily: '15mg' },
    safety: {
      contraindications: ['ĐTĐ type 1', 'Có thai', 'Suy thận/gan nặng', 'Người ≥65 tuổi (AGS Beers 2023: avoid)'],
      seriousAdverse: ['Hạ đường huyết KÉO DÀI (đặc biệt người già)'],
      interactionsMajor: ['warfarin', 'fluconazol', 'sulfamethoxazole'],
      pregnancyCat: 'C',
    },
    rxStatus: 'Rx', color: '#d97706', icon: '⚠️',
    usedInYears: [3, 4, 5],
    keyPoints: ['Nguy cơ hạ ĐH cao ở người già', 'Tránh trong suy thận', 'Tương tác nhiều thuốc qua CYP2C9'],
  },

  // ────────── CHỐNG VIÊM / DỊ ỨNG (M, R) ──────────
  {
    id: 'ibuprofen',
    inn: 'Ibuprofen',
    nameVN: 'Ibuprofen',
    brandNames: ['Brufen', 'Advil', 'Nurofen'],
    atc: 'M01AE01', atcL1: 'M', short: 'IBUP',
    therapeuticClass: 'Chống viêm',
    pharmClass: 'NSAID không chọn lọc',
    mechanism: 'Ức chế hồi phục COX-1 và COX-2 → giảm prostaglandin',
    forms: [{ form: 'Viên nén', strength: '400mg', route: 'PO' }, { form: 'Siro', strength: '100mg/5mL', route: 'PO' }],
    pk: { bioavailability: 0.8, halfLifeH: 2, proteinBinding: 0.99, metabolism: 'Hepatic CYP2C9' },
    indications: ['Đau nhẹ–vừa', 'Viêm khớp', 'Hạ sốt', 'Đau bụng kinh'],
    dosing: { adult: '400mg × 3–4 lần/ngày sau ăn', pediatric: '5–10 mg/kg × 3–4 lần', maxDaily: '2400mg' },
    safety: {
      contraindications: ['Loét dạ dày', 'Suy tim NYHA III–IV', 'Hen do NSAID', 'Suy thận nặng', 'Có thai 3 tháng cuối'],
      warnings: ['Tăng huyết áp', 'Suy thận cấp ở mất nước'],
      interactionsMajor: ['warfarin', 'lithium', 'methotrexate liều cao', 'aspirin (giảm tác dụng tim mạch)'],
      pregnancyCat: 'C (D 3 tháng cuối)',
    },
    rxStatus: 'OTC', color: '#65a30d', icon: '🦴',
    usedInYears: [2, 3, 4, 5],
    keyPoints: ['NSAID kinh điển: chú ý dạ dày + thận', 'KHÔNG dùng 3 tháng cuối thai kỳ', 'Có thể giảm tác dụng aspirin'],
  },

  {
    id: 'loratadin',
    inn: 'Loratadine',
    nameVN: 'Loratadin',
    brandNames: ['Clarityne', 'Lorastad'],
    atc: 'R06AX13', atcL1: 'R', short: 'LORA',
    therapeuticClass: 'Chống dị ứng',
    pharmClass: 'Kháng H1 thế hệ 2 (không an thần)',
    mechanism: 'Kháng cạnh tranh thụ thể H1, không qua hàng rào máu não',
    target: 'H1 receptor',
    forms: [{ form: 'Viên nén', strength: '10mg', route: 'PO' }, { form: 'Siro', strength: '5mg/5mL', route: 'PO' }],
    pk: { halfLifeH: 8, metabolism: 'Hepatic CYP3A4/2D6 → desloratadin (active)' },
    indications: ['Viêm mũi dị ứng', 'Mày đay', 'Ngứa do dị ứng'],
    dosing: { adult: '10mg × 1/ngày', pediatric: '2–5t: 5mg; >6t: 10mg', hepatic: '10mg cách ngày' },
    safety: { commonAdverse: ['Đau đầu nhẹ', 'Khô miệng (hiếm)'], pregnancyCat: 'B', lactation: 'safe' },
    rxStatus: 'OTC', color: '#8e24aa', icon: '🤧',
    usedInYears: [2, 3, 4, 5],
  },

  // ────────── VITAMIN + BỔ SUNG (A11) ──────────
  {
    id: 'vitamin-c',
    inn: 'Ascorbic acid',
    nameVN: 'Vitamin C',
    atc: 'A11GA01', atcL1: 'A', short: 'VITC',
    therapeuticClass: 'Vitamin',
    pharmClass: 'Vitamin tan trong nước',
    mechanism: 'Cofactor cho hydroxyl hoá collagen + chống oxy hoá',
    forms: [{ form: 'Viên sủi', strength: '1000mg', route: 'PO' }, { form: 'Viên nén', strength: '500mg', route: 'PO' }, { form: 'Tiêm', strength: '500mg', route: 'IV' }],
    indications: ['Phòng/chữa scorbut', 'Tăng đề kháng', 'Bổ sung sau phẫu thuật'],
    dosing: { adult: '60–500mg/ngày', maxDaily: '2g/ngày (quá liều → sỏi oxalat)' },
    safety: { warnings: ['Tiền sử sỏi thận: hạn chế liều cao'], pregnancyCat: 'A' },
    rxStatus: 'OTC', color: '#ffb300', icon: '🍊',
    usedInYears: [1, 2, 3, 4, 5],
  },

  // ────────── HORMONE (H) ──────────
  {
    id: 'levothyroxin',
    inn: 'Levothyroxine',
    nameVN: 'Levothyroxin',
    brandNames: ['Berlthyrox', 'Eltroxin'],
    atc: 'H03AA01', atcL1: 'H', short: 'LEVO',
    therapeuticClass: 'Tuyến giáp',
    pharmClass: 'Hormone giáp tổng hợp (T4)',
    mechanism: 'Bổ sung T4 → chuyển thành T3 ở mô → điều hoà chuyển hoá',
    forms: [{ form: 'Viên nén', strength: '50mcg', route: 'PO' }, { form: 'Viên nén', strength: '100mcg', route: 'PO' }],
    pk: { bioavailability: 0.7, halfLifeH: 168, proteinBinding: 0.99 },
    indications: ['Suy giáp', 'Bướu giáp', 'Sau cắt giáp'],
    dosing: {
      adult: '1.6 mcg/kg/ngày, uống lúc đói buổi sáng',
      elderly: 'Bắt đầu 25mcg, tăng dần',
      maxDaily: 'Cá thể hoá theo TSH',
    },
    safety: {
      warnings: ['Uống lúc đói, cách thuốc khác ≥ 4h (Ca, Fe, PPI giảm hấp thu)'],
      seriousAdverse: ['Quá liều → cường giáp, rung nhĩ ở người già'],
      pregnancyCat: 'A',
    },
    rxStatus: 'Rx', color: '#9333ea', icon: '🦋',
    usedInYears: [3, 4, 5],
    keyPoints: ['Uống lúc đói buổi sáng', 'Cách Ca, Fe, PPI ≥ 4h', 't½ rất dài (7 ngày)'],
  },

  // ────────── TÂM THẦN (N05) ──────────
  {
    id: 'diazepam',
    inn: 'Diazepam',
    nameVN: 'Diazepam',
    brandNames: ['Seduxen', 'Valium'],
    atc: 'N05BA01', atcL1: 'N', short: 'DIAZ',
    therapeuticClass: 'Tâm thần',
    pharmClass: 'Benzodiazepine tác dụng dài',
    mechanism: 'Kích hoạt GABA-A → tăng dòng Cl⁻ vào nơron → ức chế thần kinh',
    target: 'GABA-A receptor (vị trí BZD)',
    forms: [{ form: 'Viên nén', strength: '5mg', route: 'PO' }, { form: 'Tiêm', strength: '10mg/2mL', route: 'IV' }],
    pk: { bioavailability: 0.93, halfLifeH: 43, proteinBinding: 0.98, metabolism: 'Hepatic CYP3A4 → nordazepam (active, t½ 50–100h)' },
    indications: ['Lo âu nặng', 'Mất ngủ ngắn ngày', 'Co giật cấp', 'Cai rượu'],
    dosing: { adult: '2–10mg × 2–4 lần/ngày', elderly: 'Bắt đầu 2mg, tránh dài ngày', maxDaily: '40mg' },
    safety: {
      contraindications: ['Suy hô hấp nặng', 'Nhược cơ', 'Hội chứng ngừng thở khi ngủ'],
      warnings: ['Nguy cơ lệ thuộc sau 2–4 tuần', 'Người già: ngã, lú lẫn'],
      seriousAdverse: ['Ức chế hô hấp (đặc biệt + opioid)', 'Lệ thuộc'],
      interactionsMajor: ['opioid', 'rượu', 'CYP3A4 inhibitors'],
      pregnancyCat: 'D',
    },
    rxStatus: 'P',
    color: '#4338ca', icon: '😴',
    usedInYears: [3, 4, 5],
    keyPoints: ['Thuốc hướng tâm thần, kê đơn đặc biệt (P)', 'Tránh phối hợp opioid', 'Người già: bắt đầu liều thấp'],
  },

  // ────────── KHÁNG ĐÔNG (B01) — cho ca lâm sàng năm 5 ──────────
  {
    id: 'warfarin',
    inn: 'Warfarin',
    nameVN: 'Warfarin',
    brandNames: ['Coumadin'],
    atc: 'B01AA03', atcL1: 'B', short: 'WARF',
    therapeuticClass: 'Tim mạch',
    pharmClass: 'Chống đông kháng vitamin K',
    mechanism: 'Ức chế vitamin K epoxide reductase → giảm yếu tố II, VII, IX, X',
    forms: [{ form: 'Viên nén', strength: '1mg', route: 'PO' }, { form: 'Viên nén', strength: '2mg', route: 'PO' }, { form: 'Viên nén', strength: '5mg', route: 'PO' }],
    pk: { bioavailability: 1.0, halfLifeH: 40, proteinBinding: 0.99, metabolism: 'Hepatic CYP2C9/3A4/1A2', cypInteractions: ['CYP2C9 substrate'] },
    indications: ['Phòng huyết khối: van tim cơ học, AF, DVT/PE', 'Sau nhồi máu cơ tim'],
    dosing: { adult: '2.5–10mg/ngày, chỉnh theo INR (mục tiêu 2–3, van cơ học 2.5–3.5)', maxDaily: 'Theo INR' },
    safety: {
      contraindications: ['Đang chảy máu hoạt động', 'Phẫu thuật gần', 'Có thai (X)'],
      warnings: ['Theo dõi INR ≥ 1 lần/tháng', 'Thay đổi chế độ ăn ảnh hưởng INR'],
      seriousAdverse: ['Xuất huyết', 'Hoại tử da (hiếm)'],
      interactionsMajor: [
        'aspirin', 'amiodarone', 'clarithromycin', 'fluconazol', 'metronidazol',
        'TMP-SMX', 'NSAID', 'rifampin (giảm)', 'St. John\'s wort (giảm)',
      ],
      pregnancyCat: 'X',
    },
    rxStatus: 'Rx', color: '#dc2626', icon: '🩸',
    usedInYears: [4, 5],
    keyPoints: [
      'INR mục tiêu 2–3 (van cơ học: 2.5–3.5)',
      'TUYỆT ĐỐI tránh có thai',
      'Rất nhiều tương tác, luôn kiểm tra trước khi kê đơn',
    ],
  },

  // ────────── KHÁNG SINH BỔ SUNG cho ca lâm sàng ──────────
  {
    id: 'clarithromycin',
    inn: 'Clarithromycin',
    nameVN: 'Clarithromycin',
    brandNames: ['Klacid', 'Klabax'],
    atc: 'J01FA09', atcL1: 'J', short: 'CLAR',
    therapeuticClass: 'Kháng sinh',
    pharmClass: 'Macrolide',
    mechanism: 'Gắn 50S ribosome → ức chế tổng hợp protein',
    forms: [{ form: 'Viên nén', strength: '500mg', route: 'PO' }],
    pk: { halfLifeH: 5, metabolism: 'Hepatic CYP3A4', cypInteractions: ['CYP3A4 strong inhibitor'] },
    indications: ['Nhiễm khuẩn hô hấp', 'H.pylori (phối hợp)', 'Da và mô mềm'],
    dosing: { adult: '500mg × 2/ngày × 7–14 ngày' },
    safety: {
      warnings: ['QT prolongation', 'CYP3A4 mạnh: tương tác simvastatin, warfarin, amlodipin…'],
      interactionsMajor: ['simvastatin', 'warfarin', 'amlodipin', 'cyclosporin'],
      pregnancyCat: 'C',
    },
    rxStatus: 'Rx', color: '#16a34a', icon: '🦠',
    usedInYears: [3, 4, 5],
    keyPoints: ['Ức chế CYP3A4 mạnh, kiểm tra tương tác kỹ', 'Kéo dài QT: thận trọng với thuốc tim'],
  },

  // ────────── KHÁNG SINH MACROLIDE (bổ sung cho tương tác) ──────────
  {
    id: 'azithromycin',
    inn: 'Azithromycin',
    nameVN: 'Azithromycin',
    brandNames: ['Zithromax', 'Azimax'],
    atc: 'J01FA10', atcL1: 'J', short: 'AZIT',
    therapeuticClass: 'Kháng sinh',
    pharmClass: 'Macrolide thế hệ mới (Azalide)',
    mechanism: 'Gắn 50S ribosome → ức chế tổng hợp protein',
    forms: [{ form: 'Viên nén', strength: '500mg', route: 'PO' }, { form: 'Hỗn dịch', strength: '200mg/5mL', route: 'PO' }],
    pk: { halfLifeH: 68, metabolism: 'Ít chuyển hoá, thải qua mật' },
    indications: ['Viêm phế quản', 'Viêm phổi cộng đồng', 'Nhiễm Chlamydia', 'Thay thế khi BN dị ứng penicillin'],
    dosing: { adult: '500mg × 1/ngày × 3 ngày HOẶC 500mg ngày 1, sau đó 250mg × 4 ngày' },
    safety: {
      warnings: ['Kéo dài QT (ít hơn clarithromycin)', 'ÍT tương tác CYP3A4 hơn các macrolide khác'],
      pregnancyCat: 'B',
    },
    rxStatus: 'Rx', color: '#16a34a', icon: '🦠',
    usedInYears: [3, 4, 5],
    keyPoints: [
      't½ rất dài (68h): chỉ cần dùng 3 ngày',
      'Macrolide ÍT TƯƠNG TÁC CYP3A4 nhất, lựa chọn thay thế clarithromycin khi BN dùng warfarin/statin',
      'Vẫn có nguy cơ kéo dài QT, thận trọng với BN có nguy cơ',
    ],
  },

  {
    id: 'erythromycin',
    inn: 'Erythromycin',
    nameVN: 'Erythromycin',
    atc: 'J01FA01', atcL1: 'J', short: 'ERYT',
    therapeuticClass: 'Kháng sinh',
    pharmClass: 'Macrolide',
    mechanism: 'Gắn 50S ribosome → ức chế tổng hợp protein',
    forms: [{ form: 'Viên nén', strength: '500mg', route: 'PO' }],
    pk: { halfLifeH: 2, metabolism: 'Hepatic CYP3A4', cypInteractions: ['CYP3A4 strong inhibitor'] },
    indications: ['Nhiễm khuẩn hô hấp', 'Da và mô mềm', 'Khi dị ứng penicillin'],
    dosing: { adult: '250–500mg × 4/ngày' },
    safety: {
      warnings: ['Tăng nhu động dạ dày → buồn nôn', 'Kéo dài QT'],
      interactionsMajor: ['simvastatin', 'warfarin', 'amlodipin', 'cyclosporin', 'theophylline'],
      pregnancyCat: 'B',
    },
    rxStatus: 'Rx', color: '#15803d', icon: '🦠',
    usedInYears: [3, 4, 5],
  },

  // ────────── STATIN BỔ SUNG ──────────
  {
    id: 'simvastatin',
    inn: 'Simvastatin',
    nameVN: 'Simvastatin',
    brandNames: ['Zocor', 'Simvacard'],
    atc: 'C10AA01', atcL1: 'C', short: 'SIMV',
    therapeuticClass: 'Mỡ máu',
    pharmClass: 'Statin (HMG-CoA reductase inhibitor)',
    mechanism: 'Ức chế HMG-CoA reductase → giảm tổng hợp cholesterol',
    forms: [{ form: 'Viên nén', strength: '20mg', route: 'PO' }, { form: 'Viên nén', strength: '40mg', route: 'PO' }],
    pk: { bioavailability: 0.05, halfLifeH: 3, proteinBinding: 0.95, metabolism: 'Hepatic CYP3A4', cypInteractions: ['CYP3A4 substrate'] },
    indications: ['Tăng cholesterol máu', 'Phòng tim mạch'],
    dosing: { adult: '10–40mg buổi tối', maxDaily: '40mg cho BN mới; 80mg chỉ tiếp tục nếu đã dùng ổn định ≥12 tháng (FDA Safety Communication 2011)' },
    safety: {
      contraindications: ['Bệnh gan đang hoạt động', 'Có thai', 'Đang dùng CYP3A4 inhibitors mạnh'],
      seriousAdverse: ['Tiêu cơ vân (NGUY CƠ CAO HƠN atorvastatin)'],
      interactionsMajor: ['clarithromycin', 'erythromycin', 'itraconazol', 'cyclosporin', 'gemfibrozil', 'amlodipin (giới hạn 20mg)', 'grapefruit juice'],
      pregnancyCat: 'X',
    },
    rxStatus: 'Rx', color: '#0e7490', icon: '🩸',
    usedInYears: [3, 4, 5],
    keyPoints: [
      'Tương tác CYP3A4 MẠNH hơn atorvastatin → nhiều tương tác hơn',
      'KHÔNG dùng cùng clarithromycin/erythromycin',
      'Amlodipin: giới hạn simvastatin ≤ 20mg',
    ],
  },

  // ────────── KHÁNG NẤM (CYP inhibitor) ──────────
  {
    id: 'fluconazol',
    inn: 'Fluconazole',
    nameVN: 'Fluconazol',
    brandNames: ['Diflucan'],
    atc: 'J02AC01', atcL1: 'J', short: 'FLUC',
    therapeuticClass: 'Kháng nấm',
    pharmClass: 'Kháng nấm Triazole',
    mechanism: 'Ức chế ergosterol synthesis (CYP51) → màng nấm hỏng',
    forms: [{ form: 'Viên nang', strength: '150mg', route: 'PO' }, { form: 'Viên nang', strength: '50mg', route: 'PO' }, { form: 'Truyền', strength: '200mg/100mL', route: 'IV' }],
    pk: { bioavailability: 0.9, halfLifeH: 30, metabolism: 'Renal (chuyển hoá ít)', cypInteractions: ['CYP2C9 inhibitor', 'CYP3A4 inhibitor'] },
    indications: ['Nhiễm Candida (âm đạo, miệng, hệ thống)', 'Cryptococcosis', 'Phòng nhiễm nấm ở BN suy giảm miễn dịch'],
    dosing: { adult: 'Candida âm đạo: 150mg × 1 liều; toàn thân: 200–400mg/ngày', renal: 'CrCl <50: giảm 50%' },
    safety: {
      warnings: ['CYP2C9 inhibitor → ảnh hưởng warfarin, glibenclamid, phenytoin'],
      interactionsMajor: ['warfarin', 'glibenclamid', 'phenytoin', 'simvastatin', 'midazolam'],
      pregnancyCat: 'D (liều >150mg)',
    },
    rxStatus: 'Rx', color: '#a16207', icon: '🍄',
    usedInYears: [3, 4, 5],
    keyPoints: [
      'CYP2C9 inhibitor mạnh: tăng warfarin → INR vọt',
      'Tăng glibenclamid → hạ ĐH',
      'Liều 150mg × 1 cho Candida âm đạo là phổ biến nhất',
    ],
  },

  // ────────── ANTIPLATELET BỔ SUNG ──────────
  {
    id: 'clopidogrel',
    inn: 'Clopidogrel',
    nameVN: 'Clopidogrel',
    brandNames: ['Plavix', 'Pidogrel'],
    atc: 'B01AC04', atcL1: 'B', short: 'CLOP',
    therapeuticClass: 'Tim mạch',
    pharmClass: 'Ức chế P2Y12 (chống kết tập tiểu cầu)',
    mechanism: 'Tiền chất (prodrug): CYP2C19 chuyển thành dạng hoạt động → chẹn không hồi phục P2Y12',
    forms: [{ form: 'Viên nén', strength: '75mg', route: 'PO' }],
    pk: { metabolism: 'Hepatic CYP2C19 (prodrug → active)', cypInteractions: ['CYP2C19 substrate'] },
    indications: ['Sau đặt stent mạch vành', 'Sau nhồi máu cơ tim', 'Đột quỵ thiếu máu', 'Bệnh động mạch ngoại biên'],
    dosing: { adult: '75mg × 1/ngày (hoặc loading 300–600mg trước stent)' },
    safety: {
      contraindications: ['Đang chảy máu'],
      warnings: ['Ngưng 5–7 ngày trước phẫu thuật lớn'],
      interactionsMajor: ['omeprazol (giảm hoạt tính do ức chế CYP2C19)', 'aspirin (tăng nguy cơ chảy máu)'],
      pregnancyCat: 'B',
    },
    rxStatus: 'Rx', color: '#b91c1c', icon: '🩸',
    usedInYears: [4, 5],
    keyPoints: [
      'Prodrug: cần CYP2C19 để hoạt hoá',
      'OMEPRAZOL ức chế CYP2C19 → giảm hiệu lực clopidogrel, KHÔNG NÊN PHỐI HỢP',
      'Thay thế: pantoprazol (ít ức chế CYP2C19 nhất)',
    ],
  },

  // ────────── METHOTREXATE (cho tương tác NSAID) ──────────
  {
    id: 'methotrexate',
    inn: 'Methotrexate',
    nameVN: 'Methotrexat',
    brandNames: ['Trexall'],
    atc: 'L04AX03', atcL1: 'L', short: 'MTX',
    therapeuticClass: 'Ức chế miễn dịch / Hoá trị',
    pharmClass: 'Antimetabolite (Folic acid antagonist)',
    mechanism: 'Ức chế dihydrofolate reductase → giảm tổng hợp DNA',
    forms: [{ form: 'Viên nén', strength: '2.5mg', route: 'PO' }, { form: 'Tiêm', strength: '50mg/2mL', route: 'IM' }],
    pk: { halfLifeH: 9, proteinBinding: 0.5, elimination: 'Renal 90% nguyên dạng' },
    indications: ['Viêm khớp dạng thấp', 'Vẩy nến', 'Ung thư (liều cao)'],
    dosing: { adult: 'Liều thấp: 7.5–25mg/TUẦN (KHÔNG phải ngày!)', renal: 'CrCl <30: chống chỉ định' },
    safety: {
      contraindications: ['Suy gan/thận nặng', 'Có thai (X)', 'Cho con bú', 'Nghiện rượu'],
      warnings: ['DÙNG 1 LẦN/TUẦN: lỗi dùng hằng ngày → tử vong', 'Bổ sung acid folic 5mg/tuần'],
      seriousAdverse: ['Ức chế tuỷ xương', 'Độc gan', 'Độc thận', 'Viêm phổi'],
      interactionsMajor: ['NSAID (đặc biệt liều cao)', 'aspirin', 'TMP-SMX', 'penicillin (giảm thải)', 'PPI'],
      pregnancyCat: 'X',
    },
    rxStatus: 'Rx', color: '#7c3aed', icon: '💉',
    usedInYears: [4, 5],
    keyPoints: [
      'LIỀU 1 LẦN/TUẦN: không phải ngày! Sai sót gây tử vong',
      'NSAID + MTX liều cao → suy thận, ngộ độc',
      'Phải bổ sung acid folic 5mg/tuần',
    ],
  },

  // ────────── AMIODARONE (kéo dài QT, nhiều tương tác) ──────────
  {
    id: 'amiodaron',
    inn: 'Amiodarone',
    nameVN: 'Amiodaron',
    brandNames: ['Cordarone', 'Pacerone'],
    atc: 'C01BD01', atcL1: 'C', short: 'AMIO',
    therapeuticClass: 'Tim mạch',
    pharmClass: 'Chống loạn nhịp class III',
    mechanism: 'Chẹn kênh K+ (chủ yếu) + Na+, Ca²⁺ và β-blocker yếu',
    forms: [{ form: 'Viên nén', strength: '200mg', route: 'PO' }, { form: 'Tiêm', strength: '150mg/3mL', route: 'IV' }],
    pk: { halfLifeH: 1500, proteinBinding: 0.96, metabolism: 'Hepatic CYP3A4', cypInteractions: ['CYP3A4 inhibitor', 'CYP2C9 inhibitor', 'P-glycoprotein inhibitor'] },
    indications: ['Loạn nhịp thất nguy hiểm', 'Rung nhĩ kháng trị'],
    dosing: { adult: 'Loading: 800–1600mg/ngày × 1–3 tuần; maintenance: 200–400mg/ngày' },
    safety: {
      warnings: ['Độc phổi (xơ phổi)', 'Độc gan', 'Độc giáp (cường + suy)', 'Lắng đọng giác mạc', 'Nhạy cảm ánh sáng'],
      interactionsMajor: ['warfarin (tăng INR)', 'simvastatin (giới hạn 20mg)', 'digoxin (tăng nồng độ)', 'amlodipin', 'clarithromycin (kéo dài QT)'],
      pregnancyCat: 'D',
    },
    rxStatus: 'Rx', color: '#7c2d12', icon: '⚡',
    usedInYears: [4, 5],
    keyPoints: [
      't½ cực dài (50–60 ngày): ngừng vẫn còn tác dụng tháng sau',
      'Tương tác RẤT NHIỀU thuốc qua CYP3A4 + CYP2C9 + P-gp',
      'Theo dõi: ECG, TSH, X-quang phổi, ALT 6 tháng/lần',
    ],
  },

  // ────────── THUỐC GÂY NGHIỆN (cho năm 5, pháp lý) ──────────
  {
    id: 'morphin',
    inn: 'Morphine',
    nameVN: 'Morphin',
    brandNames: ['Morphin sulfat'],
    atc: 'N02AA01', atcL1: 'N', short: 'MORP',
    therapeuticClass: 'Giảm đau opioid',
    pharmClass: 'Opioid μ-agonist',
    mechanism: 'Đồng vận thụ thể μ → giảm dẫn truyền đau',
    target: 'μ-opioid receptor',
    forms: [
      { form: 'Viên nén', strength: '10mg', route: 'PO' },
      { form: 'Viên giải phóng kéo dài', strength: '30mg', route: 'PO' },
      { form: 'Tiêm', strength: '10mg/mL', route: 'IV' },
    ],
    pk: { bioavailability: 0.3, halfLifeH: 3, metabolism: 'Hepatic glucuronid hoá → M6G (active)' },
    indications: ['Đau nặng (ung thư, sau mổ, nhồi máu cơ tim)'],
    dosing: { adult: '5–10mg × 4h khi cần (PO); 2–4mg IV chậm' },
    safety: {
      contraindications: ['Suy hô hấp', 'Hen cấp', 'Liệt ruột'],
      warnings: ['Lệ thuộc', 'Khoá tủ thuốc gây nghiện', 'Sổ riêng theo TT 20/2017/TT-BYT'],
      seriousAdverse: ['Ức chế hô hấp', 'Tử vong do quá liều (xử trí: naloxone)'],
      interactionsMajor: ['benzodiazepin', 'rượu', 'thuốc ức chế TKTW khác'],
      pregnancyCat: 'C (D nếu dùng dài hạn / liều cao)',
    },
    rxStatus: 'C',
    color: '#7c2d12', icon: '🔒',
    usedInYears: [4, 5],
    keyPoints: [
      'Thuốc gây nghiện (C): kê đơn theo TT 20/2017/TT-BYT',
      'Sổ riêng, khoá tủ, kiểm kê hàng ngày',
      'Quá liều → naloxone',
    ],
  },

  // ─── ADDITIONAL CURRICULUM-ALIGNED ENTRIES (Agent #13, 2026-05-27) ───
  { id: 'ceftriaxone', inn: 'Ceftriaxone', nameVN: 'Ceftriaxon', brandNames: ['Rocephin', 'Trikaxon', 'Ceftriaxone Kabi'], atc: 'J01DD04', atcL1: 'J', short: 'CFTX', therapeuticClass: 'Kháng sinh', pharmClass: 'Cephalosporin thế hệ 3', mechanism: 'Ức chế tổng hợp peptidoglycan thành tế bào vi khuẩn (gắn PBP), bền với phần lớn β-lactamase', forms: [{ form: 'Lọ tiêm', strength: '1g', route: 'IV' }, { form: 'Lọ tiêm', strength: '2g', route: 'IV' }], pk: { halfLifeH: 8, proteinBinding: 0.95, metabolism: 'Ít chuyển hoá', elimination: 'Renal + mật' }, indications: ['Viêm phổi cộng đồng nặng', 'Viêm màng não vi khuẩn', 'Lậu cầu', 'Nhiễm khuẩn ổ bụng'], dosing: { adult: '1–2g × 1 lần/ngày IV/IM', pediatric: '50–80 mg/kg/ngày', maxDaily: '4g/ngày' }, safety: { contraindications: ['Quá mẫn cephalosporin/penicillin', 'Trẻ sơ sinh tăng bilirubin (kernicterus)'], commonAdverse: ['Phát ban', 'Tiêu chảy', 'Tăng men gan'], seriousAdverse: ['Sốc phản vệ', 'Sỏi mật giả (pseudolithiasis)'], interactionsMajor: ['warfarin', 'calcium IV (ở trẻ sơ sinh - kết tủa)'], pregnancyCat: 'B' }, rxStatus: 'Rx', color: '#16a34a', icon: '💉', usedInYears: [3, 4, 5], keyPoints: ['1 lần/ngày nhờ t½ dài 8h', 'KHÔNG trộn với dung dịch chứa Ca²⁺ ở trẻ sơ sinh', 'Đầu tay viêm màng não vi khuẩn theo kinh nghiệm'] },
    { id: 'ciprofloxacin', inn: 'Ciprofloxacin', nameVN: 'Ciprofloxacin', brandNames: ['Ciprobay', 'Scanax', 'Ciprolet'], atc: 'J01MA02', atcL1: 'J', short: 'CIPR', therapeuticClass: 'Kháng sinh', pharmClass: 'Fluoroquinolone thế hệ 2', mechanism: 'Ức chế DNA gyrase và topoisomerase IV → ngừng sao chép DNA vi khuẩn', forms: [{ form: 'Viên nén', strength: '500mg', route: 'PO' }, { form: 'Truyền', strength: '200mg/100mL', route: 'IV' }], pk: { bioavailability: 0.7, halfLifeH: 4, metabolism: 'Hepatic CYP1A2', cypInteractions: ['CYP1A2 inhibitor'] }, indications: ['Nhiễm khuẩn tiết niệu phức tạp', 'Tiêu chảy do vi khuẩn xâm nhập', 'Viêm tuyến tiền liệt', 'Anthrax (dự phòng)'], dosing: { adult: '500mg × 2/ngày × 7–14 ngày', renal: 'CrCl <30: giảm liều 50%', maxDaily: '1500mg' }, safety: { contraindications: ['Trẻ <18 tuổi (trừ chỉ định đặc biệt)', 'Có thai', 'Tiền sử đứt gân do quinolone'], warnings: ['Kéo dài QT', 'Đứt gân Achilles (đặc biệt phối hợp corticoid + người >60t)', 'Tăng nhạy cảm ánh sáng'], commonAdverse: ['Buồn nôn', 'Tiêu chảy', 'Đau đầu'], interactionsMajor: ['warfarin', 'theophylline', 'tizanidine', 'antacid (giảm hấp thu)', 'sữa/sắt (chelat)'], pregnancyCat: 'C' }, rxStatus: 'Rx', color: '#0d9488', icon: '🦠', usedInYears: [3, 4, 5], keyPoints: ['Không dùng cho trẻ em + phụ nữ có thai', 'Uống cách antacid/sữa/sắt ≥ 2h', 'Tương tác CYP1A2 → tăng theophylline'] },
    { id: 'vancomycin', inn: 'Vancomycin', nameVN: 'Vancomycin', brandNames: ['Vancocin', 'Edicin'], atc: 'J01XA01', atcL1: 'J', short: 'VANC', therapeuticClass: 'Kháng sinh', pharmClass: 'Glycopeptide', mechanism: 'Gắn D-Ala-D-Ala của tiền chất peptidoglycan → ngăn polymer hoá thành tế bào (chỉ tác dụng gram dương)', forms: [{ form: 'Lọ tiêm', strength: '500mg', route: 'IV' }, { form: 'Lọ tiêm', strength: '1g', route: 'IV' }, { form: 'Viên nang', strength: '125mg', route: 'PO' }], pk: { halfLifeH: 6, proteinBinding: 0.55, elimination: 'Renal 90% nguyên dạng' }, indications: ['Nhiễm MRSA', 'Viêm đại tràng giả mạc do C.difficile (đường uống)', 'Viêm nội tâm mạc do Gram+ kháng methicillin'], dosing: { adult: '15–20 mg/kg × 2/ngày IV; C.difficile: 125mg × 4/ngày PO', renal: 'Theo dõi nồng độ đáy (10–20 mg/L)' }, safety: { warnings: ['Truyền nhanh → "Red Man syndrome"', 'Độc thận + độc tai liều cao'], seriousAdverse: ['Suy thận cấp', 'Mất thính lực', 'Giảm bạch cầu hạt'], interactionsMajor: ['aminoglycoside (cộng độc thận+tai)', 'piperacillin-tazobactam (tăng AKI)'], pregnancyCat: 'C' }, rxStatus: 'Rx', color: '#dc2626', icon: '🚨', usedInYears: [4, 5], keyPoints: ['MRSA tuyến đầu', 'Truyền chậm >60 phút để tránh Red Man', 'Bắt buộc TDM (nồng độ đáy 10–20)', 'Đường uống CHỈ dùng cho C.difficile (không hấp thu)'] },
    { id: 'doxycycline', inn: 'Doxycycline', nameVN: 'Doxycyclin', brandNames: ['Vibramycin', 'Doxyhexal'], atc: 'J01AA02', atcL1: 'J', short: 'DOXY', therapeuticClass: 'Kháng sinh', pharmClass: 'Tetracyclin thế hệ 2', mechanism: 'Gắn 30S ribosome → ức chế tổng hợp protein vi khuẩn', forms: [{ form: 'Viên nang', strength: '100mg', route: 'PO' }], pk: { bioavailability: 0.95, halfLifeH: 18, proteinBinding: 0.9, elimination: 'Mật + phân (an toàn cho suy thận)' }, indications: ['Nhiễm khuẩn không điển hình (Mycoplasma, Chlamydia)', 'Trứng cá', 'Rickettsia, Lyme', 'Sốt rét dự phòng'], dosing: { adult: '100mg × 2/ngày ngày đầu, sau 100mg/ngày', maxDaily: '200mg' }, safety: { contraindications: ['Trẻ <8 tuổi (vàng răng)', 'Có thai', 'Cho con bú'], warnings: ['Tăng nhạy cảm ánh sáng', 'Loét thực quản nếu uống thiếu nước'], interactionsMajor: ['warfarin', 'antacid Ca/Mg/Al (chelat)', 'sắt', 'isotretinoin (tăng áp lực nội sọ)'], pregnancyCat: 'D' }, rxStatus: 'Rx', color: '#a16207', icon: '🦠', usedInYears: [3, 4, 5], keyPoints: ['Uống nhiều nước, ngồi thẳng 30 phút sau uống', 'KHÔNG dùng cho trẻ <8 tuổi và phụ nữ có thai', 'An toàn ở suy thận (thải qua mật)'] },
    { id: 'metronidazol', inn: 'Metronidazole', nameVN: 'Metronidazol', brandNames: ['Flagyl', 'Klion'], atc: 'P01AB01', atcL1: 'P', short: 'METR', therapeuticClass: 'Kháng sinh', pharmClass: 'Nitroimidazole', mechanism: 'Khử nhóm nitro trong môi trường kỵ khí → phá huỷ DNA vi khuẩn/ký sinh trùng', forms: [{ form: 'Viên nén', strength: '250mg', route: 'PO' }, { form: 'Truyền', strength: '500mg/100mL', route: 'IV' }, { form: 'Viên đặt âm đạo', strength: '500mg', route: 'vaginal' }], pk: { bioavailability: 1.0, halfLifeH: 8, metabolism: 'Hepatic' }, indications: ['Nhiễm vi khuẩn kỵ khí', 'Trichomonas', 'Amíp', 'Giardia', 'H.pylori (phối hợp)', 'Viêm đại tràng do C.difficile'], dosing: { adult: '500mg × 3/ngày × 7 ngày', maxDaily: '4g/ngày' }, safety: { contraindications: ['Có thai 3 tháng đầu', 'Quá mẫn'], warnings: ['Phản ứng giống disulfiram với rượu, KIÊNG rượu trong và 48h sau ngưng'], commonAdverse: ['Vị kim loại', 'Buồn nôn', 'Nước tiểu sẫm màu'], interactionsMajor: ['warfarin', 'rượu', 'lithium', 'phenytoin'], pregnancyCat: 'B' }, rxStatus: 'Rx', color: '#9333ea', icon: '🦠', usedInYears: [3, 4, 5], keyPoints: ['TUYỆT ĐỐI kiêng rượu (phản ứng disulfiram-like)', 'Tương tác warfarin → tăng INR', 'Đầu tay cho vi khuẩn kỵ khí và đơn bào'] },
    { id: 'gentamicin', inn: 'Gentamicin', nameVN: 'Gentamicin', brandNames: ['Garamycin', 'Gentamicin Kabi'], atc: 'J01GB03', atcL1: 'J', short: 'GENT', therapeuticClass: 'Kháng sinh', pharmClass: 'Aminoglycoside', mechanism: 'Gắn 30S ribosome → đọc sai mã + ức chế tổng hợp protein (diệt khuẩn)', forms: [{ form: 'Lọ tiêm', strength: '80mg/2mL', route: 'IM' }, { form: 'Lọ tiêm', strength: '80mg/2mL', route: 'IV' }], pk: { halfLifeH: 2.5, proteinBinding: 0.1, elimination: 'Renal 100%' }, indications: ['Nhiễm khuẩn Gram âm nặng', 'Nhiễm khuẩn huyết', 'Phối hợp điều trị viêm nội tâm mạc'], dosing: { adult: '5–7 mg/kg × 1/ngày (ưu tiên once-daily) HOẶC 1.5–2 mg/kg × 3/ngày', renal: 'Kéo dài khoảng cách theo CrCl + TDM' }, safety: { warnings: ['BẮT BUỘC theo dõi nồng độ đỉnh + đáy', 'Cẩn thận ở người già'], seriousAdverse: ['Độc thận', 'Độc tai (mất thính lực, rối loạn thăng bằng - KHÔNG hồi phục)', 'Phong bế thần kinh-cơ'], interactionsMajor: ['vancomycin', 'furosemid (cộng độc tai)', 'thuốc giãn cơ'], pregnancyCat: 'D' }, rxStatus: 'Rx', color: '#dc2626', icon: '💉', usedInYears: [4, 5], keyPoints: ['Cửa sổ điều trị hẹp, TDM bắt buộc', 'Độc tai không hồi phục', 'Once-daily dosing giảm độc tính'] },
    { id: 'levofloxacin', inn: 'Levofloxacin', nameVN: 'Levofloxacin', brandNames: ['Tavanic', 'Levaquin', 'Cravit'], atc: 'J01MA12', atcL1: 'J', short: 'LEVO', therapeuticClass: 'Kháng sinh', pharmClass: 'Fluoroquinolone thế hệ 3 (respiratory)', mechanism: 'Ức chế DNA gyrase + topoisomerase IV của vi khuẩn', forms: [{ form: 'Viên nén', strength: '500mg', route: 'PO' }, { form: 'Truyền', strength: '500mg/100mL', route: 'IV' }], pk: { bioavailability: 0.99, halfLifeH: 7, elimination: 'Renal 87%' }, indications: ['Viêm phổi cộng đồng (đặc biệt nghi do vi khuẩn không điển hình)', 'Viêm xoang', 'Nhiễm khuẩn tiết niệu phức tạp', 'Lao đa kháng (phác đồ 2)'], dosing: { adult: '500–750mg × 1/ngày × 5–14 ngày', renal: 'CrCl <50: giảm liều', maxDaily: '750mg' }, safety: { contraindications: ['Trẻ <18 tuổi', 'Có thai', 'Tiền sử đứt gân do quinolone'], warnings: ['Đứt gân', 'Kéo dài QT', 'Rối loạn glucose máu', 'Bệnh thần kinh ngoại biên'], interactionsMajor: ['warfarin', 'antacid', 'corticoid (tăng nguy cơ đứt gân)', 'thuốc kéo dài QT'], pregnancyCat: 'C' }, rxStatus: 'Rx', color: '#0d9488', icon: '🫁', usedInYears: [3, 4, 5], keyPoints: ['Quinolone hô hấp: phủ Streptococcus pneumoniae', '1 lần/ngày', 'Cùng cảnh báo đứt gân + QT như ciprofloxacin'] },
    { id: 'acyclovir', inn: 'Acyclovir', nameVN: 'Acyclovir', brandNames: ['Zovirax', 'Acyclovir Stada'], atc: 'J05AB01', atcL1: 'J', short: 'ACYC', therapeuticClass: 'Kháng virus', pharmClass: 'Tương tự nucleoside (chống herpes)', mechanism: 'Được thymidine kinase của virus phosphoryl hoá → ức chế DNA polymerase virus', forms: [{ form: 'Viên nén', strength: '400mg', route: 'PO' }, { form: 'Lọ truyền', strength: '250mg', route: 'IV' }, { form: 'Kem bôi', strength: '5%', route: 'topical' }], pk: { bioavailability: 0.2, halfLifeH: 3, elimination: 'Renal 60–90% nguyên dạng' }, indications: ['Herpes simplex (sinh dục, miệng)', 'Zona', 'Thuỷ đậu', 'Viêm não do HSV'], dosing: { adult: 'HSV: 400mg × 5/ngày × 7–10 ngày; Zona: 800mg × 5/ngày × 7 ngày', renal: 'Giảm liều theo CrCl' }, safety: { warnings: ['Suy thận cấp do tinh thể (uống đủ nước)', 'Thần kinh ở liều cao IV'], commonAdverse: ['Buồn nôn', 'Đau đầu'], pregnancyCat: 'B' }, rxStatus: 'Rx', color: '#6366f1', icon: '🦠', usedInYears: [3, 4, 5], keyPoints: ['Uống nhiều nước để tránh kết tinh ở thận', 'Hiệu quả nhất khi bắt đầu trong 72h đầu', 'Giảm liều ở suy thận'] },
    { id: 'oseltamivir', inn: 'Oseltamivir', nameVN: 'Oseltamivir', brandNames: ['Tamiflu'], atc: 'J05AH02', atcL1: 'J', short: 'OSEL', therapeuticClass: 'Kháng virus', pharmClass: 'Ức chế neuraminidase', mechanism: 'Ức chế neuraminidase của virus cúm → ngăn virus phóng thích khỏi tế bào nhiễm', forms: [{ form: 'Viên nang', strength: '75mg', route: 'PO' }, { form: 'Hỗn dịch', strength: '12mg/mL', route: 'PO' }], pk: { bioavailability: 0.8, halfLifeH: 8, metabolism: 'Esterase huyết tương' }, indications: ['Điều trị cúm A/B (bắt đầu <48h)', 'Dự phòng sau phơi nhiễm cúm'], dosing: { adult: '75mg × 2/ngày × 5 ngày (điều trị); 75mg × 1/ngày × 10 ngày (dự phòng)', pediatric: 'Theo cân nặng (15–30 mg × 2/ngày)', renal: 'CrCl <30: giảm liều 50%' }, safety: { commonAdverse: ['Buồn nôn', 'Nôn'], warnings: ['Báo cáo bất thường thần kinh-tâm thần ở trẻ em (Nhật)'], pregnancyCat: 'C' }, rxStatus: 'Rx', color: '#0891b2', icon: '🤧', usedInYears: [3, 4, 5], keyPoints: ['Hiệu quả tối ưu khi dùng <48h sau khởi phát triệu chứng', 'Là tiền chất: ester hoá → oseltamivir carboxylate', 'Giảm liều ở suy thận'] },
    { id: 'lisinopril', inn: 'Lisinopril', nameVN: 'Lisinopril', brandNames: ['Zestril', 'Prinivil'], atc: 'C09AA03', atcL1: 'C', short: 'LISI', therapeuticClass: 'Huyết áp', pharmClass: 'Ức chế men chuyển (ACEi)', mechanism: 'Ức chế ACE → giảm angiotensin II + giảm phân huỷ bradykinin → giãn mạch', forms: [{ form: 'Viên nén', strength: '10mg', route: 'PO' }, { form: 'Viên nén', strength: '20mg', route: 'PO' }], pk: { bioavailability: 0.25, halfLifeH: 12, elimination: 'Renal 100% nguyên dạng' }, indications: ['Tăng huyết áp', 'Suy tim', 'Sau nhồi máu cơ tim', 'Bệnh thận do ĐTĐ'], dosing: { adult: 'Bắt đầu 5–10mg × 1/ngày; tăng dần đến 20–40mg', renal: 'CrCl <30: bắt đầu 2.5mg', maxDaily: '80mg' }, safety: { contraindications: ['Có thai (D)', 'Phù mạch tiền sử với ACEi', 'Hẹp ĐM thận 2 bên'], warnings: ['Hạ HA liều đầu', 'Tăng K máu', 'Suy thận cấp khi mất nước'], commonAdverse: ['Ho khan (10–20%)', 'Chóng mặt'], seriousAdverse: ['Phù mạch (angioedema)', 'Tăng K máu'], interactionsMajor: ['spironolacton (tăng K)', 'NSAID (giảm hiệu lực + suy thận)', 'lithium', 'sacubitril'], pregnancyCat: 'D' }, rxStatus: 'Rx', color: '#be185d', icon: '❤️', usedInYears: [3, 4, 5], keyPoints: ['Ho khan là ADR đặc trưng', 'TUYỆT ĐỐI tránh khi có thai (gây dị tật)', 'Theo dõi K máu + creatinin sau khởi đầu'] },
    { id: 'enalapril', inn: 'Enalapril', nameVN: 'Enalapril', brandNames: ['Renitec', 'Ednyt'], atc: 'C09AA02', atcL1: 'C', short: 'ENAL', therapeuticClass: 'Huyết áp', pharmClass: 'Ức chế men chuyển (ACEi)', mechanism: 'Tiền chất: chuyển thành enalaprilat ức chế ACE', forms: [{ form: 'Viên nén', strength: '5mg', route: 'PO' }, { form: 'Viên nén', strength: '10mg', route: 'PO' }], pk: { bioavailability: 0.6, halfLifeH: 11, metabolism: 'Hepatic → enalaprilat (active)', elimination: 'Renal' }, indications: ['Tăng huyết áp', 'Suy tim', 'Rối loạn chức năng thất trái sau NMCT'], dosing: { adult: '5–20mg × 1–2/ngày', renal: 'CrCl <30: giảm liều', maxDaily: '40mg' }, safety: { contraindications: ['Có thai', 'Phù mạch tiền sử', 'Hẹp ĐM thận 2 bên'], commonAdverse: ['Ho khan', 'Chóng mặt', 'Tăng K máu'], interactionsMajor: ['NSAID', 'spironolacton', 'lithium'], pregnancyCat: 'D' }, rxStatus: 'Rx', color: '#be185d', icon: '❤️', usedInYears: [3, 4, 5], keyPoints: ['Tiền chất: cần gan để hoạt hoá', 'Ho khan thường gặp', 'Theo dõi K + creatinin'] },
    { id: 'losartan', inn: 'Losartan', nameVN: 'Losartan', brandNames: ['Cozaar', 'Hyzaar (kết hợp HCTZ)'], atc: 'C09CA01', atcL1: 'C', short: 'LOSA', therapeuticClass: 'Huyết áp', pharmClass: 'Ức chế thụ thể angiotensin II (ARB)', mechanism: 'Chẹn chọn lọc thụ thể AT1 → giãn mạch, không ảnh hưởng bradykinin', forms: [{ form: 'Viên nén', strength: '50mg', route: 'PO' }, { form: 'Viên nén', strength: '100mg', route: 'PO' }], pk: { bioavailability: 0.33, halfLifeH: 2, metabolism: 'Hepatic CYP2C9 → E-3174 (active, t½ 6–9h)' }, indications: ['Tăng huyết áp', 'Bệnh thận do ĐTĐ type 2', 'Suy tim (khi không dung nạp ACEi)'], dosing: { adult: '50–100mg × 1/ngày', maxDaily: '100mg' }, safety: { contraindications: ['Có thai', 'Hẹp ĐM thận 2 bên'], warnings: ['Tăng K máu', 'Hạ HA'], commonAdverse: ['Chóng mặt', 'Ít ho hơn ACEi'], interactionsMajor: ['NSAID', 'spironolacton', 'lithium'], pregnancyCat: 'D' }, rxStatus: 'Rx', color: '#be185d', icon: '❤️', usedInYears: [3, 4, 5], keyPoints: ['Thay thế khi BN không chịu được ho do ACEi', 'KHÔNG kết hợp ACEi + ARB', 'Tránh khi có thai'] },
    { id: 'bisoprolol', inn: 'Bisoprolol', nameVN: 'Bisoprolol', brandNames: ['Concor', 'Bicard'], atc: 'C07AB07', atcL1: 'C', short: 'BISO', therapeuticClass: 'Tim mạch', pharmClass: 'Chẹn β1 chọn lọc', mechanism: 'Chẹn chọn lọc thụ thể β1 → giảm nhịp tim, giảm co bóp cơ tim, giảm renin', forms: [{ form: 'Viên nén', strength: '2.5mg', route: 'PO' }, { form: 'Viên nén', strength: '5mg', route: 'PO' }, { form: 'Viên nén', strength: '10mg', route: 'PO' }], pk: { bioavailability: 0.9, halfLifeH: 11, metabolism: '50% hepatic + 50% renal' }, indications: ['Tăng huyết áp', 'Đau thắt ngực ổn định', 'Suy tim mạn (NYHA II–IV) ổn định'], dosing: { adult: 'THA: 5–10mg/ngày; Suy tim: bắt đầu 1.25mg, tăng từ từ đến 10mg', maxDaily: '20mg' }, safety: { contraindications: ['Suy tim mất bù', 'Block AV độ 2–3', 'Nhịp tim chậm < 50', 'Hen nặng'], warnings: ['Không ngưng đột ngột (rebound)', 'Che lấp dấu hiệu hạ ĐH ở BN ĐTĐ'], commonAdverse: ['Mệt', 'Nhịp chậm', 'Lạnh chi'], interactionsMajor: ['verapamil/diltiazem (block AV)', 'amiodarone', 'insulin/sulfonylurea (che hạ ĐH)'], pregnancyCat: 'C' }, rxStatus: 'Rx', color: '#7c3aed', icon: '💓', usedInYears: [3, 4, 5], keyPoints: ['β1 chọn lọc: ít gây co thắt phế quản hơn', 'Trong suy tim: START LOW GO SLOW', 'Không ngưng đột ngột'] },
    { id: 'furosemid', inn: 'Furosemide', nameVN: 'Furosemid', brandNames: ['Lasix', 'Trofurit'], atc: 'C03CA01', atcL1: 'C', short: 'FURO', therapeuticClass: 'Tim mạch', pharmClass: 'Lợi tiểu quai', mechanism: 'Ức chế Na-K-2Cl ở quai Henle dày → lợi tiểu mạnh', forms: [{ form: 'Viên nén', strength: '40mg', route: 'PO' }, { form: 'Tiêm', strength: '20mg/2mL', route: 'IV' }], pk: { bioavailability: 0.6, halfLifeH: 2, proteinBinding: 0.95 }, indications: ['Phù do suy tim, suy gan, suy thận', 'Tăng huyết áp (ít dùng đơn độc)', 'Phù phổi cấp'], dosing: { adult: '20–80mg/ngày PO; 20–40mg IV (phù phổi cấp)', maxDaily: '600mg/ngày trong suy thận' }, safety: { contraindications: ['Vô niệu', 'Mất nước nặng', 'Quá mẫn sulfonamide'], warnings: ['Hạ K máu', 'Hạ Mg máu', 'Tăng acid uric', 'Điếc khi tiêm IV nhanh'], commonAdverse: ['Khát', 'Hạ HA tư thế', 'Hạ K'], interactionsMajor: ['digoxin (tăng độc do hạ K)', 'aminoglycoside (cộng độc tai)', 'lithium', 'NSAID (giảm hiệu lực)'], pregnancyCat: 'C' }, rxStatus: 'Rx', color: '#06b6d4', icon: '💧', usedInYears: [3, 4, 5], keyPoints: ['Theo dõi K, Na, Mg, creatinin', 'Tiêm IV CHẬM để tránh điếc', 'Hạ K + digoxin = nguy hiểm'] },
    { id: 'spironolacton', inn: 'Spironolactone', nameVN: 'Spironolacton', brandNames: ['Aldactone', 'Verospiron'], atc: 'C03DA01', atcL1: 'C', short: 'SPIR', therapeuticClass: 'Tim mạch', pharmClass: 'Lợi tiểu giữ K (đối kháng aldosterone)', mechanism: 'Đối kháng cạnh tranh thụ thể aldosterone ở ống lượn xa → giữ K, thải Na', forms: [{ form: 'Viên nén', strength: '25mg', route: 'PO' }, { form: 'Viên nén', strength: '50mg', route: 'PO' }], pk: { halfLifeH: 1.5, metabolism: 'Hepatic → canrenone (active, t½ 16h)' }, indications: ['Suy tim NYHA III–IV', 'Xơ gan có cổ trướng', 'Cường aldosterone nguyên phát', 'Tăng HA kháng trị'], dosing: { adult: 'Suy tim: 25–50mg/ngày; Cổ trướng: 100–400mg/ngày', maxDaily: '400mg' }, safety: { contraindications: ['Tăng K máu (>5.0)', 'Suy thận nặng (eGFR <30)', 'Bệnh Addison'], warnings: ['Theo dõi K máu sau khởi đầu 1 tuần, 1 tháng'], commonAdverse: ['Vú to ở nam (gynecomastia)', 'Rối loạn kinh nguyệt'], interactionsMajor: ['ACEi/ARB (tăng K)', 'NSAID', 'lithium', 'KCl bổ sung'], pregnancyCat: 'C' }, rxStatus: 'Rx', color: '#0891b2', icon: '💧', usedInYears: [3, 4, 5], keyPoints: ['Giữ K: KHÔNG kết hợp với KCl', 'Vú to ở nam là ADR đặc trưng', 'Suy tim NYHA III–IV: cải thiện tiên lượng'] },
    { id: 'digoxin', inn: 'Digoxin', nameVN: 'Digoxin', brandNames: ['Lanoxin', 'Digoxin Richter'], atc: 'C01AA05', atcL1: 'C', short: 'DIGX', therapeuticClass: 'Tim mạch', pharmClass: 'Glycoside trợ tim', mechanism: 'Ức chế Na/K-ATPase → tăng Ca nội bào → tăng co bóp + làm chậm nhịp tim qua tăng trương lực phó giao cảm', forms: [{ form: 'Viên nén', strength: '0.25mg', route: 'PO' }, { form: 'Tiêm', strength: '0.5mg/2mL', route: 'IV' }], pk: { bioavailability: 0.75, halfLifeH: 36, elimination: 'Renal 70% nguyên dạng' }, indications: ['Suy tim phân suất tống máu giảm có triệu chứng', 'Kiểm soát tần số thất trong rung nhĩ'], dosing: { adult: '0.125–0.25mg/ngày; mục tiêu nồng độ 0.5–0.9 ng/mL', elderly: 'Bắt đầu 0.0625–0.125mg', renal: 'Giảm liều theo CrCl' }, safety: { contraindications: ['Block AV độ 2–3', 'Loạn nhịp thất'], warnings: ['Cửa sổ điều trị rất hẹp', 'Hạ K, Mg → tăng độc'], seriousAdverse: ['Loạn nhịp', 'Buồn nôn', 'Nhìn vàng', 'Lú lẫn (đặc biệt người già)'], interactionsMajor: ['amiodaron (tăng nồng độ digoxin)', 'verapamil', 'clarithromycin', 'furosemid (hạ K → tăng độc)'], pregnancyCat: 'C' }, rxStatus: 'Rx', color: '#7c2d12', icon: '⚡', usedInYears: [4, 5], keyPoints: ['Cửa sổ điều trị HẸP, TDM thường quy', 'Hạ K + digoxin = ngộ độc digoxin', 'Người già + suy thận: rất dễ ngộ độc'] },
    { id: 'nitroglycerin', inn: 'Glyceryl trinitrate', nameVN: 'Nitroglycerin', brandNames: ['Nitromint', 'Nitro-Dur'], atc: 'C01DA02', atcL1: 'C', short: 'NTG', therapeuticClass: 'Tim mạch', pharmClass: 'Nitrat hữu cơ (giãn mạch)', mechanism: 'Giải phóng NO → giãn cơ trơn tĩnh mạch (chủ yếu) + động mạch vành → giảm tiền tải', forms: [{ form: 'Ngậm dưới lưỡi', strength: '0.5mg', route: 'sublingual' }, { form: 'Xịt dưới lưỡi', strength: '0.4mg/nhát', route: 'sublingual' }, { form: 'Miếng dán', strength: '5mg/24h', route: 'topical' }], pk: { bioavailability: 0.4, halfLifeH: 0.05, metabolism: 'Hepatic (chuyển hoá đầu rất mạnh)' }, indications: ['Cơn đau thắt ngực cấp', 'Dự phòng đau thắt ngực', 'Suy tim cấp', 'Phù phổi'], dosing: { adult: 'Cấp: 0.4–0.6mg ngậm dưới lưỡi, lặp lại sau 5 phút × 3 lần; mãn: miếng dán 12h on / 12h off' }, safety: { contraindications: ['Phối hợp PDE5 inhibitor (sildenafil) trong 24h', 'HA tâm thu <90 mmHg', 'Tăng áp lực nội sọ'], warnings: ['Dung nạp khi dùng liên tục, cần khoảng nghỉ 8–12h', 'Đau đầu'], interactionsMajor: ['sildenafil', 'tadalafil', 'vardenafil (hạ HA nặng)'], pregnancyCat: 'C' }, rxStatus: 'Rx', color: '#dc2626', icon: '💗', usedInYears: [3, 4, 5], keyPoints: ['Cơn đau >5 phút không đỡ sau ngậm: gọi cấp cứu', 'TUYỆT ĐỐI tránh sildenafil 24h trước/sau', 'Bảo quản trong lọ tối'] },
    { id: 'hydrochlorothiazid', inn: 'Hydrochlorothiazide', nameVN: 'Hydroclorothiazid', brandNames: ['Hypothiazid', 'Microzide'], atc: 'C03AA03', atcL1: 'C', short: 'HCTZ', therapeuticClass: 'Huyết áp', pharmClass: 'Lợi tiểu thiazid', mechanism: 'Ức chế Na-Cl cotransporter ở ống lượn xa → lợi tiểu mức độ trung bình', forms: [{ form: 'Viên nén', strength: '25mg', route: 'PO' }], pk: { bioavailability: 0.7, halfLifeH: 10, elimination: 'Renal 100%' }, indications: ['Tăng huyết áp (đầu tay theo JNC)', 'Phù nhẹ–vừa', 'Sỏi calci tiết niệu'], dosing: { adult: '12.5–25mg/ngày sáng', maxDaily: '50mg' }, safety: { contraindications: ['Vô niệu', 'Quá mẫn sulfonamide', 'eGFR <30 (kém hiệu lực)'], warnings: ['Hạ K, Na, Mg', 'Tăng acid uric, glucose, calci máu', 'Cường giáo cảm với ánh sáng'], interactionsMajor: ['lithium', 'NSAID', 'digoxin (qua hạ K)'], pregnancyCat: 'B' }, rxStatus: 'Rx', color: '#06b6d4', icon: '💧', usedInYears: [3, 4, 5], keyPoints: ['Đầu tay tăng huyết áp ở người không có bệnh phối hợp', 'Theo dõi K, Na, acid uric, đường máu', 'Mất hiệu lực khi eGFR <30 → đổi sang lợi tiểu quai'] },
    { id: 'insulin-regular', inn: 'Insulin human regular', nameVN: 'Insulin tác dụng nhanh', brandNames: ['Actrapid', 'Humulin R', 'Mixtard'], atc: 'A10AB01', atcL1: 'A', short: 'INS-R', therapeuticClass: 'Tiểu đường', pharmClass: 'Insulin người tác dụng ngắn', mechanism: 'Gắn thụ thể insulin → tăng thu nạp glucose vào tế bào, ức chế phân huỷ glycogen', forms: [{ form: 'Lọ tiêm', strength: '100 IU/mL', route: 'SC' }, { form: 'Lọ tiêm', strength: '100 IU/mL', route: 'IV' }], pk: { halfLifeH: 0.1, onsetMin: 30, durationH: 6 }, indications: ['ĐTĐ type 1', 'ĐTĐ type 2 kiểm soát kém', 'Toan ceton (DKA - IV)', 'ĐTĐ thai kỳ'], dosing: { adult: 'Cá thể hoá theo glucose máu; trung bình 0.5–1 IU/kg/ngày tổng' }, safety: { contraindications: ['Hạ đường huyết'], warnings: ['Hạ ĐH', 'Lipodystrophy tại chỗ tiêm', 'Đổi vị trí tiêm thường xuyên'], interactionsMajor: ['β-blocker (che hạ ĐH)', 'rượu', 'corticoid (tăng đường máu)'], pregnancyCat: 'B' }, rxStatus: 'Rx', color: '#ea580c', icon: '💉', usedInYears: [3, 4, 5], keyPoints: ['Tiêm 30 phút TRƯỚC ăn', 'Bảo quản chưa mở: 2–8°C; đã mở: nhiệt độ phòng 28 ngày', 'IV chỉ dùng cho insulin regular (không glargine/lispro)'] },
    { id: 'gliclazid', inn: 'Gliclazide', nameVN: 'Gliclazid', brandNames: ['Diamicron MR', 'Glydiamic'], atc: 'A10BB09', atcL1: 'A', short: 'GLIC', therapeuticClass: 'Tiểu đường', pharmClass: 'Sulfonylurea thế hệ 2', mechanism: 'Đóng kênh K-ATP của tế bào β tuỵ → tăng tiết insulin', forms: [{ form: 'Viên giải phóng kéo dài', strength: '30mg', route: 'PO' }, { form: 'Viên giải phóng kéo dài', strength: '60mg', route: 'PO' }], pk: { halfLifeH: 12, metabolism: 'Hepatic CYP2C9', elimination: 'Renal' }, indications: ['ĐTĐ type 2 (sau hoặc cùng metformin)'], dosing: { adult: '30–120mg × 1/ngày sáng cùng bữa ăn', maxDaily: '120mg' }, safety: { contraindications: ['ĐTĐ type 1', 'Toan ceton', 'Suy gan/thận nặng'], warnings: ['Hạ đường huyết (ít hơn glibenclamid)', 'Tăng cân nhẹ'], interactionsMajor: ['fluconazol', 'warfarin', 'sulfonamide', 'beta-blocker'], pregnancyCat: 'C' }, rxStatus: 'Rx', color: '#d97706', icon: '🩸', usedInYears: [3, 4, 5], keyPoints: ['An toàn hơn glibenclamid ở người già', 'Dạng MR: uống 1 lần/ngày sáng', 'Vẫn có nguy cơ hạ ĐH'] },
    { id: 'prednisolon', inn: 'Prednisolone', nameVN: 'Prednisolon', brandNames: ['Prednisolone', 'Solupred'], atc: 'H02AB06', atcL1: 'H', short: 'PRED', therapeuticClass: 'Corticoid', pharmClass: 'Glucocorticoid tổng hợp tác dụng trung bình', mechanism: 'Gắn thụ thể glucocorticoid → ức chế tổng hợp cytokine, ức chế miễn dịch + chống viêm', forms: [{ form: 'Viên nén', strength: '5mg', route: 'PO' }, { form: 'Siro', strength: '5mg/5mL', route: 'PO' }], pk: { bioavailability: 0.7, halfLifeH: 3, metabolism: 'Hepatic' }, indications: ['Đợt cấp hen, COPD', 'Bệnh tự miễn', 'Dị ứng nặng', 'Viêm khớp'], dosing: { adult: '5–60mg/ngày uống sáng; ngừng giảm dần nếu dùng >2 tuần' }, safety: { contraindications: ['Nhiễm nấm hệ thống', 'Quá mẫn'], warnings: ['Loét dạ dày', 'Loãng xương', 'Đục thuỷ tinh thể', 'Tăng đường máu', 'Cushing iatrogenic', 'KHÔNG ngưng đột ngột nếu dùng >2 tuần'], commonAdverse: ['Tăng cân', 'Mặt tròn', 'Mất ngủ', 'Tăng HA'], interactionsMajor: ['NSAID (loét)', 'thuốc hạ K (cộng hạ K)', 'vaccin sống (CCĐ liều cao)'], pregnancyCat: 'C' }, rxStatus: 'Rx', color: '#a16207', icon: '💊', usedInYears: [3, 4, 5], keyPoints: ['Uống buổi sáng để mô phỏng nhịp sinh học cortisol', 'Dùng >2 tuần: bắt buộc giảm liều dần', 'Theo dõi đường máu + HA'] },
    { id: 'hydrocortison', inn: 'Hydrocortisone', nameVN: 'Hydrocortison', brandNames: ['Solu-Cortef', 'Cortef'], atc: 'H02AB09', atcL1: 'H', short: 'HCOR', therapeuticClass: 'Corticoid', pharmClass: 'Glucocorticoid tự nhiên (cortisol)', mechanism: 'Giống cortisol nội sinh, gắn thụ thể glucocorticoid', forms: [{ form: 'Lọ tiêm', strength: '100mg', route: 'IV' }, { form: 'Viên nén', strength: '10mg', route: 'PO' }, { form: 'Kem bôi', strength: '1%', route: 'topical' }], pk: { halfLifeH: 1.5 }, indications: ['Suy thượng thận cấp (Addison crisis)', 'Sốc phản vệ', 'Liệu pháp thay thế ở suy thượng thận mạn', 'Viêm da dị ứng (bôi)'], dosing: { adult: 'Sốc: 100–500mg IV; thay thế: 15–25mg/ngày PO chia 2–3 lần' }, safety: { warnings: ['Cùng nhóm tác dụng phụ như prednisolon nhưng tác dụng mineralocorticoid mạnh hơn'], pregnancyCat: 'C' }, rxStatus: 'Rx', color: '#a16207', icon: '💉', usedInYears: [3, 4, 5], keyPoints: ['Đầu tay cho Addisonian crisis', 'Có tác dụng giữ Na (mineralocorticoid)', 'IV cho cấp cứu, PO cho thay thế mãn'] },
    { id: 'ondansetron', inn: 'Ondansetron', nameVN: 'Ondansetron', brandNames: ['Zofran', 'Onsia'], atc: 'A04AA01', atcL1: 'A', short: 'ONDA', therapeuticClass: 'Chống nôn', pharmClass: 'Ức chế thụ thể 5-HT3', mechanism: 'Chẹn thụ thể 5-HT3 ở trung tâm nôn (CTZ) và ngoại biên (ruột non)', forms: [{ form: 'Viên nén', strength: '8mg', route: 'PO' }, { form: 'Tiêm', strength: '4mg/2mL', route: 'IV' }, { form: 'Viên tan trong miệng', strength: '4mg', route: 'sublingual' }], pk: { bioavailability: 0.6, halfLifeH: 4, metabolism: 'Hepatic CYP3A4/2D6' }, indications: ['Nôn do hoá trị/xạ trị', 'Nôn sau mổ', 'Nôn nặng do nhiều nguyên nhân'], dosing: { adult: '4–8mg × 2–3/ngày PO/IV', maxDaily: '32mg/ngày' }, safety: { warnings: ['Kéo dài QT (đặc biệt liều >16mg IV)', 'Hội chứng serotonin khi phối hợp SSRI'], commonAdverse: ['Đau đầu', 'Táo bón', 'Mệt mỏi'], interactionsMajor: ['SSRI/SNRI (serotonin syndrome)', 'thuốc kéo dài QT khác'], pregnancyCat: 'B' }, rxStatus: 'Rx', color: '#16a34a', icon: '🤢', usedInYears: [3, 4, 5], keyPoints: ['Đầu tay nôn do hoá trị', 'Liều đơn IV cao → kéo dài QT', 'Tránh kết hợp SSRI'] },
    { id: 'loperamid', inn: 'Loperamide', nameVN: 'Loperamid', brandNames: ['Imodium'], atc: 'A07DA03', atcL1: 'A', short: 'LOPE', therapeuticClass: 'Tiêu hóa', pharmClass: 'Opioid tác dụng tại chỗ (μ-agonist không qua BBB)', mechanism: 'Gắn thụ thể μ ở thành ruột → giảm nhu động, tăng tái hấp thu nước', forms: [{ form: 'Viên nang', strength: '2mg', route: 'PO' }], pk: { halfLifeH: 11, metabolism: 'Hepatic CYP3A4/2C8' }, indications: ['Tiêu chảy cấp không nhiễm khuẩn xâm nhập', 'Tiêu chảy mạn'], dosing: { adult: 'Khởi đầu 4mg, sau mỗi lần đi lỏng 2mg', maxDaily: '16mg/ngày' }, safety: { contraindications: ['Tiêu chảy nhiễm khuẩn xâm nhập (lỵ, có máu)', 'Trẻ <6 tuổi', 'Viêm đại tràng do C.difficile'], warnings: ['Liều cao → loạn nhịp tim (kéo dài QT)'], interactionsMajor: ['quinidin (tăng nồng độ)', 'ritonavir'], pregnancyCat: 'C' }, rxStatus: 'OTC', color: '#fb8c00', icon: '🚽', usedInYears: [2, 3, 4, 5], keyPoints: ['KHÔNG dùng khi tiêu chảy có máu/sốt', 'Trẻ em <6 tuổi: chống chỉ định', 'Bù nước-điện giải vẫn là cốt yếu'] },
    { id: 'lactulose', inn: 'Lactulose', nameVN: 'Lactulose', brandNames: ['Duphalac', 'Lactulose Stada'], atc: 'A06AD11', atcL1: 'A', short: 'LACT', therapeuticClass: 'Tiêu hóa', pharmClass: 'Nhuận tràng thẩm thấu (disaccharide tổng hợp)', mechanism: 'Không bị tiêu hoá ở ruột non, vi khuẩn đại tràng lên men → hút nước thẩm thấu + giảm pH bẫy NH3', forms: [{ form: 'Siro', strength: '10g/15mL', route: 'PO' }], pk: { bioavailability: 0.03 }, indications: ['Táo bón mạn', 'Bệnh não gan (hepatic encephalopathy)'], dosing: { adult: 'Táo bón: 15–30mL/ngày; Bệnh não gan: 30–45mL × 3–4/ngày để đại tiện 2–3 lần/ngày' }, safety: { contraindications: ['Galactosemia', 'Tắc ruột'], commonAdverse: ['Đầy hơi', 'Đau bụng', 'Tiêu chảy nếu quá liều'], pregnancyCat: 'B' }, rxStatus: 'OTC', color: '#fb8c00', icon: '🍯', usedInYears: [2, 3, 4, 5], keyPoints: ['An toàn ở thai kỳ và trẻ em', 'Bệnh não gan: chỉnh liều đến 2–3 lần đại tiện/ngày', 'Tác dụng sau 24–48h'] },
    { id: 'budesonid-inh', inn: 'Budesonide', nameVN: 'Budesonid (hít)', brandNames: ['Pulmicort', 'Symbicort (+formoterol)'], atc: 'R03BA02', atcL1: 'R', short: 'BUDE', therapeuticClass: 'Hô hấp', pharmClass: 'Corticoid hít (ICS)', mechanism: 'Gắn thụ thể glucocorticoid ở niêm mạc phế quản → giảm viêm tại chỗ', forms: [{ form: 'Bình hít', strength: '200mcg/nhát', route: 'inhalation' }, { form: 'Khí dung', strength: '0.5mg/2mL', route: 'inhalation' }], pk: { halfLifeH: 2.8, metabolism: 'Hepatic CYP3A4' }, indications: ['Hen phế quản (kiểm soát)', 'COPD (phối hợp LABA)'], dosing: { adult: '200–800 mcg/ngày chia 1–2 lần', pediatric: '100–400 mcg/ngày' }, safety: { warnings: ['Nấm miệng (Candida)', 'Khàn tiếng', 'Súc miệng sau hít'], commonAdverse: ['Khàn tiếng', 'Kích ứng họng'], interactionsMajor: ['ketoconazol/itraconazol (tăng nồng độ)'], pregnancyCat: 'B' }, rxStatus: 'Rx', color: '#00897b', icon: '💨', usedInYears: [3, 4, 5], keyPoints: ['ICS là nền điều trị hen, dùng đều, KHÔNG cắt cơn', 'Súc miệng sau hít để tránh nấm', 'Trẻ em: kiểm tra chiều cao định kỳ'] },
    { id: 'ipratropium', inn: 'Ipratropium bromide', nameVN: 'Ipratropium', brandNames: ['Atrovent', 'Combivent (+salbutamol)'], atc: 'R03BB01', atcL1: 'R', short: 'IPRA', therapeuticClass: 'Hô hấp', pharmClass: 'Kháng cholinergic (SAMA)', mechanism: 'Đối kháng M3 muscarinic → giãn cơ trơn phế quản', forms: [{ form: 'Bình xịt định liều', strength: '20mcg/nhát', route: 'inhalation' }, { form: 'Khí dung', strength: '0.25mg/mL', route: 'inhalation' }], pk: { onsetMin: 15, durationH: 6 }, indications: ['COPD đợt cấp (phối hợp SABA)', 'Hen đợt cấp nặng'], dosing: { adult: '2 nhát × 4/ngày; khí dung 0.5mg × 3–4/ngày' }, safety: { contraindications: ['Quá mẫn atropine'], warnings: ['Tăng nhãn áp góc đóng', 'Bí tiểu ở phì đại tiền liệt tuyến'], commonAdverse: ['Khô miệng', 'Vị đắng'], pregnancyCat: 'B' }, rxStatus: 'Rx', color: '#00897b', icon: '💨', usedInYears: [3, 4, 5], keyPoints: ['Đầu tay trong COPD đợt cấp (phối hợp SABA)', 'Tránh để dung dịch tiếp xúc với mắt (giãn đồng tử)', 'Phối hợp với salbutamol tăng tác dụng'] },
    { id: 'montelukast', inn: 'Montelukast', nameVN: 'Montelukast', brandNames: ['Singulair', 'Montair'], atc: 'R03DC03', atcL1: 'R', short: 'MONT', therapeuticClass: 'Hô hấp', pharmClass: 'Đối kháng thụ thể leukotriene (LTRA)', mechanism: 'Chẹn thụ thể CysLT1 của leukotriene D4 → giảm co thắt phế quản và viêm', forms: [{ form: 'Viên nén', strength: '10mg', route: 'PO' }, { form: 'Viên nhai', strength: '5mg', route: 'PO' }], pk: { bioavailability: 0.64, halfLifeH: 4, metabolism: 'Hepatic CYP3A4/2C9' }, indications: ['Hen nhẹ–vừa (bổ sung)', 'Viêm mũi dị ứng', 'Hen do gắng sức'], dosing: { adult: '10mg × 1/ngày tối', pediatric: '5mg (6–14t); 4mg (2–5t)' }, safety: { warnings: ['Báo cáo rối loạn tâm thần kinh ở trẻ em (ý nghĩ tự sát, ác mộng): FDA Black Box'], commonAdverse: ['Đau đầu', 'Đau bụng'], pregnancyCat: 'B' }, rxStatus: 'Rx', color: '#00897b', icon: '🍃', usedInYears: [3, 4, 5], keyPoints: ['Bổ sung: không thay ICS làm nền', 'Cảnh báo tâm thần kinh ở trẻ em', 'Uống buổi tối'] },
    { id: 'ambroxol', inn: 'Ambroxol', nameVN: 'Ambroxol', brandNames: ['Mucosolvan', 'Ambron'], atc: 'R05CB06', atcL1: 'R', short: 'AMBR', therapeuticClass: 'Hô hấp', pharmClass: 'Long đờm (mucolytic)', mechanism: 'Tăng tiết surfactant + dịch nhầy lỏng + tăng vận chuyển nhung mao', forms: [{ form: 'Viên nén', strength: '30mg', route: 'PO' }, { form: 'Siro', strength: '15mg/5mL', route: 'PO' }], pk: { bioavailability: 0.7, halfLifeH: 10 }, indications: ['Viêm phế quản, COPD có đờm đặc', 'Hỗ trợ điều trị nhiễm khuẩn hô hấp'], dosing: { adult: '30mg × 3/ngày', pediatric: 'Theo tuổi (siro)' }, safety: { commonAdverse: ['Buồn nôn nhẹ', 'Khó chịu dạ dày'], warnings: ['Hiếm: phản ứng da nặng (SJS), báo cáo gần đây'], pregnancyCat: 'A (chỉ 3 tháng đầu thận trọng)' }, rxStatus: 'OTC', color: '#0891b2', icon: '🫁', usedInYears: [2, 3, 4, 5], keyPoints: ['Uống nhiều nước để hỗ trợ tác dụng', 'KHÔNG kết hợp với thuốc giảm ho ức chế trung tâm', 'Phổ biến ở VN'] },
    { id: 'dextromethorphan', inn: 'Dextromethorphan', nameVN: 'Dextromethorphan', brandNames: ['Atussin', 'Robitussin DM'], atc: 'R05DA09', atcL1: 'R', short: 'DXM', therapeuticClass: 'Hô hấp', pharmClass: 'Giảm ho trung ương non-opioid', mechanism: 'Ức chế trung tâm ho ở hành tuỷ qua thụ thể NMDA và sigma', forms: [{ form: 'Viên nén', strength: '15mg', route: 'PO' }, { form: 'Siro', strength: '15mg/5mL', route: 'PO' }], pk: { halfLifeH: 3, metabolism: 'Hepatic CYP2D6' }, indications: ['Ho khan không đờm'], dosing: { adult: '15–30mg × 3–4/ngày', maxDaily: '120mg' }, safety: { contraindications: ['Đang dùng MAOI', 'Trẻ <2 tuổi'], warnings: ['Lạm dụng giải trí (hiệu ứng phân ly liều cao)', 'Hội chứng serotonin với SSRI'], interactionsMajor: ['MAOI', 'SSRI', 'fluoxetine (CYP2D6 inhibitor)'], pregnancyCat: 'C' }, rxStatus: 'OTC', color: '#0891b2', icon: '🤧', usedInYears: [2, 3, 4, 5], keyPoints: ['CHỈ dùng cho ho khan, không cho ho có đờm', 'Tránh phối hợp SSRI', 'Khả năng lạm dụng giải trí'] },
    { id: 'carbamazepin', inn: 'Carbamazepine', nameVN: 'Carbamazepin', brandNames: ['Tegretol', 'Carbatol'], atc: 'N03AF01', atcL1: 'N', short: 'CARB', therapeuticClass: 'Thần kinh', pharmClass: 'Thuốc chống động kinh', mechanism: 'Chẹn kênh Na phụ thuộc điện thế → ổn định màng tế bào thần kinh', forms: [{ form: 'Viên nén', strength: '200mg', route: 'PO' }], pk: { bioavailability: 0.8, halfLifeH: 18, proteinBinding: 0.75, metabolism: 'Hepatic CYP3A4 (tự cảm ứng)', cypInteractions: ['CYP3A4 strong inducer'] }, indications: ['Động kinh cục bộ', 'Đau dây thần kinh sinh ba', 'Rối loạn lưỡng cực'], dosing: { adult: 'Khởi đầu 200mg × 2/ngày, tăng dần đến 400–1200mg/ngày', maxDaily: '1600mg' }, safety: { contraindications: ['Block AV', 'Suy tuỷ', 'Tiền sử phản ứng da với carbamazepin'], warnings: ['SJS/TEN ở người mang HLA-B*1502 (đặc biệt người Đông Á, XÉT NGHIỆM TRƯỚC)', 'Giảm bạch cầu hạt', 'Hạ Na máu (SIADH)'], commonAdverse: ['Buồn ngủ', 'Chóng mặt', 'Buồn nôn'], interactionsMajor: ['warfarin (giảm)', 'thuốc tránh thai (giảm)', 'macrolid (tăng carbamazepin)', 'valproate'], pregnancyCat: 'D (gây dị tật ống thần kinh)' }, rxStatus: 'Rx', color: '#7c3aed', icon: '🧠', usedInYears: [3, 4, 5], keyPoints: ['XÉT NGHIỆM HLA-B*1502 trước khi kê cho người Đông Á (SJS/TEN)', 'Cảm ứng CYP3A4 mạnh, giảm hiệu lực nhiều thuốc', 'Tự cảm ứng → liều cần điều chỉnh sau 2–4 tuần'] },
    { id: 'phenytoin', inn: 'Phenytoin', nameVN: 'Phenytoin', brandNames: ['Dilantin', 'Phenytoin Sodium'], atc: 'N03AB02', atcL1: 'N', short: 'PHEN', therapeuticClass: 'Thần kinh', pharmClass: 'Thuốc chống động kinh', mechanism: 'Chẹn kênh Na điện thế phụ thuộc tần số → giảm phóng điện thần kinh', forms: [{ form: 'Viên nang', strength: '100mg', route: 'PO' }, { form: 'Tiêm', strength: '250mg/5mL', route: 'IV' }], pk: { halfLifeH: 22, proteinBinding: 0.9, metabolism: 'Hepatic CYP2C9/2C19 (phi tuyến tính)', cypInteractions: ['CYP3A4 inducer', 'CYP2C9 inducer'] }, indications: ['Động kinh cơn lớn (tonic-clonic)', 'Trạng thái động kinh (IV)'], dosing: { adult: 'Loading 15–20 mg/kg IV; maintenance 300mg/ngày chia 3', maxDaily: 'Theo nồng độ (mục tiêu 10–20 mcg/mL)' }, safety: { warnings: ['Tăng sản nướu', 'Rậm lông', 'Loạn vận động (ngộ độc)', 'SJS HLA-B*1502', 'Phi tuyến tính: tăng liều nhỏ → nồng độ tăng vọt'], interactionsMajor: ['warfarin', 'thuốc tránh thai', 'theophylline', 'fluconazol (tăng phenytoin)'], pregnancyCat: 'D' }, rxStatus: 'Rx', color: '#7c3aed', icon: '🧠', usedInYears: [4, 5], keyPoints: ['Dược động học PHI TUYẾN, bắt buộc TDM', 'IV: tốc độ tối đa 50 mg/phút (loạn nhịp)', 'Cảm ứng enzyme mạnh'] },
    { id: 'valproat', inn: 'Sodium valproate', nameVN: 'Natri valproat', brandNames: ['Depakine', 'Encorate'], atc: 'N03AG01', atcL1: 'N', short: 'VALP', therapeuticClass: 'Thần kinh', pharmClass: 'Thuốc chống động kinh phổ rộng', mechanism: 'Tăng GABA + chẹn kênh Na/Ca → ổn định màng neuron', forms: [{ form: 'Viên nén', strength: '500mg', route: 'PO' }, { form: 'Siro', strength: '200mg/5mL', route: 'PO' }], pk: { halfLifeH: 14, proteinBinding: 0.9, metabolism: 'Hepatic', cypInteractions: ['CYP2C9 inhibitor'] }, indications: ['Động kinh toàn thể và cục bộ', 'Rối loạn lưỡng cực', 'Đau nửa đầu dự phòng'], dosing: { adult: '10–15 mg/kg/ngày khởi đầu, tăng đến 30–60 mg/kg/ngày', maxDaily: '60 mg/kg/ngày' }, safety: { contraindications: ['Bệnh ty thể POLG', 'Suy gan', 'Có thai (động kinh phải bàn kỹ với chuyên gia)'], warnings: ['ĐỘC GAN cấp (hiếm, tử vong)', 'Viêm tuỵ', 'DỊ TẬT ỐNG THẦN KINH ở trẻ, KHÔNG dùng cho nữ trong tuổi sinh đẻ trừ không lựa chọn khác', 'Tăng cân', 'Rụng tóc'], interactionsMajor: ['lamotrigin (tăng độc tính)', 'carbamazepin', 'warfarin', 'aspirin'], pregnancyCat: 'X (thuốc gây quái thai cao nhất trong nhóm AED)' }, rxStatus: 'Rx', color: '#7c3aed', icon: '🧠', usedInYears: [4, 5], keyPoints: ['TUYỆT ĐỐI tránh ở nữ tuổi sinh đẻ nếu không bắt buộc (gây dị tật thần kinh)', 'Theo dõi ALT trong 6 tháng đầu', 'Phổ rộng nhất trong nhóm AED'] },
    { id: 'sertralin', inn: 'Sertraline', nameVN: 'Sertralin', brandNames: ['Zoloft', 'Asentra'], atc: 'N06AB06', atcL1: 'N', short: 'SERT', therapeuticClass: 'Tâm thần', pharmClass: 'Ức chế tái thu serotonin chọn lọc (SSRI)', mechanism: 'Ức chế SERT → tăng serotonin synapse', forms: [{ form: 'Viên nén', strength: '50mg', route: 'PO' }, { form: 'Viên nén', strength: '100mg', route: 'PO' }], pk: { halfLifeH: 26, proteinBinding: 0.98, metabolism: 'Hepatic CYP2D6/3A4' }, indications: ['Trầm cảm chủ yếu', 'Rối loạn lo âu', 'OCD', 'PTSD'], dosing: { adult: 'Khởi đầu 25–50mg/ngày, tăng đến 100–200mg', maxDaily: '200mg' }, safety: { contraindications: ['Đang dùng MAOI (chờ 14 ngày)', 'Phối hợp pimozide'], warnings: ['Hội chứng serotonin', 'Tăng ý nghĩ tự sát ở trẻ và người trẻ tuổi (Black Box)', 'Hạ Na máu (SIADH) ở người già'], commonAdverse: ['Buồn nôn', 'Rối loạn tình dục', 'Mất ngủ'], interactionsMajor: ['MAOI', 'tramadol', 'triptan', 'warfarin', 'ondansetron (QT + serotonin)'], pregnancyCat: 'C' }, rxStatus: 'Rx', color: '#4338ca', icon: '🧠', usedInYears: [4, 5], keyPoints: ['Tác dụng đầy đủ sau 4–6 tuần', 'KHÔNG ngưng đột ngột', 'Nguy cơ serotonin syndrome khi phối hợp'] },
    { id: 'fluoxetin', inn: 'Fluoxetine', nameVN: 'Fluoxetin', brandNames: ['Prozac', 'Fluxen'], atc: 'N06AB03', atcL1: 'N', short: 'FLUO', therapeuticClass: 'Tâm thần', pharmClass: 'Ức chế tái thu serotonin chọn lọc (SSRI)', mechanism: 'Ức chế SERT → tăng serotonin synapse', forms: [{ form: 'Viên nang', strength: '20mg', route: 'PO' }], pk: { halfLifeH: 96, proteinBinding: 0.95, metabolism: 'Hepatic CYP2D6 → norfluoxetin (active, t½ 7–15 ngày)', cypInteractions: ['CYP2D6 strong inhibitor', 'CYP3A4 inhibitor'] }, indications: ['Trầm cảm', 'OCD', 'Hoảng sợ', 'Bulimia'], dosing: { adult: '20mg buổi sáng, tăng đến 60mg', maxDaily: '80mg' }, safety: { warnings: ['t½ dài → chờ ≥5 tuần khi đổi sang MAOI', 'Hội chứng serotonin', 'Ý nghĩ tự sát ở trẻ'], interactionsMajor: ['MAOI', 'tramadol', 'warfarin', 'thuốc qua CYP2D6 (tăng nồng độ)'], pregnancyCat: 'C' }, rxStatus: 'Rx', color: '#4338ca', icon: '🧠', usedInYears: [4, 5], keyPoints: ['t½ rất dài + active metabolite: wash-out 5 tuần trước MAOI', 'Ức chế CYP2D6 mạnh, nhiều tương tác', 'An toàn nhất trong thai kỳ nhóm SSRI'] },
    { id: 'haloperidol', inn: 'Haloperidol', nameVN: 'Haloperidol', brandNames: ['Haldol', 'Haloperidol Stada'], atc: 'N05AD01', atcL1: 'N', short: 'HALO', therapeuticClass: 'Tâm thần', pharmClass: 'Chống loạn thần thế hệ 1 (butyrophenon)', mechanism: 'Chẹn thụ thể D2 dopamine ở não → giảm triệu chứng dương tính của loạn thần', forms: [{ form: 'Viên nén', strength: '2mg', route: 'PO' }, { form: 'Tiêm', strength: '5mg/mL', route: 'IM' }], pk: { halfLifeH: 18, metabolism: 'Hepatic CYP3A4/2D6' }, indications: ['Tâm thần phân liệt', 'Sảng cấp', 'Hội chứng Tourette'], dosing: { adult: 'PO: 2–10mg/ngày; IM: 2–5mg mỗi 4–8h khi cấp' }, safety: { contraindications: ['Hôn mê', 'Parkinson', 'Sa sút trí tuệ ở người già (tăng tử vong)'], warnings: ['Hội chứng ngoại tháp (EPS)', 'Loạn vận động muộn', 'Hội chứng an thần kinh ác tính', 'Kéo dài QT'], commonAdverse: ['Cứng cơ', 'Run', 'Bồn chồn'], interactionsMajor: ['levodopa', 'thuốc kéo dài QT khác'], pregnancyCat: 'C' }, rxStatus: 'Rx', color: '#4338ca', icon: '🧠', usedInYears: [4, 5], keyPoints: ['EPS rất hay gặp, phải theo dõi', 'Hữu ích trong sảng cấp (an thần ít hơn BZD)', 'TĂNG TỬ VONG ở người sa sút trí tuệ'] },
    { id: 'olanzapin', inn: 'Olanzapine', nameVN: 'Olanzapin', brandNames: ['Zyprexa', 'Olanzine'], atc: 'N05AH03', atcL1: 'N', short: 'OLAN', therapeuticClass: 'Tâm thần', pharmClass: 'Chống loạn thần thế hệ 2 (atypical)', mechanism: 'Chẹn D2 + 5-HT2A → cải thiện cả triệu chứng dương tính và âm tính, ít EPS hơn', forms: [{ form: 'Viên nén', strength: '5mg', route: 'PO' }, { form: 'Viên nén', strength: '10mg', route: 'PO' }], pk: { halfLifeH: 33, metabolism: 'Hepatic CYP1A2/2D6' }, indications: ['Tâm thần phân liệt', 'Cơn hưng cảm trong rối loạn lưỡng cực'], dosing: { adult: '5–20mg/ngày tối', maxDaily: '20mg' }, safety: { warnings: ['Tăng cân nhiều', 'Hội chứng chuyển hoá (ĐTĐ, mỡ máu)', 'Buồn ngủ', 'Tăng tử vong ở sa sút trí tuệ'], commonAdverse: ['Buồn ngủ', 'Khô miệng', 'Tăng cân'], interactionsMajor: ['fluvoxamin (CYP1A2 inhibitor)', 'thuốc hạ HA'], pregnancyCat: 'C' }, rxStatus: 'Rx', color: '#4338ca', icon: '🧠', usedInYears: [4, 5], keyPoints: ['Theo dõi cân nặng, đường máu, lipid 3 tháng/lần', 'Ít EPS hơn haloperidol', 'Hữu ích khi BN không tuân thủ, có dạng tiêm tác dụng kéo dài'] },
    { id: 'gabapentin', inn: 'Gabapentin', nameVN: 'Gabapentin', brandNames: ['Neurontin', 'Gabapen'], atc: 'N03AX12', atcL1: 'N', short: 'GABA', therapeuticClass: 'Thần kinh', pharmClass: 'Tương tự GABA (chẹn α2δ kênh Ca)', mechanism: 'Gắn tiểu đơn vị α2δ của kênh Ca điện thế phụ thuộc → giảm giải phóng dẫn truyền kích thích', forms: [{ form: 'Viên nang', strength: '300mg', route: 'PO' }, { form: 'Viên nén', strength: '600mg', route: 'PO' }], pk: { bioavailability: 0.6, halfLifeH: 6, elimination: 'Renal 100% nguyên dạng' }, indications: ['Đau thần kinh (sau zona, ĐTĐ)', 'Động kinh cục bộ (bổ sung)', 'Hội chứng chân không yên'], dosing: { adult: '300mg ngày 1 → 300×2 ngày 2 → 300×3 ngày 3, sau tăng đến 1800–3600mg/ngày', renal: 'CrCl <60: giảm liều' }, safety: { warnings: ['Buồn ngủ', 'Chóng mặt', 'Phù ngoại biên', 'Ý nghĩ tự sát'], commonAdverse: ['Buồn ngủ', 'Chóng mặt', 'Mệt'], pregnancyCat: 'C' }, rxStatus: 'Rx', color: '#7c3aed', icon: '🧠', usedInYears: [3, 4, 5], keyPoints: ['Tăng liều dần để giảm chóng mặt', 'Không qua chuyển hoá, an toàn ở suy gan', 'Giảm liều theo CrCl'] },
    { id: 'tramadol', inn: 'Tramadol', nameVN: 'Tramadol', brandNames: ['Ultram', 'Tramadol Stada'], atc: 'N02AX02', atcL1: 'N', short: 'TRAM', therapeuticClass: 'Giảm đau opioid', pharmClass: 'Opioid yếu + ức chế tái thu serotonin/norepinephrine', mechanism: 'μ-agonist yếu + ức chế tái thu SNRI → giảm đau qua 2 cơ chế', forms: [{ form: 'Viên nang', strength: '50mg', route: 'PO' }, { form: 'Tiêm', strength: '100mg/2mL', route: 'IM' }], pk: { halfLifeH: 6, metabolism: 'Hepatic CYP2D6 → O-desmethyltramadol (active)' }, indications: ['Đau vừa–nặng'], dosing: { adult: '50–100mg × 4–6/ngày', maxDaily: '400mg' }, safety: { contraindications: ['Ngộ độc rượu, opioid', 'Đang dùng MAOI', 'Trẻ <12 tuổi (FDA)'], warnings: ['Hội chứng serotonin (đặc biệt + SSRI)', 'Co giật', 'CYP2D6 ultra-rapid metabolizer → ngộ độc'], interactionsMajor: ['SSRI', 'MAOI', 'warfarin', 'carbamazepin (giảm tramadol)'], pregnancyCat: 'C' }, rxStatus: 'Rx', color: '#7c2d12', icon: '💊', usedInYears: [4, 5], keyPoints: ['KHÔNG kết hợp với SSRI/MAOI (serotonin syndrome)', 'KHÔNG dùng cho trẻ <12 tuổi (FDA Black Box)', 'Có thể gây co giật'] },
    { id: 'codein', inn: 'Codeine', nameVN: 'Codein', brandNames: ['Codeine Phosphate', 'Acdine'], atc: 'R05DA04', atcL1: 'R', short: 'COD', therapeuticClass: 'Hô hấp', pharmClass: 'Opioid yếu', mechanism: 'Tiền chất: CYP2D6 chuyển thành morphin → tác dụng μ-agonist', forms: [{ form: 'Viên nén', strength: '30mg', route: 'PO' }, { form: 'Siro phối hợp', strength: '15mg/5mL', route: 'PO' }], pk: { halfLifeH: 3, metabolism: 'Hepatic CYP2D6 → morphin (10% liều)' }, indications: ['Ho khan kéo dài', 'Đau nhẹ–vừa'], dosing: { adult: '15–60mg × 4/ngày', maxDaily: '240mg' }, safety: { contraindications: ['Trẻ <12 tuổi', 'Phụ nữ cho con bú (CYP2D6 ultra-rapid → con ngộ độc morphin)', 'Sau cắt amidan ở trẻ em'], warnings: ['Lệ thuộc', 'Táo bón'], interactionsMajor: ['CNS depressant', 'fluoxetin (giảm hoạt do ức chế CYP2D6)'], pregnancyCat: 'C' }, rxStatus: 'Rx', color: '#7c2d12', icon: '🍯', usedInYears: [3, 4, 5], keyPoints: ['CHỐNG CHỈ ĐỊNH trẻ <12 tuổi và phụ nữ cho con bú (FDA Black Box)', 'Là tiền chất: cần CYP2D6 chức năng', 'Phối hợp paracetamol thường gặp'] },
    { id: 'diclofenac', inn: 'Diclofenac', nameVN: 'Diclofenac', brandNames: ['Voltaren', 'Cataflam'], atc: 'M01AB05', atcL1: 'M', short: 'DICL', therapeuticClass: 'Chống viêm', pharmClass: 'NSAID không chọn lọc (nghiêng COX-2)', mechanism: 'Ức chế COX-1 và COX-2 (ưu tiên COX-2)', forms: [{ form: 'Viên nén', strength: '50mg', route: 'PO' }, { form: 'Tiêm', strength: '75mg/3mL', route: 'IM' }, { form: 'Gel bôi', strength: '1%', route: 'topical' }], pk: { bioavailability: 0.55, halfLifeH: 2, proteinBinding: 0.99, metabolism: 'Hepatic CYP2C9' }, indications: ['Viêm khớp', 'Đau cấp', 'Đau bụng kinh', 'Đau sau mổ'], dosing: { adult: '50mg × 2–3/ngày', maxDaily: '150mg' }, safety: { contraindications: ['Loét dạ dày', 'Suy tim NYHA II–IV', 'Bệnh tim thiếu máu (FDA)', 'Có thai 3 tháng cuối'], warnings: ['Tăng nguy cơ NMCT/đột quỵ (NSAID có nguy cơ cao nhất)', 'Suy thận', 'Tăng men gan'], interactionsMajor: ['warfarin', 'methotrexate', 'lithium', 'ACEi'], pregnancyCat: 'C (D 3 tháng cuối)' }, rxStatus: 'Rx', color: '#65a30d', icon: '🦴', usedInYears: [3, 4, 5], keyPoints: ['Nguy cơ tim mạch CAO nhất trong NSAID, tránh ở BN tim mạch', 'Gel bôi cho đau khu trú: ít tác dụng phụ', 'Tránh phối hợp NSAID + ACEi + lợi tiểu (triple whammy → suy thận cấp)'] },
    { id: 'naproxen', inn: 'Naproxen', nameVN: 'Naproxen', brandNames: ['Naprosyn', 'Aleve'], atc: 'M01AE02', atcL1: 'M', short: 'NAPR', therapeuticClass: 'Chống viêm', pharmClass: 'NSAID không chọn lọc', mechanism: 'Ức chế COX-1 và COX-2', forms: [{ form: 'Viên nén', strength: '500mg', route: 'PO' }], pk: { bioavailability: 0.95, halfLifeH: 14, proteinBinding: 0.99 }, indications: ['Viêm khớp dạng thấp', 'Đau bụng kinh', 'Cơn gout cấp', 'Đau cơ xương'], dosing: { adult: '250–500mg × 2/ngày', maxDaily: '1500mg' }, safety: { contraindications: ['Loét dạ dày', 'Suy tim', 'Suy thận nặng'], warnings: ['Nguy cơ tim mạch THẤP nhất trong NSAID (so với diclofenac, ibuprofen liều cao)'], interactionsMajor: ['warfarin', 'methotrexate', 'lithium', 'aspirin (giảm tác dụng tim mạch)'], pregnancyCat: 'C (D 3 tháng cuối)' }, rxStatus: 'OTC', color: '#65a30d', icon: '🦴', usedInYears: [3, 4, 5], keyPoints: ['t½ dài: uống 2 lần/ngày', 'NSAID an toàn tim mạch nhất (theo PRECISION trial)', 'Vẫn cần thận trọng dạ dày'] },
    { id: 'celecoxib', inn: 'Celecoxib', nameVN: 'Celecoxib', brandNames: ['Celebrex'], atc: 'M01AH01', atcL1: 'M', short: 'CELE', therapeuticClass: 'Chống viêm', pharmClass: 'NSAID ức chế chọn lọc COX-2', mechanism: 'Ức chế chọn lọc COX-2 → giảm prostaglandin viêm, ít tác dụng lên COX-1 (dạ dày, tiểu cầu)', forms: [{ form: 'Viên nang', strength: '200mg', route: 'PO' }], pk: { halfLifeH: 11, metabolism: 'Hepatic CYP2C9' }, indications: ['Viêm khớp', 'Đau cấp', 'Đau bụng kinh'], dosing: { adult: '100–200mg × 1–2/ngày', maxDaily: '400mg' }, safety: { contraindications: ['Quá mẫn sulfonamide', 'Có thai 3 tháng cuối', 'Suy tim NYHA II–IV'], warnings: ['Ít loét dạ dày hơn NSAID khác', 'NHƯNG vẫn tăng nguy cơ tim mạch'], interactionsMajor: ['warfarin', 'lithium', 'fluconazol (qua CYP2C9)'], pregnancyCat: 'C' }, rxStatus: 'Rx', color: '#65a30d', icon: '🦴', usedInYears: [4, 5], keyPoints: ['ÍT TÁC DỤNG PHỤ DẠ DÀY hơn, chỉ định cho BN có nguy cơ loét', 'Vẫn có nguy cơ tim mạch', 'Tránh nếu dị ứng sulfa'] },
    { id: 'dexamethason', inn: 'Dexamethasone', nameVN: 'Dexamethason', brandNames: ['Decadron', 'Dexa'], atc: 'H02AB02', atcL1: 'H', short: 'DEXA', therapeuticClass: 'Corticoid', pharmClass: 'Glucocorticoid tác dụng dài (25× cortisol)', mechanism: 'Gắn thụ thể glucocorticoid → ức chế viêm + miễn dịch mạnh, ít mineralocorticoid', forms: [{ form: 'Viên nén', strength: '0.5mg', route: 'PO' }, { form: 'Tiêm', strength: '4mg/mL', route: 'IV' }], pk: { halfLifeH: 36, metabolism: 'Hepatic CYP3A4' }, indications: ['Phù não', 'COVID-19 nặng (cần oxy)', 'Sốc phản vệ (sau epinephrine)', 'Chống nôn do hoá trị', 'Trưởng thành phổi thai'], dosing: { adult: 'Tuỳ chỉ định: 0.5–24mg/ngày', maxDaily: 'Cá thể hoá' }, safety: { warnings: ['Tác dụng glucocorticoid mạnh + dài → tác dụng phụ corticoid điển hình', 'Không giữ Na nhiều (so với hydrocortison)'], pregnancyCat: 'C' }, rxStatus: 'Rx', color: '#a16207', icon: '💉', usedInYears: [3, 4, 5], keyPoints: ['Tiềm lực mạnh nhất + tác dụng dài nhất', 'COVID-19 nặng: 6mg/ngày × 10 ngày (RECOVERY trial)', 'Ít giữ Na: tốt cho phù não'] },
    { id: 'rifampicin', inn: 'Rifampicin', nameVN: 'Rifampicin', brandNames: ['Rifadin', 'Tubocin'], atc: 'J04AB02', atcL1: 'J', short: 'RIF', therapeuticClass: 'Kháng lao', pharmClass: 'Rifamycin', mechanism: 'Ức chế DNA-dependent RNA polymerase của vi khuẩn', forms: [{ form: 'Viên nang', strength: '300mg', route: 'PO' }], pk: { bioavailability: 0.7, halfLifeH: 3, proteinBinding: 0.85, metabolism: 'Hepatic', cypInteractions: ['CYP3A4 strong inducer', 'CYP2C9 inducer', 'P-gp inducer'] }, indications: ['Lao (phối hợp)', 'Dự phòng viêm màng não do não mô cầu', 'Phong'], dosing: { adult: '10 mg/kg/ngày (thường 450–600mg) uống lúc đói', maxDaily: '600mg' }, safety: { warnings: ['Nước tiểu, nước mắt, mồ hôi MÀU CAM (vô hại)', 'Độc gan', 'CẢM ỨNG CYP3A4 cực mạnh, giảm hiệu lực rất nhiều thuốc'], commonAdverse: ['Tăng men gan', 'Buồn nôn', 'Phát ban'], interactionsMajor: ['warfarin (giảm)', 'thuốc tránh thai (giảm: phải đổi biện pháp)', 'thuốc HIV', 'methadon', 'corticoid', 'voriconazol'], pregnancyCat: 'C' }, rxStatus: 'Rx', color: '#dc2626', icon: '🟠', usedInYears: [4, 5], keyPoints: ['Cảnh báo BN: nước tiểu/dịch tiết SẼ đỏ cam', 'Thuốc tránh thai bị giảm hiệu lực → cần biện pháp tránh thai thay thế', 'Cảm ứng enzyme rất mạnh, kiểm tra TẤT CẢ thuốc đồng thời'] },
    { id: 'isoniazid', inn: 'Isoniazid', nameVN: 'Isoniazid (INH)', brandNames: ['INH', 'Rimifon'], atc: 'J04AC01', atcL1: 'J', short: 'INH', therapeuticClass: 'Kháng lao', pharmClass: 'Antimycobacterial (tổng hợp)', mechanism: 'Ức chế tổng hợp acid mycolic, thành phần thành tế bào M.tuberculosis', forms: [{ form: 'Viên nén', strength: '300mg', route: 'PO' }, { form: 'Viên nén', strength: '100mg', route: 'PO' }], pk: { halfLifeH: 1.5, metabolism: 'Hepatic N-acetyl hoá (đa hình di truyền acetyl chậm/nhanh)' }, indications: ['Lao hoạt động (phối hợp)', 'Lao tiềm ẩn (đơn trị 6–9 tháng)'], dosing: { adult: '5 mg/kg/ngày (thường 300mg) uống lúc đói + Vitamin B6 25mg/ngày' }, safety: { contraindications: ['Suy gan nặng', 'Bệnh thần kinh ngoại biên do INH trước đây'], warnings: ['Độc gan (đặc biệt người >35 tuổi, nghiện rượu)', 'Bệnh thần kinh ngoại biên (phòng bằng B6)', 'Phản ứng tâm thần'], interactionsMajor: ['phenytoin (tăng nồng độ)', 'rượu (tăng độc gan)', 'carbamazepin'], pregnancyCat: 'C' }, rxStatus: 'Rx', color: '#dc2626', icon: '🫁', usedInYears: [4, 5], keyPoints: ['BẮT BUỘC phối hợp Vitamin B6 (pyridoxin) để phòng bệnh thần kinh ngoại biên', 'Theo dõi ALT định kỳ', 'Đa hình acetyl hoá ảnh hưởng nồng độ, người VN đa số acetyl nhanh'] },
    { id: 'ethambutol', inn: 'Ethambutol', nameVN: 'Ethambutol', brandNames: ['Myambutol'], atc: 'J04AK02', atcL1: 'J', short: 'EMB', therapeuticClass: 'Kháng lao', pharmClass: 'Antimycobacterial', mechanism: 'Ức chế arabinosyl transferase → giảm tổng hợp thành tế bào mycobacteria', forms: [{ form: 'Viên nén', strength: '400mg', route: 'PO' }], pk: { halfLifeH: 4, elimination: 'Renal 80%' }, indications: ['Lao (phối hợp pha tấn công)', 'Nhiễm Mycobacterium không lao'], dosing: { adult: '15–25 mg/kg/ngày × 1 lần', renal: 'Giảm liều theo CrCl' }, safety: { contraindications: ['Viêm thần kinh thị giác'], warnings: ['VIÊM THẦN KINH THỊ, kiểm tra thị lực + sắc giác (đỏ/xanh) mỗi tháng', 'Tăng acid uric (gout)'], pregnancyCat: 'C' }, rxStatus: 'Rx', color: '#dc2626', icon: '👁️', usedInYears: [4, 5], keyPoints: ['Khám MẮT trước và mỗi tháng trong điều trị', 'Cảnh báo BN: báo ngay nếu mờ mắt, mất phân biệt đỏ-xanh', 'Liều phụ thuộc cân nặng'] },
    { id: 'pyrazinamid', inn: 'Pyrazinamide', nameVN: 'Pyrazinamid', brandNames: ['PZA', 'Pyrazinamide Stada'], atc: 'J04AK01', atcL1: 'J', short: 'PZA', therapeuticClass: 'Kháng lao', pharmClass: 'Antimycobacterial', mechanism: 'Chưa rõ: chuyển thành acid pyrazinoic trong vi khuẩn → phá vỡ chuyển hoá năng lượng', forms: [{ form: 'Viên nén', strength: '500mg', route: 'PO' }], pk: { halfLifeH: 10, metabolism: 'Hepatic' }, indications: ['Lao pha tấn công (2 tháng đầu phác đồ HRZE)'], dosing: { adult: '20–25 mg/kg/ngày (1000–2000mg)' }, safety: { contraindications: ['Suy gan nặng', 'Gout cấp'], warnings: ['Độc gan', 'Tăng acid uric → gout', 'Đau khớp'], pregnancyCat: 'C' }, rxStatus: 'Rx', color: '#dc2626', icon: '🫁', usedInYears: [4, 5], keyPoints: ['Chỉ trong pha tấn công (tháng 1–2)', 'Tăng acid uric: theo dõi', 'Phối hợp HRZE: Isoniazid + Rifampicin + Pyrazinamid + Ethambutol'] },
    { id: 'lamivudin', inn: 'Lamivudine', nameVN: 'Lamivudin', brandNames: ['Epivir', '3TC'], atc: 'J05AF05', atcL1: 'J', short: '3TC', therapeuticClass: 'Kháng virus', pharmClass: 'NRTI (ức chế phiên mã ngược)', mechanism: 'Tương tự cytidine: sau khi phosphoryl → kết thúc chuỗi DNA HIV/HBV', forms: [{ form: 'Viên nén', strength: '150mg', route: 'PO' }, { form: 'Viên nén', strength: '100mg', route: 'PO' }], pk: { bioavailability: 0.86, halfLifeH: 6, elimination: 'Renal' }, indications: ['HIV (phối hợp)', 'Viêm gan B mạn'], dosing: { adult: 'HIV: 150mg × 2/ngày; HBV: 100mg × 1/ngày', renal: 'Giảm liều theo CrCl' }, safety: { warnings: ['Đợt cấp viêm gan B khi ngưng', 'Acidosis lactic (hiếm)'], pregnancyCat: 'C' }, rxStatus: 'Rx', color: '#6366f1', icon: '🦠', usedInYears: [4, 5], keyPoints: ['Dùng cho cả HIV và HBV', 'Đề kháng phát triển nhanh nếu dùng đơn trị HIV', 'Liều khác nhau giữa HIV và HBV'] },
    { id: 'tenofovir', inn: 'Tenofovir disoproxil fumarate', nameVN: 'Tenofovir (TDF)', brandNames: ['Viread', 'Tenofovir Stada'], atc: 'J05AF07', atcL1: 'J', short: 'TDF', therapeuticClass: 'Kháng virus', pharmClass: 'NtRTI (nucleotide RT inhibitor)', mechanism: 'Tương tự adenosine monophosphate, ức chế phiên mã ngược của HIV/HBV', forms: [{ form: 'Viên nén', strength: '300mg', route: 'PO' }], pk: { bioavailability: 0.25, halfLifeH: 17, elimination: 'Renal 70–80%' }, indications: ['HIV (phối hợp)', 'Viêm gan B mạn', 'PrEP dự phòng HIV'], dosing: { adult: '300mg × 1/ngày', renal: 'CrCl <50: giãn liều' }, safety: { warnings: ['ĐỘC THẬN (giảm phosphate, hội chứng Fanconi)', 'Giảm mật độ xương', 'Acidosis lactic'], pregnancyCat: 'B' }, rxStatus: 'Rx', color: '#6366f1', icon: '🦠', usedInYears: [4, 5], keyPoints: ['Theo dõi creatinin + phosphate', 'TAF (tenofovir alafenamide) ít độc thận hơn, đang thay thế dần', 'Phối hợp cố định: TDF + 3TC + DTG là phác đồ HIV chuẩn'] },
    { id: 'sat-sulfat', inn: 'Ferrous sulfate', nameVN: 'Sắt sulfat', brandNames: ['Ferrous sulfate', 'Tardyferon'], atc: 'B03AA07', atcL1: 'B', short: 'FE', therapeuticClass: 'Vitamin', pharmClass: 'Khoáng chất bổ sung sắt', mechanism: 'Bổ sung sắt nguyên tố để tổng hợp hemoglobin', forms: [{ form: 'Viên nén', strength: '325mg (65mg Fe nguyên tố)', route: 'PO' }, { form: 'Siro', strength: 'Theo hàm lượng', route: 'PO' }], pk: { bioavailability: 0.1 }, indications: ['Thiếu máu thiếu sắt', 'Phòng thiếu máu thai kỳ'], dosing: { adult: '60–200 mg Fe nguyên tố/ngày chia 2–3, uống xa bữa ăn', pediatric: '3–6 mg/kg/ngày Fe nguyên tố' }, safety: { contraindications: ['Quá tải sắt (hemochromatosis)', 'Thiếu máu không do thiếu sắt'], warnings: ['Phân ĐEN (bình thường, không phải xuất huyết)', 'Quá liều ở trẻ em GÂY TỬ VONG'], commonAdverse: ['Táo bón', 'Đau bụng', 'Buồn nôn'], interactionsMajor: ['levothyroxin (cách 4h)', 'tetracyclin/quinolon (chelat)', 'antacid'], pregnancyCat: 'A' }, rxStatus: 'OTC', color: '#7c2d12', icon: '🩸', usedInYears: [2, 3, 4, 5], keyPoints: ['Uống cùng vitamin C để tăng hấp thu', 'Phân đen là bình thường', 'Cách xa levothyroxin, tetracyclin, quinolon ≥ 2–4h'] },
    { id: 'acid-folic', inn: 'Folic acid', nameVN: 'Acid folic (B9)', brandNames: ['Folacin', 'Folvit'], atc: 'B03BB01', atcL1: 'B', short: 'FOL', therapeuticClass: 'Vitamin', pharmClass: 'Vitamin B9', mechanism: 'Cofactor tổng hợp nucleotide DNA + chuyển hoá amino acid', forms: [{ form: 'Viên nén', strength: '5mg', route: 'PO' }, { form: 'Viên nén', strength: '0.4mg', route: 'PO' }], pk: { bioavailability: 0.85 }, indications: ['Phòng dị tật ống thần kinh (PHỤ NỮ MUỐN MANG THAI)', 'Thiếu máu hồng cầu to', 'Bổ sung khi dùng methotrexate', 'Thiếu máu trong thai kỳ'], dosing: { adult: 'Phòng dị tật: 0.4mg/ngày trước khi có thai 1 tháng → 12 tuần thai; thiếu máu: 5mg/ngày', pediatric: 'Theo tuổi' }, safety: { warnings: ['KHÔNG dùng liều cao đơn độc nếu thiếu B12 (che giấu thiếu B12 → thoái hoá thần kinh)'], pregnancyCat: 'A' }, rxStatus: 'OTC', color: '#16a34a', icon: '🤰', usedInYears: [2, 3, 4, 5], keyPoints: ['Khuyến cáo TẤT CẢ phụ nữ tuổi sinh đẻ: 0.4mg/ngày', 'Methotrexat: bổ sung 5mg/tuần', 'Kiểm tra B12 trước khi điều trị thiếu máu hồng cầu to'] },
    { id: 'oxytocin', inn: 'Oxytocin', nameVN: 'Oxytocin', brandNames: ['Pitocin', 'Syntocinon'], atc: 'H01BB02', atcL1: 'H', short: 'OXY', therapeuticClass: 'Hormone', pharmClass: 'Hormone tổng hợp giống oxytocin tự nhiên', mechanism: 'Gắn thụ thể oxytocin ở tử cung → co cơ trơn tử cung; ở vú → tiết sữa', forms: [{ form: 'Tiêm', strength: '10 IU/mL', route: 'IV' }, { form: 'Tiêm', strength: '5 IU/mL', route: 'IM' }], pk: { halfLifeH: 0.1 }, indications: ['Khởi phát chuyển dạ', 'Tăng cường cơn co tử cung', 'Phòng và điều trị xuất huyết sau sinh'], dosing: { adult: 'Khởi phát: truyền 1–6 mIU/phút tăng dần; sau sinh: 10 IU IM hoặc 5–10 IU IV chậm' }, safety: { contraindications: ['Bất tương xứng đầu-chậu', 'Suy thai', 'Đẻ ngả âm đạo chống chỉ định'], warnings: ['Tăng kích thích tử cung', 'Hạ Na máu (tác dụng giống ADH liều cao)', 'Hạ HA'], pregnancyCat: 'Không xếp loại: chỉ dùng cuối thai kỳ' }, rxStatus: 'Rx', color: '#ec4899', icon: '🤱', usedInYears: [4, 5], keyPoints: ['CHỈ dùng ở bệnh viện sản khoa', 'Theo dõi tim thai + cơn co liên tục', 'Cẩn thận hạ Na máu khi truyền dài + dịch tự do'] },
    { id: 'epinephrin', inn: 'Epinephrine (Adrenaline)', nameVN: 'Adrenalin', brandNames: ['EpiPen', 'Adrenaline Aguettant'], atc: 'C01CA24', atcL1: 'C', short: 'EPI', therapeuticClass: 'Cấp cứu', pharmClass: 'Đồng vận α và β adrenergic', mechanism: 'Kích thích α1 (co mạch), β1 (tăng nhịp tim, co bóp), β2 (giãn phế quản)', forms: [{ form: 'Ống tiêm', strength: '1mg/1mL (1:1000)', route: 'IM' }, { form: 'Ống tiêm', strength: '0.1mg/1mL (1:10000)', route: 'IV' }], pk: { halfLifeH: 0.05, onsetMin: 5 }, indications: ['SỐC PHẢN VỆ (đầu tay)', 'Ngừng tim (CPR)', 'Cơn hen nặng đe doạ tính mạng', 'Cầm máu tại chỗ'], dosing: { adult: 'Phản vệ: 0.3–0.5 mg IM mặt ngoài đùi, lặp 5–15 phút; CPR: 1mg IV mỗi 3–5 phút', pediatric: '0.01 mg/kg IM (tối đa 0.3mg)' }, safety: { contraindications: ['Không có chống chỉ định tuyệt đối khi cấp cứu phản vệ'], warnings: ['Loạn nhịp', 'Tăng HA cấp', 'Hoại tử do ngoại mạch'], pregnancyCat: 'C' }, rxStatus: 'Rx', color: '#dc2626', icon: '⚡', usedInYears: [3, 4, 5], keyPoints: ['Sốc phản vệ: EPI IM ĐÙI là HÀNG ĐẦU, không phải kháng histamin', 'Liều IM 1:1000 ≠ IV 1:10000, sai pha loãng = tử vong', 'Tiêm vào mặt ngoài đùi giữa'] },
    { id: 'atropin', inn: 'Atropine', nameVN: 'Atropin', brandNames: ['Atropine Sulfate'], atc: 'A03BA01', atcL1: 'A', short: 'ATRO', therapeuticClass: 'Cấp cứu', pharmClass: 'Đối kháng muscarinic (anticholinergic)', mechanism: 'Đối kháng cạnh tranh thụ thể muscarinic → giãn phế quản, tăng nhịp tim, giảm tiết', forms: [{ form: 'Tiêm', strength: '1mg/1mL', route: 'IV' }, { form: 'Tiêm', strength: '0.5mg/1mL', route: 'IM' }], pk: { halfLifeH: 4 }, indications: ['Nhịp tim chậm có triệu chứng', 'Ngộ độc cholinergic (organophosphate, carbamate)', 'Tiền mê (giảm tiết)'], dosing: { adult: 'Nhịp chậm: 0.5–1mg IV mỗi 3–5 phút (tối đa 3mg); ngộ độc OP: 2–5mg IV mỗi 5–10 phút đến khô tiết' }, safety: { contraindications: ['Glaucoma góc đóng', 'Phì đại tiền liệt tuyến tắc nghẽn'], warnings: ['Khô miệng', 'Bí tiểu', 'Lú lẫn ở người già', 'Tăng nhịp'], pregnancyCat: 'C' }, rxStatus: 'Rx', color: '#dc2626', icon: '⚡', usedInYears: [4, 5], keyPoints: ['Liều phải ≥ 0.5mg IV: liều thấp gây nhịp chậm nghịch lý', 'Ngộ độc OP: liều rất cao, mục tiêu KHÔ TIẾT (không phải bình thường hoá nhịp tim)', 'Anticholinergic toxidrome: nóng, đỏ, khô, mù, điên'] },
    { id: 'naloxon', inn: 'Naloxone', nameVN: 'Naloxon', brandNames: ['Narcan', 'Naloxone Hydrochloride'], atc: 'V03AB15', atcL1: 'V', short: 'NLX', therapeuticClass: 'Cấp cứu', pharmClass: 'Đối kháng cạnh tranh thụ thể opioid', mechanism: 'Đối kháng cạnh tranh thụ thể μ (chủ yếu) → đảo ngược ức chế hô hấp do opioid', forms: [{ form: 'Tiêm', strength: '0.4mg/1mL', route: 'IV' }, { form: 'Xịt mũi', strength: '4mg/0.1mL', route: 'nasal' }], pk: { halfLifeH: 1, onsetMin: 2 }, indications: ['Quá liều opioid (đảo ngược ức chế hô hấp)', 'Chẩn đoán quá liều opioid không rõ'], dosing: { adult: '0.04–0.4mg IV mỗi 2–3 phút đến khi có đáp ứng (RR >12); xịt mũi 4mg lặp lại mỗi 2–3 phút', pediatric: '0.01 mg/kg IV' }, safety: { warnings: ['t½ NGẮN hơn opioid, BN có thể rơi lại vào quá liều → THEO DÕI ≥ 4–6 giờ', 'Hội chứng cai opioid cấp'], pregnancyCat: 'C' }, rxStatus: 'Rx', color: '#dc2626', icon: '🆘', usedInYears: [4, 5], keyPoints: ['Cấp cứu quá liều morphin/heroin/fentanyl', 'BẮT BUỘC theo dõi ≥ 4h vì t½ ngắn', 'Khởi liều thấp (0.04mg) để tránh cai cấp ở BN nghiện'] },
];

// ─────────────────────────────────────────────────────────────
// Backward-compat shim — xuất MEDICINES (schema cũ) để 7 game cũ
// (2d-arcade, 3d-shelf, quiz, metaverse, time-attack, race, compounding-lab)
// không gãy.
//
// IDs phải khớp CHÍNH XÁC với medicines.js cũ (amox, asp, sme, par, vitc,
// lora, vent, omep, glib, ator, amlo, diaz, levo, metf, ibup, salb).
// Map riêng để tránh slice() ra ID khác (vd 'para' ≠ 'par').
// ─────────────────────────────────────────────────────────────
const LEGACY_ID_MAP = {
  'amoxicillin': 'amox',
  'aspirin': 'asp',
  'smecta': 'sme',
  'paracetamol': 'par',
  'vitamin-c': 'vitc',
  'loratadin': 'lora',
  'omeprazol': 'omep',
  'glibenclamid': 'glib',
  'atorvastatin': 'ator',
  'amlodipin': 'amlo',
  'diazepam': 'diaz',
  'levothyroxin': 'levo',
  'metformin': 'metf',
  'ibuprofen': 'ibup',
  // salbutamol-inh đại diện CẢ vent (bình xịt) + salb (siro) cũ — sẽ tách dưới.
};

function legacyEntryFor(d, formIdx = 0) {
  const f = d.forms[formIdx] || d.forms[0];
  return {
    id: LEGACY_ID_MAP[d.id] || d.short.toLowerCase().slice(0, 4),
    name: d.nameVN.toUpperCase(),
    dose: f?.strength || '',
    form: f?.form || '',
    short: d.short,
    category: d.therapeuticClass,
    color: d.color,
    atc: d.atc,
    indication: d.indications?.[0] || '',
  };
}

export const MEDICINES = (() => {
  const list = [];
  for (const d of DRUGS) {
    // Bỏ thuốc chưa có trong shim cũ (warfarin, clarithromycin, methotrexate…)
    // chỉ phục vụ Năm 4–5 modules, không đưa vào game năm 3.
    if (!LEGACY_ID_MAP[d.id] && d.id !== 'salbutamol-inh') continue;

    if (d.id === 'salbutamol-inh') {
      // Tách 2 entry cũ: 'vent' (bình xịt) + 'salb' (siro)
      const inhForm = d.forms.find(f => f.route === 'inhalation');
      const poForm  = d.forms.find(f => f.route === 'PO');
      if (inhForm) list.push({
        id: 'vent', name: 'VENTOLIN', dose: inhForm.strength, form: inhForm.form,
        short: 'VENT', category: 'Hô hấp', color: '#00897b', atc: d.atc,
        indication: 'Hen suyễn, COPD: giãn phế quản',
      });
      if (poForm) list.push({
        id: 'salb', name: 'SALBUTAMOL', dose: poForm.strength, form: poForm.form,
        short: 'SALB', category: 'Hô hấp', color: '#0284c7', atc: 'R03CC02',
        indication: 'Cơn hen cấp, giãn phế quản đường uống',
      });
    } else {
      list.push(legacyEntryFor(d, 0));
    }
  }
  return list;
})();

export const ALL_CATEGORIES = [...new Set(MEDICINES.map(m => m.category))];

// ─────────────────────────────────────────────────────────────
// Query helpers — dùng chung cho 38 module
// ─────────────────────────────────────────────────────────────

/** @param {string} id @returns {import('./types.js').Drug|undefined} */
export function getDrug(id) {
  return DRUGS.find(d => d.id === id);
}

/** @param {number} year @returns {import('./types.js').Drug[]} */
export function getDrugsForYear(year) {
  return DRUGS.filter(d => d.usedInYears?.includes(year));
}

/** @param {string} cls @returns {import('./types.js').Drug[]} */
export function getDrugsByClass(cls) {
  return DRUGS.filter(d => d.therapeuticClass === cls || d.pharmClass === cls);
}

/**
 * Trả về cặp tương tác cho danh sách drug IDs.
 * Dùng cho Module L3.3 — Tương tác thuốc.
 * @param {string[]} drugIds
 * @returns {Array<{a:string,b:string,severity:'major'|'moderate'}>}
 */
export function findInteractions(drugIds) {
  const pairs = [];
  for (let i = 0; i < drugIds.length; i++) {
    const a = getDrug(drugIds[i]);
    if (!a) continue;
    for (let j = i + 1; j < drugIds.length; j++) {
      const b = getDrug(drugIds[j]);
      if (!b) continue;
      if (a.safety?.interactionsMajor?.includes(b.id) || b.safety?.interactionsMajor?.includes(a.id)) {
        pairs.push({ a: a.id, b: b.id, severity: 'major' });
      } else if (a.safety?.interactionsModerate?.includes(b.id) || b.safety?.interactionsModerate?.includes(a.id)) {
        pairs.push({ a: a.id, b: b.id, severity: 'moderate' });
      }
    }
  }
  return pairs;
}

/** @param {number} count @returns {import('./types.js').Drug[]} */
export function pickRandomDrugs(count) {
  const arr = [...DRUGS];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr.slice(0, Math.min(count, arr.length));
}
