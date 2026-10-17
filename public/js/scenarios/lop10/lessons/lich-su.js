// ============================================================
// Lớp 10 · LỊCH SỬ — Lý thuyết 35 tuần (CTGD 2018 — THPT).
// Key trùng id quiz: "H10SU-wNN-quiz".
// Bám CT Lịch sử 10: Lịch sử và Sử học — Các nền văn minh thế giới cổ - trung đại
// — Văn minh Đông Nam Á và Văn minh Việt Nam. Văn phong gọi học sinh là "các em".
// ============================================================

export const H10SU_LESSONS = {
  'H10SU-w01-quiz': {
    topic: 'Sử học là gì?',
    intro: 'Chào các em đến với Lịch sử 10. Trước khi đi vào các nền văn minh, các em cần hiểu chính bản thân môn học: Sử học là gì, nghiên cứu cái gì và để làm gì.',
    objectives: [
      'Phân biệt khái niệm \'lịch sử\' và \'Sử học\'.',
      'Nêu được đối tượng và chức năng của Sử học.',
      'Hiểu vì sao nhà sử học phải khách quan, trung thực.',
    ],
    theory: [
      { h: 'Lịch sử và Sử học' },
      { p: 'Lịch sử là toàn bộ những gì đã diễn ra trong quá khứ của xã hội loài người. Sử học là khoa học nghiên cứu về quá khứ ấy — phục dựng lại sự thật đã qua một cách có hệ thống.' },
      { p: 'Đối tượng nghiên cứu của Sử học là toàn bộ quá khứ của xã hội loài người, trên mọi mặt: chính trị, kinh tế, văn hoá, xã hội — không chỉ riêng vua chúa hay chiến tranh.' },
      { h: 'Chức năng của Sử học' },
      { ul: [
        'Chức năng khoa học: khôi phục đúng sự thật quá khứ, rút ra quy luật.',
        'Chức năng giáo dục: bồi dưỡng nhân cách, lòng yêu nước, rút bài học.',
        'Chức năng xã hội: gắn kết cộng đồng, định hướng tương lai.',
      ] },
      { h: 'Phẩm chất của nhà sử học' },
      { p: 'Người nghiên cứu lịch sử phải khách quan, trung thực, không bóp méo hay bịa đặt sự kiện. Mọi kết luận đều phải dựa trên chứng cứ (sử liệu).' },
      { note: 'Học lịch sử không phải để thuộc lòng ngày tháng, mà để hiểu cội nguồn và rút ra bài học cho hôm nay.' },
    ],
    examples: [
      { q: 'Vì sao nói khởi nghĩa Hai Bà Trưng vừa là \'lịch sử\' vừa là đối tượng của \'Sử học\'?', a: 'Cuộc khởi nghĩa đã diễn ra năm 40-43 nên thuộc về lịch sử (quá khứ đã qua). Khi các nhà nghiên cứu sưu tầm sử liệu, dựng lại diễn biến và ý nghĩa của nó thì đó là công việc của Sử học.' },
      { q: 'Một người viết rằng \'Vua Hùng có 18 đời đều cao 2 mét\'. Nhận xét về tính khoa học.', a: 'Phát biểu này vi phạm nguyên tắc khách quan, trung thực vì không có sử liệu nào chứng minh. Nhà sử học phải dựa vào chứng cứ, không suy diễn tuỳ tiện.' },
    ],
  },

  'H10SU-w02-quiz': {
    topic: 'Nguồn sử liệu và phương pháp nghiên cứu',
    intro: 'Các em hãy hình dung nhà sử học như một thám tử: muốn dựng lại quá khứ thì phải có \'bằng chứng\'. Những bằng chứng ấy gọi là sử liệu.',
    objectives: [
      'Phân loại được các nguồn sử liệu.',
      'Phân biệt sử liệu sơ cấp và thứ cấp.',
      'Nêu các phương pháp cơ bản trong nghiên cứu lịch sử.',
    ],
    theory: [
      { h: 'Sử liệu là gì?' },
      { p: 'Sử liệu là mọi dấu vết của quá khứ giúp ta nhận thức về lịch sử. Không có sử liệu thì không thể nghiên cứu lịch sử.' },
      { h: 'Phân loại theo hình thức' },
      { ul: [
        'Sử liệu hiện vật: trống đồng, văn bia, đồ gốm, tiền cổ, công cụ.',
        'Sử liệu chữ viết: chính sử như Đại Việt sử ký toàn thư, văn bản, gia phả.',
        'Sử liệu truyền miệng: truyền thuyết, ca dao, tục ngữ.',
        'Sử liệu hình ảnh: tranh, ảnh, phim tư liệu.',
      ] },
      { h: 'Sơ cấp và thứ cấp' },
      { p: 'Sử liệu sơ cấp (gốc) ra đời đồng thời với sự kiện — như bản gốc một sắc lệnh. Sử liệu thứ cấp được tạo ra sau, dựa trên sử liệu gốc — như sách nghiên cứu.' },
      { h: 'Phương pháp nghiên cứu' },
      { ul: [
        'Sưu tầm, giám định và phê phán sử liệu.',
        'Phương pháp lịch sử và phương pháp logic.',
        'Khảo cổ học để tìm hiện vật, di tích phục dựng quá khứ.',
      ] },
      { note: 'Một sử liệu phải được kiểm chứng độ tin cậy trước khi dùng — đây là khâu phê phán sử liệu.' },
    ],
    examples: [
      { q: 'Trống đồng Ngọc Lũ và truyền thuyết Sơn Tinh - Thuỷ Tinh thuộc loại sử liệu nào?', a: 'Trống đồng là sử liệu hiện vật (sơ cấp), do người Đông Sơn để lại. Truyền thuyết Sơn Tinh - Thuỷ Tinh là sử liệu truyền miệng, phản ánh gián tiếp công cuộc trị thuỷ thời Văn Lang.' },
      { q: 'Khảo cổ học đóng góp gì khi nghiên cứu thời kỳ chưa có chữ viết?', a: 'Với thời chưa có chữ viết, khảo cổ học là nguồn chính: qua di chỉ, công cụ, mộ táng mà các nhà sử học suy ra trình độ sản xuất, đời sống, tín ngưỡng của cư dân cổ.' },
    ],
  },

  'H10SU-w03-quiz': {
    topic: 'Văn minh Ai Cập và Lưỡng Hà cổ đại',
    intro: 'Các em sẽ bắt đầu hành trình qua các nền văn minh lớn của nhân loại, mở đầu là hai cái nôi ở phương Đông: Ai Cập bên sông Nile và Lưỡng Hà giữa hai con sông.',
    objectives: [
      'Xác định điều kiện tự nhiên hình thành hai nền văn minh.',
      'Kể được các thành tựu tiêu biểu.',
      'Hiểu vai trò của các dòng sông lớn.',
    ],
    theory: [
      { h: 'Văn minh Ai Cập' },
      { p: 'Hình thành ven sông Nile ở Đông Bắc châu Phi. Sông Nile bồi đắp phù sa, tạo điều kiện cho nông nghiệp phát triển — sử gia Herodotus gọi Ai Cập là \'tặng phẩm của sông Nile\'.' },
      { ul: [
        'Kim tự tháp Giza và tượng Nhân sư là công trình tiêu biểu.',
        'Chữ tượng hình (hieroglyph).',
        'Tin linh hồn bất tử, ướp xác, thờ nhiều thần (Ra, Osiris).',
        'Giỏi thiên văn, làm lịch, hình học để đo ruộng.',
      ] },
      { h: 'Văn minh Lưỡng Hà' },
      { p: 'Lưỡng Hà (Mesopotamia) nằm giữa hai sông Tigris và Euphrates, vùng Iraq ngày nay. Nhiều tộc người kế tiếp nhau dựng nên: Sumer, Akkad, Babylon, Assyria.' },
      { ul: [
        'Chữ hình nêm (cuneiform) viết trên đất sét.',
        'Bộ luật Hammurabi (~1750 TCN) — một trong những bộ luật thành văn cổ nhất.',
        'Hệ đếm 60 (chia giờ thành 60 phút còn dùng đến nay).',
      ] },
      { note: 'Cả hai nền văn minh đều gắn với các dòng sông lớn — đặc trưng chung của văn minh phương Đông cổ đại.' },
    ],
    examples: [
      { q: 'Vì sao kim tự tháp được xem là biểu tượng cho trình độ Ai Cập cổ đại?', a: 'Kim tự tháp Giza đòi hỏi trình độ toán học, hình học, tổ chức lao động và thiên văn rất cao để xếp hàng triệu khối đá nặng chính xác mà chưa có máy móc hiện đại. Nó phản ánh sức mạnh nhà nước và niềm tin tôn giáo.' },
      { q: 'Nguyên tắc nổi tiếng của Bộ luật Hammurabi là gì và nói lên điều gì?', a: 'Nguyên tắc \'mắt đền mắt, răng đền răng\' (luật trả thù tương xứng). Nó cho thấy nhà nước Babylon đã dùng pháp luật thành văn để điều chỉnh xã hội, dù còn hà khắc và phân biệt đẳng cấp.' },
    ],
  },

  'H10SU-w04-quiz': {
    topic: 'Văn minh Trung Hoa cổ - trung đại',
    intro: 'Trung Hoa là một trong những nền văn minh liên tục lâu đời nhất thế giới và ảnh hưởng sâu sắc đến Việt Nam. Các em hãy chú ý những thành tựu còn giá trị đến hôm nay.',
    objectives: [
      'Nêu cơ sở hình thành văn minh Trung Hoa.',
      'Kể tên các triều đại và thành tựu lớn.',
      'Hiểu ảnh hưởng của Nho giáo và tứ đại phát minh.',
    ],
    theory: [
      { h: 'Cơ sở hình thành' },
      { p: 'Văn minh Trung Hoa hình thành ở lưu vực sông Hoàng Hà và Trường Giang. Phù sa hai dòng sông tạo nền nông nghiệp trồng kê, lúa nuôi dưỡng nền văn minh.' },
      { h: 'Các triều đại tiêu biểu' },
      { ul: [
        'Hạ - Thương - Chu: thời cổ đại sơ khai.',
        'Tần: Tần Thuỷ Hoàng thống nhất Trung Hoa năm 221 TCN.',
        'Hán, Đường, Tống, Minh, Thanh: thời trung đại phát triển rực rỡ.',
      ] },
      { h: 'Tư tưởng và phát minh' },
      { p: 'Khổng Tử (551-479 TCN) sáng lập Nho giáo, đề cao đạo đức, trật tự xã hội. Bên cạnh đó có Đạo giáo (Lão Tử), Pháp gia.' },
      { ul: [
        'Tứ đại phát minh: giấy, kỹ thuật in, la bàn, thuốc súng.',
        'Vạn Lý Trường Thành — công trình phòng thủ khổng lồ.',
        'Sử học, y học, thiên văn phát triển.',
      ] },
      { note: 'Nho giáo và chữ Hán theo con đường giao lưu và đô hộ đã ảnh hưởng lớn đến văn hoá Việt Nam thời trung đại.' },
    ],
    examples: [
      { q: 'Tứ đại phát minh của Trung Hoa tác động thế nào đến thế giới?', a: 'Giấy và kỹ thuật in giúp lan truyền tri thức; la bàn thúc đẩy hàng hải và các cuộc phát kiến địa lý; thuốc súng làm thay đổi chiến tranh. Chúng góp phần đưa nhân loại sang thời cận đại.' },
      { q: 'Vì sao Tần Thuỷ Hoàng được coi là nhân vật bước ngoặt?', a: 'Năm 221 TCN ông chấm dứt thời Chiến Quốc, lập nhà nước trung ương tập quyền đầu tiên, thống nhất chữ viết, đo lường, tiền tệ và cho xây Vạn Lý Trường Thành — đặt nền móng cho Trung Hoa thống nhất.' },
    ],
  },

  'H10SU-w05-quiz': {
    topic: 'Văn minh Ấn Độ cổ - trung đại',
    intro: 'Ấn Độ là quê hương của những tôn giáo lớn và những con số mà các em dùng hằng ngày. Hãy khám phá nền văn minh bên sông Ấn và sông Hằng.',
    objectives: [
      'Nêu điều kiện tự nhiên và tôn giáo của Ấn Độ.',
      'Phân biệt Hindu giáo và Phật giáo.',
      'Kể các thành tựu khoa học, văn học tiêu biểu.',
    ],
    theory: [
      { h: 'Cơ sở hình thành' },
      { p: 'Văn minh Ấn Độ hình thành ở lưu vực sông Ấn (Indus) và sông Hằng (Ganges). Khí hậu gió mùa và phù sa giúp nông nghiệp phát triển.' },
      { h: 'Tôn giáo' },
      { ul: [
        'Hindu giáo (Bà La Môn): tôn giáo bản địa cổ nhất, gắn với chế độ đẳng cấp.',
        'Phật giáo: do Siddhartha Gautama (Thích Ca Mâu Ni) sáng lập thế kỷ VI TCN, đề cao từ bi, bình đẳng.',
      ] },
      { h: 'Chế độ đẳng cấp Varna' },
      { p: 'Xã hội chia bốn đẳng cấp: Brahmin (tăng lữ), Kshatriya (quý tộc, võ sĩ), Vaishya (thương nhân, nông dân), Shudra (người phục dịch); dưới cùng là tầng lớp tiện dân.' },
      { h: 'Thành tựu' },
      { ul: [
        'Hệ chữ số thập phân và số 0 — đóng góp lớn cho toán học thế giới.',
        'Hai sử thi đồ sộ: Mahabharata và Ramayana.',
        'Kiến trúc đền - tháp, nghệ thuật điêu khắc tinh xảo.',
      ] },
      { note: 'Số 0 và hệ thập phân Ấn Độ qua người Arab truyền sang châu Âu, là nền tảng của toán học hiện đại.' },
    ],
    examples: [
      { q: 'So sánh điểm khác biệt cơ bản giữa Phật giáo và Hindu giáo về đẳng cấp.', a: 'Hindu giáo thừa nhận và củng cố chế độ đẳng cấp Varna. Phật giáo lại phản đối sự phân biệt đẳng cấp, cho rằng mọi người đều có thể tu hành giải thoát — đây là điểm tiến bộ thu hút đông đảo dân chúng.' },
      { q: 'Vì sao việc phát minh số 0 lại quan trọng?', a: 'Số 0 cho phép biểu diễn các số lớn bằng hệ vị trí, giúp tính toán đơn giản và chính xác hơn nhiều so với chữ số La Mã. Không có số 0 thì toán học, khoa học hiện đại khó phát triển.' },
    ],
  },

  'H10SU-w06-quiz': {
    topic: 'Văn minh Hy Lạp cổ đại',
    intro: 'Chuyển sang phương Tây, các em sẽ gặp Hy Lạp — cái nôi của dân chủ và triết học, nơi đặt nền móng cho văn minh châu Âu.',
    objectives: [
      'Nêu điều kiện hình thành các thành bang Hy Lạp.',
      'Hiểu mô hình dân chủ Athens.',
      'Kể các thành tựu triết học, khoa học, kiến trúc.',
    ],
    theory: [
      { h: 'Điều kiện tự nhiên' },
      { p: 'Hy Lạp nằm ở nam bán đảo Balkan, ven Địa Trung Hải, nhiều núi và đảo, ít đồng bằng. Vị trí ven biển thúc đẩy thương mại, hàng hải hơn là nông nghiệp.' },
      { h: 'Thành bang (polis)' },
      { ul: [
        'Athens: nổi tiếng với chế độ dân chủ trực tiếp.',
        'Sparta: theo chế độ quân phiệt, đề cao binh nghiệp.',
      ] },
      { h: 'Dân chủ Athens' },
      { p: 'Công dân nam tự do được tham gia Đại hội nhân dân, biểu quyết các vấn đề chung. Đây là nền dân chủ trực tiếp đầu tiên, dù còn hạn chế vì loại trừ phụ nữ và nô lệ.' },
      { h: 'Thành tựu văn hoá' },
      { ul: [
        'Triết học: Socrates, Plato, Aristotle.',
        'Khoa học: Pythagoras, Euclid, Archimedes.',
        'Kiến trúc: đền Parthenon trên đồi Acropolis.',
        'Thế vận hội Olympic cổ đại bắt đầu năm 776 TCN.',
      ] },
      { note: 'Nhiều khái niệm \'dân chủ\', \'công dân\' của thế giới hiện đại bắt nguồn từ Hy Lạp cổ đại.' },
    ],
    examples: [
      { q: 'Nền dân chủ Athens tiến bộ và hạn chế ở điểm nào?', a: 'Tiến bộ vì cho phép công dân trực tiếp bàn bạc, quyết định việc nước — chống lại chuyên chế. Hạn chế vì chỉ công dân nam tự do được tham gia, còn phụ nữ, nô lệ và người nước ngoài bị loại trừ.' },
      { q: 'Vì sao điều kiện tự nhiên khiến Hy Lạp mạnh về thương mại, hàng hải?', a: 'Đất ít đồng bằng, nhiều núi và đường bờ biển dài với nhiều cảng tự nhiên khiến người Hy Lạp hướng ra biển buôn bán, lập thuộc địa quanh Địa Trung Hải thay vì chỉ làm nông nghiệp.' },
    ],
  },

  'H10SU-w07-quiz': {
    topic: 'Văn minh La Mã cổ đại',
    intro: 'Kế thừa Hy Lạp, La Mã xây dựng một đế chế hùng mạnh trải dài quanh Địa Trung Hải, để lại di sản pháp luật và kiến trúc mà các em vẫn thấy dấu vết ngày nay.',
    objectives: [
      'Nêu các giai đoạn lịch sử La Mã.',
      'Kể thành tựu pháp luật, kiến trúc, kỹ thuật.',
      'Hiểu vai trò của luật La Mã với châu Âu.',
    ],
    theory: [
      { h: 'Hình thành và các giai đoạn' },
      { p: 'La Mã hình thành trên bán đảo Italy, ven sông Tiber. Lịch sử trải qua ba giai đoạn: Vương quốc (753-509 TCN) → Cộng hoà → Đế chế.' },
      { h: 'Nhân vật và mốc lớn' },
      { ul: [
        'Julius Caesar: nhà quân sự, chính trị cuối thời Cộng hoà.',
        'Augustus (Octavian): hoàng đế đầu tiên, lập đế chế năm 27 TCN.',
      ] },
      { h: 'Thành tựu tiêu biểu' },
      { ul: [
        'Luật La Mã (civil law) — nền tảng pháp luật châu Âu hiện đại.',
        'Kiến trúc: đấu trường Colosseum (80 SCN), đền Pantheon, hệ thống đường, cầu máng dẫn nước.',
        'Kỹ thuật xây dựng với bê tông, vòm cuốn.',
      ] },
      { note: 'La Mã tiếp thu và lan toả văn hoá Hy Lạp khắp châu Âu — người ta thường nói chung là văn minh Hy - La.' },
    ],
    examples: [
      { q: 'Vì sao luật La Mã được xem là di sản lớn nhất của nền văn minh này?', a: 'Luật La Mã lần đầu hệ thống hoá các nguyên tắc về quyền sở hữu, hợp đồng, tố tụng. Nó trở thành cơ sở cho hệ thống dân luật của nhiều nước châu Âu lục địa và ảnh hưởng đến luật pháp thế giới đến nay.' },
      { q: 'Đấu trường Colosseum phản ánh điều gì về xã hội La Mã?', a: 'Colosseum chứa được hàng vạn khán giả, cho thấy trình độ kỹ thuật xây dựng cao. Đồng thời các trận đấu giác đấu phản ánh đời sống giải trí và cả tính tàn khốc của xã hội nô lệ La Mã.' },
    ],
  },

  'H10SU-w08-quiz': {
    topic: 'Văn minh Đông Nam Á',
    intro: 'Quay về khu vực của chúng ta, các em sẽ thấy Đông Nam Á là ngã tư giao thoa văn hoá, nơi nảy sinh nhiều vương quốc và những công trình kỳ vĩ.',
    objectives: [
      'Hiểu vị trí cầu nối của Đông Nam Á.',
      'Nêu ảnh hưởng của Ấn Độ và Trung Hoa.',
      'Kể các vương quốc và công trình tiêu biểu.',
    ],
    theory: [
      { h: 'Vị trí địa lý' },
      { p: 'Đông Nam Á nằm giữa Ấn Độ và Trung Hoa, án ngữ tuyến đường biển quan trọng nối Đông - Tây nên trở thành cầu nối giao thương và giao lưu văn hoá.' },
      { h: 'Hai nguồn ảnh hưởng' },
      { ul: [
        'Văn minh Ấn Độ: ảnh hưởng tới Champa, Phù Nam, Khmer, các đảo — qua Hindu giáo, Phật giáo, chữ viết.',
        'Văn minh Trung Hoa: ảnh hưởng tới Việt Nam qua hơn 1000 năm Bắc thuộc — Nho giáo, chữ Hán.',
      ] },
      { h: 'Các vương quốc và công trình' },
      { ul: [
        'Phù Nam (TK I-VII): ở hạ lưu Mekong, văn hoá Óc Eo.',
        'Champa (TK II-XVII): ở miền Trung Việt Nam, thánh địa Mỹ Sơn.',
        'Đế chế Khmer (TK IX-XV): đền Angkor Wat ở Campuchia.',
        'Borobudur (TK IX): quần thể đền Phật giáo trên đảo Java, Indonesia.',
      ] },
      { note: 'Đông Nam Á tiếp thu văn minh bên ngoài nhưng luôn bản địa hoá để giữ bản sắc riêng.' },
    ],
    examples: [
      { q: 'Vì sao Đông Nam Á được gọi là khu vực \'thống nhất trong đa dạng\'?', a: 'Các nước Đông Nam Á có chung nền văn minh nông nghiệp lúa nước, tín ngưỡng phồn thực, cùng tiếp thu văn hoá Ấn - Trung. Nhưng mỗi dân tộc lại có ngôn ngữ, tôn giáo, kiến trúc riêng — tạo nên sự đa dạng.' },
      { q: 'Angkor Wat và Borobudur phản ánh điều gì về ảnh hưởng văn hoá Ấn Độ?', a: 'Angkor Wat ban đầu thờ thần Hindu, Borobudur là đền Phật giáo — cả hai cho thấy Hindu giáo và Phật giáo từ Ấn Độ đã lan tới Đông Nam Á, được người bản địa tiếp nhận và xây nên những công trình vĩ đại mang sắc thái riêng.' },
    ],
  },

  'H10SU-w09-quiz': {
    topic: 'Văn minh Văn Lang - Âu Lạc',
    intro: 'Đây là cội nguồn dân tộc các em. Văn Lang - Âu Lạc là nhà nước đầu tiên của người Việt, gắn với các Vua Hùng và văn hoá Đông Sơn rực rỡ.',
    objectives: [
      'Nêu sự ra đời của Văn Lang và Âu Lạc.',
      'Xác định kinh đô và niên đại.',
      'Hiểu đặc trưng văn hoá Đông Sơn.',
    ],
    theory: [
      { h: 'Nhà nước Văn Lang' },
      { p: 'Văn Lang xuất hiện khoảng thế kỷ VII TCN, do các Vua Hùng đứng đầu — đây là nhà nước đầu tiên của người Việt. Kinh đô đặt ở Phong Châu (Phú Thọ ngày nay).' },
      { h: 'Nhà nước Âu Lạc' },
      { p: 'Khoảng năm 257 TCN, Thục Phán An Dương Vương hợp nhất các bộ lạc, lập nước Âu Lạc, dời đô về Cổ Loa (Đông Anh, Hà Nội) với thành xoáy ốc nổi tiếng.' },
      { h: 'Văn hoá Đông Sơn' },
      { ul: [
        'Trống đồng Đông Sơn là hiện vật tiêu biểu, đỉnh cao kỹ thuật đúc đồng.',
        'Nghề trồng lúa nước, chăn nuôi, đúc đồng phát triển.',
        'Tín ngưỡng thờ thần Mặt Trời, vật tổ, tục xăm mình, ăn trầu.',
      ] },
      { note: 'Trống đồng vừa là nhạc cụ, vừa là biểu tượng quyền lực và tín ngưỡng của cư dân Đông Sơn.' },
    ],
    examples: [
      { q: 'Thành Cổ Loa cho thấy điều gì về trình độ của người Âu Lạc?', a: 'Thành Cổ Loa với ba vòng thành xoáy ốc, hào nước và truyền thuyết nỏ thần cho thấy người Âu Lạc đã biết tổ chức công trình phòng thủ quy mô lớn, có quân đội và kỹ thuật quân sự phát triển.' },
      { q: 'Vì sao trống đồng Đông Sơn được coi là biểu tượng của văn minh Việt cổ?', a: 'Trống đồng đòi hỏi kỹ thuật luyện kim, đúc đồng cao; hoa văn trên trống mô tả sinh hoạt, lễ hội, tín ngưỡng. Nó phản ánh đời sống vật chất và tinh thần phong phú của cư dân Văn Lang - Âu Lạc.' },
    ],
  },

  'H10SU-w10-quiz': {
    topic: 'Thời kỳ Bắc thuộc',
    intro: 'Sau Âu Lạc là hơn một nghìn năm dân tộc ta bị phong kiến phương Bắc đô hộ. Đây cũng là thời kỳ của những cuộc khởi nghĩa bất khuất mà các em cần ghi nhớ.',
    objectives: [
      'Xác định mốc mở đầu và độ dài thời Bắc thuộc.',
      'Kể các cuộc khởi nghĩa tiêu biểu và niên đại.',
      'Hiểu ý chí giữ gìn bản sắc dân tộc.',
    ],
    theory: [
      { h: 'Mở đầu Bắc thuộc' },
      { p: 'Năm 179 TCN, Triệu Đà thôn tính Âu Lạc, mở đầu thời kỳ Bắc thuộc kéo dài hơn 1000 năm, đến chiến thắng Bạch Đằng năm 938 mới chấm dứt.' },
      { h: 'Chính sách đô hộ' },
      { p: 'Phong kiến phương Bắc chia nước ta thành quận, huyện để cai trị, vơ vét của cải, bắt cống nạp và thi hành chính sách đồng hoá về văn hoá.' },
      { h: 'Các cuộc khởi nghĩa tiêu biểu' },
      { ul: [
        'Khởi nghĩa Hai Bà Trưng (40-43) chống nhà Đông Hán.',
        'Khởi nghĩa Bà Triệu (248) chống nhà Ngô.',
        'Lý Bí khởi nghĩa năm 542, lên ngôi năm 544 lập nước Vạn Xuân.',
        'Khởi nghĩa Mai Thúc Loan (722) chống nhà Đường.',
      ] },
      { note: 'Hơn 1000 năm đô hộ nhưng dân tộc ta không bị đồng hoá — vẫn giữ tiếng nói, phong tục, ý chí độc lập.' },
    ],
    examples: [
      { q: 'Vì sao nói khởi nghĩa Hai Bà Trưng có ý nghĩa lớn?', a: 'Đây là cuộc khởi nghĩa lớn đầu tiên thời Bắc thuộc, giành lại được quyền tự chủ trong thời gian ngắn. Hai Bà Trưng là biểu tượng cho tinh thần quật khởi và vai trò của người phụ nữ Việt trong lịch sử chống ngoại xâm.' },
      { q: 'Việc Lý Bí đặt quốc hiệu Vạn Xuân nói lên điều gì?', a: 'Quốc hiệu Vạn Xuân (mong đất nước trường tồn như vạn mùa xuân) thể hiện khát vọng độc lập, tự chủ lâu dài của dân tộc, khẳng định nước ta là một quốc gia riêng chứ không phải quận huyện của phương Bắc.' },
    ],
  },

  'H10SU-w11-quiz': {
    topic: 'Họ Khúc và chiến thắng Bạch Đằng 938',
    intro: 'Đây là bước ngoặt vĩ đại: từ chỗ giành quyền tự chủ đến chiến thắng Bạch Đằng chấm dứt nghìn năm Bắc thuộc, mở ra kỷ nguyên độc lập cho dân tộc.',
    objectives: [
      'Nêu công lao của họ Khúc.',
      'Trình bày diễn biến, ý nghĩa trận Bạch Đằng 938.',
      'Hiểu vì sao đây là mốc kết thúc Bắc thuộc.',
    ],
    theory: [
      { h: 'Họ Khúc giành quyền tự chủ' },
      { p: 'Năm 905, nhân nhà Đường suy yếu, Khúc Thừa Dụ lập chính quyền tự chủ ở An Nam. Con cháu họ Khúc tiếp tục cải cách, đặt nền móng cho nền độc lập.' },
      { h: 'Chiến thắng Bạch Đằng 938' },
      { p: 'Quân Nam Hán kéo sang xâm lược. Ngô Quyền cho đóng cọc nhọn dưới lòng sông Bạch Đằng, lợi dụng thuỷ triều lên xuống để nhử và tiêu diệt đoàn thuyền giặc.' },
      { ul: [
        'Năm 938: Ngô Quyền đại phá quân Nam Hán.',
        'Năm 939: Ngô Quyền xưng vương, đóng đô ở Cổ Loa.',
      ] },
      { h: 'Ý nghĩa' },
      { p: 'Chiến thắng Bạch Đằng chấm dứt hơn 1000 năm Bắc thuộc, mở ra kỷ nguyên độc lập, tự chủ lâu dài cho dân tộc Việt Nam.' },
      { note: 'Sau khi nhà Ngô suy yếu, đất nước rơi vào loạn 12 sứ quân — đặt ra yêu cầu phải thống nhất.' },
    ],
    examples: [
      { q: 'Vì sao kế đóng cọc trên sông Bạch Đằng của Ngô Quyền được coi là sáng tạo?', a: 'Ngô Quyền nắm chắc quy luật thuỷ triều: khi triều lên cọc bị ngập, dụ thuyền giặc tiến vào; khi triều rút, cọc nhô lên đâm thủng và chặn thuyền. Đây là nghệ thuật quân sự dùng địa hình, thuỷ văn để lấy ít thắng nhiều.' },
      { q: 'Vì sao chiến thắng 938 được gọi là mốc mở kỷ nguyên độc lập?', a: 'Nó chấm dứt vĩnh viễn ách đô hộ phương Bắc kéo dài hơn nghìn năm; từ đây nước ta bước vào thời kỳ xây dựng nhà nước phong kiến độc lập, tự chủ với các triều Ngô, Đinh, Tiền Lê, Lý, Trần...' },
    ],
  },

  'H10SU-w12-quiz': {
    topic: 'Nhà Đinh - Tiền Lê',
    intro: 'Sau loạn 12 sứ quân, đất nước cần một người thống nhất. Các em sẽ học về Đinh Bộ Lĩnh, Lê Hoàn và buổi đầu xây dựng nhà nước độc lập.',
    objectives: [
      'Nêu công lao thống nhất của Đinh Bộ Lĩnh.',
      'Trình bày kháng chiến chống Tống của Lê Hoàn.',
      'Xác định quốc hiệu, kinh đô thời kỳ này.',
    ],
    theory: [
      { h: 'Nhà Đinh' },
      { p: 'Đinh Bộ Lĩnh dẹp loạn 12 sứ quân, thống nhất đất nước. Năm 968 ông lên ngôi, xưng Đinh Tiên Hoàng, đặt quốc hiệu Đại Cồ Việt, đóng đô ở Hoa Lư (Ninh Bình).' },
      { h: 'Nhà Tiền Lê' },
      { p: 'Năm 980, trước nguy cơ xâm lược, Lê Hoàn được suy tôn lên ngôi, lập nhà Tiền Lê (Lê Đại Hành).' },
      { ul: [
        'Năm 981: Lê Hoàn đánh tan quân Tống xâm lược.',
        'Tiếp tục xây dựng bộ máy nhà nước, phát triển nông nghiệp.',
      ] },
      { h: 'Chuyển sang nhà Lý' },
      { p: 'Năm 1009, Lý Công Uẩn được triều thần suy tôn lên ngôi, lập nhà Lý — mở ra một triều đại lớn của Đại Việt.' },
      { note: 'Hoa Lư hiểm trở phù hợp phòng thủ buổi đầu độc lập, nhưng chật hẹp nên sau này nhà Lý phải dời đô.' },
    ],
    examples: [
      { q: 'Vì sao việc Đinh Bộ Lĩnh đặt quốc hiệu Đại Cồ Việt có ý nghĩa quan trọng?', a: 'Đặt quốc hiệu riêng (Đại Cồ Việt nghĩa là nước Việt lớn) thể hiện nước ta là một quốc gia độc lập, ngang hàng với phương Bắc, khẳng định chủ quyền sau khi thống nhất giang sơn.' },
      { q: 'Chiến thắng quân Tống năm 981 của Lê Hoàn có ý nghĩa gì?', a: 'Nó bảo vệ vững chắc nền độc lập non trẻ, đập tan tham vọng tái đô hộ của nhà Tống, củng cố niềm tin và uy thế của nhà nước Đại Cồ Việt buổi đầu.' },
    ],
  },

  'H10SU-w13-quiz': {
    topic: 'Nhà Lý (1009-1225)',
    intro: 'Nhà Lý mở ra thời kỳ phát triển rực rỡ của Đại Việt với việc dời đô về Thăng Long, xây dựng văn hoá, giáo dục và đánh thắng quân Tống.',
    objectives: [
      'Nêu ý nghĩa việc dời đô về Thăng Long.',
      'Trình bày kháng chiến chống Tống của Lý Thường Kiệt.',
      'Kể các thành tựu văn hoá, giáo dục.',
    ],
    theory: [
      { h: 'Dời đô và quốc hiệu' },
      { p: 'Năm 1010, Lý Công Uẩn dời đô từ Hoa Lư về Đại La, đổi tên thành Thăng Long. Năm 1054, Lý Thánh Tông đổi quốc hiệu thành Đại Việt.' },
      { h: 'Kháng chiến chống Tống' },
      { p: 'Lý Thường Kiệt chủ động \'tiên phát chế nhân\', sau đó lập phòng tuyến sông Như Nguyệt và đánh tan quân Tống năm 1077.' },
      { ul: [
        'Bài thơ Nam quốc sơn hà được coi là bản Tuyên ngôn độc lập đầu tiên.',
      ] },
      { h: 'Văn hoá - giáo dục' },
      { ul: [
        'Năm 1076 lập Quốc Tử Giám — trường đại học đầu tiên của nước ta.',
        'Phật giáo phát triển, chùa chiền được xây dựng (chùa Một Cột).',
      ] },
      { note: 'Việc dời đô về Thăng Long thể hiện tầm nhìn chiến lược: chọn vùng đồng bằng trù phú, trung tâm để phát triển lâu dài.' },
    ],
    examples: [
      { q: 'Phân tích ý nghĩa câu thơ \'Nam quốc sơn hà Nam đế cư\'.', a: '\'Sông núi nước Nam vua Nam ở\' khẳng định nước Nam là một quốc gia riêng, có vua, có lãnh thổ riêng đã được \'sách trời\' định sẵn. Đây là lời tuyên bố chủ quyền đanh thép, cổ vũ tinh thần quân dân chống Tống.' },
      { q: 'Vì sao chiến thuật của Lý Thường Kiệt được đánh giá cao?', a: 'Ông kết hợp tiến công phủ đầu sang đất Tống để phá thế chuẩn bị của giặc, rồi rút về lập phòng tuyến Như Nguyệt phòng thủ vững chắc, cuối cùng chủ động giảng hoà để giữ hoà bình — vừa cứng rắn vừa mềm dẻo.' },
    ],
  },

  'H10SU-w14-quiz': {
    topic: 'Nhà Trần (1225-1400)',
    intro: 'Nhà Trần ghi danh sử sách với ba lần đánh bại quân Mông - Nguyên, đội quân hùng mạnh nhất thế giới khi đó. Đây là đỉnh cao của hào khí Đông A.',
    objectives: [
      'Nêu sự thành lập nhà Trần.',
      'Trình bày ba lần kháng chiến chống Mông - Nguyên.',
      'Hiểu tinh thần đoàn kết toàn dân.',
    ],
    theory: [
      { h: 'Thành lập nhà Trần' },
      { p: 'Năm 1226, qua sự dàn xếp của Trần Thủ Độ, Trần Cảnh (Trần Thái Tông) lên ngôi, lập nhà Trần thay nhà Lý.' },
      { h: 'Ba lần chống Mông - Nguyên' },
      { ul: [
        'Lần 1 (1258), lần 2 (1285), lần 3 (1287-1288).',
        'Trận Bạch Đằng 1288: Trần Hưng Đạo tái dụng kế đóng cọc, tiêu diệt đoàn thuyền quân Nguyên.',
      ] },
      { h: 'Tinh thần và tác phẩm' },
      { ul: [
        'Hịch tướng sĩ của Trần Hưng Đạo khích lệ binh sĩ.',
        'Hội nghị Diên Hồng (1284): các bô lão đồng thanh \'đánh\'.',
        'Chữ Nôm phát triển mạnh.',
      ] },
      { note: 'Sức mạnh của nhà Trần là sự đoàn kết \'vua tôi đồng lòng, anh em hoà mục, cả nước góp sức\'.' },
    ],
    examples: [
      { q: 'Vì sao Hội nghị Diên Hồng được coi là biểu tượng của ý chí toàn dân?', a: 'Khi vua Trần hỏi nên \'đánh\' hay \'hoà\', các bô lão đại diện cho dân chúng đồng thanh hô \'đánh\'. Điều đó thể hiện sự đồng thuận giữa triều đình và nhân dân — nền tảng cho chiến thắng quân Nguyên.' },
      { q: 'Vì sao Trần Hưng Đạo lại tái sử dụng kế đóng cọc Bạch Đằng?', a: 'Địa hình sông Bạch Đằng với chế độ thuỷ triều thuận lợi cho cách đánh dùng cọc nhử thuyền. Ông kế thừa sáng tạo của Ngô Quyền, bố trí trận địa cọc và mai phục, biến thế mạnh thuỷ binh của giặc thành điểm yếu.' },
    ],
  },

  'H10SU-w15-quiz': {
    topic: 'Nhà Hồ và 20 năm Minh thuộc',
    intro: 'Cuối thế kỷ XIV, nhà Trần suy yếu. Hồ Quý Ly lên thay với những cải cách táo bạo, nhưng rồi đất nước lại rơi vào ách đô hộ của nhà Minh.',
    objectives: [
      'Nêu cải cách của Hồ Quý Ly.',
      'Trình bày nguyên nhân nhà Hồ thất bại.',
      'Hiểu chính sách đồng hoá của nhà Minh.',
    ],
    theory: [
      { h: 'Nhà Hồ' },
      { p: 'Năm 1400, Hồ Quý Ly phế nhà Trần, lập nhà Hồ, đổi quốc hiệu thành Đại Ngu. Ông tiến hành nhiều cải cách: phát hành tiền giấy, chính sách hạn điền (hạn chế ruộng tư), hạn nô (hạn chế số nô tỳ).' },
      { h: 'Nhà Hồ thất bại' },
      { p: 'Năm 1407, quân Minh xâm lược, đánh bại nhà Hồ. Một nguyên nhân quan trọng là nhà Hồ không được lòng dân, không tập hợp được sức mạnh toàn dân để kháng chiến.' },
      { h: 'Minh thuộc và khởi nghĩa' },
      { ul: [
        'Minh thuộc kéo dài 20 năm (1407-1427) với chính sách đồng hoá khắc nghiệt.',
        'Nhà Minh vơ vét của cải, phá huỷ sách vở, bắt theo phong tục Hán.',
        'Khởi nghĩa Lam Sơn (1418-1427) do Lê Lợi lãnh đạo đánh tan quân Minh.',
      ] },
      { note: 'Bài học lớn từ nhà Hồ: muốn giữ nước phải dựa vào dân — \'lấy dân làm gốc\'.' },
    ],
    examples: [
      { q: 'Cải cách của Hồ Quý Ly có điểm tiến bộ nào?', a: 'Hạn điền và hạn nô nhằm giảm thế lực quý tộc, chia ruộng và sức lao động đều hơn. Việc phát hành tiền giấy là ý tưởng táo bạo. Đó là những cải cách hướng tới củng cố quyền lực trung ương và tài chính nhà nước.' },
      { q: 'Vì sao Nguyễn Trãi viết \'lật thuyền mới biết sức dân như nước\'?', a: 'Câu này tổng kết bài học nhà Hồ: nhà Hồ mạnh về quân sự nhưng mất lòng dân nên nhanh chóng sụp đổ. Dân như nước có thể chở thuyền (nâng đỡ triều đại) mà cũng lật thuyền (lật đổ) — sức dân là yếu tố quyết định.' },
    ],
  },

  'H10SU-w16-quiz': {
    topic: 'Nhà Lê Sơ (1428-1527)',
    intro: 'Sau chiến thắng quân Minh, Lê Lợi lập nhà Lê Sơ. Đây là thời kỳ Đại Việt cường thịnh bậc nhất, đặc biệt dưới triều Lê Thánh Tông.',
    objectives: [
      'Nêu sự thành lập nhà Lê Sơ.',
      'Trình bày cải cách của Lê Thánh Tông.',
      'Hiểu giá trị bộ luật Hồng Đức.',
    ],
    theory: [
      { h: 'Thành lập' },
      { p: 'Năm 1428, sau thắng lợi của khởi nghĩa Lam Sơn, Lê Lợi lên ngôi (Lê Thái Tổ), khôi phục quốc hiệu Đại Việt, đóng đô ở Thăng Long (Đông Kinh).' },
      { h: 'Cải cách Lê Thánh Tông' },
      { ul: [
        'Năm 1471 chia cả nước thành 13 đạo thừa tuyên.',
        'Ban hành Quốc Triều Hình Luật (luật Hồng Đức).',
        'Đẩy mạnh khoa cử, lập bia tiến sĩ năm 1484.',
      ] },
      { h: 'Văn hoá - chính trị' },
      { p: 'Nho giáo trở thành tư tưởng chính thống. Bình Ngô Đại Cáo của Nguyễn Trãi là bản tuyên ngôn độc lập thứ hai, tổng kết cuộc kháng chiến.' },
      { note: 'Luật Hồng Đức tiến bộ ở chỗ có nhiều điều bảo vệ quyền lợi của phụ nữ và người yếu thế.' },
    ],
    examples: [
      { q: 'Vì sao bộ luật Hồng Đức được đánh giá là tiến bộ?', a: 'Bộ luật có những điều khoản bảo vệ phụ nữ (quyền thừa kế, quyền ly hôn trong một số trường hợp), bảo vệ người già, trẻ em, người tàn tật. So với pháp luật phong kiến cùng thời, đó là tư tưởng nhân văn đáng chú ý.' },
      { q: 'Phân tích giá trị mở đầu của Bình Ngô Đại Cáo: \'Việc nhân nghĩa cốt ở yên dân\'.', a: 'Câu mở đầu khẳng định mục tiêu của khởi nghĩa là vì dân, lo cho dân được yên ổn. Nguyễn Trãi đề cao tư tưởng nhân nghĩa và độc lập dân tộc, biến cuộc chiến thành cuộc chiến chính nghĩa vì nhân dân.' },
    ],
  },

  'H10SU-w17-quiz': {
    topic: 'Thời Lê - Mạc và Nam - Bắc triều',
    intro: 'Từ thế kỷ XVI, Đại Việt bước vào thời kỳ chia cắt và nội chiến kéo dài. Các em cần nắm các thế lực phong kiến và mốc quan trọng.',
    objectives: [
      'Nêu sự thành lập nhà Mạc.',
      'Trình bày cuộc chiến Nam - Bắc triều.',
      'Hiểu sự xuất hiện của hai họ Trịnh - Nguyễn.',
    ],
    theory: [
      { h: 'Nhà Mạc' },
      { p: 'Năm 1527, Mạc Đăng Dung cướp ngôi nhà Lê, lập nhà Mạc, đóng đô ở Thăng Long (gọi là Bắc triều).' },
      { h: 'Nam - Bắc triều' },
      { ul: [
        'Nguyễn Kim phù trì nhà Lê, lập Nam triều ở Thanh Hoá, đối đầu Bắc triều (Mạc).',
        'Chiến tranh Lê - Mạc kéo dài hơn 60 năm (1533-1592).',
        'Năm 1592, Trịnh Tùng chiếm Thăng Long, nhà Mạc rút lên Cao Bằng.',
      ] },
      { h: 'Trịnh - Nguyễn nổi lên' },
      { p: 'Sau khi diệt Mạc, vua Lê chỉ còn là bù nhìn, quyền lực thực tế ở Bắc Hà thuộc chúa Trịnh. Nguyễn Hoàng vào trấn thủ Thuận Hoá năm 1558, mở đầu dòng chúa Nguyễn ở phương Nam.' },
      { note: 'Nội chiến phong kiến làm đất nước chia cắt, đời sống nhân dân khổ cực — đây là mặt trái của thời kỳ này.' },
    ],
    examples: [
      { q: 'Vì sao xuất hiện cục diện \'vua Lê - chúa Trịnh\'?', a: 'Họ Trịnh có công diệt Mạc nên nắm binh quyền thực tế, nhưng để giữ chính danh thì vẫn duy trì vua Lê làm bù nhìn. Vua Lê trị vì trên danh nghĩa còn chúa Trịnh mới là người cai trị thực sự ở Đàng Ngoài.' },
      { q: 'Việc Nguyễn Hoàng xin vào trấn thủ Thuận Hoá năm 1558 có ý nghĩa gì về sau?', a: 'Đây là bước đi chiến lược để tránh sự nghi kỵ của họ Trịnh và xây dựng cơ nghiệp riêng. Từ vùng đất này, con cháu Nguyễn Hoàng dần lập nên thế lực chúa Nguyễn ở Đàng Trong, dẫn tới sự chia cắt Trịnh - Nguyễn.' },
    ],
  },

  'H10SU-w18-quiz': {
    topic: 'Ôn tập học kỳ 1',
    intro: 'Các em hãy hệ thống lại toàn bộ kiến thức học kỳ 1: từ Sử học, các nền văn minh thế giới đến tiến trình lịch sử Việt Nam từ Văn Lang đến thời Lê - Mạc.',
    objectives: [
      'Hệ thống hoá các nền văn minh cổ - trung đại.',
      'Nối kết các mốc lịch sử Việt Nam theo trình tự.',
      'Củng cố tên gọi quốc hiệu, kinh đô qua các triều.',
    ],
    theory: [
      { h: 'Văn minh thế giới' },
      { ul: [
        'Phương Đông: Ai Cập, Lưỡng Hà, Ấn Độ, Trung Hoa.',
        'Phương Tây: Hy Lạp (dân chủ, triết học), La Mã (pháp luật, kiến trúc).',
        'Đông Nam Á: Champa, Phù Nam, Khmer, Borobudur.',
      ] },
      { h: 'Tiến trình lịch sử Việt Nam' },
      { ul: [
        'Văn Lang - Âu Lạc: nhà nước đầu tiên, văn hoá Đông Sơn.',
        'Bắc thuộc hơn 1000 năm, kết thúc với Bạch Đằng 938.',
        'Ngô - Đinh - Tiền Lê - Lý - Trần - Hồ - Lê Sơ - Mạc.',
      ] },
      { h: 'Quốc hiệu qua các thời' },
      { p: 'Văn Lang → Âu Lạc → (Bắc thuộc) → Vạn Xuân → Đại Cồ Việt → Đại Việt (từ 1054) → Đại Ngu (Hồ) → Đại Việt (Lê Sơ).' },
      { note: 'Khi ôn tập, các em nên lập trục thời gian (timeline) để dễ ghi nhớ thứ tự các triều đại.' },
    ],
    examples: [
      { q: 'Sắp xếp các chiến thắng chống ngoại xâm tiêu biểu theo thứ tự thời gian.', a: 'Bạch Đằng 938 (Ngô Quyền, chống Nam Hán) → chống Tống 981 (Lê Hoàn) → Như Nguyệt 1077 (Lý Thường Kiệt, chống Tống) → ba lần chống Mông - Nguyên (1258, 1285, 1288, nhà Trần) → Lam Sơn 1427 (Lê Lợi, chống Minh).' },
      { q: 'So sánh điểm chung trong cách giữ nước của các triều Lý, Trần, Lê Sơ.', a: 'Cả ba triều đều biết dựa vào sức mạnh đoàn kết toàn dân, kết hợp xây dựng nhà nước vững mạnh với nghệ thuật quân sự sáng tạo. Đó là quy luật: muốn thắng ngoại xâm phải có chính nghĩa và sự ủng hộ của nhân dân.' },
    ],
  },

  'H10SU-w19-quiz': {
    topic: 'Đàng Trong - Đàng Ngoài',
    intro: 'Học kỳ 2 mở đầu với một đất nước bị chia cắt thành hai miền. Các em sẽ tìm hiểu ranh giới, các thế lực và cuộc khẩn hoang mở đất phương Nam.',
    objectives: [
      'Xác định ranh giới Đàng Trong - Đàng Ngoài.',
      'Nêu các thế lực cai quản hai miền.',
      'Hiểu công cuộc mở mang lãnh thổ phương Nam.',
    ],
    theory: [
      { h: 'Sự chia cắt' },
      { p: 'Sông Gianh (Quảng Bình) trở thành ranh giới chia cắt: Đàng Ngoài (từ sông Gianh ra Bắc) do vua Lê - chúa Trịnh; Đàng Trong (từ sông Gianh vào Nam) do chúa Nguyễn.' },
      { h: 'Chiến tranh Trịnh - Nguyễn' },
      { p: 'Hai họ đánh nhau bảy lần lớn từ 1627 đến 1672 nhưng không phân thắng bại, cuối cùng lấy sông Gianh làm giới tuyến.' },
      { h: 'Mở mang phương Nam' },
      { ul: [
        'Chúa Nguyễn tổ chức khai hoang, lập làng ở vùng đồng bằng sông Cửu Long.',
        'Lãnh thổ Đàng Trong mở rộng dần về phía Nam.',
        'Thiên Chúa giáo du nhập từ thế kỷ XVI qua các giáo sĩ phương Tây.',
      ] },
      { note: 'Dù chia cắt, công cuộc khẩn hoang phương Nam đã mở rộng đáng kể lãnh thổ và bản đồ Việt Nam.' },
    ],
    examples: [
      { q: 'Cuộc chiến Trịnh - Nguyễn để lại hậu quả gì cho dân tộc?', a: 'Cuộc nội chiến kéo dài làm đất nước bị chia cắt lâu dài, tàn phá kinh tế, gây đau khổ cho nhân dân hai miền. Nó cản trở sự thống nhất và phát triển chung của dân tộc.' },
      { q: 'Đánh giá vai trò tích cực của các chúa Nguyễn ở Đàng Trong.', a: 'Bên cạnh mặt chia cắt, các chúa Nguyễn có công lớn trong khai phá, mở mang vùng đất phương Nam, lập làng xóm ở đồng bằng sông Cửu Long, đặt nền móng cho lãnh thổ liền dải của Việt Nam ngày nay.' },
    ],
  },

  'H10SU-w20-quiz': {
    topic: 'Khởi nghĩa Tây Sơn (phần 1)',
    intro: 'Giữa lúc đất nước chia cắt, anh em Tây Sơn dấy binh từ Bình Định, mở ra phong trào nông dân lớn nhất lịch sử phong kiến Việt Nam.',
    objectives: [
      'Nêu nguyên nhân, lực lượng của khởi nghĩa Tây Sơn.',
      'Trình bày quá trình lật đổ các tập đoàn phong kiến.',
      'Hiểu chiến thắng Rạch Gầm - Xoài Mút.',
    ],
    theory: [
      { h: 'Bùng nổ khởi nghĩa' },
      { p: 'Năm 1771, ba anh em Nguyễn Nhạc, Nguyễn Huệ, Nguyễn Lữ dựng cờ khởi nghĩa ở ấp Tây Sơn (Bình Định), được nông dân hưởng ứng đông đảo.' },
      { h: 'Lật đổ các tập đoàn phong kiến' },
      { ul: [
        'Lật đổ chính quyền chúa Nguyễn ở Đàng Trong.',
        'Năm 1786, Nguyễn Huệ tiến ra Bắc tiêu diệt họ Trịnh.',
        'Từng bước xoá bỏ ranh giới chia cắt đất nước.',
      ] },
      { h: 'Chống ngoại xâm Xiêm' },
      { p: 'Năm 1785, Nguyễn Huệ đánh tan 5 vạn quân Xiêm trong trận Rạch Gầm - Xoài Mút trên sông Tiền.' },
      { note: 'Cuối năm 1788, Nguyễn Huệ lên ngôi, xưng Quang Trung Hoàng đế, chuẩn bị đánh quân Thanh.' },
    ],
    examples: [
      { q: 'Vì sao phong trào Tây Sơn được đông đảo nông dân ủng hộ?', a: 'Đất nước chia cắt, các tập đoàn phong kiến Trịnh - Nguyễn vơ vét, đời sống nông dân khốn khổ. Tây Sơn nêu khẩu hiệu \'lấy của nhà giàu chia cho dân nghèo\', đáp ứng nguyện vọng của nông dân nên được hưởng ứng mạnh.' },
      { q: 'Trận Rạch Gầm - Xoài Mút thể hiện tài năng quân sự của Nguyễn Huệ ra sao?', a: 'Ông chọn khúc sông hiểm, bố trí mai phục thuỷ - bộ, nhử quân Xiêm vào trận địa rồi đánh tan trong một trận. Đây là chiến thắng lớn của thuỷ quân, đập tan âm mưu can thiệp của Xiêm vào nước ta.' },
    ],
  },

  'H10SU-w21-quiz': {
    topic: 'Tây Sơn (phần 2) - Quang Trung đại phá quân Thanh',
    intro: 'Đỉnh cao của phong trào Tây Sơn là chiến thắng Ngọc Hồi - Đống Đa, một trong những chiến công hiển hách nhất trong lịch sử chống ngoại xâm của dân tộc.',
    objectives: [
      'Nêu nguyên nhân quân Thanh xâm lược.',
      'Trình bày cuộc hành quân thần tốc của Quang Trung.',
      'Hiểu ý nghĩa chiến thắng Ngọc Hồi - Đống Đa.',
    ],
    theory: [
      { h: 'Quân Thanh xâm lược' },
      { p: 'Lê Chiêu Thống cầu cứu nhà Thanh. Cuối năm 1788, Tôn Sĩ Nghị đem 29 vạn quân Thanh tiến vào chiếm Thăng Long.' },
      { h: 'Hành quân thần tốc' },
      { ul: [
        'Cuối 1788, Nguyễn Huệ lên ngôi Quang Trung rồi lập tức ra Bắc.',
        'Tổ chức hành quân thần tốc, vừa đi vừa tuyển quân.',
        'Tết Kỷ Dậu 1789, mở cuộc tổng tiến công.',
      ] },
      { h: 'Đại phá quân Thanh' },
      { p: 'Trong dịp Tết Kỷ Dậu 1789, Quang Trung đại phá 29 vạn quân Thanh tại Ngọc Hồi - Đống Đa, giải phóng Thăng Long chỉ trong mấy ngày.' },
      { note: 'Quang Trung mất đột ngột năm 1792; sau đó nội bộ Tây Sơn lục đục, suy yếu nhanh chóng.' },
    ],
    examples: [
      { q: 'Vì sao cuộc hành quân của Quang Trung được gọi là \'thần tốc\'?', a: 'Quân Tây Sơn vượt quãng đường rất dài từ Phú Xuân ra Bắc trong thời gian ngắn, vừa hành quân vừa tuyển thêm binh, tới Thăng Long đúng dịp giặc lơ là ăn Tết và đánh thắng chớp nhoáng. Tốc độ và bất ngờ là chìa khoá chiến thắng.' },
      { q: 'Chiến thắng Ngọc Hồi - Đống Đa năm 1789 có ý nghĩa gì?', a: 'Nó đập tan 29 vạn quân Thanh, bảo vệ vững chắc nền độc lập dân tộc, đánh bại âm mưu xâm lược của phong kiến phương Bắc. Đây là một trong những chiến công chống ngoại xâm vĩ đại nhất của lịch sử Việt Nam.' },
    ],
  },

  'H10SU-w22-quiz': {
    topic: 'Nhà Nguyễn (1802-1858) — Thiết lập',
    intro: 'Sau khi Tây Sơn suy yếu, Nguyễn Ánh lập nhà Nguyễn, triều đại phong kiến cuối cùng. Các em sẽ tìm hiểu việc tổ chức đất nước thống nhất từ Bắc tới Nam.',
    objectives: [
      'Nêu sự thành lập nhà Nguyễn.',
      'Trình bày tổ chức nhà nước, pháp luật.',
      'Hiểu chính sách đối ngoại bế quan toả cảng.',
    ],
    theory: [
      { h: 'Thành lập' },
      { p: 'Năm 1802, Nguyễn Ánh lên ngôi, xưng Gia Long, lập nhà Nguyễn, đóng đô ở Phú Xuân (Huế). Năm 1804 đặt quốc hiệu Việt Nam; thời Minh Mạng đổi thành Đại Nam.' },
      { h: 'Tổ chức nhà nước' },
      { ul: [
        'Ban hành Hoàng Việt luật lệ (luật Gia Long) năm 1815.',
        'Vua Minh Mạng cải cách hành chính, chia cả nước thành 30 tỉnh và phủ Thừa Thiên.',
        'Củng cố chế độ quân chủ tập quyền cao độ.',
      ] },
      { h: 'Đối ngoại' },
      { p: 'Nhà Nguyễn thực hiện chính sách bế quan toả cảng, hạn chế giao lưu với phương Tây, dẫn tới đất nước tụt hậu, lạc hậu về kỹ thuật.' },
      { note: 'Nhà Nguyễn quản lý một quốc gia thống nhất, rộng lớn nhưng lại đóng cửa nên bỏ lỡ cơ hội canh tân.' },
    ],
    examples: [
      { q: 'Cải cách hành chính của Minh Mạng có điểm tích cực nào?', a: 'Việc chia cả nước thành các tỉnh thống nhất giúp tăng cường quản lý của triều đình trung ương, xoá bỏ tình trạng cát cứ. Mô hình tỉnh này còn ảnh hưởng đến tổ chức hành chính Việt Nam đến tận ngày nay.' },
      { q: 'Phân tích hậu quả của chính sách bế quan toả cảng.', a: 'Đóng cửa với phương Tây khiến Việt Nam không tiếp thu được khoa học, kỹ thuật, vũ khí hiện đại. Khi thực dân phương Tây bành trướng, đất nước rơi vào thế lạc hậu, yếu kém, không đủ sức chống lại sự xâm lược.' },
    ],
  },

  'H10SU-w23-quiz': {
    topic: 'Văn minh Đại Việt - Tổng quan',
    intro: 'Từ tuần này, các em tìm hiểu nền văn minh Đại Việt — thành tựu rực rỡ của dân tộc trong thời kỳ độc lập, tự chủ kéo dài từ thế kỷ X đến thế kỷ XIX.',
    objectives: [
      'Nêu khái niệm và cơ sở hình thành văn minh Đại Việt.',
      'Kể các lĩnh vực thành tựu chính.',
      'Hiểu tư tưởng tam giáo đồng nguyên.',
    ],
    theory: [
      { h: 'Khái niệm' },
      { p: 'Văn minh Đại Việt là toàn bộ thành tựu vật chất và tinh thần của quốc gia Đại Việt trong thời kỳ độc lập, tự chủ (từ thế kỷ X đến giữa thế kỷ XIX).' },
      { h: 'Cơ sở hình thành' },
      { ul: [
        'Kế thừa nền văn minh Văn Lang - Âu Lạc.',
        'Tiếp thu có chọn lọc văn minh Trung Hoa, Ấn Độ và khu vực.',
        'Nền tảng độc lập, tự chủ lâu dài của dân tộc.',
      ] },
      { h: 'Các lĩnh vực thành tựu' },
      { p: 'Văn minh Đại Việt đạt thành tựu trên nhiều mặt: chính trị, kinh tế, tư tưởng - tôn giáo, giáo dục, văn học, nghệ thuật, khoa học - kỹ thuật.' },
      { note: 'Tư tưởng chủ đạo là tam giáo đồng nguyên — Nho, Phật, Đạo cùng tồn tại và bổ sung cho nhau.' },
    ],
    examples: [
      { q: 'Vì sao nói văn minh Đại Việt vừa kế thừa vừa tiếp thu sáng tạo?', a: 'Đại Việt giữ cốt lõi văn hoá bản địa từ thời Văn Lang - Âu Lạc (lúa nước, thờ tổ tiên), đồng thời tiếp thu Nho giáo, chữ Hán, Phật giáo nhưng bản địa hoá, biến thành của riêng — như chữ Nôm sáng tạo từ chữ Hán.' },
      { q: 'Tam giáo đồng nguyên thể hiện như thế nào trong đời sống Đại Việt?', a: 'Nhà nước dùng Nho giáo để tổ chức bộ máy, thi cử; người dân và vua chúa lại sùng Phật, xây chùa; Đạo giáo ảnh hưởng tới tín ngưỡng dân gian. Ba dòng tư tưởng cùng tồn tại hoà hợp, không bài xích nhau.' },
    ],
  },

  'H10SU-w24-quiz': {
    topic: 'Văn minh Đại Việt - Chính trị và pháp luật',
    intro: 'Các em sẽ tìm hiểu cách tổ chức bộ máy nhà nước và hệ thống pháp luật của Đại Việt — nền tảng cho sự ổn định và phát triển của quốc gia.',
    objectives: [
      'Nêu mô hình nhà nước quân chủ tập quyền.',
      'Trình bày sự phát triển của pháp luật.',
      'Hiểu nguyên tắc tổ chức quân đội.',
    ],
    theory: [
      { h: 'Mô hình nhà nước' },
      { p: 'Đại Việt theo mô hình quân chủ tập quyền: vua đứng đầu, nắm cả quyền hành pháp, lập pháp và tư pháp tối cao. Dưới vua là hệ thống quan lại từ trung ương tới địa phương.' },
      { h: 'Tổ chức địa phương' },
      { p: 'Thời Lý - Trần, địa phương chia ba cấp: lộ/phủ - huyện - xã. Thời Lê Thánh Tông chia cả nước thành 13 đạo thừa tuyên.' },
      { h: 'Pháp luật' },
      { ul: [
        'Hình thư (nhà Lý) — bộ luật thành văn đầu tiên (nay chỉ còn tên).',
        'Quốc Triều Hình Luật (Hồng Đức, Lê Sơ) — bộ luật tiến bộ.',
        'Hoàng Việt luật lệ (Gia Long, nhà Nguyễn).',
      ] },
      { h: 'Quân đội' },
      { p: 'Quân đội tổ chức theo chính sách \'ngụ binh ư nông\': khi không có chiến tranh thì binh lính về làm ruộng, vừa bảo đảm sản xuất vừa duy trì lực lượng dự bị.' },
      { note: 'Việc có pháp luật thành văn sớm cho thấy trình độ tổ chức nhà nước của Đại Việt khá cao.' },
    ],
    examples: [
      { q: 'Chính sách \'ngụ binh ư nông\' có lợi ích gì?', a: 'Nó giúp nhà nước vừa duy trì được lực lượng quân sự đông đảo khi cần, vừa không làm thiếu hụt nhân lực sản xuất nông nghiệp trong thời bình. Đây là cách tổ chức quân đội phù hợp với nền kinh tế nông nghiệp.' },
      { q: 'Vì sao sự phát triển của pháp luật phản ánh trình độ văn minh?', a: 'Từ Hình thư đến Hồng Đức rồi luật Gia Long cho thấy nhà nước Đại Việt ngày càng dùng pháp luật thành văn để quản lý xã hội thay cho tuỳ tiện. Một xã hội có luật pháp rõ ràng là biểu hiện của trình độ tổ chức văn minh.' },
    ],
  },

  'H10SU-w25-quiz': {
    topic: 'Văn minh Đại Việt - Kinh tế',
    intro: 'Nền kinh tế là gốc của mọi nền văn minh. Các em sẽ tìm hiểu nông nghiệp lúa nước, thủ công nghiệp và thương nghiệp của Đại Việt.',
    objectives: [
      'Nêu vai trò của nông nghiệp lúa nước.',
      'Kể các làng nghề thủ công nổi tiếng.',
      'Hiểu hoạt động thương nghiệp và tiền tệ.',
    ],
    theory: [
      { h: 'Nông nghiệp' },
      { p: 'Nông nghiệp lúa nước là kinh tế chủ đạo. Nhà nước khuyến nông, đắp đê, làm thuỷ lợi. Thời Lý - Trần có điền trang thái ấp; thời Lê Sơ thực hiện phép quân điền chia ruộng công.' },
      { h: 'Thủ công nghiệp' },
      { ul: [
        'Gốm Bát Tràng (Hà Nội).',
        'Lụa Hà Đông.',
        'Đúc đồng Đại Bái, rèn sắt, làm giấy, dệt vải.',
      ] },
      { h: 'Thương nghiệp' },
      { ul: [
        'Chợ làng, chợ vùng phát triển.',
        'Thương cảng lớn: Vân Đồn (Quảng Ninh), Phố Hiến (Hưng Yên), Hội An (Quảng Nam).',
        'Tiền đồng xuất hiện từ thời Đinh; Hồ Quý Ly phát hành tiền giấy đầu tiên.',
      ] },
      { note: 'Câu \'Thứ nhất Kinh Kỳ, thứ nhì Phố Hiến\' cho thấy sự sầm uất của các đô thị thương mại Đại Việt.' },
    ],
    examples: [
      { q: 'Vì sao thuỷ lợi và đê điều quan trọng với nông nghiệp Đại Việt?', a: 'Nền nông nghiệp lúa nước phụ thuộc vào nước. Hệ thống đê điều chống lũ sông Hồng, kênh mương tưới tiêu giúp ổn định mùa màng. Vì thế các triều đại đều coi trọng trị thuỷ, lập cơ quan quản lý đê (Hà đê sứ thời Trần).' },
      { q: 'Sự ra đời của tiền giấy thời Hồ Quý Ly có ý nghĩa gì?', a: 'Đây là lần đầu tiên Việt Nam phát hành tiền giấy, một ý tưởng tài chính táo bạo và sớm. Tuy nhiên do không được dân tin dùng và hoàn cảnh rối ren nên chưa thành công, nhưng cho thấy tư duy cải cách tiền tệ tiến bộ.' },
    ],
  },

  'H10SU-w26-quiz': {
    topic: 'Văn minh Đại Việt - Giáo dục và khoa cử',
    intro: 'Truyền thống hiếu học của dân tộc gắn liền với nền giáo dục và khoa cử Đại Việt. Các em sẽ hiểu Quốc Tử Giám và con đường thi cử ngày xưa.',
    objectives: [
      'Nêu sự ra đời của giáo dục Nho học.',
      'Trình bày hệ thống khoa cử ba cấp.',
      'Hiểu giá trị của Văn Miếu và bia tiến sĩ.',
    ],
    theory: [
      { h: 'Buổi đầu giáo dục' },
      { ul: [
        'Năm 1070, nhà Lý lập Văn Miếu thờ Khổng Tử.',
        'Năm 1075, khoa thi Nho học đầu tiên được tổ chức.',
        'Năm 1076, lập Quốc Tử Giám — trường đại học đầu tiên.',
      ] },
      { h: 'Hệ thống khoa cử' },
      { p: 'Khoa cử gồm ba cấp: thi Hương (ở địa phương) → thi Hội (ở kinh đô) → thi Đình (do vua chủ trì). Người đỗ đầu thi Đình là Trạng nguyên.' },
      { h: 'Văn Miếu - Quốc Tử Giám' },
      { p: 'Tại Hà Nội ngày nay, Văn Miếu - Quốc Tử Giám là biểu tượng của nền giáo dục Đại Việt. Năm 1484, Lê Thánh Tông cho dựng bia tiến sĩ khắc tên người đỗ.' },
      { note: 'Bia tiến sĩ nhằm nêu gương, khuyến khích việc học, thể hiện truyền thống \'tôn sư trọng đạo\'.' },
    ],
    examples: [
      { q: 'Vì sao việc lập Quốc Tử Giám có ý nghĩa lớn?', a: 'Quốc Tử Giám là trường đại học đầu tiên, đào tạo nhân tài cho đất nước. Nó đánh dấu nhà nước Đại Việt chính thức coi trọng giáo dục, dùng học vấn và thi cử để tuyển chọn quan lại, xây dựng đội ngũ trí thức.' },
      { q: 'Hệ thống khoa cử ba cấp đem lại điều gì cho xã hội?', a: 'Khoa cử mở đường tiến thân cho mọi tầng lớp dựa vào học hành, tạo cơ hội cho cả con nhà thường dân đỗ đạt làm quan. Nó khuyến khích việc học, hình thành truyền thống hiếu học và đề cao tri thức trong xã hội Đại Việt.' },
    ],
  },

  'H10SU-w27-quiz': {
    topic: 'Văn minh Đại Việt - Văn học và nghệ thuật',
    intro: 'Văn học và nghệ thuật là tâm hồn của một dân tộc. Các em sẽ gặp những kiệt tác và loại hình nghệ thuật làm nên bản sắc Việt.',
    objectives: [
      'Nêu sự phát triển của văn học chữ Hán và chữ Nôm.',
      'Kể các tác gia, tác phẩm tiêu biểu.',
      'Hiểu các loại hình kiến trúc và nghệ thuật biểu diễn.',
    ],
    theory: [
      { h: 'Văn học' },
      { ul: [
        'Văn học chữ Hán: chính thống, dùng trong khoa cử, sáng tác của Nguyễn Trãi, Lê Văn Hưu.',
        'Văn học chữ Nôm: Truyện Kiều của Nguyễn Du, thơ Hồ Xuân Hương — \'Bà chúa thơ Nôm\'.',
      ] },
      { h: 'Sử học' },
      { p: 'Lê Văn Hưu viết Đại Việt sử ký; Ngô Sĩ Liên biên soạn Đại Việt sử ký toàn thư — những bộ chính sử quan trọng.' },
      { h: 'Kiến trúc - nghệ thuật' },
      { ul: [
        'Chùa Một Cột (Lý), Tháp Phổ Minh (Trần), Văn Miếu.',
        'Nghệ thuật biểu diễn dân gian: chèo, tuồng, ca trù, quan họ, hát xẩm.',
      ] },
      { note: 'Sự ra đời và phát triển của chữ Nôm thể hiện ý thức dân tộc, mong muốn có chữ viết riêng cho tiếng Việt.' },
    ],
    examples: [
      { q: 'Vì sao Truyện Kiều được coi là kiệt tác của văn học dân tộc?', a: 'Nguyễn Du dùng chữ Nôm và thể thơ lục bát thuần Việt để viết một câu chuyện giàu giá trị nhân đạo, ngôn ngữ điêu luyện, phản ánh số phận con người và xã hội. Truyện Kiều đạt đỉnh cao nghệ thuật và đi sâu vào đời sống tinh thần người Việt.' },
      { q: 'Việc sáng tác bằng chữ Nôm nói lên điều gì về ý thức dân tộc?', a: 'Chữ Nôm được sáng tạo trên cơ sở chữ Hán để ghi tiếng Việt. Việc dùng chữ Nôm sáng tác cho thấy người Việt muốn khẳng định bản sắc ngôn ngữ riêng, không lệ thuộc hoàn toàn vào chữ Hán — một biểu hiện của lòng tự tôn dân tộc.' },
    ],
  },

  'H10SU-w28-quiz': {
    topic: 'Văn minh Đại Việt - Khoa học kỹ thuật',
    intro: 'Cha ông ta không chỉ giỏi văn chương mà còn có nhiều thành tựu khoa học, đặc biệt trong y học và sử học. Các em hãy ghi nhớ những nhà bác học tiêu biểu.',
    objectives: [
      'Kể các thành tựu y học cổ truyền.',
      'Nêu các nhà bác học và tác phẩm lớn.',
      'Hiểu giá trị của các bộ sử, địa chí.',
    ],
    theory: [
      { h: 'Y học' },
      { ul: [
        'Tuệ Tĩnh (TK XIV): tổ ngành y học cổ truyền, đề cao thuốc Nam \'Nam dược trị Nam nhân\'.',
        'Hải Thượng Lãn Ông Lê Hữu Trác: bộ Hải Thượng y tông tâm lĩnh đồ sộ.',
      ] },
      { h: 'Sử học và địa lý' },
      { ul: [
        'Lê Quý Đôn: nhà bác học lớn thời Lê - Trịnh, tác phẩm Phủ Biên tạp lục.',
        'Đại Nam thực lục và Đại Nam nhất thống chí do Quốc sử quán triều Nguyễn biên soạn.',
      ] },
      { h: 'Kỹ thuật' },
      { p: 'Thời Tây Sơn và Nguyễn đã chú ý đúc súng, đóng thuyền chiến; kỹ thuật xây thành (thành Huế) đạt trình độ cao.' },
      { note: 'Quan điểm \'Nam dược trị Nam nhân\' của Tuệ Tĩnh thể hiện tinh thần độc lập, dựa vào nguồn dược liệu trong nước.' },
    ],
    examples: [
      { q: 'Vì sao Hải Thượng Lãn Ông được tôn vinh trong y học Việt Nam?', a: 'Ông để lại bộ Hải Thượng y tông tâm lĩnh tổng kết kinh nghiệm y học, đề cao y đức và phương pháp chữa bệnh dựa trên dược liệu trong nước. Ông là một danh y mẫu mực cả về tài năng lẫn đạo đức.' },
      { q: 'Các bộ sử như Đại Việt sử ký toàn thư có giá trị gì với hậu thế?', a: 'Chúng ghi chép có hệ thống lịch sử dân tộc qua các triều đại, là nguồn sử liệu quý để các nhà nghiên cứu sau này dựng lại quá khứ. Việc biên soạn quốc sử còn thể hiện ý thức về cội nguồn và chủ quyền dân tộc.' },
    ],
  },

  'H10SU-w29-quiz': {
    topic: 'Văn minh Đại Việt - Tôn giáo và tín ngưỡng',
    intro: 'Đời sống tâm linh phong phú là một phần quan trọng của văn minh Đại Việt. Các em sẽ tìm hiểu tam giáo và những tín ngưỡng dân gian đặc sắc.',
    objectives: [
      'Nêu vai trò của Nho - Phật - Đạo qua các thời.',
      'Trình bày các tín ngưỡng dân gian.',
      'Hiểu giá trị di sản thờ Hùng Vương.',
    ],
    theory: [
      { h: 'Tam giáo' },
      { ul: [
        'Phật giáo: phát triển rực rỡ, gần như quốc giáo thời Lý - Trần.',
        'Nho giáo: lên ngôi tư tưởng chính thống từ thời Lê Sơ.',
        'Đạo giáo (Lão giáo): hoà vào tín ngưỡng dân gian.',
      ] },
      { h: 'Tôn giáo du nhập' },
      { p: 'Thiên Chúa giáo theo các giáo sĩ phương Tây (Bồ Đào Nha, Pháp) du nhập vào Việt Nam từ thế kỷ XVI.' },
      { h: 'Tín ngưỡng dân gian' },
      { ul: [
        'Thờ cúng tổ tiên.',
        'Thờ Mẫu (tín ngưỡng thờ Mẫu Tam phủ).',
        'Thờ thành hoàng làng, thờ các vị anh hùng dân tộc.',
      ] },
      { note: 'Năm 2012, UNESCO công nhận Tín ngưỡng thờ cúng Hùng Vương là di sản văn hoá phi vật thể của nhân loại.' },
    ],
    examples: [
      { q: 'Vì sao Phật giáo phát triển rực rỡ thời Lý - Trần?', a: 'Các vua Lý - Trần sùng đạo Phật, nhiều vua xuất gia, cho xây chùa khắp nơi. Phật giáo với tư tưởng từ bi, khoan dung phù hợp với buổi đầu dựng nước, giúp đoàn kết nhân tâm, vì thế gần như trở thành quốc giáo.' },
      { q: 'Tín ngưỡng thờ cúng tổ tiên phản ánh giá trị gì của người Việt?', a: 'Thờ cúng tổ tiên thể hiện đạo lý \'uống nước nhớ nguồn\', lòng biết ơn ông bà cha mẹ và ý thức về dòng họ, cội nguồn. Đây là nét đẹp văn hoá bền vững, gắn kết các thế hệ trong gia đình và cộng đồng.' },
    ],
  },

  'H10SU-w30-quiz': {
    topic: 'Việt Nam đầu TK XIX trước khi Pháp xâm lược',
    intro: 'Trước khi thực dân Pháp nổ súng, Việt Nam là một quốc gia thống nhất nhưng đang tụt hậu. Các em cần hiểu bối cảnh để thấy nguy cơ mất nước.',
    objectives: [
      'Nêu tình hình đất nước đầu thế kỷ XIX.',
      'Phân tích nguyên nhân tụt hậu.',
      'Hiểu các đề nghị canh tân không được chấp nhận.',
    ],
    theory: [
      { h: 'Một quốc gia thống nhất' },
      { p: 'Sau khi Gia Long thống nhất năm 1802, Việt Nam là quốc gia liền dải từ Lạng Sơn đến Cà Mau, lãnh thổ gần với hình dạng ngày nay.' },
      { h: 'Tình hình kinh tế - xã hội' },
      { ul: [
        'Kinh tế nông nghiệp tự cấp, kỹ thuật lạc hậu so với phương Tây.',
        'Chính sách bế quan toả cảng làm đất nước cô lập, tụt hậu.',
        'Mâu thuẫn xã hội gay gắt, nhiều cuộc khởi nghĩa nông dân.',
      ] },
      { h: 'Đề nghị canh tân' },
      { p: 'Nguyễn Trường Tộ và một số trí thức dâng nhiều bản điều trần đề nghị mở cửa, cải cách, nhưng triều đình bảo thủ không chấp nhận.' },
      { note: 'Ngày 1/9/1858, liên quân Pháp - Tây Ban Nha nổ súng tấn công Đà Nẵng, mở đầu cuộc xâm lược Việt Nam.' },
    ],
    examples: [
      { q: 'Vì sao việc triều Nguyễn từ chối canh tân để lại hậu quả nghiêm trọng?', a: 'Trong khi phương Tây phát triển công nghiệp, vũ khí hiện đại thì triều Nguyễn vẫn bảo thủ, đóng cửa. Bỏ lỡ canh tân khiến đất nước không đủ sức mạnh kinh tế, quân sự, dẫn đến thất bại trước cuộc xâm lược của Pháp.' },
      { q: 'So sánh sơ lược con đường của Việt Nam và Nhật Bản giữa thế kỷ XIX.', a: 'Nhật Bản tiến hành Minh Trị Duy tân, mở cửa và canh tân mạnh mẽ nên trở nên hùng cường. Việt Nam thì bảo thủ, từ chối cải cách nên tụt hậu và mất nước. Đây là bài học về tầm quan trọng của việc dám thay đổi, hội nhập.' },
    ],
  },

  'H10SU-w31-quiz': {
    topic: 'Văn minh thế giới TK XV-XVIII',
    intro: 'Quay lại bức tranh thế giới, các em sẽ thấy châu Âu bước vào thời kỳ chuyển mình với Phục Hưng, cải cách tôn giáo và các phát kiến địa lý.',
    objectives: [
      'Nêu nội dung phong trào Phục Hưng.',
      'Trình bày cải cách tôn giáo và phát kiến địa lý.',
      'Hiểu cách mạng khoa học và cách mạng tư sản đầu tiên.',
    ],
    theory: [
      { h: 'Phong trào Phục Hưng' },
      { p: 'Phục Hưng (Renaissance, TK XIV-XVI) khôi phục giá trị văn hoá Hy Lạp - La Mã, đề cao con người và lý trí. Tiêu biểu: Leonardo da Vinci, Michelangelo, Raphael.' },
      { h: 'Cải cách tôn giáo' },
      { p: 'Năm 1517, Martin Luther công bố 95 luận đề, mở đầu phong trào Kháng Cách (Tin Lành), chống lại sự lũng đoạn của Giáo hội.' },
      { h: 'Phát kiến địa lý' },
      { ul: [
        'Columbus tìm ra châu Mỹ (1492).',
        'Vasco da Gama tới Ấn Độ qua mũi Hảo Vọng.',
        'Magellan thực hiện chuyến đi vòng quanh thế giới (1519-1522).',
      ] },
      { h: 'Cách mạng khoa học' },
      { p: 'Copernicus nêu thuyết nhật tâm, Galileo dùng kính viễn vọng, Newton xây dựng cơ học cổ điển. Cách mạng tư sản Hà Lan (cuối TK XVI) là cách mạng tư sản đầu tiên.' },
      { note: 'Phục Hưng và các phát kiến địa lý mở đường cho châu Âu bước sang thời cận đại và mở rộng ra thế giới.' },
    ],
    examples: [
      { q: 'Vì sao phong trào Phục Hưng được coi là bước ngoặt tư tưởng?', a: 'Phục Hưng đề cao con người, lý trí và khoa học thay vì lệ thuộc giáo lý nhà thờ thời Trung cổ. Nó giải phóng tư tưởng, thúc đẩy văn học, nghệ thuật, khoa học phát triển, đặt nền cho thời cận đại châu Âu.' },
      { q: 'Các phát kiến địa lý đem lại hệ quả gì?', a: 'Chúng mở rộng hiểu biết về thế giới, thúc đẩy thương mại toàn cầu và sự ra đời của chủ nghĩa tư bản. Tuy nhiên cũng mở đầu cho quá trình thực dân hoá, cướp bóc thuộc địa và buôn bán nô lệ — mặt trái của thời đại.' },
    ],
  },

  'H10SU-w32-quiz': {
    topic: 'Cách mạng tư sản TK XVII-XVIII',
    intro: 'Các cuộc cách mạng tư sản đã làm thay đổi thế giới, lật đổ chế độ phong kiến và mở ra thời đại mới. Các em hãy ghi nhớ ba cuộc cách mạng lớn.',
    objectives: [
      'Nêu các cuộc cách mạng tư sản Anh, Mỹ, Pháp.',
      'Trình bày các văn kiện và khẩu hiệu nổi bật.',
      'Hiểu ý nghĩa của cách mạng tư sản.',
    ],
    theory: [
      { h: 'Cách mạng tư sản Anh' },
      { p: 'Nổ ra 1642-1689, kết thúc với \'Cách mạng Vinh Quang\' 1688, lập chế độ quân chủ lập hiến — vua trị vì nhưng quyền lực thuộc Nghị viện.' },
      { h: 'Chiến tranh giành độc lập Bắc Mỹ' },
      { ul: [
        '13 bang thuộc địa giành độc lập từ Anh (1775-1783).',
        'Tuyên ngôn độc lập (4/7/1776) do Thomas Jefferson soạn chính.',
        'Thành lập Hợp chúng quốc Hoa Kỳ.',
      ] },
      { h: 'Cách mạng tư sản Pháp' },
      { ul: [
        'Bùng nổ ngày 14/7/1789 với việc phá ngục Bastille.',
        'Khẩu hiệu \'Tự do - Bình đẳng - Bác ái\'.',
        'Tuyên ngôn Nhân quyền và Dân quyền (26/8/1789).',
      ] },
      { note: 'Các cuộc cách mạng tư sản lật đổ chế độ phong kiến, mở đường cho chủ nghĩa tư bản phát triển.' },
    ],
    examples: [
      { q: 'Vì sao cách mạng tư sản Pháp được coi là triệt để nhất?', a: 'Cách mạng Pháp lật đổ hẳn chế độ quân chủ chuyên chế, xử tử nhà vua, xoá bỏ đặc quyền phong kiến và nêu cao các quyền tự do, bình đẳng. Nó lan toả tư tưởng dân chủ, ảnh hưởng mạnh đến phong trào cách mạng trên thế giới.' },
      { q: 'Tuyên ngôn độc lập Mỹ và Tuyên ngôn Nhân quyền Pháp có giá trị gì lâu dài?', a: 'Cả hai khẳng định các quyền con người: quyền sống, quyền tự do, mưu cầu hạnh phúc, bình đẳng. Những tư tưởng này về sau được nhiều dân tộc, trong đó có Việt Nam, vận dụng trong các bản tuyên ngôn độc lập của mình.' },
    ],
  },

  'H10SU-w33-quiz': {
    topic: 'Cách mạng công nghiệp',
    intro: 'Cách mạng công nghiệp đã thay đổi căn bản cách con người sản xuất và sinh sống. Các em sẽ tìm hiểu các phát minh và hệ quả của nó.',
    objectives: [
      'Nêu thời gian, địa điểm khởi đầu cách mạng công nghiệp.',
      'Kể các phát minh tiêu biểu.',
      'Phân tích hệ quả tích cực và tiêu cực.',
    ],
    theory: [
      { h: 'Cách mạng công nghiệp lần thứ nhất' },
      { p: 'Bắt đầu ở Anh cuối thế kỷ XVIII, gắn với động cơ hơi nước. James Watt cải tiến máy hơi nước (1769), mở ra thời đại cơ khí hoá.' },
      { h: 'Các phát minh tiêu biểu' },
      { ul: [
        'Máy kéo sợi, máy dệt (Hargreaves, Arkwright).',
        'Máy hơi nước (James Watt).',
        'Đầu máy xe lửa (Stephenson).',
      ] },
      { h: 'Cách mạng công nghiệp lần thứ hai' },
      { p: 'Cuối TK XIX - đầu TK XX, dựa trên điện và động cơ đốt trong: bóng đèn điện (Edison), dây chuyền sản xuất (Ford).' },
      { h: 'Hệ quả' },
      { ul: [
        'Tích cực: tăng năng suất, đô thị hoá, hình thành giai cấp công nhân.',
        'Tiêu cực: bóc lột lao động (kể cả trẻ em, phụ nữ), ô nhiễm môi trường.',
      ] },
      { note: 'Cách mạng công nghiệp khiến phương Tây vượt lên, đồng thời thúc đẩy họ đi tìm thuộc địa — liên quan đến số phận Việt Nam sau này.' },
    ],
    examples: [
      { q: 'Vì sao máy hơi nước được coi là phát minh then chốt?', a: 'Máy hơi nước cung cấp nguồn động lực mạnh, không phụ thuộc sức nước hay sức người, có thể đặt ở bất cứ đâu. Nó được dùng cho máy dệt, tàu thuỷ, xe lửa, làm bùng nổ sản xuất công nghiệp và giao thông.' },
      { q: 'Cách mạng công nghiệp tác động thế nào đến các nước phương Đông?', a: 'Các nước tư bản phương Tây với nền công nghiệp mạnh tìm kiếm thị trường, nguyên liệu nên đẩy mạnh xâm chiếm thuộc địa ở phương Đông. Nhiều nước châu Á, châu Phi, trong đó có Việt Nam, trở thành thuộc địa hoặc bị lệ thuộc.' },
    ],
  },

  'H10SU-w34-quiz': {
    topic: 'Sử học và đời sống hiện đại',
    intro: 'Khép lại chương trình, các em sẽ thấy Sử học không xa rời cuộc sống mà gắn bó với việc bảo tồn di sản, phát triển du lịch và giáo dục công dân hôm nay.',
    objectives: [
      'Nêu vai trò của Sử học trong đời sống hiện đại.',
      'Hiểu giá trị của di sản và bảo tàng.',
      'Thấy được trách nhiệm của bản thân với di sản.',
    ],
    theory: [
      { h: 'Vai trò của Sử học hôm nay' },
      { p: 'Sử học góp phần giáo dục công dân, bồi đắp lòng yêu nước, bảo tồn di sản và phát triển công nghiệp văn hoá, du lịch.' },
      { h: 'Di sản văn hoá' },
      { ul: [
        'Việt Nam có nhiều di sản UNESCO: Vịnh Hạ Long, Phong Nha - Kẻ Bàng, Cố đô Huế, phố cổ Hội An, thánh địa Mỹ Sơn.',
        'Bảo tàng có chức năng sưu tầm, bảo quản, trưng bày và giáo dục về di sản.',
      ] },
      { h: 'Sử học và công nghệ' },
      { p: 'Sử học hiện đại ứng dụng số hoá tư liệu, trí tuệ nhân tạo (AI), hệ thống thông tin địa lý (GIS) để nghiên cứu và phục dựng quá khứ.' },
      { note: 'Du lịch lịch sử - văn hoá vừa tạo giá trị kinh tế vừa thúc đẩy việc bảo tồn di sản cho mai sau.' },
    ],
    examples: [
      { q: 'Nêu một việc cụ thể học sinh có thể làm để bảo vệ di sản.', a: 'Các em có thể giữ gìn vệ sinh khi tham quan di tích, không khắc vẽ lên hiện vật, tìm hiểu và giới thiệu di sản quê hương cho bạn bè, tham gia các hoạt động bảo tồn ở địa phương. Những việc nhỏ ấy góp phần gìn giữ di sản.' },
      { q: 'Vì sao nói du lịch và bảo tồn di sản có quan hệ hai chiều?', a: 'Du lịch văn hoá đem lại nguồn thu để tu bổ, bảo vệ di tích; ngược lại di sản được bảo tồn tốt sẽ thu hút khách du lịch. Tuy nhiên cần khai thác có chừng mực để tránh làm xuống cấp di sản — phát triển phải đi đôi với bảo tồn.' },
    ],
  },

  'H10SU-w35-quiz': {
    topic: 'Ôn tập cuối năm',
    intro: 'Tuần cuối cùng, các em hãy hệ thống lại toàn bộ chương trình Lịch sử 10: từ các nền văn minh thế giới đến tiến trình lịch sử dân tộc và những bài học còn nguyên giá trị.',
    objectives: [
      'Tổng hợp thành tựu các nền văn minh lớn.',
      'Hệ thống các mốc son chống ngoại xâm của dân tộc.',
      'Rút ra bài học lịch sử cho hiện tại.',
    ],
    theory: [
      { h: 'Văn minh thế giới' },
      { ul: [
        'Hy Lạp: dân chủ Athens, triết học Socrates - Plato - Aristotle.',
        'Trung Hoa: tứ đại phát minh (giấy, in, la bàn, thuốc súng).',
        'Châu Âu cận đại: Phục Hưng, cách mạng tư sản, cách mạng công nghiệp.',
      ] },
      { h: 'Lịch sử dân tộc' },
      { ul: [
        'Bạch Đằng 938 (Ngô Quyền) chấm dứt Bắc thuộc.',
        'Quốc hiệu Đại Việt từ thời Lý (1054).',
        'Quang Trung đại phá quân Thanh năm 1789.',
      ] },
      { h: 'Bài học lịch sử' },
      { p: 'Đoàn kết toàn dân, dựa vào dân, kết hợp giữ gìn bản sắc với tiếp thu tiến bộ là những bài học xuyên suốt lịch sử dân tộc.' },
      { note: 'Khi ôn tập, các em hãy nối các sự kiện thành một dòng chảy liên tục để hiểu vì sao lịch sử diễn ra như thế.' },
    ],
    examples: [
      { q: 'Rút ra bài học chung từ các cuộc kháng chiến chống ngoại xâm của dân tộc.', a: 'Các cuộc kháng chiến thắng lợi đều dựa vào tinh thần đoàn kết toàn dân, lòng yêu nước, sự lãnh đạo tài giỏi và nghệ thuật quân sự lấy ít địch nhiều, lấy chính nghĩa thắng bạo tàn. Đó là truyền thống quý báu của dân tộc.' },
      { q: 'Từ việc nhà Nguyễn bế quan toả cảng, em rút ra bài học gì cho hôm nay?', a: 'Bài học là phải chủ động mở cửa, hội nhập, tiếp thu khoa học - công nghệ tiên tiến của thế giới, không bảo thủ đóng kín. Đồng thời vẫn giữ vững độc lập, tự chủ và bản sắc dân tộc trong quá trình hội nhập.' },
    ],
  },

  'H10SU-w36-quiz': {
    topic: 'Kết thúc Lịch Sử 10 — Thế giới và Việt Nam qua lăng kính lịch sử',
    intro: 'Lịch Sử 10 đưa em qua những trang sử vĩ đại của nhân loại và dân tộc — từ các nền văn minh cổ đại đến thế giới cận đại và quá trình đấu tranh giành độc lập của Việt Nam. Hôm nay chúng ta nhìn lại hành trình đó và chuẩn bị cho lớp 11.',
    objectives: [
      'Hệ thống hoá các giai đoạn lịch sử thế giới và Việt Nam đã học trong năm.',
      'Nhận ra mối liên hệ nhân quả giữa các sự kiện lịch sử để hiểu "vì sao" hơn là "cái gì".',
      'Chuẩn bị tư duy phân tích lịch sử cần thiết cho chương trình lớp 11.',
    ],
    theory: [
      { h: 'Bức tranh toàn cảnh Lịch Sử 10' },
      { ul: [
        'Các nền văn minh cổ đại: Lưỡng Hà, Ai Cập, Hy Lạp, La Mã, Trung Hoa, Ấn Độ — cội nguồn văn minh nhân loại.',
        'Lịch sử trung đại thế giới: chế độ phong kiến châu Âu và châu Á, các đế quốc, tôn giáo lớn.',
        'Lịch sử Việt Nam: từ thời Văn Lang–Âu Lạc đến thời Lý–Trần–Lê Sơ và các cuộc kháng chiến chống ngoại xâm.',
        'Thời cận đại: Cách mạng Tư sản Pháp, Công nghiệp hoá, chủ nghĩa thực dân và phong trào đấu tranh giải phóng.',
      ] },
      { h: 'Hành trang sang Lịch Sử 11' },
      { ul: [
        'Thế giới cận đại → Thế giới hiện đại: từ Chiến tranh Thế giới I đến phong trào giải phóng dân tộc ở châu Á-Phi.',
        'Việt Nam dưới thực dân Pháp → Phong trào yêu nước đầu thế kỉ XX: Phan Bội Châu, Phan Châu Trinh.',
        'Cách mạng tháng Mười Nga (1917) và ảnh hưởng đến phong trào cộng sản thế giới và Việt Nam.',
        'Tư duy lịch sử: so sánh sự kiện, phân tích nguyên nhân–kết quả, đánh giá nhân vật lịch sử.',
      ] },
      { h: 'Cách học Sử hiệu quả hơn' },
      { ul: [
        'Lập timeline: vẽ trục thời gian với các sự kiện quan trọng — nhớ bối cảnh tốt hơn học thuộc lòng ngày tháng.',
        'Hỏi "Tại sao?": mỗi sự kiện đều có nguyên nhân và hệ quả — hiểu chuỗi nhân quả là học Sử giỏi.',
        'Đọc thêm truyện lịch sử hoặc xem phim tài liệu — tạo hình ảnh sống động trong đầu.',
      ] },
      { note: 'Lịch sử không phải là danh sách ngày tháng và tên người cần học thuộc. Lịch sử là câu chuyện của con người — em hiểu con người, em sẽ hiểu lịch sử.' },
    ],
    examples: [
      { q: 'Tại sao việc học lịch sử thế giới ở lớp 10 lại quan trọng để hiểu lịch sử Việt Nam lớp 11?', a: 'Lịch sử Việt Nam không xảy ra trong chân không — nó luôn chịu tác động của bối cảnh thế giới. Ví dụ: Cách mạng Tư sản Pháp (1789) lan rộng tư tưởng tự do-bình đẳng ảnh hưởng đến phong trào yêu nước VN thế kỉ XIX; Cách mạng Tháng Mười Nga (1917) mở ra con đường cách mạng vô sản cho Nguyễn Ái Quốc. Không hiểu thế giới, ta không giải thích được nhiều sự kiện trong nước.' },
      { q: 'Điểm gì ở chương trình Lịch Sử 10 sẽ xuất hiện lại nhiều nhất trong đề thi lớp 11 và lớp 12?', a: 'Hai điểm hay xuất hiện lại: (1) Bối cảnh thực dân Pháp xâm lược và chính sách khai thác thuộc địa — nền tảng để hiểu phong trào yêu nước và cách mạng VN; (2) Các nền văn minh và xu hướng lịch sử thế giới cổ-trung đại — thường xuất hiện trong câu phân tích "hội nhập và bản sắc" hoặc so sánh các nền văn minh. Dành thời gian nắm vững hai phần này sẽ có lợi dài hạn.' },
    ],
  },
};
