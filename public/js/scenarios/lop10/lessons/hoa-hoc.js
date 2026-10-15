// ============================================================
// Lớp 10 · HOÁ HỌC — Lý thuyết tuần (35 tuần)
// Bám CTGD 2018 (Hoá học 10). Key trùng id quiz: "H10HOA-wNN-quiz".
// Công thức viết text thường (1s2 2s2 2p6, 2H2 + O2 -> 2H2O…).
// ============================================================

export const H10HOA_LESSONS = {
  'H10HOA-w01-quiz': {
    topic: 'Nhập môn Hoá học — Đối tượng và phương pháp',
    intro: 'Chào các em! Hoá học là môn khoa học về chất và những biến đổi của chất. Tuần này thầy giúp các em hiểu hoá học nghiên cứu gì, phân biệt đơn chất - hợp chất và biết hoá học có mặt ở khắp đời sống.',
    objectives: [
      'Nêu được đối tượng nghiên cứu và vai trò của hoá học.',
      'Phân biệt được đơn chất, hợp chất, hỗn hợp và phản ứng hoá học.',
      'Hiểu được đơn vị khối lượng nguyên tử (amu) và phương pháp học tập hoá học.',
    ],
    theory: [
      { h: 'Hoá học nghiên cứu gì?' },
      { p: 'Hoá học là khoa học nghiên cứu về thành phần, cấu tạo, tính chất và sự biến đổi của chất, cùng năng lượng đi kèm các biến đổi đó.' },
      { h: 'Chất, đơn chất, hợp chất' },
      { ul: [
        'Đơn chất: chất tạo nên từ MỘT nguyên tố hoá học. Ví dụ: O2, H2, Cu, Fe.',
        'Hợp chất: chất tạo nên từ HAI hay nhiều nguyên tố liên kết với nhau. Ví dụ: H2O, NaCl, CO2.',
        'Hỗn hợp: gồm nhiều chất trộn lẫn, mỗi chất giữ nguyên tính chất riêng (nước muối, không khí).',
      ] },
      { h: 'Phản ứng hoá học và đơn vị khối lượng' },
      { p: 'Phản ứng hoá học là quá trình biến đổi chất này thành chất khác: liên kết cũ bị phá vỡ, liên kết mới hình thành.' },
      { p: 'Khối lượng nguyên tử rất nhỏ nên dùng đơn vị amu (hay u): 1 u xấp xỉ 1,66 nhân 10 mũ -27 kg.' },
      { note: 'Học hoá học cần gắn lý thuyết với quan sát thí nghiệm và đời sống: y dược, năng lượng, vật liệu, môi trường.' },
    ],
    examples: [
      { q: 'Trong các chất sau, đâu là đơn chất, đâu là hợp chất: O2, H2O, Fe, CO2?', a: 'Đơn chất (một nguyên tố): O2 (gồm O), Fe (gồm Fe). Hợp chất (nhiều nguyên tố): H2O (H và O), CO2 (C và O).' },
      { q: 'Vì sao "nước muối" là hỗn hợp chứ không phải hợp chất?', a: 'Vì muối NaCl và nước H2O chỉ trộn lẫn, không liên kết tạo chất mới; có thể tách muối ra bằng cô cạn, mỗi chất vẫn giữ tính chất riêng. Đó là hỗn hợp, không phải hợp chất.' },
    ],
  },

  'H10HOA-w02-quiz': {
    topic: 'Cấu tạo nguyên tử — Các hạt cơ bản',
    intro: 'Các em ơi, nguyên tử là viên gạch nhỏ bé tạo nên mọi chất. Tuần này thầy trò ta mổ xẻ nguyên tử để biết nó gồm những hạt nào, điện tích ra sao và ý nghĩa của số khối A, số hiệu Z.',
    objectives: [
      'Nêu được thành phần nguyên tử: hạt nhân (proton, neutron) và lớp vỏ electron.',
      'Biết điện tích và khối lượng tương đối của proton, neutron, electron.',
      'Tính được số khối A = Z + N và hiểu Z = số proton = số electron.',
    ],
    theory: [
      { h: 'Nguyên tử gồm những gì?' },
      { p: 'Nguyên tử gồm hạt nhân ở giữa (chứa proton và neutron) và lớp vỏ electron chuyển động xung quanh.' },
      { h: 'Điện tích và khối lượng các hạt' },
      { ul: [
        'Proton (p): điện tích +1, khối lượng xấp xỉ 1 u, nằm trong hạt nhân.',
        'Neutron (n): điện tích 0 (trung hoà), khối lượng xấp xỉ 1 u, nằm trong hạt nhân.',
        'Electron (e): điện tích -1, khối lượng rất nhỏ (xấp xỉ 1/1836 u), ở lớp vỏ.',
      ] },
      { p: 'Nguyên tử trung hoà về điện vì số proton bằng số electron.' },
      { h: 'Số hiệu nguyên tử và số khối' },
      { ul: [
        'Số hiệu nguyên tử Z = số proton trong hạt nhân = số electron.',
        'Số khối A = Z + N (số proton cộng số neutron).',
      ] },
      { note: 'Hầu như toàn bộ khối lượng nguyên tử tập trung ở hạt nhân, vì electron quá nhẹ.' },
    ],
    examples: [
      { q: 'Nguyên tử Na có Z = 11, A = 23. Tính số proton, electron, neutron.', a: 'Số proton = Z = 11. Số electron = Z = 11 (nguyên tử trung hoà). Số neutron N = A - Z = 23 - 11 = 12.' },
      { q: 'Vì sao nguyên tử trung hoà về điện?', a: 'Vì số proton (mang +1) bằng số electron (mang -1) nên tổng điện tích dương và âm triệt tiêu nhau, nguyên tử không mang điện.' },
    ],
  },

  'H10HOA-w03-quiz': {
    topic: 'Mô hình nguyên tử — Bohr và mô hình lượng tử',
    intro: 'Các em thân mến, con người đã hình dung nguyên tử qua nhiều mô hình. Tuần này ta đi từ mô hình Bohr (quỹ đạo) đến mô hình hiện đại (orbital - xác suất), và làm quen các loại orbital s, p, d, f.',
    objectives: [
      'So sánh được mô hình Bohr và mô hình nguyên tử hiện đại.',
      'Hiểu khái niệm orbital nguyên tử (AO) là vùng xác suất tìm thấy electron.',
      'Nhận biết hình dạng orbital s (cầu) và p (quả tạ).',
    ],
    theory: [
      { h: 'Mô hình Bohr' },
      { p: 'Theo Bohr, electron chuyển động trên những quỹ đạo tròn xác định quanh hạt nhân, mỗi quỹ đạo có mức năng lượng riêng. Mô hình này đơn giản nhưng chưa mô tả đúng bản chất electron.' },
      { h: 'Mô hình hiện đại (cơ học lượng tử)' },
      { p: 'Electron không chuyển động theo quỹ đạo cố định mà chỉ có xác suất xuất hiện ở từng vùng không gian.' },
      { ul: [
        'Orbital nguyên tử (AO): vùng không gian quanh hạt nhân nơi xác suất có mặt electron là lớn nhất (khoảng 90-95%).',
        'Có 4 loại orbital chính: s, p, d, f.',
      ] },
      { h: 'Hình dạng orbital' },
      { ul: [
        'Orbital s: hình cầu, đối xứng quanh hạt nhân.',
        'Orbital p: hình số 8 nổi (quả tạ), gồm 3 orbital theo 3 trục px, py, pz.',
      ] },
      { note: 'Mô hình orbital giải thích được cấu hình electron và tính chất nguyên tố, điều mà mô hình Bohr không làm được.' },
    ],
    examples: [
      { q: 'Khác nhau cơ bản giữa "quỹ đạo" (Bohr) và "orbital" (hiện đại) là gì?', a: 'Quỹ đạo là đường đi xác định của electron (Bohr). Orbital là vùng không gian mà electron có xác suất xuất hiện cao nhất - không phải đường đi cụ thể. Mô hình orbital phản ánh đúng bản chất lượng tử của electron.' },
      { q: 'Phân lớp 2p có mấy orbital và hình dạng ra sao?', a: 'Phân lớp p có 3 orbital (px, py, pz) cùng hình quả tạ, hướng theo 3 trục vuông góc nhau. Mỗi orbital chứa tối đa 2 electron nên 2p chứa tối đa 6 electron.' },
    ],
  },

  'H10HOA-w04-quiz': {
    topic: 'Cấu hình electron — Quy tắc Hund, Pauli',
    intro: 'Chào các em! Electron sắp xếp trong nguyên tử theo những quy tắc rất trật tự. Tuần này ta học cách viết cấu hình electron dựa trên nguyên lý Pauli và quy tắc Hund.',
    objectives: [
      'Biết số electron tối đa trên lớp (2n^2) và trên mỗi orbital (2e).',
      'Nắm số orbital của các phân lớp s, p, d, f.',
      'Vận dụng nguyên lý Pauli và quy tắc Hund để viết cấu hình electron.',
    ],
    theory: [
      { h: 'Sức chứa electron' },
      { ul: [
        'Mỗi orbital chứa tối đa 2 electron có spin ngược nhau (nguyên lý Pauli).',
        'Lớp thứ n chứa tối đa 2n^2 electron: lớp 1 có 2e, lớp 2 có 8e, lớp 3 có 18e.',
      ] },
      { h: 'Số orbital của các phân lớp' },
      { ul: [
        'Phân lớp s: 1 orbital, tối đa 2e.',
        'Phân lớp p: 3 orbital, tối đa 6e.',
        'Phân lớp d: 5 orbital, tối đa 10e.',
        'Phân lớp f: 7 orbital, tối đa 14e.',
      ] },
      { h: 'Quy tắc Hund' },
      { p: 'Trong một phân lớp, electron phân bố vào các orbital sao cho số electron độc thân là tối đa (ưu tiên các ô trống, spin song song) trước khi ghép cặp.' },
      { note: 'Thứ tự mức năng lượng tăng dần: 1s, 2s, 2p, 3s, 3p, 4s, 3d... Viết cấu hình theo thứ tự này.' },
    ],
    examples: [
      { q: 'Viết cấu hình electron của oxygen (Z = 8) và xác định số electron độc thân.', a: 'Cấu hình: 1s2 2s2 2p4. Phân lớp 2p có 4 electron điền vào 3 orbital: hai orbital ghép cặp, một... thực ra theo Hund: 2 electron độc thân (2 orbital có 1e, 1 orbital có 2e). Vậy O có 2 electron độc thân.' },
      { q: 'Vì sao lớp electron thứ 3 chứa tối đa 18 electron?', a: 'Áp dụng công thức 2n^2 với n = 3: 2 nhân 3^2 = 2 nhân 9 = 18 electron. Gồm các phân lớp 3s (2e) + 3p (6e) + 3d (10e) = 18e.' },
    ],
  },

  'H10HOA-w05-quiz': {
    topic: 'Bảng tuần hoàn — Cấu trúc và quy luật',
    intro: 'Các em ơi, bảng tuần hoàn là "bản đồ" của mọi nguyên tố. Tuần này ta tìm hiểu cách Mendeleev sắp xếp, ý nghĩa chu kì - nhóm, và đặc điểm các nhóm tiêu biểu.',
    objectives: [
      'Biết nguyên tắc sắp xếp bảng tuần hoàn theo Z tăng dần.',
      'Phân biệt chu kì (hàng ngang) và nhóm (cột dọc).',
      'Nhận diện một số nhóm tiêu biểu: kim loại kiềm (IA), halogen (VIIA).',
    ],
    theory: [
      { h: 'Lịch sử và nguyên tắc sắp xếp' },
      { p: 'Mendeleev đề xuất bảng tuần hoàn năm 1869. Bảng hiện đại sắp xếp các nguyên tố theo số hiệu nguyên tử Z tăng dần.' },
      { h: 'Chu kì và nhóm' },
      { ul: [
        'Chu kì: hàng ngang. Các nguyên tố cùng chu kì có cùng số lớp electron. Bảng có 7 chu kì.',
        'Nhóm: cột dọc. Các nguyên tố cùng nhóm A có cùng số electron lớp ngoài cùng nên tính chất hoá học tương tự.',
      ] },
      { h: 'Một số nhóm tiêu biểu' },
      { ul: [
        'Nhóm IA - kim loại kiềm: Li, Na, K, Rb, Cs (1 electron lớp ngoài, ns1).',
        'Nhóm VIIA - halogen: F, Cl, Br, I (7 electron lớp ngoài, ns2 np5).',
        'Nhóm VIIIA - khí hiếm: He, Ne, Ar... (cấu hình bền, khó phản ứng).',
      ] },
      { note: 'Số thứ tự nhóm A bằng số electron lớp ngoài cùng; số thứ tự chu kì bằng số lớp electron.' },
    ],
    examples: [
      { q: 'Nguyên tố Mg có cấu hình 1s2 2s2 2p6 3s2. Xác định chu kì và nhóm.', a: 'Số lớp electron = 3 nên Mg ở chu kì 3. Lớp ngoài cùng có 2 electron (3s2) nên Mg ở nhóm IIA. Mg là kim loại kiềm thổ.' },
      { q: 'Vì sao Na và K có tính chất hoá học giống nhau?', a: 'Vì cả hai cùng thuộc nhóm IA, có 1 electron ở lớp ngoài cùng (Na: 3s1, K: 4s1). Số electron lớp ngoài giống nhau quyết định tính chất hoá học tương tự - đều dễ nhường 1 electron.' },
    ],
  },

  'H10HOA-w06-quiz': {
    topic: 'Định luật tuần hoàn — Sự biến thiên tính chất',
    intro: 'Chào các em! Khi đi dọc một chu kì hay xuống một nhóm, tính chất nguyên tố biến đổi theo quy luật rõ ràng. Tuần này ta nắm quy luật biến thiên bán kính, độ âm điện và tính kim loại - phi kim.',
    objectives: [
      'Phát biểu được định luật tuần hoàn.',
      'Nắm quy luật biến thiên bán kính nguyên tử và độ âm điện theo chu kì và nhóm.',
      'Giải thích sự biến thiên tính kim loại - phi kim.',
    ],
    theory: [
      { h: 'Định luật tuần hoàn' },
      { p: 'Tính chất các nguyên tố và đơn chất, hợp chất của chúng biến đổi tuần hoàn theo chiều tăng của số hiệu nguyên tử Z (tức theo cấu hình electron).' },
      { h: 'Biến thiên bán kính nguyên tử' },
      { ul: [
        'Trong cùng chu kì (trái sang phải): bán kính GIẢM vì điện tích hạt nhân tăng hút mạnh lớp electron.',
        'Trong cùng nhóm A (trên xuống dưới): bán kính TĂNG vì số lớp electron tăng.',
      ] },
      { h: 'Biến thiên độ âm điện và tính chất' },
      { ul: [
        'Độ âm điện: trong chu kì TĂNG (trái sang phải), trong nhóm GIẢM (trên xuống).',
        'Tính kim loại: trong chu kì GIẢM dần, trong nhóm TĂNG dần.',
        'Tính phi kim: trong chu kì TĂNG dần, trong nhóm GIẢM dần.',
      ] },
      { note: 'Phi kim mạnh nhất là F (góc trên phải), kim loại mạnh nhất là Cs/Fr (góc dưới trái).' },
    ],
    examples: [
      { q: 'So sánh bán kính nguyên tử của Na, Mg, Cl (cùng chu kì 3).', a: 'Cùng chu kì, từ trái sang phải bán kính giảm. Thứ tự Z: Na (11) < Mg (12) < Cl (17). Vậy bán kính: Na > Mg > Cl. Na lớn nhất, Cl nhỏ nhất.' },
      { q: 'Nguyên tố nào có độ âm điện lớn hơn: F hay Cl? Vì sao?', a: 'F và Cl cùng nhóm VIIA, F ở trên Cl. Trong nhóm độ âm điện giảm từ trên xuống, nên F có độ âm điện lớn hơn Cl. F là nguyên tố có độ âm điện lớn nhất.' },
    ],
  },

  'H10HOA-w07-quiz': {
    topic: 'Liên kết ion',
    intro: 'Các em thân mến, các nguyên tử kết hợp với nhau bằng liên kết hoá học. Tuần này ta học liên kết ion - hình thành khi electron được "cho - nhận" giữa kim loại và phi kim.',
    objectives: [
      'Hiểu cơ chế hình thành liên kết ion (chuyển electron).',
      'Phân biệt cation và anion.',
      'Nêu tính chất của hợp chất ion.',
    ],
    theory: [
      { h: 'Cơ chế hình thành' },
      { p: 'Liên kết ion hình thành giữa kim loại điển hình và phi kim điển hình (chênh độ âm điện lớn, thường trên 1,7). Kim loại nhường electron, phi kim nhận electron, các ion trái dấu hút nhau.' },
      { h: 'Cation và anion' },
      { ul: [
        'Cation (ion dương): nguyên tử kim loại MẤT electron. Ví dụ: Na -> Na+ + 1e.',
        'Anion (ion âm): nguyên tử phi kim NHẬN electron. Ví dụ: Cl + 1e -> Cl-.',
      ] },
      { h: 'Ví dụ NaCl' },
      { p: 'Na (1s2 2s2 2p6 3s1) nhường 1e thành Na+; Cl (...3s2 3p5) nhận 1e thành Cl-. Hai ion hút nhau tạo NaCl.' },
      { h: 'Tính chất hợp chất ion' },
      { ul: [
        'Là chất rắn, kết tinh thành mạng tinh thể, nóng chảy ở nhiệt độ cao.',
        'Dẫn điện khi nóng chảy hoặc khi tan trong nước (có ion tự do); không dẫn điện ở thể rắn.',
        'Thường tan tốt trong nước.',
      ] },
      { note: 'Trong mạng tinh thể ion, không có "phân tử" riêng lẻ mà là tập hợp ion sắp xếp đều đặn.' },
    ],
    examples: [
      { q: 'Viết quá trình hình thành liên kết ion trong MgCl2.', a: 'Mg nhường 2 electron: Mg -> Mg2+ + 2e. Mỗi Cl nhận 1 electron: Cl + 1e -> Cl-, cần 2 nguyên tử Cl. Mg2+ kết hợp 2 Cl- tạo MgCl2. Tổng quát: Mg + Cl2 -> MgCl2.' },
      { q: 'Vì sao NaCl rắn không dẫn điện nhưng NaCl nóng chảy lại dẫn điện?', a: 'Ở thể rắn, các ion Na+ và Cl- bị giữ chặt trong mạng tinh thể, không di chuyển tự do nên không dẫn điện. Khi nóng chảy, các ion được giải phóng và chuyển động tự do, mang điện tích đi nên dẫn điện được.' },
    ],
  },

  'H10HOA-w08-quiz': {
    topic: 'Liên kết cộng hoá trị',
    intro: 'Chào các em! Khi hai phi kim gặp nhau, chúng không cho - nhận electron mà DÙNG CHUNG electron. Đó là liên kết cộng hoá trị - kiểu liên kết phổ biến nhất trong hoá học.',
    objectives: [
      'Hiểu liên kết cộng hoá trị là sự dùng chung cặp electron.',
      'Phân biệt cộng hoá trị không cực và có cực.',
      'Nhận biết liên kết đơn, đôi, ba (sigma và pi).',
    ],
    theory: [
      { h: 'Bản chất liên kết cộng hoá trị' },
      { p: 'Liên kết cộng hoá trị hình thành khi hai nguyên tử (thường là phi kim) dùng chung một hay nhiều cặp electron để đạt cấu hình bền của khí hiếm.' },
      { h: 'Phân loại theo độ phân cực' },
      { ul: [
        'Không cực: giữa hai nguyên tử cùng nguyên tố, độ âm điện chênh 0 (H2, O2, N2). Cặp electron ở giữa.',
        'Có cực: giữa hai phi kim khác độ âm điện (chênh 0,4 đến 1,7). Cặp electron lệch về nguyên tử có độ âm điện lớn hơn. Ví dụ: HCl, H2O.',
      ] },
      { h: 'Liên kết đơn, đôi, ba' },
      { ul: [
        'Liên kết đơn: 1 cặp electron chung, là 1 liên kết sigma.',
        'Liên kết đôi: 2 cặp electron chung = 1 sigma + 1 pi (O2, CO2).',
        'Liên kết ba: 3 cặp electron chung = 1 sigma + 2 pi (N2).',
      ] },
      { note: 'Carbon có 4 electron lớp ngoài nên tạo được 4 liên kết cộng hoá trị, là nền tảng của hoá hữu cơ.' },
    ],
    examples: [
      { q: 'Trong phân tử H2O, liên kết O-H thuộc loại nào? Giải thích.', a: 'Liên kết O-H là cộng hoá trị có cực. Oxygen (độ âm điện 3,44) lớn hơn hydrogen (2,20), chênh khoảng 1,24 (trong khoảng 0,4 đến 1,7) nên cặp electron chung lệch về phía O. Phân tử H2O do đó phân cực.' },
      { q: 'Phân tử N2 có liên kết gì? Gồm bao nhiêu sigma và pi?', a: 'N2 có liên kết ba (N có 5 electron lớp ngoài, mỗi N góp 3 electron tạo 3 cặp chung). Liên kết ba gồm 1 liên kết sigma và 2 liên kết pi. Vì vậy N2 rất bền, khó phản ứng.' },
    ],
  },

  'H10HOA-w09-quiz': {
    topic: 'Liên kết cho - nhận và liên kết kim loại',
    intro: 'Các em ơi, ngoài cho - nhận và dùng chung electron, còn hai kiểu liên kết đặc biệt: cho - nhận (một bên cung cấp cặp electron) và liên kết kim loại ("biển electron"). Tuần này ta tìm hiểu chúng.',
    objectives: [
      'Hiểu liên kết cho - nhận: cặp electron chung do một nguyên tử cung cấp.',
      'Hiểu mô hình "biển electron" của liên kết kim loại.',
      'Giải thích các tính chất đặc trưng của kim loại.',
    ],
    theory: [
      { h: 'Liên kết cho - nhận (phối trí)' },
      { p: 'Là trường hợp đặc biệt của liên kết cộng hoá trị, trong đó cặp electron dùng chung chỉ do MỘT nguyên tử cung cấp (nguyên tử cho), còn nguyên tử kia có orbital trống (nguyên tử nhận).' },
      { p: 'Ví dụ ion NH4+: nguyên tử N còn một cặp electron tự do, cho vào ion H+ (không có electron) tạo liên kết cho - nhận N -> H.' },
      { h: 'Liên kết kim loại' },
      { p: 'Trong tinh thể kim loại, các nguyên tử nhường electron lớp ngoài tạo thành ion dương; các electron tự do chuyển động trong toàn khối kim loại như một "biển electron" gắn kết các ion dương lại.' },
      { h: 'Tính chất của kim loại' },
      { ul: [
        'Dẫn điện và dẫn nhiệt tốt nhờ electron tự do.',
        'Có ánh kim.',
        'Dẻo (dễ dát mỏng, kéo sợi): khi va đập, các lớp ion trượt lên nhau qua biển electron mà không vỡ.',
      ] },
      { note: 'Khác nhau cốt lõi: liên kết cho - nhận một bên góp cả cặp electron; cộng hoá trị thường mỗi bên góp 1 electron.' },
    ],
    examples: [
      { q: 'Giải thích sự hình thành liên kết cho - nhận trong ion NH4+.', a: 'Phân tử NH3 có nguyên tử N với một cặp electron chưa liên kết. Khi gặp ion H+ (không có electron, có orbital trống), N dùng cặp electron tự do của mình tạo liên kết cho - nhận với H+, hình thành ion NH4+ với 4 liên kết N-H tương đương.' },
      { q: 'Vì sao kim loại dẻo còn hợp chất ion lại giòn?', a: 'Kim loại: khi va đập, các lớp ion dương trượt trên nhau nhưng vẫn được biển electron giữ lại nên không vỡ, do đó dẻo. Hợp chất ion: khi trượt, các ion cùng dấu lại gần nhau gây đẩy mạnh làm tinh thể nứt vỡ, nên giòn.' },
    ],
  },

  'H10HOA-w10-quiz': {
    topic: 'Liên kết hydro và lực Van der Waals',
    intro: 'Chào các em! Giữa các phân tử có những lực tương tác yếu nhưng vô cùng quan trọng: liên kết hydro và lực Van der Waals. Chúng giải thích vì sao nước sôi ở 100 độ C và nước đá lại nổi.',
    objectives: [
      'Hiểu liên kết hydro hình thành giữa H (đã gắn F, O, N) với F, O, N của phân tử khác.',
      'So sánh cường độ liên kết hydro và lực Van der Waals.',
      'Giải thích các hiện tượng do liên kết hydro (nhiệt độ sôi của nước, nước đá nổi).',
    ],
    theory: [
      { h: 'Liên kết hydro' },
      { p: 'Liên kết hydro hình thành giữa nguyên tử H (đã liên kết với F, O hoặc N có độ âm điện lớn) với nguyên tử F, O, N của một phân tử khác. Đây là tương tác yếu hơn liên kết cộng hoá trị nhưng mạnh hơn lực Van der Waals.' },
      { h: 'Lực Van der Waals' },
      { p: 'Là lực hút rất yếu giữa các phân tử, sinh ra do sự dao động và phân cực tạm thời của electron. Lực này tăng khi khối lượng phân tử tăng.' },
      { h: 'Vai trò của liên kết hydro' },
      { ul: [
        'Làm nước H2O có nhiệt độ sôi cao bất thường (100 độ C) so với các phân tử cùng kích thước.',
        'Liên kết hai mạch DNA: cặp base A=T (2 liên kết H), G≡C (3 liên kết H).',
        'Làm nước đá có cấu trúc rỗng nên mật độ thấp hơn nước lỏng -> nước đá nổi.',
      ] },
      { note: 'Liên kết hydro là chìa khoá giải thích nhiều tính chất đặc biệt của nước - chất nền tảng của sự sống.' },
    ],
    examples: [
      { q: 'Vì sao nước (H2O) sôi ở 100 độ C, cao hơn nhiều so với H2S dù cùng nhóm VIA?', a: 'Giữa các phân tử H2O có liên kết hydro mạnh (O có độ âm điện lớn), cần nhiều năng lượng để phá vỡ nên nhiệt độ sôi cao (100 độ C). H2S hầu như không tạo liên kết hydro (S độ âm điện nhỏ hơn), chỉ có lực Van der Waals yếu nên sôi ở khoảng -60 độ C.' },
      { q: 'Tại sao nước đá nổi trên nước lỏng?', a: 'Khi đóng băng, các phân tử nước sắp xếp theo mạng tinh thể có nhiều khoảng trống do liên kết hydro, làm mật độ nước đá nhỏ hơn nước lỏng. Vật có mật độ nhỏ hơn thì nổi, nên nước đá nổi trên nước.' },
    ],
  },

  'H10HOA-w11-quiz': {
    topic: 'Phản ứng oxy hoá - khử (Phần 1)',
    intro: 'Các em thân mến, phản ứng oxy hoá - khử là loại phản ứng có sự cho - nhận electron, xảy ra khắp nơi: cháy, gỉ sắt, pin... Tuần này ta nắm các khái niệm gốc: oxy hoá, khử, chất khử, chất oxy hoá, số oxy hoá.',
    objectives: [
      'Định nghĩa quá trình oxy hoá (nhường e) và quá trình khử (nhận e).',
      'Phân biệt chất khử và chất oxy hoá.',
      'Xác định số oxy hoá của các nguyên tố thường gặp.',
    ],
    theory: [
      { h: 'Oxy hoá và khử' },
      { ul: [
        'Quá trình oxy hoá: nhường electron, số oxy hoá TĂNG.',
        'Quá trình khử: nhận electron, số oxy hoá GIẢM.',
      ] },
      { h: 'Chất khử và chất oxy hoá' },
      { ul: [
        'Chất khử: chất NHƯỜNG electron (bản thân bị oxy hoá).',
        'Chất oxy hoá: chất NHẬN electron (bản thân bị khử).',
      ] },
      { p: 'Mẹo nhớ: "Khử cho - O nhận" (chất Khử cho electron, chất Oxy hoá nhận electron).' },
      { h: 'Quy tắc xác định số oxy hoá' },
      { ul: [
        'Đơn chất có số oxy hoá = 0 (O2, Fe, Cu).',
        'Trong hợp chất, H thường +1 (trừ hydrua kim loại), O thường -2 (trừ peroxide, OF2).',
        'Kim loại nhóm IA là +1, IIA là +2.',
        'Tổng số oxy hoá trong phân tử trung hoà = 0; trong ion = điện tích ion.',
      ] },
      { note: 'Trong một phản ứng oxy hoá - khử, oxy hoá và khử luôn xảy ra đồng thời.' },
    ],
    examples: [
      { q: 'Xác định số oxy hoá của S trong H2SO4.', a: 'H là +1 (có 2 H = +2), O là -2 (có 4 O = -8). Gọi số oxy hoá của S là x. Tổng = 0: (+2) + x + (-8) = 0, suy ra x = +6. Vậy S có số oxy hoá +6.' },
      { q: 'Trong phản ứng Fe + CuSO4 -> FeSO4 + Cu, chỉ ra chất khử, chất oxy hoá.', a: 'Fe (0) -> Fe (+2): nhường 2e, số oxy hoá tăng nên Fe bị oxy hoá, là chất khử. Cu (+2) -> Cu (0): nhận 2e, số oxy hoá giảm nên Cu2+ bị khử, là chất oxy hoá.' },
    ],
  },

  'H10HOA-w12-quiz': {
    topic: 'Phản ứng oxy hoá - khử (Phần 2): Cân bằng bằng phương pháp electron',
    intro: 'Chào các em! Tuần này ta học kỹ năng quan trọng: cân bằng phương trình oxy hoá - khử bằng phương pháp thăng bằng electron, dựa trên nguyên tắc "số electron nhường bằng số electron nhận".',
    objectives: [
      'Nắm các bước cân bằng phản ứng oxy hoá - khử bằng phương pháp electron.',
      'Vận dụng nguyên tắc bảo toàn electron.',
      'Hoàn thành cân bằng nguyên tố và điện tích.',
    ],
    theory: [
      { h: 'Các bước cân bằng (phương pháp thăng bằng electron)' },
      { ul: [
        'Bước 1: Xác định số oxy hoá của các nguyên tố, tìm nguyên tố thay đổi số oxy hoá.',
        'Bước 2: Viết quá trình oxy hoá và quá trình khử (hai nửa phản ứng cho - nhận electron).',
        'Bước 3: Tìm hệ số sao cho tổng electron nhường = tổng electron nhận (bảo toàn electron).',
        'Bước 4: Đặt hệ số vào phương trình, cân bằng các nguyên tố còn lại và kiểm tra điện tích.',
      ] },
      { h: 'Nguyên tắc cốt lõi' },
      { p: 'Bảo toàn electron: số electron do chất khử nhường đúng bằng số electron do chất oxy hoá nhận.' },
      { h: 'Mẹo tìm bội chung electron' },
      { p: 'Lấy bội chung nhỏ nhất của số electron nhường và nhận để cân bằng. Ví dụ nhường 3e, nhận 2e thì bội chung là 6: nhân quá trình nhường với 2, quá trình nhận với 3.' },
      { note: 'Kiểm tra cuối cùng: số nguyên tử mỗi nguyên tố hai vế bằng nhau và tổng điện tích cân bằng.' },
    ],
    examples: [
      { q: 'Cân bằng: Fe + Cl2 -> FeCl3 bằng phương pháp electron.', a: 'Quá trình oxy hoá: Fe (0) -> Fe (+3) + 3e. Quá trình khử: Cl2 (0) + 2e -> 2Cl (-1). Bội chung của 3 và 2 là 6: nhân quá trình oxy hoá với 2 (2Fe nhường 6e), nhân quá trình khử với 3 (3Cl2 nhận 6e). Phương trình: 2Fe + 3Cl2 -> 2FeCl3.' },
      { q: 'Trong phản ứng Cu + 2AgNO3 -> Cu(NO3)2 + 2Ag, chứng minh đã bảo toàn electron.', a: 'Cu (0) -> Cu (+2) + 2e: nhường 2 electron. Ag (+1) + 1e -> Ag (0): mỗi Ag+ nhận 1 electron, có 2 Ag+ nhận tổng 2 electron. Số electron nhường (2) = số electron nhận (2), đã bảo toàn electron.' },
    ],
  },

  'H10HOA-w13-quiz': {
    topic: 'Năng lượng hoá học — Phản ứng toả nhiệt và thu nhiệt',
    intro: 'Các em ơi, mỗi phản ứng hoá học đều kèm theo sự trao đổi năng lượng. Tuần này ta phân biệt phản ứng toả nhiệt và thu nhiệt, làm quen biến thiên enthalpy delta H.',
    objectives: [
      'Phân biệt phản ứng toả nhiệt (delta H < 0) và thu nhiệt (delta H > 0).',
      'Nêu được các ví dụ thực tế.',
      'Biết đơn vị của biến thiên enthalpy (kJ/mol).',
    ],
    theory: [
      { h: 'Phản ứng toả nhiệt và thu nhiệt' },
      { ul: [
        'Phản ứng toả nhiệt: giải phóng nhiệt ra môi trường, delta H < 0. Ví dụ: đốt cháy nhiên liệu.',
        'Phản ứng thu nhiệt: hấp thụ nhiệt từ môi trường, delta H > 0. Ví dụ: quang hợp, nung vôi.',
      ] },
      { h: 'Biến thiên enthalpy delta H' },
      { p: 'Biến thiên enthalpy delta H là nhiệt lượng toả ra hoặc thu vào của phản ứng ở áp suất không đổi, đơn vị là kJ/mol. delta H âm là toả nhiệt, dương là thu nhiệt.' },
      { h: 'Ví dụ thực tế' },
      { ul: [
        'Toả nhiệt: CH4 + 2O2 -> CO2 + 2H2O (delta H xấp xỉ -890 kJ/mol).',
        'Thu nhiệt: quang hợp 6CO2 + 6H2O -> C6H12O6 + 6O2 (cần năng lượng ánh sáng).',
        'Thu nhiệt: CaCO3 -> CaO + CO2 (nung vôi).',
      ] },
      { note: 'Phản ứng cháy luôn toả nhiệt mạnh, là nguồn cung cấp năng lượng chính cho đời sống.' },
    ],
    examples: [
      { q: 'Phản ứng đốt than C + O2 -> CO2 có delta H = -393,5 kJ/mol. Đây là phản ứng gì?', a: 'Vì delta H < 0 nên đây là phản ứng toả nhiệt: phản ứng giải phóng 393,5 kJ nhiệt cho mỗi mol CO2 tạo thành. Đó là lý do đốt than sinh ra nhiều nhiệt.' },
      { q: 'Vì sao khi hoà tan một số muối (như NH4NO3) vào nước lại thấy lạnh đi?', a: 'Quá trình hoà tan NH4NO3 là quá trình thu nhiệt (delta H > 0): nó hấp thụ nhiệt từ nước và môi trường xung quanh, làm nhiệt độ dung dịch giảm xuống nên ta cảm thấy lạnh. Đây là nguyên lý của túi chườm lạnh.' },
    ],
  },

  'H10HOA-w14-quiz': {
    topic: 'Định luật Hess — Tính biến thiên enthalpy',
    intro: 'Chào các em! Có những phản ứng khó đo nhiệt trực tiếp. Định luật Hess giúp ta tính delta H gián tiếp - rất tiện lợi. Tuần này ta học định luật Hess và cách dùng nhiệt tạo thành.',
    objectives: [
      'Phát biểu định luật Hess.',
      'Hiểu khái niệm nhiệt tạo thành tiêu chuẩn delta H tạo thành.',
      'Vận dụng công thức tính delta H phản ứng.',
    ],
    theory: [
      { h: 'Định luật Hess' },
      { p: 'Biến thiên enthalpy của một phản ứng chỉ phụ thuộc vào trạng thái đầu và trạng thái cuối của hệ, không phụ thuộc vào đường đi (các giai đoạn trung gian).' },
      { p: 'Định luật Hess là hệ quả của định luật bảo toàn năng lượng (định luật I nhiệt động học).' },
      { h: 'Nhiệt tạo thành tiêu chuẩn' },
      { ul: [
        'Nhiệt tạo thành tiêu chuẩn delta H tạo thành: biến thiên enthalpy khi tạo thành 1 mol chất từ các đơn chất bền ở điều kiện chuẩn.',
        'delta H tạo thành của đơn chất bền (ở dạng chuẩn) bằng 0. Ví dụ O2(k), Fe(r) có delta H tạo thành = 0.',
      ] },
      { h: 'Công thức tính delta H phản ứng' },
      { p: 'delta H phản ứng = Tổng delta H tạo thành (sản phẩm) - Tổng delta H tạo thành (chất phản ứng), có nhân với hệ số cân bằng.' },
      { note: 'Định luật Hess cho phép xây dựng "chu trình" cộng các phản ứng trung gian để tính delta H mong muốn.' },
    ],
    examples: [
      { q: 'Cho delta H tạo thành của CO2(k) = -393,5 kJ/mol, của H2O(l) = -285,8 kJ/mol, của CH4(k) = -74,8 kJ/mol. Tính delta H của phản ứng CH4 + 2O2 -> CO2 + 2H2O.', a: 'Áp dụng công thức: delta H = [delta Hf(CO2) + 2.delta Hf(H2O)] - [delta Hf(CH4) + 2.delta Hf(O2)]. delta Hf(O2) = 0. delta H = [(-393,5) + 2.(-285,8)] - [(-74,8) + 0] = (-393,5 - 571,6) - (-74,8) = -965,1 + 74,8 = -890,3 kJ/mol. Phản ứng toả nhiệt.' },
      { q: 'Vì sao delta H tạo thành của O2 ở thể khí bằng 0?', a: 'Vì O2(k) là đơn chất bền ở dạng tồn tại tiêu chuẩn của nguyên tố oxygen. Theo quy ước, nhiệt tạo thành của một đơn chất bền ở trạng thái chuẩn được lấy bằng 0, làm mốc để tính cho các hợp chất.' },
    ],
  },

  'H10HOA-w15-quiz': {
    topic: 'Tốc độ phản ứng — Yếu tố ảnh hưởng',
    intro: 'Các em thân mến, phản ứng nhanh hay chậm phụ thuộc nhiều yếu tố. Tuần này ta tìm hiểu tốc độ phản ứng và 5 yếu tố ảnh hưởng: nồng độ, nhiệt độ, áp suất, diện tích bề mặt, chất xúc tác.',
    objectives: [
      'Định nghĩa tốc độ phản ứng.',
      'Nêu và giải thích các yếu tố ảnh hưởng đến tốc độ phản ứng.',
      'Hiểu vai trò của chất xúc tác.',
    ],
    theory: [
      { h: 'Tốc độ phản ứng là gì?' },
      { p: 'Tốc độ phản ứng là độ biến thiên nồng độ của chất phản ứng hoặc sản phẩm trong một đơn vị thời gian: v = delta C / delta t.' },
      { h: 'Các yếu tố ảnh hưởng' },
      { ul: [
        'Nồng độ: tăng nồng độ chất phản ứng -> tốc độ tăng (nhiều va chạm hiệu quả hơn).',
        'Nhiệt độ: tăng nhiệt độ -> tốc độ tăng (quy tắc Van\'t Hoff: tăng 10 độ C, tốc độ tăng 2 đến 4 lần).',
        'Áp suất (với chất khí): tăng áp suất -> tốc độ tăng.',
        'Diện tích bề mặt: chất rắn càng nhỏ (nghiền mịn) -> tốc độ tăng.',
        'Chất xúc tác: làm tăng tốc độ phản ứng nhưng không bị tiêu hao sau phản ứng.',
      ] },
      { h: 'Vai trò chất xúc tác' },
      { p: 'Chất xúc tác làm giảm năng lượng hoạt hoá (rào cản năng lượng), giúp phản ứng xảy ra nhanh hơn mà không thay đổi sản phẩm.' },
      { note: 'Hiểu các yếu tố này giúp ta điều khiển phản ứng: muốn nhanh thì tăng nhiệt độ, nồng độ, nghiền nhỏ, dùng xúc tác.' },
    ],
    examples: [
      { q: 'Giải thích vì sao than đá nghiền nhỏ cháy nhanh hơn than cục lớn.', a: 'Than nghiền nhỏ có tổng diện tích bề mặt tiếp xúc với oxygen lớn hơn nhiều so với than cục. Diện tích bề mặt lớn làm tăng số va chạm giữa than và O2 trong một đơn vị thời gian, nên tốc độ cháy tăng.' },
      { q: 'Một phản ứng ở 20 độ C có tốc độ v. Theo Van\'t Hoff (hệ số 2), tốc độ ở 40 độ C tăng bao nhiêu lần?', a: 'Từ 20 lên 40 độ C tăng 20 độ C, tức 2 khoảng 10 độ C. Mỗi khoảng 10 độ C tốc độ tăng 2 lần, nên tổng tăng 2 nhân 2 = 4 lần. Tốc độ ở 40 độ C khoảng 4v.' },
    ],
  },

  'H10HOA-w16-quiz': {
    topic: 'Halogen — Tính chất chung',
    intro: 'Chào các em! Nhóm halogen (nhóm VIIA) gồm F, Cl, Br, I rất đặc trưng. Tuần này ta tìm hiểu cấu hình, tính oxy hoá mạnh và quy luật biến đổi tính chất của nhóm halogen.',
    objectives: [
      'Nêu được các nguyên tố nhóm halogen và cấu hình lớp ngoài cùng.',
      'Hiểu tính chất hoá học đặc trưng: tính oxy hoá mạnh.',
      'Nắm quy luật biến thiên tính oxy hoá và trạng thái của các halogen.',
    ],
    theory: [
      { h: 'Nhóm halogen' },
      { p: 'Halogen là các nguyên tố nhóm VIIA: F, Cl, Br, I, At. Cấu hình lớp ngoài cùng là ns2 np5 (7 electron lớp ngoài), chỉ cần nhận 1 electron để đạt cấu hình bền của khí hiếm.' },
      { h: 'Tính chất hoá học' },
      { ul: [
        'Tính chất đặc trưng: tính oxy hoá mạnh (dễ nhận 1 electron tạo ion X-).',
        'Tính oxy hoá giảm dần: F2 > Cl2 > Br2 > I2 (đi xuống nhóm, bán kính tăng nên khả năng nhận electron giảm).',
      ] },
      { h: 'Trạng thái ở điều kiện thường' },
      { ul: [
        'F2: khí màu vàng nhạt.',
        'Cl2: khí màu vàng lục.',
        'Br2: chất lỏng màu đỏ nâu, dễ bay hơi.',
        'I2: chất rắn, tinh thể tím đen, dễ thăng hoa.',
      ] },
      { note: 'Halogen mạnh hơn đẩy được halogen yếu hơn ra khỏi muối: ví dụ Cl2 + 2NaBr -> 2NaCl + Br2.' },
    ],
    examples: [
      { q: 'Sắp xếp tính oxy hoá của F2, Cl2, Br2, I2 theo chiều giảm dần và giải thích.', a: 'Thứ tự giảm dần: F2 > Cl2 > Br2 > I2. Đi từ F xuống I trong nhóm VIIA, bán kính nguyên tử tăng nên khả năng hút và nhận thêm 1 electron giảm, do đó tính oxy hoá giảm dần.' },
      { q: 'Viết phương trình chứng minh Cl2 có tính oxy hoá mạnh hơn Br2.', a: 'Cl2 đẩy được Br ra khỏi muối bromua: Cl2 + 2NaBr -> 2NaCl + Br2. Cl2 nhận electron tốt hơn (oxy hoá Br- thành Br2), chứng tỏ Cl2 có tính oxy hoá mạnh hơn Br2.' },
    ],
  },

  'H10HOA-w17-quiz': {
    topic: 'Clo và hợp chất của clo',
    intro: 'Các em ơi, clo là halogen quan trọng nhất trong công nghiệp. Tuần này ta tìm hiểu tính chất của khí Cl2, acid HCl, nước Javen và ứng dụng của clo trong khử trùng, sản xuất nhựa.',
    objectives: [
      'Nêu tính chất vật lí và hoá học của khí clo.',
      'Viết phương trình clo phản ứng với hydrogen và với nước.',
      'Biết các hợp chất HCl, nước Javen và ứng dụng của clo.',
    ],
    theory: [
      { h: 'Khí clo Cl2' },
      { p: 'Cl2 là khí màu vàng lục, mùi hắc, độc. Cl2 có tính oxy hoá mạnh.' },
      { h: 'Phản ứng đặc trưng' },
      { ul: [
        'Với hydrogen (cần ánh sáng): H2 + Cl2 -> 2HCl (phản ứng nổ khi có ánh sáng mạnh).',
        'Với kim loại: 2Fe + 3Cl2 -> 2FeCl3 (clo oxy hoá Fe lên +3).',
        'Với nước: Cl2 + H2O cân bằng thuận nghịch HCl + HClO (tạo nước clo).',
        'Với dung dịch NaOH: Cl2 + 2NaOH -> NaCl + NaClO + H2O (nước Javen).',
      ] },
      { h: 'Hợp chất của clo' },
      { ul: [
        'HCl: acid mạnh, phân ly hoàn toàn trong nước.',
        'Nước Javen: hỗn hợp NaCl + NaClO, dùng tẩy trắng và sát trùng.',
      ] },
      { h: 'Ứng dụng' },
      { p: 'Cl2 dùng khử trùng nước sinh hoạt, tẩy trắng, sản xuất nhựa PVC, sản xuất nhiều hoá chất công nghiệp.' },
      { note: 'Trong nước clo, HClO có tính oxy hoá và tính tẩy màu mạnh.' },
    ],
    examples: [
      { q: 'Viết phương trình khi sục khí Cl2 vào nước và cho biết vì sao nước clo có tính tẩy màu.', a: 'Cl2 + H2O cân bằng HCl + HClO. Nước clo có tính tẩy màu vì tạo ra HClO - acid hypoclorơ có tính oxy hoá mạnh, oxy hoá phá huỷ các chất màu và vi khuẩn.' },
      { q: 'Vì sao clo phản ứng với sắt cho FeCl3 chứ không phải FeCl2?', a: 'Cl2 là chất oxy hoá rất mạnh nên oxy hoá Fe lên mức số oxy hoá cao nhất là +3, tạo FeCl3: 2Fe + 3Cl2 -> 2FeCl3. (Nếu dùng HCl chất oxy hoá yếu hơn thì chỉ tạo FeCl2.)' },
    ],
  },

  'H10HOA-w18-quiz': {
    topic: 'Ôn tập học kỳ 1',
    intro: 'Các em thân mến, kết thúc học kỳ 1 ta cùng hệ thống lại các kiến thức trọng tâm: cấu tạo nguyên tử, bảng tuần hoàn, liên kết hoá học, oxy hoá - khử và halogen.',
    objectives: [
      'Hệ thống hoá kiến thức cấu tạo nguyên tử và bảng tuần hoàn.',
      'Củng cố các loại liên kết hoá học.',
      'Ôn lại phản ứng oxy hoá - khử và nhóm halogen.',
    ],
    theory: [
      { h: 'Cấu tạo nguyên tử' },
      { ul: [
        'Nguyên tử = hạt nhân (proton + neutron) + lớp vỏ electron.',
        'A = Z + N; Z = số proton = số electron.',
        'Cấu hình electron theo Pauli, Hund; lớp n chứa tối đa 2n^2 electron.',
      ] },
      { h: 'Bảng tuần hoàn và liên kết' },
      { ul: [
        'Sắp xếp theo Z tăng; chu kì (số lớp e), nhóm A (số e lớp ngoài).',
        'Liên kết ion (kim loại + phi kim, chênh độ âm điện lớn), cộng hoá trị (dùng chung e), kim loại (biển electron).',
      ] },
      { h: 'Oxy hoá - khử và halogen' },
      { ul: [
        'Chất khử nhường e, chất oxy hoá nhận e; cân bằng theo bảo toàn electron.',
        'Halogen nhóm VIIA, tính oxy hoá mạnh, giảm dần F2 > Cl2 > Br2 > I2.',
      ] },
      { note: 'Ôn theo sơ đồ tư duy: nối từ cấu tạo nguyên tử -> vị trí trong bảng -> tính chất -> liên kết.' },
    ],
    examples: [
      { q: 'Nguyên tố X có Z = 17. Xác định cấu hình electron, vị trí trong bảng tuần hoàn và loại nguyên tố.', a: 'Cấu hình: 1s2 2s2 2p6 3s2 3p5. Có 3 lớp electron -> chu kì 3; 7 electron lớp ngoài -> nhóm VIIA. Đó là Cl, một halogen, phi kim có tính oxy hoá mạnh.' },
      { q: 'Cho biết loại liên kết trong NaCl, Cl2 và HCl.', a: 'NaCl: liên kết ion (kim loại Na + phi kim Cl, chênh độ âm điện lớn). Cl2: liên kết cộng hoá trị không cực (2 nguyên tử cùng nguyên tố). HCl: liên kết cộng hoá trị có cực (H và Cl khác độ âm điện).' },
    ],
  },

  'H10HOA-w19-quiz': {
    topic: 'Brom và Iod',
    intro: 'Chào các em vào học kỳ 2! Sau clo, ta tìm hiểu hai halogen tiếp theo: brom và iod. Chúng có trạng thái và phản ứng nhận biết đặc trưng rất thú vị.',
    objectives: [
      'Nêu tính chất vật lí của brom và iod.',
      'Viết phản ứng của brom, iod với hydrogen.',
      'Biết phản ứng nhận biết iod bằng hồ tinh bột.',
    ],
    theory: [
      { h: 'Brom (Br2)' },
      { ul: [
        'Là chất lỏng màu đỏ nâu, dễ bay hơi, độc.',
        'Tác dụng với hydrogen: H2 + Br2 -> 2HBr (cần nhiệt độ, êm dịu hơn clo).',
      ] },
      { h: 'Iod (I2)' },
      { ul: [
        'Là chất rắn, tinh thể tím đen, dễ thăng hoa tạo hơi màu tím.',
        'Tác dụng với hydrogen: H2 + I2 cân bằng 2HI (phản ứng thuận nghịch, khó hơn).',
      ] },
      { h: 'Nhận biết iod' },
      { p: 'Iod gặp hồ tinh bột tạo màu xanh đen đặc trưng - dùng để nhận biết iod hoặc nhận biết tinh bột.' },
      { h: 'So sánh tính oxy hoá' },
      { p: 'Tính oxy hoá Br2 > I2 (theo quy luật chung F2 > Cl2 > Br2 > I2). Br2 đẩy được I ra khỏi muối iodua: Br2 + 2NaI -> 2NaBr + I2.' },
      { note: 'Thăng hoa của iod (rắn -> hơi không qua lỏng) là tính chất rất dễ nhận ra trong thí nghiệm.' },
    ],
    examples: [
      { q: 'Làm thế nào để nhận biết dung dịch chứa iod?', a: 'Nhỏ vài giọt hồ tinh bột vào dung dịch. Nếu xuất hiện màu xanh đen đặc trưng thì chứng tỏ có iod (I2). Đây là phản ứng đặc trưng giữa iod và tinh bột.' },
      { q: 'Viết phương trình và giải thích vì sao Br2 đẩy được iod ra khỏi NaI.', a: 'Br2 + 2NaI -> 2NaBr + I2. Vì tính oxy hoá Br2 mạnh hơn I2 nên Br2 oxy hoá I- thành I2, còn bản thân Br2 bị khử thành Br-. Halogen mạnh hơn đẩy halogen yếu hơn ra khỏi muối.' },
    ],
  },

  'H10HOA-w20-quiz': {
    topic: 'Oxygen và lưu huỳnh — Tính chất chung',
    intro: 'Các em ơi, nhóm VIA gồm oxygen và lưu huỳnh là những phi kim quan trọng. Tuần này ta tìm hiểu cấu hình, trạng thái và vai trò của oxygen, lưu huỳnh.',
    objectives: [
      'Nêu vị trí và cấu hình lớp ngoài cùng của nhóm VIA.',
      'Biết tính chất vật lí của oxygen và lưu huỳnh.',
      'Hiểu số oxy hoá thường gặp và vai trò của oxygen.',
    ],
    theory: [
      { h: 'Nhóm VIA' },
      { p: 'Oxygen và lưu huỳnh thuộc nhóm VIA, cấu hình lớp ngoài cùng ns2 np4 (6 electron lớp ngoài), có xu hướng nhận 2 electron để đạt cấu hình bền.' },
      { h: 'Oxygen (O2)' },
      { ul: [
        'Là khí không màu, không mùi, ít tan trong nước.',
        'Số oxy hoá thường gặp là -2 (trừ peroxide -1 và OF2 là +2).',
        'Vai trò: duy trì sự sống (hô hấp), duy trì sự cháy, là chất oxy hoá mạnh.',
      ] },
      { h: 'Lưu huỳnh (S)' },
      { ul: [
        'Là chất rắn màu vàng, không tan trong nước.',
        'Có thể có số oxy hoá -2, 0, +4, +6 trong các hợp chất.',
      ] },
      { note: 'Oxygen là nguyên tố phổ biến nhất trong vỏ Trái Đất, không thể thiếu cho sự sống và quá trình cháy.' },
    ],
    examples: [
      { q: 'Xác định số oxy hoá của S trong các chất: S, SO2, SO3, H2SO4.', a: 'S đơn chất: 0. SO2: S + 2.(-2) = 0 -> S = +4. SO3: S + 3.(-2) = 0 -> S = +6. H2SO4: 2.(+1) + S + 4.(-2) = 0 -> S = +6. Lưu huỳnh thể hiện nhiều số oxy hoá khác nhau.' },
      { q: 'Vì sao oxygen được gọi là chất duy trì sự sống và sự cháy?', a: 'Oxygen tham gia hô hấp tế bào (oxy hoá thức ăn để sinh năng lượng) nên duy trì sự sống. Oxygen cũng là chất oxy hoá trong các phản ứng cháy (oxy hoá nhiên liệu toả nhiệt), nên duy trì sự cháy. Không có O2 thì cả hô hấp và sự cháy đều dừng.' },
    ],
  },

  'H10HOA-w21-quiz': {
    topic: 'Lưu huỳnh và hợp chất của lưu huỳnh',
    intro: 'Chào các em! Lưu huỳnh tạo nhiều hợp chất quan trọng như SO2, SO3, H2SO4. Tuần này ta học tính chất các hợp chất này và hiểu hiện tượng mưa acid.',
    objectives: [
      'Nêu tính chất của SO2 và phản ứng tạo SO3.',
      'Hiểu tính chất acid sulfuric H2SO4, đặc biệt tính oxy hoá khi đặc nóng.',
      'Giải thích hiện tượng mưa acid.',
    ],
    theory: [
      { h: 'Sulfur dioxide SO2' },
      { ul: [
        'Là khí không màu, mùi hắc, độc, gây ô nhiễm không khí.',
        'Bị oxy hoá bởi O2 (xúc tác V2O5): 2SO2 + O2 -> 2SO3.',
      ] },
      { h: 'Acid sulfuric H2SO4' },
      { ul: [
        'Là acid mạnh, hút ẩm mạnh.',
        'H2SO4 đặc nóng có tính oxy hoá rất mạnh, oxy hoá được cả kim loại kém hoạt động như Cu, Ag.',
        'Phản ứng với đồng: Cu + 2H2SO4(đặc, nóng) -> CuSO4 + SO2 + 2H2O.',
      ] },
      { h: 'Ứng dụng H2SO4' },
      { p: 'H2SO4 là hoá chất công nghiệp quan trọng bậc nhất: sản xuất phân bón, hoá chất, chất tẩy rửa, ắc quy (pin).' },
      { h: 'Mưa acid' },
      { p: 'Khí thải SO2 và NOx trong khí quyển hoà tan vào nước mưa tạo các acid (H2SO4, HNO3), gây mưa acid làm hại cây cối, công trình.' },
      { note: 'Khi pha loãng H2SO4 đặc phải rót từ từ acid vào nước, tuyệt đối không làm ngược lại vì toả nhiệt mạnh gây bắn.' },
    ],
    examples: [
      { q: 'Viết phương trình điều chế SO3 từ SO2 và nêu vai trò của V2O5.', a: '2SO2 + O2 -> 2SO3 (điều kiện: nhiệt độ, xúc tác V2O5). V2O5 là chất xúc tác, làm tăng tốc độ phản ứng nhưng không bị tiêu hao. Đây là một bước trong sản xuất H2SO4 công nghiệp.' },
      { q: 'Vì sao H2SO4 đặc nóng phản ứng được với Cu còn HCl thì không?', a: 'Cu là kim loại đứng sau H trong dãy hoạt động nên không phản ứng với acid thường như HCl. Nhưng H2SO4 đặc nóng có tính oxy hoá mạnh (nhờ S+6), oxy hoá được Cu: Cu + 2H2SO4(đặc, nóng) -> CuSO4 + SO2 + 2H2O.' },
    ],
  },

  'H10HOA-w22-quiz': {
    topic: 'Cân bằng hoá học — Phản ứng thuận nghịch',
    intro: 'Các em thân mến, nhiều phản ứng xảy ra theo cả hai chiều và đạt tới cân bằng. Tuần này ta tìm hiểu phản ứng thuận nghịch, trạng thái cân bằng và nguyên lý Le Chatelier.',
    objectives: [
      'Hiểu phản ứng thuận nghịch và trạng thái cân bằng hoá học.',
      'Biết hằng số cân bằng K phụ thuộc nhiệt độ.',
      'Vận dụng nguyên lý Le Chatelier để dự đoán chiều chuyển dịch cân bằng.',
    ],
    theory: [
      { h: 'Phản ứng thuận nghịch' },
      { p: 'Phản ứng thuận nghịch xảy ra theo hai chiều ngược nhau trong cùng điều kiện, ký hiệu bằng mũi tên hai chiều (cân bằng).' },
      { h: 'Trạng thái cân bằng' },
      { p: 'Là trạng thái khi tốc độ phản ứng thuận bằng tốc độ phản ứng nghịch. Đây là cân bằng động: phản ứng vẫn xảy ra nhưng nồng độ các chất không đổi.' },
      { h: 'Hằng số cân bằng K' },
      { p: 'Hằng số cân bằng K đặc trưng cho mức độ phản ứng, chỉ phụ thuộc vào nhiệt độ (không phụ thuộc nồng độ ban đầu).' },
      { h: 'Nguyên lý Le Chatelier' },
      { ul: [
        'Khi tác động vào hệ cân bằng (đổi nồng độ, áp suất, nhiệt độ), cân bằng chuyển dịch theo chiều chống lại sự thay đổi đó.',
        'Tăng nồng độ chất phản ứng -> cân bằng dịch theo chiều thuận (tiêu thụ bớt).',
        'Tăng nhiệt độ -> cân bằng dịch theo chiều thu nhiệt (với phản ứng toả nhiệt thì dịch theo chiều nghịch).',
      ] },
      { note: 'Le Chatelier được ứng dụng trong công nghiệp để tăng hiệu suất, ví dụ tổng hợp NH3 từ N2 và H2.' },
    ],
    examples: [
      { q: 'Cho cân bằng N2 + 3H2 cân bằng 2NH3 (toả nhiệt). Tăng áp suất, cân bằng dịch chuyển theo chiều nào?', a: 'Vế trái có 4 phân tử khí (1 N2 + 3 H2), vế phải có 2 phân tử khí (2 NH3). Khi tăng áp suất, cân bằng dịch theo chiều giảm số phân tử khí (chống lại áp suất tăng), tức chiều thuận tạo NH3.' },
      { q: 'Trong phản ứng toả nhiệt 2SO2 + O2 cân bằng 2SO3, tăng nhiệt độ ảnh hưởng thế nào đến cân bằng?', a: 'Phản ứng thuận toả nhiệt nên chiều nghịch thu nhiệt. Khi tăng nhiệt độ, cân bằng dịch theo chiều thu nhiệt (chống lại sự tăng nhiệt), tức chiều nghịch, làm giảm lượng SO3. Vì vậy thực tế dùng nhiệt độ vừa phải kèm xúc tác.' },
    ],
  },

  'H10HOA-w23-quiz': {
    topic: 'Cân bằng phương trình hoá học và tính toán',
    intro: 'Chào các em! Tuần này ta củng cố các công thức tính toán hoá học cốt lõi: số mol, thể tích khí, nồng độ - những công cụ để giải mọi bài tập định lượng.',
    objectives: [
      'Phát biểu định luật bảo toàn khối lượng.',
      'Vận dụng công thức tính số mol, thể tích khí, số hạt.',
      'Tính nồng độ mol và nồng độ phần trăm.',
    ],
    theory: [
      { h: 'Định luật bảo toàn khối lượng' },
      { p: 'Trong một phản ứng hoá học, tổng khối lượng các chất tham gia bằng tổng khối lượng các sản phẩm (Lomonosov - Lavoisier). Đây là cơ sở để cân bằng phương trình.' },
      { h: 'Các công thức tính toán cốt lõi' },
      { ul: [
        'Số mol: n = m / M (m là khối lượng gam, M là khối lượng mol).',
        'Số hạt: số hạt = n nhân NA, với NA = 6,022 nhân 10 mũ 23.',
        'Thể tích khí ở đktc (0 độ C, 1 atm): V = n nhân 22,4 (lít).',
        'Nồng độ mol: CM = n / V (mol/lít).',
        'Nồng độ phần trăm: C% = (khối lượng chất tan / khối lượng dung dịch) nhân 100%.',
      ] },
      { h: 'Thể tích mol chất khí' },
      { p: 'Ở điều kiện tiêu chuẩn (đktc: 0 độ C, 1 atm), 1 mol chất khí bất kì chiếm thể tích 22,4 lít. Do đó V = n nhân 22,4 (lít).' },
      { note: 'Khi giải bài tập: viết và cân bằng phương trình -> tính số mol -> dùng tỉ lệ hệ số -> tính đại lượng cần tìm.' },
    ],
    examples: [
      { q: 'Tính số mol và số phân tử có trong 8 g khí O2.', a: 'M(O2) = 32 g/mol. Số mol n = m/M = 8/32 = 0,25 mol. Số phân tử = n nhân NA = 0,25 nhân 6,022 nhân 10 mũ 23 = 1,5055 nhân 10 mũ 23 phân tử.' },
      { q: 'Hoà tan 4 g NaOH vào nước được 200 mL dung dịch. Tính nồng độ mol.', a: 'M(NaOH) = 40 g/mol. Số mol n = 4/40 = 0,1 mol. Thể tích V = 200 mL = 0,2 L. Nồng độ CM = n/V = 0,1/0,2 = 0,5 mol/L (0,5 M).' },
    ],
  },

  'H10HOA-w24-quiz': {
    topic: 'Ôn tập Cấu tạo nguyên tử',
    intro: 'Các em ơi, ta ôn lại phần cấu tạo nguyên tử: cách viết cấu hình electron, tính số hạt và xác định vị trí nguyên tố trong bảng tuần hoàn.',
    objectives: [
      'Củng cố cách viết cấu hình electron và quy tắc số electron tối đa.',
      'Tính số proton, electron, neutron của nguyên tử.',
      'Xác định nhóm và mối quan hệ giữa các nguyên tố.',
    ],
    theory: [
      { h: 'Sức chứa electron các lớp' },
      { ul: [
        'Lớp 1 (n=1): tối đa 2 electron.',
        'Lớp 2 (n=2): tối đa 2.2^2 = 8 electron.',
        'Lớp 3 (n=3): tối đa 18 electron.',
      ] },
      { h: 'Cấu hình một số nguyên tố cần nhớ' },
      { ul: [
        'Na (Z=11): 1s2 2s2 2p6 3s1 (nhóm IA).',
        'Cl (Z=17): 1s2 2s2 2p6 3s2 3p5 (nhóm VIIA).',
        'Ar (Z=18): 1s2 2s2 2p6 3s2 3p6 (khí hiếm).',
      ] },
      { h: 'Tính số hạt' },
      { p: 'Số proton = Z = số electron; số neutron N = A - Z.' },
      { note: 'Nguyên tố cùng nhóm có cùng số electron lớp ngoài cùng nên tính chất tương tự.' },
    ],
    examples: [
      { q: 'Viết cấu hình electron của K (Z=19) và xác định vị trí trong bảng tuần hoàn.', a: 'Cấu hình: 1s2 2s2 2p6 3s2 3p6 4s1. Có 4 lớp electron -> chu kì 4; 1 electron lớp ngoài (4s1) -> nhóm IA. K là kim loại kiềm, cùng nhóm với Na, Li.' },
      { q: 'Nguyên tử của nguyên tố X có A = 35, N = 18. Tính Z và viết cấu hình electron.', a: 'Z = A - N = 35 - 18 = 17. Vậy X là Cl. Cấu hình electron: 1s2 2s2 2p6 3s2 3p5, thuộc nhóm VIIA (halogen).' },
    ],
  },

  'H10HOA-w25-quiz': {
    topic: 'Ôn tập Bảng tuần hoàn và Liên kết',
    intro: 'Chào các em! Ta ôn tập mối liên hệ giữa vị trí trong bảng tuần hoàn và loại liên kết hình thành, cùng quy luật biến đổi tính chất.',
    objectives: [
      'Củng cố quy luật tính kim loại - phi kim, độ âm điện.',
      'Xác định loại liên kết trong các hợp chất tiêu biểu.',
      'Nhận diện các nhóm nguyên tố quan trọng.',
    ],
    theory: [
      { h: 'Quy luật trong bảng tuần hoàn' },
      { ul: [
        'Trong chu kì (trái sang phải): tính kim loại giảm, tính phi kim và độ âm điện tăng.',
        'Trong nhóm A (trên xuống): tính kim loại tăng, tính phi kim giảm.',
        'Phi kim mạnh nhất: F. Kim loại mạnh nhất ở góc dưới trái.',
      ] },
      { h: 'Các nhóm tiêu biểu' },
      { ul: [
        'Nhóm IA: kim loại kiềm (Li, Na, K).',
        'Nhóm IIA: kim loại kiềm thổ (Mg, Ca, Ba).',
        'Nhóm VIIA: halogen (F, Cl, Br, I).',
      ] },
      { h: 'Xác định loại liên kết' },
      { ul: [
        'Kim loại + phi kim, chênh độ âm điện lớn -> liên kết ion (NaCl).',
        'Hai phi kim cùng nguyên tố -> cộng hoá trị không cực (O2).',
        'Hai phi kim khác độ âm điện -> cộng hoá trị có cực (H2O, HCl).',
      ] },
      { note: 'Quy tắc thực hành: chênh độ âm điện càng lớn thì liên kết càng thiên về ion.' },
    ],
    examples: [
      { q: 'Trong chu kì 3, nguyên tố nào có tính kim loại mạnh nhất, phi kim mạnh nhất?', a: 'Chu kì 3 gồm Na, Mg, Al, Si, P, S, Cl, Ar. Tính kim loại mạnh nhất ở bên trái: Na. Tính phi kim mạnh nhất ở bên phải (trừ khí hiếm Ar): Cl. Vì trong chu kì, tính kim loại giảm và tính phi kim tăng từ trái sang phải.' },
      { q: 'Xác định loại liên kết trong MgO và CO2.', a: 'MgO: Mg là kim loại, O là phi kim, chênh độ âm điện lớn nên là liên kết ion. CO2: C và O đều là phi kim, khác độ âm điện nên là liên kết cộng hoá trị có cực (mỗi liên kết C=O phân cực).' },
    ],
  },

  'H10HOA-w26-quiz': {
    topic: 'Ôn tập Phản ứng oxy hoá - khử',
    intro: 'Các em thân mến, ta ôn luyện kỹ năng xác định số oxy hoá, nhận biết chất khử - chất oxy hoá và cân bằng phản ứng oxy hoá - khử.',
    objectives: [
      'Thành thạo xác định số oxy hoá của nguyên tố trong hợp chất, ion.',
      'Phân biệt chất khử và chất oxy hoá trong phản ứng.',
      'Nắm nguyên tắc cân bằng oxy hoá - khử.',
    ],
    theory: [
      { h: 'Cách xác định số oxy hoá nâng cao' },
      { ul: [
        'KMnO4: K = +1, O = -2; gọi Mn = x: (+1) + x + 4.(-2) = 0 -> x = +7.',
        'K2Cr2O7: 2.(+1) + 2.x + 7.(-2) = 0 -> 2x = +12 -> Cr = +6.',
      ] },
      { h: 'Nhận biết chất khử, chất oxy hoá' },
      { ul: [
        'Chất khử: số oxy hoá tăng sau phản ứng (nhường e).',
        'Chất oxy hoá: số oxy hoá giảm sau phản ứng (nhận e).',
      ] },
      { h: 'Nguyên tắc cân bằng' },
      { p: 'Cân bằng oxy hoá - khử phải đảm bảo: bảo toàn electron (e nhường = e nhận) + bảo toàn số nguyên tử mỗi nguyên tố + bảo toàn điện tích.' },
      { note: 'Mn trong KMnO4 (+7) và Cr trong K2Cr2O7 (+6) là những chất oxy hoá rất mạnh thường gặp.' },
    ],
    examples: [
      { q: 'Cân bằng phản ứng: Fe + HCl -> FeCl2 + H2 bằng phương pháp electron.', a: 'Quá trình oxy hoá: Fe (0) -> Fe (+2) + 2e. Quá trình khử: 2H (+1) + 2e -> H2 (0). Số e nhường = nhận = 2, nên hệ số đơn giản: Fe + 2HCl -> FeCl2 + H2. Fe là chất khử, H+ là chất oxy hoá.' },
      { q: 'Xác định chất oxy hoá trong phản ứng Cu + 4HNO3(đặc) -> Cu(NO3)2 + 2NO2 + 2H2O.', a: 'Cu (0) -> Cu (+2): bị oxy hoá, là chất khử. N trong HNO3 (+5) -> N trong NO2 (+4): nhận e, bị khử. Vậy HNO3 (do N+5) là chất oxy hoá.' },
    ],
  },

  'H10HOA-w27-quiz': {
    topic: 'Ôn tập Năng lượng và Tốc độ',
    intro: 'Chào các em! Ta ôn lại phần năng lượng hoá học (toả/thu nhiệt, định luật Hess) và tốc độ phản ứng (các yếu tố ảnh hưởng, năng lượng hoạt hoá).',
    objectives: [
      'Củng cố dấu của delta H với phản ứng toả/thu nhiệt.',
      'Ôn định luật Hess và cách tính delta H.',
      'Nắm các yếu tố ảnh hưởng tốc độ và khái niệm năng lượng hoạt hoá.',
    ],
    theory: [
      { h: 'Năng lượng hoá học' },
      { ul: [
        'Toả nhiệt: delta H < 0 (đốt cháy, phản ứng nổ).',
        'Thu nhiệt: delta H > 0 (quang hợp, nung vôi).',
        'Định luật Hess: delta H chỉ phụ thuộc trạng thái đầu - cuối, tính được gián tiếp qua chu trình.',
      ] },
      { h: 'Tốc độ phản ứng' },
      { ul: [
        'Yếu tố ảnh hưởng: nồng độ, nhiệt độ, áp suất (khí), diện tích bề mặt, chất xúc tác.',
        'Quy tắc Van\'t Hoff: tăng 10 độ C, tốc độ tăng 2 đến 4 lần.',
        'Chất xúc tác: tăng tốc độ, không bị tiêu hao, hạ năng lượng hoạt hoá.',
      ] },
      { h: 'Năng lượng hoạt hoá' },
      { p: 'Năng lượng hoạt hoá Ea là năng lượng tối thiểu cần có để phản ứng xảy ra (rào cản năng lượng). Ea càng nhỏ, phản ứng càng dễ xảy ra.' },
      { note: 'Chất xúc tác không làm thay đổi delta H mà chỉ hạ Ea để phản ứng nhanh hơn.' },
    ],
    examples: [
      { q: 'Cho phản ứng có delta H = +180 kJ/mol. Đây là phản ứng gì và cần điều kiện gì?', a: 'delta H > 0 nên đây là phản ứng thu nhiệt: phản ứng hấp thụ 180 kJ nhiệt cho mỗi mol. Để xảy ra cần cung cấp năng lượng (đun nóng, chiếu sáng...), ví dụ như nung CaCO3 hay quang hợp.' },
      { q: 'Vì sao chất xúc tác làm tăng tốc độ phản ứng nhưng không thay đổi delta H?', a: 'Chất xúc tác mở một con đường phản ứng mới có năng lượng hoạt hoá Ea thấp hơn, giúp nhiều phân tử vượt rào cản nên phản ứng nhanh hơn. Nhưng delta H chỉ phụ thuộc trạng thái đầu và cuối (định luật Hess), mà xúc tác không làm đổi trạng thái đó, nên delta H không đổi.' },
    ],
  },

  'H10HOA-w28-quiz': {
    topic: 'Ôn tập Halogen và lưu huỳnh',
    intro: 'Các em ơi, ta ôn lại nhóm halogen và nhóm oxygen - lưu huỳnh: tính chất, độ mạnh acid, phản ứng đặc trưng và nhận biết.',
    objectives: [
      'So sánh độ mạnh các acid hydrohalic.',
      'Củng cố phản ứng của clo, brom, iod.',
      'Ôn tính chất SO2 và H2SO4 đặc nóng.',
    ],
    theory: [
      { h: 'Acid hydrohalic' },
      { p: 'Độ mạnh acid (mức độ phân ly) tăng dần: HF < HCl < HBr < HI. HF là acid yếu (liên kết H-F bền), HI mạnh nhất.' },
      { h: 'Phản ứng đặc trưng halogen' },
      { ul: [
        'Cl2 + Fe: 2Fe + 3Cl2 -> 2FeCl3 (Cl2 oxy hoá Fe lên +3).',
        'Halogen mạnh đẩy halogen yếu: Cl2 + 2NaBr -> 2NaCl + Br2.',
        'Nhận biết iod: I2 + hồ tinh bột -> màu xanh đen.',
      ] },
      { h: 'Hợp chất lưu huỳnh' },
      { ul: [
        'SO2: khí không màu, mùi hắc, gây mưa acid.',
        'H2SO4 đặc nóng + Cu: Cu + 2H2SO4 -> CuSO4 + SO2 + 2H2O.',
      ] },
      { note: 'Lưu ý phân biệt: độ bền liên kết HF > HCl nhưng độ mạnh acid lại HF < HCl, đừng nhầm hai khái niệm.' },
    ],
    examples: [
      { q: 'Sắp xếp độ mạnh acid của HF, HCl, HBr, HI và giải thích.', a: 'Độ mạnh tăng dần: HF < HCl < HBr < HI. Đi từ F xuống I, bán kính tăng làm liên kết H-X dài và yếu hơn, dễ phân ly cho H+ hơn, nên tính acid tăng. HI mạnh nhất, HF yếu nhất.' },
      { q: 'Viết phương trình H2SO4 đặc nóng tác dụng với Cu và xác định vai trò của H2SO4.', a: 'Cu + 2H2SO4(đặc, nóng) -> CuSO4 + SO2 + 2H2O. Trong phản ứng, S+6 trong H2SO4 nhận electron giảm xuống S+4 (SO2) nên H2SO4 đóng vai trò chất oxy hoá; Cu (0 -> +2) là chất khử.' },
    ],
  },

  'H10HOA-w29-quiz': {
    topic: 'Ôn tập Cân bằng hoá học và tính toán',
    intro: 'Chào các em! Ta ôn cân bằng hoá học (hằng số K, Le Chatelier) cùng các bài toán tính số mol, thể tích, nồng độ.',
    objectives: [
      'Củng cố hằng số cân bằng K và nguyên lý Le Chatelier.',
      'Ôn các công thức tính toán định lượng.',
      'Vận dụng giải bài toán hoá học.',
    ],
    theory: [
      { h: 'Cân bằng hoá học' },
      { ul: [
        'Hằng số cân bằng K chỉ phụ thuộc nhiệt độ.',
        'Le Chatelier: khi thay đổi nồng độ, áp suất, nhiệt độ, cân bằng dịch chuyển theo chiều chống lại sự thay đổi.',
      ] },
      { h: 'Công thức tính toán cần nhớ' },
      { ul: [
        'n = m / M; số hạt = n nhân 6,022 nhân 10 mũ 23.',
        'Thể tích khí (đktc) = n nhân 22,4 lít.',
        'Khối lượng riêng nước lỏng xấp xỉ 1 g/mL, nên 1 mol H2O lỏng (18 g) chiếm khoảng 18 mL.',
        'CM = n / V (mol/L); C% theo khối lượng dung dịch.',
      ] },
      { h: 'Quy trình giải bài toán' },
      { p: 'Đổi dữ kiện ra số mol -> viết và cân bằng phương trình -> dùng tỉ lệ hệ số mol để suy ra số mol chất cần tìm -> đổi ra khối lượng, thể tích hoặc nồng độ.' },
      { note: 'Phân biệt: 22,4 L là thể tích 1 mol KHÍ ở đktc, không áp dụng cho chất lỏng hay rắn.' },
    ],
    examples: [
      { q: 'Tính khối lượng của 5,6 lít khí O2 ở đktc.', a: 'Số mol n = V/22,4 = 5,6/22,4 = 0,25 mol. Khối lượng m = n nhân M = 0,25 nhân 32 = 8 g. Vậy 5,6 lít O2 ở đktc nặng 8 g.' },
      { q: 'Cho cân bằng toả nhiệt 2SO2 + O2 cân bằng 2SO3. Muốn tăng hiệu suất tạo SO3 nên điều chỉnh nhiệt độ và áp suất thế nào?', a: 'Phản ứng thuận toả nhiệt nên giảm nhiệt độ giúp dịch theo chiều thuận (nhưng quá thấp thì chậm, nên dùng nhiệt độ vừa phải + xúc tác). Vế trái 3 mol khí, vế phải 2 mol khí, nên tăng áp suất làm cân bằng dịch theo chiều thuận, tăng hiệu suất SO3.' },
    ],
  },

  'H10HOA-w30-quiz': {
    topic: 'Tính chất nguyên tố theo nhóm A — Tổng hợp',
    intro: 'Các em thân mến, ta tổng hợp đặc điểm các nhóm A tiêu biểu và quy luật biến đổi tính chất - bức tranh toàn cảnh của bảng tuần hoàn.',
    objectives: [
      'Nắm cấu hình và xu hướng cho/nhận electron của các nhóm A.',
      'Củng cố quy luật biến đổi độ âm điện.',
      'Hiểu vì sao khí hiếm bền và một số ngoại lệ.',
    ],
    theory: [
      { h: 'Đặc điểm các nhóm A' },
      { ul: [
        'Nhóm IA (kim loại kiềm): ns1, 1 electron ngoài, dễ nhường 1e.',
        'Nhóm IIA (kiềm thổ): ns2, 2 electron ngoài, dễ nhường 2e.',
        'Nhóm VIIA (halogen): ns2 np5, 7 electron ngoài, dễ nhận 1e.',
        'Nhóm VIIIA (khí hiếm): cấu hình bền (8 electron ngoài, trừ He có 2), khó phản ứng.',
      ] },
      { h: 'Quy luật biến đổi' },
      { p: 'Trong chu kì, độ âm điện tăng từ trái sang phải; trong nhóm, độ âm điện giảm từ trên xuống.' },
      { h: 'Ngoại lệ khí hiếm' },
      { p: 'Các khí hiếm nhẹ (He, Ne, Ar) rất trơ; nhưng Xe có thể tạo một số hợp chất với F, O như XeF4, XeO3 trong điều kiện đặc biệt.' },
      { note: 'Nhớ "kim loại điển hình dễ cho e, phi kim điển hình dễ nhận e" để dự đoán liên kết và phản ứng.' },
    ],
    examples: [
      { q: 'Vì sao kim loại nhóm IA dễ nhường electron còn halogen nhóm VIIA dễ nhận electron?', a: 'Kim loại IA có 1 electron lớp ngoài (ns1), nhường 1e là đạt cấu hình bền của khí hiếm nên rất dễ nhường. Halogen VIIA có 7 electron ngoài (ns2 np5), chỉ cần nhận 1e là đạt cấu hình bền nên dễ nhận electron. Cả hai đều hướng tới cấu hình bền vững.' },
      { q: 'So sánh độ âm điện của các nguyên tố Na, P, Cl (chu kì 3).', a: 'Trong chu kì 3, độ âm điện tăng từ trái sang phải. Thứ tự vị trí: Na (trái) - P (giữa) - Cl (phải). Vậy độ âm điện: Na < P < Cl. Cl có độ âm điện lớn nhất, Na nhỏ nhất.' },
    ],
  },

  'H10HOA-w31-quiz': {
    topic: 'Ôn tập Liên kết hoá học tổng hợp',
    intro: 'Chào các em! Ta tổng hợp toàn bộ các loại liên kết: ion, cộng hoá trị (có cực/không cực), cho - nhận, kim loại và liên kết hydro - cùng vai trò của chúng.',
    objectives: [
      'So sánh độ mạnh và bản chất các loại liên kết.',
      'Xác định loại liên kết trong các hợp chất tiêu biểu.',
      'Hiểu vai trò của liên kết hydro và liên kết kim loại.',
    ],
    theory: [
      { h: 'Tổng hợp các loại liên kết' },
      { ul: [
        'Liên kết ion: lực hút giữa ion trái dấu, mạnh (NaCl, MgO).',
        'Cộng hoá trị: dùng chung cặp electron; có cực khi chênh độ âm điện, không cực khi cùng nguyên tố.',
        'Cho - nhận: cặp electron chung chỉ do một nguyên tử cung cấp (NH4+).',
        'Liên kết kim loại: ion dương + biển electron tự do.',
        'Liên kết hydro: yếu hơn cộng hoá trị, mạnh hơn Van der Waals.',
      ] },
      { h: 'So sánh độ mạnh (tương đối)' },
      { p: 'Liên kết ion và cộng hoá trị (liên kết trong phân tử) mạnh; liên kết hydro và lực Van der Waals (giữa các phân tử) yếu hơn nhiều.' },
      { h: 'Vai trò đặc biệt' },
      { ul: [
        'Liên kết hydro: quyết định nhiệt độ sôi cao của H2O, giữ cấu trúc DNA.',
        'Liên kết kim loại: giúp kim loại dẫn điện, dẫn nhiệt tốt và có tính dẻo.',
      ] },
      { note: 'Liên kết trong CH4 là cộng hoá trị không cực (C và H chênh độ âm điện nhỏ).' },
    ],
    examples: [
      { q: 'Xác định loại liên kết trong các chất: NaCl, CH4, NH4Cl.', a: 'NaCl: liên kết ion. CH4: liên kết cộng hoá trị (C-H ít phân cực). NH4Cl: có cả liên kết ion (giữa NH4+ và Cl-) và liên kết cộng hoá trị/cho-nhận trong ion NH4+. Đây là ví dụ một chất có nhiều loại liên kết.' },
      { q: 'Vì sao đồng (Cu) dẫn điện tốt còn kim cương (C) thì không?', a: 'Cu có liên kết kim loại với các electron tự do di chuyển trong toàn khối nên dẫn điện tốt. Kim cương có liên kết cộng hoá trị bền, mọi electron đều định vị trong các liên kết C-C, không có electron tự do nên không dẫn điện.' },
    ],
  },

  'H10HOA-w32-quiz': {
    topic: 'Bài tập tổng hợp 1',
    intro: 'Các em ơi, tuần này ta luyện các bài tập định lượng: tính phân tử khối, số mol, thể tích, cân bằng phương trình và xác định số oxy hoá.',
    objectives: [
      'Tính phân tử khối và số mol.',
      'Tính thể tích khí và số phân tử.',
      'Cân bằng phương trình và xác định số oxy hoá.',
    ],
    theory: [
      { h: 'Phân tử khối' },
      { p: 'Phân tử khối = tổng khối lượng nguyên tử các nguyên tố. Ví dụ H2SO4 = 2.1 + 32 + 4.16 = 98 u.' },
      { h: 'Các bước giải bài định lượng' },
      { ul: [
        'Tính phân tử khối M, rồi n = m / M.',
        'Thể tích khí (đktc): V = n nhân 22,4 lít.',
        'Số phân tử = n nhân 6,022 nhân 10 mũ 23.',
      ] },
      { h: 'Cân bằng phương trình thông dụng' },
      { p: 'Ví dụ: 2Al + 6HCl -> 2AlCl3 + 3H2 (cân bằng Al: 2, H: 6, Cl: 6).' },
      { note: 'Luôn kiểm tra: số nguyên tử mỗi nguyên tố hai vế phải bằng nhau sau khi cân bằng.' },
    ],
    examples: [
      { q: 'Tính phân tử khối của H2SO4 và số mol có trong 9,8 g H2SO4.', a: 'Phân tử khối H2SO4 = 2.1 + 32 + 4.16 = 2 + 32 + 64 = 98 u. Số mol n = m/M = 9,8/98 = 0,1 mol.' },
      { q: 'Cân bằng phương trình: Al + HCl -> AlCl3 + H2.', a: 'Al hoá trị III, HCl hoá trị I. Cân bằng: 2Al + 6HCl -> 2AlCl3 + 3H2. Kiểm tra: Al (2=2), Cl (6=2.3=6), H (6=3.2=6). Phương trình đã cân bằng.' },
    ],
  },

  'H10HOA-w33-quiz': {
    topic: 'Bài tập tổng hợp 2',
    intro: 'Chào các em! Tuần này luyện bài tập tổng hợp khó hơn: tính theo phương trình, nồng độ, pH và nhận diện loại phản ứng.',
    objectives: [
      'Tính toán theo phương trình hoá học (khối lượng, thể tích).',
      'Tính nồng độ mol và pH của dung dịch acid mạnh.',
      'Nhận diện loại phản ứng (tự oxy hoá - tự khử).',
    ],
    theory: [
      { h: 'Tính theo phương trình' },
      { p: 'Quy trình: cân bằng phương trình -> tính số mol chất đã biết -> dùng tỉ lệ hệ số tìm số mol chất cần -> đổi ra khối lượng hoặc thể tích.' },
      { h: 'Nồng độ và pH' },
      { ul: [
        'CM = n / V.',
        'Với acid mạnh đơn (HCl): [H+] = nồng độ acid; pH = -log[H+].',
        'Ví dụ HCl 0,1 M có [H+] = 0,1 nên pH = -log(0,1) = 1.',
      ] },
      { h: 'Phản ứng tự oxy hoá - tự khử' },
      { p: 'Là phản ứng mà cùng một nguyên tố vừa tăng vừa giảm số oxy hoá. Ví dụ Cl2 + 2NaOH -> NaCl + NaClO + H2O: Cl (0) vừa lên +1 (NaClO) vừa xuống -1 (NaCl).' },
      { note: 'SO2 tan trong nước tạo H2SO3 (acid yếu), còn SO3 tan tạo H2SO4 (acid mạnh) - đừng nhầm.' },
    ],
    examples: [
      { q: 'Cho 2,4 g Mg phản ứng vừa đủ với HCl theo Mg + 2HCl -> MgCl2 + H2. Tính thể tích H2 ở đktc.', a: 'Số mol Mg = 2,4/24 = 0,1 mol. Theo phương trình, tỉ lệ Mg : H2 = 1 : 1 nên n(H2) = 0,1 mol. Thể tích H2 = 0,1 nhân 22,4 = 2,24 lít.' },
      { q: 'Phản ứng Cl2 + 2NaOH -> NaCl + NaClO + H2O thuộc loại nào? Giải thích bằng số oxy hoá.', a: 'Đây là phản ứng tự oxy hoá - tự khử. Cl trong Cl2 có số oxy hoá 0; trong NaCl là -1 (bị khử, nhận e) và trong NaClO là +1 (bị oxy hoá, nhường e). Cùng nguyên tố Cl vừa là chất oxy hoá vừa là chất khử.' },
    ],
  },

  'H10HOA-w34-quiz': {
    topic: 'Đề tổng hợp 1 — Cuối năm',
    intro: 'Các em thân mến, ta luyện đề tổng hợp ôn thi cuối năm, bao quát toàn chương trình: nguyên tử, bảng tuần hoàn, liên kết, oxy hoá - khử, năng lượng, tốc độ và halogen.',
    objectives: [
      'Hệ thống toàn bộ kiến thức trọng tâm Hoá học 10.',
      'Rèn kỹ năng trả lời câu hỏi lý thuyết tổng hợp.',
      'Liên hệ các phần kiến thức với nhau.',
    ],
    theory: [
      { h: 'Khung kiến thức cốt lõi' },
      { ul: [
        'Nguyên tử và bảng tuần hoàn: sắp xếp theo Z, chu kì - nhóm, quy luật biến đổi tính chất.',
        'Liên kết: ion (kim loại + phi kim), cộng hoá trị (dùng chung e), kim loại.',
        'Oxy hoá - khử: chất khử nhường e, chất oxy hoá nhận e, bảo toàn electron.',
      ] },
      { h: 'Năng lượng và tốc độ' },
      { ul: [
        'Toả nhiệt (delta H < 0) / thu nhiệt (delta H > 0); định luật Hess: delta H phụ thuộc trạng thái đầu - cuối.',
        'Tốc độ phản ứng phụ thuộc nồng độ, nhiệt độ, áp suất, diện tích bề mặt, xúc tác (tên chất KHÔNG ảnh hưởng).',
      ] },
      { h: 'Halogen' },
      { p: 'Nhóm VIIA, tính oxy hoá mạnh, F2 > Cl2 > Br2 > I2; F là phi kim mạnh nhất.' },
      { note: 'Khi gặp câu "yếu tố nào KHÔNG ảnh hưởng tốc độ", nhớ tên chất không phải yếu tố động học.' },
    ],
    examples: [
      { q: 'Yếu tố nào sau đây không ảnh hưởng đến tốc độ phản ứng: nồng độ, nhiệt độ, tên gọi của chất, xúc tác?', a: 'Tên gọi của chất không ảnh hưởng đến tốc độ phản ứng. Các yếu tố thực sự ảnh hưởng là nồng độ, nhiệt độ, áp suất (khí), diện tích bề mặt và chất xúc tác. Tên gọi chỉ là cách định danh, không liên quan động học.' },
      { q: 'Phát biểu định luật Hess và nêu ý nghĩa thực tiễn.', a: 'Định luật Hess: biến thiên enthalpy của phản ứng chỉ phụ thuộc trạng thái đầu và cuối, không phụ thuộc đường đi. Ý nghĩa: cho phép tính delta H gián tiếp qua chu trình các phản ứng trung gian, kể cả những phản ứng khó đo nhiệt trực tiếp.' },
    ],
  },

  'H10HOA-w35-quiz': {
    topic: 'Đề tổng hợp 2 — Cuối năm',
    intro: 'Các em ơi, đây là tuần ôn cuối cùng. Ta luyện một đề tổng hợp nữa với các câu về cấu hình, liên kết, phản ứng toả nhiệt, tốc độ và trạng thái halogen. Cố lên nhé!',
    objectives: [
      'Củng cố viết cấu hình và xác định Z.',
      'Ôn loại liên kết và phản ứng toả nhiệt.',
      'Nhớ trạng thái và tính chất của các halogen.',
    ],
    theory: [
      { h: 'Cấu hình và số hiệu nguyên tử' },
      { ul: [
        'C có Z = 6: 1s2 2s2 2p2.',
        'O có Z = 8: 1s2 2s2 2p4.',
        'Số neutron N = A - Z.',
      ] },
      { h: 'Liên kết và năng lượng' },
      { ul: [
        'CO2: liên kết cộng hoá trị có cực (C và O khác độ âm điện).',
        'Phản ứng cháy (C + O2 -> CO2) là toả nhiệt; quang hợp, điện phân là thu nhiệt.',
      ] },
      { h: 'Tốc độ và halogen' },
      { ul: [
        'Tốc độ tăng khi tăng nhiệt độ, tăng nồng độ, dùng xúc tác, nghiền nhỏ.',
        'Trạng thái halogen: F2, Cl2 khí; Br2 lỏng đỏ nâu; I2 rắn tím đen.',
      ] },
      { note: 'Ôn lại bằng cách tự lập bảng halogen: trạng thái, màu, tính oxy hoá - dễ nhớ khi đi thi.' },
    ],
    examples: [
      { q: 'Viết cấu hình electron của carbon (Z=6) và oxygen (Z=8), cho biết số electron lớp ngoài cùng.', a: 'C (Z=6): 1s2 2s2 2p2, có 4 electron lớp ngoài cùng (nhóm IVA). O (Z=8): 1s2 2s2 2p4, có 6 electron lớp ngoài cùng (nhóm VIA).' },
      { q: 'Trong các phản ứng sau, phản ứng nào toả nhiệt: đốt cháy than, điện phân nước, quang hợp?', a: 'Đốt cháy than (C + O2 -> CO2) là phản ứng toả nhiệt (delta H < 0). Điện phân nước cần cung cấp điện năng (thu nhiệt/thu năng lượng); quang hợp cần năng lượng ánh sáng (thu nhiệt). Vậy chỉ đốt cháy than là toả nhiệt.' },
    ],
  },

  'H10HOA-w36-quiz': {
    topic: 'Kết thúc Hoá Học 10 — Nền tảng nguyên tử và bước vào Hoá hữu cơ 11',
    intro: 'Hoá Học 10 đặt nền móng cho toàn bộ chương trình THPT: từ cấu tạo nguyên tử đến liên kết hoá học, từ phản ứng oxy hoá khử đến tốc độ phản ứng. Hãy cùng nhìn lại và chuẩn bị cho Hoá hữu cơ đầy thú vị ở lớp 11.',
    objectives: [
      'Hệ thống hoá các khái niệm cốt lõi: cấu tạo nguyên tử, liên kết, phản ứng, nhiệt hoá học.',
      'Nhận biết những kiến thức Hoá 10 nào là tiền đề trực tiếp cho Hoá hữu cơ lớp 11.',
      'Xây dựng kế hoạch ôn tập hè để không bị đứt mạch khi bước vào hoá hữu cơ.',
    ],
    theory: [
      { h: 'Bức tranh toàn cảnh Hoá Học 10' },
      { ul: [
        'Nguyên tử & BTH: cấu hình electron, xu hướng biến đổi tuần hoàn, nhóm và chu kì.',
        'Liên kết hoá học: ion, cộng hoá trị (phân cực/không phân cực), kim loại — quyết định tính chất chất.',
        'Phản ứng oxy hoá khử: xác định số oxy hoá, cân bằng phương trình, điện hoá cơ bản.',
        'Nhiệt hoá học & Tốc độ phản ứng: ΔH, phản ứng toả/thu nhiệt, các yếu tố ảnh hưởng tốc độ.',
        'Các nguyên tố phi kim tiêu biểu: halogen, oxy, lưu huỳnh — phản ứng và ứng dụng.',
      ] },
      { h: 'Cầu nối sang Hoá Học 11 (Hữu cơ)' },
      { ul: [
        'Cấu hình electron → Cấu tạo phân tử hữu cơ: liên kết C–C, C=C, C≡C, và vòng benzene.',
        'Liên kết cộng hoá trị → Đặc điểm liên kết trong hydrocarbon, alcohol, acid carboxylic.',
        'Phản ứng oxy hoá khử → Phản ứng đốt cháy hydrocarbon, alcohol bị oxy hoá thành acid.',
        'Tốc độ phản ứng → Lên men, xúc tác sinh học (enzyme), tổng hợp hữu cơ trong phòng thí nghiệm.',
      ] },
      { h: 'Ôn hè hiệu quả' },
      { ul: [
        'Luyện thành thạo xác định số oxy hoá và cân bằng phương trình oxy hoá khử — kĩ năng xuất hiện xuyên suốt lớp 11.',
        'Xem lại bảng tính tan và quy tắc hoà tan để không bị lẫn khi gặp muối hữu cơ ở lớp 11.',
        'Ôn lại cách viết cấu hình electron — đặc biệt cho C, H, O, N — nền tảng viết CTCT hữu cơ.',
      ] },
      { note: 'Hoá hữu cơ ở lớp 11 phong phú và thực tiễn hơn hoá vô cơ — từ xăng dầu đến thuốc, từ nhựa đến đường. Nền tảng nguyên tử vững từ lớp 10 sẽ giúp em hiểu CẤU TRÚC thay vì học thuộc lòng phản ứng.' },
    ],
    examples: [
      { q: 'Tại sao cần nắm vững liên kết cộng hoá trị từ Hoá 10 trước khi học Hoá hữu cơ 11?', a: 'Toàn bộ hoá học hữu cơ dựa trên liên kết cộng hoá trị của carbon: liên kết đơn C–C, đôi C=C, ba C≡C và liên kết thơm trong vòng benzene đều là biến thể của liên kết cộng hoá trị. Độ phân cực của liên kết quyết định tính chất hoá học (phản ứng cộng, thế, tách). Học sinh không hiểu liên kết sẽ phải học thuộc lòng từng phản ứng hữu cơ — rất nặng và hay quên.' },
      { q: 'Những phần nào của Hoá 10 hay bị bỏ quên nhưng lại xuất hiện nhiều trong đề thi lớp 11?', a: 'Ba vùng hay bị bỏ quên: (1) Cân bằng phương trình bằng phương pháp thăng bằng electron — xuất hiện trong phản ứng hữu cơ có oxy hoá; (2) Bảng tính tan và điều kiện kết tủa — cần khi viết phương trình ion thu gọn; (3) Nhiệt hoá học (ΔH) — lớp 11 gặp lại khi tính nhiệt đốt cháy hydrocarbon. Dành 1 tuần ôn lại 3 vùng này sẽ tiết kiệm nhiều thời gian học kì sau.' },
    ],
  },
};
