// ============================================================
// Nhà thuốc cộng đồng — 3 quizzes (PS12, PS13, PS14)
// ============================================================
// Sources: BYT TT 02/2018 (thực hành tốt nhà thuốc GPP), BYT TT 21/2018,
// WHO PIC/S, BYT Danh mục thuốc OTC 2023, BYT TT 52/2017 (kê đơn),
// ASHP Community Pharmacy Guidelines, ADA 2024, ACC/AHA 2022,
// BYT Hướng dẫn điều trị đái tháo đường 2023.
// ============================================================

export const PS12_QUIZ = {
  id: 'PS12-quiz-01',
  title: 'PS12 · Nhà thuốc 24/7 — Cấp cứu OTC ban đêm',
  kind: 'quiz', yearLevel: 5, subject: 'community-pharm', difficulty: 4,
  skillsTrained: ['otc-triage', 'emergency-referral', 'night-dispensing', 'patient-safety'],
  questions: [
    {
      stem: 'Lúc 2 giờ sáng, người đàn ông 55 tuổi đến nhà thuốc, đau thắt ngực trái lan ra vai trái, vã mồ hôi, khó thở 10 phút. Ông ta hỏi mua thuốc đau tim. Hành động đúng nhất?',
      choices: [
        'Bán nitroglycerin ngậm dưới lưỡi và dặn nghỉ ngơi',
        'Gọi cấp cứu 115 ngay, cho bệnh nhân nhai aspirin 300 mg nếu không dị ứng, không để về nhà',
        'Tư vấn uống nước nóng và nằm nghỉ, nếu không khỏi mới đi viện',
        'Bán antacid vì có thể là đau dạ dày'
      ],
      answer: 1,
      explanation: 'Đau ngực cấp với các đặc điểm nguy hiểm (lan vai trái, vã mồ hôi, khó thở) = triệu chứng STEMI điển hình. Gọi 115 ngay lập tức là ưu tiên số 1. Aspirin 162–325 mg nhai ngay nếu không có chống chỉ định làm giảm tử vong. Không bao giờ để bệnh nhân nghi STEMI tự lái xe về. Đây là tình huống tính mạng.'
    },
    {
      stem: 'Mẹ đến mua thuốc cho trẻ 2 tuổi, sốt 39.5°C, co giật 2 phút trước đó, hiện tỉnh. Xử trí?',
      choices: [
        'Bán ibuprofen và hướng dẫn hạ sốt tại nhà',
        'Khuyến cáo đến cấp cứu ngay, không tự xử trí tại nhà dù trẻ đã tỉnh',
        'Bán diazepam đặt hậu môn 5 mg và theo dõi',
        'Lau mát và đặt paracetamol tọa dược, hẹn tái khám sáng hôm sau'
      ],
      answer: 1,
      explanation: 'Co giật sốt lần đầu ở trẻ < 5 tuổi, dù tỉnh lại sau đó, cần được đánh giá tại bệnh viện để loại trừ viêm màng não, viêm não và xác định loại co giật. Nhà thuốc KHÔNG được cấp diazepam không kê đơn để tự điều trị tại nhà. Chuyển viện ngay.'
    },
    {
      stem: 'Phụ nữ 28 tuổi xin mua metronidazole 400 mg vì "khí hư ra nhiều, mùi hôi cá" mà không có đơn. Cách xử lý đúng theo GPP?',
      choices: [
        'Bán metronidazole 7 ngày, dặn không uống rượu',
        'Hỏi thêm triệu chứng, giải thích cần khám phụ khoa để chẩn đoán chính xác; có thể giới thiệu phòng khám; KHÔNG bán kháng sinh không kê đơn',
        'Bán clotrimazole đặt âm đạo thay thế',
        'Bán luôn azithromycin liều đơn phòng ngừa lây nhiễm'
      ],
      answer: 1,
      explanation: 'Khí hư mùi "cá" gợi ý viêm âm đạo do vi khuẩn (BV) nhưng cần phân biệt với trichomonas và nấm. BYT TT 52/2017 cấm bán metronidazole không kê đơn. GPP yêu cầu tư vấn, từ chối cấp kháng sinh không có đơn và giới thiệu đến cơ sở khám bệnh phù hợp.'
    },
    {
      stem: 'Nam 45 tuổi đến lúc 3 giờ sáng mua sildenafil 100 mg, khai đang dùng isosorbide mononitrate 20 mg. Dược sĩ phải làm gì?',
      choices: [
        'Bán sildenafil vì đây là OTC tại nhiều nước',
        'Tuyệt đối không bán — tương tác sildenafil + nitrate gây tụt HA nặng, có thể tử vong',
        'Giảm liều còn 50 mg và dặn uống cách nitrate 2 giờ',
        'Hỏi thêm và cân nhắc bán nếu huyết áp ổn'
      ],
      answer: 1,
      explanation: 'Sildenafil + bất kỳ nitrate nào (organic nitrates: ISMN, GTN, amyl nitrite) là chống chỉ định tuyệt đối. Cả hai ức chế con đường cGMP gây giãn mạch cộng hưởng → tụt huyết áp nặng, nguy hiểm tính mạng. Không có liều "an toàn" khi phối hợp. Từ chối cấp thuốc và giải thích rõ lý do.'
    },
    {
      stem: 'Người nhà mang theo vỉ amoxicillin đang dở, hỏi cách cho trẻ 3 tuổi, 14 kg uống nốt phần còn lại điều trị viêm tai giữa. Hành động đúng?',
      choices: [
        'Tính liều 40 mg/kg/ngày và hướng dẫn cách dùng tiếp',
        'Hỏi xem đây có phải đơn bác sĩ không; nếu có đơn bác sĩ kê đúng liều thì hướng dẫn tiếp; giải thích đủ liệu trình kháng sinh là quan trọng',
        'Từ chối vì không có đơn mới',
        'Khuyên mua gói thuốc mới với liều cao hơn cho chắc'
      ],
      answer: 1,
      explanation: 'Hỗ trợ tuân thủ điều trị kháng sinh đã được kê đơn hợp lệ là vai trò của dược sĩ GPP. Xác nhận đây là đơn hợp lệ từ bác sĩ, tính liều phù hợp cân nặng (amoxicillin 40–90 mg/kg/ngày viêm tai giữa theo AAP/BYT), hướng dẫn dùng đúng thời điểm, dặn hoàn thành đủ đợt.'
    },
    {
      stem: 'Lúc 1 giờ sáng, bệnh nhân hen có cơn hen cấp nhẹ (SpO2 95%, không nói chuyện được đoạn dài), xin thêm ống salbutamol MDI đã hết. Nhà thuốc hết hàng salbutamol MDI. Làm gì?',
      choices: [
        'Bán terbutaline uống thay thế vì cùng nhóm',
        'Hướng dẫn đến cơ sở y tế cấp cứu gần nhất ngay; KHÔNG để bệnh nhân chờ; ghi rõ tình trạng trong sổ cấp cứu nhà thuốc',
        'Cho mượn máy khí dung của nhà thuốc với salbutamol solution',
        'Dặn thở chậm và uống nước ấm, sáng đến lấy thuốc'
      ],
      answer: 1,
      explanation: 'SpO2 95% và không nói chuyện được = cơn hen trung bình-nặng cần đánh giá bác sĩ. Không có salbutamol MDI là tình huống nguy hiểm — không thể thay bằng thuốc uống (chậm tác dụng). Chuyển cấp cứu ngay là an toàn nhất. Terbutaline uống không đáp ứng trong cơn cấp. GPP yêu cầu ghi nhận và xử lý tình huống khẩn cấp.'
    },
    {
      stem: 'Người mua hỏi: "Tôi có thể uống ibuprofen 400 mg với omeprazole 20 mg không, tôi đang uống omeprazole rồi?" Câu trả lời đúng?',
      choices: [
        'Được, omeprazole bảo vệ dạ dày hoàn toàn khi dùng NSAID',
        'Omeprazole giảm nguy cơ loét nhưng không loại bỏ hoàn toàn; vẫn cần dùng ibuprofen liều thấp nhất, thời gian ngắn nhất, sau ăn no; tránh nếu có tiền sử loét, suy thận, dùng kháng đông',
        'Không được, omeprazole làm giảm tác dụng ibuprofen',
        'Cần ngưng omeprazole 2 ngày trước khi dùng ibuprofen'
      ],
      answer: 1,
      explanation: 'PPI (omeprazole) giảm nguy cơ loét tiêu hóa do NSAID nhưng không bảo vệ hoàn toàn — đặc biệt loét ruột non không phụ thuộc acid. Ibuprofen vẫn có nguy cơ thận, tim mạch, kéo dài chảy máu. Hướng dẫn dùng liều tối thiểu, thời gian ngắn, sau bữa ăn. Hỏi thêm chống chỉ định.'
    },
    {
      stem: 'Bệnh nhân cao tuổi 78 tuổi, uống warfarin, đến mua vitamin E 400 IU vì "tốt cho tim mạch". Lưu ý?',
      choices: [
        'Bán bình thường, vitamin E là thiên nhiên không ảnh hưởng',
        'Vitamin E liều cao (≥ 400 IU/ngày) tăng tác dụng chống đông của warfarin, tăng nguy cơ xuất huyết; khuyên báo bác sĩ trước khi dùng và theo dõi INR',
        'Cấm dùng hoàn toàn, bảo dừng warfarin trước',
        'Bán nhưng dặn giảm liều warfarin 20%'
      ],
      answer: 1,
      explanation: 'Vitamin E liều ≥ 400 IU/ngày ức chế tổng hợp yếu tố đông máu phụ thuộc vitamin K và ức chế kết tập tiểu cầu → tăng nguy cơ chảy máu với warfarin. Tương tác này có bằng chứng lâm sàng. Bệnh nhân cần báo bác sĩ để theo dõi INR chặt chẽ. Không tự điều chỉnh liều warfarin.'
    },
    {
      stem: 'Lúc nửa đêm, phụ nữ mang thai 32 tuần đến mua cetirizine vì dị ứng da ngứa. Thuốc an toàn trong thai kỳ?',
      choices: [
        'Bán cetirizine thoải mái, thuốc OTC hoàn toàn an toàn',
        'Cetirizine là lựa chọn kháng histamine được chấp nhận trong thai kỳ (FDA B); tuy nhiên cần xác nhận ngứa không do ứ mật thai kỳ (cholestasis — cần khám ngay); nếu chỉ dị ứng nhẹ, có thể cấp với liều tối thiểu và dặn khám sớm',
        'Không bán gì vì tất cả kháng histamine đều cấm trong thai kỳ',
        'Bán promethazine vì an toàn hơn trong thai kỳ'
      ],
      answer: 1,
      explanation: 'Cetirizine và loratadine được xếp loại B (FDA) — ưu tiên trong thai kỳ. Promethazine loại C. Lưu ý quan trọng: ngứa ở thai kỳ 3 tháng cuối có thể là cholestasis nội gan thai kỳ (ứ mật) — đặc biệt ngứa lòng bàn tay, bàn chân, về đêm — cần xét nghiệm bile acid ngay, vì tăng nguy cơ thai lưu. Cần phân biệt trước khi cấp thuốc.'
    },
    {
      stem: 'Người đàn ông 60 tuổi, THA, đang dùng lisinopril 10 mg, hỏi mua pseudoephedrine (thuốc thông mũi) vì bị cảm. Tư vấn?',
      choices: [
        'Bán bình thường, liều thông mũi không ảnh hưởng huyết áp',
        'Pseudoephedrine là sympathomimetic có thể tăng huyết áp và nhịp tim; không phù hợp với bệnh nhân THA; khuyên dùng saline nasal spray, hoặc oxymetazoline tại chỗ ngắn hạn (≤ 3 ngày), hoặc hỏi bác sĩ',
        'Bán nhưng dặn đo huyết áp trước mỗi liều',
        'Đề nghị ngưng lisinopril 3 ngày rồi mới dùng pseudoephedrine'
      ],
      answer: 1,
      explanation: 'Pseudoephedrine kích thích alpha-adrenergic → tăng sức cản mạch, tăng HA, tăng nhịp. Ở bệnh nhân THA không kiểm soát tốt hoặc dùng thuốc tim mạch, có thể gây tăng HA cấp. FDA khuyến cáo thận trọng. Saline nasal spray an toàn; oxymetazoline tại chỗ ≤ 3 ngày ít hấp thu toàn thân hơn nhưng vẫn cần thận trọng. Nên hỏi ý kiến bác sĩ.'
    }
  ],
};

