// ============================================================
// Lớp 1 · TIẾNG VIỆT — Lý thuyết + Ví dụ 35 tuần (GDPT 2018)
// Key TRÙNG id quiz: "P1TV-wNN-quiz".
// Giọng cô giáo lớp 1: rất nhẹ nhàng, câu ngắn, từ đơn giản.
// ============================================================

export const P1TV_LESSONS = {
  // ──────────────── HK1 ────────────────
  'P1TV-w01-quiz': {
    topic: 'Làm quen · Tư thế ngồi viết · Bảng chữ cái',
    intro: 'Chào các em! Tuần đầu tiên, cô dạy các em cách ngồi viết và làm quen bảng chữ cái nhé.',
    objectives: [
      'Biết tư thế ngồi viết đúng.',
      'Biết bảng chữ cái tiếng Việt bắt đầu bằng chữ "a".',
    ],
    theory: [
      { h: 'Tư thế ngồi viết' },
      { ul: ['Lưng thẳng, vai cân bằng.', 'Mắt cách vở khoảng 25–30 cm.', 'Cầm bút bằng tay phải (đa số bạn).'] },
      { h: 'Bảng chữ cái' },
      { p: 'Tiếng Việt có 29 chữ cái. Bắt đầu bằng chữ "a" và kết thúc bằng chữ "y".' },
      { note: 'Tiếng Việt KHÔNG có chữ f, j, w, z – nhưng có chữ ă, â, đ, ê, ô, ơ, ư.' },
    ],
    examples: [
      { q: 'Bảng chữ cái tiếng Việt bắt đầu bằng chữ nào?', a: 'Bảng chữ cái bắt đầu bằng chữ "a".' },
      { q: 'Khi viết, mắt em cách vở khoảng bao xa?', a: 'Khoảng 25 đến 30 cm để không hại mắt.' },
    ],
  },

  'P1TV-w02-quiz': {
    topic: 'Âm /a/ · /b/ · /c/',
    intro: 'Các em ơi, hôm nay cô dạy ba âm đầu tiên: a, b, c nhé!',
    objectives: [
      'Đọc, viết được các âm a, b, c.',
      'Ghép âm thành tiếng đơn giản: ba, ca.',
    ],
    theory: [
      { h: 'Ba âm a – b – c' },
      { p: 'Mỗi chữ cái là một âm. Ghép âm đầu với vần ta được tiếng.' },
      { ul: ['"ba" = b + a.', '"ca" = c + a.', 'Thêm dấu thanh ta được tiếng khác: ba, bà, bá, bả, bã.'] },
      { h: 'Dấu thanh' },
      { p: 'Tiếng Việt có 6 thanh: ngang, huyền, sắc, hỏi, ngã, nặng.' },
      { note: 'Mỗi chữ cái có dạng viết HOA và viết thường: A – a, B – b, C – c.' },
    ],
    examples: [
      { q: 'Tiếng "ba" gồm những âm nào?', a: 'Gồm âm đầu "b" và vần "a".' },
      { q: 'Tiếng "cá" có dấu gì?', a: 'Có dấu SẮC trên chữ a.' },
    ],
  },

  'P1TV-w03-quiz': {
    topic: 'Âm /o/ · /ô/ · /ơ/',
    intro: 'Hôm nay cô giới thiệu ba âm rất giống nhau nhưng khác chút xíu: o, ô, ơ.',
    objectives: [
      'Phân biệt o, ô, ơ.',
      'Đọc, viết tiếng có ba âm này.',
    ],
    theory: [
      { h: 'Ba âm o – ô – ơ' },
      { ul: ['"o" – không có dấu mũ, không có râu.', '"ô" – có DẤU MŨ ở trên.', '"ơ" – có RÂU nhỏ bên phải.'] },
      { h: 'Ghép tiếng' },
      { p: 'co, cô, cơ – ba tiếng khác nhau ở âm chính.' },
      { note: 'Khi viết, nhớ thêm dấu mũ cho "ô" và râu cho "ơ" nhé.' },
    ],
    examples: [
      { q: '"co" và "cô" khác nhau ở chỗ nào?', a: 'Khác âm chính: "o" và "ô".' },
      { q: 'Tiếng nào có âm "ơ"?', a: '"cờ", "mơ", "tơ" – tất cả đều có âm "ơ".' },
    ],
  },

  'P1TV-w04-quiz': {
    topic: 'Âm /e/ · /ê/ · /i/',
    intro: 'Các em đã thuộc o, ô, ơ rồi. Tuần này tới ba âm mới: e, ê, i.',
    objectives: [
      'Đọc, viết e, ê, i.',
      'Phân biệt e với ê.',
    ],
    theory: [
      { h: 'Ba âm e – ê – i' },
      { ul: ['"e" – không có dấu mũ.', '"ê" – có DẤU MŨ ở trên.', '"i" – có một dấu chấm nhỏ ở trên.'] },
      { h: 'Ghép tiếng' },
      { p: 'be, bê, bi – ba tiếng khác nhau ở âm chính.' },
      { note: 'Tiếng "đi" có 2 chữ cái: đ và i.' },
    ],
    examples: [
      { q: 'Tiếng "bê" có âm chính là gì?', a: 'Âm chính là "ê".' },
      { q: 'Tiếng "đi" có mấy chữ cái?', a: 'Có 2 chữ cái: đ và i.' },
    ],
  },

  'P1TV-w05-quiz': {
    topic: 'Âm /u/ · /ư/ · /n/ · /m/',
    intro: 'Tuần này cô dạy thêm bốn âm nữa: u, ư, n, m. Cô tin các em sẽ học giỏi!',
    objectives: [
      'Đọc, viết các âm u, ư, n, m.',
      'Ghép tiếng đơn giản: mẹ, nụ, tu, tư.',
    ],
    theory: [
      { h: 'Hai âm u – ư' },
      { p: '"u" không có gì, "ư" có RÂU nhỏ bên phải.' },
      { h: 'Hai âm n – m' },
      { p: '"n" có 2 nét, "m" có 3 nét.' },
      { ul: ['"mẹ" = m + e + dấu nặng.', '"nụ" = n + u + dấu nặng.', '"tư" có âm chính "ư".'] },
      { note: 'Nhìn kĩ "u" và "ư": chỉ khác nhau ở cái râu.' },
    ],
    examples: [
      { q: 'Tiếng "mẹ" có âm đầu là gì?', a: 'Âm đầu là "m".' },
      { q: '"tu" và "tư" khác nhau ở đâu?', a: 'Khác âm chính: "u" và "ư".' },
    ],
  },

  'P1TV-w06-quiz': {
    topic: 'Âm ghép: /ch/ · /kh/ · /nh/ · /ph/ · /th/',
    intro: 'Có những âm gồm HAI chữ cái ghép lại, gọi là ÂM GHÉP. Cùng cô tìm hiểu nhé!',
    objectives: [
      'Nhận biết các âm ghép ch, kh, nh, ph, th.',
      'Đọc tiếng có âm ghép.',
    ],
    theory: [
      { h: 'Âm ghép là gì?' },
      { p: 'Hai chữ cái đứng cạnh nhau cho một âm DUY NHẤT, gọi là âm ghép.' },
      { ul: ['"ch" trong "chợ".', '"kh" trong "khế".', '"nh" trong "nhà".', '"ph" trong "phở".', '"th" trong "thi".'] },
      { note: 'Khi đọc, em đọc cả hai chữ cái như MỘT âm.' },
    ],
    examples: [
      { q: 'Tiếng "chợ" có âm đầu là gì?', a: 'Âm đầu là "ch" (âm ghép).' },
      { q: 'Tiếng "phở" có âm đầu là gì?', a: 'Âm đầu là "ph" (âm ghép).' },
    ],
  },

  'P1TV-w07-quiz': {
    topic: 'Vần /an/ · /at/ · /ac/',
    intro: 'Sau âm là VẦN. Hôm nay cô dạy ba vần đầu tiên: an, at, ac nhé!',
    objectives: [
      'Đọc, viết các vần an, at, ac.',
      'Phân biệt âm cuối n, t, c.',
    ],
    theory: [
      { h: 'Cấu tạo vần' },
      { p: 'Vần = âm chính + âm cuối. Ví dụ "an" = a + n.' },
      { ul: ['"an" có âm cuối là "n".', '"at" có âm cuối là "t".', '"ac" có âm cuối là "c".'] },
      { h: 'Ghép tiếng' },
      { p: 'Lấy âm đầu + vần + dấu thanh: b + an + huyền = "bàn".' },
      { note: 'Âm cuối khác nhau cho tiếng khác nhau: lan – lát – lác.' },
    ],
    examples: [
      { q: 'Vần "an" gồm những âm nào?', a: 'Âm chính "a" + âm cuối "n".' },
      { q: 'Tiếng "bàn" có vần là gì?', a: 'Vần "àn" (vần "an" có thêm dấu huyền).' },
    ],
  },

  'P1TV-w08-quiz': {
    topic: 'Vần /on/ · /ot/ · /oc/ · /en/ · /et/',
    intro: 'Tuần này các em làm quen với 5 vần mới. Cô tin các em sẽ nhớ rất nhanh!',
    objectives: [
      'Đọc, viết các vần on, ot, oc, en, et.',
      'Tìm tiếng chứa các vần đó.',
    ],
    theory: [
      { h: 'Năm vần mới' },
      { ul: ['"on" – con, lon, son.', '"ot" – cót, lót, vót.', '"oc" – cóc, sóc, lọc.', '"en" – sen, kèn, đèn.', '"et" – hết, mét, két.'] },
      { h: 'Nhận biết' },
      { p: 'Vần luôn đứng SAU âm đầu. Trong "con": âm đầu "c" + vần "on".' },
      { note: 'Đọc to và rõ từng vần để nhớ lâu nhé.' },
    ],
    examples: [
      { q: 'Tiếng "con" có vần gì?', a: 'Vần "on".' },
      { q: 'Tiếng "sen" có vần gì?', a: 'Vần "en".' },
    ],
  },

  'P1TV-w09-quiz': {
    topic: 'Vần /un/ · /ut/ · /uc/ · /in/ · /it/',
    intro: 'Cô con mình học tiếp 5 vần mới với âm chính u và i nhé!',
    objectives: [
      'Đọc, viết các vần un, ut, uc, in, it.',
      'Ghép tiếng có các vần này.',
    ],
    theory: [
      { h: 'Năm vần mới' },
      { ul: ['"un" – bún, lùn, đùn.', '"ut" – phút, sút, mút.', '"uc" – cúc, lúc, búc.', '"in" – tin, xin, nhìn.', '"it" – mít, hít, vít.'] },
      { note: 'Nhớ phân biệt âm cuối n và t khi đọc cuối tiếng.' },
    ],
    examples: [
      { q: 'Tiếng "bún" có vần gì?', a: 'Vần "ún" (vần "un" có dấu sắc).' },
      { q: 'Tiếng "mít" có vần gì?', a: 'Vần "ít" (vần "it" có dấu sắc).' },
    ],
  },

  'P1TV-w10-quiz': {
    topic: 'Vần /anh/ · /inh/ · /ach/ · /ich/',
    intro: 'Hôm nay cô dạy các vần khó hơn một chút: anh, inh, ach, ich. Cùng đọc nhé!',
    objectives: [
      'Đọc, viết các vần anh, inh, ach, ich.',
      'Phân biệt âm cuối nh và ch.',
    ],
    theory: [
      { h: 'Cấu tạo' },
      { p: 'Các vần này có âm cuối là "nh" hoặc "ch" (gồm 2 chữ cái).' },
      { ul: ['"anh" – anh, banh, cành.', '"inh" – xinh, kinh, mình.', '"ach" – sách, vách, rách.', '"ich" – lịch, ích, tịch.'] },
      { note: 'Vần "anh" = a + nh, không phải a + n + h.' },
    ],
    examples: [
      { q: 'Tiếng "anh" có vần gì?', a: 'Vần "anh".' },
      { q: 'Tiếng "sách" có vần gì?', a: 'Vần "ách" (vần "ach" có dấu sắc).' },
    ],
  },

  'P1TV-w11-quiz': {
    topic: 'Vần /ong/ · /ông/ · /ung/ · /ưng/',
    intro: 'Tuần này các em học các vần có âm cuối "ng". Đọc thấy lạ lạ nhưng dễ nhớ lắm!',
    objectives: [
      'Đọc, viết các vần ong, ông, ung, ưng.',
      'Tìm tiếng có các vần đó.',
    ],
    theory: [
      { h: 'Bốn vần có "ng"' },
      { ul: ['"ong" – ong, bong, cong.', '"ông" – sông, lông, ông.', '"ung" – bụng, súng, vung.', '"ưng" – mừng, sưng, lưng.'] },
      { h: 'Nhận biết' },
      { p: 'Khi đọc, âm cuối "ng" làm môi không khép lại.' },
      { note: 'Phân biệt với vần kết thúc bằng "n" (lưỡi chạm răng).' },
    ],
    examples: [
      { q: 'Tiếng "sông" có vần gì?', a: 'Vần "ông".' },
      { q: 'Tiếng "mừng" có vần gì?', a: 'Vần "ừng" (vần "ưng" có dấu huyền).' },
    ],
  },

  'P1TV-w12-quiz': {
    topic: 'Vần /oi/ · /ai/ · /ay/ · /ây/',
    intro: 'Hôm nay cô dạy các vần kết thúc bằng "i" hoặc "y". Phân biệt cẩn thận nhé!',
    objectives: [
      'Đọc, viết các vần oi, ai, ay, ây.',
      'Phân biệt âm cuối "i" và "y".',
    ],
    theory: [
      { h: 'Bốn vần mới' },
      { ul: ['"oi" – voi, coi, hỏi.', '"ai" – tai, mai, hai.', '"ay" – bay, máy, tay.', '"ây" – cây, mây, dây.'] },
      { h: 'Phân biệt i và y cuối' },
      { p: 'Sau "a" và "â" thường dùng "y": tay, cây. Sau "o" thường dùng "i": voi.' },
      { note: '"tay" và "tai" khác nhau ở âm cuối: y và i.' },
    ],
    examples: [
      { q: 'Tiếng "voi" có vần gì?', a: 'Vần "oi".' },
      { q: '"tay" và "tai" khác nhau ở đâu?', a: 'Khác ở âm cuối: y và i.' },
    ],
  },

  'P1TV-w13-quiz': {
    topic: 'Vần /eo/ · /êu/ · /iu/ · /au/ · /âu/',
    intro: 'Cùng cô làm quen với 5 vần mới nhé: eo, êu, iu, au, âu.',
    objectives: [
      'Đọc, viết các vần eo, êu, iu, au, âu.',
      'Tìm tiếng có chứa các vần này.',
    ],
    theory: [
      { h: 'Năm vần mới' },
      { ul: ['"eo" – mèo, leo, kẹo.', '"êu" – sếu, kêu, mếu.', '"iu" – rìu, xíu, ríu.', '"au" – cau, sau, lau.', '"âu" – trâu, mâu, đầu.'] },
      { note: 'Mỗi vần có một "giọng" riêng – em đọc to để nghe.' },
    ],
    examples: [
      { q: 'Tiếng "mèo" có vần gì?', a: 'Vần "èo" (vần "eo" có dấu huyền).' },
      { q: 'Tiếng "trâu" có vần gì?', a: 'Vần "âu".' },
    ],
  },

  'P1TV-w14-quiz': {
    topic: 'Đọc đoạn ngắn (1) · Trường em',
    intro: 'Các em đã đọc giỏi rồi. Bây giờ cô con mình cùng đọc đoạn ngắn về trường em nhé!',
    objectives: [
      'Đọc trôi chảy đoạn ngắn về trường.',
      'Biết một số nề nếp ở trường.',
    ],
    theory: [
      { h: 'Trường tiểu học' },
      { p: 'Trường tiểu học dạy từ lớp 1 đến lớp 5. Người dạy em là thầy giáo, cô giáo.' },
      { h: 'Nề nếp ở trường' },
      { ul: ['Đầu tuần em chào cờ, đứng nghiêm.', 'Khi cô gọi, em đứng lên khoanh tay chào.', 'Đi học đúng giờ, mặc đồng phục gọn gàng.'] },
      { note: 'Ngày đầu tiên đi học gọi là ngày KHAI GIẢNG.' },
    ],
    examples: [
      { q: 'Trường tiểu học dạy từ lớp mấy?', a: 'Dạy từ lớp 1 đến lớp 5.' },
      { q: 'Người dạy em ở trường gọi là gì?', a: 'Thầy giáo hoặc cô giáo.' },
    ],
  },

  'P1TV-w15-quiz': {
    topic: 'Đọc đoạn ngắn (2) · Gia đình em',
    intro: 'Hôm nay cô con mình cùng đọc về gia đình thân yêu. Ai cũng có một gia đình đáng quý nhé!',
    objectives: [
      'Biết gọi đúng tên các thành viên trong gia đình.',
      'Hiểu tình cảm gia đình.',
    ],
    theory: [
      { h: 'Các thành viên' },
      { ul: ['Bố mẹ là người sinh ra em.', 'Ông bà nội là bố mẹ của bố.', 'Ông bà ngoại là bố mẹ của mẹ.', 'Anh trai của bố gọi là BÁC. Em trai của bố gọi là CHÚ.', 'Em gái của mẹ gọi là DÌ.'] },
      { note: 'Anh chị em ruột là cùng bố mẹ.' },
    ],
    examples: [
      { q: 'Người sinh ra em là ai?', a: 'Bố mẹ sinh ra em.' },
      { q: 'Anh trai của bố em gọi là gì?', a: 'Gọi là BÁC.' },
    ],
  },

  'P1TV-w16-quiz': {
    topic: 'Viết câu ngắn · Dấu chấm · Dấu phẩy',
    intro: 'Các em ơi, hôm nay cô dạy viết CÂU và dùng dấu CHẤM, dấu PHẨY nhé!',
    objectives: [
      'Biết quy tắc viết hoa đầu câu.',
      'Biết dùng dấu chấm, dấu hỏi, dấu than.',
    ],
    theory: [
      { h: 'Quy tắc' },
      { ul: ['Chữ đầu câu phải viết HOA.', 'Cuối câu KỂ dùng dấu CHẤM (.).', 'Cuối câu HỎI dùng dấu HỎI (?).', 'Cuối câu CẢM/GỌI thường dùng dấu THAN (!).'] },
      { h: 'Đếm tiếng trong câu' },
      { p: 'Câu "Em đi học." có 3 tiếng: em / đi / học.' },
      { note: 'Tên người và tên riêng cũng viết hoa chữ cái đầu.' },
    ],
    examples: [
      { q: 'Cuối câu hỏi dùng dấu gì?', a: 'Dùng dấu hỏi (?).' },
      { q: 'Câu "Em đi học." có bao nhiêu tiếng?', a: 'Có 3 tiếng: em, đi, học.' },
    ],
  },

  'P1TV-w17-quiz': {
    topic: 'Ôn tập cuối HK1 (1) – Âm vần',
    intro: 'Một học kì đã trôi qua. Cô con mình ôn lại các âm và vần đã học nhé!',
    objectives: [
      'Ôn các âm đơn và âm ghép.',
      'Ôn các vần đã học.',
    ],
    theory: [
      { h: 'Các âm ghép' },
      { p: 'Nhớ lại: ch, kh, nh, ph, th, tr, gh, ngh.' },
      { h: 'Các vần đã học' },
      { ul: ['Vần kết thúc bằng n/t/c: an, on, en, in, ut, oc...', 'Vần kết thúc bằng ng/nh/ch: ong, anh, ach, inh.', 'Vần kết thúc bằng i/y: ai, oi, ay, ây.'] },
      { note: 'Dấu thanh: ngang, huyền, sắc, hỏi, ngã, nặng.' },
    ],
    examples: [
      { q: 'Tiếng "chanh" có âm đầu là gì?', a: 'Âm đầu là "ch".' },
      { q: 'Vần "anh" có âm cuối là gì?', a: 'Âm cuối là "nh".' },
    ],
  },

  'P1TV-w18-quiz': {
    topic: 'Ôn tập cuối HK1 (2) – Đọc – Viết',
    intro: 'Tiếp tục ôn tập – lần này cô tập trung vào đọc và viết câu.',
    objectives: [
      'Viết đúng câu, đúng dấu thanh.',
      'Sắp xếp từ thành câu đúng.',
    ],
    theory: [
      { h: 'Viết câu đúng' },
      { ul: ['Chữ đầu câu viết HOA.', 'Cuối câu kể dùng dấu CHẤM.', 'Tên người viết hoa chữ cái đầu mỗi tiếng.'] },
      { h: 'Sắp xếp từ thành câu' },
      { p: 'Đọc các từ, tìm chủ ngữ + vị ngữ, sắp xếp cho hợp lý: "Em đi học." chứ không phải "Đi học em."' },
      { note: 'Mỗi câu cần có nghĩa rõ ràng.' },
    ],
    examples: [
      { q: 'Sắp xếp thành câu đúng: "đi / em / học"', a: 'Em đi học. (chủ ngữ "em" đứng đầu)' },
      { q: 'Tên riêng người được viết như thế nào?', a: 'Viết hoa chữ cái đầu mỗi tiếng. Ví dụ: Nguyễn Văn An.' },
    ],
  },

  // ──────────────── HK2 ────────────────
  'P1TV-w19-quiz': {
    topic: 'Vần khó: /uôi/ · /ươi/ · /uây/',
    intro: 'Học kì mới, các em làm quen các vần KHÓ hơn – có 3 chữ cái. Cùng cô đọc thật rõ nhé!',
    objectives: [
      'Đọc, viết các vần uôi, ươi, uây.',
      'Tìm tiếng chứa các vần đó.',
    ],
    theory: [
      { h: 'Ba vần khó' },
      { ul: ['"uôi" – chuối, suối, đuối.', '"ươi" – tươi, cười, người.', '"uây" – khuấy, quây, ngoáy.'] },
      { h: 'Cấu tạo' },
      { p: 'Vần có 3 âm: hai âm chính + một âm cuối.' },
      { note: 'Đọc kéo dài âm chính để nghe rõ vần.' },
    ],
    examples: [
      { q: 'Tiếng "chuối" có vần gì?', a: 'Vần "uôi".' },
      { q: 'Tiếng "tươi" có vần gì?', a: 'Vần "ươi".' },
    ],
  },

  'P1TV-w20-quiz': {
    topic: 'Vần khó: /iên/ · /uôn/ · /ươn/',
    intro: 'Cô con mình học tiếp 3 vần khó nữa: iên, uôn, ươn. Cố lên các em!',
    objectives: [
      'Đọc, viết các vần iên, uôn, ươn.',
      'Tìm tiếng chứa các vần đó.',
    ],
    theory: [
      { h: 'Ba vần khó' },
      { ul: ['"iên" – tiền, hiền, kiên.', '"uôn" – buôn, muốn, luôn.', '"ươn" – vườn, lươn, sườn.'] },
      { note: 'Các vần này có 2 hoặc 3 chữ cái. Em đọc to để nhớ.' },
    ],
    examples: [
      { q: 'Tiếng "tiền" có vần gì?', a: 'Vần "iên" (có dấu huyền thành "iề").' },
      { q: 'Tiếng "vườn" có vần gì?', a: 'Vần "ươn" (có dấu huyền).' },
    ],
  },

  'P1TV-w21-quiz': {
    topic: 'Vần khó: /oan/ · /oat/ · /uân/ · /uât/',
    intro: 'Tuần này các vần có âm "o" hoặc "u" đứng đầu. Cô tin các em đọc giỏi!',
    objectives: [
      'Đọc, viết các vần oan, oat, uân, uât.',
      'Tìm tiếng chứa các vần này.',
    ],
    theory: [
      { h: 'Bốn vần khó' },
      { ul: ['"oan" – toàn, hoan, ngoan.', '"oat" – hoạt, soạt, thoát.', '"uân" – tuần, huân, xuân.', '"uât" – thuật, xuất, luật.'] },
      { note: 'Vần có âm đệm "o" hoặc "u" ở đầu, nghe có chút lượn.' },
    ],
    examples: [
      { q: 'Tiếng "toàn" có vần gì?', a: 'Vần "oan" (có dấu huyền).' },
      { q: 'Tiếng "tuần" có vần gì?', a: 'Vần "uân" (có dấu huyền).' },
    ],
  },

  'P1TV-w22-quiz': {
    topic: 'Nghỉ Tết (đọc nhẹ về Tết)',
    intro: 'Tuần này các em được nghỉ Tết. Cô con mình cùng đọc về Tết Nguyên đán nhé!',
    objectives: [
      'Biết Tết Nguyên đán là Tết cổ truyền.',
      'Nhận biết các nét đẹp của Tết Việt.',
    ],
    theory: [
      { h: 'Tết Nguyên đán' },
      { p: 'Là Tết cổ truyền của người Việt và một số nước châu Á. Là dịp sum vầy gia đình.' },
      { h: 'Hoa và bánh ngày Tết' },
      { ul: ['Miền Bắc: hoa ĐÀO.', 'Miền Nam: hoa MAI.', 'Bánh CHƯNG (vuông) tượng trưng cho ĐẤT.', 'Bánh DÀY (tròn) tượng trưng cho TRỜI.'] },
      { note: 'Đầu năm em nhớ chúc ông bà cha mẹ "Chúc mừng năm mới" nhé.' },
    ],
    examples: [
      { q: 'Cây hoa đặc trưng miền Bắc dịp Tết là gì?', a: 'Hoa đào.' },
      { q: 'Bánh chưng vuông tượng trưng cho gì?', a: 'Tượng trưng cho ĐẤT.' },
    ],
  },

  'P1TV-w23-quiz': {
    topic: 'Đọc đoạn: Cây bàng sân trường',
    intro: 'Cùng cô đọc đoạn ngắn về cây bàng quen thuộc trong sân trường nhé!',
    objectives: [
      'Đọc và hiểu nội dung đoạn về cây bàng.',
      'Biết yêu quý cây xanh.',
    ],
    theory: [
      { h: 'Cây bàng' },
      { p: 'Cây bàng thường được trồng ở sân trường, lề đường để cho bóng mát.' },
      { h: 'Lá bàng theo mùa' },
      { ul: ['Mùa hè: lá XANH tươi.', 'Mùa thu: lá chuyển VÀNG – ĐỎ.', 'Mùa đông: lá RỤNG.', 'Mùa xuân: cây ra lá NON.'] },
      { note: 'Em hãy yêu quý và bảo vệ cây xanh trong trường nhé.' },
    ],
    examples: [
      { q: 'Cây bàng thường được trồng ở đâu?', a: 'Ở sân trường và lề đường.' },
      { q: 'Mùa thu, lá bàng có màu gì?', a: 'Lá chuyển sang màu vàng và đỏ.' },
    ],
  },

  'P1TV-w24-quiz': {
    topic: 'Đọc đoạn: Bạn của em',
    intro: 'Bạn bè là điều rất quý. Cô con mình cùng đọc về tình bạn nhé!',
    objectives: [
      'Hiểu giá trị của tình bạn.',
      'Biết cách cư xử tốt với bạn.',
    ],
    theory: [
      { h: 'Bạn thân là ai?' },
      { p: 'Bạn thân là người gần gũi, chia sẻ vui buồn với em.' },
      { h: 'Cách cư xử với bạn' },
      { ul: ['Bạn buồn: an ủi, lắng nghe.', 'Bạn thiếu đồ dùng: cho mượn.', 'Không tranh giành đồ chơi.', 'Cùng chơi, cùng học.'] },
      { note: 'Tình bạn tốt được xây dựng bằng YÊU THƯƠNG và TIN CẬY.' },
    ],
    examples: [
      { q: 'Khi bạn buồn, em nên làm gì?', a: 'An ủi và lắng nghe bạn.' },
      { q: 'Bạn quên mang bút, em nên làm gì?', a: 'Cho bạn mượn bút để bạn viết bài.' },
    ],
  },

  'P1TV-w25-quiz': {
    topic: 'Chính tả nghe – viết (1)',
    intro: 'Hôm nay cô tập cho các em nghe và viết đúng – gọi là CHÍNH TẢ. Cẩn thận từng nét nhé!',
    objectives: [
      'Nghe và viết đúng câu ngắn.',
      'Phân tích tiếng thành âm đầu và vần.',
    ],
    theory: [
      { h: 'Cách nghe – viết' },
      { ul: ['Nghe cô đọc cả câu trước.', 'Nhẩm lại câu trong đầu.', 'Viết từng tiếng, nhớ dấu thanh và viết hoa đầu câu.', 'Đọc lại bài để soát lỗi.'] },
      { h: 'Phân tích tiếng' },
      { p: 'Tiếng "trường" = âm đầu "tr" + vần "ường" (vần "ương" + dấu huyền).' },
      { note: 'Tên thứ trong tuần (Thứ Bảy, Chủ Nhật) thường viết hoa.' },
    ],
    examples: [
      { q: 'Câu "Em yêu trường em." có mấy tiếng?', a: 'Có 4 tiếng: em / yêu / trường / em.' },
      { q: 'Điền chữ đúng: "con … nhỏ" — chọn mèo / meo / mẻo', a: 'Điền "mèo" — viết: con mèo nhỏ.' },
    ],
  },

  'P1TV-w26-quiz': {
    topic: 'Chính tả nghe – viết (2)',
    intro: 'Tiếp tục luyện chính tả. Hôm nay cô đặc biệt nhắc các em phân biệt CH/TR, S/X, D/GI/R.',
    objectives: [
      'Viết đúng các tiếng dễ nhầm chính tả.',
      'Phân biệt ch/tr, s/x, d/gi/r.',
    ],
    theory: [
      { h: 'Một số chữ dễ nhầm' },
      { ul: ['"ngành" (đúng) – không phải "nghành".', '"kẽm" (dấu ngã) – kim loại.', '"cá sấu" (đúng) – không phải "cá xấu".', '"quả chuối" – có vần "uôi".', '"đi giày" – có "gi".'] },
      { note: 'Khi không chắc, em hỏi cô hoặc tra từ điển nhé.' },
    ],
    examples: [
      { q: 'Tiếng nào viết đúng: "nghành" hay "ngành"?', a: 'Viết đúng là "ngành".' },
      { q: 'Điền: "Đi …" (mặc vào chân) – chọn giày / dày / rày', a: 'Điền "giày". Viết: đi giày.' },
    ],
  },

  'P1TV-w27-quiz': {
    topic: 'Từ chỉ sự vật · Đồ vật quen thuộc',
    intro: 'Các em ơi, có những từ chỉ ĐỒ VẬT, có từ chỉ CON VẬT, có từ chỉ NGƯỜI. Cùng cô phân loại nhé!',
    objectives: [
      'Nhận biết từ chỉ sự vật.',
      'Phân loại đồ vật, con vật, cây cối.',
    ],
    theory: [
      { h: 'Từ chỉ sự vật' },
      { ul: ['Chỉ đồ vật: cái bút, quyển vở, cái bàn.', 'Chỉ con vật: con mèo, con gà, con cá.', 'Chỉ cây/quả: cây cam, quả táo, hoa hồng.', 'Chỉ người: bố, mẹ, cô giáo.'] },
      { h: 'Đồ dùng học tập' },
      { p: 'Bút, vở, cặp sách, thước, tẩy, bảng con là đồ dùng học tập.' },
      { note: 'Cái chảo, cái nồi không phải đồ dùng học tập – đó là đồ bếp.' },
    ],
    examples: [
      { q: 'Đâu là từ chỉ đồ dùng học tập: cái bút, cái chảo, cái nồi?', a: 'Cái bút – là đồ dùng học tập.' },
      { q: '"Cô giáo" là từ chỉ gì?', a: 'Chỉ NGƯỜI.' },
    ],
  },

  'P1TV-w28-quiz': {
    topic: 'Từ chỉ hoạt động',
    intro: 'Có những từ chỉ việc làm – gọi là TỪ CHỈ HOẠT ĐỘNG. Cùng cô tìm hiểu nhé!',
    objectives: [
      'Nhận biết từ chỉ hoạt động.',
      'Tìm hoạt động tốt cho sức khoẻ.',
    ],
    theory: [
      { h: 'Từ chỉ hoạt động' },
      { p: 'Là từ chỉ việc làm: chạy, nhảy, học, đọc, viết, ăn, ngủ, chơi, hát.' },
      { h: 'Hoạt động tốt' },
      { ul: ['Tập thể dục: khoẻ mạnh.', 'Đọc sách: giỏi kiến thức.', 'Rửa tay: sạch sẽ.', 'Đi ngủ đúng giờ: khoẻ.'] },
      { note: 'Ngồi xem TV cả ngày hay thức khuya không tốt cho em đâu.' },
    ],
    examples: [
      { q: 'Từ nào sau đây chỉ hoạt động: đẹp, chạy, cao, đỏ?', a: 'Từ "chạy" – chỉ hoạt động.' },
      { q: 'Hoạt động nào giúp em sạch sẽ?', a: 'Rửa tay sạch sẽ.' },
    ],
  },

  'P1TV-w29-quiz': {
    topic: 'Từ chỉ đặc điểm (màu sắc, hình dáng)',
    intro: 'Có những từ chỉ MÀU SẮC, HÌNH DÁNG – gọi là TỪ CHỈ ĐẶC ĐIỂM. Cùng cô khám phá nhé!',
    objectives: [
      'Nhận biết từ chỉ màu sắc, hình dáng.',
      'Tìm đặc điểm của các sự vật quen thuộc.',
    ],
    theory: [
      { h: 'Từ chỉ đặc điểm' },
      { ul: ['Màu sắc: đỏ, xanh, vàng, tím, đen, trắng.', 'Hình dáng: tròn, vuông, dài, ngắn, to, nhỏ.', 'Tính cách (cho người): hiền, ngoan, chăm.'] },
      { h: 'Ví dụ quen thuộc' },
      { p: 'Lá cây màu XANH. Mặt trời màu ĐỎ/VÀNG. Quả cam khi chín màu CAM.' },
      { note: 'Hãy quan sát đồ vật quanh em và gọi tên đặc điểm.' },
    ],
    examples: [
      { q: 'Từ nào chỉ màu sắc: chạy, đỏ, ăn, cao?', a: 'Từ "đỏ" – chỉ màu sắc.' },
      { q: 'Lá cây thường có màu gì?', a: 'Màu xanh.' },
    ],
  },

  'P1TV-w30-quiz': {
    topic: 'Câu kể · Câu hỏi · Câu cảm',
    intro: 'Các em ơi, hôm nay cô dạy 3 kiểu câu: KỂ, HỎI, CẢM. Mỗi câu có dấu cuối riêng đấy!',
    objectives: [
      'Phân biệt câu kể, câu hỏi, câu cảm.',
      'Dùng đúng dấu cuối câu.',
    ],
    theory: [
      { h: 'Ba kiểu câu' },
      { ul: ['Câu KỂ: nói về một việc. Cuối câu có dấu CHẤM. Ví dụ: "Em đi học."', 'Câu HỎI: dùng để hỏi. Cuối câu có dấu HỎI (?). Ví dụ: "Bạn tên là gì?"', 'Câu CẢM: bộc lộ cảm xúc. Cuối câu có dấu THAN (!). Ví dụ: "Ôi đẹp quá!"'] },
      { note: 'Nhìn dấu cuối câu là biết kiểu câu đấy.' },
    ],
    examples: [
      { q: '"Em đi học." là câu gì?', a: 'Cuối có dấu chấm → CÂU KỂ.' },
      { q: 'Để hỏi tuổi bạn, em nói thế nào?', a: '"Bạn bao nhiêu tuổi?"' },
    ],
  },

  'P1TV-w31-quiz': {
    topic: 'Kể chuyện ngắn: Rùa và Thỏ',
    intro: 'Hôm nay cô kể cho các em câu chuyện ngụ ngôn rất hay: Rùa và Thỏ.',
    objectives: [
      'Hiểu nội dung truyện Rùa và Thỏ.',
      'Rút ra bài học về tính kiên trì.',
    ],
    theory: [
      { h: 'Tóm tắt truyện' },
      { p: 'Thỏ và Rùa cùng thi chạy. Thỏ nhanh nên kiêu căng và ngủ quên giữa đường. Rùa chậm nhưng kiên trì nên về đích trước.' },
      { h: 'Bài học' },
      { ul: ['Đừng kiêu căng dù mình có giỏi.', 'Kiên trì, bền bỉ thì sẽ thành công.', 'Chậm mà chắc còn hơn nhanh mà ẩu.'] },
      { note: 'Em hãy như Rùa: chăm chỉ và bền bỉ học mỗi ngày nhé.' },
    ],
    examples: [
      { q: 'Vì sao Thỏ thua Rùa?', a: 'Vì Thỏ chủ quan, kiêu căng và ngủ quên giữa đường.' },
      { q: 'Bài học của truyện là gì?', a: 'Kiêu căng sẽ thua; kiên trì sẽ thắng.' },
    ],
  },

  'P1TV-w32-quiz': {
    topic: 'Đọc – hiểu đoạn ngắn (1)',
    intro: 'Hôm nay cô luyện cho các em ĐỌC HIỂU – đọc rồi trả lời câu hỏi nhé!',
    objectives: [
      'Đọc trôi chảy đoạn ngắn.',
      'Trả lời được các câu hỏi về đoạn đọc.',
    ],
    theory: [
      { h: 'Đoạn mẫu' },
      { p: '"Mẹ đi chợ về. Mẹ mua cho em một quả táo đỏ."' },
      { h: 'Cách đọc hiểu' },
      { ul: ['Đọc cả đoạn trước.', 'Đọc kĩ câu hỏi.', 'Tìm câu trả lời TRONG đoạn.', 'Nói cảm ơn khi nhận quà.'] },
      { note: 'Khi nhận quà từ ai, em nhớ nói "Cảm ơn".' },
    ],
    examples: [
      { q: 'Trong đoạn trên, mẹ mua gì cho em?', a: 'Mẹ mua quả táo đỏ cho em.' },
      { q: 'Em nên nói gì với mẹ khi nhận quà?', a: '"Cảm ơn mẹ ạ."' },
    ],
  },

  'P1TV-w33-quiz': {
    topic: 'Đọc – hiểu đoạn ngắn (2)',
    intro: 'Cùng cô tiếp tục luyện đọc hiểu với một đoạn ngắn mới nhé!',
    objectives: [
      'Đọc và hiểu đoạn ngắn về việc đi học.',
      'Biết khi nào viết hoa tên riêng.',
    ],
    theory: [
      { h: 'Đoạn mẫu' },
      { p: '"Sáng nay trời nắng đẹp. Em đi học cùng bạn Lan."' },
      { h: 'Lưu ý' },
      { ul: ['"Sáng nay" là buổi sáng.', '"Bạn Lan" – Lan viết hoa vì là TÊN RIÊNG.', 'Đi học là việc đều đặn hàng ngày.'] },
      { note: 'Mọi tên người đều viết hoa chữ cái đầu mỗi tiếng.' },
    ],
    examples: [
      { q: 'Trong đoạn trên, em đi học với ai?', a: 'Em đi học với bạn Lan.' },
      { q: 'Vì sao tên "Lan" viết hoa?', a: 'Vì "Lan" là TÊN RIÊNG của người.' },
    ],
  },

  'P1TV-w34-quiz': {
    topic: 'Ôn tập cuối HK2 (1)',
    intro: 'Cuối năm rồi! Cô con mình cùng ôn lại các kiến thức quan trọng nhé.',
    objectives: [
      'Ôn các âm, vần, dấu thanh.',
      'Ôn các kiểu câu và viết hoa tên riêng.',
    ],
    theory: [
      { h: 'Nhớ lại' },
      { ul: ['Âm ghép: ch, kh, nh, ph, th, tr.', 'Cuối câu hỏi: dấu hỏi (?).', 'Cuối câu kể: dấu chấm.', 'Từ chỉ con vật: con mèo, con gà.', 'Từ chỉ màu sắc: đỏ, xanh, vàng.', 'Tên người: viết hoa chữ cái đầu mỗi tiếng.'] },
      { note: 'Đọc lại các bài đã học để nhớ lâu nhé.' },
    ],
    examples: [
      { q: 'Tiếng "trường" có âm đầu là gì?', a: 'Âm đầu là "tr".' },
      { q: '"Con mèo" là từ chỉ gì?', a: 'Chỉ CON VẬT.' },
    ],
  },

  'P1TV-w35-quiz': {
    topic: 'Ôn tập cuối HK2 (2)',
    intro: 'Tuần cuối cùng của năm học. Cô chúc các em ôn tốt, lên lớp 2 chăm ngoan và học giỏi!',
    objectives: [
      'Ôn vần khó và chính tả.',
      'Ôn kiểu câu và sắp xếp câu.',
    ],
    theory: [
      { h: 'Vần khó' },
      { p: 'Nhớ lại: uôi, ươi, iên, uôn, ươn, oan, uân.' },
      { h: 'Chính tả' },
      { ul: ['"quả dứa" – đúng (không phải "giứa").', '"đi giày" – đúng.', '"con mèo" – đúng.'] },
      { h: 'Sắp xếp câu' },
      { p: 'Chủ ngữ + động từ + bổ ngữ. Ví dụ: "Em yêu cô."' },
      { note: 'Sang năm các em lên lớp 2. Hãy ôn bài thường xuyên để chắc kiến thức nhé!' },
    ],
    examples: [
      { q: 'Tiếng "chuối" có vần gì?', a: 'Vần "uôi".' },
      { q: 'Sắp xếp thành câu đúng: "yêu / em / cô"', a: 'Em yêu cô. (hoặc Cô yêu em. – tuỳ ý nghĩa)' },
    ],
  },

  'P1TV-w36-quiz': {
    topic: 'Kết thúc Lớp 1 — Hành trang Tiếng Việt vào Lớp 2',
    intro: 'Chúc mừng! Cả năm học em đã làm rất tốt! Mình cùng nhìn lại hành trình chữ và tiếng nhé.',
    objectives: [
      'Nhớ lại các âm, vần, từ và câu đã học.',
      'Tự hào về sự tiến bộ và sẵn sàng học Lớp 2.',
    ],
    theory: [
      { h: 'Em đã học được gì?' },
      { ul: [
        '29 chữ cái tiếng Việt và các âm ghép: ch, nh, kh, ph, th, tr, gi, qu…',
        'Các vần phổ biến: an, ăn, ân, en, in, on, ơn, un… và vần khó: uôi, ươi, iên…',
        '6 dấu thanh: ngang, huyền, sắc, hỏi, ngã, nặng.',
        'Từ chỉ người, vật, hoạt động, màu sắc.',
        'Câu kể, câu hỏi; dấu chấm, dấu hỏi.',
      ] },
      { h: 'Lên Lớp 2 em sẽ học gì?' },
      { ul: [
        'Đọc bài dài hơn, hiểu nội dung sâu hơn.',
        'Viết đoạn văn ngắn.',
        'Học thêm nhiều từ và kiểu câu mới.',
      ] },
      { note: 'Hè này hãy đọc sách mỗi ngày — dù chỉ 10 phút thôi. Đó là cách tốt nhất để yêu tiếng Việt!' },
    ],
    examples: [
      { q: '"Con trâu" — "trâu" có âm đầu và vần gì?', a: 'Âm đầu "tr", vần "âu".' },
      { q: 'Đặt câu hỏi với từ "ai": "_____ đang học bài?"', a: 'Ai đang học bài? (Dùng dấu hỏi cuối câu.)' },
    ],
  },
};
