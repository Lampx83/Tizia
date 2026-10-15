// ============================================================
// Skill Centers — 10 quizzes (Agent C, ~110 questions)
// ============================================================
// Sources: AHA BLS 2020, WHO pain ladder, CDC travel medicine, ADA 2024,
// AAP, IDF-DAR 2021, FDA, ASHP MTM, PCNE v9.1, Beers Criteria 2023,
// STOPP/START v3, BYT TCMR, BYT HIV/STI 2024, Luật HIV/AIDS 2006.
// ============================================================

export const SC03_QUIZ_01 = {
  id: 'SC03-quiz-01',
  title: 'Kỹ năng giao tiếp với bệnh nhân',
  kind: 'quiz',
  subject: 'Kỹ năng giao tiếp dược lâm sàng',
  difficulty: 3,
  skillsTrained: ['active-listening', 'empathy', 'teach-back', 'health-literacy', 'cultural-communication'],
  questions: [
    {
      stem: 'Kỹ thuật "teach-back" trong tư vấn dùng thuốc có nghĩa là gì?',
      choices: [
        'Dược sĩ nhắc lại lời bệnh nhân vừa nói',
        'Yêu cầu bệnh nhân tự diễn đạt lại cách dùng thuốc bằng lời của họ',
        'Đưa tờ hướng dẫn để bệnh nhân đọc lại ở nhà',
        'Gọi điện sau 1 tuần để kiểm tra'
      ],
      answer: 1,
      explanation: 'Teach-back là yêu cầu bệnh nhân tự nói lại nội dung tư vấn bằng ngôn ngữ của họ. Đây là cách kiểm tra hiểu đúng, không phải kiểm tra trí nhớ. Nếu bệnh nhân nói sai → dược sĩ giải thích lại, không trách móc.'
    },
    {
      stem: 'Bệnh nhân nữ 70 tuổi khóc khi được chẩn đoán đái tháo đường. Phản ứng phù hợp nhất của dược sĩ là?',
      choices: [
        '"Bác đừng lo, đái tháo đường giờ chữa được dễ lắm"',
        '"Bác phải mạnh mẽ lên, nhiều người còn khổ hơn"',
        'Im lặng đưa khăn giấy, ngồi xuống ngang tầm mắt, "Cháu hiểu bác đang rất lo lắng"',
        'Chuyển sang tư vấn thuốc ngay để bệnh nhân hết khóc'
      ],
      answer: 2,
      explanation: 'Empathy = thừa nhận cảm xúc trước khi chuyển sang thông tin. Ngồi ngang tầm mắt thể hiện tôn trọng. "Đừng lo" là vô hiệu hoá cảm xúc; "phải mạnh mẽ" là áp đặt; chuyển chủ đề ngay là né tránh.'
    },
    {
      stem: 'Active listening (lắng nghe chủ động) KHÔNG bao gồm hành vi nào?',
      choices: [
        'Gật đầu, "ờ", "em hiểu" khi bệnh nhân nói',
        'Tóm tắt lại: "Vậy là chị đang lo thuốc này ảnh hưởng đến thai phải không?"',
        'Ngắt lời bệnh nhân để tiết kiệm thời gian khi đã đoán được câu hỏi',
        'Duy trì eye contact 60-70% thời gian giao tiếp'
      ],
      answer: 2,
      explanation: 'Ngắt lời là rào cản giao tiếp lớn nhất. Bệnh nhân cảm thấy không được tôn trọng và có thể bỏ sót thông tin quan trọng. Để bệnh nhân nói hết, sau đó tóm tắt và làm rõ.'
    },
    {
      stem: 'Tư vấn cho bệnh nhân không biết chữ về thuốc 3 lần/ngày. Cách nào phù hợp nhất?',
      choices: [
        'Viết "3 lần/ngày" lên vỏ hộp bằng chữ in to',
        'Vẽ hình mặt trời mọc, mặt trời đỉnh, mặt trăng lên vỏ thuốc',
        'Đọc to hướng dẫn cho bệnh nhân nghe rồi đưa về',
        'Yêu cầu người nhà đi cùng để ghi nhớ'
      ],
      answer: 1,
      explanation: 'Pictogram (biểu tượng hình ảnh) là chuẩn USP cho bệnh nhân low literacy. Dán nhãn sáng-trưa-tối lên blister giúp bệnh nhân tự kiểm soát. Phụ thuộc người nhà hạn chế tự chủ; đọc to không giải quyết khi về nhà.'
    },
    {
      stem: 'Body language nào của dược sĩ thể hiện rào cản giao tiếp?',
      choices: [
        'Khoanh tay trước ngực khi bệnh nhân kể bệnh',
        'Hơi nghiêng người về phía trước',
        'Tay đặt lỏng trên bàn',
        'Mỉm cười nhẹ khi chào hỏi'
      ],
      answer: 0,
      explanation: 'Khoanh tay = đóng (closed posture), tạo cảm giác phán xét/phòng thủ. Open posture (tay mở, hơi nghiêng về trước) tạo cảm giác cởi mở và sẵn sàng lắng nghe.'
    },
    {
      stem: 'Bệnh nhân nam 45 tuổi, dân tộc HMông, không nói thạo tiếng Kinh. Cách giao tiếp tốt nhất?',
      choices: [
        'Nói to và chậm hơn bình thường',
        'Tìm phiên dịch (người nhà thông thạo hoặc nhân viên cùng dân tộc), dùng pictogram, kiểm tra hiểu bằng teach-back',
        'Viết hướng dẫn ra giấy thay vì nói',
        'Chuyển bệnh nhân lên tuyến trên'
      ],
      answer: 1,
      explanation: 'Rào cản ngôn ngữ cần giải pháp thật: phiên dịch + hình ảnh + teach-back. Nói to không giúp người không hiểu nghĩa; viết giấy vô dụng nếu không biết đọc tiếng Kinh; chuyển tuyến là né tránh trách nhiệm.'
    },
    {
      stem: 'Open-ended question (câu hỏi mở) là câu nào sau đây?',
      choices: [
        '"Anh có uống thuốc đúng giờ không?"',
        '"Anh kể cho em nghe anh thường uống thuốc thế nào?"',
        '"Anh đã uống thuốc chưa?"',
        '"Anh có thấy đỡ không?"'
      ],
      answer: 1,
      explanation: 'Open-ended bắt đầu bằng "thế nào, kể cho em, mô tả..." → bệnh nhân buộc kể chi tiết, lộ ra vấn đề tuân thủ thật. Yes/no question dễ dẫn tới trả lời "có" cho qua chuyện (acquiescence bias).'
    },
    {
      stem: 'Khoảng cách giao tiếp phù hợp (proxemic) với bệnh nhân khi tư vấn quầy thuốc là?',
      choices: [
        '15-45cm (intimate distance)',
        '45cm-1.2m (personal distance)',
        '1.2-3.6m (social distance)',
        'Trên 3.6m (public distance)'
      ],
      answer: 1,
      explanation: 'Personal distance 45cm-1.2m vừa đủ để nghe rõ tình trạng nhạy cảm mà không xâm phạm. Intimate là cho gia đình/đối tác; social distance quá xa khó nghe và mất riêng tư về bệnh án.'
    },
    {
      stem: 'Nguyên tắc bảo mật khi tư vấn ở quầy thuốc đông người?',
      choices: [
        'Hỏi to để các bệnh nhân khác cùng học hỏi',
        'Mời bệnh nhân sang khu tư vấn riêng nếu nội dung nhạy cảm (HIV, STI, tâm thần, kế hoạch hoá)',
        'Yêu cầu bệnh nhân ghi câu hỏi ra giấy',
        'Chỉ tư vấn ngắn gọn để đỡ ngại'
      ],
      answer: 1,
      explanation: 'Khu tư vấn riêng (private counselling area) là chuẩn GPP. Nội dung nhạy cảm gồm HIV/STI, sức khoẻ tâm thần, kế hoạch hoá gia đình, ung thư. Bệnh nhân có quyền riêng tư theo Luật KCB.'
    },
    {
      stem: 'BATHE model trong tư vấn ngắn KHÔNG bao gồm bước nào?',
      choices: [
        'B - Background (chuyện gì đang xảy ra)',
        'A - Affect (anh chị cảm thấy thế nào)',
        'T - Trouble (điều gì làm anh chị bận tâm nhất)',
        'E - Examination (khám lâm sàng kỹ)'
      ],
      answer: 3,
      explanation: 'BATHE = Background, Affect, Trouble, Handling (anh chị đang xử trí ra sao), Empathy. Đây là khung tư vấn ngắn 5 phút, không phải khám. Examination là của bác sĩ; dược sĩ tập trung tâm lý-xã hội + dùng thuốc.'
    }
  ]
};

export const SC04_QUIZ_01 = {
  id: 'SC04-quiz-01',
  title: 'Tư vấn dược đa văn hoá',
  kind: 'quiz',
  subject: 'Cultural competence',
  difficulty: 4,
  skillsTrained: ['cultural-competence', 'religious-sensitivity', 'LGBTQ-affirmative-care', 'minority-health'],
  questions: [
    {
      stem: 'Bệnh nhân Hồi giáo đang Ramadan, mắc đái tháo đường type 2, dùng metformin 850mg x 3 lần/ngày. Cách chỉnh liều phù hợp?',
      choices: [
        'Yêu cầu bệnh nhân ngừng nhịn ăn',
        'Giữ nguyên liều, uống lén ban ngày',
        'Chuyển thành 850mg lúc iftar (xả chay) và 1700mg lúc suhoor (ăn trước bình minh) — hoặc dùng phác đồ 2 liều theo IDF-DAR',
        'Đổi sang insulin nền liều cao'
      ],
      answer: 2,
      explanation: 'IDF-DAR 2021: metformin 3 liều/ngày → 2/3 tổng liều lúc iftar + 1/3 lúc suhoor. Ép ngừng Ramadan là không tôn trọng tôn giáo. Bệnh nhân nguy cơ rất cao (HbA1c >9, suy thận GFR<30, tiền sử DKA) mới được khuyên không nhịn.'
    },
    {
      stem: 'Bệnh nhân theo đạo Hồi từ chối uống viên nang gelatin. Lý do và xử trí?',
      choices: [
        'Gelatin thường từ collagen heo/bò không halal — đề nghị bác sĩ đổi dạng viên nén, viên bao đường, hoặc tìm viên nang gelatin cá/thực vật',
        'Khuyên bệnh nhân bỏ thuốc',
        'Tách vỏ gelatin lấy bột bên trong',
        'Gelatin đã được tinh chế nên không còn vấn đề tôn giáo'
      ],
      answer: 0,
      explanation: 'Gelatin từ heo (porcine) là haram tuyệt đối với người Hồi giáo. Một số học giả chấp nhận gelatin bò halal nhưng nhiều người vẫn từ chối. Giải pháp: viên nén/sủi/dạng lỏng, hoặc viên nang cá (capsugel marine) hoặc HPMC (cellulose thực vật). Tách vỏ có thể sai liều dạng modified-release.'
    },
    {
      stem: 'Phụ nữ Hồi giáo phải khám/đo huyết áp tay với dược sĩ nam. Ứng xử phù hợp?',
      choices: [
        'Bắt buộc đo bằng mọi giá',
        'Đề nghị nữ dược sĩ/điều dưỡng đo, hoặc đo qua lớp vải mỏng tay áo nếu phù hợp với phép đo, hoặc cho phép chồng/người nhà nữ tháo khăn',
        'Từ chối tư vấn',
        'Yêu cầu cởi khăn hijab để đo'
      ],
      answer: 1,
      explanation: 'Awrah (vùng kín đáo) của phụ nữ Hồi giáo gồm cả cánh tay với người nam khác mahram. Cung cấp lựa chọn nữ nhân viên + không gian riêng tư + tôn trọng quyết định bệnh nhân. Đo HA qua vải mỏng vẫn cho kết quả chấp nhận được nếu vải không quá dày.'
    },
    {
      stem: 'Người LGBT+ trẻ (MSM) đến hỏi PrEP. Câu mở đầu phù hợp nhất?',
      choices: [
        '"Bạn có nhiều bạn tình không?"',
        '"Bạn có chắc mình là người đồng tính không?"',
        '"Cảm ơn bạn đã tin tưởng đến đây. Em xin hỏi vài câu để hỗ trợ tốt nhất, mọi thông tin đều được bảo mật. Bạn có thể chia sẻ về tình huống bạn đang lo lắng không?"',
        '"Bố mẹ bạn có biết không?"'
      ],
      answer: 2,
      explanation: 'Affirmative care: tạo không gian an toàn (safe space), cam kết bảo mật, không phán xét, để bệnh nhân tự kể. Tránh giả định, tránh hỏi nguồn ngoài chủ đề (bố mẹ), tránh đặt câu hỏi mang tính nghi ngờ identity.'
    },
    {
      stem: 'Pronoun (đại từ) khi giao tiếp với người chuyển giới?',
      choices: [
        'Dùng theo CMND',
        'Hỏi trước: "Bạn muốn được gọi là anh, chị, hay bạn?" — và sử dụng đúng đại từ bệnh nhân chọn',
        'Tự chọn theo cảm nhận của dược sĩ',
        'Không gọi đại từ nào để tránh sai'
      ],
      answer: 1,
      explanation: 'Hỏi và dùng đúng pronoun là nguyên tắc cốt lõi của affirmative care. CMND có thể chưa cập nhật. Misgendering làm tăng minority stress → giảm tuân thủ điều trị, đặc biệt với HIV/hormone therapy.'
    },
    {
      stem: 'Người dân tộc thiểu số ở vùng cao tin vào thầy mo, hỏi có nên dùng đông y + thuốc tây cùng lúc. Đáp án dược sĩ nên?',
      choices: [
        '"Cấm dùng đông y, không khoa học"',
        '"Em tôn trọng truyền thống của gia đình. Em xin biết bác đang dùng cây thuốc/bài thuốc nào để em kiểm tra tương tác với thuốc tây — vì một số cây có thể ảnh hưởng đến hiệu quả thuốc"',
        '"Tuỳ bác, em không can thiệp"',
        '"Bác chỉ cần dùng đông y là được"'
      ],
      answer: 1,
      explanation: 'Cultural humility: tôn trọng niềm tin + đảm bảo an toàn. Nhiều cây thuốc Việt có tương tác (st John\'s wort - SSRI, ginkgo - warfarin, cây thuốc lá - theophylline). Cấm đoán → bệnh nhân giấu việc dùng → nguy hiểm hơn.'
    },
    {
      stem: 'Bệnh nhân nam MSM nhiễm HIV, lo người nhà biết. Nghĩa vụ partner notification?',
      choices: [
        'Báo cho gia đình ngay',
        'Hỗ trợ bệnh nhân tự thông báo với partner (provider-assisted referral) hoặc anonymous notification qua CDC — không tiết lộ với gia đình mà không có đồng ý bệnh nhân',
        'Đăng tên lên danh sách công khai',
        'Không cần thông báo ai'
      ],
      answer: 1,
      explanation: 'BYT 2024: bí mật thông tin HIV là luật. Partner notification ưu tiên patient referral, có thể provider-assisted nếu bệnh nhân đồng ý. Tiết lộ trái phép vi phạm Luật Phòng chống HIV/AIDS 2006 → có thể bị xử lý hình sự.'
    },
    {
      stem: 'Bệnh nhân theo đạo Phật ăn chay trường, cần bổ sung vi chất nào dễ thiếu?',
      choices: [
        'Vitamin C',
        'Vitamin B12, sắt, kẽm, omega-3 (EPA/DHA), vitamin D, canxi',
        'Vitamin A',
        'Không cần bổ sung gì'
      ],
      answer: 1,
      explanation: 'Người ăn chay trường (vegan) thiếu B12 (chỉ có trong động vật), sắt non-heme hấp thu kém, kẽm, DHA/EPA (omega-3 chuỗi dài chỉ có ở cá), vitamin D3 (D2 nguồn nấm kém hơn), canxi (nếu không uống sữa). Khuyên tảo spirulina, đậu nành, hạt chia, vitamin tổng hợp vegan.'
    },
    {
      stem: 'Người Công giáo phản đối thuốc tránh thai khẩn cấp (levonorgestrel) vì lý do tôn giáo. Vai trò dược sĩ?',
      choices: [
        'Từ chối bán hoàn toàn',
        'Tôn trọng lương tâm dược sĩ nhưng đảm bảo bệnh nhân có quyền tiếp cận — chuyển sang đồng nghiệp hoặc nhà thuốc khác mà không phán xét bệnh nhân',
        'Bán nhưng lên án bệnh nhân',
        'Bán không tư vấn'
      ],
      answer: 1,
      explanation: 'Conscientious objection được công nhận nhưng KHÔNG được cản trở quyền tiếp cận của bệnh nhân. Dược sĩ phản đối phải chuyển bệnh nhân đến đồng nghiệp/cơ sở khác kịp thời. Cấm phán xét, miệt thị.'
    },
    {
      stem: 'Bệnh nhân Hồi giáo từ chối insulin vì sợ chứa heo. Sự thật?',
      choices: [
        'Tất cả insulin đều từ heo',
        'Insulin hiện đại (analogue như aspart, glargine; insulin người - human insulin) đều tổng hợp bằng E.coli/nấm men tái tổ hợp — KHÔNG còn nguồn động vật. An toàn halal',
        'Chỉ insulin chai cũ là từ bò',
        'Insulin chứa gelatin heo'
      ],
      answer: 1,
      explanation: 'Insulin porcine/bovine đã thoái trào từ 1990s. Insulin hiện tại sản xuất bằng DNA tái tổ hợp. Hội Y học Hồi giáo (IOMS) và nhiều fatwa khẳng định insulin recombinant là halal. Giải thích rõ giúp bệnh nhân yên tâm.'
    }
  ]
};

