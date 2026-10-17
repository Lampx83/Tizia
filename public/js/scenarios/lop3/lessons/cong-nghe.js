// ============================================================
// Lớp 3 · CÔNG NGHỆ — LÝ THUYẾT 35 tuần
// Bám CT GDPT 2018: Công nghệ & đời sống (sản phẩm công nghệ
// trong gia đình; dùng an toàn – tiết kiệm điện) + Thủ công kĩ
// thuật (gấp – cắt – dán, làm đồ chơi, biển báo, tái chế, trồng cây).
// Ngôn ngữ đơn giản, phù hợp lớp 3. KEY trùng id quiz "P3CN-wNN-quiz".
// theory item types: {h}, {ul:[...]}, {p:'...'}, {note:'...'}.
// ============================================================

export const P3CN_LESSONS = {
  'P3CN-w01-quiz': {
    topic: 'Tự nhiên và công nghệ',
    intro: 'Quanh ta có hai loại vật: vật có sẵn trong tự nhiên và vật do con người làm ra.',
    objectives: [
      'Phân biệt được vật tự nhiên và sản phẩm công nghệ.',
      'Nêu được ích lợi của sản phẩm công nghệ trong đời sống.',
    ],
    theory: [
      { h: 'Vật tự nhiên và sản phẩm công nghệ' },
      { ul: [
        'Vật tự nhiên có sẵn, không do con người làm ra: cây, đá, sông, núi, Mặt Trời, con vật.',
        'Sản phẩm công nghệ do con người chế tạo ra: cái bàn, đèn, quạt, tivi, xe đạp.',
      ] },
      { h: 'Ích lợi của sản phẩm công nghệ' },
      { ul: [
        'Giúp công việc nhẹ nhàng, nhanh và tiện lợi hơn.',
        'Phục vụ học tập, sinh hoạt, đi lại của con người.',
      ] },
      { note: 'Cần dùng sản phẩm công nghệ đúng cách và giữ gìn để chúng bền lâu.' },
    ],
    examples: [
      { q: 'Cái quạt điện là vật tự nhiên hay sản phẩm công nghệ?', a: 'Là sản phẩm công nghệ, vì do con người làm ra.' },
      { q: 'Kể hai vật có sẵn trong tự nhiên.', a: 'Ví dụ: cây xanh và hòn đá.' },
    ],
  },

  'P3CN-w02-quiz': {
    topic: 'Sản phẩm công nghệ trong gia đình',
    intro: 'Trong nhà em có nhiều sản phẩm công nghệ giúp sinh hoạt thuận tiện hơn.',
    objectives: [
      'Kể được một số sản phẩm công nghệ thường có trong gia đình.',
      'Nêu được công dụng của từng đồ dùng.',
    ],
    theory: [
      { h: 'Một số đồ dùng và công dụng' },
      { ul: [
        'Tủ lạnh: giữ lạnh, bảo quản thức ăn tươi lâu.',
        'Tivi (máy thu hình): cho xem hình ảnh, chương trình.',
        'Nồi cơm điện: nấu cơm chín tiện lợi.',
        'Quạt điện: tạo gió làm mát phòng.',
        'Đèn điện: chiếu sáng.',
      ] },
      { p: 'Mỗi đồ dùng có một công dụng riêng. Dùng đúng đồ cho đúng việc giúp sinh hoạt thuận tiện.' },
      { note: 'Sản phẩm công nghệ trong nhà để dùng, không phải để khoe hay làm chật nhà.' },
    ],
    examples: [
      { q: 'Đồ dùng nào giúp giữ thức ăn tươi lâu?', a: 'Tủ lạnh.' },
      { q: 'Muốn căn phòng mát hơn khi trời nóng, em dùng đồ gì?', a: 'Quạt điện.' },
    ],
  },

  'P3CN-w03-quiz': {
    topic: 'Sử dụng đèn học đúng cách',
    intro: 'Đèn học giúp em nhìn rõ trang giấy. Dùng đèn đúng cách sẽ bảo vệ được đôi mắt.',
    objectives: [
      'Biết đặt đèn học đúng vị trí.',
      'Biết dùng đèn học an toàn và tiết kiệm điện.',
    ],
    theory: [
      { h: 'Đặt đèn học đúng cách' },
      { ul: [
        'Đặt đèn phía bên tay viết để bóng không che lên chữ (tay phải thì đèn ở bên trái).',
        'Ánh sáng vừa đủ, không quá tối cũng không chói loá.',
      ] },
      { h: 'Dùng đèn an toàn, tiết kiệm' },
      { ul: [
        'Học xong thì tắt đèn để tiết kiệm điện.',
        'Không dùng tay ướt chạm vào đèn hay phích cắm.',
        'Đèn hỏng thì báo người lớn, không tự sửa điện.',
      ] },
      { note: 'Ánh sáng đủ và đều giúp mắt đỡ mỏi khi học bài.' },
    ],
    examples: [
      { q: 'Em viết tay phải thì nên đặt đèn ở bên nào?', a: 'Bên trái, để bóng không che chữ.' },
      { q: 'Học xong em nên làm gì với đèn?', a: 'Tắt đèn để tiết kiệm điện.' },
    ],
  },

  'P3CN-w04-quiz': {
    topic: 'Sử dụng quạt điện an toàn',
    intro: 'Quạt điện tạo gió làm mát. Khi dùng quạt cần chú ý an toàn để không bị thương.',
    objectives: [
      'Nêu được công dụng của quạt điện.',
      'Biết các việc cần làm để dùng quạt an toàn.',
    ],
    theory: [
      { h: 'Quạt điện dùng để làm gì' },
      { ul: [
        'Cánh quạt quay tạo gió, giúp làm mát.',
      ] },
      { h: 'Dùng quạt an toàn' },
      { ul: [
        'Không thò tay hay que vào lồng quạt khi quạt đang quay.',
        'Trước khi lau quạt phải tắt và rút phích cắm điện.',
        'Đặt quạt nơi khô ráo, chắc chắn; không để gần nước hay lửa.',
        'Không cắm, rút phích khi tay đang ướt vì dễ bị điện giật.',
      ] },
      { note: 'Tay ướt và đồ điện là rất nguy hiểm — luôn lau khô tay trước khi chạm điện.' },
    ],
    examples: [
      { q: 'Khi quạt đang quay em có được thò tay vào lồng quạt không?', a: 'Không, vì rất dễ bị thương.' },
      { q: 'Trước khi lau quạt em cần làm gì?', a: 'Tắt quạt và rút phích cắm điện.' },
    ],
  },

  'P3CN-w05-quiz': {
    topic: 'An toàn với điện trong nhà',
    intro: 'Điện rất có ích nhưng cũng nguy hiểm. Em cần biết cách dùng điện an toàn.',
    objectives: [
      'Nêu được những việc không được làm với điện.',
      'Biết cách xử lí khi gặp dây điện hở hoặc bạn bị điện giật.',
    ],
    theory: [
      { h: 'Những việc tuyệt đối không làm' },
      { ul: [
        'Không cho ngón tay hay que vào ổ cắm điện.',
        'Không chạm tay vào dây điện bị hở hoặc đứt.',
        'Không dùng tay ướt cắm, rút phích điện.',
        'Để đồ điện xa nơi có nước, vì nước dẫn điện.',
      ] },
      { h: 'Khi gặp nguy hiểm' },
      { ul: [
        'Thấy dây điện hở: tránh xa và báo người lớn.',
        'Thấy bạn bị điện giật: gọi người lớn ngay, không tự kéo bạn bằng tay.',
        'Khi không dùng đồ điện nữa thì tắt và rút phích cắm.',
      ] },
      { note: 'Khi có sự cố về điện, gọi người lớn là cách an toàn nhất.' },
    ],
    examples: [
      { q: 'Thấy dây điện bị hở em nên làm gì?', a: 'Tránh xa và báo người lớn.' },
      { q: 'Vì sao đồ điện phải để xa nước?', a: 'Vì nước dẫn điện, dễ gây chập và điện giật.' },
    ],
  },

  'P3CN-w06-quiz': {
    topic: 'Sử dụng máy thu thanh (radio)',
    intro: 'Máy thu thanh (radio) phát ra âm thanh để em nghe tin tức, ca nhạc.',
    objectives: [
      'Nêu được công dụng của radio.',
      'Biết mở âm lượng vừa phải và tắt máy khi không dùng.',
    ],
    theory: [
      { h: 'Radio dùng để làm gì' },
      { ul: [
        'Phát âm thanh: tin tức, ca nhạc, câu chuyện.',
        'Muốn nghe thì bật máy và dò chọn kênh (đài).',
      ] },
      { h: 'Nghe radio đúng cách' },
      { ul: [
        'Mở âm lượng vừa đủ nghe, không mở quá to.',
        'Nghe quá to và lâu sẽ hại tai.',
        'Khi không nghe nữa thì tắt máy để tiết kiệm điện.',
      ] },
      { note: 'Radio chỉ có âm thanh, khác với tivi vừa có hình ảnh vừa có âm thanh.' },
    ],
    examples: [
      { q: 'Radio cho em nghe hay xem?', a: 'Cho nghe âm thanh như tin tức, ca nhạc.' },
      { q: 'Nên mở âm lượng radio thế nào?', a: 'Mở vừa đủ nghe, không mở quá to.' },
    ],
  },

  'P3CN-w07-quiz': {
    topic: 'Sử dụng máy thu hình (tivi)',
    intro: 'Tivi (máy thu hình) cho em xem hình ảnh và nghe âm thanh. Cần xem tivi đúng cách.',
    objectives: [
      'Nêu được công dụng của tivi.',
      'Biết ngồi xem và xem trong thời gian hợp lí để bảo vệ mắt.',
    ],
    theory: [
      { h: 'Tivi cho em xem gì' },
      { ul: [
        'Tivi phát cả hình ảnh và âm thanh.',
      ] },
      { h: 'Xem tivi đúng cách' },
      { ul: [
        'Ngồi xa màn hình vừa phải, thẳng lưng.',
        'Xem vừa phải rồi nghỉ; xem quá lâu gây mỏi và hại mắt.',
        'Xem xong thì tắt tivi để tiết kiệm điện.',
      ] },
      { note: 'Không nằm sát tivi hay vừa xem vừa nhảy nhót.' },
    ],
    examples: [
      { q: 'Tivi khác radio ở điểm nào?', a: 'Tivi có cả hình ảnh và âm thanh, radio chỉ có âm thanh.' },
      { q: 'Ngồi xem tivi thế nào là đúng?', a: 'Ngồi xa vừa phải và thẳng lưng.' },
    ],
  },

  'P3CN-w08-quiz': {
    topic: 'Sử dụng điện thoại',
    intro: 'Điện thoại giúp em liên lạc với người ở xa. Cần dùng điện thoại lễ phép và đúng cách.',
    objectives: [
      'Nêu được công dụng của điện thoại.',
      'Biết nói chuyện lễ phép và nhớ các số điện thoại khẩn cấp.',
    ],
    theory: [
      { h: 'Điện thoại dùng để làm gì' },
      { ul: [
        'Gọi, nói chuyện với người ở xa.',
        'Khi gọi cho người lớn cần nói lễ phép, rõ ràng.',
      ] },
      { h: 'Số điện thoại khẩn cấp ở Việt Nam' },
      { ul: [
        '113: gọi công an.',
        '114: gọi cứu hoả khi có cháy.',
        '115: gọi cấp cứu y tế.',
        'Không gọi đùa vào các số khẩn cấp.',
      ] },
      { note: 'Khi dùng điện thoại của bố mẹ, em cần xin phép và dùng đúng việc được cho phép.' },
    ],
    examples: [
      { q: 'Khi có cháy em gọi số nào?', a: 'Gọi 114 để báo cứu hoả.' },
      { q: 'Có được gọi đùa vào số cấp cứu không?', a: 'Không, vì làm phiền và cản trở người cần cứu thật.' },
    ],
  },

  'P3CN-w09-quiz': {
    topic: 'Ôn tập giữa Học kì 1',
    intro: 'Em ôn lại về sản phẩm công nghệ, an toàn điện và cách dùng đồ dùng trong nhà.',
    objectives: [
      'Nhắc lại được cách phân biệt vật tự nhiên và sản phẩm công nghệ.',
      'Nhớ các việc dùng điện an toàn và tiết kiệm.',
    ],
    theory: [
      { h: 'Những điều cần nhớ' },
      { ul: [
        'Sản phẩm công nghệ do con người làm ra (tivi, quạt, đèn, tủ lạnh).',
        'Tắt và rút điện khi không dùng đồ điện nữa.',
        'Không cho que, ngón tay vào ổ cắm điện.',
        'Ngồi xem tivi xa vừa phải, thẳng lưng.',
      ] },
      { h: 'Số khẩn cấp' },
      { ul: [
        '113 công an · 114 cứu hoả · 115 cấp cứu.',
      ] },
      { note: 'Dùng đồ đúng cách và an toàn vừa bảo vệ em vừa giữ đồ bền lâu.' },
    ],
    examples: [
      { q: 'Cái tivi là vật tự nhiên hay sản phẩm công nghệ?', a: 'Là sản phẩm công nghệ.' },
      { q: 'Số gọi cấp cứu y tế là số nào?', a: 'Số 115.' },
    ],
  },

  'P3CN-w10-quiz': {
    topic: 'Sử dụng tủ lạnh',
    intro: 'Tủ lạnh giữ lạnh giúp bảo quản thức ăn lâu hỏng. Dùng tủ lạnh đúng cách giúp tiết kiệm điện.',
    objectives: [
      'Nêu được công dụng của tủ lạnh.',
      'Biết dùng tủ lạnh tiết kiệm điện và giữ vệ sinh.',
    ],
    theory: [
      { h: 'Tủ lạnh dùng để làm gì' },
      { ul: [
        'Giữ lạnh, bảo quản thức ăn tươi lâu.',
      ] },
      { h: 'Dùng tủ lạnh đúng cách' },
      { ul: [
        'Lấy đồ xong đóng cửa lại ngay, không mở cửa quá lâu.',
        'Mở cửa nhiều lần làm thoát hơi lạnh và tốn điện.',
        'Thức ăn nên đậy kín hoặc bọc lại cho sạch và không lẫn mùi.',
        'Lau khô tay trước khi chạm phích cắm.',
      ] },
      { note: 'Đóng cửa tủ nhanh và gọn giúp giữ lạnh và tiết kiệm điện.' },
    ],
    examples: [
      { q: 'Vì sao không nên mở cửa tủ lạnh quá lâu?', a: 'Vì làm thoát hơi lạnh và tốn điện.' },
      { q: 'Thức ăn trong tủ lạnh nên để thế nào?', a: 'Đậy kín hoặc bọc lại.' },
    ],
  },

  'P3CN-w11-quiz': {
    topic: 'Giữ gìn đồ dùng gia đình',
    intro: 'Giữ gìn đồ dùng giúp chúng bền và sử dụng được lâu hơn.',
    objectives: [
      'Hiểu vì sao cần giữ gìn đồ dùng.',
      'Biết các việc làm để đồ dùng luôn bền và sạch.',
    ],
    theory: [
      { h: 'Vì sao phải giữ gìn đồ dùng' },
      { ul: [
        'Đồ bền, dùng được lâu, đỡ tốn tiền mua mới.',
      ] },
      { h: 'Cách giữ gìn đồ dùng' },
      { ul: [
        'Dùng xong cất gọn vào nơi quy định.',
        'Đồ bẩn thì lau chùi cho sạch.',
        'Dùng đúng cách, nhẹ nhàng, không làm rơi đồ điện.',
        'Đồ hỏng nhẹ thì báo người lớn để sửa.',
      ] },
      { note: 'Đồ còn dùng được thì sửa lại, không nên vứt đi ngay.' },
    ],
    examples: [
      { q: 'Dùng đồ chơi xong em nên làm gì?', a: 'Cất gọn vào nơi quy định.' },
      { q: 'Vì sao cần giữ gìn đồ dùng?', a: 'Để đồ bền và dùng được lâu.' },
    ],
  },

  'P3CN-w12-quiz': {
    topic: 'Tiết kiệm điện',
    intro: 'Tiết kiệm điện giúp đỡ tốn tiền và bảo vệ môi trường.',
    objectives: [
      'Nêu được các việc làm giúp tiết kiệm điện.',
      'Phân biệt việc tiết kiệm và việc lãng phí điện.',
    ],
    theory: [
      { h: 'Việc giúp tiết kiệm điện' },
      { ul: [
        'Tắt đèn khi ra khỏi phòng.',
        'Ban ngày mở cửa lấy ánh sáng tự nhiên thay vì bật đèn.',
        'Rút sạc khi pin đã đầy; tắt thiết bị khi không dùng.',
        'Khi đi vắng cả ngày, tắt các thiết bị không cần thiết.',
      ] },
      { h: 'Việc gây lãng phí điện' },
      { ul: [
        'Bật đèn, tivi cả ngày khi không dùng.',
        'Mở cửa tủ lạnh suốt.',
      ] },
      { note: 'Tiết kiệm điện vừa đỡ tiền vừa góp phần bảo vệ môi trường.' },
    ],
    examples: [
      { q: 'Khi trời sáng, em nên dùng ánh sáng nào?', a: 'Mở cửa lấy ánh sáng tự nhiên cho đỡ tốn điện.' },
      { q: 'Để máy tính bật cả đêm không dùng là tiết kiệm hay lãng phí?', a: 'Lãng phí điện.' },
    ],
  },

  'P3CN-w13-quiz': {
    topic: 'An toàn khi dùng đồ dùng điện',
    intro: 'Dùng đồ điện đúng cách giúp em an toàn, tránh bị bỏng hay điện giật.',
    objectives: [
      'Biết kiểm tra đồ điện trước khi dùng.',
      'Biết cách rút phích cắm và xử lí khi có mùi khét.',
    ],
    theory: [
      { h: 'Trước và trong khi dùng' },
      { ul: [
        'Kiểm tra dây và phích còn tốt trước khi dùng.',
        'Đồ điện đang nóng (bàn là) thì tránh chạm, để người lớn dùng.',
        'Không dùng đồ điện ở nơi ẩm ướt, gần nước.',
      ] },
      { h: 'Cách rút phích và xử lí sự cố' },
      { ul: [
        'Rút phích bằng cách cầm vào thân phích, không kéo dây.',
        'Ngửi thấy mùi khét thì tắt, rút điện và báo người lớn ngay.',
      ] },
      { note: 'Mùi khét là dấu hiệu chập điện, có thể gây cháy — phải báo người lớn.' },
    ],
    examples: [
      { q: 'Khi rút phích cắm em cầm vào đâu?', a: 'Cầm vào thân phích, không kéo dây.' },
      { q: 'Ngửi thấy mùi khét từ đồ điện em làm gì?', a: 'Tắt, rút điện và báo người lớn.' },
    ],
  },

  'P3CN-w14-quiz': {
    topic: 'Sắp xếp đồ dùng cá nhân gọn gàng',
    intro: 'Sắp xếp đồ gọn gàng giúp dễ tìm và nhà cửa sạch đẹp.',
    objectives: [
      'Biết để mỗi đồ dùng đúng chỗ quy định.',
      'Hiểu ích lợi của việc sắp xếp gọn gàng.',
    ],
    theory: [
      { h: 'Sắp xếp đồ dùng' },
      { ul: [
        'Sách vở học xong xếp gọn lên giá hoặc vào cặp.',
        'Quần áo gấp rồi xếp gọn vào tủ.',
        'Mỗi đồ dùng để đúng chỗ quy định.',
      ] },
      { h: 'Ích lợi' },
      { ul: [
        'Dễ tìm đồ, không bị thất lạc.',
        'Nhà cửa, bàn học sạch đẹp; tránh vấp ngã.',
      ] },
      { note: 'Bàn học gọn gàng, sạch sẽ giúp em học tốt hơn.' },
    ],
    examples: [
      { q: 'Học xong em để sách vở ở đâu?', a: 'Xếp gọn lên giá hoặc vào cặp sách.' },
      { q: 'Vì sao cần sắp xếp đồ gọn gàng?', a: 'Để dễ tìm và nhà cửa sạch đẹp.' },
    ],
  },

  'P3CN-w15-quiz': {
    topic: 'Làm đồ dùng học tập thủ công (1)',
    intro: 'Em có thể tự làm những đồ dùng học tập đơn giản bằng giấy, bìa.',
    objectives: [
      'Biết chuẩn bị vật liệu, dụng cụ trước khi làm.',
      'Hiểu ích lợi của việc tự làm đồ dùng học tập.',
    ],
    theory: [
      { h: 'Đồ dùng học tập tự làm' },
      { ul: [
        'Hộp đựng bút, bìa kẹp, nhãn vở... làm bằng bìa, giấy.',
      ] },
      { h: 'Các bước cần nhớ' },
      { ul: [
        'Chuẩn bị đủ vật liệu, dụng cụ trước khi làm.',
        'Dùng kéo để cắt bìa, giấy.',
        'Làm xong dọn dẹp chỗ làm cho sạch.',
      ] },
      { note: 'Tự làm đồ dùng giúp em khéo tay hơn và tiết kiệm tiền.' },
    ],
    examples: [
      { q: 'Trước khi làm đồ thủ công em cần làm gì?', a: 'Chuẩn bị đủ vật liệu và dụng cụ.' },
      { q: 'Dùng dụng cụ nào để cắt bìa?', a: 'Cái kéo.' },
    ],
  },

  'P3CN-w16-quiz': {
    topic: 'Làm đồ dùng học tập thủ công (2)',
    intro: 'Để sản phẩm thủ công đẹp và chắc, em cần làm cẩn thận, kiên nhẫn.',
    objectives: [
      'Biết dùng hồ dán và gấp giấy đúng cách.',
      'Biết trang trí và làm việc cẩn thận, kiên nhẫn.',
    ],
    theory: [
      { h: 'Dán và gấp đúng cách' },
      { ul: [
        'Dùng hồ dán hoặc keo để dán giấy cho dính chắc.',
        'Gấp giấy thẳng, miết kĩ nếp gấp cho đẹp.',
      ] },
      { h: 'Trang trí và thái độ làm việc' },
      { ul: [
        'Tô màu, dán hình để sản phẩm sinh động hơn.',
        'Làm việc cẩn thận, kiên nhẫn, không tranh giành dụng cụ.',
      ] },
      { note: 'Sản phẩm làm xong có thể dùng để học hoặc làm quà tặng người thân.' },
    ],
    examples: [
      { q: 'Để dán hai mảnh giấy em dùng gì?', a: 'Hồ dán hoặc keo.' },
      { q: 'Làm thế nào để nếp gấp đẹp?', a: 'Gấp thẳng và miết kĩ nếp gấp.' },
    ],
  },

  'P3CN-w17-quiz': {
    topic: 'Vật liệu làm thủ công (giấy, bìa)',
    intro: 'Giấy và bìa là vật liệu quen thuộc để làm đồ thủ công. Cần biết chọn và dùng an toàn.',
    objectives: [
      'Phân biệt được giấy mỏng và bìa cứng.',
      'Biết tận dụng vật liệu cũ và để giấy bìa xa lửa.',
    ],
    theory: [
      { h: 'Giấy và bìa' },
      { ul: [
        'Giấy, bìa dễ cắt, dễ gấp nên hay dùng làm thủ công.',
        'Bìa dày và cứng hơn giấy, giữ được dáng tốt hơn.',
        'Cần làm hộp chắc thì dùng bìa cứng.',
      ] },
      { h: 'Tiết kiệm và an toàn' },
      { ul: [
        'Tận dụng bìa, hộp giấy cũ để tiết kiệm và bảo vệ môi trường.',
        'Giấy, bìa dễ cháy nên phải để xa lửa.',
      ] },
      { note: 'Không đốt giấy, bìa và không để chúng cạnh bếp gas.' },
    ],
    examples: [
      { q: 'Muốn làm hộp chắc chắn em dùng giấy hay bìa cứng?', a: 'Dùng bìa cứng.' },
      { q: 'Giấy bìa dễ cháy nên em cần làm gì?', a: 'Để xa lửa cho an toàn.' },
    ],
  },

  'P3CN-w18-quiz': {
    topic: 'Ôn tập cuối Học kì 1',
    intro: 'Em ôn lại tiết kiệm điện, an toàn điện và làm đồ thủ công bằng giấy, bìa.',
    objectives: [
      'Nhớ cách tiết kiệm điện và an toàn điện.',
      'Nhớ dụng cụ, vật liệu làm thủ công.',
    ],
    theory: [
      { h: 'Những điều cần nhớ' },
      { ul: [
        'Tắt đèn khi không dùng để tiết kiệm điện.',
        'Dây điện hở thì tránh xa, báo người lớn.',
        'Kéo dùng để cắt giấy, bìa; hồ dán dùng để dán giấy.',
        'Ngồi xem tivi xa vừa phải, xem vừa phải.',
      ] },
      { note: 'Dùng đồ an toàn, tiết kiệm và làm thủ công cẩn thận là điều em đã học.' },
    ],
    examples: [
      { q: 'Cách nào giúp tiết kiệm điện?', a: 'Tắt đèn khi không dùng.' },
      { q: 'Để dán hai mảnh giấy em dùng gì?', a: 'Hồ dán.' },
    ],
  },

  'P3CN-w19-quiz': {
    topic: 'Dụng cụ thủ công an toàn (kéo, hồ dán)',
    intro: 'Kéo và hồ dán là dụng cụ thường dùng. Dùng đúng cách giúp em an toàn.',
    objectives: [
      'Biết cách cầm, đưa và cất kéo an toàn.',
      'Biết giữ vệ sinh khi dùng hồ dán.',
    ],
    theory: [
      { h: 'Dùng kéo an toàn' },
      { ul: [
        'Đưa kéo cho bạn: cầm phần lưỡi, chìa phần tay cầm về phía bạn.',
        'Khi cắt thì ngồi yên, cắt cẩn thận, không vừa cắt vừa chạy.',
        'Dùng xong cất kéo vào hộp, hướng mũi xuống.',
        'Không dùng kéo để chọc, đùa nghịch với bạn.',
      ] },
      { h: 'Dùng hồ dán' },
      { ul: [
        'Hồ dính tay thì rửa tay sạch.',
        'Không cho hồ dán vào miệng hay bôi lên mắt.',
      ] },
      { note: 'Kéo có mũi nhọn — luôn cẩn thận để không làm bị thương mình và bạn.' },
    ],
    examples: [
      { q: 'Đưa kéo cho bạn em chìa phần nào về phía bạn?', a: 'Chìa phần tay cầm, cầm phần lưỡi.' },
      { q: 'Hồ dán dính tay em nên làm gì?', a: 'Rửa tay cho sạch.' },
    ],
  },

  'P3CN-w20-quiz': {
    topic: 'Gấp, cắt, dán giấy',
    intro: 'Gấp, cắt, dán là các kĩ năng cơ bản để làm sản phẩm bằng giấy.',
    objectives: [
      'Biết thứ tự các bước gấp, cắt, dán.',
      'Biết làm cẩn thận để sản phẩm đẹp.',
    ],
    theory: [
      { h: 'Các bước thường gặp' },
      { ul: [
        'Gấp giấy theo nếp, miết mạnh cho nếp thẳng đẹp.',
        'Cắt theo đúng nét vẽ, vừa cắt vừa nhìn.',
        'Bôi hồ một lượng vừa phải, đều tay rồi dán.',
      ] },
      { p: 'Sản phẩm gấp, cắt, dán quen thuộc như bông hoa giấy, ngôi sao, con vật bằng giấy.' },
      { note: 'Bôi quá nhiều hồ sẽ làm lem và ướt giấy.' },
    ],
    examples: [
      { q: 'Làm thế nào để nếp gấp thẳng đẹp?', a: 'Miết mạnh theo nếp gấp.' },
      { q: 'Khi cắt theo đường vẽ em nên cắt thế nào?', a: 'Cắt theo đúng nét vẽ.' },
    ],
  },

  'P3CN-w21-quiz': {
    topic: 'Làm biển báo giao thông bằng bìa',
    intro: 'Biển báo giao thông giúp người đi đường biết quy định và đi an toàn.',
    objectives: [
      'Biết công dụng của biển báo giao thông.',
      'Biết vật liệu và đặc điểm một số biển báo.',
    ],
    theory: [
      { h: 'Biển báo giao thông' },
      { ul: [
        'Biển báo báo hiệu, hướng dẫn người đi đường.',
        'Đèn đỏ nghĩa là phải dừng lại.',
        'Biển cấm thường có hình tròn, viền đỏ.',
      ] },
      { h: 'Làm biển báo bằng bìa' },
      { ul: [
        'Vật liệu: bìa cứng, bút màu, kéo, hồ.',
        'Vẽ và tô màu cho giống biển báo thật.',
      ] },
      { note: 'Làm biển báo giúp em hiểu thêm luật và an toàn giao thông.' },
    ],
    examples: [
      { q: 'Đèn đỏ báo cho người đi đường điều gì?', a: 'Phải dừng lại.' },
      { q: 'Biển cấm thường có hình và màu gì?', a: 'Hình tròn, viền đỏ.' },
    ],
  },

  'P3CN-w22-quiz': {
    topic: 'Làm đồ chơi đơn giản (1)',
    intro: 'Em có thể tự làm những đồ chơi đơn giản như chong chóng giấy.',
    objectives: [
      'Biết một số đồ chơi đơn giản tự làm được.',
      'Biết chọn vật liệu an toàn.',
    ],
    theory: [
      { h: 'Đồ chơi tự làm' },
      { ul: [
        'Chong chóng giấy là đồ chơi đơn giản em làm được.',
        'Đón gió hoặc thổi sẽ làm chong chóng quay.',
      ] },
      { h: 'Chọn vật liệu' },
      { ul: [
        'Dùng vật liệu an toàn, phù hợp; tránh đồ sắc nhọn, dễ vỡ, độc hại.',
        'Đồ chơi hỏng thì sửa lại nếu được.',
      ] },
      { note: 'Tự làm đồ chơi giúp em khéo tay và thêm niềm vui.' },
    ],
    examples: [
      { q: 'Làm thế nào để chong chóng quay?', a: 'Đón gió hoặc thổi vào chong chóng.' },
      { q: 'Nên chọn vật liệu thế nào khi làm đồ chơi?', a: 'Vật liệu an toàn, phù hợp.' },
    ],
  },

  'P3CN-w23-quiz': {
    topic: 'Làm đồ chơi đơn giản (2)',
    intro: 'Khi làm đồ chơi, em nên lên ý tưởng, tận dụng vật liệu cũ và làm cùng bạn.',
    objectives: [
      'Biết lên ý tưởng và chuẩn bị trước khi làm.',
      'Biết hợp tác với bạn và làm an toàn.',
    ],
    theory: [
      { h: 'Chuẩn bị và vật liệu' },
      { ul: [
        'Lên ý tưởng và chuẩn bị vật liệu trước khi làm.',
        'Tận dụng chai nhựa, hộp giấy cũ để làm đồ chơi.',
      ] },
      { h: 'Làm cùng bạn, làm an toàn' },
      { ul: [
        'Hợp tác, chia sẻ dụng cụ với bạn.',
        'Cẩn thận với kéo và hồ; làm xong dọn sạch chỗ làm.',
      ] },
      { note: 'Không dùng tiền, thuốc hay thức ăn còn dùng được để làm đồ chơi.' },
    ],
    examples: [
      { q: 'Vật liệu nào tận dụng được để làm đồ chơi?', a: 'Chai nhựa, hộp giấy cũ.' },
      { q: 'Làm đồ chơi cùng bạn em nên thế nào?', a: 'Hợp tác và chia sẻ dụng cụ.' },
    ],
  },

  'P3CN-w24-quiz': {
    topic: 'Làm sản phẩm trang trí lớp',
    intro: 'Em cùng các bạn làm sản phẩm trang trí để lớp học đẹp và vui hơn.',
    objectives: [
      'Biết một số sản phẩm trang trí lớp.',
      'Biết hợp tác và tiết kiệm khi trang trí.',
    ],
    theory: [
      { h: 'Sản phẩm trang trí lớp' },
      { ul: [
        'Dây hoa giấy, tranh dán, đèn lồng giấy...',
        'Trang trí giúp lớp đẹp, tạo không khí vui để học.',
      ] },
      { h: 'Cùng nhau trang trí' },
      { ul: [
        'Phân công và hợp tác với các bạn.',
        'Tận dụng giấy màu, vật liệu cũ cho tiết kiệm.',
        'Trang trí xong dọn dẹp cho lớp gọn gàng, sạch sẽ.',
      ] },
      { note: 'Trang trí đẹp nhưng phải giữ lớp sạch, không vương vãi giấy vụn.' },
    ],
    examples: [
      { q: 'Kể một sản phẩm trang trí lớp.', a: 'Ví dụ: dây hoa giấy hoặc tranh dán.' },
      { q: 'Cùng nhau trang trí lớp các bạn nên thế nào?', a: 'Phân công và hợp tác.' },
    ],
  },

  'P3CN-w25-quiz': {
    topic: 'Làm thiệp chúc mừng',
    intro: 'Thiệp chúc mừng dùng để gửi lời chúc tốt đẹp tới người khác.',
    objectives: [
      'Biết công dụng và vật liệu làm thiệp.',
      'Biết viết lời chúc lễ phép và tặng thiệp ý nghĩa.',
    ],
    theory: [
      { h: 'Làm thiệp' },
      { ul: [
        'Vật liệu: giấy bìa, bút màu, hồ.',
        'Trên thiệp viết lời chúc tốt đẹp, lễ phép.',
      ] },
      { h: 'Tặng thiệp' },
      { ul: [
        'Tặng ông bà, bố mẹ, thầy cô để thể hiện tình cảm.',
      ] },
      { note: 'Thiệp tự làm chứa tình cảm và công sức của em nên rất ý nghĩa.' },
    ],
    examples: [
      { q: 'Trên thiệp em nên viết gì?', a: 'Lời chúc tốt đẹp, lễ phép.' },
      { q: 'Vì sao thiệp tự làm ý nghĩa hơn?', a: 'Vì chứa tình cảm và công sức của em.' },
    ],
  },

  'P3CN-w26-quiz': {
    topic: 'Làm sản phẩm từ vật liệu tái chế',
    intro: 'Vật liệu tái chế là đồ đã dùng được tận dụng lại để làm việc khác.',
    objectives: [
      'Hiểu thế nào là vật liệu tái chế.',
      'Biết ích lợi của tái chế và cách dùng đồ tái chế.',
    ],
    theory: [
      { h: 'Vật liệu tái chế' },
      { ul: [
        'Là đồ đã dùng có thể tận dụng lại: chai nhựa, lon, hộp giấy cũ.',
        'Tái chế giúp giảm rác thải và bảo vệ môi trường.',
      ] },
      { h: 'Dùng đồ tái chế' },
      { ul: [
        'Rửa sạch, để khô chai, lon cũ trước khi làm.',
        'Từ chai nhựa cũ có thể làm chậu trồng cây nhỏ.',
      ] },
      { note: 'Không dùng thuốc, tiền hay thức ăn còn dùng được để làm thủ công.' },
    ],
    examples: [
      { q: 'Tái chế đồ cũ giúp ích gì cho môi trường?', a: 'Giảm rác thải và bảo vệ môi trường.' },
      { q: 'Từ chai nhựa cũ em có thể làm gì?', a: 'Chậu trồng cây nhỏ.' },
    ],
  },

  'P3CN-w27-quiz': {
    topic: 'Trồng và chăm sóc cây trong chậu',
    intro: 'Cây xanh cần nước, ánh sáng và đất để sống. Em có thể trồng và chăm cây trong chậu.',
    objectives: [
      'Biết cây cần gì để sống và lớn lên.',
      'Biết cách trồng và chăm sóc cây trong chậu.',
    ],
    theory: [
      { h: 'Cây cần gì để sống' },
      { ul: [
        'Cây cần nước, ánh sáng và đất.',
      ] },
      { h: 'Trồng và chăm cây' },
      { ul: [
        'Cần đất, hạt hoặc cây con và nước để trồng.',
        'Tưới nước vừa đủ, nhổ cỏ dại; không tưới quá nhiều làm úng cây.',
        'Đặt chậu nơi có ánh sáng, gần cửa sổ.',
      ] },
      { note: 'Trồng và chăm cây giúp em yêu thiên nhiên và biết chăm sóc.' },
    ],
    examples: [
      { q: 'Cây cần gì để sống và lớn lên?', a: 'Cần nước, ánh sáng và đất.' },
      { q: 'Nên đặt chậu cây ở đâu?', a: 'Nơi có ánh sáng, gần cửa sổ.' },
    ],
  },

  'P3CN-w28-quiz': {
    topic: 'Làm sản phẩm thủ công theo nhóm',
    intro: 'Làm việc theo nhóm là cùng nhau làm và giúp đỡ lẫn nhau.',
    objectives: [
      'Hiểu thế nào là làm việc theo nhóm.',
      'Biết phân công, giúp đỡ và tôn trọng nhau.',
    ],
    theory: [
      { h: 'Làm việc theo nhóm' },
      { ul: [
        'Cùng nhau làm, giúp đỡ nhau hoàn thành sản phẩm.',
        'Công việc được phân công cho mỗi bạn.',
      ] },
      { h: 'Tinh thần nhóm' },
      { ul: [
        'Bạn gặp khó thì giúp đỡ.',
        'Lắng nghe và tôn trọng nhau.',
        'Sản phẩm là công sức của cả nhóm cùng cố gắng.',
      ] },
      { note: 'Phân công và hợp tác giúp nhóm làm nhanh và đẹp hơn.' },
    ],
    examples: [
      { q: 'Trong nhóm công việc nên được làm thế nào?', a: 'Phân công cho mỗi bạn.' },
      { q: 'Bạn trong nhóm gặp khó em nên làm gì?', a: 'Giúp đỡ bạn.' },
    ],
  },

  'P3CN-w29-quiz': {
    topic: 'Trưng bày sản phẩm',
    intro: 'Trưng bày là bày sản phẩm ra cho mọi người cùng xem.',
    objectives: [
      'Hiểu thế nào là trưng bày sản phẩm.',
      'Biết sắp xếp sản phẩm đẹp và ứng xử lịch sự.',
    ],
    theory: [
      { h: 'Trưng bày sản phẩm' },
      { ul: [
        'Bày sản phẩm ra ngay ngắn, gọn đẹp cho mọi người xem.',
      ] },
      { h: 'Ứng xử khi trưng bày' },
      { ul: [
        'Xem sản phẩm của bạn thì khen và góp ý lịch sự.',
        'Trưng bày giúp em tự tin và học hỏi lẫn nhau.',
        'Trưng bày xong thu dọn sản phẩm gọn gàng.',
      ] },
      { note: 'Không chê bai hay phá hỏng sản phẩm của bạn.' },
    ],
    examples: [
      { q: 'Khi trưng bày, sản phẩm nên được sắp xếp thế nào?', a: 'Ngay ngắn, gọn đẹp.' },
      { q: 'Xem sản phẩm của bạn em nên làm gì?', a: 'Khen và góp ý lịch sự.' },
    ],
  },

  'P3CN-w30-quiz': {
    topic: 'Đánh giá sản phẩm thủ công',
    intro: 'Đánh giá giúp em biết điểm tốt và điểm cần sửa của sản phẩm.',
    objectives: [
      'Nêu được đặc điểm của một sản phẩm đẹp.',
      'Biết đánh giá thật lòng, lịch sự và cố gắng tiến bộ.',
    ],
    theory: [
      { h: 'Sản phẩm đẹp' },
      { ul: [
        'Gọn gàng, chắc chắn, sạch sẽ.',
      ] },
      { h: 'Cách đánh giá' },
      { ul: [
        'Nói thật, lịch sự, có khen có góp ý.',
        'Sản phẩm chưa đẹp thì cố gắng làm tốt hơn lần sau.',
        'Lời góp ý của bạn là để giúp em làm tốt hơn.',
      ] },
      { note: 'Đánh giá giúp em biết điểm tốt và điểm cần cải thiện để tiến bộ.' },
    ],
    examples: [
      { q: 'Một sản phẩm thủ công đẹp thường thế nào?', a: 'Gọn gàng, chắc chắn, sạch sẽ.' },
      { q: 'Sản phẩm của em chưa đẹp em nên làm gì?', a: 'Cố gắng làm tốt hơn lần sau.' },
    ],
  },

  'P3CN-w31-quiz': {
    topic: 'An toàn lao động khi làm thủ công',
    intro: 'Khi làm thủ công cần chú ý an toàn để không bị thương.',
    objectives: [
      'Biết cách dùng vật sắc nhọn an toàn.',
      'Biết xử lí khi bị đứt tay và giữ chỗ làm an toàn.',
    ],
    theory: [
      { h: 'Dùng vật sắc nhọn an toàn' },
      { ul: [
        'Dùng kéo, vật sắc nhọn phải cẩn thận, làm chậm rãi.',
        'Không cho hồ dán hay vật nhỏ vào miệng.',
      ] },
      { h: 'Chỗ làm và xử lí khi bị thương' },
      { ul: [
        'Chỗ làm nên đủ sáng, gọn gàng.',
        'Bị đứt tay nhẹ thì báo người lớn để sơ cứu.',
        'Vật liệu, dụng cụ dùng xong cất gọn đúng nơi.',
      ] },
      { note: 'Không bôi đất cát vào vết thương vì dễ nhiễm trùng.' },
    ],
    examples: [
      { q: 'Bị đứt tay nhẹ em nên làm gì?', a: 'Báo người lớn để được xử lí, sơ cứu.' },
      { q: 'Chỗ làm thủ công nên thế nào?', a: 'Đủ sáng và gọn gàng.' },
    ],
  },

  'P3CN-w32-quiz': {
    topic: 'Em yêu lao động thủ công',
    intro: 'Làm sản phẩm thủ công rèn cho em sự khéo tay và kiên nhẫn.',
    objectives: [
      'Hiểu ích lợi của lao động thủ công.',
      'Biết tôn trọng người lao động và yêu lao động.',
    ],
    theory: [
      { h: 'Lao động thủ công rèn điều gì' },
      { ul: [
        'Rèn sự khéo tay và kiên nhẫn.',
        'Gặp khó thì kiên nhẫn cố gắng hoặc nhờ người giúp.',
      ] },
      { h: 'Tôn trọng lao động' },
      { ul: [
        'Sản phẩm tự làm chứa công sức và tình cảm nên ý nghĩa.',
        'Người lao động khéo tay (như thợ làm gốm) đáng được tôn trọng.',
      ] },
      { note: 'Yêu lao động thì chăm chỉ, sáng tạo làm sản phẩm.' },
    ],
    examples: [
      { q: 'Làm thủ công rèn cho em điều gì?', a: 'Sự khéo tay và kiên nhẫn.' },
      { q: 'Người thợ làm gốm khéo tay đáng được gì?', a: 'Đáng được tôn trọng.' },
    ],
  },

  'P3CN-w33-quiz': {
    topic: 'Dự án sản phẩm công nghệ nhỏ',
    intro: 'Một dự án nhỏ giúp em vận dụng những điều đã học để làm ra sản phẩm.',
    objectives: [
      'Biết các bước làm một dự án nhỏ.',
      'Biết hợp tác và sửa lỗi khi làm dự án.',
    ],
    theory: [
      { h: 'Các bước làm dự án' },
      { ul: [
        'Bước đầu: lên ý tưởng và kế hoạch.',
        'Phân công và hợp tác trong nhóm.',
        'Gặp lỗi sai thì tìm cách sửa và làm lại.',
      ] },
      { p: 'Dự án nhỏ phù hợp như làm đèn ngủ trang trí bằng giấy, làm mô hình bằng bìa.' },
      { note: 'Hoàn thành dự án giúp em tự tin, biết hợp tác và sáng tạo.' },
    ],
    examples: [
      { q: 'Bước đầu tiên khi làm dự án nhỏ là gì?', a: 'Lên ý tưởng và kế hoạch.' },
      { q: 'Gặp lỗi sai khi làm dự án em nên làm gì?', a: 'Tìm cách sửa và làm lại.' },
    ],
  },

  'P3CN-w34-quiz': {
    topic: 'Sử dụng đồ dùng công nghệ thông minh',
    intro: 'Đồ dùng công nghệ thông minh giúp con người làm việc tiện lợi và nhanh hơn.',
    objectives: [
      'Biết ích lợi của đồ dùng công nghệ thông minh.',
      'Biết dùng thiết bị đúng giờ và an toàn trên mạng.',
    ],
    theory: [
      { h: 'Dùng thiết bị đúng cách' },
      { ul: [
        'Dùng điện thoại, máy tính bảng để học thì dùng đúng việc, đúng giờ.',
        'Dùng thiết bị màn hình quá lâu gây mỏi và hại mắt.',
        'Không hiểu cách dùng thì hỏi người lớn.',
      ] },
      { h: 'An toàn trên mạng' },
      { ul: [
        'Chưa rõ thông tin trên mạng thì hỏi người lớn.',
        'Không làm theo người lạ, không cho người lạ địa chỉ nhà.',
      ] },
      { note: 'Không phải mọi thông tin trên mạng đều đúng — cần hỏi người lớn khi chưa rõ.' },
    ],
    examples: [
      { q: 'Dùng thiết bị màn hình quá lâu có thể gây gì?', a: 'Mỏi mắt, hại mắt.' },
      { q: 'Gặp người lạ nhắn tin trên mạng em nên làm gì?', a: 'Không làm theo và hỏi người lớn.' },
    ],
  },

  'P3CN-w35-quiz': {
    topic: 'Ôn tập cuối năm',
    intro: 'Em ôn lại cả năm: sản phẩm công nghệ, an toàn – tiết kiệm điện và làm thủ công.',
    objectives: [
      'Nhớ phân biệt sản phẩm công nghệ và cách dùng điện an toàn.',
      'Nhớ dụng cụ thủ công và ích lợi của tái chế.',
    ],
    theory: [
      { h: 'Những điều cần nhớ' },
      { ul: [
        'Quạt điện, tivi, tủ lạnh... là sản phẩm công nghệ do con người làm ra.',
        'Không chạm ổ cắm, dây hở; dùng điện an toàn.',
        'Kéo dùng để cắt giấy, bìa.',
        'Tận dụng vật liệu tái chế giúp giảm rác và bảo vệ môi trường.',
        'Dùng thiết bị công nghệ để học đúng việc, đúng giờ.',
      ] },
      { note: 'Cả năm em đã học dùng đồ an toàn, tiết kiệm và làm thủ công khéo léo.' },
    ],
    examples: [
      { q: 'Vật nào là sản phẩm công nghệ: quạt điện hay cây xanh?', a: 'Quạt điện.' },
      { q: 'Tận dụng vật liệu tái chế giúp ích gì?', a: 'Giảm rác và bảo vệ môi trường.' },
    ],
  },

  'P3CN-w36-quiz': {
    topic: 'Kết thúc Lớp 3 — Công nghệ: Đôi tay khéo léo, tâm hồn sáng tạo',
    intro: 'Một năm Công nghệ Lớp 3 đầy khéo léo và sáng tạo sắp kết thúc! Em đã làm quen với kĩ thuật thủ công, nông nghiệp, và gia đình. Hôm nay cùng nhìn lại những gì đã học và chuẩn bị cho những dự án mới nhé!',
    objectives: [
      'Tổng kết kĩ năng công nghệ thủ công và kiến thức nhà nông đã học.',
      'Hiểu ý nghĩa của công nghệ trong đời sống gia đình.',
      'Có ý tưởng dự án công nghệ sáng tạo trong kỳ hè.',
    ],
    theory: [
      { h: 'Ba lĩnh vực Công nghệ Lớp 3 em đã khám phá' },
      { ul: [
        'THỦ CÔNG KĨ THUẬT: Cắt, gấp, dán giấy; làm đồ thủ công từ vật liệu tái chế; đọc và thực hiện theo hướng dẫn đơn giản.',
        'NÔNG NGHIỆP GIA ĐÌNH: Trồng cây rau và hoa trong chậu; tưới nước và chăm sóc cây; hiểu về đất và phân bón tự nhiên.',
        'GIA ĐÌNH - KĨ THUẬT: Sử dụng an toàn các đồ dùng gia đình; nấu ăn đơn giản; giữ gìn vật dụng trong nhà.',
      ] },
      { h: 'Tư duy thiết kế — em đã có!' },
      { p: 'Khi làm một sản phẩm thủ công, em trải qua quy trình: (1) Xác định cần làm gì → (2) Lên ý tưởng và lập kế hoạch → (3) Thực hiện → (4) Kiểm tra và hoàn thiện. Đây chính là "tư duy thiết kế" mà các kĩ sư và kiến trúc sư dùng hàng ngày!' },
      { h: 'Dự án Công nghệ hè' },
      { ul: [
        'Trồng 1 chậu rau hoặc 1 khóm hoa ở ban công/sân nhà — chăm sóc đến hết hè.',
        'Làm 1 đồ vật từ vật liệu tái chế: hộp bút từ lon nước, kệ sách từ bìa carton.',
        'Học nấu 1 món ăn đơn giản cùng bố/mẹ.',
      ] },
      { note: 'Người giỏi Công nghệ không nhất thiết phải dùng máy móc đắt tiền — chỉ cần đôi tay khéo léo, óc sáng tạo và tinh thần không bỏ cuộc là đủ!' },
    ],
    examples: [
      { q: 'Kể các bước trồng 1 chậu rau xà lách từ hạt giống.', a: '1. Chuẩn bị chậu đất (đất sạch, tơi). 2. Gieo hạt (sâu 0,5cm). 3. Tưới nước nhẹ. 4. Đặt chỗ có ánh sáng. 5. Tưới mỗi ngày. 6. Thu hoạch sau 30–40 ngày.' },
      { q: 'Kể 3 vật liệu tái chế có thể dùng để làm đồ thủ công.', a: 'Chai nhựa (làm lọ hoa, hộp đựng bút); hộp carton (làm kệ sách, hộp đồ chơi); lon nước (làm chậu trồng cây, đèn trang trí).' },
    ],
  },
};