export const PS13_QUIZ = {
  id: 'PS13-quiz-01',
  title: 'PS13 · Nhà thuốc đại học — Sức khỏe sinh viên',
  kind: 'quiz', yearLevel: 4, subject: 'community-pharm', difficulty: 3,
  skillsTrained: ['student-health', 'mental-health-pharm', 'sexual-health', 'otc-counseling'],
  questions: [
    {
      stem: 'Sinh viên 20 tuổi hỏi mua thuốc tránh thai khẩn cấp (levonorgestrel 1.5 mg) sau quan hệ không bảo vệ cách 20 giờ. Tư vấn?',
      choices: [
        'Không bán vì cần đơn bác sĩ',
        'Levonorgestrel thuốc tránh thai khẩn cấp OTC, hiệu quả cao nhất trong 72 giờ đầu (giảm 95% nếu dùng trong 24h); uống càng sớm càng tốt; KHÔNG phá thai, không hiệu quả nếu đã rụng trứng hoặc đã thụ tinh; không thay thế biện pháp tránh thai thường xuyên',
        'Bán nhưng không cần tư vấn gì thêm',
        'Dặn uống 2 viên cách nhau 12 giờ cho chắc'
      ],
      answer: 1,
      explanation: 'Levonorgestrel 1.5 mg liều đơn (Plan B tương đương): OTC, hiệu quả ~89% trong 72h, cao nhất trong 24h đầu (~95%). Cơ chế: ức chế/trì hoãn rụng trứng. KHÔNG là thuốc phá thai (không ảnh hưởng trứng đã thụ tinh đã làm tổ). WHO xếp loại thiết yếu. BMI cao (>75kg) giảm hiệu quả — cân nhắc ulipristal acetate hoặc vòng đồng đặt ngay (hiệu quả nhất). Tư vấn tránh thai thường xuyên sau đó.'
    },
    {
      stem: 'Sinh viên nam 19 tuổi xin mua modafinil hoặc ritalin để "học thi". Câu trả lời đúng theo pháp luật VN?',
      choices: [
        'Bán modafinil vì chỉ là thuốc ngủ ngày, không nguy hiểm',
        'Modafinil (danh mục II) và methylphenidate (danh mục I) là thuốc hướng thần/gây nghiện, bắt buộc có đơn bác sĩ chuyên khoa; không bán OTC; giải thích tác hại lạm dụng và hỗ trợ phương pháp học hiệu quả hơn',
        'Tư vấn uống cà phê hoặc thuốc bổ thần kinh thay thế',
        'Bán caffeine 200 mg thay thế mà không cần đơn'
      ],
      answer: 1,
      explanation: 'Tại Việt Nam, modafinil là thuốc hướng thần bảng II, methylphenidate bảng I — bắt buộc kê đơn bác sĩ chuyên khoa (tâm thần kinh, nhi). Dược sĩ nhà thuốc vi phạm pháp luật nếu bán không có đơn. Lạm dụng gây nhịp nhanh, lo âu, nguy cơ lệ thuộc. Hỗ trợ sinh viên: tư vấn kỹ năng học tập, caffeine có giới hạn, giải thích nguy cơ.'
    },
    {
      stem: 'Sinh viên 21 tuổi hỏi: "Tôi đang uống fluoxetine 20 mg (trầm cảm), hôm qua uống 4 lon beer. Có vấn đề không?" Tư vấn?',
      choices: [
        'Không sao, bia nhẹ không tương tác với antidepressant',
        'Rượu + SSRI tăng tác dụng ức chế TKTW (buồn ngủ, giảm tập trung, giảm phản xạ); rượu cũng là chất trầm cảm TKTW làm nặng trầm cảm; hướng dẫn hạn chế rượu; không ngưng thuốc đột ngột',
        'Dặn ngưng fluoxetine ngay vì nguy hiểm',
        'Tăng liều fluoxetine để bù tác dụng của rượu'
      ],
      answer: 1,
      explanation: 'Fluoxetine + rượu: ức chế TKTW cộng hợp → buồn ngủ, phối hợp kém, tăng nguy cơ tai nạn. Rượu là chất trầm cảm bản thân, làm giảm hiệu quả điều trị. Một số bệnh nhân dùng SSRI báo cáo phản ứng rượu bất thường (say nhanh hơn). Không ngưng thuốc đột ngột (nguy cơ hội chứng dừng thuốc). Tư vấn: giảm tối đa rượu bia; không lái xe sau khi uống rượu khi đang dùng thuốc.'
    },
    {
      stem: 'Nữ sinh viên 22 tuổi hỏi: "Tôi bắt đầu uống thuốc tránh thai kết hợp COC 3 ngày trước. Có thể bắt đầu có hiệu quả ngay không?"',
      choices: [
        'Có hiệu quả ngay từ viên đầu tiên bất kể thời điểm trong chu kỳ',
        'COC hiệu quả ngay (no back-up needed) nếu bắt đầu trong 5 ngày đầu kinh; nếu bắt đầu sau ngày 5 cần dùng thêm bao cao su 7 ngày tiếp theo; hỏi về thời điểm bắt đầu trong chu kỳ',
        'Cần 3 tháng mới đạt hiệu quả hoàn toàn',
        'Chỉ cần 48 giờ sau liều đầu tiên'
      ],
      answer: 1,
      explanation: 'WHO MEC: COC bắt đầu ngày 1–5 của kinh nguyệt → hiệu quả ngay (quick start nếu chắc chắn không có thai). Bắt đầu sau ngày 5 → cần back-up 7 ngày (bao cao su). Quick start (bất kỳ ngày nào, test thai âm tính) → back-up 7 ngày. Bỏ viên làm giảm hiệu quả. Dặn uống cùng giờ mỗi ngày.'
    },
    {
      stem: 'Sinh viên nam 20 tuổi mua paracetamol 500 mg, vẻ mặt buồn, khi hỏi thăm nói đang rất căng thẳng và "muốn kết thúc tất cả". Dược sĩ làm gì?',
      choices: [
        'Bán paracetamol và dặn không uống nhiều quá',
        'Hỏi thẳng về ý định tự tử ("em có đang nghĩ đến việc tự làm hại bản thân không?"), không để một mình, gọi đường dây hỗ trợ sức khỏe tâm thần hoặc người thân, nếu nguy hiểm gọi cấp cứu; KHÔNG bán thuốc trong tình huống này',
        'Từ chối bán thuốc mà không giải thích',
        'Giới thiệu đến phòng tư vấn tâm lý và bán thuốc'
      ],
      answer: 1,
      explanation: 'Dấu hiệu nguy hiểm: "muốn kết thúc tất cả" + mua thuốc paracetamol = nguy cơ tự tử. QPR (Question-Persuade-Refer): hỏi thẳng không làm tăng nguy cơ mà giúp đánh giá. Không để một mình. Paracetamol overdose gây suy gan chết người. Không bán thuốc đến khi đảm bảo an toàn. Đường dây hỗ trợ tâm lý BYT: 1800 599 920 (miễn phí). Đây là cấp cứu tâm thần.'
    },
    {
      stem: 'Sinh viên 21 tuổi hỏi mua azithromycin 1 g liều đơn vì "bạn bè bảo trị lậu". Đúng không?',
      choices: [
        'Bán vì đúng phác đồ điều trị lậu',
        'CDC/WHO 2023: lậu cầu kháng azithromycin gia tăng nghiêm trọng, không còn là first-line; phác đồ hiện tại: ceftriaxone 500 mg IM liều đơn; cần xét nghiệm chẩn đoán và khám STI; không bán kháng sinh không đơn',
        'Azithromycin không trị được lậu, bán ciprofloxacin thay',
        'Bán 2 liều cho chắc'
      ],
      answer: 1,
      explanation: 'Neisseria gonorrhoeae đề kháng azithromycin và fluoroquinolone lan rộng toàn cầu. WHO 2023 / CDC 2021: first-line là ceftriaxone 500 mg IM (hoặc 1 g nếu cân nặng ≥150 kg) + azithromycin KHÔNG còn được phối hợp thường quy. Cần xét nghiệm PCR xác nhận, điều trị đồng thời chlamydia (doxycycline 100 mg × 7 ngày nếu nghi). Không bán kháng sinh không kê đơn. Chuyển đến phòng khám STI.'
    },
    {
      stem: 'Sinh viên đang dùng rifampicin để điều trị lao phổi, hỏi: "Thuốc tránh thai tôi đang uống có bị ảnh hưởng không?"',
      choices: [
        'Không, hai thuốc không tương tác',
        'Rifampicin là chất cảm ứng CYP mạnh, làm giảm nồng độ hormone trong COC/mini-pill → giảm hiệu quả tránh thai đáng kể; khuyến cáo dùng biện pháp không dùng hormone (IUD đồng, bao cao su) trong suốt liệu trình và 4 tuần sau khi ngưng rifampicin',
        'Tăng gấp đôi liều COC để bù lại',
        'Không vấn đề nếu uống đúng giờ mỗi ngày'
      ],
      answer: 1,
      explanation: 'Rifampicin là chất cảm ứng CYP3A4/CYP2C9 mạnh nhất → tăng chuyển hóa ethinylestradiol và progestins → giảm nồng độ >50%. WHO MEC 3: COC/POP/patch/ring không đáng tin cậy khi dùng cùng rifampicin. WHO khuyến cáo IUD đồng (không hormone, hiệu quả 99%) hoặc IUD LNG (ít ảnh hưởng hơn vì tác dụng chủ yếu tại chỗ) + bao cao su.'
    },
    {
      stem: 'Sinh viên bị mụn trứng cá nặng hỏi về isotretinoin. Anh ta tự mua được ở hiệu thuốc không?',
      choices: [
        'Được, isotretinoin có thể mua không cần đơn',
        'Không — isotretinoin bắt buộc kê đơn bác sĩ da liễu; gây quái thai cực kỳ nguy hiểm; chương trình iPLEDGE (Mỹ) hoặc Pregnancy Prevention Programme (EU); ở VN cần đơn chuyên khoa; không bán OTC dưới bất kỳ hình thức nào',
        'Bán nếu bệnh nhân ký cam kết không có thai',
        'Bán liều thấp 10 mg không cần đơn vì ít tác dụng phụ'
      ],
      answer: 1,
      explanation: 'Isotretinoin là thuốc teratogen hạng X: một liều duy nhất trong thai kỳ gây dị tật thai nghiêm trọng (tim, não, tai). BYT VN yêu cầu đơn bác sĩ da liễu. Thế giới có chương trình kiểm soát nghiêm ngặt. Tại nhà thuốc GPP: từ chối cấp nếu không có đơn hợp lệ; giải thích lý do; giới thiệu đến bác sĩ da liễu.'
    },
    {
      stem: 'Sinh viên 19 tuổi bị nhức đầu hỏi mua thuốc. Sau hỏi thêm: đau nửa đầu trái, buồn nôn, sợ ánh sáng, nhịp đập 3 ngày/tuần từ 3 tháng nay. Tư vấn?',
      choices: [
        'Bán paracetamol + caffeine 65 mg, đủ trị đau nửa đầu',
        'Đây là mô hình đau đầu migraine có thể; điều trị cấp: NSAID/triptan (theo đơn); nhưng tần suất 3 lần/tuần = cần đánh giá dự phòng bởi bác sĩ; khuyến cáo khám thần kinh; cảnh báo overuse headache nếu dùng OTC quá 10–15 ngày/tháng',
        'Bán codeine 30 mg vì hiệu quả hơn',
        'Giới thiệu mua thêm melatonin 5 mg ban đêm'
      ],
      answer: 1,
      explanation: 'Đau nửa đầu + buồn nôn + sợ ánh sáng + nhịp đập = migraine. Tần suất ≥ 4 ngày/tháng = cần điều trị dự phòng (topiramate, amitriptyline, propranolol, CGRP antagonist). Dùng OTC > 10–15 ngày/tháng → medication overuse headache (MOH), làm nặng hơn. Triptan cần kê đơn. Chuyển khám thần kinh. Ghi rõ nhật ký đau đầu.'
    },
    {
      stem: 'Sinh viên hỏi: "Tôi có thể uống ibuprofen 400 mg trước khi uống rượu để không bị đau đầu không?" Tư vấn?',
      choices: [
        'Được, ibuprofen trước uống rượu không sao',
        'Không nên — ibuprofen + rượu tăng nguy cơ xuất huyết tiêu hóa và tổn thương thận; cả hai đều gây kích thích niêm mạc dạ dày; ibuprofen prophylactic không được khuyến cáo; nếu đau đầu sau rượu: uống nước, nghỉ ngơi, paracetamol (không kết hợp quá nhiều rượu)',
        'Dùng aspirin thay thế trước khi uống rượu sẽ an toàn hơn',
        'Bán ibuprofen 600 mg cho hiệu quả hơn'
      ],
      answer: 1,
      explanation: 'Rượu + NSAID: cả hai gây kích thích và viêm loét niêm mạc dạ dày, ức chế prostaglandin bảo vệ. Nguy cơ xuất huyết tiêu hóa tăng gấp 3–10 lần. Ibuprofen trước khi uống rượu (dự phòng hangover) là thói quen nguy hiểm, không có cơ sở khoa học. Aspirin + rượu càng tệ hơn (aspirin ức chế thromboxane, tăng chảy máu). Tư vấn uống đủ nước, ăn trước khi uống rượu.'
    }
  ],
};

