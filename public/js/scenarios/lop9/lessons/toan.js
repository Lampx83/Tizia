// ============================================================
// Lớp 9 · TOÁN — Lý thuyết + Ví dụ 35 tuần (GDPT 2018, ôn thi vào 10).
// Key trùng id quiz: "S9TOAN-wNN-quiz".
// Bám SGK Toán 9 (KNTT / CTST / Cánh Diều) — thuật ngữ + tên bài đúng chuẩn.
// Văn phong nghiêm túc, đúng chuẩn cấp THCS cuối cấp.
// ============================================================

const L = (topic, intro, objectives, theory, examples) => ({ topic, intro, objectives, theory, examples });

export const S9TOAN_LESSONS = {
  'S9TOAN-w01-quiz': L(
    'Căn bậc hai — Định nghĩa và tính chất',
    'Bước vào lớp 9, chúng ta khởi đầu hành trình ôn thi vào 10 với chương Căn bậc hai và căn bậc ba — mảng kiến thức trọng tâm của đại số cuối cấp.',
    [
      'Nắm chắc định nghĩa căn bậc hai số học của số không âm.',
      'Phân biệt căn bậc hai và căn bậc hai số học.',
      'Biết điều kiện xác định và tính chất của hằng đẳng thức √(A²) = |A|.',
    ],
    [
      { h: 'Căn bậc hai của một số không âm' },
      { p: 'Với số a > 0, có đúng HAI số đối nhau mà bình phương bằng a, đó là √a và −√a, gọi là hai căn bậc hai của a. Số 0 có đúng một căn bậc hai là 0. Số âm KHÔNG có căn bậc hai.' },
      { h: 'Căn bậc hai số học' },
      { p: 'Với a ≥ 0, căn bậc hai SỐ HỌC của a là số x ≥ 0 sao cho x² = a, kí hiệu √a. Như vậy √a luôn là số KHÔNG ÂM, dùng để chỉ căn bậc hai không âm.' },
      { ul: ['√0 = 0; √a ≥ 0 với mọi a ≥ 0.', '(√a)² = a với mọi a ≥ 0.', 'Với a, b ≥ 0: a < b ⇔ √a < √b (so sánh hai căn bậc hai).'] },
      { h: 'Hằng đẳng thức √(A²) = |A|' },
      { p: 'Với MỌI số thực A (kể cả A âm), ta luôn có √(A²) = |A|. Nếu A ≥ 0 thì √(A²) = A; nếu A < 0 thì √(A²) = −A. Đây là kết quả rất hay dùng để rút gọn.' },
      { h: 'Điều kiện xác định của căn thức' },
      { p: 'Biểu thức √A (A là một biểu thức chứa biến) chỉ XÁC ĐỊNH khi và chỉ khi A ≥ 0. Tìm điều kiện xác định là bước bắt buộc trước khi biến đổi căn thức.' },
      { ul: ['√(2x − 6) xác định ⇔ 2x − 6 ≥ 0 ⇔ x ≥ 3.', '√(1/(x−1)) xác định ⇔ x − 1 > 0 ⇔ x > 1 (mẫu phải dương).'] },
      { note: 'Đây là kiến thức nền tảng, sẽ được dùng xuyên suốt cả năm. Sai lầm hay gặp: viết √(A²) = A trong khi A có thể âm — phải viết |A|.' },
    ],
    [
      { q: 'Tìm điều kiện xác định của √(2x − 6).', a: 'Căn thức xác định khi biểu thức dưới căn không âm: 2x − 6 ≥ 0 ⇔ 2x ≥ 6 ⇔ x ≥ 3. Vậy điều kiện là x ≥ 3.' },
      { q: 'Rút gọn √((−5)²) và √((3 − √10)²).', a: '√((−5)²) = |−5| = 5. Với 3 − √10: vì √10 ≈ 3,16 > 3 nên 3 − √10 < 0, do đó √((3 − √10)²) = |3 − √10| = √10 − 3.' },
      { q: 'So sánh 4 và √15.', a: 'Viết 4 = √16. Vì 16 > 15 nên √16 > √15, tức 4 > √15.' },
    ]
  ),

  'S9TOAN-w02-quiz': L(
    'Liên hệ phép nhân, phép chia và căn bậc hai',
    'Tuần này ta nghiên cứu hai quy tắc cơ bản giúp tính nhanh: khai phương một tích và khai phương một thương, cùng kĩ thuật đưa thừa số ra/vào dấu căn.',
    [
      'Áp dụng được √(a·b) = √a·√b và √(a/b) = √a/√b với điều kiện về dấu.',
      'Đưa thừa số ra ngoài và vào trong dấu căn.',
      'Rút gọn biểu thức số chứa căn bậc hai.',
    ],
    [
      { h: 'Khai phương một tích' },
      { p: 'Với hai số a ≥ 0 và b ≥ 0, ta có √(a·b) = √a · √b. Ngược lại √a · √b = √(a·b). Quy tắc này giúp tách số dưới căn thành tích để rút gọn.' },
      { h: 'Khai phương một thương' },
      { p: 'Với a ≥ 0 và b > 0, ta có √(a/b) = √a / √b. Tương tự √a / √b = √(a/b). Lưu ý mẫu phải DƯƠNG.' },
      { ul: ['√72 = √(36·2) = √36 · √2 = 6√2.', '√(25/4) = √25 / √4 = 5/2.', 'Chỉ áp dụng được khi các số dưới căn không âm.'] },
      { h: 'Đưa thừa số ra ngoài dấu căn' },
      { p: 'Với a ≥ 0 và b ≥ 0: √(a²·b) = a·√b. Ta tìm thừa số là số chính phương (4, 9, 16, 25, …) trong số dưới căn rồi đưa căn của nó ra ngoài.' },
      { h: 'Đưa thừa số vào trong dấu căn' },
      { p: 'Với a ≥ 0, b ≥ 0: a√b = √(a²·b). Khi a < 0: a√b = −√(a²·b). Kĩ thuật này tiện khi so sánh hai biểu thức chứa căn.' },
      { ul: ['√48 = √(16·3) = 4√3.', '3√5 = √(9·5) = √45.', 'So sánh 3√2 và 2√5: 3√2 = √18; 2√5 = √20; vì 18 < 20 nên 3√2 < 2√5.'] },
      { note: 'Khi áp dụng phải kiểm tra điều kiện về dấu của a, b. Với biểu thức chứa biến, luôn xét điều kiện xác định trước.' },
    ],
    [
      { q: 'Tính √72 và √(50/8).', a: '√72 = √(36·2) = 6√2. Với √(50/8): rút gọn trong căn 50/8 = 25/4, nên √(50/8) = √(25/4) = 5/2.' },
      { q: 'Rút gọn 2√20 − 3√45 + √80.', a: '√20 = 2√5; √45 = 3√5; √80 = 4√5. Thay vào: 2·2√5 − 3·3√5 + 4√5 = 4√5 − 9√5 + 4√5 = −√5.' },
      { q: 'Không dùng máy tính, so sánh 5√3 và 3√7.', a: 'Đưa vào trong căn: 5√3 = √75; 3√7 = √63. Vì 75 > 63 nên √75 > √63, tức 5√3 > 3√7.' },
    ]
  ),

  'S9TOAN-w03-quiz': L(
    'Biến đổi đơn giản biểu thức chứa căn bậc hai',
    'Để tính toán và rút gọn nhanh, ta học các kĩ thuật biến đổi: khử mẫu của biểu thức lấy căn, trục căn thức ở mẫu và nhân với biểu thức liên hợp.',
    [
      'Khử mẫu của biểu thức lấy căn.',
      'Trục căn thức ở mẫu trong các trường hợp cơ bản.',
      'Dùng biểu thức liên hợp để trục căn và rút gọn.',
    ],
    [
      { h: 'Khử mẫu của biểu thức lấy căn' },
      { p: 'Với a·b ≥ 0 và b ≠ 0: √(a/b) = √(a·b)/|b|. Cụ thể khi a ≥ 0, b > 0 thì √(a/b) = √(ab)/b. Mục đích là làm cho dưới căn không còn mẫu số.' },
      { h: 'Trục căn thức ở mẫu — dạng đơn' },
      { p: 'Với mẫu là một căn: A/√b = A·√b/b (b > 0). Ta nhân cả tử và mẫu với √b để mẫu hết dấu căn.' },
      { ul: ['5/√3 = 5√3/3.', '√(3/5) = √15/5.'] },
      { h: 'Biểu thức liên hợp' },
      { p: 'Biểu thức liên hợp của (√a + √b) là (√a − √b) và ngược lại. Tích hai biểu thức liên hợp là một hằng đẳng thức: (√a + √b)(√a − √b) = a − b — không còn dấu căn.' },
      { h: 'Trục căn thức ở mẫu — dạng tổng/hiệu căn' },
      { p: 'Với mẫu dạng (√a ± √b), ta nhân cả tử và mẫu với biểu thức liên hợp của mẫu. Khi đó mẫu trở thành a − b (số không còn căn).' },
      { ul: ['1/(√5 − √2) = (√5 + √2)/((√5)² − (√2)²) = (√5 + √2)/3.', 'c/(√a + b) nhân liên hợp (√a − b) khi a ≠ b².'] },
      { note: 'Trục căn thức làm mẫu số không còn dấu căn — đây là bước "chuẩn hoá" để cộng/trừ các phân thức chứa căn. Luôn kiểm tra điều kiện để mẫu khác 0.' },
    ],
    [
      { q: 'Trục căn thức ở mẫu của 5/√3.', a: 'Nhân tử và mẫu với √3: 5/√3 = 5·√3/(√3·√3) = 5√3/3.' },
      { q: 'Trục căn thức ở mẫu của 1/(√5 − √2).', a: 'Nhân tử và mẫu với liên hợp (√5 + √2): 1/(√5 − √2) = (√5 + √2)/((√5)² − (√2)²) = (√5 + √2)/(5 − 2) = (√5 + √2)/3.' },
      { q: 'Rút gọn 1/(√3 + 1) + 1/(√3 − 1).', a: 'Trục từng phân thức: 1/(√3 + 1) = (√3 − 1)/2; 1/(√3 − 1) = (√3 + 1)/2. Cộng: [(√3 − 1) + (√3 + 1)]/2 = 2√3/2 = √3.' },
    ]
  ),

  'S9TOAN-w04-quiz': L(
    'Rút gọn biểu thức chứa căn — Căn bậc ba',
    'Tuần này ta phối hợp mọi phép biến đổi để rút gọn biểu thức chứa căn có chứa biến, rồi làm quen với căn bậc ba — căn xác định với mọi số thực.',
    [
      'Rút gọn biểu thức chứa căn bậc hai có chứa biến (kèm điều kiện xác định).',
      'Nắm định nghĩa và tính chất của căn bậc ba.',
      'Tính căn bậc ba của một số cụ thể.',
    ],
    [
      { h: 'Rút gọn biểu thức chứa căn có biến' },
      { p: 'Quy trình: (1) tìm điều kiện xác định; (2) phân tích tử/mẫu thành nhân tử (thường dùng hằng đẳng thức với √x); (3) quy đồng, rút gọn; (4) kết luận và đối chiếu điều kiện.' },
      { ul: ['x − 1 = (√x − 1)(√x + 1) với x ≥ 0.', 'x + 2√x + 1 = (√x + 1)² với x ≥ 0.', 'Luôn ghi điều kiện trước khi rút gọn, ví dụ x ≥ 0, x ≠ 1.'] },
      { h: 'Định nghĩa căn bậc ba' },
      { p: 'Căn bậc ba của số a là số x sao cho x³ = a, kí hiệu ∛a. Với MỌI số thực a, căn bậc ba ∛a tồn tại và DUY NHẤT — kể cả khi a âm.' },
      { h: 'Tính chất căn bậc ba' },
      { ul: ['∛0 = 0; ∛(a³) = a với mọi a.', 'a < b ⇔ ∛a < ∛b (đồng biến).', '∛(a·b) = ∛a · ∛b; ∛(a/b) = ∛a/∛b (b ≠ 0).'] },
      { h: 'Khác biệt với căn bậc hai' },
      { p: 'Căn bậc hai chỉ xác định với số không âm; căn bậc ba xác định với mọi số thực. Vì vậy ∛(−8) = −2, trong khi √(−8) không tồn tại.' },
      { note: 'Khi rút gọn biểu thức có biến, kết quả phải kèm điều kiện xác định. Nhiều bài thi trừ điểm nếu quên ghi điều kiện.' },
    ],
    [
      { q: 'Tính ∛(−64) và ∛54 − ∛2.', a: 'Vì (−4)³ = −64 nên ∛(−64) = −4. Với ∛54 − ∛2: ∛54 = ∛(27·2) = 3∛2, do đó 3∛2 − ∛2 = 2∛2.' },
      { q: 'Rút gọn A = (√x − 1)/(x − 1) với x ≥ 0, x ≠ 1.', a: 'Mẫu: x − 1 = (√x − 1)(√x + 1). Vậy A = (√x − 1)/[(√x − 1)(√x + 1)] = 1/(√x + 1).' },
      { q: 'Tính giá trị của B = (x + 2√x + 1)/(√x + 1) tại x = 9.', a: 'Tử: x + 2√x + 1 = (√x + 1)². Vậy B = (√x + 1)²/(√x + 1) = √x + 1. Tại x = 9: B = √9 + 1 = 3 + 1 = 4.' },
    ]
  ),

  'S9TOAN-w05-quiz': L(
    'Ôn tập chương Căn bậc hai',
    'Tổng hợp các dạng bài thường gặp về căn thức — bước chuẩn bị quan trọng cho phần hàm số và hệ phương trình tiếp theo.',
    [
      'Hệ thống hoá các phép biến đổi căn thức.',
      'Rút gọn biểu thức và tìm giá trị của biến.',
      'Giải phương trình chứa căn cơ bản.',
    ],
    [
      { h: 'Bản đồ kiến thức chương căn thức' },
      { p: 'Chương đi từ định nghĩa căn bậc hai số học → liên hệ với phép nhân/chia → các phép biến đổi (đưa thừa số ra/vào, khử mẫu, trục căn, liên hợp) → rút gọn biểu thức có biến → căn bậc ba.' },
      { h: 'Các hằng đẳng thức cốt lõi' },
      { ul: ['√(A²) = |A| với mọi A.', '(√a)² = a với a ≥ 0.', '(√a + √b)(√a − √b) = a − b.', '√(a·b) = √a·√b; √(a/b) = √a/√b (điều kiện về dấu).'] },
      { h: 'Dạng 1 — Rút gọn biểu thức số' },
      { p: 'Tách số dưới căn thành tích có thừa số chính phương, đưa ra ngoài rồi cộng/trừ các căn ĐỒNG DẠNG (cùng phần dưới căn).' },
      { h: 'Dạng 2 — Rút gọn biểu thức chứa biến' },
      { p: 'Tìm điều kiện xác định → phân tích nhân tử → quy đồng → rút gọn → tìm giá trị, so sánh hoặc tìm x nguyên để biểu thức nguyên.' },
      { h: 'Dạng 3 — Giải phương trình chứa căn' },
      { p: 'Với √A = m (m ≥ 0): điều kiện A ≥ 0, bình phương hai vế A = m². Với √A = B: cần B ≥ 0, rồi A = B². Luôn THỬ LẠI nghiệm để loại nghiệm ngoại lai.' },
      { note: 'Nắm vững √(A²) = |A| và (√a)² = a là chìa khoá. Khi bình phương hai vế phương trình, bắt buộc kiểm tra điều kiện và thử lại nghiệm.' },
    ],
    [
      { q: 'Rút gọn √98 − √50 + √32.', a: '√98 = √(49·2) = 7√2; √50 = √(25·2) = 5√2; √32 = √(16·2) = 4√2. Vậy 7√2 − 5√2 + 4√2 = 6√2.' },
      { q: 'Giải phương trình √(x + 1) = 3.', a: 'Điều kiện x + 1 ≥ 0 ⇔ x ≥ −1. Bình phương hai vế: x + 1 = 9 ⇒ x = 8. Vì 8 ≥ −1 nên nhận. Vậy x = 8.' },
      { q: 'Tính giá trị (√3 + √2)(√3 − √2) + (√7 − √5)(√7 + √5).', a: 'Áp dụng (√a + √b)(√a − √b) = a − b: (3 − 2) + (7 − 5) = 1 + 2 = 3.' },
    ]
  ),

  'S9TOAN-w06-quiz': L(
    'Hàm số bậc nhất y = ax + b — Định nghĩa',
    'Hàm số bậc nhất là nền tảng để hiểu các loại hàm số khác. Tuần này ta học định nghĩa, đồ thị và tính đồng biến/nghịch biến.',
    [
      'Nhận dạng hàm số bậc nhất y = ax + b (a ≠ 0).',
      'Xác định tính đồng biến/nghịch biến qua hệ số a.',
      'Nắm dạng đồ thị và cách vẽ đường thẳng y = ax + b.',
    ],
    [
      { h: 'Định nghĩa hàm số bậc nhất' },
      { p: 'Hàm số bậc nhất là hàm số cho bởi công thức y = ax + b, trong đó a, b là các số cho trước và a ≠ 0. Khi b = 0, hàm có dạng y = ax.' },
      { h: 'Các thành phần của hàm số' },
      { ul: ['a là hệ số góc của đường thẳng.', 'b là tung độ gốc — giá trị y khi x = 0.', 'Điều kiện để là hàm bậc nhất: a ≠ 0.'] },
      { h: 'Tính đồng biến — nghịch biến' },
      { p: 'Hàm số bậc nhất y = ax + b xác định với mọi x ∈ ℝ và: nếu a > 0 thì hàm ĐỒNG BIẾN (x tăng thì y tăng); nếu a < 0 thì hàm NGHỊCH BIẾN (x tăng thì y giảm).' },
      { h: 'Đồ thị hàm số bậc nhất' },
      { p: 'Đồ thị của y = ax + b là một ĐƯỜNG THẲNG cắt trục tung tại điểm (0; b) và (khi a ≠ 0) cắt trục hoành tại điểm (−b/a; 0).' },
      { ul: ['Để vẽ đường thẳng, chỉ cần xác định 2 điểm thuộc nó.', 'Thường lấy giao với hai trục: (0; b) và (−b/a; 0).'] },
      { note: 'Khi bài cho tham số m, để y = (m − 3)x + 5 là hàm bậc nhất phải đặt điều kiện hệ số của x khác 0, tức m − 3 ≠ 0.' },
    ],
    [
      { q: 'Hàm số y = (m − 3)x + 5 là hàm bậc nhất khi nào?', a: 'Hàm bậc nhất cần hệ số của x khác 0: m − 3 ≠ 0 ⇔ m ≠ 3. Vậy với mọi m ≠ 3, hàm đã cho là hàm bậc nhất.' },
      { q: 'Tìm m để hàm số y = (2m − 1)x + 4 đồng biến trên ℝ.', a: 'Hàm đồng biến khi hệ số a > 0: 2m − 1 > 0 ⇔ m > 1/2. Vậy m > 1/2.' },
      { q: 'Vẽ đồ thị hàm số y = 2x − 4 (xác định giao với hai trục).', a: 'Giao với trục tung: cho x = 0 ⇒ y = −4, được điểm (0; −4). Giao với trục hoành: cho y = 0 ⇒ 2x − 4 = 0 ⇒ x = 2, được điểm (2; 0). Nối hai điểm (0; −4) và (2; 0) ta được đồ thị.' },
    ]
  ),

  'S9TOAN-w07-quiz': L(
    'Đường thẳng — Hệ số góc, vị trí tương đối',
    'Hiểu rõ hệ số góc giúp ta phân tích vị trí tương đối giữa các đường thẳng — kiến thức thường gặp trong đề thi vào 10.',
    [
      'Hiểu ý nghĩa hình học của hệ số góc.',
      'Tính hệ số góc của đường thẳng đi qua hai điểm.',
      'Xét vị trí tương đối của hai đường thẳng y = ax + b và y = a′x + b′.',
    ],
    [
      { h: 'Hệ số góc của đường thẳng' },
      { p: 'Trong y = ax + b, hệ số a gọi là hệ số góc. Gọi α là góc tạo bởi đường thẳng và chiều dương trục Ox: khi a > 0 thì α nhọn, khi a < 0 thì α tù; và tan α = a (khi a > 0).' },
      { h: 'Tính hệ số góc qua hai điểm' },
      { p: 'Đường thẳng đi qua hai điểm (x₁; y₁) và (x₂; y₂) (x₁ ≠ x₂) có hệ số góc a = (y₂ − y₁)/(x₂ − x₁).' },
      { h: 'Vị trí tương đối của hai đường thẳng' },
      { p: 'Cho (d): y = ax + b và (d′): y = a′x + b′. Vị trí tương đối được xác định bằng cách so sánh các hệ số:' },
      { ul: ['(d) // (d′) ⇔ a = a′ và b ≠ b′.', '(d) ≡ (d′) ⇔ a = a′ và b = b′.', '(d) cắt (d′) ⇔ a ≠ a′.', '(d) ⊥ (d′) ⇔ a · a′ = −1.'] },
      { h: 'Tìm toạ độ giao điểm' },
      { p: 'Khi hai đường cắt nhau, toạ độ giao điểm là nghiệm của hệ gồm hai phương trình đường thẳng; thường giải bằng cách cho ax + b = a′x + b′ để tìm x rồi suy ra y.' },
      { note: 'Hệ số góc còn cho biết độ dốc: |a| càng lớn đường càng dốc. Hai đường song song thì cùng độ dốc nhưng cắt trục tung ở vị trí khác nhau.' },
    ],
    [
      { q: 'Tính hệ số góc của đường thẳng đi qua A(1; 4) và B(3; 10).', a: 'a = (y_B − y_A)/(x_B − x_A) = (10 − 4)/(3 − 1) = 6/2 = 3.' },
      { q: 'Xét quan hệ giữa hai đường y = 2x + 1 và y = (−1/2)x + 3.', a: 'Tích hai hệ số góc: 2 · (−1/2) = −1. Vậy hai đường vuông góc với nhau.' },
      { q: 'Tìm toạ độ giao điểm của y = 2x − 1 và y = −x + 5.', a: 'Cho hai vế bằng nhau: 2x − 1 = −x + 5 ⇒ 3x = 6 ⇒ x = 2. Suy ra y = 2·2 − 1 = 3. Giao điểm là (2; 3).' },
    ]
  ),

  'S9TOAN-w08-quiz': L(
    'Phương trình đường thẳng — Bài toán xác định',
    'Bài toán "viết phương trình đường thẳng" thoả mãn điều kiện cho trước là dạng thường gặp trong đề thi vào 10.',
    [
      'Viết phương trình đường thẳng đi qua hai điểm cho trước.',
      'Viết phương trình đường thẳng qua một điểm với hệ số góc cho trước.',
      'Viết phương trình đường thẳng song song hoặc vuông góc với đường cho trước.',
    ],
    [
      { h: 'Bản chất bài toán' },
      { p: 'Phương trình y = ax + b có hai ẩn số là a và b. Muốn xác định đường thẳng, ta cần HAI điều kiện độc lập để lập và giải hệ tìm a, b.' },
      { h: 'Trường hợp 1 — Đi qua hai điểm' },
      { p: 'Thay toạ độ từng điểm vào y = ax + b được hai phương trình theo a, b; giải hệ này.' },
      { h: 'Trường hợp 2 — Qua một điểm, biết hệ số góc' },
      { p: 'Biết a (do song song với đường khác hoặc đề cho), thay toạ độ điểm để tìm b.' },
      { ul: ['Song song (d): y = a₀x + b₀ ⇒ lấy a = a₀ (và b ≠ b₀).', 'Vuông góc (d) ⇒ lấy a = −1/a₀.'] },
      { h: 'Trường hợp 3 — Cắt trục / đi qua gốc' },
      { p: 'Đi qua gốc toạ độ O ⇒ b = 0. Cắt trục tung tại (0; m) ⇒ b = m. Cắt trục hoành tại (n; 0) cho thêm một phương trình a·n + b = 0.' },
      { note: 'Luôn giữ điều kiện a ≠ 0 (để là hàm bậc nhất). Khi yêu cầu "song song", kết quả phải khác đường đã cho ở tung độ gốc, nếu trùng thì kết luận lại.' },
    ],
    [
      { q: 'Viết phương trình đường thẳng đi qua A(0; 2) và B(1; 5).', a: 'Qua A(0; 2): thay vào y = ax + b ⇒ b = 2. Qua B(1; 5): a·1 + 2 = 5 ⇒ a = 3. Vậy y = 3x + 2.' },
      { q: 'Viết phương trình đường thẳng đi qua M(1; 4) và song song với y = 2x − 1.', a: 'Song song ⇒ a = 2. Qua M(1; 4): 2·1 + b = 4 ⇒ b = 2. Vậy y = 2x + 2 (khác đường đã cho nên thoả mãn song song).' },
      { q: 'Viết phương trình đường thẳng đi qua N(2; −1) và vuông góc với y = (1/3)x + 5.', a: 'Vuông góc ⇒ a = −1/(1/3) = −3. Qua N(2; −1): −3·2 + b = −1 ⇒ b = 5. Vậy y = −3x + 5.' },
    ]
  ),

  'S9TOAN-w09-quiz': L(
    'Ứng dụng hàm bậc nhất',
    'Hàm bậc nhất xuất hiện trong nhiều bài toán thực tế: cước phí, chuyển động đều, giá điện theo bậc thang — đây thường là câu vận dụng trong đề thi.',
    [
      'Mô hình hoá bài toán thực tế bằng hàm số bậc nhất.',
      'Giải các bài toán ứng dụng và trả lời câu hỏi thực tế.',
      'Đọc ý nghĩa của hệ số góc và tung độ gốc trong bối cảnh thực tế.',
    ],
    [
      { h: 'Vì sao dùng hàm bậc nhất?' },
      { p: 'Nhiều đại lượng thực tế thay đổi đều theo một đại lượng khác (cước theo phút gọi, quãng đường theo thời gian khi đi đều…). Quan hệ "thay đổi đều" đó được mô tả bằng hàm bậc nhất y = ax + b.' },
      { h: 'Ý nghĩa của a và b' },
      { ul: ['b (tung độ gốc): giá trị ban đầu, khi x = 0 (ví dụ phí thuê bao cố định).', 'a (hệ số góc): mức thay đổi của y khi x tăng 1 đơn vị (ví dụ giá mỗi phút gọi).'] },
      { h: 'Quy trình giải bài toán ứng dụng' },
      { p: 'Bước 1: chọn ẩn và đơn vị (thường x là số lượng). Bước 2: lập công thức hàm y theo x. Bước 3: dùng công thức để tính giá trị, hoặc giải phương trình/bất phương trình để trả lời câu hỏi.' },
      { h: 'Bài toán so sánh hai phương án' },
      { p: 'Khi có hai gói/cách tính khác nhau, lập hai hàm rồi giải phương trình y₁ = y₂ để tìm điểm "hoà vốn", từ đó kết luận phương án nào lợi hơn theo từng khoảng giá trị.' },
      { note: 'Chú ý ĐIỀU KIỆN của biến (số phút, thời gian, số sản phẩm đều không âm) và đơn vị đo phải thống nhất.' },
    ],
    [
      { q: 'Cước gọi 200 đồng/phút cộng thuê bao 30 000 đồng/tháng. Lập hàm số tiền y theo số phút gọi x trong tháng.', a: 'Phí cố định 30 000 (khi x = 0), mỗi phút thêm 200 đồng. Vậy y = 200x + 30 000 (x ≥ 0).' },
      { q: 'Một bể chứa 100 lít nước, mở vòi xả 2 lít/phút. Lập hàm thể tích V theo thời gian t.', a: 'Lúc đầu 100 lít, mỗi phút giảm 2 lít: V = 100 − 2t (lít), với 0 ≤ t ≤ 50 (vì bể cạn khi t = 50).' },
      { q: 'Với hàm y = 200x + 30 000 ở trên, nếu trong tháng tốn 50 000 đồng thì đã gọi bao nhiêu phút?', a: 'Giải 200x + 30 000 = 50 000 ⇒ 200x = 20 000 ⇒ x = 100. Vậy đã gọi 100 phút.' },
    ]
  ),

  'S9TOAN-w10-quiz': L(
    'Hệ phương trình bậc nhất hai ẩn — Phương pháp thế',
    'Phương pháp thế là kĩ thuật cơ bản để giải hệ hai phương trình bậc nhất hai ẩn — thường gặp trong câu 2 của đề thi vào 10.',
    [
      'Hiểu khái niệm phương trình bậc nhất hai ẩn và nghiệm của hệ.',
      'Giải hệ bằng phương pháp thế.',
      'Nhận biết hệ vô nghiệm và hệ có vô số nghiệm.',
    ],
    [
      { h: 'Phương trình bậc nhất hai ẩn' },
      { p: 'Phương trình dạng ax + by = c (a, b không đồng thời bằng 0) gọi là phương trình bậc nhất hai ẩn x, y. Nghiệm là mỗi cặp số (x₀; y₀) thoả mãn phương trình.' },
      { h: 'Hệ phương trình bậc nhất hai ẩn' },
      { p: 'Hệ gồm hai phương trình bậc nhất hai ẩn. Nghiệm của hệ là cặp (x; y) thoả mãn ĐỒNG THỜI cả hai phương trình — về hình học là toạ độ giao điểm của hai đường thẳng.' },
      { h: 'Các bước của phương pháp thế' },
      { ul: ['Bước 1: từ một phương trình, biểu diễn một ẩn theo ẩn còn lại.', 'Bước 2: thế biểu thức đó vào phương trình kia, được phương trình một ẩn.', 'Bước 3: giải phương trình một ẩn rồi thế ngược lại tìm ẩn kia.'] },
      { h: 'Biện luận số nghiệm' },
      { p: 'Sau khi thế, nếu thu được phương trình dạng 0 = m (m ≠ 0) thì hệ VÔ NGHIỆM; nếu thu được 0 = 0 (luôn đúng) thì hệ có VÔ SỐ NGHIỆM.' },
      { note: 'Nên chọn phương trình và ẩn có hệ số bằng 1 hoặc −1 để biểu diễn cho gọn, tránh phân số.' },
    ],
    [
      { q: 'Giải hệ { 2x + y = 5; x − y = 1 } bằng phương pháp thế.', a: 'Từ phương trình thứ hai: x = y + 1. Thế vào phương trình đầu: 2(y + 1) + y = 5 ⇒ 3y + 2 = 5 ⇒ y = 1, suy ra x = 2. Nghiệm (x; y) = (2; 1).' },
      { q: 'Giải hệ { x + 2y = 4; 3x + 6y = 12 }.', a: 'Từ phương trình đầu: x = 4 − 2y. Thế vào: 3(4 − 2y) + 6y = 12 ⇒ 12 = 12 (luôn đúng). Hệ có vô số nghiệm, dạng x = 4 − 2y với y tuỳ ý.' },
      { q: 'Giải hệ { x − 3y = 2; 2x − 6y = 9 }.', a: 'Từ phương trình đầu: x = 2 + 3y. Thế vào: 2(2 + 3y) − 6y = 9 ⇒ 4 = 9 (vô lí). Vậy hệ vô nghiệm.' },
    ]
  ),

  'S9TOAN-w11-quiz': L(
    'Hệ phương trình — Phương pháp cộng đại số',
    'Phương pháp cộng đại số nhanh hơn phương pháp thế trong nhiều trường hợp — đặc biệt khi hệ có hệ số "đẹp".',
    [
      'Giải hệ bằng phương pháp cộng đại số.',
      'Biết nhân hai vế để tạo hệ số đối nhau rồi khử ẩn.',
      'Chọn phương pháp phù hợp cho từng hệ.',
    ],
    [
      { h: 'Ý tưởng của phương pháp cộng đại số' },
      { p: 'Ta biến đổi để hệ số của MỘT ẩn ở hai phương trình bằng nhau (hoặc đối nhau), rồi cộng/trừ hai phương trình để KHỬ ẩn đó, đưa về phương trình một ẩn.' },
      { h: 'Các bước thực hiện' },
      { ul: ['Bước 1: nhân hai vế mỗi phương trình với số thích hợp để hệ số một ẩn bằng nhau hoặc đối nhau.', 'Bước 2: cộng (nếu đối nhau) hoặc trừ (nếu bằng nhau) hai phương trình để khử ẩn.', 'Bước 3: giải phương trình một ẩn rồi thế ngược tìm ẩn còn lại.'] },
      { h: 'Trường hợp thuận lợi' },
      { p: 'Khi hệ số của một ẩn đã bằng nhau hoặc đối nhau (ví dụ +2y và −2y), ta cộng/trừ ngay mà không cần nhân.' },
      { h: 'So sánh hai phương pháp' },
      { p: 'Phương pháp thế tiện khi có ẩn hệ số ±1; phương pháp cộng đại số tiện khi hệ số hai ẩn cân đối. Cả hai đều cho cùng nghiệm — chọn cách tính ít sai sót.' },
      { note: 'Sau khi tìm được nghiệm, nên THỬ LẠI vào cả hai phương trình ban đầu để chắc chắn không nhầm dấu khi cộng/trừ.' },
    ],
    [
      { q: 'Giải hệ { 3x + 2y = 7; 5x − 2y = 1 } bằng cộng đại số.', a: 'Hệ số của y đã đối nhau (+2y và −2y). Cộng hai phương trình: 8x = 8 ⇒ x = 1. Thế vào phương trình đầu: 3 + 2y = 7 ⇒ y = 2. Nghiệm (1; 2).' },
      { q: 'Giải hệ { 2x + 3y = 12; 4x − y = 10 }.', a: 'Nhân phương trình thứ hai với 3: 12x − 3y = 30. Cộng với phương trình đầu (2x + 3y = 12): 14x = 42 ⇒ x = 3. Thế: 4·3 − y = 10 ⇒ y = 2. Nghiệm (3; 2).' },
      { q: 'Giải hệ { 5x + 2y = 4; 6x + 3y = 6 }.', a: 'Nhân phương trình đầu với 3, phương trình sau với 2: { 15x + 6y = 12; 12x + 6y = 12 }. Trừ: 3x = 0 ⇒ x = 0. Thế: 2y = 4 ⇒ y = 2. Nghiệm (0; 2).' },
    ]
  ),

  'S9TOAN-w12-quiz': L(
    'Giải bài toán bằng cách lập hệ phương trình',
    'Dạng "lập hệ" rất phổ biến trong đề thi: chuyển bài toán có lời văn thành hệ phương trình để giải.',
    [
      'Phân tích đề, đặt ẩn (kèm điều kiện) và lập hệ phương trình.',
      'Giải hệ và đối chiếu điều kiện để kết luận.',
      'Nhận diện các dạng thường gặp: số học, chuyển động, năng suất.',
    ],
    [
      { h: 'Quy trình ba bước' },
      { p: 'Giải bài toán bằng cách lập hệ gồm ba bước: (1) lập hệ — chọn ẩn, đặt điều kiện, biểu diễn đại lượng và lập hệ; (2) giải hệ; (3) đối chiếu điều kiện và trả lời.' },
      { h: 'Bước 1 — Chọn ẩn và đặt điều kiện' },
      { ul: ['Mỗi đại lượng chưa biết đặt một ẩn (thường x, y).', 'Ghi rõ đơn vị và điều kiện (số người, tuổi, vận tốc, kích thước… đều dương).'] },
      { h: 'Bước 2 — Biểu diễn và lập hệ' },
      { p: 'Dựa vào dữ kiện, biểu diễn các đại lượng còn lại theo ẩn rồi thiết lập hai phương trình ứng với hai mối quan hệ trong đề.' },
      { h: 'Các dạng quen thuộc' },
      { ul: ['Toán chuyển động: dùng s = v·t; chú ý mối quan hệ thời gian/vận tốc.', 'Toán năng suất, làm chung làm riêng: tổng phần việc mỗi giờ.', 'Toán tìm số, toán tuổi: lập quan hệ tổng/hiệu/tỉ.'] },
      { note: 'Đặc biệt lưu ý đối chiếu điều kiện: nghiệm âm hoặc không thoả điều kiện thực tế phải loại.' },
    ],
    [
      { q: 'Hai số có tổng 25 và hiệu 7. Tìm hai số.', a: 'Gọi hai số là x, y (x > y). Hệ { x + y = 25; x − y = 7 }. Cộng hai phương trình: 2x = 32 ⇒ x = 16, suy ra y = 9. Hai số là 16 và 9.' },
      { q: 'Một ô tô đi quãng đường 240 km. Nếu tăng vận tốc thêm 10 km/h thì thời gian giảm 1 giờ. Tính vận tốc ban đầu.', a: 'Gọi vận tốc v (km/h, v > 0), thời gian t (giờ). Ta có v·t = 240 và (v + 10)(t − 1) = 240. Từ đó suy ra hệ; giải được v = 40 km/h (loại nghiệm âm). Vận tốc ban đầu 40 km/h.' },
      { q: 'Hai vòi nước cùng chảy vào bể đầy trong 6 giờ. Nếu chảy riêng, vòi I nhanh hơn vòi II 5 giờ. Lập hệ (không cần giải xong).', a: 'Gọi thời gian vòi I, vòi II chảy đầy bể là x, y giờ (x, y > 6, y = x + 5). Mỗi giờ vòi I chảy 1/x bể, vòi II chảy 1/y bể. Vì cùng chảy 6 giờ đầy bể: 1/x + 1/y = 1/6. Kết hợp y = x + 5 được hệ cần lập.' },
    ]
  ),

  'S9TOAN-w13-quiz': L(
    'Ôn tập học kì I — Đại số',
    'Hệ thống hoá toàn bộ kiến thức đại số đã học ở học kì I: căn thức, hàm số bậc nhất, hệ phương trình bậc nhất hai ẩn.',
    [
      'Tổng hợp ba chủ đề đại số học kì I.',
      'Vận dụng giải bài tập tổng hợp.',
      'Rèn kĩ năng trình bày bài thi.',
    ],
    [
      { h: 'Bản đồ kiến thức đại số HK1' },
      { p: 'Đại số HK1 gồm ba mảng: căn bậc hai/căn bậc ba; hàm số bậc nhất và đường thẳng; hệ phương trình bậc nhất hai ẩn. Ba mảng này tiếp tục được dùng ở HK2 và trong đề thi vào 10.' },
      { h: 'Mảng 1 — Căn thức' },
      { p: 'Nhớ: √(A²) = |A|; các phép biến đổi đưa thừa số ra/vào căn, trục căn thức, liên hợp; rút gọn biểu thức có biến kèm điều kiện xác định.' },
      { h: 'Mảng 2 — Hàm số bậc nhất' },
      { ul: ['y = ax + b (a ≠ 0): a > 0 đồng biến, a < 0 nghịch biến.', 'Đồ thị là đường thẳng cắt Oy tại (0; b).', 'Vị trí tương đối: song song (a = a′, b ≠ b′), cắt (a ≠ a′), vuông góc (a·a′ = −1).'] },
      { h: 'Mảng 3 — Hệ phương trình' },
      { p: 'Giải hệ bằng phương pháp thế hoặc cộng đại số; biện luận hệ vô nghiệm/vô số nghiệm; giải bài toán bằng cách lập hệ.' },
      { note: 'Khi làm bài: ghi đủ điều kiện xác định, kiểm tra lại nghiệm, trình bày từng bước rõ ràng để được điểm thành phần.' },
    ],
    [
      { q: 'Cho hai đường y = (m − 1)x + 2 và y = 3x − 1. Tìm m để chúng cắt nhau.', a: 'Hai đường cắt nhau khi hệ số góc khác nhau: m − 1 ≠ 3 ⇔ m ≠ 4. Vậy với mọi m ≠ 4 chúng cắt nhau.' },
      { q: 'Tính (√3 + √2)(√3 − √2) + 2√2·√2.', a: '(√3 + √2)(√3 − √2) = 3 − 2 = 1; 2√2·√2 = 2·2 = 4. Tổng = 1 + 4 = 5.' },
      { q: 'Giải hệ { 2x + 3y = 13; x − y = −1 }.', a: 'Từ phương trình hai: x = y − 1. Thế vào: 2(y − 1) + 3y = 13 ⇒ 5y = 15 ⇒ y = 3, suy ra x = 2. Nghiệm (2; 3).' },
    ]
  ),

  'S9TOAN-w14-quiz': L(
    'Hệ thức lượng trong tam giác vuông — Phần 1',
    'Mở đầu phần Hình học cuối cấp: các hệ thức về cạnh và đường cao trong tam giác vuông — công cụ tính độ dài rất mạnh.',
    [
      'Nắm các hệ thức về cạnh góc vuông và hình chiếu.',
      'Nắm các hệ thức về đường cao trong tam giác vuông.',
      'Áp dụng vào tính độ dài các đoạn thẳng.',
    ],
    [
      { h: 'Cấu hình bài toán' },
      { p: 'Cho tam giác ABC vuông tại A, đường cao AH (H ∈ BC). Đặt BC = a (cạnh huyền), AB = c, AC = b (hai cạnh góc vuông), AH = h, BH = c′, CH = b′ (hình chiếu của hai cạnh góc vuông lên cạnh huyền).' },
      { h: 'Hệ thức giữa cạnh góc vuông và hình chiếu' },
      { ul: ['b² = a·b′ (AC² = BC·CH).', 'c² = a·c′ (AB² = BC·BH).'] },
      { h: 'Hệ thức về đường cao' },
      { ul: ['h² = b′·c′ (AH² = BH·CH).', 'a·h = b·c (BC·AH = AB·AC).', '1/h² = 1/b² + 1/c².'] },
      { h: 'Định lí Pythagore (Pi-ta-go)' },
      { p: 'Trong tam giác vuông tại A: a² = b² + c² (BC² = AB² + AC²). Đây là hệ thức quen thuộc, dùng kết hợp với các hệ thức trên.' },
      { note: 'Mẹo nhớ: "cạnh góc vuông bình phương = cạnh huyền nhân hình chiếu của nó"; "đường cao bình phương = tích hai hình chiếu". Luôn vẽ hình và ghi rõ vai trò từng đoạn trước khi áp dụng.' },
    ],
    [
      { q: 'Tam giác ABC vuông tại A có AB = 6, AC = 8. Tính BC và AH.', a: 'Theo Pythagore: BC = √(6² + 8²) = √100 = 10. Dùng a·h = b·c: AH = (AB·AC)/BC = (6·8)/10 = 4,8.' },
      { q: 'Tam giác vuông tại A có AH = 12, BH = 9. Tính CH.', a: 'Dùng h² = BH·CH: 12² = 9·CH ⇒ 144 = 9·CH ⇒ CH = 16.' },
      { q: 'Tam giác vuông tại A, hình chiếu hai cạnh góc vuông lên cạnh huyền là BH = 4, CH = 9. Tính AB, AC và AH.', a: 'Cạnh huyền a = BH + CH = 13. AB² = a·BH = 13·4 = 52 ⇒ AB = 2√13. AC² = a·CH = 13·9 = 117 ⇒ AC = 3√13. AH² = BH·CH = 4·9 = 36 ⇒ AH = 6.' },
    ]
  ),

  'S9TOAN-w15-quiz': L(
    'Tỉ số lượng giác của góc nhọn',
    'Tỉ số lượng giác của góc nhọn là nền tảng để tính cạnh và góc trong tam giác vuông, được dùng nhiều trong hình học và thực tế.',
    [
      'Nắm định nghĩa sin, cos, tan, cot của góc nhọn.',
      'Biết các tính chất và tỉ số lượng giác của hai góc phụ nhau.',
      'Áp dụng tính cạnh và số đo góc trong tam giác vuông.',
    ],
    [
      { h: 'Định nghĩa tỉ số lượng giác' },
      { p: 'Trong tam giác vuông tại A, xét góc nhọn B. Gọi cạnh đối là AC, cạnh kề là AB, cạnh huyền là BC. Khi đó: sin B = đối/huyền; cos B = kề/huyền; tan B = đối/kề; cot B = kề/đối.' },
      { h: 'Mẹo nhớ SOH-CAH-TOA' },
      { p: 'sin = Đối/Huyền (SOH), cos = Kề/Huyền (CAH), tan = Đối/Kề (TOA). cot là nghịch đảo của tan.' },
      { h: 'Các tính chất cơ bản' },
      { ul: ['Với 0° < α < 90°: 0 < sin α < 1 và 0 < cos α < 1.', 'sin²α + cos²α = 1.', 'tan α = sin α / cos α; cot α = cos α / sin α; tan α · cot α = 1.'] },
      { h: 'Tỉ số lượng giác của hai góc phụ nhau' },
      { p: 'Nếu α + β = 90° thì sin α = cos β, cos α = sin β, tan α = cot β, cot α = tan β. Đây là tính chất hữu ích để đổi và rút gọn.' },
      { h: 'Giá trị đặc biệt' },
      { ul: ['sin 30° = cos 60° = 1/2.', 'sin 45° = cos 45° = √2/2.', 'sin 60° = cos 30° = √3/2; tan 45° = 1.'] },
      { note: 'Ghi nhớ: với góc nhọn, sin và cos luôn nằm giữa 0 và 1. Dùng máy tính cầm tay để tra giá trị lượng giác khi cần.' },
    ],
    [
      { q: 'Tam giác vuông có một góc nhọn 30° và cạnh huyền bằng 10. Tính cạnh đối diện góc 30°.', a: 'sin 30° = đối/huyền ⇒ đối = huyền·sin 30° = 10·(1/2) = 5.' },
      { q: 'Biết cos α = 3/5 với α nhọn. Tính sin α và tan α.', a: 'sin²α = 1 − cos²α = 1 − 9/25 = 16/25 ⇒ sin α = 4/5 (lấy dương vì α nhọn). tan α = sin α/cos α = (4/5)/(3/5) = 4/3.' },
      { q: 'Rút gọn biểu thức sin 25° − cos 65°.', a: 'Vì 25° + 65° = 90° nên cos 65° = sin 25°. Do đó sin 25° − cos 65° = sin 25° − sin 25° = 0.' },
    ]
  ),

  'S9TOAN-w16-quiz': L(
    'Đường tròn — Định nghĩa và sự xác định',
    'Bước vào chương Đường tròn — mảng kiến thức quan trọng, thường là câu hình học chiếm điểm cao trong đề thi vào 10.',
    [
      'Nắm định nghĩa đường tròn và cách xác định một đường tròn.',
      'Hiểu quan hệ giữa đường kính và dây cung.',
      'Nắm tính chất đường tròn ngoại tiếp tam giác.',
    ],
    [
      { h: 'Định nghĩa đường tròn' },
      { p: 'Đường tròn tâm O bán kính R (R > 0) là tập hợp tất cả các điểm cách điểm O một khoảng bằng R, kí hiệu (O; R) hay (O). Hình tròn là phần mặt phẳng giới hạn bởi đường tròn cùng với chính nó.' },
      { h: 'Vị trí của một điểm với đường tròn' },
      { ul: ['Điểm M nằm TRÊN đường tròn ⇔ OM = R.', 'Điểm M nằm TRONG đường tròn ⇔ OM < R.', 'Điểm M nằm NGOÀI đường tròn ⇔ OM > R.'] },
      { h: 'Cách xác định một đường tròn' },
      { ul: ['Biết tâm và bán kính.', 'Biết một đoạn thẳng là đường kính (tâm là trung điểm).', 'Qua ba điểm không thẳng hàng có DUY NHẤT một đường tròn.'] },
      { h: 'Đường kính và dây cung' },
      { p: 'Dây là đoạn thẳng nối hai điểm trên đường tròn; đường kính là dây đi qua tâm và là dây LỚN NHẤT. Trong một đường tròn, đường kính vuông góc với một dây thì đi qua trung điểm của dây ấy.' },
      { h: 'Đường tròn ngoại tiếp tam giác' },
      { p: 'Đường tròn đi qua ba đỉnh của tam giác gọi là đường tròn ngoại tiếp. Tâm của nó là giao điểm ba đường trung trực của tam giác.' },
      { note: 'Tam giác vuông nội tiếp đường tròn có cạnh huyền là đường kính; tâm đường tròn ngoại tiếp là trung điểm cạnh huyền.' },
    ],
    [
      { q: 'Đường tròn (O; 5) đi qua điểm A. Hỏi OA bằng bao nhiêu?', a: 'Vì A nằm trên đường tròn nên OA = R = 5.' },
      { q: 'Cho tam giác đều cạnh 6. Tính bán kính đường tròn ngoại tiếp.', a: 'Bán kính đường tròn ngoại tiếp tam giác đều cạnh a là R = a/√3 = a√3/3. Với a = 6: R = 6/√3 = 2√3.' },
      { q: 'Đường tròn (O; 13), dây AB = 24. Tính khoảng cách từ O đến AB.', a: 'Hạ OH ⊥ AB tại H thì H là trung điểm AB ⇒ HB = 12. Trong tam giác vuông OHB: OH = √(OB² − HB²) = √(13² − 12²) = √(169 − 144) = √25 = 5.' },
    ]
  ),

  'S9TOAN-w17-quiz': L(
    'Vị trí tương đối của đường thẳng và đường tròn — Tiếp tuyến',
    'Đường thẳng và đường tròn có ba vị trí tương đối; trường hợp tiếp xúc cho ta khái niệm tiếp tuyến — rất hay dùng trong chứng minh hình học.',
    [
      'Nhận biết ba vị trí tương đối qua khoảng cách d và bán kính R.',
      'Nắm định nghĩa và tính chất tiếp tuyến của đường tròn.',
      'Vận dụng tính chất hai tiếp tuyến cắt nhau.',
    ],
    [
      { h: 'Ba vị trí tương đối' },
      { p: 'Gọi d là khoảng cách từ tâm O đến đường thẳng a, R là bán kính:' },
      { ul: ['d > R: a và (O) KHÔNG có điểm chung.', 'd = R: a TIẾP XÚC với (O) — a là tiếp tuyến.', 'd < R: a CẮT (O) tại hai điểm.'] },
      { h: 'Tiếp tuyến của đường tròn' },
      { p: 'Tiếp tuyến là đường thẳng chỉ có MỘT điểm chung với đường tròn, gọi là tiếp điểm. Tính chất: tại tiếp điểm, tiếp tuyến VUÔNG GÓC với bán kính đi qua tiếp điểm đó.' },
      { h: 'Dấu hiệu nhận biết tiếp tuyến' },
      { p: 'Nếu một đường thẳng đi qua một điểm của đường tròn và vuông góc với bán kính tại điểm đó thì đường thẳng ấy là tiếp tuyến của đường tròn.' },
      { h: 'Tính chất hai tiếp tuyến cắt nhau' },
      { p: 'Nếu từ điểm M ngoài đường tròn kẻ hai tiếp tuyến MA, MB (A, B là tiếp điểm) thì: MA = MB; MO là phân giác của góc AMB; MO là phân giác của góc AOB.' },
      { note: 'Độ dài đoạn tiếp tuyến từ điểm M đến tiếp điểm tính bằng định lí Pythagore: MA² = MO² − R².' },
    ],
    [
      { q: 'Đường tròn (O; 5) và một đường thẳng cách O một khoảng 5 cm. Xác định vị trí tương đối.', a: 'Vì d = R = 5 nên đường thẳng tiếp xúc với đường tròn (là tiếp tuyến).' },
      { q: 'Từ điểm M cách O một khoảng 13 cm kẻ tiếp tuyến đến (O; 5). Tính độ dài đoạn tiếp tuyến.', a: 'Gọi A là tiếp điểm thì OA ⊥ MA. Trong tam giác vuông OAM: MA² = MO² − OA² = 13² − 5² = 169 − 25 = 144 ⇒ MA = 12 cm.' },
      { q: 'Từ M kẻ hai tiếp tuyến MA, MB tới (O), biết MA = 8 cm. Tính MB và cho biết MO có vai trò gì với góc AMB.', a: 'Theo tính chất hai tiếp tuyến cắt nhau, MA = MB = 8 cm; đồng thời MO là tia phân giác của góc AMB.' },
    ]
  ),

  'S9TOAN-w18-quiz': L(
    'Ôn tập học kì I — Hình học',
    'Tổng hợp kiến thức hình học học kì I: hệ thức lượng, tỉ số lượng giác và đường tròn — phần thường chiếm điểm cao trong đề thi.',
    [
      'Tổng hợp ba chủ đề hình học học kì I.',
      'Giải bài tập tính độ dài và chứng minh đơn giản.',
      'Rèn kĩ năng vẽ hình chính xác.',
    ],
    [
      { h: 'Bản đồ kiến thức hình học HK1' },
      { p: 'Hình học HK1 gồm: hệ thức lượng trong tam giác vuông; tỉ số lượng giác của góc nhọn; đường tròn (định nghĩa, dây cung, vị trí tương đối với đường thẳng, tiếp tuyến).' },
      { h: 'Mảng 1 — Hệ thức lượng' },
      { ul: ['b² = a·b′; c² = a·c′; h² = b′·c′.', 'a·h = b·c; 1/h² = 1/b² + 1/c².', 'Pythagore: a² = b² + c².'] },
      { h: 'Mảng 2 — Tỉ số lượng giác' },
      { p: 'sin = đối/huyền, cos = kề/huyền, tan = đối/kề, cot = kề/đối; sin²α + cos²α = 1; hai góc phụ nhau đổi sin↔cos, tan↔cot.' },
      { h: 'Mảng 3 — Đường tròn' },
      { ul: ['Quan hệ đường kính – dây: đường kính vuông góc dây thì đi qua trung điểm dây.', 'Khoảng cách từ tâm đến dây: d² = R² − (dây/2)².', 'Tiếp tuyến vuông góc bán kính tại tiếp điểm; hai tiếp tuyến từ một điểm thì bằng nhau.'] },
      { note: 'Câu hình học trong đề thi vào 10 thường 3–3,5 điểm. Vẽ hình chính xác là điều kiện đầu tiên để làm đúng.' },
    ],
    [
      { q: 'Tam giác ABC vuông tại A, AB = 3, AC = 4. Tính BC và sin B.', a: 'BC = √(3² + 4²) = √25 = 5. sin B = đối/huyền = AC/BC = 4/5.' },
      { q: 'Đường tròn (O; 6) có dây AB = 8. Tính khoảng cách d từ O đến AB.', a: 'Hạ OH ⊥ AB tại H thì HB = AB/2 = 4. Ta có d = OH = √(R² − HB²) = √(36 − 16) = √20 = 2√5.' },
      { q: 'Tính số đo góc nhọn α biết tan α = 1.', a: 'tan α = 1 ứng với α = 45° (giá trị đặc biệt).' },
    ]
  ),

  'S9TOAN-w19-quiz': L(
    'Hàm số y = ax² (a ≠ 0) — Định nghĩa và đồ thị',
    'Bước vào học kì II với hàm số bậc hai dạng y = ax² và đồ thị parabol — chuẩn bị cho phương trình bậc hai.',
    [
      'Nắm định nghĩa và tính chất của hàm số y = ax².',
      'Biết dạng và đặc điểm đồ thị parabol.',
      'Tìm giao điểm của parabol với đường thẳng.',
    ],
    [
      { h: 'Định nghĩa' },
      { p: 'Hàm số y = ax² với a ≠ 0 là hàm số bậc hai dạng đơn giản. Hàm xác định với mọi x ∈ ℝ.' },
      { h: 'Tính chất' },
      { ul: ['Nếu a > 0: hàm nghịch biến khi x < 0, đồng biến khi x > 0; giá trị nhỏ nhất y = 0 tại x = 0.', 'Nếu a < 0: hàm đồng biến khi x < 0, nghịch biến khi x > 0; giá trị lớn nhất y = 0 tại x = 0.'] },
      { h: 'Đồ thị parabol' },
      { p: 'Đồ thị của y = ax² là một parabol có ĐỈNH ở gốc toạ độ O, nhận trục Oy làm trục đối xứng. Khi a > 0 parabol quay bề lõm LÊN TRÊN; khi a < 0 quay bề lõm XUỐNG DƯỚI.' },
      { ul: ['Hai điểm có hoành độ đối nhau thì cùng tung độ (đối xứng qua Oy).', '|a| càng lớn parabol càng "hẹp".'] },
      { h: 'Giao điểm parabol và đường thẳng' },
      { p: 'Toạ độ giao điểm của (P): y = ax² và (d): y = mx + n là nghiệm của hệ; hoành độ giao điểm là nghiệm của phương trình ax² = mx + n, tức ax² − mx − n = 0.' },
      { note: 'Để vẽ parabol, lập bảng giá trị với các hoành độ đối nhau (−2, −1, 0, 1, 2) rồi nối các điểm bằng đường cong trơn.' },
    ],
    [
      { q: 'Cho hàm số y = 2x². Tính y khi x = −3 và x = 3, nhận xét.', a: 'y(−3) = 2·(−3)² = 2·9 = 18; y(3) = 2·9 = 18. Hai giá trị bằng nhau vì hoành độ đối nhau (parabol đối xứng qua Oy).' },
      { q: 'Parabol y = −3x² có bề lõm quay lên hay xuống? Điểm cao nhất ở đâu?', a: 'Vì a = −3 < 0 nên bề lõm quay xuống dưới; điểm cao nhất là đỉnh O(0; 0), tại đó y đạt giá trị lớn nhất bằng 0.' },
      { q: 'Tìm toạ độ giao điểm của (P): y = x² và (d): y = 2x + 3.', a: 'Hoành độ giao điểm: x² = 2x + 3 ⇒ x² − 2x − 3 = 0 ⇒ x = 3 hoặc x = −1. Với x = 3: y = 9; với x = −1: y = 1. Hai giao điểm là (3; 9) và (−1; 1).' },
    ]
  ),

  'S9TOAN-w20-quiz': L(
    'Phương trình bậc hai một ẩn — Công thức nghiệm',
    'Phương trình bậc hai là một trong những chủ đề quan trọng nhất của lớp 9 và đề thi vào 10.',
    [
      'Nhận dạng phương trình bậc hai một ẩn.',
      'Tính biệt thức Δ và biện luận số nghiệm.',
      'Áp dụng công thức nghiệm và công thức nghiệm thu gọn.',
    ],
    [
      { h: 'Dạng tổng quát' },
      { p: 'Phương trình bậc hai một ẩn có dạng ax² + bx + c = 0 với a ≠ 0; a, b, c là các hệ số cho trước.' },
      { h: 'Biệt thức và công thức nghiệm' },
      { p: 'Đặt Δ = b² − 4ac (biệt thức). Khi đó:' },
      { ul: ['Δ > 0: phương trình có hai nghiệm phân biệt x₁,₂ = (−b ± √Δ)/(2a).', 'Δ = 0: phương trình có nghiệm kép x = −b/(2a).', 'Δ < 0: phương trình vô nghiệm (trên tập số thực).'] },
      { h: 'Công thức nghiệm thu gọn' },
      { p: 'Khi b = 2b′ (b chẵn), đặt Δ′ = b′² − ac. Khi đó: Δ′ > 0 cho hai nghiệm x₁,₂ = (−b′ ± √Δ′)/a; Δ′ = 0 cho nghiệm kép x = −b′/a; Δ′ < 0 vô nghiệm.' },
      { h: 'Trường hợp giải nhanh' },
      { ul: ['Nếu a + b + c = 0: phương trình có nghiệm x₁ = 1, x₂ = c/a.', 'Nếu a − b + c = 0: phương trình có nghiệm x₁ = −1, x₂ = −c/a.'] },
      { note: 'Luôn kiểm tra a ≠ 0 trước khi gọi là phương trình bậc hai. Nếu đề có tham số, xét riêng trường hợp a = 0.' },
    ],
    [
      { q: 'Giải phương trình x² − 5x + 6 = 0.', a: 'Δ = (−5)² − 4·1·6 = 25 − 24 = 1 > 0. Hai nghiệm: x = (5 ± 1)/2 ⇒ x₁ = 3, x₂ = 2.' },
      { q: 'Tìm m để phương trình x² − 4x + m = 0 có nghiệm kép.', a: 'Nghiệm kép khi Δ = 0: Δ = 16 − 4m = 0 ⇒ m = 4. Khi đó nghiệm kép x = −b/(2a) = 4/2 = 2.' },
      { q: 'Giải nhanh phương trình 2x² − 3x + 1 = 0.', a: 'Nhận xét a + b + c = 2 − 3 + 1 = 0 nên x₁ = 1, x₂ = c/a = 1/2.' },
    ]
  ),

  'S9TOAN-w21-quiz': L(
    'Hệ thức Vi-ét và ứng dụng',
    'Hệ thức Vi-ét (Viète) cho phép tính tổng và tích nghiệm mà không cần giải phương trình — công cụ mạnh trong nhiều bài toán.',
    [
      'Nắm hệ thức Vi-ét cho tổng và tích hai nghiệm.',
      'Tính giá trị các biểu thức đối xứng của hai nghiệm.',
      'Tìm hai số khi biết tổng và tích.',
    ],
    [
      { h: 'Hệ thức Vi-ét' },
      { p: 'Nếu phương trình ax² + bx + c = 0 (a ≠ 0) có hai nghiệm x₁, x₂ (Δ ≥ 0) thì: tổng S = x₁ + x₂ = −b/a và tích P = x₁·x₂ = c/a.' },
      { h: 'Tìm hai số biết tổng và tích' },
      { p: 'Nếu hai số có tổng S và tích P (với S² ≥ 4P) thì chúng là hai nghiệm của phương trình X² − S·X + P = 0.' },
      { h: 'Biểu thức đối xứng của hai nghiệm' },
      { ul: ['x₁² + x₂² = S² − 2P.', 'x₁³ + x₂³ = S³ − 3SP.', '(x₁ − x₂)² = S² − 4P; |x₁ − x₂| = √(S² − 4P).', '1/x₁ + 1/x₂ = S/P (với P ≠ 0).'] },
      { h: 'Xét dấu các nghiệm' },
      { ul: ['Hai nghiệm trái dấu ⇔ P < 0.', 'Hai nghiệm cùng dấu ⇔ Δ ≥ 0 và P > 0 (cùng dương nếu thêm S > 0, cùng âm nếu S < 0).'] },
      { note: 'Điều kiện áp dụng Vi-ét: phương trình phải CÓ nghiệm thực, tức Δ ≥ 0. Khi bài có tham số, nhớ đặt điều kiện này trước khi dùng S, P.' },
    ],
    [
      { q: 'Cho phương trình 2x² − 6x + 4 = 0. Tính S và P.', a: 'S = x₁ + x₂ = −b/a = 6/2 = 3; P = x₁·x₂ = c/a = 4/2 = 2.' },
      { q: 'Hai nghiệm có x₁ + x₂ = 5 và x₁·x₂ = 6. Tính x₁² + x₂².', a: 'x₁² + x₂² = (x₁ + x₂)² − 2x₁x₂ = 5² − 2·6 = 25 − 12 = 13.' },
      { q: 'Tìm hai số biết tổng bằng 10 và tích bằng 21.', a: 'Hai số là nghiệm của X² − 10X + 21 = 0. Δ = 100 − 84 = 16 ⇒ X = (10 ± 4)/2 ⇒ X = 7 hoặc X = 3. Hai số là 3 và 7.' },
    ]
  ),

  'S9TOAN-w22-quiz': L(
    'Phương trình quy về phương trình bậc hai',
    'Nhiều phương trình có thể đưa về dạng bậc hai bằng cách đặt ẩn phụ: phương trình trùng phương, phương trình chứa ẩn ở mẫu, phương trình chứa căn.',
    [
      'Giải phương trình trùng phương bằng cách đặt ẩn phụ.',
      'Giải phương trình chứa ẩn ở mẫu thức.',
      'Giải phương trình chứa căn đơn giản.',
    ],
    [
      { h: 'Phương trình trùng phương' },
      { p: 'Phương trình dạng ax⁴ + bx² + c = 0 (a ≠ 0). Đặt t = x² ≥ 0, đưa về phương trình bậc hai at² + bt + c = 0. Giải t rồi suy ra x (chỉ nhận t ≥ 0).' },
      { h: 'Phương trình chứa ẩn ở mẫu' },
      { ul: ['Bước 1: tìm điều kiện xác định (mẫu khác 0).', 'Bước 2: quy đồng, khử mẫu đưa về phương trình bậc hai.', 'Bước 3: giải và đối chiếu điều kiện, loại nghiệm làm mẫu bằng 0.'] },
      { h: 'Phương trình chứa căn' },
      { ul: ['Đặt điều kiện cho biểu thức dưới căn và (nếu cần) cho vế phải không âm.', 'Bình phương hai vế hoặc đặt ẩn phụ thay căn.', 'Thử lại nghiệm để loại nghiệm ngoại lai.'] },
      { h: 'Phương pháp đặt ẩn phụ tổng quát' },
      { p: 'Khi thấy một biểu thức LẶP LẠI trong phương trình, đặt nó bằng ẩn phụ t để đưa về bậc hai theo t — kĩ thuật chung cho nhiều dạng.' },
      { note: 'Hai lưu ý sống còn: với trùng phương chỉ nhận t ≥ 0; khi bình phương phương trình chứa căn, BẮT BUỘC thử lại để loại nghiệm ngoại lai.' },
    ],
    [
      { q: 'Giải phương trình x⁴ − 5x² + 4 = 0.', a: 'Đặt t = x² ≥ 0: t² − 5t + 4 = 0 ⇒ t = 1 hoặc t = 4 (đều ≥ 0). Với t = 1: x = ±1; với t = 4: x = ±2. Vậy x ∈ {−2; −1; 1; 2}.' },
      { q: 'Giải phương trình √(x + 2) = x.', a: 'Điều kiện: x + 2 ≥ 0 và x ≥ 0 ⇒ x ≥ 0. Bình phương: x + 2 = x² ⇒ x² − x − 2 = 0 ⇒ x = 2 hoặc x = −1. Loại x = −1 (vì x ≥ 0). Thử lại x = 2: √4 = 2 đúng. Vậy x = 2.' },
      { q: 'Giải phương trình 1/x + 1/(x − 2) = 1 (x ≠ 0, x ≠ 2).', a: 'Quy đồng: (x − 2) + x = x(x − 2) ⇒ 2x − 2 = x² − 2x ⇒ x² − 4x + 2 = 0 ⇒ x = 2 ± √2. Cả hai khác 0 và khác 2 nên nhận: x = 2 + √2 hoặc x = 2 − √2.' },
    ]
  ),

  'S9TOAN-w23-quiz': L(
    'Giải bài toán bằng cách lập phương trình',
    'Dạng quan trọng trong đề thi: chuyển bài toán thực tế thành phương trình bậc hai để giải.',
    [
      'Chọn ẩn, lập phương trình bậc hai từ bài toán có lời văn.',
      'Giải phương trình và đối chiếu điều kiện để kết luận.',
      'Nhận diện các dạng: số học, hình học, chuyển động, năng suất.',
    ],
    [
      { h: 'Quy trình ba bước' },
      { p: 'Tương tự lập hệ: (1) lập phương trình — chọn ẩn, đặt điều kiện, biểu diễn đại lượng và lập phương trình; (2) giải phương trình; (3) đối chiếu điều kiện và trả lời.' },
      { h: 'Bước chọn ẩn' },
      { ul: ['Chọn ẩn là đại lượng cần tìm hoặc đại lượng tiện biểu diễn.', 'Ghi rõ đơn vị và điều kiện thực tế (dương, nguyên nếu là số người/sản phẩm…).'] },
      { h: 'Lập phương trình' },
      { p: 'Tìm mối quan hệ "ẩn" trong đề (thường là một đẳng thức về diện tích, quãng đường, công việc…) để dựng phương trình. Với toán hình chữ nhật, diện tích = dài × rộng dẫn tới phương trình bậc hai.' },
      { h: 'Các dạng thường gặp' },
      { ul: ['Toán số học: tìm hai số biết tổng/hiệu và tích.', 'Toán hình học: kích thước hình chữ nhật, tam giác.', 'Toán chuyển động và năng suất: dùng s = v·t, công việc = năng suất × thời gian.'] },
      { note: 'Khi giải ra hai nghiệm, đối chiếu điều kiện để chọn nghiệm hợp lí; nghiệm âm hoặc vô lí phải loại.' },
    ],
    [
      { q: 'Hai số dương hơn kém nhau 4 đơn vị và có tích bằng 96. Tìm hai số.', a: 'Gọi số bé là x > 0, số lớn là x + 4. Ta có x(x + 4) = 96 ⇒ x² + 4x − 96 = 0 ⇒ x = 8 (loại x = −12). Hai số là 8 và 12.' },
      { q: 'Một thửa đất hình chữ nhật có chiều dài hơn chiều rộng 3 m và diện tích 54 m². Tính kích thước.', a: 'Gọi chiều rộng x (m, x > 0), chiều dài x + 3. Ta có x(x + 3) = 54 ⇒ x² + 3x − 54 = 0 ⇒ x = 6 (loại x = −9). Kích thước: rộng 6 m, dài 9 m.' },
      { q: 'Một tổ dự định làm 120 sản phẩm trong một thời gian. Khi mỗi giờ làm thêm 4 sản phẩm thì xong sớm hơn 1 giờ. Lập phương trình.', a: 'Gọi năng suất dự định x sản phẩm/giờ (x > 0). Thời gian dự định 120/x giờ, thời gian thực tế 120/(x + 4) giờ. Vì xong sớm 1 giờ: 120/x − 120/(x + 4) = 1 — đó là phương trình cần lập.' },
    ]
  ),

  'S9TOAN-w24-quiz': L(
    'Góc với đường tròn',
    'Các loại góc với đường tròn và mối quan hệ với cung bị chắn — công cụ chủ lực để chứng minh trong câu hình học thi vào 10.',
    [
      'Phân biệt góc ở tâm, góc nội tiếp, góc tạo bởi tiếp tuyến và dây.',
      'Nắm quan hệ giữa các góc và cung bị chắn.',
      'Vận dụng các hệ quả để tính số đo góc.',
    ],
    [
      { h: 'Góc ở tâm và số đo cung' },
      { p: 'Góc ở tâm là góc có đỉnh trùng tâm đường tròn. Số đo của góc ở tâm BẰNG số đo cung bị chắn (cung nhỏ). Cả đường tròn có số đo 360°.' },
      { h: 'Góc nội tiếp' },
      { p: 'Góc nội tiếp là góc có đỉnh nằm TRÊN đường tròn, hai cạnh chứa hai dây cung. Số đo góc nội tiếp bằng MỘT NỬA số đo cung bị chắn.' },
      { h: 'Góc tạo bởi tia tiếp tuyến và dây cung' },
      { p: 'Góc tạo bởi tia tiếp tuyến và một dây cung (chung gốc tại tiếp điểm) cũng có số đo bằng NỬA cung bị chắn — giống góc nội tiếp chắn cung đó.' },
      { h: 'Các hệ quả quan trọng' },
      { ul: ['Các góc nội tiếp cùng chắn một cung (hoặc các cung bằng nhau) thì bằng nhau.', 'Góc nội tiếp chắn nửa đường tròn (chắn đường kính) bằng 90°.', 'Góc nội tiếp bằng nửa góc ở tâm khi cùng chắn một cung.'] },
      { h: 'Góc có đỉnh bên trong / bên ngoài đường tròn' },
      { p: 'Góc có đỉnh bên trong đường tròn bằng nửa TỔNG hai cung bị chắn; góc có đỉnh bên ngoài đường tròn bằng nửa HIỆU hai cung bị chắn.' },
      { note: 'Tính chất "góc nội tiếp chắn nửa đường tròn bằng 90°" rất hay dùng để chỉ ra tam giác vuông hoặc chứng minh tứ giác nội tiếp.' },
    ],
    [
      { q: 'Cung AB có số đo 100°. Tính số đo góc nội tiếp chắn cung AB.', a: 'Góc nội tiếp bằng nửa cung bị chắn: 100°/2 = 50°.' },
      { q: 'Một tam giác nội tiếp đường tròn, có một cạnh là đường kính. Tính góc đối diện cạnh đó.', a: 'Góc đó là góc nội tiếp chắn nửa đường tròn (chắn đường kính) nên bằng 90°. Tam giác đó vuông.' },
      { q: 'Góc ở tâm chắn cung CD có số đo 70°. Tính góc nội tiếp chắn cùng cung CD.', a: 'Số đo cung CD = 70° (bằng góc ở tâm). Góc nội tiếp chắn cung CD = 70°/2 = 35°.' },
    ]
  ),

  'S9TOAN-w25-quiz': L(
    'Tứ giác nội tiếp',
    'Tứ giác nội tiếp là dạng bài thường gặp trong câu hình học thi vào 10 — vừa để chứng minh, vừa làm bước đệm suy ra các kết quả khác.',
    [
      'Nắm định nghĩa và tính chất tứ giác nội tiếp.',
      'Nắm các dấu hiệu nhận biết tứ giác nội tiếp.',
      'Vận dụng vào chứng minh hình học.',
    ],
    [
      { h: 'Định nghĩa' },
      { p: 'Tứ giác nội tiếp là tứ giác có BỐN đỉnh cùng nằm trên một đường tròn (đường tròn ngoại tiếp tứ giác).' },
      { h: 'Tính chất' },
      { p: 'Trong một tứ giác nội tiếp, TỔNG hai góc đối diện bằng 180°. Ngược lại, đây cũng là một dấu hiệu nhận biết.' },
      { h: 'Các dấu hiệu nhận biết tứ giác nội tiếp' },
      { ul: ['Tổng hai góc đối bằng 180°.', 'Góc ngoài tại một đỉnh bằng góc trong tại đỉnh đối diện.', 'Bốn đỉnh cùng cách đều một điểm cố định (điểm đó là tâm).', 'Hai đỉnh kề nhau cùng nhìn một cạnh dưới hai góc bằng nhau (cùng phía).'] },
      { h: 'Chiến lược chứng minh' },
      { p: 'Để chứng minh tứ giác nội tiếp, thường dùng: chỉ ra hai góc đối bù nhau; hoặc chỉ ra hai đỉnh cùng nhìn một đoạn dưới góc 90° (khi đó bốn điểm thuộc đường tròn đường kính là đoạn ấy).' },
      { note: 'Sau khi chứng minh được tứ giác nội tiếp, ta thường suy ra các cặp góc bằng nhau (cùng chắn một cung) để chứng minh tiếp các yêu cầu sau của bài.' },
    ],
    [
      { q: 'Tứ giác ABCD nội tiếp, có góc A = 80°. Tính góc C.', a: 'Trong tứ giác nội tiếp, hai góc đối bù nhau: A + C = 180° ⇒ C = 180° − 80° = 100°.' },
      { q: 'Một tứ giác có hai góc đối lần lượt bằng 110° và 70°. Tứ giác đó có nội tiếp được đường tròn không?', a: 'Tổng hai góc đối = 110° + 70° = 180°. Vì tổng hai góc đối bằng 180° nên tứ giác nội tiếp được.' },
      { q: 'Cho tam giác nhọn ABC, hai đường cao BE và CF cắt nhau tại H. Vì sao tứ giác BFEC nội tiếp?', a: 'Vì BE ⊥ AC nên góc BEC = 90°; CF ⊥ AB nên góc BFC = 90°. Hai đỉnh E, F cùng nhìn đoạn BC dưới góc 90°, nên B, F, E, C cùng thuộc đường tròn đường kính BC. Vậy BFEC nội tiếp.' },
    ]
  ),

  'S9TOAN-w26-quiz': L(
    'Hình trụ — Diện tích và thể tích',
    'Bắt đầu phần hình học không gian (hình khối tròn xoay) với hình trụ — khối quen thuộc trong đời sống.',
    [
      'Nhận biết hình trụ và các yếu tố: bán kính đáy, chiều cao, đường sinh.',
      'Tính diện tích xung quanh và diện tích toàn phần hình trụ.',
      'Tính thể tích hình trụ.',
    ],
    [
      { h: 'Hình trụ và các yếu tố' },
      { p: 'Hình trụ được tạo thành khi quay một hình chữ nhật quanh một cạnh cố định. Hình trụ có hai đáy là hai hình tròn bằng nhau bán kính R, chiều cao h (cũng là độ dài đường sinh đối với hình trụ đứng).' },
      { h: 'Diện tích xung quanh và toàn phần' },
      { ul: ['Diện tích xung quanh: S_xq = 2πRh.', 'Diện tích toàn phần: S_tp = S_xq + 2·S_đáy = 2πRh + 2πR² = 2πR(R + h).'] },
      { h: 'Thể tích hình trụ' },
      { p: 'Thể tích hình trụ bằng diện tích đáy nhân chiều cao: V = πR²h.' },
      { h: 'Lưu ý khi tính' },
      { ul: ['Mặt xung quanh khi "trải phẳng" là một hình chữ nhật có chiều dài bằng chu vi đáy 2πR và chiều rộng bằng h.', 'Có thể giữ kết quả theo π hoặc thay π ≈ 3,14 tuỳ yêu cầu.'] },
      { note: 'Hình trụ thường gặp trong thực tế: lon nước ngọt, ống cống, thùng phuy. Chú ý đơn vị: diện tích là đơn vị vuông, thể tích là đơn vị khối.' },
    ],
    [
      { q: 'Hình trụ có R = 3, h = 10. Tính thể tích V.', a: 'V = πR²h = π·3²·10 = π·9·10 = 90π (đơn vị thể tích).' },
      { q: 'Hình trụ có R = 5, h = 4. Tính diện tích xung quanh S_xq.', a: 'S_xq = 2πRh = 2π·5·4 = 40π.' },
      { q: 'Hình trụ có R = 2, h = 5. Tính diện tích toàn phần (lấy π ≈ 3,14).', a: 'S_tp = 2πR(R + h) = 2π·2·(2 + 5) = 2π·2·7 = 28π ≈ 28·3,14 = 87,92.' },
    ]
  ),

  'S9TOAN-w27-quiz': L(
    'Hình nón — Hình nón cụt',
    'Hình nón và hình nón cụt là các khối quen thuộc trong thực tế (nón lá, phễu, ly giấy).',
    [
      'Nhận biết hình nón và các yếu tố: bán kính đáy, chiều cao, đường sinh.',
      'Tính diện tích xung quanh, toàn phần và thể tích hình nón.',
      'Tính thể tích hình nón cụt.',
    ],
    [
      { h: 'Hình nón và các yếu tố' },
      { p: 'Hình nón được tạo thành khi quay một tam giác vuông quanh một cạnh góc vuông. Hình nón có đáy là hình tròn bán kính R, đỉnh S, chiều cao h và đường sinh l.' },
      { h: 'Quan hệ giữa l, R, h' },
      { p: 'Trục, bán kính đáy và đường sinh tạo thành tam giác vuông, nên: l² = R² + h², suy ra l = √(R² + h²).' },
      { h: 'Diện tích và thể tích hình nón' },
      { ul: ['Diện tích xung quanh: S_xq = πRl.', 'Diện tích toàn phần: S_tp = πRl + πR² = πR(l + R).', 'Thể tích: V = (1/3)πR²h.'] },
      { h: 'Hình nón cụt' },
      { p: 'Hình nón cụt có hai đáy là hai hình tròn bán kính R (đáy lớn) và r (đáy nhỏ), chiều cao h. Thể tích: V = (1/3)πh(R² + r² + Rr).' },
      { note: 'Lưu ý thể tích hình nón chỉ bằng 1/3 thể tích hình trụ cùng đáy và chiều cao. Khi đề cho R và h, thường phải tính l trước qua l = √(R² + h²).' },
    ],
    [
      { q: 'Hình nón có R = 3, h = 4. Tính đường sinh l và diện tích xung quanh.', a: 'l = √(R² + h²) = √(9 + 16) = √25 = 5. S_xq = πRl = π·3·5 = 15π.' },
      { q: 'Hình nón có R = 6, h = 8. Tính thể tích (lấy π ≈ 3,14).', a: 'V = (1/3)πR²h = (1/3)·3,14·6²·8 = (1/3)·3,14·36·8 = (1/3)·904,32 ≈ 301,44.' },
      { q: 'Hình nón cụt có R = 4, r = 2, h = 6. Tính thể tích theo π.', a: 'V = (1/3)πh(R² + r² + Rr) = (1/3)π·6·(16 + 4 + 8) = (1/3)π·6·28 = 56π.' },
    ]
  ),

  'S9TOAN-w28-quiz': L(
    'Hình cầu — Diện tích và thể tích',
    'Hoàn thiện phần hình học không gian với hình cầu — khối có nhiều tính chất đối xứng đặc biệt.',
    [
      'Nhận biết hình cầu, mặt cầu và bán kính.',
      'Tính diện tích mặt cầu.',
      'Tính thể tích hình cầu.',
    ],
    [
      { h: 'Mặt cầu và hình cầu' },
      { p: 'Khi quay nửa hình tròn quanh đường kính, ta được một hình cầu. Mặt cầu tâm O bán kính R là tập hợp các điểm trong không gian cách O một khoảng R.' },
      { h: 'Diện tích mặt cầu' },
      { p: 'Diện tích mặt cầu bán kính R: S = 4πR². Diện tích mặt cầu bằng đúng bốn lần diện tích hình tròn lớn của nó.' },
      { h: 'Thể tích hình cầu' },
      { p: 'Thể tích hình cầu bán kính R: V = (4/3)πR³.' },
      { h: 'Mặt cắt của hình cầu' },
      { p: 'Khi cắt hình cầu bởi một mặt phẳng, mặt cắt luôn là một hình tròn. Mặt cắt đi qua tâm cho hình tròn lớn nhất, bán kính bằng R.' },
      { note: 'Trong cùng một diện tích bề mặt, hình cầu là khối có thể tích lớn nhất — đó là lí do nhiều vật trong tự nhiên có dạng cầu (giọt nước, bong bóng).' },
    ],
    [
      { q: 'Hình cầu có R = 3. Tính thể tích V theo π.', a: 'V = (4/3)πR³ = (4/3)π·3³ = (4/3)π·27 = 36π.' },
      { q: 'Hình cầu có thể tích V = 36π. Tính bán kính R.', a: 'Từ (4/3)πR³ = 36π ⇒ R³ = 36·3/4 = 27 ⇒ R = 3.' },
      { q: 'Tính diện tích mặt cầu bán kính R = 5 (theo π).', a: 'S = 4πR² = 4π·25 = 100π.' },
    ]
  ),

  'S9TOAN-w29-quiz': L(
    'Ôn tập tổng hợp đại số — Phương trình và hệ',
    'Ôn lại hai mảng quan trọng nhất của đại số lớp 9: phương trình bậc hai (kèm Vi-ét) và hệ phương trình.',
    [
      'Giải thành thạo phương trình bậc hai và hệ phương trình.',
      'Vận dụng hệ thức Vi-ét.',
      'Giải bài toán bằng cách lập phương trình/hệ.',
    ],
    [
      { h: 'Trọng tâm ôn tập' },
      { p: 'Hai mảng này thường chiếm 4–5 điểm trong đề thi vào 10: phương trình bậc hai (công thức nghiệm, Vi-ét) và hệ phương trình (thế, cộng đại số, lập hệ).' },
      { h: 'Phương trình bậc hai' },
      { ul: ['Δ = b² − 4ac; biện luận theo dấu của Δ.', 'Nhẩm nghiệm: a + b + c = 0 ⇒ x = 1, c/a; a − b + c = 0 ⇒ x = −1, −c/a.', 'Vi-ét: S = −b/a, P = c/a.'] },
      { h: 'Ứng dụng Vi-ét' },
      { p: 'Tính biểu thức đối xứng x₁² + x₂² = S² − 2P; (x₁ − x₂)² = S² − 4P; tìm hai số biết tổng và tích bằng phương trình X² − SX + P = 0.' },
      { h: 'Hệ phương trình' },
      { p: 'Giải bằng phương pháp thế hoặc cộng đại số; lưu ý biện luận nghiệm và bài toán lập hệ thực tế.' },
      { note: 'Khi dùng Vi-ét với phương trình có tham số, luôn đặt điều kiện Δ ≥ 0 (hoặc Δ > 0 nếu cần hai nghiệm phân biệt) trước.' },
    ],
    [
      { q: 'Tìm hai số biết tổng bằng 10 và tích bằng 21.', a: 'Hai số là nghiệm của X² − 10X + 21 = 0. Δ = 100 − 84 = 16 ⇒ X = (10 ± 4)/2 ⇒ X = 7 hoặc X = 3. Hai số là 3 và 7.' },
      { q: 'Giải hệ { 2x + 3y = 13; x − y = −1 }.', a: 'Từ phương trình hai: x = y − 1. Thế: 2(y − 1) + 3y = 13 ⇒ 5y = 15 ⇒ y = 3, x = 2. Nghiệm (2; 3).' },
      { q: 'Cho phương trình x² − 6x + 5 = 0. Không giải, tính x₁² + x₂².', a: 'Theo Vi-ét S = 6, P = 5. Vậy x₁² + x₂² = S² − 2P = 36 − 10 = 26.' },
    ]
  ),

  'S9TOAN-w30-quiz': L(
    'Bất phương trình bậc nhất — Bất phương trình bậc hai',
    'Mở rộng từ phương trình sang bất phương trình — vừa ôn tập, vừa làm quen công cụ sẽ dùng nhiều ở cấp THPT.',
    [
      'Giải bất phương trình bậc nhất một ẩn.',
      'Xét dấu tam thức bậc hai.',
      'Giải bất phương trình bậc hai một ẩn đơn giản.',
    ],
    [
      { h: 'Bất phương trình bậc nhất một ẩn' },
      { p: 'Dạng ax + b > 0 (hoặc <, ≥, ≤) với a ≠ 0. Giải tương tự phương trình bậc nhất, NHƯNG khi nhân/chia hai vế với số ÂM thì phải ĐỔI CHIỀU bất đẳng thức.' },
      { ul: ['2x − 6 > 0 ⇔ x > 3.', '−3x + 6 ≥ 0 ⇔ −3x ≥ −6 ⇔ x ≤ 2 (chia cho −3 đổi chiều).'] },
      { h: 'Tam thức bậc hai và dấu' },
      { p: 'Xét tam thức f(x) = ax² + bx + c (a ≠ 0). Nếu f có hai nghiệm phân biệt x₁ < x₂ thì f(x) CÙNG dấu với a khi x ngoài khoảng (x₁; x₂), và TRÁI dấu với a khi x trong khoảng (x₁; x₂).' },
      { h: 'Giải bất phương trình bậc hai' },
      { ul: ['Bước 1: tìm nghiệm của ax² + bx + c = 0.', 'Bước 2: lập bảng xét dấu hoặc nhớ quy tắc "trong trái – ngoài cùng" (so với dấu a).', 'Bước 3: chọn khoảng nghiệm thoả mãn dấu yêu cầu.'] },
      { h: 'Trường hợp Δ ≤ 0' },
      { p: 'Nếu Δ < 0 thì f(x) luôn cùng dấu với a (không đổi dấu). Nếu Δ = 0 thì f(x) cùng dấu với a, chỉ bằng 0 tại nghiệm kép.' },
      { note: 'Với a > 0: tam thức DƯƠNG ở ngoài hai nghiệm, ÂM ở trong hai nghiệm. Đây là quy tắc cần nhớ kĩ để giải nhanh.' },
    ],
    [
      { q: 'Giải bất phương trình 2x − 6 > 0.', a: '2x − 6 > 0 ⇔ 2x > 6 ⇔ x > 3. Tập nghiệm: x > 3.' },
      { q: 'Giải bất phương trình x² − 5x + 6 < 0.', a: 'Nghiệm của x² − 5x + 6 = 0 là x = 2 và x = 3. Vì a = 1 > 0 nên tam thức âm Ở TRONG hai nghiệm. Vậy 2 < x < 3.' },
      { q: 'Giải bất phương trình −x² + 4 ≥ 0.', a: 'Đổi dấu: −x² + 4 ≥ 0 ⇔ x² − 4 ≤ 0 ⇔ x² ≤ 4 ⇔ −2 ≤ x ≤ 2.' },
    ]
  ),

  'S9TOAN-w31-quiz': L(
    'Luyện đề ôn thi vào 10 — Bộ 1',
    'Bắt đầu giai đoạn luyện đề: mỗi tuần làm một đề tổng hợp theo cấu trúc đề thi tuyển sinh.',
    [
      'Làm quen cấu trúc đề thi vào 10.',
      'Phân bổ thời gian hợp lí cho từng câu.',
      'Phân tích các sai lầm thường gặp.',
    ],
    [
      { h: 'Cấu trúc đề thi vào 10 (tham khảo Hà Nội)' },
      { ul: ['Câu 1 (2đ): rút gọn biểu thức chứa căn và bài toán phụ liên quan.', 'Câu 2 (2đ): giải bài toán bằng cách lập phương trình/hệ.', 'Câu 3 (2đ): hệ phương trình, hàm số bậc hai và phương trình bậc hai (Vi-ét).', 'Câu 4 (3đ): hình học đường tròn.', 'Câu 5 (1đ): bất đẳng thức, tìm giá trị lớn nhất/nhỏ nhất.'] },
      { h: 'Phân bổ thời gian' },
      { p: 'Tổng thời gian khoảng 120 phút. Nên dành ~15–20 phút mỗi câu 1–3, ~30 phút câu hình, ~15 phút câu 5 và 10–15 phút soát lại.' },
      { h: 'Thứ tự làm bài' },
      { p: 'Làm các câu chắc điểm trước (câu 1, 2, ý đầu câu 3 và 4). Câu 5 và ý cuối câu hình thường khó, để sau cùng.' },
      { h: 'Lỗi thường gặp' },
      { ul: ['Quên điều kiện xác định khi rút gọn căn thức.', 'Quên điều kiện Δ ≥ 0 khi dùng Vi-ét.', 'Vẽ hình thiếu chính xác làm sai hướng chứng minh.'] },
      { note: 'Câu khó nhất thường là câu 5 (bất đẳng thức/cực trị) và ý vận dụng cuối của câu hình. Đừng để mất điểm các câu dễ vì vội.' },
    ],
    [
      { q: 'Câu 5 trong đề thi vào 10 thường có dạng gì?', a: 'Thường là chứng minh bất đẳng thức, tìm giá trị lớn nhất/nhỏ nhất của một biểu thức, hoặc phương trình/hệ phức tạp cần kĩ thuật đặc biệt.' },
      { q: 'Rút gọn A = √x/(√x + 1) − 1/(√x − 1) + 2/(x − 1) với x ≥ 0, x ≠ 1.', a: 'Mẫu chung (√x − 1)(√x + 1) = x − 1. Quy đồng tử: √x(√x − 1) − (√x + 1) + 2 = x − √x − √x − 1 + 2 = x − 2√x + 1 = (√x − 1)². Vậy A = (√x − 1)²/[(√x − 1)(√x + 1)] = (√x − 1)/(√x + 1).' },
      { q: 'Nêu một bí quyết làm tốt câu hình.', a: 'Vẽ hình to, chính xác bằng thước và compa; làm ý đầu (thường chứng minh tứ giác nội tiếp hoặc hệ thức) thật chắc vì các ý sau thường dựa vào nó.' },
    ]
  ),

  'S9TOAN-w32-quiz': L(
    'Luyện đề ôn thi vào 10 — Bộ 2',
    'Tiếp tục luyện đề với trọng tâm là bài toán phương trình bậc hai chứa tham số và kĩ thuật làm bài.',
    [
      'Giải bài toán phương trình bậc hai chứa tham số.',
      'Vận dụng Vi-ét cho bài toán điều kiện về nghiệm.',
      'Rèn kĩ thuật làm bài và quản lí thời gian.',
    ],
    [
      { h: 'Phương trình bậc hai chứa tham số' },
      { p: 'Dạng quen thuộc: cho phương trình theo x có tham số m; yêu cầu tìm m để phương trình có hai nghiệm phân biệt / nghiệm kép / thoả một hệ thức về nghiệm.' },
      { h: 'Quy trình giải' },
      { ul: ['Bước 1: xét điều kiện để là phương trình bậc hai (a ≠ 0 nếu a chứa m).', 'Bước 2: tính Δ (hoặc Δ′), đặt điều kiện về số nghiệm.', 'Bước 3: dùng Vi-ét biểu diễn S, P theo m rồi thay vào hệ thức của đề.', 'Bước 4: giải tìm m và đối chiếu điều kiện ở Bước 2.'] },
      { h: 'Kĩ thuật làm bài' },
      { ul: ['Đọc kĩ đề, gạch chân từ khoá và điều kiện.', 'Làm câu dễ trước để lấy điểm chắc.', 'Đánh dấu câu khó rồi quay lại sau.', 'Dành 10–15 phút cuối để soát lại dấu, điều kiện, đơn vị.'] },
      { h: 'Tâm lí phòng thi' },
      { p: 'Giữ bình tĩnh, không hoảng khi gặp câu lạ. Một câu khó không quyết định cả bài — hãy bảo toàn điểm các câu vừa sức.' },
      { note: 'Khi dùng Vi-ét, luôn nhớ điều kiện Δ ≥ 0; nếu yêu cầu hai nghiệm phân biệt thì Δ > 0; nếu a chứa tham số phải xét cả trường hợp a = 0.' },
    ],
    [
      { q: 'Cho phương trình x² − 2(m + 1)x + m² = 0. Tìm m để phương trình có hai nghiệm phân biệt.', a: 'Δ′ = (m + 1)² − m² = 2m + 1. Có hai nghiệm phân biệt ⇔ Δ′ > 0 ⇔ 2m + 1 > 0 ⇔ m > −1/2.' },
      { q: 'Với phương trình trên, dùng Vi-ét tính x₁ + x₂ và x₁·x₂ theo m.', a: 'Theo Vi-ét: x₁ + x₂ = 2(m + 1) = 2m + 2; x₁·x₂ = m².' },
      { q: 'Cho x² − 2x + m − 1 = 0. Tìm m để phương trình có hai nghiệm x₁, x₂ thoả x₁² + x₂² = 10.', a: 'Điều kiện có nghiệm: Δ′ = 1 − (m − 1) = 2 − m ≥ 0 ⇔ m ≤ 2. Vi-ét: S = 2, P = m − 1. Ta có x₁² + x₂² = S² − 2P = 4 − 2(m − 1) = 6 − 2m = 10 ⇒ m = −2 (thoả m ≤ 2). Vậy m = −2.' },
    ]
  ),

  'S9TOAN-w33-quiz': L(
    'Luyện đề ôn thi vào 10 — Bộ 3 + Bất đẳng thức',
    'Bất đẳng thức thường là câu 5 đề thi vào 10 — câu khó nhất, dùng để phân loại học sinh giỏi.',
    [
      'Nắm các bất đẳng thức cơ bản và điều kiện dấu bằng.',
      'Vận dụng vào bài toán tìm giá trị lớn nhất/nhỏ nhất.',
      'Rèn tư duy đánh giá biểu thức.',
    ],
    [
      { h: 'Bất đẳng thức Cô-si (AM–GM)' },
      { p: 'Với hai số không âm a, b: a + b ≥ 2√(ab), dấu "=" xảy ra khi a = b. Hệ quả thường dùng: ab ≤ (a + b)²/4.' },
      { h: 'Một số bất đẳng thức phụ' },
      { ul: ['a² + b² ≥ 2ab (suy ra từ (a − b)² ≥ 0).', '(a + b)² ≤ 2(a² + b²).', '|a| + |b| ≥ |a + b| (bất đẳng thức tam giác).'] },
      { h: 'Bất đẳng thức Cauchy–Schwarz (dạng phân thức)' },
      { p: 'Với a, b > 0 và các số dương: 1/a + 1/b ≥ 4/(a + b). Tổng quát hơn (dạng Bunhiacopxki/Engel): x²/m + y²/n ≥ (x + y)²/(m + n).' },
      { h: 'Quy trình tìm giá trị nhỏ nhất/lớn nhất' },
      { ul: ['Bước 1: biến đổi biểu thức về dạng áp được một bất đẳng thức đã biết.', 'Bước 2: đánh giá để có chặn (≥ hoặc ≤ một hằng số).', 'Bước 3: chỉ ra dấu "=" xảy ra khi nào và kiểm tra giá trị đạt được.'] },
      { note: 'Phải luôn chỉ rõ điều kiện DẤU BẰNG xảy ra mới kết luận được giá trị nhỏ nhất/lớn nhất. Nếu dấu bằng không đạt trong miền cho phép thì giá trị đó không phải min/max.' },
    ],
    [
      { q: 'Cho a, b > 0 và a + b = 4. Tìm giá trị nhỏ nhất của 1/a + 1/b.', a: 'Áp dụng 1/a + 1/b ≥ 4/(a + b) = 4/4 = 1. Dấu "=" khi a = b = 2. Vậy giá trị nhỏ nhất bằng 1.' },
      { q: 'Cho a + b = 6. Tìm giá trị lớn nhất của tích ab.', a: 'Theo hệ quả Cô-si: ab ≤ (a + b)²/4 = 36/4 = 9. Dấu "=" khi a = b = 3. Vậy giá trị lớn nhất của ab là 9.' },
      { q: 'Cho x > 0. Tìm giá trị nhỏ nhất của x + 4/x.', a: 'Áp dụng Cô-si cho hai số dương x và 4/x: x + 4/x ≥ 2√(x·4/x) = 2√4 = 4. Dấu "=" khi x = 4/x ⇒ x² = 4 ⇒ x = 2. Vậy giá trị nhỏ nhất là 4, đạt tại x = 2.' },
    ]
  ),

  'S9TOAN-w34-quiz': L(
    'Ôn tập tổng hợp — Đường tròn và hình không gian',
    'Hoàn thiện phần hình học trước kì thi: tổng hợp các kết quả về đường tròn và các hình khối tròn xoay.',
    [
      'Tổng hợp kiến thức về góc, dây, tiếp tuyến, tứ giác nội tiếp.',
      'Ôn các công thức diện tích, thể tích hình trụ, nón, cầu.',
      'Vận dụng vào bài hình tổng hợp.',
    ],
    [
      { h: 'Trọng tâm ôn đường tròn' },
      { ul: ['Góc với đường tròn: góc ở tâm, góc nội tiếp, góc tiếp tuyến – dây.', 'Quan hệ đường kính – dây, khoảng cách từ tâm đến dây.', 'Tiếp tuyến và tính chất hai tiếp tuyến cắt nhau.', 'Tứ giác nội tiếp: tính chất và dấu hiệu nhận biết.'] },
      { h: 'Trọng tâm ôn hình không gian' },
      { ul: ['Hình trụ: S_xq = 2πRh; V = πR²h.', 'Hình nón: l = √(R² + h²); S_xq = πRl; V = (1/3)πR²h.', 'Hình cầu: S = 4πR²; V = (4/3)πR³.'] },
      { h: 'Chiến lược câu hình thi vào 10' },
      { p: 'Câu hình thường có 3 ý theo độ khó tăng dần: ý 1 chứng minh tứ giác nội tiếp/hệ thức cơ bản; ý 2 tính toán hoặc chứng minh tiếp; ý 3 vận dụng nâng cao (quỹ tích, cực trị, thẳng hàng, đồng quy).' },
      { h: 'Mẹo liên kết kiến thức' },
      { p: 'Từ tứ giác nội tiếp suy ra các góc bằng nhau (cùng chắn cung) → từ đó suy ra tam giác đồng dạng → suy ra hệ thức về cạnh. Đây là mạch lập luận xuyên suốt nhiều bài hình.' },
      { note: 'Hệ thức quen thuộc: với tam giác ABC nội tiếp đường tròn đường kính AD và đường cao AH, ta có AB·AC = AH·AD (suy từ hai tam giác vuông đồng dạng).' },
    ],
    [
      { q: 'Tam giác ABC nội tiếp đường tròn (O), AH là đường cao, AD là đường kính qua A. Chứng minh AB·AC = AH·AD.', a: 'Góc ABD = 90° (nội tiếp chắn đường kính AD) và góc AHC = 90°. Hơn nữa góc ADB = góc ACB (cùng chắn cung AB). Do đó hai tam giác vuông ABD và AHC đồng dạng (g.g), suy ra AB/AH = AD/AC, tức AB·AC = AH·AD.' },
      { q: 'Một khối nón có R = 3, h = 4. Tính thể tích.', a: 'V = (1/3)πR²h = (1/3)π·9·4 = 12π.' },
      { q: 'Một hình cầu có bán kính R = 6. Tính diện tích mặt cầu (theo π).', a: 'S = 4πR² = 4π·36 = 144π.' },
    ]
  ),

  'S9TOAN-w35-quiz': L(
    'Đề ôn thi vào 10 — Tổng hợp cuối cấp',
    'Đề thi thử cuối cùng và những lời dặn dò — chuẩn bị bước vào kì thi tuyển sinh quan trọng.',
    [
      'Làm đề thi thử toàn diện theo cấu trúc đề thi tỉnh/thành.',
      'Tự đánh giá năng lực và điều chỉnh kế hoạch ôn tập.',
      'Chuẩn bị tâm lí và dụng cụ cho ngày thi.',
    ],
    [
      { h: 'Tổng kết toàn bộ kiến thức thi' },
      { ul: ['Đại số: căn thức, hàm số, hệ phương trình, phương trình bậc hai, Vi-ét.', 'Hình học: hệ thức lượng, tỉ số lượng giác, đường tròn, hình không gian.', 'Nâng cao: bất đẳng thức và cực trị.'] },
      { h: 'Chiến lược làm bài Toán' },
      { p: 'Câu 1, 2 (rút gọn, lập phương trình) thường dễ — làm chắc lấy trọn điểm. Câu 3 trung bình. Câu 4 hình học cần vẽ hình cẩn thận. Câu 5 làm sau cùng khi còn thời gian.' },
      { h: 'Soát bài trước khi nộp' },
      { ul: ['Kiểm tra điều kiện xác định và điều kiện của ẩn.', 'Đối chiếu nghiệm với điều kiện đề bài.', 'Kiểm tra đơn vị và kết luận đủ ý.'] },
      { h: 'Chuẩn bị cho ngày thi' },
      { ul: ['Ngủ đủ giấc trước ngày thi.', 'Mang đầy đủ dụng cụ: bút, thước, compa, êke, máy tính cầm tay.', 'Đến phòng thi sớm 30 phút, giữ tâm lí bình tĩnh, tự tin.'] },
      { note: 'Một câu khó không quyết định cả bài thi. Bỏ qua câu chưa làm được, hoàn thành các câu khác rồi mới quay lại. Chúc các em thi tốt!' },
    ],
    [
      { q: 'Nêu chiến lược phân bổ khi làm đề Toán thi vào 10.', a: 'Làm câu 1, 2 trước (chắc điểm); câu 3 ở mức trung bình; câu 4 vẽ hình thật cẩn thận và làm các ý từ dễ đến khó; câu 5 để sau cùng. Dành thời gian soát lại điều kiện và kết luận.' },
      { q: 'Rút gọn và tính: P = (√2 + 1)² − 2√2.', a: '(√2 + 1)² = 2 + 2√2 + 1 = 3 + 2√2. Vậy P = 3 + 2√2 − 2√2 = 3.' },
      { q: 'Lời khuyên khi gặp một câu quá khó trong đề thi?', a: 'Giữ bình tĩnh, không hoảng loạn. Đánh dấu câu đó, chuyển sang làm các câu vừa sức để bảo toàn điểm, rồi quay lại nếu còn thời gian.' },
    ]
  ),

  'S9TOAN-w36-quiz': L(
    'Kết thúc Toán THCS — Nhìn lại hành trình',
    'Tuần cuối năm, cô và các em cùng nhìn lại toàn bộ hành trình Toán THCS — không phải để ôn bài mà để thấy mình đã trưởng thành đến đâu và mang theo điều gì vào THPT.',
    [
      'Hệ thống hoá bức tranh toàn cảnh kiến thức Toán 9.',
      'Nhận ra sự kết nối giữa các mạch kiến thức đã học.',
      'Tự đánh giá điểm mạnh và xác định hướng phát triển ở THPT.',
    ],
    [
      { h: 'Bản đồ kiến thức Toán 9' },
      { p: 'Toán 9 gồm hai mạch lớn: Đại số (căn thức, hàm số bậc nhất & bậc hai, hệ phương trình, phương trình bậc hai, Vi-ét) và Hình học (hệ thức lượng trong tam giác vuông, tỉ số lượng giác, đường tròn, hình không gian).' },
      { h: 'Những "viên gạch nền" vào THPT' },
      { ul: [
        'Căn thức: nền tảng cho hàm số vô tỉ, đạo hàm ở lớp 11–12.',
        'Phương trình bậc hai và Vi-ét: xuất hiện xuyên suốt chương trình THPT.',
        'Tỉ số lượng giác: mở đầu cho chương lượng giác và vectơ lớp 10.',
        'Đường tròn: dẫn vào hình học giải tích ở lớp 10–11.',
      ] },
      { h: 'Toán học rèn luyện tư duy gì?' },
      { p: 'Sau 4 năm Toán THCS, em không chỉ biết tính toán — em đã rèn được: tư duy logic (lập luận từng bước), tư duy trừu tượng (ẩn số, hàm số), tư duy không gian (hình học), và thói quen kiểm tra kết quả. Đây là hành trang quý giá cho mọi môn học ở THPT.' },
      { h: 'Lời khuyên cho hành trình Toán THPT' },
      { ul: [
        'Lớp 10: học kĩ hàm số, vectơ và lượng giác — đây là nền tảng cho cả khối THPT.',
        'Đừng bỏ bài tập: Toán THPT chỉ hiểu được khi làm bài đủ nhiều.',
        'Giữ thói quen làm dàn ý hướng giải trước khi tính.',
        'Xây dựng sổ công thức riêng — và tra cứu mỗi khi cần.',
      ] },
      { note: 'Cô biết Toán không dễ — nhưng mỗi bài khó các em vượt qua đều làm não bộ mạnh hơn. Hãy tự hào vì đã đi được đến đây và tự tin bước tiếp. Chúc mừng năm học!' },
    ],
    [
      { q: 'Hãy liệt kê 3 kiến thức Toán 9 quan trọng nhất sẽ dùng nhiều ở THPT.', a: '(1) Phương trình bậc hai và công thức Vi-ét — xuất hiện trong hàm số bậc hai, phương trình lượng giác, số phức. (2) Tỉ số lượng giác của góc nhọn — mở đầu cho toàn bộ chương lượng giác lớp 10–12. (3) Căn thức và hằng đẳng thức đáng nhớ — nền tảng tính toán mọi bài tập THPT.' },
      { q: 'Nếu thi vào 10 chưa được điểm như mong muốn, em nên nhìn nhận thế nào?', a: 'Một kì thi không định nghĩa năng lực cả đời. Quan trọng là em rút ra được bài học: phần nào còn yếu, cách ôn tập nào hiệu quả hơn. Tinh thần vượt thử thách đó chính là thứ giúp em tiến bộ ở THPT và xa hơn nữa.' },
      { q: 'Một câu Toán gây ấn tượng hoặc thú vị nhất trong chương trình lớp 9 mà em nhớ?', a: 'Có thể là định lí Vi-ét: chỉ cần biết tổng và tích hai nghiệm là ta có thể phân tích và giải hàng loạt bài toán mà không cần tìm từng nghiệm riêng — một "phím tắt" rất thanh lịch của đại số.' },
    ]
  ),
};
