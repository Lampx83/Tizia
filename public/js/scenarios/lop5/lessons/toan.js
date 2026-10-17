// ============================================================
// Lớp 5 · TOÁN — Lý thuyết tuần (P5_TOAN_LESSONS)
// 35 tuần, key trùng id quiz: "P5-w01-quiz" … "P5-w35-quiz".
// ============================================================

const L = (topic, intro, objectives, theory, examples) =>
  ({ topic, intro, objectives, theory, examples });

export const P5_TOAN_LESSONS = {
  'P5-w01-quiz': L(
    'Ôn tập số tự nhiên',
    'Tuần 1 ôn lại số tự nhiên đã học ở lớp 4: đọc, viết, so sánh và 4 phép tính cơ bản.',
    [
      'Đọc - viết được số tự nhiên đến hàng tỉ.',
      'So sánh, sắp xếp số tự nhiên.',
      'Thực hiện thành thạo 4 phép tính với số tự nhiên.',
    ],
    [
      '**Số tự nhiên** gồm các số 0, 1, 2, 3, 4, … kéo dài vô tận.',
      'Mỗi số tự nhiên có các **hàng**: đơn vị, chục, trăm, nghìn, chục nghìn, trăm nghìn, triệu, chục triệu, trăm triệu, tỉ…',
      'Khi đọc số, ta tách thành **từng lớp 3 chữ số** từ phải sang trái (lớp đơn vị, lớp nghìn, lớp triệu, lớp tỉ).',
      'So sánh: số có **nhiều chữ số hơn thì lớn hơn**; cùng số chữ số thì so từng chữ số từ trái sang.',
      '4 phép tính: cộng, trừ, nhân, chia — chú ý thứ tự thực hiện (× ÷ trước, + − sau, có ngoặc tính trong ngoặc trước).',
    ],
    [
      { title: 'Đọc số', body: 'Số **1.234.567** đọc là *"một triệu hai trăm ba mươi tư nghìn năm trăm sáu mươi bảy"*.' },
      { title: 'So sánh', body: 'So sánh 35.789 và 35.798: cùng 5 chữ số, hàng nghìn và trăm bằng nhau, hàng chục thì 8 < 9 nên **35.789 < 35.798**.' },
    ]
  ),

  'P5-w02-quiz': L(
    'Ôn tập phân số (1) — Khái niệm & rút gọn',
    'Ôn lại khái niệm phân số, phân số bằng nhau và cách rút gọn — nền tảng để học tiếp các phép tính phân số.',
    [
      'Hiểu phân số là một cách viết để chỉ một phần của đơn vị.',
      'Biết rút gọn phân số về tối giản.',
      'Quy đồng được mẫu số 2 phân số đơn giản.',
    ],
    [
      'Phân số **a/b** có *a* là tử, *b* là mẫu (b ≠ 0).',
      'Hai phân số **bằng nhau** khi nhân (hoặc chia) cả tử và mẫu với cùng một số khác 0.',
      '**Rút gọn**: chia cả tử và mẫu cho ước chung lớn nhất để được phân số tối giản.',
      '**Quy đồng mẫu**: chọn mẫu chung (thường là bội chung nhỏ nhất) rồi đưa các phân số về cùng mẫu.',
    ],
    [
      { title: 'Rút gọn', body: '12/18 chia cả tử và mẫu cho 6 được **2/3** (tối giản).' },
      { title: 'Quy đồng', body: '1/2 và 1/3 → mẫu chung 6 → 3/6 và 2/6.' },
    ]
  ),

  'P5-w03-quiz': L(
    'Ôn tập phân số (2) — Cộng & trừ',
    'Tuần 3 ôn cộng - trừ phân số: quy đồng rồi cộng/trừ tử, giữ mẫu.',
    [
      'Cộng - trừ được phân số cùng mẫu và khác mẫu.',
      'Rút gọn kết quả về phân số tối giản.',
    ],
    [
      'Phân số **cùng mẫu**: cộng/trừ tử, giữ nguyên mẫu.',
      'Phân số **khác mẫu**: quy đồng mẫu trước, rồi cộng/trừ tử.',
      'Kết quả nên rút gọn nếu được, hoặc chuyển thành hỗn số khi tử lớn hơn mẫu.',
    ],
    [
      { title: 'Cùng mẫu', body: '3/7 + 2/7 = **5/7**.' },
      { title: 'Khác mẫu', body: '1/2 + 1/3 = 3/6 + 2/6 = **5/6**.' },
    ]
  ),

  'P5-w04-quiz': L(
    'Ôn tập phân số (3) — Nhân & chia',
    'Nhân và chia phân số khác với cộng - trừ ở chỗ **không cần quy đồng**.',
    [
      'Nhân được hai phân số.',
      'Chia phân số bằng cách nhân với phân số đảo ngược.',
    ],
    [
      '**Nhân**: tử nhân tử, mẫu nhân mẫu.',
      '**Chia**: a/b : c/d = a/b × d/c (nhân với phân số đảo ngược).',
      'Có thể rút gọn chéo trước khi nhân để tính nhanh.',
    ],
    [
      { title: 'Nhân', body: '2/3 × 3/4 = (2×3)/(3×4) = 6/12 = **1/2**.' },
      { title: 'Chia', body: '2/3 : 4/5 = 2/3 × 5/4 = 10/12 = **5/6**.' },
    ]
  ),

  'P5-w05-quiz': L(
    'Hỗn số',
    'Hỗn số là cách viết số gồm phần nguyên và phần phân số. Hữu ích khi đo, chia bánh, chia tiền.',
    [
      'Đọc - viết hỗn số.',
      'Chuyển đổi hỗn số ↔ phân số.',
    ],
    [
      'Hỗn số dạng **a b/c** = a + b/c, với b < c.',
      'Đổi sang phân số: tử = a × c + b; mẫu giữ nguyên c.',
      'Đổi từ phân số > 1 sang hỗn số: chia tử cho mẫu, thương là phần nguyên, dư làm tử mới.',
    ],
    [
      { title: 'Hỗn số → phân số', body: '2 3/4 = (2×4+3)/4 = **11/4**.' },
      { title: 'Phân số → hỗn số', body: '11/4 = 11 : 4 = 2 dư 3 → **2 3/4**.' },
    ]
  ),

  'P5-w06-quiz': L(
    'Số thập phân — đọc & viết',
    'Số thập phân giúp viết các phần nhỏ hơn 1 đơn vị một cách gọn — dùng nhiều trong đo lường, tiền.',
    [
      'Hiểu cấu tạo số thập phân: phần nguyên - dấu phẩy - phần thập phân.',
      'Đọc - viết số thập phân.',
    ],
    [
      'Số thập phân gồm **phần nguyên** và **phần thập phân**, ngăn bởi dấu phẩy.',
      'Bên phải dấu phẩy là các hàng: phần mười, phần trăm, phần nghìn…',
      '0,5 = 5/10 = 1/2; 0,25 = 25/100 = 1/4; 0,75 = 75/100 = 3/4.',
    ],
    [
      { title: 'Đọc số', body: '3,14 đọc là *"ba phẩy mười bốn"* hoặc *"ba đơn vị mười bốn phần trăm"*.' },
      { title: 'Viết số', body: '"Hai phẩy năm" → **2,5** = 25/10.' },
    ]
  ),

  'P5-w07-quiz': L(
    'So sánh - Cộng - Trừ số thập phân',
    'Quy tắc so sánh và cộng - trừ số thập phân: thẳng cột dấu phẩy.',
    [
      'So sánh được 2 số thập phân.',
      'Cộng - trừ thành thạo số thập phân.',
    ],
    [
      'So sánh: so phần nguyên trước; nếu bằng thì so từng hàng phần thập phân.',
      'Khi cộng/trừ: viết các số sao cho **dấu phẩy thẳng cột**, rồi cộng/trừ như số tự nhiên, hạ dấu phẩy xuống.',
      'Có thể thêm số 0 vào cuối phần thập phân để các số có cùng số chữ số.',
    ],
    [
      { title: 'So sánh', body: '3,14 và 3,1 → 3,14 > 3,1 (vì 3,10 < 3,14).' },
      { title: 'Cộng', body: '2,5 + 1,75 = 2,50 + 1,75 = **4,25**.' },
    ]
  ),

  'P5-w08-quiz': L(
    'Nhân số thập phân',
    'Nhân số thập phân với số tự nhiên và với số thập phân.',
    [
      'Nhân được số thập phân với 10, 100, 1000.',
      'Nhân số thập phân với số thập phân.',
    ],
    [
      'Nhân với **10, 100, 1000…**: dịch dấu phẩy sang phải 1, 2, 3… chữ số.',
      'Nhân số thập phân với nhau: nhân như số tự nhiên (bỏ dấu phẩy), rồi đếm tổng số chữ số phần thập phân của cả 2 thừa số để đặt dấu phẩy ở tích.',
    ],
    [
      { title: 'Nhân với 100', body: '3,14 × 100 = **314**.' },
      { title: 'Nhân thập phân', body: '0,5 × 0,2: 5 × 2 = 10; tổng phần thập phân 1+1 = 2 chữ số → **0,10 = 0,1**.' },
    ]
  ),

  'P5-w09-quiz': L(
    'Chia số thập phân',
    'Chia số thập phân cho số tự nhiên và cho số thập phân.',
    [
      'Chia được số thập phân cho 10, 100, 1000.',
      'Chia số thập phân cho số thập phân.',
    ],
    [
      'Chia cho **10, 100, 1000…**: dịch dấu phẩy sang trái 1, 2, 3… chữ số.',
      'Chia số thập phân cho số tự nhiên: chia như số tự nhiên, khi đến phần thập phân thì hạ dấu phẩy lên thương.',
      'Chia cho số thập phân: nhân cả số bị chia và số chia với 10, 100… để số chia thành số tự nhiên, rồi chia.',
    ],
    [
      { title: 'Chia cho 10', body: '3,14 : 10 = **0,314**.' },
      { title: 'Chia thập phân', body: '4,5 : 1,5 = 45 : 15 = **3**.' },
    ]
  ),

  'P5-w10-quiz': L(
    'Đơn vị đo diện tích — dm², mm², km², ha',
    'Mở rộng bảng đơn vị diện tích để đo những vật rất nhỏ (mm²) hoặc rất lớn (km², ha).',
    [
      'Đọc tên và viết kí hiệu các đơn vị diện tích.',
      'Đổi đơn vị diện tích.',
    ],
    [
      'Bảng đơn vị: km² > hm² (ha) > dam² > m² > dm² > cm² > mm².',
      '**1 đơn vị lớn = 100 đơn vị bé liền kề** (vì là diện tích nên ×100, không phải ×10).',
      '1 ha = 1 hm² = 10.000 m² (dùng để đo ruộng đất).',
      '1 km² = 1.000.000 m² = 100 ha (dùng để đo lãnh thổ).',
    ],
    [
      { title: 'Đổi đơn vị', body: '5 m² = 500 dm² = 50.000 cm² (mỗi bậc nhân 100).' },
      { title: 'Diện tích đất', body: 'Một thửa ruộng 5 ha = 50.000 m².' },
    ]
  ),

  'P5-w11-quiz': L(
    'Diện tích hình tam giác',
    'Công thức tính diện tích tam giác từ đáy và chiều cao.',
    [
      'Nhận biết đáy và chiều cao của tam giác.',
      'Vận dụng công thức S = (a × h)/2.',
    ],
    [
      'Tam giác có 3 cạnh và 3 đỉnh; mỗi cạnh là đáy thì có chiều cao tương ứng (đường vuông góc từ đỉnh đối diện xuống đáy).',
      'Công thức **S = (a × h) : 2** với a là đáy, h là chiều cao.',
      'Đáy và chiều cao phải cùng đơn vị đo.',
    ],
    [
      { title: 'Áp dụng', body: 'Tam giác đáy 6 cm, cao 4 cm → S = (6×4)/2 = **12 cm²**.' },
      { title: 'Tam giác vuông', body: 'Hai cạnh góc vuông 3 cm và 5 cm → S = (3×5)/2 = **7,5 cm²**.' },
    ]
  ),

  'P5-w12-quiz': L(
    'Diện tích hình thang',
    'Hình thang có 2 cạnh đáy song song. Công thức diện tích dùng tổng 2 đáy nhân chiều cao chia 2.',
    [
      'Nhận biết hình thang, 2 đáy và chiều cao.',
      'Vận dụng công thức S = (a + b) × h : 2.',
    ],
    [
      'Hình thang là tứ giác có **đúng 2 cạnh đối song song** (gọi là 2 đáy).',
      'Chiều cao là khoảng cách giữa 2 đáy (đường vuông góc nối 2 đáy).',
      'Công thức: **S = (a + b) × h : 2**.',
      'Hình thang vuông có 1 cạnh bên vuông góc với 2 đáy → cạnh bên đó là chiều cao.',
    ],
    [
      { title: 'Áp dụng', body: 'Đáy lớn 8 cm, đáy bé 4 cm, cao 5 cm → S = (8+4)×5/2 = **30 cm²**.' },
      { title: 'Trong thực tế', body: 'Mặt cắt mái nhà hình thang, ruộng hình thang…' },
    ]
  ),

  'P5-w13-quiz': L(
    'Hình tròn — Chu vi đường tròn',
    'Hình tròn có tâm, bán kính, đường kính. Chu vi dùng số π ≈ 3,14.',
    [
      'Nhận biết các yếu tố của hình tròn.',
      'Tính chu vi đường tròn.',
    ],
    [
      'Hình tròn: tâm O, bán kính r, đường kính d = 2r.',
      'Số π ≈ **3,14**.',
      'Công thức **chu vi**: C = d × π = 2 × r × π.',
    ],
    [
      { title: 'Tính C', body: 'Đường tròn d = 10 cm → C = 10 × 3,14 = **31,4 cm**.' },
      { title: 'Từ bán kính', body: 'r = 5 cm → C = 2 × 5 × 3,14 = **31,4 cm**.' },
    ]
  ),

  'P5-w14-quiz': L(
    'Diện tích hình tròn',
    'Diện tích hình tròn dùng bán kính.',
    [
      'Tính diện tích hình tròn từ bán kính.',
      'Tính diện tích từ đường kính (đổi sang bán kính trước).',
    ],
    [
      'Công thức **S = r × r × π** (bán kính bình phương nhân π).',
      'Nếu cho đường kính, đổi r = d/2 trước.',
      'Đơn vị: bán kính là cm thì S là cm².',
    ],
    [
      { title: 'Áp dụng', body: 'r = 4 cm → S = 4×4×3,14 = **50,24 cm²**.' },
      { title: 'Từ đường kính', body: 'd = 10 cm → r = 5 → S = 25×3,14 = **78,5 cm²**.' },
    ]
  ),

  'P5-w15-quiz': L(
    'Tỉ số và Tỉ số phần trăm (%)',
    'Tỉ số so sánh 2 số bằng phép chia; phần trăm là tỉ số có mẫu 100.',
    [
      'Hiểu khái niệm tỉ số và %.',
      'Đổi giữa tỉ số, phân số, thập phân, %.',
    ],
    [
      '**Tỉ số** a : b = a/b (so sánh số a với b).',
      'Phần trăm là tỉ số mà mẫu là **100**: 25% = 25/100 = 0,25.',
      'Chuyển đổi: 1/2 = 0,5 = 50%; 3/4 = 0,75 = 75%; 1/5 = 0,2 = 20%.',
    ],
    [
      { title: 'Đổi %', body: '0,4 = 40/100 = **40%**.' },
      { title: 'Tỉ số', body: 'Lớp có 30 HS, 12 HS nam → tỉ số nam : cả lớp = 12 : 30 = 2/5 = **40%**.' },
    ]
  ),

  'P5-w16-quiz': L(
    'Vận tốc — Quãng đường — Thời gian (1)',
    'Mối liên hệ v - s - t. Tuần này tập trung tính vận tốc.',
    [
      'Hiểu vận tốc là quãng đường đi trong 1 đơn vị thời gian.',
      'Tính được vận tốc khi biết quãng đường và thời gian.',
    ],
    [
      '**Vận tốc** = Quãng đường : Thời gian → **v = s : t**.',
      'Đơn vị: km/giờ, m/giây, km/phút…',
      'Quãng đường và thời gian phải đồng bộ đơn vị.',
    ],
    [
      { title: 'Tính v', body: 'Ô tô đi 120 km trong 3 giờ → v = 120 : 3 = **40 km/giờ**.' },
      { title: 'Đổi đơn vị', body: '36 km/giờ = 36.000 m / 3600 s = **10 m/giây**.' },
    ]
  ),

  'P5-w17-quiz': L(
    'Vận tốc — Quãng đường — Thời gian (2)',
    'Tính quãng đường và thời gian khi biết vận tốc.',
    [
      'Tính được quãng đường (s = v × t).',
      'Tính được thời gian (t = s : v).',
    ],
    [
      'Tam giác công thức: **s = v × t**; **v = s : t**; **t = s : v**.',
      'Khi giải toán: tóm tắt - xác định đại lượng cần tìm - chọn công thức tương ứng.',
      'Nếu thời gian là phân số/hỗn số (vd 2 giờ 30 phút), đổi sang giờ thập phân (2,5 giờ).',
    ],
    [
      { title: 'Tính s', body: 'Xe v = 50 km/giờ, đi 2 giờ → s = 50 × 2 = **100 km**.' },
      { title: 'Tính t', body: 's = 90 km, v = 30 km/giờ → t = 90 : 30 = **3 giờ**.' },
    ]
  ),

  'P5-w18-quiz': L(
    'Ôn tập học kỳ I',
    'Tổng hợp các nội dung trọng tâm HK1: phân số, thập phân, diện tích, hình tròn, vận tốc.',
    [
      'Hệ thống các công thức diện tích đã học.',
      'Vận dụng giải bài toán có lời văn.',
    ],
    [
      'Diện tích: tam giác = a×h/2; thang = (a+b)×h/2; tròn = r×r×π.',
      'Chu vi đường tròn = d×π = 2r×π.',
      'v = s/t — quan hệ vận tốc - quãng đường - thời gian.',
      '% là tỉ số có mẫu 100; biết chuyển % ↔ thập phân ↔ phân số.',
    ],
    [
      { title: 'Tổng hợp', body: 'Mảnh đất hình thang: đáy lớn 12 m, đáy bé 8 m, cao 5 m → S = (12+8)×5/2 = **50 m²**.' },
      { title: 'Vận tốc', body: 'Đi 30 km trong nửa giờ → v = 30 : 0,5 = **60 km/giờ**.' },
    ]
  ),

  'P5-w19-quiz': L(
    'Hình hộp chữ nhật — diện tích xung quanh, toàn phần',
    'Hình hộp chữ nhật có 6 mặt là hình chữ nhật; tính diện tích xung quanh và toàn phần.',
    [
      'Nhận biết hình hộp chữ nhật, 3 kích thước a, b, h.',
      'Tính diện tích xung quanh và toàn phần.',
    ],
    [
      'Hình hộp chữ nhật có 3 kích thước: chiều dài a, chiều rộng b, chiều cao h.',
      '**Sxq** = chu vi đáy × chiều cao = (a + b) × 2 × h.',
      '**Stp** = Sxq + 2 × (a × b) — cộng diện tích 2 mặt đáy.',
    ],
    [
      { title: 'Sxq', body: 'a=5, b=3, h=4 → Sxq = (5+3)×2×4 = **64 cm²**.' },
      { title: 'Stp', body: 'Như trên: 2 đáy = 2×5×3 = 30; Stp = 64+30 = **94 cm²**.' },
    ]
  ),

  'P5-w20-quiz': L(
    'Thể tích — Đơn vị đo thể tích',
    'Thể tích là chỗ chiếm trong không gian. Đơn vị: cm³, dm³, m³ (và lít).',
    [
      'Hiểu khái niệm thể tích.',
      'Đổi đơn vị thể tích.',
    ],
    [
      'Đơn vị: m³ > dm³ > cm³; **1 m³ = 1.000 dm³ = 1.000.000 cm³**.',
      '1 dm³ = 1 lít (chất lỏng); 1 cm³ = 1 ml.',
      'Thể tích hình hộp chữ nhật **V = a × b × h**.',
    ],
    [
      { title: 'Đổi đơn vị', body: '2 m³ = 2.000 dm³ = 2.000 lít.' },
      { title: 'V hình hộp', body: 'a=2, b=3, h=4 → V = 24 cm³.' },
    ]
  ),

  'P5-w21-quiz': L(
    'Thể tích hình lập phương',
    'Hình lập phương là hình hộp đặc biệt: 6 mặt đều là hình vuông bằng nhau.',
    [
      'Tính thể tích hình lập phương.',
      'Tính diện tích xung quanh và toàn phần hình lập phương.',
    ],
    [
      'Cạnh hình lập phương ký hiệu **a**.',
      'Thể tích **V = a × a × a** (a mũ 3).',
      'Sxq = 4 × a × a; Stp = 6 × a × a.',
    ],
    [
      { title: 'V', body: 'a = 3 cm → V = 3×3×3 = **27 cm³**.' },
      { title: 'Stp', body: 'a = 3 cm → Stp = 6×9 = **54 cm²**.' },
    ]
  ),

  'P5-w22-quiz': L(
    'Ôn nhẹ sau Tết — Số đo thời gian',
    'Đơn vị thời gian: giây, phút, giờ, ngày, tuần, tháng, năm, thế kỉ.',
    [
      'Nhớ các đơn vị thời gian và quan hệ giữa chúng.',
      'Đổi giữa các đơn vị.',
    ],
    [
      '1 phút = 60 giây; 1 giờ = 60 phút; 1 ngày = 24 giờ.',
      '1 tuần = 7 ngày; 1 năm = 12 tháng = 365 (hoặc 366 năm nhuận) ngày.',
      '1 thế kỉ = 100 năm; 1 thiên niên kỉ = 1.000 năm.',
    ],
    [
      { title: 'Đổi', body: '2 giờ 30 phút = 150 phút.' },
      { title: 'Năm nhuận', body: 'Năm chia hết cho 4 thường là năm nhuận có 366 ngày (vd 2020, 2024).' },
    ]
  ),

  'P5-w23-quiz': L(
    'Cộng - Trừ số đo thời gian',
    'Cộng - trừ thời gian: chú ý đổi từ 60 giây = 1 phút, 60 phút = 1 giờ.',
    [
      'Cộng - trừ được số đo thời gian.',
    ],
    [
      'Khi cộng: cộng cùng đơn vị, nếu giây ≥ 60 thì đổi thành phút; phút ≥ 60 thành giờ.',
      'Khi trừ: nếu thiếu thì mượn 1 từ đơn vị lớn hơn (1 giờ = 60 phút).',
    ],
    [
      { title: 'Cộng', body: '2 giờ 45 phút + 1 giờ 30 phút = 3 giờ 75 phút = **4 giờ 15 phút**.' },
      { title: 'Trừ', body: '3 giờ 20 phút − 1 giờ 50 phút = 2 giờ 80 phút − 1 giờ 50 phút = **1 giờ 30 phút**.' },
    ]
  ),

  'P5-w24-quiz': L(
    'Toán chuyển động — 2 vật ngược chiều',
    'Hai vật chuyển động ngược chiều và gặp nhau: tổng vận tốc rút ngắn khoảng cách.',
    [
      'Hiểu công thức t_gặp = s : (v1 + v2) khi đi ngược chiều.',
    ],
    [
      'Khi 2 vật cùng xuất phát, đi ngược chiều, mỗi giờ khoảng cách giảm bằng tổng vận tốc.',
      'Thời gian gặp nhau **t = s : (v1 + v2)**.',
      'Quãng đường mỗi vật đi được = vận tốc × thời gian gặp.',
    ],
    [
      { title: 'Áp dụng', body: 'A và B cách nhau 120 km, đi ngược chiều, vA=40 km/h, vB=20 km/h → t = 120:(40+20) = **2 giờ**.' },
      { title: 'Vị trí gặp', body: 'A đi 40×2 = 80 km, B đi 20×2 = 40 km (tổng = 120 km ✓).' },
    ]
  ),

  'P5-w25-quiz': L(
    'Toán chuyển động — 2 vật cùng chiều',
    'Hai vật đi cùng chiều, vật sau đuổi vật trước: hiệu vận tốc làm khoảng cách giảm.',
    [
      'Hiểu t_đuổi = s : (v1 − v2) khi đi cùng chiều.',
    ],
    [
      'Khi đi cùng chiều, mỗi giờ khoảng cách giảm bằng **hiệu vận tốc**.',
      'Vật sau phải đi nhanh hơn vật trước mới đuổi kịp.',
      'Thời gian đuổi kịp **t = s : (v1 − v2)**.',
    ],
    [
      { title: 'Áp dụng', body: 'A đuổi B, A chạy 60 km/h, B chạy 40 km/h, B đi trước A 30 km → t = 30:(60-40) = **1,5 giờ**.' },
      { title: 'Chú ý', body: 'Nếu v1 ≤ v2, A không bao giờ đuổi kịp B.' },
    ]
  ),

  'P5-w26-quiz': L(
    'Toán tỉ lệ thuận',
    '2 đại lượng tỉ lệ thuận: cùng tăng hoặc cùng giảm theo cùng tỉ số.',
    [
      'Nhận biết tỉ lệ thuận.',
      'Giải toán bằng "rút về đơn vị" hoặc "tỉ số".',
    ],
    [
      'Hai đại lượng tỉ lệ thuận: khi đại lượng này tăng (giảm) bao nhiêu lần thì đại lượng kia tăng (giảm) bấy nhiêu lần.',
      'Cách 1 (rút về đơn vị): tìm giá trị ứng với 1 đơn vị rồi nhân lên.',
      'Cách 2 (tỉ số): so 2 trường hợp xem gấp mấy lần nhau.',
    ],
    [
      { title: 'Rút về đơn vị', body: '5 quyển vở 25.000 đ → 1 quyển 5.000 đ → 8 quyển = **40.000 đ**.' },
      { title: 'Tỉ số', body: '8 = 5 × 1,6 → 25.000 × 1,6 = **40.000 đ**.' },
    ]
  ),

  'P5-w27-quiz': L(
    'Toán tỉ lệ nghịch',
    '2 đại lượng tỉ lệ nghịch: cái này tăng bao nhiêu lần thì cái kia giảm bấy nhiêu.',
    [
      'Nhận biết tỉ lệ nghịch.',
      'Giải toán tỉ lệ nghịch.',
    ],
    [
      'Tỉ lệ nghịch: tích 2 đại lượng luôn không đổi (a × b = hằng số).',
      'Ví dụ: cùng một công việc, số người và thời gian là tỉ lệ nghịch (nhiều người làm nhanh hơn).',
    ],
    [
      { title: 'Áp dụng', body: '3 người làm xong trong 8 giờ → 6 người làm xong trong (3×8):6 = **4 giờ**.' },
      { title: 'Vận tốc - thời gian', body: 'Cùng quãng đường, v gấp đôi thì t giảm 1 nửa.' },
    ]
  ),

  'P5-w28-quiz': L(
    'Biểu đồ hình quạt',
    'Biểu đồ hình quạt thể hiện tỉ số phần trăm các thành phần trong cùng một tổng thể.',
    [
      'Đọc - hiểu biểu đồ hình quạt.',
      'Tính số lượng từ % và ngược lại.',
    ],
    [
      'Biểu đồ hình quạt: 1 hình tròn = 100%, mỗi miếng (quạt) là 1 thành phần.',
      'Tổng % các thành phần luôn = 100%.',
      'Tính số lượng = tổng × %.',
    ],
    [
      { title: 'Đọc biểu đồ', body: 'Lớp 40 HS; biểu đồ: Nam 60%, Nữ 40% → Nam = 40×60% = **24 bạn**; Nữ = 16 bạn.' },
      { title: 'Tính %', body: '12/40 = 30% → tô miếng quạt 30%.' },
    ]
  ),

  'P5-w29-quiz': L(
    'Toán % nâng cao — Tìm 1 số khi biết % của nó',
    '3 dạng toán phần trăm: tìm % của 1 số, tìm 1 số khi biết %, tìm tỉ số %.',
    [
      'Giải được cả 3 dạng toán %.',
    ],
    [
      'Dạng 1 — **Tìm % của 1 số**: a × p% = a × p/100.',
      'Dạng 2 — **Tìm 1 số khi biết p% của nó là b**: số đó = b : p%.',
      'Dạng 3 — **Tìm tỉ số % của 2 số a và b**: a/b × 100 = tỉ số %.',
    ],
    [
      { title: 'Dạng 2', body: '25% của 1 số là 50 → số đó = 50 : 25% = 50 : 0,25 = **200**.' },
      { title: 'Dạng 3', body: 'Lớp có 12 nam/40 HS → tỉ số nam = 12:40 = 0,3 = **30%**.' },
    ]
  ),

  'P5-w30-quiz': L(
    'Ôn tập hình học',
    'Hệ thống công thức diện tích, chu vi, thể tích các hình đã học.',
    [
      'Nhớ và áp dụng các công thức.',
    ],
    [
      'Diện tích: chữ nhật (a×b), vuông (a²), tam giác (a×h/2), thang ((a+b)×h/2), tròn (r²×π).',
      'Chu vi: chữ nhật (2×(a+b)), vuông (4a), tròn (d×π).',
      'Thể tích: hộp chữ nhật (a×b×h), lập phương (a³).',
    ],
    [
      { title: 'Hộp chữ nhật', body: 'a=4, b=3, h=5 → V = 60 cm³; Sxq = 2×(4+3)×5 = 70 cm².' },
      { title: 'Hình tròn', body: 'r=5 → C = 31,4; S = 78,5.' },
    ]
  ),

  'P5-w31-quiz': L(
    'Ôn tập số đo đại lượng',
    'Hệ thống các đơn vị đo độ dài, khối lượng, diện tích, thể tích, thời gian.',
    [
      'Nhớ bảng đơn vị đo và quan hệ.',
      'Đổi thành thạo các đơn vị.',
    ],
    [
      'Độ dài: km, hm, dam, m, dm, cm, mm — mỗi bậc ×10.',
      'Khối lượng: tấn, tạ, yến, kg, hg, dag, g — mỗi bậc ×10.',
      'Diện tích: km², hm² (ha), dam², m², dm², cm², mm² — mỗi bậc ×100.',
      'Thể tích: m³, dm³ (lít), cm³ (ml) — mỗi bậc ×1000.',
    ],
    [
      { title: 'Đổi diện tích', body: '2,5 m² = 250 dm².' },
      { title: 'Đổi thể tích', body: '1,5 m³ = 1500 dm³ = 1500 lít.' },
    ]
  ),

  'P5-w32-quiz': L(
    'Ôn tập 4 phép tính số thập phân',
    'Củng cố cộng, trừ, nhân, chia số thập phân.',
    [
      'Thực hiện chính xác 4 phép tính với số thập phân.',
    ],
    [
      'Cộng - Trừ: thẳng cột dấu phẩy.',
      'Nhân: nhân như số tự nhiên, đếm tổng số chữ số phần thập phân để đặt dấu phẩy ở tích.',
      'Chia: nếu số chia là thập phân, nhân cả 2 với 10/100… để số chia thành tự nhiên.',
      'Thứ tự thực hiện: ngoặc > nhân/chia > cộng/trừ.',
    ],
    [
      { title: 'Hỗn hợp', body: '(2,5 + 1,5) × 4 = 4 × 4 = **16**.' },
      { title: 'Chia', body: '7,5 : 0,25 = 750 : 25 = **30**.' },
    ]
  ),

  'P5-w33-quiz': L(
    'Toán tổng hợp — Chuyển động và tỉ số %',
    'Bài toán phức hợp kết hợp chuyển động và phần trăm.',
    [
      'Vận dụng linh hoạt các công thức đã học.',
    ],
    [
      'Đọc kỹ đề - tóm tắt - xác định công thức.',
      'Bài toán nhiều bước: chia thành từng bước nhỏ giải lần lượt.',
      'Kiểm tra lại đơn vị và tính hợp lý của kết quả.',
    ],
    [
      { title: 'Chuyển động', body: 'Tăng vận tốc 25% từ 40 km/h → v mới = 40 + 40×25% = **50 km/h**.' },
      { title: 'Phần trăm', body: 'Lớp có 40 HS, 80% đạt điểm 9-10 → **32 bạn**.' },
    ]
  ),

  'P5-w34-quiz': L(
    'Ôn cuối cấp — Toán đố tổng hợp',
    'Luyện kỹ năng phân tích và giải toán có lời văn — chuẩn bị lên cấp 2.',
    [
      'Phân tích đề bài.',
      'Trình bày bài giải rõ ràng.',
    ],
    [
      'Bước 1: Đọc đề - gạch chân số liệu - tóm tắt.',
      'Bước 2: Phân tích "cần tìm gì?", "đã biết gì?", "cần biết thêm gì?".',
      'Bước 3: Lập kế hoạch giải (chia thành các bước).',
      'Bước 4: Trình bày lời giải đầy đủ, có đáp số.',
    ],
    [
      { title: 'Mẫu', body: 'Mẹ mua 5 kg gạo 75.000 đ và 2 kg đường 30.000 đ. Mẹ đưa 200.000 đ. Tính tiền trả lại = 200.000 − 105.000 = **95.000 đ**.' },
      { title: 'Bài 2 bước', body: 'Tính diện tích rồi từ đó tính số gạch lát.' },
    ]
  ),

  'P5-w35-quiz': L(
    'Ôn cuối cấp — Tổng hợp Toán 5',
    'Tổng kết toàn bộ Toán 5 — chuẩn bị hành trang lên cấp 2.',
    [
      'Hệ thống hoá kiến thức cả năm.',
      'Tự tin với kiến thức Toán cấp 1.',
    ],
    [
      'Số: tự nhiên, phân số, thập phân, hỗn số.',
      'Đo lường: độ dài, khối lượng, diện tích, thể tích, thời gian.',
      'Hình học: tam giác, thang, tròn, hộp chữ nhật, lập phương.',
      'Chuyển động và phần trăm.',
      'Lên cấp 2 sẽ học: số nguyên (âm/dương), biểu thức đại số, hình học phẳng nâng cao.',
    ],
    [
      { title: 'Tổng kết', body: '5 năm tiểu học em đã có nền tảng số học và hình học cơ bản.' },
      { title: 'Lên cấp 2', body: 'Hãy duy trì thói quen làm bài cẩn thận, trình bày rõ ràng.' },
    ]
  ),

  'P5-w36-quiz': L(
    'Kết thúc Tiểu học — Hành trang Toán vào Lớp 6',
    'Chúc mừng! Em đã hoàn thành 5 năm học Toán tiểu học. Cùng nhìn lại bức tranh toàn cảnh nhé.',
    [
      'Hệ thống hoá 5 năm kiến thức Toán tiểu học.',
      'Tự tin và sẵn sàng học Toán THCS.',
    ],
    [
      '**5 trụ cột Toán tiểu học:** Số & phép tính — Đo lường — Hình học — Thống kê — Giải toán.',
      '**Số đã học:** tự nhiên (triệu, tỉ), phân số, hỗn số, số thập phân.',
      '**Hình học đã học:** hình vuông, chữ nhật, tam giác, thang, tròn; hộp chữ nhật, hình lập phương.',
      '**Tư duy toán:** đọc đề → tóm tắt → lập kế hoạch → giải → kiểm tra.',
      '**Lớp 6 sẽ học:** số nguyên âm/dương, tỉ lệ thức, biểu thức chứa chữ, hình học phẳng với đo góc và diện tích nâng cao.',
    ],
    [
      { title: 'Nhìn lại', body: '5 năm em từ "đếm số 1–10" đến "tính thể tích hình hộp và phần trăm" — một hành trình dài!' },
      { title: 'Lời khuyên', body: 'Trước khi vào Lớp 6: ôn phân số và số thập phân — đó là nền tảng của Toán THCS.' },
    ]
  ),
};