export const SC05_QUIZ_01 = {
  id: 'SC05-quiz-01',
  title: 'BLS - CPR và AED',
  kind: 'quiz',
  subject: 'Cấp cứu sống cơ bản',
  difficulty: 4,
  skillsTrained: ['BLS', 'CPR', 'AED-use', 'chain-of-survival', 'emergency-response'],
  questions: [
    {
      stem: 'Chain of survival (chuỗi sống còn) AHA 2020 cho ngừng tim ngoài bệnh viện gồm các mắt xích nào theo thứ tự?',
      choices: [
        'Gọi cấp cứu → CPR → AED → ALS → Phục hồi → Hồi phục sau ngừng tim',
        'Nhận diện sớm + gọi 115 → CPR sớm chất lượng cao → Khử rung sớm (AED) → ALS hiệu quả → Chăm sóc sau ngừng tim → Hồi phục',
        'CPR → Gọi cấp cứu → AED → Chuyển viện',
        'AED → CPR → Cấp cứu → Hồi sức'
      ],
      answer: 1,
      explanation: 'AHA 2020 thêm "Hồi phục" (Recovery) thành mắt xích thứ 6. Thứ tự đúng: Recognition + activation → High-quality CPR → Rapid defibrillation → Advanced resuscitation → Post-cardiac arrest care → Recovery.'
    },
    {
      stem: 'Tỷ lệ ép tim:thổi ngạt CPR người lớn 1 người cứu (chưa đặt nội khí quản)?',
      choices: [
        '15:2',
        '30:2',
        '5:1',
        'Chỉ ép tim, không thổi ngạt'
      ],
      answer: 1,
      explanation: '30:2 cho người lớn 1 hoặc 2 người cứu (chưa đặt NKQ). Với trẻ em/sơ sinh 2 người cứu: 15:2. Sau đặt NKQ: ép tim liên tục 100-120/phút, thông khí 1 lần/6 giây (10/phút).'
    },
    {
      stem: 'Độ sâu ép tim người lớn chuẩn AHA?',
      choices: [
        '2-3cm',
        '3-4cm',
        '5-6cm (không quá 6cm)',
        '7-8cm'
      ],
      answer: 2,
      explanation: 'AHA 2020: 5-6cm (2-2.4 inch). Không quá 6cm vì gây chấn thương ngực (gãy xương sườn, tổn thương gan, phổi). Trẻ em: 1/3 đường kính trước-sau lồng ngực (~5cm). Sơ sinh: ~4cm.'
    },
    {
      stem: 'Tần số ép tim CPR người lớn?',
      choices: [
        '60-80 lần/phút',
        '80-100 lần/phút',
        '100-120 lần/phút',
        '120-150 lần/phút'
      ],
      answer: 2,
      explanation: '100-120/phút theo AHA 2020. Quá chậm → không đủ tưới máu. Quá nhanh → ép tim không đủ sâu, không kịp giãn ngực (chest recoil), giảm hồi máu về tim. Có thể đếm theo nhịp bài "Stayin\' Alive" (Bee Gees) ~103 bpm.'
    },
    {
      stem: 'Vị trí ép tim người lớn đúng?',
      choices: [
        'Mỏm ức (xương ức dưới)',
        '1/2 dưới xương ức (lower half of sternum), giữa 2 núm vú',
        'Vùng tim bên trái ngực',
        'Bất kỳ vị trí nào trên ngực'
      ],
      answer: 1,
      explanation: '1/2 dưới xương ức (lower half of sternum). Đặt gót tay dưới (heel of hand) lên, tay kia đan ngón. Vị trí giữa ngực ngang đường nối 2 núm vú là mốc dễ tìm. Ép ở mỏm ức gây thủng dạ dày/gan.'
    },
    {
      stem: 'AED phân tích nhịp tim, máy KHÔNG sốc trong trường hợp nào?',
      choices: [
        'Rung thất (VF) hoặc nhịp nhanh thất vô mạch (pVT)',
        'Vô tâm thu (asystole) hoặc hoạt động điện vô mạch (PEA)',
        'Rung nhĩ rất nhanh có mạch',
        'Cả A và C'
      ],
      answer: 1,
      explanation: 'AED chỉ sốc với "shockable rhythms": VF và pVT. Asystole (đường thẳng) và PEA (có điện nhưng không có mạch) không sốc — tiếp tục CPR + epinephrine ALS. Sốc asystole không có lợi và làm gián đoạn ép tim.'
    },
    {
      stem: 'Đặt miếng dán (pad) AED người lớn?',
      choices: [
        'Cả 2 miếng đặt trên ngực bên trái',
        'Một miếng dưới đòn phải, một miếng dưới nách trái (anterolateral position)',
        'Cả 2 miếng đặt sau lưng',
        'Đặt lên mặt và bụng'
      ],
      answer: 1,
      explanation: 'Anterolateral position: pad 1 dưới xương đòn phải (trên ngực), pad 2 dưới nách trái (đường nách giữa, ngang núm vú). Trẻ <8 tuổi/<25kg dùng miếng nhỏ, có thể đặt anteroposterior (trước-sau) nếu ngực nhỏ.'
    },
    {
      stem: 'Trẻ em 1-8 tuổi, kỹ thuật ép tim?',
      choices: [
        '1 hoặc 2 tay, độ sâu ~5cm (1/3 đường kính trước-sau ngực), tần số 100-120/phút, tỷ lệ 30:2 (1 cứu) hoặc 15:2 (2 cứu)',
        '2 ngón tay, độ sâu 1cm, tần số 60/phút',
        'Chỉ thổi ngạt, không ép tim',
        'Tỷ lệ 5:1 với cả người lớn'
      ],
      answer: 0,
      explanation: 'Trẻ 1-8 tuổi: 1 tay (trẻ nhỏ) hoặc 2 tay (trẻ lớn) tuỳ kích thước. Độ sâu ~5cm hoặc 1/3 đường kính trước-sau ngực. Tần số như người lớn 100-120/phút. 2 người cứu: 15:2.'
    },
    {
      stem: 'Sơ sinh (<1 tuổi) ép tim như thế nào?',
      choices: [
        '1 tay, độ sâu 5cm',
        '2 ngón tay (1 cứu) hoặc 2 ngón cái ôm ngực (2 cứu), 1/3 dưới xương ức ngay dưới đường nối 2 núm vú, độ sâu ~4cm (1/3 đường kính trước-sau), tần số 100-120/phút',
        'Lòng bàn tay, độ sâu 6cm',
        'Chỉ thổi ngạt'
      ],
      answer: 1,
      explanation: 'Sơ sinh: 1 người cứu dùng 2 ngón tay (ngón giữa + áp út). 2 người cứu dùng 2 ngón cái ôm vòng ngực (two-thumb encircling). Độ sâu ~4cm. Vị trí dưới đường nối 2 núm vú ngay trên xương ức.'
    },
    {
      stem: 'Khi nào dừng CPR cho người lớn?',
      choices: [
        'Sau 5 phút nếu không có hồi phục',
        'Khi nạn nhân có dấu hiệu sự sống (thở, cử động, ho), hoặc nhân viên ALS đến tiếp quản, hoặc cứu viên kiệt sức không tiếp tục được',
        'Khi gia đình yêu cầu',
        'Sau 30 phút mặc định'
      ],
      answer: 1,
      explanation: 'CPR tiếp tục cho đến khi: (1) ROSC (return of spontaneous circulation) — bệnh nhân thở, có mạch; (2) ALS team đến; (3) cứu viên không thể tiếp tục an toàn (kiệt sức, nguy hiểm hiện trường). Thời gian CPR không cố định.'
    },
    {
      stem: 'Tỷ lệ sống còn sau VF tăng bao nhiêu nếu sốc trong 1 phút đầu so với sau 10 phút?',
      choices: [
        'Tăng 10%',
        'Tăng 20%',
        'Sống còn ~70-90% nếu sốc < 1 phút; chỉ ~5-10% sau 10 phút (giảm 7-10% mỗi phút trì hoãn)',
        'Không khác biệt'
      ],
      answer: 2,
      explanation: 'Sốc sớm là yếu tố tiên lượng quan trọng nhất với VF/pVT. AED công cộng (PAD - Public Access Defibrillation) tăng đáng kể tỷ lệ sống còn ngoài viện. Mỗi phút trì hoãn giảm 7-10% khả năng sống.'
    },
    {
      stem: 'Hands-only CPR (chỉ ép tim) phù hợp cho ai?',
      choices: [
        'Trẻ sơ sinh ngạt nước',
        'Người chứng kiến (bystander) không qua đào tạo hoặc ngại thổi ngạt, cho người lớn ngừng tim đột ngột chứng kiến được',
        'Người ngừng tim do ngộ độc khí',
        'Tất cả trường hợp'
      ],
      answer: 1,
      explanation: 'Hands-only CPR (chỉ ép tim 100-120/phút) khuyến cáo cho bystander chưa đào tạo trong ngừng tim người lớn chứng kiến được. Trẻ em, ngạt nước, ngộ độc, sơ sinh cần CPR đầy đủ có thổi ngạt vì nguyên nhân thường do thiếu oxy.'
    }
  ]
};

export const SC06_QUIZ_01 = {
  id: 'SC06-quiz-01',
  title: 'Tiêm chủng - kỹ thuật và bảo quản',
  kind: 'quiz',
  subject: 'Vaccine và tiêm chủng',
  difficulty: 4,
  skillsTrained: ['immunization', 'injection-technique', 'cold-chain', 'TCMR-program', 'vaccine-counseling'],
  questions: [
    {
      stem: 'Nhiệt độ bảo quản cold chain cho hầu hết vaccine TCMR?',
      choices: [
        '-20°C đến -10°C',
        '+2°C đến +8°C',
        '+10°C đến +15°C',
        'Nhiệt độ phòng 25°C'
      ],
      answer: 1,
      explanation: '+2°C đến +8°C cho tủ lạnh dương (positive cold chain) đa số vaccine bất hoạt: DTP, viêm gan B, IPV, Hib, MMR (đã pha), HPV, cúm. Vaccine sống đông khô (BCG, sởi chưa pha, varicella) có thể bảo quản âm sâu nhưng VN thường +2 đến +8.'
    },
    {
      stem: 'Vị trí tiêm bắp (IM) cho trẻ <12 tháng?',
      choices: [
        'Cơ delta cánh tay',
        'Cơ vastus lateralis (mặt ngoài-trước đùi giữa)',
        'Cơ mông',
        'Cơ tam đầu'
      ],
      answer: 1,
      explanation: 'Vastus lateralis (1/3 giữa đùi mặt ngoài-trước) là vị trí ưu tiên IM cho trẻ <12 tháng vì cơ phát triển tốt, ít mạch máu-thần kinh lớn. Delta chỉ dùng khi >12 tháng (đủ cơ). Mông KHÔNG dùng vì gần thần kinh toạ và lớp mỡ dày làm tiêm dưới da thay vì IM.'
    },
    {
      stem: 'Vị trí tiêm bắp người lớn?',
      choices: [
        'Cơ delta (1/3 giữa, vùng dày nhất, dưới mỏm cùng vai 2-3 ngón tay)',
        'Mông trên ngoài',
        'Đùi trước',
        'Cánh tay trong'
      ],
      answer: 0,
      explanation: 'Delta IM người lớn: 2-3 ngón tay dưới mỏm cùng vai (acromion), ở vùng cơ dày nhất. Kim 25mm (1 inch) cho người trung bình, 16mm cho người gầy <60kg, 38mm cho người >90kg. Góc tiêm 90°.'
    },
    {
      stem: 'Kỹ thuật Z-track (Z-tracking) dùng cho thuốc gì?',
      choices: [
        'Vaccine thông thường',
        'Thuốc kích ứng mô như sắt dextran IM, vitamin K, một số kháng sinh — kéo da và mô dưới da theo chiều ngang trước tiêm rồi thả ra để bịt đường thuốc rò',
        'Insulin SC',
        'Thuốc tê dưới da'
      ],
      answer: 1,
      explanation: 'Z-track: kéo da/mô dưới da ngang ~2.5cm → tiêm IM bình thường → giữ 10s sau khi rút kim → thả tay. Đường kim tạo zigzag (Z) ngăn thuốc rò ra dưới da. Dùng với thuốc kích ứng/nhuộm như sắt dextran, hydroxyzine. Không dùng cho vaccine thông thường.'
    },
    {
      stem: 'Vị trí tiêm dưới da (SC) chuẩn?',
      choices: [
        'Mặt ngoài cánh tay (vùng cơ delta-tam đầu), bụng quanh rốn (5cm cách rốn), mặt trước-ngoài đùi — góc kim 45°',
        'Cơ mông sâu',
        'Trong lòng bàn tay',
        'Tĩnh mạch khuỷu'
      ],
      answer: 0,
      explanation: 'SC: mô mỡ dưới da. Vị trí phổ biến: mặt ngoài-sau cánh tay, bụng (insulin), đùi trước-ngoài. Góc 45° kim ngắn 5/8 inch (16mm). Vaccine SC: MMR, varicella, sốt vàng. Insulin có thể 90° với pen kim ngắn 4-6mm.'
    },
    {
      stem: 'Vaccine bắt buộc trong chương trình TCMR Việt Nam 2024 cho trẻ <2 tuổi KHÔNG bao gồm?',
      choices: [
        'BCG (lao) — sơ sinh',
        'Viêm gan B — trong 24h sau sinh + 3 mũi 2/3/4 tháng',
        'Bạch hầu-Ho gà-Uốn ván-Bại liệt-Hib (5 trong 1 DPT-VGB-Hib + IPV/OPV)',
        'HPV — 2 tháng tuổi'
      ],
      answer: 3,
      explanation: 'HPV KHÔNG trong TCMR bắt buộc <2 tuổi. HPV chỉ định cho nữ 9-26 tuổi (đang được cân nhắc đưa vào TCMR mở rộng). TCMR bắt buộc gồm: BCG, viêm gan B, 5in1, IPV, OPV, sởi, sởi-rubella (MR), viêm não Nhật Bản B, viêm phổi do phế cầu, rota (mở rộng), cúm (nhóm nguy cơ).'
    },
    {
      stem: 'Chống chỉ định tuyệt đối tiêm chủng?',
      choices: [
        'Sốt nhẹ 37.8°C',
        'Cảm cúm nhẹ',
        'Phản vệ với liều vaccine trước hoặc với thành phần vaccine (gelatin, neomycin, ovalbumin với MMR/cúm/sốt vàng)',
        'Đang dùng kháng sinh'
      ],
      answer: 2,
      explanation: 'Chống chỉ định tuyệt đối: phản vệ (anaphylaxis) liều trước hoặc thành phần. Hoãn (chưa tiêm): bệnh cấp trung bình-nặng có sốt >38.5°C. Sốt nhẹ, cảm cúm thường, kháng sinh, mẹ đang cho con bú KHÔNG phải chống chỉ định.'
    },
    {
      stem: 'Trẻ suy giảm miễn dịch (HIV nặng, đang hoá trị, ghép tạng dùng ức chế MD) chống chỉ định loại vaccine nào?',
      choices: [
        'Vaccine bất hoạt (cúm, viêm gan B)',
        'Vaccine sống giảm độc lực (MMR, varicella, BCG, OPV, sốt vàng, rota)',
        'Toàn bộ vaccine',
        'Không chống chỉ định gì'
      ],
      answer: 1,
      explanation: 'Vaccine sống có thể gây bệnh ở người suy giảm MD nặng. Chống chỉ định MMR, varicella, BCG, OPV, sốt vàng, rota. Vaccine bất hoạt vẫn dùng được (có thể đáp ứng kém hơn). HIV CD4 ổn định >200 vẫn có thể tiêm MMR.'
    },
    {
      stem: 'Bảo quản OPV (vaccine bại liệt uống) đặc biệt nào?',
      choices: [
        'Có thể đông đá -20°C',
        'Để nhiệt độ phòng',
        'Nhạy nhiệt nhất — bảo quản +2 đến +8°C, theo dõi VVM (Vaccine Vial Monitor) trên lọ — đổi màu = hỏng',
        'Phơi nắng cho hoạt'
      ],
      answer: 2,
      explanation: 'OPV là vaccine sống nhạy nhiệt. VVM là nhãn đổi màu in trên lọ: hình vuông màu (đậm dần khi tiếp xúc nhiệt) trong vòng tròn so sánh. Khi ô vuông tối bằng hoặc đậm hơn vòng tròn → vaccine hỏng, không dùng.'
    },
    {
      stem: 'Phản vệ sau tiêm vaccine, thuốc đầu tay?',
      choices: [
        'Diphenhydramine uống',
        'Corticoid IV',
        'Adrenalin (epinephrine) 1:1000 IM 0.5mg người lớn (0.01mg/kg trẻ em) vào đùi ngoài, lặp 5-15 phút nếu cần',
        'Salbutamol khí dung'
      ],
      answer: 2,
      explanation: 'Adrenalin IM 1:1000 đùi ngoài là first-line cho phản vệ. Người lớn: 0.5mg (0.5ml). Trẻ em: 0.01mg/kg max 0.3mg. Đùi ngoài (vastus lateralis) hấp thu nhanh hơn deltoid. Có thể lặp 5-15 phút. Cortisone và antihistamine là thứ phát.'
    },
    {
      stem: 'Khoảng cách tối thiểu giữa 2 vaccine sống giảm độc lực không tiêm cùng buổi?',
      choices: [
        '1 tuần',
        '2 tuần',
        '4 tuần (28 ngày)',
        '6 tháng'
      ],
      answer: 2,
      explanation: 'Nguyên tắc CDC: 2 vaccine sống có thể tiêm cùng buổi (cùng ngày) ở vị trí khác nhau. Nếu không cùng buổi, cách tối thiểu 28 ngày để tránh ảnh hưởng đáp ứng miễn dịch lẫn nhau (interferon từ vaccine đầu ức chế đáp ứng vaccine sau). Vaccine bất hoạt không có khoảng cách bắt buộc.'
    }
  ]
};

