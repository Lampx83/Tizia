// ============================================================
// Lớp 3 · TỰ NHIÊN VÀ XÃ HỘI — Lý thuyết + Ví dụ 35 tuần (GDPT 2018)
// Key TRÙNG id quiz: "P3TNXH-wNN-quiz".
// ============================================================

export const P3TNXH_LESSONS = {
  // ──────────────── HK1 ────────────────
  'P3TNXH-w01-quiz': {
    topic: 'Họ hàng nội – ngoại',
    intro: 'Chào các em! Tuần đầu của môn TNXH Lớp 3, cô trò mình cùng tìm hiểu về họ hàng — gia đình mở rộng của em nhé.',
    objectives: [
      'Phân biệt họ NỘI và họ NGOẠI.',
      'Gọi đúng tên các thành viên: ông bà nội/ngoại, cô, dì, chú, bác, cậu.',
    ],
    theory: [
      { h: 'Họ nội và họ ngoại' },
      { ul: [
        'HỌ NỘI = họ hàng bên BỐ: ông bà nội, bác, chú, cô.',
        'HỌ NGOẠI = họ hàng bên MẸ: ông bà ngoại, bác (mẹ chị của mẹ), cậu, dì.',
      ] },
      { h: 'Các vai trong gia đình' },
      { ul: [
        'Bác: anh/chị của bố hoặc mẹ.',
        'Chú: em trai của bố. Cô: em gái của bố.',
        'Cậu: em trai của mẹ. Dì: em gái của mẹ.',
      ] },
      { note: 'Mỗi vùng có cách gọi hơi khác (Bắc, Trung, Nam) — em hỏi bố mẹ để biết cách gọi đúng ở quê mình.' },
    ],
    examples: [
      { q: 'Em trai của mẹ em gọi là gì?', a: 'Cậu.' },
      { q: 'Ông bà sinh ra bố em gọi là ai?', a: 'Ông bà nội.' },
    ],
  },

  'P3TNXH-w02-quiz': {
    topic: 'Công việc nhà & vai trò các thành viên',
    intro: 'Trong gia đình, mỗi người đều có công việc riêng. Em cũng có thể giúp đỡ bố mẹ những việc nhỏ đấy!',
    objectives: [
      'Hiểu vai trò các thành viên gia đình.',
      'Biết các việc nhỏ em có thể làm để giúp gia đình.',
    ],
    theory: [
      { h: 'Vai trò các thành viên' },
      { ul: [
        'Bố mẹ: đi làm kiếm tiền, chăm sóc gia đình.',
        'Ông bà: trông cháu, cố vấn cho con cháu.',
        'Anh chị em: yêu thương, giúp đỡ nhau.',
      ] },
      { h: 'Việc em có thể làm' },
      { p: 'Quét nhà, lau bàn, gấp quần áo, rửa bát, tưới cây, dọn đồ chơi, trông em nhỏ.' },
      { note: 'Giúp việc nhà giúp em RÈN luyện tính tự lập và biết ơn bố mẹ.' },
    ],
    examples: [
      { q: 'Em có thể làm gì để giúp mẹ?', a: 'Quét nhà, lau bàn, rửa bát, gấp quần áo, dọn dẹp đồ của mình.' },
      { q: 'Vai trò chính của ông bà trong nhà?', a: 'Trông cháu, dạy dỗ, truyền kinh nghiệm cho con cháu.' },
    ],
  },

  'P3TNXH-w03-quiz': {
    topic: 'Phòng tránh hoả hoạn ở nhà',
    intro: 'Hoả hoạn rất nguy hiểm. Tuần này cô dạy các em cách phòng và xử lí khi có cháy nhé!',
    objectives: [
      'Nhận biết các nguyên nhân gây cháy.',
      'Biết cách phòng cháy và thoát hiểm.',
    ],
    theory: [
      { h: 'Nguyên nhân gây cháy' },
      { ul: [
        'Quên tắt bếp, bàn là, lò sưởi.',
        'Dây điện cũ bị chập.',
        'Đốt vàng mã, hút thuốc bất cẩn.',
        'Trẻ em nghịch lửa.',
      ] },
      { h: 'Cách phòng và xử lí' },
      { ul: [
        'Không nghịch bật lửa, diêm.',
        'Trước khi đi ngủ kiểm tra bếp, ổ điện.',
        'Nếu có cháy: hô to "Cháy!", gọi 114, chạy ra cửa thoát.',
        'Cúi thấp người để tránh khói, dùng khăn ướt che mũi miệng.',
      ] },
      { note: 'Số gọi cứu hoả là 114. Hãy nhớ!' },
    ],
    examples: [
      { q: 'Khi phát hiện cháy, em làm gì đầu tiên?', a: 'Hô lớn "Cháy!" để báo người lớn, rồi chạy ra ngoài và gọi 114.' },
      { q: 'Vì sao phải cúi thấp khi thoát khỏi nhà cháy?', a: 'Vì khói bay lên trên, cúi thấp dễ thở hơn.' },
    ],
  },

  'P3TNXH-w04-quiz': {
    topic: 'An toàn điện trong nhà',
    intro: 'Điện là người bạn nhưng cũng có thể nguy hiểm. Cô dạy các em cách dùng điện AN TOÀN.',
    objectives: [
      'Nhận biết các nguy cơ điện giật.',
      'Sử dụng đồ điện an toàn.',
    ],
    theory: [
      { h: 'Nguy cơ điện giật' },
      { ul: [
        'Chạm tay vào ổ điện, dây điện hở.',
        'Cắm phích điện bằng tay ướt.',
        'Dùng đồ điện ở nơi ẩm ướt.',
        'Cắm nhiều thiết bị vào 1 ổ — quá tải.',
      ] },
      { h: 'Cách dùng an toàn' },
      { ul: [
        'Tay khô mới chạm vào phích cắm.',
        'Không nhét vật lạ vào ổ điện.',
        'Khi có vật rơi vào ổ điện, GỌI người lớn, KHÔNG tự xử lí.',
        'Đi dép khi sử dụng đồ điện.',
      ] },
      { note: 'Khi có người bị điện giật: NGẮT cầu dao trước, rồi mới cứu.' },
    ],
    examples: [
      { q: 'Tay ướt có được cắm điện không? Vì sao?', a: 'KHÔNG. Vì nước dẫn điện rất tốt, dễ bị điện giật.' },
      { q: 'Thấy dây điện hở, em làm gì?', a: 'Báo người lớn, không tự sờ vào.' },
    ],
  },

  'P3TNXH-w05-quiz': {
    topic: 'Trường học và các phòng chức năng',
    intro: 'Trường mình có rất nhiều phòng. Cô trò mình cùng đi tham quan từng phòng nhé!',
    objectives: [
      'Biết các phòng chức năng trong trường.',
      'Hiểu vai trò mỗi phòng.',
    ],
    theory: [
      { h: 'Các phòng trong trường' },
      { ul: [
        'Phòng học: nơi học các môn chính.',
        'Thư viện: nơi đọc và mượn sách.',
        'Phòng tin học: học máy tính.',
        'Phòng âm nhạc, mĩ thuật, thể chất.',
        'Phòng y tế: chăm sóc khi em bị đau, ốm.',
        'Phòng hiệu trưởng, phòng giáo viên.',
        'Sân trường, nhà vệ sinh.',
      ] },
      { h: 'Cách giữ gìn' },
      { p: 'Mỗi phòng cần được giữ sạch sẽ, ngăn nắp. Em phải đi nhẹ, nói khẽ, dùng đồ đúng cách.' },
      { note: 'Phòng nào cũng quan trọng — em phải tôn trọng tất cả các cô chú nhân viên trong trường.' },
    ],
    examples: [
      { q: 'Em muốn đọc sách thì đến phòng nào?', a: 'Thư viện.' },
      { q: 'Bị đau bụng ở trường, em đến đâu?', a: 'Phòng y tế.' },
    ],
  },

  'P3TNXH-w06-quiz': {
    topic: 'Vệ sinh trường lớp',
    intro: 'Trường lớp sạch sẽ thì học mới vui, mới khoẻ. Tuần này cô dạy các em giữ vệ sinh trường lớp!',
    objectives: [
      'Hiểu lợi ích của vệ sinh trường lớp.',
      'Tham gia vệ sinh lớp hằng ngày.',
    ],
    theory: [
      { h: 'Lợi ích' },
      { ul: [
        'Phòng tránh bệnh.',
        'Tạo môi trường học tập trong lành.',
        'Rèn ý thức tự giác.',
      ] },
      { h: 'Việc em có thể làm' },
      { ul: [
        'Bỏ rác vào thùng.',
        'Lau bàn, kê ghế ngay ngắn.',
        'Trực nhật lớp đúng phiên.',
        'Không vẽ bậy lên tường, bàn.',
      ] },
      { note: 'Một hành động nhỏ của em — sạch lớp, đẹp trường.' },
    ],
    examples: [
      { q: 'Ăn xong vỏ chuối em làm gì?', a: 'Bỏ vào thùng rác (KHÔNG vứt ra sân hay xuống đất).' },
      { q: 'Trực nhật là gì?', a: 'Là phiên các bạn dọn vệ sinh lớp học (quét, lau, kê bàn ghế).' },
    ],
  },

  'P3TNXH-w07-quiz': {
    topic: 'An toàn trong trường học',
    intro: 'Trường là nơi vui chơi nhưng cũng cần biết cách giữ AN TOÀN. Cùng cô tìm hiểu nhé!',
    objectives: [
      'Nhận biết các tình huống không an toàn.',
      'Biết cách chơi an toàn ở trường.',
    ],
    theory: [
      { h: 'Tình huống không an toàn' },
      { ul: [
        'Chạy nhảy trên cầu thang.',
        'Xô đẩy bạn.',
        'Trèo cây, trèo tường.',
        'Chơi gần đường giao thông.',
        'Tự ý ra khỏi trường.',
      ] },
      { h: 'Quy tắc chơi an toàn' },
      { ul: [
        'Đi cầu thang chậm, bám tay vịn.',
        'Chơi ở chỗ an toàn, có giám sát.',
        'Báo cô giáo khi thấy nguy hiểm.',
      ] },
      { note: 'Khi bị thương → đến PHÒNG Y TẾ ngay, không tự ý xử lí.' },
    ],
    examples: [
      { q: 'Em thấy bạn chạy ở cầu thang, em làm gì?', a: 'Nhắc bạn đi chậm và bám tay vịn, hoặc báo cô giáo.' },
      { q: 'Vì sao không nên trèo cây ở trường?', a: 'Dễ ngã, bị thương, làm gãy cây.' },
    ],
  },

  'P3TNXH-w08-quiz': {
    topic: 'Cộng đồng địa phương',
    intro: 'Quanh nhà em có nhiều người và nhiều nơi quen thuộc. Đó chính là CỘNG ĐỒNG ĐỊA PHƯƠNG!',
    objectives: [
      'Hiểu cộng đồng địa phương là gì.',
      'Nhận biết các thành viên trong cộng đồng.',
    ],
    theory: [
      { h: 'Cộng đồng địa phương' },
      { p: 'Là một nhóm người cùng sống trong một khu vực (thôn, xã, phường), có quan hệ và giúp đỡ lẫn nhau.' },
      { h: 'Thành viên cộng đồng' },
      { ul: [
        'Hàng xóm, người thân.',
        'Công an, bộ đội, bác sĩ, giáo viên.',
        'Người bán hàng, người làm nông, công nhân.',
      ] },
      { note: 'Em hãy chào hỏi lễ phép và giúp đỡ những người xung quanh.' },
    ],
    examples: [
      { q: 'Hàng xóm là ai?', a: 'Người sống cạnh nhà em (sát vách hoặc cùng khu phố).' },
      { q: 'Kể 2 người trong cộng đồng giúp em an toàn.', a: 'Công an, bộ đội (hoặc bác sĩ, thầy cô).' },
    ],
  },

  'P3TNXH-w09-quiz': {
    topic: 'Chợ và siêu thị',
    intro: 'Chợ và siêu thị đều là nơi mua bán nhưng có nhiều điểm khác nhau — cùng cô khám phá!',
    objectives: [
      'Phân biệt chợ và siêu thị.',
      'Biết cách đi chợ/siêu thị an toàn.',
    ],
    theory: [
      { h: 'Chợ truyền thống' },
      { ul: ['Đông người, có thể trả giá.', 'Hàng tươi sống nhiều.', 'Thường họp ngoài trời hoặc trong nhà lồng chợ.'] },
      { h: 'Siêu thị' },
      { ul: ['Trong nhà, có máy lạnh.', 'Giá niêm yết — không trả giá.', 'Hàng đóng gói, tự chọn.'] },
      { note: 'Đi chợ/siêu thị: bám sát bố mẹ, không đi lung tung, không nhận đồ từ người lạ.' },
    ],
    examples: [
      { q: 'Ở chợ có được trả giá không?', a: 'CÓ. Người bán và người mua thương lượng giá.' },
      { q: 'Lạc bố mẹ ở siêu thị, em làm gì?', a: 'Đứng yên gần kệ hàng hoặc tìm BẢO VỆ / NHÂN VIÊN siêu thị nhờ thông báo.' },
    ],
  },

  'P3TNXH-w10-quiz': {
    topic: 'Cơ quan công cộng địa phương',
    intro: 'Ở địa phương có nhiều cơ quan giúp cuộc sống tốt đẹp. Cô giới thiệu để em biết nhé!',
    objectives: [
      'Biết các cơ quan công cộng địa phương.',
      'Hiểu vai trò mỗi cơ quan.',
    ],
    theory: [
      { h: 'Các cơ quan' },
      { ul: [
        'UBND xã/phường: quản lí hành chính.',
        'Công an: bảo vệ an ninh.',
        'Trường học: dạy học.',
        'Bệnh viện, trạm y tế: chăm sóc sức khoẻ.',
        'Bưu điện: gửi thư, hàng.',
        'Thư viện: cho mượn sách.',
      ] },
      { h: 'Cách ứng xử' },
      { p: 'Ở cơ quan công cộng cần lễ phép, xếp hàng, giữ trật tự.' },
      { note: 'Người làm việc ở cơ quan công cộng phục vụ NHÂN DÂN — em phải tôn trọng họ.' },
    ],
    examples: [
      { q: 'Muốn gửi thư cho bạn ở xa, em đến đâu?', a: 'Bưu điện.' },
      { q: 'Ai bảo vệ an ninh ở địa phương?', a: 'Công an.' },
    ],
  },

  'P3TNXH-w11-quiz': {
    topic: 'Bệnh viện và trạm y tế',
    intro: 'Khi ốm đau, ta đến BỆNH VIỆN hoặc TRẠM Y TẾ. Cùng cô tìm hiểu hai nơi này nhé!',
    objectives: [
      'Phân biệt bệnh viện và trạm y tế.',
      'Biết cách ứng xử khi đến khám bệnh.',
    ],
    theory: [
      { h: 'Trạm y tế xã/phường' },
      { p: 'Nơi khám bệnh ban đầu, tiêm chủng, sơ cứu. Gần nhà, miễn phí hoặc rẻ tiền.' },
      { h: 'Bệnh viện' },
      { p: 'Khám và chữa bệnh phức tạp hơn, có nhiều khoa: nhi, sản, ngoại... Có giường nội trú cho bệnh nhân nặng.' },
      { ul: [
        'Cấp cứu: gọi 115.',
        'Bệnh nhẹ: trạm y tế.',
        'Bệnh nặng: bệnh viện.',
      ] },
      { note: 'Vào bệnh viện cần GIỮ TRẬT TỰ, không chạy nhảy ồn ào.' },
    ],
    examples: [
      { q: 'Số gọi cấp cứu là?', a: '115.' },
      { q: 'Bị cảm sốt nhẹ, em đến đâu?', a: 'Trạm y tế xã/phường (gần nhà).' },
    ],
  },

  'P3TNXH-w12-quiz': {
    topic: 'An toàn giao thông – đèn tín hiệu',
    intro: 'Tham gia giao thông là việc hằng ngày. Cô dạy các em nhận biết ĐÈN TÍN HIỆU nhé!',
    objectives: [
      'Hiểu ý nghĩa 3 màu đèn giao thông.',
      'Biết quy tắc qua đường an toàn.',
    ],
    theory: [
      { h: '3 màu đèn' },
      { ul: [
        'ĐỎ — DỪNG lại.',
        'VÀNG — Chuẩn bị (giảm tốc).',
        'XANH — ĐI.',
      ] },
      { h: 'Qua đường an toàn' },
      { ul: [
        'Đi trên VẠCH KẺ ĐƯỜNG dành cho người đi bộ.',
        'Quan sát trái – phải – trái rồi mới qua.',
        'Không chạy, không nhìn điện thoại khi qua đường.',
        'Nắm tay người lớn nếu có.',
      ] },
      { note: '"Đèn vàng" KHÔNG có nghĩa là vượt cho nhanh — mà là chuẩn bị dừng.' },
    ],
    examples: [
      { q: 'Đèn đỏ thì em làm gì?', a: 'Dừng lại, chờ đèn xanh mới đi.' },
      { q: 'Trước khi qua đường em phải làm gì?', a: 'Quan sát trái – phải – trái, đi trên vạch kẻ đường.' },
    ],
  },

  'P3TNXH-w13-quiz': {
    topic: 'An toàn khi ngồi xe',
    intro: 'Đi xe máy, xe ô tô đều phải biết cách ngồi an toàn — không thì rất nguy hiểm đấy các em!',
    objectives: [
      'Biết quy tắc an toàn khi đi xe máy và ô tô.',
      'Đội mũ bảo hiểm, thắt dây an toàn đúng cách.',
    ],
    theory: [
      { h: 'Đi xe máy' },
      { ul: [
        'BẮT BUỘC đội mũ bảo hiểm có cài quai.',
        'Ngồi sau, ôm chặt người lớn.',
        'Không đùa nghịch, không thò tay/chân ra ngoài.',
      ] },
      { h: 'Đi ô tô' },
      { ul: [
        'Thắt dây an toàn.',
        'Trẻ em < 10 tuổi nên ngồi ghế sau, dùng ghế trẻ em.',
        'Không thò đầu/tay ra cửa.',
        'Chờ xe DỪNG HẲN mới mở cửa xuống.',
      ] },
      { note: 'Mũ bảo hiểm cứu mạng — chiếc mũ rẻ hơn cái đầu của em rất nhiều.' },
    ],
    examples: [
      { q: 'Ngồi sau xe máy có cần đội mũ bảo hiểm không?', a: 'CÓ. Bắt buộc đội mũ và cài quai chắc chắn.' },
      { q: 'Khi nào được mở cửa xe ô tô?', a: 'Khi xe đã dừng hẳn và quan sát phía ngoài an toàn.' },
    ],
  },

  'P3TNXH-w14-quiz': {
    topic: 'Phòng tránh đuối nước',
    intro: 'Mùa hè đến rồi, nước rất hấp dẫn nhưng cũng rất NGUY HIỂM. Cô dạy các em cách phòng tránh đuối nước!',
    objectives: [
      'Biết các nơi nguy hiểm có thể gây đuối nước.',
      'Biết quy tắc an toàn khi đi bơi.',
    ],
    theory: [
      { h: 'Nơi nguy hiểm' },
      { ul: ['Sông, suối, ao, hồ, biển không có cứu hộ.', 'Bể bơi không có người lớn giám sát.', 'Chậu nước, xô nước (nguy hiểm cho em nhỏ).'] },
      { h: 'Quy tắc an toàn' },
      { ul: [
        'KHÔNG tự ý ra ao hồ một mình.',
        'Học bơi với giáo viên có chuyên môn.',
        'Bơi ở chỗ NÔNG, có cứu hộ.',
        'Khởi động kĩ trước khi xuống nước.',
        'Mặc áo phao khi đi bơi/du thuyền.',
      ] },
      { note: 'Thấy bạn đuối nước: HÔ TO báo người lớn, KHÔNG tự nhảy xuống cứu.' },
    ],
    examples: [
      { q: 'Thấy bạn rơi xuống ao, em làm gì?', a: 'Hô to "Cứu!" để báo người lớn, KHÔNG tự nhảy xuống cứu vì rất nguy hiểm.' },
      { q: 'Trước khi bơi cần làm gì?', a: 'Khởi động kĩ và bơi ở chỗ có cứu hộ.' },
    ],
  },

  'P3TNXH-w15-quiz': {
    topic: 'Phòng tránh xâm hại trẻ em',
    intro: 'Đây là bài học rất quan trọng để bảo vệ chính em. Hãy nghe cô dạy thật kĩ nhé!',
    objectives: [
      'Hiểu khái niệm "vùng riêng tư" của cơ thể.',
      'Biết quy tắc 5 ngón tay và cách bảo vệ bản thân.',
    ],
    theory: [
      { h: 'Vùng riêng tư' },
      { p: 'Vùng được che bởi đồ lót/đồ tắm là VÙNG RIÊNG TƯ. KHÔNG AI được sờ vào trừ bố mẹ khi tắm cho em hoặc bác sĩ khi khám có người lớn đi cùng.' },
      { h: 'Quy tắc 5 ngón tay' },
      { ul: [
        'Ngón cái (gần nhất): bố mẹ, người thân — được ôm, hôn.',
        'Ngón trỏ: thầy cô, bạn — được bắt tay.',
        'Ngón giữa: hàng xóm quen — vẫy tay.',
        'Ngón áp út: người lạ — gật đầu chào.',
        'Ngón út: kẻ xấu — hét to "KHÔNG", chạy ra chỗ đông người.',
      ] },
      { note: 'Nói "KHÔNG", "TRÁNH XA", và kể ngay cho bố mẹ/cô giáo khi có người làm em khó chịu.' },
    ],
    examples: [
      { q: 'Người lạ rủ em đi mua kẹo, em làm gì?', a: 'Nói KHÔNG, không đi theo, kể lại cho bố mẹ.' },
      { q: 'Có người sờ vào vùng riêng tư của em, em làm gì?', a: 'Hét to "KHÔNG!", chạy đi và kể ngay cho bố mẹ/cô giáo.' },
    ],
  },

  'P3TNXH-w16-quiz': {
    topic: 'Sử dụng tiền hợp lý',
    intro: 'Tiền do bố mẹ làm ra rất vất vả. Cô dạy các em cách dùng tiền HỢP LÍ và biết tiết kiệm.',
    objectives: [
      'Hiểu giá trị đồng tiền.',
      'Biết phân biệt nhu cầu thiết yếu và mong muốn.',
      'Hình thành thói quen tiết kiệm.',
    ],
    theory: [
      { h: 'Tiền dùng để làm gì?' },
      { ul: [
        'Mua thực phẩm, quần áo, sách vở.',
        'Trả tiền điện, nước, học phí.',
        'Dành dụm cho việc lớn, cho khi ốm đau.',
      ] },
      { h: 'Tiết kiệm' },
      { ul: [
        'Cần (thiết yếu): cơm ăn, sách vở — phải có.',
        'Muốn (mong muốn): đồ chơi, kẹo — chỉ nên có một ít.',
        'Bỏ tiền vào ống heo, không tiêu lung tung.',
      ] },
      { note: 'Trước khi mua, hãy hỏi: "Mình có THỰC SỰ cần không?"' },
    ],
    examples: [
      { q: 'Sách vở và đồ chơi, cái nào là NHU CẦU THIẾT YẾU?', a: 'Sách vở (vì cần để học); đồ chơi là MONG MUỐN.' },
      { q: 'Em nhận lì xì, nên làm gì?', a: 'Bỏ vào ống heo tiết kiệm hoặc nhờ bố mẹ giữ giúp.' },
    ],
  },

  'P3TNXH-w17-quiz': {
    topic: 'Sinh hoạt cuối tuần & ngày lễ',
    intro: 'Cuối tuần và ngày lễ là dịp gia đình quây quần. Cô dạy các em những hoạt động ý nghĩa nhé!',
    objectives: [
      'Biết các hoạt động cuối tuần lành mạnh.',
      'Biết các ngày lễ chính trong năm.',
    ],
    theory: [
      { h: 'Hoạt động cuối tuần' },
      { ul: [
        'Đi công viên, chơi thể thao.',
        'Về thăm ông bà.',
        'Đọc sách, xem phim cùng gia đình.',
        'Phụ giúp việc nhà.',
      ] },
      { h: 'Các ngày lễ chính' },
      { ul: [
        'Tết Nguyên Đán (Tết âm lịch) — tháng Giêng.',
        'Giỗ Tổ Hùng Vương — 10/3 âm lịch.',
        'Quốc khánh — 2/9.',
        'Tết Trung Thu — 15/8 âm lịch.',
        'Ngày Quốc tế Thiếu nhi — 1/6.',
      ] },
      { note: 'Hạn chế xem điện thoại, ti vi quá nhiều ngày cuối tuần.' },
    ],
    examples: [
      { q: 'Ngày 2/9 là ngày gì?', a: 'Quốc khánh (Ngày Độc lập của Việt Nam).' },
      { q: 'Cuối tuần làm gì ý nghĩa?', a: 'Về thăm ông bà, chơi thể thao, đọc sách cùng gia đình.' },
    ],
  },

  'P3TNXH-w18-quiz': {
    topic: 'Ôn tập Học kỳ 1',
    intro: 'Một học kì sắp khép lại. Cùng cô tổng kết những điều đã học để chuẩn bị cho kiểm tra nhé!',
    objectives: [
      'Ôn tập toàn bộ kiến thức HK1.',
      'Liên hệ kiến thức vào cuộc sống.',
    ],
    theory: [
      { h: 'Trọng tâm HK1' },
      { ul: [
        'Họ hàng nội – ngoại; vai trò các thành viên gia đình.',
        'An toàn ở nhà: phòng cháy, an toàn điện.',
        'Trường học: các phòng, vệ sinh, an toàn.',
        'Cộng đồng: chợ, siêu thị, cơ quan công cộng.',
        'An toàn giao thông, xe cộ.',
        'Phòng tránh: đuối nước, xâm hại.',
        'Sử dụng tiền, sinh hoạt cuối tuần.',
      ] },
      { h: 'Lời nhắn' },
      { p: 'Kiến thức TNXH không chỉ để thi mà để em áp dụng vào cuộc sống mỗi ngày — sống AN TOÀN và HẠNH PHÚC.' },
      { note: 'Học để LÀM, không phải để biết suông.' },
    ],
    examples: [
      { q: 'Số điện thoại cứu hoả?', a: '114.' },
      { q: 'Có 3 loại đèn giao thông, kể tên và ý nghĩa.', a: 'Đỏ — dừng, Vàng — chuẩn bị, Xanh — đi.' },
    ],
  },

  // ──────────────── HK2 ────────────────
  'P3TNXH-w19-quiz': {
    topic: 'Cấu tạo cây xanh: rễ – thân – lá – hoa – quả',
    intro: 'Chào HK2! Cùng cô tìm hiểu thế giới THỰC VẬT — bắt đầu với cấu tạo cây xanh nhé.',
    objectives: [
      'Biết cây xanh có 5 bộ phận chính.',
      'Hiểu vai trò mỗi bộ phận.',
    ],
    theory: [
      { h: '5 bộ phận của cây' },
      { ul: [
        'RỄ: hút nước và muối khoáng, giữ cây bám đất.',
        'THÂN: nâng đỡ cây, đưa nước từ rễ lên lá.',
        'LÁ: quang hợp (làm thức ăn cho cây từ ánh sáng).',
        'HOA: cơ quan sinh sản.',
        'QUẢ: chứa hạt, giúp cây nhân giống.',
      ] },
      { h: 'Hạt' },
      { p: 'Bên trong quả có HẠT. Khi hạt rơi xuống đất, gặp nước và ánh sáng sẽ mọc thành cây mới.' },
      { note: 'Không phải cây nào cũng có hoa nhìn thấy rõ — nhưng tất cả cây xanh đều có rễ, thân, lá.' },
    ],
    examples: [
      { q: 'Bộ phận nào hút nước cho cây?', a: 'RỄ.' },
      { q: 'Lá cây làm gì?', a: 'Quang hợp — tạo thức ăn cho cây nhờ ánh sáng mặt trời.' },
    ],
  },

  'P3TNXH-w20-quiz': {
    topic: 'Các loại rễ và thân cây',
    intro: 'Rễ và thân cây có nhiều loại khác nhau. Cô đưa các em đi khám phá!',
    objectives: [
      'Phân biệt rễ cọc và rễ chùm.',
      'Phân biệt các loại thân: thân gỗ, thân thảo, thân leo, thân bò.',
    ],
    theory: [
      { h: 'Hai loại rễ' },
      { ul: [
        'RỄ CỌC: 1 rễ to chính, các rễ con nhỏ (cây mít, cây nhãn).',
        'RỄ CHÙM: nhiều rễ con bằng nhau, không có rễ chính (cây lúa, cỏ).',
      ] },
      { h: 'Các loại thân' },
      { ul: [
        'Thân GỖ: cứng, to (cây bàng, cây xoài).',
        'Thân THẢO: mềm, nhỏ (cây rau, cây lúa).',
        'Thân LEO: phải bám vào giá (mướp, bí).',
        'Thân BÒ: bò sát mặt đất (bí ngô, dưa hấu).',
      ] },
      { note: 'Cây mía là cây thân thảo nhưng cứng — vì có nhiều "đốt".' },
    ],
    examples: [
      { q: 'Cây lúa có rễ gì?', a: 'Rễ chùm.' },
      { q: 'Cây mướp thuộc loại thân gì?', a: 'Thân leo.' },
    ],
  },

  'P3TNXH-w21-quiz': {
    topic: 'Cây cần gì để sống?',
    intro: 'Cây cũng giống chúng ta — cần ăn, uống, thở. Cô sẽ chỉ rõ cây cần gì để sống nhé!',
    objectives: [
      'Biết 4 yếu tố cây cần để sống.',
      'Biết chăm sóc cây.',
    ],
    theory: [
      { h: '4 yếu tố sống còn' },
      { ul: [
        'NƯỚC: hút từ đất qua rễ.',
        'KHÔNG KHÍ: chủ yếu là CO₂ để quang hợp; O₂ để hô hấp.',
        'ÁNH SÁNG: cần cho quang hợp.',
        'CHẤT KHOÁNG: lấy từ đất (đạm, kali, lân).',
      ] },
      { h: 'Chăm sóc cây' },
      { ul: [
        'Tưới đều nước (không quá nhiều/quá ít).',
        'Đặt cây ở nơi có ánh sáng.',
        'Bón phân định kì.',
        'Bắt sâu, nhổ cỏ.',
      ] },
      { note: 'Cây xanh tạo OXY cho chúng ta thở — hãy yêu và bảo vệ cây.' },
    ],
    examples: [
      { q: 'Cây cần gì để quang hợp?', a: 'Ánh sáng, nước và khí cacbonic (CO₂).' },
      { q: 'Vì sao phải tưới nước cho cây?', a: 'Vì cây cần nước để sống và quang hợp.' },
    ],
  },

  'P3TNXH-w22-quiz': {
    topic: 'Phân loại động vật: côn trùng – chim – cá – thú',
    intro: 'Thế giới động vật vô cùng phong phú. Cô dạy các em cách phân loại nhé!',
    objectives: [
      'Biết 4 nhóm động vật chính.',
      'Nêu đặc điểm mỗi nhóm.',
    ],
    theory: [
      { h: '4 nhóm chính' },
      { ul: [
        'CÔN TRÙNG: có 6 chân, thường có cánh (kiến, ong, bướm, muỗi).',
        'CHIM: có lông vũ, có cánh, đẻ trứng (gà, vịt, chim sẻ).',
        'CÁ: sống dưới nước, thở bằng mang, có vây (cá chép, cá rô).',
        'THÚ (động vật có vú): có lông mao, đẻ con và nuôi con bằng sữa (chó, mèo, bò).',
      ] },
      { h: 'Đặc điểm chung' },
      { p: 'Tất cả động vật đều cần thức ăn, nước, không khí để sống.' },
      { note: 'Cá voi là THÚ vì đẻ con và nuôi con bằng sữa, dù sống dưới nước.' },
    ],
    examples: [
      { q: 'Bướm thuộc nhóm nào?', a: 'Côn trùng (6 chân, có cánh).' },
      { q: 'Cá heo là cá hay thú?', a: 'THÚ. Vì đẻ con và nuôi con bằng sữa.' },
    ],
  },

  'P3TNXH-w23-quiz': {
    topic: 'Ích lợi và tác hại của động vật',
    intro: 'Động vật mang lại nhiều ích lợi nhưng cũng có loài có hại. Cùng cô tìm hiểu!',
    objectives: [
      'Biết các ích lợi của động vật.',
      'Nhận biết một số động vật có hại và cách phòng tránh.',
    ],
    theory: [
      { h: 'Ích lợi' },
      { ul: [
        'Cung cấp thực phẩm: thịt, trứng, sữa (gà, bò, lợn).',
        'Sức kéo: trâu, bò kéo cày.',
        'Trông nhà, bắt chuột: chó, mèo.',
        'Làm cảnh: cá, chim.',
        'Cân bằng sinh thái: ếch ăn sâu, chim ăn côn trùng.',
      ] },
      { h: 'Có hại' },
      { ul: [
        'Muỗi: truyền bệnh sốt rét, sốt xuất huyết.',
        'Chuột: phá lúa, mang mầm bệnh.',
        'Gián, ruồi: gây bệnh tiêu hoá.',
        'Rắn độc, bọ cạp: có nọc độc.',
      ] },
      { note: 'Giữ vệ sinh nhà cửa, ngủ màn để tránh côn trùng có hại.' },
    ],
    examples: [
      { q: 'Con vật nào giúp bắt chuột?', a: 'Mèo.' },
      { q: 'Vì sao phải ngủ màn?', a: 'Tránh muỗi đốt và truyền bệnh (sốt xuất huyết, sốt rét).' },
    ],
  },

  'P3TNXH-w24-quiz': {
    topic: 'Môi trường sống của động vật',
    intro: 'Mỗi con vật có nơi sống riêng — trên cạn, dưới nước, hay trên không. Cùng cô khám phá!',
    objectives: [
      'Biết 3 môi trường sống chính của động vật.',
      'Hiểu mối quan hệ động vật – môi trường.',
    ],
    theory: [
      { h: '3 môi trường' },
      { ul: [
        'TRÊN CẠN: hổ, voi, thỏ, chó.',
        'DƯỚI NƯỚC: cá, tôm, cua, ốc.',
        'TRÊN KHÔNG: chim, dơi, một số côn trùng.',
        'Một số sống cả hai môi trường: ếch, vịt, rùa.',
      ] },
      { h: 'Cần làm gì?' },
      { p: 'Bảo vệ rừng, biển, sông hồ để có chỗ ở cho động vật. Không xả rác xuống sông, biển.' },
      { note: 'Phá môi trường = hại động vật và hại chính con người.' },
    ],
    examples: [
      { q: 'Cá sống ở đâu?', a: 'Dưới nước.' },
      { q: 'Con vật nào sống cả trên cạn và dưới nước?', a: 'Ếch (hoặc rùa, vịt).' },
    ],
  },

  'P3TNXH-w25-quiz': {
    topic: 'Cơ thể người – các cơ quan chính',
    intro: 'Cơ thể chúng ta là một cỗ máy kì diệu. Cô đưa các em đi khám phá các cơ quan chính nhé!',
    objectives: [
      'Biết các cơ quan chính trong cơ thể.',
      'Hiểu vai trò mỗi cơ quan.',
    ],
    theory: [
      { h: 'Các cơ quan chính' },
      { ul: [
        'NÃO: điều khiển toàn bộ cơ thể, suy nghĩ.',
        'TIM: bơm máu đi khắp cơ thể.',
        'PHỔI: hít oxy, thải cacbonic.',
        'DẠ DÀY – RUỘT: tiêu hoá thức ăn.',
        'GAN, THẬN: lọc độc tố.',
        'XƯƠNG – CƠ: nâng đỡ và vận động.',
      ] },
      { h: 'Cần làm gì?' },
      { p: 'Ăn uống đủ chất, vận động đều, ngủ đủ giấc, giữ vệ sinh để cơ thể khoẻ mạnh.' },
      { note: 'Mỗi cơ quan đều quan trọng — không có cái nào "thừa".' },
    ],
    examples: [
      { q: 'Cơ quan nào điều khiển cơ thể?', a: 'Não.' },
      { q: 'Phổi làm gì?', a: 'Hít oxy vào, thải khí cacbonic ra.' },
    ],
  },

  'P3TNXH-w26-quiz': {
    topic: 'Hệ tuần hoàn cơ bản (tim – mạch máu)',
    intro: 'Trái tim của em đập rất chăm chỉ — mỗi giây mỗi phút không nghỉ. Cùng cô tìm hiểu hệ tuần hoàn!',
    objectives: [
      'Hiểu vai trò của tim và mạch máu.',
      'Biết cách giữ tim khoẻ mạnh.',
    ],
    theory: [
      { h: 'Tim và mạch máu' },
      { ul: [
        'TIM: cơ bắp khoẻ, BƠM MÁU đi khắp cơ thể.',
        'MẠCH MÁU: ống dẫn máu (động mạch, tĩnh mạch, mao mạch).',
        'MÁU: mang OXY và CHẤT DINH DƯỠNG nuôi từng tế bào.',
      ] },
      { h: 'Giữ tim khoẻ' },
      { ul: [
        'Tập thể dục đều đặn.',
        'Ăn nhiều rau quả, ít đồ chiên rán.',
        'Ngủ đủ giấc.',
        'Tránh xa thuốc lá, rượu.',
      ] },
      { note: 'Tim một người lớn đập khoảng 60–80 lần/phút; trẻ em đập nhanh hơn.' },
    ],
    examples: [
      { q: 'Tim làm gì?', a: 'Bơm máu đi khắp cơ thể.' },
      { q: 'Làm gì để tim khoẻ?', a: 'Tập thể dục, ăn uống lành mạnh, ngủ đủ giấc.' },
    ],
  },

  'P3TNXH-w27-quiz': {
    topic: 'Hệ tiêu hoá cơ bản (miệng – dạ dày – ruột)',
    intro: 'Mỗi bữa ăn, cơ thể em làm một hành trình thú vị qua hệ tiêu hoá. Cùng cô khám phá nhé!',
    objectives: [
      'Biết các cơ quan chính trong hệ tiêu hoá.',
      'Hiểu quá trình tiêu hoá thức ăn.',
    ],
    theory: [
      { h: 'Hành trình thức ăn' },
      { ul: [
        '1. MIỆNG: răng nhai, nước bọt giúp thức ăn mềm.',
        '2. THỰC QUẢN: đưa thức ăn xuống dạ dày.',
        '3. DẠ DÀY: co bóp, tiết dịch tiêu hoá.',
        '4. RUỘT NON: hấp thu chất dinh dưỡng.',
        '5. RUỘT GIÀ: hấp thu nước, thải bã.',
      ] },
      { h: 'Giữ vệ sinh' },
      { p: 'Đánh răng sau khi ăn, ăn chậm nhai kĩ, không ăn đồ ôi thiu, rửa tay trước khi ăn.' },
      { note: 'Nhai 30 lần mỗi miếng thì dạ dày không phải làm việc vất vả.' },
    ],
    examples: [
      { q: 'Cơ quan nào hấp thu chất dinh dưỡng nhiều nhất?', a: 'Ruột non.' },
      { q: 'Vì sao phải rửa tay trước khi ăn?', a: 'Để tránh đưa vi khuẩn vào miệng, gây bệnh tiêu hoá.' },
    ],
  },

  'P3TNXH-w28-quiz': {
    topic: 'Ăn uống cân đối – tháp dinh dưỡng',
    intro: 'Ăn đủ chất giúp em lớn nhanh và khoẻ mạnh. Cô giới thiệu THÁP DINH DƯỠNG nhé!',
    objectives: [
      'Biết các nhóm thực phẩm chính.',
      'Hiểu nguyên tắc ăn uống cân đối.',
    ],
    theory: [
      { h: '4 nhóm thực phẩm' },
      { ul: [
        'TINH BỘT (cơm, bún, bánh mì): cho năng lượng.',
        'ĐẠM (thịt, cá, trứng, đậu): xây dựng cơ thể.',
        'CHẤT BÉO (dầu, mỡ): cho năng lượng dự trữ.',
        'VITAMIN – KHOÁNG (rau, hoa quả): bảo vệ cơ thể.',
      ] },
      { h: 'Nguyên tắc' },
      { ul: [
        'Ăn ĐỦ 4 nhóm mỗi bữa.',
        'Uống ĐỦ NƯỚC mỗi ngày (6–8 cốc).',
        'Hạn chế đồ ngọt, nước ngọt, đồ chiên rán.',
        'Ăn đúng giờ, không bỏ bữa.',
      ] },
      { note: 'Sữa và chế phẩm sữa rất tốt cho xương — em nên uống mỗi ngày.' },
    ],
    examples: [
      { q: 'Thịt cá thuộc nhóm nào?', a: 'Đạm.' },
      { q: 'Vì sao phải ăn nhiều rau?', a: 'Để cung cấp vitamin, chất xơ giúp tiêu hoá tốt và tăng sức đề kháng.' },
    ],
  },

  'P3TNXH-w29-quiz': {
    topic: 'Vệ sinh cá nhân & phòng bệnh',
    intro: 'Giữ vệ sinh cá nhân là cách tốt nhất để không bị ốm. Cô dạy các em những thói quen tốt nhé!',
    objectives: [
      'Biết các thói quen vệ sinh hằng ngày.',
      'Hiểu nguyên tắc phòng bệnh.',
    ],
    theory: [
      { h: 'Vệ sinh cá nhân' },
      { ul: [
        'Đánh răng SÁNG và TỐI.',
        'Tắm gội mỗi ngày.',
        'Rửa tay TRƯỚC khi ăn và SAU khi đi vệ sinh.',
        'Cắt móng tay, móng chân thường xuyên.',
        'Quần áo thay sạch hằng ngày.',
      ] },
      { h: 'Phòng bệnh' },
      { ul: [
        'Đeo khẩu trang khi cảm cúm.',
        'Tiêm vaccine đầy đủ.',
        'Tránh xa người đang bệnh.',
        'Ăn chín, uống sôi.',
      ] },
      { note: 'Rửa tay đúng cách = 6 bước trong ít nhất 20 giây.' },
    ],
    examples: [
      { q: 'Khi nào nhất định phải rửa tay?', a: 'Trước khi ăn và sau khi đi vệ sinh.' },
      { q: 'Bạn cùng lớp bị cảm cúm, em làm gì?', a: 'Đeo khẩu trang, giữ khoảng cách, rửa tay thường xuyên.' },
    ],
  },

  'P3TNXH-w30-quiz': {
    topic: 'Trái Đất – hình cầu, các châu lục, đại dương',
    intro: 'Chúng ta đang sống trên một hành tinh kì diệu — Trái Đất. Cùng cô khám phá nó nhé!',
    objectives: [
      'Biết Trái Đất hình cầu.',
      'Biết tên các châu lục và đại dương.',
    ],
    theory: [
      { h: 'Hình dạng Trái Đất' },
      { p: 'Trái Đất có hình GẦN TRÒN (hình cầu, hơi dẹt ở hai cực). Bề mặt gồm các lục địa và biển/đại dương.' },
      { h: '6 châu lục' },
      { ul: ['Châu Á (lớn nhất, có Việt Nam).', 'Châu Âu.', 'Châu Phi.', 'Châu Mỹ (Bắc Mỹ + Nam Mỹ).', 'Châu Đại Dương.', 'Châu Nam Cực.'] },
      { h: '4 đại dương' },
      { p: 'Thái Bình Dương (lớn nhất), Đại Tây Dương, Ấn Độ Dương, Bắc Băng Dương.' },
      { note: 'Việt Nam nằm ở Đông Nam Á, giáp biển Đông (thuộc Thái Bình Dương).' },
    ],
    examples: [
      { q: 'Trái Đất có hình gì?', a: 'Hình cầu (gần tròn).' },
      { q: 'Việt Nam thuộc châu lục nào?', a: 'Châu Á.' },
    ],
  },

  'P3TNXH-w31-quiz': {
    topic: 'Mặt Trời, Mặt Trăng & các mùa',
    intro: 'Mặt Trời và Mặt Trăng là hai người bạn của Trái Đất. Cô dạy các em vì sao có ngày – đêm và các mùa.',
    objectives: [
      'Hiểu vì sao có ngày và đêm.',
      'Biết 4 mùa và sự khác nhau giữa các mùa.',
    ],
    theory: [
      { h: 'Ngày và đêm' },
      { p: 'Trái Đất TỰ QUAY quanh mình một vòng = 24 giờ. Phía hướng Mặt Trời = BAN NGÀY; phía ngược = BAN ĐÊM.' },
      { h: '4 mùa' },
      { ul: [
        'Trái Đất QUAY quanh Mặt Trời 1 vòng = 1 năm.',
        'Do trục Trái Đất nghiêng → mỗi vùng có 4 mùa: XUÂN, HẠ, THU, ĐÔNG.',
        'Việt Nam: miền Bắc có 4 mùa rõ; miền Nam có 2 mùa (mưa – khô).',
      ] },
      { h: 'Mặt Trăng' },
      { p: 'Mặt Trăng quay quanh Trái Đất, đổi hình từ trăng tròn đến lưỡi liềm trong 1 tháng âm lịch.' },
      { note: 'Trăng không tự phát sáng — ta thấy trăng vì nó phản chiếu ánh sáng Mặt Trời.' },
    ],
    examples: [
      { q: 'Vì sao có ngày và đêm?', a: 'Vì Trái Đất tự quay quanh mình; phía nào quay về Mặt Trời thì là ban ngày.' },
      { q: 'Trái Đất quay quanh Mặt Trời mất bao lâu?', a: '1 năm (khoảng 365 ngày).' },
    ],
  },

  'P3TNXH-w32-quiz': {
    topic: 'Phương hướng & la bàn',
    intro: 'Biết phương hướng giúp em không bị lạc. Cô dạy các em 4 hướng chính và cách dùng LA BÀN!',
    objectives: [
      'Biết 4 hướng chính.',
      'Sử dụng la bàn cơ bản.',
    ],
    theory: [
      { h: '4 hướng' },
      { p: 'BẮC – NAM – ĐÔNG – TÂY. Mặt Trời mọc hướng ĐÔNG, lặn hướng TÂY.' },
      { h: 'La bàn' },
      { ul: [
        'Kim la bàn (kim NAM CHÂM) luôn chỉ về hướng BẮC.',
        'Đặt la bàn nằm ngang, đợi kim ổn định rồi đọc.',
        'Tránh để gần kim loại hoặc nam châm khác.',
      ] },
      { h: 'Cách xác định nhanh' },
      { p: 'Buổi sáng đứng quay mặt về Mặt Trời → trước mặt là ĐÔNG, sau là TÂY, tay trái là BẮC, tay phải là NAM.' },
      { note: 'Hướng còn dùng để vẽ bản đồ — Bắc thường ở trên cùng.' },
    ],
    examples: [
      { q: 'Mặt Trời mọc hướng nào?', a: 'Hướng Đông.' },
      { q: 'Kim la bàn chỉ về đâu?', a: 'Hướng Bắc.' },
    ],
  },

  'P3TNXH-w33-quiz': {
    topic: 'Không khí và nước',
    intro: 'Không khí và nước là 2 thứ KHÔNG THỂ THIẾU cho sự sống. Cùng cô tìm hiểu nhé!',
    objectives: [
      'Biết vai trò của không khí và nước.',
      'Biết bảo vệ nguồn nước và không khí.',
    ],
    theory: [
      { h: 'Không khí' },
      { ul: [
        'Bao quanh Trái Đất, KHÔNG MÀU – KHÔNG MÙI – KHÔNG VỊ.',
        'Chứa OXY (cho hô hấp), nitơ, cacbonic.',
        'Tất cả sinh vật đều cần không khí.',
      ] },
      { h: 'Nước' },
      { ul: [
        'Có 3 thể: rắn (đá), lỏng (nước), khí (hơi).',
        'Vòng tuần hoàn: bốc hơi → mây → mưa → sông biển.',
        'Nước SẠCH dùng để uống, sinh hoạt.',
      ] },
      { h: 'Bảo vệ' },
      { p: 'Không vứt rác xuống sông biển. Tiết kiệm nước. Trồng cây xanh để giữ không khí trong lành.' },
      { note: 'Không khí ô nhiễm gây bệnh hô hấp; nước ô nhiễm gây bệnh tiêu hoá.' },
    ],
    examples: [
      { q: 'Khí nào trong không khí giúp ta thở?', a: 'Khí oxy.' },
      { q: 'Nước có thể tồn tại ở mấy thể?', a: '3 thể: rắn, lỏng, khí.' },
    ],
  },

  'P3TNXH-w34-quiz': {
    topic: 'Đất và bảo vệ môi trường',
    intro: 'Đất nuôi cây, cây nuôi ta. Bảo vệ đất chính là bảo vệ chính mình!',
    objectives: [
      'Biết vai trò của đất.',
      'Hiểu cần bảo vệ môi trường đất.',
    ],
    theory: [
      { h: 'Vai trò của đất' },
      { ul: [
        'Nơi cây cối mọc lên, cho hoa quả lương thực.',
        'Nơi sinh sống của giun, kiến, các vi sinh vật.',
        'Nguyên liệu xây dựng (đất sét, cát).',
      ] },
      { h: 'Bảo vệ đất và môi trường' },
      { ul: [
        'Không vứt rác bừa bãi.',
        'Phân loại rác trước khi vứt.',
        'Trồng cây gây rừng, không chặt phá rừng.',
        'Sử dụng phân hữu cơ thay vì hoá học quá nhiều.',
        'Tiết kiệm điện, nước, giấy (= bảo vệ rừng).',
      ] },
      { note: 'Mỗi hành động nhỏ của em hôm nay góp phần cứu Trái Đất ngày mai.' },
    ],
    examples: [
      { q: 'Vì sao phải trồng nhiều cây xanh?', a: 'Giữ đất khỏi xói mòn, cung cấp oxy, làm mát môi trường.' },
      { q: 'Phân loại rác giúp gì?', a: 'Tái chế được nhiều rác, giảm ô nhiễm đất và môi trường.' },
    ],
  },

  'P3TNXH-w35-quiz': {
    topic: 'Ôn tập cuối năm',
    intro: 'Một năm TNXH thật thú vị sắp khép lại. Cùng cô tổng kết và chuẩn bị cho mùa hè khám phá nhé!',
    objectives: [
      'Hệ thống kiến thức TNXH cả năm.',
      'Vận dụng kiến thức vào cuộc sống.',
    ],
    theory: [
      { h: 'Trọng tâm cả năm' },
      { ul: [
        'Gia đình & cộng đồng: họ hàng, cơ quan, lễ hội.',
        'An toàn: cháy, điện, giao thông, đuối nước, xâm hại.',
        'Thực vật: cấu tạo, rễ, thân, nhu cầu sống.',
        'Động vật: phân loại, ích lợi, môi trường sống.',
        'Cơ thể người: tuần hoàn, tiêu hoá, vệ sinh.',
        'Trái Đất: hình cầu, châu lục, mùa, không khí, nước, đất.',
      ] },
      { h: 'Lời nhắn của cô' },
      { p: 'Hè này hãy ra ngoài quan sát thiên nhiên, đọc thêm sách khoa học, đi du lịch cùng gia đình — đó cũng là cách học TNXH tuyệt vời nhất.' },
      { note: 'Chúc các em mùa hè vui vẻ và sẵn sàng cho Lớp 4 với nhiều khám phá mới!' },
    ],
    examples: [
      { q: 'Kể 2 việc em làm để bảo vệ môi trường.', a: 'Không vứt rác bừa bãi; tiết kiệm nước; trồng cây; phân loại rác.' },
      { q: 'Số điện thoại cấp cứu y tế?', a: '115.' },
    ],
  },

  'P3TNXH-w36-quiz': {
    topic: 'Kết thúc Lớp 3 — Tự nhiên và Xã hội: Hành trang vào Lớp 4',
    intro: 'Chào mừng em đã hoàn thành môn Tự nhiên và Xã hội Lớp 3! Cả năm nay chúng ta đã cùng nhau khám phá con người, sức khoẻ, xã hội và thiên nhiên. Hôm nay cùng ôn lại và hướng tới những khám phá mới nhé!',
    objectives: [
      'Tổng kết kiến thức ba chủ đề lớn của TNXH Lớp 3.',
      'Biết những gì thú vị sẽ học ở Khoa học và Lịch sử - Địa lý Lớp 4.',
      'Thêm yêu thiên nhiên và xã hội xung quanh em.',
    ],
    theory: [
      { h: 'Ba chủ đề lớn em đã khám phá' },
      { ul: [
        'CON NGƯỜI VÀ SỨC KHOẺ: Cơ quan hô hấp, tuần hoàn, thần kinh; vệ sinh cá nhân; phòng bệnh; an toàn giao thông và trong cuộc sống.',
        'XÃ HỘI: Gia đình, trường học, cuộc sống địa phương; cộng đồng và các hoạt động xã hội; an toàn trực tuyến cơ bản.',
        'TỰ NHIÊN: Thực vật và động vật (đặc điểm, phân loại); bầu trời ban ngày và ban đêm; bốn mùa; bề mặt trái đất; môi trường và bảo vệ môi trường.',
      ] },
      { h: 'Lên Lớp 4, em sẽ học' },
      { ul: [
        'KHOA HỌC: Vật chất và năng lượng; sự sống; Trái đất và bầu trời — sâu hơn, rộng hơn.',
        'LỊCH SỬ VÀ ĐỊA LÝ: Lịch sử dân tộc Việt Nam; địa hình các vùng miền; bản đồ Việt Nam.',
        'Hai môn riêng thay cho TNXH — nhiều điều thú vị đang chờ đón!',
      ] },
      { h: 'Em đã trưởng thành hơn' },
      { p: 'Qua năm học, em biết giữ gìn sức khoẻ, sống an toàn, yêu thiên nhiên và tôn trọng mọi người xung quanh. Đó là những giá trị em mang theo suốt cuộc đời!' },
      { note: 'Hè này hãy quan sát thiên nhiên quanh em — cây cối, côn trùng, bầu trời — và ghi vào nhật ký khám phá nhé!' },
    ],
    examples: [
      { q: 'Nêu 3 việc cần làm để bảo vệ cơ quan hô hấp.', a: 'Không hút thuốc lá; đeo khẩu trang khi ô nhiễm; vệ sinh mũi họng; không ở gần người đang hút thuốc.' },
      { q: 'Kể tên 2 loại động vật có vú và 2 loài côn trùng.', a: 'Động vật có vú: chó, mèo (hoặc bò, ngựa). Côn trùng: bướm, ong (hoặc kiến, muỗi).' },
    ],
  },
};
