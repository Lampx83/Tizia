// ============================================================
// Lớp 9 · TIẾNG ANH — Lý thuyết 35 tuần (chuẩn bị thi vào 10).
// Key trùng id quiz: "S9TA-wNN-quiz".
// Giảng giải bằng tiếng Việt; ví dụ và mẫu câu bằng tiếng Anh.
// Bám SGK Tiếng Anh 9 (GDPT 2018): Global Success / Friends Plus / i-Learn Smart World.
// CEFR mục tiêu A2-B1, hướng tới đề thi vào lớp 10.
// ============================================================

const L = (topic, intro, objectives, theory, examples) => ({ topic, intro, objectives, theory, examples });

export const S9TA_LESSONS = {
  'S9TA-w01-quiz': L(
    'Local Environment — Vocabulary',
    'Chào các em vào lớp 9! Năm học cuối cấp mở đầu bằng chủ đề Local Environment (Môi trường địa phương) trong bài "Local Environment" của SGK. Các em sẽ học từ vựng về làng nghề, nghệ nhân, di sản — vốn từ rất hay xuất hiện trong bài đọc về Việt Nam ở đề thi vào 10.',
    [
      'Nắm vốn từ về làng nghề truyền thống (craft villages) và sản phẩm thủ công.',
      'Dùng đúng các động từ chỉ nghề thủ công: carve, weave, embroider, mould, knit...',
      'Phân biệt artisan / craftsman và các danh từ liên quan đến di sản, bảo tồn.',
    ],
    [
      { h: 'Vocabulary — Craft villages (Làng nghề)' },
      { p: 'Chủ điểm này xoay quanh các làng nghề nổi tiếng của Việt Nam như Bat Trang (gốm), Van Phuc (lụa), Dong Ho (tranh dân gian). Hãy học từ theo cụm để dùng được ngay trong bài viết.' },
      { ul: [
        'craft village /krɑːft ˈvɪl.ɪdʒ/ — làng nghề thủ công',
        'artisan /ˈɑː.tɪ.zæn/ — nghệ nhân (người làm nghề thủ công lành nghề)',
        'craftsman /ˈkrɑːfts.mən/ — thợ thủ công',
        'handicraft /ˈhæn.dɪ.krɑːft/ — đồ thủ công mỹ nghệ',
        'workshop /ˈwɜːk.ʃɒp/ — xưởng / buổi thực hành',
        'pottery /ˈpɒt.ər.i/ — đồ gốm; conical hat — nón lá',
        'lantern /ˈlæn.tən/ — đèn lồng; silk /sɪlk/ — lụa',
      ] },
      { h: 'Verbs — Động từ chỉ nghề thủ công' },
      { ul: [
        'carve /kɑːv/ — chạm khắc (carve a statue from wood)',
        'weave /wiːv/ (wove, woven) — dệt (weave silk)',
        'embroider /ɪmˈbrɔɪ.dər/ — thêu',
        'mould /məʊld/ — nặn, đúc khuôn',
        'knit /nɪt/ — đan (len)',
        'cast /kɑːst/ — đúc (kim loại); polish — đánh bóng',
      ] },
      { h: 'Heritage & preservation (Di sản & bảo tồn)' },
      { ul: [
        'heritage /ˈher.ɪ.tɪdʒ/ — di sản',
        'preserve /prɪˈzɜːv/ (v) — giữ gìn, bảo tồn → preservation (n)',
        'traditional /trəˈdɪʃ.ən.əl/ (adj) — truyền thống',
        'authentic /ɔːˈθen.tɪk/ — chính gốc, đích thực',
        'be passed down — được truyền lại (qua các thế hệ)',
      ] },
      { h: 'Collocations cần nhớ' },
      { p: 'Đề thi thường kiểm tra cụm từ (collocation), không kiểm tra từ rời. Hãy thuộc nguyên cụm: "preserve the heritage", "set up a workshop", "be famous for + N".' },
      { note: 'Phân biệt: "make sth by hand" = làm bằng tay; "handmade" (adj) = làm thủ công. "Bat Trang is famous FOR pottery" (giới từ "for" sau "famous").' },
      { note: 'Mẹo phát âm: "artisan" trọng âm rơi vào âm tiết ĐẦU /ˈɑː.tɪ.zæn/. Nhiều em đọc sai trọng âm — đề thi vào 10 Hà Nội có câu hỏi trọng âm.' },
    ],
    [
      { q: 'Dịch: "Bat Trang is a famous pottery village near Hanoi."', a: 'Bát Tràng là một làng gốm nổi tiếng gần Hà Nội. — "pottery village" = làng gốm; cấu trúc "famous + N" mô tả đặc trưng.' },
      { q: '"What is an artisan?" (giải thích bằng tiếng Anh)', a: 'An artisan is a person who is skilled at making things by hand, especially in a traditional craft. — Lưu ý "by hand" và "traditional craft".' },
      { q: 'Điền động từ: "The women in Van Phuc village ___ silk for many generations." (weave / carve)', a: 'weave — dệt lụa. Van Phuc nổi tiếng về lụa nên dùng "weave silk", không dùng "carve" (chạm khắc).' },
    ]
  ),

  'S9TA-w02-quiz': L(
    'Phrasal Verbs',
    'Phrasal verb (cụm động từ = verb + particle) là một "đặc sản" của tiếng Anh và xuất hiện dày đặc trong đề thi vào 10. Tuần này cô hệ thống các phrasal verb thông dụng, cách phân biệt loại TÁCH ĐƯỢC và KHÔNG TÁCH, để các em dùng chính xác trong cả nói và viết.',
    [
      'Nhận diện và hiểu nghĩa các phrasal verb thông dụng.',
      'Phân biệt phrasal verb tách được (separable) và không tách được (inseparable).',
      'Dùng đúng vị trí tân ngữ, đặc biệt khi tân ngữ là đại từ (it, them...).',
    ],
    [
      { h: 'Phrasal verb là gì?' },
      { p: 'Phrasal verb = động từ + tiểu từ (giới từ/trạng từ). Nghĩa của cả cụm thường KHÁC với nghĩa của động từ gốc. Ví dụ: "look" = nhìn, nhưng "look after" = chăm sóc.' },
      { h: 'Common phrasal verbs (Cụm thông dụng)' },
      { ul: [
        'turn on / turn off — bật / tắt (thiết bị)',
        'set up — thiết lập, thành lập (set up a company)',
        'pass down — truyền lại (pass down a tradition)',
        'look after — chăm sóc (= take care of)',
        'find out — tìm ra, phát hiện',
        'give up — từ bỏ; carry out — tiến hành, thực hiện',
        'take part in — tham gia; come up with — nảy ra (ý tưởng)',
      ] },
      { h: 'Separable vs Inseparable (Tách được / Không tách)' },
      { p: 'Phrasal verb TÁCH ĐƯỢC: tân ngữ có thể đứng giữa hoặc đứng sau ("turn on the light" = "turn the light on").' },
      { p: 'Phrasal verb KHÔNG TÁCH: tân ngữ luôn đứng sau cả cụm ("look after the kids", KHÔNG nói "look the kids after").' },
      { h: 'Quy tắc vàng với đại từ' },
      { p: 'Nếu tân ngữ là đại từ (it, them, him...) và phrasal verb TÁCH ĐƯỢC, thì đại từ BẮT BUỘC đứng giữa: "Turn it on" (ĐÚNG), "Turn on it" (SAI).' },
      { h: 'Phrasal verb 3 thành phần' },
      { ul: [
        'look forward to — mong chờ (+ V-ing): I look forward to seeing you.',
        'put up with — chịu đựng: I can\'t put up with the noise.',
        'run out of — hết, cạn: We ran out of money.',
        'cut down on — giảm bớt: cut down on sugar.',
      ] },
      { note: 'Phrasal verb 3 thành phần (như "look forward to") thì KHÔNG bao giờ tách. Đặc biệt "look forward to" là giới từ "to" → theo sau phải là V-ing, KHÔNG phải V nguyên thể.' },
      { note: 'Mẹo học: ghi mỗi phrasal verb kèm MỘT câu ví dụ. Học theo câu dễ nhớ nghĩa và cách dùng hơn học từ rời.' },
    ],
    [
      { q: 'Chọn: She "looks after" / "looks for" her younger brother every afternoon.', a: '"looks after" — chăm sóc em trai. "look for" = tìm kiếm (nghĩa khác hẳn).' },
      { q: 'Sắp xếp lại cho đúng: "Turn / it / on" (đèn).', a: '"Turn it on." — Đại từ "it" với phrasal verb tách được BẮT BUỘC đứng giữa, không nói "Turn on it".' },
      { q: 'Đặt câu với "set up": (về một nghệ nhân mở xưởng)', a: 'The artisans set up a workshop to teach young people traditional crafts. — "set up" = thành lập, mở ra.' },
    ]
  ),

  'S9TA-w03-quiz': L(
    'Complex Sentences with Adverbial Clauses',
    'Câu phức với mệnh đề trạng ngữ (adverbial clauses) giúp bài viết của em "lên trình" hơn hẳn câu đơn. Đề thi vào 10 phần viết lại câu và viết đoạn rất chuộng cấu trúc này. Tuần này ta học cách dùng liên từ chỉ thời gian, lý do, điều kiện, nhượng bộ và mục đích.',
    [
      'Tạo và dùng mệnh đề trạng ngữ với liên từ phù hợp.',
      'Chọn đúng liên từ theo nghĩa (thời gian / lý do / nhượng bộ / mục đích).',
      'Đặt dấu phẩy đúng vị trí khi mệnh đề trạng ngữ đứng trước.',
    ],
    [
      { h: 'Mệnh đề trạng ngữ là gì?' },
      { p: 'Mệnh đề trạng ngữ là một mệnh đề phụ (có S + V) bắt đầu bằng liên từ, bổ nghĩa cho mệnh đề chính về thời gian, lý do, điều kiện... Nó KHÔNG đứng một mình thành câu được.' },
      { h: 'Liên từ chỉ THỜI GIAN' },
      { ul: [
        'when — khi; while — trong khi (hành động kéo dài)',
        'before / after — trước / sau khi',
        'as soon as — ngay khi; until — cho đến khi',
        'by the time — vào lúc mà',
      ] },
      { h: 'Liên từ chỉ LÝ DO' },
      { ul: [
        'because — bởi vì (lý do trực tiếp, mạnh nhất)',
        'since / as — vì (lý do đã biết, nhẹ hơn)',
        'Lưu ý: "since" còn nghĩa "kể từ khi" (thời gian) — phải dựa vào ngữ cảnh.',
      ] },
      { h: 'Liên từ chỉ ĐIỀU KIỆN & NHƯỢNG BỘ' },
      { ul: [
        'if — nếu; unless — trừ khi (= if...not)',
        'although / though / even though — mặc dù',
        'as long as — miễn là',
      ] },
      { h: 'Liên từ chỉ MỤC ĐÍCH' },
      { ul: [
        'so that / in order that + mệnh đề: She studies hard so that she can pass.',
        '(so as) to / in order to + V (nguyên thể) — khi hai vế cùng chủ ngữ.',
      ] },
      { h: 'Quy tắc dấu phẩy' },
      { p: 'Khi mệnh đề trạng ngữ đứng TRƯỚC, ta dùng dấu phẩy ngăn cách: "When I arrived, she was cooking." Khi nó đứng SAU, KHÔNG cần phẩy: "She was cooking when I arrived."' },
      { note: 'Lỗi hay gặp: dùng "although" rồi lại thêm "but" trong cùng câu. SAI: "Although it was cold, but we went out." ĐÚNG: bỏ "but" → "Although it was cold, we went out."' },
      { note: '"Because" + mệnh đề (S+V); "because of" + danh từ. So sánh: "because it rained" và "because of the rain".' },
    ],
    [
      { q: 'Nối câu: "She studied hard. She passed the exam." (dùng because)', a: 'Because she studied hard, she passed the exam. (Hoặc: She passed the exam because she studied hard.) — Mệnh đề lý do đứng đầu thì có dấu phẩy.' },
      { q: 'Nối câu dùng "although": "It was cold. We went out."', a: 'Although it was cold, we went out. — KHÔNG thêm "but" vì đã có "although".' },
      { q: 'Chọn liên từ: "___ you hurry, you will miss the bus." (Unless / If)', a: 'Unless — "Unless you hurry" = "If you don\'t hurry" (Nếu em không nhanh lên, em sẽ lỡ xe).' },
    ]
  ),

  'S9TA-w04-quiz': L(
    'City Life — Reading Skills',
    'Đọc hiểu (reading comprehension) chiếm điểm số lớn trong đề thi vào 10. Tuần này, gắn với chủ đề "City Life" (Cuộc sống thành phố), cô dạy các em 4 kỹ năng đọc cốt lõi — skimming, scanning, inferring, đoán nghĩa từ trong ngữ cảnh — để làm bài nhanh và chính xác.',
    [
      'Áp dụng 4 chiến lược đọc: skimming, scanning, inferring, guessing in context.',
      'Nhận diện và xử lý đúng từng dạng câu hỏi đọc hiểu.',
      'Mở rộng vốn từ chủ đề City Life: urban, facilities, fascinating...',
    ],
    [
      { h: 'Bốn chiến lược đọc cốt lõi' },
      { ul: [
        'Skimming — đọc lướt để nắm Ý CHÍNH (main idea).',
        'Scanning — quét tìm THÔNG TIN CỤ THỂ (số, tên, ngày).',
        'Inferring — suy luận ý nằm "ẩn" sau câu chữ.',
        'Guessing in context — đoán nghĩa từ mới dựa vào câu xung quanh.',
      ] },
      { h: 'Skimming — Tìm ý chính' },
      { p: 'Đọc nhanh câu đầu và câu cuối mỗi đoạn, chú ý câu chủ đề (topic sentence). Mục tiêu là nắm "bài này nói về cái gì", KHÔNG đọc từng từ.' },
      { h: 'Scanning — Tìm chi tiết' },
      { p: 'Khi câu hỏi có từ khóa (What date? How many? Who?), hãy quét mắt tìm con số / tên riêng / từ khóa đó trong bài, KHÔNG đọc cả đoạn.' },
      { h: 'Inferring — Suy luận' },
      { p: 'Một số câu hỏi không có đáp án "nguyên văn" trong bài (Câu hỏi dạng: "The writer implies/suggests that..."). Em phải ghép các dữ kiện để suy ra.' },
      { h: 'Đoán nghĩa từ trong ngữ cảnh' },
      { p: 'Gặp từ lạ, đừng hoảng. Đọc câu trước và câu sau, tìm từ đồng nghĩa/trái nghĩa, hoặc dấu hiệu định nghĩa ("which means", "such as") để đoán.' },
      { h: 'Vocabulary — City Life' },
      { ul: [
        'urban /ˈɜː.bən/ — (thuộc) đô thị ↔ rural — nông thôn',
        'facilities /fəˈsɪl.ɪ.tiz/ — tiện ích, cơ sở vật chất',
        'fascinating — hấp dẫn, lôi cuốn; multicultural — đa văn hóa',
        'metropolitan — (thuộc) đô thị lớn; downtown — trung tâm thành phố',
      ] },
      { note: 'Mẹo vàng: LUÔN đọc câu hỏi TRƯỚC khi đọc bài. Như vậy em biết cần tìm gì, đỡ tốn thời gian đọc đi đọc lại.' },
      { note: 'Với câu True/False/Not Given: "Not Given" nghĩa là bài KHÔNG nhắc tới, KHÁC với "False" (bài nói ngược lại). Nhiều em nhầm hai cái này.' },
    ],
    [
      { q: 'Dạng câu hỏi "What is the main idea of the passage?" nên dùng chiến lược nào?', a: 'Skimming — đọc lướt câu đầu/cuối mỗi đoạn và các câu chủ đề để nắm ý chính, không cần đọc chi tiết.' },
      { q: 'Dạng "In what year was the city founded?" nên dùng chiến lược nào?', a: 'Scanning — quét tìm con số (năm) trong bài, bỏ qua phần không liên quan.' },
      { q: 'Trong câu "The metropolis was bustling — full of noise, crowds and movement.", từ "bustling" nghĩa là gì?', a: 'Nhộn nhịp, tấp nập. — Đoán qua ngữ cảnh: "full of noise, crowds and movement" giải thích nghĩa của "bustling".' },
    ]
  ),

  'S9TA-w05-quiz': L(
    'Phrasal Verbs (cont.) + City Life',
    'Tiếp nối tuần trước, ta mở rộng kho phrasal verb gắn với cuộc sống đô thị và sinh hoạt hằng ngày. Đây là nhóm từ rất hay gặp trong bài đọc và bài viết về City Life.',
    [
      'Dùng các phrasal verb về đời sống thành phố và sinh hoạt.',
      'Phân biệt nghĩa các phrasal verb dễ nhầm (put up / put up with...).',
      'Vận dụng phrasal verb vào câu nói về môi trường và thói quen.',
    ],
    [
      { h: 'City-Life phrasal verbs' },
      { ul: [
        'put up with — chịu đựng (the noise, the crowd)',
        'cut down on — giảm bớt (cut down on plastic)',
        'come up with — nảy ra (ý tưởng / giải pháp)',
        'run out of — hết, cạn (run out of time/money)',
        'get around — đi lại (di chuyển trong thành phố)',
        'show somebody around — dẫn ai đi tham quan',
      ] },
      { h: 'Phrasal verb chỉ phương tiện & di chuyển' },
      { ul: [
        'get on / get off — lên / xuống (xe buýt, tàu)',
        'get in / get out of — vào / ra (xe ô tô, taxi)',
        'set off / set out — khởi hành',
        'drop off — thả ai xuống; pick up — đón ai',
      ] },
      { h: 'Phân biệt cụm dễ nhầm' },
      { ul: [
        'put up = dựng lên (put up a tent); put up with = chịu đựng.',
        'look up = tra cứu (từ điển); look up to = ngưỡng mộ.',
        'take off = cất cánh / cởi ra; take after = giống (người thân).',
      ] },
      { h: 'Phrasal verb 3 thành phần và V-ing' },
      { p: 'Các cụm kết thúc bằng giới từ (with, on, to) khi đi tiếp với một động từ thì phải dùng V-ing: "I look forward to MEETING you", "She gave up SMOKING".' },
      { note: 'Lưu ý "get on" có nhiều nghĩa: (1) lên xe; (2) get on well with sb = hòa hợp với ai. Phải nhìn ngữ cảnh.' },
      { note: 'Nhiều phrasal verb có 3 phần KHÔNG tách: "put up with it" (ĐÚNG), "put up it with" (SAI).' },
    ],
    [
      { q: 'Chọn: I can\'t "put up with" / "put up to" this noise any longer!', a: '"put up with" — chịu đựng, dung thứ. "put up to" không phải phrasal verb chuẩn ở nghĩa này.' },
      { q: 'Đặt câu với "cut down on" (về môi trường):', a: 'We should cut down on plastic bags to protect the environment. — "cut down on" = giảm bớt lượng dùng.' },
      { q: 'Hoàn thành: "We need to ___ a new idea to reduce traffic." (come up with)', a: 'come up with — nảy ra (ý tưởng/giải pháp). Câu đầy đủ: "We need to come up with a new idea to reduce traffic."' },
    ]
  ),

  'S9TA-w06-quiz': L(
    'Comparison of Adjectives + Quantifiers',
    'So sánh chính xác và dùng đúng lượng từ là kỹ năng nền. Tuần này ta củng cố cả ba bậc so sánh (bằng, hơn, nhất) cùng các cấu trúc so sánh nâng cao, và hệ thống lại quantifiers (many/much, few/little...) — chỗ học sinh hay sai.',
    [
      'Tạo đúng các bậc so sánh: ngang bằng, hơn, nhất.',
      'Dùng cấu trúc so sánh nâng cao: the more...the more, comparative + and + comparative.',
      'Chọn đúng quantifier theo danh từ đếm được / không đếm được.',
    ],
    [
      { h: 'So sánh ngang bằng (Equality)' },
      { p: 'as + adj/adv + as: "She is as tall as her brother." Phủ định: "not as/so + adj + as".' },
      { h: 'So sánh hơn (Comparative)' },
      { ul: [
        'Tính từ NGẮN: + -er + than (big → bigger than; happy → happier than).',
        'Tính từ DÀI: more + adj + than (beautiful → more beautiful than).',
        'Bất quy tắc: good → better; bad → worse; far → farther/further.',
      ] },
      { h: 'So sánh nhất (Superlative)' },
      { ul: [
        'NGẮN: the + adj-est (the biggest, the happiest).',
        'DÀI: the most + adj (the most beautiful).',
        'Bất quy tắc: the best, the worst, the furthest.',
      ] },
      { h: 'Cấu trúc so sánh NÂNG CAO (hay gặp ở đề thi)' },
      { ul: [
        'The + comparative..., the + comparative...: "The more you practise, the better you become."',
        'comparative + and + comparative: "It is getting hotter and hotter."',
        'less + adj + than: "This is less expensive than that." (= không đắt bằng).',
      ] },
      { h: 'Quantifiers — Lượng từ' },
      { ul: [
        'many + danh từ đếm được số nhiều; much + danh từ KHÔNG đếm được.',
        'a few / few + đếm được; a little / little + không đếm được.',
        'a lot of / lots of / plenty of — dùng được cho cả hai.',
      ] },
      { h: 'few vs a few; little vs a little' },
      { p: '"a few / a little" mang nghĩa TÍCH CỰC (có một ít, đủ dùng). "few / little" (không có "a") mang nghĩa TIÊU CỰC (rất ít, gần như không có).' },
      { note: 'Lưu ý: "much" thường dùng trong câu phủ định/nghi vấn ("I don\'t have much time"). Trong câu khẳng định, người Anh hay thay bằng "a lot of".' },
      { note: 'Sau "than" và "as" có thể dùng đại từ tân ngữ trong văn nói (than me, as her) hoặc đại từ chủ ngữ + trợ động từ trong văn trang trọng (than I do).' },
    ],
    [
      { q: 'Dạng so sánh hơn của "happy" là gì?', a: 'happier (than). — "happy" là tính từ ngắn tận cùng phụ âm + y → đổi y thành i + er.' },
      { q: 'Chọn: "I have ___ time today." (a little / a few)', a: '"a little" — "time" là danh từ không đếm được, nên dùng "a little" (một ít, đủ chút thời gian).' },
      { q: 'Hoàn thành cấu trúc so sánh kép: "The harder you study, ___."', a: '"the better your results will be." — Cấu trúc "The + comparative..., the + comparative..." (Càng... càng...).' },
    ]
  ),

  'S9TA-w07-quiz': L(
    'Life in the Past — Past Simple + Used to',
    'Chủ đề "Life in the Past" (Cuộc sống ngày xưa) dạy ta nói về thói quen trong quá khứ nay đã không còn. Cấu trúc trọng tâm là "used to" — vừa hay vào đề thi, vừa dễ nhầm với "be/get used to". Tuần này ta phân biệt rạch ròi.',
    [
      'Dùng "used to + V" để nói thói quen / trạng thái trong quá khứ đã chấm dứt.',
      'Phân biệt "used to do" với "be used to / get used to + V-ing".',
      'Kết hợp Past Simple để kể chuyện quá khứ mạch lạc.',
    ],
    [
      { h: 'Used to + V — Thói quen quá khứ' },
      { p: 'Công thức: S + used to + V (nguyên thể). Diễn tả thói quen hoặc trạng thái CÓ trong quá khứ nhưng nay KHÔNG còn nữa.' },
      { ul: [
        'Khẳng định: She used to play the piano.',
        'Phủ định: She didn\'t use to play (lưu ý: "use to", bỏ -d).',
        'Nghi vấn: Did she use to play? (cũng "use to").',
      ] },
      { h: 'Ý nghĩa hàm ẩn' },
      { p: '"I used to live in Hue" hàm ý: trước đây sống ở Huế, BÂY GIỜ không còn sống ở đó. Đó là điểm khác biệt cốt lõi so với hiện tại đơn.' },
      { h: 'PHÂN BIỆT: used to do vs be/get used to V-ing' },
      { ul: [
        'used to + V (nguyên thể) = đã từng (thói quen QUÁ KHỨ): I used to smoke.',
        'be used to + V-ing/N = đã QUEN với (hiện tại): I am used to getting up early.',
        'get used to + V-ing/N = đang DẦN QUEN: She is getting used to the new school.',
      ] },
      { h: 'Past Simple — kể chuyện quá khứ' },
      { p: 'Khi kể một chuỗi sự việc đã xảy ra và kết thúc, dùng Past Simple: "Long ago, people lived in small villages and grew rice."' },
      { h: 'Dấu hiệu thời gian quá khứ' },
      { ul: [
        'in the past, long ago, years ago, in the old days',
        'when I was young, in those days, back then',
      ] },
      { note: 'Lỗi kinh điển: viết "She didn\'t USED to..." — SAI. Sau "did/didn\'t" động từ về nguyên thể nên là "use to": "She didn\'t USE to play."' },
      { note: 'Với thói quen HIỆN TẠI, KHÔNG dùng "used to". Hãy dùng hiện tại đơn + trạng từ tần suất: "I usually get up at 6."' },
    ],
    [
      { q: 'Đặt câu: I / not / drink coffee / as a child. (dùng used to)', a: 'I didn\'t use to drink coffee as a child. — Phủ định "used to" → "didn\'t use to" (bỏ -d).' },
      { q: 'Phân biệt: "I used to live in Hanoi" và "I am used to living in Hanoi".', a: 'Câu 1: trước đây từng sống ở Hà Nội, nay không còn. Câu 2: tôi đã quen với việc sống ở Hà Nội (hiện tại). "used to + V" khác "be used to + V-ing".' },
      { q: 'Hoàn thành: "There ___ a cinema here, but it closed last year." (used to be)', a: '"used to be" — Trước đây từng có một rạp chiếu phim ở đây, nhưng năm ngoái nó đã đóng cửa.' },
    ]
  ),

  'S9TA-w08-quiz': L(
    'Wishes — Subjunctive Mood',
    'Câu ước (wish) thể hiện điều ta mong muốn trái với thực tế — một cấu trúc gần như chắc chắn xuất hiện ở đề thi vào 10. Tuần này ta học wish cho hiện tại, quá khứ, và wish cho tương lai (wish + would).',
    [
      'Dùng "wish + Past Simple" để ước về hiện tại không có thật.',
      'Dùng "wish + Past Perfect" để tiếc nuối về quá khứ.',
      'Dùng "wish + would/could" để mong muốn về tương lai / phàn nàn.',
    ],
    [
      { h: 'Wish — về HIỆN TẠI không có thật' },
      { p: 'Công thức: S + wish + (that) + S + Past Simple. Diễn tả mong muốn TRÁI với thực tế ở hiện tại.' },
      { ul: [
        'I wish I had more time. (Thực tế: tôi KHÔNG có nhiều thời gian.)',
        'I wish she were here. (Thực tế: cô ấy KHÔNG ở đây.)',
      ] },
      { h: 'Wish — tiếc nuối về QUÁ KHỨ' },
      { p: 'Công thức: S + wish + (that) + S + Past Perfect (had + V3). Diễn tả sự HỐI TIẾC về điều đã/không xảy ra trong quá khứ.' },
      { ul: [
        'I wish I had studied harder. (Thực tế: tôi đã KHÔNG học chăm hơn.)',
        'She wishes she hadn\'t said that. (Cô ấy ước đã không nói câu đó.)',
      ] },
      { h: 'Wish — mong muốn / phàn nàn về TƯƠNG LAI' },
      { p: 'Công thức: S + wish + (that) + S + would/could + V. Diễn tả mong người/việc thay đổi, hoặc phàn nàn.' },
      { ul: [
        'I wish it would stop raining. (Mong trời ngừng mưa.)',
        'I wish you would be quiet. (Phàn nàn: mong em im lặng.)',
      ] },
      { h: 'Quy tắc "were" cho mọi ngôi' },
      { p: 'Trong câu ước (và câu điều kiện loại 2), dùng "were" cho TẤT CẢ các ngôi trong văn trang trọng: "I wish I were rich", "He wishes he were taller".' },
      { h: 'If only — biến thể của wish' },
      { p: '"If only" dùng giống "wish" nhưng nhấn mạnh cảm xúc hơn: "If only I had known!" (Giá mà tôi biết!).' },
      { note: 'Lưu ý chia thì LÙI MỘT BẬC: ước hiện tại → quá khứ đơn; tiếc quá khứ → quá khứ hoàn thành. Đây là "subjunctive mood" (thức giả định).' },
      { note: '"wish + to + V" (I wish to speak to the manager) là cách nói TRANG TRỌNG nghĩa "muốn", khác hẳn cấu trúc câu ước ở trên.' },
    ],
    [
      { q: 'Diễn đạt bằng wish: "I want to be rich now."', a: 'I wish I were rich. — Ước hiện tại không có thật → wish + Past Simple; dùng "were" cho mọi ngôi.' },
      { q: 'Diễn đạt bằng wish: "I am sorry I didn\'t bring my umbrella."', a: 'I wish I had brought my umbrella. — Tiếc nuối quá khứ → wish + Past Perfect (had + V3).' },
      { q: 'Diễn đạt bằng wish: "Please stop making noise!" (phàn nàn)', a: 'I wish you would stop making noise. — Phàn nàn / mong thay đổi → wish + would + V.' },
    ]
  ),

  'S9TA-w09-quiz': L(
    'Teen Stress and Pressure — Vocabulary',
    'Tuổi teen nhiều áp lực: học hành, thi cử, bạn bè. Chủ đề "Teen Stress and Pressure" cung cấp vốn từ để nói về vấn đề và giải pháp của tuổi mới lớn — rất hữu ích cho phần viết đoạn và nói trong đề thi.',
    [
      'Nắm vốn từ về căng thẳng, áp lực và cảm xúc tuổi teen.',
      'Diễn đạt vấn đề và đề xuất giải pháp đối phó (cope with, overcome).',
      'Dùng các cụm động từ và collocation về cảm xúc.',
    ],
    [
      { h: 'Vocabulary — Stress & feelings' },
      { ul: [
        'stress /stres/ (n) — căng thẳng → stressed (adj), stressful (adj)',
        'pressure /ˈpreʃ.ər/ (n) — áp lực (academic pressure, peer pressure)',
        'anxiety /æŋˈzaɪ.ə.ti/ (n) — sự lo âu → anxious (adj)',
        'tension — sự căng thẳng; frustration — sự bực bội, nản chí',
        'self-confidence — sự tự tin; self-esteem — lòng tự trọng',
      ] },
      { h: 'Verbs — Đối phó & vượt qua' },
      { ul: [
        'cope with — đối phó, ứng phó (cope with stress)',
        'deal with — xử lý (deal with a problem)',
        'overcome — vượt qua (overcome difficulties)',
        'manage — kiểm soát, xoay xở (manage your time)',
        'relax / unwind — thư giãn; calm down — bình tĩnh lại',
      ] },
      { h: 'Collocations quan trọng' },
      { ul: [
        'be under pressure — chịu áp lực',
        'peer pressure — áp lực từ bạn bè đồng trang lứa',
        'feel stressed out — cảm thấy quá tải',
        'relieve / reduce stress — giảm căng thẳng',
      ] },
      { h: 'Mẫu câu nói về vấn đề & giải pháp' },
      { p: 'Nêu vấn đề: "Many teenagers suffer from stress because of..." Nêu giải pháp: "To cope with stress, you should / it is a good idea to..."' },
      { note: 'Phân biệt: "stressed" (cảm thấy căng thẳng — tả người) ≠ "stressful" (gây căng thẳng — tả việc/tình huống). "I feel stressed because the exam is stressful."' },
      { note: '"Anxiety" trọng âm rơi vào âm tiết thứ HAI /æŋˈzaɪ.ə.ti/. Tính từ "anxious" đọc /ˈæŋk.ʃəs/.' },
    ],
    [
      { q: 'Dịch: "I need to learn how to cope with stress."', a: 'Tôi cần học cách đối phó với căng thẳng. — "cope with" = đối phó với.' },
      { q: 'Điền tính từ đúng: "The final exam is very ___." (stressed / stressful)', a: '"stressful" — Kỳ thi GÂY ra căng thẳng nên dùng "stressful" (tả sự việc), không dùng "stressed" (tả người).' },
      { q: 'Tìm từ đồng nghĩa với "anxiety".', a: 'worry, nervousness, unease, tension. — Đều chỉ trạng thái lo lắng, bất an.' },
    ]
  ),

  'S9TA-w10-quiz': L(
    'Reported Speech — Statements',
    'Câu tường thuật (reported speech) là một trong những chủ điểm ngữ pháp được hỏi NHIỀU NHẤT ở đề thi vào 10. Tuần này ta xử lý câu trần thuật: lùi thì, đổi đại từ và đổi trạng từ chỉ thời gian/nơi chốn.',
    [
      'Biến câu trực tiếp thành câu tường thuật trần thuật.',
      'Áp dụng đúng quy tắc lùi thì (backshift).',
      'Đổi đại từ và trạng từ chỉ thời gian, nơi chốn cho phù hợp.',
    ],
    [
      { h: 'Câu tường thuật là gì?' },
      { p: 'Khi thuật lại lời người khác mà KHÔNG dùng dấu ngoặc kép, ta dùng reported speech. Câu chính thường bắt đầu bằng "said (that)" hoặc "told somebody (that)".' },
      { h: 'Quy tắc LÙI THÌ (Backshift)' },
      { ul: [
        'Present Simple → Past Simple',
        'Present Continuous → Past Continuous',
        'Present Perfect → Past Perfect',
        'Past Simple → Past Perfect',
        'will → would; can → could; may → might; must → had to',
      ] },
      { h: 'Đổi ĐẠI TỪ' },
      { ul: [
        'I → he/she; we → they; you → I/me (tùy ngữ cảnh)',
        'my → his/her; our → their; this → that; these → those',
      ] },
      { h: 'Đổi TRẠNG TỪ thời gian / nơi chốn' },
      { ul: [
        'now → then; today → that day; tonight → that night',
        'tomorrow → the next day / the following day',
        'yesterday → the day before / the previous day',
        'ago → before; here → there',
      ] },
      { h: 'say vs tell' },
      { p: '"say" KHÔNG có tân ngữ người ngay sau (He said that...). "tell" PHẢI có tân ngữ người (He told ME that...).' },
      { h: 'Khi nào KHÔNG lùi thì?' },
      { p: 'Nếu lời nói là CHÂN LÝ / sự thật hiển nhiên, hoặc động từ tường thuật ở hiện tại, ta có thể GIỮ nguyên thì: "He says the Earth is round."' },
      { note: 'Mẹo làm bài: làm tuần tự 3 bước — (1) lùi thì động từ, (2) đổi đại từ, (3) đổi trạng từ thời gian/nơi chốn. Bỏ sót bước nào là mất điểm.' },
      { note: 'Sau "told" bắt buộc có tân ngữ; nếu không có tân ngữ người thì phải dùng "said". Đây là lỗi bị trừ điểm rất phổ biến.' },
    ],
    [
      { q: 'Tường thuật: He said: "I am tired."', a: 'He said (that) he was tired. — Present Simple "am" → Past Simple "was"; "I" → "he".' },
      { q: 'Tường thuật: She said: "I will come tomorrow."', a: 'She said (that) she would come the next day. — "will" → "would"; "tomorrow" → "the next day".' },
      { q: 'Tường thuật: "I bought this book yesterday," he told me.', a: 'He told me (that) he had bought that book the day before. — Past Simple → Past Perfect; "this" → "that"; "yesterday" → "the day before".' },
    ]
  ),

  'S9TA-w11-quiz': L(
    'Reported Speech — Questions',
    'Tường thuật câu hỏi khó hơn câu trần thuật vì vừa phải lùi thì, vừa phải ĐỔI TRẬT TỰ TỪ về dạng câu khẳng định. Tuần này ta xử lý hai loại: câu hỏi Yes/No và câu hỏi Wh-.',
    [
      'Tường thuật câu hỏi Yes/No dùng "if / whether".',
      'Tường thuật câu hỏi Wh- giữ nguyên từ để hỏi.',
      'Đổi trật tự từ về dạng khẳng định và bỏ trợ động từ do/does/did.',
    ],
    [
      { h: 'Động từ tường thuật cho câu hỏi' },
      { p: 'Dùng "asked" (hỏi) hoặc "wanted to know / wondered". KHÔNG dùng "said" cho câu hỏi.' },
      { h: 'Câu hỏi Yes/No' },
      { p: 'Công thức: S + asked + (O) + IF/WHETHER + S + V (lùi thì, trật tự khẳng định).' },
      { ul: [
        '"Do you like coffee?" → He asked if I liked coffee.',
        '"Are you coming?" → She asked whether I was coming.',
      ] },
      { h: 'Câu hỏi Wh-' },
      { p: 'Công thức: S + asked + (O) + từ-hỏi (what/where/when...) + S + V (lùi thì, trật tự khẳng định).' },
      { ul: [
        '"Where do you live?" → He asked where I lived.',
        '"What time is it?" → She asked what time it was.',
      ] },
      { h: 'Ba thay đổi quan trọng' },
      { ul: [
        '1. Đổi TRẬT TỰ từ về dạng khẳng định: (do you like) → (you liked).',
        '2. BỎ trợ động từ do/does/did; động từ chính chia theo ngôi và lùi thì.',
        '3. BỎ dấu chấm hỏi (?) — câu tường thuật kết thúc bằng dấu chấm.',
      ] },
      { h: 'if hay whether?' },
      { p: 'Cả hai đều dùng được cho câu hỏi Yes/No. "Whether" trang trọng hơn và bắt buộc khi đi với "or not": "He asked whether or not I agreed."' },
      { note: 'Lỗi phổ biến: vẫn giữ trật tự câu hỏi sau khi tường thuật. SAI: "He asked where did I live." ĐÚNG: "He asked where I lived."' },
      { note: 'Lỗi nữa: quên bỏ dấu "?". Câu tường thuật là câu TRẦN THUẬT, kết thúc bằng dấu chấm, không phải dấu hỏi.' },
    ],
    [
      { q: 'Tường thuật: She asked: "Are you coming?"', a: 'She asked if/whether I was coming. — Yes/No question → dùng "if"; đổi trật tự về khẳng định; "are" → "was".' },
      { q: 'Tường thuật: He asked: "What time is it?"', a: 'He asked what time it was. — Wh-question giữ "what time"; đổi trật tự "is it" → "it was".' },
      { q: 'Tường thuật: "Where do you work?" she asked.', a: 'She asked where I worked. — Bỏ trợ động từ "do"; "work" chia theo ngôi và lùi thì → "worked".' },
    ]
  ),

  'S9TA-w12-quiz': L(
    'Lifelong Learning + Modal Verbs',
    'Chủ đề "Lifelong Learning" (Học tập suốt đời) đi cùng ôn tập động từ khuyết thiếu (modal verbs). Modal verbs diễn tả khả năng, sự cần thiết, lời khuyên, khả năng xảy ra — và xuất hiện ở mọi đề thi. Tuần này hệ thống lại toàn bộ.',
    [
      'Dùng đúng các modal verb chính theo nghĩa.',
      'Phân biệt các cặp dễ nhầm: must/have to, mustn\'t/don\'t have to.',
      'Tránh các lỗi ngữ pháp đặc trưng của modal verbs.',
    ],
    [
      { h: 'Quy tắc CHUNG của modal verbs' },
      { ul: [
        'Sau modal là V NGUYÊN THỂ, không "to": She can swim (không "to swim").',
        'Không thêm -s ở ngôi 3 số ít: He must go (không "musts").',
        'Phủ định: thêm "not" (cannot, mustn\'t, shouldn\'t).',
      ] },
      { h: 'Bảng các modal chính' },
      { ul: [
        'can / could — khả năng, xin phép',
        'must / have to — sự cần thiết, bắt buộc',
        'should / ought to — lời khuyên',
        'may / might — khả năng xảy ra, xin phép',
        'will / would — tương lai, lời mời / yêu cầu lịch sự',
      ] },
      { h: 'must vs have to' },
      { p: '"must" = nghĩa vụ do BẢN THÂN thấy cần (chủ quan). "have to" = nghĩa vụ do QUY ĐỊNH bên ngoài (khách quan). "I must finish this" (tôi tự thấy phải) vs "I have to wear a uniform" (trường bắt buộc).' },
      { h: 'mustn\'t vs don\'t have to' },
      { p: 'CỰC KỲ DỄ NHẦM: "mustn\'t" = CẤM (không được phép). "don\'t have to" = KHÔNG CẦN (không bắt buộc). "You mustn\'t cheat" (cấm gian lận) vs "You don\'t have to come" (không cần đến).' },
      { h: 'should / ought to — lời khuyên' },
      { p: 'Cả hai cùng nghĩa "nên". "ought to" trang trọng hơn và CÓ "to": "You ought to see a doctor."' },
      { h: 'Modal cho học tập suốt đời' },
      { p: 'Khi viết về lifelong learning, dùng modal để diễn đạt: "You should keep learning new skills", "We must adapt to changes", "Learning can open many doors".' },
      { note: 'Lỗi hay gặp: "He can to swim" — SAI, bỏ "to". "She musts go" — SAI, bỏ -s. Modal luôn đi với V nguyên thể trần.' },
    ],
    [
      { q: 'Chọn: You ___ wear a uniform at this school. (must / can)', a: '"must" — nghĩa vụ bắt buộc theo nội quy. (Cũng chấp nhận "have to".)' },
      { q: 'Phân biệt: "You mustn\'t leave" và "You don\'t have to leave".', a: 'Câu 1: em KHÔNG được phép rời đi (cấm). Câu 2: em KHÔNG cần phải rời đi (không bắt buộc, nhưng có thể). Hai nghĩa hoàn toàn khác nhau.' },
      { q: 'Chọn: "It ___ rain later, so bring an umbrella." (might / must)', a: '"might" — diễn tả KHẢ NĂNG xảy ra (có thể mưa), không phải sự chắc chắn hay bắt buộc.' },
    ]
  ),

  'S9TA-w13-quiz': L(
    'Tourism — Vocabulary + Reading',
    'Du lịch (Tourism) là chủ đề "ruột" của đề thi: từ vựng phong phú, dễ ra bài đọc và bài viết. Tuần này ta học vốn từ du lịch, các loại hình du lịch và cách bàn về lợi - hại của ngành du lịch.',
    [
      'Nắm vốn từ về du lịch: accommodation, destination, sightseeing...',
      'Phân biệt các loại hình du lịch (eco-tourism, package tour...).',
      'Bàn luận lợi ích và tác hại của du lịch.',
    ],
    [
      { h: 'Vocabulary — Tourism cơ bản' },
      { ul: [
        'tourism /ˈtʊə.rɪ.zəm/ (n) — ngành du lịch; tourist (n) — khách du lịch',
        'destination /ˌdes.tɪˈneɪ.ʃən/ — điểm đến',
        'accommodation /əˌkɒm.əˈdeɪ.ʃən/ — chỗ ở (danh từ KHÔNG đếm được)',
        'sightseeing /ˈsaɪtˌsiː.ɪŋ/ — tham quan ngắm cảnh',
        'attraction /əˈtræk.ʃən/ — điểm thu hút khách',
        'souvenir /ˌsuː.vənˈɪər/ — quà lưu niệm',
      ] },
      { h: 'Loại hình du lịch' },
      { ul: [
        'eco-tourism — du lịch sinh thái',
        'package tour — tour trọn gói',
        'adventure tourism — du lịch mạo hiểm',
        'cultural tourism — du lịch văn hóa',
        'backpacking — du lịch bụi',
      ] },
      { h: 'Collocations về du lịch' },
      { ul: [
        'book a hotel / a flight — đặt khách sạn / vé máy bay',
        'go on a tour / a trip — đi tour / đi chuyến',
        'check in / check out — nhận / trả phòng',
        'a tourist attraction — điểm tham quan du lịch',
      ] },
      { h: 'Lợi ích và tác hại (cho bài viết)' },
      { ul: [
        'Lợi ích: creates jobs, boosts the economy, promotes culture.',
        'Tác hại: causes pollution, damages the environment, overcrowding.',
      ] },
      { note: '"Accommodation" là danh từ KHÔNG đếm được — KHÔNG nói "accommodations" (Anh-Anh). Cũng lưu ý chính tả: hai "c", hai "m".' },
      { note: 'Phân biệt "travel" (n, không đếm được, nói chung) với "trip / journey / tour" (một chuyến cụ thể). "I love travel" nhưng "I went on a trip to Hue".' },
    ],
    [
      { q: 'Giải thích "eco-tourism" bằng tiếng Anh.', a: 'Eco-tourism is tourism that focuses on natural environments and aims to protect them. — Nhấn mạnh "natural environments" và "protect".' },
      { q: 'Dịch: "Vietnam has many attractive tourist destinations."', a: 'Việt Nam có nhiều điểm đến du lịch hấp dẫn. — "tourist destinations" = điểm đến du lịch.' },
      { q: 'Nêu một lợi ích và một tác hại của du lịch bằng tiếng Anh.', a: 'Benefit: Tourism creates jobs and boosts the local economy. Drawback: It can cause pollution and overcrowding at popular sites.' },
    ]
  ),

  'S9TA-w14-quiz': L(
    'Mid-term Review — Grammar Summary',
    'Tuần giữa kỳ, cô và các em hệ thống lại tất cả ngữ pháp đã học từ đầu năm: các thì, mệnh đề trạng ngữ, so sánh, used to, wish, reported speech, modals. Đây là dịp rà soát điểm yếu trước khi vào nửa sau.',
    [
      'Hệ thống lại các chủ điểm ngữ pháp đã học.',
      'Nhận diện dạng bài và áp dụng đúng cấu trúc.',
      'Xác định điểm yếu cần ôn tập riêng.',
    ],
    [
      { h: 'Các thì đã học' },
      { ul: [
        'Present Simple — thói quen, sự thật (every day, usually).',
        'Past Simple — việc đã hoàn thành (yesterday, ago).',
        'Present Perfect — nối quá khứ với hiện tại (since, for, already).',
        'Past Continuous — hành động đang diễn ra trong quá khứ (while, as).',
      ] },
      { h: 'Mệnh đề trạng ngữ' },
      { p: 'Liên từ thời gian (when, while), lý do (because, since), nhượng bộ (although), điều kiện (if, unless). Nhớ dấu phẩy khi mệnh đề phụ đứng trước.' },
      { h: 'So sánh' },
      { p: 'Ngắn: -er/-est; dài: more/most; bất quy tắc good→better→best. Cấu trúc nâng cao: "The more..., the more...".' },
      { h: 'Used to / Wish' },
      { ul: [
        '"used to + V" = thói quen quá khứ đã chấm dứt.',
        '"wish + Past Simple" = ước hiện tại; "wish + Past Perfect" = tiếc quá khứ.',
      ] },
      { h: 'Reported Speech' },
      { p: 'Lùi thì + đổi đại từ + đổi trạng từ thời gian/nơi chốn. Câu hỏi: thêm if/whether (Yes/No) hoặc từ-hỏi (Wh-), đổi trật tự về khẳng định.' },
      { h: 'Modal Verbs' },
      { p: 'can (khả năng), must (bắt buộc), should (nên), might (có thể), have to (bắt buộc khách quan). Modal + V nguyên thể, không -s, không "to".' },
      { note: 'Chiến lược ôn: làm một đề tổng hợp, đánh dấu câu sai, gom theo CHỦ ĐIỂM. Chủ điểm nào sai nhiều thì ôn lại lý thuyết chủ điểm đó.' },
    ],
    [
      { q: 'Hoàn thành: "If I had time, I ___ help you." (will / would)', a: '"would" — Câu điều kiện loại 2 (điều kiện không có thật ở hiện tại): If + Past Simple, would + V.' },
      { q: 'Chọn dạng so sánh: "Hanoi is ___ Da Nang." (bigger than / more big than)', a: '"bigger than" — "big" là tính từ ngắn nên dùng -er + than, không dùng "more big".' },
      { q: 'Sửa lỗi: "He said me that he was busy."', a: '"He told me that he was busy." — "say" không có tân ngữ người ngay sau; phải dùng "tell + somebody".' },
    ]
  ),

  'S9TA-w15-quiz': L(
    'Vietnam — Around the World',
    'Chủ đề về Việt Nam (văn hóa, địa lý, lịch sử) rất hay vào bài đọc của đề thi. Tuần này ta học vốn từ để giới thiệu đất nước, con người, di sản và đặc sản Việt Nam với bạn bè quốc tế.',
    [
      'Nắm vốn từ về văn hóa, địa lý, di sản Việt Nam.',
      'Giới thiệu đất nước và con người Việt Nam bằng tiếng Anh.',
      'Dùng đúng số liệu và tên riêng (di sản UNESCO).',
    ],
    [
      { h: 'Vocabulary — Culture & heritage' },
      { ul: [
        'heritage /ˈher.ɪ.tɪdʒ/ — di sản; heritage site — khu di sản',
        'pagoda /pəˈɡəʊ.də/ — chùa (kiến trúc Phật giáo nhiều tầng)',
        'temple /ˈtem.pəl/ — đền, miếu',
        'festival /ˈfes.tɪ.vəl/ — lễ hội',
        'ethnic group /ˈeθ.nɪk ɡruːp/ — dân tộc, nhóm sắc tộc',
        'specialty / speciality — đặc sản',
      ] },
      { h: 'Geography & people' },
      { ul: [
        'landscape — phong cảnh; scenery — cảnh quan thiên nhiên',
        'tradition — truyền thống; custom — phong tục',
        'hospitable — hiếu khách; diverse — đa dạng',
      ] },
      { h: 'Số liệu quan trọng cần nhớ' },
      { ul: [
        'Việt Nam có 54 dân tộc (54 ethnic groups): người Kinh và 53 dân tộc thiểu số.',
        'Nhiều di sản UNESCO: Ha Long Bay, Hoi An, Hue Imperial City, My Son, Phong Nha-Ke Bang.',
      ] },
      { h: 'Mẫu câu giới thiệu' },
      { p: '"Vietnam is famous for its...", "One of the most popular festivals is...", "Vietnamese people are well-known for being hospitable."' },
      { note: 'Tên riêng địa danh viết HOA và thường KHÔNG có "the": "Hoi An", "Ha Long Bay". Nhưng "the Mekong (River)", "the Red River" có "the" vì là tên SÔNG.' },
      { note: 'Phân biệt "pagoda" (chùa) và "temple" (đền). Chùa thờ Phật; đền thờ thần thánh, anh hùng dân tộc.' },
    ],
    [
      { q: 'Hoàn thành: "Vietnam has ___ ethnic groups."', a: '54 ethnic groups — gồm người Kinh và 53 dân tộc thiểu số.' },
      { q: 'Kể tên 2 di sản UNESCO của Việt Nam bằng tiếng Anh.', a: 'Ha Long Bay and Hoi An Ancient Town (hoặc Hue Imperial City, My Son Sanctuary, Phong Nha-Ke Bang National Park...).' },
      { q: 'Dịch: "Vietnamese people are friendly and hospitable."', a: 'Người Việt Nam thân thiện và hiếu khách. — "hospitable" = hiếu khách.' },
    ]
  ),

  'S9TA-w16-quiz': L(
    'Passive Voice',
    'Câu bị động (passive voice) dùng khi ta quan tâm đến HÀNH ĐỘNG hơn là người thực hiện, hoặc không biết ai làm. Đây là chủ điểm gần như chắc chắn xuất hiện trong phần viết lại câu ở đề thi vào 10.',
    [
      'Tạo câu bị động ở các thì chính.',
      'Chuyển đổi chủ động ↔ bị động đúng quy trình.',
      'Biết khi nào nên dùng bị động.',
    ],
    [
      { h: 'Công thức tổng quát' },
      { p: 'Câu bị động: S (tân ngữ của câu chủ động) + BE + V3/V-ed (+ by + tác nhân). "Be" chia theo thì của câu chủ động.' },
      { h: 'Bị động ở các thì' },
      { ul: [
        'Present Simple: am/is/are + V3 — "The letter is written by him."',
        'Past Simple: was/were + V3 — "The house was built in 1990."',
        'Present Perfect: has/have been + V3 — "The work has been done."',
        'Present Continuous: am/is/are being + V3 — "The road is being repaired."',
        'Future: will be + V3 — "It will be finished soon."',
        'Modal: modal + be + V3 — "It must be done."',
      ] },
      { h: 'Quy trình chuyển CHỦ ĐỘNG → BỊ ĐỘNG' },
      { ul: [
        '1. Tân ngữ câu chủ động → chủ ngữ câu bị động.',
        '2. Chia "be" đúng THÌ và đúng SỐ (theo chủ ngữ mới).',
        '3. Động từ chính → dạng V3/V-ed.',
        '4. Chủ ngữ câu chủ động → "by + tác nhân" (có thể lược bỏ).',
      ] },
      { h: 'Khi nào lược bỏ "by..."?' },
      { p: 'Bỏ "by + tác nhân" khi tác nhân không rõ, không quan trọng, hoặc là người chung chung (people, they, someone): "English is spoken here." (không cần "by people").' },
      { h: 'Khi nào DÙNG bị động?' },
      { p: 'Khi hành động quan trọng hơn người làm, hoặc khi muốn câu văn khách quan, trang trọng (hay dùng trong văn khoa học, tin tức).' },
      { note: 'Chỉ NGOẠI động từ (có tân ngữ) mới chuyển sang bị động được. Nội động từ (go, come, arrive, happen) KHÔNG có dạng bị động.' },
      { note: 'Lưu ý hợp số: chủ ngữ mới quyết định "is/are", "was/were". "Two houses WERE built" (số nhiều) chứ không phải "was".' },
    ],
    [
      { q: 'Chuyển bị động: "They built this house in 1990."', a: 'This house was built in 1990 (by them). — Past Simple → "was + built"; "by them" có thể lược bỏ.' },
      { q: 'Chuyển bị động: "She has finished the project."', a: 'The project has been finished (by her). — Present Perfect → "has been + V3".' },
      { q: 'Chuyển bị động: "People speak English all over the world."', a: 'English is spoken all over the world. — Present Simple → "is spoken"; lược bỏ "by people" vì là chủ ngữ chung chung.' },
    ]
  ),

  'S9TA-w17-quiz': L(
    'Conditional Sentences — Type 1, 2, 3',
    'Câu điều kiện là chủ điểm "nặng ký" nhất ở đề thi vào 10. Tuần này ta học trọn vẹn ba loại câu điều kiện cùng câu điều kiện hỗn hợp (mixed conditionals) — phân biệt rõ ý nghĩa và công thức của từng loại.',
    [
      'Phân biệt và dùng đúng câu điều kiện loại 1, 2, 3.',
      'Hiểu ý nghĩa: có thật / không có thật ở hiện tại / không có thật ở quá khứ.',
      'Nhận biết câu điều kiện hỗn hợp.',
    ],
    [
      { h: 'Loại 1 — Điều kiện CÓ THẬT (hiện tại/tương lai)' },
      { p: 'Công thức: If + S + Present Simple, S + will + V. Diễn tả điều CÓ KHẢ NĂNG xảy ra.' },
      { ul: ['If it rains, I will stay at home.'] },
      { h: 'Loại 2 — KHÔNG có thật ở HIỆN TẠI' },
      { p: 'Công thức: If + S + Past Simple, S + would + V. Diễn tả điều TRÁI với thực tế hiện tại / khó xảy ra.' },
      { ul: ['If I had money, I would buy a car. (Thực tế: tôi không có tiền.)'] },
      { h: 'Loại 3 — KHÔNG có thật ở QUÁ KHỨ' },
      { p: 'Công thức: If + S + Past Perfect, S + would have + V3. Diễn tả điều TRÁI với những gì đã xảy ra (tiếc nuối).' },
      { ul: ['If I had studied, I would have passed. (Thực tế: tôi đã không học và đã trượt.)'] },
      { h: 'Bảng so sánh nhanh' },
      { ul: [
        'Loại 1: có thật, tương lai → will.',
        'Loại 2: không thật, hiện tại → would + V.',
        'Loại 3: không thật, quá khứ → would have + V3.',
      ] },
      { h: 'Câu điều kiện HỖN HỢP' },
      { p: 'Điều kiện quá khứ → kết quả hiện tại: "If I had studied medicine, I would be a doctor now." (Quá khứ: đã không học y → Hiện tại: giờ không phải bác sĩ.)' },
      { h: 'Quy tắc "were" và dấu phẩy' },
      { ul: [
        'Loại 2 dùng "were" cho mọi ngôi: "If I WERE you, I would...".',
        'Có dấu phẩy khi mệnh đề "if" đứng TRƯỚC; không phẩy khi nó đứng sau.',
      ] },
      { note: 'Có thể thay "if...not" bằng "unless": "Unless you hurry, you will be late." (= If you don\'t hurry...).' },
      { note: 'Lỗi kinh điển: dùng "will/would" ngay sau "if". SAI: "If it will rain..." ĐÚNG: "If it rains...". Sau "if" KHÔNG bao giờ có will/would.' },
    ],
    [
      { q: 'Điền: "If I ___ you, I would tell the truth." (am / were)', a: '"were" — Câu điều kiện loại 2 dùng "were" cho mọi ngôi (kể cả "I").' },
      { q: 'Loại 3: "If I had known, I ___ (call) you."', a: 'would have called — Loại 3: If + Past Perfect, would have + V3.' },
      { q: 'Loại 1: "If it ___ (rain) tomorrow, we ___ (cancel) the trip."', a: 'If it rains tomorrow, we will cancel the trip. — Loại 1: If + Present Simple, will + V.' },
    ]
  ),

  'S9TA-w18-quiz': L(
    'First Semester Review',
    'Tuần cuối học kỳ I, ta tổng kết toàn diện: tất cả chủ đề từ vựng và chủ điểm ngữ pháp đã học. Mục tiêu là củng cố nền tảng vững chắc để bước vào học kỳ II và giai đoạn ôn thi vào 10.',
    [
      'Tổng hợp toàn bộ chủ đề và ngữ pháp học kỳ I.',
      'Nhận diện và sửa các lỗi sai thường gặp.',
      'Lập kế hoạch ôn tập cho học kỳ II.',
    ],
    [
      { h: 'Chủ đề từ vựng HK1' },
      { ul: [
        'Local environment (làng nghề, di sản).',
        'City life (đời sống đô thị).',
        'Life in the past (cuộc sống xưa).',
        'Teen stress, lifelong learning, tourism, Vietnam.',
      ] },
      { h: 'Chủ điểm ngữ pháp HK1' },
      { ul: [
        'Phrasal verbs; mệnh đề trạng ngữ (adverbial clauses).',
        'So sánh + lượng từ (comparison + quantifiers).',
        'used to; wish; reported speech (statements, questions).',
        'Modal verbs; passive voice; conditional sentences.',
      ] },
      { h: 'Lỗi sai thường gặp — Reported speech' },
      { p: 'Quên lùi thì; quên đổi trạng từ thời gian (now→then); dùng "say" thay vì "tell" khi có tân ngữ người.' },
      { h: 'Lỗi sai thường gặp — Conditionals' },
      { p: 'Dùng "will/would" ngay sau "if"; nhầm công thức loại 2 với loại 3.' },
      { h: 'Lỗi sai thường gặp — Passive' },
      { p: 'Quên chia "be" đúng thì; quên đổi động từ sang V3; chuyển bị động cho nội động từ.' },
      { h: 'Chiến lược ôn HK2' },
      { p: 'Mỗi tuần ôn 1-2 chủ điểm yếu, làm bài tập có giải thích, ghi sổ lỗi sai (error log) và xem lại trước khi thi.' },
      { note: 'Nền tảng từ vựng + ngữ pháp HK1 vững sẽ giúp các em học HK2 nhẹ nhàng và tự tin bước vào kỳ thi vào 10.' },
    ],
    [
      { q: 'Lỗi thường gặp khi làm reported speech là gì?', a: 'Quên lùi thì động từ, quên đổi trạng từ thời gian/nơi chốn (now→then, here→there), và dùng "said" thay vì "told" khi có tân ngữ người.' },
      { q: 'Cấu trúc "I wish I had known" tương đương loại câu điều kiện nào?', a: 'Tương tự câu điều kiện loại 3 (tiếc nuối quá khứ): cùng dùng Past Perfect để diễn tả điều trái với thực tế đã xảy ra.' },
      { q: 'Sửa lỗi: "If I will have time, I will help you."', a: '"If I have time, I will help you." — Sau "if" dùng Present Simple, KHÔNG dùng "will".' },
    ]
  ),

  'S9TA-w19-quiz': L(
    'English in the World — Reading',
    'Tiếng Anh là ngôn ngữ toàn cầu. Chủ đề "English in the World" rèn kỹ năng đọc các bài dài hơn về lịch sử và vai trò của tiếng Anh, đồng thời mở rộng vốn từ về ngôn ngữ và giao tiếp quốc tế.',
    [
      'Đọc hiểu bài dài về ngôn ngữ và vai trò của tiếng Anh.',
      'Phân biệt ý chính và ý phụ trợ.',
      'Nắm vốn từ về ngôn ngữ và giao tiếp toàn cầu.',
    ],
    [
      { h: 'Key ideas — Tiếng Anh toàn cầu' },
      { ul: [
        'Tiếng Anh được khoảng 1,5 tỷ người sử dụng trên thế giới.',
        'Là "lingua franca" — ngôn ngữ chung của kinh doanh, khoa học, Internet.',
        'Có nhiều biến thể: British, American, Australian, Indian English.',
      ] },
      { h: 'Vocabulary — Ngôn ngữ' },
      { ul: [
        'lingua franca — ngôn ngữ giao tiếp chung',
        'native speaker — người bản ngữ; fluent — trôi chảy',
        'bilingual — song ngữ; mother tongue — tiếng mẹ đẻ',
        'global / international — toàn cầu / quốc tế',
      ] },
      { h: 'Phân biệt ý chính và ý phụ trợ' },
      { p: 'Ý chính (main idea) thường nằm ở câu chủ đề (đầu đoạn). Ý phụ trợ (supporting details) là ví dụ, số liệu, lời giải thích đứng sau.' },
      { h: 'Kỹ năng đọc bài dài' },
      { ul: [
        'Đọc tiêu đề và câu đầu mỗi đoạn để dựng "bản đồ" bài.',
        'Gạch chân từ khóa và từ nối (however, therefore...).',
        'Không dừng quá lâu ở từ mới — đoán nghĩa, đọc tiếp.',
      ] },
      { h: 'Vì sao học tiếng Anh?' },
      { p: 'Tiếp cận tri thức toàn cầu, mở rộng cơ hội nghề nghiệp, giao tiếp quốc tế, du học. Đây là những ý hay dùng cho phần viết/nói.' },
      { note: 'Phân biệt "first language / mother tongue" (tiếng mẹ đẻ) với "second/foreign language" (ngoại ngữ). Với người Việt, tiếng Anh là ngoại ngữ (foreign language).' },
    ],
    [
      { q: 'Giải thích "lingua franca" bằng tiếng Anh.', a: 'A lingua franca is a common language used by people who speak different native languages to communicate with each other.' },
      { q: 'Nêu hai lý do nên học tiếng Anh.', a: 'It gives access to global knowledge and improves career opportunities; it also enables international communication. — Có thể thêm: du học, công nghệ.' },
      { q: 'Trong câu hỏi đọc hiểu, "main idea" thường nằm ở đâu trong đoạn?', a: 'Thường ở câu chủ đề (topic sentence) đầu đoạn; phần còn lại là các ý phụ trợ (supporting details).' },
    ]
  ),

  'S9TA-w20-quiz': L(
    'Career Choice — Vocabulary',
    'Lớp 9 là lúc bắt đầu nghĩ về định hướng nghề nghiệp. Chủ đề "Career Choice" cung cấp vốn từ về nghề nghiệp, kỹ năng, bằng cấp — rất hữu ích cho phần viết về ước mơ và định hướng tương lai.',
    [
      'Nắm vốn từ về nghề nghiệp và con đường sự nghiệp.',
      'Phân biệt các từ dễ nhầm: career / job / occupation / profession.',
      'Diễn đạt định hướng nghề nghiệp tương lai.',
    ],
    [
      { h: 'Vocabulary — Career cơ bản' },
      { ul: [
        'career /kəˈrɪər/ — sự nghiệp (cả quá trình làm nghề)',
        'job /dʒɒb/ — công việc (vị trí cụ thể)',
        'occupation /ˌɒk.jʊˈpeɪ.ʃən/ — nghề nghiệp (trang trọng)',
        'profession /prəˈfeʃ.ən/ — nghề chuyên môn (cần đào tạo cao)',
        'qualification — bằng cấp, trình độ chuyên môn',
        'experience — kinh nghiệm; skill — kỹ năng',
      ] },
      { h: 'Common professions' },
      { ul: [
        'engineer, doctor, teacher, lawyer, scientist',
        'programmer, designer, accountant, architect, nurse',
      ] },
      { h: 'Phân biệt career vs job' },
      { p: '"career" = cả hành trình nghề nghiệp lâu dài (a career in medicine). "job" = một công việc / vị trí cụ thể (a part-time job). Một người có thể đổi nhiều "job" trong một "career".' },
      { h: 'Kỹ năng & phẩm chất nghề nghiệp' },
      { ul: [
        'soft skills — kỹ năng mềm (teamwork, communication)',
        'hard skills — kỹ năng chuyên môn',
        'hardworking, creative, responsible, ambitious — chăm chỉ, sáng tạo, có trách nhiệm, tham vọng',
      ] },
      { h: 'Mẫu câu định hướng nghề nghiệp' },
      { p: '"I want to become a/an...", "In the future, I would like to work as a...", "To pursue this career, I need to..."' },
      { note: 'Cấu trúc nghề nghiệp: dùng "a/an + nghề" sau "be/become/work as": "She is AN engineer", "I want to be A teacher". Đừng quên mạo từ.' },
      { note: 'Một số tên nghề tạo từ động từ + đuôi: teach→teacher, write→writer, act→actor, manage→manager. Học theo nhóm đuôi để nhớ.' },
    ],
    [
      { q: 'Phân biệt "career" và "job".', a: '"career" = sự nghiệp, cả hành trình nghề nghiệp lâu dài; "job" = một công việc/vị trí cụ thể. Ví dụ: a career in teaching gồm nhiều jobs khác nhau.' },
      { q: 'Dịch: "I want to be a software engineer."', a: 'Tôi muốn trở thành kỹ sư phần mềm. — Lưu ý mạo từ "a" trước "software engineer".' },
      { q: 'Hoàn thành: "To become a doctor, you need good ___ and many years of study." (qualifications)', a: 'qualifications — bằng cấp/trình độ chuyên môn. Để làm bác sĩ cần bằng cấp tốt và nhiều năm học.' },
    ]
  ),

  'S9TA-w21-quiz': L(
    'Reported Speech — Commands and Requests',
    'Phần cuối của câu tường thuật: tường thuật MỆNH LỆNH, YÊU CẦU và LỜI KHUYÊN. Khác với câu trần thuật và câu hỏi, loại này dùng cấu trúc động từ nguyên thể (to + V) và chọn động từ tường thuật theo ý định người nói.',
    [
      'Tường thuật câu mệnh lệnh và yêu cầu bằng cấu trúc "to + V".',
      'Chọn đúng động từ tường thuật theo ý định (tell/ask/advise/warn...).',
      'Xử lý câu mệnh lệnh phủ định bằng "not to + V".',
    ],
    [
      { h: 'Cấu trúc tổng quát' },
      { p: 'S + động-từ-tường-thuật + O + (NOT) + to + V (nguyên thể). Không cần lùi thì vì động từ ở dạng nguyên thể.' },
      { h: 'Mệnh lệnh khẳng định' },
      { ul: [
        '"Sit down," she said. → She told him to sit down.',
        '"Open the window, please," he said. → He asked me to open the window.',
      ] },
      { h: 'Mệnh lệnh phủ định' },
      { ul: [
        '"Don\'t go!" she said. → She told him NOT to go.',
        '"Don\'t be late," he said. → He told us not to be late.',
      ] },
      { h: 'Chọn động từ tường thuật theo Ý ĐỊNH' },
      { ul: [
        'told — ra lệnh, bảo (mệnh lệnh)',
        'asked — yêu cầu, nhờ (kèm "please")',
        'advised — khuyên ("You should...")',
        'warned — cảnh báo ("Be careful...", "Don\'t...")',
        'reminded — nhắc nhở; ordered — ra lệnh (mạnh)',
        'invited — mời; begged — van nài',
      ] },
      { h: 'Lưu ý tân ngữ' },
      { p: 'Các động từ này (tell, ask, advise, warn...) PHẢI có tân ngữ người ngay sau: "He advised ME to rest" (không "He advised to rest").' },
      { h: 'Cấu trúc "suggest" (đặc biệt)' },
      { p: '"suggest" KHÔNG dùng "to + V". Dùng "suggest + V-ing" hoặc "suggest that S should + V": "He suggested going out / He suggested that we should go out."' },
      { note: 'Lỗi hay gặp: đặt "not" sai chỗ. ĐÚNG: "told him NOT to go". SAI: "told him to not go" / "didn\'t tell him to go" (đổi nghĩa).' },
    ],
    [
      { q: 'Tường thuật: "Please open the window," he said.', a: 'He asked me to open the window. — "please" báo hiệu yêu cầu → dùng "asked + O + to + V".' },
      { q: 'Tường thuật: "You should study harder," she said.', a: 'She advised me to study harder. — Lời khuyên "should" → dùng "advised + O + to + V".' },
      { q: 'Tường thuật: "Don\'t touch that wire!" he warned.', a: 'He warned me not to touch that wire. — Cảnh báo phủ định → "warned + O + NOT to + V".' },
    ]
  ),

  'S9TA-w22-quiz': L(
    'Relative Clauses',
    'Mệnh đề quan hệ (relative clauses) dùng để bổ nghĩa cho danh từ, giúp nối hai câu thành một câu gọn và sang. Đây là chủ điểm rất hay vào phần viết lại câu và viết đoạn ở đề thi vào 10.',
    [
      'Dùng đúng đại từ quan hệ: who, which, that, whose, whom, where, when.',
      'Phân biệt mệnh đề quan hệ xác định và không xác định.',
      'Biết khi nào có thể lược bỏ đại từ quan hệ.',
    ],
    [
      { h: 'Đại từ quan hệ (Relative pronouns)' },
      { ul: [
        'who — cho NGƯỜI (làm chủ ngữ)',
        'whom — cho NGƯỜI (làm tân ngữ, trang trọng)',
        'which — cho VẬT / CON VẬT',
        'that — cho cả người và vật (chỉ trong mệnh đề xác định)',
        'whose — chỉ sự sở hữu (của người/vật)',
      ] },
      { h: 'Trạng từ quan hệ (Relative adverbs)' },
      { ul: [
        'where — chỉ NƠI CHỐN (the place where...)',
        'when — chỉ THỜI GIAN (the day when...)',
        'why — chỉ LÝ DO (the reason why...)',
      ] },
      { h: 'Mệnh đề XÁC ĐỊNH (Defining)' },
      { p: 'Cung cấp thông tin THIẾT YẾU để xác định danh từ. KHÔNG có dấu phẩy. "The girl who lives next door is nice."' },
      { h: 'Mệnh đề KHÔNG XÁC ĐỊNH (Non-defining)' },
      { p: 'Cung cấp thông tin THÊM (bỏ đi vẫn hiểu). CÓ dấu phẩy. "My sister, who lives in Hanoi, is a teacher."' },
      { h: 'Quy tắc quan trọng về "that"' },
      { p: '"that" CHỈ dùng trong mệnh đề xác định, KHÔNG dùng trong mệnh đề không xác định (sau dấu phẩy). SAI: "My mother, that is a doctor,..."' },
      { h: 'Khi nào lược bỏ đại từ quan hệ?' },
      { p: 'Có thể bỏ who/which/that khi nó làm TÂN NGỮ trong mệnh đề xác định: "The book (that) I bought is good." Không bỏ được khi nó làm chủ ngữ.' },
      { note: 'whose dùng cho cả người và vật để chỉ sở hữu: "the woman whose son...", "a house whose roof...".' },
      { note: 'Lưu ý dấu phẩy: thông tin thêm (tên riêng, người/vật duy nhất) → mệnh đề KHÔNG xác định, có phẩy hai đầu.' },
    ],
    [
      { q: 'Nối câu: "This is the book. I bought it yesterday."', a: 'This is the book (that/which) I bought yesterday. — "that/which" làm tân ngữ nên có thể lược bỏ.' },
      { q: 'Điền: "She is the woman ___ husband is a doctor."', a: '"whose" — chỉ sự sở hữu (chồng của người phụ nữ ấy).' },
      { q: 'Thêm dấu phẩy nếu cần: "My father who is 50 years old still works."', a: 'My father, who is 50 years old, still works. — "My father" là người duy nhất → mệnh đề KHÔNG xác định, cần dấu phẩy hai đầu.' },
    ]
  ),

  'S9TA-w23-quiz': L(
    'Natural Disasters — Vocabulary',
    'Thiên tai và biến đổi khí hậu là vấn đề toàn cầu nóng bỏng, và Việt Nam là một trong những nước chịu ảnh hưởng nặng nhất. Tuần này ta học vốn từ để mô tả thiên tai và bàn về biến đổi khí hậu.',
    [
      'Nắm vốn từ về thiên tai và biến đổi khí hậu.',
      'Mô tả nguyên nhân, hậu quả của thiên tai.',
      'Bàn về tác động của biến đổi khí hậu với Việt Nam.',
    ],
    [
      { h: 'Vocabulary — Natural disasters' },
      { ul: [
        'flood /flʌd/ (n/v) — lũ lụt; flooding — ngập lụt',
        'drought /draʊt/ — hạn hán (chữ "gh" câm)',
        'earthquake /ˈɜːθ.kweɪk/ — động đất',
        'typhoon /taɪˈfuːn/ — bão (vùng Thái Bình Dương); storm — bão',
        'landslide — sạt lở đất; tsunami — sóng thần',
        'volcanic eruption — núi lửa phun trào',
      ] },
      { h: 'Climate change' },
      { ul: [
        'climate change — biến đổi khí hậu',
        'global warming — sự nóng lên toàn cầu',
        'greenhouse gas — khí nhà kính',
        'sea level rise — nước biển dâng',
        'extreme weather — thời tiết cực đoan',
      ] },
      { h: 'Verbs & collocations' },
      { ul: [
        'cause damage — gây thiệt hại; destroy — phá hủy',
        'suffer from — chịu đựng (a disaster)',
        'evacuate — sơ tán; rescue — cứu hộ',
        'be affected by — bị ảnh hưởng bởi',
      ] },
      { h: 'Việt Nam và biến đổi khí hậu' },
      { p: 'Việt Nam thường xuyên chịu lũ lụt, bão, hạn hán. Đồng bằng sông Cửu Long bị đe dọa bởi nước biển dâng. Đây là ý hay dùng cho bài viết về môi trường.' },
      { note: 'Phân biệt "weather" (thời tiết — ngắn hạn, từng ngày) và "climate" (khí hậu — dài hạn, đặc trưng cả vùng). Biến đổi là "climate change", không phải "weather change".' },
      { note: '"typhoon", "hurricane", "cyclone" đều là bão lớn nhưng khác vùng địa lý: typhoon (Tây Bắc Thái Bình Dương), hurricane (Đại Tây Dương), cyclone (Ấn Độ Dương).' },
    ],
    [
      { q: 'Giải thích "global warming" bằng tiếng Anh.', a: 'Global warming is the long-term rise in the Earth\'s average temperature, caused mainly by human activities such as burning fossil fuels.' },
      { q: 'Dịch: "Vietnam often suffers from floods and typhoons."', a: 'Việt Nam thường chịu lũ lụt và bão. — "suffer from" = chịu đựng, hứng chịu.' },
      { q: 'Phân biệt "weather" và "climate".', a: '"weather" là thời tiết ngắn hạn (hôm nay nắng/mưa); "climate" là khí hậu dài hạn, đặc trưng của cả một vùng. Vì vậy nói "climate change", không nói "weather change".' },
    ]
  ),

  'S9TA-w24-quiz': L(
    'Linking Words and Connectors',
    'Từ nối (linking words / connectors) là "chất keo" làm bài viết mạch lạc, logic và "lên điểm" phần viết. Tuần này ta hệ thống các nhóm từ nối theo chức năng và cách dùng dấu câu đi kèm.',
    [
      'Phân loại và dùng đúng các từ nối theo chức năng.',
      'Đa dạng hóa từ nối để tránh lặp.',
      'Dùng đúng dấu câu (phẩy, chấm phẩy) với từng loại từ nối.',
    ],
    [
      { h: 'Nhóm BỔ SUNG (Addition)' },
      { ul: [
        'and, also — và, cũng',
        'in addition, furthermore, moreover, besides — hơn nữa, ngoài ra',
      ] },
      { h: 'Nhóm TƯƠNG PHẢN (Contrast)' },
      { ul: [
        'but — nhưng; however, nevertheless — tuy nhiên',
        'although / though + mệnh đề; despite / in spite of + N/V-ing',
        'on the other hand — mặt khác',
      ] },
      { h: 'Nhóm NGUYÊN NHÂN (Reason)' },
      { ul: [
        'because / since / as + mệnh đề',
        'because of / due to + N/V-ing',
      ] },
      { h: 'Nhóm KẾT QUẢ (Result)' },
      { ul: [
        'so — vì vậy (nối hai mệnh đề)',
        'therefore, thus, as a result, consequently — do đó, kết quả là',
      ] },
      { h: 'Nhóm VÍ DỤ (Example)' },
      { ul: [
        'for example, for instance — ví dụ',
        'such as + N — như là',
      ] },
      { h: 'Lưu ý dấu câu' },
      { p: 'Từ nối kiểu "however, therefore, moreover" thường đứng đầu câu mới và theo sau là dấu phẩy: "..., she was tired. However, she finished the work." Hoặc dùng dấu chấm phẩy trước: "...; however, ...".' },
      { note: 'Phân biệt "although" (theo sau là mệnh đề S+V) và "despite/in spite of" (theo sau là danh từ/V-ing): "Although it rained..." vs "Despite the rain...".' },
      { note: 'Phân biệt "because" (+ mệnh đề) và "because of" (+ danh từ): "because it was cold" vs "because of the cold weather".' },
    ],
    [
      { q: 'Chọn từ nối: "She was tired, ___ she went home." (because / so)', a: '"so" — diễn tả KẾT QUẢ (mệt → về nhà). "because" sẽ đảo ngược logic (nguyên nhân đứng sau).' },
      { q: 'Chuyển dùng "despite": "Although it was raining, we went out."', a: 'Despite the rain, we went out. — "despite/in spite of" theo sau là danh từ (the rain) hoặc V-ing, không phải mệnh đề.' },
      { q: 'Nêu hai từ nối dùng để cho ví dụ.', a: 'for example / for instance (đứng đầu câu, theo sau là mệnh đề); such as (đứng giữa câu, theo sau là danh từ).' },
    ]
  ),

  'S9TA-w25-quiz': L(
    'Adjective and Adverb Formation',
    'Tạo từ (word formation) là chủ điểm thường gặp trong bài cloze và bài chia dạng từ ở đề thi. Tuần này ta học cách tạo tính từ và trạng từ từ danh từ/động từ qua các hậu tố thông dụng.',
    [
      'Tạo tính từ bằng các hậu tố thông dụng (-ful, -less, -ous, -able, -ive).',
      'Tạo trạng từ từ tính từ (chủ yếu thêm -ly).',
      'Phân biệt vai trò và vị trí của tính từ và trạng từ.',
    ],
    [
      { h: 'Hậu tố tạo TÍNH TỪ' },
      { ul: [
        '-ful: helpful, useful, careful, beautiful (đầy, có)',
        '-less: useless, careless, hopeless (không có)',
        '-ous: famous, dangerous, curious',
        '-able / -ible: comfortable, suitable, responsible',
        '-ive: active, creative, attractive',
        '-al: natural, traditional, national; -y: rainy, sunny, cloudy',
      ] },
      { h: 'Cặp -ful và -less' },
      { p: 'Cùng gốc danh từ nhưng nghĩa trái: "care" → careful (cẩn thận) / careless (cẩu thả); "use" → useful (hữu ích) / useless (vô dụng).' },
      { h: 'Tạo TRẠNG TỪ từ tính từ' },
      { ul: [
        'Phần lớn: adj + -ly → quick → quickly, careful → carefully.',
        'Tính từ tận cùng -y: đổi y thành i + ly → happy → happily, easy → easily.',
        'Tính từ tận cùng -le: bỏ -e + y → simple → simply, terrible → terribly.',
        'Tính từ tận cùng -ic: + ally → basic → basically, automatic → automatically.',
      ] },
      { h: 'Trạng từ BẤT QUY TẮC' },
      { ul: [
        'good → well (NOT "goodly")',
        'fast → fast; hard → hard (cẩn thận: "hardly" nghĩa "hầu như không")',
        'early → early; late → late ("lately" nghĩa "gần đây")',
      ] },
      { h: 'Phân biệt vai trò' },
      { p: 'TÍNH TỪ bổ nghĩa cho DANH TỪ (a careful driver) hoặc đứng sau "be" (He is careful). TRẠNG TỪ bổ nghĩa cho ĐỘNG TỪ (He drives carefully).' },
      { note: 'Cẩn thận bẫy: "hard" (chăm chỉ) ≠ "hardly" (hầu như không); "late" (muộn) ≠ "lately" (gần đây). Đề thi rất hay đánh vào hai cặp này.' },
      { note: 'Một số từ vừa là tính từ vừa là trạng từ, không thêm -ly: fast, hard, early, late, daily.' },
    ],
    [
      { q: 'Trạng từ của "careful" là gì?', a: 'carefully — thêm -ly vào tính từ. (Tính từ tận cùng -ful → -fully).' },
      { q: 'Tạo tính từ từ "danger".', a: 'dangerous — thêm hậu tố -ous. (danger → dangerous = nguy hiểm).' },
      { q: 'Phân biệt "hard" và "hardly" trong câu.', a: '"hard" = chăm chỉ/cứng ("He works hard"). "hardly" = hầu như không ("He hardly works" = anh ấy hầu như không làm việc). Nghĩa trái ngược nhau!' },
    ]
  ),

  'S9TA-w26-quiz': L(
    'Writing — Email and Formal Letter',
    'Viết email và thư là kỹ năng thực dụng và thường có trong phần viết. Tuần này ta học cấu trúc, văn phong trang trọng / thân mật và các mẫu câu chuẩn để viết email mạch lạc, đúng giọng điệu.',
    [
      'Nắm cấu trúc chuẩn của một email/thư.',
      'Phân biệt văn phong trang trọng (formal) và thân mật (informal).',
      'Dùng đúng các mẫu câu mở đầu và kết thúc.',
    ],
    [
      { h: 'Cấu trúc email/thư' },
      { ul: [
        'Greeting (Lời chào): "Dear...,"',
        'Opening (Mở đầu): nêu lý do viết.',
        'Body (Thân): các đoạn rõ ràng, mỗi đoạn một ý.',
        'Closing (Kết): câu kết + lời chào tạm biệt.',
        'Sign-off (Ký tên).',
      ] },
      { h: 'TRANG TRỌNG (Formal)' },
      { ul: [
        'Greeting: "Dear Mr/Ms [Last name]," hoặc "Dear Sir/Madam,"',
        'Opening: "I am writing to inform/inquire/apply..."',
        'Closing: "I look forward to hearing from you."',
        'Sign-off: "Yours sincerely," (biết tên) / "Yours faithfully," (Dear Sir/Madam).',
      ] },
      { h: 'THÂN MẬT (Informal)' },
      { ul: [
        'Greeting: "Hi/Hello [First name]," "Dear [First name],"',
        'Opening: "How are you?", "Thanks for your last email."',
        'Closing: "Hope to hear from you soon.", "Write back soon."',
        'Sign-off: "Best wishes," "Cheers," "Love," "Take care,"',
      ] },
      { h: 'Khác biệt then chốt về văn phong' },
      { p: 'Formal: KHÔNG viết tắt (do not, I am...), từ vựng trang trọng, không tiếng lóng. Informal: được viết tắt (don\'t, I\'m), giọng thoải mái, dùng được câu cảm thán.' },
      { note: 'Quy tắc ký tên: "Yours sincerely" khi mở đầu bằng tên người ("Dear Mr Nam"); "Yours faithfully" khi mở đầu bằng "Dear Sir/Madam" (không biết tên).' },
      { note: 'Mỗi đoạn thân bài chỉ nên trình bày MỘT ý chính, có câu chủ đề và câu giải thích/ví dụ. Đoạn văn rõ ràng giúp giám khảo dễ chấm.' },
    ],
    [
      { q: 'Lời chào trang trọng khi không biết tên người nhận là gì?', a: '"Dear Sir/Madam," — và kết thư bằng "Yours faithfully,".' },
      { q: 'Một sign-off phù hợp cho email thân mật?', a: '"Best wishes," / "Cheers," / "Take care," / "Love," — Đây là các cách kết thân mật.' },
      { q: 'Vì sao trong thư trang trọng không nên viết "I\'m writing to..."?', a: 'Vì văn phong trang trọng KHÔNG dùng dạng viết tắt; phải viết đầy đủ "I am writing to...".' },
    ]
  ),

  'S9TA-w27-quiz': L(
    'Writing — Discursive Essay',
    'Bài luận nghị luận (discursive essay) trình bày và bàn luận một vấn đề có hai mặt. Đây là dạng viết nâng cao, giúp các em luyện tư duy phản biện và cách trình bày quan điểm cân bằng, rất có lợi cho phần viết đoạn ở đề thi.',
    [
      'Nắm cấu trúc bài luận nghị luận.',
      'Trình bày lập luận ủng hộ và phản đối có dẫn chứng.',
      'Dùng các cụm từ chuyển ý và kết luận hiệu quả.',
    ],
    [
      { h: 'Cấu trúc bài luận' },
      { ul: [
        'Introduction (Mở bài): giới thiệu vấn đề + câu luận đề (thesis statement).',
        'Body 1: lập luận ỦNG HỘ + dẫn chứng.',
        'Body 2: lập luận PHẢN ĐỐI + dẫn chứng.',
        'Conclusion (Kết bài): tóm tắt cân bằng + quan điểm cá nhân.',
      ] },
      { h: 'Cụm từ trình bày HAI MẶT' },
      { ul: [
        'On the one hand... On the other hand... — Một mặt... mặt khác...',
        'Some people believe that... However, others argue that...',
        'There are both advantages and disadvantages...',
      ] },
      { h: 'Cụm từ BỔ SUNG lập luận' },
      { ul: [
        'Firstly, Secondly, Finally — Thứ nhất, thứ hai, cuối cùng',
        'Furthermore, In addition, Moreover — Hơn nữa, ngoài ra',
      ] },
      { h: 'Cụm từ KẾT LUẬN' },
      { ul: [
        'In conclusion, To sum up, All in all — Tóm lại, nhìn chung',
        'In my opinion, I personally believe — Theo tôi',
      ] },
      { h: 'Cách viết câu luận đề' },
      { p: 'Câu luận đề (thesis) nêu rõ vấn đề và hướng bàn luận: "This essay will discuss the advantages and disadvantages of...".' },
      { h: 'Độ dài và đa dạng cấu trúc' },
      { p: 'Ở lớp 9, hướng tới khoảng 150-200 từ. Dùng đa dạng cấu trúc (mệnh đề quan hệ, bị động, so sánh) để bài viết phong phú và ghi điểm.' },
      { note: 'Văn nghị luận cần KHÁCH QUAN ở phần thân (trình bày cả hai mặt), chỉ nêu quan điểm cá nhân ở phần kết. Tránh dùng từ quá cảm tính ở thân bài.' },
    ],
    [
      { q: 'Nêu một cụm từ để THÊM một lập luận.', a: 'Furthermore / In addition / Moreover / Also — đều dùng để bổ sung ý.' },
      { q: 'Nêu một cụm từ để KẾT LUẬN bài luận.', a: 'In conclusion / To sum up / All in all / In summary — dùng mở đầu đoạn kết.' },
      { q: 'Cặp cụm từ nào dùng để trình bày hai mặt của vấn đề?', a: '"On the one hand..., on the other hand..." — Một mặt trình bày ưu điểm, mặt khác trình bày nhược điểm.' },
    ]
  ),

  'S9TA-w28-quiz': L(
    'Tense Review — All Major Tenses',
    'Củng cố TẤT CẢ các thì quan trọng — nền tảng để xử lý mọi câu chia động từ trong đề thi. Tuần này ta hệ thống công thức, cách dùng và dấu hiệu nhận biết của từng thì để chọn thì chính xác.',
    [
      'Nhận diện thì qua dấu hiệu thời gian (time markers).',
      'Dùng đúng thì theo ngữ cảnh.',
      'Phân biệt các cặp thì dễ nhầm.',
    ],
    [
      { h: 'Các thì HIỆN TẠI' },
      { ul: [
        'Present Simple: thói quen, sự thật. Dấu hiệu: every day, usually, often.',
        'Present Continuous: đang xảy ra. Dấu hiệu: now, at the moment, Look!',
        'Present Perfect: nối quá khứ với hiện tại. Dấu hiệu: since, for, already, yet, ever, just.',
      ] },
      { h: 'Các thì QUÁ KHỨ' },
      { ul: [
        'Past Simple: việc đã hoàn thành. Dấu hiệu: yesterday, last week, ago, in 2010.',
        'Past Continuous: đang diễn ra trong quá khứ. Dấu hiệu: while, as, at 8 p.m. yesterday.',
        'Past Perfect: việc xảy ra TRƯỚC một mốc quá khứ khác. Dấu hiệu: before, after, by the time, had + V3.',
      ] },
      { h: 'Các thì TƯƠNG LAI' },
      { ul: [
        'Future Simple (will): dự đoán, quyết định tức thì. Dấu hiệu: tomorrow, next..., I think.',
        'Be going to: kế hoạch đã định / dự đoán có căn cứ.',
      ] },
      { h: 'Phân biệt cặp dễ nhầm' },
      { ul: [
        'Present Perfect vs Past Simple: "I have lived here for 5 years" (vẫn còn ở) vs "I lived here in 2010" (đã rời đi).',
        'Past Simple vs Past Continuous: "When she called, I was studying" (việc đang diễn ra bị cắt ngang).',
      ] },
      { h: 'Quy trình chọn thì' },
      { p: 'Bước 1: tìm dấu hiệu thời gian. Bước 2: xác định hành động có đang diễn ra / đã hoàn thành / nối với hiện tại không. Bước 3: chia động từ.' },
      { note: 'Dấu hiệu thời gian là manh mối MẠNH NHẤT. "for/since" → present perfect; "ago/yesterday" → past simple; "while" → past continuous.' },
    ],
    [
      { q: 'Xác định thì: "I have lived here for 5 years."', a: 'Present Perfect — hành động bắt đầu trong quá khứ và CÒN tiếp tục đến hiện tại; dấu hiệu "for".' },
      { q: 'Xác định thì: "I was studying when she called."', a: 'Past Continuous (was studying) + Past Simple (called) — một hành động đang diễn ra thì bị một hành động khác cắt ngang.' },
      { q: 'Chia đúng: "By the time I arrived, the film ___ (start)."', a: '"had started" — hành động "start" xảy ra TRƯỚC "arrived" (mốc quá khứ) → Past Perfect.' },
    ]
  ),

  'S9TA-w29-quiz': L(
    'Cloze Test Strategy',
    'Bài điền khuyết (cloze test) kiểm tra tổng hợp từ vựng, ngữ pháp và đọc hiểu — một phần điểm quan trọng của đề thi vào 10. Tuần này ta học chiến lược làm bài và các điểm thường bị "gài bẫy".',
    [
      'Áp dụng quy trình làm bài cloze test hiệu quả.',
      'Dùng manh mối ngữ pháp và ngữ cảnh để chọn đáp án.',
      'Nắm các điểm hay bị kiểm tra: giới từ, mạo từ, collocation.',
    ],
    [
      { h: 'Quy trình làm bài cloze' },
      { ul: [
        '1. Đọc lướt CẢ bài một lượt để nắm chủ đề và mạch ý.',
        '2. Với mỗi chỗ trống, xác định LOẠI TỪ cần điền (danh/động/tính/giới từ).',
        '3. Dùng quy tắc ngữ pháp: thì, hợp số chủ-vị, mạo từ.',
        '4. Dùng manh mối ngữ cảnh từ câu trước/sau.',
        '5. Đọc lại toàn bài kiểm tra tính trôi chảy.',
      ] },
      { h: 'Điểm hay kiểm tra — Giới từ' },
      { ul: [
        'interested IN, good AT, afraid OF, fond OF',
        'depend ON, belong TO, listen TO, look AT',
      ] },
      { h: 'Điểm hay kiểm tra — Mạo từ' },
      { p: '"a/an" (lần đầu nhắc, số ít); "the" (đã xác định, duy nhất); "không mạo từ" (danh từ số nhiều/không đếm được nói chung).' },
      { h: 'Điểm hay kiểm tra — Collocation' },
      { ul: [
        'make a decision, do homework, take a photo',
        'heavy rain, strong wind, fast food',
      ] },
      { h: 'Điểm hay kiểm tra — Từ nối & đại từ' },
      { p: 'Chỗ trống đầu câu thường là từ nối (however, therefore); chỗ trống chỉ người/vật đã nhắc thường là đại từ (it, they, who...).' },
      { note: 'Loại trừ là chiến thuật vàng: gạch bỏ các phương án sai ngữ pháp trước (sai thì, sai loại từ), rồi chọn trong số còn lại.' },
      { note: 'Cụm collocation phải HỌC THUỘC vì không suy luận được. Ghi sổ các cụm "động từ + giới từ", "tính từ + giới từ" và ôn thường xuyên.' },
    ],
    [
      { q: 'Điền giới từ: "She is interested ___ music."', a: '"in" — collocation cố định "interested IN something".' },
      { q: 'Điền giới từ: "He is good ___ English."', a: '"at" — collocation "good AT something" (giỏi về cái gì).' },
      { q: 'Chiến thuật nào hữu ích nhất khi không chắc đáp án cloze?', a: 'Phương pháp loại trừ: loại bỏ các phương án sai ngữ pháp (sai thì, sai loại từ, sai giới từ) trước, rồi chọn trong số còn lại theo ngữ cảnh.' },
    ]
  ),

  'S9TA-w30-quiz': L(
    'Sentence Transformation',
    'Viết lại câu (sentence transformation) là phần "kinh điển" của đề thi vào 10: cho một câu, viết lại sao cho NGHĨA KHÔNG ĐỔI nhưng dùng cấu trúc khác. Tuần này ta hệ thống các mẫu biến đổi thường gặp.',
    [
      'Viết lại câu giữ nguyên nghĩa với cấu trúc khác.',
      'Thuần thục các mẫu biến đổi phổ biến.',
      'Kiểm tra tính tương đương về nghĩa sau khi biến đổi.',
    ],
    [
      { h: 'Các mẫu biến đổi thường gặp' },
      { ul: [
        'Chủ động ↔ Bị động',
        'Trực tiếp ↔ Tường thuật',
        'Câu điều kiện (đổi giữa các loại / dùng unless)',
        'although/though ↔ despite/in spite of',
      ] },
      { h: 'Mẫu so sánh' },
      { ul: [
        '"too...to" ↔ "so...that": "too young to drive" = "so young that he can\'t drive".',
        '"enough...to": "old enough to vote".',
        'so sánh hơn ↔ so sánh ngang bằng: "A is taller than B" = "B is not as tall as A".',
      ] },
      { h: 'Mẫu với "It is..."' },
      { ul: [
        '"It is + adj + to + V" ↔ "V-ing + be + adj": "It is easy to learn" = "Learning is easy".',
        '"It takes + time + to V": "It takes me an hour to do this".',
      ] },
      { h: 'Mẫu nhấn mạnh & gợi ý' },
      { ul: [
        '"Let\'s..." ↔ "Why don\'t we...?" ↔ "How about + V-ing?" ↔ "Shall we...?"',
        '"This is the first time..." + Present Perfect: "This is the first time I have been here".',
      ] },
      { h: 'Quy trình làm bài' },
      { p: 'Bước 1: đọc kỹ câu gốc, xác định nghĩa. Bước 2: nhận diện cấu trúc đích (từ gợi ý cho sẵn). Bước 3: viết lại. Bước 4: ĐỐI CHIẾU nghĩa hai câu phải giống hệt.' },
      { note: 'Luôn kiểm tra THÌ và CHỦ NGỮ sau khi viết lại. Một lỗi nhỏ về thì cũng làm mất điểm dù cấu trúc đúng.' },
      { note: 'Sau "despite/in spite of" là DANH TỪ hoặc V-ing, không phải mệnh đề: "despite the rain" / "despite being tired".' },
    ],
    [
      { q: 'Viết lại với "Despite": "Although it was cold, we went out."', a: 'Despite the cold (weather), we went out. — "despite + N"; chuyển mệnh đề "it was cold" thành cụm danh từ.' },
      { q: 'Viết lại với "so...that": "He is too young to drive."', a: 'He is so young that he can\'t drive. — "too + adj + to + V" = "so + adj + that + S + can\'t + V".' },
      { q: 'Viết lại bị động: "Someone has stolen my bike."', a: 'My bike has been stolen. — Present Perfect bị động: "has been + V3"; lược bỏ "by someone".' },
    ]
  ),

  'S9TA-w31-quiz': L(
    'Exam Practice Test 1',
    'Bắt đầu giai đoạn luyện đề. Đề mô phỏng số 1 giúp các em làm quen với cấu trúc đề thi vào 10 và rèn kỹ năng phân bổ thời gian. Tuần này ta nắm rõ cấu trúc đề và chiến thuật làm bài tổng thể.',
    [
      'Nắm cấu trúc đề thi vào 10 môn Tiếng Anh.',
      'Hoàn thành một đề mô phỏng trong thời gian quy định.',
      'Áp dụng chiến thuật phân bổ thời gian và xử lý từng phần.',
    ],
    [
      { h: 'Cấu trúc đề thi (tham khảo Hà Nội)' },
      { ul: [
        'Phonetics: 4-5 câu về phát âm và trọng âm.',
        'Grammar/Vocabulary: ~10-15 câu trắc nghiệm.',
        'Reading: 1-2 bài đọc hiểu.',
        'Cloze test: 1 đoạn điền khuyết 5-10 chỗ.',
        'Writing: viết lại câu + viết đoạn ngắn.',
      ] },
      { h: 'Chiến thuật phân bổ thời gian' },
      { p: 'Tổng ~60 phút. Trắc nghiệm: ~1 phút/câu. Đọc hiểu: ~10-12 phút. Cloze: ~8 phút. Viết: dành đủ thời gian cuối cùng. Để lại 5 phút cuối kiểm tra.' },
      { h: 'Thứ tự làm bài thông minh' },
      { ul: [
        'Làm phần DỄ và CHẮC trước (phonetics, grammar quen thuộc).',
        'Đánh dấu câu khó để quay lại sau.',
        'KHÔNG sa lầy quá lâu vào một câu.',
      ] },
      { h: 'Mẹo cho phần đọc hiểu' },
      { p: 'Đọc câu hỏi TRƯỚC, rồi quét/lướt tìm thông tin. Với câu từ vựng trong bài, đọc cả câu chứa từ để đoán nghĩa.' },
      { h: 'Mẹo cho phần viết' },
      { p: 'Viết lại câu: bám sát từ gợi ý cho sẵn, kiểm tra thì và nghĩa. Viết đoạn: có câu mở đoạn, 2-3 ý chính, câu kết.' },
      { note: 'Với trắc nghiệm, KHÔNG bỏ trống câu nào — đề thi vào 10 thường không trừ điểm câu sai, nên hãy đoán có cơ sở.' },
    ],
    [
      { q: 'Mẹo quản lý thời gian khi làm đề là gì?', a: 'Làm câu dễ và chắc trước, đánh dấu câu khó để quay lại sau, không sa lầy quá lâu vào một câu, để 5 phút cuối kiểm tra.' },
      { q: 'Mẹo làm phần đọc hiểu hiệu quả?', a: 'Đọc câu hỏi trước rồi mới đọc bài; dùng scanning tìm chi tiết, skimming nắm ý chính; với từ mới, đoán nghĩa qua ngữ cảnh.' },
      { q: 'Có nên bỏ trống câu trắc nghiệm không chắc đáp án?', a: 'Không — vì thường không bị trừ điểm câu sai, nên hãy loại trừ phương án sai rồi đoán có cơ sở.' },
    ]
  ),

  'S9TA-w32-quiz': L(
    'Exam Practice Test 2 + Phonetics Review',
    'Đề mô phỏng số 2 tập trung vào ngữ âm (phonetics) — phần dễ ăn điểm nếu nắm quy tắc, nhưng dễ mất điểm nếu học vẹt. Tuần này ta hệ thống quy tắc trọng âm và cách phát âm đuôi -s, -ed.',
    [
      'Nắm các quy tắc trọng âm cơ bản.',
      'Phát âm đúng đuôi -s/-es và -ed.',
      'Nhận diện âm câm và các cặp âm dễ nhầm.',
    ],
    [
      { h: 'Quy tắc TRỌNG ÂM cơ bản' },
      { ul: [
        'Danh từ/tính từ 2 âm tiết: thường trọng âm âm tiết ĐẦU (TAble, HAPpy).',
        'Động từ 2 âm tiết: thường trọng âm âm tiết SAU (beGIN, reLAX).',
        'Từ có đuôi -tion, -sion, -ic, -ical: trọng âm rơi vào âm tiết TRƯỚC đuôi (eduCAtion, eLECtric).',
        'Từ có đuôi -ee, -eer, -ese, -ette: trọng âm rơi vào CHÍNH đuôi đó (engiNEER, JapanESE).',
      ] },
      { h: 'Phát âm đuôi -s / -es' },
      { ul: [
        '/s/ — sau âm vô thanh /p, t, k, f, θ/: maps, cats, books.',
        '/z/ — sau âm hữu thanh và nguyên âm: dogs, plays, bees.',
        '/ɪz/ — sau âm /s, z, ʃ, ʒ, tʃ, dʒ/: buses, watches, boxes.',
      ] },
      { h: 'Phát âm đuôi -ed' },
      { ul: [
        '/t/ — sau âm vô thanh (trừ /t/): worked, stopped, watched.',
        '/d/ — sau âm hữu thanh và nguyên âm (trừ /d/): played, lived, opened.',
        '/ɪd/ — sau /t/ và /d/: wanted, needed, decided.',
      ] },
      { h: 'Âm CÂM thường gặp' },
      { ul: [
        'b câm: climb, comb, lamb; k câm: know, knife, knee.',
        'h câm: hour, honest; w câm: write, wrong; gh câm: high, light.',
      ] },
      { h: 'Cặp âm dễ nhầm' },
      { p: 'Phân biệt /iː/ (sheep) và /ɪ/ (ship); /æ/ (cat) và /ʌ/ (cut); /θ/ (think) và /ð/ (this).' },
      { note: 'Mẹo đuôi -ed: chỉ có hai trường hợp đọc /ɪd/ là sau /t/ và /d/. Các trường hợp còn lại chỉ cần nhớ "vô thanh → /t/, hữu thanh → /d/".' },
    ],
    [
      { q: 'Trọng âm của "education" rơi vào âm tiết nào?', a: '/ˌedʒ.uˈkeɪ.ʃən/ — trọng âm rơi vào âm tiết thứ BA (ngay trước đuôi -tion).' },
      { q: 'Đuôi -ed trong "asked" đọc thế nào?', a: '/t/ — vì sau âm vô thanh /k/. "asked" = /ɑːskt/.' },
      { q: 'Đuôi -s trong "watches" đọc thế nào?', a: '/ɪz/ — vì sau âm /tʃ/. "watches" = /ˈwɒtʃ.ɪz/.' },
    ]
  ),

  'S9TA-w33-quiz': L(
    'Exam Practice Test 3 + Common Mistakes',
    'Đề mô phỏng số 3 tập trung vào việc TRÁNH LỖI SAI — phần giúp gỡ điểm hiệu quả nhất. Tuần này ta tổng hợp các lỗi học sinh hay mắc và cách phát hiện, sửa chữa chúng.',
    [
      'Nhận diện các lỗi sai phổ biến.',
      'Áp dụng kỹ thuật phát hiện và sửa lỗi.',
      'Lập sổ lỗi sai cá nhân để ôn tập.',
    ],
    [
      { h: 'Lỗi về THÌ động từ' },
      { p: 'Chia sai thì theo dấu hiệu thời gian; quên hợp thì trong câu điều kiện và câu tường thuật.' },
      { h: 'Lỗi về HỢP SỐ chủ-vị (Subject-Verb Agreement)' },
      { ul: [
        'Chủ ngữ số ít → động từ thêm -s: "He goes" (không "He go").',
        'Danh từ không đếm được → động từ số ít: "The news is...".',
      ] },
      { h: 'Lỗi về GIỚI TỪ' },
      { p: 'Dùng sai giới từ trong collocation: "interested IN" (không "interested ON"), "good AT" (không "good IN").' },
      { h: 'Lỗi về MẠO TỪ (a/an/the)' },
      { ul: [
        'Quên mạo từ trước nghề nghiệp: "She is A doctor".',
        'Dùng "a" trước nguyên âm: "an apple", "an hour" (h câm).',
      ] },
      { h: 'Lỗi về DẠNG TỪ (word form)' },
      { p: 'Nhầm danh từ/động từ/tính từ/trạng từ: "He drives careful" → "carefully" (trạng từ bổ nghĩa cho động từ).' },
      { h: 'Lỗi về TỪ DỄ NHẦM' },
      { ul: [
        'much / many (đếm được vs không đếm được)',
        'few / little; its / it\'s; their / there / they\'re',
      ] },
      { note: 'Hãy lập SỔ LỖI SAI (error log): ghi lại mỗi lỗi mình mắc, câu đúng và quy tắc liên quan. Ôn sổ này trước mỗi kỳ thi để tránh lặp lại.' },
    ],
    [
      { q: 'Sửa lỗi: "He don\'t like coffee."', a: '"He doesn\'t like coffee." — Chủ ngữ ngôi 3 số ít (He) cần "doesn\'t", không phải "don\'t".' },
      { q: 'Sửa lỗi: "I went to home after school."', a: '"I went home after school." — "home" trong nghĩa "về nhà" không có giới từ "to".' },
      { q: 'Sửa lỗi: "She speaks English very good."', a: '"She speaks English very well." — Cần TRẠNG TỪ "well" để bổ nghĩa cho động từ "speaks", không dùng tính từ "good".' },
    ]
  ),

  'S9TA-w34-quiz': L(
    'Final Review — Vocabulary List',
    'Tổng ôn từ vựng theo CHỦ ĐỀ và HỌ TỪ (word families). Đây là cách ôn hiệu quả nhất trước kỳ thi: nhớ từ theo cụm chủ đề và biết biến đổi một gốc từ thành nhiều dạng.',
    [
      'Ôn lại từ vựng theo các chủ đề lớn của năm học.',
      'Nắm các họ từ (word families) thông dụng.',
      'Vận dụng word families vào bài chia dạng từ.',
    ],
    [
      { h: 'Các chủ đề từ vựng trọng tâm' },
      { ul: [
        'Environment & sustainability (môi trường, thiên tai, biến đổi khí hậu)',
        'Education & lifelong learning (giáo dục, học tập suốt đời)',
        'Tourism & Vietnam (du lịch, văn hóa, di sản)',
        'Career & work (nghề nghiệp); Teen life (áp lực tuổi teen)',
      ] },
      { h: 'Họ từ là gì?' },
      { p: 'Một gốc từ có thể tạo nhiều dạng: động từ, danh từ, tính từ, trạng từ. Nắm họ từ giúp làm bài chia dạng từ (word form) và cloze test.' },
      { h: 'Ví dụ họ từ' },
      { ul: [
        'educate (v) → education (n) → educational (adj) → educationally (adv)',
        'create (v) → creation/creativity (n) → creative (adj) → creatively (adv)',
        'succeed (v) → success (n) → successful (adj) → successfully (adv)',
        'pollute (v) → pollution (n) → polluted (adj)',
      ] },
      { h: 'Hậu tố tạo danh từ thường gặp' },
      { ul: [
        '-tion/-sion: education, decision; -ment: development, government',
        '-ness: happiness, kindness; -ity: ability, creativity',
        '-er/-or: teacher, actor (người); -ist: scientist, artist',
      ] },
      { h: 'Mẹo học từ vựng' },
      { p: 'Học từ theo CHỦ ĐỀ (cụm) và theo HỌ TỪ. Ghi mỗi từ kèm một câu ví dụ. Ôn lại theo chu kỳ (cách quãng) để nhớ lâu.' },
      { note: 'Khi gặp bài chia dạng từ, hãy xác định chỗ trống cần LOẠI TỪ nào: sau mạo từ/tính từ → danh từ; sau "be"/trước danh từ → tính từ; bổ nghĩa động từ → trạng từ.' },
    ],
    [
      { q: 'Nêu họ từ của "create".', a: 'create (v), creation/creativity (n), creator (n), creative (adj), creatively (adv).' },
      { q: 'Nêu họ từ của "succeed".', a: 'succeed (v), success (n), successful (adj), successfully (adv), unsuccessful (adj trái nghĩa).' },
      { q: 'Chia dạng từ: "The teacher praised her ___." (create → ?)', a: '"creativity" — sau tính từ sở hữu "her" cần một DANH TỪ; "creativity" = sự sáng tạo.' },
    ]
  ),

  'S9TA-w35-quiz': L(
    'Final Exam Preparation',
    'Tuần cuối cùng của hành trình lớp 9! Cô tổng hợp những mẹo và lời dặn cho ngày thi vào 10: chuẩn bị trước ngày thi, chiến thuật trong phòng thi, và cách giữ tâm lý vững vàng. Các em đã nỗ lực cả năm — hãy tin vào bản thân!',
    [
      'Chuẩn bị tốt về kiến thức và tinh thần trước ngày thi.',
      'Áp dụng chiến thuật làm bài trong phòng thi.',
      'Giữ tâm lý bình tĩnh và tự tin.',
    ],
    [
      { h: 'Ngày TRƯỚC khi thi' },
      { ul: [
        'Ôn nhanh các chủ điểm ngữ pháp chính (KHÔNG học dồn kiến thức mới).',
        'Xem lại sổ lỗi sai cá nhân.',
        'Chuẩn bị đầy đủ dụng cụ: bút, thẻ dự thi, giấy tờ.',
        'Ngủ đủ giấc, ăn uống nhẹ nhàng.',
      ] },
      { h: 'Trong PHÒNG THI' },
      { ul: [
        'Đến sớm 30 phút để ổn định tâm lý.',
        'Đọc kỹ TẤT CẢ hướng dẫn trước khi làm.',
        'Quản lý thời gian: ~1 phút/câu trắc nghiệm.',
        'Làm câu dễ trước, đánh dấu câu khó quay lại sau.',
      ] },
      { h: 'Chiến thuật với câu khó' },
      { p: 'Khi không chắc: LOẠI TRỪ các phương án sai rõ ràng trước, rồi đoán có cơ sở. KHÔNG bỏ trống câu nào (vì thường không trừ điểm câu sai).' },
      { h: 'Chiến thuật phần viết' },
      { p: 'Viết lại câu: bám từ gợi ý, kiểm tra thì và nghĩa. Viết đoạn: lập dàn ý nhanh (mở-thân-kết), viết câu đơn giản nhưng ĐÚNG hơn là câu phức nhưng sai.' },
      { h: 'Giữ tâm lý vững' },
      { ul: [
        'Hít thở sâu nếu thấy căng thẳng.',
        'Đừng hoảng khi gặp câu khó — bỏ qua, làm tiếp.',
        'Tin vào những gì đã ôn luyện cả năm.',
      ] },
      { note: 'Các em đã học chăm chỉ suốt một năm. Hãy tin vào bản thân, làm bài cẩn thận và bình tĩnh. Chúc các em thi tốt và đỗ vào ngôi trường mơ ước!' },
    ],
    [
      { q: 'Nếu gặp câu không biết đáp án thì nên làm gì?', a: 'Loại trừ các phương án sai rõ ràng trước, rồi đưa ra phán đoán có cơ sở; KHÔNG bỏ trống vì thường không bị trừ điểm câu sai.' },
      { q: 'Có nên để trống câu trả lời trắc nghiệm không?', a: 'Không — vì thường không có hình phạt cho câu đoán sai, nên hãy điền đáp án cho mọi câu.' },
      { q: 'Một việc quan trọng cần làm vào đêm trước ngày thi là gì?', a: 'Ngủ đủ giấc và chuẩn bị đầy đủ dụng cụ/giấy tờ; chỉ ôn nhẹ các chủ điểm chính, không học dồn kiến thức mới gây căng thẳng.' },
    ]
  ),

  'S9TA-w36-quiz': L(
    'Kết thúc Tiếng Anh THCS — Keep Going Forward!',
    'Tuần cuối năm — thay vì ôn thêm ngữ pháp, cô muốn cùng các em nhìn lại hành trình tiếng Anh THCS và chuẩn bị tâm thế cho chặng tiếp theo.',
    [
      'Hệ thống hoá các điểm ngữ pháp và kĩ năng đã học trong chương trình lớp 9.',
      'Nhận ra giá trị của tiếng Anh trong cuộc sống và tương lai.',
      'Xây dựng kế hoạch học tiếng Anh tự chủ sau kì thi.',
    ],
    [
      { h: 'Grammar map — Bản đồ ngữ pháp lớp 9' },
      { ul: [
        'Thì: Simple/Continuous/Perfect Past + Future forms (will, going to, Present Continuous for future).',
        'Modal verbs: can/could, should/ought to, must/have to, may/might.',
        'Câu điều kiện loại 1, 2 và mệnh đề quan hệ (who/which/that/where).',
        'Câu bị động, câu gián tiếp (reported speech), câu hỏi đuôi (tag questions).',
        'Liên từ và cụm từ nối: although, however, therefore, in addition...',
      ] },
      { h: 'Skills — Bốn kĩ năng đã rèn' },
      { ul: [
        'Reading: tìm main idea, skim & scan, suy nghĩa từ trong ngữ cảnh.',
        'Listening: bắt từ khoá, chú ý số, ngày, tên riêng.',
        'Speaking: dùng fillers (well, I think, Let me see...) và linking words.',
        'Writing: topic sentence → supporting details → concluding sentence.',
      ] },
      { h: 'Tiếng Anh sau cánh cổng trường THCS' },
      { p: 'Tiếng Anh không phải môn học — tiếng Anh là công cụ. Những bạn giỏi nhất tiếng Anh không học thêm grammar từ sách giáo khoa, họ xem phim, nghe podcast, chat với người nước ngoài, đọc bài báo tiếng Anh. Kĩ năng của em sẽ tụt nhanh nếu không dùng, và tăng nhanh nếu dùng mỗi ngày.' },
      { h: 'Gợi ý tự học sau kì thi' },
      { ul: [
        'Xem YouTube hoặc phim với phụ đề tiếng Anh (sau đó tắt phụ đề dần).',
        'Dùng Duolingo hoặc Anki học 10 từ/ngày — đều quan trọng hơn dồn 100 từ/tuần.',
        'Đọc BBC Learning English hoặc VOA Learning English để nghe người thật, ngữ cảnh thật.',
        'Viết nhật ký ngắn bằng tiếng Anh — 3–5 câu/ngày là đủ.',
      ] },
      { note: 'Remember: Fluency comes from frequency, not intensity. Học đều mỗi ngày dù chỉ 15 phút tốt hơn học 3 giờ mỗi tuần. Keep going!' },
    ],
    [
      { q: 'What is the most useful grammar point from Grade 9 for real-life communication?', a: 'Modal verbs (can, should, must, might) — vì chúng xuất hiện trong mọi tình huống giao tiếp: xin phép (Can I?), gợi ý (Should we?), bắt buộc (You must), khả năng (It might). Nắm chắc modal verbs là chìa khoá để nói tự nhiên hơn ngay lập tức.' },
      { q: 'How can you keep improving your English after finishing Grade 9?', a: 'The key is daily exposure: watch English videos with subtitles (then without), listen to simple podcasts (VOA Learning English), read short articles on topics you enjoy, write 3–5 sentences in English daily, and find a language partner to chat with. Consistency beats intensity — 15 minutes daily is better than 3 hours once a week.' },
      { q: 'What advice would you give to a Grade 7 student who wants to do well in English at THCS?', a: 'Three things: (1) Do not fear mistakes — mistakes are how you learn, not proof that you are bad. (2) Build vocabulary every day — use a notebook or flashcard app; 5–10 words per day adds up to 1,000+ words per year. (3) Use English outside class — watch shows, listen to music, change your phone language. The students who excel are those who practice outside the classroom.' },
    ]
  ),
};
