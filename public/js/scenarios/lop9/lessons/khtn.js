// ============================================================
// Lớp 9 · KHOA HỌC TỰ NHIÊN — Lý thuyết 35 tuần (chuẩn bị thi vào 10).
// Key trùng id quiz: "S9KHTN-wNN-quiz".
// Tích hợp: Vật lý (điện học, điện từ, quang học, năng lượng) + Hoá học (kim loại,
// phi kim, hữu cơ, polymer) + Sinh học (di truyền, tiến hoá). Bám SGK KHTN 9
// GDPT 2018 (Kết nối tri thức · Chân trời sáng tạo · Cánh Diều).
// ============================================================

const L = (topic, intro, objectives, theory, examples) => ({ topic, intro, objectives, theory, examples });

export const S9KHTN_LESSONS = {
  'S9KHTN-w01-quiz': L(
    'Điện học — Định luật Ohm',
    'Các em ơi, mở đầu năm học cuối cấp ta bước vào điện học — một trong những chương "ăn điểm" của đề thi vào 10. Hôm nay cô trò mình làm quen với định luật Ohm, "luật vàng" gắn dòng điện, hiệu điện thế và điện trở lại với nhau.',
    [
      'Phát biểu và viết được hệ thức định luật Ohm I = U/R.',
      'Hiểu ý nghĩa điện trở và các yếu tố ảnh hưởng đến điện trở dây dẫn.',
      'Vận dụng định luật Ohm giải bài toán mạch điện đơn giản.',
    ],
    [
      { h: 'Dòng điện, hiệu điện thế, điện trở' },
      { p: 'Cường độ dòng điện I cho biết lượng điện tích dịch chuyển qua tiết diện dây trong 1 giây, đo bằng ampe (A). Hiệu điện thế U là "lực đẩy" khiến dòng điện chạy, đo bằng vôn (V). Điện trở R thể hiện mức cản trở dòng điện của vật dẫn, đo bằng ôm (Ω).' },
      { h: 'Định luật Ohm' },
      { p: 'Cường độ dòng điện chạy qua một đoạn dây dẫn tỉ lệ thuận với hiệu điện thế giữa hai đầu dây và tỉ lệ nghịch với điện trở của dây: I = U/R.' },
      { h: 'Ba dạng của hệ thức' },
      { ul: [
        'Tính dòng điện: I = U/R.',
        'Tính hiệu điện thế: U = I·R.',
        'Tính điện trở: R = U/I.',
      ] },
      { h: 'Đơn vị và bội số' },
      { ul: [
        'I (A), U (V), R (Ω); 1 Ω = 1 V/A.',
        '1 kΩ = 1000 Ω; 1 MΩ = 1 000 000 Ω.',
        '1 mA = 0,001 A.',
      ] },
      { h: 'Điện trở dây dẫn phụ thuộc gì?' },
      { p: 'Điện trở của một dây dẫn tính bằng R = ρ·l/S, trong đó ρ là điện trở suất của vật liệu, l là chiều dài, S là tiết diện. Dây càng dài, càng nhỏ tiết diện thì điện trở càng lớn.' },
      { ul: [
        'Đồng, bạc có điện trở suất nhỏ → dẫn điện tốt, dùng làm dây dẫn.',
        'Nikelin, constantan có điện trở suất lớn → dùng làm dây điện trở (bếp điện, biến trở).',
      ] },
      { h: 'Đồ thị U – I' },
      { p: 'Với một điện trở không đổi, đồ thị biểu diễn sự phụ thuộc của I vào U là một đường thẳng đi qua gốc toạ độ. Độ dốc của đường thẳng càng lớn thì điện trở càng nhỏ.' },
      { note: 'Định luật Ohm là nền tảng của toàn bộ điện học một chiều — gần như mọi bài toán mạch điện đều bắt đầu từ I = U/R.' },
    ],
    [
      { q: 'Đặt hiệu điện thế U = 12 V vào hai đầu điện trở R = 4 Ω. Tính cường độ dòng điện qua điện trở.', a: 'Áp dụng định luật Ohm: I = U/R = 12/4 = 3 A.' },
      { q: 'Dòng điện I = 2 A chạy qua điện trở R = 5 Ω. Tính hiệu điện thế hai đầu điện trở.', a: 'U = I·R = 2·5 = 10 V.' },
      { q: 'Một dây dẫn khi đặt U = 6 V thì có I = 0,3 A. Tính điện trở của dây. Nếu tăng U lên 12 V thì I bằng bao nhiêu?', a: 'R = U/I = 6/0,3 = 20 Ω. Vì R không đổi nên khi U = 12 V thì I = U/R = 12/20 = 0,6 A — dòng điện tăng gấp đôi đúng như định luật Ohm.' },
    ]
  ),

  'S9KHTN-w02-quiz': L(
    'Mạch điện nối tiếp và song song',
    'Trong nhà các em, các thiết bị điện được ghép với nhau theo những cách khác nhau. Hôm nay ta tìm hiểu hai kiểu ghép cơ bản: nối tiếp và song song, cùng cách tính điện trở tương đương cho mỗi kiểu.',
    [
      'Phân biệt được mạch nối tiếp và mạch song song.',
      'Viết các hệ thức về I, U, R cho từng kiểu mạch.',
      'Tính được điện trở tương đương của mạch.',
    ],
    [
      { h: 'Mạch nối tiếp là gì?' },
      { p: 'Các điện trở mắc nối tiếp khi chúng nối "đầu này với đuôi kia", dòng điện chỉ có một con đường duy nhất đi qua tất cả các điện trở.' },
      { h: 'Hệ thức mạch nối tiếp' },
      { ul: [
        'Cường độ dòng điện như nhau: I = I₁ = I₂ = …',
        'Hiệu điện thế cộng lại: U = U₁ + U₂ + …',
        'Điện trở tương đương cộng lại: R_tđ = R₁ + R₂ + …',
      ] },
      { h: 'Mạch song song là gì?' },
      { p: 'Các điện trở mắc song song khi chúng cùng nối vào hai điểm chung, dòng điện rẽ ra nhiều nhánh rồi gộp lại.' },
      { h: 'Hệ thức mạch song song' },
      { ul: [
        'Hiệu điện thế như nhau: U = U₁ = U₂ = …',
        'Cường độ dòng điện cộng lại: I = I₁ + I₂ + …',
        'Nghịch đảo điện trở cộng lại: 1/R_tđ = 1/R₁ + 1/R₂ + …',
      ] },
      { h: 'Công thức nhanh cho hai điện trở song song' },
      { p: 'Khi chỉ có hai điện trở song song: R_tđ = R₁·R₂/(R₁ + R₂). Đặc biệt, hai điện trở bằng nhau song song thì R_tđ = R/2.' },
      { h: 'Nhận xét quan trọng' },
      { ul: [
        'Mạch nối tiếp: R_tđ luôn LỚN hơn mỗi điện trở thành phần.',
        'Mạch song song: R_tđ luôn NHỎ hơn mỗi điện trở thành phần.',
        'Trong mạch nối tiếp, điện trở lớn "chiếm" hiệu điện thế lớn.',
      ] },
      { h: 'Vì sao đồ dùng trong nhà mắc song song?' },
      { p: 'Các thiết bị điện trong gia đình mắc song song để mỗi thiết bị đều nhận đúng điện áp định mức 220 V và có thể bật/tắt độc lập mà không ảnh hưởng đến thiết bị khác.' },
      { note: 'Mẹo: dây nối tiếp như xếp hàng một (một thiết bị hỏng cả mạch hở); song song như nhiều cửa vào rạp (một cửa đóng vẫn còn cửa khác).' },
    ],
    [
      { q: 'R₁ = 4 Ω, R₂ = 6 Ω mắc nối tiếp. Tính điện trở tương đương.', a: 'R_tđ = R₁ + R₂ = 4 + 6 = 10 Ω.' },
      { q: 'R₁ = 6 Ω, R₂ = 3 Ω mắc song song. Tính điện trở tương đương.', a: 'R_tđ = R₁·R₂/(R₁+R₂) = 6·3/(6+3) = 18/9 = 2 Ω.' },
      { q: 'Hai điện trở R₁ = 10 Ω, R₂ = 15 Ω mắc nối tiếp vào U = 25 V. Tính dòng điện trong mạch và hiệu điện thế trên mỗi điện trở.', a: 'R_tđ = 10 + 15 = 25 Ω. I = U/R_tđ = 25/25 = 1 A. Vì nối tiếp nên I qua cả hai bằng 1 A: U₁ = I·R₁ = 10 V, U₂ = I·R₂ = 15 V (kiểm tra: 10 + 15 = 25 V ✓).' },
    ]
  ),

  'S9KHTN-w03-quiz': L(
    'Công suất điện',
    'Bóng đèn 100 W và bóng đèn 25 W khác nhau ở chỗ nào? Con số "oát" ghi trên thiết bị chính là công suất điện. Hôm nay ta tìm hiểu công suất cho biết điều gì và tính nó ra sao.',
    [
      'Nêu được ý nghĩa của công suất điện.',
      'Viết được các công thức tính công suất P = U·I = I²·R = U²/R.',
      'Đọc và hiểu số ghi trên thiết bị điện.',
    ],
    [
      { h: 'Công suất điện là gì?' },
      { p: 'Công suất điện của một đoạn mạch cho biết lượng điện năng mà đoạn mạch tiêu thụ trong mỗi giây. Công suất càng lớn, thiết bị "ngốn điện" càng nhanh.' },
      { h: 'Công thức tính công suất' },
      { p: 'P = U·I. Kết hợp với định luật Ohm (U = I·R) ta có thêm hai dạng: P = I²·R và P = U²/R.' },
      { h: 'Khi nào dùng dạng nào?' },
      { ul: [
        'Biết U và I: dùng P = U·I.',
        'Biết I và R: dùng P = I²·R.',
        'Biết U và R: dùng P = U²/R.',
      ] },
      { h: 'Đơn vị công suất' },
      { ul: [
        'Đơn vị chính: oát (W). 1 W = 1 V × 1 A.',
        '1 kW = 1000 W; 1 MW = 1 000 000 W.',
        'Mã lực (HP) đôi khi gặp: 1 HP ≈ 736 W.',
      ] },
      { h: 'Số ghi trên thiết bị điện' },
      { p: 'Trên mỗi thiết bị có ghi cặp số "điện áp định mức – công suất định mức", ví dụ "220 V – 100 W". Nghĩa là khi mắc vào đúng 220 V, đèn tiêu thụ công suất 100 W và sáng bình thường.' },
      { h: 'Công suất định mức và thực tế' },
      { ul: [
        'Mắc đúng định mức: thiết bị chạy chuẩn.',
        'Mắc dưới định mức: thiết bị chạy yếu (đèn mờ).',
        'Mắc vượt định mức: thiết bị dễ cháy, hỏng.',
      ] },
      { h: 'Tính điện trở của thiết bị từ số định mức' },
      { p: 'Từ P = U²/R suy ra R = U²/P. Đây là điện trở của thiết bị khi hoạt động bình thường ở điện áp định mức.' },
      { note: 'Bóng đèn 100 W tiêu thụ 100 J điện năng mỗi giây khi mắc đúng định mức — đó chính là ý nghĩa của "oát".' },
    ],
    [
      { q: 'Bóng đèn ghi 220 V – 60 W mắc đúng định mức. Tính dòng điện qua đèn và điện trở của đèn.', a: 'I = P/U = 60/220 ≈ 0,27 A. Điện trở: R = U²/P = 220²/60 = 48400/60 ≈ 807 Ω.' },
      { q: 'Một bếp điện hoạt động ở 220 V, dòng điện 5 A. Tính công suất của bếp.', a: 'P = U·I = 220·5 = 1100 W = 1,1 kW.' },
      { q: 'Hai bóng đèn cùng loại 220 V – 40 W. Khi mắc đúng định mức, tổng công suất hai bóng là bao nhiêu? Nếu thay bằng một bóng 220 V – 100 W thì bóng nào sáng hơn một bóng 40 W?', a: 'Hai bóng 40 W: tổng P = 80 W. Bóng 100 W sáng hơn bóng 40 W vì công suất lớn hơn ở cùng điện áp định mức.' },
    ]
  ),

  'S9KHTN-w04-quiz': L(
    'Điện năng — Công của dòng điện',
    'Cuối tháng nhà các em nhận hoá đơn tiền điện ghi bao nhiêu "số". Một "số điện" chính là 1 kWh điện năng. Hôm nay ta học cách tính điện năng tiêu thụ và hiểu chiếc hoá đơn ấy.',
    [
      'Nêu được điện năng là gì và mối liên hệ với công của dòng điện.',
      'Viết được công thức A = P·t và đổi đơn vị J ↔ kWh.',
      'Tính được điện năng và tiền điện tiêu thụ của thiết bị.',
    ],
    [
      { h: 'Điện năng và công của dòng điện' },
      { p: 'Điện năng là năng lượng của dòng điện. Khi dòng điện chạy qua thiết bị, nó sinh công và chuyển hoá điện năng thành các dạng năng lượng khác (nhiệt, ánh sáng, cơ năng). Công của dòng điện chính là điện năng tiêu thụ.' },
      { h: 'Công thức tính điện năng' },
      { p: 'A = P·t = U·I·t. Kết hợp định luật Ohm còn có: A = I²·R·t = (U²/R)·t.' },
      { h: 'Đơn vị điện năng' },
      { ul: [
        'Trong vật lý: jun (J). 1 J = 1 W × 1 s.',
        'Trong đời sống: kilôoát giờ (kWh). 1 số điện = 1 kWh.',
        'Quan hệ: 1 kWh = 1000 W × 3600 s = 3 600 000 J = 3,6 MJ.',
      ] },
      { h: 'Công tơ điện (đồng hồ điện)' },
      { p: 'Công tơ điện là dụng cụ đo điện năng tiêu thụ của gia đình, tính bằng kWh. Số chỉ của công tơ tăng dần theo lượng điện đã dùng; mỗi đơn vị tăng là 1 "số điện".' },
      { h: 'Sự chuyển hoá điện năng' },
      { ul: [
        'Bóng đèn: điện năng → ánh sáng + nhiệt.',
        'Quạt, máy bơm: điện năng → cơ năng + nhiệt.',
        'Bàn ủi, bếp điện: điện năng → nhiệt năng.',
        'Sạc pin: điện năng → hoá năng dự trữ.',
      ] },
      { h: 'Hiệu suất sử dụng điện' },
      { p: 'Không phải toàn bộ điện năng đều biến thành dạng năng lượng có ích; một phần luôn hao phí thành nhiệt. Hiệu suất H = A_có_ích/A_toàn_phần × 100%. Đèn LED có hiệu suất phát sáng cao hơn đèn sợi đốt nhiều lần.' },
      { h: 'Tính tiền điện' },
      { p: 'Tiền điện = số kWh tiêu thụ × đơn giá. Ở Việt Nam, giá điện sinh hoạt tính theo bậc thang: dùng càng nhiều, giá mỗi kWh ở bậc cao càng đắt — đây là cách khuyến khích tiết kiệm điện.' },
      { note: 'Đổi đơn vị thật cẩn thận: nếu công suất tính bằng W và thời gian bằng h thì chia 1000 để ra kWh.' },
    ],
    [
      { q: 'Tủ lạnh công suất 150 W chạy liên tục 24 giờ. Tính điện năng tiêu thụ theo kWh.', a: 'A = P·t = 150 W × 24 h = 3600 Wh = 3,6 kWh.' },
      { q: 'Máy lạnh 1000 W chạy 8 giờ mỗi ngày trong 30 ngày. Tính điện năng tiêu thụ.', a: 'A = P·t = 1 kW × 8 h × 30 = 240 kWh (tức 240 số điện).' },
      { q: 'Một gia đình dùng hết 250 kWh trong tháng. Với đơn giá trung bình 2000 đồng/kWh, tiền điện phải trả là bao nhiêu?', a: 'Tiền điện = 250 × 2000 = 500 000 đồng. (Thực tế tính theo bậc thang nên có thể cao hơn ở phần vượt định mức.)' },
    ]
  ),

  'S9KHTN-w05-quiz': L(
    'Định luật Joule-Lenz — Nhiệt lượng',
    'Vì sao dây tóc bóng đèn nóng đỏ mà dây nối thì không? Vì sao bàn ủi, bếp điện toả nhiệt? Tất cả nằm ở định luật Joule-Lenz — luật mô tả phần điện năng biến thành nhiệt trên dây dẫn.',
    [
      'Phát biểu và viết được định luật Joule-Lenz Q = I²·R·t.',
      'Giải thích tác dụng nhiệt của dòng điện trong thiết bị thực tế.',
      'Tính nhiệt lượng toả ra trên dây dẫn.',
    ],
    [
      { h: 'Tác dụng nhiệt của dòng điện' },
      { p: 'Khi dòng điện chạy qua một vật dẫn có điện trở, các electron va chạm với các nguyên tử làm vật nóng lên. Một phần (hoặc toàn bộ) điện năng chuyển thành nhiệt năng.' },
      { h: 'Định luật Joule-Lenz' },
      { p: 'Nhiệt lượng toả ra trên một đoạn dây dẫn tỉ lệ thuận với bình phương cường độ dòng điện, với điện trở của dây và với thời gian dòng điện chạy qua: Q = I²·R·t.' },
      { h: 'Đơn vị nhiệt lượng' },
      { ul: [
        'Q tính bằng jun (J) khi I (A), R (Ω), t (s).',
        'Đổi sang calo: 1 J ≈ 0,24 cal; hay Q (cal) = 0,24·I²·R·t.',
      ] },
      { h: 'Ý nghĩa của ba thừa số' },
      { ul: [
        'Q tỉ lệ với I²: tăng dòng gấp đôi thì nhiệt toả gấp bốn → không để dòng quá lớn.',
        'Q tỉ lệ với R: chỗ điện trở lớn toả nhiệt nhiều (dây tóc bóng đèn).',
        'Q tỉ lệ với t: dùng càng lâu nhiệt càng nhiều.',
      ] },
      { h: 'Vì sao dây tóc nóng sáng, dây nối thì không?' },
      { p: 'Dây tóc bóng đèn (vonfram) có điện trở rất lớn so với dây nối bằng đồng. Cùng một dòng điện, dây tóc toả nhiệt lớn hơn nhiều nên nóng tới hàng nghìn độ và phát sáng, còn dây nối hầu như không nóng.' },
      { h: 'Ứng dụng của tác dụng nhiệt' },
      { ul: [
        'Bàn ủi, bếp điện, lò sưởi, ấm siêu tốc, máy sấy tóc.',
        'Cầu chì: dây chì điện trở lớn nóng chảy khi quá tải, ngắt mạch bảo vệ.',
        'Bóng đèn sợi đốt: dây tóc nóng sáng.',
      ] },
      { h: 'Khi điện năng biến hoàn toàn thành nhiệt' },
      { p: 'Với các thiết bị chỉ toả nhiệt (bếp điện, bàn ủi), toàn bộ điện năng chuyển thành nhiệt nên A = Q, tức Q = U·I·t = P·t.' },
      { note: 'Đây là lý do tiết diện dây dẫn trong nhà phải đủ lớn: nếu dây nhỏ, điện trở lớn, dòng cao sẽ toả nhiều nhiệt và gây chập cháy.' },
    ],
    [
      { q: 'Dòng điện I = 2 A chạy qua điện trở R = 10 Ω trong t = 60 s. Tính nhiệt lượng toả ra.', a: 'Q = I²·R·t = 2²·10·60 = 4·10·60 = 2400 J.' },
      { q: 'Một bếp điện 220 V – 1000 W dùng đúng định mức trong 10 phút. Tính nhiệt lượng toả ra.', a: 'Đổi t = 10 phút = 600 s. Bếp chỉ toả nhiệt nên Q = P·t = 1000·600 = 600 000 J = 600 kJ.' },
      { q: 'Vì sao khi dùng nhiều thiết bị công suất lớn cùng lúc, dây điện trong nhà bị nóng?', a: 'Vì tổng dòng điện I tăng cao; theo Q = I²·R·t, nhiệt toả trên dây dẫn tăng theo bình phương dòng điện, dây nóng lên, dễ gây chập cháy nếu quá tải.' },
    ]
  ),

  'S9KHTN-w06-quiz': L(
    'Sử dụng điện an toàn và tiết kiệm',
    'Điện là người bạn rất hữu ích nhưng cũng có thể nguy hiểm chết người nếu dùng sai cách. Bài hôm nay cô trang bị cho các em kiến thức để dùng điện vừa an toàn vừa tiết kiệm.',
    [
      'Nêu được các nguy hiểm khi sử dụng điện.',
      'Trình bày được biện pháp an toàn điện và cách sơ cứu.',
      'Đề xuất biện pháp tiết kiệm điện trong gia đình.',
    ],
    [
      { h: 'Vì sao điện nguy hiểm?' },
      { p: 'Cơ thể người dẫn điện. Khi có dòng điện đủ lớn chạy qua, cơ co giật, có thể gây bỏng, ngừng thở, ngừng tim. Hiệu điện thế từ 40 V trở lên đã có thể nguy hiểm; điện lưới 220 V rất nguy hiểm.' },
      { h: 'Các tai nạn điện thường gặp' },
      { ul: [
        'Điện giật do chạm dây trần, ổ điện hở.',
        'Chập điện gây cháy nổ do dây quá tải, đoản mạch.',
        'Hỏng thiết bị do điện áp cao hoặc quá tải.',
      ] },
      { h: 'Thiết bị bảo vệ' },
      { ul: [
        'Cầu chì: dây chì nóng chảy ngắt mạch khi quá tải/ngắn mạch.',
        'Aptomat (CB): tự ngắt khi quá dòng, có thể bật lại.',
        'Cầu dao chống giật (RCBO/ELCB): ngắt mạch khi có dòng rò qua người.',
        'Dây nối đất cho vỏ kim loại của thiết bị.',
      ] },
      { h: 'Quy tắc an toàn điện' },
      { ul: [
        'Không chạm tay ướt vào ổ điện, thiết bị điện.',
        'Không cắm quá nhiều thiết bị vào một ổ.',
        'Ngắt nguồn trước khi sửa chữa, thay bóng đèn.',
        'Tránh xa dây điện đứt, cột điện khi trời mưa bão.',
      ] },
      { h: 'Sơ cứu người bị điện giật' },
      { ul: [
        'Bước 1: Nhanh chóng ngắt nguồn điện (cầu dao tổng).',
        'Bước 2: Nếu chưa ngắt được, dùng vật cách điện khô (gậy gỗ, nhựa) tách nạn nhân ra.',
        'Bước 3: Gọi cấp cứu 115, hô hấp nhân tạo nếu nạn nhân ngừng thở.',
      ] },
      { h: 'Tiết kiệm điện vì sao quan trọng?' },
      { p: 'Sản xuất điện phần lớn dùng nhiên liệu hoá thạch, gây ô nhiễm và phát thải khí nhà kính. Tiết kiệm điện giảm chi phí gia đình, giảm áp lực lên nguồn năng lượng và bảo vệ môi trường.' },
      { h: 'Biện pháp tiết kiệm điện' },
      { ul: [
        'Dùng đèn LED thay đèn sợi đốt (hiệu suất cao gấp nhiều lần).',
        'Tắt thiết bị và rút phích cắm khi không dùng.',
        'Chọn thiết bị có nhãn năng lượng nhiều sao.',
        'Để điều hoà ở 26–28 °C, tận dụng ánh sáng và gió tự nhiên.',
      ] },
      { note: 'Nguyên tắc số một khi gặp người bị điện giật: NGẮT NGUỒN TRƯỚC, đừng lao vào kéo nạn nhân bằng tay không kẻo chính mình cũng bị giật.' },
    ],
    [
      { q: 'Thấy một người bị điện giật đang dính vào dây điện, em phải làm gì đầu tiên?', a: 'Ngắt nguồn điện ngay (cầu dao/aptomat tổng). Nếu không ngắt được thì dùng vật cách điện khô (gậy gỗ, đòn nhựa) gạt dây/tách nạn nhân ra, tuyệt đối không chạm tay trần vào nạn nhân, rồi gọi cấp cứu 115.' },
      { q: 'Vì sao đèn LED tiết kiệm điện hơn đèn sợi đốt?', a: 'Đèn LED biến phần lớn điện năng thành ánh sáng (hiệu suất cao ~80–90%), còn đèn sợi đốt biến phần lớn điện năng thành nhiệt (chỉ ~5–10% thành ánh sáng). Cùng độ sáng, LED tốn ít điện hơn nhiều.' },
      { q: 'Tác dụng của dây nối đất ở vỏ kim loại máy giặt, tủ lạnh là gì?', a: 'Khi vỏ thiết bị bị rò điện, dòng điện sẽ theo dây nối đất đi xuống đất thay vì qua người chạm vào, đồng thời làm aptomat/cầu dao chống giật ngắt mạch — bảo vệ người dùng khỏi bị điện giật.' },
    ]
  ),

  'S9KHTN-w07-quiz': L(
    'Từ trường và nam châm',
    'Chiếc la bàn luôn chỉ hướng Bắc – Nam, nam châm hút được đinh sắt — đó là biểu hiện của từ tính. Hôm nay ta bước vào phần điện từ, bắt đầu với nam châm và từ trường.',
    [
      'Nêu được tính chất của nam châm và sự tương tác giữa hai nam châm.',
      'Hiểu khái niệm từ trường và đường sức từ.',
      'Giải thích được hoạt động của la bàn dựa trên từ trường Trái Đất.',
    ],
    [
      { h: 'Nam châm và hai cực từ' },
      { p: 'Mỗi nam châm có hai cực: cực Bắc (N) và cực Nam (S). Từ tính tập trung mạnh nhất ở hai cực; ở giữa nam châm hầu như không hút sắt.' },
      { h: 'Tương tác giữa hai nam châm' },
      { ul: [
        'Hai cực cùng tên (N–N hoặc S–S): đẩy nhau.',
        'Hai cực khác tên (N–S): hút nhau.',
      ] },
      { h: 'Vật liệu từ' },
      { ul: [
        'Sắt, thép, niken, coban bị nam châm hút (vật liệu từ).',
        'Đồng, nhôm, nhựa, gỗ không bị nam châm hút.',
        'Thép giữ được từ tính lâu (làm nam châm vĩnh cửu); sắt non chỉ nhiễm từ tạm thời.',
      ] },
      { h: 'Từ trường là gì?' },
      { p: 'Từ trường là không gian xung quanh nam châm (hoặc dòng điện) mà ở đó có lực từ tác dụng lên kim nam châm hoặc vật liệu từ khác. Ta không nhìn thấy từ trường nhưng có thể phát hiện bằng kim nam châm.' },
      { h: 'Đường sức từ' },
      { ul: [
        'Là những đường vẽ để mô tả từ trường.',
        'Bên ngoài nam châm: đi ra từ cực Bắc (N), đi vào cực Nam (S).',
        'Là những đường cong khép kín.',
        'Nơi đường sức dày → từ trường mạnh; nơi thưa → từ trường yếu.',
      ] },
      { h: 'Phát hiện từ trường bằng mạt sắt' },
      { p: 'Rắc mạt sắt lên tấm bìa đặt trên nam châm rồi gõ nhẹ, các mạt sắt sắp xếp thành những đường cong — đó là hình ảnh của đường sức từ (gọi là từ phổ).' },
      { h: 'Trái Đất là một nam châm khổng lồ' },
      { p: 'Trái Đất có từ trường riêng. Kim nam châm tự do luôn định hướng Bắc – Nam vì chịu tác dụng của từ trường Trái Đất. Lưu ý: cực Bắc địa lí của Trái Đất lại gần với cực Nam từ.' },
      { note: 'Người Trung Hoa cổ đại đã dùng la bàn để định hướng từ hàng nghìn năm trước — một ứng dụng lâu đời của từ trường.' },
    ],
    [
      { q: 'Đưa hai cực Bắc (N) của hai nam châm lại gần nhau thì hiện tượng gì xảy ra?', a: 'Hai cực cùng tên đẩy nhau, nên hai nam châm đẩy nhau, ta phải dùng lực mới ép sát chúng lại được.' },
      { q: 'Vì sao kim la bàn luôn chỉ hướng Bắc – Nam?', a: 'Kim la bàn là một nam châm nhỏ tự do quay. Nó chịu tác dụng của từ trường Trái Đất nên định hướng theo trục Bắc – Nam từ, giúp con người xác định phương hướng.' },
      { q: 'Làm thế nào để kiểm tra một thanh kim loại có phải là nam châm hay không, chỉ với một chiếc kim nam châm?', a: 'Đưa hai đầu thanh kim loại lần lượt lại gần kim nam châm. Nếu một đầu hút và đầu kia đẩy một cực của kim nam châm thì thanh đó là nam châm. Nếu cả hai đầu đều hút (không có đẩy) thì đó chỉ là vật liệu từ (sắt, thép) chưa nhiễm từ.' },
    ]
  ),

  'S9KHTN-w08-quiz': L(
    'Từ trường của dòng điện',
    'Năm 1820, Oersted tình cờ phát hiện kim nam châm lệch đi khi đặt gần dây có dòng điện — điện và từ hoá ra là "anh em". Hôm nay ta tìm hiểu từ trường do dòng điện sinh ra và nam châm điện.',
    [
      'Nêu được dòng điện sinh ra từ trường (thí nghiệm Oersted).',
      'Áp dụng quy tắc nắm tay phải xác định chiều đường sức từ.',
      'Hiểu cấu tạo và ứng dụng của nam châm điện.',
    ],
    [
      { h: 'Thí nghiệm Oersted' },
      { p: 'Khi cho dòng điện chạy qua một dây dẫn đặt song song trên kim nam châm, kim nam châm bị lệch đi. Điều này chứng tỏ dòng điện sinh ra từ trường — mở ra ngành điện từ học.' },
      { h: 'Từ trường của dây dẫn thẳng' },
      { p: 'Dòng điện chạy qua dây dẫn thẳng tạo ra từ trường có đường sức là những đường tròn đồng tâm nằm trong mặt phẳng vuông góc với dây, tâm là điểm dây cắt mặt phẳng.' },
      { h: 'Quy tắc nắm tay phải (dây thẳng)' },
      { p: 'Nắm bàn tay phải sao cho ngón cái choãi ra chỉ chiều dòng điện trong dây, thì bốn ngón còn lại khum lại chỉ chiều đường sức từ bao quanh dây.' },
      { h: 'Từ trường của ống dây (solenoid)' },
      { p: 'Khi cuộn dây dẫn nhiều vòng và cho dòng điện chạy qua, ống dây tạo ra từ trường giống hệt một nam châm thẳng: một đầu là cực Bắc, đầu kia là cực Nam.' },
      { h: 'Quy tắc nắm tay phải (ống dây)' },
      { p: 'Nắm ống dây bằng tay phải, bốn ngón tay khum theo chiều dòng điện trong các vòng dây thì ngón cái choãi ra chỉ chiều của đường sức từ trong lòng ống — tức chỉ về cực Bắc của ống dây.' },
      { h: 'Nam châm điện' },
      { ul: [
        'Cấu tạo: ống dây quấn quanh lõi sắt non.',
        'Khi có dòng điện, lõi sắt nhiễm từ mạnh → hút sắt thép.',
        'Ngắt dòng điện, từ tính mất gần như ngay lập tức.',
      ] },
      { h: 'Cách tăng lực từ của nam châm điện' },
      { ul: [
        'Tăng cường độ dòng điện qua ống dây.',
        'Tăng số vòng dây của ống dây.',
        'Dùng lõi sắt non thay vì lõi không khí.',
      ] },
      { note: 'Ưu điểm lớn của nam châm điện: bật/tắt được và điều chỉnh được độ mạnh — điều mà nam châm vĩnh cửu không làm được.' },
    ],
    [
      { q: 'Vì sao dùng nam châm điện thuận tiện hơn nam châm vĩnh cửu trong nhiều thiết bị?', a: 'Vì có thể bật/tắt từ tính bằng cách đóng/ngắt dòng điện, và điều chỉnh độ mạnh bằng cách thay đổi cường độ dòng điện hoặc số vòng dây — rất linh hoạt.' },
      { q: 'Nêu vài ứng dụng của nam châm điện trong đời sống.', a: 'Cần cẩu điện hút sắt thép ở bãi phế liệu, chuông điện, rơ-le điện, loa, micro, động cơ điện, ổ cứng máy tính.' },
      { q: 'Một ống dây có dòng điện. Làm thế nào xác định cực Bắc của ống dây?', a: 'Dùng quy tắc nắm tay phải: nắm ống dây bằng tay phải, bốn ngón khum theo chiều dòng điện trong các vòng dây, ngón cái choãi ra chỉ về phía cực Bắc của ống dây.' },
    ]
  ),

  'S9KHTN-w09-quiz': L(
    'Lực điện từ — Quy tắc bàn tay trái',
    'Dòng điện sinh ra từ trường, vậy điều ngược lại có xảy ra không? Khi đặt dây có dòng điện vào từ trường, nó bị đẩy — đó là lực điện từ, cơ sở của mọi động cơ điện quay rần rật quanh ta.',
    [
      'Nêu được lực điện từ tác dụng lên dây dẫn có dòng điện đặt trong từ trường.',
      'Áp dụng quy tắc bàn tay trái xác định chiều lực điện từ.',
      'Hiểu nguyên lí hoạt động của động cơ điện một chiều.',
    ],
    [
      { h: 'Lực điện từ là gì?' },
      { p: 'Khi một dây dẫn có dòng điện được đặt trong từ trường và không song song với đường sức từ, dây dẫn sẽ chịu một lực tác dụng. Lực đó gọi là lực điện từ.' },
      { h: 'Quy tắc bàn tay trái' },
      { p: 'Đặt bàn tay trái sao cho các đường sức từ hướng vào lòng bàn tay, chiều từ cổ tay đến ngón tay giữa chỉ chiều dòng điện, thì ngón cái choãi ra 90° chỉ chiều của lực điện từ.' },
      { h: 'Lực phụ thuộc vào gì?' },
      { ul: [
        'Cường độ dòng điện trong dây dẫn.',
        'Độ mạnh của từ trường.',
        'Chiều dài dây dẫn nằm trong từ trường.',
        'Góc giữa dây và đường sức (vuông góc thì lực lớn nhất).',
      ] },
      { h: 'Nguyên lí động cơ điện một chiều' },
      { p: 'Đặt một khung dây có dòng điện trong từ trường của nam châm. Hai cạnh đối diện của khung chịu lực điện từ ngược chiều nhau tạo thành ngẫu lực làm khung quay. Đó là nguyên lí biến điện năng thành cơ năng.' },
      { h: 'Vai trò của cổ góp (bộ chỉnh lưu)' },
      { p: 'Để khung dây quay liên tục theo một chiều, cần đổi chiều dòng điện trong khung mỗi nửa vòng. Bộ phận làm việc này là cổ góp và chổi quét — đảm bảo lực luôn đẩy khung quay đúng chiều.' },
      { h: 'Cấu tạo động cơ điện một chiều' },
      { ul: [
        'Stato: nam châm tạo từ trường (đứng yên).',
        'Roto: khung dây quay mang dòng điện.',
        'Cổ góp và chổi than: đổi chiều dòng điện.',
      ] },
      { h: 'Ứng dụng' },
      { ul: [
        'Quạt điện, máy bơm, máy xay, máy khoan.',
        'Đồ chơi điện, xe điện, robot.',
        'Loa (biến tín hiệu điện thành dao động màng loa).',
      ] },
      { note: 'Động cơ điện và máy phát điện là "anh em ngược nhau": động cơ biến điện thành cơ; máy phát biến cơ thành điện.' },
    ],
    [
      { q: 'Một dây dẫn nằm ngang có dòng điện chạy từ trái sang phải, đặt trong từ trường hướng từ ngoài vào trong trang giấy. Lực điện từ hướng theo phương nào?', a: 'Áp dụng quy tắc bàn tay trái: đường sức từ đâm vào lòng bàn tay, bốn ngón chỉ chiều dòng điện (trái sang phải) → ngón cái choãi ra chỉ lực hướng xuống dưới.' },
      { q: 'Nêu vài ứng dụng của lực điện từ.', a: 'Động cơ điện (quạt, máy bơm, xe điện), loa điện, đồng hồ đo điện kiểu kim, máy phát điện (theo nguyên lí liên quan).' },
      { q: 'Vì sao động cơ điện một chiều cần bộ cổ góp?', a: 'Vì nếu dòng điện trong khung không đổi chiều, sau nửa vòng quay lực điện từ sẽ làm khung quay ngược lại và dừng dao động quanh vị trí cân bằng. Cổ góp đổi chiều dòng điện mỗi nửa vòng để lực luôn đẩy khung quay liên tục theo một chiều.' },
    ]
  ),

  'S9KHTN-w10-quiz': L(
    'Hiện tượng cảm ứng điện từ',
    'Faraday đặt câu hỏi ngược: nếu điện sinh ra từ, thì từ có sinh ra điện không? Năm 1831 ông tìm ra câu trả lời — hiện tượng cảm ứng điện từ, nền tảng của mọi nhà máy điện ngày nay.',
    [
      'Mô tả được hiện tượng cảm ứng điện từ.',
      'Nêu điều kiện xuất hiện dòng điện cảm ứng.',
      'Hiểu nguyên lí hoạt động của máy phát điện.',
    ],
    [
      { h: 'Từ thông' },
      { p: 'Từ thông qua một cuộn dây thể hiện "lượng" đường sức từ xuyên qua cuộn dây. Từ thông thay đổi khi số đường sức xuyên qua cuộn dây thay đổi.' },
      { h: 'Hiện tượng cảm ứng điện từ' },
      { p: 'Khi từ thông qua một cuộn dây dẫn kín biến thiên (thay đổi), trong cuộn dây xuất hiện một dòng điện. Dòng điện đó gọi là dòng điện cảm ứng, và hiện tượng đó gọi là hiện tượng cảm ứng điện từ.' },
      { h: 'Điều kiện xuất hiện dòng cảm ứng' },
      { p: 'Điều kiện duy nhất là từ thông qua cuộn dây phải biến thiên. Nếu từ thông đứng yên (không đổi) thì không có dòng cảm ứng, dù từ trường mạnh đến đâu.' },
      { h: 'Các cách tạo dòng điện cảm ứng' },
      { ul: [
        'Đưa nam châm lại gần hoặc ra xa cuộn dây.',
        'Đưa cuộn dây lại gần hoặc ra xa nam châm.',
        'Quay cuộn dây trong từ trường (hoặc quay nam châm).',
        'Đóng/ngắt hoặc thay đổi dòng điện ở cuộn dây đặt gần.',
      ] },
      { h: 'Dòng điện xoay chiều (AC)' },
      { p: 'Khi cho cuộn dây quay đều trong từ trường, dòng điện cảm ứng liên tục đổi chiều — đó là dòng điện xoay chiều. Điện lưới 220 V trong nhà là dòng xoay chiều tần số 50 Hz (đổi chiều 100 lần mỗi giây).' },
      { h: 'Nguyên lí máy phát điện' },
      { p: 'Máy phát điện gồm nam châm và cuộn dây; cho một trong hai bộ phận quay làm từ thông qua cuộn dây biến thiên, sinh ra dòng điện cảm ứng. Nguồn năng lượng làm quay có thể là nước (thuỷ điện), hơi nước (nhiệt điện), gió (điện gió).' },
      { h: 'Cấu tạo máy phát điện' },
      { ul: [
        'Phần cảm: nam châm tạo từ trường.',
        'Phần ứng: cuộn dây nơi sinh dòng cảm ứng.',
        'Một trong hai phần quay (roto), phần kia đứng yên (stato).',
      ] },
      { note: 'Mọi nhà máy điện (trừ pin và pin mặt trời) đều dựa trên hiện tượng cảm ứng điện từ của Faraday.' },
    ],
    [
      { q: 'Làm thế nào tạo ra dòng điện trong máy phát điện?', a: 'Cho cuộn dây quay trong từ trường (hoặc cho nam châm quay gần cuộn dây) để từ thông qua cuộn dây biến thiên liên tục → sinh dòng điện cảm ứng.' },
      { q: 'Vì sao đèn xe đạp loại đi-na-mô sáng được mà không cần pin?', a: 'Đi-na-mô là một máy phát điện nhỏ. Khi bánh xe quay, nó làm nam châm trong đi-na-mô quay, từ thông qua cuộn dây biến thiên, sinh ra dòng điện cảm ứng thắp sáng đèn. Xe chạy càng nhanh, đèn càng sáng.' },
      { q: 'Đặt một nam châm đứng yên trong lòng cuộn dây kín, có dòng điện cảm ứng không? Vì sao?', a: 'Không có dòng cảm ứng, vì từ thông qua cuộn dây không thay đổi (nam châm đứng yên). Chỉ khi nam châm chuyển động (lại gần hoặc ra xa) làm từ thông biến thiên thì mới có dòng điện cảm ứng.' },
    ]
  ),

  'S9KHTN-w11-quiz': L(
    'Máy biến áp',
    'Điện từ nhà máy được "đẩy" lên hàng trăm nghìn vôn để truyền đi xa, rồi lại "hạ" xuống 220 V trước khi vào nhà. Thiết bị làm việc thần kì đó là máy biến áp. Hôm nay ta tìm hiểu nó hoạt động ra sao.',
    [
      'Nêu được cấu tạo và nguyên lí hoạt động của máy biến áp.',
      'Viết và vận dụng công thức U₁/U₂ = N₁/N₂.',
      'Giải thích vì sao truyền tải điện đi xa dùng điện áp cao.',
    ],
    [
      { h: 'Công dụng máy biến áp' },
      { p: 'Máy biến áp dùng để tăng hoặc giảm hiệu điện thế của dòng điện xoay chiều, giữ nguyên tần số. Đây là thiết bị then chốt trong hệ thống truyền tải và phân phối điện.' },
      { h: 'Cấu tạo' },
      { ul: [
        'Lõi sắt (thép kĩ thuật điện ghép từ nhiều lá mỏng cách điện).',
        'Cuộn sơ cấp N₁ vòng (nối với nguồn vào).',
        'Cuộn thứ cấp N₂ vòng (nối với tải ra).',
      ] },
      { h: 'Nguyên lí hoạt động' },
      { p: 'Dòng xoay chiều ở cuộn sơ cấp tạo từ thông biến thiên trong lõi sắt. Từ thông này xuyên qua cuộn thứ cấp, theo hiện tượng cảm ứng điện từ, sinh ra dòng điện xoay chiều ở cuộn thứ cấp.' },
      { h: 'Công thức máy biến áp' },
      { p: 'U₁/U₂ = N₁/N₂. Tỉ số hiệu điện thế bằng tỉ số số vòng dây của hai cuộn.' },
      { h: 'Máy tăng áp và giảm áp' },
      { ul: [
        'N₂ > N₁ → U₂ > U₁: máy tăng áp.',
        'N₂ < N₁ → U₂ < U₁: máy giảm áp.',
        'N₂ = N₁ → U₂ = U₁: máy cách li.',
      ] },
      { h: 'Vì sao chỉ hoạt động với điện xoay chiều?' },
      { p: 'Máy biến áp cần từ thông BIẾN THIÊN để gây cảm ứng. Dòng một chiều (DC) tạo từ thông không đổi nên không sinh dòng ở cuộn thứ cấp — máy biến áp không dùng được với DC.' },
      { h: 'Hao phí khi truyền tải điện' },
      { p: 'Trên đường dây có điện trở R, công suất hao phí P_hp = I²·R. Vì I = P/U nên P_hp = P²·R/U². Tăng điện áp U lên n lần thì hao phí giảm n² lần — đó là lí do dùng điện áp rất cao để truyền tải đi xa.' },
      { note: 'Đường dây 500 kV Bắc – Nam của Việt Nam dùng điện áp siêu cao chính để giảm hao phí khi truyền điện đi cả nghìn km.' },
    ],
    [
      { q: 'Máy biến áp có N₁ = 1000 vòng, N₂ = 100 vòng, đặt U₁ = 220 V vào cuộn sơ cấp. Tính U₂.', a: 'U₂ = U₁·N₂/N₁ = 220·100/1000 = 22 V. Vì N₂ < N₁ nên đây là máy giảm áp.' },
      { q: 'Cần biến điện 220 V thành 12 V cho một thiết bị. Nếu cuộn sơ cấp có 1100 vòng thì cuộn thứ cấp cần bao nhiêu vòng?', a: 'Từ U₁/U₂ = N₁/N₂ → N₂ = N₁·U₂/U₁ = 1100·12/220 = 60 vòng.' },
      { q: 'Vì sao truyền tải điện năng đi xa người ta phải dùng điện áp cao?', a: 'Vì công suất hao phí trên đường dây P_hp = P²·R/U². Khi tăng điện áp U, dòng điện I = P/U giảm, nên hao phí do toả nhiệt trên dây giảm theo bình phương U. Đến nơi tiêu thụ lại dùng máy biến áp hạ xuống 220 V để dùng an toàn.' },
    ]
  ),

  'S9KHTN-w12-quiz': L(
    'Ánh sáng — Khúc xạ',
    'Cắm chiếc đũa vào cốc nước, ta thấy nó như bị "gãy" ở mặt nước. Đáy bể bơi trông cạn hơn thực tế. Tất cả là do ánh sáng bị bẻ cong khi đổi môi trường — hiện tượng khúc xạ.',
    [
      'Mô tả được hiện tượng khúc xạ ánh sáng.',
      'Phát biểu được định luật khúc xạ ánh sáng.',
      'Vận dụng giải thích các hiện tượng tự nhiên liên quan.',
    ],
    [
      { h: 'Hiện tượng khúc xạ ánh sáng' },
      { p: 'Khi tia sáng truyền xiên góc từ môi trường trong suốt này sang môi trường trong suốt khác (ví dụ từ không khí vào nước), tia sáng bị gãy khúc ở mặt phân cách. Đó là hiện tượng khúc xạ.' },
      { h: 'Các khái niệm cần nhớ' },
      { ul: [
        'Tia tới: tia sáng đi đến mặt phân cách.',
        'Tia khúc xạ: tia sáng đi tiếp vào môi trường thứ hai.',
        'Pháp tuyến: đường vuông góc với mặt phân cách tại điểm tới.',
        'Góc tới i: giữa tia tới và pháp tuyến. Góc khúc xạ r: giữa tia khúc xạ và pháp tuyến.',
      ] },
      { h: 'Định luật khúc xạ ánh sáng' },
      { p: 'Tia khúc xạ nằm trong mặt phẳng tới và ở phía bên kia pháp tuyến so với tia tới. Tỉ số sin góc tới và sin góc khúc xạ là hằng số: sin i / sin r = n (chiết suất tương đối).' },
      { h: 'Đi từ môi trường này sang môi trường khác' },
      { ul: [
        'Từ loãng sang đặc (không khí → nước): tia gãy gần pháp tuyến, r < i.',
        'Từ đặc sang loãng (nước → không khí): tia gãy xa pháp tuyến, r > i.',
        'Tia tới vuông góc mặt phân cách (i = 0): truyền thẳng, không gãy.',
      ] },
      { h: 'Chiết suất' },
      { p: 'Chiết suất cho biết mức độ ánh sáng bị "chậm lại" và bẻ cong trong môi trường. Chiết suất nước ≈ 1,33; thuỷ tinh ≈ 1,5; kim cương ≈ 2,42. Chiết suất càng lớn, ánh sáng bị bẻ càng nhiều.' },
      { h: 'Phản xạ toàn phần (mở rộng)' },
      { p: 'Khi ánh sáng đi từ môi trường đặc sang loãng với góc tới đủ lớn, tia sáng không khúc xạ ra ngoài mà phản xạ toàn bộ trở lại. Hiện tượng này được ứng dụng trong cáp quang truyền tín hiệu.' },
      { h: 'Ứng dụng và hiện tượng tự nhiên' },
      { ul: [
        'Cầu vồng: ánh sáng Mặt Trời khúc xạ và tán sắc qua giọt nước mưa.',
        'Ảo ảnh trên đường nóng (giống vũng nước) do khúc xạ qua các lớp không khí nóng – lạnh.',
        'Cáp quang truyền internet nhờ phản xạ toàn phần.',
      ] },
      { note: 'Khi câu cá hay đâm cá dưới nước, phải nhắm thấp hơn vị trí nhìn thấy, vì khúc xạ làm cá trông cao hơn vị trí thật.' },
    ],
    [
      { q: 'Vì sao chiếc đũa cắm nghiêng vào cốc nước trông như bị gãy ở mặt nước?', a: 'Vì ánh sáng từ phần đũa dưới nước truyền lên, khi qua mặt nước (nước → không khí) bị khúc xạ, đổi hướng. Mắt ta nhìn theo tia khúc xạ nên thấy phần đũa dưới nước lệch đi so với phần trên, tạo cảm giác đũa bị gãy khúc.' },
      { q: 'Tia sáng truyền từ không khí vào nước với góc tới i = 30°. Góc khúc xạ r lớn hơn hay nhỏ hơn 30°? Vì sao?', a: 'r < 30°. Vì ánh sáng đi từ môi trường loãng (không khí) sang môi trường đặc hơn (nước, chiết suất lớn hơn), tia khúc xạ gãy lại gần pháp tuyến hơn, nên góc khúc xạ nhỏ hơn góc tới.' },
      { q: 'Vì sao nhìn xuống bể bơi đầy nước, ta thấy đáy bể như cạn hơn so với độ sâu thật?', a: 'Vì các tia sáng từ đáy bể đi lên, khi ra khỏi mặt nước bị khúc xạ ra xa pháp tuyến. Mắt nhìn theo phương tia ló nên thấy ảnh của đáy bể nâng lên cao hơn vị trí thật, khiến bể trông nông hơn thực tế.' },
    ]
  ),

  'S9KHTN-w13-quiz': L(
    'Thấu kính hội tụ và phân kỳ',
    'Kính lúp giúp đọc chữ nhỏ, máy ảnh ghi lại khoảnh khắc, kính cận giúp nhìn rõ — tất cả nhờ thấu kính. Hôm nay ta phân biệt hai loại thấu kính và học cách vẽ ảnh qua chúng.',
    [
      'Phân biệt thấu kính hội tụ và thấu kính phân kì.',
      'Nêu được đường truyền của các tia sáng đặc biệt.',
      'Dựng được ảnh của vật qua thấu kính hội tụ.',
    ],
    [
      { h: 'Thấu kính là gì?' },
      { p: 'Thấu kính là một khối chất trong suốt (thuỷ tinh, nhựa) giới hạn bởi hai mặt cong, hoặc một mặt cong một mặt phẳng. Có hai loại chính: hội tụ và phân kì.' },
      { h: 'Thấu kính hội tụ' },
      { ul: [
        'Phần rìa mỏng hơn phần giữa (lồi).',
        'Tiêu cự f > 0.',
        'Biến chùm tia song song thành chùm hội tụ tại tiêu điểm F.',
      ] },
      { h: 'Thấu kính phân kì' },
      { ul: [
        'Phần rìa dày hơn phần giữa (lõm).',
        'Tiêu cự f < 0.',
        'Biến chùm tia song song thành chùm phân kì (đường kéo dài gặp nhau tại tiêu điểm ảo F).',
      ] },
      { h: 'Các yếu tố của thấu kính' },
      { ul: [
        'Quang tâm O: điểm chính giữa thấu kính, tia qua O truyền thẳng.',
        'Trục chính: đường thẳng qua O, vuông góc với thấu kính.',
        'Tiêu điểm F, F\': nằm trên trục chính, đối xứng qua O.',
        'Tiêu cự f: khoảng cách từ O đến F.',
      ] },
      { h: 'Ba tia sáng đặc biệt qua thấu kính hội tụ' },
      { ul: [
        'Tia qua quang tâm O: truyền thẳng, không đổi hướng.',
        'Tia song song trục chính: ló ra đi qua tiêu điểm F.',
        'Tia qua tiêu điểm F: ló ra song song trục chính.',
      ] },
      { h: 'Công thức thấu kính' },
      { p: 'Liên hệ vị trí vật d, ảnh d\' và tiêu cự f: 1/f = 1/d + 1/d\'. Độ phóng đại: k = d\'/d (cho biết ảnh lớn gấp mấy lần vật).' },
      { h: 'Tính chất ảnh qua thấu kính hội tụ' },
      { ul: [
        'Vật ngoài 2f (d > 2f): ảnh thật, ngược chiều, nhỏ hơn vật.',
        'Vật trong khoảng f đến 2f: ảnh thật, ngược chiều, lớn hơn vật.',
        'Vật trong tiêu cự (d < f): ảnh ảo, cùng chiều, lớn hơn vật (nguyên lí kính lúp).',
      ] },
      { note: 'Muốn dựng ảnh, chỉ cần vẽ 2 trong 3 tia đặc biệt; giao điểm của hai tia ló (hoặc đường kéo dài) cho vị trí ảnh.' },
    ],
    [
      { q: 'Phân biệt thấu kính hội tụ và thấu kính phân kì bằng cảm giác cầm tay (sờ).', a: 'Thấu kính hội tụ có phần giữa dày, rìa mỏng (mặt lồi). Thấu kính phân kì có phần giữa mỏng, rìa dày (mặt lõm). Ngoài ra, đặt thấu kính hội tụ gần dòng chữ rồi đưa ra xa thì chữ phóng to rồi đảo ngược; thấu kính phân kì luôn cho chữ nhỏ lại.' },
      { q: 'Một thấu kính hội tụ có tiêu cự f = 10 cm. Vật đặt cách thấu kính d = 30 cm. Xác định vị trí và tính chất ảnh.', a: 'Vì d = 30 cm > 2f = 20 cm nên ảnh thật, ngược chiều, nhỏ hơn vật. Tính: 1/f = 1/d + 1/d\' → 1/10 = 1/30 + 1/d\' → 1/d\' = 1/10 − 1/30 = 2/30 → d\' = 15 cm. Ảnh cách thấu kính 15 cm.' },
      { q: 'Vì sao kính lúp giúp nhìn vật to hơn?', a: 'Kính lúp là thấu kính hội tụ tiêu cự ngắn. Khi đặt vật trong khoảng tiêu cự (d < f), thấu kính cho ảnh ảo cùng chiều và lớn hơn vật, nên ta nhìn thấy vật được phóng to.' },
    ]
  ),

  'S9KHTN-w14-quiz': L(
    'Mắt và các tật của mắt',
    'Mắt là chiếc "máy ảnh sống" kì diệu của cơ thể. Nhưng nhiều bạn học sinh ngày nay bị cận thị do nhìn màn hình quá nhiều. Hôm nay ta tìm hiểu mắt hoạt động ra sao và làm sao bảo vệ đôi mắt.',
    [
      'Nêu được cấu tạo quang học của mắt và sự điều tiết.',
      'Phân biệt được các tật của mắt và cách khắc phục.',
      'Biết cách giữ gìn, bảo vệ mắt.',
    ],
    [
      { h: 'Mắt như một máy ảnh' },
      { p: 'Về phương diện quang học, mắt giống một máy ảnh: thể thuỷ tinh đóng vai trò thấu kính hội tụ, màng lưới (võng mạc) đóng vai trò màn hứng ảnh. Ảnh của vật trên võng mạc là ảnh thật, ngược chiều, nhỏ hơn vật.' },
      { h: 'Cấu tạo cơ bản của mắt' },
      { ul: [
        'Giác mạc và thể thuỷ tinh: hệ thấu kính hội tụ.',
        'Màng lưới (võng mạc): nơi ảnh hiện rõ, có tế bào thụ cảm ánh sáng.',
        'Cơ vòng (cơ thể mi): điều chỉnh độ cong của thể thuỷ tinh.',
        'Con ngươi: điều chỉnh lượng ánh sáng vào mắt.',
      ] },
      { h: 'Sự điều tiết của mắt' },
      { p: 'Để nhìn rõ vật ở mọi khoảng cách, mắt thay đổi độ cong (do đó thay đổi tiêu cự) của thể thuỷ tinh nhờ cơ thể mi, sao cho ảnh luôn hiện rõ trên màng lưới. Quá trình này gọi là sự điều tiết.' },
      { h: 'Điểm cực cận và điểm cực viễn' },
      { ul: [
        'Điểm cực viễn (Cv): điểm xa nhất mắt nhìn rõ khi không điều tiết (mắt thường: vô cực).',
        'Điểm cực cận (Cc): điểm gần nhất mắt nhìn rõ khi điều tiết tối đa (~25 cm với mắt thường).',
      ] },
      { h: 'Tật cận thị' },
      { ul: [
        'Chỉ nhìn rõ vật ở gần, không nhìn rõ vật ở xa.',
        'Ảnh hiện trước màng lưới.',
        'Khắc phục bằng kính phân kì (tiêu cự âm).',
      ] },
      { h: 'Tật viễn thị và lão thị' },
      { ul: [
        'Viễn thị: nhìn rõ vật xa, không rõ vật gần; ảnh hiện sau màng lưới; khắc phục bằng kính hội tụ.',
        'Lão thị: do tuổi cao, thể thuỷ tinh kém điều tiết; khắc phục bằng kính hội tụ.',
        'Loạn thị: giác mạc không đều; khắc phục bằng kính loạn (trụ).',
      ] },
      { h: 'Bảo vệ mắt' },
      { ul: [
        'Học, đọc nơi đủ ánh sáng, giữ khoảng cách 30–40 cm.',
        'Hạn chế thời gian nhìn màn hình, nghỉ mắt 20 phút một lần.',
        'Ngồi học đúng tư thế, không nằm đọc.',
        'Ăn đủ vitamin A (cà rốt, gan, rau xanh).',
      ] },
      { note: 'Tật cận thị học đường đang gia tăng nhanh do dùng điện thoại, máy tính quá nhiều — hãy cho mắt nghỉ ngơi và ra ngoài trời thường xuyên!' },
    ],
    [
      { q: 'Người cận thị phải đeo kính loại gì? Vì sao?', a: 'Đeo kính phân kì (kính có tiêu cự âm). Vì mắt cận có ảnh hiện trước màng lưới; kính phân kì làm các tia sáng phân kì bớt lại, dịch ảnh ra đúng màng lưới nên nhìn rõ vật ở xa.' },
      { q: 'Vì sao khi nhìn vật ở gần lâu, mắt dễ mỏi?', a: 'Vì khi nhìn gần, cơ thể mi phải co lại nhiều để tăng độ cong thể thuỷ tinh (điều tiết mạnh). Giữ trạng thái co cơ lâu khiến cơ mỏi, gây hiện tượng mỏi mắt, nhức mắt.' },
      { q: 'Em hãy nêu 3 việc làm cụ thể để bảo vệ mắt khi học online nhiều giờ.', a: '1) Áp dụng quy tắc 20-20-20: cứ 20 phút nhìn màn hình thì nhìn xa ~6 m trong 20 giây để mắt nghỉ. 2) Ngồi cách màn hình 50–70 cm, đặt màn hình ngang tầm mắt, đủ sáng. 3) Ăn đủ vitamin A và ngủ đủ giấc; ra ngoài trời chơi mỗi ngày để mắt được nhìn xa.' },
    ]
  ),

  'S9KHTN-w15-quiz': L(
    'Kim loại — Tính chất chung',
    'Sắt làm cầu, nhôm làm máy bay, đồng làm dây điện, vàng làm trang sức — kim loại có mặt khắp nơi trong đời sống. Hôm nay ta sang phần hoá học, tìm hiểu tính chất chung của kim loại.',
    [
      'Nêu được tính chất vật lí chung của kim loại.',
      'Trình bày được tính chất hoá học chung của kim loại.',
      'Viết được phương trình minh hoạ tính chất hoá học.',
    ],
    [
      { h: 'Tính chất vật lí của kim loại' },
      { ul: [
        'Tính dẻo: dát mỏng, kéo sợi được (vàng dẻo nhất).',
        'Dẫn điện tốt: bạc > đồng > vàng > nhôm > sắt.',
        'Dẫn nhiệt tốt.',
        'Có ánh kim (bề mặt sáng bóng).',
      ] },
      { h: 'Một số tính chất riêng' },
      { ul: [
        'Hầu hết kim loại ở thể rắn (trừ thuỷ ngân Hg là chất lỏng).',
        'Khối lượng riêng: nhẹ nhất là liti, nặng nhất là osmi; nhôm nhẹ, chì nặng.',
        'Nhiệt độ nóng chảy: vonfram cao nhất (~3410 °C), thuỷ ngân thấp nhất.',
      ] },
      { h: 'Tác dụng với phi kim' },
      { ul: [
        'Với oxi tạo oxit: 3Fe + 2O₂ → Fe₃O₄ (đốt sắt trong oxi).',
        'Với clo tạo muối clorua: 2Fe + 3Cl₂ → 2FeCl₃.',
        'Với lưu huỳnh: Fe + S → FeS (khi nung).',
      ] },
      { h: 'Tác dụng với dung dịch axit' },
      { p: 'Nhiều kim loại (đứng trước H trong dãy hoạt động) tác dụng với dung dịch axit HCl, H₂SO₄ loãng tạo muối và giải phóng khí hiđro: Mg + 2HCl → MgCl₂ + H₂↑.' },
      { h: 'Tác dụng với dung dịch muối' },
      { p: 'Kim loại hoạt động mạnh hơn (đứng trước) đẩy kim loại yếu hơn (đứng sau) ra khỏi dung dịch muối: Fe + CuSO₄ → FeSO₄ + Cu (sắt phủ một lớp đồng đỏ).' },
      { h: 'Dãy hoạt động hoá học của kim loại' },
      { p: 'K, Na, Ca, Mg, Al, Zn, Fe, Ni, Sn, Pb, (H), Cu, Hg, Ag, Pt, Au. Kim loại càng đứng trước càng hoạt động mạnh.' },
      { h: 'Giải thích tính chất bằng cấu tạo' },
      { p: 'Kim loại có các electron tự do dịch chuyển trong mạng tinh thể; chính các electron này tạo nên tính dẫn điện, dẫn nhiệt, ánh kim và tính dẻo đặc trưng của kim loại.' },
      { note: 'Tính chất hoá học chung của kim loại là tính khử: kim loại nhường electron để trở thành ion dương.' },
    ],
    [
      { q: 'Vì sao kẽm (Zn) tác dụng được với dung dịch HCl còn đồng (Cu) thì không?', a: 'Vì Zn đứng trước H trong dãy hoạt động hoá học nên đẩy được H ra khỏi axit: Zn + 2HCl → ZnCl₂ + H₂↑. Còn Cu đứng sau H nên không phản ứng với HCl loãng.' },
      { q: 'Viết phương trình phản ứng khi cho magie (Mg) tác dụng với dung dịch HCl.', a: 'Mg + 2HCl → MgCl₂ + H₂↑. Khí thoát ra là hiđro, sủi bọt; dung dịch tạo thành chứa muối magie clorua.' },
      { q: 'Nhúng một đinh sắt sạch vào dung dịch CuSO₄ màu xanh, sau một thời gian quan sát thấy gì? Viết phương trình.', a: 'Đinh sắt phủ một lớp đồng màu đỏ, màu xanh của dung dịch nhạt dần (do FeSO₄ không màu thay thế). Phương trình: Fe + CuSO₄ → FeSO₄ + Cu. Sắt đẩy đồng ra khỏi muối vì đứng trước Cu trong dãy hoạt động.' },
    ]
  ),

  'S9KHTN-w16-quiz': L(
    'Dãy hoạt động hoá học của kim loại',
    'Vì sao sắt đẩy được đồng nhưng đồng không đẩy được sắt? Vì sao có kim loại tan trong axit, có kim loại thì không? Dãy hoạt động hoá học sẽ trả lời tất cả — đây là "bảng xếp hạng sức mạnh" của kim loại.',
    [
      'Học thuộc dãy hoạt động hoá học của kim loại.',
      'Nêu được ý nghĩa của dãy hoạt động.',
      'Vận dụng dự đoán chiều của phản ứng.',
    ],
    [
      { h: 'Dãy hoạt động hoá học' },
      { p: 'K, Na, Ca, Mg, Al, Zn, Fe, Ni, Sn, Pb, (H), Cu, Hg, Ag, Pt, Au. Mức độ hoạt động hoá học giảm dần từ trái sang phải.' },
      { h: 'Mẹo nhớ dãy hoạt động' },
      { p: '"Khi Nào Cần May Áo Záp Sắt Nhớ Sang Phố Hỏi Cửa hàng Áo Phi Âu" tương ứng K, Na, Ca, Mg, Al, Zn, Fe, Ni, Sn, Pb, H, Cu, Hg, Ag, Pt, Au.' },
      { h: 'Ý nghĩa 1: phản ứng với nước' },
      { p: 'Các kim loại rất mạnh đứng đầu dãy (K, Na, Ca) phản ứng với nước ở nhiệt độ thường tạo dung dịch kiềm và khí hiđro: 2Na + 2H₂O → 2NaOH + H₂↑.' },
      { h: 'Ý nghĩa 2: phản ứng với axit' },
      { p: 'Kim loại đứng trước H đẩy được hiđro ra khỏi dung dịch axit (HCl, H₂SO₄ loãng); kim loại đứng sau H (Cu, Ag, Au…) thì không.' },
      { h: 'Ý nghĩa 3: phản ứng với dung dịch muối' },
      { p: 'Trừ các kim loại tan trong nước, kim loại đứng trước đẩy kim loại đứng sau ra khỏi dung dịch muối của nó: Zn + CuSO₄ → ZnSO₄ + Cu.' },
      { h: 'Tính khử và độ hoạt động' },
      { ul: [
        'Kim loại đứng trước càng dễ nhường electron (tính khử mạnh).',
        'Kim loại đứng trước càng khó bị khử về kim loại từ ion (khó luyện).',
        'Ion kim loại đứng sau dễ bị kim loại đứng trước đẩy ra.',
      ] },
      { h: 'Ứng dụng dãy hoạt động' },
      { ul: [
        'Dự đoán phản ứng kim loại với axit, muối có xảy ra không.',
        'Giải thích vì sao đồng, bạc, vàng bền trong tự nhiên.',
        'Chọn kim loại bảo vệ chống ăn mòn (mạ kẽm cho sắt).',
      ] },
      { note: 'Quy tắc cốt lõi: "trước đẩy sau" — kim loại mạnh hơn (đứng trước) luôn đẩy kim loại yếu hơn (đứng sau) ra khỏi muối hoặc đẩy H ra khỏi axit.' },
    ],
    [
      { q: 'Cho một lá sắt vào dung dịch CuSO₄. Phản ứng có xảy ra không? Viết phương trình.', a: 'Có. Fe đứng trước Cu nên đẩy Cu ra: Fe + CuSO₄ → FeSO₄ + Cu. Lá sắt phủ lớp đồng đỏ.' },
      { q: 'Cho lá đồng vào dung dịch ZnSO₄. Có phản ứng không? Giải thích.', a: 'Không phản ứng. Vì Cu đứng SAU Zn trong dãy hoạt động, đồng yếu hơn nên không thể đẩy kẽm ra khỏi muối ZnSO₄.' },
      { q: 'Vì sao trong tự nhiên vàng và bạc thường tồn tại ở dạng kim loại tự do, còn natri thì luôn ở dạng hợp chất?', a: 'Vì vàng, bạc đứng cuối dãy hoạt động, rất kém hoạt động nên không bị các chất trong tự nhiên oxi hoá, tồn tại dạng kim loại tự do. Natri đứng đầu dãy, hoạt động rất mạnh, dễ phản ứng với nước và oxi nên luôn tồn tại ở dạng hợp chất (như NaCl).' },
    ]
  ),

  'S9KHTN-w17-quiz': L(
    'Nhôm và Sắt',
    'Sắt là kim loại của nền văn minh — làm cầu, đường ray, nhà cao tầng. Nhôm là kim loại của thời đại — nhẹ, không gỉ, làm máy bay và đồ gia dụng. Hôm nay ta tìm hiểu kĩ hai kim loại quan trọng nhất này.',
    [
      'Nêu tính chất, ứng dụng của nhôm và sắt.',
      'Giải thích vì sao nhôm bền trong không khí.',
      'Hiểu nguyên tắc sản xuất nhôm và sản xuất gang, thép.',
    ],
    [
      { h: 'Nhôm (Al) — tính chất' },
      { ul: [
        'Kim loại nhẹ, màu trắng bạc, dẫn điện – dẫn nhiệt tốt.',
        'Dẻo, dễ dát mỏng, kéo sợi.',
        'Tác dụng với oxi, axit, dung dịch kiềm và dung dịch muối.',
      ] },
      { h: 'Vì sao nhôm không bị gỉ?' },
      { p: 'Nhôm phản ứng với oxi tạo lớp Al₂O₃ rất mỏng, bền và mịn bám chắc trên bề mặt, ngăn không cho nhôm bên trong tiếp tục bị oxi hoá. Nhờ vậy đồ nhôm bền trong không khí và nước.' },
      { h: 'Sản xuất nhôm' },
      { p: 'Nhôm được sản xuất bằng cách điện phân nóng chảy nhôm oxit (Al₂O₃) tách từ quặng boxit: 2Al₂O₃ →(điện phân nóng chảy) 4Al + 3O₂.' },
      { h: 'Sắt (Fe) — tính chất' },
      { ul: [
        'Kim loại màu trắng xám, có từ tính, dẻo, dễ rèn.',
        'Tác dụng với phi kim, axit, dung dịch muối.',
        'Có hai hoá trị II và III (FeCl₂, FeCl₃).',
      ] },
      { h: 'Sự ăn mòn (gỉ) của sắt' },
      { p: 'Sắt trong không khí ẩm bị ăn mòn dần thành gỉ sắt màu nâu đỏ (Fe₂O₃·nH₂O), xốp, giòn, không bảo vệ được lớp trong nên sắt bị phá huỷ dần. Chống gỉ bằng cách sơn, mạ kẽm, bôi dầu mỡ, làm thép không gỉ.' },
      { h: 'Gang và thép' },
      { ul: [
        'Gang: hợp kim Fe – C với hàm lượng cacbon 2–5%, cứng và giòn.',
        'Thép: hợp kim Fe – C với hàm lượng cacbon dưới 2%, dẻo và bền hơn gang.',
        'Sản xuất gang trong lò cao từ quặng sắt (hematit Fe₂O₃) + than cốc + đá vôi.',
      ] },
      { h: 'Ứng dụng' },
      { ul: [
        'Nhôm: đồ gia dụng, dây điện, khung cửa, vỏ máy bay.',
        'Sắt – thép: xây dựng, đường ray, cơ khí, ô tô.',
        'Inox (thép không gỉ): dao kéo, bồn rửa, đồ y tế.',
      ] },
      { note: 'Việt Nam có trữ lượng boxit lớn ở Tây Nguyên — nguồn nguyên liệu để sản xuất nhôm.' },
    ],
    [
      { q: 'Vì sao đồ dùng bằng nhôm (xoong, nồi) bền, không bị gỉ trong không khí?', a: 'Vì bề mặt nhôm phản ứng với oxi tạo lớp nhôm oxit Al₂O₃ mỏng, bền, mịn, bám chắc, ngăn không cho nhôm bên trong tiếp tục bị oxi hoá. Lớp này bảo vệ kim loại nên đồ nhôm không bị gỉ.' },
      { q: 'Viết phương trình mô tả sự tạo thành gỉ sắt trong không khí ẩm.', a: 'Sắt bị oxi hoá trong không khí ẩm: 4Fe + 3O₂ + nH₂O → 2Fe₂O₃·nH₂O (gỉ sắt màu nâu đỏ). Gỉ sắt xốp, không bảo vệ được lớp trong nên sắt tiếp tục bị phá huỷ.' },
      { q: 'Phân biệt gang và thép về thành phần và tính chất.', a: 'Gang chứa 2–5% cacbon, cứng nhưng giòn, dùng đúc bệ máy, ống nước. Thép chứa dưới 2% cacbon, dẻo và bền hơn, dùng xây dựng, làm dụng cụ, cơ khí. Thép được luyện từ gang bằng cách giảm bớt cacbon và các tạp chất.' },
    ]
  ),

  'S9KHTN-w18-quiz': L(
    'Ôn tập HK1',
    'Học kì I sắp khép lại với hai mảng lớn: điện – điện từ – quang học (Vật lí) và kim loại (Hoá học). Hôm nay cô trò mình hệ thống lại toàn bộ để các em sẵn sàng cho bài kiểm tra cuối kì.',
    [
      'Hệ thống các công thức và định luật trọng tâm HK1.',
      'Củng cố tính chất kim loại và dãy hoạt động.',
      'Vận dụng giải bài tập tổng hợp.',
    ],
    [
      { h: 'Điện học — các công thức cốt lõi' },
      { ul: [
        'Định luật Ohm: I = U/R.',
        'Công suất: P = U·I = I²·R = U²/R.',
        'Điện năng: A = P·t; 1 kWh = 3,6 MJ.',
        'Định luật Joule-Lenz: Q = I²·R·t.',
      ] },
      { h: 'Mạch điện' },
      { ul: [
        'Nối tiếp: R_tđ = R₁ + R₂; I chung; U cộng.',
        'Song song: 1/R_tđ = 1/R₁ + 1/R₂; U chung; I cộng.',
        'Hai điện trở song song: R_tđ = R₁R₂/(R₁+R₂).',
      ] },
      { h: 'Điện từ học' },
      { ul: [
        'Dòng điện sinh từ trường (quy tắc nắm tay phải).',
        'Lực điện từ (quy tắc bàn tay trái) — động cơ điện.',
        'Cảm ứng điện từ — máy phát điện.',
        'Máy biến áp: U₁/U₂ = N₁/N₂.',
      ] },
      { h: 'Quang học' },
      { ul: [
        'Khúc xạ ánh sáng: sin i / sin r = n.',
        'Thấu kính: 1/f = 1/d + 1/d\'.',
        'Mắt và các tật (cận – kính phân kì, viễn – kính hội tụ).',
      ] },
      { h: 'Hoá học — tính chất kim loại' },
      { ul: [
        'Tính chất vật lí: dẻo, dẫn điện, dẫn nhiệt, ánh kim.',
        'Tác dụng với phi kim, axit, dung dịch muối.',
        'Dãy hoạt động: K, Na, Ca, Mg, Al, Zn, Fe…, Cu, Ag, Au.',
      ] },
      { h: 'Nhôm, sắt, gang, thép' },
      { ul: [
        'Nhôm bền nhờ lớp Al₂O₃; sản xuất bằng điện phân.',
        'Sắt bị gỉ trong không khí ẩm; sản xuất gang trong lò cao.',
        'Gang giòn (2–5% C), thép dẻo bền (<2% C).',
      ] },
      { note: 'Mẹo ôn thi: lập bảng tóm tắt công thức Vật lí và sơ đồ tư duy tính chất Hoá học để nhớ có hệ thống.' },
    ],
    [
      { q: 'Ba điện trở R₁ = 2 Ω, R₂ = 3 Ω, R₃ = 6 Ω ghép song song. Tính điện trở tương đương.', a: '1/R_tđ = 1/2 + 1/3 + 1/6 = 3/6 + 2/6 + 1/6 = 6/6 = 1 → R_tđ = 1 Ω.' },
      { q: 'Cho lá đồng vào dung dịch FeSO₄. Có phản ứng không? Vì sao?', a: 'Không phản ứng, vì Cu đứng sau Fe trong dãy hoạt động hoá học nên không đẩy được sắt ra khỏi muối FeSO₄.' },
      { q: 'Một bóng đèn 220 V – 100 W dùng đúng định mức 5 giờ mỗi ngày. Tính điện năng tiêu thụ trong 30 ngày.', a: 'Mỗi ngày: A = P·t = 0,1 kW × 5 h = 0,5 kWh. Trong 30 ngày: 0,5 × 30 = 15 kWh (15 số điện).' },
    ]
  ),

  'S9KHTN-w19-quiz': L(
    'Phi kim — Tính chất chung',
    'Bước vào học kì II, ta chuyển sang phi kim — nhóm nguyên tố đa dạng hơn kim loại nhiều. Oxi để thở, clo khử trùng nước, cacbon làm bút chì… mỗi phi kim một vẻ. Cùng tìm hiểu nhé.',
    [
      'Nêu được tính chất vật lí và hoá học chung của phi kim.',
      'Biết một số phi kim phổ biến và ứng dụng.',
      'Viết được phương trình minh hoạ tính chất phi kim.',
    ],
    [
      { h: 'Phi kim là gì?' },
      { p: 'Phi kim là những nguyên tố không có tính chất kim loại điển hình, nằm chủ yếu ở phía bên phải bảng tuần hoàn. Ví dụ: oxi, clo, lưu huỳnh, cacbon, nitơ, photpho.' },
      { h: 'Tính chất vật lí' },
      { ul: [
        'Đa số không dẫn điện (trừ than chì dẫn điện).',
        'Trạng thái đa dạng: rắn (C, S, P), lỏng (Br₂), khí (O₂, N₂, Cl₂, H₂).',
        'Phần lớn có nhiệt độ nóng chảy thấp.',
        'Nhiều phi kim độc (clo, brom).',
      ] },
      { h: 'Tác dụng với kim loại' },
      { p: 'Phi kim tác dụng với kim loại tạo muối hoặc oxit: 2Na + Cl₂ → 2NaCl; 3Fe + 2O₂ → Fe₃O₄.' },
      { h: 'Tác dụng với hiđro' },
      { ul: [
        'O₂ + 2H₂ → 2H₂O (nổ khi đốt).',
        'Cl₂ + H₂ → 2HCl (tạo khí hiđro clorua).',
      ] },
      { h: 'Tác dụng với oxi' },
      { p: 'Nhiều phi kim cháy trong oxi tạo oxit axit: S + O₂ → SO₂; C + O₂ → CO₂; 4P + 5O₂ → 2P₂O₅.' },
      { h: 'Mức độ hoạt động của phi kim' },
      { ul: [
        'Phi kim mạnh: flo, oxi, clo.',
        'Phi kim yếu hơn: lưu huỳnh, photpho, cacbon, silic.',
        'Mức độ hoạt động căn cứ vào khả năng phản ứng với kim loại và hiđro.',
      ] },
      { h: 'Một số phi kim quan trọng' },
      { ul: [
        'Clo (Cl₂): khí vàng lục, độc, khử trùng nước, tẩy trắng.',
        'Cacbon (C): kim cương, than chì, than vô định hình.',
        'Lưu huỳnh (S): chất rắn vàng, sản xuất H₂SO₄, lưu hoá cao su.',
      ] },
      { note: 'Khác kim loại (tính khử), phi kim chủ yếu thể hiện tính oxi hoá — nhận electron để tạo ion âm.' },
    ],
    [
      { q: 'Viết phương trình phản ứng giữa clo và natri.', a: '2Na + Cl₂ → 2NaCl. Sản phẩm là muối ăn (natri clorua). Natri cháy trong khí clo cho ngọn lửa sáng và khói trắng NaCl.' },
      { q: 'Vì sao khí clo (Cl₂) độc với con người?', a: 'Vì clo tan trong nước (kể cả hơi nước ở đường hô hấp) tạo ra hỗn hợp HCl và HClO có tính axit và oxi hoá mạnh, gây tổn thương niêm mạc mắt, mũi, phổi. Hít nhiều clo có thể gây phù phổi, nguy hiểm tính mạng.' },
      { q: 'Viết phương trình khi đốt cháy lưu huỳnh và cacbon trong khí oxi.', a: 'Lưu huỳnh: S + O₂ →(t°) SO₂ (khí mùi hắc). Cacbon: C + O₂ →(t°) CO₂ (khí cacbonic). Cả hai sản phẩm đều là oxit axit.' },
    ]
  ),

  'S9KHTN-w20-quiz': L(
    'Cacbon và hợp chất',
    'Cacbon là nguyên tố kì lạ: vừa làm nên kim cương lấp lánh đắt giá, vừa là than đen đốt cháy. Nó còn là nền tảng của sự sống và của cả hoá học hữu cơ. Hôm nay ta tìm hiểu cacbon cùng các hợp chất quan trọng.',
    [
      'Nêu được các dạng thù hình của cacbon và tính chất.',
      'Trình bày tính chất của CO, CO₂, muối cacbonat.',
      'Liên hệ vai trò của CO₂ với hiệu ứng nhà kính.',
    ],
    [
      { h: 'Các dạng thù hình của cacbon' },
      { ul: [
        'Kim cương: cứng nhất, trong suốt, không dẫn điện; làm trang sức, mũi khoan, dao cắt.',
        'Than chì (graphit): mềm, dẫn điện; làm điện cực, ruột bút chì, chất bôi trơn.',
        'Cacbon vô định hình: than gỗ, than đá, muội than; làm nhiên liệu, lọc khí.',
      ] },
      { h: 'Tính chất hoá học của cacbon' },
      { ul: [
        'Cháy trong oxi: C + O₂ → CO₂ (toả nhiều nhiệt).',
        'Thiếu oxi tạo CO: 2C + O₂ → 2CO.',
        'Khử oxit kim loại: 2CuO + C → 2Cu + CO₂ (luyện kim).',
      ] },
      { h: 'Tính hấp phụ của than' },
      { p: 'Than gỗ, than hoạt tính có khả năng hút (hấp phụ) màu, mùi, chất độc. Vì vậy than hoạt tính được dùng trong mặt nạ phòng độc, lọc nước, khử mùi tủ lạnh.' },
      { h: 'Cacbon monoxit (CO)' },
      { ul: [
        'Khí không màu, không mùi, rất độc.',
        'Gây ngộ độc khi đốt than trong phòng kín (kết hợp với hemoglobin máu, ngăn vận chuyển oxi).',
        'Là chất khử mạnh: CO + CuO → Cu + CO₂.',
      ] },
      { h: 'Cacbon đioxit (CO₂)' },
      { ul: [
        'Khí không màu, nặng hơn không khí, không duy trì sự cháy.',
        'Tan trong nước tạo axit cacbonic yếu (nước có ga).',
        'Dùng dập tắt đám cháy, làm nước giải khát có ga, đá khô.',
      ] },
      { h: 'Muối cacbonat' },
      { ul: [
        'CaCO₃ (đá vôi): nguyên liệu sản xuất vôi, xi măng.',
        'NaHCO₃ (baking soda): làm bánh, thuốc đau dạ dày.',
        'Bị nhiệt phân: CaCO₃ →(t°) CaO + CO₂.',
      ] },
      { h: 'CO₂ và hiệu ứng nhà kính' },
      { p: 'CO₂ trong khí quyển giữ lại nhiệt của Trái Đất (hiệu ứng nhà kính). Đốt nhiên liệu hoá thạch làm CO₂ tăng, khiến Trái Đất nóng lên, băng tan, nước biển dâng, thời tiết cực đoan.' },
      { note: 'Tuyệt đối không đốt than sưởi trong phòng kín — khí CO sinh ra có thể gây tử vong âm thầm trong khi ngủ.' },
    ],
    [
      { q: 'Vì sao kim cương rất cứng còn than chì lại mềm, dù đều là cacbon?', a: 'Vì cấu trúc khác nhau. Kim cương có mạng tinh thể không gian, mỗi nguyên tử C liên kết bền với 4 nguyên tử C xung quanh nên rất cứng. Than chì có cấu trúc lớp, các lớp liên kết yếu với nhau nên dễ trượt, mềm và dùng làm chất bôi trơn, ruột bút chì.' },
      { q: 'Vì sao đốt than trong phòng kín lại nguy hiểm chết người?', a: 'Vì khi thiếu oxi, than cháy không hoàn toàn sinh ra khí CO. CO không màu, không mùi, kết hợp với hemoglobin trong máu mạnh hơn oxi, ngăn máu vận chuyển oxi đến tế bào, gây ngạt và tử vong âm thầm.' },
      { q: 'Hiệu ứng nhà kính do CO₂ gây ra dẫn đến hậu quả gì cho Trái Đất?', a: 'CO₂ giữ nhiệt làm Trái Đất nóng lên, dẫn đến băng ở hai cực tan, nước biển dâng nhấn chìm vùng ven biển, thời tiết cực đoan (bão, hạn hán) gia tăng, ảnh hưởng nghiêm trọng đến sinh vật và đời sống con người.' },
    ]
  ),

  'S9KHTN-w21-quiz': L(
    'Hợp chất hữu cơ — Mở đầu',
    'Cơm ta ăn, áo ta mặc, xăng xe chạy, thuốc ta uống — đều là hợp chất hữu cơ. Đây là thế giới hoá học của carbon, vô cùng phong phú với hàng triệu chất. Hôm nay ta mở cánh cửa đầu tiên vào hoá học hữu cơ.',
    [
      'Nêu khái niệm hợp chất hữu cơ và hoá học hữu cơ.',
      'Phân loại được các nhóm hợp chất hữu cơ.',
      'Hiểu khái niệm công thức cấu tạo và đồng phân.',
    ],
    [
      { h: 'Hợp chất hữu cơ là gì?' },
      { p: 'Hợp chất hữu cơ là hợp chất của cacbon (trừ một số như CO, CO₂, axit cacbonic, muối cacbonat được xếp vào vô cơ). Hoá học hữu cơ là ngành hoá học nghiên cứu hợp chất hữu cơ.' },
      { h: 'Đặc điểm chung của hợp chất hữu cơ' },
      { ul: [
        'Thành phần luôn có cacbon, thường có thêm hiđro, oxi, nitơ…',
        'Liên kết chủ yếu là liên kết cộng hoá trị.',
        'Đa số dễ cháy, kém bền với nhiệt.',
        'Ít tan trong nước, tan nhiều trong dung môi hữu cơ.',
      ] },
      { h: 'Phân loại hợp chất hữu cơ' },
      { ul: [
        'Hiđrocacbon: chỉ gồm C và H (CH₄, C₂H₄, C₆H₆…).',
        'Dẫn xuất của hiđrocacbon: ngoài C, H còn có O, N, halogen… (rượu, axit, este, protein…).',
      ] },
      { h: 'Hoá trị và liên kết của cacbon' },
      { p: 'Trong hợp chất hữu cơ, cacbon luôn có hoá trị IV. Các nguyên tử cacbon có thể liên kết với nhau tạo thành mạch thẳng, mạch nhánh hoặc mạch vòng — đó là lí do hợp chất hữu cơ rất đa dạng.' },
      { h: 'Công thức cấu tạo' },
      { p: 'Công thức cấu tạo biểu diễn cách các nguyên tử liên kết với nhau trong phân tử. Hai chất có cùng công thức phân tử nhưng khác công thức cấu tạo sẽ có tính chất khác nhau.' },
      { h: 'Hiện tượng đồng phân' },
      { p: 'Đồng phân là các chất có cùng công thức phân tử nhưng khác công thức cấu tạo, do đó có tính chất khác nhau. Ví dụ rượu etylic (C₂H₆O) và đimetyl ete (C₂H₆O) là hai đồng phân.' },
      { h: 'Vai trò của hợp chất hữu cơ' },
      { ul: [
        'Cấu tạo cơ thể sống: protein, lipit, gluxit, axit nucleic.',
        'Nhiên liệu: xăng, dầu, khí gas.',
        'Vật liệu: nhựa, cao su, sợi, dược phẩm.',
      ] },
      { note: 'Sự đa dạng kì diệu của hoá học hữu cơ bắt nguồn từ khả năng độc đáo của cacbon: tự liên kết với nhau thành vô số mạch dài, nhánh và vòng.' },
    ],
    [
      { q: 'CO₂ có chứa cacbon, vậy nó có phải hợp chất hữu cơ không?', a: 'Không. Tuy có cacbon nhưng CO₂ (cùng CO, axit cacbonic, muối cacbonat) được xếp vào hợp chất vô cơ vì tính chất và lịch sử nghiên cứu, không thuộc nhóm hợp chất hữu cơ.' },
      { q: 'Phân loại các chất sau thành hiđrocacbon và dẫn xuất hiđrocacbon: CH₄, C₂H₅OH, C₆H₆, CH₃COOH.', a: 'Hiđrocacbon (chỉ có C và H): CH₄, C₆H₆. Dẫn xuất hiđrocacbon (có thêm O): C₂H₅OH (rượu etylic), CH₃COOH (axit axetic).' },
      { q: 'Vì sao hai chất có cùng công thức phân tử lại có thể có tính chất khác nhau?', a: 'Vì chúng là đồng phân — cùng số và loại nguyên tử nhưng cách sắp xếp, liên kết khác nhau (công thức cấu tạo khác nhau). Cấu tạo quyết định tính chất, nên hai đồng phân có tính chất vật lí và hoá học khác nhau.' },
    ]
  ),

  'S9KHTN-w22-quiz': L(
    'Methane (CH₄) và mạch cacbon no',
    'Bật bếp gas nấu cơm, đốt khí biogas từ hầm phân — đều là đốt methane (mêtan). Đây là hiđrocacbon đơn giản nhất, mở đầu cho dãy ankan. Hôm nay ta tìm hiểu cấu tạo và tính chất của nó.',
    [
      'Nêu được cấu tạo phân tử và tính chất của methane.',
      'Viết được phương trình phản ứng cháy và phản ứng thế.',
      'Liên hệ ứng dụng của methane và biogas.',
    ],
    [
      { h: 'Methane trong tự nhiên' },
      { p: 'Methane (CH₄) là thành phần chính của khí thiên nhiên, khí mỏ dầu, khí biogas (khí sinh học), khí bùn ao. Đây là nguồn nhiên liệu quan trọng.' },
      { h: 'Cấu tạo phân tử methane' },
      { ul: [
        'Một nguyên tử C liên kết với 4 nguyên tử H.',
        'Bốn liên kết đơn C–H hướng về 4 đỉnh tứ diện đều.',
        'Trong phân tử chỉ có liên kết đơn (gọi là hiđrocacbon no).',
      ] },
      { h: 'Tính chất vật lí' },
      { p: 'Methane là chất khí không màu, không mùi, nhẹ hơn không khí (M = 16), ít tan trong nước.' },
      { h: 'Phản ứng cháy (đặc trưng nhất)' },
      { p: 'Methane cháy trong oxi cho ngọn lửa xanh, toả nhiều nhiệt: CH₄ + 2O₂ →(t°) CO₂ + 2H₂O. Đây là phản ứng dùng để đun nấu, sưởi ấm.' },
      { h: 'Phản ứng thế với clo' },
      { p: 'Khi có ánh sáng, methane tham gia phản ứng thế với clo, một nguyên tử H bị thay thế bởi một nguyên tử Cl: CH₄ + Cl₂ →(ánh sáng) CH₃Cl + HCl. Phản ứng thế là đặc trưng của hiđrocacbon no.' },
      { h: 'Hỗn hợp nổ' },
      { p: 'Methane trộn với oxi (hoặc không khí) theo tỉ lệ thích hợp tạo thành hỗn hợp nổ. Đây là nguyên nhân các vụ nổ khí gas, nổ hầm mỏ — cần thông gió và tránh tia lửa.' },
      { h: 'Biogas — năng lượng tái tạo' },
      { p: 'Biogas sinh ra khi vi sinh vật phân huỷ chất thải hữu cơ (phân gia súc, rác) trong điều kiện thiếu khí, thành phần chính là methane. Biogas dùng đun nấu, thắp sáng, vừa xử lí chất thải vừa tạo năng lượng sạch.' },
      { note: 'Hiđrocacbon no chỉ tham gia phản ứng THẾ, không có phản ứng cộng — đây là điểm khác biệt quan trọng với hiđrocacbon không no.' },
    ],
    [
      { q: 'Viết phương trình phản ứng đốt cháy methane.', a: 'CH₄ + 2O₂ →(t°) CO₂ + 2H₂O. Phản ứng toả nhiều nhiệt, ngọn lửa màu xanh, là cơ sở của việc dùng khí gas để đun nấu.' },
      { q: 'Vì sao nói biogas là nguồn năng lượng tái tạo và thân thiện môi trường?', a: 'Vì biogas được sản xuất từ chất thải hữu cơ (phân, rác) luôn được tái tạo liên tục. Việc dùng biogas vừa xử lí được chất thải gây ô nhiễm, vừa tạo ra nhiên liệu sạch, giảm chặt cây làm củi và giảm phát thải.' },
      { q: 'Viết phương trình phản ứng thế giữa methane và clo (tạo CH₃Cl). Điều kiện phản ứng là gì?', a: 'CH₄ + Cl₂ →(ánh sáng) CH₃Cl + HCl. Điều kiện là phải có ánh sáng. Một nguyên tử H trong CH₄ bị thay thế bằng một nguyên tử Cl — đây là phản ứng thế đặc trưng của hiđrocacbon no.' },
    ]
  ),

  'S9KHTN-w23-quiz': L(
    'Ethylene (C₂H₄) và Acetylene (C₂H₂)',
    'Quả chín nhanh khi để gần nhau là nhờ khí ethylene; đèn xì hàn cắt sắt thép cháy rực là nhờ acetylene. Hai chất này có liên kết đôi, liên kết ba — nên phản ứng "máu lửa" hơn methane nhiều.',
    [
      'Nêu cấu tạo và tính chất của ethylene và acetylene.',
      'Phân biệt hiđrocacbon no và không no qua phản ứng.',
      'Liên hệ ứng dụng quan trọng trong công nghiệp.',
    ],
    [
      { h: 'Ethylene (C₂H₄) — cấu tạo' },
      { p: 'Phân tử ethylene có hai nguyên tử cacbon liên kết với nhau bằng một liên kết đôi C=C, mỗi cacbon còn liên kết với 2 nguyên tử H. Liên kết đôi gồm một liên kết bền và một liên kết kém bền dễ bị phá vỡ.' },
      { h: 'Phản ứng cộng của ethylene' },
      { ul: [
        'Cộng brom (làm mất màu nước brom): C₂H₄ + Br₂ → C₂H₄Br₂.',
        'Cộng hiđro: C₂H₄ + H₂ →(Ni, t°) C₂H₆.',
        'Cộng nước tạo rượu: C₂H₄ + H₂O →(axit) C₂H₅OH.',
      ] },
      { h: 'Phản ứng trùng hợp' },
      { p: 'Nhiều phân tử ethylene kết hợp với nhau tạo thành polyethylene (PE): nCH₂=CH₂ → (–CH₂–CH₂–)ₙ. PE là nhựa làm túi nilon, màng bọc, chai lọ.' },
      { h: 'Ứng dụng của ethylene' },
      { ul: [
        'Kích thích quả mau chín (giấm chín hoa quả).',
        'Sản xuất nhựa PE, rượu etylic, axit axetic.',
      ] },
      { h: 'Acetylene (C₂H₂) — cấu tạo' },
      { p: 'Phân tử acetylene có hai nguyên tử cacbon liên kết bằng một liên kết ba C≡C, mỗi cacbon liên kết với 1 nguyên tử H. Liên kết ba kém bền, dễ tham gia phản ứng cộng.' },
      { h: 'Tính chất và phản ứng của acetylene' },
      { ul: [
        'Cháy toả nhiệt rất lớn (đèn xì oxy – acetylene đạt ~3000 °C).',
        'Làm mất màu nước brom (cộng tới 2 phân tử Br₂).',
        'Điều chế từ đất đèn: CaC₂ + 2H₂O → C₂H₂↑ + Ca(OH)₂.',
      ] },
      { h: 'Phân biệt no và không no' },
      { ul: [
        'No (CH₄): chỉ có phản ứng thế, không làm mất màu nước brom.',
        'Không no (C₂H₄, C₂H₂): có phản ứng cộng, làm mất màu nước brom.',
      ] },
      { note: 'Dấu hiệu nhận biết hiđrocacbon không no: làm mất màu dung dịch nước brom (do phản ứng cộng vào liên kết đôi/ba).' },
    ],
    [
      { q: 'Vì sao ethylene làm mất màu dung dịch nước brom còn methane thì không?', a: 'Vì ethylene có liên kết đôi C=C (hiđrocacbon không no), tham gia phản ứng cộng: C₂H₄ + Br₂ → C₂H₄Br₂, làm mất màu nâu đỏ của nước brom. Methane chỉ có liên kết đơn (no), không cộng được brom nên không làm mất màu.' },
      { q: 'Nêu ứng dụng quan trọng của acetylene.', a: 'Acetylene dùng trong đèn xì oxy – acetylene để hàn, cắt kim loại (vì cháy toả nhiệt rất lớn, đạt khoảng 3000 °C); ngoài ra dùng làm nguyên liệu sản xuất nhựa, cao su, axit axetic.' },
      { q: 'Viết phương trình điều chế acetylene từ đất đèn (canxi cacbua).', a: 'CaC₂ + 2H₂O → C₂H₂↑ + Ca(OH)₂. Cho đất đèn (CaC₂) tác dụng với nước sẽ sinh khí acetylene, đây là cách điều chế đơn giản dùng trong đèn xì và phòng thí nghiệm.' },
    ]
  ),

  'S9KHTN-w24-quiz': L(
    'Benzen và dầu mỏ',
    'Benzen là "viên gạch" của hàng loạt hợp chất thơm; dầu mỏ là "vàng đen" cung cấp xăng dầu cho cả thế giới. Hôm nay ta tìm hiểu cấu tạo đặc biệt của benzen và quá trình chế biến dầu mỏ.',
    [
      'Nêu được cấu tạo và tính chất của benzen.',
      'Trình bày được thành phần và cách chế biến dầu mỏ.',
      'Liên hệ vấn đề năng lượng và môi trường.',
    ],
    [
      { h: 'Benzen (C₆H₆) — cấu tạo' },
      { p: 'Phân tử benzen có 6 nguyên tử cacbon liên kết với nhau tạo thành vòng 6 cạnh đều, mỗi cacbon liên kết với 1 nguyên tử H. Trong vòng có 3 liên kết đôi xen kẽ 3 liên kết đơn (cấu trúc đặc biệt, bền vững).' },
      { h: 'Tính chất vật lí' },
      { p: 'Benzen là chất lỏng không màu, có mùi đặc trưng, nhẹ hơn nước, không tan trong nước, hoà tan nhiều chất hữu cơ. Benzen độc, hơi của nó có hại cho sức khoẻ.' },
      { h: 'Tính chất hoá học của benzen' },
      { ul: [
        'Cháy: 2C₆H₆ + 15O₂ → 12CO₂ + 6H₂O (cho nhiều muội than).',
        'Phản ứng thế với brom (có bột sắt): C₆H₆ + Br₂ → C₆H₅Br + HBr.',
        'Khó tham gia phản ứng cộng (do cấu trúc vòng bền).',
      ] },
      { h: 'Ứng dụng của benzen' },
      { ul: [
        'Dung môi hoà tan sơn, cao su, dầu mỡ.',
        'Nguyên liệu sản xuất chất dẻo, thuốc nhuộm, dược phẩm.',
      ] },
      { h: 'Dầu mỏ — thành phần' },
      { p: 'Dầu mỏ là hỗn hợp lỏng, sánh, màu nâu đen, gồm nhiều hiđrocacbon khác nhau. Dầu mỏ không tan trong nước và nhẹ hơn nước nên nổi lên trên.' },
      { h: 'Chế biến dầu mỏ' },
      { ul: [
        'Chưng cất phân đoạn tách thành: khí, xăng, dầu hoả, dầu diesel, dầu nhờn, nhựa đường.',
        'Crăcking: bẻ gãy phân tử lớn thành xăng (tăng lượng xăng thu được).',
      ] },
      { h: 'Khí thiên nhiên và khí mỏ dầu' },
      { p: 'Đi cùng dầu mỏ thường có khí thiên nhiên (thành phần chính là methane). Việt Nam khai thác dầu khí ở thềm lục địa phía Nam (mỏ Bạch Hổ, Rồng…).' },
      { note: 'Dầu mỏ là tài nguyên không tái tạo và gây ô nhiễm khi đốt — xu hướng thế giới là chuyển dần sang năng lượng tái tạo (mặt trời, gió).' },
    ],
    [
      { q: 'Vì sao benzen có cấu trúc đặc biệt và khá bền?', a: 'Vì 6 nguyên tử C tạo thành vòng 6 cạnh đều với 3 liên kết đôi xen kẽ 3 liên kết đơn. Cấu trúc vòng này rất bền (tính thơm), nên benzen khó tham gia phản ứng cộng mà dễ tham gia phản ứng thế.' },
      { q: 'Người ta chế biến dầu mỏ bằng phương pháp nào để thu được xăng, dầu hoả, dầu nhờn?', a: 'Bằng phương pháp chưng cất phân đoạn: đun nóng dầu mỏ, các thành phần có nhiệt độ sôi khác nhau bay hơi và ngưng tụ ở các tầng khác nhau, tách thành khí, xăng, dầu hoả, dầu diesel, dầu nhờn, nhựa đường. Ngoài ra còn dùng crăcking để bẻ phân tử lớn thành xăng.' },
      { q: 'Vì sao việc khai thác và sử dụng dầu mỏ gây vấn đề môi trường?', a: 'Vì đốt các sản phẩm dầu mỏ (xăng, dầu) thải ra CO₂ gây hiệu ứng nhà kính và các khí độc gây ô nhiễm không khí. Tràn dầu trên biển gây ô nhiễm nghiêm trọng, huỷ diệt sinh vật biển. Ngoài ra dầu mỏ là tài nguyên có hạn, dùng nhiều sẽ cạn kiệt.' },
    ]
  ),

  'S9KHTN-w25-quiz': L(
    'Rượu etylic (C₂H₅OH)',
    'Cồn sát khuẩn, rượu bia, xăng sinh học E5 — đều liên quan đến rượu etylic. Đây là dẫn xuất hiđrocacbon quen thuộc với nhóm –OH đặc trưng. Hôm nay ta tìm hiểu tính chất và cả mặt trái của nó.',
    [
      'Nêu cấu tạo phân tử và tính chất của rượu etylic.',
      'Viết được phương trình phản ứng đặc trưng.',
      'Hiểu tác hại của lạm dụng rượu bia.',
    ],
    [
      { h: 'Cấu tạo phân tử rượu etylic' },
      { p: 'Công thức cấu tạo: CH₃–CH₂–OH. Đặc điểm quan trọng là có nhóm –OH (hiđroxyl) liên kết với cacbon. Chính nhóm –OH này quyết định tính chất hoá học đặc trưng của rượu.' },
      { h: 'Tính chất vật lí' },
      { p: 'Rượu etylic là chất lỏng không màu, sôi ở 78,3 °C, nhẹ hơn nước, tan vô hạn trong nước, hoà tan được nhiều chất (iot, benzen…).' },
      { h: 'Độ rượu' },
      { p: 'Độ rượu cho biết số ml rượu etylic nguyên chất có trong 100 ml dung dịch rượu. Ví dụ rượu 45° nghĩa là trong 100 ml dung dịch có 45 ml rượu etylic nguyên chất.' },
      { h: 'Phản ứng cháy' },
      { p: 'Rượu etylic cháy với ngọn lửa màu xanh, toả nhiều nhiệt: C₂H₅OH + 3O₂ →(t°) 2CO₂ + 3H₂O. Vì vậy rượu được dùng làm nhiên liệu (cồn khô, xăng sinh học).' },
      { h: 'Phản ứng với natri' },
      { p: 'Rượu etylic tác dụng với natri giải phóng khí hiđro (phản ứng của nhóm –OH): 2C₂H₅OH + 2Na → 2C₂H₅ONa + H₂↑.' },
      { h: 'Phản ứng với axit axetic (este hoá)' },
      { p: 'Rượu etylic phản ứng với axit axetic tạo este có mùi thơm: CH₃COOH + C₂H₅OH ⇌ CH₃COOC₂H₅ + H₂O (có axit sunfuric đặc làm xúc tác).' },
      { h: 'Điều chế và ứng dụng' },
      { ul: [
        'Lên men tinh bột, đường: tinh bột/đường → rượu etylic + CO₂.',
        'Cộng nước vào ethylene (công nghiệp).',
        'Ứng dụng: nhiên liệu, dung môi, sát khuẩn (cồn 70°), sản xuất axit axetic, dược phẩm.',
      ] },
      { note: 'Cồn y tế thường dùng là cồn 70°, vì nồng độ này diệt khuẩn hiệu quả nhất.' },
    ],
    [
      { q: 'Vì sao cồn 70° sát khuẩn tốt hơn cồn 90°?', a: 'Cồn 70° có đủ nước để thẩm thấu qua màng tế bào vi khuẩn, làm đông tụ protein bên trong và tiêu diệt vi khuẩn từ trong ra. Cồn 90° làm protein lớp ngoài đông tụ quá nhanh tạo "vỏ bọc" ngăn cồn thấm sâu, nên hiệu quả diệt khuẩn kém hơn.' },
      { q: 'Viết phương trình phản ứng cháy của rượu etylic.', a: 'C₂H₅OH + 3O₂ →(t°) 2CO₂ + 3H₂O. Phản ứng toả nhiều nhiệt, ngọn lửa màu xanh; nhờ vậy rượu etylic được dùng làm nhiên liệu.' },
      { q: 'Vì sao lái xe khi đã uống rượu bia là rất nguy hiểm?', a: 'Vì rượu (etanol) tác động lên hệ thần kinh, làm giảm phản xạ, giảm khả năng phán đoán và phối hợp động tác, dễ buồn ngủ. Người lái xử lý tình huống chậm, dễ gây tai nạn giao thông. Pháp luật Việt Nam nghiêm cấm điều khiển phương tiện khi có nồng độ cồn.' },
    ]
  ),

  'S9KHTN-w26-quiz': L(
    'Axit axetic (CH₃COOH) và chất béo',
    'Vị chua của giấm là từ axit axetic; lớp dầu vàng trên bát canh là chất béo. Hai chất hữu cơ rất gần gũi với bữa ăn hằng ngày. Hôm nay ta tìm hiểu tính chất và vai trò của chúng.',
    [
      'Nêu cấu tạo và tính chất của axit axetic.',
      'Viết được phương trình phản ứng của axit axetic.',
      'Nêu được khái niệm, tính chất và vai trò của chất béo.',
    ],
    [
      { h: 'Cấu tạo axit axetic' },
      { p: 'Công thức cấu tạo: CH₃–COOH. Nhóm chức quyết định tính chất là nhóm –COOH (cacboxyl). Chính nhóm này làm axit axetic có tính axit.' },
      { h: 'Tính chất vật lí' },
      { p: 'Axit axetic là chất lỏng không màu, vị chua, tan vô hạn trong nước. Giấm ăn là dung dịch axit axetic nồng độ 2–5%.' },
      { h: 'Tính axit của axit axetic' },
      { ul: [
        'Làm quỳ tím hoá đỏ.',
        'Tác dụng với kim loại (trước H): 2CH₃COOH + Mg → (CH₃COO)₂Mg + H₂↑.',
        'Tác dụng với oxit bazơ, bazơ: CH₃COOH + NaOH → CH₃COONa + H₂O.',
        'Tác dụng với muối cacbonat: 2CH₃COOH + Na₂CO₃ → 2CH₃COONa + H₂O + CO₂↑.',
      ] },
      { h: 'Phản ứng este hoá' },
      { p: 'Axit axetic tác dụng với rượu etylic (xúc tác H₂SO₄ đặc) tạo este: CH₃COOH + C₂H₅OH ⇌ CH₃COOC₂H₅ + H₂O. Este có mùi thơm, dùng làm hương liệu.' },
      { h: 'Chất béo là gì?' },
      { p: 'Chất béo là hỗn hợp nhiều este của glixerol với các axit béo. Chất béo có trong mỡ động vật và dầu thực vật, nhẹ hơn nước, không tan trong nước, tan trong dung môi hữu cơ (xăng, benzen).' },
      { h: 'Phản ứng thuỷ phân chất béo' },
      { ul: [
        'Thuỷ phân trong axit: chất béo + nước → glixerol + axit béo.',
        'Thuỷ phân trong kiềm (phản ứng xà phòng hoá): chất béo + NaOH → glixerol + muối của axit béo (xà phòng).',
      ] },
      { h: 'Vai trò của chất béo' },
      { ul: [
        'Cung cấp năng lượng cao (~9 kcal/g, gấp đôi đường, đạm).',
        'Dự trữ năng lượng, giữ ấm cơ thể.',
        'Giúp hấp thụ các vitamin tan trong dầu (A, D, E, K).',
      ] },
      { note: 'Ăn quá nhiều chất béo, nhất là mỡ động vật, dễ gây béo phì và bệnh tim mạch — nên cân đối với dầu thực vật và rau xanh.' },
    ],
    [
      { q: 'Viết phương trình phản ứng giữa giấm (axit axetic) và baking soda (NaHCO₃). Hiện tượng quan sát được?', a: 'CH₃COOH + NaHCO₃ → CH₃COONa + H₂O + CO₂↑. Hiện tượng: sủi bọt khí mạnh (khí CO₂ thoát ra). Đây là phản ứng quen thuộc khi pha baking soda với giấm.' },
      { q: 'Vì sao axit axetic làm quỳ tím hoá đỏ và tác dụng được với kim loại Mg?', a: 'Vì axit axetic có nhóm –COOH thể hiện tính axit. Nó làm quỳ tím hoá đỏ và phản ứng với kim loại đứng trước H: 2CH₃COOH + Mg → (CH₃COO)₂Mg + H₂↑, giải phóng khí hiđro.' },
      { q: 'Nêu vai trò của chất béo đối với cơ thể.', a: 'Chất béo cung cấp nhiều năng lượng (khoảng 9 kcal/g), là nguồn dự trữ năng lượng và giúp giữ ấm cơ thể; đồng thời giúp cơ thể hấp thụ các vitamin tan trong dầu (A, D, E, K) và tham gia cấu tạo màng tế bào.' },
    ]
  ),

  'S9KHTN-w27-quiz': L(
    'Glucose và saccarozơ — Carbohydrate',
    'Vị ngọt của nho, của mía, của cơm nhai kĩ — đều đến từ các loại đường. Carbohydrate (gluxit) là nguồn năng lượng số một của cơ thể. Hôm nay ta tìm hiểu các loại đường quan trọng.',
    [
      'Phân biệt được glucose, saccarozơ, tinh bột, cellulose.',
      'Nêu được tính chất và vai trò sinh học của carbohydrate.',
      'Liên hệ chế độ ăn và bệnh tiểu đường.',
    ],
    [
      { h: 'Glucose (C₆H₁₂O₆)' },
      { ul: [
        'Là đường đơn (monosaccarit), chất rắn kết tinh, vị ngọt, tan trong nước.',
        'Có trong quả chín (nho), mật ong, máu người (đường huyết ~0,1%).',
        'Là nguồn năng lượng trực tiếp cho tế bào qua hô hấp.',
      ] },
      { h: 'Phản ứng của glucose' },
      { ul: [
        'Phản ứng tráng gương với dung dịch bạc (AgNO₃/NH₃) tạo bạc kim loại bám thành ống.',
        'Lên men rượu: C₆H₁₂O₆ →(men) 2C₂H₅OH + 2CO₂.',
      ] },
      { h: 'Saccarozơ (C₁₂H₂₂O₁₁)' },
      { ul: [
        'Là đường đôi (đisaccarit), do glucose và fructose tạo thành.',
        'Có nhiều trong mía, củ cải đường (chính là đường ăn).',
        'Bị thuỷ phân thành glucose và fructose khi tiêu hoá.',
      ] },
      { h: 'Tinh bột và cellulose (polisaccarit)' },
      { ul: [
        'Tinh bột: có trong gạo, ngô, khoai, sắn; thuỷ phân cho glucose.',
        'Cellulose: thành phần chính của sợi bông, gỗ, rau; con người không tiêu hoá được.',
        'Nhận biết tinh bột bằng dung dịch iot (chuyển màu xanh tím).',
      ] },
      { h: 'Sự chuyển hoá trong cơ thể' },
      { p: 'Tinh bột (cơm) → đường đơn (glucose) khi tiêu hoá → vào máu cung cấp năng lượng. Cellulose tuy không tiêu hoá được nhưng là chất xơ giúp tiêu hoá tốt và phòng táo bón.' },
      { h: 'Carbohydrate và sức khoẻ' },
      { ul: [
        'Là nguồn năng lượng chính (~4 kcal/g).',
        'Ăn quá nhiều đường tinh dễ gây thừa cân, sâu răng.',
        'Người tiểu đường cần kiểm soát lượng đường để giữ đường huyết ổn định.',
      ] },
      { note: 'Quá trình quang hợp của cây xanh tạo ra glucose: 6CO₂ + 6H₂O →(ánh sáng, diệp lục) C₆H₁₂O₆ + 6O₂ — nguồn gốc của hầu hết carbohydrate trên Trái Đất.' },
    ],
    [
      { q: 'Vì sao khi ăn cơm (tinh bột) cơ thể vẫn nhận được đường (glucose)?', a: 'Vì tinh bột trong cơm khi vào cơ thể bị các enzym tiêu hoá thuỷ phân thành đường đơn glucose. Glucose hấp thụ vào máu, cung cấp năng lượng cho tế bào hoạt động.' },
      { q: 'Cellulose không tiêu hoá được, vậy ăn rau xanh (giàu cellulose) có ích lợi gì?', a: 'Tuy con người không tiêu hoá được cellulose, nhưng nó là chất xơ kích thích nhu động ruột, giúp tiêu hoá tốt, phòng táo bón và hỗ trợ thải chất độc. Vì vậy ăn rau xanh rất tốt cho hệ tiêu hoá.' },
      { q: 'Làm thế nào nhận biết tinh bột bằng thí nghiệm đơn giản?', a: 'Nhỏ vài giọt dung dịch iot lên mẫu thử (ví dụ lát khoai, cơm nguội). Nếu xuất hiện màu xanh tím thì chứng tỏ có tinh bột. Đây là phản ứng đặc trưng để nhận biết tinh bột.' },
    ]
  ),

  'S9KHTN-w28-quiz': L(
    'Protein và polyme',
    'Thịt, cá, trứng cho ta protein để lớn lên; túi nilon, ống nhựa, sợi vải tổng hợp là polyme do con người chế tạo. Hôm nay ta tìm hiểu hai loại "đại phân tử" quan trọng này.',
    [
      'Nêu được thành phần, vai trò và tính chất của protein.',
      'Hiểu khái niệm polyme và phân biệt polyme tự nhiên, tổng hợp.',
      'Liên hệ vấn đề rác thải nhựa.',
    ],
    [
      { h: 'Protein là gì?' },
      { p: 'Protein là những hợp chất hữu cơ phức tạp, có khối lượng phân tử rất lớn, được tạo thành từ các đơn vị amino axit. Protein có trong thịt, cá, trứng, sữa, các loại đậu.' },
      { h: 'Vai trò của protein' },
      { ul: [
        'Cấu tạo nên cơ, da, tóc, móng…',
        'Là enzym xúc tác các phản ứng trong cơ thể.',
        'Là kháng thể bảo vệ cơ thể, là một số hormone.',
        'Cung cấp năng lượng (~4 kcal/g).',
      ] },
      { h: 'Tính chất của protein' },
      { ul: [
        'Bị đông tụ khi đun nóng (lòng trắng trứng chín).',
        'Bị thuỷ phân thành amino axit khi đun với axit hoặc enzym.',
        'Cháy có mùi khét đặc trưng (mùi tóc cháy).',
      ] },
      { h: 'Polyme là gì?' },
      { p: 'Polyme là những chất có phân tử khối rất lớn, do nhiều mắt xích nhỏ (monome) liên kết lại tạo thành. Có polyme thiên nhiên và polyme tổng hợp.' },
      { h: 'Polyme thiên nhiên' },
      { ul: [
        'Tinh bột, cellulose (từ thực vật).',
        'Protein, tơ tằm (từ động vật).',
        'Cao su thiên nhiên (từ mủ cây cao su).',
      ] },
      { h: 'Polyme tổng hợp' },
      { ul: [
        'PE (polyethylene): túi nilon, màng bọc.',
        'PVC (polyvinyl clorua): ống nước, vỏ dây điện.',
        'PS (polystyrene): hộp xốp.',
        'Tơ nilon, tơ polieste: sợi may quần áo.',
      ] },
      { h: 'Vấn đề rác thải nhựa' },
      { p: 'Nhựa tổng hợp rất bền, khó phân huỷ (hàng trăm năm), tích tụ gây ô nhiễm đất, biển, tạo vi nhựa nguy hại. Giải pháp: giảm dùng nhựa một lần, tái sử dụng, tái chế, phân loại rác.' },
      { note: 'Một chiếc túi nilon mất khoảng 500 năm để phân huỷ — hãy ưu tiên túi vải, túi giấy và mang theo bình nước cá nhân.' },
    ],
    [
      { q: 'Vì sao protein đặc biệt quan trọng đối với học sinh đang tuổi lớn?', a: 'Vì protein là nguyên liệu xây dựng cơ, xương, các mô của cơ thể, cần thiết cho sự sinh trưởng và phát triển. Học sinh đang lớn cần nhiều protein (từ thịt, cá, trứng, sữa, đậu) để phát triển chiều cao, cơ bắp và trí não.' },
      { q: 'Phân biệt polyme thiên nhiên và polyme tổng hợp, cho ví dụ mỗi loại.', a: 'Polyme thiên nhiên có sẵn trong tự nhiên: tinh bột, cellulose, protein, cao su thiên nhiên, tơ tằm. Polyme tổng hợp do con người chế tạo từ các chất đơn giản: PE (túi nilon), PVC (ống nước), PS (xốp), tơ nilon.' },
      { q: 'Em hãy đề xuất 3 việc làm để giảm rác thải nhựa.', a: '1) Mang túi vải đi chợ, mua sắm thay cho túi nilon. 2) Dùng bình nước, hộp đựng cơm cá nhân nhiều lần thay đồ nhựa một lần. 3) Phân loại rác và bỏ nhựa vào nơi tái chế; hạn chế ống hút, cốc nhựa dùng một lần.' },
    ]
  ),

  'S9KHTN-w29-quiz': L(
    'Di truyền — Mendel và quy luật phân li',
    'Vì sao con cái giống bố mẹ? Cách đây hơn 150 năm, một tu sĩ tên Mendel đã trồng đậu Hà Lan và tìm ra quy luật di truyền đầu tiên. Hôm nay ta bước vào phần Sinh học với cha đẻ của di truyền học.',
    [
      'Nêu được các thí nghiệm và đóng góp của Mendel.',
      'Phát biểu được quy luật phân li.',
      'Vận dụng giải bài tập lai một cặp tính trạng.',
    ],
    [
      { h: 'Mendel và đậu Hà Lan' },
      { p: 'Gregor Mendel (1822–1884) thực hiện thí nghiệm lai giống trên cây đậu Hà Lan suốt nhiều năm và phát hiện ra các quy luật di truyền cơ bản — nền móng của di truyền học hiện đại.' },
      { h: 'Vì sao chọn đậu Hà Lan?' },
      { ul: [
        'Dễ trồng, vòng đời ngắn, cho nhiều thế hệ.',
        'Có nhiều cặp tính trạng tương phản rõ ràng (hạt vàng/xanh, hoa tím/trắng…).',
        'Tự thụ phấn nghiêm ngặt, dễ tạo dòng thuần.',
      ] },
      { h: 'Một số khái niệm cơ bản' },
      { ul: [
        'Tính trạng trội (A) lấn át tính trạng lặn (a).',
        'Kiểu gen: tổ hợp các gen (AA, Aa, aa).',
        'Đồng hợp: AA hoặc aa; dị hợp: Aa.',
        'Kiểu hình: đặc điểm biểu hiện ra ngoài (vàng, xanh…).',
      ] },
      { h: 'Thí nghiệm lai một cặp tính trạng' },
      { p: 'Lai hai dòng thuần chủng tương phản (AA × aa): F1 đồng loạt mang tính trạng trội (Aa). Cho F1 tự thụ (Aa × Aa): F2 phân li theo tỉ lệ 3 trội : 1 lặn.' },
      { h: 'Quy luật phân li' },
      { p: 'Trong quá trình phát sinh giao tử, mỗi nhân tố di truyền (gen) trong cặp phân li về một giao tử và giữ nguyên bản chất như ở cơ thể thuần chủng của bố mẹ.' },
      { h: 'Cơ sở tế bào học' },
      { p: 'Quy luật phân li được giải thích bằng sự phân li của cặp nhiễm sắc thể tương đồng trong giảm phân, kéo theo sự phân li của cặp gen nằm trên đó về các giao tử khác nhau.' },
      { note: 'Tỉ lệ kiểu gen của F2 (Aa × Aa) là 1 AA : 2 Aa : 1 aa; tỉ lệ kiểu hình là 3 trội : 1 lặn — con số kinh điển cần nhớ.' },
    ],
    [
      { q: 'Cho F1 dị hợp Aa tự thụ phấn (Aa × Aa). Xác định tỉ lệ kiểu gen và kiểu hình ở F2.', a: 'F2 có kiểu gen: 1 AA : 2 Aa : 1 aa. Kiểu hình: 3 trội (AA, Aa) : 1 lặn (aa). Đây là tỉ lệ phân li đặc trưng của Mendel khi lai một cặp tính trạng.' },
      { q: 'Vì sao Mendel chọn cây đậu Hà Lan để làm thí nghiệm?', a: 'Vì đậu Hà Lan dễ trồng, vòng đời ngắn nên nhanh có nhiều thế hệ, có nhiều cặp tính trạng tương phản rõ ràng (hạt vàng/xanh, hoa tím/trắng), lại tự thụ phấn nghiêm ngặt nên dễ tạo dòng thuần để theo dõi sự di truyền.' },
      { q: 'Bố mắt nâu thuần chủng (AA) lấy mẹ mắt xanh (aa), biết nâu trội hoàn toàn so với xanh. Con của họ (F1) sẽ có mắt màu gì?', a: 'F1 có kiểu gen Aa (nhận A từ bố, a từ mẹ). Vì nâu (A) trội hoàn toàn so với xanh (a) nên tất cả con đều mắt nâu, kiểu gen dị hợp Aa.' },
    ]
  ),

  'S9KHTN-w30-quiz': L(
    'Cấu trúc DNA và sao chép',
    'Mọi đặc điểm của em — màu mắt, chiều cao, dáng mũi — được "ghi" trong một phân tử xoắn kép tên DNA. Đây là "cuốn sách sự sống" của mỗi người. Hôm nay ta tìm hiểu cấu trúc và cách nó tự nhân đôi.',
    [
      'Mô tả được cấu trúc xoắn kép của DNA.',
      'Nêu được nguyên tắc bổ sung giữa các base.',
      'Trình bày được cơ chế tự nhân đôi của DNA.',
    ],
    [
      { h: 'DNA — phân tử di truyền' },
      { p: 'DNA (axit deoxyribonucleic) là phân tử mang thông tin di truyền của mọi cơ thể sống. DNA nằm chủ yếu trong nhân tế bào, là thành phần cấu tạo của nhiễm sắc thể.' },
      { h: 'Cấu trúc xoắn kép' },
      { p: 'Năm 1953, Watson và Crick mô tả DNA gồm hai mạch xoắn đều quanh một trục tưởng tượng, giống một chiếc thang dây xoắn lại. Hai nhà khoa học nhận giải Nobel năm 1962 cho phát hiện này.' },
      { h: 'Đơn phân — nucleotide' },
      { ul: [
        'DNA cấu tạo từ 4 loại nucleotide: A (adenin), T (timin), G (guanin), C (xitozin).',
        'Mỗi nucleotide gồm: đường, axit photphoric và một base.',
        'Các nucleotide nối nhau tạo thành mạch dài.',
      ] },
      { h: 'Nguyên tắc bổ sung' },
      { ul: [
        'A liên kết với T bằng 2 liên kết hiđro.',
        'G liên kết với C bằng 3 liên kết hiđro.',
        'Vì vậy: biết trình tự một mạch, suy ra được mạch kia.',
      ] },
      { h: 'Hệ quả của nguyên tắc bổ sung' },
      { ul: [
        'Số A = số T; số G = số C.',
        'Tổng số nucleotide hai mạch luôn cân bằng theo cặp.',
        'Trình tự các nucleotide chính là "mã" thông tin di truyền.',
      ] },
      { h: 'Quá trình tự nhân đôi (sao chép) DNA' },
      { p: 'Khi tế bào chuẩn bị phân chia, DNA tự nhân đôi: hai mạch tách nhau ra, mỗi mạch làm khuôn, các nucleotide tự do gắn vào theo nguyên tắc bổ sung, tạo ra 2 phân tử DNA con giống hệt nhau và giống DNA mẹ.' },
      { h: 'Ý nghĩa của tự nhân đôi' },
      { p: 'Sự tự nhân đôi đảm bảo thông tin di truyền được truyền nguyên vẹn từ tế bào mẹ sang tế bào con, từ thế hệ này sang thế hệ khác — cơ sở của sự ổn định di truyền.' },
      { note: 'Cấu trúc xoắn kép vừa bền vững để bảo vệ thông tin, vừa dễ tách hai mạch để sao chép — một thiết kế tuyệt vời của tự nhiên.' },
    ],
    [
      { q: 'Một mạch của phân tử DNA có trình tự A–T–C–G–A–T. Xác định trình tự mạch bổ sung.', a: 'Theo nguyên tắc bổ sung (A–T, G–C): mạch còn lại là T–A–G–C–T–A. Mỗi A của mạch gốc ghép với T, mỗi C ghép với G và ngược lại.' },
      { q: 'Một đoạn DNA có 600 nucleotide loại A. Hỏi số nucleotide loại T là bao nhiêu? Vì sao?', a: 'Số T = số A = 600 nucleotide. Vì theo nguyên tắc bổ sung, A luôn liên kết với T (A = T), nên số nucleotide loại A bằng số loại T.' },
      { q: 'Vì sao sự tự nhân đôi của DNA lại quan trọng đối với sinh vật?', a: 'Vì nhờ tự nhân đôi theo nguyên tắc bổ sung, thông tin di truyền được sao chép chính xác và truyền nguyên vẹn từ tế bào mẹ sang hai tế bào con khi phân bào, đảm bảo các thế hệ tế bào và cơ thể giữ được bộ thông tin di truyền ổn định.' },
    ]
  ),

  'S9KHTN-w31-quiz': L(
    'Gen, mã di truyền, dịch mã',
    'DNA giống như một cuốn sách viết bằng 4 chữ cái A, T, G, C. Vậy làm sao từ "cuốn sách" ấy mà tạo ra protein xây dựng cơ thể? Hôm nay ta tìm hiểu hành trình từ gen đến protein.',
    [
      'Nêu được khái niệm gen và mã di truyền.',
      'Trình bày được mối quan hệ gen – ARN – protein.',
      'Hiểu ý nghĩa của đột biến gen.',
    ],
    [
      { h: 'Gen là gì?' },
      { p: 'Gen là một đoạn của phân tử DNA mang thông tin quy định cấu trúc của một loại protein (hoặc một phân tử ARN) nhất định. Mỗi gen nằm ở một vị trí xác định trên nhiễm sắc thể.' },
      { h: 'ARN — "bản sao" của gen' },
      { ul: [
        'ARN cấu tạo từ 4 loại nucleotide: A, U (uraxin), G, C — thay T bằng U.',
        'ARN thường chỉ có một mạch.',
        'mARN làm khuôn để tổng hợp protein.',
      ] },
      { h: 'Mã di truyền' },
      { ul: [
        'Là mã bộ ba: cứ 3 nucleotide liền nhau mã hoá 1 axit amin.',
        'Có 4³ = 64 bộ ba, mã hoá cho khoảng 20 loại axit amin.',
        'Mã có tính thoái hoá: nhiều bộ ba cùng mã hoá một axit amin.',
        'Mã di truyền gần như dùng chung cho mọi sinh vật.',
      ] },
      { h: 'Phiên mã (DNA → ARN)' },
      { p: 'Trong nhân tế bào, một mạch của gen làm khuôn để tổng hợp phân tử mARN theo nguyên tắc bổ sung (A–U, T–A, G–C, C–G). mARN sau đó đi ra tế bào chất.' },
      { h: 'Dịch mã (ARN → protein)' },
      { p: 'Tại ribosome, mARN được "đọc" theo từng bộ ba; các axit amin tương ứng được lắp ráp lần lượt thành chuỗi, tạo nên phân tử protein. Protein quy định tính trạng của cơ thể.' },
      { h: 'Sơ đồ mối quan hệ' },
      { p: 'Gen (DNA) → mARN → Protein → Tính trạng. Đây là con đường thông tin di truyền được biểu hiện thành đặc điểm của sinh vật.' },
      { h: 'Đột biến gen' },
      { ul: [
        'Là những biến đổi trong cấu trúc của gen (thay, thêm, mất nucleotide).',
        'Có thể làm thay đổi protein → thay đổi tính trạng.',
        'Gây ra một số bệnh di truyền; cũng là nguồn nguyên liệu cho tiến hoá.',
      ] },
      { note: 'Tính thoái hoá của mã di truyền có lợi: nhiều đột biến không làm đổi axit amin nên protein vẫn bình thường, giảm tác hại của đột biến.' },
    ],
    [
      { q: 'Vì sao mã di truyền có tính thoái hoá lại có lợi cho sinh vật?', a: 'Vì có nhiều bộ ba cùng mã hoá một axit amin, nên khi xảy ra đột biến thay một nucleotide, nhiều trường hợp bộ ba mới vẫn mã hoá đúng axit amin cũ. Nhờ vậy protein không đổi, giảm bớt tác hại của đột biến gen.' },
      { q: 'Trình bày sơ đồ thể hiện mối quan hệ giữa gen và tính trạng.', a: 'Gen (DNA) →(phiên mã) mARN →(dịch mã) Protein → Tính trạng. Gen mang thông tin, được phiên thành mARN, mARN làm khuôn dịch thành protein, protein biểu hiện thành tính trạng của cơ thể.' },
      { q: 'Đột biến gen có thể gây ra những hậu quả gì? Cho ví dụ.', a: 'Đột biến gen làm thay đổi cấu trúc protein, có thể gây ra các bệnh di truyền như bệnh hồng cầu hình liềm, bệnh máu khó đông; một số đột biến góp phần gây ung thư. Tuy nhiên đột biến cũng tạo ra biến dị, là nguồn nguyên liệu cho chọn lọc và tiến hoá.' },
    ]
  ),

  'S9KHTN-w32-quiz': L(
    'Di truyền học người và bệnh di truyền',
    'Vì sao có bệnh truyền từ đời này sang đời khác? Vì sao không nên kết hôn gần huyết thống? Áp dụng di truyền học vào con người giúp ta hiểu bệnh tật và bảo vệ sức khoẻ nòi giống.',
    [
      'Nêu được một số bệnh và tật di truyền ở người.',
      'Hiểu nguyên nhân và cách phòng tránh bệnh di truyền.',
      'Giải thích cơ sở khoa học của luật cấm kết hôn cận huyết.',
    ],
    [
      { h: 'Bộ nhiễm sắc thể của người' },
      { p: 'Người có 46 nhiễm sắc thể (23 cặp), trong đó 22 cặp nhiễm sắc thể thường và 1 cặp nhiễm sắc thể giới tính (XX ở nữ, XY ở nam). Bất thường về số lượng hoặc cấu trúc nhiễm sắc thể gây bệnh, tật.' },
      { h: 'Bệnh do đột biến nhiễm sắc thể' },
      { ul: [
        'Hội chứng Down: thừa 1 nhiễm sắc thể số 21 (3 chiếc).',
        'Hội chứng Turner: nữ chỉ có 1 nhiễm sắc thể X (XO).',
      ] },
      { h: 'Bệnh do gen lặn liên kết giới tính' },
      { ul: [
        'Bệnh máu khó đông (hemophilia): gen lặn trên nhiễm sắc thể X.',
        'Bệnh mù màu: gen lặn trên nhiễm sắc thể X, nam dễ mắc hơn nữ.',
      ] },
      { h: 'Bệnh do rối loạn chuyển hoá' },
      { p: 'Một số bệnh di truyền do đột biến gen làm thiếu enzym, gây rối loạn chuyển hoá, ví dụ bệnh phenylketon niệu (PKU). Sàng lọc sơ sinh giúp phát hiện sớm để điều trị.' },
      { h: 'Nguyên nhân gây bệnh, tật di truyền' },
      { ul: [
        'Tác nhân vật lí: tia phóng xạ, tia tử ngoại.',
        'Tác nhân hoá học: thuốc trừ sâu, chất độc da cam, hoá chất độc.',
        'Một số tác nhân sinh học (virus).',
      ] },
      { h: 'Biện pháp phòng tránh' },
      { ul: [
        'Tư vấn di truyền, sàng lọc trước sinh và sơ sinh.',
        'Không kết hôn gần huyết thống.',
        'Hạn chế tiếp xúc với tác nhân gây đột biến.',
        'Bảo vệ môi trường sống trong sạch.',
      ] },
      { h: 'Vì sao cấm kết hôn cận huyết?' },
      { p: 'Những người cùng dòng họ có nhiều gen lặn giống nhau. Khi kết hôn cận huyết, con dễ nhận cả hai gen lặn gây bệnh từ bố và mẹ (kiểu gen aa), làm tăng mạnh tỉ lệ con mắc bệnh, tật di truyền.' },
      { note: 'Luật Hôn nhân và Gia đình cấm kết hôn trong phạm vi ba đời chính vì lí do di truyền học này.' },
    ],
    [
      { q: 'Vì sao bệnh mù màu thường gặp ở nam giới nhiều hơn nữ giới?', a: 'Vì gen gây mù màu là gen lặn nằm trên nhiễm sắc thể X. Nam chỉ có 1 nhiễm sắc thể X (XY), nên chỉ cần 1 gen lặn là đã biểu hiện bệnh. Nữ có 2 nhiễm sắc thể X (XX), phải mang cả 2 gen lặn mới mắc bệnh, nên nữ ít bị hơn.' },
      { q: 'Vì sao pháp luật cấm kết hôn giữa những người có quan hệ huyết thống gần?', a: 'Vì những người cùng dòng họ thường mang các gen lặn gây bệnh giống nhau. Khi họ kết hôn, xác suất con nhận cả hai gen lặn (aa) từ bố và mẹ tăng cao, nên con dễ mắc các bệnh, tật di truyền. Cấm kết hôn cận huyết nhằm bảo vệ sức khoẻ thế hệ sau.' },
      { q: 'Tư vấn di truyền và sàng lọc trước sinh có ý nghĩa gì?', a: 'Giúp phát hiện sớm nguy cơ và các bất thường di truyền ở thai nhi, để gia đình được tư vấn, chuẩn bị và có quyết định phù hợp; đồng thời góp phần giảm tỉ lệ trẻ sinh ra mắc bệnh, tật di truyền, nâng cao chất lượng dân số.' },
    ]
  ),

  'S9KHTN-w33-quiz': L(
    'Tiến hoá — Darwin và chọn lọc tự nhiên',
    'Vì sao có hàng triệu loài sinh vật khác nhau? Vì sao hươu cao cổ có cổ dài, gấu Bắc Cực có lông trắng? Darwin đã trả lời bằng thuyết tiến hoá — một trong những ý tưởng vĩ đại nhất của khoa học.',
    [
      'Nêu được nội dung cơ bản của thuyết tiến hoá của Darwin.',
      'Giải thích được cơ chế chọn lọc tự nhiên.',
      'Nêu được các bằng chứng tiến hoá.',
    ],
    [
      { h: 'Darwin và "Nguồn gốc các loài"' },
      { p: 'Charles Darwin (1809–1882) công bố tác phẩm "Nguồn gốc các loài" năm 1859, đề xuất thuyết tiến hoá: các loài sinh vật ngày nay đều bắt nguồn từ tổ tiên chung qua quá trình tiến hoá lâu dài.' },
      { h: 'Biến dị trong quần thể' },
      { p: 'Trong một quần thể, các cá thể không hoàn toàn giống nhau mà có nhiều biến dị (về kích thước, màu sắc, sức khoẻ…). Một số biến dị có thể di truyền cho đời sau.' },
      { h: 'Đấu tranh sinh tồn' },
      { p: 'Sinh vật sinh ra rất nhiều con nhưng nguồn sống (thức ăn, nơi ở) có hạn, nên các cá thể phải cạnh tranh để sống sót — đó là đấu tranh sinh tồn.' },
      { h: 'Chọn lọc tự nhiên' },
      { ul: [
        'Cá thể mang biến dị thích nghi với môi trường sẽ sống sót và sinh sản nhiều hơn.',
        'Cá thể kém thích nghi dần bị đào thải.',
        'Qua nhiều thế hệ, các đặc điểm thích nghi được tích luỹ, loài biến đổi.',
      ] },
      { h: 'Kết quả của chọn lọc tự nhiên' },
      { p: 'Chọn lọc tự nhiên dẫn đến sự hình thành các đặc điểm thích nghi và hình thành loài mới, giải thích sự đa dạng và hợp lí của sinh giới.' },
      { h: 'Bằng chứng tiến hoá' },
      { ul: [
        'Bằng chứng hoá thạch: dấu vết sinh vật cổ trong các lớp đất đá.',
        'Bằng chứng giải phẫu so sánh: cơ quan tương đồng (chi trước của người, dơi, cá voi có cùng cấu tạo).',
        'Bằng chứng phôi sinh học và sinh học phân tử (DNA, protein giống nhau giữa các loài họ hàng).',
      ] },
      { h: 'Tiến hoá vẫn đang diễn ra' },
      { p: 'Tiến hoá không chỉ là chuyện quá khứ. Vi khuẩn kháng kháng sinh, sâu bọ kháng thuốc trừ sâu là những ví dụ về chọn lọc tự nhiên đang diễn ra ngay quanh ta.' },
      { note: 'Chọn lọc tự nhiên không phải là "con khoẻ nhất thắng" mà là "con thích nghi nhất với môi trường" sống sót và sinh sản nhiều hơn.' },
    ],
    [
      { q: 'Vì sao việc lạm dụng kháng sinh khiến vi khuẩn dần kháng thuốc?', a: 'Vì trong quần thể vi khuẩn luôn có biến dị: một số ít cá thể tình cờ mang gen kháng kháng sinh. Khi dùng kháng sinh, các vi khuẩn không kháng bị tiêu diệt, còn cá thể kháng sống sót và sinh sản, truyền gen kháng cho đời sau. Qua nhiều thế hệ, cả quần thể trở nên kháng thuốc — đó là chọn lọc tự nhiên.' },
      { q: 'Trong thời kì cách mạng công nghiệp ở Anh, vì sao loài bướm đêm chuyển từ màu sáng sang màu sẫm chiếm ưu thế?', a: 'Khói than làm thân cây phủ bồ hóng đen. Bướm màu sẫm đậu trên cây đen được nguỵ trang tốt, ít bị chim ăn, sống sót và sinh sản nhiều; bướm màu sáng nổi bật, dễ bị bắt. Qua chọn lọc tự nhiên, bướm sẫm màu dần chiếm ưu thế trong quần thể.' },
      { q: 'Nêu ba loại bằng chứng chứng minh sinh vật tiến hoá từ tổ tiên chung.', a: '1) Bằng chứng hoá thạch: tìm thấy dấu vết sinh vật cổ trong các lớp đất đá cho thấy quá trình biến đổi của sinh giới. 2) Bằng chứng giải phẫu so sánh: cơ quan tương đồng như chi trước của người, dơi, cá voi có cùng cấu tạo cơ bản. 3) Bằng chứng sinh học phân tử: các loài họ hàng có DNA và protein giống nhau nhiều.' },
    ]
  ),

  'S9KHTN-w34-quiz': L(
    'Ôn tập KHTN — Tổng hợp',
    'Cả năm học cuối cấp đã gói trọn trong ba phân môn Vật lí, Hoá học, Sinh học. Hôm nay cô trò mình hệ thống lại toàn bộ, kết nối kiến thức liên môn để sẵn sàng cho kì thi vào 10.',
    [
      'Hệ thống kiến thức trọng tâm cả ba phân môn.',
      'Kết nối kiến thức liên môn để giải thích hiện tượng.',
      'Vận dụng giải bài tập tổng hợp.',
    ],
    [
      { h: 'Vật lí — điện và điện từ' },
      { ul: [
        'Định luật Ohm, công suất, điện năng, định luật Joule-Lenz.',
        'Mạch nối tiếp và song song.',
        'Điện từ: nam châm điện, lực điện từ, cảm ứng điện từ, máy biến áp.',
      ] },
      { h: 'Vật lí — quang học' },
      { ul: [
        'Khúc xạ ánh sáng.',
        'Thấu kính hội tụ, phân kì và cách dựng ảnh.',
        'Mắt và các tật của mắt.',
      ] },
      { h: 'Hoá học — vô cơ' },
      { ul: [
        'Tính chất chung của kim loại, dãy hoạt động hoá học.',
        'Nhôm, sắt, gang, thép.',
        'Phi kim, cacbon và các hợp chất (CO, CO₂, muối cacbonat).',
      ] },
      { h: 'Hoá học — hữu cơ' },
      { ul: [
        'Hiđrocacbon: methane, ethylene, acetylene, benzen.',
        'Dẫn xuất: rượu etylic, axit axetic, chất béo.',
        'Gluxit, protein và polyme.',
      ] },
      { h: 'Sinh học — di truyền và tiến hoá' },
      { ul: [
        'Quy luật phân li của Mendel.',
        'Cấu trúc và sao chép DNA; gen, mã di truyền, dịch mã.',
        'Di truyền học người, bệnh di truyền.',
        'Tiến hoá và chọn lọc tự nhiên.',
      ] },
      { h: 'Tư duy liên môn' },
      { p: 'Nhiều hiện tượng cần kiến thức nhiều môn: biến đổi khí hậu (Hoá – khí nhà kính; Sinh – ảnh hưởng sinh vật; Vật lí – năng lượng); ô nhiễm; sức khoẻ và dinh dưỡng.' },
      { note: 'Mẹo ôn: lập sơ đồ tư duy cho từng phân môn, gắn công thức Vật lí với ứng dụng, gắn tính chất Hoá học với phương trình, gắn cơ chế Sinh học với hiện tượng thực tế.' },
    ],
    [
      { q: 'Vì sao biến đổi khí hậu vừa là vấn đề hoá học vừa là vấn đề sinh học?', a: 'Về hoá học: đốt nhiên liệu hoá thạch thải CO₂ và các khí nhà kính (CH₄, N₂O…) làm Trái Đất nóng lên. Về sinh học: nhiệt độ tăng, nước biển dâng, môi trường thay đổi khiến nhiều loài sinh vật mất nơi ở, đảo lộn hệ sinh thái, một số loài có nguy cơ tuyệt chủng.' },
      { q: 'DNA lưu giữ thông tin di truyền như thế nào, và thông tin đó biểu hiện thành tính trạng ra sao?', a: 'DNA lưu thông tin bằng trình tự sắp xếp của 4 loại nucleotide A, T, G, C. Trình tự này được phiên mã thành mARN, rồi dịch mã thành protein. Protein quy định các tính trạng của cơ thể (gen → mARN → protein → tính trạng).' },
      { q: 'Một bóng đèn LED 10 W thay cho bóng sợi đốt 60 W, dùng 5 giờ mỗi ngày. Mỗi ngày tiết kiệm bao nhiêu điện năng?', a: 'Chênh lệch công suất: 60 − 10 = 50 W = 0,05 kW. Mỗi ngày tiết kiệm: A = 0,05 × 5 = 0,25 kWh. Liên hệ thực tế: dùng đèn LED tiết kiệm điện và giảm phát thải CO₂.' },
    ]
  ),

  'S9KHTN-w35-quiz': L(
    'Đề ôn thi vào 10 — KHTN',
    'Tuần cuối cùng rồi các em! Hôm nay cô trò mình luyện đề tổng hợp và ôn lại tâm thế trước kì thi quan trọng. Hãy bình tĩnh, tự tin — các em đã chuẩn bị cả một năm cho ngày này.',
    [
      'Vận dụng tổng hợp kiến thức ba phân môn để làm đề.',
      'Rèn kĩ năng phân bổ thời gian và chiến thuật làm bài.',
      'Chuẩn bị tâm lí vững vàng cho kì thi.',
    ],
    [
      { h: 'Cấu trúc đề KHTN tổng hợp' },
      { ul: [
        'Thường tích hợp cả ba phân môn Vật lí, Hoá học, Sinh học.',
        'Có câu lí thuyết và câu vận dụng tính toán.',
        'Có câu gắn với thực tiễn, hiện tượng đời sống.',
      ] },
      { h: 'Chiến thuật làm bài' },
      { ul: [
        'Đọc lướt toàn đề trước, ước lượng thời gian từng phần.',
        'Làm câu dễ và chắc trước, câu khó để sau.',
        'Với câu trắc nghiệm: loại trừ đáp án sai rõ ràng rồi chọn.',
        'Không bỏ trống câu nào; còn thời gian thì rà soát lại.',
      ] },
      { h: 'Lưu ý phần Vật lí' },
      { ul: [
        'Viết đúng công thức, thay số cẩn thận, kèm đơn vị.',
        'Đổi đơn vị thống nhất trước khi tính (W↔kW, s↔h).',
      ] },
      { h: 'Lưu ý phần Hoá học' },
      { ul: [
        'Cân bằng phương trình, ghi rõ điều kiện và chất khí (↑), kết tủa (↓).',
        'Nhớ dãy hoạt động để xét phản ứng có xảy ra không.',
      ] },
      { h: 'Lưu ý phần Sinh học' },
      { ul: [
        'Nắm chắc tỉ lệ phân li của Mendel và nguyên tắc bổ sung của DNA.',
        'Liên hệ hiện tượng thực tế (kháng kháng sinh, bệnh di truyền).',
      ] },
      { h: 'Chuẩn bị trước ngày thi' },
      { ul: [
        'Soạn đủ dụng cụ: bút, thước, máy tính, giấy tờ tuỳ thân.',
        'Ngủ đủ giấc, ăn sáng đầy đủ, đến phòng thi sớm.',
        'Giữ tâm lí bình tĩnh, hít thở sâu khi căng thẳng.',
      ] },
      { note: 'Kiến thức các em đã tích luỹ suốt cả năm. Hãy tin vào bản thân, làm bài cẩn thận từng câu. Cô chúc các em thi thật tốt và đỗ vào ngôi trường mơ ước!' },
    ],
    [
      { q: 'Khi gặp một câu hỏi tổng hợp KHTN không biết làm ngay, em nên xử lí thế nào?', a: 'Đừng hoảng. Đánh dấu lại và chuyển sang câu khác để không mất thời gian. Với câu trắc nghiệm, hãy loại trừ những đáp án chắc chắn sai trước, rồi suy luận có cơ sở để chọn trong số còn lại. Tuyệt đối không bỏ trống. Cuối giờ quay lại xem xét kĩ hơn.' },
      { q: 'Một bài toán điện cho công suất bằng W và thời gian bằng giờ, yêu cầu tính điện năng theo kWh. Em cần lưu ý gì khi tính?', a: 'Phải đổi công suất từ W sang kW (chia 1000) trước khi nhân với thời gian (giờ) để được kết quả theo kWh. Ví dụ P = 500 W = 0,5 kW, t = 4 h → A = 0,5 × 4 = 2 kWh. Luôn kiểm tra đơn vị để tránh sai số.' },
      { q: 'Nêu một số việc cần làm vào buổi tối trước ngày thi để có trạng thái tốt nhất.', a: 'Soạn đủ dụng cụ và giấy tờ; xem nhẹ lại các công thức, sơ đồ tư duy chứ không nhồi nhét kiến thức mới; ăn uống nhẹ nhàng, tránh đồ lạ; đi ngủ sớm để ngủ đủ giấc; giữ tinh thần thoải mái, tự tin vào những gì mình đã ôn.' },
    ]
  ),

  'S9KHTN-w36-quiz': L(
    'Kết thúc KHTN THCS — Khoa học là hành trình, không phải đích đến',
    'Tuần cuối năm, cô trò mình cùng nhìn lại ba mạch kiến thức lớn của KHTN 9 (Vật lí, Hoá học, Sinh học) — không để ôn thi mà để thấy chúng kết nối với nhau và với thế giới thực như thế nào.',
    [
      'Nhận ra sự liên kết giữa ba phân môn Vật lí, Hoá học, Sinh học trong KHTN.',
      'Hiểu ứng dụng thực tế của kiến thức KHTN trong đời sống hiện đại.',
      'Định hướng học THPT: lựa chọn tổ hợp môn thi phù hợp năng lực và ước mơ.',
    ],
    [
      { h: 'Ba mạch kiến thức KHTN 9 — Kết nối bức tranh lớn' },
      { ul: [
        'Vật lí: điện — từ — ánh sáng — năng lượng. Giải thích mọi thứ từ bóng đèn, động cơ đến viễn thông.',
        'Hoá học: nguyên tố, phản ứng, chất hữu cơ. Nền tảng của vật liệu, dược phẩm, thực phẩm.',
        'Sinh học: di truyền, tiến hoá, hệ sinh thái. Giải mã sự sống và mối quan hệ giữa sinh vật.',
      ] },
      { h: 'KHTN trong thế giới thực' },
      { p: 'Pin điện thoại em dùng hàng ngày = điện hoá học (Hoá). Tiếng nhạc từ loa = sóng âm (Vật lí). Kháng sinh trị bệnh = ứng dụng sinh học phân tử (Sinh). Mọi công nghệ đều có KHTN ở bên trong.' },
      { h: 'Từ THCS lên THPT — KHTN tách ra như thế nào?' },
      { ul: [
        'Lớp 10–12: Vật lí, Hoá học, Sinh học thành ba môn độc lập với nội dung sâu hơn nhiều.',
        'Tổ hợp A00 (Toán-Lí-Hoá) → ngành kĩ thuật, công nghệ, y dược (một phần).',
        'Tổ hợp B00 (Toán-Hoá-Sinh) → ngành y dược, nông lâm, môi trường.',
        'Tổ hợp A01 (Toán-Lí-Anh) → IT, điện tử, kinh tế kĩ thuật.',
      ] },
      { h: 'Lời khuyên cho năm THPT đầu tiên' },
      { ul: [
        'Đừng học thuộc lòng công thức — hiểu nguyên lí để suy ra công thức khi quên.',
        'Luyện bài tập nhiều hơn đọc lí thuyết: KHTN là môn thực hành tư duy.',
        'Kết nối kiến thức giữa ba môn — bài thi tổng hợp ở đại học sẽ yêu cầu điều này.',
      ] },
      { note: 'Khoa học không phải để học thuộc — khoa học là cách nhìn thế giới. Mỗi khi thắc mắc "Tại sao thế này?", đó là lúc em đang làm khoa học. Hãy giữ mãi sự tò mò đó.' },
    ],
    [
      { q: 'Vật lí, Hoá học và Sinh học kết nối với nhau như thế nào trong thực tế?', a: 'Ví dụ quang hợp: Ánh sáng (Vật lí) cung cấp năng lượng → phản ứng hoá học chuyển CO₂ và H₂O thành glucose và O₂ (Hoá học) → cây dùng glucose để sống và sinh trưởng (Sinh học). Hay trong y học: thuốc (Hoá học) tác động lên tế bào (Sinh học) thông qua các tín hiệu điện và hoá học (Vật lí + Hoá). Ba môn không tách rời mà là ba góc nhìn về cùng một thế giới.' },
      { q: 'Làm sao biết mình hợp với tổ hợp KHTN nào ở THPT?', a: 'Hãy tự hỏi: Em thích giải bài toán cơ học và điện (Vật lí)? Hay thích thí nghiệm, phản ứng màu sắc và phân tử (Hoá học)? Hay thích tìm hiểu về cơ thể người, gen và môi trường (Sinh học)? Đam mê và sự tò mò tự nhiên với một lĩnh vực thường dẫn đến thành công hơn là chọn theo điểm số hay xu hướng xã hội.' },
      { q: 'Kiến thức KHTN nào em thấy ứng dụng nhiều nhất trong cuộc sống hàng ngày?', a: 'Điện học (Vật lí): hiểu sao không nên sạc điện thoại qua đêm, cách đấu nối thiết bị điện an toàn. Hoá học: biết không trộn thuốc tẩy và giấm, hiểu vì sao thực phẩm lên men. Sinh học: biết vi khuẩn và kháng sinh hoạt động thế nào để dùng thuốc đúng cách. KHTN luôn hiện diện trong từng quyết định hàng ngày của chúng ta.' },
    ]
  ),
};
