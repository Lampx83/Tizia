// ============================================================
// Lớp 5 · TIẾNG VIỆT — Lý thuyết tuần (P5TV_LESSONS)
// 35 tuần, key trùng id quiz: "P5TV-w01-quiz" … "P5TV-w35-quiz".
// ============================================================

const L = (topic, intro, objectives, theory, examples) =>
  ({ topic, intro, objectives, theory, examples });

export const P5TV_LESSONS = {
  'P5TV-w01-quiz': L(
    'Ôn tập từ loại — Danh từ, Động từ, Tính từ',
    'Tuần 1 ôn lại 3 từ loại chính: danh từ, động từ, tính từ.',
    [
      'Phân biệt được 3 từ loại cơ bản.',
      'Đặt câu với từng loại.',
    ],
    [
      '**Danh từ** chỉ sự vật, hiện tượng, con người, khái niệm: *bàn, mưa, học sinh, lòng yêu nước*.',
      '**Động từ** chỉ hành động, trạng thái: *chạy, ngủ, học, vui*.',
      '**Tính từ** chỉ đặc điểm, tính chất: *xanh, cao, đẹp, chăm chỉ*.',
      'Một từ có thể đổi từ loại theo ngữ cảnh (vd: "vui" có thể là tính từ hoặc danh từ — "niềm vui").',
    ],
    [
      { title: 'Phân loại', body: 'Trong câu "Học sinh chăm chỉ học bài": *học sinh* (DT), *chăm chỉ* (TT), *học* (ĐT), *bài* (DT).' },
      { title: 'Đặt câu', body: 'TT: "Bầu trời rất **trong xanh**."' },
    ]
  ),

  'P5TV-w02-quiz': L(
    'Đại từ',
    'Đại từ là từ dùng để thay thế danh từ, động từ, tính từ hoặc chỉ trỏ - hỏi - xưng hô.',
    [
      'Nhận biết các loại đại từ.',
      'Sử dụng đại từ hợp ngữ cảnh.',
    ],
    [
      'Đại từ **xưng hô**: tôi, ta, mình, chúng tôi, anh, chị, các bạn…',
      'Đại từ **chỉ trỏ**: này, kia, đó, đây, ấy…',
      'Đại từ **để hỏi**: ai, gì, nào, sao, bao nhiêu…',
      'Đại từ **thay thế**: dùng để tránh lặp lại từ ngữ.',
    ],
    [
      { title: 'Thay thế', body: '"Lan đi học. **Bạn ấy** rất chăm." — *bạn ấy* thay cho *Lan*.' },
      { title: 'Hỏi', body: '"**Ai** đã làm vỡ cốc?" — *ai* là đại từ hỏi.' },
    ]
  ),

  'P5TV-w03-quiz': L(
    'Quan hệ từ',
    'Quan hệ từ nối các từ ngữ, các vế câu để biểu thị quan hệ giữa chúng.',
    [
      'Nhận biết quan hệ từ.',
      'Hiểu ý nghĩa các cặp quan hệ từ.',
    ],
    [
      'Quan hệ từ thông dụng: *và, với, cùng, hoặc, nhưng, mà, nên, vì, do, nếu, tuy, để, bằng, của, ở…*',
      'Cặp quan hệ từ: *vì… nên…* (nguyên nhân - kết quả); *nếu… thì…* (giả thiết); *tuy… nhưng…* (tương phản); *không những… mà còn…* (tăng tiến).',
    ],
    [
      { title: 'Cặp', body: '"**Vì** trời mưa **nên** em nghỉ học." — chỉ nguyên nhân - kết quả.' },
      { title: 'Tương phản', body: '"**Tuy** bé **nhưng** rất giỏi."' },
    ]
  ),

  'P5TV-w04-quiz': L(
    'Câu ghép',
    'Câu ghép là câu do nhiều vế câu (mỗi vế là 1 câu đơn) ghép lại.',
    [
      'Nhận biết câu ghép.',
      'Phân biệt câu đơn và câu ghép.',
    ],
    [
      'Câu đơn: chỉ có 1 cụm C-V (chủ ngữ - vị ngữ).',
      'Câu ghép: có từ 2 cụm C-V trở lên, mỗi cụm là 1 vế câu.',
      'Các vế câu ghép có quan hệ với nhau (đẳng lập, chính phụ).',
    ],
    [
      { title: 'Câu đơn', body: '"Em đi học." (1 cụm C-V).' },
      { title: 'Câu ghép', body: '"**Em** học bài, **mẹ** nấu cơm." (2 cụm C-V).' },
    ]
  ),

  'P5TV-w05-quiz': L(
    'Câu ghép — cách nối các vế (1)',
    'Các vế câu ghép có thể nối bằng quan hệ từ hoặc cặp quan hệ từ.',
    [
      'Nhận biết cách nối bằng quan hệ từ.',
    ],
    [
      'Nối bằng **1 quan hệ từ**: *và, nhưng, hoặc, rồi, mà…*.',
      'Nối bằng **cặp quan hệ từ**: *vì…nên…, nếu…thì…, tuy…nhưng…, không những…mà còn…*.',
      'Cặp quan hệ từ thường thể hiện rõ ý nghĩa hơn.',
    ],
    [
      { title: 'Một QHT', body: '"Em đến trường **và** Lan cũng đi cùng."' },
      { title: 'Cặp QHT', body: '"**Vì** chăm học **nên** em được điểm cao."' },
    ]
  ),

  'P5TV-w06-quiz': L(
    'Câu ghép — cách nối các vế (2)',
    'Các vế câu ghép còn có thể nối trực tiếp bằng dấu câu (không cần quan hệ từ).',
    [
      'Nhận biết cách nối trực tiếp.',
      'Sử dụng đúng dấu phẩy, dấu chấm phẩy, dấu hai chấm.',
    ],
    [
      'Nối **trực tiếp**: dùng dấu phẩy, dấu chấm phẩy, dấu hai chấm.',
      'Khi không có quan hệ từ, nghĩa của câu vẫn rõ qua ngữ cảnh.',
      'Dấu phẩy phổ biến nhất; dấu chấm phẩy dùng khi các vế dài, có quan hệ ngang nhau.',
    ],
    [
      { title: 'Dấu phẩy', body: '"Trời mưa, em mang ô."' },
      { title: 'Dấu chấm phẩy', body: '"Mẹ đi chợ; bố đi làm; em đi học."' },
    ]
  ),

  'P5TV-w07-quiz': L(
    'Liên kết câu — Phép lặp, phép thế',
    'Để các câu trong đoạn văn liên kết chặt chẽ, ta dùng phép lặp, phép thế.',
    [
      'Hiểu và áp dụng phép lặp.',
      'Hiểu và áp dụng phép thế.',
    ],
    [
      '**Phép lặp**: lặp lại từ ngữ ở câu trước → tạo sự gắn kết.',
      '**Phép thế**: thay từ ngữ ở câu trước bằng đại từ hoặc từ đồng nghĩa → tránh lặp dài dòng.',
      'Khi viết: dùng phép thế để câu văn mượt hơn nhưng đôi khi cần phép lặp để nhấn mạnh.',
    ],
    [
      { title: 'Phép lặp', body: '"**Hoa** đẹp lắm. **Hoa** thơm khắp vườn." (lặp *Hoa*).' },
      { title: 'Phép thế', body: '"Lan rất chăm. **Cô bé** luôn được điểm cao." (*cô bé* thay *Lan*).' },
    ]
  ),

  'P5TV-w08-quiz': L(
    'Liên kết câu — Phép nối',
    'Phép nối dùng các từ nối (quan hệ từ, từ ngữ chuyển ý) để gắn các câu.',
    [
      'Nhận biết phép nối.',
      'Sử dụng từ nối phù hợp.',
    ],
    [
      'Từ nối phổ biến: *và, nhưng, tuy nhiên, mặt khác, do đó, vì vậy, sau đó, cuối cùng…*',
      'Phép nối làm rõ quan hệ logic giữa các ý.',
      'Cần tránh dùng quá nhiều từ nối khiến câu rườm rà.',
    ],
    [
      { title: 'Nối', body: '"Em rất thích đọc sách. **Vì vậy**, em thường xuyên đến thư viện."' },
      { title: 'Tương phản', body: '"Trời mưa to. **Tuy nhiên**, em vẫn đến lớp đúng giờ."' },
    ]
  ),

  'P5TV-w09-quiz': L(
    'Văn tả người (1)',
    'Bài văn tả người gồm 3 phần: mở bài giới thiệu, thân bài tả hình dáng - hoạt động - tính cách, kết bài cảm xúc.',
    [
      'Nắm cấu trúc bài văn tả người.',
      'Tập tả một người thân.',
    ],
    [
      '**Mở bài**: giới thiệu người được tả (là ai, quan hệ thế nào).',
      '**Thân bài**: tả ngoại hình (vóc dáng, gương mặt, mái tóc, ánh mắt…), hoạt động (làm việc, học tập…), tính cách (hiền, vui vẻ, nghiêm khắc…).',
      '**Kết bài**: cảm nghĩ của em về người đó.',
      'Lưu ý: chọn chi tiết tiêu biểu, đặc trưng; không liệt kê dài dòng.',
    ],
    [
      { title: 'Mở bài', body: '"Người mà em yêu quý nhất là bà nội. Bà đã ngoài bảy mươi nhưng vẫn còn rất minh mẫn."' },
      { title: 'Chi tiết hay', body: '"Mái tóc bà bạc trắng như cước, đôi mắt hiền dịu luôn cười."' },
    ]
  ),

  'P5TV-w10-quiz': L(
    'Văn tả cảnh',
    'Tả cảnh thiên nhiên: cánh đồng, dòng sông, ngọn núi, cảnh mưa, bình minh, hoàng hôn…',
    [
      'Biết quan sát cảnh vật.',
      'Sử dụng từ ngữ giàu hình ảnh.',
    ],
    [
      'Quan sát kĩ: hình dáng, màu sắc, âm thanh, mùi vị, không khí.',
      'Tả theo trình tự: không gian (gần → xa, trên → dưới) hoặc thời gian (sáng → trưa → chiều).',
      'Dùng biện pháp tu từ (so sánh, nhân hoá) để cảnh sinh động.',
      'Lồng cảm xúc, không chỉ tả khô khan.',
    ],
    [
      { title: 'So sánh', body: '"Cánh đồng lúa chín **vàng rực như tấm thảm khổng lồ** trải dài đến chân trời."' },
      { title: 'Nhân hoá', body: '"Những hàng cây **đang khẽ thì thầm** trong gió chiều."' },
    ]
  ),

  'P5TV-w11-quiz': L(
    'Văn tả con vật',
    'Tả con vật nuôi quen thuộc: chó, mèo, gà, chim… hoặc con vật ấn tượng.',
    [
      'Tả được hình dáng và hoạt động con vật.',
      'Bộc lộ tình cảm với con vật.',
    ],
    [
      'Mở bài: giới thiệu con vật (của ai, từ bao giờ, vì sao em chọn tả).',
      'Thân bài: tả hình dáng (lông, mắt, tai, đuôi…), hoạt động (ăn, ngủ, chơi, bắt chuột…), thói quen.',
      'Kết bài: tình cảm của em đối với con vật.',
      'Chú ý: chọn đặc điểm tiêu biểu, dùng từ tượng hình, tượng thanh.',
    ],
    [
      { title: 'Hình dáng', body: '"Bộ lông Mun đen tuyền, mượt như nhung."' },
      { title: 'Hoạt động', body: '"Mỗi sáng, Mun lon ton chạy ra cổng đón em đi học về."' },
    ]
  ),

  'P5TV-w12-quiz': L(
    'Văn tả đồ vật',
    'Tả đồ dùng học tập, đồ chơi, đồ vật trong nhà gắn với kỉ niệm.',
    [
      'Tả được hình dáng, công dụng, kỉ niệm.',
    ],
    [
      'Mở bài: giới thiệu đồ vật (ai cho, mua khi nào, vì sao thân thiết).',
      'Thân bài: tả bao quát (hình dáng, kích thước, màu sắc) → tả chi tiết các bộ phận → công dụng.',
      'Kết bài: tình cảm và cách giữ gìn.',
      'Nên gắn đồ vật với kỉ niệm để bài văn có chiều sâu.',
    ],
    [
      { title: 'Bao quát', body: '"Cặp sách hình chữ nhật, màu xanh dương, có 2 quai mềm như đôi cánh."' },
      { title: 'Kỉ niệm', body: '"Mỗi lần mở cặp, em lại nhớ ngày sinh nhật được bố tặng."' },
    ]
  ),

  'P5TV-w13-quiz': L(
    'Dấu câu — Ngoặc đơn, Hai chấm',
    'Dấu ngoặc đơn và hai chấm có vai trò bổ sung, giải thích trong câu.',
    [
      'Sử dụng đúng dấu ngoặc đơn.',
      'Sử dụng đúng dấu hai chấm.',
    ],
    [
      'Dấu **ngoặc đơn ()** dùng để chú thích, giải thích thêm, hoặc bổ sung thông tin.',
      'Dấu **hai chấm :** báo hiệu phần liệt kê hoặc trích dẫn lời nói trực tiếp ở sau.',
    ],
    [
      { title: 'Ngoặc đơn', body: 'Hà Nội (thủ đô của Việt Nam) là thành phố lớn.' },
      { title: 'Hai chấm', body: 'Mẹ dặn: "Con phải ngoan."' },
    ]
  ),

  'P5TV-w14-quiz': L(
    'Dấu chấm than — Câu cảm — Câu cầu khiến',
    'Dấu chấm than dùng cuối câu cảm và câu cầu khiến để thể hiện cảm xúc, yêu cầu.',
    [
      'Phân biệt câu cảm và câu cầu khiến.',
      'Đặt câu đúng kiểu.',
    ],
    [
      '**Câu cảm** bộc lộ cảm xúc (vui, buồn, ngạc nhiên…): thường có từ *ôi, chao, quá, thật, lắm…*',
      '**Câu cầu khiến** yêu cầu, đề nghị, mong muốn: thường có từ *hãy, đừng, chớ, đi, thôi…*',
      'Cả hai thường kết thúc bằng **dấu chấm than (!)**.',
    ],
    [
      { title: 'Câu cảm', body: '"Cảnh đẹp **quá**!"' },
      { title: 'Câu cầu khiến', body: '"**Hãy** giữ vệ sinh chung!"' },
    ]
  ),

  'P5TV-w15-quiz': L(
    'Văn kể chuyện đã chứng kiến',
    'Kể lại câu chuyện em đã từng chứng kiến hoặc tham gia.',
    [
      'Nắm cấu trúc bài văn kể chuyện.',
      'Kể rõ diễn biến, có cảm xúc.',
    ],
    [
      'Mở bài: giới thiệu hoàn cảnh, thời gian, địa điểm câu chuyện.',
      'Thân bài: kể diễn biến theo trình tự thời gian (mở đầu - phát triển - cao trào - kết thúc).',
      'Kết bài: ý nghĩa, cảm nghĩ của em sau câu chuyện.',
      'Lưu ý: kể từ ngôi thứ nhất ("em", "tôi"), có lồng cảm xúc và bài học.',
    ],
    [
      { title: 'Mở bài', body: '"Hôm Chủ nhật vừa qua, em đã chứng kiến một việc làm tốt mà em không bao giờ quên."' },
      { title: 'Cảm nghĩ', body: '"Câu chuyện ấy giúp em hiểu rằng lòng tốt luôn đáng được trân trọng."' },
    ]
  ),

  'P5TV-w16-quiz': L(
    'Viết đoạn miêu tả',
    'Đoạn văn miêu tả ngắn (5-7 câu) tập trung tả một sự vật, hiện tượng cụ thể.',
    [
      'Viết được đoạn văn miêu tả mạch lạc.',
      'Sử dụng từ ngữ giàu hình ảnh.',
    ],
    [
      'Đoạn văn miêu tả có **câu chủ đề** giới thiệu, các câu sau triển khai chi tiết.',
      'Sử dụng tính từ, động từ gợi hình, kết hợp so sánh - nhân hoá.',
      'Câu kết thường khái quát hoặc nêu cảm xúc.',
    ],
    [
      { title: 'Đoạn mẫu', body: '"Buổi sáng trên cánh đồng thật yên bình. Mặt trời lên tỏa nắng vàng rực, sương đêm còn đọng lại long lanh như những hạt ngọc. Lúa chín nặng trĩu, vàng óng cả cánh đồng. Từng đàn cò trắng bay lượn, tô điểm thêm cho bức tranh quê hương."' },
      { title: 'Mẹo', body: 'Đọc lại đoạn văn để cắt bớt câu rườm rà.' },
    ]
  ),

  'P5TV-w17-quiz': L(
    'Tập đọc — Bác Hồ',
    'Học những bài tập đọc viết về Bác Hồ kính yêu — vị lãnh tụ vĩ đại của dân tộc.',
    [
      'Đọc diễn cảm bài về Bác.',
      'Hiểu tình cảm, đức tính của Bác.',
    ],
    [
      'Bác Hồ (Hồ Chí Minh) là người sáng lập Đảng và Nhà nước Việt Nam.',
      'Tấm gương đạo đức: cần - kiệm - liêm - chính - chí công vô tư.',
      'Tình yêu nước, yêu dân, yêu thiếu nhi vô bờ bến.',
      'Các bài tập đọc tiêu biểu: "Một cuộc gặp gỡ", "Tre Việt Nam", "Cháu nhớ Bác Hồ"…',
    ],
    [
      { title: 'Đức tính', body: 'Bác sống giản dị: áo bà ba, dép cao su, nhà sàn nhỏ.' },
      { title: 'Tình cảm', body: '"Trung thu Trăng sáng như gương / Bác Hồ ngắm cảnh nhớ thương nhi đồng."' },
    ]
  ),

  'P5TV-w18-quiz': L(
    'Ôn tập học kỳ I',
    'Hệ thống kiến thức HK1: từ loại, đại từ, quan hệ từ, câu ghép, liên kết câu, các kiểu văn.',
    [
      'Hệ thống hoá kiến thức.',
      'Vận dụng tổng hợp.',
    ],
    [
      'Từ loại: danh - động - tính từ, đại từ, quan hệ từ.',
      'Câu: câu đơn, câu ghép, các cách nối các vế câu ghép.',
      'Liên kết câu: phép lặp, phép thế, phép nối.',
      'Văn: tả người, tả cảnh, tả con vật, tả đồ vật, kể chuyện chứng kiến.',
    ],
    [
      { title: 'Phân tích câu', body: '"Tuy mưa to nhưng em vẫn đến lớp." → câu ghép, cặp QHT *tuy…nhưng…* chỉ tương phản.' },
      { title: 'Đoạn văn', body: 'Viết đoạn 5 câu tả buổi sáng ở quê em, có dùng so sánh.' },
    ]
  ),

  'P5TV-w19-quiz': L(
    'Tập đọc — Trần Hưng Đạo',
    'Các bài tập đọc về Hưng Đạo Đại Vương Trần Quốc Tuấn — danh tướng kiệt xuất nhà Trần.',
    [
      'Đọc và hiểu nội dung bài.',
      'Cảm nhận lòng yêu nước, tài thao lược.',
    ],
    [
      'Trần Hưng Đạo (Trần Quốc Tuấn) là anh hùng dân tộc, 3 lần đánh thắng quân Nguyên - Mông.',
      'Tác phẩm nổi tiếng: **Hịch tướng sĩ** — kêu gọi binh lính chống giặc.',
      'Tinh thần: yêu nước, đoàn kết, đặt lợi ích dân tộc lên trên thù riêng (hoà giải với Trần Quang Khải).',
    ],
    [
      { title: 'Câu nói nổi tiếng', body: '"Vua tôi đồng tâm, anh em hoà mục, cả nước góp sức, giặc tất bị bắt."' },
      { title: 'Tinh thần', body: 'Tướng quân không màng thù riêng, lo việc nước trước.' },
    ]
  ),

  'P5TV-w20-quiz': L(
    'Tập đọc — Đất nước Việt Nam',
    'Bài tập đọc ca ngợi vẻ đẹp đất nước, con người Việt Nam.',
    [
      'Cảm nhận vẻ đẹp đất nước qua văn thơ.',
      'Đọc diễn cảm.',
    ],
    [
      'Đất nước VN có 3 miền Bắc - Trung - Nam, mỗi miền có vẻ đẹp riêng.',
      'Núi sông hùng vĩ: Trường Sơn, sông Hồng, sông Cửu Long, biển Đông.',
      'Văn hoá đa dạng: 54 dân tộc anh em, truyền thống lâu đời.',
      'Con người VN: yêu nước, cần cù, sáng tạo.',
    ],
    [
      { title: 'Thơ', body: '"Việt Nam đất nước ta ơi / Mênh mông biển lúa đâu trời đẹp hơn." (Nguyễn Đình Thi).' },
      { title: 'Tự hào', body: 'Em tự hào là người con đất Việt.' },
    ]
  ),

  'P5TV-w21-quiz': L(
    'Đại từ thay thế — Luyện tập',
    'Củng cố cách dùng đại từ thay thế để tránh lặp từ trong đoạn văn.',
    [
      'Sử dụng đại từ linh hoạt.',
      'Tránh lặp từ không cần thiết.',
    ],
    [
      'Đại từ thay thế danh từ: *nó, hắn, cô ấy, anh ấy, người ấy, bạn ấy, ông ta…*',
      'Đại từ thay cụm danh từ: *điều đó, việc ấy, chuyện này…*',
      'Khi viết, dùng đại từ ở câu thứ 2 trở đi để tránh lặp tên riêng quá nhiều.',
    ],
    [
      { title: 'Trước', body: '"Lan đi học. Lan rất chăm. Lan luôn được khen." (lặp).' },
      { title: 'Sau', body: '"Lan đi học. **Bạn ấy** rất chăm. **Cô bé** luôn được khen." (mượt hơn).' },
    ]
  ),

  'P5TV-w22-quiz': L(
    'Ôn nhẹ sau Tết — Tập đọc danh nhân',
    'Đọc và tìm hiểu về các danh nhân, anh hùng Việt Nam.',
    [
      'Biết thêm về danh nhân, anh hùng.',
      'Học gương sáng để noi theo.',
    ],
    [
      'Danh nhân lịch sử: Lý Thái Tổ (dời đô), Lý Thường Kiệt (Nam quốc sơn hà), Trần Hưng Đạo, Nguyễn Trãi (Bình Ngô đại cáo), Quang Trung…',
      'Danh nhân văn hoá: Nguyễn Du, Hồ Xuân Hương, Nguyễn Đình Chiểu…',
      'Anh hùng cách mạng: Hồ Chí Minh, Võ Nguyên Giáp, Võ Thị Sáu, Kim Đồng…',
      'Mỗi người là tấm gương về tài năng, đạo đức, lòng yêu nước.',
    ],
    [
      { title: 'Nguyễn Trãi', body: 'Tác giả "Bình Ngô đại cáo" — bản tuyên ngôn độc lập thứ 2.' },
      { title: 'Võ Thị Sáu', body: 'Nữ anh hùng tuổi 17 hy sinh tại Côn Đảo, vẫn cười hát trước khi mất.' },
    ]
  ),

  'P5TV-w23-quiz': L(
    'Viết đơn',
    'Đơn là loại văn bản hành chính gửi đến cơ quan, cá nhân để đề đạt nguyện vọng.',
    [
      'Nắm cấu trúc đơn.',
      'Viết được đơn xin phép, xin nhập học…',
    ],
    [
      'Mẫu đơn gồm: **Quốc hiệu - Tiêu ngữ**, ngày tháng, **Tên đơn**, kính gửi, thông tin người viết, lý do, lời cam đoan, ký tên.',
      'Quốc hiệu: "CỘNG HOÀ XÃ HỘI CHỦ NGHĨA VIỆT NAM" — Tiêu ngữ: "Độc lập - Tự do - Hạnh phúc".',
      'Ngôn ngữ trang trọng, ngắn gọn, đúng sự thật.',
    ],
    [
      { title: 'Cấu trúc', body: 'Quốc hiệu → ngày → ĐƠN XIN PHÉP → Kính gửi → Tôi tên là… → Lý do → Kính mong → Ký tên.' },
      { title: 'Ví dụ', body: '"Tôi tên là Nguyễn Văn A, học sinh lớp 5A. Hôm nay tôi bị ốm, xin phép cô cho tôi nghỉ học."' },
    ]
  ),

  'P5TV-w24-quiz': L(
    'Viết biên bản',
    'Biên bản ghi lại nội dung diễn ra trong cuộc họp, sự việc.',
    [
      'Nắm cấu trúc biên bản.',
      'Viết được biên bản cuộc họp.',
    ],
    [
      'Cấu trúc: Quốc hiệu - Tiêu ngữ, BIÊN BẢN (về việc gì), thời gian - địa điểm, thành phần, nội dung, kết luận, chữ ký.',
      'Nội dung ghi đầy đủ, trung thực, không bình luận chủ quan.',
      'Văn phong khách quan, mạch lạc.',
    ],
    [
      { title: 'Thông tin', body: 'Biên bản họp lớp về kế hoạch picnic: thời gian, người chủ trì, thư ký, các ý kiến, kết luận.' },
      { title: 'Lưu ý', body: 'Ghi đầy đủ, không thêm bớt theo ý cá nhân.' },
    ]
  ),

  'P5TV-w25-quiz': L(
    'Viết báo cáo',
    'Báo cáo tổng kết một hoạt động đã thực hiện.',
    [
      'Nắm cấu trúc báo cáo.',
      'Viết được báo cáo hoạt động đơn giản.',
    ],
    [
      'Cấu trúc: Quốc hiệu - Tiêu ngữ, BÁO CÁO (về việc gì), kính gửi, người báo cáo, nội dung báo cáo, kết luận - kiến nghị, ký tên.',
      'Nội dung báo cáo: tình hình - kết quả - tồn tại - phương hướng.',
      'Văn phong khách quan, có số liệu cụ thể.',
    ],
    [
      { title: 'Ví dụ', body: 'Báo cáo kết quả thi đua tháng của tổ học tập.' },
      { title: 'Phần kết', body: 'Đề xuất tiếp tục/đổi mới hoạt động.' },
    ]
  ),

  'P5TV-w26-quiz': L(
    'Mở rộng vốn từ — Quyền và bổn phận',
    'Học từ ngữ về quyền và bổn phận của trẻ em.',
    [
      'Hiểu khái niệm quyền và bổn phận.',
      'Mở rộng vốn từ liên quan.',
    ],
    [
      '**Quyền** của trẻ em: được học tập, được vui chơi, được bảo vệ, được chăm sóc, được tôn trọng.',
      '**Bổn phận** của trẻ em: kính trọng người lớn, yêu thương em nhỏ, chăm ngoan học giỏi, giúp đỡ gia đình.',
      'Công ước quốc tế về Quyền trẻ em (1989) — VN tham gia 1990.',
    ],
    [
      { title: 'Quyền', body: 'Em có **quyền** được đến trường học tập.' },
      { title: 'Bổn phận', body: 'Em có **bổn phận** giúp đỡ cha mẹ việc nhà phù hợp.' },
    ]
  ),

  'P5TV-w27-quiz': L(
    'Mở rộng vốn từ — Hữu nghị, Hợp tác',
    'Học từ ngữ về tình hữu nghị, sự hợp tác giữa các dân tộc, quốc gia.',
    [
      'Mở rộng vốn từ về hữu nghị, hợp tác.',
      'Hiểu giá trị hợp tác quốc tế.',
    ],
    [
      'Từ về **hữu nghị**: hữu hảo, thân thiết, kết nghĩa, đoàn kết, tình bạn, giao lưu.',
      'Từ về **hợp tác**: cộng tác, liên kết, chung tay, phối hợp, đồng hành.',
      'VN có quan hệ ngoại giao với gần 200 quốc gia, là thành viên LHQ, ASEAN, WTO.',
    ],
    [
      { title: 'Câu', body: 'Việt Nam và Lào có **tình hữu nghị** lâu đời.' },
      { title: 'Hợp tác', body: 'Các nước **hợp tác** chống biến đổi khí hậu.' },
    ]
  ),

  'P5TV-w28-quiz': L(
    'Biện pháp tu từ — Ẩn dụ, Hoán dụ',
    'Ẩn dụ và hoán dụ là 2 biện pháp tu từ giúp câu văn giàu hình ảnh.',
    [
      'Nhận biết ẩn dụ và hoán dụ.',
      'Bước đầu sử dụng.',
    ],
    [
      '**Ẩn dụ**: gọi tên sự vật này bằng tên sự vật khác có nét tương đồng (ngầm so sánh).',
      '**Hoán dụ**: gọi tên sự vật bằng tên một bộ phận, dấu hiệu, đặc điểm gần gũi của nó.',
      'Hai biện pháp này khác **so sánh** (so sánh có từ *như, là, tựa…*; ẩn dụ thì không).',
    ],
    [
      { title: 'Ẩn dụ', body: '"**Thuyền** về có nhớ **bến** chăng?" — *thuyền* ẩn dụ người ra đi, *bến* ẩn dụ người ở lại.' },
      { title: 'Hoán dụ', body: '"Áo nâu cùng với áo xanh / Nông thôn cùng với thị thành đứng lên." — *áo nâu* chỉ nông dân, *áo xanh* chỉ công nhân.' },
    ]
  ),

  'P5TV-w29-quiz': L(
    'Câu ghép — Luyện tập',
    'Củng cố cách viết câu ghép đa dạng.',
    [
      'Đặt câu ghép với nhiều quan hệ ý nghĩa.',
      'Chữa câu ghép sai.',
    ],
    [
      'Câu ghép có nhiều kiểu quan hệ: nguyên nhân - kết quả, điều kiện, tương phản, tăng tiến, liệt kê.',
      'Khi viết câu ghép: vế nào trước, vế nào sau phải hợp logic.',
      'Tránh lỗi câu dài dòng, thừa quan hệ từ.',
    ],
    [
      { title: 'Tăng tiến', body: '"**Không những** em chăm học **mà còn** giúp đỡ bạn bè."' },
      { title: 'Điều kiện', body: '"**Nếu** trời nắng **thì** lớp em đi picnic."' },
    ]
  ),

  'P5TV-w30-quiz': L(
    'Tập đọc — Thiên nhiên Việt Nam',
    'Các bài tả thiên nhiên đặc trưng VN: rừng, biển, sông, núi.',
    [
      'Cảm nhận vẻ đẹp thiên nhiên VN.',
      'Đọc diễn cảm.',
    ],
    [
      'Thiên nhiên VN đa dạng: rừng nhiệt đới (Cúc Phương, Cát Tiên), biển đảo (Hạ Long, Phú Quốc), cao nguyên (Đà Lạt, Mộc Châu).',
      'Văn hoá lúa nước: cánh đồng, dòng sông, làng quê.',
      'Trách nhiệm bảo vệ thiên nhiên: không xả rác, trồng cây, tiết kiệm tài nguyên.',
    ],
    [
      { title: 'Hạ Long', body: 'Vịnh Hạ Long với hơn 1.600 hòn đảo đá vôi, được UNESCO công nhận là Di sản Thiên nhiên Thế giới.' },
      { title: 'Trách nhiệm', body: 'Mỗi học sinh cần bảo vệ môi trường từ những việc nhỏ.' },
    ]
  ),

  'P5TV-w31-quiz': L(
    'Từ đồng nghĩa — Trái nghĩa — Đồng âm',
    'Củng cố 3 lớp từ quan trọng đã học.',
    [
      'Phân biệt từ đồng nghĩa, trái nghĩa, đồng âm.',
      'Sử dụng linh hoạt.',
    ],
    [
      '**Đồng nghĩa**: cùng nghĩa hoặc gần nghĩa (*to - lớn, đẹp - xinh, vui - sướng*).',
      '**Trái nghĩa**: nghĩa trái ngược (*cao - thấp, sáng - tối, vui - buồn*).',
      '**Đồng âm**: phát âm giống nhau nhưng nghĩa khác xa (*đường* trong "đường phố" và "đường ngọt"; *bàn* là cái bàn và *bàn* là bàn bạc).',
    ],
    [
      { title: 'Đồng nghĩa', body: '*học sinh - học trò*; *quê hương - quê quán*.' },
      { title: 'Đồng âm', body: '*Con kiến* và *kiến thức* — hai từ "kiến" khác nghĩa hẳn.' },
    ]
  ),

  'P5TV-w32-quiz': L(
    'Văn miêu tả — Kết hợp tả người và cảnh',
    'Bài văn nâng cao: tả người trong một khung cảnh cụ thể.',
    [
      'Kết hợp tả người và cảnh.',
      'Tạo nên bức tranh sống động.',
    ],
    [
      'Cảnh và người gắn bó với nhau làm bài văn sinh động hơn.',
      'Có thể tả cảnh trước rồi giới thiệu nhân vật, hoặc tả nhân vật trong cảnh.',
      'Chú ý lựa chọn cảnh phù hợp với người (vd: bà nội trong khu vườn, mẹ trong bếp, em bé bên hồ cá…).',
    ],
    [
      { title: 'Ý tưởng', body: '"Tả bà nội đang chăm sóc khu vườn nhỏ trước nhà": cảnh vườn, bóng bà, hoạt động.' },
      { title: 'Mẹo', body: 'Cảnh phản ánh tâm hồn nhân vật — vườn tươi tốt thể hiện bà cần cù, yêu cây cối.' },
    ]
  ),

  'P5TV-w33-quiz': L(
    'Ôn tập tổng hợp — Từ loại và Câu',
    'Tổng hợp toàn bộ kiến thức về từ loại và câu của cấp tiểu học.',
    [
      'Hệ thống hoá từ loại.',
      'Hệ thống hoá kiểu câu.',
    ],
    [
      'Từ loại chính: danh từ, động từ, tính từ, đại từ, quan hệ từ.',
      'Câu chia theo cấu tạo: câu đơn - câu ghép.',
      'Câu chia theo mục đích nói: kể, hỏi, cảm, cầu khiến.',
      'Các biện pháp tu từ đã học: so sánh, nhân hoá, ẩn dụ, hoán dụ.',
    ],
    [
      { title: 'Phân tích', body: '"Em đi học, mẹ đi làm." — câu ghép, 2 vế chỉ hành động song song.' },
      { title: 'Kiểu câu', body: 'Câu hỏi: kết thúc bằng dấu (?); câu cảm: kết thúc bằng (!).' },
    ]
  ),

  'P5TV-w34-quiz': L(
    'Ôn tập cuối cấp — Đọc hiểu',
    'Luyện kỹ năng đọc hiểu văn bản — kỹ năng quan trọng lên cấp 2.',
    [
      'Đọc và trả lời câu hỏi.',
      'Tìm ý chính, chi tiết.',
    ],
    [
      'Đọc kỹ văn bản 1-2 lần, gạch chân từ khoá.',
      'Trả lời theo trình tự: ý chính - chi tiết - cảm nghĩ.',
      'Câu hỏi vận dụng: liên hệ bản thân, rút bài học.',
    ],
    [
      { title: 'Kỹ năng', body: 'Đọc lướt để nắm ý → đọc kỹ phần liên quan câu hỏi → trích dẫn để chứng minh.' },
      { title: 'Liên hệ', body: 'Bài học từ câu chuyện này giúp em rút ra điều gì cho cuộc sống?' },
    ]
  ),

  'P5TV-w35-quiz': L(
    'Ôn cuối cấp — Tổng hợp Tiếng Việt 5',
    'Tổng kết hành trình Tiếng Việt 5 năm tiểu học.',
    [
      'Tự tin với kỹ năng đọc - viết - nói - nghe.',
      'Sẵn sàng lên cấp 2.',
    ],
    [
      'Kiến thức từ ngữ - ngữ pháp - tu từ đã đầy đủ cho học cấp 2.',
      'Kỹ năng viết: đoạn văn, bài văn miêu tả, kể chuyện, đơn, biên bản, báo cáo.',
      'Kỹ năng đọc: đọc diễn cảm, đọc hiểu, cảm thụ văn học.',
      'Lên cấp 2: học Ngữ văn với nhiều thể loại văn học (truyện, thơ, kịch, văn nghị luận).',
    ],
    [
      { title: 'Tổng kết', body: '5 năm tiểu học em đã có nền tảng vững chắc về Tiếng Việt.' },
      { title: 'Lời nhắn', body: 'Hãy duy trì thói quen đọc sách — đó là chìa khoá học giỏi Văn.' },
    ]
  ),

  'P5TV-w36-quiz': L(
    'Kết thúc Tiểu học — Hành trang Tiếng Việt vào Lớp 6',
    'Chúc mừng! Em đã hoàn thành 5 năm học Tiếng Việt. Nhìn lại hành trình ngôn ngữ tuyệt vời này nhé.',
    [
      'Tổng kết 4 kỹ năng ngôn ngữ sau 5 năm học.',
      'Tự hào và tự tin bước vào Ngữ văn THCS.',
    ],
    [
      '**Đọc:** từ đánh vần chữ cái đến đọc diễn cảm, đọc hiểu và cảm thụ văn học.',
      '**Viết:** từ tập tô đến viết bài văn miêu tả, kể chuyện, đơn từ, biên bản.',
      '**Nói và nghe:** tự giới thiệu, kể chuyện, thuyết trình ngắn, lắng nghe và nhận xét.',
      '**Kiến thức ngôn ngữ:** từ loại (danh/động/tính từ), câu đơn-ghép, so sánh-nhân hoá-điệp ngữ.',
      '**Lớp 6 sẽ học:** Ngữ văn — truyện dân gian, thơ, kịch, văn nghị luận và tiếng Việt nâng cao.',
    ],
    [
      { title: 'Bí quyết học Ngữ văn tốt ở cấp 2', body: 'Đọc nhiều sách — ít nhất 1 cuốn mỗi tháng. Ghi nhật ký để luyện viết mỗi ngày.' },
      { title: 'Lời nhắn', body: 'Tiếng Việt không chỉ là môn học — đó là ngôn ngữ em sẽ dùng cả đời để yêu, sáng tạo và trưởng thành.' },
    ]
  ),
};
