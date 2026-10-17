// ============================================================
// Lớp 11 · HOÁ HỌC — Lý thuyết tuần (35 tuần)
// Bám CT GDPT 2018 (Hoá học 11).
// Key trùng id quiz: "H11HOA-wNN-quiz".
// ============================================================

export const H11HOA_LESSONS = {
  'H11HOA-w01-quiz': {
    topic: 'Cân bằng hoá học — Khái niệm',
    intro: 'Chào các em! Mở đầu chương trình Hoá 11, chúng ta tìm hiểu một khái niệm trung tâm: cân bằng hoá học. Hiểu được vì sao một phản ứng có thể xảy ra theo cả hai chiều sẽ giúp các em giải thích rất nhiều hiện tượng sau này.',
    objectives: [
      'Phân biệt phản ứng một chiều và phản ứng thuận nghịch.',
      'Nêu được trạng thái cân bằng hoá học là cân bằng động.',
      'Liệt kê các yếu tố làm chuyển dịch cân bằng.',
    ],
    theory: [
      { h: 'Phản ứng một chiều và phản ứng thuận nghịch' },
      { p: 'Phản ứng một chiều chỉ xảy ra theo một chiều, ký hiệu mũi tên ->. Ví dụ: 2KClO3 -> 2KCl + 3O2. Phản ứng thuận nghịch xảy ra đồng thời theo cả hai chiều trong cùng điều kiện, ký hiệu mũi tên hai chiều ⇌.' },
      { p: 'Ví dụ kinh điển: N2 + 3H2 ⇌ 2NH3. Chiều thuận tạo NH3, chiều nghịch phân huỷ NH3 trở lại.' },
      { h: 'Trạng thái cân bằng hoá học' },
      { p: 'Khi tốc độ phản ứng thuận bằng tốc độ phản ứng nghịch (v_thuận = v_nghịch), hệ đạt trạng thái cân bằng. Lúc này nồng độ các chất không đổi theo thời gian (ở một nhiệt độ xác định).' },
      { note: 'Cân bằng hoá học là cân bằng ĐỘNG: phản ứng vẫn diễn ra ở cả hai chiều, nhưng hai tốc độ bằng nhau nên nồng độ không thay đổi. Phản ứng không hề "dừng lại".' },
      { h: 'Các yếu tố ảnh hưởng' },
      { ul: ['Nồng độ: tăng/giảm nồng độ chất sẽ chuyển dịch cân bằng.', 'Nhiệt độ: ảnh hưởng theo chiều thu/toả nhiệt.', 'Áp suất: chỉ ảnh hưởng khi hệ có chất khí và số mol khí hai vế khác nhau.'] },
      { note: 'Xúc tác KHÔNG làm chuyển dịch cân bằng, chỉ giúp hệ đạt cân bằng nhanh hơn.' },
    ],
    examples: [
      { q: 'Bài tập: Cho biết phản ứng nào sau đây là thuận nghịch: (a) 2H2 + O2 -> 2H2O (nổ); (b) N2 + 3H2 ⇌ 2NH3.', a: 'Giải: (b) là phản ứng thuận nghịch vì xảy ra theo cả hai chiều trong cùng điều kiện (ký hiệu ⇌). (a) cháy nổ là phản ứng xảy ra gần như hoàn toàn một chiều.' },
      { q: 'Bài tập: Tại trạng thái cân bằng, nồng độ các chất có thay đổi không? Phản ứng có dừng không?', a: 'Giải: Nồng độ các chất KHÔNG đổi (ở nhiệt độ cho trước). Phản ứng KHÔNG dừng — đó là cân bằng động, hai chiều vẫn xảy ra với tốc độ bằng nhau.' },
    ],
  },

  'H11HOA-w02-quiz': {
    topic: 'Hằng số cân bằng Kc và nguyên lý Le Chatelier',
    intro: 'Các em thân mến, tuần này ta định lượng cân bằng bằng hằng số Kc, rồi học nguyên lý Le Chatelier — công cụ dự đoán chiều chuyển dịch khi tác động vào hệ.',
    objectives: [
      'Viết được biểu thức hằng số cân bằng Kc.',
      'Hiểu Kc chỉ phụ thuộc nhiệt độ.',
      'Vận dụng nguyên lý Le Chatelier dự đoán chiều chuyển dịch.',
    ],
    theory: [
      { h: 'Hằng số cân bằng Kc' },
      { p: 'Với phản ứng tổng quát: aA + bB ⇌ cC + dD, ở trạng thái cân bằng ta có Kc = ([C]^c · [D]^d) / ([A]^a · [B]^b), trong đó [ ] là nồng độ mol/L tại cân bằng.' },
      { ul: ['Kc càng lớn -> cân bằng càng thiên về sản phẩm.', 'Chất rắn và chất lỏng nguyên chất KHÔNG đưa vào biểu thức Kc.', 'Kc chỉ phụ thuộc nhiệt độ, KHÔNG phụ thuộc nồng độ ban đầu hay xúc tác.'] },
      { h: 'Nguyên lý Le Chatelier' },
      { p: 'Khi tác động một yếu tố (nồng độ, nhiệt độ, áp suất) vào hệ đang cân bằng, cân bằng sẽ chuyển dịch theo chiều CHỐNG LẠI tác động đó.' },
      { ul: ['Tăng nồng độ một chất -> dịch theo chiều làm giảm chất đó.', 'Tăng áp suất -> dịch về phía có ít mol khí hơn.', 'Tăng nhiệt độ -> dịch theo chiều thu nhiệt.'] },
      { note: 'Xúc tác làm cân bằng đạt nhanh hơn nhưng không đổi vị trí cân bằng (không đổi Kc).' },
      { h: 'Ý nghĩa thực tế' },
      { p: 'Quy trình Haber tổng hợp NH3 dùng áp suất cao (dịch về phía 2NH3, ít mol khí hơn) và nhiệt độ vừa phải để cân bằng lợi cho sản phẩm.' },
    ],
    examples: [
      { q: 'Bài tập: Viết biểu thức Kc cho phản ứng N2(k) + 3H2(k) ⇌ 2NH3(k).', a: 'Giải: Kc = [NH3]^2 / ([N2] · [H2]^3).' },
      { q: 'Bài tập: Cho N2 + 3H2 ⇌ 2NH3 (toả nhiệt). Khi tăng áp suất và giảm nhiệt độ, cân bằng dịch chiều nào?', a: 'Giải: Tăng áp suất -> dịch về phía ít mol khí hơn = chiều thuận (4 mol khí -> 2 mol khí). Giảm nhiệt độ với phản ứng toả nhiệt -> dịch theo chiều toả nhiệt = chiều thuận. Cả hai đều làm tăng hiệu suất tạo NH3.' },
    ],
  },

  'H11HOA-w03-quiz': {
    topic: 'Sự điện li — Khái niệm',
    intro: 'Chào các em! Vì sao dung dịch muối dẫn điện còn đường thì không? Câu trả lời nằm ở sự điện li — quá trình phân li thành ion khi chất tan vào nước.',
    objectives: [
      'Nêu khái niệm chất điện li, sự điện li.',
      'Phân biệt chất điện li mạnh và yếu.',
      'Giải thích tính dẫn điện của dung dịch.',
    ],
    theory: [
      { h: 'Chất điện li và sự điện li' },
      { p: 'Chất điện li là chất khi tan trong nước phân li ra ion. Quá trình phân li đó gọi là sự điện li. Dung dịch chất điện li dẫn điện được nhờ các ion chuyển động tự do.' },
      { p: 'Ví dụ: NaCl -> Na+ + Cl-; HCl -> H+ + Cl-.' },
      { h: 'Chất điện li mạnh' },
      { ul: ['Phân li hoàn toàn (độ điện li α = 1).', 'Gồm: axit mạnh (HCl, HNO3, H2SO4), bazơ mạnh (NaOH, KOH, Ba(OH)2), hầu hết các muối tan.', 'Viết bằng mũi tên một chiều ->.'] },
      { h: 'Chất điện li yếu' },
      { ul: ['Phân li một phần (0 < α < 1).', 'Gồm: axit yếu (CH3COOH, H2CO3), bazơ yếu (NH3 trong nước).', 'Viết bằng mũi tên hai chiều ⇌: CH3COOH ⇌ CH3COO- + H+.'] },
      { note: 'Chất KHÔNG điện li (đường glucozơ, ancol C2H5OH) tan ra dạng phân tử, không tạo ion nên dung dịch KHÔNG dẫn điện.' },
    ],
    examples: [
      { q: 'Bài tập: Trong các chất NaCl, CH3COOH, glucozơ, chất nào là điện li mạnh, yếu, không điện li?', a: 'Giải: NaCl điện li mạnh (NaCl -> Na+ + Cl-). CH3COOH điện li yếu (phân li một phần). Glucozơ không điện li (tan ở dạng phân tử).' },
      { q: 'Bài tập: Vì sao nước muối dẫn điện còn nước đường thì không?', a: 'Giải: Nước muối chứa các ion Na+, Cl- chuyển động tự do nên dẫn điện. Nước đường chỉ chứa phân tử glucozơ không phân li thành ion nên không dẫn điện.' },
    ],
  },

  'H11HOA-w04-quiz': {
    topic: 'Axit - Bazơ - Muối (Arrhenius và Bronsted)',
    intro: 'Các em ạ, axit và bazơ có nhiều cách định nghĩa. Tuần này ta học hai thuyết: Arrhenius (dựa trên ion trong nước) và Bronsted (dựa trên cho/nhận proton).',
    objectives: [
      'Định nghĩa axit, bazơ theo Arrhenius.',
      'Định nghĩa axit, bazơ theo Bronsted (cho/nhận H+).',
      'Nêu khái niệm muối và phân loại muối trung hoà/axit.',
    ],
    theory: [
      { h: 'Thuyết Arrhenius' },
      { ul: ['Axit: khi tan trong nước phân li ra ion H+. Ví dụ HCl -> H+ + Cl-.', 'Bazơ: khi tan trong nước phân li ra ion OH-. Ví dụ NaOH -> Na+ + OH-.'] },
      { h: 'Thuyết Bronsted-Lowry' },
      { ul: ['Axit là chất cho proton (H+).', 'Bazơ là chất nhận proton (H+).', 'Ví dụ: NH3 + H2O ⇌ NH4+ + OH-. Ở đây NH3 nhận H+ (bazơ), H2O cho H+ (axit).'] },
      { note: 'Thuyết Bronsted rộng hơn: giải thích được tính bazơ của NH3 mà thuyết Arrhenius khó diễn đạt.' },
      { h: 'Muối' },
      { p: 'Muối là hợp chất gồm cation kim loại (hoặc NH4+) và anion gốc axit. Ví dụ NaCl, (NH4)2SO4, NaHCO3.' },
      { ul: ['Muối trung hoà: không còn H có thể thay thế, ví dụ NaCl, Na2SO4.', 'Muối axit: còn H trong gốc axit, ví dụ NaHCO3, NaHSO4.'] },
    ],
    examples: [
      { q: 'Bài tập: Trong phản ứng NH3 + H2O ⇌ NH4+ + OH-, đâu là axit, đâu là bazơ theo Bronsted?', a: 'Giải: NH3 nhận H+ -> bazơ. H2O cho H+ -> axit. (Cặp axit-bazơ liên hợp: H2O/OH- và NH4+/NH3).' },
      { q: 'Bài tập: NaCl là muối loại gì? Dung dịch NaCl có môi trường gì?', a: 'Giải: NaCl là muối trung hoà (tạo từ axit mạnh HCl và bazơ mạnh NaOH). Dung dịch có môi trường trung tính, pH = 7.' },
    ],
  },

  'H11HOA-w05-quiz': {
    topic: 'pH và chỉ thị màu',
    intro: 'Chào các em! pH cho ta biết độ axit hay bazơ của một dung dịch chỉ bằng một con số. Cùng học cách tính pH và dùng chất chỉ thị nhé.',
    objectives: [
      'Nêu công thức pH = -log[H+].',
      'Phân biệt môi trường axit, trung tính, bazơ qua pH.',
      'Sử dụng quỳ tím và phenolphtalein để nhận biết.',
    ],
    theory: [
      { h: 'Khái niệm pH' },
      { p: 'pH = -log[H+], với [H+] là nồng độ ion H+ (mol/L). Trong nước, tích số ion: [H+] · [OH-] = 10^-14 (ở 25°C), nên pH + pOH = 14.' },
      { h: 'Thang pH' },
      { ul: ['pH < 7: môi trường axit ([H+] > 10^-7).', 'pH = 7: trung tính ([H+] = 10^-7).', 'pH > 7: môi trường bazơ ([H+] < 10^-7).'] },
      { h: 'Chất chỉ thị màu' },
      { ul: ['Quỳ tím: hoá ĐỎ trong axit, hoá XANH trong bazơ, không đổi màu trong trung tính.', 'Phenolphtalein: không màu trong axit/trung tính, hoá HỒNG trong bazơ (pH > 8,3).'] },
      { note: 'Để đo chính xác dùng máy đo pH (pH meter) hoặc giấy pH; chỉ thị màu chỉ cho khoảng định tính.' },
    ],
    examples: [
      { q: 'Bài tập: Tính pH của dung dịch HCl 0,01M.', a: 'Giải: HCl là axit mạnh, phân li hoàn toàn: [H+] = 0,01 = 10^-2 mol/L. Vậy pH = -log(10^-2) = 2 (môi trường axit).' },
      { q: 'Bài tập: Nhỏ phenolphtalein vào dung dịch NaOH thì có hiện tượng gì?', a: 'Giải: NaOH là bazơ (pH > 8,3) nên phenolphtalein chuyển sang màu HỒNG.' },
    ],
  },

  'H11HOA-w06-quiz': {
    topic: 'Axit mạnh - yếu, bazơ mạnh - yếu',
    intro: 'Các em thân mến, không phải axit nào cũng "mạnh" như nhau. Tuần này ta so sánh độ mạnh axit/bazơ qua mức độ phân li và hằng số Ka, Kb.',
    objectives: [
      'Phân biệt axit/bazơ mạnh và yếu qua độ phân li.',
      'Nêu ý nghĩa của hằng số Ka.',
      'Tính pH của axit mạnh đơn giản.',
    ],
    theory: [
      { h: 'Axit mạnh và axit yếu' },
      { ul: ['Axit mạnh: phân li hoàn toàn — HCl, HNO3, H2SO4. Ví dụ HCl -> H+ + Cl-.', 'Axit yếu: phân li một phần — CH3COOH, H2CO3, HF. Ví dụ CH3COOH ⇌ CH3COO- + H+.'] },
      { h: 'Bazơ mạnh và bazơ yếu' },
      { ul: ['Bazơ mạnh: tan và phân li hoàn toàn — NaOH, KOH, Ba(OH)2.', 'Bazơ yếu: phân li một phần — NH3 trong nước: NH3 + H2O ⇌ NH4+ + OH-.'] },
      { h: 'Hằng số phân li axit Ka' },
      { p: 'Với axit yếu HA ⇌ H+ + A-, ta có Ka = ([H+]·[A-])/[HA]. Ka càng LỚN thì axit càng MẠNH (phân li nhiều hơn).' },
      { note: 'Cùng nồng độ, axit mạnh cho pH nhỏ hơn axit yếu. Ví dụ HCl 0,1M có pH = 1, còn CH3COOH 0,1M có pH ≈ 2,87.' },
    ],
    examples: [
      { q: 'Bài tập: Tính pH của dung dịch HCl 0,1M.', a: 'Giải: HCl phân li hoàn toàn: [H+] = 0,1 = 10^-1. pH = -log(10^-1) = 1.' },
      { q: 'Bài tập: So sánh pH hai dung dịch cùng 0,1M: HCl và CH3COOH.', a: 'Giải: HCl mạnh (phân li hoàn toàn) cho [H+] lớn hơn nên pH nhỏ hơn (pH = 1). CH3COOH yếu (phân li một phần) cho [H+] nhỏ hơn nên pH lớn hơn (≈ 2,87). Vậy pH(HCl) < pH(CH3COOH).' },
    ],
  },

  'H11HOA-w07-quiz': {
    topic: 'Nitrogen N2 và ammonia NH3',
    intro: 'Chào các em! Nitrogen chiếm 78% không khí nhưng lại rất "trơ". Tuần này ta tìm hiểu vì sao, và làm quen với hợp chất quan trọng NH3.',
    objectives: [
      'Nêu cấu tạo và tính trơ của phân tử N2.',
      'Viết phản ứng tổng hợp NH3 (Haber).',
      'Nêu tính bazơ yếu của NH3.',
    ],
    theory: [
      { h: 'Đơn chất nitrogen N2' },
      { p: 'Cấu hình electron của N (Z=7): 1s2 2s2 2p3. Hai nguyên tử N liên kết bằng liên kết BA rất bền (N≡N), năng lượng phân li lớn nên N2 khá trơ ở nhiệt độ thường.' },
      { ul: ['N2 là khí không màu, không mùi, ít tan trong nước.', 'Số oxi hoá của N rất đa dạng: -3, 0, +1, +2, +3, +4, +5.'] },
      { h: 'Ammonia NH3' },
      { p: 'Tổng hợp NH3 theo quy trình Haber-Bosch: N2 + 3H2 ⇌ 2NH3 (xúc tác Fe, áp suất cao, nhiệt độ vừa phải).' },
      { ul: ['NH3 là khí mùi khai, tan rất nhiều trong nước.', 'NH3 có tính BAZƠ YẾU: NH3 + H2O ⇌ NH4+ + OH-.', 'NH3 + HCl -> NH4Cl (khói trắng — dùng nhận biết).'] },
      { note: 'N trong NH3 có số oxi hoá -3 (thấp nhất) nên NH3 còn thể hiện tính khử.' },
    ],
    examples: [
      { q: 'Bài tập: Giải thích vì sao N2 trơ ở điều kiện thường nhưng phản ứng được khi có nhiệt độ cao/tia lửa.', a: 'Giải: Liên kết ba N≡N rất bền, cần năng lượng lớn để phá vỡ. Ở nhiệt độ cao (hoặc tia lửa điện) đủ năng lượng nên N2 phản ứng, ví dụ N2 + O2 -> 2NO.' },
      { q: 'Bài tập: Cho khí NH3 và khí HCl gặp nhau. Hiện tượng?', a: 'Giải: Xuất hiện khói trắng do tạo tinh thể NH4Cl: NH3 + HCl -> NH4Cl. Đây là cách nhận biết khí NH3.' },
    ],
  },

  'H11HOA-w08-quiz': {
    topic: 'Axit nitric HNO3',
    intro: 'Các em ạ, HNO3 vừa là axit mạnh vừa là chất oxi hoá mạnh — nó hoà tan được cả những kim loại đứng sau H. Cùng tìm hiểu nhé.',
    objectives: [
      'Nêu tính axit mạnh và tính oxi hoá của HNO3.',
      'Viết phản ứng của HNO3 với kim loại (đặc/loãng).',
      'Biết hiện tượng thụ động hoá Fe, Al, Cr.',
    ],
    theory: [
      { h: 'Tính chất của HNO3' },
      { p: 'HNO3 là axit mạnh (phân li hoàn toàn) và có tính OXI HOÁ MẠNH do N ở số oxi hoá +5. Khi tác dụng kim loại, sản phẩm khử là các oxide nitơ chứ KHÔNG giải phóng H2.' },
      { h: 'Phản ứng với kim loại' },
      { ul: ['HNO3 đặc + Cu -> Cu(NO3)2 + NO2 (khí nâu đỏ) + H2O.', 'HNO3 loãng + Cu: 3Cu + 8HNO3 -> 3Cu(NO3)2 + 2NO + 4H2O. Khí NO không màu, hoá nâu trong không khí.'] },
      { note: 'Fe, Al, Cr bị THỤ ĐỘNG HOÁ trong HNO3 đặc nguội (tạo lớp oxide bảo vệ), nên có thể dùng bình nhôm/thép chở HNO3 đặc nguội.' },
      { h: 'Muối nitrate' },
      { p: 'Muối nitrate dễ bị nhiệt phân, sản phẩm tuỳ vị trí kim loại trong dãy hoạt động (tạo NO2 và O2 kèm oxide kim loại hoặc kim loại).' },
      { ul: ['Ứng dụng HNO3: sản xuất phân đạm (NH4NO3), thuốc nổ (TNT), thuốc nhuộm.'] },
    ],
    examples: [
      { q: 'Bài tập: Viết phương trình Cu tác dụng HNO3 loãng và nêu hiện tượng.', a: 'Giải: 3Cu + 8HNO3(loãng) -> 3Cu(NO3)2 + 2NO + 4H2O. Hiện tượng: Cu tan, dung dịch hoá xanh (Cu2+), khí NO không màu thoát ra rồi hoá nâu (NO2) khi gặp không khí.' },
      { q: 'Bài tập: Vì sao có thể chở HNO3 đặc nguội bằng thùng nhôm?', a: 'Giải: Al bị thụ động hoá trong HNO3 đặc nguội — bề mặt tạo lớp oxide Al2O3 bền, ngăn axit tiếp tục phản ứng. Nhờ vậy thùng nhôm không bị ăn mòn.' },
    ],
  },

  'H11HOA-w09-quiz': {
    topic: 'Phosphorus, axit phosphoric và phân bón',
    intro: 'Chào các em! Phosphorus có trong xương, trong diêm và trong phân bón. Tuần này ta học các dạng thù hình của P, axit H3PO4 và các loại phân bón hoá học.',
    objectives: [
      'Phân biệt phosphorus trắng và phosphorus đỏ.',
      'Nêu tính chất axit phosphoric H3PO4.',
      'Nhận biết nguyên tố dinh dưỡng trong phân đạm, lân, kali.',
    ],
    theory: [
      { h: 'Các dạng thù hình của phosphorus' },
      { ul: ['Phosphorus trắng (P4): rất độc, tự bốc cháy trong không khí trên ~40°C, phải bảo quản trong nước.', 'Phosphorus đỏ: cấu trúc polymer, bền hơn, không độc, không tự cháy; dùng làm diêm.'] },
      { h: 'Axit phosphoric H3PO4' },
      { p: 'H3PO4 là axit ba nấc, độ mạnh TRUNG BÌNH (không phải axit mạnh). Phân li theo ba nấc tạo H2PO4-, HPO4^2-, PO4^3-.' },
      { h: 'Phân bón hoá học' },
      { ul: ['Phân đạm: cung cấp nitrogen (N) — ví dụ ure (NH2)2CO, NH4NO3.', 'Phân lân: cung cấp phosphorus (P) — ví dụ supephotphat.', 'Phân kali: cung cấp potassium (K) — ví dụ KCl, K2SO4.'] },
      { note: 'Phân NPK là phân hỗn hợp chứa cả ba nguyên tố N, P, K.' },
    ],
    examples: [
      { q: 'Bài tập: Vì sao phải bảo quản phosphorus trắng trong nước?', a: 'Giải: Phosphorus trắng tự bốc cháy trong không khí ở nhiệt độ thấp (>40°C). Ngâm trong nước cách ly với oxygen không khí nên không bị cháy.' },
      { q: 'Bài tập: Một loại phân bón ghi 46% N. Đó là phân gì và cung cấp nguyên tố dinh dưỡng nào?', a: 'Giải: Đó là phân ĐẠM (cung cấp nitrogen N). Hàm lượng N cao 46% ứng với ure (NH2)2CO — loại phân đạm phổ biến nhất.' },
    ],
  },

  'H11HOA-w10-quiz': {
    topic: 'Carbon và silicon',
    intro: 'Các em thân mến, carbon là nguyên tố của sự sống còn silicon là nguyên tố của công nghệ. Tuần này ta học hai nguyên tố cùng nhóm IVA này.',
    objectives: [
      'Nêu các dạng thù hình của carbon.',
      'Phân biệt CO và CO2 về tính chất, độc tính.',
      'Nêu ứng dụng của silicon và SiO2.',
    ],
    theory: [
      { h: 'Carbon và các dạng thù hình' },
      { ul: ['Kim cương: cứng nhất, không dẫn điện.', 'Than chì (graphite): mềm, dẫn điện, làm ruột bút chì và điện cực.', 'Fullerene (C60): cấu trúc hình cầu.'] },
      { h: 'Oxide của carbon' },
      { ul: ['CO: khí không màu, không mùi, RẤT ĐỘC (gắn vào hemoglobin gây ngạt). Là chất khử mạnh.', 'CO2: khí không màu, không duy trì sự cháy; là khí gây hiệu ứng nhà kính.'] },
      { h: 'Silicon và SiO2' },
      { p: 'Silicon (Si) thuộc nhóm IVA, cùng nhóm carbon. SiO2 (thạch anh, cát) là chất rắn, thành phần chính của thuỷ tinh.' },
      { note: 'Silicon siêu tinh khiết là CHẤT BÁN DẪN — vật liệu nền của vi mạch, chip điện tử.' },
    ],
    examples: [
      { q: 'Bài tập: Vì sao khí CO nguy hiểm khi đốt than trong phòng kín?', a: 'Giải: Khi thiếu oxygen, than cháy không hoàn toàn tạo khí CO. CO không màu, không mùi, gắn chặt vào hemoglobin của máu mạnh hơn O2 -> máu không vận chuyển được oxygen -> ngạt và có thể tử vong.' },
      { q: 'Bài tập: Vì sao silicon được dùng làm chip điện tử?', a: 'Giải: Silicon siêu tinh khiết là chất bán dẫn — dẫn điện có điều khiển được. Tính chất này cho phép chế tạo transistor, nền tảng của mọi vi mạch và chip máy tính.' },
    ],
  },

  'H11HOA-w11-quiz': {
    topic: 'Đại cương hoá hữu cơ — Khái niệm',
    intro: 'Chào các em! Từ tuần này ta bước vào thế giới hoá hữu cơ — hoá học của hợp chất carbon. Hãy nắm vững khái niệm nền tảng trước nhé.',
    objectives: [
      'Nêu khái niệm hợp chất hữu cơ và đặc điểm chung.',
      'Phân loại hợp chất hữu cơ.',
      'Nêu đặc điểm của phản ứng hữu cơ.',
    ],
    theory: [
      { h: 'Hợp chất hữu cơ là gì?' },
      { p: 'Hợp chất hữu cơ là hợp chất của carbon (trừ một số hợp chất như CO, CO2, muối carbonate, cyanide...). Nguyên tố luôn có là C, thường kèm H, ngoài ra có thể có O, N, halogen...' },
      { h: 'Đặc điểm chung' },
      { ul: ['Liên kết trong phân tử chủ yếu là liên kết cộng hoá trị.', 'Đa số kém bền nhiệt, dễ cháy.', 'Phần lớn không tan trong nước, tan trong dung môi hữu cơ.', 'Phản ứng thường xảy ra chậm, theo nhiều hướng, cần xúc tác/nhiệt.'] },
      { h: 'Phân loại' },
      { ul: ['Theo mạch carbon: mạch hở (no, không no) và mạch vòng.', 'Hydrocarbon: chỉ chứa C và H.', 'Dẫn xuất của hydrocarbon: ngoài C, H còn có O, N, halogen...'] },
      { note: 'Nhóm chức là nhóm nguyên tử quyết định tính chất hoá học đặc trưng của hợp chất hữu cơ (ví dụ -OH, -CHO, -COOH).' },
    ],
    examples: [
      { q: 'Bài tập: Trong các chất CH4, CO2, C2H5OH, CaCO3 — chất nào là hợp chất hữu cơ?', a: 'Giải: CH4 và C2H5OH là hợp chất hữu cơ. CO2 và CaCO3 (carbonate) là hợp chất vô cơ dù chứa carbon.' },
      { q: 'Bài tập: Nêu hai đặc điểm phân biệt phản ứng hữu cơ với phản ứng vô cơ.', a: 'Giải: (1) Phản ứng hữu cơ thường xảy ra CHẬM (phản ứng vô cơ giữa các ion xảy ra nhanh, tức thời). (2) Phản ứng hữu cơ thường cho NHIỀU sản phẩm/nhiều hướng, cần xúc tác và nhiệt.' },
    ],
  },

  'H11HOA-w12-quiz': {
    topic: 'Đồng đẳng và đồng phân',
    intro: 'Các em ạ, hai khái niệm đồng đẳng và đồng phân thường bị nhầm lẫn. Tuần này ta phân biệt rõ ràng và biết cách viết đồng phân.',
    objectives: [
      'Nêu khái niệm dãy đồng đẳng.',
      'Nêu khái niệm và các loại đồng phân.',
      'Viết được đồng phân của các phân tử đơn giản.',
    ],
    theory: [
      { h: 'Dãy đồng đẳng' },
      { p: 'Các chất ĐỒNG ĐẲNG có cấu tạo và tính chất hoá học tương tự nhau, nhưng thành phần phân tử hơn kém nhau một hay nhiều nhóm CH2. Ví dụ dãy ankan: CH4, C2H6, C3H8...' },
      { h: 'Đồng phân' },
      { p: 'Các chất ĐỒNG PHÂN có cùng công thức phân tử (CTPT) nhưng khác nhau công thức cấu tạo (CTCT), do đó tính chất khác nhau.' },
      { ul: ['Đồng phân cấu tạo: đồng phân mạch carbon, đồng phân vị trí nhóm chức, đồng phân nhóm chức.', 'Đồng phân hình học (cis-trans): cần có liên kết đôi C=C và mỗi C của nối đôi mang hai nhóm khác nhau.'] },
      { note: 'Ví dụ đồng phân nhóm chức: C2H6O ứng với ancol C2H5OH và ete CH3-O-CH3.' },
    ],
    examples: [
      { q: 'Bài tập: Viết các đồng phân cấu tạo mạch carbon của C4H10.', a: 'Giải: C4H10 có 2 đồng phân: butan CH3-CH2-CH2-CH3 (mạch thẳng) và isobutan (2-metylpropan) (CH3)3CH (mạch nhánh).' },
      { q: 'Bài tập: CH3-CH2-OH và CH3-O-CH3 có quan hệ gì?', a: 'Giải: Cùng CTPT C2H6O nhưng khác CTCT (một là ancol có -OH, một là ete có -O-). Đó là đồng phân nhóm chức.' },
    ],
  },

  'H11HOA-w13-quiz': {
    topic: 'Công thức cấu tạo và danh pháp IUPAC',
    intro: 'Chào các em! Để gọi tên hợp chất hữu cơ một cách thống nhất, ta dùng danh pháp IUPAC. Tuần này ta học cách đọc tên qua các đuôi đặc trưng.',
    objectives: [
      'Phân biệt công thức phân tử và công thức cấu tạo.',
      'Nắm các đuôi danh pháp IUPAC theo loại hợp chất.',
      'Gọi tên một số chất đơn giản.',
    ],
    theory: [
      { h: 'Công thức phân tử và công thức cấu tạo' },
      { ul: ['Công thức phân tử (CTPT): cho biết số nguyên tử mỗi nguyên tố, ví dụ C2H6O.', 'Công thức cấu tạo (CTCT): cho biết thứ tự và cách liên kết giữa các nguyên tử, ví dụ CH3-CH2-OH.'] },
      { h: 'Cách gọi tên IUPAC theo đuôi' },
      { ul: ['Đuôi -an: ankan (hydrocarbon no), ví dụ metan, etan.', 'Đuôi -en: anken (1 liên kết đôi C=C), ví dụ eten.', 'Đuôi -in: ankin (1 liên kết ba C≡C), ví dụ etin.', 'Đuôi -ol: ancol (nhóm -OH), ví dụ etanol.', 'Đuôi -al: aldehyde (-CHO); đuôi -oic: axit cacboxylic (-COOH).'] },
      { h: 'Phần đầu chỉ số carbon' },
      { p: 'Met (1C), et (2C), prop (3C), but (4C), pent (5C), hex (6C)... Ghép phần đầu + đuôi để ra tên, ví dụ prop + an = propan.' },
    ],
    examples: [
      { q: 'Bài tập: Gọi tên IUPAC các chất: CH3-CH3, CH2=CH2, CH3-CH2-OH.', a: 'Giải: CH3-CH3 là etan (2C, no, đuôi -an). CH2=CH2 là eten (2C, 1 nối đôi, đuôi -en). CH3-CH2-OH là etanol (2C, có -OH, đuôi -ol).' },
      { q: 'Bài tập: Viết CTCT của propan-1-ol.', a: 'Giải: prop = 3 carbon, -ol = nhóm -OH, vị trí 1 nghĩa là OH ở C số 1: CH3-CH2-CH2-OH.' },
    ],
  },

  'H11HOA-w14-quiz': {
    topic: 'Hydrocarbon no — Ankan',
    intro: 'Các em thân mến, ankan là loại hydrocarbon đơn giản nhất — chỉ có liên kết đơn. Đây là thành phần chính của khí thiên nhiên và xăng dầu.',
    objectives: [
      'Nêu công thức tổng quát và đặc điểm cấu tạo của ankan.',
      'Nêu phản ứng đặc trưng (phản ứng thế).',
      'Viết phản ứng cháy của ankan.',
    ],
    theory: [
      { h: 'Đặc điểm của ankan' },
      { ul: ['Công thức tổng quát: CnH2n+2 (n ≥ 1).', 'Chỉ chứa liên kết đơn (no), bền vững.', 'Ankan đơn giản nhất là metan CH4.'] },
      { h: 'Phản ứng đặc trưng — phản ứng thế' },
      { p: 'Ankan tham gia phản ứng THẾ halogen khi có ánh sáng (cơ chế gốc tự do). Ví dụ: CH4 + Cl2 --as--> CH3Cl + HCl. Có thể thế tiếp tạo CH2Cl2, CHCl3, CCl4.' },
      { h: 'Phản ứng cháy' },
      { p: 'Đốt cháy hoàn toàn ankan: CnH2n+2 + O2 -> CO2 + H2O. Ví dụ CH4 + 2O2 -> CO2 + 2H2O. Khi cháy hoàn toàn luôn có n_H2O > n_CO2.' },
      { note: 'Ankan không làm mất màu dung dịch Br2 (vì không có liên kết bội) — dùng để phân biệt với anken/ankin.' },
    ],
    examples: [
      { q: 'Bài tập: Viết phản ứng metan với chlorine (tỉ lệ 1:1, có ánh sáng).', a: 'Giải: CH4 + Cl2 --ánh sáng--> CH3Cl + HCl (metyl clorua). Đây là phản ứng thế gốc tự do đặc trưng của ankan.' },
      { q: 'Bài tập: Đốt cháy hoàn toàn 0,1 mol C3H8. Tính số mol CO2 và H2O.', a: 'Giải: C3H8 + 5O2 -> 3CO2 + 4H2O. Vậy n_CO2 = 0,1·3 = 0,3 mol; n_H2O = 0,1·4 = 0,4 mol.' },
    ],
  },

  'H11HOA-w15-quiz': {
    topic: 'Gốc ankyl và đồng phân ankan',
    intro: 'Chào các em! Để đặt tên ankan có nhánh, ta cần biết về gốc ankyl. Tuần này ta học gốc ankyl và quy tắc viết đồng phân, đánh số mạch.',
    objectives: [
      'Nêu khái niệm và cách gọi tên gốc ankyl.',
      'Viết được đồng phân của ankan.',
      'Áp dụng quy tắc đánh số mạch chính.',
    ],
    theory: [
      { h: 'Gốc ankyl' },
      { p: 'Gốc ankyl được tạo ra khi loại bớt 1 nguyên tử H khỏi phân tử ankan, công thức -CnH2n+1. Tên gốc = tên ankan đổi đuôi -an thành -yl.' },
      { ul: ['-CH3: metyl.', '-C2H5: etyl.', '-C3H7: propyl.', '-C4H9: butyl.'] },
      { h: 'Đồng phân ankan' },
      { p: 'Từ C4 trở đi ankan có đồng phân mạch carbon (mạch thẳng và mạch nhánh).' },
      { ul: ['C4H10: 2 đồng phân.', 'C5H12: 3 đồng phân (n-pentan, isopentan, neopentan).'] },
      { h: 'Quy tắc đánh số mạch chính' },
      { p: 'Chọn mạch carbon dài nhất làm mạch chính, đánh số từ đầu gần nhánh nhất để tổng vị trí các nhánh là nhỏ nhất.' },
    ],
    examples: [
      { q: 'Bài tập: Viết và gọi tên 3 đồng phân của C5H12.', a: 'Giải: (1) n-pentan CH3-CH2-CH2-CH2-CH3; (2) isopentan = 2-metylbutan (CH3)2CH-CH2-CH3; (3) neopentan = 2,2-đimetylpropan C(CH3)4.' },
      { q: 'Bài tập: Gọi tên CH3-CH(CH3)-CH2-CH3.', a: 'Giải: Mạch chính 4C (butan), nhánh -CH3 (metyl) ở C số 2 -> tên: 2-metylbutan.' },
    ],
  },

  'H11HOA-w16-quiz': {
    topic: 'Hydrocarbon không no — Anken',
    intro: 'Các em ạ, anken có một liên kết đôi C=C, làm cho nó hoạt động hơn ankan rất nhiều. Anken là nguyên liệu quan trọng để sản xuất nhựa.',
    objectives: [
      'Nêu công thức tổng quát và cấu tạo của anken.',
      'Nêu các phản ứng cộng và quy tắc Markovnikov.',
      'Nêu phản ứng trùng hợp tạo polyme.',
    ],
    theory: [
      { h: 'Đặc điểm của anken' },
      { ul: ['Công thức tổng quát: CnH2n (n ≥ 2).', 'Có một liên kết đôi C=C.', 'Anken đơn giản nhất là etilen C2H4.'] },
      { h: 'Phản ứng đặc trưng — phản ứng cộng' },
      { ul: ['Cộng H2 (Ni, t°): C2H4 + H2 -> C2H6.', 'Cộng Br2: làm MẤT MÀU nước brom — dùng nhận biết anken.', 'Cộng H2O (H2SO4): C2H4 + H2O -> C2H5OH.'] },
      { h: 'Quy tắc Markovnikov' },
      { p: 'Khi cộng HX (hoặc H2O) vào anken bất đối xứng, H gắn vào C có NHIỀU H hơn, còn X gắn vào C có ÍT H hơn.' },
      { note: 'Trùng hợp etilen tạo polietilen (PE): n CH2=CH2 -> [-CH2-CH2-]n.' },
    ],
    examples: [
      { q: 'Bài tập: Viết phản ứng propilen (CH3-CH=CH2) cộng HCl theo Markovnikov.', a: 'Giải: H gắn vào C nhiều H (CH2), Cl gắn vào C ít H: CH3-CH=CH2 + HCl -> CH3-CHCl-CH3 (2-clopropan).' },
      { q: 'Bài tập: Làm sao phân biệt etan (C2H6) và etilen (C2H4)?', a: 'Giải: Dùng dung dịch nước brom. Etilen (anken) làm MẤT MÀU nước brom (phản ứng cộng): C2H4 + Br2 -> CH2Br-CH2Br. Etan không phản ứng, không đổi màu.' },
    ],
  },

  'H11HOA-w17-quiz': {
    topic: 'Ankađien và Ankin',
    intro: 'Chào các em! Tuần này ta học các hydrocarbon có nhiều liên kết bội: ankađien (2 nối đôi) và ankin (1 nối ba). Chúng liên quan tới cao su và đèn xì.',
    objectives: [
      'Nêu cấu tạo ankađien, phản ứng tạo cao su.',
      'Nêu công thức và phản ứng đặc trưng của ankin.',
      'Nhận biết ankin đầu mạch bằng AgNO3/NH3.',
    ],
    theory: [
      { h: 'Ankađien' },
      { p: 'Ankađien có hai liên kết đôi C=C, công thức CnH2n-2 (mạch hở). Quan trọng nhất là buta-1,3-đien CH2=CH-CH=CH2 (đien liên hợp).' },
      { ul: ['Trùng hợp buta-1,3-đien -> cao su buna.', 'Trùng hợp isopren -> cao su isopren (giống cao su thiên nhiên).'] },
      { h: 'Ankin' },
      { ul: ['Công thức tổng quát: CnH2n-2 (n ≥ 2), có một liên kết ba C≡C.', 'Ankin đơn giản nhất là axetilen C2H2.', 'Phản ứng cộng: cộng H2, Br2, HX (cộng được 2 lần).'] },
      { h: 'Nhận biết ankin đầu mạch' },
      { note: 'Ankin có liên kết ba ĐẦU MẠCH (HC≡C-) phản ứng với AgNO3/NH3 tạo kết tủa vàng: HC≡CH + 2AgNO3 + 2NH3 -> AgC≡CAg + 2NH4NO3.' },
    ],
    examples: [
      { q: 'Bài tập: Viết phản ứng axetilen với AgNO3/NH3 và nêu ý nghĩa.', a: 'Giải: HC≡CH + 2AgNO3 + 2NH3 -> Ag-C≡C-Ag (kết tủa vàng) + 2NH4NO3. Phản ứng dùng để NHẬN BIẾT ankin có nối ba đầu mạch.' },
      { q: 'Bài tập: Buta-1,3-đien trùng hợp tạo sản phẩm gì? Ứng dụng?', a: 'Giải: n CH2=CH-CH=CH2 -> [-CH2-CH=CH-CH2-]n là cao su buna. Ứng dụng làm cao su tổng hợp (lốp xe, vật liệu đàn hồi).' },
    ],
  },

  'H11HOA-w18-quiz': {
    topic: 'Ôn tập Học kỳ 1',
    intro: 'Các em thân mến, ta ôn lại toàn bộ HK1: cân bằng hoá học, sự điện li - pH, nhóm nitrogen - phosphorus, và đại cương hữu cơ - hydrocarbon cơ bản.',
    objectives: [
      'Hệ thống lại cân bằng hoá học và sự điện li.',
      'Nhắc lại tính chất nhóm nitrogen, carbon.',
      'Tổng hợp đặc điểm các loại hydrocarbon.',
    ],
    theory: [
      { h: 'Cân bằng và điện li' },
      { ul: ['Kc chỉ phụ thuộc nhiệt độ; Le Chatelier dự đoán chiều chuyển dịch.', 'pH = -log[H+]; pH<7 axit, =7 trung tính, >7 bazơ.', 'Chất điện li mạnh phân li hoàn toàn; yếu phân li một phần.'] },
      { h: 'Phi kim quan trọng' },
      { ul: ['HNO3: axit mạnh + oxi hoá mạnh, tác dụng kim loại không cho H2.', 'NH3: bazơ yếu; CO: khí độc; SiO2: bán dẫn ứng dụng vi mạch.'] },
      { h: 'Hydrocarbon' },
      { ul: ['Ankan CnH2n+2: phản ứng thế, không mất màu Br2.', 'Anken CnH2n: phản ứng cộng, làm mất màu Br2.', 'Ankin CnH2n-2: phản ứng cộng; ankin đầu mạch tạo kết tủa với AgNO3/NH3.'] },
      { note: 'Mẹo nhận diện: ankan -> thế; anken/ankin -> cộng và làm mất màu Br2.' },
    ],
    examples: [
      { q: 'Bài tập: Có 3 khí: CH4, C2H4, C2H2. Dùng những thuốc thử nào để phân biệt?', a: 'Giải: Cho qua AgNO3/NH3: C2H2 tạo kết tủa vàng (nhận ra). Hai khí còn lại cho qua nước brom: C2H4 làm mất màu (nhận ra), CH4 không đổi màu.' },
      { q: 'Bài tập: Tính pH dung dịch chứa [H+] = 10^-4 M.', a: 'Giải: pH = -log(10^-4) = 4. Đây là môi trường axit (pH < 7).' },
    ],
  },

  'H11HOA-w19-quiz': {
    topic: 'Hydrocarbon thơm — Benzen',
    intro: 'Chào các em! Mở đầu HK2 là benzen — đại diện của hydrocarbon thơm với vòng 6 carbon đặc biệt bền. Vòng thơm này có hoá tính rất riêng.',
    objectives: [
      'Nêu công thức và cấu tạo vòng benzen.',
      'Nêu phản ứng đặc trưng (phản ứng thế).',
      'Giải thích vì sao benzen không làm mất màu Br2.',
    ],
    theory: [
      { h: 'Cấu tạo benzen' },
      { p: 'Benzen có công thức C6H6, cấu tạo vòng 6 carbon với hệ electron π liên hợp (3 liên kết đôi xen kẽ theo Kekulé). Hệ thơm này rất bền vững.' },
      { h: 'Phản ứng đặc trưng — phản ứng thế' },
      { ul: ['Brom hoá (xúc tác Fe): C6H6 + Br2 -> C6H5Br + HBr.', 'Nitro hoá (HNO3 đặc/H2SO4 đặc): C6H6 + HNO3 -> C6H5NO2 + H2O.'] },
      { note: 'Benzen KHÔNG làm mất màu nước brom ở điều kiện thường (khác anken), do vòng thơm bền nên ưu tiên thế hơn cộng.' },
      { h: 'Phản ứng cộng (khó)' },
      { p: 'Trong điều kiện đặc biệt benzen có thể cộng: C6H6 + 3H2 --Ni, t°--> C6H12 (xiclohexan).' },
    ],
    examples: [
      { q: 'Bài tập: Viết phản ứng benzen với Br2 (xúc tác Fe) và so sánh với anken.', a: 'Giải: C6H6 + Br2 --Fe--> C6H5Br + HBr (phản ứng THẾ). Khác với anken: anken cộng Br2 và làm mất màu nhanh, còn benzen thế và cần xúc tác Fe, không làm mất màu Br2 ở điều kiện thường.' },
      { q: 'Bài tập: Vì sao benzen được gọi là hydrocarbon thơm bền?', a: 'Giải: Vòng benzen có 6 electron π liên hợp tạo hệ electron giải toả đều trên vòng, làm phân tử rất bền. Do đó benzen ưu tiên phản ứng thế (giữ nguyên vòng) hơn phản ứng cộng.' },
    ],
  },

  'H11HOA-w20-quiz': {
    topic: 'Toluen và đồng đẳng benzen',
    intro: 'Các em ạ, khi gắn nhóm thế vào vòng benzen ta được đồng đẳng như toluen, stiren. Nhóm thế ảnh hưởng tới khả năng và vị trí phản ứng tiếp theo.',
    objectives: [
      'Nêu công thức toluen và ảnh hưởng của nhóm -CH3.',
      'Viết phản ứng oxi hoá toluen.',
      'Nêu stiren và phản ứng trùng hợp tạo PS.',
    ],
    theory: [
      { h: 'Toluen (metylbenzen)' },
      { p: 'Toluen có công thức C6H5-CH3. Nhóm -CH3 đẩy electron vào vòng, làm phản ứng thế DỄ hơn benzen và định hướng vào vị trí ortho (o) và para (p).' },
      { h: 'Oxi hoá nhánh' },
      { p: 'Khác benzen, toluen bị KMnO4 nóng oxi hoá nhóm -CH3 thành -COOH: C6H5-CH3 --KMnO4, t°--> C6H5-COOH (axit benzoic).' },
      { h: 'Stiren và polistiren' },
      { ul: ['Stiren (vinylbenzen): C6H5-CH=CH2 — có nối đôi ngoài vòng nên làm mất màu Br2.', 'Trùng hợp stiren -> polistiren (PS): n C6H5-CH=CH2 -> [-CH2-CH(C6H5)-]n.'] },
      { note: 'TNT (2,4,6-trinitrotoluen) là thuốc nổ, điều chế bằng nitro hoá toluen.' },
    ],
    examples: [
      { q: 'Bài tập: Viết phản ứng oxi hoá toluen bằng KMnO4 (nóng). Benzen có phản ứng tương tự không?', a: 'Giải: C6H5-CH3 + KMnO4 (t°) -> C6H5-COOH (axit benzoic) + ... Benzen KHÔNG bị oxi hoá bởi KMnO4 vì không có nhánh -CH3. Đây là cách phân biệt toluen với benzen.' },
      { q: 'Bài tập: Stiren và benzen, chất nào làm mất màu nước brom?', a: 'Giải: Stiren (C6H5-CH=CH2) làm MẤT MÀU nước brom vì có nối đôi C=C ngoài vòng (phản ứng cộng). Benzen không làm mất màu.' },
    ],
  },

  'H11HOA-w21-quiz': {
    topic: 'Dẫn xuất halogen',
    intro: 'Chào các em! Khi thay một nguyên tử H trong hydrocarbon bằng halogen (Cl, Br...) ta được dẫn xuất halogen. Đây là cầu nối để tổng hợp nhiều chất hữu cơ.',
    objectives: [
      'Nêu công thức tổng quát dẫn xuất halogen.',
      'Viết phản ứng thuỷ phân và phản ứng tách.',
      'Nêu một số dẫn xuất quan trọng (vinyl clorua, teflon).',
    ],
    theory: [
      { h: 'Khái niệm' },
      { p: 'Dẫn xuất halogen có công thức tổng quát R-X (X = F, Cl, Br, I), trong đó X thay thế một nguyên tử H của hydrocarbon. Ví dụ CH3Cl (metyl clorua).' },
      { h: 'Phản ứng thuỷ phân (thế)' },
      { p: 'Đun với dung dịch NaOH: R-X + NaOH --t°--> R-OH + NaX. Ví dụ C2H5Cl + NaOH -> C2H5OH + NaCl.' },
      { h: 'Phản ứng tách (tạo anken)' },
      { p: 'Đun với KOH trong ancol, R-X tách HX tạo anken. Ví dụ CH3-CH2Cl + KOH --ancol, t°--> CH2=CH2 + KCl + H2O.' },
      { h: 'Dẫn xuất quan trọng' },
      { ul: ['Vinyl clorua CH2=CHCl: trùng hợp tạo PVC.', 'Tetrafluoroetilen CF2=CF2: trùng hợp tạo teflon (PTFE) — chống dính.'] },
    ],
    examples: [
      { q: 'Bài tập: Viết phản ứng C2H5Cl với dung dịch NaOH (đun nóng).', a: 'Giải: C2H5Cl + NaOH --t°--> C2H5OH + NaCl. Đây là phản ứng thuỷ phân (thế nhóm -Cl bằng -OH) tạo ancol.' },
      { q: 'Bài tập: Đun C2H5Cl với KOH trong ancol tạo sản phẩm gì?', a: 'Giải: Xảy ra phản ứng TÁCH HCl: CH3-CH2Cl + KOH --ancol, t°--> CH2=CH2 + KCl + H2O. Sản phẩm là etilen (anken).' },
    ],
  },

  'H11HOA-w22-quiz': {
    topic: 'Ancol — Cấu tạo, danh pháp, tính chất',
    intro: 'Các em thân mến, ancol có nhóm -OH gắn vào carbon no. Đây là một trong những nhóm chức quan trọng nhất, có trong rượu, dung môi và nhiên liệu.',
    objectives: [
      'Nêu nhóm chức và công thức ancol no đơn chức.',
      'Viết phản ứng của ancol với Na.',
      'Phân biệt oxi hoá ancol bậc 1 và bậc 2.',
    ],
    theory: [
      { h: 'Khái niệm và công thức' },
      { ul: ['Nhóm chức ancol: -OH gắn vào carbon no.', 'Ancol no đơn chức: CnH2n+1-OH (n ≥ 1).', 'Etanol C2H5OH (rượu etylic) là ancol phổ biến nhất.'] },
      { h: 'Phản ứng với kim loại kiềm' },
      { p: 'Ancol phản ứng với Na giải phóng H2 (tính axit rất yếu của -OH): 2C2H5OH + 2Na -> 2C2H5ONa + H2.' },
      { h: 'Phản ứng oxi hoá' },
      { ul: ['Ancol bậc 1 (R-CH2OH) oxi hoá -> aldehyde (R-CHO), rồi tiếp -> axit (R-COOH).', 'Ancol bậc 2 (R-CHOH-R\') oxi hoá -> ketone (R-CO-R\').', 'Ancol bậc 3 khó bị oxi hoá.'] },
      { note: 'Ancol KHÔNG phản ứng với NaOH (khác phenol).' },
    ],
    examples: [
      { q: 'Bài tập: Viết phản ứng etanol với natri. Tính thể tích H2 (đktc) khi 0,2 mol etanol phản ứng hết.', a: 'Giải: 2C2H5OH + 2Na -> 2C2H5ONa + H2. Cứ 2 mol ancol tạo 1 mol H2, nên 0,2 mol ancol -> 0,1 mol H2 -> V = 0,1·22,4 = 2,24 lít.' },
      { q: 'Bài tập: Oxi hoá nhẹ propan-1-ol và propan-2-ol cho sản phẩm gì?', a: 'Giải: Propan-1-ol (bậc 1) CH3-CH2-CH2OH -> CH3-CH2-CHO (aldehyde). Propan-2-ol (bậc 2) CH3-CHOH-CH3 -> CH3-CO-CH3 (axeton, một ketone).' },
    ],
  },

  'H11HOA-w23-quiz': {
    topic: 'Phenol',
    intro: 'Chào các em! Phenol cũng có nhóm -OH nhưng gắn trực tiếp vào vòng benzen, khiến nó có tính chất khác hẳn ancol. Cùng so sánh nhé.',
    objectives: [
      'Nêu công thức và tính axit yếu của phenol.',
      'So sánh phenol với ancol.',
      'Viết phản ứng đặc trưng của phenol với Br2.',
    ],
    theory: [
      { h: 'Cấu tạo phenol' },
      { p: 'Phenol có công thức C6H5-OH, nhóm -OH gắn TRỰC TIẾP vào vòng benzen. Sự liên hợp với vòng làm tăng tính axit của -OH.' },
      { h: 'Tính axit yếu' },
      { ul: ['Phenol có tính axit yếu (Ka ≈ 10^-10), mạnh hơn ancol nhưng yếu hơn axit cacbonic.', 'Phenol + NaOH -> C6H5ONa + H2O (ancol KHÔNG phản ứng với NaOH — điểm khác biệt).', 'Phenol + Na -> C6H5ONa + ½H2.'] },
      { h: 'Phản ứng thế ở vòng' },
      { p: 'Nhóm -OH hoạt hoá vòng mạnh, phenol phản ứng với nước brom tạo kết tủa trắng 2,4,6-tribromphenol: C6H5OH + 3Br2 -> C6H2Br3OH (kết tủa trắng) + 3HBr.' },
      { note: 'Phản ứng với Br2 tạo kết tủa trắng dùng để NHẬN BIẾT phenol. Phenol dùng sản xuất nhựa phenol-fomandehit (bakelite), dược phẩm.' },
    ],
    examples: [
      { q: 'Bài tập: Cho phenol và etanol, dùng NaOH để phân biệt như thế nào?', a: 'Giải: Phenol phản ứng với NaOH tạo dung dịch trong suốt (C6H5OH + NaOH -> C6H5ONa + H2O), còn etanol KHÔNG phản ứng. Vậy chất tan ra trong NaOH là phenol.' },
      { q: 'Bài tập: Viết phản ứng phenol với dung dịch brom và nêu hiện tượng.', a: 'Giải: C6H5OH + 3Br2 -> C6H2Br3OH (2,4,6-tribromphenol) + 3HBr. Hiện tượng: xuất hiện kết tủa TRẮNG — dùng nhận biết phenol.' },
    ],
  },

  'H11HOA-w24-quiz': {
    topic: 'Aldehyde và Ketone',
    intro: 'Các em ạ, aldehyde và ketone đều chứa nhóm carbonyl C=O nhưng ở vị trí khác nhau. Khác biệt nhỏ này dẫn tới hoá tính rất khác — đặc biệt là phản ứng tráng bạc.',
    objectives: [
      'Phân biệt nhóm chức aldehyde và ketone.',
      'Nêu phản ứng tráng bạc của aldehyde.',
      'Viết phản ứng khử aldehyde thành ancol.',
    ],
    theory: [
      { h: 'Nhóm chức' },
      { ul: ['Aldehyde: nhóm -CHO ở đầu mạch (R-CHO). Ví dụ HCHO (metanal), CH3CHO (etanal).', 'Ketone: nhóm carbonyl -CO- ở giữa mạch (R-CO-R\'). Ví dụ CH3-CO-CH3 (axeton).'] },
      { h: 'Phản ứng tráng bạc (Tollens)' },
      { p: 'Aldehyde + AgNO3/NH3 -> tạo kết tủa Ag (bạc) bám thành ống nghiệm như gương: R-CHO + 2AgNO3 + 3NH3 + H2O -> R-COONH4 + 2Ag + 2NH4NO3.' },
      { note: 'Ketone KHÔNG có phản ứng tráng bạc (vì không có H gắn trực tiếp vào nhóm C=O kiểu -CHO). Đây là cách phân biệt aldehyde với ketone.' },
      { h: 'Phản ứng khử' },
      { p: 'Aldehyde + H2 (Ni, t°) -> ancol bậc 1: R-CHO + H2 -> R-CH2OH. Ketone + H2 -> ancol bậc 2.' },
    ],
    examples: [
      { q: 'Bài tập: Cho CH3CHO và CH3-CO-CH3, dùng thuốc thử nào để phân biệt?', a: 'Giải: Dùng thuốc thử Tollens (AgNO3/NH3). CH3CHO (aldehyde) tạo kết tủa Ag (tráng gương). CH3-CO-CH3 (axeton, ketone) KHÔNG phản ứng. Vậy chất tráng bạc là aldehyde.' },
      { q: 'Bài tập: Khử CH3CHO bằng H2 (Ni) tạo sản phẩm gì?', a: 'Giải: CH3CHO + H2 --Ni, t°--> CH3CH2OH (etanol). Aldehyde bị khử thành ancol bậc 1.' },
    ],
  },

  'H11HOA-w25-quiz': {
    topic: 'Axit cacboxylic — Cấu tạo và tính chất',
    intro: 'Chào các em! Axit cacboxylic chứa nhóm -COOH, là axit hữu cơ điển hình — giấm ăn chính là dung dịch axit axetic. Cùng tìm hiểu tính chất nhé.',
    objectives: [
      'Nêu nhóm chức và một số axit thường gặp.',
      'Viết phản ứng thể hiện tính axit.',
      'Viết phản ứng este hoá.',
    ],
    theory: [
      { h: 'Khái niệm' },
      { ul: ['Nhóm chức axit cacboxylic: -COOH.', 'HCOOH (axit fomic/metanoic), CH3COOH (axit axetic — giấm ăn).'] },
      { h: 'Tính axit' },
      { ul: ['Đổi màu quỳ tím sang đỏ (axit yếu nhưng đủ làm đỏ quỳ).', 'Tác dụng kim loại: 2CH3COOH + 2Na -> 2CH3COONa + H2.', 'Tác dụng bazơ: CH3COOH + NaOH -> CH3COONa + H2O.', 'Tác dụng muối carbonate (sủi CO2): CH3COOH + NaHCO3 -> CH3COONa + CO2 + H2O.'] },
      { h: 'Phản ứng este hoá' },
      { p: 'Axit + ancol (xúc tác H2SO4 đặc) tạo este và nước (phản ứng thuận nghịch): CH3COOH + C2H5OH ⇌ CH3COOC2H5 + H2O.' },
      { note: 'H2SO4 đặc vừa là xúc tác vừa hút nước, giúp cân bằng dịch về phía tạo este.' },
    ],
    examples: [
      { q: 'Bài tập: Viết phản ứng axit axetic với NaHCO3 và nêu hiện tượng.', a: 'Giải: CH3COOH + NaHCO3 -> CH3COONa + CO2 + H2O. Hiện tượng: sủi bọt khí CO2. Phản ứng dùng nhận biết axit cacboxylic.' },
      { q: 'Bài tập: Viết phản ứng este hoá giữa axit axetic và etanol.', a: 'Giải: CH3COOH + C2H5OH --H2SO4 đặc, t°--> CH3COOC2H5 (etyl axetat) + H2O. Phản ứng thuận nghịch nên cần H2SO4 đặc để tăng hiệu suất.' },
    ],
  },

  'H11HOA-w26-quiz': {
    topic: 'So sánh tính axit và phản ứng nhận biết',
    intro: 'Các em thân mến, tuần này ta tổng kết cách so sánh độ mạnh axit hữu cơ và hệ thống các thuốc thử nhận biết những nhóm chức đã học.',
    objectives: [
      'So sánh tính axit trong dãy đồng đẳng.',
      'Chọn thuốc thử nhận biết ancol, phenol, aldehyde, axit.',
      'Lập sơ đồ nhận biết hợp chất hữu cơ.',
    ],
    theory: [
      { h: 'So sánh tính axit' },
      { p: 'Trong dãy đồng đẳng axit cacboxylic, gốc carbon càng dài (đẩy electron càng mạnh) thì tính axit càng yếu: HCOOH > CH3COOH > C2H5COOH.' },
      { h: 'Thuốc thử nhận biết' },
      { ul: ['Ancol: Na (sủi bọt H2), không phản ứng NaOH.', 'Phenol: dung dịch Br2 tạo kết tủa trắng; phản ứng được với NaOH.', 'Aldehyde: AgNO3/NH3 tạo kết tủa Ag (tráng gương).', 'Axit cacboxylic: quỳ tím hoá đỏ; NaHCO3 sủi khí CO2.'] },
      { note: 'Anken/ankin: làm mất màu nước brom; riêng ankin đầu mạch còn tạo kết tủa với AgNO3/NH3.' },
      { h: 'Mẹo ghi nhớ' },
      { p: 'Tráng bạc -> aldehyde. Sủi CO2 với NaHCO3 -> axit. Kết tủa trắng với Br2 -> phenol. Sủi H2 với Na nhưng trơ với NaOH -> ancol.' },
    ],
    examples: [
      { q: 'Bài tập: Sắp xếp theo chiều tăng tính axit: C2H5COOH, HCOOH, CH3COOH.', a: 'Giải: Gốc càng dài -> axit càng yếu. Vậy chiều tăng tính axit: C2H5COOH < CH3COOH < HCOOH.' },
      { q: 'Bài tập: Phân biệt 3 chất lỏng: etanol, axit axetic, phenol bằng thuốc thử đơn giản.', a: 'Giải: Dùng quỳ tím: axit axetic làm đỏ quỳ (nhận ra). Hai chất còn lại cho tác dụng dung dịch Br2: phenol tạo kết tủa trắng (nhận ra), etanol không phản ứng.' },
    ],
  },

  'H11HOA-w27-quiz': {
    topic: 'Bài tập đốt cháy hợp chất hữu cơ',
    intro: 'Chào các em! Phản ứng cháy là chìa khoá để giải bài toán hữu cơ. Tuần này ta học cách dựa vào tỉ lệ n_CO2 và n_H2O để xác định loại hợp chất.',
    objectives: [
      'Viết phương trình cháy của các hydrocarbon.',
      'Dùng quan hệ n_CO2 và n_H2O để nhận diện loại chất.',
      'Tính số mol sản phẩm cháy.',
    ],
    theory: [
      { h: 'Quan hệ n_CO2 và n_H2O' },
      { ul: ['Ankan (CnH2n+2): n_H2O > n_CO2; và n_ankan = n_H2O - n_CO2.', 'Anken (CnH2n): n_H2O = n_CO2.', 'Ankin/ankađien (CnH2n-2): n_CO2 > n_H2O.'] },
      { h: 'Sơ đồ cháy tổng quát' },
      { p: 'CxHy + (x + y/4) O2 -> x CO2 + (y/2) H2O. Số mol CO2 = x · n_chất; số mol H2O = (y/2) · n_chất.' },
      { note: 'Nếu đốt một hydrocarbon thu n_CO2 = n_H2O thì đó là anken (hoặc chất có CTPT dạng CnH2n).' },
      { h: 'Bảo toàn nguyên tố' },
      { p: 'Số mol C trong hợp chất = n_CO2; số mol H = 2·n_H2O. Đây là cơ sở để lập công thức phân tử.' },
    ],
    examples: [
      { q: 'Bài tập: Đốt cháy hoàn toàn 0,1 mol C2H4. Tính n_CO2 và n_H2O.', a: 'Giải: C2H4 + 3O2 -> 2CO2 + 2H2O. n_CO2 = 0,1·2 = 0,2 mol; n_H2O = 0,1·2 = 0,2 mol. Lưu ý n_CO2 = n_H2O đặc trưng cho anken.' },
      { q: 'Bài tập: Đốt một hydrocarbon X thu được 0,3 mol CO2 và 0,4 mol H2O. X thuộc loại nào? Tìm n_X.', a: 'Giải: n_H2O > n_CO2 -> X là ankan. n_X = n_H2O - n_CO2 = 0,4 - 0,3 = 0,1 mol. Số C = n_CO2/n_X = 3 -> X là C3H8 (propan).' },
    ],
  },

  'H11HOA-w28-quiz': {
    topic: 'Bài tập điện li và pH',
    intro: 'Các em ạ, tuần này ta luyện kỹ năng tính pH cho axit/bazơ mạnh và bài toán trộn dung dịch trung hoà. Nhớ luôn dùng pH + pOH = 14.',
    objectives: [
      'Tính pH của axit/bazơ mạnh.',
      'Giải bài toán trộn dung dịch axit - bazơ.',
      'Nhớ quan hệ pH + pOH = 14.',
    ],
    theory: [
      { h: 'Công thức cốt lõi' },
      { ul: ['pH = -log[H+]; pOH = -log[OH-]; pH + pOH = 14 (ở 25°C).', 'Axit mạnh: [H+] = nồng độ axit. Bazơ mạnh: [OH-] = nồng độ bazơ.'] },
      { h: 'Bài toán trộn axit - bazơ' },
      { p: 'Tính số mol H+ và OH-, cho phản ứng trung hoà H+ + OH- -> H2O. So sánh số mol dư để tìm môi trường, rồi tính lại nồng độ trong tổng thể tích.' },
      { ul: ['Nếu n(H+) = n(OH-): trung hoà vừa đủ, pH = 7.', 'Nếu H+ dư: tính lại [H+] = n_dư/V_tổng -> pH.', 'Nếu OH- dư: tính [OH-] -> pOH -> pH.'] },
      { note: 'Nước cất tinh khiết có pH = 7. Axit yếu cùng nồng độ luôn cho pH lớn hơn axit mạnh.' },
    ],
    examples: [
      { q: 'Bài tập: Tính pH dung dịch NaOH 0,01M.', a: 'Giải: NaOH mạnh: [OH-] = 0,01 = 10^-2 -> pOH = 2. pH = 14 - pOH = 14 - 2 = 12 (môi trường bazơ).' },
      { q: 'Bài tập: Trộn 100 mL HCl 0,1M với 100 mL NaOH 0,1M. Tính pH.', a: 'Giải: n(H+) = 0,1·0,1 = 0,01 mol; n(OH-) = 0,1·0,1 = 0,01 mol. Trung hoà vừa đủ (H+ + OH- -> H2O), không dư -> dung dịch trung tính, pH = 7.' },
    ],
  },

  'H11HOA-w29-quiz': {
    topic: 'Bài tập anken và ankin',
    intro: 'Chào các em! Tuần này ta luyện các phản ứng cộng của anken, ankin — cộng halogen, cộng nước, cộng hydro — và nhận biết ankin đầu mạch.',
    objectives: [
      'Viết phản ứng cộng Br2, HX, H2O của anken.',
      'Viết phản ứng cộng và nhận biết ankin.',
      'Nắm phản ứng trùng hợp tạo polyme.',
    ],
    theory: [
      { h: 'Phản ứng cộng của anken' },
      { ul: ['Cộng Br2: C2H4 + Br2 -> CH2Br-CH2Br (làm mất màu).', 'Cộng HX (Markovnikov): CH3-CH=CH2 + HCl -> CH3-CHCl-CH3.', 'Cộng H2O (H2SO4): C2H4 + H2O -> C2H5OH (hidrat hoá).'] },
      { h: 'Phản ứng của ankin' },
      { ul: ['Cộng H2 hoàn toàn: C2H2 + 2H2 --Ni--> C2H6.', 'Cộng có chọn lọc (Pd/PbCO3): C2H2 + H2 -> C2H4.', 'Nhận biết ankin đầu mạch: tạo kết tủa vàng với AgNO3/NH3.'] },
      { h: 'Trùng hợp' },
      { p: 'Etilen trùng hợp tạo PE; vinyl clorua tạo PVC; stiren tạo PS; buta-1,3-đien tạo cao su buna.' },
    ],
    examples: [
      { q: 'Bài tập: Viết phản ứng axetilen cộng hết hydro (Ni) và axetilen với AgNO3/NH3.', a: 'Giải: Cộng H2: C2H2 + 2H2 --Ni, t°--> C2H6 (etan). Với AgNO3/NH3: HC≡CH + 2AgNO3 + 2NH3 -> Ag-C≡C-Ag (kết tủa vàng) + 2NH4NO3 (nhận biết ankin đầu mạch).' },
      { q: 'Bài tập: Cho propilen tác dụng nước (H2SO4) theo Markovnikov, viết sản phẩm chính.', a: 'Giải: CH3-CH=CH2 + H2O -> CH3-CHOH-CH3 (propan-2-ol). H gắn vào C nhiều H, OH gắn vào C ít H (Markovnikov).' },
    ],
  },

  'H11HOA-w30-quiz': {
    topic: 'Bài tập ancol - phenol',
    intro: 'Các em thân mến, tuần này ta luyện các phản ứng của ancol và phenol, đặc biệt phân biệt hai chất qua khả năng phản ứng với NaOH.',
    objectives: [
      'Viết phản ứng của ancol với Na, CuO.',
      'Viết phản ứng phenol với Na, NaOH, Br2.',
      'Phân biệt ancol đa chức.',
    ],
    theory: [
      { h: 'Phản ứng của ancol' },
      { ul: ['Với Na: 2C2H5OH + 2Na -> 2C2H5ONa + H2.', 'Với CuO (oxi hoá ancol bậc 1): C2H5OH + CuO --t°--> CH3CHO + Cu + H2O.'] },
      { h: 'Phản ứng của phenol' },
      { ul: ['Với Na: C6H5OH + Na -> C6H5ONa + ½H2.', 'Với NaOH: C6H5OH + NaOH -> C6H5ONa + H2O (ancol KHÔNG phản ứng NaOH).', 'Với Br2: tạo kết tủa trắng 2,4,6-tribromphenol.'] },
      { h: 'Ancol đa chức' },
      { p: 'Glixerol C3H5(OH)3 là ancol có 3 nhóm -OH; hoà tan Cu(OH)2 tạo dung dịch xanh lam (nhận biết ancol đa chức có -OH liền kề).' },
      { note: 'Điểm phân biệt then chốt: ancol KHÔNG phản ứng NaOH, phenol thì CÓ.' },
    ],
    examples: [
      { q: 'Bài tập: Viết phản ứng oxi hoá etanol bằng CuO.', a: 'Giải: C2H5OH + CuO --t°--> CH3CHO + Cu + H2O. Ancol bậc 1 bị oxi hoá thành aldehyde; CuO đen chuyển thành Cu đỏ.' },
      { q: 'Bài tập: Cho etanol và phenol tác dụng lần lượt với Na và NaOH. Nhận xét.', a: 'Giải: Cả hai đều phản ứng với Na giải phóng H2 (đều có -OH). Nhưng chỉ PHENOL phản ứng với NaOH (C6H5OH + NaOH -> C6H5ONa + H2O), còn etanol không. Đó là cách phân biệt.' },
    ],
  },

  'H11HOA-w31-quiz': {
    topic: 'Bài tập aldehyde - axit cacboxylic',
    intro: 'Chào các em! Tuần này ta luyện bài toán tráng bạc và phản ứng của axit cacboxylic. Đặc biệt chú ý trường hợp HCHO và HCOOH.',
    objectives: [
      'Tính tỉ lệ mol trong phản ứng tráng bạc.',
      'Viết phản ứng của axit với NaHCO3, este hoá.',
      'Nhận biết axit fomic (vừa axit vừa aldehyde).',
    ],
    theory: [
      { h: 'Phản ứng tráng bạc' },
      { ul: ['Aldehyde thường R-CHO: 1 nhóm -CHO -> 2 Ag.', 'HCHO (đặc biệt): có thể bị oxi hoá 2 lần -> tạo 4 Ag (tỉ lệ HCHO : Ag = 1 : 4).', 'HCOOH có nhóm -CHO trong cấu trúc nên cũng tráng bạc được.'] },
      { h: 'Phản ứng của axit cacboxylic' },
      { ul: ['Với NaHCO3: CH3COOH + NaHCO3 -> CH3COONa + CO2 + H2O (sủi khí).', 'Este hoá: CH3COOH + C2H5OH ⇌ CH3COOC2H5 + H2O.'] },
      { note: 'Giấm ăn chứa khoảng 5% axit axetic. Axit fomic HCOOH vừa có tính axit vừa tráng bạc được.' },
      { h: 'Lưu ý khi giải bài tráng bạc' },
      { p: 'Mỗi nhóm -CHO thường cho 2 Ag. Riêng HCHO cho 4 Ag và HCOOH cho 2 Ag (do còn nhóm -CHO trong cấu trúc). Dựa vào tỉ lệ Ag thu được có thể suy ngược ra loại aldehyde.' },
    ],
    examples: [
      { q: 'Bài tập: Cho 0,1 mol HCHO tác dụng AgNO3/NH3 dư. Tính số mol Ag tạo thành.', a: 'Giải: HCHO tạo tỉ lệ 1 : 4 với Ag (oxi hoá 2 nấc lên CO2). n_Ag = 0,1·4 = 0,4 mol.' },
      { q: 'Bài tập: Viết phản ứng este hoá giữa axit axetic và etanol, gọi tên sản phẩm.', a: 'Giải: CH3COOH + C2H5OH --H2SO4 đặc--> CH3COOC2H5 + H2O. Sản phẩm là etyl axetat (mùi thơm, dùng làm dung môi).' },
    ],
  },

  'H11HOA-w32-quiz': {
    topic: 'Tổng hợp chuỗi phản ứng hữu cơ',
    intro: 'Các em ạ, kỹ năng quan trọng của hoá hữu cơ là viết chuỗi chuyển hoá. Tuần này ta nối các chất từ metan đến este qua các phản ứng đã học.',
    objectives: [
      'Viết chuỗi chuyển hoá CH4 -> C2H2 -> C2H4 -> C2H5OH.',
      'Nêu phương pháp cho mỗi mũi tên.',
      'Hoàn thành chuỗi tới axit và este.',
    ],
    theory: [
      { h: 'Chuỗi điều chế cơ bản' },
      { ul: ['CH4 -> C2H2: nhiệt phân 1500°C, làm lạnh nhanh: 2CH4 -> C2H2 + 3H2.', 'C2H2 -> C2H4: cộng H2 chọn lọc (Pd/PbCO3): C2H2 + H2 -> C2H4.', 'C2H4 -> C2H5OH: cộng nước (H2SO4): C2H4 + H2O -> C2H5OH.'] },
      { h: 'Tiếp tục oxi hoá' },
      { ul: ['C2H5OH -> CH3CHO: oxi hoá bằng CuO/O2 (ancol bậc 1 -> aldehyde).', 'CH3CHO -> CH3COOH: oxi hoá tiếp (O2, xúc tác).'] },
      { h: 'Tạo este' },
      { p: 'CH3COOH + C2H5OH ⇌ CH3COOC2H5 + H2O (este hoá, xúc tác H2SO4 đặc).' },
      { note: 'Ghi nhớ trình tự oxi hoá: ancol bậc 1 -> aldehyde -> axit cacboxylic.' },
    ],
    examples: [
      { q: 'Bài tập: Viết các phương trình của chuỗi: C2H4 -> C2H5OH -> CH3CHO -> CH3COOH.', a: 'Giải: (1) C2H4 + H2O --H2SO4--> C2H5OH. (2) C2H5OH + CuO --t°--> CH3CHO + Cu + H2O. (3) 2CH3CHO + O2 --xt--> 2CH3COOH.' },
      { q: 'Bài tập: Từ CH4 viết phản ứng điều chế C2H2.', a: 'Giải: 2CH4 --1500°C, làm lạnh nhanh--> C2H2 + 3H2. Đây là phương pháp nhiệt phân metan để điều chế axetilen.' },
    ],
  },

  'H11HOA-w33-quiz': {
    topic: 'Ôn tập hoá hữu cơ Học kỳ 2',
    intro: 'Chào các em! Ta hệ thống lại toàn bộ phần hữu cơ HK2: benzen, dẫn xuất halogen, ancol - phenol, aldehyde - ketone và axit cacboxylic.',
    objectives: [
      'Hệ thống phản ứng đặc trưng từng nhóm chức.',
      'Nhắc lại các phản ứng nhận biết.',
      'Ôn quy trình oxi hoá ancol.',
    ],
    theory: [
      { h: 'Hydrocarbon thơm' },
      { ul: ['Benzen: phản ứng thế (brom hoá, nitro hoá), không mất màu Br2.', 'Toluen: bị KMnO4 oxi hoá nhánh -> axit benzoic.'] },
      { h: 'Nhóm chức và phản ứng đặc trưng' },
      { ul: ['Ancol bậc 1 -> aldehyde -> axit; ancol bậc 2 -> ketone.', 'Phenol: axit yếu, phản ứng NaOH, tạo kết tủa trắng với Br2.', 'Aldehyde: tráng bạc với AgNO3/NH3.', 'Axit cacboxylic: làm đỏ quỳ, sủi CO2 với NaHCO3.'] },
      { h: 'Bảng nhận biết nhanh' },
      { p: 'Tráng bạc -> aldehyde. Sủi CO2 (NaHCO3) -> axit. Kết tủa trắng (Br2) -> phenol. Mất màu Br2 -> anken/ankin. Tan trong NaOH -> phenol/axit (không phải ancol).' },
    ],
    examples: [
      { q: 'Bài tập: Sản phẩm oxi hoá ancol bậc 1 và bậc 2 khác nhau thế nào?', a: 'Giải: Ancol bậc 1 (R-CH2OH) oxi hoá -> aldehyde (R-CHO) rồi axit (R-COOH). Ancol bậc 2 (R-CHOH-R\') oxi hoá -> ketone (R-CO-R\').' },
      { q: 'Bài tập: Có 4 lọ mất nhãn: etanol, phenol, axit axetic, andehit axetic. Nêu cách nhận biết.', a: 'Giải: Quỳ tím: axit axetic làm đỏ. AgNO3/NH3: andehit axetic tráng bạc. Dung dịch Br2: phenol kết tủa trắng. Còn lại là etanol.' },
    ],
  },

  'H11HOA-w34-quiz': {
    topic: 'Bài tập định lượng tổng hợp',
    intro: 'Các em thân mến, tuần này ta luyện tổng hợp các dạng tính toán: đốt cháy, phản ứng với Na, tỉ khối hơi và khối lượng mol.',
    objectives: [
      'Tính sản phẩm đốt cháy ancol.',
      'Tính thể tích H2 từ phản ứng với Na.',
      'Tính tỉ khối hơi và khối lượng mol.',
    ],
    theory: [
      { h: 'Đốt cháy ancol' },
      { p: 'Ví dụ C2H5OH + 3O2 -> 2CO2 + 3H2O. Từ số mol ancol suy ra số mol CO2 (×2) và H2O (×3).' },
      { h: 'Phản ứng với Na' },
      { ul: ['Ancol: 2ROH + 2Na -> 2RONa + H2 (cứ 1 nhóm -OH -> ½ mol H2).', 'Axit: 2RCOOH + 2Na -> 2RCOONa + H2 (cứ 1 nhóm -COOH -> ½ mol H2).'] },
      { h: 'Tỉ khối hơi và khối lượng mol' },
      { p: 'Tỉ khối hơi của khí A so với khí B: d(A/B) = M(A)/M(B). Khối lượng: m = n · M. Ở đktc, V = n · 22,4 (lít).' },
      { note: 'Nhớ M một số chất: CH3COOH = 60; C2H5OH = 46; C2H4 = 28; H2 = 2.' },
    ],
    examples: [
      { q: 'Bài tập: Cho 4,6 g Na vào etanol dư. Tính thể tích H2 (đktc).', a: 'Giải: n_Na = 4,6/23 = 0,2 mol. Phản ứng 2C2H5OH + 2Na -> 2C2H5ONa + H2 nên n_H2 = n_Na/2 = 0,1 mol. V = 0,1·22,4 = 2,24 lít.' },
      { q: 'Bài tập: Tính tỉ khối hơi của etilen so với H2.', a: 'Giải: M(C2H4) = 28, M(H2) = 2. d(C2H4/H2) = 28/2 = 14.' },
    ],
  },

  'H11HOA-w35-quiz': {
    topic: 'Thi học kỳ — Tổng ôn cả năm',
    intro: 'Các em ạ, tuần cuối ta tổng ôn cả năm: từ cân bằng - điện li (vô cơ) đến hydrocarbon và dẫn xuất (hữu cơ). Chúc các em ôn tập tốt và thi đạt kết quả cao!',
    objectives: [
      'Tổng hợp kiến thức cân bằng, điện li, pH.',
      'Hệ thống tính chất hydrocarbon và nhóm chức.',
      'Vận dụng vào bài tập tổng hợp.',
    ],
    theory: [
      { h: 'Phần vô cơ và lý thuyết chung' },
      { ul: ['Le Chatelier: tăng nhiệt độ phản ứng toả nhiệt -> cân bằng dịch theo chiều nghịch.', 'pH: NaOH 0,1M có pOH = 1 nên pH = 13.', 'HNO3: axit mạnh + oxi hoá mạnh.'] },
      { h: 'Phần hữu cơ' },
      { ul: ['Benzen + Br2 (Fe): phản ứng thế ở vòng.', 'Ancol bậc 1 oxi hoá nhẹ -> aldehyde.', 'Este hoá cần H2SO4 đặc làm xúc tác và hút nước.'] },
      { h: 'Nhận biết tổng hợp' },
      { p: 'HCOOH khác CH3COOH ở chỗ HCOOH còn tráng bạc được (có nhóm -CHO). Aldehyde tráng bạc; axit sủi CO2 với NaHCO3; phenol kết tủa trắng với Br2.' },
      { note: 'Ôn kỹ chuỗi oxi hoá: ancol bậc 1 -> aldehyde -> axit -> este hoá với ancol.' },
    ],
    examples: [
      { q: 'Bài tập: Tính pH dung dịch NaOH 0,1M.', a: 'Giải: NaOH mạnh: [OH-] = 0,1 = 10^-1 -> pOH = 1. pH = 14 - 1 = 13.' },
      { q: 'Bài tập: Phân biệt HCOOH và CH3COOH bằng một thuốc thử.', a: 'Giải: Dùng AgNO3/NH3 (Tollens). HCOOH có nhóm -CHO nên TRÁNG BẠC (tạo kết tủa Ag); CH3COOH không tráng bạc. Vậy chất cho kết tủa bạc là HCOOH.' },
    ],
  },

  'H11HOA-w36-quiz': {
    topic: 'Kết thúc Hoá Học 11 — Hữu cơ và bước ngoặt lớp 12',
    intro: 'Lớp 11 là năm học trọng tâm nhất của hoá học hữu cơ trong cả bậc THPT. Hôm nay chúng ta hệ thống lại toàn bộ kiến thức, nhận diện những mạch nối với lớp 12, và sẵn sàng tiếp tục hành trình khám phá thế giới phân tử.',
    objectives: [
      'Hệ thống hoá các nhóm chất hữu cơ đã học: hydrocarbon, ancol, phenol, aldehyde, axit, este.',
      'Nắm vững chuỗi phản ứng hoá học quan trọng và phương pháp nhận biết các chất.',
      'Hiểu những chủ đề lớp 12 sẽ kế thừa và nâng cao từ nền tảng lớp 11.',
    ],
    theory: [
      { h: 'Bức tranh hoá hữu cơ lớp 11' },
      { ul: [
        'Hydrocarbon: ankan (chuỗi no), anken (liên kết đôi C=C), ankin (liên kết ba), benzen và đồng đẳng.',
        'Dẫn xuất oxygen: ancol (–OH), phenol (–OH ở vòng thơm), aldehyde (–CHO), xeton (–CO–), axit carboxylic (–COOH), este (–COO–).',
        'Phản ứng đặc trưng: tráng bạc (aldehyde, HCOOH), cộng Br2 (anken, ankin, aldehyde), thế ở vòng thơm, phản ứng este hoá.',
        'Vô cơ học kỳ I: điện li, axit–bazơ–muối, phản ứng oxi hoá khử, phi kim nhóm VII–VI–V.',
      ] },
      { h: 'Chuỗi biến hoá phải thuộc lòng' },
      { ul: [
        'Ankan → Anken (crackinh/tách H2) → Ancol (cộng H2O) → Aldehyde (oxi hoá nhẹ) → Axit (oxi hoá mạnh) → Este (este hoá với ancol).',
        'Benzen + Br2/Fe → Bromobenzene; + HNO3/H2SO4 đ → Nitrobenzene.',
        'CH4 (nhiệt phân) → C2H2 (axetilen) → CH3CHO (cộng H2O, Hg2+) → CH3COOH.',
      ] },
      { h: 'Hoá học lớp 12 — nối tiếp thế nào?' },
      { ul: [
        'Carbohydrate (glucozo, saccarozo, tinh bột, xenlulozơ): mở rộng từ aldehyde và este đã học ở lớp 11.',
        'Amin và amino axit: nhóm –NH2 kết hợp với –COOH → protein — chương học hấp dẫn nhất của năm.',
        'Polime và vật liệu polymer: phản ứng trùng hợp (từ anken) và trùng ngưng (từ diol + diaxit).',
        'Kim loại và điện phân: tiếp tục từ nền vô cơ lớp 10–11.',
      ] },
      { note: 'Học hoá hữu cơ hiệu quả nhất bằng cách vẽ sơ đồ chuỗi phản ứng ra giấy và "kể chuyện" về từng chất: nó xuất phát từ đâu, tạo ra gì, nhận biết bằng gì. Não người nhớ câu chuyện tốt hơn bảng số liệu gấp nhiều lần.' },
    ],
    examples: [
      { q: 'Em muốn nhớ toàn bộ chuỗi oxi hoá ancol mà không cần học thuộc lòng — có cách nào?', a: 'Hãy nhớ quy tắc "chỉ số hydrogen": ancol bậc 1 (–CH2OH) mất 2H → aldehyde (–CHO) mất 2H nữa → axit (–COOH). Hình dung như "đang cởi bỏ từng lớp hydrogen". Ancol bậc 2 (–CHOH–) mất 2H → xeton (không tráng bạc được). Ancol bậc 3 không oxi hoá dễ. Một sơ đồ nhỏ vẽ tay sẽ giúp em nhớ nguyên cả năm mà không cần ôn lại.' },
      { q: 'Trong đề thi tốt nghiệp THPT, phần Hoá hữu cơ thường chiếm bao nhiêu câu và tập trung vào gì?', a: 'Phần hữu cơ thường chiếm khoảng 15–20/40 câu trắc nghiệm trong đề thi tốt nghiệp. Trọng tâm: (1) tính chất và phản ứng của các hợp chất hữu cơ đặc trưng; (2) bài toán tính khối lượng/mol chất trong phản ứng; (3) nhận biết và phân biệt chất; (4) polymer và ứng dụng thực tiễn. Kiến thức lớp 11 (ancol, axit, este) và lớp 12 (carbohydrate, amin, polime) cùng được thi — nên ôn đều cả hai năm.' },
    ],
  },
};
