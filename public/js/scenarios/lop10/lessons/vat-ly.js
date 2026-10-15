// ============================================================
// Lớp 10 · VẬT LÝ — Lý thuyết tuần (35 tuần · HK1: 1–18 · HK2: 19–35)
// Bám CTGD 2018 (Vật lí 10): Động học – Động lực học – Năng lượng – Nhiệt học.
// Key trùng id quiz: "H10LY-wNN-quiz". Dạy lý thuyết, KHÔNG copy quiz.
// ============================================================

export const H10LY_LESSONS = {
  'H10LY-w01-quiz': {
    topic: 'Mở đầu — Phương pháp nghiên cứu Vật lí',
    intro: 'Chào các em đến với môn Vật lí lớp 10. Tuần đầu tiên, các em sẽ hiểu Vật lí học là gì, các nhà khoa học làm việc thế nào, và làm quen với hệ đơn vị đo lường chuẩn quốc tế (SI) — nền tảng cho mọi phép tính suốt cả năm.',
    objectives: [
      'Nêu được đối tượng nghiên cứu và vai trò của Vật lí học.',
      'Trình bày được các bước của phương pháp thực nghiệm.',
      'Biết các đơn vị cơ bản trong hệ SI và cách xử lí sai số đo.',
    ],
    theory: [
      { h: 'Vật lí học nghiên cứu gì?' },
      { p: 'Vật lí học là khoa học nghiên cứu các quy luật cơ bản nhất của tự nhiên: vật chất, năng lượng, không gian, thời gian và sự tương tác giữa chúng. Từ vật lí, con người chế tạo ra động cơ, điện thoại, tàu vũ trụ.' },
      { h: 'Phương pháp thực nghiệm' },
      { p: 'Tri thức vật lí được xây dựng qua một chu trình khoa học chặt chẽ, không phải bằng tưởng tượng suông.' },
      { ul: [
        'Quan sát hiện tượng tự nhiên và đặt câu hỏi.',
        'Đề xuất giả thuyết để giải thích.',
        'Thiết kế và làm thí nghiệm kiểm chứng.',
        'Phân tích số liệu, rút ra kết luận; nếu sai thì sửa giả thuyết.',
      ]},
      { h: 'Hệ đơn vị SI' },
      { p: 'Hệ đo lường quốc tế SI quy định 7 đơn vị cơ bản. Ở lớp 10 các em dùng nhiều nhất: chiều dài là mét (m), khối lượng là kilôgam (kg), thời gian là giây (s).' },
      { h: 'Đại lượng vô hướng và đại lượng vectơ' },
      { p: 'Đại lượng vô hướng chỉ có độ lớn (khối lượng, thời gian, nhiệt độ). Đại lượng vectơ có cả độ lớn lẫn hướng (vận tốc, lực, gia tốc) — phải vẽ mũi tên để biểu diễn.' },
      { note: 'Mọi phép đo đều có sai số do dụng cụ, phương pháp và người đo. Khi ghi kết quả, luôn kèm đơn vị và làm tròn hợp lí.' },
    ],
    examples: [
      { q: 'Đổi 72 km/h ra đơn vị SI (m/s).', a: '1 km = 1000 m, 1 h = 3600 s. Vậy 72 km/h = 72 × 1000 / 3600 = 72000 / 3600 = 20 m/s.' },
      { q: 'Một học sinh đo chiều dài bàn 3 lần được 1,20 m; 1,22 m; 1,21 m. Tính giá trị trung bình.', a: 'Trung bình = (1,20 + 1,22 + 1,21) / 3 = 3,63 / 3 = 1,21 m. Đây là kết quả đáng tin hơn một lần đo đơn lẻ.' },
    ],
  },

  'H10LY-w02-quiz': {
    topic: 'Chuyển động cơ — Tốc độ và vận tốc',
    intro: 'Các em hãy bắt đầu hành trình động học. Tuần này ta định nghĩa chuyển động cơ, hệ quy chiếu, và phân biệt hai khái niệm rất dễ nhầm: tốc độ (vô hướng) và vận tốc (vectơ).',
    objectives: [
      'Định nghĩa được chuyển động cơ và hệ quy chiếu.',
      'Phân biệt quãng đường với độ dời, tốc độ với vận tốc.',
      'Tính được tốc độ trung bình và vận tốc trung bình.',
    ],
    theory: [
      { h: 'Chuyển động cơ là gì?' },
      { p: 'Chuyển động cơ là sự thay đổi vị trí của một vật so với vật khác (vật mốc) theo thời gian. Chuyển động có tính tương đối: cùng một người ngồi trên xe, đứng yên so với xe nhưng chuyển động so với mặt đường.' },
      { h: 'Hệ quy chiếu' },
      { p: 'Để mô tả chuyển động cần một hệ quy chiếu đầy đủ.' },
      { ul: [
        'Vật mốc: vật được chọn coi như đứng yên.',
        'Hệ tọa độ: gắn với vật mốc để xác định vị trí.',
        'Mốc thời gian và đồng hồ: để đo thời điểm và khoảng thời gian.',
      ]},
      { h: 'Quãng đường và độ dời' },
      { p: 'Quãng đường s là tổng chiều dài đường đi (vô hướng, luôn dương). Độ dời là vectơ nối vị trí đầu đến vị trí cuối — có hướng và có thể bằng 0 dù vật đã đi xa (đi rồi quay về).' },
      { h: 'Tốc độ và vận tốc' },
      { p: 'Tốc độ trung bình = quãng đường / thời gian, là đại lượng vô hướng. Vận tốc trung bình = độ dời / thời gian, là đại lượng vectơ có hướng. Đơn vị SI của cả hai là m/s.' },
      { note: 'Vận tốc cho biết vật đi nhanh hay chậm VÀ đi theo hướng nào; tốc độ chỉ cho biết nhanh hay chậm.' },
    ],
    examples: [
      { q: 'Một người chạy 400 m quanh đường tròn rồi về đúng chỗ xuất phát trong 100 s. Tính tốc độ trung bình và vận tốc trung bình.', a: 'Tốc độ trung bình = s/t = 400/100 = 4 m/s. Độ dời = 0 (về chỗ cũ) nên vận tốc trung bình = 0/100 = 0 m/s.' },
      { q: 'Xe đi 150 m theo đường thẳng trong 10 s. Tính vận tốc trung bình.', a: 'Đường thẳng một chiều nên độ dời = quãng đường = 150 m. Vận tốc trung bình = 150/10 = 15 m/s.' },
    ],
  },

  'H10LY-w03-quiz': {
    topic: 'Chuyển động thẳng đều',
    intro: 'Tuần này các em học loại chuyển động đơn giản nhất: chuyển động thẳng đều — đi trên đường thẳng với vận tốc không đổi. Ta sẽ viết phương trình tọa độ và vẽ đồ thị mô tả nó.',
    objectives: [
      'Nêu được đặc điểm của chuyển động thẳng đều.',
      'Viết được công thức quãng đường và phương trình tọa độ.',
      'Nhận dạng đồ thị x–t và v–t.',
    ],
    theory: [
      { h: 'Định nghĩa' },
      { p: 'Chuyển động thẳng đều là chuyển động có quỹ đạo là đường thẳng và vận tốc không đổi cả về độ lớn lẫn hướng (gia tốc bằng 0).' },
      { h: 'Công thức cơ bản' },
      { ul: [
        'Quãng đường: s = v · t',
        'Phương trình tọa độ: x = x0 + v · t (x0 là tọa độ ban đầu)',
      ]},
      { h: 'Đồ thị mô tả' },
      { p: 'Đồ thị tọa độ – thời gian (x–t) là một đường thẳng có độ dốc bằng v. Đồ thị vận tốc – thời gian (v–t) là đường thẳng nằm ngang song song trục thời gian vì v không đổi.' },
      { h: 'Ý nghĩa của dấu vận tốc' },
      { p: 'Nếu v > 0 vật đi theo chiều dương của trục tọa độ; nếu v < 0 vật đi ngược chiều dương. Độ dốc đồ thị x–t càng lớn thì vật đi càng nhanh.' },
      { note: 'Trong chuyển động thẳng đều, diện tích dưới đồ thị v–t chính bằng quãng đường đi được.' },
    ],
    examples: [
      { q: 'Một xe chuyển động thẳng đều với v = 30 km/h. Tính quãng đường đi trong 2 h.', a: 's = v · t = 30 × 2 = 60 km.' },
      { q: 'Vật xuất phát từ x0 = 5 m, đi đều với v = 4 m/s. Viết phương trình tọa độ và tìm vị trí lúc t = 3 s.', a: 'Phương trình: x = 5 + 4t (m). Lúc t = 3 s: x = 5 + 4 × 3 = 5 + 12 = 17 m.' },
    ],
  },

  'H10LY-w04-quiz': {
    topic: 'Chuyển động thẳng biến đổi đều — Gia tốc',
    intro: 'Khi vận tốc thay đổi đều theo thời gian, ta có chuyển động thẳng biến đổi đều. Tuần này các em làm quen với gia tốc và bộ ba công thức quan trọng nhất của động học.',
    objectives: [
      'Định nghĩa được gia tốc và nêu đơn vị của nó.',
      'Viết và vận dụng được ba công thức của chuyển động biến đổi đều.',
      'Phân biệt chuyển động nhanh dần đều và chậm dần đều.',
    ],
    theory: [
      { h: 'Gia tốc' },
      { p: 'Gia tốc là đại lượng đặc trưng cho sự biến đổi của vận tốc theo thời gian: a = Δv / Δt = (v − v0) / t. Đơn vị SI là m/s². Gia tốc là đại lượng vectơ.' },
      { h: 'Ba công thức cơ bản' },
      { ul: [
        'Vận tốc: v = v0 + a · t',
        'Quãng đường: s = v0 · t + ½ · a · t²',
        'Công thức không có thời gian: v² − v0² = 2 · a · s',
      ]},
      { h: 'Nhanh dần đều và chậm dần đều' },
      { p: 'Khi vectơ gia tốc cùng chiều vận tốc, vật chuyển động nhanh dần đều (a và v cùng dấu). Khi gia tốc ngược chiều vận tốc, vật chuyển động chậm dần đều (a và v trái dấu).' },
      { note: 'Khi chọn chiều dương, phải chú ý dấu của v0 và a. Một xe phanh lại có a trái dấu với v.' },
    ],
    examples: [
      { q: 'Xe khởi hành từ nghỉ (v0 = 0), gia tốc a = 2 m/s². Tính vận tốc và quãng đường sau 5 s.', a: 'v = v0 + a·t = 0 + 2 × 5 = 10 m/s. s = v0·t + ½a·t² = 0 + ½ × 2 × 5² = ½ × 2 × 25 = 25 m.' },
      { q: 'Xe đang chạy 20 m/s thì hãm phanh với a = −4 m/s². Tính quãng đường đến khi dừng.', a: 'Khi dừng v = 0. Dùng v² − v0² = 2as → 0 − 20² = 2 × (−4) × s → −400 = −8s → s = 50 m.' },
    ],
  },

  'H10LY-w05-quiz': {
    topic: 'Sự rơi tự do',
    intro: 'Vì sao mọi vật đều rơi xuống? Tuần này các em nghiên cứu sự rơi tự do — một chuyển động nhanh dần đều đặc biệt với gia tốc trọng trường g, và sẽ thấy trong chân không mọi vật rơi như nhau.',
    objectives: [
      'Nêu được định nghĩa và đặc điểm của sự rơi tự do.',
      'Biết giá trị gia tốc rơi tự do g.',
      'Vận dụng công thức tính thời gian rơi và vận tốc chạm đất.',
    ],
    theory: [
      { h: 'Sự rơi tự do là gì?' },
      { p: 'Sự rơi tự do là chuyển động của vật chỉ dưới tác dụng của trọng lực, bỏ qua sức cản không khí. Đó là chuyển động thẳng nhanh dần đều theo phương thẳng đứng, hướng xuống.' },
      { h: 'Gia tốc rơi tự do' },
      { p: 'Mọi vật rơi tự do tại cùng một nơi đều có gia tốc g như nhau, không phụ thuộc khối lượng. Tại mặt đất g ≈ 9,8 m/s² (thường lấy g ≈ 10 m/s² để tính nhanh).' },
      { h: 'Công thức (vật rơi từ trạng thái nghỉ, v0 = 0)' },
      { ul: [
        'Vận tốc: v = g · t',
        'Quãng đường (độ cao rơi): h = ½ · g · t²',
        'Thời gian rơi từ độ cao h: t = √(2h / g)',
        'Vận tốc chạm đất: v = √(2 · g · h)',
      ]},
      { note: 'Trong chân không, viên bi sắt và chiếc lông gà rơi cùng lúc vì gia tốc g như nhau. Ngoài không khí lông gà rơi chậm vì sức cản lớn so với trọng lượng nhỏ.' },
    ],
    examples: [
      { q: 'Thả một vật rơi tự do từ độ cao 20 m, lấy g = 10 m/s². Tính thời gian rơi và vận tốc chạm đất.', a: 't = √(2h/g) = √(2 × 20 / 10) = √4 = 2 s. v = g·t = 10 × 2 = 20 m/s.' },
      { q: 'Một vật rơi tự do, sau 3 s chạm đất (g = 10 m/s²). Tính độ cao thả vật.', a: 'h = ½g·t² = ½ × 10 × 3² = ½ × 10 × 9 = 45 m.' },
    ],
  },

  'H10LY-w06-quiz': {
    topic: 'Chuyển động ném ngang và ném xiên',
    intro: 'Khi đá quả bóng, nó bay theo đường cong. Tuần này các em học cách phân tích chuyển động ném thành hai chuyển động đơn giản theo hai phương, từ đó hiểu vì sao quỹ đạo là parabol.',
    objectives: [
      'Phân tích được chuyển động ném ngang theo hai trục.',
      'Nêu được dạng quỹ đạo và các yếu tố ảnh hưởng tầm xa.',
      'Biết góc ném cho tầm xa lớn nhất trong ném xiên.',
    ],
    theory: [
      { h: 'Nguyên tắc phân tích' },
      { p: 'Chuyển động ném được phân tích thành hai chuyển động độc lập: theo phương ngang (Ox) và theo phương thẳng đứng (Oy). Hai chuyển động này xảy ra đồng thời nhưng không ảnh hưởng lẫn nhau.' },
      { h: 'Ném ngang' },
      { ul: [
        'Theo Ox: chuyển động thẳng đều với vận tốc v0 không đổi → x = v0 · t.',
        'Theo Oy: rơi tự do, vận tốc ban đầu bằng 0 → y = ½ · g · t².',
        'Quỹ đạo tổng hợp là một nhánh parabol.',
      ]},
      { h: 'Thời gian và tầm xa ném ngang' },
      { p: 'Thời gian bay đúng bằng thời gian rơi tự do từ độ cao h: t = √(2h/g). Tầm xa L = v0 · t = v0 · √(2h/g), phụ thuộc vận tốc ném v0 và độ cao h, không phụ thuộc khối lượng.' },
      { h: 'Ném xiên' },
      { p: 'Với ném xiên góc α, vận tốc đầu được tách thành v0·cosα (ngang) và v0·sinα (thẳng đứng). Với cùng v0 trên mặt phẳng nằm ngang, tầm xa lớn nhất đạt được khi góc ném α = 45°.' },
      { note: 'Thời gian rơi của vật ném ngang bằng đúng thời gian rơi của vật thả tự do cùng độ cao — vận tốc ngang không làm vật rơi nhanh hay chậm hơn.' },
    ],
    examples: [
      { q: 'Ném ngang một vật từ độ cao 45 m với v0 = 10 m/s, g = 10 m/s². Tính thời gian bay và tầm xa.', a: 't = √(2h/g) = √(2 × 45 / 10) = √9 = 3 s. Tầm xa L = v0·t = 10 × 3 = 30 m.' },
      { q: 'Vật ném ngang chạm đất sau 2 s (g = 10 m/s²). Tính vận tốc theo phương đứng lúc chạm đất.', a: 'vy = g·t = 10 × 2 = 20 m/s (theo phương thẳng đứng). Đây cũng là vận tốc của vật rơi tự do cùng thời gian.' },
    ],
  },

  'H10LY-w07-quiz': {
    topic: 'Định luật I Newton — Quán tính',
    intro: 'Các em bước vào phần động lực học — nghiên cứu lực và chuyển động. Mở đầu là định luật I Newton về quán tính, giải thích vì sao xe phanh gấp lại làm ta chúi người về trước.',
    objectives: [
      'Phát biểu được định luật I Newton.',
      'Hiểu khái niệm quán tính và đại lượng đặc trưng cho nó.',
      'Giải thích được các hiện tượng quán tính trong đời sống.',
    ],
    theory: [
      { h: 'Định luật I Newton' },
      { p: 'Nếu một vật không chịu tác dụng của lực nào, hoặc chịu tác dụng của các lực có hợp lực bằng 0, thì vật đang đứng yên sẽ tiếp tục đứng yên, đang chuyển động sẽ tiếp tục chuyển động thẳng đều.' },
      { h: 'Quán tính' },
      { p: 'Quán tính là tính chất của mọi vật có xu hướng bảo toàn trạng thái chuyển động (cả về độ lớn lẫn hướng của vận tốc). Vì có quán tính, vật không thể đột ngột thay đổi vận tốc.' },
      { h: 'Đại lượng đo mức quán tính' },
      { p: 'Khối lượng m là đại lượng đặc trưng cho mức quán tính của vật. Khối lượng càng lớn, quán tính càng lớn, vật càng khó thay đổi vận tốc.' },
      { h: 'Hệ quy chiếu quán tính' },
      { p: 'Hệ quy chiếu trong đó định luật I Newton nghiệm đúng được gọi là hệ quy chiếu quán tính. Trong các hệ này, các định luật Newton có dạng đơn giản nhất.' },
      { note: 'Khi ô tô phanh gấp, thân người vẫn theo quán tính lao về trước; khi xe tăng tốc đột ngột, người ngả về sau.' },
    ],
    examples: [
      { q: 'Giải thích vì sao khi giũ mạnh chiếc áo ướt thì nước bắn ra.', a: 'Khi giũ, áo chuyển động rồi dừng đột ngột, nhưng các giọt nước theo quán tính vẫn tiếp tục chuyển động nên tách khỏi áo và bắn ra ngoài.' },
      { q: 'Hai vật khối lượng 2 kg và 10 kg, vật nào khó đẩy cho chuyển động hơn? Vì sao?', a: 'Vật 10 kg khó đẩy hơn vì khối lượng lớn hơn → quán tính lớn hơn → cần lực lớn hơn để gây cùng một gia tốc.' },
    ],
  },

  'H10LY-w08-quiz': {
    topic: 'Định luật II Newton',
    intro: 'Định luật II Newton là trái tim của động lực học: nó cho biết lực gây ra gia tốc như thế nào. Nắm vững F = m·a, các em giải được hầu hết bài toán về lực ở lớp 10.',
    objectives: [
      'Phát biểu và viết được biểu thức định luật II Newton.',
      'Nêu được đơn vị lực và mối quan hệ giữa F, m, a.',
      'Vận dụng định luật II để tính lực, gia tốc hoặc khối lượng.',
    ],
    theory: [
      { h: 'Định luật II Newton' },
      { p: 'Gia tốc của một vật cùng hướng với lực tác dụng. Độ lớn của gia tốc tỉ lệ thuận với độ lớn hợp lực và tỉ lệ nghịch với khối lượng: a = F / m, hay viết dạng quen thuộc F = m · a.' },
      { h: 'Đơn vị lực' },
      { p: 'Đơn vị lực trong hệ SI là niutơn (N). Một niutơn là lực gây cho vật khối lượng 1 kg một gia tốc 1 m/s²: 1 N = 1 kg · m/s².' },
      { h: 'Phân tích mối quan hệ' },
      { ul: [
        'Cùng một lực: m càng lớn thì a càng nhỏ (vật nặng khó tăng tốc).',
        'Cùng một vật: F càng lớn thì a càng lớn.',
        'Hợp lực bằng 0 thì a = 0, vận tốc không đổi (trở về định luật I).',
      ]},
      { h: 'Vectơ gia tốc và vectơ lực' },
      { p: 'Vì F = m·a và m là số dương, vectơ gia tốc luôn cùng hướng với vectơ hợp lực. Muốn biết vật tăng tốc theo hướng nào, ta tìm hướng của hợp lực.' },
      { note: 'Khi giải bài toán, luôn xác định hợp lực tác dụng lên vật trước, rồi mới áp dụng F = m·a.' },
    ],
    examples: [
      { q: 'Tác dụng lực 12 N lên vật khối lượng 3 kg trên mặt nhẵn. Tính gia tốc.', a: 'a = F / m = 12 / 3 = 4 m/s².' },
      { q: 'Vật 5 kg chịu hợp lực làm nó đạt gia tốc 2 m/s². Tính độ lớn hợp lực.', a: 'F = m · a = 5 × 2 = 10 N.' },
    ],
  },

  'H10LY-w09-quiz': {
    topic: 'Định luật III Newton',
    intro: 'Lực bao giờ cũng xuất hiện theo cặp. Tuần này các em học định luật III Newton về tác dụng và phản tác dụng — chìa khóa giải thích vì sao ta đi được, vì sao tên lửa bay lên.',
    objectives: [
      'Phát biểu được định luật III Newton.',
      'Nêu đặc điểm của cặp lực và phản lực.',
      'Phân biệt cặp lực – phản lực với cặp lực cân bằng.',
    ],
    theory: [
      { h: 'Định luật III Newton' },
      { p: 'Khi vật A tác dụng lên vật B một lực, thì vật B cũng tác dụng trở lại vật A một lực. Hai lực này có cùng độ lớn, ngược hướng: F(AB) = − F(BA). Một lực gọi là lực tác dụng, lực kia là phản lực.' },
      { h: 'Đặc điểm cặp lực – phản lực' },
      { ul: [
        'Cùng độ lớn, ngược hướng, cùng phương.',
        'Đặt vào HAI vật khác nhau nên không triệt tiêu nhau.',
        'Cùng bản chất (cùng là lực hấp dẫn, hoặc cùng là lực đàn hồi...).',
      ]},
      { h: 'Phân biệt với lực cân bằng' },
      { p: 'Hai lực cân bằng cùng đặt vào MỘT vật và triệt tiêu nhau. Cặp lực – phản lực đặt vào HAI vật khác nhau nên không triệt tiêu — đây là điểm khác biệt cốt lõi.' },
      { note: 'Khi đi bộ, chân đẩy mặt đất về sau, mặt đất đẩy lại chân về trước (phản lực) — chính phản lực này làm ta tiến lên.' },
    ],
    examples: [
      { q: 'Tên lửa phụt khí xuống với lực 5000 N. Theo định luật III, khí tác dụng lên tên lửa lực bằng bao nhiêu, hướng nào?', a: 'Khí đẩy tên lửa một phản lực 5000 N (cùng độ lớn), hướng ngược lại tức hướng lên trên, làm tên lửa bay lên.' },
      { q: 'Một người 50 kg đứng yên trên sàn. So sánh trọng lực người ép xuống sàn và phản lực sàn đẩy người.', a: 'Hai lực này cùng độ lớn. Trọng lực ép xuống ≈ P = m·g = 50 × 10 = 500 N, nên sàn đẩy lên một phản lực 500 N (ngược hướng), đặt vào hai vật khác nhau.' },
    ],
  },

  'H10LY-w10-quiz': {
    topic: 'Lực hấp dẫn — Trọng lực',
    intro: 'Vì sao quả táo rơi, vì sao Mặt Trăng quay quanh Trái Đất? Tuần này các em học định luật vạn vật hấp dẫn của Newton và hiểu trọng lực chính là một biểu hiện của lực hấp dẫn.',
    objectives: [
      'Viết được biểu thức định luật vạn vật hấp dẫn.',
      'Hiểu trọng lực là lực hấp dẫn của Trái Đất.',
      'Phân biệt khối lượng và trọng lượng.',
    ],
    theory: [
      { h: 'Định luật vạn vật hấp dẫn' },
      { p: 'Hai vật bất kì luôn hút nhau bằng một lực hấp dẫn tỉ lệ thuận với tích hai khối lượng và tỉ lệ nghịch với bình phương khoảng cách giữa chúng: F = G · m1 · m2 / r².' },
      { h: 'Hằng số hấp dẫn' },
      { p: 'G ≈ 6,67 × 10⁻¹¹ N·m²/kg² là hằng số hấp dẫn, giống nhau với mọi cặp vật trong vũ trụ.' },
      { h: 'Trọng lực và trọng lượng' },
      { p: 'Trọng lực là lực hấp dẫn của Trái Đất tác dụng lên vật, có độ lớn P = m · g. Trọng lượng là độ lớn của trọng lực. Vì g phụ thuộc vị trí (độ cao, vĩ độ) nên trọng lượng cũng thay đổi theo nơi.' },
      { h: 'Khối lượng khác trọng lượng' },
      { ul: [
        'Khối lượng m: đại lượng đặc trưng cho lượng chất và quán tính, KHÔNG đổi theo vị trí. Đơn vị kg.',
        'Trọng lượng P: độ lớn trọng lực, THAY ĐỔI theo g. Đơn vị N.',
      ]},
      { note: 'Lên Mặt Trăng, khối lượng của em không đổi nhưng trọng lượng chỉ còn khoảng 1/6 vì g trên đó nhỏ hơn.' },
    ],
    examples: [
      { q: 'Tính trọng lực của vật khối lượng 8 kg ở mặt đất (g = 9,8 m/s²).', a: 'P = m · g = 8 × 9,8 = 78,4 N.' },
      { q: 'Một vật có trọng lượng 50 N ở nơi g = 10 m/s². Tính khối lượng của vật.', a: 'Từ P = m·g → m = P / g = 50 / 10 = 5 kg. Khối lượng này không đổi dù đem vật đi đâu.' },
    ],
  },

  'H10LY-w11-quiz': {
    topic: 'Lực đàn hồi — Định luật Hooke',
    intro: 'Lò xo bị kéo dãn sẽ kéo lại, đệm bị ép sẽ đẩy ra. Tuần này các em học lực đàn hồi và định luật Hooke — cơ sở để chế tạo lực kế và cân lò xo.',
    objectives: [
      'Nêu được điều kiện xuất hiện và hướng của lực đàn hồi.',
      'Viết và vận dụng được định luật Hooke.',
      'Hiểu ý nghĩa độ cứng k và giới hạn đàn hồi.',
    ],
    theory: [
      { h: 'Lực đàn hồi' },
      { p: 'Lực đàn hồi xuất hiện khi một vật bị biến dạng đàn hồi và có xu hướng đưa vật trở về hình dạng ban đầu. Với lò xo, lực đàn hồi luôn hướng ngược chiều biến dạng (về vị trí cân bằng).' },
      { h: 'Định luật Hooke' },
      { p: 'Trong giới hạn đàn hồi, độ lớn lực đàn hồi của lò xo tỉ lệ thuận với độ biến dạng: F = k · |Δl|, trong đó Δl là độ dãn (hoặc nén) của lò xo.' },
      { h: 'Độ cứng k' },
      { p: 'Hệ số k gọi là độ cứng (hay hệ số đàn hồi) của lò xo, đơn vị N/m. k càng lớn lò xo càng cứng, càng khó biến dạng.' },
      { h: 'Giới hạn đàn hồi' },
      { p: 'Định luật Hooke chỉ đúng khi lực chưa vượt quá giới hạn đàn hồi. Nếu vượt quá, lò xo bị biến dạng dẻo, không trở về hình dạng ban đầu được nữa.' },
      { note: 'Khi treo vật vào lò xo thẳng đứng đứng yên, lực đàn hồi cân bằng trọng lực: k·Δl = m·g — đây là nguyên lí của cân lò xo.' },
    ],
    examples: [
      { q: 'Lò xo có độ cứng k = 100 N/m bị kéo dãn 0,1 m. Tính lực đàn hồi.', a: 'F = k · |Δl| = 100 × 0,1 = 10 N.' },
      { q: 'Treo vật 0,5 kg vào lò xo thì lò xo dãn 5 cm (g = 10 m/s²). Tính độ cứng k.', a: 'Khi cân bằng: k·Δl = m·g. Đổi Δl = 5 cm = 0,05 m. k = m·g / Δl = 0,5 × 10 / 0,05 = 5 / 0,05 = 100 N/m.' },
    ],
  },

  'H10LY-w12-quiz': {
    topic: 'Lực ma sát',
    intro: 'Ma sát vừa cản trở vừa giúp ích cho ta: nhờ nó mà ta đi được, xe phanh được, nhưng cũng vì nó mà máy móc hao mòn. Tuần này các em phân loại và tính lực ma sát.',
    objectives: [
      'Nêu được ba loại lực ma sát và đặc điểm của chúng.',
      'Viết và vận dụng công thức lực ma sát trượt.',
      'Nêu được lợi, hại và cách tăng/giảm ma sát.',
    ],
    theory: [
      { h: 'Ba loại lực ma sát' },
      { ul: [
        'Ma sát nghỉ: giữ vật đứng yên khi có lực kéo nhưng chưa đủ làm vật trượt.',
        'Ma sát trượt: xuất hiện khi vật trượt trên bề mặt, cản trở chuyển động.',
        'Ma sát lăn: xuất hiện khi vật lăn, thường nhỏ hơn nhiều ma sát trượt.',
      ]},
      { h: 'Công thức lực ma sát trượt' },
      { p: 'Độ lớn lực ma sát trượt: F(ms) = μ · N, trong đó μ là hệ số ma sát trượt (không đơn vị) và N là độ lớn áp lực (phản lực vuông góc với mặt tiếp xúc). Lực ma sát trượt có hướng ngược chiều chuyển động.' },
      { h: 'So sánh ma sát nghỉ và trượt' },
      { p: 'Hệ số ma sát nghỉ thường lớn hơn hệ số ma sát trượt. Vì thế đẩy một vật bắt đầu chuyển động khó hơn duy trì cho nó trượt.' },
      { h: 'Lợi và hại của ma sát' },
      { p: 'Ma sát có lợi: giúp xe phanh được, đi lại không trượt, cầm nắm đồ vật. Ma sát có hại: làm mòn máy móc, tiêu hao năng lượng. Để giảm ma sát ta bôi trơn, dùng ổ bi; để tăng ma sát ta làm nhám bề mặt, khía rãnh lốp xe.' },
      { note: 'Áp lực N không phải lúc nào cũng bằng trọng lực. Trên mặt ngang không có lực ép thêm thì N = P = m·g.' },
    ],
    examples: [
      { q: 'Vật 4 kg trượt trên mặt ngang, hệ số ma sát trượt μ = 0,2 (g = 10 m/s²). Tính lực ma sát.', a: 'Áp lực N = P = m·g = 4 × 10 = 40 N. Lực ma sát F(ms) = μ·N = 0,2 × 40 = 8 N.' },
      { q: 'Kéo vật 10 kg trên sàn ngang bằng lực ngang 30 N, μ = 0,25 (g = 10 m/s²). Tính gia tốc.', a: 'F(ms) = μ·m·g = 0,25 × 10 × 10 = 25 N. Hợp lực = 30 − 25 = 5 N. a = F/m = 5/10 = 0,5 m/s².' },
    ],
  },

  'H10LY-w13-quiz': {
    topic: 'Tổng hợp và phân tích lực',
    intro: 'Một vật thường chịu nhiều lực cùng lúc. Tuần này các em học cách thay nhiều lực bằng một hợp lực (tổng hợp) và ngược lại (phân tích), bằng quy tắc hình bình hành.',
    objectives: [
      'Nêu được khái niệm tổng hợp và phân tích lực.',
      'Vận dụng quy tắc hình bình hành cho hai lực đồng quy.',
      'Tính được hợp lực trong các trường hợp đặc biệt.',
    ],
    theory: [
      { h: 'Tổng hợp lực' },
      { p: 'Tổng hợp lực là thay nhiều lực tác dụng đồng thời vào một vật bằng một lực duy nhất (hợp lực) có cùng tác dụng. Hợp lực là tổng vectơ của các lực thành phần.' },
      { h: 'Quy tắc hình bình hành' },
      { p: 'Hợp lực của hai lực đồng quy được biểu diễn bằng đường chéo của hình bình hành mà hai cạnh là hai lực thành phần.' },
      { h: 'Các trường hợp đặc biệt' },
      { ul: [
        'Hai lực cùng phương cùng chiều: F = F1 + F2.',
        'Hai lực cùng phương ngược chiều: F = |F1 − F2|.',
        'Hai lực vuông góc: F = √(F1² + F2²).',
      ]},
      { h: 'Phân tích lực' },
      { p: 'Phân tích lực là thay một lực bằng hai hay nhiều lực thành phần có tác dụng tương đương. Thường ta phân tích lực theo hai phương vuông góc đã chọn để dễ tính toán.' },
      { note: 'Hợp lực của hai lực F1, F2 luôn nằm trong khoảng từ |F1 − F2| đến F1 + F2, tùy theo góc giữa chúng.' },
    ],
    examples: [
      { q: 'Hai lực vuông góc F1 = 6 N và F2 = 8 N tác dụng vào một điểm. Tính hợp lực.', a: 'F = √(F1² + F2²) = √(6² + 8²) = √(36 + 64) = √100 = 10 N.' },
      { q: 'Hai lực cùng phương ngược chiều F1 = 9 N, F2 = 5 N. Tính hợp lực.', a: 'F = |F1 − F2| = |9 − 5| = 4 N, hướng theo lực 9 N.' },
    ],
  },

  'H10LY-w14-quiz': {
    topic: 'Chuyển động tròn đều',
    intro: 'Kim đồng hồ, bánh xe, vệ tinh — chúng chuyển động tròn. Tuần này các em học chuyển động tròn đều, gia tốc hướng tâm và lực hướng tâm giữ vật trên quỹ đạo.',
    objectives: [
      'Nêu được đặc điểm của chuyển động tròn đều.',
      'Viết được công thức tốc độ góc, gia tốc hướng tâm, chu kì, tần số.',
      'Hiểu vai trò của lực hướng tâm.',
    ],
    theory: [
      { h: 'Chuyển động tròn đều' },
      { p: 'Chuyển động tròn đều có quỹ đạo là đường tròn và tốc độ (độ lớn vận tốc) không đổi. Tuy độ lớn vận tốc không đổi nhưng hướng của vận tốc luôn thay đổi (luôn tiếp tuyến với đường tròn).' },
      { h: 'Tốc độ góc, chu kì, tần số' },
      { ul: [
        'Tốc độ góc: ω = v / r = 2π / T (đơn vị rad/s).',
        'Chu kì T: thời gian đi hết một vòng (đơn vị s).',
        'Tần số f: số vòng trong một giây, f = 1 / T (đơn vị Hz).',
      ]},
      { h: 'Gia tốc hướng tâm' },
      { p: 'Vì hướng vận tốc luôn đổi nên vật có gia tốc, gọi là gia tốc hướng tâm, luôn hướng vào tâm: a(ht) = v² / r = ω² · r.' },
      { h: 'Lực hướng tâm' },
      { p: 'Hợp lực tác dụng lên vật gây ra gia tốc hướng tâm gọi là lực hướng tâm, luôn hướng vào tâm: F(ht) = m · v² / r = m · ω² · r. Đó không phải loại lực mới mà do trọng lực, lực căng dây, ma sát... đóng vai trò.' },
      { note: 'Khi xe vào khúc cua, lực ma sát giữa lốp và mặt đường đóng vai trò lực hướng tâm. Đi quá nhanh, ma sát không đủ, xe sẽ văng ra.' },
    ],
    examples: [
      { q: 'Vật chuyển động tròn đều bán kính 2 m với tốc độ 4 m/s. Tính gia tốc hướng tâm.', a: 'a(ht) = v² / r = 4² / 2 = 16 / 2 = 8 m/s².' },
      { q: 'Một vật khối lượng 0,5 kg quay tròn bán kính 1 m với tốc độ 6 m/s. Tính lực hướng tâm.', a: 'F(ht) = m·v² / r = 0,5 × 6² / 1 = 0,5 × 36 = 18 N, hướng vào tâm.' },
    ],
  },

  'H10LY-w15-quiz': {
    topic: 'Cân bằng của vật rắn — Mômen lực',
    intro: 'Vì sao cánh cửa dễ mở khi đẩy ở xa bản lề? Tuần này các em học mômen lực — đại lượng đo tác dụng làm quay — và điều kiện cân bằng của vật rắn có trục quay.',
    objectives: [
      'Viết được công thức mômen lực và nêu đơn vị.',
      'Phát biểu điều kiện cân bằng của vật rắn có trục quay.',
      'Hiểu nguyên lí đòn bẩy qua mômen lực.',
    ],
    theory: [
      { h: 'Mômen lực' },
      { p: 'Mômen lực đối với một trục quay đo tác dụng làm quay của lực: M = F · d, trong đó d là cánh tay đòn — khoảng cách vuông góc từ trục quay đến đường tác dụng của lực. Đơn vị là N·m.' },
      { h: 'Cánh tay đòn' },
      { p: 'Cánh tay đòn càng lớn thì với cùng một lực, tác dụng làm quay càng mạnh. Đó là lí do ta đẩy cánh cửa ở mép xa bản lề chứ không đẩy gần bản lề.' },
      { h: 'Điều kiện cân bằng (quy tắc mômen lực)' },
      { p: 'Vật rắn có trục quay cố định cân bằng khi tổng các mômen lực làm vật quay theo chiều này bằng tổng các mômen lực làm vật quay theo chiều ngược lại (tổng đại số các mômen lực bằng 0).' },
      { h: 'Đòn bẩy' },
      { p: 'Áp dụng quy tắc mômen: F1 · d1 = F2 · d2. Muốn nâng vật nặng bằng lực nhỏ, ta dùng cánh tay đòn lực lớn — đó chính là nguyên lí đòn bẩy.' },
      { note: 'Đơn vị mômen lực là N·m, trùng tên với jun (J) nhưng bản chất hoàn toàn khác (jun là đơn vị năng lượng).' },
    ],
    examples: [
      { q: 'Tác dụng lực 20 N vuông góc, cánh tay đòn 0,5 m. Tính mômen lực.', a: 'M = F · d = 20 × 0,5 = 10 N·m.' },
      { q: 'Đòn bẩy cân bằng: đầu A treo vật 60 N cách trục 0,2 m. Đầu B đặt lực F cách trục 0,6 m. Tính F.', a: 'Quy tắc mômen: F·dB = 60·dA → F × 0,6 = 60 × 0,2 = 12 → F = 12 / 0,6 = 20 N.' },
    ],
  },

  'H10LY-w16-quiz': {
    topic: 'Công và công suất',
    intro: 'Khi một lực làm vật di chuyển, ta nói lực sinh công. Công thực hiện nhanh hay chậm thể hiện qua công suất. Tuần này các em định lượng hai khái niệm này.',
    objectives: [
      'Viết được công thức tính công và nêu đơn vị.',
      'Hiểu khi nào công bằng 0, dương, âm.',
      'Viết và vận dụng được công thức công suất.',
    ],
    theory: [
      { h: 'Công cơ học' },
      { p: 'Khi lực F không đổi tác dụng lên vật làm vật dịch chuyển quãng đường s, công của lực là: A = F · s · cosα, với α là góc giữa hướng lực và hướng dịch chuyển. Đơn vị công là jun (J), 1 J = 1 N·m.' },
      { h: 'Dấu của công' },
      { ul: [
        'α < 90°: cosα > 0 → A > 0 (công phát động, lực giúp vật đi).',
        'α = 90°: cosα = 0 → A = 0 (lực vuông góc dịch chuyển, không sinh công).',
        'α > 90°: cosα < 0 → A < 0 (công cản, ví dụ lực ma sát).',
      ]},
      { h: 'Công suất' },
      { p: 'Công suất đặc trưng cho tốc độ thực hiện công: P = A / t. Đơn vị là oát (W), 1 W = 1 J/s. Một đơn vị khác hay gặp là mã lực: 1 HP ≈ 746 W.' },
      { h: 'Công suất theo lực và vận tốc' },
      { p: 'Với chuyển động đều, công suất còn tính được P = F · v (khi lực cùng hướng vận tốc), rất tiện cho bài toán về động cơ, máy kéo.' },
      { note: 'Khi xách túi đi ngang trên đường, lực nâng tay hướng lên còn dịch chuyển nằm ngang (α = 90°) nên công của lực nâng bằng 0.' },
    ],
    examples: [
      { q: 'Lực 50 N kéo vật đi 8 m theo phương của lực. Tính công.', a: 'A = F·s·cosα = 50 × 8 × cos0° = 50 × 8 × 1 = 400 J.' },
      { q: 'Một máy thực hiện công 6000 J trong 30 s. Tính công suất.', a: 'P = A / t = 6000 / 30 = 200 W.' },
    ],
  },

  'H10LY-w17-quiz': {
    topic: 'Động năng — Thế năng — Cơ năng',
    intro: 'Vật chuyển động mang động năng, vật ở trên cao hay lò xo bị nén mang thế năng. Tổng của chúng là cơ năng. Tuần này các em học các dạng năng lượng cơ học và định luật bảo toàn cơ năng.',
    objectives: [
      'Viết được công thức động năng, thế năng trọng trường, thế năng đàn hồi.',
      'Nêu được khái niệm cơ năng.',
      'Phát biểu và vận dụng định luật bảo toàn cơ năng.',
    ],
    theory: [
      { h: 'Động năng' },
      { p: 'Động năng là năng lượng vật có do chuyển động: W(đ) = ½ · m · v². Đơn vị là jun (J). Vật càng nặng và càng nhanh thì động năng càng lớn.' },
      { h: 'Thế năng trọng trường' },
      { p: 'Thế năng trọng trường là năng lượng vật có do vị trí trong trọng trường: W(t) = m · g · h, với h là độ cao so với mốc thế năng đã chọn.' },
      { h: 'Thế năng đàn hồi' },
      { p: 'Lò xo biến dạng một đoạn x tích trữ thế năng đàn hồi: W(t đàn hồi) = ½ · k · x².' },
      { h: 'Cơ năng và định luật bảo toàn' },
      { p: 'Cơ năng = động năng + thế năng: W = W(đ) + W(t). Khi vật chỉ chịu tác dụng của trọng lực (hoặc lực đàn hồi), không có ma sát, cơ năng được bảo toàn — động năng và thế năng có thể chuyển hóa qua lại nhưng tổng không đổi.' },
      { note: 'Khi vật rơi, thế năng giảm dần chuyển thành động năng tăng dần, nhưng tổng cơ năng giữ nguyên (nếu bỏ qua sức cản).' },
    ],
    examples: [
      { q: 'Vật khối lượng 2 kg chuyển động với vận tốc 5 m/s. Tính động năng.', a: 'W(đ) = ½·m·v² = ½ × 2 × 5² = ½ × 2 × 25 = 25 J.' },
      { q: 'Vật 3 kg ở độ cao 4 m (g = 10 m/s²). Tính thế năng trọng trường so với mặt đất.', a: 'W(t) = m·g·h = 3 × 10 × 4 = 120 J.' },
    ],
  },

  'H10LY-w18-quiz': {
    topic: 'Ôn tập học kì 1',
    intro: 'Tuần này các em hệ thống lại toàn bộ kiến thức học kì 1: từ động học, động lực học đến năng lượng. Hãy nắm chắc các công thức cốt lõi để bước vào kì thi tự tin.',
    objectives: [
      'Hệ thống công thức động học và động lực học.',
      'Ôn lại ba định luật Newton và các loại lực.',
      'Vận dụng tổng hợp công, năng lượng vào bài tập.',
    ],
    theory: [
      { h: 'Động học' },
      { ul: [
        'Tốc độ trung bình: v(tb) = s / t.',
        'Biến đổi đều: v = v0 + a·t; s = v0·t + ½a·t²; v² − v0² = 2as.',
        'Rơi tự do: v = g·t; h = ½g·t²; g ≈ 9,8 m/s².',
      ]},
      { h: 'Động lực học' },
      { ul: [
        'Định luật I: hợp lực = 0 thì vận tốc không đổi (quán tính).',
        'Định luật II: F = m·a.',
        'Định luật III: F(AB) = − F(BA).',
      ]},
      { h: 'Các loại lực' },
      { ul: [
        'Trọng lực: P = m·g.',
        'Lực đàn hồi: F = k·|Δl|.',
        'Lực ma sát trượt: F(ms) = μ·N.',
      ]},
      { h: 'Năng lượng' },
      { p: 'Công A = F·s·cosα; công suất P = A/t; động năng W(đ) = ½mv²; thế năng W(t) = mgh; cơ năng W = W(đ) + W(t) bảo toàn khi không ma sát.' },
      { note: 'Đề thi thường yêu cầu chọn đúng công thức và thay số cẩn thận kèm đơn vị. Đổi đơn vị về SI trước khi tính.' },
    ],
    examples: [
      { q: 'Vật 2 kg chịu lực 6 N trên mặt nhẵn. Tính gia tốc và quãng đường sau 4 s từ nghỉ.', a: 'a = F/m = 6/2 = 3 m/s². s = ½a·t² = ½ × 3 × 4² = ½ × 3 × 16 = 24 m.' },
      { q: 'Vật 1 kg ở độ cao 5 m rơi tự do (g = 10 m/s²). Tính động năng ngay khi chạm đất.', a: 'Bảo toàn cơ năng: W(đ) khi chạm đất = W(t) ban đầu = m·g·h = 1 × 10 × 5 = 50 J.' },
    ],
  },

  'H10LY-w19-quiz': {
    topic: 'Định luật bảo toàn năng lượng',
    intro: 'Chào các em trở lại học kì 2. Mở đầu bằng một định luật bao trùm cả vũ trụ: năng lượng không tự sinh ra hay mất đi mà chỉ chuyển hóa. Đây là một trong những nguyên lí sâu sắc nhất của vật lí.',
    objectives: [
      'Phát biểu được định luật bảo toàn và chuyển hóa năng lượng.',
      'Nêu các dạng năng lượng và sự chuyển hóa giữa chúng.',
      'Hiểu vì sao cơ năng không bảo toàn khi có ma sát.',
    ],
    theory: [
      { h: 'Định luật bảo toàn năng lượng' },
      { p: 'Năng lượng không tự sinh ra cũng không tự mất đi, mà chỉ chuyển hóa từ dạng này sang dạng khác hoặc truyền từ vật này sang vật khác. Tổng năng lượng của một hệ kín luôn được bảo toàn.' },
      { h: 'Các dạng năng lượng' },
      { ul: [
        'Cơ năng (động năng, thế năng).',
        'Nội năng (nhiệt năng).',
        'Điện năng, quang năng (năng lượng ánh sáng).',
        'Hóa năng, năng lượng hạt nhân.',
      ]},
      { h: 'Khi có ma sát' },
      { p: 'Khi có ma sát, cơ năng KHÔNG bảo toàn vì một phần cơ năng chuyển thành nội năng (làm vật nóng lên). Tuy nhiên tổng năng lượng vẫn bảo toàn — chỉ là một phần đã đổi sang dạng nhiệt.' },
      { h: 'Đơn vị năng lượng' },
      { p: 'Đơn vị năng lượng trong SI là jun (J). Trong nhiệt học còn dùng calo: 1 cal ≈ 4,18 J.' },
      { note: 'Không có "động cơ vĩnh cửu" sinh năng lượng từ hư không — đó là điều định luật bảo toàn năng lượng cấm.' },
    ],
    examples: [
      { q: 'Một bóng đèn tiêu thụ 60 J điện năng, tỏa 48 J nhiệt. Tính năng lượng chuyển thành ánh sáng.', a: 'Theo bảo toàn năng lượng: quang năng = điện năng − nhiệt năng = 60 − 48 = 12 J.' },
      { q: 'Vật trượt trên sàn có ma sát, ban đầu cơ năng 100 J, dừng lại. Phần năng lượng đó đã đi đâu?', a: 'Cơ năng giảm từ 100 J xuống 0 J, toàn bộ 100 J đã chuyển thành nội năng (nhiệt) do ma sát, làm vật và sàn nóng lên. Tổng năng lượng vẫn bảo toàn.' },
    ],
  },

  'H10LY-w20-quiz': {
    topic: 'Bảo toàn cơ năng — Bài tập',
    intro: 'Tuần này các em vận dụng định luật bảo toàn cơ năng để giải nhanh các bài toán rơi, trượt dốc và con lắc — không cần dùng đến công thức gia tốc phức tạp.',
    objectives: [
      'Áp dụng bảo toàn cơ năng cho vật rơi và trượt không ma sát.',
      'Phân tích sự chuyển hóa năng lượng trong con lắc.',
      'Tính vận tốc tại các vị trí khác nhau.',
    ],
    theory: [
      { h: 'Phương pháp dùng bảo toàn cơ năng' },
      { p: 'Khi vật chỉ chịu trọng lực (hoặc lực đàn hồi), không ma sát: W(đ1) + W(t1) = W(đ2) + W(t2). Chọn mốc thế năng thích hợp rồi cân bằng cơ năng ở hai vị trí.' },
      { h: 'Vật rơi tự do' },
      { p: 'Tại điểm thả: cơ năng = thế năng = m·g·h. Khi chạm đất: cơ năng = động năng = ½m·v². Cho hai vế bằng nhau → v = √(2gh).' },
      { h: 'Con lắc đơn không ma sát' },
      { ul: [
        'Vị trí cao nhất (biên): vận tốc bằng 0 → động năng = 0, thế năng cực đại.',
        'Vị trí cân bằng (thấp nhất): độ cao nhỏ nhất → thế năng nhỏ nhất, động năng cực đại (vận tốc lớn nhất).',
      ]},
      { h: 'Trượt trên mặt nghiêng nhẵn' },
      { p: 'Khi trượt xuống dốc không ma sát, độ giảm thế năng bằng độ tăng động năng. Cơ năng bảo toàn nên ta dễ dàng tìm vận tốc ở chân dốc theo độ cao.' },
      { note: 'Vận tốc tính bằng bảo toàn cơ năng không phụ thuộc khối lượng vật, vì m xuất hiện ở cả hai vế và bị triệt tiêu.' },
    ],
    examples: [
      { q: 'Vật rơi tự do từ độ cao 5 m (g = 10 m/s²). Tính vận tốc chạm đất bằng bảo toàn cơ năng.', a: 'm·g·h = ½m·v² → v² = 2gh = 2 × 10 × 5 = 100 → v = 10 m/s.' },
      { q: 'Con lắc được kéo lên cao 0,2 m so với vị trí cân bằng rồi thả (g = 10 m/s²). Tính tốc độ lớn nhất.', a: 'Tốc độ lớn nhất ở vị trí cân bằng: ½v² = g·h → v² = 2 × 10 × 0,2 = 4 → v = 2 m/s.' },
    ],
  },

  'H10LY-w21-quiz': {
    topic: 'Va chạm — Đàn hồi và không đàn hồi',
    intro: 'Khi hai vật va vào nhau, điều gì được bảo toàn? Tuần này các em phân loại va chạm và biết đại lượng nào luôn bảo toàn, đại lượng nào thì không.',
    objectives: [
      'Phân biệt va chạm đàn hồi và không đàn hồi.',
      'Nêu các đại lượng bảo toàn trong mỗi loại va chạm.',
      'Viết được định luật bảo toàn động lượng.',
    ],
    theory: [
      { h: 'Phân loại va chạm' },
      { ul: [
        'Va chạm đàn hồi: hai vật bật ra, bảo toàn CẢ động lượng và động năng.',
        'Va chạm không đàn hồi: bảo toàn động lượng, nhưng động năng giảm (một phần thành nhiệt, biến dạng).',
        'Va chạm mềm: trường hợp đặc biệt, hai vật dính vào nhau và chuyển động cùng vận tốc.',
      ]},
      { h: 'Bảo toàn động lượng' },
      { p: 'Trong mọi va chạm của hệ kín, tổng động lượng trước bằng tổng động lượng sau: m1·v1 + m2·v2 = m1·v1\' + m2·v2\'. Động lượng p = m·v, đơn vị kg·m/s.' },
      { h: 'Va chạm mềm' },
      { p: 'Khi hai vật dính lại sau va chạm: m1·v1 + m2·v2 = (m1 + m2)·v\', từ đó tìm vận tốc chung v\'. Động năng không bảo toàn trong loại này.' },
      { h: 'Va chạm xuyên tâm' },
      { p: 'Va chạm xuyên tâm là va chạm mà vận tốc các vật nằm trên đường nối tâm hai vật, cho phép giải bài toán trên một trục thẳng.' },
      { note: 'Nhớ: động lượng LUÔN bảo toàn trong va chạm hệ kín; động năng chỉ bảo toàn khi va chạm đàn hồi.' },
    ],
    examples: [
      { q: 'Xe 2 kg đi 3 m/s đâm dính vào xe 1 kg đang đứng yên. Tính vận tốc chung sau va chạm (va chạm mềm).', a: 'Bảo toàn động lượng: m1·v1 = (m1+m2)·v\' → 2 × 3 = (2+1)·v\' → 6 = 3v\' → v\' = 2 m/s.' },
      { q: 'Kiểm tra động năng trước và sau va chạm mềm ở câu trên.', a: 'Trước: ½ × 2 × 3² = 9 J. Sau: ½ × 3 × 2² = 6 J. Động năng giảm 3 J — phần này chuyển thành nhiệt và biến dạng, đúng đặc điểm va chạm không đàn hồi.' },
    ],
  },

  'H10LY-w22-quiz': {
    topic: 'Động lượng — Định luật bảo toàn động lượng',
    intro: 'Động lượng là một trong những đại lượng bảo toàn quan trọng nhất của vật lí. Tuần này các em hiểu sâu định luật bảo toàn động lượng và ứng dụng của nó: súng giật, tên lửa, phản lực.',
    objectives: [
      'Định nghĩa được động lượng và nêu đơn vị.',
      'Phát biểu định luật bảo toàn động lượng.',
      'Viết định luật II Newton dạng động lượng.',
    ],
    theory: [
      { h: 'Động lượng' },
      { p: 'Động lượng của một vật là đại lượng vectơ bằng tích khối lượng và vận tốc: p = m · v. Đơn vị SI là kg·m/s. Động lượng cùng hướng với vận tốc.' },
      { h: 'Định luật II Newton dạng động lượng' },
      { p: 'Dạng tổng quát của định luật II Newton: F = Δp / Δt, nghĩa là lực bằng tốc độ biến thiên động lượng. Từ đây suy ra xung lượng của lực: F · Δt = Δp.' },
      { h: 'Định luật bảo toàn động lượng' },
      { p: 'Trong một hệ kín (không có ngoại lực hoặc ngoại lực triệt tiêu), tổng động lượng của hệ được bảo toàn: tổng động lượng trước bằng tổng động lượng sau tương tác.' },
      { h: 'Ứng dụng' },
      { p: 'Súng giật lùi khi bắn, tên lửa bay lên khi phụt khí, người trượt patin đẩy nhau ra xa — tất cả đều là hệ quả của bảo toàn động lượng.' },
      { note: 'Khi bắn súng, đạn có động lượng về trước thì súng nhận động lượng bằng độ lớn nhưng ngược chiều, nên giật về sau.' },
    ],
    examples: [
      { q: 'Vật khối lượng 4 kg chuyển động với vận tốc 5 m/s. Tính động lượng.', a: 'p = m · v = 4 × 5 = 20 kg·m/s, cùng hướng vận tốc.' },
      { q: 'Súng 5 kg bắn viên đạn 0,01 kg với vận tốc 300 m/s. Tính vận tốc giật của súng.', a: 'Bảo toàn động lượng (ban đầu hệ đứng yên): m(đạn)·v(đạn) = m(súng)·v(súng). 0,01 × 300 = 5 × v(súng) → 3 = 5·v(súng) → v(súng) = 0,6 m/s, hướng ngược chiều đạn.' },
    ],
  },

  'H10LY-w23-quiz': {
    topic: 'Cấu tạo chất — Thuyết động học phân tử',
    intro: 'Các em bước vào phần nhiệt học. Mọi vật chất đều cấu tạo từ các hạt chuyển động không ngừng. Tuần này ta tìm hiểu thuyết động học phân tử và đặc điểm của ba thể: rắn, lỏng, khí.',
    objectives: [
      'Nêu được nội dung cơ bản của thuyết động học phân tử.',
      'Mô tả đặc điểm chuyển động phân tử ở thể rắn, lỏng, khí.',
      'Hiểu mối liên hệ giữa nhiệt độ và chuyển động phân tử.',
    ],
    theory: [
      { h: 'Thuyết động học phân tử' },
      { p: 'Vật chất được cấu tạo từ các phân tử, nguyên tử rất nhỏ. Các phân tử chuyển động hỗn loạn không ngừng (chuyển động nhiệt). Giữa chúng có lực tương tác hút và đẩy.' },
      { h: 'Nhiệt độ và chuyển động phân tử' },
      { p: 'Nhiệt độ của vật liên hệ với động năng trung bình của chuyển động hỗn loạn của các phân tử. Nhiệt độ càng cao, các phân tử chuyển động càng nhanh.' },
      { h: 'Đặc điểm ba thể' },
      { ul: [
        'Thể rắn: phân tử sắp xếp trật tự, chỉ dao động quanh vị trí cân bằng cố định → giữ hình dạng và thể tích.',
        'Thể lỏng: phân tử liên kết yếu hơn, có thể trượt lên nhau → giữ thể tích nhưng hình dạng theo bình chứa.',
        'Thể khí: phân tử ở xa nhau, chuyển động hỗn loạn tự do → không có hình dạng và thể tích riêng.',
      ]},
      { h: 'Nhiệt độ không tuyệt đối' },
      { p: 'Nhiệt độ thấp nhất theo lí thuyết là 0 K (độ không tuyệt đối), tương ứng −273,15°C, khi chuyển động nhiệt của phân tử là nhỏ nhất.' },
      { note: 'Chuyển động Brown — hạt phấn hoa chuyển động ngẫu nhiên trong nước — là bằng chứng trực tiếp cho chuyển động hỗn loạn không ngừng của phân tử.' },
    ],
    examples: [
      { q: 'Đổi nhiệt độ 27°C sang Kelvin.', a: 'T(K) = t(°C) + 273 = 27 + 273 = 300 K.' },
      { q: 'Giải thích vì sao mở nắp lọ nước hoa thì cả phòng ngửi thấy mùi.', a: 'Các phân tử nước hoa chuyển động hỗn loạn không ngừng và khuếch tán ra khắp phòng nhờ chuyển động nhiệt, nên ở xa vẫn ngửi được mùi.' },
    ],
  },

  'H10LY-w24-quiz': {
    topic: 'Quá trình đẳng nhiệt — Định luật Boyle-Mariotte',
    intro: 'Khi giữ nhiệt độ không đổi và nén khí, áp suất tăng. Tuần này các em học định luật Boyle-Mariotte mô tả chính xác mối quan hệ giữa áp suất và thể tích của khí lí tưởng.',
    objectives: [
      'Phát biểu và viết được định luật Boyle-Mariotte.',
      'Nhận dạng đường đẳng nhiệt trên đồ thị p–V.',
      'Vận dụng định luật để tính áp suất hoặc thể tích.',
    ],
    theory: [
      { h: 'Quá trình đẳng nhiệt' },
      { p: 'Quá trình đẳng nhiệt là quá trình biến đổi trạng thái của một lượng khí xác định khi nhiệt độ giữ không đổi.' },
      { h: 'Định luật Boyle-Mariotte' },
      { p: 'Ở nhiệt độ không đổi, áp suất và thể tích của một lượng khí xác định tỉ lệ nghịch với nhau: p · V = hằng số, hay p1·V1 = p2·V2.' },
      { h: 'Đường đẳng nhiệt' },
      { p: 'Trên đồ thị p–V, đường biểu diễn quá trình đẳng nhiệt là một đường hypebol (vì p·V = const). Nhiệt độ càng cao, đường đẳng nhiệt càng nằm xa gốc tọa độ.' },
      { h: 'Điều kiện áp dụng' },
      { ul: [
        'Khí được coi là khí lí tưởng.',
        'Nhiệt độ giữ không đổi.',
        'Lượng khí không đổi (không rò rỉ, không thêm bớt).',
      ]},
      { note: 'Khi nén khí (V giảm) ở nhiệt độ không đổi, các phân tử va chạm thành bình thường xuyên hơn nên áp suất tăng — đúng với p·V không đổi.' },
    ],
    examples: [
      { q: 'Khí có thể tích 2 L ở áp suất 1 atm, được nén còn 1 L ở nhiệt độ không đổi. Tính áp suất mới.', a: 'p1·V1 = p2·V2 → 1 × 2 = p2 × 1 → p2 = 2 atm.' },
      { q: 'Khí ở 4 atm chiếm 0,5 L. Giữ nhiệt độ không đổi, cho áp suất giảm còn 1 atm. Tính thể tích mới.', a: 'p1·V1 = p2·V2 → 4 × 0,5 = 1 × V2 → V2 = 2 L.' },
    ],
  },

  'H10LY-w25-quiz': {
    topic: 'Quá trình đẳng tích — Định luật Charles',
    intro: 'Giữ thể tích bình không đổi mà đun nóng khí thì áp suất tăng — đó là điều xảy ra trong nồi áp suất. Tuần này các em học định luật Charles cho quá trình đẳng tích.',
    objectives: [
      'Phát biểu và viết được định luật Charles (đẳng tích).',
      'Hiểu vai trò của nhiệt độ tuyệt đối (Kelvin).',
      'Vận dụng định luật để tính áp suất theo nhiệt độ.',
    ],
    theory: [
      { h: 'Quá trình đẳng tích' },
      { p: 'Quá trình đẳng tích là quá trình biến đổi trạng thái của một lượng khí xác định khi thể tích giữ không đổi.' },
      { h: 'Định luật Charles' },
      { p: 'Khi thể tích không đổi, áp suất của một lượng khí xác định tỉ lệ thuận với nhiệt độ tuyệt đối: p / T = hằng số, hay p1/T1 = p2/T2. Lưu ý T phải tính bằng Kelvin.' },
      { h: 'Nhiệt độ tuyệt đối' },
      { p: 'Nhiệt độ Kelvin liên hệ với Celsius theo: T(K) = t(°C) + 273. Phải dùng Kelvin trong mọi định luật chất khí, không được dùng độ Celsius.' },
      { h: 'Đường đẳng tích' },
      { p: 'Trên đồ thị p–T, đường đẳng tích là đường thẳng có đường kéo dài đi qua gốc tọa độ (vì p tỉ lệ thuận với T tính từ 0 K).' },
      { note: 'Đây là lí do không nên đun nóng bình kín chứa khí: thể tích không đổi mà nhiệt độ tăng làm áp suất tăng mạnh, có thể gây nổ.' },
    ],
    examples: [
      { q: 'Khí ở 27°C có áp suất 2 atm, được đun đến 327°C trong bình kín (V không đổi). Tính áp suất mới.', a: 'Đổi: T1 = 27 + 273 = 300 K, T2 = 327 + 273 = 600 K. p1/T1 = p2/T2 → 2/300 = p2/600 → p2 = 2 × 600/300 = 4 atm.' },
      { q: 'Khí trong bình kín ở 300 K có áp suất 1,5 atm. Làm lạnh xuống 200 K. Tính áp suất.', a: 'p2 = p1 × T2/T1 = 1,5 × 200/300 = 1,5 × 2/3 = 1 atm.' },
    ],
  },

  'H10LY-w26-quiz': {
    topic: 'Phương trình trạng thái khí lí tưởng',
    intro: 'Khi cả áp suất, thể tích và nhiệt độ cùng thay đổi, ta cần một phương trình tổng quát. Tuần này các em học phương trình trạng thái khí lí tưởng — tổng hợp của ba định luật chất khí.',
    objectives: [
      'Viết được phương trình trạng thái khí lí tưởng.',
      'Viết được phương trình Clapeyron-Mendeleev.',
      'Vận dụng để tính một đại lượng khi biết các đại lượng còn lại.',
    ],
    theory: [
      { h: 'Phương trình trạng thái' },
      { p: 'Với một lượng khí xác định: p·V / T = hằng số, hay p1·V1/T1 = p2·V2/T2. Đây là sự tổng hợp của định luật Boyle-Mariotte và định luật Charles.' },
      { h: 'Phương trình Clapeyron-Mendeleev' },
      { p: 'Với n mol khí lí tưởng: p · V = n · R · T, trong đó R ≈ 8,31 J/(mol·K) là hằng số khí lí tưởng, T tính bằng Kelvin.' },
      { h: 'Số mol' },
      { p: 'Số mol khí được tính bằng n = m / M, với m là khối lượng khí và M là khối lượng mol. Nhờ đó phương trình liên hệ được khối lượng khí với p, V, T.' },
      { h: 'Khí lí tưởng' },
      { p: 'Khí lí tưởng là mô hình lí tưởng hóa: bỏ qua kích thước phân tử và lực tương tác giữa các phân tử (trừ lúc va chạm). Khí thực ở nhiệt độ không quá thấp và áp suất không quá cao thì gần đúng là khí lí tưởng.' },
      { note: 'Khi áp dụng, luôn đổi nhiệt độ về Kelvin và giữ đơn vị nhất quán giữa các trạng thái.' },
    ],
    examples: [
      { q: 'Khí ở p1 = 1 atm, V1 = 2 L, T1 = 300 K. Biến đổi đến p2 = 2 atm, T2 = 600 K. Tính V2.', a: 'p1·V1/T1 = p2·V2/T2 → (1 × 2)/300 = (2 × V2)/600 → 2/300 = 2V2/600. Vế phải = V2/300, nên V2/300 = 2/300 → V2 = 2 L.' },
      { q: 'Tính áp suất của 2 mol khí lí tưởng chiếm thể tích 0,0166 m³ ở 300 K (R = 8,31 J/(mol·K)).', a: 'p = n·R·T/V = 2 × 8,31 × 300 / 0,0166 = 4986 / 0,0166 ≈ 300360 Pa ≈ 3 × 10⁵ Pa (xấp xỉ 3 atm).' },
    ],
  },

  'H10LY-w27-quiz': {
    topic: 'Nội năng và sự biến thiên nội năng',
    intro: 'Vật nóng lên thì năng lượng bên trong nó tăng. Tuần này các em học nội năng — tổng năng lượng của các phân tử — và hai cách làm thay đổi nó: thực hiện công và truyền nhiệt.',
    objectives: [
      'Nêu được khái niệm nội năng và các yếu tố nó phụ thuộc.',
      'Nêu hai cách làm thay đổi nội năng.',
      'Hiểu quy ước dấu của nhiệt lượng và công.',
    ],
    theory: [
      { h: 'Nội năng' },
      { p: 'Nội năng của một vật là tổng động năng và thế năng của các phân tử cấu tạo nên vật. Kí hiệu U, đơn vị jun (J).' },
      { h: 'Nội năng phụ thuộc gì?' },
      { p: 'Nội năng phụ thuộc nhiệt độ và thể tích của vật. Riêng với khí lí tưởng (bỏ qua thế năng tương tác), nội năng chỉ phụ thuộc nhiệt độ: U = U(T).' },
      { h: 'Hai cách làm thay đổi nội năng' },
      { ul: [
        'Thực hiện công: ví dụ cọ xát, nén khí — công cơ học chuyển thành nội năng.',
        'Truyền nhiệt: cho vật tiếp xúc vật nóng hơn — nhiệt truyền vào làm tăng nội năng.',
      ]},
      { h: 'Quy ước dấu' },
      { p: 'Nhiệt lượng Q > 0 khi vật nhận nhiệt, Q < 0 khi vật tỏa nhiệt. Khi cọ xát hai vật, công cọ xát chuyển thành nội năng nên vật nóng lên.' },
      { note: 'Cọ xát hai bàn tay vào nhau, tay nóng lên: công cơ học của lực ma sát đã chuyển thành nội năng của tay.' },
    ],
    examples: [
      { q: 'Truyền cho một vật 500 J nhiệt lượng, nội năng tăng đúng bằng đó (không thực hiện công). Tính độ tăng nội năng.', a: 'Vì không thực hiện công, toàn bộ nhiệt làm tăng nội năng: ΔU = Q = 500 J.' },
      { q: 'Một vật vừa nhận 300 J nhiệt vừa nhận 200 J công (bị nén). Tính độ biến thiên nội năng.', a: 'ΔU = Q + A = 300 + 200 = 500 J (nội năng tăng 500 J).' },
    ],
  },

  'H10LY-w28-quiz': {
    topic: 'Nguyên lí I Nhiệt động lực học',
    intro: 'Nguyên lí I nhiệt động lực học chính là định luật bảo toàn năng lượng áp dụng cho hệ nhiệt. Tuần này các em học cách liên hệ độ biến thiên nội năng với công và nhiệt lượng.',
    objectives: [
      'Phát biểu và viết được nguyên lí I nhiệt động lực học.',
      'Vận dụng nguyên lí I cho các quá trình đặc biệt.',
      'Hiểu quá trình đẳng nhiệt và đoạn nhiệt.',
    ],
    theory: [
      { h: 'Nguyên lí I' },
      { p: 'Độ biến thiên nội năng của hệ bằng tổng công và nhiệt lượng mà hệ nhận được: ΔU = A + Q. Đây là định luật bảo toàn năng lượng cho các quá trình nhiệt.' },
      { h: 'Các quá trình đặc biệt' },
      { ul: [
        'Đẳng nhiệt (T không đổi): với khí lí tưởng U chỉ phụ thuộc T nên ΔU = 0.',
        'Đoạn nhiệt (không trao đổi nhiệt): Q = 0 nên ΔU = A.',
        'Đẳng tích (V không đổi): khí không sinh công, A = 0 nên ΔU = Q.',
      ]},
      { h: 'Quá trình đoạn nhiệt' },
      { p: 'Trong quá trình đoạn nhiệt, hệ không trao đổi nhiệt với bên ngoài (Q = 0). Khi khí giãn nở đoạn nhiệt, khí sinh công mà không nhận nhiệt nên nội năng giảm, nhiệt độ giảm.' },
      { h: 'Ý nghĩa' },
      { p: 'Nguyên lí I cho thấy không thể có máy sinh công liên tục mà không tiêu thụ năng lượng từ đâu đó — một dạng của định luật bảo toàn năng lượng.' },
      { note: 'Khí trong xi lanh bị nén nhanh (đoạn nhiệt) sẽ nóng lên vì công nén chuyển thành nội năng — đó là nguyên lí động cơ Diesel.' },
    ],
    examples: [
      { q: 'Hệ nhận nhiệt 400 J và nhận công 150 J (bị nén). Tính độ biến thiên nội năng.', a: 'ΔU = A + Q = 150 + 400 = 550 J. Nội năng tăng 550 J.' },
      { q: 'Khí giãn nở đoạn nhiệt và sinh công 200 J ra ngoài. Tính độ biến thiên nội năng.', a: 'Đoạn nhiệt: Q = 0. Khí sinh công ra ngoài nên hệ nhận công A = −200 J. ΔU = A + Q = −200 + 0 = −200 J: nội năng giảm 200 J, khí lạnh đi.' },
    ],
  },

  'H10LY-w29-quiz': {
    topic: 'Sự nóng chảy và đông đặc',
    intro: 'Nước đá tan thành nước, nước đông thành đá — đó là chuyển thể giữa rắn và lỏng. Tuần này các em học sự nóng chảy, đông đặc và nhiệt nóng chảy riêng.',
    objectives: [
      'Nêu được định nghĩa nóng chảy và đông đặc.',
      'Hiểu đặc điểm nhiệt độ trong quá trình chuyển thể.',
      'Vận dụng công thức nhiệt nóng chảy.',
    ],
    theory: [
      { h: 'Sự nóng chảy và đông đặc' },
      { p: 'Sự nóng chảy là quá trình chuyển từ thể rắn sang thể lỏng. Sự đông đặc là quá trình ngược lại, từ thể lỏng sang thể rắn.' },
      { h: 'Nhiệt độ chuyển thể' },
      { p: 'Với chất rắn kết tinh, sự nóng chảy xảy ra ở một nhiệt độ xác định gọi là nhiệt độ nóng chảy. Trong suốt quá trình nóng chảy (hoặc đông đặc), nhiệt độ của chất giữ không đổi dù vẫn cấp (hoặc lấy bớt) nhiệt.' },
      { h: 'Đặc điểm quan trọng' },
      { ul: [
        'Nhiệt độ nóng chảy của nước đá ở áp suất chuẩn là 0°C.',
        'Nhiệt độ đông đặc bằng đúng nhiệt độ nóng chảy của cùng một chất.',
        'Nhiệt cấp trong khi nóng chảy dùng để phá vỡ liên kết tinh thể, không làm tăng nhiệt độ.',
      ]},
      { h: 'Nhiệt nóng chảy' },
      { p: 'Nhiệt lượng cần để làm nóng chảy hoàn toàn một vật khối lượng m đã ở nhiệt độ nóng chảy: Q = λ · m, với λ là nhiệt nóng chảy riêng (đơn vị J/kg).' },
      { note: 'Vì nhiệt độ không đổi khi đang nóng chảy, nước đá đang tan luôn giữ 0°C cho đến khi tan hết — đó là lí do nước đá giữ lạnh đồ uống.' },
    ],
    examples: [
      { q: 'Tính nhiệt lượng cần để làm nóng chảy hoàn toàn 0,5 kg nước đá ở 0°C, biết λ = 3,4 × 10⁵ J/kg.', a: 'Q = λ · m = 3,4 × 10⁵ × 0,5 = 1,7 × 10⁵ J = 170000 J.' },
      { q: 'Cần 6,8 × 10⁵ J để làm nóng chảy hết một khối nước đá ở 0°C (λ = 3,4 × 10⁵ J/kg). Tính khối lượng nước đá.', a: 'm = Q / λ = 6,8 × 10⁵ / (3,4 × 10⁵) = 2 kg.' },
    ],
  },

  'H10LY-w30-quiz': {
    topic: 'Sự bay hơi và ngưng tụ',
    intro: 'Quần áo phơi khô, sương đọng trên lá — đó là bay hơi và ngưng tụ. Tuần này các em phân biệt bay hơi với sự sôi và học nhiệt hóa hơi riêng.',
    objectives: [
      'Nêu được định nghĩa bay hơi, ngưng tụ và sự sôi.',
      'Phân biệt bay hơi với sự sôi.',
      'Vận dụng công thức nhiệt hóa hơi.',
    ],
    theory: [
      { h: 'Sự bay hơi' },
      { p: 'Sự bay hơi là quá trình chuyển từ thể lỏng sang thể khí, xảy ra ở mặt thoáng chất lỏng và ở mọi nhiệt độ. Tốc độ bay hơi tăng khi nhiệt độ cao, diện tích mặt thoáng lớn và gió mạnh.' },
      { h: 'Sự ngưng tụ' },
      { p: 'Sự ngưng tụ là quá trình ngược lại, chuyển từ thể khí sang thể lỏng (ví dụ hơi nước ngưng thành sương, mây).' },
      { h: 'Sự sôi' },
      { p: 'Sự sôi là sự bay hơi xảy ra cả ở mặt thoáng lẫn trong lòng chất lỏng, tại một nhiệt độ xác định gọi là nhiệt độ sôi. Nước sôi ở 100°C tại áp suất khí quyển chuẩn.' },
      { h: 'Bay hơi thu nhiệt' },
      { p: 'Bay hơi là quá trình thu nhiệt: chất lỏng lấy nhiệt từ môi trường nên làm môi trường lạnh đi (vì sao toát mồ hôi giúp cơ thể mát). Nhiệt lượng để hóa hơi hoàn toàn khối lượng m chất lỏng ở nhiệt độ sôi: Q = L · m, với L là nhiệt hóa hơi riêng (J/kg).' },
      { note: 'Khác nhau cốt lõi: bay hơi xảy ra ở mọi nhiệt độ và chỉ ở mặt thoáng; sự sôi chỉ ở nhiệt độ sôi nhưng trong toàn khối lỏng.' },
    ],
    examples: [
      { q: 'Tính nhiệt lượng để làm bay hơi hoàn toàn 0,2 kg nước ở 100°C, biết L = 2,3 × 10⁶ J/kg.', a: 'Q = L · m = 2,3 × 10⁶ × 0,2 = 4,6 × 10⁵ J = 460000 J.' },
      { q: 'Vì sao bôi cồn lên da lại thấy mát?', a: 'Cồn bay hơi nhanh, quá trình bay hơi thu nhiệt nên lấy nhiệt từ da, làm da lạnh đi và ta cảm thấy mát.' },
    ],
  },

  'H10LY-w31-quiz': {
    topic: 'Ôn tập Động học và Động lực học',
    intro: 'Tuần này các em ôn lại nửa đầu chương trình: động học (mô tả chuyển động) và động lực học (nguyên nhân chuyển động). Nắm vững công thức để giải nhanh bài tập.',
    objectives: [
      'Hệ thống công thức động học cơ bản.',
      'Ôn ba định luật Newton và các loại lực.',
      'Vận dụng tổng hợp vào bài tập tính lực, gia tốc.',
    ],
    theory: [
      { h: 'Vận tốc tức thời và trung bình' },
      { p: 'Vận tốc trung bình = độ dời / thời gian, đặc trưng cho cả quãng đường. Vận tốc tức thời là vận tốc tại một thời điểm xác định, cho biết vật đang đi nhanh chậm thế nào ngay lúc đó.' },
      { h: 'Công thức chuyển động biến đổi đều' },
      { ul: [
        'v = v0 + a·t',
        's = v0·t + ½a·t²',
        'v² − v0² = 2as',
      ]},
      { h: 'Ba định luật Newton' },
      { ul: [
        'Định luật I: quán tính — hợp lực bằng 0 thì v không đổi.',
        'Định luật II: F = m·a.',
        'Định luật III: lực và phản lực, F(AB) = − F(BA).',
      ]},
      { h: 'Các loại lực' },
      { p: 'Lực hấp dẫn F = G·m1·m2/r²; trọng lực P = m·g; lực đàn hồi F = k·|Δl|; lực ma sát trượt F(ms) = μ·N.' },
      { note: 'Trước khi giải, vẽ hình và xác định tất cả các lực tác dụng lên vật, rồi tìm hợp lực để áp dụng F = m·a.' },
    ],
    examples: [
      { q: 'Vật từ nghỉ, gia tốc 3 m/s². Tính vận tốc và quãng đường sau 4 s.', a: 'v = a·t = 3 × 4 = 12 m/s. s = ½a·t² = ½ × 3 × 16 = 24 m.' },
      { q: 'Vật 5 kg trên mặt ngang, kéo bằng lực 25 N, ma sát 5 N. Tính gia tốc.', a: 'Hợp lực = 25 − 5 = 20 N. a = F/m = 20/5 = 4 m/s².' },
    ],
  },

  'H10LY-w32-quiz': {
    topic: 'Ôn tập Năng lượng và Bảo toàn',
    intro: 'Tuần này các em hệ thống các định luật bảo toàn: cơ năng, động lượng và năng lượng. Đây là những công cụ mạnh để giải bài toán mà không cần biết chi tiết lực.',
    objectives: [
      'Ôn công thức động năng, thế năng, công, công suất.',
      'Nắm điều kiện bảo toàn cơ năng.',
      'Phân biệt bảo toàn động lượng và động năng trong va chạm.',
    ],
    theory: [
      { h: 'Năng lượng cơ học' },
      { ul: [
        'Động năng: W(đ) = ½m·v².',
        'Thế năng trọng trường: W(t) = m·g·h.',
        'Cơ năng: W = W(đ) + W(t).',
      ]},
      { h: 'Công và công suất' },
      { p: 'Công A = F·s·cosα (đơn vị J); công suất P = A/t (đơn vị W). Với chuyển động đều P = F·v.' },
      { h: 'Bảo toàn cơ năng' },
      { p: 'Cơ năng được bảo toàn khi vật chỉ chịu trọng lực hoặc lực đàn hồi, không có ma sát. Khi đó động năng và thế năng chuyển hóa qua lại nhưng tổng không đổi.' },
      { h: 'Động lượng và va chạm' },
      { p: 'Động lượng p = m·v (kg·m/s). Trong va chạm hệ kín, động lượng luôn bảo toàn. Động năng chỉ bảo toàn trong va chạm đàn hồi; va chạm mềm chỉ bảo toàn động lượng.' },
      { note: 'Khi gặp bài có va chạm, dùng bảo toàn động lượng trước; khi gặp bài rơi/trượt không ma sát, dùng bảo toàn cơ năng.' },
    ],
    examples: [
      { q: 'Vật 2 kg đi với vận tốc 6 m/s. Tính động năng và động lượng.', a: 'Động năng W(đ) = ½ × 2 × 6² = ½ × 2 × 36 = 36 J. Động lượng p = m·v = 2 × 6 = 12 kg·m/s.' },
      { q: 'Vật 1 kg rơi không ma sát từ độ cao 8 m (g = 10 m/s²). Tính vận tốc chạm đất.', a: 'Bảo toàn cơ năng: ½v² = g·h → v² = 2 × 10 × 8 = 160 → v = √160 ≈ 12,6 m/s.' },
    ],
  },

  'H10LY-w33-quiz': {
    topic: 'Ôn tập Nhiệt học',
    intro: 'Tuần này các em ôn lại toàn bộ phần nhiệt học: ba định luật chất khí, phương trình trạng thái và nguyên lí I nhiệt động lực học. Chú ý luôn đổi nhiệt độ về Kelvin.',
    objectives: [
      'Hệ thống ba định luật chất khí và phương trình trạng thái.',
      'Ôn nguyên lí I nhiệt động lực học.',
      'Nắm mối liên hệ nhiệt độ Kelvin – Celsius.',
    ],
    theory: [
      { h: 'Ba định luật chất khí' },
      { ul: [
        'Đẳng nhiệt (Boyle-Mariotte): p·V = const.',
        'Đẳng tích (Charles): p/T = const.',
        'Đẳng áp (Gay-Lussac): V/T = const.',
      ]},
      { h: 'Phương trình trạng thái' },
      { p: 'Tổng quát: p·V/T = const, hay p1·V1/T1 = p2·V2/T2. Với n mol: p·V = n·R·T, R ≈ 8,31 J/(mol·K).' },
      { h: 'Nhiệt độ Kelvin' },
      { p: 'T(K) = t(°C) + 273. Mọi định luật chất khí phải dùng nhiệt độ tuyệt đối (Kelvin), tuyệt đối không dùng độ Celsius trong các tỉ lệ.' },
      { h: 'Nguyên lí I nhiệt động lực học' },
      { p: 'ΔU = A + Q. Với khí lí tưởng nội năng chỉ phụ thuộc nhiệt độ: U = U(T). Quá trình đẳng nhiệt ΔU = 0; đoạn nhiệt Q = 0 → ΔU = A.' },
      { note: 'Sai lầm phổ biến nhất trong bài toán chất khí là quên đổi nhiệt độ sang Kelvin — hãy kiểm tra điều này trước tiên.' },
    ],
    examples: [
      { q: 'Khí ở 1 atm, 300 K trong bình kín được đun lên 450 K. Tính áp suất mới (đẳng tích).', a: 'p1/T1 = p2/T2 → 1/300 = p2/450 → p2 = 450/300 = 1,5 atm.' },
      { q: 'Hệ khí nhận nhiệt 250 J và sinh công 100 J ra ngoài. Tính độ biến thiên nội năng.', a: 'Sinh công ra ngoài nên A = −100 J. ΔU = A + Q = −100 + 250 = 150 J.' },
    ],
  },

  'H10LY-w34-quiz': {
    topic: 'Đề tổng hợp 1',
    intro: 'Tuần này các em luyện đề tổng hợp, kết hợp động học, động lực học, năng lượng và nhiệt học. Hãy đọc kĩ đề, đổi đơn vị và chọn đúng công thức.',
    objectives: [
      'Vận dụng tổng hợp công thức các phần đã học.',
      'Rèn kĩ năng đổi đơn vị và trình bày lời giải.',
      'Tự đánh giá mức nắm kiến thức trước kì thi.',
    ],
    theory: [
      { h: 'Chiến lược làm bài tổng hợp' },
      { p: 'Đọc kĩ đề, gạch chân số liệu và đại lượng cần tìm. Xác định bài thuộc phần nào để chọn công thức đúng.' },
      { h: 'Nhóm công thức động học – động lực học' },
      { ul: [
        'v(tb) = s/t; v = v0 + a·t; s = v0·t + ½a·t²; v² − v0² = 2as.',
        'F = m·a; P = m·g; F(ms) = μ·N.',
        'Rơi tự do: v = √(2gh); h = ½g·t².',
      ]},
      { h: 'Nhóm công thức năng lượng' },
      { p: 'A = F·s·cosα; P = A/t; W(đ) = ½mv²; W(t) = mgh; bảo toàn cơ năng và động lượng.' },
      { h: 'Nhóm công thức nhiệt' },
      { p: 'p·V = const (đẳng nhiệt); p/T = const (đẳng tích); p·V/T = const; ΔU = A + Q.' },
      { note: 'Luôn viết đơn vị kèm kết quả. Một đáp số không có đơn vị coi như chưa hoàn chỉnh.' },
    ],
    examples: [
      { q: 'Vật 2 kg chịu lực 10 N trên mặt nhẵn, từ nghỉ. Tính gia tốc và động năng sau khi đi 5 m.', a: 'a = F/m = 10/2 = 5 m/s². v² = 2as = 2 × 5 × 5 = 50 → v = √50. W(đ) = ½m·v² = ½ × 2 × 50 = 50 J (cũng bằng công A = F·s = 10 × 5 = 50 J).' },
      { q: 'Khí ở 27°C (300 K) trong bình kín đun lên 327°C (600 K). Áp suất thay đổi thế nào?', a: 'Đẳng tích: p tỉ lệ T. p2/p1 = T2/T1 = 600/300 = 2. Áp suất tăng gấp 2 lần.' },
    ],
  },

  'H10LY-w35-quiz': {
    topic: 'Đề tổng hợp 2 — Cuối năm',
    intro: 'Tuần cuối cùng của năm học. Các em luyện đề tổng hợp cuối năm, củng cố các khái niệm cốt lõi nhất của Vật lí 10. Chúc các em ôn tập tốt và thi đạt kết quả cao.',
    objectives: [
      'Củng cố các khái niệm và định luật cốt lõi cả năm.',
      'Phân biệt đại lượng vô hướng và vectơ.',
      'Vận dụng các định luật bảo toàn và định luật chất khí.',
    ],
    theory: [
      { h: 'Đại lượng vô hướng và vectơ' },
      { p: 'Đại lượng vô hướng: khối lượng, thời gian, nhiệt độ, năng lượng. Đại lượng vectơ: vận tốc, gia tốc, lực, động lượng — phải xét cả độ lớn lẫn hướng.' },
      { h: 'Các định luật nền tảng' },
      { ul: [
        'Ba định luật Newton (quán tính, F = m·a, lực – phản lực).',
        'Định luật vạn vật hấp dẫn và trọng lực P = m·g (g ≈ 9,8 m/s²).',
        'Định luật bảo toàn cơ năng, động lượng, năng lượng.',
      ]},
      { h: 'Định luật bảo toàn động lượng' },
      { p: 'Chỉ áp dụng cho hệ kín (không có ngoại lực hoặc ngoại lực triệt tiêu). Tổng động lượng trước bằng tổng động lượng sau.' },
      { h: 'Nhiệt học' },
      { p: 'Phương trình trạng thái p·V/T = const và phương trình Clapeyron-Mendeleev p·V = n·R·T. Bay hơi xảy ra ở mọi nhiệt độ; sự sôi ở nhiệt độ sôi xác định.' },
      { note: 'Ôn tập có hệ thống theo từng chủ đề, làm lại các dạng bài đã gặp, và nhớ kiểm tra đơn vị — đó là cách thi đạt điểm cao.' },
    ],
    examples: [
      { q: 'Vật 0,5 kg đi với vận tốc 4 m/s. Tính động lượng và động năng.', a: 'Động lượng p = m·v = 0,5 × 4 = 2 kg·m/s. Động năng W(đ) = ½m·v² = ½ × 0,5 × 16 = 4 J.' },
      { q: '2 mol khí lí tưởng ở 300 K, thể tích 0,05 m³. Tính áp suất (R = 8,31 J/(mol·K)).', a: 'p = n·R·T/V = 2 × 8,31 × 300 / 0,05 = 4986 / 0,05 = 99720 Pa ≈ 10⁵ Pa (xấp xỉ 1 atm).' },
    ],
  },

  'H10LY-w36-quiz': {
    topic: 'Kết thúc Vật Lý 10 — Cơ học và Nhiệt học hành trang lên lớp 11',
    intro: 'Vật Lý 10 đưa em vào thế giới vật lí học cổ điển: từ chuyển động cơ học đến nhiệt học và khí lí tưởng. Hôm nay chúng ta hệ thống lại toàn bộ kiến thức và xem lớp 11 sẽ mở ra những chân trời mới nào.',
    objectives: [
      'Hệ thống hoá các định luật và công thức cốt lõi của Vật Lý 10.',
      'Nhận biết mối liên hệ giữa Cơ học – Nhiệt học và chương trình Vật Lý 11 (Điện – Từ – Sóng).',
      'Xây dựng kế hoạch ôn tập hè để không bị hổng kiến thức nền.',
    ],
    theory: [
      { h: 'Bức tranh toàn cảnh Vật Lý 10' },
      { ul: [
        'Động học: chuyển động thẳng đều, thẳng biến đổi đều, rơi tự do, ném ngang.',
        'Động lực học: 3 định luật Newton, lực ma sát, lực hướng tâm, lực kéo dãn lò xo.',
        'Các định luật bảo toàn: động lượng, năng lượng, cơ năng — nền tảng của vật lí học.',
        'Nhiệt học: nội năng, các quá trình nhiệt động lực học, phương trình trạng thái khí lí tưởng.',
      ] },
      { h: 'Cầu nối sang Vật Lý 11' },
      { ul: [
        'Lực điện (Coulomb) → tương tự lực hấp dẫn (Newton) — cùng mô hình tương tác từ xa.',
        'Công và năng lượng → Công của lực điện, thế năng điện, điện trường.',
        'Chuyển động tròn đều → Chuyển động của điện tích trong từ trường (lực Lorentz).',
        'Sóng cơ (âm thanh) → Sóng điện từ — cùng phương trình sóng, chỉ khác bản chất.',
      ] },
      { h: 'Ôn hè hiệu quả cho Vật Lý' },
      { ul: [
        'Hệ thống lại công thức theo chủ đề — không học thuộc lòng mà hiểu ý nghĩa vật lí.',
        'Luyện bài tập định lượng: mỗi dạng làm 3–5 bài để nhớ phương pháp giải.',
        'Xem video thí nghiệm thực (YouTube: "Vật lí thực tế") để kết nối lý thuyết với cuộc sống.',
      ] },
      { note: 'Điện và Từ ở lớp 11 sẽ thú vị hơn Cơ học rất nhiều — nhưng nếu định luật Newton và năng lượng chưa vững, em sẽ khó hình dung điện trường và từ trường. Hè này là thời điểm vàng để lấp khoảng trống.' },
    ],
    examples: [
      { q: 'Tại sao cần phân biệt rõ "vận tốc" và "tốc độ" trong Vật Lý, và điều này ảnh hưởng như thế nào khi học Vật Lý 11?', a: 'Vận tốc là đại lượng vectơ (có phương, chiều và độ lớn); tốc độ là đại lượng vô hướng (chỉ có độ lớn). Khi học điện từ ở lớp 11, vận tốc của điện tích trong từ trường quyết định phương và chiều lực Lorentz — nhầm vectơ với vô hướng sẽ dẫn đến sai kết quả. Nắm rõ tính vectơ từ lớp 10 là nền tảng thiết yếu.' },
      { q: 'Định luật bảo toàn năng lượng học ở lớp 10 sẽ xuất hiện lại ở lớp 11 dưới hình thức nào?', a: 'Ở lớp 11, định luật bảo toàn năng lượng mở rộng sang: (1) Mạch điện: công của nguồn điện = nhiệt lượng tổng cộng (định luật Joule-Lenz); (2) Mạch dao động LC: năng lượng điện trường ⇌ năng lượng từ trường; (3) Sóng điện từ: năng lượng sóng truyền đi mà không "mất". Đây là định luật phổ quát nhất trong vật lí học.' },
    ],
  },
};
