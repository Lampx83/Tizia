// ============================================================
// Lớp 12 · TOÁN — Lý thuyết theo tuần (35 tuần)
// Key TRÙNG id quiz: 'H12TOAN-wNN-quiz'.
// Bám CTGD 2018 (Toán 12) + định hướng ôn thi tốt nghiệp THPT:
//  - Ứng dụng đạo hàm & khảo sát hàm số (đơn điệu, cực trị, GTLN–GTNN, tiệm cận, đồ thị)
//  - Hàm số mũ – lôgarit, phương trình & bất phương trình mũ – lôgarit
//  - Nguyên hàm – tích phân & ứng dụng (diện tích, thể tích)
//  - Số phức
//  - Hình học toạ độ không gian Oxyz (vectơ, mặt phẳng, đường thẳng, mặt cầu)
//  - Khối đa diện, khối tròn xoay & bài toán thực tế
// ============================================================

export const H12TOAN_LESSONS = {
  'H12TOAN-w01-quiz': {
    topic: 'Tính đơn điệu của hàm số',
    intro: 'Các em mở đầu chương ứng dụng đạo hàm bằng việc dùng dấu của đạo hàm để biết hàm số tăng hay giảm trên từng khoảng — nền tảng của mọi bài khảo sát hàm số trong đề thi.',
    objectives: [
      'Phát biểu được điều kiện đồng biến, nghịch biến qua dấu của f\'(x).',
      'Lập bảng xét dấu đạo hàm và kết luận khoảng đơn điệu.',
      'Tìm tham số m để hàm số đơn điệu trên một khoảng cho trước.',
    ],
    theory: [
      { h: 'Định nghĩa đồng biến – nghịch biến' },
      { p: 'Hàm số y = f(x) đồng biến (tăng) trên khoảng K nếu với mọi x1 < x2 thuộc K thì f(x1) < f(x2); nghịch biến (giảm) nếu f(x1) > f(x2). Trên đồ thị, đồng biến là đi lên từ trái sang phải, nghịch biến là đi xuống.' },
      { h: 'Dấu hiệu qua đạo hàm' },
      { ul: [
        'Nếu f\'(x) > 0 với mọi x thuộc K thì f đồng biến trên K.',
        'Nếu f\'(x) < 0 với mọi x thuộc K thì f nghịch biến trên K.',
        'Định lý mở rộng: f\'(x) ≥ 0 (hoặc ≤ 0) trên K và f\'(x) = 0 chỉ tại hữu hạn điểm thì hàm vẫn đơn điệu.',
      ] },
      { h: 'Các bước xét tính đơn điệu' },
      { ul: [
        'Bước 1: Tìm tập xác định.',
        'Bước 2: Tính f\'(x), giải f\'(x) = 0 và tìm điểm f\' không xác định.',
        'Bước 3: Lập bảng xét dấu f\'(x), kết luận khoảng đồng biến/nghịch biến.',
      ] },
      { h: 'Điều kiện đơn điệu trên R cho hàm bậc ba' },
      { p: 'Với y = ax^3 + bx^2 + cx + d (a ≠ 0), đạo hàm y\' là tam thức bậc hai. Hàm đồng biến trên R khi a > 0 và Δ của y\' ≤ 0; nghịch biến trên R khi a < 0 và Δ ≤ 0.' },
      { note: 'Với hàm phân thức (ax+b)/(cx+d), đạo hàm y\' = (ad − bc)/(cx+d)^2 luôn cùng một dấu, nên hàm chỉ đồng biến hoặc chỉ nghịch biến trên mỗi khoảng xác định, không đổi chiều.' },
    ],
    examples: [
      { q: 'Xét tính đơn điệu của y = x^3 − 3x.', a: 'TXĐ R. y\' = 3x^2 − 3 = 0 ⇔ x = ±1. Bảng xét dấu: y\' > 0 khi x < −1 hoặc x > 1; y\' < 0 khi −1 < x < 1. Vậy hàm đồng biến trên (−∞;−1) và (1;+∞), nghịch biến trên (−1;1).' },
      { q: 'Tìm m để y = x^3 − 3mx^2 + 3x + 1 đồng biến trên R.', a: 'y\' = 3x^2 − 6mx + 3. Cần y\' ≥ 0 với mọi x ⇔ Δ\' = 9m^2 − 9 ≤ 0 ⇔ −1 ≤ m ≤ 1.' },
    ],
  },

  'H12TOAN-w02-quiz': {
    topic: 'Cực trị của hàm số',
    intro: 'Các em học cách tìm điểm cao nhất, thấp nhất cục bộ của đồ thị — cực đại, cực tiểu — một dạng xuất hiện gần như chắc chắn trong đề thi tốt nghiệp.',
    objectives: [
      'Phân biệt điểm cực trị, giá trị cực trị và điểm cực trị của đồ thị.',
      'Dùng quy tắc xét dấu đạo hàm hoặc đạo hàm cấp hai để tìm cực trị.',
      'Biện luận số cực trị theo tham số m.',
    ],
    theory: [
      { h: 'Khái niệm cực trị' },
      { p: 'Hàm f đạt cực đại tại x0 nếu f(x) < f(x0) với mọi x gần x0 (x ≠ x0); đạt cực tiểu nếu f(x) > f(x0). Giá trị f(x0) gọi là giá trị cực đại (cực tiểu), điểm (x0; f(x0)) là điểm cực trị của đồ thị.' },
      { h: 'Quy tắc 1 (xét dấu f\')' },
      { ul: [
        'f\'(x0) = 0 hoặc f\' không xác định tại x0 và f\' đổi dấu từ + sang − khi qua x0 → x0 là điểm cực đại.',
        'f\' đổi dấu từ − sang + khi qua x0 → x0 là điểm cực tiểu.',
        'f\' không đổi dấu → x0 không phải điểm cực trị.',
      ] },
      { h: 'Quy tắc 2 (đạo hàm cấp hai)' },
      { p: 'Nếu f\'(x0) = 0 và f\'\'(x0) < 0 thì x0 là điểm cực đại; nếu f\'\'(x0) > 0 thì x0 là điểm cực tiểu. Khi f\'\'(x0) = 0 thì phải dùng Quy tắc 1.' },
      { h: 'Số cực trị của một số dạng quen' },
      { ul: [
        'Hàm bậc ba: có 2 cực trị khi y\' có 2 nghiệm phân biệt (Δ > 0), không có cực trị khi Δ ≤ 0.',
        'Hàm trùng phương y = ax^4 + bx^2 + c: có 3 cực trị khi ab < 0, có 1 cực trị khi ab ≥ 0.',
      ] },
      { note: 'Điều kiện cần để có cực trị tại x0 là f\'(x0) = 0, nhưng chưa đủ: ví dụ y = x^3 có y\'(0) = 0 mà không có cực trị vì y\' không đổi dấu.' },
    ],
    examples: [
      { q: 'Tìm các điểm cực trị của y = x^3 − 3x^2 + 4.', a: 'y\' = 3x^2 − 6x = 3x(x − 2) = 0 ⇔ x = 0 hoặc x = 2. y\'\' = 6x − 6: y\'\'(0) = −6 < 0 nên x = 0 là cực đại (giá trị 4); y\'\'(2) = 6 > 0 nên x = 2 là cực tiểu (giá trị 0).' },
      { q: 'Tìm m để y = x^3 − 3x^2 + mx − 1 có 2 cực trị.', a: 'y\' = 3x^2 − 6x + m. Có 2 cực trị ⇔ y\' có 2 nghiệm phân biệt ⇔ Δ\' = 9 − 3m > 0 ⇔ m < 3.' },
    ],
  },

  'H12TOAN-w03-quiz': {
    topic: 'Giá trị lớn nhất, nhỏ nhất của hàm số trên đoạn',
    intro: 'Các em tìm GTLN và GTNN — bài toán tối ưu cốt lõi, vừa thi trắc nghiệm vừa ứng dụng vào các bài thực tế.',
    objectives: [
      'Phân biệt GTLN–GTNN trên đoạn và cực trị địa phương.',
      'Áp dụng quy trình tìm GTLN, GTNN của hàm liên tục trên đoạn [a;b].',
      'Vận dụng đổi biến để đưa bài toán phức tạp về hàm một biến.',
    ],
    theory: [
      { h: 'Định nghĩa' },
      { p: 'M là GTLN của f trên tập D nếu f(x) ≤ M với mọi x thuộc D và tồn tại x0 để f(x0) = M; tương tự cho GTNN. Ký hiệu max f và min f.' },
      { h: 'Quy tắc tìm trên đoạn [a;b]' },
      { ul: [
        'Bước 1: Tính f\'(x), tìm các điểm xi thuộc (a;b) mà f\'(xi) = 0 hoặc f\' không xác định.',
        'Bước 2: Tính f(a), f(b) và các f(xi).',
        'Bước 3: Số lớn nhất trong các giá trị đó là GTLN, số nhỏ nhất là GTNN.',
      ] },
      { h: 'Lưu ý quan trọng' },
      { p: 'Hàm liên tục trên đoạn đóng [a;b] luôn có GTLN và GTNN. Trên khoảng mở thì có thể không có, khi đó phải lập bảng biến thiên để kết luận.' },
      { h: 'Kỹ thuật đổi biến' },
      { p: 'Với hàm chứa biểu thức lượng giác hoặc mũ, đặt ẩn phụ t (kèm điều kiện miền của t) để đưa về hàm đa thức trên một đoạn rồi tìm GTLN–GTNN.' },
      { note: 'Sai lầm hay gặp: bỏ quên giá trị tại hai đầu mút a, b. Luôn so sánh đủ cả ba nhóm: f(a), f(b) và f tại các điểm tới hạn bên trong.' },
    ],
    examples: [
      { q: 'Tìm GTLN, GTNN của y = x + 4/x trên [1;3].', a: 'y\' = 1 − 4/x^2 = 0 ⇔ x = 2 (thuộc [1;3]). y(1) = 5; y(2) = 4; y(3) = 13/3 ≈ 4,33. Vậy GTNN = 4 tại x = 2; GTLN = 5 tại x = 1.' },
      { q: 'Tìm GTLN của y = x^3 − 3x + 1 trên [0;2].', a: 'y\' = 3x^2 − 3 = 0 ⇔ x = ±1; chỉ x = 1 thuộc [0;2]. y(0) = 1; y(1) = −1; y(2) = 3. Vậy GTLN = 3 tại x = 2.' },
    ],
  },

  'H12TOAN-w04-quiz': {
    topic: 'Đường tiệm cận của đồ thị hàm số',
    intro: 'Các em tìm hiểu tiệm cận đứng, tiệm cận ngang và tiệm cận xiên — những đường mà đồ thị tiến lại gần vô hạn, giúp vẽ đúng dáng đồ thị.',
    objectives: [
      'Định nghĩa và tìm tiệm cận đứng, tiệm cận ngang qua giới hạn.',
      'Nhận biết tiệm cận xiên của hàm phân thức.',
      'Đếm số đường tiệm cận của một đồ thị.',
    ],
    theory: [
      { h: 'Tiệm cận ngang' },
      { p: 'Đường thẳng y = y0 là tiệm cận ngang nếu lim f(x) = y0 khi x → +∞ hoặc x → −∞. Với hàm phân thức cùng bậc tử và mẫu, tiệm cận ngang bằng tỉ số hệ số bậc cao nhất.' },
      { h: 'Tiệm cận đứng' },
      { p: 'Đường thẳng x = x0 là tiệm cận đứng nếu một trong các giới hạn một phía của f(x) khi x → x0 bằng ±∞. Thường tìm ở các nghiệm của mẫu mà không bị khử bởi tử.' },
      { h: 'Tiệm cận xiên' },
      { ul: [
        'Có dạng y = ax + b với a ≠ 0.',
        'a = lim f(x)/x khi x → ∞; b = lim [f(x) − ax].',
        'Với phân thức bậc tử hơn bậc mẫu đúng 1 đơn vị, chia đa thức để tách phần ax + b.',
      ] },
      { h: 'Lưu ý khi đếm tiệm cận' },
      { p: 'Trước khi kết luận tiệm cận đứng, hãy rút gọn phân thức: nếu tử và mẫu có nhân tử chung, nghiệm đó chỉ là điểm gián đoạn bỏ được, không phải tiệm cận.' },
      { note: 'Hàm phân thức bậc nhất (ax+b)/(cx+d) luôn có đúng 1 tiệm cận đứng x = −d/c và 1 tiệm cận ngang y = a/c, giao điểm hai tiệm cận là tâm đối xứng của đồ thị.' },
    ],
    examples: [
      { q: 'Tìm các tiệm cận của y = (3x + 1)/(x − 2).', a: 'Mẫu bằng 0 tại x = 2, tử khác 0 → tiệm cận đứng x = 2. lim khi x → ∞ bằng 3 (tỉ số 3/1) → tiệm cận ngang y = 3.' },
      { q: 'Tìm tiệm cận xiên của y = x + 1/x.', a: 'a = lim (x + 1/x)/x = 1; b = lim (x + 1/x − x) = lim 1/x = 0. Vậy tiệm cận xiên là y = x. Ngoài ra có tiệm cận đứng x = 0.' },
    ],
  },

  'H12TOAN-w05-quiz': {
    topic: 'Khảo sát và vẽ đồ thị hàm số bậc ba',
    intro: 'Các em tổng hợp các kiến thức đạo hàm để khảo sát và vẽ đồ thị hàm bậc ba, đồng thời biện luận số nghiệm phương trình bằng đồ thị.',
    objectives: [
      'Thực hiện đủ các bước khảo sát hàm bậc ba.',
      'Xác định điểm uốn, tâm đối xứng của đồ thị.',
      'Biện luận số nghiệm của phương trình dạng f(x) = m.',
    ],
    theory: [
      { h: 'Sơ đồ khảo sát hàm số' },
      { ul: [
        'Tìm tập xác định.',
        'Xét sự biến thiên: tính y\', tìm cực trị, giới hạn, lập bảng biến thiên.',
        'Tìm điểm đặc biệt: giao Oy (x = 0), giao Ox, điểm uốn.',
        'Vẽ đồ thị dựa trên bảng biến thiên và các điểm đặc biệt.',
      ] },
      { h: 'Đặc trưng đồ thị bậc ba' },
      { p: 'Hàm y = ax^3 + bx^2 + cx + d có 2 dạng dáng: có hai cực trị (khi y\' có 2 nghiệm) hoặc đơn điệu (khi Δ của y\' ≤ 0). Đồ thị nhận điểm uốn làm tâm đối xứng.' },
      { h: 'Điểm uốn và tâm đối xứng' },
      { p: 'Điểm uốn là nơi y\'\' = 0 và đổi dấu. Với y = ax^3 + bx^2 + cx + d thì y\'\' = 6ax + 2b = 0 ⇔ x = −b/(3a); điểm uốn này chính là tâm đối xứng của đồ thị.' },
      { h: 'Biện luận số nghiệm bằng đồ thị' },
      { p: 'Số nghiệm của f(x) = m bằng số giao điểm của đồ thị y = f(x) với đường nằm ngang y = m. Dựa vào giá trị cực đại, cực tiểu để đếm.' },
      { note: 'Đồ thị bậc ba luôn có đúng 1 điểm uốn vì y\'\' là hàm bậc nhất, luôn có một nghiệm.' },
    ],
    examples: [
      { q: 'Tìm tâm đối xứng của đồ thị y = x^3 − 3x^2.', a: 'y\'\' = 6x − 6 = 0 ⇔ x = 1; y(1) = 1 − 3 = −2. Tâm đối xứng (điểm uốn) là (1; −2).' },
      { q: 'Biện luận số nghiệm của x^3 − 3x = m.', a: 'Xét f(x) = x^3 − 3x: cực đại f(−1) = 2, cực tiểu f(1) = −2. Đường y = m cắt đồ thị: 3 nghiệm khi −2 < m < 2; 2 nghiệm khi m = ±2; 1 nghiệm khi m < −2 hoặc m > 2.' },
    ],
  },

  'H12TOAN-w06-quiz': {
    topic: 'Khảo sát hàm trùng phương và hàm phân thức bậc nhất',
    intro: 'Các em khảo sát thêm hai dạng quen thuộc: hàm trùng phương (đối xứng qua Oy) và hàm phân thức bậc nhất (đồ thị hyperbol).',
    objectives: [
      'Khảo sát, vẽ đồ thị hàm trùng phương y = ax^4 + bx^2 + c.',
      'Khảo sát hàm phân thức (ax+b)/(cx+d), xác định tiệm cận và tâm đối xứng.',
      'Đếm giao điểm của đồ thị với một đường thẳng.',
    ],
    theory: [
      { h: 'Hàm trùng phương' },
      { p: 'y = ax^4 + bx^2 + c (a ≠ 0) là hàm chẵn nên đồ thị đối xứng qua trục Oy. y\' = 4ax^3 + 2bx = 2x(2ax^2 + b).' },
      { h: 'Số cực trị của hàm trùng phương' },
      { ul: [
        'ab < 0: y\' có 3 nghiệm → 3 cực trị (dáng hình chữ W hoặc M).',
        'ab ≥ 0: y\' chỉ có nghiệm x = 0 → 1 cực trị (dáng parabol mở).',
      ] },
      { h: 'Hàm phân thức bậc nhất' },
      { p: 'y = (ax+b)/(cx+d) có tập xác định R \\ {−d/c}. Đồ thị là hyperbol gồm hai nhánh, nhận x = −d/c làm tiệm cận đứng và y = a/c làm tiệm cận ngang.' },
      { h: 'Tâm đối xứng và tính đơn điệu' },
      { p: 'Giao điểm hai tiệm cận (−d/c; a/c) là tâm đối xứng. Đạo hàm y\' = (ad − bc)/(cx+d)^2 không đổi dấu nên hàm đơn điệu trên từng khoảng, không có cực trị.' },
      { note: 'Khi vẽ hyperbol, lấy thêm vài điểm hai bên tiệm cận đứng để xác định đúng nhánh đồ thị đi lên hay đi xuống.' },
    ],
    examples: [
      { q: 'Đếm số cực trị của y = x^4 − 2x^2 + 1.', a: 'Ở đây a = 1, b = −2 nên ab = −2 < 0 → 3 cực trị. Kiểm tra: y\' = 4x^3 − 4x = 4x(x^2 − 1) = 0 ⇔ x = 0; ±1, đúng 3 điểm.' },
      { q: 'Tìm tâm đối xứng của y = (x − 1)/(x + 2).', a: 'Tiệm cận đứng x = −2, tiệm cận ngang y = 1 (tỉ số 1/1). Tâm đối xứng là giao hai tiệm cận: (−2; 1).' },
    ],
  },

  'H12TOAN-w07-quiz': {
    topic: 'Sự tương giao của đồ thị và tiếp tuyến',
    intro: 'Các em học cách tìm giao điểm giữa hai đồ thị và viết phương trình tiếp tuyến — hai kỹ thuật xuất hiện thường xuyên trong câu vận dụng.',
    objectives: [
      'Tìm số giao điểm bằng cách xét phương trình hoành độ giao điểm.',
      'Viết phương trình tiếp tuyến tại một điểm và theo hệ số góc.',
      'Biện luận số giao điểm theo tham số m.',
    ],
    theory: [
      { h: 'Phương trình hoành độ giao điểm' },
      { p: 'Hoành độ giao điểm của y = f(x) và y = g(x) là nghiệm của f(x) = g(x). Số nghiệm phân biệt chính là số giao điểm; chú ý kiểm tra điều kiện xác định.' },
      { h: 'Tiếp tuyến tại một điểm' },
      { p: 'Tiếp tuyến của đồ thị y = f(x) tại điểm M(x0; f(x0)) có phương trình y = f\'(x0)·(x − x0) + f(x0). Hệ số góc tiếp tuyến chính là f\'(x0).' },
      { h: 'Tiếp tuyến theo hệ số góc k' },
      { ul: [
        'Giải f\'(x0) = k để tìm hoành độ tiếp điểm x0.',
        'Tính f(x0) rồi viết phương trình tiếp tuyến.',
        'Tiếp tuyến song song y = kx + m thì có hệ số góc k; vuông góc thì hệ số góc = −1/k.',
      ] },
      { h: 'Tiếp tuyến đi qua điểm cho trước' },
      { p: 'Gọi tiếp điểm (x0; f(x0)). Viết tiếp tuyến tổng quát rồi thay toạ độ điểm A để được phương trình theo x0; mỗi nghiệm x0 cho một tiếp tuyến.' },
      { note: 'Biện luận số nghiệm phương trình hoành độ giao điểm bằng cô lập tham số m rồi khảo sát hàm số là kỹ thuật then chốt cho các câu tương giao có tham số.' },
    ],
    examples: [
      { q: 'Viết phương trình tiếp tuyến của y = x^3 − 3x + 1 tại điểm có hoành độ x0 = 1.', a: 'y(1) = 1 − 3 + 1 = −1; y\'(x) = 3x^2 − 3 nên y\'(1) = 0. Tiếp tuyến: y = 0·(x − 1) + (−1) = −1.' },
      { q: 'Tìm m để đồ thị y = x^3 − 3x^2 + m cắt trục Ox tại 3 điểm phân biệt.', a: 'Xét g(x) = x^3 − 3x^2 có cực đại g(0) = 0, cực tiểu g(2) = −4. Phương trình g(x) = −m có 3 nghiệm ⇔ −4 < −m < 0 ⇔ 0 < m < 4.' },
    ],
  },

  'H12TOAN-w08-quiz': {
    topic: 'Ôn tập chương I – Khảo sát hàm số',
    intro: 'Các em hệ thống lại toàn bộ chương ứng dụng đạo hàm: đơn điệu, cực trị, GTLN–GTNN, tiệm cận, đồ thị và tương giao.',
    objectives: [
      'Liên kết các dấu hiệu đạo hàm để đọc nhanh bảng biến thiên.',
      'Giải thành thạo các dạng tìm tham số liên quan cực trị, đơn điệu, tương giao.',
      'Vận dụng tổng hợp vào câu hỏi trắc nghiệm vận dụng cao.',
    ],
    theory: [
      { h: 'Bản đồ kiến thức chương I' },
      { ul: [
        'Đơn điệu: xét dấu f\'(x).',
        'Cực trị: f\'(x) = 0 và f\' đổi dấu (hoặc f\'\').',
        'GTLN–GTNN trên đoạn: so sánh f tại điểm tới hạn và hai đầu mút.',
        'Tiệm cận: dùng giới hạn.',
        'Tương giao và tiếp tuyến: phương trình hoành độ giao điểm và y = f\'(x0)(x − x0) + f(x0).',
      ] },
      { h: 'Đọc bảng biến thiên' },
      { p: 'Từ bảng biến thiên có thể đọc ngay khoảng đơn điệu, số cực trị, giá trị cực trị, giới hạn ở vô cực và từ đó suy ra dáng đồ thị, số nghiệm phương trình f(x) = m.' },
      { h: 'Mẹo cho hàm hợp và hàm chứa trị tuyệt đối' },
      { p: 'Số cực trị của y = f(|x|) hoặc y = |f(x)| thường được suy từ số cực trị của f và số giao điểm với trục Ox; nên vẽ phác hoặc lập bảng dấu cẩn thận.' },
      { note: 'Khi gặp tham số, ưu tiên cô lập m về một vế rồi khảo sát hàm số vế còn lại — đây là chiến lược an toàn cho hầu hết bài biện luận.' },
    ],
    examples: [
      { q: 'Cho f\'(x) = (x − 1)(x − 2)^2. Hỏi f có mấy cực trị?', a: 'f\' = 0 tại x = 1 và x = 2. Tại x = 1, f\' đổi dấu (nghiệm đơn) → 1 cực trị. Tại x = 2, f\' không đổi dấu (nghiệm kép) → không cực trị. Vậy f có đúng 1 cực trị.' },
      { q: 'Tìm tâm đối xứng của đồ thị y = (2x + 1)/(x − 1).', a: 'Tiệm cận đứng x = 1, tiệm cận ngang y = 2 (tỉ số 2/1). Tâm đối xứng là (1; 2).' },
    ],
  },

  'H12TOAN-w09-quiz': {
    topic: 'Luỹ thừa và hàm số mũ',
    intro: 'Các em chuyển sang chương hàm mũ – lôgarit, bắt đầu từ luỹ thừa với số mũ thực và tính chất của hàm số mũ.',
    objectives: [
      'Nắm các quy tắc tính luỹ thừa với số mũ hữu tỉ, thực.',
      'Xác định tập xác định và tính đơn điệu của hàm số mũ.',
      'Tính đạo hàm của hàm số mũ.',
    ],
    theory: [
      { h: 'Luỹ thừa và quy tắc' },
      { ul: [
        'a^m · a^n = a^(m+n); a^m / a^n = a^(m−n).',
        '(a^m)^n = a^(mn); (ab)^n = a^n · b^n.',
        'a^(m/n) = căn bậc n của a^m (a > 0); a^0 = 1; a^(−n) = 1/a^n.',
      ] },
      { h: 'Hàm số mũ' },
      { p: 'Hàm y = a^x (a > 0, a ≠ 1) có tập xác định R, tập giá trị (0; +∞), đồ thị luôn nằm trên trục hoành và đi qua điểm (0; 1).' },
      { h: 'Tính đơn điệu' },
      { ul: [
        'a > 1: hàm đồng biến trên R.',
        '0 < a < 1: hàm nghịch biến trên R.',
      ] },
      { h: 'Đạo hàm hàm mũ' },
      { p: 'Công thức: (e^x)\' = e^x; (a^x)\' = a^x · ln a. Với hàm hợp: (e^u)\' = u\'·e^u; (a^u)\' = u\'·a^u·ln a.' },
      { note: 'Với số mũ nguyên âm hoặc số mũ không nguyên, cơ số phải dương (hoặc khác 0) — luôn đặt điều kiện cho cơ số khi tìm tập xác định.' },
    ],
    examples: [
      { q: 'Rút gọn a^(2/3) · a^(1/2) (a > 0).', a: 'Cộng số mũ: 2/3 + 1/2 = 4/6 + 3/6 = 7/6. Kết quả a^(7/6).' },
      { q: 'Tính đạo hàm của y = e^(2x) và y = 3^x.', a: 'y = e^(2x): y\' = (2x)\'·e^(2x) = 2e^(2x). y = 3^x: y\' = 3^x · ln 3.' },
    ],
  },

  'H12TOAN-w10-quiz': {
    topic: 'Lôgarit và hàm số lôgarit',
    intro: 'Các em làm quen với lôgarit — phép toán ngược của luỹ thừa — và các quy tắc biến đổi quan trọng dùng để giải phương trình về sau.',
    objectives: [
      'Hiểu định nghĩa lôgarit và các tính chất cơ bản.',
      'Vận dụng quy tắc lôgarit của tích, thương, luỹ thừa.',
      'Tìm tập xác định và đạo hàm của hàm số lôgarit.',
    ],
    theory: [
      { h: 'Định nghĩa lôgarit' },
      { p: 'Với a > 0, a ≠ 1 và b > 0: log_a(b) = c ⇔ a^c = b. Lôgarit cơ số 10 viết là log (hoặc lg), cơ số e viết là ln.' },
      { h: 'Tính chất cơ bản' },
      { ul: [
        'log_a(1) = 0; log_a(a) = 1.',
        'a^(log_a b) = b; log_a(a^x) = x.',
      ] },
      { h: 'Quy tắc tính lôgarit' },
      { ul: [
        'log_a(xy) = log_a(x) + log_a(y).',
        'log_a(x/y) = log_a(x) − log_a(y).',
        'log_a(x^n) = n·log_a(x).',
        'Đổi cơ số: log_a(b) = log_c(b) / log_c(a).',
      ] },
      { h: 'Hàm số lôgarit và đạo hàm' },
      { p: 'Hàm y = log_a(x) có tập xác định (0; +∞), đồng biến khi a > 1, nghịch biến khi 0 < a < 1. Đạo hàm: (ln x)\' = 1/x; (log_a x)\' = 1/(x·ln a); với hàm hợp (ln u)\' = u\'/u.' },
      { note: 'Khi tìm tập xác định của hàm chứa log, biểu thức bên trong log phải dương — giải bất phương trình đó cho miền xác định.' },
    ],
    examples: [
      { q: 'Tính log_2(8) và log_3(27) + log_2(1/4).', a: 'log_2(8) = 3 vì 2^3 = 8. log_3(27) = 3, log_2(1/4) = −2, tổng = 3 + (−2) = 1.' },
      { q: 'Tìm tập xác định và đạo hàm của y = ln(x^2 + 1).', a: 'Vì x^2 + 1 > 0 với mọi x nên TXĐ là R. Đạo hàm: y\' = (x^2 + 1)\'/(x^2 + 1) = 2x/(x^2 + 1).' },
    ],
  },

  'H12TOAN-w11-quiz': {
    topic: 'Phương trình mũ và lôgarit',
    intro: 'Các em học các phương pháp giải phương trình mũ và lôgarit: đưa về cùng cơ số, đặt ẩn phụ và lôgarit hoá.',
    objectives: [
      'Giải phương trình mũ, lôgarit cơ bản bằng cách đưa về cùng cơ số.',
      'Dùng ẩn phụ để giải phương trình bậc hai theo a^x hoặc log.',
      'Đặt và xử lý điều kiện xác định cho phương trình lôgarit.',
    ],
    theory: [
      { h: 'Phương trình cơ bản' },
      { ul: [
        'a^x = b (b > 0) ⇔ x = log_a(b).',
        'a^(f(x)) = a^(g(x)) ⇔ f(x) = g(x).',
        'log_a(f(x)) = b ⇔ f(x) = a^b (kèm điều kiện f(x) > 0).',
        'log_a(f(x)) = log_a(g(x)) ⇔ f(x) = g(x) > 0.',
      ] },
      { h: 'Phương pháp đặt ẩn phụ' },
      { p: 'Với phương trình bậc hai theo a^x, đặt t = a^x với điều kiện t > 0, giải phương trình bậc hai theo t rồi quay lại tìm x. Tương tự đặt t = log_a(x) cho phương trình lôgarit.' },
      { h: 'Phương pháp lôgarit hoá' },
      { p: 'Khi hai vế đều dương và khó đưa về cùng cơ số, lấy lôgarit hai vế (thường ln) để hạ bậc mũ về phương trình đại số.' },
      { h: 'Điều kiện xác định' },
      { p: 'Phương trình lôgarit luôn phải đặt điều kiện cho các biểu thức trong log dương trước khi giải, và loại nghiệm không thoả điều kiện sau khi giải.' },
      { note: 'Với phương trình đặt ẩn phụ, đừng quên điều kiện t > 0 (khi t = a^x); nhiều nghiệm sai do giữ lại giá trị t âm.' },
    ],
    examples: [
      { q: 'Giải 4^x − 5·2^x + 4 = 0.', a: 'Đặt t = 2^x > 0: t^2 − 5t + 4 = 0 ⇔ t = 1 hoặc t = 4. Với t = 1 ⇒ x = 0; với t = 4 ⇒ x = 2.' },
      { q: 'Giải log_2(x − 1) = 3.', a: 'Điều kiện x > 1. Phương trình ⇔ x − 1 = 2^3 = 8 ⇔ x = 9 (thoả điều kiện).' },
    ],
  },

  'H12TOAN-w12-quiz': {
    topic: 'Bất phương trình mũ và lôgarit',
    intro: 'Các em mở rộng kỹ thuật giải sang bất phương trình mũ – lôgarit, đặc biệt chú ý chiều bất đẳng thức phụ thuộc vào cơ số.',
    objectives: [
      'Giải bất phương trình mũ, lôgarit cơ bản.',
      'Xử lý đúng chiều bất đẳng thức theo cơ số lớn hay nhỏ hơn 1.',
      'Dùng ẩn phụ cho bất phương trình bậc hai theo a^x hoặc log.',
    ],
    theory: [
      { h: 'Bất phương trình mũ' },
      { ul: [
        'a > 1: a^(f(x)) > a^(g(x)) ⇔ f(x) > g(x) (giữ chiều).',
        '0 < a < 1: a^(f(x)) > a^(g(x)) ⇔ f(x) < g(x) (đổi chiều).',
      ] },
      { h: 'Bất phương trình lôgarit' },
      { ul: [
        'a > 1: log_a(f) > log_a(g) ⇔ f > g > 0 (giữ chiều).',
        '0 < a < 1: log_a(f) > log_a(g) ⇔ 0 < f < g (đổi chiều).',
        'Luôn kèm điều kiện các biểu thức trong log dương.',
      ] },
      { h: 'Phương pháp ẩn phụ' },
      { p: 'Đặt t = a^x (t > 0) hoặc t = log_a(x) để đưa về bất phương trình bậc hai theo t, giải tập nghiệm của t rồi suy ra x.' },
      { h: 'Ghi nhớ then chốt' },
      { p: 'Quy tắc quyết định mọi lời giải: cơ số lớn hơn 1 thì giữ nguyên chiều, cơ số nằm giữa 0 và 1 thì đổi chiều bất đẳng thức khi bỏ mũ hoặc bỏ log.' },
      { note: 'Sai lầm phổ biến nhất là quên đổi chiều khi cơ số nhỏ hơn 1. Hãy ghi rõ cơ số trước khi bỏ mũ/log.' },
    ],
    examples: [
      { q: 'Giải (1/2)^x > 4.', a: 'Viết 4 = (1/2)^(−2). Vì cơ số 1/2 < 1 nên đổi chiều: (1/2)^x > (1/2)^(−2) ⇔ x < −2.' },
      { q: 'Giải log_2(x − 1) ≤ 3.', a: 'Điều kiện x > 1. Cơ số 2 > 1 giữ chiều: x − 1 ≤ 2^3 = 8 ⇔ x ≤ 9. Kết hợp điều kiện: 1 < x ≤ 9.' },
    ],
  },

  'H12TOAN-w13-quiz': {
    topic: 'Nguyên hàm',
    intro: 'Các em bắt đầu chương tích phân với khái niệm nguyên hàm — bài toán ngược của đạo hàm — và bảng nguyên hàm cơ bản.',
    objectives: [
      'Hiểu định nghĩa nguyên hàm và họ nguyên hàm + C.',
      'Thuộc bảng nguyên hàm các hàm số cơ bản.',
      'Áp dụng tính chất tuyến tính để tính nguyên hàm.',
    ],
    theory: [
      { h: 'Định nghĩa nguyên hàm' },
      { p: 'F(x) là một nguyên hàm của f(x) trên K nếu F\'(x) = f(x) với mọi x thuộc K. Mọi nguyên hàm của f đều có dạng F(x) + C với C là hằng số.' },
      { h: 'Bảng nguyên hàm cơ bản' },
      { ul: [
        '∫ x^n dx = x^(n+1)/(n+1) + C (n ≠ −1).',
        '∫ (1/x) dx = ln|x| + C.',
        '∫ e^x dx = e^x + C; ∫ a^x dx = a^x/ln a + C.',
        '∫ cos x dx = sin x + C; ∫ sin x dx = −cos x + C.',
        '∫ 1/cos^2 x dx = tan x + C; ∫ 1/sin^2 x dx = −cot x + C.',
      ] },
      { h: 'Tính chất tuyến tính' },
      { p: '∫ [k·f(x) + h(x)] dx = k·∫ f(x) dx + ∫ h(x) dx. Nguyên hàm của một tổng bằng tổng các nguyên hàm, hằng số đưa ra ngoài dấu tích phân.' },
      { h: 'Kiểm tra kết quả' },
      { p: 'Để chắc chắn, đạo hàm kết quả vừa tìm: nếu được lại f(x) thì nguyên hàm đúng.' },
      { note: 'Đừng quên hằng số C trong mọi nguyên hàm bất định — đây là dấu hiệu nhận biết bài làm hoàn chỉnh.' },
    ],
    examples: [
      { q: 'Tính ∫ (3x^2 + 2x) dx.', a: 'Nguyên hàm từng số hạng: ∫3x^2 dx = x^3, ∫2x dx = x^2. Kết quả: x^3 + x^2 + C.' },
      { q: 'Tính ∫ (1/cos^2 x) dx.', a: 'Vì (tan x)\' = 1/cos^2 x nên ∫ 1/cos^2 x dx = tan x + C.' },
    ],
  },

  'H12TOAN-w14-quiz': {
    topic: 'Phương pháp đổi biến và nguyên hàm từng phần',
    intro: 'Các em học hai kỹ thuật mạnh để tính nguyên hàm phức tạp: đổi biến số và nguyên hàm từng phần.',
    objectives: [
      'Áp dụng đổi biến để đơn giản hoá tích phân.',
      'Dùng công thức nguyên hàm từng phần đúng thứ tự ưu tiên.',
      'Nhận dạng nhanh khi nào dùng phương pháp nào.',
    ],
    theory: [
      { h: 'Phương pháp đổi biến' },
      { p: 'Đặt u = u(x) sao cho du = u\'(x) dx xuất hiện trong tích phân. Đưa về ∫ g(u) du, tính rồi thay u trở lại theo x. Dạng quen: ∫ u\'/u dx = ln|u| + C.' },
      { h: 'Công thức từng phần' },
      { p: '∫ u dv = u·v − ∫ v du. Chọn u và dv khéo léo để tích phân ∫ v du đơn giản hơn ban đầu.' },
      { h: 'Thứ tự ưu tiên chọn u (LIATE)' },
      { ul: [
        'L – lôgarit (ln x, log).',
        'I – hàm ngược.',
        'A – đa thức (algebraic).',
        'T – lượng giác (sin, cos).',
        'E – mũ (e^x). Ưu tiên đặt u theo thứ tự này, phần còn lại là dv.',
      ] },
      { h: 'Nhận dạng nhanh' },
      { p: 'Nếu thấy đạo hàm của một biểu thức nằm sẵn trong tích phân thì dùng đổi biến; nếu là tích của đa thức với mũ/lượng giác/log thì dùng từng phần.' },
      { note: 'Với ∫ x·e^x dx hay ∫ x·sin x dx, đặt u là phần đa thức (x) để sau một bước từng phần đa thức biến mất, tích phân còn lại tính được ngay.' },
    ],
    examples: [
      { q: 'Tính ∫ 2x/(x^2 + 1) dx bằng đổi biến.', a: 'Đặt u = x^2 + 1 thì du = 2x dx. Tích phân thành ∫ du/u = ln|u| + C = ln(x^2 + 1) + C.' },
      { q: 'Tính ∫ x·e^x dx bằng từng phần.', a: 'Đặt u = x, dv = e^x dx ⇒ du = dx, v = e^x. ∫ x·e^x dx = x·e^x − ∫ e^x dx = x·e^x − e^x + C = (x − 1)e^x + C.' },
    ],
  },

  'H12TOAN-w15-quiz': {
    topic: 'Tích phân – Định nghĩa và tính chất',
    intro: 'Các em chuyển sang tích phân xác định, học công thức Newton–Leibniz và các tính chất giúp tính nhanh.',
    objectives: [
      'Hiểu định nghĩa tích phân xác định và công thức Newton–Leibniz.',
      'Vận dụng các tính chất: tuyến tính, đổi cận đổi dấu, tách cận.',
      'Nhận biết tích phân của hàm chẵn, hàm lẻ trên đoạn đối xứng.',
    ],
    theory: [
      { h: 'Công thức Newton–Leibniz' },
      { p: 'Nếu F là một nguyên hàm của f trên [a;b] thì tích phân từ a đến b của f(x) dx bằng F(b) − F(a), viết là [F(x)] với cận a, b.' },
      { h: 'Tính chất cơ bản' },
      { ul: [
        '∫ từ a đến a của f = 0.',
        'Đổi cận đổi dấu: ∫ từ a đến b = − ∫ từ b đến a.',
        'Tách cận: ∫ từ a đến b = ∫ từ a đến c + ∫ từ c đến b.',
        'Tuyến tính: ∫ [k·f + h] = k·∫ f + ∫ h.',
      ] },
      { h: 'Hàm chẵn, hàm lẻ trên đoạn đối xứng' },
      { ul: [
        'f lẻ: ∫ từ −a đến a của f(x) dx = 0.',
        'f chẵn: ∫ từ −a đến a của f(x) dx = 2·∫ từ 0 đến a của f(x) dx.',
      ] },
      { h: 'Đổi biến trong tích phân xác định' },
      { p: 'Khi đổi biến u = u(x), phải đổi luôn cận tích phân theo u, khi đó không cần thay biến trở lại x.' },
      { note: 'Tích phân xác định cho ra một con số (không có hằng số C), khác với nguyên hàm bất định.' },
    ],
    examples: [
      { q: 'Tính ∫ từ 0 đến 1 của x^2 dx.', a: 'Nguyên hàm x^3/3. Giá trị = (1^3)/3 − (0)/3 = 1/3.' },
      { q: 'Tính ∫ từ 0 đến π của sin x dx.', a: 'Nguyên hàm −cos x. Giá trị = (−cos π) − (−cos 0) = (1) − (−1) = 2.' },
    ],
  },

  'H12TOAN-w16-quiz': {
    topic: 'Ứng dụng tích phân – Diện tích hình phẳng',
    intro: 'Các em dùng tích phân để tính diện tích hình phẳng giới hạn bởi đồ thị, một ứng dụng quan trọng và hay gặp trong đề thi.',
    objectives: [
      'Tính diện tích hình giới hạn bởi đồ thị và trục Ox.',
      'Tính diện tích hình kẹp giữa hai đồ thị.',
      'Xác định cận tích phân từ giao điểm các đường.',
    ],
    theory: [
      { h: 'Diện tích giữa đồ thị và trục Ox' },
      { p: 'Diện tích hình giới hạn bởi y = f(x), trục Ox và hai đường x = a, x = b là S = ∫ từ a đến b của |f(x)| dx. Dùng trị tuyệt đối vì diện tích luôn không âm.' },
      { h: 'Diện tích giữa hai đồ thị' },
      { p: 'Diện tích hình giới hạn bởi y = f(x) và y = g(x) trên [a;b] là S = ∫ từ a đến b của |f(x) − g(x)| dx, trong đó a, b là hoành độ giao điểm.' },
      { h: 'Các bước tính' },
      { ul: [
        'Tìm hoành độ giao điểm bằng cách giải f(x) = g(x) để xác định cận.',
        'Xét dấu của f(x) − g(x) trên từng khoảng để bỏ trị tuyệt đối.',
        'Tính tích phân từng khoảng rồi cộng các diện tích.',
      ] },
      { h: 'Lưu ý đổi dấu' },
      { p: 'Nếu hiệu f − g đổi dấu trên đoạn, phải chia đoạn tại giao điểm và lấy tổng các phần (mỗi phần lấy giá trị dương).' },
      { note: 'Không bao giờ tính diện tích bằng tích phân thiếu trị tuyệt đối khi đồ thị cắt nhau hoặc cắt trục — kết quả có thể bị triệt tiêu thành số sai.' },
    ],
    examples: [
      { q: 'Tính diện tích hình giới hạn bởi y = x^2, trục Ox, x = 0, x = 2.', a: 'Trên [0;2], x^2 ≥ 0 nên S = ∫ từ 0 đến 2 của x^2 dx = [x^3/3] = 8/3.' },
      { q: 'Tính diện tích hình kẹp giữa y = x và y = x^2 trên [0;1].', a: 'Trên [0;1], x ≥ x^2 nên S = ∫ từ 0 đến 1 của (x − x^2) dx = 1/2 − 1/3 = 1/6.' },
    ],
  },

  'H12TOAN-w17-quiz': {
    topic: 'Ứng dụng tích phân – Thể tích khối tròn xoay',
    intro: 'Các em tiếp tục với ứng dụng tính thể tích vật thể và khối tròn xoay sinh ra khi quay hình phẳng quanh một trục.',
    objectives: [
      'Áp dụng công thức thể tích khối tròn xoay quanh trục Ox.',
      'Tính thể tích vật thể qua tích phân diện tích thiết diện.',
      'Liên hệ với các khối tròn xoay quen thuộc.',
    ],
    theory: [
      { h: 'Thể tích theo thiết diện' },
      { p: 'Nếu vật thể có thiết diện vuông góc với trục Ox tại hoành độ x có diện tích S(x) thì thể tích V = ∫ từ a đến b của S(x) dx.' },
      { h: 'Khối tròn xoay quanh Ox' },
      { p: 'Khi quay hình giới hạn bởi y = f(x), trục Ox, x = a, x = b quanh Ox, mỗi thiết diện là hình tròn bán kính |f(x)|, nên V = π·∫ từ a đến b của f(x)^2 dx (công thức đĩa tròn).' },
      { h: 'Khối tròn xoay giữa hai đường' },
      { p: 'Khi quay hình giữa y = f(x) và y = g(x) (với |f| ≥ |g|) quanh Ox: V = π·∫ từ a đến b của [f(x)^2 − g(x)^2] dx.' },
      { h: 'Các khối quen thuộc' },
      { ul: [
        'Tam giác vuông quay quanh cạnh góc vuông → khối nón.',
        'Hình chữ nhật quay quanh một cạnh → khối trụ.',
        'Nửa hình tròn quay quanh đường kính → khối cầu.',
      ] },
      { note: 'Chú ý dấu bình phương trong công thức: phải lấy f(x)^2 chứ không phải f(x), vì bán kính được bình phương khi tính diện tích hình tròn.' },
    ],
    examples: [
      { q: 'Tính thể tích khối tròn xoay sinh bởi y = x, Ox, x = 0, x = 1 khi quay quanh Ox.', a: 'V = π·∫ từ 0 đến 1 của x^2 dx = π·[x^3/3] = π/3.' },
      { q: 'Tính thể tích khi quay y = √x quanh Ox, x thuộc [0;1].', a: 'f(x)^2 = x. V = π·∫ từ 0 đến 1 của x dx = π·[x^2/2] = π/2.' },
    ],
  },

  'H12TOAN-w18-quiz': {
    topic: 'Ôn tập học kỳ I',
    intro: 'Các em ôn tổng hợp học kỳ I: khảo sát hàm số, mũ – lôgarit, nguyên hàm – tích phân và các ứng dụng.',
    objectives: [
      'Củng cố các dạng bài trọng tâm của ba chương đầu.',
      'Rèn kỹ năng kết hợp nhiều kiến thức trong một câu hỏi.',
      'Tự kiểm tra qua các đề luyện tập tổng hợp.',
    ],
    theory: [
      { h: 'Chương I – Khảo sát hàm số' },
      { p: 'Ôn lại: đơn điệu (dấu f\'), cực trị, GTLN–GTNN trên đoạn, tiệm cận, vẽ đồ thị và tương giao. Đặc biệt thành thạo các bài tìm tham số m.' },
      { h: 'Chương II – Mũ và lôgarit' },
      { ul: [
        'Quy tắc luỹ thừa, lôgarit và đổi cơ số.',
        'Phương trình, bất phương trình: đưa về cùng cơ số, ẩn phụ, lôgarit hoá.',
        'Đạo hàm hàm mũ, lôgarit.',
      ] },
      { h: 'Chương III – Nguyên hàm, tích phân' },
      { ul: [
        'Bảng nguyên hàm, đổi biến, từng phần.',
        'Công thức Newton–Leibniz và tính chất.',
        'Ứng dụng tính diện tích, thể tích.',
      ] },
      { h: 'Chiến lược ôn thi' },
      { p: 'Phân bổ thời gian theo mức độ: nắm chắc câu nhận biết – thông hiểu trước, sau đó luyện vận dụng. Ghi nhớ công thức bằng cách làm bài, không học vẹt.' },
      { note: 'Lập một trang công thức cô đọng cho từng chương và xem lại mỗi ngày trước kỳ thi để giữ kiến thức ở mức sẵn sàng.' },
    ],
    examples: [
      { q: 'Tính ∫ từ 0 đến 1 của (e^x + 1) dx.', a: 'Nguyên hàm e^x + x. Giá trị = (e^1 + 1) − (e^0 + 0) = (e + 1) − 1 = e.' },
      { q: 'Giải log_2(x) + log_2(x − 2) = 3.', a: 'Điều kiện x > 2. Phương trình ⇔ log_2[x(x − 2)] = 3 ⇔ x^2 − 2x = 8 ⇔ x^2 − 2x − 8 = 0 ⇔ x = 4 hoặc x = −2. Chỉ x = 4 thoả điều kiện.' },
    ],
  },

  'H12TOAN-w19-quiz': {
    topic: 'Số phức – Khái niệm và phép toán',
    intro: 'Các em mở đầu học kỳ II với số phức, mở rộng tập số để mọi phương trình bậc hai đều có nghiệm.',
    objectives: [
      'Hiểu dạng đại số z = a + bi, phần thực, phần ảo, đơn vị ảo i.',
      'Thực hiện cộng, trừ, nhân số phức và tìm số phức liên hợp.',
      'Tính mô-đun của số phức.',
    ],
    theory: [
      { h: 'Định nghĩa số phức' },
      { p: 'Số phức có dạng z = a + bi với a, b là số thực và i là đơn vị ảo thoả i^2 = −1. a là phần thực, b là phần ảo của z.' },
      { h: 'Số phức liên hợp và mô-đun' },
      { ul: [
        'Liên hợp của z = a + bi là z̄ = a − bi (đổi dấu phần ảo).',
        'Mô-đun: |z| = căn bậc hai của (a^2 + b^2).',
        'z · z̄ = a^2 + b^2 = |z|^2; z + z̄ = 2a.',
      ] },
      { h: 'Các phép toán' },
      { ul: [
        'Cộng/trừ: cộng (trừ) phần thực với phần thực, phần ảo với phần ảo.',
        'Nhân: nhân như đa thức rồi thay i^2 = −1.',
        '(a + bi)(a − bi) = a^2 + b^2 (luôn là số thực dương hoặc 0).',
      ] },
      { h: 'Hai số phức bằng nhau' },
      { p: 'z1 = z2 khi và chỉ khi phần thực bằng phần thực và phần ảo bằng phần ảo. Đây là cơ sở để giải nhiều bài tìm a, b.' },
      { note: 'Ghi nhớ i^2 = −1, từ đó i^3 = −i, i^4 = 1 và lặp lại theo chu kỳ 4 — rất hữu ích khi tính luỹ thừa của i.' },
    ],
    examples: [
      { q: 'Cho z = 2 + 3i. Tìm phần thực, phần ảo, liên hợp và mô-đun.', a: 'Phần thực 2, phần ảo 3. Liên hợp z̄ = 2 − 3i. Mô-đun |z| = căn(2^2 + 3^2) = căn(13).' },
      { q: 'Tính (1 + i)(1 − i).', a: 'Dùng hằng đẳng thức: (1 + i)(1 − i) = 1^2 − i^2 = 1 − (−1) = 2.' },
    ],
  },

  'H12TOAN-w20-quiz': {
    topic: 'Phép chia và phương trình bậc hai hệ số thực',
    intro: 'Các em học chia số phức bằng cách nhân liên hợp và giải phương trình bậc hai hệ số thực có nghiệm phức.',
    objectives: [
      'Thực hiện phép chia hai số phức.',
      'Giải phương trình bậc hai hệ số thực với biệt thức âm.',
      'Tính tổng, tích nghiệm phức và mô-đun nghiệm.',
    ],
    theory: [
      { h: 'Phép chia số phức' },
      { p: 'Để tính z1/z2, nhân cả tử và mẫu với liên hợp của mẫu z̄2. Khi đó mẫu trở thành |z2|^2 (số thực), rồi đưa kết quả về dạng a + bi.' },
      { h: 'Phương trình bậc hai hệ số thực' },
      { p: 'Xét az^2 + bz + c = 0 (a, b, c thực, a ≠ 0). Tính Δ = b^2 − 4ac. Nếu Δ < 0, phương trình có hai nghiệm phức liên hợp z = (−b ± i·căn(−Δ))/(2a).' },
      { h: 'Tính chất nghiệm phức' },
      { ul: [
        'Hai nghiệm là số phức liên hợp của nhau.',
        'Tổng hai nghiệm = −b/a, tích hai nghiệm = c/a (định lý Vi-ét vẫn đúng).',
        'Hai nghiệm có cùng mô-đun = căn(c/a) khi Δ < 0.',
      ] },
      { h: 'Trên tập số phức' },
      { p: 'Mọi phương trình bậc hai đều có nghiệm trên tập số phức C — đây chính là lý do mở rộng số thực thành số phức.' },
      { note: 'Khi Δ < 0, viết căn(Δ) = i·căn(−Δ); không được viết là số thực âm dưới căn.' },
    ],
    examples: [
      { q: 'Tính (1 + 2i)/(1 − i).', a: 'Nhân liên hợp (1 + i): tử = (1 + 2i)(1 + i) = 1 + i + 2i + 2i^2 = 1 + 3i − 2 = −1 + 3i; mẫu = (1 − i)(1 + i) = 2. Kết quả (−1 + 3i)/2 = −1/2 + (3/2)i.' },
      { q: 'Giải z^2 − 2z + 5 = 0.', a: 'Δ = 4 − 20 = −16 < 0, căn(−Δ) = 4. z = (2 ± 4i)/2 = 1 ± 2i. Hai nghiệm liên hợp 1 + 2i và 1 − 2i, mô-đun mỗi nghiệm = căn(1 + 4) = căn(5).' },
    ],
  },

  'H12TOAN-w21-quiz': {
    topic: 'Biểu diễn hình học số phức – Điểm và quỹ tích',
    intro: 'Các em biểu diễn số phức bằng điểm trên mặt phẳng phức và tìm tập hợp điểm thoả điều kiện cho trước.',
    objectives: [
      'Biểu diễn số phức bằng điểm M(a; b) trên mặt phẳng.',
      'Nhận biết quỹ tích là đường thẳng, đường tròn từ điều kiện mô-đun.',
      'Liên hệ dạng đại số và dạng lượng giác của số phức.',
    ],
    theory: [
      { h: 'Mặt phẳng phức' },
      { p: 'Số phức z = a + bi được biểu diễn bằng điểm M(a; b) trên mặt phẳng toạ độ Oxy: trục hoành là trục thực, trục tung là trục ảo. Mô-đun |z| là khoảng cách từ M đến gốc O.' },
      { h: 'Quỹ tích thường gặp' },
      { ul: [
        '|z| = R: đường tròn tâm O bán kính R.',
        '|z − z0| = R: đường tròn tâm điểm biểu diễn z0, bán kính R.',
        '|z − z1| = |z − z2|: đường trung trực của đoạn nối hai điểm biểu diễn z1, z2.',
      ] },
      { h: 'Khoảng cách giữa hai số phức' },
      { p: 'Khoảng cách giữa hai điểm biểu diễn z1, z2 chính là |z1 − z2|.' },
      { h: 'Dạng lượng giác' },
      { p: 'z = r(cos φ + i·sin φ) với r = |z| và φ là acgumen. Đây là cách viết tiện cho phép nhân, chia và luỹ thừa số phức.' },
      { note: 'Để tìm quỹ tích, đặt z = x + yi, thay vào điều kiện rồi rút gọn về phương trình theo x, y — đường thu được chính là quỹ tích.' },
    ],
    examples: [
      { q: 'Tìm tập điểm biểu diễn z thoả |z − 2| = 3.', a: 'Đặt z = x + yi: |x − 2 + yi| = 3 ⇔ (x − 2)^2 + y^2 = 9. Đó là đường tròn tâm (2; 0), bán kính 3.' },
      { q: 'Tìm tập điểm thoả |z − 1| = |z + 1|.', a: 'Đặt z = x + yi: (x − 1)^2 + y^2 = (x + 1)^2 + y^2 ⇔ −2x = 2x ⇔ x = 0. Đó là trục Oy (đường trung trực của đoạn nối (1;0) và (−1;0)).' },
    ],
  },

  'H12TOAN-w22-quiz': {
    topic: 'Toạ độ trong không gian – Vectơ',
    intro: 'Các em bước vào hình học toạ độ không gian Oxyz, làm quen với toạ độ điểm, vectơ và các phép toán vectơ trong không gian.',
    objectives: [
      'Tính toạ độ vectơ, độ dài vectơ trong Oxyz.',
      'Thực hiện tích vô hướng và tích có hướng.',
      'Tìm trung điểm, trọng tâm và xét quan hệ cùng phương, vuông góc.',
    ],
    theory: [
      { h: 'Toạ độ điểm và vectơ' },
      { p: 'Trong hệ Oxyz, vectơ AB = B − A có toạ độ (xB − xA; yB − yA; zB − zA). Độ dài |AB| = căn của tổng bình phương các thành phần.' },
      { h: 'Tích vô hướng' },
      { ul: [
        'u·v = x1·x2 + y1·y2 + z1·z2.',
        'u vuông góc v khi u·v = 0.',
        'cos(góc giữa u, v) = (u·v)/(|u|·|v|).',
      ] },
      { h: 'Tích có hướng' },
      { p: '[u, v] là vectơ vuông góc với cả u và v, có toạ độ (y1·z2 − z1·y2; z1·x2 − x1·z2; x1·y2 − y1·x2). Dùng để tìm vectơ pháp tuyến mặt phẳng và tính diện tích, thể tích.' },
      { h: 'Trung điểm – trọng tâm' },
      { ul: [
        'Trung điểm I của AB: I = ((xA+xB)/2; (yA+yB)/2; (zA+zB)/2).',
        'Hai vectơ cùng phương khi vectơ này là bội số của vectơ kia.',
      ] },
      { note: 'Tích vô hướng cho ra một số, tích có hướng cho ra một vectơ — đừng nhầm lẫn hai phép toán này.' },
    ],
    examples: [
      { q: 'Cho A(1;2;3), B(4;5;6). Tính vectơ AB và độ dài AB.', a: 'AB = (4−1; 5−2; 6−3) = (3; 3; 3). |AB| = căn(9 + 9 + 9) = căn(27) = 3√3.' },
      { q: 'Tính tích vô hướng của u(1;2;3) và v(4;−1;2).', a: 'u·v = 1·4 + 2·(−1) + 3·2 = 4 − 2 + 6 = 8.' },
    ],
  },

  'H12TOAN-w23-quiz': {
    topic: 'Phương trình mặt phẳng',
    intro: 'Các em học cách lập phương trình mặt phẳng, xác định vectơ pháp tuyến và tính khoảng cách từ một điểm đến mặt phẳng.',
    objectives: [
      'Viết phương trình mặt phẳng khi biết điểm và vectơ pháp tuyến.',
      'Xác định vectơ pháp tuyến từ phương trình mặt phẳng.',
      'Tính khoảng cách từ điểm đến mặt phẳng và xét vị trí tương đối.',
    ],
    theory: [
      { h: 'Vectơ pháp tuyến và phương trình tổng quát' },
      { p: 'Mặt phẳng (P) có vectơ pháp tuyến n(A; B; C) đi qua M0(x0; y0; z0) có phương trình A(x − x0) + B(y − y0) + C(z − z0) = 0, viết gọn Ax + By + Cz + D = 0. Hệ số (A; B; C) chính là vectơ pháp tuyến.' },
      { h: 'Cách tìm vectơ pháp tuyến' },
      { ul: [
        'Cho sẵn trong đề.',
        'Vuông góc với một đường thẳng → lấy vectơ chỉ phương của đường thẳng đó.',
        'Chứa hai vectơ → lấy tích có hướng của hai vectơ đó.',
      ] },
      { h: 'Khoảng cách từ điểm đến mặt phẳng' },
      { p: 'd(M; (P)) = |A·xM + B·yM + C·zM + D| / căn(A^2 + B^2 + C^2).' },
      { h: 'Vị trí tương đối hai mặt phẳng' },
      { p: 'Hai mặt phẳng song song khi hai vectơ pháp tuyến cùng phương và hệ số tự do khác nhau; trùng nhau khi mọi hệ số tỉ lệ; cắt nhau khi pháp tuyến không cùng phương.' },
      { note: 'Phương trình mặt phẳng theo đoạn chắn: mặt phẳng cắt ba trục tại (a;0;0), (0;b;0), (0;0;c) có dạng x/a + y/b + z/c = 1.' },
    ],
    examples: [
      { q: 'Viết phương trình mặt phẳng (P) qua A(1;2;3) có vectơ pháp tuyến n(1;−1;2).', a: '1(x − 1) − 1(y − 2) + 2(z − 3) = 0 ⇔ x − y + 2z − 1 + 2 − 6 = 0 ⇔ x − y + 2z − 5 = 0.' },
      { q: 'Tính khoảng cách từ O đến mặt phẳng x − 2y + 2z − 5 = 0.', a: 'd = |0 − 0 + 0 − 5| / căn(1 + 4 + 4) = 5/căn(9) = 5/3.' },
    ],
  },

  'H12TOAN-w24-quiz': {
    topic: 'Phương trình đường thẳng trong không gian',
    intro: 'Các em học cách viết phương trình đường thẳng trong Oxyz dưới dạng tham số và chính tắc, cùng cách xác định vectơ chỉ phương.',
    objectives: [
      'Viết phương trình tham số và chính tắc của đường thẳng.',
      'Xác định vectơ chỉ phương trong các tình huống khác nhau.',
      'Xét vị trí tương đối giữa hai đường thẳng.',
    ],
    theory: [
      { h: 'Phương trình tham số' },
      { p: 'Đường thẳng d đi qua M0(x0; y0; z0) có vectơ chỉ phương u(a; b; c) viết dạng tham số: x = x0 + at; y = y0 + bt; z = z0 + ct (t là tham số).' },
      { h: 'Phương trình chính tắc' },
      { p: 'Khi a, b, c đều khác 0: (x − x0)/a = (y − y0)/b = (z − z0)/c.' },
      { h: 'Cách tìm vectơ chỉ phương' },
      { ul: [
        'Đi qua hai điểm A, B → vectơ chỉ phương là AB.',
        'Vuông góc mặt phẳng (P) → lấy vectơ pháp tuyến của (P).',
        'Song song trục Ox, Oy, Oz → lần lượt (1;0;0), (0;1;0), (0;0;1).',
      ] },
      { h: 'Vị trí tương đối hai đường thẳng' },
      { p: 'Hai đường cùng phương: song song (nếu không có điểm chung) hoặc trùng. Hai đường không cùng phương: cắt nhau (có điểm chung) hoặc chéo nhau (không có điểm chung và không đồng phẳng).' },
      { note: 'Để xét cắt hay chéo, giải hệ phương trình tham số: có nghiệm thì cắt, vô nghiệm và không cùng phương thì chéo nhau.' },
    ],
    examples: [
      { q: 'Viết phương trình tham số của đường thẳng d qua A(1;0;2) có vectơ chỉ phương u(2;1;−1).', a: 'x = 1 + 2t; y = 0 + t = t; z = 2 − t.' },
      { q: 'Tìm vectơ chỉ phương của đường thẳng qua A(2;3;4), B(5;6;7).', a: 'Vectơ chỉ phương AB = (5−2; 6−3; 7−4) = (3; 3; 3).' },
    ],
  },

  'H12TOAN-w25-quiz': {
    topic: 'Mặt cầu trong không gian Oxyz',
    intro: 'Các em học phương trình mặt cầu, cách tìm tâm và bán kính, cùng vị trí tương đối giữa mặt cầu và mặt phẳng.',
    objectives: [
      'Viết phương trình mặt cầu dạng chuẩn và dạng khai triển.',
      'Tìm tâm, bán kính từ phương trình mặt cầu.',
      'Xét vị trí tương đối giữa mặt cầu và mặt phẳng.',
    ],
    theory: [
      { h: 'Phương trình mặt cầu dạng chuẩn' },
      { p: 'Mặt cầu (S) tâm I(a; b; c), bán kính R có phương trình (x − a)^2 + (y − b)^2 + (z − c)^2 = R^2.' },
      { h: 'Dạng khai triển' },
      { p: 'x^2 + y^2 + z^2 + 2ax + 2by + 2cz + d = 0 là mặt cầu khi a^2 + b^2 + c^2 − d > 0, với tâm I(−a; −b; −c) và R = căn(a^2 + b^2 + c^2 − d).' },
      { h: 'Vị trí mặt cầu và mặt phẳng' },
      { ul: [
        'd(I; (P)) > R: mặt phẳng không cắt mặt cầu.',
        'd(I; (P)) = R: mặt phẳng tiếp xúc mặt cầu.',
        'd(I; (P)) < R: mặt phẳng cắt mặt cầu theo đường tròn bán kính r = căn(R^2 − d^2).',
      ] },
      { h: 'Mặt cầu đặc biệt' },
      { p: 'Mặt cầu đường kính AB có tâm là trung điểm I của AB và bán kính R = AB/2.' },
      { note: 'Khi đề cho dạng khai triển, hãy nhóm bình phương đầy đủ để đưa về dạng chuẩn rồi đọc tâm và bán kính.' },
    ],
    examples: [
      { q: 'Tìm tâm và bán kính của mặt cầu x^2 + y^2 + z^2 − 2x + 4y − 6z + 5 = 0.', a: 'Tâm I(1; −2; 3) (lấy nửa hệ số đổi dấu). R = căn(1^2 + 2^2 + 3^2 − 5) = căn(1 + 4 + 9 − 5) = căn(9) = 3.' },
      { q: 'Mặt cầu x^2 + y^2 + z^2 = 4 cắt mặt phẳng z = 1 theo đường tròn bán kính nào?', a: 'Tâm O, R = 2, d = 1. r = căn(R^2 − d^2) = căn(4 − 1) = căn(3).' },
    ],
  },

  'H12TOAN-w26-quiz': {
    topic: 'Vị trí tương đối – Góc – Khoảng cách trong Oxyz',
    intro: 'Các em tổng hợp kỹ thuật tính góc và khoảng cách giữa điểm, đường thẳng, mặt phẳng trong không gian Oxyz.',
    objectives: [
      'Tính góc giữa hai mặt phẳng, giữa đường thẳng và mặt phẳng.',
      'Tính khoảng cách giữa hai mặt phẳng song song, từ điểm đến đường thẳng.',
      'Xác định hình chiếu vuông góc của điểm lên mặt phẳng, trục.',
    ],
    theory: [
      { h: 'Góc giữa hai mặt phẳng' },
      { p: 'cos của góc giữa (P) và (Q) = |n1·n2| / (|n1|·|n2|), với n1, n2 là hai vectơ pháp tuyến. Góc nằm trong khoảng từ 0 đến 90 độ.' },
      { h: 'Góc giữa đường thẳng và mặt phẳng' },
      { p: 'sin của góc giữa đường thẳng (vectơ chỉ phương u) và mặt phẳng (vectơ pháp tuyến n) = |u·n| / (|u|·|n|).' },
      { h: 'Khoảng cách' },
      { ul: [
        'Hai mặt phẳng song song: lấy một điểm trên mặt phẳng này rồi tính khoảng cách đến mặt phẳng kia.',
        'Từ điểm đến đường thẳng: dùng tích có hướng, d = |[M0M, u]| / |u|.',
        'Đến trục Ox: d = căn(y^2 + z^2); tương tự cho Oy, Oz.',
      ] },
      { h: 'Hình chiếu vuông góc' },
      { ul: [
        'Lên mặt phẳng Oxy: giữ x, y, đặt z = 0.',
        'Lên trục Ox: giữ x, đặt y = z = 0.',
      ] },
      { note: 'Đường thẳng vuông góc mặt phẳng thì vectơ chỉ phương của nó cùng phương với vectơ pháp tuyến của mặt phẳng.' },
    ],
    examples: [
      { q: 'Tính góc giữa hai mặt phẳng x + y + z = 0 và x − y + z = 0.', a: 'n1(1;1;1), n2(1;−1;1). cos = |1 − 1 + 1| / (căn(3)·căn(3)) = 1/3. Góc = arccos(1/3).' },
      { q: 'Tính khoảng cách giữa hai mặt phẳng song song x + 2y + 2z − 3 = 0 và x + 2y + 2z + 6 = 0.', a: 'Lấy điểm trên mặt phẳng thứ nhất hoặc dùng công thức: d = |6 − (−3)| / căn(1 + 4 + 4) = 9/3 = 3.' },
    ],
  },

  'H12TOAN-w27-quiz': {
    topic: 'Khối đa diện – Thể tích khối chóp',
    intro: 'Các em chuyển sang hình học không gian cổ điển, tính thể tích khối chóp và dùng tỉ số thể tích để so sánh các khối.',
    objectives: [
      'Áp dụng công thức thể tích khối chóp.',
      'Tính thể tích các khối chóp đặc biệt: chóp đều, tứ diện đều.',
      'Dùng tỉ số thể tích để so sánh hai khối chóp.',
    ],
    theory: [
      { h: 'Công thức thể tích khối chóp' },
      { p: 'V = (1/3)·Sđáy·h, trong đó Sđáy là diện tích đáy và h là chiều cao (khoảng cách từ đỉnh đến mặt phẳng đáy).' },
      { h: 'Một số khối chóp đặc biệt' },
      { ul: [
        'Tứ diện đều cạnh a: V = a^3·căn(2)/12.',
        'Chóp tam giác đều cạnh đáy a, chiều cao h: Sđáy = a^2·căn(3)/4, V = a^2·căn(3)·h/12.',
        'Chóp có cạnh bên vuông góc đáy thì cạnh bên đó là chiều cao.',
      ] },
      { h: 'Tỉ số thể tích' },
      { p: 'Với hai khối chóp chung đỉnh, nếu các điểm trên ba cạnh chia theo tỉ số k1, k2, k3 thì tỉ số thể tích bằng tích k1·k2·k3. Đây là công cụ mạnh để tính thể tích phần bị cắt.' },
      { h: 'Cách xác định chiều cao' },
      { p: 'Chiều cao là đoạn vuông góc hạ từ đỉnh xuống mặt phẳng đáy; với chóp đều thì chân đường cao trùng tâm đáy.' },
      { note: 'Khi đáy là đa giác phức tạp, chia nhỏ thành các tam giác để tính diện tích, hoặc dùng toạ độ hoá để tính nhanh.' },
    ],
    examples: [
      { q: 'Cho chóp S.ABCD đáy hình vuông cạnh a, SA vuông góc đáy và SA = a. Tính thể tích.', a: 'Sđáy = a^2; chiều cao h = SA = a. V = (1/3)·a^2·a = a^3/3.' },
      { q: 'Tính thể tích khối chóp có đáy là tam giác vuông cạnh góc vuông 3 và 4, chiều cao 5.', a: 'Sđáy = (1/2)·3·4 = 6. V = (1/3)·6·5 = 10.' },
    ],
  },

  'H12TOAN-w28-quiz': {
    topic: 'Khối lăng trụ – Khối hộp',
    intro: 'Các em học công thức và cách tính thể tích khối lăng trụ và khối hộp — các khối đa diện quen thuộc trong đề thi.',
    objectives: [
      'Áp dụng công thức thể tích lăng trụ và khối hộp.',
      'Tính thể tích các trường hợp lăng trụ đứng, đều, lập phương.',
      'Liên hệ đường chéo khối hộp chữ nhật với các kích thước.',
    ],
    theory: [
      { h: 'Thể tích khối lăng trụ' },
      { p: 'V = Sđáy·h, với h là chiều cao (khoảng cách giữa hai mặt đáy). Lăng trụ đứng thì cạnh bên chính là chiều cao.' },
      { h: 'Khối hộp và khối lập phương' },
      { ul: [
        'Hộp chữ nhật ba kích thước a, b, c: V = a·b·c.',
        'Lập phương cạnh a: V = a^3.',
        'Đường chéo hộp chữ nhật: d = căn(a^2 + b^2 + c^2).',
      ] },
      { h: 'Lăng trụ đặc biệt' },
      { p: 'Lăng trụ tam giác đều cạnh đáy a, chiều cao h: Sđáy = a^2·căn(3)/4, nên V = (a^2·căn(3)/4)·h.' },
      { h: 'So sánh với khối chóp' },
      { p: 'Khối chóp và khối lăng trụ cùng đáy, cùng chiều cao có tỉ lệ thể tích 1 : 3 (chóp bằng một phần ba lăng trụ).' },
      { note: 'Đừng nhầm: lăng trụ V = Sđáy·h (không chia 3), còn chóp V = (1/3)·Sđáy·h.' },
    ],
    examples: [
      { q: 'Tính thể tích lăng trụ đứng đáy hình vuông cạnh a, cạnh bên a·căn(2).', a: 'Sđáy = a^2; chiều cao = cạnh bên = a·căn(2). V = a^2·a·căn(2) = a^3·căn(2).' },
      { q: 'Tính đường chéo của hộp chữ nhật kích thước 5, 8, 12.', a: 'd = căn(5^2 + 8^2 + 12^2) = căn(25 + 64 + 144) = căn(233).' },
    ],
  },

  'H12TOAN-w29-quiz': {
    topic: 'Khối nón – Thể tích và diện tích',
    intro: 'Các em chuyển sang khối tròn xoay với hình nón, học các công thức diện tích xung quanh, toàn phần và thể tích.',
    objectives: [
      'Áp dụng công thức thể tích và diện tích hình nón.',
      'Liên hệ bán kính, chiều cao và đường sinh.',
      'Nhận biết hình nón sinh ra khi quay tam giác vuông.',
    ],
    theory: [
      { h: 'Các đại lượng của hình nón' },
      { p: 'Hình nón có bán kính đáy r, chiều cao h và đường sinh l. Quan hệ: l = căn(r^2 + h^2).' },
      { h: 'Công thức diện tích' },
      { ul: [
        'Diện tích xung quanh: Sxq = π·r·l.',
        'Diện tích toàn phần: Stp = π·r·l + π·r^2 = π·r·(r + l).',
      ] },
      { h: 'Công thức thể tích' },
      { p: 'V = (1/3)·π·r^2·h. Hình nón có thể tích bằng một phần ba khối trụ cùng đáy và cùng chiều cao.' },
      { h: 'Hình nón sinh bởi quay tam giác vuông' },
      { p: 'Quay tam giác vuông quanh một cạnh góc vuông tạo ra hình nón: cạnh quay là chiều cao h, cạnh góc vuông kia là bán kính r.' },
      { note: 'Chú ý phân biệt chiều cao h và đường sinh l: thể tích dùng h, diện tích xung quanh dùng l. Khi đề cho h, tính l = căn(r^2 + h^2) trước khi tính diện tích.' },
    ],
    examples: [
      { q: 'Hình nón có r = 3, h = 4. Tính đường sinh và thể tích.', a: 'l = căn(3^2 + 4^2) = căn(25) = 5. V = (1/3)·π·3^2·4 = (1/3)·π·9·4 = 12π.' },
      { q: 'Tính diện tích toàn phần hình nón r = 3, l = 5.', a: 'Stp = π·r·(r + l) = π·3·(3 + 5) = 24π.' },
    ],
  },

  'H12TOAN-w30-quiz': {
    topic: 'Khối trụ – Thể tích và diện tích',
    intro: 'Các em học các công thức về hình trụ: diện tích xung quanh, toàn phần và thể tích, cùng cách sinh ra khối trụ.',
    objectives: [
      'Áp dụng công thức thể tích và diện tích hình trụ.',
      'Tính các đại lượng khi biết một số yếu tố.',
      'Nhận biết hình trụ sinh ra khi quay hình chữ nhật.',
    ],
    theory: [
      { h: 'Công thức thể tích' },
      { p: 'Hình trụ có bán kính đáy r và chiều cao h: V = π·r^2·h.' },
      { h: 'Công thức diện tích' },
      { ul: [
        'Diện tích xung quanh: Sxq = 2π·r·h (chu vi đáy nhân chiều cao).',
        'Diện tích toàn phần: Stp = 2π·r·h + 2π·r^2 = 2π·r·(r + h).',
      ] },
      { h: 'Hình trụ sinh bởi quay hình chữ nhật' },
      { p: 'Quay hình chữ nhật quanh một cạnh tạo ra hình trụ: cạnh quay là chiều cao h, cạnh kề vuông góc là bán kính r.' },
      { h: 'So sánh trụ và nón' },
      { p: 'Khối trụ và khối nón cùng đáy, cùng chiều cao có tỉ số thể tích 3 : 1 (trụ gấp ba lần nón).' },
      { note: 'Mặt xung quanh hình trụ khi trải phẳng là hình chữ nhật kích thước 2π·r (chu vi đáy) nhân h — đó là lý do Sxq = 2π·r·h.' },
    ],
    examples: [
      { q: 'Hình trụ có r = 2, h = 5. Tính thể tích.', a: 'V = π·r^2·h = π·2^2·5 = π·4·5 = 20π.' },
      { q: 'Hình trụ có Sxq = 10π, h = 5. Tìm r.', a: 'Sxq = 2π·r·h ⇒ 2π·r·5 = 10π ⇒ 10π·r = 10π ⇒ r = 1.' },
    ],
  },

  'H12TOAN-w31-quiz': {
    topic: 'Mặt cầu – Khối cầu',
    intro: 'Các em học công thức diện tích mặt cầu, thể tích khối cầu và các bài mặt cầu nội, ngoại tiếp đa diện.',
    objectives: [
      'Áp dụng công thức diện tích mặt cầu và thể tích khối cầu.',
      'Tính bán kính mặt cầu nội tiếp, ngoại tiếp hình lập phương.',
      'Liên hệ các đại lượng để giải bài tính ngược.',
    ],
    theory: [
      { h: 'Công thức cơ bản' },
      { ul: [
        'Diện tích mặt cầu bán kính R: S = 4π·R^2.',
        'Thể tích khối cầu bán kính R: V = (4/3)·π·R^3.',
      ] },
      { h: 'Mặt cầu ngoại tiếp – nội tiếp lập phương' },
      { ul: [
        'Mặt cầu ngoại tiếp lập phương cạnh a: bán kính bằng nửa đường chéo, R = a·căn(3)/2.',
        'Mặt cầu nội tiếp lập phương cạnh a: bán kính bằng nửa cạnh, R = a/2.',
      ] },
      { h: 'Bài toán tính ngược' },
      { p: 'Từ V hoặc S tìm R bằng cách rút R từ công thức: ví dụ từ V = 36π giải R^3 = 27 ⇒ R = 3.' },
      { h: 'Mặt cầu ngoại tiếp khối khác' },
      { p: 'Tâm mặt cầu ngoại tiếp cách đều mọi đỉnh; thường tìm bằng cách giao các mặt phẳng trung trực hoặc dùng toạ độ.' },
      { note: 'Phân biệt rõ: diện tích mặt cầu dùng R^2, thể tích khối cầu dùng R^3 và có hệ số 4/3.' },
    ],
    examples: [
      { q: 'Tính bán kính khối cầu có thể tích V = 36π.', a: '(4/3)·π·R^3 = 36π ⇒ R^3 = 36·3/4 = 27 ⇒ R = 3.' },
      { q: 'Tính bán kính mặt cầu ngoại tiếp hình lập phương cạnh a.', a: 'Đường chéo lập phương = a·căn(3). Bán kính = nửa đường chéo = a·căn(3)/2.' },
    ],
  },

  'H12TOAN-w32-quiz': {
    topic: 'Bài toán thực tế về thể tích',
    intro: 'Các em vận dụng các công thức thể tích vào bài toán thực tế: bể nước, thùng chứa, quả bóng, công trình.',
    objectives: [
      'Mô hình hoá vật thể thực tế thành khối hình học quen thuộc.',
      'Áp dụng đúng công thức thể tích và đơn vị đo.',
      'Giải bài toán tối ưu hoặc tính ngược trong bối cảnh thực tế.',
    ],
    theory: [
      { h: 'Quy trình giải bài thực tế' },
      { ul: [
        'Bước 1: Nhận dạng khối hình học (trụ, nón, cầu, hộp, lăng trụ...).',
        'Bước 2: Xác định các kích thước và đổi về cùng đơn vị.',
        'Bước 3: Áp dụng công thức thể tích phù hợp và tính kết quả.',
      ] },
      { h: 'Bảng công thức nhanh' },
      { ul: [
        'Hộp chữ nhật: V = a·b·c.',
        'Trụ: V = π·r^2·h.',
        'Nón: V = (1/3)·π·r^2·h.',
        'Cầu: V = (4/3)·π·R^3.',
        'Chóp/kim tự tháp: V = (1/3)·Sđáy·h.',
      ] },
      { h: 'Chú ý đơn vị' },
      { p: 'Đường kính d thì bán kính r = d/2. Thống nhất đơn vị (m, dm, cm) trước khi tính; 1 dm^3 = 1 lít.' },
      { h: 'Bài toán tối ưu' },
      { p: 'Nhiều bài yêu cầu tìm kích thước để thể tích lớn nhất hoặc vật liệu ít nhất — khi đó lập hàm một biến rồi dùng đạo hàm tìm cực trị.' },
      { note: 'Đọc kỹ đề cho đường kính hay bán kính, cho chiều cao hay đường sinh — nhầm hai đại lượng này là lỗi sai phổ biến nhất.' },
    ],
    examples: [
      { q: 'Bể hình trụ bán kính 2 m, sâu 1 m chứa tối đa bao nhiêu m^3 nước?', a: 'V = π·r^2·h = π·2^2·1 = 4π ≈ 12,57 m^3.' },
      { q: 'Một quả bóng đường kính 20 cm có thể tích bao nhiêu?', a: 'Bán kính R = 10 cm. V = (4/3)·π·10^3 = (4/3)·π·1000 = 4000π/3 cm^3.' },
    ],
  },

  'H12TOAN-w33-quiz': {
    topic: 'Ôn tập – Khảo sát hàm số và phương trình mũ – lôgarit',
    intro: 'Các em bước vào giai đoạn ôn thi tốt nghiệp, hệ thống lại khảo sát hàm số và giải phương trình mũ – lôgarit.',
    objectives: [
      'Đọc nhanh tính chất hàm số từ bảng biến thiên, đồ thị.',
      'Giải thành thạo phương trình mũ – lôgarit, biện luận số nghiệm.',
      'Kết hợp đồ thị để đếm nghiệm phương trình.',
    ],
    theory: [
      { h: 'Ôn khảo sát hàm số' },
      { ul: [
        'Đơn điệu, cực trị, GTLN–GTNN trên đoạn.',
        'Đọc đồ thị, bảng biến thiên để suy ra hệ số hoặc số nghiệm.',
        'Tương giao và biện luận tham số.',
      ] },
      { h: 'Ôn phương trình mũ – lôgarit' },
      { ul: [
        'Đưa về cùng cơ số.',
        'Đặt ẩn phụ giải phương trình bậc hai.',
        'Dùng tính đơn điệu để khẳng định nghiệm duy nhất.',
      ] },
      { h: 'Đếm nghiệm bằng đồ thị/đơn điệu' },
      { p: 'Khi một vế đồng biến, vế kia nghịch biến thì phương trình có nhiều nhất một nghiệm. Dùng giá trị đặc biệt để xác định có nghiệm hay không.' },
      { h: 'Liên hệ tích phân' },
      { p: 'Một số đề ôn lồng ghép tích phân hàm phân thức, hàm mũ; nhắc lại ∫ u\'/u dx = ln|u| + C và ∫ 1/(1+x^2) dx = arctan x + C.' },
      { note: 'Khi giải phương trình lôgarit nhớ điều kiện; khi giải phương trình mũ dạng ẩn phụ nhớ điều kiện t > 0.' },
    ],
    examples: [
      { q: 'Giải 3·9^x − 10·3^x + 3 = 0.', a: 'Đặt t = 3^x > 0: 3t^2 − 10t + 3 = 0 ⇔ t = 3 hoặc t = 1/3. Với t = 3 ⇒ x = 1; với t = 1/3 ⇒ x = −1.' },
      { q: 'Tính ∫ từ 0 đến 1 của 1/(1 + x^2) dx.', a: 'Nguyên hàm arctan x. Giá trị = arctan 1 − arctan 0 = π/4 − 0 = π/4.' },
    ],
  },

  'H12TOAN-w34-quiz': {
    topic: 'Ôn tập – Nguyên hàm, tích phân và số phức',
    intro: 'Các em ôn tổng hợp chương nguyên hàm – tích phân và số phức, hai mảng thường có nhiều câu trong đề thi.',
    objectives: [
      'Tính thành thạo nguyên hàm, tích phân bằng các phương pháp.',
      'Vận dụng tích phân tính diện tích, thể tích.',
      'Giải nhanh các bài số phức: phép toán, mô-đun, quỹ tích.',
    ],
    theory: [
      { h: 'Ôn nguyên hàm – tích phân' },
      { ul: [
        'Bảng nguyên hàm, đổi biến, từng phần.',
        'Dạng ∫ u\'/u dx = ln|u| + C.',
        'Hạ bậc lượng giác: sin^2 x = (1 − cos 2x)/2; cos^2 x = (1 + cos 2x)/2.',
        'Ứng dụng diện tích, thể tích.',
      ] },
      { h: 'Ôn số phức' },
      { ul: [
        'Phép toán cộng, trừ, nhân, chia (nhân liên hợp).',
        'Mô-đun, liên hợp.',
        'Quỹ tích điểm biểu diễn từ điều kiện mô-đun.',
      ] },
      { h: 'Kỹ thuật tính nhanh' },
      { p: 'Nhận diện ngay tích phân quen (đổi biến/từng phần); với số phức biết tận dụng |z1·z2| = |z1|·|z2| và |z1/z2| = |z1|/|z2| để rút gọn.' },
      { h: 'Liên hệ quỹ tích và đường' },
      { p: '|z − z1| = |z − z2| cho đường trung trực; |z − z0| = R cho đường tròn — quy về phương trình theo x, y khi cần.' },
      { note: 'Với tích phân lượng giác bậc chẵn, luôn nghĩ tới công thức hạ bậc trước khi tính.' },
    ],
    examples: [
      { q: 'Tính ∫ từ 0 đến π/2 của cos^2 x dx.', a: 'cos^2 x = (1 + cos 2x)/2. Tích phân = [x/2 + sin 2x/4] từ 0 đến π/2 = (π/4 + 0) − 0 = π/4.' },
      { q: 'Tìm tập điểm biểu diễn z thoả |z − 1| = |z + i|.', a: 'Đặt z = x + yi: (x − 1)^2 + y^2 = x^2 + (y + 1)^2 ⇔ −2x + 1 = 2y + 1 ⇔ y = −x. Đó là đường thẳng y = −x.' },
    ],
  },

  'H12TOAN-w35-quiz': {
    topic: 'Ôn tập – Hình học không gian Oxyz',
    intro: 'Các em hoàn tất chương trình bằng buổi ôn tập hình học toạ độ Oxyz: mặt phẳng, đường thẳng, mặt cầu và vị trí tương đối.',
    objectives: [
      'Viết nhanh phương trình mặt phẳng, đường thẳng, mặt cầu.',
      'Xét vị trí tương đối và tính góc, khoảng cách.',
      'Giải bài tổng hợp như mặt cầu ngoại tiếp, mặt phẳng trung trực.',
    ],
    theory: [
      { h: 'Mặt phẳng' },
      { ul: [
        'Phương trình tổng quát Ax + By + Cz + D = 0, pháp tuyến (A;B;C).',
        'Phương trình đoạn chắn x/a + y/b + z/c = 1 khi cắt ba trục.',
        'Mặt phẳng trung trực của AB: qua trung điểm, nhận AB làm pháp tuyến.',
      ] },
      { h: 'Đường thẳng' },
      { p: 'Dạng tham số x = x0 + at, y = y0 + bt, z = z0 + ct. Xét vị trí với mặt phẳng bằng cách thay vào: vô nghiệm → song song, vô số nghiệm → nằm trong, một nghiệm → cắt.' },
      { h: 'Mặt cầu' },
      { ul: [
        'Dạng chuẩn (x − a)^2 + (y − b)^2 + (z − c)^2 = R^2.',
        'Mặt cầu cắt mặt phẳng theo đường tròn bán kính r = căn(R^2 − d^2).',
        'Mặt cầu ngoại tiếp: tâm cách đều các đỉnh.',
      ] },
      { h: 'Góc và khoảng cách' },
      { p: 'Nhắc lại công thức góc giữa hai mặt phẳng, đường thẳng và mặt phẳng; khoảng cách từ điểm đến mặt phẳng và giữa hai mặt phẳng song song.' },
      { note: 'Toạ độ hoá là vũ khí mạnh: với bài hình không gian phức tạp, gắn hệ trục Oxyz rồi tính bằng vectơ thường nhanh và ít sai hơn.' },
    ],
    examples: [
      { q: 'Viết phương trình mặt phẳng đi qua A(1;0;0), B(0;2;0), C(0;0;3).', a: 'Dùng phương trình đoạn chắn: x/1 + y/2 + z/3 = 1.' },
      { q: 'Cho A(1;2;3), B(3;4;5). Viết phương trình mặt phẳng trung trực của AB.', a: 'Trung điểm I(2;3;4). Pháp tuyến AB = (2;2;2). PT: 2(x − 2) + 2(y − 3) + 2(z − 4) = 0 ⇔ x + y + z − 9 = 0.' },
    ],
  },

  'H12TOAN-w36-quiz': {
    topic: 'Kết thúc Toán THPT — Hành trang vào đại học',
    intro: 'Tuần cuối cùng của hành trình Toán THPT — thầy cô và các em cùng nhìn lại 3 năm số học, không để ôn thêm, mà để thấy mình đã đi xa đến đâu và sẵn sàng bước qua cánh cổng đại học hay vào đời với hành trang vững chắc.',
    objectives: [
      'Hệ thống hoá bức tranh toàn cảnh kiến thức Toán 3 năm THPT (lớp 10–12).',
      'Nhận ra sự kết nối giữa Toán học THPT với các ngành học ở đại học và cuộc sống.',
      'Xây dựng tâm thế tự tin và kế hoạch học tập tiếp theo sau tốt nghiệp.',
    ],
    theory: [
      { h: 'Bản đồ kiến thức Toán 3 năm THPT' },
      { ul: [
        'Lớp 10: Mệnh đề – tập hợp, hàm số bậc hai, đường thẳng – vị trí tương đối, vectơ, lượng giác, thống kê – xác suất cơ bản.',
        'Lớp 11: Giới hạn, đạo hàm và ứng dụng, hàm lượng giác, dãy số, tổ hợp – xác suất nâng cao, hình học không gian.',
        'Lớp 12: Hàm số và ứng dụng đạo hàm, hàm mũ–lôgarit, tích phân, số phức, hình học toạ độ Oxyz.',
      ] },
      { h: 'Toán học ứng dụng ở đâu trong cuộc sống?' },
      { p: 'Toán không chỉ là các bài thi — nó là ngôn ngữ của kỹ thuật, kinh tế, y khoa và khoa học máy tính. Đạo hàm mô tả tốc độ thay đổi trong y sinh; tích phân tính diện tích cắt siêu âm; xác suất là nền tảng AI và thống kê dữ liệu; hàm số mô hình hoá mọi hiện tượng tự nhiên.' },
      { h: 'Toán ở đại học — những gì chờ đón' },
      { ul: [
        'Giải tích (Calculus): Đạo hàm và tích phân bậc cao, phương trình vi phân — bước tiếp từ Toán 12.',
        'Đại số tuyến tính: Ma trận, hệ phương trình tuyến tính, không gian vectơ — nền tảng AI và đồ hoạ máy tính.',
        'Xác suất & Thống kê: Ứng dụng trực tiếp trong kinh tế, y khoa, kỹ thuật điện.',
        'Rời rạc & Thuật toán: Toán nền tảng của Khoa học máy tính.',
      ] },
      { h: 'Lời khuyên cuối cho kì thi tốt nghiệp' },
      { ul: [
        'Câu 1–3 (nhận biết, thông hiểu): làm nhanh, chắc điểm — đây là 60–70% điểm bài thi.',
        'Câu khó: không dừng lại quá lâu, đánh dấu và quay lại sau.',
        'Kiểm tra điều kiện: xác định, ẩn phụ t > 0, góc phải trong khoảng cho phép.',
        'Trình bày gọn: mỗi bước một dòng, kết luận rõ ràng.',
      ] },
      { h: 'Tư duy Toán học — hành trang suốt đời' },
      { p: '3 năm học Toán THPT không chỉ cho em các công thức — mà rèn tư duy logic, thói quen lập luận có căn cứ, khả năng tư duy trừu tượng và kiên nhẫn trước bài toán khó. Đây là hành trang quý giá cho mọi con đường em chọn sau tốt nghiệp.' },
      { note: 'Dù điểm thi cao hay thấp, điều quan trọng nhất là em đã cố gắng hết sức trong suốt 12 năm học. Hành trình phía trước còn dài và đầy cơ hội — hãy tự tin bước tiếp.' },
    ],
    examples: [
      { q: 'Hãy liệt kê 3 khái niệm Toán THPT mà em thấy quan trọng nhất và giải thích tại sao.', a: 'Gợi ý: (1) Đạo hàm — công cụ mô tả sự thay đổi, nền tảng giải tích ĐH; (2) Xác suất — ứng dụng trực tiếp trong đời sống và AI; (3) Tích phân — tính diện tích, thể tích, cơ sở mọi tính toán vật lý. Câu trả lời của em có thể khác — điều quan trọng là giải thích được "tại sao".' },
      { q: 'Tại sao Toán học lại quan trọng kể cả khi em không học ngành kỹ thuật hay khoa học?', a: 'Toán rèn tư duy logic — giúp em lập luận có căn cứ trong mọi lĩnh vực, từ phân tích dữ liệu kinh doanh, lập luận pháp lý, đến ra quyết định y khoa. Toán thống kê giúp đọc hiểu báo cáo và tránh bị lừa dối bởi con số. Quan trọng hơn, Toán rèn tính kiên nhẫn và thói quen tìm kiếm giải pháp thay vì bỏ cuộc.' },
      { q: 'Em đặt mục tiêu gì cho việc học Toán (hoặc môn học liên quan) ở bậc học tiếp theo?', a: 'Đây là câu hỏi mở — không có đáp án duy nhất. Điều quan trọng là em biết mình muốn đi đâu: học ĐH ngành gì, Toán sẽ hỗ trợ ra sao, hoặc nếu không học ĐH thì kỹ năng số học nào cần thiết cho nghề nghiệp. Lập một mục tiêu SMART: cụ thể, đo được, khả thi, thực tế, có thời hạn.' },
    ],
  },
};
