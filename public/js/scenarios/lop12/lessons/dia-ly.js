// ============================================================
// Lớp 12 · ĐỊA LÍ — Lý thuyết tuần (35 tuần · HK1: 1–18 · HK2: 19–35)
// Bám CTGD 2018 + ôn thi tốt nghiệp THPT (Địa lí Việt Nam): vị trí – tự nhiên
// – dân cư – chuyển dịch kinh tế – địa lí các ngành – địa lí các vùng – biển đảo.
// Kĩ năng Atlat + nhận xét biểu đồ. Key trùng id quiz: 'H12DIA-wNN-quiz'.
// Dạy lý thuyết, KHÔNG copy quiz. Số liệu tham chiếu, không tuyệt đối hoá.
// ============================================================

export const H12DIA_LESSONS = {
  'H12DIA-w01-quiz': {
    topic: 'Vị trí địa lí và phạm vi lãnh thổ Việt Nam',
    intro: 'Chào các em đến với Địa lí 12 — toàn bộ chương trình ôn thi tốt nghiệp xoay quanh Địa lí Việt Nam. Mở đầu là vị trí địa lí và phạm vi lãnh thổ, vì đây là chìa khoá giải thích gần như mọi đặc điểm tự nhiên, kinh tế và an ninh quốc phòng mà các em sẽ gặp ở các tuần sau.',
    objectives: [
      'Xác định được vị trí địa lí, hệ toạ độ và phạm vi lãnh thổ nước ta.',
      'Phân tích được ý nghĩa của vị trí địa lí về tự nhiên, kinh tế và an ninh quốc phòng.',
      'Hiểu cấu trúc lãnh thổ gồm vùng đất, vùng biển và vùng trời.',
    ],
    theory: [
      { h: 'Vị trí địa lí' },
      { p: 'Nước ta nằm ở rìa phía đông bán đảo Đông Dương, gần trung tâm khu vực Đông Nam Á, vừa gắn với lục địa Á – Âu vừa tiếp giáp Biển Đông (một phần của Thái Bình Dương). Đây là vị trí cầu nối giữa đất liền và biển, giữa các nước Đông Nam Á lục địa và hải đảo.' },
      { ul: [
        'Hệ toạ độ phần đất liền: khoảng 8°34\'B – 23°23\'B và 102°09\'Đ – 109°24\'Đ.',
        'Trên đất liền giáp ba nước: Trung Quốc, Lào, Campuchia.',
        'Trên biển giáp nhiều nước qua Biển Đông.',
      ]},
      { h: 'Phạm vi lãnh thổ' },
      { p: 'Lãnh thổ là một khối thống nhất gồm ba bộ phận: vùng đất (diện tích khoảng 331 nghìn km², đường biên giới trên 4.600 km, bờ biển dài khoảng 3.260 km), vùng biển (rộng khoảng 1 triệu km², gấp hơn ba lần diện tích đất liền, gồm nội thuỷ, lãnh hải, vùng tiếp giáp, vùng đặc quyền kinh tế và thềm lục địa) và vùng trời.' },
      { h: 'Ý nghĩa của vị trí địa lí' },
      { ul: [
        'Tự nhiên: quy định thiên nhiên nhiệt đới ẩm gió mùa, tài nguyên sinh vật – khoáng sản phong phú, nhưng cũng nhiều thiên tai (bão, lũ).',
        'Kinh tế: nằm trên ngã tư đường hàng hải và hàng không quốc tế, thuận lợi giao thương và hội nhập.',
        'An ninh quốc phòng: Biển Đông có vị trí chiến lược trong phát triển và bảo vệ chủ quyền.',
      ]},
      { note: 'Khi gặp câu hỏi "vì sao", hãy quy về vị trí: nội chí tuyến → nhiệt đới; giáp biển + gió mùa → ẩm; ngã tư hàng hải → thuận lợi giao thương.' },
    ],
    examples: [
      { q: 'Vì sao nói vị trí địa lí quy định đặc điểm cơ bản của thiên nhiên nước ta là tính chất nhiệt đới ẩm gió mùa?', a: 'Vì nước ta nằm hoàn toàn trong vùng nội chí tuyến Bắc bán cầu nên nhận lượng bức xạ lớn, nền nhiệt cao (tính nhiệt đới); lại tiếp giáp Biển Đông rộng và nằm trong khu vực gió mùa châu Á nên mưa nhiều, độ ẩm lớn và có hai mùa gió (tính ẩm, gió mùa).' },
      { q: 'Đọc Atlat trang Hành chính, hãy nêu các điểm cực trên đất liền của nước ta.', a: 'Cực Bắc ở Hà Giang (Lũng Cú), cực Nam ở Cà Mau (Đất Mũi), cực Tây ở Điện Biên (A Pa Chải), cực Đông ở Khánh Hoà (mũi Đôi – bán đảo Hòn Gốm). Từ đó suy ra lãnh thổ kéo dài nhiều vĩ độ → thiên nhiên phân hoá Bắc – Nam.' },
    ],
  },

  'H12DIA-w02-quiz': {
    topic: 'Thiên nhiên nhiệt đới ẩm gió mùa',
    intro: 'Tuần này các em tìm hiểu đặc điểm chi phối toàn bộ tự nhiên Việt Nam: tính nhiệt đới ẩm gió mùa. Nắm chắc cơ chế hai mùa gió, các em sẽ giải thích được khí hậu, sông ngòi, đất và sinh vật ở những tuần kế tiếp.',
    objectives: [
      'Trình bày được ba biểu hiện: tính nhiệt đới, tính ẩm và tính gió mùa.',
      'Phân biệt được gió mùa mùa đông và gió mùa mùa hạ.',
      'Nêu được ảnh hưởng của khí hậu nhiệt đới ẩm gió mùa tới các thành phần tự nhiên khác.',
    ],
    theory: [
      { h: 'Tính nhiệt đới ẩm' },
      { p: 'Do nằm trong vùng nội chí tuyến, tổng bức xạ lớn, cân bằng bức xạ dương quanh năm: nhiệt độ trung bình năm thường trên 20°C, tổng số giờ nắng nhiều. Tính ẩm thể hiện ở lượng mưa lớn (trung bình 1.500 – 2.000 mm/năm) và độ ẩm không khí cao (trên 80%).' },
      { h: 'Gió mùa mùa đông' },
      { ul: [
        'Nguồn gốc: khối khí lạnh từ cao áp Siberia, hướng đông bắc.',
        'Hoạt động từ khoảng tháng 11 đến tháng 4, chủ yếu ở miền Bắc.',
        'Nửa đầu mùa đông lạnh khô; nửa cuối lạnh ẩm, có mưa phùn.',
        'Càng vào Nam càng suy yếu, hầu như bị chặn lại ở dãy Bạch Mã.',
      ]},
      { h: 'Gió mùa mùa hạ' },
      { ul: [
        'Đầu mùa: gió tây nam từ Bắc Ấn Độ Dương gây mưa cho Nam Bộ, Tây Nguyên; vượt Trường Sơn gây hiệu ứng phơn khô nóng cho Bắc Trung Bộ.',
        'Giữa và cuối mùa: gió tây nam từ áp cao chí tuyến Nam bán cầu, gây mưa lớn trên cả nước.',
      ]},
      { h: 'Ảnh hưởng tới các thành phần tự nhiên' },
      { p: 'Khí hậu nhiệt đới ẩm gió mùa làm địa hình bị phong hoá – xâm thực mạnh ở miền núi và bồi tụ ở đồng bằng; sông ngòi nhiều nước, giàu phù sa, thuỷ chế theo mùa; đất feralit chiếm ưu thế; sinh vật phong phú với hệ sinh thái rừng nhiệt đới ẩm gió mùa.' },
      { note: 'Phải nhớ: gió mùa Đông Bắc và gió phơn Tây Nam ("gió Lào") là hai loại khác nhau — một gây lạnh ở miền Bắc, một gây khô nóng ở Bắc Trung Bộ.' },
    ],
    examples: [
      { q: 'Vì sao miền Bắc nước ta có mùa đông lạnh còn miền Nam thì không?', a: 'Vì gió mùa Đông Bắc xuất phát từ cao áp Siberia khi di chuyển xuống phía Nam bị suy yếu dần và bị dãy Bạch Mã chặn lại, nên gần như chỉ tác động tới miền Bắc; miền Nam nằm sát Xích đạo, nền nhiệt cao quanh năm, không chịu ảnh hưởng nên không có mùa đông lạnh.' },
      { q: 'Giải thích vì sao Bắc Trung Bộ có thời tiết khô nóng vào đầu mùa hạ.', a: 'Đầu mùa hạ, gió tây nam từ Bắc Ấn Độ Dương khi vượt qua dãy Trường Sơn bị mất hơi ẩm (gây mưa ở sườn đón gió), khi xuống sườn khuất gió phía đông trở nên khô và nóng — đó là hiệu ứng phơn, dân gian gọi là gió Lào.' },
    ],
  },

  'H12DIA-w03-quiz': {
    topic: 'Sự phân hoá đa dạng của thiên nhiên',
    intro: 'Việt Nam tuy chung nền nhiệt đới ẩm gió mùa nhưng thiên nhiên rất đa dạng. Tuần này các em học ba chiều phân hoá: Bắc – Nam, Đông – Tây và theo độ cao. Đây là phần rất hay được khai thác trong đề thi.',
    objectives: [
      'Phân tích được sự phân hoá thiên nhiên theo chiều Bắc – Nam.',
      'Phân tích được sự phân hoá theo chiều Đông – Tây.',
      'Nêu được ba đai cao và đặc trưng từng đai.',
    ],
    theory: [
      { h: 'Phân hoá Bắc – Nam' },
      { p: 'Do lãnh thổ kéo dài nhiều vĩ độ và tác động của gió mùa Đông Bắc, nhiệt độ tăng dần từ Bắc vào Nam. Phần lãnh thổ phía Bắc (từ dãy Bạch Mã trở ra) có khí hậu nhiệt đới ẩm gió mùa với một mùa đông lạnh; phần phía Nam mang sắc thái cận xích đạo gió mùa, nóng quanh năm với hai mùa mưa – khô rõ rệt. Ranh giới khí hậu quan trọng là dãy Bạch Mã (đèo Hải Vân).' },
      { h: 'Phân hoá Đông – Tây' },
      { ul: [
        'Vùng biển và thềm lục địa: rộng, độ nông – sâu thay đổi theo địa hình đáy.',
        'Vùng đồng bằng ven biển: thiên nhiên thay đổi tuỳ độ rộng hẹp và quan hệ với biển.',
        'Vùng đồi núi: phân hoá phức tạp do tác động của gió mùa kết hợp hướng các dãy núi (Đông Bắc ấm hơn Tây Bắc cùng độ cao).',
      ]},
      { h: 'Phân hoá theo độ cao' },
      { ul: [
        'Đai nhiệt đới gió mùa: dưới 600 – 700 m (miền Bắc), dưới 900 – 1.000 m (miền Nam).',
        'Đai cận nhiệt đới gió mùa trên núi: tới khoảng 2.600 m, khí hậu mát, đất feralit có mùn và đất mùn.',
        'Đai ôn đới gió mùa trên núi: trên 2.600 m, chỉ có ở vùng núi cao Hoàng Liên Sơn.',
      ]},
      { note: 'Mẹo nhớ độ cao: 600 – 2.600 – trên 2.600. Đai ôn đới chỉ xuất hiện ở Hoàng Liên Sơn vì đó là nơi duy nhất đủ cao trên 2.600 m.' },
    ],
    examples: [
      { q: 'Vì sao cùng độ cao nhưng vùng núi Đông Bắc lạnh hơn Tây Bắc?', a: 'Vì Đông Bắc có các cánh cung mở rộng về phía bắc và đông bắc, đón trực tiếp gió mùa Đông Bắc nên mùa đông đến sớm, kết thúc muộn và lạnh hơn; Tây Bắc được dãy Hoàng Liên Sơn cao đồ sộ che chắn nên gió mùa Đông Bắc bị suy yếu, mùa đông bớt lạnh hơn.' },
      { q: 'Đọc Atlat trang Khí hậu, so sánh chế độ mưa của Hà Nội và TP. Hồ Chí Minh.', a: 'Cả hai đều mưa tập trung vào mùa hạ. Tuy nhiên Hà Nội (miền Bắc) có mùa đông lạnh, vẫn có mưa phùn; TP. Hồ Chí Minh (miền Nam) nóng quanh năm, phân hoá rõ thành mùa mưa (tháng 5 – 11) và mùa khô sâu sắc (tháng 12 – 4). Đó là biểu hiện của phân hoá Bắc – Nam.' },
    ],
  },

  'H12DIA-w04-quiz': {
    topic: 'Thực hành: đọc bản đồ và phân tích biểu đồ khí hậu',
    intro: 'Tuần thực hành này rèn cho các em hai kĩ năng cốt lõi của môn Địa: đọc bản đồ khí hậu trong Atlat và nhận xét biểu đồ nhiệt độ – lượng mưa. Đây chính là dạng câu kĩ năng luôn có trong đề thi tốt nghiệp.',
    objectives: [
      'Đọc được bản đồ khí hậu: nhiệt độ, lượng mưa, hướng gió, các miền khí hậu.',
      'Nhận dạng và phân tích được biểu đồ khí hậu (climograph).',
      'Giải thích được một số hiện tượng khí hậu địa phương (mưa lớn, gió phơn).',
    ],
    theory: [
      { h: 'Đọc bản đồ khí hậu trong Atlat' },
      { ul: [
        'Nền màu thể hiện nhiệt độ trung bình; đường đẳng nhiệt và đường đẳng mưa thể hiện sự phân hoá.',
        'Các mũi tên màu chỉ hướng gió mùa mùa đông (đông bắc) và mùa hạ (tây nam).',
        'Các biểu đồ nhỏ tại trạm khí tượng cho biết diễn biến nhiệt – mưa theo tháng.',
      ]},
      { h: 'Phân tích biểu đồ khí hậu' },
      { p: 'Biểu đồ khí hậu thường vẽ cột thể hiện lượng mưa các tháng và đường thể hiện nhiệt độ trung bình các tháng. Khi nhận xét cần nêu: nhiệt độ trung bình năm và biên độ nhiệt; tổng lượng mưa và sự phân mùa (mùa mưa, mùa khô); từ đó rút ra kiểu khí hậu.' },
      { h: 'Một số hiện tượng cần nhớ' },
      { ul: [
        'Nơi mưa rất lớn: sườn đón gió ẩm như Bắc Quang (Hà Giang), khu vực Huế – Bạch Mã.',
        'Gió phơn (gió Lào): khô nóng, phổ biến ở Bắc Trung Bộ vào đầu mùa hạ.',
        'Nơi khô hạn: Ninh Thuận, Bình Thuận do nằm khuất gió.',
      ]},
      { note: 'Khi nhận xét biểu đồ, hãy luôn kèm số liệu cụ thể (tháng cao nhất, thấp nhất, tổng lượng mưa) — chỉ nói "mưa nhiều" sẽ mất điểm.' },
    ],
    examples: [
      { q: 'Một biểu đồ khí hậu cho thấy nhiệt độ luôn trên 25°C, mưa tập trung tháng 5 – 11, các tháng 12 – 4 hầu như không mưa. Đó là khí hậu vùng nào?', a: 'Đó là kiểu khí hậu cận xích đạo gió mùa của Nam Bộ (ví dụ TP. Hồ Chí Minh): nhiệt độ cao quanh năm, biên độ nhiệt nhỏ, phân hoá rõ thành mùa mưa và mùa khô. Không có mùa đông lạnh nên loại trừ các trạm miền Bắc.' },
      { q: 'Vì sao Huế là một trong những nơi mưa nhiều nhất nước ta?', a: 'Vì Huế nằm ở sườn đón gió: vào mùa thu – đông, gió đông bắc và bão từ Biển Đông thổi vuông góc với dãy Trường Sơn, kết hợp dải hội tụ nhiệt đới và địa hình chắn gió gây mưa lớn, đặc biệt vào các tháng 9 – 12.' },
    ],
  },

  'H12DIA-w05-quiz': {
    topic: 'Sử dụng hợp lí tài nguyên và bảo vệ môi trường',
    intro: 'Thiên nhiên cho ta nhiều nhưng không vô tận. Tuần này các em nhìn lại thực trạng tài nguyên và môi trường nước ta, từ đó hiểu vì sao phát triển bền vững là yêu cầu bắt buộc.',
    objectives: [
      'Nêu được thực trạng suy giảm các loại tài nguyên: đất, nước, rừng, đa dạng sinh học.',
      'Trình bày được các vấn đề ô nhiễm môi trường nổi cộm.',
      'Đề xuất được biện pháp sử dụng hợp lí tài nguyên và bảo vệ môi trường.',
    ],
    theory: [
      { h: 'Thực trạng tài nguyên' },
      { ul: [
        'Đất: đất nông nghiệp bình quân đầu người thấp và đang giảm; đất bị xói mòn, thoái hoá, hoang mạc hoá cục bộ.',
        'Nước: nguồn nước phụ thuộc nhiều vào lưu vực ngoài lãnh thổ; ô nhiễm nước mặt và nước ngầm ở nhiều nơi.',
        'Rừng: diện tích rừng có phục hồi (độ che phủ tăng) nhưng chất lượng rừng tự nhiên suy giảm.',
        'Sinh vật: đa dạng sinh học giảm, nhiều loài quý hiếm bị đe doạ.',
      ]},
      { h: 'Ô nhiễm môi trường' },
      { p: 'Các vấn đề nổi cộm gồm ô nhiễm nước (sông trong đô thị, khu công nghiệp, làng nghề), ô nhiễm không khí (đô thị lớn, giao thông, sản xuất), rác thải sinh hoạt và nhựa, suy thoái đất. Ngoài ra còn chịu tác động của biến đổi khí hậu: nước biển dâng, thiên tai cực đoan.' },
      { h: 'Biện pháp' },
      { ul: [
        'Sử dụng tài nguyên tiết kiệm, hiệu quả, theo hướng kinh tế tuần hoàn và kinh tế xanh.',
        'Trồng và bảo vệ rừng, bảo tồn đa dạng sinh học qua hệ thống vườn quốc gia, khu bảo tồn.',
        'Xử lí chất thải, kiểm soát ô nhiễm; hoàn thiện luật pháp và nâng cao ý thức cộng đồng.',
      ]},
      { note: 'Phát triển bền vững = hài hoà ba mặt: kinh tế, xã hội và môi trường. Đề thi thích hỏi "biện pháp", hãy nêu cả giải pháp kĩ thuật lẫn quản lí – giáo dục.' },
    ],
    examples: [
      { q: 'Vì sao nói tài nguyên nước của nước ta vừa phong phú vừa tiềm ẩn rủi ro?', a: 'Phong phú vì mạng lưới sông ngòi dày, lượng mưa lớn, tổng lượng nước dồi dào. Rủi ro vì phần lớn lượng nước đến từ ngoài lãnh thổ (phụ thuộc các quốc gia thượng nguồn), phân bố không đều theo mùa (mùa lũ thừa, mùa cạn thiếu) và đang bị ô nhiễm ở nhiều nơi.' },
      { q: 'Đề xuất biện pháp giảm xói mòn đất ở vùng đồi núi.', a: 'Trồng rừng và bảo vệ rừng đầu nguồn; canh tác theo đường đồng mức, làm ruộng bậc thang; trồng cây theo băng, phủ xanh đất trống đồi trọc; hạn chế đốt nương làm rẫy; áp dụng nông – lâm kết hợp để giữ đất và giữ nước.' },
    ],
  },

  'H12DIA-w06-quiz': {
    topic: 'Dân số Việt Nam',
    intro: 'Sang phần Địa lí dân cư. Tuần này các em tìm hiểu quy mô, cơ cấu và phân bố dân số — nền tảng để hiểu nguồn lao động và mọi vấn đề kinh tế – xã hội.',
    objectives: [
      'Trình bày được quy mô và đặc điểm dân số nước ta.',
      'Hiểu được khái niệm cơ cấu dân số vàng và quá trình già hoá.',
      'Phân tích được đặc điểm phân bố dân cư và thành phần dân tộc.',
    ],
    theory: [
      { h: 'Quy mô và gia tăng' },
      { p: 'Nước ta là nước đông dân, quy mô khoảng 100 triệu người (năm 2023), thuộc nhóm đông dân nhất Đông Nam Á và thế giới. Tỉ lệ gia tăng dân số tự nhiên đã giảm đáng kể nhờ chính sách dân số, song mỗi năm dân số vẫn tăng thêm do quy mô lớn.' },
      { h: 'Cơ cấu dân số' },
      { ul: [
        'Cơ cấu theo tuổi đang chuyển từ trẻ sang già hoá: tỉ lệ trẻ em giảm, tỉ lệ người già tăng.',
        'Nước ta bước vào thời kì "cơ cấu dân số vàng" (tỉ lệ người trong tuổi lao động cao) từ khoảng năm 2007, dự báo kéo dài tới khoảng năm 2040.',
        'Cơ cấu giới tính tương đối cân bằng nhưng tỉ số giới tính khi sinh còn mất cân đối.',
      ]},
      { h: 'Phân bố và dân tộc' },
      { p: 'Dân cư phân bố không đều: tập trung đông ở các đồng bằng (đặc biệt Đồng bằng sông Hồng có mật độ cao nhất) và đô thị, thưa ở miền núi. Việt Nam có 54 dân tộc anh em, người Kinh chiếm đa số, các dân tộc thiểu số cư trú chủ yếu ở miền núi và trung du.' },
      { note: 'Cơ cấu dân số vàng là "cơ hội vàng" để phát triển — nhưng chỉ phát huy được nếu đào tạo và tạo việc làm tốt, nếu không sẽ thành gánh nặng khi già hoá.' },
    ],
    examples: [
      { q: 'Vì sao cơ cấu dân số vàng vừa là cơ hội vừa là thách thức?', a: 'Cơ hội: lực lượng lao động dồi dào, tỉ lệ phụ thuộc thấp, thuận lợi để tăng trưởng kinh tế và tích luỹ. Thách thức: nếu không kịp tạo đủ việc làm chất lượng và đào tạo kĩ năng, lao động trẻ sẽ thất nghiệp, lãng phí; khi giai đoạn này kết thúc, dân số già hoá nhanh tạo áp lực an sinh.' },
      { q: 'Đọc Atlat trang Dân số, nhận xét sự phân bố dân cư nước ta.', a: 'Dân cư phân bố rất không đều: tập trung đông đúc, mật độ cao ở các đồng bằng (Đồng bằng sông Hồng cao nhất) và các đô thị lớn như Hà Nội, TP. Hồ Chí Minh; thưa thớt ở miền núi, trung du và Tây Nguyên. Nguyên nhân do điều kiện tự nhiên, lịch sử khai thác lãnh thổ và trình độ phát triển kinh tế.' },
    ],
  },

  'H12DIA-w07-quiz': {
    topic: 'Lao động và việc làm',
    intro: 'Dân số đông tạo nên nguồn lao động dồi dào — một thế mạnh lớn của nước ta. Tuần này các em phân tích đặc điểm nguồn lao động, vấn đề việc làm và hướng giải quyết.',
    objectives: [
      'Nêu được mặt mạnh và hạn chế của nguồn lao động nước ta.',
      'Phân tích được vấn đề việc làm và nguyên nhân sức ép việc làm.',
      'Trình bày được các hướng giải quyết việc làm.',
    ],
    theory: [
      { h: 'Đặc điểm nguồn lao động' },
      { ul: [
        'Mặt mạnh: số lượng đông, tăng nhanh; người lao động cần cù, sáng tạo, có kinh nghiệm, tiếp thu công nghệ nhanh.',
        'Hạn chế: tỉ lệ lao động đã qua đào tạo còn thấp; năng suất lao động chưa cao; cơ cấu và chất lượng chưa đáp ứng yêu cầu hiện đại hoá.',
      ]},
      { h: 'Cơ cấu và phân bố lao động' },
      { p: 'Cơ cấu lao động đang chuyển dịch theo hướng giảm tỉ trọng nông – lâm – thuỷ sản, tăng tỉ trọng công nghiệp – xây dựng và dịch vụ, phù hợp với chuyển dịch cơ cấu kinh tế. Lao động tập trung đông ở đồng bằng và đô thị, thưa ở miền núi và nông thôn.' },
      { h: 'Vấn đề việc làm và hướng giải quyết' },
      { ul: [
        'Sức ép việc làm lớn: thất nghiệp ở thành thị, thiếu việc làm (bán thất nghiệp) ở nông thôn.',
        'Hướng giải quyết: đẩy mạnh phát triển sản xuất, đa dạng hoá ngành nghề; đào tạo nghề gắn với nhu cầu thị trường; phân bố lại lao động – dân cư; đẩy mạnh xuất khẩu lao động.',
      ]},
      { note: 'Xuất khẩu lao động chủ yếu sang Nhật Bản, Hàn Quốc, Đài Loan và một số nước Trung Đông — vừa giải quyết việc làm vừa thu ngoại tệ và nâng tay nghề.' },
    ],
    examples: [
      { q: 'Vì sao nâng cao chất lượng nguồn lao động là vấn đề cấp thiết hiện nay?', a: 'Vì lao động nước ta đông nhưng tỉ lệ qua đào tạo còn thấp, năng suất chưa cao. Trong bối cảnh hội nhập và cách mạng công nghiệp 4.0, chỉ lao động có kĩ năng mới đáp ứng được công nghệ hiện đại, nâng năng suất, tăng sức cạnh tranh và tận dụng được "cơ cấu dân số vàng" trước khi dân số già hoá.' },
      { q: 'Phân tích nguyên nhân thiếu việc làm ở nông thôn nước ta.', a: 'Nông thôn đông dân, đất canh tác bình quân đầu người ít; sản xuất nông nghiệp mang tính mùa vụ nên thời gian nông nhàn nhiều; cơ cấu kinh tế nông thôn chậm chuyển dịch, ít ngành nghề phi nông nghiệp; vì vậy nhiều lao động thiếu việc làm hoặc làm việc không đủ thời gian.' },
    ],
  },

  'H12DIA-w08-quiz': {
    topic: 'Đô thị hoá',
    intro: 'Đô thị hoá là quá trình tất yếu đi cùng công nghiệp hoá. Tuần này các em tìm hiểu đặc điểm, mạng lưới đô thị và tác động hai mặt của đô thị hoá ở nước ta.',
    objectives: [
      'Trình bày được đặc điểm của đô thị hoá ở nước ta.',
      'Nêu được mạng lưới đô thị và các đô thị lớn.',
      'Phân tích được ảnh hưởng tích cực và tiêu cực của đô thị hoá.',
    ],
    theory: [
      { h: 'Đô thị hoá là gì?' },
      { p: 'Đô thị hoá là quá trình kinh tế – xã hội biểu hiện ở sự tăng nhanh số dân thành thị, mở rộng quy mô đô thị và lan toả lối sống thành thị. Tỉ lệ dân thành thị nước ta đang tăng khá nhanh trong những năm gần đây.' },
      { h: 'Đặc điểm đô thị hoá nước ta' },
      { ul: [
        'Trình độ đô thị hoá còn thấp so với khu vực và thế giới.',
        'Diễn ra không đều giữa các vùng; nhiều nơi mang tính tự phát.',
        'Đô thị phân theo loại; hai đô thị đặc biệt là Hà Nội và TP. Hồ Chí Minh.',
        'TP. Hồ Chí Minh có quy mô dân số lớn nhất cả nước.',
      ]},
      { h: 'Ảnh hưởng của đô thị hoá' },
      { ul: [
        'Tích cực: thúc đẩy tăng trưởng kinh tế, chuyển dịch cơ cấu kinh tế và lao động, tạo việc làm, lan toả văn minh đô thị.',
        'Tiêu cực: sức ép lên hạ tầng, nhà ở, việc làm; ô nhiễm môi trường; phân hoá giàu nghèo; ùn tắc giao thông.',
      ]},
      { note: 'Đô thị vừa là động lực phát triển, vừa là nơi bộc lộ rõ mặt trái của tăng trưởng nhanh. Quy hoạch tốt là chìa khoá hạn chế tiêu cực.' },
    ],
    examples: [
      { q: 'Vì sao đô thị hoá thúc đẩy chuyển dịch cơ cấu kinh tế?', a: 'Đô thị là nơi tập trung công nghiệp, dịch vụ, thị trường tiêu thụ và lao động kĩ thuật. Khi đô thị mở rộng, các hoạt động phi nông nghiệp phát triển, kéo theo lao động chuyển từ nông nghiệp sang công nghiệp – dịch vụ, làm thay đổi cơ cấu ngành và cơ cấu lao động theo hướng hiện đại.' },
      { q: 'Nêu những hậu quả tiêu cực khi đô thị hoá diễn ra tự phát, nhanh hơn công nghiệp hoá.', a: 'Hạ tầng (giao thông, cấp thoát nước, trường học, bệnh viện) quá tải; thiếu nhà ở, hình thành khu ổ chuột; thất nghiệp và tệ nạn xã hội gia tăng do dân nông thôn ra thành thị nhưng thiếu việc làm; môi trường đô thị ô nhiễm nặng.' },
    ],
  },

  'H12DIA-w09-quiz': {
    topic: 'Thực hành: dân cư – lao động – đô thị hoá',
    intro: 'Tuần thực hành tổng hợp phần Địa lí dân cư. Các em rèn kĩ năng đọc tháp dân số, chọn dạng biểu đồ phù hợp và rút ra nhận xét — những kĩ năng trực tiếp ghi điểm trong đề thi.',
    objectives: [
      'Đọc và phân tích được tháp dân số.',
      'Chọn được dạng biểu đồ phù hợp với bảng số liệu dân cư.',
      'Rút ra được nhận xét và giải thích từ số liệu.',
    ],
    theory: [
      { h: 'Tháp dân số' },
      { p: 'Tháp dân số thể hiện cơ cấu dân số theo tuổi và giới tính. Đáy rộng – đỉnh nhọn là dân số trẻ; đáy thu hẹp, thân và đỉnh mở rộng là dân số đang già hoá. So sánh tháp các năm cho thấy xu hướng biến đổi cơ cấu tuổi.' },
      { h: 'Chọn dạng biểu đồ' },
      { ul: [
        'Biểu đồ tròn: thể hiện cơ cấu tại một hoặc vài thời điểm (2 – 3 năm).',
        'Biểu đồ miền: thể hiện sự thay đổi cơ cấu qua nhiều năm (ví dụ cơ cấu dân thành thị – nông thôn).',
        'Biểu đồ cột: so sánh quy mô (số dân, mật độ giữa các vùng).',
        'Biểu đồ đường: thể hiện tốc độ tăng trưởng qua thời gian.',
      ]},
      { h: 'Quy trình nhận xét' },
      { p: 'Nhận xét theo trình tự: khái quát chung → chi tiết (số liệu cụ thể, tăng/giảm bao nhiêu) → so sánh → giải thích nguyên nhân. Luôn dẫn số liệu để minh chứng.' },
      { note: 'Từ khoá trong đề rất quan trọng: "cơ cấu, thay đổi cơ cấu qua nhiều năm" → biểu đồ miền; "tốc độ tăng trưởng" → biểu đồ đường; "so sánh quy mô" → biểu đồ cột.' },
    ],
    examples: [
      { q: 'Cho bảng số liệu tỉ lệ dân thành thị và nông thôn nước ta qua các năm 2000, 2010, 2021. Chọn dạng biểu đồ và giải thích.', a: 'Chọn biểu đồ miền vì số liệu là cơ cấu (%) thay đổi qua nhiều năm (3 mốc). Biểu đồ miền vừa thể hiện cơ cấu vừa thể hiện rõ xu hướng: miền dân thành thị mở rộng dần lên trên, chứng tỏ quá trình đô thị hoá đang diễn ra.' },
      { q: 'So sánh tháp dân số nước ta năm 1999 và 2009 cho thấy điều gì?', a: 'Tháp năm 2009 có đáy thu hẹp hơn (tỉ lệ trẻ em giảm) và phần thân, đỉnh nở rộng hơn (tỉ lệ người trưởng thành và người già tăng) so với năm 1999. Điều đó cho thấy dân số nước ta đang có dấu hiệu già hoá, do mức sinh giảm và tuổi thọ tăng.' },
    ],
  },

  'H12DIA-w10-quiz': {
    topic: 'Chuyển dịch cơ cấu kinh tế',
    intro: 'Bắt đầu phần Địa lí kinh tế. Tuần này các em hiểu nền kinh tế nước ta đang chuyển dịch ra sao — theo ngành, theo thành phần và theo lãnh thổ — trong quá trình công nghiệp hoá, hiện đại hoá.',
    objectives: [
      'Phân tích được chuyển dịch cơ cấu kinh tế theo ngành.',
      'Trình bày được chuyển dịch theo thành phần kinh tế và theo lãnh thổ.',
      'Nêu được ý nghĩa và những khó khăn của quá trình chuyển dịch.',
    ],
    theory: [
      { h: 'Chuyển dịch theo ngành' },
      { p: 'Cơ cấu GDP chuyển dịch theo hướng: giảm tỉ trọng khu vực nông – lâm – thuỷ sản; tăng tỉ trọng khu vực công nghiệp – xây dựng và khu vực dịch vụ. Hiện nay dịch vụ chiếm tỉ trọng lớn nhất trong GDP. Nội bộ từng ngành cũng chuyển dịch theo hướng hiện đại.' },
      { h: 'Chuyển dịch theo thành phần kinh tế' },
      { ul: [
        'Kinh tế nhà nước giữ vai trò chủ đạo nhưng tỉ trọng giảm dần.',
        'Kinh tế ngoài nhà nước (tư nhân, tập thể, cá thể) tăng và ngày càng quan trọng.',
        'Khu vực có vốn đầu tư nước ngoài (FDI) tăng nhanh, đóng góp lớn vào xuất khẩu.',
      ]},
      { h: 'Chuyển dịch theo lãnh thổ' },
      { p: 'Hình thành các vùng kinh tế trọng điểm, các vùng chuyên canh nông nghiệp, các khu công nghiệp – khu chế xuất – khu công nghệ cao, tạo nên những lãnh thổ động lực cho tăng trưởng.' },
      { note: 'Xu hướng chung của chuyển dịch là: nông nghiệp giảm, công nghiệp – dịch vụ tăng. Đây là biểu hiện của công nghiệp hoá, hiện đại hoá.' },
    ],
    examples: [
      { q: 'Vì sao chuyển dịch cơ cấu kinh tế theo hướng tăng công nghiệp – dịch vụ là tất yếu?', a: 'Vì đó là quy luật của công nghiệp hoá, hiện đại hoá: công nghiệp và dịch vụ có năng suất, giá trị gia tăng cao hơn nông nghiệp, giúp tăng trưởng nhanh, nâng cao thu nhập và sức cạnh tranh; đồng thời phù hợp xu thế hội nhập, tận dụng được vốn, công nghệ và thị trường quốc tế.' },
      { q: 'Khu vực FDI có vai trò gì trong nền kinh tế nước ta?', a: 'Khu vực FDI bổ sung nguồn vốn lớn, mang theo công nghệ và trình độ quản lí hiện đại; tạo nhiều việc làm; đóng góp lớn vào giá trị sản xuất công nghiệp và đặc biệt là kim ngạch xuất khẩu (điện thoại, điện tử); thúc đẩy chuyển dịch cơ cấu kinh tế và hội nhập quốc tế.' },
    ],
  },

  'H12DIA-w11-quiz': {
    topic: 'Nông nghiệp — ngành trồng trọt',
    intro: 'Nông nghiệp vẫn là nền tảng quan trọng. Tuần này các em tìm hiểu ngành trồng trọt: cây lương thực, cây công nghiệp và sự phân bố các vùng chuyên canh.',
    objectives: [
      'Trình bày được tình hình sản xuất cây lương thực.',
      'Nêu được các cây công nghiệp chủ lực và vùng phân bố.',
      'Giải thích được sự phân bố cây trồng theo điều kiện sinh thái.',
    ],
    theory: [
      { h: 'Cây lương thực' },
      { p: 'Lúa là cây lương thực chủ đạo, được trồng khắp cả nước, tập trung lớn nhất ở Đồng bằng sông Cửu Long (vựa lúa số một, hơn một nửa sản lượng cả nước) và Đồng bằng sông Hồng. Nước ta là một trong những nước xuất khẩu gạo hàng đầu thế giới.' },
      { h: 'Cây công nghiệp' },
      { ul: [
        'Cây công nghiệp lâu năm: cà phê (Tây Nguyên đứng đầu), cao su (Đông Nam Bộ và Tây Nguyên), hồ tiêu, điều, chè (Trung du và miền núi Bắc Bộ — Thái Nguyên, Phú Thọ).',
        'Cây công nghiệp hàng năm: mía, lạc, đậu tương, thuốc lá, bông…',
        'Nhiều mặt hàng xuất khẩu hàng đầu: gạo, cà phê, hồ tiêu, hạt điều, cao su.',
      ]},
      { h: 'Cơ sở phân bố' },
      { p: 'Sự phân bố cây trồng phụ thuộc điều kiện sinh thái: cà phê và cao su ưa đất badan, khí hậu cận xích đạo (Tây Nguyên, Đông Nam Bộ); chè ưa khí hậu mát, đất feralit đồi núi (vùng Bắc Bộ); lúa cần đất phù sa, nước dồi dào (các đồng bằng).' },
      { note: 'Ghi nhớ cặp "cây – vùng": cà phê → Tây Nguyên; cao su → Đông Nam Bộ; chè → Trung du và miền núi Bắc Bộ; lúa → hai đồng bằng lớn.' },
    ],
    examples: [
      { q: 'Vì sao Tây Nguyên là vùng chuyên canh cà phê lớn nhất nước ta?', a: 'Vì Tây Nguyên có diện tích đất badan rộng, màu mỡ, tầng phong hoá dày; khí hậu cận xích đạo với mùa khô rõ rệt thuận lợi cho phơi sấy và thu hoạch; địa hình cao nguyên xếp tầng dễ canh tác quy mô lớn; cùng kinh nghiệm sản xuất và thị trường xuất khẩu rộng.' },
      { q: 'Đọc Atlat trang Nông nghiệp, hãy kể tên các vùng trồng lúa lớn và giải thích.', a: 'Hai vùng trồng lúa lớn nhất là Đồng bằng sông Cửu Long và Đồng bằng sông Hồng. Lí do: đất phù sa màu mỡ, địa hình bằng phẳng, nguồn nước dồi dào, khí hậu nhiệt đới ẩm, dân cư đông và giàu kinh nghiệm thâm canh lúa nước.' },
    ],
  },

  'H12DIA-w12-quiz': {
    topic: 'Nông nghiệp — chăn nuôi và thuỷ sản',
    intro: 'Tiếp tục phần nông nghiệp, tuần này các em tìm hiểu ngành chăn nuôi và thuỷ sản — hai ngành đang phát triển mạnh, gắn với thế mạnh biển và nguồn thức ăn dồi dào.',
    objectives: [
      'Trình bày được tình hình và phân bố ngành chăn nuôi.',
      'Phân tích được thế mạnh và tình hình phát triển thuỷ sản.',
      'Giải thích được sự phân bố thuỷ sản theo điều kiện tự nhiên.',
    ],
    theory: [
      { h: 'Chăn nuôi' },
      { ul: [
        'Tỉ trọng chăn nuôi trong nông nghiệp đang tăng nhưng vẫn nhỏ hơn trồng trọt.',
        'Đàn lợn nuôi nhiều ở Đồng bằng sông Hồng và Trung du miền núi Bắc Bộ (gần nguồn thức ăn, thị trường).',
        'Đàn gia cầm tập trung ở các đồng bằng đông dân.',
        'Bò sữa phát triển ở nơi khí hậu mát (Mộc Châu, Lâm Đồng) và ven các đô thị lớn.',
      ]},
      { h: 'Thuỷ sản — thế mạnh' },
      { p: 'Nước ta có bờ biển dài, vùng biển rộng với bốn ngư trường trọng điểm; nhiều bãi triều, đầm phá, rừng ngập mặn; mạng lưới sông hồ dày đặc — rất thuận lợi cho cả khai thác và nuôi trồng thuỷ sản.' },
      { h: 'Tình hình phát triển' },
      { p: 'Sản lượng thuỷ sản tăng nhanh, nuôi trồng ngày càng chiếm tỉ trọng lớn. Các tỉnh dẫn đầu chủ yếu ở ven biển và Đồng bằng sông Cửu Long như Kiên Giang, Cà Mau, Bình Thuận, Bà Rịa – Vũng Tàu. Thuỷ sản là mặt hàng xuất khẩu chủ lực (tôm, cá tra…).' },
      { note: 'Phân biệt khai thác (đánh bắt trên biển) và nuôi trồng (trong ao, đầm, lồng bè). Xu hướng hiện nay là tăng nuôi trồng để chủ động sản lượng và bảo vệ nguồn lợi.' },
    ],
    examples: [
      { q: 'Vì sao Đồng bằng sông Cửu Long là vùng trọng điểm nuôi trồng thuỷ sản lớn nhất nước ta?', a: 'Vì vùng có hệ thống sông ngòi, kênh rạch chằng chịt, nhiều bãi triều và rừng ngập mặn; diện tích mặt nước nuôi trồng lớn (nuôi tôm, cá tra); khí hậu cận xích đạo ổn định; lại có thị trường xuất khẩu rộng và công nghiệp chế biến phát triển.' },
      { q: 'Giải thích vì sao đàn lợn tập trung nhiều ở Đồng bằng sông Hồng.', a: 'Vì đây là vùng trồng lúa và hoa màu lớn, cung cấp nguồn thức ăn dồi dào cho chăn nuôi; dân cư đông tạo thị trường tiêu thụ lớn tại chỗ; người dân có kinh nghiệm chăn nuôi lâu đời và cơ sở chế biến thức ăn, thú y phát triển.' },
    ],
  },

  'H12DIA-w13-quiz': {
    topic: 'Lâm nghiệp',
    intro: 'Rừng giữ vai trò sống còn về môi trường và kinh tế. Tuần này các em tìm hiểu ba loại rừng, hiện trạng tài nguyên rừng và biện pháp bảo vệ.',
    objectives: [
      'Phân biệt được ba loại rừng theo chức năng.',
      'Nêu được hiện trạng tài nguyên rừng nước ta.',
      'Đề xuất được biện pháp bảo vệ và phát triển rừng.',
    ],
    theory: [
      { h: 'Ba loại rừng' },
      { ul: [
        'Rừng phòng hộ: bảo vệ nguồn nước, đất, chống xói mòn, hạn chế lũ lụt – hạn hán, chắn gió, chắn sóng.',
        'Rừng đặc dụng: bảo tồn đa dạng sinh học, nghiên cứu khoa học, du lịch (vườn quốc gia, khu bảo tồn).',
        'Rừng sản xuất: cung cấp gỗ, lâm sản, kết hợp bảo vệ môi trường.',
      ]},
      { h: 'Hiện trạng tài nguyên rừng' },
      { p: 'Nhờ trồng rừng và bảo vệ rừng, độ che phủ rừng đã tăng trở lại (đạt trên 42%). Tuy nhiên chất lượng rừng tự nhiên suy giảm: phần lớn là rừng nghèo và rừng mới phục hồi; vẫn còn nạn chặt phá rừng, cháy rừng, mất rừng đầu nguồn.' },
      { h: 'Biện pháp bảo vệ' },
      { ul: [
        'Trồng rừng, khoanh nuôi tái sinh, phủ xanh đất trống đồi trọc.',
        'Giao đất, giao rừng cho người dân và cộng đồng quản lí.',
        'Tăng cường giám sát, xử lí vi phạm; phòng chống cháy rừng; tuyên truyền, giáo dục cộng đồng.',
      ]},
      { note: 'Phân biệt "diện tích rừng" và "chất lượng rừng": độ che phủ tăng không có nghĩa rừng tốt lên — rừng tự nhiên giàu vẫn đang giảm.' },
    ],
    examples: [
      { q: 'Vì sao phải đặc biệt chú trọng bảo vệ rừng phòng hộ đầu nguồn?', a: 'Vì rừng đầu nguồn giữ vai trò điều tiết nguồn nước, hạn chế lũ lụt vào mùa mưa và giảm hạn hán vào mùa khô; chống xói mòn, sạt lở đất; bảo vệ các công trình thuỷ điện, thuỷ lợi ở hạ lưu. Mất rừng đầu nguồn sẽ gây lũ quét, sạt lở và bồi lấp lòng hồ nghiêm trọng.' },
      { q: 'Vườn quốc gia thuộc loại rừng nào và có ý nghĩa gì?', a: 'Vườn quốc gia thuộc rừng đặc dụng. Ý nghĩa: bảo tồn các hệ sinh thái và loài sinh vật quý hiếm (đa dạng sinh học), phục vụ nghiên cứu khoa học, giáo dục môi trường và phát triển du lịch sinh thái — ví dụ Cúc Phương, Cát Tiên, Phong Nha – Kẻ Bàng.' },
    ],
  },

  'H12DIA-w14-quiz': {
    topic: 'Công nghiệp — cơ cấu ngành',
    intro: 'Công nghiệp là động lực của công nghiệp hoá. Tuần này các em tìm hiểu cơ cấu ngành công nghiệp đa dạng và một số ngành nổi bật của nước ta.',
    objectives: [
      'Trình bày được cơ cấu ngành công nghiệp nước ta.',
      'Nêu được đặc điểm một số ngành quan trọng.',
      'Giải thích được vai trò của khu vực FDI trong công nghiệp.',
    ],
    theory: [
      { h: 'Cơ cấu ngành công nghiệp' },
      { p: 'Công nghiệp nước ta có cơ cấu khá đa dạng, gồm ba nhóm: công nghiệp khai khoáng; công nghiệp chế biến, chế tạo; sản xuất và phân phối điện, khí đốt, nước. Trong đó công nghiệp chế biến, chế tạo chiếm tỉ trọng lớn nhất và là trụ cột tăng trưởng.' },
      { h: 'Một số ngành nổi bật' },
      { ul: [
        'Dầu khí: ngành mũi nhọn, đóng góp lớn cho ngân sách và xuất khẩu.',
        'Điện – năng lượng: thuỷ điện, nhiệt điện và năng lượng tái tạo (điện gió, điện mặt trời) đang được đẩy mạnh.',
        'Dệt may, da giày: thâm dụng lao động, kim ngạch xuất khẩu lớn.',
        'Điện tử – sản xuất điện thoại: phát triển mạnh nhờ FDI (Samsung, LG, Intel…).',
      ]},
      { h: 'Vai trò của FDI' },
      { p: 'Khu vực FDI là động lực quan trọng đưa các ngành công nghệ cao (điện tử, điện thoại) trở thành mặt hàng xuất khẩu chủ lực, làm thay đổi diện mạo công nghiệp và cơ cấu xuất khẩu của nước ta.' },
      { note: 'Phân biệt công nghiệp "thâm dụng lao động" (dệt may, da giày) và "công nghệ cao" (điện tử). Xu hướng là nâng dần tỉ trọng công nghiệp công nghệ cao.' },
    ],
    examples: [
      { q: 'Vì sao công nghiệp chế biến, chế tạo giữ vai trò chủ đạo trong cơ cấu công nghiệp nước ta?', a: 'Vì nhóm này có giá trị gia tăng cao, sử dụng nhiều lao động, gắn với chế biến nông – lâm – thuỷ sản dồi dào và thu hút mạnh vốn FDI (điện tử, dệt may). Nó đóng góp lớn nhất vào giá trị sản xuất công nghiệp và kim ngạch xuất khẩu, là động lực chính của tăng trưởng.' },
      { q: 'Phân tích thuận lợi để phát triển công nghiệp dệt may ở nước ta.', a: 'Nguồn lao động dồi dào, giá nhân công tương đối thấp, khéo léo; thị trường trong và ngoài nước rộng lớn; được hưởng ưu đãi từ các hiệp định thương mại tự do; nhiều doanh nghiệp và khu công nghiệp đã hình thành. Hạn chế là phụ thuộc nguyên phụ liệu nhập khẩu.' },
    ],
  },

  'H12DIA-w15-quiz': {
    topic: 'Công nghiệp — phân bố lãnh thổ',
    intro: 'Công nghiệp không phân bố đều khắp mà tập trung ở những địa bàn có nhiều lợi thế. Tuần này các em tìm hiểu sự phân bố công nghiệp và các hình thức tổ chức lãnh thổ công nghiệp.',
    objectives: [
      'Trình bày được đặc điểm phân bố công nghiệp nước ta.',
      'Xác định được các trung tâm công nghiệp lớn.',
      'Nêu được các hình thức tổ chức lãnh thổ công nghiệp.',
    ],
    theory: [
      { h: 'Đặc điểm phân bố' },
      { p: 'Công nghiệp phân bố không đều, tập trung chủ yếu ở đồng bằng và ven biển, đặc biệt tại các đô thị lớn và vùng kinh tế trọng điểm. Miền núi, Tây Nguyên có mật độ công nghiệp thấp hơn.' },
      { h: 'Các trung tâm công nghiệp lớn' },
      { ul: [
        'Phía Bắc: Hà Nội và phụ cận (vùng kinh tế trọng điểm Bắc Bộ), Hải Phòng.',
        'Miền Trung: Đà Nẵng là trung tâm lớn nhất.',
        'Phía Nam: TP. Hồ Chí Minh (sau 2025 đã gồm Bình Dương, Bà Rịa – Vũng Tàu) cùng Đồng Nai, Tây Ninh.',
      ]},
      { h: 'Hình thức tổ chức lãnh thổ' },
      { ul: [
        'Điểm công nghiệp, khu công nghiệp, khu chế xuất, khu công nghệ cao.',
        'Trung tâm công nghiệp, vùng công nghiệp.',
        'Khu công nghiệp tập trung nhiều ở vùng kinh tế trọng điểm phía Nam và phía Bắc.',
      ]},
      { note: 'Sự phân bố công nghiệp do tổng hợp nhiều nhân tố: tài nguyên, lao động, thị trường, cơ sở hạ tầng, vị trí và chính sách — không thể quy về một nhân tố duy nhất.' },
    ],
    examples: [
      { q: 'Vì sao công nghiệp tập trung mạnh ở Đông Nam Bộ?', a: 'Vì vùng có vị trí thuận lợi, cơ sở hạ tầng tốt nhất nước; nguồn lao động kĩ thuật dồi dào; thu hút FDI mạnh; có TP. Hồ Chí Minh là trung tâm kinh tế lớn nhất; gần nguồn dầu khí và cảng biển; cùng chính sách ưu đãi của vùng kinh tế trọng điểm phía Nam.' },
      { q: 'Đọc Atlat trang Công nghiệp chung, hãy nhận xét sự phân bố các trung tâm công nghiệp lớn.', a: 'Các trung tâm công nghiệp lớn (quy mô rất lớn và lớn) tập trung ở Đồng bằng sông Hồng (Hà Nội, Hải Phòng) và Đông Nam Bộ (TP. Hồ Chí Minh, Biên Hoà, Thủ Dầu Một, Vũng Tàu); miền Trung chỉ có Đà Nẵng nổi bật; vùng núi và Tây Nguyên thưa thớt. Nguyên nhân do khác biệt về hạ tầng, lao động và thị trường.' },
    ],
  },

  'H12DIA-w16-quiz': {
    topic: 'Một số ngành công nghiệp trọng điểm',
    intro: 'Tuần này các em đi sâu vào các ngành công nghiệp trọng điểm — những ngành có thế mạnh lâu dài, hiệu quả kinh tế cao và tác động mạnh tới các ngành khác.',
    objectives: [
      'Trình bày được tình hình ngành công nghiệp năng lượng.',
      'Nêu được đặc điểm công nghiệp chế biến lương thực – thực phẩm.',
      'Phân tích thế mạnh của công nghiệp sản xuất hàng tiêu dùng.',
    ],
    theory: [
      { h: 'Công nghiệp năng lượng' },
      { ul: [
        'Khai thác than: tập trung ở Quảng Ninh.',
        'Khai thác dầu khí: ở thềm lục địa phía Nam (bể Cửu Long, Nam Côn Sơn).',
        'Sản xuất điện: thuỷ điện (Sơn La – lớn nhất, Hoà Bình, Ialy, Trị An), nhiệt điện, và năng lượng tái tạo (điện gió, điện mặt trời) phát triển nhanh.',
      ]},
      { h: 'Công nghiệp chế biến lương thực – thực phẩm' },
      { p: 'Là ngành trọng điểm nhờ nguồn nguyên liệu nông – lâm – thuỷ sản dồi dào và thị trường tiêu thụ rộng. Gồm chế biến sản phẩm trồng trọt (xay xát, đường, cà phê), chế biến sản phẩm chăn nuôi và chế biến thuỷ – hải sản. Phân bố gắn với vùng nguyên liệu và đô thị.' },
      { h: 'Công nghiệp sản xuất hàng tiêu dùng' },
      { p: 'Tiêu biểu là dệt may, da giày: thâm dụng lao động, vốn đầu tư không quá lớn, thu hồi vốn nhanh, là mặt hàng xuất khẩu chủ lực. Phân bố tập trung ở các đô thị và vùng đông dân.' },
      { note: 'Ngành trọng điểm có ba đặc trưng: thế mạnh lâu dài, hiệu quả kinh tế – xã hội cao, và tác động mạnh tới các ngành kinh tế khác.' },
    ],
    examples: [
      { q: 'Vì sao công nghiệp chế biến lương thực – thực phẩm là ngành trọng điểm của nước ta?', a: 'Vì có nguồn nguyên liệu tại chỗ phong phú từ nền nông nghiệp nhiệt đới và nghề biển; thị trường tiêu thụ rộng (gần 100 triệu dân và xuất khẩu); cần vốn ít, quay vòng nhanh, sử dụng nhiều lao động; lại thúc đẩy nông nghiệp, thương mại, giao thông phát triển — hội đủ tiêu chí của ngành trọng điểm.' },
      { q: 'Vì sao thuỷ điện phát triển mạnh ở nước ta?', a: 'Vì nước ta có mạng lưới sông ngòi dày, nhiều sông lớn chảy trên địa hình dốc (sông Đà, sông Đồng Nai, các sông ở Tây Nguyên) tạo trữ năng thuỷ điện lớn; lượng mưa dồi dào bổ sung nước. Nhờ vậy đã xây dựng nhiều nhà máy lớn như Sơn La, Hoà Bình, Ialy, Trị An.' },
    ],
  },

  'H12DIA-w17-quiz': {
    topic: 'Ôn tập học kì 1',
    intro: 'Tuần ôn tập hệ thống lại toàn bộ học kì 1: từ vị trí địa lí, thiên nhiên, dân cư đến nông nghiệp và công nghiệp. Các em hãy nắm các "từ khoá – con số" để làm nhanh câu trắc nghiệm.',
    objectives: [
      'Hệ thống hoá kiến thức Địa lí tự nhiên và dân cư.',
      'Củng cố kiến thức về nông nghiệp và công nghiệp.',
      'Rèn kĩ năng chọn nhanh đáp án qua từ khoá.',
    ],
    theory: [
      { h: 'Địa lí tự nhiên — chốt ý' },
      { ul: [
        'Vị trí: rìa đông bán đảo Đông Dương, nội chí tuyến → nhiệt đới ẩm gió mùa.',
        'Phân hoá: Bắc – Nam (ranh giới Bạch Mã), Đông – Tây, theo độ cao (3 đai).',
        'Ranh giới khí hậu Bắc – Nam: dãy Bạch Mã (đèo Hải Vân).',
      ]},
      { h: 'Dân cư — chốt ý' },
      { ul: [
        'Đông dân (~100 triệu), 54 dân tộc; đang già hoá; cơ cấu dân số vàng (2007 – ~2040).',
        'Phân bố không đều: Đồng bằng sông Hồng mật độ cao nhất.',
        'TP. Hồ Chí Minh là đô thị đông dân nhất; hai đô thị đặc biệt: Hà Nội và TP. Hồ Chí Minh.',
      ]},
      { h: 'Kinh tế — chốt ý' },
      { ul: [
        'Chuyển dịch: giảm nông nghiệp, tăng công nghiệp – dịch vụ; dịch vụ chiếm tỉ trọng lớn nhất GDP.',
        'Cây – vùng: cà phê → Tây Nguyên; cao su → Đông Nam Bộ; chè → Bắc Bộ; lúa → 2 đồng bằng.',
        'Công nghiệp tập trung ở đồng bằng, ven biển và vùng kinh tế trọng điểm.',
      ]},
      { note: 'Trắc nghiệm Địa thường gài ở "con số" và "vùng phân bố". Học theo cặp từ khoá – con số giúp loại nhanh đáp án sai.' },
    ],
    examples: [
      { q: 'Hãy lập sơ đồ tư duy ngắn liên hệ vị trí địa lí với các đặc điểm tự nhiên.', a: 'Vị trí nội chí tuyến → nền nhiệt cao (nhiệt đới). Giáp Biển Đông + khu vực gió mùa → mưa nhiều, độ ẩm lớn, hai mùa gió (ẩm, gió mùa). Lãnh thổ kéo dài và nhiều đồi núi → phân hoá Bắc – Nam, Đông – Tây và theo độ cao. Như vậy mọi đặc điểm tự nhiên đều bắt nguồn từ vị trí.' },
      { q: 'Nêu xu hướng chuyển dịch cơ cấu kinh tế nước ta bằng một câu.', a: 'Cơ cấu kinh tế chuyển dịch theo hướng giảm tỉ trọng nông – lâm – thuỷ sản, tăng tỉ trọng công nghiệp – xây dựng và dịch vụ, phù hợp với quá trình công nghiệp hoá, hiện đại hoá và hội nhập.' },
    ],
  },

  'H12DIA-w18-quiz': {
    topic: 'Kiểm tra học kì 1',
    intro: 'Tuần kiểm tra học kì 1. Phần này nhắc lại các số liệu và dữ kiện hay được hỏi, đồng thời lưu ý kĩ năng làm bài để các em tự tin bước vào bài kiểm tra.',
    objectives: [
      'Củng cố các số liệu, dữ kiện trọng tâm của học kì 1.',
      'Rèn kĩ năng đọc Atlat và phân biệt dạng câu hỏi.',
      'Quản lí thời gian và kiểm soát "bẫy" trắc nghiệm.',
    ],
    theory: [
      { h: 'Số liệu cần nhớ' },
      { ul: [
        'Diện tích đất liền ~331 nghìn km²; bờ biển ~3.260 km; vùng biển ~1 triệu km².',
        'Toạ độ đất liền: ~8°34\'B – 23°23\'B.',
        '54 dân tộc; dân số ~100 triệu; độ che phủ rừng trên 42%.',
      ]},
      { h: 'Dữ kiện vùng – ngành' },
      { ul: [
        'Vựa lúa lớn nhất: Đồng bằng sông Cửu Long; mật độ dân số cao nhất: Đồng bằng sông Hồng.',
        'Trung tâm công nghiệp lớn nhất miền Trung: Đà Nẵng.',
        'Gió mùa Tây Nam hoạt động mùa hạ (tháng 5 – 10); gió mùa Đông Bắc hoạt động mùa đông.',
      ]},
      { h: 'Kĩ năng làm bài' },
      { p: 'Đọc kĩ từ khoá câu hỏi; câu có Atlat thì mở đúng trang; câu cơ cấu/biểu đồ thì xác định dạng biểu đồ phù hợp; câu lí thuyết thì loại trừ đáp án phi lí; phân bổ thời gian hợp lí, không sa đà một câu.' },
      { note: 'Atlat Địa lí Việt Nam được phép sử dụng khi thi — hãy tận dụng triệt để cho các câu hỏi về phân bố và số liệu.' },
    ],
    examples: [
      { q: 'Đường bờ biển nước ta dài bao nhiêu và điều đó có ý nghĩa gì?', a: 'Bờ biển dài khoảng 3.260 km, kéo dài qua 28 tỉnh, thành phố ven biển. Ý nghĩa: tạo điều kiện phát triển tổng hợp kinh tế biển (thuỷ sản, du lịch, giao thông, dầu khí, năng lượng tái tạo) nhưng cũng đòi hỏi nhiệm vụ bảo vệ chủ quyền và phòng chống thiên tai từ biển.' },
      { q: 'Gặp câu "Để thể hiện tốc độ tăng trưởng sản lượng lúa qua các năm, dạng biểu đồ thích hợp nhất là gì?", em chọn thế nào?', a: 'Từ khoá "tốc độ tăng trưởng qua các năm" → chọn biểu đồ đường (sau khi xử lí số liệu về dạng chỉ số %, lấy năm gốc = 100%). Đây là dạng câu kĩ năng quen thuộc, nhận diện qua từ khoá là làm nhanh được.' },
    ],
  },

  'H12DIA-w19-quiz': {
    topic: 'Dịch vụ — giao thông vận tải',
    intro: 'Mở đầu học kì 2 với khu vực dịch vụ. Tuần này các em tìm hiểu mạng lưới giao thông vận tải — "mạch máu" của nền kinh tế.',
    objectives: [
      'Trình bày được đặc điểm mạng lưới giao thông vận tải nước ta.',
      'Xác định được các tuyến, đầu mối giao thông quan trọng.',
      'Giải thích được vai trò của giao thông vận tải.',
    ],
    theory: [
      { h: 'Mạng lưới đa dạng' },
      { p: 'Nước ta có đủ các loại hình: đường bộ, đường sắt, đường sông, đường biển, đường hàng không và đường ống. Trong đó đường bộ đảm nhận khối lượng vận chuyển lớn nhất; hàng không và đường bộ cao tốc phát triển nhanh nhất hiện nay.' },
      { h: 'Các tuyến và đầu mối chính' },
      { ul: [
        'Đường bộ: quốc lộ 1A và đường Hồ Chí Minh là hai trục xuyên Bắc – Nam quan trọng nhất.',
        'Đường sắt: tuyến Thống Nhất (Bắc – Nam) dài khoảng 1.726 km, nối Hà Nội với TP. Hồ Chí Minh.',
        'Cảng biển: Hải Phòng (lớn nhất miền Bắc), Đà Nẵng, các cảng nước sâu ở Bà Rịa – Vũng Tàu.',
        'Hàng không: Tân Sơn Nhất (lớn nhất về lượng khách), Nội Bài, Đà Nẵng.',
      ]},
      { h: 'Vai trò' },
      { p: 'Giao thông vận tải kết nối sản xuất với tiêu dùng, các vùng với nhau và với quốc tế; thúc đẩy phân bố lại sản xuất và dân cư; góp phần phát triển kinh tế và bảo đảm an ninh quốc phòng.' },
      { note: 'Hai đầu mối giao thông tổng hợp lớn nhất là Hà Nội và TP. Hồ Chí Minh — nơi hội tụ mọi loại hình vận tải.' },
    ],
    examples: [
      { q: 'Vì sao đường bộ giữ vai trò quan trọng nhất trong vận tải nước ta?', a: 'Vì đường bộ cơ động, linh hoạt, có thể đến tận nơi sản xuất và tiêu dùng; phù hợp với địa hình kéo dài và phân tán của nước ta; chi phí đầu tư từng đoạn thấp hơn đường sắt; được đầu tư mạnh (quốc lộ, cao tốc) nên đảm nhận phần lớn khối lượng hàng hoá và hành khách.' },
      { q: 'Đọc Atlat trang Giao thông, hãy nêu vai trò của quốc lộ 1A.', a: 'Quốc lộ 1A là tuyến đường bộ "xương sống", chạy gần như suốt chiều dài đất nước từ Lạng Sơn đến Cà Mau, nối hầu hết các đô thị, vùng kinh tế và đầu mối giao thông lớn. Nó đảm nhận khối lượng vận chuyển hàng hoá, hành khách lớn nhất và có ý nghĩa cả về kinh tế lẫn quốc phòng.' },
    ],
  },

  'H12DIA-w20-quiz': {
    topic: 'Dịch vụ — bưu chính viễn thông và chuyển đổi số',
    intro: 'Tuần này các em tìm hiểu ngành bưu chính viễn thông và xu hướng chuyển đổi số — lĩnh vực phát triển bùng nổ và đang thay đổi cả cách sản xuất lẫn đời sống.',
    objectives: [
      'Trình bày được tình hình phát triển bưu chính viễn thông.',
      'Nêu được biểu hiện và ý nghĩa của chuyển đổi số.',
      'Giải thích được sự chuyển dịch của ngành bưu chính.',
    ],
    theory: [
      { h: 'Viễn thông' },
      { ul: [
        'Mạng lưới viễn thông hiện đại, phủ rộng khắp cả nước.',
        'Mạng di động phổ biến 4G, đang triển khai 5G.',
        'Tỉ lệ người dùng internet cao (trên 70% dân số), thuộc nhóm tăng trưởng nhanh.',
      ]},
      { h: 'Bưu chính' },
      { p: 'Ngành bưu chính chuyển dịch mạnh từ dịch vụ thư tín truyền thống sang logistics, chuyển phát nhanh và phục vụ thương mại điện tử, đáp ứng nhu cầu mua bán trực tuyến đang bùng nổ.' },
      { h: 'Chuyển đổi số' },
      { p: 'Chuyển đổi số được đẩy mạnh trên ba trụ cột: kinh tế số (thương mại điện tử, thanh toán không tiền mặt), chính phủ số (dịch vụ công trực tuyến) và xã hội số. Đây là động lực mới cho tăng trưởng và hội nhập.' },
      { note: 'Bưu chính viễn thông vừa là ngành dịch vụ, vừa là hạ tầng nền tảng cho mọi ngành khác trong thời đại số.' },
    ],
    examples: [
      { q: 'Vì sao ngành bưu chính phải chuyển dịch sang logistics và chuyển phát nhanh?', a: 'Vì thư tín truyền thống giảm mạnh do email, mạng xã hội thay thế; trong khi thương mại điện tử bùng nổ tạo nhu cầu khổng lồ về vận chuyển, giao nhận hàng hoá. Để tồn tại và phát triển, bưu chính chuyển trọng tâm sang logistics, kho vận và chuyển phát nhanh phục vụ mua sắm trực tuyến.' },
      { q: 'Chuyển đổi số mang lại lợi ích gì cho phát triển kinh tế – xã hội?', a: 'Nâng cao năng suất và hiệu quả sản xuất; mở rộng thị trường qua thương mại điện tử; minh bạch và tiện lợi hoá dịch vụ công (chính phủ số); tạo việc làm và ngành nghề mới; thu hẹp khoảng cách vùng miền nhờ tiếp cận thông tin – dịch vụ trực tuyến.' },
    ],
  },

  'H12DIA-w21-quiz': {
    topic: 'Dịch vụ — thương mại',
    intro: 'Thương mại là cầu nối giữa sản xuất và tiêu dùng, trong nước và quốc tế. Tuần này các em tìm hiểu nội thương, ngoại thương và đặc điểm cán cân thương mại nước ta.',
    objectives: [
      'Phân biệt được nội thương và ngoại thương.',
      'Nêu được cơ cấu hàng xuất – nhập khẩu và các đối tác lớn.',
      'Phân tích được đặc điểm cán cân thương mại nước ta.',
    ],
    theory: [
      { h: 'Nội thương' },
      { p: 'Nội thương phát triển nhanh với hệ thống chợ truyền thống, siêu thị, trung tâm thương mại và đặc biệt là thương mại điện tử bùng nổ. Hoạt động sôi động nhất ở các đô thị lớn và vùng đông dân.' },
      { h: 'Ngoại thương' },
      { ul: [
        'Xuất khẩu: điện thoại – linh kiện, máy tính – điện tử, dệt may, da giày, nông – thuỷ sản.',
        'Nhập khẩu: máy móc thiết bị, nguyên – nhiên liệu, linh kiện phục vụ sản xuất.',
        'Đối tác lớn: Trung Quốc, Hoa Kỳ, Hàn Quốc, Nhật Bản, EU, ASEAN.',
      ]},
      { h: 'Cán cân thương mại' },
      { p: 'Nhiều năm gần đây cán cân thương mại có xu hướng xuất siêu (xuất khẩu lớn hơn nhập khẩu). Việt Nam tham gia nhiều hiệp định thương mại tự do thế hệ mới, mở rộng thị trường và nâng cao vị thế trong chuỗi giá trị toàn cầu.' },
      { note: 'Xuất siêu là tín hiệu tích cực, nhưng phần lớn giá trị xuất khẩu đến từ khu vực FDI — đây là điểm cần lưu ý khi đánh giá nội lực nền kinh tế.' },
    ],
    examples: [
      { q: 'Vì sao kim ngạch xuất khẩu của nước ta tăng nhanh trong những năm gần đây?', a: 'Do thu hút mạnh FDI vào công nghiệp chế biến, chế tạo (đặc biệt điện thoại, điện tử); tham gia nhiều hiệp định thương mại tự do giúp giảm thuế và mở rộng thị trường; nguồn lao động dồi dào giá rẻ; cùng các mặt hàng nông – thuỷ sản truyền thống có thế mạnh.' },
      { q: 'Vì sao nước ta vừa xuất khẩu nông sản hàng đầu vừa phải nhập khẩu nhiều máy móc, nguyên liệu?', a: 'Xuất khẩu nông sản nhờ thế mạnh nông nghiệp nhiệt đới (gạo, cà phê, thuỷ sản). Nhập nhiều máy móc, nguyên liệu vì công nghiệp còn phụ thuộc công nghệ và nguyên phụ liệu nước ngoài (dệt may, điện tử gia công). Đó là đặc điểm của nền kinh tế đang công nghiệp hoá, hội nhập sâu.' },
    ],
  },

  'H12DIA-w22-quiz': {
    topic: 'Dịch vụ — du lịch',
    intro: 'Du lịch là ngành kinh tế tổng hợp, giàu tiềm năng. Tuần này các em tìm hiểu tài nguyên du lịch, các trung tâm du lịch và những thách thức của ngành.',
    objectives: [
      'Phân loại được tài nguyên du lịch tự nhiên và nhân văn.',
      'Kể được các trung tâm, di sản du lịch tiêu biểu.',
      'Phân tích được vai trò và thách thức của ngành du lịch.',
    ],
    theory: [
      { h: 'Tài nguyên du lịch' },
      { ul: [
        'Tự nhiên: bãi biển, vịnh, đảo, hang động, vườn quốc gia, khí hậu, nguồn nước khoáng.',
        'Nhân văn: di tích lịch sử – văn hoá, lễ hội, làng nghề, ẩm thực, di sản được UNESCO công nhận.',
      ]},
      { h: 'Các trung tâm và di sản' },
      { ul: [
        'Di sản UNESCO: Vịnh Hạ Long, Phong Nha – Kẻ Bàng, phố cổ Hội An, thánh địa Mỹ Sơn, cố đô Huế, Thành nhà Hồ, Hoàng thành Thăng Long.',
        'Du lịch biển: Hạ Long, Đà Nẵng, Nha Trang, Mũi Né, Phú Quốc.',
        'Du lịch sinh thái: Phong Nha, Cát Tiên, Cúc Phương, U Minh.',
      ]},
      { h: 'Vai trò và thách thức' },
      { p: 'Du lịch tạo nguồn thu lớn, việc làm, thúc đẩy các ngành khác và giao lưu văn hoá. Thách thức gồm: hạ tầng chưa đồng bộ, ô nhiễm môi trường, tính mùa vụ, cạnh tranh khu vực và rủi ro dịch bệnh.' },
      { note: 'Phát triển du lịch phải gắn với bảo vệ tài nguyên và môi trường — du lịch bền vững, nếu không sẽ "ăn mòn" chính nguồn lực của mình.' },
    ],
    examples: [
      { q: 'Vì sao nước ta có tiềm năng lớn để phát triển du lịch biển?', a: 'Vì có đường bờ biển dài khoảng 3.260 km với nhiều bãi biển đẹp, vịnh, đảo (Hạ Long, Nha Trang, Phú Quốc…); khí hậu nhiệt đới thuận lợi tắm biển quanh năm ở phía Nam; gắn với nhiều di sản và đô thị ven biển; nhu cầu du lịch biển trong và ngoài nước rất lớn.' },
      { q: 'Đọc Atlat trang Du lịch, kể tên các di sản thế giới ở miền Trung nước ta.', a: 'Ở miền Trung có nhiều di sản thế giới do UNESCO công nhận: cố đô Huế và Vườn quốc gia Phong Nha – Kẻ Bàng (Bắc Trung Bộ); phố cổ Hội An và thánh địa Mỹ Sơn (Duyên hải Nam Trung Bộ – Quảng Nam). Đây là thế mạnh nổi bật để phát triển du lịch văn hoá và sinh thái.' },
    ],
  },

  'H12DIA-w23-quiz': {
    topic: 'Vùng Trung du và miền núi Bắc Bộ',
    intro: 'Bắt đầu phần Địa lí các vùng kinh tế, các em nhé. Vùng đầu tiên là Trung du và miền núi Bắc Bộ — vùng giàu tài nguyên khoáng sản, thuỷ điện và cây công nghiệp ôn đới, cận nhiệt.',
    objectives: [
      'Nêu được vị trí và đặc điểm tự nhiên của vùng.',
      'Phân tích được thế mạnh khoáng sản, thuỷ điện và cây công nghiệp.',
      'Nhận biết các sản phẩm chuyên môn hoá của vùng.',
    ],
    theory: [
      { h: 'Vị trí và tự nhiên' },
      { p: 'Là vùng cực Bắc, giáp Trung Quốc và Lào, có diện tích lớn nhất nước. Địa hình đồi núi cao và hiểm trở nhất (Hoàng Liên Sơn, các cánh cung Đông Bắc). Khí hậu có mùa đông lạnh nhất cả nước, phù hợp cây cận nhiệt và ôn đới.' },
      { h: 'Thế mạnh tự nhiên' },
      { ul: [
        'Khoáng sản phong phú nhất nước: than (Quảng Ninh), sắt, apatit, đồng, thiếc, chì – kẽm.',
        'Thuỷ điện: trữ năng lớn nhờ sông Đà, sông Lô, sông Gâm chảy trên địa hình dốc (Hoà Bình, Sơn La).',
        'Cây công nghiệp, cây ăn quả cận nhiệt: chè (lớn nhất nước), hồi, quế, mận, đào; chăn nuôi gia súc lớn trên đồng cỏ.',
      ]},
      { h: 'Khó khăn' },
      { p: 'Địa hình hiểm trở, giao thông khó khăn; mùa đông lạnh, sương muối; thiếu nước mùa khô ở một số nơi; cơ sở hạ tầng và dân cư thưa thớt; nguy cơ xói mòn, sạt lở đất.' },
      { note: 'Vùng được chia thành hai tiểu vùng: Đông Bắc (giàu khoáng sản, mùa đông đến sớm) và Tây Bắc (thuỷ điện lớn, núi cao Hoàng Liên Sơn).' },
    ],
    examples: [
      { q: 'Vì sao Trung du và miền núi Bắc Bộ có thế mạnh nổi bật về thuỷ điện?', a: 'Vì vùng có nhiều sông lớn (sông Đà, sông Lô, sông Gâm) chảy trên địa hình núi cao, dốc, tạo trữ năng thuỷ điện lớn nhất cả nước; lượng mưa khá dồi dào bổ sung nguồn nước. Nhờ đó đã xây dựng các nhà máy lớn như Hoà Bình, Sơn La trên sông Đà.' },
      { q: 'Vì sao cây chè được trồng nhiều nhất ở vùng này?', a: 'Vì vùng có khí hậu cận nhiệt với mùa đông lạnh và nhiều địa hình đồi núi có sương mù; đất feralit trên đá phiến, đá vôi phù hợp với cây chè; người dân (Thái Nguyên, Phú Thọ, Hà Giang) có kinh nghiệm và thị trường tiêu thụ, chế biến ổn định — nên chè trở thành cây chuyên môn hoá hàng đầu.' },
    ],
  },

  'H12DIA-w24-quiz': {
    topic: 'Vùng Đồng bằng sông Hồng',
    intro: 'Đồng bằng sông Hồng là cái nôi văn hoá và là vùng kinh tế trọng điểm phía Bắc. Tuần này các em tìm hiểu đặc điểm, thế mạnh và vấn đề nổi cộm nhất của vùng — sức ép dân số.',
    objectives: [
      'Nêu được đặc điểm tự nhiên và dân cư của vùng.',
      'Phân tích được thế mạnh nông nghiệp và công nghiệp.',
      'Giải thích được vấn đề sức ép dân số và hướng giải quyết.',
    ],
    theory: [
      { h: 'Tự nhiên và dân cư' },
      { p: 'Vùng được bồi tụ bởi hệ thống sông Hồng và sông Thái Bình, địa hình thấp, bằng phẳng, đất phù sa màu mỡ. Đây là vùng có mật độ dân số cao nhất cả nước, nguồn lao động dồi dào, trình độ dân trí cao, kết cấu hạ tầng tốt với thủ đô Hà Nội là trung tâm.' },
      { h: 'Thế mạnh kinh tế' },
      { ul: [
        'Nông nghiệp: trọng điểm lúa nước, rau màu vụ đông, chăn nuôi lợn và gia cầm.',
        'Công nghiệp: cơ khí, điện tử, hoá chất, dệt may, chế biến lương thực – thực phẩm.',
        'Dịch vụ: phát triển mạnh, đặc biệt ở Hà Nội và Hải Phòng.',
      ]},
      { h: 'Vấn đề nổi cộm' },
      { p: 'Mật độ dân số quá cao gây sức ép lớn về việc làm, đất đai (bình quân đất nông nghiệp thấp), nhà ở và môi trường. Hướng giải quyết: chuyển dịch cơ cấu kinh tế, đẩy mạnh công nghiệp – dịch vụ, thâm canh, phân bố lại dân cư và lao động.' },
      { note: 'Vùng giàu lao động và hạ tầng nhưng đất chật người đông — bài toán cốt lõi là tạo việc làm phi nông nghiệp và nâng năng suất.' },
    ],
    examples: [
      { q: 'Vì sao Đồng bằng sông Hồng có vụ đông là thế mạnh đặc trưng?', a: 'Vì vùng có mùa đông lạnh kéo dài (do gió mùa Đông Bắc) — điều mà các đồng bằng phía Nam không có — cho phép trồng các cây ưa lạnh như ngô, khoai tây, su hào, bắp cải, cà chua. Vụ đông trở thành vụ sản xuất chính, đa dạng hoá nông sản và tăng thu nhập.' },
      { q: 'Phân tích sức ép của dân số đông tới phát triển kinh tế – xã hội vùng.', a: 'Dân số đông, mật độ cao làm bình quân đất nông nghiệp đầu người thấp, khó mở rộng sản xuất; gây sức ép việc làm, dễ dư thừa lao động; quá tải hạ tầng, nhà ở; gia tăng ô nhiễm môi trường. Vì vậy phải đẩy mạnh chuyển dịch cơ cấu kinh tế và phân bố lại dân cư – lao động.' },
    ],
  },

  'H12DIA-w25-quiz': {
    topic: 'Vùng Bắc Trung Bộ',
    intro: 'Bắc Trung Bộ là vùng cầu nối Bắc – Nam, hẹp ngang nhưng đủ cả núi, đồng bằng và biển. Tuần này các em tìm hiểu thế mạnh phát triển kinh tế tổng hợp và những khó khăn về thiên tai của vùng.',
    objectives: [
      'Nêu được phạm vi, đặc điểm tự nhiên của vùng.',
      'Phân tích được thế mạnh phát triển kinh tế theo lát cắt Đông – Tây.',
      'Giải thích được khó khăn do thiên tai và hiện tượng gió phơn.',
    ],
    theory: [
      { h: 'Phạm vi và tự nhiên' },
      { p: 'Bắc Trung Bộ gồm các tỉnh từ Thanh Hoá đến Huế (sau sáp nhập 2025: Thanh Hoá, Nghệ An, Hà Tĩnh, Quảng Trị, Huế). Lãnh thổ hẹp ngang, kéo dài, có đầy đủ các dạng địa hình từ tây sang đông: núi – đồi – đồng bằng – biển. Đây là vùng có lát cắt tự nhiên rõ nét nhất.' },
      { h: 'Thế mạnh theo lát cắt Đông – Tây' },
      { ul: [
        'Phía tây (núi, đồi): lâm nghiệp, chăn nuôi gia súc lớn, cây công nghiệp.',
        'Đồng bằng: cây lương thực, cây công nghiệp ngắn ngày.',
        'Ven biển và biển: nuôi trồng – đánh bắt thuỷ sản, làm muối, du lịch, các khu kinh tế biển (Nghi Sơn, Vũng Áng, Hòn La).',
      ]},
      { h: 'Khó khăn' },
      { p: 'Thiên tai khắc nghiệt: gió phơn Tây Nam (gió Lào) khô nóng đầu mùa hạ; bão, lũ lụt, hạn hán; cát bay, cát lấn ven biển. Đồng bằng nhỏ hẹp, kém màu mỡ. Đây là vùng chịu nhiều thiên tai bậc nhất cả nước.' },
      { note: 'Bắc Trung Bộ giàu di sản: cố đô Huế, Phong Nha – Kẻ Bàng, Thành nhà Hồ — nền tảng cho du lịch văn hoá và sinh thái.' },
    ],
    examples: [
      { q: 'Vì sao nói Bắc Trung Bộ có điều kiện phát triển kinh tế tổng hợp?', a: 'Vì lãnh thổ tuy hẹp nhưng có đủ núi – đồi – đồng bằng – biển theo lát cắt Đông – Tây, cho phép phát triển đồng thời nhiều ngành: lâm nghiệp và chăn nuôi ở phía tây, trồng trọt ở đồng bằng, thuỷ sản – làm muối – du lịch – khu kinh tế ở ven biển. Đó là cơ sở để hình thành cơ cấu kinh tế đa dạng.' },
      { q: 'Giải thích hiện tượng gió phơn Tây Nam ở Bắc Trung Bộ.', a: 'Đầu mùa hạ, gió tây nam từ vịnh Ben-gan mang nhiều hơi ẩm gặp dãy Trường Sơn, gây mưa ở sườn tây (phía Lào). Khi vượt sang sườn đông (Bắc Trung Bộ), không khí đã mất ẩm, bị nén và nóng lên, tạo thời tiết khô nóng — gọi là gió Lào, gây hạn và nguy cơ cháy rừng.' },
    ],
  },

  'H12DIA-w26-quiz': {
    topic: 'Vùng Duyên hải Nam Trung Bộ',
    intro: 'Duyên hải Nam Trung Bộ mạnh về biển và năng lượng tái tạo. Tuần này các em tìm hiểu thế mạnh kinh tế biển, du lịch và tiềm năng điện gió – điện mặt trời của vùng.',
    objectives: [
      'Nêu được phạm vi và đặc điểm khí hậu của vùng.',
      'Phân tích được thế mạnh kinh tế biển và du lịch.',
      'Giải thích được tiềm năng năng lượng tái tạo.',
    ],
    theory: [
      { h: 'Phạm vi và khí hậu' },
      { p: 'Vùng duyên hải miền Trung kéo dài ven biển; sau sáp nhập 2025 gồm Đà Nẵng, Quảng Ngãi, Gia Lai, Khánh Hoà. Khí hậu khô hạn nhất cả nước, đặc biệt vùng Ninh Thuận – Bình Thuận cũ (nay thuộc Khánh Hoà, Lâm Đồng) có mùa khô kéo dài, số giờ nắng cao và gió ven biển mạnh.' },
      { h: 'Thế mạnh kinh tế biển' },
      { ul: [
        'Đánh bắt và nuôi trồng thuỷ sản: nhiều bãi tôm, bãi cá, ngư trường lớn.',
        'Sản xuất muối: nổi tiếng Cà Ná, Sa Huỳnh nhờ nắng nhiều, ít mưa.',
        'Du lịch biển: Mỹ Khê (Đà Nẵng), Nha Trang, Mũi Né.',
        'Cảng nước sâu và khu kinh tế: Dung Quất (lọc dầu), Cam Ranh, Vân Phong, Quy Nhơn.',
      ]},
      { h: 'Năng lượng tái tạo' },
      { p: 'Số giờ nắng cao, bức xạ lớn và gió ven biển mạnh khiến vùng trở thành "thủ phủ" điện gió, điện mặt trời, đặc biệt ở Ninh Thuận, Bình Thuận — biến chính sự khô hạn thành lợi thế.' },
      { note: 'Điểm thú vị: khí hậu khô hạn vừa là khó khăn cho nông nghiệp, vừa là lợi thế lớn cho làm muối và năng lượng tái tạo.' },
    ],
    examples: [
      { q: 'Vì sao Duyên hải Nam Trung Bộ có thế mạnh đặc biệt về điện gió và điện mặt trời?', a: 'Vì vùng có số giờ nắng cao nhất nước, bức xạ mặt trời lớn, ít mây mưa — lí tưởng cho điện mặt trời; đồng thời gió ven biển và gió mùa thổi mạnh, ổn định — thuận lợi cho điện gió. Vì thế Ninh Thuận, Bình Thuận trở thành trung tâm năng lượng tái tạo của cả nước.' },
      { q: 'Vì sao nghề làm muối phát triển mạnh ở vùng này?', a: 'Vì vùng có khí hậu khô hạn, nắng nhiều, ít mưa, độ ẩm thấp — điều kiện lí tưởng để nước biển bốc hơi nhanh, kết tinh muối; lại có bờ biển dài, nhiều bãi triều bằng phẳng. Các cánh đồng muối nổi tiếng như Cà Ná (Ninh Thuận), Sa Huỳnh (Quảng Ngãi) cho năng suất và chất lượng cao.' },
    ],
  },

  'H12DIA-w27-quiz': {
    topic: 'Phát triển kinh tế biển và bảo vệ chủ quyền (Duyên hải Nam Trung Bộ)',
    intro: 'Vùng Duyên hải Nam Trung Bộ gắn liền với hai quần đảo Hoàng Sa và Trường Sa. Tuần này các em tìm hiểu phát triển kinh tế biển đảo đi đôi với bảo vệ chủ quyền.',
    objectives: [
      'Nêu được các ngành kinh tế biển then chốt của vùng.',
      'Xác định được vị trí và đơn vị quản lí hai quần đảo Hoàng Sa, Trường Sa.',
      'Hiểu được mối quan hệ giữa phát triển kinh tế biển và bảo vệ chủ quyền.',
    ],
    theory: [
      { h: 'Lợi thế và các ngành kinh tế biển' },
      { ul: [
        'Bờ biển dài, nhiều vũng vịnh sâu kín gió để xây cảng nước sâu.',
        'Ngư trường lớn, trong đó có ngư trường Hoàng Sa – Trường Sa.',
        'Các ngành: đánh bắt – nuôi trồng thuỷ sản, du lịch biển, vận tải biển, dầu khí, năng lượng tái tạo.',
      ]},
      { h: 'Hai quần đảo' },
      { ul: [
        'Quần đảo Hoàng Sa: thuộc thành phố Đà Nẵng (huyện đảo Hoàng Sa).',
        'Quần đảo Trường Sa: thuộc tỉnh Khánh Hoà (huyện đảo Trường Sa).',
        'Đây là bộ phận lãnh thổ thiêng liêng, có vị trí chiến lược về kinh tế và quốc phòng.',
      ]},
      { h: 'Phát triển gắn với bảo vệ chủ quyền' },
      { p: 'Phát triển kinh tế biển phải đi đôi với bảo vệ chủ quyền: củng cố lực lượng chấp pháp, hỗ trợ ngư dân bám biển, giải quyết tranh chấp bằng biện pháp hoà bình trên cơ sở luật pháp quốc tế (UNCLOS 1982).' },
      { note: 'Ngư dân bám biển vừa làm kinh tế, vừa là những "cột mốc sống" khẳng định chủ quyền trên biển.' },
    ],
    examples: [
      { q: 'Vì sao phát triển kinh tế biển phải gắn liền với bảo vệ chủ quyền biển đảo?', a: 'Vì biển đảo vừa là không gian phát triển kinh tế (thuỷ sản, dầu khí, du lịch, hàng hải), vừa là phần lãnh thổ thiêng liêng có vị trí chiến lược quốc phòng. Hoạt động kinh tế trên biển (ngư dân, giàn khoan, cảng biển) khẳng định sự hiện diện và chủ quyền; ngược lại, giữ vững chủ quyền mới bảo đảm điều kiện để khai thác kinh tế bền vững.' },
      { q: 'Quần đảo Trường Sa và Hoàng Sa thuộc đơn vị hành chính nào quản lí?', a: 'Quần đảo Hoàng Sa thuộc huyện đảo Hoàng Sa, thành phố Đà Nẵng; quần đảo Trường Sa thuộc huyện đảo Trường Sa, tỉnh Khánh Hoà. Đây là hai huyện đảo khẳng định chủ quyền của Việt Nam trên Biển Đông.' },
    ],
  },

  'H12DIA-w28-quiz': {
    topic: 'Vùng Tây Nguyên',
    intro: 'Tây Nguyên là vùng cao nguyên badan rộng lớn, "thủ phủ" cây công nghiệp lâu năm. Tuần này các em tìm hiểu thế mạnh cây công nghiệp, thuỷ điện và những vấn đề đặc thù của vùng.',
    objectives: [
      'Nêu được phạm vi, đặc điểm địa hình và khí hậu của vùng.',
      'Phân tích được thế mạnh cây công nghiệp lâu năm và thuỷ điện.',
      'Giải thích được các vấn đề về môi trường và xã hội của vùng.',
    ],
    theory: [
      { h: 'Phạm vi và tự nhiên' },
      { p: 'Sau sáp nhập 2025, Tây Nguyên gồm 2 tỉnh: Đắk Lắk (gộp Phú Yên) và Lâm Đồng (gộp Đắk Nông, Bình Thuận). Phần cao nguyên là các cao nguyên xếp tầng (Kon Tum, Pleiku, Đắk Lắk, Lâm Viên, Di Linh) phủ đất badan màu mỡ; khí hậu cận xích đạo, phân hoá hai mùa mưa – khô rõ rệt. Trước đây Tây Nguyên là vùng duy nhất không giáp biển, nhưng sau khi gộp các tỉnh ven biển, cả hai tỉnh nay đều có đường bờ biển.' },
      { h: 'Thế mạnh' },
      { ul: [
        'Cây công nghiệp lâu năm: cà phê (lớn nhất nước), cao su, hồ tiêu, chè, ca cao.',
        'Lâm nghiệp: còn nhiều diện tích rừng, đa dạng sinh học cao.',
        'Thuỷ điện: trên sông Sê San, Sêrêpôk; cùng tiềm năng điện gió, điện mặt trời.',
        'Du lịch: khí hậu mát (Đà Lạt), văn hoá cồng chiêng.',
      ]},
      { h: 'Vấn đề đặc thù' },
      { p: 'Suy thoái và mất rừng; xói mòn đất; thiếu nước nghiêm trọng vào mùa khô; là địa bàn cư trú của nhiều dân tộc thiểu số, cần chính sách phát triển kinh tế – xã hội phù hợp và ổn định an ninh.' },
      { note: 'Tây Nguyên có vị trí chiến lược đặc biệt về quốc phòng và an ninh — phát triển kinh tế phải gắn với ổn định xã hội và bảo vệ rừng.' },
    ],
    examples: [
      { q: 'Vì sao Tây Nguyên trở thành vùng chuyên canh cây công nghiệp lâu năm lớn của cả nước?', a: 'Vì có diện tích đất badan rộng và màu mỡ, tầng phong hoá dày, địa hình cao nguyên bằng phẳng dễ canh tác quy mô lớn; khí hậu cận xích đạo với mùa khô rõ giúp phơi sấy, thu hoạch; có nguồn lao động và thị trường xuất khẩu. Nhờ vậy hình thành các vùng chuyên canh cà phê, cao su, hồ tiêu lớn.' },
      { q: 'Vì sao việc bảo vệ rừng có ý nghĩa đặc biệt quan trọng ở Tây Nguyên?', a: 'Vì rừng Tây Nguyên là rừng đầu nguồn của nhiều sông lớn chảy về Duyên hải Nam Trung Bộ và Đông Nam Bộ; giữ vai trò điều tiết nguồn nước (vùng đã rất thiếu nước mùa khô), chống xói mòn đất badan, bảo tồn đa dạng sinh học. Mất rừng sẽ làm trầm trọng hạn hán, lũ và suy thoái đất.' },
    ],
  },

  'H12DIA-w29-quiz': {
    topic: 'Vùng Đông Nam Bộ',
    intro: 'Đông Nam Bộ là vùng kinh tế phát triển năng động nhất cả nước, đầu tàu của vùng kinh tế trọng điểm phía Nam. Tuần này các em tìm hiểu vì sao vùng dẫn đầu về công nghiệp, dịch vụ và thu hút đầu tư.',
    objectives: [
      'Nêu được vị thế kinh tế của vùng Đông Nam Bộ.',
      'Phân tích được thế mạnh công nghiệp, dầu khí và cây công nghiệp.',
      'Giải thích được vai trò đầu tàu của vùng kinh tế trọng điểm phía Nam.',
    ],
    theory: [
      { h: 'Vị thế kinh tế' },
      { p: 'Đông Nam Bộ có nền kinh tế phát triển năng động nhất, dẫn đầu cả nước về GDP, giá trị sản xuất công nghiệp, xuất khẩu và thu hút FDI, với TP. Hồ Chí Minh là trung tâm kinh tế lớn nhất nước.' },
      { h: 'Thế mạnh kinh tế' },
      { ul: [
        'Công nghiệp: chế biến – chế tạo, dầu khí, điện tử, dệt may, hoá chất, sản xuất ô tô – xe máy.',
        'Dầu khí: khai thác ở thềm lục địa phía Nam (bể Cửu Long, Nam Côn Sơn).',
        'Cây công nghiệp: cao su (lớn nhất nước), cà phê, hồ tiêu, điều, cây ăn quả.',
        'Dịch vụ: tài chính, thương mại, logistics phát triển mạnh.',
      ]},
      { h: 'Vùng kinh tế trọng điểm phía Nam' },
      { p: 'Là đầu tàu kinh tế cả nước, đóng góp lớn nhất vào GDP, ngân sách và kim ngạch xuất khẩu; có sức hút mạnh với vốn đầu tư trong và ngoài nước; dẫn dắt và lan toả phát triển cho các vùng lân cận.' },
      { note: 'Đông Nam Bộ tuy ít tài nguyên nông nghiệp bằng các đồng bằng, nhưng vượt trội nhờ vị trí, hạ tầng, lao động kĩ thuật và chính sách thu hút đầu tư.' },
    ],
    examples: [
      { q: 'Vì sao Đông Nam Bộ thu hút vốn đầu tư nước ngoài mạnh nhất cả nước?', a: 'Vì vùng có vị trí thuận lợi (gần đường hàng hải quốc tế, cảng biển, sân bay lớn); cơ sở hạ tầng đồng bộ và hiện đại nhất; nguồn lao động kĩ thuật dồi dào; thị trường rộng; nhiều khu công nghiệp – khu chế xuất; cùng môi trường đầu tư và chính sách ưu đãi tốt. Những yếu tố đó tạo sức hấp dẫn lớn với nhà đầu tư.' },
      { q: 'Vì sao vấn đề thuỷ lợi có ý nghĩa quan trọng với nông nghiệp Đông Nam Bộ?', a: 'Vì vùng có mùa khô kéo dài và sâu sắc, trong khi cây công nghiệp lâu năm (cao su, cà phê, hồ tiêu) cần nhiều nước. Các công trình thuỷ lợi như hồ Dầu Tiếng giúp cung cấp nước tưới mùa khô, mở rộng diện tích canh tác, tăng năng suất và ổn định sản xuất nông nghiệp.' },
    ],
  },

  'H12DIA-w30-quiz': {
    topic: 'Vùng Đồng bằng sông Cửu Long',
    intro: 'Đồng bằng sông Cửu Long là vựa lúa, vựa trái cây và trung tâm thuỷ sản lớn nhất nước. Tuần này các em tìm hiểu thế mạnh nông nghiệp và vai trò an ninh lương thực của vùng.',
    objectives: [
      'Nêu được đặc điểm tự nhiên của vùng.',
      'Phân tích được thế mạnh sản xuất lương thực, trái cây và thuỷ sản.',
      'Hiểu được vai trò bảo đảm an ninh lương thực quốc gia.',
    ],
    theory: [
      { h: 'Đặc điểm tự nhiên' },
      { p: 'Vùng được bồi tụ bởi sông Cửu Long (đoạn cuối sông Mê Kông), địa hình thấp và bằng phẳng, nhiều kênh rạch, vùng ngập nước. Đất phù sa ngọt ven sông màu mỡ; ngoài ra có đất phèn, đất mặn cần cải tạo. Khí hậu cận xích đạo ổn định.' },
      { h: 'Thế mạnh nông nghiệp' },
      { ul: [
        'Vựa lúa lớn nhất: sản lượng hơn một nửa cả nước, dẫn đầu về xuất khẩu gạo.',
        'Vựa trái cây nhiệt đới: xoài, sầu riêng, chôm chôm, bưởi, dừa, thanh long.',
        'Trung tâm thuỷ sản hàng đầu: nuôi tôm, cá tra; đánh bắt và nuôi trồng đều mạnh.',
      ]},
      { h: 'Vai trò và trung tâm' },
      { p: 'Vùng giữ vai trò bảo đảm an ninh lương thực quốc gia và xuất khẩu nông – thuỷ sản. Cần Thơ là thành phố trực thuộc trung ương, trung tâm kinh tế – văn hoá của vùng.' },
      { note: 'Đồng bằng sông Cửu Long là vùng nông nghiệp số một, nhưng đang đứng trước thách thức lớn từ biến đổi khí hậu — nội dung tuần sau.' },
    ],
    examples: [
      { q: 'Vì sao Đồng bằng sông Cửu Long là vùng trọng điểm số một về sản xuất lương thực?', a: 'Vì có diện tích đất phù sa rộng lớn, bằng phẳng, màu mỡ; nguồn nước dồi dào từ sông Mê Kông và hệ thống kênh rạch; khí hậu cận xích đạo nóng ẩm quanh năm cho phép canh tác nhiều vụ; người dân giàu kinh nghiệm; lại có công nghiệp chế biến và thị trường xuất khẩu rộng.' },
      { q: 'Để sử dụng hợp lí đất phèn, đất mặn ở vùng cần làm gì?', a: 'Cần thau chua, rửa mặn bằng hệ thống thuỷ lợi (đưa nước ngọt vào, tiêu nước phèn ra); lựa chọn cây trồng – vật nuôi thích hợp (lúa chịu phèn, nuôi tôm ở vùng mặn); áp dụng mô hình luân canh lúa – tôm, lúa – cá; trồng và bảo vệ rừng ngập mặn để hạn chế xâm nhập mặn.' },
    ],
  },

  'H12DIA-w31-quiz': {
    topic: 'Thách thức và phát triển bền vững Đồng bằng sông Cửu Long',
    intro: 'Vùng nông nghiệp số một đang đối mặt biến đổi khí hậu nghiêm trọng. Tuần này các em tìm hiểu các thách thức và giải pháp phát triển bền vững thích ứng với biến đổi khí hậu.',
    objectives: [
      'Phân tích được các thách thức: nước biển dâng, xâm nhập mặn, sạt lở.',
      'Giải thích được nguyên nhân của các thách thức đó.',
      'Trình bày được định hướng và giải pháp phát triển bền vững.',
    ],
    theory: [
      { h: 'Các thách thức' },
      { ul: [
        'Biến đổi khí hậu, nước biển dâng làm ngập và thu hẹp diện tích đất.',
        'Xâm nhập mặn ngày càng sâu, ảnh hưởng sản xuất và sinh hoạt.',
        'Sạt lở bờ sông, bờ biển gia tăng; sụt lún đất.',
      ]},
      { h: 'Nguyên nhân' },
      { p: 'Nước biển dâng do biến đổi khí hậu; lưu lượng và lượng phù sa sông Mê Kông giảm do các đập thuỷ điện thượng nguồn giữ lại; khai thác cát và nước ngầm quá mức gây sạt lở, sụt lún. Các nguyên nhân tự nhiên và nhân tạo cộng hưởng nhau.' },
      { h: 'Giải pháp phát triển bền vững' },
      { ul: [
        'Chuyển đổi mô hình canh tác thuận thiên: lúa – tôm, lúa – cá, cây chịu mặn.',
        'Xây dựng hệ thống cấp – trữ nước ngọt, công trình kiểm soát mặn.',
        'Trồng và bảo vệ rừng ngập mặn chống sạt lở.',
        'Thực hiện Nghị quyết 120/NQ-CP (2017) và hợp tác quốc tế quản lí nguồn nước Mê Kông.',
      ]},
      { note: 'Tinh thần Nghị quyết 120 là "thuận thiên" — chủ động thích ứng, sống chung với lũ và mặn thay vì chống lại tự nhiên một cách cứng nhắc.' },
    ],
    examples: [
      { q: 'Vì sao xâm nhập mặn ngày càng nghiêm trọng ở Đồng bằng sông Cửu Long?', a: 'Do nước biển dâng vì biến đổi khí hậu đẩy mặn vào sâu; đồng thời lưu lượng nước ngọt sông Mê Kông mùa khô giảm vì các đập thuỷ điện ở thượng nguồn giữ nước, khiến nước sông không đủ sức đẩy mặn ra. Việc khai thác nước ngầm quá mức gây sụt lún cũng làm tình hình trầm trọng hơn.' },
      { q: 'Mô hình canh tác "thuận thiên" có ý nghĩa gì với vùng?', a: 'Thay vì cố ngăn mặn để giữ lúa bằng mọi giá, mô hình thuận thiên chủ động thích ứng: vùng nhiễm mặn chuyển sang nuôi tôm hoặc luân canh lúa – tôm; vùng lũ tận dụng phù sa và thuỷ sản mùa nước nổi. Cách làm này giảm rủi ro, tận dụng điều kiện tự nhiên và phát triển bền vững hơn.' },
    ],
  },

  'H12DIA-w32-quiz': {
    topic: 'Các vùng kinh tế trọng điểm',
    intro: 'Tuần này các em tổng hợp về các vùng kinh tế trọng điểm — những lãnh thổ động lực dẫn dắt tăng trưởng và lan toả phát triển cho cả nước.',
    objectives: [
      'Hiểu được khái niệm và đặc điểm của vùng kinh tế trọng điểm.',
      'Xác định được phạm vi và thế mạnh của các vùng kinh tế trọng điểm.',
      'Phân tích được vai trò động lực của các vùng này.',
    ],
    theory: [
      { h: 'Khái niệm' },
      { p: 'Vùng kinh tế trọng điểm là vùng hội tụ đầy đủ các thế mạnh, tập trung tiềm lực kinh tế và có sức hấp dẫn lớn với nhà đầu tư; có tỉ trọng cao trong GDP, tạo tốc độ phát triển nhanh và hỗ trợ các vùng khác.' },
      { h: 'Các vùng động lực kinh tế (sau sáp nhập 1/7/2025)' },
      { note: 'Sau khi sắp xếp đơn vị hành chính, danh sách tỉnh, thành thuộc các vùng động lực được cập nhật theo 34 tỉnh, thành mới:' },
      { ul: [
        'Bắc Bộ: Hà Nội, Hải Phòng (đã gồm Hải Dương), Quảng Ninh, Bắc Ninh, Hưng Yên.',
        'Miền Trung: Huế, Đà Nẵng (đã gồm Quảng Nam), Quảng Ngãi, Gia Lai (đã gồm Bình Định).',
        'Phía Nam: TP. Hồ Chí Minh (đã gồm Bình Dương, Bà Rịa – Vũng Tàu), Đồng Nai (đã gồm Bình Phước), Tây Ninh (đã gồm Long An).',
        'Đồng bằng sông Cửu Long: Cần Thơ, An Giang (đã gồm Kiên Giang), Cà Mau, Vĩnh Long, Đồng Tháp.',
      ]},
      { h: 'Vai trò' },
      { p: 'Các vùng kinh tế trọng điểm là đầu tàu, dẫn dắt và lan toả phát triển cho các vùng khác; trong đó vùng phía Nam dẫn đầu cả nước về tổng GDP, xuất khẩu và thu hút FDI.' },
      { note: 'Nhớ con số "4 vùng" và "đầu tàu phía Nam". Đề thi hay hỏi vùng nào đóng góp lớn nhất — đáp án là vùng kinh tế trọng điểm phía Nam.' },
    ],
    examples: [
      { q: 'Vì sao cần hình thành các vùng kinh tế trọng điểm?', a: 'Vì nguồn lực có hạn, không thể đầu tư dàn trải. Tập trung phát triển những vùng hội tụ nhiều thế mạnh sẽ tạo tốc độ tăng trưởng nhanh, hiệu quả cao, thu hút đầu tư, rồi từ đó lan toả, lôi kéo và hỗ trợ các vùng lân cận cùng phát triển — tạo đầu tàu cho nền kinh tế cả nước.' },
      { q: 'So sánh vai trò của vùng kinh tế trọng điểm phía Nam và phía Bắc.', a: 'Cả hai đều là đầu tàu kinh tế. Vùng phía Nam (gắn với Đông Nam Bộ) dẫn đầu cả nước về quy mô GDP, công nghiệp, xuất khẩu và FDI, năng động nhất. Vùng phía Bắc (gắn với Đồng bằng sông Hồng) mạnh về công nghiệp, dịch vụ, có thủ đô Hà Nội, vai trò quan trọng nhưng quy mô đóng góp xếp sau phía Nam.' },
    ],
  },

  'H12DIA-w33-quiz': {
    topic: 'Phát triển tổng hợp kinh tế biển',
    intro: 'Việt Nam là quốc gia biển. Tuần này các em tìm hiểu tiềm năng và chiến lược phát triển tổng hợp kinh tế biển — gắn làm giàu từ biển với bảo vệ chủ quyền.',
    objectives: [
      'Nêu được các tiềm năng phát triển kinh tế biển.',
      'Trình bày được nội dung phát triển tổng hợp kinh tế biển.',
      'Hiểu được yêu cầu phát triển bền vững và bảo vệ chủ quyền.',
    ],
    theory: [
      { h: 'Tiềm năng biển' },
      { p: 'Biển Việt Nam là một phần của Biển Đông, rộng khoảng 1 triệu km², với hàng nghìn đảo và hai quần đảo lớn Hoàng Sa, Trường Sa. Tiềm năng đa dạng: hải sản, dầu khí, du lịch, giao thông – cảng biển và năng lượng tái tạo (điện gió ngoài khơi).' },
      { h: 'Phát triển tổng hợp' },
      { ul: [
        'Khai thác – nuôi trồng và chế biến hải sản gắn với bảo vệ nguồn lợi.',
        'Khai thác dầu khí ở thềm lục địa.',
        'Phát triển du lịch biển – đảo và giao thông – cảng biển.',
        'Phát triển năng lượng tái tạo, đặc biệt điện gió ngoài khơi.',
      ]},
      { h: 'Định hướng và yêu cầu' },
      { p: 'Chiến lược biển hướng tới đưa nước ta thành quốc gia mạnh về biển, làm giàu từ biển trên nền tảng bền vững. Phát triển kinh tế biển phải gắn với bảo vệ môi trường biển, bảo vệ chủ quyền và an ninh biển đảo. Các khu kinh tế ven biển là đầu mối kết nối kinh tế biển với đất liền.' },
      { note: '"Phát triển tổng hợp" nghĩa là khai thác đồng thời nhiều ngành để bổ trợ nhau và sử dụng hiệu quả tài nguyên biển, tránh khai thác đơn lẻ, lãng phí.' },
    ],
    examples: [
      { q: 'Vì sao phải phát triển tổng hợp kinh tế biển thay vì khai thác đơn lẻ?', a: 'Vì các ngành kinh tế biển có quan hệ chặt chẽ: cảng biển phục vụ cả thuỷ sản, dầu khí, du lịch; du lịch gắn với bảo vệ môi trường biển; khai thác hải sản phải đi đôi với bảo vệ nguồn lợi. Phát triển tổng hợp giúp khai thác hiệu quả, bổ trợ lẫn nhau, tăng giá trị và bảo đảm bền vững tài nguyên biển.' },
      { q: 'Năng lượng tái tạo ngoài khơi có triển vọng gì với nước ta?', a: 'Với vùng biển rộng, gió biển mạnh và ổn định, nước ta có tiềm năng lớn về điện gió ngoài khơi. Đây là hướng phát triển xanh, bổ sung nguồn điện sạch, giảm phụ thuộc nhiên liệu hoá thạch, đồng thời khẳng định sự hiện diện và khai thác kinh tế trên vùng biển chủ quyền.' },
    ],
  },

  'H12DIA-w34-quiz': {
    topic: 'Bảo vệ chủ quyền biển đảo và hợp tác quốc tế',
    intro: 'Tuần này các em tìm hiểu cơ sở khẳng định chủ quyền biển đảo, nguyên tắc giải quyết tranh chấp và vai trò công dân trong bảo vệ chủ quyền của Tổ quốc.',
    objectives: [
      'Nêu được cơ sở lịch sử và pháp lí khẳng định chủ quyền biển đảo.',
      'Hiểu được nguyên tắc giải quyết tranh chấp và hợp tác quốc tế.',
      'Xác định được trách nhiệm của công dân.',
    ],
    theory: [
      { h: 'Cơ sở khẳng định chủ quyền' },
      { p: 'Việt Nam có đầy đủ bằng chứng lịch sử lâu đời (bản đồ, tư liệu thời các chúa Nguyễn, triều Nguyễn và trước đó) cùng cơ sở pháp lí quốc tế để khẳng định chủ quyền đối với hai quần đảo Hoàng Sa và Trường Sa.' },
      { h: 'Khung pháp lí và nguyên tắc' },
      { ul: [
        'UNCLOS 1982: Công ước Liên hợp quốc về Luật biển, khung pháp lí quốc tế cơ bản về biển.',
        'Giải quyết tranh chấp bằng biện pháp hoà bình, đối thoại, trên cơ sở luật pháp quốc tế.',
        'ASEAN và Trung Quốc đang đàm phán Bộ Quy tắc ứng xử ở Biển Đông (COC).',
      ]},
      { h: 'Hợp tác quốc tế và trách nhiệm công dân' },
      { ul: [
        'Hợp tác về nghiên cứu khoa học biển, ứng phó biến đổi khí hậu, bảo vệ tài nguyên, an ninh hàng hải.',
        'Công dân: hiểu biết và lan toả thông tin đúng, ủng hộ ngư dân bám biển, tham gia phát triển kinh tế biển.',
      ]},
      { note: 'Hai trụ cột bảo vệ chủ quyền: bằng chứng lịch sử và cơ sở pháp lí (UNCLOS 1982); phương châm là giải quyết hoà bình.' },
    ],
    examples: [
      { q: 'Vì sao nước ta chủ trương giải quyết tranh chấp ở Biển Đông bằng biện pháp hoà bình?', a: 'Vì đây là chủ trương phù hợp luật pháp quốc tế (đặc biệt UNCLOS 1982), giữ vững môi trường hoà bình, ổn định để phát triển đất nước; tranh thủ sự ủng hộ của cộng đồng quốc tế; bảo vệ vững chắc chủ quyền mà vẫn duy trì quan hệ hợp tác. Đối đầu vũ lực gây thiệt hại và đi ngược lợi ích lâu dài.' },
      { q: 'Là học sinh, em có thể làm gì để góp phần bảo vệ chủ quyền biển đảo?', a: 'Học tập tốt để hiểu đúng về biển đảo và chủ quyền; tìm hiểu và lan toả thông tin chính xác, phản bác thông tin sai lệch; ủng hộ ngư dân và các hoạt động hướng về biển đảo; có ý thức bảo vệ môi trường biển; xây dựng lòng yêu nước và tinh thần trách nhiệm với Tổ quốc.' },
    ],
  },

  'H12DIA-w35-quiz': {
    topic: 'Tổng ôn — chuẩn bị thi tốt nghiệp THPT',
    intro: 'Tuần cuối cùng. Các em hệ thống lại toàn bộ chương trình và rèn kĩ năng làm bài, đặc biệt là khai thác Atlat Địa lí Việt Nam — "trợ thủ" được phép mang vào phòng thi.',
    objectives: [
      'Nắm được cấu trúc đề và quy tắc làm bài thi tốt nghiệp.',
      'Thành thạo kĩ năng khai thác Atlat và nhận xét biểu đồ.',
      'Hệ thống hoá kiến thức trọng tâm cả năm.',
    ],
    theory: [
      { h: 'Cấu trúc đề và sử dụng Atlat' },
      { ul: [
        'Đề thi gồm 40 câu trắc nghiệm, thời gian 50 phút.',
        'Được phép sử dụng Atlat Địa lí Việt Nam (NXB Giáo dục) khi làm bài.',
        'Có nhóm câu kĩ năng: đọc Atlat, nhận xét bảng số liệu và biểu đồ.',
      ]},
      { h: 'Kĩ năng đọc Atlat' },
      { p: 'Xác định đúng trang cần dùng; đọc kĩ chú giải; nhận diện kí hiệu, màu sắc, đường nét; đối chiếu với yêu cầu câu hỏi. Nhiều câu chỉ cần tra Atlat là có ngay đáp án, không phải học thuộc.' },
      { h: 'Hệ thống kiến thức trọng tâm' },
      { ul: [
        'Tự nhiên: vị trí, nhiệt đới ẩm gió mùa, ba chiều phân hoá.',
        'Dân cư: đông dân, già hoá, phân bố không đều, đô thị hoá.',
        'Kinh tế ngành: chuyển dịch cơ cấu, cây – vùng, công nghiệp trọng điểm, dịch vụ.',
        'Bảy vùng kinh tế và biển đảo: nắm thế mạnh đặc trưng từng vùng.',
      ]},
      { note: 'Chiến thuật làm bài: làm câu dễ và câu Atlat trước; câu khó đánh dấu quay lại; quản lí thời gian (trung bình hơn 1 phút/câu); không bỏ trống câu nào.' },
    ],
    examples: [
      { q: 'Khi gặp câu hỏi "Căn cứ vào Atlat Địa lí Việt Nam, cho biết tỉnh nào sau đây giáp biển?", em làm thế nào?', a: 'Mở trang Hành chính của Atlat; quan sát đường bờ biển và vị trí các tỉnh trong đáp án; tỉnh nào có ranh giới tiếp giáp với biển thì chọn. Đây là dạng câu chỉ cần tra Atlat, không cần học thuộc, nên phải làm nhanh để dành thời gian cho câu khó.' },
      { q: 'Nêu cách phân biệt nhanh các vùng kinh tế qua sản phẩm chuyên môn hoá đặc trưng.', a: 'Gắn mỗi vùng với sản phẩm "đặc sản": Trung du và miền núi Bắc Bộ – chè, khoáng sản, thuỷ điện; Tây Nguyên – cà phê; Đông Nam Bộ – cao su, công nghiệp – dầu khí; Đồng bằng sông Cửu Long – lúa, thuỷ sản, trái cây; Duyên hải Nam Trung Bộ – muối, điện gió – mặt trời, du lịch biển. Nhận diện từ khoá sản phẩm là biết ngay vùng.' },
    ],
  },

  'H12DIA-w36-quiz': {
    topic: 'Kết thúc Địa Lý THPT — Đất nước và thế giới trong tầm tay',
    intro: 'Tuần cuối năm học Địa Lý — hãy nhìn lại chặng đường đã đi: từ tự nhiên Việt Nam đến địa lý kinh tế các vùng, từ biển đảo đến hội nhập quốc tế. Địa Lý không chỉ là bản đồ — đó là câu chuyện về con người và mảnh đất họ sinh sống.',
    objectives: [
      'Hệ thống hoá chương trình Địa Lý 3 năm THPT theo các chủ đề lớn.',
      'Nhận ra tầm quan trọng của tư duy địa lý trong hiểu biết thế giới và nghề nghiệp.',
      'Kết nối kiến thức địa lý với các vấn đề toàn cầu đương đại: biến đổi khí hậu, toàn cầu hoá, đô thị hoá.',
    ],
    theory: [
      { h: 'Bản đồ Địa Lý 3 năm THPT' },
      { ul: [
        'Lớp 10: Địa lý đại cương (vũ trụ, khí hậu, đất, sinh vật), dân số và đô thị hoá, các nền kinh tế thế giới, địa lý ngành toàn cầu.',
        'Lớp 11: Địa lý khu vực — Đông Nam Á (ASEAN), Đông Á (Nhật Bản, Trung Quốc), Bắc Mỹ, Châu Phi, Australia.',
        'Lớp 12: Địa lý Việt Nam — vị trí địa lý chiến lược, tự nhiên (địa hình, khí hậu), dân cư, chuyển dịch kinh tế, địa lý các vùng kinh tế (7 vùng), biển đảo và chủ quyền quốc gia, hội nhập ASEAN và thế giới.',
      ] },
      { h: 'Địa Lý Việt Nam — những điều đặc biệt' },
      { ul: [
        'Vị trí chiến lược: giao điểm của Đông Nam Á lục địa và hải đảo, đường hàng hải quốc tế, tiếp giáp Biển Đông.',
        'Địa hình phong phú: đồng bằng sông Hồng và sông Cửu Long nuôi sống hàng triệu người; cao nguyên Tây Nguyên — "mái nhà" xuất khẩu cà phê, cao su; rừng nhiệt đới Tây Bắc — đa dạng sinh học cao.',
        'Khí hậu đa dạng: miền Bắc có 4 mùa rõ, miền Nam mùa mưa–khô; điều đó tạo ra nông nghiệp đa dạng nhất Đông Nam Á.',
        'Biển đảo: 3260 km bờ biển, 2 quần đảo lớn (Hoàng Sa, Trường Sa) — tài nguyên biển và chủ quyền quốc gia gắn liền nhau.',
      ] },
      { h: 'Tư duy Địa Lý trong thế kỉ 21' },
      { ul: [
        'Biến đổi khí hậu: Địa Lý cho em hiểu tại sao đồng bằng sông Cửu Long đang bị ngập mặn và cần làm gì.',
        'Toàn cầu hoá: Chuỗi cung ứng toàn cầu, FDI, EVFTA — Địa Lý kinh tế là nền tảng hiểu kinh tế quốc tế.',
        'Đô thị hoá: Hà Nội và TP.HCM phình to — Địa Lý đô thị và quy hoạch lãnh thổ là ngành nghề nhiều tiềm năng.',
        'GIS và dữ liệu không gian: Công nghệ bản đồ số (Google Maps, GPS, viễn thám) là ngành nghề tăng trưởng nhanh.',
      ] },
      { h: 'Lời khuyên cho bài thi tốt nghiệp THPT môn Địa Lý' },
      { ul: [
        'Atlat: Đây là "sách mở" — học cách tra cứu nhanh trang nào có số liệu gì; không cần thuộc số liệu nếu dùng Atlat tốt.',
        'Nhận xét bảng số liệu: Luôn so sánh (cao nhất – thấp nhất – trung bình – xu hướng), không chỉ liệt kê số.',
        'Vẽ biểu đồ: Nhận diện loại (cột, đường, tròn, miền) trước; vẽ đúng tỷ lệ; có tên biểu đồ và chú giải.',
        'Câu nghị luận: Nêu vấn đề → Phân tích nguyên nhân → Hậu quả → Giải pháp — cấu trúc này luôn đúng.',
      ] },
      { note: 'Địa Lý là môn học nhìn thế giới bằng mắt của người lập bản đồ — không phải để vẽ đường biên giới, mà để hiểu tại sao con người sống, làm việc và xung đột theo cách họ đang làm. Đó là kiến thức cho công dân toàn cầu.' },
    ],
    examples: [
      { q: 'Tại sao đồng bằng sông Cửu Long là "vựa lúa" của Việt Nam nhưng lại đang đối mặt với nguy cơ ngập chìm vì biến đổi khí hậu?', a: 'ĐBSCL là vựa lúa vì: đất phù sa màu mỡ từ sông Mekong, địa hình bằng phẳng dễ tưới tiêu, khí hậu nóng ẩm quanh năm. Nguy cơ ngập: Mực nước biển dâng (2–4 mm/năm) + sụt lún đất (khai thác nước ngầm quá mức, +1–3 cm/năm) + giảm phù sa (các đập thuỷ điện trên thượng nguồn Mekong) → xâm nhập mặn tăng → đất nông nghiệp thu hẹp. Đây là thách thức địa lý–môi trường nghiêm trọng nhất Việt Nam trong thế kỉ 21.' },
      { q: 'Vì sao vị trí địa lý của Việt Nam vừa là lợi thế vừa là thách thức trong hội nhập quốc tế?', a: 'Lợi thế: nằm trên tuyến hàng hải quốc tế Đông–Tây quan trọng; tiếp giáp Trung Quốc (thị trường lớn nhất TG), cạnh ASEAN (10 quốc gia); bờ biển dài (3260 km) với nhiều cảng nước sâu tiềm năng. Thách thức: Biển Đông có tranh chấp chủ quyền phức tạp; tiếp giáp cường quốc lớn luôn đặt ra bài toán cân bằng địa chính trị; thiên tai (bão, lũ, hạn hán) phức tạp hơn do địa hình dài hẹp. Việt Nam dùng "ngoại giao đa phương" và "đối tác chiến lược" để quản lý bối cảnh địa lý phức tạp này.' },
      { q: 'Nghề nghiệp nào liên quan đến Địa Lý mà em chưa biết trước khi học THPT?', a: 'Các nghề nghiệp địa lý ít người biết: Kỹ sư GIS (Geographic Information Systems) — xây dựng bản đồ số cho điện lực, giao thông, quy hoạch đô thị; Chuyên gia viễn thám — phân tích ảnh vệ tinh cho nông nghiệp, rừng, biển; Nhà quy hoạch đô thị — thiết kế tăng trưởng bền vững của thành phố; Chuyên gia biến đổi khí hậu — đánh giá rủi ro lũ lụt, hạn hán cho chính phủ và tổ chức quốc tế; Nhà phân tích địa chính trị — tư vấn chính sách đối ngoại. Tất cả đang ngày càng được tuyển dụng cao.' },
    ],
  },
};
