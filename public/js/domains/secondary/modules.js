// ============================================================
// Trường THCS — Module list
// ============================================================
// yearLevel = thứ tự lớp trong cấp (1→Lớp 6 … 4→Lớp 9), khớp DOMAIN.yearLabels.
// Hiện có nội dung môn Toán & Ngữ văn (quiz gốc); môn khác bổ sung dần.
// ============================================================

/** @type {import('../../engine/types.js').CourseModule[]} */
export const MODULES = [
  // ───────── Môn Toán ─────────
  // S6 = "cổng" vào lộ trình bài học (5 chương · nhiều bài) → subject.html
  { category: 'curriculum', id: 'S6', title: 'Toán lớp 6', yearLevel: 1, subject: 'toan',
    scenarioIds: [], minStarsToUnlock: 0,
    pathHref: 'subject.html?domain=secondary&subject=toan&grade=6',
    description: 'Lộ trình 5 chương: Số nguyên · Phân số · Tỉ số–tỉ lệ · ƯCLN–BCNN · Hình học cơ bản.' },
  { category: 'curriculum', id: 'S7', title: 'Toán lớp 7', yearLevel: 2, subject: 'toan',
    scenarioIds: ['S7TOAN-w01-quiz'], knowledgeQuiz: 'S7TOAN-w01-quiz', minStarsToUnlock: 3, prerequisites: ['S6'],
    description: 'Số hữu tỉ · số thực · tỉ lệ thức · tam giác · thống kê & xác suất.' },
  { category: 'curriculum', id: 'S8', title: 'Toán lớp 8', yearLevel: 3, subject: 'toan',
    scenarioIds: ['S8TOAN-w01-quiz'], knowledgeQuiz: 'S8TOAN-w01-quiz', minStarsToUnlock: 6, prerequisites: ['S7'],
    description: 'Hằng đẳng thức · phương trình bậc nhất · định lí Pythagore · tứ giác · hàm số.' },
  { category: 'curriculum', id: 'S9', title: 'Toán lớp 9', yearLevel: 4, subject: 'toan',
    scenarioIds: ['S9TOAN-w01-quiz'], knowledgeQuiz: 'S9TOAN-w01-quiz', minStarsToUnlock: 9, prerequisites: ['S8'],
    description: 'Căn bậc hai · hệ phương trình · phương trình bậc hai · hệ thức lượng · đường tròn.' },

  // ───────── Môn Ngữ văn ─────────
  { category: 'curriculum', id: 'SV6', title: 'Ngữ văn lớp 6', yearLevel: 1, subject: 'ngu-van',
    scenarioIds: ['SV6-van-quiz'], knowledgeQuiz: 'SV6-van-quiz', minStarsToUnlock: 0,
    description: 'Truyện dân gian · thơ lục bát · ký · so sánh - nhân hoá - ẩn dụ · từ đơn/từ phức · từ láy.' },
  { category: 'curriculum', id: 'SV7', title: 'Ngữ văn lớp 7', yearLevel: 2, subject: 'ngu-van',
    scenarioIds: ['S7NV-w01-quiz'], knowledgeQuiz: 'S7NV-w01-quiz', minStarsToUnlock: 3, prerequisites: ['SV6'],
    description: 'Ca dao · tục ngữ · thành ngữ · từ Hán Việt · điệp ngữ · liệt kê · số từ · phó từ.' },
  { category: 'curriculum', id: 'SV8', title: 'Ngữ văn lớp 8', yearLevel: 3, subject: 'ngu-van',
    scenarioIds: ['S8NV-w01-quiz'], knowledgeQuiz: 'S8NV-w01-quiz', minStarsToUnlock: 6, prerequisites: ['SV7'],
    description: 'Truyện hiện thực (Lão Hạc, Tắt đèn) · thơ Đường luật · nói quá - nói giảm · câu ghép · trợ từ - thán từ.' },
  { category: 'curriculum', id: 'SV9', title: 'Ngữ văn lớp 9', yearLevel: 4, subject: 'ngu-van',
    scenarioIds: ['S9NV-w01-quiz'], knowledgeQuiz: 'S9NV-w01-quiz', minStarsToUnlock: 9, prerequisites: ['SV8'],
    description: 'Truyện Kiều · truyện - thơ hiện đại · phương châm hội thoại · cách dẫn trực tiếp/gián tiếp · nghĩa hàm ý.' },

  // ───────── Lớp 6 — 11 môn × 36 tuần (HK1: T1–18 · HK2: T19–36) ─────────
  // Scenario tuần do lop6/<môn>.js sinh ra (S6XXX-wNN-quiz). Module loader
  // auto-list theo prefix ID. Tổng ~2 427 câu trắc nghiệm bám GDPT 2018.
  { category: 'curriculum', id: 'S6TOAN', title: 'Toán lớp 6 (36 tuần)', yearLevel: 1, subject: 'toan',
    scenarioIds: ['S6TOAN-w01-quiz'], knowledgeQuiz: 'S6TOAN-w01-quiz', minStarsToUnlock: 0,
    description: '36 tuần (HK1: số tự nhiên, chia hết, ƯCLN-BCNN, số nguyên. HK2: phân số, số thập phân, tỉ số phần trăm, hình học cơ bản).' },

  { category: 'curriculum', id: 'S6NV', title: 'Ngữ văn lớp 6 (36 tuần)', yearLevel: 1, subject: 'ngu-van',
    scenarioIds: ['S6NV-w01-quiz'], knowledgeQuiz: 'S6NV-w01-quiz', minStarsToUnlock: 0,
    description: '36 tuần (HK1: truyện đồng thoại-cổ tích-truyền thuyết, thơ lục bát, miêu tả, tu từ, từ vựng-câu. HK2: ký, thơ tự sự, nghị luận, thông tin, biểu cảm, dấu câu, từ Hán Việt).' },

  { category: 'curriculum', id: 'S6TA', title: 'Tiếng Anh lớp 6 (36 tuần)', yearLevel: 1, subject: 'tieng-anh',
    scenarioIds: ['S6TA-w01-quiz'], knowledgeQuiz: 'S6TA-w01-quiz', minStarsToUnlock: 0,
    description: '36 tuần CEFR A1–A2 (HK1: school, home, friends, neighbourhood, natural wonders, modal verbs. HK2: environment, future, TV, past simple, sports, cities, robots).' },

  { category: 'curriculum', id: 'S6KHTN', title: 'Khoa học tự nhiên lớp 6 (36 tuần)', yearLevel: 1, subject: 'khtn',
    scenarioIds: ['S6KHTN-w01-quiz'], knowledgeQuiz: 'S6KHTN-w01-quiz', minStarsToUnlock: 0,
    description: '36 tuần tích hợp Vật lý-Hoá-Sinh (HK1: dụng cụ đo, chất, vật liệu, tế bào. HK2: phân loại sinh vật, lực, năng lượng, Trái Đất-Mặt Trời).' },

  { category: 'curriculum', id: 'S6LSDL', title: 'Lịch sử & Địa lí lớp 6 (36 tuần)', yearLevel: 1, subject: 'lich-su-dia',
    scenarioIds: ['S6LSDL-w01-quiz'], knowledgeQuiz: 'S6LSDL-w01-quiz', minStarsToUnlock: 0,
    description: '36 tuần tích hợp (HK1 Lịch sử: nguyên thuỷ → Ai Cập-Lưỡng Hà → Văn Lang-Âu Lạc → Bắc thuộc & khởi nghĩa. HK2 Địa lí: bản đồ, Trái Đất, địa hình, khí hậu, nước, đất, sinh vật).' },

  { category: 'curriculum', id: 'S6GDCD', title: 'GD công dân lớp 6 (36 tuần)', yearLevel: 1, subject: 'gdcd',
    scenarioIds: ['S6GDCD-w01-quiz'], knowledgeQuiz: 'S6GDCD-w01-quiz', minStarsToUnlock: 0,
    description: '36 tuần · 12 chủ đề (HK1: truyền thống dòng họ, yêu thương, siêng năng, trung thực, tự lập, tự nhận thức. HK2: ứng phó nguy hiểm, tiết kiệm, công dân, quyền-nghĩa vụ, quyền trẻ em).' },

  { category: 'curriculum', id: 'S6CN', title: 'Công nghệ lớp 6 (36 tuần)', yearLevel: 1, subject: 'cong-nghe',
    scenarioIds: ['S6CN-w01-quiz'], knowledgeQuiz: 'S6CN-w01-quiz', minStarsToUnlock: 0,
    description: '36 tuần · 4 chương (Nhà ở · Bảo quản-chế biến thực phẩm · Trang phục-thời trang · Đồ dùng điện trong gia đình).' },

  { category: 'curriculum', id: 'S6TH', title: 'Tin học lớp 6 (36 tuần)', yearLevel: 1, subject: 'tin-hoc',
    scenarioIds: ['S6TH-w01-quiz'], knowledgeQuiz: 'S6TH-w01-quiz', minStarsToUnlock: 0,
    description: '36 tuần · 6 chủ đề A-F (máy tính, Internet, tệp-thư mục, đạo đức số, soạn thảo-trình chiếu, thuật toán cơ bản).' },

  { category: 'curriculum', id: 'S6GDTC', title: 'GD thể chất lớp 6 (36 tuần)', yearLevel: 1, subject: 'gdtc',
    scenarioIds: ['S6GDTC-w01-quiz'], knowledgeQuiz: 'S6GDTC-w01-quiz', minStarsToUnlock: 0,
    description: '36 tuần (HK1: đội hình, TD liên hoàn, chạy ngắn-bền, nhảy xa-bật cao, ném bóng. HK2: bóng đá-rổ-cầu lông-chuyền, an toàn-sơ cứu, dinh dưỡng vận động).' },

  { category: 'curriculum', id: 'S6NT', title: 'Nghệ thuật lớp 6 (36 tuần)', yearLevel: 1, subject: 'nghe-thuat',
    scenarioIds: ['S6NT-w01-quiz'], knowledgeQuiz: 'S6NT-w01-quiz', minStarsToUnlock: 0,
    description: '36 tuần (HK1 Âm nhạc: nốt-nhịp-trường độ, nhạc cụ, dân ca. HK2 Mỹ thuật: yếu tố tạo hình, màu sắc, tĩnh vật-chân dung, tranh dân gian Đông Hồ-Hàng Trống).' },

  { category: 'curriculum', id: 'S6HDTN', title: 'HĐ trải nghiệm – hướng nghiệp lớp 6 (36 tuần)', yearLevel: 1, subject: 'hdtn',
    scenarioIds: ['S6HDTN-w01-quiz'], knowledgeQuiz: 'S6HDTN-w01-quiz', minStarsToUnlock: 0,
    description: '36 tuần · 4 mạch GDPT 2018 (Hướng vào bản thân · Hướng đến xã hội · Hướng đến tự nhiên · Hướng nghiệp).' },

  { category: 'curriculum', id: 'S6GDDP', title: 'Giáo dục địa phương Hà Nội lớp 6 (36 tuần)', yearLevel: 1, subject: 'gd-dia-phuong',
    scenarioIds: ['S6GDDP-w01-quiz'], knowledgeQuiz: 'S6GDDP-w01-quiz', minStarsToUnlock: 0,
    description: '36 tuần GDĐP Hà Nội (HK1: vị trí–dân cư–lịch sử Thăng Long, danh nhân, khởi nghĩa. HK2: ẩm thực–làng nghề–lễ hội–đô thị thông minh).' },

  // ──────────────── LỚP 7 · 8 · 9 — 12 môn mỗi lớp ────────────────
  ...((() => {
    // Helper compact tạo module S7/S8/S9 — 12 môn mỗi lớp, mirror cấu trúc S6 nhưng dùng prefix mới.
    const yLvl = { S7: 2, S8: 3, S9: 4 };
    const yMin = { S7: 8,  S8: 12, S9: 16 };
    const yPrev = { S7: 'S6TOAN', S8: 'S7TOAN', S9: 'S8TOAN' };
    // Số tuần THẬT của từng môn — đếm trực tiếp trong public/js/scenarios/lopN/ (2026-09-25).
    // Lớp 8 và lớp 9: cả 12/12 môn đã đủ 36 tuần. Lớp 7: 6 môn dưới đây còn dừng ở 35 tuần
    // (tuần 36 chưa soạn) nên phải ghi đúng 35, không gộp chung một con số cho cả ba lớp.
    // Con số này CHỈ dùng để hiển thị: loader liệt kê scenario theo prefix id, không theo số tuần.
    const WEEKS_35 = new Set(['S7CN', 'S7GDDP', 'S7GDTC', 'S7HDTN', 'S7NT', 'S7TIN']);
    const weeksOf = (id) => (WEEKS_35.has(id) ? 35 : 36);
    const subjects = [
      ['TOAN',  'Toán',                'toan',           '(số hữu tỉ, đa thức, phương trình, hình học)' ],
      ['NV',    'Ngữ văn',             'ngu-van',        '(thơ-truyện-nghị luận theo CT mới)' ],
      ['TA',    'Tiếng Anh',           'tieng-anh',      '(Global Success)' ],
      ['KHTN',  'Khoa học tự nhiên',   'khtn',           '(lý-hoá-sinh tích hợp)' ],
      ['LSDL',  'Lịch sử & Địa lý',    'lich-su-dia',    '(LS thế giới-VN + ĐL khu vực)' ],
      ['GDCD',  'Giáo dục công dân',   'gdcd',           '(đạo đức, pháp luật, kỹ năng sống)' ],
      ['CN',    'Công nghệ',           'cong-nghe',      '(theo định hướng nghề)' ],
      ['TIN',   'Tin học',             'tin-hoc',        '(mạng, văn bản, bảng tính, thuật toán)' ],
      ['GDTC',  'GD thể chất',         'gdtc',           '(chạy-nhảy-bóng-cầu-võ)' ],
      ['NT',    'Nghệ thuật',          'nghe-thuat',     '(Âm nhạc + Mỹ thuật)' ],
      ['HDTN',  'HĐ trải nghiệm',      'hdtn',           '(4 mạch GDPT 2018)' ],
      ['GDDP',  'GD địa phương',       'gd-dia-phuong',  '(lịch sử-văn hoá địa phương)' ],
    ];
    const out = [];
    for (const grade of ['S7', 'S8', 'S9']) {
      for (const [code, label, subj, desc] of subjects) {
        const id = grade + code;
        const weeks = weeksOf(id);
        out.push({
          category: 'curriculum', id, title: `${label} lớp ${grade[1]} (${weeks} tuần)`,
          yearLevel: yLvl[grade], subject: subj,
          scenarioIds: [`${id}-w01-quiz`], knowledgeQuiz: `${id}-w01-quiz`,
          minStarsToUnlock: code === 'TOAN' ? yMin[grade] : 0,
          ...(code === 'TOAN' ? { prerequisites: [yPrev[grade]] } : {}),
          description: `${weeks} tuần ${desc}`,
        });
      }
    }
    return out;
  })()),
];
