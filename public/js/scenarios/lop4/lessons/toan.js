// ============================================================
// Lớp 4 · TOÁN — Lý thuyết + Ví dụ 35 tuần (GDPT 2018)
// Key TRÙNG id quiz: "P4-wNN-quiz".
// ============================================================

export const P4_TOAN_LESSONS = {
  // ──────────────── HK1 ────────────────
  'P4-w01-quiz': {
    topic: 'Ôn tập về các số đến 100 000',
    intro: 'Lên Lớp 4, cô trò mình cùng ôn lại các số đến 100 000 — nền tảng quan trọng để học các số lớn hơn nhé!',
    objectives: [
      'Đọc, viết, so sánh các số đến 100 000.',
      'Xác định hàng và lớp của mỗi chữ số.',
      'Sắp xếp dãy số theo thứ tự tăng/giảm.',
    ],
    theory: [
      { h: 'Cấu tạo số đến 100 000' },
      { p: 'Số có 5 chữ số gồm các hàng: chục nghìn, nghìn, trăm, chục, đơn vị.' },
      { ul: ['Số bé nhất có 5 chữ số là 10 000.', 'Số lớn nhất có 5 chữ số là 99 999.', 'Số liền sau hơn số liền trước 1 đơn vị.'] },
      { h: 'So sánh số' },
      { p: 'So sánh từ hàng cao nhất xuống thấp nhất, hàng nào lớn hơn thì số đó lớn hơn.' },
      { note: 'Mẹo cộng tròn nghìn: 60 000 + 5 000 = 6 chục nghìn + 5 nghìn = 65 000.' },
    ],
    examples: [
      { q: 'Số liền sau của 9 999 là?', a: '9 999 + 1 = 10 000.' },
      { q: 'Trong số 47 528, chữ số 5 ở hàng nào?', a: 'Đếm từ phải: 8 đơn vị, 2 chục, 5 trăm, 7 nghìn, 4 chục nghìn → 5 ở hàng trăm.' },
    ],
  },

  'P4-w02-quiz': {
    topic: 'Biểu thức có chữ',
    intro: 'Các em ơi, tuần này cô giới thiệu một khái niệm mới rất thú vị — "biểu thức có chữ"!',
    objectives: [
      'Hiểu biểu thức chứa chữ và tính giá trị khi thay số.',
      'Viết biểu thức chu vi, diện tích bằng chữ.',
    ],
    theory: [
      { h: 'Biểu thức có chữ là gì?' },
      { p: 'Biểu thức có chữ là biểu thức trong đó có chữ thay cho một số chưa biết. Ví dụ: a + 5, 3 × b.' },
      { ul: ['Muốn tính giá trị → thay chữ bằng số rồi tính như bình thường.', 'Chu vi hình vuông cạnh a: P = a × 4.', 'Chu vi hình chữ nhật dài a, rộng b: P = (a + b) × 2.'] },
      { note: 'Phải làm phép nhân, chia trước phép cộng, trừ trong cùng một biểu thức.' },
    ],
    examples: [
      { q: 'Với a = 5, tính a + 12.', a: '5 + 12 = 17.' },
      { q: 'Với x = 6, tính 25 − x × 3.', a: '25 − 6 × 3 = 25 − 18 = 7.' },
    ],
  },

  'P4-w03-quiz': {
    topic: 'Hàng và lớp — Lớp triệu',
    intro: 'Tuần này chúng ta bước vào thế giới của những con số khổng lồ — đến hàng triệu, hàng tỉ!',
    objectives: [
      'Nhận biết hàng và lớp: lớp đơn vị, lớp nghìn, lớp triệu, lớp tỉ.',
      'Đọc, viết các số đến hàng triệu, hàng tỉ.',
    ],
    theory: [
      { h: 'Các lớp số' },
      { ul: [
        'Lớp đơn vị: đơn vị, chục, trăm.',
        'Lớp nghìn: nghìn, chục nghìn, trăm nghìn.',
        'Lớp triệu: triệu, chục triệu, trăm triệu.',
        'Lớp tỉ: tỉ, chục tỉ, trăm tỉ.',
      ] },
      { h: 'Đọc số nhiều chữ số' },
      { p: 'Tách số thành các nhóm 3 chữ số từ phải sang trái, mỗi nhóm là một lớp. Đọc từ trái sang phải, kèm tên lớp.' },
      { note: 'Khi viết số nhiều chữ số, tách các lớp bằng một khoảng trắng để dễ đọc.' },
    ],
    examples: [
      { q: 'Số 1 000 000 đọc là?', a: 'Một triệu.' },
      { q: 'Trong số 357 246 198, chữ số 5 thuộc hàng nào?', a: 'Lớp đơn vị: 198; lớp nghìn: 246; lớp triệu: 357 → 5 ở hàng chục triệu.' },
    ],
  },

  'P4-w04-quiz': {
    topic: 'So sánh và xếp thứ tự các số tự nhiên',
    intro: 'Cô trò mình rèn kỹ năng so sánh số tự nhiên — không chỉ với số nhỏ mà cả số có nhiều chữ số nhé!',
    objectives: [
      'So sánh hai số tự nhiên bất kỳ.',
      'Sắp xếp dãy số theo thứ tự tăng/giảm dần.',
    ],
    theory: [
      { h: 'Quy tắc so sánh' },
      { ul: [
        'Số có nhiều chữ số hơn thì lớn hơn.',
        'Nếu cùng số chữ số → so từ hàng cao xuống thấp, hàng nào lớn hơn thì số đó lớn hơn.',
      ] },
      { h: 'Sắp xếp' },
      { p: 'Tăng dần: từ bé đến lớn. Giảm dần: từ lớn đến bé.' },
      { note: 'Số liền trước số nhỏ nhất có n chữ số = số lớn nhất có (n−1) chữ số.' },
    ],
    examples: [
      { q: 'So sánh: 84 596 và 84 569.', a: 'Hàng chục nghìn, nghìn, trăm bằng nhau; hàng chục 9 > 6 → 84 596 > 84 569.' },
      { q: 'Số liền trước số bé nhất có 6 chữ số là?', a: 'Số bé nhất có 6 chữ số là 100 000 → liền trước là 99 999.' },
    ],
  },

  'P4-w05-quiz': {
    topic: 'Làm tròn số đến chục, trăm, nghìn',
    intro: 'Trong cuộc sống, đôi khi ta không cần con số chính xác mà chỉ cần ước lượng — đó là làm tròn số!',
    objectives: [
      'Làm tròn số đến hàng chục, trăm, nghìn.',
      'Áp dụng làm tròn trong bài toán thực tế.',
    ],
    theory: [
      { h: 'Quy tắc làm tròn' },
      { p: 'Xem chữ số ở hàng ngay sau hàng cần làm tròn:' },
      { ul: ['Nếu chữ số đó ≥ 5 → làm tròn lên (cộng 1 vào hàng cần làm tròn).', 'Nếu chữ số đó < 5 → giữ nguyên (làm tròn xuống).', 'Các chữ số sau hàng làm tròn → đổi thành 0.'] },
      { note: 'Làm tròn đến hàng nào thì các chữ số từ hàng đó trở về sau đều thành 0.' },
    ],
    examples: [
      { q: 'Làm tròn 47 đến hàng chục.', a: 'Chữ số đơn vị 7 ≥ 5 → làm tròn lên 50.' },
      { q: 'Làm tròn 12 450 đến hàng nghìn.', a: 'Chữ số hàng trăm 4 < 5 → giữ 12 000.' },
    ],
  },

  'P4-w06-quiz': {
    topic: 'Yến · tạ · tấn',
    intro: 'Tuần này em làm quen với các đơn vị đo khối lượng lớn — yến, tạ, tấn để cân các vật nặng!',
    objectives: [
      'Hiểu và đổi giữa các đơn vị yến, tạ, tấn, kg.',
      'Giải bài toán có đơn vị đo khối lượng.',
    ],
    theory: [
      { h: 'Bảng đơn vị' },
      { ul: ['1 yến = 10 kg.', '1 tạ = 10 yến = 100 kg.', '1 tấn = 10 tạ = 1 000 kg.'] },
      { h: 'Đổi đơn vị' },
      { p: 'Khi đổi từ đơn vị lớn → nhỏ: nhân với 10, 100, 1 000. Đổi ngược lại: chia.' },
      { note: 'Khi giải toán, hãy đổi tất cả về cùng một đơn vị (thường là kg) trước khi cộng/trừ.' },
    ],
    examples: [
      { q: '5 yến + 3 yến = ? kg', a: '5 + 3 = 8 yến = 80 kg.' },
      { q: 'Xe chở 3 tấn gạo và 5 tạ ngô. Tổng khối lượng?', a: '3 tấn = 3 000 kg; 5 tạ = 500 kg → 3 500 kg.' },
    ],
  },

  'P4-w07-quiz': {
    topic: 'Giây · phút · thế kỉ',
    intro: 'Tuần này em học các đơn vị thời gian từ rất nhỏ (giây) đến rất lớn (thế kỉ)!',
    objectives: [
      'Hiểu giây, phút, giờ, ngày, tháng, năm, thế kỉ.',
      'Xác định một năm thuộc thế kỉ nào.',
    ],
    theory: [
      { h: 'Bảng đơn vị thời gian' },
      { ul: ['1 phút = 60 giây.', '1 giờ = 60 phút = 3 600 giây.', '1 ngày = 24 giờ.', '1 thế kỉ = 100 năm.'] },
      { h: 'Tính thế kỉ' },
      { p: 'Thế kỉ thứ N gồm các năm từ (N−1) × 100 + 1 đến N × 100.' },
      { note: 'Năm 2026 thuộc thế kỉ XXI (từ năm 2001 đến năm 2100).' },
    ],
    examples: [
      { q: '2 phút 15 giây = ? giây', a: '2 × 60 + 15 = 135 giây.' },
      { q: 'Năm 1890 thuộc thế kỉ thứ?', a: 'Thế kỉ XIX (từ năm 1801 đến năm 1900).' },
    ],
  },

  'P4-w08-quiz': {
    topic: 'Tính chất giao hoán – kết hợp của phép cộng',
    intro: 'Hai tính chất "kì diệu" của phép cộng giúp em tính nhanh hơn rất nhiều!',
    objectives: [
      'Hiểu và áp dụng tính chất giao hoán, kết hợp.',
      'Tính nhanh các tổng nhiều số.',
    ],
    theory: [
      { h: 'Hai tính chất' },
      { ul: [
        'Giao hoán: a + b = b + a (đổi chỗ các số hạng → tổng không đổi).',
        'Kết hợp: (a + b) + c = a + (b + c) (nhóm cách nào cũng được).',
      ] },
      { h: 'Tính nhanh' },
      { p: 'Nhóm các số có tổng là số tròn chục, tròn trăm để tính dễ hơn.' },
      { note: 'Ví dụ: 25 + 47 + 75 → ghép (25 + 75) + 47 = 100 + 47 = 147.' },
    ],
    examples: [
      { q: 'Tính nhanh: 138 + 256 + 62.', a: '(138 + 62) + 256 = 200 + 256 = 456.' },
      { q: 'Tính: 5 + 234 + 95 + 66.', a: '(5 + 95) + (234 + 66) = 100 + 300 = 400.' },
    ],
  },

  'P4-w09-quiz': {
    topic: 'Nhân với số có một chữ số',
    intro: 'Phép nhân với số có một chữ số — kỹ năng nền cho mọi phép nhân lớn về sau!',
    objectives: [
      'Đặt tính và thực hiện phép nhân với số có một chữ số.',
      'Áp dụng vào bài toán có lời văn.',
    ],
    theory: [
      { h: 'Cách đặt tính' },
      { p: 'Viết hai số sao cho hàng đơn vị thẳng nhau. Nhân từ phải sang trái, có nhớ thì cộng vào hàng tiếp theo.' },
      { ul: ['Phép nhân với 0: a × 0 = 0.', 'Phép nhân với 1: a × 1 = a.', 'Giao hoán: a × b = b × a.'] },
      { note: 'Nhớ "0" → "1" → "2"... khi tổng vượt 9, ghi đơn vị, nhớ chục.' },
    ],
    examples: [
      { q: '234 × 3 = ?', a: '4×3=12 (viết 2, nhớ 1); 3×3+1=10 (viết 0, nhớ 1); 2×3+1=7 → 702.' },
      { q: 'Một bao gạo 25 kg. Hỏi 6 bao như thế nặng bao nhiêu?', a: '25 × 6 = 150 kg.' },
    ],
  },

  'P4-w10-quiz': {
    topic: 'Nhân với 10, 100, 1 000 — Chia cho 10, 100, 1 000',
    intro: 'Khám phá "mẹo" tính nhanh khi nhân/chia với các số tròn chục, trăm, nghìn!',
    objectives: [
      'Nhân nhanh với 10, 100, 1 000 và các số tròn.',
      'Chia nhanh khi số bị chia có nhiều chữ số 0 ở cuối.',
    ],
    theory: [
      { h: 'Quy tắc' },
      { ul: [
        'Nhân với 10 → thêm 1 chữ số 0 vào bên phải.',
        'Nhân với 100 → thêm 2 chữ số 0.',
        'Nhân với 1 000 → thêm 3 chữ số 0.',
        'Chia cho 10, 100, 1 000 → bớt 1, 2, 3 chữ số 0 ở bên phải (khi chia hết).',
      ] },
      { note: 'Khi nhân hai số tròn: ví dụ 80 × 50 = (8 × 5) × (10 × 10) = 40 × 100 = 4 000.' },
    ],
    examples: [
      { q: '320 × 100 = ?', a: 'Thêm 2 chữ số 0 vào 320 → 32 000.' },
      { q: '5 600 : 10 = ?', a: 'Bớt 1 chữ số 0 → 560.' },
    ],
  },

  'P4-w11-quiz': {
    topic: 'Nhân với số có hai chữ số',
    intro: 'Bước tiếp theo: nhân với số có hai chữ số — em sẽ học cách "tách" để nhân từng phần.',
    objectives: [
      'Đặt tính và nhân với số có hai chữ số.',
      'Hiểu cấu trúc của tích riêng và tích chung.',
    ],
    theory: [
      { h: 'Cách đặt tính' },
      { p: 'Nhân lần lượt với hàng đơn vị → ghi tích thứ nhất; nhân với hàng chục → ghi tích thứ hai (lùi sang trái 1 cột). Cộng hai tích.' },
      { ul: ['a × b = a × (chục) + a × (đơn vị).', 'Ví dụ: 23 × 12 = 23 × 10 + 23 × 2 = 230 + 46 = 276.'] },
      { note: 'Phải lùi tích riêng thứ hai sang trái 1 cột vì nó là kết quả nhân với hàng chục.' },
    ],
    examples: [
      { q: '45 × 26 = ?', a: '45 × 6 = 270; 45 × 20 = 900; tổng 270 + 900 = 1 170.' },
      { q: '28 lớp × 35 học sinh/lớp = ?', a: '28 × 35 = 980 học sinh.' },
    ],
  },

  'P4-w12-quiz': {
    topic: 'Nhân với số có ba chữ số',
    intro: 'Khó hơn một chút — nhân với số có ba chữ số. Em sẽ có ba tích riêng cộng lại!',
    objectives: [
      'Nhân với số có ba chữ số bằng cách tách thừa số.',
      'Tính nhanh bằng tính chất kết hợp.',
    ],
    theory: [
      { h: 'Quy trình' },
      { p: 'Nhân lần lượt với hàng đơn vị, hàng chục (lùi 1 cột), hàng trăm (lùi 2 cột) → cộng các tích riêng.' },
      { ul: ['Phân phối: a × (b + c) = a × b + a × c.', 'Kết hợp: 25 × 4 × 13 = (25 × 4) × 13 = 100 × 13 = 1 300.'] },
      { note: 'Nếu số có chữ số 0 ở hàng chục/trăm → bỏ qua tích riêng tương ứng (vì × 0 = 0).' },
    ],
    examples: [
      { q: '234 × 123 = ?', a: '234 × 100 + 234 × 20 + 234 × 3 = 23 400 + 4 680 + 702 = 28 782.' },
      { q: '125 × 204 = ?', a: '125 × 200 + 125 × 4 = 25 000 + 500 = 25 500.' },
    ],
  },

  'P4-w13-quiz': {
    topic: 'Chia cho số có một chữ số',
    intro: 'Tuần này cô dạy em chia "bước-từng-bước" cho số có một chữ số — một kỹ năng cực kỳ quan trọng!',
    objectives: [
      'Thực hiện phép chia hết và chia có dư.',
      'Phân biệt thành phần phép chia: số bị chia, số chia, thương, số dư.',
    ],
    theory: [
      { h: 'Quy trình chia' },
      { p: 'Chia từ trái sang phải, mỗi bước: chia → nhân ngược → trừ → hạ chữ số tiếp theo.' },
      { ul: ['Phép chia hết: số dư = 0.', 'Phép chia có dư: số dư < số chia.', 'Số bị chia = số chia × thương + số dư.'] },
      { note: 'Luôn kiểm tra: số dư phải nhỏ hơn số chia, nếu không là tính sai.' },
    ],
    examples: [
      { q: '1 248 : 6 = ?', a: '12 : 6 = 2; hạ 4 → 4 : 6 = 0 (dư 4); hạ 8 → 48 : 6 = 8 → 208.' },
      { q: '75 : 4 = ?', a: '75 = 4 × 18 + 3 → thương 18, dư 3.' },
    ],
  },

  'P4-w14-quiz': {
    topic: 'Dấu hiệu chia hết cho 2 và 5',
    intro: 'Có những "mẹo" giúp em biết ngay số nào chia hết cho 2, 5 mà không cần làm phép tính!',
    objectives: [
      'Nhận biết dấu hiệu chia hết cho 2, cho 5.',
      'Tìm số chia hết theo điều kiện cho trước.',
    ],
    theory: [
      { h: 'Dấu hiệu chia hết' },
      { ul: [
        'Chia hết cho 2: chữ số tận cùng là 0, 2, 4, 6, 8 (số chẵn).',
        'Chia hết cho 5: chữ số tận cùng là 0 hoặc 5.',
        'Chia hết cho cả 2 và 5: chữ số tận cùng là 0.',
      ] },
      { note: 'Số không chia hết cho 2 gọi là số lẻ (tận cùng 1, 3, 5, 7, 9).' },
    ],
    examples: [
      { q: 'Số nào chia hết cho 2: 135, 247, 348, 569?', a: '348 — tận cùng là 8 (chẵn).' },
      { q: 'Số nào vừa chia hết cho 2 vừa cho 5: 125, 240, 345, 352?', a: '240 — tận cùng là 0.' },
    ],
  },

  'P4-w15-quiz': {
    topic: 'Dấu hiệu chia hết cho 9 và 3',
    intro: 'Khác với 2 và 5, dấu hiệu chia hết cho 3 và 9 dựa vào TỔNG các chữ số!',
    objectives: [
      'Nhận biết dấu hiệu chia hết cho 3, cho 9.',
      'Phân biệt số chia hết cho 3 nhưng không cho 9.',
    ],
    theory: [
      { h: 'Dấu hiệu chia hết' },
      { ul: [
        'Chia hết cho 9: tổng các chữ số chia hết cho 9.',
        'Chia hết cho 3: tổng các chữ số chia hết cho 3.',
        'Số chia hết cho 9 thì cũng chia hết cho 3 (nhưng ngược lại không đúng).',
      ] },
      { note: 'Mẹo tìm số chia hết: cộng tất cả các chữ số lại, kiểm tra tổng có chia hết cho 3 hay 9.' },
    ],
    examples: [
      { q: 'Số 198 có chia hết cho 9 không?', a: '1 + 9 + 8 = 18 chia hết cho 9 → có.' },
      { q: 'Số nào chia hết cho 3 nhưng không cho 9: 123 hay 189?', a: '123: tổng 6 (chia hết cho 3, không cho 9). 189: tổng 18 (chia hết cho cả 9). → Đáp án: 123.' },
    ],
  },

  'P4-w16-quiz': {
    topic: 'Hai đường thẳng vuông góc – song song',
    intro: 'Hình học vui hơn rồi đây — em sẽ phân biệt hai đường thẳng vuông góc và song song!',
    objectives: [
      'Nhận biết hai đường thẳng vuông góc, song song.',
      'Xác định các cặp cạnh vuông góc/song song trong hình.',
    ],
    theory: [
      { h: 'Vuông góc và song song' },
      { ul: [
        'Hai đường thẳng vuông góc: cắt nhau tạo 4 góc vuông.',
        'Hai đường thẳng song song: không bao giờ cắt nhau, dù kéo dài bao nhiêu.',
        'Hai đường thẳng cùng vuông góc với một đường thứ ba → song song với nhau.',
      ] },
      { h: 'Trong hình chữ nhật' },
      { p: 'Có 2 cặp cạnh đối song song và 4 cặp cạnh kề vuông góc.' },
      { note: 'Dùng êke để vẽ và kiểm tra góc vuông.' },
    ],
    examples: [
      { q: 'Trong hình chữ nhật có mấy cặp cạnh vuông góc?', a: 'Mỗi đỉnh có 1 cặp vuông góc; có 4 đỉnh → 4 cặp.' },
      { q: 'Hai đường thẳng song song có cắt nhau không?', a: 'Không bao giờ cắt nhau, dù kéo dài bao xa.' },
    ],
  },

  'P4-w17-quiz': {
    topic: 'Góc nhọn · góc tù · góc bẹt',
    intro: 'Sau góc vuông, em làm quen với 3 loại góc khác — nhọn, tù và bẹt.',
    objectives: [
      'Phân biệt góc nhọn, góc vuông, góc tù, góc bẹt.',
      'Dùng êke để đo và kiểm tra loại góc.',
    ],
    theory: [
      { h: 'Phân loại góc' },
      { ul: [
        'Góc nhọn: bé hơn góc vuông (< 90°).',
        'Góc vuông: bằng 90°.',
        'Góc tù: lớn hơn góc vuông, bé hơn góc bẹt (90° < tù < 180°).',
        'Góc bẹt: bằng 180°, hai cạnh thẳng hàng.',
      ] },
      { note: 'Góc bẹt = 2 × góc vuông.' },
    ],
    examples: [
      { q: 'Lúc 3 giờ, hai kim đồng hồ tạo thành góc gì?', a: 'Hai kim vuông góc với nhau → góc vuông 90°.' },
      { q: 'Lúc 6 giờ, hai kim đồng hồ tạo góc gì?', a: 'Hai kim thẳng hàng → góc bẹt 180°.' },
    ],
  },

  'P4-w18-quiz': {
    topic: 'Kiểm tra Học kỳ 1',
    intro: 'Tuần thi cuối kỳ! Cô tin các em đã chuẩn bị tốt. Hãy bình tĩnh, đọc kỹ đề bài và tính cẩn thận nhé!',
    objectives: [
      'Vận dụng toàn bộ kiến thức Toán HK1.',
      'Trình bày bài làm sạch đẹp, rõ ràng.',
    ],
    theory: [
      { h: 'Các chủ đề ôn tập' },
      { ul: [
        'Số tự nhiên đến lớp triệu, làm tròn, so sánh.',
        'Bốn phép tính (cộng, trừ, nhân, chia).',
        'Đơn vị đo: khối lượng (yến, tạ, tấn), thời gian (giây, phút, thế kỉ).',
        'Dấu hiệu chia hết cho 2, 3, 5, 9.',
        'Hình học: vuông góc, song song, các loại góc.',
      ] },
      { note: 'Mẹo: đọc đề 2 lần, gạch dưới dữ kiện và câu hỏi.' },
    ],
    examples: [
      { q: 'Tính nhanh: 4 × 25 × 17.', a: '(4 × 25) × 17 = 100 × 17 = 1 700.' },
      { q: '1 tấn bằng bao nhiêu kg?', a: '1 tấn = 1 000 kg.' },
    ],
  },

  // ──────────────── HK2 ────────────────
  'P4-w19-quiz': {
    topic: 'Phân số — đọc, viết, ý nghĩa',
    intro: 'Học kỳ 2 mở ra cánh cửa mới — thế giới của PHÂN SỐ. Cô trò mình cùng khám phá nhé!',
    objectives: [
      'Đọc, viết phân số.',
      'Hiểu tử số và mẫu số.',
      'Nhận biết phân số bằng 1, bằng 0.',
    ],
    theory: [
      { h: 'Cấu tạo phân số' },
      { p: 'Phân số có dạng a/b, trong đó a là tử số (trên), b là mẫu số (dưới, khác 0).' },
      { ul: [
        'Phân số có tử = mẫu (≠ 0) → giá trị = 1.',
        'Phân số có tử = 0 → giá trị = 0.',
        'Phân số có tử > mẫu → giá trị > 1.',
      ] },
      { note: 'Đọc phân số: "tử PHẦN mẫu". Ví dụ 3/4 đọc là "ba phần bốn".' },
    ],
    examples: [
      { q: 'Một cái bánh chia 4 phần, ăn 1 phần. Viết phân số phần đã ăn.', a: '1 trong 4 phần → 1/4.' },
      { q: 'Phân số 7/4 lớn hơn hay bé hơn 1?', a: 'Tử > mẫu → phân số > 1.' },
    ],
  },

  'P4-w20-quiz': {
    topic: 'Phân số bằng nhau — Rút gọn phân số',
    intro: 'Tuần này em học cách "đơn giản hoá" phân số mà giá trị vẫn không đổi — gọi là rút gọn!',
    objectives: [
      'Hiểu hai phân số bằng nhau.',
      'Rút gọn phân số đến tối giản.',
    ],
    theory: [
      { h: 'Tính chất cơ bản' },
      { p: 'Nếu nhân (hoặc chia) cả tử và mẫu của một phân số cho cùng một số khác 0, ta được phân số bằng phân số ban đầu.' },
      { ul: [
        'Phân số tối giản: tử và mẫu không cùng chia hết cho số nào ngoài 1.',
        'Cách rút gọn: chia cả tử và mẫu cho ước chung lớn nhất.',
      ] },
      { note: 'Có thể rút gọn từng bước với các ước chung nhỏ rồi tiếp tục cho đến khi tối giản.' },
    ],
    examples: [
      { q: 'Rút gọn 6/9.', a: 'Chia cả tử và mẫu cho 3 → 2/3.' },
      { q: 'Rút gọn 15/25.', a: 'Chia cả tử và mẫu cho 5 → 3/5.' },
    ],
  },

  'P4-w21-quiz': {
    topic: 'Quy đồng mẫu số các phân số',
    intro: 'Để so sánh hay cộng/trừ phân số khác mẫu, ta cần quy đồng — đưa về cùng một mẫu số!',
    objectives: [
      'Quy đồng mẫu số hai (hoặc nhiều) phân số.',
      'Tìm mẫu số chung nhỏ nhất.',
    ],
    theory: [
      { h: 'Cách quy đồng' },
      { p: 'Chọn mẫu chung là số chia hết cho tất cả các mẫu (thường là tích các mẫu hoặc BCNN). Nhân cả tử và mẫu của mỗi phân số với số phù hợp.' },
      { ul: ['Mẫu chung nhỏ nhất (MSC) là số nhỏ nhất chia hết cho tất cả các mẫu.', 'Ví dụ MSC của 4 và 6 là 12.'] },
      { note: 'Khi mẫu này chia hết cho mẫu kia → lấy luôn mẫu lớn làm MSC.' },
    ],
    examples: [
      { q: 'Quy đồng 1/2 và 1/3.', a: 'MSC = 6 → 1/2 = 3/6; 1/3 = 2/6.' },
      { q: 'Quy đồng 2/3 và 3/4.', a: 'MSC = 12 → 2/3 = 8/12; 3/4 = 9/12.' },
    ],
  },

  'P4-w22-quiz': {
    topic: 'So sánh hai phân số',
    intro: 'Sau khi biết quy đồng, em sẽ so sánh được hai phân số bất kỳ một cách dễ dàng!',
    objectives: [
      'So sánh hai phân số cùng mẫu, cùng tử.',
      'So sánh hai phân số khác mẫu bằng quy đồng.',
    ],
    theory: [
      { h: 'Quy tắc so sánh' },
      { ul: [
        'Cùng mẫu: tử lớn hơn → phân số lớn hơn.',
        'Cùng tử: mẫu lớn hơn → phân số bé hơn.',
        'Khác mẫu: quy đồng rồi so tử.',
        'Phân số > 1 ⇔ tử > mẫu; phân số < 1 ⇔ tử < mẫu.',
      ] },
      { note: 'Mẹo: so phân số với 1 trước (nếu một bên < 1, một bên > 1 thì có ngay đáp án).' },
    ],
    examples: [
      { q: 'So sánh 1/2 và 3/5.', a: '1/2 = 5/10; 3/5 = 6/10 → 1/2 < 3/5.' },
      { q: 'So sánh 4/9 và 4/7.', a: 'Cùng tử, mẫu 9 > 7 → 4/9 < 4/7.' },
    ],
  },

  'P4-w23-quiz': {
    topic: 'Phép cộng phân số',
    intro: 'Cộng phân số rất giống cộng số tự nhiên — chỉ cần các phân số có cùng mẫu là cộng được!',
    objectives: [
      'Cộng hai phân số cùng mẫu, khác mẫu.',
      'Áp dụng giải bài toán có lời văn.',
    ],
    theory: [
      { h: 'Quy tắc cộng' },
      { ul: [
        'Cùng mẫu: cộng tử, giữ nguyên mẫu.',
        'Khác mẫu: quy đồng trước, sau đó cộng như cùng mẫu.',
        'Sau khi cộng có thể rút gọn kết quả.',
      ] },
      { h: 'Tính chất' },
      { p: 'Phép cộng phân số cũng có tính giao hoán và kết hợp như phép cộng số tự nhiên.' },
      { note: 'Đáp số nên ở dạng tối giản; nếu là phân số = 1 (như 4/4) có thể viết = 1.' },
    ],
    examples: [
      { q: '1/2 + 1/3 = ?', a: 'Quy đồng: 3/6 + 2/6 = 5/6.' },
      { q: 'Mẹ mua 1/2 kg đường và 1/4 kg muối. Tổng?', a: '1/2 + 1/4 = 2/4 + 1/4 = 3/4 kg.' },
    ],
  },

  'P4-w24-quiz': {
    topic: 'Phép trừ phân số',
    intro: 'Tương tự cộng — trừ phân số cũng cần cùng mẫu trước khi trừ tử.',
    objectives: [
      'Trừ hai phân số cùng mẫu, khác mẫu.',
      'Trừ phân số cho số tự nhiên và ngược lại.',
    ],
    theory: [
      { h: 'Quy tắc trừ' },
      { ul: [
        'Cùng mẫu: trừ tử, giữ nguyên mẫu.',
        'Khác mẫu: quy đồng rồi trừ.',
        'Số tự nhiên có thể viết thành phân số có mẫu 1 (ví dụ 1 = 1/1 = 3/3).',
      ] },
      { note: 'Khi trừ "1 − một phân số": viết 1 thành phân số có cùng mẫu rồi trừ.' },
    ],
    examples: [
      { q: '5/6 − 1/3 = ?', a: '1/3 = 2/6 → 5/6 − 2/6 = 3/6 = 1/2.' },
      { q: '1 − 2/3 = ?', a: '1 = 3/3 → 3/3 − 2/3 = 1/3.' },
    ],
  },

  'P4-w25-quiz': {
    topic: 'Phép nhân phân số',
    intro: 'Nhân phân số dễ bất ngờ — chỉ cần nhân tử với tử, mẫu với mẫu!',
    objectives: [
      'Nhân hai phân số.',
      'Áp dụng vào diện tích hình chữ nhật với cạnh là phân số.',
    ],
    theory: [
      { h: 'Quy tắc nhân' },
      { p: '(a/b) × (c/d) = (a × c) / (b × d). Có thể rút gọn trước hoặc sau khi nhân.' },
      { ul: ['Nhân phân số với số tự nhiên: a/b × n = (a × n) / b.', 'Phân số nhân với nghịch đảo của nó luôn bằng 1: 5/6 × 6/5 = 1.'] },
      { note: 'Mẹo: rút gọn chéo (tử-mẫu) trước khi nhân giúp số nhỏ hơn, tránh sai.' },
    ],
    examples: [
      { q: '2/3 × 4/5 = ?', a: '(2 × 4) / (3 × 5) = 8/15.' },
      { q: 'Mảnh đất dài 4/5 m, rộng 1/2 m. Diện tích?', a: '4/5 × 1/2 = 4/10 = 2/5 m².' },
    ],
  },

  'P4-w26-quiz': {
    topic: 'Phép chia phân số',
    intro: 'Chia phân số có "mẹo" — đảo phân số chia rồi nhân!',
    objectives: [
      'Chia hai phân số bằng cách nhân với nghịch đảo.',
      'Tìm phân số nghịch đảo.',
    ],
    theory: [
      { h: 'Quy tắc chia' },
      { p: '(a/b) : (c/d) = (a/b) × (d/c) — đảo phân số sau rồi nhân.' },
      { ul: [
        'Phân số nghịch đảo của a/b là b/a (với a, b ≠ 0).',
        'Số tự nhiên n có nghịch đảo là 1/n.',
        'Tích một phân số với nghịch đảo của nó = 1.',
      ] },
      { note: 'Hai từ khóa: ĐẢO sau, NHÂN với. Đừng đảo phân số đầu!' },
    ],
    examples: [
      { q: '3/4 : 2/3 = ?', a: '3/4 × 3/2 = 9/8.' },
      { q: 'Có 3/4 lít dầu, chia vào chai 1/8 lít. Đong được mấy chai?', a: '3/4 : 1/8 = 3/4 × 8/1 = 24/4 = 6 chai.' },
    ],
  },

  'P4-w27-quiz': {
    topic: 'Hỗn số',
    intro: 'Khi tử lớn hơn mẫu, ta có thể viết "gọn" hơn dưới dạng HỖN SỐ — phần nguyên + phần phân số.',
    objectives: [
      'Đọc, viết hỗn số.',
      'Đổi giữa hỗn số và phân số.',
    ],
    theory: [
      { h: 'Hỗn số là gì?' },
      { p: 'Hỗn số gồm phần nguyên (số tự nhiên) và phần phân số bé hơn 1. Ví dụ: 2 1/3.' },
      { ul: [
        'Đổi phân số → hỗn số: chia tử cho mẫu → phần nguyên là thương, phần phân số có tử là số dư, mẫu giữ nguyên.',
        'Đổi hỗn số → phân số: tử mới = phần nguyên × mẫu + tử cũ; mẫu giữ nguyên.',
      ] },
      { note: 'Hỗn số chỉ dùng khi phần phân số < 1.' },
    ],
    examples: [
      { q: 'Đổi 7/3 ra hỗn số.', a: '7 : 3 = 2 (dư 1) → 2 1/3.' },
      { q: 'Đổi 1 2/5 ra phân số.', a: '(1 × 5 + 2) / 5 = 7/5.' },
    ],
  },

  'P4-w28-quiz': {
    topic: 'Đề-xi-mét vuông · Mét vuông · Ki-lô-mét vuông',
    intro: 'Em làm quen với các đơn vị đo diện tích từ nhỏ (cm²) đến rất lớn (km²)!',
    objectives: [
      'Hiểu và đổi giữa cm², dm², m², km².',
      'Áp dụng vào bài toán đo diện tích thực tế.',
    ],
    theory: [
      { h: 'Bảng đơn vị diện tích' },
      { ul: [
        '1 dm² = 100 cm².',
        '1 m² = 100 dm² = 10 000 cm².',
        '1 km² = 1 000 000 m².',
      ] },
      { h: 'Quy luật' },
      { p: 'Hai đơn vị diện tích liên tiếp hơn kém nhau 100 lần (khác với đơn vị đo độ dài hơn kém nhau 10 lần).' },
      { note: 'Diện tích = chiều dài × chiều rộng (cùng đơn vị).' },
    ],
    examples: [
      { q: '5 m² = ? dm²', a: '1 m² = 100 dm² → 5 × 100 = 500 dm².' },
      { q: 'Diện tích huyện 250 km² = ? m²', a: '250 × 1 000 000 = 250 000 000 m².' },
    ],
  },

  'P4-w29-quiz': {
    topic: 'Hình bình hành — Diện tích, chu vi',
    intro: 'Hình bình hành — một loại tứ giác đặc biệt với hai cặp cạnh song song!',
    objectives: [
      'Nhận biết hình bình hành.',
      'Tính chu vi và diện tích hình bình hành.',
    ],
    theory: [
      { h: 'Đặc điểm' },
      { p: 'Hình bình hành có 2 cặp cạnh đối song song và bằng nhau.' },
      { ul: [
        'Chu vi = (a + b) × 2 (a, b là 2 cạnh kề).',
        'Diện tích = đáy × chiều cao tương ứng.',
        'Chiều cao là đoạn vuông góc từ đỉnh xuống cạnh đối diện (đáy).',
      ] },
      { note: 'Hình chữ nhật và hình thoi đều là hình bình hành đặc biệt.' },
    ],
    examples: [
      { q: 'Hình bình hành đáy 8 cm, cao 5 cm. Diện tích?', a: '8 × 5 = 40 cm².' },
      { q: 'Hai cạnh kề là 6 cm và 9 cm. Chu vi?', a: '(6 + 9) × 2 = 30 cm.' },
    ],
  },

  'P4-w30-quiz': {
    topic: 'Hình thoi — Diện tích, chu vi',
    intro: 'Hình thoi — bốn cạnh bằng nhau, hai đường chéo vuông góc tại trung điểm!',
    objectives: [
      'Nhận biết hình thoi và các tính chất.',
      'Tính chu vi và diện tích hình thoi.',
    ],
    theory: [
      { h: 'Đặc điểm' },
      { p: 'Hình thoi có 4 cạnh bằng nhau, 2 đường chéo vuông góc và cắt nhau tại trung điểm của mỗi đường.' },
      { ul: [
        'Chu vi = cạnh × 4.',
        'Diện tích = (đường chéo lớn × đường chéo bé) / 2 = (m × n) / 2.',
      ] },
      { note: 'Hình vuông là hình thoi đặc biệt có 4 góc vuông.' },
    ],
    examples: [
      { q: 'Hình thoi hai đường chéo 8 cm và 6 cm. Diện tích?', a: '(8 × 6) / 2 = 24 cm².' },
      { q: 'Hình thoi cạnh 7 cm. Chu vi?', a: '4 × 7 = 28 cm.' },
    ],
  },

  'P4-w31-quiz': {
    topic: 'Tìm số trung bình cộng',
    intro: 'Khi biết tổng và số lượng, em sẽ tính được "trung bình mỗi cái là bao nhiêu" — đó là số trung bình cộng!',
    objectives: [
      'Tính số trung bình cộng của nhiều số.',
      'Áp dụng vào bài toán thực tế.',
    ],
    theory: [
      { h: 'Công thức' },
      { p: 'Trung bình cộng = (Tổng tất cả các số) : (Số lượng số).' },
      { ul: [
        'Từ trung bình cộng và số lượng → suy ra tổng: Tổng = Trung bình × Số lượng.',
        'Số trung bình cộng nằm giữa số bé nhất và số lớn nhất.',
      ] },
      { note: 'Trung bình cộng thường không phải là số nguyên — đôi khi là phân số/thập phân.' },
    ],
    examples: [
      { q: 'TB của 12, 14, 16.', a: '(12 + 14 + 16) / 3 = 42 / 3 = 14.' },
      { q: 'TB 5 số là 12. Tổng?', a: '12 × 5 = 60.' },
    ],
  },

  'P4-w32-quiz': {
    topic: 'Biểu đồ tranh — Biểu đồ cột',
    intro: 'Số liệu sẽ trở nên sinh động khi được trình bày dưới dạng biểu đồ — tranh hoặc cột!',
    objectives: [
      'Đọc biểu đồ tranh, biểu đồ cột.',
      'So sánh, phân tích số liệu trên biểu đồ.',
    ],
    theory: [
      { h: 'Hai loại biểu đồ' },
      { ul: [
        'Biểu đồ tranh: mỗi hình ảnh đại diện cho một số lượng (chú thích bên dưới).',
        'Biểu đồ cột: dùng các cột có chiều cao tỉ lệ với số liệu.',
      ] },
      { h: 'Đọc biểu đồ' },
      { p: 'Cần xem chú thích, đơn vị, sau đó so sánh các giá trị để rút ra kết luận.' },
      { note: 'Cột càng cao → giá trị càng lớn. Trong biểu đồ tranh, đếm số hình rồi nhân với giá trị mỗi hình.' },
    ],
    examples: [
      { q: 'Biểu đồ tranh: mỗi quả táo bằng 5 quả thật. Có 7 hình → bao nhiêu quả?', a: '7 × 5 = 35 quả.' },
      { q: '4 lớp có 30, 32, 28, 34 HS. Tổng?', a: '30 + 32 + 28 + 34 = 124 HS.' },
    ],
  },

  'P4-w33-quiz': {
    topic: 'Bài toán "Tìm hai số khi biết tổng và hiệu"',
    intro: 'Dạng toán cổ điển nhưng rất hay — biết tổng và hiệu, em sẽ tìm ra cả hai số!',
    objectives: [
      'Vận dụng công thức tổng – hiệu.',
      'Vẽ sơ đồ đoạn thẳng để hỗ trợ giải.',
    ],
    theory: [
      { h: 'Công thức' },
      { ul: [
        'Số lớn = (Tổng + Hiệu) / 2.',
        'Số bé = (Tổng − Hiệu) / 2.',
      ] },
      { h: 'Quy trình' },
      { p: 'Đọc đề → xác định tổng và hiệu → vẽ sơ đồ đoạn thẳng → áp dụng công thức.' },
      { note: 'Có thể tìm số bé trước rồi suy ra số lớn = Số bé + Hiệu.' },
    ],
    examples: [
      { q: 'Tổng 50, hiệu 10. Số lớn?', a: '(50 + 10) / 2 = 30.' },
      { q: 'Anh hơn em 6 tuổi. Tổng 30. Tuổi em?', a: '(30 − 6) / 2 = 12 tuổi.' },
    ],
  },

  'P4-w34-quiz': {
    topic: 'Bài toán "Tổng và tỉ" / "Hiệu và tỉ"',
    intro: 'Tuần này em học giải bài toán khi biết tổng (hoặc hiệu) và TỈ SỐ giữa hai số.',
    objectives: [
      'Giải bài toán tổng và tỉ.',
      'Giải bài toán hiệu và tỉ.',
      'Vẽ sơ đồ đoạn thẳng theo "phần".',
    ],
    theory: [
      { h: 'Tổng và tỉ' },
      { p: 'Tổng số phần = tổng tử + mẫu của tỉ số. Mỗi phần = Tổng : tổng số phần.' },
      { h: 'Hiệu và tỉ' },
      { p: 'Hiệu số phần = mẫu − tử (hoặc ngược lại). Mỗi phần = Hiệu : hiệu số phần.' },
      { note: 'Vẽ sơ đồ "phần" giúp em dễ hình dung hơn rất nhiều.' },
    ],
    examples: [
      { q: 'Tổng 28, tỉ bé/lớn = 1/3. Số bé?', a: 'Tổng phần 1 + 3 = 4 → 28/4 = 7 → số bé 7.' },
      { q: 'Hiệu 12, tỉ bé/lớn = 1/4. Số bé?', a: 'Hiệu phần 4 − 1 = 3 → 12/3 = 4 → số bé 4.' },
    ],
  },

  'P4-w35-quiz': {
    topic: 'Ôn tập cuối năm',
    intro: 'Tuần cuối năm rồi! Cô tổng kết và ôn lại toàn bộ kiến thức Toán Lớp 4 — cố gắng làm tốt nhé!',
    objectives: [
      'Tổng hợp kiến thức cả năm.',
      'Vận dụng linh hoạt vào nhiều dạng bài.',
    ],
    theory: [
      { h: 'Các chủ đề chính' },
      { ul: [
        'Số tự nhiên đến lớp tỉ.',
        'Bốn phép tính, dấu hiệu chia hết.',
        'Phân số: rút gọn, quy đồng, so sánh, 4 phép tính.',
        'Đơn vị đo (khối lượng, thời gian, diện tích).',
        'Hình học (vuông góc, song song, hình bình hành, hình thoi, các loại góc).',
        'Trung bình cộng, biểu đồ, các bài toán tổng – hiệu, tổng – tỉ.',
      ] },
      { note: 'Trong bài làm: trình bày sạch, kiểm tra lại đáp số trước khi nộp!' },
    ],
    examples: [
      { q: 'Diện tích hình thoi hai đường chéo 6 cm và 8 cm?', a: '(6 × 8) / 2 = 24 cm².' },
      { q: 'Hai số tổng 60, hiệu 20. Số lớn?', a: '(60 + 20) / 2 = 40.' },
    ],
  },

  'P4-w36-quiz': {
    topic: 'Kết thúc Lớp 4 — Hành trang vào Lớp 5',
    intro: 'Chúc mừng các em đã hoàn thành năm học Lớp 4! Hôm nay cô và trò cùng nhìn lại chặng đường đã đi, gói ghém những kiến thức toán học quan trọng nhất làm hành trang bước sang Lớp 5 nhé!',
    objectives: [
      'Hệ thống toàn bộ kiến thức Toán Lớp 4 theo năm mảng lớn.',
      'Biết những chủ đề mới thú vị đang chờ ở Lớp 5.',
      'Xây dựng kế hoạch ôn tập trong hè để khởi đầu Lớp 5 tự tin.',
    ],
    theory: [
      { h: 'Năm mảng lớn Toán Lớp 4 em đã chinh phục' },
      { ul: [
        'Số và tính toán: số đến lớp tỉ; bốn phép tính với số tự nhiên và phân số; dấu hiệu chia hết cho 2, 3, 5, 9; phân số — rút gọn, quy đồng, so sánh, cộng trừ nhân chia.',
        'Đại lượng và đo lường: diện tích (cm², dm², m², km²); khối lượng (g, kg, tạ, tấn); thời gian (giây, phút, giờ, ngày, tuần, tháng, năm, thế kỷ).',
        'Hình học: đường vuông góc, đường song song; góc nhọn – vuông – tù – bẹt; hình bình hành, hình thoi; diện tích hình chữ nhật và hình vuông.',
        'Thống kê: trung bình cộng; đọc và vẽ biểu đồ cột.',
        'Giải toán: tổng – hiệu, tổng – tỉ, hiệu – tỉ; các bài toán thực tiễn nhiều bước.',
      ] },
      { h: 'Lớp 5 sẽ có gì mới?' },
      { ul: [
        'Phân số nâng cao: phép chia phân số, phân số thập phân, số thập phân.',
        'Diện tích: hình tam giác, hình thang, hình tròn.',
        'Thể tích: hình hộp chữ nhật, hình lập phương.',
        'Tỉ số phần trăm và ứng dụng thực tiễn.',
        'Bài toán chuyển động đều (vận tốc, quãng đường, thời gian).',
      ] },
      { h: 'Kế hoạch ôn hè' },
      { ul: [
        'Ôn lại phân số: rút gọn, quy đồng, 4 phép tính (15 phút/ngày).',
        'Luyện tính nhẩm nhân chia để chuẩn bị làm việc với số thập phân.',
        'Giải 2–3 bài toán có lời văn mỗi ngày để duy trì tư duy logic.',
      ] },
      { note: 'Em đã vượt qua một năm học đầy thử thách! Hãy tự hào và tận hưởng kỳ nghỉ hè xứng đáng.' },
    ],
    examples: [
      { q: 'Tính: 3/4 + 5/6.', a: 'Quy đồng: 9/12 + 10/12 = 19/12.' },
      { q: 'Diện tích hình thang đáy lớn 10 cm, đáy nhỏ 6 cm, chiều cao 5 cm?', a: '(10 + 6) × 5 / 2 = 40 cm².' },
    ],
  },
};
