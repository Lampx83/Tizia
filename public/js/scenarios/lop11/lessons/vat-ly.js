// ============================================================
// Lớp 11 · VẬT LÝ — Lý thuyết 35 tuần (HK1: 1–18 · HK2: 19–35)
// Bám CTGD 2018 (Vật lý 11). Key trùng id quiz: "H11LY-wNN-quiz".
// ============================================================

export const H11LY_LESSONS = {
  'H11LY-w01-quiz': {
    topic: 'Dao động điều hoà — Khái niệm',
    intro: 'Chào các em! Tuần này chúng ta mở đầu chương Dao động với loại dao động đẹp nhất và quan trọng nhất: dao động điều hoà. Hiểu được nó, các em sẽ hiểu được cả con lắc, sóng và dòng điện xoay chiều sau này.',
    objectives: [
      'Nêu được định nghĩa dao động điều hoà và viết đúng phương trình li độ x = A·cos(ωt+φ).',
      'Phân biệt được các đại lượng: biên độ A, tần số góc ω, chu kỳ T, tần số f, pha (ωt+φ) và pha ban đầu φ.',
      'Tính được T, f, ω từ phương trình dao động cho trước.',
    ],
    theory: [
      { h: 'Dao động và dao động tuần hoàn' },
      { p: 'Dao động cơ là chuyển động qua lại của vật quanh một vị trí cân bằng. Nếu sau những khoảng thời gian bằng nhau vật trở lại trạng thái cũ thì dao động đó là tuần hoàn.' },
      { h: 'Định nghĩa dao động điều hoà' },
      { p: 'Dao động điều hoà là dao động trong đó li độ của vật biến thiên theo hàm cosin (hoặc sin) của thời gian: x = A·cos(ωt + φ).' },
      { h: 'Các đại lượng đặc trưng' },
      { ul: [
        'x: li độ (m) — độ lệch của vật khỏi vị trí cân bằng tại thời điểm t.',
        'A: biên độ — li độ cực đại, A = |x|max, luôn dương.',
        'ω: tần số góc (rad/s); (ωt+φ): pha dao động; φ: pha ban đầu (xác định trạng thái lúc t=0).',
        'T: chu kỳ (s) — thời gian thực hiện 1 dao động toàn phần; f: tần số (Hz) — số dao động trong 1 giây.',
      ] },
      { h: 'Hệ thức liên hệ' },
      { p: 'T = 2π/ω;  f = 1/T = ω/(2π);  ω = 2π/T = 2πf.' },
      { note: 'Lưu ý: biên độ A và pha ban đầu φ phụ thuộc cách kích thích ban đầu, còn ω (và do đó T, f) là tính chất riêng của hệ dao động.' },
    ],
    examples: [
      { q: 'Một vật dao động điều hoà có phương trình x = 4·cos(5πt + π/6) cm. Xác định biên độ, tần số góc, chu kỳ và tần số.', a: 'So sánh với x = A·cos(ωt+φ): A = 4 cm; ω = 5π rad/s. Chu kỳ T = 2π/ω = 2π/(5π) = 0,4 s. Tần số f = 1/T = 1/0,4 = 2,5 Hz.' },
      { q: 'Một vật dao động điều hoà thực hiện 20 dao động trong 10 s. Tính chu kỳ, tần số và tần số góc.', a: 'T = (thời gian)/(số dao động) = 10/20 = 0,5 s. f = 1/T = 2 Hz. ω = 2πf = 2π·2 = 4π ≈ 12,57 rad/s.' },
    ],
  },

  'H11LY-w02-quiz': {
    topic: 'Vận tốc và gia tốc trong dao động điều hoà',
    intro: 'Các em đã biết li độ. Tuần này chúng ta đạo hàm li độ để tìm vận tốc và gia tốc — hai đại lượng cho biết vật đang chuyển động nhanh hay chậm, và lực kéo về mạnh hay yếu.',
    objectives: [
      'Viết được biểu thức vận tốc v(t) và gia tốc a(t) từ phương trình li độ.',
      'Tính được vmax, amax và xác định vị trí xảy ra cực đại/cực tiểu.',
      'Hiểu được mối quan hệ a = -ω²x và độ lệch pha giữa x, v, a.',
    ],
    theory: [
      { h: 'Vận tốc' },
      { p: 'Vận tốc là đạo hàm của li độ theo thời gian: v = x\' = -Aω·sin(ωt + φ). Vận tốc sớm pha π/2 so với li độ.' },
      { ul: [
        'Tốc độ cực đại vmax = Aω, đạt được khi vật qua vị trí cân bằng (x = 0).',
        'Tại biên (x = ±A) vận tốc bằng 0.',
      ] },
      { h: 'Gia tốc' },
      { p: 'Gia tốc là đạo hàm của vận tốc: a = v\' = -Aω²·cos(ωt + φ) = -ω²x. Gia tốc luôn ngược dấu với li độ và hướng về vị trí cân bằng.' },
      { ul: [
        'Gia tốc cực đại amax = Aω², đạt được khi vật ở biên (x = ±A).',
        'Tại vị trí cân bằng (x = 0) gia tốc bằng 0.',
      ] },
      { h: 'Quan hệ pha và hệ thức độc lập thời gian' },
      { p: 'x và a ngược pha (lệch π); v sớm pha π/2 so với x; a sớm pha π/2 so với v. Hệ thức độc lập thời gian: A² = x² + v²/ω²  →  v = ±ω·√(A² − x²), giúp tính v khi biết x mà không cần thời gian.' },
      { note: 'Mẹo nhớ: ở cân bằng — tốc độ lớn nhất, gia tốc bằng 0; ở biên — đứng yên tức thời (v=0) nhưng gia tốc lớn nhất.' },
    ],
    examples: [
      { q: 'Vật dao động điều hoà x = 5·cos(10t) cm. Tính vmax và amax.', a: 'A = 5 cm = 0,05 m; ω = 10 rad/s. vmax = Aω = 0,05·10 = 0,5 m/s = 50 cm/s. amax = Aω² = 0,05·10² = 5 m/s² = 500 cm/s².' },
      { q: 'Vật dao động điều hoà với A = 8 cm, ω = 4 rad/s. Khi li độ x = 4 cm thì vận tốc có độ lớn bao nhiêu?', a: 'Dùng v = ω·√(A²−x²) = 4·√(8²−4²) = 4·√48 = 4·4√3 ≈ 27,7 cm/s.' },
    ],
  },

  'H11LY-w03-quiz': {
    topic: 'Năng lượng trong dao động điều hoà',
    intro: 'Tuần này chúng ta nhìn dao động dưới góc độ năng lượng. Các em sẽ thấy một điều rất đẹp: động năng và thế năng luôn đổi qua đổi lại, nhưng tổng của chúng — cơ năng — thì không bao giờ đổi.',
    objectives: [
      'Viết được công thức động năng, thế năng và cơ năng của dao động điều hoà.',
      'Chứng tỏ cơ năng được bảo toàn và bằng ½kA².',
      'Xác định được động năng, thế năng tại các vị trí đặc biệt (biên, cân bằng).',
    ],
    theory: [
      { h: 'Động năng' },
      { p: 'Động năng Wđ = ½m·v² = ½m·ω²·A²·sin²(ωt+φ). Wđ cực đại tại vị trí cân bằng, bằng 0 tại biên.' },
      { h: 'Thế năng' },
      { p: 'Thế năng (đàn hồi) Wt = ½k·x² = ½m·ω²·x² = ½m·ω²·A²·cos²(ωt+φ) (với k = mω²). Wt cực đại tại biên, bằng 0 tại cân bằng.' },
      { h: 'Cơ năng' },
      { p: 'W = Wđ + Wt = ½k·A² = ½m·ω²·A². Cơ năng không đổi theo thời gian (được bảo toàn nếu bỏ qua ma sát).' },
      { ul: [
        'Tại biên (x = ±A): Wt = W (cực đại), Wđ = 0.',
        'Tại cân bằng (x = 0): Wđ = W (cực đại), Wt = 0.',
        'Động năng và thế năng biến thiên tuần hoàn với tần số gấp đôi tần số dao động (chu kỳ T/2).',
      ] },
      { note: 'Cơ năng tỉ lệ với bình phương biên độ: tăng biên độ 2 lần thì cơ năng tăng 4 lần.' },
    ],
    examples: [
      { q: 'Con lắc lò xo k = 100 N/m dao động với biên độ A = 5 cm. Tính cơ năng.', a: 'W = ½kA² = ½·100·(0,05)² = ½·100·0,0025 = 0,125 J.' },
      { q: 'Vật m = 200 g dao động điều hoà ω = 10 rad/s, A = 4 cm. Tìm cơ năng và động năng khi vật ở li độ x = 2 cm.', a: 'W = ½mω²A² = ½·0,2·10²·(0,04)² = ½·0,2·100·0,0016 = 0,016 J. Thế năng Wt = ½mω²x² = ½·0,2·100·(0,02)² = 0,004 J. Vậy Wđ = W − Wt = 0,016 − 0,004 = 0,012 J.' },
    ],
  },

  'H11LY-w04-quiz': {
    topic: 'Con lắc lò xo',
    intro: 'Bây giờ ta áp dụng lý thuyết dao động điều hoà vào một hệ cụ thể: con lắc lò xo. Đây là mô hình kinh điển để các em luyện công thức chu kỳ và lực kéo về.',
    objectives: [
      'Viết được công thức tần số góc, chu kỳ, tần số của con lắc lò xo.',
      'Phân tích lực kéo về (lực hồi phục) F = -kx.',
      'Khảo sát sự phụ thuộc của T, f vào khối lượng m và độ cứng k.',
    ],
    theory: [
      { h: 'Cấu tạo và lực kéo về' },
      { p: 'Con lắc lò xo gồm vật nặng khối lượng m gắn vào lò xo độ cứng k. Lực kéo về (hướng về vị trí cân bằng) là F = -k·x, tỉ lệ với li độ và ngược chiều li độ — đây chính là điều kiện để vật dao động điều hoà.' },
      { h: 'Chu kỳ và tần số' },
      { p: 'Tần số góc ω = √(k/m). Chu kỳ T = 2π·√(m/k). Tần số f = (1/2π)·√(k/m).' },
      { ul: [
        'T tỉ lệ với √m: tăng m gấp 4 lần thì T tăng 2 lần.',
        'f tỉ lệ với √k: tăng k gấp 4 lần thì f tăng 2 lần.',
        'Chu kỳ con lắc lò xo KHÔNG phụ thuộc gia tốc trọng trường g (kể cả khi treo thẳng đứng).',
      ] },
      { h: 'Con lắc lò xo thẳng đứng' },
      { p: 'Khi treo thẳng đứng, lò xo dãn một đoạn Δl₀ tại vị trí cân bằng với k·Δl₀ = m·g, do đó ω = √(k/m) = √(g/Δl₀). Vật vẫn dao động điều hoà quanh vị trí cân bằng mới.' },
      { note: 'Gia tốc trọng trường chỉ làm dịch vị trí cân bằng, không làm thay đổi chu kỳ của con lắc lò xo.' },
    ],
    examples: [
      { q: 'Con lắc lò xo k = 40 N/m, m = 100 g. Tính ω, T, f.', a: 'ω = √(k/m) = √(40/0,1) = √400 = 20 rad/s. T = 2π/ω = 2π/20 ≈ 0,314 s. f = 1/T ≈ 3,18 Hz.' },
      { q: 'Lò xo treo thẳng đứng, khi treo vật vào lò xo dãn thêm Δl₀ = 4 cm. Lấy g = 10 m/s². Tính chu kỳ dao động.', a: 'ω = √(g/Δl₀) = √(10/0,04) = √250 ≈ 15,81 rad/s. T = 2π/ω ≈ 0,397 s ≈ 0,4 s.' },
    ],
  },

  'H11LY-w05-quiz': {
    topic: 'Con lắc đơn',
    intro: 'Con lắc đơn — sợi dây và quả nặng — là dao động ta gặp hằng ngày: xích đu, đồng hồ quả lắc. Tuần này các em học vì sao chu kỳ của nó chỉ phụ thuộc chiều dài dây và trọng trường.',
    objectives: [
      'Viết được công thức chu kỳ con lắc đơn và điều kiện dao động điều hoà.',
      'Phân tích lực kéo về của con lắc đơn ở biên độ góc nhỏ.',
      'Giải thích sự phụ thuộc của chu kỳ vào chiều dài l và gia tốc g.',
    ],
    theory: [
      { h: 'Cấu tạo' },
      { p: 'Con lắc đơn gồm vật nhỏ khối lượng m treo vào sợi dây nhẹ, không dãn, chiều dài l. Vị trí cân bằng là khi dây thẳng đứng.' },
      { h: 'Điều kiện dao động điều hoà' },
      { p: 'Với biên độ góc nhỏ (α ≤ 10°, sinα ≈ α), lực kéo về có dạng F ≈ -(mg/l)·s, tỉ lệ với li độ cung s, nên con lắc đơn dao động điều hoà.' },
      { h: 'Chu kỳ và tần số' },
      { p: 'Tần số góc ω = √(g/l). Chu kỳ T = 2π·√(l/g). Tần số f = (1/2π)·√(g/l).' },
      { ul: [
        'Chu kỳ tỉ lệ với √l: tăng chiều dài gấp 4 lần thì T tăng 2 lần.',
        'Chu kỳ tỉ lệ nghịch với √g: đưa lên cao (g giảm) thì chu kỳ tăng, đồng hồ chạy chậm.',
        'Chu kỳ KHÔNG phụ thuộc khối lượng m và (với biên độ nhỏ) cũng không phụ thuộc biên độ.',
      ] },
      { note: 'Tính chất chu kỳ độc lập với khối lượng và biên độ chính là nền tảng để Galileo và sau này Huygens chế tạo đồng hồ quả lắc.' },
    ],
    examples: [
      { q: 'Con lắc đơn dài l = 1 m, lấy g = 9,8 m/s². Tính chu kỳ.', a: 'T = 2π·√(l/g) = 2π·√(1/9,8) = 2π·0,3194 ≈ 2,0 s.' },
      { q: 'Một con lắc đơn có chu kỳ 2 s ở nơi g = 9,8 m/s². Đưa lên cao nơi g\' = 9,78 m/s² thì chu kỳ mới bằng bao nhiêu?', a: 'Vì T tỉ lệ 1/√g nên T\' = T·√(g/g\') = 2·√(9,8/9,78) = 2·1,00102 ≈ 2,002 s. Chu kỳ tăng nhẹ nên đồng hồ chạy chậm lại.' },
    ],
  },

  'H11LY-w06-quiz': {
    topic: 'Dao động tắt dần và dao động cưỡng bức',
    intro: 'Trong thực tế không có dao động nào kéo dài mãi — luôn có ma sát làm nó tắt dần. Tuần này ta học cách duy trì dao động bằng ngoại lực và hiện tượng cộng hưởng đầy lợi và hại.',
    objectives: [
      'Phân biệt dao động tắt dần, dao động duy trì và dao động cưỡng bức.',
      'Nêu được điều kiện và đặc điểm của hiện tượng cộng hưởng.',
      'Liệt kê các ứng dụng và tác hại của cộng hưởng trong đời sống, kỹ thuật.',
    ],
    theory: [
      { h: 'Dao động tắt dần' },
      { p: 'Dao động tắt dần là dao động có biên độ giảm dần theo thời gian. Nguyên nhân là lực ma sát/lực cản môi trường làm tiêu hao dần cơ năng. Môi trường càng nhớt thì tắt càng nhanh.' },
      { h: 'Dao động duy trì' },
      { p: 'Nếu cung cấp năng lượng bù đúng phần đã mất sau mỗi chu kỳ (như dây cót đồng hồ), biên độ được giữ không đổi và tần số bằng tần số riêng của hệ.' },
      { h: 'Dao động cưỡng bức' },
      { p: 'Dao động cưỡng bức là dao động dưới tác dụng của một ngoại lực biến thiên tuần hoàn F = F₀·cos(Ωt). Khi ổn định, vật dao động với tần số bằng tần số Ω của ngoại lực.' },
      { h: 'Hiện tượng cộng hưởng' },
      { p: 'Cộng hưởng xảy ra khi tần số ngoại lực Ω bằng (xấp xỉ) tần số riêng ω₀ của hệ; khi đó biên độ dao động cưỡng bức đạt giá trị cực đại.' },
      { ul: [
        'Ứng dụng có lợi: hộp cộng hưởng của đàn ghi-ta, máy đo địa chấn, lò vi sóng.',
        'Tác hại: cầu, nhà có thể bị phá huỷ khi tần số ngoại lực trùng tần số riêng (sự cố cầu Tacoma Narrows năm 1940).',
      ] },
      { note: 'Để tránh cộng hưởng có hại, người ta thiết kế sao cho tần số riêng của công trình khác xa các tần số kích thích thường gặp (gió, bước chân, động cơ).' },
    ],
    examples: [
      { q: 'Một con lắc có tần số riêng f₀ = 2 Hz được kích thích bởi ngoại lực tuần hoàn. Tần số ngoại lực bằng bao nhiêu thì biên độ lớn nhất?', a: 'Cộng hưởng xảy ra khi tần số ngoại lực bằng tần số riêng, tức f = f₀ = 2 Hz. Khi đó biên độ dao động cưỡng bức đạt cực đại.' },
      { q: 'Một xe tải đi qua các mối nối đường cách đều nhau 8 m. Xe có tần số dao động riêng của hệ treo là 2 Hz. Ở tốc độ nào xe bị xóc mạnh nhất (cộng hưởng)?', a: 'Tần số kích thích f = v/d. Cộng hưởng khi f = f₀ = 2 Hz → v = f·d = 2·8 = 16 m/s ≈ 57,6 km/h.' },
    ],
  },

  'H11LY-w07-quiz': {
    topic: 'Sóng cơ — Khái niệm và phương trình',
    intro: 'Sang chương Sóng! Sóng là dao động lan truyền trong không gian. Tuần này các em làm quen với sóng ngang, sóng dọc, bước sóng và mối liên hệ vàng v = λf.',
    objectives: [
      'Nêu được định nghĩa sóng cơ và phân biệt sóng ngang với sóng dọc.',
      'Định nghĩa được bước sóng, chu kỳ, tần số và tốc độ truyền sóng.',
      'Vận dụng được công thức v = λ·f = λ/T.',
    ],
    theory: [
      { h: 'Sóng cơ là gì' },
      { p: 'Sóng cơ là dao động lan truyền trong một môi trường vật chất (rắn, lỏng, khí). Sóng cơ không truyền được trong chân không. Khi sóng truyền đi, các phần tử môi trường chỉ dao động tại chỗ chứ không chuyển động theo sóng.' },
      { h: 'Sóng ngang và sóng dọc' },
      { ul: [
        'Sóng ngang: phương dao động của phần tử vuông góc với phương truyền sóng (ví dụ sóng trên mặt nước, sóng trên dây).',
        'Sóng dọc: phương dao động trùng với phương truyền sóng (ví dụ sóng âm trong không khí).',
      ] },
      { h: 'Các đại lượng đặc trưng' },
      { ul: [
        'Bước sóng λ: quãng đường sóng truyền được trong một chu kỳ; cũng là khoảng cách giữa hai điểm gần nhất dao động cùng pha.',
        'Chu kỳ T và tần số f của sóng bằng chu kỳ, tần số của nguồn dao động.',
        'Tốc độ truyền sóng v phụ thuộc bản chất môi trường.',
      ] },
      { h: 'Công thức cơ bản' },
      { p: 'v = λ·f = λ/T  →  λ = v·T = v/f.' },
      { note: 'Khi sóng truyền từ môi trường này sang môi trường khác, tần số f không đổi (do nguồn quyết định), còn tốc độ v và bước sóng λ thay đổi.' },
    ],
    examples: [
      { q: 'Một sóng cơ có tần số 20 Hz, tốc độ truyền 340 m/s. Tính bước sóng.', a: 'λ = v/f = 340/20 = 17 m.' },
      { q: 'Trên mặt nước, khoảng cách giữa hai đỉnh sóng liên tiếp là 0,5 m, sóng đi 2 m mất 4 s. Tính tần số sóng.', a: 'λ = 0,5 m. Tốc độ v = quãng đường/thời gian = 2/4 = 0,5 m/s. Tần số f = v/λ = 0,5/0,5 = 1 Hz.' },
    ],
  },

  'H11LY-w08-quiz': {
    topic: 'Giao thoa sóng',
    intro: 'Khi hai sóng gặp nhau, chúng cộng lại — chỗ thì mạnh lên, chỗ thì triệt tiêu. Đó là giao thoa, một trong những bằng chứng đẹp nhất về bản chất sóng.',
    objectives: [
      'Nêu được điều kiện để có giao thoa (hai nguồn kết hợp).',
      'Viết được điều kiện cực đại, cực tiểu giao thoa theo hiệu đường đi.',
      'Xác định được số điểm cực đại, cực tiểu trên đoạn nối hai nguồn.',
    ],
    theory: [
      { h: 'Hiện tượng giao thoa' },
      { p: 'Giao thoa là sự tổng hợp của hai (hay nhiều) sóng kết hợp trong không gian, tạo nên những điểm dao động với biên độ cực đại và những điểm dao động với biên độ cực tiểu xen kẽ ổn định.' },
      { h: 'Điều kiện giao thoa' },
      { p: 'Hai nguồn phải là hai nguồn kết hợp: cùng tần số và có hiệu số pha không đổi theo thời gian (thường lấy cùng pha).' },
      { h: 'Điều kiện cực đại và cực tiểu (hai nguồn cùng pha)' },
      { ul: [
        'Cực đại (hai sóng tới cùng pha, tăng cường): hiệu đường đi d₂ − d₁ = k·λ, với k = 0, ±1, ±2, …',
        'Cực tiểu (hai sóng tới ngược pha, triệt tiêu): d₂ − d₁ = (k + ½)·λ.',
      ] },
      { h: 'Số điểm cực đại, cực tiểu trên đoạn S₁S₂' },
      { p: 'Số cực đại trên đoạn nối hai nguồn (dài S₁S₂ = d) ứng với các k nguyên thoả −d/λ < k < d/λ. Số cực tiểu ứng với −d/λ − ½ < k < d/λ − ½.' },
      { note: 'Đường trung trực của hai nguồn cùng pha luôn là một cực đại giao thoa (ứng với k = 0, hiệu đường đi bằng 0).' },
    ],
    examples: [
      { q: 'Hai nguồn kết hợp cùng pha cách nhau, bước sóng λ = 2 cm. Một điểm M có d₁ = 10 cm, d₂ = 16 cm. M là cực đại hay cực tiểu?', a: 'Hiệu đường đi d₂ − d₁ = 16 − 10 = 6 cm = 3λ = 3·2. Vì bằng số nguyên lần λ (k = 3) nên M là điểm cực đại giao thoa.' },
      { q: 'Hai nguồn cùng pha cách nhau S₁S₂ = 10 cm, bước sóng λ = 2 cm. Tìm số điểm cực đại trên đoạn S₁S₂.', a: 'Điều kiện −d/λ < k < d/λ → −10/2 < k < 10/2 → −5 < k < 5. Các k nguyên: −4,…,0,…,4, gồm 9 giá trị. Vậy có 9 điểm cực đại.' },
    ],
  },

  'H11LY-w09-quiz': {
    topic: 'Sóng dừng',
    intro: 'Khi sóng tới gặp sóng phản xạ, chúng giao thoa tạo nên những điểm đứng yên (nút) và những điểm dao động mạnh nhất (bụng) cố định. Đó là sóng dừng — cơ sở của mọi nhạc cụ dây và ống.',
    objectives: [
      'Giải thích được sự hình thành sóng dừng và khái niệm nút, bụng.',
      'Tính được khoảng cách giữa các nút, bụng theo bước sóng.',
      'Viết được điều kiện có sóng dừng trên dây hai đầu cố định và một đầu tự do.',
    ],
    theory: [
      { h: 'Sự hình thành sóng dừng' },
      { p: 'Sóng dừng là kết quả giao thoa giữa sóng tới và sóng phản xạ trên cùng một phương truyền. Trên dây xuất hiện những điểm đứng yên và những điểm dao động cố định.' },
      { h: 'Nút và bụng' },
      { ul: [
        'Nút sóng: điểm luôn đứng yên (biên độ bằng 0).',
        'Bụng sóng: điểm dao động với biên độ cực đại.',
        'Khoảng cách giữa hai nút liên tiếp (hoặc hai bụng liên tiếp) bằng λ/2.',
        'Khoảng cách giữa một nút và một bụng kề nhau bằng λ/4.',
      ] },
      { h: 'Điều kiện có sóng dừng' },
      { ul: [
        'Dây hai đầu cố định (hai đầu là nút): l = k·λ/2, với k = 1, 2, 3… là số bó sóng (số bụng).',
        'Dây một đầu cố định, một đầu tự do (đầu tự do là bụng): l = (2k+1)·λ/4, với k = 0, 1, 2…',
      ] },
      { note: 'Tần số nhỏ nhất tạo được sóng dừng gọi là tần số cơ bản (hoạ âm bậc 1); các tần số bội của nó cũng tạo sóng dừng (các hoạ âm).' },
    ],
    examples: [
      { q: 'Dây hai đầu cố định dài l = 60 cm có sóng dừng với 3 bó sóng. Tính bước sóng.', a: 'Hai đầu cố định: l = k·λ/2 với k = 3. → λ = 2l/k = 2·60/3 = 40 cm.' },
      { q: 'Dây một đầu cố định một đầu tự do dài 50 cm, có sóng dừng với 2 bụng. Tính bước sóng.', a: 'Điều kiện l = (2k+1)·λ/4. Với 2 bụng thì 2k+1 = 3 (k = 1) → l = 3λ/4 → λ = 4l/3 = 4·50/3 ≈ 66,7 cm.' },
    ],
  },

  'H11LY-w10-quiz': {
    topic: 'Sóng âm và các đặc trưng của âm',
    intro: 'Âm thanh ta nghe hằng ngày chính là sóng dọc lan truyền trong không khí. Tuần này các em phân biệt các vùng tần số và các đặc trưng vật lý — sinh lý của âm.',
    objectives: [
      'Nêu được bản chất và tốc độ truyền của sóng âm.',
      'Phân biệt được hạ âm, âm nghe được và siêu âm theo dải tần số.',
      'Phân biệt được đặc trưng vật lý và đặc trưng sinh lý của âm.',
    ],
    theory: [
      { h: 'Bản chất sóng âm' },
      { p: 'Sóng âm là sóng cơ lan truyền trong các môi trường rắn, lỏng, khí. Trong chất khí và lỏng, sóng âm là sóng dọc. Tốc độ âm trong không khí ở 20°C khoảng 340 m/s, trong nước khoảng 1500 m/s, trong thép khoảng 5000 m/s — âm truyền nhanh nhất trong chất rắn.' },
      { h: 'Phân loại theo tần số' },
      { ul: [
        'Hạ âm: tần số dưới 16 Hz (tai người không nghe được).',
        'Âm nghe được: tần số từ 16 Hz đến 20 000 Hz.',
        'Siêu âm: tần số trên 20 000 Hz (ứng dụng trong y học, dò khuyết tật).',
      ] },
      { h: 'Đặc trưng vật lý của âm' },
      { p: 'Gồm: tần số, cường độ âm I (W/m²) và đồ thị dao động âm. Đây là các đại lượng đo được bằng dụng cụ.' },
      { h: 'Đặc trưng sinh lý của âm' },
      { ul: [
        'Độ cao của âm gắn với tần số (âm cao ↔ tần số lớn).',
        'Độ to của âm gắn với cường độ âm (và mức cường độ âm).',
        'Âm sắc gắn với đồ thị dao động âm, giúp phân biệt các nguồn âm khác nhau.',
      ] },
      { note: 'Cùng một nốt nhạc, đàn ghi-ta và sáo nghe khác nhau là do âm sắc — quyết định bởi các hoạ âm đi kèm.' },
    ],
    examples: [
      { q: 'Một sóng âm trong không khí có tần số 680 Hz, tốc độ âm 340 m/s. Tính bước sóng.', a: 'λ = v/f = 340/680 = 0,5 m.' },
      { q: 'Một âm có tần số 25 000 Hz. Tai người có nghe được không? Vì sao?', a: 'Tai người chỉ nghe được âm trong dải 16 Hz đến 20 000 Hz. Vì 25 000 Hz > 20 000 Hz nên đây là siêu âm, tai người không nghe được.' },
    ],
  },

  'H11LY-w11-quiz': {
    topic: 'Cường độ âm và mức cường độ âm',
    intro: 'Tai người cảm nhận âm to nhỏ theo thang logarit, nên ta dùng đơn vị đề-xi-ben. Tuần này các em học công thức mức cường độ âm và cách tính nhanh khi cường độ tăng giảm.',
    objectives: [
      'Định nghĩa được cường độ âm và mức cường độ âm.',
      'Vận dụng công thức L = 10·log(I/I₀) để tính mức cường độ âm.',
      'Tính được sự thay đổi mức cường độ âm khi cường độ thay đổi.',
    ],
    theory: [
      { h: 'Cường độ âm' },
      { p: 'Cường độ âm I là năng lượng sóng âm truyền qua một đơn vị diện tích vuông góc với phương truyền trong một đơn vị thời gian, đơn vị W/m². Từ một nguồn điểm, I tỉ lệ nghịch với bình phương khoảng cách: I = P/(4πr²).' },
      { h: 'Mức cường độ âm' },
      { p: 'Mức cường độ âm: L = 10·log(I/I₀), đơn vị đề-xi-ben (dB), với I₀ = 10⁻¹² W/m² là cường độ âm chuẩn (ngưỡng nghe ở 1000 Hz).' },
      { ul: [
        'Khi I tăng 10 lần, L tăng thêm 10 dB.',
        'Khi I tăng 100 lần, L tăng thêm 20 dB.',
        'Ngưỡng đau của tai người vào khoảng 130 dB.',
      ] },
      { h: 'Độ to và cường độ' },
      { p: 'Độ to của âm (đặc trưng sinh lý) tăng theo mức cường độ âm, nhưng còn phụ thuộc tần số. Hai âm có cùng I nhưng khác tần số có thể nghe to nhỏ khác nhau.' },
      { note: 'Vì thang dB là logarit nên hiệu hai mức L₂ − L₁ = 10·log(I₂/I₁) — chỉ phụ thuộc tỉ số cường độ, rất tiện để so sánh.' },
    ],
    examples: [
      { q: 'Một âm có cường độ I = 10⁻⁶ W/m². Tính mức cường độ âm (I₀ = 10⁻¹² W/m²).', a: 'L = 10·log(I/I₀) = 10·log(10⁻⁶/10⁻¹²) = 10·log(10⁶) = 10·6 = 60 dB.' },
      { q: 'Tại một điểm mức cường độ âm là 50 dB. Nếu cường độ âm tăng lên 1000 lần thì mức cường độ âm mới bằng bao nhiêu?', a: 'ΔL = 10·log(1000) = 10·3 = 30 dB. Mức mới L\' = 50 + 30 = 80 dB.' },
    ],
  },

  'H11LY-w12-quiz': {
    topic: 'Điện tích — Định luật Coulomb',
    intro: 'Sang chương Điện trường! Mọi hiện tượng điện đều bắt đầu từ điện tích. Tuần này các em học định luật Coulomb — định luật mô tả lực hút, đẩy giữa các điện tích.',
    objectives: [
      'Nêu được hai loại điện tích và tương tác giữa chúng.',
      'Phát biểu và vận dụng được định luật Coulomb.',
      'Tính được lực tương tác giữa hai điện tích điểm trong chân không và trong điện môi.',
    ],
    theory: [
      { h: 'Điện tích và tương tác điện' },
      { p: 'Có hai loại điện tích: dương và âm. Các điện tích cùng dấu đẩy nhau, trái dấu hút nhau. Điện tích của một vật luôn là bội nguyên của điện tích nguyên tố e = 1,6·10⁻¹⁹ C.' },
      { h: 'Định luật Coulomb' },
      { p: 'Lực tương tác giữa hai điện tích điểm đặt trong chân không: F = k·|q₁·q₂|/r², với k = 9·10⁹ N·m²/C². Lực có phương nằm trên đường nối hai điện tích.' },
      { h: 'Trong điện môi' },
      { p: 'Khi đặt trong môi trường điện môi có hằng số điện môi ε, lực giảm đi ε lần: F = k·|q₁·q₂|/(ε·r²). Với không khí, ε ≈ 1.' },
      { ul: [
        'F tỉ lệ thuận với tích độ lớn hai điện tích.',
        'F tỉ lệ nghịch với bình phương khoảng cách: tăng r gấp đôi thì F giảm 4 lần.',
      ] },
      { note: 'Định luật Coulomb có dạng giống hệt định luật vạn vật hấp dẫn (đều tỉ lệ nghịch r²), nhưng lực điện mạnh hơn lực hấp dẫn rất nhiều lần.' },
    ],
    examples: [
      { q: 'Hai điện tích q₁ = q₂ = 2·10⁻⁶ C đặt cách nhau 3 cm trong chân không. Tính lực tương tác.', a: 'F = k·|q₁q₂|/r² = 9·10⁹·(2·10⁻⁶·2·10⁻⁶)/(0,03)² = 9·10⁹·4·10⁻¹²/9·10⁻⁴ = 36·10⁻³/9·10⁻⁴ = 40 N.' },
      { q: 'Hai điện tích đẩy nhau với lực 0,4 N khi cách 6 cm. Nếu đưa lại gần còn 3 cm thì lực bằng bao nhiêu?', a: 'Vì F tỉ lệ 1/r², giảm khoảng cách 2 lần thì lực tăng 4 lần: F\' = 0,4·4 = 1,6 N.' },
    ],
  },

  'H11LY-w13-quiz': {
    topic: 'Điện trường và cường độ điện trường',
    intro: 'Điện tích tác dụng lực lên nhau qua một trường vô hình bao quanh chúng — đó là điện trường. Tuần này các em học cách đo độ mạnh của điện trường bằng cường độ điện trường.',
    objectives: [
      'Nêu được khái niệm điện trường và cường độ điện trường.',
      'Viết và vận dụng công thức E = F/q và E = k·|Q|/r².',
      'Áp dụng nguyên lý chồng chất điện trường để tìm cường độ điện trường tổng hợp.',
    ],
    theory: [
      { h: 'Điện trường' },
      { p: 'Điện trường là môi trường vật chất bao quanh điện tích, truyền tương tác điện. Đặt một điện tích thử q vào điện trường, nó chịu lực điện F.' },
      { h: 'Cường độ điện trường' },
      { p: 'Cường độ điện trường tại một điểm đặc trưng cho độ mạnh của điện trường: E = F/q. Đây là đại lượng vectơ, đơn vị V/m (hay N/C). Vectơ E cùng hướng với lực tác dụng lên điện tích dương.' },
      { h: 'Điện trường của điện tích điểm' },
      { p: 'Cường độ điện trường do điện tích Q gây ra tại điểm cách nó khoảng r: E = k·|Q|/(ε·r²). Hướng ra xa nếu Q > 0, hướng vào nếu Q < 0.' },
      { h: 'Đường sức, điện trường đều và nguyên lý chồng chất' },
      { ul: [
        'Đường sức điện đi ra từ điện tích dương, đi vào điện tích âm.',
        'Điện trường đều có vectơ E như nhau tại mọi điểm; đường sức là những đường thẳng song song, cách đều (ví dụ giữa hai bản tụ phẳng).',
        'Nguyên lý chồng chất: cường độ điện trường tổng hợp bằng tổng vectơ các thành phần E = E₁ + E₂ + … (cộng vectơ).',
      ] },
      { note: 'Vì E là vectơ, khi cộng phải chú ý phương chiều, không cộng đại số như khi cộng số học.' },
    ],
    examples: [
      { q: 'Tính cường độ điện trường do điện tích Q = 4·10⁻⁸ C gây ra tại điểm cách 2 cm trong chân không.', a: 'E = k·|Q|/r² = 9·10⁹·4·10⁻⁸/(0,02)² = 9·10⁹·4·10⁻⁸/4·10⁻⁴ = 9·10⁵ V/m.' },
      { q: 'Một điện tích thử q = 2·10⁻⁹ C đặt tại một điểm chịu lực điện 6·10⁻⁴ N. Tính cường độ điện trường tại đó.', a: 'E = F/q = 6·10⁻⁴/(2·10⁻⁹) = 3·10⁵ V/m.' },
    ],
  },

  'H11LY-w14-quiz': {
    topic: 'Điện thế, hiệu điện thế và công của lực điện',
    intro: 'Tuần này ta nhìn điện trường dưới góc độ năng lượng: công của lực điện, điện thế và hiệu điện thế — những khái niệm gắn liền với mọi mạch điện sau này.',
    objectives: [
      'Tính được công của lực điện trong điện trường đều.',
      'Nêu được khái niệm điện thế, hiệu điện thế và mối liên hệ U = E·d.',
      'Hiểu được tính chất bảo toàn của công lực điện.',
    ],
    theory: [
      { h: 'Công của lực điện' },
      { p: 'Trong điện trường đều E, khi điện tích q dịch chuyển theo phương đường sức một đoạn d, công của lực điện: A = q·E·d. Công này không phụ thuộc hình dạng đường đi mà chỉ phụ thuộc vị trí điểm đầu và điểm cuối — lực điện là lực thế (lực bảo toàn).' },
      { h: 'Hiệu điện thế' },
      { p: 'Hiệu điện thế giữa hai điểm M, N: U = A/q, là công của lực điện để di chuyển một đơn vị điện tích từ M đến N. Đơn vị là vôn (V), với 1 V = 1 J/C.' },
      { h: 'Điện thế' },
      { p: 'Điện thế tại một điểm (chọn mốc ở vô cực) do điện tích điểm Q gây ra: V = k·Q/r. Hiệu điện thế U_MN = V_M − V_N.' },
      { h: 'Liên hệ E và U' },
      { p: 'Trong điện trường đều, U = E·d (d là khoảng cách giữa hai điểm theo phương đường sức). Suy ra E = U/d, giải thích vì sao đơn vị của E là V/m.' },
      { note: 'Vì lực điện là lực thế nên công lực điện trên một đường cong khép kín bằng 0 — tương tự công trọng lực.' },
    ],
    examples: [
      { q: 'Một điện tích q = 5·10⁻⁹ C dịch chuyển trong điện trường đều E = 1000 V/m, theo phương đường sức một đoạn 4 cm. Tính công của lực điện.', a: 'A = q·E·d = 5·10⁻⁹·1000·0,04 = 2·10⁻⁷ J.' },
      { q: 'Hai bản kim loại phẳng song song cách nhau 2 cm, hiệu điện thế giữa hai bản là 200 V. Tính cường độ điện trường giữa hai bản.', a: 'E = U/d = 200/0,02 = 10 000 V/m = 10⁴ V/m.' },
    ],
  },

  'H11LY-w15-quiz': {
    topic: 'Tụ điện',
    intro: 'Tụ điện là linh kiện tích trữ điện tích và năng lượng điện trường — có mặt trong mọi thiết bị điện tử. Tuần này các em học điện dung, ghép tụ và năng lượng tụ.',
    objectives: [
      'Nêu được khái niệm tụ điện, điện dung và công thức C = Q/U.',
      'Tính được điện dung tương đương của bộ tụ ghép nối tiếp và song song.',
      'Tính được năng lượng điện trường tích trữ trong tụ.',
    ],
    theory: [
      { h: 'Tụ điện và điện dung' },
      { p: 'Tụ điện là hệ hai vật dẫn (hai bản) đặt gần nhau, ngăn cách bởi điện môi. Điện dung C đặc trưng cho khả năng tích điện: C = Q/U, đơn vị fara (F), với 1 F = 1 C/V. Thực tế thường dùng μF, nF, pF.' },
      { h: 'Tụ điện phẳng' },
      { p: 'Điện dung tụ phẳng: C = ε·ε₀·S/d, trong đó S là diện tích phần đối diện của hai bản, d là khoảng cách hai bản, ε là hằng số điện môi. C tăng khi S lớn hoặc d nhỏ.' },
      { h: 'Ghép tụ điện' },
      { ul: [
        'Ghép song song: C_b = C₁ + C₂ + … (điện dung tăng).',
        'Ghép nối tiếp: 1/C_b = 1/C₁ + 1/C₂ + … (điện dung giảm).',
      ] },
      { h: 'Năng lượng tụ điện' },
      { p: 'Tụ tích trữ năng lượng dưới dạng năng lượng điện trường: W = ½·C·U² = ½·Q·U = Q²/(2C).' },
      { note: 'Lưu ý phân biệt với điện trở: tụ ghép song song cộng C (giống điện trở nối tiếp cộng R), còn tụ nối tiếp lại lấy nghịch đảo (giống điện trở song song).' },
    ],
    examples: [
      { q: 'Một tụ điện có điện dung C = 5 μF được nối vào hiệu điện thế U = 12 V. Tính điện tích và năng lượng của tụ.', a: 'Q = C·U = 5·10⁻⁶·12 = 6·10⁻⁵ C. W = ½·C·U² = ½·5·10⁻⁶·12² = ½·5·10⁻⁶·144 = 3,6·10⁻⁴ J.' },
      { q: 'Hai tụ C₁ = 4 μF, C₂ = 6 μF. Tính điện dung tương đương khi ghép nối tiếp và khi ghép song song.', a: 'Song song: C_b = 4 + 6 = 10 μF. Nối tiếp: 1/C_b = 1/4 + 1/6 = 3/12 + 2/12 = 5/12 → C_b = 12/5 = 2,4 μF.' },
    ],
  },

  'H11LY-w16-quiz': {
    topic: 'Dòng điện không đổi — Định luật Ohm cho đoạn mạch',
    intro: 'Sang chương Dòng điện không đổi! Tuần này các em học cường độ dòng điện, định luật Ohm cho đoạn mạch và cách tính công, công suất điện.',
    objectives: [
      'Nêu được khái niệm cường độ dòng điện và viết I = q/t.',
      'Vận dụng định luật Ohm U = I·R cho đoạn mạch chứa điện trở.',
      'Tính được điện trở tương đương, công và công suất điện.',
    ],
    theory: [
      { h: 'Cường độ dòng điện' },
      { p: 'Dòng điện là dòng chuyển dời có hướng của các điện tích. Cường độ dòng điện I = q/t là điện lượng chuyển qua tiết diện trong một đơn vị thời gian, đơn vị ampe (A). Dòng điện không đổi có chiều và cường độ không đổi theo thời gian.' },
      { h: 'Định luật Ohm cho đoạn mạch' },
      { p: 'Cường độ dòng điện qua một đoạn mạch chỉ chứa điện trở tỉ lệ thuận với hiệu điện thế và tỉ lệ nghịch với điện trở: I = U/R, hay U = I·R.' },
      { h: 'Ghép điện trở' },
      { ul: [
        'Nối tiếp: R_b = R₁ + R₂ + …; dòng điện qua các điện trở bằng nhau.',
        'Song song: 1/R_b = 1/R₁ + 1/R₂ + …; hiệu điện thế trên các nhánh bằng nhau.',
      ] },
      { h: 'Công và công suất điện' },
      { p: 'Công của dòng điện: A = U·I·t (J). Công suất điện: P = U·I = I²·R = U²/R (W). Nhiệt lượng toả ra trên điện trở theo định luật Joule-Lenz: Q = I²·R·t.' },
      { note: 'Đơn vị thực dụng của điện năng tiêu thụ là kWh: 1 kWh = 3,6·10⁶ J.' },
    ],
    examples: [
      { q: 'Một điện trở R = 20 Ω mắc vào hiệu điện thế 12 V. Tính cường độ dòng điện và công suất tiêu thụ.', a: 'I = U/R = 12/20 = 0,6 A. P = U·I = 12·0,6 = 7,2 W (hoặc P = U²/R = 144/20 = 7,2 W).' },
      { q: 'Hai điện trở R₁ = 6 Ω, R₂ = 3 Ω mắc song song vào nguồn 12 V. Tính điện trở tương đương và dòng điện chạy trong mạch chính.', a: 'Song song: 1/R_b = 1/6 + 1/3 = 1/6 + 2/6 = 3/6 → R_b = 2 Ω. Dòng mạch chính I = U/R_b = 12/2 = 6 A.' },
    ],
  },

  'H11LY-w17-quiz': {
    topic: 'Định luật Ohm cho toàn mạch',
    intro: 'Mọi nguồn điện thực đều có điện trở trong, làm sụt một phần điện áp. Tuần này các em học định luật Ohm cho toàn mạch — chìa khoá để hiểu vì sao pin yếu dần khi dùng.',
    objectives: [
      'Nêu được khái niệm suất điện động và điện trở trong của nguồn.',
      'Vận dụng định luật Ohm cho toàn mạch I = E/(R+r).',
      'Tính được hiệu điện thế mạch ngoài và phân tích các trường hợp đặc biệt.',
    ],
    theory: [
      { h: 'Nguồn điện' },
      { p: 'Nguồn điện duy trì hiệu điện thế nhờ thực hiện công tách các điện tích trái dấu. Suất điện động E = A/q là công của lực lạ để dịch chuyển một đơn vị điện tích dương bên trong nguồn, đơn vị vôn (V).' },
      { h: 'Điện trở trong' },
      { p: 'Mỗi nguồn có điện trở trong r (điện trở của các phần tử bên trong nguồn). Khi có dòng điện, một phần năng lượng bị tiêu hao trên r.' },
      { h: 'Định luật Ohm cho toàn mạch' },
      { p: 'I = E/(R + r), trong đó R là điện trở mạch ngoài, r là điện trở trong. Suy ra E = I·R + I·r.' },
      { h: 'Hiệu điện thế mạch ngoài' },
      { p: 'U = E − I·r = I·R. Khi dòng điện càng lớn, độ sụt I·r càng lớn, U càng nhỏ.' },
      { ul: [
        'Đoản mạch (R = 0): I = E/r đạt cực đại, U = 0 — rất nguy hiểm.',
        'Mạch hở (R = ∞): I = 0, U = E (hiệu điện thế bằng suất điện động).',
      ] },
      { note: 'Đo hiệu điện thế hai cực pin khi không tải sẽ thu được gần đúng suất điện động E; khi nối tải, số đo giảm xuống do sụt áp trên r.' },
    ],
    examples: [
      { q: 'Nguồn điện E = 12 V, r = 0,5 Ω, mạch ngoài R = 5,5 Ω. Tính cường độ dòng điện và hiệu điện thế mạch ngoài.', a: 'I = E/(R+r) = 12/(5,5+0,5) = 12/6 = 2 A. U = E − I·r = 12 − 2·0,5 = 11 V (hoặc U = I·R = 2·5,5 = 11 V).' },
      { q: 'Một pin có E = 1,5 V, r = 1 Ω bị đoản mạch. Tính cường độ dòng điện đoản mạch.', a: 'Đoản mạch R = 0 nên I = E/r = 1,5/1 = 1,5 A. Đây là dòng cực đại pin có thể cấp.' },
    ],
  },

  'H11LY-w18-quiz': {
    topic: 'Ôn tập học kỳ I — Dao động, sóng, điện',
    intro: 'Kết thúc học kỳ I, ta hệ thống lại toàn bộ: dao động điều hoà, sóng cơ, điện trường và dòng điện không đổi. Hãy chắc chắn các em thuộc lòng các công thức trụ cột.',
    objectives: [
      'Hệ thống được các công thức cốt lõi của bốn chương đầu.',
      'Vận dụng tổng hợp để giải bài tập liên chương.',
      'Tự kiểm tra và bù lấp các phần kiến thức còn yếu.',
    ],
    theory: [
      { h: 'Dao động điều hoà và con lắc' },
      { p: 'x = A·cos(ωt+φ); v = -Aω·sin(ωt+φ); a = -ω²x; cơ năng W = ½kA² (bảo toàn). Con lắc lò xo: T = 2π·√(m/k); con lắc đơn: T = 2π·√(l/g).' },
      { h: 'Sóng cơ và sóng âm' },
      { ul: [
        'v = λ·f = λ/T; sóng âm trong khí là sóng dọc, tốc độ ~340 m/s.',
        'Cực đại giao thoa: d₂−d₁ = k·λ; cực tiểu: (k+½)·λ.',
        'Mức cường độ âm L = 10·log(I/I₀).',
      ] },
      { h: 'Điện trường' },
      { ul: [
        'Định luật Coulomb: F = k·|q₁q₂|/r².',
        'Cường độ điện trường: E = F/q = k·|Q|/r²; U = E·d.',
        'Tụ điện: C = Q/U; W = ½CU².',
      ] },
      { h: 'Dòng điện không đổi' },
      { p: 'Đoạn mạch: U = I·R; toàn mạch: I = E/(R+r); công suất P = U·I.' },
      { note: 'Khi giải bài, luôn đổi về đơn vị SI trước khi thay số: cm → m, μF → F, μC → C.' },
    ],
    examples: [
      { q: 'Con lắc lò xo k = 50 N/m dao động biên độ 4 cm. Tính cơ năng và vmax nếu m = 0,2 kg.', a: 'W = ½kA² = ½·50·(0,04)² = ½·50·0,0016 = 0,04 J. Mà W = ½mv²max → v²max = 2W/m = 0,08/0,2 = 0,4 → vmax = 0,632 m/s.' },
      { q: 'Nguồn E = 6 V, r = 1 Ω nối với R = 5 Ω. Tính công suất tiêu thụ ở mạch ngoài.', a: 'I = E/(R+r) = 6/6 = 1 A. P_ngoài = I²·R = 1²·5 = 5 W.' },
    ],
  },

  'H11LY-w19-quiz': {
    topic: 'Dòng điện trong kim loại',
    intro: 'Học kỳ II mở đầu với dòng điện trong các môi trường. Tuần này ta tìm hiểu bản chất dòng điện trong kim loại — dòng các electron tự do — và hiện tượng siêu dẫn kỳ thú.',
    objectives: [
      'Nêu được bản chất dòng điện trong kim loại.',
      'Giải thích được sự phụ thuộc của điện trở suất vào nhiệt độ.',
      'Nêu được hiện tượng siêu dẫn và hiện tượng nhiệt điện.',
    ],
    theory: [
      { h: 'Bản chất dòng điện trong kim loại' },
      { p: 'Dòng điện trong kim loại là dòng chuyển dời có hướng của các electron tự do ngược chiều điện trường. Trong kim loại có sẵn rất nhiều electron tự do tách khỏi nguyên tử, nên kim loại dẫn điện tốt.' },
      { h: 'Điện trở suất phụ thuộc nhiệt độ' },
      { p: 'Khi nhiệt độ tăng, các ion dao động mạnh hơn cản trở electron, làm điện trở suất tăng: ρ = ρ₀·(1 + α·Δt), với α là hệ số nhiệt điện trở (K⁻¹), Δt là độ tăng nhiệt độ.' },
      { h: 'Hiện tượng siêu dẫn' },
      { p: 'Một số vật liệu khi hạ nhiệt độ xuống dưới nhiệt độ tới hạn Tc thì điện trở suất đột ngột giảm về 0 (siêu dẫn). Ví dụ thuỷ ngân có Tc ≈ 4 K. Dòng điện trong vật siêu dẫn có thể duy trì rất lâu mà không tiêu hao.' },
      { h: 'Hiện tượng nhiệt điện' },
      { p: 'Khi hai đầu mối hàn của một cặp dây dẫn khác loại có nhiệt độ khác nhau, xuất hiện một suất điện động nhiệt điện. Cặp nhiệt điện được dùng làm nhiệt kế đo nhiệt độ cao.' },
      { note: 'Ứng dụng siêu dẫn: nam châm điện cực mạnh trong máy MRI, tàu đệm từ, đường dây tải điện không hao phí (đang nghiên cứu).' },
    ],
    examples: [
      { q: 'Dây đồng ở 20°C có điện trở 10 Ω, α = 4,3·10⁻³ K⁻¹. Tính điện trở ở 70°C.', a: 'R = R₀·(1 + α·Δt) = 10·(1 + 4,3·10⁻³·50) = 10·(1 + 0,215) = 10·1,215 = 12,15 Ω.' },
      { q: 'Điện trở suất một kim loại ở 0°C là 1,6·10⁻⁸ Ω·m, α = 4·10⁻³ K⁻¹. Tính điện trở suất ở 100°C.', a: 'ρ = ρ₀·(1 + α·Δt) = 1,6·10⁻⁸·(1 + 4·10⁻³·100) = 1,6·10⁻⁸·1,4 = 2,24·10⁻⁸ Ω·m.' },
    ],
  },

  'H11LY-w20-quiz': {
    topic: 'Dòng điện trong chất điện phân',
    intro: 'Nước muối, dung dịch axit dẫn điện được nhờ các ion. Tuần này các em học định luật Faraday về điện phân — nền tảng của mạ điện và luyện kim.',
    objectives: [
      'Nêu được bản chất dòng điện trong chất điện phân.',
      'Phát biểu và vận dụng hai định luật Faraday.',
      'Nêu được các ứng dụng của hiện tượng điện phân.',
    ],
    theory: [
      { h: 'Bản chất dòng điện trong chất điện phân' },
      { p: 'Trong dung dịch điện phân, các phân tử chất tan phân li thành ion dương và ion âm. Dòng điện là dòng chuyển dời có hướng đồng thời của ion dương (về catot) và ion âm (về anot). Hiện tượng kèm theo phản ứng ở điện cực gọi là điện phân.' },
      { h: 'Định luật Faraday thứ nhất' },
      { p: 'Khối lượng chất giải phóng ở điện cực tỉ lệ với điện lượng chạy qua: m = k·q, với k là đương lượng điện hoá của chất.' },
      { h: 'Định luật Faraday thứ hai' },
      { p: 'Đương lượng điện hoá k = (1/F)·(A/n), với A là khối lượng mol nguyên tử, n là hoá trị, F = 96 500 C/mol là hằng số Faraday.' },
      { h: 'Công thức Faraday tổng hợp' },
      { p: 'Kết hợp hai định luật: m = (A·I·t)/(n·F). Đây là công thức dùng để tính khối lượng kim loại bám vào điện cực.' },
      { note: 'Ứng dụng: mạ điện (mạ vàng, bạc, crom), tinh luyện kim loại (đồng), điều chế kim loại (nhôm từ Al₂O₃ nóng chảy).' },
    ],
    examples: [
      { q: 'Điện phân dung dịch CuSO₄ với dòng I = 2 A trong 30 phút. Tính khối lượng đồng bám vào catot (Cu: A = 64, n = 2).', a: 't = 30·60 = 1800 s. m = (A·I·t)/(n·F) = (64·2·1800)/(2·96500) = 230400/193000 ≈ 1,19 g.' },
      { q: 'Cần dòng điện bao lâu để giải phóng 1,08 g bạc khi điện phân dung dịch AgNO₃ với I = 1 A (Ag: A = 108, n = 1)?', a: 'Từ m = (A·I·t)/(n·F) → t = m·n·F/(A·I) = 1,08·1·96500/(108·1) = 104220/108 = 965 s ≈ 16,1 phút.' },
    ],
  },

  'H11LY-w21-quiz': {
    topic: 'Dòng điện trong chân không và bán dẫn',
    intro: 'Tuần này khép lại chương về môi trường dẫn điện với chân không và bán dẫn — vật liệu làm nên mọi con chip, transistor và diode trong điện tử hiện đại.',
    objectives: [
      'Nêu được bản chất dòng điện trong chân không.',
      'Phân biệt được bán dẫn loại n và loại p.',
      'Giải thích được tính chỉnh lưu của lớp tiếp xúc p-n (diode).',
    ],
    theory: [
      { h: 'Dòng điện trong chân không' },
      { p: 'Chân không không có hạt tải điện. Muốn có dòng điện, phải đưa electron vào bằng cách nung nóng catot (phát xạ nhiệt electron). Dòng điện trong chân không là dòng các electron bứt ra từ catot nóng bay về anot, chỉ theo một chiều.' },
      { h: 'Ứng dụng' },
      { p: 'Ống tia âm cực (CRT) từng dùng trong tivi, màn hình, dao động ký điện tử trước khi có màn hình phẳng.' },
      { h: 'Bán dẫn' },
      { p: 'Bán dẫn (như silic, gecmani) có độ dẫn điện trung gian giữa kim loại và điện môi, tăng mạnh khi tăng nhiệt độ hoặc pha tạp. Hạt tải điện gồm electron tự do và lỗ trống (mang điện dương).' },
      { ul: [
        'Bán dẫn loại n: pha tạp nguyên tố nhóm V (P, As) → hạt tải đa số là electron.',
        'Bán dẫn loại p: pha tạp nguyên tố nhóm III (B, Al) → hạt tải đa số là lỗ trống.',
      ] },
      { h: 'Lớp tiếp xúc p-n và diode' },
      { p: 'Ghép một miếng bán dẫn p với một miếng n tạo lớp tiếp xúc p-n. Lớp này chỉ cho dòng đi qua dễ dàng theo một chiều (phân cực thuận: cực dương nối p), chặn chiều ngược (phân cực ngược). Đó là tính chỉnh lưu của diode.' },
      { note: 'Transistor và vi mạch (IC) đều xây dựng từ các lớp tiếp xúc p-n, là trái tim của máy tính và điện thoại.' },
    ],
    examples: [
      { q: 'Một diode bán dẫn được mắc sao cho cực dương nguồn nối với bán dẫn p, cực âm nối với n. Diode có dẫn điện không?', a: 'Đây là phân cực thuận (cực dương nối p). Lớp tiếp xúc p-n cho dòng đi qua dễ dàng, nên diode dẫn điện.' },
      { q: 'Một mẫu silic được pha tạp photpho (nhóm V). Đây là bán dẫn loại gì, hạt tải đa số là gì?', a: 'Photpho thuộc nhóm V (thừa electron so với Si nhóm IV), tạo bán dẫn loại n. Hạt tải điện đa số là electron tự do.' },
    ],
  },

  'H11LY-w22-quiz': {
    topic: 'Từ trường và tương tác từ',
    intro: 'Sang chương Từ trường! Nam châm và dòng điện đều sinh ra từ trường vô hình quanh chúng. Tuần này các em làm quen với khái niệm từ trường, đường sức từ và cảm ứng từ.',
    objectives: [
      'Nêu được khái niệm từ trường và nguồn gây ra từ trường.',
      'Mô tả được đường sức từ và quy ước chiều của chúng.',
      'Nêu được khái niệm cảm ứng từ B và đơn vị tesla.',
    ],
    theory: [
      { h: 'Từ trường' },
      { p: 'Từ trường là môi trường vật chất bao quanh nam châm và dòng điện, tác dụng lực từ lên nam châm hoặc dòng điện khác đặt trong nó. Nguồn gây ra từ trường là dòng điện (điện tích chuyển động) và nam châm.' },
      { h: 'Đường sức từ' },
      { ul: [
        'Bên ngoài nam châm, đường sức từ đi ra từ cực Bắc (N) và đi vào cực Nam (S).',
        'Bên trong nam châm, đường sức đi từ S đến N — các đường sức từ là những đường cong khép kín.',
        'Nơi đường sức từ mau (dày) thì từ trường mạnh, nơi thưa thì từ trường yếu.',
      ] },
      { h: 'Cảm ứng từ và quy tắc nắm tay phải' },
      { p: 'Cảm ứng từ B là đại lượng vectơ đặc trưng cho độ mạnh và hướng của từ trường tại một điểm, đơn vị tesla (T), với 1 T = 1 N/(A·m); vectơ B tiếp tuyến với đường sức từ. Quy tắc nắm tay phải cho dòng thẳng: nắm bàn tay phải sao cho ngón cái chỉ chiều dòng điện, các ngón còn lại khum lại chỉ chiều đường sức từ bao quanh dây.' },
      { h: 'Từ trường đều' },
      { p: 'Từ trường đều có vectơ cảm ứng từ B như nhau tại mọi điểm; đường sức là những đường thẳng song song, cách đều nhau (ví dụ bên trong ống dây dài).' },
      { note: 'Khác với điện trường (đường sức hở, đi từ + đến −), đường sức từ luôn khép kín — không có "điện tích từ" riêng lẻ.' },
    ],
    examples: [
      { q: 'Một dòng điện thẳng chạy theo chiều thẳng đứng hướng lên. Dùng quy tắc nắm tay phải, xác định chiều đường sức từ ở phía trước dây (về phía người quan sát).', a: 'Ngón cái chỉ lên (chiều dòng), các ngón khum vòng quanh dây. Ở phía trước dây (phía người quan sát), đường sức từ hướng sang trái; phía sau hướng sang phải — đường sức là các vòng tròn ngược chiều kim đồng hồ khi nhìn từ trên xuống.' },
      { q: 'Một nam châm thẳng. Hỏi bên ngoài nam châm, đường sức từ đi từ cực nào sang cực nào?', a: 'Bên ngoài nam châm, đường sức từ đi ra từ cực Bắc (N) và đi vào cực Nam (S). Bên trong thì ngược lại (S → N) để tạo thành đường cong khép kín.' },
    ],
  },

  'H11LY-w23-quiz': {
    topic: 'Lực từ tác dụng lên dây dẫn mang dòng điện',
    intro: 'Khi đặt dây có dòng điện vào từ trường, nó chịu lực từ — nguyên lý của mọi động cơ điện. Tuần này các em học công thức lực từ và quy tắc bàn tay trái.',
    objectives: [
      'Viết và vận dụng công thức lực từ F = B·I·l·sinα.',
      'Dùng quy tắc bàn tay trái xác định chiều lực từ.',
      'Nêu được biểu thức lực Lo-ren-xơ tác dụng lên điện tích chuyển động.',
    ],
    theory: [
      { h: 'Lực từ lên dây dẫn' },
      { p: 'Một đoạn dây dẫn dài l mang dòng điện I đặt trong từ trường đều B chịu lực từ: F = B·I·l·sinα, với α là góc giữa dây dẫn và vectơ cảm ứng từ B.' },
      { ul: [
        'Khi dây vuông góc với B (α = 90°): F = B·I·l (lực cực đại).',
        'Khi dây song song với B (α = 0°): F = 0 (không có lực từ).',
      ] },
      { h: 'Quy tắc bàn tay trái' },
      { p: 'Đặt bàn tay trái sao cho các đường sức từ đâm vào lòng bàn tay, chiều từ cổ tay đến ngón tay chỉ chiều dòng điện, thì ngón cái choãi ra chỉ chiều lực từ.' },
      { h: 'Đơn vị cảm ứng từ' },
      { p: 'Từ F = B·I·l suy ra đơn vị tesla: 1 T = 1 N/(A·m).' },
      { h: 'Lực Lo-ren-xơ' },
      { p: 'Một điện tích q chuyển động với vận tốc v trong từ trường B chịu lực Lo-ren-xơ: f = |q|·v·B·sinα, với α là góc giữa v và B. Lực này luôn vuông góc với vận tốc nên chỉ làm đổi hướng, không làm thay đổi tốc độ — hạt chuyển động tròn đều khi v vuông góc B.' },
      { note: 'Lực từ lên dây dẫn thực chất là tổng hợp các lực Lo-ren-xơ tác dụng lên các electron chuyển động trong dây.' },
    ],
    examples: [
      { q: 'Đoạn dây dài 20 cm mang dòng 5 A đặt vuông góc với từ trường đều B = 0,4 T. Tính lực từ.', a: 'α = 90° nên sinα = 1. F = B·I·l = 0,4·5·0,2 = 0,4 N.' },
      { q: 'Một electron (q = 1,6·10⁻¹⁹ C) bay với vận tốc 2·10⁶ m/s vuông góc với từ trường B = 0,5 T. Tính độ lớn lực Lo-ren-xơ.', a: 'f = |q|·v·B·sinα = 1,6·10⁻¹⁹·2·10⁶·0,5·1 = 1,6·10⁻¹³ N.' },
    ],
  },

  'H11LY-w24-quiz': {
    topic: 'Từ trường của dòng điện trong các dạng dây dẫn',
    intro: 'Mỗi hình dạng dây tạo ra từ trường khác nhau: dây thẳng, vòng tròn, ống dây. Tuần này các em học công thức cảm ứng từ cho từng dạng và lực giữa hai dây song song.',
    objectives: [
      'Viết được công thức cảm ứng từ của dòng thẳng, vòng dây tròn và ống dây.',
      'Áp dụng nguyên lý chồng chất từ trường.',
      'Giải thích được lực tương tác giữa hai dòng điện song song.',
    ],
    theory: [
      { h: 'Dòng điện thẳng dài' },
      { p: 'Cảm ứng từ tại điểm cách dây khoảng r: B = (μ₀·I)/(2π·r) = 2·10⁻⁷·I/r. Đường sức là những vòng tròn đồng tâm bao quanh dây.' },
      { h: 'Vòng dây tròn' },
      { p: 'Cảm ứng từ tại tâm vòng dây tròn bán kính R, mang dòng I: B = (μ₀·I)/(2R) = 2π·10⁻⁷·I/R. Với N vòng dây: B = N·(μ₀·I)/(2R).' },
      { h: 'Ống dây dài (solenoid)' },
      { p: 'Bên trong ống dây dài, từ trường gần như đều và song song trục: B = μ₀·n·I = 4π·10⁻⁷·n·I, với n là số vòng dây trên một đơn vị chiều dài (n = N/l).' },
      { h: 'Nguyên lý chồng chất và lực giữa hai dòng song song' },
      { ul: [
        'Nguyên lý chồng chất: cảm ứng từ tổng hợp bằng tổng vectơ các thành phần B = B₁ + B₂ + … (cộng vectơ).',
        'Hai dòng cùng chiều: hút nhau; hai dòng ngược chiều: đẩy nhau.',
        'Lực trên mỗi đơn vị chiều dài: F/l = 2·10⁻⁷·I₁·I₂/r.',
      ] },
      { note: 'μ₀ = 4π·10⁻⁷ T·m/A là hằng số từ (độ từ thẩm của chân không).' },
    ],
    examples: [
      { q: 'Dòng điện thẳng I = 5 A. Tính cảm ứng từ tại điểm cách dây 10 cm.', a: 'B = 2·10⁻⁷·I/r = 2·10⁻⁷·5/0,1 = 2·10⁻⁷·50 = 10⁻⁵ T.' },
      { q: 'Ống dây dài 50 cm gồm 1000 vòng, dòng I = 2 A. Tính cảm ứng từ bên trong ống.', a: 'n = N/l = 1000/0,5 = 2000 vòng/m. B = 4π·10⁻⁷·n·I = 4π·10⁻⁷·2000·2 = 4π·10⁻⁷·4000 ≈ 5,03·10⁻³ T.' },
    ],
  },

  'H11LY-w25-quiz': {
    topic: 'Cảm ứng điện từ — Hiện tượng',
    intro: 'Phát hiện vĩ đại của Faraday: từ trường biến thiên sinh ra dòng điện. Tuần này các em học hiện tượng cảm ứng điện từ, từ thông và định luật Lenz — cơ sở của máy phát điện.',
    objectives: [
      'Nêu được khái niệm từ thông và hiện tượng cảm ứng điện từ.',
      'Phát biểu và vận dụng định luật Faraday về suất điện động cảm ứng.',
      'Vận dụng định luật Lenz xác định chiều dòng điện cảm ứng.',
    ],
    theory: [
      { h: 'Từ thông' },
      { p: 'Từ thông qua một diện tích S đặt trong từ trường đều B: Φ = B·S·cosα, với α là góc giữa vectơ pháp tuyến của mặt phẳng và vectơ B. Đơn vị là vê-be (Wb), với 1 Wb = 1 T·m².' },
      { h: 'Hiện tượng cảm ứng điện từ' },
      { p: 'Khi từ thông qua mạch kín biến thiên, trong mạch xuất hiện dòng điện cảm ứng (kèm suất điện động cảm ứng). Hiện tượng này gọi là cảm ứng điện từ, do Faraday phát hiện.' },
      { h: 'Định luật Faraday' },
      { p: 'Suất điện động cảm ứng tỉ lệ với tốc độ biến thiên từ thông: e_c = -dΦ/dt. Với khung N vòng: e_c = -N·dΦ/dt. Độ lớn |e_c| = N·|ΔΦ|/Δt.' },
      { h: 'Định luật Lenz' },
      { p: 'Dấu trừ trong công thức Faraday biểu thị định luật Lenz: dòng điện cảm ứng có chiều sao cho từ trường do nó sinh ra chống lại sự biến thiên của từ thông đã sinh ra nó. Đây là hệ quả của định luật bảo toàn năng lượng.' },
      { note: 'Nhờ định luật Lenz, khi đẩy nam châm lại gần cuộn dây ta thấy có lực cản — đó là lý do máy phát điện cần năng lượng cơ học để quay.' },
    ],
    examples: [
      { q: 'Một khung dây phẳng diện tích 0,02 m² đặt vuông góc từ trường đều B = 0,5 T. Tính từ thông qua khung.', a: 'Khung vuông góc B nên pháp tuyến song song B, α = 0°, cosα = 1. Φ = B·S·cosα = 0,5·0,02·1 = 0,01 Wb.' },
      { q: 'Từ thông qua một khung dây N = 200 vòng giảm đều từ 0,06 Wb xuống 0,02 Wb trong 0,2 s. Tính độ lớn suất điện động cảm ứng.', a: '|ΔΦ| = 0,06 − 0,02 = 0,04 Wb. |e_c| = N·|ΔΦ|/Δt = 200·0,04/0,2 = 200·0,2 = 40 V.' },
    ],
  },

  'H11LY-w26-quiz': {
    topic: 'Suất điện động cảm ứng trong đoạn dây chuyển động',
    intro: 'Khi một thanh dẫn chuyển động cắt các đường sức từ, hai đầu nó xuất hiện hiệu điện thế. Đây chính là nguyên lý hoạt động của máy phát điện. Tuần này ta học sâu hiện tượng này.',
    objectives: [
      'Viết được công thức suất điện động trong đoạn dây chuyển động e_c = B·l·v.',
      'Dùng quy tắc bàn tay phải xác định chiều dòng điện cảm ứng.',
      'Giải thích bản chất hiện tượng qua lực Lo-ren-xơ và nêu ứng dụng.',
    ],
    theory: [
      { h: 'Suất điện động trong đoạn dây chuyển động' },
      { p: 'Một đoạn dây dẫn dài l chuyển động đều với vận tốc v vuông góc với từ trường đều B (và vuông góc với chính dây) thì hai đầu dây xuất hiện suất điện động cảm ứng: e_c = B·l·v.' },
      { ul: [
        'Nếu dây chuyển động song song với đường sức từ (không cắt đường sức): e_c = 0.',
        'Tổng quát khi v hợp góc với B: e_c = B·l·v·sinα.',
      ] },
      { h: 'Quy tắc bàn tay phải' },
      { p: 'Đặt bàn tay phải hứng các đường sức từ vào lòng bàn tay, ngón cái choãi ra theo chiều chuyển động v, thì chiều từ cổ tay đến các ngón tay chỉ chiều dòng điện cảm ứng trong dây.' },
      { h: 'Bản chất hiện tượng' },
      { p: 'Khi dây chuyển động, các electron tự do trong dây cũng chuyển động theo và chịu lực Lo-ren-xơ, bị đẩy về một đầu dây, tạo nên sự tích điện trái dấu ở hai đầu — đó chính là suất điện động cảm ứng.' },
      { h: 'Ứng dụng và dòng Foucault' },
      { ul: [
        'Ứng dụng: máy phát điện (biến cơ năng thành điện năng), máy biến áp.',
        'Dòng Foucault (dòng xoáy): dòng cảm ứng sinh ra trong khối kim loại đặt trong từ trường biến thiên; gây hao phí (làm nóng lõi máy biến áp) nhưng cũng được dùng trong phanh điện từ, bếp từ.',
      ] },
      { note: 'Để giảm dòng Foucault có hại trong lõi máy biến áp, người ta ghép lõi từ nhiều lá thép mỏng cách điện với nhau.' },
    ],
    examples: [
      { q: 'Một thanh dẫn dài 0,5 m chuyển động đều với vận tốc 4 m/s vuông góc với từ trường đều B = 0,2 T. Tính suất điện động cảm ứng.', a: 'e_c = B·l·v = 0,2·0,5·4 = 0,4 V.' },
      { q: 'Thanh dẫn dài 0,4 m chuyển động vuông góc đường sức trong từ trường B = 0,5 T, tạo ra suất điện động 1 V. Tính vận tốc của thanh.', a: 'Từ e_c = B·l·v → v = e_c/(B·l) = 1/(0,5·0,4) = 1/0,2 = 5 m/s.' },
    ],
  },

  'H11LY-w27-quiz': {
    topic: 'Hiện tượng tự cảm',
    intro: 'Khi dòng điện trong một cuộn dây thay đổi, chính nó sinh ra suất điện động chống lại sự thay đổi đó — đó là tự cảm. Tuần này các em học hệ số tự cảm và năng lượng từ trường.',
    objectives: [
      'Nêu được hiện tượng tự cảm và hệ số tự cảm.',
      'Viết được công thức suất điện động tự cảm.',
      'Tính được năng lượng từ trường tích trữ trong cuộn cảm.',
    ],
    theory: [
      { h: 'Hiện tượng tự cảm' },
      { p: 'Tự cảm là hiện tượng cảm ứng điện từ xảy ra trong một mạch kín do chính sự biến thiên của dòng điện trong mạch đó gây ra. Tự cảm rõ nhất khi đóng, ngắt mạch hoặc khi dùng dòng xoay chiều.' },
      { h: 'Hệ số tự cảm' },
      { p: 'Từ thông riêng của mạch tỉ lệ với dòng điện: Φ = L·I, với L là hệ số tự cảm, đơn vị henry (H), 1 H = 1 Wb/A. Với ống dây dài: L = μ₀·n²·V = 4π·10⁻⁷·n²·V (V là thể tích lõi).' },
      { h: 'Suất điện động tự cảm' },
      { p: 'e_tc = -L·(dI/dt). Độ lớn |e_tc| = L·|ΔI|/Δt. Dấu trừ thể hiện suất điện động tự cảm chống lại sự biến thiên dòng điện (theo định luật Lenz).' },
      { h: 'Năng lượng từ trường' },
      { p: 'Cuộn cảm mang dòng I tích trữ năng lượng dưới dạng năng lượng từ trường: W = ½·L·I².' },
      { note: 'Khi ngắt mạch có cuộn cảm, dòng giảm rất nhanh khiến |e_tc| lớn, có thể gây tia lửa điện ở khoá K — đó là biểu hiện trực quan của tự cảm.' },
    ],
    examples: [
      { q: 'Cuộn cảm có hệ số tự cảm L = 0,2 H. Dòng điện qua cuộn giảm đều từ 5 A xuống 1 A trong 0,1 s. Tính độ lớn suất điện động tự cảm.', a: '|ΔI| = 5 − 1 = 4 A. |e_tc| = L·|ΔI|/Δt = 0,2·4/0,1 = 0,2·40 = 8 V.' },
      { q: 'Cuộn cảm L = 0,5 H có dòng điện I = 4 A chạy qua. Tính năng lượng từ trường tích trữ.', a: 'W = ½·L·I² = ½·0,5·4² = ½·0,5·16 = 4 J.' },
    ],
  },

  'H11LY-w28-quiz': {
    topic: 'Bài tập tổng hợp dao động điều hoà',
    intro: 'Tuần này ta luyện kỹ năng giải bài tập dao động: đọc phương trình, tính các đại lượng đặc trưng, vận dụng công thức con lắc. Hãy làm chậm, đổi đơn vị cẩn thận.',
    objectives: [
      'Thành thạo việc đọc các đại lượng A, ω, φ từ phương trình dao động.',
      'Tính được vmax, amax, T, f và áp dụng công thức con lắc.',
      'Rèn kỹ năng trình bày lời giải có đơn vị rõ ràng.',
    ],
    theory: [
      { h: 'Quy trình giải bài dao động' },
      { ul: [
        'Bước 1: So sánh phương trình với x = A·cos(ωt+φ) để rút A, ω, φ.',
        'Bước 2: Tính các đại lượng dẫn xuất: T = 2π/ω, f = 1/T, vmax = Aω, amax = Aω².',
        'Bước 3: Đổi đơn vị về SI khi cần và kiểm tra lại kết quả.',
      ] },
      { h: 'Công thức con lắc cần nhớ' },
      { ul: [
        'Con lắc lò xo: ω = √(k/m), T = 2π·√(m/k).',
        'Con lắc đơn: ω = √(g/l), T = 2π·√(l/g).',
      ] },
      { h: 'Hệ thức độc lập thời gian' },
      { p: 'A² = x² + (v/ω)²  →  v = ±ω·√(A²−x²). Dùng để tìm v tại li độ bất kỳ.' },
      { h: 'Năng lượng' },
      { p: 'W = ½kA² = ½mω²A²; tại li độ x: Wt = ½kx², Wđ = W − Wt.' },
      { note: 'Sai lầm phổ biến: nhầm vmax = Aω với amax = Aω², và quên đổi cm sang m khi tính năng lượng.' },
    ],
    examples: [
      { q: 'Vật dao động điều hoà x = 6·cos(4πt − π/3) cm. Tính chu kỳ, vmax, amax.', a: 'A = 6 cm = 0,06 m; ω = 4π rad/s. T = 2π/ω = 2π/(4π) = 0,5 s. vmax = Aω = 0,06·4π ≈ 0,754 m/s. amax = Aω² = 0,06·(4π)² = 0,06·157,9 ≈ 9,47 m/s².' },
      { q: 'Con lắc đơn dài l = 1 m, g = π² m/s². Tính chu kỳ và tần số.', a: 'T = 2π·√(l/g) = 2π·√(1/π²) = 2π·(1/π) = 2 s. f = 1/T = 0,5 Hz.' },
    ],
  },

  'H11LY-w29-quiz': {
    topic: 'Bài tập điện học',
    intro: 'Tuần này ta luyện bài tập điện trường và dòng điện: định luật Coulomb, tụ điện, định luật Ohm cho đoạn mạch và toàn mạch. Đặc biệt chú ý đổi đơn vị μC, μF.',
    objectives: [
      'Vận dụng định luật Coulomb tính lực giữa hai điện tích.',
      'Tính điện tích, năng lượng của tụ và dòng điện trong mạch.',
      'Áp dụng định luật Ohm cho toàn mạch.',
    ],
    theory: [
      { h: 'Định luật Coulomb' },
      { p: 'F = k·|q₁·q₂|/(ε·r²), k = 9·10⁹ N·m²/C². Nhớ đổi μC → 10⁻⁶ C, cm → 10⁻² m trước khi thay số.' },
      { h: 'Tụ điện' },
      { ul: [
        'Q = C·U; W = ½·C·U² = ½·Q·U = Q²/(2C).',
        'μF = 10⁻⁶ F.',
      ] },
      { h: 'Định luật Ohm' },
      { ul: [
        'Đoạn mạch: I = U/R.',
        'Toàn mạch: I = E/(R+r); U_ngoài = E − I·r.',
      ] },
      { h: 'Công suất điện' },
      { p: 'P = U·I = I²·R = U²/R. Điện năng tiêu thụ A = U·I·t.' },
      { note: 'Khi mạch có nguồn, đừng quên cộng điện trở trong r vào mẫu số của công thức Ohm toàn mạch.' },
    ],
    examples: [
      { q: 'Hai điện tích q₁ = 3·10⁻⁶ C và q₂ = 4·10⁻⁶ C cách nhau 6 cm trong không khí. Tính lực tương tác.', a: 'F = k·|q₁q₂|/r² = 9·10⁹·(3·10⁻⁶·4·10⁻⁶)/(0,06)² = 9·10⁹·12·10⁻¹²/3,6·10⁻³ = 0,108/3,6·10⁻³ = 30 N.' },
      { q: 'Nguồn E = 9 V, r = 1 Ω nối với điện trở R = 2 Ω. Tính dòng điện và công suất tiêu thụ trên R.', a: 'I = E/(R+r) = 9/(2+1) = 3 A. P_R = I²·R = 3²·2 = 18 W.' },
    ],
  },

  'H11LY-w30-quiz': {
    topic: 'Bài tập sóng cơ và sóng âm',
    intro: 'Tuần này ta luyện bài tập về sóng: tính bước sóng, sóng dừng trên dây, mức cường độ âm. Công thức v = λf là chìa khoá, hãy dùng thuần thục.',
    objectives: [
      'Vận dụng công thức v = λ·f để tính các đại lượng của sóng.',
      'Giải bài tập sóng dừng trên dây.',
      'Tính mức cường độ âm và sự thay đổi của nó.',
    ],
    theory: [
      { h: 'Công thức sóng cơ' },
      { p: 'v = λ·f = λ/T; λ = v/f. Tần số do nguồn quyết định, không đổi khi sóng qua môi trường khác.' },
      { h: 'Sóng dừng' },
      { ul: [
        'Dây hai đầu cố định: l = k·λ/2 → λ = 2l/k (k là số bó sóng).',
        'Dây một đầu cố định, một đầu tự do: l = (2k+1)·λ/4.',
        'Khoảng cách hai nút (hoặc hai bụng) liên tiếp = λ/2.',
      ] },
      { h: 'Giao thoa' },
      { p: 'Cực đại: hiệu đường đi = k·λ; cực tiểu: (k+½)·λ.' },
      { h: 'Mức cường độ âm' },
      { p: 'L = 10·log(I/I₀); khi I tăng n lần thì L tăng 10·log(n) dB.' },
      { note: 'Bài sóng dừng: số bụng bằng số bó sóng k (dây hai đầu cố định), số nút bằng k+1.' },
    ],
    examples: [
      { q: 'Sóng truyền với tốc độ v = 20 m/s, tần số f = 50 Hz. Tính bước sóng và khoảng cách giữa hai điểm gần nhau nhất dao động ngược pha.', a: 'λ = v/f = 20/50 = 0,4 m. Hai điểm ngược pha gần nhất cách nhau λ/2 = 0,2 m.' },
      { q: 'Một điểm có mức cường độ âm 40 dB. Nếu cường độ âm tăng 10 000 lần thì mức mới bằng bao nhiêu?', a: 'ΔL = 10·log(10000) = 10·4 = 40 dB. Mức mới L\' = 40 + 40 = 80 dB.' },
    ],
  },

  'H11LY-w31-quiz': {
    topic: 'Bài tập từ trường và cảm ứng điện từ',
    intro: 'Tuần này luyện bài tập chương từ trường: cảm ứng từ của các dạng dây, lực từ, suất điện động cảm ứng và năng lượng cuộn cảm. Chú ý hằng số 2·10⁻⁷ và 4π·10⁻⁷.',
    objectives: [
      'Tính cảm ứng từ của dòng thẳng, ống dây và lực từ trên dây.',
      'Tính suất điện động cảm ứng từ định luật Faraday.',
      'Tính năng lượng và suất điện động tự cảm của cuộn cảm.',
    ],
    theory: [
      { h: 'Cảm ứng từ' },
      { ul: [
        'Dòng thẳng dài: B = 2·10⁻⁷·I/r.',
        'Tâm vòng dây: B = 2π·10⁻⁷·I/R.',
        'Ống dây dài: B = 4π·10⁻⁷·n·I (n = N/l).',
      ] },
      { h: 'Lực từ' },
      { p: 'F = B·I·l·sinα. Lực giữa hai dây song song: F/l = 2·10⁻⁷·I₁·I₂/r (cùng chiều hút, ngược chiều đẩy).' },
      { h: 'Cảm ứng điện từ' },
      { ul: [
        'Từ thông: Φ = B·S·cosα.',
        'Suất điện động cảm ứng: |e_c| = N·|ΔΦ|/Δt.',
        'Đoạn dây chuyển động: e_c = B·l·v.',
      ] },
      { h: 'Tự cảm' },
      { p: '|e_tc| = L·|ΔI|/Δt; năng lượng W = ½·L·I².' },
      { note: 'Trong công thức từ thông biến thiên, có thể ΔΦ đến từ thay đổi B, hoặc S, hoặc góc α — đọc kỹ đề.' },
    ],
    examples: [
      { q: 'Khung dây N = 100 vòng, diện tích S = 0,01 m², đặt vuông góc từ trường. Cảm ứng từ tăng đều từ 0 đến 0,1 T trong 0,5 s. Tính suất điện động cảm ứng.', a: '|ΔΦ| = ΔB·S = 0,1·0,01 = 10⁻³ Wb. |e_c| = N·|ΔΦ|/Δt = 100·10⁻³/0,5 = 0,1/0,5 = 0,2 V.' },
      { q: 'Cuộn cảm L = 2 H mang dòng I = 3 A. Tính năng lượng từ trường; nếu dòng giảm đều về 0 trong 0,5 s thì suất điện động tự cảm bằng bao nhiêu?', a: 'W = ½·L·I² = ½·2·9 = 9 J. |e_tc| = L·|ΔI|/Δt = 2·3/0,5 = 12 V.' },
    ],
  },

  'H11LY-w32-quiz': {
    topic: 'Bài tập tổng hợp Chương 1–6',
    intro: 'Tuần này ta hệ thống và luyện tập tổng hợp toàn bộ chương trình: dao động, sóng, điện trường, dòng điện và từ trường. Hãy củng cố các công thức trụ cột trước kỳ thi.',
    objectives: [
      'Tổng hợp các công thức cốt lõi của sáu chương.',
      'Vận dụng linh hoạt để giải bài tập liên chương.',
      'Nhận diện và tránh các sai lầm thường gặp.',
    ],
    theory: [
      { h: 'Dao động và con lắc' },
      { p: 'T_lò xo = 2π·√(m/k); T_đơn = 2π·√(l/g); W = ½kA². T tỉ lệ √m và √l.' },
      { h: 'Sóng' },
      { p: 'v = λ·f; cực đại giao thoa d₂−d₁ = k·λ; sóng dừng hai đầu cố định l = k·λ/2; L = 10·log(I/I₀).' },
      { h: 'Điện trường' },
      { p: 'F = k·|q₁q₂|/r²; E = F/q = k·|Q|/r²; tụ C = Q/U, W = ½CU².' },
      { h: 'Dòng điện và từ trường' },
      { ul: [
        'Ohm toàn mạch: I = E/(R+r).',
        'Cảm ứng từ dòng thẳng: B = 2·10⁻⁷·I/r; lực từ F = BIl·sinα.',
        'Cảm ứng điện từ: |e_c| = N·|ΔΦ|/Δt; tự cảm W = ½LI².',
      ] },
      { note: 'Định luật Lenz: dòng cảm ứng luôn chống lại nguyên nhân sinh ra nó — hệ quả của bảo toàn năng lượng. Định luật Coulomb tỉ lệ nghịch r² giống định luật vạn vật hấp dẫn.' },
    ],
    examples: [
      { q: 'Con lắc lò xo tăng khối lượng m lên gấp 4 lần thì chu kỳ thay đổi thế nào?', a: 'Vì T = 2π·√(m/k) tỉ lệ với √m, tăng m gấp 4 lần thì T tăng √4 = 2 lần.' },
      { q: 'Nguồn E = 10 V, r = 0,5 Ω nối với R = 4,5 Ω. Tính dòng điện và hiệu điện thế mạch ngoài.', a: 'I = E/(R+r) = 10/(4,5+0,5) = 10/5 = 2 A. U = E − I·r = 10 − 2·0,5 = 9 V.' },
    ],
  },

  'H11LY-w33-quiz': {
    topic: 'Ôn tập học kỳ II — Dòng điện trong các môi trường',
    intro: 'Tuần này ta ôn tập chương dòng điện trong các môi trường: kim loại, chất điện phân, chân không và bán dẫn. Hãy nhớ rõ bản chất hạt tải điện ở mỗi môi trường.',
    objectives: [
      'So sánh bản chất dòng điện trong các môi trường khác nhau.',
      'Vận dụng định luật Faraday về điện phân.',
      'Phân biệt bán dẫn loại n, loại p và nêu hiện tượng siêu dẫn.',
    ],
    theory: [
      { h: 'Bản chất hạt tải điện' },
      { ul: [
        'Kim loại: dòng các electron tự do.',
        'Chất điện phân: dòng các ion dương và ion âm.',
        'Chân không: dòng các electron bứt từ catot nóng.',
        'Bán dẫn: dòng các electron tự do và lỗ trống.',
      ] },
      { h: 'Điện trở suất kim loại' },
      { p: 'ρ = ρ₀·(1 + α·Δt); tăng theo nhiệt độ. Dưới Tc một số vật liệu siêu dẫn (ρ = 0).' },
      { h: 'Điện phân — Faraday' },
      { p: 'm = (A·I·t)/(n·F), F = 96 500 C/mol. Ứng dụng: mạ điện, tinh luyện và điều chế kim loại.' },
      { h: 'Bán dẫn' },
      { ul: [
        'Loại n (pha tạp nhóm V): hạt tải đa số là electron.',
        'Loại p (pha tạp nhóm III): hạt tải đa số là lỗ trống.',
        'Lớp tiếp xúc p-n có tính chỉnh lưu (diode).',
      ] },
      { note: 'Lưu ý: dòng điện trong kim loại và bán dẫn loại n đều do electron, nhưng kim loại không có lỗ trống còn bán dẫn thì có cả hai loại hạt tải.' },
    ],
    examples: [
      { q: 'Điện phân dung dịch AgNO₃ với dòng 2 A trong 16 phút 5 giây. Tính khối lượng bạc bám catot (Ag: A = 108, n = 1).', a: 't = 16·60 + 5 = 965 s. m = (A·I·t)/(n·F) = (108·2·965)/(1·96500) = 208440/96500 ≈ 2,16 g.' },
      { q: 'Dây kim loại có điện trở 5 Ω ở 0°C, α = 5·10⁻³ K⁻¹. Tính điện trở ở 60°C.', a: 'R = R₀·(1 + α·Δt) = 5·(1 + 5·10⁻³·60) = 5·(1 + 0,3) = 5·1,3 = 6,5 Ω.' },
    ],
  },

  'H11LY-w34-quiz': {
    topic: 'Ôn tập học kỳ II — Từ trường và cảm ứng điện từ',
    intro: 'Tuần này ta ôn tập chương từ trường và cảm ứng điện từ — hai chương cuối của học kỳ. Hãy chắc chắn các em phân biệt cảm ứng từ B, từ thông Φ và các đơn vị tương ứng.',
    objectives: [
      'Hệ thống các công thức về từ trường, lực từ và cảm ứng điện từ.',
      'Phân biệt cảm ứng từ, từ thông và hệ số tự cảm cùng đơn vị của chúng.',
      'Vận dụng định luật Faraday và Lenz.',
    ],
    theory: [
      { h: 'Cảm ứng từ và lực từ' },
      { ul: [
        'Cảm ứng từ B đo bằng tesla (T).',
        'Lực từ lên dây: F = B·I·l·sinα.',
        'Lực Lo-ren-xơ: f = |q|·v·B·sinα.',
      ] },
      { h: 'Từ trường của dòng điện' },
      { p: 'Dòng thẳng: B = 2·10⁻⁷·I/r; ống dây dài: B = 4π·10⁻⁷·n·I.' },
      { h: 'Từ thông và cảm ứng điện từ' },
      { ul: [
        'Từ thông: Φ = B·S·cosα, đơn vị vê-be (Wb).',
        'Suất điện động cảm ứng tỉ lệ với tốc độ biến thiên từ thông: |e_c| = N·|dΦ/dt|.',
        'Định luật Lenz: dòng cảm ứng chống lại sự biến thiên từ thông.',
      ] },
      { h: 'Tự cảm' },
      { p: 'Hệ số tự cảm L đo bằng henry (H); suất điện động tự cảm |e_tc| = L·|dI/dt|; năng lượng W = ½·L·I².' },
      { note: 'Đừng nhầm đơn vị: B (tesla), Φ (vê-be = T·m²), L (henry = Wb/A). Cảm ứng từ là vectơ, từ thông là đại lượng vô hướng.' },
    ],
    examples: [
      { q: 'Một khung dây tròn diện tích 0,05 m² đặt trong từ trường đều B = 0,4 T sao cho pháp tuyến hợp với B góc 60°. Tính từ thông.', a: 'Φ = B·S·cosα = 0,4·0,05·cos60° = 0,4·0,05·0,5 = 0,01 Wb.' },
      { q: 'Một thanh dẫn dài 0,6 m chuyển động vuông góc các đường sức với vận tốc 5 m/s trong từ trường B = 0,3 T. Tính suất điện động cảm ứng.', a: 'e_c = B·l·v = 0,3·0,6·5 = 0,9 V.' },
    ],
  },

  'H11LY-w35-quiz': {
    topic: 'Thi học kỳ — Tổng ôn toàn chương trình',
    intro: 'Tuần cuối cùng — tổng ôn toàn bộ chương trình Vật lý 11 trước kỳ thi học kỳ. Hãy rà soát lần cuối các công thức trụ cột và các dạng năng lượng. Chúc các em làm bài thật tốt!',
    objectives: [
      'Tổng ôn toàn bộ kiến thức Vật lý 11 từ dao động đến cảm ứng điện từ.',
      'Phân biệt được các dạng năng lượng được tích trữ trong từng linh kiện.',
      'Tự tin vận dụng công thức để giải nhanh các câu trắc nghiệm.',
    ],
    theory: [
      { h: 'Dao động và sóng' },
      { ul: [
        'DĐĐH: x = A·cos(ωt+φ); W = ½kA² = ½mω²A².',
        'Sóng cơ: v = λ·f; sóng âm trong khí là sóng dọc, truyền nhanh nhất trong chất rắn, không truyền trong chân không.',
      ] },
      { h: 'Điện trường và dòng điện' },
      { p: 'Coulomb: F = k·|q₁q₂|/r²; cường độ điện trường E = F/q; tụ tích trữ năng lượng điện trường W = ½CU². Dòng điện: I = q/t; đoạn mạch U = I·R; toàn mạch I = E/(R+r); P = U·I.' },
      { h: 'Từ trường và cảm ứng' },
      { ul: [
        'Lực từ F = B·I·l·sinα; từ thông Φ = B·S·cosα.',
        'Suất điện động cảm ứng |e_c| = N·|dΦ/dt|.',
        'Cuộn cảm tích trữ năng lượng từ trường W = ½LI².',
      ] },
      { h: 'Các dạng năng lượng tích trữ' },
      { ul: [
        'Tụ điện tích trữ năng lượng điện trường.',
        'Cuộn cảm tích trữ năng lượng từ trường.',
        'Con lắc dao động: cơ năng = động năng + thế năng (bảo toàn).',
      ] },
      { note: 'Mẹo thi: luôn đổi đơn vị về SI, phân biệt vmax = Aω với amax = Aω², và nhớ tụ ↔ điện trường, cuộn cảm ↔ từ trường.' },
    ],
    examples: [
      { q: 'Một con lắc lò xo k = 80 N/m dao động với biên độ A = 5 cm. Tính cơ năng.', a: 'W = ½kA² = ½·80·(0,05)² = ½·80·0,0025 = 0,1 J.' },
      { q: 'Tụ C = 4 μF nối vào nguồn U = 50 V. Tính năng lượng tích trữ trong tụ. Năng lượng này thuộc dạng nào?', a: 'W = ½·C·U² = ½·4·10⁻⁶·50² = ½·4·10⁻⁶·2500 = 5·10⁻³ J = 5 mJ. Đây là năng lượng điện trường tích trữ giữa hai bản tụ.' },
    ],
  },

  'H11LY-w36-quiz': {
    topic: 'Kết thúc Vật Lý 11 — Điện Từ Quang và hành trình lớp 12',
    intro: 'Vật Lý 11 đã đưa chúng ta khám phá ba trụ cột lớn: điện học, từ học và quang học. Hôm nay chúng ta nhìn lại toàn bộ bức tranh, kết nối các chủ đề với nhau và chuẩn bị tâm thế vững chắc cho lớp 12 — năm học vật lý cuối cùng của THPT.',
    objectives: [
      'Hệ thống hoá các chương học Vật Lý 11 theo ba mảng: điện học, từ học, quang học.',
      'Nhận diện những công thức cốt lõi nhất cần nhớ cho kì thi tốt nghiệp THPT Quốc gia.',
      'Hiểu các chủ đề lớp 12 sẽ kế thừa và ứng dụng từ nền tảng lớp 11.',
    ],
    theory: [
      { h: 'Điện học — trụ cột thứ nhất' },
      { ul: [
        'Điện tích và lực Coulomb: F = k·q₁q₂/r² (k = 9·10⁹ N·m²/C²).',
        'Điện trường: E = F/q; điện thế U = A/q; tụ điện Q = CU, W = ½CU².',
        'Dòng điện không đổi: định luật Ohm, mạch nối tiếp/song song, công suất P = UI = I²R = U²/R.',
        'Dòng điện trong các môi trường: kim loại, chất điện phân (định luật Faraday), chân không, chất khí.',
      ] },
      { h: 'Từ học — trụ cột thứ hai' },
      { ul: [
        'Từ trường: lực từ F = B·I·l·sinα; lực Lorentz f = q·v·B·sinα.',
        'Cảm ứng điện từ: suất điện động e = −N·dΦ/dt (định luật Faraday); Lenz → chiều dòng cảm ứng.',
        'Tự cảm: e_L = −L·dI/dt; năng lượng W = ½LI².',
      ] },
      { h: 'Quang học — trụ cột thứ ba' },
      { ul: [
        'Khúc xạ ánh sáng: n₁·sinθ₁ = n₂·sinθ₂ (định luật Snell); góc giới hạn phản xạ toàn phần.',
        'Lăng kính và thấu kính: tiêu cực/tiêu điểm, công thức thấu kính 1/f = 1/d + 1/d\'.',
        'Mắt và dụng cụ quang học: mắt cận/viễn/lão, kính lúp, kính hiển vi, kính thiên văn.',
      ] },
      { h: 'Vật Lý 12 — nối tiếp ra sao?' },
      { ul: [
        'Dao động và sóng cơ học: từ dao động điện từ (mạch LC) → sóng điện từ.',
        'Dòng điện xoay chiều (AC): mạch RLC, cộng hưởng, máy biến áp — ứng dụng điện học lớp 11.',
        'Vật lý hạt nhân: phóng xạ, phản ứng hạt nhân — chương mới nhất và quan trọng nhất trong đề thi.',
        'Vật lý lượng tử: ánh sáng lưỡng tính, hiệu ứng quang điện, mô hình Bohr của nguyên tử.',
      ] },
      { note: 'Vật lý không phải môn học công thức — là môn học tư duy. Khi gặp bài tập khó, hãy vẽ hình và xác định "cái gì đang xảy ra trong vật lý" trước khi chọn công thức. Năng lực này sẽ theo em suốt cuộc đời, không chỉ trong phòng thi.' },
    ],
    examples: [
      { q: 'Công thức nào của Vật Lý 11 xuất hiện nhiều nhất trong đề thi tốt nghiệp THPT Quốc gia?', a: 'Ba công thức quan trọng nhất từ lớp 11 hay gặp trong đề thi: (1) Công thức thấu kính 1/f = 1/d + 1/d\' và số phóng đại k = −d\'/d — thường kết hợp bài toán về mắt/kính cận; (2) Định luật Faraday về cảm ứng điện từ e = −N·ΔΦ/Δt — nền cho chương dòng xoay chiều lớp 12; (3) Định luật Ohm đầy đủ I = ε/(R + r) — nền cho mạch điện xoay chiều. Học kỹ 3 công thức này là học xong "cầu nối" quan trọng nhất.' },
      { q: 'Khi gặp một bài toán vật lý mới chưa biết giải, em nên bắt đầu từ đâu?', a: 'Quy trình 4 bước: (1) VẼ HÌNH — sơ đồ mạch điện, đường đi của ánh sáng, hướng lực... Vẽ giúp não hình dung và thấy cấu trúc bài. (2) XÁC ĐỊNH dữ kiện đã cho và cần tìm gì. (3) CHỌN định luật/công thức phù hợp với hiện tượng vật lý (không "nhồi" công thức ngẫu nhiên). (4) TÍNH toán và KIỂM TRA đơn vị — sai đơn vị là dấu hiệu chọn sai công thức hoặc thiếu bước đổi. Bình tĩnh, từng bước — đây là cách học vật lý đúng nhất.' },
    ],
  },
};
