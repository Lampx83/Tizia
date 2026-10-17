// ============================================================
// Lớp 11 · CÔNG NGHỆ (Công nghệ Cơ khí) — Lý thuyết tuần (35 tuần)
// Bám CT GDPT 2018 (Công nghệ 11 — định hướng Công nghệ Cơ khí).
// HK1 (1–18): Phần 1 — Cơ khí chế tạo. HK2 (19–35): Phần 2 — Cơ khí động lực.
// Key trùng id quiz: "H11CN-wNN-quiz".
// ============================================================

export const H11CN_LESSONS = {
  'H11CN-w01-quiz': {
    topic: 'Khái quát về cơ khí chế tạo',
    intro: 'Chào các em! Mở đầu chương trình Công nghệ 11 định hướng Cơ khí, chúng ta cùng tìm hiểu cơ khí chế tạo là gì và vì sao đây là ngành xương sống của mọi nền công nghiệp.',
    objectives: [
      'Trình bày được khái niệm và đối tượng của cơ khí chế tạo.',
      'Nêu được vai trò của cơ khí chế tạo đối với sản xuất và đời sống.',
      'Mô tả được các yêu cầu cơ bản để chế tạo một sản phẩm cơ khí.',
    ],
    theory: [
      { h: 'Cơ khí chế tạo là gì?' },
      { p: 'Cơ khí chế tạo là lĩnh vực thiết kế và làm ra các sản phẩm cơ khí — từ một chi tiết nhỏ như con ốc đến cả một cỗ máy — phục vụ sản xuất và đời sống. Sản phẩm của nó là máy móc, thiết bị, dụng cụ và các chi tiết máy.' },
      { h: 'Vai trò trong nền kinh tế' },
      { p: 'Cơ khí chế tạo cung cấp tư liệu sản xuất — tức là máy móc, công cụ — cho hầu hết các ngành khác: nông nghiệp cần máy cày, xây dựng cần cần cẩu, y tế cần thiết bị mổ. Không có cơ khí thì các ngành khác khó cơ giới hoá.' },
      { ul: ['Tạo ra máy móc thay sức người, tăng năng suất.', 'Là nền tảng cho công nghiệp ô tô, hàng không, đóng tàu.', 'Quyết định khả năng tự chủ công nghệ của một quốc gia.'] },
      { h: 'Đặc điểm của sản phẩm cơ khí' },
      { p: 'Khác với sản phẩm thủ công tuỳ hứng, mỗi chi tiết cơ khí phải có hình dạng, kích thước, vật liệu và độ chính xác xác định trước. Vì vậy để chế tạo cần đủ bốn thứ: bản vẽ kỹ thuật, vật liệu phù hợp, phương pháp gia công và dụng cụ đo kiểm.' },
      { note: 'Ngành cơ khí Việt Nam đang chuyển từ thủ công sang hiện đại hoá — ứng dụng CAD (thiết kế bằng máy tính), CAM (sản xuất bằng máy tính) và CNC (điều khiển số) trong xu thế Công nghiệp 4.0.' },
    ],
    examples: [
      { q: 'Bài tập: Vì sao nói cơ khí chế tạo là ngành "mẹ" của công nghiệp?', a: 'Giải: Vì nó làm ra máy móc, thiết bị cho mọi ngành khác. Một nhà máy dệt, một xưởng in hay một trang trại đều phải mua máy do ngành cơ khí chế tạo. Không có cơ khí thì không cơ giới hoá được ngành nào.' },
      { q: 'Bài tập: Để làm ra một bánh răng đúng yêu cầu, người thợ cần chuẩn bị những gì?', a: 'Giải: Cần bản vẽ kỹ thuật (mô-đun, số răng, kích thước), vật liệu (thép phù hợp), phương pháp gia công (phay hoặc lăn răng) và dụng cụ đo (thước kẹp, dưỡng) để kiểm tra sau khi làm.' },
    ],
  },

  'H11CN-w02-quiz': {
    topic: 'Ngành nghề trong lĩnh vực cơ khí chế tạo',
    intro: 'Chào các em! Hôm nay chúng ta tìm hiểu những nghề nghiệp trong lĩnh vực cơ khí chế tạo, để các em có thêm dữ liệu khi định hướng tương lai.',
    objectives: [
      'Kể được một số nghề tiêu biểu trong cơ khí chế tạo.',
      'Nêu được yêu cầu năng lực và phẩm chất của người làm cơ khí.',
      'Định hướng được con đường học tập để theo nghề.',
    ],
    theory: [
      { h: 'Các nhóm nghề tiêu biểu' },
      { ul: ['Kỹ sư cơ khí: thiết kế, tính toán, lập quy trình, vận hành và bảo trì máy móc.', 'Kỹ thuật viên / công nhân vận hành máy (tiện, phay, CNC).', 'Thợ nguội: gia công nguội bằng tay và dụng cụ (giũa, khoan, lắp ráp).', 'Thợ hàn, thợ đúc, thợ kiểm tra chất lượng (QC).'] },
      { h: 'Công nhân vận hành máy CNC' },
      { p: 'Đây là nghề đang rất cần người. Người vận hành CNC phải biết đọc bản vẽ, hiểu chương trình điều khiển (G-code cơ bản), gá phôi, chọn dao và vận hành máy an toàn. Đây không phải nghề "chỉ ấn nút".' },
      { h: 'Phẩm chất và năng lực cần có' },
      { p: 'Người làm cơ khí cần cẩn thận, chính xác đến từng phần trăm milimét, kiên nhẫn và đặc biệt phải tuân thủ an toàn lao động vì làm việc với máy quay và vật sắc nóng.' },
      { note: 'Để theo nghề cơ khí, các em nên học vững Toán, Vật lí và Công nghệ; rèn kỹ năng đọc bản vẽ và tư duy không gian. Nghề cơ khí sẽ tiếp tục phát triển nhờ tự động hoá, robot, công nghiệp ô tô và hàng không.' },
    ],
    examples: [
      { q: 'Bài tập: Một bạn thích lắp ráp, sửa chữa, tỉ mỉ và không ngại dầu mỡ thì phù hợp với những nghề nào?', a: 'Giải: Phù hợp nghề thợ nguội, kỹ thuật viên cơ khí, vận hành CNC hoặc thợ sửa chữa máy. Nếu bạn học tốt Toán - Lý có thể hướng tới kỹ sư cơ khí để thiết kế và tính toán.' },
      { q: 'Bài tập: Vì sao an toàn lao động là phẩm chất bắt buộc, không phải "có thì tốt"?', a: 'Giải: Vì xưởng cơ khí có máy quay tốc độ cao, phoi sắc, vật nóng. Một sơ suất nhỏ (đeo găng khi đứng máy quay, mặc áo rộng tay) có thể gây tai nạn nghiêm trọng. Tuân thủ an toàn là điều kiện sống còn của nghề.' },
    ],
  },

  'H11CN-w03-quiz': {
    topic: 'Vật liệu kim loại đen',
    intro: 'Chào các em! Tuần này chúng ta bước vào thế giới vật liệu — bắt đầu với nhóm phổ biến nhất trong cơ khí: kim loại đen, tức sắt và hợp kim của sắt.',
    objectives: [
      'Nêu được khái niệm kim loại đen và phân biệt gang với thép.',
      'Trình bày tính chất và ứng dụng của gang, thép cacbon, thép hợp kim.',
      'Giải thích cách chống ăn mòn cho thép.',
    ],
    theory: [
      { h: 'Kim loại đen là gì?' },
      { p: 'Kim loại đen là sắt (Fe) và các hợp kim của sắt — chủ yếu là gang và thép. Đây là nhóm vật liệu dùng nhiều nhất trong cơ khí vì rẻ, bền và dễ kiếm.' },
      { h: 'Phân biệt gang và thép' },
      { p: 'Ranh giới nằm ở hàm lượng cacbon (C). Thép có C nhỏ hơn hoặc bằng 2,14%; gang có C lớn hơn 2,14%. Cacbon càng nhiều thì vật liệu càng cứng nhưng càng giòn.' },
      { ul: ['Gang xám: giòn, dễ đúc, chịu nén và chịu rung tốt — dùng đúc thân máy, bệ máy, vỏ động cơ.', 'Thép cacbon: dẻo dai hơn gang, dùng làm khung kết cấu, chi tiết máy, dụng cụ.', 'Thép hợp kim: thêm Cr, Ni, Mn, Mo… để tăng độ cứng, bền, chống gỉ.'] },
      { h: 'Chống ăn mòn' },
      { p: 'Thép thường dễ bị gỉ. Để chống ăn mòn người ta mạ (kẽm, crom), sơn phủ, hoặc dùng thép không gỉ (inox) — loại thép hợp kim chứa crom từ 10,5% trở lên tạo lớp oxit bảo vệ.' },
      { note: 'Mẹo nhớ: gang Giòn (G - G), thép thì dẻo dai hơn. Gang để đúc khối lớn chịu nén; thép để chịu kéo, chịu uốn và làm chi tiết chuyển động.' },
    ],
    examples: [
      { q: 'Bài tập: Một chi tiết là thân máy công cụ cỡ lớn, chịu rung khi máy chạy. Nên chọn gang xám hay thép?', a: 'Giải: Chọn gang xám. Nó dễ đúc thành khối lớn hình dạng phức tạp, chịu nén tốt và khả năng dập rung (giảm chấn) rất tốt — đúng yêu cầu của bệ và thân máy.' },
      { q: 'Bài tập: Vì sao inox không bị gỉ như thép thường dù cùng gốc sắt?', a: 'Giải: Inox chứa crom từ 10,5% trở lên. Crom phản ứng với oxy tạo một lớp oxit Cr2O3 mỏng, bền, "thụ động" trên bề mặt, ngăn không cho sắt bên trong tiếp xúc với môi trường nên không gỉ.' },
    ],
  },

  'H11CN-w04-quiz': {
    topic: 'Vật liệu kim loại màu',
    intro: 'Chào các em! Sau kim loại đen, hôm nay ta tìm hiểu kim loại màu — những vật liệu nhẹ, dẫn điện tốt và chống ăn mòn như nhôm, đồng, titan.',
    objectives: [
      'Nêu được khái niệm kim loại màu và kể các kim loại màu thông dụng.',
      'Trình bày tính chất, ứng dụng của nhôm, đồng và hợp kim đồng.',
      'Phân biệt đồng thau và đồng thiếc.',
    ],
    theory: [
      { h: 'Kim loại màu là gì?' },
      { p: 'Kim loại màu là tất cả các kim loại không phải sắt và hợp kim của chúng: nhôm (Al), đồng (Cu), kẽm (Zn), niken (Ni), titan (Ti)… Tên gọi "màu" để phân biệt với nhóm sắt - gang - thép (kim loại đen).' },
      { h: 'Nhôm và đồng' },
      { ul: ['Nhôm (Al): nhẹ (khối lượng riêng chỉ bằng khoảng 1/3 thép), dẫn điện tốt, chống ăn mòn nhờ lớp Al2O3 tự bảo vệ — dùng cho thân máy bay, vỏ xe, đồ gia dụng.', 'Đồng (Cu): dẫn điện và dẫn nhiệt rất tốt, dẻo — dùng làm dây dẫn điện, ống dẫn nhiệt, chi tiết chống ăn mòn.'] },
      { h: 'Hợp kim của đồng' },
      { p: 'Đồng thau (brass) là hợp kim đồng - kẽm, cứng và đẹp, dùng làm chi tiết trang trí, van, ốc vít. Đồng thiếc (bronze) là hợp kim đồng - thiếc, chịu mài mòn tốt, dùng làm bạc trượt, bánh vít.' },
      { note: 'Titan (Ti) rất nhẹ và bền, chịu nhiệt, không độc với cơ thể — nên được dùng nhiều trong hàng không, vũ trụ và y khoa (đinh, vít, khớp cấy ghép trong người).' },
    ],
    examples: [
      { q: 'Bài tập: Vì sao dây điện thường làm bằng đồng hoặc nhôm chứ không làm bằng thép?', a: 'Giải: Đồng và nhôm dẫn điện tốt hơn thép rất nhiều. Đồng dẫn điện tốt nhất nên dùng cho dây trong nhà; nhôm nhẹ và rẻ hơn nên dùng cho dây tải điện trên cao đường dài.' },
      { q: 'Bài tập: Phân biệt đồng thau và đồng thiếc theo thành phần.', a: 'Giải: Đồng thau = đồng + kẽm (brass). Đồng thiếc = đồng + thiếc (bronze). Cách nhớ: "thau" có kẽm, "thiếc" thì đúng như tên là có thiếc.' },
    ],
  },

  'H11CN-w05-quiz': {
    topic: 'Vật liệu phi kim loại',
    intro: 'Chào các em! Không phải mọi chi tiết máy đều bằng kim loại. Tuần này ta tìm hiểu vật liệu phi kim — chất dẻo, cao su, gốm và composite ngày càng phổ biến trong cơ khí.',
    objectives: [
      'Kể được các loại vật liệu phi kim dùng trong cơ khí.',
      'Nêu tính chất và ứng dụng của chất dẻo, cao su, gốm kĩ thuật.',
      'Hiểu khái niệm vật liệu composite.',
    ],
    theory: [
      { h: 'Vật liệu phi kim trong cơ khí' },
      { p: 'Gồm bốn nhóm chính: chất dẻo (polymer), cao su, gốm kĩ thuật và composite. Chúng được chọn khi cần giảm khối lượng, cách điện hoặc chống ăn mòn — những việc mà kim loại làm chưa tốt.' },
      { ul: ['Chất dẻo (nhựa kĩ thuật): nhẹ, cách điện, chống ăn mòn, dễ tạo hình bằng ép phun.', 'Cao su: đàn hồi cao, chống rung, làm kín khí — dùng làm lốp, gioăng, đệm chống rung.', 'Gốm kĩ thuật: chịu nhiệt rất cao và chống mài mòn — làm mảnh dao cắt, bộ phận động cơ.'] },
      { h: 'Vật liệu composite' },
      { p: 'Composite là vật liệu tổ hợp từ hai hay nhiều thành phần khác nhau (thường là nền + sợi gia cường) để tận dụng ưu điểm của từng thành phần. Ví dụ nhựa cốt sợi thuỷ tinh: nhựa nhẹ + sợi thuỷ tinh bền, cho ra vật vừa nhẹ vừa cứng.' },
      { note: 'Nguyên tắc chọn vật liệu phi kim: dùng khi cần NHẸ, CÁCH ĐIỆN hoặc CHỐNG ĂN MÒN; không dùng cho kết cấu chính cần chịu lực rất lớn hay nơi cần dẫn nhiệt như đồng.' },
    ],
    examples: [
      { q: 'Bài tập: Vì sao gioăng (vòng đệm) làm kín của động cơ thường làm bằng cao su chứ không bằng kim loại?', a: 'Giải: Vì cao su đàn hồi, ép vào sẽ biến dạng lấp kín mọi khe hở, ngăn rò rỉ dầu, nước, khí. Kim loại cứng không ôm khít được bề mặt nên không làm kín tốt bằng.' },
      { q: 'Bài tập: Vợt cầu lông cao cấp "sợi cacbon" là kim loại hay composite? Vì sao chọn vật liệu đó?', a: 'Giải: Là composite (nhựa cốt sợi cacbon). Chọn vì nó rất nhẹ mà vẫn cứng và bền, giúp vợt nhẹ tay nhưng không gãy — điều mà kim loại khó đạt cùng lúc.' },
    ],
  },

  'H11CN-w06-quiz': {
    topic: 'Vật liệu mới trong cơ khí chế tạo',
    intro: 'Chào các em! Công nghệ vật liệu đang tiến rất nhanh. Tuần này ta tìm hiểu các vật liệu mới: nano, composite sợi cacbon, hợp kim ghi nhớ hình dạng và vật liệu thông minh.',
    objectives: [
      'Nêu được khái niệm vật liệu nano và vật liệu thông minh.',
      'Kể ứng dụng của composite sợi cacbon và hợp kim ghi nhớ hình.',
      'Nêu xu hướng phát triển vật liệu cho cơ khí hiện đại.',
    ],
    theory: [
      { h: 'Vật liệu nano' },
      { p: 'Vật liệu nano có cấu trúc ở thang nano-mét (1 nanomet = một phần tỉ mét). Ở kích thước cực nhỏ này, vật liệu có những tính chất đặc biệt mà ở kích thước thường không có — bền hơn, dẫn điện khác đi, hoặc chống khuẩn.' },
      { h: 'Composite sợi cacbon (CFRP)' },
      { p: 'CFRP là nhựa cốt sợi cacbon — rất nhẹ và rất bền, dùng cho máy bay, xe đua, dụng cụ thể thao cao cấp. Nó thay thế dần kim loại ở những nơi cần giảm khối lượng tối đa.' },
      { h: 'Vật liệu thông minh' },
      { ul: ['Hợp kim ghi nhớ hình dạng (SMA): khi bị uốn cong rồi gia nhiệt, nó tự trở về hình dạng ban đầu.', 'Vật liệu thông minh (smart material): có thể cảm nhận và phản ứng với môi trường — nhiệt, lực, từ trường.'] },
      { note: 'In 3D kim loại dùng bột kim loại (titan, thép không gỉ, nhôm) được thiêu kết bằng laser, tạo ra chi tiết hình dạng phức tạp mà phương pháp cắt gọt truyền thống khó làm. Xu hướng chung: vật liệu NHẸ - BỀN - ĐA CHỨC NĂNG - THÂN THIỆN MÔI TRƯỜNG.' },
    ],
    examples: [
      { q: 'Bài tập: Gọng kính "uốn không gãy", bẻ cong rồi tự bật về hình cũ, làm bằng vật liệu gì?', a: 'Giải: Làm bằng hợp kim ghi nhớ hình dạng (SMA, thường là Nikel - Titan). Khi bị bẻ cong và được làm ấm về nhiệt độ cơ thể, nó tự trở lại hình dạng ban đầu nên rất khó gãy.' },
      { q: 'Bài tập: Vì sao máy bay hiện đại ngày càng dùng nhiều composite sợi cacbon thay nhôm?', a: 'Giải: Vì CFRP nhẹ hơn nhôm mà vẫn đủ bền. Máy bay nhẹ hơn thì tốn ít nhiên liệu hơn, chở được nhiều hơn — lợi ích kinh tế và môi trường rất lớn.' },
    ],
  },

  'H11CN-w07-quiz': {
    topic: 'Phương pháp gia công đúc',
    intro: 'Chào các em! Bắt đầu phần các phương pháp gia công. Tuần này là đúc — cách tạo hình bằng kim loại lỏng, phương pháp lâu đời nhưng vẫn rất quan trọng.',
    objectives: [
      'Trình bày được bản chất của phương pháp đúc.',
      'Nêu ưu, nhược điểm của đúc và các dạng đúc thông dụng.',
      'Kể được sản phẩm tiêu biểu chế tạo bằng đúc.',
    ],
    theory: [
      { h: 'Đúc là gì?' },
      { p: 'Đúc là phương pháp tạo hình bằng cách nấu chảy kim loại rồi rót vào khuôn có lòng khuôn đúng hình sản phẩm; kim loại nguội đông đặc lại sẽ mang hình dạng của lòng khuôn. Đây là cách duy nhất tạo ra các vật rỗng, phức tạp một cách kinh tế.' },
      { h: 'Các dạng đúc' },
      { ul: ['Đúc trong khuôn cát: rẻ, làm được hình phức tạp, hợp với sản xuất đơn chiếc hoặc loạt nhỏ.', 'Đúc áp lực (die casting): kim loại lỏng được ép vào khuôn kim loại — sản xuất hàng loạt chi tiết nhỏ bằng nhôm, kẽm với độ chính xác cao.'] },
      { h: 'Ưu và nhược điểm' },
      { p: 'Ưu điểm: tạo được hình dạng phức tạp, đúc được nhiều loại kim loại, kinh tế với chi tiết lớn. Nhược điểm: vật đúc có thể có rỗ khí, rỗ co, bề mặt chưa nhẵn nên thường phải gia công tinh lại sau khi đúc.' },
      { note: 'Sản phẩm đúc tiêu biểu: thân máy, bệ máy, vỏ động cơ, bánh răng cỡ lớn, tượng đồng, nắp cống. Hãy nhớ: hình càng phức tạp, càng rỗng thì đúc càng có lợi thế.' },
    ],
    examples: [
      { q: 'Bài tập: Muốn làm vỏ động cơ ô tô (rỗng, nhiều khoang phức tạp) thì nên đúc hay tiện từ khối đặc?', a: 'Giải: Nên đúc. Vỏ động cơ rỗng và phức tạp, nếu tiện từ khối đặc thì vừa tốn vật liệu vừa gần như không thể tạo các khoang bên trong. Đúc tạo ngay hình rỗng phức tạp một cách kinh tế.' },
      { q: 'Bài tập: Vì sao vật mới đúc xong thường vẫn phải đưa qua máy gia công?', a: 'Giải: Vì đúc cho độ chính xác và độ bóng chưa cao, có thể còn rỗ khí, bavia. Các bề mặt lắp ghép quan trọng cần được tiện/phay/mài lại để đạt kích thước và độ nhẵn yêu cầu.' },
    ],
  },

  'H11CN-w08-quiz': {
    topic: 'Phương pháp gia công cắt gọt',
    intro: 'Chào các em! Tuần này ta học gia công cắt gọt — bóc đi lớp vật liệu thừa để tạo hình. Đây là nhóm phương pháp chính xác nhất trong xưởng cơ khí.',
    objectives: [
      'Nêu được bản chất của gia công cắt gọt.',
      'Phân biệt máy tiện, máy phay, máy khoan theo bề mặt gia công.',
      'Hiểu được ưu thế của máy CNC so với máy vạn năng.',
    ],
    theory: [
      { h: 'Cắt gọt là gì?' },
      { p: 'Gia công cắt gọt là dùng dụng cụ cắt để bóc đi một lớp vật liệu (gọi là phoi) khỏi phôi, cho đến khi đạt hình dạng và kích thước mong muốn. Khác với đúc tạo hình từ kim loại lỏng, cắt gọt là "trừ đi" vật liệu từ một khối đặc.' },
      { h: 'Các máy cắt gọt cơ bản' },
      { ul: ['Máy tiện: phôi quay, dao tịnh tiến — gia công bề mặt tròn xoay (trụ, côn, ren).', 'Máy phay: dao quay, bàn máy đưa phôi — gia công mặt phẳng, rãnh, biên dạng.', 'Máy khoan: tạo lỗ tròn trên phôi.'] },
      { h: 'Dụng cụ cắt và máy CNC' },
      { p: 'Dao cắt phải cứng hơn vật liệu gia công: thường làm bằng thép gió (HSS), hợp kim cứng (carbide), gốm kĩ thuật hoặc kim cương. Máy CNC (điều khiển số bằng máy tính) chạy theo chương trình G-code, tự động hoá cao, cho độ chính xác và năng suất vượt xa máy quay tay truyền thống.' },
      { note: 'Phân biệt nhanh: TIỆN cho vật tròn xoay, PHAY cho mặt phẳng và rãnh, KHOAN để tạo lỗ. Nhớ "phôi quay = tiện, dao quay = phay".' },
    ],
    examples: [
      { q: 'Bài tập: Muốn gia công một trục tròn có ren ở đầu thì dùng máy gì?', a: 'Giải: Dùng máy tiện. Trục tròn là bề mặt tròn xoay — đúng sở trường của tiện; máy tiện cũng cắt được ren ngoài ở đầu trục.' },
      { q: 'Bài tập: Vì sao dao cắt phải làm từ vật liệu cứng như carbide, không dùng thép thường?', a: 'Giải: Vì dao phải cứng hơn phôi mới cắt được, đồng thời chịu nhiệt và mài mòn khi cắt với tốc độ cao. Thép thường mềm sẽ nhanh mòn, cùn, không cắt được thép cứng.' },
    ],
  },

  'H11CN-w09-quiz': {
    topic: 'Phương pháp hàn',
    intro: 'Chào các em! Tuần này tìm hiểu hàn — cách nối hai chi tiết kim loại thành một khối liền. Hàn có mặt ở khắp nơi: khung xe, cầu thép, vỏ tàu.',
    objectives: [
      'Trình bày được bản chất của phương pháp hàn.',
      'Phân biệt hàn hồ quang điện và hàn khí.',
      'Nêu yêu cầu an toàn và tiêu chí mối hàn tốt.',
    ],
    theory: [
      { h: 'Hàn là gì?' },
      { p: 'Hàn là phương pháp nối hai chi tiết kim loại bằng cách nung chảy cục bộ chỗ tiếp giáp (có hoặc không thêm vật liệu phụ là que hàn), rồi để nguội đông đặc thành một khối liền. Khác đinh tán hay bu-lông, mối hàn nối liền vật liệu nên kín và bền.' },
      { h: 'Các phương pháp hàn phổ biến' },
      { ul: ['Hàn hồ quang điện: dùng nhiệt của hồ quang điện giữa điện cực và vật hàn để nung chảy mép hàn.', 'Hàn khí (hàn hơi): dùng nhiệt đốt cháy hỗn hợp oxy + axetilen.', 'Hàn TIG/MIG: có khí bảo vệ (argon, CO2) chống oxy hoá vùng hàn, cho mối hàn đẹp và sạch.'] },
      { h: 'An toàn và chất lượng' },
      { p: 'Hàn sinh tia lửa, tia hồ quang chói và nhiệt cao nên bắt buộc dùng kính/mặt nạ hàn, găng tay, quần áo bảo hộ. Mối hàn tốt phải ngấu (chảy thấu), không rỗ, không nứt, kích thước đúng và hình dáng đều.' },
      { note: 'So với đinh tán, hàn cho mối nối kín, bền chắc và tiết kiệm vật liệu hơn (không phải khoan lỗ, không cần đinh). Đó là lý do hàn thay thế đinh tán ở hầu hết kết cấu thép hiện đại.' },
    ],
    examples: [
      { q: 'Bài tập: Vì sao thợ hàn bắt buộc đeo mặt nạ hàn dù chỉ hàn vài phút?', a: 'Giải: Vì tia hồ quang phát ra tia cực tím rất mạnh có thể làm bỏng giác mạc (đau mắt hàn) chỉ sau vài giây nhìn trực tiếp; mặt nạ còn chắn tia lửa và xỉ bắn vào mặt.' },
      { q: 'Bài tập: Hàn TIG/MIG dùng khí argon/CO2 để làm gì?', a: 'Giải: Để bảo vệ vùng kim loại nóng chảy khỏi oxy trong không khí. Nếu không, oxy sẽ làm mối hàn bị oxy hoá, rỗ và yếu. Khí trơ phủ lên tạo "lá chắn", cho mối hàn sạch và bền.' },
    ],
  },

  'H11CN-w10-quiz': {
    topic: 'Thực hành chế tạo sản phẩm cơ khí',
    intro: 'Chào các em! Lý thuyết đã có, giờ ta đi qua quy trình thực hành chế tạo một chi tiết từ đầu đến cuối, kèm các quy tắc an toàn trong xưởng.',
    objectives: [
      'Trình bày được trình tự các bước chế tạo một chi tiết.',
      'Kể được các dụng cụ đo thông dụng.',
      'Nêu được quy tắc an toàn và phương pháp 5S trong xưởng.',
    ],
    theory: [
      { h: 'Trình tự chế tạo một chi tiết' },
      { ul: ['Bước 1: Đọc bản vẽ kỹ thuật để hiểu rõ yêu cầu (kích thước, vật liệu, độ chính xác).', 'Bước 2: Chuẩn bị phôi, đo và vạch dấu vị trí cần gia công.', 'Bước 3: Gia công (cưa, giũa, khoan, tiện…) theo dấu.', 'Bước 4: Kiểm tra, đối chiếu với bản vẽ và hoàn thiện.'] },
      { h: 'Dụng cụ đo' },
      { p: 'Để đo kích thước, ta dùng thước kẹp (caliper), panme cho độ chính xác cao, thước lá cho đo nhanh và dưỡng để kiểm tra biên dạng. Vạch dấu chính xác giúp hạn chế sai sót khi gia công.' },
      { h: 'An toàn và 5S' },
      { p: 'An toàn lao động yêu cầu trang bị bảo hộ đầy đủ, vận hành máy đúng quy trình, không đùa nghịch, không mặc áo rộng tay hay đeo trang sức khi đứng máy quay.' },
      { note: '5S là phương pháp tổ chức nơi làm việc gọn gàng, gồm: Sàng lọc, Sắp xếp, Sạch sẽ, Săn sóc, Sẵn sàng. Xưởng áp dụng 5S thì làm việc nhanh, an toàn và ít hỏng hóc hơn.' },
    ],
    examples: [
      { q: 'Bài tập: Vì sao phải vạch dấu trước khi khoan, cưa thay vì làm ước lượng bằng mắt?', a: 'Giải: Vạch dấu xác định chính xác vị trí và kích thước cần gia công, giúp khoan/cưa đúng chỗ ngay từ đầu. Làm bằng mắt dễ lệch, hỏng phôi và phải làm lại, tốn vật liệu và thời gian.' },
      { q: 'Bài tập: Một bạn đứng máy tiện đeo găng tay vải dài và áo rộng tay. Có an toàn không?', a: 'Giải: Không an toàn. Máy tiện có phôi và mâm cặp quay nhanh, găng tay hoặc tay áo rộng có thể bị cuốn vào kéo theo bàn tay gây tai nạn nặng. Phải bỏ găng, mặc gọn gàng khi đứng máy quay.' },
    ],
  },

  'H11CN-w11-quiz': {
    topic: 'Quá trình sản xuất cơ khí',
    intro: 'Chào các em! Từ một chi tiết đơn lẻ, hôm nay ta nhìn rộng ra cả quá trình sản xuất cơ khí — chuỗi công đoạn biến nguyên liệu thô thành sản phẩm hoàn chỉnh.',
    objectives: [
      'Nêu được khái niệm quá trình sản xuất cơ khí.',
      'Liệt kê các công đoạn công nghệ chính.',
      'Hiểu vai trò của kiểm tra chất lượng và bảo trì.',
    ],
    theory: [
      { h: 'Quá trình sản xuất cơ khí là gì?' },
      { p: 'Đó là toàn bộ hoạt động biến nguyên liệu thô thành sản phẩm hoàn thiện — không chỉ là gia công, mà gồm cả chế tạo phôi, xử lý, lắp ráp, kiểm tra và hoàn thiện.' },
      { h: 'Các công đoạn công nghệ chính' },
      { ul: ['Chế tạo phôi (đúc, cán, rèn…).', 'Gia công cơ (tiện, phay, khoan, mài).', 'Xử lý nhiệt để tăng độ cứng, độ bền.', 'Lắp ráp các chi tiết thành cụm và sản phẩm.', 'Kiểm tra chất lượng và hoàn thiện (sơn, mạ).'] },
      { h: 'Phôi và lắp ráp' },
      { p: 'Phôi là vật liệu/chi tiết ban đầu sẽ được gia công, chưa phải sản phẩm cuối. Lắp ráp là kết nối các chi tiết riêng lẻ thành cụm hoặc sản phẩm hoàn chỉnh.' },
      { note: 'Kiểm tra chất lượng (QC) đảm bảo sản phẩm đạt tiêu chuẩn kỹ thuật. Bảo trì - sửa chữa là quá trình hỗ trợ giúp máy móc hoạt động ổn định, lâu dài — không phải khâu thừa mà là yếu tố giữ cho sản xuất không gián đoạn.' },
    ],
    examples: [
      { q: 'Bài tập: Sắp xếp đúng thứ tự: lắp ráp, chế tạo phôi, gia công cơ, kiểm tra.', a: 'Giải: Chế tạo phôi → gia công cơ → lắp ráp → kiểm tra. Phải có phôi rồi mới gia công thành chi tiết, lắp các chi tiết lại, cuối cùng kiểm tra sản phẩm hoàn chỉnh.' },
      { q: 'Bài tập: Vì sao bảo trì máy lại được coi là một phần của quá trình sản xuất chứ không phải việc "khi nào hỏng mới làm"?', a: 'Giải: Vì bảo trì định kỳ giúp máy chạy ổn định, tránh hỏng đột xuất làm dừng cả dây chuyền. Chờ máy hỏng nặng mới sửa thì thiệt hại lớn hơn nhiều — nên bảo trì là khâu chủ động trong sản xuất.' },
    ],
  },

  'H11CN-w12-quiz': {
    topic: 'Dây chuyền sản xuất',
    intro: 'Chào các em! Tuần này ta tìm hiểu dây chuyền sản xuất — cách tổ chức để làm ra hàng loạt sản phẩm nhanh, đều và rẻ.',
    objectives: [
      'Nêu được khái niệm dây chuyền sản xuất.',
      'Phân tích ưu, nhược điểm của dây chuyền chuyên dụng.',
      'Hiểu ý nghĩa của cân bằng dây chuyền và sản xuất tinh gọn.',
    ],
    theory: [
      { h: 'Dây chuyền sản xuất là gì?' },
      { p: 'Dây chuyền sản xuất là chuỗi các công đoạn được tổ chức tuần tự — sản phẩm di chuyển qua từng trạm, mỗi trạm làm một việc — để sản xuất hàng loạt. Henry Ford là người đầu tiên áp dụng cho ô tô đầu thế kỷ 20.' },
      { h: 'Ưu và nhược điểm' },
      { ul: ['Ưu điểm: năng suất cao, chất lượng ổn định, giảm chi phí trên mỗi sản phẩm.', 'Nhược điểm: dây chuyền chuyên dụng kém linh hoạt khi đổi mẫu mã, vốn đầu tư ban đầu lớn.'] },
      { h: 'Cân bằng dây chuyền và Lean' },
      { p: 'Cân bằng dây chuyền (line balancing) là phân chia khối lượng công việc đều giữa các trạm để tránh trạm này phải chờ trạm kia (tắc nghẽn). Sản xuất tinh gọn (Lean) chú trọng loại bỏ lãng phí, tạo dòng chảy liên tục và tôn trọng con người.' },
      { note: 'Phân biệt: sản xuất hàng loạt (mass production) làm số lượng lớn, tiêu chuẩn hoá, dùng dây chuyền chuyên dụng; còn sản xuất đơn chiếc làm từng sản phẩm riêng theo yêu cầu.' },
    ],
    examples: [
      { q: 'Bài tập: Một dây chuyền có trạm 1 làm xong 30 giây, trạm 2 làm xong 90 giây. Vấn đề gì xảy ra và cách khắc phục?', a: 'Giải: Trạm 2 chậm gây tắc nghẽn, trạm 1 phải chờ, hàng dồn lại. Khắc phục bằng cân bằng dây chuyền: chia bớt việc của trạm 2 sang trạm khác hoặc thêm người/máy ở trạm 2 để các trạm có thời gian gần bằng nhau.' },
      { q: 'Bài tập: Vì sao dây chuyền chuyên dụng tuy năng suất cao nhưng lại kém linh hoạt?', a: 'Giải: Vì máy móc và bố trí được thiết kế riêng cho một loại sản phẩm. Muốn đổi sang mẫu khác phải cải tạo lại, tốn thời gian và chi phí — nên nó chỉ lợi khi làm số lượng rất lớn cùng một mẫu.' },
    ],
  },

  'H11CN-w13-quiz': {
    topic: 'Robot công nghiệp',
    intro: 'Chào các em! Robot công nghiệp đang thay con người làm những việc nặng nhọc, nguy hiểm và lặp lại. Tuần này ta tìm hiểu chúng làm gì và cần lưu ý gì khi vận hành.',
    objectives: [
      'Nêu được khái niệm robot công nghiệp.',
      'Kể được ứng dụng và ưu điểm của robot trong sản xuất.',
      'Hiểu yêu cầu an toàn và phân biệt cobot với robot truyền thống.',
    ],
    theory: [
      { h: 'Robot công nghiệp là gì?' },
      { p: 'Robot công nghiệp là thiết bị tự động có thể lập trình lại để thực hiện các thao tác cơ khí trong sản xuất. "Lập trình lại được" là điểm mấu chốt: cùng một robot có thể đổi nhiệm vụ chỉ bằng đổi chương trình.' },
      { h: 'Cấu trúc và ứng dụng' },
      { p: 'Cánh tay robot thường có 6 bậc tự do (6 DOF), cho phép di chuyển và định hướng đầu công tác ở bất kỳ vị trí và góc nào trong không gian 3D. Ứng dụng phổ biến: hàn, sơn, lắp ráp, gắp đặt vật, kiểm tra.' },
      { ul: ['Làm việc chính xác, liên tục không mệt mỏi.', 'An toàn trong môi trường độc hại (sơn, hàn, nhiệt cao).', 'Năng suất cao, chất lượng đồng đều.'] },
      { note: 'An toàn: khu vực làm việc của robot phải có rào chắn và cảm biến để dừng robot khi có người vào, tránh va chạm. Cobot (robot cộng tác) khác robot truyền thống ở chỗ được thiết kế để làm việc cạnh người, tốc độ chậm và dừng ngay khi chạm phải, an toàn hơn.' },
    ],
    examples: [
      { q: 'Bài tập: Vì sao trong xưởng sơn ô tô người ta ưu tiên dùng robot thay công nhân?', a: 'Giải: Vì sơn phun có hơi dung môi độc hại và đòi hỏi lớp sơn đều. Robot làm việc trong môi trường độc mà không hại sức khoẻ ai, lại phun đều và chính xác hơn người, năng suất cao hơn.' },
      { q: 'Bài tập: Robot công nghiệp truyền thống và cobot khác nhau cơ bản ở điểm gì?', a: 'Giải: Robot truyền thống mạnh, nhanh, nguy hiểm nên phải nhốt sau rào chắn. Cobot được thiết kế làm việc chung với người: chạy chậm hơn, có cảm biến lực để dừng ngay khi chạm vào người nên không cần rào.' },
    ],
  },

  'H11CN-w14-quiz': {
    topic: 'Tự động hoá quá trình sản xuất',
    intro: 'Chào các em! Tuần cuối phần chế tạo, ta tổng hợp lại bằng chủ đề tự động hoá — đỉnh cao của sản xuất hiện đại, nơi máy móc làm phần lớn công việc.',
    objectives: [
      'Nêu được khái niệm tự động hoá sản xuất.',
      'Hiểu vai trò của PLC và CAD/CAM.',
      'Phân tích lợi ích, thách thức và mối liên hệ với Công nghiệp 4.0.',
    ],
    theory: [
      { h: 'Tự động hoá là gì?' },
      { p: 'Tự động hoá sản xuất là ứng dụng máy móc và hệ thống điều khiển để thực hiện sản xuất với sự can thiệp tối thiểu của con người. Con người chuyển từ làm trực tiếp sang giám sát, lập trình và bảo trì.' },
      { h: 'Công cụ của tự động hoá' },
      { ul: ['PLC (bộ điều khiển logic khả trình): "bộ não" điều khiển máy và dây chuyền theo chương trình.', 'CAD (Computer-Aided Design): thiết kế sản phẩm bằng máy tính.', 'CAM (Computer-Aided Manufacturing): dùng máy tính điều khiển quá trình sản xuất.'] },
      { h: 'Lợi ích và thách thức' },
      { p: 'Lợi ích: tăng năng suất, chất lượng đồng đều, giảm tai nạn ở công đoạn nguy hiểm. Thách thức: chi phí đầu tư ban đầu lớn, cần đào tạo lại lao động, và phải lo an toàn an ninh mạng vì hệ thống được kết nối.' },
      { note: 'Công nghiệp 4.0 trong cơ khí kết hợp IoT (vạn vật kết nối), dữ liệu lớn, trí tuệ nhân tạo (AI) và robot để tạo ra "nhà máy thông minh" — máy móc tự trao đổi dữ liệu và tự tối ưu sản xuất.' },
    ],
    examples: [
      { q: 'Bài tập: CAD và CAM khác nhau thế nào?', a: 'Giải: CAD là thiết kế sản phẩm bằng máy tính (vẽ mô hình, bản vẽ). CAM là dùng máy tính để điều khiển quá trình chế tạo (sinh chương trình cho máy CNC gia công). CAD lo phần "thiết kế", CAM lo phần "làm ra".' },
      { q: 'Bài tập: Tự động hoá có lợi nhưng vì sao không phải nhà máy nào cũng làm được ngay?', a: 'Giải: Vì chi phí đầu tư máy móc, robot, hệ thống điều khiển ban đầu rất lớn; còn phải đào tạo lại công nhân và bảo đảm an ninh mạng. Doanh nghiệp nhỏ chưa đủ vốn và nhân lực thì khó tự động hoá toàn bộ ngay.' },
    ],
  },

  'H11CN-w15-quiz': {
    topic: 'Ôn tập chương III - IV (Vật liệu và gia công)',
    intro: 'Chào các em! Tuần này ta hệ thống lại kiến thức về các phương pháp gia công và một số công nghệ sản xuất đã học, chuẩn bị cho phần ôn tập lớn.',
    objectives: [
      'Hệ thống các phương pháp gia công đúc, hàn, cắt gọt.',
      'Củng cố vai trò của PLC, robot và CAD trong sản xuất.',
      'Phân biệt nhanh các phương pháp tạo hình.',
    ],
    theory: [
      { h: 'Bản đồ các phương pháp gia công' },
      { ul: ['Đúc: rót kim loại lỏng vào khuôn — tạo hình phức tạp, vật rỗng, vật lớn.', 'Hàn: nối hai chi tiết bằng nung chảy cục bộ.', 'Cắt gọt (tiện, phay, khoan): bóc phoi từ phôi đặc để đạt độ chính xác cao.'] },
      { h: 'Nhận diện máy cắt gọt' },
      { p: 'Tiện gia công bề mặt tròn xoay (phôi quay). Phay gia công mặt phẳng, rãnh, biên dạng (dao quay). Khoan tạo lỗ. Nhớ quy tắc "phôi quay là tiện, dao quay là phay".' },
      { h: 'Tự động hoá' },
      { p: 'PLC là bộ điều khiển logic khả trình — điều khiển máy/dây chuyền. CAD là thiết kế bằng máy tính. Robot công nghiệp ứng dụng nhiều ở hàn, sơn, lắp ráp, gắp đặt.' },
      { note: 'Khi gặp một sản phẩm, hãy tự hỏi: hình phức tạp/rỗng → nghĩ đến đúc; cần nối hai mảnh → hàn; cần kích thước chính xác bề mặt nhẵn → cắt gọt (CNC).' },
    ],
    examples: [
      { q: 'Bài tập: Cho bốn từ: đúc, hàn, tiện, phay. Phương pháp nào "thêm" vật liệu để nối, phương pháp nào "trừ" vật liệu?', a: 'Giải: Hàn thêm/nối vật liệu (tạo mối liền). Tiện và phay là "trừ" — bóc phoi đi. Đúc thì tạo hình từ kim loại lỏng (không thêm cũng không trừ phoi, mà rót khuôn).' },
      { q: 'Bài tập: Máy nào trong số tiện - phay - khoan thì phôi đứng yên còn dao quay tạo rãnh?', a: 'Giải: Máy phay. Dao phay quay tròn, bàn máy đưa phôi để cắt mặt phẳng, rãnh và biên dạng. (Tiện thì phôi quay; khoan thì mũi khoan quay tạo lỗ.)' },
    ],
  },

  'H11CN-w16-quiz': {
    topic: 'Ôn tập tổng hợp Phần 1 — Cơ khí chế tạo',
    intro: 'Chào các em! Tuần này ta ôn tổng hợp toàn bộ Phần 1: từ vật liệu, gia công đến tự động hoá. Hãy nắm chắc các điểm phân biệt then chốt.',
    objectives: [
      'Hệ thống kiến thức về vật liệu cơ khí.',
      'Củng cố các phương pháp gia công và tự động hoá.',
      'Rèn kỹ năng trả lời nhanh các câu phân biệt.',
    ],
    theory: [
      { h: 'Vật liệu — điểm cần nhớ' },
      { ul: ['Gang khác thép ở %C: gang > 2,14%, thép ≤ 2,14%.', 'Inox là thép không gỉ chứa crom (Cr) ≥ 10,5%.', 'Composite tổ hợp 2+ vật liệu để tận dụng ưu điểm từng phần.'] },
      { h: 'Gia công — điểm cần nhớ' },
      { p: 'Đúc tạo hình từ kim loại lỏng; hàn nối bằng nung chảy cục bộ (hồ quang điện hoặc khí); cắt gọt bóc phoi cho độ chính xác cao. Máy CNC tự động hoá, độ chính xác và năng suất cao.' },
      { h: 'Tự động hoá — điểm cần nhớ' },
      { p: 'Robot 6 DOF di chuyển và định hướng trong không gian 3D. PLC điều khiển dây chuyền. CAD/CAM, IoT, AI là nền tảng Công nghiệp 4.0.' },
      { note: 'Mẹo ôn: với mỗi khái niệm hãy nắm một câu định nghĩa và một ứng dụng. Ví dụ "gang xám: giòn, dễ đúc → đúc thân máy". Học theo cặp định nghĩa - ứng dụng sẽ nhớ lâu.' },
    ],
    examples: [
      { q: 'Bài tập: Sắp xếp theo %C tăng dần: thép cacbon, gang xám.', a: 'Giải: Thép cacbon (C ≤ 2,14%) có ít cacbon hơn gang xám (C > 2,14%). Vậy thứ tự tăng dần %C là: thép cacbon → gang xám.' },
      { q: 'Bài tập: Nguồn nhiệt của hàn hồ quang đến từ đâu?', a: 'Giải: Từ hồ quang điện phát sinh giữa điện cực (que hàn) và vật hàn khi có dòng điện đi qua. Hồ quang toả nhiệt rất cao làm chảy mép hàn để nối hai chi tiết.' },
    ],
  },

  'H11CN-w17-quiz': {
    topic: 'Ôn tập cuối học kì 1',
    intro: 'Chào các em! Tuần ôn tập cuối kì 1. Chúng ta rà lại toàn bộ kiến thức trọng tâm Phần 1 để các em tự tin bước vào bài kiểm tra.',
    objectives: [
      'Củng cố vật liệu kim loại đen và ứng dụng.',
      'Ôn các phương pháp gia công cơ bản.',
      'Nhắc lại nguyên tắc an toàn và lợi ích tự động hoá.',
    ],
    theory: [
      { h: 'Vật liệu trọng tâm' },
      { p: 'Kim loại đen gồm sắt và hợp kim sắt (gang, thép). Thép cacbon là kim loại đen điển hình. Gang xám phù hợp đúc thân máy, bệ máy chịu nén và rung.' },
      { h: 'Gia công trọng tâm' },
      { ul: ['Khoan: tạo lỗ tròn trên phôi.', 'Phay: trục chính mang dao quay tròn tạo chuyển động cắt.', 'Tiện: gia công bề mặt tròn xoay.'] },
      { h: 'An toàn và tự động hoá' },
      { p: 'Khi hàn bắt buộc dùng kính/mặt nạ hàn, găng tay, quần áo bảo hộ. Tự động hoá giúp tăng năng suất và đồng đều chất lượng, giảm tai nạn ở công đoạn nguy hiểm.' },
      { note: 'Chiến thuật làm bài: đọc kỹ từ khoá trong câu hỏi (tròn xoay → tiện; tạo lỗ → khoan; nối hai mảnh → hàn; hình phức tạp → đúc). Nhận diện đúng từ khoá là đã trả lời được nửa câu.' },
    ],
    examples: [
      { q: 'Bài tập: Ở máy phay, bộ phận nào tạo chuyển động cắt?', a: 'Giải: Trục chính mang dao phay quay tròn tạo chuyển động cắt. Bàn máy chỉ đưa phôi tịnh tiến, còn bệ máy đứng yên đỡ toàn bộ.' },
      { q: 'Bài tập: Trong các vật liệu: thép cacbon, đồng thau, nhôm, titan — đâu là kim loại đen?', a: 'Giải: Thép cacbon là kim loại đen (hợp kim của sắt). Đồng thau, nhôm, titan đều là kim loại màu (không chứa sắt làm thành phần chính).' },
    ],
  },

  'H11CN-w18-quiz': {
    topic: 'Kiểm tra cuối học kì 1',
    intro: 'Chào các em! Đây là tuần kiểm tra cuối kì 1. Ta điểm lại các kiến thức ứng dụng hay được hỏi để các em làm bài thật vững.',
    objectives: [
      'Vận dụng kiến thức vật liệu và gia công vào tình huống thực tế.',
      'Củng cố thuật ngữ viết tắt: CNC, EFI, 5S.',
      'Tự tin tổng hợp toàn bộ Phần 1.',
    ],
    theory: [
      { h: 'Vận dụng vật liệu - gia công' },
      { p: 'Vỏ động cơ ô tô (rỗng, phức tạp) thường chế tạo phôi bằng đúc (khuôn cát hoặc đúc áp lực). Inox 304 chống ăn mòn nhờ lớp Cr2O3 thụ động trên bề mặt.' },
      { h: 'Thuật ngữ cần thuộc' },
      { ul: ['CNC = Computer Numerical Control (điều khiển số bằng máy tính).', 'Hàn TIG/MIG dùng khí bảo vệ (argon, CO2) chống oxy hoá vùng hàn.', '5S = Sàng lọc, Sắp xếp, Sạch sẽ, Săn sóc, Sẵn sàng.'] },
      { h: 'Dây chuyền tự động' },
      { p: 'Dây chuyền tự động cho năng suất cao, chất lượng ổn định và giảm chi phí trên mỗi sản phẩm — đây là lý do sản xuất hàng loạt ưa dùng.' },
      { note: 'Trước khi nộp bài, kiểm tra lại các câu có từ phủ định ("KHÔNG", "không phải", "trừ") — đây là nơi dễ chọn nhầm nhất. Đọc chậm vế phủ định để khỏi mất điểm oan.' },
    ],
    examples: [
      { q: 'Bài tập: CNC là viết tắt của cụm từ nào?', a: 'Giải: Computer Numerical Control — điều khiển số bằng máy tính. Máy CNC chạy theo chương trình G-code, tự động hoá cao, cho độ chính xác và năng suất lớn.' },
      { q: 'Bài tập: Vì sao chọn đúc để làm phôi vỏ động cơ ô tô thay vì tiện từ khối đặc?', a: 'Giải: Vỏ động cơ rỗng, nhiều khoang phức tạp. Đúc rót kim loại lỏng vào khuôn tạo ngay hình rỗng phức tạp, tiết kiệm vật liệu; còn tiện từ khối đặc thì tốn vật liệu và gần như không tạo được khoang trong.' },
    ],
  },

  'H11CN-w19-quiz': {
    topic: 'Khái quát về cơ khí động lực',
    intro: 'Chào các em! Bước sang học kì 2 với Phần 2 — Cơ khí động lực. Đây là lĩnh vực của động cơ, ô tô, máy bay, tàu thuỷ. Ta khởi đầu bằng cái nhìn tổng quan.',
    objectives: [
      'Nêu được khái niệm và đối tượng của cơ khí động lực.',
      'Kể được các nhóm máy động lực điển hình.',
      'Trình bày vai trò và xu hướng phát triển của lĩnh vực này.',
    ],
    theory: [
      { h: 'Cơ khí động lực là gì?' },
      { p: 'Cơ khí động lực nghiên cứu các máy biến đổi năng lượng thành chuyển động — gọi là máy động lực. Đặc trưng của chúng là tạo và truyền công cơ học để dẫn động máy công tác hoặc phương tiện.' },
      { h: 'Các nhóm máy động lực' },
      { ul: ['Động cơ đốt trong (xăng, diesel) và động cơ điện.', 'Tua-bin (hơi, khí, nước).', 'Phương tiện: ô tô, máy kéo, máy bay, tàu thuỷ.'] },
      { h: 'Vai trò với xã hội' },
      { p: 'Cơ khí động lực cung cấp năng lượng cơ học cho giao thông, công nghiệp, nông nghiệp và quốc phòng. Không có nó thì không có ô tô chạy, máy bay bay hay máy cày làm việc.' },
      { note: 'Xu hướng hiện đại: tiết kiệm nhiên liệu, giảm khí thải, điện khí hoá (xe điện) và thông minh hoá (xe tự lái). Nhân lực ngành này được đào tạo ở các trường kỹ thuật về ô tô, hàng không, đóng tàu.' },
    ],
    examples: [
      { q: 'Bài tập: Trong các máy sau, đâu là máy động lực: máy giặt, ô tô, lò vi sóng, máy bay?', a: 'Giải: Ô tô và máy bay là máy động lực — chúng biến đổi năng lượng thành chuyển động để di chuyển. Máy giặt và lò vi sóng là thiết bị gia dụng, không thuộc nhóm máy động lực điển hình.' },
      { q: 'Bài tập: Vì sao nói cơ khí động lực gắn liền với mọi mặt đời sống?', a: 'Giải: Vì nó cung cấp sức kéo/đẩy cho giao thông (ô tô, tàu, máy bay), cho nông nghiệp (máy kéo), cho công nghiệp (động cơ chạy máy). Hầu như hoạt động nào cần "chuyển động bằng máy" đều dựa vào cơ khí động lực.' },
    ],
  },

  'H11CN-w20-quiz': {
    topic: 'Ngành nghề trong lĩnh vực cơ khí động lực',
    intro: 'Chào các em! Tuần này ta tìm hiểu các nghề trong cơ khí động lực — từ kỹ sư ô tô, kỹ thuật viên sửa chữa đến kỹ sư máy bay, và xu hướng việc làm trong thời đại xe điện.',
    objectives: [
      'Kể được các nghề tiêu biểu trong cơ khí động lực.',
      'Nêu yêu cầu năng lực và phẩm chất của từng nghề.',
      'Nhận biết xu hướng việc làm gắn với xe điện và hybrid.',
    ],
    theory: [
      { h: 'Các nghề tiêu biểu' },
      { ul: ['Kỹ sư động lực ô tô: làm tại nhà máy lắp ráp, trung tâm bảo hành, hãng thiết kế, cơ quan kiểm định.', 'Kỹ thuật viên sửa chữa ô tô: chẩn đoán và sửa chữa hư hỏng.', 'Kỹ sư máy bay: thiết kế, vận hành, bảo trì máy bay và động cơ.'] },
      { h: 'Năng lực và phẩm chất' },
      { p: 'Kỹ thuật viên sửa chữa ô tô cần đọc được sơ đồ điện, hiểu nguyên lý động cơ và các hệ thống, biết dùng máy chẩn đoán. Phẩm chất quan trọng: trung thực (vì khách hàng tin tưởng giao xe), cẩn thận và ham học hỏi công nghệ mới.' },
      { h: 'Định hướng học tập' },
      { p: 'Để theo nghề nên học vững Toán, Vật lí, Công nghệ và Tiếng Anh kỹ thuật (vì tài liệu, phần mềm chẩn đoán phần lớn bằng tiếng Anh).' },
      { note: 'Xu hướng việc làm: nhu cầu chuyên gia về xe điện, xe hybrid, kỹ thuật pin, trạm sạc và phần mềm xe đang tăng mạnh. Người theo nghề cần liên tục cập nhật vì công nghệ ô tô thay đổi rất nhanh.' },
    ],
    examples: [
      { q: 'Bài tập: Vì sao trung thực là phẩm chất đặc biệt quan trọng với thợ sửa ô tô?', a: 'Giải: Vì khách hàng thường không rành kỹ thuật, dễ bị "vẽ bệnh" để thay đồ không cần thiết. Thợ trung thực chỉ thay những gì thật sự hỏng — đó là uy tín nghề nghiệp và niềm tin của khách.' },
      { q: 'Bài tập: Một bạn muốn làm kỹ sư ô tô nên chú trọng môn ngoại ngữ không? Vì sao?', a: 'Giải: Có. Phần lớn tài liệu kỹ thuật, phần mềm chẩn đoán và tiêu chuẩn quốc tế dùng tiếng Anh. Giỏi tiếng Anh kỹ thuật giúp tiếp cận công nghệ mới và làm việc trong môi trường quốc tế.' },
    ],
  },

  'H11CN-w21-quiz': {
    topic: 'Cấu tạo chung của động cơ đốt trong',
    intro: 'Chào các em! Trái tim của cơ khí động lực là động cơ đốt trong. Tuần này ta tìm hiểu nó gồm những cơ cấu và hệ thống nào.',
    objectives: [
      'Nêu được động cơ đốt trong biến đổi năng lượng gì.',
      'Kể được hai cơ cấu chính và các hệ thống của động cơ.',
      'Phân loại động cơ theo nhiên liệu.',
    ],
    theory: [
      { h: 'Động cơ đốt trong là gì?' },
      { p: 'Động cơ đốt trong (ĐCĐT) biến hoá năng của nhiên liệu thành cơ năng, nhờ quá trình đốt cháy nhiên liệu ngay bên trong xilanh. "Đốt trong" để phân biệt với máy hơi nước đốt ngoài.' },
      { h: 'Hai cơ cấu chính' },
      { ul: ['Cơ cấu trục khuỷu - thanh truyền: gồm xilanh, piston, thanh truyền, trục khuỷu — biến chuyển động tịnh tiến của piston thành chuyển động quay.', 'Cơ cấu phân phối khí: gồm các xupap (van) đóng/mở cửa nạp và cửa thải đúng lúc.'] },
      { h: 'Các hệ thống' },
      { p: 'Để hoạt động, ĐCĐT cần các hệ thống phụ trợ: bôi trơn, làm mát, nhiên liệu, đánh lửa (với động cơ xăng) và khởi động. Mỗi hệ thống lo một việc để động cơ chạy êm và bền.' },
      { note: 'Phân loại theo nhiên liệu: động cơ xăng, diesel, khí (gas, LPG, CNG) và hydro. Cách phân biệt xupap thuộc cơ cấu phân phối khí, còn piston - thanh truyền - trục khuỷu thuộc cơ cấu trục khuỷu - thanh truyền.' },
    ],
    examples: [
      { q: 'Bài tập: Piston, thanh truyền, trục khuỷu thuộc cơ cấu nào? Chúng làm nhiệm vụ gì?', a: 'Giải: Thuộc cơ cấu trục khuỷu - thanh truyền. Piston chuyển động tịnh tiến lên xuống trong xilanh, qua thanh truyền làm trục khuỷu quay — tức biến chuyển động thẳng thành chuyển động quay đưa ra ngoài.' },
      { q: 'Bài tập: Vì sao gọi là động cơ "đốt trong"?', a: 'Giải: Vì nhiên liệu được đốt cháy ngay bên trong xilanh của động cơ, sinh áp suất đẩy piston. Khác với máy hơi nước "đốt ngoài" — đốt nhiên liệu ở lò riêng để đun nước tạo hơi.' },
    ],
  },

  'H11CN-w22-quiz': {
    topic: 'Nguyên lý làm việc của động cơ đốt trong 4 kỳ',
    intro: 'Chào các em! Tuần này là bài cốt lõi: nguyên lý làm việc của động cơ 4 kỳ. Hiểu được bốn kỳ Nạp - Nén - Cháy - Xả là hiểu cách động cơ "thở" và sinh công.',
    objectives: [
      'Trình bày được chu trình 4 kỳ và số vòng quay trục khuỷu.',
      'Xác định được kỳ sinh công.',
      'Phân biệt cách đốt cháy của động cơ xăng và diesel.',
    ],
    theory: [
      { h: 'Chu trình 4 kỳ' },
      { p: 'Động cơ 4 kỳ hoàn thành một chu trình công tác trong 2 vòng quay trục khuỷu (tương ứng 4 hành trình của piston). Bốn kỳ theo thứ tự: Nạp → Nén → Cháy giãn nở (sinh công) → Xả.' },
      { ul: ['Kỳ nạp: piston đi xuống, hút hỗn hợp (hoặc không khí) vào xilanh.', 'Kỳ nén: piston đi lên, nén hỗn hợp lại, áp suất và nhiệt độ tăng.', 'Kỳ cháy - giãn nở: hỗn hợp cháy, áp suất đẩy piston đi xuống — đây là kỳ duy nhất SINH CÔNG.', 'Kỳ xả: piston đi lên, đẩy khí cháy ra ngoài.'] },
      { h: 'Xăng và diesel đốt cháy khác nhau' },
      { p: 'Động cơ xăng: hỗn hợp xăng - không khí được đốt cháy nhờ tia lửa điện từ bugi. Động cơ diesel: không khí được nén đến nhiệt độ rất cao, sau đó phun nhiên liệu vào và nó tự bốc cháy (không cần bugi).' },
      { note: 'So sánh với động cơ 2 kỳ: mỗi vòng quay trục khuỷu sinh công một lần nên công suất riêng cao, nhưng hiệu suất và khí thải kém hơn 4 kỳ. Nhớ: trong 4 kỳ chỉ có 1 kỳ sinh công, ba kỳ còn lại "ăn theo" quán tính của bánh đà.' },
    ],
    examples: [
      { q: 'Bài tập: Trong 4 kỳ, kỳ nào sinh công và vì sao ba kỳ kia không sinh công?', a: 'Giải: Kỳ cháy - giãn nở sinh công, vì khí cháy nở ra đẩy mạnh piston. Ba kỳ nạp, nén, xả ngược lại cần tiêu tốn công (do bánh đà tích trữ năng lượng cung cấp) nên không sinh công.' },
      { q: 'Bài tập: Vì sao động cơ diesel không cần bugi mà vẫn cháy được nhiên liệu?', a: 'Giải: Vì diesel nén không khí với tỉ số nén rất cao, làm không khí nóng lên đến mức khi phun dầu vào thì dầu tự bốc cháy (cháy do nén). Còn xăng cần bugi đánh tia lửa để châm cháy hỗn hợp.' },
    ],
  },

  'H11CN-w23-quiz': {
    topic: 'Hệ thống nhiên liệu',
    intro: 'Chào các em! Để động cơ chạy phải có nhiên liệu đúng lúc, đúng lượng. Tuần này ta tìm hiểu hệ thống nhiên liệu của cả động cơ xăng và diesel.',
    objectives: [
      'Nêu được nhiệm vụ của hệ thống nhiên liệu.',
      'Phân biệt bộ chế hoà khí, phun xăng điện tử và hệ thống diesel.',
      'Hiểu vai trò của bộ lọc nhiên liệu và công nghệ common-rail.',
    ],
    theory: [
      { h: 'Nhiệm vụ' },
      { p: 'Hệ thống nhiên liệu cung cấp hỗn hợp nhiên liệu - không khí phù hợp cho động cơ ở mọi chế độ làm việc (chạy không tải, tăng tốc, tải nặng).' },
      { h: 'Hệ thống nhiên liệu động cơ xăng' },
      { ul: ['Bộ chế hoà khí (carburetor): công nghệ cũ, hoà trộn xăng - khí bằng cơ học.', 'Phun xăng điện tử (EFI): điều khiển bằng máy tính, tỉ lệ nhiên liệu - khí chính xác, tiết kiệm và giảm khí thải — đây là công nghệ hiện đại thay thế chế hoà khí.'] },
      { h: 'Hệ thống nhiên liệu diesel' },
      { p: 'Diesel dùng bơm cao áp và vòi phun để phun nhiên liệu vào buồng cháy (không có bugi). Common-rail là công nghệ diesel hiện đại: tích nhiên liệu áp suất cao trong một ống chung, rồi phun nhiều giai đoạn nhờ ECU điều khiển — êm và sạch hơn.' },
      { note: 'Bộ lọc nhiên liệu loại bỏ cặn bẩn và nước trước khi nhiên liệu vào hệ thống phun/bơm. Bỏ qua lọc thì kim phun dễ tắc, bơm cao áp nhanh hỏng — nên lọc nhiên liệu là chi tiết nhỏ nhưng rất quan trọng.' },
    ],
    examples: [
      { q: 'Bài tập: Vì sao xe đời mới dùng phun xăng điện tử thay cho bộ chế hoà khí?', a: 'Giải: Vì EFI điều khiển lượng xăng theo tín hiệu cảm biến, cho tỉ lệ nhiên liệu - khí chính xác ở mọi chế độ. Nhờ đó xe tiết kiệm xăng hơn, chạy ổn định và khí thải sạch hơn so với chế hoà khí cơ học.' },
      { q: 'Bài tập: Hệ thống nhiên liệu diesel khác xăng ở chỗ nào về cách đưa nhiên liệu và châm cháy?', a: 'Giải: Diesel dùng bơm cao áp và vòi phun đưa dầu thẳng vào buồng cháy, cháy do nén (không bugi). Xăng (EFI) phun xăng vào đường nạp hoặc buồng cháy rồi dùng bugi đánh lửa châm cháy.' },
    ],
  },

  'H11CN-w24-quiz': {
    topic: 'Hệ thống làm mát và hệ thống bôi trơn',
    intro: 'Chào các em! Động cơ chạy sinh nhiệt và ma sát lớn. Tuần này ta tìm hiểu hai hệ thống giữ cho động cơ "khoẻ": làm mát và bôi trơn.',
    objectives: [
      'Nêu được nhiệm vụ và bộ phận của hệ thống làm mát.',
      'Hiểu nguyên lý làm việc của van hằng nhiệt.',
      'Nêu được nhiệm vụ của hệ thống bôi trơn và cách xử lý khi báo áp suất dầu.',
    ],
    theory: [
      { h: 'Hệ thống làm mát' },
      { p: 'Nhiệm vụ: giữ động cơ ở nhiệt độ làm việc tối ưu, tránh quá nhiệt làm bó máy. Hệ thống làm mát bằng nước gồm: két nước, bơm nước, van hằng nhiệt, quạt gió và áo nước bao quanh xilanh.' },
      { h: 'Van hằng nhiệt' },
      { p: 'Van hằng nhiệt (thermostat) đóng khi động cơ còn nguội để nó nhanh đạt nhiệt độ làm việc; mở khi đã đủ nóng để cho nước chảy qua két làm mát. Nhờ đó động cơ không quá nguội cũng không quá nóng.' },
      { h: 'Hệ thống bôi trơn' },
      { ul: ['Nhiệm vụ: đưa dầu đến các bề mặt ma sát để giảm mài mòn, làm mát và làm kín.', 'Bơm dầu (bánh răng hoặc rotor) hút dầu từ cacte đẩy đi bôi trơn khắp động cơ.'] },
      { note: 'Khi đang chạy mà đèn báo áp suất dầu sáng đỏ, phải TẮT MÁY NGAY, kiểm tra mức dầu, không cố chạy tiếp. Thiếu dầu mà chạy tiếp sẽ làm bó máy, hỏng động cơ rất nặng và tốn kém.' },
    ],
    examples: [
      { q: 'Bài tập: Vì sao động cơ cần van hằng nhiệt thay vì cho nước làm mát chạy liên tục?', a: 'Giải: Nếu nước chạy qua két liên tục, lúc mới khởi động máy còn nguội sẽ lâu nóng, chạy không hiệu quả và hao xăng. Van hằng nhiệt giữ nước lại lúc nguội cho máy nhanh nóng, chỉ mở khi đủ nhiệt — tối ưu cả hai.' },
      { q: 'Bài tập: Đang lái xe, đèn báo áp suất dầu bật đỏ. Nên làm gì?', a: 'Giải: Tấp xe vào lề an toàn và tắt máy ngay, kiểm tra mức dầu. Không cố chạy tiếp vì thiếu/mất áp dầu khiến các chi tiết ma sát khô dầu, bó kẹt và phá hỏng động cơ.' },
    ],
  },

  'H11CN-w25-quiz': {
    topic: 'Cấu tạo chung của ô tô',
    intro: 'Chào các em! Từ động cơ, ta mở rộng ra cả chiếc ô tô. Tuần này tìm hiểu một ô tô gồm những phần chính nào và phân biệt khung gầm rời với khung gầm liền.',
    objectives: [
      'Nêu được các phần chính của ô tô.',
      'Kể các hệ thống thuộc gầm xe (chassis).',
      'Phân biệt khung gầm rời và khung gầm liền.',
    ],
    theory: [
      { h: 'Các phần chính của ô tô' },
      { ul: ['Động cơ: nguồn động lực.', 'Gầm xe (chassis): truyền lực, lái, phanh, treo, bánh xe.', 'Thân vỏ: tạo không gian cho người và hàng, bảo vệ và đảm bảo khí động học.', 'Hệ thống điện và điện tử.'] },
      { h: 'Gầm xe và thân vỏ' },
      { p: 'Gầm xe gồm các hệ thống truyền lực, lái, phanh, treo và bánh xe — quyết định khả năng chạy, dừng và bám đường. Thân vỏ vừa tạo chỗ ngồi vừa bảo vệ người khi va chạm và giảm sức cản gió.' },
      { h: 'Hai kiểu khung gầm' },
      { p: 'Khung gầm rời (body-on-frame): thân xe đặt trên khung chịu lực riêng — chắc khoẻ, dùng cho bán tải, SUV lớn, xe tải. Khung gầm liền (unibody/monocoque): thân và khung là một khối — nhẹ, vận hành tốt, phổ biến ở hầu hết xe con hiện đại.' },
      { note: 'Cách nhớ: xe cần "cày" tải nặng, off-road → khung rời chắc khoẻ; xe con đi phố cần nhẹ và êm → khung liền (unibody).' },
    ],
    examples: [
      { q: 'Bài tập: Một chiếc xe bán tải chở nặng thường dùng kiểu khung gầm nào? Vì sao?', a: 'Giải: Khung gầm rời (body-on-frame). Khung chịu lực riêng rất chắc, chịu tải nặng và địa hình xấu tốt — phù hợp bán tải, SUV lớn, xe tải.' },
      { q: 'Bài tập: Hệ thống phanh và hệ thống lái thuộc phần nào của ô tô?', a: 'Giải: Thuộc gầm xe (chassis). Gầm xe gồm truyền lực, lái, phanh, treo và bánh xe — là phần lo việc chạy, điều hướng và dừng xe.' },
    ],
  },

  'H11CN-w26-quiz': {
    topic: 'Hệ thống truyền lực ô tô',
    intro: 'Chào các em! Động cơ sinh công, nhưng làm sao đưa công đó đến bánh xe? Câu trả lời là hệ thống truyền lực. Tuần này ta tìm hiểu ly hợp, hộp số, vi sai.',
    objectives: [
      'Nêu được nhiệm vụ của hệ thống truyền lực.',
      'Hiểu chức năng của ly hợp, hộp số, vi sai.',
      'Phân biệt hộp số tự động và hộp số tay.',
    ],
    theory: [
      { h: 'Nhiệm vụ' },
      { p: 'Hệ thống truyền lực truyền và biến đổi mô-men, công suất từ động cơ đến bánh xe chủ động. Trên xe nó thường gồm: ly hợp, hộp số, trục các-đăng, vi sai và bán trục.' },
      { h: 'Các bộ phận chính' },
      { ul: ['Ly hợp (clutch): nối/ngắt mô-men từ động cơ đến hộp số khi sang số.', 'Hộp số: thay đổi tỉ số truyền và mô-men cho phù hợp điều kiện chạy (lên dốc, tăng tốc).', 'Vi sai (differential): cho phép hai bánh dẫn động quay khác tốc độ khi vào cua.'] },
      { h: 'Hộp số tự động và hộp số tay' },
      { p: 'Hộp số tay (MT) cần người đạp côn và gạt số. Hộp số tự động (AT) tự chuyển số dựa trên tốc độ xe, tải và vị trí chân ga — lái nhàn hơn, đặc biệt trong phố đông.' },
      { note: 'Vì sao cần vi sai? Khi xe vào cua, bánh ngoài đi quãng đường dài hơn bánh trong nên phải quay nhanh hơn. Vi sai cho phép hai bánh quay khác tốc độ, tránh trượt và mòn lốp.' },
    ],
    examples: [
      { q: 'Bài tập: Khi vào cua, vì sao hai bánh dẫn động cần quay với tốc độ khác nhau?', a: 'Giải: Vì bánh phía ngoài cua đi cung tròn lớn hơn bánh phía trong, nên phải lăn quãng đường dài hơn trong cùng thời gian, tức quay nhanh hơn. Vi sai cho phép điều đó, tránh trượt bánh và mòn lốp khi vào cua.' },
      { q: 'Bài tập: Ly hợp dùng để làm gì khi người lái sang số trên xe số tay?', a: 'Giải: Ly hợp tạm ngắt mô-men từ động cơ đến hộp số. Nhờ ngắt kết nối, các bánh răng trong hộp số mới ăn khớp lại được mà không bị giật hay vỡ răng khi đổi số.' },
    ],
  },

  'H11CN-w27-quiz': {
    topic: 'Hệ thống lái và hệ thống phanh',
    intro: 'Chào các em! Tuần này ta tìm hiểu hai hệ thống an toàn quan trọng nhất: lái (điều hướng xe) và phanh (dừng xe), cùng công nghệ ABS.',
    objectives: [
      'Nêu được nhiệm vụ của hệ thống lái và hệ thống phanh.',
      'Hiểu cơ cấu lái phổ biến và vai trò trợ lực lái.',
      'Phân biệt phanh đĩa với phanh tang trống và hiểu ABS.',
    ],
    theory: [
      { h: 'Hệ thống lái' },
      { p: 'Hệ thống lái điều khiển hướng chuyển động của xe. Cơ cấu lái phổ biến trên ô tô con là trục răng - thanh răng (rack and pinion). Trợ lực lái (thuỷ lực hoặc điện) giúp giảm lực cần thiết khi đánh vô-lăng, nhất là khi đỗ xe.' },
      { h: 'Hệ thống phanh' },
      { p: 'Hệ thống phanh giảm tốc độ hoặc dừng xe an toàn theo ý người lái. Có hai loại cơ cấu: phanh tang trống và phanh đĩa.' },
      { ul: ['Phanh đĩa: tản nhiệt tốt, hiệu quả cao, ổn định khi phanh liên tục — thường ở bánh trước hoặc cả bốn bánh.', 'Phanh tang trống: cấu tạo kín, rẻ hơn, thường ở bánh sau xe phổ thông.'] },
      { note: 'ABS (Anti-lock Braking System) chống bó cứng phanh: khi phanh gấp, ABS nhả - bóp phanh liên tục rất nhanh để bánh không bị khoá cứng, nhờ đó xe vẫn đánh lái được để tránh chướng ngại và không bị trượt mất kiểm soát.' },
    ],
    examples: [
      { q: 'Bài tập: Vì sao phanh gấp không có ABS dễ làm xe mất lái, còn có ABS thì vẫn lái được?', a: 'Giải: Không ABS, bánh bị khoá cứng và trượt lê, mất bám nên xoay vô-lăng cũng vô tác dụng. ABS liên tục nhả - bóp phanh giữ bánh không khoá, bánh vẫn lăn và bám đường nên xe vẫn nghe theo vô-lăng để tránh vật cản.' },
      { q: 'Bài tập: Vì sao phanh đĩa thường được dùng ở bánh trước thay vì phanh tang trống?', a: 'Giải: Vì khi phanh, trọng lượng dồn về phía trước nên bánh trước chịu lực phanh lớn hơn và sinh nhiều nhiệt. Phanh đĩa tản nhiệt tốt, hiệu quả và ổn định khi phanh liên tục nên phù hợp với bánh trước.' },
    ],
  },

  'H11CN-w28-quiz': {
    topic: 'Hệ thống điện và điện tử trên ô tô',
    intro: 'Chào các em! Ô tô hiện đại là một "máy tính chạy bằng bánh xe". Tuần này ta tìm hiểu hệ thống điện - điện tử: ắc-quy, máy phát, máy khởi động, ECU và cảm biến.',
    objectives: [
      'Nêu được nhiệm vụ của ắc-quy, máy phát, máy khởi động.',
      'Hiểu vai trò của ECU và các cảm biến.',
      'Biết khái niệm mạng CAN bus trên ô tô.',
    ],
    theory: [
      { h: 'Ba thiết bị điện cơ bản' },
      { ul: ['Ắc-quy (battery): tích trữ điện, cấp điện cho khởi động và phụ tải khi động cơ chưa chạy.', 'Máy phát (alternator): tạo điện khi động cơ chạy để nạp lại ắc-quy và cấp cho các tải.', 'Máy khởi động (starter): quay trục khuỷu giúp động cơ nổ máy.'] },
      { h: 'Bộ não điện tử — ECU' },
      { p: 'ECU (hộp điều khiển động cơ) là bộ xử lý điều khiển việc phun nhiên liệu, đánh lửa, kiểm soát khí xả… dựa trên tín hiệu từ các cảm biến. Nó liên tục tính toán để động cơ chạy tối ưu.' },
      { h: 'Cảm biến và mạng CAN' },
      { p: 'Cảm biến phổ biến: oxy (đo khí thải), vị trí trục khuỷu, lưu lượng khí nạp, nhiệt độ nước làm mát… Các ECU và cảm biến trao đổi dữ liệu với nhau qua mạng CAN bus theo một chuẩn chung — giống một "mạng nội bộ" của xe.' },
      { note: 'Phân biệt dễ nhầm: máy khởi động QUAY động cơ lúc nổ máy; máy phát thì NGƯỢC LẠI — khi động cơ đã chạy nó phát điện ra. Ắc-quy chỉ tích và cấp điện, không tự phát điện.' },
    ],
    examples: [
      { q: 'Bài tập: Khi xe đang chạy, điện cho đèn, điều hoà lấy từ ắc-quy hay máy phát?', a: 'Giải: Chủ yếu từ máy phát. Khi động cơ chạy, máy phát tạo điện cấp cho mọi tải và nạp lại ắc-quy. Ắc-quy chỉ là nguồn dự trữ, chủ yếu dùng lúc khởi động khi máy phát chưa quay.' },
      { q: 'Bài tập: ECU dựa vào đâu để biết phun bao nhiêu nhiên liệu?', a: 'Giải: Dựa vào tín hiệu từ các cảm biến: lưu lượng khí nạp, vị trí bướm ga, cảm biến oxy, nhiệt độ nước… ECU đọc các tín hiệu này rồi tính ra lượng nhiên liệu và thời điểm đánh lửa tối ưu.' },
    ],
  },

  'H11CN-w29-quiz': {
    topic: 'An toàn khi sử dụng phương tiện và bảo dưỡng ô tô',
    intro: 'Chào các em! Bài cuối phần lý thuyết động lực bàn về điều quan trọng nhất: an toàn và bảo dưỡng. Hiểu để dùng xe đúng cách và xử lý khi gặp sự cố.',
    objectives: [
      'Nêu được mục đích và hạng mục bảo dưỡng định kỳ.',
      'Trình bày nguyên tắc an toàn khi tham gia giao thông.',
      'Biết cách xử lý một số sự cố thường gặp.',
    ],
    theory: [
      { h: 'Bảo dưỡng định kỳ' },
      { p: 'Bảo dưỡng định kỳ nhằm kéo dài tuổi thọ xe, đảm bảo an toàn và giảm hỏng hóc đột xuất. Các hạng mục phổ biến: thay dầu máy, lọc dầu, lọc gió, kiểm tra phanh, lốp và nước làm mát.' },
      { h: 'An toàn giao thông và an toàn bị động' },
      { ul: ['Thắt dây an toàn, không dùng điện thoại khi lái, không lái khi mệt/say, tuân thủ luật.', 'Túi khí (airbag): khi cảm biến phát hiện va chạm mạnh, túi bung trong vài mili-giây đệm bảo vệ người ngồi.', 'Lốp: kiểm tra áp suất định kỳ, đảo lốp, thay khi mòn quá vạch chỉ thị.'] },
      { h: 'Xử lý sự cố nóng máy' },
      { p: 'Khi xe nóng máy bất thường: tấp vào lề an toàn, tắt máy, CHỜ MÁY NGUỘI rồi mới kiểm tra nước làm mát. Tuyệt đối không mở nắp két nước khi máy còn nóng vì hơi và nước sôi áp suất cao có thể phun ra gây bỏng nặng.' },
      { note: 'Dây an toàn và túi khí là an toàn "bị động" — bảo vệ người khi tai nạn đã xảy ra. Còn ABS, đèn, phanh tốt là an toàn "chủ động" — giúp tránh tai nạn. Cả hai đều cần thiết.' },
    ],
    examples: [
      { q: 'Bài tập: Xe vừa nóng máy, vì sao không được mở nắp két nước ngay?', a: 'Giải: Vì khi máy nóng, nước làm mát đang sôi và ở áp suất cao trong két. Mở nắp ngay khiến hơi và nước sôi phun mạnh ra ngoài gây bỏng nghiêm trọng. Phải chờ máy nguội mới mở.' },
      { q: 'Bài tập: Túi khí và dây an toàn thuộc nhóm an toàn chủ động hay bị động? Giải thích.', a: 'Giải: An toàn bị động. Chúng không ngăn tai nạn xảy ra mà giảm thương tích cho người khi va chạm đã diễn ra — dây giữ người tại ghế, túi khí đệm cú va đập.' },
    ],
  },

  'H11CN-w30-quiz': {
    topic: 'Ôn tập chương VI - VII (Động cơ và ô tô)',
    intro: 'Chào các em! Tuần này hệ thống lại kiến thức về động cơ đốt trong và các hệ thống trên ô tô. Nắm chắc các sơ đồ và chức năng từng hệ thống.',
    objectives: [
      'Củng cố chu trình 4 kỳ và các hệ thống của động cơ.',
      'Ôn lại hệ thống truyền lực, làm mát, phanh.',
      'Phân biệt rõ chức năng các bộ phận.',
    ],
    theory: [
      { h: 'Động cơ — điểm cốt lõi' },
      { p: 'Chu trình 4 kỳ: Nạp → Nén → Cháy giãn nở (sinh công) → Xả. ĐCĐT biến hoá năng nhiên liệu thành cơ năng. Diesel đốt cháy nhờ nén không khí nóng rồi phun dầu (không bugi); xăng dùng bugi đánh lửa.' },
      { h: 'Các hệ thống — điểm cốt lõi' },
      { ul: ['Làm mát: két nước, bơm nước, van hằng nhiệt, quạt gió.', 'Truyền lực: ly hợp, hộp số, vi sai — biến đổi mô-men và tỉ số truyền.', 'Phanh ABS: chống bó cứng phanh để giữ khả năng đánh lái.', 'Điện: máy phát tạo điện khi máy chạy, nạp ắc-quy.'] },
      { h: 'Mẹo nhận diện' },
      { p: 'Câu hỏi về "đổi mô-men, tỉ số truyền" → hộp số. Về "đóng mở van theo nhiệt độ nước" → van hằng nhiệt. Về "chống khoá bánh khi phanh gấp" → ABS.' },
      { note: 'Học theo cặp: bộ phận - chức năng. Ví dụ ly hợp ↔ nối/ngắt mô-men; hộp số ↔ đổi tỉ số truyền; vi sai ↔ cho hai bánh quay khác tốc độ khi cua. Nắm cặp này là trả lời được hầu hết câu hỏi.' },
    ],
    examples: [
      { q: 'Bài tập: Sắp xếp đúng thứ tự 4 kỳ và chỉ ra kỳ sinh công.', a: 'Giải: Thứ tự: Nạp → Nén → Cháy giãn nở → Xả. Kỳ sinh công là Cháy - giãn nở, khi khí cháy nở ra đẩy piston xuống.' },
      { q: 'Bài tập: Bộ phận nào điều tiết nước làm mát theo nhiệt độ động cơ?', a: 'Giải: Van hằng nhiệt (thermostat). Nó đóng khi máy nguội cho máy nhanh nóng, mở khi đủ nóng để nước chảy qua két làm mát, giữ động cơ ở nhiệt độ tối ưu.' },
    ],
  },

  'H11CN-w31-quiz': {
    topic: 'Ôn tập tổng hợp Phần 2 — Cơ khí động lực',
    intro: 'Chào các em! Tuần này ôn tổng hợp toàn bộ Phần 2: động cơ, hệ thống nhiên liệu, truyền lực, lái, điện và an toàn.',
    objectives: [
      'Hệ thống toàn bộ kiến thức cơ khí động lực.',
      'Phân biệt các hệ thống và bộ phận chính trên ô tô.',
      'Củng cố nguyên tắc an toàn khi xử lý sự cố.',
    ],
    theory: [
      { h: 'Tổng hợp các hệ thống' },
      { ul: ['ĐCĐT biến hoá năng nhiên liệu thành cơ năng.', 'Truyền lực: ly hợp, hộp số, trục các-đăng, vi sai, bán trục.', 'Lái: cơ cấu thanh răng - bánh răng (rack and pinion).', 'Nhiên liệu diesel hiện đại: common-rail.'] },
      { h: 'Điện - điện tử' },
      { p: 'ECU đọc tín hiệu từ các cảm biến (oxy, vị trí trục khuỷu, nhiệt độ…) để điều khiển phun nhiên liệu và đánh lửa tối ưu. Máy phát tạo điện khi máy chạy, ắc-quy tích trữ, máy khởi động quay trục khuỷu.' },
      { h: 'An toàn' },
      { p: 'Khi xe quá nhiệt: tấp lề, tắt máy, chờ nguội rồi kiểm tra — KHÔNG mở nắp két nước khi máy còn nóng để tránh bỏng.' },
      { note: 'Ghép cụm hệ thống với chức năng để khỏi nhầm: thanh răng - bánh răng thuộc HỆ THỐNG LÁI; common-rail thuộc HỆ THỐNG NHIÊN LIỆU diesel; ABS thuộc HỆ THỐNG PHANH.' },
    ],
    examples: [
      { q: 'Bài tập: Cơ cấu thanh răng - bánh răng thuộc hệ thống nào trên ô tô?', a: 'Giải: Thuộc hệ thống lái. Khi xoay vô-lăng, bánh răng quay làm thanh răng dịch ngang, kéo đẩy bánh trước đổi hướng — đó là cơ cấu lái rack and pinion phổ biến trên xe con.' },
      { q: 'Bài tập: Khi cấp cứu xe quá nhiệt, hành động nào là SAI?', a: 'Giải: Sai là mở nắp két nước ngay khi máy còn rất nóng — nguy cơ bỏng do hơi nước sôi áp suất cao. Đúng là tấp lề an toàn, tắt máy và chờ máy nguội rồi mới kiểm tra.' },
    ],
  },

  'H11CN-w32-quiz': {
    topic: 'Ôn tập ứng dụng — Xe điện và xu hướng',
    intro: 'Chào các em! Tương lai của cơ khí động lực gắn với xe điện và xe tự lái. Tuần này ta tìm hiểu xe điện, xe hybrid và công nghệ tự lái.',
    objectives: [
      'Phân biệt xe điện (BEV), xe hybrid (HEV) và xe đốt trong.',
      'Nêu ưu điểm và thách thức của xe điện.',
      'Hiểu vai trò của hệ quản lý pin và công nghệ tự lái.',
    ],
    theory: [
      { h: 'Xe điện và xe hybrid' },
      { ul: ['Xe điện (BEV): dùng động cơ điện và pin thay cho động cơ đốt trong và bình xăng.', 'Xe hybrid (HEV): kết hợp động cơ đốt trong và động cơ điện để tối ưu nhiên liệu.'] },
      { h: 'Ưu điểm và thách thức của xe điện' },
      { p: 'Ưu điểm: không phát thải tại chỗ, vận hành êm, hiệu suất cao. Thách thức: quãng đường mỗi lần sạc còn hạn chế, hạ tầng trạm sạc chưa đủ, giá pin cao và phải xử lý pin sau khi hết hạn sử dụng.' },
      { h: 'Hệ quản lý pin và tự lái' },
      { p: 'Pin lithium-ion cần hệ quản lý pin (BMS) để kiểm soát nhiệt độ và điện áp từng cell, đảm bảo an toàn và tuổi thọ. Hệ thống tự lái dựa trên cảm biến (camera, radar, lidar) kết hợp AI và bản đồ số để xe tự nhận biết đường và vật cản.' },
      { note: 'Lưu ý môi trường: xe điện "không phát thải tại chỗ" nhưng vẫn cần nguồn điện sạch để thực sự xanh, và việc tái chế pin là bài toán lớn. Công nghệ đang giải dần các thách thức này.' },
    ],
    examples: [
      { q: 'Bài tập: Xe điện (BEV) và xe hybrid (HEV) khác nhau ở điểm cốt lõi nào?', a: 'Giải: BEV chỉ dùng động cơ điện và pin, không có động cơ đốt trong. HEV có cả hai: động cơ đốt trong và động cơ điện phối hợp để tiết kiệm nhiên liệu, vẫn dùng xăng.' },
      { q: 'Bài tập: Vì sao pin xe điện cần hệ quản lý pin (BMS)?', a: 'Giải: Vì pin lithium-ion nhạy với nhiệt và điện áp; nếu quá nóng hoặc sạc/xả quá mức có thể chai, thậm chí cháy nổ. BMS giám sát nhiệt độ, điện áp từng cell và cân bằng chúng để pin an toàn và bền.' },
    ],
  },

  'H11CN-w33-quiz': {
    topic: 'Ôn tập cuối học kì 2 (lý thuyết tổng hợp)',
    intro: 'Chào các em! Tuần ôn tập tổng hợp cả Phần 1 và Phần 2, kết nối kiến thức chế tạo với động lực để chuẩn bị kiểm tra cuối kì.',
    objectives: [
      'Liên kết kiến thức vật liệu - gia công với cơ khí động lực.',
      'Củng cố các hệ thống ô tô và an toàn bị động.',
      'Phân biệt nhanh các khái niệm hay nhầm.',
    ],
    theory: [
      { h: 'Chế tạo — nhắc lại' },
      { ul: ['Đúc phù hợp tạo vật hình dạng phức tạp, đặc biệt chi tiết lớn.', 'Inox 304: thép không gỉ chứa Cr và Ni, chống ăn mòn tốt.', 'Máy CNC điều khiển bằng chương trình số (G-code).'] },
      { h: 'Động lực — nhắc lại' },
      { ul: ['Hệ thống nhiên liệu xăng hiện đại dùng phun xăng điện tử (EFI/GDI).', 'Ly hợp và hộp số thuộc hệ thống truyền lực.', 'Túi khí và dây an toàn thuộc hệ thống an toàn bị động.'] },
      { h: 'Kết nối hai phần' },
      { p: 'Chú ý mạch liên kết: vật liệu (gang, thép, nhôm) → dùng để chế tạo các chi tiết động cơ và ô tô; phương pháp gia công (đúc, cắt gọt) → làm ra blocks, trục, bánh răng cho động cơ. Hai phần học gắn chặt với nhau.' },
      { note: 'Ôn bằng cách tự đặt câu hỏi: chi tiết X làm bằng vật liệu gì, gia công kiểu nào, thuộc hệ thống nào của xe. Trả lời được chuỗi này là đã nắm kiến thức xuyên suốt cả năm.' },
    ],
    examples: [
      { q: 'Bài tập: Túi khí và dây an toàn thuộc hệ thống nào, có tác dụng gì?', a: 'Giải: Thuộc hệ thống an toàn bị động trên ô tô. Chúng giảm thương tích cho người khi va chạm đã xảy ra: dây giữ người ở ghế, túi khí đệm để giảm lực va đập.' },
      { q: 'Bài tập: Inox 304 có những nguyên tố hợp kim chính nào và vì sao chống gỉ?', a: 'Giải: Inox 304 chứa crom (Cr) và niken (Ni). Crom tạo lớp oxit thụ động bảo vệ bề mặt nên chống ăn mòn; niken tăng độ dẻo dai và khả năng chống gỉ.' },
    ],
  },

  'H11CN-w34-quiz': {
    topic: 'Ôn tập tổng hợp cuối năm',
    intro: 'Chào các em! Tuần tổng ôn cuối năm, ta rà toàn bộ kiến thức trọng tâm cả hai học kì, tập trung vào các điểm phân biệt then chốt.',
    objectives: [
      'Hệ thống kiến thức vật liệu, gia công, động cơ, ô tô.',
      'Củng cố các điểm dễ nhầm.',
      'Sẵn sàng cho bài kiểm tra cuối năm.',
    ],
    theory: [
      { h: 'Vật liệu và gia công' },
      { ul: ['Gang khác thép ở %C: gang > 2,14%; thép ≤ 2,14%.', 'Composite tận dụng ưu điểm của các thành phần kết hợp.', 'Máy phay gia công mặt phẳng, rãnh, biên dạng bằng dao quay.'] },
      { h: 'Tự động hoá và động cơ' },
      { ul: ['Robot công nghiệp tăng năng suất, chính xác, an toàn ở môi trường độc hại.', 'Trong 4 kỳ, kỳ sinh công là Cháy - giãn nở.', 'ABS hỗ trợ phanh an toàn, không bó cứng bánh.'] },
      { h: 'Chiến lược tổng ôn' },
      { p: 'Chia kiến thức thành 4 mảng: vật liệu — gia công — động cơ — hệ thống ô tô. Với mỗi mảng nắm 3-4 khái niệm cốt lõi kèm một ví dụ ứng dụng.' },
      { note: 'Các từ khoá phân biệt hay ra đề: gang/thép (%C), tiện/phay (phôi quay hay dao quay), xăng/diesel (bugi hay nén tự cháy), ABS (chống bó cứng phanh). Nắm chắc nhóm này là làm tốt phần lớn câu hỏi.' },
    ],
    examples: [
      { q: 'Bài tập: Phân biệt nhanh máy tiện và máy phay theo "cái gì quay".', a: 'Giải: Máy tiện: PHÔI quay, dao đứng (tịnh tiến) — gia công mặt tròn xoay. Máy phay: DAO quay, phôi đưa vào — gia công mặt phẳng, rãnh, biên dạng.' },
      { q: 'Bài tập: Robot công nghiệp đem lại lợi ích gì trong môi trường độc hại?', a: 'Giải: Robot làm việc thay người ở nơi có hơi sơn, khói hàn, nhiệt cao mà không hại sức khoẻ ai; lại làm chính xác, liên tục và năng suất cao, đảm bảo an toàn lao động.' },
    ],
  },

  'H11CN-w35-quiz': {
    topic: 'Kiểm tra cuối học kì 2 — Tổng ôn cả năm Công nghệ 11',
    intro: 'Chào các em! Tuần cuối cùng — kiểm tra cuối kì 2 và tổng ôn cả năm. Ta điểm lại những kiến thức ứng dụng quan trọng nhất để các em tự tin hoàn thành môn học.',
    objectives: [
      'Vận dụng tổng hợp kiến thức cả năm vào tình huống thực tế.',
      'Củng cố vật liệu, gia công, hệ thống ô tô và an toàn.',
      'Khép lại chương trình Công nghệ 11 định hướng Cơ khí.',
    ],
    theory: [
      { h: 'Vật liệu và gia công' },
      { p: 'Nhôm (Al) nhẹ, chống ăn mòn nhờ lớp oxit Al2O3 bảo vệ — dùng cho khung máy bay nhẹ và nhiều chi tiết xe hơi. Phay là phương pháp gia công bằng dao quay tạo rãnh, biên dạng.' },
      { h: 'Hệ thống ô tô' },
      { ul: ['ABS chống bó cứng phanh, giữ khả năng đánh lái khi phanh khẩn cấp.', 'ECU điều khiển phun nhiên liệu, đánh lửa, khí xả dựa trên cảm biến.', 'Xe điện ưu việt: không phát thải tại chỗ, vận hành êm.'] },
      { h: 'An toàn sử dụng xe' },
      { p: 'Sử dụng xe an toàn cần: thắt dây an toàn, tuân thủ luật giao thông, bảo dưỡng định kỳ và không lái khi mệt hay say.' },
      { note: 'Kết thúc môn học: các em đã đi từ vật liệu, phương pháp gia công, sản xuất cơ khí (Phần 1) đến động cơ, ô tô và xu hướng xe điện (Phần 2). Đây là nền tảng tốt nếu các em theo hướng kỹ thuật, cơ khí, ô tô ở bậc cao hơn.' },
    ],
    examples: [
      { q: 'Bài tập: Vì sao nhôm được chọn cho nhiều chi tiết xe hơi và khung máy bay?', a: 'Giải: Vì nhôm nhẹ (giảm khối lượng, tiết kiệm nhiên liệu) và chống ăn mòn nhờ lớp oxit Al2O3 tự bảo vệ. Nhẹ mà bền là yêu cầu hàng đầu của phương tiện di chuyển.' },
      { q: 'Bài tập: Liệt kê ba việc cần làm để sử dụng ô tô an toàn.', a: 'Giải: (1) Thắt dây an toàn và tuân thủ luật giao thông; (2) bảo dưỡng định kỳ (dầu, phanh, lốp, nước làm mát); (3) không lái xe khi mệt mỏi hoặc đã uống rượu bia.' },
    ],
  },

  'H11CN-w36-quiz': {
    topic: 'Kết thúc Công Nghệ 11 — Kỹ thuật, Xe hơi và Hành trình lớp 12',
    intro: 'Công Nghệ 11 đã dẫn chúng ta qua thế giới vật liệu cơ khí, phương pháp gia công, động cơ đốt trong và hệ thống ô tô hiện đại. Hôm nay chúng ta tổng kết kiến thức, kết nối với thực tiễn kỹ thuật và hiểu tại sao kỹ thuật cơ khí vẫn là nền tảng của công nghiệp hiện đại dù thế giới đang số hoá.',
    objectives: [
      'Hệ thống hoá kiến thức Công Nghệ 11 về vật liệu, gia công cơ khí, động cơ và ô tô.',
      'Kết nối kiến thức kỹ thuật với xu hướng công nghệ hiện đại: xe điện, tự động hoá, IoT.',
      'Định hướng cho những học sinh yêu thích kỹ thuật: các ngành học và nghề nghiệp phù hợp.',
    ],
    theory: [
      { h: 'Bức tranh Công Nghệ 11' },
      { ul: [
        'Phần 1 — Cơ khí chế tạo: vật liệu (thép, nhôm, nhựa, composite), phương pháp gia công (tiện, phay, khoan, đúc, hàn), quy trình sản xuất cơ khí.',
        'Phần 2 — Động cơ đốt trong: nguyên lý 4 kỳ (nạp – nén – nổ – xả), hệ thống làm mát, bôi trơn, đánh lửa, nhiên liệu.',
        'Phần 3 — Ô tô hiện đại: hệ thống truyền lực, hệ thống phanh ABS, hệ thống điều khiển điện tử ECU, cảm biến và an toàn chủ động.',
        'Xu hướng: xe điện (EV), xe hybrid, lái xe tự động (ADAS/autonomous driving).',
      ] },
      { h: 'Vật liệu và ứng dụng thực tiễn' },
      { ul: [
        'Nhôm hợp kim (Al–Si, Al–Mg): nhẹ + bền → khung xe máy bay, thân xe hơi; tấm pin mặt trời.',
        'Thép không gỉ (inox): chống ăn mòn → dụng cụ y tế, thiết bị nhà bếp, cấu kiện biển.',
        'Vật liệu composite (carbon fiber): siêu nhẹ + siêu bền → xe đua F1, thiết bị thể thao cao cấp, drone.',
        'Nhựa kỹ thuật (ABS, polycarbonate): cách điện, nhẹ, định hình dễ → vỏ điện thoại, đèn ô tô, mũ bảo hiểm.',
      ] },
      { h: 'Công nghệ 12 và những hướng nghề nghiệp' },
      { ul: [
        'Công Nghệ 12 tập trung vào công nghệ điện-điện tử, lắp đặt điện dân dụng, hệ thống thông tin điều khiển.',
        'Nghề kỹ sư cơ khí: thiết kế và sản xuất sản phẩm từ kim loại/nhựa — nhu cầu cao trong công nghiệp ô tô và điện tử.',
        'Kỹ sư ô tô và động cơ: bảo dưỡng, thiết kế xe điện — thị trường đang bùng nổ toàn cầu.',
        'Kỹ sư tự động hoá/cơ điện tử: kết hợp cơ khí + điện + lập trình — nghề có thu nhập cao nhất ngành kỹ thuật.',
      ] },
      { note: 'Thế giới đang chuyển đổi năng lượng: xe xăng → xe điện, nhà máy thủ công → tự động hoá CNC và robot. Nhưng ai vận hành, bảo trì và thiết kế những máy móc đó? Chính là những người hiểu cả cơ khí truyền thống lẫn công nghệ số — đúng như những gì Công Nghệ 11 đã trang bị cho em.' },
    ],
    examples: [
      { q: 'Tại sao xe điện được coi là tương lai của ngành ô tô? Nêu ít nhất 3 ưu điểm so với xe động cơ đốt trong.', a: 'Ba ưu điểm chính của xe điện: (1) KHÔNG PHÁT THẢI CO2 tại chỗ → giảm ô nhiễm không khí đô thị; (2) HIỆU SUẤT NĂNG LƯỢNG cao hơn (điện → cơ khoảng 90–95% hiệu suất, so với 25–40% của động cơ đốt trong); (3) VẬN HÀNH ÊM, ÍT RUNG ĐỘNG hơn vì không có trục khuỷu và xi lanh. Thách thức còn lại: thời gian sạc, hạ tầng trạm sạc, giá pin vẫn còn cao — nhưng đang giảm nhanh nhờ công nghệ pin lithium-ion và pin thể rắn (solid-state battery) thế hệ mới.' },
      { q: 'Một học sinh thích vừa cơ khí vừa lập trình. Nên chọn ngành học nào ở đại học?', a: 'Ngành phù hợp nhất là CƠ ĐIỆN TỬ (Mechatronics Engineering) hoặc KỸ THUẬT TỰ ĐỘNG HOÁ. Đây là ngành kết hợp 4 lĩnh vực: cơ khí, điện-điện tử, điều khiển và lập trình. Sinh viên học thiết kế máy móc (cơ khí) + mạch điện (điện tử) + PLC/vi điều khiển (điều khiển) + Python/C++ (lập trình) để tạo ra hệ thống robot, dây chuyền tự động. Thu nhập trung bình của kỹ sư cơ điện tử tại VN hiện khoảng 20–35 triệu đồng/tháng sau 3–5 năm kinh nghiệm.' },
    ],
  },
};