export const SC07_QUIZ_01 = {
  id: 'SC07-quiz-01',
  title: 'Đo huyết áp và đường huyết tại nhà thuốc',
  kind: 'quiz',
  subject: 'Point-of-care monitoring',
  difficulty: 3,
  skillsTrained: ['BP-measurement', 'glucometer-use', 'POC-testing', 'hypertension-screening', 'diabetes-monitoring'],
  questions: [
    {
      stem: 'Chuẩn bị bệnh nhân trước đo HA theo AHA 2017?',
      choices: [
        'Đo ngay khi bệnh nhân bước vào quầy',
        'Nghỉ ngơi ít nhất 5 phút, không hút thuốc/caffeine/tập thể dục 30 phút trước, bàng quang rỗng, ngồi ghế lưng tựa, chân chạm sàn (không bắt chéo), không nói chuyện khi đo',
        'Đứng đo cho nhanh',
        'Đo sau khi bệnh nhân leo cầu thang'
      ],
      answer: 1,
      explanation: 'Chuẩn bị sai → tăng giả HA 5-30mmHg. Bắt chéo chân tăng ~6-8mmHg, bàng quang đầy tăng 10-15mmHg, nói chuyện khi đo tăng ~10mmHg. Nghỉ 5 phút, ngồi đúng tư thế là tối thiểu.'
    },
    {
      stem: 'Vị trí băng quấn (cuff) HA?',
      choices: [
        'Trên cánh tay, ngang tim, mép dưới cuff trên nếp khuỷu 2-3cm, băng vừa khít (luồn được 1-2 ngón tay)',
        'Cổ tay là chính xác nhất',
        'Đùi trên',
        'Bắp chân'
      ],
      answer: 0,
      explanation: 'Cuff trên cánh tay (brachial), mép dưới cách nếp khuỷu 2-3cm, cánh tay trần (không qua áo dày), ngang mức tim. Cổ tay/ngón tay không chính xác bằng. Tay tựa lên bàn, không đung đưa. Lưng dựa ghế.'
    },
    {
      stem: 'Kích thước cuff sai (quá nhỏ so với cánh tay) gây sai số nào?',
      choices: [
        'Hạ huyết áp giả',
        'Tăng huyết áp giả (cuff quá nhỏ); Hạ huyết áp giả (cuff quá lớn)',
        'Không ảnh hưởng',
        'Chỉ ảnh hưởng nhịp tim'
      ],
      answer: 1,
      explanation: 'Cuff nhỏ → tăng HA giả 10-40mmHg (sai lầm phổ biến với người béo phì). Cuff lớn → hạ HA giả. Bladder cuff phải bao 80% chu vi cánh tay, dài 40%. Có size: small adult, adult, large adult, thigh.'
    },
    {
      stem: 'Số lần đo HA cần thiết để chẩn đoán?',
      choices: [
        'Đo 1 lần là đủ',
        'Đo 2 lần cách nhau 1-2 phút, lấy trung bình; nếu chênh >5mmHg đo thêm lần 3; thực hiện ở ít nhất 2 lần thăm khám khác nhau để chẩn đoán THA',
        'Đo 10 lần',
        'Đo 5 lần cách nhau 1 ngày'
      ],
      answer: 1,
      explanation: 'Quy chuẩn: 2-3 lần đo/lần thăm, cách 1-2 phút, lấy trung bình. Chẩn đoán THA cần ≥2 lần thăm khám khác nhau (hoặc ABPM/HBPM cho mục tiêu). Loại trừ white-coat HTN bằng đo tại nhà.'
    },
    {
      stem: 'Mục tiêu HA cho bệnh nhân đái tháo đường theo ADA 2024 / ESC?',
      choices: [
        '<140/90 mmHg (tất cả đối tượng)',
        '<130/80 mmHg (đa số bệnh nhân ĐTĐ); có thể cá thể hoá <140/90 cho người cao tuổi yếu',
        '<120/70 mmHg',
        '<160/100 mmHg'
      ],
      answer: 1,
      explanation: 'ADA 2024 + AHA/ESC: <130/80 cho người ĐTĐ giảm biến chứng tim mạch. Người >75 tuổi yếu/fall risk: <140/90 cá thể hoá. Quá thấp (<120/70) tăng té ngã, hạ HA tư thế.'
    },
    {
      stem: 'Phân độ THA theo JNC 8 / ESC 2018?',
      choices: [
        'HA tối ưu <120/<80; HA bình thường 120-129/80-84; HA bình thường cao 130-139/85-89; THA độ 1 140-159/90-99; THA độ 2 160-179/100-109; THA độ 3 ≥180/≥110',
        'Tất cả ≥130/85 là THA',
        'Chỉ ≥160/100 là THA',
        'Phân độ chỉ dùng tâm thu'
      ],
      answer: 0,
      explanation: 'ESC 2018/2024 và VN: tối ưu <120/80, bình thường <130/85, bình thường cao 130-139/85-89, THA độ 1 140-159/90-99, độ 2 160-179/100-109, độ 3 ≥180/110. AHA 2017 đặt thấp hơn: HTN stage 1 ≥130/80.'
    },
    {
      stem: 'Đo đường huyết mao mạch (FPG - fasting plasma glucose) — thời gian nhịn ăn?',
      choices: [
        '4 giờ',
        '8 giờ tối thiểu (chỉ uống nước)',
        '12 giờ bắt buộc',
        '24 giờ'
      ],
      answer: 1,
      explanation: 'FPG nhịn ăn ≥8h (thường lấy sáng sau qua đêm 8-12h). Chỉ uống nước lọc, không sữa/cà phê/nước ngọt. Test nhanh tại quầy lúc 7-8 sáng.'
    },
    {
      stem: 'Mục tiêu đường huyết theo ADA cho người ĐTĐ?',
      choices: [
        'FPG 80-130 mg/dL (4.4-7.2 mmol/L); 2h sau ăn <180 mg/dL (10 mmol/L); HbA1c <7%',
        'FPG <50 mg/dL',
        'Bất kỳ <200 mg/dL',
        'HbA1c <4%'
      ],
      answer: 0,
      explanation: 'ADA 2024: FPG 80-130 mg/dL (4.4-7.2 mmol/L), peak postprandial <180 mg/dL (10 mmol/L), HbA1c <7% cho đa số. Có thể nới <8% cho người cao tuổi/đa bệnh, hoặc <6.5% cho trẻ tuổi không hạ đường huyết.'
    },
    {
      stem: 'Test ngón tay đo glucose mao mạch — bước nào sai?',
      choices: [
        'Rửa tay nước ấm và xà phòng, lau khô',
        'Chích đầu ngón tay (mặt bên), giọt máu đầu lau bỏ — lấy giọt thứ hai',
        'Lau cồn 70°, để khô hoàn toàn rồi mới chích',
        'Bóp mạnh đầu ngón để lấy nhiều máu'
      ],
      answer: 3,
      explanation: 'Bóp mạnh → vắt cả dịch kẽ → sai số (thường thấp giả). Để máu chảy tự nhiên hoặc xoa nhẹ từ gốc ngón. Cồn chưa khô làm pha loãng + sai số. Giọt đầu lẫn dịch kẽ nên bỏ.'
    },
    {
      stem: 'HbA1c phản ánh đường huyết trung bình bao nhiêu lâu?',
      choices: [
        '1 tuần',
        '2 tuần',
        '2-3 tháng (đời sống hồng cầu ~120 ngày)',
        '1 năm'
      ],
      answer: 2,
      explanation: 'HbA1c = glycated hemoglobin, phản ánh đường huyết trung bình 2-3 tháng (do đời sống RBC ~120 ngày). HbA1c 7% ≈ trung bình 154 mg/dL (8.6 mmol/L). Mỗi 1% HbA1c ≈ 28-29 mg/dL. Sai số khi thiếu máu, bệnh hồng cầu.'
    },
    {
      stem: 'Khi nào cần gọi cấp cứu hoặc chuyển khám ngay với HA đo tại quầy?',
      choices: [
        'HA 130/85',
        'HA ≥180/120 kèm triệu chứng (đau ngực, khó thở, nhìn mờ, đau đầu dữ dội, yếu liệt, lú lẫn) = cơn THA cấp cứu (hypertensive emergency)',
        'HA 140/90 không triệu chứng',
        'HA 120/80'
      ],
      answer: 1,
      explanation: 'HA ≥180/120 + tổn thương cơ quan đích (triệu chứng) = emergency, cần hạ áp IV tại ICU. HA ≥180/120 không triệu chứng = urgency, cần xử trí cấp cứu nhưng có thể hạ áp uống. <180/120 không triệu chứng → khám ngoại trú sớm.'
    }
  ]
};

export const SC08_QUIZ_01 = {
  id: 'SC08-quiz-01',
  title: 'Tư vấn cai thuốc lá',
  kind: 'quiz',
  subject: 'Smoking cessation',
  difficulty: 3,
  skillsTrained: ['5As', 'NRT-counseling', 'motivational-interviewing', 'pharmacotherapy', 'relapse-prevention'],
  questions: [
    {
      stem: '5A\'s của US Surgeon General cho cai thuốc gồm?',
      choices: [
        'Ask, Advise, Assess, Assist, Arrange (Hỏi, Khuyên, Đánh giá sẵn sàng, Hỗ trợ, Hẹn theo dõi)',
        'Ask, Answer, Assist, Adjust, Approve',
        'Action, Advise, Achieve, Act, Affirm',
        'Address, Ask, Approach, Assist, Acknowledge'
      ],
      answer: 0,
      explanation: '5A\'s: Ask (hỏi mọi BN có hút thuốc không), Advise (khuyên cá thể hoá), Assess (đánh giá sẵn sàng - readiness theo stage of change), Assist (hỗ trợ - thuốc + tư vấn hành vi), Arrange (hẹn follow-up 1 tuần và 1 tháng sau ngày bỏ).'
    },
    {
      stem: 'Bệnh nhân chưa muốn bỏ thuốc, sử dụng kỹ thuật 5R?',
      choices: [
        'Relevance (liên quan cá nhân), Risks (nguy cơ), Rewards (lợi ích bỏ), Roadblocks (rào cản), Repetition (lặp lại mỗi lần gặp)',
        'Read, Reflect, Relax, Reset, Restart',
        'Rest, Recovery, Renew, Restore, Rebuild',
        'Reach, Reduce, Reuse, Recycle, Restart'
      ],
      answer: 0,
      explanation: '5R cho người chưa sẵn sàng (precontemplation/contemplation): R(elevance) - vì sao bỏ liên quan cá nhân; R(isks) - nguy cơ sức khoẻ ngắn/dài hạn; R(ewards) - lợi ích bỏ; R(oadblocks) - khó khăn; R(epetition) - lặp lại motivational tại mỗi lần khám.'
    },
    {
      stem: 'Nicotine replacement therapy (NRT) — dạng nào KHÔNG có?',
      choices: [
        'Patch (miếng dán)',
        'Gum (kẹo cao su)',
        'Lozenge (kẹo ngậm)',
        'Suppository (đạn trực tràng)'
      ],
      answer: 3,
      explanation: 'NRT có: patch (qua da), gum, lozenge, inhaler, nasal spray (Mỹ), sublingual tablet. Không có suppository. Phối hợp thường dùng: patch (long-acting baseline) + gum/lozenge (short-acting khi cravings).'
    },
    {
      stem: 'Bệnh nhân hút >20 điếu/ngày, hút điếu đầu trong vòng 30 phút sau dậy. Chiến lược NRT?',
      choices: [
        'NRT liều thấp 7mg patch',
        'NRT liều cao: patch 21mg + gum/lozenge PRN (combination therapy) — giảm dần sau 6-8 tuần',
        'Không dùng NRT',
        'Chỉ kẹo cao su'
      ],
      answer: 1,
      explanation: 'Nghiện nicotine nặng (Fagerström >6, hoặc >20 điếu/ngày, hoặc điếu đầu <30 phút sau dậy) → combination NRT: patch 21mg liên tục + gum 2-4mg PRN khi cravings. Hiệu quả gấp đôi single NRT.'
    },
    {
      stem: 'Cách dùng nicotine gum đúng?',
      choices: [
        'Nhai liên tục như kẹo thường',
        'Nuốt cả viên',
        'Chew and park: nhai vài lần đến khi có vị/tê → đặt dưới má 1-2 phút → nhai lại — không ăn uống 15 phút trước/trong khi dùng (đặc biệt cà phê, nước ngọt có gas)',
        'Ngậm dưới lưỡi như subliingual'
      ],
      answer: 2,
      explanation: 'Chew and park technique. Nhai liên tục gây giải phóng nicotine quá nhanh → buồn nôn, đau đầu, hồi hộp + nuốt nhiều → kém hấp thu (vì nicotine hấp thu qua niêm mạc miệng). Cà phê/nước ngọt làm pH miệng axit → giảm hấp thu nicotine.'
    },
    {
      stem: 'Bupropion SR cai thuốc — cơ chế và chống chỉ định?',
      choices: [
        'Ức chế tái hấp thu noradrenaline/dopamine; CCĐ: tiền sử co giật, rối loạn ăn uống (chán/cuồng ăn), đang dùng MAOI, cai rượu/benzodiazepine đột ngột',
        'Đối kháng nicotine; không có CCĐ',
        'Đồng vận GABA; CCĐ chỉ trong thai kỳ',
        'Ức chế serotonin; CCĐ cao tuổi'
      ],
      answer: 0,
      explanation: 'Bupropion (Zyban SR 150mg) tăng dopamine ở nucleus accumbens, giảm cravings. CCĐ: tiền sử co giật/động kinh, rối loạn ăn uống (anorexia/bulimia làm tăng nguy cơ co giật do rối loạn điện giải), MAOI cùng lúc (HC serotonin/HA cấp), cai rượu/BZD (hạ ngưỡng co giật).'
    },
    {
      stem: 'Varenicline (Champix) cai thuốc — cơ chế?',
      choices: [
        'Đồng vận đơn thuần receptor nicotine α4β2',
        'Đối kháng đơn thuần receptor nicotine',
        'Đồng vận một phần (partial agonist) receptor nicotine α4β2: vừa kích thích một phần (giảm cravings) vừa cản nicotine bám vào (giảm thưởng từ hút)',
        'Ức chế MAO'
      ],
      answer: 2,
      explanation: 'Varenicline là partial agonist α4β2 nAChR: kích thích ~50% giải phóng dopamine (đủ giảm cravings + cai) đồng thời block nicotine không tăng thêm dopamine khi hút (loại bỏ thưởng). Hiệu quả mạnh nhất trong monotherapy. Liều: tuần 1 titrate 0.5mg→1mg x 2, sau đó 1mg x 2/ngày x 12 tuần.'
    },
    {
      stem: 'Set quit date (ngày bỏ thuốc) khi bắt đầu varenicline?',
      choices: [
        'Cùng ngày bắt đầu thuốc',
        '1-2 tuần sau khi bắt đầu thuốc — thuốc đạt steady state, dùng tiếp 12 tuần (có thể kéo dài 24 tuần để chống tái nghiện)',
        '6 tháng sau bắt đầu thuốc',
        'Không cần set quit date'
      ],
      answer: 1,
      explanation: 'Varenicline: bắt đầu thuốc 1-2 tuần trước quit date (để đạt steady state, giảm cravings từ trước). Quit date thường vào tuần 2 (ngày 8). Total course 12 tuần, có thể kéo dài 24 tuần để giảm tái phát.'
    },
    {
      stem: 'Phản ứng phụ đáng chú ý của varenicline?',
      choices: [
        'Buồn nôn (~30%), mộng/ác mộng sống động, đau đầu — và cảnh báo cũ về thay đổi tâm trạng/ý nghĩ tự sát (đã rút lại sau nghiên cứu EAGLES 2016 thấy không tăng nguy cơ)',
        'Tăng cân nhanh',
        'Mất ngủ duy nhất',
        'Phản vệ thường gặp'
      ],
      answer: 0,
      explanation: 'ADR phổ biến: buồn nôn 30% (uống sau ăn + nước nhiều giúp giảm), giấc mơ sống động/ác mộng (uống liều tối sớm hơn), đau đầu, táo bón. FDA black box về tâm thần đã được rút năm 2016 sau EAGLES study cho thấy không tăng nguy cơ so với placebo.'
    },
    {
      stem: 'Motivational interviewing (MI) — nguyên tắc OARS?',
      choices: [
        'Open questions, Affirmations, Reflective listening, Summarizing',
        'Orders, Argument, Refuse, Stop',
        'Optimism, Adjustment, Reason, Strength',
        'Origin, Address, Resolve, Schedule'
      ],
      answer: 0,
      explanation: 'OARS = Open questions (câu hỏi mở), Affirmations (xác nhận điểm mạnh), Reflective listening (lắng nghe phản chiếu), Summarizing (tóm tắt). MI tránh đối đầu, gợi mở change talk từ bệnh nhân, tôn trọng autonomy.'
    },
    {
      stem: 'Trong vòng bao lâu sau khi bỏ thuốc, lợi ích sức khoẻ xuất hiện?',
      choices: [
        'Phải đợi 10 năm mới có lợi ích',
        '20 phút: HA + nhịp tim về bình thường; 12 giờ: CO máu về bình thường; 2-12 tuần: lưu thông + chức năng phổi cải thiện; 1 năm: nguy cơ NMCT giảm 1/2; 10 năm: nguy cơ ung thư phổi giảm 1/2',
        'Không có lợi ích nếu đã hút >20 năm',
        'Chỉ có lợi ích ở người trẻ'
      ],
      answer: 1,
      explanation: 'Timeline lợi ích bỏ thuốc (CDC): 20 phút HA/HR bình thường, 12h CO bình thường, 2 tuần - 3 tháng tuần hoàn/phổi cải thiện, 1-9 tháng giảm ho, 1 năm giảm 1/2 nguy cơ tim, 5 năm giảm đột quỵ về như không hút, 10 năm giảm 1/2 ung thư phổi, 15 năm tim như không hút.'
    }
  ]
};

