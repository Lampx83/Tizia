// ============================================================
// Lớp 10 · GDCD (Giáo dục Kinh tế và Pháp luật) — Lý thuyết 35 tuần (CTGD 2018 — THPT).
// Key trùng id quiz: "H10GDCD-wNN-quiz".
// Bám CT GD Kinh tế và Pháp luật 10: Phần Kinh tế (hoạt động kinh tế, chủ thể,
// thị trường, cơ chế thị trường, ngân sách - thuế, tín dụng, sản xuất kinh doanh)
// và Phần Pháp luật (hệ thống chính trị VN, bộ máy Nhà nước, Hiến pháp 2013,
// quyền - nghĩa vụ công dân). Văn phong thầy/cô THPT, gọi học sinh là "các em".
// ============================================================

export const H10GDCD_LESSONS = {
  // ──────────────── HỌC KỲ 1 ────────────────
  'H10GDCD-w01-quiz': {
    topic: 'Hoạt động kinh tế trong đời sống',
    intro: 'Chào các em đến với môn Giáo dục Kinh tế và Pháp luật 10. Mỗi ngày các em đều tham gia vào nền kinh tế: ăn cơm, mua sách, đi học bằng xe buýt. Bài đầu tiên giúp các em hiểu hoạt động kinh tế là gì và gồm những khâu nào.',
    objectives: [
      'Nêu được khái niệm và các khâu của hoạt động kinh tế.',
      'Phân biệt sản xuất, phân phối, trao đổi, tiêu dùng.',
      'Nhận ra vai trò của hoạt động kinh tế trong đời sống xã hội.',
    ],
    theory: [
      { h: 'Hoạt động kinh tế là gì?' },
      { p: 'Hoạt động kinh tế là toàn bộ những hoạt động của con người nhằm tạo ra của cải vật chất và dịch vụ để đáp ứng nhu cầu cuộc sống. Đây là hoạt động cơ bản, quyết định sự tồn tại và phát triển của cá nhân cũng như xã hội.' },
      { h: 'Bốn khâu của hoạt động kinh tế' },
      { ul: [
        'Sản xuất: tạo ra hàng hoá và dịch vụ. Đây là khâu gốc, quyết định các khâu sau.',
        'Phân phối: chia kết quả sản xuất cho các chủ thể (tiền lương, lợi nhuận, thuế...).',
        'Trao đổi: mua bán hàng hoá - dịch vụ trên thị trường, nối sản xuất với tiêu dùng.',
        'Tiêu dùng: sử dụng sản phẩm để thoả mãn nhu cầu — khâu cuối cùng của chu trình.',
      ] },
      { h: 'Ba yếu tố cơ bản của sản xuất' },
      { p: 'Muốn sản xuất, con người phải kết hợp ba yếu tố: sức lao động (thể lực, trí lực của người lao động), tư liệu sản xuất (máy móc, công cụ, nhà xưởng) và đối tượng lao động (nguyên, nhiên, vật liệu).' },
      { h: 'Hàng hoá khác sản phẩm thông thường ở đâu?' },
      { p: 'Một sản phẩm chỉ trở thành hàng hoá khi nó được làm ra để bán, trao đổi trên thị trường, chứ không phải để người sản xuất tự dùng. Mớ rau mẹ trồng ăn trong nhà là sản phẩm; mớ rau đem ra chợ bán mới là hàng hoá.' },
      { note: 'Bốn khâu sản xuất - phân phối - trao đổi - tiêu dùng gắn bó như một vòng tuần hoàn: thiếu khâu nào nền kinh tế cũng không vận hành trơn tru.' },
    ],
    examples: [
      { q: 'Một xưởng may làm áo, công nhân nhận lương, áo bán ra cửa hàng, người dân mua mặc. Hãy chỉ ra bốn khâu kinh tế.', a: 'Xưởng may áo là sản xuất; trả lương công nhân, nộp thuế là phân phối; bán áo ra cửa hàng là trao đổi; người dân mua mặc là tiêu dùng. Bốn khâu nối tiếp tạo thành một chu trình kinh tế hoàn chỉnh.' },
      { q: 'Bạn An nuôi gà chỉ để gia đình ăn. Đàn gà đó có phải hàng hoá không?', a: 'Không. Vì nuôi để tự tiêu dùng, không đem bán hay trao đổi, nên đàn gà là sản phẩm chứ chưa phải hàng hoá. Nếu An đem bán bớt ra chợ thì số gà bán đó mới là hàng hoá.' },
    ],
  },

  'H10GDCD-w02-quiz': {
    topic: 'Các chủ thể của nền kinh tế',
    intro: 'Nền kinh tế giống một sân khấu lớn, ở đó có nhiều "diễn viên" cùng tham gia. Các em hãy cùng tìm hiểu ai là những chủ thể chính và mỗi người giữ vai trò gì.',
    objectives: [
      'Kể tên các chủ thể chính của nền kinh tế Việt Nam.',
      'Nêu vai trò của Nhà nước, doanh nghiệp, hộ gia đình.',
      'Hiểu các chủ thể tương tác với nhau qua thị trường.',
    ],
    theory: [
      { h: 'Các chủ thể chính' },
      { ul: [
        'Nhà nước: vừa quản lý, điều tiết nền kinh tế bằng pháp luật và chính sách, vừa là chủ thể kinh tế (sở hữu doanh nghiệp nhà nước, cung cấp dịch vụ công).',
        'Doanh nghiệp (chủ thể sản xuất): tổ chức sản xuất hàng hoá, dịch vụ, tạo việc làm và nộp thuế.',
        'Hộ gia đình: vừa tiêu dùng, vừa cung cấp sức lao động và tích luỹ vốn cho nền kinh tế.',
      ] },
      { h: 'Chủ thể trung gian và chủ thể nước ngoài' },
      { p: 'Ngoài ba chủ thể chính còn có các chủ thể trung gian (ngân hàng, sàn thương mại, đại lý) làm cầu nối giữa sản xuất và tiêu dùng. Trong nền kinh tế mở, doanh nghiệp có vốn đầu tư nước ngoài (FDI) và nhà đầu tư nước ngoài cũng là những chủ thể quan trọng.' },
      { h: 'Các chủ thể tương tác thế nào?' },
      { p: 'Các chủ thể không hoạt động riêng lẻ mà gắn kết qua thị trường theo nguyên tắc cung - cầu. Hộ gia đình cung cấp lao động cho doanh nghiệp, nhận tiền lương; doanh nghiệp bán hàng cho hộ gia đình; Nhà nước thu thuế và cung cấp lại dịch vụ công cho cả hai.' },
      { note: 'Một nền kinh tế khoẻ mạnh là khi cả ba chủ thể đều phát huy vai trò và hỗ trợ lẫn nhau, không ai lấn át ai.' },
    ],
    examples: [
      { q: 'Khi Nhà nước xây đường cao tốc, ai là chủ thể và ai hưởng lợi?', a: 'Nhà nước đóng vai chủ thể kinh tế đầu tư công, dùng tiền ngân sách (chủ yếu từ thuế). Doanh nghiệp vận tải, hộ gia đình đi lại thuận lợi đều hưởng lợi. Đây là ví dụ Nhà nước điều tiết và đầu tư cho nền kinh tế.' },
      { q: 'Bố mẹ bạn Lan đi làm công ty, cuối tháng nhận lương rồi mua sắm. Hộ gia đình của Lan giữ vai trò gì?', a: 'Khi đi làm, bố mẹ Lan là chủ thể cung cấp sức lao động cho doanh nghiệp. Khi mua sắm, gia đình là chủ thể tiêu dùng. Phần tiền tiết kiệm gửi ngân hàng là tích luỹ vốn cho nền kinh tế. Hộ gia đình giữ cả ba vai cùng lúc.' },
    ],
  },

  'H10GDCD-w03-quiz': {
    topic: 'Thị trường',
    intro: 'Các em đã bao giờ tự hỏi: tại sao giá xăng, giá vàng, giá rau lại thay đổi liên tục? Câu trả lời nằm ở thị trường. Hôm nay chúng ta tìm hiểu thị trường là gì và có những chức năng nào.',
    objectives: [
      'Nêu khái niệm và các yếu tố cấu thành thị trường.',
      'Trình bày được ba chức năng của thị trường.',
      'Phân loại thị trường theo đối tượng giao dịch.',
    ],
    theory: [
      { h: 'Thị trường là gì?' },
      { p: 'Thị trường là nơi diễn ra hoạt động trao đổi, mua bán hàng hoá và dịch vụ. Thị trường không chỉ là cái chợ, siêu thị mà còn là không gian ảo như sàn thương mại điện tử, sàn chứng khoán — bất cứ nơi nào người mua và người bán gặp nhau.' },
      { h: 'Các yếu tố cấu thành' },
      { ul: [
        'Chủ thể: người mua và người bán.',
        'Đối tượng: hàng hoá, dịch vụ được trao đổi.',
        'Giá cả: thoả thuận về giá trị trao đổi.',
      ] },
      { h: 'Ba chức năng của thị trường' },
      { ul: [
        'Chức năng thông tin: giá cả cho biết hàng nào đang khan hiếm, hàng nào dư thừa.',
        'Chức năng kích thích sản xuất: nơi nào có lợi nhuận, người sản xuất đổ vào làm.',
        'Chức năng điều tiết: phân bổ lại nguồn lực giữa các ngành theo cung - cầu.',
      ] },
      { h: 'Phân loại thị trường' },
      { p: 'Theo đối tượng giao dịch, có thị trường hàng hoá, thị trường dịch vụ, thị trường lao động (mua bán sức lao động), thị trường tài chính (tiền tệ, chứng khoán, bảo hiểm) và thị trường bất động sản.' },
      { note: 'Giá cả trên thị trường giống "tín hiệu đèn giao thông" của nền kinh tế: nó báo cho người sản xuất biết nên đi tiếp hay dừng lại.' },
    ],
    examples: [
      { q: 'Mùa hè giá điều hoà tăng vọt. Thị trường đang gửi tín hiệu gì cho nhà sản xuất?', a: 'Giá tăng cho thấy cầu lớn hơn cung. Đó là chức năng thông tin và kích thích: nhà sản xuất biết mặt hàng này đang có lời nên tăng sản lượng, đáp ứng nhu cầu khách hàng và thu thêm lợi nhuận.' },
      { q: 'Một sinh viên đi tìm việc làm thêm. Em đó đang tham gia thị trường nào?', a: 'Sinh viên đang tham gia thị trường lao động — nơi cung (sức lao động của sinh viên) và cầu (nhu cầu thuê nhân công của doanh nghiệp) gặp nhau. Mức lương chính là "giá cả" của sức lao động trên thị trường này.' },
    ],
  },

  'H10GDCD-w04-quiz': {
    topic: 'Cơ chế thị trường',
    intro: 'Không có ai ra lệnh mà sao hàng hoá vẫn được sản xuất đúng thứ xã hội cần? Đó là nhờ cơ chế thị trường — "bàn tay vô hình" mà nhà kinh tế Adam Smith từng nói tới. Bài này giúp các em hiểu cơ chế đó vận hành ra sao.',
    objectives: [
      'Hiểu cơ chế thị trường vận hành theo cung - cầu - giá cả.',
      'Nêu được tác động của quy luật cạnh tranh.',
      'Phân tích ưu điểm và khuyết tật của cơ chế thị trường.',
    ],
    theory: [
      { h: 'Cơ chế thị trường là gì?' },
      { p: 'Cơ chế thị trường là hệ thống các quan hệ kinh tế mang tính tự điều chỉnh, vận hành dựa trên sự tác động qua lại của cung, cầu và giá cả. Không cần mệnh lệnh hành chính, thị trường tự cân đối sản xuất với tiêu dùng.' },
      { h: 'Các quy luật cơ bản' },
      { ul: [
        'Quy luật cung - cầu: cung tăng (các yếu tố khác giữ nguyên) thì giá giảm; cầu tăng thì giá tăng.',
        'Quy luật giá trị: hàng hoá trao đổi theo hao phí lao động xã hội cần thiết.',
        'Quy luật cạnh tranh: buộc doanh nghiệp cải tiến công nghệ, hạ giá, nâng chất lượng để tồn tại.',
      ] },
      { h: 'Ưu điểm' },
      { p: 'Cơ chế thị trường giúp phân bổ nguồn lực hiệu quả, kích thích cạnh tranh, đổi mới sáng tạo, thoả mãn nhu cầu đa dạng của người tiêu dùng.' },
      { h: 'Khuyết tật' },
      { p: 'Tuy nhiên thị trường tự thân có khuyết tật: phân hoá giàu nghèo, dễ hình thành độc quyền, gây ngoại tác xấu như ô nhiễm môi trường, và đôi khi mất cân đối, khủng hoảng. Vì vậy Nhà nước phải tham gia điều tiết.' },
      { note: 'Đây là lý do Việt Nam xây dựng "nền kinh tế thị trường định hướng xã hội chủ nghĩa": dùng ưu điểm của thị trường nhưng có Nhà nước khắc phục khuyết tật của nó.' },
    ],
    examples: [
      { q: 'Trên một con phố có hai quán bún. Một quán nâng giá vô lý, quán kia giữ giá và làm ngon hơn. Điều gì sẽ xảy ra?', a: 'Quy luật cạnh tranh tác động: khách sẽ chuyển sang quán giữ giá, chất lượng tốt. Quán nâng giá mất khách buộc phải điều chỉnh. Cạnh tranh khiến cả hai phải cải thiện để giữ khách — người tiêu dùng hưởng lợi.' },
      { q: 'Một nhà máy xả thải ra sông để giảm chi phí. Đây là khuyết tật nào của thị trường?', a: 'Đây là "ngoại tác xấu" — một khuyết tật của cơ chế thị trường. Nhà máy đẩy chi phí ô nhiễm cho cộng đồng để hạ giá thành. Thị trường không tự khắc phục được, nên Nhà nước phải dùng pháp luật và thuế môi trường để điều chỉnh.' },
    ],
  },

  'H10GDCD-w05-quiz': {
    topic: 'Ngân sách nhà nước',
    intro: 'Tiền để xây trường học, làm đường, trả lương giáo viên, mua vắc-xin... đến từ đâu? Tất cả nằm trong ngân sách nhà nước. Bài này giúp các em hiểu "túi tiền chung" của quốc gia được thu - chi như thế nào.',
    objectives: [
      'Nêu khái niệm và vai trò của ngân sách nhà nước.',
      'Phân biệt các nguồn thu và khoản chi của ngân sách.',
      'Hiểu vai trò của Quốc hội với ngân sách nhà nước.',
    ],
    theory: [
      { h: 'Ngân sách nhà nước là gì?' },
      { p: 'Ngân sách nhà nước là toàn bộ các khoản thu, chi của Nhà nước được dự toán và thực hiện trong một khoảng thời gian nhất định (thường là một năm), do cơ quan nhà nước có thẩm quyền quyết định, nhằm bảo đảm thực hiện các chức năng, nhiệm vụ của Nhà nước.' },
      { h: 'Nguồn thu chủ yếu' },
      { ul: [
        'Thuế: nguồn thu lớn nhất, chiếm phần lớn ngân sách.',
        'Phí và lệ phí: thu khi Nhà nước cung cấp dịch vụ công (lệ phí cấp giấy tờ...).',
        'Các khoản thu khác: từ hoạt động kinh tế của Nhà nước, viện trợ, vay nợ.',
      ] },
      { h: 'Các khoản chi' },
      { ul: [
        'Chi thường xuyên: trả lương, vận hành bộ máy, an sinh xã hội, quốc phòng - an ninh.',
        'Chi đầu tư phát triển: xây dựng hạ tầng, đường sá, bệnh viện, trường học.',
      ] },
      { h: 'Ai quyết định ngân sách?' },
      { p: 'Quốc hội là cơ quan quyết định dự toán ngân sách nhà nước và phê chuẩn quyết toán. Khi tổng chi lớn hơn tổng thu thì gọi là bội chi, phần thiếu phải bù bằng vay nợ — cần kiểm soát để không gây nợ công quá lớn.' },
      { note: 'Nộp thuế đầy đủ chính là góp phần làm đầy ngân sách để Nhà nước xây trường, làm đường cho chính các em sử dụng.' },
    ],
    examples: [
      { q: 'Vì sao việc một số người trốn thuế lại ảnh hưởng đến cả cộng đồng?', a: 'Thuế là nguồn thu chính của ngân sách. Khi có người trốn thuế, ngân sách giảm, Nhà nước thiếu tiền chi cho trường học, bệnh viện, đường sá. Người trung thực nộp thuế phải gánh nặng hơn. Vì vậy trốn thuế gây thiệt hại cho toàn xã hội.' },
      { q: 'Một năm Nhà nước thu 1.500 nghìn tỷ nhưng chi 1.700 nghìn tỷ. Điều này gọi là gì và xử lý ra sao?', a: 'Đây là bội chi ngân sách (chi nhiều hơn thu 200 nghìn tỷ). Nhà nước phải bù phần thiếu bằng vay nợ trong và ngoài nước. Bội chi kéo dài làm nợ công tăng, nên cần kiểm soát ở mức an toàn theo nghị quyết của Quốc hội.' },
    ],
  },

  'H10GDCD-w06-quiz': {
    topic: 'Thuế - Khái niệm và vai trò',
    intro: 'Nhắc đến thuế, nhiều người nghĩ ngay đến chuyện phải nộp tiền. Nhưng thuế thực ra là "đóng góp chung" để xây dựng đất nước. Bài này giúp các em hiểu đúng bản chất và vai trò của thuế.',
    objectives: [
      'Nêu khái niệm và đặc điểm của thuế.',
      'Trình bày ba vai trò của thuế.',
      'Phân biệt thuế trực thu và thuế gián thu.',
    ],
    theory: [
      { h: 'Thuế là gì?' },
      { p: 'Thuế là khoản nộp bắt buộc mà các tổ chức, cá nhân phải nộp cho Nhà nước theo quy định của pháp luật, không mang tính hoàn trả trực tiếp, nhằm phục vụ chi tiêu công cộng.' },
      { h: 'Đặc điểm của thuế' },
      { ul: [
        'Tính bắt buộc: mọi đối tượng theo luật đều phải nộp, không phải tự nguyện.',
        'Không hoàn trả trực tiếp: nộp thuế nhưng được hưởng lại gián tiếp qua dịch vụ công.',
        'Tính pháp lý: chỉ được thu theo luật do Quốc hội ban hành.',
      ] },
      { h: 'Ba vai trò của thuế' },
      { ul: [
        'Là nguồn thu chủ yếu của ngân sách nhà nước.',
        'Là công cụ điều tiết kinh tế vĩ mô (khuyến khích hay hạn chế ngành nghề).',
        'Góp phần đảm bảo công bằng xã hội (người thu nhập cao nộp nhiều hơn).',
      ] },
      { h: 'Phân loại thuế' },
      { p: 'Có hai nhóm chính: thuế trực thu đánh trực tiếp vào thu nhập, tài sản của người nộp (thuế thu nhập cá nhân, thuế thu nhập doanh nghiệp); thuế gián thu đánh vào hàng hoá - dịch vụ và người tiêu dùng cuối thực sự chịu (thuế giá trị gia tăng, thuế tiêu thụ đặc biệt).' },
      { note: 'Trốn thuế là hành vi vi phạm pháp luật, có thể bị xử phạt hành chính, thậm chí truy cứu trách nhiệm hình sự.' },
    ],
    examples: [
      { q: 'Vì sao thuốc lá, rượu bia bị đánh thuế tiêu thụ đặc biệt rất cao?', a: 'Đây là vai trò điều tiết kinh tế - xã hội của thuế. Nhà nước đánh thuế cao vào mặt hàng có hại cho sức khoẻ để hạn chế tiêu dùng, đồng thời tăng thu ngân sách. Giá cao khiến người dân cân nhắc, giảm sử dụng.' },
      { q: 'Bạn Minh nói: "Nộp thuế là mất tiền vô ích vì chẳng được trả lại gì". Em phản biện thế nào?', a: 'Minh hiểu sai đặc điểm "không hoàn trả trực tiếp". Thuế không trả lại trực tiếp cho từng người, nhưng được hoàn trả gián tiếp qua đường sá, trường học, bệnh viện, an ninh mà ai cũng dùng. Vì vậy nộp thuế là đóng góp chung, không hề vô ích.' },
    ],
  },

  'H10GDCD-w07-quiz': {
    topic: 'Thuế Giá trị gia tăng (GTGT)',
    intro: 'Khi các em mua một hộp bút và nhìn vào hoá đơn, thường thấy dòng "VAT 10%". Đó chính là thuế giá trị gia tăng. Bài này giải thích loại thuế gắn liền với mọi giao dịch mua bán hằng ngày.',
    objectives: [
      'Hiểu thuế GTGT đánh vào phần giá trị tăng thêm.',
      'Biết thuế GTGT là thuế gián thu và mức thuế suất phổ biến.',
      'Nhận thức quyền và lợi ích khi lấy hoá đơn.',
    ],
    theory: [
      { h: 'Thuế GTGT (VAT) là gì?' },
      { p: 'Thuế giá trị gia tăng (Value Added Tax) là thuế đánh vào phần giá trị tăng thêm của hàng hoá, dịch vụ phát sinh trong quá trình từ sản xuất, lưu thông đến tiêu dùng. Đây là thuế gián thu: doanh nghiệp nộp hộ, nhưng người tiêu dùng cuối cùng mới thực sự gánh thuế qua giá bán.' },
      { h: 'Mức thuế suất ở Việt Nam' },
      { ul: [
        'Mức 10%: mức thông thường, áp dụng cho phần lớn hàng hoá, dịch vụ.',
        'Mức 5%: hàng hoá, dịch vụ thiết yếu (nước sạch, thuốc chữa bệnh, thiết bị y tế...).',
        'Mức 0%: hàng hoá, dịch vụ xuất khẩu, nhằm khuyến khích xuất khẩu.',
      ] },
      { h: 'Vì sao người tiêu dùng chịu thuế?' },
      { p: 'VAT được cộng vào giá bán nên dù doanh nghiệp là người kê khai, nộp thuế thì người mua hàng cuối cùng mới là người trả tiền thuế đó trong giá sản phẩm.' },
      { h: 'Vai trò của hoá đơn' },
      { p: 'Lấy hoá đơn khi mua hàng là quyền và là nghĩa vụ của người tiêu dùng. Hoá đơn giúp giao dịch minh bạch, chống thất thu thuế, đồng thời là căn cứ để bảo hành và khiếu nại khi cần.' },
      { note: 'Mỗi lần các em yêu cầu hoá đơn là một lần góp phần làm minh bạch nền kinh tế và chống thất thu ngân sách.' },
    ],
    examples: [
      { q: 'Một chiếc áo ghi giá 220.000 đồng đã gồm VAT 10%. Giá trước thuế và tiền thuế là bao nhiêu?', a: 'Giá trước thuế = 220.000 / 1,1 = 200.000 đồng. Tiền thuế VAT = 200.000 x 10% = 20.000 đồng. Như vậy người mua đã trả 20.000 đồng tiền thuế GTGT trong giá chiếc áo này.' },
      { q: 'Vì sao hàng xuất khẩu lại được áp thuế VAT 0%?', a: 'Để khuyến khích xuất khẩu, tăng sức cạnh tranh của hàng Việt Nam trên thị trường quốc tế. Áp 0% giúp giá hàng xuất khẩu rẻ hơn, doanh nghiệp còn được hoàn lại thuế đầu vào, từ đó thúc đẩy sản xuất và thu ngoại tệ cho đất nước.' },
    ],
  },

  'H10GDCD-w08-quiz': {
    topic: 'Thuế Thu nhập cá nhân (TNCN)',
    intro: 'Sau này khi đi làm và có lương cao, các em sẽ phải nộp thuế thu nhập cá nhân. Bài này giúp các em hiểu trước loại thuế trực thu này: đánh vào ai, tính thế nào, và vì sao lại công bằng.',
    objectives: [
      'Hiểu thuế TNCN đánh vào thu nhập của cá nhân.',
      'Biết khái niệm giảm trừ gia cảnh và biểu thuế luỹ tiến.',
      'Nhận thức nghĩa vụ nộp thuế của công dân.',
    ],
    theory: [
      { h: 'Thuế TNCN là gì?' },
      { p: 'Thuế thu nhập cá nhân là thuế trực thu, đánh trực tiếp vào thu nhập chịu thuế của cá nhân từ tiền lương, tiền công, kinh doanh, đầu tư vốn... Người có thu nhập là người trực tiếp nộp thuế.' },
      { h: 'Giảm trừ gia cảnh' },
      { p: 'Trước khi tính thuế, mỗi người được trừ một phần thu nhập để trang trải cuộc sống, gọi là giảm trừ gia cảnh: 11 triệu đồng/tháng cho bản thân và 4,4 triệu đồng/tháng cho mỗi người phụ thuộc. Chỉ phần thu nhập vượt mức này mới phải nộp thuế.' },
      { h: 'Biểu thuế luỹ tiến từng phần' },
      { p: 'Thuế TNCN tính theo biểu luỹ tiến: thu nhập càng cao, phần vượt càng chịu thuế suất bậc cao hơn. Cách này bảo đảm công bằng — người giàu đóng góp nhiều hơn người có thu nhập thấp.' },
      { h: 'Quyết toán thuế' },
      { p: 'Hằng năm, cá nhân tự quyết toán hoặc nhờ doanh nghiệp trả thu nhập quyết toán hộ, để xác định số thuế phải nộp, nộp thiếu hay được hoàn lại.' },
      { note: 'Thuế TNCN luỹ tiến thể hiện rõ vai trò "đảm bảo công bằng xã hội" của thuế mà các em đã học ở tuần trước.' },
    ],
    examples: [
      { q: 'Anh Hùng có thu nhập 13 triệu/tháng, nuôi 1 con nhỏ. Anh có phải nộp thuế TNCN không?', a: 'Tổng giảm trừ của anh Hùng = 11 triệu (bản thân) + 4,4 triệu (1 người phụ thuộc) = 15,4 triệu/tháng. Thu nhập 13 triệu thấp hơn mức giảm trừ nên anh Hùng chưa phải nộp thuế TNCN. Đây là cách giảm trừ gia cảnh bảo vệ người thu nhập trung bình.' },
      { q: 'Vì sao người lương 100 triệu/tháng nộp thuế nhiều hơn nhiều lần người lương 20 triệu/tháng?', a: 'Vì biểu thuế luỹ tiến từng phần: phần thu nhập càng cao càng rơi vào bậc thuế suất cao hơn. Người lương 100 triệu có nhiều phần thu nhập chịu thuế suất bậc cao, nên nộp nhiều hơn. Điều này thể hiện nguyên tắc công bằng: ai có khả năng đóng góp nhiều thì đóng nhiều.' },
    ],
  },

  'H10GDCD-w09-quiz': {
    topic: 'Tiền tệ và lạm phát',
    intro: 'Ông bà ta hay kể: "Ngày xưa vài đồng đã mua được cả rổ gạo". Vì sao tiền ngày càng mất giá? Đó là chuyện của tiền tệ và lạm phát mà các em sẽ tìm hiểu hôm nay.',
    objectives: [
      'Nêu khái niệm và chức năng của tiền tệ.',
      'Hiểu lạm phát là gì và tác hại của nó.',
      'Biết cơ quan kiểm soát lạm phát ở Việt Nam.',
    ],
    theory: [
      { h: 'Tiền tệ là gì?' },
      { p: 'Tiền tệ là hàng hoá đặc biệt, đóng vai trò vật ngang giá chung trong trao đổi. Nhờ có tiền, người ta không cần đổi hàng lấy hàng mà có thể mua bán mọi thứ một cách thuận tiện.' },
      { h: 'Năm chức năng của tiền' },
      { ul: [
        'Thước đo giá trị: định giá hàng hoá thành tiền.',
        'Phương tiện lưu thông: trung gian trong mua bán.',
        'Phương tiện cất trữ: giữ giá trị để dùng sau.',
        'Phương tiện thanh toán: trả nợ, nộp thuế, trả lương.',
        'Tiền tệ thế giới: dùng trong giao dịch quốc tế.',
      ] },
      { h: 'Lạm phát là gì?' },
      { p: 'Lạm phát là tình trạng mức giá chung của hàng hoá, dịch vụ tăng lên liên tục trong một thời gian dài, làm cho sức mua của đồng tiền giảm xuống — cùng một số tiền nhưng mua được ít hàng hơn trước.' },
      { h: 'Tác hại và kiểm soát' },
      { p: 'Lạm phát cao làm sức mua giảm, ảnh hưởng nặng nhất tới người có thu nhập cố định và người nghèo. Ở Việt Nam, Ngân hàng Nhà nước Việt Nam điều hành chính sách tiền tệ để giữ lạm phát ở mức mục tiêu (thường quanh 4%/năm).' },
      { note: 'Lạm phát vừa phải (thấp, ổn định) là bình thường, thậm chí cần thiết; chỉ lạm phát cao, phi mã mới gây nguy hiểm cho nền kinh tế.' },
    ],
    examples: [
      { q: 'Năm trước 50.000 đồng mua được 5 ổ bánh mì, năm nay chỉ mua được 4 ổ. Hiện tượng này gọi là gì?', a: 'Đây là lạm phát: giá bánh mì tăng nên sức mua của đồng tiền giảm. Cùng 50.000 đồng nhưng mua được ít hàng hơn. Khi giá nhiều mặt hàng cùng tăng kéo dài thì mức giá chung tăng, đó chính là lạm phát.' },
      { q: 'Vì sao lạm phát cao gây thiệt hại nặng nhất cho người làm công ăn lương cố định?', a: 'Vì lương của họ không tăng kịp với giá cả. Khi giá hàng hoá tăng nhanh mà lương giữ nguyên, số tiền lương mua được ít hàng hơn, đời sống khó khăn hơn. Người kinh doanh có thể tăng giá bán theo, còn người lương cố định thì chịu thiệt.' },
    ],
  },

  'H10GDCD-w10-quiz': {
    topic: 'Cung cầu và giá cả',
    intro: 'Vì sao hoa ngày Tết, ngày lễ tình nhân lại đắt đỏ? Vì sao điện thoại đời cũ ngày càng rẻ? Tất cả đều do quy luật cung - cầu. Bài này giúp các em nắm vững quy luật quan trọng nhất của kinh tế thị trường.',
    objectives: [
      'Phân biệt rõ khái niệm cung và cầu.',
      'Nắm quy luật cung, quy luật cầu.',
      'Hiểu khái niệm giá cân bằng.',
    ],
    theory: [
      { h: 'Cầu và cung' },
      { ul: [
        'Cầu: lượng hàng hoá, dịch vụ mà người mua muốn mua và có khả năng thanh toán ở một mức giá nhất định. Muốn mua thôi chưa đủ, phải có tiền mới thành cầu.',
        'Cung: lượng hàng hoá, dịch vụ mà người bán muốn bán và có khả năng cung cấp ở một mức giá nhất định.',
      ] },
      { h: 'Quy luật cầu và quy luật cung' },
      { ul: [
        'Quy luật cầu: giá tăng thì lượng cầu giảm, giá giảm thì lượng cầu tăng (khi yếu tố khác không đổi).',
        'Quy luật cung: giá tăng thì lượng cung tăng (vì có lời, người bán muốn bán nhiều hơn), giá giảm thì lượng cung giảm.',
      ] },
      { h: 'Giá cân bằng' },
      { p: 'Khi lượng cung bằng lượng cầu, thị trường đạt trạng thái cân bằng và giá lúc đó gọi là giá cân bằng. Nếu cầu vượt cung, giá có xu hướng tăng; nếu cung vượt cầu, giá có xu hướng giảm — cho đến khi trở về cân bằng.' },
      { note: 'Hiểu cung - cầu giúp các em lý giải hầu hết biến động giá cả trong đời sống và cả khi mua bán thông minh.' },
    ],
    examples: [
      { q: 'Ngày 8/3 giá hoa hồng tăng gấp 2-3 lần. Quy luật nào giải thích điều này?', a: 'Quy luật cung - cầu. Ngày 8/3 nhu cầu mua hoa hồng tăng đột biến (cầu tăng mạnh) trong khi lượng hoa có hạn (cung không tăng kịp). Cầu vượt cung khiến giá tăng vọt. Sau ngày lễ, cầu giảm nên giá hoa lại hạ xuống.' },
      { q: 'Một mẫu điện thoại sau 2 năm ra mắt thì giá giảm mạnh. Vì sao?', a: 'Vì cầu giảm: người tiêu dùng chuyển sang mua đời mới hơn nên cầu với mẫu cũ giảm. Đồng thời nhà sản xuất muốn bán hết hàng tồn nên hạ giá. Cung vượt cầu khiến giá giảm, đúng quy luật cung - cầu.' },
    ],
  },

  'H10GDCD-w11-quiz': {
    topic: 'Hợp tác và cạnh tranh',
    intro: 'Trong kinh tế, các doanh nghiệp vừa "đấu" nhau để giành khách, vừa "bắt tay" nhau để cùng phát triển. Hai mặt tưởng như trái ngược ấy lại song hành. Bài này giúp các em hiểu cạnh tranh và hợp tác.',
    objectives: [
      'Phân biệt cạnh tranh lành mạnh và không lành mạnh.',
      'Nêu các hình thức hợp tác kinh tế.',
      'Hiểu cạnh tranh và hợp tác có thể tồn tại song song.',
    ],
    theory: [
      { h: 'Cạnh tranh trong kinh tế' },
      { p: 'Cạnh tranh là sự đua tranh giữa các chủ thể kinh tế nhằm giành lấy những điều kiện thuận lợi để thu lợi ích lớn nhất trong sản xuất, kinh doanh. Cạnh tranh là động lực thúc đẩy nền kinh tế phát triển.' },
      { h: 'Cạnh tranh lành mạnh và không lành mạnh' },
      { ul: [
        'Cạnh tranh lành mạnh: tuân thủ pháp luật và đạo đức kinh doanh — cải tiến chất lượng, hạ giá, đổi mới sáng tạo.',
        'Cạnh tranh không lành mạnh: dùng thủ đoạn trái phép — làm hàng giả, gian lận, vu khống, nói xấu đối thủ. Hành vi này bị pháp luật nghiêm cấm.',
      ] },
      { h: 'Hợp tác kinh tế' },
      { p: 'Hợp tác là sự cùng làm việc, hỗ trợ, chia sẻ giữa các chủ thể để đạt lợi ích chung. Hợp tác diễn ra qua hợp đồng, liên doanh, chuỗi cung ứng, chia sẻ công nghệ...' },
      { h: 'Quan hệ giữa cạnh tranh và hợp tác' },
      { p: 'Cạnh tranh và hợp tác không loại trừ nhau mà tồn tại song song. Hai doanh nghiệp có thể cạnh tranh ở thị trường này nhưng lại hợp tác sản xuất ở lĩnh vực khác — vừa đối thủ vừa đối tác.' },
      { note: 'Trong nền kinh tế thị trường định hướng XHCN, Nhà nước khuyến khích cạnh tranh lành mạnh và nghiêm cấm cạnh tranh không lành mạnh, độc quyền.' },
    ],
    examples: [
      { q: 'Một cửa hàng tung tin đồn sai rằng hàng của đối thủ kém chất lượng để giành khách. Đây là cạnh tranh gì?', a: 'Đây là cạnh tranh không lành mạnh — dùng thủ đoạn vu khống, bôi nhọ đối thủ thay vì nâng cao chính mình. Hành vi này vi phạm pháp luật cạnh tranh và đạo đức kinh doanh, có thể bị xử phạt và yêu cầu bồi thường thiệt hại.' },
      { q: 'Hai hãng điện thoại là đối thủ nhưng một hãng vẫn cung cấp màn hình cho hãng kia. Mâu thuẫn không?', a: 'Không hề mâu thuẫn. Đây là minh chứng cạnh tranh và hợp tác song hành: hai hãng cạnh tranh ở thị trường điện thoại nhưng hợp tác trong cung ứng linh kiện vì cùng có lợi. Trong kinh tế hiện đại, vừa là đối thủ vừa là đối tác là chuyện bình thường.' },
    ],
  },

  'H10GDCD-w12-quiz': {
    topic: 'Sản xuất kinh doanh và các loại hình doanh nghiệp',
    intro: 'Sau này nếu khởi nghiệp, các em sẽ phải chọn lập công ty loại nào: doanh nghiệp tư nhân, công ty TNHH hay công ty cổ phần? Bài này giúp các em hiểu sản xuất kinh doanh và các mô hình doanh nghiệp ở Việt Nam.',
    objectives: [
      'Nêu khái niệm sản xuất kinh doanh.',
      'Phân biệt các loại hình doanh nghiệp cơ bản.',
      'Biết cách tính lợi nhuận của doanh nghiệp.',
    ],
    theory: [
      { h: 'Sản xuất kinh doanh là gì?' },
      { p: 'Sản xuất kinh doanh là hoạt động tổ chức sản xuất ra hàng hoá, dịch vụ và đưa ra thị trường tiêu thụ nhằm mục tiêu thu lợi nhuận. Đây là hoạt động trung tâm của các doanh nghiệp.' },
      { h: 'Các loại hình doanh nghiệp' },
      { ul: [
        'Doanh nghiệp tư nhân: do một cá nhân làm chủ, tự chịu trách nhiệm vô hạn bằng toàn bộ tài sản của mình.',
        'Công ty TNHH (trách nhiệm hữu hạn): có từ 1 đến 50 thành viên góp vốn, chỉ chịu trách nhiệm trong phạm vi số vốn đã góp.',
        'Công ty cổ phần: vốn chia thành nhiều cổ phần, được phát hành cổ phiếu, có thể niêm yết trên sàn chứng khoán.',
        'Hợp tác xã: tổ chức kinh tế tập thể do các xã viên tự nguyện thành lập, cùng góp vốn và làm việc.',
      ] },
      { h: 'Lợi nhuận của doanh nghiệp' },
      { p: 'Lợi nhuận = Doanh thu - Tổng chi phí. Trong đó chi phí gồm chi phí cố định (thuê mặt bằng, khấu hao máy) và chi phí biến đổi (nguyên liệu, nhân công theo sản lượng). Doanh nghiệp có lãi khi doanh thu lớn hơn chi phí.' },
      { note: '"Trách nhiệm hữu hạn" và "trách nhiệm vô hạn" là điểm khác biệt cốt lõi: chủ doanh nghiệp tư nhân có thể mất hết tài sản cá nhân khi vỡ nợ, còn thành viên công ty TNHH chỉ mất phần vốn đã góp.' },
    ],
    examples: [
      { q: 'Anh Nam mở quán cà phê dạng doanh nghiệp tư nhân. Quán nợ 500 triệu, tài sản quán chỉ 300 triệu. Anh Nam phải làm gì?', a: 'Vì doanh nghiệp tư nhân chịu trách nhiệm vô hạn, anh Nam phải lấy tài sản cá nhân (xe, nhà...) để trả nốt 200 triệu còn thiếu. Nếu là công ty TNHH thì anh chỉ mất phần vốn đã góp, không phải gán tài sản riêng. Đây là rủi ro cần cân nhắc khi chọn loại hình.' },
      { q: 'Một xưởng có doanh thu 800 triệu, chi phí nguyên liệu - nhân công 500 triệu, thuê mặt bằng 100 triệu. Lợi nhuận là bao nhiêu?', a: 'Tổng chi phí = 500 + 100 = 600 triệu. Lợi nhuận = Doanh thu - Tổng chi phí = 800 - 600 = 200 triệu. Xưởng đang có lãi 200 triệu. Nếu muốn lãi nhiều hơn, chủ xưởng cần tăng doanh thu hoặc tiết kiệm chi phí hợp lý.' },
    ],
  },

  'H10GDCD-w13-quiz': {
    topic: 'Văn hoá tiêu dùng',
    intro: 'Các em là người tiêu dùng từ rất sớm: mua quà vặt, mua sách, mua quần áo. Tiêu dùng có văn hoá là biết chọn lựa thông minh, bảo vệ quyền lợi và môi trường. Bài này giúp các em trở thành người tiêu dùng văn minh.',
    objectives: [
      'Hiểu khái niệm văn hoá tiêu dùng và tiêu dùng thông minh.',
      'Nêu các quyền cơ bản của người tiêu dùng.',
      'Nhận biết tác hại của hàng giả, hàng nhái.',
    ],
    theory: [
      { h: 'Văn hoá tiêu dùng là gì?' },
      { p: 'Văn hoá tiêu dùng là cách thức, thái độ tiêu dùng có ý thức, văn minh: lựa chọn sản phẩm chất lượng, phù hợp nhu cầu và khả năng, tránh lãng phí và chạy theo phong trào.' },
      { h: 'Tiêu dùng thông minh' },
      { p: 'Người tiêu dùng thông minh có kế hoạch chi tiêu, so sánh giá cả - chất lượng, kiểm tra nguồn gốc, hạn sử dụng trước khi mua, không mua theo cảm hứng nhất thời.' },
      { h: 'Quyền của người tiêu dùng' },
      { ul: [
        'Quyền được an toàn về tính mạng, sức khoẻ khi dùng sản phẩm.',
        'Quyền được cung cấp thông tin chính xác về hàng hoá.',
        'Quyền được lựa chọn hàng hoá, dịch vụ.',
        'Quyền được khiếu nại, yêu cầu bồi thường khi quyền lợi bị xâm phạm.',
      ] },
      { h: 'Tiêu dùng bền vững và hàng giả' },
      { p: 'Tiêu dùng bền vững là tiết kiệm và ưu tiên sản phẩm thân thiện môi trường. Còn hàng giả, hàng nhái gây thiệt hại cho người tiêu dùng (về sức khoẻ, tiền bạc) và cả doanh nghiệp làm ăn chân chính.' },
      { note: 'Khi gặp hàng kém chất lượng, các em có quyền khiếu nại với người bán, hội bảo vệ người tiêu dùng hoặc cơ quan quản lý thị trường — đừng im lặng chịu thiệt.' },
    ],
    examples: [
      { q: 'Bạn Hoa mua kem trộn không nhãn mác trên mạng vì rẻ và bị dị ứng da. Hoa đã sai ở đâu?', a: 'Hoa đã tiêu dùng thiếu thông minh: mua sản phẩm không rõ nguồn gốc, không nhãn mác chỉ vì giá rẻ. Người tiêu dùng văn minh cần kiểm tra nguồn gốc, thành phần, hạn dùng. Khi bị thiệt hại, Hoa có quyền khiếu nại, nhưng tốt nhất nên phòng tránh từ đầu.' },
      { q: 'Vì sao mua hàng giả, hàng nhái không chỉ hại bản thân mà còn hại nền kinh tế?', a: 'Hàng giả gây hại sức khoẻ, tiền bạc người mua; làm thất thu thuế của Nhà nước; và khiến doanh nghiệp làm thật mất doanh thu, có thể phá sản. Khi người tốt thua thiệt, sản xuất chân chính bị triệt tiêu, nền kinh tế suy yếu. Vì vậy nói không với hàng giả là bảo vệ chính mình và xã hội.' },
    ],
  },

  'H10GDCD-w14-quiz': {
    topic: 'Hệ thống chính trị Việt Nam',
    intro: 'Từ tuần này chúng ta chuyển sang phần Pháp luật. Trước hết các em cần biết bộ máy lãnh đạo và quản lý đất nước được tổ chức ra sao — đó chính là hệ thống chính trị Việt Nam.',
    objectives: [
      'Kể tên các bộ phận của hệ thống chính trị Việt Nam.',
      'Nêu vai trò của Đảng, Nhà nước, Mặt trận Tổ quốc.',
      'Hiểu nguyên tắc tập trung dân chủ.',
    ],
    theory: [
      { h: 'Hệ thống chính trị gồm những gì?' },
      { ul: [
        'Đảng Cộng sản Việt Nam: lực lượng lãnh đạo Nhà nước và xã hội.',
        'Nhà nước Cộng hoà xã hội chủ nghĩa Việt Nam: tổ chức và quản lý đất nước.',
        'Mặt trận Tổ quốc Việt Nam và các tổ chức chính trị - xã hội: đại diện, bảo vệ quyền lợi của Nhân dân.',
      ] },
      { h: 'Vai trò từng bộ phận' },
      { p: 'Đảng Cộng sản Việt Nam lãnh đạo Nhà nước và xã hội (Điều 4 Hiến pháp 2013). Nhà nước là của Nhân dân, do Nhân dân, vì Nhân dân, thực hiện quản lý bằng pháp luật. Mặt trận Tổ quốc tập hợp khối đại đoàn kết toàn dân, giám sát và phản biện xã hội.' },
      { h: 'Các tổ chức chính trị - xã hội' },
      { p: 'Năm tổ chức chính trị - xã hội là thành viên nòng cốt của Mặt trận: Công đoàn Việt Nam, Hội Nông dân, Đoàn Thanh niên Cộng sản Hồ Chí Minh, Hội Liên hiệp Phụ nữ và Hội Cựu chiến binh.' },
      { h: 'Nguyên tắc hoạt động' },
      { p: 'Hệ thống chính trị Việt Nam hoạt động theo nguyên tắc tập trung dân chủ: thiểu số phục tùng đa số, cấp dưới phục tùng cấp trên, nhưng vẫn phát huy dân chủ, lắng nghe ý kiến từ cơ sở.' },
      { note: 'Đoàn Thanh niên Cộng sản Hồ Chí Minh là tổ chức gần các em nhất — đây cũng là một bộ phận của hệ thống chính trị Việt Nam.' },
    ],
    examples: [
      { q: 'Vì sao nói Nhà nước Việt Nam là "của Nhân dân, do Nhân dân, vì Nhân dân"?', a: 'Vì quyền lực nhà nước thuộc về Nhân dân: Nhân dân bầu ra Quốc hội và Hội đồng nhân dân (do Nhân dân), Nhà nước hoạt động phục vụ lợi ích của Nhân dân (vì Nhân dân), và Nhân dân là chủ thể của quyền lực (của Nhân dân). Đây là bản chất dân chủ của Nhà nước ta theo Hiến pháp 2013.' },
      { q: 'Đoàn Thanh niên tổ chức cho học sinh tham gia làm sạch môi trường. Hoạt động này thể hiện vai trò gì của hệ thống chính trị?', a: 'Đoàn Thanh niên là một tổ chức chính trị - xã hội trong hệ thống chính trị. Việc vận động học sinh làm sạch môi trường thể hiện vai trò tập hợp, giáo dục và phát huy vai trò của thanh niên, góp phần xây dựng đất nước. Đây là cách hệ thống chính trị gắn kết với đời sống cộng đồng.' },
    ],
  },

  'H10GDCD-w15-quiz': {
    topic: 'Bộ máy Nhà nước CHXHCN Việt Nam',
    intro: 'Quốc hội, Chính phủ, Toà án, Viện kiểm sát — các em nghe nhiều nhưng có thể chưa rõ mỗi cơ quan làm gì. Bài này giúp các em hình dung cấu trúc bộ máy Nhà nước ta một cách mạch lạc.',
    objectives: [
      'Nêu chức năng các cơ quan trong bộ máy Nhà nước.',
      'Phân biệt quyền lập pháp, hành pháp, tư pháp.',
      'Biết nhiệm kỳ và cách hình thành một số cơ quan.',
    ],
    theory: [
      { h: 'Các cơ quan trung ương' },
      { ul: [
        'Quốc hội: cơ quan quyền lực nhà nước cao nhất, cơ quan đại biểu cao nhất của Nhân dân, thực hiện quyền lập hiến, lập pháp. Nhiệm kỳ 5 năm.',
        'Chủ tịch nước: người đứng đầu Nhà nước, thay mặt Nhà nước về đối nội và đối ngoại.',
        'Chính phủ: cơ quan hành chính nhà nước cao nhất, thực hiện quyền hành pháp. Thủ tướng do Quốc hội bầu.',
        'Toà án nhân dân: cơ quan xét xử, thực hiện quyền tư pháp.',
        'Viện kiểm sát nhân dân: thực hành quyền công tố và kiểm sát hoạt động tư pháp.',
      ] },
      { h: 'Ba quyền' },
      { p: 'Quyền lực nhà nước là thống nhất, có sự phân công và phối hợp giữa ba quyền: lập pháp (làm luật - Quốc hội), hành pháp (thi hành luật - Chính phủ), tư pháp (xét xử - Toà án). Đây không phải là "tam quyền phân lập" như nhiều nước, mà là phân công trong một thể thống nhất.' },
      { h: 'Cơ quan địa phương' },
      { p: 'Ở địa phương có Hội đồng nhân dân (do Nhân dân bầu, là cơ quan quyền lực địa phương) và Uỷ ban nhân dân (cơ quan hành chính địa phương).' },
      { note: 'Mấu chốt cần nhớ: Quốc hội làm luật, Chính phủ thi hành, Toà án xét xử — ba chức năng khác nhau nhưng phối hợp trong một bộ máy thống nhất.' },
    ],
    examples: [
      { q: 'Khi cần ban hành một luật mới về giáo dục, cơ quan nào có quyền thông qua?', a: 'Quốc hội — cơ quan duy nhất có quyền lập pháp. Chính phủ có thể đề xuất dự thảo, nhưng chỉ Quốc hội mới biểu quyết thông qua luật. Sau khi luật có hiệu lực, Chính phủ chịu trách nhiệm tổ chức thi hành. Đây là sự phân công giữa lập pháp và hành pháp.' },
      { q: 'Một vụ tranh chấp đất đai được đưa ra xét xử. Cơ quan nào giải quyết và thuộc quyền gì?', a: 'Toà án nhân dân giải quyết, thuộc quyền tư pháp. Toà án là cơ quan xét xử, ra phán quyết dựa trên pháp luật. Viện kiểm sát kiểm sát hoạt động xét xử để bảo đảm đúng pháp luật. Chính phủ và Quốc hội không can thiệp vào phán quyết của Toà.' },
    ],
  },

  'H10GDCD-w16-quiz': {
    topic: 'Hệ thống pháp luật Việt Nam',
    intro: 'Pháp luật ở quanh ta: luật giao thông, luật lao động, luật hình sự... Nhưng pháp luật thực chất là gì, khác đạo đức ra sao, và văn bản nào cao nhất? Bài này trả lời những câu hỏi nền tảng đó.',
    objectives: [
      'Nêu khái niệm và đặc điểm của pháp luật.',
      'Phân biệt pháp luật với đạo đức.',
      'Biết thứ bậc của hệ thống văn bản quy phạm pháp luật.',
    ],
    theory: [
      { h: 'Pháp luật là gì?' },
      { p: 'Pháp luật là hệ thống các quy tắc xử sự chung, có tính bắt buộc, do Nhà nước ban hành và bảo đảm thực hiện, nhằm điều chỉnh các quan hệ xã hội theo những định hướng nhất định.' },
      { h: 'Ba đặc điểm của pháp luật' },
      { ul: [
        'Tính quy phạm phổ biến: áp dụng chung cho mọi người, mọi nơi, nhiều lần.',
        'Tính xác định chặt chẽ về hình thức: thể hiện qua văn bản rõ ràng, chính xác.',
        'Tính quyền lực, bắt buộc chung: do Nhà nước bảo đảm thực hiện bằng cưỡng chế.',
      ] },
      { h: 'Pháp luật khác đạo đức ở đâu?' },
      { p: 'Đạo đức dựa trên sự tự giác, dư luận xã hội; còn pháp luật có tính bắt buộc và chế tài cưỡng chế. Vi phạm đạo đức bị xã hội phê phán; vi phạm pháp luật bị Nhà nước xử lý.' },
      { h: 'Thứ bậc văn bản pháp luật' },
      { p: 'Việt Nam theo hệ thống pháp luật thành văn, nguồn chính là văn bản quy phạm pháp luật. Hiến pháp đứng cao nhất; dưới đó là các bộ luật, luật (do Quốc hội ban hành), rồi đến nghị định (Chính phủ), thông tư (các bộ). Văn bản cấp dưới không được trái với văn bản cấp trên.' },
      { note: 'Hiến pháp là "luật mẹ" — mọi luật, nghị định, thông tư đều phải phù hợp với Hiến pháp, nếu trái thì vô hiệu.' },
    ],
    examples: [
      { q: 'Một người không nhường ghế cho cụ già trên xe buýt. Đây là vi phạm pháp luật hay đạo đức?', a: 'Đây là vi phạm đạo đức, không phải pháp luật. Không có luật nào bắt buộc phải nhường ghế, nên người đó chỉ bị dư luận phê phán chứ không bị Nhà nước xử phạt. Điều này cho thấy khác biệt: đạo đức dựa trên tự giác, pháp luật mới có chế tài cưỡng chế.' },
      { q: 'Một thông tư của bộ quy định trái với luật do Quốc hội ban hành. Văn bản nào có hiệu lực?', a: 'Luật của Quốc hội có hiệu lực, thông tư trái luật phải bị bãi bỏ hoặc sửa đổi. Vì thông tư là văn bản cấp dưới, không được trái với luật cấp trên. Đây là nguyên tắc về thứ bậc hiệu lực trong hệ thống pháp luật Việt Nam.' },
    ],
  },

  'H10GDCD-w17-quiz': {
    topic: 'Thực hiện và bảo vệ pháp luật',
    intro: 'Có luật rồi thì phải thực hiện. Nhưng "thực hiện pháp luật" không chỉ là làm theo — nó có nhiều hình thức. Và khi vi phạm thì phải chịu trách nhiệm pháp lý. Bài này giúp các em hiểu cả hai mặt đó.',
    objectives: [
      'Nêu bốn hình thức thực hiện pháp luật.',
      'Hiểu khái niệm vi phạm pháp luật và trách nhiệm pháp lý.',
      'Biết độ tuổi chịu trách nhiệm hình sự.',
    ],
    theory: [
      { h: 'Bốn hình thức thực hiện pháp luật' },
      { ul: [
        'Tuân thủ pháp luật: không làm những điều pháp luật cấm (không trộm cắp).',
        'Thi hành pháp luật: chủ động làm những điều pháp luật yêu cầu (nộp thuế đúng hạn).',
        'Sử dụng pháp luật: dùng quyền mà pháp luật cho phép (quyền khiếu nại, kinh doanh).',
        'Áp dụng pháp luật: cơ quan nhà nước ra quyết định cá biệt (toà tuyên án, cảnh sát xử phạt).',
      ] },
      { h: 'Vi phạm pháp luật' },
      { p: 'Vi phạm pháp luật là hành vi trái pháp luật, có lỗi, do người có năng lực trách nhiệm pháp lý thực hiện, xâm hại các quan hệ xã hội được pháp luật bảo vệ. Suy nghĩ trong đầu chưa thể hiện thành hành vi thì không phải vi phạm.' },
      { h: 'Trách nhiệm pháp lý' },
      { p: 'Người vi phạm phải chịu trách nhiệm pháp lý, gồm bốn loại: hình sự, hành chính, dân sự và kỷ luật — tuỳ loại quan hệ bị vi phạm và mức độ.' },
      { h: 'Tuổi chịu trách nhiệm hình sự' },
      { p: 'Người từ đủ 16 tuổi trở lên chịu trách nhiệm hình sự về mọi tội phạm. Người từ đủ 14 đến dưới 16 tuổi chỉ chịu trách nhiệm về một số tội rất nghiêm trọng, đặc biệt nghiêm trọng.' },
      { note: 'Học sinh vi phạm pháp luật vẫn bị xử lý, nhưng với người chưa thành niên, pháp luật ưu tiên giáo dục, cải tạo hơn là trừng phạt.' },
    ],
    examples: [
      { q: 'Một người dùng quyền khiếu nại để phản đối quyết định xử phạt mà họ cho là sai. Đây là hình thức thực hiện pháp luật nào?', a: 'Đây là "sử dụng pháp luật" — người đó dùng quyền khiếu nại mà pháp luật cho phép để bảo vệ lợi ích hợp pháp. Sử dụng pháp luật là chủ động vận dụng quyền của mình, khác với tuân thủ (không làm điều cấm) hay thi hành (làm điều bắt buộc).' },
      { q: 'Bạn A 15 tuổi trộm một chiếc xe đạp. Bạn có bị truy cứu trách nhiệm hình sự không?', a: 'Trộm cắp xe đạp thông thường không thuộc nhóm tội rất nghiêm trọng, đặc biệt nghiêm trọng, nên bạn A 15 tuổi chưa bị truy cứu trách nhiệm hình sự về tội này. Tuy nhiên A vẫn phải bồi thường dân sự và có thể bị áp dụng biện pháp giáo dục. Từ đủ 16 tuổi mới chịu trách nhiệm hình sự đầy đủ.' },
    ],
  },

  'H10GDCD-w18-quiz': {
    topic: 'Ôn tập học kỳ 1',
    intro: 'Các em đã đi qua phần Kinh tế và bước đầu của phần Pháp luật. Tuần này chúng ta hệ thống lại những kiến thức cốt lõi của học kỳ 1 để chuẩn bị cho bài kiểm tra.',
    objectives: [
      'Hệ thống kiến thức phần Kinh tế đã học.',
      'Ôn lại các nội dung pháp luật mở đầu.',
      'Vận dụng kiến thức vào tình huống tổng hợp.',
    ],
    theory: [
      { h: 'Phần Kinh tế cần nhớ' },
      { ul: [
        'Ba chủ thể nền kinh tế: Nhà nước, doanh nghiệp, hộ gia đình.',
        'Cơ chế thị trường vận hành theo cung - cầu - giá cả; có ưu điểm và khuyết tật.',
        'Ngân sách nhà nước: thu chủ yếu từ thuế, do Quốc hội quyết định.',
        'Thuế VAT là thuế gián thu (10% thông thường); thuế TNCN là thuế trực thu, luỹ tiến.',
        'Lạm phát: mức giá chung tăng kéo dài, do Ngân hàng Nhà nước kiểm soát.',
      ] },
      { h: 'Phần Pháp luật cần nhớ' },
      { ul: [
        'Hệ thống chính trị: Đảng, Nhà nước, Mặt trận Tổ quốc và các đoàn thể.',
        'Bộ máy Nhà nước: Quốc hội (lập pháp), Chính phủ (hành pháp), Toà án (tư pháp).',
        'Hiến pháp là văn bản pháp lý cao nhất.',
        'Bốn hình thức thực hiện pháp luật; từ đủ 16 tuổi chịu trách nhiệm hình sự đầy đủ.',
      ] },
      { h: 'Sợi dây nối hai phần' },
      { p: 'Phần Kinh tế và phần Pháp luật không tách rời: mọi hoạt động kinh tế đều diễn ra trong khuôn khổ pháp luật. Doanh nghiệp kinh doanh phải đúng luật, nộp thuế theo luật, ký hợp đồng theo Bộ luật Dân sự. Hiểu cả hai phần giúp các em nhìn nền kinh tế và pháp luật như một thể thống nhất.' },
      { note: 'Khi ôn tập, các em hãy gắn mỗi khái niệm với một ví dụ thực tế — học để dùng được chứ không học thuộc lòng.' },
    ],
    examples: [
      { q: 'Tình huống tổng hợp: Một doanh nghiệp may xuất khẩu áo, nộp thuế thu nhập doanh nghiệp, trả lương công nhân. Hãy chỉ ra các kiến thức kinh tế liên quan.', a: 'Doanh nghiệp là một trong ba chủ thể kinh tế (chủ thể sản xuất). Áo xuất khẩu được áp VAT 0% để khuyến khích xuất khẩu. Doanh nghiệp nộp thuế góp vào ngân sách nhà nước. Trả lương công nhân là khâu phân phối. Tình huống này gói gọn nhiều kiến thức phần Kinh tế.' },
      { q: 'Vì sao nói Hiến pháp đứng trên cả luật do Quốc hội ban hành, dù cùng do Quốc hội thông qua?', a: 'Vì Hiến pháp là luật cơ bản, quy định những vấn đề nền tảng nhất của quốc gia và có hiệu lực pháp lý cao nhất. Mọi luật, văn bản khác — kể cả luật do Quốc hội ban hành — đều phải phù hợp với Hiến pháp, nếu trái thì vô hiệu. Việc sửa Hiến pháp cũng cần thủ tục đặc biệt chặt chẽ hơn sửa luật.' },
    ],
  },

  // ──────────────── HỌC KỲ 2 ────────────────
  'H10GDCD-w19-quiz': {
    topic: 'Hiến pháp - Khái quát',
    intro: 'Học kỳ 2 mở đầu bằng một văn bản đặc biệt nhất của quốc gia: Hiến pháp. Đây là "luật của các luật". Bài này giúp các em hiểu Hiến pháp là gì và lịch sử lập hiến của Việt Nam.',
    objectives: [
      'Nêu khái niệm và vị trí của Hiến pháp.',
      'Biết các bản Hiến pháp trong lịch sử Việt Nam.',
      'Hiểu thẩm quyền và thủ tục sửa đổi Hiến pháp.',
    ],
    theory: [
      { h: 'Hiến pháp là gì?' },
      { p: 'Hiến pháp là luật cơ bản của Nhà nước, có hiệu lực pháp lý cao nhất, quy định những vấn đề nền tảng nhất: chế độ chính trị, quyền con người, quyền và nghĩa vụ công dân, tổ chức bộ máy nhà nước.' },
      { h: 'Các bản Hiến pháp Việt Nam' },
      { p: 'Việt Nam đã có 5 bản Hiến pháp: 1946 (bản đầu tiên), 1959, 1980, 1992 (sửa đổi năm 2001) và 2013 — bản hiện hành.' },
      { h: 'Hiến pháp 2013' },
      { p: 'Hiến pháp 2013 được Quốc hội thông qua ngày 28/11/2013, có hiệu lực từ ngày 1/1/2014. Gồm 11 chương và 120 điều, đề cao quyền con người, quyền công dân.' },
      { h: 'Sửa đổi Hiến pháp' },
      { p: 'Chỉ Quốc hội mới có quyền lập hiến và sửa đổi Hiến pháp. Việc thông qua hoặc sửa đổi Hiến pháp phải được ít nhất hai phần ba tổng số đại biểu Quốc hội biểu quyết tán thành — chặt chẽ hơn nhiều so với thông qua luật thường.' },
      { note: 'Thủ tục sửa Hiến pháp khắt khe hơn sửa luật, vì Hiến pháp liên quan đến những giá trị nền tảng, ổn định lâu dài của đất nước.' },
    ],
    examples: [
      { q: 'Vì sao việc sửa đổi Hiến pháp lại cần thủ tục chặt chẽ hơn việc sửa một luật thông thường?', a: 'Vì Hiến pháp là luật cơ bản, quy định những vấn đề nền tảng và ổn định nhất của quốc gia. Nếu sửa quá dễ dàng sẽ gây xáo trộn cả hệ thống pháp luật và đời sống. Vì vậy phải có ít nhất hai phần ba tổng số đại biểu Quốc hội tán thành mới được sửa, bảo đảm sự đồng thuận cao và tính ổn định.' },
      { q: 'Một bạn nói Hiến pháp 2013 là bản Hiến pháp đầu tiên của Việt Nam. Em sửa lại thế nào?', a: 'Bạn nói sai. Hiến pháp đầu tiên của Việt Nam là Hiến pháp năm 1946. Việt Nam đã có 5 bản Hiến pháp: 1946, 1959, 1980, 1992 và 2013. Hiến pháp 2013 là bản hiện hành, không phải bản đầu tiên.' },
    ],
  },

  'H10GDCD-w20-quiz': {
    topic: 'Hiến pháp 2013 - Chế độ chính trị',
    intro: 'Hiến pháp 2013 mở đầu bằng chương về chế độ chính trị — nền tảng của cả Nhà nước. Bài này giúp các em hiểu những nguyên tắc cốt lõi nhất được ghi trong Hiến pháp.',
    objectives: [
      'Nêu bản chất Nhà nước theo Hiến pháp 2013.',
      'Hiểu nguyên tắc tổ chức quyền lực nhà nước.',
      'Biết vai trò của Đảng và Mặt trận Tổ quốc trong Hiến pháp.',
    ],
    theory: [
      { h: 'Bản chất Nhà nước' },
      { p: 'Điều 2 Hiến pháp 2013 khẳng định: Nhà nước Cộng hoà xã hội chủ nghĩa Việt Nam là Nhà nước pháp quyền xã hội chủ nghĩa của Nhân dân, do Nhân dân, vì Nhân dân. Tất cả quyền lực nhà nước thuộc về Nhân dân.' },
      { h: 'Tổ chức quyền lực' },
      { p: 'Quyền lực nhà nước là thống nhất, có sự phân công, phối hợp và kiểm soát giữa các cơ quan trong việc thực hiện ba quyền lập pháp, hành pháp, tư pháp.' },
      { h: 'Vai trò của Đảng và Mặt trận' },
      { ul: [
        'Điều 4: Đảng Cộng sản Việt Nam là lực lượng lãnh đạo Nhà nước và xã hội, hoạt động trong khuôn khổ Hiến pháp và pháp luật.',
        'Điều 9: Mặt trận Tổ quốc Việt Nam là cơ sở chính trị của chính quyền nhân dân, đại diện và bảo vệ quyền, lợi ích hợp pháp của Nhân dân.',
      ] },
      { h: 'Quốc kỳ, quốc huy' },
      { p: 'Hiến pháp quy định Quốc kỳ nước ta nền đỏ, ở giữa có ngôi sao vàng năm cánh; cùng các biểu tượng quốc gia khác (Quốc huy, Quốc ca, Thủ đô Hà Nội).' },
      { note: 'Cụm từ "của Nhân dân, do Nhân dân, vì Nhân dân" là chìa khoá để hiểu bản chất dân chủ của Nhà nước ta.' },
    ],
    examples: [
      { q: 'Theo Hiến pháp 2013, "tất cả quyền lực nhà nước thuộc về Nhân dân" được hiểu thế nào?', a: 'Nghĩa là Nhân dân là chủ thể tối cao của quyền lực. Nhân dân uỷ quyền cho Nhà nước thông qua bầu cử (bầu Quốc hội, Hội đồng nhân dân), và các cơ quan này thay mặt Nhân dân thực hiện quyền lực. Nhà nước phải phục vụ và chịu sự giám sát của Nhân dân. Đây là biểu hiện của nền dân chủ xã hội chủ nghĩa.' },
      { q: 'Có ý kiến cho rằng Đảng đứng trên pháp luật. Dựa vào Hiến pháp, em phản biện ra sao?', a: 'Ý kiến đó sai. Điều 4 Hiến pháp 2013 ghi rõ Đảng Cộng sản Việt Nam lãnh đạo Nhà nước và xã hội nhưng "hoạt động trong khuôn khổ Hiến pháp và pháp luật". Như vậy mọi tổ chức đảng và đảng viên đều phải tuân thủ pháp luật, không ai đứng trên pháp luật.' },
    ],
  },

  'H10GDCD-w21-quiz': {
    topic: 'Quyền và nghĩa vụ cơ bản của công dân',
    intro: 'Là công dân Việt Nam, các em có những quyền được Hiến pháp bảo vệ, đồng thời cũng có nghĩa vụ với đất nước. Bài này giúp các em hiểu rõ "quyền đi đôi với nghĩa vụ".',
    objectives: [
      'Nêu các quyền cơ bản của công dân theo Hiến pháp.',
      'Nêu các nghĩa vụ cơ bản của công dân.',
      'Hiểu mối quan hệ giữa quyền và nghĩa vụ.',
    ],
    theory: [
      { h: 'Quyền cơ bản của công dân' },
      { ul: [
        'Quyền chính trị: bầu cử (từ đủ 18 tuổi), ứng cử (từ đủ 21 tuổi), tham gia quản lý nhà nước.',
        'Quyền tự do: ngôn luận, báo chí, tín ngưỡng, đi lại, cư trú (trong khuôn khổ pháp luật).',
        'Quyền kinh tế - xã hội: lao động, học tập, được bảo vệ sức khoẻ, sở hữu tài sản hợp pháp.',
      ] },
      { h: 'Nghĩa vụ cơ bản của công dân' },
      { ul: [
        'Trung thành với Tổ quốc, bảo vệ Tổ quốc, thực hiện nghĩa vụ quân sự.',
        'Tuân theo Hiến pháp và pháp luật.',
        'Nộp thuế theo quy định của pháp luật.',
        'Học tập (vừa là quyền vừa là nghĩa vụ).',
      ] },
      { h: 'Quyền gắn với nghĩa vụ' },
      { p: 'Quyền và nghĩa vụ của công dân luôn đi đôi với nhau. Công dân hưởng quyền đồng thời phải thực hiện nghĩa vụ; không thể chỉ đòi quyền mà trốn tránh nghĩa vụ.' },
      { note: 'Nghĩa vụ quân sự với nam công dân: từ đủ 18 đến hết 25 tuổi (có thể đến hết 27 tuổi với người được đào tạo cao đẳng, đại học).' },
    ],
    examples: [
      { q: 'Bạn Nam 18 tuổi đi bầu cử lần đầu. Nam có thể tự ứng cử vào Quốc hội không?', a: 'Nam đủ 18 tuổi nên có quyền bầu cử, nhưng chưa được tự ứng cử vì quyền ứng cử yêu cầu từ đủ 21 tuổi trở lên. Đây là điểm phân biệt: 18 tuổi được bầu cử, 21 tuổi mới đủ điều kiện ứng cử đại biểu Quốc hội, Hội đồng nhân dân.' },
      { q: 'Một bạn nói: "Tôi có quyền tự do, nên tôi muốn làm gì thì làm". Em nhận xét thế nào?', a: 'Bạn đó hiểu sai về quyền tự do. Quyền tự do của công dân phải thực hiện trong khuôn khổ pháp luật, không được xâm hại lợi ích Nhà nước, quyền và lợi ích hợp pháp của người khác. Hơn nữa, quyền luôn đi đôi với nghĩa vụ — không thể chỉ đòi quyền mà bỏ qua trách nhiệm với cộng đồng.' },
    ],
  },

  'H10GDCD-w22-quiz': {
    topic: 'Quyền tự do dân chủ của công dân',
    intro: 'Quyền tự do tín ngưỡng, quyền bất khả xâm phạm thân thể, quyền bí mật thư tín... đó là những quyền tự do dân chủ quý giá. Bài này giúp các em hiểu để biết tự bảo vệ mình và tôn trọng người khác.',
    objectives: [
      'Nêu các quyền tự do dân chủ cơ bản.',
      'Hiểu giới hạn của các quyền tự do.',
      'Biết quyền khiếu nại, tố cáo và tham gia quản lý nhà nước.',
    ],
    theory: [
      { h: 'Các quyền tự do cá nhân' },
      { ul: [
        'Quyền tự do tín ngưỡng, tôn giáo: tin hoặc không tin theo tôn giáo nào, không ai bị phân biệt vì lý do tôn giáo.',
        'Quyền tự do đi lại, cư trú: được đi lại và chọn nơi sinh sống trong nước, ra nước ngoài theo quy định pháp luật.',
        'Quyền bất khả xâm phạm về thân thể: không ai bị bắt nếu không có quyết định của Toà án hoặc phê chuẩn của Viện kiểm sát, trừ phạm tội quả tang.',
        'Quyền bí mật thư tín, điện thoại, điện tín: được pháp luật bảo vệ, không ai được tự ý xâm phạm.',
      ] },
      { h: 'Quyền khiếu nại, tố cáo' },
      { p: 'Công dân có quyền khiếu nại với quyết định hành chính trái pháp luật xâm phạm lợi ích của mình, và quyền tố cáo hành vi vi phạm pháp luật của bất kỳ ai, bất kỳ cơ quan nào.' },
      { h: 'Quyền tham gia quản lý nhà nước' },
      { p: 'Công dân tham gia quản lý nhà nước và xã hội qua bầu cử, ứng cử, đóng góp ý kiến, giám sát hoạt động của cơ quan nhà nước, kiến nghị.' },
      { note: 'Mọi quyền tự do đều có giới hạn: tự do của người này không được xâm phạm tự do và lợi ích hợp pháp của người khác.' },
    ],
    examples: [
      { q: 'Một người lén đọc tin nhắn điện thoại của bạn rồi đăng lên mạng. Hành vi này vi phạm quyền gì?', a: 'Vi phạm quyền bí mật thư tín, điện thoại, điện tín — một quyền tự do dân chủ được Hiến pháp và pháp luật bảo vệ. Người đó còn có thể vi phạm quyền về bí mật đời tư. Tuỳ mức độ, hành vi này bị xử phạt hành chính, thậm chí truy cứu trách nhiệm hình sự.' },
      { q: 'Bạn Lan phát hiện cán bộ xã nhận tiền để cấp giấy tờ sai quy định. Lan nên dùng quyền gì?', a: 'Lan nên dùng quyền tố cáo — báo cho cơ quan có thẩm quyền về hành vi vi phạm pháp luật của cán bộ đó. Khác với khiếu nại (bảo vệ lợi ích của chính mình), tố cáo là phản ánh hành vi sai trái của người khác. Người tố cáo trung thực được pháp luật bảo vệ.' },
    ],
  },

  'H10GDCD-w23-quiz': {
    topic: 'Quyền và nghĩa vụ kinh tế của công dân',
    intro: 'Hiến pháp không chỉ bảo vệ quyền chính trị mà còn bảo vệ quyền kinh tế: quyền sở hữu, quyền tự do kinh doanh. Bài này nối phần Kinh tế với phần Pháp luật mà các em đã học.',
    objectives: [
      'Nêu quyền sở hữu và quyền tự do kinh doanh.',
      'Hiểu quyền tự do giao kết hợp đồng.',
      'Biết nghĩa vụ kinh tế của công dân.',
    ],
    theory: [
      { h: 'Quyền sở hữu hợp pháp' },
      { p: 'Công dân có quyền sở hữu về thu nhập hợp pháp, của cải để dành, nhà ở, tư liệu sản xuất... Quyền sở hữu hợp pháp được Nhà nước bảo hộ, không ai được tịch thu trái pháp luật.' },
      { h: 'Quyền tự do kinh doanh' },
      { p: 'Công dân có quyền tự do kinh doanh trong những ngành nghề mà pháp luật không cấm. Đây là quyền hiến định, tạo động lực cho nền kinh tế thị trường.' },
      { h: 'Quyền tự do hợp đồng' },
      { p: 'Các bên có quyền tự nguyện giao kết hợp đồng, tự thoả thuận nội dung, miễn không trái pháp luật và đạo đức xã hội. Không bên nào được ép buộc hay lừa dối bên kia.' },
      { h: 'Nghĩa vụ kinh tế' },
      { ul: [
        'Nộp thuế đầy đủ, kịp thời theo quy định.',
        'Kinh doanh trung thực, không gian lận, không cạnh tranh không lành mạnh.',
        'Tôn trọng quyền sở hữu hợp pháp của người khác.',
      ] },
      { note: 'Khi xảy ra tranh chấp kinh tế, công dân có quyền thương lượng, hoà giải hoặc khởi kiện ra Toà án để bảo vệ quyền lợi.' },
    ],
    examples: [
      { q: 'Bạn của em muốn mở tiệm bán đồ ăn vặt nhưng lo "phải xin phép Chính phủ". Em giải thích thế nào?', a: 'Công dân có quyền tự do kinh doanh trong ngành nghề pháp luật không cấm, không phải xin phép Chính phủ. Bán đồ ăn vặt chỉ cần đăng ký kinh doanh tại cơ quan địa phương và bảo đảm an toàn thực phẩm. Đây là quyền hiến định, thể hiện tự do kinh tế của công dân.' },
      { q: 'Hai bên ký hợp đồng nhưng một bên bị ép buộc, lừa dối. Hợp đồng có hiệu lực không?', a: 'Hợp đồng đó có thể bị tuyên vô hiệu vì vi phạm nguyên tắc tự nguyện. Quyền tự do hợp đồng đòi hỏi các bên giao kết một cách tự nguyện, không bị ép buộc hay lừa dối. Bên bị thiệt hại có quyền yêu cầu Toà án tuyên hợp đồng vô hiệu và bồi thường.' },
    ],
  },

  'H10GDCD-w24-quiz': {
    topic: 'Bộ luật Dân sự',
    intro: 'Mua bán, thuê nhà, vay mượn, thừa kế... đều thuộc lĩnh vực dân sự. Bộ luật Dân sự điều chỉnh những quan hệ rất gần gũi với đời sống các em. Bài này giúp các em nắm những điều cơ bản nhất.',
    objectives: [
      'Nêu phạm vi điều chỉnh của Bộ luật Dân sự.',
      'Hiểu khái niệm quyền nhân thân, hợp đồng dân sự, thừa kế.',
      'Biết năng lực giao dịch của người chưa thành niên.',
    ],
    theory: [
      { h: 'Bộ luật Dân sự điều chỉnh gì?' },
      { p: 'Bộ luật Dân sự điều chỉnh các quan hệ tài sản (mua bán, vay mượn, thuê, thừa kế) và quan hệ nhân thân (tên gọi, danh dự, hình ảnh) giữa các cá nhân, pháp nhân trên nguyên tắc bình đẳng, tự nguyện.' },
      { h: 'Hợp đồng dân sự' },
      { p: 'Hợp đồng dân sự là sự thoả thuận giữa các bên về việc xác lập, thay đổi hoặc chấm dứt quyền, nghĩa vụ. Hợp đồng phải tự nguyện, không trái pháp luật và đạo đức xã hội.' },
      { h: 'Quyền nhân thân' },
      { p: 'Quyền nhân thân (họ tên, danh dự, nhân phẩm, hình ảnh, đời tư) gắn liền với mỗi cá nhân, không thể chuyển giao cho người khác (trừ trường hợp luật quy định).' },
      { h: 'Thừa kế' },
      { p: 'Có hai hình thức: thừa kế theo di chúc (theo ý nguyện người để lại) và thừa kế theo pháp luật (khi không có di chúc hoặc di chúc không hợp pháp, chia theo hàng thừa kế).' },
      { note: 'Người chưa đủ 18 tuổi khi thực hiện giao dịch dân sự lớn cần có người đại diện hợp pháp (cha mẹ, người giám hộ).' },
    ],
    examples: [
      { q: 'Một người tự ý dùng ảnh của bạn em để quảng cáo bán hàng mà không xin phép. Đây là vi phạm gì?', a: 'Đây là vi phạm quyền nhân thân — cụ thể là quyền của cá nhân đối với hình ảnh của mình, được Bộ luật Dân sự bảo vệ. Việc sử dụng hình ảnh người khác phải được người đó đồng ý. Bạn em có quyền yêu cầu gỡ bỏ, xin lỗi và bồi thường thiệt hại nếu có.' },
      { q: 'Ông A mất, không để lại di chúc. Tài sản của ông được chia theo cách nào?', a: 'Vì không có di chúc nên áp dụng thừa kế theo pháp luật. Tài sản được chia cho những người thừa kế theo hàng thừa kế — hàng thứ nhất gồm vợ/chồng, cha mẹ, con của ông A. Những người cùng hàng được hưởng phần bằng nhau. Đây là cách Bộ luật Dân sự bảo đảm công bằng khi không có di chúc.' },
    ],
  },

  'H10GDCD-w25-quiz': {
    topic: 'Luật Hình sự',
    intro: 'Luật Hình sự là ngành luật xử lý những hành vi nguy hiểm nhất cho xã hội — tội phạm. Hiểu luật này giúp các em biết ranh giới không được vượt qua và quyền của người bị buộc tội.',
    objectives: [
      'Nêu khái niệm tội phạm.',
      'Biết các loại hình phạt chính.',
      'Hiểu quyền của người bị buộc tội và nguyên tắc xét xử.',
    ],
    theory: [
      { h: 'Bộ luật Hình sự hiện hành' },
      { p: 'Bộ luật Hình sự năm 2015 (sửa đổi, bổ sung năm 2017) đang có hiệu lực, là cơ sở pháp lý để xác định tội phạm và hình phạt.' },
      { h: 'Tội phạm là gì?' },
      { p: 'Tội phạm là hành vi nguy hiểm cho xã hội, có lỗi, do người có năng lực trách nhiệm hình sự thực hiện, được quy định trong Bộ luật Hình sự và phải chịu hình phạt.' },
      { h: 'Các hình phạt chính' },
      { p: 'Bộ luật Hình sự quy định bảy hình phạt chính: cảnh cáo, phạt tiền, cải tạo không giam giữ, trục xuất, tù có thời hạn, tù chung thân và tử hình. Mỗi tội chỉ áp một hình phạt chính, có thể kèm hình phạt bổ sung.' },
      { h: 'Quyền của người bị buộc tội' },
      { p: 'Người bị buộc tội được coi là không có tội cho đến khi có bản án kết tội có hiệu lực (nguyên tắc suy đoán vô tội). Họ có quyền bào chữa, nhờ luật sư, không bị tra tấn, nhục hình.' },
      { note: 'Toà án xét xử công khai, trừ một số vụ liên quan đến bí mật nhà nước hoặc đời tư cần giữ kín.' },
    ],
    examples: [
      { q: 'Vì sao nguyên tắc "suy đoán vô tội" lại quan trọng trong tố tụng hình sự?', a: 'Vì nó bảo vệ con người khỏi bị kết tội oan. Theo nguyên tắc này, một người chỉ bị coi là có tội khi có bản án kết tội của Toà án đã có hiệu lực pháp luật. Trước đó, dù bị bắt, tạm giam, họ vẫn được coi là vô tội và có quyền bào chữa. Đây là biểu hiện của nhà nước pháp quyền, tôn trọng quyền con người.' },
      { q: 'Một người bị bắt nhưng bị ép cung, đánh đập để nhận tội. Điều này có hợp pháp không?', a: 'Hoàn toàn không hợp pháp. Pháp luật nghiêm cấm tra tấn, bức cung, dùng nhục hình. Người bị buộc tội có quyền không bị xâm phạm thân thể và có quyền bào chữa, nhờ luật sư. Lời nhận tội do ép cung không có giá trị chứng cứ. Người vi phạm sẽ bị xử lý theo pháp luật.' },
    ],
  },

  'H10GDCD-w26-quiz': {
    topic: 'Luật Hành chính',
    intro: 'Vi phạm giao thông, xả rác bừa bãi, kinh doanh không phép... thường bị xử phạt hành chính chứ chưa đến mức hình sự. Bài này giúp các em hiểu loại vi phạm phổ biến nhất trong đời sống hằng ngày.',
    objectives: [
      'Phân biệt vi phạm hành chính với tội phạm.',
      'Nêu các hình thức xử phạt vi phạm hành chính.',
      'Biết cơ quan có thẩm quyền xử phạt.',
    ],
    theory: [
      { h: 'Vi phạm hành chính là gì?' },
      { p: 'Vi phạm hành chính là hành vi có lỗi, trái pháp luật nhưng mức độ chưa đến mức truy cứu trách nhiệm hình sự, theo quy định phải bị xử phạt hành chính.' },
      { h: 'Phân biệt với tội phạm' },
      { p: 'Điểm khác biệt cốt lõi là mức độ nguy hiểm: tội phạm nguy hiểm cao, bị xử lý hình sự; còn vi phạm hành chính ít nguy hiểm hơn, chỉ bị xử phạt hành chính. Ví dụ vượt đèn đỏ là vi phạm hành chính; gây tai nạn chết người do lái xe ẩu có thể thành tội phạm.' },
      { h: 'Hình thức xử phạt' },
      { ul: [
        'Hai hình thức chính: cảnh cáo và phạt tiền.',
        'Hình thức bổ sung: tước giấy phép, tịch thu tang vật, trục xuất...',
      ] },
      { h: 'Thẩm quyền xử phạt' },
      { p: 'Công an, Uỷ ban nhân dân các cấp và các cơ quan chuyên ngành (thuế, quản lý thị trường, môi trường...) có thẩm quyền xử phạt vi phạm hành chính theo lĩnh vực.' },
      { note: 'Người chưa đủ 14 tuổi không bị xử phạt vi phạm hành chính, mà có thể được áp dụng biện pháp giáo dục thay thế.' },
    ],
    examples: [
      { q: 'Anh B vượt đèn đỏ và bị cảnh sát giao thông phạt tiền, tước giấy phép lái xe. Đây là trách nhiệm pháp lý gì?', a: 'Đây là trách nhiệm hành chính. Vượt đèn đỏ là vi phạm hành chính (chưa đến mức tội phạm). Phạt tiền là hình thức xử phạt chính, tước giấy phép lái xe là hình thức bổ sung. Cảnh sát giao thông là cơ quan có thẩm quyền xử phạt trong lĩnh vực giao thông.' },
      { q: 'Khi nào hành vi lái xe gây tai nạn chuyển từ vi phạm hành chính sang tội phạm hình sự?', a: 'Khi hành vi đủ mức nguy hiểm theo Bộ luật Hình sự — chẳng hạn gây tai nạn làm chết người, gây thương tích nặng hoặc thiệt hại lớn về tài sản. Lúc đó không còn là vi phạm hành chính mà trở thành tội phạm, bị truy cứu trách nhiệm hình sự. Ranh giới chính là mức độ nguy hiểm và hậu quả của hành vi.' },
    ],
  },

  'H10GDCD-w27-quiz': {
    topic: 'Luật Lao động',
    intro: 'Sau này đi làm, các em sẽ là người lao động và cần biết quyền lợi của mình: lương, giờ làm, bảo hiểm, hợp đồng. Bài này trang bị kiến thức để các em tự bảo vệ mình nơi làm việc.',
    objectives: [
      'Biết độ tuổi và điều kiện giao kết hợp đồng lao động.',
      'Nêu các quyền của người lao động.',
      'Hiểu vai trò của công đoàn và lương tối thiểu vùng.',
    ],
    theory: [
      { h: 'Bộ luật Lao động hiện hành' },
      { p: 'Bộ luật Lao động năm 2019 có hiệu lực từ ngày 1/1/2021, điều chỉnh quan hệ giữa người lao động và người sử dụng lao động.' },
      { h: 'Tuổi lao động' },
      { p: 'Người từ đủ 15 tuổi trở lên được giao kết hợp đồng lao động. Người từ đủ 13 đến dưới 15 tuổi chỉ được làm một số công việc nhẹ và phải có sự đồng ý của người đại diện hợp pháp.' },
      { h: 'Quyền của người lao động' },
      { ul: [
        'Được trả lương không thấp hơn mức lương tối thiểu vùng do Chính phủ quy định.',
        'Được tham gia bảo hiểm xã hội, bảo hiểm y tế.',
        'Được bảo đảm an toàn, vệ sinh lao động.',
        'Được nghỉ ngơi, nghỉ lễ, nghỉ phép theo quy định.',
      ] },
      { h: 'Thời giờ làm việc và công đoàn' },
      { p: 'Thời giờ làm việc bình thường không quá 8 giờ/ngày và 48 giờ/tuần. Công đoàn cơ sở đại diện, bảo vệ quyền và lợi ích hợp pháp của người lao động.' },
      { note: 'Hợp đồng lao động nên được lập thành văn bản để bảo vệ quyền lợi rõ ràng; tránh chỉ thoả thuận miệng.' },
    ],
    examples: [
      { q: 'Bạn Hùng 16 tuổi muốn làm thêm phục vụ quán ăn buổi tối. Pháp luật cho phép không?', a: 'Hùng đủ 15 tuổi nên được giao kết hợp đồng lao động, có thể làm phục vụ quán ăn. Tuy nhiên với người chưa thành niên, pháp luật giới hạn thời giờ làm việc và cấm các công việc nặng nhọc, độc hại, làm vào ban đêm quá khuya. Chủ quán phải tuân thủ các quy định bảo vệ lao động chưa thành niên.' },
      { q: 'Một công ty trả lương thấp hơn lương tối thiểu vùng. Người lao động nên làm gì?', a: 'Trả lương thấp hơn mức tối thiểu vùng là vi phạm Bộ luật Lao động. Người lao động có thể phản ánh với công đoàn cơ sở, khiếu nại tới thanh tra lao động hoặc khởi kiện ra Toà án để đòi quyền lợi. Công ty vi phạm sẽ bị xử phạt và buộc trả đủ lương theo quy định.' },
    ],
  },

  'H10GDCD-w28-quiz': {
    topic: 'Luật Hôn nhân và Gia đình',
    intro: 'Hôn nhân và gia đình là tế bào của xã hội. Dù còn là học sinh, các em cũng nên hiểu những quy định cơ bản: tuổi kết hôn, nguyên tắc hôn nhân, quan hệ tài sản, trách nhiệm cha mẹ - con cái.',
    objectives: [
      'Biết độ tuổi và nguyên tắc kết hôn ở Việt Nam.',
      'Hiểu quan hệ tài sản trong gia đình.',
      'Nêu nghĩa vụ của cha mẹ với con cái.',
    ],
    theory: [
      { h: 'Luật Hôn nhân và Gia đình hiện hành' },
      { p: 'Luật Hôn nhân và Gia đình năm 2014 có hiệu lực từ ngày 1/1/2015, điều chỉnh quan hệ hôn nhân và gia đình.' },
      { h: 'Tuổi kết hôn và nguyên tắc' },
      { p: 'Nam từ đủ 20 tuổi, nữ từ đủ 18 tuổi mới được kết hôn. Hôn nhân dựa trên nguyên tắc tự nguyện, tiến bộ, một vợ một chồng, vợ chồng bình đẳng — cấm tảo hôn, cưỡng ép kết hôn, đa thê.' },
      { h: 'Quan hệ tài sản' },
      { p: 'Pháp luật công nhận cả tài sản chung của vợ chồng và tài sản riêng của mỗi người. Khi ly hôn, tài sản chung được chia theo nguyên tắc bình đẳng, có xét đến công sức đóng góp và hoàn cảnh của mỗi bên.' },
      { h: 'Nghĩa vụ cha mẹ - con cái' },
      { p: 'Cha mẹ có nghĩa vụ thương yêu, nuôi dưỡng, chăm sóc, giáo dục con đến tuổi trưởng thành, không phân biệt con trai con gái. Con cái có bổn phận kính trọng, chăm sóc cha mẹ.' },
      { note: 'Tảo hôn (kết hôn dưới tuổi luật định) là hành vi vi phạm pháp luật, ảnh hưởng xấu tới sức khoẻ và tương lai, đặc biệt với trẻ em gái.' },
    ],
    examples: [
      { q: 'Một gia đình ép con gái 16 tuổi lấy chồng. Việc này có vi phạm pháp luật không?', a: 'Có. Đây vừa là tảo hôn (nữ chưa đủ 18 tuổi), vừa là cưỡng ép kết hôn — cả hai đều bị Luật Hôn nhân và Gia đình nghiêm cấm. Hôn nhân phải tự nguyện và đúng độ tuổi. Người tổ chức tảo hôn, cưỡng ép kết hôn có thể bị xử phạt hành chính hoặc truy cứu trách nhiệm hình sự.' },
      { q: 'Khi ly hôn, người chồng đòi lấy hết tài sản vì "anh ta đi làm còn vợ ở nhà". Đúng hay sai?', a: 'Sai. Tài sản chung được chia theo nguyên tắc bình đẳng, có xét công sức đóng góp. Công việc nội trợ, chăm sóc gia đình của người vợ cũng được tính là đóng góp ngang với lao động tạo thu nhập. Vì vậy người vợ vẫn được chia phần tài sản chung hợp lý, không thể bị lấy hết.' },
    ],
  },

  'H10GDCD-w29-quiz': {
    topic: 'Quyền sở hữu trí tuệ',
    intro: 'Một bài hát, một phần mềm, một sáng chế đều là thành quả trí tuệ và cần được bảo vệ. Trong thời đại số, hiểu về sở hữu trí tuệ giúp các em tôn trọng công sức người khác và bảo vệ sáng tạo của chính mình.',
    objectives: [
      'Nêu các đối tượng của quyền sở hữu trí tuệ.',
      'Hiểu quyền tác giả và điều kiện bảo hộ sáng chế, nhãn hiệu.',
      'Nhận biết hành vi vi phạm bản quyền.',
    ],
    theory: [
      { h: 'Sở hữu trí tuệ gồm những gì?' },
      { ul: [
        'Quyền tác giả và quyền liên quan: tác phẩm văn học, nghệ thuật, khoa học, phần mềm.',
        'Quyền sở hữu công nghiệp: sáng chế, nhãn hiệu, kiểu dáng công nghiệp, chỉ dẫn địa lý.',
        'Quyền đối với giống cây trồng.',
      ] },
      { h: 'Quyền tác giả' },
      { p: 'Quyền tác giả phát sinh kể từ khi tác phẩm được sáng tạo và thể hiện dưới hình thức vật chất nhất định, không bắt buộc phải đăng ký. Tác giả có quyền nhân thân (đứng tên) và quyền tài sản (hưởng lợi).' },
      { h: 'Điều kiện bảo hộ' },
      { ul: [
        'Sáng chế: phải có tính mới, có trình độ sáng tạo và có khả năng áp dụng công nghiệp.',
        'Nhãn hiệu: được bảo hộ khi đăng ký với Cục Sở hữu trí tuệ.',
      ] },
      { h: 'Vi phạm bản quyền' },
      { p: 'Sao chép, sử dụng, phát tán tác phẩm của người khác mà không xin phép, không trả tiền là vi phạm bản quyền và bị xử lý theo pháp luật.' },
      { note: 'Khi tham khảo tài liệu để làm bài, các em hãy trích dẫn rõ nguồn — đó là cách tôn trọng quyền tác giả và rèn tính trung thực.' },
    ],
    examples: [
      { q: 'Bạn An tải nhạc lậu rồi tự ý đăng lên kênh của mình kiếm tiền quảng cáo. An vi phạm điều gì?', a: 'An vi phạm quyền tác giả — sử dụng, phát tán tác phẩm âm nhạc của người khác mà không xin phép và không trả tiền bản quyền, lại còn dùng để thu lợi. Đây là hành vi vi phạm pháp luật sở hữu trí tuệ, có thể bị gỡ nội dung, xử phạt hành chính và bồi thường cho tác giả.' },
      { q: 'Một học sinh phát minh ra một thiết bị tiết kiệm nước mới mẻ. Em ấy nên làm gì để được bảo hộ?', a: 'Nếu thiết bị có tính mới, có sáng tạo và áp dụng được trong sản xuất, em ấy nên nộp đơn đăng ký sáng chế tại Cục Sở hữu trí tuệ. Khi được cấp bằng độc quyền sáng chế, không ai được sản xuất, sử dụng thiết bị đó mà không xin phép. Đây là cách pháp luật bảo vệ và khuyến khích sáng tạo.' },
    ],
  },

  'H10GDCD-w30-quiz': {
    topic: 'Luật An ninh mạng và bảo vệ dữ liệu cá nhân',
    intro: 'Các em sống trong thế giới số: mạng xã hội, game, mua sắm online. Không gian mạng có nhiều cơ hội nhưng cũng đầy rủi ro. Bài này giúp các em ứng xử an toàn và đúng luật trên môi trường mạng.',
    objectives: [
      'Biết các hành vi bị cấm trên không gian mạng.',
      'Hiểu khái niệm dữ liệu cá nhân và cách bảo vệ.',
      'Nhận biết và phòng tránh lừa đảo trực tuyến.',
    ],
    theory: [
      { h: 'Luật An ninh mạng' },
      { p: 'Luật An ninh mạng được Quốc hội thông qua năm 2018, có hiệu lực từ ngày 1/1/2019, nhằm bảo vệ an ninh quốc gia và trật tự an toàn xã hội trên không gian mạng.' },
      { h: 'Hành vi bị cấm' },
      { ul: [
        'Tuyên truyền chống Nhà nước, xuyên tạc lịch sử, phá hoại khối đại đoàn kết dân tộc.',
        'Đăng tin sai sự thật, vu khống, xúc phạm danh dự người khác.',
        'Lừa đảo, đánh cắp thông tin, tấn công mạng.',
        'Xâm phạm bí mật, quyền riêng tư, dữ liệu cá nhân của người khác.',
      ] },
      { h: 'Dữ liệu cá nhân' },
      { p: 'Dữ liệu cá nhân là thông tin gắn với một cá nhân cụ thể, giúp nhận dạng người đó (họ tên, ngày sinh, số căn cước, hình ảnh, dữ liệu sinh trắc học...). Dữ liệu cá nhân được pháp luật bảo vệ.' },
      { h: 'An toàn trên mạng' },
      { p: 'Dùng mật khẩu mạnh (dài, kết hợp chữ hoa, chữ thường, số, ký tự đặc biệt), không chia sẻ mã OTP, không cung cấp thông tin cho người lạ, cảnh giác với tin nhắn, đường link lạ.' },
      { note: 'Khi nhận tin nhắn yêu cầu chuyển tiền, cung cấp OTP hay mật khẩu, hãy dừng lại — đó gần như chắc chắn là lừa đảo. Không cung cấp và báo người lớn, cơ quan chức năng.' },
    ],
    examples: [
      { q: 'Bạn nhận tin nhắn: "Tài khoản của bạn trúng thưởng, gửi mã OTP để nhận quà". Bạn nên làm gì?', a: 'Tuyệt đối không gửi mã OTP. Đây là chiêu lừa đảo điển hình — kẻ gian dùng OTP để chiếm đoạt tài khoản ngân hàng. Mã OTP và mật khẩu là thông tin bí mật, không bao giờ chia sẻ cho ai. Bạn nên xoá tin nhắn, chặn số lạ và có thể báo cho cơ quan công an.' },
      { q: 'Một học sinh đăng tin sai sự thật bôi nhọ bạn cùng lớp lên mạng xã hội. Hành vi này bị xử lý ra sao?', a: 'Đây là hành vi bị cấm theo Luật An ninh mạng (đăng tin sai sự thật, xúc phạm danh dự người khác). Tuỳ mức độ, học sinh đó có thể bị xử phạt hành chính, buộc gỡ bài, xin lỗi, bồi thường; nếu nghiêm trọng có thể bị truy cứu trách nhiệm hình sự về tội vu khống hoặc làm nhục người khác.' },
    ],
  },

  'H10GDCD-w31-quiz': {
    topic: 'Phòng, chống tham nhũng',
    intro: 'Tham nhũng làm thất thoát tài sản chung, làm xói mòn niềm tin của Nhân dân. Phòng, chống tham nhũng là trách nhiệm của cả hệ thống chính trị và mỗi công dân. Bài này giúp các em hiểu và góp phần đấu tranh.',
    objectives: [
      'Nêu khái niệm tham nhũng.',
      'Biết các quy định phòng, chống tham nhũng.',
      'Hiểu vai trò của Nhân dân trong phòng, chống tham nhũng.',
    ],
    theory: [
      { h: 'Tham nhũng là gì?' },
      { p: 'Tham nhũng là hành vi của người có chức vụ, quyền hạn đã lợi dụng chức vụ, quyền hạn đó để vụ lợi cá nhân. Các hành vi điển hình: tham ô tài sản, nhận hối lộ, lạm quyền...' },
      { h: 'Luật Phòng, chống tham nhũng' },
      { p: 'Luật Phòng, chống tham nhũng năm 2018 có hiệu lực từ ngày 1/7/2019. Một biện pháp quan trọng là yêu cầu cán bộ, công chức có chức vụ kê khai tài sản, thu nhập để công khai, minh bạch.' },
      { h: 'Xử lý tham nhũng' },
      { p: 'Hành vi tham nhũng bị xử lý nghiêm: kỷ luật, cách chức, truy cứu trách nhiệm hình sự và buộc thu hồi, bồi hoàn tài sản tham nhũng. Tội nhận hối lộ ở mức nghiêm trọng có thể bị phạt tù chung thân hoặc tử hình.' },
      { h: 'Vai trò của Nhân dân' },
      { p: 'Nhân dân có quyền và trách nhiệm giám sát, phát hiện, tố giác hành vi tham nhũng. Báo chí, Mặt trận Tổ quốc cũng tham gia giám sát, phản biện để phòng, chống tham nhũng.' },
      { note: 'Phòng, chống tham nhũng không phải việc của riêng cơ quan nhà nước — mỗi công dân trung thực, dám lên tiếng đều đang góp phần làm trong sạch xã hội.' },
    ],
    examples: [
      { q: 'Một cán bộ nhận tiền để "ưu tiên" giải quyết hồ sơ nhanh hơn cho người đưa tiền. Đây là hành vi gì?', a: 'Đây là hành vi nhận hối lộ — một dạng tham nhũng. Cán bộ đã lợi dụng chức vụ, quyền hạn để vụ lợi cá nhân, làm sai lệch trật tự công bằng trong giải quyết công việc. Hành vi này bị xử lý nghiêm theo Bộ luật Hình sự, có thể bị cách chức và phạt tù.' },
      { q: 'Vì sao việc kê khai tài sản của cán bộ lại giúp phòng, chống tham nhũng?', a: 'Vì kê khai tài sản tạo sự minh bạch: nếu tài sản của cán bộ tăng bất thường, không giải trình được nguồn gốc hợp pháp thì đó là dấu hiệu để cơ quan chức năng xem xét, điều tra. Việc công khai tài sản giúp giám sát, ngăn ngừa cán bộ làm giàu bất chính từ chức vụ.' },
    ],
  },

  'H10GDCD-w32-quiz': {
    topic: 'Bảo vệ Tổ quốc - Quốc phòng và An ninh',
    intro: 'Bảo vệ Tổ quốc là quyền và nghĩa vụ thiêng liêng của mỗi công dân. Dù chưa đến tuổi nhập ngũ, các em vẫn có thể góp phần bảo vệ đất nước ngay từ bây giờ. Bài này giúp các em hiểu trách nhiệm đó.',
    objectives: [
      'Hiểu bảo vệ Tổ quốc là quyền và nghĩa vụ của công dân.',
      'Biết về nghĩa vụ quân sự và lực lượng vũ trang.',
      'Nêu cách học sinh góp phần bảo vệ Tổ quốc.',
    ],
    theory: [
      { h: 'Bảo vệ Tổ quốc là gì?' },
      { p: 'Theo Hiến pháp, bảo vệ Tổ quốc là quyền và nghĩa vụ thiêng liêng, cao quý của công dân. Đây không chỉ là chống ngoại xâm mà còn là bảo vệ chế độ, độc lập, chủ quyền, toàn vẹn lãnh thổ và an ninh quốc gia.' },
      { h: 'Nghĩa vụ quân sự' },
      { p: 'Nam công dân thực hiện nghĩa vụ quân sự từ đủ 18 đến hết 25 tuổi (có thể đến hết 27 tuổi với người được tạm hoãn để học cao đẳng, đại học). Nữ công dân có thể đăng ký phục vụ trong quân đội theo nhu cầu.' },
      { h: 'Lực lượng vũ trang nhân dân' },
      { p: 'Lực lượng vũ trang nhân dân gồm ba thành phần: Quân đội nhân dân, Công an nhân dân và Dân quân tự vệ.' },
      { h: 'An ninh quốc gia' },
      { p: 'An ninh quốc gia ngày nay đa lĩnh vực: an ninh chính trị, kinh tế, văn hoá - tư tưởng, an ninh mạng, an ninh biên giới, biển đảo. Bảo vệ Tổ quốc phải toàn diện trên mọi mặt trận.' },
      { note: 'Học sinh bảo vệ Tổ quốc bằng cách học tập tốt, rèn luyện sức khoẻ, tuân thủ pháp luật, cảnh giác với thông tin xấu độc và sẵn sàng thực hiện nghĩa vụ quân sự khi đến tuổi.' },
    ],
    examples: [
      { q: 'Một bạn nói "bảo vệ Tổ quốc là việc của quân đội, không liên quan đến học sinh". Em phản biện thế nào?', a: 'Bạn đó hiểu chưa đúng. Hiến pháp ghi bảo vệ Tổ quốc là quyền và nghĩa vụ của mọi công dân, không riêng quân đội. Học sinh góp phần bằng cách học tốt, rèn luyện, tuân thủ pháp luật, không chia sẻ thông tin sai lệch, cảnh giác trước âm mưu chống phá. Bảo vệ Tổ quốc là trách nhiệm chung, mỗi người một việc.' },
      { q: 'An ninh mạng có được coi là một phần của bảo vệ Tổ quốc không?', a: 'Có. An ninh mạng là một lĩnh vực của an ninh quốc gia. Các thế lực xấu có thể tấn công mạng, phát tán thông tin sai lệch để gây bất ổn. Bảo vệ Tổ quốc ngày nay là toàn diện, gồm cả không gian mạng. Vì vậy mỗi người dùng mạng tỉnh táo, đúng luật cũng là góp phần bảo vệ đất nước.' },
    ],
  },

  'H10GDCD-w33-quiz': {
    topic: 'Giáo dục pháp luật và đạo đức công dân',
    intro: 'Pháp luật và đạo đức cùng hướng con người tới điều tốt đẹp. Một công dân tốt vừa tuân thủ pháp luật, vừa có đạo đức. Bài này giúp các em hiểu cách trở thành công dân có trách nhiệm.',
    objectives: [
      'Hiểu vai trò của giáo dục pháp luật.',
      'Nêu các phẩm chất đạo đức cốt lõi của công dân.',
      'Biết cách thể hiện trách nhiệm công dân.',
    ],
    theory: [
      { h: 'Giáo dục pháp luật' },
      { p: 'Giáo dục pháp luật giúp công dân hiểu biết, từ đó tự giác tuân thủ và biết sử dụng pháp luật để bảo vệ quyền, lợi ích hợp pháp của mình. Hiểu luật mới sống và làm việc đúng luật.' },
      { h: 'Đạo đức công dân' },
      { p: 'Đạo đức công dân là hệ thống các giá trị, chuẩn mực ứng xử trong cộng đồng, được duy trì bằng lương tâm và dư luận xã hội. Pháp luật và đạo đức bổ sung cho nhau.' },
      { h: 'Phẩm chất cốt lõi' },
      { ul: [
        'Trung thực, liêm chính: ngay thẳng, không gian dối, không tham lam của công.',
        'Trách nhiệm: làm tròn bổn phận với gia đình, nhà trường, xã hội.',
        'Yêu nước, nhân ái: yêu quê hương, biết giúp đỡ người yếu thế.',
      ] },
      { h: 'Thể hiện trách nhiệm công dân' },
      { p: 'Học sinh thể hiện trách nhiệm qua học tập, tuân thủ pháp luật, tham gia hoạt động đoàn thể, tình nguyện, từ thiện và giúp đỡ cộng đồng.' },
      { note: 'Tham gia hoạt động tình nguyện không chỉ giúp ích cho xã hội mà còn giúp các em phát triển nhân cách, kỹ năng sống và sự đồng cảm.' },
    ],
    examples: [
      { q: 'Bạn nhặt được ví tiền và trả lại người mất. Hành vi này thể hiện điều gì?', a: 'Hành vi này thể hiện phẩm chất trung thực, liêm chính — không tham lam của người khác dù không ai biết. Đó là biểu hiện đạo đức công dân tốt đẹp. Dù pháp luật quy định trả lại tài sản nhặt được, nhưng việc tự giác trả lại còn xuất phát từ lương tâm và đạo đức của mỗi người.' },
      { q: 'Một bạn cho rằng "chỉ cần học giỏi là đủ, hoạt động xã hội chỉ tốn thời gian". Em nghĩ sao?', a: 'Em không đồng tình. Học giỏi là cần thiết nhưng chưa đủ để thành công dân tốt. Trách nhiệm công dân còn thể hiện qua việc tuân thủ pháp luật, tham gia hoạt động cộng đồng, giúp đỡ người khác. Hoạt động xã hội giúp rèn nhân cách, kỹ năng sống và lòng nhân ái — những điều sách vở không dạy hết được.' },
    ],
  },

  'H10GDCD-w34-quiz': {
    topic: 'Hội nhập quốc tế và pháp luật',
    intro: 'Việt Nam đang hội nhập sâu rộng với thế giới: tham gia nhiều tổ chức, ký nhiều hiệp định. Hội nhập đặt ra yêu cầu mới về pháp luật và về chính các em — những công dân toàn cầu tương lai.',
    objectives: [
      'Hiểu mối quan hệ giữa pháp luật quốc gia và quốc tế.',
      'Biết Việt Nam tuân thủ điều ước quốc tế.',
      'Nhận thức yêu cầu với học sinh trong hội nhập.',
    ],
    theory: [
      { h: 'Hội nhập quốc tế là gì?' },
      { p: 'Hội nhập quốc tế là quá trình một quốc gia tham gia ngày càng sâu vào các quan hệ kinh tế, chính trị, văn hoá toàn cầu — qua các tổ chức, hiệp định và điều ước quốc tế.' },
      { h: 'Pháp luật quốc gia và quốc tế' },
      { p: 'Khi tham gia một điều ước quốc tế, Việt Nam có trách nhiệm tuân thủ và nội luật hoá (chuyển thành quy định trong pháp luật trong nước). Pháp luật quốc gia phải phù hợp với các cam kết quốc tế mà nước ta tham gia.' },
      { h: 'Khi có khác biệt' },
      { p: 'Theo Luật Điều ước quốc tế năm 2016, nếu pháp luật trong nước và điều ước quốc tế mà Việt Nam là thành viên có quy định khác nhau về cùng một vấn đề, thì áp dụng quy định của điều ước quốc tế (trừ Hiến pháp).' },
      { h: 'Quyền con người và hội nhập' },
      { p: 'Pháp luật Việt Nam bảo đảm các quyền con người phù hợp với chuẩn mực quốc tế (như Tuyên ngôn Quốc tế Nhân quyền). Hội đồng Nhân quyền Liên hợp quốc giám sát, đánh giá định kỳ việc thực hiện của các quốc gia.' },
      { note: 'Là công dân thời hội nhập, các em cần học ngoại ngữ, hiểu biết văn hoá đa quốc gia, đồng thời giữ gìn bản sắc Việt và tuân thủ pháp luật.' },
    ],
    examples: [
      { q: 'Vì sao khi tham gia một hiệp định thương mại, Việt Nam phải sửa đổi một số luật trong nước?', a: 'Vì hội nhập đòi hỏi pháp luật quốc gia phù hợp với cam kết quốc tế. Khi ký hiệp định, Việt Nam có trách nhiệm tuân thủ và nội luật hoá các cam kết — sửa hoặc ban hành luật mới cho phù hợp. Điều này bảo đảm Việt Nam giữ uy tín, thực hiện đúng cam kết với các đối tác quốc tế.' },
      { q: 'Theo em, học sinh cần chuẩn bị gì để trở thành công dân toàn cầu nhưng vẫn giữ bản sắc Việt?', a: 'Học sinh cần trau dồi ngoại ngữ, kỹ năng số, hiểu biết về văn hoá các nước để giao lưu, hợp tác. Đồng thời phải hiểu và tự hào về lịch sử, văn hoá, ngôn ngữ Việt Nam, tuân thủ pháp luật. Hội nhập là "hoà nhập nhưng không hoà tan" — mở lòng với thế giới mà vẫn giữ vững cội nguồn dân tộc.' },
    ],
  },

  'H10GDCD-w35-quiz': {
    topic: 'Ôn tập cuối năm',
    intro: 'Một năm học đã khép lại với hành trình từ kinh tế đến pháp luật. Tuần cuối này, chúng ta cùng hệ thống lại toàn bộ kiến thức cốt lõi để các em vững vàng bước vào kỳ thi và mang theo vào cuộc sống.',
    objectives: [
      'Hệ thống kiến thức trọng tâm cả năm.',
      'Kết nối phần Kinh tế và phần Pháp luật.',
      'Vận dụng tổng hợp vào tình huống thực tế.',
    ],
    theory: [
      { h: 'Phần Kinh tế trọng tâm' },
      { ul: [
        'Hoạt động kinh tế gồm bốn khâu; ba chủ thể: Nhà nước, doanh nghiệp, hộ gia đình.',
        'Thị trường và cơ chế thị trường vận hành theo cung - cầu - giá cả.',
        'Ngân sách nhà nước, thuế (VAT gián thu, TNCN trực thu), tiền tệ và lạm phát.',
        'Sản xuất kinh doanh, các loại hình doanh nghiệp, văn hoá tiêu dùng.',
      ] },
      { h: 'Phần Pháp luật trọng tâm' },
      { ul: [
        'Hệ thống chính trị; bộ máy Nhà nước; Hiến pháp 2013 (11 chương, 120 điều).',
        'Quyền và nghĩa vụ công dân; quyền tự do dân chủ.',
        'Các ngành luật: dân sự, hình sự, hành chính, lao động, hôn nhân gia đình.',
        'Sở hữu trí tuệ, an ninh mạng, phòng chống tham nhũng, bảo vệ Tổ quốc.',
      ] },
      { h: 'Tinh thần xuyên suốt' },
      { p: 'Cả năm học hướng tới một mục tiêu: giúp các em trở thành công dân hiểu biết kinh tế, sống và làm việc theo Hiến pháp và pháp luật, có trách nhiệm với bản thân, gia đình và đất nước.' },
      { note: 'Kiến thức này không chỉ để thi — nó là hành trang theo các em suốt đời khi tham gia nền kinh tế và đời sống pháp luật của một công dân trưởng thành.' },
    ],
    examples: [
      { q: 'Tình huống: Một bạn trẻ mở cửa hàng online, nộp thuế, ký hợp đồng với nhà cung cấp, lấy hoá đơn đầu vào. Hãy chỉ ra các kiến thức cả năm liên quan.', a: 'Bạn ấy là chủ thể kinh tế (sản xuất kinh doanh), thực hiện quyền tự do kinh doanh (Hiến pháp). Nộp thuế là nghĩa vụ kinh tế của công dân. Ký hợp đồng với nhà cung cấp là quan hệ dân sự, cần tự nguyện đúng luật. Lấy hoá đơn liên quan thuế VAT và văn hoá tiêu dùng minh bạch. Một tình huống gói trọn cả kinh tế lẫn pháp luật.' },
      { q: 'Theo em, vì sao môn Giáo dục Kinh tế và Pháp luật lại kết hợp cả hai lĩnh vực kinh tế và pháp luật trong một môn?', a: 'Vì trong đời sống, hoạt động kinh tế và pháp luật luôn gắn bó. Mọi giao dịch kinh tế đều diễn ra trong khuôn khổ pháp luật: kinh doanh phải đúng luật, nộp thuế, ký hợp đồng hợp pháp. Hiểu cả hai giúp công dân vừa làm kinh tế hiệu quả, vừa tôn trọng pháp luật — đó là mục tiêu của môn học này.' },
    ],
  },

  'H10GDCD-w36-quiz': {
    topic: 'Kết thúc GDCD 10 — Công dân có hiểu biết trong thế giới hội nhập',
    intro: 'Giáo dục Kinh tế và Pháp luật 10 trang bị cho em nền tảng suy nghĩ như một công dân kinh tế — hiểu thị trường, quyền và nghĩa vụ, pháp luật dân sự và hình sự. Hôm nay chúng ta nhìn lại hành trình đó và hướng tới lớp 11.',
    objectives: [
      'Hệ thống hoá các khái niệm kinh tế và pháp luật cơ bản đã học trong năm.',
      'Nhận ra mối liên hệ giữa kiến thức lớp 10 và các vấn đề kinh tế-pháp luật của lớp 11.',
      'Hiểu cách áp dụng kiến thức kinh tế và pháp luật vào cuộc sống thực hàng ngày.',
    ],
    theory: [
      { h: 'Bức tranh toàn cảnh GDCD 10' },
      { ul: [
        'Kinh tế học cơ bản: cung-cầu, thị trường, giá cả, các hình thức sở hữu, vai trò của Nhà nước.',
        'Tài chính cá nhân: thu nhập, chi tiêu, tiết kiệm, đầu tư, bảo hiểm — kĩ năng sống thiết yếu.',
        'Pháp luật dân sự: hợp đồng, quyền sở hữu, thừa kế, hôn nhân gia đình.',
        'Pháp luật hình sự: khái niệm tội phạm, trách nhiệm hình sự, vai trò của tố tụng hình sự.',
        'Quyền công dân: quyền hiến pháp, quyền dân sự, nghĩa vụ với nhà nước và xã hội.',
      ] },
      { h: 'Hành trang sang GDCD 11' },
      { ul: [
        'Kinh tế vi mô → Kinh tế vĩ mô: từ thị trường đơn lẻ đến tăng trưởng kinh tế quốc gia, lạm phát, thất nghiệp.',
        'Pháp luật dân sự → Pháp luật lao động, hành chính: quyền người lao động, hợp đồng lao động.',
        'Quyền hiến pháp → Bầu cử, tham gia chính trị: quyền và nghĩa vụ của công dân trưởng thành.',
        'Tài chính cá nhân → Tài chính doanh nghiệp: từ quản lý ngân sách cá nhân đến quản trị tài chính.',
      ] },
      { h: 'Ứng dụng thực tế ngay hôm nay' },
      { ul: [
        'Theo dõi giá cả hàng ngày và phân tích nguyên nhân: tại sao giá xăng lên? Tại sao giá rau biến động?',
        'Đọc hợp đồng khi mua sắm online: điều khoản đổi trả, bảo hành, bảo mật thông tin.',
        'Tìm hiểu về quyền của người tiêu dùng (Luật Bảo vệ quyền lợi người tiêu dùng 2023).',
      ] },
      { note: 'GDCD không phải môn học lý thuyết — mỗi ngày em đều là một "diễn viên" trong nền kinh tế và hệ thống pháp luật. Hiểu luật chơi, em chơi tốt hơn và bảo vệ bản thân tốt hơn.' },
    ],
    examples: [
      { q: 'Cách nào giúp em nhớ lâu các quyền và nghĩa vụ công dân mà không cần học thuộc lòng?', a: 'Phương pháp hiệu quả nhất: kết nối với tình huống thực. Mỗi quyền hoặc nghĩa vụ, hãy tự hỏi "Điều này ảnh hưởng đến em như thế nào trong 5 năm tới?". Ví dụ: quyền bầu cử → em sẽ đủ tuổi bầu cử vào năm mấy?; nghĩa vụ nộp thuế → khi đi làm em đóng thuế thu nhập cá nhân thế nào? Câu hỏi cá nhân hoá giúp ghi nhớ sâu hơn bất kì sơ đồ nào.' },
      { q: 'GDCD 11 sẽ khác GDCD 10 như thế nào, và em cần chuẩn bị gì?', a: 'GDCD 11 mở rộng từ kinh tế vi mô (thị trường, hợp đồng cá nhân) lên kinh tế vĩ mô (GDP, lạm phát, chính sách tiền tệ) và từ pháp luật dân sự lên pháp luật lao động và hành chính. Chuẩn bị: (1) Nắm chắc khái niệm cơ bản về cung-cầu và giá cả — sẽ mở rộng sang thị trường hàng hoá/lao động/tiền tệ; (2) Hiểu phân biệt giữa quyền và nghĩa vụ — lớp 11 thêm nhiều tình huống phức tạp hơn.' },
    ],
  },
};
