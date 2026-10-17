// ============================================================
// Lớp 8 · KHTN — Lý thuyết + Ví dụ 35 tuần (GDPT 2018)
// Hoá - Lý - Sinh tích hợp. Key TRÙNG id quiz: "S8KHTN-wNN-quiz".
// Bám SGK Khoa học tự nhiên 8 (Kết nối tri thức / Chân trời sáng tạo / Cánh Diều).
// ============================================================

const L = (topic, intro, objectives, theory, examples) => ({ topic, intro, objectives, theory, examples });

export const S8KHTN_LESSONS = {
  'S8KHTN-w01-quiz': L(
    'Phản ứng hoá học — Biến đổi vật lí và biến đổi hoá học',
    'Mở đầu Hoá học lớp 8 với phản ứng hoá học — sự biến đổi cốt lõi của môn Hoá. Hôm nay cô trò mình phân biệt khi nào chất chỉ "đổi hình" và khi nào thực sự "biến thành chất khác".',
    [
      'Phân biệt biến đổi vật lí và biến đổi hoá học.',
      'Nêu được khái niệm phản ứng hoá học, chất phản ứng và sản phẩm.',
      'Nhận biết dấu hiệu nhận ra có phản ứng hoá học xảy ra.',
    ],
    [
      { h: 'Biến đổi vật lí' },
      { p: 'Biến đổi vật lí là sự biến đổi mà chất chỉ thay đổi về trạng thái, hình dạng, kích thước… nhưng vẫn giữ nguyên là chất ban đầu (không sinh ra chất mới).' },
      { ul: ['Đun nước lỏng thành hơi nước — vẫn là H₂O.', 'Nghiền nhỏ viên phấn — vẫn là calcium carbonate.', 'Hoà tan đường vào nước — đường vẫn là đường.'] },
      { h: 'Biến đổi hoá học (phản ứng hoá học)' },
      { p: 'Biến đổi hoá học là sự biến đổi tạo ra chất mới. Quá trình biến đổi chất này thành chất khác gọi là phản ứng hoá học.' },
      { ul: ['Chất ban đầu bị biến đổi gọi là chất phản ứng (chất tham gia).', 'Chất mới sinh ra gọi là sản phẩm.', 'Sơ đồ chữ: Chất phản ứng → Sản phẩm.'] },
      { h: 'Bản chất của phản ứng hoá học' },
      { p: 'Trong phản ứng hoá học, liên kết giữa các nguyên tử thay đổi: các nguyên tử được sắp xếp lại để tạo phân tử mới. Số nguyên tử mỗi nguyên tố luôn được giữ nguyên — đây là cơ sở của định luật bảo toàn khối lượng.' },
      { h: 'Dấu hiệu nhận biết phản ứng hoá học' },
      { ul: ['Thay đổi màu sắc.', 'Có chất khí thoát ra (sủi bọt).', 'Xuất hiện chất kết tủa (chất rắn không tan).', 'Có sự toả nhiệt và phát sáng, hoặc ngược lại là thu nhiệt.'] },
      { note: 'Không phải lúc nào cũng cần đủ mọi dấu hiệu — chỉ cần có chất mới sinh ra là đã có phản ứng hoá học.' },
    ],
    [
      { q: 'Đốt dây magnesium (Mg) cháy sáng chói trong không khí tạo ra magnesium oxide (MgO). Đây là biến đổi gì?', a: 'Biến đổi hoá học — sinh ra chất mới là MgO, kèm theo phát sáng và toả nhiệt. Sơ đồ chữ: magnesium + oxygen → magnesium oxide.' },
      { q: 'Nước đá tan thành nước lỏng là biến đổi gì? Vì sao?', a: 'Biến đổi vật lí. Chất chỉ chuyển từ thể rắn sang thể lỏng, vẫn là H₂O, không có chất mới sinh ra.' },
      { q: 'Cho vôi sống (CaO) vào nước thấy toả nhiệt rất mạnh, tạo thành vôi tôi Ca(OH)₂. Hãy chỉ ra dấu hiệu và loại biến đổi.', a: 'Đây là biến đổi hoá học: sinh ra chất mới Ca(OH)₂, dấu hiệu là sự toả nhiệt mạnh. Sơ đồ chữ: calcium oxide + nước → calcium hydroxide.' },
    ]
  ),

  'S8KHTN-w02-quiz': L(
    'Phương trình hoá học — Định luật bảo toàn khối lượng',
    'Phương trình hoá học là "ngôn ngữ" để viết gọn một phản ứng. Muốn viết đúng, ta phải cân bằng số nguyên tử mỗi nguyên tố ở hai vế — đó là hệ quả của định luật bảo toàn khối lượng.',
    [
      'Phát biểu và vận dụng định luật bảo toàn khối lượng.',
      'Lập được phương trình hoá học từ sơ đồ phản ứng.',
      'Cân bằng phương trình bằng cách đặt hệ số thích hợp.',
    ],
    [
      { h: 'Định luật bảo toàn khối lượng (Lomonosov – Lavoisier)' },
      { p: 'Trong một phản ứng hoá học, tổng khối lượng các chất sản phẩm bằng tổng khối lượng các chất tham gia phản ứng.' },
      { p: 'Với phản ứng A + B → C + D, ta luôn có: m_A + m_B = m_C + m_D.' },
      { h: 'Vì sao khối lượng được bảo toàn?' },
      { p: 'Vì trong phản ứng chỉ có liên kết giữa các nguyên tử thay đổi, còn số nguyên tử mỗi nguyên tố không đổi. Nguyên tử không tự sinh ra cũng không mất đi nên khối lượng được giữ nguyên.' },
      { h: 'Phương trình hoá học' },
      { p: 'Phương trình hoá học biểu diễn ngắn gọn phản ứng bằng công thức hoá học của các chất. Ví dụ: 2H₂ + O₂ → 2H₂O.' },
      { h: 'Các bước lập phương trình hoá học' },
      { ul: [
        'Bước 1: Viết sơ đồ phản ứng (công thức chất phản ứng → công thức sản phẩm).',
        'Bước 2: Cân bằng số nguyên tử mỗi nguyên tố bằng cách đặt hệ số thích hợp trước công thức.',
        'Bước 3: Viết phương trình hoàn chỉnh (thay mũi tên đứt bằng mũi tên liền).',
      ] },
      { note: 'Chỉ được thay đổi hệ số đặt trước công thức, TUYỆT ĐỐI không thay đổi chỉ số trong công thức (ví dụ không được sửa H₂O thành H₂O₂).' },
      { h: 'Ý nghĩa của phương trình hoá học' },
      { p: 'Phương trình cho biết tỉ lệ về số nguyên tử, số phân tử (hay số mol) giữa các chất trong phản ứng. Tỉ lệ này chính là tỉ lệ các hệ số.' },
    ],
    [
      { q: 'Đốt cháy 9 g kim loại magnesium trong oxygen thu được 15 g magnesium oxide. Tính khối lượng oxygen đã phản ứng.', a: 'Theo định luật bảo toàn khối lượng: m(Mg) + m(O₂) = m(MgO) ⇒ 9 + m(O₂) = 15 ⇒ m(O₂) = 6 g.' },
      { q: 'Cân bằng phương trình: H₂ + O₂ → H₂O.', a: '2H₂ + O₂ → 2H₂O. Vế trái 4 H và 2 O, vế phải 4 H và 2 O — đã cân bằng.' },
      { q: 'Cân bằng phương trình: Fe + O₂ → Fe₂O₃.', a: '4Fe + 3O₂ → 2Fe₂O₃. Vế trái 4 Fe và 6 O, vế phải 4 Fe và 6 O — đã cân bằng.' },
    ]
  ),

  'S8KHTN-w03-quiz': L(
    'Mol và khối lượng mol',
    'Nguyên tử và phân tử nhỏ đến mức không thể đếm từng hạt. Vì vậy các nhà hoá học dùng "mol" — một đại lượng làm cầu nối giữa thế giới hạt vi mô và khối lượng ta cân được trong thực tế.',
    [
      'Nêu được khái niệm mol và số Avogadro.',
      'Hiểu khái niệm khối lượng mol và tính được khối lượng mol của một chất.',
      'Chuyển đổi giữa số mol và khối lượng.',
    ],
    [
      { h: 'Mol là gì?' },
      { p: 'Mol là lượng chất có chứa 6,022 × 10²³ hạt vi mô (nguyên tử, phân tử…) của chất đó. Số 6,022 × 10²³ gọi là số Avogadro, kí hiệu N_A.' },
      { ul: ['1 mol nguyên tử sắt chứa 6,022 × 10²³ nguyên tử Fe.', '1 mol phân tử nước chứa 6,022 × 10²³ phân tử H₂O.'] },
      { h: 'Vì sao cần đến mol?' },
      { p: 'Vì hạt vi mô quá nhỏ và quá nhiều, ta không thể đếm trực tiếp. Mol giúp ta "đếm hạt bằng cách cân khối lượng" — cầu nối giữa số hạt và khối lượng.' },
      { h: 'Khối lượng mol (M)' },
      { p: 'Khối lượng mol M của một chất là khối lượng của 1 mol chất đó, đơn vị g/mol. Khối lượng mol có cùng trị số với nguyên tử khối hoặc phân tử khối của chất.' },
      { ul: ['M(H) = 1 g/mol; M(O) = 16 g/mol; M(Na) = 23 g/mol.', 'M(H₂O) = 2·1 + 16 = 18 g/mol.', 'M(NaCl) = 23 + 35,5 = 58,5 g/mol.', 'M(CO₂) = 12 + 2·16 = 44 g/mol.'] },
      { h: 'Công thức chuyển đổi mol ↔ khối lượng' },
      { p: 'n = m / M, trong đó n là số mol (mol), m là khối lượng (g), M là khối lượng mol (g/mol). Suy ra m = n · M.' },
      { note: 'Muốn tính M của một hợp chất, ta cộng khối lượng mol của tất cả các nguyên tử có trong công thức.' },
    ],
    [
      { q: 'Tính số mol có trong 36 g nước (H₂O).', a: 'M(H₂O) = 18 g/mol. n = m/M = 36/18 = 2 mol.' },
      { q: '0,5 mol muối ăn (NaCl) có khối lượng bao nhiêu gam?', a: 'M(NaCl) = 58,5 g/mol. m = n·M = 0,5 · 58,5 = 29,25 g.' },
      { q: '0,25 mol khí carbon dioxide CO₂ chứa bao nhiêu phân tử CO₂?', a: 'Số phân tử = n · N_A = 0,25 · 6,022 × 10²³ ≈ 1,5055 × 10²³ phân tử.' },
    ]
  ),

  'S8KHTN-w04-quiz': L(
    'Thể tích mol chất khí và tính theo phương trình hoá học',
    'Khi đã biết mol và khối lượng mol, ta thêm một công cụ nữa cho chất khí — thể tích mol — rồi vận dụng tất cả để tính lượng chất tham gia và tạo thành trong một phản ứng.',
    [
      'Nêu được thể tích mol chất khí ở điều kiện chuẩn.',
      'Tính khối lượng, thể tích khí dựa vào phương trình hoá học.',
      'Thực hiện đầy đủ các bước tính theo phương trình hoá học.',
    ],
    [
      { h: 'Thể tích mol chất khí' },
      { p: 'Ở cùng điều kiện nhiệt độ và áp suất, những thể tích bằng nhau của mọi chất khí đều chứa số phân tử khí bằng nhau (định luật Avogadro).' },
      { p: 'Ở điều kiện chuẩn (25 °C, 1 bar) theo SGK mới, 1 mol khí bất kì chiếm thể tích khoảng 24,79 lít. Ở điều kiện tiêu chuẩn cũ (0 °C, 1 atm) thì 1 mol khí chiếm 22,4 lít.' },
      { h: 'Công thức tính thể tích khí' },
      { p: 'Ở điều kiện chuẩn: V = 24,79 · n (lít). Ở đktc cũ: V = 22,4 · n (lít).' },
      { h: 'Các bước tính theo phương trình hoá học' },
      { ul: [
        'Bước 1: Viết và cân bằng phương trình hoá học.',
        'Bước 2: Tính số mol chất đã biết (n = m/M hoặc n = V/24,79).',
        'Bước 3: Dựa vào tỉ lệ hệ số trong phương trình, suy ra số mol chất cần tìm.',
        'Bước 4: Tính khối lượng (m = n·M) hoặc thể tích khí (V = 24,79·n) của chất cần tìm.',
      ] },
      { note: 'Tỉ lệ số mol giữa các chất luôn bằng tỉ lệ các hệ số trong phương trình đã cân bằng.' },
    ],
    [
      { q: 'Đốt cháy hoàn toàn 5,6 g sắt (Fe) trong oxygen dư. Tính khối lượng iron(III) oxide Fe₂O₃ tạo thành.', a: 'n(Fe) = 5,6/56 = 0,1 mol. PTHH: 4Fe + 3O₂ → 2Fe₂O₃. Theo tỉ lệ, n(Fe₂O₃) = n(Fe)/2 = 0,05 mol. m = 0,05 · 160 = 8 g.' },
      { q: 'Tính thể tích khí oxygen (ở đktc, 22,4 L/mol) cần để đốt cháy hết 4 g khí H₂.', a: 'n(H₂) = 4/2 = 2 mol. PTHH: 2H₂ + O₂ → 2H₂O. n(O₂) = n(H₂)/2 = 1 mol. V = 22,4 · 1 = 22,4 lít.' },
      { q: 'Cho 6,5 g kẽm (Zn) tác dụng với dung dịch HCl dư. Tính thể tích khí H₂ thoát ra ở đktc.', a: 'n(Zn) = 6,5/65 = 0,1 mol. PTHH: Zn + 2HCl → ZnCl₂ + H₂. n(H₂) = n(Zn) = 0,1 mol. V = 22,4 · 0,1 = 2,24 lít.' },
    ]
  ),

  'S8KHTN-w05-quiz': L(
    'Dung dịch và nồng độ phần trăm (C%)',
    'Phần lớn phản ứng trong đời sống và phòng thí nghiệm xảy ra trong dung dịch. Hôm nay ta học cách "định lượng độ đậm đặc" của dung dịch bằng nồng độ phần trăm.',
    [
      'Nêu được khái niệm dung dịch, chất tan, dung môi.',
      'Hiểu khái niệm độ tan và dung dịch bão hoà.',
      'Tính được nồng độ phần trăm của dung dịch.',
    ],
    [
      { h: 'Dung dịch, chất tan và dung môi' },
      { p: 'Dung dịch là hỗn hợp đồng nhất của chất tan và dung môi. Chất tan là chất bị hoà tan; dung môi là chất hoà tan (thường là nước).' },
      { ul: ['Nước muối: NaCl là chất tan, nước là dung môi.', 'Dung môi phổ biến nhất là nước nên gọi là dung môi vạn năng.'] },
      { h: 'Độ tan và dung dịch bão hoà' },
      { ul: [
        'Dung dịch chưa bão hoà: còn có thể hoà tan thêm chất tan.',
        'Dung dịch bão hoà: không thể hoà tan thêm chất tan ở nhiệt độ đó.',
        'Độ tan (S) của một chất là khối lượng chất tan (gam) tan tối đa trong 100 g nước để tạo dung dịch bão hoà ở nhiệt độ xác định.',
      ] },
      { h: 'Yếu tố ảnh hưởng đến độ tan' },
      { ul: ['Với chất rắn: nhiệt độ tăng thì độ tan thường tăng.', 'Với chất khí: nhiệt độ tăng thì độ tan giảm, áp suất tăng thì độ tan tăng.'] },
      { h: 'Nồng độ phần trăm (C%)' },
      { p: 'Nồng độ phần trăm cho biết số gam chất tan có trong 100 g dung dịch.' },
      { p: 'Công thức: C% = (m_ct / m_dd) × 100%, trong đó m_ct là khối lượng chất tan, m_dd là khối lượng dung dịch.' },
      { note: 'Khối lượng dung dịch: m_dd = m_ct + m_dung_môi.' },
    ],
    [
      { q: 'Hoà tan 10 g muối ăn vào 90 g nước. Tính nồng độ phần trăm của dung dịch.', a: 'm_dd = 10 + 90 = 100 g. C% = (10/100) × 100% = 10%.' },
      { q: 'Một dung dịch có khối lượng 200 g, nồng độ 5%. Tính khối lượng chất tan.', a: 'm_ct = (C% · m_dd)/100 = (5 · 200)/100 = 10 g.' },
      { q: 'Cần bao nhiêu gam nước để pha 25 g đường thành dung dịch đường 10%?', a: 'm_dd = m_ct · 100/C% = 25 · 100/10 = 250 g. Khối lượng nước = m_dd − m_ct = 250 − 25 = 225 g.' },
    ]
  ),

  'S8KHTN-w06-quiz': L(
    'Nồng độ mol và pha loãng dung dịch',
    'Với phản ứng trong dung dịch, các nhà hoá học thường quan tâm "có bao nhiêu mol chất tan trong mỗi lít dung dịch" — đó là nồng độ mol. Ta cũng học cách pha loãng dung dịch cho đúng.',
    [
      'Nêu công thức và tính được nồng độ mol của dung dịch.',
      'Chuyển đổi giữa nồng độ mol và nồng độ phần trăm khi biết khối lượng riêng.',
      'Vận dụng công thức pha loãng dung dịch.',
    ],
    [
      { h: 'Nồng độ mol (C_M)' },
      { p: 'Nồng độ mol cho biết số mol chất tan có trong 1 lít dung dịch.' },
      { p: 'Công thức: C_M = n / V, trong đó n là số mol chất tan (mol), V là thể tích dung dịch (lít). Đơn vị: mol/L (kí hiệu M).' },
      { h: 'Lưu ý về đơn vị thể tích' },
      { p: 'Thể tích phải đổi về lít trước khi tính. Ví dụ 250 mL = 0,25 L; 500 mL = 0,5 L.' },
      { h: 'Pha loãng dung dịch' },
      { p: 'Khi pha loãng (thêm dung môi), số mol chất tan không đổi, chỉ có thể tích dung dịch tăng lên nên nồng độ giảm.' },
      { p: 'Công thức pha loãng: C₁ · V₁ = C₂ · V₂ (số mol chất tan trước = sau khi pha loãng).' },
      { h: 'So sánh hai loại nồng độ' },
      { ul: [
        'C% tính theo khối lượng dung dịch (đơn vị %).',
        'C_M tính theo thể tích dung dịch (đơn vị mol/L).',
        'Khi biết khối lượng riêng D của dung dịch, có thể chuyển đổi qua lại giữa C% và C_M.',
      ] },
      { note: 'Khi pha loãng acid đặc, phải rót từ từ acid vào nước, KHÔNG làm ngược lại để tránh acid bắn ra gây bỏng.' },
    ],
    [
      { q: 'Hoà tan 0,5 mol NaOH vào nước được 2 lít dung dịch. Tính nồng độ mol.', a: 'C_M = n/V = 0,5/2 = 0,25 mol/L (0,25 M).' },
      { q: 'Pha loãng 100 mL dung dịch HCl 2 M thành 500 mL. Tính nồng độ mol của dung dịch sau khi pha loãng.', a: 'Áp dụng C₁V₁ = C₂V₂: 2 · 0,1 = C₂ · 0,5 ⇒ C₂ = 0,2/0,5 = 0,4 M.' },
      { q: 'Tính khối lượng NaOH cần để pha 250 mL dung dịch NaOH 0,2 M.', a: 'n = C_M · V = 0,2 · 0,25 = 0,05 mol. M(NaOH) = 40. m = 0,05 · 40 = 2 g.' },
    ]
  ),

  'S8KHTN-w07-quiz': L(
    'Acid — Khái niệm và tính chất hoá học',
    'Acid (axit) có mặt khắp nơi: trong quả chanh, trong dạ dày, trong bình ắc quy. Hôm nay ta tìm hiểu acid là gì và những tính chất hoá học chung của chúng.',
    [
      'Nêu được khái niệm acid và một số acid thông dụng.',
      'Trình bày tính chất hoá học của acid.',
      'Viết được phương trình minh hoạ tính chất của acid.',
    ],
    [
      { h: 'Khái niệm acid' },
      { p: 'Acid là hợp chất trong phân tử có nguyên tử hydrogen liên kết với gốc acid. Khi tan trong nước, acid phân li tạo ra ion H⁺ (cation hydrogen).' },
      { ul: ['Hydrochloric acid: HCl.', 'Sulfuric acid: H₂SO₄.', 'Nitric acid: HNO₃.'] },
      { h: 'Tính chất hoá học của acid' },
      { p: 'Dung dịch acid có những tính chất hoá học chung sau đây:' },
      { ul: [
        'Làm đổi màu chất chỉ thị: quỳ tím chuyển sang màu đỏ.',
        'Tác dụng với nhiều kim loại → muối + khí hydrogen (H₂↑).',
        'Tác dụng với base → muối + nước (phản ứng trung hoà).',
        'Tác dụng với oxide base → muối + nước.',
      ] },
      { h: 'Acid tác dụng với kim loại' },
      { p: 'Dung dịch acid (HCl, H₂SO₄ loãng) tác dụng với kim loại đứng trước hydrogen trong dãy hoạt động hoá học, tạo muối và giải phóng khí H₂.' },
      { p: 'Ví dụ: Zn + 2HCl → ZnCl₂ + H₂↑.' },
      { h: 'Một số acid quan trọng' },
      { ul: [
        'HCl: có trong dịch vị dạ dày, dùng tẩy gỉ kim loại.',
        'H₂SO₄: dùng sản xuất phân bón, chất tẩy rửa, ắc quy; H₂SO₄ đặc rất háo nước.',
        'CH₃COOH (acetic acid): có trong giấm ăn.',
      ] },
      { note: 'Acid đặc, nhất là H₂SO₄ đặc, có tính ăn mòn và gây bỏng — phải hết sức cẩn thận khi sử dụng.' },
    ],
    [
      { q: 'Viết phương trình của phản ứng giữa kẽm (Zn) và dung dịch HCl.', a: 'Zn + 2HCl → ZnCl₂ + H₂↑. Sản phẩm là muối kẽm chloride và khí hydrogen.' },
      { q: 'Nhúng quỳ tím vào dung dịch HCl thì quỳ tím đổi màu thế nào?', a: 'Quỳ tím chuyển sang màu đỏ, vì dung dịch HCl là acid.' },
      { q: 'Viết phương trình của phản ứng giữa sắt (Fe) và dung dịch sulfuric acid loãng H₂SO₄.', a: 'Fe + H₂SO₄ → FeSO₄ + H₂↑. Tạo muối iron(II) sulfate và khí hydrogen.' },
    ]
  ),

  'S8KHTN-w08-quiz': L(
    'Base — Tính chất và thang pH',
    'Base (bazơ) là "đối thủ" của acid. Hôm nay ta học tính chất của base, phản ứng trung hoà giữa acid và base, và một công cụ rất hữu ích để đo độ acid – base: thang pH.',
    [
      'Nêu được khái niệm base và một số base thông dụng.',
      'Trình bày tính chất hoá học của base.',
      'Hiểu ý nghĩa của thang pH.',
    ],
    [
      { h: 'Khái niệm base' },
      { p: 'Base là hợp chất trong phân tử có nguyên tử kim loại liên kết với nhóm hydroxide (OH). Khi tan trong nước, base phân li tạo ra ion OH⁻.' },
      { ul: ['Sodium hydroxide: NaOH.', 'Potassium hydroxide: KOH.', 'Calcium hydroxide: Ca(OH)₂.'] },
      { h: 'Phân loại base' },
      { ul: ['Base tan (kiềm): NaOH, KOH, Ca(OH)₂ — tan trong nước.', 'Base không tan: Cu(OH)₂, Fe(OH)₃ — không tan trong nước.'] },
      { h: 'Tính chất hoá học của base' },
      { ul: [
        'Dung dịch base làm quỳ tím chuyển sang màu xanh, làm phenolphthalein không màu chuyển sang màu hồng.',
        'Tác dụng với acid → muối + nước (phản ứng trung hoà).',
        'Tác dụng với oxide acid → muối + nước.',
      ] },
      { h: 'Phản ứng trung hoà' },
      { p: 'Acid tác dụng với base tạo thành muối và nước. Ví dụ: NaOH + HCl → NaCl + H₂O. Đây là cơ sở để chữa bệnh đau dạ dày bằng thuốc kháng acid.' },
      { h: 'Thang pH' },
      { ul: [
        'pH < 7: môi trường acid.',
        'pH = 7: môi trường trung tính.',
        'pH > 7: môi trường base (kiềm).',
      ] },
      { note: 'Thang pH dùng để đánh giá độ acid của đất trồng, nước hồ, nước thải — giúp chăm sóc cây trồng và bảo vệ môi trường.' },
    ],
    [
      { q: 'Viết phương trình phản ứng trung hoà giữa NaOH và HCl.', a: 'NaOH + HCl → NaCl + H₂O. Sản phẩm là muối ăn và nước.' },
      { q: 'Nhúng quỳ tím vào dung dịch NaOH thì quỳ tím đổi màu thế nào?', a: 'Quỳ tím chuyển sang màu xanh, vì NaOH là dung dịch base (kiềm).' },
      { q: 'Nước cốt chanh có pH ≈ 2, nước xà phòng có pH ≈ 10. Cho biết môi trường của mỗi loại.', a: 'Nước chanh pH ≈ 2 < 7 nên có môi trường acid. Nước xà phòng pH ≈ 10 > 7 nên có môi trường base (kiềm).' },
    ]
  ),

  'S8KHTN-w09-quiz': L(
    'Oxide và Muối — Tính chất, ứng dụng',
    'Hoá học lớp 8 còn hai nhóm hợp chất vô cơ quan trọng: oxide và muối. Hôm nay ta tìm hiểu chúng được tạo ra như thế nào, có tính chất gì và ứng dụng ra sao trong đời sống.',
    [
      'Phân loại được oxide và nêu tính chất của oxide acid, oxide base.',
      'Nêu khái niệm và tính chất hoá học của muối.',
      'Trình bày một số ứng dụng của muối trong đời sống, sản xuất.',
    ],
    [
      { h: 'Oxide là gì?' },
      { p: 'Oxide là hợp chất gồm hai nguyên tố, trong đó có một nguyên tố là oxygen. Ví dụ: CO₂, SO₂, CaO, Fe₂O₃.' },
      { h: 'Phân loại oxide' },
      { ul: [
        'Oxide base: tác dụng với acid tạo muối và nước (CaO, Na₂O, CuO).',
        'Oxide acid: tác dụng với base tạo muối và nước (CO₂, SO₂, P₂O₅).',
      ] },
      { h: 'Khái niệm muối' },
      { p: 'Muối là hợp chất mà phân tử gồm cation kim loại (hoặc nhóm NH₄⁺) liên kết với anion gốc acid. Ví dụ: NaCl, CuSO₄, KNO₃, CaCO₃.' },
      { h: 'Tính chất hoá học của muối' },
      { ul: [
        'Tác dụng với kim loại → muối mới + kim loại mới (kim loại mạnh đẩy kim loại yếu).',
        'Tác dụng với acid → muối mới + acid mới (điều kiện: tạo kết tủa hoặc chất khí).',
        'Tác dụng với base → muối mới + base mới (điều kiện: tạo kết tủa).',
        'Tác dụng với muối khác → hai muối mới (điều kiện: có kết tủa).',
        'Một số muối bị nhiệt phân huỷ.',
      ] },
      { h: 'Ứng dụng của muối' },
      { ul: [
        'NaCl: muối ăn, sản xuất NaOH, Cl₂, nước Javel.',
        'CaCO₃: sản xuất vôi, xi măng (đá vôi).',
        'Na₂CO₃: sản xuất thuỷ tinh, xà phòng.',
        'NH₄NO₃, (NH₄)₂SO₄: làm phân bón.',
      ] },
      { note: 'Phản ứng của muối thường chỉ xảy ra khi sản phẩm có chất kết tủa hoặc chất khí — đây là điều kiện quan trọng.' },
    ],
    [
      { q: 'Viết phương trình phản ứng giữa dung dịch NaCl và AgNO₃.', a: 'NaCl + AgNO₃ → NaNO₃ + AgCl↓. Tạo kết tủa trắng AgCl — dấu hiệu phản ứng xảy ra.' },
      { q: 'CaO thuộc loại oxide nào? Viết phương trình của nó với HCl.', a: 'CaO là oxide base. CaO + 2HCl → CaCl₂ + H₂O.' },
      { q: 'Vì sao có thể dùng đá vôi (CaCO₃) để sản xuất vôi sống?', a: 'Khi nung đá vôi ở nhiệt độ cao, CaCO₃ bị nhiệt phân: CaCO₃ → CaO + CO₂↑. CaO chính là vôi sống dùng trong xây dựng.' },
    ]
  ),

  'S8KHTN-w10-quiz': L(
    'Khối lượng riêng và áp suất chất rắn',
    'Bắt đầu phần Vật lí lớp 8 với hai đại lượng gần gũi: khối lượng riêng (vì sao gỗ nổi mà sắt chìm) và áp suất (vì sao dao bén thì cắt dễ). Cùng tìm hiểu nhé!',
    [
      'Nêu khái niệm và công thức tính khối lượng riêng.',
      'Nêu khái niệm áp lực và áp suất.',
      'Vận dụng công thức p = F/S để giải thích hiện tượng.',
    ],
    [
      { h: 'Khối lượng riêng' },
      { p: 'Khối lượng riêng của một chất là khối lượng của một đơn vị thể tích chất đó. Kí hiệu D (hoặc ρ).' },
      { p: 'Công thức: D = m / V, trong đó m là khối lượng (kg), V là thể tích (m³). Đơn vị D: kg/m³ hoặc g/cm³.' },
      { ul: ['D(nước) = 1000 kg/m³ = 1 g/cm³.', 'D(sắt) ≈ 7800 kg/m³.', 'D(gỗ) ≈ 600–800 kg/m³ nên gỗ nổi trên nước.'] },
      { h: 'Áp lực' },
      { p: 'Áp lực là lực ép có phương vuông góc với bề mặt bị ép. Ví dụ trọng lượng của vật đặt trên bàn ép vuông góc xuống mặt bàn.' },
      { h: 'Áp suất' },
      { p: 'Áp suất là độ lớn của áp lực trên một đơn vị diện tích bị ép.' },
      { p: 'Công thức: p = F / S, trong đó F là áp lực (N), S là diện tích bị ép (m²). Đơn vị áp suất: Pa (pascal), 1 Pa = 1 N/m².' },
      { h: 'Tăng – giảm áp suất' },
      { ul: [
        'Muốn tăng áp suất: tăng áp lực hoặc giảm diện tích bị ép (mài dao sắc, đầu đinh nhọn).',
        'Muốn giảm áp suất: giảm áp lực hoặc tăng diện tích bị ép (bánh xích xe tăng, móng nhà rộng).',
      ] },
      { note: 'Cùng một lực, diện tích càng nhỏ thì áp suất càng lớn — đó là lí do dao càng bén càng dễ cắt.' },
    ],
    [
      { q: 'Một khối kim loại có khối lượng 780 g và thể tích 100 cm³. Tính khối lượng riêng và cho biết đó có thể là kim loại gì.', a: 'D = m/V = 780/100 = 7,8 g/cm³ = 7800 kg/m³. Đây có thể là sắt (thép).' },
      { q: 'Một người nặng 50 kg đứng bằng hai chân, tổng diện tích tiếp xúc 250 cm². Tính áp suất lên mặt sàn (g = 10 N/kg).', a: 'F = P = 50 · 10 = 500 N. S = 250 cm² = 0,025 m². p = F/S = 500/0,025 = 20 000 Pa.' },
      { q: 'Vì sao đi giày cao gót dễ lún xuống đất mềm hơn đi giày đế bằng?', a: 'Vì gót giày cao gót có diện tích tiếp xúc nhỏ, trong khi áp lực (trọng lượng) không đổi, nên áp suất p = F/S rất lớn, làm gót lún sâu xuống đất.' },
    ]
  ),

  'S8KHTN-w11-quiz': L(
    'Áp suất chất lỏng và chất khí',
    'Lặn càng sâu càng tức ngực, hút ống hút thì nước dâng lên — đó đều là chuyện của áp suất chất lỏng và áp suất khí quyển. Hôm nay ta khám phá chúng.',
    [
      'Nêu được đặc điểm áp suất trong lòng chất lỏng.',
      'Vận dụng công thức p = ρ·g·h.',
      'Nêu sự tồn tại và độ lớn của áp suất khí quyển.',
    ],
    [
      { h: 'Áp suất chất lỏng' },
      { p: 'Chất lỏng gây áp suất theo mọi phương lên đáy bình, thành bình và các vật ở trong lòng nó. Áp suất chất lỏng tăng theo độ sâu.' },
      { h: 'Công thức áp suất chất lỏng' },
      { p: 'p = ρ · g · h, trong đó ρ là khối lượng riêng của chất lỏng (kg/m³), g ≈ 10 N/kg, h là độ sâu tính từ mặt thoáng (m). Đơn vị p: Pa.' },
      { h: 'Bình thông nhau' },
      { p: 'Trong bình thông nhau chứa cùng một chất lỏng đứng yên, mặt thoáng của chất lỏng ở các nhánh luôn ở cùng một độ cao. Nguyên lí này được dùng trong máy thuỷ lực, ấm nước, đập nước.' },
      { h: 'Áp suất khí quyển' },
      { p: 'Trái Đất được bao bọc bởi lớp không khí dày hàng trăm km. Lớp không khí này có trọng lượng nên gây ra áp suất khí quyển tác dụng lên mọi vật trên mặt đất theo mọi phương.' },
      { ul: [
        'Áp suất khí quyển ở mực nước biển ≈ 101 325 Pa ≈ 1 atm ≈ 760 mmHg.',
        'Lên cao, không khí loãng hơn nên áp suất khí quyển giảm.',
      ] },
      { note: 'Khi hút sữa bằng ống hút, ta làm giảm áp suất trong miệng; áp suất khí quyển bên ngoài lớn hơn đẩy sữa dâng lên trong ống.' },
    ],
    [
      { q: 'Tính áp suất của nước tại điểm cách mặt nước 5 m (ρ = 1000 kg/m³, g = 10 N/kg).', a: 'p = ρ·g·h = 1000 · 10 · 5 = 50 000 Pa.' },
      { q: 'Vì sao thợ lặn sâu phải mặc bộ đồ chịu áp suất đặc biệt?', a: 'Vì càng xuống sâu, áp suất chất lỏng p = ρgh càng lớn, ép mạnh lên cơ thể. Bộ đồ chuyên dụng giúp cân bằng và chịu được áp suất lớn dưới nước.' },
      { q: 'Thí nghiệm cốc nước úp tờ giấy: lật ngược cốc đầy nước có bìa che miệng, nước không chảy ra. Giải thích.', a: 'Vì áp suất khí quyển tác dụng lên tờ giấy từ phía dưới lớn hơn áp suất của cột nước trong cốc đẩy xuống, nên giữ tờ giấy và nước không chảy ra.' },
    ]
  ),

  'S8KHTN-w12-quiz': L(
    'Lực — Tác dụng làm quay và đòn bẩy',
    'Lực không chỉ làm vật chuyển động hay biến dạng, mà còn có thể làm vật quay quanh một trục. Hiểu điều này, ta giải thích được vì sao đòn bẩy giúp nâng vật nặng nhẹ nhàng.',
    [
      'Nêu được lực có thể làm quay vật quanh một trục.',
      'Nêu cấu tạo và tác dụng của đòn bẩy.',
      'Vận dụng điều kiện cân bằng của đòn bẩy.',
    ],
    [
      { h: 'Lực và tác dụng làm quay' },
      { p: 'Lực tác dụng lên một vật có thể làm vật quay quanh một trục (điểm tựa). Tác dụng làm quay của lực phụ thuộc vào độ lớn của lực và khoảng cách từ trục quay đến giá của lực (cánh tay đòn).' },
      { h: 'Đòn bẩy' },
      { p: 'Đòn bẩy là một thanh cứng có thể quay quanh một điểm tựa O. Đòn bẩy có 3 yếu tố: điểm tựa O, điểm đặt lực tác dụng F (cánh tay đòn d₁), điểm đặt tải trọng P (cánh tay đòn d₂).' },
      { h: 'Điều kiện cân bằng của đòn bẩy' },
      { p: 'Đòn bẩy cân bằng khi: F · d₁ = P · d₂. Nếu cánh tay đòn của lực F lớn hơn (d₁ > d₂) thì F < P — ta được lợi về lực.' },
      { h: 'Lợi về lực, thiệt về đường đi' },
      { p: 'Khi đòn bẩy cho lợi về lực thì lại thiệt về đường đi: ta phải kéo đầu kia đi một quãng đường dài hơn. Không có máy cơ đơn giản nào cho lợi cả về lực lẫn đường đi.' },
      { h: 'Ứng dụng của đòn bẩy' },
      { ul: ['Bập bênh, cái kéo, kìm, cờ-lê.', 'Búa nhổ đinh, xe cút kít (xe rùa).', 'Mái chèo, cần cẩu, kim bấm giấy.'] },
      { note: 'Cơ thể người cũng có nhiều đòn bẩy: cẳng tay nâng vật là một đòn bẩy với khuỷu tay làm điểm tựa.' },
    ],
    [
      { q: 'Một đòn bẩy có d₁ = 2 m, d₂ = 0,5 m. Để nâng tải trọng P = 200 N thì cần lực F bao nhiêu?', a: 'Áp dụng F·d₁ = P·d₂: F = P·d₂/d₁ = 200 · 0,5/2 = 50 N. Ta được lợi 4 lần về lực.' },
      { q: 'Vì sao dùng đồ khui (mở nắp chai) lại bật nắp dễ hơn dùng tay không?', a: 'Vì đồ khui là một đòn bẩy có cánh tay đòn của lực ta tác dụng (d₁) lớn hơn nhiều so với cánh tay đòn của nắp chai (d₂). Theo F·d₁ = P·d₂, lực ta bỏ ra nhỏ vẫn tạo được lực bật nắp lớn.' },
      { q: 'Hai bạn ngồi bập bênh: bạn A nặng 30 kg ngồi cách trục 1,5 m. Bạn B nặng 45 kg phải ngồi cách trục bao nhiêu để cân bằng?', a: 'Cân bằng khi P_A·d_A = P_B·d_B. (30·10)·1,5 = (45·10)·d_B ⇒ 450 = 450·d_B ⇒ d_B = 1 m.' },
    ]
  ),

  'S8KHTN-w13-quiz': L(
    'Tác dụng của dòng điện và mạch điện',
    'Điện làm sáng bóng đèn, làm nóng bàn ủi, chạy quạt máy. Hôm nay ta tìm hiểu dòng điện là gì, các tác dụng của nó và cách lắp một mạch điện đơn giản.',
    [
      'Nêu khái niệm dòng điện và nguồn điện.',
      'Nêu các tác dụng của dòng điện.',
      'Vẽ và hiểu sơ đồ mạch điện đơn giản.',
    ],
    [
      { h: 'Dòng điện' },
      { p: 'Dòng điện là dòng các hạt mang điện dịch chuyển có hướng. Trong kim loại, dòng điện là dòng các electron tự do dịch chuyển có hướng.' },
      { h: 'Nguồn điện' },
      { p: 'Nguồn điện cung cấp dòng điện cho các thiết bị hoạt động. Mỗi nguồn điện có hai cực: cực dương (+) và cực âm (−). Ví dụ: pin, ắc quy, ổ cắm điện.' },
      { h: 'Mạch điện' },
      { p: 'Mạch điện gồm: nguồn điện, dây dẫn, thiết bị tiêu thụ điện (bóng đèn, quạt…) và công tắc. Mạch kín thì có dòng điện chạy, mạch hở thì không.' },
      { h: 'Các tác dụng của dòng điện' },
      { ul: [
        'Tác dụng nhiệt: dây dẫn nóng lên (bàn ủi, bếp điện, bóng đèn sợi đốt).',
        'Tác dụng phát sáng: làm sáng bóng đèn LED, đèn bút thử điện.',
        'Tác dụng từ: làm kim nam châm quay, hút sắt (nam châm điện, chuông điện).',
        'Tác dụng hoá học: tách kim loại khỏi dung dịch (mạ điện, tinh luyện kim loại).',
        'Tác dụng sinh lí: tác dụng lên cơ thể (gây co giật, dùng trong y học để châm cứu điện, kích tim).',
      ] },
      { note: 'Tác dụng sinh lí cũng là lí do điện giật rất nguy hiểm — phải tuyệt đối an toàn khi dùng điện.' },
    ],
    [
      { q: 'Bàn ủi (bàn là) điện hoạt động dựa trên tác dụng nào của dòng điện?', a: 'Dựa trên tác dụng nhiệt: dòng điện chạy qua dây điện trở làm nó nóng lên, truyền nhiệt làm phẳng quần áo.' },
      { q: 'Chuông điện kêu được nhờ tác dụng nào của dòng điện?', a: 'Nhờ tác dụng từ: dòng điện qua cuộn dây tạo nam châm điện hút búa gõ vào chuông.' },
      { q: 'Vì sao khi tay ướt thì không được chạm vào ổ điện?', a: 'Vì nước làm tay dẫn điện tốt hơn, dòng điện dễ chạy qua cơ thể, gây tác dụng sinh lí (điện giật) nguy hiểm đến tính mạng.' },
    ]
  ),

  'S8KHTN-w14-quiz': L(
    'Nhiệt — Năng lượng nhiệt và sự truyền nhiệt',
    'Vì sao chạm vào thìa kim loại trong cốc nước nóng lại thấy nóng tay, còn cán nhựa thì không? Hôm nay ta tìm hiểu năng lượng nhiệt và ba cách nhiệt truyền đi.',
    [
      'Nêu khái niệm năng lượng nhiệt và nội năng.',
      'Phân biệt ba hình thức truyền nhiệt: dẫn nhiệt, đối lưu, bức xạ nhiệt.',
      'Vận dụng để giải thích hiện tượng thực tế.',
    ],
    [
      { h: 'Năng lượng nhiệt và nội năng' },
      { p: 'Các phân tử, nguyên tử cấu tạo nên vật luôn chuyển động hỗn loạn không ngừng. Tổng động năng của chúng gọi là năng lượng nhiệt. Vật càng nóng, các phân tử chuyển động càng nhanh, năng lượng nhiệt càng lớn.' },
      { p: 'Nội năng của vật là tổng động năng và thế năng của các phân tử cấu tạo nên vật. Khi đun nóng, nội năng của vật tăng.' },
      { h: 'Dẫn nhiệt' },
      { p: 'Dẫn nhiệt là sự truyền nhiệt năng từ phần này sang phần khác của vật, hoặc từ vật này sang vật khác khi tiếp xúc. Kim loại dẫn nhiệt tốt; gỗ, nhựa, không khí dẫn nhiệt kém.' },
      { h: 'Đối lưu' },
      { p: 'Đối lưu là sự truyền nhiệt bằng các dòng chất lỏng hoặc chất khí. Lớp chất bị đun nóng nở ra, nhẹ hơn nên đi lên, lớp lạnh nặng hơn đi xuống, tạo thành dòng đối lưu.' },
      { h: 'Bức xạ nhiệt' },
      { p: 'Bức xạ nhiệt là sự truyền nhiệt bằng các tia nhiệt đi thẳng. Bức xạ nhiệt truyền được cả trong chân không. Ví dụ: nhiệt từ Mặt Trời truyền đến Trái Đất qua chân không.' },
      { ul: [
        'Vật có bề mặt sẫm màu, xù xì hấp thụ và phát ra bức xạ nhiệt tốt.',
        'Vật có bề mặt sáng, nhẵn bóng hấp thụ và phát ra bức xạ nhiệt kém.',
      ] },
      { note: 'Mùa hè nên mặc áo sáng màu để ít hấp thụ bức xạ nhiệt từ Mặt Trời, đỡ nóng hơn áo tối màu.' },
    ],
    [
      { q: 'Vì sao thìa kim loại để trong cốc nước nóng thì cán thìa cũng nóng, nhưng thìa nhựa thì không?', a: 'Vì kim loại dẫn nhiệt tốt nên nhiệt truyền nhanh từ phần ngập nước nóng lên cán; nhựa dẫn nhiệt kém nên cán thìa nhựa vẫn mát.' },
      { q: 'Khi đun nước trong ấm, lớp nước nào nóng lên trước và nước truyền nhiệt bằng hình thức nào?', a: 'Lớp nước ở đáy ấm (gần lửa) nóng trước, nở ra nhẹ hơn nên đi lên, nước lạnh ở trên đi xuống. Đó là sự truyền nhiệt bằng đối lưu.' },
      { q: 'Vì sao nhiệt từ Mặt Trời truyền được tới Trái Đất dù giữa chúng là chân không?', a: 'Vì nhiệt từ Mặt Trời truyền bằng bức xạ nhiệt (các tia nhiệt đi thẳng), hình thức này truyền được cả trong chân không, khác với dẫn nhiệt và đối lưu cần môi trường vật chất.' },
    ]
  ),

  'S8KHTN-w15-quiz': L(
    'Sự nở vì nhiệt và ứng dụng',
    'Vì sao đường ray xe lửa phải để khe hở, vì sao dây điện mùa hè chùng xuống? Tất cả là do các vật nở ra khi nóng và co lại khi lạnh — sự nở vì nhiệt.',
    [
      'Nêu được các chất nở ra khi nóng lên, co lại khi lạnh đi.',
      'So sánh sự nở vì nhiệt của chất rắn, lỏng, khí.',
      'Giải thích ứng dụng và phòng tránh tác hại của sự nở vì nhiệt.',
    ],
    [
      { h: 'Sự nở vì nhiệt' },
      { p: 'Hầu hết các chất nở ra khi nóng lên và co lại khi lạnh đi. Khi nhiệt độ tăng, các phân tử chuyển động nhanh hơn và khoảng cách giữa chúng tăng nên thể tích vật tăng.' },
      { h: 'So sánh sự nở vì nhiệt của các chất' },
      { ul: [
        'Chất khí nở vì nhiệt nhiều nhất.',
        'Chất lỏng nở vì nhiệt nhiều hơn chất rắn.',
        'Chất rắn nở vì nhiệt ít nhất.',
        'Các chất rắn, lỏng khác nhau thì nở vì nhiệt khác nhau.',
      ] },
      { h: 'Đặc biệt của nước' },
      { p: 'Nước có tính chất đặc biệt: từ 0 °C đến 4 °C nước co lại; trên 4 °C mới nở ra. Ở 4 °C nước có khối lượng riêng lớn nhất. Nhờ vậy băng nổi trên mặt nước, sinh vật sống được dưới lớp băng.' },
      { h: 'Ứng dụng và phòng tránh tác hại' },
      { ul: [
        'Để khe hở giữa các ray xe lửa, các tấm bê tông để chúng nở ra không bị cong vênh.',
        'Dây điện, dây cáp mắc chùng để mùa đông co lại không bị đứt.',
        'Băng kép (hai kim loại nở khác nhau) dùng làm rơ-le tự ngắt trong bàn ủi, ấm điện.',
      ] },
      { note: 'Không nên đổ nước thật đầy khi đun, vì nước nở vì nhiệt sẽ tràn ra ngoài khi sôi.' },
    ],
    [
      { q: 'Vì sao giữa hai đầu thanh ray đường sắt người ta thường để một khe hở nhỏ?', a: 'Để khi trời nắng nóng, các thanh ray nở dài ra có chỗ giãn nở, không bị xô đẩy làm cong vênh đường ray gây tai nạn.' },
      { q: 'Quả bóng bàn bị bẹp (chưa thủng) thả vào nước nóng thì phồng lại. Giải thích.', a: 'Vì không khí trong quả bóng gặp nóng nở ra, làm tăng thể tích, đẩy vỏ quả bóng phồng trở lại như cũ.' },
      { q: 'Vì sao về mùa đông cá vẫn sống được dưới lớp băng trên mặt hồ?', a: 'Vì nước ở 4 °C có khối lượng riêng lớn nhất, chìm xuống đáy; lớp nước lạnh hơn nổi lên trên đóng thành băng. Lớp băng nổi như "tấm chăn" giữ nhiệt, bên dưới nước vẫn ở khoảng 4 °C nên cá sống được.' },
    ]
  ),

  'S8KHTN-w16-quiz': L(
    'Ôn tập Hoá học và Vật lí (Học kì 1)',
    'Học kì 1 ta đã đi qua một chặng dài của Hoá học và Vật lí. Bài hôm nay hệ thống lại toàn bộ kiến thức và luyện các dạng bài tập tổng hợp để chuẩn bị kiểm tra.',
    [
      'Hệ thống hoá kiến thức Hoá học: phản ứng, mol, dung dịch, acid – base – muối.',
      'Hệ thống hoá kiến thức Vật lí: khối lượng riêng, áp suất, lực, nhiệt.',
      'Vận dụng giải bài tập tổng hợp.',
    ],
    [
      { h: 'Sơ đồ kiến thức Hoá học HK1' },
      { ul: [
        'Phản ứng hoá học: biến đổi vật lí ↔ hoá học, định luật bảo toàn khối lượng, cân bằng PTHH.',
        'Mol: n = m/M; V = 24,79·n (đkc) hoặc 22,4·n (đktc).',
        'Dung dịch: C% = m_ct/m_dd · 100%; C_M = n/V.',
        'Acid – base – muối – oxide: khái niệm, tính chất hoá học, thang pH.',
      ] },
      { h: 'Sơ đồ kiến thức Vật lí HK1' },
      { ul: [
        'Khối lượng riêng: D = m/V.',
        'Áp suất chất rắn: p = F/S.',
        'Áp suất chất lỏng: p = ρ·g·h; áp suất khí quyển.',
        'Tác dụng làm quay của lực, đòn bẩy: F·d₁ = P·d₂.',
        'Năng lượng nhiệt, ba hình thức truyền nhiệt, sự nở vì nhiệt.',
      ] },
      { h: 'Các kết nối quan trọng' },
      { ul: [
        'Định luật bảo toàn khối lượng ↔ cân bằng phương trình hoá học.',
        'Mol ↔ tính theo phương trình hoá học để biết lượng chất phản ứng/sản phẩm.',
        'Khối lượng riêng ↔ sự nổi/chìm của vật trong chất lỏng.',
      ] },
      { h: 'Các dạng bài tập thường gặp' },
      { ul: [
        'Cân bằng phương trình hoá học.',
        'Đổi qua lại giữa khối lượng – số mol – thể tích khí.',
        'Tính nồng độ C% hoặc C_M của dung dịch.',
        'Tính áp suất chất rắn (p = F/S) và chất lỏng (p = ρgh).',
      ] },
      { note: 'Khi làm bài tập tính toán, luôn đổi đơn vị về chuẩn (g, mol, lít, m³, m²) trước khi thay vào công thức.' },
    ],
    [
      { q: 'Tính số mol có trong 22 g khí carbon dioxide CO₂.', a: 'M(CO₂) = 12 + 2·16 = 44 g/mol. n = 22/44 = 0,5 mol.' },
      { q: 'Cân bằng phương trình: Al + O₂ → Al₂O₃.', a: '4Al + 3O₂ → 2Al₂O₃. Vế trái 4 Al, 6 O; vế phải 4 Al, 6 O — đã cân bằng.' },
      { q: 'Tính áp suất tại đáy một bể nước sâu 2 m (ρ = 1000 kg/m³, g = 10 N/kg).', a: 'p = ρ·g·h = 1000 · 10 · 2 = 20 000 Pa.' },
    ]
  ),

  'S8KHTN-w17-quiz': L(
    'Sinh học — Khái quát về cơ thể người',
    'Bắt đầu phần Sinh học lớp 8 với chính cơ thể của các em — một "cỗ máy" tinh vi gồm hàng nghìn tỉ tế bào tổ chức thành nhiều hệ cơ quan phối hợp nhịp nhàng.',
    [
      'Nêu được các cấp độ tổ chức trong cơ thể người.',
      'Kể tên và nêu chức năng khái quát các hệ cơ quan.',
      'Hiểu sự phối hợp hoạt động của các hệ cơ quan.',
    ],
    [
      { h: 'Các cấp độ tổ chức của cơ thể' },
      { p: 'Cơ thể người được tổ chức theo các cấp độ từ nhỏ đến lớn: Tế bào → Mô → Cơ quan → Hệ cơ quan → Cơ thể.' },
      { h: 'Mô, cơ quan, hệ cơ quan' },
      { ul: [
        'Mô: tập hợp các tế bào giống nhau cùng thực hiện một chức năng (mô biểu bì, mô liên kết, mô cơ, mô thần kinh).',
        'Cơ quan: nhiều mô phối hợp thực hiện một chức năng (tim, phổi, dạ dày).',
        'Hệ cơ quan: nhiều cơ quan phối hợp thực hiện một quá trình sống (hệ tiêu hoá, hệ tuần hoàn…).',
      ] },
      { h: 'Các hệ cơ quan chính' },
      { ul: [
        'Hệ vận động (xương, cơ): nâng đỡ và vận động.',
        'Hệ tuần hoàn (tim, mạch): vận chuyển các chất.',
        'Hệ hô hấp: trao đổi khí O₂ và CO₂.',
        'Hệ tiêu hoá: biến đổi và hấp thụ thức ăn.',
        'Hệ bài tiết: loại bỏ chất thải.',
        'Hệ thần kinh và hệ nội tiết: điều khiển, điều hoà.',
        'Hệ sinh dục: sinh sản, duy trì nòi giống.',
      ] },
      { h: 'Sự phối hợp giữa các hệ' },
      { p: 'Các hệ cơ quan không hoạt động riêng lẻ mà phối hợp chặt chẽ. Ví dụ khi chạy: hệ vận động làm việc, hệ hô hấp lấy thêm O₂, hệ tuần hoàn bơm máu nhanh hơn, hệ thần kinh điều khiển tất cả.' },
      { note: 'Mỗi cấp tổ chức có đặc tính riêng mà cấp dưới không có — một cơ thể khoẻ mạnh là kết quả phối hợp của mọi hệ cơ quan.' },
    ],
    [
      { q: 'Sắp xếp đúng các cấp độ tổ chức của cơ thể người từ thấp đến cao.', a: 'Tế bào → Mô → Cơ quan → Hệ cơ quan → Cơ thể.' },
      { q: 'Tim thuộc cấp độ tổ chức nào và nằm trong hệ cơ quan nào?', a: 'Tim là một cơ quan, thuộc hệ tuần hoàn — có chức năng bơm máu đi khắp cơ thể.' },
      { q: 'Khi em chơi đá bóng, hãy kể tên ít nhất ba hệ cơ quan cùng phối hợp hoạt động.', a: 'Hệ vận động (cơ và xương cử động), hệ hô hấp (thở nhanh lấy O₂), hệ tuần hoàn (tim đập nhanh đưa máu chở O₂ đến cơ), hệ thần kinh (điều khiển phối hợp các động tác).' },
    ]
  ),

  'S8KHTN-w18-quiz': L(
    'Ôn tập Học kì 1',
    'Bài tổng kết Học kì 1: ta điểm lại toàn bộ ba phân môn Hoá – Lí – Sinh, kết nối các chủ đề thành một mạch kiến thức và luyện đề tổng hợp.',
    [
      'Ôn tập kiến thức Hoá học, Vật lí, Sinh học của Học kì 1.',
      'Liên hệ các chủ đề thành mạch logic.',
      'Vận dụng giải bài tập tổng hợp chuẩn bị kiểm tra.',
    ],
    [
      { h: 'Phần Hoá học' },
      { ul: [
        'Phản ứng hoá học, định luật bảo toàn khối lượng, cân bằng PTHH.',
        'Mol, khối lượng mol, thể tích mol khí; tính theo phương trình hoá học.',
        'Dung dịch: C% và C_M; pha loãng dung dịch.',
        'Acid, base, oxide, muối: tính chất hoá học; thang pH.',
      ] },
      { h: 'Phần Vật lí' },
      { ul: [
        'Khối lượng riêng D = m/V.',
        'Áp suất chất rắn p = F/S; áp suất chất lỏng p = ρgh; áp suất khí quyển.',
        'Tác dụng làm quay của lực và đòn bẩy.',
        'Tác dụng của dòng điện; năng lượng nhiệt và truyền nhiệt; sự nở vì nhiệt.',
      ] },
      { h: 'Phần Sinh học' },
      { ul: [
        'Các cấp độ tổ chức cơ thể: Tế bào → Mô → Cơ quan → Hệ cơ quan → Cơ thể.',
        'Các hệ cơ quan và sự phối hợp hoạt động.',
      ] },
      { h: 'Mẹo ôn tập hiệu quả' },
      { ul: [
        'Lập sơ đồ tư duy cho từng phân môn Hoá – Lí – Sinh.',
        'Học công thức cùng đơn vị: n = m/M, C_M = n/V, p = F/S, p = ρgh, D = m/V.',
        'Làm lại các bài tập mẫu trước khi làm đề tổng hợp.',
        'Liên hệ kiến thức với hiện tượng thực tế để nhớ lâu.',
      ] },
      { note: 'Học theo sơ đồ tư duy, liên hệ thực tế giúp nhớ lâu và hiểu sâu hơn là học thuộc lòng.' },
    ],
    [
      { q: 'Tính nồng độ phần trăm của dung dịch khi hoà 20 g NaOH vào 180 g nước.', a: 'm_dd = 20 + 180 = 200 g. C% = (20/200) · 100% = 10%.' },
      { q: 'Một vật có khối lượng 270 g, thể tích 100 cm³. Tính khối lượng riêng và cho biết vật có thể làm bằng kim loại nào.', a: 'D = m/V = 270/100 = 2,7 g/cm³ = 2700 kg/m³. Đây có thể là nhôm (aluminium).' },
      { q: 'Kể tên các cấp độ tổ chức của cơ thể người theo thứ tự tăng dần.', a: 'Tế bào → Mô → Cơ quan → Hệ cơ quan → Cơ thể.' },
    ]
  ),

  'S8KHTN-w19-quiz': L(
    'Hệ vận động — Bộ xương và khớp',
    'Học kì 2 mở đầu với hệ vận động. Hôm nay ta tìm hiểu bộ xương — "khung nhà" của cơ thể — và các loại khớp giúp ta cử động linh hoạt.',
    [
      'Nêu cấu tạo và chức năng của bộ xương.',
      'Phân biệt các loại khớp.',
      'Nêu thành phần và đặc điểm của xương.',
    ],
    [
      { h: 'Bộ xương người' },
      { p: 'Bộ xương người trưởng thành gồm khoảng 206 chiếc xương, chia làm ba phần: xương đầu (sọ và mặt), xương thân (cột sống và lồng ngực), xương chi (chi trên và chi dưới).' },
      { h: 'Chức năng của bộ xương' },
      { ul: [
        'Nâng đỡ, tạo khung và hình dạng cho cơ thể.',
        'Bảo vệ các nội quan (hộp sọ bảo vệ não, lồng ngực bảo vệ tim phổi).',
        'Là chỗ bám cho cơ, cùng cơ tạo nên hệ vận động.',
        'Tuỷ đỏ trong xương sinh ra tế bào máu.',
      ] },
      { h: 'Các loại khớp' },
      { ul: [
        'Khớp động: cử động dễ dàng, biên độ lớn (khớp vai, khớp hông, khớp gối, khớp khuỷu).',
        'Khớp bán động: cử động hạn chế (khớp giữa các đốt sống).',
        'Khớp bất động: không cử động được (khớp giữa các xương hộp sọ).',
      ] },
      { h: 'Thành phần của xương' },
      { p: 'Xương gồm chất hữu cơ (cốt giao) làm xương mềm dẻo, đàn hồi, và chất khoáng (chủ yếu là calcium) làm xương cứng chắc. Tỉ lệ này thay đổi theo lứa tuổi.' },
      { note: 'Ở trẻ em chất hữu cơ nhiều nên xương mềm dẻo, ít gãy nhưng dễ cong. Ở người già chất khoáng nhiều, xương giòn nên dễ gãy.' },
    ],
    [
      { q: 'Người trưởng thành có khoảng bao nhiêu chiếc xương?', a: 'Khoảng 206 chiếc xương, chia làm ba phần: xương đầu, xương thân và xương chi.' },
      { q: 'Khớp gối thuộc loại khớp nào? Vì sao?', a: 'Khớp gối là khớp động vì cử động được dễ dàng với biên độ lớn (gập, duỗi), giúp đi lại, chạy nhảy.' },
      { q: 'Vì sao xương người già dễ gãy hơn xương trẻ em?', a: 'Vì ở người già tỉ lệ chất khoáng trong xương tăng, chất hữu cơ (cốt giao) giảm nên xương giòn, kém dẻo dai; ở trẻ em chất hữu cơ nhiều nên xương mềm dẻo, ít gãy hơn.' },
    ]
  ),

  'S8KHTN-w20-quiz': L(
    'Hệ vận động — Cơ và bảo vệ hệ vận động',
    'Có xương rồi nhưng muốn cử động phải có cơ. Hôm nay ta tìm hiểu cơ hoạt động thế nào và làm sao để có một hệ vận động khoẻ mạnh, tránh cong vẹo cột sống.',
    [
      'Phân biệt ba loại cơ và nêu cấu tạo cơ vân.',
      'Trình bày cơ chế co cơ và sự phối hợp xương – cơ.',
      'Nêu biện pháp bảo vệ và rèn luyện hệ vận động.',
    ],
    [
      { h: 'Ba loại cơ' },
      { ul: [
        'Cơ vân (cơ xương): bám vào xương, co theo ý muốn, tạo ra cử động.',
        'Cơ trơn: ở thành các nội quan (dạ dày, ruột, mạch máu), co không theo ý muốn.',
        'Cơ tim: chỉ có ở tim, co bóp tự động, liên tục suốt đời.',
      ] },
      { h: 'Cấu tạo cơ vân' },
      { p: 'Mỗi bắp cơ gồm nhiều bó sợi cơ; mỗi sợi cơ chứa nhiều tơ cơ. Tơ cơ gồm tơ cơ mảnh và tơ cơ dày xếp xen kẽ tạo nên vân ngang.' },
      { h: 'Cơ chế co cơ' },
      { p: 'Khi cơ co, các tơ cơ mảnh trượt sâu vào giữa các tơ cơ dày làm sợi cơ ngắn lại, bắp cơ phình to. Cơ co làm xương cử động.' },
      { h: 'Sự phối hợp xương – cơ' },
      { p: 'Cơ thường bám vào hai xương qua khớp. Khi cơ co, kéo hai xương lại gần nhau (như cẳng tay nâng lên). Các cơ hoạt động theo cặp đối kháng: cơ này co thì cơ kia dãn.' },
      { h: 'Bảo vệ và rèn luyện hệ vận động' },
      { ul: [
        'Ngồi học, mang vác đúng tư thế để tránh cong vẹo cột sống.',
        'Ăn đủ chất, đặc biệt là calcium và vitamin D cho xương chắc.',
        'Tập thể dục thể thao thường xuyên, vừa sức.',
        'Tắm nắng buổi sáng giúp tổng hợp vitamin D.',
      ] },
      { note: 'Cong vẹo cột sống tuổi học đường thường do ngồi học sai tư thế và đeo cặp lệch một bên vai.' },
    ],
    [
      { q: 'Kể tên ba loại cơ trong cơ thể và cho biết loại nào co theo ý muốn.', a: 'Ba loại cơ: cơ vân, cơ trơn, cơ tim. Chỉ có cơ vân co theo ý muốn; cơ trơn và cơ tim co không theo ý muốn.' },
      { q: 'Khi cơ co thì bắp cơ thay đổi thế nào và vì sao?', a: 'Khi cơ co, sợi cơ ngắn lại nên bắp cơ phình to (ngắn và dày hơn). Đó là do các tơ cơ mảnh trượt sâu vào giữa các tơ cơ dày.' },
      { q: 'Em hãy nêu hai việc nên làm để phòng tránh cong vẹo cột sống ở tuổi học đường.', a: 'Ngồi học đúng tư thế (lưng thẳng, không cúi gằm hay vẹo người); đeo cặp đều hai vai (hoặc dùng ba lô hai quai), không mang quá nặng một bên.' },
    ]
  ),

  'S8KHTN-w21-quiz': L(
    'Hệ tuần hoàn — Máu, tim và mạch máu',
    'Mỗi nhịp tim đập, máu lại được bơm đi nuôi cơ thể. Hôm nay ta tìm hiểu thành phần của máu, cấu tạo của tim và hệ mạch máu — "hệ thống vận tải" của cơ thể.',
    [
      'Nêu thành phần và chức năng của máu.',
      'Mô tả cấu tạo của tim và các loại mạch máu.',
      'Trình bày hai vòng tuần hoàn.',
    ],
    [
      { h: 'Thành phần của máu' },
      { ul: [
        'Huyết tương: phần lỏng, vận chuyển chất dinh dưỡng, chất thải, hormone.',
        'Hồng cầu: chứa hemoglobin, vận chuyển O₂ và CO₂; làm máu có màu đỏ.',
        'Bạch cầu: bảo vệ cơ thể, tiêu diệt vi khuẩn.',
        'Tiểu cầu: tham gia quá trình đông máu.',
      ] },
      { h: 'Cấu tạo của tim' },
      { p: 'Tim có 4 ngăn: hai tâm nhĩ ở trên (nhĩ trái, nhĩ phải) và hai tâm thất ở dưới (thất trái, thất phải). Giữa các ngăn có van tim giúp máu chỉ chảy theo một chiều.' },
      { h: 'Các loại mạch máu' },
      { ul: [
        'Động mạch: dẫn máu từ tim đến các cơ quan, thành dày, có tính đàn hồi.',
        'Tĩnh mạch: dẫn máu từ các cơ quan về tim, có van một chiều.',
        'Mao mạch: rất nhỏ, nối động mạch với tĩnh mạch, là nơi trao đổi chất với tế bào.',
      ] },
      { h: 'Hai vòng tuần hoàn' },
      { ul: [
        'Vòng tuần hoàn nhỏ (vòng phổi): máu từ tâm thất phải → phổi (nhận O₂, thải CO₂) → về tâm nhĩ trái.',
        'Vòng tuần hoàn lớn (vòng cơ thể): máu từ tâm thất trái → các cơ quan (cấp O₂, dinh dưỡng) → về tâm nhĩ phải.',
      ] },
      { note: 'Tim hoạt động suốt đời, mỗi ngày đập khoảng 100 000 lần và bơm hàng nghìn lít máu.' },
    ],
    [
      { q: 'Tim người có mấy ngăn? Kể tên.', a: 'Tim có 4 ngăn: tâm nhĩ trái, tâm nhĩ phải (ở trên) và tâm thất trái, tâm thất phải (ở dưới).' },
      { q: 'Thành phần nào của máu làm nhiệm vụ vận chuyển khí oxygen?', a: 'Hồng cầu, nhờ chất hemoglobin trong hồng cầu kết hợp với O₂ ở phổi và nhả ra ở các tế bào.' },
      { q: 'Phân biệt chức năng của động mạch và tĩnh mạch.', a: 'Động mạch dẫn máu từ tim đến các cơ quan; tĩnh mạch dẫn máu từ các cơ quan trở về tim. Tĩnh mạch có van một chiều giúp máu không chảy ngược.' },
    ]
  ),

  'S8KHTN-w22-quiz': L(
    'Hệ tuần hoàn — Nhóm máu và miễn dịch',
    'Vì sao truyền máu không đúng nhóm lại nguy hiểm? Vì sao tiêm vaccine giúp ta phòng bệnh? Hôm nay ta tìm hiểu nhóm máu, nguyên tắc truyền máu và hệ miễn dịch.',
    [
      'Nêu các nhóm máu hệ ABO và nguyên tắc truyền máu.',
      'Hiểu vai trò của hệ miễn dịch.',
      'Nêu khái niệm miễn dịch và ý nghĩa của tiêm vaccine.',
    ],
    [
      { h: 'Các nhóm máu hệ ABO' },
      { ul: [
        'Nhóm A: hồng cầu có kháng nguyên A.',
        'Nhóm B: hồng cầu có kháng nguyên B.',
        'Nhóm AB: hồng cầu có cả kháng nguyên A và B; huyết tương không có kháng thể.',
        'Nhóm O: hồng cầu không có kháng nguyên; huyết tương có cả hai kháng thể.',
      ] },
      { h: 'Nguyên tắc truyền máu' },
      { p: 'Khi truyền máu phải tránh để kháng nguyên trên hồng cầu của người cho gặp kháng thể tương ứng trong huyết tương người nhận (gây kết dính hồng cầu). Vì vậy phải truyền cùng nhóm máu, đồng thời thử phản ứng chéo và kiểm tra HIV, viêm gan…' },
      { ul: [
        'Nhóm O là nhóm "cho được nhiều" (hồng cầu không có kháng nguyên).',
        'Nhóm AB là nhóm "nhận được nhiều" (huyết tương không có kháng thể).',
      ] },
      { h: 'Hệ miễn dịch' },
      { p: 'Hệ miễn dịch bảo vệ cơ thể chống lại các tác nhân gây bệnh (vi khuẩn, virus). Bạch cầu là lực lượng chủ yếu: thực bào "nuốt" vi khuẩn, một số bạch cầu tạo kháng thể vô hiệu hoá tác nhân lạ.' },
      { h: 'Miễn dịch và vaccine' },
      { p: 'Miễn dịch là khả năng cơ thể không mắc một bệnh nào đó. Tiêm vaccine đưa vào cơ thể kháng nguyên đã làm yếu/bất hoạt, kích thích cơ thể tạo kháng thể và tế bào nhớ, nhờ đó phòng được bệnh khi gặp tác nhân thật.' },
      { note: 'Cho máu nhân đạo là một nghĩa cử cao đẹp, giúp cứu sống nhiều người bệnh cần truyền máu.' },
    ],
    [
      { q: 'Nhóm máu nào được gọi là nhóm "cho được nhiều" và vì sao?', a: 'Nhóm O, vì hồng cầu của nhóm O không có kháng nguyên A và B nên không bị kháng thể của người nhận làm kết dính.' },
      { q: 'Nhóm máu nào được gọi là nhóm "nhận được nhiều"? Vì sao?', a: 'Nhóm AB, vì huyết tương của nhóm AB không có kháng thể nên không làm kết dính hồng cầu của máu được truyền vào.' },
      { q: 'Vì sao tiêm vaccine giúp phòng bệnh truyền nhiễm?', a: 'Vì vaccine đưa vào cơ thể kháng nguyên đã được làm yếu/bất hoạt, kích thích cơ thể tạo ra kháng thể và tế bào nhớ. Khi tác nhân gây bệnh thật xâm nhập, cơ thể đã sẵn sàng tiêu diệt nên không mắc bệnh.' },
    ]
  ),

  'S8KHTN-w23-quiz': L(
    'Hệ hô hấp',
    'Mỗi phút em thở khoảng 16–18 lần mà không hề để ý. Hôm nay ta tìm hiểu hệ hô hấp đưa O₂ vào, thải CO₂ ra như thế nào và cách bảo vệ lá phổi của mình.',
    [
      'Mô tả cấu tạo của hệ hô hấp.',
      'Trình bày quá trình thông khí và trao đổi khí.',
      'Nêu biện pháp bảo vệ hệ hô hấp.',
    ],
    [
      { h: 'Cấu tạo hệ hô hấp' },
      { p: 'Hệ hô hấp gồm đường dẫn khí và hai lá phổi.' },
      { ul: [
        'Đường dẫn khí: mũi → họng → thanh quản → khí quản → phế quản.',
        'Phổi: chứa hàng triệu phế nang — nơi trao đổi khí.',
      ] },
      { h: 'Quá trình thông khí (cử động hô hấp)' },
      { ul: [
        'Hít vào: cơ hoành và cơ liên sườn co, lồng ngực mở rộng, không khí tràn vào phổi.',
        'Thở ra: cơ hoành và cơ liên sườn dãn, lồng ngực thu nhỏ, không khí bị đẩy ra.',
      ] },
      { h: 'Trao đổi khí' },
      { ul: [
        'Trao đổi khí ở phổi: O₂ từ phế nang khuếch tán vào máu; CO₂ từ máu khuếch tán ra phế nang để thở ra.',
        'Trao đổi khí ở tế bào: O₂ từ máu vào tế bào; CO₂ từ tế bào vào máu.',
      ] },
      { h: 'Bảo vệ hệ hô hấp' },
      { ul: [
        'Không hút thuốc lá, tránh khói thuốc.',
        'Đeo khẩu trang nơi nhiều bụi, ô nhiễm.',
        'Giữ vệ sinh mũi, họng; trồng cây xanh.',
        'Luyện tập thể dục, hít thở sâu để tăng dung tích phổi.',
      ] },
      { note: 'Khói thuốc lá chứa hàng nghìn chất độc, là nguyên nhân hàng đầu gây ung thư phổi và bệnh phổi tắc nghẽn mạn tính.' },
    ],
    [
      { q: 'Nơi diễn ra quá trình trao đổi khí giữa máu và không khí là ở đâu?', a: 'Ở các phế nang trong phổi: O₂ khuếch tán từ phế nang vào máu, CO₂ khuếch tán từ máu vào phế nang để thở ra.' },
      { q: 'Khi hít vào, cơ hoành và lồng ngực thay đổi thế nào?', a: 'Cơ hoành co (hạ xuống), cơ liên sườn co làm lồng ngực mở rộng, thể tích lồng ngực tăng nên không khí tràn vào phổi.' },
      { q: 'Vì sao không nên hút thuốc lá và cần tránh khói thuốc?', a: 'Vì khói thuốc lá chứa nicotine và nhiều chất độc, gây hại đường hô hấp, làm tăng nguy cơ ung thư phổi, viêm phế quản mạn tính; người hít phải khói thuốc thụ động cũng bị ảnh hưởng tương tự.' },
    ]
  ),

  'S8KHTN-w24-quiz': L(
    'Hệ tiêu hoá và dinh dưỡng',
    'Bát cơm em ăn sẽ biến đổi thế nào để nuôi cơ thể? Hôm nay ta theo dấu thức ăn đi qua hệ tiêu hoá và tìm hiểu một chế độ ăn cân đối, hợp vệ sinh.',
    [
      'Mô tả các cơ quan của hệ tiêu hoá.',
      'Phân biệt tiêu hoá cơ học và tiêu hoá hoá học; nêu vai trò enzyme.',
      'Nêu nguyên tắc về dinh dưỡng và an toàn thực phẩm.',
    ],
    [
      { h: 'Các cơ quan của hệ tiêu hoá' },
      { ul: [
        'Ống tiêu hoá: miệng → thực quản → dạ dày → ruột non → ruột già → hậu môn.',
        'Tuyến tiêu hoá: tuyến nước bọt, gan, tuỵ, tuyến vị, tuyến ruột — tiết dịch tiêu hoá.',
      ] },
      { h: 'Tiêu hoá cơ học và tiêu hoá hoá học' },
      { ul: [
        'Tiêu hoá cơ học: răng nghiền, dạ dày và ruột co bóp làm nhỏ và nhào trộn thức ăn.',
        'Tiêu hoá hoá học: enzyme phân giải thức ăn phức tạp thành chất đơn giản (đường đơn, amino acid, acid béo).',
      ] },
      { h: 'Hấp thụ chất dinh dưỡng' },
      { p: 'Quá trình hấp thụ chủ yếu diễn ra ở ruột non, nơi có rất nhiều lông ruột (nhung mao) làm tăng diện tích hấp thụ. Chất dinh dưỡng đi vào máu và bạch huyết để nuôi cơ thể.' },
      { h: 'Dinh dưỡng cân đối' },
      { ul: [
        'Ăn đủ và cân đối bốn nhóm: chất bột đường, chất đạm, chất béo, vitamin và khoáng chất.',
        'Uống đủ nước (1,5–2 lít/ngày), ăn nhiều rau xanh và trái cây.',
        'Hạn chế đồ ngọt, đồ chiên rán, nước ngọt có ga.',
      ] },
      { h: 'An toàn vệ sinh thực phẩm' },
      { ul: [
        'Ăn chín, uống sôi; rửa tay trước khi ăn.',
        'Không ăn thực phẩm ôi thiu, mốc, quá hạn.',
        'Bảo quản thức ăn đúng cách, tránh để lẫn thức ăn sống và chín.',
      ] },
      { note: 'Ngộ độc thực phẩm thường do vi khuẩn trong thức ăn không được bảo quản, chế biến đúng cách.' },
    ],
    [
      { q: 'Nơi nào là cơ quan hấp thụ chất dinh dưỡng chủ yếu? Vì sao?', a: 'Ruột non, vì niêm mạc ruột non có rất nhiều lông ruột (nhung mao) làm tăng diện tích hấp thụ, lại có mạng mao mạch dày để đưa chất dinh dưỡng vào máu.' },
      { q: 'Vai trò của enzyme trong tiêu hoá hoá học là gì?', a: 'Enzyme xúc tác phân giải các chất phức tạp trong thức ăn (tinh bột, protein, lipid) thành các chất đơn giản (đường đơn, amino acid, acid béo) mà cơ thể hấp thụ được.' },
      { q: 'Em hãy nêu hai nguyên tắc để có bữa ăn an toàn, hợp vệ sinh.', a: 'Ăn chín uống sôi và rửa tay sạch trước khi ăn; không ăn thực phẩm ôi thiu, mốc hỏng, quá hạn sử dụng.' },
    ]
  ),

  'S8KHTN-w25-quiz': L(
    'Hệ bài tiết và cân bằng môi trường trong',
    'Cơ thể luôn tạo ra chất thải. Nếu không loại bỏ kịp thời, ta sẽ bị nhiễm độc. Hôm nay ta tìm hiểu hệ bài tiết — đặc biệt là vai trò của thận trong việc "lọc máu".',
    [
      'Nêu cấu tạo của hệ bài tiết nước tiểu.',
      'Trình bày chức năng của thận.',
      'Nêu biện pháp bảo vệ hệ bài tiết.',
    ],
    [
      { h: 'Vai trò của bài tiết' },
      { p: 'Bài tiết là quá trình lọc và thải ra ngoài các chất cặn bã, chất độc do cơ thể tạo ra. Bài tiết giúp duy trì ổn định môi trường trong cơ thể (cân bằng nước, muối khoáng, độ pH).' },
      { h: 'Cấu tạo hệ bài tiết nước tiểu' },
      { p: 'Gồm: hai quả thận → hai ống dẫn nước tiểu (niệu quản) → bóng đái (bàng quang) → ống đái (niệu đạo).' },
      { h: 'Đơn vị chức năng của thận' },
      { p: 'Mỗi quả thận có khoảng một triệu đơn vị chức năng gọi là nephron (đơn vị thận). Nephron lọc máu để tạo thành nước tiểu.' },
      { h: 'Chức năng của thận' },
      { ul: [
        'Lọc máu, loại bỏ chất thải và chất độc (urea, acid uric).',
        'Điều hoà lượng nước và muối khoáng trong cơ thể.',
        'Góp phần điều hoà huyết áp và độ pH của máu.',
      ] },
      { h: 'Bảo vệ hệ bài tiết' },
      { ul: [
        'Uống đủ nước (khoảng 2 lít/ngày).',
        'Không ăn quá mặn, hạn chế thức ăn nhiều đạm, nhiều dầu mỡ.',
        'Giữ vệ sinh đường tiết niệu, không nhịn tiểu lâu.',
        'Khám sức khoẻ định kỳ để phát hiện sớm bệnh thận.',
      ] },
      { note: 'Sỏi thận thường hình thành khi uống ít nước và ăn quá mặn — vì vậy uống đủ nước rất quan trọng.' },
    ],
    [
      { q: 'Đơn vị chức năng cơ bản của thận làm nhiệm vụ lọc máu là gì?', a: 'Đó là nephron (đơn vị thận). Mỗi quả thận có khoảng một triệu nephron lọc máu để tạo nước tiểu.' },
      { q: 'Hãy nêu thứ tự đường đi của nước tiểu từ khi được tạo ra đến khi thải ra ngoài.', a: 'Thận → ống dẫn nước tiểu (niệu quản) → bóng đái (bàng quang) → ống đái (niệu đạo) → ra ngoài.' },
      { q: 'Vì sao cần uống đủ nước mỗi ngày để bảo vệ thận?', a: 'Vì uống đủ nước giúp thận lọc và đào thải chất độc dễ dàng, làm loãng nước tiểu, hạn chế lắng đọng tạo sỏi thận; uống quá ít nước dễ gây sỏi và làm thận quá tải.' },
    ]
  ),

  'S8KHTN-w26-quiz': L(
    'Hệ thần kinh và các giác quan (1) — Cấu tạo',
    'Hệ thần kinh là "bộ chỉ huy" điều khiển toàn bộ cơ thể. Hôm nay ta tìm hiểu cấu tạo của nó: não, tuỷ sống, dây thần kinh và tế bào thần kinh (nơron).',
    [
      'Nêu cấu tạo của hệ thần kinh.',
      'Mô tả các phần chính của não và chức năng.',
      'Nêu cấu tạo và vai trò của nơron.',
    ],
    [
      { h: 'Cấu tạo hệ thần kinh' },
      { ul: [
        'Bộ phận trung ương: não và tuỷ sống.',
        'Bộ phận ngoại biên: các dây thần kinh và hạch thần kinh.',
      ] },
      { h: 'Các phần của não' },
      { ul: [
        'Đại não: điều khiển suy nghĩ, trí nhớ, ngôn ngữ, vận động có ý thức.',
        'Tiểu não: phối hợp các cử động, giữ thăng bằng cho cơ thể.',
        'Thân não: điều khiển các hoạt động sống cơ bản (nhịp tim, hô hấp).',
      ] },
      { h: 'Tuỷ sống' },
      { p: 'Tuỷ sống nằm trong cột sống, dẫn truyền xung thần kinh giữa não và các phần của cơ thể, đồng thời là trung khu của nhiều phản xạ không điều kiện.' },
      { h: 'Tế bào thần kinh (nơron)' },
      { p: 'Nơron là đơn vị cấu tạo của hệ thần kinh, gồm: thân nơron, các sợi nhánh (dẫn xung vào thân) và sợi trục (dẫn xung ra). Các nơron truyền tín hiệu cho nhau qua khe synapse.' },
      { h: 'Phản xạ' },
      { p: 'Phản xạ là phản ứng của cơ thể trả lời kích thích thông qua hệ thần kinh. Ví dụ: rụt tay lại khi chạm vật nóng. Đường đi của xung thần kinh trong một phản xạ gọi là cung phản xạ.' },
      { note: 'Đại não người rất phát triển với nhiều nếp nhăn, là cơ sở của tư duy, sáng tạo và ngôn ngữ.' },
    ],
    [
      { q: 'Bộ phận nào của não điều khiển nhịp tim và nhịp thở?', a: 'Thân não — nơi điều khiển các hoạt động sống cơ bản như nhịp tim, hô hấp.' },
      { q: 'Bộ phận nào của não giữ vai trò phối hợp cử động và giữ thăng bằng cho cơ thể?', a: 'Tiểu não — phối hợp các cử động và giữ thăng bằng; tổn thương tiểu não làm cử động thiếu chính xác, mất thăng bằng.' },
      { q: 'Khi vô tình chạm tay vào vật nóng, ta rụt tay lại rất nhanh. Đó là hiện tượng gì?', a: 'Đó là một phản xạ (phản xạ không điều kiện): kích thích nóng được dẫn truyền theo cung phản xạ qua tuỷ sống, làm cơ co rụt tay lại để tránh bị bỏng.' },
    ]
  ),

  'S8KHTN-w27-quiz': L(
    'Các giác quan — Thị giác (mắt) và thính giác (tai)',
    'Mắt cho ta nhìn thấy thế giới muôn màu, tai giúp ta nghe và giữ thăng bằng. Hôm nay ta tìm hiểu cấu tạo của hai giác quan quan trọng này và cách bảo vệ chúng.',
    [
      'Mô tả cấu tạo của mắt và cơ quan phân tích thị giác.',
      'Mô tả cấu tạo của tai và chức năng nghe – giữ thăng bằng.',
      'Nêu biện pháp bảo vệ mắt và tai.',
    ],
    [
      { h: 'Cấu tạo của mắt' },
      { ul: [
        'Giác mạc và thể thuỷ tinh: hội tụ ánh sáng tạo ảnh.',
        'Màng mạch và lòng đen (mống mắt): điều chỉnh lượng ánh sáng qua con ngươi.',
        'Màng lưới (võng mạc): chứa tế bào thụ cảm thị giác.',
      ] },
      { h: 'Tế bào thụ cảm ở võng mạc' },
      { ul: [
        'Tế bào nón: tiếp nhận màu sắc, hoạt động khi đủ ánh sáng.',
        'Tế bào que: tiếp nhận ánh sáng yếu (sáng – tối), giúp nhìn trong tối.',
      ] },
      { h: 'Tật và bệnh về mắt' },
      { ul: [
        'Cận thị: nhìn xa không rõ; khắc phục bằng kính phân kì.',
        'Viễn thị: nhìn gần không rõ; khắc phục bằng kính hội tụ.',
        'Bảo vệ mắt: đọc sách đủ ánh sáng, không xem màn hình quá gần và quá lâu, ăn đủ vitamin A.',
      ] },
      { h: 'Cấu tạo của tai' },
      { ul: [
        'Tai ngoài: vành tai và ống tai, hứng và dẫn âm thanh.',
        'Tai giữa: màng nhĩ và chuỗi xương con, truyền dao động âm.',
        'Tai trong: ốc tai (chứa tế bào thụ cảm thính giác) và ống bán khuyên (giữ thăng bằng).',
      ] },
      { note: 'Tai trong vừa giúp nghe vừa giúp giữ thăng bằng — đó là lí do khi xoay nhiều vòng ta bị chóng mặt.' },
    ],
    [
      { q: 'Loại tế bào nào ở màng lưới của mắt giúp cảm nhận màu sắc?', a: 'Tế bào nón — tiếp nhận màu sắc, hoạt động tốt khi có đủ ánh sáng.' },
      { q: 'Bộ phận nào của tai giúp giữ thăng bằng cho cơ thể?', a: 'Ống bán khuyên (nằm ở tai trong) — đảm nhận chức năng giữ thăng bằng.' },
      { q: 'Một bạn bị cận thị, nhìn xa không rõ. Cần đeo loại kính gì để khắc phục?', a: 'Cần đeo kính phân kì (kính cận). Kính này làm ảnh của vật ở xa hiện đúng trên màng lưới, giúp nhìn xa rõ hơn.' },
    ]
  ),

  'S8KHTN-w28-quiz': L(
    'Các giác quan — Khứu giác, vị giác, xúc giác',
    'Mùi thơm của hoa, vị ngọt của trái chín, cảm giác nóng – lạnh trên da — đó là nhờ ba giác quan: khứu giác (mũi), vị giác (lưỡi) và xúc giác (da). Cùng tìm hiểu nhé!',
    [
      'Nêu vai trò của mũi trong khứu giác.',
      'Nêu các vị cơ bản mà lưỡi cảm nhận.',
      'Nêu các loại cảm giác của da.',
    ],
    [
      { h: 'Khứu giác — mũi' },
      { p: 'Niêm mạc mũi có các tế bào thụ cảm khứu giác. Khi các phân tử chất bay trong không khí lọt vào mũi, chúng kích thích các tế bào này, tạo cảm giác về mùi. Mũi có thể phân biệt hàng nghìn mùi khác nhau.' },
      { h: 'Vị giác — lưỡi' },
      { p: 'Trên lưỡi có các gai vị giác chứa tế bào thụ cảm vị giác. Lưỡi cảm nhận các vị cơ bản:' },
      { ul: ['Ngọt.', 'Chua.', 'Mặn.', 'Đắng.', 'Vị umami (vị "ngon ngọt" của thịt, nước dùng).'] },
      { h: 'Xúc giác — da' },
      { p: 'Da là cơ quan xúc giác lớn nhất. Trong da có nhiều thụ quan cảm nhận: nóng, lạnh, đau, áp lực (chạm, ép). Da cũng bảo vệ cơ thể và điều hoà thân nhiệt.' },
      { h: 'Vai trò phối hợp của các giác quan' },
      { p: 'Khứu giác và vị giác phối hợp tạo nên cảm nhận hương vị món ăn. Khi bị nghẹt mũi, ta thấy ăn "nhạt" hơn vì thiếu thông tin từ khứu giác.' },
      { note: 'Giữ vệ sinh mũi, lưỡi, da sạch sẽ giúp các giác quan hoạt động tốt và phòng tránh bệnh.' },
    ],
    [
      { q: 'Kể tên các vị cơ bản mà lưỡi cảm nhận được.', a: 'Ngọt, chua, mặn, đắng và vị umami.' },
      { q: 'Da có thể cảm nhận được những loại cảm giác nào?', a: 'Da cảm nhận nóng, lạnh, đau và áp lực (chạm, ép) nhờ các thụ quan nằm trong da.' },
      { q: 'Vì sao khi bị cảm cúm, nghẹt mũi, ta thường thấy ăn không ngon?', a: 'Vì cảm nhận hương vị là sự phối hợp của vị giác và khứu giác. Khi nghẹt mũi, khứu giác bị giảm, ta thiếu thông tin về mùi nên thấy món ăn nhạt nhẽo, kém ngon.' },
    ]
  ),

  'S8KHTN-w29-quiz': L(
    'Hệ nội tiết',
    'Bên cạnh hệ thần kinh, cơ thể còn được điều hoà bởi hệ nội tiết qua những "chất hoá học" gọi là hormone. Hôm nay ta tìm hiểu các tuyến nội tiết và vai trò của chúng.',
    [
      'Nêu khái niệm tuyến nội tiết và hormone.',
      'Kể tên một số tuyến nội tiết chính và chức năng.',
      'Nêu một số bệnh liên quan đến rối loạn nội tiết.',
    ],
    [
      { h: 'Tuyến nội tiết và hormone' },
      { p: 'Tuyến nội tiết tiết ra hormone đổ thẳng vào máu, theo máu đến điều hoà hoạt động của các cơ quan. Hormone có tác dụng mạnh dù lượng rất nhỏ.' },
      { h: 'Phân biệt với tuyến ngoại tiết' },
      { p: 'Tuyến ngoại tiết (tuyến nước bọt, tuyến mồ hôi) tiết chất qua ống dẫn ra ngoài, còn tuyến nội tiết tiết hormone trực tiếp vào máu.' },
      { h: 'Một số tuyến nội tiết chính' },
      { ul: [
        'Tuyến yên: tiết hormone tăng trưởng và điều khiển hoạt động của nhiều tuyến khác.',
        'Tuyến giáp: tiết hormone (chứa iodine) điều hoà quá trình trao đổi chất.',
        'Tuyến tuỵ (đảo tuỵ): tiết insulin và glucagon điều hoà lượng đường trong máu.',
        'Tuyến trên thận: tiết adrenaline giúp cơ thể phản ứng với căng thẳng.',
        'Tuyến sinh dục: tiết hormone sinh dục (estrogen ở nữ, testosterone ở nam).',
      ] },
      { h: 'Một số bệnh liên quan' },
      { ul: [
        'Bệnh đái tháo đường (tiểu đường): rối loạn insulin làm đường huyết tăng cao.',
        'Bệnh bướu cổ: thiếu iodine làm tuyến giáp phình to.',
      ] },
      { note: 'Ăn muối iodine giúp phòng bệnh bướu cổ — đây là lí do nước ta khuyến khích dùng muối iodine.' },
    ],
    [
      { q: 'Tuyến nội tiết nào tiết ra insulin điều hoà lượng đường trong máu?', a: 'Tuyến tuỵ (phần đảo tuỵ) tiết insulin; khi đường huyết cao, insulin giúp đưa glucose vào tế bào, làm hạ đường huyết.' },
      { q: 'Thiếu iodine trong khẩu phần ăn lâu ngày dễ gây bệnh gì?', a: 'Gây bệnh bướu cổ (do tuyến giáp phình to). Có thể phòng tránh bằng cách dùng muối iodine.' },
      { q: 'Hormone của tuyến nội tiết được vận chuyển đi khắp cơ thể bằng con đường nào?', a: 'Bằng con đường máu: hormone được tiết thẳng vào máu rồi theo máu đến các cơ quan để điều hoà hoạt động.' },
    ]
  ),

  'S8KHTN-w30-quiz': L(
    'Hệ sinh dục và sức khoẻ sinh sản tuổi dậy thì',
    'Ở tuổi các em, cơ thể đang có nhiều thay đổi — đó là tuổi dậy thì. Hôm nay ta tìm hiểu hệ sinh dục, những biến đổi tuổi dậy thì và cách chăm sóc sức khoẻ sinh sản đúng đắn.',
    [
      'Nêu cấu tạo và chức năng của hệ sinh dục nam, nữ.',
      'Nêu những biến đổi cơ thể ở tuổi dậy thì.',
      'Nêu biện pháp chăm sóc, bảo vệ sức khoẻ sinh sản.',
    ],
    [
      { h: 'Chức năng của hệ sinh dục' },
      { p: 'Hệ sinh dục đảm nhận chức năng sinh sản, duy trì nòi giống, và tiết hormone sinh dục tạo nên đặc điểm giới tính.' },
      { h: 'Cấu tạo cơ bản' },
      { ul: [
        'Hệ sinh dục nam: tinh hoàn (sản xuất tinh trùng và hormone testosterone) và các cơ quan dẫn tinh.',
        'Hệ sinh dục nữ: buồng trứng (sản xuất trứng và hormone estrogen), tử cung (nơi mang thai).',
      ] },
      { h: 'Tuổi dậy thì' },
      { p: 'Tuổi dậy thì thường bắt đầu ở nữ khoảng 10–15 tuổi, ở nam khoảng 12–17 tuổi. Đây là giai đoạn cơ thể phát triển mạnh và xuất hiện khả năng sinh sản.' },
      { ul: [
        'Ở nữ: bắt đầu có kinh nguyệt, ngực phát triển.',
        'Ở nam: giọng trầm, mọc ria, vai rộng, bắt đầu xuất tinh.',
        'Cả hai giới: cao nhanh, mọc lông nách – lông mu, da có thể nổi mụn.',
      ] },
      { h: 'Chăm sóc sức khoẻ sinh sản' },
      { ul: [
        'Giữ vệ sinh cơ thể, vệ sinh cá nhân đúng cách.',
        'Ăn đủ chất, ngủ đủ giấc, tập thể dục.',
        'Không quan hệ tình dục sớm; tránh xa các nội dung không lành mạnh.',
        'Khi có thắc mắc, nên hỏi người lớn đáng tin cậy hoặc cán bộ y tế.',
      ] },
      { note: 'Những thay đổi tuổi dậy thì là hoàn toàn bình thường — hiểu đúng để tự tin và chăm sóc bản thân tốt hơn.' },
    ],
    [
      { q: 'Tuổi dậy thì ở nữ thường bắt đầu vào khoảng độ tuổi nào?', a: 'Khoảng 10–15 tuổi, với dấu hiệu rõ rệt là bắt đầu có kinh nguyệt.' },
      { q: 'Tinh hoàn ở nam giới có chức năng gì?', a: 'Tinh hoàn sản xuất tinh trùng và tiết hormone sinh dục nam testosterone (tạo nên các đặc điểm giới tính nam).' },
      { q: 'Em hãy nêu hai việc nên làm để chăm sóc sức khoẻ sinh sản ở tuổi dậy thì.', a: 'Giữ vệ sinh cơ thể và vệ sinh cá nhân sạch sẽ đúng cách; ăn uống đủ chất, ngủ đủ giấc, tập thể dục và không quan hệ tình dục sớm.' },
    ]
  ),

  'S8KHTN-w31-quiz': L(
    'Môi trường trong cơ thể và bảo vệ sức khoẻ',
    'Để các tế bào sống và làm việc tốt, "môi trường" quanh chúng phải luôn ổn định. Hôm nay ta tìm hiểu môi trường trong cơ thể, các bệnh thường gặp và cách phòng bệnh, sống lành mạnh.',
    [
      'Nêu khái niệm môi trường trong cơ thể và cân bằng nội môi.',
      'Phân biệt bệnh truyền nhiễm và bệnh không truyền nhiễm.',
      'Nêu biện pháp phòng bệnh và lối sống lành mạnh.',
    ],
    [
      { h: 'Môi trường trong cơ thể' },
      { p: 'Môi trường trong cơ thể gồm máu, nước mô và bạch huyết, là nơi tế bào trao đổi chất. Cơ thể luôn điều hoà để giữ ổn định nhiệt độ, độ pH, lượng đường, nước và muối khoáng — gọi là cân bằng môi trường trong (cân bằng nội môi).' },
      { h: 'Vai trò của cân bằng nội môi' },
      { p: 'Khi môi trường trong ổn định, tế bào hoạt động bình thường. Mất cân bằng (sốt cao, mất nước, hạ đường huyết…) làm rối loạn hoạt động cơ thể, có thể nguy hiểm.' },
      { h: 'Bệnh truyền nhiễm' },
      { p: 'Bệnh truyền nhiễm do vi khuẩn, virus, kí sinh trùng gây ra và có thể lây từ người sang người. Ví dụ: cảm cúm, sởi, sốt xuất huyết, lao, COVID-19.' },
      { ul: ['Phòng: tiêm vaccine, rửa tay, ăn chín uống sôi, đeo khẩu trang, diệt muỗi.'] },
      { h: 'Bệnh không truyền nhiễm' },
      { p: 'Bệnh không truyền nhiễm do lối sống, di truyền, môi trường… không lây từ người sang người. Ví dụ: bệnh tim mạch, đái tháo đường, ung thư, béo phì.' },
      { ul: ['Phòng: ăn cân đối, tập thể dục, không hút thuốc, hạn chế rượu bia, giảm căng thẳng, khám sức khoẻ định kỳ.'] },
      { note: 'Lối sống lành mạnh là cách phòng bệnh hiệu quả và rẻ tiền nhất.' },
    ],
    [
      { q: 'Môi trường trong cơ thể gồm những thành phần nào?', a: 'Gồm máu, nước mô và bạch huyết — là nơi tế bào thực hiện trao đổi chất.' },
      { q: 'COVID-19 thuộc loại bệnh nào? Vì sao?', a: 'Là bệnh truyền nhiễm, vì do virus (SARS-CoV-2) gây ra và lây lan từ người sang người qua đường hô hấp.' },
      { q: 'Em hãy nêu hai biện pháp phòng bệnh tim mạch (một bệnh không truyền nhiễm).', a: 'Ăn uống cân đối, hạn chế muối và mỡ động vật, nhiều rau xanh; tập thể dục đều đặn, không hút thuốc lá và hạn chế rượu bia.' },
    ]
  ),

  'S8KHTN-w32-quiz': L(
    'Ôn tập Hoá học (Học kì 2)',
    'Bài hôm nay hệ thống lại toàn bộ phần Hoá học lớp 8: từ phản ứng hoá học, mol, dung dịch đến acid – base – oxide – muối. Cùng luyện các dạng bài tập quen thuộc nhé!',
    [
      'Hệ thống hoá kiến thức Hoá học lớp 8.',
      'Luyện các dạng bài tập tính theo phương trình, tính nồng độ.',
      'Củng cố tính chất hoá học của các loại hợp chất.',
    ],
    [
      { h: 'Phản ứng hoá học và mol' },
      { ul: [
        'Biến đổi vật lí ↔ hoá học; định luật bảo toàn khối lượng; cân bằng PTHH.',
        'Mol: n = m/M; thể tích khí V = 24,79·n (đkc) hoặc 22,4·n (đktc).',
        'Tính theo phương trình hoá học theo 4 bước.',
      ] },
      { h: 'Dung dịch' },
      { ul: [
        'Nồng độ phần trăm: C% = m_ct/m_dd · 100%.',
        'Nồng độ mol: C_M = n/V.',
        'Pha loãng: C₁V₁ = C₂V₂.',
      ] },
      { h: 'Các loại hợp chất vô cơ' },
      { ul: [
        'Acid: làm quỳ hoá đỏ; tác dụng kim loại, base, oxide base.',
        'Base: làm quỳ hoá xanh; tác dụng acid, oxide acid.',
        'Oxide: oxide acid và oxide base.',
        'Muối: tác dụng kim loại, acid, base, muối khác (điều kiện kết tủa/khí).',
      ] },
      { h: 'Mối liên hệ giữa các loại hợp chất' },
      { ul: [
        'Oxide base + acid → muối + nước.',
        'Oxide acid + base → muối + nước.',
        'Acid + base → muối + nước (trung hoà).',
        'Acid/base/muối có thể chuyển hoá lẫn nhau theo các phản ứng đặc trưng.',
      ] },
      { note: 'Khi viết phương trình, luôn cân bằng và kiểm tra điều kiện phản ứng (kết tủa, khí).' },
    ],
    [
      { q: 'Tính khối lượng NaCl có trong 200 g dung dịch NaCl 5%.', a: 'm_ct = (C% · m_dd)/100 = (5 · 200)/100 = 10 g.' },
      { q: 'Viết phương trình phản ứng trung hoà giữa HCl và NaOH.', a: 'HCl + NaOH → NaCl + H₂O.' },
      { q: 'Cho 5,6 g sắt tác dụng hết với dung dịch HCl. Tính thể tích khí H₂ thoát ra ở đktc (22,4 L/mol).', a: 'n(Fe) = 5,6/56 = 0,1 mol. Fe + 2HCl → FeCl₂ + H₂. n(H₂) = n(Fe) = 0,1 mol. V = 22,4 · 0,1 = 2,24 lít.' },
    ]
  ),

  'S8KHTN-w33-quiz': L(
    'Ôn tập Vật lí (Học kì 2)',
    'Bài hôm nay tổng hợp lại phần Vật lí lớp 8: khối lượng riêng, áp suất, lực và đòn bẩy, dòng điện, nhiệt và sự nở vì nhiệt. Cùng luyện đề để nắm chắc các công thức.',
    [
      'Hệ thống hoá kiến thức Vật lí lớp 8.',
      'Vận dụng công thức để giải bài tập định lượng.',
      'Giải thích các hiện tượng thực tế.',
    ],
    [
      { h: 'Khối lượng riêng và áp suất' },
      { ul: [
        'Khối lượng riêng: D = m/V (kg/m³).',
        'Áp suất chất rắn: p = F/S (Pa).',
        'Áp suất chất lỏng: p = ρ·g·h.',
        'Áp suất khí quyển ≈ 101 325 Pa ở mực nước biển.',
      ] },
      { h: 'Lực và đòn bẩy' },
      { ul: [
        'Lực có thể làm vật quay quanh trục.',
        'Điều kiện cân bằng đòn bẩy: F·d₁ = P·d₂.',
        'Lợi về lực thì thiệt về đường đi.',
      ] },
      { h: 'Điện và nhiệt' },
      { ul: [
        'Các tác dụng của dòng điện: nhiệt, phát sáng, từ, hoá học, sinh lí.',
        'Ba hình thức truyền nhiệt: dẫn nhiệt, đối lưu, bức xạ nhiệt.',
        'Sự nở vì nhiệt: khí nở nhiều nhất, rắn nở ít nhất.',
      ] },
      { h: 'Giải thích hiện tượng thực tế thường gặp' },
      { ul: [
        'Dao bén, đầu đinh nhọn → diện tích nhỏ → áp suất lớn.',
        'Lặn càng sâu áp suất nước càng lớn (p = ρgh).',
        'Đường ray để khe hở → tránh hư hại do nở vì nhiệt.',
        'Áo sáng màu mát hơn áo tối màu → hấp thụ bức xạ nhiệt kém hơn.',
      ] },
      { note: 'Luôn đổi đơn vị về chuẩn (m, m², m³, kg, N) trước khi thay số vào công thức.' },
    ],
    [
      { q: 'Tính áp suất tại đáy một bể nước sâu 2 m (ρ = 1000 kg/m³, g = 10 N/kg).', a: 'p = ρ·g·h = 1000 · 10 · 2 = 20 000 Pa.' },
      { q: 'Một đòn bẩy có d₁ = 1,2 m, d₂ = 0,3 m. Để nâng vật nặng P = 400 N cần lực F bao nhiêu?', a: 'F·d₁ = P·d₂ ⇒ F = P·d₂/d₁ = 400 · 0,3/1,2 = 100 N.' },
      { q: 'Nhiệt từ Mặt Trời truyền tới Trái Đất bằng hình thức truyền nhiệt nào?', a: 'Bằng bức xạ nhiệt — hình thức truyền nhiệt bằng các tia nhiệt đi thẳng, truyền được cả trong chân không.' },
    ]
  ),

  'S8KHTN-w34-quiz': L(
    'Ôn tập Sinh học cơ thể người (Học kì 2)',
    'Cả Học kì 2, ta đã đi qua các hệ cơ quan trong cơ thể người. Bài hôm nay hệ thống lại cấu tạo, chức năng từng hệ và cách bảo vệ sức khoẻ.',
    [
      'Hệ thống hoá kiến thức về các hệ cơ quan trong cơ thể người.',
      'Liên hệ giữa cấu tạo và chức năng của mỗi hệ.',
      'Củng cố các biện pháp bảo vệ sức khoẻ.',
    ],
    [
      { h: 'Các hệ vận động và tuần hoàn' },
      { ul: [
        'Hệ vận động: bộ xương (nâng đỡ, bảo vệ) và cơ (vận động); bảo vệ tránh cong vẹo cột sống.',
        'Hệ tuần hoàn: máu, tim 4 ngăn, hệ mạch, hai vòng tuần hoàn; nhóm máu và miễn dịch.',
      ] },
      { h: 'Hệ hô hấp, tiêu hoá, bài tiết' },
      { ul: [
        'Hệ hô hấp: đường dẫn khí và phổi; trao đổi khí ở phế nang.',
        'Hệ tiêu hoá: biến đổi và hấp thụ thức ăn ở ruột non; dinh dưỡng cân đối.',
        'Hệ bài tiết: thận lọc máu (nephron), cân bằng môi trường trong.',
      ] },
      { h: 'Hệ thần kinh, nội tiết, sinh dục' },
      { ul: [
        'Hệ thần kinh: não, tuỷ sống, nơron; phản xạ; các giác quan.',
        'Hệ nội tiết: hormone điều hoà qua máu.',
        'Hệ sinh dục: sinh sản; sức khoẻ sinh sản tuổi dậy thì.',
      ] },
      { h: 'Liên hệ cấu tạo – chức năng' },
      { ul: [
        'Ruột non có nhiều lông ruột → tăng diện tích hấp thụ.',
        'Phế nang nhiều và mỏng → tăng hiệu quả trao đổi khí.',
        'Tim 4 ngăn và van tim → máu chảy một chiều, không pha trộn.',
        'Thận nhiều nephron → lọc máu hiệu quả, giữ cân bằng nội môi.',
      ] },
      { note: 'Các hệ cơ quan phối hợp chặt chẽ; sức khoẻ tốt là kết quả của lối sống lành mạnh và hiểu biết về cơ thể.' },
    ],
    [
      { q: 'Người trưởng thành có khoảng bao nhiêu chiếc xương?', a: 'Khoảng 206 chiếc xương.' },
      { q: 'Nhóm máu nào được gọi là nhóm "cho được nhiều"?', a: 'Nhóm O, vì hồng cầu không có kháng nguyên A và B.' },
      { q: 'Cơ quan nào đảm nhận chức năng lọc máu, tạo nước tiểu?', a: 'Thận — với khoảng một triệu nephron mỗi quả thận làm nhiệm vụ lọc máu.' },
    ]
  ),

  'S8KHTN-w35-quiz': L(
    'Ôn tập cuối năm',
    'Bài cuối cùng của KHTN 8: ta tổng kết cả ba phân môn Hoá – Lí – Sinh, kết nối kiến thức cả năm và tự đánh giá để chuẩn bị tốt cho kì thi cuối năm.',
    [
      'Tổng kết kiến thức Hoá học, Vật lí, Sinh học cả năm.',
      'Vận dụng giải bài tập tổng hợp.',
      'Tự đánh giá và lên kế hoạch ôn tập.',
    ],
    [
      { h: 'Tổng kết Hoá học' },
      { ul: [
        'Phản ứng hoá học, định luật bảo toàn khối lượng, PTHH.',
        'Mol và tính theo phương trình hoá học.',
        'Dung dịch (C%, C_M, pha loãng).',
        'Acid – base – oxide – muối, thang pH.',
      ] },
      { h: 'Tổng kết Vật lí' },
      { ul: [
        'Khối lượng riêng, áp suất chất rắn – lỏng – khí.',
        'Tác dụng làm quay của lực, đòn bẩy.',
        'Dòng điện và các tác dụng; nhiệt và sự nở vì nhiệt.',
      ] },
      { h: 'Tổng kết Sinh học' },
      { ul: [
        'Cấp độ tổ chức cơ thể người.',
        'Các hệ cơ quan: vận động, tuần hoàn, hô hấp, tiêu hoá, bài tiết, thần kinh, nội tiết, sinh dục.',
        'Bảo vệ sức khoẻ và cân bằng môi trường trong.',
      ] },
      { h: 'Kế hoạch tự ôn tập' },
      { ul: [
        'Lập danh sách công thức Hoá – Lí và học thuộc kèm đơn vị.',
        'Ôn tính chất hoá học của acid, base, oxide, muối kèm phương trình minh hoạ.',
        'Ôn cấu tạo – chức năng từng hệ cơ quan của cơ thể người.',
        'Tự làm đề tổng hợp, chấm điểm và xem lại phần còn yếu.',
      ] },
      { note: 'Học tổng hợp, liên hệ thực tế và làm nhiều bài tập sẽ giúp em tự tin bước vào kì thi cuối năm.' },
    ],
    [
      { q: 'Cân bằng phương trình: Al + O₂ → Al₂O₃.', a: '4Al + 3O₂ → 2Al₂O₃.' },
      { q: 'Tim người có mấy ngăn và gồm những ngăn nào?', a: 'Tim có 4 ngăn: tâm nhĩ trái, tâm nhĩ phải, tâm thất trái, tâm thất phải.' },
      { q: 'Tính nồng độ mol của dung dịch chứa 0,2 mol HCl trong 0,5 lít dung dịch.', a: 'C_M = n/V = 0,2/0,5 = 0,4 mol/L (0,4 M).' },
    ]
  ),

  'S8KHTN-w36-quiz': L(
    'Kết thúc KHTN 8 — Ba ngành khoa học, một hành trình',
    'Năm lớp 8 đã dẫn các em qua ba thế giới khoa học kì diệu: Vật Lí với áp suất, lực đẩy và nhiệt học; Hoá Học với acid, base, oxide, muối và nồng độ dung dịch; Sinh Học với toàn bộ cơ thể người — từng tế bào, từng hệ cơ quan. Đây là tuần ôn tập tổng kết, cũng là bệ phóng để em tự tin bước vào KHTN lớp 9.',
    [
      'Hệ thống ba mạch kiến thức lớn của KHTN 8: Vật Lí, Hoá Học và Sinh Học.',
      'Nắm vững các công thức và phương trình hoá học trọng tâm.',
      'Hiểu rõ cầu nối kiến thức sang lớp 9 để định hướng ôn tập.',
    ],
    [
      { h: 'Vật Lí — Cơ học và Nhiệt học' },
      { ul: [
        'Áp suất: p = F/S (Pa); áp suất chất lỏng p = d·h; áp suất khí quyển ~10⁵ Pa.',
        'Lực đẩy Archimedes: F_A = d·V (V là thể tích phần chất lỏng bị chiếm chỗ). Vật nổi khi F_A ≥ P.',
        'Công cơ học: A = F·s (J); Công suất: P = A/t (W); Hiệu suất: H = A_ích/A_toàn phần × 100%.',
        'Nhiệt học: nhiệt năng, nhiệt lượng Q = m·c·Δt; sự nở vì nhiệt (rắn, lỏng, khí); truyền nhiệt (dẫn, đối lưu, bức xạ).',
      ] },
      { h: 'Hoá Học — Phân loại chất vô cơ' },
      { ul: [
        'Oxide: gồm oxide acid (SO₃, CO₂, P₂O₅) và oxide base (CaO, Na₂O, Fe₂O₃); phản ứng với nước, acid, base.',
        'Acid: phân li ra H⁺ và gốc acid; tác dụng với kim loại, oxide base, base, muối.',
        'Base (kiềm/không tan): phân li ra OH⁻; tác dụng với acid, oxide acid, muối, một số kim loại.',
        'Muối: phân li ra cation kim loại và anion gốc acid; phản ứng trao đổi, tác dụng với acid/base/kim loại.',
        'Nồng độ dung dịch: C% = (m_chất tan / m_dung dịch) × 100; C_M = n/V (mol/L).',
        'Pha chế dung dịch và cân bằng phương trình hoá học là kĩ năng cốt lõi.',
      ] },
      { h: 'Sinh Học — Cơ thể người' },
      { ul: [
        'Cấu trúc cơ thể: tế bào → mô → cơ quan → hệ cơ quan → cơ thể.',
        'Hệ vận động: xương (khớp, thành phần hoá học), cơ (co – duỗi, mệt mỏi cơ).',
        'Hệ tuần hoàn: tim 4 ngăn; vòng tuần hoàn nhỏ (phổi) và lớn (cơ thể); thành phần máu; nhóm máu ABO.',
        'Hệ hô hấp: đường dẫn khí; trao đổi khí ở phổi và tế bào; bảo vệ hệ hô hấp.',
        'Hệ tiêu hoá: cơ quan và enzyme tiêu hoá; hấp thụ chất dinh dưỡng ở ruột non.',
        'Hệ bài tiết, thần kinh, nội tiết, sinh dục — các chức năng điều hoà và duy trì cân bằng nội môi.',
        'Vệ sinh và bảo vệ sức khoẻ: phòng bệnh truyền nhiễm, an toàn thực phẩm, lối sống lành mạnh.',
      ] },
      { h: 'Cầu nối sang KHTN lớp 9' },
      { ul: [
        'Vật Lí: điện học nâng cao (điện trở, định luật Ohm, mạch điện song song/nối tiếp), quang học, từ trường.',
        'Hoá Học: phi kim (clo, cacbon, silic), hợp chất của cacbon (CO, CO₂, CaCO₃), hoá học hữu cơ (hidrocacbon, dẫn xuất, polime, glucozơ, protein).',
        'Sinh Học: di truyền học (ADN, gen, nhiễm sắc thể, các quy luật Mendel), tiến hoá, sinh thái học.',
      ] },
      { h: 'Bí quyết ôn tập tổng hợp' },
      { ul: [
        'Lập bảng công thức Hoá – Lí kèm đơn vị và điều kiện áp dụng.',
        'Ôn tính chất hoá học của acid/base/oxide/muối kèm phương trình minh hoạ.',
        'Vẽ sơ đồ tư duy từng hệ cơ quan với cấu trúc và chức năng.',
        'Tự làm đề tổng hợp, chấm điểm và phân tích lỗi sai.',
      ] },
      { note: 'Khoa học không chỉ là lí thuyết trên trang sách — đó là công cụ để hiểu cuộc sống. Mỗi khi em nhìn thấy bình nước sôi, ăn cơm, hay nhìn thấy máu chảy từ vết thương, đó là KHTN đang xảy ra quanh em!' },
    ],
    [
      { q: 'Một vật nặng 500 g hoàn toàn chìm trong nước (d_nước = 10 000 N/m³), thể tích vật là 80 cm³. Vật có nổi không?', a: 'P = 0,5 × 10 = 5 N. F_A = d × V = 10 000 × 80×10⁻⁶ = 0,8 N. Vì P = 5 N > F_A = 0,8 N nên vật chìm.' },
      { q: 'Viết phương trình hoá học: CuO + H₂SO₄ → ? và NaOH + HCl → ?', a: 'CuO + H₂SO₄ → CuSO₄ + H₂O (oxide base + acid → muối + nước). NaOH + HCl → NaCl + H₂O (base + acid → muối + nước — phản ứng trung hoà).' },
      { q: 'Hãy mô tả ngắn gọn vòng tuần hoàn lớn của máu.', a: 'Máu giàu O₂ từ tâm thất trái → động mạch chủ → toàn bộ cơ thể (cung cấp O₂ và chất dinh dưỡng, nhận CO₂ và chất thải) → tĩnh mạch chủ → tâm nhĩ phải. Vòng tuần hoàn lớn nuôi toàn thân, còn vòng nhỏ (tâm thất phải → phổi) có chức năng trao đổi khí.' },
    ]
  ),
};
