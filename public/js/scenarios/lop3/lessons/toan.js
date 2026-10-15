// ============================================================
// Lớp 3 · TOÁN — Lý thuyết + Ví dụ 35 tuần (GDPT 2018)
// Key TRÙNG id quiz: "P3-wNN-quiz".
// ============================================================

export const P3_TOAN_LESSONS = {
  // ──────────────── HK1 ────────────────
  'P3-w01-quiz': {
    topic: 'Ôn tập về số đến 100',
    intro: 'Chào các em lên Lớp 3! Tuần đầu cô trò mình ôn lại những con số quen thuộc đã học ở Lớp 2 nhé.',
    objectives: [
      'Đọc, viết, phân tích số có hai chữ số.',
      'Tìm số liền trước – liền sau, so sánh và sắp xếp.',
      'Cộng – trừ nhẩm các số tròn chục trong phạm vi 100.',
    ],
    theory: [
      { h: 'Cấu tạo số có hai chữ số' },
      { p: 'Mỗi số có hai chữ số gồm hàng CHỤC và hàng ĐƠN VỊ. Ví dụ số 63 có 6 chục và 3 đơn vị.' },
      { ul: ['Số bé nhất có hai chữ số là 10.', 'Số lớn nhất có hai chữ số là 99.', 'Số chẵn có chữ số tận cùng là 0, 2, 4, 6, 8.'] },
      { h: 'So sánh số' },
      { p: 'So sánh hai số: xem hàng chục trước. Hàng chục lớn hơn thì số lớn hơn. Nếu bằng nhau thì so hàng đơn vị.' },
      { note: 'Mẹo cộng tròn chục: 40 + 30 = 4 chục + 3 chục = 7 chục = 70.' },
    ],
    examples: [
      { q: 'Số liền trước của 100 là số nào?', a: '100 − 1 = 99. Vậy số liền trước của 100 là 99.' },
      { q: 'Sắp xếp giảm dần: 56, 65, 50, 60.', a: 'So hàng chục: 65 (6) lớn nhất, sau đó 60, 56, 50. Kết quả: 65, 60, 56, 50.' },
    ],
  },

  'P3-w02-quiz': {
    topic: 'Ôn tập phép cộng – phép trừ trong phạm vi 100',
    intro: 'Các em ơi, tuần này chúng ta cùng ôn lại phép cộng và phép trừ có nhớ trong phạm vi 100 — kĩ năng "đặt tính rồi tính" rất quan trọng đấy!',
    objectives: [
      'Đặt tính rồi tính phép cộng – trừ có nhớ trong phạm vi 100.',
      'Giải bài toán có lời văn bằng 1 phép tính.',
    ],
    theory: [
      { h: 'Đặt tính rồi tính' },
      { p: 'Viết hai số sao cho hàng đơn vị thẳng hàng đơn vị, hàng chục thẳng hàng chục. Tính từ phải sang trái.' },
      { ul: ['Cộng có nhớ: nếu hàng đơn vị ≥ 10 thì viết phần đơn vị, "nhớ 1" sang hàng chục.', 'Trừ có nhớ: nếu đơn vị không trừ được, "mượn 1 chục" thành 10 đơn vị.'] },
      { h: 'Giải toán có lời văn' },
      { p: 'Đọc kĩ đề, tìm câu hỏi → quyết định cộng (thêm vào) hay trừ (bớt đi) → ghi lời giải rồi viết phép tính.' },
      { note: 'Cách kiểm tra: lấy kết quả + số trừ phải bằng số bị trừ (với phép trừ).' },
    ],
    examples: [
      { q: 'Đặt tính rồi tính 47 + 35.', a: '7 + 5 = 12 (viết 2, nhớ 1); 4 + 3 + 1 = 8. Kết quả: 82.' },
      { q: 'Lan có 24 nhãn vở, mẹ cho thêm 18 nhãn. Hỏi Lan có tất cả bao nhiêu nhãn vở?', a: 'Số nhãn vở của Lan là: 24 + 18 = 42 (nhãn vở). Đáp số: 42 nhãn vở.' },
    ],
  },

  'P3-w03-quiz': {
    topic: 'Tìm thành phần chưa biết của phép tính',
    intro: 'Hôm nay cô sẽ dạy các em cách "đi tìm" số x bị giấu trong phép tính. Vui như thám tử nhỏ vậy!',
    objectives: [
      'Tìm số hạng chưa biết, số bị trừ, số trừ.',
      'Viết và trình bày bài "Tìm x" đúng cách.',
    ],
    theory: [
      { h: 'Quy tắc tìm x' },
      { ul: [
        'x + b = c → x = c − b',
        'a + x = c → x = c − a',
        'x − b = c → x = c + b',
        'a − x = c → x = a − c',
      ] },
      { h: 'Cách trình bày' },
      { p: 'Viết "x = ..." ở dòng dưới, ngay dưới chữ x ban đầu. Mỗi bước xuống dòng, dấu = thẳng cột.' },
      { note: 'Muốn tìm số HẠNG → lấy TỔNG trừ số hạng đã biết. Muốn tìm SỐ BỊ TRỪ → lấy HIỆU cộng số trừ.' },
    ],
    examples: [
      { q: 'Tìm x: x + 15 = 42.', a: 'x = 42 − 15 = 27. Vậy x = 27.' },
      { q: 'Tìm x: 50 − x = 18.', a: 'x = 50 − 18 = 32. Vậy x = 32.' },
    ],
  },

  'P3-w04-quiz': {
    topic: 'Bảng nhân 2 – Bảng nhân 5 (ôn)',
    intro: 'Các em đã thuộc bảng nhân 2 và 5 từ Lớp 2 rồi. Cùng cô ôn lại cho thật nhanh và thật chắc nhé!',
    objectives: [
      'Thuộc bảng nhân 2 và bảng nhân 5.',
      'Vận dụng vào bài toán đếm nhóm bằng nhau.',
    ],
    theory: [
      { h: 'Nhân là cộng lặp' },
      { p: 'Phép nhân a × b là cộng số a lặp lại b lần. Ví dụ 2 × 4 = 2 + 2 + 2 + 2 = 8.' },
      { ul: [
        'Bảng nhân 2: 2, 4, 6, 8, 10, 12, 14, 16, 18, 20.',
        'Bảng nhân 5: 5, 10, 15, 20, 25, 30, 35, 40, 45, 50.',
      ] },
      { h: 'Mẹo nhớ' },
      { p: 'Nhân 2 = số đó cộng chính nó. Nhân 5 = kết quả luôn tận cùng bằng 0 hoặc 5.' },
      { note: 'Tính chất đổi chỗ: 2 × 5 = 5 × 2 = 10.' },
    ],
    examples: [
      { q: 'Mỗi đôi giày có 2 chiếc. 7 đôi giày có bao nhiêu chiếc?', a: 'Số chiếc giày là: 2 × 7 = 14 (chiếc). Đáp số: 14 chiếc.' },
      { q: 'Một bó hoa có 5 bông. 6 bó có bao nhiêu bông?', a: '5 × 6 = 30. Vậy 6 bó có 30 bông hoa.' },
    ],
  },

  'P3-w05-quiz': {
    topic: 'Bảng nhân 3',
    intro: 'Tuần này cô dạy bảng nhân 3 — bảng nhân mới đầu tiên của Lớp 3 đấy các em!',
    objectives: [
      'Lập và đọc thuộc bảng nhân 3.',
      'Vận dụng giải bài toán có lời văn.',
    ],
    theory: [
      { h: 'Lập bảng nhân 3' },
      { p: 'Bắt đầu từ 3 × 1 = 3, sau đó cứ cộng thêm 3 cho dòng kế tiếp.' },
      { ul: [
        '3 × 1 = 3 · 3 × 2 = 6 · 3 × 3 = 9 · 3 × 4 = 12 · 3 × 5 = 15',
        '3 × 6 = 18 · 3 × 7 = 21 · 3 × 8 = 24 · 3 × 9 = 27 · 3 × 10 = 30',
      ] },
      { h: 'Cách dùng' },
      { p: 'Khi đếm các nhóm 3 phần tử bằng nhau (3 bánh xe, 3 cánh hoa), em dùng phép nhân cho nhanh.' },
      { note: 'Hai bảng cộng dồn: kết quả tăng 3 mỗi bước → dễ kiểm tra khi quên.' },
    ],
    examples: [
      { q: 'Một xe đạp 3 bánh. 8 xe đạp có mấy bánh?', a: 'Số bánh xe là: 3 × 8 = 24 (bánh). Đáp số: 24 bánh.' },
      { q: 'Tính 3 × 7.', a: 'Theo bảng nhân 3: 3 × 7 = 21.' },
    ],
  },

  'P3-w06-quiz': {
    topic: 'Bảng nhân 4',
    intro: 'Bảng nhân 4 sẽ rất hữu ích khi em đếm chân con vật bốn chân hay bánh ô tô đấy!',
    objectives: [
      'Lập và đọc thuộc bảng nhân 4.',
      'Vận dụng vào tình huống thực tế.',
    ],
    theory: [
      { h: 'Bảng nhân 4' },
      { ul: [
        '4 × 1 = 4 · 4 × 2 = 8 · 4 × 3 = 12 · 4 × 4 = 16 · 4 × 5 = 20',
        '4 × 6 = 24 · 4 × 7 = 28 · 4 × 8 = 32 · 4 × 9 = 36 · 4 × 10 = 40',
      ] },
      { h: 'Mẹo nhớ' },
      { p: '4 × n = 2 × (2 × n). Ví dụ 4 × 6 = 2 × 12 = 24.' },
      { note: 'Kết quả bảng nhân 4 luôn là số CHẴN.' },
    ],
    examples: [
      { q: 'Mỗi bàn xếp 4 ghế. 7 bàn có bao nhiêu ghế?', a: '4 × 7 = 28. Vậy có 28 ghế.' },
      { q: 'Tính 4 × 9.', a: '4 × 9 = 36 (theo bảng nhân 4).' },
    ],
  },

  'P3-w07-quiz': {
    topic: 'Bảng nhân 6',
    intro: 'Cùng cô tiếp tục với bảng nhân 6 nhé. Bảng này hơi khó hơn nhưng các em cố lên!',
    objectives: [
      'Lập và đọc thuộc bảng nhân 6.',
      'Áp dụng vào bài toán 1 tuần có 6 ngày học.',
    ],
    theory: [
      { h: 'Bảng nhân 6' },
      { ul: [
        '6 × 1 = 6 · 6 × 2 = 12 · 6 × 3 = 18 · 6 × 4 = 24 · 6 × 5 = 30',
        '6 × 6 = 36 · 6 × 7 = 42 · 6 × 8 = 48 · 6 × 9 = 54 · 6 × 10 = 60',
      ] },
      { h: 'Mẹo' },
      { p: '6 × n = (5 × n) + n. Ví dụ 6 × 7 = 35 + 7 = 42.' },
      { note: 'Có thể tách: 6 × 8 = 6 × 4 × 2 = 24 × 2 = 48.' },
    ],
    examples: [
      { q: 'Mỗi tuần em đi học 6 ngày. 5 tuần đi học bao nhiêu ngày?', a: '6 × 5 = 30 (ngày). Đáp số: 30 ngày.' },
      { q: '6 × 9 = ?', a: '6 × 9 = 54.' },
    ],
  },

  'P3-w08-quiz': {
    topic: 'Bảng chia 2 – Bảng chia 5 (ôn)',
    intro: 'Phép chia là phép tính ngược của phép nhân. Cô trò mình ôn lại bảng chia 2 và chia 5 nhé!',
    objectives: [
      'Thuộc bảng chia 2 và bảng chia 5.',
      'Áp dụng "chia đều" vào bài toán thực tế.',
    ],
    theory: [
      { h: 'Liên hệ nhân – chia' },
      { p: 'Nếu 2 × 7 = 14 thì 14 : 2 = 7 và 14 : 7 = 2. Biết bảng nhân là suy ra bảng chia.' },
      { ul: ['Bảng chia 2: 2, 4, 6, 8, ..., 20 chia cho 2.', 'Bảng chia 5: 5, 10, 15, ..., 50 chia cho 5.'] },
      { h: 'Bài toán chia đều' },
      { p: 'Muốn biết "mỗi phần có bao nhiêu" hoặc "chia được mấy phần", em dùng phép chia.' },
      { note: 'Phép chia hết: kết quả là số nguyên, không có dư.' },
    ],
    examples: [
      { q: 'Chia đều 40 quyển vở cho 5 bạn. Mỗi bạn được mấy quyển?', a: '40 : 5 = 8. Vậy mỗi bạn được 8 quyển vở.' },
      { q: 'Một sợi dây dài 16 dm cắt thành các đoạn 2 dm. Được mấy đoạn?', a: '16 : 2 = 8 (đoạn). Đáp số: 8 đoạn.' },
    ],
  },

  'P3-w09-quiz': {
    topic: 'Bảng chia 3 – Bảng chia 4',
    intro: 'Hôm nay cô dạy thêm hai bảng chia mới: chia 3 và chia 4. Cùng cố lên các em!',
    objectives: [
      'Thuộc bảng chia 3 và bảng chia 4.',
      'Phân biệt "chia hết" và "có dư".',
    ],
    theory: [
      { h: 'Bảng chia 3 và 4' },
      { ul: [
        'Chia 3: 3:3=1 · 6:3=2 · 9:3=3 · ... · 30:3=10.',
        'Chia 4: 4:4=1 · 8:4=2 · 12:4=3 · ... · 40:4=10.',
      ] },
      { h: 'Liên hệ với bảng nhân' },
      { p: 'Nhớ "3 × 6 = 18" → suy ra "18 : 3 = 6" và "18 : 6 = 3".' },
      { note: 'Số chia hết cho 3 có tổng các chữ số chia hết cho 3 (12 → 1+2=3 ✓).' },
    ],
    examples: [
      { q: '27 : 3 = ?', a: 'Vì 3 × 9 = 27 nên 27 : 3 = 9.' },
      { q: 'Chia đều 32 viên kẹo cho 4 bạn. Mỗi bạn được mấy viên?', a: '32 : 4 = 8. Mỗi bạn được 8 viên kẹo.' },
    ],
  },

  'P3-w10-quiz': {
    topic: 'Bảng chia 6',
    intro: 'Tuần này cô dạy bảng chia 6 — đi cùng cặp với bảng nhân 6 đã học tuần trước nhé!',
    objectives: [
      'Lập và đọc thuộc bảng chia 6.',
      'Áp dụng vào bài toán chia nhóm.',
    ],
    theory: [
      { h: 'Bảng chia 6' },
      { ul: ['6:6=1 · 12:6=2 · 18:6=3 · 24:6=4 · 30:6=5 · 36:6=6 · 42:6=7 · 48:6=8 · 54:6=9 · 60:6=10'] },
      { h: 'Kiểm tra' },
      { p: 'Muốn kiểm tra a : 6 = b đúng không, em lấy b × 6 phải bằng a.' },
      { note: 'Cùng học một cặp nhân – chia giúp nhớ rất nhanh.' },
    ],
    examples: [
      { q: '48 : 6 = ?', a: 'Vì 6 × 8 = 48 nên 48 : 6 = 8.' },
      { q: 'Có 54 quả cam xếp vào các đĩa, mỗi đĩa 6 quả. Có mấy đĩa?', a: '54 : 6 = 9. Vậy có 9 đĩa.' },
    ],
  },

  'P3-w11-quiz': {
    topic: 'Một phần mấy (1/2, 1/3, 1/4, 1/5, 1/6)',
    intro: 'Các em ơi, hôm nay chúng ta học cách chia một vật thành các phần bằng nhau, gọi là "một phần mấy".',
    objectives: [
      'Hiểu 1/2, 1/3, 1/4, 1/5, 1/6 là gì.',
      'Tìm "một phần mấy" của một số.',
    ],
    theory: [
      { h: 'Phân số đơn vị' },
      { p: 'Khi chia một vật thành n phần bằng nhau, mỗi phần được gọi là một phần n (viết 1/n).' },
      { ul: ['1/2 = một nửa.', '1/3 = một phần ba.', '1/4 = một phần tư (= một góc tư).', '1/5 = một phần năm.', '1/6 = một phần sáu.'] },
      { h: 'Tìm một phần mấy của số' },
      { p: 'Muốn tìm 1/n của số a, em lấy a chia cho n. Ví dụ 1/4 của 20 là 20 : 4 = 5.' },
      { note: 'Mẫu số càng lớn → mỗi phần càng nhỏ.' },
    ],
    examples: [
      { q: 'Tìm 1/3 của 18.', a: '1/3 của 18 là: 18 : 3 = 6.' },
      { q: 'Một cái bánh chia làm 6 phần bằng nhau, em ăn 1 phần. Em đã ăn mấy phần bánh?', a: 'Em ăn 1/6 cái bánh.' },
    ],
  },

  'P3-w12-quiz': {
    topic: 'Bảng nhân 7',
    intro: 'Bảng nhân 7 hơi khó, nhưng cô tin các em sẽ thuộc nhanh thôi!',
    objectives: [
      'Lập và đọc thuộc bảng nhân 7.',
      'Áp dụng vào bài toán 1 tuần có 7 ngày.',
    ],
    theory: [
      { h: 'Bảng nhân 7' },
      { ul: [
        '7 × 1 = 7 · 7 × 2 = 14 · 7 × 3 = 21 · 7 × 4 = 28 · 7 × 5 = 35',
        '7 × 6 = 42 · 7 × 7 = 49 · 7 × 8 = 56 · 7 × 9 = 63 · 7 × 10 = 70',
      ] },
      { h: 'Mẹo' },
      { p: '7 × n = (5 × n) + (2 × n). Ví dụ 7 × 8 = 40 + 16 = 56.' },
      { note: 'Một tuần có 7 ngày — bảng nhân 7 rất hay dùng khi tính ngày.' },
    ],
    examples: [
      { q: 'Một tuần có 7 ngày. 8 tuần có mấy ngày?', a: '7 × 8 = 56 (ngày). Đáp số: 56 ngày.' },
      { q: '7 × 9 = ?', a: '7 × 9 = 63.' },
    ],
  },

  'P3-w13-quiz': {
    topic: 'Bảng chia 7',
    intro: 'Cô trò mình chuyển sang bảng chia 7 — đi cặp với bảng nhân 7 đấy nhé.',
    objectives: [
      'Thuộc bảng chia 7.',
      'Giải bài toán chia đều theo tuần.',
    ],
    theory: [
      { h: 'Bảng chia 7' },
      { ul: ['7:7=1 · 14:7=2 · 21:7=3 · 28:7=4 · 35:7=5 · 42:7=6 · 49:7=7 · 56:7=8 · 63:7=9 · 70:7=10'] },
      { h: 'Liên hệ' },
      { p: 'Nhớ 7 × 8 = 56 → suy ngay 56 : 7 = 8 và 56 : 8 = 7.' },
      { note: 'Khi đề cho "số ngày", thường liên quan đến chia 7 để ra số tuần.' },
    ],
    examples: [
      { q: '35 ngày là mấy tuần?', a: '35 : 7 = 5. Vậy 35 ngày là 5 tuần.' },
      { q: '63 : 7 = ?', a: 'Vì 7 × 9 = 63 nên 63 : 7 = 9.' },
    ],
  },

  'P3-w14-quiz': {
    topic: 'Gấp một số lên nhiều lần · Giảm đi một số lần',
    intro: 'Tuần này cô dạy hai khái niệm rất quan trọng: "gấp lên" và "giảm đi" một số lần.',
    objectives: [
      'Biết "gấp a lên n lần" = a × n.',
      'Biết "giảm a đi n lần" = a : n.',
    ],
    theory: [
      { h: 'Gấp lên nhiều lần' },
      { p: 'Muốn gấp số a lên n lần, em lấy a NHÂN với n. Ví dụ gấp 5 lên 3 lần: 5 × 3 = 15.' },
      { h: 'Giảm đi một số lần' },
      { p: 'Muốn giảm số a đi n lần, em lấy a CHIA cho n. Ví dụ giảm 24 đi 4 lần: 24 : 4 = 6.' },
      { ul: ['"Gấp ... lần" → nhân.', '"Giảm ... lần" → chia.', '"Thêm ..." → cộng. "Bớt ..." → trừ.'] },
      { note: 'Phân biệt: "thêm 3" là cộng 3; còn "gấp 3 lần" là nhân 3.' },
    ],
    examples: [
      { q: 'Gấp 8 lên 4 lần được số nào?', a: '8 × 4 = 32. Vậy gấp 8 lên 4 lần được 32.' },
      { q: 'Giảm 36 đi 6 lần.', a: '36 : 6 = 6. Vậy giảm 36 đi 6 lần được 6.' },
    ],
  },

  'P3-w15-quiz': {
    topic: 'Bảng nhân 8 – Bảng chia 8',
    intro: 'Cùng học cặp bảng nhân và chia 8 nhé. Cố lên các em, sắp xong các bảng rồi!',
    objectives: [
      'Thuộc bảng nhân 8 và bảng chia 8.',
      'Vận dụng vào bài toán đếm chân động vật.',
    ],
    theory: [
      { h: 'Bảng nhân 8' },
      { ul: ['8, 16, 24, 32, 40, 48, 56, 64, 72, 80 (kết quả 8 × 1 đến 8 × 10).'] },
      { h: 'Bảng chia 8' },
      { p: 'Suy ngược từ bảng nhân: 8:8=1, 16:8=2, ..., 80:8=10.' },
      { note: '8 × n = 2 × (4 × n). Ví dụ 8 × 7 = 2 × 28 = 56.' },
    ],
    examples: [
      { q: 'Một con bạch tuộc có 8 xúc tu. 5 con có bao nhiêu xúc tu?', a: '8 × 5 = 40 (xúc tu). Đáp số: 40 xúc tu.' },
      { q: '64 : 8 = ?', a: 'Vì 8 × 8 = 64 nên 64 : 8 = 8.' },
    ],
  },

  'P3-w16-quiz': {
    topic: 'Bảng nhân 9 – Bảng chia 9',
    intro: 'Bảng nhân và chia 9 là cặp cuối cùng các em cần thuộc. Cô có mẹo "ngón tay" rất vui!',
    objectives: [
      'Thuộc bảng nhân 9 và bảng chia 9.',
      'Áp dụng mẹo nhớ bảng nhân 9.',
    ],
    theory: [
      { h: 'Bảng nhân 9' },
      { ul: ['9, 18, 27, 36, 45, 54, 63, 72, 81, 90.'] },
      { h: 'Mẹo: tổng hai chữ số' },
      { p: 'Kết quả nhân 9 (trong phạm vi 9 × 1 đến 9 × 10) có TỔNG hai chữ số luôn bằng 9. Ví dụ 9 × 4 = 36 → 3 + 6 = 9. Dùng để kiểm tra.' },
      { h: 'Bảng chia 9' },
      { p: '9:9=1, 18:9=2, ..., 90:9=10.' },
      { note: '9 × n = 10 × n − n. Ví dụ 9 × 7 = 70 − 7 = 63.' },
    ],
    examples: [
      { q: '9 × 6 = ?', a: '9 × 6 = 54. Kiểm tra: 5 + 4 = 9 ✓.' },
      { q: '72 : 9 = ?', a: 'Vì 9 × 8 = 72 nên 72 : 9 = 8.' },
    ],
  },

  'P3-w17-quiz': {
    topic: 'Bài toán có lời văn — giải bằng 2 bước tính',
    intro: 'Lên Lớp 3, nhiều bài toán phải giải bằng 2 bước. Cô sẽ chỉ các em cách phân tích đề nhé!',
    objectives: [
      'Phân tích đề bài và tìm 2 phép tính cần làm.',
      'Trình bày bài giải có lời, có phép tính, có đáp số.',
    ],
    theory: [
      { h: 'Quy trình 4 bước' },
      { ul: [
        '1. Đọc đề kĩ, gạch chân số liệu và câu hỏi.',
        '2. Phân tích: hỏi gì? cần biết gì trước? → tìm bước 1.',
        '3. Tính bước 1, sau đó tính bước 2 ra đáp số.',
        '4. Ghi "Đáp số: ..." kèm đơn vị.',
      ] },
      { h: 'Mẫu trình bày' },
      { p: 'Mỗi bước đều phải có "Lời giải" (câu nói rõ đang tìm gì) và "Phép tính".' },
      { note: 'Bài 2 bước thường dùng cặp nhân + cộng/trừ hoặc cộng + chia.' },
    ],
    examples: [
      { q: 'Có 3 hộp, mỗi hộp 6 cây bút, đã cho bạn 5 cây. Còn bao nhiêu cây bút?', a: 'Bước 1: Số cây bút có là 6 × 3 = 18 (cây).\nBước 2: Số cây bút còn lại là 18 − 5 = 13 (cây).\nĐáp số: 13 cây bút.' },
      { q: 'Lan có 24 viên kẹo, chia đều cho 4 bạn, mỗi bạn được mấy viên?', a: 'Đây là bài 1 bước: 24 : 4 = 6 (viên). Đáp số: 6 viên kẹo.' },
    ],
  },

  'P3-w18-quiz': {
    topic: 'Ôn tập học kì 1',
    intro: 'Một học kì đã trôi qua, cùng cô tổng kết lại những gì các em đã học nhé!',
    objectives: [
      'Hệ thống lại các bảng nhân – chia 2 đến 9.',
      'Ôn cộng – trừ trong phạm vi 100 và giải toán có lời văn.',
    ],
    theory: [
      { h: 'Nội dung trọng tâm HK1' },
      { ul: [
        'Cộng – trừ có nhớ trong phạm vi 100.',
        'Bảng nhân – chia từ 2 đến 9.',
        'Tìm thành phần chưa biết của phép tính.',
        'Gấp lên / giảm đi một số lần.',
        'Một phần mấy của số.',
        'Giải bài toán có lời văn (1 bước và 2 bước).',
      ] },
      { h: 'Bí kíp ôn thi' },
      { p: 'Đọc kĩ đề, làm câu dễ trước, kiểm tra lại bằng phép tính ngược.' },
      { note: 'Học thuộc bảng cửu chương là chìa khoá làm toán nhanh.' },
    ],
    examples: [
      { q: 'Tính nhanh: 6 × 7 + 8.', a: '6 × 7 = 42; 42 + 8 = 50.' },
      { q: 'Tìm x: x : 4 = 7.', a: 'x = 7 × 4 = 28.' },
    ],
  },

  // ──────────────── HK2 ────────────────
  'P3-w19-quiz': {
    topic: 'Điểm – Đoạn thẳng – Đường thẳng – 3 điểm thẳng hàng',
    intro: 'Chào HK2! Tuần này cô đưa các em vào thế giới HÌNH HỌC với những "điểm" và "đường thẳng" thú vị.',
    objectives: [
      'Phân biệt điểm, đoạn thẳng, đường thẳng.',
      'Nhận biết 3 điểm thẳng hàng.',
    ],
    theory: [
      { h: 'Khái niệm cơ bản' },
      { ul: [
        'ĐIỂM: dấu chấm nhỏ, đặt tên bằng chữ in hoa (A, B, C).',
        'ĐOẠN THẲNG: phần thẳng giới hạn bởi hai điểm hai đầu (đoạn AB).',
        'ĐƯỜNG THẲNG: đường kéo dài vô tận về hai phía, không có đầu mút.',
      ] },
      { h: '3 điểm thẳng hàng' },
      { p: 'Ba điểm gọi là thẳng hàng khi cùng nằm trên một đường thẳng.' },
      { note: 'Đoạn thẳng có 2 đầu mút; đường thẳng không có.' },
    ],
    examples: [
      { q: 'Đoạn AB và đoạn BA có khác nhau không?', a: 'Không. Đoạn AB và đoạn BA chỉ là cách gọi khác nhau của cùng một đoạn thẳng.' },
      { q: 'Nếu A, B, C cùng nằm trên một đường thẳng thì 3 điểm này gọi là gì?', a: 'Ba điểm thẳng hàng.' },
    ],
  },

  'P3-w20-quiz': {
    topic: 'Hình tam giác – Hình tứ giác – Góc vuông – Góc không vuông',
    intro: 'Cùng cô làm quen với các hình quen thuộc và cách nhận biết GÓC VUÔNG nhé!',
    objectives: [
      'Nhận biết hình tam giác, tứ giác.',
      'Phân biệt góc vuông và góc không vuông bằng ê-ke.',
    ],
    theory: [
      { h: 'Đa giác' },
      { ul: [
        'Tam giác: hình có 3 cạnh, 3 đỉnh, 3 góc.',
        'Tứ giác: hình có 4 cạnh, 4 đỉnh, 4 góc.',
      ] },
      { h: 'Góc vuông' },
      { p: 'Góc vuông là góc tạo bởi hai cạnh vuông góc (đo bằng ê-ke). Ví dụ góc của tờ giấy, góc bàn.' },
      { note: 'Hình vuông và hình chữ nhật đều có 4 góc vuông.' },
    ],
    examples: [
      { q: 'Hình chữ nhật có mấy góc vuông?', a: 'Hình chữ nhật có 4 góc vuông.' },
      { q: 'Tam giác có bao nhiêu đỉnh?', a: 'Tam giác có 3 đỉnh, 3 cạnh, 3 góc.' },
    ],
  },

  'P3-w21-quiz': {
    topic: 'Chu vi hình tam giác – Chu vi hình tứ giác',
    intro: 'Hôm nay cô dạy các em tính chu vi — tức là độ dài đường viền xung quanh hình.',
    objectives: [
      'Hiểu chu vi là tổng độ dài các cạnh.',
      'Tính chu vi tam giác và tứ giác.',
    ],
    theory: [
      { h: 'Định nghĩa' },
      { p: 'Chu vi của một hình là TỔNG độ dài tất cả các cạnh của hình đó.' },
      { ul: [
        'Chu vi tam giác = a + b + c (3 cạnh).',
        'Chu vi tứ giác = a + b + c + d (4 cạnh).',
      ] },
      { h: 'Lưu ý đơn vị' },
      { p: 'Các cạnh phải cùng đơn vị (cm với cm, dm với dm). Nếu khác đơn vị thì đổi về cùng đơn vị rồi cộng.' },
      { note: 'Đáp số luôn có đơn vị độ dài (cm, dm, m).' },
    ],
    examples: [
      { q: 'Tam giác có 3 cạnh dài 4 cm, 5 cm, 6 cm. Tính chu vi.', a: 'Chu vi = 4 + 5 + 6 = 15 (cm). Đáp số: 15 cm.' },
      { q: 'Tứ giác có 4 cạnh đều bằng 3 dm. Chu vi bằng bao nhiêu?', a: 'Chu vi = 3 × 4 = 12 (dm). Đáp số: 12 dm.' },
    ],
  },

  'P3-w22-quiz': {
    topic: 'Chu vi hình chữ nhật – Chu vi hình vuông',
    intro: 'Hai hình quen thuộc nhất — hình chữ nhật và hình vuông — có công thức tính chu vi rất gọn!',
    objectives: [
      'Nhớ công thức chu vi HCN: (dài + rộng) × 2.',
      'Nhớ công thức chu vi hình vuông: cạnh × 4.',
    ],
    theory: [
      { h: 'Chu vi hình chữ nhật' },
      { p: 'Hình chữ nhật có 2 cạnh dài bằng nhau và 2 cạnh rộng bằng nhau. Vì vậy: Chu vi = (chiều dài + chiều rộng) × 2.' },
      { h: 'Chu vi hình vuông' },
      { p: 'Hình vuông có 4 cạnh BẰNG NHAU. Vì vậy: Chu vi = cạnh × 4.' },
      { note: 'Hai chiều dài – rộng phải CÙNG đơn vị mới cộng được.' },
    ],
    examples: [
      { q: 'Hình chữ nhật dài 8 cm, rộng 5 cm. Tính chu vi.', a: 'Chu vi = (8 + 5) × 2 = 13 × 2 = 26 (cm). Đáp số: 26 cm.' },
      { q: 'Hình vuông cạnh 7 dm. Tính chu vi.', a: 'Chu vi = 7 × 4 = 28 (dm). Đáp số: 28 dm.' },
    ],
  },

  'P3-w23-quiz': {
    topic: 'Số có 4 chữ số – So sánh số',
    intro: 'Các em đã quen số có 2, 3 chữ số rồi. Tuần này cô đưa các em đến với những số LỚN HƠN — số có 4 chữ số.',
    objectives: [
      'Đọc, viết số có 4 chữ số.',
      'Biết các hàng: nghìn – trăm – chục – đơn vị.',
      'So sánh hai số có 4 chữ số.',
    ],
    theory: [
      { h: 'Các hàng' },
      { p: 'Số có 4 chữ số gồm: hàng NGHÌN – hàng TRĂM – hàng CHỤC – hàng ĐƠN VỊ. Ví dụ 3 245 = 3 nghìn + 2 trăm + 4 chục + 5 đơn vị.' },
      { ul: ['Số bé nhất có 4 chữ số là 1 000.', 'Số lớn nhất có 4 chữ số là 9 999.'] },
      { h: 'So sánh' },
      { p: 'So sánh từ trái sang phải: hàng nghìn trước, rồi trăm, chục, đơn vị.' },
      { note: 'Mỗi 3 chữ số em có thể tách bằng dấu cách để dễ đọc (1 234).' },
    ],
    examples: [
      { q: 'Số gồm 5 nghìn, 0 trăm, 3 chục, 7 đơn vị là số nào?', a: '5 037 (chú ý hàng trăm là 0).' },
      { q: 'So sánh 2 345 và 2 354.', a: 'Hàng nghìn và hàng trăm bằng nhau (2 và 3). Sang hàng chục: 4 < 5. Vậy 2 345 < 2 354.' },
    ],
  },

  'P3-w24-quiz': {
    topic: 'Phép cộng các số trong phạm vi 10 000',
    intro: 'Với số lớn hơn, em chỉ cần đặt tính cẩn thận và "nhớ" đúng là làm được hết!',
    objectives: [
      'Đặt tính rồi tính cộng có nhớ trong phạm vi 10 000.',
      'Giải toán có lời văn dùng phép cộng.',
    ],
    theory: [
      { h: 'Quy tắc đặt tính' },
      { ul: [
        'Viết các chữ số cùng hàng thẳng cột (đơn vị dưới đơn vị, chục dưới chục, ...).',
        'Cộng từ phải sang trái.',
        'Khi cộng được ≥ 10, viết chữ số đơn vị, nhớ 1 sang hàng kế tiếp.',
      ] },
      { h: 'Kiểm tra' },
      { p: 'Em có thể kiểm tra bằng cách cộng nhẩm theo cách khác hoặc dùng phép trừ.' },
      { note: 'Cẩn thận với "nhớ 1" — quên là sai cả phép tính.' },
    ],
    examples: [
      { q: 'Đặt tính: 3 456 + 2 538.', a: '6 + 8 = 14 (viết 4 nhớ 1); 5 + 3 + 1 = 9; 4 + 5 = 9; 3 + 2 = 5. Kết quả: 5 994.' },
      { q: 'Đội A trồng 1 250 cây, đội B trồng 1 380 cây. Cả hai đội trồng bao nhiêu cây?', a: '1 250 + 1 380 = 2 630 (cây). Đáp số: 2 630 cây.' },
    ],
  },

  'P3-w25-quiz': {
    topic: 'Phép trừ các số trong phạm vi 10 000',
    intro: 'Sau phép cộng là phép trừ. Cô sẽ chỉ các em "mượn 1" cho đúng nhé!',
    objectives: [
      'Đặt tính rồi tính trừ có nhớ trong phạm vi 10 000.',
      'Giải toán có lời văn dùng phép trừ.',
    ],
    theory: [
      { h: 'Quy tắc đặt tính' },
      { ul: [
        'Viết số bị trừ ở trên, số trừ ở dưới, các chữ số cùng hàng thẳng cột.',
        'Trừ từ phải sang trái.',
        'Nếu chữ số trên nhỏ hơn chữ số dưới, "mượn 1" từ hàng kế (tức 10 ở hàng đang trừ).',
      ] },
      { h: 'Kiểm tra' },
      { p: 'Lấy HIỆU + SỐ TRỪ phải bằng SỐ BỊ TRỪ. Nếu khớp là đúng.' },
      { note: 'Khi hàng trên là 0 mà không trừ được, phải mượn liên tiếp — cẩn thận từng bước.' },
    ],
    examples: [
      { q: 'Đặt tính: 5 432 − 1 875.', a: '2 − 5: mượn → 12 − 5 = 7 (nhớ 1); 3 − 7 − 1: mượn → 12 − 8 = 4 (nhớ 1); 4 − 8 − 1: mượn → 13 − 9 = 4 ... thực hiện cuối ta được 3 557.' },
      { q: 'Mảnh đất có 4 000 cây, đã chặt 1 250 cây. Còn bao nhiêu cây?', a: '4 000 − 1 250 = 2 750 (cây). Đáp số: 2 750 cây.' },
    ],
  },

  'P3-w26-quiz': {
    topic: 'Nhân số có 3 chữ số với số có 1 chữ số',
    intro: 'Bây giờ ta nhân số lớn hơn. Em chỉ cần thuộc bảng cửu chương là làm tốt!',
    objectives: [
      'Đặt tính rồi tính nhân số 3 chữ số với 1 chữ số.',
      'Giải bài toán nhân.',
    ],
    theory: [
      { h: 'Quy tắc' },
      { p: 'Nhân từ phải sang trái: nhân chữ số đơn vị trước, rồi chục, rồi trăm. Có nhớ tương tự phép cộng.' },
      { ul: [
        'Bước 1: nhân hàng đơn vị. Nếu kết quả ≥ 10, viết phần đơn vị, nhớ phần chục.',
        'Bước 2: nhân hàng chục, cộng thêm phần nhớ.',
        'Bước 3: nhân hàng trăm, cộng thêm phần nhớ.',
      ] },
      { note: 'Phần "nhớ" có thể lớn (vì có thể nhớ 1, 2, 3, ...) — chú ý cộng đủ.' },
    ],
    examples: [
      { q: 'Tính 213 × 3.', a: '3 × 3 = 9; 1 × 3 = 3; 2 × 3 = 6. Kết quả: 639.' },
      { q: 'Tính 124 × 4.', a: '4 × 4 = 16 (viết 6, nhớ 1); 2 × 4 + 1 = 9; 1 × 4 = 4. Kết quả: 496.' },
    ],
  },

  'P3-w27-quiz': {
    topic: 'Chia số có 3 chữ số cho số có 1 chữ số',
    intro: 'Phép chia ngược lại với phép nhân. Cô sẽ chỉ cách "chia dài" cho các em!',
    objectives: [
      'Đặt tính chia số 3 chữ số cho số 1 chữ số.',
      'Phân biệt chia hết và chia có dư.',
    ],
    theory: [
      { h: 'Cách chia' },
      { ul: [
        'Chia từ TRÁI sang phải, lấy chữ số đầu tiên (hoặc 2 chữ số đầu nếu nhỏ hơn số chia).',
        'Tìm thương — đem nhân với số chia, trừ vào số bị chia.',
        'Hạ chữ số tiếp theo xuống, lặp lại.',
      ] },
      { h: 'Số dư' },
      { p: 'Số dư luôn NHỎ HƠN số chia. Nếu dư = 0 thì gọi là chia hết.' },
      { note: 'Kiểm tra: Thương × Số chia + Số dư = Số bị chia.' },
    ],
    examples: [
      { q: 'Tính 369 : 3.', a: '3:3=1; 6:3=2; 9:3=3. Kết quả: 123.' },
      { q: 'Tính 125 : 4 (chia có dư).', a: '12:4=3 (dư 0); hạ 5: 5:4=1 (dư 1). Kết quả: 31 dư 1.' },
    ],
  },

  'P3-w28-quiz': {
    topic: 'Ki-lô-gam – Gam (g, kg)',
    intro: 'Tuần này cô dạy các em đơn vị đo khối lượng — biết được con vật, túi gạo nặng bao nhiêu nhé!',
    objectives: [
      'Biết 1 kg = 1 000 g.',
      'Đổi giữa kg và g; cộng – trừ với đơn vị khối lượng.',
    ],
    theory: [
      { h: 'Hai đơn vị chính' },
      { ul: [
        'KILÔGAM (kg): đơn vị đo các vật nặng (gạo, người, con vật).',
        'GAM (g): đơn vị đo các vật nhẹ (kẹo, viên thuốc, gói gia vị).',
        '1 kg = 1 000 g.',
      ] },
      { h: 'Đổi và cộng trừ' },
      { p: 'Đổi kg → g: nhân 1 000. Đổi g → kg: chia 1 000. Cộng – trừ phải cùng đơn vị.' },
      { note: 'Một quả táo nặng khoảng 150 g. Một bao gạo nặng khoảng 5 kg.' },
    ],
    examples: [
      { q: 'Đổi 3 kg ra gam.', a: '3 kg = 3 × 1 000 = 3 000 g.' },
      { q: '2 kg 500 g + 1 kg 800 g = ?', a: '500 + 800 = 1 300 g = 1 kg 300 g. Cộng kg: 2 + 1 + 1 = 4 kg, dư 300 g. Đáp số: 4 kg 300 g.' },
    ],
  },

  'P3-w29-quiz': {
    topic: 'Mi-li-lít – Lít (ml, l)',
    intro: 'Để đo nước, sữa, dầu ăn... ta dùng đơn vị thể tích: ml và l.',
    objectives: [
      'Biết 1 l = 1 000 ml.',
      'Đổi giữa l và ml; áp dụng vào đời sống.',
    ],
    theory: [
      { h: 'Đơn vị thể tích' },
      { ul: [
        'LÍT (l): đo lượng nước, sữa nhiều.',
        'MI-LI-LÍT (ml): đo lượng chất lỏng ít.',
        '1 l = 1 000 ml.',
      ] },
      { h: 'Đổi' },
      { p: 'l → ml: nhân 1 000. ml → l: chia 1 000.' },
      { note: 'Một chai nước suối thường là 500 ml = nửa lít.' },
    ],
    examples: [
      { q: '2 l = ? ml.', a: '2 l = 2 × 1 000 = 2 000 ml.' },
      { q: 'Một bình có 1 l 500 ml nước, đổ ra 700 ml. Còn bao nhiêu?', a: '1 l 500 ml = 1 500 ml. 1 500 − 700 = 800 ml. Đáp số: 800 ml.' },
    ],
  },

  'P3-w30-quiz': {
    topic: 'Tiền Việt Nam (đồng)',
    intro: 'Hôm nay cô dạy các em nhận biết các tờ tiền Việt Nam và cách tính tiền mua hàng nhé!',
    objectives: [
      'Nhận biết các mệnh giá tiền Việt Nam.',
      'Tính tiền mua hàng và tiền thừa khi trả lại.',
    ],
    theory: [
      { h: 'Đơn vị: đồng' },
      { ul: [
        'Tiền giấy: 1 000đ, 2 000đ, 5 000đ, 10 000đ, 20 000đ, 50 000đ, 100 000đ, 200 000đ, 500 000đ.',
        'Tiền xu (ít dùng): 200đ, 500đ, 1 000đ, 2 000đ, 5 000đ.',
      ] },
      { h: 'Cách tính' },
      { p: 'Tổng tiền = giá × số lượng (nếu mua nhiều món cùng giá). Tiền thừa = số tiền đưa − số tiền phải trả.' },
      { note: 'Lưu ý giữ tiền cẩn thận; không gấp/xé tiền.' },
    ],
    examples: [
      { q: 'Mua 3 cây bút, mỗi cây 5 000đ. Hỏi tổng tiền?', a: '5 000 × 3 = 15 000 (đ). Đáp số: 15 000 đồng.' },
      { q: 'Đưa người bán 20 000đ, mua 14 000đ. Được trả lại bao nhiêu?', a: '20 000 − 14 000 = 6 000 (đ). Đáp số: 6 000 đồng.' },
    ],
  },

  'P3-w31-quiz': {
    topic: 'Giờ – Phút – Xem đồng hồ',
    intro: 'Đồng hồ luôn ở quanh ta. Tuần này cô dạy các em đọc đồng hồ chính xác đến từng phút!',
    objectives: [
      'Đọc đồng hồ đến từng phút.',
      'Biết 1 giờ = 60 phút; tính khoảng thời gian.',
    ],
    theory: [
      { h: 'Cấu tạo đồng hồ' },
      { ul: [
        'Kim ngắn chỉ GIỜ; kim dài chỉ PHÚT.',
        'Mỗi vạch nhỏ trên mặt đồng hồ = 1 phút.',
        '1 giờ = 60 phút; nửa giờ = 30 phút.',
      ] },
      { h: 'Cách đọc' },
      { p: 'Xem kim ngắn để biết giờ; xem kim dài để biết số phút (đếm vạch nhỏ kể từ số 12).' },
      { note: 'Kim dài chỉ số 6 = 30 phút; chỉ số 3 = 15 phút.' },
    ],
    examples: [
      { q: 'Kim ngắn chỉ số 9, kim dài chỉ số 6. Là mấy giờ?', a: '9 giờ 30 phút (hoặc 9 giờ rưỡi).' },
      { q: '1 giờ 30 phút = bao nhiêu phút?', a: '60 + 30 = 90 phút.' },
    ],
  },

  'P3-w32-quiz': {
    topic: 'Ngày – Tháng – Năm · Lịch',
    intro: 'Cùng cô xem lịch và biết hôm nay là thứ mấy, ngày bao nhiêu, tháng nào nhé!',
    objectives: [
      'Biết số ngày của các tháng trong năm.',
      'Xem lịch để biết thứ – ngày – tháng – năm.',
    ],
    theory: [
      { h: 'Số ngày các tháng' },
      { ul: [
        'Tháng 31 ngày: 1, 3, 5, 7, 8, 10, 12.',
        'Tháng 30 ngày: 4, 6, 9, 11.',
        'Tháng 2: 28 ngày (năm thường) hoặc 29 ngày (năm nhuận).',
      ] },
      { h: 'Mẹo "đốt ngón tay"' },
      { p: 'Nắm bàn tay, đếm các đốt và khe: đốt cao = 31 ngày, khe thấp = 30 ngày (riêng tháng 2).' },
      { note: '1 năm = 12 tháng = 365 (hoặc 366) ngày.' },
    ],
    examples: [
      { q: 'Tháng 9 có bao nhiêu ngày?', a: 'Tháng 9 có 30 ngày.' },
      { q: 'Năm nhuận tháng 2 có bao nhiêu ngày?', a: 'Tháng 2 năm nhuận có 29 ngày.' },
    ],
  },

  'P3-w33-quiz': {
    topic: 'Ki-lô-mét (km) · Đo độ dài',
    intro: 'Để đo những quãng đường XA, ta dùng đơn vị mới: ki-lô-mét.',
    objectives: [
      'Biết 1 km = 1 000 m.',
      'Sắp xếp các đơn vị độ dài đã học: km, m, dm, cm, mm.',
    ],
    theory: [
      { h: 'Bảng đơn vị độ dài' },
      { ul: [
        'km (ki-lô-mét) > m (mét) > dm > cm > mm.',
        '1 km = 1 000 m.',
        '1 m = 10 dm = 100 cm = 1 000 mm.',
      ] },
      { h: 'Cách đổi nhanh' },
      { p: 'Chuyển sang đơn vị nhỏ liền kề: nhân 10. Chuyển sang lớn liền kề: chia 10. Riêng km ↔ m: nhân/chia 1 000.' },
      { note: 'Một quãng đường đi học khoảng 1–3 km; chiều cao bàn khoảng 70 cm.' },
    ],
    examples: [
      { q: '5 km = ? m.', a: '5 km = 5 × 1 000 = 5 000 m.' },
      { q: '3 m 20 cm = ? cm.', a: '3 m = 300 cm; 300 + 20 = 320 cm.' },
    ],
  },

  'P3-w34-quiz': {
    topic: 'Hình hộp chữ nhật · Hình lập phương · Biểu đồ tranh',
    intro: 'Tuần áp chót, cô đưa các em làm quen với hình KHỐI và biểu đồ tranh — trực quan và dễ thương!',
    objectives: [
      'Nhận biết hình hộp chữ nhật và hình lập phương.',
      'Đọc – lập biểu đồ tranh đơn giản.',
    ],
    theory: [
      { h: 'Hai khối quen thuộc' },
      { ul: [
        'HÌNH HỘP CHỮ NHẬT: 6 mặt đều là hình chữ nhật (như hộp bánh, viên gạch).',
        'HÌNH LẬP PHƯƠNG: 6 mặt đều là hình VUÔNG bằng nhau (như viên xúc xắc).',
        'Cả hai đều có 6 mặt, 12 cạnh, 8 đỉnh.',
      ] },
      { h: 'Biểu đồ tranh' },
      { p: 'Biểu đồ tranh dùng hình vẽ để biểu diễn số liệu. Mỗi hình tượng trưng cho 1 hoặc nhiều đơn vị (xem chú thích).' },
      { note: 'Hình lập phương là TRƯỜNG HỢP ĐẶC BIỆT của hình hộp chữ nhật khi 3 kích thước bằng nhau.' },
    ],
    examples: [
      { q: 'Viên xúc xắc là hình gì?', a: 'Viên xúc xắc là hình lập phương vì 6 mặt đều là hình vuông bằng nhau.' },
      { q: 'Biểu đồ tranh có 1 quả cam = 5 bạn thích. Có 4 quả cam thì có bao nhiêu bạn thích?', a: '4 × 5 = 20 (bạn). Đáp số: 20 bạn.' },
    ],
  },

  'P3-w35-quiz': {
    topic: 'Ôn tập cuối năm',
    intro: 'Một năm học sắp kết thúc rồi! Cùng cô tổng kết những kiến thức quan trọng nhất nhé.',
    objectives: [
      'Hệ thống toàn bộ kiến thức Lớp 3.',
      'Tự tin bước sang Lớp 4.',
    ],
    theory: [
      { h: 'Nội dung trọng tâm cả năm' },
      { ul: [
        'Số đến 10 000: đọc, viết, so sánh, cộng – trừ – nhân – chia.',
        'Bảng nhân – chia từ 2 đến 9.',
        'Hình học: điểm, đoạn, góc, tam giác, tứ giác, chu vi.',
        'Đại lượng: kg, g, l, ml, km, m, giờ, phút, tiền Việt Nam.',
        'Giải bài toán có lời văn 1 – 2 bước tính.',
      ] },
      { h: 'Lời nhắn của cô' },
      { p: 'Học toán cần luyện tập đều mỗi ngày. Hãy đọc kĩ đề, làm cẩn thận, kiểm tra lại trước khi nộp.' },
      { note: 'Chúc các em một mùa hè vui vẻ và thành công ở Lớp 4!' },
    ],
    examples: [
      { q: 'Tính nhanh: 25 × 4 + 100.', a: '25 × 4 = 100; 100 + 100 = 200.' },
      { q: 'Một hình chữ nhật có chiều dài 12 cm, chiều rộng 8 cm. Chu vi bằng?', a: '(12 + 8) × 2 = 40 (cm). Đáp số: 40 cm.' },
    ],
  },

  'P3-w36-quiz': {
    topic: 'Kết thúc Lớp 3 — Hành trang vào Lớp 4',
    intro: 'Chúc mừng các em đã hoàn thành năm học Lớp 3! Hôm nay cô và trò cùng nhìn lại chặng đường đã đi, gói ghém những kiến thức quan trọng nhất làm hành trang bước sang Lớp 4 nhé!',
    objectives: [
      'Hệ thống toàn bộ kiến thức Toán Lớp 3 theo bốn mảng chính.',
      'Biết những gì thú vị đang chờ ở Lớp 4.',
      'Tự tin và vui vẻ kết thúc năm học.',
    ],
    theory: [
      { h: 'Bốn mảng lớn Toán Lớp 3 em đã chinh phục' },
      { ul: [
        'Số và tính toán: Số đến 10 000; cộng trừ số có 3–4 chữ số; bảng nhân và chia 2–9; nhân chia số có hai chữ số với số có một chữ số.',
        'Đại lượng và đo lường: kilôgam, gam, lít, mililit, kilômét, mét, xentimét, milimét; giờ, phút; tiền Việt Nam.',
        'Hình học: điểm, đoạn thẳng, đường thẳng, góc vuông; tam giác, tứ giác, hình chữ nhật, hình vuông, hình tròn; chu vi; hình hộp chữ nhật, hình lập phương.',
        'Giải toán: bài toán có lời văn 1–2 bước tính về gộp, tìm phần còn lại, so sánh, mua bán.',
      ] },
      { h: 'Lớp 4 sẽ có gì mới?' },
      { ul: [
        'Số và tính toán nâng lên đến triệu; học phân số; nhân chia số có nhiều chữ số.',
        'Đại lượng: tìm hiểu diện tích (cm², m²), giây, thế kỷ.',
        'Hình học: học diện tích hình chữ nhật và hình vuông.',
        'Giải toán phức tạp hơn, nhiều bước tính hơn — nhưng nền tảng Lớp 3 sẽ giúp em tự tin!',
      ] },
      { h: 'Kế hoạch ôn hè' },
      { ul: [
        'Ôn bảng nhân chia 2–9 mỗi ngày (5 phút/ngày là đủ).',
        'Giải 2–3 bài toán có lời văn để giữ "cảm giác số".',
        'Làm quen với phép nhân có nhớ để không bỡ ngỡ khi vào Lớp 4.',
      ] },
      { note: 'Em đã học được rất nhiều thứ trong năm nay! Hãy tự hào và tận hưởng kỳ nghỉ hè xứng đáng nhé!' },
    ],
    examples: [
      { q: 'Tính: 3456 + 2789.', a: '3456 + 2789 = 6245.' },
      { q: 'Tìm x biết: x × 6 = 54.', a: 'x = 54 : 6 = 9.' },
    ],
  },
};
