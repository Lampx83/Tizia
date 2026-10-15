// ============================================================
// Lớp 10 · CÔNG NGHỆ (định hướng Cơ khí / Thiết kế và công nghệ) — 35 tuần
// HK1: 1–18 · HK2: 19–35. Bám CTGD 2018: Vẽ kỹ thuật → Thiết kế kỹ thuật
// → Vật liệu & gia công cơ khí → ATLĐ & bảo trì → Cơ khí thông minh & hướng nghiệp.
// Key trùng id quiz: "H10CN-wNN-quiz". Dạy lý thuyết, KHÔNG copy quiz.
// ============================================================

export const H10CN_LESSONS = {
  'H10CN-w01-quiz': {
    topic: 'Khái quát về công nghệ',
    intro: 'Chào các em đến với môn Công nghệ lớp 10 định hướng cơ khí. Tuần đầu tiên, thầy muốn các em hiểu công nghệ là gì, vai trò của nó trong đời sống, và vì sao cơ khí được xem là ngành nền tảng của mọi nền công nghiệp.',
    objectives: [
      'Trình bày được khái niệm công nghệ và mối quan hệ giữa khoa học, kỹ thuật, công nghệ.',
      'Nêu được vai trò của công nghệ trong đời sống và sản xuất.',
      'Nhận biết được đặc trưng của các cuộc cách mạng công nghiệp và vị trí của ngành cơ khí.',
    ],
    theory: [
      { h: 'Công nghệ là gì?' },
      { p: 'Khoa học cho ta tri thức về thế giới (vì sao kim loại nóng chảy, vì sao dòng điện sinh từ trường). Kỹ thuật là cách vận dụng tri thức đó để giải quyết một vấn đề cụ thể. Công nghệ là toàn bộ giải pháp, quy trình, máy móc và vật liệu để biến tri thức thành sản phẩm, dịch vụ phục vụ con người.' },
      { h: 'Vai trò của công nghệ' },
      { ul: [
        'Tăng năng suất lao động: một máy CNC làm trong một giờ bằng nhiều người làm cả ngày.',
        'Nâng cao chất lượng và độ chính xác của sản phẩm.',
        'Cải thiện tiện nghi, an toàn và chất lượng cuộc sống.',
      ]},
      { h: 'Bốn cuộc cách mạng công nghiệp' },
      { p: 'CMCN 1.0 gắn với máy hơi nước; 2.0 với điện và dây chuyền sản xuất; 3.0 với máy tính và tự động hoá; 4.0 hiện nay với trí tuệ nhân tạo (AI), Internet vạn vật (IoT), dữ liệu lớn và robot.' },
      { h: 'Ngành cơ khí' },
      { p: 'Cơ khí là ngành thiết kế, chế tạo, gia công và sửa chữa máy móc, thiết bị từ kim loại. Đây là ngành nền tảng: ô tô, máy bay, tàu biển, máy gia dụng, thiết bị y tế đều cần đến cơ khí.' },
      { note: 'Hãy quan sát quanh em — chiếc xe đạp, cái quạt, nồi cơm điện — tất cả đều là sản phẩm của công nghệ cơ khí kết hợp với các ngành khác.' },
    ],
    examples: [
      { q: 'Phân biệt "khoa học" và "công nghệ" qua ví dụ động cơ điện.', a: 'Khoa học là định luật về lực từ tác dụng lên dòng điện (Ampère, Faraday). Công nghệ là cách dùng định luật đó để chế tạo ra động cơ điện thực tế, với cuộn dây, nam châm, vòng bi và quy trình lắp ráp.' },
      { q: 'Vì sao nói cơ khí là ngành "nền tảng"?', a: 'Vì các ngành khác đều phụ thuộc vào cơ khí: muốn sản xuất điện thoại cũng cần máy gia công khuôn; muốn xây nhà máy cũng cần kết cấu thép; muốn chữa bệnh cũng cần máy MRI. Không có cơ khí thì các ngành công nghiệp khác không thể vận hành.' },
    ],
  },

  'H10CN-w02-quiz': {
    topic: 'Vẽ kỹ thuật — Giới thiệu',
    intro: 'Các em ạ, người kỹ sư ở Việt Nam và người kỹ sư ở Nhật, ở Đức đều "nói chuyện" với nhau được nhờ một thứ ngôn ngữ chung: bản vẽ kỹ thuật. Tuần này ta làm quen với ngôn ngữ ấy — khổ giấy và tỉ lệ.',
    objectives: [
      'Hiểu được vai trò của vẽ kỹ thuật như ngôn ngữ chung của ngành kỹ thuật.',
      'Nhận biết các khổ giấy tiêu chuẩn A4, A3, A2.',
      'Tính và đọc được tỉ lệ bản vẽ.',
    ],
    theory: [
      { h: 'Vẽ kỹ thuật — ngôn ngữ của kỹ sư' },
      { p: 'Vẽ kỹ thuật là cách biểu diễn vật thể một cách chính xác, theo các quy tắc thống nhất, để bất kỳ ai trong ngành cũng hiểu và chế tạo được đúng. Bản vẽ được lập trên giấy khổ chuẩn hoặc trên phần mềm CAD.' },
      { h: 'Khổ giấy tiêu chuẩn' },
      { ul: [
        'A4: 210 × 297 mm — khổ thông dụng nhất.',
        'A3: 297 × 420 mm — gấp đôi A4.',
        'A2: 420 × 594 mm — gấp đôi A3. Cứ nhân đôi cạnh ngắn là lên một cỡ.',
      ]},
      { h: 'Tỉ lệ bản vẽ' },
      { p: 'Tỉ lệ là tỉ số giữa kích thước trên bản vẽ và kích thước thật của vật. Tỉ lệ 1:1 nghĩa là vẽ đúng bằng kích thước thật. Tỉ lệ 1:5 (tỉ lệ thu nhỏ) nghĩa là 1 mm trên giấy ứng với 5 mm thật. Tỉ lệ 5:1 (tỉ lệ phóng to) thì ngược lại.' },
      { h: 'Khi nào dùng tỉ lệ nào?' },
      { p: 'Chi tiết lớn (khung xe, máy) phải thu nhỏ để vẽ vừa giấy. Chi tiết rất nhỏ (con ốc đồng hồ) phải phóng to để nhìn rõ. Chi tiết vừa thì vẽ 1:1.' },
      { note: 'Dù phóng to hay thu nhỏ, con số kích thước ghi trên bản vẽ luôn là kích thước THẬT, không phải kích thước đo trên giấy.' },
    ],
    examples: [
      { q: 'Một trục dài 250 mm vẽ với tỉ lệ 1:5. Đoạn vẽ trên giấy dài bao nhiêu?', a: 'Tỉ lệ 1:5 nghĩa là chia kích thước thật cho 5: 250 / 5 = 50 mm trên giấy. Nhưng con số ghi kích thước vẫn là 250.' },
      { q: 'Một lỗ ren nhỏ đường kính 2 mm vẽ tỉ lệ 5:1. Trên giấy lỗ vẽ to bao nhiêu?', a: 'Tỉ lệ 5:1 là phóng to 5 lần: 2 × 5 = 10 mm trên giấy, nhờ vậy dễ nhìn và ghi chú; số kích thước ghi vẫn là ∅2.' },
    ],
  },

  'H10CN-w03-quiz': {
    topic: 'Tiêu chuẩn bản vẽ — Đường nét và chữ',
    intro: 'Tuần này các em học "bảng chữ cái" của bản vẽ kỹ thuật: các loại đường nét. Mỗi loại nét mang một ý nghĩa riêng, không được vẽ tùy tiện.',
    objectives: [
      'Phân biệt được các loại đường nét và ý nghĩa của từng loại.',
      'Nắm được quy định về chiều dày nét và cách viết chữ kỹ thuật.',
      'Hiểu vai trò của khung tên trên bản vẽ.',
    ],
    theory: [
      { h: 'Các loại đường nét chính' },
      { ul: [
        'Nét liền đậm: vẽ cạnh thấy (đường bao nhìn thấy được) của vật thể.',
        'Nét đứt mảnh: vẽ cạnh khuất, đường khuất (bị che, không nhìn thấy).',
        'Nét chấm gạch mảnh: vẽ trục đối xứng, đường tâm của hình tròn.',
        'Nét liền mảnh: vẽ đường kích thước, đường gióng, đường gạch mặt cắt.',
      ]},
      { h: 'Chiều dày nét' },
      { p: 'Nét đậm có chiều dày khoảng gấp đôi nét mảnh (tỉ lệ 2:1). Ví dụ nét đậm 0,5 mm thì nét mảnh 0,25 mm. Sự tương phản này giúp người đọc phân biệt nhanh đâu là đường bao chính.' },
      { h: 'Chữ viết kỹ thuật' },
      { p: 'Chữ trên bản vẽ phải đứng hoặc nghiêng 75°, đều nét, rõ ràng, thường viết kiểu in để tránh nhầm lẫn. Chiều cao chữ theo cỡ chuẩn (2,5; 3,5; 5; 7 mm).' },
      { h: 'Khung tên' },
      { p: 'Khung tên (title block) nằm ở góc dưới bên phải bản vẽ, ghi tên chi tiết, vật liệu, tỉ lệ, số bản vẽ, tên người vẽ và người duyệt. Đây là "chứng minh thư" của bản vẽ.' },
      { note: 'Nhìn vào một bản vẽ, chỉ cần đọc loại nét là biết ngay đâu là cạnh thấy, đâu là cạnh khuất, đâu là đường tâm — không cần đoán.' },
    ],
    examples: [
      { q: 'Một chi tiết có lỗ khoan xuyên qua. Trên hình chiếu, đường bao của lỗ ở mặt sau vẽ bằng nét gì?', a: 'Lỗ ở mặt sau bị thân chi tiết che, là cạnh khuất, nên vẽ bằng nét đứt mảnh. Đường tâm của lỗ vẽ bằng nét chấm gạch mảnh.' },
      { q: 'Nét đậm trên bản vẽ chọn 0,7 mm thì nét mảnh nên chọn bao nhiêu?', a: 'Theo tỉ lệ 2:1, nét mảnh ≈ 0,7 / 2 = 0,35 mm. Trong thực hành thường chọn cặp tiêu chuẩn 0,7 và 0,35 mm.' },
    ],
  },

  'H10CN-w04-quiz': {
    topic: 'Hình chiếu vuông góc',
    intro: 'Làm sao mô tả một vật 3 chiều trên tờ giấy phẳng? Tuần này các em học phương pháp hình chiếu vuông góc — chiếu vật thể lên các mặt phẳng để được hình chiếu đứng, bằng, cạnh.',
    objectives: [
      'Hiểu khái niệm hình chiếu và phép chiếu vuông góc.',
      'Phân biệt được ba hình chiếu: đứng, bằng, cạnh.',
      'Biết bố trí ba hình chiếu trên bản vẽ.',
    ],
    theory: [
      { h: 'Hình chiếu và phép chiếu vuông góc' },
      { p: 'Hình chiếu là hình ảnh thu được khi chiếu vật thể lên một mặt phẳng. Trong phép chiếu vuông góc, các tia chiếu song song và vuông góc với mặt phẳng chiếu, nhờ vậy hình chiếu giữ đúng kích thước, không bị méo.' },
      { h: 'Ba hình chiếu cơ bản' },
      { ul: [
        'Hình chiếu đứng: nhìn từ phía trước (mặt chính diện).',
        'Hình chiếu bằng: nhìn từ trên xuống.',
        'Hình chiếu cạnh: nhìn từ bên trái sang (hoặc bên phải).',
      ]},
      { h: 'Cách bố trí' },
      { p: 'Hình chiếu đứng đặt giữa. Hình chiếu bằng đặt ngay phía dưới hình chiếu đứng. Hình chiếu cạnh đặt bên phải hình chiếu đứng. Cách bố trí này thống nhất để mọi người đọc giống nhau.' },
      { h: 'Vì sao cần ba hình chiếu?' },
      { p: 'Một hình chiếu không đủ để mô tả vật: hai vật khác nhau có thể có cùng một hình chiếu đứng. Ba hình chiếu kết hợp mới đủ thông tin để hình dung và chế tạo đúng vật thể.' },
      { note: 'Khi đọc bản vẽ, hãy "ghép" ba hình chiếu lại trong đầu để dựng hình 3D của vật — đây là kỹ năng quan trọng nhất của vẽ kỹ thuật.' },
    ],
    examples: [
      { q: 'Một khối hộp chữ nhật 40×30×20 mm. Hình chiếu đứng (nhìn mặt 40×20) là hình gì?', a: 'Hình chiếu đứng là hình chữ nhật 40 × 20 mm. Hình chiếu bằng sẽ là 40 × 30, hình chiếu cạnh là 30 × 20. Ba hình chiếu cho đủ ba kích thước.' },
      { q: 'Vì sao đường khuất trong hình chiếu lại quan trọng?', a: 'Vì nó cho biết cấu trúc bên trong hoặc phần bị che. Ví dụ một lỗ rỗng bên trong khối chỉ hiện ra qua nét đứt; nếu bỏ đường khuất, người chế tạo sẽ tưởng khối đặc.' },
    ],
  },

  'H10CN-w05-quiz': {
    topic: 'Hình chiếu trục đo',
    intro: 'Hình chiếu vuông góc chính xác nhưng khó hình dung với người mới. Tuần này các em học hình chiếu trục đo — cách vẽ một hình duy nhất nhưng thể hiện được cả ba chiều, trông giống ảnh thật.',
    objectives: [
      'Hiểu mục đích và ưu, nhược điểm của hình chiếu trục đo.',
      'Nắm được đặc điểm của hình chiếu trục đo vuông góc đều (isometric).',
      'Biết cách biểu diễn hình tròn trên hình chiếu trục đo.',
    ],
    theory: [
      { h: 'Hình chiếu trục đo là gì?' },
      { p: 'Hình chiếu trục đo (axonometric) biểu diễn vật thể trên một hình duy nhất thể hiện cả ba chiều dài, rộng, cao. Nó trực quan như một bức ảnh, giúp người không chuyên cũng hình dung được vật.' },
      { h: 'Hình chiếu trục đo vuông góc đều' },
      { p: 'Loại phổ biến nhất là trục đo vuông góc đều (isometric): ba trục đo hợp với nhau những góc 120°, và hệ số biến dạng theo cả ba trục đều bằng nhau. Nhờ đó hình vẽ cân đối, dễ dựng.' },
      { h: 'Hệ số biến dạng' },
      { p: 'Hệ số biến dạng là tỉ số giữa kích thước đo trên hình chiếu trục đo và kích thước thật theo mỗi trục. Trong trục đo đều, ba hệ số bằng nhau nên ta có thể đo kích thước thật trực tiếp theo phương các trục.' },
      { h: 'Hình tròn thành elip' },
      { p: 'Một mặt tròn trong không gian, khi chiếu lên hình trục đo, sẽ biến thành hình elip. Vì vậy khi vẽ lỗ tròn, mặt bích tròn, ta vẽ elip chứ không vẽ tròn.' },
      { note: 'Trục đo dùng để minh hoạ, thuyết minh ý tưởng. Còn bản vẽ chế tạo chính thức vẫn dùng hình chiếu vuông góc vì đo kích thước dễ và chính xác hơn.' },
    ],
    examples: [
      { q: 'Trong hình chiếu trục đo vuông góc đều, ba trục hợp nhau góc bao nhiêu?', a: 'Ba trục đo X, Y, Z hợp nhau từng đôi một góc 120°. Đó là lý do nó được gọi là "đều" — ba hướng đối xứng như nhau.' },
      { q: 'Vẽ một ống tròn theo hình chiếu trục đo, miệng ống trông như thế nào?', a: 'Miệng ống tròn sẽ trông như một hình elip. Người vẽ phải dựng elip nội tiếp hình thoi để miệng ống đúng hướng và đúng tỉ lệ.' },
    ],
  },

  'H10CN-w06-quiz': {
    topic: 'Ghi kích thước trên bản vẽ',
    intro: 'Một bản vẽ đẹp mà thiếu kích thước thì vô dụng — không ai chế tạo được. Tuần này các em học quy tắc ghi kích thước: đường kích thước, đường gióng, ký hiệu đường kính và bán kính.',
    objectives: [
      'Nắm được các thành phần của ghi kích thước và đơn vị mặc định.',
      'Phân biệt và sử dụng đúng ký hiệu đường kính (∅) và bán kính (R).',
      'Biết nguyên tắc ghi kích thước đầy đủ, không trùng lặp.',
    ],
    theory: [
      { h: 'Các thành phần ghi kích thước' },
      { ul: [
        'Đường kích thước: đường song song với đoạn cần đo, có hai mũi tên ở hai đầu.',
        'Đường gióng (đường dóng): kéo từ vật thể ra để giới hạn phạm vi đo.',
        'Con số kích thước: ghi giá trị thật, đặt phía trên đường kích thước.',
      ]},
      { h: 'Đơn vị mặc định' },
      { p: 'Trên bản vẽ cơ khí, đơn vị mặc định là milimét (mm) và KHÔNG ghi chữ "mm" sau số. Nếu dùng đơn vị khác (như độ cho góc), phải ghi rõ ký hiệu.' },
      { h: 'Ký hiệu đường kính và bán kính' },
      { p: 'Đường tròn (lỗ, trụ) ghi đường kính bằng ký hiệu ∅, ví dụ ∅20 nghĩa là đường kính 20 mm. Cung tròn ghi bán kính bằng ký hiệu R, ví dụ R10 nghĩa là bán kính 10 mm.' },
      { h: 'Nguyên tắc ghi kích thước' },
      { p: 'Kích thước phải đầy đủ để chế tạo được, không thừa không thiếu, không ghi trùng một kích thước ở hai nơi. Ưu tiên ghi rõ ràng, dễ đọc, không cắt nhau lộn xộn.' },
      { note: 'Quy tắc vàng: mỗi kích thước chỉ ghi MỘT lần. Ghi trùng dễ gây mâu thuẫn khi sửa bản vẽ.' },
    ],
    examples: [
      { q: 'Bản vẽ ghi "∅25" và "R8". Hai con số này khác nhau thế nào?', a: '∅25 là đường kính một lỗ hoặc trụ tròn (25 mm). R8 là bán kính một cung tròn hoặc góc lượn (8 mm, tức đường kính cung đó là 16 mm). Đường kính dùng ∅, bán kính dùng R.' },
      { q: 'Trên bản vẽ một con số kích thước ghi là "40", đơn vị là gì?', a: 'Là 40 mm. Bản vẽ cơ khí mặc định đơn vị milimét nên không ghi "mm". Nếu là góc thì phải ghi rõ như "40°".' },
    ],
  },

  'H10CN-w07-quiz': {
    topic: 'Đọc và phân tích bản vẽ chi tiết',
    intro: 'Biết vẽ rồi phải biết đọc. Tuần này các em học quy trình đọc một bản vẽ chi tiết, cùng các khái niệm dung sai và độ nhám bề mặt mà người thợ phải tuân theo.',
    objectives: [
      'Trình bày được trình tự đọc một bản vẽ chi tiết.',
      'Hiểu nội dung khung tên và yêu cầu kỹ thuật.',
      'Nắm khái niệm dung sai và độ nhám bề mặt.',
    ],
    theory: [
      { h: 'Bản vẽ chi tiết là gì?' },
      { p: 'Bản vẽ chi tiết là bản vẽ của một chi tiết riêng lẻ, chứa đủ thông tin để chế tạo chính nó: hình dạng, kích thước, vật liệu, yêu cầu kỹ thuật.' },
      { h: 'Trình tự đọc bản vẽ' },
      { ul: [
        'Đọc khung tên: biết tên chi tiết, vật liệu, tỉ lệ.',
        'Đọc các hình chiếu: ghép lại để hình dung hình dạng 3D.',
        'Đọc kích thước: nắm kích thước tổng và kích thước từng phần.',
        'Đọc yêu cầu kỹ thuật: dung sai, độ nhám, xử lý nhiệt, mạ.',
      ]},
      { h: 'Dung sai' },
      { p: 'Không thể gia công tuyệt đối chính xác, nên bản vẽ cho phép một khoảng sai số gọi là dung sai. Ví dụ ∅20 ±0,1 nghĩa là đường kính thật được phép từ 19,9 đến 20,1 mm.' },
      { h: 'Độ nhám bề mặt' },
      { p: 'Độ nhám cho biết bề mặt mịn hay thô, ký hiệu bằng ký hiệu tam giác (kiểu cũ) hoặc bằng Ra kèm số, ví dụ Ra 1,6. Số càng nhỏ bề mặt càng mịn.' },
      { note: 'Bề mặt làm việc (như cổ trục lắp vòng bi) cần độ nhám nhỏ; bề mặt không quan trọng có thể để thô để tiết kiệm chi phí gia công.' },
    ],
    examples: [
      { q: 'Bản vẽ ghi "∅30 ±0,05". Một trục đo được ∅30,03 có đạt không?', a: 'Đạt. Dung sai cho phép từ 29,95 đến 30,05 mm. Giá trị 30,03 nằm trong khoảng đó nên chi tiết hợp lệ.' },
      { q: 'Hai bề mặt cùng ghi Ra 6,3 và Ra 0,8, bề mặt nào mịn hơn?', a: 'Ra 0,8 mịn hơn vì giá trị Ra nhỏ hơn ứng với độ nhám thấp. Ra 6,3 thô hơn, thường dùng cho bề mặt không tiếp xúc làm việc.' },
    ],
  },

  'H10CN-w08-quiz': {
    topic: 'Bản vẽ lắp',
    intro: 'Một cái máy gồm nhiều chi tiết. Tuần này các em học bản vẽ lắp — thứ chỉ cho người thợ biết các chi tiết khớp với nhau ra sao để tạo thành sản phẩm hoàn chỉnh.',
    objectives: [
      'Phân biệt được bản vẽ lắp với bản vẽ chi tiết.',
      'Hiểu vai trò của bảng kê và số vị trí trên bản vẽ lắp.',
      'Biết công dụng của mặt cắt trên bản vẽ lắp.',
    ],
    theory: [
      { h: 'Bản vẽ lắp là gì?' },
      { p: 'Bản vẽ lắp (assembly drawing) thể hiện một sản phẩm gồm nhiều chi tiết được ghép lại, cho thấy vị trí và quan hệ lắp ghép giữa chúng. Nó phục vụ việc lắp ráp, kiểm tra và sửa chữa.' },
      { h: 'Bảng kê chi tiết' },
      { p: 'Bản vẽ lắp luôn có bảng kê (BOM — bill of materials) liệt kê số thứ tự, tên chi tiết, số lượng và vật liệu. Nhờ bảng kê, người ta biết cần chuẩn bị những gì để lắp.' },
      { h: 'Số vị trí chi tiết' },
      { p: 'Mỗi chi tiết được đánh một số hiệu đặt trong vòng tròn nhỏ, nối bằng đường dóng tới chi tiết tương ứng trên hình. Số này khớp với số thứ tự trong bảng kê.' },
      { h: 'Mặt cắt trên bản vẽ lắp' },
      { p: 'Để thấy được các chi tiết bên trong và cách chúng khớp nối, người ta dùng mặt cắt — cắt tưởng tượng qua sản phẩm để lộ cấu trúc bên trong các mối lắp ghép.' },
      { note: 'Bản vẽ chi tiết để CHẾ TẠO từng chi tiết; bản vẽ lắp để LẮP RÁP chúng lại. Người thợ cần cả hai loại.' },
    ],
    examples: [
      { q: 'Trên bản vẽ lắp xe đạp, số "5" trong vòng tròn nối tới bàn đạp. Số đó có ý nghĩa gì?', a: 'Đó là số vị trí của chi tiết. Tra bảng kê dòng số 5 sẽ biết tên (bàn đạp), số lượng (2 cái) và vật liệu của chi tiết đó.' },
      { q: 'Vì sao bản vẽ lắp cần mặt cắt mà không chỉ vẽ hình bên ngoài?', a: 'Vì nhiều mối lắp ghép (như trục lắp trong ổ bi, bu lông xuyên qua hai tấm) nằm bên trong, không nhìn thấy từ ngoài. Mặt cắt giúp thấy rõ chúng khớp nhau ra sao.' },
    ],
  },

  'H10CN-w09-quiz': {
    topic: 'Vẽ kỹ thuật bằng CAD',
    intro: 'Ngày nay kỹ sư hiếm khi vẽ tay; họ dùng máy tính. Tuần này các em làm quen với CAD và chuỗi CAD–CAM–CNC, cốt lõi của sản xuất hiện đại.',
    objectives: [
      'Hiểu khái niệm CAD và ưu điểm so với vẽ tay.',
      'Biết một số phần mềm CAD phổ biến và định dạng file.',
      'Hiểu mối liên hệ CAD → CAM → CNC.',
    ],
    theory: [
      { h: 'CAD là gì?' },
      { p: 'CAD viết tắt của Computer-Aided Design — thiết kế với sự trợ giúp của máy tính. Thay vì bút chì và thước, kỹ sư dựng mô hình 2D hoặc 3D trên phần mềm.' },
      { h: 'Một số phần mềm CAD' },
      { ul: [
        'AutoCAD: mạnh về bản vẽ 2D.',
        'SolidWorks, Inventor, Fusion 360: dựng mô hình 3D, mô phỏng.',
        'File xuất ra: DWG, DXF, STEP, PDF; có thể in trực tiếp.',
      ]},
      { h: 'Ưu điểm của CAD' },
      { p: 'CAD cho độ chính xác cao, dễ chỉnh sửa (đổi một kích thước cả bản vẽ tự cập nhật), dễ lưu trữ và chia sẻ qua mạng, và kết nối được với khâu sản xuất tự động.' },
      { h: 'Chuỗi CAD–CAM–CNC' },
      { p: 'CAM (Computer-Aided Manufacturing) lấy mô hình CAD để sinh ra G-code — chương trình điều khiển. G-code được nạp vào máy CNC để gia công tự động. Cả chuỗi giúp đi từ ý tưởng tới sản phẩm chính xác, nhanh, ít sai sót.' },
      { note: 'Một thay đổi nhỏ trên mô hình CAD có thể tự động lan tới CAM và CNC — đó là sức mạnh của thiết kế số so với vẽ tay.' },
    ],
    examples: [
      { q: 'Kỹ sư đổi đường kính một trục từ ∅20 sang ∅22 trên mô hình 3D. Vẽ tay và CAD khác nhau thế nào ở việc này?', a: 'Vẽ tay phải tẩy và vẽ lại tất cả hình chiếu liên quan. Với CAD, chỉ cần sửa một thông số, mọi hình chiếu và bản vẽ kích thước tự cập nhật theo.' },
      { q: 'CAM đóng vai trò gì giữa CAD và CNC?', a: 'CAM là cầu nối: nó nhận hình học từ CAD và tính ra đường chạy dao, tốc độ cắt, rồi xuất G-code mà máy CNC hiểu được để gia công.' },
    ],
  },

  'H10CN-w10-quiz': {
    topic: 'Thiết kế kỹ thuật — Khái quát',
    intro: 'Thiết kế không phải vẽ đẹp, mà là giải quyết một vấn đề. Tuần này các em học quy trình thiết kế kỹ thuật — con đường có hệ thống từ nhu cầu tới sản phẩm.',
    objectives: [
      'Hiểu khái niệm thiết kế kỹ thuật và mục đích của nó.',
      'Nắm được các bước của quy trình thiết kế.',
      'Biết các tiêu chí đánh giá một sản phẩm thiết kế.',
    ],
    theory: [
      { h: 'Thiết kế kỹ thuật là gì?' },
      { p: 'Thiết kế kỹ thuật là quá trình có hệ thống nhằm tạo ra một sản phẩm hoặc giải pháp giải quyết một vấn đề thực tế, đáp ứng nhu cầu của con người trong những ràng buộc cho trước.' },
      { h: 'Quy trình thiết kế' },
      { ul: [
        'Xác định vấn đề: làm rõ nhu cầu, đối tượng sử dụng, ràng buộc.',
        'Đề xuất ý tưởng: phát nhiều ý tưởng (brainstorming).',
        'Lựa chọn và thiết kế chi tiết: chọn ý tưởng tốt nhất, vẽ bản vẽ.',
        'Chế tạo mẫu và đánh giá: làm thử, kiểm tra, cải tiến.',
      ]},
      { h: 'Brainstorming' },
      { p: 'Brainstorming là kỹ thuật phát ý tưởng tự do: khuyến khích nêu thật nhiều ý, không phê phán ngay, kể cả ý tưởng "điên rồ". Sau đó mới lọc và chọn.' },
      { h: 'Tiêu chí đánh giá' },
      { p: 'Một sản phẩm tốt phải đạt: chức năng (làm đúng việc cần làm), an toàn, dễ sử dụng, thẩm mỹ và giá thành hợp lý. Thiếu chức năng hay mất an toàn thì dù đẹp cũng bị loại.' },
      { note: 'Thiết kế là quá trình lặp: hiếm khi đúng ngay lần đầu. Thử – đánh giá – sửa nhiều vòng mới ra sản phẩm tốt.' },
    ],
    examples: [
      { q: 'Cần thiết kế một giá đỡ điện thoại trên bàn học. Bước đầu tiên làm gì?', a: 'Xác định vấn đề: ai dùng (học sinh), ràng buộc (giữ chắc nhiều cỡ điện thoại, gọn, rẻ, không che màn hình). Làm rõ nhu cầu trước rồi mới nghĩ ý tưởng.' },
      { q: 'Hai ý tưởng giá đỡ: một bằng nhựa in 3D đẹp nhưng dễ gãy, một bằng thép chắc nhưng nặng. Chọn dựa trên gì?', a: 'Cân theo tiêu chí: nếu ưu tiên độ bền và an toàn thì chọn thép; nếu ưu tiên gọn nhẹ, thẩm mỹ và giá thì cải tiến mẫu nhựa cho cứng hơn. Quyết định dựa trên trọng số các tiêu chí với người dùng.' },
    ],
  },

  'H10CN-w11-quiz': {
    topic: 'Phương pháp thiết kế sáng tạo',
    intro: 'Tuần này các em đi sâu vào sáng tạo trong thiết kế: tư duy thiết kế (Design Thinking), vai trò của mẫu thử, in 3D và thiết kế bền vững.',
    objectives: [
      'Hiểu thế nào là sáng tạo trong thiết kế kỹ thuật.',
      'Nắm năm bước của tư duy thiết kế (Design Thinking).',
      'Hiểu vai trò của prototype, in 3D và thiết kế bền vững.',
    ],
    theory: [
      { h: 'Sáng tạo trong thiết kế' },
      { p: 'Sáng tạo là đưa ra giải pháp mới mẻ và hữu ích, không chỉ sao chép cái có sẵn. Nó đến từ việc kết hợp tri thức cũ theo cách mới và nhìn vấn đề từ góc độ người dùng.' },
      { h: 'Tư duy thiết kế (Design Thinking)' },
      { ul: [
        'Empathize (đồng cảm): hiểu sâu nhu cầu người dùng.',
        'Define (định nghĩa): phát biểu rõ vấn đề.',
        'Ideate (lên ý tưởng): nghĩ nhiều giải pháp.',
        'Prototype (làm mẫu thử) và Test (thử nghiệm).',
      ]},
      { h: 'Mẫu thử và in 3D' },
      { p: 'Prototype là mẫu thử để kiểm tra ý tưởng trước khi sản xuất hàng loạt, giúp phát hiện lỗi sớm khi sửa còn rẻ. In 3D cho phép tạo prototype nhanh, chi phí thấp, kể cả những hình dạng phức tạp.' },
      { h: 'Thiết kế bền vững' },
      { p: 'Thiết kế bền vững (sustainable design) ưu tiên vật liệu tái chế, tiết kiệm năng lượng, tuổi thọ cao và ít gây ô nhiễm, để sản phẩm thân thiện với môi trường suốt vòng đời.' },
      { note: 'Phản hồi của người dùng (UX research) là vàng: sửa theo phản hồi thực tế tốt hơn nhiều so với phỏng đoán của người thiết kế.' },
    ],
    examples: [
      { q: 'Vì sao nên làm prototype trước khi sản xuất 1000 sản phẩm?', a: 'Vì nếu thiết kế có lỗi, phát hiện trên một prototype thì chỉ tốn một mẫu để sửa; phát hiện sau khi đã sản xuất 1000 cái thì thiệt hại rất lớn. Prototype giúp "thất bại sớm, rẻ".' },
      { q: 'Một bình nước thiết kế dùng nhựa khó tái chế. Theo thiết kế bền vững nên cải tiến thế nào?', a: 'Chuyển sang vật liệu tái chế được hoặc inox dùng lâu dài, thiết kế dễ tháo rời để tái chế từng phần, giảm chi tiết thừa — qua đó giảm rác thải và năng lượng.' },
    ],
  },

  'H10CN-w12-quiz': {
    topic: 'Vật liệu cơ khí — Kim loại đen',
    intro: 'Muốn chế tạo phải hiểu vật liệu. Tuần này các em học nhóm kim loại đen — thép và gang — xương sống của ngành cơ khí.',
    objectives: [
      'Phân biệt được kim loại đen gồm thép và gang.',
      'Nắm được thành phần và tính chất của thép, gang.',
      'Hiểu vì sao thép không gỉ (inox) chống ăn mòn.',
    ],
    theory: [
      { h: 'Kim loại đen là gì?' },
      { p: 'Kim loại đen là nhóm vật liệu có gốc từ sắt (Fe), gồm thép và gang. Đây là vật liệu kim loại được dùng nhiều nhất trong cơ khí vì rẻ, bền và dễ gia công.' },
      { h: 'Thép' },
      { p: 'Thép là hợp kim của sắt và cacbon với hàm lượng cacbon dưới 2,14%. Thép dẻo dai, chịu kéo tốt, dùng làm máy móc, kết cấu công trình, ô tô, tàu, đường ray.' },
      { h: 'Gang' },
      { p: 'Gang là hợp kim sắt–cacbon với hàm lượng cacbon trên 2,14% (thường 2–4%). Gang cứng, giòn, chịu nén tốt và dễ đúc, nên dùng đúc thân máy, ống dẫn, nắp cống.' },
      { h: 'Thép không gỉ (inox)' },
      { p: 'Inox là thép hợp kim chứa ít nhất khoảng 10,5% crom (Cr), thường thêm niken (Ni). Lớp oxit crom mỏng trên bề mặt giúp inox chống gỉ rất tốt — dùng cho đồ gia dụng, y tế, công nghiệp thực phẩm.' },
      { note: 'Cùng là Fe–C nhưng chỉ cần thay đổi hàm lượng cacbon là tính chất đổi hẳn: ít cacbon thì dẻo (thép), nhiều cacbon thì cứng giòn (gang).' },
    ],
    examples: [
      { q: 'Vì sao thân máy, vỏ động cơ thường đúc bằng gang chứ không bằng thép?', a: 'Vì gang dễ đúc thành hình phức tạp, chịu nén và rung tốt, hấp thụ rung động — phù hợp với thân máy. Thép khó đúc hình phức tạp hơn và đắt hơn.' },
      { q: 'Vì sao dao, kéo nhà bếp hay làm bằng inox?', a: 'Vì inox chứa crom tạo lớp bảo vệ chống gỉ, lại đủ cứng để giữ lưỡi sắc và an toàn vệ sinh khi tiếp xúc thực phẩm.' },
    ],
  },

  'H10CN-w13-quiz': {
    topic: 'Vật liệu cơ khí — Kim loại màu',
    intro: 'Không phải mọi kim loại đều là sắt thép. Tuần này các em học kim loại màu — đồng, nhôm, titan và kim loại quý — mỗi loại có một thế mạnh riêng.',
    objectives: [
      'Hiểu khái niệm kim loại màu và kể được các kim loại tiêu biểu.',
      'Nắm tính chất nổi bật của đồng, nhôm, titan.',
      'Biết một số hợp kim màu thông dụng.',
    ],
    theory: [
      { h: 'Kim loại màu là gì?' },
      { p: 'Kim loại màu là nhóm kim loại không chứa sắt làm thành phần chính: đồng, nhôm, chì, kẽm, niken, titan, và các kim loại quý như vàng, bạc. Thép thì thuộc kim loại đen, không phải kim loại màu.' },
      { h: 'Đồng (Cu)' },
      { p: 'Đồng dẫn điện và dẫn nhiệt rất tốt, dẻo dễ kéo sợi, nên dùng làm dây điện, cuộn dây động cơ, ống dẫn nhiệt.' },
      { h: 'Nhôm (Al)' },
      { p: 'Nhôm nhẹ (chỉ bằng khoảng một phần ba thép), chống gỉ nhờ lớp oxit nhôm Al₂O₃ tự nhiên trên bề mặt. Dùng cho máy bay, ô tô, khung cửa, đồ gia dụng.' },
      { h: 'Titan và kim loại quý' },
      { ul: [
        'Titan (Ti): nhẹ như nhôm nhưng bền như thép, chống ăn mòn — dùng hàng không, y sinh (khớp nhân tạo).',
        'Vàng, bạc, bạch kim: kim loại quý, dẫn điện tốt, không gỉ, dùng trang sức và tiếp điểm điện tử.',
        'Hợp kim đồng–thiếc gọi là đồng thanh (bronze); đồng–kẽm gọi là đồng thau (brass).',
      ]},
      { note: 'Chọn vật liệu là bài toán đánh đổi: nhẹ thì chọn nhôm/titan, dẫn điện thì chọn đồng, rẻ và bền thì chọn thép.' },
    ],
    examples: [
      { q: 'Vì sao dây điện thường làm bằng đồng?', a: 'Vì đồng dẫn điện rất tốt và dẻo dễ kéo thành sợi nhỏ. Nhôm cũng dẫn điện nhưng kém hơn, chỉ dùng cho đường dây tải điện lớn vì nhẹ và rẻ.' },
      { q: 'Vì sao khớp háng nhân tạo hay làm bằng titan?', a: 'Vì titan nhẹ, rất bền, chống ăn mòn trong môi trường cơ thể và tương thích sinh học (cơ thể không đào thải) — nên an toàn để cấy ghép lâu dài.' },
    ],
  },

  'H10CN-w14-quiz': {
    topic: 'Vật liệu phi kim',
    intro: 'Cơ khí hiện đại không chỉ dùng kim loại. Tuần này các em học vật liệu phi kim — nhựa, cao su, gốm và đặc biệt là composite đang thay đổi nhiều ngành.',
    objectives: [
      'Kể được các vật liệu phi kim thông dụng trong cơ khí.',
      'Nắm tính chất của nhựa, cao su, gốm kỹ thuật.',
      'Hiểu khái niệm và ưu điểm của vật liệu composite.',
    ],
    theory: [
      { h: 'Vật liệu phi kim gồm những gì?' },
      { p: 'Vật liệu phi kim trong cơ khí gồm nhựa, cao su, gỗ, gốm sứ kỹ thuật và composite. Chúng bổ sung cho kim loại ở những nơi cần nhẹ, cách điện hoặc chống ăn mòn.' },
      { h: 'Nhựa và cao su' },
      { ul: [
        'Nhựa: nhẹ, dễ tạo hình bằng ép phun, cách điện, chống ăn mòn — dùng vỏ thiết bị, bánh răng nhẹ.',
        'Cao su: đàn hồi cao — dùng làm lốp, gioăng, ron, đệm chống rung.',
      ]},
      { h: 'Gốm kỹ thuật' },
      { p: 'Gốm sứ kỹ thuật chịu nhiệt rất cao, chống mài mòn và cách điện tốt, nhưng giòn. Dùng cho dao cắt tốc độ cao, lớp cách nhiệt, vật liệu chịu nhiệt động cơ.' },
      { h: 'Composite' },
      { p: 'Composite là vật liệu tổng hợp từ hai hay nhiều thành phần khác nhau, ví dụ sợi thuỷ tinh hoặc sợi carbon gia cường trong nền nhựa. Mục đích là kết hợp ưu điểm: nhẹ của nhựa, bền của sợi.' },
      { note: 'Sợi carbon composite cực nhẹ mà bền cao, được dùng cho máy bay, xe đua, vợt và khung xe đạp thể thao.' },
    ],
    examples: [
      { q: 'Vì sao thân máy bay hiện đại dùng nhiều composite sợi carbon thay vì nhôm?', a: 'Vì composite sợi carbon nhẹ hơn mà bền tương đương hoặc hơn nhôm, không bị gỉ, giúp giảm trọng lượng máy bay nên tiết kiệm nhiên liệu.' },
      { q: 'Vì sao lốp xe làm bằng cao su mà không bằng nhựa cứng?', a: 'Vì cao su đàn hồi cao, biến dạng để bám đường rồi trở lại hình dạng cũ, giảm xóc. Nhựa cứng không đàn hồi, sẽ trơn trượt và dễ vỡ khi va đập.' },
    ],
  },

  'H10CN-w15-quiz': {
    topic: 'Phương pháp gia công cơ khí — Đúc',
    intro: 'Làm sao tạo ra một thân máy hình dạng phức tạp? Tuần này các em học công nghệ đúc — rót kim loại lỏng vào khuôn để tạo hình.',
    objectives: [
      'Hiểu bản chất của phương pháp đúc.',
      'Biết các loại khuôn và phạm vi ứng dụng của đúc cát, đúc áp lực.',
      'Nắm ưu, nhược điểm của đúc.',
    ],
    theory: [
      { h: 'Đúc là gì?' },
      { p: 'Đúc (casting) là phương pháp rót kim loại nung chảy vào khuôn có hình dạng mong muốn, để nguội kết tinh thành chi tiết. Đây là cách tạo hình lâu đời nhất cho kim loại.' },
      { h: 'Các loại khuôn' },
      { ul: [
        'Đúc cát: khuôn làm từ cát, dùng cho chi tiết lớn, sản xuất số lượng ít (thân máy, nắp cống).',
        'Đúc áp lực (die casting): khuôn kim loại, ép kim loại lỏng vào với áp lực cao, năng suất lớn cho chi tiết nhỏ–vừa sản xuất hàng loạt.',
        'Đúc mẫu chảy (mẫu sáp): cho chi tiết phức tạp, độ chính xác cao.',
      ]},
      { h: 'Ưu và nhược điểm' },
      { p: 'Ưu điểm lớn nhất của đúc là tạo được hình dạng rất phức tạp và chi tiết khối lượng lớn mà các phương pháp khác khó làm. Nhược điểm là bề mặt thường thô, có thể có rỗ khí, nên hay phải gia công lại các bề mặt làm việc.' },
      { note: 'Đúc thường là khâu tạo phôi đầu tiên; sau đó các bề mặt quan trọng được tiện, phay để đạt độ chính xác và độ nhám yêu cầu.' },
    ],
    examples: [
      { q: 'Cần làm 5 thân máy bơm lớn, hình dạng phức tạp. Nên đúc cát hay đúc áp lực?', a: 'Nên đúc cát, vì số lượng ít (5 chiếc) và chi tiết lớn, phức tạp. Đúc áp lực cần khuôn kim loại đắt, chỉ kinh tế khi sản xuất hàng loạt số lượng lớn.' },
      { q: 'Vì sao chi tiết đúc thường phải gia công lại?', a: 'Vì bề mặt đúc thô và kích thước chưa chính xác. Các bề mặt lắp ghép (lỗ trục, mặt bích) cần được tiện, phay, khoan lại để đạt dung sai và độ nhám theo bản vẽ.' },
    ],
  },

  'H10CN-w16-quiz': {
    topic: 'Gia công cơ khí — Cắt gọt và hàn',
    intro: 'Tuần này các em học hai nhóm gia công quan trọng: cắt gọt (tiện, phay, khoan, mài) để lấy đi kim loại thừa, và hàn để nối kim loại lại với nhau.',
    objectives: [
      'Kể được các phương pháp gia công cắt gọt và đặc trưng của từng loại.',
      'Phân biệt tiện, phay, khoan, mài.',
      'Hiểu bản chất của hàn và hàn hồ quang.',
    ],
    theory: [
      { h: 'Gia công cắt gọt' },
      { p: 'Cắt gọt là lấy đi phần kim loại thừa khỏi phôi bằng dụng cụ cắt để được hình dạng và kích thước yêu cầu. Đây là nhóm gia công chính xác phổ biến nhất.' },
      { ul: [
        'Tiện (turning): gia công chi tiết tròn xoay như trục, bạc, đai ốc — phôi quay, dao tịnh tiến.',
        'Phay (milling): tạo mặt phẳng, rãnh, bánh răng — dao quay, phôi tịnh tiến; đa năng nhất.',
        'Khoan (drilling): tạo lỗ tròn.',
        'Mài (grinding): làm tinh bề mặt, đạt độ nhám và độ chính xác cao.',
      ]},
      { h: 'Hàn' },
      { p: 'Hàn (welding) là nối các chi tiết kim loại bằng cách nung chảy kim loại tại chỗ tiếp giáp, đôi khi thêm que hàn, để chúng liền thành một khối khi nguội.' },
      { h: 'Hàn hồ quang' },
      { p: 'Hàn hồ quang dùng nhiệt của tia hồ quang điện sinh ra giữa que hàn và vật hàn để nung chảy kim loại. Đây là phương pháp hàn phổ biến nhất trong xây dựng và cơ khí.' },
      { note: 'Cắt gọt LẤY ĐI vật liệu (tiện, phay, khoan, mài); hàn NỐI vật liệu lại; đúc TẠO HÌNH từ kim loại lỏng. Phân biệt rõ ba nhóm này.' },
    ],
    examples: [
      { q: 'Cần gia công một trục tròn dài cho động cơ. Dùng phương pháp cắt gọt nào?', a: 'Dùng tiện, vì tiện chuyên cho chi tiết tròn xoay: phôi quay quanh trục, dao cắt tịnh tiến tạo ra mặt trụ chính xác.' },
      { q: 'Hàn khác đúc ở điểm cốt lõi nào?', a: 'Đúc rót kim loại lỏng vào khuôn để tạo một chi tiết mới từ đầu. Hàn nung chảy cục bộ để NỐI hai chi tiết đã có sẵn thành một. Mục đích khác nhau.' },
    ],
  },

  'H10CN-w17-quiz': {
    topic: 'Máy CNC và tự động hoá',
    intro: 'Tuần này các em bước vào sản xuất hiện đại: máy CNC điều khiển bằng máy tính, robot công nghiệp và nhà máy thông minh.',
    objectives: [
      'Hiểu khái niệm máy CNC và cách nó hoạt động bằng G-code.',
      'Nắm ưu điểm của CNC so với gia công thủ công.',
      'Biết vai trò của robot công nghiệp và đặc trưng nhà máy thông minh.',
    ],
    theory: [
      { h: 'Máy CNC là gì?' },
      { p: 'CNC viết tắt của Computer Numerical Control — điều khiển số bằng máy tính. Máy CNC tự động chạy theo một chương trình G-code, điều khiển chính xác chuyển động của dao và phôi.' },
      { h: 'Hoạt động của CNC' },
      { p: 'Từ bản vẽ CAD, phần mềm CAM sinh ra G-code. Nạp G-code vào máy CNC, máy tự thực hiện tiện/phay/khoan theo đúng chương trình, không cần thợ điều khiển tay từng bước.' },
      { h: 'Ưu điểm của CNC' },
      { ul: [
        'Độ chính xác cao, ổn định.',
        'Lặp lại được: hàng nghìn chi tiết giống hệt nhau.',
        'Tự động hoá, giảm sức lao động và sai sót con người.',
      ]},
      { h: 'Robot và nhà máy thông minh' },
      { p: 'Robot công nghiệp đảm nhận hàn, lắp ráp, sơn, đóng gói, vận chuyển. Nhà máy thông minh (smart factory) kết nối máy móc qua IoT, dùng AI và dữ liệu thời gian thực để tối ưu sản xuất. In 3D kim loại cũng đang được ứng dụng cho chi tiết phức tạp.' },
      { note: 'CNC không thay thế người hoàn toàn: con người vẫn thiết kế, lập trình, vận hành và bảo trì máy. Vai trò người lao động chuyển sang trình độ cao hơn.' },
    ],
    examples: [
      { q: 'Xưởng cần làm 10.000 chi tiết giống hệt nhau. Vì sao nên dùng CNC thay vì thợ tiện tay?', a: 'Vì CNC lặp lại chính xác từng chi tiết, nhanh, ít lỗi và không mệt mỏi. Thợ tay làm 10.000 chi tiết sẽ chậm và khó giữ độ đồng đều giữa các sản phẩm.' },
      { q: 'G-code đến từ đâu trong chuỗi sản xuất số?', a: 'G-code do phần mềm CAM sinh ra dựa trên mô hình CAD. Đó là "ngôn ngữ" gồm các lệnh toạ độ và chuyển động mà máy CNC đọc để gia công.' },
    ],
  },

  'H10CN-w18-quiz': {
    topic: 'Ôn tập học kỳ 1',
    intro: 'Các em ạ, kết thúc học kỳ 1 ta cùng hệ thống lại: từ vẽ kỹ thuật, thiết kế, tới vật liệu và gia công cơ khí. Hãy xâu chuỗi để thấy mạch logic của cả học kỳ.',
    objectives: [
      'Hệ thống được kiến thức vẽ kỹ thuật và thiết kế kỹ thuật.',
      'Củng cố kiến thức về vật liệu và các phương pháp gia công.',
      'Vận dụng tổng hợp để liên hệ các khâu trong sản xuất.',
    ],
    theory: [
      { h: 'Mạch kiến thức học kỳ 1' },
      { p: 'Học kỳ 1 đi theo trình tự của một sản phẩm thật: ý tưởng (thiết kế) → bản vẽ (vẽ kỹ thuật) → chọn vật liệu → gia công ra sản phẩm.' },
      { h: 'Vẽ kỹ thuật' },
      { ul: [
        'Vẽ kỹ thuật là ngôn ngữ chung; khổ A4 = 210 × 297 mm; đơn vị mặc định mm.',
        'Ba hình chiếu vuông góc: đứng, bằng, cạnh. Hình chiếu trục đo cho trực quan 3D.',
        'Đường kính ∅, bán kính R; đọc bản vẽ theo trình tự khung tên → hình chiếu → kích thước → yêu cầu kỹ thuật.',
      ]},
      { h: 'Vật liệu' },
      { p: 'Kim loại đen (thép C<2,14%, gang C>2,14%), kim loại màu (đồng, nhôm, titan), phi kim (nhựa, cao su, gốm, composite). Chọn vật liệu theo yêu cầu về độ bền, trọng lượng, dẫn điện, chống gỉ.' },
      { h: 'Gia công' },
      { p: 'Đúc tạo hình từ kim loại lỏng; cắt gọt (tiện, phay, khoan, mài) lấy đi vật liệu; hàn nối các chi tiết; CNC tự động hoá gia công chính xác.' },
      { note: 'Ôn tập đừng học vẹt từng phần rời rạc — hãy hình dung một chi tiết đi qua đủ các khâu để nhớ lâu hơn.' },
    ],
    examples: [
      { q: 'Một bánh răng thép: hãy nêu nhanh các khâu từ thiết kế tới thành phẩm.', a: 'Thiết kế bánh răng trên CAD → lập bản vẽ chi tiết (hình chiếu, kích thước, ∅, dung sai) → chọn vật liệu thép → đúc/cắt phôi → phay tạo răng trên máy CNC → mài tinh bề mặt răng → kiểm tra dung sai.' },
      { q: 'Vì sao trục cần độ nhám nhỏ ở chỗ lắp vòng bi?', a: 'Vì bề mặt đó là bề mặt làm việc, quay liên tục trong vòng bi. Độ nhám nhỏ (bề mặt mịn) giảm ma sát, giảm mài mòn và giúp lắp ghép chính xác.' },
    ],
  },

  'H10CN-w19-quiz': {
    topic: 'An toàn lao động cơ khí — Khái quát',
    intro: 'Mở đầu học kỳ 2, thầy muốn nhấn mạnh điều quan trọng nhất khi bước vào xưởng: an toàn. Không sản phẩm nào đáng đánh đổi bằng sức khoẻ hay tính mạng.',
    objectives: [
      'Hiểu khái niệm và mục đích của an toàn lao động.',
      'Biết các trang bị bảo hộ cá nhân (PPE) cơ bản.',
      'Nắm các quy tắc an toàn khi vào xưởng cơ khí.',
    ],
    theory: [
      { h: 'An toàn lao động là gì?' },
      { p: 'An toàn lao động (ATLĐ) là tổng thể các biện pháp tổ chức, kỹ thuật và thiết bị nhằm ngăn ngừa tai nạn lao động và bệnh nghề nghiệp, trước hết để bảo vệ tính mạng và sức khoẻ người lao động.' },
      { h: 'Trang bị bảo hộ cá nhân (PPE)' },
      { ul: [
        'Mũ bảo hộ, kính bảo hộ (chống mảnh phoi, tia hàn).',
        'Khẩu trang, găng tay, áo bảo hộ.',
        'Giày bảo hộ mũi sắt (chống vật nặng rơi vào chân).',
      ]},
      { h: 'Quy tắc khi vào xưởng' },
      { p: 'Phải mặc đầy đủ PPE; không mặc quần áo rộng, không đeo trang sức lủng lẳng có thể bị máy cuốn; tóc dài phải buộc gọn và đội mũ; không đùa nghịch quanh máy đang chạy.' },
      { h: 'Khi xảy ra tai nạn' },
      { p: 'Việc đầu tiên là tắt máy để ngăn nguy hiểm tiếp diễn, sau đó sơ cứu nạn nhân, gọi cấp cứu nếu cần và báo cáo người phụ trách.' },
      { note: 'An toàn không phải thủ tục hình thức — chỉ một sơ suất nhỏ với máy quay cũng có thể gây thương tật vĩnh viễn.' },
    ],
    examples: [
      { q: 'Vì sao tuyệt đối không đeo găng tay vải khi đứng máy khoan đang quay?', a: 'Vì mũi khoan quay có thể cuốn găng tay rồi cuốn cả bàn tay vào máy. Với máy quay, găng tay lại nguy hiểm — phải kẹp phôi chắc và để tay xa vùng quay.' },
      { q: 'Một bạn để tóc dài xoã vào xưởng tiện. Em góp ý gì?', a: 'Tóc dài có thể bị máy tiện đang quay cuốn vào, rất nguy hiểm. Bạn phải buộc tóc gọn và đội mũ trước khi đứng máy.' },
    ],
  },

  'H10CN-w20-quiz': {
    topic: 'Nguy cơ tai nạn trong xưởng cơ khí',
    intro: 'Tuần này các em nhận diện các nguy cơ cụ thể trong xưởng: cắt, điện giật, tiếng ồn, mảnh bắn, tia hàn — và cách phòng tránh từng loại.',
    objectives: [
      'Nhận diện được các nguy cơ tai nạn chính trong xưởng cơ khí.',
      'Biết biện pháp phòng tránh điện giật, vết cắt và mảnh kim loại bắn.',
      'Nắm quy tắc an toàn khi hàn và khi có tiếng ồn lớn.',
    ],
    theory: [
      { h: 'Các nguy cơ chính' },
      { p: 'Trong xưởng cơ khí có nhiều nguy cơ: cắt và va đập từ dụng cụ, kẹt tay vào máy quay, điện giật, bỏng (hàn, kim loại nóng), hít hoá chất, và tiếng ồn lớn gây hại thính giác.' },
      { h: 'Phòng tránh điện giật' },
      { p: 'Kiểm tra dây dẫn không hở, dùng thiết bị có nối đất, đeo găng cách điện khi cần, không thao tác điện khi tay ướt, ngắt nguồn trước khi sửa chữa.' },
      { h: 'Phòng tránh cắt và mảnh bắn' },
      { ul: [
        'Không đưa tay vào vùng cắt khi máy đang chạy; dùng dụng cụ gắp phoi.',
        'Đeo kính bảo hộ để chống mảnh phoi và tia lửa bắn vào mắt.',
        'Đeo nút tai/chụp tai khi tiếng ồn vượt khoảng 85 dB.',
      ]},
      { h: 'An toàn khi hàn' },
      { p: 'Khi hàn cần kính hàn (chống tia hồ quang UV gây hại mắt), găng tay dài, áo da hoặc vải dày chống tia lửa, và làm ở nơi thoáng khí để tránh hít khói hàn độc.' },
      { note: 'Mỗi loại nguy cơ có một biện pháp riêng — không thể chỉ đeo một thứ PPE rồi yên tâm. Phải đánh giá đúng việc mình làm để phòng đúng nguy cơ.' },
    ],
    examples: [
      { q: 'Khi tiện, vì sao không được dùng tay gạt phoi đang nóng và sắc?', a: 'Vì phoi vừa cắt ra rất nóng và sắc, dễ gây bỏng và cắt tay. Phải dùng móc/cào gắp phoi chuyên dụng và chỉ làm khi máy đã dừng.' },
      { q: 'Bạn thợ hàn chỉ đeo kính râm thường khi hàn hồ quang. Có an toàn không?', a: 'Không. Kính râm thường không chặn được tia UV mạnh của hồ quang, gây "đau mắt hàn" và tổn thương mắt. Phải dùng mặt nạ/kính hàn chuyên dụng với tấm lọc đúng cấp.' },
    ],
  },

  'H10CN-w21-quiz': {
    topic: 'Phòng cháy chữa cháy trong xưởng',
    intro: 'Xưởng cơ khí có tia lửa, dầu mỡ, khí dễ cháy — nguy cơ cháy luôn rình rập. Tuần này các em học tam giác cháy và cách dùng bình chữa cháy đúng.',
    objectives: [
      'Hiểu tam giác cháy và nguyên lý dập cháy.',
      'Biết phân loại bình chữa cháy và trường hợp không dùng nước.',
      'Nắm cách sử dụng bình chữa cháy và xử lý khi có cháy.',
    ],
    theory: [
      { h: 'Tam giác cháy' },
      { p: 'Một đám cháy cần đủ ba yếu tố: chất cháy (nhiên liệu), oxy và nhiệt độ đủ cao. Đó là "tam giác cháy". Loại bỏ bất kỳ một yếu tố nào thì đám cháy sẽ tắt.' },
      { h: 'Nguyên lý dập cháy' },
      { ul: [
        'Bỏ nhiệt: phun nước làm nguội (với cháy chất rắn thông thường).',
        'Bỏ oxy: dùng chăn, bình CO₂ phủ ngọn lửa.',
        'Bỏ nhiên liệu: cô lập, di chuyển chất cháy đi.',
      ]},
      { h: 'Phân loại bình chữa cháy' },
      { p: 'Bình bột ABC dùng đa năng cho cháy chất rắn (A), lỏng (B) và khí (C). Đặc biệt: KHÔNG dùng nước cho cháy điện vì nước dẫn điện gây giật — phải dùng bình CO₂ hoặc bình bột.' },
      { h: 'Cách dùng bình và xử lý cháy' },
      { p: 'Nhớ quy tắc PASS: Pull (rút chốt) – Aim (ngắm vào gốc lửa) – Squeeze (bóp cò) – Sweep (quét qua lại). Khi có cháy lớn: hô báo động, gọi 114, di tản theo lối thoát hiểm, không dùng thang máy.' },
      { note: 'Phun vào gốc lửa chứ không phun lên ngọn lửa — phải cắt đứt nguồn cháy ở chân thì lửa mới tắt.' },
    ],
    examples: [
      { q: 'Tủ điện trong xưởng bốc cháy. Có được dùng nước dập không?', a: 'Tuyệt đối không. Nước dẫn điện, dội nước vào cháy điện có thể gây điện giật và lan cháy. Phải ngắt điện rồi dùng bình CO₂ hoặc bình bột.' },
      { q: 'Giải thích vì sao trùm chăn ướt lên chảo dầu cháy lại dập được lửa.', a: 'Vì chăn ngăn oxy tiếp xúc với ngọn lửa — loại bỏ yếu tố oxy trong tam giác cháy, nên lửa tắt. Lưu ý không dùng nước cho dầu cháy vì sẽ làm dầu bắn và lan lửa.' },
    ],
  },

  'H10CN-w22-quiz': {
    topic: 'Vệ sinh và bảo trì máy móc',
    intro: 'Máy móc cũng như cơ thể, cần "chăm sóc" định kỳ. Tuần này các em học bảo trì máy — đặc biệt là bảo trì phòng ngừa để tránh hỏng hóc bất ngờ.',
    objectives: [
      'Hiểu khái niệm bảo trì và bảo trì phòng ngừa.',
      'Biết tác dụng của bôi trơn và vệ sinh máy.',
      'Nắm cách xử lý khi máy có dấu hiệu bất thường.',
    ],
    theory: [
      { h: 'Bảo trì máy là gì?' },
      { p: 'Bảo trì là các hoạt động kiểm tra, vệ sinh, bôi trơn và thay phụ tùng nhằm duy trì máy hoạt động tốt và kéo dài tuổi thọ.' },
      { h: 'Bảo trì phòng ngừa' },
      { p: 'Bảo trì phòng ngừa (preventive maintenance) là làm bảo trì theo lịch định kỳ TRƯỚC khi máy hỏng, thay vì chờ máy hỏng mới sửa. Cách này tránh dừng máy đột xuất, tiết kiệm hơn nhiều.' },
      { h: 'Bôi trơn và vệ sinh' },
      { ul: [
        'Bôi trơn: dầu mỡ làm giảm ma sát, giảm mài mòn và sinh nhiệt giữa các bề mặt chuyển động.',
        'Vệ sinh sau mỗi ca: giúp phát hiện sớm hư hỏng, rò rỉ và tránh tích phoi gây kẹt máy.',
      ]},
      { h: 'Xử lý dấu hiệu bất thường' },
      { p: 'Khi máy phát tiếng kêu lạ, rung mạnh hay nóng bất thường, phải tắt máy kiểm tra ngay vì đó thường là dấu hiệu hỏng hóc. Phoi cắt phải gom vào thùng riêng, có thể tái chế, không để bừa gây tai nạn.' },
      { note: '"Phòng bệnh hơn chữa bệnh": một giờ bảo trì phòng ngừa có thể tiết kiệm nhiều ngày dừng sản xuất vì máy hỏng nặng.' },
    ],
    examples: [
      { q: 'Vì sao bảo trì phòng ngừa lại rẻ hơn sửa chữa sau khi hỏng?', a: 'Vì hỏng đột xuất thường kéo theo dừng cả dây chuyền, hư hỏng lan sang chi tiết khác và chi phí sửa lớn. Bảo trì theo lịch phát hiện và xử lý vấn đề khi còn nhỏ.' },
      { q: 'Máy phay phát ra tiếng rít lạ giữa ca. Em xử lý thế nào?', a: 'Tắt máy ngay và kiểm tra. Tiếng rít có thể do thiếu bôi trơn, dao mòn hay vòng bi hỏng. Không cố chạy tiếp vì dễ làm hỏng nặng hơn và mất an toàn.' },
    ],
  },

  'H10CN-w23-quiz': {
    topic: 'Dụng cụ cầm tay trong cơ khí',
    intro: 'Trước khi dùng máy lớn, người thợ phải thạo dụng cụ cầm tay. Tuần này các em học dụng cụ đo (thước cặp, panme) và dụng cụ thao tác (cưa, dũa, búa, kìm).',
    objectives: [
      'Kể được các dụng cụ đo và độ chính xác của chúng.',
      'Biết công dụng của thước cặp và panme.',
      'Nắm công dụng của các dụng cụ cắt và thao tác cầm tay.',
    ],
    theory: [
      { h: 'Dụng cụ đo' },
      { ul: [
        'Thước thẳng: đo kích thước thô, độ chính xác thấp.',
        'Thước cặp (caliper): đo kích thước ngoài, trong và độ sâu; độ chính xác khoảng 0,02–0,05 mm.',
        'Panme (micrometer): đo chính xác hơn, thường đạt 0,01 mm; dùng đo đường kính trục, độ dày tấm.',
      ]},
      { h: 'Thước cặp đo được gì?' },
      { p: 'Thước cặp đo cả ba: kích thước ngoài (bằng hàm chính), kích thước trong của lỗ (bằng hàm phụ phía trên) và độ sâu (bằng cây thăm sâu ở đuôi thước).' },
      { h: 'Dụng cụ cắt và thao tác' },
      { ul: [
        'Cưa sắt, dũa, đục: cắt và làm phẳng kim loại bằng tay.',
        'Búa: gõ đập, đóng/nhổ đinh, gò kim loại.',
        'Kìm: kẹp giữ, cắt dây, uốn — có nhiều loại (mỏ nhọn, mỏ bằng, kìm cắt).',
      ]},
      { note: 'Chọn dụng cụ đo theo độ chính xác cần thiết: đo thô dùng thước thẳng, đo lắp ghép chính xác dùng panme.' },
    ],
    examples: [
      { q: 'Cần đo đường kính một trục với độ chính xác 0,01 mm. Dùng thước thẳng có được không?', a: 'Không. Thước thẳng chỉ chính xác tới khoảng nửa milimét. Phải dùng panme (độ chính xác 0,01 mm) hoặc ít nhất là thước cặp để đo đường kính trục chính xác.' },
      { q: 'Một bạn dùng kìm thay cho cờ-lê để vặn đai ốc. Có nên không?', a: 'Không nên. Kìm dễ làm tròn cạnh đai ốc và trượt gây thương tích. Mỗi dụng cụ có công dụng riêng: vặn đai ốc phải dùng cờ-lê hoặc khẩu đúng cỡ.' },
    ],
  },

  'H10CN-w24-quiz': {
    topic: 'Mối ghép trong cơ khí',
    intro: 'Các chi tiết phải nối với nhau bằng cách nào đó. Tuần này các em học mối ghép cố định (hàn, ren, đinh tán) và mối ghép động (bản lề, ổ trượt, ổ lăn).',
    objectives: [
      'Phân biệt mối ghép cố định và mối ghép động.',
      'Biết đặc điểm của mối ghép ren, đinh tán, hàn.',
      'Hiểu vai trò của ổ lăn (vòng bi).',
    ],
    theory: [
      { h: 'Mối ghép cố định' },
      { p: 'Mối ghép cố định giữ các chi tiết bất động tương đối với nhau. Gồm: hàn (nung chảy, vĩnh viễn), ren — bu lông/đai ốc/vít (tháo lắp được), đinh tán (vĩnh viễn) và keo dán.' },
      { h: 'Mối ghép động' },
      { p: 'Mối ghép động cho phép các chi tiết chuyển động tương đối với nhau, ví dụ bản lề (xoay), ổ trượt và ổ lăn (đỡ trục quay).' },
      { h: 'Ren — đinh tán — hàn' },
      { ul: [
        'Ren tam giác hệ mét (M) phổ biến nhất, ví dụ M6, M10; ưu điểm là tháo lắp được.',
        'Đinh tán (rivet): mối ghép vĩnh viễn, không tháo lắp được trừ khi phá huỷ.',
        'Hàn: nối bằng nung chảy kim loại, mối liền và bền nhưng khó tháo.',
      ]},
      { h: 'Ổ lăn (vòng bi)' },
      { p: 'Ổ lăn dùng các viên bi hoặc con lăn để giảm ma sát giữa trục quay và ổ đỡ, giúp trục quay nhẹ, êm và lâu mòn.' },
      { note: 'Chọn mối ghép theo nhu cầu: cần tháo lắp để bảo trì thì dùng ren; cần liền khối, chịu lực lớn thì hàn hoặc đinh tán.' },
    ],
    examples: [
      { q: 'Nắp máy cần mở ra thường xuyên để bảo trì. Nên ghép bằng bu lông hay hàn?', a: 'Nên dùng bu lông (mối ghép ren), vì có thể tháo lắp nhiều lần để bảo trì. Hàn sẽ tạo mối liền không tháo được, không phù hợp.' },
      { q: 'Vì sao bánh xe lắp trên trục cần có vòng bi?', a: 'Vì vòng bi (ổ lăn) giảm ma sát giữa trục và ổ, giúp bánh quay nhẹ và êm, ít hao mòn và ít tốn năng lượng so với để trục cọ trực tiếp.' },
    ],
  },

  'H10CN-w25-quiz': {
    topic: 'Truyền động cơ khí',
    intro: 'Làm sao chuyển động từ động cơ đến bánh xe? Tuần này các em học các bộ truyền động: đai, xích, bánh răng — và cách tính tỉ số truyền.',
    objectives: [
      'Hiểu khái niệm truyền động cơ khí.',
      'Phân biệt truyền động đai, xích, bánh răng và ứng dụng.',
      'Tính được tỉ số truyền của bộ bánh răng.',
    ],
    theory: [
      { h: 'Truyền động cơ khí là gì?' },
      { p: 'Truyền động cơ khí là việc truyền chuyển động và lực (mô men) từ chi tiết dẫn (trục chủ động) sang chi tiết bị dẫn (trục bị động).' },
      { h: 'Các loại truyền động' },
      { ul: [
        'Truyền động đai (belt): đai phẳng, đai chữ V — êm, dùng cho máy may, quạt, động cơ ô tô.',
        'Truyền động xích (chain): khoẻ, không trượt — dùng cho xe đạp, xe máy, máy nông nghiệp.',
        'Truyền động bánh răng (gear): cho tỉ số truyền chính xác — dùng cho hộp số ô tô.',
      ]},
      { h: 'Tỉ số truyền của bánh răng' },
      { p: 'Với hai bánh răng ăn khớp, tỉ số truyền i = n₁/n₂ = Z₂/Z₁, trong đó n là số vòng quay, Z là số răng. Bánh nhỏ (ít răng) quay nhanh, bánh lớn (nhiều răng) quay chậm nhưng mô men lớn.' },
      { h: 'Vì sao ô tô cần hộp số?' },
      { p: 'Hộp số dùng các cặp bánh răng khác nhau để thay đổi tỉ số truyền: số thấp cho mô men lớn khi khởi động/leo dốc, số cao cho tốc độ cao khi chạy nhanh.' },
      { note: 'Đai có thể trượt khi quá tải (an toàn cho máy), còn bánh răng cho tỉ số chính xác không trượt — mỗi loại có chỗ dùng riêng.' },
    ],
    examples: [
      { q: 'Bánh răng dẫn có 20 răng, bánh bị dẫn có 60 răng. Tính tỉ số truyền và cho biết bánh nào quay nhanh hơn.', a: 'i = Z₂/Z₁ = 60/20 = 3. Tỉ số truyền là 3:1. Bánh dẫn (20 răng) quay nhanh gấp 3 lần bánh bị dẫn (60 răng), bù lại bánh bị dẫn có mô men lớn hơn.' },
      { q: 'Vì sao xe đạp dùng xích chứ không dùng đai?', a: 'Vì xích không trượt, truyền lực chắc chắn từ bàn đạp tới bánh sau ngay cả khi đạp mạnh lên dốc. Đai có thể trượt và truyền lực kém hơn trong trường hợp này.' },
    ],
  },

  'H10CN-w26-quiz': {
    topic: 'Động cơ và năng lượng',
    intro: 'Cái gì làm máy móc chuyển động? Tuần này các em học về động cơ — điện và đốt trong — cùng xu hướng năng lượng tái tạo.',
    objectives: [
      'Hiểu khái niệm động cơ và nguyên lý động cơ điện.',
      'Nắm bốn kỳ của động cơ đốt trong.',
      'Phân biệt động cơ xăng, diesel và biết các nguồn năng lượng tái tạo.',
    ],
    theory: [
      { h: 'Động cơ là gì?' },
      { p: 'Động cơ là máy biến đổi một dạng năng lượng (điện, nhiệt, gió, nước) thành cơ năng — chuyển động quay hoặc tịnh tiến để làm việc.' },
      { h: 'Động cơ điện' },
      { p: 'Động cơ điện hoạt động dựa trên lực điện từ tác dụng lên dây dẫn có dòng điện đặt trong từ trường, làm rôto quay. Động cơ điện sạch, êm, hiệu suất cao nên đang phát triển nhanh (xe điện).' },
      { h: 'Động cơ đốt trong' },
      { p: 'Động cơ đốt trong bốn kỳ hoạt động theo chu trình: Hút – Nén – Nổ (sinh công) – Xả. Động cơ xăng (Otto) dùng bugi đánh lửa; động cơ diesel nén mạnh để nhiên liệu tự bốc cháy.' },
      { h: 'Năng lượng tái tạo' },
      { ul: [
        'Mặt trời, gió, thuỷ điện, sinh khối, địa nhiệt.',
        'Sạch, không cạn kiệt, giảm phát thải so với nhiên liệu hoá thạch.',
        'Là hướng đi của giao thông và sản xuất tương lai.',
      ]},
      { note: 'Xu hướng chung là chuyển dần từ động cơ đốt trong (phát thải) sang động cơ điện dùng năng lượng tái tạo, vì môi trường và hiệu suất.' },
    ],
    examples: [
      { q: 'Trong bốn kỳ của động cơ đốt trong, kỳ nào sinh ra công?', a: 'Kỳ Nổ (cháy giãn nở). Hỗn hợp nhiên liệu cháy, áp suất tăng đẩy pít-tông đi xuống, sinh ra công làm quay trục khuỷu. Ba kỳ còn lại chuẩn bị và làm sạch cho kỳ này.' },
      { q: 'Vì sao xe điện được coi là sạch hơn xe xăng?', a: 'Vì động cơ điện không đốt nhiên liệu nên không phát thải khí độc tại chỗ, hiệu suất cao và êm. Nếu điện đến từ nguồn tái tạo (mặt trời, gió) thì cả vòng đời cũng sạch hơn.' },
    ],
  },

  'H10CN-w27-quiz': {
    topic: 'Bảo dưỡng và sửa chữa',
    intro: 'Sản phẩm cơ khí cần được chăm sóc suốt vòng đời. Tuần này các em học bảo dưỡng định kỳ và quy trình sửa chữa an toàn, lấy ô tô làm ví dụ điển hình.',
    objectives: [
      'Biết các hạng mục bảo dưỡng định kỳ của ô tô.',
      'Nắm quy trình sửa chữa và xử lý sự cố an toàn.',
      'Hiểu vai trò của hồ sơ bảo dưỡng.',
    ],
    theory: [
      { h: 'Bảo dưỡng định kỳ' },
      { p: 'Bảo dưỡng định kỳ ô tô gồm: thay dầu nhớt và lọc dầu, kiểm tra/thay lọc gió, lọc nhiên liệu, kiểm tra phanh, lốp, đèn, nước làm mát. Dầu nhớt động cơ thường thay sau 5.000–10.000 km tuỳ loại.' },
      { h: 'Khi nào thay lốp?' },
      { p: 'Lốp cần thay khi mòn hết gai (độ sâu gai dưới 1,6 mm), bị nứt vỡ, phồng, hoặc đã già hoá quá khoảng 6 năm dù còn gai, vì cao su bị lão hoá mất an toàn.' },
      { h: 'Quy trình sửa chữa an toàn' },
      { ul: [
        'Tắt máy, ngắt nguồn điện trước khi sửa.',
        'Mặc PPE, dùng dụng cụ phù hợp.',
        'Chẩn đoán đúng nguyên nhân trước khi sửa, tránh sửa mò.',
      ]},
      { h: 'Hồ sơ bảo dưỡng' },
      { p: 'Hồ sơ (logbook) ghi lại lịch sử bảo dưỡng, sửa chữa giúp theo dõi tình trạng máy, dự báo hỏng hóc và lập kế hoạch bảo trì hợp lý.' },
      { note: 'Chẩn đoán đúng nguyên nhân trước khi sửa giúp tiết kiệm thời gian, tiền bạc và tránh thay nhầm phụ tùng.' },
    ],
    examples: [
      { q: 'Một xe chạy 8.000 km chưa thay dầu nhớt. Có cần thay không?', a: 'Tuỳ loại dầu, nhưng 8.000 km đã nằm trong khoảng khuyến cáo 5.000–10.000 km nên thường đã đến hạn thay. Dầu cũ mất tác dụng bôi trơn, để lâu gây mài mòn động cơ.' },
      { q: 'Đèn báo phanh sáng. Nên làm gì trước khi sửa?', a: 'Chẩn đoán nguyên nhân: kiểm tra mức dầu phanh, độ mòn má phanh, cảm biến. Xác định đúng nguyên nhân rồi mới sửa, không nên thay phụ tùng một cách mò mẫm.' },
    ],
  },

  'H10CN-w28-quiz': {
    topic: 'Sản phẩm cơ khí trong đời sống',
    intro: 'Tuần này các em nhìn quanh mình: cơ khí có mặt khắp nơi, từ chiếc xe đạp, ô tô đến robot hút bụi và máy y tế.',
    objectives: [
      'Nhận biết các sản phẩm cơ khí trong gia đình và giao thông.',
      'Biết các bộ phận, hệ thống chính của xe đạp, ô tô.',
      'Hiểu vai trò của cơ khí trong y tế và đời sống hiện đại.',
    ],
    theory: [
      { h: 'Cơ khí gia dụng' },
      { p: 'Trong gia đình, sản phẩm cơ khí có khắp nơi: tủ lạnh, máy giặt, quạt, máy xay, nồi cơm điện — đều có động cơ, cơ cấu truyền động, vỏ kim loại.' },
      { h: 'Phương tiện giao thông' },
      { ul: [
        'Xe đạp: khung, bánh xe, bộ truyền xích, phanh, ghi đông, yên.',
        'Ô tô: động cơ, hệ truyền lực (hộp số), hệ lái, hệ phanh, hệ treo, hệ điện và an toàn.',
        'Xe máy điện: sạch, êm, ít bảo dưỡng nhưng cần sạc pin.',
      ]},
      { h: 'Robot và cơ khí y tế' },
      { p: 'Robot hút bụi, lau nhà đang phổ biến trong gia đình. Trong y tế, cơ khí tạo ra máy MRI, CT, X-quang, máy thở, ghế nha khoa, dụng cụ phẫu thuật — cứu sống và chăm sóc con người.' },
      { note: 'Hãy thử "mổ xẻ" một thiết bị quanh em trong đầu: nó dùng động cơ gì, truyền động kiểu gì, vật liệu gì — đó là tư duy của người làm cơ khí.' },
    ],
    examples: [
      { q: 'Kể tên các hệ thống chính của một chiếc ô tô.', a: 'Động cơ (sinh công), hệ truyền lực/hộp số (truyền tới bánh), hệ lái (điều hướng), hệ phanh (giảm tốc), hệ treo (giảm xóc), hệ điện và các hệ thống an toàn. Mỗi hệ là một mảng cơ khí.' },
      { q: 'Xe máy điện có ưu và nhược điểm gì so với xe xăng?', a: 'Ưu: sạch, êm, ít bộ phận chuyển động nên ít bảo dưỡng. Nhược: phụ thuộc pin (thời gian sạc, quãng đường giới hạn, tuổi thọ pin). Tổng thể phù hợp di chuyển trong đô thị.' },
    ],
  },

  'H10CN-w29-quiz': {
    topic: 'Dự án thiết kế kỹ thuật',
    intro: 'Đây là tuần các em vận dụng tất cả: thực hiện một dự án thiết kế kỹ thuật từ đầu đến cuối, có báo cáo và đánh giá.',
    objectives: [
      'Nắm trình tự thực hiện một dự án thiết kế kỹ thuật.',
      'Biết các tiêu chí đánh giá và vai trò của vòng lặp cải tiến.',
      'Biết cấu trúc một báo cáo dự án.',
    ],
    theory: [
      { h: 'Khởi đầu một dự án' },
      { p: 'Dự án thiết kế bắt đầu bằng câu hỏi: "Vấn đề gì cần giải quyết?". Phải làm rõ nhu cầu và mục tiêu trước, không vội vẽ hay chế tạo.' },
      { h: 'Các bước tiếp theo' },
      { ul: [
        'Nghiên cứu các giải pháp đã có để tham khảo, tránh "phát minh lại bánh xe".',
        'Lên ý tưởng, chọn phương án, thiết kế chi tiết và làm mẫu thử.',
        'Thử nghiệm, thu phản hồi, so sánh với tiêu chí.',
      ]},
      { h: 'Tiêu chí và vòng lặp' },
      { p: 'Tiêu chí đánh giá thiết kế gồm: chức năng, an toàn, kinh tế, thẩm mỹ và bền vững với môi trường. Iteration (vòng lặp) nghĩa là cải tiến qua nhiều vòng thử–đánh giá–sửa, vì thiết kế hiếm khi đúng ngay lần đầu.' },
      { h: 'Báo cáo dự án' },
      { p: 'Báo cáo cần trình bày: vấn đề và mục tiêu, quá trình thực hiện, giải pháp/sản phẩm, kết quả thử nghiệm và bài học rút ra.' },
      { note: 'Một dự án tốt không chỉ ở sản phẩm cuối, mà ở việc ghi lại được mình đã suy nghĩ, thử, sai và sửa thế nào.' },
    ],
    examples: [
      { q: 'Nhóm thiết kế hộp đựng bút có sạc điện thoại. Tiêu chí nào cần đặt ra?', a: 'Chức năng (đựng bút và sạc được), an toàn (sạc không nóng quá, không hở điện), kinh tế (giá vật liệu hợp lý), thẩm mỹ (gọn đẹp trên bàn), bền vững (vật liệu tái chế nếu được).' },
      { q: '"Iteration" trong dự án nghĩa là gì? Cho ví dụ.', a: 'Là lặp lại cải tiến nhiều vòng. Ví dụ: mẫu 1 quá nặng → giảm vật liệu thành mẫu 2 → mẫu 2 lung lay → thêm gân chịu lực thành mẫu 3. Mỗi vòng sửa một nhược điểm.' },
    ],
  },

  'H10CN-w30-quiz': {
    topic: 'Nghề cơ khí ở Việt Nam',
    intro: 'Tuần này các em tìm hiểu ngành cơ khí ở Việt Nam: cơ hội việc làm, nơi đào tạo và những kỹ năng cần có để thành công.',
    objectives: [
      'Hiểu vị trí của ngành cơ khí trong nền kinh tế Việt Nam.',
      'Biết các lĩnh vực và nơi đào tạo cơ khí.',
      'Nắm các kỹ năng cần thiết của kỹ sư cơ khí.',
    ],
    theory: [
      { h: 'Cơ khí — ngành nền tảng' },
      { p: 'Cơ khí là ngành cơ bản, nền tảng cho mọi ngành công nghiệp chế tạo. Ở Việt Nam, cơ khí phát triển trong chế tạo, lắp ráp (ô tô, xe máy), sửa chữa và công nghiệp hỗ trợ.' },
      { h: 'Cơ hội việc làm' },
      { p: 'Nhu cầu nhân lực cơ khí lớn, đặc biệt từ các doanh nghiệp FDI như Samsung, Honda, Toyota. Học sinh giỏi cơ khí có nhiều cơ hội việc làm và phát triển.' },
      { h: 'Nơi đào tạo' },
      { ul: [
        'Đại học Bách khoa Hà Nội, Bách khoa TP.HCM, Bách khoa Đà Nẵng.',
        'Đại học Cần Thơ, Đại học Công nghiệp và các trường cao đẳng kỹ thuật.',
      ]},
      { h: 'Kỹ năng cần có' },
      { p: 'Kỹ sư cơ khí cần kiến thức kỹ thuật vững (Toán, Lý, vẽ kỹ thuật), ngoại ngữ (đọc tài liệu, làm việc với DN FDI), kỹ năng làm việc nhóm và tư duy sáng tạo. Lương tăng theo kinh nghiệm và năng lực.' },
      { note: 'Có ngoại ngữ tốt cộng với tay nghề kỹ thuật vững là lợi thế lớn để vào các doanh nghiệp FDI với thu nhập cao.' },
    ],
    examples: [
      { q: 'Vì sao kỹ sư cơ khí ở Việt Nam cần giỏi tiếng Anh?', a: 'Vì nhiều tài liệu kỹ thuật, phần mềm CAD/CAM và tiêu chuẩn quốc tế dùng tiếng Anh; lại làm việc nhiều với doanh nghiệp FDI (Samsung, Honda...). Giỏi tiếng Anh giúp tiếp cận công nghệ mới và cơ hội tốt hơn.' },
      { q: 'Một bạn học giỏi Toán, Lý và thích lắp ráp máy móc. Ngành cơ khí có phù hợp không?', a: 'Rất phù hợp. Cơ khí cần nền Toán, Lý vững và niềm yêu thích máy móc. Bạn nên rèn thêm vẽ kỹ thuật, tin học và tiếng Anh, tham gia CLB robotics để phát triển.' },
    ],
  },

  'H10CN-w31-quiz': {
    topic: 'Cơ khí và môi trường',
    intro: 'Sản xuất cơ khí cũng tác động đến môi trường. Tuần này các em học cách làm cơ khí "xanh" hơn: sản xuất sạch, tái chế và kinh tế tuần hoàn.',
    objectives: [
      'Nhận biết tác động môi trường của sản xuất cơ khí.',
      'Hiểu khái niệm sản xuất sạch hơn và lợi ích tái chế kim loại.',
      'Hiểu nguyên lý kinh tế tuần hoàn trong cơ khí.',
    ],
    theory: [
      { h: 'Tác động môi trường' },
      { p: 'Sản xuất cơ khí tiêu thụ nhiều điện, nước, phát thải khí CO₂, NOx và sinh chất thải như dầu mỡ, phoi kim loại, hoá chất. Nếu không quản lý tốt sẽ gây ô nhiễm.' },
      { h: 'Sản xuất sạch hơn' },
      { p: 'Sản xuất sạch hơn (cleaner production) là tối ưu quy trình để giảm chất thải và năng lượng ngay tại nguồn, thay vì chỉ xử lý ô nhiễm sau khi đã phát sinh.' },
      { h: 'Tái chế kim loại' },
      { p: 'Tái chế kim loại tiết kiệm nguyên liệu thô và tốn ít năng lượng hơn nhiều so với sản xuất từ quặng mới. Ví dụ tái chế nhôm chỉ tốn một phần nhỏ năng lượng so với luyện nhôm từ quặng.' },
      { h: 'Kinh tế tuần hoàn' },
      { ul: [
        'Thiết kế sản phẩm để tái sử dụng, tái chế, tái sản xuất.',
        'Dùng vật liệu thân thiện: composite sinh học, vật liệu tái chế.',
        'Tiết kiệm năng lượng: động cơ hiệu suất cao, biến tần, bảo trì tốt.',
      ]},
      { note: 'Kinh tế tuần hoàn biến "rác" của quy trình này thành "nguyên liệu" của quy trình khác, thay cho mô hình khai thác – dùng – vứt bỏ.' },
    ],
    examples: [
      { q: 'Vì sao tái chế nhôm lon nước ngọt lại có lợi cho môi trường?', a: 'Vì tái chế nhôm tốn rất ít năng lượng so với luyện nhôm từ quặng bô-xít, lại giảm khai thác tài nguyên và giảm rác thải. Nhôm có thể tái chế nhiều lần mà không mất chất lượng.' },
      { q: 'Phân biệt "sản xuất sạch hơn" với "xử lý chất thải cuối đường ống".', a: 'Sản xuất sạch hơn ngăn chất thải phát sinh ngay từ quy trình (tối ưu, giảm hao phí). Xử lý cuối đường ống là làm sạch chất thải sau khi đã sinh ra. Cách đầu chủ động và hiệu quả hơn.' },
    ],
  },

  'H10CN-w32-quiz': {
    topic: 'Công nghệ in 3D và cách mạng cơ khí',
    intro: 'In 3D đang thay đổi cách con người chế tạo. Tuần này các em tìm hiểu công nghệ in 3D (additive manufacturing) và những ứng dụng đột phá của nó.',
    objectives: [
      'Hiểu nguyên lý in 3D (sản xuất bồi đắp).',
      'Biết vật liệu in 3D và ưu, nhược điểm.',
      'Nắm các ứng dụng của in 3D trong y tế, hàng không.',
    ],
    theory: [
      { h: 'In 3D là gì?' },
      { p: 'In 3D (additive manufacturing — sản xuất bồi đắp) tạo ra vật thể bằng cách THÊM vật liệu theo từng lớp dựa trên mô hình số, khác với gia công cắt gọt là LẤY ĐI vật liệu.' },
      { h: 'Vật liệu in 3D' },
      { p: 'Vật liệu phổ biến: nhựa (PLA, ABS, PETG), nhựa nylon, resin lỏng, và cả kim loại (titan, thép, nhôm) cho in 3D công nghiệp.' },
      { h: 'Ưu và nhược điểm' },
      { ul: [
        'Ưu: tạo được hình dạng rất phức tạp, làm prototype nhanh, sản phẩm tuỳ chỉnh cá nhân hoá.',
        'Nhược: chậm khi sản xuất hàng loạt, chi phí vật liệu cao, độ bền chưa bằng đúc/rèn.',
      ]},
      { h: 'Ứng dụng nổi bật' },
      { p: 'Y tế: in răng giả, khớp háng, dụng cụ và mô hình giải phẫu, thậm chí in mô. Hàng không: in chi tiết titan/nhôm phức tạp, nhẹ, giảm trọng lượng máy bay.' },
      { note: 'In 3D mạnh ở chi tiết phức tạp, đơn chiếc hoặc số lượng nhỏ tuỳ chỉnh; còn sản xuất hàng loạt số lượng lớn thì đúc và gia công truyền thống vẫn rẻ và nhanh hơn.' },
    ],
    examples: [
      { q: 'Vì sao in 3D phù hợp làm prototype hơn là sản xuất hàng loạt 100.000 chi tiết?', a: 'Vì in 3D tạo nhanh một mẫu phức tạp mà không cần khuôn, lý tưởng cho prototype. Nhưng in từng lớp rất chậm, nên làm 100.000 chi tiết sẽ tốn thời gian và chi phí hơn nhiều so với đúc khuôn.' },
      { q: 'In 3D khác gia công cắt gọt ở điểm cốt lõi nào?', a: 'In 3D là bồi đắp — thêm vật liệu theo lớp để tạo hình. Cắt gọt (tiện, phay) là loại bỏ — lấy đi vật liệu thừa từ phôi. Một bên cộng vào, một bên trừ đi.' },
    ],
  },

  'H10CN-w33-quiz': {
    topic: 'Cơ khí thông minh — Industry 4.0',
    intro: 'Tuần này các em bước vào tương lai gần: cơ khí thông minh trong cuộc cách mạng công nghiệp 4.0, với digital twin, IoT, AI và cobot.',
    objectives: [
      'Hiểu các thành phần của Industry 4.0 trong cơ khí.',
      'Nắm khái niệm digital twin, IoT và vai trò của AI.',
      'Biết cobot là gì và xu hướng cơ khí thông minh.',
    ],
    theory: [
      { h: 'Industry 4.0 trong cơ khí' },
      { p: 'Industry 4.0 (công nghiệp 4.0) trong cơ khí kết hợp CNC, robot, IoT, AI, dữ liệu lớn và digital twin, vận hành dựa trên dữ liệu thời gian thực để tự động hoá và tối ưu sản xuất.' },
      { h: 'Digital twin và IoT' },
      { ul: [
        'Digital twin: bản sao số của một thiết bị hoặc sản phẩm thực, đồng bộ liên tục để giám sát và dự đoán.',
        'IoT: các cảm biến kết nối giám sát thiết bị 24/7, phát hiện hỏng sớm, hỗ trợ bảo trì dự báo.',
      ]},
      { h: 'Vai trò của AI' },
      { p: 'AI giúp dự báo hỏng hóc (predictive maintenance), tối ưu quy trình sản xuất và phát hiện lỗi sản phẩm tự động — giảm dừng máy và phế phẩm.' },
      { h: 'Cobot' },
      { p: 'Cobot (collaborative robot — robot cộng tác) là robot được thiết kế để làm việc an toàn BÊN CẠNH con người trong dây chuyền, hỗ trợ thay vì thay thế hoàn toàn người lao động.' },
      { note: 'Việt Nam đang đẩy mạnh tự động hoá và cơ khí thông minh để nâng năng suất và cạnh tranh trên thị trường quốc tế.' },
    ],
    examples: [
      { q: 'Digital twin giúp ích gì cho việc bảo trì một động cơ?', a: 'Bản sao số chạy song song với động cơ thật, nhận dữ liệu cảm biến để mô phỏng tình trạng. Nhờ đó có thể dự đoán khi nào chi tiết sắp hỏng và lên kế hoạch bảo trì trước, tránh dừng máy đột xuất.' },
      { q: 'Cobot khác robot công nghiệp truyền thống ở điểm nào?', a: 'Robot công nghiệp truyền thống thường làm việc trong lồng rào cách ly với người vì nguy hiểm. Cobot được thiết kế an toàn để làm việc trực tiếp bên cạnh con người, hỗ trợ các thao tác chung.' },
    ],
  },

  'H10CN-w34-quiz': {
    topic: 'Hướng nghiệp cơ khí',
    intro: 'Tuần này các em định hướng tương lai: học cơ khí ra làm gì, cần học giỏi môn nào, rèn kỹ năng gì và nên chuẩn bị từ bây giờ ra sao.',
    objectives: [
      'Biết các nơi làm việc và vị trí công việc của ngành cơ khí.',
      'Nắm các môn học và kỹ năng cần thiết cho cơ khí.',
      'Biết cách chuẩn bị từ bậc THPT để theo ngành cơ khí.',
    ],
    theory: [
      { h: 'Học cơ khí làm việc ở đâu?' },
      { p: 'Người học cơ khí có thể làm tại nhà máy ô tô, xe máy (Honda, Toyota), điện tử (Samsung), dầu khí, đóng tàu, hàng không và nhiều ngành chế tạo khác.' },
      { h: 'Các vị trí công việc' },
      { ul: [
        'Kỹ sư thiết kế, kỹ sư sản xuất.',
        'Kỹ sư bảo trì, kỹ sư kiểm soát chất lượng (QC).',
        'Nghiên cứu phát triển (R&D), quản lý dự án.',
      ]},
      { h: 'Học giỏi môn gì?' },
      { p: 'Cơ khí cần học vững Toán, Vật lí; thành thạo vẽ kỹ thuật, tin học (CAD) và ngoại ngữ. Bên cạnh đó là kỹ năng mềm: giao tiếp, làm việc nhóm, giải quyết vấn đề.' },
      { h: 'Chuẩn bị từ bây giờ' },
      { p: 'Học sinh quan tâm cơ khí nên tham gia câu lạc bộ robotics, tự tìm hiểu CAD và in 3D, đọc về xe, máy bay, máy móc, và rèn tư duy sáng tạo qua các dự án nhỏ.' },
      { note: 'Sáng tạo rất quan trọng, đặc biệt ở các vị trí R&D và thiết kế — đừng nghĩ cơ khí chỉ là "làm theo bản vẽ".' },
    ],
    examples: [
      { q: 'Một học sinh muốn làm kỹ sư R&D cơ khí. Em nên rèn những gì từ THPT?', a: 'Học vững Toán, Lý; làm quen vẽ kỹ thuật và CAD; rèn tiếng Anh; quan trọng nhất là tư duy sáng tạo và giải quyết vấn đề qua các dự án, CLB robotics, để sẵn sàng cho công việc nghiên cứu phát triển.' },
      { q: 'Vai trò của kỹ sư QC trong nhà máy cơ khí là gì?', a: 'QC (kiểm soát chất lượng) kiểm tra chi tiết, sản phẩm có đạt dung sai và tiêu chuẩn không, phát hiện và loại phế phẩm, đảm bảo chất lượng đầu ra ổn định trước khi giao khách hàng.' },
    ],
  },

  'H10CN-w35-quiz': {
    topic: 'Ôn tập cuối năm',
    intro: 'Các em ạ, kết thúc một năm học Công nghệ cơ khí, ta cùng nhìn lại toàn bộ hành trình: từ ngôn ngữ bản vẽ, thiết kế, vật liệu, gia công, an toàn cho đến cơ khí thông minh và hướng nghiệp.',
    objectives: [
      'Hệ thống được toàn bộ kiến thức cốt lõi cả năm.',
      'Liên hệ các khâu trong vòng đời một sản phẩm cơ khí.',
      'Củng cố ý thức an toàn và tư duy thiết kế.',
    ],
    theory: [
      { h: 'Toàn cảnh chương trình' },
      { p: 'Cả năm đi theo vòng đời một sản phẩm cơ khí: thiết kế → bản vẽ → vật liệu → gia công → lắp ráp → vận hành, bảo trì → tái chế.' },
      { h: 'Vẽ và thiết kế' },
      { ul: [
        'Vẽ kỹ thuật: ngôn ngữ chung; ba hình chiếu đứng–bằng–cạnh; ∅ đường kính, R bán kính; đơn vị mm.',
        'Thiết kế: quy trình xác định vấn đề → ý tưởng → mẫu thử → đánh giá → cải tiến (iteration).',
        'CAD–CAM–CNC: chuỗi thiết kế và sản xuất số.',
      ]},
      { h: 'Vật liệu và gia công' },
      { p: 'Kim loại đen (thép C<2,14%, gang), kim loại màu (đồng, nhôm, titan), phi kim (nhựa, cao su, gốm, composite). Gia công: đúc, cắt gọt (tiện/phay/khoan/mài), hàn, CNC, in 3D.' },
      { h: 'An toàn và tương lai' },
      { p: 'Luôn mặc đủ PPE, biết phòng cháy (tam giác cháy, PASS), bảo trì phòng ngừa. Tương lai cơ khí gắn với Industry 4.0: IoT, AI, digital twin, cobot và sản xuất bền vững.' },
      { note: 'Hãy nhớ: an toàn là số một, thiết kế là tư duy giải quyết vấn đề, và công nghệ luôn đổi mới — người làm cơ khí phải học suốt đời.' },
    ],
    examples: [
      { q: 'Mô tả ngắn vòng đời của một chiếc bánh răng từ thiết kế tới tái chế.', a: 'Thiết kế trên CAD → lập bản vẽ chi tiết → chọn thép → đúc/cắt phôi → phay răng bằng CNC → mài tinh → lắp vào hộp số → vận hành và bảo trì định kỳ → khi hết tuổi thọ, tái chế kim loại để dùng lại.' },
      { q: 'Vì sao nói "an toàn là số một" trong cơ khí?', a: 'Vì máy móc cơ khí có lực lớn, vật sắc nhọn, nhiệt và điện — một sơ suất có thể gây thương tật vĩnh viễn hay tử vong. Không sản phẩm hay tiến độ nào đáng đánh đổi bằng sức khoẻ và tính mạng con người.' },
    ],
  },

  'H10CN-w36-quiz': {
    topic: 'Kết thúc Công Nghệ 10 — Kỹ thuật và Nghề nghiệp trong tầm tay',
    intro: 'Công Nghệ 10 mở ra thế giới kỹ thuật cơ khí và điện tử — những ngành nghề xương sống của nền kinh tế công nghiệp. Hôm nay chúng ta tổng kết năm học và nhìn về lớp 11 với Công Nghệ điện.',
    objectives: [
      'Hệ thống hoá các kiến thức về cơ khí, vật liệu, quy trình chế tạo đã học.',
      'Nhận biết mối liên hệ giữa Công Nghệ 10 (cơ khí) và Công Nghệ 11 (điện-điện tử).',
      'Định hướng nghề nghiệp kỹ thuật phù hợp với năng lực và sở thích.',
    ],
    theory: [
      { h: 'Bức tranh toàn cảnh Công Nghệ 10' },
      { ul: [
        'Vật liệu kỹ thuật: kim loại (sắt, nhôm, đồng), phi kim (nhựa, cao su, gỗ) — tính chất và ứng dụng.',
        'Bản vẽ kỹ thuật: hình chiếu vuông góc, đọc và lập bản vẽ, ký hiệu tiêu chuẩn.',
        'Gia công cơ khí: tiện, phay, khoan, mài, hàn — quy trình từ phôi đến sản phẩm.',
        'Máy và cơ cấu: truyền động, bánh răng, xích đĩa, puli đai — nguyên lý hoạt động.',
        'Tự động hoá: robot công nghiệp, CNC, PLC — công nghiệp 4.0 trong sản xuất.',
      ] },
      { h: 'Cầu nối sang Công Nghệ 11 (Điện)' },
      { ul: [
        'Cơ cấu cơ khí → Hệ thống điện-cơ: động cơ điện, máy phát, biến thế — điện và cơ luôn đi cùng nhau.',
        'Vật liệu dẫn điện (đồng, nhôm) và cách điện (nhựa, cao su) — nền tảng từ lớp 10 được dùng ở lớp 11.',
        'Tự động hoá → Vi điều khiển, Arduino, điện tử số — công nghệ hội tụ cơ và điện.',
        'Bản vẽ kỹ thuật → Sơ đồ điện, ký hiệu linh kiện điện tử — cùng nguyên tắc đọc bản vẽ tiêu chuẩn.',
      ] },
      { h: 'Định hướng nghề nghiệp kỹ thuật' },
      { ul: [
        'Cơ khí chế tạo: thiết kế máy, sản xuất ô tô, hàng không vũ trụ — nhu cầu cao ở các khu công nghiệp.',
        'Cơ điện tử (Mechatronics): kết hợp cơ khí + điện tử + lập trình — ngành hot nhất trong sản xuất thông minh.',
        'Kỹ thuật ô tô: EV (xe điện) đang bùng nổ — cần kỹ sư hiểu cả cơ và điện.',
        'Tự động hoá công nghiệp: lập trình robot, PLC, SCADA — lương cao, thiếu nhân lực.',
      ] },
      { note: 'Kỹ thuật không phải chỉ dành cho người "khéo tay" — mà dành cho người biết suy nghĩ có hệ thống, kiên nhẫn với chi tiết và không ngại bẩn tay. Đó là em không?' },
    ],
    examples: [
      { q: 'Tại sao hiểu biết về vật liệu kỹ thuật từ lớp 10 lại quan trọng khi học điện ở lớp 11?', a: 'Vì linh kiện điện và dây điện đều làm từ vật liệu cụ thể: đồng dẫn điện tốt → dùng làm dây điện; nhựa PVC cách điện → dùng bọc dây; silicon bán dẫn → làm transistor và chip. Học sinh không hiểu vật liệu sẽ khó hiểu tại sao mạch điện được thiết kế như vậy — chỉ nhớ sơ đồ mà không hiểu bản chất.' },
      { q: 'Em quan tâm đến cơ khí hay điện tử hơn? Làm thế nào để biết mình phù hợp với hướng nào?', a: 'Cách đơn giản nhất: quan sát sở thích của bản thân. Em thích tháo rã máy móc xem bên trong hoạt động thế nào → thiên về cơ khí. Em thích lắp mạch điện, lập trình vi điều khiển, đọc sơ đồ điện → thiên về điện tử. Em thích cả hai → Cơ điện tử (Mechatronics) là lựa chọn lý tưởng. Nhưng thực ra ranh giới ngày càng mờ — kỹ sư hiện đại cần cả hai, nên lớp 11 hãy học điện thật tốt để cộng thêm vào nền cơ khí đã có.' },
    ],
  },
};
