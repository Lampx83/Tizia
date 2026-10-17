// ============================================================
// Lớp 1 · TỰ NHIÊN VÀ XÃ HỘI — Lý thuyết + Ví dụ 35 tuần (GDPT 2018)
// Key TRÙNG id quiz: "P1TNXH-wNN-quiz".
// Ba mạch nội dung: Gia đình – Trường học – Cộng đồng;
// Con người và sức khoẻ; Thực vật – Động vật – Tự nhiên.
// ============================================================

export const P1TNXH_LESSONS = {
  // ──────────────── HK1 ────────────────
  'P1TNXH-w01-quiz': {
    topic: 'Gia đình của em',
    intro: 'Các em ơi, gia đình là nơi ấm áp nhất. Tuần đầu tiên cô trò mình cùng kể về gia đình thân yêu nhé!',
    objectives: [
      'Kể được các thành viên trong gia đình.',
      'Biết yêu thương ông bà, bố mẹ, anh chị em.',
    ],
    theory: [
      { h: 'Gia đình có ai?' },
      { p: 'Gia đình thường có ông bà, bố, mẹ, anh, chị, em. Mọi người sống cùng nhau, yêu thương và chăm sóc lẫn nhau.' },
      { h: 'Em làm gì để gia đình vui?' },
      { ul: [
        'Chào ông bà, bố mẹ khi đi học và khi về.',
        'Nghe lời người lớn, yêu thương em nhỏ.',
        'Tự dọn đồ chơi, gấp chăn của mình.',
      ] },
      { note: 'Gia đình là nơi em luôn được yêu thương và an toàn.' },
    ],
    examples: [
      { q: 'Trong gia đình em có những ai?', a: 'Em có thể kể: ông, bà, bố, mẹ, anh/chị, em — mỗi nhà mỗi khác, nhưng đều yêu thương nhau.' },
      { q: 'Em làm gì khi đi học về?', a: 'Em chào ông bà, bố mẹ và cất cặp sách đúng chỗ.' },
    ],
  },

  'P1TNXH-w02-quiz': {
    topic: 'Đồ dùng trong nhà',
    intro: 'Trong nhà mình có rất nhiều đồ dùng. Hôm nay cô trò mình cùng gọi tên chúng nhé!',
    objectives: [
      'Kể tên một số đồ dùng quen thuộc trong nhà.',
      'Biết dùng đồ vật đúng công dụng và cẩn thận.',
    ],
    theory: [
      { h: 'Một số đồ dùng quen thuộc' },
      { ul: [
        'Phòng khách: bàn ghế, ti vi, đồng hồ.',
        'Phòng ngủ: giường, gối, chăn, tủ quần áo.',
        'Bếp: nồi, chảo, bát, đũa, bếp ga.',
        'Phòng tắm: vòi nước, xô, khăn, bàn chải đánh răng.',
      ] },
      { h: 'Dùng đồ cẩn thận' },
      { p: 'Đồ dễ vỡ như bát, cốc thuỷ tinh em phải cầm nhẹ. Đồ điện như ti vi, quạt em không tự cắm điện một mình.' },
      { note: 'Đồ dùng đúng chỗ giúp nhà gọn gàng và an toàn.' },
    ],
    examples: [
      { q: 'Em kể 3 đồ dùng trong bếp nhà em.', a: 'Ví dụ: nồi, bát, đũa (hoặc bếp ga, chảo, thìa).' },
      { q: 'Cốc thuỷ tinh em phải cầm thế nào?', a: 'Cầm bằng hai tay, nhẹ nhàng để không bị rơi vỡ.' },
    ],
  },

  'P1TNXH-w03-quiz': {
    topic: 'Công việc nhà em làm được',
    intro: 'Em đã lớn rồi, cùng giúp bố mẹ những việc nhỏ trong nhà nhé!',
    objectives: [
      'Kể được những việc nhà phù hợp với HS lớp 1.',
      'Biết tự giác giúp đỡ bố mẹ.',
    ],
    theory: [
      { h: 'Việc lớp 1 làm được' },
      { ul: [
        'Gấp chăn, gấp quần áo của mình.',
        'Cất đồ chơi, sách vở sau khi dùng.',
        'Tưới cây, cho cá ăn.',
        'Lau bàn, sắp xếp dép ngay ngắn.',
      ] },
      { h: 'Việc cần người lớn giúp' },
      { p: 'Nấu cơm, dùng dao kéo, bê đồ nặng, cắm điện — em chưa làm một mình được. Em nhờ bố mẹ làm cùng nhé.' },
      { note: 'Tự giác làm việc nhỏ giúp em ngày càng ngoan và giỏi.' },
    ],
    examples: [
      { q: 'Em kể 2 việc nhà em làm được.', a: 'Ví dụ: gấp chăn của mình và cất đồ chơi sau khi chơi xong.' },
      { q: 'Em có nên tự dùng dao gọt trái cây không?', a: 'Chưa nên — dao sắc nguy hiểm. Em nhờ bố mẹ giúp.' },
    ],
  },

  'P1TNXH-w04-quiz': {
    topic: 'An toàn ở nhà (1) — Tránh điện, lửa',
    intro: 'Điện và lửa rất hữu ích nhưng cũng rất nguy hiểm. Mình học cách phòng tránh nhé các em!',
    objectives: [
      'Biết các nguy cơ từ điện và lửa.',
      'Biết quy tắc an toàn cơ bản.',
    ],
    theory: [
      { h: 'Phòng tránh tai nạn điện' },
      { ul: [
        'Không thò ngón tay hoặc vật kim loại vào ổ điện.',
        'Không cắm điện khi tay ướt.',
        'Không kéo dây điện hoặc nghịch dây sạc.',
      ] },
      { h: 'Phòng tránh tai nạn lửa' },
      { ul: [
        'Không tự bật bếp ga, bếp lửa.',
        'Không nghịch diêm, bật lửa, nến đang cháy.',
        'Thấy có khói lạ phải báo người lớn ngay.',
      ] },
      { note: 'Khi xảy ra cháy, em chạy ra ngoài và gọi 114 (cứu hoả).' },
    ],
    examples: [
      { q: 'Em thấy ổ cắm điện hở, em làm gì?', a: 'Em tránh xa và báo bố mẹ — không thò tay hay vật nhọn vào.' },
      { q: 'Số gọi cứu hoả là số mấy?', a: 'Số 114 — gọi khi có cháy.' },
    ],
  },

  'P1TNXH-w05-quiz': {
    topic: 'An toàn ở nhà (2) — Tránh ngộ độc, té ngã',
    intro: 'Trong nhà còn có những nguy hiểm khác như thuốc và té ngã. Mình cùng học cách tránh nhé!',
    objectives: [
      'Biết không tự ý uống thuốc.',
      'Biết phòng tránh té ngã trong nhà.',
    ],
    theory: [
      { h: 'Tránh ngộ độc' },
      { ul: [
        'Không tự ý uống thuốc khi không có người lớn.',
        'Không uống nước trong chai lạ, không có nhãn.',
        'Không ăn quả, lá cây không biết rõ.',
      ] },
      { h: 'Tránh té ngã' },
      { ul: [
        'Không leo trèo lên bàn ghế, ban công.',
        'Đi cầu thang phải vịn tay vịn, đi từng bước.',
        'Lau khô sàn nhà ướt để không bị trượt.',
      ] },
      { note: 'Số gọi cấp cứu y tế là 115. Khi bị thương phải báo người lớn ngay.' },
    ],
    examples: [
      { q: 'Em thấy lọ thuốc đẹp như kẹo, có nên uống thử không?', a: 'KHÔNG! Thuốc không phải kẹo. Em chỉ uống khi bố mẹ cho.' },
      { q: 'Đi cầu thang em phải làm gì?', a: 'Vịn tay vào lan can, đi từng bước, không chạy nhảy.' },
    ],
  },

  'P1TNXH-w06-quiz': {
    topic: 'Lớp học của em',
    intro: 'Lớp học là ngôi nhà thứ hai của em. Cô trò mình cùng tìm hiểu về lớp học nhé!',
    objectives: [
      'Kể được các đồ vật và thành viên trong lớp học.',
      'Biết giữ gìn lớp học sạch đẹp.',
    ],
    theory: [
      { h: 'Trong lớp có gì?' },
      { p: 'Lớp học có bảng, bàn ghế, sách vở, tranh ảnh, cô giáo và các bạn. Lớp em là ngôi nhà thứ hai — nơi em học và chơi cùng các bạn.' },
      { h: 'Em làm gì cho lớp đẹp?' },
      { ul: [
        'Vứt rác đúng nơi quy định.',
        'Không vẽ bậy lên tường, bàn ghế.',
        'Sắp xếp bàn ghế ngay ngắn.',
        'Tưới cây, lau bảng giúp cô.',
      ] },
      { note: 'Lớp sạch — học vui. Lớp gọn — bạn vui.' },
    ],
    examples: [
      { q: 'Em kể 3 đồ vật trong lớp.', a: 'Ví dụ: bảng đen, bàn ghế, sách vở (hoặc đồng hồ, tranh treo tường, tủ sách).' },
      { q: 'Thấy bạn vẽ bậy lên bàn, em làm gì?', a: 'Em khuyên bạn không vẽ và báo cô giáo nếu cần.' },
    ],
  },

  'P1TNXH-w07-quiz': {
    topic: 'Đồ dùng học tập',
    intro: 'Cặp sách của em có những gì nào? Mình cùng kể tên và học cách giữ gìn đồ dùng học tập nhé!',
    objectives: [
      'Kể tên đồ dùng học tập.',
      'Biết bảo quản sách vở, bút thước.',
    ],
    theory: [
      { h: 'Đồ dùng học tập gồm' },
      { ul: [
        'Sách giáo khoa, vở viết.',
        'Bút chì, bút mực, tẩy.',
        'Thước kẻ, hộp bút, cặp sách.',
        'Hộp màu, kéo, hồ dán.',
      ] },
      { h: 'Giữ gìn thế nào?' },
      { p: 'Sách vở bọc bìa, dán nhãn rõ ràng. Viết xong cất bút vào hộp. Không xé sách, không cắn bút.' },
      { note: 'Đồ dùng giữ tốt sẽ dùng được lâu, em không phải xin bố mẹ mua mới.' },
    ],
    examples: [
      { q: 'Bút chì viết xong em làm gì?', a: 'Em cất bút vào hộp, không để rơi xuống đất bị gãy ngòi.' },
      { q: 'Em có nên xé sách giáo khoa làm máy bay không?', a: 'Không nên — sách phải giữ sạch để học lâu dài.' },
    ],
  },

  'P1TNXH-w08-quiz': {
    topic: 'An toàn ở trường',
    intro: 'Ở trường vui lắm, nhưng cũng phải biết giữ an toàn nhé các em!',
    objectives: [
      'Biết các nguy cơ ở trường: chạy nhảy, cầu thang, đồ vật sắc.',
      'Biết quy tắc chơi an toàn.',
    ],
    theory: [
      { h: 'Chơi an toàn' },
      { ul: [
        'Không chạy nhảy trong hành lang.',
        'Không leo trèo lên lan can, cửa sổ.',
        'Không đùa nghịch ở cầu thang.',
        'Không mang vật sắc nhọn đến trường.',
      ] },
      { h: 'Khi bị thương' },
      { p: 'Em báo ngay cô giáo hoặc bác bảo vệ để được giúp đỡ.' },
      { note: 'Chơi vui là chơi an toàn — không ai bị đau.' },
    ],
    examples: [
      { q: 'Em thấy bạn leo lên lan can, em làm gì?', a: 'Em khuyên bạn xuống và báo cô giáo — lan can rất nguy hiểm.' },
      { q: 'Em bị ngã trầy đầu gối, em làm gì?', a: 'Em báo cô giáo để cô rửa vết thương và sát trùng.' },
    ],
  },

  'P1TNXH-w09-quiz': {
    topic: 'Bạn bè trong lớp',
    intro: 'Lớp em có rất nhiều bạn. Mình học cách chơi với bạn cho thật vui nhé!',
    objectives: [
      'Biết tên và đặc điểm các bạn trong lớp.',
      'Biết cách chia sẻ, giúp đỡ bạn.',
    ],
    theory: [
      { h: 'Bạn bè là ai?' },
      { p: 'Bạn là người cùng học, cùng chơi với em ở lớp. Mỗi bạn có sở thích khác nhau — bạn thích vẽ, bạn thích bóng đá.' },
      { h: 'Cách chơi với bạn' },
      { ul: [
        'Chia sẻ đồ chơi, sách vở.',
        'Không tranh giành, không bắt nạt bạn.',
        'Giúp bạn khi bạn gặp khó khăn.',
        'Nói lời cảm ơn và xin lỗi đúng lúc.',
      ] },
      { note: 'Bạn bè đoàn kết thì lớp học mới vui.' },
    ],
    examples: [
      { q: 'Bạn quên bút, em có 2 bút, em làm gì?', a: 'Em cho bạn mượn 1 cây bút để bạn cùng học.' },
      { q: 'Bạn ngã, em làm gì?', a: 'Em đỡ bạn dậy, hỏi thăm và báo cô nếu bạn bị đau.' },
    ],
  },

  'P1TNXH-w10-quiz': {
    topic: 'An toàn khi tham gia giao thông (1)',
    intro: 'Trên đường đi học có nhiều xe cộ. Mình học luật giao thông cơ bản nhé!',
    objectives: [
      'Biết đi bên phải, đi trên vỉa hè.',
      'Biết ý nghĩa đèn tín hiệu giao thông.',
    ],
    theory: [
      { h: 'Quy tắc đi bộ' },
      { ul: [
        'Đi trên vỉa hè, sát bên phải.',
        'Qua đường phải đi đúng vạch dành cho người đi bộ.',
        'Khi qua đường: nhìn trái – nhìn phải – nhìn trái.',
      ] },
      { h: 'Đèn tín hiệu' },
      { p: 'Đèn đỏ: dừng lại. Đèn vàng: chuẩn bị. Đèn xanh: được đi.' },
      { note: 'Đi xe máy phải đội mũ bảo hiểm — kể cả em ngồi sau bố mẹ.' },
    ],
    examples: [
      { q: 'Đèn đỏ bật, em đang đi qua đường, làm gì?', a: 'Em dừng lại và đợi đèn xanh mới đi tiếp.' },
      { q: 'Đi bộ em đi ở đâu?', a: 'Đi trên vỉa hè, sát bên phải — không đi dưới lòng đường.' },
    ],
  },

  'P1TNXH-w11-quiz': {
    topic: 'An toàn khi tham gia giao thông (2)',
    intro: 'Mình học tiếp về việc ngồi xe an toàn nhé!',
    objectives: [
      'Biết đội mũ bảo hiểm khi ngồi xe máy.',
      'Biết ngồi yên trên xe, không đùa nghịch.',
    ],
    theory: [
      { h: 'Ngồi xe máy an toàn' },
      { ul: [
        'Luôn đội mũ bảo hiểm, cài quai chắc.',
        'Ngồi ngay ngắn, hai tay ôm eo người lớn.',
        'Không thò chân, thò tay ra ngoài.',
      ] },
      { h: 'Ngồi ô tô an toàn' },
      { ul: [
        'Thắt dây an toàn.',
        'Không mở cửa khi xe đang chạy.',
        'Không thò đầu ra ngoài cửa sổ.',
      ] },
      { note: 'An toàn giao thông là hạnh phúc của mọi nhà.' },
    ],
    examples: [
      { q: 'Đi xe máy em phải đội gì?', a: 'Mũ bảo hiểm, cài quai chắc dưới cằm.' },
      { q: 'Ngồi ô tô đi xa, em phải làm gì?', a: 'Thắt dây an toàn và ngồi yên — không nghịch cửa xe.' },
    ],
  },

  'P1TNXH-w12-quiz': {
    topic: 'Nơi em sống',
    intro: 'Nhà em ở đâu nhỉ? Trong phố, ở quê, hay ở chung cư? Mình cùng kể về nơi mình sống nhé!',
    objectives: [
      'Biết địa chỉ nhà mình.',
      'Phân biệt thành phố, nông thôn.',
    ],
    theory: [
      { h: 'Em sống ở đâu?' },
      { p: 'Nơi em sống có thể là thành phố (nhiều nhà cao tầng, xe cộ đông) hoặc nông thôn (nhiều cây xanh, ruộng vườn). Mỗi nơi đều có nét đẹp riêng.' },
      { h: 'Em nhớ địa chỉ' },
      { ul: [
        'Số nhà — tên đường/ngõ.',
        'Tên phường/xã — quận/huyện — tỉnh/thành phố.',
        'Số điện thoại bố mẹ (nếu nhớ được).',
      ] },
      { note: 'Nhớ địa chỉ và số điện thoại bố mẹ giúp em được giúp đỡ khi đi lạc.' },
    ],
    examples: [
      { q: 'Em sống ở thành phố hay nông thôn?', a: 'Em tự kể: ví dụ "Em sống ở thành phố Hà Nội, ở chung cư X."' },
      { q: 'Đi lạc em làm gì?', a: 'Em tìm chú công an hoặc người lớn tin cậy, nói tên và địa chỉ nhà.' },
    ],
  },

  'P1TNXH-w13-quiz': {
    topic: 'Một số nghề trong cộng đồng',
    intro: 'Quanh em có rất nhiều cô chú làm các nghề khác nhau. Mình cùng tìm hiểu nhé!',
    objectives: [
      'Kể tên một số nghề quen thuộc.',
      'Biết tôn trọng người lao động.',
    ],
    theory: [
      { h: 'Một số nghề quanh em' },
      { ul: [
        'Bác sĩ: khám và chữa bệnh.',
        'Cô giáo, thầy giáo: dạy học.',
        'Chú công an: giữ trật tự, bảo vệ mọi người.',
        'Bác nông dân: trồng lúa, trồng rau.',
        'Cô bán hàng, bác thợ xây, bác đưa thư…',
      ] },
      { h: 'Tôn trọng người lao động' },
      { p: 'Mỗi nghề đều có ích cho cộng đồng. Em phải biết cảm ơn, chào hỏi lễ phép với các cô chú lao động.' },
      { note: 'Lớn lên em muốn làm nghề gì? Nghề nào cũng quý nếu em làm bằng cả tấm lòng.' },
    ],
    examples: [
      { q: 'Ai chữa bệnh cho em khi em ốm?', a: 'Bác sĩ — bác sĩ làm việc ở bệnh viện và phòng khám.' },
      { q: 'Ai trồng ra hạt gạo cho em ăn?', a: 'Bác nông dân — bác làm việc ngoài ruộng đồng.' },
    ],
  },

  'P1TNXH-w14-quiz': {
    topic: 'Các bộ phận bên ngoài cơ thể (1)',
    intro: 'Cơ thể em có rất nhiều bộ phận tuyệt vời. Mình cùng tìm hiểu nhé!',
    objectives: [
      'Biết các bộ phận chính: đầu, mình, tay, chân.',
      'Biết các giác quan: mắt, tai, mũi, lưỡi, da.',
    ],
    theory: [
      { h: 'Các phần chính của cơ thể' },
      { p: 'Cơ thể có 3 phần chính: đầu — mình — tay chân. Mỗi bộ phận đều có vai trò riêng.' },
      { h: '5 giác quan' },
      { ul: [
        'Mắt để nhìn.',
        'Tai để nghe.',
        'Mũi để ngửi.',
        'Lưỡi để nếm.',
        'Da để cảm nhận nóng – lạnh – mềm – cứng.',
      ] },
      { note: 'Mất một giác quan sẽ rất khó khăn — em phải biết quý cơ thể mình.' },
    ],
    examples: [
      { q: 'Em dùng bộ phận nào để nghe cô giảng?', a: 'Tai — tai là cơ quan dùng để nghe.' },
      { q: 'Em ngửi mùi thơm bằng gì?', a: 'Mũi — mũi để ngửi mùi.' },
    ],
  },

  'P1TNXH-w15-quiz': {
    topic: 'Các bộ phận bên ngoài cơ thể (2)',
    intro: 'Tuần này mình tìm hiểu sâu hơn về tay, chân và cách chăm sóc cơ thể nhé!',
    objectives: [
      'Biết chức năng của tay, chân.',
      'Biết một số cách chăm sóc cơ thể.',
    ],
    theory: [
      { h: 'Tay và chân' },
      { ul: [
        'Tay: cầm, viết, xúc cơm, vẽ tranh.',
        'Chân: đi, chạy, nhảy, đá bóng.',
        'Em có 10 ngón tay và 10 ngón chân.',
      ] },
      { h: 'Chăm sóc cơ thể' },
      { p: 'Cắt móng tay móng chân thường xuyên. Rửa tay sạch trước khi ăn. Đi giày dép phù hợp để không đau chân.' },
      { note: 'Cơ thể khoẻ mạnh là tài sản quý nhất của em.' },
    ],
    examples: [
      { q: 'Em đếm xem mình có bao nhiêu ngón tay?', a: '10 ngón — 5 ngón tay phải và 5 ngón tay trái.' },
      { q: 'Trước khi ăn em phải làm gì?', a: 'Rửa tay sạch bằng xà phòng để không bị bệnh.' },
    ],
  },

  'P1TNXH-w16-quiz': {
    topic: 'Giữ vệ sinh thân thể',
    intro: 'Giữ thân thể sạch sẽ là cách yêu bản thân. Mình cùng học các thói quen tốt nhé!',
    objectives: [
      'Biết các việc giữ vệ sinh cá nhân hàng ngày.',
      'Biết tự làm các việc đơn giản.',
    ],
    theory: [
      { h: 'Hàng ngày em phải' },
      { ul: [
        'Đánh răng sáng và tối — đánh đủ 2 phút.',
        'Rửa mặt mỗi sáng.',
        'Tắm gội thường xuyên.',
        'Cắt móng tay sạch sẽ.',
        'Thay quần áo sạch mỗi ngày.',
      ] },
      { h: 'Rửa tay 5 thời điểm' },
      { p: 'Trước khi ăn — sau khi đi vệ sinh — sau khi chơi — sau khi sờ con vật — khi tay bẩn.' },
      { note: 'Sạch sẽ giúp em không bị bệnh và được mọi người yêu quý.' },
    ],
    examples: [
      { q: 'Em đánh răng mấy lần một ngày?', a: 'Ít nhất 2 lần: buổi sáng và buổi tối trước khi đi ngủ.' },
      { q: 'Em vừa chơi với chó mèo, em làm gì?', a: 'Rửa tay bằng xà phòng — đó là 1 trong 5 thời điểm vàng phải rửa tay.' },
    ],
  },

  'P1TNXH-w17-quiz': {
    topic: 'Ăn uống lành mạnh, an toàn',
    intro: 'Ăn ngon mà phải an toàn nữa! Mình học cách ăn uống đúng cách nhé!',
    objectives: [
      'Biết ăn đa dạng, đủ chất.',
      'Biết các thói quen ăn uống an toàn.',
    ],
    theory: [
      { h: 'Ăn đủ chất' },
      { p: 'Mỗi bữa em nên ăn: cơm/cháo — thịt/cá/trứng — rau xanh — trái cây. Uống đủ nước mỗi ngày.' },
      { h: 'Ăn uống an toàn' },
      { ul: [
        'Rửa tay sạch trước khi ăn.',
        'Ăn chín, uống sôi.',
        'Không ăn quà rong không rõ nguồn gốc.',
        'Nhai kỹ, không nói chuyện khi ăn để khỏi sặc.',
      ] },
      { note: 'Hạn chế bánh kẹo, nước ngọt — dễ sâu răng và béo phì.' },
    ],
    examples: [
      { q: 'Bữa cơm nên có những món gì?', a: 'Có cơm, thịt hoặc cá, rau xanh và trái cây tráng miệng.' },
      { q: 'Em uống nước thế nào là tốt?', a: 'Nước đun sôi để nguội, uống đủ — không uống nước ngọt quá nhiều.' },
    ],
  },

  'P1TNXH-w18-quiz': {
    topic: 'Ôn tập HK1',
    intro: 'Học kỳ 1 sắp hết rồi. Mình cùng ôn lại những điều đã học nhé các em!',
    objectives: [
      'Hệ thống lại các chủ đề: gia đình, lớp học, an toàn, cơ thể.',
      'Vận dụng vào tình huống cụ thể.',
    ],
    theory: [
      { h: 'Gia đình và lớp học' },
      { p: 'Gia đình có ông bà, bố mẹ, anh chị em. Lớp học có cô giáo và các bạn. Cả hai đều là nơi em được yêu thương.' },
      { h: 'An toàn' },
      { ul: [
        'Ở nhà: không nghịch điện, lửa, thuốc.',
        'Ở trường: không chạy nhảy, leo trèo.',
        'Giao thông: đèn đỏ dừng, đèn xanh đi, đội mũ bảo hiểm.',
      ] },
      { h: 'Cơ thể' },
      { p: '3 phần: đầu — mình — tay chân. 5 giác quan: mắt, tai, mũi, lưỡi, da. Giữ vệ sinh và ăn uống lành mạnh.' },
      { note: 'Một bạn nhỏ ngoan biết yêu thương gia đình, bạn bè và giữ an toàn cho mình.' },
    ],
    examples: [
      { q: 'Kể 3 việc em đã làm để giúp gia đình?', a: 'Ví dụ: gấp chăn, cất đồ chơi, tưới cây.' },
      { q: 'Đèn vàng giao thông nghĩa là gì?', a: 'Chuẩn bị — sắp chuyển sang đèn đỏ, phải giảm tốc độ.' },
    ],
  },

  // ──────────────── HK2 ────────────────
  'P1TNXH-w19-quiz': {
    topic: 'Cây xanh quanh em',
    intro: 'Quanh em có rất nhiều cây xanh xinh đẹp. Cây cho gì cho chúng ta nhỉ?',
    objectives: [
      'Biết các bộ phận của cây.',
      'Biết lợi ích của cây xanh và cách chăm sóc.',
    ],
    theory: [
      { h: 'Cây có những bộ phận nào?' },
      { ul: [
        'Rễ: ở dưới đất, hút nước và dinh dưỡng.',
        'Thân: nâng đỡ cây, dẫn nhựa.',
        'Lá: nhận ánh sáng, làm thức ăn cho cây.',
        'Hoa và quả: tạo hạt giống cho cây mới.',
      ] },
      { h: 'Cây có lợi gì?' },
      { p: 'Cây cho bóng mát, làm sạch không khí, cho gỗ, hoa, trái cây. Cây còn là nhà của chim, sóc.' },
      { note: 'Em yêu cây thì cây cho em không khí trong lành mỗi ngày.' },
    ],
    examples: [
      { q: 'Cây hút nước bằng bộ phận nào?', a: 'Rễ — rễ cắm xuống đất để hút nước và chất dinh dưỡng.' },
      { q: 'Em kể 2 lợi ích của cây xanh.', a: 'Cho bóng mát và làm không khí trong lành (hoặc cho gỗ, trái cây).' },
    ],
  },

  'P1TNXH-w20-quiz': {
    topic: 'Một số loại rau và quả',
    intro: 'Rau và quả ngon, bổ và rất nhiều màu sắc. Mình học tên các loại rau và quả quen thuộc nhé!',
    objectives: [
      'Kể tên một số loại rau, quả thường gặp.',
      'Biết lợi ích của rau, quả với sức khoẻ.',
    ],
    theory: [
      { h: 'Một số loại rau' },
      { ul: [
        'Rau ăn lá: rau muống, rau cải, xà lách.',
        'Rau ăn củ: cà rốt, khoai tây, củ cải.',
        'Rau ăn quả: cà chua, bí đỏ, dưa chuột.',
      ] },
      { h: 'Một số loại quả' },
      { p: 'Chuối, cam, táo, xoài, ổi, dưa hấu, nho… Mỗi loại có vị và màu sắc riêng.' },
      { note: 'Ăn nhiều rau quả giúp em đẹp da, sáng mắt, không bị táo bón.' },
    ],
    examples: [
      { q: 'Cà rốt là rau ăn gì?', a: 'Rau ăn củ — phần ăn được là củ cà rốt màu cam.' },
      { q: 'Quả nào màu vàng và dài cong?', a: 'Quả chuối — chuối có nhiều vitamin tốt cho sức khoẻ.' },
    ],
  },

  'P1TNXH-w21-quiz': {
    topic: 'Một số con vật quen thuộc (1)',
    intro: 'Có những con vật sống cùng chúng ta trong nhà, trong làng. Mình học tên chúng nhé!',
    objectives: [
      'Kể tên một số con vật nuôi quen thuộc.',
      'Biết lợi ích của các con vật.',
    ],
    theory: [
      { h: 'Con vật nuôi' },
      { ul: [
        'Chó: giữ nhà, bạn thân của con người.',
        'Mèo: bắt chuột, gần gũi với em.',
        'Gà, vịt: cho trứng và thịt.',
        'Bò, lợn: cho thịt và sữa.',
        'Cá: nuôi để cảnh hoặc để ăn.',
      ] },
      { h: 'Yêu thương con vật' },
      { p: 'Cho con vật ăn, vuốt ve nhẹ nhàng. Không ném đá, không trêu chọc, không bỏ đói chúng.' },
      { note: 'Sau khi sờ chó mèo phải rửa tay sạch nhé.' },
    ],
    examples: [
      { q: 'Con vật nào hay bắt chuột?', a: 'Con mèo — mèo bắt chuột rất giỏi.' },
      { q: 'Sau khi chơi với chó, em làm gì?', a: 'Rửa tay sạch bằng xà phòng để không bị bệnh.' },
    ],
  },

  'P1TNXH-w22-quiz': {
    topic: 'Tết Nguyên Đán quê em',
    intro: 'Tết về rồi! Tết quê em có gì vui nào? Mình cùng kể nhé!',
    objectives: [
      'Biết một số phong tục Tết.',
      'Biết các món ăn, hoa đặc trưng ngày Tết.',
    ],
    theory: [
      { h: 'Tết có gì đặc biệt?' },
      { ul: [
        'Hoa đào (miền Bắc), hoa mai (miền Nam).',
        'Bánh chưng, bánh tét, mứt Tết, hạt dưa.',
        'Lì xì đỏ may mắn cho trẻ em.',
        'Đi chúc Tết ông bà, người thân.',
      ] },
      { h: 'Em làm gì ngày Tết?' },
      { p: 'Em mặc đẹp, chúc Tết người lớn, không cãi nhau, không khóc nhè. Nhận lì xì biết nói "Cháu cảm ơn".' },
      { note: 'Tết là dịp gia đình quây quần, em được nghỉ học và đi chơi với bố mẹ.' },
    ],
    examples: [
      { q: 'Miền Bắc Tết có hoa gì?', a: 'Hoa đào — màu hồng rất đẹp, tượng trưng cho Tết miền Bắc.' },
      { q: 'Nhận lì xì em nói gì?', a: '"Cháu cảm ơn ông/bà/cô/chú ạ!" — và chúc Tết người lớn.' },
    ],
  },

  'P1TNXH-w23-quiz': {
    topic: 'Con vật nuôi và con vật hoang dã',
    intro: 'Có con vật sống cùng người, có con vật sống tự do trong rừng. Mình phân biệt nhé!',
    objectives: [
      'Phân biệt con vật nuôi và con vật hoang dã.',
      'Biết bảo vệ động vật hoang dã.',
    ],
    theory: [
      { h: 'Con vật nuôi' },
      { p: 'Sống cùng người, được người chăm sóc: chó, mèo, bò, gà, vịt, lợn.' },
      { h: 'Con vật hoang dã' },
      { p: 'Sống tự do trong rừng, sông, biển: hổ, voi, khỉ, hươu, cá voi.' },
      { ul: [
        'Không bắt, không nuôi nhốt vật hoang dã.',
        'Không ăn thịt thú rừng.',
        'Bảo vệ rừng để vật hoang dã có nhà.',
      ] },
      { note: 'Nhiều con vật hoang dã đang bị tuyệt chủng — em phải biết yêu và bảo vệ chúng.' },
    ],
    examples: [
      { q: 'Hổ sống ở đâu?', a: 'Trong rừng — hổ là vật hoang dã, không nuôi trong nhà.' },
      { q: 'Con chó là vật nuôi hay vật hoang dã?', a: 'Vật nuôi — chó sống cùng người và được chăm sóc.' },
    ],
  },

  'P1TNXH-w24-quiz': {
    topic: 'Bốn mùa trong năm',
    intro: 'Một năm có 4 mùa thật đẹp: xuân, hạ, thu, đông. Mình cùng tìm hiểu nhé!',
    objectives: [
      'Biết tên 4 mùa và đặc điểm chính.',
      'Biết mặc quần áo phù hợp mỗi mùa.',
    ],
    theory: [
      { h: '4 mùa' },
      { ul: [
        'Xuân: ấm áp, cây đâm chồi, hoa nở.',
        'Hạ (mùa hè): nóng, có mưa rào, ve kêu.',
        'Thu: mát, lá vàng rơi, trời cao trong.',
        'Đông: lạnh, có thể có gió rét (miền Bắc).',
      ] },
      { h: 'Mặc quần áo phù hợp' },
      { p: 'Mùa hè: áo thun mỏng, nón. Mùa đông: áo ấm, khăn quàng, mũ len.' },
      { note: 'Miền Nam Việt Nam thường chỉ có 2 mùa: mùa mưa và mùa khô.' },
    ],
    examples: [
      { q: 'Mùa nào lá rụng nhiều?', a: 'Mùa thu — lá vàng rơi rất đẹp.' },
      { q: 'Mùa đông em mặc gì?', a: 'Áo ấm, có thể thêm khăn quàng, mũ len và găng tay.' },
    ],
  },

  'P1TNXH-w25-quiz': {
    topic: 'Thời tiết hôm nay',
    intro: 'Sáng nay trời thế nào nhỉ? Mình học cách quan sát thời tiết nhé các em!',
    objectives: [
      'Quan sát và mô tả thời tiết.',
      'Biết chuẩn bị phù hợp với thời tiết.',
    ],
    theory: [
      { h: 'Các kiểu thời tiết' },
      { ul: [
        'Nắng: trời xanh, có ánh nắng.',
        'Mưa: có mây đen, nước rơi.',
        'Gió: cây lay, mát.',
        'Bão: gió mạnh, mưa to — phải ở trong nhà.',
      ] },
      { h: 'Chuẩn bị phù hợp' },
      { p: 'Trời nắng to: đội nón, uống nước. Trời mưa: mang áo mưa, ô. Trời lạnh: mặc áo ấm.' },
      { note: 'Xem dự báo thời tiết để chuẩn bị đúng cho ngày hôm sau.' },
    ],
    examples: [
      { q: 'Trời sắp mưa em mang gì khi đi học?', a: 'Áo mưa hoặc ô để không bị ướt.' },
      { q: 'Trời nắng to em làm gì?', a: 'Đội nón, uống nhiều nước, hạn chế chạy nhảy ngoài nắng.' },
    ],
  },

  'P1TNXH-w26-quiz': {
    topic: 'Mặt Trời và ban ngày',
    intro: 'Mặt Trời chiếu sáng cho cả thế giới mỗi ngày. Mình cùng tìm hiểu về Mặt Trời nhé!',
    objectives: [
      'Biết Mặt Trời là nguồn sáng và nhiệt.',
      'Biết tác dụng và cần tránh nắng gắt.',
    ],
    theory: [
      { h: 'Mặt Trời là gì?' },
      { p: 'Mặt Trời là một ngôi sao rất to và rất nóng, cách Trái Đất rất xa. Mặt Trời cho ánh sáng và hơi ấm.' },
      { h: 'Lợi ích và lưu ý' },
      { ul: [
        'Mặt Trời giúp cây xanh phát triển.',
        'Ánh nắng buổi sáng giúp em hấp thu vitamin D.',
        'Nắng gắt giữa trưa rất hại — không nhìn thẳng vào Mặt Trời.',
      ] },
      { note: 'Buổi sáng tắm nắng 10-15 phút giúp xương chắc khoẻ.' },
    ],
    examples: [
      { q: 'Mặt Trời cho chúng ta điều gì?', a: 'Ánh sáng và hơi ấm — giúp cây xanh sống và sưởi ấm Trái Đất.' },
      { q: 'Em có nên nhìn thẳng vào Mặt Trời không?', a: 'Không — sẽ hại mắt nặng. Mặt Trời rất sáng.' },
    ],
  },

  'P1TNXH-w27-quiz': {
    topic: 'Mặt Trăng và ban đêm',
    intro: 'Đêm xuống, Mặt Trăng sáng vằng vặc. Mình cùng tìm hiểu về Mặt Trăng nhé!',
    objectives: [
      'Biết Mặt Trăng xuất hiện ban đêm.',
      'Biết các pha của Mặt Trăng: trăng tròn, trăng khuyết.',
    ],
    theory: [
      { h: 'Mặt Trăng' },
      { p: 'Mặt Trăng là vệ tinh của Trái Đất. Mặt Trăng không tự phát sáng mà phản chiếu ánh sáng Mặt Trời.' },
      { h: 'Hình dáng Mặt Trăng' },
      { ul: [
        'Trăng tròn: tròn vành vạnh, thường vào đêm rằm (15 âm lịch).',
        'Trăng khuyết: hình lưỡi liềm.',
        'Có đêm không thấy trăng — trăng non.',
      ] },
      { note: 'Tết Trung thu (rằm tháng 8) trăng tròn nhất và đẹp nhất trong năm.' },
    ],
    examples: [
      { q: 'Mặt Trăng có tự phát sáng không?', a: 'Không — Mặt Trăng phản chiếu ánh sáng Mặt Trời nên trông thấy sáng.' },
      { q: 'Đêm rằm em thấy trăng thế nào?', a: 'Trăng tròn vành vạnh, sáng rất đẹp.' },
    ],
  },

  'P1TNXH-w28-quiz': {
    topic: 'Ngày và đêm',
    intro: 'Vì sao có ngày có đêm? Mình cùng tìm hiểu hiện tượng quen thuộc này nhé!',
    objectives: [
      'Biết ngày là khi có Mặt Trời, đêm là khi không có.',
      'Hiểu Trái Đất tự quay tạo ra ngày đêm.',
    ],
    theory: [
      { h: 'Ngày và đêm' },
      { p: 'Trái Đất tự quay quanh mình giống như con quay. Nửa Trái Đất hướng về Mặt Trời thì có ngày, nửa kia thì có đêm.' },
      { h: 'Em làm gì lúc nào?' },
      { ul: [
        'Ban ngày: học tập, làm việc, chơi.',
        'Ban đêm: ngủ để cơ thể nghỉ ngơi.',
        'HS lớp 1 nên ngủ 9-10 tiếng/đêm.',
      ] },
      { note: 'Ngủ sớm, ngủ đủ giấc giúp em thông minh và mau lớn.' },
    ],
    examples: [
      { q: 'Vì sao có ngày và đêm?', a: 'Vì Trái Đất tự quay — nửa hướng Mặt Trời có ngày, nửa kia có đêm.' },
      { q: 'Em ngủ vào ban nào?', a: 'Ban đêm — ngủ đủ 9-10 tiếng để khoẻ và mau lớn.' },
    ],
  },

  'P1TNXH-w29-quiz': {
    topic: 'Nước trong cuộc sống',
    intro: 'Nước rất quý — không có nước là không có sự sống! Mình học cách dùng nước nhé!',
    objectives: [
      'Biết các vai trò của nước.',
      'Biết tiết kiệm nước.',
    ],
    theory: [
      { h: 'Nước dùng để làm gì?' },
      { ul: [
        'Uống, nấu ăn.',
        'Tắm gội, rửa tay.',
        'Tưới cây, rửa xe, lau nhà.',
        'Sinh vật (cá, cây) cần nước để sống.',
      ] },
      { h: 'Tiết kiệm nước' },
      { p: 'Khoá vòi khi đánh răng, không xả nước phí. Sửa vòi rò ngay. Tận dụng nước rửa rau để tưới cây.' },
      { note: 'Có nhiều nơi rất thiếu nước — em phải biết quý từng giọt nước.' },
    ],
    examples: [
      { q: 'Em đánh răng em làm gì để tiết kiệm nước?', a: 'Khoá vòi khi đánh răng, chỉ mở khi cần rửa.' },
      { q: 'Vì sao phải tiết kiệm nước?', a: 'Vì nước rất quý — nhiều nơi không có đủ nước sạch để dùng.' },
    ],
  },

  'P1TNXH-w30-quiz': {
    topic: 'Giữ vệ sinh môi trường',
    intro: 'Môi trường sạch là môi trường khoẻ. Mình học cách giữ môi trường sạch đẹp nhé!',
    objectives: [
      'Biết các việc giữ vệ sinh môi trường.',
      'Biết phân loại rác đơn giản.',
    ],
    theory: [
      { h: 'Giữ vệ sinh thế nào?' },
      { ul: [
        'Vứt rác đúng nơi quy định.',
        'Không khạc nhổ bừa bãi.',
        'Không vẽ bậy lên tường công cộng.',
        'Trồng và chăm sóc cây xanh.',
      ] },
      { h: 'Phân loại rác đơn giản' },
      { p: 'Rác hữu cơ (vỏ trái cây, lá cây) — Rác tái chế (chai nhựa, giấy) — Rác khác. Phân loại giúp xử lý dễ hơn.' },
      { note: 'Môi trường sạch — sức khoẻ tốt. Em nhỏ vứt đúng nơi quy định là yêu môi trường.' },
    ],
    examples: [
      { q: 'Ăn xong vỏ chuối em vứt vào đâu?', a: 'Thùng rác — không vứt ra đường, đặc biệt không vứt xuống sông hồ.' },
      { q: 'Chai nhựa thuộc loại rác gì?', a: 'Rác tái chế — có thể tái sử dụng để làm sản phẩm mới.' },
    ],
  },

  'P1TNXH-w31-quiz': {
    topic: 'Phòng tránh muỗi, côn trùng',
    intro: 'Muỗi đốt vừa ngứa vừa có thể gây bệnh. Mình học cách phòng muỗi nhé!',
    objectives: [
      'Biết tác hại của muỗi.',
      'Biết các cách phòng tránh muỗi và côn trùng.',
    ],
    theory: [
      { h: 'Muỗi có hại gì?' },
      { p: 'Muỗi đốt gây ngứa và có thể truyền bệnh sốt xuất huyết, sốt rét. Côn trùng như ong, kiến cũng có thể đốt em.' },
      { h: 'Phòng tránh thế nào?' },
      { ul: [
        'Ngủ trong màn (mùng).',
        'Mặc quần áo dài tay khi trời tối.',
        'Đậy kín các vật chứa nước (vại, lu).',
        'Không để ao tù, nước đọng quanh nhà.',
        'Không chọc tổ ong, tổ kiến.',
      ] },
      { note: 'Bị côn trùng đốt nhiều hoặc dị ứng phải báo người lớn ngay.' },
    ],
    examples: [
      { q: 'Vì sao phải ngủ trong màn?', a: 'Để muỗi không đốt — tránh ngứa và tránh bệnh sốt xuất huyết.' },
      { q: 'Em thấy tổ ong, em làm gì?', a: 'Tránh xa và báo người lớn — không chọc phá kẻo bị ong đốt.' },
    ],
  },

  'P1TNXH-w32-quiz': {
    topic: 'Khi bị ốm',
    intro: 'Đôi khi em bị ốm: sốt, ho, đau bụng. Mình học cách chăm sóc nhé!',
    objectives: [
      'Biết một số dấu hiệu khi bị ốm.',
      'Biết phải báo người lớn và đi khám bác sĩ.',
    ],
    theory: [
      { h: 'Dấu hiệu ốm' },
      { ul: [
        'Sốt: người nóng, mệt.',
        'Ho, sổ mũi: bị cảm.',
        'Đau bụng, buồn nôn.',
        'Đau đầu, chóng mặt.',
      ] },
      { h: 'Khi bị ốm em làm gì?' },
      { p: 'Báo bố mẹ ngay. Uống nhiều nước. Nghỉ ngơi. Đi khám bác sĩ và uống thuốc đúng liều bác sĩ dặn.' },
      { note: 'TUYỆT ĐỐI không tự uống thuốc khi không có người lớn — rất nguy hiểm.' },
    ],
    examples: [
      { q: 'Em thấy người nóng và mệt, em làm gì?', a: 'Báo bố mẹ ngay — có thể em đang bị sốt cần đo nhiệt độ.' },
      { q: 'Em có nên tự uống thuốc cảm khi thấy hơi ho không?', a: 'Không — phải hỏi bố mẹ hoặc bác sĩ trước khi uống.' },
    ],
  },

  'P1TNXH-w33-quiz': {
    topic: 'Trang phục phù hợp',
    intro: 'Mỗi hoàn cảnh có quần áo riêng. Mình học cách chọn trang phục phù hợp nhé!',
    objectives: [
      'Biết chọn quần áo phù hợp với thời tiết.',
      'Biết trang phục phù hợp với hoàn cảnh.',
    ],
    theory: [
      { h: 'Theo thời tiết' },
      { ul: [
        'Nóng: áo mỏng, thoáng, sáng màu.',
        'Lạnh: áo ấm, khăn, mũ len.',
        'Mưa: áo mưa, ủng.',
      ] },
      { h: 'Theo hoàn cảnh' },
      { ul: [
        'Đi học: đồng phục gọn gàng.',
        'Đi chơi: quần áo thoải mái.',
        'Đi dự lễ: quần áo lịch sự, sạch sẽ.',
        'Tập thể dục: quần áo dễ vận động.',
      ] },
      { note: 'Quần áo gọn gàng, sạch sẽ giúp em tự tin và được mọi người quý mến.' },
    ],
    examples: [
      { q: 'Trời lạnh em mặc gì đi học?', a: 'Đồng phục bên trong, áo ấm bên ngoài, có thể thêm khăn quàng.' },
      { q: 'Đi tập thể dục em mặc gì?', a: 'Quần áo thể thao thoải mái, đi giày — không mặc váy đầm.' },
    ],
  },

  'P1TNXH-w34-quiz': {
    topic: 'Hoạt động ngoài trời và vận động',
    intro: 'Vận động giúp em khoẻ và vui. Mình học các hoạt động ngoài trời nhé!',
    objectives: [
      'Biết lợi ích của vận động ngoài trời.',
      'Biết các trò chơi an toàn.',
    ],
    theory: [
      { h: 'Lợi ích của vận động' },
      { p: 'Vận động giúp cơ thể khoẻ mạnh, mau lớn, ăn ngon, ngủ say và đầu óc minh mẫn.' },
      { h: 'Một số hoạt động' },
      { ul: [
        'Đi bộ, chạy, nhảy dây.',
        'Đá bóng, đạp xe (đội mũ bảo hiểm).',
        'Bơi (có người lớn trông coi).',
        'Trồng cây, tưới cây trong vườn.',
      ] },
      { note: 'Mỗi ngày nên vận động ít nhất 60 phút — em vừa khoẻ vừa vui.' },
    ],
    examples: [
      { q: 'Em kể 2 hoạt động ngoài trời em thích.', a: 'Ví dụ: nhảy dây, đá bóng (hoặc đi xe đạp, bơi).' },
      { q: 'Đi bơi em phải có ai bên cạnh?', a: 'Người lớn — không tự đi bơi một mình vì rất nguy hiểm.' },
    ],
  },

  'P1TNXH-w35-quiz': {
    topic: 'Ôn tập cuối năm',
    intro: 'Một năm học sắp kết thúc. Mình cùng ôn lại tất cả những điều đã học nhé!',
    objectives: [
      'Hệ thống toàn bộ chủ đề trong năm.',
      'Vận dụng kiến thức vào cuộc sống hàng ngày.',
    ],
    theory: [
      { h: 'Gia đình – Trường học – Cộng đồng' },
      { p: 'Em biết yêu thương gia đình, giúp đỡ bố mẹ. Đến trường lễ phép với cô, đoàn kết với bạn. Tôn trọng các cô chú lao động.' },
      { h: 'Con người và sức khoẻ' },
      { ul: [
        '5 giác quan, các bộ phận cơ thể.',
        'Giữ vệ sinh: rửa tay, đánh răng, tắm gội.',
        'Ăn uống đủ chất, uống nhiều nước.',
        'Vận động hàng ngày.',
      ] },
      { h: 'Thực vật – Động vật – Tự nhiên' },
      { ul: [
        'Cây xanh, rau quả, các con vật.',
        '4 mùa, thời tiết, Mặt Trời, Mặt Trăng, ngày đêm.',
        'Bảo vệ môi trường, tiết kiệm nước.',
      ] },
      { h: 'An toàn' },
      { p: 'Ở nhà, ở trường, khi tham gia giao thông — luôn cẩn thận và biết tự bảo vệ mình.' },
      { note: 'Em đã lớn hơn rất nhiều! Lên Lớp 2 mình sẽ học thêm nhiều điều thú vị nữa.' },
    ],
    examples: [
      { q: 'Một ngày em nên làm gì để khoẻ?', a: 'Đánh răng, rửa tay, ăn đủ bữa, vận động, ngủ đủ giấc.' },
      { q: 'Em kể 3 điều em làm được để bảo vệ môi trường?', a: 'Vứt rác đúng chỗ, tiết kiệm nước, trồng/chăm cây xanh.' },
    ],
  },

  'P1TNXH-w36-quiz': {
    topic: 'Kết thúc Lớp 1 — Tổng kết Tự nhiên và Xã hội',
    intro: 'Cả năm em đã học về bản thân, gia đình, trường học và thiên nhiên. Giỏi lắm! Cô cùng em nhìn lại nhé.',
    objectives: [
      'Nhớ lại những kiến thức TNXH quan trọng của Lớp 1.',
      'Áp dụng vào cuộc sống hàng ngày.',
    ],
    theory: [
      { h: 'Bản thân em' },
      { ul: ['Cơ thể có các giác quan: mắt thấy, tai nghe, mũi ngửi, lưỡi nếm, tay sờ.', 'Giữ vệ sinh: đánh răng, rửa tay, tắm gội.', 'An toàn: không ra đường một mình, tránh vật sắc nhọn.'] },
      { h: 'Gia đình và trường học' },
      { ul: ['Gia đình là nơi em được yêu thương. Hãy yêu quý và giúp đỡ ông bà, bố mẹ.', 'Trường học là nơi em học và có bạn bè. Hãy ngoan ngoãn và giúp đỡ bạn.'] },
      { h: 'Thiên nhiên quanh em' },
      { ul: ['Cây xanh, nước sạch và không khí trong lành rất quý.', 'Bảo vệ môi trường: không xả rác, tiết kiệm nước, yêu thiên nhiên.'] },
      { note: 'Lên Lớp 2 em sẽ học thêm về xã hội và tự nhiên rộng lớn hơn. Hãy luôn tò mò nhé!' },
    ],
    examples: [
      { q: 'Giác quan nào giúp em nhận biết màu sắc?', a: 'Mắt (thị giác).' },
      { q: 'Em làm gì để bảo vệ thiên nhiên?', a: 'Vứt rác đúng nơi, không hái hoa bẻ cành, tiết kiệm nước, chăm cây.' },
    ],
  },
};
