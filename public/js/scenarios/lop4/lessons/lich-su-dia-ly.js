// ============================================================
// Lớp 4 · LỊCH SỬ & ĐỊA LÝ — Lý thuyết + Ví dụ 35 tuần (GDPT 2018)
// Key TRÙNG id quiz: "P4LSDL-wNN-quiz".
// HK1 (1–18): ĐỊA LÝ các vùng + di sản văn hoá.
// HK2 (19–35): LỊCH SỬ Việt Nam từ Văn Lang đến thế kỉ XX.
// ============================================================

export const P4LSDL_LESSONS = {
  'P4LSDL-w01-quiz': {
    topic: 'Bản đồ và cách sử dụng',
    intro: 'Chào các em lớp 4! Tuần đầu môn Lịch sử & Địa lý, cô trò mình cùng học cách đọc một tấm bản đồ nhé!',
    objectives: [
      'Hiểu bản đồ là gì.',
      'Đọc các kí hiệu cơ bản trên bản đồ.',
      'Xác định 4 phương hướng chính.',
    ],
    theory: [
      { h: 'Bản đồ là gì?' },
      { p: 'Bản đồ là HÌNH VẼ THU NHỎ một phần hoặc toàn bộ Trái Đất trên mặt phẳng giấy, theo một tỉ lệ nhất định.' },
      { h: 'Các yếu tố cơ bản' },
      { ul: [
        'Tên bản đồ: cho biết bản đồ thể hiện gì.',
        'Hướng: thường BẮC ở trên, NAM ở dưới, ĐÔNG bên phải, TÂY bên trái.',
        'Tỉ lệ: cho biết 1cm trên bản đồ ứng với bao nhiêu km thực địa.',
        'Bảng chú giải (kí hiệu): giải thích các kí hiệu.',
      ] },
      { h: 'Một số kí hiệu' },
      { ul: [
        'Đường màu xanh: sông.',
        'Vùng màu xanh dương đậm: biển.',
        'Hình tam giác: núi.',
        'Ngôi sao: thủ đô.',
        'Chấm tròn: thành phố.',
      ] },
      { note: 'Nhớ quy tắc "Bắc trên – Nam dưới – Đông phải – Tây trái" trên hầu hết bản đồ.' },
    ],
    examples: [
      { q: 'Trên bản đồ, hướng Bắc thường ở đâu?', a: 'Ở PHÍA TRÊN của bản đồ. Theo quy tắc: Bắc trên, Nam dưới, Đông phải, Tây trái.' },
      { q: 'Kí hiệu ngôi sao trên bản đồ Việt Nam ở Hà Nội nghĩa là gì?', a: 'Hà Nội là THỦ ĐÔ của Việt Nam — ngôi sao thường biểu thị thủ đô.' },
    ],
  },

  'P4LSDL-w02-quiz': {
    topic: 'Thiên nhiên Việt Nam',
    intro: 'Các em ơi, đất nước Việt Nam có thiên nhiên rất đa dạng. Cùng tìm hiểu vị trí và đặc điểm chung nhé!',
    objectives: [
      'Biết vị trí địa lý Việt Nam.',
      'Hiểu khí hậu nhiệt đới gió mùa.',
      'Kể tên một số dạng địa hình chính.',
    ],
    theory: [
      { h: 'Vị trí Việt Nam' },
      { ul: [
        'Nằm ở Đông Nam Á.',
        'Giáp Trung Quốc (phía Bắc), Lào và Cam-pu-chia (phía Tây).',
        'Phía Đông và Nam giáp Biển Đông.',
        'Diện tích khoảng 331.000 km², dân số ~100 triệu người.',
        'Thủ đô: Hà Nội.',
      ] },
      { h: 'Khí hậu' },
      { p: 'Việt Nam thuộc vùng KHÍ HẬU NHIỆT ĐỚI GIÓ MÙA: nóng, ẩm, mưa nhiều. Miền Bắc có 4 mùa rõ rệt; miền Nam có 2 mùa: mưa và khô.' },
      { h: 'Địa hình' },
      { ul: [
        '3/4 diện tích là đồi núi.',
        '1/4 là đồng bằng (chủ yếu Đồng bằng Bắc Bộ và Đồng bằng Nam Bộ).',
        'Bờ biển dài hơn 3.260 km.',
      ] },
      { note: 'Việt Nam có hình chữ S kéo dài từ Bắc xuống Nam, hẹp ngang ở miền Trung.' },
    ],
    examples: [
      { q: 'Việt Nam thuộc khu vực nào của châu Á?', a: 'Đông Nam Á — nằm ở phía đông của bán đảo Đông Dương.' },
      { q: 'Vì sao miền Nam Việt Nam chỉ có 2 mùa?', a: 'Vì miền Nam gần xích đạo, nóng quanh năm; chỉ phân biệt MÙA MƯA (tháng 5–11) và MÙA KHÔ (tháng 12–4).' },
    ],
  },

  'P4LSDL-w03-quiz': {
    topic: 'Vùng Trung du và miền núi Bắc Bộ',
    intro: 'Tuần này các em cùng cô đi thăm vùng đất phía Bắc với những dãy núi hùng vĩ và ruộng bậc thang nhé!',
    objectives: [
      'Biết vị trí vùng Trung du miền núi Bắc Bộ.',
      'Đặc điểm địa hình, dân tộc.',
      'Sản vật và danh thắng nổi tiếng.',
    ],
    theory: [
      { h: 'Vị trí' },
      { p: 'Nằm ở phía BẮC Việt Nam, giáp Trung Quốc và Lào. Sau sáp nhập 2025, vùng gồm 9 tỉnh: Tuyên Quang, Lào Cai, Thái Nguyên, Phú Thọ, Cao Bằng, Lạng Sơn, Sơn La, Lai Châu, Điện Biên.' },
      { h: 'Địa hình' },
      { ul: [
        'Nhiều núi cao: dãy Hoàng Liên Sơn — đỉnh PHAN-XI-PĂNG cao 3.143 m (cao nhất Việt Nam, "nóc nhà Đông Dương").',
        'Cao nguyên đá Đồng Văn (Hà Giang cũ, nay thuộc Tuyên Quang).',
        'Ruộng bậc thang nổi tiếng: Mù Cang Chải, Sa Pa, Hoàng Su Phì.',
      ] },
      { h: 'Dân tộc & văn hoá' },
      { p: 'Là nơi sinh sống của nhiều dân tộc thiểu số: Tày, Nùng, Thái, Mường, Mông, Dao… Mỗi dân tộc có trang phục, lễ hội, tiếng nói riêng.' },
      { h: 'Sản vật' },
      { ul: [
        'Cây công nghiệp: chè (Thái Nguyên), cà phê (Sơn La).',
        'Khoáng sản: than (Quảng Ninh), thiếc, sắt.',
        'Du lịch: Sa Pa (Lào Cai), Hồ Ba Bể (Bắc Kạn cũ, nay thuộc Thái Nguyên).',
      ] },
      { note: 'Phan-xi-păng cao 3.143 m, được mệnh danh là "nóc nhà Đông Dương" — cao nhất bán đảo Đông Dương.' },
    ],
    examples: [
      { q: 'Đỉnh núi cao nhất Việt Nam tên gì? Cao bao nhiêu mét?', a: 'Đỉnh PHAN-XI-PĂNG (Fansipan), cao 3.143 m, thuộc dãy Hoàng Liên Sơn (Lào Cai).' },
      { q: 'Ruộng bậc thang ở vùng nào của Việt Nam?', a: 'Vùng TRUNG DU MIỀN NÚI BẮC BỘ — nổi tiếng có Mù Cang Chải (Yên Bái cũ, nay thuộc Lào Cai), Sa Pa (Lào Cai).' },
    ],
  },

  'P4LSDL-w04-quiz': {
    topic: 'Đền Hùng và lễ giỗ Tổ',
    intro: 'Các em ơi, có câu "Dù ai đi ngược về xuôi – Nhớ ngày giỗ Tổ mùng Mười tháng Ba". Cùng tìm hiểu về Đền Hùng nhé!',
    objectives: [
      'Biết vị trí Đền Hùng.',
      'Hiểu ý nghĩa lễ giỗ Tổ Hùng Vương.',
      'Lòng biết ơn các vua Hùng.',
    ],
    theory: [
      { h: 'Đền Hùng ở đâu?' },
      { p: 'Đền Hùng nằm trên núi Nghĩa Lĩnh, xã Hy Cương, thành phố Việt Trì, tỉnh PHÚ THỌ. Đây là nơi thờ các vua Hùng — những người có công dựng nước Văn Lang.' },
      { h: 'Lễ giỗ Tổ' },
      { ul: [
        'Tổ chức ngày MÙNG 10 THÁNG 3 ÂM LỊCH hàng năm.',
        'Là ngày Quốc lễ — học sinh được nghỉ.',
        'Hàng triệu người về dâng hương tưởng nhớ.',
      ] },
      { h: 'Ý nghĩa' },
      { p: 'Nhắc nhở con cháu nhớ về nguồn cội. Vua Hùng được coi là TỔ TIÊN của dân tộc Việt Nam. Đoàn kết "Con Lạc cháu Hồng".' },
      { note: 'UNESCO công nhận "Tín ngưỡng thờ cúng Hùng Vương" là Di sản văn hoá phi vật thể của nhân loại năm 2012.' },
    ],
    examples: [
      { q: 'Đền Hùng ở tỉnh nào?', a: 'Tỉnh PHÚ THỌ — trên núi Nghĩa Lĩnh, xã Hy Cương, thành phố Việt Trì.' },
      { q: 'Ngày giỗ Tổ Hùng Vương là ngày nào?', a: 'Ngày MÙNG 10 THÁNG 3 ÂM LỊCH hằng năm.' },
    ],
  },

  'P4LSDL-w05-quiz': {
    topic: 'Vùng Đồng bằng Bắc Bộ',
    intro: 'Vùng Đồng bằng Bắc Bộ là cái nôi của nền văn minh lúa nước Việt Nam. Cùng tìm hiểu nhé các em!',
    objectives: [
      'Biết vị trí và đặc điểm địa hình.',
      'Hiểu vai trò sông Hồng.',
      'Sản vật, văn hoá đặc trưng.',
    ],
    theory: [
      { h: 'Vị trí và địa hình' },
      { ul: [
        'Nằm ở hạ lưu sông Hồng và sông Thái Bình.',
        'Diện tích khoảng 15.000 km² — đồng bằng lớn thứ 2 cả nước (sau ĐB sông Cửu Long).',
        'Địa hình bằng phẳng, đất phù sa màu mỡ.',
      ] },
      { h: 'Sông Hồng' },
      { p: 'SÔNG HỒNG (còn gọi sông Cái) là sông lớn nhất miền Bắc, dài 1.149 km. Phù sa sông Hồng bồi đắp tạo nên đồng bằng — vì vậy nước sông có màu đỏ.' },
      { h: 'Sản vật & văn hoá' },
      { ul: [
        'Trồng lúa nước (vựa lúa quan trọng).',
        'Nuôi gia súc, gia cầm, nuôi cá.',
        'Làng nghề truyền thống: gốm Bát Tràng (Hà Nội), lụa Vạn Phúc (Hà Đông).',
        'Văn hoá: chèo, quan họ Bắc Ninh.',
      ] },
      { note: 'Đê sông Hồng là công trình lớn được xây từ thời Lý, dài hàng trăm km để ngăn lũ.' },
    ],
    examples: [
      { q: 'Sông nào tạo nên Đồng bằng Bắc Bộ?', a: 'SÔNG HỒNG (và sông Thái Bình). Phù sa hai sông này bồi đắp qua hàng nghìn năm tạo nên đồng bằng.' },
      { q: 'Vì sao nước sông Hồng có màu đỏ?', a: 'Vì chứa nhiều PHÙ SA (đất mịn) màu đỏ — làm đồng bằng màu mỡ.' },
    ],
  },

  'P4LSDL-w06-quiz': {
    topic: 'Thăng Long – Hà Nội',
    intro: 'Tuần này các em cùng cô thăm thủ đô ngàn năm văn hiến — Thăng Long, Hà Nội nhé!',
    objectives: [
      'Biết lịch sử tên gọi Thăng Long.',
      'Vị trí, vai trò của Hà Nội ngày nay.',
      'Một số danh thắng tiêu biểu.',
    ],
    theory: [
      { h: 'Lịch sử tên gọi' },
      { ul: [
        'Năm 1010, vua LÝ THÁI TỔ dời đô từ Hoa Lư về Đại La, đổi tên thành THĂNG LONG ("Rồng bay lên").',
        'Năm 1831, vua Minh Mạng đặt tên HÀ NỘI ("vùng đất bên trong sông").',
        'Năm 2010, kỉ niệm 1.000 năm Thăng Long – Hà Nội.',
      ] },
      { h: 'Hà Nội ngày nay' },
      { ul: [
        'Thủ đô của nước Cộng hoà Xã hội Chủ nghĩa Việt Nam.',
        'Trung tâm chính trị, văn hoá, giáo dục lớn nhất cả nước.',
        'Diện tích ~3.359 km², dân số ~8 triệu người.',
      ] },
      { h: 'Danh thắng tiêu biểu' },
      { ul: [
        'Hồ Hoàn Kiếm (Hồ Gươm) với Tháp Rùa.',
        'Văn Miếu – Quốc Tử Giám.',
        'Hoàng thành Thăng Long (Di sản UNESCO).',
        'Lăng Bác, Quảng trường Ba Đình.',
      ] },
      { note: 'Hoàng thành Thăng Long được UNESCO công nhận Di sản Văn hoá Thế giới năm 2010 đúng dịp 1.000 năm Thăng Long.' },
    ],
    examples: [
      { q: 'Vua nào dời đô từ Hoa Lư về Thăng Long? Năm nào?', a: 'Vua LÝ THÁI TỔ (Lý Công Uẩn) dời đô năm 1010.' },
      { q: 'Tên gọi "Hà Nội" có từ năm nào, do ai đặt?', a: 'Năm 1831, do vua MINH MẠNG (triều Nguyễn) đặt — nghĩa là "vùng đất bên trong sông".' },
    ],
  },

  'P4LSDL-w07-quiz': {
    topic: 'Văn Miếu – Quốc Tử Giám',
    intro: 'Tuần này các em tìm hiểu trường đại học đầu tiên của Việt Nam — Văn Miếu Quốc Tử Giám nhé!',
    objectives: [
      'Biết lịch sử Văn Miếu – Quốc Tử Giám.',
      'Hiểu vai trò trong nền giáo dục xưa.',
      'Truyền thống hiếu học của dân tộc.',
    ],
    theory: [
      { h: 'Lịch sử' },
      { ul: [
        'VĂN MIẾU được xây năm 1070 thời vua LÝ THÁNH TÔNG — thờ Khổng Tử.',
        'QUỐC TỬ GIÁM lập năm 1076 thời vua LÝ NHÂN TÔNG — là trường đại học đầu tiên của Việt Nam, ban đầu dạy con vua, quý tộc; sau mở rộng cho cả dân thường có tài.',
      ] },
      { h: 'Bia Tiến sĩ' },
      { p: 'Có 82 BIA TIẾN SĨ ghi tên 1.307 người đỗ tiến sĩ từ năm 1442 đến 1779. Mỗi bia đặt trên lưng một con rùa đá — biểu tượng cho sự trường tồn của tri thức.' },
      { h: 'Vai trò ngày nay' },
      { ul: [
        'Di tích lịch sử quốc gia đặc biệt.',
        'Học sinh, sinh viên đến cầu may trước kì thi.',
        'UNESCO công nhận Bia Tiến sĩ là Di sản tư liệu thế giới (2010).',
      ] },
      { note: 'Vị trí: phố Văn Miếu, quận Đống Đa, Hà Nội. Có hình trên tờ tiền 100.000 đồng polymer.' },
    ],
    examples: [
      { q: 'Quốc Tử Giám được lập năm nào, dưới triều vua nào?', a: 'Năm 1076, dưới triều vua LÝ NHÂN TÔNG. Đây là trường đại học đầu tiên của Việt Nam.' },
      { q: 'Bia Tiến sĩ trong Văn Miếu ghi tên ai?', a: 'Ghi tên 1.307 người đỗ TIẾN SĨ trong các khoa thi từ năm 1442 đến 1779.' },
    ],
  },

  'P4LSDL-w08-quiz': {
    topic: 'Vùng Duyên hải miền Trung',
    intro: 'Tuần này cô trò mình đi dọc miền Trung — vùng đất nhiều biển, nhiều nắng, nhiều di sản nhé!',
    objectives: [
      'Biết vị trí Duyên hải miền Trung.',
      'Đặc điểm địa hình và khí hậu.',
      'Tài nguyên biển và du lịch.',
    ],
    theory: [
      { h: 'Vị trí' },
      { p: 'Dải đất ven biển miền Trung, phía Tây là dãy Trường Sơn, phía Đông là Biển Đông. Sau sáp nhập 2025, vùng Bắc Trung Bộ và Duyên hải miền Trung gồm 9 tỉnh, thành: Thanh Hoá, Nghệ An, Hà Tĩnh, Quảng Trị, Huế, Đà Nẵng, Quảng Ngãi, Gia Lai, Khánh Hoà.' },
      { h: 'Địa hình & khí hậu' },
      { ul: [
        'Dải đất hẹp, kéo dài.',
        'Đồng bằng nhỏ, nhiều cồn cát.',
        'Mùa hè khô nóng (gió Lào); mùa thu – đông mưa nhiều, hay có bão lụt.',
      ] },
      { h: 'Sản vật & du lịch' },
      { ul: [
        'Đánh bắt và nuôi trồng thuỷ sản.',
        'Trồng cây công nghiệp: dừa, mía.',
        'Du lịch biển: Sầm Sơn (Thanh Hoá), Cửa Lò (Nghệ An), Đà Nẵng, Nha Trang (Khánh Hoà), Mũi Né (Bình Thuận cũ, nay thuộc Lâm Đồng).',
        'Di sản: Cố đô Huế, Phố cổ Hội An, Thánh địa Mỹ Sơn.',
      ] },
      { note: 'Đèo Hải Vân là ranh giới tự nhiên khí hậu Bắc – Nam, được mệnh danh "Thiên hạ đệ nhất hùng quan".' },
    ],
    examples: [
      { q: 'Vùng Bắc Trung Bộ và Duyên hải miền Trung gồm mấy tỉnh, thành (sau sáp nhập 2025)?', a: '9 tỉnh, thành: Thanh Hoá, Nghệ An, Hà Tĩnh, Quảng Trị, Huế, Đà Nẵng, Quảng Ngãi, Gia Lai, Khánh Hoà.' },
      { q: 'Vì sao miền Trung hay có bão?', a: 'Vì giáp BIỂN ĐÔNG, vào mùa thu (tháng 9–11) các cơn bão từ biển đổ bộ vào — gây mưa to, lũ lụt.' },
    ],
  },

  'P4LSDL-w09-quiz': {
    topic: 'Cố đô Huế',
    intro: 'Tuần này các em cùng cô về thăm cố đô Huế — kinh đô của triều Nguyễn nhé!',
    objectives: [
      'Biết vị trí và lịch sử cố đô Huế.',
      'Các công trình kiến trúc tiêu biểu.',
      'Giá trị di sản thế giới.',
    ],
    theory: [
      { h: 'Vị trí và lịch sử' },
      { ul: [
        'Huế thuộc tỉnh THỪA THIÊN HUẾ, nay là thành phố trực thuộc trung ương.',
        'Là KINH ĐÔ của triều NGUYỄN từ năm 1802 đến 1945 (143 năm).',
        'Vua Gia Long là người chọn Huế làm kinh đô.',
      ] },
      { h: 'Các công trình tiêu biểu' },
      { ul: [
        'Kinh thành Huế (Hoàng thành, Tử Cấm Thành).',
        'Lăng các vua: Lăng Tự Đức, Lăng Khải Định, Lăng Minh Mạng.',
        'Chùa Thiên Mụ bên sông Hương.',
        'Cầu Trường Tiền — biểu tượng của Huế.',
      ] },
      { h: 'Di sản thế giới' },
      { p: 'Quần thể di tích cố đô HUẾ được UNESCO công nhận là Di sản Văn hoá Thế giới năm 1993 — di sản đầu tiên của Việt Nam được UNESCO ghi danh. Nhã nhạc Cung đình Huế cũng là Di sản phi vật thể (2003).' },
      { note: 'Huế còn nổi tiếng với ẩm thực cung đình: bún bò Huế, cơm hến, bánh khoái, bánh bèo.' },
    ],
    examples: [
      { q: 'Huế là kinh đô của triều đại nào?', a: 'Triều NGUYỄN — từ năm 1802 (vua Gia Long) đến 1945 (vua Bảo Đại thoái vị).' },
      { q: 'Cố đô Huế được UNESCO công nhận là Di sản Thế giới năm nào?', a: 'Năm 1993 — di sản đầu tiên của Việt Nam được UNESCO công nhận.' },
    ],
  },

  'P4LSDL-w10-quiz': {
    topic: 'Phố cổ Hội An',
    intro: 'Tuần này cô đưa các em đi thăm Hội An — phố cổ rất xinh đẹp ở TP Đà Nẵng (Quảng Nam cũ) nhé!',
    objectives: [
      'Biết vị trí Hội An.',
      'Lịch sử và đặc điểm phố cổ.',
      'Giá trị di sản và du lịch.',
    ],
    theory: [
      { h: 'Vị trí' },
      { p: 'Hội An nằm bên sông Thu Bồn. Trước đây thuộc tỉnh QUẢNG NAM; sau sáp nhập 2025, Quảng Nam hợp nhất với Đà Nẵng nên Hội An nay thuộc TP ĐÀ NẴNG.' },
      { h: 'Lịch sử' },
      { ul: [
        'Từ thế kỉ 16–17, Hội An là CẢNG THỊ sầm uất bậc nhất Đông Nam Á.',
        'Thương nhân Nhật Bản, Trung Quốc, Hà Lan, Bồ Đào Nha đến buôn bán.',
        'Để lại nhiều dấu ấn kiến trúc đa văn hoá.',
      ] },
      { h: 'Đặc điểm phố cổ' },
      { ul: [
        'Nhà cổ mái ngói rêu phong, tường vàng.',
        'CHÙA CẦU (cầu Nhật Bản) — biểu tượng Hội An, có hình trên tờ 20.000 đồng polymer.',
        'Hội quán Phúc Kiến, hội quán Quảng Đông.',
        'Đèn lồng rực rỡ — đặc biệt đẹp vào ngày rằm.',
      ] },
      { h: 'Di sản' },
      { p: 'Phố cổ Hội An được UNESCO công nhận là Di sản Văn hoá Thế giới năm 1999, cùng với Thánh địa Mỹ Sơn (cùng thuộc Quảng Nam cũ, nay là TP Đà Nẵng).' },
      { note: 'Đêm rằm hằng tháng, Hội An tắt đèn điện, chỉ thắp đèn lồng — gọi là "đêm phố cổ".' },
    ],
    examples: [
      { q: 'Phố cổ Hội An nay thuộc tỉnh, thành nào?', a: 'TP ĐÀ NẴNG (trước đây thuộc tỉnh Quảng Nam, hợp nhất vào Đà Nẵng từ 2025).' },
      { q: 'Hội An được UNESCO công nhận Di sản Thế giới năm nào?', a: 'Năm 1999 — cùng năm với Thánh địa Mỹ Sơn (cùng thuộc Quảng Nam cũ, nay là TP Đà Nẵng).' },
    ],
  },

  'P4LSDL-w11-quiz': {
    topic: 'Vùng Tây Nguyên',
    intro: 'Tuần này các em theo cô lên Tây Nguyên — vùng đất đỏ ba-zan với những đồi cà phê và núi rừng đại ngàn nhé!',
    objectives: [
      'Biết vị trí và đặc điểm Tây Nguyên.',
      'Sản vật và cây trồng nổi tiếng.',
      'Văn hoá các dân tộc.',
    ],
    theory: [
      { h: 'Vị trí' },
      { p: 'Sau sáp nhập 2025, Tây Nguyên gồm 2 tỉnh: ĐẮK LẮK (gộp Phú Yên) và LÂM ĐỒNG (gộp Đắk Nông, Bình Thuận). Nằm ở phía Tây dãy Trường Sơn. (Kon Tum nay thuộc Quảng Ngãi, Gia Lai gộp Bình Định về vùng Duyên hải miền Trung.)' },
      { h: 'Địa hình & đất đai' },
      { ul: [
        'Vùng cao nguyên xếp tầng, độ cao 500–1.500 m.',
        'Đất BA-ZAN màu đỏ, rất phù hợp trồng cây công nghiệp.',
        'Khí hậu mát mẻ quanh năm; có 2 mùa: mưa và khô.',
      ] },
      { h: 'Sản vật' },
      { ul: [
        'Cà phê (lớn nhất cả nước, tập trung ở Đắk Lắk, Lâm Đồng).',
        'Hồ tiêu, cao su, ca cao, điều.',
        'Hoa và rau ôn đới (Đà Lạt – Lâm Đồng).',
      ] },
      { h: 'Dân tộc & văn hoá' },
      { p: 'Là quê hương của các dân tộc: GIA-RAI, Ê-ĐÊ, BA-NA, XƠ-ĐĂNG, M\'NÔNG… Nổi tiếng với nhà rông, không gian cồng chiêng, lễ hội đâm trâu, sử thi Đăm Săn.' },
      { note: 'Đà Lạt (Lâm Đồng) được mệnh danh "thành phố ngàn hoa", "thành phố sương mù".' },
    ],
    examples: [
      { q: 'Tây Nguyên gồm mấy tỉnh (sau sáp nhập 2025)? Kể tên.', a: '2 tỉnh: ĐẮK LẮK và LÂM ĐỒNG (trước đây là 5 tỉnh Kon Tum, Gia Lai, Đắk Lắk, Đắk Nông, Lâm Đồng).' },
      { q: 'Vì sao Tây Nguyên trồng nhiều cà phê?', a: 'Vì có ĐẤT BA-ZAN màu đỏ giàu dinh dưỡng + KHÍ HẬU mát mẻ, lượng mưa đủ — rất thích hợp cho cà phê.' },
    ],
  },

  'P4LSDL-w12-quiz': {
    topic: 'Lễ hội Cồng chiêng Tây Nguyên',
    intro: 'Cồng chiêng là âm thanh đặc trưng của Tây Nguyên. Cùng tìm hiểu nhé các em!',
    objectives: [
      'Biết cồng chiêng là gì.',
      'Hiểu ý nghĩa văn hoá.',
      'Trân trọng di sản phi vật thể.',
    ],
    theory: [
      { h: 'Cồng chiêng là gì?' },
      { p: 'Cồng (có núm) và chiêng (không núm) là những nhạc cụ làm bằng ĐỒNG, hình tròn dẹt. Đánh bằng dùi tạo âm vang ngân nga.' },
      { h: 'Ý nghĩa văn hoá' },
      { ul: [
        'Dùng trong các lễ hội: mừng lúa mới, đâm trâu, cưới hỏi, đám tang.',
        'Là phương tiện giao tiếp với THẦN LINH theo quan niệm các dân tộc.',
        'Mỗi bộ cồng chiêng được coi như "linh hồn" của làng.',
      ] },
      { h: 'Di sản UNESCO' },
      { p: 'KHÔNG GIAN VĂN HOÁ CỒNG CHIÊNG TÂY NGUYÊN được UNESCO công nhận là Kiệt tác Di sản Văn hoá phi vật thể của nhân loại năm 2005.' },
      { note: 'Cồng chiêng thường được biểu diễn ngoài trời, có múa xoang nữ đi vòng tròn ngược chiều kim đồng hồ.' },
    ],
    examples: [
      { q: 'Cồng chiêng được làm bằng chất liệu gì?', a: 'Bằng ĐỒNG. Cồng có núm ở giữa, chiêng thì bằng phẳng không núm.' },
      { q: 'Không gian văn hoá Cồng chiêng Tây Nguyên được UNESCO công nhận năm nào?', a: 'Năm 2005 — là Kiệt tác Di sản Văn hoá phi vật thể của nhân loại.' },
    ],
  },

  'P4LSDL-w13-quiz': {
    topic: 'Vùng Đông Nam Bộ',
    intro: 'Tuần này các em theo cô vào Đông Nam Bộ — vùng đất năng động, phát triển bậc nhất cả nước nhé!',
    objectives: [
      'Biết vị trí và các tỉnh.',
      'Đặc điểm kinh tế nổi bật.',
      'Vai trò của Thành phố Hồ Chí Minh.',
    ],
    theory: [
      { h: 'Vị trí và các tỉnh' },
      { p: 'Sau sáp nhập 2025, Đông Nam Bộ gồm 3 đơn vị: TP. HỒ CHÍ MINH (đã gộp Bình Dương, Bà Rịa – Vũng Tàu), ĐỒNG NAI (gộp Bình Phước) và TÂY NINH (gộp Long An). Nằm ở phía Nam Việt Nam, giáp Cam-pu-chia và Biển Đông.' },
      { h: 'Đặc điểm địa hình' },
      { ul: [
        'Địa hình tương đối bằng phẳng, hơi gò đồi.',
        'Khí hậu nóng quanh năm, 2 mùa: mưa và khô.',
        'Đất xám và đất đỏ ba-zan thích hợp trồng cây công nghiệp.',
      ] },
      { h: 'Kinh tế' },
      { ul: [
        'Vùng kinh tế phát triển nhất Việt Nam — đóng góp ~40% GDP cả nước.',
        'Công nghiệp: nhiều khu công nghiệp lớn (Bình Dương, Đồng Nai).',
        'Cây công nghiệp: cao su, điều, hồ tiêu.',
        'Dầu khí ngoài khơi Vũng Tàu.',
        'Cảng biển và du lịch biển Vũng Tàu.',
      ] },
      { note: 'Đông Nam Bộ tuy diện tích nhỏ nhưng đóng góp kinh tế lớn nhất cả nước.' },
    ],
    examples: [
      { q: 'Đông Nam Bộ gồm mấy đơn vị (sau sáp nhập 2025)?', a: '3 đơn vị: TP.HCM (đã gộp Bình Dương, Bà Rịa – Vũng Tàu), ĐỒNG NAI (gộp Bình Phước), TÂY NINH (gộp Long An).' },
      { q: 'Dầu khí của Việt Nam được khai thác chủ yếu ở đâu?', a: 'NGOÀI KHƠI BÀ RỊA – VŨNG TÀU (mỏ Bạch Hổ, Rồng…).' },
    ],
  },

  'P4LSDL-w14-quiz': {
    topic: 'Thành phố Hồ Chí Minh',
    intro: 'Tuần này các em cùng cô khám phá Thành phố Hồ Chí Minh — thành phố lớn và năng động nhất Việt Nam nhé!',
    objectives: [
      'Biết lịch sử tên gọi.',
      'Vị trí và quy mô thành phố.',
      'Một số địa danh tiêu biểu.',
    ],
    theory: [
      { h: 'Lịch sử tên gọi' },
      { ul: [
        'Trước đây gọi là SÀI GÒN — Chợ Lớn.',
        'Năm 1976, sau khi đất nước thống nhất, đổi tên thành THÀNH PHỐ HỒ CHÍ MINH để tôn vinh Chủ tịch Hồ Chí Minh.',
      ] },
      { h: 'Vị trí và quy mô' },
      { ul: [
        'Nằm ở miền Đông Nam Bộ, bên sông Sài Gòn.',
        'Diện tích ~2.095 km², dân số ~9 triệu người (đông nhất cả nước).',
        'Là trung tâm kinh tế, tài chính, văn hoá lớn nhất phía Nam.',
      ] },
      { h: 'Địa danh tiêu biểu' },
      { ul: [
        'CHỢ BẾN THÀNH — biểu tượng Sài Gòn từ năm 1914.',
        'DINH ĐỘC LẬP (Dinh Thống Nhất) — nơi xe tăng quân Giải phóng tiến vào ngày 30/4/1975.',
        'Nhà thờ Đức Bà, Bưu điện Trung tâm Sài Gòn.',
        'Bến Nhà Rồng — nơi Bác Hồ ra đi tìm đường cứu nước (5/6/1911).',
      ] },
      { note: 'Ngày 30/4 hằng năm là Ngày Giải phóng miền Nam, thống nhất đất nước.' },
    ],
    examples: [
      { q: 'TP. Hồ Chí Minh trước đây có tên là gì?', a: 'SÀI GÒN (Sài Gòn – Chợ Lớn). Đổi tên năm 1976 sau khi đất nước thống nhất.' },
      { q: 'Bác Hồ rời Bến Nhà Rồng đi tìm đường cứu nước năm nào?', a: 'Ngày 5/6/1911 — Bác Hồ (khi đó tên là Văn Ba) lên tàu Đô đốc La-tu-sơ Tơ-rê-vin sang Pháp.' },
    ],
  },

  'P4LSDL-w15-quiz': {
    topic: 'Vùng Đồng bằng Nam Bộ',
    intro: 'Tuần này cô đưa các em xuống Đồng bằng Nam Bộ — vựa lúa lớn nhất Việt Nam nhé!',
    objectives: [
      'Biết vị trí và đặc điểm địa hình.',
      'Vai trò của sông Mê Kông.',
      'Sản vật và đặc trưng văn hoá.',
    ],
    theory: [
      { h: 'Vị trí và địa hình' },
      { ul: [
        'Đồng bằng Nam Bộ (Đồng bằng sông Cửu Long), sau sáp nhập 2025 gồm 5 tỉnh, thành: Cần Thơ, Vĩnh Long, Đồng Tháp, An Giang, Cà Mau.',
        'Diện tích ~40.000 km² — đồng bằng LỚN NHẤT cả nước.',
        'Địa hình thấp, bằng phẳng, nhiều kênh rạch chằng chịt.',
      ] },
      { h: 'Sông Mê Kông' },
      { p: 'Sông MÊ KÔNG bắt nguồn từ Tây Tạng, chảy qua nhiều nước, vào Việt Nam chia thành 9 nhánh đổ ra biển — nên gọi là CỬU LONG (chín con rồng). Đem phù sa bồi đắp đồng bằng.' },
      { h: 'Sản vật' },
      { ul: [
        'Lúa gạo (vựa lúa lớn nhất, chiếm hơn 50% sản lượng cả nước).',
        'Trái cây: xoài, sầu riêng, chôm chôm, dừa…',
        'Thuỷ sản: tôm, cá tra, cá ba sa.',
      ] },
      { h: 'Văn hoá đặc trưng' },
      { p: 'Chợ nổi (Cái Răng – Cần Thơ, Ngã Bảy – Hậu Giang cũ, nay thuộc Cần Thơ). Đờn ca tài tử Nam Bộ (Di sản UNESCO 2013). Người dân thân thiện, phóng khoáng.' },
      { note: 'Đồng bằng sông Cửu Long là khu vực đông dân, đóng vai trò an ninh lương thực của Việt Nam.' },
    ],
    examples: [
      { q: 'Vì sao Đồng bằng Nam Bộ còn gọi là Đồng bằng sông Cửu Long?', a: 'Vì sông Mê Kông vào Việt Nam CHIA THÀNH 9 NHÁNH (Cửu Long = chín con rồng) đổ ra biển.' },
      { q: 'Đồng bằng nào là vựa lúa lớn nhất Việt Nam?', a: 'Đồng bằng SÔNG CỬU LONG (Đồng bằng Nam Bộ), sản xuất hơn 50% sản lượng lúa cả nước.' },
    ],
  },

  'P4LSDL-w16-quiz': {
    topic: 'Phú Quốc và biển đảo',
    intro: 'Tuần này các em theo cô ra đảo Phú Quốc và tìm hiểu về biển đảo Việt Nam nhé!',
    objectives: [
      'Biết vị trí và đặc điểm Phú Quốc.',
      'Hiểu Việt Nam có nhiều đảo và quần đảo.',
      'Ý thức bảo vệ chủ quyền biển đảo.',
    ],
    theory: [
      { h: 'Phú Quốc' },
      { ul: [
        'Thuộc tỉnh AN GIANG (Kiên Giang cũ, sáp nhập 2025), là ĐẢO LỚN NHẤT Việt Nam (~574 km²).',
        'Nằm trong Vịnh Thái Lan, cách đất liền 45 km.',
        'Là thành phố đảo đầu tiên của Việt Nam (từ 2020).',
        'Nổi tiếng: nước mắm, hồ tiêu, ngọc trai, du lịch biển.',
      ] },
      { h: 'Biển đảo Việt Nam' },
      { ul: [
        'Bờ biển dài hơn 3.260 km.',
        'Hơn 4.000 đảo lớn nhỏ.',
        'Hai quần đảo lớn: HOÀNG SA và TRƯỜNG SA — thuộc chủ quyền Việt Nam.',
        'Côn Đảo (Bà Rịa – Vũng Tàu cũ, nay thuộc TP.HCM), Cát Bà (Hải Phòng), Lý Sơn (Quảng Ngãi)…',
      ] },
      { h: 'Ý thức chủ quyền' },
      { p: 'Hoàng Sa và Trường Sa là một phần lãnh thổ Việt Nam từ lâu đời. Người dân Việt Nam yêu nước có trách nhiệm bảo vệ chủ quyền biển đảo. Không vứt rác xuống biển. Tôn trọng các chú bộ đội hải quân.' },
      { note: 'Trên Phú Quốc có Vườn quốc gia Phú Quốc với rừng nguyên sinh và động vật quý.' },
    ],
    examples: [
      { q: 'Đảo lớn nhất Việt Nam là đảo nào, thuộc tỉnh nào?', a: 'Đảo PHÚ QUỐC, thuộc tỉnh KIÊN GIANG, diện tích ~574 km².' },
      { q: 'Hai quần đảo nào của Việt Nam ở Biển Đông?', a: 'HOÀNG SA và TRƯỜNG SA — đều thuộc chủ quyền Việt Nam.' },
    ],
  },

  'P4LSDL-w17-quiz': {
    topic: 'Ôn tập học kì I',
    intro: 'Tuần này mình cùng cô hệ thống lại kiến thức ĐỊA LÝ Việt Nam của học kì 1 nhé!',
    objectives: [
      'Ôn lại các vùng đã học.',
      'Nhớ các di sản UNESCO.',
      'Sẵn sàng kiểm tra HK1.',
    ],
    theory: [
      { h: 'Các vùng địa lý' },
      { ul: [
        'Trung du miền núi Bắc Bộ: Hoàng Liên Sơn, Sa Pa, chè Thái Nguyên.',
        'Đồng bằng Bắc Bộ: sông Hồng, văn minh lúa nước.',
        'Duyên hải miền Trung: biển, Huế, Hội An, Mỹ Sơn.',
        'Tây Nguyên: cà phê, cồng chiêng, dân tộc Ba-na, Ê-đê.',
        'Đông Nam Bộ: TP.HCM, công nghiệp, dầu khí.',
        'Đồng bằng Nam Bộ: lúa gạo, sông Cửu Long, chợ nổi.',
      ] },
      { h: 'Di sản UNESCO ở Việt Nam' },
      { ul: [
        'Cố đô Huế (1993).',
        'Phố cổ Hội An và Thánh địa Mỹ Sơn (1999).',
        'Hoàng thành Thăng Long (2010).',
        'Cồng chiêng Tây Nguyên (2005).',
        'Đờn ca tài tử Nam Bộ (2013).',
      ] },
      { h: 'Thủ đô và TP lớn' },
      { p: 'Thủ đô: HÀ NỘI. Các thành phố trực thuộc trung ương: Hà Nội, Hải Phòng, Đà Nẵng, TP.HCM, Cần Thơ, Huế.' },
      { note: 'Học thuộc đặc trưng từng vùng — bài thi sẽ làm tốt.' },
    ],
    examples: [
      { q: 'Kể 3 di sản văn hoá của Việt Nam được UNESCO công nhận:', a: 'Ví dụ: Cố đô Huế (1993), Phố cổ Hội An (1999), Hoàng thành Thăng Long (2010).' },
      { q: 'Vùng nào trồng nhiều cà phê nhất Việt Nam?', a: 'TÂY NGUYÊN — đặc biệt Đắk Lắk và Lâm Đồng nhờ đất ba-zan + khí hậu mát.' },
    ],
  },

  'P4LSDL-w18-quiz': {
    topic: 'Kiểm tra học kì I',
    intro: 'Tuần này các em làm bài kiểm tra học kì 1. Cô sẽ ôn lại các dạng câu hỏi và mẹo làm bài nhé!',
    objectives: [
      'Biết cấu trúc đề thi.',
      'Mẹo làm bài hiệu quả.',
      'Bình tĩnh, tự tin khi làm bài.',
    ],
    theory: [
      { h: 'Cấu trúc đề thi' },
      { ul: [
        'Phần trắc nghiệm: chọn đáp án đúng.',
        'Phần tự luận ngắn: điền từ, nối, vẽ sơ đồ.',
        'Câu hỏi mở: nêu hiểu biết, cảm nhận.',
      ] },
      { h: 'Mẹo làm bài' },
      { ul: [
        'Đọc kĩ đề trước khi làm.',
        'Câu dễ làm trước, câu khó để sau.',
        'Câu trắc nghiệm: loại trừ đáp án sai trước.',
        'Câu mở: viết câu đầy đủ, rõ ràng, có địa danh - năm cụ thể.',
        'Còn thời gian: kiểm tra lại.',
      ] },
      { h: 'Tâm thế' },
      { ul: [
        'Đêm trước thi: ngủ đủ giấc.',
        'Sáng thi: ăn sáng nhẹ, mang đủ dụng cụ.',
        'Vào phòng: hít thở sâu, tự tin.',
        'Sai một câu không sao — còn nhiều câu khác.',
      ] },
      { note: 'Quan trọng nhất là HIỂU bài, không cần học vẹt. Chúc các em làm bài tốt!' },
    ],
    examples: [
      { q: 'Khi gặp câu khó, em nên làm gì?', a: 'TẠM BỎ QUA, làm câu khác trước. Cuối giờ quay lại làm — vì không nên mất nhiều thời gian cho một câu.' },
      { q: 'Trước ngày thi, em cần chuẩn bị gì?', a: 'Ôn bài kĩ, ngủ sớm, chuẩn bị bút, thước, gôm; sáng ăn nhẹ; đi học sớm.' },
    ],
  },

  'P4LSDL-w19-quiz': {
    topic: 'Buổi đầu dựng nước: Văn Lang – Âu Lạc',
    intro: 'Học kì 2 bắt đầu với phần LỊCH SỬ! Tuần này các em tìm hiểu nhà nước đầu tiên của Việt Nam — Văn Lang và Âu Lạc nhé!',
    objectives: [
      'Biết nhà nước Văn Lang, Âu Lạc.',
      'Nhớ các đời vua Hùng, An Dương Vương.',
      'Hiểu thành Cổ Loa.',
    ],
    theory: [
      { h: 'Nhà nước Văn Lang' },
      { ul: [
        'Ra đời khoảng năm 700 TCN (trước Công nguyên).',
        'Vua đứng đầu gọi là HÙNG VƯƠNG, truyền ngôi 18 đời.',
        'Kinh đô đặt ở PHONG CHÂU (Phú Thọ ngày nay).',
        'Người Văn Lang đã biết trồng lúa nước, làm đồ đồng (trống đồng Đông Sơn).',
      ] },
      { h: 'Nhà nước Âu Lạc' },
      { ul: [
        'Năm 257 TCN, THỤC PHÁN đánh bại vua Hùng cuối cùng, lập nhà nước ÂU LẠC.',
        'Thục Phán xưng AN DƯƠNG VƯƠNG.',
        'Kinh đô dời về CỔ LOA (huyện Đông Anh, Hà Nội ngày nay).',
      ] },
      { h: 'Thành Cổ Loa' },
      { p: 'Thành Cổ Loa hình XOÁY ỐC với 3 vòng thành, có hào nước bao quanh. Là công trình quân sự kì vĩ — biểu tượng tài năng quân sự của người Việt cổ.' },
      { note: 'Truyền thuyết "Mỵ Châu – Trọng Thuỷ" gắn với thành Cổ Loa và sự thất bại của An Dương Vương trước Triệu Đà.' },
    ],
    examples: [
      { q: 'Nhà nước đầu tiên của Việt Nam tên gì? Vua đứng đầu xưng là gì?', a: 'Nhà nước VĂN LANG. Vua xưng HÙNG VƯƠNG, truyền ngôi 18 đời.' },
      { q: 'Kinh đô của nhà nước Âu Lạc đặt ở đâu?', a: 'Tại CỔ LOA (huyện Đông Anh, Hà Nội ngày nay). Thành Cổ Loa có hình xoáy ốc với 3 vòng thành.' },
    ],
  },

  'P4LSDL-w20-quiz': {
    topic: 'Hơn một nghìn năm Bắc thuộc',
    intro: 'Tuần này các em tìm hiểu giai đoạn đau thương nhưng kiên cường của dân tộc — hơn 1000 năm bị phương Bắc đô hộ nhé!',
    objectives: [
      'Biết thời gian Bắc thuộc.',
      'Hiểu sự bóc lột của các triều đại phương Bắc.',
      'Tinh thần đấu tranh của nhân dân ta.',
    ],
    theory: [
      { h: 'Bắc thuộc bắt đầu khi nào?' },
      { p: 'Năm 179 TCN, TRIỆU ĐÀ (nước Nam Việt) thôn tính Âu Lạc. Từ đó nước ta bị các triều đại phong kiến Trung Quốc đô hộ. Đến năm 938, Ngô Quyền đánh thắng quân Nam Hán trên sông Bạch Đằng, chấm dứt hơn 1.000 năm Bắc thuộc.' },
      { h: 'Chính sách đô hộ' },
      { ul: [
        'Bắt dân nộp sưu thuế nặng nề.',
        'Bắt cống nạp ngọc trai, ngà voi, vàng bạc.',
        'Đồng hoá: bắt mặc quần áo Hán, nói tiếng Hán, học chữ Hán.',
        'Bắt người Việt làm nô lệ.',
      ] },
      { h: 'Tinh thần đấu tranh' },
      { ul: [
        'Khởi nghĩa HAI BÀ TRƯNG (năm 40) — Trưng Trắc và Trưng Nhị đánh đuổi Tô Định.',
        'Khởi nghĩa BÀ TRIỆU (năm 248).',
        'Khởi nghĩa LÝ BÍ (năm 542) — lập nước Vạn Xuân.',
        'Khởi nghĩa MAI THÚC LOAN (năm 722).',
        'Khởi nghĩa PHÙNG HƯNG (năm 776).',
      ] },
      { note: 'Câu nói nổi tiếng của Bà Triệu: "Tôi chỉ muốn cưỡi cơn gió mạnh, đạp luồng sóng dữ, chém cá kình ngoài biển khơi…"' },
    ],
    examples: [
      { q: 'Hai Bà Trưng khởi nghĩa năm nào, đánh đuổi ai?', a: 'Năm 40 (sau Công nguyên), đánh đuổi thái thú TÔ ĐỊNH của nhà Hán. Trưng Trắc xưng vương.' },
      { q: 'Thời kì Bắc thuộc của nước ta kéo dài bao lâu?', a: 'Hơn 1.000 năm — từ năm 179 TCN (Triệu Đà thôn tính) đến năm 938 (chiến thắng Bạch Đằng).' },
    ],
  },

  'P4LSDL-w21-quiz': {
    topic: 'Chiến thắng Bạch Đằng năm 938',
    intro: 'Tuần này các em học chiến thắng vĩ đại chấm dứt 1.000 năm Bắc thuộc — Bạch Đằng 938 của Ngô Quyền nhé!',
    objectives: [
      'Biết chiến thắng Bạch Đằng năm 938.',
      'Hiểu mưu kế của Ngô Quyền.',
      'Ý nghĩa lịch sử.',
    ],
    theory: [
      { h: 'Bối cảnh' },
      { p: 'Năm 937, Kiều Công Tiễn giết Dương Đình Nghệ (cha vợ Ngô Quyền) rồi cầu cứu quân NAM HÁN. Ngô Quyền kéo quân ra trị tội Kiều Công Tiễn, đồng thời chuẩn bị đối phó quân Nam Hán xâm lược.' },
      { h: 'Mưu kế cọc gỗ' },
      { ul: [
        'NGÔ QUYỀN cho đóng nhiều cọc gỗ vót nhọn, đầu bịt sắt cắm xuống sông BẠCH ĐẰNG (Quảng Ninh – Hải Phòng).',
        'Khi thuỷ triều LÊN, cọc bị nước ngập che kín.',
        'Quân ta nhử quân Nam Hán vượt qua bãi cọc khi nước lên.',
        'Khi thuỷ triều RÚT, cọc nhô lên đâm thủng thuyền giặc.',
      ] },
      { h: 'Kết quả' },
      { p: 'Năm 938, quân Nam Hán đại bại. Tướng giặc HOẰNG THÁO tử trận. Ngô Quyền lên ngôi vua (năm 939), đóng đô ở Cổ Loa.' },
      { h: 'Ý nghĩa' },
      { p: 'Chấm dứt hơn 1.000 năm BẮC THUỘC, mở ra kỉ nguyên ĐỘC LẬP cho dân tộc Việt Nam. Khẳng định độc lập, chủ quyền của nước ta.' },
      { note: 'Sông Bạch Đằng còn 2 chiến thắng oanh liệt khác: Lê Hoàn đánh Tống (981), Trần Hưng Đạo đánh Mông – Nguyên (1288).' },
    ],
    examples: [
      { q: 'Chiến thắng Bạch Đằng năm 938 do ai lãnh đạo? Đánh thắng quân nào?', a: 'Do NGÔ QUYỀN lãnh đạo. Đánh thắng quân NAM HÁN (Trung Quốc). Tướng Hoằng Tháo của giặc tử trận.' },
      { q: 'Mưu kế chính của Ngô Quyền là gì?', a: 'Đóng CỌC GỖ NHỌN xuống lòng sông. Lợi dụng THUỶ TRIỀU lên xuống: dụ giặc vào lúc nước lên, đánh khi nước rút làm cọc nhô lên đâm thủng thuyền.' },
    ],
  },

  'P4LSDL-w22-quiz': {
    topic: 'Nghỉ Tết Nguyên đán',
    intro: 'Tuần này các em được nghỉ Tết. Cô kể chuyện Tết cổ truyền của dân tộc cho các em nhé!',
    objectives: [
      'Hiểu ý nghĩa Tết Nguyên đán.',
      'Biết một số phong tục Tết.',
      'Trân trọng truyền thống.',
    ],
    theory: [
      { h: 'Tết Nguyên đán là gì?' },
      { p: 'Là Tết cổ truyền lớn nhất của dân tộc Việt Nam. "Nguyên" = đầu tiên, "Đán" = buổi sáng. Tức là buổi sáng đầu tiên của năm mới ÂM LỊCH. Thường rơi vào cuối tháng 1 hoặc đầu tháng 2 dương lịch.' },
      { h: 'Phong tục Tết' },
      { ul: [
        'GÓI BÁNH CHƯNG, bánh tét — tưởng nhớ vua Hùng và Lang Liêu.',
        'Lau dọn nhà cửa, đón tổ tiên về ăn Tết.',
        'Mâm NGŨ QUẢ trên bàn thờ.',
        'XÔNG NHÀ đêm Giao thừa.',
        'LÌ XÌ trẻ con để chúc may mắn.',
        'Chúc Tết ông bà, cha mẹ, thầy cô.',
      ] },
      { h: 'Ý nghĩa' },
      { ul: [
        'Tưởng nhớ tổ tiên.',
        'Sum họp gia đình.',
        'Khởi đầu năm mới với mong ước tốt lành.',
      ] },
      { note: 'Tết kéo dài 3 ngày chính (mùng 1, 2, 3) nhưng thường được nghỉ cả tuần. Mùng 1 Tết cha, mùng 2 Tết mẹ, mùng 3 Tết thầy.' },
    ],
    examples: [
      { q: 'Bánh chưng tượng trưng cho điều gì?', a: 'Bánh chưng hình VUÔNG tượng trưng cho ĐẤT. (Bánh dày hình tròn tượng trưng cho TRỜI.) Là truyền thuyết từ thời vua Hùng – Lang Liêu.' },
      { q: 'Câu "Mùng 1 Tết cha, mùng 2 Tết mẹ, mùng 3 Tết thầy" có nghĩa gì?', a: 'Mùng 1 chúc Tết bên nhà nội (cha). Mùng 2 chúc Tết bên ngoại (mẹ). Mùng 3 đi chúc Tết thầy cô giáo — thể hiện đạo lý "Tôn sư trọng đạo".' },
    ],
  },

  'P4LSDL-w23-quiz': {
    topic: 'Nhà Lý và Thăng Long',
    intro: 'Tuần này các em học về nhà Lý — triều đại dời đô ra Thăng Long, mở thời kì văn minh Đại Việt nhé!',
    objectives: [
      'Biết các vua đầu nhà Lý.',
      'Hiểu việc dời đô năm 1010.',
      'Văn hoá – giáo dục thời Lý.',
    ],
    theory: [
      { h: 'Lý Công Uẩn lên ngôi' },
      { p: 'Năm 1009, LÝ CÔNG UẨN được triều thần tôn lên ngôi, lập ra nhà LÝ — lấy hiệu là LÝ THÁI TỔ. Vua Lý Thái Tổ là người sáng suốt, mộ đạo Phật.' },
      { h: 'Dời đô năm 1010' },
      { ul: [
        'Năm 1010, vua Lý Thái Tổ dời đô từ HOA LƯ (Ninh Bình) ra ĐẠI LA.',
        'Đổi tên Đại La thành THĂNG LONG (rồng bay lên).',
        'Truyền thuyết: khi thuyền cập bến, vua thấy rồng vàng bay lên → đặt tên Thăng Long.',
      ] },
      { h: 'Phát triển văn hoá – giáo dục' },
      { ul: [
        'Năm 1070: xây VĂN MIẾU thờ Khổng Tử.',
        'Năm 1075: mở khoa thi đầu tiên ở Việt Nam.',
        'Năm 1076: lập QUỐC TỬ GIÁM — đại học đầu tiên.',
        'Xây chùa Một Cột (1049), tháp Báo Thiên.',
        'Đạo Phật phát triển mạnh.',
      ] },
      { note: 'Nhà Lý kéo dài 9 đời vua, 216 năm (1009–1225). Là một trong các triều đại văn minh, hưng thịnh nhất lịch sử Việt Nam.' },
    ],
    examples: [
      { q: 'Vua Lý Thái Tổ dời đô từ đâu, đến đâu? Năm nào?', a: 'Từ HOA LƯ (Ninh Bình) ra ĐẠI LA (đổi tên là THĂNG LONG). Năm 1010.' },
      { q: 'Văn Miếu và Quốc Tử Giám được xây thời nhà nào?', a: 'Nhà LÝ. Văn Miếu xây năm 1070 (vua Lý Thánh Tông); Quốc Tử Giám lập năm 1076 (vua Lý Nhân Tông).' },
    ],
  },

  'P4LSDL-w24-quiz': {
    topic: 'Kháng chiến chống Tống thời Lý',
    intro: 'Tuần này các em học cuộc kháng chiến chống quân Tống do LÝ THƯỜNG KIỆT chỉ huy nhé!',
    objectives: [
      'Biết Lý Thường Kiệt là ai.',
      'Hiểu chiến thắng sông Như Nguyệt.',
      'Bài thơ "Nam quốc sơn hà".',
    ],
    theory: [
      { h: 'Lý Thường Kiệt' },
      { p: 'LÝ THƯỜNG KIỆT (1019–1105) là vị tướng tài ba của nhà Lý. Phụng sự 3 đời vua: Lý Thái Tông, Lý Thánh Tông, Lý Nhân Tông.' },
      { h: 'Đánh sang đất Tống (1075)' },
      { p: 'Quân Tống chuẩn bị xâm lược nước ta. Lý Thường Kiệt áp dụng chiến lược "TIÊN PHÁT CHẾ NHÂN" — ra tay trước. Năm 1075, ông đem quân đánh sang đất Tống, hạ thành Ung Châu, Khâm Châu, Liêm Châu, phá tan kế hoạch xâm lược.' },
      { h: 'Chiến thắng sông Như Nguyệt (1077)' },
      { ul: [
        'Năm 1076, quân Tống do Quách Quỳ chỉ huy sang xâm lược nước ta.',
        'Lý Thường Kiệt lập phòng tuyến trên sông NHƯ NGUYỆT (sông Cầu, Bắc Ninh ngày nay).',
        'Đêm khuya, từ trong đền có tiếng đọc bài thơ "NAM QUỐC SƠN HÀ" → quân ta hăng hái, quân địch hoang mang.',
        'Năm 1077, quân ta đánh tan quân Tống.',
      ] },
      { h: 'Bài thơ "Nam quốc sơn hà"' },
      { p: '"Sông núi nước Nam vua Nam ở / Rành rành định phận tại sách trời / Cớ sao lũ giặc sang xâm phạm / Chúng bay sẽ bị đánh tơi bời." → Được coi là BẢN TUYÊN NGÔN ĐỘC LẬP đầu tiên của Việt Nam.' },
      { note: 'Lý Thường Kiệt là tướng tài lại có tài văn — câu thơ trở thành niềm tự hào dân tộc.' },
    ],
    examples: [
      { q: 'Lý Thường Kiệt đánh thắng quân Tống trên sông nào? Năm nào?', a: 'Sông NHƯ NGUYỆT (sông Cầu, Bắc Ninh), năm 1077.' },
      { q: 'Bài thơ "Nam quốc sơn hà" có ý nghĩa gì?', a: 'Khẳng định chủ quyền độc lập của nước Nam — được coi là BẢN TUYÊN NGÔN ĐỘC LẬP ĐẦU TIÊN của dân tộc Việt Nam.' },
    ],
  },

  'P4LSDL-w25-quiz': {
    topic: 'Nhà Trần và ba lần chống Mông – Nguyên',
    intro: 'Tuần này các em học về nhà Trần — triều đại ba lần đánh thắng quân Mông – Nguyên hùng mạnh nhất thế giới khi đó nhé!',
    objectives: [
      'Biết nhà Trần thành lập năm nào.',
      'Ba lần kháng chiến chống Mông – Nguyên.',
      'Vai trò Trần Hưng Đạo.',
    ],
    theory: [
      { h: 'Nhà Trần thành lập' },
      { p: 'Năm 1225, TRẦN CẢNH (8 tuổi) được Lý Chiêu Hoàng nhường ngôi → mở đầu nhà TRẦN, lấy hiệu là TRẦN THÁI TÔNG. Triều Trần kéo dài 175 năm (1225–1400).' },
      { h: '3 lần chống Mông – Nguyên' },
      { ul: [
        'Lần 1 (1258): đánh thắng quân Mông Cổ. Vua Trần Thái Tông rút khỏi Thăng Long rồi phản công thắng lớn ở ĐÔNG BỘ ĐẦU.',
        'Lần 2 (1285): đánh thắng quân Nguyên (50 vạn) do Thoát Hoan chỉ huy. TRẦN HƯNG ĐẠO chỉ huy. Hội nghị Bình Than, Diên Hồng quyết tâm đánh.',
        'Lần 3 (1288): chiến thắng vang dội trên sông BẠCH ĐẰNG. Bắt sống Ô Mã Nhi.',
      ] },
      { h: 'Trần Hưng Đạo' },
      { p: 'TRẦN QUỐC TUẤN (1228–1300), tước Hưng Đạo Đại Vương, là tổng chỉ huy 3 lần kháng chiến. Viết "Hịch tướng sĩ" và "Binh thư yếu lược". Được tôn xưng ĐỨC THÁNH TRẦN.' },
      { note: 'Hội nghị DIÊN HỒNG (1284) là cuộc họp các bô lão cả nước, đồng thanh "ĐÁNH!" để chống quân Nguyên. Tinh thần "Sát Thát" được khắc trên cánh tay binh sĩ.' },
    ],
    examples: [
      { q: 'Nhà Trần đánh thắng quân Mông – Nguyên mấy lần? Vào những năm nào?', a: '3 LẦN: năm 1258, năm 1285, năm 1288 (chiến thắng Bạch Đằng).' },
      { q: 'Vị tướng chỉ huy chính trong 3 lần kháng chiến chống Mông – Nguyên là ai?', a: 'TRẦN HƯNG ĐẠO (Trần Quốc Tuấn) — Hưng Đạo Đại Vương, được tôn xưng Đức Thánh Trần.' },
    ],
  },

  'P4LSDL-w26-quiz': {
    topic: 'Khởi nghĩa Lam Sơn – Lê Lợi & Nguyễn Trãi',
    intro: 'Tuần này các em học khởi nghĩa LAM SƠN do LÊ LỢI lãnh đạo, đánh đuổi giặc Minh nhé!',
    objectives: [
      'Biết khởi nghĩa Lam Sơn.',
      'Vai trò Lê Lợi, Nguyễn Trãi.',
      '"Bình Ngô đại cáo".',
    ],
    theory: [
      { h: 'Bối cảnh' },
      { p: 'Năm 1407, quân MINH xâm lược nước ta. Đặt ách đô hộ tàn bạo: bắt người, vơ vét của cải, áp đặt văn hoá Hán. Nhiều cuộc khởi nghĩa nổ ra nhưng đều bị đàn áp.' },
      { h: 'Khởi nghĩa Lam Sơn (1418–1427)' },
      { ul: [
        'Năm 1418, LÊ LỢI dựng cờ khởi nghĩa ở LAM SƠN (Thanh Hoá), tự xưng BÌNH ĐỊNH VƯƠNG.',
        'NGUYỄN TRÃI dâng "Bình Ngô sách" → trở thành quân sư chính.',
        'Lúc đầu nhỏ yếu, nhiều lần bị bao vây, đói khát.',
        'Sau chuyển sang đánh lớn, thắng nhiều trận: Tốt Động – Chúc Động (1426), Chi Lăng – Xương Giang (1427).',
        'Tướng giặc LIỄU THĂNG bị chém ở ải CHI LĂNG.',
      ] },
      { h: 'Kết quả' },
      { p: 'Năm 1428, quân Minh đầu hàng, rút về nước. Lê Lợi lên ngôi (LÊ THÁI TỔ), lập nhà HẬU LÊ. Đóng đô ở ĐÔNG KINH (Thăng Long).' },
      { h: 'Bình Ngô đại cáo' },
      { p: 'NGUYỄN TRÃI thay Lê Lợi viết "BÌNH NGÔ ĐẠI CÁO" — áng văn hùng tráng tuyên bố nền độc lập, được coi là "thiên cổ hùng văn" và bản TUYÊN NGÔN ĐỘC LẬP THỨ HAI của Việt Nam.' },
      { note: 'Truyền thuyết: vua Lê Lợi được rùa thần ở Hồ Hoàn Kiếm cho mượn gươm thần để đánh giặc, sau khi thắng trả lại — nên hồ có tên HOÀN KIẾM (trả gươm).' },
    ],
    examples: [
      { q: 'Khởi nghĩa Lam Sơn do ai lãnh đạo, kéo dài bao lâu?', a: 'Do LÊ LỢI lãnh đạo, kéo dài 10 năm (1418–1428). Quân sư là NGUYỄN TRÃI.' },
      { q: 'Trận đánh quyết định trong khởi nghĩa Lam Sơn diễn ra ở đâu?', a: 'Trận CHI LĂNG – XƯƠNG GIANG (1427), tướng giặc LIỄU THĂNG bị chém ở ải Chi Lăng.' },
    ],
  },

  'P4LSDL-w27-quiz': {
    topic: 'Nhà Hậu Lê',
    intro: 'Tuần này các em học về nhà Hậu Lê — triều đại hưng thịnh sau khi Lê Lợi đánh thắng giặc Minh nhé!',
    objectives: [
      'Biết các đời vua đầu nhà Hậu Lê.',
      'Hiểu Bộ luật Hồng Đức.',
      'Văn hoá – giáo dục thời Lê Thánh Tông.',
    ],
    theory: [
      { h: 'Các đời vua đầu' },
      { ul: [
        'Lê Thái Tổ (LÊ LỢI) — vị vua sáng nghiệp (1428–1433).',
        'Lê Thái Tông (1433–1442).',
        'Lê Nhân Tông (1442–1459).',
        'LÊ THÁNH TÔNG (1460–1497) — vị vua anh minh nhất.',
      ] },
      { h: 'Lê Thánh Tông' },
      { ul: [
        'Là vua giỏi cả văn lẫn võ.',
        'Sửa lại Bộ luật → ban hành BỘ LUẬT HỒNG ĐỨC (1483) — bộ luật tiến bộ bậc nhất Đông Nam Á đương thời, bảo vệ quyền phụ nữ, người yếu thế.',
        'Mở rộng lãnh thổ về phía Nam.',
        'Lập HỘI TAO ĐÀN — hội văn học do chính vua đứng đầu.',
      ] },
      { h: 'Giáo dục' },
      { ul: [
        'Mở rộng QUỐC TỬ GIÁM.',
        'Tổ chức thi Hương, thi Hội, thi Đình ba năm một lần.',
        'Khắc tên người đỗ TIẾN SĨ lên BIA ĐÁ đặt ở Văn Miếu.',
      ] },
      { note: 'Bộ luật Hồng Đức có nhiều điều bảo vệ phụ nữ — cho phụ nữ quyền thừa kế, ly hôn… tiến bộ hơn nhiều nước phương Đông cùng thời.' },
    ],
    examples: [
      { q: 'Vua nào thời Hậu Lê được coi là anh minh nhất?', a: 'LÊ THÁNH TÔNG (1460–1497). Ban hành Bộ luật Hồng Đức, mở rộng lãnh thổ, lập Hội Tao Đàn.' },
      { q: 'Bộ luật Hồng Đức ban hành năm nào, có điểm tiến bộ gì?', a: 'Năm 1483, dưới thời vua Lê Thánh Tông. Tiến bộ ở việc bảo vệ quyền phụ nữ, người yếu thế.' },
    ],
  },

  'P4LSDL-w28-quiz': {
    topic: 'Trịnh – Nguyễn phân tranh',
    intro: 'Tuần này các em tìm hiểu thời kì đất nước bị chia cắt — Đàng Ngoài, Đàng Trong nhé!',
    objectives: [
      'Biết tình hình thời Trịnh – Nguyễn.',
      'Hiểu sông Gianh là ranh giới chia cắt.',
      'Tác hại của chiến tranh.',
    ],
    theory: [
      { h: 'Bối cảnh' },
      { p: 'Cuối thế kỉ 16, nhà Lê suy yếu. Mạc Đăng Dung cướp ngôi → nhà Mạc. Sau đó nhà Lê được khôi phục (Lê Trung Hưng) nhưng quyền hành thực tế nằm trong tay 2 dòng họ TRỊNH và NGUYỄN.' },
      { h: 'Phân chia Đàng Ngoài – Đàng Trong' },
      { ul: [
        'ĐÀNG NGOÀI: từ sông Gianh trở ra — do chúa TRỊNH cai quản, vua Lê chỉ ngồi làm vì.',
        'ĐÀNG TRONG: từ sông Gianh trở vào — do chúa NGUYỄN cai quản.',
        'Ranh giới: SÔNG GIANH (tỉnh Quảng Bình ngày nay).',
        'Hai bên đánh nhau từ 1627 đến 1672, kéo dài 45 năm, không phân thắng bại.',
      ] },
      { h: 'Hậu quả' },
      { ul: [
        'Đất nước bị chia cắt hơn 200 năm.',
        'Nhân dân khổ sở vì chiến tranh, sưu thuế.',
        'Tạo điều kiện cho giặc ngoại xâm dòm ngó.',
      ] },
      { h: 'Khai phá đất Đàng Trong' },
      { p: 'Chúa Nguyễn đẩy mạnh khai phá vùng đất phía Nam: chiếm Chăm-pa, sau đó mở rộng đến tận đồng bằng sông Cửu Long. Mở rộng lãnh thổ về phía Nam.' },
      { note: 'Sông Gianh dài 160 km, chảy qua tỉnh Quảng Bình, là ranh giới đầy nước mắt giữa Đàng Ngoài và Đàng Trong.' },
    ],
    examples: [
      { q: 'Ranh giới giữa Đàng Ngoài và Đàng Trong là sông nào?', a: 'SÔNG GIANH (tỉnh Quảng Bình ngày nay).' },
      { q: 'Chúa Trịnh nắm quyền ở đâu, chúa Nguyễn ở đâu?', a: 'Chúa TRỊNH nắm quyền ở ĐÀNG NGOÀI (từ sông Gianh trở ra). Chúa NGUYỄN nắm quyền ở ĐÀNG TRONG (từ sông Gianh trở vào).' },
    ],
  },

  'P4LSDL-w29-quiz': {
    topic: 'Phong trào Tây Sơn và Quang Trung',
    intro: 'Tuần này các em học về anh hùng QUANG TRUNG – NGUYỄN HUỆ, vị vua đại phá quân Thanh nhé!',
    objectives: [
      'Biết phong trào Tây Sơn.',
      'Chiến thắng Ngọc Hồi – Đống Đa.',
      'Vai trò Quang Trung – Nguyễn Huệ.',
    ],
    theory: [
      { h: 'Khởi nghĩa Tây Sơn' },
      { ul: [
        'Năm 1771, ba anh em NGUYỄN NHẠC, NGUYỄN HUỆ, NGUYỄN LỮ dựng cờ khởi nghĩa ở TÂY SƠN (Bình Định ngày nay).',
        'Lật đổ chúa Nguyễn ở Đàng Trong.',
        'Năm 1785, Nguyễn Huệ đánh tan 5 vạn quân Xiêm xâm lược ở RẠCH GẦM – XOÀI MÚT.',
        'Năm 1786, lật đổ chúa Trịnh ở Đàng Ngoài.',
      ] },
      { h: 'Đại phá quân Thanh (1789)' },
      { ul: [
        'Cuối năm 1788, vua Lê Chiêu Thống cầu cứu quân THANH. 29 vạn quân Thanh do TÔN SĨ NGHỊ chỉ huy tràn vào Thăng Long.',
        'Nguyễn Huệ lên ngôi hoàng đế, lấy hiệu QUANG TRUNG, kéo quân ra Bắc.',
        'Đêm 30 Tết Kỷ Dậu 1789, hành quân thần tốc từ Phú Xuân (Huế) ra Thăng Long.',
        'Mùng 5 Tết (30/1/1789), Quang Trung đại thắng ở trận NGỌC HỒI – ĐỐNG ĐA. Tôn Sĩ Nghị bỏ chạy về nước.',
      ] },
      { h: 'Ý nghĩa' },
      { p: 'Quang Trung đã đánh tan ngoại xâm, bảo vệ độc lập dân tộc. Cuộc hành quân "thần tốc" của ông là kì tích quân sự của lịch sử Việt Nam.' },
      { note: 'Quang Trung mất sớm năm 1792 (chỉ ở ngôi 4 năm). Nếu sống thêm, có thể ông đã làm thay đổi vận mệnh đất nước nhiều hơn.' },
    ],
    examples: [
      { q: 'Quang Trung đại phá quân Thanh năm nào, ở đâu?', a: 'Năm 1789 (Tết Kỷ Dậu), ở NGỌC HỒI – ĐỐNG ĐA (Hà Nội ngày nay). Đánh tan 29 vạn quân Thanh do Tôn Sĩ Nghị chỉ huy.' },
      { q: 'Ba anh em Tây Sơn quê ở đâu? Tên là gì?', a: 'Quê ở TÂY SƠN (Bình Định). Ba anh em: NGUYỄN NHẠC, NGUYỄN HUỆ (sau là vua Quang Trung), NGUYỄN LỮ.' },
    ],
  },

  'P4LSDL-w30-quiz': {
    topic: 'Triều Nguyễn và Gia Long',
    intro: 'Tuần này các em tìm hiểu triều Nguyễn — triều đại phong kiến CUỐI CÙNG của Việt Nam nhé!',
    objectives: [
      'Biết Gia Long lập triều Nguyễn.',
      'Đóng đô ở Huế.',
      'Một số chính sách của triều Nguyễn.',
    ],
    theory: [
      { h: 'Gia Long lập triều Nguyễn' },
      { ul: [
        'NGUYỄN ÁNH (con cháu chúa Nguyễn) chống lại Tây Sơn nhiều năm.',
        'Năm 1802, Nguyễn Ánh đánh bại nhà Tây Sơn, lập ra triều NGUYỄN, lấy hiệu là GIA LONG.',
        'Đóng đô ở PHÚ XUÂN (HUẾ).',
        'Đặt tên nước là VIỆT NAM (1804) — tên gọi chính thức mà ta dùng đến nay.',
      ] },
      { h: 'Các đời vua chính' },
      { ul: [
        'Gia Long (1802–1820).',
        'MINH MẠNG (1820–1841) — vị vua tài giỏi, mở rộng lãnh thổ.',
        'Thiệu Trị (1841–1847).',
        'Tự Đức (1847–1883).',
        'Bảo Đại (1925–1945) — vị vua CUỐI CÙNG, thoái vị ngày 30/8/1945.',
      ] },
      { h: 'Một số việc' },
      { ul: [
        'Xây dựng kinh thành Huế, các lăng tẩm.',
        'Soạn Bộ luật Gia Long.',
        'Tổ chức bộ máy hành chính: chia cả nước thành các tỉnh.',
        'Khẳng định chủ quyền Hoàng Sa, Trường Sa.',
      ] },
      { note: 'Triều Nguyễn kéo dài 143 năm (1802–1945), gồm 13 đời vua. Là triều đại phong kiến cuối cùng của Việt Nam.' },
    ],
    examples: [
      { q: 'Triều Nguyễn do ai lập, vào năm nào, đóng đô ở đâu?', a: 'Do NGUYỄN ÁNH lập năm 1802. Đóng đô ở PHÚ XUÂN (HUẾ). Vua đầu tiên là GIA LONG.' },
      { q: 'Tên nước VIỆT NAM có từ năm nào, dưới triều vua nào?', a: 'Năm 1804, dưới triều vua GIA LONG (triều Nguyễn) — tên gọi chính thức được dùng đến ngày nay.' },
    ],
  },

  'P4LSDL-w31-quiz': {
    topic: 'Pháp xâm lược và phong trào Cần Vương',
    intro: 'Tuần này các em học giai đoạn Pháp xâm lược Việt Nam và phong trào CẦN VƯƠNG yêu nước nhé!',
    objectives: [
      'Biết Pháp xâm lược năm nào.',
      'Phong trào Cần Vương.',
      'Một số phong trào yêu nước.',
    ],
    theory: [
      { h: 'Pháp xâm lược' },
      { ul: [
        'Năm 1858, thực dân Pháp nổ súng tấn công ĐÀ NẴNG — mở đầu cuộc xâm lược Việt Nam.',
        'Sau đó chiếm lần lượt Nam Kì, Trung Kì, Bắc Kì.',
        'Năm 1884, triều đình Huế kí Hiệp ước Pa-tơ-nốt → Việt Nam chính thức trở thành thuộc địa của Pháp.',
      ] },
      { h: 'Phong trào Cần Vương (1885–1896)' },
      { ul: [
        'Năm 1885, vua HÀM NGHI (mới 14 tuổi) cùng TÔN THẤT THUYẾT phát động phong trào CẦN VƯƠNG (giúp vua đánh giặc).',
        'Nhiều cuộc khởi nghĩa nổ ra: BA ĐÌNH (Thanh Hoá – Phạm Bành, Đinh Công Tráng), BÃI SẬY (Hưng Yên – Nguyễn Thiện Thuật), HƯƠNG KHÊ (Hà Tĩnh – PHAN ĐÌNH PHÙNG).',
        'Đến năm 1896, các cuộc khởi nghĩa đều thất bại.',
      ] },
      { h: 'Phong trào yêu nước khác' },
      { ul: [
        'Khởi nghĩa Yên Thế (HOÀNG HOA THÁM, 1884–1913).',
        'Phan Bội Châu lập phong trào Đông Du (1905).',
        'Phan Châu Trinh chủ trương duy tân, cải cách.',
      ] },
      { note: 'Vua Hàm Nghi sau bị Pháp bắt và đày sang An-giê-ri năm 1888, ở đó cho đến cuối đời.' },
    ],
    examples: [
      { q: 'Pháp nổ súng xâm lược Việt Nam năm nào, ở đâu?', a: 'Năm 1858, tại ĐÀ NẴNG. Đây là mở đầu cuộc xâm lược Việt Nam của thực dân Pháp.' },
      { q: 'Phong trào Cần Vương do ai phát động? Nghĩa là gì?', a: 'Do vua HÀM NGHI và Tôn Thất Thuyết phát động năm 1885. CẦN VƯƠNG nghĩa là "giúp vua" (chống Pháp).' },
    ],
  },

  'P4LSDL-w32-quiz': {
    topic: 'Việt Nam từ thế kỉ XX',
    intro: 'Tuần này các em học giai đoạn lịch sử cận đại — Bác Hồ và Cách mạng tháng Tám nhé!',
    objectives: [
      'Biết Bác Hồ và hành trình tìm đường cứu nước.',
      'Cách mạng tháng Tám 1945.',
      'Ngày Quốc khánh 2/9.',
    ],
    theory: [
      { h: 'Bác Hồ và hành trình' },
      { ul: [
        'NGUYỄN ÁI QUỐC (Bác Hồ) sinh năm 1890 tại Nghệ An.',
        'Ngày 5/6/1911, từ Bến Nhà Rồng (Sài Gòn) rời Tổ quốc đi tìm đường cứu nước.',
        'Ở Pháp, Bác đọc bản Luận cương của Lê-nin → tin theo chủ nghĩa Mác – Lê-nin.',
        'Năm 1930, sáng lập ĐẢNG CỘNG SẢN VIỆT NAM tại Hồng Kông.',
        'Năm 1941, về nước trực tiếp lãnh đạo cách mạng tại PÁC BÓ (Cao Bằng).',
      ] },
      { h: 'Cách mạng tháng Tám 1945' },
      { ul: [
        'Đầu năm 1945, phát xít Nhật đảo chính Pháp, độc chiếm Đông Dương.',
        'Tháng 8/1945, phát xít Nhật đầu hàng Đồng minh → thời cơ ngàn năm có một.',
        'Ngày 19/8/1945, khởi nghĩa thành công ở HÀ NỘI.',
        'Ngày 23/8 ở Huế, 25/8 ở Sài Gòn — Tổng khởi nghĩa thắng lợi cả nước.',
        'Ngày 30/8/1945, vua BẢO ĐẠI thoái vị → chấm dứt chế độ phong kiến.',
      ] },
      { h: 'Quốc khánh 2/9/1945' },
      { p: 'Ngày 2/9/1945, tại quảng trường BA ĐÌNH (Hà Nội), Chủ tịch HỒ CHÍ MINH đọc bản TUYÊN NGÔN ĐỘC LẬP, khai sinh nước VIỆT NAM DÂN CHỦ CỘNG HOÀ. Ngày 2/9 trở thành ngày QUỐC KHÁNH của nước ta.' },
      { note: 'Câu mở đầu Tuyên ngôn: "Tất cả mọi người đều sinh ra có quyền bình đẳng. Tạo hoá cho họ những quyền không ai có thể xâm phạm được…"' },
    ],
    examples: [
      { q: 'Ngày Quốc khánh của Việt Nam là ngày nào? Năm nào?', a: 'Ngày 2/9/1945. Bác Hồ đọc Tuyên ngôn Độc lập tại quảng trường Ba Đình, khai sinh nước Việt Nam Dân chủ Cộng hoà.' },
      { q: 'Bác Hồ ra đi tìm đường cứu nước năm nào, từ đâu?', a: 'Ngày 5/6/1911, từ Bến Nhà Rồng (Sài Gòn). Khi đó Bác lấy tên Văn Ba, làm phụ bếp trên tàu Đô đốc La-tu-sơ Tơ-rê-vin.' },
    ],
  },

  'P4LSDL-w33-quiz': {
    topic: 'Vùng đất nơi em sống',
    intro: 'Tuần này các em tìm hiểu về chính quê hương — vùng đất nơi em sinh ra và lớn lên nhé!',
    objectives: [
      'Tự hào về quê hương.',
      'Biết tên tỉnh/thành mình ở.',
      'Một số đặc trưng địa phương.',
    ],
    theory: [
      { h: 'Quê hương em' },
      { ul: [
        'Tên tỉnh/thành phố em đang sống.',
        'Vùng địa lý: thuộc miền Bắc, Trung hay Nam?',
        'Thuộc vùng nào (Đồng bằng Bắc Bộ, Tây Nguyên…)?',
      ] },
      { h: 'Đặc trưng địa phương' },
      { ul: [
        'Địa danh nổi tiếng: chùa, đền, biển, núi…',
        'Đặc sản: món ăn, sản vật.',
        'Lễ hội truyền thống.',
        'Nhân vật lịch sử quê hương.',
      ] },
      { h: 'Yêu quê hương' },
      { ul: [
        'Giữ gìn vệ sinh nơi mình sống.',
        'Bảo vệ di tích, cây xanh.',
        'Học giỏi để mai sau xây dựng quê hương.',
        'Tự hào giới thiệu quê hương với bạn bè.',
      ] },
      { note: 'Hãy hỏi ông bà, bố mẹ về lịch sử quê hương em — sẽ có nhiều câu chuyện thú vị!' },
    ],
    examples: [
      { q: 'Em đang sống ở tỉnh/thành nào? Thuộc miền nào của Việt Nam?', a: 'Tuỳ học sinh trả lời. Ví dụ: "Em sống ở Hà Nội, thuộc miền Bắc, vùng Đồng bằng Bắc Bộ."' },
      { q: 'Đặc sản quê em là gì?', a: 'Tuỳ địa phương. Ví dụ: Phở Hà Nội, Bún bò Huế, Hủ tiếu Mỹ Tho, Bánh xèo miền Tây…' },
    ],
  },

  'P4LSDL-w34-quiz': {
    topic: 'Ôn tập học kì II',
    intro: 'Tuần áp chót! Cùng cô hệ thống lại LỊCH SỬ Việt Nam từ Văn Lang đến thế kỉ XX nhé các em!',
    objectives: [
      'Hệ thống các triều đại.',
      'Nhớ các chiến thắng tiêu biểu.',
      'Anh hùng dân tộc.',
    ],
    theory: [
      { h: 'Các triều đại theo thời gian' },
      { ul: [
        'Văn Lang (vua Hùng) → Âu Lạc (An Dương Vương).',
        '1.000 năm Bắc thuộc (179 TCN – 938).',
        'Nhà NGÔ (Ngô Quyền), Đinh, Tiền Lê.',
        'Nhà LÝ (1009–1225) — Lý Thái Tổ dời đô về Thăng Long.',
        'Nhà TRẦN (1225–1400) — chống Mông-Nguyên 3 lần.',
        'Nhà Hồ → 20 năm Minh thuộc.',
        'Nhà HẬU LÊ (Lê Lợi đánh thắng Minh, 1428–1788).',
        'TÂY SƠN (Quang Trung đánh Thanh, 1789).',
        'Nhà NGUYỄN (1802–1945) — Gia Long lập, Bảo Đại thoái vị.',
        'Nước Việt Nam Dân chủ Cộng hoà (2/9/1945).',
      ] },
      { h: 'Chiến thắng lớn' },
      { ul: [
        'Bạch Đằng 938 (Ngô Quyền) – chống Nam Hán.',
        'Như Nguyệt 1077 (Lý Thường Kiệt) – chống Tống.',
        'Bạch Đằng 1288 (Trần Hưng Đạo) – chống Nguyên.',
        'Chi Lăng – Xương Giang 1427 (Lê Lợi) – chống Minh.',
        'Ngọc Hồi – Đống Đa 1789 (Quang Trung) – chống Thanh.',
      ] },
      { note: 'Mỗi triều đại có những anh hùng riêng — hãy nhớ tên và công lao của họ.' },
    ],
    examples: [
      { q: 'Hai chiến thắng trên sông Bạch Đằng do ai chỉ huy?', a: 'Bạch Đằng 938 – NGÔ QUYỀN chống Nam Hán. Bạch Đằng 1288 – TRẦN HƯNG ĐẠO chống Nguyên (cả 2 đều dùng kế cọc gỗ).' },
      { q: 'Sắp xếp đúng thứ tự: Nhà Lý, Nhà Trần, Nhà Hậu Lê, Triều Nguyễn.', a: 'Theo thứ tự thời gian: LÝ (1009) → TRẦN (1225) → HẬU LÊ (1428) → NGUYỄN (1802).' },
    ],
  },

  'P4LSDL-w35-quiz': {
    topic: 'Kiểm tra học kì II',
    intro: 'Tuần cuối năm! Các em làm bài kiểm tra học kì 2. Cô chúc các em làm bài thật tốt và lên lớp 5 vững vàng nhé!',
    objectives: [
      'Hoàn thành bài kiểm tra HK2.',
      'Tự tin, bình tĩnh.',
      'Kết thúc năm học vui vẻ.',
    ],
    theory: [
      { h: 'Cấu trúc đề' },
      { ul: [
        'Trắc nghiệm: kiến thức cơ bản về các triều đại, chiến thắng.',
        'Tự luận: nêu ý nghĩa sự kiện, anh hùng.',
        'Câu hỏi mở: liên hệ tình yêu quê hương đất nước.',
      ] },
      { h: 'Mẹo nhớ năm' },
      { ul: [
        '938: BẠCH ĐẰNG – Ngô Quyền.',
        '1010: DỜI ĐÔ – Lý Thái Tổ.',
        '1077: NHƯ NGUYỆT – Lý Thường Kiệt.',
        '1288: BẠCH ĐẰNG 2 – Trần Hưng Đạo.',
        '1428: LAM SƠN – Lê Lợi.',
        '1789: ĐỐNG ĐA – Quang Trung.',
        '1858: PHÁP xâm lược – Đà Nẵng.',
        '1945: CÁCH MẠNG THÁNG TÁM – ngày 2/9 Quốc khánh.',
      ] },
      { h: 'Tinh thần khi làm bài' },
      { ul: [
        'Đọc kĩ đề.',
        'Câu dễ làm trước.',
        'Viết rõ năm tháng, địa danh, tên người.',
        'Còn thời gian thì kiểm tra lại.',
      ] },
      { note: 'Cô tự hào về các em đã hoàn thành lớp 4. Chúc các em nghỉ hè vui khoẻ và lên lớp 5 thật giỏi!' },
    ],
    examples: [
      { q: 'Năm 1789 có sự kiện gì? Liên quan đến vị anh hùng nào?', a: 'Năm 1789, vua QUANG TRUNG đại phá quân THANH ở NGỌC HỒI – ĐỐNG ĐA (Hà Nội), giải phóng Thăng Long.' },
      { q: 'Em có cảm nhận gì về các anh hùng dân tộc Việt Nam?', a: 'Tự hào, biết ơn vì các anh hùng đã hi sinh để bảo vệ độc lập đất nước. Em cố gắng học giỏi để xây dựng quê hương.' },
    ],
  },

  'P4LSDL-w36-quiz': {
    topic: 'Kết thúc Lớp 4 — Hành trang Lịch sử & Địa lý vào Lớp 5',
    intro: 'Chúc mừng các em đã hoàn thành năm học Lịch sử & Địa lý Lớp 4! Hôm nay cô cùng trò ôn lại hành trình từ địa lý tự nhiên đến lịch sử dân tộc, và chuẩn bị cho năm học mới thú vị hơn ở Lớp 5!',
    objectives: [
      'Hệ thống toàn bộ kiến thức Lịch sử và Địa lý Lớp 4.',
      'Hiểu mối liên hệ giữa địa lý tự nhiên và lịch sử dân tộc.',
      'Sẵn sàng học Lịch sử & Địa lý ở tầm rộng hơn trong Lớp 5.',
    ],
    theory: [
      { h: 'Địa lý Lớp 4 — Đất nước và con người Việt Nam' },
      { ul: [
        'Vị trí địa lý: Việt Nam ở Đông Nam Á, giáp Trung Quốc (Bắc), Lào, Campuchia (Tây), Biển Đông (Đông-Nam).',
        'Địa hình: 3/4 là đồi núi; đồng bằng sông Hồng (Bắc Bộ) và sông Cửu Long (Nam Bộ) là vựa lúa.',
        'Sông ngòi: sông Hồng (miền Bắc), sông Mã, sông Cả (miền Trung), sông Cửu Long (miền Nam).',
        'Khí hậu: nhiệt đới gió mùa; miền Bắc 4 mùa; miền Nam 2 mùa (mưa-khô).',
        'Dân cư và dân tộc: 54 dân tộc anh em; người Kinh chiếm đa số.',
        'Vùng kinh tế: Đồng bằng Bắc Bộ (công nghiệp, lúa); Tây Nguyên (cà phê, cao su); Nam Bộ (lúa, thuỷ sản, dầu khí).',
      ] },
      { h: 'Lịch sử Lớp 4 — Chặng đường dựng nước và giữ nước' },
      { ul: [
        'Thuở dựng nước: Hùng Vương, nhà nước Văn Lang (2879 TCN); thành Cổ Loa — An Dương Vương.',
        'Nghìn năm Bắc thuộc: Hai Bà Trưng (40–43); Bà Triệu (248); Lý Bí — nhà Tiền Lý (544).',
        'Độc lập tự chủ: Ngô Quyền — chiến thắng Bạch Đằng (938); Đinh Bộ Lĩnh thống nhất — Đại Cồ Việt (968).',
        'Thời Lý–Trần–Lê: Lý Thái Tổ dời đô (1010); Nhà Trần 3 lần chống Mông–Nguyên; Lê Lợi — Lam Sơn (1418–1428).',
        'Giai đoạn cận đại: Pháp xâm lược 1858; Phong trào Cần Vương, Yên Bái, Xô Viết Nghệ Tĩnh.',
        'Cách mạng tháng Tám 1945 — Hồ Chí Minh đọc Tuyên ngôn Độc lập 2/9/1945.',
      ] },
      { h: 'Lịch sử & Địa lý Lớp 5 sẽ học gì?' },
      { ul: [
        'Địa lý: các châu lục và đại dương; đặc điểm tự nhiên và kinh tế các vùng trên thế giới.',
        'Lịch sử: Việt Nam từ 1945 đến nay — kháng chiến, thống nhất, đổi mới và hội nhập.',
      ] },
      { note: 'Lịch sử là gốc rễ, địa lý là không gian — hiểu hai thứ đó, em hiểu chính đất nước mình đang sống!' },
    ],
    examples: [
      { q: 'Trận Bạch Đằng năm 938 do ai chỉ huy và đánh thắng quân nào?', a: 'NGÔ QUYỀN chỉ huy, đánh thắng quân NAM HÁN trên sông Bạch Đằng — mở ra kỷ nguyên độc lập.' },
      { q: 'Tại sao đồng bằng sông Cửu Long là vựa lúa lớn nhất nước?', a: 'Địa hình bằng phẳng, đất phù sa màu mỡ, hệ thống sông kênh rạch cung cấp nước tưới dồi dào, khí hậu nóng ẩm thuận lợi trồng lúa 2–3 vụ/năm.' },
    ],
  },
};
