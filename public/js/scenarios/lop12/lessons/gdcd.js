// ============================================================
// Lớp 12 · GIÁO DỤC KINH TẾ VÀ PHÁP LUẬT (GDCD) — Lý thuyết theo tuần (35 tuần)
// Key TRÙNG id quiz: 'H12GDCD-wNN-quiz'.
// Bám CTGD 2018 (GD Kinh tế và Pháp luật 12) + định hướng ôn thi tốt nghiệp THPT:
//  - HK1 (tuần 1–18) KINH TẾ: tăng trưởng – phát triển kinh tế, hội nhập kinh tế
//    quốc tế, bảo hiểm, an sinh xã hội, lập kế hoạch kinh doanh, trách nhiệm xã hội
//    của doanh nghiệp, quản lí thu chi gia đình.
//  - HK2 (tuần 19–35) PHÁP LUẬT: quyền – nghĩa vụ về kinh doanh, nộp thuế, sở hữu
//    tài sản, hôn nhân – gia đình, học tập, chăm sóc sức khoẻ, an sinh xã hội, di sản
//    – môi trường – tài nguyên, pháp luật quốc tế (công pháp, tư pháp, WTO, UNCLOS).
// Khái niệm kinh tế/pháp lí chính xác theo luật hiện hành VN. Lý thuyết DẠY, không
// copy quiz. Chỉ dùng nháy đơn, không backtick.
// ============================================================