export const SC11_QUIZ_01 = {
  id: 'SC11-quiz-01',
  title: 'Travel medicine - tư vấn dược du lịch',
  kind: 'quiz',
  subject: 'Y học du lịch',
  difficulty: 4,
  skillsTrained: ['travel-vaccination', 'malaria-prophylaxis', 'travelers-diarrhea', 'altitude-sickness', 'pretravel-counseling'],
  questions: [
    {
      stem: 'Vaccine bắt buộc (yellow fever certificate) cho người Việt Nam vào châu Phi/Nam Mỹ vùng lưu hành?',
      choices: [
        'Vaccine tả',
        'Vaccine sốt vàng (yellow fever) — chỉ tiêm ≥10 ngày trước khởi hành tại trung tâm tiêm chủng quốc tế, có hiệu lực suốt đời (WHO 2016)',
        'Vaccine cúm',
        'Vaccine sởi'
      ],
      answer: 1,
      explanation: 'Sốt vàng (Yellow fever) là yêu cầu nhập cảnh bắt buộc cho >40 nước châu Phi cận Sahara và Nam Mỹ Amazon (Brazil, Peru, Bolivia, Colombia). International Certificate of Vaccination (ICVP/Yellow Card) cần ≥10 ngày để có hiệu lực. WHO 2016: bảo vệ suốt đời, không cần boost sau 10 năm.'
    },
    {
      stem: 'Vaccine khuyến cáo cho du lịch Đông Nam Á (Lào, Campuchia, Thái Lan vùng nông thôn)?',
      choices: [
        'Viêm não Nhật Bản (JE), viêm gan A, viêm gan B, tả (nếu ăn uống vệ sinh kém), thương hàn',
        'Sốt vàng',
        'Bệnh dại Châu Phi',
        'Bệnh than'
      ],
      answer: 0,
      explanation: 'Đông Nam Á: JE (lưu hành mạnh, nguy cơ cao mùa mưa vùng nông thôn lúa nước), viêm gan A (lây qua thực phẩm/nước), viêm gan B (du lịch dài, tiếp xúc y tế), thương hàn, tả. Dại nếu tiếp xúc động vật. Sốt vàng KHÔNG có ở châu Á.'
    },
    {
      stem: 'Du lịch Đông Phi (Kenya, Tanzania) vùng sốt rét lưu hành — kháng sốt rét phòng ngừa?',
      choices: [
        'Chloroquine (kháng đã phổ biến)',
        'Mefloquine (Lariam) hoặc Atovaquone-proguanil (Malarone) hoặc Doxycycline — tránh chloroquine đơn thuần (kháng)',
        'Quinine sulfate',
        'Không cần thuốc'
      ],
      answer: 1,
      explanation: 'P.falciparum Đông Phi kháng chloroquine. Lựa chọn: mefloquine 250mg/tuần (bắt đầu 2 tuần trước, trong suốt và 4 tuần sau khi rời vùng), atovaquone-proguanil 1 viên/ngày (1-2 ngày trước, đến 7 ngày sau), doxycycline 100mg/ngày (1-2 ngày trước, đến 4 tuần sau). Mefloquine CCĐ: tâm thần, động kinh, rối loạn dẫn truyền tim.'
    },
    {
      stem: 'Du lịch Đông Nam Á vùng biên giới Thái-Cambodia kháng đa thuốc — lựa chọn?',
      choices: [
        'Mefloquine (kháng rộng vùng này)',
        'Atovaquone-proguanil hoặc doxycycline (vẫn còn nhạy với P.falciparum vùng Greater Mekong)',
        'Chloroquine đơn thuần',
        'Primaquine đơn thuần'
      ],
      answer: 1,
      explanation: 'Greater Mekong (Thái-Lào-Cambodia-Myanmar biên giới): kháng mefloquine + chloroquine. Atovaquone-proguanil hoặc doxy là first-line. Việt Nam vùng cao nguyên + biên giới cũng có kháng đa thuốc. CDC cập nhật bản đồ kháng hàng năm.'
    },
    {
      stem: 'Tiêu chảy du lịch (travelers\' diarrhea) — kháng sinh first-line?',
      choices: [
        'Doxycycline',
        'Ciprofloxacin 500mg x 2 lần x 1-3 ngày (đa số nước); Azithromycin 1g liều duy nhất hoặc 500mg x 3 ngày — ưu tiên cho Đông/Nam Á (kháng quinolone) và trẻ em/thai phụ',
        'Penicillin',
        'Vancomycin'
      ],
      answer: 1,
      explanation: 'TD do ETEC (60-70%), Campylobacter, Shigella. Cipro 500mg BID x 1-3 ngày hiệu quả với E.coli ETEC. Đông Nam Á + Ấn Độ: Campylobacter kháng quinolone cao → azithromycin first-line (1g liều đơn hoặc 500mg x 3 ngày). Loperamide hỗ trợ trừ khi tiêu chảy máu hoặc sốt cao.'
    },
    {
      stem: 'Bộ kit medicine cá nhân khi đi du lịch nên có?',
      choices: [
        'Chỉ paracetamol',
        'ORS (oresol), loperamide, kháng sinh tiêu chảy đặt sẵn (cipro/azithro), paracetamol/ibuprofen, kem chống nắng SPF 30+, DEET 30%, thuốc chống say tàu xe, antihistamine, thuốc cá nhân (mãn tính) đủ + 1 tuần dự phòng',
        'Chỉ thuốc kháng sinh',
        'Vitamin tổng hợp duy nhất'
      ],
      answer: 1,
      explanation: 'Kit chuẩn: ORS, loperamide, KS dự phòng, giảm đau-hạ sốt, kem chống nắng, chống muỗi DEET 20-50%, motion sickness (dimenhydrinate/scopolamine), antihistamine, băng dán, sát khuẩn nhỏ, thuốc cá nhân + 1 tuần dự phòng (mất hành lý). Mang đơn thuốc tiếng Anh.'
    },
    {
      stem: 'Phòng ngừa say độ cao (altitude sickness) cho người leo >2500m?',
      choices: [
        'Lên độ cao thật nhanh để thích nghi',
        'Acetazolamide (Diamox) 125-250mg x 2/ngày bắt đầu 1 ngày trước lên cao, tiếp 2-3 ngày sau khi đến độ cao đỉnh; lên cao từ từ (<500m/ngày khi >3000m); uống đủ nước; tránh rượu',
        'Uống nhiều rượu để giãn mạch',
        'Không có cách phòng'
      ],
      answer: 1,
      explanation: 'AMS (acute mountain sickness) đỉnh khi >2500m. Acetazolamide tăng acid hoá máu → tăng thông khí bù → tăng oxy. 125mg BID đủ (tránh tác dụng phụ tê, lợi tiểu). Dexamethasone là dự phòng/chữa thay thế. Quy tắc "climb high, sleep low": <500m chênh giấc ngủ/ngày khi >3000m, ngày nghỉ mỗi 1000m. HACE/HAPE → xuống độ cao + oxy + dexa/nifedipine.'
    },
    {
      stem: 'Phụ nữ thai 28 tuần đi máy bay quốc tế 10 giờ — nguy cơ và phòng?',
      choices: [
        'Không nguy cơ',
        'Nguy cơ DVT/PE tăng do bất động + tăng đông thai kỳ — phòng: vớ áp lực ép (compression stockings 15-20mmHg), đi lại trong cabin mỗi 2 giờ, uống nước, cử động chân tại chỗ; LMWH dự phòng nếu có yếu tố nguy cơ cao bổ sung',
        'Cấm bay trong thai kỳ',
        'Bay không ảnh hưởng'
      ],
      answer: 1,
      explanation: 'Thai kỳ là yếu tố tăng đông sinh lý. Bay dài (>4h) tăng nguy cơ DVT/PE ~5x. Phòng: vớ áp lực 15-20mmHg, đi lại mỗi 2h, hydration, cử động chân (calf pumps). LMWH (enoxaparin) nếu nguy cơ cao (tiền sử VTE, thrombophilia). Hãng bay nhiều nơi cấm bay sau 36 tuần (32 tuần đa thai).'
    },
    {
      stem: 'Phòng muỗi đốt khi du lịch?',
      choices: [
        'Chỉ dùng vitamin B1',
        'DEET 20-50% (>20% cho 2-5h bảo vệ, >50% không tăng thêm; trẻ <2 tháng không dùng), Picaridin 20%, IR3535, dầu khuynh diệp chanh OLE; quần áo dài sáng màu; permethrin trên quần áo/màn; ngủ trong màn permethrin-treated',
        'Tỏi và hành tây ăn',
        'Sả thật tự nhiên duy nhất'
      ],
      answer: 1,
      explanation: 'EPA-registered: DEET (gold standard, 20-30% đủ cho 5-6h), Picaridin (ít gây kích ứng hơn DEET), IR3535, OLE (oil of lemon eucalyptus). Áo dài sáng màu (muỗi thu hút màu tối). Permethrin lên quần áo/màn (không lên da). DEET >30% cho vùng sốt rét/sốt vàng. Vitamin B1 và sả không có bằng chứng.'
    },
    {
      stem: 'Tư vấn rabies (dại) cho du lịch?',
      choices: [
        'Tiêm dự phòng (pre-exposure prophylaxis - PrEP rabies) 3 liều cho người làm việc với động vật, du lịch dài/vùng xa, trẻ em — chỉ giảm số liều/không cần immunoglobulin nếu phơi nhiễm, KHÔNG miễn khỏi phải tiêm sau phơi nhiễm',
        'PrEP rabies thay thế post-exposure hoàn toàn',
        'Chỉ cần rửa vết thương khi bị cắn',
        'Dại đã có thuốc chữa'
      ],
      answer: 0,
      explanation: 'PrEP rabies 3 liều (D0, D7, D21 hoặc D28) cho người nguy cơ cao. Sau phơi nhiễm: người PrEP chỉ cần 2 liều boost (D0, D3), KHÔNG cần immunoglobulin (RIG). Người chưa PrEP: 4-5 liều (D0, D3, D7, D14, +/-D28) + RIG vào vết thương. Rửa vết thương 15 phút xà phòng là bước cứu mạng đầu tiên. Dại lên triệu chứng = tử vong 100%.'
    }
  ]
};

export const SC13_QUIZ_01 = {
  id: 'SC13-quiz-01',
  title: 'Tư vấn HIV/STI và PrEP/PEP',
  kind: 'quiz',
  subject: 'HIV/STI counseling',
  difficulty: 4,
  skillsTrained: ['PrEP', 'PEP', 'HIV-testing', 'partner-notification', 'stigma-reduction', 'youth-counseling'],
  questions: [
    {
      stem: 'Phác đồ PEP (Post-Exposure Prophylaxis) cho người trưởng thành theo BYT 2024 / WHO?',
      choices: [
        'TDF/3TC + DTG (dolutegravir) x 28 ngày, bắt đầu càng sớm càng tốt trong vòng 72 giờ sau phơi nhiễm',
        'AZT đơn thuần x 4 tuần',
        'TDF/FTC x 12 tuần',
        'Không có PEP'
      ],
      answer: 0,
      explanation: 'BYT 2024 + WHO: PEP = TDF 300mg + 3TC (lamivudine) 300mg + DTG (dolutegravir) 50mg, 1 viên/ngày x 28 ngày. Hiệu quả tối ưu trong 2h, vẫn dùng đến 72h. Sau 72h không khuyến cáo. Test HIV baseline + 4-6 tuần + 3 tháng. Theo dõi creatinin (TDF) và LFT.'
    },
    {
      stem: 'PrEP (Pre-Exposure Prophylaxis) chuẩn cho người nguy cơ cao?',
      choices: [
        'TDF/FTC (Truvada) 1 viên/ngày — uống hàng ngày (oral daily PrEP); hoặc on-demand "2-1-1" cho MSM (2 viên 2-24h trước QHTD, 1 viên 24h sau liều đầu, 1 viên 48h sau)',
        'Chỉ uống khi quan hệ tình dục',
        'Không có thuốc dự phòng',
        'Vaccine HIV'
      ],
      answer: 0,
      explanation: 'PrEP TDF/FTC: hiệu quả >99% nếu tuân thủ tốt với MSM. Daily PrEP: cần ~7 ngày đạt nồng độ bảo vệ trực tràng (MSM), 21 ngày bảo vệ âm đạo (nữ cisgender). Event-driven "2-1-1" chỉ cho MSM (không phù hợp nữ). Tenofovir alafenamide/FTC (Descovy) thay thế cho ai có vấn đề thận/xương — không khuyến cáo cho QHTD âm đạo.'
    },
    {
      stem: 'Test HIV generation 4 (4th generation) phát hiện gì?',
      choices: [
        'Chỉ kháng thể anti-HIV',
        'Kháng thể anti-HIV + kháng nguyên p24 — rút ngắn cửa sổ huyết thanh xuống ~15-20 ngày (vs ~25-30 ngày của 3rd gen chỉ kháng thể)',
        'Chỉ kháng nguyên',
        'Chỉ RNA virus'
      ],
      answer: 1,
      explanation: '4th gen (Combo/Duo): IgG/IgM anti-HIV + Ag p24. Cửa sổ ~15-20 ngày (Ag p24 xuất hiện trước Ab). 3rd gen: chỉ Ab, cửa sổ ~25-30 ngày. RNA-NAT (PCR) cửa sổ ngắn nhất ~10-14 ngày nhưng đắt, dùng khi nghi cấp tính. Test nhanh 3rd gen (rapid test máu/dịch) cửa sổ dài hơn.'
    },
    {
      stem: 'U=U (Undetectable = Untransmittable) nghĩa là?',
      choices: [
        'Người HIV(+) điều trị ARV với tải lượng virus dưới ngưỡng phát hiện (<200 copies/mL liên tục ≥6 tháng) KHÔNG lây truyền qua quan hệ tình dục',
        'HIV có thể chữa khỏi',
        'Không cần dùng bao cao su nếu là partner HIV(-)',
        'U=U chỉ áp dụng cho dị tính'
      ],
      answer: 0,
      explanation: 'U=U dựa trên PARTNER, HPTN 052: 0 ca lây qua TD khi ART đủ thời gian + VL dưới ngưỡng. CDC, WHO, BYT đều công nhận. Lưu ý: vẫn lây qua đường máu/kim, mẹ-con (giảm mạnh). U=U không bảo vệ STI khác và mang thai → bao cao su vẫn được khuyên với mục đích này.'
    },
    {
      stem: 'Partner notification cho HIV(+) — BYT VN cho phép?',
      choices: [
        'Đăng công khai',
        'Patient referral (BN tự thông báo - ưu tiên), Provider referral (NV y tế thông báo với đồng ý BN), Anonymous notification (qua CDC, không nêu tên người chỉ điểm) — BẢO MẬT, tự nguyện',
        'Báo cho công an',
        'Báo công khai tại nơi làm việc'
      ],
      answer: 1,
      explanation: 'Luật HIV/AIDS 2006 + BYT 2024: thông tin HIV được bảo mật tuyệt đối. Partner notification tự nguyện theo 3 mô hình. Tiết lộ thông tin HIV trái phép có thể bị xử lý hình sự (Điều 8 Luật HIV). Trong tình huống partner có nguy cơ tức thì + bệnh nhân từ chối tự thông báo + nhân viên y tế đã hết khả năng thuyết phục: có thể cân nhắc duty to warn (luật chưa rõ ràng).'
    },
    {
      stem: 'Người trẻ MSM 16 tuổi đến hỏi PrEP — xử trí?',
      choices: [
        'Từ chối vì chưa 18',
        'Tư vấn confidential, đánh giá nguy cơ, làm test HIV/STI, thảo luận sức khoẻ tình dục, có thể kê PrEP từ 35kg trở lên (FDA chấp thuận TDF/FTC cho thanh thiếu niên); cân nhắc luật VN cho phép ≥16 tự quyết định sức khoẻ một số trường hợp; khuyến khích sự hỗ trợ của người tin cậy',
        'Yêu cầu có người lớn đi cùng bắt buộc',
        'Báo nhà trường'
      ],
      answer: 1,
      explanation: 'FDA 2018 chấp thuận TDF/FTC PrEP cho ≥35kg (kể cả thanh thiếu niên). VN: Luật trẻ em 2016 + Luật KCB cho phép trẻ ≥16 quyết định sức khoẻ trong một số tình huống. Bảo mật tối đa với LGBT+ trẻ tuổi để giảm minority stress. Báo nhà trường vi phạm bí mật và gây hại.'
    },
    {
      stem: 'Theo dõi PrEP cần làm gì?',
      choices: [
        'Không cần theo dõi',
        'Test HIV trước khởi đầu + mỗi 3 tháng (loại trừ HIV cấp), creatinin trước + 6-12 tháng (TDF nephrotoxicity), STI screen 3-6 tháng, mật độ xương nếu nguy cơ, đánh giá tuân thủ và hành vi nguy cơ',
        'Chỉ test HIV 1 năm/lần',
        'Chỉ siêu âm bụng'
      ],
      answer: 1,
      explanation: 'PrEP follow-up: HIV test mỗi 3 tháng (TDF/FTC có thể chọn lọc kháng nếu HIV(+) chưa phát hiện → thất bại). CrCl mỗi 6-12 tháng (TDF tăng creatinin, nguy cơ tubular dysfunction, Fanconi). STI screening (giang mai, lậu, chlamydia) 3-6 tháng. HBV screen baseline (TDF + HBV: rút PrEP có thể bùng phát viêm gan).'
    },
    {
      stem: 'Loại bao cao su nào hiệu quả phòng HIV và STI?',
      choices: [
        'Bao cao su latex hoặc polyurethane (không thấm virus) — sử dụng đúng cách: trong cả lần QHTD, kiểm tra hạn dùng, dùng chất bôi trơn gốc nước/silicone (KHÔNG gốc dầu với latex vì làm hỏng)',
        'Bao da cừu (lambskin) hiệu quả nhất',
        'Bao cao su tái sử dụng',
        'Không có bao nào hiệu quả'
      ],
      answer: 0,
      explanation: 'Latex là gold standard cho HIV/STI. Polyurethane/polyisoprene cho người dị ứng latex. Lambskin (ruột cừu) KHÔNG phòng được HIV (lỗ lớn hơn virus). Chất bôi trơn dầu (Vaseline, baby oil) làm latex hỏng → dùng water-based hoặc silicone-based. Nữ-condom (FC2) cũng hiệu quả.'
    },
    {
      stem: 'Bệnh nhân kêu xấu hổ khi mua test HIV ở quầy thuốc. Ứng xử?',
      choices: [
        '"Đáng ra phải biết phòng tránh"',
        '"Cảm ơn bạn đã chủ động chăm sóc sức khoẻ. Quầy chúng tôi bảo mật. Em có thể chỉ bạn cách dùng test ở nhà, hoặc bạn có muốn được hỗ trợ tư vấn miễn phí ở Trung tâm Y tế dự phòng/PAC không?"',
        'Hỏi to tên và quê quán',
        'Từ chối bán'
      ],
      answer: 1,
      explanation: 'Phá vỡ kỳ thị (destigmatization): khen ngợi chủ động xét nghiệm, cam kết bảo mật, không hỏi tại sao, đề cập dịch vụ chuyên biệt miễn phí (Trung tâm phòng chống HIV/AIDS, các phòng OPC, các tổ chức cộng đồng MSM/TG). Self-test HIV (oral fluid) đã được WHO khuyến cáo và VN có lưu hành.'
    },
    {
      stem: 'Phụ nữ mang thai HIV(+) — chiến lược dự phòng lây truyền mẹ-con (PMTCT)?',
      choices: [
        'Không có cách nào',
        'ART suốt thai kỳ (TDF/3TC + DTG ưu tiên hiện nay), sinh mổ chủ động nếu VL gần sinh >1000 copies/mL, AZT cho trẻ sơ sinh 4-6 tuần (hoặc nevirapine kết hợp nếu nguy cơ cao), tránh cho bú trực tiếp (sữa thay thế hoàn toàn ở VN), test trẻ PCR 6 tuần và lặp',
        'Cấm mang thai',
        'Chỉ cần kiêng giao hợp khi mang thai'
      ],
      answer: 1,
      explanation: 'PMTCT: ART liên tục đạt VL undetectable. Sinh thường ổn nếu VL <1000. Sinh mổ chủ động 38 tuần nếu VL ≥1000. Trẻ sơ sinh: AZT 4-6 tuần (low risk) hoặc AZT+3TC+NVP (high risk). VN: sữa thay thế thay sữa mẹ. Test PCR sơ sinh 4-6 tuần + 9 tháng + Ab 18 tháng. Tỷ lệ lây mẹ-con <1% với PMTCT tốt.'
    }
  ]
};

