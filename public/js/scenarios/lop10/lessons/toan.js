// ============================================================
// Lớp 10 · TOÁN — Lý thuyết 35 tuần (CTGD 2018 — THPT).
// Key trùng id quiz: "H10TOAN-wNN-quiz".
// Văn phong nghiêm túc, đúng chuẩn cấp THPT, định hướng thi tốt nghiệp.
// ============================================================

const L = (topic, intro, objectives, theory, examples) => ({ topic, intro, objectives, theory, examples });

export const H10TOAN_LESSONS = {
  'H10TOAN-w01-quiz': L(
    'Mệnh đề',
    'Mệnh đề là khái niệm nền tảng của logic toán học, mở đầu chương trình Toán THPT. Việc nắm chắc mệnh đề giúp lập luận chứng minh chặt chẽ trong suốt cấp 3.',
    ['Phân biệt mệnh đề và câu nói thông thường.', 'Lập được mệnh đề phủ định, kéo theo, đảo, tương đương.', 'Sử dụng đúng ký hiệu ∀, ∃.'],
    [
      { h: 'Khái niệm mệnh đề' },
      { p: 'Mệnh đề là một câu khẳng định có giá trị đúng (1) hoặc sai (0), không thể vừa đúng vừa sai.' },
      { ul: ['Câu hỏi, câu cảm thán không là mệnh đề', 'Mệnh đề chứa biến: giá trị tùy thuộc vào biến'] },
      { h: 'Các phép toán mệnh đề' },
      { p: 'Phủ định ¬P đảo giá trị chân lý. Kéo theo P ⇒ Q chỉ sai khi P đúng, Q sai. Tương đương P ⇔ Q đúng khi P và Q cùng giá trị.' },
      { h: 'Ký hiệu lượng từ' },
      { p: 'Với mọi (∀) và Tồn tại (∃). Phủ định: ¬(∀x, P(x)) ⇔ ∃x, ¬P(x); và ¬(∃x, P(x)) ⇔ ∀x, ¬P(x).' },
      { note: 'Mệnh đề là gốc rễ của mọi chứng minh — sai từ đây thì sai cả bài.' },
    ],
    [
      { q: 'Lập mệnh đề phủ định của "∀x ∈ ℝ, x² ≥ 0".', a: 'Phủ định là "∃x ∈ ℝ, x² < 0". Mệnh đề ban đầu đúng nên phủ định sai.' },
      { q: 'Mệnh đề "Nếu n chia hết 6 thì n chia hết 3" có đảo và phản đảo gì?', a: 'Đảo: "Nếu n chia hết 3 thì n chia hết 6" (sai, ví dụ n = 3). Phản đảo: "Nếu n không chia hết 3 thì n không chia hết 6" (đúng).' },
    ]
  ),

  'H10TOAN-w02-quiz': L(
    'Tập hợp và các phép toán trên tập hợp',
    'Tập hợp là ngôn ngữ chung của toán học hiện đại. Các phép toán hợp, giao, hiệu là công cụ thiết yếu cho cả đại số và xác suất.',
    ['Sử dụng đúng ký hiệu ∈, ⊂, ∅.', 'Thực hiện phép hợp, giao, hiệu, phần bù.', 'Tính số phần tử bằng nguyên lý bao trừ.'],
    [
      { h: 'Khái niệm tập hợp' },
      { p: 'Tập hợp gồm các phần tử phân biệt. Có thể liệt kê {1;2;3} hoặc nêu tính chất đặc trưng {x ∈ ℕ | x < 5}.' },
      { h: 'Các phép toán' },
      { ul: ['A ∪ B: hợp, gồm mọi phần tử thuộc A hoặc B', 'A ∩ B: giao, phần tử thuộc cả A và B', 'A \\ B: hiệu, thuộc A nhưng không thuộc B', 'CₑA = E \\ A: phần bù trong E'] },
      { h: 'Số tập con' },
      { p: 'Tập có n phần tử có 2ⁿ tập con (kể cả ∅ và chính nó).' },
      { note: 'Tập rỗng ∅ là tập con của mọi tập hợp.' },
    ],
    [
      { q: 'Cho A = {1;2;3;4;5}, B = {2;4;6;8}. Tính A ∪ B, A ∩ B, A \\ B.', a: 'A ∪ B = {1;2;3;4;5;6;8}; A ∩ B = {2;4}; A \\ B = {1;3;5}.' },
      { q: 'Đếm số tập con khác rỗng của X = {a;b;c;d}.', a: 'Tổng số tập con là 2⁴ = 16, trừ đi tập rỗng còn 15.' },
    ]
  ),

  'H10TOAN-w03-quiz': L(
    'Bất phương trình và hệ bất phương trình bậc nhất hai ẩn',
    'Bất phương trình bậc nhất hai ẩn là nền tảng của quy hoạch tuyến tính — ứng dụng vào bài toán tối ưu trong kinh tế, kỹ thuật.',
    ['Biểu diễn miền nghiệm bất phương trình ax + by ≤ c trên mặt phẳng tọa độ.', 'Giải hệ bất phương trình bằng phương pháp đồ thị.', 'Tìm cực trị hàm mục tiêu trên miền đa giác lồi.'],
    [
      { h: 'Miền nghiệm bất phương trình bậc nhất 2 ẩn' },
      { p: 'Bất phương trình ax + by ≤ c (a, b không đồng thời bằng 0) có miền nghiệm là nửa mặt phẳng kể cả bờ ax + by = c.' },
      { h: 'Cách dựng' },
      { ul: ['Vẽ đường thẳng ax + by = c', 'Chọn điểm thử (thường O(0;0) nếu c ≠ 0)', 'Tô nửa mặt phẳng chứa điểm thoả mãn'] },
      { h: 'Quy hoạch tuyến tính' },
      { p: 'Hàm mục tiêu F(x;y) = αx + βy đạt cực trị tại các đỉnh của đa giác miền nghiệm.' },
      { note: 'Đa giác miền nghiệm phải lồi và bị chặn để có max/min hữu hạn.' },
    ],
    [
      { q: 'Biểu diễn miền nghiệm của 2x + y ≤ 4.', a: 'Vẽ đường 2x + y = 4, thử O(0;0): 0 ≤ 4 đúng nên tô nửa mặt phẳng chứa gốc tọa độ (kể cả bờ).' },
      { q: 'Tìm max F = 3x + 2y trên miền x ≥ 0, y ≥ 0, x + y ≤ 4.', a: 'Đa giác có 3 đỉnh O(0;0), A(4;0), B(0;4). Giá trị F lần lượt 0, 12, 8. Vậy max F = 12 tại A.' },
    ]
  ),

  'H10TOAN-w04-quiz': L(
    'Hàm số bậc hai',
    'Hàm số bậc hai và đồ thị parabol xuất hiện thường xuyên trong vật lý (chuyển động ném) và kinh tế (lợi nhuận tối ưu).',
    ['Xác định đỉnh, trục đối xứng, bề lõm của parabol.', 'Vẽ đồ thị y = ax² + bx + c.', 'Tìm giá trị lớn nhất, nhỏ nhất.'],
    [
      { h: 'Định nghĩa' },
      { p: 'y = ax² + bx + c (a ≠ 0), đồ thị là parabol với đỉnh I(−b/(2a); −Δ/(4a)) và trục đối xứng x = −b/(2a).' },
      { h: 'Bề lõm và GTLN/GTNN' },
      { ul: ['a > 0: bề lõm hướng lên, hàm có min tại đỉnh', 'a < 0: bề lõm hướng xuống, hàm có max tại đỉnh'] },
      { h: 'Giao điểm trục Ox' },
      { p: 'Số nghiệm phương trình ax² + bx + c = 0 quyết định parabol cắt Ox tại 0, 1, hoặc 2 điểm (theo Δ).' },
      { note: 'Trong các bài tối ưu, luôn so sánh giá trị tại đỉnh với giá trị tại biên (nếu có ràng buộc).' },
    ],
    [
      { q: 'Tìm đỉnh và GTLN của y = −x² + 4x + 1.', a: 'a = −1 < 0. Đỉnh I(2; 5), trục x = 2. GTLN = 5 tại x = 2.' },
      { q: 'Một quả bóng được ném theo y = −5x² + 20x. Bóng đạt độ cao lớn nhất khi nào và bao nhiêu?', a: 'Đỉnh tại x = 2, y = −20 + 40 = 20. Bóng đạt độ cao 20 m tại x = 2.' },
    ]
  ),

  'H10TOAN-w05-quiz': L(
    'Dấu của tam thức bậc hai',
    'Quy tắc xét dấu tam thức bậc hai là công cụ chuẩn để giải bất phương trình bậc hai — kiến thức được dùng xuyên suốt THPT.',
    ['Áp dụng được định lý "trong trái — ngoài cùng" với hệ số a.', 'Xét dấu trên bảng tổng quát.', 'Giải bất phương trình bậc hai.'],
    [
      { h: 'Định lý dấu' },
      { p: 'Cho f(x) = ax² + bx + c (a ≠ 0), Δ = b² − 4ac.' },
      { ul: ['Δ < 0: f(x) cùng dấu với a với mọi x ∈ ℝ', 'Δ = 0: f(x) cùng dấu a với mọi x ≠ −b/(2a)', 'Δ > 0: f(x) trái dấu a trong khoảng giữa 2 nghiệm, cùng dấu a ngoài khoảng đó'] },
      { h: 'Nguyên tắc nhớ' },
      { p: 'In trái — out cùng (trong khoảng nghiệm thì trái dấu a, ngoài khoảng thì cùng dấu a).' },
      { note: 'Khi giải bất phương trình, luôn vẽ bảng xét dấu để tránh sai sót.' },
    ],
    [
      { q: 'Giải bất phương trình x² − 5x + 6 > 0.', a: 'Nghiệm: x = 2, x = 3. Vì a = 1 > 0, ngoài 2 nghiệm thì dương. Tập nghiệm: (−∞;2) ∪ (3;+∞).' },
      { q: 'Tìm m để x² − 2mx + m + 2 > 0 với mọi x ∈ ℝ.', a: 'Cần Δ < 0 ⇔ m² − m − 2 < 0 ⇔ −1 < m < 2.' },
    ]
  ),

  'H10TOAN-w06-quiz': L(
    'Phương trình quy về bậc hai',
    'Nhiều phương trình phức tạp (chứa căn, chứa trị tuyệt đối, trùng phương) đều có thể đưa về bậc hai bằng cách đặt ẩn phụ hoặc bình phương.',
    ['Giải phương trình chứa căn bậc hai bằng bình phương hai vế.', 'Giải phương trình trùng phương bằng đặt ẩn phụ.', 'Kiểm tra điều kiện và loại nghiệm ngoại lai.'],
    [
      { h: 'Phương trình vô tỉ' },
      { p: 'Dạng √f(x) = g(x): điều kiện g(x) ≥ 0 và f(x) ≥ 0, sau đó bình phương được f(x) = g(x)².' },
      { h: 'Phương trình trùng phương' },
      { p: 'ax⁴ + bx² + c = 0. Đặt t = x² (t ≥ 0), được at² + bt + c = 0.' },
      { h: 'Phương trình chứa trị tuyệt đối' },
      { p: '|f(x)| = g(x) ⇔ g(x) ≥ 0 và f(x) = ±g(x).' },
      { note: 'Sau bình phương phải thử lại nghiệm vào phương trình gốc — có thể sinh nghiệm ngoại lai.' },
    ],
    [
      { q: 'Giải √(x + 1) = x − 1.', a: 'ĐK: x ≥ 1. Bình phương: x + 1 = x² − 2x + 1 ⇔ x² − 3x = 0 ⇔ x = 0 (loại) hoặc x = 3. Vậy x = 3.' },
      { q: 'Giải x⁴ − 5x² + 4 = 0.', a: 'Đặt t = x² ≥ 0: t² − 5t + 4 = 0 ⇒ t = 1 hoặc t = 4. Vậy x = ±1; x = ±2.' },
    ]
  ),

  'H10TOAN-w07-quiz': L(
    'Hệ thức lượng trong tam giác — Định lý cosin và sin',
    'Định lý cosin và sin cho phép giải mọi tam giác — kiến thức thiết yếu trong trắc địa, kiến trúc, và bài tập hình học phẳng.',
    ['Áp dụng định lý cosin để tính cạnh hoặc góc.', 'Áp dụng định lý sin và liên hệ với bán kính ngoại tiếp R.', 'Tính diện tích bằng nhiều công thức.'],
    [
      { h: 'Định lý cosin' },
      { p: 'a² = b² + c² − 2bc·cosA (tương tự cho b², c²). Suy ra cosA = (b² + c² − a²)/(2bc).' },
      { h: 'Định lý sin' },
      { p: 'a/sinA = b/sinB = c/sinC = 2R (R là bán kính đường tròn ngoại tiếp).' },
      { h: 'Công thức diện tích' },
      { ul: ['S = ½·ab·sinC (hai cạnh và góc xen giữa)', 'S = abc/(4R)', 'S = pr (r là bán kính nội tiếp, p là nửa chu vi)', 'Heron: S = √(p(p−a)(p−b)(p−c))'] },
      { note: 'Khi biết 3 cạnh hoặc 2 cạnh + góc xen giữa, dùng cosin. Khi biết 1 cạnh và 2 góc, dùng sin.' },
    ],
    [
      { q: 'Tam giác ABC có a = 7, b = 5, c = 8. Tính cosA.', a: 'cosA = (5² + 8² − 7²)/(2·5·8) = (25+64−49)/80 = 40/80 = 1/2. Vậy A = 60°.' },
      { q: 'Tam giác ABC có B = 30°, C = 105°, a = 10. Tính b.', a: 'A = 180° − 30° − 105° = 45°. b/sinB = a/sinA ⇒ b = 10·sin30°/sin45° = 10·(1/2)/(√2/2) = 10/√2 = 5√2.' },
    ]
  ),

  'H10TOAN-w08-quiz': L(
    'Vectơ — Khái niệm và phép cộng, trừ',
    'Vectơ là công cụ giải hình học và vật lý hiện đại. Cộng — trừ vectơ tuân theo quy tắc hình bình hành và quy tắc 3 điểm.',
    ['Nắm khái niệm vectơ, vectơ-không, hai vectơ bằng nhau, đối nhau.', 'Áp dụng quy tắc 3 điểm và quy tắc hình bình hành.', 'Tính độ dài vectơ tổng.'],
    [
      { h: 'Khái niệm vectơ' },
      { p: 'Vectơ là đoạn thẳng có hướng. Hai vectơ bằng nhau ⇔ cùng phương, cùng hướng, cùng độ dài.' },
      { h: 'Phép cộng' },
      { ul: ['Quy tắc 3 điểm: →AB + →BC = →AC', 'Quy tắc hình bình hành: →AB + →AD = →AC (với ABCD là hình bình hành)', 'Tính chất: giao hoán, kết hợp, có vectơ-không'] },
      { h: 'Phép trừ' },
      { p: '→AB − →AC = →CB. Phép trừ là cộng với vectơ đối.' },
      { note: 'Cộng vectơ trong vật lý chính là tổng hợp lực — kiến thức song hành với chương động lực học.' },
    ],
    [
      { q: 'Cho tam giác ABC. Tính →AB + →BC + →CA.', a: '→AB + →BC = →AC; →AC + →CA = →0. Vậy tổng bằng →0.' },
      { q: 'Cho hình bình hành ABCD. Chứng minh →AB + →AD = →AC.', a: 'Theo quy tắc hình bình hành, vectơ tổng từ điểm chung A bằng đường chéo →AC.' },
    ]
  ),

  'H10TOAN-w09-quiz': L(
    'Vectơ — Tích của vectơ với một số',
    'Phép nhân vectơ với một số cho phép biểu diễn các vectơ cộng tuyến và giải các bài toán chứng minh thẳng hàng.',
    ['Hiểu tính chất hình học của k·→a (cùng hướng nếu k > 0, ngược hướng nếu k < 0).', 'Áp dụng điều kiện cộng tuyến.', 'Chứng minh ba điểm thẳng hàng.'],
    [
      { h: 'Định nghĩa' },
      { p: 'k·→a (k ∈ ℝ) là vectơ cùng phương với →a, cùng hướng nếu k > 0, ngược hướng nếu k < 0, độ dài |k|·|→a|.' },
      { h: 'Điều kiện cộng tuyến' },
      { p: '→a và →b cộng tuyến (→a ≠ →0) ⇔ ∃ k ∈ ℝ: →b = k·→a.' },
      { h: 'Tính chất' },
      { ul: ['k(m→a) = (km)→a', '(k + m)→a = k→a + m→a', 'k(→a + →b) = k→a + k→b'] },
      { note: 'Để chứng minh A, B, C thẳng hàng, đủ để chỉ ra →AB = k·→AC với k ∈ ℝ.' },
    ],
    [
      { q: 'Cho A(1;2), B(3;6), C(5;10). Ba điểm có thẳng hàng?', a: '→AB = (2;4), →AC = (4;8) = 2·→AB. Vậy A, B, C thẳng hàng.' },
      { q: 'Gọi M là trung điểm AB. Biểu diễn →AM theo →AB.', a: '→AM = (1/2)→AB.' },
    ]
  ),

  'H10TOAN-w10-quiz': L(
    'Hệ trục toạ độ — Toạ độ của vectơ',
    'Hệ trục Oxy gắn hình học với đại số. Mọi vectơ đều biểu diễn bằng cặp toạ độ, từ đó tính toán trở nên cơ giới hoá.',
    ['Tìm toạ độ vectơ →AB từ toạ độ A, B.', 'Cộng — trừ — nhân vectơ qua toạ độ.', 'Tính độ dài và trung điểm.'],
    [
      { h: 'Toạ độ vectơ' },
      { p: '→AB = (x_B − x_A; y_B − y_A). Hai vectơ bằng nhau ⇔ các toạ độ tương ứng bằng nhau.' },
      { h: 'Phép toán theo toạ độ' },
      { ul: ['→a + →b = (a₁ + b₁; a₂ + b₂)', 'k·→a = (ka₁; ka₂)', '|→a| = √(a₁² + a₂²)'] },
      { h: 'Trung điểm và trọng tâm' },
      { p: 'Trung điểm M của AB: M((x_A + x_B)/2; (y_A + y_B)/2). Trọng tâm G của tam giác ABC: G((x_A+x_B+x_C)/3; (y_A+y_B+y_C)/3).' },
      { note: 'Hệ toạ độ giúp đại số hóa hình học — tính chất hình học thành phương trình.' },
    ],
    [
      { q: 'Cho A(2;3), B(−1;4). Tính →AB và |→AB|.', a: '→AB = (−3; 1); |→AB| = √(9 + 1) = √10.' },
      { q: 'Tam giác ABC với A(0;0), B(6;0), C(0;6). Tìm trọng tâm G.', a: 'G(2; 2).' },
    ]
  ),

  'H10TOAN-w11-quiz': L(
    'Tích vô hướng của hai vectơ',
    'Tích vô hướng là cầu nối giữa độ dài, góc, và toạ độ — công cụ quan trọng để xét vuông góc và tính khoảng cách.',
    ['Tính →a·→b theo định nghĩa và theo toạ độ.', 'Xét vuông góc bằng →a·→b = 0.', 'Tính góc giữa hai vectơ.'],
    [
      { h: 'Định nghĩa' },
      { p: '→a · →b = |→a|·|→b|·cos(→a, →b). Trong toạ độ: →a · →b = a₁b₁ + a₂b₂.' },
      { h: 'Tính chất' },
      { ul: ['→a · →b = →b · →a (giao hoán)', '(k→a)·→b = k(→a·→b)', '→a · (→b + →c) = →a·→b + →a·→c'] },
      { h: 'Vuông góc và góc' },
      { p: '→a ⊥ →b ⇔ →a · →b = 0. cos(→a, →b) = (→a·→b)/(|→a|·|→b|).' },
      { note: 'Tích vô hướng cho công cơ học W = →F · →d trong vật lý.' },
    ],
    [
      { q: 'Cho →a = (1;2), →b = (3;−1). Tính →a · →b và góc giữa chúng.', a: '→a·→b = 3 − 2 = 1; |→a| = √5; |→b| = √10. cos = 1/(√5·√10) = 1/(5√2). Góc khoảng 81,87°.' },
      { q: 'Tìm m để →u = (1; m) và →v = (2; −4) vuông góc.', a: '→u·→v = 0 ⇔ 2 − 4m = 0 ⇔ m = 1/2.' },
    ]
  ),

  'H10TOAN-w12-quiz': L(
    'Số gần đúng và sai số',
    'Trong thực hành đo đạc, mọi số liệu đều có sai số. Hiểu sai số tuyệt đối và sai số tương đối giúp đánh giá độ tin cậy của kết quả.',
    ['Phân biệt sai số tuyệt đối và sai số tương đối.', 'Quy tròn số đúng quy ước.', 'Đếm chữ số có nghĩa.'],
    [
      { h: 'Sai số tuyệt đối và tương đối' },
      { p: 'Số gần đúng a thay cho số đúng ā. Sai số tuyệt đối Δ_a = |ā − a|. Sai số tương đối δ_a = Δ_a / |a|.' },
      { h: 'Quy tròn' },
      { p: 'Quy tròn về hàng nào thì sai số tuyệt đối không vượt quá nửa đơn vị hàng đó.' },
      { h: 'Chữ số có nghĩa' },
      { p: 'Chữ số có nghĩa: mọi chữ số khác 0; chữ số 0 nằm giữa hoặc cuối phần thập phân.' },
      { note: 'Số có càng nhiều chữ số có nghĩa thì độ chính xác càng cao.' },
    ],
    [
      { q: 'Cho ā = 1,234567 và lấy a = 1,2346. Tính Δ_a.', a: 'Δ_a = |1,234567 − 1,2346| = 0,000033.' },
      { q: 'Đếm chữ số có nghĩa của số 0,03050.', a: 'Các chữ số có nghĩa: 3, 0 (giữa), 5, 0 (cuối thập phân). Có 4 chữ số có nghĩa.' },
    ]
  ),

  'H10TOAN-w13-quiz': L(
    'Mẫu số liệu — Bảng tần số ghép lớp',
    'Khi mẫu số liệu lớn, ta ghép thành các khoảng (lớp). Bảng tần số ghép lớp tóm tắt phân bố để dễ phân tích.',
    ['Lập bảng tần số ghép lớp với độ rộng phù hợp.', 'Hiểu tần số, tần suất, tần số tích luỹ.', 'Đọc và lập biểu đồ tần suất.'],
    [
      { h: 'Bảng tần số ghép lớp' },
      { p: 'Chia khoảng giá trị thành các lớp [a;b), đếm số phần tử rơi vào mỗi lớp (tần số n_i).' },
      { h: 'Các đại lượng' },
      { ul: ['Tần suất: f_i = n_i/N', 'Tần số tích luỹ: cộng dồn tần số từ lớp đầu', 'Tần suất tích luỹ: cộng dồn tần suất'] },
      { h: 'Biểu đồ' },
      { p: 'Biểu đồ cột (histogram) và biểu đồ tần suất tích luỹ giúp hình dung phân bố.' },
      { note: 'Số lớp nên từ 5 đến 15, độ rộng các lớp bằng nhau cho dễ so sánh.' },
    ],
    [
      { q: 'Mẫu 50 số liệu, lớp [10;20) có 12 phần tử. Tính tần suất.', a: 'f = 12/50 = 0,24 hay 24%.' },
      { q: 'Mục đích của tần số tích luỹ là gì?', a: 'Cho biết số phần tử có giá trị nhỏ hơn cận trên của lớp, hữu ích để tìm trung vị, tứ phân vị.' },
    ]
  ),

  'H10TOAN-w14-quiz': L(
    'Số trung bình — Trung vị — Mốt cho mẫu ghép lớp',
    'Ba số đo vị trí — trung bình, trung vị, mốt — mô tả "vị trí trung tâm" của mẫu theo các góc nhìn khác nhau.',
    ['Tính trung bình mẫu ghép lớp dùng giá trị giữa lớp.', 'Tìm trung vị qua lớp chứa trung vị.', 'Xác định lớp mốt và giá trị mốt xấp xỉ.'],
    [
      { h: 'Trung bình mẫu ghép lớp' },
      { p: 'x̄ = Σ(n_i · x_i)/N, trong đó x_i là giá trị giữa lớp thứ i.' },
      { h: 'Trung vị Q₂' },
      { p: 'Lớp chứa trung vị là lớp đầu tiên có tần số tích luỹ ≥ N/2. Trung vị Q₂ = a + ((N/2 − F)/n_m)·h (a: cận dưới lớp trung vị, F: tần số tích luỹ trước, n_m: tần số lớp trung vị, h: độ rộng lớp).' },
      { h: 'Mốt' },
      { p: 'Lớp mốt là lớp có tần số lớn nhất. Mốt M_o = a + (d₁/(d₁ + d₂))·h, với d₁, d₂ là hiệu tần số với hai lớp kề.' },
      { note: 'Trung vị ít chịu ảnh hưởng của giá trị bất thường — ưu tiên dùng khi mẫu lệch.' },
    ],
    [
      { q: 'Mẫu ghép có lớp [20;30) tần số 15, [30;40) tần số 25, [40;50) tần số 10. Lớp mốt là?', a: 'Lớp [30;40) có tần số cao nhất nên là lớp mốt.' },
      { q: 'Khi nào nên dùng trung vị thay cho trung bình?', a: 'Khi mẫu có giá trị bất thường (outliers) hoặc phân bố lệch — trung vị không bị kéo lệch.' },
    ]
  ),

  'H10TOAN-w15-quiz': L(
    'Phương sai và độ lệch chuẩn',
    'Phương sai và độ lệch chuẩn đo mức độ phân tán của mẫu quanh giá trị trung bình — quan trọng trong thống kê suy luận.',
    ['Tính phương sai s² và độ lệch chuẩn s của mẫu.', 'So sánh mức độ phân tán giữa các mẫu.', 'Hiểu ý nghĩa độ lệch chuẩn nhỏ/lớn.'],
    [
      { h: 'Công thức' },
      { p: 's² = (1/N) Σ n_i(x_i − x̄)² hay s² = (1/N) Σ n_i·x_i² − x̄². Độ lệch chuẩn s = √s².' },
      { h: 'Ý nghĩa' },
      { ul: ['s nhỏ: dữ liệu tập trung quanh trung bình', 's lớn: dữ liệu phân tán rộng', 'So sánh phải dùng cùng đơn vị'] },
      { h: 'Hệ số biến thiên' },
      { p: 'CV = s/x̄ (thường nhân 100%) so sánh phân tán tương đối giữa các mẫu có x̄ khác nhau.' },
      { note: 'Phương sai có đơn vị bình phương; độ lệch chuẩn cùng đơn vị với dữ liệu, dễ diễn giải.' },
    ],
    [
      { q: 'Mẫu {2; 4; 4; 4; 5; 5; 7; 9}. Tính x̄, s².', a: 'x̄ = 40/8 = 5. s² = ((2−5)² + 3·(4−5)² + 2·(5−5)² + (7−5)² + (9−5)²)/8 = (9+3+0+4+16)/8 = 4. s = 2.' },
      { q: 'Lớp A có s = 1,2 điểm; lớp B có s = 0,5 điểm với cùng môn. Nhận xét?', a: 'Lớp B đồng đều hơn (độ phân tán điểm số nhỏ hơn). Lớp A có dao động lớn hơn.' },
    ]
  ),

  'H10TOAN-w16-quiz': L(
    'Quy tắc đếm — Cộng và nhân',
    'Hai quy tắc đếm cơ bản — cộng và nhân — là nền tảng của tổ hợp và xác suất. Phải hiểu chính xác "hoặc" và "rồi".',
    ['Phân biệt khi nào dùng quy tắc cộng, khi nào dùng quy tắc nhân.', 'Đếm số kết quả của các sự kiện rời rạc và liên tiếp.', 'Tránh đếm lặp.'],
    [
      { h: 'Quy tắc cộng' },
      { p: 'Nếu một công việc có m phương án A và n phương án B (rời nhau) thì có m + n cách thực hiện.' },
      { h: 'Quy tắc nhân' },
      { p: 'Nếu một công việc gồm hai giai đoạn liên tiếp, giai đoạn 1 có m cách, giai đoạn 2 có n cách thì có m·n cách.' },
      { ul: ['Cộng: "hoặc A hoặc B" — chỉ chọn 1 trong 2', 'Nhân: "A rồi B" — làm cả 2'] },
      { note: 'Nếu A và B không rời nhau, dùng nguyên lý bao trừ: |A ∪ B| = |A| + |B| − |A ∩ B|.' },
    ],
    [
      { q: 'Có 5 chiếc áo và 3 chiếc quần. Có bao nhiêu cách chọn 1 bộ?', a: 'Quy tắc nhân: 5 × 3 = 15 bộ.' },
      { q: 'Đi từ A đến B có 4 đường, từ B đến C có 3 đường. Có bao nhiêu cách đi A đến C qua B?', a: 'Quy tắc nhân: 4 × 3 = 12 cách.' },
    ]
  ),

  'H10TOAN-w17-quiz': L(
    'Hoán vị — Chỉnh hợp — Tổ hợp',
    'Ba khái niệm tổ hợp cốt lõi — hoán vị, chỉnh hợp, tổ hợp — phân biệt theo "có thứ tự" hay "không thứ tự" và "lấy hết hay lấy một phần".',
    ['Phân biệt rõ hoán vị, chỉnh hợp, tổ hợp.', 'Áp dụng đúng công thức tính.', 'Giải bài toán đếm có ràng buộc.'],
    [
      { h: 'Hoán vị' },
      { p: 'Số cách sắp xếp n phần tử khác nhau: Pₙ = n!.' },
      { h: 'Chỉnh hợp' },
      { p: 'Số cách chọn và sắp k phần tử từ n: A(n,k) = n!/(n−k)!.' },
      { h: 'Tổ hợp' },
      { p: 'Số cách chọn k phần tử (không tính thứ tự) từ n: C(n,k) = n!/(k!(n−k)!).' },
      { ul: ['Hoán vị: dùng hết n, có thứ tự', 'Chỉnh hợp: chọn k, có thứ tự', 'Tổ hợp: chọn k, không thứ tự'] },
      { note: 'Khi đề có "sắp xếp", "xếp chỗ" — có thứ tự. Khi có "chọn", "tổ" — thường không thứ tự.' },
    ],
    [
      { q: 'Có bao nhiêu cách xếp 5 học sinh thành một hàng?', a: 'P₅ = 5! = 120 cách.' },
      { q: 'Từ 20 học sinh, chọn 3 em đi dự đại hội. Có bao nhiêu cách?', a: 'Không thứ tự: C(20,3) = 20!/(3!·17!) = 1140 cách.' },
    ]
  ),

  'H10TOAN-w18-quiz': L(
    'Ôn tập học kỳ 1',
    'Tổng kết các chuyên đề chính học kỳ 1: mệnh đề — tập hợp, bất phương trình, hàm số bậc hai, vectơ, hệ trục toạ độ, thống kê mô tả, tổ hợp.',
    ['Hệ thống hoá kiến thức từ tuần 1 đến 17.', 'Vận dụng tổng hợp giải bài tập đề ôn.', 'Tự đánh giá điểm yếu để chuẩn bị thi.'],
    [
      { h: 'Đại số' },
      { p: 'Mệnh đề, tập hợp, bất phương trình bậc nhất 2 ẩn, hàm số bậc hai, tam thức bậc hai, phương trình quy về bậc hai.' },
      { h: 'Hình học' },
      { p: 'Hệ thức lượng trong tam giác, vectơ và phép toán, hệ trục toạ độ, tích vô hướng.' },
      { h: 'Thống kê và Tổ hợp' },
      { p: 'Bảng tần số ghép lớp, trung bình — trung vị — mốt, phương sai — độ lệch chuẩn, quy tắc đếm, hoán vị — chỉnh hợp — tổ hợp.' },
      { note: 'Luyện đề tổng hợp 90 phút để mô phỏng thi học kỳ.' },
    ],
    [
      { q: 'Giải bất phương trình x² − 3x − 4 < 0.', a: 'Nghiệm tam thức: x = −1, x = 4. Vì a > 0, trong khoảng nghiệm thì âm. Tập nghiệm: (−1; 4).' },
      { q: 'Tính tổ hợp C(10, 4).', a: 'C(10,4) = 10!/(4!·6!) = 210.' },
    ]
  ),

  'H10TOAN-w19-quiz': L(
    'Nhị thức Newton',
    'Khai triển nhị thức (a + b)ⁿ là công thức tổng quát có ứng dụng vào tính nhanh luỹ thừa, xác suất, và đạo hàm sau này.',
    ['Viết khai triển (a + b)ⁿ với n nhỏ.', 'Tìm hệ số tổng quát của một số hạng.', 'Áp dụng giải bài toán đếm.'],
    [
      { h: 'Công thức nhị thức Newton' },
      { p: '(a + b)ⁿ = Σ_{k=0}^{n} C(n,k)·aⁿ⁻ᵏ·bᵏ.' },
      { h: 'Số hạng tổng quát' },
      { p: 'T_{k+1} = C(n,k)·aⁿ⁻ᵏ·bᵏ. Số mũ của a giảm từ n về 0, của b tăng từ 0 lên n.' },
      { h: 'Tính chất' },
      { ul: ['Có n + 1 số hạng', 'C(n,k) = C(n, n−k) — hệ số đối xứng', 'Σ_{k=0}^{n} C(n,k) = 2ⁿ'] },
      { note: 'Hệ số C(n,k) trùng với hệ số trong tam giác Pascal.' },
    ],
    [
      { q: 'Viết khai triển (x + 2)⁴.', a: '(x+2)⁴ = x⁴ + 4·x³·2 + 6·x²·4 + 4·x·8 + 16 = x⁴ + 8x³ + 24x² + 32x + 16.' },
      { q: 'Tìm hệ số của x⁵ trong khai triển (1 + x)¹⁰.', a: 'Hệ số là C(10,5) = 252.' },
    ]
  ),

  'H10TOAN-w20-quiz': L(
    'Xác suất cổ điển — Không gian mẫu, biến cố',
    'Xác suất cổ điển dựa vào giả định các kết quả đồng khả năng. Đây là mô hình cơ bản nhất để học xác suất.',
    ['Mô tả không gian mẫu Ω.', 'Liệt kê biến cố và phần tử của biến cố.', 'Phân biệt biến cố sơ cấp, biến cố chắc chắn, không thể.'],
    [
      { h: 'Không gian mẫu' },
      { p: 'Ω là tập hợp tất cả kết quả có thể xảy ra của một phép thử ngẫu nhiên.' },
      { h: 'Biến cố' },
      { p: 'Biến cố A là tập con của Ω. A xảy ra ⇔ kết quả thuộc A.' },
      { ul: ['Biến cố sơ cấp: chỉ có một phần tử', 'Biến cố chắc chắn: A = Ω', 'Biến cố không thể: A = ∅'] },
      { note: 'Mỗi phép thử cụ thể cần xác định Ω trước khi nói về biến cố và xác suất.' },
    ],
    [
      { q: 'Tung 1 con xúc xắc. Mô tả Ω và biến cố "xuất hiện mặt chẵn".', a: 'Ω = {1;2;3;4;5;6}. Biến cố A = {2;4;6}.' },
      { q: 'Tung 2 đồng xu. Liệt kê các phần tử của Ω.', a: 'Ω = {SS, SN, NS, NN} (S: sấp, N: ngửa).' },
    ]
  ),

  'H10TOAN-w21-quiz': L(
    'Xác suất cổ điển — Công thức Laplace',
    'Trong mô hình đồng khả năng, xác suất là tỷ số "kết quả thuận lợi / tổng kết quả" — công thức Laplace.',
    ['Áp dụng P(A) = n(A)/n(Ω).', 'Đếm chính xác n(A) bằng quy tắc tổ hợp.', 'Giải bài toán xác suất thực tế.'],
    [
      { h: 'Công thức Laplace' },
      { p: 'Nếu các kết quả của Ω đồng khả năng thì P(A) = n(A)/n(Ω).' },
      { h: 'Quy trình giải' },
      { ul: ['Bước 1: Xác định Ω và tính n(Ω)', 'Bước 2: Mô tả biến cố A và đếm n(A)', 'Bước 3: Tính tỷ số n(A)/n(Ω)'] },
      { h: 'Tính chất xác suất' },
      { p: '0 ≤ P(A) ≤ 1; P(Ω) = 1; P(∅) = 0.' },
      { note: 'Đếm n(A) là khâu khó nhất — phải dùng đúng hoán vị/tổ hợp.' },
    ],
    [
      { q: 'Tung 1 xúc xắc. Tính xác suất xuất hiện số nguyên tố.', a: 'A = {2;3;5}, n(A) = 3. P(A) = 3/6 = 1/2.' },
      { q: 'Từ hộp có 5 bi đỏ và 3 bi xanh, lấy ngẫu nhiên 2 bi. Tính xác suất lấy được 2 bi đỏ.', a: 'n(Ω) = C(8,2) = 28. n(A) = C(5,2) = 10. P(A) = 10/28 = 5/14.' },
    ]
  ),

  'H10TOAN-w22-quiz': L(
    'Biến cố đối — Biến cố hợp, giao',
    'Các phép toán trên biến cố (đối, hợp, giao) đi kèm các công thức xác suất tương ứng — đặc biệt công thức cộng xác suất.',
    ['Tính P(Ā) qua biến cố đối.', 'Áp dụng công thức cộng xác suất.', 'Phân biệt biến cố xung khắc và độc lập.'],
    [
      { h: 'Biến cố đối' },
      { p: 'Ā = Ω \\ A. P(Ā) = 1 − P(A).' },
      { h: 'Biến cố hợp và giao' },
      { p: 'A ∪ B: "A hoặc B xảy ra". A ∩ B: "cả A và B cùng xảy ra".' },
      { h: 'Công thức cộng' },
      { ul: ['Tổng quát: P(A ∪ B) = P(A) + P(B) − P(A ∩ B)', 'Xung khắc (A ∩ B = ∅): P(A ∪ B) = P(A) + P(B)'] },
      { note: 'Khi A khó tính, hãy thử tính P(Ā) rồi dùng P(A) = 1 − P(Ā) — thường nhanh hơn.' },
    ],
    [
      { q: 'Tung 1 xúc xắc. Tính P("không phải mặt 6").', a: 'A: mặt 6, P(A) = 1/6. P(Ā) = 1 − 1/6 = 5/6.' },
      { q: 'Lớp có 30 học sinh, 18 giỏi Toán, 15 giỏi Văn, 8 giỏi cả hai. Tính xác suất chọn được học sinh giỏi ít nhất một môn.', a: 'P(T ∪ V) = (18 + 15 − 8)/30 = 25/30 = 5/6.' },
    ]
  ),

  'H10TOAN-w23-quiz': L(
    'Bài tập xác suất tổng hợp',
    'Vận dụng tổng hợp các kiến thức xác suất cổ điển vào nhiều dạng bài: bốc bi, gieo xúc xắc, chọn người, sắp xếp có ràng buộc.',
    ['Phân tích đúng không gian mẫu trong bài thực tế.', 'Đếm thuần thục bằng tổ hợp.', 'Kết hợp công thức cộng và biến cố đối.'],
    [
      { h: 'Các dạng thường gặp' },
      { ul: ['Bốc bi không hoàn lại: dùng C(n,k)', 'Sắp xếp: dùng hoán vị, chỉnh hợp', 'Tung xúc xắc nhiều lần: dùng quy tắc nhân'] },
      { h: 'Kỹ thuật giải' },
      { p: 'Khi biến cố phức tạp, chia thành các trường hợp xung khắc hoặc tính qua biến cố đối.' },
      { note: 'Đọc kỹ đề: "đúng k phần tử thuộc loại X" khác với "ít nhất k phần tử thuộc loại X".' },
    ],
    [
      { q: 'Tung 2 xúc xắc. Tính xác suất tổng số chấm bằng 7.', a: 'Các cặp: (1,6),(2,5),(3,4),(4,3),(5,2),(6,1) — 6 cặp. n(Ω) = 36. P = 6/36 = 1/6.' },
      { q: 'Hộp 4 bi đỏ, 6 bi xanh. Lấy 3 bi. Tính xác suất có ít nhất 1 bi đỏ.', a: 'P(không có bi đỏ) = C(6,3)/C(10,3) = 20/120 = 1/6. P(ít nhất 1 đỏ) = 1 − 1/6 = 5/6.' },
    ]
  ),

  'H10TOAN-w24-quiz': L(
    'Phương trình đường thẳng — Vectơ chỉ phương và vectơ pháp tuyến',
    'Đường thẳng trong mặt phẳng được mô tả bởi vectơ chỉ phương hoặc vectơ pháp tuyến, dẫn đến phương trình tham số và phương trình tổng quát.',
    ['Viết phương trình tham số và tổng quát.', 'Chuyển đổi giữa các dạng phương trình.', 'Tìm vectơ chỉ phương, vectơ pháp tuyến.'],
    [
      { h: 'Phương trình tham số' },
      { p: 'Δ qua M₀(x₀; y₀), vectơ chỉ phương →u = (a; b): { x = x₀ + at, y = y₀ + bt }.' },
      { h: 'Phương trình tổng quát' },
      { p: 'ax + by + c = 0 (a² + b² > 0), vectơ pháp tuyến →n = (a; b).' },
      { h: 'Liên hệ' },
      { p: 'Nếu →u = (a; b) là chỉ phương thì →n = (b; −a) hoặc (−b; a) là pháp tuyến.' },
      { note: 'Hai đường thẳng song song có cùng vectơ pháp tuyến (đến tỷ số); vuông góc thì pháp tuyến vuông góc.' },
    ],
    [
      { q: 'Viết phương trình tham số đường thẳng qua A(1;2), vectơ chỉ phương (3;−1).', a: '{ x = 1 + 3t, y = 2 − t }.' },
      { q: 'Viết phương trình tổng quát đường thẳng qua B(2;3) và vuông góc với →v = (1;2).', a: '→n = (1;2). PT: 1(x − 2) + 2(y − 3) = 0 ⇔ x + 2y − 8 = 0.' },
    ]
  ),

  'H10TOAN-w25-quiz': L(
    'Vị trí tương đối — Khoảng cách từ điểm đến đường thẳng',
    'Hai đường thẳng có thể song song, trùng nhau, cắt nhau. Công thức khoảng cách từ điểm đến đường thẳng là kỹ thuật quan trọng.',
    ['Xét vị trí tương đối bằng hệ phương trình.', 'Áp dụng công thức khoảng cách d(M; Δ).', 'Tính góc giữa hai đường thẳng.'],
    [
      { h: 'Vị trí tương đối' },
      { p: 'Giải hệ phương trình 2 đường: hệ vô số nghiệm → trùng; vô nghiệm → song song; nghiệm duy nhất → cắt nhau.' },
      { h: 'Khoảng cách điểm đến đường thẳng' },
      { p: 'd(M(x₀; y₀); Δ: ax + by + c = 0) = |ax₀ + by₀ + c| / √(a² + b²).' },
      { h: 'Góc giữa 2 đường' },
      { p: 'cos(Δ₁, Δ₂) = |→n₁·→n₂|/(|→n₁|·|→n₂|), kết quả lấy giá trị tuyệt đối để góc ≤ 90°.' },
      { note: 'Khoảng cách giữa 2 đường thẳng song song: chọn 1 điểm thuộc đường này và tính d đến đường kia.' },
    ],
    [
      { q: 'Tính khoảng cách từ M(1; 2) đến Δ: 3x − 4y + 1 = 0.', a: 'd = |3 − 8 + 1|/√(9 + 16) = |−4|/5 = 4/5.' },
      { q: 'Xét vị trí tương đối của Δ₁: x + 2y = 3 và Δ₂: 2x + 4y = 7.', a: 'Hệ số tỷ lệ 1/2 = 2/4 ≠ 3/7 nên Δ₁ ∥ Δ₂ (song song, không trùng).' },
    ]
  ),

  'H10TOAN-w26-quiz': L(
    'Đường tròn — Phương trình đường tròn',
    'Đường tròn (C) là quỹ tích điểm cách tâm một khoảng không đổi. Phương trình đường tròn có 2 dạng tương đương.',
    ['Viết phương trình đường tròn dạng chuẩn và dạng khai triển.', 'Xác định tâm và bán kính.', 'Viết phương trình tiếp tuyến.'],
    [
      { h: 'Phương trình chuẩn' },
      { p: '(x − a)² + (y − b)² = R² với tâm I(a; b) và bán kính R.' },
      { h: 'Phương trình khai triển' },
      { p: 'x² + y² − 2ax − 2by + c = 0 với tâm I(a; b), R = √(a² + b² − c) (cần a² + b² − c > 0).' },
      { h: 'Tiếp tuyến' },
      { p: 'Tiếp tuyến tại M₀(x₀; y₀) thuộc (C): (x₀ − a)(x − a) + (y₀ − b)(y − b) = R².' },
      { note: 'Đường tròn cắt đường thẳng tại 2 điểm ⇔ d(I; Δ) < R; tiếp xúc ⇔ d = R; không cắt ⇔ d > R.' },
    ],
    [
      { q: 'Viết phương trình đường tròn tâm I(2; −1), bán kính 3.', a: '(x − 2)² + (y + 1)² = 9.' },
      { q: 'Tìm tâm và bán kính của x² + y² − 4x + 6y − 12 = 0.', a: 'Tâm I(2; −3), R = √(4 + 9 + 12) = √25 = 5.' },
    ]
  ),

  'H10TOAN-w27-quiz': L(
    'Ba đường conic — Elip',
    'Elip là quỹ tích điểm có tổng khoảng cách đến 2 tiêu điểm cố định bằng hằng số — dạng cơ bản nhất trong 3 đường conic.',
    ['Nhận dạng phương trình chính tắc elip.', 'Xác định tiêu điểm, đỉnh, trục lớn, trục nhỏ.', 'Tính tâm sai e.'],
    [
      { h: 'Định nghĩa' },
      { p: 'Elip: tập điểm M thoả MF₁ + MF₂ = 2a > F₁F₂.' },
      { h: 'Phương trình chính tắc' },
      { p: 'x²/a² + y²/b² = 1 (a > b > 0). Trục lớn 2a (Ox), trục nhỏ 2b (Oy), tiêu cự 2c với c² = a² − b².' },
      { h: 'Tâm sai' },
      { p: 'e = c/a, 0 < e < 1. e càng nhỏ elip càng tròn.' },
      { note: 'Quỹ đạo các hành tinh trong hệ Mặt Trời là elip với Mặt Trời ở một tiêu điểm (Định luật Kepler 1).' },
    ],
    [
      { q: 'Cho elip x²/25 + y²/9 = 1. Xác định a, b, c và tâm sai.', a: 'a = 5, b = 3, c = √(25 − 9) = 4. Tâm sai e = 4/5 = 0,8.' },
      { q: 'Viết phương trình elip có trục lớn 10, trục nhỏ 6 (tâm O, trục đối xứng Ox, Oy).', a: 'a = 5, b = 3. PT: x²/25 + y²/9 = 1.' },
    ]
  ),

  'H10TOAN-w28-quiz': L(
    'Ba đường conic — Hypebol',
    'Hypebol là quỹ tích điểm có hiệu khoảng cách đến 2 tiêu điểm cố định không đổi, gồm 2 nhánh đối xứng.',
    ['Viết phương trình chính tắc hypebol.', 'Xác định đỉnh, tiêu điểm, tiệm cận.', 'Tính tâm sai e > 1.'],
    [
      { h: 'Phương trình chính tắc' },
      { p: 'x²/a² − y²/b² = 1 (a, b > 0). Trục thực 2a (Ox), trục ảo 2b (Oy), tiêu cự 2c với c² = a² + b².' },
      { h: 'Đỉnh và tiệm cận' },
      { p: 'Đỉnh ở A₁(−a; 0), A₂(a; 0). Hai tiệm cận: y = ±(b/a)x.' },
      { h: 'Tâm sai' },
      { p: 'e = c/a > 1.' },
      { note: 'Hypebol xuất hiện trong quỹ đạo các sao chổi không tuần hoàn, sóng siêu âm, đèn ngân hà.' },
    ],
    [
      { q: 'Cho hypebol x²/9 − y²/16 = 1. Tìm a, b, c và tiệm cận.', a: 'a = 3, b = 4, c = √(9 + 16) = 5. Tiệm cận: y = ±(4/3)x.' },
      { q: 'Viết phương trình hypebol qua đỉnh (5; 0) và có tiệm cận y = ±(3/5)x.', a: 'a = 5; b/a = 3/5 ⇒ b = 3. PT: x²/25 − y²/9 = 1.' },
    ]
  ),

  'H10TOAN-w29-quiz': L(
    'Ba đường conic — Parabol',
    'Parabol có 1 tiêu điểm và 1 đường chuẩn, mọi điểm trên parabol cách đều tiêu điểm và đường chuẩn.',
    ['Viết phương trình chính tắc parabol.', 'Xác định tiêu điểm và đường chuẩn.', 'Phân biệt parabol với đồ thị hàm bậc hai.'],
    [
      { h: 'Phương trình chính tắc' },
      { p: 'y² = 2px (p > 0). Tiêu điểm F(p/2; 0), đường chuẩn x = −p/2.' },
      { h: 'Tính chất' },
      { p: 'Mọi điểm M trên parabol thoả MF = d(M; đường chuẩn).' },
      { h: 'Phân biệt' },
      { p: 'Parabol conic y² = 2px (mở sang phải) khác với y = ax² + bx + c (đồ thị hàm bậc 2, mở lên/xuống).' },
      { note: 'Anten parabol, đèn pha xe ô tô lợi dụng tính phản xạ: tia song song trục đi qua tiêu điểm.' },
    ],
    [
      { q: 'Cho parabol y² = 8x. Tìm p, tiêu điểm, đường chuẩn.', a: '2p = 8 ⇒ p = 4. Tiêu điểm F(2; 0). Đường chuẩn x = −2.' },
      { q: 'Viết PT parabol đỉnh O, trục Ox, đi qua điểm M(2; 4).', a: 'y² = 2px ⇒ 16 = 4p ⇒ p = 4. PT: y² = 8x.' },
    ]
  ),

  'H10TOAN-w30-quiz': L(
    'Bài tập tổng hợp Vectơ và Đường thẳng',
    'Tổng hợp các bài toán hình học giải tích phẳng: vectơ, đường thẳng, đường tròn, conic.',
    ['Vận dụng tổng hợp các công thức hình học giải tích.', 'Giải các bài toán quỹ tích cơ bản.', 'Xét vị trí tương đối giữa các đối tượng.'],
    [
      { h: 'Liên hệ vectơ — đường thẳng' },
      { p: 'Một đường thẳng được xác định bởi 1 điểm và 1 vectơ chỉ phương (hoặc pháp tuyến).' },
      { h: 'Đường tròn ngoại tiếp, nội tiếp' },
      { p: 'Đường tròn ngoại tiếp tam giác đi qua 3 đỉnh; nội tiếp tiếp xúc 3 cạnh.' },
      { note: 'Khi đề có nhiều đối tượng giao nhau, vẽ hình minh hoạ sẽ giúp định hướng giải.' },
    ],
    [
      { q: 'Cho A(1; 0), B(0; 2). Tìm trung điểm M và viết phương trình trung trực AB.', a: 'M(1/2; 1). →AB = (−1; 2). Trung trực qua M, →n = →AB = (−1; 2): −(x − 1/2) + 2(y − 1) = 0 ⇔ −x + 2y − 3/2 = 0 ⇔ 2x − 4y + 3 = 0.' },
      { q: 'Tìm tâm đường tròn ngoại tiếp tam giác với đỉnh (0;0), (4;0), (0;3).', a: 'Tam giác vuông tại O. Tâm là trung điểm cạnh huyền (4;0)–(0;3): I(2; 3/2). R = √(4 + 9/4) = 5/2.' },
    ]
  ),

  'H10TOAN-w31-quiz': L(
    'Ôn tập Đại số nâng cao',
    'Ôn tập tổng hợp các chuyên đề đại số: mệnh đề — tập hợp, bất phương trình, hàm số bậc hai, dấu tam thức, phương trình vô tỉ, nhị thức Newton.',
    ['Hệ thống lại các định lý và công thức trọng tâm.', 'Luyện kỹ thuật giải các dạng bài đại số.', 'Tự đánh giá điểm mạnh — điểm yếu.'],
    [
      { h: 'Trọng tâm' },
      { ul: ['Mệnh đề và lượng từ', 'Tập hợp và phép toán', 'Bất phương trình bậc nhất 2 ẩn', 'Hàm số bậc hai và GTLN/GTNN', 'Dấu tam thức và BPT bậc hai', 'Phương trình quy về bậc hai', 'Nhị thức Newton'] },
      { note: 'Mỗi chuyên đề nên giải 5–7 bài đại diện để chắc kỹ năng.' },
    ],
    [
      { q: 'Tìm m để PT x² − (m+1)x + m = 0 có 2 nghiệm dương phân biệt.', a: 'Vieta: x₁ + x₂ = m + 1 > 0; x₁x₂ = m > 0; Δ = (m+1)² − 4m = (m−1)² > 0 ⇔ m ≠ 1. Kết hợp m > 0 và m ≠ 1.' },
      { q: 'Khai triển (2x − 1)⁵.', a: '(2x − 1)⁵ = (2x)⁵ + C(5,1)(2x)⁴(−1) + ... = 32x⁵ − 80x⁴ + 80x³ − 40x² + 10x − 1.' },
    ]
  ),

  'H10TOAN-w32-quiz': L(
    'Ôn tập Hình học — Vectơ, hệ thức lượng, đường thẳng',
    'Tổng kết các chuyên đề hình học: vectơ và phép toán, hệ thức lượng trong tam giác, hệ trục toạ độ, đường thẳng và đường tròn.',
    ['Vận dụng hệ thống các công thức hình học.', 'Giải bài tập tổng hợp về đường thẳng, đường tròn, conic.', 'Liên hệ vectơ và toạ độ.'],
    [
      { h: 'Vectơ và toạ độ' },
      { p: 'Mọi phép toán vectơ đều có thể chuyển sang phép toán trên toạ độ.' },
      { h: 'Hệ thức lượng' },
      { p: 'Định lý sin, cosin, các công thức diện tích là công cụ chính giải tam giác.' },
      { h: 'Đường thẳng, đường tròn, conic' },
      { p: 'Viết phương trình, xét vị trí tương đối, viết tiếp tuyến là 3 dạng cơ bản.' },
    ],
    [
      { q: 'Cho A(2;1), B(−1; 3). Tính →AB và độ dài đoạn AB.', a: '→AB = (−3; 2); AB = √(9 + 4) = √13.' },
      { q: 'Viết phương trình tiếp tuyến của (C): (x − 1)² + (y + 2)² = 5 tại điểm A(2; 0).', a: 'Tiếp tuyến tại A: (2 − 1)(x − 1) + (0 + 2)(y + 2) = 5 ⇔ x + 2y + 3 = 5 ⇔ x + 2y − 2 = 0.' },
    ]
  ),

  'H10TOAN-w33-quiz': L(
    'Ôn tập Thống kê và Xác suất',
    'Tổng kết thống kê mô tả (bảng tần số ghép lớp, các số đo vị trí và phân tán) và xác suất cổ điển.',
    ['Tính các số đặc trưng của mẫu ghép lớp.', 'Áp dụng công thức Laplace và công thức cộng xác suất.', 'Sử dụng quy tắc đếm.'],
    [
      { h: 'Thống kê' },
      { p: 'Trung bình, trung vị, mốt, phương sai, độ lệch chuẩn cho mẫu ghép lớp.' },
      { h: 'Xác suất' },
      { ul: ['P(A) = n(A)/n(Ω)', 'P(Ā) = 1 − P(A)', 'P(A ∪ B) = P(A) + P(B) − P(A ∩ B)'] },
      { h: 'Tổ hợp' },
      { p: 'Pₙ = n!, A(n,k) = n!/(n−k)!, C(n,k) = n!/(k!(n−k)!).' },
    ],
    [
      { q: 'Tung 3 xúc xắc. Tính xác suất tổng số chấm bằng 6.', a: 'Các bộ (i,j,k) với i+j+k=6: (1,1,4)×3 + (1,2,3)×6 + (2,2,2)×1 = 10. n(Ω) = 216. P = 10/216 = 5/108.' },
      { q: 'Lớp 30 học sinh, chọn 5 đi đại hội. Tính số cách chọn.', a: 'C(30, 5) = 142506.' },
    ]
  ),

  'H10TOAN-w34-quiz': L(
    'Đề ôn tập tổng hợp 1',
    'Đề ôn tập 1 tổng hợp các chuyên đề trọng tâm cả năm, theo cấu trúc đề kiểm tra học kỳ.',
    ['Luyện kỹ năng làm đề trong 60–90 phút.', 'Phân bổ thời gian giữa các phần.', 'Rà soát lỗi sai thường gặp.'],
    [
      { h: 'Cấu trúc đề' },
      { p: 'Khoảng 70% lý thuyết và dạng cơ bản, 30% vận dụng cao.' },
      { note: 'Trước khi làm bài, đọc qua đề 5 phút để chọn câu dễ làm trước.' },
    ],
    [
      { q: 'Tính số nghiệm thực của PT |x² − 4| = 3.', a: 'x² − 4 = ±3 ⇒ x² = 7 hoặc x² = 1 ⇒ x = ±√7 hoặc x = ±1. Có 4 nghiệm.' },
      { q: 'Tam giác ABC vuông tại A, AB = 6, AC = 8. Tính BC, diện tích, bán kính ngoại tiếp.', a: 'BC = √(36+64) = 10. S = ½·6·8 = 24. R = BC/2 = 5 (tâm là trung điểm BC).' },
    ]
  ),

  'H10TOAN-w35-quiz': L(
    'Đề ôn tập tổng hợp 2 (cuối năm)',
    'Đề ôn tập cuối năm bao trùm toàn bộ chương trình Toán 10 — chuẩn bị cho kỳ thi học kỳ 2 và làm nền lên lớp 11.',
    ['Vận dụng nâng cao các chuyên đề cốt lõi.', 'Tự đánh giá toàn diện kiến thức năm học.', 'Lập kế hoạch ôn hè cho lớp 11.'],
    [
      { h: 'Định hướng' },
      { p: 'Tập trung các dạng cần dùng nhiều ở lớp 11: hàm số, hệ thức lượng, vectơ và toạ độ, xác suất.' },
      { note: 'Sau lớp 10, lớp 11 sẽ bước vào lượng giác, dãy số, đạo hàm — đòi hỏi nền tảng vững.' },
    ],
    [
      { q: 'Cho elip x²/16 + y²/9 = 1. Tính diện tích hình chữ nhật cơ sở.', a: 'Hình chữ nhật có cạnh 2a × 2b = 8 × 6 = 48 đơn vị diện tích.' },
      { q: 'Lớp 30 học sinh có 18 nam, 12 nữ. Chọn ngẫu nhiên 5 đi dự đại hội. Tính xác suất có đúng 3 nữ.', a: 'P = C(12,3)·C(18,2)/C(30,5) = 220·153/142506 = 33660/142506 ≈ 0,236.' },
    ]
  ),

  'H10TOAN-w36-quiz': {
    topic: 'Kết thúc Toán 10 — Hành trang vào lớp 11',
    intro: 'Năm học lớp 10 khép lại — một bước ngoặt quan trọng khi bước vào THPT. Hôm nay chúng ta nhìn lại toàn bộ hành trình Toán 10, hệ thống hoá những kiến thức cốt lõi và chuẩn bị tâm thế tự tin cho lớp 11.',
    objectives: [
      'Hệ thống hoá toàn bộ chương trình Toán 10 theo các mảng kiến thức lớn.',
      'Nhận biết những chủ đề sẽ được nâng cao và mở rộng ở lớp 11.',
      'Xây dựng kế hoạch tự học hiệu quả trong kì nghỉ hè để sẵn sàng cho lớp 11.',
    ],
    theory: [
      { h: 'Bức tranh toàn cảnh Toán 10' },
      { ul: [
        'Đại số & Hàm số: tập hợp, hàm số bậc nhất/bậc hai, bất phương trình bậc nhất/bậc hai.',
        'Hình học phẳng & Toạ độ: vectơ, tích vô hướng, phương trình đường thẳng, đường tròn, elip.',
        'Lượng giác: giá trị lượng giác của góc, hệ thức lượng trong tam giác, định lý sin và cos.',
        'Thống kê & Xác suất: mô tả thống kê, xác suất cổ điển, tổ hợp và chỉnh hợp.',
      ] },
      { h: 'Viên đá nền cho lớp 11' },
      { ul: [
        'Hàm số bậc hai → Hàm lượng giác, phương trình lượng giác: nắm vững parabol giúp hiểu đồ thị sin/cos.',
        'Tổ hợp & Xác suất → Xác suất biến cố phức hợp, biến ngẫu nhiên rời rạc ở lớp 11.',
        'Hệ thức lượng tam giác → Mở rộng sang hệ lượng giác và hàm lượng giác tổng quát.',
        'Vectơ & Toạ độ → Hình học không gian, quan hệ song song – vuông góc ở lớp 11.',
      ] },
      { h: 'Lộ trình ôn hè thông minh' },
      { ul: [
        'Tuần 1–2: Củng cố phương trình và bất phương trình — nền tảng của mọi dạng toán lớp 11.',
        'Tuần 3–4: Ôn lại lượng giác và hệ thức lượng — sẽ mở rộng nhiều ở lớp 11.',
        'Tuần 5–6: Thực hành xác suất và tổ hợp — tránh bỡ ngỡ khi gặp biến ngẫu nhiên.',
      ] },
      { note: 'Lớp 11 nâng thêm một tầng trừu tượng (lượng giác tổng quát, giới hạn, đạo hàm) — nhưng học sinh nào nắm vững Toán 10 sẽ tiếp thu nhanh và tự tin hơn nhiều.' },
    ],
    examples: [
      { q: 'Tại sao kĩ năng vẽ đồ thị parabol ở lớp 10 lại quan trọng cho Toán lớp 11?', a: 'Lớp 11 học hàm lượng giác (y = sin x, y = cos x) và hàm số tổng quát. Kĩ năng nhận dạng chiều biến thiên, điểm cực đại/cực tiểu, trục đối xứng từ parabol được "tái sử dụng" trực tiếp. Học sinh quen đồ thị bậc hai sẽ vẽ đồ thị lượng giác và hàm hợp nhanh hơn nhiều.' },
      { q: 'Em nên ưu tiên ôn phần nào của Toán 10 trong kì hè để học lớp 11 nhẹ nhàng hơn?', a: 'Ưu tiên: (1) Phương trình và bất phương trình — vì lớp 11 sẽ giải phương trình lượng giác và phương trình mũ/logarit; (2) Lượng giác cơ bản — cầu nối trực tiếp sang hàm lượng giác; (3) Xác suất tổ hợp — lớp 11 nâng lên xác suất có điều kiện. Hình học toạ độ có thể ôn nhẹ hơn vì lớp 11 chuyển sang không gian.' },
    ],
  },
};
