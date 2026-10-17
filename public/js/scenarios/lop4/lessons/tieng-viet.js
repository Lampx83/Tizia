// ============================================================
// Lớp 4 · TIẾNG VIỆT — Lý thuyết + Ví dụ 35 tuần (GDPT 2018)
// Key TRÙNG id quiz: "P4TV-wNN-quiz".
// ============================================================

export const P4TV_LESSONS = {
  // ──────────────── HK1 ────────────────
  'P4TV-w01-quiz': {
    topic: 'Ôn tập — Đọc hiểu cơ bản · Cấu tạo tiếng',
    intro: 'Chào các em Lớp 4! Tuần đầu cô trò mình cùng ôn lại cách phân tích cấu tạo của một tiếng nhé.',
    objectives: [
      'Phân tích tiếng thành âm đầu, vần, thanh.',
      'Rèn kỹ năng đọc to, đọc đúng, hiểu nội dung.',
    ],
    theory: [
      { h: 'Cấu tạo tiếng' },
      { p: 'Mỗi tiếng đầy đủ gồm 3 bộ phận: âm đầu + vần + thanh.' },
      { ul: [
        'Có tiếng không có âm đầu, ví dụ "anh", "yêu".',
        'Bắt buộc phải có vần và thanh.',
        'Thanh đặt ở chữ cái thể hiện chính trong vần.',
      ] },
      { note: 'Mẹo: tách tiếng "trường" → âm đầu "tr", vần "ương", thanh huyền.' },
    ],
    examples: [
      { q: 'Phân tích tiếng "học".', a: 'Âm đầu "h", vần "oc", thanh nặng.' },
      { q: 'Tiếng "anh" có những bộ phận nào?', a: 'Không có âm đầu; có vần "anh" + thanh ngang.' },
    ],
  },

  'P4TV-w02-quiz': {
    topic: 'Từ đơn — Từ phức',
    intro: 'Tuần này cô giới thiệu hai loại từ cơ bản — TỪ ĐƠN và TỪ PHỨC. Đây là nền tảng để học từ ghép, từ láy.',
    objectives: [
      'Phân biệt từ đơn và từ phức.',
      'Đếm số từ trong một câu cho trước.',
    ],
    theory: [
      { h: 'Khái niệm' },
      { ul: [
        'Từ đơn: chỉ có 1 tiếng có nghĩa, ví dụ: nhà, lá, học.',
        'Từ phức: có 2 tiếng trở lên ghép lại có nghĩa, ví dụ: học sinh, cây cối.',
      ] },
      { h: 'Đếm từ trong câu' },
      { p: 'Khi đếm, phải coi từ phức là MỘT từ, không tách thành các tiếng riêng lẻ.' },
      { note: 'Câu "Học sinh chăm ngoan" có 3 từ, không phải 4 (vì "học sinh" là một từ phức).' },
    ],
    examples: [
      { q: 'Từ "cây cối" thuộc loại nào?', a: 'Có 2 tiếng → từ phức.' },
      { q: 'Câu "Em đi học" có bao nhiêu từ?', a: '"Em / đi / học" → 3 từ đơn.' },
    ],
  },

  'P4TV-w03-quiz': {
    topic: 'Từ ghép — Từ láy',
    intro: 'Trong từ phức có 2 loại quan trọng: TỪ GHÉP (các tiếng đều có nghĩa) và TỪ LÁY (lặp âm/vần).',
    objectives: [
      'Phân biệt từ ghép và từ láy.',
      'Nhận biết các kiểu láy (láy âm đầu, láy vần, láy cả tiếng).',
    ],
    theory: [
      { h: 'Phân loại' },
      { ul: [
        'Từ ghép: các tiếng đều có nghĩa ghép theo quan hệ nghĩa (bàn ghế, sách vở).',
        'Từ láy: các tiếng có quan hệ về âm — lặp âm đầu, vần, hoặc cả tiếng.',
      ] },
      { h: 'Các kiểu láy' },
      { ul: [
        'Láy âm đầu: lung linh, long lanh.',
        'Láy vần: chênh vênh.',
        'Láy cả tiếng: ào ào, ầm ầm.',
      ] },
      { note: 'Có trường hợp khó: nếu hai tiếng vừa có quan hệ âm vừa có quan hệ nghĩa → vẫn xếp vào từ ghép.' },
    ],
    examples: [
      { q: '"Long lanh" thuộc loại nào?', a: 'Lặp âm đầu "l", một tiếng "long" không độc lập có nghĩa → từ láy âm đầu.' },
      { q: '"Bàn ghế" thuộc loại nào?', a: 'Cả "bàn" và "ghế" đều có nghĩa → từ ghép.' },
    ],
  },

  'P4TV-w04-quiz': {
    topic: 'Danh từ — Khái niệm và phân loại',
    intro: 'DANH TỪ là từ loại đầu tiên em học chi tiết — gọi tên các sự vật, hiện tượng, khái niệm.',
    objectives: [
      'Nắm khái niệm danh từ.',
      'Phân loại danh từ chỉ người, vật, hiện tượng, khái niệm.',
    ],
    theory: [
      { h: 'Danh từ là gì?' },
      { p: 'Danh từ là từ chỉ người, vật, hiện tượng, khái niệm.' },
      { ul: [
        'Danh từ chỉ người: học sinh, bác sĩ.',
        'Danh từ chỉ vật: bàn, ghế, sách.',
        'Danh từ chỉ hiện tượng (thiên nhiên/xã hội): mưa, gió, chiến tranh.',
        'Danh từ chỉ khái niệm (trừu tượng): tình bạn, tự do.',
      ] },
      { note: 'Mẹo: thử thêm "một, hai, cái, con" trước từ → nếu hợp thì thường là danh từ.' },
    ],
    examples: [
      { q: 'Trong câu "Em yêu trường lớp", có mấy danh từ?', a: '"em", "trường", "lớp" → 3 danh từ.' },
      { q: '"Tình bạn" là loại danh từ nào?', a: 'Không nhìn thấy → danh từ chỉ khái niệm.' },
    ],
  },

  'P4TV-w05-quiz': {
    topic: 'Danh từ chung — Danh từ riêng',
    intro: 'Phân biệt DANH TỪ CHUNG (gọi loại sự vật) và DANH TỪ RIÊNG (tên cụ thể của một người/nơi).',
    objectives: [
      'Phân biệt danh từ chung và danh từ riêng.',
      'Viết hoa đúng quy tắc danh từ riêng.',
    ],
    theory: [
      { h: 'Khái niệm' },
      { ul: [
        'Danh từ chung: gọi tên một loại sự vật (sông, núi, học sinh).',
        'Danh từ riêng: tên cụ thể của một sự vật, người, nơi (sông Hồng, Hà Nội, Trần Hưng Đạo).',
      ] },
      { h: 'Quy tắc viết hoa' },
      { p: 'Danh từ riêng — viết hoa chữ cái đầu của mỗi tiếng.' },
      { note: 'Tên nước ngoài có thể có thêm dấu gạch nối giữa các tiếng (ví dụ: Lê-nin, Pa-ri).' },
    ],
    examples: [
      { q: 'Trong các từ: Trần Hưng Đạo, sông, Sài Gòn, học sinh — có mấy DT riêng?', a: '"Trần Hưng Đạo" và "Sài Gòn" → 2 danh từ riêng.' },
      { q: 'Viết tên trường "trường tiểu học kim đồng" cho đúng.', a: 'Trường Tiểu học Kim Đồng (viết hoa chữ đầu mỗi tiếng).' },
    ],
  },

  'P4TV-w06-quiz': {
    topic: 'MRVT: Trung thực — Tự trọng',
    intro: 'Tuần này em mở rộng vốn từ về hai đức tính quý — TRUNG THỰC và TỰ TRỌNG.',
    objectives: [
      'Hiểu nghĩa và dùng các từ thuộc chủ điểm.',
      'Thuộc 1–2 câu thành ngữ, tục ngữ về trung thực.',
    ],
    theory: [
      { h: 'Nhóm từ trung thực' },
      { ul: [
        'Cùng nghĩa: thật thà, ngay thẳng, chính trực, chân thật.',
        'Trái nghĩa: dối trá, gian dối, lừa lọc.',
      ] },
      { h: 'Tự trọng' },
      { p: 'Tự trọng = biết tôn trọng và giữ phẩm giá của bản thân (không làm điều khiến mình xấu hổ).' },
      { note: 'Câu tục ngữ: "Cây ngay không sợ chết đứng" — người ngay thẳng không sợ vu oan.' },
    ],
    examples: [
      { q: 'Tìm từ trái nghĩa với "trung thực".', a: 'Dối trá, gian dối.' },
      { q: 'Bạn dám nhận lỗi khi sai → thể hiện đức tính gì?', a: 'Lòng tự trọng.' },
    ],
  },

  'P4TV-w07-quiz': {
    topic: 'Động từ',
    intro: 'Sau danh từ, em học ĐỘNG TỪ — từ chỉ hoạt động hoặc trạng thái.',
    objectives: [
      'Nắm khái niệm động từ.',
      'Tìm động từ trong câu.',
    ],
    theory: [
      { h: 'Động từ là gì?' },
      { p: 'Động từ chỉ hoạt động (chạy, nhảy, học) hoặc trạng thái (yêu, ghét, ngủ).' },
      { ul: [
        'Động từ chỉ hoạt động: ăn, học, viết, vẽ.',
        'Động từ chỉ trạng thái: yêu, thương, ghét, lo, vui.',
      ] },
      { note: 'Mẹo: thử thêm "đã, đang, sẽ" trước từ — nếu hợp thì thường là động từ.' },
    ],
    examples: [
      { q: 'Câu "Em đọc sách" — động từ là gì?', a: '"đọc" — hành động.' },
      { q: 'Câu nào có 2 động từ: "Em ăn cơm" / "Em đi học và làm bài"?', a: 'Câu thứ hai có "đi" và "làm" → 2 động từ.' },
    ],
  },

  'P4TV-w08-quiz': {
    topic: 'MRVT: Ước mơ',
    intro: 'Mỗi người đều có những ước mơ. Tuần này em mở rộng vốn từ về chủ đề ƯỚC MƠ.',
    objectives: [
      'Hiểu và dùng các từ cùng nghĩa với "ước mơ".',
      'Hiểu thành ngữ liên quan.',
    ],
    theory: [
      { h: 'Nhóm từ' },
      { ul: [
        'Cùng nghĩa: mơ ước, mong ước, ước nguyện, khao khát.',
        'Ước mơ chính đáng: ước mơ đẹp đẽ, có ích cho mình và xã hội.',
      ] },
      { note: 'Câu thành ngữ: "Cầu được ước thấy" — điều ước trở thành hiện thực.' },
    ],
    examples: [
      { q: 'Từ nào KHÔNG cùng nghĩa với "ước mơ": ước nguyện, mơ ước, mong ước, than thở?', a: '"Than thở" không cùng nghĩa.' },
      { q: 'Để biến ước mơ thành hiện thực, em cần làm gì?', a: 'Cố gắng học tập, rèn luyện, có kế hoạch và hành động.' },
    ],
  },

  'P4TV-w09-quiz': {
    topic: 'Tính từ',
    intro: 'TÍNH TỪ — từ chỉ đặc điểm, tính chất, trạng thái của sự vật, sự việc.',
    objectives: [
      'Nắm khái niệm tính từ.',
      'Phân loại tính từ chỉ màu sắc, kích thước, tính chất.',
    ],
    theory: [
      { h: 'Tính từ là gì?' },
      { p: 'Tính từ chỉ đặc điểm, tính chất của sự vật, hiện tượng hoặc hoạt động.' },
      { ul: [
        'Tính từ chỉ màu sắc: xanh, đỏ, vàng.',
        'Tính từ chỉ kích thước: to, nhỏ, cao, thấp.',
        'Tính từ chỉ phẩm chất: hiền, ngoan, chăm.',
      ] },
      { note: 'Mẹo: thử thêm "rất, lắm, quá" — nếu hợp thì thường là tính từ.' },
    ],
    examples: [
      { q: 'Câu "Bầu trời cao và rộng" có mấy tính từ?', a: '"cao", "rộng" → 2 tính từ.' },
      { q: 'Trong các từ: đỏ, ngủ, to, mèo — có mấy tính từ?', a: '"đỏ" và "to" → 2 tính từ.' },
    ],
  },

  'P4TV-w10-quiz': {
    topic: 'Ôn tập giữa Học kỳ 1',
    intro: 'Tuần ôn tập giữa kỳ — củng cố lại từ loại, MRVT và các kiến thức đã học.',
    objectives: [
      'Tổng hợp kiến thức nửa đầu HK1.',
      'Phân biệt vững danh từ, động từ, tính từ.',
    ],
    theory: [
      { h: 'Tổng hợp' },
      { ul: [
        'Cấu tạo tiếng: âm đầu + vần + thanh.',
        'Từ: đơn / phức (ghép, láy).',
        'Từ loại: danh từ (chung/riêng), động từ, tính từ.',
        'MRVT: trung thực, tự trọng, ước mơ.',
      ] },
      { note: 'Mẹo phân biệt từ loại: thử thêm từ phụ trợ ("rất" cho tính từ, "đang" cho động từ, "cái/con" cho danh từ).' },
    ],
    examples: [
      { q: '"Lung linh" là loại từ gì?', a: 'Lặp âm đầu "l" → từ láy.' },
      { q: 'Câu "Em hái hoa" — động từ là gì?', a: '"hái".' },
    ],
  },

  'P4TV-w11-quiz': {
    topic: 'Câu hỏi và dấu chấm hỏi',
    intro: 'Một kiểu câu rất quen — CÂU HỎI. Em học cách nhận biết và dùng dấu chấm hỏi.',
    objectives: [
      'Nhận biết câu hỏi và dấu chấm hỏi.',
      'Đặt câu hỏi đúng mục đích, lịch sự.',
    ],
    theory: [
      { h: 'Câu hỏi' },
      { p: 'Câu hỏi dùng để hỏi điều chưa biết hoặc còn nghi vấn, thường kết thúc bằng dấu "?".' },
      { ul: [
        'Các từ để hỏi: ai, gì, nào, sao, bao nhiêu, khi nào, ở đâu, vì sao, không.',
        'Đối tượng đặt câu hỏi: chính mình hoặc người khác.',
      ] },
      { note: 'Khi viết câu hỏi, đừng quên dấu "?" ở cuối câu!' },
    ],
    examples: [
      { q: 'Câu nào là câu hỏi: "Em đang đọc sách." / "Em đang làm gì?"', a: 'Câu thứ hai — có từ "gì" và dấu "?".' },
      { q: 'Đặt câu hỏi với từ "khi nào".', a: 'Khi nào em đi học?' },
    ],
  },

  'P4TV-w12-quiz': {
    topic: 'Dùng câu hỏi với mục đích khác',
    intro: 'Câu hỏi không chỉ để hỏi — đôi khi để khen, chê, khẳng định hoặc động viên!',
    objectives: [
      'Nhận biết câu hỏi dùng với mục đích khác (khen, chê, khẳng định).',
      'Đặt câu hỏi lịch sự, phù hợp đối tượng giao tiếp.',
    ],
    theory: [
      { h: 'Các mục đích khác' },
      { ul: [
        'Khen ngợi: "Cậu giỏi quá nhỉ?"',
        'Chê trách nhẹ: "Sao cậu không cẩn thận chút?"',
        'Tự khẳng định, động viên: "Chẳng lẽ mình lại bỏ cuộc?"',
        'Yêu cầu lịch sự: "Bạn có thể giúp mình được không?"',
      ] },
      { note: 'Khi giao tiếp với người lớn → đặt câu hỏi lễ phép, dùng "ạ", "vâng".' },
    ],
    examples: [
      { q: '"Cậu giỏi quá nhỉ?" dùng để làm gì?', a: 'Để khen ngợi.' },
      { q: '"Bạn có thể giúp mình được không?" dùng để làm gì?', a: 'Yêu cầu lịch sự.' },
    ],
  },

  'P4TV-w13-quiz': {
    topic: 'MRVT: Ý chí — Nghị lực',
    intro: 'Chủ đề rất ý nghĩa — Ý CHÍ và NGHỊ LỰC giúp ta vượt qua mọi khó khăn!',
    objectives: [
      'Hiểu nghĩa và dùng các từ thuộc chủ điểm.',
      'Thuộc thành ngữ tục ngữ về ý chí, nghị lực.',
    ],
    theory: [
      { h: 'Nhóm từ' },
      { ul: [
        'Cùng nghĩa: kiên trì, bền bỉ, quyết tâm, vượt khó.',
        'Trái nghĩa: nhụt chí, nản lòng, bỏ cuộc.',
      ] },
      { h: 'Thành ngữ, tục ngữ' },
      { ul: [
        '"Có công mài sắt có ngày nên kim" — kiên trì sẽ thành công.',
        '"Có chí thì nên" — có ý chí thì làm gì cũng được.',
      ] },
      { note: 'Bạn vượt khó học tập là tấm gương về nghị lực!' },
    ],
    examples: [
      { q: 'Từ cùng nghĩa với "kiên trì"?', a: 'Bền bỉ.' },
      { q: 'Câu "Có công mài sắt có ngày nên kim" có ý nghĩa gì?', a: 'Kiên trì sẽ đạt được kết quả tốt.' },
    ],
  },

  'P4TV-w14-quiz': {
    topic: 'Câu kể "Ai làm gì?"',
    intro: 'Kiểu câu kể đầu tiên: "Ai làm gì?" — chủ ngữ là người/vật, vị ngữ là hành động.',
    objectives: [
      'Nhận biết câu kể "Ai làm gì?".',
      'Xác định chủ ngữ và vị ngữ.',
    ],
    theory: [
      { h: 'Cấu trúc' },
      { p: 'Câu kể "Ai làm gì?" gồm 2 bộ phận: CHỦ NGỮ (Ai/Cái gì/Con gì) + VỊ NGỮ (làm gì).' },
      { ul: [
        'Chủ ngữ: thường là danh từ hoặc cụm danh từ.',
        'Vị ngữ: bắt đầu bằng động từ chỉ hành động.',
      ] },
      { note: 'Mẹo: đặt câu hỏi "Ai? Làm gì?" để tìm hai bộ phận.' },
    ],
    examples: [
      { q: 'Câu "Em chạy ra sân" — chủ ngữ và vị ngữ?', a: 'Chủ ngữ: "Em"; Vị ngữ: "chạy ra sân".' },
      { q: 'Câu nào là "Ai làm gì?": "Bầu trời rất xanh" / "Em chạy ra sân"?', a: '"Em chạy ra sân" — vị ngữ là động từ "chạy".' },
    ],
  },

  'P4TV-w15-quiz': {
    topic: 'Câu kể "Ai thế nào?"',
    intro: 'Kiểu câu kể thứ hai: "Ai thế nào?" — miêu tả đặc điểm, tính chất, trạng thái.',
    objectives: [
      'Nhận biết câu kể "Ai thế nào?".',
      'Xác định chủ ngữ và vị ngữ là tính từ.',
    ],
    theory: [
      { h: 'Cấu trúc' },
      { p: 'Câu kể "Ai thế nào?": CHỦ NGỮ + VỊ NGỮ (miêu tả đặc điểm/tính chất).' },
      { ul: [
        'Chủ ngữ: danh từ hoặc cụm danh từ.',
        'Vị ngữ: tính từ hoặc cụm tính từ.',
      ] },
      { note: 'Mẹo: đặt câu hỏi "Ai? Thế nào?" để tìm hai bộ phận.' },
    ],
    examples: [
      { q: 'Câu "Bầu trời rất xanh" — chủ ngữ, vị ngữ?', a: 'Chủ ngữ: "Bầu trời"; Vị ngữ: "rất xanh".' },
      { q: 'Câu "Hoa hồng rất thơm" thuộc kiểu nào?', a: '"Ai thế nào?" — "rất thơm" miêu tả đặc điểm.' },
    ],
  },

  'P4TV-w16-quiz': {
    topic: 'Câu kể "Ai là gì?"',
    intro: 'Kiểu câu kể thứ ba: "Ai là gì?" — giới thiệu, định nghĩa, đánh giá.',
    objectives: [
      'Nhận biết câu kể "Ai là gì?".',
      'Phân biệt với "Ai làm gì?" và "Ai thế nào?".',
    ],
    theory: [
      { h: 'Cấu trúc' },
      { p: 'Câu kể "Ai là gì?": CHỦ NGỮ + LÀ + (cụm danh từ/danh từ).' },
      { ul: [
        'Chủ ngữ: danh từ hoặc cụm danh từ.',
        'Vị ngữ: bắt đầu bằng "là" (đôi khi "trở thành").',
        'Dùng để giới thiệu, định nghĩa, đánh giá sự vật/người.',
      ] },
      { note: 'Mẹo: thấy chữ "là" giữa câu → thường là "Ai là gì?".' },
    ],
    examples: [
      { q: 'Câu "Hà Nội là thủ đô của nước ta" — chủ ngữ, vị ngữ?', a: 'Chủ ngữ: "Hà Nội"; Vị ngữ: "là thủ đô của nước ta".' },
      { q: 'Câu "Toán là môn học em yêu thích" thuộc kiểu nào?', a: '"Ai là gì?".' },
    ],
  },

  'P4TV-w17-quiz': {
    topic: 'Dấu hai chấm',
    intro: 'Một dấu câu rất hay dùng — DẤU HAI CHẤM (:) — báo hiệu phần giải thích, liệt kê, hoặc lời nói.',
    objectives: [
      'Nắm các công dụng của dấu hai chấm.',
      'Dùng dấu hai chấm đúng trong văn bản.',
    ],
    theory: [
      { h: 'Công dụng' },
      { ul: [
        'Báo trước phần liệt kê: "Em thích các môn: Toán, Tiếng Việt, Khoa học."',
        'Báo trước lời nói trực tiếp (thường + ngoặc kép hoặc + gạch ngang): Cô nói: "Các em hãy giữ trật tự."',
        'Báo trước phần giải thích, thuyết minh.',
      ] },
      { note: 'Phần sau dấu hai chấm thường viết hoa nếu là một câu hoàn chỉnh hoặc lời nói nhân vật.' },
    ],
    examples: [
      { q: 'Câu "Vườn nhà em có nhiều cây ăn quả: cam, bưởi, ổi" — dấu hai chấm dùng để gì?', a: 'Liệt kê các loại cây.' },
      { q: 'Câu "Cô giáo nói: \\"Các em hãy làm bài cẩn thận.\\"" — dấu hai chấm dùng để gì?', a: 'Báo hiệu lời nói trực tiếp.' },
    ],
  },

  'P4TV-w18-quiz': {
    topic: 'Kiểm tra Học kỳ 1',
    intro: 'Tuần thi cuối HK1! Hãy tự tin và làm bài cẩn thận, các em nhé!',
    objectives: [
      'Vận dụng toàn bộ kiến thức Tiếng Việt HK1.',
      'Trình bày bài làm sạch, rõ ràng.',
    ],
    theory: [
      { h: 'Các chủ đề ôn tập' },
      { ul: [
        'Cấu tạo tiếng, từ đơn, từ phức (ghép, láy).',
        'Từ loại: danh từ, động từ, tính từ.',
        'Các kiểu câu kể: "Ai làm gì?", "Ai thế nào?", "Ai là gì?".',
        'Câu hỏi và dấu hai chấm.',
        'MRVT: trung thực, ước mơ, ý chí.',
      ] },
      { note: 'Mẹo làm bài đọc hiểu: đọc câu hỏi trước → tìm câu trả lời trong bài.' },
    ],
    examples: [
      { q: 'Câu "Em là học sinh chăm ngoan" thuộc kiểu nào?', a: '"Ai là gì?" — có "là".' },
      { q: 'Từ "long lanh" thuộc loại?', a: 'Lặp âm đầu → từ láy.' },
    ],
  },

  // ──────────────── HK2 ────────────────
  'P4TV-w19-quiz': {
    topic: 'Chủ ngữ — Vị ngữ trong câu kể "Ai làm gì?"',
    intro: 'Học kỳ 2 cô trò mình tìm hiểu kỹ hơn chủ ngữ và vị ngữ trong câu kể "Ai làm gì?".',
    objectives: [
      'Phân tích chủ ngữ và vị ngữ trong câu phức tạp hơn.',
      'Nhận biết chủ ngữ là cụm danh từ.',
    ],
    theory: [
      { h: 'Chủ ngữ' },
      { p: 'Chủ ngữ trả lời câu hỏi "Ai?", "Cái gì?", "Con gì?". Có thể là từ đơn, từ phức hoặc cả cụm danh từ.' },
      { ul: ['Một chủ ngữ có thể gồm nhiều người/vật nối bằng "và", "với", "cùng".', 'Ví dụ: "Lan và Mai" là một chủ ngữ.'] },
      { h: 'Vị ngữ' },
      { p: 'Vị ngữ có thể gồm nhiều hành động nối với nhau bằng "và", "rồi"...' },
      { note: 'Cụm danh từ làm chủ ngữ: "Những con thuyền nhỏ", "Cô giáo lớp em"...' },
    ],
    examples: [
      { q: 'Trong câu "Lan và Mai cùng đi học" — chủ ngữ?', a: '"Lan và Mai" — cả cụm là chủ ngữ.' },
      { q: 'Chủ ngữ trong "Những con thuyền nhỏ đang lướt trên sông"?', a: '"Những con thuyền nhỏ" — cụm danh từ.' },
    ],
  },

  'P4TV-w20-quiz': {
    topic: 'MRVT: Tài năng',
    intro: 'Tuần này em mở rộng vốn từ về TÀI NĂNG — khả năng đặc biệt của mỗi người.',
    objectives: [
      'Hiểu và dùng các từ thuộc chủ điểm.',
      'Biết tài năng phát triển nhờ luyện tập.',
    ],
    theory: [
      { h: 'Nhóm từ' },
      { ul: [
        'Cùng nghĩa: tài giỏi, có tài, thiên tài, nhân tài.',
        'Đối lập: kém cỏi, vụng về.',
      ] },
      { note: 'Thành ngữ: "Học một biết mười" — chỉ người thông minh, có tài.' },
    ],
    examples: [
      { q: 'Từ nào KHÔNG cùng nhóm "tài năng": tài giỏi, thiên tài, lười nhác, có tài?', a: '"Lười nhác" không liên quan đến tài năng.' },
      { q: 'Để phát triển tài năng cần làm gì?', a: 'Chăm chỉ luyện tập, kiên trì rèn luyện.' },
    ],
  },

  'P4TV-w21-quiz': {
    topic: 'Câu khiến (Câu cầu khiến)',
    intro: 'CÂU KHIẾN — dùng để yêu cầu, đề nghị, ra lệnh một cách lịch sự!',
    objectives: [
      'Nhận biết câu khiến và các từ thường gặp.',
      'Đặt câu khiến lịch sự với người lớn.',
    ],
    theory: [
      { h: 'Câu khiến là gì?' },
      { p: 'Câu khiến dùng để yêu cầu, đề nghị, mong muốn ai đó làm gì.' },
      { ul: [
        'Các từ tình thái: hãy, đừng, chớ, nên, đề nghị, mời, xin.',
        'Kết thúc bằng dấu "!" hoặc "." (tuỳ ngữ cảnh).',
      ] },
      { note: 'Với người lớn → dùng "xin", "vui lòng", "ạ" để lịch sự.' },
    ],
    examples: [
      { q: 'Câu nào là câu khiến: "Hãy giữ trật tự!" / "Em đang đọc sách."?', a: 'Câu thứ nhất — có "hãy" + dấu "!".' },
      { q: 'Câu "Mời bạn ngồi xuống." là loại câu nào?', a: 'Câu khiến — đề nghị lịch sự.' },
    ],
  },

  'P4TV-w22-quiz': {
    topic: 'Câu cảm (Câu cảm thán)',
    intro: 'CÂU CẢM — dùng để bộc lộ cảm xúc: vui, buồn, ngạc nhiên, thán phục...',
    objectives: [
      'Nhận biết câu cảm và thán từ.',
      'Đặt câu cảm trong các tình huống cụ thể.',
    ],
    theory: [
      { h: 'Câu cảm là gì?' },
      { p: 'Câu cảm bộc lộ cảm xúc của người nói/viết, thường kết thúc bằng dấu "!".' },
      { ul: [
        'Các thán từ mở đầu: ôi, chao, ồ, trời ơi.',
        'Các từ tăng cường: quá, biết bao, biết chừng nào, làm sao, biết mấy.',
      ] },
      { note: 'Phân biệt với câu khiến: câu cảm bộc lộ cảm xúc, câu khiến yêu cầu hành động.' },
    ],
    examples: [
      { q: 'Câu "Ôi, bông hoa đẹp làm sao!" bộc lộ cảm xúc gì?', a: 'Ngạc nhiên, thán phục.' },
      { q: 'Đặt câu cảm khi thấy cảnh đẹp.', a: 'Cảnh đẹp quá! / Ôi, cảnh đẹp tuyệt vời!' },
    ],
  },

  'P4TV-w23-quiz': {
    topic: 'MRVT: Sức khoẻ',
    intro: 'Sức khoẻ là vốn quý nhất! Tuần này em mở rộng vốn từ về chủ đề SỨC KHOẺ.',
    objectives: [
      'Hiểu các từ về sức khoẻ.',
      'Biết hoạt động tốt cho sức khoẻ.',
    ],
    theory: [
      { h: 'Nhóm từ' },
      { ul: [
        'Tích cực: khoẻ mạnh, cường tráng, dẻo dai, lanh lợi.',
        'Tiêu cực: ốm yếu, mệt mỏi, bệnh tật.',
      ] },
      { h: 'Hoạt động giữ sức khoẻ' },
      { p: 'Tập thể dục, ăn đủ chất, ngủ đủ giấc, vệ sinh cá nhân.' },
      { note: 'Câu nói: "Có sức khoẻ là có tất cả" — đề cao giá trị sức khoẻ.' },
    ],
    examples: [
      { q: 'Từ cùng nghĩa "khoẻ mạnh"?', a: 'Cường tráng.' },
      { q: 'Hoạt động nào tốt cho sức khoẻ?', a: 'Bơi lội, chạy bộ, tập thể dục.' },
    ],
  },

  'P4TV-w24-quiz': {
    topic: 'Trạng ngữ — Khái niệm',
    intro: 'TRẠNG NGỮ — thành phần phụ giúp câu thêm cụ thể về thời gian, nơi chốn, nguyên nhân, mục đích...',
    objectives: [
      'Nắm khái niệm trạng ngữ.',
      'Nhận biết trạng ngữ trong câu.',
    ],
    theory: [
      { h: 'Trạng ngữ là gì?' },
      { p: 'Trạng ngữ là thành phần phụ của câu, bổ sung ý nghĩa cho câu về thời gian, nơi chốn, nguyên nhân, mục đích, cách thức...' },
      { ul: [
        'Trả lời câu hỏi: Khi nào? Ở đâu? Vì sao? Để làm gì? Bằng cách nào?',
        'Thường được ngăn cách với phần còn lại bằng dấu phẩy (khi đứng đầu câu).',
      ] },
      { note: 'Có thể bỏ trạng ngữ mà câu vẫn còn nghĩa cơ bản.' },
    ],
    examples: [
      { q: 'Câu "Sáng nay, em đi học" — trạng ngữ là gì?', a: '"Sáng nay" — trạng ngữ chỉ thời gian.' },
      { q: 'Câu nào có trạng ngữ: "Em yêu mẹ" / "Vào chủ nhật, em được nghỉ"?', a: 'Câu thứ hai — "Vào chủ nhật" chỉ thời gian.' },
    ],
  },

  'P4TV-w25-quiz': {
    topic: 'Trạng ngữ chỉ thời gian, nơi chốn',
    intro: 'Hai loại trạng ngữ thông dụng nhất — chỉ THỜI GIAN và NƠI CHỐN.',
    objectives: [
      'Phân biệt trạng ngữ thời gian và nơi chốn.',
      'Đặt câu có trạng ngữ thời gian/nơi chốn.',
    ],
    theory: [
      { h: 'Trạng ngữ thời gian' },
      { p: 'Trả lời "Khi nào?". Bắt đầu bằng: lúc, khi, vào, sáng nay, hôm qua...' },
      { h: 'Trạng ngữ nơi chốn' },
      { p: 'Trả lời "Ở đâu?". Bắt đầu bằng: trên, dưới, trong, ngoài, ở, tại...' },
      { note: 'Trạng ngữ có thể đứng đầu, giữa hoặc cuối câu.' },
    ],
    examples: [
      { q: '"Trong vườn, hoa nở rộ" — trạng ngữ chỉ gì?', a: '"Trong vườn" chỉ nơi chốn.' },
      { q: '"Hôm qua, lớp em đi tham quan" — trạng ngữ chỉ gì?', a: '"Hôm qua" chỉ thời gian.' },
    ],
  },

  'P4TV-w26-quiz': {
    topic: 'Trạng ngữ chỉ nguyên nhân, mục đích',
    intro: 'Hai loại trạng ngữ nữa — chỉ NGUYÊN NHÂN và MỤC ĐÍCH.',
    objectives: [
      'Phân biệt trạng ngữ nguyên nhân và mục đích.',
      'Đặt câu có trạng ngữ phù hợp.',
    ],
    theory: [
      { h: 'Trạng ngữ nguyên nhân' },
      { p: 'Trả lời "Vì sao?". Bắt đầu bằng: vì, do, bởi vì, tại...' },
      { h: 'Trạng ngữ mục đích' },
      { p: 'Trả lời "Để làm gì?". Bắt đầu bằng: để, nhằm, vì (mục đích)...' },
      { note: 'Phân biệt: "vì" có thể chỉ nguyên nhân ("Vì trời mưa...") hoặc mục đích ("Vì lý tưởng...").' },
    ],
    examples: [
      { q: '"Vì trời mưa, em không đi chơi" — trạng ngữ chỉ gì?', a: '"Vì trời mưa" chỉ nguyên nhân.' },
      { q: '"Để có sức khoẻ tốt, em tập thể dục đều đặn" — trạng ngữ chỉ gì?', a: '"Để có sức khoẻ tốt" chỉ mục đích.' },
    ],
  },

  'P4TV-w27-quiz': {
    topic: 'MRVT: Du lịch — Thám hiểm',
    intro: 'Tuần này em mở rộng vốn từ về hai chủ đề rất thú vị — DU LỊCH và THÁM HIỂM.',
    objectives: [
      'Hiểu và dùng các từ về du lịch, thám hiểm.',
      'Biết một số địa danh nổi tiếng.',
    ],
    theory: [
      { h: 'Du lịch' },
      { p: 'Du lịch là đi tham quan, nghỉ ngơi ở nơi khác.' },
      { ul: ['Liên quan: hướng dẫn viên, va li, máy ảnh, khách sạn, vé.'] },
      { h: 'Thám hiểm' },
      { p: 'Thám hiểm là khám phá những vùng đất, biển, núi xa lạ, ít người biết.' },
      { ul: ['Người thám hiểm cần: dũng cảm, ham hiểu biết, kiên trì.'] },
      { note: 'Địa điểm du lịch nổi tiếng Việt Nam: Vịnh Hạ Long, Hội An, Sapa, Đà Lạt.' },
    ],
    examples: [
      { q: 'Người đi thám hiểm cần phẩm chất gì?', a: 'Dũng cảm, ham hiểu biết, kiên trì.' },
      { q: 'Từ liên quan đến du lịch?', a: 'Hướng dẫn viên, va li, máy ảnh.' },
    ],
  },

  'P4TV-w28-quiz': {
    topic: 'Dấu ngoặc kép',
    intro: 'DẤU NGOẶC KÉP ("...") dùng để đánh dấu lời nói trực tiếp hoặc từ ngữ đặc biệt.',
    objectives: [
      'Nắm các công dụng của dấu ngoặc kép.',
      'Sử dụng đúng trong văn bản.',
    ],
    theory: [
      { h: 'Công dụng' },
      { ul: [
        'Đánh dấu lời nói trực tiếp (thường + dấu hai chấm).',
        'Đánh dấu từ ngữ có ý nghĩa đặc biệt (biệt danh, nghĩa bóng).',
        'Đánh dấu tên tác phẩm (bài thơ, bài hát, sách...).',
      ] },
      { note: 'Khi viết tên tác phẩm trong văn bản → đặt trong ngoặc kép.' },
    ],
    examples: [
      { q: 'Trong câu "Bạn Lan được gọi là \\"cây toán\\" của lớp" — dấu ngoặc kép dùng để gì?', a: 'Đánh dấu biệt danh "cây toán".' },
      { q: 'Trong câu "Em rất thích bài thơ \\"Tre Việt Nam\\"" — dấu ngoặc kép dùng để gì?', a: 'Đánh dấu tên tác phẩm.' },
    ],
  },

  'P4TV-w29-quiz': {
    topic: 'Dấu gạch ngang',
    intro: 'DẤU GẠCH NGANG (—) có nhiều công dụng quan trọng trong văn bản.',
    objectives: [
      'Nắm các công dụng của dấu gạch ngang.',
      'Phân biệt gạch ngang với gạch nối.',
    ],
    theory: [
      { h: 'Công dụng' },
      { ul: [
        'Đầu dòng: đánh dấu lời nói trực tiếp của nhân vật (trong hội thoại).',
        'Giữa câu: đánh dấu phần chú thích, giải thích.',
        'Nối các từ trong một liên danh.',
      ] },
      { h: 'Phân biệt' },
      { p: 'Dấu gạch ngang (—) dài hơn và có khoảng trắng. Dấu gạch nối (-) ngắn, nối các tiếng phiên âm tên nước ngoài (Lê-nin).' },
      { note: 'Khi viết hội thoại trong truyện: mỗi lời nhân vật bắt đầu bằng gạch ngang đầu dòng.' },
    ],
    examples: [
      { q: 'Trong câu "Hà Nội — thủ đô của Việt Nam — rất đẹp" — gạch ngang dùng để gì?', a: 'Đánh dấu phần chú thích "thủ đô của Việt Nam".' },
      { q: 'Khi viết hội thoại, mỗi lời nhân vật bắt đầu bằng gì?', a: 'Dấu gạch ngang đầu dòng.' },
    ],
  },

  'P4TV-w30-quiz': {
    topic: 'Văn miêu tả đồ vật',
    intro: 'Tuần này em học VIẾT VĂN MIÊU TẢ ĐỒ VẬT — giúp người đọc hình dung được đồ vật rõ nét!',
    objectives: [
      'Nắm bố cục bài văn miêu tả đồ vật (3 phần).',
      'Quan sát và dùng từ gợi tả sinh động.',
    ],
    theory: [
      { h: 'Bố cục 3 phần' },
      { ul: [
        'Mở bài: giới thiệu đồ vật được tả.',
        'Thân bài: tả hình dáng, màu sắc, chất liệu, công dụng (theo trình tự hợp lý).',
        'Kết bài: nêu cảm nghĩ, tình cảm với đồ vật.',
      ] },
      { h: 'Quan sát' },
      { p: 'Quan sát kỹ bằng nhiều giác quan (mắt nhìn, tay sờ) trước khi viết. Dùng từ gợi tả + so sánh để bài văn sinh động.' },
      { note: 'Tả "cái cặp sách": tả màu, ngăn, dây quai, công dụng, kỷ niệm gắn với nó.' },
    ],
    examples: [
      { q: 'Bài văn miêu tả đồ vật có mấy phần?', a: '3 phần: Mở bài – Thân bài – Kết bài.' },
      { q: 'Khi tả đồ vật cần chú ý điều gì?', a: 'Hình dáng, màu sắc, chất liệu, công dụng.' },
    ],
  },

  'P4TV-w31-quiz': {
    topic: 'Văn miêu tả cây cối',
    intro: 'VIẾT VĂN MIÊU TẢ CÂY CỐI — đưa cây vào trang văn thật sinh động qua các giác quan!',
    objectives: [
      'Nắm trình tự tả cây cối.',
      'Dùng biện pháp so sánh, nhân hoá.',
    ],
    theory: [
      { h: 'Trình tự tả' },
      { ul: [
        'Theo không gian: từ gốc đến ngọn (hoặc ngược lại).',
        'Theo bộ phận: rễ, thân, cành, lá, hoa, quả.',
        'Theo thời gian: 4 mùa hoặc các giai đoạn phát triển.',
      ] },
      { h: 'Biện pháp tu từ' },
      { p: 'Dùng so sánh và nhân hoá để bài văn sinh động hơn.' },
      { note: 'Tả cây phượng mùa hè → tập trung tả hoa đỏ rực, lá xanh, tiếng ve.' },
    ],
    examples: [
      { q: 'Có thể tả cây cối theo trình tự nào?', a: 'Từ gốc đến ngọn (hoặc ngược lại), theo bộ phận, hoặc theo mùa.' },
      { q: 'Câu nào dùng nhân hoá: "Cây bàng cao 5 m" / "Cây bàng đứng trầm tư, hứng nắng cho đàn em chơi đùa"?', a: 'Câu thứ hai — "đứng trầm tư", "hứng nắng" là nhân hoá.' },
    ],
  },

  'P4TV-w32-quiz': {
    topic: 'Văn miêu tả con vật',
    intro: 'Tả CON VẬT yêu quý của em — vừa tả ngoại hình, vừa tả hoạt động và thói quen!',
    objectives: [
      'Nắm bố cục bài văn miêu tả con vật.',
      'Dùng so sánh, nhân hoá.',
    ],
    theory: [
      { h: 'Bố cục' },
      { ul: [
        'Mở bài: giới thiệu con vật.',
        'Thân bài: tả ngoại hình (đầu, mắt, lông, đuôi...) + hoạt động/thói quen (ăn, ngủ, chơi).',
        'Kết bài: tình cảm với con vật.',
      ] },
      { h: 'Biện pháp tu từ' },
      { p: 'So sánh ("trắng như tuyết") và nhân hoá ("chú mèo lười biếng nằm phơi nắng") giúp bài văn hấp dẫn.' },
      { note: 'Đừng chỉ liệt kê đặc điểm — hãy kể về kỷ niệm với con vật.' },
    ],
    examples: [
      { q: 'Câu nào dùng so sánh: "Con mèo có bộ lông trắng" / "Bộ lông mèo trắng như tuyết"?', a: 'Câu thứ hai — "trắng như tuyết".' },
      { q: 'Khi tả "chú gà trống", em mở bài thế nào?', a: 'Giới thiệu chú gà (của ai, từ khi nào).' },
    ],
  },

  'P4TV-w33-quiz': {
    topic: 'Viết thư',
    intro: 'VIẾT THƯ — một kỹ năng giao tiếp văn minh, lịch sự rất quan trọng!',
    objectives: [
      'Nắm bố cục một bức thư.',
      'Lựa lời xưng hô phù hợp với người nhận.',
    ],
    theory: [
      { h: 'Bố cục thư' },
      { ul: [
        'Đầu thư: địa điểm + ngày tháng + lời chào người nhận.',
        'Nội dung: lý do viết thư, các thông tin cần truyền đạt (rõ ràng, chân thành).',
        'Cuối thư: lời chúc + lời chào tạm biệt + chữ kí.',
      ] },
      { h: 'Lời xưng hô' },
      { ul: [
        'Cho bạn: "Bạn ... thân mến", "Lan thân mến".',
        'Cho thầy cô: "Thầy/Cô kính mến", "Thầy/Cô kính yêu".',
        'Cho ông bà: "Ông/Bà kính yêu".',
      ] },
      { note: 'Đừng dùng xưng hô thiếu lịch sự (mày, ngươi) trong thư trang trọng.' },
    ],
    examples: [
      { q: 'Bố cục thư có mấy phần?', a: '3 phần: Đầu thư – Nội dung – Cuối thư.' },
      { q: 'Lời xưng hô viết thư cho thầy cô?', a: '"Thầy/Cô kính mến" hoặc "Thầy/Cô kính yêu".' },
    ],
  },

  'P4TV-w34-quiz': {
    topic: 'MRVT: Lạc quan — Yêu đời',
    intro: 'Chủ đề ấm áp — LẠC QUAN và YÊU ĐỜI giúp em sống vui và mạnh mẽ hơn!',
    objectives: [
      'Hiểu và dùng các từ thuộc chủ điểm.',
      'Thuộc thành ngữ về lạc quan.',
    ],
    theory: [
      { h: 'Nhóm từ' },
      { ul: [
        'Cùng nghĩa: lạc quan, yêu đời, vui vẻ, phấn khởi, tươi cười.',
        'Trái nghĩa: bi quan, buồn bã, chán nản, thất vọng.',
      ] },
      { note: 'Thành ngữ: "Sông có khúc, người có lúc" — cuộc sống có lúc thăng lúc trầm, hãy tin vào ngày mai.' },
    ],
    examples: [
      { q: 'Từ trái nghĩa với "lạc quan"?', a: 'Bi quan.' },
      { q: 'Bạn nào lạc quan: "Khóc lóc khi bị điểm kém" / "Cố gắng học tốt hơn vào lần sau"?', a: 'Bạn thứ hai — tin vào tương lai và hành động.' },
    ],
  },

  'P4TV-w35-quiz': {
    topic: 'Ôn tập cuối năm',
    intro: 'Tuần cuối năm — cô trò mình tổng kết toàn bộ kiến thức Tiếng Việt Lớp 4 nhé!',
    objectives: [
      'Tổng hợp kiến thức cả năm.',
      'Vận dụng linh hoạt vào nhiều dạng bài.',
    ],
    theory: [
      { h: 'Các chủ đề chính' },
      { ul: [
        'Từ và cấu tạo từ (đơn, phức, ghép, láy).',
        'Từ loại (danh từ, động từ, tính từ).',
        'Các kiểu câu kể, câu hỏi, câu khiến, câu cảm.',
        'Trạng ngữ (thời gian, nơi chốn, nguyên nhân, mục đích).',
        'Các dấu câu: hai chấm, ngoặc kép, gạch ngang.',
        'Tập làm văn: miêu tả đồ vật, cây cối, con vật, viết thư.',
        'MRVT: trung thực, ước mơ, ý chí, tài năng, sức khoẻ, du lịch, lạc quan.',
      ] },
      { note: 'Khi làm bài: đọc kỹ đề, suy nghĩ rồi viết, kiểm tra chính tả trước khi nộp.' },
    ],
    examples: [
      { q: 'Câu "Hãy giữ gìn vệ sinh chung!" là loại câu nào?', a: 'Câu khiến (có "hãy" + dấu "!").' },
      { q: 'Câu "Ôi, cảnh đẹp tuyệt vời!" là loại câu nào?', a: 'Câu cảm (có "Ôi" + dấu "!").' },
    ],
  },

  'P4TV-w36-quiz': {
    topic: 'Kết thúc Lớp 4 — Hành trang Tiếng Việt vào Lớp 5',
    intro: 'Chúc mừng các em đã hoàn thành năm học Lớp 4! Hôm nay cô tổng kết hành trình Tiếng Việt — bốn kỹ năng nghe, nói, đọc, viết — và cùng nhìn về Lớp 5 nhé!',
    objectives: [
      'Hệ thống bốn kỹ năng Tiếng Việt Lớp 4: nghe, nói, đọc, viết.',
      'Nắm vững kiến thức từ vựng, ngữ pháp, làm văn cả năm.',
      'Hiểu những nội dung mới chờ đợi ở Lớp 5.',
    ],
    theory: [
      { h: 'Hành trình Tiếng Việt Lớp 4' },
      { ul: [
        'Từ và cấu tạo từ: từ đơn, từ phức (ghép tổng hợp, ghép phân loại, láy âm, láy vần, láy cả tiếng).',
        'Từ loại: danh từ (người, vật, khái niệm), động từ (hành động, trạng thái), tính từ (đặc điểm).',
        'Câu: câu kể (Ai là gì? Ai làm gì? Ai thế nào?); câu hỏi; câu khiến; câu cảm; câu ghép.',
        'Thành phần câu: chủ ngữ, vị ngữ, trạng ngữ (thời gian, nơi chốn, nguyên nhân, mục đích).',
        'Dấu câu: dấu hai chấm (báo hiệu lời dẫn hoặc liệt kê); ngoặc kép (trích dẫn, ý nghĩa đặc biệt); gạch ngang (lời thoại, chú thích, liệt kê).',
        'Tập làm văn: miêu tả đồ vật, cây cối, con vật; viết thư; kể chuyện đã nghe – đã đọc.',
        'MRVT theo chủ điểm: Thương người, Măng mọc thẳng, Trên đôi cánh ước mơ, Có chí thì nên, Tiếng sáo diều, Du lịch-Khám phá, Vẻ đẹp muôn màu, Những người quả cảm, Khám phá thế giới, Tình yêu cuộc sống.',
      ] },
      { h: 'Lớp 5 sẽ học gì?' },
      { ul: [
        'Từ: từ đồng nghĩa, trái nghĩa, đồng âm; thành ngữ, tục ngữ.',
        'Câu: câu đơn, câu ghép (quan hệ: nguyên nhân-kết quả, tương phản, điều kiện-kết quả).',
        'Văn: miêu tả người, miêu tả cảnh; viết chương trình hoạt động; viết báo cáo thống kê; tập viết đoạn đối thoại.',
        'Kỹ năng đọc hiểu: nhận biết chi tiết, suy luận, đánh giá, liên hệ thực tế.',
      ] },
      { note: 'Hè này hãy đọc thêm sách — đó là cách tốt nhất để vừa nâng cao vốn từ vừa luyện đọc hiểu!' },
    ],
    examples: [
      { q: 'Phân loại từ "mềm mại": từ ghép hay từ láy?', a: 'Từ láy âm (mềm — mại, các phụ âm đầu giống nhau: m).' },
      { q: 'Xác định trạng ngữ: "Vì trời mưa, chúng tôi nghỉ ở nhà."', a: 'Trạng ngữ chỉ nguyên nhân: "Vì trời mưa".' },
    ],
  },
};
