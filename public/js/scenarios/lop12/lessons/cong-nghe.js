// ============================================================
// Lớp 12 · CÔNG NGHỆ — Lý thuyết theo tuần
// Định hướng CÔNG NGHỆ ĐIỆN - ĐIỆN TỬ (KNTT)
// HK1 (1–18): Công nghệ Điện. HK2 (19–35): Công nghệ Điện tử.
// Key trùng id quiz: "H12CN-wNN-quiz".
// ============================================================

export const H12CN_LESSONS = {
  // ──────────────── HK1 — Công nghệ Điện ────────────────
  'H12CN-w01-quiz': {
    topic: 'Giới thiệu chung về kĩ thuật điện',
    intro: 'Các em thân mến, mở đầu chương trình Công nghệ 12, chúng ta sẽ tìm hiểu kĩ thuật điện — lĩnh vực đứng sau mọi bóng đèn, động cơ và nhà máy quanh ta. Hiểu được dòng điện, điện áp và công suất là chìa khoá để học tốt cả năm.',
    objectives: [
      'Trình bày được khái niệm và phạm vi của kĩ thuật điện.',
      'Phân biệt được dòng điện một chiều (DC) và xoay chiều (AC).',
      'Tính được công suất điện và nêu thông số lưới điện sinh hoạt Việt Nam.',
    ],
    theory: [
      { h: 'Kĩ thuật điện là gì?' },
      { p: 'Kĩ thuật điện là lĩnh vực khoa học — kĩ thuật nghiên cứu và ứng dụng các hiện tượng điện — từ vào sản xuất và đời sống: từ sản xuất, truyền tải, phân phối điện năng đến điều khiển, tự động hoá và điện tử.' },
      { ul: [
        'Điện năng: sản xuất — truyền tải — phân phối — sử dụng điện.',
        'Điện tử: xử lí tín hiệu và thông tin bằng linh kiện bán dẫn.',
        'Tự động hoá: điều khiển máy móc, dây chuyền tự vận hành.',
        'Điện lạnh, điện dân dụng, điện công nghiệp…',
      ] },
      { h: 'Dòng điện một chiều và xoay chiều' },
      { p: 'Dòng điện một chiều (DC — Direct Current) có cường độ và chiều không đổi theo thời gian, ví dụ dòng từ pin, ắc-quy. Dòng điện xoay chiều (AC — Alternating Current) có cường độ và chiều biến thiên tuần hoàn theo thời gian, thường có dạng hình sin.' },
      { note: 'Lưới điện sinh hoạt Việt Nam là điện xoay chiều, điện áp 220V, tần số 50Hz. Nhớ kĩ hai con số này — chúng xuất hiện suốt cả học kì.' },
      { h: 'Công suất điện' },
      { p: 'Công suất điện cho biết mức tiêu thụ điện năng trong một đơn vị thời gian. Với dòng một chiều: P = U × I. Với dòng xoay chiều: P = U × I × cosφ, trong đó cosφ là hệ số công suất.' },
      { ul: [
        'P (W): công suất; U (V): điện áp; I (A): cường độ dòng điện.',
        'Điện năng tiêu thụ A = P × t, đơn vị thường dùng là kWh (số điện).',
      ] },
    ],
    examples: [
      { q: 'Một bàn là ghi 220V — 1100W. Cho biết ý nghĩa hai số này.', a: '220V là điện áp định mức (đúng bằng lưới sinh hoạt VN), 1100W là công suất định mức — mức điện tiêu thụ khi bàn là chạy đúng điện áp 220V.' },
      { q: 'Vì sao đèn pin dùng pin còn quạt trần cắm vào ổ điện?', a: 'Đèn pin dùng điện một chiều (DC) từ pin; quạt trần dùng điện xoay chiều (AC) 220V từ lưới điện. Mỗi thiết bị được thiết kế cho một loại dòng điện.' },
    ],
  },

  'H12CN-w02-quiz': {
    topic: 'Ngành nghề trong kĩ thuật điện',
    intro: 'Các em ơi, kĩ thuật điện không chỉ là kiến thức mà còn là con đường nghề nghiệp rộng mở. Hôm nay chúng ta cùng nhìn xem những ai làm nghề điện, họ cần kĩ năng gì và cơ hội ra sao.',
    objectives: [
      'Kể tên được một số ngành nghề trong lĩnh vực kĩ thuật điện.',
      'Nêu được yêu cầu kĩ năng và phẩm chất của người làm nghề điện.',
      'Có định hướng học tập phù hợp nếu yêu thích nghề điện.',
    ],
    theory: [
      { h: 'Các nhóm nghề trong kĩ thuật điện' },
      { ul: [
        'Kĩ sư điện: thiết kế, vận hành, bảo trì hệ thống điện công nghiệp và dân dụng.',
        'Kĩ thuật viên điện — điện tử: lắp đặt, đo lường, sửa chữa thiết bị.',
        'Thợ điện dân dụng: lắp đặt và sửa chữa điện trong nhà, toà nhà.',
        'Người vận hành nhà máy điện, trạm biến áp, đường dây truyền tải.',
      ] },
      { h: 'Yêu cầu của nghề' },
      { p: 'Người làm nghề điện cần kiến thức nền Toán — Vật lí vững, đọc được bản vẽ và sơ đồ mạch, sử dụng thành thạo dụng cụ đo (đồng hồ vạn năng), và đặc biệt tuân thủ nghiêm ngặt quy tắc an toàn lao động.' },
      { note: 'An toàn là số một: luôn ngắt điện trước khi sửa chữa, trang bị bảo hộ và kiểm tra kĩ trước khi thao tác. Một sai sót nhỏ với điện có thể nguy hiểm tính mạng.' },
      { h: 'Cơ hội nghề nghiệp tại Việt Nam' },
      { p: 'Nhu cầu nhân lực ngành điện ở nước ta rất lớn do quá trình công nghiệp hoá, phát triển năng lượng và bùng nổ năng lượng tái tạo (điện mặt trời, điện gió). Đây là nghề ổn định, triển vọng tốt.' },
      { h: 'Định hướng học tập' },
      { p: 'Học sinh yêu thích nghề điện nên chú trọng các môn Toán, Vật lí, Công nghệ và rèn luyện kĩ năng thực hành ngay từ phổ thông.' },
    ],
    examples: [
      { q: 'Bạn An giỏi Toán — Lí, thích lắp ráp mạch điện. Nên định hướng nghề nào?', a: 'An phù hợp với nghề kĩ sư điện hoặc kĩ thuật viên điện — điện tử. Nên duy trì thế mạnh Toán — Lí và rèn thêm kĩ năng thực hành, đọc bản vẽ.' },
      { q: 'Vì sao an toàn lao động được coi là phẩm chất bắt buộc của thợ điện?', a: 'Vì điện không nhìn thấy được nhưng có thể gây giật, cháy nổ chết người. Thợ điện phải có thói quen ngắt điện, dùng bảo hộ và kiểm tra trước khi làm — đây là kỉ luật nghề.' },
    ],
  },

  'H12CN-w03-quiz': {
    topic: 'Dòng điện xoay chiều ba pha',
    intro: 'Các em hãy hình dung lưới điện công nghiệp: nó không chỉ có một dòng mà tới ba dòng phối hợp nhịp nhàng. Đó là dòng xoay chiều ba pha — xương sống của truyền tải và động cơ công suất lớn.',
    objectives: [
      'Trình bày được khái niệm dòng điện xoay chiều ba pha.',
      'Phân biệt cách nối hình sao (Y) và tam giác (Δ).',
      'Vận dụng quan hệ giữa đại lượng dây và đại lượng pha.',
    ],
    theory: [
      { h: 'Dòng điện ba pha là gì?' },
      { p: 'Dòng điện xoay chiều ba pha gồm ba dòng điện xoay chiều cùng tần số, cùng biên độ nhưng lệch pha nhau 120° (một phần ba chu kì). Ba pha thường được kí hiệu A, B, C.' },
      { note: 'So với một pha, hệ ba pha truyền tải được công suất lớn, hiệu suất cao và rất phù hợp để vận hành động cơ ba pha — vì thế công nghiệp luôn dùng điện ba pha.' },
      { h: 'Hai cách nối: sao và tam giác' },
      { ul: [
        'Nối hình sao (Y): ba đầu cuối chập chung tạo điểm trung tính, có thể có dây trung tính N.',
        'Nối tam giác (Δ): các cuộn nối tiếp khép kín thành tam giác, không có dây trung tính.',
      ] },
      { h: 'Quan hệ dây — pha' },
      { p: 'Trong nối sao: điện áp dây U_d = √3 × U_pha; dòng dây bằng dòng pha. Trong nối tam giác: dòng dây I_d = √3 × I_pha; điện áp dây bằng điện áp pha.' },
      { note: 'Lưới hạ áp phổ biến ở Việt Nam là 3 pha 4 dây (3 dây pha + 1 dây trung tính), nối hình sao, cho điện áp dây 380V và điện áp pha 220V.' },
    ],
    examples: [
      { q: 'Một máy phát nối sao có điện áp pha 220V. Tính điện áp dây.', a: 'U_d = √3 × U_pha = √3 × 220 ≈ 380V. Đây chính là cặp số quen thuộc 380V/220V của lưới hạ áp Việt Nam.' },
      { q: 'Vì sao động cơ nhà máy thường dùng điện ba pha thay vì một pha?', a: 'Vì ba pha tạo từ trường quay tự nhiên giúp động cơ khởi động và chạy êm, truyền công suất lớn với hiệu suất cao, tiết kiệm dây dẫn so với cấp công suất tương đương bằng một pha.' },
    ],
  },

  'H12CN-w04-quiz': {
    topic: 'Hệ thống điện quốc gia',
    intro: 'Các em có bao giờ tự hỏi điện từ nhà máy thuỷ điện cách xa hàng trăm cây số làm sao về tới ổ cắm nhà mình? Câu trả lời nằm ở hệ thống điện quốc gia — một mạng lưới khổng lồ và rất tinh tế.',
    objectives: [
      'Mô tả được cấu trúc hệ thống điện quốc gia.',
      'Giải thích vì sao phải truyền tải điện ở điện áp cao.',
      'Nêu vai trò của máy biến áp tăng áp và hạ áp.',
    ],
    theory: [
      { h: 'Bốn khâu của hệ thống điện' },
      { ul: [
        'Nguồn: các nhà máy điện (thuỷ điện, nhiệt điện, điện gió, mặt trời…).',
        'Truyền tải: đường dây cao áp và siêu cao áp đưa điện đi xa.',
        'Phân phối: hạ áp và chia điện về các khu dân cư, nhà máy.',
        'Hộ tiêu thụ: gia đình, cơ quan, xí nghiệp.',
      ] },
      { h: 'Vì sao truyền tải ở điện áp cao?' },
      { p: 'Tổn hao công suất trên đường dây là P_hao = I²R. Khi tăng điện áp truyền tải, với cùng công suất thì dòng điện I giảm, nên tổn hao I²R giảm rất nhiều. Vì thế Việt Nam có đường dây 500kV Bắc — Nam để truyền tải đi xa.' },
      { note: 'Tần số lưới điện Việt Nam là 50Hz, giữ ổn định toàn hệ thống.' },
      { h: 'Vai trò của máy biến áp' },
      { p: 'Máy biến áp tăng áp đặt ngay sau nhà máy để nâng điện áp trước khi truyền tải. Máy biến áp hạ áp đặt ở các trạm phân phối gần hộ tiêu thụ, hạ điện áp về 380V/220V an toàn cho sử dụng.' },
    ],
    examples: [
      { q: 'Truyền cùng một công suất, đường dây 500kV tổn hao ít hơn hay nhiều hơn đường 220kV? Vì sao?', a: 'Ít hơn nhiều. Điện áp cao gấp hơn hai lần nên dòng điện nhỏ đi hơn hai lần; tổn hao I²R giảm theo bình phương, tức giảm khoảng năm lần.' },
      { q: 'Sắp xếp vị trí của máy biến áp tăng áp và hạ áp trong hệ thống.', a: 'Máy tăng áp đặt đầu nguồn (sau nhà máy điện) để nâng áp truyền tải; máy hạ áp đặt cuối tuyến (trạm phân phối) để hạ áp về 380V/220V cho hộ tiêu thụ.' },
    ],
  },

  'H12CN-w05-quiz': {
    topic: 'Sản xuất điện năng',
    intro: 'Các em ơi, điện không tự sinh ra — nó được biến đổi từ các dạng năng lượng khác. Hôm nay ta đi tham quan các loại nhà máy điện và hiểu xu hướng năng lượng sạch của đất nước.',
    objectives: [
      'Nêu được nguyên lí của các loại nhà máy điện phổ biến.',
      'Phân biệt năng lượng tái tạo và năng lượng hoá thạch.',
      'Hiểu xu hướng phát triển năng lượng của Việt Nam.',
    ],
    theory: [
      { h: 'Các loại nhà máy điện' },
      { ul: [
        'Thuỷ điện: nước từ hồ chảy xuống quay tua bin — máy phát (thuỷ năng → điện).',
        'Nhiệt điện than/khí: đốt nhiên liệu sinh hơi nước cao áp quay tua bin.',
        'Điện gió: động năng gió quay cánh quạt — máy phát.',
        'Điện mặt trời: pin quang điện biến quang năng thành điện năng.',
        'Điện hạt nhân: phản ứng phân hạch toả nhiệt → hơi nước → tua bin.',
      ] },
      { h: 'Năng lượng tái tạo' },
      { p: 'Năng lượng tái tạo là nguồn không cạn kiệt và ít phát thải: mặt trời, gió, thuỷ điện nhỏ, sinh khối. Ngược lại, than — dầu — khí là nhiên liệu hoá thạch, có hạn và gây ô nhiễm.' },
      { note: 'Pin mặt trời hoạt động dựa trên hiệu ứng quang điện: ánh sáng chiếu vào tấm bán dẫn làm bật ra electron, sinh dòng điện một chiều.' },
      { h: 'Xu hướng của Việt Nam' },
      { p: 'Theo Quy hoạch điện VIII, nước ta đặt mục tiêu tăng mạnh tỉ trọng năng lượng tái tạo và giảm dần điện than đến năm 2030, hướng tới phát triển bền vững.' },
    ],
    examples: [
      { q: 'Nhà máy thuỷ điện Hoà Bình và nhà máy điện mặt trời khác nhau ở dạng năng lượng đầu vào nào?', a: 'Thuỷ điện dùng thế năng/động năng của nước (thuỷ năng); điện mặt trời dùng năng lượng ánh sáng (quang năng) qua hiệu ứng quang điện. Cả hai đều thuộc năng lượng tái tạo.' },
      { q: 'Vì sao nhiều địa phương miền Trung — Nam Trung Bộ phát triển điện gió và điện mặt trời?', a: 'Vì khu vực này có số giờ nắng cao và gió biển mạnh ổn định, là điều kiện lí tưởng để khai thác năng lượng tái tạo, phù hợp xu hướng giảm điện than.' },
    ],
  },

  'H12CN-w06-quiz': {
    topic: 'Mạng điện sản xuất quy mô nhỏ',
    intro: 'Các em hình dung một xưởng cơ khí nhỏ: vừa chạy động cơ ba pha, vừa thắp đèn một pha. Mạng điện ấy được tổ chức và bảo vệ thế nào? Đó là nội dung bài hôm nay.',
    objectives: [
      'Mô tả được đặc điểm mạng điện sản xuất quy mô nhỏ.',
      'Nêu các loại tải và khái niệm tải ba pha đối xứng.',
      'Kể tên các thiết bị bảo vệ và vai trò nối đất bảo vệ.',
    ],
    theory: [
      { h: 'Đặc điểm mạng điện sản xuất nhỏ' },
      { p: 'Các xưởng, cơ sở sản xuất quy mô nhỏ thường dùng mạng hạ áp 3 pha 380V/220V (nối sao 4 dây). Mạng này cấp đồng thời tải ba pha (động cơ, lò điện, máy hàn) và tải một pha (chiếu sáng, ổ cắm).' },
      { h: 'Tải ba pha đối xứng' },
      { p: 'Khi ba pha mang tải bằng nhau (đối xứng), dòng trong dây trung tính lí tưởng bằng 0. Vì vậy người ta cố gắng phân bố tải một pha đều cho cả ba pha để mạng cân bằng.' },
      { h: 'Thiết bị bảo vệ' },
      { ul: [
        'Cầu chì: chì nóng chảy ngắt mạch khi quá dòng.',
        'Aptomat (CB): tự ngắt khi quá tải hoặc ngắn mạch.',
        'Rơle nhiệt: bảo vệ động cơ khỏi quá tải lâu dài.',
        'Chống sét, nối đất bảo vệ.',
      ] },
      { note: 'Nối đất bảo vệ đưa dòng rò xuống đất, giúp tránh điện giật khi vỏ kim loại của thiết bị bị rò điện — một biện pháp an toàn bắt buộc.' },
    ],
    examples: [
      { q: 'Trong xưởng có nhiều đèn một pha, nên đấu thế nào để mạng cân bằng?', a: 'Chia đều số đèn cho cả ba pha A, B, C để tải gần đối xứng. Khi đó dòng dây trung tính nhỏ, mạng vận hành ổn định và an toàn.' },
      { q: 'Aptomat khác cầu chì ở điểm gì khi xảy ra ngắn mạch?', a: 'Cầu chì bị chảy đứt, dùng một lần rồi phải thay. Aptomat tự ngắt mạch nhưng có thể gạt lại để dùng tiếp sau khi xử lí sự cố, tiện và hiện đại hơn.' },
    ],
  },

  'H12CN-w07-quiz': {
    topic: 'Mạch điện hạ áp sinh hoạt',
    intro: 'Các em ạ, mạch điện trong nhà mình tưởng đơn giản nhưng tuân theo nguyên tắc chặt chẽ. Nắm vững dây pha, dây trung tính, công tơ và vị trí công tắc sẽ giúp em dùng điện an toàn.',
    objectives: [
      'Phân biệt mạch một pha 2 dây và một pha 3 dây.',
      'Hiểu chức năng của công tơ điện và cầu chì.',
      'Giải thích vì sao công tắc phải đặt trên dây pha.',
    ],
    theory: [
      { h: 'Cấu trúc mạch hạ áp sinh hoạt' },
      { ul: [
        'Một pha 2 dây: dây pha (L) và dây trung tính (N).',
        'Một pha 3 dây: thêm dây tiếp đất bảo vệ (PE) — L, N, PE.',
      ] },
      { h: 'Công tơ điện' },
      { p: 'Công tơ điện (đồng hồ điện) đo lượng điện năng tiêu thụ tính bằng kWh qua thời gian, là cơ sở để tính tiền điện hằng tháng.' },
      { h: 'Cầu chì và an toàn' },
      { p: 'Cầu chì bảo vệ mạch khi quá dòng: khi dòng vượt mức cho phép, dây chì nóng chảy và ngắt mạch, tránh cháy dây.' },
      { note: 'Quy tắc quan trọng: công tắc một cực phải lắp trên dây pha (L). Như vậy khi tắt, bóng đèn không còn điện áp, an toàn khi thay bóng. Nếu lắp nhầm trên dây trung tính, đèn tắt nhưng vẫn còn điện áp ở đui.' },
    ],
    examples: [
      { q: 'Một bóng đèn 60W bật trong 5 giờ tiêu thụ bao nhiêu điện năng?', a: 'A = P × t = 60W × 5h = 300Wh = 0,3 kWh. Đó là 0,3 "số điện" trên công tơ.' },
      { q: 'Vì sao thợ điện luôn dặn lắp công tắc trên dây nóng (dây pha)?', a: 'Để khi tắt công tắc, đoạn từ công tắc đến bóng đèn không còn điện áp. Người thay bóng sẽ không bị giật. Nếu công tắc nằm trên dây trung tính, đui đèn vẫn mang điện dù đèn đã tắt.' },
    ],
  },

  'H12CN-w08-quiz': {
    topic: 'Tính toán mạch điện hạ áp — bài tập',
    intro: 'Các em đã có đủ công thức, giờ là lúc luyện tính toán: dòng điện, điện trở, tiền điện và cách mắc bóng đèn cho đúng. Hãy cầm bút và làm cùng cô nhé.',
    objectives: [
      'Áp dụng được công thức P = UI, R = U/I.',
      'Tính được tiền điện theo số kWh và đơn giá.',
      'Phân tích cách mắc nối tiếp — song song của bóng đèn.',
    ],
    theory: [
      { h: 'Công thức cần nhớ' },
      { ul: [
        'I = P / U (dòng điện qua thiết bị một chiều hoặc cosφ ≈ 1).',
        'R = U / I = U² / P (điện trở của thiết bị thuần trở).',
        'Tiền điện = số kWh × đơn giá.',
      ] },
      { h: 'Mắc nối tiếp và song song bóng đèn' },
      { p: 'Khi mắc nối tiếp hai bóng đèn giống nhau vào lưới, điện áp được chia đều cho mỗi bóng. Công suất tỉ lệ với bình phương điện áp (P ~ U²) nên điện áp giảm một nửa làm công suất giảm khoảng bốn lần, đèn sáng mờ.' },
      { note: 'Để mỗi thiết bị hoạt động đúng định mức, hãy mắc song song — mỗi thiết bị nối thẳng vào điện áp 220V của lưới. Đây là cách đấu trong mọi gia đình.' },
      { h: 'Quy trình giải một bài tập điện' },
      { ul: [
        'Xác định đại lượng đã cho và đại lượng cần tìm, kèm đơn vị.',
        'Chọn đúng công thức (P = UI, R = U/I, A = Pt…).',
        'Thay số, tính và kiểm tra tính hợp lí của kết quả.',
      ] },
    ],
    examples: [
      { q: 'Ấm điện 220V — 1000W dùng đúng định mức. Tính dòng điện và điện trở.', a: 'I = P/U = 1000/220 ≈ 4,55A. R = U/I = 220/4,55 ≈ 48,4Ω (hoặc R = U²/P = 220²/1000 ≈ 48,4Ω).' },
      { q: 'Hai bóng 220V — 100W mắc nối tiếp vào lưới 220V. Mỗi bóng nhận điện áp và sáng ra sao?', a: 'Mỗi bóng nhận 110V (chia đều). Vì P ~ U², công suất mỗi bóng còn khoảng (110/220)² × 100 ≈ 25W, nên cả hai sáng rất mờ. Muốn sáng đúng phải mắc song song.' },
    ],
  },

  'H12CN-w09-quiz': {
    topic: 'Hệ thống điện trong gia đình — Tổng quan',
    intro: 'Các em hãy nhìn lên tủ điện nhà mình: một aptomat tổng và nhiều aptomat nhánh. Vì sao lại bố trí như vậy? Bài này giúp em đọc hiểu sơ đồ điện của chính ngôi nhà mình.',
    objectives: [
      'Mô tả được sơ đồ hệ thống điện trong gia đình.',
      'Giải thích lợi ích của việc chia aptomat nhánh.',
      'Hiểu vai trò của dây tiếp đất và cách chọn tiết diện dây.',
    ],
    theory: [
      { h: 'Sơ đồ điện gia đình' },
      { p: 'Một hệ thống điện gia đình điển hình đi theo trình tự: công tơ điện → tủ điện (gồm aptomat tổng và các aptomat nhánh) → các ổ cắm và thiết bị tiêu thụ.' },
      { h: 'Vì sao chia aptomat nhánh?' },
      { ul: [
        'Cô lập sự cố: nhánh nào hỏng thì chỉ nhánh đó mất điện.',
        'Bảo trì an toàn: tắt riêng từng nhánh để sửa chữa.',
        'Bảo vệ chọn lọc: aptomat nhánh tác động trước aptomat tổng.',
      ] },
      { h: 'Chọn tiết diện dây dẫn' },
      { p: 'Tiết diện dây phải chọn theo dòng tải tính toán và độ sụt áp cho phép. Dây quá nhỏ so với tải sẽ nóng, dễ gây cháy; dây quá lớn thì lãng phí.' },
      { note: 'Ổ cắm 3 chấu có thêm chấu tiếp đất (PE). Thiết bị có vỏ kim loại (tủ lạnh, máy giặt, bình nóng lạnh) bắt buộc nối đất để chống điện giật khi rò điện ra vỏ.' },
    ],
    examples: [
      { q: 'Khi điều hoà phòng ngủ bị chập, vì sao chỉ phòng đó mất điện mà cả nhà vẫn sáng?', a: 'Vì điều hoà được cấp qua một aptomat nhánh riêng. Khi chập, aptomat nhánh đó nhảy để cô lập sự cố, các nhánh khác vẫn hoạt động bình thường — đó là lợi ích của bảo vệ chọn lọc.' },
      { q: 'Vì sao máy giặt phải cắm vào ổ 3 chấu có dây tiếp đất?', a: 'Máy giặt có vỏ kim loại và làm việc gần nước. Nếu rò điện ra vỏ, dây tiếp đất sẽ dẫn dòng rò xuống đất (kết hợp aptomat chống giật ngắt mạch), bảo vệ người dùng khỏi bị điện giật.' },
    ],
  },

  'H12CN-w10-quiz': {
    topic: 'Thiết bị điện trong gia đình',
    intro: 'Các em ơi, mỗi tháng hoá đơn điện cao hay thấp phụ thuộc nhiều vào việc ta chọn và dùng thiết bị thế nào. Hôm nay ta tìm hiểu các thiết bị gia dụng và bí quyết dùng điện thông minh.',
    objectives: [
      'Nhận biết các nhóm thiết bị điện gia dụng tiêu thụ nhiều điện.',
      'Hiểu công nghệ inverter và nhãn năng lượng.',
      'Nêu cách sử dụng thiết bị an toàn và tiết kiệm.',
    ],
    theory: [
      { h: 'Các nhóm thiết bị' },
      { ul: [
        'Chiếu sáng: đèn LED hiệu suất cao, tuổi thọ dài thay cho đèn sợi đốt.',
        'Thiết bị tiêu thụ nhiều điện: điều hoà, bình nóng lạnh, tủ lạnh, máy giặt.',
      ] },
      { h: 'Công nghệ inverter' },
      { p: 'Inverter trong điều hoà, tủ lạnh điều khiển tần số máy nén để máy chạy với tốc độ thay đổi linh hoạt, nhờ đó tiết kiệm điện và giữ nhiệt độ ổn định, thay vì cứ tắt — bật liên tục.' },
      { h: 'Nhãn năng lượng' },
      { p: 'Nhãn năng lượng cho biết mức tiết kiệm điện của thiết bị. Số sao càng nhiều (tối đa 5 sao) thì thiết bị càng tiết kiệm điện trong nhóm sản phẩm cùng loại.' },
      { note: 'Mẹo dùng điều hoà: đặt 25–27°C, bảo dưỡng định kì, dùng loại inverter, tắt khi không cần. Bình nóng lạnh nên bật trước 15–30 phút và phải có aptomat chống giật (ELCB).' },
    ],
    examples: [
      { q: 'Hai máy điều hoà cùng công suất làm mát, một dán 5 sao, một dán 2 sao. Nên chọn loại nào và vì sao?', a: 'Chọn loại 5 sao. Cùng làm mát như nhau nhưng loại 5 sao tiêu thụ ít điện hơn, tiền điện hằng tháng thấp hơn — tiết kiệm về lâu dài dù giá mua có thể cao hơn.' },
      { q: 'Vì sao đặt điều hoà 16°C lại tốn điện hơn đặt 26°C?', a: 'Nhiệt độ đặt càng thấp, chênh lệch với ngoài trời càng lớn, máy nén phải chạy nhiều và lâu hơn để đạt mức đó, nên tốn điện hơn. 25–27°C vừa đủ mát vừa tiết kiệm.' },
    ],
  },

  'H12CN-w11-quiz': {
    topic: 'Thiết kế mạch điện gia đình đơn giản',
    intro: 'Các em hãy thử làm "kĩ sư điện" cho ngôi nhà của mình: khảo sát nhu cầu, vẽ sơ đồ, tính toán dòng và chọn thiết bị bảo vệ. Đó chính là quy trình thiết kế mạch điện.',
    objectives: [
      'Trình bày các bước thiết kế mạch điện gia đình.',
      'Tính được dòng tải tổng và chọn aptomat phù hợp.',
      'Phân biệt sơ đồ nguyên lí và sơ đồ lắp đặt.',
    ],
    theory: [
      { h: 'Các bước thiết kế' },
      { ul: [
        'Khảo sát nhu cầu phụ tải và mặt bằng, xác định vị trí thiết bị.',
        'Tính tổng công suất (có nhân hệ số đồng thời, vì không phải mọi thiết bị chạy cùng lúc).',
        'Tính dòng tải, chọn tiết diện dây và thiết bị bảo vệ.',
        'Vẽ sơ đồ nguyên lí và sơ đồ lắp đặt.',
      ] },
      { h: 'Tính dòng và chọn aptomat' },
      { p: 'Dòng tải tính toán I = P / (U × cosφ). Chọn aptomat có dòng định mức I_CB ≥ I_tt, kèm hệ số dự phòng. Các nhánh ổ cắm và bình nóng lạnh nên dùng aptomat chống giật RCBO/ELCB ngưỡng 30mA.' },
      { note: 'Phân biệt hai bản vẽ: sơ đồ nguyên lí biểu diễn nguyên tắc hoạt động, cách nối logic của mạch; sơ đồ lắp đặt mô tả bố trí thực tế của thiết bị trên mặt bằng nhà.' },
      { h: 'Nguyên tắc an toàn khi thiết kế' },
      { p: 'Mỗi nhánh có dòng lớn (bếp, bình nóng lạnh, điều hoà) nên đi dây riêng và có aptomat riêng. Ổ cắm nơi ẩm ướt (bếp, nhà tắm) phải dùng RCBO chống giật. Mọi thiết bị vỏ kim loại đều phải nối đất bảo vệ.' },
    ],
    examples: [
      { q: 'Gia đình có tải tính toán 6kW, U = 220V, cosφ ≈ 1. Tính dòng và chọn aptomat tổng.', a: 'I = P/(U·cosφ) = 6000/220 ≈ 27,3A. Nên chọn aptomat tổng có dòng định mức lớn hơn, ví dụ 32A, để có dự phòng an toàn.' },
      { q: 'Vì sao khi tính tổng công suất gia đình lại nhân với hệ số đồng thời nhỏ hơn 1?', a: 'Vì trong thực tế không phải tất cả thiết bị bật cùng một lúc. Hệ số đồng thời phản ánh tỉ lệ thiết bị thực sự hoạt động đồng thời, giúp tránh chọn dây và aptomat quá lớn, lãng phí.' },
    ],
  },

  'H12CN-w12-quiz': {
    topic: 'Thực hành — Lắp đặt mạch chiếu sáng đơn giản',
    intro: 'Các em ạ, hôm nay ta xắn tay vào thực hành: lắp mạch một bóng đèn, mạch cầu thang điều khiển từ hai nơi, và đặc biệt là nhớ đúng màu dây theo chuẩn. An toàn luôn đặt lên hàng đầu.',
    objectives: [
      'Lắp được mạch chiếu sáng một công tắc và mạch cầu thang.',
      'Nhận biết quy ước màu dây pha, trung tính, tiếp đất.',
      'Thực hiện đúng quy tắc an toàn trước khi đấu nối.',
    ],
    theory: [
      { h: 'Hai mạch chiếu sáng cơ bản' },
      { ul: [
        'Mạch 1 bóng — 1 công tắc: nguồn → aptomat/cầu chì → công tắc (trên dây pha) → bóng đèn.',
        'Mạch cầu thang: điều khiển 1 bóng đèn từ 2 vị trí bằng 2 công tắc 3 cực.',
      ] },
      { h: 'Quy ước màu dây (chuẩn IEC)' },
      { ul: [
        'Dây pha (L): nâu, đen hoặc xám.',
        'Dây trung tính (N): xanh dương.',
        'Dây tiếp đất bảo vệ (PE): vàng sọc xanh lá.',
      ] },
      { note: 'Trước khi đấu nối phải ngắt điện đầu nguồn và kiểm tra lại bằng bút thử điện. Tuyệt đối không thao tác khi mạch còn điện hay khi tay ướt.' },
      { h: 'Các bước thực hành chuẩn' },
      { ul: [
        'Chuẩn bị dụng cụ: kìm, tua vít cách điện, bút thử điện, băng keo điện.',
        'Đấu nối theo sơ đồ, các mối nối chắc chắn và được bọc cách điện.',
        'Kiểm tra lại toàn mạch trước khi cấp điện thử.',
      ] },
    ],
    examples: [
      { q: 'Muốn bật/tắt đèn cầu thang cả ở tầng dưới lẫn tầng trên thì dùng loại công tắc gì?', a: 'Dùng hai công tắc 3 cực (công tắc đảo chiều) đấu theo sơ đồ mạch cầu thang. Khi đó dù đang ở tầng nào cũng có thể bật hoặc tắt đèn.' },
      { q: 'Thấy một dây màu vàng sọc xanh lá trong hộp nối, đó là dây gì và có được dùng để tải điện không?', a: 'Đó là dây tiếp đất bảo vệ (PE). Tuyệt đối không dùng để tải dòng làm việc; nó chỉ làm nhiệm vụ dẫn dòng rò xuống đất để bảo vệ an toàn.' },
    ],
  },

  'H12CN-w13-quiz': {
    topic: 'An toàn điện',
    intro: 'Các em thân mến, điện rất hữu ích nhưng cũng rất nguy hiểm nếu bất cẩn. Bài học này có thể cứu mạng người: hiểu các tai nạn điện và biết cứu người đúng cách.',
    objectives: [
      'Nhận biết các loại tai nạn điện và ngưỡng dòng nguy hiểm.',
      'Thực hiện đúng trình tự cứu người bị điện giật.',
      'Nêu các biện pháp phòng tránh điện giật trong gia đình.',
    ],
    theory: [
      { h: 'Các tai nạn điện thường gặp' },
      { ul: [
        'Điện giật: dòng điện đi qua cơ thể.',
        'Hồ quang điện: phóng điện gây bỏng.',
        'Cháy nổ do chập điện, quá tải.',
      ] },
      { note: 'Với điện 50Hz, dòng khoảng 30mA trở lên đi qua người đã có thể gây nguy hiểm cho tim. Đó là lí do thiết bị chống giật RCBO/ELCB chọn ngưỡng 30mA.' },
      { h: 'Cứu người bị điện giật — đúng trình tự' },
      { ul: [
        'Ngắt nguồn điện trước tiên (cầu dao, aptomat).',
        'Nếu chưa ngắt được, dùng vật cách điện (gậy gỗ khô) tách nạn nhân, tuyệt đối không dùng tay không.',
        'Sơ cứu: hô hấp nhân tạo, ép tim nếu cần và gọi cấp cứu 115.',
      ] },
      { h: 'Phòng tránh trong gia đình' },
      { p: 'Lắp RCBO/ELCB, tiếp đất các thiết bị vỏ kim loại, không dùng điện khi tay ướt, để thiết bị điện xa nguồn nước, dùng nắp che ổ cắm khi nhà có trẻ nhỏ.' },
    ],
    examples: [
      { q: 'Thấy bạn bị điện giật đang dính vào dây điện, em làm gì đầu tiên?', a: 'Ngắt nguồn điện ngay (cúp cầu dao/aptomat). Tuyệt đối không lao vào kéo bạn bằng tay không, vì em cũng sẽ bị giật. Sau khi tách được nạn nhân thì sơ cứu và gọi 115.' },
      { q: 'Vì sao thiết bị chống giật thường chọn ngưỡng tác động 30mA?', a: 'Vì khoảng 30mA là ngưỡng dòng bắt đầu gây nguy hiểm cho tim người. Đặt ngưỡng 30mA giúp thiết bị ngắt mạch kịp thời trước khi dòng rò gây hại cho người.' },
    ],
  },

  'H12CN-w14-quiz': {
    topic: 'Tiết kiệm điện năng',
    intro: 'Các em ơi, tiết kiệm điện không chỉ giảm hoá đơn cho gia đình mà còn bảo vệ môi trường và an ninh năng lượng quốc gia. Cùng tìm những việc nhỏ tạo khác biệt lớn nhé.',
    objectives: [
      'Nêu lợi ích của việc tiết kiệm điện năng.',
      'Liệt kê các biện pháp tiết kiệm điện trong gia đình.',
      'Tính được lượng điện tiết kiệm khi thay thiết bị.',
    ],
    theory: [
      { h: 'Lợi ích của tiết kiệm điện' },
      { ul: [
        'Giảm chi phí tiền điện cho gia đình.',
        'Giảm phát thải CO₂, bảo vệ môi trường.',
        'Góp phần đảm bảo an ninh năng lượng quốc gia.',
      ] },
      { h: 'Biện pháp tiết kiệm' },
      { ul: [
        'Tắt thiết bị khi không dùng, không để chế độ chờ (standby).',
        'Dùng đèn LED, thiết bị inverter, nhãn năng lượng cao.',
        'Đặt điều hoà 25–27°C, chênh nhiệt trong — ngoài không quá 5–8°C.',
        'Hạn chế dùng nhiều thiết bị công suất lớn vào giờ cao điểm.',
      ] },
      { note: 'Giờ cao điểm của lưới thường vào sáng 9h30–11h30 và tối 17h–20h. Lắp điện mặt trời mái nhà giúp giảm phụ thuộc lưới và có thể bán điện dư cho EVN theo chính sách.' },
      { h: 'Tiết kiệm điện là trách nhiệm chung' },
      { p: 'Mỗi gia đình tiết kiệm một chút sẽ giảm áp lực rất lớn cho hệ thống điện quốc gia, nhất là vào mùa khô và giờ cao điểm. Học sinh có thể bắt đầu từ những việc nhỏ: tắt đèn khi rời phòng, rút sạc khi không dùng, nhắc nhở người thân dùng điện hợp lí.' },
    ],
    examples: [
      { q: 'Thay đèn sợi đốt 60W bằng đèn LED 10W cùng độ sáng, dùng 4 giờ/ngày. Tính điện tiết kiệm trong 1 năm.', a: 'Tiết kiệm mỗi giờ 60 − 10 = 50W. Một năm: 50W × 4h × 365 ngày = 73.000Wh = 73 kWh. Một bóng đã tiết kiệm chừng đó, nhân lên cả nhà sẽ rất đáng kể.' },
      { q: 'Vì sao nên tránh dùng bình nóng lạnh, bàn là vào giờ cao điểm tối?', a: 'Vì giờ cao điểm lưới điện chịu tải lớn, dồn thêm thiết bị công suất cao càng gây áp lực và lãng phí. Dời sang giờ thấp điểm giúp giảm tải hệ thống và đôi khi tiết kiệm chi phí.' },
    ],
  },

  'H12CN-w15-quiz': {
    topic: 'Ôn tập điện',
    intro: 'Các em thân mến, ta cùng hệ thống lại những kiến thức cốt lõi của phần Công nghệ Điện: thông số lưới, thiết bị bảo vệ, quy ước dây và tiết kiệm điện. Đây là phần xương sống cần nhớ chắc.',
    objectives: [
      'Củng cố thông số lưới điện và hệ ba pha.',
      'Hệ thống lại chức năng các thiết bị bảo vệ.',
      'Ôn quy ước màu dây và biện pháp tiết kiệm điện.',
    ],
    theory: [
      { h: 'Thông số lưới điện cần nhớ' },
      { ul: [
        'Điện áp sinh hoạt: 220V; tần số: 50Hz.',
        'Lưới hạ áp 3 pha 4 dây: điện áp dây 380V, điện áp pha 220V.',
        'Quan hệ U_dây = √3 × U_pha (nối sao).',
      ] },
      { h: 'Thiết bị bảo vệ' },
      { ul: [
        'Cầu chì: bảo vệ quá dòng, chì nóng chảy ngắt mạch.',
        'Aptomat (CB): tự ngắt khi quá tải hoặc ngắn mạch.',
        'RCBO/ELCB: phát hiện dòng rò, bảo vệ chống giật.',
      ] },
      { h: 'Quy ước màu dây và tiết kiệm điện' },
      { p: 'Dây pha: nâu/đen; trung tính: xanh dương; tiếp đất: vàng sọc xanh lá. Tiết kiệm điện bằng đèn LED, inverter, tắt khi không dùng, chọn nhãn năng lượng cao.' },
    ],
    examples: [
      { q: 'Lưới hạ áp 380/220V: đâu là điện áp dây, đâu là điện áp pha?', a: '380V là điện áp dây (giữa hai dây pha), 220V là điện áp pha (giữa dây pha và dây trung tính). Quan hệ: 380 ≈ √3 × 220.' },
      { q: 'Một thiết bị bảo vệ phát hiện chênh lệch dòng vào — ra (dòng rò) rồi ngắt mạch là loại nào?', a: 'Đó là RCBO/ELCB (thiết bị chống dòng rò). Nó so sánh dòng dây pha và dây trung tính; khi lệch nhau quá ngưỡng (ví dụ 30mA) tức là có dòng rò ra ngoài, thiết bị sẽ ngắt để bảo vệ người.' },
    ],
  },

  'H12CN-w16-quiz': {
    topic: 'Ôn tập HK1 (1)',
    intro: 'Các em ơi, chuẩn bị cho kì thi học kì, ta cùng rà lại những nguyên lí lớn: truyền tải, sản xuất điện, và an toàn cứu người. Hãy chắc rằng em hiểu bản chất chứ không học vẹt.',
    objectives: [
      'Ôn lại nguyên lí truyền tải điện đi xa.',
      'Hệ thống các nguồn năng lượng và nguyên lí sản xuất điện.',
      'Củng cố quy trình an toàn điện.',
    ],
    theory: [
      { h: 'Truyền tải điện đi xa' },
      { p: 'Để giảm tổn hao P_hao = I²R trên đường dây, phải tăng điện áp truyền tải để dòng điện giảm. Việt Nam dùng các cấp 110kV, 220kV, 500kV; tần số toàn hệ thống là 50Hz.' },
      { h: 'Nguồn năng lượng và sản xuất điện' },
      { ul: [
        'Tái tạo: mặt trời (hiệu ứng quang điện), gió (động năng → cơ → điện), thuỷ điện nhỏ, sinh khối.',
        'Hoá thạch: than, dầu, khí — đốt sinh hơi quay tua bin.',
      ] },
      { h: 'An toàn điện' },
      { note: 'Khi gặp tai nạn điện giật, bước đầu tiên luôn là ngắt nguồn điện, không lao vào kéo nạn nhân bằng tay không. Ổ cắm 3 chấu có chấu thứ ba nối dây tiếp đất PE.' },
    ],
    examples: [
      { q: 'Nhà máy điện gió và pin mặt trời chuyển hoá năng lượng đầu vào nào thành điện?', a: 'Điện gió: động năng của gió → quay tua bin (cơ năng) → điện. Pin mặt trời: quang năng của ánh sáng → điện nhờ hiệu ứng quang điện. Cả hai đều là năng lượng tái tạo.' },
      { q: 'Vì sao tăng điện áp lại làm giảm tổn hao trên đường dây truyền tải?', a: 'Vì với cùng công suất P = U·I, khi U tăng thì I giảm. Tổn hao P_hao = I²R phụ thuộc bình phương dòng điện, nên dòng giảm làm tổn hao giảm rất mạnh.' },
    ],
  },

  'H12CN-w17-quiz': {
    topic: 'Ôn tập HK1 (2)',
    intro: 'Các em thân mến, phần ôn tập thứ hai tập trung vào tính toán và mạch ba pha — những dạng bài hay gặp trong đề thi. Ta cùng luyện cho thật chắc tay.',
    objectives: [
      'Vận dụng công thức tính dòng động cơ ba pha.',
      'Củng cố công thức điện năng và mạch ba pha 4 dây.',
      'Ôn về thiết bị chống giật và an toàn cho trẻ em.',
    ],
    theory: [
      { h: 'Mạch ba pha 4 dây' },
      { p: 'Mạch nối sao có dây trung tính (3 pha 4 dây) có ưu điểm cung cấp đồng thời tải ba pha 380V và tải một pha 220V, rất tiện cho khu dân cư và xưởng nhỏ.' },
      { h: 'Công thức tính toán' },
      { ul: [
        'Điện năng tiêu thụ: A = P × t (đơn vị kWh).',
        'Dòng dây động cơ ba pha: I = P / (√3 × U_dây × cosφ).',
      ] },
      { h: 'An toàn' },
      { note: 'Thiết bị chống giật RCBO/ELCB phát hiện dòng rò chạm đất, không phải dòng quá tải. Với trẻ em: lắp nắp che ổ cắm và dạy trẻ không chạm thiết bị có điện.' },
    ],
    examples: [
      { q: 'Động cơ ghi 380V — 3kW, cosφ = 0,8 nối sao. Tính dòng dây.', a: 'I = P/(√3 × U × cosφ) = 3000/(√3 × 380 × 0,8) ≈ 3000/526 ≈ 5,7A.' },
      { q: 'Aptomat thường và RCBO khác nhau ở loại sự cố nào chúng bảo vệ?', a: 'Aptomat thường bảo vệ quá tải và ngắn mạch (dòng quá lớn). RCBO/ELCB bảo vệ chống dòng rò chạm đất (chống điện giật cho người). Nhiều nhà dùng cả hai chức năng kết hợp.' },
    ],
  },

  'H12CN-w18-quiz': {
    topic: 'Thi học kỳ I — Điện',
    intro: 'Các em ơi, đây là phần tổng hợp kiến thức học kì I để các em tự tin bước vào kì thi. Hãy đọc kĩ các đơn vị, công thức và ý nghĩa thực tế của từng con số.',
    objectives: [
      'Tổng hợp kiến thức trọng tâm phần Công nghệ Điện.',
      'Nắm chắc các đơn vị và quy đổi năng lượng.',
      'Vận dụng linh hoạt vào tình huống thực tế.',
    ],
    theory: [
      { h: 'Điện áp dây và điện áp pha' },
      { p: 'Lưới hạ áp 380/220V: điện áp dây 380V (giữa hai dây pha), điện áp pha 220V (giữa dây pha và trung tính), quan hệ U_dây = √3 × U_pha.' },
      { h: 'Quy đổi năng lượng' },
      { ul: [
        '1 kWh = 1000W trong 1 giờ = 3,6 MJ.',
        'A = P × t; tiền điện = số kWh × đơn giá.',
      ] },
      { h: 'An toàn và truyền tải' },
      { note: 'RCBO/ELCB ngưỡng 30mA dùng cho mạch ổ cắm nhà ở, bình nóng lạnh. Truyền tải đi xa phải tăng điện áp (110, 220, 500kV) để giảm dòng, giảm tổn hao I²R.' },
    ],
    examples: [
      { q: '1 kWh tương đương bao nhiêu joule?', a: '1 kWh = 1000W × 3600s = 3.600.000J = 3,6 MJ. Đây là lượng điện ứng với 1 "số điện" trên công tơ.' },
      { q: 'Vì sao ngưỡng 30mA của RCBO phù hợp cho ổ cắm và bình nóng lạnh trong nhà ở?', a: 'Vì đây là những nơi người tiếp xúc trực tiếp, nguy cơ rò điện cao (nhất là bình nóng lạnh gần nước). Ngưỡng 30mA đủ nhạy để ngắt mạch bảo vệ tính mạng người trước khi dòng rò gây hại.' },
    ],
  },

  // ──────────────── HK2 — Công nghệ Điện tử ────────────────
  'H12CN-w19-quiz': {
    topic: 'Khái quát về Kĩ thuật điện tử',
    intro: 'Các em thân mến, sang học kì II ta bước vào thế giới điện tử — nơi sinh ra điện thoại, máy tính và mọi thiết bị thông minh. Khởi đầu là hiểu về tín hiệu: tương tự và số.',
    objectives: [
      'Trình bày được khái niệm và vai trò của kĩ thuật điện tử.',
      'Phân biệt tín hiệu tương tự và tín hiệu số.',
      'Hiểu chức năng của bộ ADC và DAC.',
    ],
    theory: [
      { h: 'Kĩ thuật điện tử là gì?' },
      { p: 'Điện tử học nghiên cứu và ứng dụng các linh kiện, mạch điện tử để xử lí tín hiệu và thông tin. Nó là nền tảng của viễn thông, máy tính, tự động hoá và các thiết bị thông minh.' },
      { h: 'Hai loại tín hiệu' },
      { ul: [
        'Tín hiệu tương tự (analog): giá trị thay đổi liên tục theo thời gian (âm thanh, nhiệt độ).',
        'Tín hiệu số (digital): chỉ có hai mức rời rạc 0 và 1.',
      ] },
      { h: 'ADC và DAC' },
      { p: 'Bộ ADC (Analog to Digital Converter) chuyển tín hiệu tương tự thành số để máy tính xử lí. Bộ DAC (Digital to Analog Converter) làm ngược lại, chuyển số thành tương tự (ví dụ phát âm thanh ra loa).' },
      { note: 'Thế giới thực là tương tự (âm thanh, ánh sáng), nhưng máy tính làm việc với số. ADC và DAC là cầu nối giữa hai thế giới này.' },
    ],
    examples: [
      { q: 'Micro thu giọng nói rồi máy tính lưu thành file. Khâu nào dùng ADC?', a: 'Giọng nói là tín hiệu tương tự liên tục. Khi đưa vào máy tính, ADC chuyển nó thành dãy số 0/1 để lưu trữ và xử lí. Khi phát lại qua loa, DAC sẽ chuyển số thành tương tự.' },
      { q: 'Vì sao tín hiệu số ít bị nhiễu hơn tín hiệu tương tự khi truyền đi xa?', a: 'Vì tín hiệu số chỉ cần phân biệt hai mức 0 và 1, nhiễu nhỏ không làm nhầm mức. Tín hiệu tương tự thay đổi liên tục nên nhiễu trộn vào làm méo giá trị, khó khôi phục chính xác.' },
    ],
  },

  'H12CN-w20-quiz': {
    topic: 'Ngành nghề trong kĩ thuật điện tử',
    intro: 'Các em ơi, kĩ thuật điện tử mở ra những nghề hấp dẫn của thời đại số: IoT, robot, xe điện, AI nhúng. Cùng tìm hiểu các nghề và kĩ năng cần có nhé.',
    objectives: [
      'Kể tên các lĩnh vực và nghề trong kĩ thuật điện tử.',
      'Nêu kĩ năng cốt lõi của người làm điện tử.',
      'Biết các thiết bị đo cơ bản và an toàn khi làm việc.',
    ],
    theory: [
      { h: 'Lĩnh vực và nghề điện tử' },
      { ul: [
        'Thiết kế mạch, viễn thông, IoT, ô tô, thiết bị y tế, công nghiệp.',
        'Lĩnh vực mới nổi: IoT, AI trên thiết bị nhúng, xe điện, robot.',
      ] },
      { h: 'Kĩ năng cốt lõi' },
      { p: 'Người làm điện tử cần nền Toán — Vật lí — Tin học, biết đọc sơ đồ mạch, hàn linh kiện, đo lường và lập trình vi điều khiển (MCU).' },
      { h: 'Thiết bị đo cơ bản' },
      { ul: [
        'Đồng hồ vạn năng (VOM): đo điện áp, dòng, điện trở.',
        'Dao động kí (oscilloscope): xem dạng sóng tín hiệu.',
        'Nguồn DC điều chỉnh được.',
      ] },
      { note: 'An toàn điện tử: đeo kính khi hàn, làm việc nơi thông gió. Tụ điện trong nguồn có thể tích điện cao — không sờ tay khi tụ chưa xả hết.' },
    ],
    examples: [
      { q: 'Muốn theo nghề thiết kế thiết bị IoT, học sinh nên chú trọng môn và kĩ năng nào?', a: 'Chú trọng Toán, Vật lí, Tin học; rèn kĩ năng đọc sơ đồ mạch, hàn linh kiện, đo lường và đặc biệt là lập trình vi điều khiển (Arduino, ESP32). Đây là nền cho mọi sản phẩm IoT.' },
      { q: 'Vì sao phải cẩn thận với tụ điện trong bộ nguồn dù đã rút điện?', a: 'Vì tụ điện lọc nguồn có thể còn tích điện áp cao sau khi rút điện, chạm vào sẽ bị giật. Cần xả tụ an toàn (qua điện trở) trước khi thao tác sửa chữa.' },
    ],
  },

  'H12CN-w21-quiz': {
    topic: 'Linh kiện thụ động — Điện trở, tụ, cuộn cảm',
    intro: 'Các em ạ, trước khi lắp được mạch, phải quen mặt từng linh kiện. Hôm nay ta học ba linh kiện thụ động cơ bản: điện trở, tụ điện và cuộn cảm.',
    objectives: [
      'Nhận biết điện trở, tụ điện, cuộn cảm và đơn vị của chúng.',
      'Tính được điện trở tương đương khi mắc nối tiếp, song song.',
      'Hiểu hành vi của tụ điện trong mạch một chiều.',
    ],
    theory: [
      { h: 'Ba linh kiện thụ động' },
      { ul: [
        'Điện trở (R): cản trở dòng điện, đơn vị Ôm (Ω).',
        'Tụ điện (C): tích và phóng điện, đơn vị Fara (F).',
        'Cuộn cảm (L): tích năng lượng từ trường, đơn vị Henry (H).',
      ] },
      { h: 'Mắc điện trở' },
      { ul: [
        'Nối tiếp: R = R₁ + R₂ + … (điện trở tăng).',
        'Song song: 1/R = 1/R₁ + 1/R₂ + … (điện trở giảm).',
      ] },
      { h: 'Tụ điện trong mạch một chiều' },
      { p: 'Ở chế độ xác lập (ổn định) trong mạch một chiều, tụ điện đã nạp đầy thì không cho dòng đi qua, hoạt động như một mạch hở. Tụ chỉ "dẫn" khi điện áp đang biến thiên (nạp/xả).' },
      { note: 'Quy tắc ghi nhớ ngược nhau: điện trở nối tiếp thì cộng thẳng, song song thì cộng nghịch đảo. Càng nhiều điện trở mắc song song, điện trở tổng càng nhỏ.' },
    ],
    examples: [
      { q: 'Hai điện trở 10Ω và 20Ω. Tính điện trở tương đương khi nối tiếp và khi song song.', a: 'Nối tiếp: R = 10 + 20 = 30Ω. Song song: 1/R = 1/10 + 1/20 = 3/20 → R = 20/3 ≈ 6,67Ω. Song song luôn nhỏ hơn điện trở nhỏ nhất.' },
      { q: 'Vì sao tụ điện được dùng để "chặn" thành phần một chiều, "cho qua" thành phần xoay chiều?', a: 'Vì với một chiều ổn định, tụ nạp đầy rồi ngăn dòng (như mạch hở). Với xoay chiều, điện áp luôn biến thiên nên tụ liên tục nạp — xả, dòng qua tụ được duy trì. Đó là cơ sở của tụ ghép tín hiệu.' },
    ],
  },

  'H12CN-w22-quiz': {
    topic: 'Linh kiện tích cực — Diode, transistor, IC',
    intro: 'Các em ơi, nếu linh kiện thụ động là "vật liệu" thì diode, transistor và IC chính là "bộ não" của mạch điện tử. Cùng khám phá những linh kiện làm nên cách mạng công nghệ này.',
    objectives: [
      'Hiểu nguyên lí dẫn điện một chiều của diode.',
      'Nêu cấu tạo và chức năng của transistor.',
      'Hiểu khái niệm mạch tích hợp (IC).',
    ],
    theory: [
      { h: 'Diode' },
      { p: 'Diode chỉ cho dòng đi một chiều, từ anode (A) sang cathode (K) khi phân cực thuận. Ứng dụng quan trọng: diode chỉnh lưu chuyển AC thành DC. LED là diode phát quang, phát sáng khi phân cực thuận.' },
      { h: 'Transistor' },
      { p: 'Transistor BJT có ba cực: Base (B), Collector (C), Emitter (E). Nó có hai chức năng chính: khuếch đại tín hiệu nhỏ thành lớn, hoặc làm khoá đóng — cắt (switch) trong mạch số.' },
      { h: 'IC — Mạch tích hợp' },
      { p: 'IC (Integrated Circuit) là mạch tích hợp rất nhiều linh kiện (transistor, điện trở…) trên một chip bán dẫn nhỏ. Nhờ IC, thiết bị điện tử ngày càng nhỏ, mạnh và rẻ.' },
      { note: 'Transistor là phát minh nền tảng: chỉ một con chip vi xử lí ngày nay chứa hàng tỉ transistor cực nhỏ.' },
    ],
    examples: [
      { q: 'Vì sao nói diode giống như một "van một chiều" của dòng điện?', a: 'Vì diode chỉ cho dòng chảy theo một chiều (thuận, A→K) và chặn chiều ngược lại, giống như van nước chỉ cho nước chảy một hướng. Nhờ đó diode dùng để chỉnh lưu AC thành DC.' },
      { q: 'Một transistor dùng làm "công tắc điện tử" điều khiển bóng LED. Cực nào nhận tín hiệu điều khiển?', a: 'Cực Base (B) nhận tín hiệu điều khiển. Khi có dòng nhỏ vào Base, transistor dẫn, cho dòng lớn chạy từ Collector qua Emitter làm LED sáng; ngắt Base thì LED tắt — đó là chức năng đóng/cắt.' },
    ],
  },

  'H12CN-w23-quiz': {
    topic: 'Thực hành — Nhận diện và đo linh kiện',
    intro: 'Các em ạ, lí thuyết đã có, giờ ta cầm linh kiện thật và đồng hồ đo: đọc vạch màu điện trở, phân biệt cực diode và tụ, và hàn cho chắc tay. Đây là kĩ năng nghề thực sự.',
    objectives: [
      'Đo điện trở và đọc giá trị qua vạch màu.',
      'Phân biệt cực của diode và tụ điện phân cực.',
      'Thực hiện hàn linh kiện đúng kĩ thuật.',
    ],
    theory: [
      { h: 'Đo điện trở' },
      { p: 'Khi đo điện trở bằng VOM phải ngắt nguồn điện và tháo điện trở khỏi mạch (hoặc nhấc một chân) để tránh sai số do các linh kiện khác.' },
      { h: 'Đọc vạch màu điện trở' },
      { p: 'Điện trở 4 vạch: hai vạch đầu là chữ số, vạch ba là hệ số nhân (số 0), vạch tư là dung sai. Ví dụ nâu — đen — đỏ — vàng kim = 1, 0, ×10² = 1000Ω = 1kΩ, dung sai 5%.' },
      { h: 'Linh kiện có cực' },
      { ul: [
        'Diode: que đỏ ở A, que đen ở K (thang Diode test) sẽ hiện điện áp ngưỡng ~0,6V với silic.',
        'Tụ phân cực (electrolytic): chân dài là (+), chân ngắn là (−); mắc ngược có thể nổ.',
        'LED: phải mắc nối tiếp điện trở hạn dòng phù hợp.',
      ] },
      { note: 'Hàn đúng cách: mỏ hàn đủ nóng, dùng thiếc có lõi nhựa thông, hàn nhanh khoảng 2–3 giây. Hàn quá lâu sẽ làm hỏng linh kiện.' },
    ],
    examples: [
      { q: 'Điện trở 4 vạch màu: đỏ — đỏ — nâu — vàng kim. Đọc giá trị.', a: 'Đỏ = 2, đỏ = 2, nâu = ×10¹. Vậy 22 × 10 = 220Ω, dung sai 5% (vàng kim). Đây chính là điện trở hạn dòng hay dùng cho LED.' },
      { q: 'Vì sao tụ hoá (electrolytic) mắc ngược cực có thể bị phồng, nổ?', a: 'Vì tụ hoá có cấu tạo phân cực, lớp cách điện chỉ bền theo một chiều điện áp. Mắc ngược cực làm lớp này bị phá huỷ, sinh khí và nhiệt, gây phồng hoặc nổ. Phải lắp đúng (+)/(−).' },
    ],
  },

  'H12CN-w24-quiz': {
    topic: 'Mạch điện tử tương tự — Khái quát',
    intro: 'Các em ơi, hầu hết bộ nguồn điện tử đều biến điện 220V xoay chiều thành điện một chiều phẳng phiu để nuôi mạch. Hôm nay ta học chuỗi biến đổi đó: chỉnh lưu, lọc, ổn áp.',
    objectives: [
      'Hiểu các khối của một bộ nguồn DC.',
      'Phân biệt chỉnh lưu nửa chu kì và chỉnh lưu cầu.',
      'Nêu vai trò của tụ lọc và IC ổn áp.',
    ],
    theory: [
      { h: 'Các khối của bộ nguồn DC' },
      { p: 'Một bộ nguồn DC điển hình gồm bốn khối nối tiếp: biến áp (hạ áp) → chỉnh lưu (AC thành DC nhấp nhô) → lọc (làm phẳng) → ổn áp (giữ điện áp ra ổn định).' },
      { h: 'Mạch chỉnh lưu' },
      { ul: [
        'Chỉnh lưu nửa chu kì: dùng 1 diode, chỉ tận dụng nửa chu kì.',
        'Chỉnh lưu cầu (toàn kì): dùng 4 diode, tận dụng cả hai nửa chu kì, hiệu quả hơn.',
      ] },
      { h: 'Tụ lọc và ổn áp' },
      { p: 'Tụ lọc đặt sau chỉnh lưu để san bằng nhấp nhô, tạo điện áp DC mượt hơn. IC ổn áp giữ điện áp ra cố định, ví dụ IC 7805 cho đầu ra +5V ổn định.' },
      { note: 'Họ IC 78xx cho điện áp dương cố định: 7805 = +5V, 7812 = +12V… Hai số cuối chính là điện áp đầu ra.' },
    ],
    examples: [
      { q: 'Xếp đúng thứ tự các khối trong bộ sạc điện thoại biến 220V AC thành 5V DC.', a: 'Biến áp (hạ áp) → chỉnh lưu (diode/cầu diode đổi AC sang DC nhấp nhô) → tụ lọc (làm phẳng) → ổn áp (IC giữ ổn định 5V). Đầu ra là 5V DC sạch.' },
      { q: 'Vì sao chỉnh lưu cầu (4 diode) cho điện áp DC tốt hơn chỉnh lưu 1 diode?', a: 'Vì chỉnh lưu cầu tận dụng cả hai nửa chu kì của tín hiệu AC, nên điện áp ra liên tục và ít nhấp nhô hơn. Chỉnh lưu 1 diode bỏ phí nửa chu kì, điện áp gợn nhiều, lọc khó hơn.' },
    ],
  },

  'H12CN-w25-quiz': {
    topic: 'Khuếch đại thuật toán (Op-amp)',
    intro: 'Các em thân mến, op-amp là một trong những IC linh hoạt nhất: chỉ thay vài điện trở là có mạch khuếch đại tuỳ ý. Hiểu op-amp, em mở cánh cửa vào mạch tương tự hiện đại.',
    objectives: [
      'Trình bày khái niệm và đặc điểm lí tưởng của op-amp.',
      'Nhận biết hai đầu vào đảo và không đảo.',
      'Tính hệ số khuếch đại của mạch đảo và không đảo.',
    ],
    theory: [
      { h: 'Op-amp là gì?' },
      { p: 'Op-amp (khuếch đại thuật toán — Operational Amplifier) là IC khuếch đại tín hiệu với hệ số khuếch đại rất lớn. Loại phổ biến để học là IC 741.' },
      { h: 'Đặc điểm lí tưởng' },
      { ul: [
        'Trở kháng vào vô cùng lớn (gần như không lấy dòng từ nguồn tín hiệu).',
        'Trở kháng ra bằng 0.',
        'Hệ số khuếch đại hở vô cùng lớn.',
      ] },
      { h: 'Hai cấu hình cơ bản' },
      { ul: [
        'Hai đầu vào: (+) không đảo và (−) đảo.',
        'Mạch khuếch đại đảo: Av = − R_f / R_in (tín hiệu ra ngược pha).',
        'Mạch khuếch đại không đảo: Av = 1 + R_f / R_in (cùng pha).',
      ] },
      { note: 'Hệ số khuếch đại được đặt bằng tỉ số điện trở phản hồi — đó là sức mạnh của op-amp: chỉ chọn lại điện trở là thay đổi độ khuếch đại.' },
    ],
    examples: [
      { q: 'Mạch khuếch đại đảo có R_in = 1kΩ, R_f = 10kΩ. Tính Av.', a: 'Av = − R_f/R_in = − 10/1 = −10. Dấu trừ nghĩa là tín hiệu ra lớn gấp 10 lần và ngược pha so với tín hiệu vào.' },
      { q: 'So sánh dấu của tín hiệu ra ở mạch khuếch đại đảo và không đảo.', a: 'Mạch đảo cho tín hiệu ra ngược pha (Av âm, ví dụ −10). Mạch không đảo cho tín hiệu ra cùng pha (Av dương, luôn ≥ 1). Tuỳ ứng dụng mà chọn cấu hình phù hợp.' },
    ],
  },

  'H12CN-w26-quiz': {
    topic: 'Thực hành — Mạch khuếch đại tín hiệu',
    intro: 'Các em ạ, hôm nay ta thực sự lắp một mạch khuếch đại op-amp, cấp nguồn đôi, đo dạng sóng bằng dao động kí và xử lí các lỗi thường gặp như méo tín hiệu, nhiễu.',
    objectives: [
      'Lắp được mạch khuếch đại đảo dùng op-amp.',
      'Hiểu nguồn cấp đôi và hiện tượng cắt đỉnh.',
      'Biết cách giảm nhiễu và gỡ lỗi mạch tương tự.',
    ],
    theory: [
      { h: 'Cấp nguồn cho op-amp' },
      { p: 'Op-amp thường cần nguồn cấp đôi đối xứng, ví dụ ±12V hoặc ±15V (V_CC dương và V_EE âm), để khuếch đại được cả nửa dương lẫn nửa âm của tín hiệu.' },
      { h: 'Hiện tượng cắt đỉnh (clipping)' },
      { p: 'Khi tín hiệu ra muốn vượt quá mức nguồn cấp, op-amp không thể đưa ra cao hơn nguồn, nên đỉnh tín hiệu bị cắt phẳng (clipping). Đây là dấu hiệu khuếch đại quá mức hoặc tín hiệu vào quá lớn.' },
      { h: 'Đo và chống nhiễu' },
      { ul: [
        'Dùng dao động kí (oscilloscope) để xem dạng sóng đầu ra.',
        'Để dây ngắn, dùng chung điểm mass, đặt tụ lọc nguồn 0,1μF gần IC.',
        'Khi mạch sai: kiểm tra nguồn, mối hàn, đo tín hiệu từng khối.',
      ] },
      { note: 'Tụ lọc nguồn (bypass) 0,1μF đặt sát chân nguồn IC giúp triệt nhiễu cao tần — một thói quen tốt khi lắp mọi mạch điện tử.' },
    ],
    examples: [
      { q: 'Lắp mạch khuếch đại đảo, R_in = 2kΩ, R_f = 8kΩ, tín hiệu vào sin biên độ 1V, nguồn ±5V. Tín hiệu ra có bị cắt đỉnh không?', a: 'Av = −8/2 = −4, biên độ ra mong muốn = 4 × 1V = 4V. Nguồn ±5V cho phép biên độ tới gần ±5V, nên 4V vẫn nằm trong giới hạn, tín hiệu ra không bị cắt đỉnh.' },
      { q: 'Mạch khuếch đại nghe có tiếng "u u" lẫn vào tín hiệu. Có thể khắc phục thế nào?', a: 'Đó thường là nhiễu. Nên rút ngắn dây dẫn, dùng chung điểm mass, thêm tụ lọc nguồn 0,1μF sát chân IC, và kiểm tra mối hàn. Những biện pháp này giảm nhiễu cao tần và nhiễu nguồn.' },
    ],
  },

  'H12CN-w27-quiz': {
    topic: 'Điện tử số — Tín hiệu và cổng logic',
    intro: 'Các em ơi, mọi máy tính đều "suy nghĩ" bằng hai con số 0 và 1. Cách chúng kết hợp các số ấy là nhờ các cổng logic. Hôm nay ta học những viên gạch của thế giới số.',
    objectives: [
      'Hiểu khái niệm tín hiệu số hai mức.',
      'Nắm chức năng các cổng logic cơ bản: AND, OR, NOT.',
      'Hiểu các cổng dẫn xuất: NAND, NOR, XOR.',
    ],
    theory: [
      { h: 'Tín hiệu số' },
      { p: 'Tín hiệu số có hai mức: mức cao (HIGH = 1) và mức thấp (LOW = 0). Mọi thông tin trong mạch số đều biểu diễn bằng tổ hợp các bit 0 và 1.' },
      { h: 'Các cổng logic cơ bản' },
      { ul: [
        'AND: đầu ra 1 khi tất cả đầu vào đều 1.',
        'OR: đầu ra 1 khi có ít nhất một đầu vào 1.',
        'NOT (đảo): 0 thành 1, 1 thành 0.',
      ] },
      { h: 'Các cổng dẫn xuất' },
      { ul: [
        'NAND = NOT(AND): đảo của AND.',
        'NOR = NOT(OR): đảo của OR.',
        'XOR (hoặc loại trừ): đầu ra 1 khi hai đầu vào khác nhau.',
      ] },
      { note: 'NAND và NOR là cổng "vạn năng" — chỉ dùng riêng một loại cũng đủ tạo ra mọi cổng logic khác. Vì vậy chúng rất quan trọng trong thiết kế vi mạch.' },
    ],
    examples: [
      { q: 'Một báo động chỉ kêu khi cả cảm biến cửa VÀ cảm biến chuyển động đều phát hiện (đều = 1). Dùng cổng nào?', a: 'Dùng cổng AND. Đầu ra (chuông) chỉ bằng 1 (kêu) khi cả hai đầu vào đều 1; nếu chỉ một cảm biến phát hiện thì đầu ra vẫn 0, chuông không kêu.' },
      { q: 'Lập bảng chân lý của cổng XOR hai đầu vào A, B.', a: 'A=0,B=0 → 0; A=0,B=1 → 1; A=1,B=0 → 1; A=1,B=1 → 0. XOR cho 1 khi hai đầu vào khác nhau, cho 0 khi chúng giống nhau.' },
    ],
  },

  'H12CN-w28-quiz': {
    topic: 'Mạch xử lí tín hiệu số',
    intro: 'Các em ạ, để hiểu máy tính ta cần học hệ nhị phân và cách mạch số ghi nhớ thông tin. Hôm nay ta đổi số nhị phân — thập phân và làm quen với flip-flop, "ô nhớ" 1 bit.',
    objectives: [
      'Đổi số giữa hệ nhị phân và thập phân.',
      'Phân biệt mạch tổ hợp và mạch tuần tự.',
      'Hiểu vai trò của flip-flop và nguyên lí bộ nhớ.',
    ],
    theory: [
      { h: 'Hệ nhị phân' },
      { p: 'Hệ nhị phân chỉ dùng hai chữ số 0 và 1. Mỗi vị trí có trọng số là luỹ thừa của 2. Ví dụ 1011₂ = 1×8 + 0×4 + 1×2 + 1×1 = 11₁₀.' },
      { h: 'Mạch tổ hợp và mạch tuần tự' },
      { ul: [
        'Mạch tổ hợp (combinational): đầu ra chỉ phụ thuộc đầu vào hiện tại (cổng logic, mạch cộng).',
        'Mạch tuần tự (sequential): có trạng thái nhớ, đầu ra phụ thuộc cả đầu vào và trạng thái trước.',
      ] },
      { h: 'Flip-flop và bộ nhớ' },
      { p: 'Flip-flop là phần tử tuần tự cơ bản, lưu được 1 bit (các loại D, JK, T, SR). Bộ nhớ máy tính là mảng các tế bào nhớ: DRAM dùng tụ + transistor, SRAM dùng flip-flop.' },
      { note: 'Đổi thập phân sang nhị phân bằng cách chia liên tiếp cho 2, lấy số dư ngược từ dưới lên. Ví dụ 13 = 1101₂.' },
    ],
    examples: [
      { q: 'Đổi số 13₁₀ sang nhị phân.', a: '13 = 8 + 4 + 1 = 1×8 + 1×4 + 0×2 + 1×1 → 1101₂. Kiểm tra ngược: 8+4+0+1 = 13. Đúng.' },
      { q: 'Vì sao flip-flop được coi là "ô nhớ" còn cổng AND thì không?', a: 'Flip-flop là mạch tuần tự, có khả năng giữ lại (nhớ) trạng thái 1 bit ngay cả khi đầu vào thay đổi. Cổng AND là mạch tổ hợp, đầu ra thay đổi tức thì theo đầu vào, không lưu giữ gì.' },
    ],
  },

  'H12CN-w29-quiz': {
    topic: 'Thực hành — Mạch logic số',
    intro: 'Các em ơi, hôm nay ta cắm các IC logic họ 74xx lên breadboard, dùng LED để xem kết quả 0/1 và hiểu vì sao không được để đầu vào "lơ lửng". Thực hành để logic không còn trừu tượng.',
    objectives: [
      'Nhận biết các IC logic họ 74xx phổ biến.',
      'Hiển thị mức logic bằng LED và điện trở.',
      'Hiểu vấn đề đầu vào hở và cách dùng điện trở kéo.',
    ],
    theory: [
      { h: 'Các IC logic họ 74xx' },
      { ul: [
        '7408: 4 cổng AND 2 đầu vào (Quad AND).',
        '7400: 4 cổng NAND 2 đầu vào (Quad NAND).',
        '7404: 6 cổng NOT (Hex Inverter).',
      ] },
      { h: 'Hiển thị mức logic' },
      { p: 'Để quan sát đầu ra 0/1, nối một LED qua điện trở hạn dòng vào chân ra: LED sáng là mức 1, tắt là mức 0.' },
      { h: 'Đầu vào hở (floating)' },
      { note: 'Đầu vào cổng số để hở (floating) sẽ ở mức bất định, dễ gây hoạt động sai. Phải kéo về mức xác định: dùng điện trở pull-up nối lên VCC (mức 1) hoặc pull-down nối xuống GND (mức 0).' },
    ],
    examples: [
      { q: 'Lắp một cổng AND của IC 7408, nối hai đầu vào lên mức 1, đầu ra qua LED. LED sáng hay tắt?', a: 'LED sáng. Cổng AND cho đầu ra 1 khi tất cả đầu vào đều 1; đầu ra mức 1 làm LED sáng (qua điện trở hạn dòng).' },
      { q: 'Một mạch logic chạy chập chờn, lúc đúng lúc sai khi không tác động. Nguyên nhân thường gặp là gì?', a: 'Rất có thể do đầu vào để hở (floating) ở mức bất định, bị nhiễu làm dao động giữa 0 và 1. Khắc phục bằng cách thêm điện trở pull-up hoặc pull-down để cố định mức cho mọi đầu vào không dùng.' },
    ],
  },

  'H12CN-w30-quiz': {
    topic: 'Vi điều khiển — Khái quát',
    intro: 'Các em thân mến, vi điều khiển là "bộ não tí hon" điều khiển từ máy giặt, đồ chơi đến ô tô và robot. Hiểu MCU là bước vào kỉ nguyên thiết bị thông minh.',
    objectives: [
      'Trình bày khái niệm vi điều khiển (MCU).',
      'Phân biệt vi điều khiển với vi xử lí.',
      'Kể tên các ngoại vi và bộ nhớ quan trọng của MCU.',
    ],
    theory: [
      { h: 'Vi điều khiển là gì?' },
      { p: 'Vi điều khiển (MCU — Microcontroller) là một IC tích hợp sẵn CPU, bộ nhớ và các ngoại vi cơ bản trên cùng một chip. Đó là một "máy tính nhỏ" trên một con chip.' },
      { h: 'MCU khác vi xử lí (μP)' },
      { p: 'Vi điều khiển tích hợp sẵn RAM, ROM và ngoại vi nên dùng được ngay; còn vi xử lí (μP) chỉ là CPU, phải ghép thêm các chip nhớ và ngoại vi rời bên ngoài.' },
      { h: 'Bộ nhớ và ngoại vi' },
      { ul: [
        'Flash: lưu chương trình, giữ được khi mất điện (non-volatile).',
        'GPIO: chân vào/ra số.',
        'ADC: đọc tín hiệu tương tự; Timer/PWM: định thời, điều chế độ rộng xung.',
        'UART/I2C/SPI: các chuẩn giao tiếp với thiết bị khác.',
      ] },
      { note: 'Các họ MCU phổ biến cho học sinh: AVR (Arduino), ESP32, STM32, PIC. Trong đó Arduino dễ học nhất nhờ môi trường lập trình thân thiện.' },
    ],
    examples: [
      { q: 'Vì sao máy giặt thông minh dùng vi điều khiển chứ không dùng máy tính để bàn?', a: 'Vì MCU nhỏ gọn, giá rẻ, tiêu thụ ít điện và tích hợp sẵn mọi thứ cần thiết (CPU, bộ nhớ, ngoại vi) để điều khiển động cơ, van nước, đèn báo. Một máy tính để bàn sẽ thừa thãi và đắt đỏ.' },
      { q: 'Chương trình nạp vào MCU được lưu ở đâu để không mất khi tắt nguồn?', a: 'Lưu trong bộ nhớ Flash của MCU. Flash là bộ nhớ không bay hơi (non-volatile), giữ nguyên chương trình khi mất điện, nên bật lên là MCU chạy lại ngay.' },
    ],
  },

  'H12CN-w31-quiz': {
    topic: 'Bo mạch lập trình Arduino',
    intro: 'Các em ơi, Arduino là bo mạch giúp hàng triệu người bắt đầu với điện tử lập trình. Hôm nay ta tìm hiểu Arduino Uno: vi điều khiển, các chân và hai hàm "linh hồn" setup() với loop().',
    objectives: [
      'Nhận biết vi điều khiển và các chân của Arduino Uno.',
      'Biết điện áp logic của Arduino Uno.',
      'Hiểu vai trò của hàm setup() và loop().',
    ],
    theory: [
      { h: 'Phần cứng Arduino Uno' },
      { ul: [
        'Vi điều khiển: ATmega328P (AVR 8-bit).',
        '14 chân digital I/O (vào/ra số).',
        '6 chân vào tương tự ADC (A0–A5).',
        'Điện áp logic: 5V.',
      ] },
      { h: 'Cấu trúc chương trình Arduino' },
      { ul: [
        'setup(): chạy một lần khi khởi động, dùng để khai báo, cấu hình.',
        'loop(): chạy lặp đi lặp lại liên tục sau setup().',
      ] },
      { note: 'Mọi chương trình Arduino tối thiểu phải có hai hàm setup() và loop(). Hãy hình dung: setup() là chuẩn bị trước khi diễn, loop() là vở kịch lặp mãi.' },
      { h: 'Nạp chương trình cho Arduino' },
      { p: 'Dùng phần mềm Arduino IDE để viết mã, chọn đúng loại bo (Arduino Uno) và cổng kết nối, rồi nhấn Upload để nạp chương trình qua cáp USB vào bộ nhớ Flash của ATmega328P. Sau khi nạp xong, bo tự động chạy chương trình.' },
    ],
    examples: [
      { q: 'Muốn cấu hình một chân là ngõ ra và bật/tắt nó mỗi giây, đoạn cấu hình đặt ở hàm nào, đoạn nhấp nháy đặt ở hàm nào?', a: 'Cấu hình chân (pinMode OUTPUT) đặt trong setup() vì chỉ cần làm một lần. Đoạn bật/tắt lặp lại đặt trong loop() vì nó phải chạy đi chạy lại liên tục.' },
      { q: 'Arduino Uno có thể đọc trực tiếp cảm biến cho điện áp 0–5V analog không? Qua chân nào?', a: 'Có, qua các chân vào tương tự A0–A5 (ADC). Arduino Uno có 6 chân ADC, đọc điện áp 0–5V và trả về giá trị số 0–1023.' },
    ],
  },

  'H12CN-w32-quiz': {
    topic: 'Thực hành — Lập trình Arduino cơ bản',
    intro: 'Các em ạ, hôm nay ta viết những dòng lệnh Arduino đầu tiên: điều khiển chân, đọc tín hiệu, tạm dừng và in ra Serial Monitor. Lập trình điện tử bắt đầu từ đây.',
    objectives: [
      'Sử dụng các hàm cơ bản: pinMode, digitalWrite, analogRead.',
      'Dùng delay() để tạo thời gian chờ.',
      'In dữ liệu ra Serial Monitor để theo dõi.',
    ],
    theory: [
      { h: 'Các hàm vào/ra số' },
      { ul: [
        'pinMode(pin, OUTPUT/INPUT): đặt chế độ chân.',
        'digitalWrite(pin, HIGH/LOW): xuất mức cao/thấp ra chân.',
        'digitalRead(pin): đọc mức 0/1 từ chân.',
      ] },
      { h: 'Đọc tương tự và thời gian' },
      { ul: [
        'analogRead(pin): đọc điện áp tương tự, trả giá trị 0–1023 (ADC 10-bit).',
        'delay(ms): tạm dừng tính theo mili giây, delay(1000) = 1 giây.',
      ] },
      { h: 'Giao tiếp Serial' },
      { p: 'Serial.begin(9600) khởi tạo cổng nối tiếp tốc độ 9600 baud (đặt trong setup()). Serial.println(val) in giá trị kèm xuống dòng ra Serial Monitor để theo dõi, gỡ lỗi.' },
      { note: 'Phân biệt rõ: digitalWrite dùng cho mức số 0/1; analogWrite (PWM) dùng giá trị 0–255 để điều chỉnh độ sáng/tốc độ. Đừng nhầm chúng với nhau.' },
    ],
    examples: [
      { q: 'Viết ý tưởng đoạn lệnh làm LED ở chân 13 nháy 1 giây sáng, 1 giây tắt.', a: 'Trong setup(): pinMode(13, OUTPUT). Trong loop(): digitalWrite(13, HIGH); delay(1000); digitalWrite(13, LOW); delay(1000). Vòng loop lặp lại nên LED nháy mãi.' },
      { q: 'Muốn xem giá trị cảm biến đọc từ chân A0 trên máy tính thì dùng các hàm nào?', a: 'Trong setup() gọi Serial.begin(9600). Trong loop() đọc val = analogRead(A0) rồi Serial.println(val). Mở Serial Monitor ở Arduino IDE sẽ thấy giá trị 0–1023 hiển thị liên tục.' },
    ],
  },

  'H12CN-w33-quiz': {
    topic: 'Dự án — Mạch ứng dụng đơn giản',
    intro: 'Các em ơi, đến lúc ghép mọi thứ lại thành sản phẩm thật: đèn nháy, đọc nhiệt độ, điều khiển động cơ, đo khoảng cách và kết nối IoT. Đây là phần thú vị nhất — biến ý tưởng thành mạch chạy được.',
    objectives: [
      'Lắp được một số mạch ứng dụng cơ bản với Arduino.',
      'Hiểu vì sao cần driver khi điều khiển tải công suất lớn.',
      'Nắm khái niệm IoT và vai trò của module ESP.',
    ],
    theory: [
      { h: 'Các mạch ứng dụng cơ bản' },
      { ul: [
        'Đèn LED nháy: Arduino + LED + điện trở hạn dòng (220Ω) + dây nối.',
        'Đọc nhiệt độ LM35 (10mV/°C): dùng analogRead rồi quy đổi ra °C.',
        'Đo khoảng cách: cảm biến siêu âm HC-SR04 phát và thu sóng siêu âm.',
      ] },
      { h: 'Điều khiển tải công suất lớn' },
      { note: 'Không nối trực tiếp động cơ DC vào chân Arduino vì dòng lớn sẽ làm hỏng chip. Phải qua mạch driver (transistor hoặc cầu H L298) để cấp dòng cho động cơ.' },
      { h: 'IoT — Internet vạn vật' },
      { p: 'IoT (Internet of Things) là mạng các thiết bị thông minh kết nối Internet và trao đổi dữ liệu. Module ESP32/ESP8266 rất hợp với IoT vì tích hợp sẵn Wi-Fi/Bluetooth và lập trình được bằng Arduino IDE.' },
    ],
    examples: [
      { q: 'Vì sao không nối thẳng động cơ DC vào chân số của Arduino?', a: 'Vì động cơ cần dòng lớn, vượt khả năng cấp của chân Arduino, có thể làm cháy chip. Phải dùng driver (transistor đóng cắt hoặc module cầu H L298) để chân Arduino chỉ điều khiển, còn dòng lớn do nguồn riêng cấp qua driver.' },
      { q: 'Muốn làm thiết bị đo nhiệt độ phòng và xem qua điện thoại từ xa, cần những thành phần nào?', a: 'Cần cảm biến nhiệt độ (LM35 hoặc DHT), một MCU có Wi-Fi như ESP32/ESP8266 để đọc và gửi dữ liệu, mã lập trình, cùng một dịch vụ đám mây để lưu và hiển thị. Đó là một hệ thống IoT cơ bản.' },
    ],
  },

  'H12CN-w34-quiz': {
    topic: 'Ôn tập cả năm',
    intro: 'Các em thân mến, ta cùng nhìn lại bức tranh toàn cảnh cả năm: từ kĩ thuật điện đến điện tử, từ linh kiện đến vi điều khiển. Hệ thống chắc kiến thức sẽ giúp em tự tin trong kì thi.',
    objectives: [
      'Hệ thống kiến thức trọng tâm cả phần điện và điện tử.',
      'Ôn lại linh kiện, cổng logic và hệ nhị phân.',
      'Củng cố kiến thức về op-amp và Arduino.',
    ],
    theory: [
      { h: 'Phần điện cốt lõi' },
      { ul: [
        'Lưới VN: 220V/50Hz; hạ áp 3 pha 4 dây 380/220V.',
        'Tăng áp truyền tải để giảm tổn hao I²R.',
      ] },
      { h: 'Linh kiện và mạch điện tử' },
      { ul: [
        'Diode: dẫn một chiều A→K; op-amp: trở kháng vào lớn, ra nhỏ, KĐ rất lớn.',
        'Cổng AND: đầu ra 1 khi mọi đầu vào đều 1.',
        'Nhị phân: 1010₂ = 10₁₀.',
      ] },
      { h: 'Vi điều khiển' },
      { note: 'Arduino Uno dùng ATmega328P, điện áp logic 5V, có setup() chạy một lần và loop() lặp mãi. Đây là nền tảng cho mọi dự án điện tử lập trình.' },
    ],
    examples: [
      { q: 'Đổi 1010₂ sang thập phân và nêu một ứng dụng của diode.', a: '1010₂ = 1×8 + 0×4 + 1×2 + 0×1 = 10₁₀. Diode dẫn điện một chiều nên dùng trong mạch chỉnh lưu, biến điện AC thành DC cho bộ nguồn.' },
      { q: 'Nêu ba đặc điểm lí tưởng của op-amp.', a: 'Trở kháng vào vô cùng lớn (gần như không lấy dòng vào), trở kháng ra bằng 0, và hệ số khuếch đại hở vô cùng lớn. Nhờ vậy hệ số khuếch đại thực tế do tỉ số điện trở phản hồi quyết định.' },
    ],
  },

  'H12CN-w35-quiz': {
    topic: 'Thi học kỳ II — Điện tử',
    intro: 'Các em ơi, đây là phần tổng kết cuối cùng của chương trình Công nghệ 12. Cố gắng nắm chắc các IC, công thức op-amp, cổng logic và hàm Arduino để hoàn thành tốt bài thi học kì.',
    objectives: [
      'Tổng hợp kiến thức phần điện tử để làm bài thi.',
      'Vận dụng công thức op-amp và các IC thông dụng.',
      'Hiểu các thành phần của một dự án IoT.',
    ],
    theory: [
      { h: 'IC và mạch thông dụng' },
      { ul: [
        'IC 7805: ổn áp cho điện áp ra +5V.',
        'Chỉnh lưu cầu: dùng 4 diode, chỉnh lưu toàn kì.',
      ] },
      { h: 'Op-amp và cổng logic' },
      { ul: [
        'Mạch khuếch đại đảo: Av = − R_f/R_in.',
        'NOR = NOT(OR): đầu ra 1 chỉ khi tất cả đầu vào đều 0.',
      ] },
      { h: 'Arduino và IoT' },
      { note: 'analogWrite(pin, 0–255) tạo tín hiệu PWM để điều chỉnh độ sáng/tốc độ. Một dự án IoT đầy đủ cần cảm biến + MCU có Wi-Fi (ESP32/ESP8266) + mã lập trình + dịch vụ đám mây.' },
    ],
    examples: [
      { q: 'Mạch khuếch đại đảo có R_f = 20kΩ, R_in = 2kΩ. Tính Av.', a: 'Av = − R_f/R_in = − 20/2 = −10. Tín hiệu ra gấp 10 lần và ngược pha so với tín hiệu vào.' },
      { q: 'Cổng NOR cho đầu ra bằng 1 trong trường hợp nào?', a: 'NOR = NOT(OR) nên đầu ra bằng 1 chỉ khi tất cả đầu vào đều bằng 0. Nếu có bất kì đầu vào nào bằng 1 thì đầu ra NOR bằng 0.' },
    ],
  },

  'H12CN-w36-quiz': {
    topic: 'Kết thúc Công Nghệ THPT — Kỹ thuật vì cuộc sống tốt hơn',
    intro: 'Tuần cuối năm học Công Nghệ — hãy nhìn lại hành trình điện và điện tử: từ mạch điện cơ bản đến transistor và vi mạch. Công nghệ không phải là thứ xa lạ — đó là những gì đang chạy trong mỗi thiết bị bạn dùng hàng ngày.',
    objectives: [
      'Hệ thống hoá kiến thức Công Nghệ Điện–Điện tử 3 năm THPT.',
      'Nhận ra sự hiện diện của kỹ thuật điện và điện tử trong đời sống và công nghiệp.',
      'Định hướng nghề nghiệp cho những ai yêu thích kỹ thuật và công nghệ.',
    ],
    theory: [
      { h: 'Bản đồ Công Nghệ 3 năm THPT' },
      { ul: [
        'Lớp 10: An toàn điện, mạng điện dân dụng (sơ đồ, thiết bị đóng cắt, bảo vệ), mạch điện cơ bản, động cơ điện một pha.',
        'Lớp 11: Cơ sở kỹ thuật điện–điện tử (điện trở, tụ điện, cuộn cảm trong AC), transistor BJT cơ bản, mạch khuếch đại và dao động đơn giản.',
        'Lớp 12 HK1 (Điện): Lắp đặt mạng điện trong nhà, đọc bản vẽ điện, sửa chữa thiết bị điện đơn giản. HK2 (Điện tử): Kỹ thuật số (cổng logic, mạch tổ hợp/tuần tự), vi điều khiển Arduino cơ bản, dự án điện tử ứng dụng.',
      ] },
      { h: 'Điện và Điện tử ở khắp nơi trong cuộc sống' },
      { ul: [
        'Nhà thông minh (Smart Home): Cảm biến chuyển động, điều khiển ánh sáng và điều hoà qua WiFi — tất cả là điện tử nhúng và vi điều khiển.',
        'Xe điện: Pin lithium, motor điện, hệ thống quản lý pin (BMS) — kỹ thuật điện hiện đại nhất.',
        'Năng lượng tái tạo: Bộ nghịch lưu (inverter) trong điện mặt trời, turbine gió — chuyển đổi điện AC/DC.',
        'Y tế: Máy MRI, máy điện tim (ECG), máy trợ thính, máy tạo nhịp tim — tất cả là điện tử y sinh.',
      ] },
      { h: 'Nghề nghiệp kỹ thuật điện–điện tử' },
      { ul: [
        'Kỹ sư điện công nghiệp: Thiết kế, lắp đặt, vận hành hệ thống điện nhà máy, toà nhà.',
        'Kỹ sư điện tử nhúng (Embedded Systems): Lập trình vi điều khiển cho robot, xe tự lái, thiết bị y tế.',
        'Kỹ sư viễn thông: Mạng 5G, cáp quang, satellite — nhu cầu tăng mạnh.',
        'Kỹ thuật viên điện: Lắp đặt và sửa chữa điện dân dụng/công nghiệp — nghề thực hành ổn định.',
      ] },
      { h: 'An toàn điện — kiến thức suốt đời' },
      { p: 'Dù không làm kỹ thuật điện chuyên nghiệp, biết an toàn điện cơ bản sẽ bảo vệ bạn và gia đình: không sờ vào ổ điện, cầu dao khi tay ướt; dùng thiết bị chống rò điện (RCD/ELCB); ngắt nguồn điện trước khi sửa chữa; không kéo dài dây điện dưới thảm hoặc qua cửa.' },
      { note: 'Kỹ thuật viên và kỹ sư điện là những người giữ cho thế giới sáng lên — nghĩa đen. Từ ánh đèn trong bệnh viện đến hệ thống điện giữa đêm bão, họ là những người thầm lặng quan trọng nhất. Nếu em yêu thích điện tử, đây là con đường đáng theo đuổi.' },
    ],
    examples: [
      { q: 'Mạch tổ hợp và mạch tuần tự khác nhau như thế nào? Cho ví dụ ứng dụng mỗi loại.', a: 'Mạch tổ hợp: đầu ra CHỈ phụ thuộc đầu vào hiện tại, không có bộ nhớ. Ví dụ: bộ cộng (adder) trong CPU, mạch mã hoá/giải mã (encoder/decoder), mạch dồn kênh (multiplexer). Mạch tuần tự: đầu ra phụ thuộc đầu vào HIỆN TẠI và TRẠNG THÁI trước đó (có bộ nhớ). Ví dụ: flip-flop (D, JK, T) lưu 1 bit; thanh ghi dịch (shift register) trong truyền dữ liệu; bộ đếm (counter) trong đồng hồ số và đo tần số. Bộ nhớ RAM/ROM trong máy tính là mạch tuần tự phức tạp.' },
      { q: 'Giải thích nguyên lý hoạt động của một bộ chuyển đổi AC/DC đơn giản (adapter điện thoại).', a: 'Adapter điện thoại (switching power supply) gồm các giai đoạn: (1) Chỉnh lưu sơ cấp: AC 220V → DC 311V qua cầu diode. (2) Chuyển mạch (switching): Transistor MOSFET đóng/ngắt DC ở tần số cao (50–200 kHz) tạo xung. (3) Biến áp cao tần: Giảm điện áp xuống 5–12V — biến áp nhỏ gọn vì tần số cao. (4) Chỉnh lưu thứ cấp: AC thứ cấp → DC qua diode. (5) Lọc và ổn áp: Tụ điện lọc gợn sóng, IC ổn áp giữ điện áp đầu ra ổn định.' },
      { q: 'Em muốn làm một dự án điện tử đơn giản với Arduino. Đề xuất một ý tưởng và mô tả các linh kiện cần thiết.', a: 'Ý tưởng: Nhiệt kế số hiển thị LCD. Linh kiện: Arduino Uno, cảm biến nhiệt độ DHT11 hoặc DS18B20, màn hình LCD 16x2 (giao tiếp I2C để tiết kiệm chân), dây kết nối, nguồn 5V USB. Code đơn giản: đọc giá trị nhiệt độ từ cảm biến mỗi 2 giây, hiển thị lên LCD. Mở rộng: thêm buzzer cảnh báo khi >37.5°C, thêm module WiFi ESP8266 để gửi dữ liệu lên điện thoại qua Blynk app. Tổng chi phí: ~200.000–400.000 VND.' },
    ],
  },
};