export const SC14_QUIZ_01 = {
  id: 'SC14-quiz-01',
  title: 'Quản lý đau theo bậc thang WHO',
  kind: 'quiz',
  subject: 'Pain management',
  difficulty: 4,
  skillsTrained: ['WHO-pain-ladder', 'opioid-titration', 'neuropathic-pain', 'pain-assessment', 'cancer-pain'],
  questions: [
    {
      stem: 'WHO analgesic ladder (bậc thang giảm đau) gồm 3 bậc?',
      choices: [
        'Bậc 1: opioid mạnh; Bậc 2: NSAID; Bậc 3: paracetamol',
        'Bậc 1: Paracetamol/NSAID +/- adjuvant; Bậc 2: opioid yếu (codein, tramadol) +/- non-opioid +/- adjuvant; Bậc 3: opioid mạnh (morphin) +/- non-opioid +/- adjuvant — by mouth, by clock, by ladder, for individual, attention to detail',
        'Chỉ có 1 bậc opioid',
        'Bậc 1: phẫu thuật'
      ],
      answer: 1,
      explanation: 'WHO ladder (1986, cập nhật): Bậc 1 NSAID/paracetamol; Bậc 2 opioid yếu (codein, tramadol); Bậc 3 opioid mạnh (morphin, oxycodone, fentanyl, hydromorphone). Mỗi bậc có thể + adjuvant (gabapentinoid, antidepressant, corticoid). Nguyên tắc 5: by the mouth, by the clock (theo giờ không PRN), by the ladder, for the individual, attention to detail.'
    },
    {
      stem: 'Bệnh nhân ung thư đại trực tràng VAS 8/10, đang dùng paracetamol 1g x 4/ngày. Bước tiếp theo?',
      choices: [
        'Tăng paracetamol >4g/ngày',
        'Nhảy bậc lên opioid mạnh (morphin uống immediate-release 5-10mg mỗi 4 giờ, titrate); có thể bỏ qua bậc 2 trong cancer pain nặng — đây là khuyến cáo cập nhật của WHO',
        'Chỉ tăng NSAID',
        'Không cần thuốc'
      ],
      answer: 1,
      explanation: 'Cancer pain nặng VAS ≥7: WHO update khuyến cáo có thể bỏ qua bậc 2 (yếu), lên thẳng opioid mạnh. Morphin IR (oramorph) 5-10mg mỗi 4h là chuẩn. Sau 24-48h tính tổng liều → chuyển sang opioid SR (MS Contin) chia 2 lần/ngày + IR cho breakthrough pain (1/6 tổng liều ngày).'
    },
    {
      stem: 'Liều morphin breakthrough pain (cơn đau bùng phát) tính như nào?',
      choices: [
        '1/10 tổng liều ngày',
        '1/6 tổng liều ngày (tương đương khoảng 10-20% tổng liều) — dạng IR uống nhanh hoặc fentanyl niêm mạc',
        'Bằng tổng liều ngày',
        '50% tổng liều ngày'
      ],
      answer: 1,
      explanation: 'Breakthrough/rescue dose = 1/6 tổng liều ngày, có thể lặp mỗi 1-4h. Ví dụ: MS Contin 60mg x 2/ngày = 120mg/ngày → rescue morphin IR 20mg (120/6) PRN. Sử dụng >3 lần/ngày → tăng nền 25-50%. Fentanyl niêm mạc/mũi cho breakthrough pain do tác dụng cực nhanh.'
    },
    {
      stem: 'Nguyên tắc tăng liều morphin trong cancer pain không kiểm soát?',
      choices: [
        'Tăng gấp đôi mỗi 24h cho đến kiểm soát đau, hoặc 25-50% mỗi lần điều chỉnh — không có liều trần với cancer pain miễn tác dụng phụ kiểm soát được',
        'Liều trần 30mg/ngày',
        'Không được tăng',
        'Chỉ tăng 5mg/tuần'
      ],
      answer: 0,
      explanation: 'Morphin không có liều trần trong cancer pain. Titrate 25-50% mỗi 24h, hoặc gấp đôi nếu đau dữ dội + dung nạp tốt. Giới hạn là tác dụng phụ (an thần quá mức, suy hô hấp). Cần kèm bisacodyl/macrogol dự phòng táo bón (luôn luôn), haloperidol/ondansetron 3-5 ngày đầu cho buồn nôn (dung nạp).'
    },
    {
      stem: 'Đau thần kinh (neuropathic pain) - thuốc first-line?',
      choices: [
        'Paracetamol đơn thuần',
        'Gabapentin (titrate 300mg→3600mg/ngày chia 3) hoặc pregabalin (75mg→600mg/ngày chia 2); SNRI duloxetine 60-120mg/ngày; TCA amitriptyline 10-75mg tối — opioid kém hiệu quả với đau thần kinh thuần',
        'NSAID cao liều',
        'Codein'
      ],
      answer: 1,
      explanation: 'Neuropathic pain (đau thần kinh - đái tháo đường, zona, sau hoá trị, tổn thương thần kinh) đáp ứng kém với opioid/NSAID đơn thuần. First-line: gabapentinoid (gabapentin, pregabalin), SNRI (duloxetine), TCA (amitriptyline, nortriptyline). Topic lidocaine patch cho post-herpetic. Capsaicin 8% patch chuyên dùng.'
    },
    {
      stem: 'Công cụ đánh giá đau ở người lớn còn tỉnh táo?',
      choices: [
        'NRS (Numerical Rating Scale 0-10), VAS (Visual Analog Scale 100mm), Verbal Rating Scale (none/mild/moderate/severe)',
        'Glasgow Coma Scale',
        'APGAR score',
        'Borg scale'
      ],
      answer: 0,
      explanation: 'NRS 0-10 (0 không đau, 10 đau nhất tưởng tượng): chuẩn lâm sàng, dễ dùng. VAS thước 100mm. VRS định tính. Cho trẻ em: Wong-Baker FACES (6 mặt). Người không giao tiếp: PAINAD (sa sút trí tuệ), BPS/CPOT (ICU). Đánh giá đau ban đầu + sau can thiệp 30-60 phút.'
    },
    {
      stem: 'Quy đổi opioid - morphin uống 30mg ≈ ?',
      choices: [
        'Morphin tiêm IV 30mg',
        'Morphin tiêm IV/SC 10mg (tỷ lệ 3:1 uống:tiêm), oxycodone uống ~20mg (1.5:1), hydromorphone uống ~7.5mg (4:1), fentanyl patch ~12mcg/h',
        'Codein uống 30mg',
        'Tramadol 30mg'
      ],
      answer: 1,
      explanation: 'Equianalgesic chart: morphin PO 30mg = morphin IV/SC 10mg = oxycodone PO 20mg = hydromorphone PO 7.5mg = fentanyl patch 12-25mcg/h. Khi chuyển sang opioid mới (rotation) — giảm 25-50% liều equivalent vì tolerance không hoàn toàn cross. Methadone phức tạp hơn, cần chuyên gia.'
    },
    {
      stem: 'Bệnh nhân nghi nghiện opioid (đau mãn không ung thư), chiến lược an toàn?',
      choices: [
        'Tăng liều theo yêu cầu',
        'Đánh giá nguy cơ (ORT, COMM, PMP - prescription monitoring), hợp đồng điều trị, thử nước tiểu định kỳ, giới hạn liều <90 MME/ngày (CDC), kê đơn ngắn (3-7 ngày cho đau cấp), naloxone đồng kê đơn nếu nguy cơ cao',
        'Cho opioid dài hạn không kiểm soát',
        'Cấm tất cả opioid'
      ],
      answer: 1,
      explanation: 'CDC 2022 guideline đau mãn non-cancer: ưu tiên non-opioid + non-pharmacologic. Nếu cần opioid: liều tối thiểu hiệu quả, <50 MME tốt nhất, >90 MME cần thận trọng đặc biệt. Risk tools (ORT, SOAPP-R). Urine drug screen. Naloxone co-prescription nếu >50 MME hoặc có yếu tố nguy cơ. Tránh đồng kê benzodiazepine.'
    },
    {
      stem: 'Tác dụng phụ opioid - cái nào KHÔNG dung nạp theo thời gian?',
      choices: [
        'Buồn nôn (dung nạp sau 3-5 ngày)',
        'An thần (dung nạp)',
        'Táo bón (KHÔNG dung nạp - cần laxative liên tục: macrogol, bisacodyl, methylnaltrexone nếu nặng)',
        'Ngứa (dung nạp)'
      ],
      answer: 2,
      explanation: 'Opioid-induced constipation (OIC) không dung nạp → laxative dự phòng SUỐT ĐỜI dùng opioid. Khuyến cáo: macrogol (osmotic) hàng ngày + bisacodyl/senna (stimulant) PRN. PAMORA (peripherally acting mu opioid receptor antagonist): methylnaltrexone, naloxegol cho OIC kháng trị. Các tác dụng phụ khác (buồn nôn, an thần, ngứa) dung nạp trong vài ngày.'
    },
    {
      stem: 'Bệnh nhân palliative care, opioid IV liên tục + breakthrough — naloxone khi nào?',
      choices: [
        'Mọi tác dụng phụ',
        'Chỉ khi suy hô hấp đe doạ tính mạng (RR <8, SpO2 <90% không đáp ứng oxy, mức tỉnh giảm) — liều thấp (40mcg pha loãng, lặp mỗi 1-2 phút) để tránh đảo ngược cả tác dụng giảm đau đột ngột gây cơn đau dữ dội + hội chứng cai',
        'An thần nhẹ',
        'Buồn nôn'
      ],
      answer: 1,
      explanation: 'Naloxone trong palliative care dùng thận trọng: chỉ khi suy hô hấp nguy hiểm. Liều thấp pha loãng (40-100mcg) titrate đến mức thở chấp nhận, không hết hoàn toàn. Đảo ngược toàn bộ → đau cấp tính dữ dội + hội chứng cai + có thể tử vong tâm thần ở người yếu. Half-life naloxone ngắn (30-90 phút) → cần lặp hoặc truyền liên tục với opioid long-acting.'
    },
    {
      stem: 'PCA (Patient-Controlled Analgesia) - nguyên tắc cài đặt cho post-op morphin IV?',
      choices: [
        'Liều demand cố định 10mg, không lockout',
        'Morphin: liều bolus demand 1-1.5mg, lockout 5-10 phút, không/có liều nền (basal) thấp cẩn thận (1mg/h cao tuổi, có thể 1-2mg/h người trẻ), 4h limit, giáo dục BN tự bấm khi đau',
        'Không cần lockout',
        'Liều demand 50mg morphin'
      ],
      answer: 1,
      explanation: 'PCA morphin chuẩn: bolus 1-1.5mg, lockout 5-10 phút (đảm bảo thuốc trước có hiệu lực mới bấm thêm), 4h limit ~30mg. Basal infusion gây tăng nguy cơ suy hô hấp, dùng thận trọng. Giáo dục: chỉ bệnh nhân tự bấm (không người nhà), bấm khi đau ≥4/10. Theo dõi RR, SpO2, sedation score.'
    }
  ]
};

