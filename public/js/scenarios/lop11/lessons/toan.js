// ============================================================
// Lớp 11 · TOÁN — Lý thuyết theo tuần (35 tuần)
// Key TRÙNG id quiz: 'H11TOAN-wNN-quiz'.
// Bám CTGD 2018 (Toán 11): Lượng giác · Dãy số/CSC/CSN · Giới hạn · Đạo hàm ·
// Hình học không gian (song song/vuông góc, góc, khoảng cách) · Xác suất · Mũ–lôgarit.
// ============================================================

export const H11TOAN_LESSONS = {
  'H11TOAN-w01-quiz': {
    topic: 'Góc lượng giác và radian',
    intro: 'Các em sẽ làm quen với cách đo góc bằng radian — đơn vị tự nhiên trong toán cao cấp — và đường tròn lượng giác.',
    objectives: [
      'Hiểu định nghĩa radian và đổi qua lại độ ↔ radian.',
      'Biểu diễn cung, góc lượng giác trên đường tròn lượng giác.',
      'Tính độ dài cung tròn theo số đo radian.',
    ],
    theory: [
      { h: 'Radian là gì?' },
      { p: '1 radian là số đo của góc ở tâm chắn một cung có độ dài bằng bán kính. Cả đường tròn có số đo 2π rad, tương ứng 360°.' },
      { h: 'Công thức đổi đơn vị' },
      { ul: [
        'Từ độ sang radian: α(rad) = α(độ) · π/180.',
        'Từ radian sang độ: α(độ) = α(rad) · 180/π.',
        '1 rad ≈ 57°17\'45\", 1° = π/180 rad.',
      ] },
      { h: 'Góc lượng giác' },
      { p: 'Một góc lượng giác có vô số số đo sai khác nhau bội của 2π: nếu góc có số đo α thì các số đo còn lại là α + k·2π (k nguyên), vì cùng một vị trí điểm cuối trên đường tròn.' },
      { h: 'Độ dài cung tròn' },
      { p: 'Cung tròn bán kính R, số đo α radian có độ dài l = R·α.' },
      { note: 'Các giá trị đặc biệt nên thuộc: 30° = π/6, 45° = π/4, 60° = π/3, 90° = π/2, 180° = π.' },
    ],
    examples: [
      { q: 'Đổi 120° sang radian.', a: '120 · π/180 = 120π/180 = 2π/3 rad.' },
      { q: 'Cung tròn bán kính R = 6 cm, số đo 2π/3 rad. Tính độ dài cung.', a: 'l = R·α = 6 · 2π/3 = 4π ≈ 12,57 cm.' },
      { q: 'Đổi 3π/4 rad sang độ.', a: '3π/4 · 180/π = 3·180/4 = 135°.' },
    ],
  },

  'H11TOAN-w02-quiz': {
    topic: 'Giá trị lượng giác của một góc',
    intro: 'Các em ôn lại sin, cos, tan, cot và các hệ thức cơ bản giúp tính giá trị lượng giác khi biết một trong chúng.',
    objectives: [
      'Nhớ giá trị lượng giác các góc đặc biệt.',
      'Vận dụng hệ thức sin^2 x + cos^2 x = 1 và các hệ thức liên quan.',
      'Xác định dấu của giá trị lượng giác theo cung phần tư.',
    ],
    theory: [
      { h: 'Các giá trị lượng giác' },
      { p: 'Với góc α: sin α, cos α là tung độ và hoành độ của điểm cuối trên đường tròn lượng giác; tan α = sin α / cos α (cos α ≠ 0); cot α = cos α / sin α (sin α ≠ 0).' },
      { h: 'Hệ thức cơ bản' },
      { ul: [
        'sin^2 x + cos^2 x = 1.',
        '1 + tan^2 x = 1/cos^2 x.',
        '1 + cot^2 x = 1/sin^2 x.',
        'tan x · cot x = 1.',
      ] },
      { h: 'Dấu theo cung phần tư' },
      { ul: [
        'Cung I (0; π/2): tất cả dương.',
        'Cung II (π/2; π): sin dương, cos và tan âm.',
        'Cung III (π; 3π/2): tan dương, sin và cos âm.',
        'Cung IV (3π/2; 2π): cos dương, sin và tan âm.',
      ] },
      { h: 'Giá trị đặc biệt' },
      { p: 'sin 0 = 0, sin π/6 = 1/2, sin π/4 = √2/2, sin π/3 = √3/2, sin π/2 = 1. Với cos thì ngược lại theo thứ tự.' },
      { note: 'Khi tính cos từ sin (hoặc ngược lại) phải xét dấu dựa vào khoảng chứa α.' },
    ],
    examples: [
      { q: 'Cho cos α = 3/5 và α ∈ (0; π/2). Tính sin α và tan α.', a: 'sin^2 α = 1 − 9/25 = 16/25. Vì α ở cung I nên sin α > 0 ⇒ sin α = 4/5. tan α = sin α / cos α = (4/5)/(3/5) = 4/3.' },
      { q: 'Cho sin α = −1/2 và α ∈ (π; 3π/2). Tính cos α.', a: 'cos^2 α = 1 − 1/4 = 3/4. Cung III nên cos α < 0 ⇒ cos α = −√3/2.' },
    ],
  },

  'H11TOAN-w03-quiz': {
    topic: 'Công thức lượng giác',
    intro: 'Các em học bộ công thức cộng, nhân đôi, biến đổi tổng–tích — công cụ cốt lõi để rút gọn và giải phương trình lượng giác.',
    objectives: [
      'Thuộc và áp dụng công thức cộng cho sin, cos, tan.',
      'Sử dụng công thức nhân đôi và hạ bậc.',
      'Biến đổi tổng thành tích và ngược lại.',
    ],
    theory: [
      { h: 'Công thức cộng' },
      { ul: [
        'sin(a ± b) = sin a · cos b ± cos a · sin b.',
        'cos(a ± b) = cos a · cos b ∓ sin a · sin b.',
        'tan(a ± b) = (tan a ± tan b)/(1 ∓ tan a · tan b).',
      ] },
      { h: 'Công thức nhân đôi' },
      { ul: [
        'sin 2a = 2 sin a · cos a.',
        'cos 2a = cos^2 a − sin^2 a = 2cos^2 a − 1 = 1 − 2sin^2 a.',
        'tan 2a = 2 tan a/(1 − tan^2 a).',
      ] },
      { h: 'Công thức hạ bậc' },
      { p: 'sin^2 a = (1 − cos 2a)/2; cos^2 a = (1 + cos 2a)/2.' },
      { h: 'Biến đổi tổng thành tích' },
      { ul: [
        'cos a + cos b = 2 cos((a+b)/2) · cos((a−b)/2).',
        'sin a + sin b = 2 sin((a+b)/2) · cos((a−b)/2).',
      ] },
      { note: 'Tách góc lớn thành tổng/hiệu góc đặc biệt là mẹo hay dùng, ví dụ 75° = 45° + 30°.' },
    ],
    examples: [
      { q: 'Tính cos 15°.', a: 'cos 15° = cos(45° − 30°) = cos45·cos30 + sin45·sin30 = (√2/2)(√3/2) + (√2/2)(1/2) = (√6 + √2)/4.' },
      { q: 'Rút gọn biểu thức 2sin a · cos a + 1 − 2sin^2 a.', a: '2sin a · cos a = sin 2a; 1 − 2sin^2 a = cos 2a. Vậy biểu thức = sin 2a + cos 2a.' },
    ],
  },

  'H11TOAN-w04-quiz': {
    topic: 'Hàm số lượng giác và đồ thị',
    intro: 'Các em khảo sát bốn hàm lượng giác: tập xác định, tập giá trị, tính tuần hoàn, tính chẵn lẻ và dáng đồ thị.',
    objectives: [
      'Xác định tập xác định, tập giá trị của hàm lượng giác.',
      'Nêu chu kỳ và tính chẵn/lẻ của mỗi hàm.',
      'Nhận dạng đồ thị y = sin x, y = cos x, y = tan x.',
    ],
    theory: [
      { h: 'Hàm y = sin x và y = cos x' },
      { ul: [
        'Tập xác định: ℝ (mọi số thực).',
        'Tập giá trị: [−1; 1].',
        'Chu kỳ: 2π.',
        'sin x là hàm lẻ; cos x là hàm chẵn.',
      ] },
      { h: 'Hàm y = tan x và y = cot x' },
      { ul: [
        'y = tan x xác định khi cos x ≠ 0, tức x ≠ π/2 + kπ; chu kỳ π; là hàm lẻ.',
        'y = cot x xác định khi sin x ≠ 0, tức x ≠ kπ; chu kỳ π; là hàm lẻ.',
      ] },
      { h: 'Tính tuần hoàn' },
      { p: 'Hàm tuần hoàn chu kỳ T nghĩa là f(x + T) = f(x) với mọi x. Đồ thị lặp lại sau mỗi đoạn dài T.' },
      { h: 'Tính đối xứng đồ thị' },
      { p: 'Đồ thị hàm chẵn (cos x) đối xứng qua trục Oy; đồ thị hàm lẻ (sin x, tan x) đối xứng qua gốc toạ độ O.' },
      { note: 'Hàm sin và cos bị chặn nên đồ thị nằm gọn trong dải −1 ≤ y ≤ 1; hàm tan không bị chặn, có tiệm cận đứng tại x = π/2 + kπ.' },
    ],
    examples: [
      { q: 'Tìm tập xác định của y = tan(x − π/4).', a: 'Cần cos(x − π/4) ≠ 0 ⇔ x − π/4 ≠ π/2 + kπ ⇔ x ≠ 3π/4 + kπ. Tập xác định: ℝ \\ {3π/4 + kπ}.' },
      { q: 'Tìm giá trị lớn nhất, nhỏ nhất của y = 2sin x + 1.', a: 'Vì −1 ≤ sin x ≤ 1 nên −2 ≤ 2sin x ≤ 2, suy ra −1 ≤ y ≤ 3. Max y = 3 (khi sin x = 1), min y = −1 (khi sin x = −1).' },
    ],
  },

  'H11TOAN-w05-quiz': {
    topic: 'Phương trình lượng giác cơ bản',
    intro: 'Các em học cách viết công thức nghiệm tổng quát cho các phương trình sin x = m, cos x = m, tan x = m.',
    objectives: [
      'Viết công thức nghiệm tổng quát của các phương trình lượng giác cơ bản.',
      'Đếm số nghiệm trên một khoảng cho trước.',
      'Nhận biết điều kiện có nghiệm của sin x = m, cos x = m.',
    ],
    theory: [
      { h: 'Phương trình sin x = m' },
      { ul: [
        'Có nghiệm khi −1 ≤ m ≤ 1.',
        'sin x = sin α ⇔ x = α + k2π hoặc x = π − α + k2π.',
        'Đặc biệt: sin x = 0 ⇔ x = kπ; sin x = 1 ⇔ x = π/2 + k2π; sin x = −1 ⇔ x = −π/2 + k2π.',
      ] },
      { h: 'Phương trình cos x = m' },
      { ul: [
        'Có nghiệm khi −1 ≤ m ≤ 1.',
        'cos x = cos α ⇔ x = ±α + k2π.',
        'Đặc biệt: cos x = 0 ⇔ x = π/2 + kπ; cos x = 1 ⇔ x = k2π; cos x = −1 ⇔ x = π + k2π.',
      ] },
      { h: 'Phương trình tan x = m' },
      { p: 'tan x = tan α ⇔ x = α + kπ (luôn có nghiệm với mọi m, chu kỳ π).' },
      { note: 'k luôn là số nguyên. Với phương trình tan và cot cần chú ý điều kiện xác định.' },
    ],
    examples: [
      { q: 'Giải phương trình sin x = 1/2.', a: 'sin x = sin(π/6) ⇔ x = π/6 + k2π hoặc x = 5π/6 + k2π (k ∈ ℤ).' },
      { q: 'Tìm số nghiệm của cos x = 1/2 trên [0; 2π).', a: 'cos x = cos(π/3) ⇔ x = ±π/3 + k2π. Trên [0; 2π) lấy x = π/3 và x = 5π/3 ⇒ có 2 nghiệm.' },
    ],
  },

  'H11TOAN-w06-quiz': {
    topic: 'Phương trình lượng giác nâng cao',
    intro: 'Các em luyện kỹ thuật đưa phương trình về dạng cơ bản: phương trình bậc hai theo một hàm, dạng a sin x + b cos x = c.',
    objectives: [
      'Giải phương trình bậc hai đối với một giá trị lượng giác.',
      'Biến đổi a sin x + b cos x về dạng tích một hàm lượng giác.',
      'Biết điều kiện có nghiệm của a sin x + b cos x = c.',
    ],
    theory: [
      { h: 'Phương trình bậc hai theo một hàm' },
      { p: 'Dạng a·t^2 + b·t + c = 0 với t = sin x (hoặc cos x, tan x). Giải tìm t rồi quay về phương trình cơ bản, nhớ điều kiện −1 ≤ t ≤ 1 với t = sin x hoặc cos x.' },
      { h: 'Phương trình a sin x + b cos x = c' },
      { ul: [
        'Chia hai vế cho √(a^2 + b^2), đưa về dạng sin(x + φ) = c/√(a^2 + b^2).',
        'Điều kiện có nghiệm: a^2 + b^2 ≥ c^2.',
        'Hệ quả hay dùng: sin x + cos x = √2 · sin(x + π/4).',
      ] },
      { h: 'Dùng công thức nhân đôi để hạ bậc' },
      { p: 'Ví dụ 2cos^2 x − 1 = cos 2x, hay 2sin^2 x = 1 − cos 2x, giúp đưa về phương trình theo góc 2x.' },
      { note: 'Luôn kiểm tra lại điều kiện −1 ≤ giá trị ≤ 1 trước khi kết luận nghiệm cho sin và cos.' },
    ],
    examples: [
      { q: 'Giải 2sin^2 x − 3sin x + 1 = 0.', a: 'Đặt t = sin x (−1 ≤ t ≤ 1): 2t^2 − 3t + 1 = 0 ⇒ t = 1 hoặc t = 1/2. Với sin x = 1 ⇒ x = π/2 + k2π; với sin x = 1/2 ⇒ x = π/6 + k2π hoặc x = 5π/6 + k2π.' },
      { q: 'Giải sin x + cos x = 1.', a: '√2 · sin(x + π/4) = 1 ⇒ sin(x + π/4) = 1/√2 = sin(π/4). Vậy x + π/4 = π/4 + k2π hoặc x + π/4 = 3π/4 + k2π ⇒ x = k2π hoặc x = π/2 + k2π.' },
    ],
  },

  'H11TOAN-w07-quiz': {
    topic: 'Dãy số',
    intro: 'Các em làm quen khái niệm dãy số như một hàm số trên tập số tự nhiên, cùng các tính chất tăng, giảm, bị chặn.',
    objectives: [
      'Hiểu dãy số là hàm số xác định trên ℕ*.',
      'Tính số hạng tổng quát và số hạng cụ thể.',
      'Xét tính tăng/giảm và bị chặn của dãy số.',
    ],
    theory: [
      { h: 'Định nghĩa dãy số' },
      { p: 'Dãy số (uₙ) là một hàm số u: ℕ* → ℝ, n ↦ uₙ. Mỗi số tự nhiên n ứng với một số hạng uₙ.' },
      { h: 'Cách cho dãy số' },
      { ul: [
        'Bằng công thức số hạng tổng quát, ví dụ uₙ = 2n + 1.',
        'Bằng hệ thức truy hồi, ví dụ u₁ = 1, uₙ₊₁ = uₙ + 3.',
      ] },
      { h: 'Dãy tăng, dãy giảm' },
      { ul: [
        'Dãy tăng: uₙ₊₁ > uₙ với mọi n.',
        'Dãy giảm: uₙ₊₁ < uₙ với mọi n.',
        'Xét dấu hiệu uₙ₊₁ − uₙ hoặc so sánh tỉ số uₙ₊₁/uₙ (khi các số hạng dương).',
      ] },
      { h: 'Dãy bị chặn' },
      { p: 'Dãy bị chặn trên nếu có M sao cho uₙ ≤ M với mọi n; bị chặn dưới nếu có m sao cho uₙ ≥ m; bị chặn nếu vừa chặn trên vừa chặn dưới.' },
      { note: 'Dãy (−1)ⁿ không tăng cũng không giảm vì dao động giữa −1 và 1, nhưng vẫn bị chặn trong [−1; 1].' },
    ],
    examples: [
      { q: 'Cho uₙ = (n + 1)/n. Tính u₃ và xét tính đơn điệu.', a: 'u₃ = 4/3. Xét uₙ = 1 + 1/n; vì 1/n giảm khi n tăng nên uₙ₊₁ < uₙ ⇒ dãy giảm.' },
      { q: 'Chứng minh dãy uₙ = 2n − 1 là dãy tăng.', a: 'uₙ₊₁ − uₙ = [2(n+1) − 1] − [2n − 1] = 2 > 0 với mọi n. Vậy dãy tăng.' },
    ],
  },

  'H11TOAN-w08-quiz': {
    topic: 'Cấp số cộng',
    intro: 'Các em học cấp số cộng — dãy có hiệu hai số hạng liên tiếp không đổi — cùng công thức số hạng tổng quát và tổng.',
    objectives: [
      'Nhận biết cấp số cộng và xác định công sai d.',
      'Áp dụng công thức số hạng tổng quát uₙ = u₁ + (n−1)d.',
      'Tính tổng n số hạng đầu của cấp số cộng.',
    ],
    theory: [
      { h: 'Định nghĩa' },
      { p: 'Cấp số cộng là dãy số mà uₙ₊₁ = uₙ + d, với d là công sai không đổi. Vậy d = uₙ₊₁ − uₙ.' },
      { h: 'Số hạng tổng quát' },
      { p: 'uₙ = u₁ + (n − 1)·d.' },
      { h: 'Tính chất số hạng giữa' },
      { p: 'Ba số a, b, c lập thành cấp số cộng khi và chỉ khi 2b = a + c (b là trung bình cộng của a và c).' },
      { h: 'Tổng n số hạng đầu' },
      { ul: [
        'Sₙ = n(u₁ + uₙ)/2.',
        'Hoặc Sₙ = n·u₁ + n(n−1)/2·d.',
      ] },
      { note: 'Tổng các số lẻ liên tiếp 1 + 3 + 5 + ... + (2n−1) = n^2 là một kết quả cấp số cộng đẹp nên nhớ.' },
    ],
    examples: [
      { q: 'Cấp số cộng có u₁ = 5, d = 3. Tính u₁₀ và tổng S₁₀.', a: 'u₁₀ = 5 + 9·3 = 32. S₁₀ = 10·(u₁ + u₁₀)/2 = 10·(5 + 32)/2 = 185.' },
      { q: 'Tính tổng 1 + 2 + 3 + ... + 100.', a: 'Đây là cấp số cộng u₁ = 1, u₁₀₀ = 100. S = 100·(1 + 100)/2 = 100·101/2 = 5050.' },
    ],
  },

  'H11TOAN-w09-quiz': {
    topic: 'Cấp số nhân',
    intro: 'Các em học cấp số nhân — dãy có tỉ số hai số hạng liên tiếp không đổi — cùng công thức số hạng và tổng.',
    objectives: [
      'Nhận biết cấp số nhân và xác định công bội q.',
      'Áp dụng công thức số hạng tổng quát uₙ = u₁·q^(n−1).',
      'Tính tổng n số hạng đầu của cấp số nhân.',
    ],
    theory: [
      { h: 'Định nghĩa' },
      { p: 'Cấp số nhân là dãy số mà uₙ₊₁ = uₙ · q, với q là công bội không đổi (q ≠ 0). Vậy q = uₙ₊₁/uₙ.' },
      { h: 'Số hạng tổng quát' },
      { p: 'uₙ = u₁ · q^(n−1).' },
      { h: 'Tính chất số hạng giữa' },
      { p: 'Ba số a, b, c (khác 0) lập thành cấp số nhân khi và chỉ khi b^2 = a·c.' },
      { h: 'Tổng n số hạng đầu' },
      { p: 'Khi q ≠ 1: Sₙ = u₁·(1 − q^n)/(1 − q). Khi q = 1: Sₙ = n·u₁.' },
      { note: 'Phân biệt rõ: cấp số cộng dùng phép cộng (công sai d), cấp số nhân dùng phép nhân (công bội q).' },
    ],
    examples: [
      { q: 'Cấp số nhân có u₁ = 2, q = 3. Tính u₅ và S₅.', a: 'u₅ = 2·3^4 = 2·81 = 162. S₅ = 2·(1 − 3^5)/(1 − 3) = 2·(1 − 243)/(−2) = 2·(−242)/(−2) = 242.' },
      { q: 'Cho cấp số nhân u₁ = 4, u₃ = 16, công bội dương. Tìm q.', a: 'u₃ = u₁·q^2 ⇒ 16 = 4·q^2 ⇒ q^2 = 4 ⇒ q = 2 (lấy giá trị dương).' },
    ],
  },

  'H11TOAN-w10-quiz': {
    topic: 'Giới hạn của dãy số',
    intro: 'Các em làm quen khái niệm giới hạn dãy số, các giới hạn cơ bản và tổng cấp số nhân lùi vô hạn.',
    objectives: [
      'Hiểu khái niệm dãy số có giới hạn 0 và giới hạn hữu hạn.',
      'Tính giới hạn của dãy phân thức bằng cách chia cho lũy thừa cao nhất.',
      'Tính tổng cấp số nhân lùi vô hạn.',
    ],
    theory: [
      { h: 'Giới hạn cơ bản' },
      { ul: [
        'lim (1/n) = 0; lim (1/n^k) = 0 với k > 0.',
        'lim q^n = 0 khi |q| < 1.',
        'lim n^k = +∞ khi k > 0.',
      ] },
      { h: 'Kỹ thuật tính giới hạn phân thức' },
      { p: 'Với dãy dạng đa thức/đa thức, chia cả tử và mẫu cho lũy thừa cao nhất của n rồi dùng lim(1/n) = 0. Giới hạn bằng tỉ số hệ số bậc cao nhất nếu hai bậc bằng nhau.' },
      { h: 'Số e' },
      { p: 'lim (1 + 1/n)^n = e ≈ 2,718 — một hằng số quan trọng trong toán giải tích.' },
      { h: 'Tổng cấp số nhân lùi vô hạn' },
      { p: 'Khi |q| < 1, tổng S = u₁ + u₁q + u₁q^2 + ... = u₁/(1 − q).' },
      { note: 'Cấp số nhân lùi vô hạn là cấp số nhân có |q| < 1; chỉ khi đó tổng vô hạn mới hữu hạn.' },
    ],
    examples: [
      { q: 'Tính lim (3n + 2)/(n − 5).', a: 'Chia tử và mẫu cho n: (3 + 2/n)/(1 − 5/n). Khi n → ∞ thì 2/n → 0 và 5/n → 0, nên giới hạn = 3/1 = 3.' },
      { q: 'Tính tổng 1 + 1/2 + 1/4 + 1/8 + ...', a: 'Cấp số nhân lùi vô hạn u₁ = 1, q = 1/2 (|q| < 1). S = u₁/(1 − q) = 1/(1 − 1/2) = 2.' },
    ],
  },

  'H11TOAN-w11-quiz': {
    topic: 'Giới hạn của hàm số',
    intro: 'Các em học giới hạn hàm số khi x dần tới một điểm hoặc tới vô cực, cùng kỹ thuật khử dạng vô định 0/0.',
    objectives: [
      'Hiểu khái niệm giới hạn hàm số tại một điểm và tại vô cực.',
      'Khử dạng vô định 0/0 bằng phân tích nhân tử.',
      'Nhớ giới hạn cơ bản lim(x→0) sin x / x = 1.',
    ],
    theory: [
      { h: 'Giới hạn tại một điểm' },
      { p: 'lim(x→x₀) f(x) = L nghĩa là khi x dần tới x₀ thì f(x) dần tới L. Với hàm liên tục tại x₀ thì giới hạn bằng giá trị f(x₀).' },
      { h: 'Dạng vô định 0/0' },
      { p: 'Khi thay x = x₀ được 0/0, ta phân tích tử và mẫu thành nhân tử rồi rút gọn nhân tử chung (x − x₀), sau đó thay giá trị.' },
      { h: 'Giới hạn tại vô cực' },
      { ul: [
        'lim(x→+∞) 1/x = 0; lim(x→±∞) 1/x^k = 0 với k > 0.',
        'Với phân thức, chia tử mẫu cho lũy thừa cao nhất của x.',
      ] },
      { h: 'Giới hạn cơ bản' },
      { p: 'lim(x→0) sin x / x = 1 — giới hạn đặc biệt dùng nhiều trong giải tích.' },
      { note: 'Giới hạn một bên: lim(x→0⁺) 1/x = +∞ còn lim(x→0⁻) 1/x = −∞, nên lim(x→0) 1/x không tồn tại.' },
    ],
    examples: [
      { q: 'Tính lim(x→2) (x^2 − 4)/(x − 2).', a: 'Phân tích x^2 − 4 = (x − 2)(x + 2). Rút gọn: (x + 2). Thay x = 2 ⇒ giới hạn = 4.' },
      { q: 'Tính lim(x→+∞) (2x^2 + 3x)/(x^2 + 1).', a: 'Chia tử mẫu cho x^2: (2 + 3/x)/(1 + 1/x^2). Khi x → +∞ các phần 3/x, 1/x^2 → 0 ⇒ giới hạn = 2.' },
    ],
  },

  'H11TOAN-w12-quiz': {
    topic: 'Hàm số liên tục',
    intro: 'Các em học khái niệm hàm số liên tục tại một điểm, trên một khoảng và ứng dụng định lý giá trị trung gian.',
    objectives: [
      'Hiểu định nghĩa hàm số liên tục tại một điểm.',
      'Biết các hàm đa thức, phân thức liên tục trên đâu.',
      'Dùng định lý giá trị trung gian để chứng minh phương trình có nghiệm.',
    ],
    theory: [
      { h: 'Liên tục tại một điểm' },
      { p: 'Hàm f liên tục tại x₀ khi lim(x→x₀) f(x) = f(x₀). Cần ba điều: f(x₀) xác định, giới hạn tồn tại, và hai giá trị đó bằng nhau.' },
      { h: 'Liên tục trên khoảng/đoạn' },
      { ul: [
        'Hàm đa thức liên tục trên toàn bộ ℝ.',
        'Hàm phân thức hữu tỉ liên tục trên tập xác định (trừ điểm làm mẫu bằng 0).',
        'Hàm lượng giác sin x, cos x liên tục trên ℝ.',
      ] },
      { h: 'Định lý giá trị trung gian (Bolzano)' },
      { p: 'Nếu f liên tục trên đoạn [a; b] và f(a)·f(b) < 0 thì phương trình f(x) = 0 có ít nhất một nghiệm trong khoảng (a; b).' },
      { h: 'Điểm gián đoạn' },
      { p: 'Tại điểm hàm không xác định hoặc giới hạn ≠ giá trị hàm thì hàm gián đoạn, ví dụ f(x) = 1/x gián đoạn tại x = 0.' },
      { note: 'Hàm f(x) = |x| liên tục tại 0 vì giới hạn trái = giới hạn phải = f(0) = 0, dù tại đó không có đạo hàm.' },
    ],
    examples: [
      { q: 'Xét tính liên tục của f(x) = (x^2 − 1)/(x − 1) khi định nghĩa thêm f(1) = 2.', a: 'Với x ≠ 1: f(x) = (x − 1)(x + 1)/(x − 1) = x + 1. lim(x→1) f(x) = 2 = f(1). Vậy f liên tục tại x = 1.' },
      { q: 'Chứng minh phương trình x^3 + x − 1 = 0 có nghiệm trong (0; 1).', a: 'Đặt f(x) = x^3 + x − 1 liên tục trên [0; 1]. f(0) = −1 < 0, f(1) = 1 > 0 nên f(0)·f(1) < 0 ⇒ có ít nhất một nghiệm trong (0; 1).' },
    ],
  },

  'H11TOAN-w13-quiz': {
    topic: 'Định nghĩa và ý nghĩa đạo hàm',
    intro: 'Các em học định nghĩa đạo hàm bằng giới hạn, ý nghĩa hình học (hệ số góc tiếp tuyến) và một số đạo hàm cơ bản.',
    objectives: [
      'Hiểu định nghĩa đạo hàm tại một điểm bằng giới hạn.',
      'Nắm ý nghĩa hình học và vật lý của đạo hàm.',
      'Nhớ đạo hàm của hằng số, lũy thừa và hàm lượng giác cơ bản.',
    ],
    theory: [
      { h: 'Định nghĩa đạo hàm' },
      { p: 'Đạo hàm của f tại x₀: f\'(x₀) = lim(Δx→0) [f(x₀ + Δx) − f(x₀)]/Δx (nếu giới hạn này tồn tại hữu hạn).' },
      { h: 'Ý nghĩa hình học' },
      { p: 'f\'(x₀) là hệ số góc của tiếp tuyến với đồ thị y = f(x) tại điểm có hoành độ x₀.' },
      { h: 'Ý nghĩa vật lý' },
      { p: 'Nếu s(t) là quãng đường theo thời gian thì v(t) = s\'(t) là vận tốc tức thời.' },
      { h: 'Một số đạo hàm cơ bản' },
      { ul: [
        '(C)\' = 0 với C là hằng số.',
        '(x^n)\' = n·x^(n−1).',
        '(sin x)\' = cos x; (cos x)\' = −sin x.',
      ] },
      { note: 'Hàm có đạo hàm tại x₀ thì liên tục tại x₀, nhưng điều ngược lại không luôn đúng (ví dụ |x| tại 0).' },
    ],
    examples: [
      { q: 'Dùng định nghĩa, tính đạo hàm của f(x) = x^2 tại x₀ = 3.', a: 'f\'(3) = lim(Δx→0) [(3 + Δx)^2 − 9]/Δx = lim(Δx→0) (6Δx + Δx^2)/Δx = lim(Δx→0) (6 + Δx) = 6.' },
      { q: 'Tính đạo hàm của f(x) = x^5 và f(x) = sin x.', a: '(x^5)\' = 5x^4. (sin x)\' = cos x.' },
    ],
  },

  'H11TOAN-w14-quiz': {
    topic: 'Quy tắc tính đạo hàm',
    intro: 'Các em học các quy tắc đạo hàm của tổng, hiệu, tích, thương và đạo hàm hàm hợp.',
    objectives: [
      'Áp dụng quy tắc đạo hàm tổng, hiệu, tích, thương.',
      'Tính đạo hàm hàm hợp theo công thức dây chuyền.',
      'Nhớ đạo hàm tan x và cot x.',
    ],
    theory: [
      { h: 'Quy tắc cơ bản' },
      { ul: [
        '(u ± v)\' = u\' ± v\'.',
        '(k·u)\' = k·u\' với k hằng số.',
        '(u·v)\' = u\'·v + u·v\'.',
        '(u/v)\' = (u\'·v − u·v\')/v^2 (v ≠ 0).',
      ] },
      { h: 'Đạo hàm hàm hợp' },
      { p: 'Nếu y = f(u) và u = g(x) thì y\'(x) = f\'(u)·u\'(x). Ví dụ (sin u)\' = u\'·cos u.' },
      { h: 'Đạo hàm hàm lượng giác' },
      { ul: [
        '(tan x)\' = 1/cos^2 x = 1 + tan^2 x.',
        '(cot x)\' = −1/sin^2 x.',
      ] },
      { note: 'Khi gặp hàm dạng (ax + b)^n hay sin(ax + b), nhớ nhân thêm đạo hàm của biểu thức bên trong.' },
    ],
    examples: [
      { q: 'Tính đạo hàm của f(x) = x^3 + 2x − 5.', a: 'f\'(x) = 3x^2 + 2.' },
      { q: 'Tính đạo hàm của y = sin(2x) và y = (3x + 1)^4.', a: '(sin 2x)\' = 2·cos 2x. ((3x + 1)^4)\' = 4·(3x + 1)^3·3 = 12(3x + 1)^3.' },
    ],
  },

  'H11TOAN-w15-quiz': {
    topic: 'Đạo hàm cấp cao và ứng dụng',
    intro: 'Các em học đạo hàm cấp hai, ý nghĩa của nó, phương trình tiếp tuyến và ứng dụng tìm cực trị.',
    objectives: [
      'Tính đạo hàm cấp hai f\'\'(x).',
      'Viết phương trình tiếp tuyến của đồ thị tại một điểm.',
      'Vận dụng dấu đạo hàm để xét cực trị và tính lồi lõm.',
    ],
    theory: [
      { h: 'Đạo hàm cấp cao' },
      { p: 'Đạo hàm cấp hai f\'\'(x) là đạo hàm của f\'(x). Trong vật lý, gia tốc a(t) = v\'(t) = s\'\'(t).' },
      { h: 'Phương trình tiếp tuyến' },
      { p: 'Tiếp tuyến của y = f(x) tại điểm có hoành độ x₀: y = f\'(x₀)·(x − x₀) + f(x₀).' },
      { h: 'Cực trị qua đạo hàm cấp hai' },
      { ul: [
        'Nếu f\'(x₀) = 0 và f\'\'(x₀) > 0 thì x₀ là điểm cực tiểu.',
        'Nếu f\'(x₀) = 0 và f\'\'(x₀) < 0 thì x₀ là điểm cực đại.',
      ] },
      { h: 'Tính lồi lõm' },
      { p: 'Trên khoảng mà f\'\'(x) > 0 đồ thị lõm lên; f\'\'(x) < 0 đồ thị lõm xuống; đổi dấu f\'\' cho điểm uốn.' },
      { note: 'Để tìm cực trị: giải f\'(x) = 0, lập bảng dấu của f\'(x) rồi kết luận theo sự đổi dấu.' },
    ],
    examples: [
      { q: 'Viết phương trình tiếp tuyến của y = x^2 tại x₀ = 1.', a: 'f\'(x) = 2x ⇒ f\'(1) = 2; f(1) = 1. Tiếp tuyến: y = 2(x − 1) + 1 = 2x − 1.' },
      { q: 'Tìm cực trị của y = x^3 − 3x.', a: 'y\' = 3x^2 − 3 = 0 ⇒ x = ±1. y\'\' = 6x: tại x = 1 có y\'\' = 6 > 0 ⇒ cực tiểu; tại x = −1 có y\'\' = −6 < 0 ⇒ cực đại.' },
    ],
  },

  'H11TOAN-w16-quiz': {
    topic: 'Ôn tập đạo hàm và lượng giác',
    intro: 'Các em tổng hợp kỹ năng đạo hàm và giải phương trình lượng giác đã học trong học kỳ.',
    objectives: [
      'Tính thành thạo đạo hàm các hàm đa thức và lượng giác.',
      'Viết phương trình tiếp tuyến và tìm cực trị.',
      'Giải phương trình lượng giác trên khoảng cho trước.',
    ],
    theory: [
      { h: 'Ôn đạo hàm trọng tâm' },
      { ul: [
        '(x^n)\' = n·x^(n−1); (sin x)\' = cos x; (cos x)\' = −sin x.',
        'Quy tắc tích, thương và hàm hợp.',
        'Phương trình tiếp tuyến: y = f\'(x₀)(x − x₀) + f(x₀).',
      ] },
      { h: 'Ôn phương trình lượng giác' },
      { ul: [
        'sin x = sin α ⇔ x = α + k2π hoặc x = π − α + k2π.',
        'cos x = cos α ⇔ x = ±α + k2π.',
        'tan x = tan α ⇔ x = α + kπ.',
      ] },
      { h: 'Liên hệ công thức lượng giác' },
      { p: 'cos a cos b − sin a sin b = cos(a + b); 2sin a cos a = sin 2a; các công thức này giúp rút gọn nhanh.' },
      { note: 'Khi giải phương trình trên đoạn cho trước, viết nghiệm tổng quát rồi chọn k để nghiệm rơi vào đoạn đó.' },
    ],
    examples: [
      { q: 'Tính đạo hàm của y = x^2 + sin x và viết tiếp tuyến tại x = 0.', a: 'y\' = 2x + cos x; y\'(0) = 0 + 1 = 1; y(0) = 0. Tiếp tuyến: y = 1·(x − 0) + 0 = x.' },
      { q: 'Giải sin x = √2/2 trên [0; π].', a: 'sin x = sin(π/4) ⇒ x = π/4 hoặc x = π − π/4 = 3π/4. Cả hai đều thuộc [0; π].' },
    ],
  },

  'H11TOAN-w17-quiz': {
    topic: 'Ôn tập giữa kỳ I',
    intro: 'Các em hệ thống lại lượng giác, dãy số, cấp số và giới hạn để chuẩn bị kiểm tra giữa kỳ.',
    objectives: [
      'Ôn đổi đơn vị góc và giá trị lượng giác.',
      'Ôn cấp số cộng, cấp số nhân và tổng vô hạn.',
      'Ôn giới hạn dãy số và hàm số.',
    ],
    theory: [
      { h: 'Lượng giác' },
      { p: 'Đổi độ ↔ radian: α(rad) = α(độ)·π/180. Nhớ giá trị các góc đặc biệt và hệ thức sin^2 x + cos^2 x = 1.' },
      { h: 'Cấp số' },
      { ul: [
        'Cấp số cộng: uₙ = u₁ + (n−1)d; Sₙ = n(u₁ + uₙ)/2.',
        'Cấp số nhân: uₙ = u₁·q^(n−1); Sₙ = u₁(1 − q^n)/(1 − q).',
        'Tổng cấp số nhân lùi vô hạn (|q| < 1): S = u₁/(1 − q).',
      ] },
      { h: 'Giới hạn' },
      { p: 'Chia tử mẫu cho lũy thừa cao nhất; với phân thức cùng bậc, giới hạn bằng tỉ số hệ số bậc cao nhất.' },
      { h: 'Đạo hàm khởi đầu' },
      { p: 'Nhớ (x^n)\' = n·x^(n−1) và đạo hàm tổng để tính nhanh đạo hàm đa thức.' },
      { note: 'Lập bảng công thức gọn trước khi thi giúp tra nhanh và tránh nhầm dấu.' },
    ],
    examples: [
      { q: 'Cấp số cộng 5, 8, 11, ... Tìm số hạng thứ 10.', a: 'u₁ = 5, d = 3. u₁₀ = 5 + 9·3 = 32.' },
      { q: 'Tính lim(x→∞) (3x^2 + x)/(x^2 + 5).', a: 'Chia tử mẫu cho x^2: (3 + 1/x)/(1 + 5/x^2) → 3 khi x → ∞.' },
    ],
  },

  'H11TOAN-w18-quiz': {
    topic: 'Kiểm tra học kỳ I',
    intro: 'Các em vận dụng toàn bộ kiến thức học kỳ I: lượng giác, cấp số, giới hạn và đạo hàm cơ bản.',
    objectives: [
      'Giải phương trình lượng giác và đổi góc.',
      'Tính tổng cấp số và giới hạn.',
      'Tính đạo hàm và áp dụng vào tiếp tuyến.',
    ],
    theory: [
      { h: 'Phương trình lượng giác' },
      { p: 'Hạ bậc 2cos^2 x − 1 = cos 2x; với cos 2x = m đưa về cos 2x = cos α rồi 2x = ±α + k2π.' },
      { h: 'Tổng đặc biệt' },
      { p: 'Tổng các số lẻ 1 + 3 + 5 + ... + (2n − 1) = n^2; tổng cấp số nhân lùi vô hạn = u₁/(1 − q).' },
      { h: 'Giới hạn' },
      { p: 'lim(n→∞) (n + 1)/n = lim (1 + 1/n) = 1.' },
      { h: 'Đạo hàm và tiếp tuyến' },
      { ul: [
        '((x + a)^n)\' = n(x + a)^(n−1).',
        'f\'(x₀) cho hệ số góc tiếp tuyến tại x₀.',
      ] },
      { note: 'Đọc kỹ đề, ghi rõ điều kiện và k ∈ ℤ trong nghiệm phương trình lượng giác.' },
    ],
    examples: [
      { q: 'Giải cos 2x = 1/2.', a: 'cos 2x = cos(π/3) ⇒ 2x = ±π/3 + k2π ⇒ x = ±π/6 + kπ.' },
      { q: 'Cho f(x) = x^2 + 1, tính f\'(2).', a: 'f\'(x) = 2x ⇒ f\'(2) = 4.' },
    ],
  },

  'H11TOAN-w19-quiz': {
    topic: 'Đường thẳng và mặt phẳng trong không gian',
    intro: 'Các em bước vào hình học không gian: các tiên đề về điểm, đường thẳng, mặt phẳng và vị trí tương đối của chúng.',
    objectives: [
      'Nắm các tiên đề xác định mặt phẳng.',
      'Phân biệt vị trí tương đối của hai đường thẳng, đường thẳng và mặt phẳng.',
      'Xác định giao tuyến của hai mặt phẳng.',
    ],
    theory: [
      { h: 'Các cách xác định một mặt phẳng' },
      { ul: [
        'Qua ba điểm không thẳng hàng có duy nhất một mặt phẳng.',
        'Qua một đường thẳng và một điểm ngoài đường thẳng.',
        'Qua hai đường thẳng cắt nhau.',
      ] },
      { h: 'Vị trí của hai đường thẳng' },
      { ul: [
        'Cắt nhau: có một điểm chung và đồng phẳng.',
        'Song song: đồng phẳng, không điểm chung.',
        'Chéo nhau: không cùng nằm trên một mặt phẳng.',
      ] },
      { h: 'Đường thẳng nằm trong mặt phẳng' },
      { p: 'Nếu hai điểm phân biệt của đường thẳng cùng thuộc mặt phẳng thì cả đường thẳng nằm trong mặt phẳng đó.' },
      { h: 'Giao tuyến hai mặt phẳng' },
      { p: 'Hai mặt phẳng phân biệt hoặc song song hoặc cắt nhau; khi cắt nhau, giao là một đường thẳng (giao tuyến).' },
      { note: 'Để tìm giao tuyến hai mặt phẳng, tìm hai điểm chung của chúng rồi nối lại.' },
    ],
    examples: [
      { q: 'Hình chóp S.ABCD có bao nhiêu mặt?', a: 'Có 1 mặt đáy ABCD và 4 mặt bên SAB, SBC, SCD, SDA, tổng cộng 5 mặt.' },
      { q: 'Cho hai mặt phẳng (P) và (Q) phân biệt có chung hai điểm A, B. Giao tuyến là gì?', a: 'A và B cùng thuộc cả hai mặt phẳng nên giao tuyến chính là đường thẳng AB.' },
    ],
  },

  'H11TOAN-w20-quiz': {
    topic: 'Hai đường thẳng song song',
    intro: 'Các em học định nghĩa và tính chất của hai đường thẳng song song trong không gian, áp dụng vào hình lập phương.',
    objectives: [
      'Hiểu định nghĩa hai đường thẳng song song trong không gian.',
      'Vận dụng tính bắc cầu của quan hệ song song.',
      'Phân biệt song song và chéo nhau trong hình khối.',
    ],
    theory: [
      { h: 'Định nghĩa' },
      { p: 'Hai đường thẳng song song là hai đường thẳng cùng nằm trong một mặt phẳng và không có điểm chung.' },
      { h: 'Tính chất bắc cầu' },
      { p: 'Nếu a // b và b // c thì a // c (giả thiết a, b, c đôi một phân biệt).' },
      { h: 'Định lý về giao tuyến' },
      { p: 'Nếu ba mặt phẳng cắt nhau từng đôi theo ba giao tuyến phân biệt thì ba giao tuyến đó hoặc đồng quy hoặc đôi một song song.' },
      { h: 'Phân biệt với chéo nhau' },
      { p: 'Hai đường thẳng chéo nhau không cùng nằm trên một mặt phẳng nên không bao giờ song song; đừng nhầm "không cắt nhau" với "song song".' },
      { note: 'Trong hình lập phương, các cạnh đối diện của một mặt là song song, còn cạnh thuộc hai mặt khác nhau thường chéo nhau.' },
    ],
    examples: [
      { q: 'Trong hình lập phương ABCD.A\'B\'C\'D\', xét vị trí của AB và CD.', a: 'AB và CD cùng nằm trong mặt đáy ABCD và không cắt nhau, nên AB // CD.' },
      { q: 'Trong hình lập phương đó, xét vị trí của AB và A\'D\'.', a: 'AB thuộc mặt đáy, A\'D\' thuộc mặt trên; chúng không cùng một mặt phẳng và không cắt nhau, nên AB và A\'D\' chéo nhau.' },
    ],
  },

  'H11TOAN-w21-quiz': {
    topic: 'Đường thẳng song song với mặt phẳng',
    intro: 'Các em học điều kiện để một đường thẳng song song với một mặt phẳng và các định lý liên quan đến giao tuyến.',
    objectives: [
      'Hiểu định nghĩa đường thẳng song song với mặt phẳng.',
      'Vận dụng dấu hiệu nhận biết d // (P).',
      'Áp dụng định lý giao tuyến để tìm đường song song.',
    ],
    theory: [
      { h: 'Định nghĩa' },
      { p: 'Đường thẳng d song song với mặt phẳng (P) khi d và (P) không có điểm chung.' },
      { h: 'Dấu hiệu nhận biết' },
      { p: 'Nếu đường thẳng d không nằm trong (P) và d song song với một đường thẳng a nằm trong (P) thì d // (P).' },
      { h: 'Định lý giao tuyến' },
      { p: 'Nếu d // (P) và một mặt phẳng (Q) chứa d cắt (P) theo giao tuyến a thì d // a.' },
      { h: 'Vị trí tương đối' },
      { p: 'Đường thẳng và mặt phẳng có ba vị trí: d nằm trong (P), d cắt (P) tại một điểm, hoặc d song song (P).' },
      { note: 'Dấu hiệu "d song song với một đường thẳng trong (P)" là chìa khóa chứng minh song song với mặt phẳng.' },
    ],
    examples: [
      { q: 'Cho đường thẳng d nằm ngoài (P) và d // a với a ⊂ (P). Kết luận gì về d và (P)?', a: 'Theo dấu hiệu nhận biết, vì d không thuộc (P) và song song với đường thẳng a trong (P) nên d // (P).' },
      { q: 'Mặt phẳng (Q) chứa d song song với (P), (Q) cắt (P) theo giao tuyến a. Quan hệ giữa d và a?', a: 'Theo định lý giao tuyến, d // a.' },
    ],
  },

  'H11TOAN-w22-quiz': {
    topic: 'Hai mặt phẳng song song',
    intro: 'Các em học định nghĩa, tiêu chuẩn nhận biết hai mặt phẳng song song và ứng dụng vào lăng trụ, hình hộp.',
    objectives: [
      'Hiểu định nghĩa hai mặt phẳng song song.',
      'Áp dụng tiêu chuẩn nhận biết (P) // (Q).',
      'Vận dụng tính chất thiết diện song song với đáy.',
    ],
    theory: [
      { h: 'Định nghĩa' },
      { p: 'Hai mặt phẳng song song là hai mặt phẳng không có điểm chung.' },
      { h: 'Tiêu chuẩn nhận biết' },
      { p: 'Nếu mặt phẳng (P) chứa hai đường thẳng cắt nhau cùng song song với mặt phẳng (Q) thì (P) // (Q).' },
      { h: 'Tính chất giao tuyến' },
      { p: 'Nếu hai mặt phẳng song song bị cắt bởi một mặt phẳng thứ ba thì hai giao tuyến song song với nhau.' },
      { h: 'Khoảng cách và thiết diện' },
      { ul: [
        'Khoảng cách giữa hai mặt phẳng song song là không đổi.',
        'Thiết diện của lăng trụ khi cắt bởi mặt phẳng song song đáy thì bằng (đồng dạng và bằng) với đáy.',
      ] },
      { note: 'Trong lăng trụ, hai mặt đáy luôn song song; đó là đặc trưng định nghĩa của lăng trụ.' },
    ],
    examples: [
      { q: 'Mặt phẳng (P) chứa hai đường thẳng a, b cắt nhau và a // (Q), b // (Q). Kết luận?', a: 'Theo tiêu chuẩn nhận biết, (P) // (Q).' },
      { q: 'Hai mặt phẳng (P) // (Q) bị mặt phẳng (R) cắt theo giao tuyến a và b. Quan hệ a, b?', a: 'Theo tính chất giao tuyến, a // b.' },
    ],
  },

  'H11TOAN-w23-quiz': {
    topic: 'Vectơ trong không gian',
    intro: 'Các em mở rộng vectơ ra không gian ba chiều: phép cộng, tích vô hướng và khái niệm ba vectơ đồng phẳng.',
    objectives: [
      'Thực hiện phép cộng vectơ theo quy tắc ba điểm và hình hộp.',
      'Tính tích vô hướng và dùng để xét vuông góc.',
      'Hiểu khái niệm hai vectơ cùng phương, ba vectơ đồng phẳng.',
    ],
    theory: [
      { h: 'Phép cộng vectơ' },
      { ul: [
        'Quy tắc ba điểm: AB + BC = AC.',
        'Quy tắc hình hộp: với hình hộp, AB + AD + AA\' = AC\' (đường chéo).',
      ] },
      { h: 'Hai vectơ cùng phương' },
      { p: 'Hai vectơ cùng phương khi giá của chúng song song hoặc trùng nhau; tương đương a = k·b với k là số thực.' },
      { h: 'Tích vô hướng' },
      { ul: [
        'a · b = |a|·|b|·cos(a, b).',
        'a ⊥ b ⇔ a · b = 0.',
      ] },
      { h: 'Ba vectơ đồng phẳng' },
      { p: 'Ba vectơ đồng phẳng nếu có thể đặt chúng cùng nằm trong một mặt phẳng song song; tương đương một vectơ biểu diễn được qua hai vectơ kia.' },
      { note: 'Tích vô hướng = 0 là công cụ chuẩn để chứng minh hai đường thẳng vuông góc trong không gian.' },
    ],
    examples: [
      { q: 'Trong hình hộp ABCD.A\'B\'C\'D\', tính AB + AD + AA\'.', a: 'Theo quy tắc hình hộp, AB + AD + AA\' = AC\' (vectơ đường chéo của hình hộp).' },
      { q: 'Cho |a| = 2, |b| = 3, góc giữa a và b là 60°. Tính a · b.', a: 'a · b = |a|·|b|·cos 60° = 2·3·(1/2) = 3.' },
    ],
  },

  'H11TOAN-w24-quiz': {
    topic: 'Hai đường thẳng vuông góc',
    intro: 'Các em học khái niệm góc giữa hai đường thẳng trong không gian và điều kiện vuông góc.',
    objectives: [
      'Hiểu định nghĩa góc giữa hai đường thẳng (thuộc [0°; 90°]).',
      'Dùng vectơ chỉ phương để xác định góc và sự vuông góc.',
      'Vận dụng tính chất song song – vuông góc.',
    ],
    theory: [
      { h: 'Góc giữa hai đường thẳng' },
      { p: 'Góc giữa hai đường thẳng a, b là góc giữa hai đường thẳng cùng đi qua một điểm và lần lượt song song với a, b. Góc này luôn thuộc đoạn [0°; 90°].' },
      { h: 'Xác định bằng vectơ chỉ phương' },
      { p: 'Nếu u, v lần lượt là vectơ chỉ phương của a, b thì cos của góc giữa hai đường thẳng = |u·v|/(|u|·|v|).' },
      { h: 'Điều kiện vuông góc' },
      { p: 'a ⊥ b khi góc giữa chúng bằng 90°, tương đương u · v = 0.' },
      { h: 'Tính chất' },
      { p: 'Nếu a // b và b ⊥ c thì a ⊥ c. Hai đường thẳng vuông góc có thể cắt nhau hoặc chéo nhau.' },
      { note: 'Khác với hình phẳng, hai đường vuông góc trong không gian không nhất thiết cắt nhau — chúng có thể chéo nhau.' },
    ],
    examples: [
      { q: 'Trong hình lập phương ABCD.A\'B\'C\'D\', xét góc giữa AB và A\'D\'.', a: 'A\'D\' // AD; trong mặt đáy AB ⊥ AD. Do A\'D\' // AD nên góc giữa AB và A\'D\' bằng 90°, tức AB ⊥ A\'D\'.' },
      { q: 'Cho u = (1; 0; 0) và v = (0; 1; 0) là vectơ chỉ phương hai đường thẳng. Hai đường có vuông góc không?', a: 'u · v = 1·0 + 0·1 + 0·0 = 0 nên hai đường thẳng vuông góc.' },
    ],
  },

  'H11TOAN-w25-quiz': {
    topic: 'Đường thẳng vuông góc với mặt phẳng',
    intro: 'Các em học tiêu chuẩn đường thẳng vuông góc mặt phẳng, định lý ba đường vuông góc và khoảng cách từ điểm đến mặt phẳng.',
    objectives: [
      'Nắm tiêu chuẩn d ⊥ (P).',
      'Hiểu định lý ba đường vuông góc.',
      'Xác định khoảng cách từ điểm đến mặt phẳng.',
    ],
    theory: [
      { h: 'Tiêu chuẩn vuông góc' },
      { p: 'Đường thẳng d vuông góc với mặt phẳng (P) khi d vuông góc với hai đường thẳng cắt nhau nằm trong (P). Khi đó d vuông góc với mọi đường thẳng trong (P).' },
      { h: 'Tính chất' },
      { ul: [
        'Hai đường thẳng cùng vuông góc với một mặt phẳng thì song song với nhau.',
        'Qua một điểm có duy nhất một mặt phẳng vuông góc với một đường thẳng cho trước.',
      ] },
      { h: 'Định lý ba đường vuông góc' },
      { p: 'Cho d nằm trong (P) và a là đường xiên có hình chiếu a\' trên (P). Khi đó d ⊥ a khi và chỉ khi d ⊥ a\'.' },
      { h: 'Khoảng cách từ điểm đến mặt phẳng' },
      { p: 'Là độ dài đoạn vuông góc hạ từ điểm xuống mặt phẳng (đoạn ngắn nhất).' },
      { note: 'Trong hình chóp có cạnh bên vuông góc đáy (như SA ⊥ (ABC)), cạnh đó vuông góc với mọi đường nằm trong đáy.' },
    ],
    examples: [
      { q: 'Hình chóp S.ABC có SA ⊥ (ABC). Chứng minh SA ⊥ BC.', a: 'Vì SA ⊥ (ABC) nên SA vuông góc với mọi đường thẳng nằm trong (ABC). BC nằm trong (ABC) ⇒ SA ⊥ BC.' },
      { q: 'Cho d vuông góc với hai đường thẳng a, b cắt nhau trong (P). Kết luận?', a: 'Theo tiêu chuẩn, d ⊥ (P), do đó d vuông góc với mọi đường thẳng nằm trong (P).' },
    ],
  },

  'H11TOAN-w26-quiz': {
    topic: 'Hai mặt phẳng vuông góc',
    intro: 'Các em học góc nhị diện, định nghĩa hai mặt phẳng vuông góc và tiêu chuẩn nhận biết.',
    objectives: [
      'Hiểu khái niệm góc nhị diện và góc giữa hai mặt phẳng.',
      'Nắm tiêu chuẩn hai mặt phẳng vuông góc.',
      'Vận dụng hệ quả về đường thẳng vuông góc giao tuyến.',
    ],
    theory: [
      { h: 'Góc nhị diện' },
      { p: 'Góc nhị diện được tạo bởi hai nửa mặt phẳng có chung cạnh. Số đo góc nhị diện được đo bằng góc phẳng tương ứng (hai tia cùng vuông góc với cạnh, mỗi tia thuộc một nửa mặt phẳng).' },
      { h: 'Góc giữa hai mặt phẳng' },
      { p: 'Là góc giữa hai đường thẳng lần lượt vuông góc với hai mặt phẳng đó (hoặc dùng góc phẳng của nhị diện theo giao tuyến).' },
      { h: 'Định nghĩa và tiêu chuẩn vuông góc' },
      { ul: [
        '(P) ⊥ (Q) khi góc giữa chúng bằng 90°.',
        'Tiêu chuẩn: nếu (P) chứa một đường thẳng vuông góc với (Q) thì (P) ⊥ (Q).',
      ] },
      { h: 'Hệ quả' },
      { p: 'Nếu (P) ⊥ (Q) thì đường thẳng nằm trong (P) và vuông góc với giao tuyến sẽ vuông góc với (Q).' },
      { note: 'Hình lập phương có 12 cặp mặt vuông góc: mỗi mặt vuông góc với 4 mặt kề nó.' },
    ],
    examples: [
      { q: 'Cho mặt phẳng (P) chứa đường thẳng d với d ⊥ (Q). Kết luận về (P) và (Q)?', a: 'Theo tiêu chuẩn, vì (P) chứa đường thẳng d vuông góc với (Q) nên (P) ⊥ (Q).' },
      { q: 'Hình chóp S.ABCD có SA ⊥ (ABCD). Chứng minh (SAB) ⊥ (ABCD).', a: 'SA nằm trong (SAB) và SA ⊥ (ABCD); theo tiêu chuẩn, (SAB) ⊥ (ABCD).' },
    ],
  },

  'H11TOAN-w27-quiz': {
    topic: 'Khoảng cách trong không gian',
    intro: 'Các em học cách xác định và tính các loại khoảng cách: điểm đến đường, điểm đến mặt, giữa hai đường chéo nhau.',
    objectives: [
      'Tính khoảng cách từ điểm đến đường thẳng, đến mặt phẳng.',
      'Tính khoảng cách giữa hai mặt phẳng song song.',
      'Hiểu khoảng cách giữa hai đường thẳng chéo nhau.',
    ],
    theory: [
      { h: 'Khoảng cách điểm đến đường thẳng' },
      { p: 'Là độ dài đoạn vuông góc hạ từ điểm xuống đường thẳng.' },
      { h: 'Khoảng cách điểm đến mặt phẳng' },
      { p: 'Là độ dài đoạn vuông góc hạ từ điểm xuống mặt phẳng.' },
      { h: 'Khoảng cách giữa hai mặt phẳng song song' },
      { p: 'Là khoảng cách từ một điểm bất kỳ của mặt này đến mặt kia (đoạn vuông góc chung).' },
      { h: 'Khoảng cách hai đường thẳng chéo nhau' },
      { p: 'Là độ dài đoạn vuông góc chung của hai đường thẳng đó (đoạn vuông góc với cả hai).' },
      { note: 'Trong hình lập phương cạnh a, đường chéo hình hộp (nối hai đỉnh đối) dài a√3, đường chéo mặt dài a√2.' },
    ],
    examples: [
      { q: 'Hình chóp S.ABCD có đáy là hình vuông cạnh a, SA ⊥ đáy, SA = a. Tính khoảng cách giữa SA và BC.', a: 'BC ⊥ AB (cạnh hình vuông) và BC ⊥ SA (vì SA ⊥ đáy), nên BC ⊥ (SAB). Do đó khoảng cách giữa SA và BC bằng AB = a.' },
      { q: 'Tính độ dài đường chéo của hình lập phương cạnh a (khoảng cách hai đỉnh đối diện).', a: 'Đường chéo = √(a^2 + a^2 + a^2) = √(3a^2) = a√3.' },
    ],
  },

  'H11TOAN-w28-quiz': {
    topic: 'Góc trong không gian',
    intro: 'Các em học cách xác định góc giữa đường thẳng và mặt phẳng, góc giữa hai mặt phẳng qua hình chiếu và giao tuyến.',
    objectives: [
      'Xác định góc giữa đường thẳng và mặt phẳng.',
      'Xác định góc giữa hai mặt phẳng qua giao tuyến.',
      'Vận dụng hình chiếu vuông góc để tính góc.',
    ],
    theory: [
      { h: 'Góc giữa đường thẳng và mặt phẳng' },
      { p: 'Góc giữa đường thẳng d và mặt phẳng (P) là góc giữa d và hình chiếu vuông góc d\' của d trên (P). Nếu d ⊂ (P) thì góc bằng 0°; nếu d ⊥ (P) thì góc bằng 90°.' },
      { h: 'Cách tìm hình chiếu' },
      { p: 'Hạ đường vuông góc từ một điểm của d xuống (P), chân vuông góc cùng giao điểm của d với (P) xác định hình chiếu d\'.' },
      { h: 'Góc giữa hai mặt phẳng' },
      { p: 'Hai mặt phẳng (P), (Q) cắt nhau theo giao tuyến a. Lấy m ⊂ (P), n ⊂ (Q) cùng vuông góc với a tại một điểm; góc giữa m và n là góc giữa hai mặt phẳng.' },
      { h: 'Trong hình chóp đều' },
      { p: 'Với hình chóp đều, đỉnh chiếu xuống tâm đáy; góc giữa cạnh bên và đáy là góc tại đỉnh chân hình chiếu.' },
      { note: 'Khi tính góc giữa đường và mặt, luôn xác định đúng hình chiếu rồi mới đo góc giữa đường và hình chiếu.' },
    ],
    examples: [
      { q: 'Hình chóp đều S.ABCD tâm đáy O. Mô tả góc giữa cạnh SA và mặt đáy.', a: 'SO ⊥ (ABCD) nên hình chiếu của SA trên đáy là OA. Góc giữa SA và đáy là góc SAO.' },
      { q: 'Hai mặt phẳng cắt nhau theo a; lấy m ⊂ (P), n ⊂ (Q) cùng vuông a tại một điểm. Góc (P;Q) là gì?', a: 'Góc giữa hai mặt phẳng (P) và (Q) chính là góc giữa hai đường thẳng m và n.' },
    ],
  },

  'H11TOAN-w29-quiz': {
    topic: 'Biến cố và xác suất cổ điển',
    intro: 'Các em học không gian mẫu, biến cố và định nghĩa xác suất cổ điển dựa trên số trường hợp thuận lợi.',
    objectives: [
      'Hiểu khái niệm không gian mẫu và biến cố.',
      'Tính xác suất theo định nghĩa cổ điển.',
      'Nắm tính chất 0 ≤ P(A) ≤ 1.',
    ],
    theory: [
      { h: 'Không gian mẫu và biến cố' },
      { p: 'Không gian mẫu Ω là tập tất cả kết quả có thể của phép thử. Biến cố A là một tập con của Ω.' },
      { h: 'Định nghĩa xác suất cổ điển' },
      { p: 'Khi các kết quả đồng khả năng và Ω hữu hạn: P(A) = n(A)/n(Ω), với n(A) là số kết quả thuận lợi cho A.' },
      { h: 'Tính chất xác suất' },
      { ul: [
        '0 ≤ P(A) ≤ 1 với mọi biến cố A.',
        'P(∅) = 0 (biến cố không thể).',
        'P(Ω) = 1 (biến cố chắc chắn).',
      ] },
      { h: 'Biến cố đối' },
      { p: 'Biến cố đối A\' (không xảy ra A) có P(A\') = 1 − P(A).' },
      { note: 'Đếm chính xác n(A) và n(Ω) là bước then chốt; với bài toán đếm dùng quy tắc cộng, nhân, tổ hợp.' },
    ],
    examples: [
      { q: 'Gieo một con xúc xắc cân đối. Tính xác suất xuất hiện số chẵn.', a: 'Ω = {1,2,3,4,5,6}, n(Ω) = 6. Số chẵn A = {2,4,6}, n(A) = 3. P(A) = 3/6 = 1/2.' },
      { q: 'Gieo hai đồng xu cân đối. Tính xác suất hai mặt giống nhau.', a: 'Ω = {SS, SN, NS, NN}, n(Ω) = 4. A = {SS, NN}, n(A) = 2. P(A) = 2/4 = 1/2.' },
    ],
  },

  'H11TOAN-w30-quiz': {
    topic: 'Biến cố độc lập và quy tắc nhân',
    intro: 'Các em học khái niệm biến cố độc lập và quy tắc nhân xác suất cho các biến cố độc lập.',
    objectives: [
      'Hiểu định nghĩa hai biến cố độc lập.',
      'Áp dụng quy tắc nhân P(A ∩ B) = P(A)·P(B).',
      'Phân biệt biến cố độc lập với biến cố xung khắc.',
    ],
    theory: [
      { h: 'Biến cố độc lập' },
      { p: 'Hai biến cố A và B độc lập khi việc A xảy ra hay không không ảnh hưởng tới xác suất của B, biểu thị bằng P(A ∩ B) = P(A)·P(B).' },
      { h: 'Quy tắc nhân' },
      { p: 'Với hai biến cố độc lập: xác suất cả hai cùng xảy ra bằng tích hai xác suất.' },
      { h: 'Tính chất' },
      { p: 'Nếu A và B độc lập thì A\' và B, A và B\', A\' và B\' cũng độc lập.' },
      { h: 'Phân biệt độc lập và xung khắc' },
      { p: 'Xung khắc là A ∩ B = ∅ (không cùng xảy ra). Hai biến cố có xác suất dương vừa độc lập vừa xung khắc là điều không thể, trừ khi một trong chúng có xác suất bằng 0.' },
      { note: 'Phép thử có hoàn lại thường tạo ra các biến cố độc lập giữa các lần; phép thử không hoàn lại thì không độc lập.' },
    ],
    examples: [
      { q: 'Gieo hai đồng xu cân đối độc lập. Tính xác suất cả hai đều ngửa.', a: 'P(ngửa lần 1) = 1/2, P(ngửa lần 2) = 1/2, độc lập ⇒ P = (1/2)·(1/2) = 1/4.' },
      { q: 'Cho P(A) = 0,3; P(B) = 0,5; A, B độc lập. Tính P(A ∩ B).', a: 'P(A ∩ B) = P(A)·P(B) = 0,3·0,5 = 0,15.' },
    ],
  },

  'H11TOAN-w31-quiz': {
    topic: 'Xác suất có điều kiện',
    intro: 'Các em học xác suất có điều kiện, công thức nhân tổng quát và công thức Bayes.',
    objectives: [
      'Hiểu và tính xác suất có điều kiện P(A|B).',
      'Áp dụng công thức nhân tổng quát.',
      'Làm quen công thức Bayes.',
    ],
    theory: [
      { h: 'Xác suất có điều kiện' },
      { p: 'Xác suất của A khi biết B đã xảy ra: P(A|B) = P(A ∩ B)/P(B), với P(B) > 0.' },
      { h: 'Công thức nhân tổng quát' },
      { p: 'P(A ∩ B) = P(B)·P(A|B) = P(A)·P(B|A).' },
      { h: 'Liên hệ độc lập' },
      { p: 'Nếu A, B độc lập thì P(A|B) = P(A), tức biết B không làm thay đổi xác suất của A.' },
      { h: 'Công thức Bayes' },
      { p: 'P(A|B) = P(B|A)·P(A)/P(B). Bayes giúp đảo điều kiện giữa hai biến cố.' },
      { note: 'Trong bài toán lấy không hoàn lại, xác suất lần sau phụ thuộc kết quả lần trước — đó là tình huống điển hình của xác suất có điều kiện.' },
    ],
    examples: [
      { q: 'Hộp có 3 viên đỏ, 2 viên xanh. Lấy không hoàn lại 2 viên. Tính P(viên 2 đỏ | viên 1 đỏ).', a: 'Sau khi lấy 1 đỏ, còn 2 đỏ trong tổng 4 viên. P(viên 2 đỏ | viên 1 đỏ) = 2/4 = 1/2.' },
      { q: 'Cho P(A) = 0,6; P(B|A) = 0,5. Tính P(A ∩ B).', a: 'P(A ∩ B) = P(A)·P(B|A) = 0,6·0,5 = 0,3.' },
    ],
  },

  'H11TOAN-w32-quiz': {
    topic: 'Ôn tập xác suất nâng cao',
    intro: 'Các em tổng hợp các quy tắc cộng, nhân và bài toán đếm để tính xác suất các tình huống phức tạp hơn.',
    objectives: [
      'Áp dụng quy tắc cộng cho biến cố xung khắc và tổng quát.',
      'Kết hợp tổ hợp với xác suất.',
      'Giải bài toán nhiều biến cố độc lập.',
    ],
    theory: [
      { h: 'Quy tắc cộng' },
      { ul: [
        'Hai biến cố xung khắc: P(A ∪ B) = P(A) + P(B).',
        'Tổng quát: P(A ∪ B) = P(A) + P(B) − P(A ∩ B).',
      ] },
      { h: 'Kết hợp tổ hợp' },
      { p: 'Khi chọn k phần tử trong n, số cách là C(n, k) = n!/[k!(n−k)!]. Xác suất tính bằng tỉ số số tổ hợp thuận lợi trên tổng số tổ hợp.' },
      { h: 'Nhiều biến cố độc lập' },
      { p: 'Với n lần thử độc lập, xác suất tất cả cùng xảy ra bằng tích các xác suất; ví dụ xác suất trúng cả n lần là p^n.' },
      { h: 'Biến cố đối' },
      { p: 'Dùng P(A) = 1 − P(A\') khi tính trực tiếp khó (ví dụ "ít nhất một lần").' },
      { note: 'Với bài "ít nhất một", tính phần bù "không lần nào" rồi lấy 1 trừ đi cho gọn.' },
    ],
    examples: [
      { q: 'Lấy ngẫu nhiên 2 viên từ hộp 3 đỏ, 4 xanh. Tính xác suất 2 viên cùng màu.', a: 'Tổng cách chọn: C(7,2) = 21. Cùng đỏ: C(3,2) = 3; cùng xanh: C(4,2) = 6. Thuận lợi = 9. P = 9/21 = 3/7.' },
      { q: 'Xạ thủ bắn 3 lần độc lập, xác suất trúng mỗi lần 0,8. Tính xác suất cả 3 lần trúng.', a: 'P = 0,8^3 = 0,512.' },
    ],
  },

  'H11TOAN-w33-quiz': {
    topic: 'Ôn tập đạo hàm và hàm mũ – lôgarit',
    intro: 'Các em tổng hợp đạo hàm đa thức, lượng giác và làm quen đạo hàm hàm mũ, lôgarit trong chương trình mới.',
    objectives: [
      'Tính thành thạo đạo hàm đa thức và lượng giác.',
      'Nhớ đạo hàm hàm mũ và lôgarit.',
      'Viết phương trình tiếp tuyến và áp dụng ý nghĩa vật lý.',
    ],
    theory: [
      { h: 'Đạo hàm cơ bản tổng hợp' },
      { ul: [
        '(x^n)\' = n·x^(n−1); (sin x)\' = cos x; (cos x)\' = −sin x.',
        '(e^x)\' = e^x; (ln x)\' = 1/x (x > 0).',
        '(a^x)\' = a^x·ln a; (log_a x)\' = 1/(x·ln a).',
      ] },
      { h: 'Đạo hàm hàm hợp với mũ – lôgarit' },
      { p: 'Ví dụ (e^u)\' = u\'·e^u; (ln u)\' = u\'/u.' },
      { h: 'Phương trình tiếp tuyến' },
      { p: 'y = f\'(x₀)(x − x₀) + f(x₀); hệ số góc là f\'(x₀).' },
      { h: 'Ý nghĩa vật lý' },
      { p: 'Vận tốc tức thời v(t) = s\'(t); gia tốc a(t) = v\'(t) = s\'\'(t).' },
      { note: 'Đạo hàm e^x giữ nguyên là e^x — đặc trưng riêng giúp giải nhiều bài giải tích.' },
    ],
    examples: [
      { q: 'Tính đạo hàm của y = x^4 − 2x^2.', a: 'y\' = 4x^3 − 4x.' },
      { q: 'Viết phương trình tiếp tuyến của y = x^2 tại x = 2.', a: 'f\'(x) = 2x ⇒ f\'(2) = 4; f(2) = 4. Tiếp tuyến: y = 4(x − 2) + 4 = 4x − 4.' },
    ],
  },

  'H11TOAN-w34-quiz': {
    topic: 'Ôn tập tổng hợp học kỳ II',
    intro: 'Các em hệ thống hình học không gian, giới hạn, đạo hàm và xác suất chuẩn bị cho kiểm tra học kỳ.',
    objectives: [
      'Ôn quan hệ song song – vuông góc và khoảng cách.',
      'Ôn giới hạn, tổng cấp số và đạo hàm.',
      'Ôn các công thức xác suất cơ bản.',
    ],
    theory: [
      { h: 'Hình học không gian' },
      { ul: [
        'Nếu d ⊥ (P) và (P) // (Q) thì d ⊥ (Q).',
        'Khoảng cách giữa hai mặt phẳng song song là không đổi.',
      ] },
      { h: 'Giới hạn và cấp số' },
      { ul: [
        'Phân tích nhân tử để khử dạng 0/0.',
        'Tổng cấp số cộng Sₙ = n(u₁ + uₙ)/2.',
      ] },
      { h: 'Đạo hàm' },
      { p: 'Dùng quy tắc hàm hợp cho các biểu thức (ax + b)^n; nhớ đạo hàm lượng giác cơ bản.' },
      { h: 'Xác suất' },
      { p: 'Biến cố đối P(A\') = 1 − P(A); quy tắc cộng và nhân kết hợp với đếm.' },
      { note: 'Lập sơ đồ tư duy nối các chủ đề giúp nhớ và vận dụng tổng hợp nhanh hơn khi thi.' },
    ],
    examples: [
      { q: 'Tính tổng cấp số cộng 1 + 4 + 7 + ... có 20 số hạng.', a: 'u₁ = 1, d = 3, u₂₀ = 1 + 19·3 = 58. S = 20·(1 + 58)/2 = 590.' },
      { q: 'Tính lim(x→1) (x^3 − 1)/(x − 1).', a: 'x^3 − 1 = (x − 1)(x^2 + x + 1). Rút gọn còn x^2 + x + 1; thay x = 1 ⇒ 3.' },
    ],
  },

  'H11TOAN-w35-quiz': {
    topic: 'Kiểm tra học kỳ II',
    intro: 'Các em vận dụng tổng hợp toàn bộ chương trình học kỳ II vào các bài toán đại diện.',
    objectives: [
      'Giải phương trình lượng giác và tính tổng vô hạn.',
      'Tính giới hạn và đạo hàm hàm hợp.',
      'Vận dụng hình học không gian và xác suất.',
    ],
    theory: [
      { h: 'Phương trình lượng giác đưa về tích' },
      { p: 'Ví dụ sin 2x = sin x ⇔ sin 2x − sin x = 0 ⇔ sin x(2cos x − 1) = 0, rồi giải từng nhân tử.' },
      { h: 'Giới hạn phân thức tại vô cực' },
      { p: 'Với hai đa thức cùng bậc, giới hạn bằng tỉ số hệ số bậc cao nhất.' },
      { h: 'Đạo hàm hàm hợp' },
      { p: '((ax + b)^n)\' = n(ax + b)^(n−1)·a.' },
      { h: 'Hình học và xác suất' },
      { ul: [
        'Định lý Pythagoras đảo: AB^2 + AC^2 = BC^2 ⇒ tam giác vuông tại A.',
        'A, B độc lập: P(A ∪ B) = P(A) + P(B) − P(A)·P(B).',
      ] },
      { note: 'Trình bày rõ ràng từng bước và kiểm tra điều kiện nghiệm để không mất điểm.' },
    ],
    examples: [
      { q: 'Tính tổng vô hạn 1 + 1/3 + 1/9 + ...', a: 'Cấp số nhân lùi vô hạn u₁ = 1, q = 1/3. S = 1/(1 − 1/3) = 1/(2/3) = 3/2.' },
      { q: 'Cho P(A) = 0,4; P(B) = 0,3; A, B độc lập. Tính P(A ∪ B).', a: 'P(A ∩ B) = 0,4·0,3 = 0,12. P(A ∪ B) = 0,4 + 0,3 − 0,12 = 0,58.' },
    ],
  },

  'H11TOAN-w36-quiz': {
    topic: 'Kết thúc Toán 11 — Hành trang vào lớp 12',
    intro: 'Năm học lớp 11 khép lại với rất nhiều kiến thức nền tảng quan trọng. Hôm nay chúng ta nhìn lại toàn bộ hành trình, củng cố những điểm then chốt và chuẩn bị tâm thế tự tin bước vào lớp 12.',
    objectives: [
      'Hệ thống hoá toàn bộ chương trình Toán 11 theo các mảng kiến thức.',
      'Nhận biết những chủ đề sẽ được mở rộng và nâng cao ở lớp 12.',
      'Xây dựng kế hoạch tự học hiệu quả trong kì nghỉ hè.',
    ],
    theory: [
      { h: 'Bức tranh toàn cảnh Toán 11' },
      { ul: [
        'Đại số & Giải tích: hàm lượng giác, phương trình lượng giác, dãy số, giới hạn, đạo hàm cơ bản.',
        'Hình học không gian: đường thẳng, mặt phẳng, quan hệ song song – vuông góc, khoảng cách.',
        'Thống kê & Xác suất: xác suất biến cố, quy tắc cộng – nhân, biến ngẫu nhiên rời rạc.',
      ] },
      { h: 'Những viên đá nền cho lớp 12' },
      { ul: [
        'Đạo hàm (lớp 11) → Nguyên hàm, tích phân (lớp 12): nắm vững quy tắc đạo hàm giúp tiếp thu tích phân nhanh hơn.',
        'Giới hạn → Hàm liên tục và ứng dụng đạo hàm vào khảo sát hàm số (đường cong y = f(x)).',
        'Xác suất → Phân phối xác suất, khoảng tin cậy trong thống kê suy diễn.',
        'Hình học không gian → Thể tích khối đa diện và khối tròn xoay bằng tích phân.',
      ] },
      { h: 'Lộ trình ôn hè thông minh' },
      { ul: [
        'Tuần 1–2: Ôn lại đạo hàm và giới hạn — đây là "cầu nối" quan trọng nhất sang lớp 12.',
        'Tuần 3–4: Luyện hình học không gian — bài tập khoảng cách và góc là điểm hay ra thi.',
        'Tuần 5–6: Làm lại đề cương xác suất và thống kê — dễ mất điểm vì hay bỏ quên.',
      ] },
      { note: 'Lớp 12 không khó hơn lớp 11 về bản chất — chỉ nâng thêm một tầng ứng dụng. Nền móng vững từ bây giờ là lợi thế lớn nhất cho kỳ thi tốt nghiệp THPT Quốc gia.' },
    ],
    examples: [
      { q: 'Tại sao việc thành thạo đạo hàm ở lớp 11 lại quan trọng cho lớp 12?', a: 'Lớp 12 sẽ học nguyên hàm và tích phân — phép toán "ngược" của đạo hàm. Ngoài ra, khảo sát hàm số (tìm cực trị, tiệm cận, vẽ đồ thị) đòi hỏi tính đạo hàm thành thạo. Học sinh nắm vững đạo hàm lớp 11 tiết kiệm rất nhiều thời gian ôn tập lớp 12 và ít bị sai lầm cơ bản.' },
      { q: 'Em nên ôn tập theo thứ tự nào để chuẩn bị tốt nhất cho Toán lớp 12?', a: 'Thứ tự hiệu quả: (1) Đạo hàm và ứng dụng → (2) Phương trình lượng giác → (3) Hình học không gian → (4) Xác suất. Lý do: đạo hàm xuất hiện trong hầu hết các dạng bài lớp 12; hình học không gian tốn thời gian nhất nên cần ôn sớm; xác suất có công thức tương đối gọn, để cuối cũng vừa đủ.' },
    ],
  },
};