export const H12GDCD_LESSONS = {
  'H12GDCD-w01-quiz': {
    topic: 'Tăng trưởng và phát triển kinh tế — Khái niệm',
    intro: 'Các em mở đầu phần Giáo dục kinh tế bằng hai khái niệm nền tảng: tăng trưởng kinh tế và phát triển kinh tế. Hiểu rõ chúng giúp các em đọc được các con số GDP, GNI trên báo chí và đánh giá đúng \'sức khoẻ\' của một nền kinh tế.',
    objectives: [
      'Nêu được khái niệm tăng trưởng kinh tế và các chỉ tiêu đo lường (GDP, GNI, GDP/người).',
      'Phân biệt được tăng trưởng kinh tế với phát triển kinh tế.',
      'Giải thích được vai trò của tăng trưởng kinh tế và yêu cầu phát triển bền vững.',
    ],
    theory: [
      { h: 'Tăng trưởng kinh tế là gì' },
      { p: 'Tăng trưởng kinh tế là sự gia tăng về quy mô sản lượng của một nền kinh tế trong một thời kỳ nhất định (thường là một năm) so với kỳ gốc. Nói gọn, đó là nền kinh tế năm nay làm ra nhiều của cải hơn năm trước.' },
      { h: 'Các chỉ tiêu đo lường' },
      { ul: [
        'GDP (Tổng sản phẩm trong nước): tổng giá trị hàng hoá, dịch vụ cuối cùng được tạo ra trong lãnh thổ một quốc gia trong một năm.',
        'GNI (Tổng thu nhập quốc dân): tổng thu nhập của công dân một nước, kể cả thu nhập từ nước ngoài.',
        'GDP/người = GDP chia cho dân số trung bình — phản ánh mức sống bình quân.',
        'Tốc độ tăng trưởng (%): so sánh sản lượng năm nay với năm trước.',
      ] },
      { h: 'Phát triển kinh tế là gì' },
      { p: 'Phát triển kinh tế rộng hơn tăng trưởng: đó là quá trình tăng trưởng kinh tế gắn liền với chuyển dịch cơ cấu kinh tế theo hướng tiến bộ (tăng tỉ trọng công nghiệp – dịch vụ) và tiến bộ, công bằng xã hội. Một nền kinh tế phát triển không chỉ giàu hơn mà còn công bằng và bền vững hơn.' },
      { h: 'Vai trò của tăng trưởng kinh tế' },
      { ul: [
        'Tạo ra của cải vật chất để nâng cao đời sống nhân dân.',
        'Là điều kiện vật chất để giải quyết việc làm, xoá đói giảm nghèo, củng cố quốc phòng – an ninh.',
        'Tạo tiền đề cho phát triển văn hoá, giáo dục, y tế và an sinh xã hội.',
      ] },
      { note: 'Tăng trưởng nhanh \'bằng mọi giá\' (tàn phá môi trường, gia tăng bất bình đẳng) không phải là phát triển bền vững. Bền vững phải cân bằng cả ba trụ cột: kinh tế – xã hội – môi trường.' },
    ],
    examples: [
      { q: 'Tình huống: Năm trước GDP của một tỉnh là 100 nghìn tỉ, năm nay là 108 nghìn tỉ. Tốc độ tăng trưởng là bao nhiêu?', a: 'Tăng thêm 8 nghìn tỉ trên nền 100 nghìn tỉ, vậy tốc độ tăng trưởng = 8/100 = 8%. Đây là chỉ tiêu tăng trưởng, chưa nói lên việc người dân có được hưởng lợi công bằng hay môi trường có bị ảnh hưởng hay không.' },
      { q: 'Tình huống: Nước A có GDP rất cao nhưng tài nguyên cạn kiệt, khoảng cách giàu nghèo lớn. Nước A đã phát triển kinh tế bền vững chưa?', a: 'Chưa. Nước A có tăng trưởng (GDP cao) nhưng thiếu yếu tố xã hội và môi trường nên chưa đạt phát triển bền vững. Phát triển đòi hỏi tăng trưởng đi đôi với công bằng xã hội và bảo vệ môi trường.' },
    ],
  },

  'H12GDCD-w02-quiz': {
    topic: 'Tăng trưởng và phát triển kinh tế — Mối quan hệ',
    intro: 'Tuần này các em đi sâu vào mối quan hệ giữa tăng trưởng và phát triển, làm quen chỉ số HDI và mục tiêu phát triển của Việt Nam. Đây là kiến thức hay xuất hiện trong câu hỏi vận dụng của đề thi.',
    objectives: [
      'Phân tích được tăng trưởng là điều kiện cần nhưng chưa đủ để phát triển.',
      'Nêu được nội dung chỉ số phát triển con người HDI.',
      'Trình bày được định hướng phát triển kinh tế bền vững của Việt Nam.',
    ],
    theory: [
      { h: 'Tăng trưởng và phát triển — quan hệ biện chứng' },
      { p: 'Tăng trưởng kinh tế là điều kiện cần để phát triển: không có của cải tăng thêm thì không thể nâng cao đời sống. Nhưng tăng trưởng chưa đủ — nếu của cải làm ra không được phân phối công bằng, môi trường bị tàn phá thì xã hội vẫn không tiến bộ.' },
      { h: 'Chỉ số phát triển con người (HDI)' },
      { ul: [
        'Tuổi thọ trung bình (phản ánh sức khoẻ).',
        'Giáo dục (số năm đi học bình quân và kỳ vọng).',
        'Thu nhập bình quân đầu người (GNI/người).',
      ] },
      { p: 'HDI giúp đánh giá phát triển con người chứ không chỉ nhìn vào tiền bạc. Một nước GDP/người trung bình nhưng giáo dục, y tế tốt vẫn có HDI cao.' },
      { h: 'Phát triển bền vững' },
      { p: 'Phát triển bền vững là sự phát triển đáp ứng nhu cầu hiện tại mà không làm tổn hại đến khả năng đáp ứng nhu cầu của các thế hệ tương lai, dựa trên ba trụ cột: kinh tế, xã hội và môi trường.' },
      { h: 'Định hướng của Việt Nam' },
      { ul: [
        'Đổi mới mô hình tăng trưởng từ chiều rộng sang chiều sâu, dựa vào khoa học – công nghệ.',
        'Phấn đấu đến năm 2030 trở thành nước đang phát triển có công nghiệp hiện đại, thu nhập trung bình cao (Nghị quyết Đại hội XIII).',
        'Gắn tăng trưởng với tiến bộ, công bằng xã hội và bảo vệ môi trường (tăng trưởng xanh).',
      ] },
      { note: 'Công bằng xã hội không có nghĩa là chia đều của cải, mà là bảo đảm mọi người có cơ hội bình đẳng tiếp cận giáo dục, y tế, việc làm.' },
    ],
    examples: [
      { q: 'Tình huống: Tỉnh B mở nhiều nhà máy, GDP tăng mạnh nhưng sông ngòi ô nhiễm, người dân phải bỏ nghề cá. Em nhận xét gì?', a: 'Tỉnh B có tăng trưởng nhưng đánh đổi môi trường và sinh kế người dân, nên chưa phát triển bền vững. Cần kiểm soát xả thải, hỗ trợ chuyển đổi nghề để tăng trưởng đi đôi với tiến bộ xã hội.' },
      { q: 'Tình huống: Hai nước có cùng GDP/người, nhưng nước X có tuổi thọ và tỉ lệ đi học cao hơn. Nước nào HDI cao hơn?', a: 'Nước X có HDI cao hơn vì hai trong ba thành phần (tuổi thọ, giáo dục) tốt hơn, dù thu nhập như nhau. Điều này cho thấy phát triển con người không chỉ đo bằng thu nhập.' },
    ],
  },

  'H12GDCD-w03-quiz': {
    topic: 'Hội nhập kinh tế quốc tế — Khái niệm',
    intro: 'Việt Nam là một trong những nền kinh tế hội nhập sâu rộng nhất khu vực. Tuần này các em tìm hiểu hội nhập kinh tế quốc tế là gì và các cấp độ, hình thức hội nhập mà nước ta tham gia.',
    objectives: [
      'Nêu được khái niệm hội nhập kinh tế quốc tế.',
      'Phân biệt được các cấp độ: song phương, khu vực, toàn cầu.',
      'Kể được các tổ chức, hiệp định tiêu biểu mà Việt Nam tham gia.',
    ],
    theory: [
      { h: 'Hội nhập kinh tế quốc tế là gì' },
      { p: 'Hội nhập kinh tế quốc tế là quá trình một quốc gia gắn kết nền kinh tế của mình với nền kinh tế khu vực và thế giới thông qua việc tham gia các tổ chức, ký kết các hiệp định, mở cửa thị trường trên cơ sở chia sẻ lợi ích và tuân thủ các quy tắc chung.' },
      { h: 'Các cấp độ hội nhập' },
      { ul: [
        'Song phương: hợp tác giữa hai quốc gia (ví dụ hiệp định thương mại Việt Nam – một nước).',
        'Khu vực: tham gia các khối kinh tế khu vực như ASEAN, CPTPP.',
        'Toàn cầu: gia nhập các tổ chức toàn cầu như WTO.',
      ] },
      { h: 'Các tổ chức, hiệp định tiêu biểu' },
      { ul: [
        'ASEAN — Hiệp hội các quốc gia Đông Nam Á (Việt Nam gia nhập năm 1995).',
        'WTO — Tổ chức Thương mại Thế giới (Việt Nam gia nhập ngày 11/1/2007).',
        'CPTPP — Hiệp định Đối tác Toàn diện và Tiến bộ xuyên Thái Bình Dương (11 nước).',
        'EVFTA — Hiệp định thương mại tự do Việt Nam – Liên minh châu Âu (EU).',
        'RCEP — Hiệp định Đối tác Kinh tế Toàn diện Khu vực.',
      ] },
      { h: 'Hình thức hội nhập' },
      { p: 'Hội nhập thể hiện qua: thương mại hàng hoá – dịch vụ, đầu tư quốc tế, hợp tác tài chính – tiền tệ, di chuyển lao động và chuyển giao công nghệ.' },
      { note: 'Hội nhập không phải là \'hoà tan\'. Việt Nam hội nhập trên nguyên tắc giữ vững độc lập, tự chủ và định hướng xã hội chủ nghĩa.' },
    ],
    examples: [
      { q: 'Tình huống: Việt Nam ký EVFTA, thuế nhập khẩu nhiều mặt hàng vào EU giảm về 0%. Đây là cấp độ hội nhập nào?', a: 'EVFTA là hiệp định giữa Việt Nam và khối EU, mang tính khu vực – liên khu vực. Nó mở rộng thị trường xuất khẩu cho hàng Việt vào châu Âu, đồng thời mở cửa thị trường Việt cho hàng EU.' },
      { q: 'Tình huống: Một bạn nói \'hội nhập là chỉ lo xuất khẩu thật nhiều\'. Em phản hồi thế nào?', a: 'Chưa đúng. Hội nhập gồm cả nhập khẩu, thu hút đầu tư, hợp tác tài chính, công nghệ và lao động, không chỉ xuất khẩu. Nó là sự gắn kết hai chiều giữa nền kinh tế nước ta với thế giới.' },
    ],
  },

  'H12GDCD-w04-quiz': {
    topic: 'Hội nhập kinh tế quốc tế — Cơ hội và thách thức',
    intro: 'Hội nhập mang lại cả cơ hội lẫn thách thức. Tuần này các em phân tích hai mặt đó và rút ra trách nhiệm của doanh nghiệp và của chính bản thân mình.',
    objectives: [
      'Phân tích được cơ hội và thách thức của hội nhập kinh tế quốc tế.',
      'Phân biệt được các khái niệm FDI, ODA.',
      'Nêu được trách nhiệm của công dân, doanh nghiệp trong hội nhập.',
    ],
    theory: [
      { h: 'Cơ hội từ hội nhập' },
      { ul: [
        'Mở rộng thị trường xuất khẩu nhờ thuế quan giảm.',
        'Thu hút vốn đầu tư trực tiếp nước ngoài (FDI) và hỗ trợ phát triển chính thức (ODA).',
        'Tiếp nhận khoa học – công nghệ và kinh nghiệm quản lý hiện đại.',
        'Tạo việc làm, nâng cao trình độ lao động.',
      ] },
      { h: 'Phân biệt FDI và ODA' },
      { ul: [
        'FDI (đầu tư trực tiếp nước ngoài): nhà đầu tư nước ngoài bỏ vốn lập doanh nghiệp, trực tiếp quản lý vì mục đích lợi nhuận.',
        'ODA (hỗ trợ phát triển chính thức): nguồn vốn vay ưu đãi hoặc viện trợ của chính phủ, tổ chức quốc tế dành cho nước đang phát triển.',
      ] },
      { h: 'Thách thức của hội nhập' },
      { ul: [
        'Cạnh tranh gay gắt; doanh nghiệp yếu dễ bị thua ngay trên sân nhà.',
        'Nguy cơ phụ thuộc vào thị trường và vốn nước ngoài.',
        'Dễ chịu tác động từ biến động, khủng hoảng kinh tế thế giới.',
        'Thách thức về giữ gìn bản sắc văn hoá và bảo vệ môi trường.',
      ] },
      { h: 'Trách nhiệm trong hội nhập' },
      { p: 'Doanh nghiệp cần nâng cao chất lượng sản phẩm, đổi mới công nghệ, xây dựng thương hiệu. Công dân, nhất là học sinh, cần học ngoại ngữ, tin học, kỹ năng mềm và ưu tiên dùng hàng Việt Nam chất lượng cao.' },
      { note: 'Tận dụng cơ hội và vượt qua thách thức phụ thuộc vào năng lực nội tại. \'Nội lực là quyết định, ngoại lực là quan trọng\'.' },
    ],
    examples: [
      { q: 'Tình huống: Một hãng nước ngoài lập nhà máy ở Việt Nam, thuê 5.000 lao động địa phương. Đây là FDI hay ODA?', a: 'Đây là FDI — nhà đầu tư nước ngoài trực tiếp bỏ vốn, lập doanh nghiệp và quản lý vì mục tiêu lợi nhuận. FDI tạo việc làm, chuyển giao công nghệ nhưng cũng cần kiểm soát về môi trường và chuyển giá.' },
      { q: 'Tình huống: Bạn An chỉ thích dùng hàng ngoại, chê mọi hàng Việt. Cách ứng xử hội nhập đúng là gì?', a: 'Hội nhập đúng không phải sính ngoại hay bài ngoại, mà là ưu tiên dùng hàng Việt chất lượng, đồng thời tiếp thu cái hay của thế giới. An nên đánh giá sản phẩm theo chất lượng thực, ủng hộ doanh nghiệp Việt nâng cao năng lực cạnh tranh.' },
    ],
  },

  'H12GDCD-w05-quiz': {
    topic: 'Bảo hiểm — Khái niệm và vai trò',
    intro: 'Bảo hiểm là tấm \'lưới an toàn\' giúp con người vượt qua rủi ro. Tuần này các em tìm hiểu bảo hiểm là gì, các loại hình bảo hiểm ở Việt Nam và quyền lợi của người tham gia.',
    objectives: [
      'Nêu được khái niệm và nguyên tắc của bảo hiểm.',
      'Phân biệt được các loại hình: bảo hiểm xã hội, y tế, thất nghiệp, thương mại.',
      'Trình bày được các chế độ của bảo hiểm xã hội bắt buộc.',
    ],
    theory: [
      { h: 'Bảo hiểm là gì' },
      { p: 'Bảo hiểm là hình thức chia sẻ rủi ro: nhiều người cùng đóng một khoản phí để lập quỹ chung; khi một số người gặp rủi ro (ốm đau, tai nạn, mất việc...) thì được quỹ chi trả. Nguyên tắc cốt lõi là \'số đông bù số ít\'.' },
      { h: 'Các loại hình bảo hiểm ở Việt Nam' },
      { ul: [
        'Bảo hiểm xã hội (BHXH): do Nhà nước tổ chức, bảo đảm thay thế hoặc bù đắp thu nhập khi người lao động ốm đau, thai sản, tai nạn, hết tuổi lao động.',
        'Bảo hiểm y tế (BHYT): chi trả chi phí khám chữa bệnh trong phạm vi quyền lợi.',
        'Bảo hiểm thất nghiệp: hỗ trợ thu nhập, tư vấn, đào tạo nghề khi người lao động mất việc.',
        'Bảo hiểm thương mại: do doanh nghiệp bảo hiểm cung cấp theo hợp đồng tự nguyện, vì mục tiêu lợi nhuận.',
      ] },
      { h: 'Các chế độ của BHXH bắt buộc' },
      { ul: [
        'Ốm đau.',
        'Thai sản.',
        'Tai nạn lao động – bệnh nghề nghiệp.',
        'Hưu trí.',
        'Tử tuất.',
      ] },
      { h: 'Đối tượng và vai trò' },
      { p: 'BHXH bắt buộc áp dụng cho người lao động làm việc theo hợp đồng lao động từ đủ 1 tháng trở lên. Bảo hiểm giúp ổn định đời sống, bảo đảm an sinh xã hội và huy động nguồn vốn nhàn rỗi cho nền kinh tế.' },
      { note: 'BHXH và BHYT là chính sách an sinh do Nhà nước tổ chức, không vì lợi nhuận; khác hẳn bảo hiểm thương mại của các công ty.' },
    ],
    examples: [
      { q: 'Tình huống: Chị Lan sinh con, được nghỉ và hưởng trợ cấp một thời gian từ cơ quan bảo hiểm. Đây là chế độ nào?', a: 'Đây là chế độ thai sản thuộc BHXH bắt buộc. Nhờ đã đóng BHXH đủ điều kiện, chị Lan được nghỉ việc hưởng chế độ, bảo đảm thu nhập trong thời gian sinh con.' },
      { q: 'Tình huống: Anh Nam tự mua hợp đồng bảo hiểm nhân thọ của một công ty. Đây là bảo hiểm gì?', a: 'Đây là bảo hiểm thương mại (nhân thọ) — tự nguyện, theo hợp đồng với doanh nghiệp bảo hiểm vì mục tiêu lợi nhuận. Nó khác BHXH do Nhà nước tổ chức và mang tính bắt buộc với người lao động.' },
    ],
  },

  'H12GDCD-w06-quiz': {
    topic: 'Bảo hiểm — Trách nhiệm công dân',
    intro: 'Tham gia bảo hiểm vừa là quyền lợi vừa là nghĩa vụ. Tuần này các em tìm hiểu nguyên tắc hoạt động, nghĩa vụ của người tham gia và trách nhiệm của học sinh với BHYT.',
    objectives: [
      'Phân biệt được bảo hiểm thương mại với bảo hiểm xã hội.',
      'Nêu được nguyên tắc hoạt động và nghĩa vụ của người tham gia bảo hiểm.',
      'Xác định được trách nhiệm của học sinh với bảo hiểm y tế học sinh.',
    ],
    theory: [
      { h: 'Nguyên tắc hoạt động của bảo hiểm' },
      { ul: [
        'Số đông bù số ít — quỹ chung chia sẻ rủi ro.',
        'Công bằng, công khai, minh bạch trong đóng và hưởng.',
        'Đóng – hưởng tương ứng (đặc biệt với BHXH).',
      ] },
      { h: 'So sánh bảo hiểm thương mại và BHXH' },
      { ul: [
        'BHXH, BHYT bắt buộc: do Nhà nước tổ chức, không vì lợi nhuận, mang tính an sinh.',
        'Bảo hiểm thương mại: do doanh nghiệp cung cấp, tự nguyện, vì mục tiêu lợi nhuận.',
      ] },
      { h: 'Nghĩa vụ của người tham gia' },
      { ul: [
        'Kê khai trung thực thông tin.',
        'Đóng phí đầy đủ, đúng hạn.',
        'Sử dụng quyền lợi đúng mục đích, không trục lợi bảo hiểm.',
      ] },
      { h: 'Trách nhiệm của học sinh' },
      { p: 'Bảo hiểm y tế học sinh, sinh viên là hình thức BHYT bắt buộc theo nhóm. Học sinh cần tham gia đầy đủ để được chăm sóc sức khoẻ, khám chữa bệnh khi cần và góp phần vào lộ trình BHYT toàn dân.' },
      { note: 'Khai khống hồ sơ, trục lợi tiền bảo hiểm là hành vi vi phạm pháp luật, có thể bị xử phạt hành chính hoặc truy cứu trách nhiệm hình sự.' },
    ],
    examples: [
      { q: 'Tình huống: Một người khai báo bệnh nặng hơn thực tế để được chi trả nhiều hơn. Hành vi này đúng hay sai?', a: 'Sai — đây là trục lợi bảo hiểm, vi phạm nguyên tắc trung thực và pháp luật. Người vi phạm có thể bị từ chối chi trả, xử phạt hành chính hoặc truy cứu trách nhiệm hình sự tuỳ mức độ.' },
      { q: 'Tình huống: Bạn Hoa định không tham gia BHYT học sinh vì \'ít khi ốm\'. Em khuyên gì?', a: 'BHYT học sinh là bắt buộc theo quy định. Hoa nên tham gia đầy đủ vì rủi ro sức khoẻ khó lường; khi ốm đau, tai nạn sẽ được chi trả phần lớn chi phí, đồng thời góp phần chia sẻ với cộng đồng.' },
    ],
  },

  'H12GDCD-w07-quiz': {
    topic: 'An sinh xã hội — Khái niệm',
    intro: 'An sinh xã hội là \'tấm lưới đỡ\' của cả quốc gia với người dân. Tuần này các em tìm hiểu khái niệm, các trụ cột và mục tiêu của hệ thống an sinh xã hội Việt Nam.',
    objectives: [
      'Nêu được khái niệm an sinh xã hội.',
      'Kể được bốn trụ cột của hệ thống an sinh xã hội Việt Nam.',
      'Trình bày được mục tiêu và ý nghĩa của an sinh xã hội.',
    ],
    theory: [
      { h: 'An sinh xã hội là gì' },
      { p: 'An sinh xã hội là hệ thống các chính sách của Nhà nước nhằm bảo đảm mức sống tối thiểu, thu nhập và các dịch vụ xã hội cơ bản cho mọi người dân, đặc biệt khi gặp rủi ro hoặc rơi vào hoàn cảnh khó khăn.' },
      { h: 'Bốn trụ cột của an sinh xã hội Việt Nam' },
      { ul: [
        'Việc làm, thu nhập và giảm nghèo (bảo đảm thu nhập tối thiểu).',
        'Bảo hiểm xã hội, bảo hiểm y tế (phòng ngừa, giảm thiểu rủi ro).',
        'Trợ giúp xã hội cho nhóm yếu thế (khắc phục rủi ro).',
        'Dịch vụ xã hội cơ bản: giáo dục, y tế, nhà ở, nước sạch, thông tin.',
      ] },
      { h: 'Trợ giúp xã hội' },
      { p: 'Trợ giúp xã hội dành cho người có hoàn cảnh đặc biệt khó khăn: người già cô đơn, trẻ mồ côi, người khuyết tật nặng, nạn nhân thiên tai... thông qua trợ cấp thường xuyên hoặc đột xuất.' },
      { h: 'Mục tiêu của an sinh xã hội' },
      { ul: [
        'Bảo đảm cuộc sống tối thiểu cho mọi người.',
        'Giảm bất bình đẳng, thu hẹp khoảng cách giàu nghèo.',
        'Giữ ổn định xã hội, tạo nền tảng cho phát triển bền vững.',
      ] },
      { note: 'Chính sách giảm nghèo bền vững theo phương châm \'trao cần câu hơn trao con cá\' — hỗ trợ vốn, dạy nghề, tạo việc làm để người nghèo tự vươn lên.' },
    ],
    examples: [
      { q: 'Tình huống: Một cụ già 82 tuổi, không có lương hưu, sống cô đơn. Cụ thuộc nhóm nào của an sinh xã hội?', a: 'Cụ thuộc đối tượng trợ giúp xã hội (nhóm yếu thế). Theo Luật Người cao tuổi, người từ đủ 80 tuổi không có lương hưu được hưởng trợ cấp xã hội hằng tháng và được cấp thẻ BHYT miễn phí.' },
      { q: 'Tình huống: Xã A xây trường học, trạm y tế, đưa nước sạch về cho dân. Đây là trụ cột nào?', a: 'Đây là trụ cột dịch vụ xã hội cơ bản (giáo dục, y tế, nước sạch). Bảo đảm các dịch vụ này giúp mọi người, kể cả người nghèo, được tiếp cận điều kiện sống tối thiểu.' },
    ],
  },

  'H12GDCD-w08-quiz': {
    topic: 'An sinh xã hội — Trách nhiệm công dân',
    intro: 'An sinh xã hội là trách nhiệm chung. Tuần này các em xác định vai trò của Nhà nước, doanh nghiệp, cộng đồng và đặc biệt là của chính học sinh trong việc bảo đảm an sinh.',
    objectives: [
      'Nêu được trách nhiệm của các chủ thể trong thực hiện an sinh xã hội.',
      'Xác định được các việc làm phù hợp của học sinh.',
      'Nhận diện được hành vi vi phạm pháp luật về an sinh xã hội.',
    ],
    theory: [
      { h: 'Ai chịu trách nhiệm về an sinh xã hội' },
      { p: 'An sinh xã hội là trách nhiệm của cả Nhà nước, doanh nghiệp, các tổ chức xã hội và mỗi công dân — không chỉ riêng Nhà nước.' },
      { h: 'Trách nhiệm của công dân' },
      { ul: [
        'Tham gia BHXH, BHYT theo quy định.',
        'Đóng thuế đầy đủ — nguồn lực cho chi an sinh.',
        'Ủng hộ các quỹ xã hội, giúp đỡ người gặp khó khăn.',
        'Không trục lợi, không khai khống để hưởng chế độ.',
      ] },
      { h: 'Học sinh làm gì' },
      { ul: [
        'Tham gia BHYT học sinh.',
        'Tham gia phong trào tình nguyện, ủng hộ bạn nghèo, vùng thiên tai.',
        'Tuyên truyền chính sách an sinh tới gia đình, cộng đồng.',
      ] },
      { h: 'Hành vi vi phạm pháp luật về an sinh xã hội' },
      { p: 'Khai khống hồ sơ để hưởng trợ cấp, làm giả giấy tờ, trục lợi quỹ BHXH – BHYT đều là hành vi vi phạm, bị xử phạt hành chính hoặc truy cứu trách nhiệm hình sự.' },
      { note: 'An sinh xã hội là một trụ cột để tăng trưởng đi đôi với tiến bộ và công bằng xã hội — cốt lõi của phát triển bền vững.' },
    ],
    examples: [
      { q: 'Tình huống: Mặt trận Tổ quốc phát động ủng hộ \'Quỹ vì người nghèo\', lớp em quyên góp giúp một bạn có hoàn cảnh khó khăn. Đây là hoạt động gì?', a: 'Đây là hoạt động trợ giúp xã hội mang tính cộng đồng, huy động sự chung tay của xã hội. Học sinh tham gia là thực hiện trách nhiệm công dân với an sinh xã hội, thể hiện tinh thần tương thân tương ái.' },
      { q: 'Tình huống: Một người làm giả hồ sơ hộ nghèo để nhận trợ cấp dù gia đình khá giả. Em đánh giá thế nào?', a: 'Hành vi này là trục lợi chính sách an sinh xã hội — vi phạm pháp luật. Người đó phải hoàn trả khoản đã nhận, bị xử phạt hành chính, thậm chí truy cứu trách nhiệm hình sự nếu nghiêm trọng.' },
    ],
  },

  'H12GDCD-w09-quiz': {
    topic: 'Lập kế hoạch kinh doanh — Khái niệm',
    intro: 'Mọi ý tưởng khởi nghiệp đều cần một bản kế hoạch. Tuần này các em tìm hiểu kế hoạch kinh doanh là gì, vai trò và các nội dung cốt lõi của nó.',
    objectives: [
      'Nêu được khái niệm và vai trò của kế hoạch kinh doanh.',
      'Liệt kê được các nội dung chính của một kế hoạch kinh doanh.',
      'Giải thích được công cụ phân tích SWOT.',
    ],
    theory: [
      { h: 'Kế hoạch kinh doanh là gì' },
      { p: 'Kế hoạch kinh doanh là tài liệu mô tả ý tưởng, mục tiêu, sản phẩm, thị trường, nguồn lực và các bước hành động để triển khai một hoạt động kinh doanh. Nó là \'bản đồ\' dẫn đường cho người khởi nghiệp.' },
      { h: 'Vai trò của kế hoạch kinh doanh' },
      { ul: [
        'Định hướng hoạt động, giúp người kinh doanh đi đúng mục tiêu.',
        'Là cơ sở để huy động vốn, thuyết phục nhà đầu tư, ngân hàng.',
        'Giúp lường trước và phòng ngừa rủi ro.',
      ] },
      { h: 'Các nội dung chính' },
      { ul: [
        'Ý tưởng và mục tiêu kinh doanh.',
        'Nghiên cứu thị trường: khách hàng mục tiêu, đối thủ, nhu cầu, xu hướng.',
        'Sản phẩm/dịch vụ và lợi thế cạnh tranh.',
        'Kế hoạch marketing, nhân sự, sản xuất.',
        'Kế hoạch tài chính: doanh thu, chi phí, lợi nhuận, dòng tiền, nhu cầu vốn.',
        'Phân tích và phương án xử lý rủi ro.',
      ] },
      { h: 'Phân tích SWOT' },
      { p: 'SWOT là công cụ phân tích bốn yếu tố: Strengths (điểm mạnh), Weaknesses (điểm yếu) bên trong; Opportunities (cơ hội), Threats (thách thức) bên ngoài. Nó giúp người kinh doanh hiểu mình và hiểu thị trường.' },
      { note: 'Một kế hoạch kinh doanh tốt không phải là bản viết hay để \'khoe\', mà phải khả thi, dựa trên số liệu thực tế và có phương án ứng phó rủi ro.' },
    ],
    examples: [
      { q: 'Tình huống: Bạn Minh muốn mở quán cà phê sách. Nội dung nào không thể thiếu trong kế hoạch của Minh?', a: 'Minh cần nghiên cứu thị trường (khách hàng mục tiêu, đối thủ quanh khu vực), xác định sản phẩm – giá, lập kế hoạch tài chính (vốn, doanh thu, chi phí) và dự trù rủi ro. Thiếu các phần này, kế hoạch chỉ là ý tưởng mơ hồ.' },
      { q: 'Tình huống: Khi phân tích SWOT cho tiệm bánh nhỏ, \'gần trường học, đông học sinh\' thuộc yếu tố nào?', a: 'Đây là Opportunity (cơ hội) — yếu tố bên ngoài thuận lợi. Còn \'tay nghề làm bánh giỏi\' là Strength (điểm mạnh) bên trong, \'vốn ít\' là Weakness, \'nhiều tiệm cạnh tranh\' là Threat.' },
    ],
  },

  'H12GDCD-w10-quiz': {
    topic: 'Lập kế hoạch kinh doanh — Thực hành',
    intro: 'Tuần này các em thực hành các bước lập kế hoạch kinh doanh, từ xác định mục tiêu SMART đến tính toán đơn giản về vốn, giá bán và rủi ro.',
    objectives: [
      'Trình bày được các bước lập kế hoạch kinh doanh.',
      'Vận dụng được nguyên tắc mục tiêu SMART và cách tính giá bán, lãi vay.',
      'Nhận diện được rủi ro khởi nghiệp và cách khởi nghiệp phù hợp lứa tuổi.',
    ],
    theory: [
      { h: 'Các bước lập kế hoạch kinh doanh' },
      { ul: [
        'Bước 1: Xác định ý tưởng và mục tiêu kinh doanh.',
        'Bước 2: Nghiên cứu thị trường, phân tích SWOT.',
        'Bước 3: Xây dựng phương án sản phẩm, marketing, nhân sự.',
        'Bước 4: Lập kế hoạch tài chính (vốn, giá, doanh thu, lợi nhuận).',
        'Bước 5: Dự trù rủi ro và phương án ứng phó.',
      ] },
      { h: 'Mục tiêu SMART' },
      { p: 'Mục tiêu tốt cần SMART: Specific (cụ thể), Measurable (đo lường được), Achievable (khả thi), Relevant (liên quan), Time-bound (có thời hạn).' },
      { h: 'Tính toán cơ bản' },
      { ul: [
        'Lãi vay = số tiền vay × lãi suất × thời gian.',
        'Giá bán = giá vốn + chi phí + lợi nhuận mong muốn, có tham chiếu giá thị trường.',
        'Lợi nhuận = doanh thu − tổng chi phí.',
      ] },
      { h: 'Rủi ro khởi nghiệp' },
      { p: 'Rủi ro thường gặp: thiếu vốn, chọn sai phân khúc thị trường, cạnh tranh khốc liệt, quản trị kém, sản phẩm không phù hợp nhu cầu.' },
      { note: 'Học sinh THPT nên tập kinh doanh ở quy mô phù hợp: dự án nhỏ trong câu lạc bộ, hội chợ trường, bán hàng online lành mạnh — tuyệt đối không vay nặng lãi hay bỏ học \'đi buôn lớn\'.' },
    ],
    examples: [
      { q: 'Tình huống: An vay 200 triệu lãi suất 10%/năm để mở quán. Sau 1 năm An phải trả bao nhiêu tiền lãi?', a: 'Lãi 1 năm = 200 triệu × 10% = 20 triệu đồng. An cần đưa khoản lãi 20 triệu này vào chi phí khi tính lợi nhuận; nếu quán không tạo đủ doanh thu để trả lãi thì sẽ thua lỗ.' },
      { q: 'Tình huống: Bạn Hà đặt mục tiêu \'bán thật nhiều bánh\'. Hãy giúp Hà đặt mục tiêu SMART.', a: 'Mục tiêu SMART có thể là: \'Bán được 300 chiếc bánh trong tháng đầu, đạt doanh thu 6 triệu đồng\'. Mục tiêu này cụ thể, đo lường được, có thời hạn — khác với mục tiêu chung chung \'bán thật nhiều\'.' },
    ],
  },

  'H12GDCD-w11-quiz': {
    topic: 'Trách nhiệm xã hội của doanh nghiệp — Khái niệm',
    intro: 'Doanh nghiệp không chỉ tồn tại để kiếm lợi nhuận. Tuần này các em tìm hiểu trách nhiệm xã hội của doanh nghiệp (CSR) và bốn cấp độ biểu hiện của nó.',
    objectives: [
      'Nêu được khái niệm trách nhiệm xã hội của doanh nghiệp (CSR).',
      'Phân tích được bốn cấp độ: kinh tế, pháp lý, đạo đức, từ thiện.',
      'Lấy được ví dụ về biểu hiện CSR.',
    ],
    theory: [
      { h: 'Trách nhiệm xã hội của doanh nghiệp là gì' },
      { p: 'Trách nhiệm xã hội của doanh nghiệp (CSR – Corporate Social Responsibility) là cam kết của doanh nghiệp đóng góp vào phát triển kinh tế bền vững, nâng cao chất lượng cuộc sống của người lao động, cộng đồng và bảo vệ môi trường, song song với mục tiêu lợi nhuận.' },
      { h: 'Bốn cấp độ trách nhiệm (mô hình Carroll)' },
      { ul: [
        'Trách nhiệm kinh tế: tạo lợi nhuận, sản phẩm chất lượng, việc làm, đóng góp ngân sách — nền tảng của mọi trách nhiệm.',
        'Trách nhiệm pháp lý: tuân thủ pháp luật về lao động, thuế, môi trường, cạnh tranh.',
        'Trách nhiệm đạo đức: hành xử công bằng, trung thực ngay cả khi pháp luật chưa quy định.',
        'Trách nhiệm từ thiện: tự nguyện đóng góp cho cộng đồng — tài trợ giáo dục, y tế, cứu trợ thiên tai.',
      ] },
      { h: 'Vì sao doanh nghiệp cần CSR' },
      { p: 'Doanh nghiệp hoạt động trong xã hội, sử dụng tài nguyên và lao động của xã hội, nên có nghĩa vụ đóng góp trở lại. CSR giúp doanh nghiệp phát triển bền vững và được cộng đồng tin yêu.' },
      { note: 'CSR không chỉ là làm từ thiện. Một doanh nghiệp đóng thuế đầy đủ, không gây ô nhiễm, đối xử công bằng với người lao động đã thực hiện CSR ở các cấp độ kinh tế, pháp lý và đạo đức.' },
    ],
    examples: [
      { q: 'Tình huống: Một công ty trả lương đúng hạn, đóng đủ BHXH, không xả thải bẩn, đồng thời tài trợ học bổng cho học sinh nghèo. Đó là những cấp độ CSR nào?', a: 'Trả lương, đóng BHXH thể hiện trách nhiệm pháp lý và đạo đức với người lao động; không xả thải bẩn là trách nhiệm pháp lý về môi trường; tài trợ học bổng là trách nhiệm từ thiện. Công ty đã thực hiện CSR khá toàn diện.' },
      { q: 'Tình huống: Một xưởng dệt thuê trẻ em dưới 15 tuổi làm việc nhiều giờ. Đây có phải doanh nghiệp có trách nhiệm xã hội không?', a: 'Không. Sử dụng lao động trẻ em là vi phạm pháp luật lao động và đạo đức kinh doanh — đi ngược lại CSR ngay từ cấp độ pháp lý. Doanh nghiệp này phải bị xử lý theo quy định.' },
    ],
  },

  'H12GDCD-w12-quiz': {
    topic: 'Trách nhiệm xã hội của doanh nghiệp — Ý nghĩa',
    intro: 'Tuần này các em tìm hiểu vì sao CSR có lợi cho cả doanh nghiệp và xã hội, đồng thời nhận diện hành vi vi phạm và vai trò của người tiêu dùng.',
    objectives: [
      'Phân tích được ý nghĩa của CSR với doanh nghiệp và xã hội.',
      'Nhận diện được hành vi vi phạm trách nhiệm xã hội.',
      'Nêu được vai trò của người tiêu dùng trong thúc đẩy CSR.',
    ],
    theory: [
      { h: 'Ý nghĩa của CSR với doanh nghiệp' },
      { ul: [
        'Nâng cao uy tín, thương hiệu và niềm tin của khách hàng.',
        'Thu hút, giữ chân nhân tài.',
        'Tăng lòng trung thành của khách hàng và đối tác.',
        'Bảo đảm phát triển bền vững, lâu dài.',
      ] },
      { h: 'Ý nghĩa với xã hội' },
      { ul: [
        'Góp phần bảo vệ môi trường, sử dụng tài nguyên hợp lý.',
        'Nâng cao chất lượng cuộc sống cộng đồng.',
        'Giảm bất bình đẳng, hỗ trợ nhóm yếu thế.',
      ] },
      { h: 'Phát triển bền vững và CSR' },
      { p: 'CSR gắn với nguyên tắc \'ba điểm mấu chốt\' (triple bottom line): cân bằng lợi ích kinh tế – xã hội – môi trường. Doanh nghiệp chỉ vì lợi nhuận trước mắt mà bỏ qua xã hội, môi trường sẽ không bền vững.' },
      { h: 'Vai trò người tiêu dùng' },
      { p: 'Người tiêu dùng có thể thúc đẩy CSR bằng cách ưu tiên mua sản phẩm của doanh nghiệp có trách nhiệm và tẩy chay doanh nghiệp gây ô nhiễm, làm hàng giả, vô đạo đức.' },
      { note: 'Hành vi xả thải gây ô nhiễm, dùng lao động trẻ em, làm hàng giả vừa vi phạm CSR vừa vi phạm pháp luật; doanh nghiệp có thể bị phạt nặng và mất thị trường.' },
    ],
    examples: [
      { q: 'Tình huống: Vinamilk thực hiện chương trình Quỹ sữa \'Vươn cao Việt Nam\' tặng sữa cho trẻ em nghèo. Điều này mang lại lợi ích gì?', a: 'Về xã hội, chương trình cải thiện dinh dưỡng cho trẻ em khó khăn. Về doanh nghiệp, nó nâng cao uy tín thương hiệu, tạo thiện cảm với khách hàng — minh chứng CSR đem lại lợi ích cho cả hai phía.' },
      { q: 'Tình huống: Người dân phát hiện một công ty xả nước thải chưa xử lý ra sông. Người tiêu dùng nên làm gì?', a: 'Người tiêu dùng có thể tẩy chay sản phẩm của công ty đó, đồng thời phản ánh tới cơ quan chức năng để xử lý. Sức ép từ người tiêu dùng và pháp luật buộc doanh nghiệp phải có trách nhiệm với môi trường.' },
    ],
  },

  'H12GDCD-w13-quiz': {
    topic: 'Quản lí thu chi gia đình — Khái niệm',
    intro: 'Quản lý tiền bạc là kỹ năng sống thiết yếu. Tuần này các em học cách phân loại các khoản thu, chi của gia đình và nguyên tắc cân đối thu chi.',
    objectives: [
      'Nêu được khái niệm quản lí thu chi gia đình.',
      'Phân loại được các khoản thu và các khoản chi (cố định, tuỳ ý).',
      'Trình bày được nguyên tắc cân đối thu chi và quỹ dự phòng.',
    ],
    theory: [
      { h: 'Quản lí thu chi gia đình là gì' },
      { p: 'Quản lí thu chi gia đình là việc theo dõi, lập kế hoạch và kiểm soát các khoản thu, chi của gia đình một cách hợp lý nhằm bảo đảm cuộc sống ổn định và có tích luỹ cho tương lai.' },
      { h: 'Các khoản thu' },
      { ul: [
        'Tiền lương, tiền công.',
        'Thu từ kinh doanh, sản xuất.',
        'Thu từ đầu tư (lãi tiết kiệm, cổ tức), cho thuê tài sản.',
        'Các khoản thu khác (quà tặng, trợ cấp...).',
      ] },
      { h: 'Các khoản chi' },
      { ul: [
        'Chi cố định (thiết yếu): tiền nhà, điện nước, học phí, ăn uống cơ bản, bảo hiểm.',
        'Chi tuỳ ý (không thiết yếu): mua sắm xa xỉ, giải trí, du lịch.',
      ] },
      { h: 'Nguyên tắc cân đối thu chi' },
      { ul: [
        'Chi tiêu phải nhỏ hơn hoặc bằng thu nhập, \'liệu cơm gắp mắm\'.',
        'Dành một phần thu nhập để tiết kiệm và dự phòng.',
        'Ưu tiên chi thiết yếu trước, chi tuỳ ý sau.',
      ] },
      { note: 'Quỹ dự phòng nên bằng khoảng 3–6 tháng chi tiêu cơ bản, để vượt qua các rủi ro như ốm đau, mất việc mà không phải vay nợ.' },
    ],
    examples: [
      { q: 'Tình huống: Tiền điện, học phí, tiền ăn của một gia đình thuộc loại chi nào?', a: 'Đây là các khoản chi cố định (thiết yếu) — bắt buộc phải có hằng tháng để duy trì cuộc sống. Còn tiền đi du lịch, mua đồ hiệu là chi tuỳ ý, có thể cắt giảm khi cần.' },
      { q: 'Tình huống: Gia đình anh B tháng nào cũng tiêu hết sạch thu nhập, không tiết kiệm. Điều này có rủi ro gì?', a: 'Gia đình anh B không có quỹ dự phòng, nên khi gặp rủi ro (ốm đau, hỏng xe, mất việc) sẽ phải vay mượn, dễ rơi vào nợ nần. Nên dành ít nhất một phần thu nhập để lập quỹ dự phòng 3–6 tháng chi tiêu.' },
    ],
  },

  'H12GDCD-w14-quiz': {
    topic: 'Quản lí thu chi gia đình — Lập kế hoạch',
    intro: 'Tuần này các em thực hành lập kế hoạch chi tiêu, áp dụng quy tắc 50/30/20 và các công cụ theo dõi thu chi.',
    objectives: [
      'Vận dụng được cách tính số tiền còn lại sau chi cố định.',
      'Áp dụng được quy tắc phân bổ 50/30/20.',
      'Nêu được công cụ theo dõi thu chi và cách tăng thu nhập hợp pháp.',
    ],
    theory: [
      { h: 'Các bước lập kế hoạch chi tiêu' },
      { ul: [
        'Bước 1: Tính tổng thu nhập của gia đình.',
        'Bước 2: Liệt kê và tính chi cố định (thiết yếu).',
        'Bước 3: Phân bổ phần còn lại cho tiết kiệm, đầu tư, chi tuỳ ý.',
        'Bước 4: Theo dõi, điều chỉnh hằng tháng.',
      ] },
      { h: 'Quy tắc 50/30/20' },
      { p: 'Một cách phân bổ thu nhập đơn giản: 50% cho nhu cầu thiết yếu, 30% cho mong muốn (giải trí, mua sắm), 20% cho tiết kiệm và trả nợ. Tỉ lệ có thể điều chỉnh theo hoàn cảnh từng gia đình.' },
      { h: 'Công cụ theo dõi thu chi' },
      { ul: [
        'Sổ tay ghi chép thu chi.',
        'Bảng tính (Excel, Google Sheets).',
        'Ứng dụng quản lý tài chính (Money Lover, Misa, Sổ thu chi...).',
      ] },
      { h: 'Tăng thu nhập hợp pháp' },
      { p: 'Để cải thiện tài chính, gia đình có thể học thêm kỹ năng, làm thêm việc hợp pháp, kinh doanh nhỏ hoặc đầu tư phù hợp — tuyệt đối không vì tiền mà vi phạm pháp luật.' },
      { note: 'Chi tiêu vượt thu nhập kéo dài sẽ dẫn tới nợ nần và mất an toàn tài chính. Hãy luôn \'sống trong khả năng\'.' },
    ],
    examples: [
      { q: 'Tình huống: Gia đình anh A thu nhập 25 triệu/tháng, chi cố định 18 triệu. Số tiền còn lại để phân bổ là bao nhiêu và nên dùng thế nào?', a: 'Còn lại = 25 − 18 = 7 triệu. Anh A nên phân bổ hợp lý: một phần tiết kiệm (lập quỹ dự phòng), một phần đầu tư an toàn, một phần cho chi tuỳ ý — thay vì tiêu hết 7 triệu.' },
      { q: 'Tình huống: Áp dụng quy tắc 50/30/20 với thu nhập 20 triệu/tháng thì phân bổ ra sao?', a: '50% = 10 triệu cho thiết yếu (nhà, ăn, học); 30% = 6 triệu cho mong muốn (giải trí, mua sắm); 20% = 4 triệu cho tiết kiệm và trả nợ. Đây là khung tham khảo, có thể điều chỉnh theo thực tế.' },
    ],
  },

  'H12GDCD-w15-quiz': {
    topic: 'Quản lí thu chi gia đình — Tiết kiệm và đầu tư',
    intro: 'Tuần cuối phần quản lý tài chính, các em phân biệt tiết kiệm với đầu tư, hiểu mối quan hệ rủi ro – lợi nhuận và các nguyên tắc đầu tư an toàn.',
    objectives: [
      'Phân biệt được tiết kiệm và đầu tư.',
      'Giải thích được mối quan hệ giữa rủi ro và lợi nhuận.',
      'Nêu được các nguyên tắc đầu tư an toàn.',
    ],
    theory: [
      { h: 'Tiết kiệm và đầu tư' },
      { ul: [
        'Tiết kiệm: để dành một phần thu nhập cho mục tiêu tương lai, an toàn nhưng sinh lời thấp.',
        'Đầu tư: dùng tiền để sinh lời (mua cổ phiếu, bất động sản, kinh doanh), lợi nhuận cao hơn nhưng kèm rủi ro lớn hơn.',
      ] },
      { h: 'Quan hệ rủi ro – lợi nhuận' },
      { p: 'Nguyên tắc cơ bản của tài chính: lợi nhuận càng cao thì rủi ro càng lớn. Không có kênh nào vừa \'lãi cao\' vừa \'an toàn tuyệt đối\' — lời mời gọi như vậy thường là lừa đảo.' },
      { h: 'Các kênh phổ biến' },
      { ul: [
        'An toàn, sinh lời thấp: gửi tiết kiệm ngân hàng, trái phiếu Chính phủ.',
        'Rủi ro cao, sinh lời cao: cổ phiếu, bất động sản, tiền điện tử, kinh doanh.',
      ] },
      { h: 'Nguyên tắc đầu tư an toàn' },
      { ul: [
        'Đa dạng hoá — \'không bỏ tất cả trứng vào một giỏ\'.',
        'Chỉ đầu tư bằng tiền nhàn rỗi, không vay nóng để đầu tư.',
        'Tìm hiểu kỹ, ưu tiên dài hạn, không nghe theo lời đồn.',
      ] },
      { note: 'Hãy cảnh giác với các \'kênh đầu tư siêu lợi nhuận\', đa cấp biến tướng hay \'thầy\' phím hàng trên mạng — đó thường là cạm bẫy lừa đảo tài chính.' },
    ],
    examples: [
      { q: 'Tình huống: Một người mời chị Lan đầu tư \'lãi 30%/tháng, không rủi ro\'. Chị Lan nên làm gì?', a: 'Chị Lan nên từ chối và cảnh giác. Lãi 30%/tháng là phi lý, vi phạm nguyên tắc rủi ro – lợi nhuận; lời hứa \'không rủi ro mà lãi siêu cao\' gần như chắc chắn là lừa đảo (mô hình Ponzi, đa cấp).' },
      { q: 'Tình huống: Anh Hùng dồn toàn bộ tiền tiết kiệm mua cổ phiếu của một công ty. Lời khuyên là gì?', a: 'Anh Hùng vi phạm nguyên tắc đa dạng hoá — \'bỏ hết trứng vào một giỏ\'. Nếu công ty đó sa sút, anh có thể mất trắng. Nên chia vốn ra nhiều kênh, giữ một phần ở kênh an toàn và chỉ đầu tư bằng tiền nhàn rỗi.' },
    ],
  },

  'H12GDCD-w16-quiz': {
    topic: 'Ôn tập HK1 — Phần kinh tế (1)',
    intro: 'Tuần này các em hệ thống lại các khái niệm lớn của phần kinh tế: phát triển kinh tế, hội nhập, bảo hiểm, an sinh xã hội, kế hoạch kinh doanh và CSR.',
    objectives: [
      'Hệ thống được các khái niệm cốt lõi phần kinh tế.',
      'Ghi nhớ được các con số, mốc quan trọng (WTO 2007, 5 chế độ BHXH, 4 trụ cột ASXH).',
      'Vận dụng kiến thức vào câu hỏi trắc nghiệm tổng hợp.',
    ],
    theory: [
      { h: 'Tăng trưởng và phát triển kinh tế' },
      { p: 'Tăng trưởng = tăng GDP/GNI. Phát triển = tăng trưởng + chuyển dịch cơ cấu kinh tế + tiến bộ, công bằng xã hội. Tăng trưởng là điều kiện cần nhưng chưa đủ để phát triển bền vững.' },
      { h: 'Hội nhập kinh tế quốc tế' },
      { ul: [
        'Việt Nam gia nhập WTO ngày 11/1/2007.',
        'Các hiệp định lớn: ASEAN, CPTPP, EVFTA, RCEP.',
        'FDI là đầu tư trực tiếp nước ngoài; ODA là hỗ trợ phát triển chính thức.',
      ] },
      { h: 'Bảo hiểm và an sinh xã hội' },
      { ul: [
        'BHXH bắt buộc có 5 chế độ: ốm đau, thai sản, tai nạn lao động – bệnh nghề nghiệp, hưu trí, tử tuất.',
        'An sinh xã hội có 4 trụ cột: việc làm – thu nhập, BHXH – BHYT, trợ giúp xã hội, dịch vụ xã hội cơ bản.',
      ] },
      { h: 'Kinh doanh và doanh nghiệp' },
      { ul: [
        'SWOT: phân tích điểm mạnh – điểm yếu – cơ hội – thách thức.',
        'CSR (mô hình Carroll) có 4 cấp độ: kinh tế, pháp lý, đạo đức, từ thiện.',
      ] },
      { note: 'Khi làm trắc nghiệm tổng hợp, hãy đọc kỹ từ khoá: \'phát triển\' khác \'tăng trưởng\', \'bắt buộc\' khác \'tự nguyện\', \'BHXH\' khác \'bảo hiểm thương mại\'.' },
    ],
    examples: [
      { q: 'Câu hỏi ôn: BHXH bắt buộc gồm mấy chế độ, kể tên?', a: 'Gồm 5 chế độ: ốm đau, thai sản, tai nạn lao động – bệnh nghề nghiệp, hưu trí, tử tuất. Đây là kiến thức hay được hỏi, các em cần nhớ chính xác con số 5.' },
      { q: 'Câu hỏi ôn: An sinh xã hội Việt Nam có mấy trụ cột?', a: '4 trụ cột: (1) việc làm – thu nhập – giảm nghèo; (2) BHXH – BHYT; (3) trợ giúp xã hội; (4) dịch vụ xã hội cơ bản (giáo dục, y tế, nhà ở, nước sạch, thông tin).' },
    ],
  },

  'H12GDCD-w17-quiz': {
    topic: 'Ôn tập HK1 — Phần kinh tế (2)',
    intro: 'Tuần này các em tiếp tục ôn phần quản lý tài chính cá nhân và các kiến thức vận dụng, chuẩn bị cho bài thi học kỳ I.',
    objectives: [
      'Hệ thống được kiến thức quản lí thu chi, tiết kiệm, đầu tư.',
      'Ghi nhớ được quỹ dự phòng và quy tắc 50/30/20.',
      'Nhận diện được hành vi đúng – sai trong kinh tế.',
    ],
    theory: [
      { h: 'Quản lí thu chi gia đình' },
      { ul: [
        'Nguyên tắc: chi ≤ thu, có tiết kiệm và dự phòng.',
        'Quỹ dự phòng nên bằng 3–6 tháng chi tiêu cơ bản.',
        'Quy tắc 50/30/20: 50% thiết yếu – 30% mong muốn – 20% tiết kiệm/trả nợ.',
      ] },
      { h: 'Tiết kiệm và đầu tư' },
      { ul: [
        'Tiết kiệm: an toàn, sinh lời thấp; đầu tư: lợi nhuận cao kèm rủi ro cao.',
        'Đầu tư an toàn: đa dạng hoá, dùng tiền nhàn rỗi, dài hạn, tìm hiểu kỹ.',
      ] },
      { h: 'Các chỉ tiêu, khái niệm quan trọng' },
      { ul: [
        'Tăng trưởng đo bằng GDP, GNI, GDP/người.',
        'FDI: đầu tư trực tiếp nước ngoài.',
        'Phát triển bền vững: cân bằng kinh tế – xã hội – môi trường.',
      ] },
      { h: 'Nhận diện hành vi' },
      { p: 'Hành vi tích cực: đóng thuế đầy đủ, sản phẩm an toàn, trả lương đúng hạn, tài trợ cộng đồng. Hành vi vi phạm: gây ô nhiễm, bóc lột lao động, trốn thuế, trục lợi bảo hiểm.' },
      { note: 'Đề thi thường có câu \'hành vi nào sau đây vi phạm/thể hiện trách nhiệm...\'. Hãy đối chiếu với pháp luật và chuẩn mực đạo đức để chọn đáp án.' },
    ],
    examples: [
      { q: 'Câu hỏi ôn: Quỹ dự phòng của gia đình nên bằng bao nhiêu?', a: 'Khoảng 3–6 tháng chi tiêu cơ bản. Quỹ này giúp gia đình vượt qua các rủi ro như ốm đau, mất việc mà không phải vay nợ, bảo đảm an toàn tài chính.' },
      { q: 'Câu hỏi ôn: Hành vi nào của doanh nghiệp là vi phạm trách nhiệm xã hội?', a: 'Gây ô nhiễm môi trường, bóc lột lao động, làm hàng giả, trốn thuế là các hành vi vi phạm CSR và pháp luật. Ngược lại, đóng thuế đủ, sản phẩm an toàn, tài trợ học bổng là biểu hiện trách nhiệm xã hội tốt.' },
    ],
  },

  'H12GDCD-w18-quiz': {
    topic: 'Thi học kỳ I — Kinh tế',
    intro: 'Tuần thi học kỳ I phần kinh tế. Các em vận dụng tổng hợp các kiến thức đã học để giải các tình huống thực tế về phát triển kinh tế, hội nhập, bảo hiểm và tài chính cá nhân.',
    objectives: [
      'Vận dụng tổng hợp kiến thức phần kinh tế vào tình huống.',
      'Phân tích đúng – sai các hành vi kinh tế.',
      'Trình bày được liên hệ trách nhiệm bản thân.',
    ],
    theory: [
      { h: 'Cấu trúc kiến thức cần nắm' },
      { ul: [
        'Tăng trưởng – phát triển – phát triển bền vững.',
        'Hội nhập kinh tế quốc tế: cơ hội, thách thức, các hiệp định.',
        'Bảo hiểm và an sinh xã hội: loại hình, chế độ, trụ cột.',
        'Lập kế hoạch kinh doanh, CSR, quản lý thu chi gia đình.',
      ] },
      { h: 'Phát triển bền vững' },
      { p: 'Phát triển bền vững là đáp ứng nhu cầu hiện tại mà không làm tổn hại đến thế hệ tương lai, dựa trên ba trụ cột kinh tế – xã hội – môi trường. Đây là tư tưởng xuyên suốt phần kinh tế.' },
      { h: 'Liên hệ trách nhiệm bản thân' },
      { ul: [
        'Tham gia BHYT học sinh, thực hiện trách nhiệm an sinh.',
        'Học ngoại ngữ, kỹ năng để hội nhập; ưu tiên dùng hàng Việt.',
        'Tập thói quen quản lý chi tiêu, tiết kiệm hợp lý.',
      ] },
      { h: 'Lưu ý làm bài' },
      { p: 'Đọc kỹ tình huống, xác định từ khoá, loại trừ phương án sai. Với câu tính toán (lãi vay, cân đối thu chi) cần làm cẩn thận từng bước.' },
      { note: 'Một gia đình chi luôn lớn hơn thu sẽ tích luỹ nợ và mất an toàn tài chính — đây là dạng câu vận dụng hay gặp.' },
    ],
    examples: [
      { q: 'Câu hỏi ôn: Học sinh tham gia BHYT là thực hiện điều gì?', a: 'Là thực hiện trách nhiệm với an sinh xã hội và bảo vệ sức khoẻ bản thân. BHYT học sinh là hình thức BHYT bắt buộc, giúp được chi trả chi phí khám chữa bệnh và chia sẻ rủi ro với cộng đồng.' },
      { q: 'Câu hỏi ôn: Khi lập kế hoạch kinh doanh, nội dung nào tuyệt đối không được thiếu?', a: 'Phân tích thị trường, sản phẩm, kế hoạch tài chính và dự trù rủi ro. Logo đẹp hay tên kêu chỉ là phụ; thiếu các nội dung cốt lõi thì kế hoạch không khả thi và dễ thất bại.' },
    ],
  },

  // ──────────────── HK2 — PHÁP LUẬT ────────────────
  'H12GDCD-w19-quiz': {
    topic: 'Quyền và nghĩa vụ trong kinh doanh',
    intro: 'Mở đầu phần Giáo dục pháp luật, các em tìm hiểu quyền tự do kinh doanh — một quyền hiến định — cùng những nghĩa vụ đi kèm của người kinh doanh.',
    objectives: [
      'Nêu được quyền tự do kinh doanh theo Hiến pháp 2013.',
      'Trình bày được nghĩa vụ của người kinh doanh.',
      'Phân biệt được hành vi kinh doanh hợp pháp và trái pháp luật.',
    ],
    theory: [
      { h: 'Quyền tự do kinh doanh' },
      { p: 'Theo Điều 33 Hiến pháp 2013, mọi người có quyền tự do kinh doanh trong những ngành nghề mà pháp luật không cấm. Quyền này bao gồm: tự do lựa chọn ngành nghề, loại hình, quy mô, hình thức tổ chức kinh doanh.' },
      { h: 'Ngành nghề cấm kinh doanh' },
      { ul: [
        'Mua bán người, mô, bộ phận cơ thể người.',
        'Kinh doanh ma tuý, mại dâm.',
        'Mua bán vũ khí, vật liệu nổ trái phép.',
        'Các ngành nghề bị cấm khác theo Luật Đầu tư.',
      ] },
      { h: 'Nghĩa vụ của người kinh doanh' },
      { ul: [
        'Đăng ký kinh doanh theo quy định (hộ kinh doanh đăng ký tại cơ quan cấp huyện).',
        'Kê khai và nộp thuế đầy đủ.',
        'Bảo vệ quyền lợi người tiêu dùng, bảo đảm chất lượng hàng hoá.',
        'Tuân thủ pháp luật về lao động, môi trường, cạnh tranh.',
      ] },
      { note: 'Tự do kinh doanh không phải là \'muốn làm gì cũng được\'. Đó là tự do trong khuôn khổ pháp luật — phải đăng ký, nộp thuế và không kinh doanh ngành nghề bị cấm.' },
    ],
    examples: [
      { q: 'Tình huống: Bà Năm mở cửa hàng tạp hoá, có đăng ký kinh doanh và nộp thuế đầy đủ. Hành vi này thế nào?', a: 'Bà Năm thực hiện đúng quyền tự do kinh doanh và làm tròn nghĩa vụ pháp lý (đăng ký, nộp thuế). Đây là hoạt động kinh doanh hợp pháp, được pháp luật bảo vệ.' },
      { q: 'Tình huống: Ông A buôn bán hàng giả không đăng ký, không nộp thuế. Em đánh giá thế nào?', a: 'Ông A vi phạm pháp luật: bán hàng giả xâm phạm quyền lợi người tiêu dùng, không đăng ký và trốn thuế là trốn tránh nghĩa vụ. Ông A có thể bị xử phạt hành chính hoặc truy cứu trách nhiệm hình sự.' },
    ],
  },

  'H12GDCD-w20-quiz': {
    topic: 'Nghĩa vụ nộp thuế',
    intro: 'Thuế là nguồn sống của ngân sách quốc gia. Tuần này các em tìm hiểu thuế là gì, các loại thuế chính và vì sao nộp thuế là nghĩa vụ thiêng liêng của công dân.',
    objectives: [
      'Nêu được khái niệm thuế và các loại thuế chính ở Việt Nam.',
      'Hiểu được thuế TNCN và mức giảm trừ gia cảnh.',
      'Nhận thức được hậu quả của hành vi trốn thuế.',
    ],
    theory: [
      { h: 'Thuế là gì' },
      { p: 'Thuế là khoản nộp bắt buộc vào ngân sách Nhà nước theo quy định của pháp luật, không hoàn trả trực tiếp ngang giá. Đây là nguồn thu chủ yếu của ngân sách nhà nước.' },
      { h: 'Các loại thuế chính' },
      { ul: [
        'Thuế giá trị gia tăng (GTGT) — đánh trên giá trị tăng thêm của hàng hoá, dịch vụ.',
        'Thuế thu nhập doanh nghiệp (TNDN).',
        'Thuế thu nhập cá nhân (TNCN).',
        'Thuế tiêu thụ đặc biệt, thuế xuất nhập khẩu, thuế tài nguyên...',
      ] },
      { h: 'Thuế thu nhập cá nhân' },
      { p: 'TNCN áp dụng cho cá nhân có thu nhập chịu thuế, sau khi trừ các khoản giảm trừ. Theo quy định hiện hành (Nghị quyết 954/2020), mức giảm trừ gia cảnh cho bản thân là 11 triệu đồng/tháng và 4,4 triệu đồng/tháng cho mỗi người phụ thuộc.' },
      { h: 'Vai trò của thuế' },
      { ul: [
        'Là nguồn thu chủ yếu của ngân sách nhà nước.',
        'Dùng để chi cho quốc phòng, an ninh, giáo dục, y tế, an sinh xã hội.',
        'Là công cụ điều tiết kinh tế, thu hẹp khoảng cách giàu nghèo.',
      ] },
      { note: 'Trốn thuế là hành vi vi phạm pháp luật, bị xử phạt hành chính hoặc truy cứu trách nhiệm hình sự theo Bộ luật Hình sự — tuỳ số tiền trốn và tính chất.' },
    ],
    examples: [
      { q: 'Tình huống: Anh Bình có thu nhập 12 triệu/tháng, chưa có người phụ thuộc. Anh có phải nộp thuế TNCN không?', a: 'Sau khi trừ giảm trừ gia cảnh bản thân 11 triệu/tháng, thu nhập tính thuế chỉ còn 1 triệu (chưa kể giảm trừ BHXH, BHYT bắt buộc). Phần này có thể chịu thuế suất thấp nhất, nhưng nếu trừ thêm các khoản bảo hiểm thì có thể không phải nộp. Điểm mấu chốt là chỉ thu nhập sau giảm trừ mới bị tính thuế.' },
      { q: 'Tình huống: Một cửa hàng giấu bớt doanh thu để nộp ít thuế hơn. Hậu quả là gì?', a: 'Đây là hành vi trốn thuế — vi phạm pháp luật. Cửa hàng bị truy thu, phạt tiền; nếu số tiền trốn lớn có thể bị truy cứu trách nhiệm hình sự. Trốn thuế làm thất thu ngân sách, ảnh hưởng tới chi tiêu công.' },
    ],
  },

  'H12GDCD-w21-quiz': {
    topic: 'Quyền sở hữu tài sản — Khái niệm',
    intro: 'Quyền sở hữu là quyền cơ bản của công dân. Tuần này các em tìm hiểu ba quyền năng của chủ sở hữu và các hình thức sở hữu ở Việt Nam.',
    objectives: [
      'Nêu được ba quyền năng của quyền sở hữu theo Bộ luật Dân sự 2015.',
      'Phân biệt được chiếm hữu, sử dụng, định đoạt.',
      'Kể được các hình thức sở hữu và chế độ sở hữu đất đai.',
    ],
    theory: [
      { h: 'Quyền sở hữu là gì' },
      { p: 'Theo Bộ luật Dân sự 2015, quyền sở hữu bao gồm ba quyền năng: quyền chiếm hữu, quyền sử dụng và quyền định đoạt tài sản của chủ sở hữu.' },
      { h: 'Ba quyền năng' },
      { ul: [
        'Quyền chiếm hữu: nắm giữ, quản lý tài sản.',
        'Quyền sử dụng: khai thác công dụng, hưởng hoa lợi, lợi tức từ tài sản.',
        'Quyền định đoạt: quyết định số phận pháp lý của tài sản — bán, tặng cho, để lại thừa kế, tiêu dùng, tiêu huỷ.',
      ] },
      { h: 'Các hình thức sở hữu' },
      { ul: [
        'Sở hữu toàn dân (do Nhà nước đại diện chủ sở hữu).',
        'Sở hữu riêng (cá nhân, pháp nhân).',
        'Sở hữu chung (của nhiều chủ thể).',
      ] },
      { h: 'Sở hữu đất đai' },
      { p: 'Theo Điều 53 Hiến pháp 2013, đất đai thuộc sở hữu toàn dân do Nhà nước đại diện chủ sở hữu và thống nhất quản lý. Người dân được Nhà nước giao đất, cho thuê đất, công nhận quyền sử dụng đất — tức là có quyền sử dụng, không phải sở hữu đất.' },
      { note: 'Phân biệt rõ \'quyền sử dụng đất\' (người dân có) với \'sở hữu đất\' (thuộc toàn dân). Đây là điểm dễ nhầm trong đề thi.' },
    ],
    examples: [
      { q: 'Tình huống: Ông Tư cho thuê căn nhà của mình và nhận tiền thuê. Ông Tư đang thực hiện quyền năng nào?', a: 'Ông Tư thực hiện quyền sử dụng (khai thác công dụng, hưởng lợi tức từ tài sản là tiền cho thuê). Nếu ông bán hẳn căn nhà thì đó là quyền định đoạt.' },
      { q: 'Tình huống: Gia đình bà Hoa được cấp Giấy chứng nhận quyền sử dụng đất. Bà có sở hữu mảnh đất đó không?', a: 'Bà Hoa có quyền sử dụng đất, không phải sở hữu đất. Đất đai thuộc sở hữu toàn dân do Nhà nước đại diện; bà được sử dụng, chuyển nhượng quyền sử dụng theo quy định pháp luật.' },
    ],
  },

  'H12GDCD-w22-quiz': {
    topic: 'Quyền sở hữu tài sản — Bảo vệ',
    intro: 'Tuần này các em tìm hiểu nghĩa vụ tôn trọng tài sản người khác, cách bảo vệ quyền sở hữu và quy định về thừa kế.',
    objectives: [
      'Nêu được nghĩa vụ tôn trọng tài sản người khác.',
      'Trình bày được cách chủ sở hữu bảo vệ quyền của mình.',
      'Phân biệt được thừa kế theo di chúc và theo pháp luật.',
    ],
    theory: [
      { h: 'Nghĩa vụ tôn trọng tài sản người khác' },
      { p: 'Mọi người có nghĩa vụ không xâm phạm, không lấy, không phá huỷ, không chiếm giữ trái phép tài sản hợp pháp của người khác.' },
      { h: 'Bảo vệ quyền sở hữu' },
      { ul: [
        'Yêu cầu người chiếm giữ trái phép trả lại tài sản.',
        'Đòi bồi thường thiệt hại.',
        'Khởi kiện ra Toà án khi quyền bị xâm phạm.',
      ] },
      { p: 'Chủ sở hữu được pháp luật bảo vệ nhưng phải dùng biện pháp hợp pháp, không được tự xử bằng bạo lực.' },
      { h: 'Quyền thừa kế' },
      { ul: [
        'Thừa kế là việc chuyển di sản của người chết cho người còn sống.',
        'Người để lại di sản có quyền lập di chúc định đoạt tài sản hợp pháp của mình.',
        'Khi không có di chúc (hoặc di chúc không hợp pháp), di sản được chia theo pháp luật theo hàng thừa kế thứ nhất, thứ hai, thứ ba.',
      ] },
      { note: 'Nhặt được tài sản của người khác mà cố tình giấu để chiếm đoạt là hành vi chiếm giữ trái phép tài sản — vi phạm pháp luật, có thể bị truy cứu trách nhiệm hình sự.' },
    ],
    examples: [
      { q: 'Tình huống: A nhặt được ví tiền của B trên đường nhưng giấu để dùng riêng. Hành vi của A đúng hay sai?', a: 'Sai — A đã chiếm giữ trái phép tài sản của người khác, vi phạm Bộ luật Dân sự và có thể bị xử lý hình sự nếu giá trị lớn. Đúng ra A phải tìm cách trả lại hoặc giao nộp cho cơ quan có thẩm quyền.' },
      { q: 'Tình huống: Ông C mất, không để lại di chúc. Di sản của ông được chia thế nào?', a: 'Vì không có di chúc, di sản được chia theo pháp luật. Hàng thừa kế thứ nhất gồm vợ/chồng, cha mẹ, con của người chết được hưởng phần bằng nhau; nếu không còn ai ở hàng thứ nhất mới đến hàng thứ hai, thứ ba.' },
    ],
  },

  'H12GDCD-w23-quiz': {
    topic: 'Hôn nhân và gia đình — Khái niệm',
    intro: 'Tuần này các em tìm hiểu chế định hôn nhân theo Luật Hôn nhân và gia đình 2014: điều kiện kết hôn, nguyên tắc và các trường hợp bị cấm.',
    objectives: [
      'Nêu được khái niệm hôn nhân và điều kiện kết hôn.',
      'Trình bày được các nguyên tắc cơ bản của hôn nhân.',
      'Nhận diện được các trường hợp cấm kết hôn và tảo hôn.',
    ],
    theory: [
      { h: 'Hôn nhân là gì' },
      { p: 'Theo Luật Hôn nhân và gia đình 2014, hôn nhân là quan hệ giữa vợ và chồng sau khi kết hôn. Kết hôn là việc nam, nữ xác lập quan hệ vợ chồng theo quy định của pháp luật.' },
      { h: 'Điều kiện kết hôn' },
      { ul: [
        'Nam từ đủ 20 tuổi, nữ từ đủ 18 tuổi trở lên.',
        'Việc kết hôn do nam, nữ tự nguyện quyết định.',
        'Không bị mất năng lực hành vi dân sự.',
        'Không thuộc các trường hợp cấm kết hôn.',
      ] },
      { h: 'Nguyên tắc cơ bản của hôn nhân' },
      { p: 'Hôn nhân tự nguyện, tiến bộ, một vợ một chồng, vợ chồng bình đẳng — đây là các nguyên tắc nền tảng.' },
      { h: 'Các trường hợp cấm kết hôn' },
      { ul: [
        'Người đang có vợ hoặc đang có chồng.',
        'Kết hôn giữa những người cùng dòng máu về trực hệ; có họ trong phạm vi ba đời.',
        'Kết hôn giả tạo, cưỡng ép, lừa dối, cản trở kết hôn.',
      ] },
      { note: 'Tảo hôn (lấy vợ/chồng khi một hoặc cả hai bên chưa đủ tuổi) là vi phạm pháp luật. Đăng ký kết hôn được thực hiện tại UBND cấp xã nơi cư trú của một trong hai bên.' },
    ],
    examples: [
      { q: 'Tình huống: Anh M 21 tuổi muốn cưới chị N 17 tuổi. Họ có đủ điều kiện kết hôn không?', a: 'Chưa. Chị N mới 17 tuổi, chưa đủ 18 tuổi theo luật, nên việc kết hôn là tảo hôn — vi phạm pháp luật. Phải đợi chị N đủ 18 tuổi mới được đăng ký kết hôn hợp pháp.' },
      { q: 'Tình huống: Một người đang có vợ nhưng lại muốn cưới thêm người khác. Pháp luật quy định thế nào?', a: 'Pháp luật cấm — đây là vi phạm nguyên tắc một vợ một chồng. Người đang có vợ/chồng mà chung sống như vợ chồng với người khác là hành vi vi phạm Luật Hôn nhân và gia đình, có thể bị xử phạt.' },
    ],
  },

  'H12GDCD-w24-quiz': {
    topic: 'Hôn nhân và gia đình — Quyền nghĩa vụ',
    intro: 'Tuần này các em tìm hiểu quan hệ tài sản, quyền và nghĩa vụ giữa vợ chồng, giữa cha mẹ và con, cùng vấn đề phòng chống bạo lực gia đình.',
    objectives: [
      'Phân biệt được tài sản chung và tài sản riêng của vợ chồng.',
      'Nêu được quyền và nghĩa vụ giữa vợ chồng, cha mẹ và con.',
      'Nhận thức được pháp luật về phòng, chống bạo lực gia đình.',
    ],
    theory: [
      { h: 'Quan hệ tài sản vợ chồng' },
      { ul: [
        'Tài sản chung: tài sản tạo ra trong thời kỳ hôn nhân, thu nhập do lao động, kinh doanh, hoa lợi từ tài sản chung.',
        'Tài sản riêng: tài sản có trước khi kết hôn, được thừa kế hoặc tặng cho riêng, đồ dùng phục vụ nhu cầu thiết yếu riêng.',
      ] },
      { h: 'Quyền và nghĩa vụ vợ chồng' },
      { p: 'Vợ chồng bình đẳng, có nghĩa vụ thương yêu, chung thuỷ, tôn trọng, quan tâm, chăm sóc, giúp đỡ nhau; cùng chia sẻ, thực hiện công việc gia đình.' },
      { h: 'Quan hệ cha mẹ và con' },
      { ul: [
        'Cha mẹ có nghĩa vụ yêu thương, nuôi dưỡng, chăm sóc, giáo dục con, không phân biệt đối xử.',
        'Con có nghĩa vụ yêu quý, kính trọng, biết ơn, hiếu thảo, phụng dưỡng cha mẹ.',
      ] },
      { h: 'Phòng chống bạo lực gia đình' },
      { p: 'Bạo lực gia đình là hành vi cố ý gây tổn hại về thể chất, tinh thần, kinh tế cho thành viên gia đình. Theo Luật Phòng, chống bạo lực gia đình 2022, người vi phạm bị xử phạt hành chính hoặc truy cứu trách nhiệm hình sự.' },
      { note: 'Bạo lực gia đình không phải \'chuyện riêng trong nhà\'. Pháp luật bảo vệ nạn nhân và xử lý nghiêm người gây bạo lực.' },
    ],
    examples: [
      { q: 'Tình huống: Trong thời kỳ hôn nhân, vợ chồng anh H mua một căn nhà bằng thu nhập chung. Căn nhà là tài sản gì?', a: 'Đây là tài sản chung của vợ chồng vì được tạo lập trong thời kỳ hôn nhân bằng thu nhập chung. Khi định đoạt (bán, thế chấp) phải có sự đồng ý của cả hai vợ chồng.' },
      { q: 'Tình huống: Người chồng thường xuyên đánh đập, lăng mạ vợ. Đây có phải chuyện riêng của gia đình không?', a: 'Không. Đây là hành vi bạo lực gia đình, vi phạm Luật Phòng, chống bạo lực gia đình 2022. Người vợ có quyền yêu cầu bảo vệ; người chồng có thể bị xử phạt hành chính hoặc truy cứu trách nhiệm hình sự.' },
    ],
  },

  'H12GDCD-w25-quiz': {
    topic: 'Quyền học tập của công dân',
    intro: 'Học tập, sáng tạo và phát triển là những quyền cơ bản giúp con người hoàn thiện. Tuần này các em tìm hiểu nội dung và ý nghĩa của các quyền này.',
    objectives: [
      'Nêu được nội dung quyền học tập của công dân.',
      'Trình bày được quyền sáng tạo và quyền phát triển.',
      'Nhận diện được hành vi vi phạm quyền học tập.',
    ],
    theory: [
      { h: 'Cơ sở pháp lý' },
      { p: 'Quyền học tập được quy định trong Hiến pháp 2013 (Điều 39) và Luật Giáo dục 2019: học tập là quyền và nghĩa vụ của công dân.' },
      { h: 'Nội dung quyền học tập' },
      { ul: [
        'Học không hạn chế: học từ tiểu học đến đại học, sau đại học.',
        'Học bất cứ ngành nghề nào phù hợp với năng lực, sở thích.',
        'Học thường xuyên, học suốt đời.',
        'Bình đẳng về cơ hội học tập, không phân biệt dân tộc, giới tính, hoàn cảnh.',
      ] },
      { h: 'Quyền sáng tạo' },
      { p: 'Công dân có quyền tự do nghiên cứu khoa học – công nghệ, sáng tạo văn học – nghệ thuật và được pháp luật bảo hộ quyền tác giả, quyền sở hữu trí tuệ.' },
      { h: 'Quyền được phát triển' },
      { p: 'Công dân được sống trong môi trường an toàn, được chăm sóc sức khoẻ, được hưởng thụ đời sống văn hoá, vui chơi giải trí để phát triển toàn diện.' },
      { note: 'Nhà nước thực hiện phổ cập giáo dục bắt buộc đối với tiểu học, đầu tư cho giáo dục và ưu tiên vùng khó khăn để bảo đảm quyền học tập cho mọi người.' },
    ],
    examples: [
      { q: 'Tình huống: Cha mẹ bắt con gái nghỉ học lớp 8 để đi làm thuê. Hành vi này thế nào?', a: 'Đây là hành vi vi phạm quyền học tập của trẻ em, cản trở con đi học. Cha mẹ có nghĩa vụ tạo điều kiện cho con học tập; bắt con nghỉ học để lao động sớm là vi phạm pháp luật.' },
      { q: 'Tình huống: Một học sinh sáng chế ra thiết bị mới và muốn được công nhận. Quyền nào bảo vệ em ấy?', a: 'Đây là quyền sáng tạo của công dân. Sản phẩm sáng chế của em được pháp luật bảo hộ quyền tác giả, quyền sở hữu trí tuệ; em có thể đăng ký để được công nhận và bảo vệ.' },
    ],
  },

  'H12GDCD-w26-quiz': {
    topic: 'Bảo vệ chăm sóc sức khoẻ',
    intro: 'Sức khoẻ là vốn quý nhất. Tuần này các em tìm hiểu quyền được chăm sóc sức khoẻ, cơ sở pháp lý và chính sách bảo hiểm y tế.',
    objectives: [
      'Nêu được quyền và cơ sở pháp lý về chăm sóc sức khoẻ.',
      'Hiểu được chính sách BHYT toàn dân và quyền lợi khi khám đúng tuyến.',
      'Nhận diện được hành vi vi phạm quyền chăm sóc sức khoẻ.',
    ],
    theory: [
      { h: 'Quyền được chăm sóc sức khoẻ' },
      { p: 'Quyền được bảo vệ, chăm sóc sức khoẻ gắn với quyền sống — quyền nhân thân cơ bản. Mọi người có quyền được hưởng các dịch vụ y tế cơ bản và bình đẳng trong chăm sóc sức khoẻ.' },
      { h: 'Cơ sở pháp lý' },
      { ul: [
        'Hiến pháp 2013.',
        'Luật Khám bệnh, chữa bệnh.',
        'Luật Bảo hiểm y tế.',
      ] },
      { h: 'Chính sách bảo hiểm y tế' },
      { ul: [
        'Việt Nam thực hiện lộ trình BHYT toàn dân — tiến tới mọi người dân đều tham gia BHYT.',
        'Trẻ em dưới 6 tuổi được cấp thẻ BHYT và khám chữa bệnh miễn phí.',
        'Người tham gia BHYT khi khám đúng tuyến được hưởng phần lớn chi phí trong phạm vi quyền lợi (thông thường khoảng 80% với người lao động).',
      ] },
      { h: 'Hành vi vi phạm' },
      { p: 'Hành nghề y trái phép, bán thuốc giả, từ chối cấp cứu người bệnh là những hành vi xâm phạm quyền chăm sóc sức khoẻ, bị pháp luật xử lý nghiêm.' },
      { note: 'Tham gia BHYT vừa bảo vệ bản thân vừa chia sẻ rủi ro với cộng đồng, góp phần vào lộ trình BHYT toàn dân.' },
    ],
    examples: [
      { q: 'Tình huống: Bé An 4 tuổi bị ốm, gia đình đưa đi viện. Bé có được hưởng chính sách gì?', a: 'Bé An dưới 6 tuổi nên được cấp thẻ BHYT và khám chữa bệnh miễn phí theo chính sách dành cho trẻ em. Đây là biểu hiện quyền được chăm sóc sức khoẻ của trẻ em được Nhà nước bảo đảm.' },
      { q: 'Tình huống: Một người không có chứng chỉ hành nghề vẫn mở phòng khám \'chui\'. Hành vi này vi phạm gì?', a: 'Đây là hành nghề y trái phép — vi phạm Luật Khám bệnh, chữa bệnh, xâm phạm quyền được chăm sóc sức khoẻ an toàn của người dân. Người vi phạm bị xử phạt, đình chỉ và có thể bị truy cứu trách nhiệm hình sự nếu gây hậu quả.' },
    ],
  },

  'H12GDCD-w27-quiz': {
    topic: 'An sinh xã hội theo pháp luật',
    intro: 'Tuần này các em tìm hiểu hệ thống pháp luật về an sinh xã hội và sự bảo vệ của pháp luật đối với các nhóm yếu thế trong xã hội.',
    objectives: [
      'Kể được các luật về an sinh xã hội.',
      'Nêu được đối tượng được trợ giúp xã hội và chính sách với họ.',
      'Nhận diện được hành vi vi phạm quyền của nhóm yếu thế.',
    ],
    theory: [
      { h: 'Pháp luật về an sinh xã hội' },
      { ul: [
        'Luật Bảo hiểm xã hội, Luật Bảo hiểm y tế.',
        'Luật Việc làm.',
        'Luật Người cao tuổi.',
        'Luật Trẻ em 2016.',
        'Luật Người khuyết tật.',
      ] },
      { h: 'Đối tượng được trợ giúp xã hội' },
      { p: 'Là những người có hoàn cảnh đặc biệt khó khăn: người cao tuổi cô đơn không nơi nương tựa, trẻ em mồ côi, người khuyết tật nặng, nạn nhân thiên tai... được hưởng trợ cấp xã hội và các hỗ trợ khác.' },
      { h: 'Một số chính sách cụ thể' },
      { ul: [
        'Người từ đủ 80 tuổi không có lương hưu được trợ cấp xã hội hằng tháng và cấp thẻ BHYT.',
        'Trẻ em được bảo vệ trước hành vi xâm hại, bạo lực, bóc lột, lao động trẻ em.',
        'Người khuyết tật được hỗ trợ học tập, việc làm, tiếp cận công trình công cộng.',
      ] },
      { h: 'Hành vi vi phạm' },
      { p: 'Phân biệt đối xử, từ chối tuyển dụng vì khuyết tật, bóc lột lao động trẻ em, ngược đãi người già là những hành vi vi phạm pháp luật về an sinh xã hội.' },
      { note: 'Công dân thực hiện trách nhiệm bằng cách tham gia, đóng góp các chính sách an sinh, không khai khống, không trục lợi và giúp đỡ nhóm yếu thế.' },
    ],
    examples: [
      { q: 'Tình huống: Một công ty từ chối nhận anh K vào làm chỉ vì anh bị khuyết tật chân, dù anh đủ năng lực. Hành vi này thế nào?', a: 'Đây là hành vi phân biệt đối xử với người khuyết tật — vi phạm Luật Người khuyết tật. Người khuyết tật có quyền bình đẳng về việc làm; công ty không được từ chối tuyển dụng chỉ vì khuyết tật khi họ đủ năng lực.' },
      { q: 'Tình huống: Cụ bà 85 tuổi sống một mình, không lương hưu. Cụ được hưởng chính sách gì?', a: 'Theo Luật Người cao tuổi, cụ bà thuộc đối tượng được trợ cấp xã hội hằng tháng và được cấp thẻ BHYT miễn phí. Đây là chính sách an sinh dành cho người cao tuổi không có nguồn thu nhập ổn định.' },
    ],
  },

  'H12GDCD-w28-quiz': {
    topic: 'Bảo vệ di sản văn hoá và môi trường',
    intro: 'Di sản văn hoá và môi trường là tài sản chung của cả dân tộc và nhân loại. Tuần này các em tìm hiểu pháp luật về bảo vệ di sản văn hoá và môi trường.',
    objectives: [
      'Phân biệt được di sản văn hoá vật thể và phi vật thể.',
      'Nêu được trách nhiệm của công dân trong bảo vệ di sản và môi trường.',
      'Nhận diện được hành vi vi phạm pháp luật về di sản, môi trường.',
    ],
    theory: [
      { h: 'Di sản văn hoá' },
      { ul: [
        'Di sản văn hoá vật thể: di tích lịch sử – văn hoá, danh lam thắng cảnh, di vật, cổ vật, bảo vật quốc gia.',
        'Di sản văn hoá phi vật thể: tiếng nói, chữ viết, lễ hội, dân ca, nghề thủ công truyền thống...',
      ] },
      { h: 'Pháp luật về di sản' },
      { p: 'Luật Di sản văn hoá (ban hành năm 2001, sửa đổi năm 2009) quy định việc bảo vệ và phát huy giá trị di sản. Mọi hành vi lấn chiếm, phá hoại di tích, mua bán cổ vật trái phép đều bị nghiêm cấm.' },
      { h: 'Bảo vệ môi trường' },
      { p: 'Theo Luật Bảo vệ môi trường 2020, bảo vệ môi trường là quyền, nghĩa vụ và trách nhiệm của mọi tổ chức, cá nhân — không chỉ riêng Nhà nước.' },
      { h: 'Hành vi vi phạm' },
      { ul: [
        'Xả thải vượt quy chuẩn cho phép.',
        'Chặt phá rừng, săn bắt động vật hoang dã trái phép.',
        'Lấn chiếm, xâm phạm di tích; buôn bán cổ vật trái phép.',
      ] },
      { note: 'Trách nhiệm của công dân: giữ gìn, phát huy giá trị di sản; phân loại rác, tiết kiệm tài nguyên; thông báo cho cơ quan chức năng khi phát hiện vi phạm.' },
    ],
    examples: [
      { q: 'Tình huống: Một nhóm người tự ý đào bới khu di tích để tìm cổ vật đem bán. Hành vi này thế nào?', a: 'Đây là hành vi xâm phạm di tích và mua bán cổ vật trái phép — vi phạm Luật Di sản văn hoá. Họ có thể bị xử phạt hành chính hoặc truy cứu trách nhiệm hình sự, cổ vật bị tịch thu.' },
      { q: 'Tình huống: Một nhà máy lén xả nước thải chưa xử lý ra sông. Hành vi này vi phạm luật nào?', a: 'Vi phạm Luật Bảo vệ môi trường 2020. Xả thải vượt quy chuẩn là hành vi gây ô nhiễm; nhà máy bị xử phạt nặng, buộc khắc phục hậu quả, thậm chí đình chỉ hoạt động và bồi thường thiệt hại.' },
    ],
  },

  'H12GDCD-w29-quiz': {
    topic: 'Bảo vệ tài nguyên thiên nhiên',
    intro: 'Tài nguyên thiên nhiên là nền tảng của sự sống và phát triển. Tuần này các em tìm hiểu các loại tài nguyên, pháp luật bảo vệ và trách nhiệm công dân.',
    objectives: [
      'Phân loại được tài nguyên tái tạo và không tái tạo.',
      'Nêu được pháp luật bảo vệ tài nguyên nước, khoáng sản, rừng.',
      'Xác định được trách nhiệm của công dân với tài nguyên thiên nhiên.',
    ],
    theory: [
      { h: 'Tài nguyên thiên nhiên gồm gì' },
      { p: 'Tài nguyên thiên nhiên bao gồm đất, nước, khoáng sản, rừng, biển, không khí, đa dạng sinh học — là cơ sở vật chất cho sản xuất và đời sống.' },
      { h: 'Phân loại tài nguyên' },
      { ul: [
        'Tài nguyên tái tạo: năng lượng mặt trời, gió, nước, sinh khối — có thể phục hồi nếu khai thác hợp lý.',
        'Tài nguyên không tái tạo: khoáng sản (than, dầu mỏ, kim loại) — có hạn, dùng hết là cạn kiệt.',
      ] },
      { h: 'Pháp luật bảo vệ tài nguyên' },
      { ul: [
        'Luật Tài nguyên nước: cấm khai thác trái phép, xả thải gây ô nhiễm nguồn nước.',
        'Luật Khoáng sản: cấm khai thác lậu, buộc hoàn thổ, bảo vệ môi trường.',
        'Luật Lâm nghiệp, Luật Đa dạng sinh học: bảo vệ rừng, động vật hoang dã.',
      ] },
      { h: 'Trách nhiệm công dân' },
      { ul: [
        'Sử dụng tài nguyên tiết kiệm, hợp lý.',
        'Không tham gia khai thác, buôn bán trái phép.',
        'Tố giác hành vi vi phạm pháp luật về tài nguyên.',
      ] },
      { note: 'Với tài nguyên không tái tạo, phải khai thác và sử dụng hết sức tiết kiệm vì chúng không thể phục hồi — đây là yêu cầu của phát triển bền vững.' },
    ],
    examples: [
      { q: 'Tình huống: Một nhóm người khai thác cát trái phép trên sông, gây sạt lở bờ. Hành vi này vi phạm luật nào?', a: 'Vi phạm Luật Khoáng sản và Luật Tài nguyên nước — khai thác trái phép, gây hậu quả về môi trường. Họ bị xử phạt, tịch thu phương tiện, buộc khắc phục và có thể bị truy cứu trách nhiệm hình sự.' },
      { q: 'Tình huống: Than đá và năng lượng mặt trời khác nhau ở điểm gì về khả năng tái tạo?', a: 'Than đá là tài nguyên không tái tạo — có hạn, dùng hết là cạn kiệt, cần tiết kiệm tối đa. Năng lượng mặt trời là tài nguyên tái tạo — vô tận, thân thiện môi trường, nên được khuyến khích phát triển.' },
    ],
  },

  'H12GDCD-w30-quiz': {
    topic: 'Pháp luật quốc tế cơ bản',
    intro: 'Tuần này các em bước vào lĩnh vực pháp luật quốc tế: khái niệm, các nguyên tắc cơ bản và mối quan hệ với pháp luật trong nước.',
    objectives: [
      'Nêu được khái niệm pháp luật quốc tế.',
      'Trình bày được các nguyên tắc cơ bản của pháp luật quốc tế.',
      'Giải thích được mối quan hệ giữa pháp luật quốc tế và pháp luật trong nước.',
    ],
    theory: [
      { h: 'Pháp luật quốc tế là gì' },
      { p: 'Pháp luật quốc tế là hệ thống các nguyên tắc và quy phạm pháp luật điều chỉnh quan hệ giữa các quốc gia và các chủ thể khác của luật quốc tế (tổ chức quốc tế...), do các chủ thể này thoả thuận xây dựng nên.' },
      { h: 'Các nguyên tắc cơ bản' },
      { ul: [
        'Bình đẳng về chủ quyền giữa các quốc gia.',
        'Không can thiệp vào công việc nội bộ của nhau.',
        'Giải quyết tranh chấp bằng biện pháp hoà bình.',
        'Cấm dùng vũ lực hoặc đe doạ dùng vũ lực.',
        'Tận tâm, thiện chí thực hiện cam kết quốc tế.',
      ] },
      { h: 'Điều ước quốc tế' },
      { p: 'Điều ước quốc tế là thoả thuận bằng văn bản giữa các chủ thể luật quốc tế, có giá trị pháp lý ràng buộc. Một số điều ước được \'nội luật hoá\' thành pháp luật trong nước.' },
      { h: 'Vài mốc về Liên hợp quốc' },
      { ul: [
        'Liên hợp quốc thành lập ngày 24/10/1945.',
        'Việt Nam là thành viên Liên hợp quốc từ ngày 20/9/1977.',
      ] },
      { note: 'Pháp luật quốc tế và pháp luật trong nước có mối quan hệ bổ sung, hỗ trợ nhau, không đối lập. Việt Nam tôn trọng và thực hiện nghiêm túc các cam kết quốc tế.' },
    ],
    examples: [
      { q: 'Tình huống: Hai quốc gia tranh chấp một vùng biển. Theo pháp luật quốc tế, họ nên giải quyết thế nào?', a: 'Họ phải giải quyết bằng biện pháp hoà bình (đàm phán, trung gian, trọng tài, toà án quốc tế), tuân thủ nguyên tắc cấm dùng vũ lực. Đây là nguyên tắc cơ bản của pháp luật quốc tế.' },
      { q: 'Tình huống: Việt Nam ký một điều ước quốc tế rồi ban hành luật trong nước phù hợp với điều ước đó. Quá trình này gọi là gì?', a: 'Đây là quá trình nội luật hoá — chuyển hoá nội dung điều ước quốc tế thành quy định của pháp luật trong nước. Nó thể hiện mối quan hệ bổ sung giữa pháp luật quốc tế và pháp luật quốc gia.' },
    ],
  },

  'H12GDCD-w31-quiz': {
    topic: 'WTO và hợp đồng thương mại quốc tế',
    intro: 'Tuần này các em tìm hiểu Tổ chức Thương mại Thế giới (WTO), hai nguyên tắc nền tảng MFN, NT và khái niệm hợp đồng thương mại quốc tế.',
    objectives: [
      'Nêu được vai trò của WTO.',
      'Giải thích được nguyên tắc tối huệ quốc (MFN) và đối xử quốc gia (NT).',
      'Nêu được khái niệm hợp đồng thương mại quốc tế và Công ước Viên 1980 (CISG).',
    ],
    theory: [
      { h: 'Tổ chức Thương mại Thế giới (WTO)' },
      { p: 'WTO (World Trade Organization) là tổ chức thương mại lớn nhất toàn cầu, đặt ra luật chơi cho thương mại quốc tế nhằm tự do hoá thương mại trên cơ sở công bằng, không phân biệt đối xử.' },
      { h: 'Hai nguyên tắc cơ bản của WTO' },
      { ul: [
        'Tối huệ quốc (MFN – Most Favoured Nation): đối xử với hàng hoá của một thành viên không kém hơn đối xử dành cho hàng từ bất kỳ thành viên nào khác.',
        'Đối xử quốc gia (NT – National Treatment): đối xử với hàng nhập khẩu (sau khi đã thông quan) không kém hơn hàng sản xuất trong nước.',
      ] },
      { h: 'Hợp đồng thương mại quốc tế' },
      { p: 'Hợp đồng thương mại quốc tế là hợp đồng mua bán hàng hoá hoặc cung ứng dịch vụ giữa các bên có trụ sở thương mại tại các quốc gia khác nhau.' },
      { h: 'Công ước Viên 1980 (CISG)' },
      { p: 'CISG là công ước của Liên hợp quốc về hợp đồng mua bán hàng hoá quốc tế. Việt Nam đã gia nhập, có hiệu lực từ ngày 1/1/2017, giúp doanh nghiệp Việt thuận lợi hơn khi giao thương quốc tế.' },
      { note: 'Nguyên tắc MFN và NT đều hướng tới không phân biệt đối xử — nền tảng của thương mại tự do mà Việt Nam cam kết khi gia nhập WTO năm 2007.' },
    ],
    examples: [
      { q: 'Tình huống: Việt Nam giảm thuế nhập khẩu cho hàng nước A thì cũng phải áp dụng mức tương tự cho hàng các nước thành viên WTO khác. Đây là nguyên tắc nào?', a: 'Đây là nguyên tắc tối huệ quốc (MFN). Ưu đãi dành cho một thành viên phải được áp dụng cho mọi thành viên WTO, bảo đảm không phân biệt đối xử giữa các đối tác thương mại.' },
      { q: 'Tình huống: Một mặt hàng nhập khẩu đã thông quan bị đánh thuế nội địa cao hơn hàng cùng loại sản xuất trong nước. Điều này vi phạm gì?', a: 'Vi phạm nguyên tắc đối xử quốc gia (NT). Sau khi thông quan, hàng nhập khẩu phải được đối xử không kém hơn hàng nội địa cùng loại; đánh thuế nội địa cao hơn là phân biệt đối xử, trái quy định WTO.' },
    ],
  },

  'H12GDCD-w32-quiz': {
    topic: 'Hợp đồng thương mại quốc tế — Nội dung',
    intro: 'Tuần này các em tìm hiểu nội dung của một hợp đồng thương mại quốc tế, các quy tắc Incoterms, phương thức thanh toán và cách giải quyết tranh chấp.',
    objectives: [
      'Liệt kê được các điều khoản cơ bản của hợp đồng thương mại quốc tế.',
      'Giải thích được Incoterms (FOB, CIF) và phương thức thanh toán.',
      'Nêu được cơ chế giải quyết tranh chấp thương mại quốc tế.',
    ],
    theory: [
      { h: 'Nội dung hợp đồng thương mại quốc tế' },
      { ul: [
        'Tên hàng, số lượng, chất lượng, quy cách.',
        'Giá cả và điều kiện giao hàng.',
        'Phương thức và thời hạn thanh toán.',
        'Bảo hành, bảo hiểm, trách nhiệm các bên.',
        'Điều khoản giải quyết tranh chấp.',
      ] },
      { h: 'Incoterms — điều kiện giao hàng' },
      { p: 'Incoterms là bộ quy tắc thương mại quốc tế của Phòng Thương mại Quốc tế (ICC), quy định trách nhiệm, chi phí và rủi ro giữa người bán và người mua trong giao hàng.' },
      { ul: [
        'FOB (Free On Board): người bán giao hàng lên tàu tại cảng đi; rủi ro chuyển sang người mua từ thời điểm đó.',
        'CIF (Cost, Insurance, Freight): người bán chịu giá hàng + bảo hiểm + cước phí tới cảng đến.',
      ] },
      { h: 'Phương thức thanh toán quốc tế' },
      { p: 'Phổ biến gồm: L/C (tín dụng chứng từ), T/T (chuyển tiền điện), nhờ thu D/A, D/P. L/C là phương thức an toàn cho cả hai bên nhờ vai trò bảo đảm của ngân hàng.' },
      { h: 'Giải quyết tranh chấp' },
      { p: 'Khi có tranh chấp, các bên có thể chọn trọng tài thương mại quốc tế (VIAC, SIAC, ICC...) hoặc toà án có thẩm quyền theo thoả thuận trong hợp đồng.' },
      { note: 'Điều khoản giải quyết tranh chấp rất quan trọng: nên thoả thuận rõ luật áp dụng và cơ quan giải quyết ngay từ khi ký hợp đồng để tránh rắc rối về sau.' },
    ],
    examples: [
      { q: 'Tình huống: Doanh nghiệp Việt bán gạo theo điều kiện FOB cảng Sài Gòn. Trách nhiệm và rủi ro được phân chia thế nào?', a: 'Với FOB, người bán Việt Nam chịu trách nhiệm và chi phí đưa hàng lên tàu tại cảng Sài Gòn; sau khi hàng qua lan can tàu, rủi ro và chi phí vận chuyển tiếp theo (cước, bảo hiểm) chuyển sang người mua nước ngoài.' },
      { q: 'Tình huống: Hai bên ở hai nước tranh chấp về chất lượng hàng. Họ có thể nhờ ai phân xử?', a: 'Họ có thể đưa ra trọng tài thương mại quốc tế (như VIAC ở Việt Nam, SIAC ở Singapore, ICC) hoặc toà án có thẩm quyền, theo điều khoản giải quyết tranh chấp đã thoả thuận trong hợp đồng.' },
    ],
  },

  'H12GDCD-w33-quiz': {
    topic: 'Công pháp quốc tế — Dân cư',
    intro: 'Tuần này các em tìm hiểu vấn đề dân cư trong luật quốc tế: quốc tịch, địa vị pháp lý của người nước ngoài, người tị nạn và dẫn độ.',
    objectives: [
      'Nêu được thành phần dân cư của một quốc gia.',
      'Giải thích được khái niệm quốc tịch và cách có quốc tịch Việt Nam.',
      'Phân biệt được địa vị pháp lý của người nước ngoài, người tị nạn, dẫn độ.',
    ],
    theory: [
      { h: 'Dân cư của một quốc gia' },
      { p: 'Dân cư của một quốc gia gồm: công dân nước đó, người nước ngoài và người không quốc tịch đang cư trú trên lãnh thổ.' },
      { h: 'Quốc tịch' },
      { p: 'Quốc tịch là mối quan hệ pháp lý ràng buộc giữa một cá nhân với một quốc gia, làm phát sinh quyền và nghĩa vụ công dân giữa hai bên.' },
      { ul: [
        'Theo Luật Quốc tịch Việt Nam 2008, quốc tịch Việt Nam có được do: sinh ra, được nhập quốc tịch, được trở lại quốc tịch, theo điều ước quốc tế.',
      ] },
      { h: 'Người nước ngoài' },
      { p: 'Người nước ngoài tại Việt Nam được hưởng các quyền và phải thực hiện nghĩa vụ theo pháp luật Việt Nam và điều ước quốc tế, trừ một số quyền chính trị (như bầu cử, ứng cử) chỉ dành cho công dân Việt Nam.' },
      { h: 'Người tị nạn và dẫn độ' },
      { ul: [
        'Người tị nạn được bảo vệ theo Công ước 1951 về vị thế người tị nạn và Nghị định thư 1967.',
        'Dẫn độ là việc một quốc gia trao trả người bị truy nã/kết án cho quốc gia khác để xét xử hoặc thi hành án, theo điều ước quốc tế.',
      ] },
      { note: 'Phân biệt: trục xuất là buộc người nước ngoài rời khỏi lãnh thổ; dẫn độ là trao trả tội phạm cho nước khác theo điều ước — hai khái niệm khác nhau.' },
    ],
    examples: [
      { q: 'Tình huống: Một người nước ngoài sinh sống tại Việt Nam muốn đi bầu cử đại biểu Quốc hội. Họ có quyền này không?', a: 'Không. Quyền bầu cử, ứng cử là quyền chính trị chỉ dành cho công dân Việt Nam. Người nước ngoài được hưởng nhiều quyền theo pháp luật Việt Nam nhưng không có các quyền chính trị cơ bản này.' },
      { q: 'Tình huống: Nước A bắt được một tội phạm bị nước B truy nã và trao trả cho nước B xét xử. Đây là hành vi gì?', a: 'Đây là dẫn độ — việc trao trả người phạm tội cho quốc gia khác để xét xử hoặc thi hành án, được thực hiện trên cơ sở điều ước quốc tế hoặc nguyên tắc có đi có lại giữa hai nước.' },
    ],
  },

  'H12GDCD-w34-quiz': {
    topic: 'Công pháp quốc tế — Lãnh thổ và chủ quyền',
    intro: 'Tuần này các em tìm hiểu lãnh thổ quốc gia, chủ quyền và các vùng biển theo UNCLOS 1982 — kiến thức gắn với chủ quyền biển đảo của Tổ quốc.',
    objectives: [
      'Nêu được các bộ phận của lãnh thổ quốc gia.',
      'Trình bày được quy định về lãnh hải và vùng đặc quyền kinh tế theo UNCLOS 1982.',
      'Khẳng định được chủ quyền của Việt Nam với Hoàng Sa, Trường Sa.',
    ],
    theory: [
      { h: 'Lãnh thổ quốc gia' },
      { p: 'Lãnh thổ quốc gia gồm: vùng đất, vùng nước (nội thuỷ và lãnh hải), vùng trời phía trên và lòng đất phía dưới. Lãnh thổ là bất khả xâm phạm.' },
      { h: 'Các vùng biển theo UNCLOS 1982' },
      { ul: [
        'Lãnh hải: rộng 12 hải lý tính từ đường cơ sở; quốc gia có chủ quyền đầy đủ.',
        'Vùng tiếp giáp lãnh hải: thêm 12 hải lý (đến 24 hải lý).',
        'Vùng đặc quyền kinh tế (EEZ): rộng 200 hải lý tính từ đường cơ sở; quốc gia có quyền chủ quyền về khai thác tài nguyên.',
        'Thềm lục địa: vùng đáy biển và lòng đất dưới đáy biển.',
      ] },
      { h: 'Chủ quyền quốc gia' },
      { p: 'Chủ quyền quốc gia là quyền tối cao của quốc gia trong phạm vi lãnh thổ và độc lập trong quan hệ quốc tế, không phụ thuộc vào bất kỳ quyền lực nào bên ngoài.' },
      { h: 'Chủ quyền biển đảo Việt Nam' },
      { p: 'Hai quần đảo Hoàng Sa và Trường Sa thuộc chủ quyền của Việt Nam, có đầy đủ bằng chứng lịch sử và cơ sở pháp lý. Việt Nam kiên trì giải quyết tranh chấp Biển Đông bằng biện pháp hoà bình, trên cơ sở luật pháp quốc tế, đặc biệt là UNCLOS 1982.' },
      { note: 'UNCLOS 1982 (Công ước Liên hợp quốc về Luật Biển) là cơ sở pháp lý quan trọng để Việt Nam bảo vệ chủ quyền và lợi ích trên Biển Đông.' },
    ],
    examples: [
      { q: 'Tình huống: Một tàu nước ngoài đánh bắt cá trong phạm vi 100 hải lý từ đường cơ sở của Việt Nam mà không xin phép. Vùng này là gì và họ vi phạm thế nào?', a: 'Đây là vùng đặc quyền kinh tế (EEZ, rộng 200 hải lý) của Việt Nam, nơi Việt Nam có quyền chủ quyền về khai thác tài nguyên. Tàu nước ngoài đánh bắt không phép là vi phạm quyền chủ quyền của Việt Nam theo UNCLOS 1982.' },
      { q: 'Tình huống: Khi có tranh chấp ở Biển Đông, Việt Nam chủ trương giải quyết theo hướng nào?', a: 'Việt Nam chủ trương giải quyết bằng biện pháp hoà bình, trên cơ sở luật pháp quốc tế, đặc biệt UNCLOS 1982, kiên quyết bảo vệ chủ quyền nhưng phản đối dùng vũ lực. Đây là lập trường nhất quán và phù hợp nguyên tắc luật quốc tế.' },
    ],
  },

  'H12GDCD-w35-quiz': {
    topic: 'Thi học kỳ II — Tổng ôn pháp luật',
    intro: 'Tuần thi học kỳ II và tổng ôn toàn bộ phần pháp luật. Các em hệ thống lại các chế định lớn và rèn vận dụng vào tình huống thực tế, chuẩn bị cho kỳ thi tốt nghiệp.',
    objectives: [
      'Hệ thống được các chế định pháp luật trọng tâm lớp 12.',
      'Ghi nhớ được các con số, mốc pháp lý quan trọng.',
      'Vận dụng tổng hợp vào câu hỏi tình huống pháp luật.',
    ],
    theory: [
      { h: 'Quyền sở hữu và thừa kế' },
      { ul: [
        'Quyền sở hữu (BLDS 2015): chiếm hữu, sử dụng, định đoạt.',
        'Đất đai thuộc sở hữu toàn dân do Nhà nước đại diện (HP 2013).',
        'Thừa kế: theo di chúc hoặc theo pháp luật (hàng thừa kế thứ nhất, hai, ba).',
      ] },
      { h: 'Hôn nhân – gia đình' },
      { ul: [
        'Tuổi kết hôn: nam đủ 20, nữ đủ 18.',
        'Nguyên tắc: tự nguyện, tiến bộ, một vợ một chồng, bình đẳng.',
        'Cấm tảo hôn, cưỡng ép kết hôn; bạo lực gia đình bị xử lý.',
      ] },
      { h: 'Kinh doanh, thuế và an sinh' },
      { ul: [
        'Quyền tự do kinh doanh (Điều 33 HP 2013) đi kèm nghĩa vụ đăng ký, nộp thuế.',
        'Trốn thuế, trục lợi an sinh xã hội là vi phạm pháp luật.',
      ] },
      { h: 'Pháp luật quốc tế' },
      { ul: [
        'WTO: nguyên tắc MFN, NT.',
        'UNCLOS 1982: lãnh hải 12 hải lý, EEZ 200 hải lý.',
        'Hoàng Sa, Trường Sa thuộc chủ quyền Việt Nam.',
      ] },
      { note: 'Khi làm bài tổng ôn, chú ý các con số dễ nhầm: tuổi kết hôn 20/18, lãnh hải 12 hải lý, EEZ 200 hải lý, giảm trừ gia cảnh 11 triệu/tháng, WTO 2007.' },
    ],
    examples: [
      { q: 'Câu hỏi ôn: Quyền sở hữu theo Bộ luật Dân sự 2015 gồm những quyền năng nào?', a: 'Gồm ba quyền năng: chiếm hữu (nắm giữ, quản lý), sử dụng (khai thác, hưởng lợi tức), định đoạt (quyết định số phận pháp lý của tài sản như bán, tặng cho, để lại thừa kế).' },
      { q: 'Câu hỏi ôn: Theo UNCLOS 1982, lãnh hải và vùng đặc quyền kinh tế của Việt Nam rộng bao nhiêu?', a: 'Lãnh hải rộng 12 hải lý tính từ đường cơ sở (quốc gia có chủ quyền đầy đủ); vùng đặc quyền kinh tế rộng 200 hải lý (quốc gia có quyền chủ quyền về khai thác tài nguyên). Đây là kiến thức gắn với bảo vệ chủ quyền biển đảo.' },
    ],
  },

  'H12GDCD-w36-quiz': {
    topic: 'Kết thúc GD Kinh tế và Pháp luật — Công dân có trách nhiệm trong thế giới hội nhập',
    intro: 'Tuần cuối năm học — hãy nhìn lại hành trình GD Kinh tế và Pháp luật: từ quyền lợi người tiêu dùng đến trách nhiệm thuế khoá, từ quyền dân sự đến nghĩa vụ công dân. Tất cả chuẩn bị cho em trở thành người công dân trưởng thành có ý thức.',
    objectives: [
      'Hệ thống hoá kiến thức kinh tế và pháp luật đã học trong chương trình lớp 12.',
      'Nhận ra quyền lợi và trách nhiệm của công dân trong nền kinh tế thị trường và nhà nước pháp quyền.',
      'Chuẩn bị tâm thế cho cuộc sống tự lập: quản lý tài chính cá nhân, hiểu pháp luật cơ bản.',
    ],
    theory: [
      { h: 'Bản đồ GD Kinh tế & Pháp luật lớp 12' },
      { ul: [
        'HK1 — Kinh tế: Tăng trưởng và phát triển kinh tế bền vững, hội nhập kinh tế quốc tế, thị trường tài chính, bảo hiểm, quyền người tiêu dùng.',
        'HK2 — Pháp luật: Hiến pháp, quyền dân sự–chính trị, quyền kinh tế–xã hội, nghĩa vụ thuế, luật hình sự (vi phạm pháp luật, trách nhiệm hình sự).',
      ] },
      { h: 'Kiến thức kinh tế em cần khi ra đời' },
      { ul: [
        'Quản lý tài chính cá nhân: thu nhập – chi tiêu – tiết kiệm – đầu tư. Quy tắc 50/30/20 (50% nhu cầu, 30% mong muốn, 20% tiết kiệm).',
        'Lạm phát và sức mua: Tại sao tiền tiết kiệm trong ngân hàng có thể "mất giá trị thực" nếu lãi suất thấp hơn lạm phát?',
        'Bảo hiểm: BHYT, BHXH là quyền và nghĩa vụ; mua bảo hiểm sớm bảo vệ tài chính trước rủi ro bất ngờ.',
        'Thuế: Hiểu thuế thu nhập cá nhân, thuế VAT — là nghĩa vụ công dân và nguồn lực quốc gia.',
      ] },
      { h: 'Kiến thức pháp luật em cần biết khi 18 tuổi' },
      { ul: [
        '18 tuổi: Đủ năng lực hành vi dân sự đầy đủ — em chịu trách nhiệm pháp lý hoàn toàn về mọi hành vi.',
        'Quyền bầu cử: Tham gia bầu cử là quyền và bổn phận công dân quan trọng nhất.',
        'Hợp đồng: Khi kí hợp đồng (thuê nhà, vay tiền, mua xe), em ràng buộc pháp lý — đọc kĩ trước khi kí.',
        'Trách nhiệm hình sự đầy đủ: Không còn được xử lý theo quy định người chưa thành niên — hiểu luật để tránh vi phạm.',
      ] },
      { h: 'Công dân toàn cầu — quyền và trách nhiệm mở rộng' },
      { p: 'Trong thế giới toàn cầu hoá, em không chỉ là công dân Việt Nam mà còn là công dân toàn cầu: có quyền kết nối với mọi người trên thế giới, học và làm việc ở nhiều quốc gia; đồng thời có trách nhiệm với môi trường, nhân quyền và công bằng xã hội vượt ra ngoài biên giới quốc gia.' },
      { note: 'Bài học quan trọng nhất của GD Kinh tế và Pháp luật không phải là thuộc lòng điều luật — mà là hiểu rằng trong nhà nước pháp quyền, mọi người đều bình đẳng trước pháp luật và em có đủ quyền để bảo vệ bản thân và sống đúng phẩm giá.' },
    ],
    examples: [
      { q: 'Kể từ khi đủ 18 tuổi, em có những quyền và trách nhiệm pháp lý mới nào quan trọng nhất?', a: 'Quyền mới: bầu cử và ứng cử; kí hợp đồng có giá trị pháp lý đầy đủ; quyền kinh doanh (đăng ký doanh nghiệp); quyền lập gia đình. Trách nhiệm mới: chịu trách nhiệm hình sự đầy đủ (không còn xử lý theo luật người chưa thành niên); nghĩa vụ quân sự (nam công dân từ 18 tuổi); nghĩa vụ thuế khi có thu nhập; tuân thủ hoàn toàn Hiến pháp và pháp luật.' },
      { q: 'Hội nhập kinh tế quốc tế mang lại lợi ích và thách thức gì cho người lao động Việt Nam?', a: 'Lợi ích: tiếp cận công nghệ và kỹ năng mới từ FDI; nhiều việc làm mới trong ngành xuất khẩu (dệt may, điện tử); thị trường lao động mở rộng (có thể làm việc ở nước ngoài); hàng hoá đa dạng giá rẻ hơn. Thách thức: cạnh tranh với lao động các nước; đòi hỏi kỹ năng cao hơn (ngoại ngữ, công nghệ); bất bình đẳng có thể tăng nếu chính sách phân phối không tốt; nguy cơ phụ thuộc công nghệ nước ngoài.' },
      { q: 'Em hiểu thế nào về "trách nhiệm xã hội" của công dân ngoài việc không vi phạm pháp luật?', a: 'Trách nhiệm xã hội của công dân vượt ra ngoài "không vi phạm luật": (1) Tham gia tích cực — bỏ phiếu, tham gia cộng đồng, lên tiếng về vấn đề xã hội; (2) Bảo vệ môi trường — không chỉ không xả rác mà còn ủng hộ chính sách xanh; (3) Phòng chống tham nhũng — không đưa hối lộ, tố giác tham nhũng khi biết; (4) Hỗ trợ người yếu thế — nộp thuế đầy đủ là cách đóng góp cho an sinh xã hội; (5) Lan toả thông tin đúng — không chia sẻ tin giả gây hại xã hội.' },
    ],
  },
};