export const SC15_QUIZ_01 = {
  id: 'SC15-quiz-01',
  title: 'Medication Therapy Management (MTM)',
  kind: 'quiz',
  subject: 'Pharmaceutical care',
  difficulty: 5,
  skillsTrained: ['CMR', 'DRP-classification', 'medication-reconciliation', 'polypharmacy-review', 'TIP-documentation'],
  questions: [
    {
      stem: 'CMR (Comprehensive Medication Review) là gì?',
      choices: [
        'Bán thuốc nhanh ở quầy',
        'Đánh giá toàn diện tất cả thuốc bệnh nhân đang dùng (kê đơn, OTC, TPCN, thảo dược) - thực hiện trực tiếp với BN ít nhất 1 lần/năm theo CMS - gồm: thu thập thông tin, đánh giá DRP, can thiệp, kế hoạch hành động (PML, MAP), follow-up',
        'Chỉ rà thuốc nội trú',
        'Kê đơn mới'
      ],
      answer: 1,
      explanation: 'CMR là dịch vụ MTM cốt lõi của ASHP/CMS: đối thoại bệnh nhân (face-to-face/telehealth), thu thập danh mục thuốc đầy đủ, đánh giá indication/effectiveness/safety/adherence, xác định DRP, lập Personal Medication List (PML) và Medication Action Plan (MAP), follow-up. Khác targeted medication review (TMR) - chỉ rà 1 vấn đề cụ thể.'
    },
    {
      stem: 'PCNE classification - DRP (Drug-Related Problem) categories chính?',
      choices: [
        'P1 Hiệu quả điều trị (P1.1 không hiệu quả, P1.2 không đủ tác dụng, P1.3 chưa điều trị); P2 An toàn (ADR); P3 Khác (chi phí, không cần thiết) — sau đó nguyên nhân C1-C9 và can thiệp I0-I4',
        'Chỉ 1 category duy nhất',
        'Phân loại theo màu sắc',
        'Theo kích thước viên'
      ],
      answer: 0,
      explanation: 'PCNE v9.1 (2020): Problem (P1 hiệu quả, P2 an toàn, P3 khác); Cause (C1 lựa chọn thuốc, C2 dạng bào chế, C3 liều, C4 thời điểm, C5 cấp phát/sử dụng, C6 bệnh nhân tâm lý/quên, C7 thiếu thông tin, C8 khác, C9 quá trình bệnh viện); Intervention (I0-I4); Acceptance (A); Outcome (O).'
    },
    {
      stem: 'Medication reconciliation tại 3 thời điểm chính?',
      choices: [
        'Chỉ khi xuất viện',
        'Admission (nhập viện - so sánh thuốc nhà với y lệnh nhập viện), Transfer (chuyển khoa/tầng), Discharge (ra viện - so sánh y lệnh nội trú với đơn về nhà) — Joint Commission National Patient Safety Goal',
        'Chỉ trong phòng mổ',
        'Mỗi giờ'
      ],
      answer: 1,
      explanation: 'Reconciliation 3 transitions of care: admission, transfer, discharge. Mỗi lần đối chiếu home meds vs. inpatient orders để phát hiện omission (bỏ thuốc), duplication (trùng), wrong dose, drug interaction. Discharge counseling đặc biệt quan trọng vì BN dễ nhầm thuốc cũ-mới ở nhà.'
    },
    {
      stem: 'Polypharmacy nghĩa là?',
      choices: [
        'Dùng 1 thuốc duy nhất',
        'Thường định nghĩa là dùng ≥5 thuốc cùng lúc; major polypharmacy ≥10; tăng nguy cơ DRP, té ngã, suy giảm nhận thức, hospitalization, tử vong - đặc biệt ở người cao tuổi',
        'Dùng thuốc 1 lần/năm',
        'Chỉ thuốc thảo dược'
      ],
      answer: 1,
      explanation: 'Polypharmacy ≥5 thuốc - 30-40% người ≥65 tuổi. Mỗi thuốc thêm tăng 7-10% nguy cơ ADR. Inappropriate polypharmacy (thuốc không cần thiết/PIM) cần deprescribing. Beers Criteria, STOPP/START là công cụ rà soát PIM (potentially inappropriate medication) ở người cao tuổi.'
    },
    {
      stem: 'Beers Criteria 2023 — thuốc cần TRÁNH ở người cao tuổi ≥65?',
      choices: [
        'Paracetamol',
        'First-gen antihistamine (diphenhydramine, hydroxyzine - tác dụng anticholinergic), benzodiazepine, NSAID dài hạn, glyburide, methocarbamol, doxazosin (BPH), digoxin >0.125mg/ngày',
        'Vitamin C',
        'Probiotics'
      ],
      answer: 1,
      explanation: 'Beers Criteria PIM ở ≥65: anticholinergic mạnh (diphenhydramine, oxybutynin), benzo (tăng té ngã, lú lẫn), Z-drugs >90 ngày, NSAID dài (loét, suy thận, tim), sulfonylurea long-acting (glyburide - hạ đường huyết kéo dài), digoxin >0.125mg (tăng độc), alpha-blocker tim mạch (doxazosin - hạ HA tư thế).'
    },
    {
      stem: 'STOPP/START tool dùng để?',
      choices: [
        'Chỉ định mới',
        'STOPP = Screening Tool of Older Persons\' Prescriptions (thuốc nên DỪNG nếu có); START = Screening Tool to Alert to Right Treatment (thuốc nên BẮT ĐẦU nếu có chỉ định) — bộ tiêu chí châu Âu cho người ≥65',
        'Chỉ điều trị tăng huyết áp',
        'Chỉ dành cho trẻ em'
      ],
      answer: 1,
      explanation: 'STOPP/START v3 (2023): STOPP rà soát PIM nên ngừng; START rà soát PPO (potential prescribing omission) thuốc thiếu mà nên thêm (statin cho ĐTĐ + nguy cơ tim mạch, ACEi cho suy tim phân suất tống máu giảm, calcium+vit D nguy cơ loãng xương, biphosphonate sau gãy do loãng xương). Bổ trợ Beers (Mỹ).'
    },
    {
      stem: 'Personal Medication List (PML) ASHP MTM gồm thông tin gì?',
      choices: [
        'Chỉ tên thuốc',
        'Tên thuốc (generic + brand), chỉ định, liều, đường dùng, tần suất, ngày bắt đầu, người kê, hướng dẫn đặc biệt, thuốc OTC/TPCN/thảo dược; cập nhật mỗi lần thay đổi - in copy đưa BN mang theo mọi lần khám',
        'Chỉ giá thuốc',
        'Chỉ màu viên'
      ],
      answer: 1,
      explanation: 'PML là tài liệu BN mang theo cho mọi nhà cung cấp dịch vụ y tế - giảm sai sót reconciliation. Phải đầy đủ rx + OTC + supplement + herbal. Cập nhật mọi thay đổi. Ngôn ngữ BN hiểu. Quan trọng đặc biệt cho người ≥65 đa bệnh đa thuốc.'
    },
    {
      stem: 'Medication Action Plan (MAP) ASHP MTM gồm?',
      choices: [
        'Chỉ kế hoạch của dược sĩ',
        'Kế hoạch ngắn, hành động cụ thể cho bệnh nhân tự thực hiện - mỗi item: "Vấn đề/mục tiêu — Việc tôi (BN) cần làm — Việc tôi đã làm — Khi nào hoàn thành" - phân chia thông tin cho dược sĩ và cho prescriber',
        'Toàn bộ ICD-10',
        'Chỉ định mới'
      ],
      answer: 1,
      explanation: 'MAP - patient-friendly action plan: ngôn ngữ dễ hiểu, mỗi action item rõ ràng, BN tự checklist. Khác với plan cho prescriber (technical: liều, drug interaction, monitoring). MAP tăng patient engagement và follow-through, giảm DRP và readmission.'
    },
    {
      stem: 'TIP framework trong MTM?',
      choices: [
        'Tip = gợi ý nhanh',
        'TIP = Target (mục tiêu cụ thể, SMART) - Intervention (can thiệp dược) - Plan (kế hoạch theo dõi, ngày tái khám, kết quả mong đợi) — tài liệu hoá mỗi tương tác MTM',
        'Chỉ dành cho nội trú',
        'Tên một thuốc'
      ],
      answer: 1,
      explanation: 'TIP - khung tài liệu hoá MTM: T (Target - mục tiêu lâm sàng cụ thể có thể đo được, ví dụ "HbA1c <7% trong 3 tháng"), I (Intervention - thuốc/can thiệp/giáo dục/chuyển khám/báo bác sĩ), P (Plan - timeline follow-up, marker theo dõi, ngày tái đánh giá). Hỗ trợ billing/reimbursement MTM và tracking outcome.'
    },
    {
      stem: 'Adherence assessment - công cụ nào?',
      choices: [
        'Hỏi chung chung',
        'MMAS-8 (Morisky Medication Adherence Scale - 8 câu), self-report, pharmacy refill records (PDC - Proportion of Days Covered ≥80% là tuân thủ tốt), pill count, electronic monitoring (MEMS cap), drug level',
        'Đo huyết áp',
        'Siêu âm bụng'
      ],
      answer: 1,
      explanation: 'Đo adherence multimodal: MMAS-8 (>0.83 sensitivity), pharmacy refill PDC ≥80% chuẩn quality measure CMS, pill count (overestimate), MEMS cap (đắt nhưng chính xác). Self-report dễ overestimate. Hỏi "non-judgmental": "Nhiều người khó nhớ uống đúng. Trong tuần qua bạn có quên/lỡ liều nào không?"'
    },
    {
      stem: 'Deprescribing - khi nào cân nhắc?',
      choices: [
        'Không bao giờ',
        'Khi: hết indication (PPI sau loét đã lành >8 tuần, BZD dùng quá 4 tuần cho mất ngủ), lợi ích-nguy cơ không còn phù hợp (life expectancy ngắn + bisphosphonate, statin primary prevention cao tuổi), ADR/tương tác, BN ưu tiên - thực hiện taper từ từ, theo dõi triệu chứng dội',
        'Tự ý dừng tất cả thuốc',
        'Mỗi 1 tháng'
      ],
      answer: 1,
      explanation: 'Deprescribing có hệ thống (Scott et al, Reeve et al frameworks): xem xét mỗi thuốc còn indication không, lợi ích vs nguy cơ hiện tại, có thuốc thay tốt hơn, BN muốn ngừng không, taper từ từ (BZD, PPI, opioid, antidepressant - tránh hội chứng cai/dội). Tài liệu rõ. Cộng tác với prescriber. Theo dõi tái phát/triệu chứng dội.'
    }
  ]
};

export const SC09_QUIZ_01 = {
  id: 'SC09-quiz-01',
  title: 'SC09 · Tư vấn giảm cân — Béo phì',
  kind: 'quiz',
  subject: 'Tư vấn béo phì và kiểm soát cân nặng',
  difficulty: 3,
  skillsTrained: ['obesity-counseling', 'pharmacotherapy-obesity', 'lifestyle-modification', 'bmi-assessment'],
  questions: [
    {
      stem: 'Bệnh nhân nữ 35 tuổi, cân 80 kg, cao 1.60 m. BMI của bệnh nhân là bao nhiêu và phân loại theo WHO cho người châu Á?',
      choices: [
        'BMI 31.25 — thừa cân nhẹ',
        'BMI 31.25 — béo phì độ I (theo ngưỡng WHO châu Á: BMI ≥ 27.5 = béo phì)',
        'BMI 28.0 — thừa cân',
        'BMI 31.25 — trong giới hạn bình thường'
      ],
      answer: 1,
      explanation: 'BMI = 80 / (1.60)² = 31.25 kg/m². Ngưỡng WHO châu Á (IOTF 2000): thừa cân ≥ 23, béo phì ≥ 27.5. BMI 31.25 > 27.5 = béo phì độ I. Ngưỡng này thấp hơn ngưỡng Caucasian (béo phì ≥ 30) vì người châu Á có % mỡ nội tạng cao hơn ở cùng BMI. BYT VN sử dụng ngưỡng châu Á.'
    },
    {
      stem: 'Bệnh nhân hỏi về orlistat (thuốc giảm cân OTC 60 mg). Cơ chế và tác dụng phụ chính là gì?',
      choices: [
        'Ức chế tái hấp thu serotonin, tác dụng phụ: khô miệng',
        'Ức chế lipase tụy → giảm hấp thu mỡ 30%; tác dụng phụ: tiêu chảy dầu, phân mỡ, tiêu không tự chủ — giảm khi hạn chế mỡ < 30% tổng calorie; uống trong bữa ăn hoặc trong 1 giờ sau',
        'Ức chế hấp thu glucose, tác dụng phụ: hạ đường huyết',
        'Tăng nhiệt độ cơ thể để đốt mỡ, tác dụng phụ: sốt'
      ],
      answer: 1,
      explanation: 'Orlistat (Xenical 120 mg Rx, Alli 60 mg OTC): ức chế lipase tụy và dạ dày → giảm phân giải và hấp thu triglyceride 30%. Hiệu quả: giảm ~3 kg so với giả dược sau 12 tháng. Tác dụng phụ tiêu hóa do mỡ không tiêu hóa trong ruột: phân dầu/nhờn, tiêu chảy, tiêu không kiểm soát — giảm đáng kể khi ăn ít mỡ. Uống ngay trong bữa hoặc trong 1 giờ sau ăn; bỏ qua nếu bữa không có mỡ. Bổ sung vitamin tan trong dầu (A, D, E, K) cách 2 giờ.'
    },
    {
      stem: 'Bệnh nhân hỏi: "Tôi có thể dùng sibutramine giảm cân không?" Câu trả lời đúng?',
      choices: [
        'Được, sibutramine rất hiệu quả và an toàn',
        'Sibutramine đã bị thu hồi toàn cầu từ 2010 vì tăng nguy cơ nhồi máu cơ tim và đột quỵ (nghiên cứu SCOUT); bất hợp pháp để mua bán tại VN và hầu hết thế giới; cảnh báo nhiều thực phẩm chức năng giảm cân chứa sibutramine ẩn',
        'Được nhưng chỉ dùng ngắn hạn 1 tháng',
        'Sibutramine chỉ cần kê đơn, có thể mua ở nhà thuốc'
      ],
      answer: 1,
      explanation: 'Sibutramine thu hồi thị trường toàn cầu năm 2010 sau nghiên cứu SCOUT (n=9804 bệnh nhân tim mạch): tăng 16% biến cố tim mạch chính (MACE). Bị cấm ở EU, Mỹ, Úc, VN. Tuy nhiên, Cục An toàn thực phẩm VN liên tục phát hiện thực phẩm chức năng/sản phẩm giảm cân chứa sibutramine không khai báo. Cảnh báo người dùng tránh xa sản phẩm "giảm cân thần kỳ" không rõ nguồn gốc.'
    },
    {
      stem: 'Phụ nữ 40 tuổi BMI 33, đái tháo đường type 2, HbA1c 8.5%. Thuốc nào vừa kiểm soát đường huyết vừa giảm cân?',
      choices: [
        'Glibenclamide — hạ đường huyết tốt và giảm cân',
        'GLP-1 receptor agonist (semaglutide, liraglutide) hoặc SGLT2 inhibitor (empagliflozin, dapagliflozin) — vừa giảm HbA1c vừa giảm cân, có lợi tim mạch/thận',
        'Insulin glargine — kiểm soát đường huyết và trung tính với cân nặng',
        'Pioglitazone — ổn định đường huyết và giảm cân'
      ],
      answer: 1,
      explanation: 'ADA 2024 / EASD 2023: bệnh nhân ĐTĐ type 2 + béo phì + ASCVD/HF/CKD → ưu tiên GLP-1 RA hoặc SGLT2i. Semaglutide 1 mg/tuần tiêm: giảm HbA1c ~1.5%, giảm ~4–6 kg. Oral semaglutide (Rybelsus) hiệu quả tương tự. Liraglutide (Saxenda): chỉ định chính thức giảm cân ở BMI ≥ 27 + bệnh đồng mắc. SGLT2i: giảm 2–4 kg. Glibenclamide tăng cân, pioglitazone tăng cân và giữ nước.'
    },
    {
      stem: 'Bệnh nhân hỏi về thực phẩm chức năng giảm cân có CLA (Conjugated Linoleic Acid). Có bằng chứng không?',
      choices: [
        'CLA là chất thiên nhiên an toàn và hiệu quả cao, nên dùng',
        'Bằng chứng lâm sàng CLA rất yếu: meta-analysis cho thấy giảm khoảng 0.5–1 kg so với giả dược; không có dữ liệu an toàn dài hạn; một số nghiên cứu lo ngại tăng đề kháng insulin; không thay thế được can thiệp lối sống',
        'CLA chỉ hiệu quả kết hợp với caffeine',
        'CLA giảm mỡ nội tạng mạnh hơn mỡ dưới da'
      ],
      answer: 1,
      explanation: 'CLA (Conjugated Linoleic Acid): tổng hợp từ axit linoleic, thường từ dầu safflower hoặc hoa hướng dương. Meta-analysis 18 RCT (Whigham et al, 2007): giảm 0.09 kg/tuần (khoảng 0.5–1 kg tổng thể so với placebo). Hiệu quả lâm sàng không đáng kể. Một số nghiên cứu ghi nhận CLA t10c12 isomer có thể tăng kháng insulin ở người đái tháo đường. EFSA 2010: không đủ bằng chứng cho health claim. Hiệu quả/chi phí kém.'
    },
    {
      stem: 'Nguyên tắc cơ bản nhất để giảm cân bền vững là gì?',
      choices: [
        'Nhịn ăn hoàn toàn 3 ngày mỗi tuần',
        'Thâm hụt năng lượng 500–750 kcal/ngày so với nhu cầu duy trì, đạt được qua phối hợp giảm ăn và tăng vận động; mục tiêu thực tế: 0.5–1 kg/tuần; duy trì thâm hụt lâu dài quan trọng hơn tốc độ giảm',
        'Loại bỏ hoàn toàn carbohydrate khỏi khẩu phần',
        'Chỉ cần tập thể dục 1 giờ/ngày, không cần kiêng ăn'
      ],
      answer: 1,
      explanation: '1 kg mỡ = ~7700 kcal. Thâm hụt 500 kcal/ngày × 7 ngày = 3500 kcal ≈ 0.45 kg mỡ/tuần. Thực tế: cơ thể bù trừ bằng cách giảm chuyển hóa cơ bản khoảng 10–15% khi giảm cân → tốc độ thực thấp hơn tính lý thuyết. Kết hợp ăn kiêng + vận động thể lực (aerobic + resistance) duy trì cơ bắp và chuyển hóa. Very low calorie diet (< 800 kcal/ngày) phải có giám sát y tế. WHO/ADA/Obesity Society.'
    },
    {
      stem: 'Bệnh nhân hỏi: "Chế độ keto (ketogenic diet) có an toàn và hiệu quả dài hạn không?"',
      choices: [
        'Keto là phương pháp giảm cân an toàn nhất và nên duy trì vĩnh viễn',
        'Keto hiệu quả ngắn hạn (3–6 tháng) hơn low-fat diet nhưng lợi thế không còn sau 12 tháng; tác dụng phụ: mệt mỏi đầu (keto flu), táo bón, tăng cholesterol LDL ở một số người; dài hạn thiếu dữ liệu; không phù hợp: suy thận, bệnh gan, tiền sử sỏi thận, đái tháo đường type 1 dùng insulin',
        'Keto hoàn toàn không hiệu quả, không có bằng chứng nào',
        'Keto chỉ hiệu quả khi dùng cùng exogenous ketone supplements'
      ],
      answer: 1,
      explanation: 'Keto (carb < 50 g/ngày hoặc < 10% tổng calorie): NEJM 2020 meta-analysis: giảm nhiều hơn low-fat diet sau 6 tháng (~1–2 kg), nhưng không khác biệt ở 12–24 tháng. Tác dụng phụ ngắn hạn: keto flu (mệt, đau đầu, táo bón do mất muối). Dài hạn: nguy cơ tăng LDL (đặc biệt LDL-P), sỏi thận (tăng urate và calci), thiếu vi chất (kali, magie, vitamin C). Không phù hợp CKD (tải protein), bệnh gan. Cần giám sát bởi chuyên gia dinh dưỡng.'
    },
    {
      stem: 'Khi nào cần giới thiệu bệnh nhân béo phì đến phẫu thuật bariatric (giảm béo)?',
      choices: [
        'Khi BMI > 25 và thất bại với mọi chế độ ăn',
        'BMI ≥ 40 (hoặc ≥ 35 kèm bệnh đồng mắc như ĐTĐ, THA, ngưng thở khi ngủ) sau khi thất bại ≥ 6 tháng điều trị bảo tồn có kiểm soát; có thể xem xét BMI ≥ 30 kèm ĐTĐ type 2 khó kiểm soát (ADA 2022)',
        'Chỉ khi BMI > 50 hoặc đe dọa tính mạng trực tiếp',
        'Phẫu thuật bariatric luôn là lựa chọn đầu tay ở bất kỳ BMI nào'
      ],
      answer: 1,
      explanation: 'ASMBS/IFSO 2022 guidelines: bariatric phẫu thuật được cân nhắc khi: (1) BMI ≥ 40 bất kể bệnh đồng mắc; (2) BMI 35–39.9 kèm ≥ 1 bệnh đồng mắc nặng liên quan béo phì (ĐTĐ type 2, THA, hội chứng chuyển hóa, ngưng thở khi ngủ, bệnh khớp nặng); (3) BMI 30–34.9 với ĐTĐ type 2 không kiểm soát bằng nội khoa. Phải thất bại ≥ 6 tháng điều trị bảo tồn tích cực. Đánh giá toàn diện tâm lý, nội tiết trước mổ.'
    },
    {
      stem: 'Bệnh nhân béo phì hỏi về naltrexone/bupropion (Contrave). Cơ chế và ai không được dùng?',
      choices: [
        'Cơ chế ức chế lipase; chống chỉ định: người dùng PPI',
        'Naltrexone ức chế opioid receptor + bupropion ức chế tái hấp thu dopamine/noradrenalin → giảm cảm giác thèm ăn và tăng tiêu hao năng lượng; CCĐ: động kinh, bulimia, đang dùng MAOI, đang dùng opioid, THA không kiểm soát, mang thai',
        'Ức chế GLP-1 receptor; chống chỉ định: tiểu đường',
        'Cơ chế thẩm thấu tăng đào thải mỡ qua thận'
      ],
      answer: 1,
      explanation: 'Naltrexone/bupropion (Contrave, FDA 2014): tác động vào hai trục thần kinh điều hòa thèm ăn. Bupropion kích thích POMC neurons giảm thèm ăn, naltrexone ức chế feedback âm. Giảm trung bình ~4–5% cân nặng so với placebo. Chống chỉ định quan trọng nhất: (1) Động kinh/hạ ngưỡng co giật (bupropion liều cao); (2) Bulimia/anorexia nervosa; (3) Đang dùng opioid (naltrexone block); (4) MAOI trong 14 ngày; (5) THA không kiểm soát. FDA phải cảnh báo black box về ý nghĩ tự tử (bupropion).'
    },
    {
      stem: 'Bệnh nhân hỏi: "Tôi muốn giảm cân nhanh 10 kg trong 1 tháng. Có thực hiện được và an toàn không?"',
      choices: [
        'Hoàn toàn khả thi nếu dùng thuốc giảm cân mạnh',
        'Mục tiêu 10 kg/tháng là không thực tế và nguy hiểm: đòi hỏi thâm hụt ~2.500 kcal/ngày — không bền vững, mất cơ nhiều hơn mỡ, thiếu dinh dưỡng nghiêm trọng; mục tiêu an toàn và bền vững là 0.5–1 kg/tuần (thâm hụt 500–750 kcal/ngày); giảm 5–10% cân nặng ban đầu trong 6 tháng đã cải thiện rõ các chỉ số chuyển hóa',
        'Được, nhịn ăn hoàn toàn 30 ngày sẽ đạt mục tiêu',
        'Chỉ cần tập cardio 3 giờ/ngày là đủ'
      ],
      answer: 1,
      explanation: 'Giảm cân quá nhanh > 1 kg/tuần gây: (1) mất cơ bắp (cơ thể phân giải protein cơ khi thiếu hụt calorie lớn); (2) thiếu vi chất (vitamin, khoáng chất); (3) tăng nguy cơ sỏi mật; (4) tỷ lệ tái tăng cân cao hơn. Nghiên cứu cho thấy giảm cân chậm bền hơn dài hạn. Mục tiêu thực tế AHA/ACC/TOS: 5–10% cân nặng ban đầu trong 6 tháng đã cải thiện rõ ĐH, HA, mỡ máu. Nhịn ăn hoàn toàn: nguy cơ tụt đường huyết, rối loạn điện giải, ngất.'
    }
  ]
};

