// ============================================================
// Lớp 8 · TIẾNG ANH — Lý thuyết + Ví dụ 35 tuần (GDPT 2018, CEFR A2-B1)
// Key TRÙNG id quiz: "S8TA-wNN-quiz".
// Giảng giải bằng tiếng Việt; ví dụ và mẫu câu bằng tiếng Anh.
// Tham chiếu: Global Success / Friends Plus / i-Learn Smart World (Tiếng Anh 8).
// ============================================================

const L = (topic, intro, objectives, theory, examples) => ({ topic, intro, objectives, theory, examples });

export const S8TA_LESSONS = {
  'S8TA-w01-quiz': L(
    'Unit 1 — Leisure Activities (Vocabulary)',
    'Chào mừng các em đến với Tiếng Anh 8! Mở đầu năm học là Unit 1 "Leisure Activities" — các hoạt động giải trí trong thời gian rảnh. Tuần này cô cùng các em xây vốn từ chủ đề và các cụm động từ (collocations) hay dùng để nói về sở thích.',
    [
      'Biết và phát âm chuẩn các từ/cụm từ về leisure activities.',
      'Dùng đúng collocation: do / play / go + hoạt động.',
      'Nói và viết câu giới thiệu sở thích giải trí của bản thân.',
    ],
    [
      { h: 'Vocabulary — Leisure activities' },
      { p: 'Leisure activities là các hoạt động ta làm trong thời gian rảnh (free time / spare time) để thư giãn, giải trí.' },
      { ul: [
        'hang out (with friends) /hæŋ aʊt/ — đi chơi, tụ tập với bạn',
        'do DIY (do-it-yourself) — tự làm đồ thủ công tại nhà',
        'make crafts /krɑːfts/ — làm đồ thủ công',
        'play board games — chơi cờ/trò chơi trên bàn',
        'go window-shopping — đi ngắm đồ (không mua)',
        'play beach games — chơi trò chơi trên bãi biển',
        'do origami /ˌɒr.ɪˈɡɑː.mi/ — gấp giấy nghệ thuật',
        'people-watching — ngồi ngắm người qua lại',
      ] },
      { h: 'Grammar nhỏ — Collocation do / play / go' },
      { ul: [
        'DO + hoạt động nói chung: do crafts, do DIY, do origami.',
        'PLAY + trò chơi/nhạc cụ: play board games, play games, play the guitar.',
        'GO + V-ing (hoạt động kết thúc -ing): go shopping, go camping, go fishing.',
      ] },
      { h: 'Useful expressions — Nói về sở thích' },
      { ul: [
        'What do you do in your free time? — Bạn làm gì lúc rảnh?',
        'In my free time, I (often)... — Lúc rảnh, tôi (thường)…',
        "I'm (really) into / keen on... — Tôi (rất) mê / thích…",
        "I'm interested in... — Tôi quan tâm đến…",
      ] },
      { h: 'Liên hệ thực tế (modern leisure)' },
      { p: 'Trong SGK Unit 1, hoạt động giải trí của teen ngày nay gồm cả truyền thống (reading, gardening) lẫn hiện đại (using social media, watching vlogs, playing video games). Khi nói, em nên kèm trạng từ tần suất: always, usually, often, sometimes.' },
      { note: 'Phân biệt: "leisure time" (thời gian rảnh) là danh từ không đếm được — KHÔNG nói "leisure times". "Hobby" thì đếm được: a hobby, two hobbies.' },
    ],
    [
      { q: 'Dịch và phân tích collocation: "I usually hang out with my friends and play board games on weekends."', a: 'Tôi thường đi chơi với bạn và chơi cờ bàn vào cuối tuần. — "hang out with" (đi chơi với), "play board games" (PLAY + trò chơi).' },
      { q: 'Hoàn thành đúng động từ: "On Sundays, my sister ___ origami and I ___ camping with my dad."', a: 'does origami / go camping. — DO + origami; GO + V-ing (camping).' },
      { q: 'Trả lời câu hỏi: "What do you do in your free time?"', a: 'In my free time, I’m really into reading books and making crafts. — Dùng "be into" để diễn đạt sự đam mê.' },
    ]
  ),

  'S8TA-w02-quiz': L(
    'Unit 1 — Verbs of liking + V-ing / to-V',
    'Sau từ vựng, ta học ngữ pháp trọng tâm của Unit 1: các động từ chỉ sự thích/ghét đi với gerund (V-ing) hay to-infinitive (to-V). Đây là điểm ngữ pháp lớp 8 hay gặp trong đề thi.',
    [
      'Phân loại động từ + V-ing và động từ + to-V.',
      'Nắm nhóm động từ chỉ sở thích dùng được cả hai dạng.',
      'Chia động từ chính xác sau verbs of liking.',
    ],
    [
      { h: 'Grammar — Verb + V-ing (gerund)' },
      { p: 'Các động từ chỉ sở thích/cảm xúc thường theo sau bằng V-ing: enjoy, love, like, hate, dislike, fancy, mind, can\'t stand, don\'t mind, prefer.' },
      { ul: [
        'I enjoy reading comic books. — Tôi thích đọc truyện tranh.',
        'She loves playing badminton. — Cô ấy yêu chơi cầu lông.',
        "They can't stand waiting. — Họ không chịu nổi việc chờ đợi.",
      ] },
      { h: 'Grammar — Verb + to-V (to-infinitive)' },
      { p: 'Một số động từ theo sau bởi to-V: want, decide, hope, plan, expect, need, would like, agree, promise.' },
      { ul: [
        'I want to learn the guitar. — Tôi muốn học đàn guitar.',
        'She decided to join a club. — Cô ấy quyết định tham gia một câu lạc bộ.',
      ] },
      { h: 'Verbs of liking — dùng được CẢ HAI' },
      { ul: [
        'like, love, hate, prefer + V-ing (nghĩa sở thích, thói quen).',
        'like, love, hate, prefer + to-V (nghĩa lựa chọn/khi cần).',
        'VD: I like swimming. (sở thích) ≈ I like to swim in summer. (lựa chọn).',
      ] },
      { h: 'Quy tắc thêm -ing (nhắc lại)' },
      { ul: [
        'Phần lớn: + ing → read → reading.',
        'Tận cùng -e câm: bỏ e + ing → make → making, write → writing.',
        'Nguyên âm ngắn + phụ âm: gấp đôi → swim → swimming, sit → sitting.',
      ] },
      { note: 'Một số động từ đổi NGHĨA tuỳ dạng: "remember to do" (nhớ phải làm) ≠ "remember doing" (nhớ đã làm). Ở lớp 8 chỉ cần nắm nhóm verbs of liking là đủ.' },
      { h: 'Lỗi thường gặp' },
      { p: 'Sau "enjoy / fancy / mind / can\'t stand" PHẢI là V-ing, KHÔNG dùng to-V: "I enjoy to read" ❌ → "I enjoy reading" ✔.' },
    ],
    [
      { q: 'Hoàn thành: "She enjoys ___ (swim) in the sea every summer."', a: 'swimming. — enjoy + V-ing (gerund).' },
      { q: 'Hoàn thành: "I want ___ (be) a doctor when I grow up."', a: 'to be. — want + to-V (to-infinitive).' },
      { q: 'Phân biệt nghĩa hai câu: "I like cooking." và "I like to cook on Sundays."', a: 'Câu 1 nói sở thích chung (thích nấu ăn); câu 2 nói lựa chọn cụ thể (thích nấu vào Chủ nhật). Cả hai đều đúng vì "like" dùng được V-ing và to-V.' },
    ]
  ),

  'S8TA-w03-quiz': L(
    'Unit 2 — Life in the Countryside',
    'Unit 2 "Life in the Countryside" đưa các em về với cuộc sống nông thôn. Tuần này ta học từ vựng mô tả nông thôn, thành thị và các hoạt động ở quê.',
    [
      'Học từ vựng về nông thôn (countryside) và thành thị (city).',
      'Dùng tính từ mô tả cuộc sống ở hai nơi.',
      'So sánh ưu, nhược điểm của nông thôn và thành thị.',
    ],
    [
      { h: 'Vocabulary — Countryside (Nông thôn)' },
      { ul: [
        'countryside /ˈkʌn.tri.saɪd/ — nông thôn, miền quê',
        'paddy field — cánh đồng lúa',
        'cattle /ˈkæt.l̩/ — gia súc (trâu, bò)',
        'buffalo /ˈbʌf.ə.loʊ/ — con trâu',
        'crops /krɒps/ — vụ mùa, cây trồng',
        'harvest /ˈhɑː.vɪst/ — thu hoạch',
        'orchard /ˈɔː.tʃəd/ — vườn cây ăn quả',
        'fresh air — không khí trong lành',
      ] },
      { h: 'Adjectives — Mô tả nông thôn' },
      { ul: [
        'peaceful — yên bình', 'quiet — yên tĩnh', 'fresh — trong lành',
        'slow(-paced) — chậm rãi', 'friendly — thân thiện', 'beautiful scenery — phong cảnh đẹp',
      ] },
      { h: 'Vocabulary — City / Urban (Thành thị)' },
      { ul: [
        'urban /ˈɜː.bən/ — thuộc đô thị', 'skyscraper /ˈskaɪˌskreɪ.pər/ — toà nhà chọc trời',
        'traffic jam — tắc đường', 'pollution — ô nhiễm', 'crowded — đông đúc',
        'convenient — tiện lợi', 'modern — hiện đại', 'noisy — ồn ào',
      ] },
      { h: 'Hoạt động ở nông thôn (verb phrases)' },
      { ul: [
        'collect water / firewood — lấy nước / củi',
        'ride a horse / a buffalo — cưỡi ngựa / trâu',
        'put up a tent — dựng lều', 'pick fruit — hái quả',
      ] },
      { h: 'Mẫu câu so sánh' },
      { p: 'Life in the countryside is + adj-er/more adj + than life in the city. VD: Life in the countryside is more peaceful than life in the city.' },
      { note: '"The countryside" thường có "the"; "in the country" cũng có nghĩa "ở nông thôn". Đừng nhầm "country" (đất nước) với "the countryside" (vùng quê).' },
    ],
    [
      { q: 'Dịch: "Life in the countryside is peaceful but slower than in the city."', a: 'Cuộc sống ở nông thôn yên bình nhưng chậm hơn ở thành phố.' },
      { q: 'Kể 3 ưu điểm của nông thôn bằng tiếng Anh.', a: 'Fresh air, peaceful atmosphere, and beautiful scenery. — Dùng cụm danh từ ngắn gọn.' },
      { q: 'Hoàn thành verb phrase: "In the countryside, children often ___ a buffalo and ___ fruit in the orchard."', a: 'ride a buffalo / pick fruit. — cưỡi trâu và hái quả trong vườn.' },
    ]
  ),

  'S8TA-w04-quiz': L(
    'Unit 2 — Comparative forms of adverbs',
    'Trọng tâm ngữ pháp Unit 2 là SO SÁNH HƠN CỦA TRẠNG TỪ. Các em đã biết so sánh hơn của tính từ (lớp 6-7); tuần này áp dụng cho trạng từ — dạng hay nhầm.',
    [
      'Nắm cấu trúc so sánh hơn của trạng từ.',
      'Phân biệt so sánh trạng từ với so sánh tính từ.',
      'Nhớ các trạng từ bất quy tắc.',
    ],
    [
      { h: 'Grammar — Cấu trúc' },
      { p: 'S + V + trạng-từ-er / more + trạng-từ + than + (S/O).' },
      { h: 'Trạng từ NGẮN (giống tính từ, 1 âm tiết)' },
      { ul: [
        'fast → faster, hard → harder, late → later, early → earlier.',
        'VD: He runs faster than me. — Anh ấy chạy nhanh hơn tôi.',
      ] },
      { h: 'Trạng từ tận cùng -ly (đa số)' },
      { p: 'Dùng more + trạng từ + than.' },
      { ul: [
        'carefully → more carefully', 'slowly → more slowly',
        'clearly → more clearly', 'beautifully → more beautifully',
      ] },
      { h: 'Trạng từ BẤT QUY TẮC' },
      { ul: [
        'well → better', 'badly → worse',
        'far → farther / further', 'little → less', 'much → more',
      ] },
      { h: 'Phân biệt tính từ vs trạng từ' },
      { p: 'Tính từ mô tả DANH TỪ (be + adj): "She is careful." Trạng từ mô tả ĐỘNG TỪ (V + adv): "She drives carefully." So sánh: "She drives more carefully than her brother."' },
      { note: 'Một số từ vừa là tính từ vừa là trạng từ, có CHUNG dạng so sánh: fast → faster, hard → harder, early → earlier. Cẩn thận: "hardly" KHÔNG phải so sánh của "hard" — nó nghĩa là "hầu như không".' },
      { h: 'Củng cố cấu trúc' },
      { p: 'Có thể thêm "much / a lot / a bit" trước so sánh để nhấn mạnh: "He works much harder than before." (chăm chỉ hơn NHIỀU).' },
    ],
    [
      { q: 'So sánh: "She speaks English ___ (clearly) than her brother."', a: 'more clearly. — clearly là trạng từ -ly → more + clearly.' },
      { q: 'So sánh: "He drives ___ (carefully) than I do."', a: 'more carefully.' },
      { q: 'Chọn dạng đúng (bất quy tắc): "My team played ___ (well) than yours yesterday."', a: 'better. — well → better (bất quy tắc).' },
    ]
  ),

  'S8TA-w05-quiz': L(
    'Unit 3 — Peoples of Vietnam',
    'Unit 3 "Peoples of Vietnam" tự hào giới thiệu cộng đồng 54 dân tộc Việt Nam. Tuần này ta học từ vựng về dân tộc, phong tục và trang phục.',
    [
      'Học từ vựng về các dân tộc và văn hoá.',
      'Mô tả phong tục, trang phục, lễ hội của một dân tộc.',
      'Thể hiện niềm tự hào về sự đa dạng văn hoá Việt Nam.',
    ],
    [
      { h: 'Vocabulary — Ethnic groups' },
      { ul: [
        'ethnic group /ˈeθ.nɪk ɡruːp/ — dân tộc',
        'ethnic minority — dân tộc thiểu số',
        'the majority — đa số (người Kinh)',
        'tradition /trəˈdɪʃ.ən/ — truyền thống',
        'custom /ˈkʌs.təm/ — phong tục',
        'costume /ˈkɒs.tjuːm/ — trang phục truyền thống',
        'heritage /ˈher.ɪ.tɪdʒ/ — di sản',
        'language — ngôn ngữ',
      ] },
      { h: 'Đời sống văn hoá (cultural life)' },
      { ul: [
        'stilt house — nhà sàn', 'terraced fields — ruộng bậc thang',
        'brocade /ˈbroʊ.keɪd/ — vải thổ cẩm', 'gong /ɡɒŋ/ — cồng chiêng',
        'basket — gùi/giỏ', 'folk song — dân ca',
      ] },
      { h: 'Tên một số dân tộc (proper nouns)' },
      { ul: [
        'the Kinh (the Viet) — người Kinh',
        'the Tay, the Thai, the Muong — Tày, Thái, Mường',
        'the Hmong, the Dao, the Ede — H\'Mông, Dao, Ê-đê',
      ] },
      { h: 'Mẫu câu mô tả' },
      { ul: [
        'The ... people live in (the mountains / the north).',
        'They speak their own language and wear colourful costumes.',
        'Their traditional house is a stilt house.',
      ] },
      { p: 'Việt Nam có 54 dân tộc; dân tộc Kinh (Việt) chiếm đa số (the majority), 53 dân tộc còn lại là dân tộc thiểu số (ethnic minorities).' },
      { note: 'Khi nói tên dân tộc trong tiếng Anh, ta thêm "the": the Kinh, the Tay. Tên dân tộc và quốc tịch luôn VIẾT HOA chữ cái đầu.' },
    ],
    [
      { q: 'Dịch: "Vietnam has 54 ethnic groups with their own cultures."', a: 'Việt Nam có 54 dân tộc với nền văn hoá riêng.' },
      { q: 'Trả lời: "How many ethnic groups are there in Vietnam?"', a: 'There are 54 ethnic groups in Vietnam.' },
      { q: 'Hoàn thành câu mô tả: "The Tay people live in ___ (miền núi phía Bắc) and wear ___ (trang phục thổ cẩm)."', a: 'the northern mountains / brocade costumes. — sống ở vùng núi phía Bắc, mặc trang phục thổ cẩm.' },
    ]
  ),

  'S8TA-w06-quiz': L(
    'Unit 3 — Questions: how many / how much',
    'Ngữ pháp Unit 3 ôn lại câu hỏi số lượng: HOW MANY (đếm được) và HOW MUCH (không đếm được). Đây là kiến thức nền nhưng rất hay sai khi danh từ "đánh lừa".',
    [
      'Phân biệt danh từ đếm được và không đếm được.',
      'Dùng đúng how many / how much.',
      'Trả lời câu hỏi số lượng tự nhiên.',
    ],
    [
      { h: 'Grammar — How many / How much' },
      { ul: [
        'How many + N đếm được số nhiều + ...? — How many books do you have?',
        'How much + N không đếm được + ...? — How much water do you drink?',
      ] },
      { h: 'Danh từ ĐẾM ĐƯỢC (countable)' },
      { p: 'Có số ít/số nhiều: a book → two books; a person → people; an ethnic group → ethnic groups.' },
      { h: 'Danh từ KHÔNG ĐẾM ĐƯỢC (uncountable)' },
      { p: 'Không có số nhiều, không "a/an": water, sugar, rice, money, music, information, advice, rubbish.' },
      { h: 'Bẫy hay gặp' },
      { ul: [
        'money — KHÔNG đếm được → how much money (dù tiếng Việt nói "bao nhiêu tiền").',
        'information, advice, furniture — không đếm được → how much.',
        'people — đếm được (số nhiều của person) → how many people.',
      ] },
      { h: 'Trả lời số lượng' },
      { ul: [
        'a lot of / lots of — nhiều (cả 2 loại).',
        'some / a little — một ít (không đếm được).',
        'a few / several — vài (đếm được).',
        'not much / not many — không nhiều.',
      ] },
      { note: 'Money là không đếm được trong tiếng Anh → luôn "how much money". Tương tự: "how much homework", "how much advice".' },
    ],
    [
      { q: 'Chọn: "How (many/much) ___ rice do you eat every day?"', a: 'much. — rice không đếm được.' },
      { q: 'Chọn: "How (many/much) ___ ethnic groups are there in Vietnam?"', a: 'many. — ethnic groups đếm được (số nhiều).' },
      { q: 'Sửa lỗi: "How many money do you have?"', a: 'How MUCH money do you have? — money là danh từ không đếm được nên dùng "how much".' },
    ]
  ),

  'S8TA-w07-quiz': L(
    'Unit 4 — Our Customs and Traditions',
    'Unit 4 "Our Customs and Traditions" khám phá phong tục và truyền thống Việt Nam. Tuần này ta phân biệt custom với tradition và học từ vựng văn hoá.',
    [
      'Phân biệt custom và tradition.',
      'Học từ vựng về nghi lễ, lễ kỷ niệm.',
      'Nói về một phong tục/truyền thống của gia đình hoặc đất nước.',
    ],
    [
      { h: 'Vocabulary — Customs & Traditions' },
      { ul: [
        'custom /ˈkʌs.təm/ — phong tục (cách làm quen thuộc của một nhóm)',
        'tradition /trəˈdɪʃ.ən/ — truyền thống (truyền từ đời này sang đời khác)',
        'ritual /ˈrɪtʃ.u.əl/ — nghi lễ', 'ceremony /ˈser.ə.mə.ni/ — buổi lễ',
        'celebrate /ˈsel.ɪ.breɪt/ — kỷ niệm, tổ chức', 'honour /ˈɒn.ər/ — tôn vinh',
        'ancestor /ˈæn.ses.tər/ — tổ tiên', 'generation /ˌdʒen.əˈreɪ.ʃən/ — thế hệ',
      ] },
      { h: 'Phân biệt custom vs tradition' },
      { ul: [
        'custom — cách hành xử quen thuộc, có thể của cá nhân/cộng đồng: "It is a custom to take off your shoes indoors."',
        'tradition — phong tục được truyền qua nhiều thế hệ: "Eating banh chung at Tet is a long-standing tradition."',
      ] },
      { h: 'Một số truyền thống Việt Nam' },
      { ul: [
        'worshipping ancestors — thờ cúng tổ tiên',
        'giving lucky money (li xi) — mừng tuổi',
        'visiting relatives at Tet — thăm họ hàng dịp Tết',
        'wrapping banh chung — gói bánh chưng',
      ] },
      { h: 'Mẫu câu' },
      { ul: [
        'It is a custom / tradition to + V: It is a tradition to clean the house before Tet.',
        'We usually + V on special occasions.',
        'This custom shows respect for + N.',
      ] },
      { note: 'Cấu trúc "It is a custom/tradition + to-V": "It is a tradition TO VISIT grandparents at Tet." — dùng to-infinitive sau "a custom/tradition".' },
    ],
    [
      { q: 'Dịch: "On Tet, Vietnamese people often visit their relatives."', a: 'Vào Tết, người Việt thường đến thăm họ hàng.' },
      { q: 'Kể một truyền thống Việt Nam bằng tiếng Anh.', a: 'Worshipping ancestors / Wrapping banh chung at Tet is a popular Vietnamese tradition.' },
      { q: 'Phân biệt: dùng "custom" hay "tradition" cho câu "Taking off shoes before entering a house is a Vietnamese ___."', a: 'custom. — đây là một cách hành xử/thói quen quen thuộc → custom.' },
    ]
  ),

  'S8TA-w08-quiz': L(
    'Unit 4 — should / shouldn\'t',
    'Ngữ pháp Unit 4 là modal verb SHOULD để đưa lời khuyên — nên/không nên làm gì khi tham gia phong tục, ứng xử nơi công cộng.',
    [
      'Nắm cách dùng should / shouldn\'t.',
      'Đưa lời khuyên lịch sự, đúng ngữ cảnh.',
      'Lập câu phủ định và nghi vấn với should.',
    ],
    [
      { h: 'Grammar — Should + V (bare)' },
      { p: 'Should = nên (lời khuyên, gợi ý). Theo sau là động từ NGUYÊN THỂ (không "to").' },
      { ul: [
        'Khẳng định: You should study hard.',
        "Phủ định: You shouldn't (should not) be late.",
        'Nghi vấn: Should I call her first?',
      ] },
      { h: 'Quy tắc của modal verbs' },
      { ul: [
        'KHÔNG thêm -s ở ngôi 3: "He should go" (không "shoulds").',
        'KHÔNG dùng "to" sau should: "should go" (không "should to go").',
        'Câu hỏi: đảo should lên đầu — "Should we...?"',
      ] },
      { h: 'Ngữ cảnh dùng should' },
      { ul: [
        'Đưa lời khuyên: You should drink hot tea when you have a cold.',
        'Gợi ý lịch sự: We should leave now, it’s getting late.',
        'Hỏi xin lời khuyên: What should I wear to the ceremony?',
      ] },
      { h: 'Should vs Must' },
      { p: 'should = lời khuyên (nhẹ); must = bắt buộc (mạnh). "You should rest." (lời khuyên) khác "You must wear a uniform." (bắt buộc).' },
      { h: 'Trả lời ngắn' },
      { p: 'Should I bring a gift? — Yes, you should. / No, you shouldn’t.' },
      { note: 'Should là động từ khuyết thiếu — KHÔNG dùng "to" sau should: "You should TO study" ❌ → "You should study" ✔.' },
    ],
    [
      { q: 'Dịch: "You shouldn\'t talk during the ceremony."', a: 'Em không nên nói chuyện trong buổi lễ.' },
      { q: 'Đưa lời khuyên dùng should: "I have a cold."', a: 'You should drink hot tea and rest. — should + V nguyên thể.' },
      { q: 'Sửa lỗi: "She shoulds to visit her grandparents at Tet."', a: 'She SHOULD VISIT her grandparents at Tet. — modal không thêm -s, không dùng "to".' },
    ]
  ),

  'S8TA-w09-quiz': L(
    'Unit 5 — Festivals in Vietnam',
    'Unit 5 "Festivals in Vietnam" giới thiệu các lễ hội Việt Nam. Tuần này ta học từ vựng và cách mô tả một lễ hội: thời gian, hoạt động, ý nghĩa.',
    [
      'Học từ vựng về lễ hội và hoạt động lễ hội.',
      'Mô tả một lễ hội theo trình tự: tên, thời gian, hoạt động.',
      'Tự hào về kho tàng lễ hội văn hoá Việt Nam.',
    ],
    [
      { h: 'Vocabulary — Festival' },
      { ul: [
        'festival /ˈfes.tɪ.vəl/ — lễ hội', 'celebrate — tổ chức kỷ niệm',
        'firework(s) /ˈfaɪə.wɜːk/ — pháo hoa', 'parade /pəˈreɪd/ — diễu hành',
        'lantern /ˈlæn.tən/ — đèn lồng', 'dragon dance — múa rồng',
        'lion dance — múa lân', 'mooncake — bánh trung thu',
      ] },
      { h: 'Các loại lễ hội' },
      { ul: [
        'religious festival — lễ hội tôn giáo',
        'seasonal festival — lễ hội theo mùa',
        'historical festival — lễ hội lịch sử',
      ] },
      { h: 'Lễ hội Việt Nam (proper nouns)' },
      { ul: [
        'Tet (the Lunar New Year) — Tết Nguyên Đán',
        'the Mid-Autumn Festival — Tết Trung thu',
        'the Hung Kings\' Temple Festival — Giỗ Tổ Hùng Vương',
        'the Lim Festival — Hội Lim',
      ] },
      { h: 'Hoạt động trong lễ hội (verb phrases)' },
      { ul: [
        'worship the gods — thờ cúng thần linh',
        'watch a procession — xem rước kiệu',
        'hold a competition — tổ chức cuộc thi',
        'pray for luck / a good harvest — cầu may / mùa màng bội thu',
      ] },
      { h: 'Mẫu câu mô tả lễ hội' },
      { p: '... is held in (tháng/mùa). During the festival, people + V. The festival is to honour / celebrate + N.' },
      { note: 'Tên lễ hội VIẾT HOA: Tet, the Mid-Autumn Festival. "Festival" trong tên riêng cũng viết hoa.' },
    ],
    [
      { q: 'Dịch: "Tet is the most important festival in Vietnam."', a: 'Tết là lễ hội quan trọng nhất ở Việt Nam.' },
      { q: 'Kể 3 lễ hội Việt Nam bằng tiếng Anh.', a: 'Tet (the Lunar New Year), the Mid-Autumn Festival, and the Hung Kings\' Temple Festival.' },
      { q: 'Hoàn thành mô tả: "The Mid-Autumn Festival is held in ___ (mùa thu). During it, children ___ (rước đèn lồng)."', a: 'autumn / carry lanterns. — Trung thu diễn ra vào mùa thu, trẻ em rước đèn lồng.' },
    ]
  ),

  'S8TA-w10-quiz': L(
    'Unit 5 — Simple past + used to',
    'Ngữ pháp Unit 5: ôn QUÁ KHỨ ĐƠN và học cấu trúc USED TO (đã từng) — diễn tả thói quen/tình trạng trong quá khứ nay không còn.',
    [
      'Ôn cấu trúc và cách dùng quá khứ đơn.',
      'Nắm cấu trúc used to + V.',
      'Phân biệt used to với quá khứ đơn.',
    ],
    [
      { h: 'Grammar — Simple Past (ôn)' },
      { p: 'Diễn tả hành động đã xảy ra và kết thúc trong quá khứ. Động từ thường: V-ed; bất quy tắc: cột 2.' },
      { ul: [
        'I visited my grandparents last week.',
        'She went to the festival yesterday.',
        'Phủ định: didn\'t + V; Nghi vấn: Did + S + V?',
      ] },
      { h: 'Dấu hiệu quá khứ đơn' },
      { p: 'yesterday, last (week/year), ... ago, in 2010, when I was young.' },
      { h: 'Grammar — Used to + V (bare)' },
      { p: 'Diễn tả thói quen hoặc tình trạng trong quá khứ — bây giờ KHÔNG còn nữa.' },
      { ul: [
        'I used to play football when I was young. — Tôi đã từng đá bóng (giờ không còn).',
        'There used to be a temple here. — Trước đây có một ngôi đền ở đây.',
      ] },
      { h: 'Phủ định & nghi vấn của used to' },
      { ul: [
        'Phủ định: didn\'t use to + V — "I didn\'t use to like coffee."',
        'Nghi vấn: Did + S + use to + V? — "Did you use to live here?"',
        'Lưu ý: ở phủ định/nghi vấn bỏ -d → "use to".',
      ] },
      { h: 'Used to vs Simple past' },
      { p: 'Simple past: chỉ một hành động đã xảy ra. Used to: NHẤN MẠNH thói quen lặp lại trong quá khứ, nay đã thay đổi. "I used to walk to school." (thói quen cũ) khác "I walked to school yesterday." (một lần).' },
      { note: 'Đừng nhầm "used to + V" (đã từng) với "be used to + V-ing" (quen với việc gì). Lớp 8 chỉ học "used to + V".' },
    ],
    [
      { q: 'Dịch và phân tích: "She used to live in Hanoi."', a: 'Cô ấy đã từng sống ở Hà Nội (giờ không sống ở đó nữa). — used to + V chỉ tình trạng quá khứ không còn.' },
      { q: 'Chia quá khứ đơn: "I ___ (visit) Hue last summer."', a: 'visited.' },
      { q: 'Chuyển sang phủ định: "I used to eat a lot of sweets."', a: 'I didn\'t use to eat a lot of sweets. — phủ định bỏ -d → "use to".' },
    ]
  ),

  'S8TA-w11-quiz': L(
    'Unit 6 — Folk Tales',
    'Unit 6 "Folk Tales" đưa các em vào thế giới truyện dân gian. Tuần này ta học từ vựng về nhân vật, cốt truyện và bài học đạo đức.',
    [
      'Học từ vựng về truyện dân gian và nhân vật.',
      'Kể lại nội dung một truyện dân gian đơn giản.',
      'Hiểu và nêu bài học đạo đức (moral lesson).',
    ],
    [
      { h: 'Vocabulary — Folk tales' },
      { ul: [
        'folk tale /foʊk teɪl/ — truyện dân gian', 'fairy tale — truyện cổ tích',
        'legend /ˈledʒ.ənd/ — truyền thuyết', 'fable /ˈfeɪ.bəl/ — truyện ngụ ngôn',
        'character /ˈkær.ək.tər/ — nhân vật', 'plot /plɒt/ — cốt truyện',
        'moral lesson — bài học đạo đức', 'setting — bối cảnh',
      ] },
      { h: 'Loại nhân vật (characters)' },
      { ul: [
        'hero / heroine — anh hùng / nữ anh hùng',
        'villain /ˈvɪl.ən/ — nhân vật phản diện',
        'fairy /ˈfeə.ri/ — bà tiên', 'giant /ˈdʒaɪ.ənt/ — người khổng lồ',
        'ogre /ˈoʊ.ɡər/ — yêu tinh', 'king / emperor — vua / hoàng đế',
      ] },
      { h: 'Tính từ mô tả nhân vật' },
      { ul: [
        'kind-hearted — tốt bụng', 'brave — dũng cảm', 'wise — khôn ngoan',
        'cruel — tàn nhẫn', 'greedy — tham lam', 'evil — độc ác',
      ] },
      { h: 'Truyện dân gian Việt Nam' },
      { ul: [
        'Tam and Cam (Tam Cam)', 'Son Tinh and Thuy Tinh',
        'The Legend of Banh Chung and Banh Giay', 'Thach Sanh',
      ] },
      { h: 'Mẫu câu kể truyện' },
      { p: 'Once upon a time, there was/lived... The story is about... In the end... The moral lesson is...' },
      { note: 'Truyện dân gian thường kể bằng QUÁ KHỨ ĐƠN: "Once upon a time, there WAS a poor girl who LIVED with her stepmother."' },
    ],
    [
      { q: 'Dịch: "Folk tales often teach moral lessons."', a: 'Truyện dân gian thường dạy bài học đạo đức.' },
      { q: 'Kể tên một truyện dân gian Việt Nam bằng tiếng Anh.', a: 'The story of Tam and Cam / The Legend of Banh Chung and Banh Giay.' },
      { q: 'Hoàn thành mở đầu truyện (chia quá khứ): "Once upon a time, there ___ (be) a brave young man who ___ (save) the village."', a: 'was / saved. — Truyện dân gian dùng quá khứ đơn.' },
    ]
  ),

  'S8TA-w12-quiz': L(
    'Unit 6 — Past simple vs past continuous',
    'Ngữ pháp Unit 6 kết hợp QUÁ KHỨ ĐƠN và QUÁ KHỨ TIẾP DIỄN — công cụ chính để kể chuyện: một hành động dài bị một hành động ngắn xen vào.',
    [
      'Nắm cấu trúc và cách dùng past continuous.',
      'Kết hợp past simple và past continuous với when / while.',
      'Dùng để kể chuyện sinh động.',
    ],
    [
      { h: 'Grammar — Past Continuous' },
      { p: 'Cấu trúc: S + was/were + V-ing. Diễn tả hành động ĐANG xảy ra tại một thời điểm trong quá khứ.' },
      { ul: [
        'I was studying at 8 p.m. yesterday.',
        'They were playing while it was raining.',
        'Phủ định: wasn\'t/weren\'t + V-ing; Nghi vấn: Was/Were + S + V-ing?',
      ] },
      { h: 'was / were' },
      { ul: ['I / He / She / It → was', 'You / We / They → were'] },
      { h: 'Kết hợp với WHEN' },
      { p: 'When + past simple = hành động NGẮN xen vào hành động DÀI (past continuous).' },
      { p: 'VD: When she called, I was cooking dinner. — Khi cô ấy gọi (ngắn), tôi đang nấu cơm (dài).' },
      { h: 'Kết hợp với WHILE' },
      { p: 'While + past continuous = hai hành động DÀI xảy ra cùng lúc, hoặc khung thời gian cho hành động ngắn.' },
      { p: 'VD: While I was reading, my brother was watching TV.' },
      { h: 'Dấu hiệu nhận biết' },
      { p: 'at 8 p.m. yesterday, at that time, when..., while..., all morning yesterday.' },
      { note: 'Hành động NGẮN/ĐỘT NGỘT → past simple (called, arrived, rang). Hành động ĐANG DIỄN RA → past continuous (was cooking, were playing).' },
    ],
    [
      { q: 'Dịch: "I was reading when my phone rang."', a: 'Tôi đang đọc sách thì điện thoại reo. — was reading (dài) + rang (ngắn xen vào).' },
      { q: 'Hoàn thành: "When I ___ (arrive), they ___ (have) dinner."', a: 'arrived / were having. — arrive (ngắn) → past simple; have dinner (đang diễn ra) → past continuous.' },
      { q: 'Dùng "while": "___ I ___ (do) my homework, the lights went out."', a: 'While I was doing my homework, the lights went out. — while + past continuous, hành động ngắn (went out) → past simple.' },
    ]
  ),

  'S8TA-w13-quiz': L(
    'Unit 7 — Pollution',
    'Unit 7 "Pollution" bàn về ô nhiễm môi trường — nguyên nhân, hậu quả, giải pháp. Tuần này ta xây vốn từ và cụm từ để thảo luận chủ đề này.',
    [
      'Học từ vựng về các loại ô nhiễm.',
      'Nói về nguyên nhân (causes) và hậu quả (effects).',
      'Đề xuất giải pháp giảm ô nhiễm.',
    ],
    [
      { h: 'Vocabulary — Types of pollution' },
      { ul: [
        'pollution /pəˈluː.ʃən/ — ô nhiễm', 'air pollution — ô nhiễm không khí',
        'water pollution — ô nhiễm nước', 'soil pollution — ô nhiễm đất',
        'noise pollution — ô nhiễm tiếng ồn', 'light pollution — ô nhiễm ánh sáng',
        'radioactive pollution — ô nhiễm phóng xạ',
      ] },
      { h: 'Causes (Nguyên nhân)' },
      { ul: [
        'litter /ˈlɪt.ər/ — xả rác', 'dump waste — đổ chất thải',
        'exhaust fumes — khí thải', 'pesticides /ˈpes.tɪ.saɪdz/ — thuốc trừ sâu',
        'untreated sewage — nước thải chưa xử lý',
      ] },
      { h: 'Effects (Hậu quả)' },
      { ul: [
        'health problems — vấn đề sức khoẻ', 'disease /dɪˈziːz/ — bệnh tật',
        'global warming — nóng lên toàn cầu', 'die out — tuyệt chủng',
      ] },
      { h: 'Solutions — Quy tắc 3R' },
      { ul: ['Reduce — giảm thiểu', 'Reuse — tái sử dụng', 'Recycle — tái chế'] },
      { h: 'Mẫu câu thảo luận' },
      { ul: [
        '... causes / leads to + N (hậu quả).',
        'To reduce pollution, we should + V.',
        'If we ..., the environment will ... (điều kiện loại 1).',
      ] },
      { note: '"Pollution" là danh từ không đếm được → không nói "pollutions". Động từ "pollute"; tính từ "polluted" (bị ô nhiễm).' },
    ],
    [
      { q: 'Dịch: "Air pollution causes many health problems."', a: 'Ô nhiễm không khí gây ra nhiều vấn đề sức khoẻ.' },
      { q: 'Trả lời: "How can we reduce pollution?"', a: 'We can recycle waste, use less plastic, and use public transport. — Áp dụng 3R.' },
      { q: 'Ghép nguyên nhân–hậu quả: "Dumping ___ (chất thải) into rivers ___ (gây ra) water pollution."', a: 'waste / causes. — Đổ chất thải xuống sông gây ô nhiễm nước.' },
    ]
  ),

  'S8TA-w14-quiz': L(
    'Unit 7 — Conditional sentence type 1',
    'Ngữ pháp Unit 7 là CÂU ĐIỀU KIỆN LOẠI 1 — nói về điều kiện có thật, có thể xảy ra ở tương lai. Rất hợp để bàn về môi trường: "Nếu... thì...".',
    [
      'Nắm cấu trúc câu điều kiện loại 1.',
      'Hiểu khi nào dùng và tránh lỗi "If + will".',
      'Áp dụng vào chủ đề môi trường.',
    ],
    [
      { h: 'Grammar — Conditional Type 1' },
      { p: 'Cấu trúc: If + S + V (present simple), S + will + V (bare).' },
      { p: 'Diễn tả điều kiện CÓ THẬT, có khả năng xảy ra ở hiện tại/tương lai và kết quả của nó.' },
      { ul: [
        'If it rains, I will stay at home.',
        "If you study hard, you'll pass the exam.",
        "If we don't recycle, the environment will be polluted.",
      ] },
      { h: 'Hai vế có thể đảo chỗ' },
      { p: 'I will stay at home if it rains. — Khi mệnh đề "if" đứng SAU, KHÔNG dùng dấu phẩy.' },
      { h: 'Thay "will" bằng modal khác' },
      { ul: [
        'If you have time, you can help me.',
        'If it rains, we may stay home.',
        'If you feel sick, you should rest.',
      ] },
      { h: 'Câu mệnh lệnh trong mệnh đề chính' },
      { p: 'If you see litter, pick it up! — mệnh đề chính có thể là câu mệnh lệnh.' },
      { h: 'Dấu hiệu & ngữ cảnh' },
      { p: 'Dùng cho lời khuyên, cảnh báo, hứa hẹn, dự đoán về môi trường, học tập, đời sống.' },
      { note: 'LỖI HAY GẶP: "If you WILL study..." ❌. Sau "if" PHẢI là present simple, KHÔNG "will". Đúng: "If you STUDY hard, you will pass."' },
    ],
    [
      { q: 'Dịch: "If you study hard, you will pass the exam."', a: 'Nếu em học chăm chỉ, em sẽ vượt qua kỳ thi.' },
      { q: 'Hoàn thành: "If we ___ (not protect) trees, the air ___ (be) more polluted."', a: "don't protect / will be." },
      { q: 'Sửa lỗi: "If it will rain tomorrow, we will cancel the trip."', a: 'If it RAINS tomorrow, we will cancel the trip. — sau "if" dùng present simple, không "will".' },
    ]
  ),

  'S8TA-w15-quiz': L(
    'Unit 8 — English Speaking Countries',
    'Unit 8 "English Speaking Countries" giới thiệu các nước nói tiếng Anh và sự đa dạng văn hoá của họ. Tuần này ta học từ vựng về quốc gia và biểu tượng văn hoá.',
    [
      'Học tên các nước nói tiếng Anh và biểu tượng của chúng.',
      'Phân biệt British English và American English.',
      'Mô tả ngắn một quốc gia nói tiếng Anh.',
    ],
    [
      { h: 'Vocabulary — English speaking countries' },
      { ul: [
        'the UK (the United Kingdom) — Vương quốc Anh',
        'the USA (the United States) — Hoa Kỳ',
        'Canada — Ca-na-đa', 'Australia — Úc',
        'New Zealand — Niu Di-lân', 'Ireland — Ai-len',
        'India — Ấn Độ (tiếng Anh là ngôn ngữ chính thức)',
      ] },
      { h: 'Biểu tượng văn hoá (cultural symbols)' },
      { ul: [
        'Big Ben, the Tower Bridge (the UK)',
        'the Statue of Liberty (the USA)',
        'the Opera House, the kangaroo (Australia)',
        'maple leaf (Canada)',
      ] },
      { h: 'British vs American English' },
      { ul: [
        'Từ vựng: lift (BrE) – elevator (AmE); flat – apartment; football – soccer.',
        'Chính tả: colour (BrE) – color (AmE); centre – center.',
        'Phát âm và một số cấu trúc cũng khác nhau.',
      ] },
      { h: 'Mẫu câu mô tả quốc gia' },
      { p: '... is located in (châu lục). Its capital is... It is famous for... People there speak English.' },
      { h: 'Mạo từ "the" với tên nước' },
      { p: 'Có "the": the UK, the USA, the Philippines, the Netherlands. Không "the": Vietnam, Canada, Australia.' },
      { note: 'Phân biệt: "England" chỉ là một phần của "the UK" (gồm England, Scotland, Wales, Northern Ireland). "Britain" ≈ England + Scotland + Wales.' },
    ],
    [
      { q: 'Dịch: "London is the capital of the UK."', a: 'Luân Đôn là thủ đô của Vương quốc Anh.' },
      { q: 'Kể 3 nước nói tiếng Anh bằng tiếng Anh.', a: 'The UK, the USA, and Australia / Canada.' },
      { q: 'Chuyển sang American English: "I take the lift to my flat."', a: 'I take the elevator to my apartment. — lift→elevator, flat→apartment.' },
    ]
  ),

  'S8TA-w16-quiz': L(
    'Unit 8 — Articles a / an / the',
    'Ngữ pháp Unit 8: MẠO TỪ a / an / the — điểm khó và quan trọng. Tuần này ta hệ thống quy tắc dùng mạo từ xác định và không xác định.',
    [
      'Phân biệt a / an / the và trường hợp không mạo từ.',
      'Nắm quy tắc dùng "the".',
      'Áp dụng đúng vào câu.',
    ],
    [
      { h: 'Grammar — A / An (mạo từ KHÔNG xác định)' },
      { p: 'Dùng với danh từ đếm được số ít, nhắc đến LẦN ĐẦU, chung chung.' },
      { ul: [
        '"a" trước PHỤ ÂM: a book, a teacher, a university (u đọc /juː/).',
        '"an" trước NGUYÊN ÂM: an apple, an hour (h câm), an MP3.',
      ] },
      { h: 'The (mạo từ XÁC ĐỊNH)' },
      { ul: [
        'Nhắc đến lần thứ 2 trở đi: I saw a dog. The dog was brown.',
        'Vật DUY NHẤT: the sun, the moon, the world, the sky.',
        'Trước số thứ tự & so sánh nhất: the first, the best, the most...',
        'Tên một số nước/đại dương/sông: the UK, the Pacific, the Mekong.',
      ] },
      { h: 'No article (KHÔNG mạo từ)' },
      { ul: [
        'Danh từ chung chung số nhiều/không đếm được: I love music. Dogs are loyal.',
        'Tên người, đa số tên nước, thành phố: Mary, Vietnam, Hanoi.',
        'Bữa ăn, môn thể thao, ngôn ngữ: have breakfast, play football, speak English.',
      ] },
      { h: 'Quy tắc đọc quyết định a/an' },
      { p: 'Dựa vào ÂM ĐẦU khi đọc, không phải chữ cái: "an hour" (h câm → âm nguyên âm), "a university" (đọc /j/ → âm phụ âm).' },
      { note: 'Khi đã có "my, this, that, the" thì KHÔNG thêm a/an: "my a book" ❌ → "my book" ✔.' },
    ],
    [
      { q: 'Chọn: "I saw (a/an) ___ elephant at the zoo."', a: 'an. — elephant bắt đầu bằng âm nguyên âm /e/.' },
      { q: 'Chọn: "(A/An/The) ___ sun rises in the east."', a: 'The. — sun là vật duy nhất → the.' },
      { q: 'Điền a/an/the/Ø (không mạo từ): "She is ___ honest girl, and she plays ___ piano very well. I love ___ music."', a: 'an honest girl (h câm → an), the piano (nhạc cụ → the), Ø music (chung chung → không mạo từ).' },
    ]
  ),

  'S8TA-w17-quiz': L(
    'Unit 8 — Speaking practice: introducing places',
    'Tuần này luyện kỹ năng NÓI: giới thiệu một địa danh — vị trí, đặc điểm nổi bật, lý do nên đến. Vận dụng từ vựng và cấu trúc của Unit 8.',
    [
      'Nắm các cấu trúc giới thiệu địa danh.',
      'Dùng từ vựng mô tả nơi chốn.',
      'Trình bày tự tin, mạch lạc.',
    ],
    [
      { h: 'Useful structures — Giới thiệu địa danh' },
      { ul: [
        '... is located / situated in... — nằm ở...',
        '... is famous / well-known for... — nổi tiếng vì...',
        '... is one of the most ... in ... — một trong những ... nhất...',
        "It's a great place to + V — là nơi tuyệt vời để...",
      ] },
      { h: 'Từ vựng mô tả nơi chốn' },
      { ul: [
        'scenery — phong cảnh', 'landmark — địa danh nổi tiếng',
        'attraction — điểm thu hút', 'historic / ancient — cổ kính',
        'breathtaking — ngoạn mục', 'must-see — đáng xem',
      ] },
      { h: 'Trình tự giới thiệu (3 bước)' },
      { ul: [
        '1) Tên + vị trí: "Hanoi is the capital of Vietnam."',
        '2) Đặc điểm nổi bật: "It is famous for its Old Quarter and lakes."',
        '3) Mời gọi: "You should visit it at least once!"',
      ] },
      { h: 'Cụm nối ý (linking)' },
      { p: 'first of all, in addition, moreover, what\'s more, finally — giúp bài nói trôi chảy.' },
      { note: 'Khi mô tả, kết hợp SO SÁNH NHẤT để gây ấn tượng: "Ha Long Bay is one of THE MOST beautiful bays in the world."' },
    ],
    [
      { q: 'Giới thiệu ngắn quê em (tiếng Anh).', a: 'My hometown is Hanoi. It is the capital of Vietnam, famous for the Old Quarter and Hoan Kiem Lake. It’s a great place to enjoy street food.' },
      { q: 'Dịch: "Hue is famous for its ancient citadel."', a: 'Huế nổi tiếng với thành cổ.' },
      { q: 'Dùng cấu trúc "one of the most...": giới thiệu Vịnh Hạ Long.', a: 'Ha Long Bay is one of the most beautiful natural wonders in Vietnam. It is located in Quang Ninh.' },
    ]
  ),

  'S8TA-w18-quiz': L(
    'Review HK1',
    'Tuần cuối học kỳ I, cô và các em hệ thống lại từ vựng và ngữ pháp của Unit 1-8: từ leisure activities đến articles. Đây là buổi ôn tập tổng hợp trước kiểm tra.',
    [
      'Ôn từ vựng theo 8 chủ đề của Unit 1-8.',
      'Hệ thống các điểm ngữ pháp chính HK1.',
      'Nhận biết và tránh lỗi sai thường gặp.',
    ],
    [
      { h: 'Vocabulary topics (Unit 1-8)' },
      { ul: [
        'Leisure activities — hang out, do crafts, play board games.',
        'Countryside vs city — paddy field, harvest / urban, skyscraper.',
        'Peoples of Vietnam — ethnic group, costume, tradition.',
        'Customs & traditions — worship ancestors, give lucky money.',
        'Festivals — parade, lantern, dragon dance.',
        'Folk tales — hero, villain, moral lesson.',
        'Pollution — air/water pollution, 3R.',
        'English speaking countries — the UK, the USA, landmark.',
      ] },
      { h: 'Grammar summary' },
      { ul: [
        'Verbs + V-ing / to-V (verbs of liking).',
        'Comparative of adverbs (faster, more carefully).',
        'How many / How much.',
        'should / shouldn\'t (lời khuyên).',
        'Simple past, past continuous, used to.',
        'Conditional type 1 (If + present, will + V).',
        'Articles a / an / the.',
      ] },
      { h: 'Lỗi thường gặp' },
      { ul: [
        'Sau modal (should) lại thêm "to" hoặc -s: "should to go" ❌.',
        'Sau "if" dùng "will": "If you will..." ❌.',
        'Nhầm how many / how much (money → much).',
        'Quên đảo thì trong past simple + past continuous.',
      ] },
      { h: 'Chiến lược làm bài' },
      { p: 'Đọc kỹ DẤU HIỆU THỜI GIAN/NGỮ CẢNH trước → xác định thì/cấu trúc → rồi mới chia động từ.' },
      { note: 'Mẹo: gạch chân từ khoá (yesterday, if, should, how much...) trong đề rồi mới làm — giảm sai vặt.' },
    ],
    [
      { q: 'Chọn dạng đúng: "Should I ___ (study/studying/to study) harder?"', a: 'study. — sau modal verb dùng V nguyên thể.' },
      { q: 'Hoàn thành câu điều kiện: "If it ___ (rain) tomorrow, we ___ (cancel) the trip."', a: 'rains / will cancel. — If + present simple, will + V.' },
      { q: 'Sửa lỗi: "Lan used to lived in the countryside and she enjoys to swim."', a: 'Lan used to LIVE in the countryside and she enjoys SWIMMING. — used to + V nguyên thể; enjoy + V-ing.' },
    ]
  ),

  'S8TA-w19-quiz': L(
    'Unit 9 — Natural Disasters',
    'Mở đầu HK2 là Unit 9 "Natural Disasters" — thiên tai. Tuần này ta học từ vựng về các loại thiên tai và biện pháp ứng phó.',
    [
      'Học từ vựng về các loại thiên tai.',
      'Mô tả thiệt hại và biện pháp phòng tránh.',
      'Dùng động từ chỉ hậu quả: destroy, damage, kill...',
    ],
    [
      { h: 'Vocabulary — Natural disasters' },
      { ul: [
        'earthquake /ˈɜːθ.kweɪk/ — động đất', 'flood /flʌd/ — lũ lụt',
        'tsunami /tsuːˈnɑː.mi/ — sóng thần', 'storm / typhoon — bão',
        'volcanic eruption — núi lửa phun trào', 'drought /draʊt/ — hạn hán',
        'landslide /ˈlænd.slaɪd/ — lở đất', 'forest fire — cháy rừng',
      ] },
      { h: 'Động từ chỉ hậu quả' },
      { ul: [
        'destroy — phá huỷ', 'damage — làm hư hại',
        'kill — làm chết', 'sweep away — cuốn trôi',
        'collapse — sụp đổ', 'bury — chôn vùi',
      ] },
      { h: 'Ứng phó (response)' },
      { ul: [
        'evacuate /ɪˈvæk.ju.eɪt/ — sơ tán', 'rescue /ˈres.kjuː/ — cứu hộ',
        'shelter /ˈʃel.tər/ — nơi trú ẩn', 'warn / warning — cảnh báo',
        'prepare / be prepared — chuẩn bị / sẵn sàng',
      ] },
      { h: 'Mẫu câu' },
      { ul: [
        'A + disaster + hit / struck + place. — A storm hit central Vietnam.',
        'It destroyed / damaged + N.',
        'Before/During a..., we should + V.',
      ] },
      { note: '"Storm" là bão nói chung; "typhoon" là bão lớn ở khu vực Tây Bắc Thái Bình Dương (như VN); "hurricane" là bão ở Đại Tây Dương. Đều là gió xoáy nhiệt đới.' },
    ],
    [
      { q: 'Dịch: "Floods often happen in central Vietnam."', a: 'Lũ lụt thường xảy ra ở miền Trung Việt Nam.' },
      { q: 'Trả lời: "What should we do before a typhoon?"', a: 'We should prepare food and water, and stay indoors. — chuẩn bị thức ăn, nước và ở trong nhà.' },
      { q: 'Hoàn thành động từ hậu quả: "The earthquake ___ (phá huỷ) many houses and ___ (làm chết) ten people."', a: 'destroyed / killed. — Trận động đất phá huỷ nhiều nhà và làm chết 10 người.' },
    ]
  ),

  'S8TA-w20-quiz': L(
    'Unit 9 — Past simple vs past continuous (recap)',
    'Ngữ pháp Unit 9 áp dụng QUÁ KHỨ ĐƠN và QUÁ KHỨ TIẾP DIỄN vào bối cảnh thiên tai — kể lại chuyện gì đang xảy ra khi thảm hoạ ập đến.',
    [
      'Củng cố cấu trúc past continuous.',
      'Kết hợp hai thì để kể về thiên tai.',
      'Đặt câu phức với when / while.',
    ],
    [
      { h: 'Grammar — Past Continuous (ôn)' },
      { p: 'was/were + V-ing — hành động đang diễn ra tại một thời điểm trong quá khứ.' },
      { ul: [
        'I was sleeping when the earthquake started.',
        'They were watching TV when the storm hit the city.',
      ] },
      { h: 'Past simple — hành động xen vào' },
      { p: 'Hành động NGẮN/ĐỘT NGỘT (started, hit, came) dùng past simple; bối cảnh ĐANG DIỄN RA dùng past continuous.' },
      { h: 'When vs While (ôn)' },
      { ul: [
        'When + past simple (hành động ngắn): When the flood came, ...',
        'While + past continuous (hành động dài): While people were sleeping, ...',
      ] },
      { h: 'Trật tự mệnh đề' },
      { p: 'Hai vế đảo được. Khi mệnh đề "when/while" đứng đầu thì có dấu phẩy; đứng sau thì không.' },
      { h: 'Câu kể nhiều hành động' },
      { p: 'Nhiều hành động ĐỒNG THỜI đang diễn ra → đều past continuous: "People were running and children were crying when the water rose."' },
      { note: 'Mẹo kể chuyện thiên tai: dùng past continuous để "dựng cảnh nền" (đang làm gì), rồi past simple cho "biến cố" (thiên tai ập đến).' },
    ],
    [
      { q: 'Hoàn thành: "When the flood ___ (come), people ___ (run) to higher ground."', a: 'came / were running. — flood came (ngắn) → past simple; were running (đang diễn ra) → past continuous.' },
      { q: 'Dịch: "I was walking home when the storm started."', a: 'Tôi đang đi bộ về nhà thì cơn bão bắt đầu.' },
      { q: 'Dùng "while": "___ we ___ (have) dinner, the earthquake ___ (hit)."', a: 'While we were having dinner, the earthquake hit. — while + past continuous; hit (biến cố) → past simple.' },
    ]
  ),

  'S8TA-w21-quiz': L(
    'Unit 10 — Communication',
    'Unit 10 "Communication" khám phá các hình thức giao tiếp trong thời đại số. Tuần này ta học từ vựng về giao tiếp truyền thống và hiện đại.',
    [
      'Học từ vựng về giao tiếp (verbal/non-verbal, digital).',
      'Phân biệt các phương tiện giao tiếp.',
      'Nói về ưu, nhược điểm của giao tiếp trực tuyến.',
    ],
    [
      { h: 'Vocabulary — Communication' },
      { ul: [
        'communication /kəˌmjuː.nɪˈkeɪ.ʃən/ — sự giao tiếp',
        'verbal /ˈvɜː.bəl/ — bằng lời nói', 'non-verbal — phi ngôn từ',
        'body language — ngôn ngữ cơ thể', 'gesture /ˈdʒes.tʃər/ — cử chỉ',
        'facial expression — biểu cảm khuôn mặt', 'eye contact — giao tiếp bằng mắt',
      ] },
      { h: 'Digital communication (giao tiếp số)' },
      { ul: [
        'social media — mạng xã hội', 'video call — gọi video',
        'instant messaging — nhắn tin tức thì', 'emoji /iˈmoʊ.dʒi/ — biểu tượng cảm xúc',
        'smart device — thiết bị thông minh', 'holographic communication — giao tiếp ảnh nổi (tương lai)',
      ] },
      { h: 'Hình thức giao tiếp' },
      { ul: [
        'face-to-face — trực tiếp', 'online — trực tuyến',
        'written communication — giao tiếp bằng văn bản',
      ] },
      { h: 'Mẫu câu thảo luận' },
      { ul: [
        '... is an important part of communication.',
        'One advantage / disadvantage of ... is...',
        'In the future, people will communicate by...',
      ] },
      { note: '"Communication" là danh từ không đếm được. Phân biệt: "communicate" (động từ), "communication" (danh từ), "communicative" (tính từ — thích giao tiếp).' },
    ],
    [
      { q: 'Dịch: "Body language is an important part of communication."', a: 'Ngôn ngữ cơ thể là một phần quan trọng của giao tiếp.' },
      { q: 'Kể 3 hình thức giao tiếp bằng tiếng Anh.', a: 'Verbal, non-verbal, and written communication.' },
      { q: 'Nêu một ưu điểm của giao tiếp trực tuyến (tiếng Anh).', a: 'One advantage of online communication is that we can talk to people far away through video calls.' },
    ]
  ),

  'S8TA-w22-quiz': L(
    'Unit 10 — Future continuous & passive voice (intro)',
    'Ngữ pháp Unit 10 gồm hai điểm: TƯƠNG LAI TIẾP DIỄN (dự đoán hành động đang diễn ra trong tương lai) và mở đầu CÂU BỊ ĐỘNG.',
    [
      'Nắm cấu trúc future continuous.',
      'Hiểu cấu trúc cơ bản của câu bị động.',
      'Phân biệt câu chủ động và bị động.',
    ],
    [
      { h: 'Grammar — Future Continuous' },
      { p: 'Cấu trúc: S + will be + V-ing. Diễn tả hành động sẽ ĐANG diễn ra tại một thời điểm trong tương lai.' },
      { ul: [
        'This time tomorrow, I will be flying to London.',
        "At 8 p.m. tonight, we'll be having dinner.",
        'Phủ định: won\'t be + V-ing; Nghi vấn: Will + S + be + V-ing?',
      ] },
      { h: 'Dấu hiệu future continuous' },
      { p: 'at this time tomorrow, at 8 p.m. next..., this time next year — một mốc thời gian cụ thể trong tương lai.' },
      { h: 'Grammar — Passive Voice (introduction)' },
      { p: 'Cấu trúc cơ bản: S + be + V3/-ed (+ by + tác nhân).' },
      { ul: [
        'Active: People speak English worldwide.',
        'Passive: English is spoken (by people) worldwide.',
      ] },
      { h: 'Cách chuyển chủ động → bị động' },
      { ul: [
        '1) Tân ngữ câu chủ động → chủ ngữ câu bị động.',
        '2) Chia "be" theo thì + V3.',
        '3) Chủ ngữ cũ → "by + O" (có thể lược bỏ nếu không quan trọng).',
      ] },
      { h: 'Khi nào dùng bị động' },
      { p: 'Khi tác nhân không quan trọng/không rõ, hoặc muốn nhấn mạnh đối tượng bị tác động.' },
      { note: '"by + agent" thường bỏ đi nếu tác nhân chung chung (people, someone): "English is spoken worldwide." (không cần "by people").' },
    ],
    [
      { q: 'Dịch: "By 7 p.m., we will be having dinner."', a: 'Đến 7 giờ tối, chúng tôi sẽ đang ăn tối. — future continuous mô tả hành động đang diễn ra tại mốc tương lai.' },
      { q: 'Chuyển sang bị động: "Vietnamese people speak Vietnamese."', a: 'Vietnamese is spoken (by Vietnamese people). — tân ngữ "Vietnamese" thành chủ ngữ.' },
      { q: 'Hoàn thành future continuous: "This time next week, she ___ (travel) around Australia."', a: 'will be travelling. — will be + V-ing.' },
    ]
  ),

  'S8TA-w23-quiz': L(
    'Unit 11 — Science and Technology',
    'Unit 11 "Science and Technology" nói về vai trò của khoa học và công nghệ. Tuần này ta học từ vựng về phát minh, thiết bị và tác động của công nghệ.',
    [
      'Học từ vựng về khoa học và công nghệ.',
      'Nói về phát minh và nhà phát minh.',
      'Thảo luận lợi ích và rủi ro của công nghệ.',
    ],
    [
      { h: 'Vocabulary — Science & Technology' },
      { ul: [
        'invention /ɪnˈven.ʃən/ — phát minh', 'inventor — nhà phát minh',
        'discovery /dɪˈskʌv.ər.i/ — khám phá', 'technology /tekˈnɒl.ə.dʒi/ — công nghệ',
        'device /dɪˈvaɪs/ — thiết bị', 'innovation — sự đổi mới',
        'artificial intelligence (AI) — trí tuệ nhân tạo', 'robot — người máy',
      ] },
      { h: 'Động từ chủ đề' },
      { ul: [
        'invent — phát minh', 'discover — khám phá',
        'develop — phát triển', 'replace — thay thế',
        'benefit (from) — hưởng lợi', 'rely on — dựa vào',
      ] },
      { h: 'Lợi ích và rủi ro' },
      { ul: [
        'Lợi ích: save time, improve healthcare, connect people.',
        'Rủi ro: lose jobs, become lazy, lack privacy.',
      ] },
      { h: 'Mẫu câu' },
      { ul: [
        '... was invented by ... in (năm). — bị động + by.',
        '... is changing the way we + V.',
        'Technology has both benefits and drawbacks.',
      ] },
      { note: 'Phân biệt: "invention" (phát minh ra cái MỚI: bóng đèn, máy bay) khác "discovery" (tìm ra cái ĐÃ CÓ: lực hấp dẫn, châu Mỹ).' },
    ],
    [
      { q: 'Dịch: "AI is changing many industries."', a: 'Trí tuệ nhân tạo đang thay đổi nhiều ngành công nghiệp.' },
      { q: 'Kể 2 phát minh quan trọng bằng tiếng Anh.', a: 'The Internet and the smartphone / electricity.' },
      { q: 'Phân biệt invent/discover: "Edison ___ the light bulb; Newton ___ gravity."', a: 'invented / discovered. — Edison phát minh bóng đèn (cái mới); Newton khám phá lực hấp dẫn (cái đã tồn tại).' },
    ]
  ),

  'S8TA-w24-quiz': L(
    'Unit 11 — Reported speech (basic statements)',
    'Ngữ pháp Unit 11: CÂU TƯỜNG THUẬT cơ bản (câu trần thuật). Học cách chuyển lời nói trực tiếp thành gián tiếp với quy tắc lùi thì.',
    [
      'Nắm quy tắc lùi thì (backshift).',
      'Đổi đại từ và trạng từ thời gian/nơi chốn.',
      'Tường thuật câu trần thuật chính xác.',
    ],
    [
      { h: 'Grammar — Reported Speech (statements)' },
      { p: 'Cấu trúc: S + said (that) + mệnh đề (đã lùi thì). Có thể giữ hoặc bỏ "that".' },
      { h: 'Lùi thì (tense backshift)' },
      { ul: [
        'present simple → past simple',
        'present continuous → past continuous',
        'present perfect / past simple → past perfect',
        'will → would; can → could; may → might; must → had to',
      ] },
      { h: 'Đổi đại từ' },
      { ul: [
        'I → he/she; we → they', 'my → his/her; our → their',
        'you → I/me/we (tuỳ ngữ cảnh)',
      ] },
      { h: 'Đổi trạng từ thời gian/nơi chốn' },
      { ul: [
        'now → then; today → that day', 'tomorrow → the next day',
        'yesterday → the day before', 'here → there; this → that',
      ] },
      { h: 'say vs tell' },
      { p: 'say (+ that): He said (that)... — không có tân ngữ người. tell + ai + that: He told me (that)... — có tân ngữ người.' },
      { h: 'Ví dụ chuyển đổi' },
      { p: 'Direct: He said, "I am happy." → Reported: He said (that) he was happy.' },
      { note: 'Sự thật hiển nhiên KHÔNG lùi thì: "The teacher said the Earth IS round." (vẫn dùng present vì là chân lý).' },
    ],
    [
      { q: 'Tường thuật: She said, "I love English."', a: 'She said (that) she loved English. — present → past, I → she.' },
      { q: 'Tường thuật: He said, "I will help you."', a: 'He said (that) he would help me. — will → would, you → me.' },
      { q: 'Dùng "tell": Mai said to me, "I am doing my homework."', a: 'Mai told me (that) she was doing her homework. — tell + me; present continuous → past continuous.' },
    ]
  ),

  'S8TA-w25-quiz': L(
    'Unit 12 — Life on Other Planets',
    'Unit 12 "Life on Other Planets" khép lại chương trình với chủ đề vũ trụ. Tuần này ta học từ vựng về không gian, hành tinh và sự sống ngoài Trái Đất.',
    [
      'Học từ vựng về vũ trụ và khám phá không gian.',
      'Bàn về khả năng có sự sống trên hành tinh khác.',
      'Dùng từ vựng để dự đoán về tương lai vũ trụ.',
    ],
    [
      { h: 'Vocabulary — Space' },
      { ul: [
        'planet /ˈplæn.ɪt/ — hành tinh', 'galaxy /ˈɡæl.ək.si/ — thiên hà',
        'the universe /ˈjuː.nɪ.vɜːs/ — vũ trụ', 'solar system — hệ Mặt Trời',
        'orbit /ˈɔː.bɪt/ — quỹ đạo', 'gravity /ˈɡræv.ə.ti/ — trọng lực',
        'spacecraft / spaceship — tàu vũ trụ', 'satellite /ˈsæt.əl.aɪt/ — vệ tinh',
      ] },
      { h: 'Sự sống ngoài Trái Đất' },
      { ul: [
        'alien /ˈeɪ.li.ən/ — người ngoài hành tinh',
        'extraterrestrial — sinh vật ngoài Trái Đất',
        'astronaut /ˈæs.trə.nɔːt/ — phi hành gia',
        'UFO (unidentified flying object) — vật thể bay không xác định',
      ] },
      { h: 'Động từ chủ đề' },
      { ul: [
        'explore — khám phá', 'discover — phát hiện',
        'launch — phóng (tàu/vệ tinh)', 'land on — hạ cánh xuống',
        'survive — sống sót', 'colonise — định cư',
      ] },
      { h: 'Các hành tinh trong Hệ Mặt Trời' },
      { p: 'Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune. (Sao Hoả = Mars — hành tinh hay được nhắc khi bàn về sự sống.)' },
      { note: 'Tên hành tinh VIẾT HOA: Mars, Venus. "the Earth" và "the Moon" thường có "the"; "the Sun" cũng vậy.' },
    ],
    [
      { q: 'Dịch: "Mars is the fourth planet from the Sun."', a: 'Sao Hoả là hành tinh thứ tư tính từ Mặt Trời.' },
      { q: 'Trả lời: "Do you believe in aliens?"', a: 'Yes, I think there might be life on other planets. / No, I don\'t believe in aliens.' },
      { q: 'Hoàn thành: "Astronauts ___ (explore) space in a ___ (tàu vũ trụ)."', a: 'explore / spacecraft (spaceship). — Phi hành gia khám phá không gian bằng tàu vũ trụ.' },
    ]
  ),

  'S8TA-w26-quiz': L(
    'Unit 12 — Modal verbs: may / might',
    'Ngữ pháp Unit 12: modal MAY và MIGHT diễn tả khả năng (possibility) — rất hợp để dự đoán về sự sống ngoài hành tinh và tương lai vũ trụ.',
    [
      'Phân biệt may và might.',
      'Dùng may/might để diễn tả khả năng.',
      'Biết cách dùng may để xin phép lịch sự.',
    ],
    [
      { h: 'Grammar — May / Might' },
      { p: 'May/Might + V (bare) — diễn tả KHẢ NĂNG (perhaps, có thể). Might thường ít chắc chắn hơn may một chút.' },
      { ul: [
        'It may rain tomorrow. — Có thể mai mưa.',
        'There might be life on Mars. — Có thể có sự sống trên Sao Hoả (ít chắc chắn).',
      ] },
      { h: 'Phủ định' },
      { ul: [
        'may not / might not + V — có thể không.',
        'VD: He might not come to the party.',
        'KHÔNG viết tắt "mayn\'t"; "mightn\'t" hiếm dùng.',
      ] },
      { h: 'May — xin phép lịch sự' },
      { p: 'May I + V...? là cách xin phép trang trọng hơn "Can I...?": "May I come in?" / "May I ask a question?"' },
      { h: 'So sánh mức độ chắc chắn' },
      { ul: [
        'will — gần như chắc chắn (~90%).',
        'may — có thể (~50%).',
        'might / could — có thể nhưng ít chắc hơn (~30-40%).',
      ] },
      { h: 'Quy tắc modal (ôn)' },
      { p: 'Sau may/might là V NGUYÊN THỂ; không thêm -s ngôi 3; không dùng "to".' },
      { note: '"May not" KHÔNG có nghĩa "cấm" — chỉ là "có thể không". Để cấm dùng "mustn\'t". VD: "It may not rain." = có thể không mưa.' },
    ],
    [
      { q: 'Dịch: "There might be life on Mars."', a: 'Có thể có sự sống trên Sao Hoả. — might diễn tả khả năng không chắc chắn.' },
      { q: 'Đặt câu với may (possibility).', a: 'It may snow this winter in the northern mountains. — may + V nguyên thể.' },
      { q: 'Phân biệt nghĩa: "He may not pass." và "He mustn\'t enter."', a: 'Câu 1: Có thể anh ấy không đậu (khả năng). Câu 2: Anh ấy không được vào (cấm). may not ≠ mustn\'t.' },
    ]
  ),

  'S8TA-w27-quiz': L(
    'Unit 7–12 — Vocabulary review',
    'Tuần này ôn lại từ vựng các Unit 7-12: pollution, English speaking countries, natural disasters, communication, science & technology, space — theo từng chủ đề.',
    [
      'Ôn từ vựng 6 chủ đề Unit 7-12.',
      'Liên hệ từ vựng vào câu/ngữ cảnh.',
      'Mở rộng vốn từ qua collocation.',
    ],
    [
      { h: 'Topic 1 — Pollution & Environment' },
      { ul: ['air/water/noise pollution, litter, recycle, exhaust fumes, 3R.'] },
      { h: 'Topic 2 — English speaking countries' },
      { ul: ['the UK, the USA, Australia, landmark, British/American English.'] },
      { h: 'Topic 3 — Natural disasters' },
      { ul: ['earthquake, flood, typhoon, drought, evacuate, rescue, destroy.'] },
      { h: 'Topic 4 — Communication' },
      { ul: ['verbal/non-verbal, body language, social media, video call, emoji.'] },
      { h: 'Topic 5 — Science & Technology' },
      { ul: ['invention, inventor, device, AI, robot, innovation, develop.'] },
      { h: 'Topic 6 — Space' },
      { ul: ['planet, galaxy, the universe, alien, astronaut, spacecraft, orbit.'] },
      { h: 'Mẹo học từ vựng' },
      { p: 'Học theo CỤM (collocation) + câu mẫu, không học từ rời: "reduce pollution", "launch a spacecraft", "make eye contact".' },
      { note: 'Khi ôn, tự đặt 1 câu cho mỗi từ và gắn vào chủ đề — giúp nhớ lâu và dùng đúng ngữ cảnh.' },
    ],
    [
      { q: 'Dịch: "Recycling helps protect the environment."', a: 'Tái chế giúp bảo vệ môi trường.' },
      { q: 'Trả lời: "What is AI?"', a: 'AI (artificial intelligence) is the intelligence shown by machines, which can learn and solve problems.' },
      { q: 'Ghép collocation đúng: "launch / make / reduce" + "a spacecraft / eye contact / pollution".', a: 'launch a spacecraft, make eye contact, reduce pollution.' },
    ]
  ),

  'S8TA-w28-quiz': L(
    'Grammar — Comparatives review (intermediate)',
    'Tuần này ôn sâu hệ thống SO SÁNH ở mức trung cấp: so sánh hơn, so sánh nhất, so sánh ngang bằng và so sánh kép — gói gọn toàn bộ comparison của lớp 8.',
    [
      'Hệ thống so sánh hơn và so sánh nhất.',
      'Dùng cấu trúc as ... as (ngang bằng).',
      'Nắm so sánh kép "the more... the more...".',
    ],
    [
      { h: 'Comparative (so sánh hơn)' },
      { ul: [
        'Tính từ/trạng từ ngắn: + -er + than → faster than, taller than.',
        'Dài: more + adj/adv + than → more carefully than, more beautiful than.',
        'Bất quy tắc: good→better, bad→worse, far→farther/further.',
      ] },
      { h: 'Superlative (so sánh nhất)' },
      { ul: [
        'Ngắn: the + -est → the fastest, the tallest.',
        'Dài: the most + adj → the most beautiful.',
        'Bất quy tắc: the best, the worst, the farthest.',
      ] },
      { h: 'Equality (so sánh ngang bằng)' },
      { ul: [
        'as + adj/adv + as → She is as tall as her brother.',
        'Phủ định: not as/so + adj + as → He isn\'t as fast as me.',
      ] },
      { h: 'Double comparative (so sánh kép)' },
      { ul: [
        'The + comparative ..., the + comparative ... → The more you practise, the better you get.',
        'Diễn tả "càng... càng...".',
      ] },
      { h: 'Tăng tiến (progressive comparison)' },
      { p: 'comparative + and + comparative → "It is getting hotter and hotter." (ngày càng nóng).' },
      { note: 'Sau "than" và "as" có thể dùng đại từ tân ngữ (than me, as him) trong văn nói, hoặc đầy đủ (than I am) trong văn trang trọng.' },
    ],
    [
      { q: 'Tạo so sánh nhất: "Mt. Everest is ___ (high) mountain in the world."', a: 'the highest. — tính từ ngắn → the + -est.' },
      { q: 'Dịch so sánh kép: "The harder you study, the more you learn."', a: 'Bạn càng học chăm chỉ, bạn càng học được nhiều.' },
      { q: 'Dùng "as...as": "My bag is heavy. Your bag is heavy too." → viết 1 câu.', a: 'My bag is as heavy as yours. — so sánh ngang bằng.' },
    ]
  ),

  'S8TA-w29-quiz': L(
    'Grammar — Passive voice (simple tenses)',
    'Tuần này ôn sâu CÂU BỊ ĐỘNG ở các thì đơn: hiện tại đơn, quá khứ đơn, tương lai đơn — kỹ năng quan trọng cho viết và đọc hiểu lớp 8.',
    [
      'Nắm câu bị động ở present/past/future simple.',
      'Thành thạo quy trình chuyển chủ động → bị động.',
      'Biết khi nào nên dùng bị động.',
    ],
    [
      { h: 'Grammar — Passive in simple tenses' },
      { ul: [
        'Present simple: S + am/is/are + V3. — English is taught in schools.',
        'Past simple: S + was/were + V3. — The cake was made by my mom.',
        'Future simple: S + will be + V3. — The project will be finished tomorrow.',
      ] },
      { h: 'Quy trình chuyển đổi (3 bước)' },
      { ul: [
        '1) Tân ngữ chủ động → chủ ngữ bị động.',
        '2) Chia "be" đúng thì + V3 của động từ chính.',
        '3) Chủ ngữ cũ → "by + O" (lược bỏ nếu không quan trọng).',
      ] },
      { h: 'Chia "be" theo thì' },
      { ul: [
        'Present: am/is/are', 'Past: was/were', 'Future: will be',
      ] },
      { h: 'Khi nào dùng bị động' },
      { ul: [
        'Tác nhân không rõ/không quan trọng: My bike was stolen.',
        'Nhấn mạnh đối tượng bị tác động: The Mona Lisa was painted by Da Vinci.',
        'Văn phong trang trọng, khoa học, tin tức.',
      ] },
      { h: 'Lưu ý số ít/số nhiều' },
      { p: '"be" phải khớp với chủ ngữ MỚI: "These houses WERE built..." (số nhiều → were).' },
      { note: 'Nhớ dùng V3 (past participle), không phải V2: "was BUILT" (không "was build"), "is SPOKEN" (không "is speak").' },
    ],
    [
      { q: 'Chuyển sang bị động: "They built this house in 1990."', a: 'This house was built in 1990. — past simple → was + V3.' },
      { q: 'Chuyển sang bị động: "Many people speak Spanish in South America."', a: 'Spanish is spoken (by many people) in South America. — present simple → is + V3.' },
      { q: 'Chuyển sang bị động (tương lai): "They will hold the festival next month."', a: 'The festival will be held next month. — future → will be + V3.' },
    ]
  ),

  'S8TA-w30-quiz': L(
    'Reading & Vocabulary — Festivals',
    'Tuần này luyện ĐỌC HIỂU và mở rộng từ vựng về các lễ hội trên thế giới — kết hợp kỹ năng đọc với kiến thức văn hoá.',
    [
      'Mở rộng từ vựng về lễ hội thế giới.',
      'Rèn kỹ năng đọc hiểu: tìm thông tin chi tiết.',
      'So sánh lễ hội Việt Nam và thế giới.',
    ],
    [
      { h: 'Vocabulary — World festivals' },
      { ul: [
        'Christmas (25 Dec) — Lễ Giáng sinh', 'New Year (1 Jan) — Tết Dương lịch',
        'Halloween (31 Oct) — Lễ hoá trang', 'Easter — Lễ Phục sinh',
        'Carnival (Brazil) — Lễ hội hoá trang Brazil', 'Diwali (India) — Lễ hội ánh sáng',
        'Thanksgiving (USA) — Lễ Tạ ơn',
      ] },
      { h: 'Từ vựng mô tả lễ hội' },
      { ul: [
        'take place / be held — diễn ra', 'decorate — trang trí',
        'costume — trang phục hoá trang', 'tradition — truyền thống',
        'gather — tụ họp', 'exchange gifts — trao đổi quà',
      ] },
      { h: 'Kỹ năng đọc hiểu (reading skills)' },
      { ul: [
        'Skimming — đọc lướt lấy ý chính.',
        'Scanning — đọc quét tìm thông tin cụ thể (ngày, tên, số).',
        'Đoán nghĩa từ qua ngữ cảnh (context clues).',
      ] },
      { h: 'Mẫu câu trả lời reading' },
      { p: 'When is ...? — It is on/in... What do people do? — They + V.' },
      { note: 'Khi đọc tìm NGÀY/THÁNG, hãy scan các con số và tên tháng viết hoa (December, October) thay vì đọc từng chữ.' },
    ],
    [
      { q: 'Trả lời: "When is Christmas?"', a: 'Christmas is on December 25th (the 25th of December).' },
      { q: 'Trả lời: "What is Halloween?"', a: 'Halloween is a festival on October 31st when people dress up in costumes and children go trick-or-treating.' },
      { q: 'So sánh: nêu một điểm giống giữa Tet và Christmas (tiếng Anh).', a: 'Both Tet and Christmas are family festivals when people gather, decorate their homes, and exchange gifts.' },
    ]
  ),

  'S8TA-w31-quiz': L(
    'Speaking — Giving opinions',
    'Tuần này luyện kỹ năng NÓI: đưa ra ý kiến, đồng tình hoặc phản đối lịch sự và tham gia thảo luận — kỹ năng then chốt của lớp 8.',
    [
      'Nắm các cấu trúc đưa ý kiến.',
      'Đồng ý / không đồng ý một cách lịch sự.',
      'Bảo vệ quan điểm bằng lý do.',
    ],
    [
      { h: 'Giving opinions — Đưa ý kiến' },
      { ul: [
        'I think / I believe (that)... — Tôi nghĩ rằng...',
        'In my opinion, ... — Theo ý tôi,...',
        'It seems to me that... — Với tôi thì...',
        'From my point of view, ... — Theo quan điểm của tôi,...',
      ] },
      { h: 'Agreeing — Đồng ý' },
      { ul: [
        'I agree with you.', "That's a good point.",
        'I think so too.', "You're absolutely right.",
      ] },
      { h: 'Disagreeing politely — Phản đối lịch sự' },
      { ul: [
        'I see your point, but...', "I'm not sure about that.",
        "I'm afraid I disagree.", 'I understand, however...',
      ] },
      { h: 'Đưa lý do (giving reasons)' },
      { p: 'Dùng "because / so / that\'s why" để giải thích: "I think students should read more because reading improves vocabulary."' },
      { h: 'Cấu trúc một ý kiến hoàn chỉnh' },
      { p: 'Opinion (ý kiến) + Reason (lý do) + Example (ví dụ). VD: "In my opinion, uniforms are good because they show equality, for example, no one feels less fashionable."' },
      { note: 'Khi phản đối, luôn bắt đầu nhẹ nhàng ("I see your point, but...") rồi mới nêu quan điểm — giữ lịch sự trong thảo luận.' },
    ],
    [
      { q: 'Đưa ý kiến: "Should students wear uniforms?"', a: 'In my opinion, students should wear uniforms because it shows equality and saves time choosing clothes.' },
      { q: 'Phản đối lịch sự câu: "Watching TV is a waste of time."', a: 'I see your point, but I think some TV programmes, like documentaries, are educational.' },
      { q: 'Hoàn chỉnh cấu trúc Opinion + Reason: "I think reading is important ___ it ___."', a: 'because / improves our knowledge and vocabulary. — nêu lý do bằng "because".' },
    ]
  ),

  'S8TA-w32-quiz': L(
    'Writing — Email & Paragraph',
    'Tuần này luyện kỹ năng VIẾT: viết email và viết đoạn văn có bố cục rõ ràng — kỹ năng quan trọng cho bài thi viết lớp 8.',
    [
      'Nắm bố cục email (informal/formal).',
      'Nắm cấu trúc đoạn văn ba phần.',
      'Viết mạch lạc, có liên kết câu.',
    ],
    [
      { h: 'Email structure — Bố cục email' },
      { ul: [
        'Subject — tiêu đề ngắn gọn, rõ ràng.',
        'Greeting — Dear Tom, / Hi Mary, (thân mật) hoặc Dear Sir/Madam, (trang trọng).',
        'Body — nội dung chính, chia đoạn.',
        'Closing — Best regards, / Yours sincerely, (trang trọng) / Love, (thân mật).',
        'Signature — tên người viết.',
      ] },
      { h: 'Formal vs Informal email' },
      { ul: [
        'Informal: từ ngữ thân mật, viết tắt (I\'m, can\'t), Dear + tên.',
        'Formal: trang trọng, không viết tắt, Dear Sir/Madam.',
      ] },
      { h: 'Paragraph structure — Cấu trúc đoạn văn' },
      { ul: [
        'Topic sentence — câu chủ đề (ý chính).',
        'Supporting sentences — 2-3 câu hỗ trợ, có ví dụ/lý do.',
        'Concluding sentence — câu kết luận.',
      ] },
      { h: 'Linking words — Từ nối' },
      { ul: [
        'Thêm ý: and, also, in addition, moreover.',
        'Tương phản: but, however, although.',
        'Nguyên nhân-kết quả: because, so, therefore.',
        'Trình tự: first, second, finally.',
      ] },
      { note: 'Trong văn viết trang trọng, HẠN CHẾ viết tắt: dùng "I am", "do not" thay cho "I\'m", "don\'t".' },
    ],
    [
      { q: 'Viết lời chào mở đầu một email thân mật.', a: 'Dear Tom, / Hi Mary, — dùng "Dear/Hi + tên" cho email thân mật.' },
      { q: 'Viết câu chủ đề (topic sentence) cho đoạn "My hobby".', a: 'I have many hobbies, but my favourite is reading books. — câu nêu ý chính.' },
      { q: 'Chọn cách kết thư trang trọng và thân mật.', a: 'Trang trọng: Yours sincerely, / Best regards,. Thân mật: Love, / See you soon,.' },
    ]
  ),

  'S8TA-w33-quiz': L(
    'Listening — Numbers, dates, prices',
    'Tuần này rèn kỹ năng NGHE thông tin số liệu: số đếm, ngày tháng và giá cả — những chi tiết dễ nghe nhầm nhất trong bài nghe.',
    [
      'Phân biệt số dễ nhầm khi nghe (-teen vs -ty).',
      'Nghe và viết ngày tháng theo chuẩn Anh/Mỹ.',
      'Nghe và ghi giá tiền chính xác.',
    ],
    [
      { h: 'Numbers — Số đếm' },
      { ul: [
        'Phân biệt trọng âm: thirTEEN (13) vs THIRty (30); fourTEEN vs FORty.',
        'Số lớn: 1,000 = a/one thousand; 1,000,000 = a/one million.',
        'Số thập phân: 3.5 = three point five.',
      ] },
      { h: 'Dates — Ngày tháng' },
      { ul: [
        'British: 25/12/2024 = the 25th of December 2024.',
        'American: 12/25/2024 = December 25th, 2024.',
        'Đọc năm: 2024 = twenty twenty-four; 1999 = nineteen ninety-nine.',
      ] },
      { h: 'Prices — Giá cả' },
      { ul: [
        '$5.99 = five dollars (and) ninety-nine cents / "five ninety-nine".',
        '£20 = twenty pounds; €15 = fifteen euros.',
        '50,000 VND = fifty thousand dong.',
      ] },
      { h: 'Mẹo nghe số' },
      { ul: [
        'Nghe TRỌNG ÂM để phân biệt -teen (trọng âm cuối) và -ty (trọng âm đầu).',
        'Nghe ngữ cảnh: giá thường có đơn vị tiền (dollars, dong).',
        'Chú ý "and" trong giá/số nhà tiếng Anh-Anh.',
      ] },
      { note: 'Ngày tháng Anh-Mỹ KHÁC nhau về thứ tự: 03/04 ở Anh là 3 April, ở Mỹ là March 4. Luôn xác định chuẩn nào trước khi ghi.' },
    ],
    [
      { q: 'Viết bằng số: "The book costs five dollars and ninety-nine cents."', a: '$5.99.' },
      { q: 'Viết ngày kiểu Anh: "March 15, 2024".', a: 'the 15th of March 2024 / 15/03/2024.' },
      { q: 'Phân biệt khi nghe: bạn nghe /ˈθɜːti/ và /θɜːˈtiːn/ — đó là số nào?', a: '/ˈTHIRty/ = 30 (trọng âm đầu); /thirTEEN/ = 13 (trọng âm cuối).' },
    ]
  ),

  'S8TA-w34-quiz': L(
    'Grammar review — Tenses',
    'Tuần này ôn tập hệ thống CÁC THÌ đã học trong năm: simple và continuous ở present/past/future — nền tảng để chia động từ đúng.',
    [
      'Phân biệt các thì simple (present/past/future).',
      'Phân biệt các thì continuous (present/past/future).',
      'Chọn thì phù hợp theo dấu hiệu thời gian.',
    ],
    [
      { h: 'Simple tenses' },
      { ul: [
        'Present simple: V/Vs (thói quen, sự thật). She loves music.',
        'Past simple: V2/-ed (quá khứ kết thúc). I visited Hue last year.',
        'Future simple: will + V (tương lai). I will travel next month.',
      ] },
      { h: 'Continuous tenses' },
      { ul: [
        'Present continuous: am/is/are + V-ing (đang xảy ra). I am studying now.',
        'Past continuous: was/were + V-ing. I was sleeping at 10 p.m.',
        'Future continuous: will be + V-ing. I will be flying at noon tomorrow.',
      ] },
      { h: 'Dấu hiệu nhận biết' },
      { ul: [
        'Present simple: every day, usually, often, always.',
        'Past simple: yesterday, last..., ago, in 2010.',
        'Future simple: tomorrow, next..., soon, I think.',
        'Continuous: now, at the moment, at 8 p.m. (mốc cụ thể).',
      ] },
      { h: 'Phân biệt simple vs continuous' },
      { p: 'Simple = sự thật/thói quen/hành động hoàn tất. Continuous = hành động ĐANG diễn ra tại một thời điểm.' },
      { h: 'Lưu ý động từ trạng thái' },
      { p: 'Động từ chỉ trạng thái (like, love, know, want, understand) KHÔNG chia continuous: "I LIKE music" (không "I am liking").' },
      { note: 'Chiến lược: tìm trạng từ thời gian trong câu trước → quyết định thì → rồi chia động từ. Đó là cách an toàn nhất.' },
    ],
    [
      { q: 'Xác định thì: "She is studying English now."', a: 'Present continuous (am/is/are + V-ing), dấu hiệu "now".' },
      { q: 'Xác định thì: "By 5 p.m. tomorrow, I will be flying to Paris."', a: 'Future continuous (will be + V-ing), mốc tương lai cụ thể.' },
      { q: 'Chia đúng thì: "Yesterday at 8 p.m., I ___ (watch) TV when my friend ___ (call)."', a: 'was watching / called. — past continuous (đang diễn ra) + past simple (xen vào).' },
    ]
  ),

  'S8TA-w35-quiz': L(
    'Review HK2 — Final',
    'Tuần cuối lớp 8! Cô và các em hệ thống lại toàn bộ kiến thức cả năm — 12 unit từ vựng và mọi điểm ngữ pháp — sẵn sàng cho bài thi cuối năm.',
    [
      'Tổng hợp từ vựng 12 unit cả năm.',
      'Hệ thống toàn bộ ngữ pháp lớp 8.',
      'Củng cố 4 kỹ năng nghe-nói-đọc-viết.',
    ],
    [
      { h: 'Vocabulary — 12 units' },
      { ul: [
        'HK1: leisure, countryside, ethnic groups, customs, festivals, folk tales, pollution, English speaking countries.',
        'HK2: natural disasters, communication, science & technology, life on other planets.',
      ] },
      { h: 'Grammar — Toàn bộ năm học' },
      { ul: [
        'Verbs + V-ing / to-V; comparative of adverbs.',
        'How many/much; should/shouldn\'t; used to.',
        'Past simple & past continuous; conditional type 1.',
        'Articles a/an/the; future continuous.',
        'Passive voice (simple tenses); reported speech.',
        'Modals may/might; comparison (as...as, double comparative).',
      ] },
      { h: 'Bốn kỹ năng' },
      { ul: [
        'Reading — skimming, scanning, đoán nghĩa từ ngữ cảnh.',
        'Listening — nghe số, ngày tháng, giá cả.',
        'Speaking — đưa ý kiến, giới thiệu địa danh.',
        'Writing — email, đoạn văn ba phần, từ nối.',
      ] },
      { h: 'Lỗi cốt lõi cần tránh' },
      { ul: [
        'Modal + V nguyên thể (không -s, không "to").',
        'Sau "if" loại 1 không dùng "will".',
        'Bị động dùng V3 (không V2).',
        'Reported speech: lùi thì + đổi đại từ.',
      ] },
      { note: 'Duy trì tiếng Anh mỗi ngày: đọc truyện, nghe nhạc/podcast, viết nhật ký ngắn. Chúc các em một mùa hè vui và một năm lớp 9 thật giỏi!' },
    ],
    [
      { q: 'Trả lời: "How many ethnic groups does Vietnam have?"', a: 'Vietnam has 54 ethnic groups.' },
      { q: 'Hoàn thành câu điều kiện: "If you ___ (study) hard, you ___ (pass) the final exam."', a: 'study / will pass. — Conditional type 1: If + present, will + V.' },
      { q: 'Chuyển sang bị động và tường thuật: Active "They will build a new school." → bị động?', a: 'A new school will be built. — future passive: will be + V3.' },
    ]
  ),

  'S8TA-w36-quiz': L(
    'Closing Year — Grade 8 English & the Road to Grade 9',
    'Congratulations on reaching the final week of Grade 8 English! This year you have mastered tenses, modals, conditionals, passive voice, reported speech and much more. Let us look back at everything you have learned and look forward to the exciting language challenges waiting for you in Grade 9.',
    [
      'Review all key grammar structures and vocabulary themes from Grade 8.',
      'Identify common mistakes to avoid and strengthen the four skills.',
      'Understand what new language points are coming in Grade 9.',
    ],
    [
      { h: 'Grammar Recap — Tenses' },
      { ul: [
        'Simple Present & Present Continuous: habits vs. actions happening now.',
        'Simple Past & Past Continuous: completed actions and simultaneous past actions.',
        'Present Perfect: experiences / recent news (have/has + V3); contrast with Simple Past.',
        'Future: will (prediction/decision), going to (plan/intention), Present Continuous (arrangement).',
      ] },
      { h: 'Grammar Recap — Modals & Conditionals' },
      { ul: [
        'Modals: can/could (ability), may/might (possibility), must/have to (obligation), should (advice), need not (no obligation). Rule: modal + bare infinitive, no -s.',
        'Conditional Type 0: If + present, present (universal truth).',
        'Conditional Type 1: If + present, will + V (real/likely future).',
        'Conditional Type 2: If + past, would + V (hypothetical/unreal) — introduced in Grade 8.',
      ] },
      { h: 'Grammar Recap — Passive Voice & Reported Speech' },
      { ul: [
        'Passive: be + V3; tense of "be" mirrors the active tense. Do NOT use V2 after "be".',
        'Reported speech: tense back-shift (is→was, will→would, can→could); pronoun change; time expressions (now→then, today→that day).',
        'Reported questions: if/whether for yes/no; question word for Wh-; verb order becomes subject + verb.',
      ] },
      { h: 'Vocabulary Themes' },
      { ul: [
        'Environment: pollution, renewable energy, deforestation, wildlife conservation.',
        'Technology: artificial intelligence, cyberbullying, screen time, digital literacy.',
        'Culture & Society: ethnic minorities, festivals, customs, tourism.',
        'Health & Sport: balanced diet, workout routine, mental health, team spirit.',
      ] },
      { h: 'Four Skills Summary' },
      { ul: [
        'Listening: gist and detail; numbers, dates, directions, opinions.',
        'Speaking: expressing opinions (I think / In my opinion), suggesting (How about / Why don\'t we), describing places and people.',
        'Reading: skim for main idea, scan for specific information, infer meaning from context.',
        'Writing: topic sentence, supporting details, concluding sentence; email format (greeting, body, closing); connectives (however, therefore, in addition, as a result).',
      ] },
      { h: 'Common Mistakes to Avoid' },
      { ul: [
        'Modal + to: ✗ "She can to swim." → ✓ "She can swim."',
        '"Will" after "if" in Type 1: ✗ "If you will study..." → ✓ "If you study..."',
        'V2 after "be" in passive: ✗ "It was broke." → ✓ "It was broken."',
        'Forgetting pronoun/tense shift in reported speech.',
      ] },
      { h: 'Looking Ahead — Grade 9 English' },
      { ul: [
        'Past Perfect (had + V3) and Past Perfect Continuous.',
        'Conditional Type 3: If + had + V3, would have + V3 (past unreal).',
        'Relative clauses: who, which, that, whose, where.',
        'Gerunds and infinitives as objects; more complex noun clauses.',
        'Academic vocabulary for writing and reading non-fiction texts.',
      ] },
      { note: 'Keep English alive every day — read a short article, listen to a song, write three sentences in your journal. The best way to remember grammar is to USE it. Have a wonderful summer and see you in Grade 9!' },
    ],
    [
      { q: 'Rewrite using passive voice: "The teacher announced the results yesterday."', a: 'The results were announced (by the teacher) yesterday. — Simple Past passive: was/were + V3.' },
      { q: 'Report this sentence: She said, "I am preparing for the exam now."', a: 'She said (that) she was preparing for the exam then. — tense back-shift (am→was), pronoun shift (I→she), time shift (now→then).' },
      { q: 'Write a sentence using Conditional Type 2: situation — you do not have a car, so you cannot drive to school.', a: 'If I had a car, I would drive to school. — Type 2: If + past simple, would + bare infinitive (hypothetical present/future).' },
    ]
  ),
};
