// ============================================================
// Lớp 1 · TOÁN — Lý thuyết + Ví dụ 35 tuần (GDPT 2018)
// Key TRÙNG id quiz: "P1-wNN-quiz".
// Giọng cô giáo lớp 1: rất nhẹ nhàng, câu ngắn, từ đơn giản.
// ============================================================

export const P1_TOAN_LESSONS = {
  // ──────────────── HK1 ────────────────
  'P1-w01-quiz': {
    topic: 'Làm quen với trường lớp · Vị trí',
    intro: 'Chào các em! Hôm nay cô dạy các em cách nói vị trí của đồ vật quanh mình nhé.',
    objectives: [
      'Nhận biết các vị trí: trên – dưới, trước – sau, phải – trái.',
      'Dùng đúng từ chỉ vị trí khi nói.',
    ],
    theory: [
      { h: 'Các từ chỉ vị trí' },
      { p: 'Quả bóng nằm TRÊN bàn. Con mèo nằm DƯỚI ghế. Em đứng TRƯỚC bảng. Bạn ngồi SAU em.' },
      { ul: ['trên – dưới', 'trước – sau', 'phải – trái'] },
      { h: 'Tay phải, tay trái' },
      { p: 'Đa số các em viết bằng tay PHẢI. Tay còn lại là tay TRÁI.' },
      { note: 'Hãy nhìn quanh lớp và gọi tên vị trí của các đồ vật em thấy nhé.' },
    ],
    examples: [
      { q: 'Quyển sách nằm TRÊN bàn. Bàn ở đâu so với sách?', a: 'Sách ở TRÊN bàn nên bàn ở DƯỚI sách.' },
      { q: 'Bạn Lan đứng trước em. Em đứng ở đâu so với bạn Lan?', a: 'Em đứng SAU bạn Lan.' },
    ],
  },

  'P1-w02-quiz': {
    topic: 'Các số 1, 2, 3',
    intro: 'Các em ơi, cô con mình cùng làm quen với ba con số đầu tiên: 1, 2 và 3 nhé!',
    objectives: [
      'Đếm và viết được các số 1, 2, 3.',
      'Biết số nào đứng trước, số nào đứng sau.',
    ],
    theory: [
      { h: 'Đếm 1 – 2 – 3' },
      { p: 'Một quả táo: 1. Hai quả táo: 2. Ba quả táo: 3.' },
      { ul: ['Số 1 đứng đầu tiên.', 'Số 2 đứng sau số 1.', 'Số 3 đứng sau số 2.'] },
      { h: 'So sánh' },
      { p: 'Trong 1, 2, 3: số 1 BÉ NHẤT, số 3 LỚN NHẤT.' },
      { note: 'Em hãy đếm 3 ngón tay của mình xem nào!' },
    ],
    examples: [
      { q: 'Đếm: ★ ★ ★. Có mấy ngôi sao?', a: 'Em đếm 1, 2, 3. Có 3 ngôi sao.' },
      { q: 'Số nào đứng SAU số 2?', a: 'Sau số 2 là số 3.' },
    ],
  },

  'P1-w03-quiz': {
    topic: 'Các số 4, 5',
    intro: 'Tuần này các em học thêm hai số mới: 4 và 5. Cô tin các em sẽ học rất nhanh!',
    objectives: [
      'Đếm và viết được các số 4, 5.',
      'Tìm được số liền trước, số liền sau.',
    ],
    theory: [
      { h: 'Số 4 và số 5' },
      { p: 'Bốn ngón tay: 4. Năm ngón tay trên một bàn tay: 5.' },
      { ul: ['Sau số 3 là số 4.', 'Sau số 4 là số 5.', 'Trên một bàn tay có đúng 5 ngón.'] },
      { h: 'Liền trước – liền sau' },
      { p: 'Số liền sau lớn hơn 1. Số liền trước bé hơn 1.' },
      { note: 'Một bàn tay có 5 ngón – em hãy đếm thử nhé!' },
    ],
    examples: [
      { q: 'Số liền sau của 4 là số nào?', a: 'Lấy 4 + 1 = 5. Vậy số liền sau của 4 là 5.' },
      { q: 'Có 5 viên kẹo, em ăn 1 viên. Còn lại mấy viên?', a: '5 bớt 1 còn 4. Vậy còn 4 viên kẹo.' },
    ],
  },

  'P1-w04-quiz': {
    topic: 'Nhiều hơn – Ít hơn – Bằng nhau',
    intro: 'Các em ơi, hôm nay cô dạy cách so sánh hai nhóm đồ vật: cái nào nhiều, cái nào ít nhé.',
    objectives: [
      'Biết so sánh hai nhóm: nhiều hơn, ít hơn, bằng nhau.',
      'Làm quen với dấu < , > , =.',
    ],
    theory: [
      { h: 'Cách so sánh' },
      { p: 'Em ghép từng cặp một. Bên nào còn dư là bên NHIỀU HƠN. Bên nào hết trước là bên ÍT HƠN.' },
      { ul: ['Dấu > là LỚN HƠN.', 'Dấu < là BÉ HƠN.', 'Dấu = là BẰNG NHAU.'] },
      { h: 'Mẹo nhớ' },
      { p: 'Miệng dấu < và > luôn HÁ về phía số LỚN HƠN.' },
      { note: 'Số nhỏ ăn ít, số to ăn nhiều – nên miệng há về số to.' },
    ],
    examples: [
      { q: 'So sánh 3 bông hoa và 5 cái lá: bên nào ít hơn?', a: '3 bé hơn 5, nên hoa ít hơn lá.' },
      { q: 'Điền dấu: 2 … 4', a: '2 bé hơn 4, em điền dấu <. Ta có 2 < 4.' },
    ],
  },

  'P1-w05-quiz': {
    topic: 'Các số 6, 7, 8, 9, 10',
    intro: 'Tuần này cô dạy các em đếm tới 10. Đếm xong, các em sẽ biết tất cả số có một chữ số rồi đó!',
    objectives: [
      'Đếm, đọc, viết các số từ 6 đến 10.',
      'Biết số 10 gồm 1 chục và 0 đơn vị.',
    ],
    theory: [
      { h: 'Đếm tiếp từ 5' },
      { p: 'Sau 5 là 6. Sau 6 là 7. Cứ thế: 6, 7, 8, 9, 10.' },
      { ul: ['Số 10 là số đầu tiên có HAI chữ số.', '10 = 1 chục và 0 đơn vị.', 'Hai bàn tay có 10 ngón.'] },
      { note: 'Em vừa giơ tay vừa đếm tới 10 cho thuộc nhé!' },
    ],
    examples: [
      { q: 'Số liền sau của 9 là số nào?', a: '9 + 1 = 10. Vậy số liền sau của 9 là 10.' },
      { q: 'Số 10 gồm mấy chục và mấy đơn vị?', a: '10 = 1 chục và 0 đơn vị.' },
    ],
  },

  'P1-w06-quiz': {
    topic: 'Số 0',
    intro: 'Các em ơi, hôm nay cô giới thiệu một số rất đặc biệt: số 0 – có nghĩa là KHÔNG CÓ GÌ.',
    objectives: [
      'Hiểu ý nghĩa của số 0.',
      'Biết các phép tính cộng, trừ với số 0.',
    ],
    theory: [
      { h: 'Số 0 nghĩa là gì?' },
      { p: 'Trong giỏ có 3 quả táo. Em ăn hết 3 quả. Còn 0 quả. Vậy 0 nghĩa là KHÔNG CÓ.' },
      { ul: ['Số bất kì cộng với 0 vẫn giữ nguyên: 5 + 0 = 5.', 'Số bất kì trừ đi 0 vẫn giữ nguyên: 7 − 0 = 7.', 'Một số trừ chính nó bằng 0: 4 − 4 = 0.'] },
      { note: 'Số 0 đứng đầu trong dãy số: 0, 1, 2, 3, ...' },
    ],
    examples: [
      { q: '5 + 0 bằng mấy?', a: 'Cộng với 0 thì giữ nguyên. 5 + 0 = 5.' },
      { q: 'Có 4 cái kẹo, em ăn hết 4 cái. Còn bao nhiêu?', a: '4 − 4 = 0. Vậy không còn cái nào.' },
    ],
  },

  'P1-w07-quiz': {
    topic: 'So sánh các số trong phạm vi 10',
    intro: 'Các em đã biết các số từ 0 đến 10. Bây giờ cô dạy cách so sánh chúng nhé!',
    objectives: [
      'So sánh hai số trong phạm vi 10.',
      'Sắp xếp các số theo thứ tự.',
    ],
    theory: [
      { h: 'So sánh hai số' },
      { p: 'Số nào đứng SAU trong dãy 0, 1, 2, ..., 10 thì LỚN HƠN.' },
      { ul: ['6 < 9 (6 bé hơn 9).', '10 > 7 (10 lớn hơn 7).', '8 = 8 (bằng nhau).'] },
      { h: 'Sắp xếp tăng dần' },
      { p: 'Tăng dần là từ BÉ tới LỚN. Em chọn số bé nhất trước, rồi số lớn dần.' },
      { note: 'Miệng dấu < hay > luôn HÁ về phía số lớn.' },
    ],
    examples: [
      { q: 'Điền dấu: 6 … 9', a: '6 bé hơn 9, em điền <. Ta có 6 < 9.' },
      { q: 'Sắp xếp tăng dần: 5, 2, 8, 3', a: 'Bé nhất là 2, rồi 3, rồi 5, lớn nhất là 8. Kết quả: 2, 3, 5, 8.' },
    ],
  },

  'P1-w08-quiz': {
    topic: 'Hình vuông – Hình tròn – Hình tam giác – Hình chữ nhật',
    intro: 'Hôm nay các em làm quen với 4 hình rất quen thuộc quanh mình nhé!',
    objectives: [
      'Nhận biết hình vuông, hình tròn, hình tam giác, hình chữ nhật.',
      'Tìm các đồ vật có hình dạng tương ứng.',
    ],
    theory: [
      { h: 'Bốn hình thường gặp' },
      { ul: ['Hình VUÔNG: có 4 cạnh BẰNG NHAU.', 'Hình CHỮ NHẬT: có 4 cạnh, hai cạnh dài bằng nhau, hai cạnh ngắn bằng nhau.', 'Hình TAM GIÁC: có 3 cạnh.', 'Hình TRÒN: không có cạnh thẳng.'] },
      { h: 'Đồ vật quen thuộc' },
      { p: 'Mặt đồng hồ thường tròn. Cái bảng đen thường là hình chữ nhật. Mái nhà thường là hình tam giác.' },
      { note: 'Hãy nhìn quanh phòng và gọi tên các hình em thấy nhé!' },
    ],
    examples: [
      { q: 'Hình nào có 4 cạnh bằng nhau?', a: 'Đó là hình VUÔNG.' },
      { q: 'Mặt đồng hồ treo tường thường có hình gì?', a: 'Mặt đồng hồ thường có hình TRÒN.' },
    ],
  },

  'P1-w09-quiz': {
    topic: 'Phép cộng trong phạm vi 6',
    intro: 'Các em ơi, hôm nay cô dạy phép CỘNG – thêm vào. Cùng cô làm quen nhé!',
    objectives: [
      'Hiểu phép cộng là gộp thêm.',
      'Thực hiện được phép cộng trong phạm vi 6.',
    ],
    theory: [
      { h: 'Cộng là gộp lại' },
      { p: 'Em có 2 quả táo, mẹ cho thêm 3 quả. Tất cả là 2 + 3 = 5 quả.' },
      { ul: ['Dấu + đọc là "cộng".', 'Cộng nghĩa là THÊM VÀO.', 'Khi đổi chỗ hai số, kết quả không đổi: 2 + 3 = 3 + 2 = 5.'] },
      { note: 'Em có thể dùng ngón tay để đếm khi cộng.' },
    ],
    examples: [
      { q: '2 + 3 bằng mấy?', a: 'Em giơ 2 ngón rồi giơ thêm 3 ngón. Đếm tất cả: 1, 2, 3, 4, 5. Vậy 2 + 3 = 5.' },
      { q: 'Có 4 con cá, thả thêm 2 con. Có tất cả mấy con?', a: '4 + 2 = 6. Vậy có 6 con cá.' },
    ],
  },

  'P1-w10-quiz': {
    topic: 'Phép cộng trong phạm vi 10',
    intro: 'Các em đã cộng giỏi tới 6 rồi. Bây giờ cô dạy các em cộng tới 10 nhé!',
    objectives: [
      'Thực hiện được phép cộng trong phạm vi 10.',
      'Áp dụng vào bài toán đơn giản.',
    ],
    theory: [
      { h: 'Cộng đến 10' },
      { p: 'Hai bàn tay có 10 ngón. Em dùng tay để đếm khi cộng.' },
      { ul: ['5 + 5 = 10.', '6 + 4 = 10.', '7 + 3 = 10.', '8 + 2 = 10.', '9 + 1 = 10.'] },
      { h: 'Mẹo nhớ "tròn 10"' },
      { p: 'Hai số bù nhau cho ra 10 gọi là "cặp 10". Học thuộc cặp 10 sẽ tính rất nhanh.' },
      { note: 'Cộng số nào với 0 cũng giữ nguyên số đó.' },
    ],
    examples: [
      { q: '6 + 3 bằng mấy?', a: 'Em đếm từ 6 lên 3 nữa: 7, 8, 9. Vậy 6 + 3 = 9.' },
      { q: 'Có 6 quả cam, mua thêm 4 quả. Tất cả mấy quả?', a: '6 + 4 = 10. Vậy có 10 quả cam.' },
    ],
  },

  'P1-w11-quiz': {
    topic: 'Phép trừ trong phạm vi 6',
    intro: 'Sau cộng là TRỪ – bớt đi. Các em cùng cô tìm hiểu nhé!',
    objectives: [
      'Hiểu phép trừ là bớt đi.',
      'Thực hiện được phép trừ trong phạm vi 6.',
    ],
    theory: [
      { h: 'Trừ là bớt đi' },
      { p: 'Em có 5 viên kẹo, ăn 2 viên. Còn lại 5 − 2 = 3 viên.' },
      { ul: ['Dấu − đọc là "trừ".', 'Trừ nghĩa là BỚT ĐI.', 'Số trừ KHÔNG được lớn hơn số bị trừ (ở lớp 1).'] },
      { note: 'Một số trừ chính nó luôn bằng 0. Trừ đi 0 thì giữ nguyên.' },
    ],
    examples: [
      { q: '5 − 2 bằng mấy?', a: 'Em có 5 ngón, gập 2 ngón. Còn 3 ngón. Vậy 5 − 2 = 3.' },
      { q: 'Có 6 viên kẹo, em cho bạn 2 viên. Còn mấy viên?', a: '6 − 2 = 4. Vậy còn 4 viên kẹo.' },
    ],
  },

  'P1-w12-quiz': {
    topic: 'Phép trừ trong phạm vi 10',
    intro: 'Các em đã trừ tốt trong phạm vi 6. Bây giờ cô mở rộng tới 10 nhé!',
    objectives: [
      'Thực hiện được phép trừ trong phạm vi 10.',
      'Giải bài toán đơn giản về bớt đi.',
    ],
    theory: [
      { h: 'Trừ đến 10' },
      { p: 'Em dùng ngón tay: giơ đủ số bị trừ, gập đi số trừ, đếm số còn lại.' },
      { ul: ['10 − 1 = 9.', '10 − 5 = 5.', '10 − 10 = 0.', 'Trừ 0 giữ nguyên: 7 − 0 = 7.'] },
      { note: 'Trừ ngược của cộng. Nếu 3 + 4 = 7 thì 7 − 4 = 3.' },
    ],
    examples: [
      { q: '9 − 4 bằng mấy?', a: 'Em đếm lùi từ 9 bốn bước: 8, 7, 6, 5. Vậy 9 − 4 = 5.' },
      { q: 'Mẹ có 10 cái bánh, cho em 4 cái. Còn mấy cái?', a: '10 − 4 = 6. Vậy mẹ còn 6 cái bánh.' },
    ],
  },

  'P1-w13-quiz': {
    topic: 'Luyện tập cộng – trừ trong phạm vi 10',
    intro: 'Hôm nay cô con mình cùng luyện tập cả cộng và trừ cho thật giỏi nhé!',
    objectives: [
      'Tính được dãy có cả cộng và trừ.',
      'Tìm số còn thiếu trong phép tính.',
    ],
    theory: [
      { h: 'Tính từ trái sang phải' },
      { p: 'Khi có nhiều phép tính, em làm TỪ TRÁI sang PHẢI: tính phép đầu tiên trước, rồi tính tiếp.' },
      { ul: ['3 + 4 − 2: tính 3 + 4 = 7, rồi 7 − 2 = 5.', '10 − 5 + 3: tính 10 − 5 = 5, rồi 5 + 3 = 8.'] },
      { h: 'Tìm số còn thiếu' },
      { p: 'Nếu 3 + ? = 8, em đếm từ 3 lên 8: cần thêm 5. Vậy ? = 5.' },
      { note: 'Tính chậm, kĩ – đừng vội nhé các em.' },
    ],
    examples: [
      { q: '3 + 4 − 2 = ?', a: 'Trước hết 3 + 4 = 7. Sau đó 7 − 2 = 5. Kết quả là 5.' },
      { q: 'Số nào cộng với 3 bằng 8?', a: 'Em tìm số đó: 8 − 3 = 5. Vậy 5 + 3 = 8.' },
    ],
  },

  'P1-w14-quiz': {
    topic: 'Các số có hai chữ số: 10, 20, 30, …',
    intro: 'Các em ơi, hôm nay cô dạy các số TRÒN CHỤC như 10, 20, 30, ... rất dễ thuộc!',
    objectives: [
      'Đọc và viết các số tròn chục.',
      'Hiểu 1 chục bằng 10 đơn vị.',
    ],
    theory: [
      { h: '1 chục là gì?' },
      { p: 'Một chục bằng 10 đơn vị. Hai chục là 20. Ba chục là 30. ...' },
      { ul: ['10 đọc là "mười".', '20 đọc là "hai mươi".', '50 đọc là "năm mươi".', '90 đọc là "chín mươi".'] },
      { h: 'Cấu tạo' },
      { p: 'Số tròn chục có chữ số đơn vị là 0. Ví dụ 70 có 7 chục và 0 đơn vị.' },
      { note: 'Em đếm theo chục: 10, 20, 30, 40, 50, 60, 70, 80, 90.' },
    ],
    examples: [
      { q: 'Số 30 đọc là gì?', a: 'Đọc là "ba mươi".' },
      { q: 'Số 50 gồm mấy chục và mấy đơn vị?', a: '50 = 5 chục và 0 đơn vị.' },
    ],
  },

  'P1-w15-quiz': {
    topic: 'Các số từ 11 đến 20',
    intro: 'Sau số 10, các em cùng cô làm quen với các số 11, 12, ... đến 20 nhé!',
    objectives: [
      'Đọc, viết các số từ 11 đến 20.',
      'Hiểu mỗi số gồm 1 chục và một số đơn vị.',
    ],
    theory: [
      { h: 'Cấu tạo từ 11 đến 19' },
      { p: 'Mỗi số đều có 1 chục và một số đơn vị. Ví dụ 15 = 1 chục + 5 đơn vị.' },
      { ul: ['11 = 1 chục + 1 đơn vị.', '17 = 1 chục + 7 đơn vị.', '19 = 1 chục + 9 đơn vị.', '20 = 2 chục + 0 đơn vị.'] },
      { h: 'Cách đọc' },
      { p: 'Đọc "mười một", "mười hai", ..., "mười chín", rồi "hai mươi".' },
      { note: 'Số liền sau 19 là 20.' },
    ],
    examples: [
      { q: 'Số 15 gồm mấy chục và mấy đơn vị?', a: '15 = 1 chục và 5 đơn vị.' },
      { q: 'Số liền sau của 19 là số nào?', a: '19 + 1 = 20. Vậy số liền sau là 20.' },
    ],
  },

  'P1-w16-quiz': {
    topic: 'Đo độ dài bằng xăng-ti-mét (cm)',
    intro: 'Các em ơi, hôm nay cô dạy cách đo độ dài bằng đơn vị xăng-ti-mét (cm) nhé!',
    objectives: [
      'Biết cm là đơn vị đo độ dài.',
      'Đo và cộng, trừ độ dài đơn giản theo cm.',
    ],
    theory: [
      { h: 'Đơn vị xăng-ti-mét' },
      { p: 'Để đo độ dài, em dùng thước kẻ. Đơn vị là xăng-ti-mét, viết tắt là cm.' },
      { ul: ['Thước kẻ học sinh thường dài 20 cm.', 'Bút chì thường dài khoảng 15 cm.', 'Một ngón tay người lớn rộng khoảng 1 cm.'] },
      { h: 'Cộng, trừ độ dài' },
      { p: 'Cộng, trừ các số đo cm như cộng, trừ số bình thường. Nhớ viết "cm" sau kết quả.' },
      { note: 'Đặt vạch 0 của thước trùng với một đầu đoạn cần đo.' },
    ],
    examples: [
      { q: '5 cm + 3 cm bằng bao nhiêu?', a: '5 + 3 = 8. Vậy 5 cm + 3 cm = 8 cm.' },
      { q: '10 cm − 4 cm bằng bao nhiêu?', a: '10 − 4 = 6. Vậy 10 cm − 4 cm = 6 cm.' },
    ],
  },

  'P1-w17-quiz': {
    topic: 'Ôn tập cuối HK1 (1)',
    intro: 'Cả học kì các em đã học rất nhiều. Hôm nay cô con mình cùng ôn lại nhé!',
    objectives: [
      'Ôn cộng, trừ trong phạm vi 10.',
      'Ôn số liền trước, liền sau, hình học cơ bản.',
    ],
    theory: [
      { h: 'Nhớ lại các kiến thức' },
      { ul: ['Cộng: thêm vào.', 'Trừ: bớt đi.', 'Số liền sau = số + 1.', 'Số liền trước = số − 1.', 'Hình vuông có 4 cạnh bằng nhau.'] },
      { h: 'Mẹo tính nhanh' },
      { p: 'Cộng với 0 hoặc trừ đi 0 luôn giữ nguyên. Một số trừ chính nó luôn bằng 0.' },
      { note: 'Hãy đọc kĩ đề trước khi tính nhé.' },
    ],
    examples: [
      { q: '8 + 2 bằng mấy?', a: '8 + 2 = 10.' },
      { q: '3 + ? = 7. Tìm số còn thiếu.', a: '7 − 3 = 4. Vậy ? = 4.' },
    ],
  },

  'P1-w18-quiz': {
    topic: 'Ôn tập cuối HK1 (2)',
    intro: 'Một học kì sắp kết thúc rồi. Cô cùng các em ôn nốt nhé!',
    objectives: [
      'Sắp xếp các số tăng dần, giảm dần.',
      'Giải bài toán có lời văn đơn giản.',
    ],
    theory: [
      { h: 'Tăng dần – giảm dần' },
      { p: 'TĂNG dần là từ bé tới lớn. GIẢM dần là từ lớn tới bé.' },
      { ul: ['Tăng dần: 2 < 4 < 7 < 9.', 'Giảm dần: 9 > 7 > 4 > 2.'] },
      { h: 'Bài toán có lời văn' },
      { p: 'Đọc đề, tìm xem có THÊM (cộng) hay BỚT (trừ), rồi tính.' },
      { note: 'Khi đếm, đừng quên số 0 luôn đứng đầu dãy số.' },
    ],
    examples: [
      { q: 'Sắp xếp giảm dần: 4, 9, 2, 7', a: 'Lớn nhất là 9, rồi 7, rồi 4, bé nhất là 2. Kết quả: 9, 7, 4, 2.' },
      { q: 'Có 5 con vịt, thêm 3 con. Tất cả mấy con?', a: '5 + 3 = 8. Vậy có 8 con vịt.' },
    ],
  },

  // ──────────────── HK2 ────────────────
  'P1-w19-quiz': {
    topic: 'Các số từ 21 đến 50',
    intro: 'Học kì mới, cô con mình bắt đầu với các số lớn hơn: từ 21 tới 50 nhé!',
    objectives: [
      'Đọc, viết các số từ 21 đến 50.',
      'Phân tích số thành chục và đơn vị.',
    ],
    theory: [
      { h: 'Cấu tạo' },
      { p: 'Số có 2 chữ số. Chữ số bên trái là CHỤC, bên phải là ĐƠN VỊ.' },
      { ul: ['35 = 3 chục + 5 đơn vị.', '42 = 4 chục + 2 đơn vị.', '50 = 5 chục + 0 đơn vị.'] },
      { h: 'Cách đọc' },
      { p: 'Đọc số chục trước, rồi đọc "mươi", rồi đọc số đơn vị. Ví dụ 42 đọc "bốn mươi hai".' },
      { note: 'Số kết thúc bằng 5 thì đọc "lăm": 25 đọc "hai mươi lăm".' },
    ],
    examples: [
      { q: 'Số 35 gồm mấy chục mấy đơn vị?', a: '35 = 3 chục và 5 đơn vị.' },
      { q: 'Số 4 chục + 7 đơn vị là số nào?', a: '40 + 7 = 47. Vậy là số 47.' },
    ],
  },

  'P1-w20-quiz': {
    topic: 'Các số từ 51 đến 99',
    intro: 'Cô con mình tiếp tục với các số từ 51 tới 99 nhé. Sắp tròn trăm rồi đó!',
    objectives: [
      'Đọc, viết các số từ 51 đến 99.',
      'Biết 99 là số lớn nhất có 2 chữ số.',
    ],
    theory: [
      { h: 'Đọc số' },
      { p: 'Đọc chục trước, rồi "mươi", rồi đơn vị. Ví dụ 65 đọc "sáu mươi lăm".' },
      { ul: ['78 = 7 chục + 8 đơn vị.', '90 = 9 chục + 0 đơn vị.', '99 = 9 chục + 9 đơn vị (số lớn nhất có 2 chữ số).'] },
      { h: 'So sánh' },
      { p: 'So sánh chục trước. Chục lớn hơn thì số lớn hơn. Nếu chục bằng nhau thì xét đơn vị.' },
      { note: 'Sau 99 sẽ là 100 – tròn trăm!' },
    ],
    examples: [
      { q: 'Số 78 gồm mấy chục mấy đơn vị?', a: '78 = 7 chục và 8 đơn vị.' },
      { q: 'Sắp xếp tăng dần: 72, 65, 80, 59', a: 'Bé nhất là 59, rồi 65, rồi 72, lớn nhất là 80. Kết quả: 59, 65, 72, 80.' },
    ],
  },

  'P1-w21-quiz': {
    topic: 'Số 100 · Bảng số đến 100',
    intro: 'Các em ơi, hôm nay cô giới thiệu một số rất đặc biệt: số 100 – tròn TRĂM!',
    objectives: [
      'Đọc, viết số 100.',
      'Biết 100 = 10 chục và là số bé nhất có 3 chữ số.',
    ],
    theory: [
      { h: 'Số 100' },
      { p: 'Sau 99 là 100. Đọc là "một trăm".' },
      { ul: ['100 = 10 chục.', '100 là số nhỏ nhất có 3 chữ số.', '100 viết bằng chữ số 1 và hai chữ số 0.'] },
      { note: 'Bảng số từ 1 đến 100 giúp em đếm và tìm số rất dễ dàng.' },
    ],
    examples: [
      { q: 'Số liền sau của 99 là số nào?', a: '99 + 1 = 100. Vậy số liền sau là 100.' },
      { q: 'Số 100 gồm mấy chục?', a: '100 = 10 chục.' },
    ],
  },

  'P1-w22-quiz': {
    topic: 'Nghỉ Tết (ôn nhẹ)',
    intro: 'Tuần này các em được nghỉ Tết. Cô con mình cùng ôn nhẹ và tìm hiểu về Tết nhé!',
    objectives: [
      'Biết một năm có 12 tháng.',
      'Hiểu phong tục Tết cổ truyền Việt Nam.',
    ],
    theory: [
      { h: 'Một năm – 12 tháng' },
      { p: 'Một năm có 12 tháng. Tết Nguyên đán là tháng 1 âm lịch.' },
      { ul: ['Bánh chưng có hình VUÔNG.', 'Bánh tét có hình TRỤ DÀI.', 'Lì xì đựng trong phong bao ĐỎ.'] },
      { note: 'Tết là dịp em sum vầy cùng ông bà, cha mẹ và chúc nhau những điều tốt lành.' },
    ],
    examples: [
      { q: 'Một năm có mấy tháng?', a: 'Một năm có 12 tháng.' },
      { q: 'Bánh chưng có hình gì?', a: 'Bánh chưng có hình VUÔNG, tượng trưng cho đất.' },
    ],
  },

  'P1-w23-quiz': {
    topic: 'Phép cộng số có 2 chữ số (không nhớ)',
    intro: 'Sau Tết, các em cùng cô học cộng các số lớn hơn nhé. Hôm nay là phép cộng KHÔNG NHỚ.',
    objectives: [
      'Cộng hai số có 2 chữ số không nhớ.',
      'Đặt tính cộng theo cột.',
    ],
    theory: [
      { h: 'Cộng theo cột' },
      { p: 'Đặt số dưới số, đơn vị thẳng đơn vị, chục thẳng chục. Cộng đơn vị trước, rồi cộng chục.' },
      { ul: ['25 + 14: 5 + 4 = 9; 2 + 1 = 3. Kết quả 39.', '30 + 20 = 50 (3 chục + 2 chục).'] },
      { h: '"Không nhớ" nghĩa là gì?' },
      { p: 'Cộng đơn vị mà không vượt quá 9 thì không cần "nhớ" sang chục.' },
      { note: 'Luôn cộng từ ĐƠN VỊ trước (cột bên phải).' },
    ],
    examples: [
      { q: '25 + 14 bằng mấy?', a: 'Đơn vị: 5 + 4 = 9. Chục: 2 + 1 = 3. Kết quả là 39.' },
      { q: 'Có 32 quyển sách, mua thêm 15 quyển. Tổng?', a: '32 + 15 = 47. Vậy có 47 quyển sách.' },
    ],
  },

  'P1-w24-quiz': {
    topic: 'Phép trừ số có 2 chữ số (không nhớ)',
    intro: 'Sau cộng đến trừ. Hôm nay cô dạy các em trừ số có 2 chữ số KHÔNG NHỚ nhé.',
    objectives: [
      'Trừ hai số có 2 chữ số không nhớ.',
      'Đặt tính trừ theo cột.',
    ],
    theory: [
      { h: 'Trừ theo cột' },
      { p: 'Đặt số dưới số, đơn vị thẳng đơn vị, chục thẳng chục. Trừ đơn vị trước, rồi trừ chục.' },
      { ul: ['58 − 24: 8 − 4 = 4; 5 − 2 = 3. Kết quả 34.', '70 − 30 = 40 (7 chục − 3 chục).'] },
      { h: '"Không nhớ"' },
      { p: 'Khi đơn vị trên LỚN HƠN hoặc BẰNG đơn vị dưới thì không cần "mượn".' },
      { note: 'Luôn trừ từ ĐƠN VỊ trước.' },
    ],
    examples: [
      { q: '58 − 24 bằng mấy?', a: 'Đơn vị: 8 − 4 = 4. Chục: 5 − 2 = 3. Kết quả là 34.' },
      { q: 'Có 47 quả táo, ăn 12 quả. Còn mấy quả?', a: '47 − 12 = 35. Vậy còn 35 quả táo.' },
    ],
  },

  'P1-w25-quiz': {
    topic: 'Luyện tập cộng – trừ',
    intro: 'Hôm nay cô con mình cùng luyện tập cộng – trừ thật nhuần nhuyễn nhé!',
    objectives: [
      'Tính được dãy phép cộng – trừ liên tiếp.',
      'Tìm số còn thiếu trong phép tính.',
    ],
    theory: [
      { h: 'Tính từ trái sang phải' },
      { p: 'Với dãy nhiều phép tính, em làm từng phép từ trái sang phải.' },
      { ul: ['20 + 30 − 10: làm 20 + 30 = 50 trước, rồi 50 − 10 = 40.', '30 + 40 + 20 = 90.'] },
      { h: 'Tìm số còn thiếu' },
      { p: 'Nếu ? + 20 = 50, em làm phép trừ: 50 − 20 = 30. Vậy ? = 30.' },
      { note: 'Đặt tính cho thẳng cột để không sai.' },
    ],
    examples: [
      { q: '20 + 30 − 10 = ?', a: 'Trước hết 20 + 30 = 50. Sau đó 50 − 10 = 40. Kết quả 40.' },
      { q: 'Số nào cộng với 20 bằng 50?', a: '50 − 20 = 30. Vậy số đó là 30.' },
    ],
  },

  'P1-w26-quiz': {
    topic: 'Điểm – Đoạn thẳng',
    intro: 'Hôm nay các em làm quen với hình học mới: ĐIỂM và ĐOẠN THẲNG nhé!',
    objectives: [
      'Nhận biết điểm và đoạn thẳng.',
      'Biết vẽ đoạn thẳng bằng thước kẻ.',
    ],
    theory: [
      { h: 'Điểm là gì?' },
      { p: 'Điểm là một dấu chấm nhỏ, được đặt tên bằng chữ in hoa: A, B, C, ...' },
      { h: 'Đoạn thẳng' },
      { p: 'Nối hai điểm A và B bằng nét thẳng, ta được đoạn thẳng AB.' },
      { ul: ['Đoạn thẳng có hai đầu, gọi là hai điểm.', 'Dùng thước kẻ để vẽ đoạn thẳng.', 'So sánh đoạn thẳng bằng cách đo độ dài.'] },
      { note: 'Cây thước kẻ là bạn tốt giúp em vẽ đoạn thẳng đẹp.' },
    ],
    examples: [
      { q: 'Hai đầu của đoạn thẳng gọi là gì?', a: 'Hai đầu của đoạn thẳng là HAI ĐIỂM.' },
      { q: 'Dụng cụ để vẽ đoạn thẳng là gì?', a: 'Dùng THƯỚC KẺ.' },
    ],
  },

  'P1-w27-quiz': {
    topic: 'Các ngày trong tuần · Lịch',
    intro: 'Các em ơi, một tuần có mấy ngày? Hôm nay cô dạy về các ngày trong tuần nhé!',
    objectives: [
      'Biết một tuần có 7 ngày.',
      'Đọc tên các ngày trong tuần theo thứ tự.',
    ],
    theory: [
      { h: 'Một tuần 7 ngày' },
      { p: 'Một tuần có 7 ngày: Thứ Hai, Thứ Ba, Thứ Tư, Thứ Năm, Thứ Sáu, Thứ Bảy, Chủ Nhật.' },
      { ul: ['Em đi học từ Thứ Hai đến Thứ Sáu.', 'Thứ Bảy và Chủ Nhật là ngày nghỉ.', 'Sau Chủ Nhật lại quay về Thứ Hai – một tuần mới.'] },
      { note: 'Em hãy xem lịch trong nhà để biết hôm nay là thứ mấy nhé.' },
    ],
    examples: [
      { q: 'Một tuần có mấy ngày?', a: 'Một tuần có 7 ngày.' },
      { q: 'Hôm nay là Thứ Ba, ngày mai là thứ mấy?', a: 'Sau Thứ Ba là Thứ Tư. Vậy ngày mai là Thứ Tư.' },
    ],
  },

  'P1-w28-quiz': {
    topic: 'Đồng hồ – Đọc giờ đúng',
    intro: 'Cô con mình cùng học cách xem đồng hồ nhé. Quan trọng lắm đó các em!',
    objectives: [
      'Phân biệt kim giờ và kim phút.',
      'Đọc được giờ đúng trên đồng hồ.',
    ],
    theory: [
      { h: 'Hai kim đồng hồ' },
      { ul: ['Kim NGẮN là kim GIỜ.', 'Kim DÀI là kim PHÚT.', 'Mặt đồng hồ có 12 số.'] },
      { h: 'Giờ đúng' },
      { p: 'Khi kim phút chỉ số 12, kim giờ chỉ số nào thì đó là giờ đúng. Ví dụ kim phút ở 12, kim giờ ở 3 thì là 3 giờ đúng.' },
      { note: 'Buổi sáng em thường đi học khoảng 7 giờ.' },
    ],
    examples: [
      { q: 'Kim phút chỉ số 12, kim giờ chỉ số 3. Là mấy giờ?', a: 'Đó là 3 giờ đúng.' },
      { q: 'Kim nào là kim giờ?', a: 'Kim NGẮN là kim giờ.' },
    ],
  },

  'P1-w29-quiz': {
    topic: 'Tiền Việt Nam (giới thiệu)',
    intro: 'Hôm nay cô giới thiệu các em về TIỀN của nước mình – đồng Việt Nam nhé!',
    objectives: [
      'Biết đơn vị tiền Việt Nam là đồng.',
      'Cộng, trừ tiền đơn giản.',
    ],
    theory: [
      { h: 'Đồng Việt Nam' },
      { p: 'Đơn vị tiền của nước ta là ĐỒNG, viết tắt VNĐ.' },
      { ul: ['Các tờ tiền quen thuộc: 1 000, 2 000, 5 000, 10 000, 20 000, 50 000, 100 000 đồng.', 'Tờ có mệnh giá càng lớn thì giá trị càng nhiều.'] },
      { h: 'Cộng, trừ tiền' },
      { p: 'Cộng tiền giống cộng số: 10 000 + 5 000 = 15 000 đồng.' },
      { note: 'Em hãy biết tiết kiệm và quý đồng tiền của bố mẹ nhé.' },
    ],
    examples: [
      { q: '10 000 đồng + 5 000 đồng bằng bao nhiêu?', a: '10 000 + 5 000 = 15 000 đồng.' },
      { q: 'Em có 20 000 đồng, mua bút 8 000 đồng. Còn bao nhiêu?', a: '20 000 − 8 000 = 12 000. Vậy còn 12 000 đồng.' },
    ],
  },

  'P1-w30-quiz': {
    topic: 'Phép cộng có nhớ trong phạm vi 100 (giới thiệu)',
    intro: 'Hôm nay cô dạy phép cộng CÓ NHỚ – khi đơn vị cộng lên quá 9. Hơi mới nhưng rất thú vị!',
    objectives: [
      'Hiểu "nhớ 1" khi cộng đơn vị quá 9.',
      'Cộng được hai số có 2 chữ số (có nhớ).',
    ],
    theory: [
      { h: '"Nhớ 1" nghĩa là gì?' },
      { p: 'Khi cộng đơn vị mà kết quả ≥ 10, em viết chữ số đơn vị, RỒI NHỚ 1 sang cột chục.' },
      { ul: ['27 + 5: 7 + 5 = 12. Viết 2, nhớ 1. Chục: 2 + 1 (nhớ) = 3. Kết quả 32.', '48 + 6: 8 + 6 = 14. Viết 4, nhớ 1. Chục: 4 + 1 = 5. Kết quả 54.'] },
      { note: 'Đừng quên cộng cả số "nhớ" vào cột chục nhé.' },
    ],
    examples: [
      { q: '27 + 5 bằng mấy?', a: 'Đơn vị: 7 + 5 = 12, viết 2 nhớ 1. Chục: 2 + 1 = 3. Kết quả 32.' },
      { q: 'Có 26 con gà, mua thêm 7 con. Tổng?', a: '6 + 7 = 13, viết 3 nhớ 1. Chục: 2 + 1 = 3. Kết quả 33 con.' },
    ],
  },

  'P1-w31-quiz': {
    topic: 'Phép trừ có nhớ trong phạm vi 100 (giới thiệu)',
    intro: 'Tương tự cộng có nhớ, hôm nay cô dạy TRỪ CÓ NHỚ. Khi đơn vị không trừ được, mình MƯỢN 1 chục.',
    objectives: [
      'Hiểu cách "mượn 1" khi trừ đơn vị không đủ.',
      'Trừ được hai số có 2 chữ số (có nhớ).',
    ],
    theory: [
      { h: '"Mượn 1" nghĩa là gì?' },
      { p: 'Khi đơn vị ở trên nhỏ hơn đơn vị ở dưới, em MƯỢN 1 chục (bằng 10) sang cột đơn vị.' },
      { ul: ['32 − 5: 2 không trừ được 5. Mượn 1 chục → 12 − 5 = 7. Chục: 3 − 1 (đã mượn) = 2. Kết quả 27.', '41 − 7: 1 không trừ được 7. Mượn 1 → 11 − 7 = 4. Chục: 4 − 1 = 3. Kết quả 34.'] },
      { note: 'Đã mượn 1 chục thì cột chục phải bớt đi 1.' },
    ],
    examples: [
      { q: '32 − 5 bằng mấy?', a: 'Đơn vị 2 không trừ được 5, mượn 1: 12 − 5 = 7. Chục: 3 − 1 = 2. Kết quả 27.' },
      { q: 'Có 25 cái kẹo, ăn 8 cái. Còn bao nhiêu?', a: '5 − 8 không được, mượn 1: 15 − 8 = 7. Chục: 2 − 1 = 1. Còn 17 cái.' },
    ],
  },

  'P1-w32-quiz': {
    topic: 'Bài toán có lời văn (1)',
    intro: 'Các em ơi, học toán không chỉ là tính số mà còn đọc đề và giải nữa. Cùng cô làm quen nhé!',
    objectives: [
      'Đọc và hiểu đề toán có lời văn.',
      'Chọn đúng phép tính (cộng hay trừ).',
    ],
    theory: [
      { h: 'Cách giải' },
      { ul: ['Đọc kĩ đề bài 2 lần.', 'Tìm xem có THÊM (cộng) hay BỚT (trừ).', 'Đặt phép tính rồi tính.', 'Viết kết quả kèm đơn vị (cây, viên, bạn, ...).'] },
      { h: 'Từ khoá thường gặp' },
      { p: 'THÊM, MUA, GỘP, CẢ HAI → cộng. ĂN, CHO, BỚT, BAY ĐI → trừ.' },
      { note: 'Câu trả lời phải đầy đủ và rõ ràng.' },
    ],
    examples: [
      { q: 'Vườn có 18 cây cam, trồng thêm 5 cây. Vườn có tất cả mấy cây?', a: '"Thêm" → cộng. 18 + 5 = 23. Vườn có tất cả 23 cây cam.' },
      { q: 'Có 30 viên bi, cho bạn 10 viên. Còn mấy viên?', a: '"Cho" → trừ. 30 − 10 = 20. Còn 20 viên bi.' },
    ],
  },

  'P1-w33-quiz': {
    topic: 'Bài toán có lời văn (2)',
    intro: 'Tuần này cô và các em cùng giải thêm nhiều bài toán có lời văn khó hơn một chút nhé!',
    objectives: [
      'Giải bài toán "nhiều hơn" / "ít hơn".',
      'Trình bày bài giải rõ ràng.',
    ],
    theory: [
      { h: 'Bài toán "nhiều hơn"' },
      { p: 'An có 8 viên kẹo, Bình hơn An 5 viên. Bình có 8 + 5 = 13 viên.' },
      { h: 'Bài toán "ít hơn"' },
      { p: 'Hà có 20 nhãn vở, cho em 6 nhãn. Còn 20 − 6 = 14 nhãn.' },
      { ul: ['"Hơn"/"thêm" → cộng.', '"Cho"/"bớt"/"bay đi" → trừ.', 'Viết kết quả kèm đơn vị.'] },
      { note: 'Đọc đề chậm để chọn đúng phép tính nhé.' },
    ],
    examples: [
      { q: 'An có 8 viên kẹo, Bình hơn An 5 viên. Bình có mấy viên?', a: '8 + 5 = 13. Vậy Bình có 13 viên kẹo.' },
      { q: 'Sân có 24 con chim, bay đi 8 con. Còn mấy con?', a: '24 − 8 = 16. Vậy còn 16 con chim.' },
    ],
  },

  'P1-w34-quiz': {
    topic: 'Ôn tập cuối HK2 (1)',
    intro: 'Sắp hết năm rồi! Cô con mình cùng ôn lại các kiến thức quan trọng nhé.',
    objectives: [
      'Ôn cộng, trừ có nhớ trong phạm vi 100.',
      'Ôn ngày, giờ và số 100.',
    ],
    theory: [
      { h: 'Nhớ lại các điểm chính' },
      { ul: ['Cộng có nhớ: đơn vị ≥ 10 thì nhớ 1 sang chục.', 'Trừ có nhớ: đơn vị không đủ thì mượn 1 chục.', '1 tuần = 7 ngày.', 'Mặt đồng hồ có 12 số.', '100 = 10 chục.'] },
      { note: 'Đọc kĩ đề và kiểm tra lại kết quả.' },
    ],
    examples: [
      { q: '27 + 13 bằng mấy?', a: 'Đơn vị: 7 + 3 = 10, viết 0 nhớ 1. Chục: 2 + 1 + 1 = 4. Kết quả 40.' },
      { q: '80 − 35 bằng mấy?', a: '0 − 5 không được, mượn 1: 10 − 5 = 5. Chục: 7 − 3 = 4. Kết quả 45.' },
    ],
  },

  'P1-w35-quiz': {
    topic: 'Ôn tập cuối HK2 (2)',
    intro: 'Tuần cuối cùng của năm học. Cô chúc các em ôn thật tốt và lên lớp 2 giỏi giang nhé!',
    objectives: [
      'Sắp xếp số có 2 chữ số.',
      'Giải bài toán có lời văn tổng hợp.',
    ],
    theory: [
      { h: 'So sánh và sắp xếp' },
      { p: 'So sánh chục trước, rồi tới đơn vị. Tăng dần: từ bé tới lớn.' },
      { h: 'Bài toán tổng hợp' },
      { ul: ['Đọc đề kĩ.', 'Tìm phép tính phù hợp.', 'Viết câu trả lời đầy đủ.'] },
      { note: 'Số bé nhất có 2 chữ số là 10. Số lớn nhất có 2 chữ số là 99.' },
    ],
    examples: [
      { q: 'Sắp xếp tăng dần: 47, 32, 81, 59', a: 'So chục: 32 (3 chục) bé nhất, rồi 47, 59, 81. Kết quả: 32, 47, 59, 81.' },
      { q: 'Có 60 quả trứng, vỡ 12 quả. Còn mấy quả?', a: '60 − 12 = 48. Vậy còn 48 quả trứng.' },
    ],
  },

  'P1-w36-quiz': {
    topic: 'Kết thúc Lớp 1 — Hành trang vào Lớp 2',
    intro: 'Ôi, cả năm học qua nhanh quá! Cô rất tự hào về các em. Mình cùng nhìn lại những điều đã học nhé!',
    objectives: [
      'Nhớ lại những kiến thức Toán quan trọng nhất của Lớp 1.',
      'Hứng thú và sẵn sàng học Toán Lớp 2.',
    ],
    theory: [
      { h: 'Em đã học được gì?' },
      { ul: [
        'Đếm và viết số từ 0 đến 100.',
        'Cộng và trừ trong phạm vi 100.',
        'Nhận biết hình vuông, hình tròn, hình tam giác, hình chữ nhật.',
        'Đọc giờ đúng trên đồng hồ.',
        'Giải bài toán có lời văn đơn giản.',
      ] },
      { h: 'Lên Lớp 2 em sẽ học gì?' },
      { ul: [
        'Số đến 1000.',
        'Bảng nhân và bảng chia.',
        'Đo độ dài bằng cm.',
        'Xem lịch — ngày, tháng, tuần.',
      ] },
      { note: 'Cô chúc em một kì hè vui vẻ. Hãy nhớ ôn lại bảng cộng trừ mỗi ngày nhé!' },
    ],
    examples: [
      { q: 'Em đã học đếm đến số mấy?', a: 'Đến số 100. Số lớn nhất 2 chữ số là 99, số tiếp theo là 100.' },
      { q: '35 + 27 bằng mấy?', a: 'Đơn vị: 5 + 7 = 12, viết 2 nhớ 1. Chục: 3 + 2 + 1 = 6. Kết quả: 62.' },
    ],
  },
};