export const SC10_QUIZ_01 = {
  id: 'SC10-quiz-01',
  title: 'SC10 · Tư vấn dinh dưỡng đặc biệt',
  kind: 'quiz',
  subject: 'Dinh dưỡng lâm sàng và các trường hợp đặc biệt',
  difficulty: 4,
  skillsTrained: ['clinical-nutrition', 'enteral-nutrition', 'disease-specific-diet', 'supplement-counseling'],
  questions: [
    {
      stem: 'Bệnh nhân CKD giai đoạn 4 (eGFR 22) hỏi về chế độ ăn protein. Khuyến cáo đúng?',
      choices: [
        'Ăn nhiều protein để bù mất albumin',
        'Hạn chế protein 0.6–0.8 g/kg/ngày (protein chất lượng cao, giá trị sinh học cao) để giảm tải ure và phosphorus; tránh protein thực vật nhiều phosphorus hữu cơ (đậu, hạt); khi lọc thận thì tăng lên 1.0–1.2 g/kg',
        'Không cần hạn chế protein ở CKD giai đoạn 4',
        'Chỉ ăn protein từ thực vật vì ít hại thận hơn'
      ],
      answer: 1,
      explanation: 'KDOQI/KDIGO: CKD không lọc máu: protein 0.6–0.8 g/kg/ngày. Protein cao đẩy nhanh giảm eGFR qua tăng áp lực cầu thận và tăng sản xuất ure/acid. Ưu tiên protein giá trị sinh học cao (thịt, trứng, cá) vì amino acid thiết yếu đầy đủ, ít ure sinh ra. Protein thực vật: ít phosphorus hữu cơ được hấp thu hơn (NEJM 2012); nhưng đậu lăng, đậu xanh vẫn chứa nhiều K và P. Khi lọc máu (HD/PD): tăng 1.0–1.2 g/kg để bù mất trong lọc.'
    },
    {
      stem: 'Bệnh nhân xơ gan (Child-Pugh B), hỏi về chế độ ăn tốt nhất. Lưu ý quan trọng nhất là gì?',
      choices: [
        'Hạn chế hoàn toàn protein vì gây bệnh não gan',
        'Không hạn chế protein — nguy cơ suy dinh dưỡng ở xơ gan rất cao; nên ăn 1.2–1.5 g protein/kg/ngày; chia nhiều bữa nhỏ (4–6 bữa) kể cả bữa tối muộn; ưu tiên BCAA (branched-chain amino acids); hạn chế muối nếu có báng bụng',
        'Nhịn ăn hoàn toàn để gan nghỉ ngơi',
        'Chỉ ăn thực phẩm detox và nước ép rau củ'
      ],
      answer: 1,
      explanation: 'Quan niệm cũ hạn chế protein xơ gan gây bệnh não = SAI. EASL 2019: xơ gan cần protein cao hơn người bình thường (1.2–1.5 g/kg/ngày) do dị hóa protein tăng. Hạn chế protein dẫn đến sarcopenia (teo cơ) — yếu tố tiên lượng xấu độc lập. Hội chứng Hy-Lạp (hyperammonemia) liên quan rối loạn chu trình ure, không phải lượng protein. Bữa tối muộn và bữa sáng sớm: ngăn nhịn đói kéo dài → giảm phân giải cơ ban đêm. BCAA hỗ trợ chuyển hóa amoniac.'
    },
    {
      stem: 'Bệnh nhân đang nuôi dưỡng qua ống thông dạ dày (enteral), bắt đầu có tiêu chảy. Nguyên nhân phổ biến nhất cần loại trừ đầu tiên?',
      choices: [
        'Ngay lập tức ngưng nuôi ăn và chuyển sang nuôi tĩnh mạch',
        'Kiểm tra: tốc độ truyền quá nhanh, nhiễm bẩn công thức, dung tích thẩm thấu quá cao, đang dùng sorbitol trong thuốc lỏng, C. difficile nếu dùng kháng sinh; điều chỉnh từng yếu tố trước khi ngưng nuôi ăn ruột',
        'Tăng lượng nước vào để bù dịch',
        'Tiêu chảy là phản ứng bình thường của nuôi ăn ruột, không cần xử lý'
      ],
      answer: 1,
      explanation: 'Tiêu chảy trong nuôi ăn ruột (30–40% bệnh nhân) — nguyên nhân thường không phải do công thức mà do: (1) Tốc độ quá nhanh → giảm tốc độ; (2) Nhiệt độ công thức lạnh; (3) Thẩm thấu cao (> 400 mOsm/kg); (4) Sorbitol trong thuốc lỏng (magnesium hydroxide, acetaminophen suspension); (5) C. difficile nếu dùng KS; (6) Dùng thuốc prokinetic quá liều (metoclopramide). Không vội chuyển sang TPN — nuôi ăn ruột có lợi hơn, duy trì hàng rào ruột.'
    },
    {
      stem: 'Phụ nữ mang thai 12 tuần hỏi về bổ sung sắt. Nhu cầu và cách bổ sung đúng?',
      choices: [
        'Không cần bổ sung sắt nếu không thiếu máu',
        'WHO khuyến cáo: 30–60 mg sắt nguyên tố/ngày suốt thai kỳ; uống khi đói hoặc cách bữa ăn; tránh cùng canxi, trà, cà phê (giảm hấp thu); vitamin C tăng hấp thu sắt non-heme; phân đen và táo bón là bình thường',
        'Chỉ cần 10 mg/ngày trong 3 tháng đầu',
        'Uống sắt cùng với canxi buổi sáng để tiện'
      ],
      answer: 1,
      explanation: 'WHO 2016: bổ sung sắt 30–60 mg/ngày + acid folic 0.4 mg/ngày cho tất cả phụ nữ mang thai từ tuần đầu đến 3 tháng sau sinh. Sắt hấp thu tốt nhất lúc đói hoặc giữa các bữa ăn. Canxi, phytate (ngũ cốc nguyên hạt), polyphenol (trà, cà phê) cạnh tranh hấp thu → tránh cùng bữa. Vitamin C 200 mg uống cùng sắt tăng hấp thu 2–3 lần. Phân đen do sắt chưa hấp thu hoàn toàn là bình thường. Táo bón: tăng nước, chất xơ.'
    },
    {
      stem: 'Bệnh nhân sau phẫu thuật cắt dạ dày, mắc hội chứng dumping. Lời khuyên dinh dưỡng?',
      choices: [
        'Uống nhiều nước trong bữa ăn để thức ăn dễ tiêu',
        'Ăn nhiều bữa nhỏ (6 lần/ngày), không uống nước trong 30 phút quanh bữa ăn, hạn chế đường đơn (mono/disaccharides), nằm nghỉ 30 phút sau ăn, tăng dần độ đặc thức ăn',
        'Ăn ít protein và nhiều tinh bột đơn giản',
        'Uống sữa đặc có đường ngay sau bữa ăn'
      ],
      answer: 1,
      explanation: 'Hội chứng dumping (sau cắt dạ dày/bypass): thức ăn đổ nhanh vào ruột non → early dumping (30 phút sau ăn: đau bụng, tiêu chảy, buồn nôn, nhịp nhanh do dịch ruột ứ đọng) và late dumping (1–3 giờ sau: hạ đường huyết phản ứng). Nguyên tắc: nhỏ-thường xuyên, không pha loãng với nước trong bữa (làm thức ăn chảy nhanh hơn), tránh đường đơn (kích thích GIP → insulin → hạ đường muộn), nằm sau ăn giảm tốc độ tháo dạ dày. Pectin/guar gum làm đặc dịch có thể giúp.'
    },
    {
      stem: 'Bệnh nhân ung thư đang hóa trị, chán ăn nặng. Bổ sung nào có bằng chứng tốt nhất để hỗ trợ?',
      choices: [
        'Vitamin C liều cao 10 g/ngày để chống oxy hóa và tăng cảm giác ngon miệng',
        'Omega-3 fatty acids (EPA/DHA 2–3 g/ngày) — có bằng chứng giảm cachexia, tăng khẩu phần; kết hợp nutritional counseling và oral nutritional supplements (ONS) giàu calorie-protein; xem xét megestrol acetate hoặc corticoid ngắn hạn nếu nặng',
        'Multivitamin liều gấp 5 lần thông thường',
        'Enzyme tiêu hóa vì hóa trị làm giảm enzyme'
      ],
      answer: 1,
      explanation: 'Cachexia ung thư (sụt cân, mất cơ, viêm mạn): omega-3 EPA giảm viêm (IL-6, TNF-alpha), có RCT dương tính. ESPEN 2021: ONS (Oral Nutritional Supplements) tăng 400–600 kcal/ngày, protein 1.5 g/kg/ngày; omega-3 2–3 g EPA+DHA/ngày có thể hỗ trợ. Vitamin C liều cao: không có bằng chứng rõ ràng và có thể tương tác với hóa trị. Corticoid (dexamethasone, methylprednisolone): kích thích ăn ngắn hạn nhưng không cải thiện cân nặng. Megestrol: tăng cảm giác ngon miệng nhưng chủ yếu tăng mỡ, không cơ.'
    },
    {
      stem: 'Bệnh nhân tiểu đường type 2 hỏi về "chỉ số đường huyết" (glycemic index) của thực phẩm. Ứng dụng thực tế?',
      choices: [
        'Chỉ số GI không hữu ích vì mỗi người phản ứng khác nhau',
        'GI thấp (< 55) giúp giảm đỉnh đường huyết sau ăn; nhưng quan trọng hơn là Glycemic Load (GL = GI × lượng carb/100) và tổng lượng carb trong bữa; ăn kết hợp protein, chất béo, chất xơ làm giảm GI của bữa ăn; không cần ám ảnh từng loại thực phẩm nếu kiểm soát tổng lượng carb',
        'GI cao là tốt vì cung cấp năng lượng nhanh',
        'Chỉ cần ăn thực phẩm GI = 0 (thịt, trứng) để tránh tăng đường huyết'
      ],
      answer: 1,
      explanation: 'GI đo tốc độ tăng đường huyết của 50 g carb so với glucose chuẩn (GI 100). GI thấp < 55 (yến mạch, đậu, táo); cao > 70 (bánh mì trắng, cơm trắng, khoai tây chiên). Glycemic Load = GI × (carb/portion/100): quan trọng hơn GI thuần vì tính cả lượng. Bối cảnh bữa ăn: protein và chất béo làm chậm hấp thu carb → giảm GI thực tế. ADA 2024: không tập trung một chế độ ăn đơn độc — monitoring tổng carb và hậu quả đường huyết là thực tiễn nhất.'
    },
    {
      stem: 'Người cao tuổi 75 tuổi, sống một mình, ăn uống kém, hỏi về bổ sung vitamin D. Liều phù hợp?',
      choices: [
        '100 IU/ngày vì liều cao có thể gây ngộ độc',
        'Người cao tuổi: khuyến cáo 800–2000 IU vitamin D3/ngày; nếu 25(OH)D < 30 nmol/L (thiếu nặng): có thể cần 50.000 IU/tuần × 8 tuần để bù, sau đó duy trì; kết hợp canxi 1000–1200 mg/ngày từ thực phẩm hoặc bổ sung để phòng loãng xương và ngã',
        'Vitamin D hoàn toàn không cần bổ sung nếu ra nắng',
        'Chỉ cần bổ sung nếu xét nghiệm máu cho thấy thiếu'
      ],
      answer: 1,
      explanation: 'Người cao tuổi > 65: tổng hợp vitamin D qua da giảm 75% so với người trẻ; ít ra nắng; hấp thu và chuyển hóa kém. USPSTF/Endocrine Society: người cao tuổi nguy cơ cao → 800–2000 IU D3/ngày. Nếu thiếu nặng (< 30 nmol/L = 12 ng/mL): liều bù cao hơn theo hướng dẫn. Toxicity vitamin D (> 100.000 IU tích lũy/ngày kéo dài): hypercalcemia, sỏi thận. Canxi 1000 mg/ngày hỗ trợ phòng gãy xương. Đo 25(OH)D để tối ưu hóa liều nếu điều kiện cho phép.'
    },
    {
      stem: 'Vận động viên thể thao hỏi về whey protein và BCAA supplement. Khuyến cáo nào chính xác?',
      choices: [
        'BCAA là thiết yếu và phải bổ sung, không thể thiếu từ thực phẩm',
        'Whey protein hữu ích nếu không đủ protein từ thực phẩm (mục tiêu 1.6–2.2 g/kg/ngày với vận động viên sức mạnh); BCAA trong whey đã đủ nhu cầu — BCAA supplement riêng biệt ít có lợi thêm nếu protein tổng đã đủ; thời điểm uống protein sau tập (trong 2h) có thể tối ưu hóa tổng hợp cơ',
        'Protein 5 g/kg/ngày sẽ tăng cơ nhanh nhất',
        'Whey protein gây hại thận ở người khỏe mạnh'
      ],
      answer: 1,
      explanation: 'ISSN 2017/ACSM: vận động viên sức mạnh: 1.6–2.2 g protein/kg/ngày; sức bền: 1.2–1.6 g/kg/ngày. Whey protein hữu ích khi khó đủ qua thực phẩm. BCAA supplement (leucine, isoleucine, valine): meta-analysis cho thấy lợi ích tổng hợp cơ khi dùng thêm là không đáng kể nếu protein tổng đã đạt mục tiêu (whey đã giàu BCAA tự nhiên). "Anabolic window" sau tập: dữ liệu không đồng nhất, nhưng ưu tiên total protein/ngày hơn timing. Protein liều cao không hại thận ở người khỏe (bằng chứng sạch).'
    },
    {
      stem: 'Bệnh nhân phenylketonuria (PKU) trưởng thành, ngừng chế độ ăn từ tuổi 10, nay có thai. Vấn đề dinh dưỡng khẩn cấp?',
      choices: [
        'Không có vấn đề, PKU không ảnh hưởng thai kỳ ở người lớn',
        'Maternal PKU syndrome: Phe máu cao trong thai kỳ gây dị tật thai nặng (tim bẩm sinh, microcephaly, chậm phát triển trí tuệ) ngay cả khi thai nhi không có PKU; cần khởi động lại chế độ ăn Phe-restricted NGAY + Phe-free amino acid formula ĐỂ đạt Phe < 120–360 mcmol/L trước và trong suốt thai kỳ; chuyển trung tâm chuyên khoa ngay',
        'Chỉ cần uống sapropterin (BH4) là đủ',
        'Chế độ ăn PKU không cần thiết sau 10 tuổi, không có ảnh hưởng'
      ],
      answer: 1,
      explanation: 'Maternal PKU (MPKU): nguy cơ thai nhi cao nhất ở người không điều trị PKU khi mang thai. Phe cao (> 900 mcmol/L) qua nhau thai gây: tim bẩm sinh (>10% nếu Phe > 1200), microcephaly, IUGR, dị tật não (99% nếu không kiểm soát). Phòng ngừa: Phe < 120–360 mcmol/L từ ít nhất 3 tháng trước thụ thai và suốt thai kỳ. Sapropterin (BH4): chỉ hiệu quả ở PKU mild, không đủ trong MPKU nặng. Đây là tình huống khẩn cấp — chuyển chuyên khoa chuyển hóa bẩm sinh ngay.'
    }
  ]
};