export const PS14_QUIZ = {
  id: 'PS14-quiz-01',
  title: 'PS14 · Nhà thuốc BV — Ngoại trú & Ra viện',
  kind: 'quiz', yearLevel: 5, subject: 'community-pharm', difficulty: 4,
  skillsTrained: ['discharge-counseling', 'polypharmacy', 'high-alert-meds', 'medication-reconciliation'],
  questions: [
    {
      stem: 'Bệnh nhân vừa xuất viện sau NMCT, toa ra viện: aspirin 100 mg + ticagrelor 90 mg × 2/ngày + atorvastatin 80 mg + metoprolol 25 mg × 2 + ramipril 5 mg. Điểm tư vấn quan trọng nhất cho ticagrelor?',
      choices: [
        'Uống với thức ăn để tránh buồn nôn',
        'KHÔNG ngưng ticagrelor tự ý — nguy cơ huyết khối stent gây NMCT tái phát; báo cáo ngay nếu khó thở (thường gặp, lành tính nhưng cần phân biệt với phù phổi); tránh aspirin > 100 mg/ngày làm giảm hiệu quả ticagrelor; dùng đủ 12 tháng',
        'Có thể thay ticagrelor bằng clopidogrel nếu thấy tốn tiền',
        'Ngưng ticagrelor ngay nếu có vết bầm trên da'
      ],
      answer: 1,
      explanation: 'Ticagrelor sau ACS/stent: ngưng đột ngột gây rebound platelet hyperactivity → huyết khối stent cấp (tỉ lệ tử vong 40–50%). Tối thiểu 12 tháng DAPT sau stent ACS. Khó thở (dyspnea) gặp 10–15% bệnh nhân ticagrelor, cơ chế ức chế ADP trên hồng cầu, không liên quan phổi — cần phân biệt với khó thở do suy tim. Aspirin > 100 mg/ngày ức chế tác dụng ticagrelor (paradox: liều cao aspirin giảm hiệu quả P2Y12). ESC ACS 2023.'
    },
    {
      stem: 'Bệnh nhân 70 tuổi, đái tháo đường type 2, CKD giai đoạn 3b (eGFR 32 mL/phút), đang dùng metformin 1000 mg × 2. Vấn đề gì cần xử lý?',
      choices: [
        'Không vấn đề, metformin an toàn trong CKD',
        'Metformin chống chỉ định khi eGFR < 30 và cần thận trọng khi eGFR 30–45 (nguy cơ nhiễm toan lactic); eGFR 32 = cân nhắc giảm liều hoặc ngưng; báo cáo bác sĩ kê đơn; theo dõi eGFR chặt chẽ',
        'Tăng liều metformin để kiểm soát đường huyết tốt hơn',
        'Không cần chỉnh liều cho đến khi eGFR < 15'
      ],
      answer: 1,
      explanation: 'FDA và EMA: metformin chống chỉ định khi eGFR < 30. eGFR 30–45: giảm liều tối đa 1000 mg/ngày và tăng theo dõi. eGFR 32 ở bệnh nhân này là vùng nguy hiểm — thêm yếu tố nguy cơ như mất nước, thuốc cản quang, nhiễm khuẩn có thể đẩy eGFR xuống < 30 nhanh. ADA 2024: xem xét SGLT2i (nếu eGFR ≥ 20 với dapagliflozin) hoặc GLP-1 RA không cần chỉnh liều theo thận.'
    },
    {
      stem: 'Toa ra viện có: sildenafil 25 mg + doxazosin 4 mg (tăng sinh lành tính tuyến tiền liệt). Vấn đề gì?',
      choices: [
        'Không vấn đề, hai thuốc bổ sung nhau trong tiết niệu',
        'Sildenafil + alpha-blocker (doxazosin) tăng nguy cơ tụt huyết áp tư thế nghiêm trọng, đặc biệt lúc đứng dậy; nếu bác sĩ chủ ý kê đơn: cần bắt đầu sildenafil liều thấp nhất (25 mg), không dùng trong vòng 4 giờ sau doxazosin; tư vấn bệnh nhân đứng dậy từ từ',
        'Hoàn toàn an toàn nếu uống cách nhau 6 giờ',
        'Bán nhưng không cần tư vấn thêm vì bác sĩ đã kê'
      ],
      answer: 1,
      explanation: 'PDE5i (sildenafil) + alpha-blocker cùng giãn mạch → tụt HA tư thế, ngất, nhồi máu cơ tim. FDA cảnh báo: nếu cần phối hợp, phải ổn định trên alpha-blocker trước, dùng PDE5i liều thấp nhất, uống cách nhau ≥ 4h. Tamsulosin (selective α1A) ít tương tác hơn doxazosin (non-selective). Bổ sung tư vấn cụ thể ngay cả khi bác sĩ đã kê — đây là trách nhiệm dược sĩ.'
    },
    {
      stem: 'Bệnh nhân 65 tuổi lấy thuốc ra viện: warfarin 5 mg + clarithromycin 500 mg × 2 × 7 ngày (viêm phổi). Hành động của dược sĩ?',
      choices: [
        'Cấp thuốc bình thường theo toa',
        'Clarithromycin ức chế CYP2C9 mạnh → tăng nồng độ warfarin → nguy cơ xuất huyết; cần báo bác sĩ để giảm liều warfarin tạm thời và theo dõi INR trong và sau đợt kháng sinh; hướng dẫn bệnh nhân dấu hiệu xuất huyết',
        'Thay clarithromycin bằng azithromycin tự ý',
        'Giảm liều warfarin 25% mà không báo bác sĩ'
      ],
      answer: 1,
      explanation: 'Clarithromycin là chất ức chế CYP2C9 và P-gp → tăng [warfarin] S-enantiomer. INR có thể tăng 2–3 lần trong 3–7 ngày đầu. Nguy cơ xuất huyết nặng. Hành động chuẩn: báo ngay bác sĩ kê đơn để điều chỉnh liều warfarin và tăng tần suất theo dõi INR (ngày 3, 7). Hướng dẫn bệnh nhân: báo ngay nếu nước tiểu sẫm màu, phân đen, bầm tím bất thường. Không tự điều chỉnh liều.'
    },
    {
      stem: 'Bệnh nhân nhận thuốc ra viện có insulin glargine 20 UI tiêm dưới da buổi tối. Bệnh nhân chưa bao giờ dùng insulin. Tư vấn bao gồm những điểm nào?',
      choices: [
        'Chỉ hướng dẫn liều và vị trí tiêm',
        'Kỹ thuật tiêm (vị trí luân chuyển, góc tiêm, xử lý kim), bảo quản (tủ lạnh chưa mở, nhiệt độ phòng khi đang dùng ≤ 30°C trong 28 ngày), nhận biết và xử trí hạ đường huyết (glucose dưới 3.9 mmol/L), không trộn glargine với insulin khác, điều chỉnh liều khi nhịn ăn/bệnh',
        'Chỉ dặn tiêm đúng giờ',
        'Không cần tư vấn vì bệnh nhân sẽ học trong bệnh viện'
      ],
      answer: 1,
      explanation: 'Insulin glargine (basal): kỹ thuật tiêm sai → hấp thu không đều; bảo quản sai → mất hoạt tính. Nhà thuốc BV ngoại trú là điểm cuối cùng trước khi bệnh nhân tự quản lý: cần đảm bảo bệnh nhân biết cách tiêm, nhận biết hạ đường huyết (run tay, vã mồ hôi, tim đập nhanh, mờ mắt), xử lý (glucose viên, nước đường), điều kiện để tiêm (phải ăn). Glargine không trộn trong xy-lanh với insulin khác — kết tủa mất tác dụng.'
    },
    {
      stem: 'Bệnh nhân 80 tuổi mang toa có 12 thuốc (polypharmacy nặng). Thuốc nào trong danh sách BEERS 2023 nên ưu tiên đánh dấu để thảo luận với bác sĩ?',
      choices: [
        'Amoxicillin, lisinopril, metformin',
        'Diphenhydramine (kháng histamine thế hệ 1), diazepam dài hạn, glibenclamide, nifedipine tác dụng nhanh, doxazosin ở bệnh nhân nguy cơ ngã',
        'Atorvastatin, bisoprolol, aspirin',
        'Losartan, amlodipine, pantoprazole'
      ],
      answer: 1,
      explanation: 'Beers Criteria 2023 (AGS): Nhóm nguy cơ cao ở người cao tuổi: (1) Kháng cholinergic mạnh (diphenhydramine, hydroxyzine) → lú lẫn, tiểu không kiểm soát; (2) BZD dài hạn → ngã, gãy xương; (3) Sulfonylurea hạ đường huyết (glibenclamide) → hạ đường huyết kéo dài (t1/2 dài); (4) CCB DHP tác dụng ngắn → tụt HA đột ngột; (5) Alpha-blocker → tụt HA tư thế, ngã. Dược sĩ nhà thuốc BV có trách nhiệm xác định và báo cáo DRP trong deprescribing.'
    },
    {
      stem: 'Bệnh nhân đang dùng methotrexate 15 mg/tuần (điều trị viêm khớp dạng thấp), mang toa mới có trimethoprim-sulfamethoxazole (TMP-SMX) điều trị nhiễm khuẩn tiết niệu. Vấn đề?',
      choices: [
        'Không tương tác, hai thuốc cơ chế khác nhau',
        'TMP-SMX ức chế bài tiết thận và cạnh tranh gắn protein huyết tương của methotrexate → tăng nồng độ MTX → độc tủy xương (giảm toàn thể tế bào máu), viêm niêm mạc nghiêm trọng; cần báo bác sĩ ngay để thay kháng sinh an toàn hơn',
        'Bán và dặn uống cách nhau 2 giờ',
        'Tăng acid folic bù đắp là đủ'
      ],
      answer: 1,
      explanation: 'Tương tác MTX + TMP-SMX: NGHIÊM TRỌNG. TMP ức chế dihydrofolate reductase (cùng cơ chế với MTX), SMX cạnh tranh bài tiết ở ống thận → tăng [MTX] đến mức độc. Nguy cơ pancytopenia, thậm chí tử vong. Nhiều báo cáo ca tử vong. Nếu cần KS tiết niệu: nitrofurantoin hoặc fosfomycin an toàn hơn (cần xác nhận không dị ứng). Báo ngay prescriber — không thể tự xử lý tại nhà thuốc.'
    },
    {
      stem: 'Bệnh nhân 45 tuổi tiểu đường type 2, toa có empagliflozin 10 mg mới. Điểm tư vấn quan trọng nào ít được bệnh nhân biết?',
      choices: [
        'Chỉ uống vào buổi sáng',
        'Nhiễm toan ceton do SGLT2i (euglycemic DKA): đường huyết có thể bình thường hoặc chỉ tăng nhẹ trong khi có DKA — cần ngưng trước phẫu thuật 3–4 ngày, khi nhịn ăn kéo dài, ốm nặng; triệu chứng DKA: buồn nôn, nôn, đau bụng, mệt; nhiễm nấm sinh dục thường gặp (cơ chế glucosuria); hạn chế đường; tiểu nhiều ban đầu',
        'Uống với nhiều nước để tránh sỏi thận',
        'Không cần kiêng đường khi dùng thuốc này'
      ],
      answer: 1,
      explanation: 'Euglycemic DKA là biến chứng nguy hiểm nhất của SGLT2i: đường huyết bình thường nhưng toan ceton nặng → dễ bỏ sót. Nguy cơ cao khi: nhịn ăn phẫu thuật, rượu, low-carb diet, nhiễm khuẩn. FDA black box warning. Hướng dẫn bệnh nhân: ngưng thuốc ≥ 3 ngày trước mổ chương trình; nếu nôn/buồn nôn kéo dài → đến viện khẩn. Nhiễm nấm âm đạo/bao quy đầu: vệ sinh sạch, báo bác sĩ nếu tái phát. ADA 2024.'
    },
    {
      stem: 'Trong hồ sơ bệnh nhân ghi dị ứng "cephalosporin gây mề đay". Toa mới có amoxicillin/clavulanate. Dược sĩ làm gì?',
      choices: [
        'Cấp thuốc bình thường vì amoxicillin là penicillin, không liên quan cephalosporin',
        'Kiểm tra dị ứng chéo penicillin-cephalosporin: nguy cơ 1–2% (không phải 10% như trước đây); hỏi chi tiết phản ứng (mề đay nhẹ hay phản vệ?); nếu phản ứng nghiêm trọng với cephalosporin: không cấp, báo bác sĩ; nếu mề đay nhẹ: thận trọng, xem cấu trúc R1 side chain của từng cephalosporin',
        'Từ chối ngay vì tất cả beta-lactam đều có dị ứng chéo',
        'Bán và dặn mang epinephrine theo người'
      ],
      answer: 1,
      explanation: 'Dị ứng chéo penicillin-cephalosporin: dữ liệu hiện đại (AAAAI 2022): nguy cơ thực sự 1–2%, không phải 10% như tài liệu cũ. Dị ứng liên quan chuỗi nhánh R1 tương đồng, không phải vòng beta-lactam. Cefadroxil có R1 giống amoxicillin → nguy cơ dị ứng chéo cao hơn. Mề đay nhẹ ≠ phản vệ. Cần hỏi chi tiết phản ứng, thời gian, điều trị. Nếu nguy cơ cao: báo bác sĩ, xem xét kháng sinh thay thế (azithromycin, doxycycline tùy loại nhiễm khuẩn).'
    },
    {
      stem: 'Bệnh nhân suy tim EF 25% nhận toa ra viện có bisoprolol 1.25 mg. Anh ta hỏi: "Sao liều thấp vậy, trước tôi uống 5 mg?" Giải thích đúng?',
      choices: [
        'Vì suy tim thì tim yếu, không cần liều cao',
        'Sau nhập viện đợt cấp suy tim: beta-blocker thường được giảm liều hoặc ngưng khi mất bù; liều 1.25 mg là liều khởi đầu lại từ thấp — nguyên tắc bắt đầu low, go slow; tăng liều mỗi 2 tuần nếu dung nạp; không tự ý tăng liều hoặc dùng liều cũ; tái khám tim mạch theo lịch',
        'Bisoprolol 1.25 mg là liều tối đa trong suy tim',
        'Liều thấp để tiết kiệm, sau 1 tháng mua liều cao hơn'
      ],
      answer: 1,
      explanation: 'ESC HF 2021: beta-blocker trong HFrEF khởi đầu liều tối thiểu và titrate lên, mục tiêu liều đích (bisoprolol 10 mg, carvedilol 50 mg, metoprolol succinate 200 mg). Sau đợt mất bù: bắt đầu lại 1.25 mg và tăng dần khi huyết động ổn định (không tụt HA, không nhịp chậm, không ứ dịch). Tự ý tăng liều → nguy cơ bù cấp tái phát. Dặn theo dõi cân nặng hàng ngày (tăng > 2 kg trong 3 ngày → gọi bác sĩ).'
    }
  ],
};

export const PHARMACY_COMMUNITY_SCENARIOS = {
  'PS12-quiz-01': PS12_QUIZ,
  'PS13-quiz-01': PS13_QUIZ,
  'PS14-quiz-01': PS14_QUIZ,
};
