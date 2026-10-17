// ============================================================
// Lớp 4 · Công nghệ — LÝ THUYẾT + VÍ DỤ cho 35 tuần (GDPT 2018)
// Key TRÙNG id quiz: "P4CN-wNN-quiz".
// ============================================================

export const P4CN_LESSONS = {
  // ──────────────── HK1 ────────────────
  'P4CN-w01-quiz': {
    topic: 'Công nghệ và đời sống',
    intro: 'Các em ơi, công nghệ ở quanh em mỗi ngày: quạt điện, đèn pin, xe đạp đều là sản phẩm công nghệ. Cô sẽ giúp em hiểu khái niệm và mặt trái của công nghệ.',
    objectives: [
      'Em hiểu công nghệ là gì.',
      'Em nhận biết các sản phẩm công nghệ quen thuộc.',
      'Em biết công nghệ có cả lợi và mặt trái.',
    ],
    theory: [
      { h: 'Công nghệ là gì?' },
      { p: 'Công nghệ là cách con người ứng dụng khoa học vào đời sống để tạo ra sản phẩm phục vụ con người.' },
      { h: 'Lợi ích và mặt trái' },
      { ul: [
        'Lợi: cuộc sống tiện nghi hơn — đèn điện thay đèn dầu, máy giặt đỡ tay.',
        'Mặt trái: gây ô nhiễm, làm con người lệ thuộc thiết bị.',
      ] },
      { note: 'Dùng công nghệ có trách nhiệm — tận dụng cái tốt, hạn chế cái xấu.' },
    ],
    examples: [
      { q: 'Quạt điện, đèn pin, xe đạp có phải sản phẩm công nghệ?', a: 'Có. Đều do con người ứng dụng khoa học để chế tạo, phục vụ đời sống. Khác với đá, cây cối là tự nhiên.' },
      { q: 'Em dùng điện thoại quá nhiều có hại gì?', a: 'Hỏng mắt, lười vận động, mất tập trung học. Em nên dùng có giới hạn — công nghệ phục vụ em, không phải em phục vụ công nghệ.' },
    ],
  },

  'P4CN-w02-quiz': {
    topic: 'Hoa và cây cảnh',
    intro: 'Các em ạ, hoa và cây cảnh làm nhà em đẹp và không khí trong lành. Cô sẽ chỉ vài cây dễ trồng và cách chăm sóc.',
    objectives: [
      'Em biết lợi ích của hoa và cây cảnh.',
      'Em biết các cây dễ trồng trong nhà.',
      'Em biết chăm sóc hoa cắt cành.',
    ],
    theory: [
      { h: 'Lợi ích cây cảnh' },
      { ul: [
        'Trang trí, tạo không gian xanh.',
        'Lọc bụi, làm không khí trong lành.',
        'Tạo cảm giác thư giãn.',
      ] },
      { h: 'Cây dễ trồng' },
      { p: 'Sen đá, lưỡi hổ, trầu bà là những cây nhỏ, dễ chăm, phù hợp trong nhà.' },
      { h: 'Hoa cắt cành' },
      { ul: [
        'Thay nước mỗi ngày hoặc cách ngày.',
        'Cắt vát gốc (nghiêng 45°) để dễ hút nước.',
      ] },
      { note: 'Tưới nước và ánh sáng vừa đủ — tưới ngập sẽ úng rễ.' },
    ],
    examples: [
      { q: 'Cây cảnh nào dễ trồng trong nhà?', a: 'Sen đá, lưỡi hổ, trầu bà — nhỏ, ít cần nước, sống tốt trong nhà có ánh sáng vừa.' },
      { q: 'Hoa cắt cành cắm bình nhanh héo, em làm sao?', a: 'Em thay nước thường xuyên và cắt vát gốc nghiêng 45° để gốc dễ hút nước, hoa tươi lâu hơn.' },
    ],
  },

  'P4CN-w03-quiz': {
    topic: 'Trồng hoa trong chậu',
    intro: 'Các em ơi, trồng hoa trong chậu là một thực hành thú vị. Em cần đất tốt, gieo đúng độ sâu và tưới đúng giờ.',
    objectives: [
      'Em biết đất tốt phải tơi xốp, giàu dinh dưỡng.',
      'Em biết gieo hạt nông và tưới ẩm.',
      'Em biết thời điểm tưới nước trong ngày.',
    ],
    theory: [
      { h: 'Đất và gieo hạt' },
      { ul: [
        'Đất tơi xốp, giàu dinh dưỡng giúp rễ phát triển.',
        'Gieo hạt nông (lấp đất 0,5–1 cm) — vùi quá sâu hạt khó nảy.',
        'Tưới ẩm sau khi gieo, không tưới ngập.',
      ] },
      { h: 'Tỉa thưa' },
      { p: 'Khi hạt mọc nhiều cây con, em tỉa bớt cho cây còn lại có không gian phát triển.' },
      { note: 'Tưới tốt nhất vào sáng sớm hoặc chiều mát — tránh trưa nắng làm bốc hơi nhanh.' },
    ],
    examples: [
      { q: 'Đất tốt để trồng hoa có đặc điểm gì?', a: 'Tơi xốp và giàu dinh dưỡng. Đất sét cứng hoặc cát biển mặn đều không trồng được hoa.' },
      { q: 'Em tưới hoa lúc trưa nắng gắt, có nên không?', a: 'Không nên. Trưa nắng nước bốc hơi nhanh, hoa không kịp hấp thụ. Tưới sáng sớm hoặc chiều mát là tốt nhất.' },
    ],
  },

  'P4CN-w04-quiz': {
    topic: 'Chậu cây tự chế từ vật liệu tái chế',
    intro: 'Các em ạ, chai nhựa, lon, vỏ dừa đều có thể làm thành chậu cây. Vừa tiết kiệm vừa bảo vệ môi trường.',
    objectives: [
      'Em biết tận dụng vật liệu tái chế làm chậu.',
      'Em hiểu vì sao phải đục lỗ thoát nước.',
      'Em đảm bảo an toàn khi đục lỗ.',
    ],
    theory: [
      { h: 'Vật liệu tái chế' },
      { ul: [
        'Chai nhựa, lon, vỏ dừa — an toàn và dễ kiếm.',
        'Không dùng đồ điện hỏng, hộp pin (có chất độc), mảnh kính vỡ.',
      ] },
      { h: 'Đục lỗ thoát nước' },
      { p: 'Trước khi trồng, em đục vài lỗ nhỏ ở đáy chậu để nước thừa thoát ra — tránh úng rễ làm thối cây.' },
      { note: 'Đục lỗ cần có người lớn giúp. Không tự dùng dao nhọn hay đập bằng đá.' },
    ],
    examples: [
      { q: 'Vì sao chậu cây phải có lỗ thoát nước ở đáy?', a: 'Để nước thừa thoát ra, tránh úng rễ làm cây bị thối. Không có lỗ thoát, rễ sẽ chết ngộp.' },
      { q: 'Em muốn đục lỗ cho chai nhựa, làm sao an toàn?', a: 'Em nhờ người lớn giúp dùng đinh hơ nóng hoặc dụng cụ phù hợp. Không tự dùng dao nhọn — dễ đâm vào tay.' },
    ],
  },

  'P4CN-w05-quiz': {
    topic: 'Chăm sóc cây sau khi trồng',
    intro: 'Các em ơi, sau khi trồng, em cần biết tưới nước, bón phân và bắt sâu bệnh đúng cách. Quá nhiều hoặc quá ít đều không tốt.',
    objectives: [
      'Em biết dấu hiệu cây thiếu nước, thừa nước.',
      'Em biết bón phân đúng cách.',
      'Em biết bắt sâu bệnh an toàn.',
    ],
    theory: [
      { h: 'Tưới nước' },
      { ul: [
        'Thiếu nước: cây héo, vàng lá.',
        'Thừa nước: úng rễ, thối gốc, cây chết.',
        'Tưới khi mặt đất khô, lượng vừa đủ ẩm.',
      ] },
      { h: 'Bón phân và bắt sâu' },
      { p: 'Bón phân vừa đủ, đúng loại — không đổ ào ạt sát gốc. Sâu bệnh: bắt bằng tay hoặc nhờ người lớn, không phun thuốc bừa.' },
      { note: 'Cây cần "ăn vừa, uống vừa" như em vậy.' },
    ],
    examples: [
      { q: 'Cây em héo và lá vàng, có thể do đâu?', a: 'Có thể thiếu nước hoặc thừa nước. Em kiểm tra đất: khô là thiếu, ướt sũng là thừa. Điều chỉnh lại lượng nước.' },
      { q: 'Em thấy sâu trên cây cảnh, làm gì?', a: 'Em bắt bằng tay hoặc đũa nhỏ, nhờ người lớn nếu nhiều. Không tự phun thuốc bừa — có thể độc cho em và cây.' },
    ],
  },

  'P4CN-w06-quiz': {
    topic: 'Dụng cụ kỹ thuật cơ bản',
    intro: 'Các em ạ, mỗi dụng cụ có công dụng riêng. Dùng đúng dụng cụ thì việc dễ và an toàn.',
    objectives: [
      'Em biết công dụng của cờ-lê, búa, tua vít, thước.',
      'Em biết dùng dụng cụ đúng mục đích.',
      'Em giữ an toàn khi dùng dụng cụ.',
    ],
    theory: [
      { h: 'Các dụng cụ và công dụng' },
      { ul: [
        'Cờ-lê: vặn bu-lông, đai ốc.',
        'Búa: đóng đinh, nhổ đinh.',
        'Tua vít: bắt và tháo vít.',
        'Thước dây/thẳng: đo chiều dài.',
      ] },
      { h: 'Quy tắc dùng' },
      { p: 'Dụng cụ nào việc nấy. Không dùng búa để vặn ốc, không dùng tua vít để đóng đinh — sẽ hỏng dụng cụ và nguy hiểm.' },
      { note: 'Dùng xong cất gọn vào hộp đồ nghề.' },
    ],
    examples: [
      { q: 'Em muốn vặn một con bu-lông, dùng dụng cụ gì?', a: 'Dùng cờ-lê — dụng cụ chuyên để vặn bu-lông, đai ốc. Không dùng búa hay tua vít, không hiệu quả mà có thể hỏng ốc.' },
      { q: 'Dụng cụ để đo chiều dài là gì?', a: 'Thước dây hoặc thước thẳng. Mỗi loại phù hợp với độ dài khác nhau — thước dây cho khoảng dài, thước thẳng cho khoảng ngắn.' },
    ],
  },

  'P4CN-w07-quiz': {
    topic: 'An toàn lao động',
    intro: 'Các em ơi, an toàn lao động là quan trọng nhất khi làm thủ công. Cô sẽ chỉ những lưu ý để em không bị thương.',
    objectives: [
      'Em biết bảo hộ khi cưa, đóng đinh.',
      'Em biết sơ cứu vết đứt tay nhẹ.',
      'Em cất dụng cụ gọn gàng sau khi dùng.',
    ],
    theory: [
      { h: 'Khi làm việc nguy hiểm' },
      { ul: [
        'Cưa, đóng đinh: đeo kính bảo hộ, có người lớn giám sát.',
        'Mặc đồ gọn gàng, không lùng nhùng.',
        'Tóc dài: buộc gọn.',
      ] },
      { h: 'Sơ cứu vết đứt nhẹ' },
      { p: 'Rửa sạch bằng nước, băng lại bằng băng cá nhân, báo người lớn. Không liếm vết thương hay đắp đất.' },
      { note: 'Sau khi làm việc: cất dụng cụ đúng nơi, không để bừa.' },
    ],
    examples: [
      { q: 'Em định cưa miếng gỗ, cần chuẩn bị gì?', a: 'Đeo kính bảo hộ, có người lớn giám sát, mặc đồ gọn. Cưa là dụng cụ sắc — không tự làm một mình.' },
      { q: 'Em bị đứt nhẹ ngón tay khi gấp giấy, làm sao?', a: 'Em rửa vết thương bằng nước sạch, băng lại và báo người lớn. Vết nhỏ cũng cần xử lý để không nhiễm trùng.' },
    ],
  },

  'P4CN-w08-quiz': {
    topic: 'Đo và đánh dấu',
    intro: 'Các em ạ, đo và đánh dấu chính xác là bước đầu của thủ công. Sai một ly đi một dặm — đo cẩn thận sẽ giúp sản phẩm đẹp.',
    objectives: [
      'Em biết thước milimet đo chính xác đến 1 mm.',
      'Em đặt thước đúng cách, đọc thẳng vạch.',
      'Em dùng bút chì để đánh dấu.',
    ],
    theory: [
      { h: 'Cách đo' },
      { ul: [
        'Đặt mép thước trùng đầu vật cần đo.',
        'Mắt nhìn vuông góc vạch chia — không nghiêng đầu đọc lệch.',
        'Đo 2 lần để kiểm tra, tránh sai số.',
      ] },
      { h: 'Đánh dấu' },
      { p: 'Dùng bút chì hoặc mực mờ — dễ tẩy sửa nếu sai. Không dùng bút dạ vĩnh viễn lên sản phẩm chính.' },
      { note: 'Thước milimet đo chính xác đến 1 mm — vạch nhỏ nhất.' },
    ],
    examples: [
      { q: 'Vạch nhỏ nhất trên thước milimet là bao nhiêu?', a: '1 mm. Đó là độ chính xác cao nhất của thước milimet — đủ cho hầu hết việc thủ công.' },
      { q: 'Vì sao đánh dấu nên dùng bút chì?', a: 'Bút chì dễ tẩy sửa nếu em đánh sai. Bút dạ vĩnh viễn không tẩy được, sẽ làm hỏng sản phẩm nếu sai.' },
    ],
  },

  'P4CN-w09-quiz': {
    topic: 'Cắt – ghép vật liệu giấy/bìa',
    intro: 'Các em ơi, cắt và ghép giấy bìa là kỹ năng cơ bản. Em cần đúng dụng cụ và cẩn thận để an toàn.',
    objectives: [
      'Em biết dùng kéo lớn, dao rọc giấy với thớt.',
      'Em an toàn khi cắt bằng dao rọc giấy.',
      'Em biết chờ keo khô khi ghép.',
    ],
    theory: [
      { h: 'Cắt' },
      { ul: [
        'Cắt bìa: kéo lớn hoặc dao rọc giấy có thớt kê.',
        'Khi cắt bằng dao: dùng thước kê thẳng, kéo dao về phía mình thận trọng.',
        'Không cắt nhanh không nhìn — dễ đứt tay.',
      ] },
      { h: 'Ghép' },
      { p: 'Dùng keo hoặc băng dính. Chờ keo khô rồi mới sử dụng sản phẩm, không lay khi còn ướt.' },
      { note: 'Băng dính phổ biến cho ghép tạm, keo dán bền hơn.' },
    ],
    examples: [
      { q: 'Em cắt bìa dày bằng tay không có được không?', a: 'Không. Em dùng kéo lớn hoặc dao rọc giấy. Bìa dày tay không xé không đứt, dễ bị thương ở tay.' },
      { q: 'Em vừa dán keo xong, đã dùng được chưa?', a: 'Chưa. Em chờ keo khô (vài phút hoặc lâu hơn tùy loại) rồi mới dùng. Dùng khi còn ướt sẽ bung ra ngay.' },
    ],
  },

  'P4CN-w10-quiz': {
    topic: 'Lắp ghép mô hình – giới thiệu',
    intro: 'Các em ạ, bộ lắp ghép là tập hợp các chi tiết cơ khí. Em đọc kỹ hướng dẫn trước khi lắp.',
    objectives: [
      'Em biết các chi tiết trong bộ lắp ghép.',
      'Em đọc hướng dẫn và đếm chi tiết trước khi lắp.',
      'Em biết tháo và lắp lại khi sai.',
    ],
    theory: [
      { h: 'Bộ lắp ghép' },
      { p: 'Bao gồm các thanh, ốc, vít, bánh xe — các chi tiết cơ khí cơ bản. Có thể lắp thành xe, cầu, quạt…' },
      { h: 'Quy trình lắp' },
      { ul: [
        'Đọc hướng dẫn từ đầu đến cuối.',
        'Đếm chi tiết, kiểm tra đủ chưa.',
        'Lắp theo thứ tự, không bỏ bước.',
        'Lắp sai: tháo ra lắp lại, không cố ép.',
      ] },
      { note: 'Lắp xong em kiểm tra mô hình hoạt động được không.' },
    ],
    examples: [
      { q: 'Em lắp sai một chi tiết, mô hình không khít, em làm gì?', a: 'Em tháo ra và lắp lại đúng. Không cố ép — sẽ hỏng chi tiết, không vừa mãi.' },
      { q: 'Trước khi bắt đầu lắp, em làm gì?', a: 'Đọc kỹ hướng dẫn và đếm chi tiết. Đủ mới lắp, thiếu thì báo người lớn để bổ sung.' },
    ],
  },

  'P4CN-w11-quiz': {
    topic: 'Lắp mô hình xe đẩy',
    intro: 'Các em ơi, xe đẩy có bánh quay tự do quanh trục. Em sẽ học cách gắn bánh và làm xe đi thẳng.',
    objectives: [
      'Em biết bánh xe gắn vào trục.',
      'Em biết lắp hai bánh đối xứng cho xe đi thẳng.',
      'Em hiểu lực ma sát ảnh hưởng tới xe.',
    ],
    theory: [
      { h: 'Cách gắn bánh' },
      { ul: [
        'Bánh xe vào lỗ trục — trục cho bánh quay tự do.',
        'Không vít cứng vào trục — bánh sẽ không quay.',
        'Hai bánh cùng kích thước, lắp đối xứng để xe đi thẳng.',
      ] },
      { h: 'Ma sát' },
      { p: 'Giảm ma sát giữa bánh và trục (bôi trơn nhẹ) thì xe lăn dễ hơn, lực đẩy nhỏ cũng đi xa.' },
      { note: 'Bánh không quay được: kiểm tra trục có quá chật hay lỏng quá không.' },
    ],
    examples: [
      { q: 'Em lắp xong xe nhưng bánh không quay, vấn đề có thể là gì?', a: 'Trục có thể quá chật hoặc quá lỏng. Em kiểm tra và điều chỉnh để bánh quay tự do quanh trục.' },
      { q: 'Xe đẩy đi lệch sang một bên, do đâu?', a: 'Có thể hai bánh không cùng kích thước hoặc lắp lệch không đối xứng. Em điều chỉnh cho hai bánh đều nhau.' },
    ],
  },

  'P4CN-w12-quiz': {
    topic: 'Lắp mô hình cầu',
    intro: 'Các em ạ, cầu cần trụ vững và mặt cầu chắc. Hai bên có lan can để an toàn cho người đi.',
    objectives: [
      'Em biết cầu cần trụ vững và mặt cầu chắc.',
      'Em biết lan can là quan trọng cho an toàn.',
      'Em hiểu kết cấu tam giác giúp cầu vững.',
    ],
    theory: [
      { h: 'Cấu tạo cầu' },
      { ul: [
        'Trụ cầu: chịu lực, phải vững chắc.',
        'Mặt cầu: chắc, có lan can hai bên.',
        'Lan can: bảo vệ người đi qua, tránh ngã.',
      ] },
      { h: 'Kết cấu vững' },
      { p: 'Khi mô hình không chịu lực, em tăng số trụ hoặc dùng kết cấu tam giác — tam giác là hình vững nhất.' },
      { note: 'Các loại cầu nổi tiếng: cầu treo, cầu vòm, cầu dây văng.' },
    ],
    examples: [
      { q: 'Vì sao cầu phải có lan can?', a: 'Để bảo vệ người đi qua không bị ngã xuống. Cầu không lan can rất nguy hiểm, nhất là khi gió mạnh hoặc người đông.' },
      { q: 'Mô hình cầu của em không chịu được trọng lượng, làm sao?', a: 'Em tăng số trụ hoặc dùng thanh chéo tạo hình tam giác. Tam giác là kết cấu vững — kỹ sư dùng nhiều trong xây cầu.' },
    ],
  },

  'P4CN-w13-quiz': {
    topic: 'Lắp mô hình quạt giấy',
    intro: 'Các em ơi, quạt hoạt động nhờ cánh quay đẩy không khí. Em sẽ học cách lắp cánh nghiêng và cân bằng.',
    objectives: [
      'Em hiểu quạt đẩy không khí bằng cánh.',
      'Em biết cánh nghiêng đẩy không khí mạnh hơn.',
      'Em biết cân bằng cánh để quạt êm.',
    ],
    theory: [
      { h: 'Nguyên lý hoạt động' },
      { p: 'Cánh quạt quay đẩy không khí về phía trước, tạo gió. Số cánh thường 3–5.' },
      { h: 'Lắp cánh' },
      { ul: [
        'Cánh nghiêng một góc để đẩy không khí mạnh.',
        'Các cánh cùng kích thước, cùng góc — quạt cân bằng, êm.',
        'Cánh lệch: quạt rung lắc, mau hỏng.',
      ] },
      { note: 'Khi quạt rung lắc, kiểm tra lại cân bằng cánh.' },
    ],
    examples: [
      { q: 'Cánh quạt phẳng và cánh nghiêng, cái nào đẩy không khí mạnh hơn?', a: 'Cánh nghiêng. Góc nghiêng tạo lực đẩy không khí — giống cánh quạt cối xay gió. Cánh phẳng gần như không tạo gió.' },
      { q: 'Quạt em lắp xong cứ rung lắc, do đâu?', a: 'Các cánh không cân bằng — có thể khác kích thước, khác góc nghiêng hoặc gắn lệch. Em điều chỉnh cho đều.' },
    ],
  },

  'P4CN-w14-quiz': {
    topic: 'Ôn tập HKI',
    intro: 'Các em ạ, chúng ta ôn lại các nội dung HKI: dụng cụ, chậu cây, mô hình. Em xem lại để chuẩn bị kiểm tra.',
    objectives: [
      'Em ôn lại các dụng cụ và công dụng.',
      'Em nhớ lại nguyên tắc trồng cây.',
      'Em nhớ kết cấu cầu, kỹ thuật cắt ghép.',
    ],
    theory: [
      { h: 'Hệ thống nội dung' },
      { ul: [
        'Dụng cụ: cờ-lê (vặn ốc), búa (đinh), tua vít (vít), thước (đo).',
        'Trồng cây: đất tơi xốp, đục lỗ thoát nước, tưới sáng/chiều mát.',
        'Mặt cầu: chắc, lan can hai bên.',
        'Trang phục lao động: gọn gàng, tránh tai nạn.',
        'Cây cảnh trong nhà: lọc không khí, đẹp.',
      ] },
      { note: 'An toàn vẫn là quy tắc số 1.' },
    ],
    examples: [
      { q: 'Lỗ thoát nước ở chậu cây có tác dụng gì?', a: 'Tránh úng rễ. Nước thừa thoát ra, rễ không bị ngộp nước.' },
      { q: 'Trang phục khi làm thủ công nên thế nào?', a: 'Gọn gàng, không lùng nhùng — tránh vướng vào dụng cụ gây tai nạn.' },
    ],
  },

  'P4CN-w15-quiz': {
    topic: 'Kiểm tra HKI',
    intro: 'Các em ơi, hôm nay kiểm tra HKI. Em làm bài cẩn thận, vận dụng kiến thức đã học.',
    objectives: [
      'Em vận dụng kiến thức làm bài kiểm tra.',
      'Em nhớ các quy tắc an toàn.',
      'Em ghi nhớ nguyên lý cơ bản đã học.',
    ],
    theory: [
      { h: 'Các nội dung trọng tâm' },
      { ul: [
        'Cắt bìa: dùng kéo lớn hoặc dao rọc giấy có thớt.',
        'Cây thiếu nước: tưới vừa đủ, không đổ ngập.',
        'Xe lăn dễ: giảm ma sát giữa bánh và trục.',
        'Đo chính xác: vuông góc, đọc đúng vạch.',
      ] },
      { note: 'Đọc kỹ câu hỏi trước khi chọn đáp án.' },
    ],
    examples: [
      { q: 'Em muốn xe đồ chơi tự lăn dễ trên sàn, làm sao?', a: 'Giảm ma sát giữa bánh và trục — bôi trơn nhẹ, đảm bảo trục thẳng. Ma sát thấp xe lăn xa với lực đẩy nhỏ.' },
      { q: 'Khi đo chiều dài tờ giấy, em đặt thước thế nào?', a: 'Đặt mép thước trùng đầu giấy, vuông góc với cạnh cần đo, mắt nhìn thẳng vạch chia. Đo 2 lần kiểm tra.' },
    ],
  },

  'P4CN-w16-quiz': {
    topic: 'Máy tính cá nhân – giới thiệu',
    intro: 'Các em ạ, máy tính có 4 bộ phận chính: màn hình, bàn phím, chuột, thân máy. Em cần biết từng bộ phận làm gì.',
    objectives: [
      'Em biết 4 bộ phận chính của máy tính.',
      'Em hiểu CPU là bộ xử lý trung tâm.',
      'Em biết công dụng chuột và bàn phím.',
    ],
    theory: [
      { h: 'Bộ phận chính' },
      { ul: [
        'Màn hình: hiển thị thông tin.',
        'Bàn phím: nhập ký tự (chữ, số).',
        'Chuột: điều khiển con trỏ trên màn hình.',
        'Thân máy (CPU): bộ xử lý trung tâm — "bộ não" của máy tính.',
      ] },
      { h: 'CPU là gì?' },
      { p: 'CPU = Central Processing Unit = Bộ xử lý trung tâm. Tất cả phép tính và xử lý đều ở đây.' },
      { note: 'Mỗi bộ phận có vai trò riêng, không thể thiếu.' },
    ],
    examples: [
      { q: 'Em gõ chữ vào máy tính bằng bộ phận nào?', a: 'Bàn phím. Chuột chỉ điều khiển con trỏ, không gõ được chữ. Bàn phím chuyên dùng để nhập ký tự.' },
      { q: 'CPU là gì và làm gì?', a: 'CPU là bộ xử lý trung tâm — "bộ não" máy tính. Mọi phép tính và xử lý đều diễn ra ở CPU.' },
    ],
  },

  'P4CN-w17-quiz': {
    topic: 'Nghỉ Tết Nguyên đán',
    intro: 'Các em ơi, Tết em có thể tham gia nhiều hoạt động truyền thống. Cô sẽ chỉ vài việc em làm được và những điều phải tránh.',
    objectives: [
      'Em biết các hoạt động Tết phù hợp.',
      'Em biết trang trí Tết.',
      'Em giữ an toàn khi đun nấu, đi chơi xa.',
    ],
    theory: [
      { h: 'Hoạt động Tết phù hợp' },
      { ul: [
        'Gói bánh chưng cùng gia đình.',
        'Trang trí: câu đối đỏ, đèn lồng, hoa đào/mai.',
        'Chúc Tết ông bà, người thân.',
      ] },
      { h: 'An toàn' },
      { p: 'Đun nấu: có người lớn, không nghịch bếp gas. Đi chơi xa: xin phép cha mẹ, không đi với người lạ. Tuyệt đối không đốt pháo nổ trái phép.' },
      { note: 'Tết là dịp gắn kết gia đình — em hãy ở cùng người thân.' },
    ],
    examples: [
      { q: 'Em muốn tự nấu canh ngày Tết, có nên không?', a: 'Em cần có người lớn cùng. Bếp gas rất nguy hiểm, một mình em chưa làm được an toàn. Em có thể phụ giúp các việc khác.' },
      { q: 'Bạn rủ đi chơi xa ngày Tết, em làm gì?', a: 'Em xin phép cha mẹ trước. Không đi xa khi chưa được phép — Tết là dịp ở gần gia đình.' },
    ],
  },

  'P4CN-w18-quiz': {
    topic: 'Bật/tắt máy tính đúng cách',
    intro: 'Các em ạ, bật máy tính bằng nút Power. Tắt phải qua Start → Shut down. Tắt sai cách có thể hỏng máy.',
    objectives: [
      'Em biết bật máy bằng nút Power.',
      'Em biết tắt máy đúng qua Start → Shut down.',
      'Em biết lưu file trước khi tắt.',
    ],
    theory: [
      { h: 'Bật máy' },
      { p: 'Nhấn nút Power trên thân máy. Đợi máy khởi động xong là dùng được.' },
      { h: 'Tắt máy đúng' },
      { ul: [
        'Lưu các file đang làm.',
        'Đóng các ứng dụng.',
        'Vào Start → Shut down (hoặc menu Apple → Tắt máy trên Mac).',
        'Đợi máy tắt hẳn rồi mới rút điện.',
      ] },
      { note: 'Rút điện đột ngột khi máy đang chạy có thể hỏng dữ liệu và phần cứng.' },
    ],
    examples: [
      { q: 'Em vừa làm bài tập trên Word xong, định tắt máy. Cần làm gì trước?', a: 'Em lưu file (Ctrl+S) rồi mới tắt qua Start → Shut down. Không lưu sẽ mất hết bài tập.' },
      { q: 'Máy tính đang chạy, em rút phích ra ngay được không?', a: 'Không được. Rút đột ngột có thể làm hỏng hệ điều hành hoặc mất dữ liệu. Phải tắt máy đúng quy trình trước.' },
    ],
  },

  'P4CN-w19-quiz': {
    topic: 'Ngồi đúng tư thế khi dùng máy tính',
    intro: 'Các em ơi, ngồi máy tính sai tư thế dễ cận thị và đau lưng. Cô sẽ chỉ tư thế chuẩn để bảo vệ mắt và sống lưng.',
    objectives: [
      'Em giữ khoảng cách mắt – màn hình 50–70 cm.',
      'Em ngồi lưng thẳng, vai thả lỏng.',
      'Em biết quy tắc 20-20-20 nghỉ mắt.',
    ],
    theory: [
      { h: 'Tư thế chuẩn' },
      { ul: [
        'Khoảng cách mắt – màn hình: 50–70 cm.',
        'Lưng thẳng, vai thả lỏng, không gù.',
        'Chuột đặt ngang khuỷu tay, thoải mái.',
      ] },
      { h: 'Quy tắc 20-20-20' },
      { p: 'Cứ 20 phút dùng máy, nhìn xa 20 feet (~6m) trong 20 giây để mắt nghỉ. Giúp tránh mỏi mắt và cận thị.' },
      { note: 'Ánh sáng phòng đủ sáng, không chói — không tối hoàn toàn cũng không quá chói.' },
    ],
    examples: [
      { q: 'Quy tắc 20-20-20 là gì?', a: 'Cứ 20 phút nhìn màn hình, em nghỉ 20 giây nhìn ra xa khoảng 6m. Bảo vệ mắt khỏi mỏi và cận thị.' },
      { q: 'Em hay ngồi gù lưng khi dùng máy tính, hậu quả là gì?', a: 'Đau lưng, vẹo cột sống, mỏi vai. Em nên ngồi lưng thẳng, vai thả lỏng, điều chỉnh ghế cho phù hợp.' },
    ],
  },

  'P4CN-w20-quiz': {
    topic: 'Phần cứng – phần mềm',
    intro: 'Các em ạ, phần cứng là bộ phận sờ được, phần mềm là chương trình chạy trên máy. Cả hai cùng cần thiết.',
    objectives: [
      'Em phân biệt phần cứng và phần mềm.',
      'Em biết hệ điều hành phổ biến.',
      'Em biết các phần mềm thường dùng.',
    ],
    theory: [
      { h: 'Phần cứng và phần mềm' },
      { ul: [
        'Phần cứng (hardware): bộ phận sờ được — màn hình, bàn phím, chuột, CPU.',
        'Phần mềm (software): chương trình chạy trên máy — không sờ được nhưng làm máy chạy được.',
      ] },
      { h: 'Hệ điều hành' },
      { p: 'Là phần mềm cơ bản giúp các phần mềm khác chạy được: Windows, macOS, Linux.' },
      { note: 'Phần mềm soạn văn bản phổ biến: Word, Google Docs.' },
    ],
    examples: [
      { q: 'Chuột là phần cứng hay phần mềm?', a: 'Phần cứng — em sờ được, cầm được. Phần mềm chỉ là chương trình, không sờ được.' },
      { q: 'Em muốn viết một lá thư trên máy tính, dùng phần mềm gì?', a: 'Word hoặc Google Docs — là phần mềm soạn thảo văn bản, có nhiều công cụ để viết, định dạng, chỉnh sửa.' },
    ],
  },

  'P4CN-w21-quiz': {
    topic: 'An toàn điện trong nhà',
    intro: 'Các em ơi, điện rất nguy hiểm. Cô sẽ chỉ những điều phải tuyệt đối tránh và cách xử lý khi có sự cố.',
    objectives: [
      'Em biết các quy tắc an toàn điện.',
      'Em biết tuyệt đối không chạm điện khi tay ướt.',
      'Em biết cách xử lý khi có người bị điện giật.',
    ],
    theory: [
      { h: 'Quy tắc an toàn' },
      { ul: [
        'Rút phích cắm: cầm thân phích, không kéo dây.',
        'Tay ướt: TUYỆT ĐỐI không chạm thiết bị điện.',
        'Ổ điện trẻ em: bịt kín khi không dùng.',
        'Không cắm que/đồ kim loại vào ổ điện.',
      ] },
      { h: 'Khi có người bị điện giật' },
      { p: 'Ngắt cầu dao trước! Không chạm trực tiếp vào nạn nhân (em cũng sẽ bị giật). Sau khi ngắt điện mới sơ cứu và gọi cấp cứu.' },
      { note: 'Số gọi cứu hỏa: 114. Cứu thương: 115. Cảnh sát: 113.' },
    ],
    examples: [
      { q: 'Em vừa rửa tay xong, định bật quạt điện, có được không?', a: 'Không! Tay ướt dẫn điện rất nguy hiểm. Em lau khô tay trước rồi mới bật quạt. Đây là quy tắc bất di bất dịch.' },
      { q: 'Bạn em bị điện giật, em làm gì đầu tiên?', a: 'Em ngắt cầu dao điện trước — TUYỆT ĐỐI không chạm vào bạn khi bạn còn dính điện. Sau khi ngắt mới sơ cứu và gọi 115.' },
    ],
  },

  'P4CN-w22-quiz': {
    topic: 'Sử dụng đèn pin – ổ cắm – công tắc',
    intro: 'Các em ạ, đèn pin chạy bằng pin, không phải điện 220V. Em lắp pin đúng chiều và biết tắt khi không dùng.',
    objectives: [
      'Em biết đèn pin chạy bằng pin.',
      'Em lắp pin đúng chiều cực + và –.',
      'Em hiểu công tắc On/Off.',
    ],
    theory: [
      { h: 'Đèn pin' },
      { ul: [
        'Chạy bằng pin (1,5V hoặc 9V tùy loại), không phải điện 220V.',
        'Lắp pin đúng chiều — cực + (đầu lồi) theo dấu trong khoang pin.',
        'Không dùng lâu: tháo pin ra, tránh pin chảy axit làm hỏng đèn.',
      ] },
      { h: 'Công tắc' },
      { p: 'Có hai vị trí: On (bật) và Off (tắt). Tắt khi không dùng để tiết kiệm.' },
      { note: 'Pin cũ vứt vào nơi thu gom riêng — không vứt chung rác thường vì có chất độc.' },
    ],
    examples: [
      { q: 'Em lắp pin vào đèn pin, làm sao biết đúng chiều?', a: 'Em nhìn dấu + và – trong khoang pin (ký hiệu sẵn). Cực + của pin (đầu lồi) theo dấu + trong khoang.' },
      { q: 'Em không dùng đèn pin lâu, có nên để pin trong đó không?', a: 'Không nên. Em tháo pin ra để tránh pin chảy axit làm hỏng đèn. Cất pin nơi khô ráo.' },
    ],
  },

  'P4CN-w23-quiz': {
    topic: 'Tiết kiệm điện trong nhà',
    intro: 'Các em ơi, tiết kiệm điện vừa giúp gia đình đỡ tốn tiền, vừa bảo vệ môi trường. Hành động nhỏ — hiệu quả lớn.',
    objectives: [
      'Em biết đèn LED tiết kiệm hơn đèn sợi đốt.',
      'Em tắt thiết bị khi rời phòng.',
      'Em biết nhiệt độ điều hòa hợp lý.',
    ],
    theory: [
      { h: 'Đèn LED' },
      { p: 'LED tiết kiệm điện gấp 5–10 lần so với đèn sợi đốt và bền hơn nhiều. Nhà em nên thay dần sang LED.' },
      { h: 'Thói quen tiết kiệm' },
      { ul: [
        'Rời phòng: tắt đèn, quạt.',
        'Tủ lạnh: đặt nơi thoáng, không sát tường.',
        'Điều hòa: 26–28°C là vừa, mát mà không lạnh quá.',
      ] },
      { note: 'Tiết kiệm điện = tiết kiệm tiền + bảo vệ môi trường.' },
    ],
    examples: [
      { q: 'Nhiệt độ điều hòa hợp lý cho mùa hè?', a: '26–28°C. Đủ mát mà không lạnh, tiết kiệm điện và tốt cho sức khỏe. Đặt 16–18°C tốn rất nhiều điện và dễ ốm.' },
      { q: 'Em ra khỏi phòng quên tắt đèn, có sao không?', a: 'Tốn điện và hỏng bóng nhanh. Em tạo thói quen tắt khi ra — ban đầu nhớ nhắc, dần thành phản xạ tự nhiên.' },
    ],
  },

  'P4CN-w24-quiz': {
    topic: 'Internet và an toàn mạng',
    intro: 'Các em ạ, internet là mạng máy tính toàn cầu. Có nhiều thông tin hữu ích nhưng cũng nguy hiểm — em cần biết tự bảo vệ.',
    objectives: [
      'Em hiểu internet là mạng máy tính toàn cầu.',
      'Em biết cách đặt mật khẩu an toàn.',
      'Em biết tránh người lạ và nội dung xấu.',
    ],
    theory: [
      { h: 'Internet là gì?' },
      { p: 'Internet là mạng máy tính toàn cầu — kết nối hàng tỷ thiết bị trên thế giới với nhau.' },
      { h: 'An toàn mạng' },
      { ul: [
        'Mật khẩu: khó đoán, không chia sẻ với bất kỳ ai.',
        'Người lạ kết bạn: không nhận, hỏi cha mẹ.',
        'Nội dung xấu: đóng ngay và báo người lớn.',
        'Đăng ảnh người khác: phải xin phép.',
      ] },
      { note: 'Tuyệt đối không cho địa chỉ, số điện thoại cho người lạ trên mạng.' },
    ],
    examples: [
      { q: 'Người lạ trên mạng nhắn kết bạn và hẹn gặp em, em làm gì?', a: 'Em không nhận, không nhắn lại, báo ngay cha mẹ. Tuyệt đối không hẹn gặp người lạ trên mạng — rất nguy hiểm.' },
      { q: 'Em muốn đăng ảnh chụp chung với bạn, cần lưu ý gì?', a: 'Em xin phép bạn trước khi đăng. Tôn trọng quyền hình ảnh — không ai muốn ảnh mình bị đăng mà không biết.' },
    ],
  },

  'P4CN-w25-quiz': {
    topic: 'Sử dụng quạt điện và bàn là an toàn',
    intro: 'Các em ơi, quạt và bàn là dùng điện 220V — phải cẩn thận. Cô sẽ chỉ cách dùng và bảo quản an toàn.',
    objectives: [
      'Em biết kiểm tra dây điện trước khi dùng.',
      'Em biết đặt bàn là đứng khi tạm dừng.',
      'Em biết các điều tuyệt đối tránh với quạt.',
    ],
    theory: [
      { h: 'Bàn là' },
      { ul: [
        'Trước khi dùng: kiểm tra dây điện không hở, không đứt.',
        'Tạm dừng giữa chừng: đặt bàn là đứng (chân chống lên).',
        'Không bao giờ để bàn là nóng nằm úp xuống quần áo lâu — sẽ cháy.',
      ] },
      { h: 'Quạt điện' },
      { p: 'TUYỆT ĐỐI không đút ngón tay vào lồng quạt khi quạt đang chạy. Lau bụi chỉ khi đã tắt và rút phích.' },
      { note: 'Sau khi dùng: rút phích, để nguội rồi mới cất.' },
    ],
    examples: [
      { q: 'Em đang là quần áo, mẹ gọi xuống, em làm gì với bàn là?', a: 'Em đặt bàn là đứng (chân chống lên) hoặc tắt và rút phích nếu lâu. Không để nằm úp trên quần áo — sẽ cháy.' },
      { q: 'Quạt đang chạy, em có nên đút tay vào lồng quạt?', a: 'TUYỆT ĐỐI KHÔNG. Cánh quạt quay nhanh sẽ làm em bị thương rất nặng. Muốn lau bụi: tắt và rút phích trước.' },
    ],
  },

  'P4CN-w26-quiz': {
    topic: 'Sửa chữa đơn giản đồ dùng học tập',
    intro: 'Các em ạ, đồ học tập hỏng nhẹ có thể sửa được, không cần vứt. Tiết kiệm và bảo vệ môi trường.',
    objectives: [
      'Em biết sửa đồ dùng đơn giản.',
      'Em biết bảo quản đồ dùng.',
      'Em tận dụng đồ cũ thay vì vứt.',
    ],
    theory: [
      { h: 'Sửa đơn giản' },
      { ul: [
        'Cặp bung khóa: báo cha mẹ may lại hoặc sửa.',
        'Bút tắc mực: lắc nhẹ hoặc thay ruột.',
        'Sách rách: dán băng dính trong.',
      ] },
      { h: 'Bảo quản' },
      { p: 'Cất ngăn nắp, tránh ẩm, không vứt bừa. Đồ được bảo quản tốt dùng được lâu hơn.' },
      { note: 'Tận dụng đồ cũ = tiết kiệm + bảo vệ môi trường.' },
    ],
    examples: [
      { q: 'Bút bi của em viết tắc mực giữa giờ, làm sao?', a: 'Em lắc nhẹ vài lần, viết thử lên giấy nháp. Vẫn không được thì xin cô cho mượn, về nhà thay ruột bút.' },
      { q: 'Cặp sách của em bung một bên khoá, em vứt đi mua mới được không?', a: 'Không nên vứt. Cặp còn dùng tốt, em báo cha mẹ may lại hoặc sửa. Tiết kiệm tiền và giảm rác thải.' },
    ],
  },

  'P4CN-w27-quiz': {
    topic: 'Lắp ráp đèn pin tự chế',
    intro: 'Các em ơi, mạch điện đơn giản gồm pin, dây, bóng đèn và công tắc. Mạch kín mới có dòng điện chạy qua.',
    objectives: [
      'Em biết các thành phần của mạch điện đèn pin.',
      'Em hiểu mạch phải kín mới có dòng điện.',
      'Em chỉ dùng pin 1,5V hoặc 9V, không dùng điện 220V.',
    ],
    theory: [
      { h: 'Thành phần mạch' },
      { ul: [
        'Pin: nguồn điện.',
        'Dây dẫn: dẫn dòng điện.',
        'Bóng đèn: phát sáng khi có dòng điện.',
        'Công tắc: bật/tắt dòng điện.',
      ] },
      { h: 'Mạch kín' },
      { p: 'Khi công tắc đóng, dòng điện chạy từ cực + của pin qua dây, qua bóng, về cực –. Đây gọi là mạch kín. Mạch hở (đứt) thì đèn không sáng.' },
      { note: 'AN TOÀN: chỉ dùng pin 1,5V hoặc 9V. TUYỆT ĐỐI không dùng điện lưới 220V để làm thí nghiệm.' },
    ],
    examples: [
      { q: 'Em lắp đèn pin nhưng đèn không sáng, nguyên nhân có thể là gì?', a: 'Pin yếu/hết, dây tiếp xúc kém, bóng cháy hoặc mạch hở. Em kiểm tra từng phần để tìm nguyên nhân.' },
      { q: 'Em làm thí nghiệm điện ở nhà, có được dùng ổ điện 220V không?', a: 'TUYỆT ĐỐI KHÔNG. Chỉ dùng pin 1,5V hoặc 9V. Điện lưới 220V cực kỳ nguy hiểm, có thể gây tử vong.' },
    ],
  },

  'P4CN-w28-quiz': {
    topic: 'Máy tính giúp em học tập',
    intro: 'Các em ạ, máy tính có nhiều phần mềm hỗ trợ học tập. Cô sẽ giới thiệu các phần mềm phổ biến và cách tìm kiếm hiệu quả.',
    objectives: [
      'Em biết phần mềm soạn thảo, trình chiếu, bảng tính.',
      'Em biết tra cứu thông tin.',
      'Em đặt câu hỏi tìm kiếm hiệu quả.',
    ],
    theory: [
      { h: 'Phần mềm phổ biến' },
      { ul: [
        'Soạn thảo văn bản: Word, Google Docs.',
        'Trình chiếu: PowerPoint, Google Slides.',
        'Bảng tính: Excel, Google Sheets.',
      ] },
      { h: 'Tìm kiếm hiệu quả' },
      { p: 'Em dùng từ khóa ngắn, chính xác. Ví dụ: "thủ đô Việt Nam" tốt hơn "thủ đô của nước Việt Nam ta là gì".' },
      { note: 'Máy tính dùng để học, tra cứu, viết, vẽ — không chỉ chơi game hay xem clip.' },
    ],
    examples: [
      { q: 'Em làm bài thuyết trình về Hà Nội, dùng phần mềm gì?', a: 'PowerPoint hoặc Google Slides — phần mềm trình chiếu chuyên dùng để làm slide thuyết trình.' },
      { q: 'Em tìm kiếm "thông tin về cây xanh trong thành phố", có hiệu quả không?', a: 'Câu hơi dài. Em rút gọn thành "lợi ích cây xanh thành phố" — từ khóa ngắn và rõ giúp tìm được kết quả tốt hơn.' },
    ],
  },

  'P4CN-w29-quiz': {
    topic: 'Bảo quản máy tính cá nhân',
    intro: 'Các em ơi, máy tính bền lâu nếu em bảo quản đúng. Cô sẽ chỉ cách giữ máy khô thoáng và sao lưu dữ liệu.',
    objectives: [
      'Em biết đặt máy nơi khô thoáng.',
      'Em biết không ăn uống gần máy.',
      'Em biết sao lưu dữ liệu định kỳ.',
    ],
    theory: [
      { h: 'Môi trường' },
      { ul: [
        'Khô ráo, thoáng — không ẩm ướt.',
        'Tránh nắng gắt và bụi nhiều.',
        'Không ăn uống gần máy — đổ nước hỏng máy ngay.',
      ] },
      { h: 'Khi máy nóng' },
      { p: 'Để thoáng, không che lỗ thoát nhiệt. Không đặt máy trên chăn mền — sẽ tích nhiệt, hỏng máy.' },
      { note: 'Sao lưu dữ liệu vào USB hoặc đám mây định kỳ — phòng máy hỏng mất file.' },
    ],
    examples: [
      { q: 'Em vừa làm một bài lớn trên máy tính, có nên sao lưu?', a: 'Có. Em sao lưu vào USB hoặc lưu lên Google Drive. Phòng máy hỏng hay file lỗi vẫn còn bản dự phòng.' },
      { q: 'Em hay đặt laptop trên chăn để dùng, có sao không?', a: 'Có. Chăn che lỗ thoát nhiệt, máy nóng và dễ hỏng. Em đặt máy trên bàn cứng, có khe thoáng dưới máy.' },
    ],
  },

  'P4CN-w30-quiz': {
    topic: 'Chăm sóc cây cảnh dài hạn',
    intro: 'Các em ạ, cây cảnh nuôi lâu dài cần em theo dõi và chăm sóc tinh tế hơn. Cô sẽ chỉ cách xử lý các vấn đề thường gặp.',
    objectives: [
      'Em biết dấu hiệu cây thiếu sáng/dinh dưỡng.',
      'Em biết cắt tỉa và sang chậu.',
      'Em hiểu cây có thể rụng hoa do nhiều nguyên nhân.',
    ],
    theory: [
      { h: 'Vấn đề thường gặp' },
      { ul: [
        'Cây yếu, ít lá: có thể thiếu sáng hoặc thiếu dinh dưỡng.',
        'Cây quá lớn: cắt tỉa cho gọn, kích thích chồi mới.',
        'Rễ chật chậu: sang chậu lớn hơn.',
      ] },
      { h: 'Hoa rụng' },
      { p: 'Có nhiều nguyên nhân: tưới sai, gió mạnh, nắng gắt, sâu bệnh. Em quan sát và điều chỉnh.' },
      { note: 'Chăm cây như chăm bạn — quan sát mỗi ngày để biết cây cần gì.' },
    ],
    examples: [
      { q: 'Cây em ít lá, lá nhỏ, làm sao?', a: 'Có thể thiếu sáng hoặc thiếu dinh dưỡng. Em đem ra nơi sáng vừa, bón thêm phân (nhẹ thôi), quan sát 1–2 tuần.' },
      { q: 'Khi nào em nên sang chậu cho cây?', a: 'Khi cây đã lớn, rễ chật chậu (có thể thấy rễ chui ra lỗ thoát nước). Sang chậu lớn hơn để cây có không gian phát triển.' },
    ],
  },

  'P4CN-w31-quiz': {
    topic: 'Mô hình "ngôi nhà mơ ước"',
    intro: 'Các em ơi, em sẽ thiết kế mô hình ngôi nhà mơ ước. Nhà cần có cửa, mái, không gian xanh và phải an toàn.',
    objectives: [
      'Em biết các yếu tố cơ bản của một ngôi nhà.',
      'Em biết vai trò của mái nhà.',
      'Em thêm không gian xanh vào thiết kế.',
    ],
    theory: [
      { h: 'Yếu tố cơ bản' },
      { ul: [
        'Cửa ra vào và cửa sổ: thông gió, lấy sáng.',
        'Mái nhà: chống mưa nắng.',
        'Không gian xanh: cây cảnh, ban công xanh.',
      ] },
      { h: 'Vật liệu mô hình' },
      { p: 'Bìa, que kem, giấy — đơn giản, dễ thực hành. Không cần vật liệu đắt tiền.' },
      { note: 'Khi trưng bày, em giới thiệu ý tưởng thiết kế với cả lớp tự tin.' },
    ],
    examples: [
      { q: 'Mái nhà có tác dụng gì?', a: 'Chống mưa, chống nắng, giữ ấm/mát cho người trong nhà. Nhà không mái thì sao ở được — mưa đổ vào, nắng chiếu thẳng.' },
      { q: 'Em thiết kế nhà mơ ước có gì đặc biệt?', a: 'Em thêm không gian xanh (cây cảnh, ban công xanh) — giúp ngôi nhà mát, đẹp và sống động hơn nhiều.' },
    ],
  },

  'P4CN-w32-quiz': {
    topic: 'Lựa chọn thực phẩm và đồ dùng tiết kiệm',
    intro: 'Các em ạ, mua sắm có trách nhiệm là cách bảo vệ ví tiền và môi trường. Cô sẽ chỉ cách chọn đồ thông minh.',
    objectives: [
      'Em biết cân nhắc khi mua sắm.',
      'Em biết tránh thực phẩm hết hạn.',
      'Em chọn đồ bền, dễ sửa.',
    ],
    theory: [
      { h: 'Tiêu dùng thông minh' },
      { ul: [
        'Cân nhắc trước khi mua: thực sự cần không?',
        'Chọn đồ bền, dễ sửa — tốn ban đầu nhưng dùng lâu.',
        'Tái sử dụng/tái chế bao bì.',
      ] },
      { h: 'Thực phẩm' },
      { p: 'Kiểm tra hạn sử dụng trước khi mua/dùng. Đồ hết hạn TUYỆT ĐỐI không dùng — kể cả cho người khác.' },
      { note: 'Tiêu dùng có trách nhiệm = bảo vệ ví + bảo vệ môi trường.' },
    ],
    examples: [
      { q: 'Em thấy gói bánh đã hết hạn 3 ngày, vẫn còn nguyên gói. Có ăn được không?', a: 'Không ăn được. Em vứt theo phân loại rác. Đồ hết hạn có thể gây ngộ độc — đừng tiếc.' },
      { q: 'Em chọn mua một cây bút, nên ưu tiên gì?', a: 'Bút bền và có thể thay ruột (dễ sửa). Vài lần thay ruột rẻ hơn mua bút mới và ít rác hơn.' },
    ],
  },

  'P4CN-w33-quiz': {
    topic: 'Thực hành: thiết kế thiệp điện tử đơn giản',
    intro: 'Các em ơi, thiệp điện tử có thể tạo bằng phần mềm máy tính. Em sẽ học cách thiết kế đẹp và gửi lịch sự.',
    objectives: [
      'Em biết thiệp điện tử là gì.',
      'Em phối hợp hình ảnh, lời chúc, màu sắc.',
      'Em biết các định dạng ảnh phổ biến.',
    ],
    theory: [
      { h: 'Thiệp điện tử' },
      { p: 'Là thiệp được thiết kế bằng phần mềm trên máy tính/điện thoại, gửi qua mạng. Thay thế thiệp giấy truyền thống.' },
      { h: 'Yếu tố thiệp' },
      { ul: [
        'Hình ảnh: phù hợp dịp.',
        'Lời chúc: chân thành, ngắn gọn.',
        'Màu sắc: hài hòa, không quá lòe loẹt.',
      ] },
      { note: 'Định dạng ảnh phổ biến: JPG, PNG. Khi gửi: chọn đúng người nhận, không spam.' },
    ],
    examples: [
      { q: 'Em làm thiệp 8/3 gửi mẹ, nên có những gì?', a: 'Hình ảnh hoa hoặc mẹ con, lời chúc chân thành ("Con yêu mẹ, chúc mẹ luôn vui khỏe!"), màu sắc tươi tắn.' },
      { q: 'Định dạng ảnh phổ biến nhất là gì?', a: 'JPG và PNG — hai định dạng ảnh phổ biến nhất. TXT là văn bản, MP3 là nhạc — không phải ảnh.' },
    ],
  },

  'P4CN-w34-quiz': {
    topic: 'Ôn tập HKII',
    intro: 'Các em ạ, chúng ta ôn lại các nội dung HK2: an toàn điện, tiết kiệm điện, internet an toàn, chăm cây.',
    objectives: [
      'Em hệ thống lại các quy tắc an toàn điện.',
      'Em nhớ thói quen tiết kiệm điện.',
      'Em nhớ nguyên tắc an toàn internet.',
    ],
    theory: [
      { h: 'Hệ thống nội dung' },
      { ul: [
        'An toàn điện: không chạm khi tay ướt, ngắt nguồn khi có sự cố.',
        'Tiết kiệm điện: tắt khi rời phòng, dùng LED, điều hòa 26–28°C.',
        'Internet: không lộ thông tin cá nhân, không hẹn người lạ.',
        'Chăm cây: tưới vừa đủ, tránh úng rễ.',
      ] },
      { note: 'An toàn vẫn là quy tắc số 1 — trong mọi tình huống.' },
    ],
    examples: [
      { q: 'Cây em đang chăm bị héo lá, có thể do thừa nước hay thiếu?', a: 'Cả hai đều có thể. Em kiểm tra đất: ướt sũng là thừa (úng rễ); khô cong là thiếu. Điều chỉnh phù hợp.' },
      { q: 'Trên mạng em không nên?', a: 'Không lộ thông tin cá nhân (địa chỉ, số điện thoại), không hẹn gặp người lạ. An toàn là trên hết.' },
    ],
  },

  'P4CN-w35-quiz': {
    topic: 'Kiểm tra HKII',
    intro: 'Các em ơi, hôm nay kiểm tra HK2. Em vận dụng kiến thức đã học, đặc biệt là các quy tắc an toàn quan trọng.',
    objectives: [
      'Em vận dụng kiến thức kỹ thuật và an toàn.',
      'Em nhớ nguyên lý mạch điện kín.',
      'Em nhớ tắt máy tính đúng cách.',
    ],
    theory: [
      { h: 'Nội dung trọng tâm' },
      { ul: [
        'Mạch kín mới có dòng điện chạy qua.',
        'Đèn LED tiết kiệm điện hơn đèn sợi đốt.',
        'Tắt máy tính qua Start → Shut down.',
        'Tay ướt: TUYỆT ĐỐI không chạm điện.',
        'Cây thiếu sáng: đem ra nơi sáng vừa.',
      ] },
      { note: 'Bình tĩnh đọc kỹ câu hỏi và chọn đáp án đúng.' },
    ],
    examples: [
      { q: 'Tại sao đèn LED tiết kiệm điện hơn đèn sợi đốt?', a: 'LED chuyển hầu hết điện năng thành ánh sáng, ít nhiệt. Đèn sợi đốt tỏa nhiệt nhiều, lãng phí điện. LED còn bền hơn.' },
      { q: 'Em định tắt máy tính, cách nào đúng?', a: 'Vào Start → Shut down (Windows) hoặc menu Apple → Tắt máy (Mac). KHÔNG rút điện đột ngột — có thể hỏng máy.' },
    ],
  },

  'P4CN-w36-quiz': {
    topic: 'Kết thúc Lớp 4 — Hành trang Công nghệ vào Lớp 5',
    intro: 'Chúc mừng các em đã hoàn thành năm học Công nghệ Lớp 4! Hôm nay cô tổng kết hành trình từ thủ công kỹ thuật đến nông nghiệp, điện tử — và cùng nhìn về những phát minh sáng tạo đang chờ ở Lớp 5!',
    objectives: [
      'Hệ thống kiến thức Công nghệ Lớp 4 theo ba lĩnh vực: kỹ thuật, nông nghiệp, năng lượng.',
      'Hiểu nguyên lý an toàn khi sử dụng các thiết bị và điện.',
      'Có tư duy tìm tòi sáng tạo và yêu lao động cho Lớp 5.',
    ],
    theory: [
      { h: 'Ba lĩnh vực Công nghệ Lớp 4 đã chinh phục' },
      { ul: [
        'Kỹ thuật và thủ công: cắt, gấp, dán giấy (hình khối 3D, thiệp, hộp, mô hình); sử dụng an toàn kéo, dao rọc; đọc bản vẽ kỹ thuật đơn giản; quy trình làm sản phẩm (thiết kế → chuẩn bị vật liệu → thực hiện → kiểm tra).',
        'Nông nghiệp gia đình: trồng cây (đất, nước, ánh sáng, phân bón); nhận biết sâu bệnh thông thường; thu hoạch và bảo quản rau quả; chăm sóc vật nuôi nhỏ (gà, cá, thỏ).',
        'Năng lượng và điện: nguồn điện (pin, lưới điện); mạch điện kín — mới có dòng điện; an toàn điện (tay khô, không chạm dây trần, tắt nguồn trước khi sửa); đèn LED tiết kiệm điện; tắt máy tính đúng quy trình (Shut down).',
      ] },
      { h: 'Nguyên tắc an toàn lao động & điện — cần nhớ mãi' },
      { ul: [
        'Điện: KHÔNG dùng điện khi tay ướt; KHÔNG cắm nhiều thiết bị vào 1 ổ cắm; tắt điện trước khi thay bóng đèn.',
        'Cắt gọt: cắt đẩy ra xa người; thu dọn dụng cụ sắc ngay sau dùng; không chạy khi cầm kéo/dao.',
        'Nông nghiệp: rửa tay sau khi tiếp xúc đất/phân; đeo khẩu trang khi phun thuốc; kiểm tra đất và nước trước khi trồng.',
      ] },
      { h: 'Lớp 5 Công nghệ sẽ học gì?' },
      { ul: [
        'Mô hình kỹ thuật phức tạp hơn: lắp ráp có khớp nối, vít, ốc.',
        'Lập trình robot đơn giản và mạch điện có công tắc nhiều vị trí.',
        'Nông nghiệp bền vững: vườn rau thủy canh, phân hữu cơ từ rác thực phẩm.',
        'Thiết kế sáng tạo: quy trình Design Thinking (Đồng cảm → Xác định → Ý tưởng → Tạo mẫu → Kiểm tra).',
      ] },
      { note: 'Công nghệ là cầu nối giữa ý tưởng và hiện thực — hãy luôn tò mò và dám thử!' },
    ],
    examples: [
      { q: 'Nêu 3 điều kiện cần thiết để cây phát triển tốt.', a: 'Đất màu mỡ (cung cấp dinh dưỡng khoáng); Nước (hoà tan khoáng chất, vận chuyển chất); Ánh sáng (giúp lá quang hợp tạo chất hữu cơ). Thêm không khí (CO₂ cho quang hợp, O₂ cho hô hấp rễ).' },
      { q: 'Tại sao KHÔNG cắm nhiều thiết bị vào 1 ổ cắm?', a: 'Mỗi ổ cắm có giới hạn tải điện. Cắm quá nhiều → tổng công suất vượt mức → dây điện nóng → cháy nổ hoặc trập điện. Nguyên tắc: kiểm tra tổng công suất và không vượt giới hạn ghi trên ổ cắm.' },
    ],
  },
};