export const SC12_QUIZ_01 = {
  id: 'SC12-quiz-01',
  title: 'SC12 · Tư vấn tránh thai toàn diện',
  kind: 'quiz',
  subject: 'Tư vấn kế hoạch hóa gia đình và tránh thai',
  difficulty: 3,
  skillsTrained: ['contraception-counseling', 'hormonal-contraception', 'drug-interactions', 'emergency-contraception'],
  questions: [
    {
      stem: 'Phụ nữ 30 tuổi, hút thuốc (15 điếu/ngày), muốn dùng thuốc tránh thai kết hợp COC. Rủi ro chính là gì?',
      choices: [
        'Không có rủi ro vì hút thuốc không ảnh hưởng đến tránh thai',
        'Hút thuốc + estrogen trong COC tăng nguy cơ huyết khối tĩnh mạch (VTE), nhồi máu cơ tim, đột quỵ đáng kể; WHO MEC 4 (CCĐ tuyệt đối) cho phụ nữ > 35 tuổi hút thuốc; < 35 tuổi hút thuốc nhiều là MEC 3; khuyến cáo phương pháp progestin-only (POP, DMPA, implant) hoặc IUD',
        'Chỉ tăng nguy cơ nhẹ, có thể dùng với theo dõi',
        'Hút thuốc làm giảm hiệu quả tránh thai của COC'
      ],
      answer: 1,
      explanation: 'WHO MEC 2015: Hút thuốc + COC. Phụ nữ < 35 tuổi, hút > 15 điếu/ngày: MEC 3 (nguy cơ > lợi ích). > 35 tuổi bất kể số điếu: MEC 4 (CCĐ tuyệt đối). Cơ chế: estrogen tăng đông máu (fibrinogen, yếu tố VII, X, XII), hút thuốc gây co mạch + tổn thương nội mạc → synergy với VTE và MACE. Progestin-only an toàn hơn nhiều với hút thuốc. Cơ hội khuyến cáo bỏ thuốc!'
    },
    {
      stem: 'IUD đồng (Copper IUD) hoạt động như thế nào và ưu điểm so với IUD hormone?',
      choices: [
        'Giải phóng progesterone ngăn rụng trứng; ưu điểm: không ảnh hưởng kinh nguyệt',
        'Ion đồng gây độc tinh trùng (giảm di động, phá vỡ màng); có thể dùng là tránh thai khẩn cấp trong 5 ngày đầu; không có hormone; kinh nguyệt thường nhiều hơn; dùng được 10–12 năm; lý tưởng cho người không muốn hormone',
        'Tạo hàng rào vật lý ngăn tinh trùng xâm nhập cổ tử cung',
        'Ức chế estrogen gây teo nội mạc tử cung'
      ],
      answer: 1,
      explanation: 'IUD đồng (Paragard): ion Cu²⁺ độc với tinh trùng (ức chế di động, phá vỡ DNA, ngăn thụ tinh) + phản ứng viêm nội mạc ngăn làm tổ. Không có hormone → phù hợp phụ nữ không thể dùng hormone (VTE, migraine với aura, ung thư vú, THA không kiểm soát). Tác dụng phụ: kinh nhiều hơn và đau hơn (30–40%). Dùng 10–12 năm. Emergency contraception: đặt trong 5 ngày sau quan hệ không bảo vệ → hiệu quả > 99%. IUD LNG (Mirena): giải phóng levonorgestrel cục bộ → đặc dịch cổ TC, teo nội mạc.'
    },
    {
      stem: 'Phụ nữ đang dùng topiramate điều trị động kinh, muốn dùng COC tránh thai. Vấn đề gì?',
      choices: [
        'Không có tương tác vì topiramate tác dụng lên não, không ảnh hưởng hormone',
        'Topiramate là chất cảm ứng CYP3A4 (yếu-trung) làm giảm nồng độ ethinylestradiol trong COC → giảm hiệu quả tránh thai; WHO MEC 3 cho COC kết hợp với enzyme inducers; khuyến cáo: dùng COC liều estrogen cao hơn (≥ 30 mcg EE) + barrier method, hoặc DMPA/IUD không phụ thuộc CYP',
        'Topiramate tăng nồng độ hormone trong COC, cần giảm liều',
        'An toàn khi dùng cùng, không cần điều chỉnh'
      ],
      answer: 1,
      explanation: 'Enzyme inducers với COC (WHO MEC 3 cho enzyme inducers): Phenytoin, carbamazepine, phenobarbital, rifampicin, oxcarbazepine, topiramate (yếu) → tăng chuyển hóa EE và progestin. Giải pháp: (1) Chuyển sang phương pháp không hormone-phụ thuộc CYP: IUD đồng, IUD LNG, DMPA; (2) COC: không đủ tin cậy ngay cả với ≥ 30 mcg EE khi dùng enzyme inducer mạnh (rifampicin); (3) Topiramate yếu hơn: EE ≥ 30 mcg + barrier. NICE 2023 UK MEC phân biệt enzyme inducer mạnh vs yếu.'
    },
    {
      stem: 'Phụ nữ sau sinh, đang cho con bú 100%, hỏi về tránh thai. Phương pháp nào phù hợp nhất?',
      choices: [
        'COC là an toàn nhất vì estrogen tăng sữa',
        'LAM (Lactational Amenorrhea Method) hiệu quả > 98% khi cho bú hoàn toàn + chưa có kinh + < 6 tháng sau sinh; nếu LAM không đủ điều kiện: progestin-only (POP, DMPA, implant) an toàn với cho bú; COC CCĐ < 6 tuần sau sinh (estrogen giảm sữa, tăng nguy cơ VTE)',
        'Dùng condom duy nhất trong 6 tháng đầu',
        'Không cần tránh thai khi cho bú vì tự nhiên vô sinh'
      ],
      answer: 1,
      explanation: 'WHO MEC sau sinh + cho bú: COC: MEC 4 (CCĐ) trong 6 tuần đầu (estrogen giảm tiết sữa, nguy cơ VTE cao sau sinh). 6 tuần–6 tháng + cho bú: MEC 2 (lợi > nguy cơ nhỏ). LAM điều kiện: cho bú hoàn toàn (cách < 4h ban ngày, < 6h ban đêm), chưa có kinh, < 6 tháng sau sinh → > 98% hiệu quả. POP/DMPA/implant: an toàn từ 6 tuần (không ảnh hưởng sữa, không ảnh hưởng phát triển trẻ). IUD đồng: từ 4 tuần sau sinh.'
    },
    {
      stem: 'Phụ nữ migraine có aura hỏi về phương pháp tránh thai. Phương pháp nào an toàn nhất?',
      choices: [
        'COC liều thấp (20 mcg EE) là an toàn',
        'Migraine với aura: CCĐ tuyệt đối với estrogen (COC, patch, ring) — tăng nguy cơ đột quỵ 5–6 lần; phương pháp an toàn: POP, IUD (đồng hoặc LNG), DMPA, implant, barrier; progestin-only không tăng nguy cơ đột quỵ',
        'Migraine với aura không ảnh hưởng lựa chọn tránh thai',
        'Tất cả phương pháp nội tiết đều CCĐ với migraine'
      ],
      answer: 1,
      explanation: 'WHO MEC 4 (CCĐ tuyệt đối): migraine với aura + estrogen-containing contraceptives (COC, patch, ring). Aura là dấu hiệu rối loạn vi mạch não; estrogen thêm tác dụng procoagulant và vasoactive → nguy cơ đột quỵ thiếu máu tăng 5–6 lần (Lancet, BMJ data). Migraine không aura: MEC 2 (cho phép với thận trọng). POP (desogestrel, norethindrone), DMPA, implant (etonogestrel), IUD: không tăng nguy cơ đột quỵ. An toàn với migraine có hoặc không có aura.'
    },
    {
      stem: 'Nam giới hỏi về biện pháp tránh thai phía nam. Thông tin đầy đủ nhất?',
      choices: [
        'Chỉ có condom và triệt sản',
        'Condom (99.8% nếu dùng đúng, 85% thực tế) + coitus interruptus (78% thực tế, không bảo vệ STI) + triệt sản nam (vasectomy, hiệu quả 99.9%, khó phục hồi); tránh thai nội tiết cho nam đang nghiên cứu lâm sàng (testosterone + progestin) — chưa phê duyệt thương mại; vai trò nam trong kế hoạch hóa gia đình rất quan trọng',
        'Nam giới không có trách nhiệm tránh thai',
        'Condom duy nhất là phương pháp dành cho nam'
      ],
      answer: 1,
      explanation: 'Phương pháp tránh thai phía nam hiện có: (1) Condom: duy nhất bảo vệ đồng thời STI + thai; pearl index với sử dụng đúng (perfect use) 0.2/100 phụ nữ-năm, thực tế 13-15. (2) Xuất tinh ngoài (withdrawal): perfect use ~4%, typical use ~22% thất bại. (3) Vasectomy: permanent, 0.1-0.15% failure rate dài hạn, phục hồi khó. (4) Tránh thai nam nội tiết: testosterone + dimedroxyprogesterone (WHO trial 2016 dừng vì tác dụng phụ tâm lý); vẫn trong nghiên cứu. Tư vấn trách nhiệm chung cặp đôi.'
    },
    {
      stem: 'Phụ nữ 38 tuổi, 3 con, không muốn sinh thêm, hỏi về triệt sản vĩnh viễn. Cần tư vấn gì?',
      choices: [
        'Triệt sản đảm bảo 100% không có thai',
        'Triệt sản phụ (tubal ligation): hiệu quả 99.5% (thất bại 0.5/100 trong 10 năm — nguy cơ thai ngoài tử cung nếu thất bại); thủ thuật không thể hoàn toàn đảo ngược (đảo ngược thành công 40–70%); tư vấn cặp đôi về vasectomy (đơn giản hơn, an toàn hơn, hiệu quả tương đương); lựa chọn vĩnh viễn — đảm bảo bệnh nhân không tiếc sau này',
        'Không cần tư vấn gì nếu bệnh nhân đã quyết định',
        'Triệt sản nữ hoàn toàn có thể đảo ngược bất cứ lúc nào'
      ],
      answer: 1,
      explanation: 'Tubal ligation: hiệu quả cao nhưng không tuyệt đối (10 năm cumulative failure rate 1.85% CREST study). Nếu thất bại: nguy cơ thai ngoài tử cung cao hơn bình thường (50% trong số thất bại). Đảo ngược: phụ thuộc phương pháp cắt (clip = đảo ngược tốt hơn, coagulation = khó đảo ngược), tuổi, tình trạng buồng trứng; tỉ lệ thành công 40–70%. Vasectomy: đơn giản hơn về mặt kỹ thuật, gây tê tại chỗ, ít biến chứng, hiệu quả tương đương. Tư vấn cả hai phương án. Informed consent kỹ lưỡng.'
    },
    {
      stem: 'Phụ nữ 25 tuổi hỏi về que cấy tránh thai (etonogestrel implant). Thời gian hiệu quả và các vấn đề thường gặp?',
      choices: [
        'Hiệu quả 1 năm, sau đó phải tháo ra',
        'Hiệu quả 3 năm (có thể đến 5 năm theo nghiên cứu mới); hiệu quả > 99%; đặt cánh tay trong; rối loạn kinh nguyệt là tác dụng phụ chính (chảy máu không đều 20%, vô kinh 20%, kinh nhiều 6%); không ảnh hưởng xương; có thể dùng khi cho bú; tháo ra là khả năng mang thai phục hồi ngay',
        'Hiệu quả 10 năm, tốt nhất cho phụ nữ đã có con',
        'Chỉ dành cho phụ nữ chưa sinh'
      ],
      answer: 1,
      explanation: 'Implant (Nexplanon/Implanon): que 4 cm × 2 mm đặt dưới da cánh tay trên trong, giải phóng etonogestrel 60–70 mcg/ngày ban đầu → 25–30 mcg/ngày năm 3. FDA approved 3 năm; nghiên cứu gần đây (Grunloh et al 2013, McNicholas et al 2017): vẫn hiệu quả đến năm 5 ở phụ nữ BMI thấp-trung bình. Pearl index: 0.05/100 phụ nữ-năm — hiệu quả nhất mọi biện pháp (gần như triệt sản). Rối loạn kinh nguyệt: nguyên nhân ngừng phổ biến nhất (tư vấn trước đặt). Hồi phục sinh sản ngay sau tháo.'
    },
    {
      stem: 'Bệnh nhân lupus đang dùng hydroxychloroquine và prednisone, muốn biết phương pháp tránh thai phù hợp nhất. Cân nhắc nào quan trọng?',
      choices: [
        'COC là an toàn và ổn định nhất với lupus',
        'Lupus + antiphospholipid antibody (APL): CCĐ estrogen (MEC 4) vì tăng nguy cơ VTE/đột quỵ nghiêm trọng. Lupus không APL và bệnh ổn định: COC có thể MEC 2–3 tùy từng case. An toàn nhất cho mọi trường hợp lupus: IUD đồng, POP, DMPA (thận trọng ảnh hưởng xương nếu dùng corticoid dài hạn). Hydroxychloroquine không tương tác. Prednisone kéo dài: nguy cơ loãng xương → DMPA thêm mất xương là vấn đề',
        'Không được dùng bất kỳ phương pháp nào khi có bệnh lupus',
        'DMPA là lựa chọn duy nhất an toàn cho tất cả bệnh nhân lupus'
      ],
      answer: 1,
      explanation: 'Lupus và tránh thai phức tạp: (1) Lupus + APL positive (antiphospholipid antibodies): CCĐ tuyệt đối estrogen → nguy cơ VTE/đột quỵ cực cao. (2) Lupus không APL, bệnh ổn định, không biến chứng: COC có thể dùng (MEC 2–3). (3) Lupus hoạt động: MEC 3–4 với estrogen (bệnh viêm có thể bị kích hoạt). IUD đồng an toàn cho tất cả nhóm lupus. DMPA + corticoid kéo dài: cả hai làm giảm mật độ xương → cân nhắc kỹ, tư vấn bổ sung Ca/vitamin D. Phối hợp với bác sĩ thấp khớp.'
    },
    {
      stem: 'Cặp vợ chồng mong con nhưng gặp khó khăn. Vợ hỏi về axit folic và chuẩn bị mang thai. Tư vấn đúng?',
      choices: [
        'Acid folic chỉ cần bắt đầu khi biết có thai',
        'Acid folic 0.4–0.8 mg/ngày bắt đầu ít nhất 1 tháng trước khi cố gắng có thai và tiếp tục đến hết 3 tháng đầu; phụ nữ tiền sử thai dị tật ống thần kinh: tăng liều 4–5 mg/ngày; đảm bảo vaccine (rubella, varicella nếu chưa có miễn dịch); kiểm soát bệnh mạn tính (THA, ĐTĐ); ngưng uống rượu, thuốc lá',
        'Acid folic 5 mg/ngày cho tất cả phụ nữ chuẩn bị có thai',
        'Bắt đầu bổ sung sắt và canxi ngay khi biết có thai là đủ'
      ],
      answer: 1,
      explanation: 'Preconception care (chăm sóc trước thai kỳ): Acid folic giảm 50–70% nguy cơ dị tật ống thần kinh (spina bifida, anencephaly). Ống thần kinh đóng ngày 28 sau thụ tinh — trước khi biết có thai → BẮT BUỘC bắt đầu sớm. Liều chuẩn 0.4 mg/ngày (một số RCT 0.8 mg); tiền sử NTD: 4–5 mg/ngày. Vaccine rubella (sống giảm độc): cần trước thai ≥ 4 tuần. Kiểm soát ĐTĐ, THA, chuẩn bị ngưng thuốc teratogen (retinoids, MTX, warfarin). ACOG 2019/BYT 2022.'
    }
  ]
};

export const SKILL_QUIZZES = {
  'SC03_QUIZ_01': SC03_QUIZ_01,
  'SC04_QUIZ_01': SC04_QUIZ_01,
  'SC05_QUIZ_01': SC05_QUIZ_01,
  'SC06_QUIZ_01': SC06_QUIZ_01,
  'SC07_QUIZ_01': SC07_QUIZ_01,
  'SC08_QUIZ_01': SC08_QUIZ_01,
  'SC09_QUIZ_01': SC09_QUIZ_01,
  'SC10_QUIZ_01': SC10_QUIZ_01,
  'SC11_QUIZ_01': SC11_QUIZ_01,
  'SC12_QUIZ_01': SC12_QUIZ_01,
  'SC13_QUIZ_01': SC13_QUIZ_01,
  'SC14_QUIZ_01': SC14_QUIZ_01,
  'SC15_QUIZ_01': SC15_QUIZ_01,
};
