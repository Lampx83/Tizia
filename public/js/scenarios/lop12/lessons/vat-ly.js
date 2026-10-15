// ============================================================
// Lớp 12 · VẬT LÝ — Lý thuyết tuần (35 tuần · HK1: 1–18 · HK2: 19–35)
// Bám CTGD 2018 + ôn thi tốt nghiệp THPT: Dao động – Sóng – Điện xoay chiều
// – Dao động/sóng điện từ – Sóng ánh sáng – Lượng tử – Hạt nhân nguyên tử.
// Key trùng id quiz: "H12LY-wNN-quiz". Dạy lý thuyết, KHÔNG copy quiz.
// ============================================================

export const H12LY_LESSONS = {
  'H12LY-w01-quiz': {
    topic: 'Dao động điều hoà — phương trình và các đại lượng',
    intro: 'Chào các em đến với Vật lí 12. Mở đầu chương trình ôn thi tốt nghiệp là dao động điều hoà — kiểu chuyển động lặp đi lặp lại quanh một vị trí cân bằng. Hiểu thật chắc tuần này, các em sẽ thấy con lắc lò xo, con lắc đơn, mạch LC sau này đều quy về cùng một bộ công thức.',
    objectives: [
      'Viết được phương trình dao động điều hoà và nêu ý nghĩa từng đại lượng.',
      'Phân biệt biên độ, li độ, pha, tần số góc, chu kì, tần số.',
      'Tính được vận tốc, gia tốc cực đại từ A và ω.',
    ],
    theory: [
      { h: 'Dao động điều hoà là gì?' },
      { p: 'Dao động điều hoà là dao động trong đó li độ x của vật là một hàm cosin (hoặc sin) của thời gian: x = A·cos(ωt + φ). Vật chuyển động qua lại quanh vị trí cân bằng x = 0.' },
      { h: 'Các đại lượng đặc trưng' },
      { ul: [
        'A — biên độ: li độ cực đại, luôn dương, đơn vị mét (m).',
        'ω — tần số góc (rad/s); φ — pha ban đầu (rad); (ωt + φ) — pha dao động.',
        'Chu kì T = 2π/ω (s) là thời gian thực hiện một dao động toàn phần.',
        'Tần số f = 1/T = ω/(2π), đơn vị héc (Hz).',
      ]},
      { h: 'Vận tốc và gia tốc' },
      { p: 'Đạo hàm li độ theo thời gian: v = x\' = -Aω·sin(ωt + φ), nên tốc độ cực đại vmax = ωA tại vị trí cân bằng. Đạo hàm lần nữa: a = v\' = -Aω²·cos(ωt + φ) = -ω²x, nên gia tốc cực đại amax = ω²A tại hai biên.' },
      { p: 'Gia tốc luôn hướng về vị trí cân bằng (vì a = -ω²x). Tại biên: v = 0, |a| cực đại; tại cân bằng: |v| cực đại, a = 0.' },
      { h: 'Hệ thức độc lập với thời gian' },
      { p: 'Khử t giữa x và v ta được: A² = x² + v²/ω². Hệ thức này cho phép tính A khi biết một cặp (x, v) bất kì mà không cần biết thời điểm.' },
      { note: 'Đừng nhầm tần số góc ω (rad/s) với tần số f (Hz). Trong mọi bài, hãy đổi tất cả về đơn vị SI trước khi thay số.' },
    ],
    examples: [
      { q: 'Một vật dao động điều hoà với x = 4·cos(5πt) cm. Tìm A, ω, T, f.', a: 'So với x = A·cos(ωt + φ): A = 4 cm; ω = 5π rad/s. T = 2π/ω = 2π/(5π) = 0,4 s. f = 1/T = 1/0,4 = 2,5 Hz.' },
      { q: 'Vật dao động điều hoà có A = 5 cm, ω = 10 rad/s. Tính vmax và amax.', a: 'vmax = ωA = 10 × 5 = 50 cm/s = 0,5 m/s. amax = ω²A = 10² × 5 = 500 cm/s² = 5 m/s².' },
      { q: 'Vật dao động với ω = 4 rad/s. Khi x = 3 cm thì v = 16 cm/s. Tìm biên độ A.', a: 'A² = x² + v²/ω² = 3² + 16²/4² = 9 + 256/16 = 9 + 16 = 25 → A = 5 cm.' },
    ],
  },

  'H12LY-w02-quiz': {
    topic: 'Con lắc lò xo',
    intro: 'Tuần này các em gặp mô hình dao động điều hoà đầu tiên: con lắc lò xo. Chỉ cần một lò xo và một vật nặng, ta đã có thể kiểm chứng toàn bộ lí thuyết tuần trước, đồng thời học cách tính chu kì và năng lượng dao động.',
    objectives: [
      'Viết và áp dụng công thức chu kì, tần số góc của con lắc lò xo.',
      'Tính cơ năng, động năng, thế năng của con lắc lò xo.',
      'Xử lí con lắc lò xo treo thẳng đứng qua độ dãn Δl₀.',
    ],
    theory: [
      { h: 'Cấu tạo và lực kéo về' },
      { p: 'Con lắc lò xo gồm vật khối lượng m gắn vào lò xo độ cứng k. Khi lệch khỏi cân bằng một đoạn x, lò xo tạo lực kéo về F = -kx. Theo định luật II Newton: ma = -kx → a = -(k/m)x, đúng dạng dao động điều hoà với ω² = k/m.' },
      { h: 'Chu kì và tần số' },
      { ul: [
        'Tần số góc: ω = √(k/m).',
        'Chu kì: T = 2π·√(m/k) — KHÔNG phụ thuộc biên độ.',
        'Tần số: f = (1/2π)·√(k/m).',
      ]},
      { h: 'Năng lượng dao động' },
      { p: 'Cơ năng W = (1/2)kA² = (1/2)mω²A² là hằng số. Thế năng Wt = (1/2)kx², động năng Wđ = (1/2)mv². Ở vị trí cân bằng (x = 0): Wt = 0, Wđ = W (cực đại). Ở biên (x = ±A): Wđ = 0, Wt = W.' },
      { h: 'Con lắc lò xo treo thẳng đứng' },
      { p: 'Tại vị trí cân bằng lò xo dãn một đoạn Δl₀ thoả mg = kΔl₀, suy ra m/k = Δl₀/g. Do đó T = 2π·√(Δl₀/g): chỉ cần đo độ dãn là tính được chu kì mà không cần biết m, k riêng lẻ.' },
      { note: 'Con lắc lò xo nằm ngang và thẳng đứng có cùng công thức chu kì; trọng lực chỉ làm dịch vị trí cân bằng chứ không đổi ω.' },
    ],
    examples: [
      { q: 'Con lắc lò xo có k = 100 N/m, m = 0,25 kg. Tính chu kì T.', a: 'T = 2π·√(m/k) = 2π·√(0,25/100) = 2π·√(0,0025) = 2π·0,05 = 0,1π ≈ 0,314 s.' },
      { q: 'Con lắc lò xo k = 80 N/m dao động biên độ A = 5 cm. Tính cơ năng.', a: 'W = (1/2)kA² = (1/2)·80·(0,05)² = 40·0,0025 = 0,1 J.' },
      { q: 'Treo vật vào lò xo thẳng đứng, lò xo dãn 4 cm khi cân bằng. Lấy g = 10 m/s². Tính chu kì.', a: 'T = 2π·√(Δl₀/g) = 2π·√(0,04/10) = 2π·√(0,004) = 2π·0,0632 ≈ 0,397 s.' },
    ],
  },

  'H12LY-w03-quiz': {
    topic: 'Con lắc đơn',
    intro: 'Con lắc đơn — một vật nhỏ treo trên sợi dây — là chiếc đồng hồ tự nhiên đầu tiên của loài người. Tuần này các em học vì sao chu kì của nó chỉ phụ thuộc chiều dài dây và gia tốc trọng trường, và dùng nó để đo g.',
    objectives: [
      'Viết công thức chu kì con lắc đơn dao động nhỏ và nêu điều kiện áp dụng.',
      'Phân tích sự phụ thuộc của T vào l và g.',
      'Vận dụng trọng lực hiệu dụng khi có thêm ngoại lực.',
    ],
    theory: [
      { h: 'Cấu tạo và điều kiện dao động điều hoà' },
      { p: 'Con lắc đơn gồm vật khối lượng m treo vào sợi dây dài l không dãn. Với biên độ góc nhỏ (α ≤ 10°), thành phần trọng lực kéo về tỉ lệ với li độ, nên con lắc dao động điều hoà.' },
      { h: 'Chu kì và tần số' },
      { ul: [
        'Tần số góc: ω = √(g/l).',
        'Chu kì: T = 2π·√(l/g) — KHÔNG phụ thuộc khối lượng và biên độ (khi nhỏ).',
        'Vì T tỉ lệ với √l: tăng l lên 4 lần thì T tăng 2 lần.',
      ]},
      { h: 'Năng lượng dao động' },
      { p: 'Cơ năng W = (1/2)mω²S₀² với S₀ = α₀·l là biên độ dài (cung). Cơ năng tỉ lệ với bình phương biên độ, bảo toàn nếu bỏ qua ma sát.' },
      { h: 'Trọng lực hiệu dụng' },
      { p: 'Khi con lắc còn chịu thêm lực điện, lực quán tính hay lực đẩy, ta cộng vectơ trọng lực với lực phụ để được trọng lực hiệu dụng P\' = m·g\'. Chu kì mới T\' = 2π·√(l/g\'). Ví dụ trong điện trường đều, g\' khác g nên chu kì thay đổi.' },
      { note: 'Công thức T = 2π√(l/g) chỉ đúng với dao động nhỏ. Với biên độ lớn, chu kì lớn hơn và không còn là dao động điều hoà thuần tuý.' },
    ],
    examples: [
      { q: 'Con lắc đơn dài l = 1 m, g = 9,8 m/s². Tính chu kì.', a: 'T = 2π·√(l/g) = 2π·√(1/9,8) = 2π·√0,102 = 2π·0,3194 ≈ 2,01 s.' },
      { q: 'Con lắc đơn có chu kì 2 s tại nơi g = 9,8 m/s². Tính chiều dài dây.', a: 'Từ T = 2π√(l/g) → l = g·T²/(4π²) = 9,8·4/(4·9,87) = 39,2/39,48 ≈ 0,993 m ≈ 1 m.' },
      { q: 'Đưa con lắc lên Mặt Trăng có g\' = g/6. Chu kì thay đổi thế nào?', a: 'T\' = 2π√(l/g\') = 2π√(6l/g) = √6·T. Chu kì tăng √6 ≈ 2,45 lần, con lắc dao động chậm hơn.' },
    ],
  },

  'H12LY-w04-quiz': {
    topic: 'Năng lượng dao động và tổng hợp dao động',
    intro: 'Tuần này có hai ý lớn: sự chuyển hoá liên tục giữa động năng và thế năng trong một dao động, và cách cộng hai dao động cùng phương cùng tần số bằng giản đồ Fre-nen. Đây là nền tảng cho giao thoa sóng sau này.',
    objectives: [
      'Mô tả sự biến thiên động năng – thế năng trong dao động điều hoà.',
      'Áp dụng công thức Fre-nen tính biên độ và pha dao động tổng hợp.',
      'Xét các trường hợp đặc biệt: cùng pha, ngược pha, vuông pha.',
    ],
    theory: [
      { h: 'Bảo toàn cơ năng' },
      { p: 'Trong dao động điều hoà (bỏ qua ma sát), cơ năng W = Wđ + Wt = (1/2)kA² là hằng số. Động năng và thế năng liên tục chuyển hoá cho nhau nhưng tổng luôn không đổi.' },
      { h: 'Chu kì biến thiên năng lượng' },
      { p: 'Vì Wt = (1/2)kA²cos²(ωt + φ) chứa thừa số cos² nên động năng và thế năng biến thiên tuần hoàn với tần số gấp đôi li độ, tức chu kì biến thiên năng lượng là T/2 (li độ có chu kì T).' },
      { h: 'Tổng hợp hai dao động — công thức Fre-nen' },
      { p: 'Hai dao động cùng phương cùng tần số x₁ = A₁cos(ωt + φ₁), x₂ = A₂cos(ωt + φ₂) tổng hợp thành một dao động cùng tần số với biên độ:' },
      { ul: [
        'A = √(A₁² + A₂² + 2A₁A₂·cosΔφ), với Δφ = φ₂ - φ₁.',
        'Pha: tanφ = (A₁sinφ₁ + A₂sinφ₂)/(A₁cosφ₁ + A₂cosφ₂).',
      ]},
      { h: 'Các trường hợp đặc biệt' },
      { ul: [
        'Cùng pha (Δφ = 0): A = A₁ + A₂ (lớn nhất).',
        'Ngược pha (Δφ = π): A = |A₁ - A₂| (nhỏ nhất).',
        'Vuông pha (Δφ = π/2): A = √(A₁² + A₂²).',
      ]},
      { note: 'Biên độ tổng hợp luôn nằm trong khoảng |A₁ - A₂| ≤ A ≤ A₁ + A₂ với mọi độ lệch pha.' },
    ],
    examples: [
      { q: 'Tổng hợp x₁ = 3cos(ωt) cm và x₂ = 4cos(ωt + π/2) cm (vuông pha).', a: 'A = √(A₁² + A₂²) = √(3² + 4²) = √25 = 5 cm. Dao động tổng hợp có biên độ 5 cm.' },
      { q: 'Hai dao động cùng pha A₁ = 6 cm, A₂ = 8 cm. Tìm biên độ tổng hợp.', a: 'Cùng pha → A = A₁ + A₂ = 6 + 8 = 14 cm.' },
      { q: 'Hai dao động ngược pha A₁ = 10 cm, A₂ = 6 cm. Tìm biên độ tổng hợp.', a: 'Ngược pha → A = |A₁ - A₂| = |10 - 6| = 4 cm.' },
    ],
  },

  'H12LY-w05-quiz': {
    topic: 'Sóng cơ — đại cương',
    intro: 'Khi một dao động lan truyền trong môi trường vật chất, ta có sóng cơ. Tuần này các em làm quen bước sóng, tốc độ truyền sóng, và phân biệt sóng ngang với sóng dọc — bộ khái niệm dùng suốt phần sóng.',
    objectives: [
      'Định nghĩa sóng cơ, bước sóng, chu kì, tần số sóng.',
      'Áp dụng hệ thức λ = v·T = v/f.',
      'Phân biệt sóng ngang và sóng dọc qua phương dao động.',
    ],
    theory: [
      { h: 'Sóng cơ là gì?' },
      { p: 'Sóng cơ là dao động cơ lan truyền trong một môi trường vật chất (rắn, lỏng, khí). Sóng cơ KHÔNG truyền được trong chân không. Khi sóng truyền đi, các phần tử môi trường chỉ dao động tại chỗ, chỉ pha dao động (và năng lượng) lan đi.' },
      { h: 'Các đại lượng đặc trưng' },
      { ul: [
        'Bước sóng λ: khoảng cách giữa hai điểm gần nhau nhất trên phương truyền dao động cùng pha; cũng là quãng đường sóng đi trong một chu kì.',
        'Chu kì T, tần số f của sóng bằng chu kì, tần số của nguồn.',
        'Tốc độ truyền sóng v phụ thuộc bản chất môi trường.',
      ]},
      { h: 'Hệ thức cơ bản' },
      { p: 'λ = v·T = v/f. Khi sóng truyền từ môi trường này sang môi trường khác, tần số f không đổi (do nguồn quyết định), còn v và λ thay đổi theo môi trường.' },
      { h: 'Sóng ngang và sóng dọc' },
      { ul: [
        'Sóng ngang: phương dao động vuông góc phương truyền (sóng trên mặt nước, sóng dây).',
        'Sóng dọc: phương dao động trùng phương truyền (sóng âm trong không khí).',
      ]},
      { note: 'Trong cùng một môi trường, sóng có tần số càng lớn thì bước sóng càng nhỏ, vì λ = v/f với v không đổi.' },
    ],
    examples: [
      { q: 'Sóng có f = 50 Hz, v = 340 m/s. Tính bước sóng.', a: 'λ = v/f = 340/50 = 6,8 m.' },
      { q: 'Một sóng có λ = 2 m, T = 0,01 s. Tính tốc độ truyền sóng.', a: 'v = λ/T = 2/0,01 = 200 m/s.' },
      { q: 'Sóng truyền với v = 20 m/s, hai điểm cách nhau 0,5 m dao động lệch pha π/2. Tìm tần số.', a: 'Độ lệch pha Δφ = 2πd/λ = π/2 → λ = 4d = 2 m. f = v/λ = 20/2 = 10 Hz.' },
    ],
  },

  'H12LY-w06-quiz': {
    topic: 'Giao thoa sóng',
    intro: 'Khi hai sóng kết hợp gặp nhau, chúng tạo ra những vùng dao động mạnh và những vùng đứng yên xen kẽ — đó là giao thoa, bằng chứng đặc trưng cho bản chất sóng. Tuần này các em học điều kiện cực đại, cực tiểu.',
    objectives: [
      'Nêu điều kiện để có hiện tượng giao thoa (hai nguồn kết hợp).',
      'Viết điều kiện cực đại, cực tiểu theo hiệu đường đi.',
      'Tính số điểm dao động cực đại trên đoạn nối hai nguồn.',
    ],
    theory: [
      { h: 'Điều kiện giao thoa' },
      { p: 'Hai nguồn phải là hai nguồn kết hợp: cùng tần số và có độ lệch pha không đổi theo thời gian. Khi đó trong vùng gặp nhau xuất hiện những vân cực đại (dao động mạnh) và vân cực tiểu (đứng yên) ổn định.' },
      { h: 'Điều kiện cực đại, cực tiểu (hai nguồn cùng pha)' },
      { ul: [
        'Cực đại (hai sóng cùng pha tại M): hiệu đường đi d₂ - d₁ = kλ, k ∈ Z.',
        'Cực tiểu (hai sóng ngược pha tại M): d₂ - d₁ = (k + 1/2)λ.',
        'Khoảng cách giữa hai cực đại (hoặc hai cực tiểu) liên tiếp trên đoạn nối hai nguồn là λ/2.',
      ]},
      { h: 'Hai nguồn ngược pha' },
      { p: 'Nếu hai nguồn ngược pha thì điều kiện đảo lại: cực đại khi d₂ - d₁ = (k + 1/2)λ, cực tiểu khi d₂ - d₁ = kλ.' },
      { h: 'Số điểm cực đại trên đoạn nối hai nguồn' },
      { p: 'Với hai nguồn cùng pha cách nhau AB, số cực đại là số giá trị k nguyên thoả -AB/λ < k < AB/λ. Số cực tiểu tính tương tự với (k + 1/2).' },
      { note: 'Vân cực đại gần đường trung trực luôn ứng với k = 0 (d₁ = d₂). Đếm số vân nên dùng bất đẳng thức để tránh sót hoặc thừa.' },
    ],
    examples: [
      { q: 'Hai nguồn cùng pha cách 12 cm, λ = 2 cm. Đếm số cực đại trong khoảng giữa hai nguồn (không kể hai nguồn).', a: 'Điều kiện -12/2 < k < 12/2, tức -6 < k < 6. Các giá trị k = -5,…,5 cho 11 cực đại.' },
      { q: 'Điểm M cách hai nguồn cùng pha d₁ = 10 cm, d₂ = 16 cm, λ = 3 cm. M là cực đại hay cực tiểu?', a: 'd₂ - d₁ = 6 cm = 2λ = 2·3. Vì là bội nguyên của λ nên M là cực đại bậc 2.' },
      { q: 'Hai nguồn cùng pha, λ = 4 cm. Điểm N có d₂ - d₁ = 6 cm. N là gì?', a: '6 = 1,5λ = (1 + 1/2)·4. Đúng dạng (k+1/2)λ nên N là cực tiểu.' },
    ],
  },

  'H12LY-w07-quiz': {
    topic: 'Sóng dừng',
    intro: 'Khi sóng tới và sóng phản xạ giao thoa trên cùng một phương, ta được sóng dừng với những điểm đứng yên (nút) và những điểm dao động cực đại (bụng) cố định. Đây là cơ sở của mọi nhạc cụ dây và ống sáo.',
    objectives: [
      'Giải thích sự hình thành sóng dừng và khái niệm nút, bụng.',
      'Áp dụng khoảng cách nút – bụng theo λ.',
      'Viết điều kiện sóng dừng cho dây hai đầu cố định và một đầu tự do.',
    ],
    theory: [
      { h: 'Sự hình thành sóng dừng' },
      { p: 'Sóng dừng là kết quả giao thoa giữa sóng tới và sóng phản xạ trên cùng một phương truyền. Trên dây xuất hiện các nút (điểm luôn đứng yên) và bụng (điểm dao động với biên độ cực đại) cố định, sóng không lan truyền năng lượng.' },
      { h: 'Khoảng cách nút và bụng' },
      { ul: [
        'Khoảng cách giữa hai nút liên tiếp (hoặc hai bụng liên tiếp) là λ/2.',
        'Khoảng cách giữa một nút và một bụng gần nhất là λ/4.',
      ]},
      { h: 'Điều kiện sóng dừng' },
      { ul: [
        'Dây hai đầu cố định (hai nút): l = k·λ/2, với k là số bụng (k = 1, 2, 3,…).',
        'Dây một đầu cố định, một đầu tự do (một nút, một bụng): l = (2k + 1)·λ/4.',
      ]},
      { h: 'Ý nghĩa' },
      { p: 'Với dây hai đầu cố định, chiều dài dây phải là số nguyên lần nửa bước sóng. Tần số nhỏ nhất gây sóng dừng (k = 1) gọi là tần số cơ bản; các tần số bội của nó là hoạ âm.' },
      { note: 'Hai đầu cố định luôn là nút. Đếm bụng để xác định k: có k bụng thì l = k·λ/2.' },
    ],
    examples: [
      { q: 'Dây hai đầu cố định dài 60 cm có sóng dừng với 4 bụng. Tính λ.', a: 'l = k·λ/2 với k = 4 → 60 = 4·λ/2 = 2λ → λ = 30 cm.' },
      { q: 'Dây dài 90 cm, hai đầu cố định, sóng dừng có bước sóng 30 cm. Có bao nhiêu bụng?', a: 'l = k·λ/2 → 90 = k·15 → k = 6. Có 6 bụng (và 7 nút).' },
      { q: 'Dây một đầu cố định, một đầu tự do dài 25 cm, sóng dừng có 1 bụng (k = 0). Tính λ.', a: 'l = (2k+1)λ/4 = λ/4 → λ = 4l = 4·25 = 100 cm = 1 m.' },
    ],
  },

  'H12LY-w08-quiz': {
    topic: 'Sóng âm',
    intro: 'Sóng âm là sóng cơ mà tai ta nghe được. Tuần này các em phân biệt hạ âm – âm nghe được – siêu âm, hiểu cường độ âm, mức cường độ âm (đêxiben), và ba đặc trưng sinh lí: độ cao, độ to, âm sắc.',
    objectives: [
      'Phân loại âm theo tần số và nêu khoảng nghe được của tai người.',
      'Áp dụng công thức mức cường độ âm L = 10·lg(I/I₀).',
      'Liên hệ đặc trưng vật lí với đặc trưng sinh lí của âm.',
    ],
    theory: [
      { h: 'Sóng âm và phân loại' },
      { p: 'Sóng âm trong chất khí và lỏng là sóng dọc (nén – dãn). Theo tần số: hạ âm (< 16 Hz), âm nghe được (16 Hz – 20 000 Hz), siêu âm (> 20 000 Hz). Tốc độ truyền âm phụ thuộc môi trường: không khí ~340 m/s, nước ~1500 m/s, thép ~5000 m/s.' },
      { h: 'Cường độ âm và mức cường độ âm' },
      { ul: [
        'Cường độ âm I là năng lượng âm qua một đơn vị diện tích trong một đơn vị thời gian, đơn vị W/m².',
        'Mức cường độ âm: L = 10·lg(I/I₀) (đêxiben, dB), với I₀ = 10⁻¹² W/m² là cường độ chuẩn.',
      ]},
      { h: 'Đặc trưng sinh lí của âm' },
      { ul: [
        'Độ cao gắn với tần số: tần số càng lớn, âm càng cao (bổng).',
        'Độ to gắn với mức cường độ âm.',
        'Âm sắc gắn với đồ thị dao động (các hoạ âm), giúp phân biệt nguồn âm.',
      ]},
      { note: 'Mỗi khi cường độ I tăng 10 lần thì L tăng 10 dB. Nhờ thang lôgarit, tai người cảm nhận được dải cường độ rất rộng.' },
    ],
    examples: [
      { q: 'Âm có cường độ I = 10⁻⁶ W/m². Tính mức cường độ âm L (I₀ = 10⁻¹² W/m²).', a: 'L = 10·lg(I/I₀) = 10·lg(10⁻⁶/10⁻¹²) = 10·lg(10⁶) = 10·6 = 60 dB.' },
      { q: 'Mức cường độ âm tại một điểm là 70 dB. Tính cường độ âm I.', a: '70 = 10·lg(I/I₀) → lg(I/I₀) = 7 → I/I₀ = 10⁷ → I = 10⁷·10⁻¹² = 10⁻⁵ W/m².' },
      { q: 'Cường độ âm tăng 100 lần thì mức cường độ âm tăng bao nhiêu dB?', a: 'ΔL = 10·lg(100) = 10·2 = 20 dB.' },
    ],
  },

  'H12LY-w09-quiz': {
    topic: 'Dòng điện xoay chiều — đại cương',
    intro: 'Điện lưới mỗi nhà đều là dòng xoay chiều. Tuần này các em học biểu thức i, u theo thời gian, ý nghĩa của giá trị hiệu dụng, và sự lệch pha giữa u và i trong các phần tử R, L, C.',
    objectives: [
      'Viết biểu thức dòng điện và điện áp xoay chiều.',
      'Phân biệt giá trị cực đại và giá trị hiệu dụng.',
      'Nêu độ lệch pha của u so với i trong mạch chỉ R, chỉ L, chỉ C.',
    ],
    theory: [
      { h: 'Dòng điện xoay chiều' },
      { p: 'Dòng điện xoay chiều có cường độ biến thiên điều hoà theo thời gian: i = I₀·cos(ωt + φ). Điện áp tương ứng u = U₀·cos(ωt + φ_u). Tần số dòng điện dân dụng ở Việt Nam là 50 Hz.' },
      { h: 'Giá trị hiệu dụng' },
      { p: 'Giá trị hiệu dụng là giá trị dùng để tính công suất toả nhiệt như dòng một chiều tương đương: I = I₀/√2, U = U₀/√2. Các vôn kế, ampe kế xoay chiều đều đo giá trị hiệu dụng. Ví dụ điện áp 220 V là giá trị hiệu dụng, ứng với U₀ = 220√2 ≈ 311 V.' },
      { h: 'Độ lệch pha trong các phần tử' },
      { ul: [
        'Mạch chỉ R: u cùng pha với i (φ = 0).',
        'Mạch chỉ L (cuộn cảm thuần): u sớm pha π/2 so với i.',
        'Mạch chỉ C (tụ điện): u trễ pha π/2 so với i.',
      ]},
      { h: 'Cảm kháng và dung kháng' },
      { p: 'Cuộn cảm có cảm kháng ZL = ωL; tụ điện có dung kháng ZC = 1/(ωC). Hai đại lượng này đóng vai trò "điện trở" của L và C đối với dòng xoay chiều.' },
      { note: 'Khi tính công suất luôn dùng giá trị hiệu dụng, không dùng giá trị cực đại. Nhầm I và I₀ là lỗi rất phổ biến.' },
    ],
    examples: [
      { q: 'Điện áp hiệu dụng U = 220 V. Tính giá trị cực đại U₀.', a: 'U₀ = U·√2 = 220·√2 ≈ 311 V.' },
      { q: 'Dòng xoay chiều i = 4·cos(100πt) A. Tìm I₀, I, tần số f.', a: 'I₀ = 4 A; I = I₀/√2 = 4/√2 = 2√2 ≈ 2,83 A. ω = 100π → f = ω/(2π) = 50 Hz.' },
      { q: 'Cuộn cảm thuần L = 0,1/π H mắc vào nguồn f = 50 Hz. Tính cảm kháng ZL.', a: 'ω = 2πf = 100π rad/s. ZL = ωL = 100π·(0,1/π) = 10 Ω.' },
    ],
  },

  'H12LY-w10-quiz': {
    topic: 'Mạch RLC nối tiếp',
    intro: 'Ghép R, L, C nối tiếp ta được mạch xoay chiều tổng quát. Tuần này các em học tổng trở, hệ số công suất và công suất tiêu thụ — bộ công thức xuất hiện trong hầu hết câu điện xoay chiều của đề thi.',
    objectives: [
      'Tính tổng trở Z của mạch RLC nối tiếp.',
      'Tính độ lệch pha và hệ số công suất cosφ.',
      'Tính công suất tiêu thụ của mạch.',
    ],
    theory: [
      { h: 'Tổng trở' },
      { p: 'Trong mạch RLC nối tiếp, dòng điện i như nhau qua mọi phần tử. Tổng trở: Z = √(R² + (ZL - ZC)²), với ZL = ωL và ZC = 1/(ωC). Định luật Ôm: I = U/Z.' },
      { h: 'Độ lệch pha và hệ số công suất' },
      { ul: [
        'tanφ = (ZL - ZC)/R, với φ là độ lệch pha của u so với i.',
        'Hệ số công suất: cosφ = R/Z.',
        'Nếu ZL > ZC: mạch có tính cảm kháng, u sớm pha so với i (φ > 0).',
        'Nếu ZL < ZC: mạch có tính dung kháng, u trễ pha so với i (φ < 0).',
      ]},
      { h: 'Công suất tiêu thụ' },
      { p: 'Công suất P = U·I·cosφ = I²·R. Chỉ điện trở R tiêu thụ điện năng (toả nhiệt); cuộn cảm và tụ điện chỉ trao đổi năng lượng qua lại với nguồn.' },
      { note: 'Các điện áp thành phần cộng theo vectơ chứ không cộng đại số: U = √(U_R² + (U_L - U_C)²). Đừng cộng thẳng U_R + U_L + U_C.' },
    ],
    examples: [
      { q: 'Mạch RLC có R = 50 Ω, ZL = 80 Ω, ZC = 50 Ω. Tính tổng trở Z.', a: 'Z = √(R² + (ZL - ZC)²) = √(50² + 30²) = √(2500 + 900) = √3400 ≈ 58,3 Ω.' },
      { q: 'Cùng mạch trên, U = 116,6 V. Tính I và cosφ.', a: 'I = U/Z = 116,6/58,3 ≈ 2 A. cosφ = R/Z = 50/58,3 ≈ 0,857.' },
      { q: 'Mạch RLC có R = 30 Ω, ZL = 60 Ω, ZC = 20 Ω, U = 100 V. Tính công suất P.', a: 'Z = √(30² + 40²) = 50 Ω; I = 100/50 = 2 A; P = I²R = 4·30 = 120 W.' },
    ],
  },

  'H12LY-w11-quiz': {
    topic: 'Cộng hưởng điện',
    intro: 'Khi cảm kháng bằng dung kháng, mạch RLC rơi vào trạng thái cộng hưởng: dòng điện đạt cực đại và mạch ứng xử như một điện trở thuần. Đây là hiện tượng quan trọng dùng để chọn sóng trong radio.',
    objectives: [
      'Nêu điều kiện và đặc điểm của cộng hưởng điện.',
      'Tính tần số riêng và dòng điện khi cộng hưởng.',
      'Hiểu ứng dụng của cộng hưởng.',
    ],
    theory: [
      { h: 'Điều kiện cộng hưởng' },
      { p: 'Cộng hưởng điện xảy ra khi ZL = ZC, tức ωL = 1/(ωC) → ω² = 1/(LC). Khi đó độ lệch pha φ = 0, u và i cùng pha.' },
      { h: 'Đặc điểm khi cộng hưởng' },
      { ul: [
        'Tổng trở cực tiểu: Z = R.',
        'Dòng điện cực đại: I = U/R.',
        'Hệ số công suất cực đại: cosφ = 1.',
        'Công suất tiêu thụ cực đại: P = U²/R.',
      ]},
      { h: 'Tần số riêng' },
      { p: 'Tần số góc riêng ω₀ = 1/√(LC); tần số riêng f₀ = 1/(2π√(LC)). Khi tần số nguồn bằng tần số riêng của mạch thì cộng hưởng.' },
      { h: 'Ứng dụng' },
      { p: 'Mạch cộng hưởng dùng để chọn sóng trong máy thu thanh: điều chỉnh C (hoặc L) sao cho tần số riêng trùng tần số đài cần thu, mạch khuếch đại mạnh đúng đài đó.' },
      { note: 'Khi cộng hưởng, điện áp trên R bằng điện áp nguồn (U_R = U), còn U_L và U_C bằng nhau và có thể lớn hơn U nguồn.' },
    ],
    examples: [
      { q: 'Mạch RLC có L = 1 H, C = 10 μF. Tính tần số riêng f₀.', a: 'f₀ = 1/(2π√(LC)) = 1/(2π√(1·10⁻⁵)) = 1/(2π·3,16·10⁻³) ≈ 50,3 Hz.' },
      { q: 'Mạch RLC, R = 50 Ω, đang cộng hưởng, U = 100 V. Tính I và P.', a: 'Cộng hưởng: Z = R = 50 Ω → I = U/R = 100/50 = 2 A. P = I²R = 4·50 = 200 W.' },
      { q: 'Mạch có L = 0,5 H. Muốn cộng hưởng với nguồn f = 50 Hz, cần C bằng bao nhiêu?', a: 'ω = 100π. C = 1/(ω²L) = 1/((100π)²·0,5) = 1/(49348) ≈ 2,03·10⁻⁵ F ≈ 20,3 μF.' },
    ],
  },

  'H12LY-w12-quiz': {
    topic: 'Máy biến áp và truyền tải điện năng',
    intro: 'Vì sao điện được truyền đi xa ở điện áp hàng trăm kilôvôn rồi mới hạ xuống 220 V? Tuần này các em học máy biến áp và bài toán giảm hao phí trên đường dây — ứng dụng thực tế quan trọng nhất của dòng xoay chiều.',
    objectives: [
      'Nêu cấu tạo, nguyên tắc và công thức của máy biến áp.',
      'Vận dụng định luật bảo toàn công suất trong biến áp lí tưởng.',
      'Giải thích và tính hao phí truyền tải, vai trò của việc tăng điện áp.',
    ],
    theory: [
      { h: 'Máy biến áp' },
      { p: 'Máy biến áp dùng để thay đổi giá trị điện áp xoay chiều mà không đổi tần số, hoạt động dựa trên hiện tượng cảm ứng điện từ. Gồm hai cuộn dây (sơ cấp N₁ vòng, thứ cấp N₂ vòng) quấn trên cùng một lõi sắt.' },
      { h: 'Công thức máy biến áp' },
      { ul: [
        'Tỉ số điện áp: U₁/U₂ = N₁/N₂.',
        'Biến áp lí tưởng (bỏ hao phí): U₁I₁ = U₂I₂, nên I₁/I₂ = N₂/N₁.',
        'N₂ > N₁: tăng áp (giảm dòng); N₂ < N₁: hạ áp (tăng dòng).',
      ]},
      { h: 'Hao phí trên đường dây tải điện' },
      { p: 'Công suất hao phí do toả nhiệt trên dây: ΔP = I²·R = (P/U)²·R = P²·R/U² (khi cosφ = 1). Vì ΔP tỉ lệ nghịch với U², tăng điện áp truyền tải lên n lần làm hao phí giảm n² lần — đây là cách hiệu quả nhất.' },
      { note: 'Sơ đồ truyền tải thực tế: nhà máy → biến áp tăng (đến hàng trăm kV để truyền đi xa) → biến áp hạ (xuống 220 V) → hộ tiêu thụ.' },
    ],
    examples: [
      { q: 'Biến áp có N₁ = 1000 vòng, N₂ = 50 vòng, U₁ = 220 V. Tính U₂.', a: 'U₂ = U₁·N₂/N₁ = 220·50/1000 = 11 V (biến áp hạ áp).' },
      { q: 'Biến áp lí tưởng: U₁ = 120 V, I₁ = 2 A, U₂ = 24 V. Tính I₂.', a: 'U₁I₁ = U₂I₂ → I₂ = U₁I₁/U₂ = 120·2/24 = 10 A.' },
      { q: 'Truyền công suất P = 100 kW. Nếu tăng điện áp truyền tải lên 10 lần thì hao phí giảm bao nhiêu lần?', a: 'ΔP = P²R/U². U tăng 10 lần → U² tăng 100 lần → ΔP giảm 100 lần.' },
    ],
  },

  'H12LY-w13-quiz': {
    topic: 'Máy phát điện xoay chiều và động cơ',
    intro: 'Điện năng được tạo ra như thế nào? Tuần này các em học máy phát điện xoay chiều, dòng điện ba pha và động cơ không đồng bộ — những thiết bị biến cơ năng thành điện năng và ngược lại.',
    objectives: [
      'Nêu nguyên tắc hoạt động và công thức tần số máy phát.',
      'Hiểu cấu tạo và ưu điểm của dòng điện ba pha.',
      'Giải thích nguyên lí động cơ không đồng bộ ba pha.',
    ],
    theory: [
      { h: 'Máy phát điện xoay chiều' },
      { p: 'Máy phát điện xoay chiều hoạt động dựa trên hiện tượng cảm ứng điện từ: từ thông qua cuộn dây biến thiên tạo ra suất điện động xoay chiều. Tần số: f = p·n, với p là số cặp cực, n là số vòng quay trong một giây.' },
      { h: 'Dòng điện ba pha' },
      { p: 'Máy phát ba pha có ba cuộn dây giống nhau đặt lệch nhau 120° trên stato. Khi rôto quay, ba suất điện động sinh ra lệch pha nhau 2π/3, tạo thành hệ thống điện ba pha — tiết kiệm dây dẫn khi truyền tải.' },
      { h: 'Động cơ không đồng bộ ba pha' },
      { ul: [
        'Dòng ba pha tạo ra từ trường quay trong stato.',
        'Từ trường quay làm rôto quay theo, nhưng chậm hơn (không đồng bộ).',
        'Sự chênh tốc (độ trượt) tạo dòng cảm ứng trong rôto, sinh mômen quay.',
      ]},
      { h: 'Ưu điểm' },
      { p: 'Động cơ không đồng bộ ba pha có cấu tạo đơn giản, bền, không cần chổi than, hiệu suất cao nên được dùng rộng rãi trong công nghiệp.' },
      { note: 'Rôto luôn quay chậm hơn từ trường quay; nếu quay bằng tốc độ từ trường thì không còn biến thiên từ thông, không sinh mômen.' },
    ],
    examples: [
      { q: 'Máy phát có p = 2 cặp cực, rôto quay n = 25 vòng/s. Tính tần số dòng điện.', a: 'f = p·n = 2·25 = 50 Hz.' },
      { q: 'Một máy phát cần tạo f = 50 Hz với p = 1 cặp cực. Tính tốc độ quay (vòng/phút).', a: 'n = f/p = 50 vòng/s = 50·60 = 3000 vòng/phút.' },
      { q: 'Máy phát có 4 cặp cực, quay 12,5 vòng/s. Tần số dòng phát ra?', a: 'f = p·n = 4·12,5 = 50 Hz.' },
    ],
  },

  'H12LY-w14-quiz': {
    topic: 'Dao động điện từ — mạch LC',
    intro: 'Ghép một cuộn cảm với một tụ điện, ta được mạch dao động LC — nơi năng lượng chuyển hoá qua lại giữa điện trường của tụ và từ trường của cuộn cảm. Đây là phiên bản "điện" của con lắc lò xo.',
    objectives: [
      'Mô tả dao động điện từ tự do trong mạch LC.',
      'Áp dụng công thức chu kì, tần số riêng của mạch LC.',
      'Phân tích sự chuyển hoá và bảo toàn năng lượng điện từ.',
    ],
    theory: [
      { h: 'Mạch dao động LC' },
      { p: 'Mạch gồm tụ điện C và cuộn cảm L tạo thành mạch kín. Khi tụ phóng điện qua cuộn cảm rồi nạp lại theo chiều ngược, điện tích q và dòng điện i biến thiên điều hoà — đó là dao động điện từ tự do.' },
      { h: 'Chu kì và tần số riêng' },
      { ul: [
        'Tần số góc riêng: ω₀ = 1/√(LC).',
        'Chu kì: T = 2π·√(LC).',
        'Tần số: f = 1/(2π√(LC)).',
      ]},
      { h: 'Năng lượng trong mạch LC' },
      { ul: [
        'Năng lượng điện trường (ở tụ): W_đ = q²/(2C) = (1/2)CU².',
        'Năng lượng từ trường (ở cuộn cảm): W_t = (1/2)Li².',
        'Năng lượng toàn phần W = W_đ + W_t bảo toàn (mạch lí tưởng).',
      ]},
      { h: 'Sự chuyển hoá năng lượng' },
      { p: 'Khi q = Q₀ (tụ tích đầy) thì i = 0, toàn bộ năng lượng ở dạng điện trường. Khi q = 0 thì i = I₀, toàn bộ năng lượng ở dạng từ trường. Tương tự con lắc: x ↔ q, v ↔ i.' },
      { note: 'Mối liên hệ I₀ = ω₀·Q₀ tương ứng với vmax = ωA của dao động cơ. Dao động cơ và dao động điện từ chia chung bộ công thức.' },
    ],
    examples: [
      { q: 'Mạch LC có L = 1 mH, C = 1 μF. Tính chu kì và tần số riêng.', a: 'T = 2π√(LC) = 2π√(10⁻³·10⁻⁶) = 2π√(10⁻⁹) = 2π·3,16·10⁻⁵ ≈ 1,99·10⁻⁴ s. f = 1/T ≈ 5,03 kHz.' },
      { q: 'Mạch LC có Q₀ = 2·10⁻⁶ C, C = 4 μF. Tính năng lượng điện trường cực đại.', a: 'W = Q₀²/(2C) = (2·10⁻⁶)²/(2·4·10⁻⁶) = 4·10⁻¹²/(8·10⁻⁶) = 5·10⁻⁷ J.' },
      { q: 'Mạch LC có ω₀ = 10⁶ rad/s, Q₀ = 5·10⁻⁹ C. Tính cường độ dòng cực đại I₀.', a: 'I₀ = ω₀·Q₀ = 10⁶·5·10⁻⁹ = 5·10⁻³ A = 5 mA.' },
    ],
  },

  'H12LY-w15-quiz': {
    topic: 'Sóng điện từ và thông tin liên lạc',
    intro: 'Điện trường và từ trường biến thiên lan truyền tạo ra sóng điện từ — thứ mang tín hiệu radio, truyền hình, Wi-Fi đến với chúng ta. Tuần này các em học tính chất của sóng điện từ và thang sóng từ tia γ đến sóng vô tuyến.',
    objectives: [
      'Nêu bản chất, tốc độ và tính chất của sóng điện từ.',
      'Sắp xếp thang sóng điện từ theo bước sóng.',
      'Phân loại sóng vô tuyến và ứng dụng truyền thông.',
    ],
    theory: [
      { h: 'Sóng điện từ là gì?' },
      { p: 'Sóng điện từ là quá trình lan truyền của điện từ trường biến thiên trong không gian, truyền được cả trong chân không với tốc độ c ≈ 3·10⁸ m/s. Sóng điện từ là sóng ngang: vectơ E và B vuông góc nhau và cùng vuông góc phương truyền.' },
      { h: 'Thang sóng điện từ' },
      { p: 'Theo bước sóng tăng dần (tần số giảm dần): tia γ < tia X < tia tử ngoại (UV) < ánh sáng nhìn thấy < tia hồng ngoại (IR) < sóng vô tuyến. Tất cả cùng bản chất, chỉ khác bước sóng.' },
      { h: 'Sóng vô tuyến' },
      { ul: [
        'Sóng dài (> 1000 m): ít bị hấp thụ trong nước, dùng liên lạc dưới nước.',
        'Sóng trung và sóng ngắn: phản xạ tốt ở tầng điện li, truyền xa quanh Trái Đất.',
        'Sóng cực ngắn (VHF/UHF): truyền thẳng, dùng truyền hình, FM, vệ tinh, cần trạm tiếp sóng.',
      ]},
      { note: 'Sóng âm là sóng cơ, KHÁC hoàn toàn sóng điện từ. Sóng âm cần môi trường vật chất, sóng điện từ truyền được trong chân không.' },
    ],
    examples: [
      { q: 'Một đài phát ở tần số f = 1 MHz. Tính bước sóng vô tuyến.', a: 'λ = c/f = (3·10⁸)/(10⁶) = 300 m (sóng trung).' },
      { q: 'Sóng FM phát ở λ = 3 m. Tính tần số.', a: 'f = c/λ = (3·10⁸)/3 = 10⁸ Hz = 100 MHz.' },
      { q: 'Mạch chọn sóng LC có L = 2 μH, C = 8 pF. Tính bước sóng thu được.', a: 'f = 1/(2π√(LC)) = 1/(2π√(2·10⁻⁶·8·10⁻¹²)) = 1/(2π·4·10⁻⁹) ≈ 39,8 MHz. λ = c/f ≈ 7,5 m.' },
    ],
  },

  'H12LY-w16-quiz': {
    topic: 'Tán sắc và giao thoa ánh sáng',
    intro: 'Vì sao lăng kính tách ánh sáng trắng thành cầu vồng? Và vì sao hai khe hẹp lại tạo ra các vân sáng tối? Tuần này các em học tán sắc và giao thoa ánh sáng — hai bằng chứng cho bản chất sóng của ánh sáng.',
    objectives: [
      'Giải thích hiện tượng tán sắc qua chiết suất phụ thuộc bước sóng.',
      'Viết và áp dụng công thức khoảng vân trong giao thoa khe Young.',
      'Xác định vị trí vân sáng, vân tối.',
    ],
    theory: [
      { h: 'Tán sắc ánh sáng' },
      { p: 'Newton (1672) cho ánh sáng trắng qua lăng kính và thu được dải bảy màu: đỏ, cam, vàng, lục, lam, chàm, tím. Nguyên nhân là chiết suất của lăng kính khác nhau với mỗi ánh sáng đơn sắc (lớn nhất với tím, nhỏ nhất với đỏ), nên tia tím bị lệch nhiều nhất.' },
      { h: 'Giao thoa khe Young' },
      { p: 'Chiếu ánh sáng đơn sắc qua hai khe hẹp song song cách nhau a, trên màn cách hai khe khoảng D xuất hiện hệ vân sáng tối xen kẽ. Khoảng cách giữa hai vân sáng (hoặc hai vân tối) liên tiếp là khoảng vân i.' },
      { ul: [
        'Khoảng vân: i = λD/a.',
        'Vân sáng bậc k: x_s = k·i (k = 0, ±1, ±2,…), vân trung tâm k = 0.',
        'Vân tối thứ k: x_t = (k - 1/2)·i (k = 1, 2,…).',
      ]},
      { note: 'Quan sát được vân giao thoa là bằng chứng trực tiếp cho bản chất sóng của ánh sáng. Đổi λ về cùng đơn vị (m) với a, D trước khi tính.' },
    ],
    examples: [
      { q: 'Giao thoa khe Young: λ = 0,5 μm, a = 1 mm, D = 1 m. Tính khoảng vân i.', a: 'i = λD/a = (0,5·10⁻⁶·1)/(10⁻³) = 0,5·10⁻³ m = 0,5 mm.' },
      { q: 'Với i = 0,5 mm, vân sáng bậc 3 cách vân trung tâm bao nhiêu?', a: 'x_s = k·i = 3·0,5 = 1,5 mm.' },
      { q: 'Khoảng cách giữa 5 vân sáng liên tiếp đo được 2 mm. Tính khoảng vân i.', a: '5 vân liên tiếp có 4 khoảng vân → i = 2/4 = 0,5 mm.' },
    ],
  },

  'H12LY-w17-quiz': {
    topic: 'Quang phổ, tia X và tia γ',
    intro: 'Ánh sáng từ một vật cho ta biết nó được tạo thành từ gì — đó là nguyên lí của quang phổ. Tuần này các em học các loại quang phổ và các bức xạ không nhìn thấy: tia tử ngoại, tia X, tia γ cùng ứng dụng của chúng.',
    objectives: [
      'Phân biệt quang phổ liên tục và quang phổ vạch.',
      'Nêu nguồn phát, tính chất và ứng dụng của tia X, tia γ.',
      'So sánh khả năng đâm xuyên của các loại tia.',
    ],
    theory: [
      { h: 'Các loại quang phổ' },
      { ul: [
        'Quang phổ liên tục: dải màu liền nhau, phát ra từ chất rắn, lỏng, khí áp suất cao bị nung nóng (ví dụ Mặt Trời, dây tóc bóng đèn).',
        'Quang phổ vạch phát xạ: các vạch sáng riêng lẻ, do chất khí loãng bị kích thích phát ra, đặc trưng cho từng nguyên tố.',
        'Quang phổ vạch hấp thụ: các vạch tối trên nền liên tục, dùng phân tích thành phần khí.',
      ]},
      { h: 'Tia X (tia Rơn-ghen)' },
      { p: 'Tia X có bước sóng rất ngắn (10⁻¹¹ – 10⁻⁸ m), nhỏ hơn tia tử ngoại. Tính chất nổi bật: đâm xuyên mạnh, ion hoá, làm phát quang. Ứng dụng: chụp X-quang y học, kiểm tra khuyết tật vật liệu.' },
      { h: 'Tia γ' },
      { p: 'Tia γ là bức xạ điện từ có bước sóng ngắn nhất, phát ra từ hạt nhân nguyên tử trong các phản ứng hạt nhân và phân rã phóng xạ. Đâm xuyên cực mạnh, dùng trong xạ trị ung thư, khử trùng.' },
      { h: 'So sánh khả năng đâm xuyên' },
      { p: 'Theo thứ tự giảm dần: γ > X > β > α. Tia α dễ bị chặn bởi tờ giấy hay vài cm không khí; tia γ phải dùng tấm chì dày mới chặn được.' },
      { note: 'Quang phổ vạch phát xạ là "vân tay" của nguyên tố: mỗi nguyên tố có bộ vạch riêng, nhờ đó xác định được thành phần của các ngôi sao.' },
    ],
    examples: [
      { q: 'Tia X có bước sóng λ = 10⁻¹⁰ m. Tính tần số.', a: 'f = c/λ = (3·10⁸)/(10⁻¹⁰) = 3·10¹⁸ Hz.' },
      { q: 'Một nguồn phát tia γ λ = 10⁻¹² m. So với tia X (λ ~ 10⁻¹⁰ m), tia nào năng lượng cao hơn?', a: 'Năng lượng ε = hc/λ tỉ lệ nghịch với λ. λ tia γ nhỏ hơn 100 lần → năng lượng lớn hơn 100 lần, đâm xuyên mạnh hơn.' },
      { q: 'Để chắn bức xạ phòng X-quang nên dùng vật liệu gì và vì sao?', a: 'Dùng chì (Pb) vì tia X đâm xuyên mạnh; chì có mật độ lớn hấp thụ tia X tốt, bảo vệ nhân viên y tế.' },
    ],
  },

  'H12LY-w18-quiz': {
    topic: 'Ôn tập học kì 1 — kiểm tra giữa kì',
    intro: 'Tuần ôn tập học kì 1, các em hệ thống lại bốn mảng lớn: dao động cơ, sóng cơ và sóng âm, điện xoay chiều, dao động – sóng điện từ và sóng ánh sáng. Hãy luyện thật nhanh để thành thạo các dạng tính toán cơ bản.',
    objectives: [
      'Tổng hợp công thức trọng tâm của học kì 1.',
      'Vận dụng giải nhanh bài tập nhiều chủ đề.',
      'Tránh các lỗi đơn vị và nhầm giá trị hiệu dụng/cực đại.',
    ],
    theory: [
      { h: 'Dao động cơ' },
      { ul: [
        'Con lắc lò xo: T = 2π√(m/k); cơ năng W = (1/2)kA².',
        'Con lắc đơn: T = 2π√(l/g).',
        'vmax = ωA; amax = ω²A; A² = x² + v²/ω².',
      ]},
      { h: 'Sóng cơ và sóng âm' },
      { ul: [
        'λ = v·T = v/f; cực đại giao thoa d₂ - d₁ = kλ.',
        'Sóng dừng hai đầu cố định: l = k·λ/2.',
        'Mức cường độ âm: L = 10·lg(I/I₀).',
      ]},
      { h: 'Điện xoay chiều' },
      { ul: [
        'Z = √(R² + (ZL - ZC)²); cosφ = R/Z; P = U·I·cosφ = I²R.',
        'Cộng hưởng: ZL = ZC → I = U/R cực đại.',
        'Biến áp: U₁/U₂ = N₁/N₂; hao phí ΔP = P²R/U².',
      ]},
      { h: 'Dao động – sóng điện từ và ánh sáng' },
      { ul: [
        'Mạch LC: T = 2π√(LC); f = 1/(2π√(LC)).',
        'Sóng điện từ: c = 3·10⁸ m/s; λ = c/f.',
        'Giao thoa khe Young: i = λD/a.',
      ]},
      { note: 'Khi tính nhanh, hãy ghi chú đơn vị bên cạnh từng số. Lỗi sai phổ biến nhất trong điện xoay chiều là quên chia √2 khi đổi giá trị cực đại sang hiệu dụng.' },
    ],
    examples: [
      { q: 'Con lắc lò xo k = 40 N/m, m = 0,1 kg. Tính tần số f.', a: 'f = (1/2π)√(k/m) = (1/2π)√(400) = 20/(2π) ≈ 3,18 Hz.' },
      { q: 'Mạch RLC: R = 50 Ω, ZL = 80 Ω, ZC = 50 Ω. Tính tổng trở.', a: 'Z = √(50² + (80-50)²) = √(2500 + 900) = √3400 ≈ 58,3 Ω.' },
      { q: 'Mạch LC có L = 1 mH, C = 1 μF. Tính tần số riêng.', a: 'f = 1/(2π√(LC)) = 1/(2π√(10⁻⁹)) = 1/(2π·3,16·10⁻⁵) ≈ 5,03 kHz.' },
    ],
  },

  'H12LY-w19-quiz': {
    topic: 'Lượng tử ánh sáng — hiện tượng quang điện',
    intro: 'Bước sang học kì 2 với vật lí hiện đại. Hiện tượng quang điện cho thấy ánh sáng không chỉ là sóng mà còn là dòng các hạt photon. Đây là phát hiện làm Einstein đoạt giải Nobel và khai sinh thuyết lượng tử.',
    objectives: [
      'Nêu hiện tượng quang điện ngoài và điều kiện xảy ra.',
      'Áp dụng công thức năng lượng photon và phương trình Einstein.',
      'Phân biệt vai trò của tần số và cường độ ánh sáng.',
    ],
    theory: [
      { h: 'Hiện tượng quang điện ngoài' },
      { p: 'Khi chiếu ánh sáng thích hợp vào bề mặt kim loại, các electron bị bứt ra khỏi kim loại — đó là hiện tượng quang điện (ngoài). Điều kiện xảy ra: bước sóng ánh sáng λ ≤ λ₀ (giới hạn quang điện), tương đương tần số f ≥ f₀.' },
      { h: 'Thuyết lượng tử ánh sáng' },
      { p: 'Ánh sáng gồm các hạt photon, mỗi photon mang năng lượng ε = hf = hc/λ, với hằng số Planck h = 6,625·10⁻³⁴ J·s. Một electron hấp thụ một photon trọn vẹn.' },
      { h: 'Công thoát và phương trình Einstein' },
      { ul: [
        'Công thoát A = hc/λ₀ là năng lượng tối thiểu để bứt electron khỏi kim loại.',
        'Phương trình Einstein: hf = A + (1/2)m·v₀max², với (1/2)mv₀max² là động năng ban đầu cực đại của electron quang điện.',
      ]},
      { h: 'Vai trò của tần số và cường độ' },
      { ul: [
        'Tần số (bước sóng) quyết định có xảy ra quang điện không và tốc độ ban đầu cực đại của electron.',
        'Cường độ ánh sáng quyết định số photon, do đó quyết định số electron bứt ra (cường độ dòng quang điện).',
      ]},
      { note: 'Tăng cường độ ánh sáng KHÔNG làm tăng tốc độ electron quang điện, chỉ tăng số electron. Đây là điểm thuyết sóng cổ điển không giải thích được.' },
    ],
    examples: [
      { q: 'Photon ánh sáng đỏ có λ = 700 nm. Tính năng lượng (theo eV, dùng hc = 1240 eV·nm).', a: 'ε = hc/λ = 1240/700 ≈ 1,77 eV.' },
      { q: 'Kim loại có giới hạn quang điện λ₀ = 0,5 μm. Tính công thoát A (eV).', a: 'A = hc/λ₀ = 1240/500 = 2,48 eV.' },
      { q: 'Chiếu λ = 0,4 μm vào kim loại có A = 2,48 eV. Tính động năng ban đầu cực đại của electron.', a: 'ε = 1240/400 = 3,1 eV. Wđmax = ε - A = 3,1 - 2,48 = 0,62 eV.' },
    ],
  },

  'H12LY-w20-quiz': {
    topic: 'Mẫu nguyên tử Bohr và laser',
    intro: 'Vì sao nguyên tử hidro phát ra những vạch quang phổ riêng biệt? Bohr trả lời bằng mô hình các quỹ đạo dừng. Tuần này các em cũng tìm hiểu laser — ứng dụng rực rỡ của lượng tử trong y học và công nghệ.',
    objectives: [
      'Phát biểu hai tiên đề Bohr.',
      'Áp dụng công thức bán kính quỹ đạo và mức năng lượng của hidro.',
      'Nêu nguyên lí và đặc điểm của tia laser.',
    ],
    theory: [
      { h: 'Hai tiên đề Bohr' },
      { ul: [
        'Tiên đề về trạng thái dừng: electron chỉ chuyển động trên các quỹ đạo dừng có năng lượng xác định, không bức xạ năng lượng.',
        'Tiên đề về bức xạ và hấp thụ: khi chuyển từ mức cao E_m xuống mức thấp E_n, nguyên tử phát ra photon hf = E_m - E_n; chuyển ngược lại thì hấp thụ.',
      ]},
      { h: 'Nguyên tử hidro' },
      { ul: [
        'Bán kính quỹ đạo dừng thứ n: r_n = n²·r₀, với r₀ = 0,53·10⁻¹⁰ m (bán kính Bohr).',
        'Mức năng lượng: E_n = -13,6/n² (eV), n = 1, 2, 3,…',
      ]},
      { h: 'Tia laser' },
      { p: 'Laser khuếch đại ánh sáng nhờ hiện tượng phát xạ cảm ứng (phát xạ kích thích): một photon đi qua làm nguyên tử kích thích phát ra photon thứ hai cùng pha, cùng hướng, cùng tần số.' },
      { h: 'Đặc điểm tia laser' },
      { ul: [
        'Tính đơn sắc cao, tính kết hợp cao.',
        'Tính định hướng cao (chùm song song), cường độ lớn.',
        'Ứng dụng: phẫu thuật, mổ mắt (LASIK), truyền thông cáp quang, đo khoảng cách.',
      ]},
      { note: 'Năng lượng càng âm thì electron càng liên kết chặt; n = 1 (E₁ = -13,6 eV) là trạng thái cơ bản bền nhất.' },
    ],
    examples: [
      { q: 'Tính bán kính quỹ đạo dừng thứ n = 3 của hidro.', a: 'r₃ = n²·r₀ = 9·0,53·10⁻¹⁰ = 4,77·10⁻¹⁰ m.' },
      { q: 'Tính năng lượng photon phát ra khi electron chuyển từ n = 2 về n = 1.', a: 'E₂ = -13,6/4 = -3,4 eV; E₁ = -13,6 eV. hf = E₂ - E₁ = -3,4 - (-13,6) = 10,2 eV.' },
      { q: 'Tính bước sóng của photon trên (dùng hc = 1240 eV·nm).', a: 'λ = hc/(hf) = 1240/10,2 ≈ 121,6 nm (vạch tử ngoại của dãy Lyman).' },
    ],
  },

  'H12LY-w21-quiz': {
    topic: 'Hạt nhân nguyên tử — cấu tạo',
    intro: 'Chương cuối cùng đưa các em vào lõi của nguyên tử: hạt nhân. Tuần này các em học hạt nhân được tạo từ proton và neutron như thế nào, ý nghĩa kí hiệu, đồng vị, và lực hạt nhân mạnh đến mức nào.',
    objectives: [
      'Mô tả cấu tạo hạt nhân và ý nghĩa kí hiệu hạt nhân.',
      'Phân biệt số khối A, số proton Z, số neutron N và khái niệm đồng vị.',
      'Nêu đặc điểm lực hạt nhân và đơn vị khối lượng nguyên tử u.',
    ],
    theory: [
      { h: 'Cấu tạo hạt nhân' },
      { p: 'Hạt nhân gồm các nuclôn: proton (mang điện dương, số Z) và neutron (trung hoà, số N). Tổng số nuclôn A = Z + N gọi là số khối. Kí hiệu hạt nhân: A trên, Z dưới bên trái kí hiệu nguyên tố.' },
      { h: 'Đồng vị' },
      { p: 'Các đồng vị của một nguyên tố là các hạt nhân có cùng số proton Z (cùng nguyên tố) nhưng khác số neutron N, do đó khác số khối A. Ví dụ ¹H, ²H (đơteri), ³H (triti) đều có Z = 1.' },
      { h: 'Đơn vị khối lượng và bán kính hạt nhân' },
      { ul: [
        'Đơn vị khối lượng nguyên tử: 1 u = 1/12 khối lượng nguyên tử ¹²C ≈ 1,66·10⁻²⁷ kg ≈ 931,5 MeV/c².',
        'Bán kính hạt nhân: R ≈ R₀·A^(1/3), với R₀ ≈ 1,2·10⁻¹⁵ m.',
      ]},
      { h: 'Lực hạt nhân' },
      { p: 'Lực hạt nhân (lực tương tác mạnh) liên kết các nuclôn, là lực mạnh nhất trong tự nhiên nhưng chỉ tác dụng trong tầm cực ngắn, cỡ 10⁻¹⁵ m. Nó thắng được lực đẩy tĩnh điện giữa các proton để giữ hạt nhân bền vững.' },
      { note: 'Đừng nhầm số khối A (số nuclôn) với khối lượng hạt nhân tính ra kg. A là số nguyên đếm nuclôn, không phải khối lượng.' },
    ],
    examples: [
      { q: 'Hạt nhân urani ²³⁵U (Z = 92). Tính số neutron.', a: 'N = A - Z = 235 - 92 = 143 neutron.' },
      { q: 'Đổi khối lượng 1 u ra năng lượng (MeV).', a: '1 u tương đương 931,5 MeV/c², nghĩa là khối lượng nghỉ này ứng với năng lượng 931,5 MeV.' },
      { q: 'Ước lượng tỉ lệ bán kính hạt nhân ²³⁸U so với ⁴He.', a: 'R tỉ lệ A^(1/3). R_U/R_He = (238/4)^(1/3) = (59,5)^(1/3) ≈ 3,9 lần.' },
    ],
  },

  'H12LY-w22-quiz': {
    topic: 'Năng lượng liên kết và độ hụt khối',
    intro: 'Vì sao khối lượng một hạt nhân nhỏ hơn tổng khối lượng các nuclôn tạo nên nó? Phần thiếu hụt đó đã chuyển thành năng lượng liên kết giữ hạt nhân. Đây là cốt lõi để hiểu vì sao phản ứng hạt nhân toả năng lượng khổng lồ.',
    objectives: [
      'Tính độ hụt khối và năng lượng liên kết của hạt nhân.',
      'Hiểu năng lượng liên kết riêng là thước đo độ bền.',
      'Xác định phản ứng toả hay thu năng lượng qua biến thiên khối lượng.',
    ],
    theory: [
      { h: 'Độ hụt khối' },
      { p: 'Khối lượng hạt nhân luôn nhỏ hơn tổng khối lượng các nuclôn riêng lẻ. Độ hụt khối: Δm = (Z·m_p + N·m_n) - m_hn.' },
      { h: 'Năng lượng liên kết' },
      { p: 'Theo hệ thức Einstein E = mc², năng lượng liên kết W_lk = Δm·c² là năng lượng toả ra khi các nuclôn riêng lẻ kết hợp thành hạt nhân (hay năng lượng cần để tách hạt nhân thành các nuclôn).' },
      { h: 'Năng lượng liên kết riêng' },
      { p: 'Năng lượng liên kết riêng = W_lk/A (MeV trên một nuclôn) là thước đo độ bền vững: càng lớn, hạt nhân càng bền. Các hạt nhân trung bình (A ≈ 50–80) bền nhất, đỉnh là ⁵⁶Fe với khoảng 8,8 MeV/nuclôn.' },
      { h: 'Phản ứng toả hay thu năng lượng' },
      { ul: [
        'Nếu tổng khối lượng trước phản ứng > sau: phản ứng TOẢ năng lượng ΔE = (m_trước - m_sau)·c².',
        'Nếu tổng khối lượng trước < sau: phản ứng THU năng lượng.',
      ]},
      { note: 'Tiện lợi: dùng 1 u = 931,5 MeV/c² để đổi nhanh từ độ hụt khối (tính theo u) ra năng lượng (theo MeV) — không cần thay c².' },
    ],
    examples: [
      { q: 'Hạt nhân ⁴He có Δm = 0,0304 u. Tính năng lượng liên kết.', a: 'W_lk = Δm·931,5 = 0,0304·931,5 ≈ 28,3 MeV.' },
      { q: 'Năng lượng liên kết của ⁴He là 28,3 MeV. Tính năng lượng liên kết riêng.', a: 'W_lk/A = 28,3/4 ≈ 7,07 MeV/nuclôn.' },
      { q: 'Hạt nhân ¹²C có Δm = 0,0989 u. Tính W_lk.', a: 'W_lk = 0,0989·931,5 ≈ 92,1 MeV.' },
    ],
  },

  'H12LY-w23-quiz': {
    topic: 'Phóng xạ α, β, γ',
    intro: 'Một số hạt nhân tự phát biến đổi và phát ra tia phóng xạ. Tuần này các em học ba loại phóng xạ α, β, γ, định luật phóng xạ và chu kì bán rã — đại lượng đo "tốc độ già" của chất phóng xạ.',
    objectives: [
      'Phân biệt các loại phóng xạ α, β⁻, β⁺, γ và bản chất hạt phát ra.',
      'Viết và áp dụng định luật phóng xạ.',
      'Liên hệ chu kì bán rã với hằng số phóng xạ.',
    ],
    theory: [
      { h: 'Các loại phóng xạ' },
      { ul: [
        'Phóng xạ α: phát ra hạt α (hạt nhân ⁴He, gồm 2 proton + 2 neutron); A giảm 4, Z giảm 2.',
        'Phóng xạ β⁻: neutron biến thành proton, phát ra electron; A không đổi, Z tăng 1.',
        'Phóng xạ β⁺: proton biến thành neutron, phát ra positron; A không đổi, Z giảm 1.',
        'Phóng xạ γ: phát photon năng lượng cao khi hạt nhân chuyển từ trạng thái kích thích về cơ bản; A, Z không đổi.',
      ]},
      { h: 'Định luật phóng xạ' },
      { p: 'Số hạt nhân chưa phân rã giảm theo hàm mũ: N = N₀·e^(-λt), với λ là hằng số phóng xạ. Khối lượng cũng giảm theo cùng quy luật: m = m₀·e^(-λt).' },
      { h: 'Chu kì bán rã' },
      { p: 'Chu kì bán rã T₁/₂ là thời gian để số hạt nhân giảm còn một nửa. Liên hệ: T₁/₂ = ln2/λ ≈ 0,693/λ. Sau mỗi chu kì bán rã, số hạt nhân còn lại giảm đi một nửa.' },
      { note: 'Phóng xạ là quá trình ngẫu nhiên và tự phát, không phụ thuộc nhiệt độ, áp suất hay trạng thái hoá học của chất.' },
    ],
    examples: [
      { q: 'Chất phóng xạ có λ = 0,0231 /ngày. Tính chu kì bán rã.', a: 'T₁/₂ = ln2/λ = 0,693/0,0231 ≈ 30 ngày.' },
      { q: 'Hoàn thành: ²³⁸U → ²³⁴Th + ? Xác định loại phóng xạ.', a: 'A giảm 4 (238→234), Z giảm 2 (92→90) → phát hạt α (⁴He).' },
      { q: 'Hoàn thành: ¹⁴C → ¹⁴N + ? Xác định loại phóng xạ.', a: 'A không đổi (14), Z tăng 1 (6→7) → phóng xạ β⁻ (phát electron).' },
    ],
  },

  'H12LY-w24-quiz': {
    topic: 'Bài tập phóng xạ và định luật bảo toàn',
    intro: 'Tuần này các em luyện kĩ năng tính toán phóng xạ qua công thức theo số chu kì bán rã, và áp dụng các định luật bảo toàn để cân bằng phương trình phản ứng hạt nhân — dạng bài chắc chắn có trong đề thi.',
    objectives: [
      'Tính lượng chất còn lại và đã phân rã theo số chu kì bán rã.',
      'Nêu các đại lượng bảo toàn trong phản ứng hạt nhân.',
      'Cân bằng phương trình phản ứng hạt nhân.',
    ],
    theory: [
      { h: 'Công thức theo số chu kì bán rã' },
      { p: 'Sau thời gian t = n·T₁/₂ (n chu kì bán rã), số hạt nhân còn lại: N = N₀·(1/2)^n = N₀/2^n. Phần đã phân rã: ΔN = N₀ - N = N₀·(1 - 1/2^n).' },
      { h: 'Các định luật bảo toàn trong phản ứng hạt nhân' },
      { ul: [
        'Bảo toàn số nuclôn (số khối A): tổng A trước = tổng A sau.',
        'Bảo toàn điện tích (số Z): tổng Z trước = tổng Z sau.',
        'Bảo toàn năng lượng toàn phần và bảo toàn động lượng.',
      ]},
      { h: 'Lưu ý khối lượng tĩnh' },
      { p: 'Khối lượng nghỉ KHÔNG bảo toàn: phần chênh lệch chuyển thành năng lượng (hoặc ngược lại). Đây chính là nguồn năng lượng của phản ứng hạt nhân.' },
      { note: 'Để cân bằng phương trình hạt nhân, chỉ cần cho tổng A và tổng Z hai vế bằng nhau là tìm được hạt còn thiếu.' },
    ],
    examples: [
      { q: 'Chất phóng xạ T₁/₂ = 4 ngày. Sau 12 ngày, tỉ lệ còn lại bao nhiêu?', a: 'n = 12/4 = 3 → N/N₀ = (1/2)³ = 1/8.' },
      { q: 'Sau 2 chu kì bán rã, tỉ lệ chất đã phân rã là bao nhiêu?', a: 'Còn lại 1/2² = 1/4 → đã phân rã 1 - 1/4 = 3/4.' },
      { q: 'Cân bằng: ²⁷Al + α → ³⁰P + X. Tìm X.', a: 'Trái: A = 27 + 4 = 31, Z = 13 + 2 = 15. Phải ³⁰P có A = 30, Z = 15. X có A = 1, Z = 0 → neutron (¹n).' },
    ],
  },

  'H12LY-w25-quiz': {
    topic: 'Phản ứng phân hạch',
    intro: 'Năng lượng hạt nhân bắt đầu từ phân hạch: một hạt nhân nặng vỡ ra giải phóng năng lượng khổng lồ. Tuần này các em hiểu phản ứng dây chuyền, khối lượng tới hạn và nguyên lí nhà máy điện hạt nhân.',
    objectives: [
      'Mô tả phản ứng phân hạch và năng lượng giải phóng.',
      'Giải thích phản ứng dây chuyền và khối lượng tới hạn.',
      'Nêu vai trò các bộ phận trong lò phản ứng.',
    ],
    theory: [
      { h: 'Phản ứng phân hạch' },
      { p: 'Phân hạch là phản ứng trong đó một hạt nhân nặng (ví dụ ²³⁵U) hấp thụ một neutron rồi vỡ thành hai hạt nhân trung bình, kèm theo vài neutron và năng lượng lớn. Mỗi phân hạch ²³⁵U giải phóng khoảng 200 MeV.' },
      { h: 'Phản ứng dây chuyền' },
      { p: 'Các neutron sinh ra lại gây phân hạch các hạt nhân khác, tạo phản ứng dây chuyền. Điều kiện duy trì: khối lượng nhiên liệu ≥ khối lượng tới hạn để số neutron sinh ra đủ tiếp tục dây chuyền.' },
      { h: 'Lò phản ứng hạt nhân' },
      { ul: [
        'Nhiên liệu: ²³⁵U (hoặc ²³⁹Pu).',
        'Chất làm chậm neutron: nước thường, nước nặng hoặc graphit — làm neutron nhanh thành neutron chậm để ²³⁵U dễ hấp thụ.',
        'Thanh điều khiển: bằng bo (B) hoặc cađimi (Cd) hấp thụ bớt neutron, điều chỉnh phản ứng.',
      ]},
      { note: 'Trong nhà máy điện hạt nhân, phản ứng dây chuyền được giữ ở mức ổn định (hệ số nhân neutron ≈ 1); trong bom nguyên tử thì để phản ứng bùng nổ không kiểm soát.' },
    ],
    examples: [
      { q: 'Mỗi phân hạch ²³⁵U toả ~200 MeV. Tính năng lượng (J) khi 1 hạt nhân phân hạch (1 MeV = 1,6·10⁻¹³ J).', a: 'E = 200·1,6·10⁻¹³ = 3,2·10⁻¹¹ J.' },
      { q: 'Phân hạch 1 mol ²³⁵U (N_A = 6,02·10²³ hạt) toả bao nhiêu năng lượng?', a: 'E = 6,02·10²³ · 3,2·10⁻¹¹ ≈ 1,93·10¹³ J — tương đương đốt hàng nghìn tấn than.' },
      { q: 'Vì sao cần chất làm chậm neutron trong lò?', a: 'Neutron nhanh ít bị ²³⁵U hấp thụ; làm chậm chúng (qua va chạm với nước/graphit) giúp tăng xác suất gây phân hạch, duy trì dây chuyền.' },
    ],
  },

  'H12LY-w26-quiz': {
    topic: 'Phản ứng nhiệt hạch',
    intro: 'Nguồn năng lượng của Mặt Trời và mọi ngôi sao chính là nhiệt hạch — sự kết hợp các hạt nhân nhẹ. Tuần này các em học phản ứng nhiệt hạch, điều kiện khắc nghiệt để nó xảy ra và triển vọng năng lượng sạch trong tương lai.',
    objectives: [
      'Mô tả phản ứng nhiệt hạch và nêu ví dụ tiêu biểu.',
      'Nêu điều kiện xảy ra nhiệt hạch.',
      'So sánh ưu điểm của nhiệt hạch với phân hạch.',
    ],
    theory: [
      { h: 'Phản ứng nhiệt hạch' },
      { p: 'Nhiệt hạch là phản ứng trong đó hai hạt nhân nhẹ (như hidro, đơteri D, triti T) kết hợp thành hạt nhân nặng hơn (heli), giải phóng năng lượng lớn. Phản ứng tiêu biểu: ²D + ³T → ⁴He + ¹n + 17,6 MeV.' },
      { h: 'Điều kiện xảy ra' },
      { p: 'Cần nhiệt độ cực cao (cỡ 10⁸ K) và mật độ lớn để các hạt nhân có đủ động năng vượt qua lực đẩy tĩnh điện Coulomb, lại gần đến tầm tác dụng của lực hạt nhân. Khi đó vật chất ở trạng thái plasma.' },
      { h: 'Nguồn năng lượng của các sao' },
      { p: 'Mặt Trời và các ngôi sao toả sáng nhờ chuỗi phản ứng nhiệt hạch biến hidro thành heli trong lõi sao.' },
      { h: 'Ưu điểm so với phân hạch' },
      { ul: [
        'Nhiên liệu (đơteri) dồi dào, có sẵn trong nước biển.',
        'Ít chất thải phóng xạ, sạch hơn phân hạch.',
        'Năng lượng trên mỗi đơn vị khối lượng lớn — nhưng kĩ thuật rất khó, chưa thương mại hoá.',
      ]},
      { note: 'Bom khinh khí (bom H) dùng nhiệt hạch, được kích nổ bằng một quả bom phân hạch để tạo nhiệt độ siêu cao ban đầu.' },
    ],
    examples: [
      { q: 'Phản ứng ²D + ³T → ⁴He + ¹n toả 17,6 MeV. Đổi ra jun (1 MeV = 1,6·10⁻¹³ J).', a: 'E = 17,6·1,6·10⁻¹³ = 2,82·10⁻¹² J cho mỗi phản ứng.' },
      { q: 'Vì sao nhiệt hạch cần nhiệt độ rất cao?', a: 'Hai hạt nhân đều mang điện dương, đẩy nhau bằng lực Coulomb. Phải có động năng (nhiệt độ) rất lớn để tiến đủ gần cho lực hạt nhân hút thắng.' },
      { q: 'So sánh năng lượng mỗi nuclôn của nhiệt hạch D+T (17,6 MeV cho 5 nuclôn) với phân hạch U (200 MeV cho 235 nuclôn).', a: 'Nhiệt hạch: 17,6/5 ≈ 3,5 MeV/nuclôn; phân hạch: 200/235 ≈ 0,85 MeV/nuclôn. Tính trên mỗi nuclôn, nhiệt hạch toả nhiều hơn.' },
    ],
  },

  'H12LY-w27-quiz': {
    topic: 'Ôn tập dao động cơ và sóng cơ',
    intro: 'Bắt đầu chuỗi ôn tập tổng hợp. Tuần này các em rà lại toàn bộ dao động cơ và sóng cơ — hai chương đầu của chương trình, thường chiếm nhiều câu dễ và trung bình trong đề thi tốt nghiệp.',
    objectives: [
      'Hệ thống công thức dao động và sóng cơ.',
      'Giải nhanh bài tập con lắc, sóng, giao thoa.',
      'Củng cố kĩ năng đổi đơn vị.',
    ],
    theory: [
      { h: 'Dao động điều hoà' },
      { ul: [
        'x = A·cos(ωt + φ); T = 2π/ω; f = 1/T.',
        'vmax = ωA; amax = ω²A; a = -ω²x.',
      ]},
      { h: 'Con lắc' },
      { ul: [
        'Con lắc lò xo: T = 2π√(m/k).',
        'Con lắc đơn: T = 2π√(l/g).',
      ]},
      { h: 'Sóng cơ' },
      { ul: [
        'λ = v·T = v/f.',
        'Giao thoa cực đại (cùng pha): d₂ - d₁ = kλ; cực tiểu: (k + 1/2)λ.',
        'Sóng dừng hai đầu cố định: l = k·λ/2.',
      ]},
      { h: 'Tốc độ âm tham khảo' },
      { p: 'Không khí ~340 m/s, nước ~1500 m/s, thép ~5000 m/s — âm truyền nhanh hơn trong môi trường đặc, cứng.' },
      { note: 'Nhiều câu chỉ cần một phép thế công thức. Luyện tính nhanh và đổi đơn vị (cm ↔ m, ms ↔ s) để không mất điểm đáng tiếc.' },
    ],
    examples: [
      { q: 'Con lắc lò xo dao động với T = 0,5 s. Tính tần số.', a: 'f = 1/T = 1/0,5 = 2 Hz.' },
      { q: 'Vật dao động điều hoà A = 10 cm, ω = 10 rad/s. Tính vmax.', a: 'vmax = ωA = 10·10 = 100 cm/s = 1 m/s.' },
      { q: 'Sóng có T = 0,01 s, v = 200 m/s. Tính bước sóng.', a: 'λ = v·T = 200·0,01 = 2 m.' },
    ],
  },

  'H12LY-w28-quiz': {
    topic: 'Ôn tập điện xoay chiều',
    intro: 'Điện xoay chiều là chương "nặng kí" của đề thi. Tuần này các em ôn lại tổng trở, công suất, cộng hưởng, biến áp và truyền tải — tập trung vào dạng tính nhanh thường gặp.',
    objectives: [
      'Hệ thống công thức mạch RLC, cộng hưởng, biến áp.',
      'Tính tổng trở, hệ số công suất, công suất tiêu thụ.',
      'Vận dụng bài toán truyền tải điện năng.',
    ],
    theory: [
      { h: 'Mạch RLC nối tiếp' },
      { ul: [
        'ZL = ωL; ZC = 1/(ωC); Z = √(R² + (ZL - ZC)²).',
        'cosφ = R/Z; tanφ = (ZL - ZC)/R.',
        'P = U·I·cosφ = I²R; I = U/Z.',
      ]},
      { h: 'Cộng hưởng điện' },
      { p: 'Khi ZL = ZC: Z = R nhỏ nhất, I = U/R cực đại, cosφ = 1, P = U²/R cực đại.' },
      { h: 'Máy biến áp và truyền tải' },
      { ul: [
        'U₁/U₂ = N₁/N₂; U₁I₁ = U₂I₂ (biến áp lí tưởng).',
        'Hao phí: ΔP = P²R/U² → tăng U để giảm hao phí.',
      ]},
      { note: 'Phân biệt giá trị hiệu dụng và cực đại: U = U₀/√2, I = I₀/√2. Mọi công suất, định luật Ôm dùng giá trị hiệu dụng.' },
    ],
    examples: [
      { q: 'Mạch RLC: R = 30 Ω, ZL = 60 Ω, ZC = 20 Ω. Tính tổng trở.', a: 'Z = √(30² + (60-20)²) = √(900 + 1600) = √2500 = 50 Ω.' },
      { q: 'Mạch RLC: U = 200 V, I = 2 A, P = 320 W. Tính cosφ.', a: 'cosφ = P/(U·I) = 320/(200·2) = 0,8.' },
      { q: 'Biến áp: N₁ = 1000, N₂ = 100, U₁ = 220 V. Tính U₂.', a: 'U₂ = U₁·N₂/N₁ = 220·100/1000 = 22 V.' },
    ],
  },

  'H12LY-w29-quiz': {
    topic: 'Ôn tập sóng ánh sáng và lượng tử',
    intro: 'Tuần này các em ôn hai chương về ánh sáng: tính chất sóng (giao thoa, thang sóng) và tính chất hạt (quang điện, photon). Đây là minh chứng cho lưỡng tính sóng – hạt của ánh sáng.',
    objectives: [
      'Hệ thống công thức giao thoa và năng lượng photon.',
      'Phân biệt các vùng của thang sóng điện từ.',
      'Vận dụng phương trình quang điện và năng lượng photon.',
    ],
    theory: [
      { h: 'Tính chất sóng của ánh sáng' },
      { ul: [
        'Giao thoa khe Young: i = λD/a; vân sáng x_s = k·i; vân tối x_t = (k - 1/2)·i.',
        'Thang sóng (λ tăng dần): γ < X < UV < ánh sáng < IR < vô tuyến.',
      ]},
      { h: 'Tính chất hạt của ánh sáng' },
      { ul: [
        'Năng lượng photon: ε = hf = hc/λ (tiện dùng hc = 1240 eV·nm).',
        'Quang điện: hf = A + (1/2)mv₀max²; điều kiện λ ≤ λ₀ = hc/A.',
      ]},
      { h: 'Một số bức xạ' },
      { ul: [
        'Tia tử ngoại (UV): λ < 380 nm, gây ion hoá, làm phát quang.',
        'Tia hồng ngoại (IR): λ > 760 nm, tác dụng nhiệt mạnh.',
        'Quang dẫn: ánh sáng làm tăng độ dẫn điện của bán dẫn.',
      ]},
      { note: 'Hiện tượng giao thoa chứng tỏ tính sóng; hiện tượng quang điện chứng tỏ tính hạt. Cùng một ánh sáng vừa là sóng vừa là hạt.' },
    ],
    examples: [
      { q: 'Giao thoa Young: a = 0,5 mm, D = 2 m, λ = 600 nm. Tính khoảng vân.', a: 'i = λD/a = (6·10⁻⁷·2)/(5·10⁻⁴) = 2,4·10⁻³ m = 2,4 mm.' },
      { q: 'Tính năng lượng photon ánh sáng đỏ λ = 700 nm.', a: 'ε = 1240/700 ≈ 1,77 eV.' },
      { q: 'Tính năng lượng photon ánh sáng lục λ = 500 nm.', a: 'ε = 1240/500 = 2,48 eV.' },
    ],
  },

  'H12LY-w30-quiz': {
    topic: 'Ôn tập hạt nhân nguyên tử',
    intro: 'Tuần này các em ôn toàn bộ chương hạt nhân: cấu tạo, năng lượng liên kết, phóng xạ và phản ứng hạt nhân. Đây là chương cho nhiều câu vận dụng quen thuộc, hãy nắm chắc các công thức nền.',
    objectives: [
      'Hệ thống công thức cấu tạo và năng lượng hạt nhân.',
      'Tính bài toán phóng xạ theo chu kì bán rã.',
      'Áp dụng định luật bảo toàn trong phản ứng hạt nhân.',
    ],
    theory: [
      { h: 'Cấu tạo và năng lượng' },
      { ul: [
        'A = Z + N; N = A - Z.',
        'Độ hụt khối: Δm = (Z·m_p + N·m_n) - m_hn.',
        'Năng lượng liên kết: W_lk = Δm·c²; dùng 1 u = 931,5 MeV/c².',
        'Năng lượng liên kết riêng W_lk/A là thước đo độ bền (⁵⁶Fe bền nhất).',
      ]},
      { h: 'Phóng xạ' },
      { ul: [
        'N = N₀·e^(-λt) = N₀/2^n với n = t/T₁/₂.',
        'T₁/₂ = ln2/λ.',
      ]},
      { h: 'Phản ứng hạt nhân' },
      { ul: [
        'Bảo toàn A, Z, năng lượng toàn phần, động lượng.',
        'Khối lượng nghỉ KHÔNG bảo toàn (chuyển thành năng lượng).',
        'Toả năng lượng nếu m_trước > m_sau.',
      ]},
      { note: 'Tia α đâm xuyên yếu nhất (chặn được bằng tờ giấy), tia γ mạnh nhất (cần chì dày). Thứ tự đâm xuyên: γ > X > β > α.' },
    ],
    examples: [
      { q: 'Hạt nhân ²³⁸U có Z = 92. Tính số neutron.', a: 'N = A - Z = 238 - 92 = 146 neutron.' },
      { q: 'Chất phóng xạ sau 3 chu kì bán rã còn lại bao nhiêu phần?', a: 'N/N₀ = (1/2)³ = 1/8.' },
      { q: 'Hạt nhân có Δm = 0,0989 u. Tính năng lượng liên kết.', a: 'W_lk = 0,0989·931,5 ≈ 92,1 MeV.' },
    ],
  },

  'H12LY-w31-quiz': {
    topic: 'Đề luyện thi — tổng hợp 1',
    intro: 'Bắt đầu chuỗi đề luyện thi tổng hợp. Tuần này các em làm các câu trộn nhiều chủ đề như đề thi thật: dao động, sóng, điện xoay chiều, lượng tử, hạt nhân. Hãy bấm giờ để rèn tốc độ.',
    objectives: [
      'Vận dụng linh hoạt công thức nhiều chương.',
      'Rèn kĩ năng phân loại nhanh dạng bài.',
      'Quản lí thời gian làm bài.',
    ],
    theory: [
      { h: 'Chiến lược làm đề trộn' },
      { p: 'Đề tốt nghiệp trộn câu từ mọi chương. Đọc đề là phải nhận ngay thuộc chủ đề nào, gọi đúng công thức nền. Mục tiêu mỗi câu vận dụng ngắn nên xong trong khoảng 1 phút.' },
      { h: 'Bộ công thức nhanh cần thuộc' },
      { ul: [
        'Dao động: vmax = ωA; ω = 2π/T.',
        'Sóng: v = λf; số cực đại theo -AB/λ < k < AB/λ.',
        'Điện: cosφ = P/(UI).',
        'Photon: ε = 1240/λ(nm) (eV).',
        'Phóng xạ: N = N₀/2^n.',
      ]},
      { h: 'Thứ tự ưu tiên' },
      { p: 'Làm các câu lí thuyết và vận dụng ngắn trước; để câu tính dài về sau. Không sa đà vào một câu khó quá lâu.' },
      { note: 'Ghi nhanh đơn vị bên cạnh kết quả và kiểm tra tính hợp lí (ví dụ tốc độ không thể vượt c, biên độ không âm).' },
    ],
    examples: [
      { q: 'Vật dao động điều hoà A = 5 cm, T = 0,5 s. Tính vmax.', a: 'ω = 2π/T = 2π/0,5 = 4π rad/s. vmax = ωA = 4π·5 = 20π ≈ 62,8 cm/s.' },
      { q: 'Mạch RLC: U = 200 V, I = 2 A, P = 320 W. Tính cosφ.', a: 'cosφ = P/(UI) = 320/(200·2) = 0,8.' },
      { q: 'Chất phóng xạ T₁/₂ = 5 ngày. Sau 20 ngày còn lại bao nhiêu?', a: 'n = 20/5 = 4 → N/N₀ = 1/2⁴ = 1/16.' },
    ],
  },

  'H12LY-w32-quiz': {
    topic: 'Đề luyện thi — tổng hợp 2',
    intro: 'Tiếp tục luyện đề tổng hợp. Tuần này các em gặp các câu về con lắc, mạch RL, biến áp, mạch dao động LC và quang điện. Hãy tự chấm và ghi lại những công thức còn quên.',
    objectives: [
      'Củng cố công thức con lắc và mạch điện.',
      'Vận dụng mạch dao động LC và sóng vô tuyến.',
      'Nhận biết điều kiện xảy ra quang điện.',
    ],
    theory: [
      { h: 'Con lắc và mạch điện' },
      { ul: [
        'f = (1/2π)√(k/m) (con lắc lò xo).',
        'Mạch RL: Z = √(R² + ZL²); cosφ = R/Z.',
        'Biến áp lí tưởng: U₁I₁ = U₂I₂.',
      ]},
      { h: 'Mạch dao động và sóng vô tuyến' },
      { ul: [
        'f = 1/(2π√(LC)); λ = c/f.',
        'Bước sóng thu phụ thuộc L, C của mạch chọn sóng.',
      ]},
      { h: 'Quang điện' },
      { p: 'Quang điện chỉ xảy ra khi λ ≤ λ₀. Ánh sáng có bước sóng dài hơn giới hạn (ví dụ ánh sáng đỏ với kim loại có λ₀ nhỏ) sẽ không gây quang điện dù cường độ lớn.' },
      { note: 'Giao thoa: điểm cùng pha cách hai nguồn d₁, d₂ là cực đại nếu |d₂ - d₁| là bội nguyên của λ.' },
    ],
    examples: [
      { q: 'Con lắc lò xo m = 200 g, k = 80 N/m. Tính tần số.', a: 'f = (1/2π)√(k/m) = (1/2π)√(80/0,2) = (1/2π)·20 ≈ 3,18 Hz.' },
      { q: 'Mạch RL: R = 80 Ω, ZL = 60 Ω. Tính cosφ.', a: 'Z = √(80² + 60²) = 100 Ω; cosφ = R/Z = 80/100 = 0,8.' },
      { q: 'Mạch dao động LC có f = 1 MHz. Tính bước sóng vô tuyến.', a: 'λ = c/f = (3·10⁸)/(10⁶) = 300 m.' },
    ],
  },

  'H12LY-w33-quiz': {
    topic: 'Đề luyện thi — tổng hợp 3',
    intro: 'Đề luyện thi thứ ba với các câu về năng lượng dao động, cộng hưởng, giao thoa, laser và nhiệt hạch. Hãy chú ý những câu kết hợp lí thuyết với một bước tính nhỏ — dạng rất hay xuất hiện.',
    objectives: [
      'Vận dụng năng lượng dao động và cộng hưởng.',
      'Tính vị trí vân trong giao thoa.',
      'Ôn tính chất laser và phản ứng nhiệt hạch.',
    ],
    theory: [
      { h: 'Năng lượng và cộng hưởng' },
      { ul: [
        'Cơ năng con lắc lò xo: W = (1/2)kA² → k = 2W/A².',
        'Cộng hưởng: Z = R, I = U/R, P = U²/R.',
      ]},
      { h: 'Giao thoa ánh sáng' },
      { p: 'Vân sáng bậc k cách vân trung tâm x = k·i, với i = λD/a. Vân trung tâm ứng với k = 0.' },
      { h: 'Laser và nhiệt hạch' },
      { ul: [
        'Laser: đơn sắc, kết hợp, định hướng, cường độ cao; dựa trên phát xạ cảm ứng.',
        'Nhiệt hạch: hai hạt nhân nhẹ hợp thành hạt nặng hơn, cần nhiệt độ cực cao.',
      ]},
      { note: 'Âm sắc giúp phân biệt hai nhạc cụ phát cùng một nốt (cùng tần số) nhưng nghe khác nhau, do khác đồ thị dao động (các hoạ âm).' },
    ],
    examples: [
      { q: 'Con lắc lò xo nằm ngang có W = 0,1 J, A = 10 cm. Tính độ cứng k.', a: 'W = (1/2)kA² → k = 2W/A² = 0,2/(0,1)² = 0,2/0,01 = 20 N/m.' },
      { q: 'Mạch RLC cộng hưởng, R = 50 Ω, U = 100 V. Tính công suất.', a: 'Cộng hưởng: I = U/R = 100/50 = 2 A. P = I²R = 4·50 = 200 W.' },
      { q: 'Giao thoa Young: i = 1 mm. Vân sáng bậc 3 cách vân trung tâm bao nhiêu?', a: 'x₃ = 3·i = 3·1 = 3 mm.' },
    ],
  },

  'H12LY-w34-quiz': {
    topic: 'Đề luyện thi — tổng hợp 4',
    intro: 'Đề luyện thi cuối trước tổng kết. Tuần này các em ôn con lắc đơn, mạch LC, thang sóng, cộng hưởng và phóng xạ α. Hãy làm như thi thật và rà soát kĩ những điểm còn yếu.',
    objectives: [
      'Tính chu kì con lắc đơn và tần số mạch LC.',
      'Nhận biết các vùng của thang sóng điện từ.',
      'Cân bằng phản ứng phóng xạ α và xác định vân trung tâm.',
    ],
    theory: [
      { h: 'Con lắc và mạch LC' },
      { ul: [
        'Con lắc đơn: T = 2π√(l/g).',
        'Mạch LC: f = 1/(2π√(LC)).',
      ]},
      { h: 'Thang sóng điện từ' },
      { ul: [
        'Tia hồng ngoại: λ > 760 nm (tác dụng nhiệt).',
        'Ánh sáng nhìn thấy: 380 – 760 nm.',
        'Tia tử ngoại: λ < 380 nm.',
      ]},
      { h: 'Cộng hưởng và phóng xạ' },
      { ul: [
        'Cộng hưởng khi ZL = ZC → I cực đại.',
        'Phóng xạ α: A giảm 4, Z giảm 2; thường kèm tia γ và toả năng lượng.',
        'Giao thoa Young: vân trung tâm ứng với k = 0 (x = 0).',
      ]},
      { note: 'Phản ứng α luôn toả năng lượng (sản phẩm bền hơn). Khi cân bằng phương trình, kiểm tra tổng A và tổng Z hai vế.' },
    ],
    examples: [
      { q: 'Con lắc đơn l = 2,5 m, g = 10 m/s². Tính chu kì.', a: 'T = 2π√(l/g) = 2π√(2,5/10) = 2π√(0,25) = 2π·0,5 = π ≈ 3,14 s.' },
      { q: 'Mạch LC: L = 4 mH, C = 25 nF. Tính tần số riêng.', a: 'f = 1/(2π√(LC)) = 1/(2π√(4·10⁻³·25·10⁻⁹)) = 1/(2π√(10⁻¹⁰)) = 1/(2π·10⁻⁵) ≈ 15,9 kHz.' },
      { q: 'Cân bằng: ²³⁸U → ²³⁴Th + X. Xác định X.', a: 'A: 238 = 234 + 4; Z: 92 = 90 + 2. X có A = 4, Z = 2 → hạt α (⁴He).' },
    ],
  },

  'H12LY-w35-quiz': {
    topic: 'Tổng kết — chuẩn bị thi tốt nghiệp',
    intro: 'Tuần cuối cùng. Các em đã đi qua toàn bộ chương trình Vật lí 12. Bây giờ là lúc nắm vững cấu trúc đề thi, chiến thuật làm bài và những lỗi cần tránh để đạt điểm cao trong kì thi tốt nghiệp THPT.',
    objectives: [
      'Nắm cấu trúc đề thi tốt nghiệp môn Vật lí.',
      'Hình thành chiến thuật làm bài hiệu quả.',
      'Nhận diện và tránh các lỗi thường gặp.',
    ],
    theory: [
      { h: 'Cấu trúc đề thi' },
      { p: 'Đề thi tốt nghiệp THPT môn Vật lí thường gồm các câu trắc nghiệm làm trong thời gian giới hạn, trải đều bốn mức độ: nhận biết, thông hiểu, vận dụng, vận dụng cao. Phần lớn là vận dụng ngắn (1–2 bước tính) ở các chủ đề trọng tâm: dao động, sóng, điện xoay chiều, hạt nhân.' },
      { h: 'Chiến thuật làm bài' },
      { ul: [
        'Làm câu dễ (nhận biết, thông hiểu) và vận dụng ngắn trước.',
        'Đánh dấu câu khó, quay lại sau; không sa đà quá lâu một câu.',
        'Dành 5–10 phút cuối soát đáp án và phiếu trả lời trắc nghiệm.',
      ]},
      { h: 'Lỗi thường gặp cần tránh' },
      { ul: [
        'Nhầm đơn vị: cm với m, mA với A, ms với s.',
        'Nhầm giá trị hiệu dụng và cực đại trong điện xoay chiều (quên chia √2).',
        'Nhầm tần số góc ω (rad/s) với tần số f (Hz).',
      ]},
      { note: 'Kết hợp ba việc: nắm chắc công thức nền, luyện đề đều đặn, và rèn kĩ năng tính nhanh. Tô đúng số câu trên phiếu trả lời cũng quan trọng như giải đúng.' },
    ],
    examples: [
      { q: 'Vì sao phải phân biệt giá trị hiệu dụng và cực đại?', a: 'Đề thường cho U = 220 V (hiệu dụng) nhưng hỏi U₀ (cực đại): U₀ = U√2 = 220√2 ≈ 311 V. Nhầm hai đại lượng này dẫn đến sai kết quả ngay.' },
      { q: 'Đổi nhanh năng lượng photon từ bước sóng λ = 620 nm ra eV.', a: 'Dùng ε = 1240/λ(nm) = 1240/620 = 2 eV. Mẹo này giúp tính nhanh trong phòng thi.' },
      { q: 'Một câu cho T₁/₂ = 8 ngày, hỏi sau 24 ngày còn lại bao nhiêu phần?', a: 'n = 24/8 = 3 → N/N₀ = (1/2)³ = 1/8. Dùng công thức N₀/2^n để tính tức thì.' },
    ],
  },

  'H12LY-w36-quiz': {
    topic: 'Kết thúc Vật Lý THPT — Khám phá vũ trụ bắt đầu từ đây',
    intro: 'Tuần cuối của hành trình Vật Lý THPT — không phải để ôn thêm công thức, mà để nhìn lại cả một bầu trời kiến thức đã mở ra: từ dao động chiếc lắc đến sóng điện từ, từ quang phổ ánh sáng đến phân rã hạt nhân. Vũ trụ rộng lớn hơn bất kì bài thi nào.',
    objectives: [
      'Hệ thống hoá toàn bộ chương trình Vật Lý 3 năm THPT theo các lĩnh vực lớn.',
      'Nhận ra sự kết nối giữa Vật Lý THPT với khoa học, công nghệ và đời sống.',
      'Xây dựng tình yêu khoa học và định hướng học tập tiếp theo.',
    ],
    theory: [
      { h: 'Bản đồ Vật Lý 3 năm THPT' },
      { ul: [
        'Lớp 10: Động học, động lực học, tĩnh học, các định luật bảo toàn (năng lượng, động lượng), nhiệt động lực học.',
        'Lớp 11: Điện trường, mạch điện, từ trường, cảm ứng điện từ, dao động cơ và sóng cơ.',
        'Lớp 12: Dao động/sóng điện từ, điện xoay chiều, ánh sáng (giao thoa, quang phổ), lượng tử ánh sáng, vật lý hạt nhân nguyên tử.',
      ] },
      { h: 'Vật Lý ở khắp nơi trong cuộc sống' },
      { ul: [
        'Điện thoại thông minh: sóng điện từ (4G/5G/WiFi), màn hình LCD (phân cực ánh sáng), cảm biến gia tốc (quán tính).',
        'Y tế: MRI (từ trường cực mạnh), X-quang (tia X), siêu âm (sóng âm), xạ trị (phóng xạ).',
        'Năng lượng: Pin mặt trời (hiệu ứng quang điện), điện hạt nhân (phân rã), turbin gió (cảm ứng điện từ).',
        'Vũ trụ học: Vụ nổ lớn, sóng hấp dẫn, lỗ đen — Vật Lý là ngôn ngữ của vũ trụ.',
      ] },
      { h: 'Vật Lý ở đại học — những gì chờ đón' },
      { p: 'Nếu em học các ngành kỹ thuật, Vật Lý, hoặc Y khoa: Cơ học lượng tử, Điện tử học, Quang học hiện đại và Vật lý hạt nhân sẽ đi sâu hơn nhiều. Nếu em học ngành khác: Vật Lý THPT đã cho em tư duy hệ thống — nhìn thấy nguyên nhân–kết quả, xây dựng mô hình và kiểm chứng bằng thực nghiệm.' },
      { h: 'Lời khuyên cho kì thi tốt nghiệp' },
      { ul: [
        'Câu trắc nghiệm nhanh: nhận dạng công thức, thay số, kiểm tra đơn vị.',
        'Câu khó tổng hợp: vẽ sơ đồ mạch điện / đường đi của ánh sáng / sơ đồ phân rã trước khi tính.',
        'Công thức lượng giác và dao động: sin²ω t + cos²ω t = 1, công thức cộng pha — học thuộc để không mất điểm cơ bản.',
        'Kiểm tra số liệu và đơn vị: sai đơn vị là sai hoàn toàn dù phép tính đúng.',
      ] },
      { h: 'Một câu hỏi mở cho em' },
      { p: 'Richard Feynman — nhà vật lý đoạt giải Nobel — từng nói: "Vật Lý giống như tình dục: có thể có kết quả thực tế, nhưng đó không phải lý do chúng tôi theo đuổi nó." Vật Lý cuốn hút vì nó hỏi những câu hỏi sâu nhất về thực tại. Điều gì trong Vật Lý THPT khiến em tò mò nhất?' },
      { note: 'Chúc mừng em đã hoàn thành hành trình Vật Lý THPT. Dù đi theo con đường nào, tư duy khoa học em có được — quan sát, đặt câu hỏi, kiểm chứng — sẽ là công cụ vô giá suốt cuộc đời.' },
    ],
    examples: [
      { q: 'Nêu 3 ứng dụng thực tế của Vật Lý mà em gặp trong cuộc sống hàng ngày và chỉ ra nguyên lý Vật Lý liên quan.', a: 'Ví dụ: (1) Lò vi sóng — sóng điện từ vi sóng (GHz) làm dao động phân tử nước, sinh nhiệt; (2) Mạng WiFi — sóng điện từ dải 2.4 GHz hoặc 5 GHz truyền dữ liệu; (3) Tai nghe chống ồn — sóng âm nghịch pha triệt tiêu tiếng ồn (giao thoa triệt tiêu). Em có thể liệt kê bất kì ứng dụng nào em biết, kèm nguyên lý.' },
      { q: 'Hiện tượng quang điện ngoài ý nghĩa thực tiễn gì? Tại sao Einstein được trao giải Nobel cho khám phá này?', a: 'Hiện tượng quang điện: ánh sáng chiếu lên kim loại bứt electron ra nếu tần số ≥ giới hạn quang điện. Ý nghĩa thực tiễn: tế bào quang điện (cảm biến ánh sáng), pin mặt trời (photovoltaic), camera kỹ thuật số (CCD/CMOS). Einstein nhận giải Nobel 1921 vì giải thích được tại sao hiệu ứng phụ thuộc tần số (không phải cường độ) ánh sáng — dùng lý thuyết photon, đặt nền tảng cho Cơ học lượng tử.' },
      { q: 'Nếu em tiếp tục nghiên cứu Vật Lý hoặc ngành liên quan ở bậc đại học, em tò mò nhất về lĩnh vực nào và tại sao?', a: 'Câu hỏi mở, không có đáp án duy nhất. Gợi ý: Vật lý hạt nhân & năng lượng (lò phản ứng tổng hợp hạt nhân, ITER); Vật lý thiên văn (lỗ đen, sóng hấp dẫn LIGO); Vật lý chất rắn (siêu dẫn, vật liệu mới); Quang tử học & máy tính lượng tử. Tò mò đích thực là động lực mạnh nhất của mọi nhà khoa học.' },
    ],
  },
};
