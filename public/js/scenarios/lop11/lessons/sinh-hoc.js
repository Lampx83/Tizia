// ============================================================
// Lớp 11 · SINH HỌC — Lý thuyết 35 tuần (CTGD 2018 — THPT).
// Sinh học cơ thể: Chuyển hoá vật chất - năng lượng,
// Cảm ứng, Sinh trưởng - phát triển, Sinh sản.
// Key trùng id quiz: "H11SINH-wNN-quiz".
// Văn phong nghiêm túc cấp THPT, gọi học sinh là 'các em'.
// ============================================================

export const H11SINH_LESSONS = {
  'H11SINH-w01-quiz': {
    topic: 'Khái quát trao đổi chất và chuyển hoá năng lượng ở sinh vật',
    intro: 'Các em bước vào Sinh học cơ thể với một câu hỏi nền tảng: cơ thể sống lấy gì từ môi trường và biến đổi chúng ra sao để tồn tại? Bài mở đầu giúp các em nắm bức tranh tổng quát về trao đổi chất và chuyển hoá năng lượng - dấu hiệu đặc trưng của mọi sự sống.',
    objectives: [
      'Nêu được khái niệm trao đổi chất và chuyển hoá năng lượng ở cấp cơ thể.',
      'Phân biệt được sinh vật tự dưỡng và dị dưỡng theo nguồn carbon và năng lượng.',
      'Trình bày được vai trò của trao đổi chất với sự sống.',
    ],
    theory: [
      { h: 'Trao đổi chất là gì' },
      { p: 'Trao đổi chất là tập hợp các phản ứng lấy chất từ môi trường, biến đổi chúng trong cơ thể rồi thải sản phẩm ra ngoài. Đi kèm trao đổi chất luôn là sự chuyển hoá năng lượng: năng lượng được tích luỹ, biến đổi và giải phóng để duy trì hoạt động sống.' },
      { h: 'Hai mặt của chuyển hoá vật chất' },
      { ul: ['Đồng hoá: tổng hợp chất phức tạp từ chất đơn giản, tích luỹ năng lượng', 'Dị hoá: phân giải chất phức tạp thành chất đơn giản, giải phóng năng lượng', 'Hai quá trình diễn ra đồng thời, đối lập nhưng thống nhất trong tế bào'] },
      { h: 'Các kiểu dinh dưỡng' },
      { p: 'Dựa vào nguồn carbon và nguồn năng lượng, sinh vật chia thành: tự dưỡng (tự tổng hợp chất hữu cơ từ chất vô cơ, như thực vật quang hợp) và dị dưỡng (lấy chất hữu cơ có sẵn, như động vật và nấm).' },
      { h: 'Dòng năng lượng trong sinh giới' },
      { p: 'Năng lượng ánh sáng được thực vật chuyển thành năng lượng hoá học trong chất hữu cơ, rồi truyền qua các bậc dinh dưỡng và cuối cùng thất thoát dưới dạng nhiệt. Trao đổi chất vì thế gắn cơ thể với toàn bộ hệ sinh thái.' },
      { note: 'Ngừng trao đổi chất là ngừng sống. Đây là tiêu chí phân biệt vật sống với vật không sống.' },
    ],
    examples: [
      { q: 'Vì sao thực vật được xếp vào nhóm tự dưỡng còn nấm thì không?', a: 'Vì thực vật có lục lạp, tự tổng hợp chất hữu cơ từ CO2 và nước nhờ năng lượng ánh sáng. Nấm không quang hợp, phải hấp thụ chất hữu cơ có sẵn nên là dị dưỡng.' },
      { q: 'Đồng hoá và dị hoá có thể tách rời nhau trong cơ thể không?', a: 'Không. Dị hoá giải phóng năng lượng để cung cấp cho đồng hoá tổng hợp chất; đồng hoá tạo ra chất để dị hoá phân giải. Chúng phụ thuộc lẫn nhau, luôn diễn ra song song.' },
    ],
  },

  'H11SINH-w02-quiz': {
    topic: 'Trao đổi nước và khoáng ở thực vật — Hấp thụ',
    intro: 'Cây đứng yên nhưng vẫn không ngừng hút nước và muối khoáng từ đất. Các em sẽ tìm hiểu cơ quan và cơ chế giúp rễ cây thực hiện nhiệm vụ này - khởi đầu cho mọi hoạt động sống của cây.',
    objectives: [
      'Mô tả được cấu tạo của rễ thích nghi với hấp thụ nước và khoáng.',
      'Phân biệt được hấp thụ thụ động và chủ động các ion khoáng.',
      'Giải thích được con đường nước đi từ đất vào mạch gỗ.',
    ],
    theory: [
      { h: 'Cơ quan hấp thụ' },
      { p: 'Rễ là cơ quan hút nước và khoáng. Miền lông hút với hàng triệu tế bào lông hút làm tăng mạnh diện tích tiếp xúc với đất. Lông hút có thành mỏng, áp suất thẩm thấu cao nên hút nước rất hiệu quả.' },
      { h: 'Hấp thụ nước' },
      { p: 'Nước đi từ đất vào rễ theo cơ chế thẩm thấu: từ nơi có thế nước cao (đất) đến nơi có thế nước thấp (tế bào lông hút). Đây là quá trình thụ động, không tiêu tốn năng lượng.' },
      { h: 'Hấp thụ ion khoáng' },
      { ul: ['Thụ động: ion khuếch tán theo chiều gradient nồng độ, không tốn ATP', 'Chủ động: ion được vận chuyển ngược gradient, cần chất mang và tiêu tốn ATP', 'Nhờ cơ chế chủ động, rễ tích luỹ được khoáng dù nồng độ trong đất thấp'] },
      { h: 'Hai con đường vào mạch gỗ' },
      { p: 'Từ lông hút, nước và khoáng đi tới mạch gỗ theo con đường gian bào (qua khoảng trống giữa các tế bào) và con đường tế bào chất (xuyên qua tế bào). Tại nội bì, đai Caspary chặn con đường gian bào, buộc dòng nước qua màng tế bào để cây kiểm soát chất đi vào.' },
      { note: 'Đai Caspary đóng vai trò như trạm kiểm soát, ngăn các chất độc và lọc lựa ion trước khi vào trung trụ.' },
    ],
    examples: [
      { q: 'Vì sao cây bị ngập úng lâu ngày lại héo dù xung quanh đầy nước?', a: 'Khi ngập úng, đất thiếu oxy nên rễ hô hấp yếm khí, sinh chất độc và thiếu ATP. Hấp thụ chủ động ion và hô hấp của lông hút bị đình trệ, lông hút chết dần nên cây không hút được nước, dẫn đến héo.' },
      { q: 'Tại sao bón phân quá đậm đặc lại làm cây héo, gọi là "cháy phân"?', a: 'Phân đậm đặc làm nồng độ chất tan trong đất cao hơn trong tế bào lông hút, thế nước của đất giảm xuống thấp hơn của rễ. Nước đi ngược ra ngoài theo thẩm thấu, tế bào mất nước và cây héo.' },
    ],
  },

  'H11SINH-w03-quiz': {
    topic: 'Vận chuyển nước - Dòng mạch gỗ',
    intro: 'Một cây cao hàng chục mét vẫn đưa được nước lên tới ngọn mà không cần bơm. Các em sẽ khám phá dòng mạch gỗ và những lực kỳ diệu giúp nước đi ngược chiều trọng lực.',
    objectives: [
      'Mô tả được cấu tạo của mạch gỗ phù hợp với chức năng dẫn nước.',
      'Nêu được thành phần và chiều vận chuyển của dòng mạch gỗ.',
      'Giải thích được động lực đẩy nước lên cao trong cây.',
    ],
    theory: [
      { h: 'Cấu tạo mạch gỗ' },
      { p: 'Mạch gỗ gồm các tế bào chết là quản bào và mạch ống, nối thông thành ống rỗng liên tục. Thành tế bào hoá gỗ giúp ống bền chắc, không bị bẹp dưới áp lực âm khi hút nước.' },
      { h: 'Thành phần và chiều vận chuyển' },
      { p: 'Dịch mạch gỗ chủ yếu là nước và ion khoáng, ngoài ra có một số chất hữu cơ tổng hợp ở rễ. Dòng mạch gỗ vận chuyển một chiều, từ rễ lên thân, lá và các cơ quan phía trên.' },
      { h: 'Các động lực đẩy nước' },
      { ul: ['Áp suất rễ: lực đẩy từ rễ, biểu hiện qua hiện tượng rỉ nhựa và ứ giọt', 'Lực hút do thoát hơi nước ở lá: động lực chính, kéo cột nước từ trên xuống', 'Lực liên kết giữa các phân tử nước và lực bám vào thành mạch giữ cột nước liên tục'] },
      { h: 'Cột nước liên tục' },
      { p: 'Nhờ liên kết hydro, các phân tử nước bám chặt vào nhau tạo thành cột nước không đứt đoạn từ rễ tới lá. Khi lá thoát hơi nước, cả cột nước bị kéo lên đồng loạt như một sợi dây.' },
      { note: 'Hiện tượng ứ giọt buổi sáng ở mép lá cây thân thảo chính là bằng chứng của áp suất rễ.' },
    ],
    examples: [
      { q: 'Vì sao khi cắt ngang thân cây vào buổi sáng thường thấy nhựa rỉ ra ở vết cắt?', a: 'Đó là hiện tượng rỉ nhựa, do áp suất rễ đẩy dịch mạch gỗ lên. Khi cắt thân, cột nước bị hở nên dịch trào ra, chứng tỏ rễ vẫn chủ động đẩy nước.' },
      { q: 'Nếu một bọt khí lọt vào mạch gỗ thì điều gì xảy ra với việc dẫn nước?', a: 'Bọt khí làm đứt cột nước liên tục, phá vỡ lực liên kết giữa các phân tử nước. Đoạn mạch đó mất khả năng dẫn nước, cây phải dẫn nước vòng qua các mạch khác.' },
    ],
  },

  'H11SINH-w04-quiz': {
    topic: 'Vận chuyển chất hữu cơ - Dòng mạch rây',
    intro: 'Lá tạo ra đường nhưng rễ và quả mới là nơi cần dùng. Các em sẽ tìm hiểu dòng mạch rây - hệ thống vận chuyển sản phẩm quang hợp đi khắp cơ thể cây.',
    objectives: [
      'Mô tả được cấu tạo của mạch rây phù hợp chức năng dẫn chất hữu cơ.',
      'Nêu được thành phần và chiều vận chuyển của dòng mạch rây.',
      'So sánh được dòng mạch gỗ và dòng mạch rây.',
    ],
    theory: [
      { h: 'Cấu tạo mạch rây' },
      { p: 'Mạch rây gồm các tế bào sống là ống rây và tế bào kèm. Giữa các ống rây có bản rây với nhiều lỗ nhỏ cho dịch đi qua. Tế bào kèm cung cấp năng lượng và chất cho ống rây hoạt động.' },
      { h: 'Thành phần và chiều vận chuyển' },
      { p: 'Dịch mạch rây chủ yếu là saccharose, ngoài ra có amino acid, hormone, ATP. Dòng mạch rây vận chuyển hai chiều: từ nơi tổng hợp hoặc dự trữ (nguồn) đến nơi sử dụng hoặc tích luỹ (đích).' },
      { h: 'Động lực vận chuyển' },
      { p: 'Chênh lệch áp suất thẩm thấu giữa cơ quan nguồn (lá, áp suất cao) và cơ quan đích (rễ, quả, áp suất thấp) tạo dòng chảy. Đường được nạp vào mạch rây ở nguồn làm nước theo vào, đẩy dịch chảy về đích.' },
      { h: 'So sánh hai dòng' },
      { ul: ['Mạch gỗ: tế bào chết, dẫn nước và khoáng, một chiều từ rễ lên', 'Mạch rây: tế bào sống, dẫn chất hữu cơ, hai chiều từ nguồn đến đích', 'Hai dòng phối hợp tạo nên hệ vận chuyển hoàn chỉnh của cây'] },
      { note: 'Sâu hại chích hút như rệp thường tấn công mạch rây để lấy đường, vì đó là nơi giàu dinh dưỡng nhất.' },
    ],
    examples: [
      { q: 'Vì sao khi bóc một vòng vỏ quanh thân cây, phần trên vết bóc vẫn sống nhưng phần dưới dần suy yếu?', a: 'Bóc vỏ làm đứt mạch rây nhưng mạch gỗ ở phần lõi vẫn nguyên. Nước vẫn lên nuôi phần trên, nhưng đường từ lá không xuống được rễ nên rễ thiếu dinh dưỡng, lâu dài cây suy yếu.' },
      { q: 'Tại sao một củ khoai lang lúc đầu là cơ quan đích, sau khi trồng lại trở thành cơ quan nguồn?', a: 'Lúc tích luỹ tinh bột, củ nhận đường từ lá nên là đích. Khi đem trồng làm giống, củ phân giải tinh bột thành đường cung cấp cho mầm non, lúc này củ trở thành nguồn.' },
    ],
  },

  'H11SINH-w05-quiz': {
    topic: 'Thoát hơi nước',
    intro: 'Cây hút rất nhiều nước nhưng giữ lại rất ít, phần lớn bay hơi qua lá. Tưởng như lãng phí, nhưng các em sẽ thấy thoát hơi nước lại là điều kiện sống còn của cây.',
    objectives: [
      'Nêu được vai trò của thoát hơi nước đối với đời sống thực vật.',
      'Mô tả được cấu tạo khí khổng và cơ chế đóng mở.',
      'Phân tích được các yếu tố ảnh hưởng đến thoát hơi nước.',
    ],
    theory: [
      { h: 'Vai trò của thoát hơi nước' },
      { ul: ['Tạo lực hút kéo dòng nước và khoáng từ rễ lên lá', 'Hạ nhiệt độ bề mặt lá, tránh lá bị đốt nóng dưới nắng', 'Mở khí khổng để CO2 khuếch tán vào cho quang hợp'] },
      { h: 'Hai con đường thoát hơi nước' },
      { p: 'Nước thoát ra chủ yếu qua khí khổng (lượng lớn, điều tiết được) và một phần qua lớp cutin trên biểu bì (lượng nhỏ, không điều tiết). Khí khổng tập trung nhiều ở mặt dưới lá.' },
      { h: 'Cơ chế đóng mở khí khổng' },
      { p: 'Khí khổng gồm hai tế bào hình hạt đậu. Khi tế bào hút nước, trương lên thì khí khổng mở; khi mất nước, xẹp xuống thì khí khổng đóng. Ánh sáng kích thích mở, còn thiếu nước hoặc hormone ABA làm khí khổng đóng để giữ nước.' },
      { h: 'Yếu tố ảnh hưởng' },
      { p: 'Cường độ thoát hơi nước phụ thuộc ánh sáng, nhiệt độ, độ ẩm không khí, gió và lượng nước trong đất. Trời nắng nóng, khô, có gió thì cây thoát hơi nước mạnh.' },
      { note: 'Có thể nói thoát hơi nước là "tai hoạ tất yếu": cây phải mất nước để mở khí khổng lấy CO2 nuôi mình.' },
    ],
    examples: [
      { q: 'Vì sao vào buổi trưa nắng gắt, nhiều cây lại đóng bớt khí khổng dù đang cần quang hợp?', a: 'Trưa nắng gắt, cây thoát hơi nước quá nhanh có nguy cơ mất nước nghiêm trọng. Cây ưu tiên giữ nước nên tiết ABA đóng bớt khí khổng, chấp nhận giảm quang hợp để tránh héo.' },
      { q: 'Tại sao khi đánh cây đi trồng nơi khác, người ta thường cắt bớt lá?', a: 'Cắt bớt lá làm giảm diện tích thoát hơi nước. Lúc này rễ bị tổn thương hút nước kém, nếu giữ nhiều lá cây sẽ mất nước nhanh hơn hút vào nên dễ chết, vì vậy phải giảm lá để cân bằng.' },
    ],
  },

  'H11SINH-w06-quiz': {
    topic: 'Dinh dưỡng nitơ ở thực vật',
    intro: 'Nitơ là thành phần của protein và nucleic acid, không có nó cây không thể sống. Các em sẽ tìm hiểu cây lấy nitơ từ đâu và bằng cách nào, từ đó hiểu vì sao phân đạm lại quan trọng.',
    objectives: [
      'Nêu được vai trò của nitơ và các dạng nitơ cây hấp thụ được.',
      'Trình bày được quá trình cố định nitơ phân tử.',
      'Giải thích được ý nghĩa của bón phân hợp lý.',
    ],
    theory: [
      { h: 'Vai trò của nitơ' },
      { p: 'Nitơ là nguyên tố dinh dưỡng thiết yếu, tham gia cấu tạo protein, nucleic acid, diệp lục và nhiều enzyme. Thiếu nitơ, lá vàng, cây còi cọc, năng suất giảm.' },
      { h: 'Dạng nitơ cây hấp thụ' },
      { p: 'Cây không hấp thụ được khí nitơ (N2) trong không khí mà chỉ hấp thụ được nitơ ở dạng ion NH4 (ammonium) và NO3 (nitrate) trong đất qua rễ.' },
      { h: 'Cố định nitơ phân tử' },
      { ul: ['Cố định nitơ là quá trình biến N2 khí trời thành dạng cây dùng được', 'Do vi khuẩn thực hiện, nhờ enzyme nitrogenase trong điều kiện yếm khí', 'Vi khuẩn Rhizobium cộng sinh trong nốt sần rễ cây họ Đậu cố định nitơ rất hiệu quả'] },
      { h: 'Bón phân hợp lý' },
      { p: 'Bón đúng loại, đúng lượng, đúng lúc, đúng cách giúp cây sinh trưởng tốt mà không lãng phí và không ô nhiễm. Bón thừa đạm gây tích luỹ nitrate có hại và ô nhiễm nguồn nước.' },
      { note: 'Trồng xen hoặc luân canh cây họ Đậu là cách làm giàu đạm cho đất tự nhiên, giảm phân hoá học.' },
    ],
    examples: [
      { q: 'Vì sao đất trồng cây họ Đậu thường màu mỡ hơn dù không bón nhiều đạm?', a: 'Rễ cây họ Đậu có nốt sần chứa vi khuẩn Rhizobium cố định nitơ khí trời thành dạng cây dùng được. Phần nitơ này làm giàu đạm cho đất, nên đất sau khi trồng đậu màu mỡ hơn.' },
      { q: 'Vì sao không khí chứa tới 78% nitơ mà cây vẫn có thể thiếu đạm?', a: 'Nitơ trong không khí ở dạng N2 với liên kết ba rất bền, cây không phá vỡ được nên không hấp thụ trực tiếp. Cây chỉ dùng được NH4 và NO3 trong đất, vì vậy vẫn có thể thiếu đạm.' },
    ],
  },

  'H11SINH-w07-quiz': {
    topic: 'Quang hợp — Khái niệm và vai trò',
    intro: 'Mỗi mẩu thức ăn các em ăn, mỗi hơi thở các em hít đều bắt nguồn từ quang hợp. Bài học này giúp các em hiểu bản chất và tầm vóc của quá trình quan trọng bậc nhất trên Trái Đất.',
    objectives: [
      'Nêu được khái niệm và viết được phương trình tổng quát của quang hợp.',
      'Mô tả được cấu tạo lá và lục lạp thích nghi với quang hợp.',
      'Trình bày được vai trò của quang hợp đối với sinh giới.',
    ],
    theory: [
      { h: 'Khái niệm quang hợp' },
      { p: 'Quang hợp là quá trình tổng hợp chất hữu cơ từ CO2 và nước, sử dụng năng lượng ánh sáng được sắc tố hấp thụ, đồng thời giải phóng oxy. Phương trình tổng quát: 6CO2 + 12H2O cộng năng lượng ánh sáng tạo ra C6H12O6 + 6O2 + 6H2O.' },
      { h: 'Cơ quan và bào quan' },
      { p: 'Lá là cơ quan quang hợp chính, có bề mặt rộng, nhiều khí khổng và mạch dẫn. Lục lạp là bào quan thực hiện quang hợp, chứa diệp lục trên màng thylakoid và enzyme trong chất nền stroma.' },
      { h: 'Sắc tố quang hợp' },
      { ul: ['Diệp lục (chlorophyll): hấp thụ ánh sáng đỏ và xanh tím, tạo màu xanh lá', 'Carotenoid: hấp thụ ánh sáng và bảo vệ diệp lục, tạo màu vàng cam', 'Sắc tố truyền năng lượng ánh sáng về trung tâm phản ứng'] },
      { h: 'Vai trò của quang hợp' },
      { ul: ['Tổng hợp chất hữu cơ - nguồn thức ăn cho hầu hết sinh vật', 'Tích luỹ năng lượng ánh sáng vào liên kết hoá học', 'Giải phóng oxy và điều hoà tỉ lệ CO2/O2 của khí quyển'] },
      { note: 'Quang hợp là cầu nối duy nhất đưa năng lượng Mặt Trời vào thế giới sống.' },
    ],
    examples: [
      { q: 'Vì sao nói "không có quang hợp thì không có sự sống như hiện nay"?', a: 'Quang hợp tạo ra chất hữu cơ làm thức ăn và giải phóng oxy cho hô hấp của hầu hết sinh vật. Nó cũng tích luỹ năng lượng Mặt Trời vào sinh giới. Mất quang hợp, chuỗi thức ăn và khí oxy đều sụp đổ.' },
      { q: 'Vì sao lá cây thường có màu xanh lục?', a: 'Diệp lục hấp thụ mạnh ánh sáng đỏ và xanh tím để quang hợp, nhưng phản xạ lại ánh sáng lục. Mắt ta nhìn thấy phần ánh sáng phản xạ nên lá có màu xanh lục.' },
    ],
  },

  'H11SINH-w08-quiz': {
    topic: 'Pha sáng của quang hợp',
    intro: 'Quang hợp gồm hai pha nối tiếp. Các em bắt đầu với pha sáng - nơi năng lượng ánh sáng được "đóng gói" thành ATP và NADPH để pha sau sử dụng.',
    objectives: [
      'Nêu được nơi diễn ra và nguyên liệu của pha sáng.',
      'Trình bày được diễn biến chính của pha sáng.',
      'Giải thích được nguồn gốc của oxy thải ra trong quang hợp.',
    ],
    theory: [
      { h: 'Nơi diễn ra' },
      { p: 'Pha sáng diễn ra ở màng thylakoid của lục lạp, nơi có hệ sắc tố và chuỗi truyền electron. Pha này chỉ xảy ra khi có ánh sáng.' },
      { h: 'Diễn biến chính' },
      { ul: ['Diệp lục hấp thụ ánh sáng, electron được kích thích đi vào chuỗi truyền', 'Nước bị phân li (quang phân li nước) tạo ra electron, ion H và oxy', 'Năng lượng được dùng tổng hợp ATP và khử NADP thành NADPH'] },
      { h: 'Sản phẩm của pha sáng' },
      { p: 'Pha sáng tạo ra ATP và NADPH cung cấp năng lượng và lực khử cho pha tối, đồng thời thải ra oxy. Oxy đó đến từ nước chứ không phải từ CO2.' },
      { h: 'Quang phân li nước' },
      { p: 'Dưới tác động của năng lượng ánh sáng, nước bị tách thành electron bù cho diệp lục, ion H để tạo NADPH và khí oxy thải ra ngoài. Đây là nguồn gốc của toàn bộ oxy trong quang hợp.' },
      { note: 'Bằng thí nghiệm nước đánh dấu đồng vị, người ta đã chứng minh oxy thải ra có nguồn gốc từ H2O.' },
    ],
    examples: [
      { q: 'Vì sao pha sáng không thể diễn ra trong bóng tối?', a: 'Pha sáng cần năng lượng ánh sáng để kích thích electron của diệp lục và quang phân li nước. Không có ánh sáng thì không có năng lượng khởi động, nên pha sáng dừng lại.' },
      { q: 'Oxy thải ra trong quang hợp có nguồn gốc từ CO2 hay H2O?', a: 'Từ H2O. Trong pha sáng, nước bị quang phân li tạo ra oxy. Thí nghiệm dùng đồng vị oxy đánh dấu trong nước cho thấy oxy thải ra mang dấu của nước, không phải của CO2.' },
    ],
  },

  'H11SINH-w09-quiz': {
    topic: 'Pha tối (Chu trình Calvin) và nhóm thực vật C3, C4, CAM',
    intro: 'Sau khi pha sáng tạo "nhiên liệu", pha tối dùng nó để gắn CO2 thành đường. Các em cũng sẽ thấy thực vật đã tiến hoá nhiều cách quang hợp để thích nghi với các môi trường khác nhau.',
    objectives: [
      'Trình bày được diễn biến và sản phẩm của chu trình Calvin.',
      'Phân biệt được ba nhóm thực vật C3, C4 và CAM.',
      'Giải thích được sự thích nghi của thực vật C4, CAM với môi trường khô nóng.',
    ],
    theory: [
      { h: 'Chu trình Calvin (pha tối)' },
      { p: 'Pha tối diễn ra trong chất nền stroma của lục lạp, không cần ánh sáng trực tiếp nhưng cần ATP và NADPH từ pha sáng. CO2 được cố định và khử dần thành đường glucose qua chu trình Calvin.' },
      { h: 'Ba giai đoạn của chu trình' },
      { ul: ['Cố định CO2: CO2 gắn vào chất nhận tạo hợp chất đầu tiên', 'Khử: dùng ATP và NADPH biến hợp chất thành đường', 'Tái sinh: tạo lại chất nhận CO2 để chu trình tiếp diễn'] },
      { h: 'Ba nhóm thực vật' },
      { p: 'Thực vật C3 (lúa, đậu) cố định CO2 trực tiếp qua chu trình Calvin. Thực vật C4 (ngô, mía) cố định CO2 hai lần, tách về không gian. Thực vật CAM (xương rồng, thanh long) cố định CO2 ban đêm, tách về thời gian.' },
      { h: 'Ý nghĩa thích nghi' },
      { p: 'C4 và CAM thích nghi với khí hậu nóng khô: chúng tránh hô hấp sáng và giữ nước hiệu quả. CAM mở khí khổng ban đêm để giảm mất nước, nhờ đó sống được nơi sa mạc.' },
      { note: 'Cây CAM mở khí khổng ban đêm, đó là lý do nhiều cây mọng nước sống tốt giữa sa mạc khô hạn.' },
    ],
    examples: [
      { q: 'Vì sao cây xương rồng (CAM) lại mở khí khổng vào ban đêm thay vì ban ngày?', a: 'Ban ngày sa mạc nóng, mở khí khổng sẽ mất nước rất nhanh. Xương rồng mở khí khổng ban đêm khi mát để lấy CO2 dự trữ, ban ngày đóng khí khổng giữ nước mà vẫn quang hợp được.' },
      { q: 'Vì sao trong cùng điều kiện nắng nóng, ngô (C4) cho năng suất cao hơn lúa (C3)?', a: 'Cây C4 có cơ chế cố định CO2 hai lần và hầu như không bị hô hấp sáng làm hao hụt sản phẩm. Trong nắng nóng, lúa C3 mất nhiều sản phẩm do hô hấp sáng nên năng suất thấp hơn ngô.' },
    ],
  },

  'H11SINH-w10-quiz': {
    topic: 'Hô hấp ở thực vật',
    intro: 'Cây không chỉ quang hợp ban ngày mà còn hô hấp suốt ngày đêm để lấy năng lượng. Các em sẽ hiểu cây "đốt" đường ra sao và vì sao bảo quản nông sản phải kiểm soát hô hấp.',
    objectives: [
      'Nêu được khái niệm và phương trình tổng quát của hô hấp ở thực vật.',
      'Phân biệt được hô hấp hiếu khí và lên men.',
      'Giải thích được ứng dụng kiểm soát hô hấp trong bảo quản nông sản.',
    ],
    theory: [
      { h: 'Khái niệm hô hấp' },
      { p: 'Hô hấp là quá trình phân giải chất hữu cơ, giải phóng năng lượng tích luỹ trong ATP để cung cấp cho hoạt động sống. Phương trình tổng quát: C6H12O6 + 6O2 tạo ra 6CO2 + 6H2O cộng năng lượng.' },
      { h: 'Hô hấp hiếu khí' },
      { ul: ['Đường phân ở tế bào chất: tách glucose thành pyruvate', 'Chu trình Krebs ở chất nền ti thể: phân giải hoàn toàn, thải CO2', 'Chuỗi truyền electron ở màng ti thể: tạo phần lớn ATP, cần oxy'] },
      { h: 'Lên men' },
      { p: 'Khi thiếu oxy, tế bào chuyển sang lên men, phân giải glucose không hoàn toàn thành rượu hoặc acid lactic và chỉ thu được rất ít ATP. Vì vậy hô hấp hiếu khí hiệu quả hơn lên men nhiều lần.' },
      { h: 'Ứng dụng bảo quản' },
      { p: 'Hô hấp làm hao hụt chất hữu cơ của nông sản. Để bảo quản lâu, người ta hạ nhiệt độ, giảm oxy, tăng CO2 hoặc phơi khô nhằm kìm hãm hô hấp.' },
      { note: 'Kho lạnh và túi hút chân không chính là cách làm chậm hô hấp để giữ rau quả tươi lâu.' },
    ],
    examples: [
      { q: 'Vì sao hạt giống ẩm ướt chất đống lại nóng lên và dễ hỏng?', a: 'Hạt ẩm hô hấp mạnh, giải phóng nhiệt và nước. Khối hạt giữ nhiệt làm nhiệt độ tăng, đẩy hô hấp càng mạnh, hạt mất chất dự trữ và tạo điều kiện cho nấm mốc phát triển nên dễ hỏng.' },
      { q: 'Vì sao bảo quản rau trong tủ lạnh giữ được tươi lâu hơn để ngoài?', a: 'Nhiệt độ thấp làm chậm các phản ứng hô hấp, giảm hao hụt chất hữu cơ và nước trong rau. Nhờ đó rau ít héo và lâu hỏng hơn so với để ở nhiệt độ thường.' },
    ],
  },

  'H11SINH-w11-quiz': {
    topic: 'Tiêu hoá ở động vật — Khái quát',
    intro: 'Chuyển sang động vật, câu hỏi lớn là: làm sao biến thức ăn thành chất cơ thể hấp thụ được? Các em bắt đầu với khái niệm tiêu hoá và các hình thức tiêu hoá trong sinh giới.',
    objectives: [
      'Nêu được khái niệm tiêu hoá và vai trò của nó.',
      'Phân biệt được tiêu hoá nội bào và ngoại bào.',
      'Trình bày được chiều hướng tiến hoá của hệ tiêu hoá.',
    ],
    theory: [
      { h: 'Khái niệm tiêu hoá' },
      { p: 'Tiêu hoá là quá trình biến đổi thức ăn thành các chất đơn giản mà cơ thể hấp thụ được. Quá trình gồm biến đổi cơ học (nghiền, nhào trộn) và biến đổi hoá học (enzyme phân giải).' },
      { h: 'Tiêu hoá nội bào và ngoại bào' },
      { ul: ['Nội bào: thức ăn được tiêu hoá bên trong tế bào, gặp ở động vật đơn bào', 'Ngoại bào: thức ăn tiêu hoá trong túi hoặc ống tiêu hoá ngoài tế bào', 'Ngoại bào cho phép xử lý thức ăn kích thước lớn, hiệu quả cao hơn'] },
      { h: 'Các kiểu cơ quan tiêu hoá' },
      { p: 'Động vật chưa có cơ quan tiêu hoá (đơn bào) tiêu hoá nội bào. Động vật có túi tiêu hoá (ruột khoang) có một lỗ vừa lấy thức ăn vừa thải bã. Động vật có ống tiêu hoá có miệng và hậu môn riêng, dòng thức ăn đi một chiều.' },
      { h: 'Chiều hướng tiến hoá' },
      { p: 'Hệ tiêu hoá tiến hoá từ chưa có cơ quan đến có túi rồi đến ống tiêu hoá; từ tiêu hoá nội bào sang ngoại bào; từ chưa chuyên hoá đến phân hoá thành nhiều cơ quan đảm nhận chức năng riêng.' },
      { note: 'Ống tiêu hoá một chiều cho phép vừa lấy thức ăn vừa thải bã đồng thời, hiệu quả hơn hẳn túi tiêu hoá.' },
    ],
    examples: [
      { q: 'Vì sao động vật có ống tiêu hoá hấp thụ thức ăn hiệu quả hơn động vật có túi tiêu hoá?', a: 'Ống tiêu hoá có miệng và hậu môn riêng, thức ăn đi một chiều qua các đoạn chuyên hoá khác nhau. Nhờ đó vừa lấy thức ăn vừa thải bã đồng thời, mỗi đoạn xử lý một việc nên hiệu quả cao hơn túi chỉ có một lỗ.' },
      { q: 'Vì sao động vật đơn bào chỉ tiêu hoá được những hạt thức ăn rất nhỏ?', a: 'Chúng tiêu hoá nội bào, phải nuốt thức ăn vào trong tế bào bằng không bào tiêu hoá. Kích thước tế bào giới hạn nên chỉ xử lý được hạt nhỏ, không thể ăn con mồi lớn.' },
    ],
  },

  'H11SINH-w12-quiz': {
    topic: 'Tiêu hoá ở các nhóm động vật khác nhau',
    intro: 'Thú ăn cỏ, thú ăn thịt và người có hệ tiêu hoá khác nhau rõ rệt. Các em sẽ thấy cấu tạo cơ quan tiêu hoá luôn thích nghi với loại thức ăn của từng loài.',
    objectives: [
      'So sánh được cấu tạo ống tiêu hoá của thú ăn thịt và thú ăn thực vật.',
      'Giải thích được vai trò của vi sinh vật cộng sinh trong tiêu hoá thức ăn thực vật.',
      'Nêu được sự thích nghi của hệ tiêu hoá với loại thức ăn.',
    ],
    theory: [
      { h: 'Thú ăn thịt' },
      { p: 'Thú ăn thịt có răng nanh, răng hàm sắc để xé thịt; dạ dày đơn và ruột ngắn. Thức ăn giàu dinh dưỡng, dễ tiêu nên không cần ống tiêu hoá dài.' },
      { h: 'Thú ăn thực vật' },
      { ul: ['Răng nghiền phát triển, hàm cử động ngang để nghiền cỏ', 'Dạ dày lớn hoặc nhiều ngăn, ruột rất dài', 'Manh tràng hoặc dạ cỏ chứa vi sinh vật tiêu hoá xenlulose'] },
      { h: 'Vai trò vi sinh vật cộng sinh' },
      { p: 'Thức ăn thực vật chứa xenlulose mà động vật không tự tiêu được. Vi sinh vật cộng sinh trong dạ cỏ hoặc manh tràng tiết enzyme phân giải xenlulose, lại còn là nguồn protein khi bị tiêu hoá.' },
      { h: 'Tiêu hoá ở thú nhai lại' },
      { p: 'Trâu bò có dạ dày bốn ngăn: dạ cỏ, dạ tổ ong, dạ lá sách, dạ múi khế. Thức ăn được lên men ở dạ cỏ, ợ lên nhai lại, rồi mới tiêu hoá tiếp - nhờ đó tận dụng triệt để cỏ nghèo dinh dưỡng.' },
      { note: 'Ruột thú ăn cỏ dài gấp nhiều lần thú ăn thịt cùng cỡ vì cần thời gian dài hơn để tiêu hoá thức ăn khó tiêu.' },
    ],
    examples: [
      { q: 'Vì sao ruột của trâu, bò dài hơn ruột của hổ, báo rất nhiều dù kích thước cơ thể tương đương?', a: 'Trâu bò ăn cỏ nghèo dinh dưỡng và khó tiêu nên cần ruột dài để kéo dài thời gian tiêu hoá và hấp thụ. Hổ báo ăn thịt giàu dinh dưỡng, dễ tiêu nên ruột ngắn vẫn đủ.' },
      { q: 'Vì sao bò không tự tiêu hoá được cỏ nhưng vẫn sống khoẻ nhờ ăn cỏ?', a: 'Bò không có enzyme phân giải xenlulose, nhưng vi sinh vật cộng sinh trong dạ cỏ tiết enzyme này giúp tiêu hoá cỏ. Hơn nữa, chính vi sinh vật khi trôi xuống ruột lại là nguồn protein cho bò.' },
    ],
  },

  'H11SINH-w13-quiz': {
    topic: 'Hô hấp ở động vật',
    intro: 'Mọi tế bào cần oxy và phải thải CO2. Các em sẽ tìm hiểu các hình thức trao đổi khí trong sinh giới và vì sao mỗi nhóm động vật lại có bề mặt hô hấp riêng.',
    objectives: [
      'Nêu được khái niệm hô hấp và các đặc điểm của bề mặt trao đổi khí.',
      'Phân biệt được các hình thức hô hấp ở động vật.',
      'Giải thích được sự thích nghi của cơ quan hô hấp với môi trường sống.',
    ],
    theory: [
      { h: 'Khái niệm hô hấp ở động vật' },
      { p: 'Hô hấp ở động vật gồm trao đổi khí với môi trường (lấy O2, thải CO2) và hô hấp tế bào (dùng O2 sinh năng lượng). Bề mặt trao đổi khí phải mỏng, ẩm, rộng và nhiều mao mạch.' },
      { h: 'Các hình thức hô hấp' },
      { ul: ['Qua bề mặt cơ thể: giun đất, động vật đơn giản', 'Bằng hệ thống ống khí: côn trùng', 'Bằng mang: cá, tôm, các động vật ở nước', 'Bằng phổi: lưỡng cư, bò sát, chim, thú'] },
      { h: 'Hô hấp bằng mang ở cá' },
      { p: 'Mang cá có nhiều phiến mỏng đầy mao mạch. Dòng nước chảy qua mang ngược chiều dòng máu (dòng song song ngược chiều) giúp cá lấy được tới hơn 80% oxy hoà tan trong nước.' },
      { h: 'Hô hấp bằng phổi ở chim' },
      { p: 'Chim có hệ túi khí phối hợp với phổi tạo dòng khí đi một chiều qua phổi, nên cả khi hít vào và thở ra phổi đều có không khí giàu oxy. Đây là kiểu hô hấp hiệu quả nhất, giúp chim bay ở độ cao thiếu oxy.' },
      { note: 'Mang chỉ hoạt động trong nước vì các phiến mang ép dính vào nhau khi lên cạn, nên cá thiếu oxy mà chết.' },
    ],
    examples: [
      { q: 'Vì sao cá bị bắt lên cạn lại chết ngạt dù xung quanh đầy không khí giàu oxy?', a: 'Trên cạn các phiến mang mất nước, dính bết vào nhau làm diện tích trao đổi khí giảm mạnh và không còn ẩm. Mang không lấy được oxy từ không khí nên cá chết ngạt dù xung quanh đầy oxy.' },
      { q: 'Vì sao chim có thể bay được ở độ cao mà nhiều động vật khác sẽ thiếu oxy?', a: 'Chim có hệ túi khí giúp dòng khí qua phổi một chiều, phổi luôn được cấp khí giàu oxy cả khi hít vào lẫn thở ra. Hiệu quả hô hấp rất cao nên chim vẫn đủ oxy ở nơi loãng khí.' },
    ],
  },

  'H11SINH-w14-quiz': {
    topic: 'Tuần hoàn máu',
    intro: 'Máu là dòng vận chuyển nuôi từng tế bào trong cơ thể. Các em sẽ tìm hiểu cấu tạo hệ tuần hoàn, hoạt động của tim và vì sao huyết áp lại quan trọng với sức khoẻ.',
    objectives: [
      'Phân biệt được hệ tuần hoàn hở và kín, tuần hoàn đơn và kép.',
      'Trình bày được hoạt động của tim và sự vận chuyển máu.',
      'Giải thích được khái niệm huyết áp và vận tốc máu.',
    ],
    theory: [
      { h: 'Các dạng hệ tuần hoàn' },
      { ul: ['Hệ tuần hoàn hở: máu tràn vào khoang cơ thể, áp lực thấp (côn trùng)', 'Hệ tuần hoàn kín: máu chảy trong mạch liên tục, áp lực cao, hiệu quả hơn', 'Tuần hoàn đơn (cá) có một vòng; tuần hoàn kép (chim, thú) có hai vòng'] },
      { h: 'Hoạt động của tim' },
      { p: 'Tim co bóp đẩy máu nhờ tính tự động: hệ dẫn truyền phát xung làm tim đập đều mà không cần lệnh từ não. Một chu kì tim gồm pha co tâm nhĩ, co tâm thất và pha giãn chung.' },
      { h: 'Huyết áp' },
      { p: 'Huyết áp là áp lực máu tác động lên thành mạch, cao nhất ở động mạch và giảm dần về tĩnh mạch. Huyết áp tâm thu ứng với lúc tim co, huyết áp tâm trương ứng với lúc tim giãn.' },
      { h: 'Vận tốc máu' },
      { p: 'Vận tốc máu nhanh nhất ở động mạch, chậm nhất ở mao mạch và tăng lại ở tĩnh mạch. Vận tốc chậm ở mao mạch tạo điều kiện cho trao đổi chất giữa máu và tế bào.' },
      { note: 'Tuần hoàn kép tách máu giàu oxy và máu nghèo oxy, giúp chim và thú có cường độ trao đổi chất cao.' },
    ],
    examples: [
      { q: 'Vì sao tuần hoàn kép ở thú hiệu quả hơn tuần hoàn đơn ở cá?', a: 'Tuần hoàn kép có hai vòng, máu được tim bơm hai lần nên áp lực cao và đi nhanh tới các cơ quan. Máu giàu oxy và nghèo oxy không trộn lẫn, nên cung cấp oxy tốt hơn, đáp ứng nhu cầu năng lượng cao.' },
      { q: 'Vì sao máu chảy chậm nhất ở mao mạch lại có lợi cho cơ thể?', a: 'Mao mạch là nơi trao đổi chất giữa máu và tế bào. Máu chảy chậm kéo dài thời gian tiếp xúc, giúp oxy, chất dinh dưỡng và chất thải được trao đổi đầy đủ với tế bào.' },
    ],
  },

  'H11SINH-w15-quiz': {
    topic: 'Cân bằng nội môi',
    intro: 'Dù môi trường ngoài thay đổi, cơ thể vẫn giữ môi trường trong ổn định. Các em sẽ hiểu cơ chế cân bằng nội môi - điều kiện để tế bào hoạt động bình thường.',
    objectives: [
      'Nêu được khái niệm và ý nghĩa của cân bằng nội môi.',
      'Trình bày được sơ đồ cơ chế điều hoà cân bằng nội môi.',
      'Giải thích được vai trò của thận và gan trong cân bằng nội môi.',
    ],
    theory: [
      { h: 'Khái niệm cân bằng nội môi' },
      { p: 'Cân bằng nội môi là duy trì sự ổn định của môi trường trong cơ thể (nồng độ glucose, áp suất thẩm thấu, pH, nhiệt độ). Nhờ đó tế bào hoạt động bình thường dù môi trường ngoài biến động.' },
      { h: 'Cơ chế điều hoà' },
      { p: 'Cân bằng nội môi hoạt động theo sơ đồ: bộ phận tiếp nhận kích thích, bộ phận điều khiển (thần kinh, nội tiết), bộ phận thực hiện (cơ quan). Cơ chế liên hệ ngược giúp đưa chỉ số về mức bình thường.' },
      { h: 'Vai trò của thận' },
      { ul: ['Điều hoà lượng nước và áp suất thẩm thấu của máu', 'Điều hoà nồng độ ion và pH', 'Bài tiết chất thải như urê ra khỏi cơ thể'] },
      { h: 'Vai trò của gan' },
      { p: 'Gan điều hoà nồng độ glucose: khi đường huyết cao thì dự trữ thành glycogen, khi thấp thì phân giải glycogen trả lại máu. Gan còn khử độc và điều hoà protein huyết tương.' },
      { note: 'Bệnh tiểu đường là ví dụ cân bằng nội môi bị rối loạn: cơ thể không giữ được đường huyết ổn định.' },
    ],
    examples: [
      { q: 'Sau bữa ăn nhiều cơm, đường huyết tăng cao, cơ thể điều hoà thế nào để đưa về bình thường?', a: 'Tuyến tuỵ tiết insulin, kích thích tế bào hấp thụ glucose và gan chuyển glucose thành glycogen dự trữ. Nhờ liên hệ ngược, đường huyết hạ về mức ổn định.' },
      { q: 'Vì sao khi mất nhiều mồ hôi mà không uống nước, ta lại thấy khát và tiểu ít?', a: 'Mất nước làm áp suất thẩm thấu máu tăng. Cơ thể gây cảm giác khát để bổ sung nước, đồng thời thận tăng tái hấp thu nước nên nước tiểu ít và đặc, giúp giữ cân bằng nội môi.' },
    ],
  },

  'H11SINH-w16-quiz': {
    topic: 'Bài tiết',
    intro: 'Cơ thể phải loại bỏ chất thải sinh ra từ chuyển hoá, nếu không sẽ tự đầu độc. Các em sẽ tìm hiểu hệ bài tiết, đặc biệt là thận - cỗ máy lọc máu tinh vi.',
    objectives: [
      'Nêu được khái niệm và vai trò của bài tiết.',
      'Mô tả được cấu tạo và chức năng của thận.',
      'Trình bày được quá trình hình thành nước tiểu.',
    ],
    theory: [
      { h: 'Khái niệm bài tiết' },
      { p: 'Bài tiết là quá trình loại bỏ ra khỏi cơ thể các sản phẩm thừa và độc của chuyển hoá như urê, CO2, nước thừa, muối thừa. Bài tiết giữ ổn định môi trường trong, gắn liền với cân bằng nội môi.' },
      { h: 'Cơ quan bài tiết' },
      { ul: ['Thận: bài tiết nước tiểu, lọc urê và điều hoà nước, muối', 'Phổi: thải CO2 và một phần hơi nước', 'Da: thải mồ hôi gồm nước, muối, urê'] },
      { h: 'Cấu tạo thận' },
      { p: 'Mỗi thận có hàng triệu đơn vị chức năng là nephron, gồm cầu thận và ống thận. Cầu thận là búi mao mạch nơi máu được lọc, ống thận là nơi hấp thu lại chất cần thiết và bài tiết tiếp chất thừa.' },
      { h: 'Hình thành nước tiểu' },
      { p: 'Nước tiểu hình thành qua ba giai đoạn: lọc máu ở cầu thận tạo nước tiểu đầu, tái hấp thu ở ống thận lấy lại nước và chất cần thiết, và bài tiết tiếp các chất thừa vào nước tiểu chính thức.' },
      { note: 'Mỗi ngày thận lọc khoảng 180 lít dịch nhưng chỉ thải ra hơn 1 lít nước tiểu nhờ tái hấp thu mạnh mẽ.' },
    ],
    examples: [
      { q: 'Vì sao trong nước tiểu của người khoẻ mạnh không có glucose, còn người tiểu đường lại có?', a: 'Người khoẻ tái hấp thu hết glucose ở ống thận nên nước tiểu không có đường. Người tiểu đường có đường huyết quá cao vượt ngưỡng tái hấp thu, phần glucose dư bị thải ra nước tiểu.' },
      { q: 'Vì sao khi trời lạnh ta đi tiểu nhiều hơn khi trời nóng?', a: 'Trời nóng mất nhiều nước qua mồ hôi nên cơ thể giữ nước, nước tiểu ít. Trời lạnh ít ra mồ hôi, lượng nước thừa được thận thải qua nước tiểu nhiều hơn để giữ cân bằng.' },
    ],
  },

  'H11SINH-w17-quiz': {
    topic: 'Ôn tập HK1 — Chuyển hoá vật chất và năng lượng',
    intro: 'Các em đã đi qua toàn bộ chuyển hoá vật chất - năng lượng ở thực vật và động vật. Bài ôn tập này hệ thống lại các mạch kiến thức để các em thấy bức tranh toàn cảnh trước khi kiểm tra.',
    objectives: [
      'Hệ thống hoá kiến thức chuyển hoá vật chất - năng lượng ở thực vật và động vật.',
      'Liên hệ được mối quan hệ giữa quang hợp và hô hấp.',
      'Vận dụng kiến thức giải thích hiện tượng thực tiễn.',
    ],
    theory: [
      { h: 'Mạch 1: Chuyển hoá ở thực vật' },
      { ul: ['Trao đổi nước và khoáng: hấp thụ ở rễ, vận chuyển qua mạch gỗ, thoát hơi nước ở lá', 'Quang hợp: pha sáng tạo ATP, NADPH và O2; pha tối cố định CO2 thành đường', 'Hô hấp: phân giải đường tạo năng lượng, diễn ra suốt ngày đêm'] },
      { h: 'Mạch 2: Chuyển hoá ở động vật' },
      { ul: ['Tiêu hoá: biến thức ăn thành chất hấp thụ được, thích nghi với loại thức ăn', 'Hô hấp: trao đổi khí qua da, ống khí, mang hoặc phổi', 'Tuần hoàn và bài tiết: vận chuyển chất và loại bỏ chất thải'] },
      { h: 'Quang hợp và hô hấp' },
      { p: 'Quang hợp tổng hợp chất hữu cơ và tích luỹ năng lượng, hô hấp phân giải chất hữu cơ và giải phóng năng lượng. Sản phẩm của quá trình này là nguyên liệu của quá trình kia, gắn kết thành chu trình vật chất và năng lượng.' },
      { h: 'Tư duy hệ thống' },
      { p: 'Mọi quá trình chuyển hoá đều phục vụ một mục tiêu: cung cấp vật chất và năng lượng để cơ thể duy trì sự sống và giữ cân bằng nội môi. Các em nên ôn theo mối liên hệ giữa các cơ quan, không học rời rạc.' },
      { note: 'Khi ôn tập hãy tự đặt câu hỏi "chất này từ đâu đến, đi đâu, để làm gì" - đó là cách hiểu sâu chuyển hoá.' },
    ],
    examples: [
      { q: 'Quang hợp và hô hấp có quan hệ với nhau như thế nào trong một cây xanh?', a: 'Quang hợp tạo ra glucose và oxy, đó chính là nguyên liệu cho hô hấp. Hô hấp tạo ra CO2 và nước, lại là nguyên liệu cho quang hợp. Hai quá trình gắn kết thành chu trình vật chất - năng lượng khép kín trong cây.' },
      { q: 'Vì sao có thể nói "cây xanh là cầu nối giữa năng lượng Mặt Trời và toàn bộ sinh giới"?', a: 'Chỉ cây xanh quang hợp mới biến năng lượng ánh sáng thành năng lượng hoá học trong chất hữu cơ. Năng lượng đó truyền qua chuỗi thức ăn nuôi mọi sinh vật khác, nên cây xanh là cầu nối duy nhất đưa năng lượng Mặt Trời vào sự sống.' },
    ],
  },

  'H11SINH-w18-quiz': {
    topic: 'Kiểm tra HK1',
    intro: 'Đây là buổi tổng kiểm tra học kì 1. Bài học này hướng dẫn các em cách hệ thống kiến thức trọng tâm và rèn kỹ năng làm bài để đạt kết quả tốt nhất.',
    objectives: [
      'Tổng hợp được kiến thức trọng tâm học kì 1.',
      'Rèn kỹ năng phân tích và trả lời câu hỏi vận dụng.',
      'Tự đánh giá được mức độ nắm kiến thức của bản thân.',
    ],
    theory: [
      { h: 'Phạm vi kiểm tra' },
      { p: 'Kiểm tra học kì 1 bao quát toàn bộ chủ đề chuyển hoá vật chất và năng lượng ở thực vật và động vật, từ trao đổi nước - khoáng, quang hợp, hô hấp đến tiêu hoá, hô hấp, tuần hoàn, cân bằng nội môi và bài tiết.' },
      { h: 'Kiến thức trọng tâm thực vật' },
      { ul: ['Cơ chế hấp thụ và vận chuyển nước, khoáng', 'Hai pha của quang hợp và ba nhóm C3, C4, CAM', 'Hô hấp và ứng dụng bảo quản nông sản'] },
      { h: 'Kiến thức trọng tâm động vật' },
      { ul: ['Các hình thức tiêu hoá và hô hấp, sự thích nghi với thức ăn và môi trường', 'Các dạng hệ tuần hoàn, hoạt động của tim, huyết áp', 'Cơ chế cân bằng nội môi và vai trò của thận, gan'] },
      { h: 'Kỹ năng làm bài' },
      { p: 'Đọc kỹ câu hỏi, gạch chân từ khoá, với câu giải thích hãy nêu cơ chế rồi mới kết luận. Phân bổ thời gian hợp lý, làm câu dễ trước, kiểm tra lại trước khi nộp.' },
      { note: 'Câu vận dụng thường yêu cầu giải thích "vì sao" - hãy trình bày theo chuỗi nguyên nhân đến kết quả.' },
    ],
    examples: [
      { q: 'Một câu hỏi yêu cầu "giải thích vì sao bón nhiều đạm làm cây lúa dễ đổ và sâu bệnh". Nên trả lời theo hướng nào?', a: 'Nêu cơ chế: thừa đạm làm cây phát triển thân lá quá mạnh, mô non mềm yếu nên thân dễ đổ và hấp dẫn sâu bệnh. Sau đó kết luận cần bón đạm hợp lý. Trình bày theo chuỗi nguyên nhân - kết quả sẽ rõ ràng.' },
      { q: 'Khi gặp câu so sánh tuần hoàn đơn và tuần hoàn kép, nên trình bày ra sao?', a: 'Lập bảng hoặc nêu từng tiêu chí: số vòng tuần hoàn, áp lực máu, sự pha trộn máu giàu và nghèo oxy, hiệu quả cung cấp oxy. So sánh song song theo tiêu chí giúp câu trả lời mạch lạc và đủ ý.' },
    ],
  },

  'H11SINH-w19-quiz': {
    topic: 'Cảm ứng ở thực vật — Hướng động',
    intro: 'Cây không cử động như động vật nhưng vẫn phản ứng với môi trường. Các em sẽ tìm hiểu hướng động - kiểu cảm ứng giúp rễ tìm nước, ngọn tìm sáng.',
    objectives: [
      'Nêu được khái niệm cảm ứng và hướng động ở thực vật.',
      'Phân biệt được các kiểu hướng động.',
      'Giải thích được cơ chế hướng động liên quan đến auxin.',
    ],
    theory: [
      { h: 'Cảm ứng ở thực vật' },
      { p: 'Cảm ứng là phản ứng của thực vật với kích thích từ môi trường, giúp cây thích nghi và tồn tại. Ở thực vật, cảm ứng thường diễn ra chậm và biểu hiện bằng sự vận động sinh trưởng.' },
      { h: 'Khái niệm hướng động' },
      { p: 'Hướng động là vận động sinh trưởng của cây theo một hướng xác định, phụ thuộc hướng của kích thích. Hướng động dương là sinh trưởng về phía kích thích, hướng động âm là tránh xa kích thích.' },
      { h: 'Các kiểu hướng động' },
      { ul: ['Hướng sáng: ngọn cây hướng về nguồn sáng', 'Hướng trọng lực: rễ hướng xuống, thân hướng lên', 'Hướng nước và hướng hoá: rễ tìm về nơi có nước và khoáng', 'Hướng tiếp xúc: tua cuốn bám vào giá thể'] },
      { h: 'Cơ chế liên quan auxin' },
      { p: 'Auxin là hormone điều khiển hướng động. Khi chiếu sáng một phía, auxin dồn về phía tối, kích thích tế bào phía tối dài ra nhanh hơn, làm ngọn cây cong về phía sáng.' },
      { note: 'Hướng động giúp cây cố định một chỗ vẫn tìm được ánh sáng, nước và bám vững vào giá thể.' },
    ],
    examples: [
      { q: 'Vì sao cây trồng trong chậu đặt cạnh cửa sổ thường nghiêng ngọn về phía cửa?', a: 'Ánh sáng chiếu từ phía cửa sổ làm auxin dồn sang phía tối của ngọn. Tế bào phía tối dài ra nhanh hơn nên ngọn cong về phía sáng - đó là hướng sáng dương.' },
      { q: 'Vì sao dù gieo hạt nằm nghiêng kiểu nào, rễ vẫn mọc xuống và thân vẫn mọc lên?', a: 'Rễ có hướng trọng lực dương nên luôn mọc xuống theo chiều trọng lực để tìm nước và bám đất; thân có hướng trọng lực âm nên mọc lên để vươn tới ánh sáng. Vì vậy hướng đặt hạt không quan trọng.' },
    ],
  },

  'H11SINH-w20-quiz': {
    topic: 'Cảm ứng ở thực vật — Ứng động',
    intro: 'Có những phản ứng của cây không phụ thuộc hướng kích thích, như lá trinh nữ cụp lại khi chạm. Các em sẽ tìm hiểu ứng động và phân biệt nó với hướng động.',
    objectives: [
      'Nêu được khái niệm ứng động.',
      'Phân biệt được ứng động sinh trưởng và ứng động không sinh trưởng.',
      'So sánh được ứng động với hướng động.',
    ],
    theory: [
      { h: 'Khái niệm ứng động' },
      { p: 'Ứng động là vận động của cây phản ứng với kích thích không định hướng từ môi trường (ánh sáng, nhiệt độ, va chạm). Hướng phản ứng không phụ thuộc hướng kích thích.' },
      { h: 'Ứng động sinh trưởng' },
      { p: 'Ứng động sinh trưởng do tốc độ sinh trưởng không đều ở hai phía cơ quan, diễn ra chậm và không thuận nghịch. Ví dụ hoa nở và khép theo ánh sáng, nhiệt độ trong ngày.' },
      { h: 'Ứng động không sinh trưởng' },
      { p: 'Ứng động không sinh trưởng do thay đổi sức trương nước của tế bào, diễn ra nhanh và thuận nghịch, không liên quan sinh trưởng. Ví dụ lá cây trinh nữ cụp khi bị chạm, lá cây bắt mồi khép lại.' },
      { h: 'So sánh ứng động và hướng động' },
      { ul: ['Hướng động: hướng phản ứng phụ thuộc hướng kích thích, thường chậm', 'Ứng động: hướng phản ứng không phụ thuộc hướng kích thích', 'Cả hai đều giúp cây thích nghi với môi trường'] },
      { note: 'Lá trinh nữ cụp nhanh khi chạm là ứng động không sinh trưởng, được cho là cơ chế tự vệ trước động vật ăn lá.' },
    ],
    examples: [
      { q: 'Vì sao lá cây trinh nữ cụp lại rất nhanh khi ta chạm vào, rồi sau đó lại mở ra?', a: 'Đó là ứng động không sinh trưởng do thay đổi sức trương nước. Khi bị chạm, tế bào ở gốc lá mất nước đột ngột làm lá cụp; sau đó nước trở lại, tế bào trương lên nên lá mở ra. Phản ứng nhanh và thuận nghịch.' },
      { q: 'Hiện tượng hoa mười giờ nở vào khoảng giữa buổi sáng là hướng động hay ứng động?', a: 'Đó là ứng động sinh trưởng theo ánh sáng và nhiệt độ. Hoa nở do hai phía cánh sinh trưởng không đều khi điều kiện thay đổi, hướng nở không phụ thuộc hướng nguồn kích thích nên là ứng động.' },
    ],
  },

  'H11SINH-w21-quiz': {
    topic: 'Cảm ứng ở động vật — Khái quát',
    intro: 'Động vật phản ứng nhanh và đa dạng nhờ hệ thần kinh. Các em sẽ tìm hiểu khái quát cảm ứng ở động vật và sự tiến hoá của các kiểu tổ chức thần kinh.',
    objectives: [
      'Nêu được khái niệm cảm ứng ở động vật.',
      'Phân biệt được các dạng hệ thần kinh trong sinh giới.',
      'Trình bày được chiều hướng tiến hoá của hệ thần kinh.',
    ],
    theory: [
      { h: 'Cảm ứng ở động vật' },
      { p: 'Cảm ứng ở động vật là khả năng tiếp nhận và phản ứng lại các kích thích từ môi trường để tồn tại và phát triển. Cảm ứng ở động vật nhanh, chính xác và đa dạng hơn ở thực vật nhờ hệ thần kinh.' },
      { h: 'Động vật chưa có tổ chức thần kinh' },
      { p: 'Động vật đơn bào chưa có hệ thần kinh, phản ứng bằng cách chuyển động cả cơ thể (co rút, hướng về hoặc tránh xa kích thích).' },
      { h: 'Các dạng hệ thần kinh' },
      { ul: ['Hệ thần kinh dạng lưới: ruột khoang, phản ứng toàn thân, tốn năng lượng', 'Hệ thần kinh dạng chuỗi hạch: giun, thân mềm, phản ứng định khu', 'Hệ thần kinh dạng ống: động vật có xương sống, phân hoá cao'] },
      { h: 'Chiều hướng tiến hoá' },
      { p: 'Hệ thần kinh tiến hoá từ lưới đến chuỗi hạch rồi đến ống; từ chưa tập trung đến tập trung; từ phản ứng toàn thân đến phản ứng định khu, chính xác và tiết kiệm năng lượng.' },
      { note: 'Hệ thần kinh càng tập trung và phân hoá thì phản ứng càng nhanh, chính xác và phức tạp.' },
    ],
    examples: [
      { q: 'Vì sao thuỷ tức (hệ thần kinh dạng lưới) khi bị kích thích một điểm lại co rút toàn thân?', a: 'Hệ thần kinh dạng lưới có các tế bào thần kinh nối với nhau khắp cơ thể nhưng chưa tập trung. Kích thích lan ra toàn bộ mạng lưới nên cả cơ thể cùng phản ứng, do đó tốn nhiều năng lượng.' },
      { q: 'Vì sao động vật có hệ thần kinh dạng ống phản ứng nhanh và chính xác hơn dạng lưới?', a: 'Hệ thần kinh dạng ống tập trung và phân hoá cao, có não bộ điều khiển và phản xạ định khu. Kích thích chỉ gây phản ứng ở vùng cần thiết, nên nhanh, chính xác và tiết kiệm năng lượng hơn dạng lưới.' },
    ],
  },

  'H11SINH-w22-quiz': {
    topic: 'Hệ thần kinh — Nơron và cung phản xạ',
    intro: 'Mọi phản ứng của động vật đều dựa trên tế bào thần kinh và cung phản xạ. Các em sẽ tìm hiểu cấu tạo nơron và con đường một phản xạ diễn ra.',
    objectives: [
      'Mô tả được cấu tạo của nơron.',
      'Nêu được khái niệm phản xạ và các thành phần của cung phản xạ.',
      'Phân biệt được phản xạ không điều kiện và có điều kiện.',
    ],
    theory: [
      { h: 'Cấu tạo nơron' },
      { p: 'Nơron là đơn vị cấu tạo của hệ thần kinh, gồm thân nơron, sợi nhánh nhận tín hiệu và sợi trục dẫn xung đi. Nhiều sợi trục có bao myelin giúp dẫn truyền xung nhanh hơn.' },
      { h: 'Khái niệm phản xạ' },
      { p: 'Phản xạ là phản ứng của cơ thể trả lời kích thích thông qua hệ thần kinh. Phản xạ là cơ sở của mọi hoạt động cảm ứng ở động vật có hệ thần kinh.' },
      { h: 'Cung phản xạ' },
      { ul: ['Cơ quan thụ cảm: tiếp nhận kích thích', 'Nơron hướng tâm: dẫn xung về trung ương', 'Trung ương thần kinh: phân tích và phát lệnh', 'Nơron li tâm và cơ quan trả lời: thực hiện phản ứng'] },
      { h: 'Hai loại phản xạ' },
      { p: 'Phản xạ không điều kiện là bẩm sinh, bền vững, có cung phản xạ cố định (như rụt tay khi chạm nóng). Phản xạ có điều kiện được hình thành qua học tập, không bền vững, cần lặp lại để duy trì.' },
      { note: 'Phản xạ có điều kiện giúp động vật thích nghi linh hoạt với điều kiện sống luôn thay đổi.' },
    ],
    examples: [
      { q: 'Khi tay vô tình chạm vào vật nóng, ta rụt tay lại ngay. Hãy chỉ ra cung phản xạ này.', a: 'Thụ cảm ở da nhận kích thích nóng, nơron hướng tâm dẫn xung về tuỷ sống, tuỷ sống phát lệnh qua nơron li tâm tới cơ tay làm cơ co và rụt tay. Đây là phản xạ không điều kiện, diễn ra rất nhanh để bảo vệ cơ thể.' },
      { q: 'Vì sao nghe nhắc đến món ăn ngon ta lại tiết nước bọt, và đây là loại phản xạ nào?', a: 'Đó là phản xạ có điều kiện, hình thành do liên hệ giữa lời nói hoặc hình ảnh với việc ăn được lặp lại nhiều lần. Vì là phản xạ có điều kiện nên không bẩm sinh và sẽ mất nếu không được củng cố.' },
    ],
  },

  'H11SINH-w23-quiz': {
    topic: 'Điện thế nghỉ - Điện thế hoạt động',
    intro: 'Tín hiệu thần kinh thực chất là những xung điện chạy trên màng nơron. Các em sẽ tìm hiểu điện thế nghỉ và điện thế hoạt động - cơ sở của mọi tín hiệu thần kinh.',
    objectives: [
      'Nêu được khái niệm và nguyên nhân điện thế nghỉ.',
      'Mô tả được sự hình thành điện thế hoạt động.',
      'Giải thích được cách xung thần kinh lan truyền trên sợi trục.',
    ],
    theory: [
      { h: 'Điện thế nghỉ' },
      { p: 'Điện thế nghỉ là chênh lệch điện thế giữa hai bên màng nơron khi không bị kích thích: phía trong màng mang điện âm, phía ngoài mang điện dương. Đây là trạng thái sẵn sàng để phát xung.' },
      { h: 'Nguyên nhân điện thế nghỉ' },
      { ul: ['Phân bố ion không đều: K cao trong, Na cao ngoài tế bào', 'Tính thấm chọn lọc của màng đối với các ion', 'Bơm natri-kali bơm chủ động Na ra và K vào, duy trì chênh lệch'] },
      { h: 'Điện thế hoạt động' },
      { p: 'Khi bị kích thích đủ mạnh, màng thay đổi tính thấm: Na ồ ạt tràn vào gây đảo cực (trong dương ngoài âm), sau đó K đi ra gây tái phân cực, đưa màng về điện thế nghỉ. Cả quá trình tạo thành một xung thần kinh.' },
      { h: 'Lan truyền xung' },
      { p: 'Trên sợi không có bao myelin, xung lan liên tục, chậm. Trên sợi có bao myelin, xung nhảy cóc qua các eo Ranvier nên truyền rất nhanh và tiết kiệm năng lượng.' },
      { note: 'Bao myelin giúp xung thần kinh ở người truyền tới cả trăm mét mỗi giây, nhanh hơn nhiều lần sợi trần.' },
    ],
    examples: [
      { q: 'Vì sao xung thần kinh truyền trên sợi có bao myelin nhanh hơn nhiều so với sợi không có bao myelin?', a: 'Bao myelin cách điện, xung không lan liên tục mà nhảy cóc từ eo Ranvier này sang eo khác. Nhờ bỏ qua phần có myelin, xung truyền nhanh hơn và tốn ít năng lượng hơn sợi trần.' },
      { q: 'Vai trò của bơm natri-kali trong việc duy trì điện thế nghỉ là gì?', a: 'Bơm natri-kali chủ động đẩy Na ra ngoài và đưa K vào trong, ngược chiều gradient nồng độ. Nhờ đó duy trì sự phân bố ion không đều hai bên màng, giữ cho điện thế nghỉ ổn định để nơron sẵn sàng phát xung.' },
    ],
  },

  'H11SINH-w24-quiz': {
    topic: 'Truyền tin qua synap',
    intro: 'Giữa hai nơron có một khe nhỏ mà xung điện không nhảy qua trực tiếp được. Các em sẽ tìm hiểu synap - nơi tín hiệu được chuyển tiếp bằng chất hoá học.',
    objectives: [
      'Mô tả được cấu tạo của synap hoá học.',
      'Trình bày được quá trình truyền tin qua synap.',
      'Giải thích được vì sao truyền tin qua synap chỉ theo một chiều.',
    ],
    theory: [
      { h: 'Khái niệm synap' },
      { p: 'Synap là nơi tiếp xúc giữa nơron với nơron khác hoặc với tế bào cơ, tuyến. Phần lớn là synap hoá học, truyền tin nhờ chất trung gian hoá học.' },
      { h: 'Cấu tạo synap hoá học' },
      { ul: ['Chuỳ synap chứa các bóng chứa chất trung gian hoá học', 'Khe synap là khoảng trống nhỏ giữa hai màng', 'Màng sau synap có các thụ thể tiếp nhận chất trung gian'] },
      { h: 'Quá trình truyền tin' },
      { p: 'Xung tới chuỳ synap làm Ca tràn vào, các bóng vỡ giải phóng chất trung gian (như acetylcholine) vào khe synap. Chất này gắn vào thụ thể màng sau, làm xuất hiện xung mới ở nơron sau.' },
      { h: 'Truyền tin một chiều' },
      { p: 'Chất trung gian chỉ có ở chuỳ synap và thụ thể chỉ có ở màng sau, nên tín hiệu chỉ đi từ màng trước sang màng sau, không đi ngược lại. Đó là lý do xung thần kinh truyền một chiều qua synap.' },
      { note: 'Nhiều loại thuốc và chất độc tác động lên synap để tăng hoặc chặn truyền tin thần kinh.' },
    ],
    examples: [
      { q: 'Vì sao truyền tin qua synap chỉ diễn ra một chiều từ màng trước sang màng sau?', a: 'Chất trung gian hoá học chỉ chứa ở chuỳ synap thuộc màng trước, còn thụ thể tiếp nhận chỉ có ở màng sau. Vì cấu tạo bất đối xứng này, tín hiệu chỉ có thể đi một chiều, không truyền ngược.' },
      { q: 'Nếu một chất độc làm chất trung gian không bị phân huỷ sau khi truyền tin thì hậu quả là gì?', a: 'Chất trung gian tồn đọng sẽ kích thích màng sau liên tục, gây co cơ kéo dài và rối loạn dẫn truyền thần kinh. Đây là cơ chế gây độc của một số thuốc trừ sâu và chất độc thần kinh.' },
    ],
  },

  'H11SINH-w25-quiz': {
    topic: 'Tập tính ở động vật',
    intro: 'Vì sao chim di cư, ong nhảy múa chỉ đường, chó biết nghe lệnh? Các em sẽ tìm hiểu tập tính - chuỗi phản ứng giúp động vật thích nghi với môi trường sống.',
    objectives: [
      'Nêu được khái niệm và phân loại tập tính.',
      'Phân biệt được tập tính bẩm sinh và tập tính học được.',
      'Nêu được một số dạng tập tính phổ biến và ứng dụng.',
    ],
    theory: [
      { h: 'Khái niệm tập tính' },
      { p: 'Tập tính là chuỗi phản ứng của động vật trả lời kích thích từ môi trường, giúp động vật thích nghi và tồn tại. Tập tính có cơ sở là các phản xạ.' },
      { h: 'Phân loại tập tính' },
      { ul: ['Tập tính bẩm sinh: di truyền, sinh ra đã có, bền vững (nhện giăng tơ)', 'Tập tính học được: hình thành qua đời sống cá thể, có thể thay đổi', 'Nhiều tập tính là sự phối hợp của cả bẩm sinh và học được'] },
      { h: 'Các dạng tập tính phổ biến' },
      { p: 'Một số dạng tập tính gồm: kiếm ăn, bảo vệ lãnh thổ, sinh sản, di cư, tập tính xã hội (sống bầy đàn, phân công nhiệm vụ ở ong, kiến). Mỗi dạng đều có ý nghĩa sinh tồn rõ rệt.' },
      { h: 'Ứng dụng' },
      { p: 'Hiểu tập tính giúp con người thuần dưỡng và huấn luyện vật nuôi, dùng thiên địch trừ sâu, dẫn dụ hoặc xua đuổi côn trùng, bảo tồn động vật hoang dã.' },
      { note: 'Huấn luyện chó nghiệp vụ, dùng bẫy đèn bắt côn trùng đều là ứng dụng hiểu biết về tập tính.' },
    ],
    examples: [
      { q: 'Nhện mới nở đã biết giăng tơ đúng kiểu mà không cần học, đó là tập tính gì và vì sao?', a: 'Đó là tập tính bẩm sinh, do di truyền quy định sẵn trong hệ gen. Vì sinh ra đã có và rất bền vững, không cần học nên mọi con nhện cùng loài đều giăng tơ giống nhau.' },
      { q: 'Vì sao chó có thể được huấn luyện để làm theo hiệu lệnh của người?', a: 'Đó là tập tính học được dựa trên phản xạ có điều kiện. Qua việc lặp lại hiệu lệnh kèm phần thưởng, chó hình thành mối liên hệ giữa hiệu lệnh và hành động, nên làm theo lệnh của người.' },
    ],
  },

  'H11SINH-w26-quiz': {
    topic: 'Sinh trưởng và phát triển — Khái niệm',
    intro: 'Một hạt nhỏ lớn thành cây cao, một trứng phát triển thành cơ thể hoàn chỉnh. Các em sẽ phân biệt hai quá trình gắn bó: sinh trưởng và phát triển.',
    objectives: [
      'Nêu được khái niệm sinh trưởng và phát triển.',
      'Phân biệt được sinh trưởng với phát triển.',
      'Trình bày được mối quan hệ giữa hai quá trình.',
    ],
    theory: [
      { h: 'Khái niệm sinh trưởng' },
      { p: 'Sinh trưởng là sự tăng kích thước và khối lượng của cơ thể do tăng số lượng và kích thước tế bào. Đây là biến đổi về lượng, có thể đo đếm được như chiều cao, cân nặng.' },
      { h: 'Khái niệm phát triển' },
      { p: 'Phát triển là toàn bộ những biến đổi diễn ra trong vòng đời, gồm sinh trưởng, phân hoá tế bào và phát sinh hình thái cơ quan. Phát triển là biến đổi về chất.' },
      { h: 'Mối quan hệ' },
      { ul: ['Sinh trưởng và phát triển gắn bó, đan xen trong vòng đời', 'Sinh trưởng tạo tiền đề về lượng cho phát triển', 'Phát triển định hướng và thúc đẩy sinh trưởng'] },
      { h: 'Các nhân tố ảnh hưởng' },
      { p: 'Sinh trưởng và phát triển chịu ảnh hưởng của yếu tố bên trong (di truyền, hormone) và yếu tố bên ngoài (dinh dưỡng, nhiệt độ, ánh sáng, nước). Cần điều kiện thích hợp để cơ thể phát triển toàn diện.' },
      { note: 'Một cây có thể cao lớn (sinh trưởng) nhưng chưa ra hoa (chưa phát triển đến giai đoạn sinh sản).' },
    ],
    examples: [
      { q: 'Sự khác nhau cơ bản giữa sinh trưởng và phát triển là gì?', a: 'Sinh trưởng là biến đổi về lượng, làm cơ thể to ra và nặng thêm. Phát triển là biến đổi về chất, gồm cả sự phân hoá tế bào và hình thành cơ quan mới. Sinh trưởng có thể đo được, còn phát triển thể hiện qua sự thay đổi đặc điểm cơ thể.' },
      { q: 'Vì sao có thể nói sinh trưởng và phát triển là hai mặt của một quá trình thống nhất?', a: 'Vì chúng diễn ra song song và phụ thuộc nhau: sinh trưởng cung cấp lượng tế bào và vật chất làm tiền đề cho phát triển; phát triển lại định hướng và điều khiển sinh trưởng. Tách rời thì cơ thể không hoàn thiện được.' },
    ],
  },

  'H11SINH-w27-quiz': {
    topic: 'Hormon thực vật — Nhóm kích thích',
    intro: 'Cây điều khiển sinh trưởng nhờ những chất tín hiệu gọi là hormone thực vật. Các em sẽ tìm hiểu nhóm hormone kích thích và ứng dụng của chúng trong trồng trọt.',
    objectives: [
      'Nêu được khái niệm hormone thực vật.',
      'Trình bày được tác dụng của các hormone kích thích sinh trưởng.',
      'Nêu được ứng dụng của hormone trong nông nghiệp.',
    ],
    theory: [
      { h: 'Khái niệm hormone thực vật' },
      { p: 'Hormone thực vật là các chất hữu cơ do cây tạo ra với lượng rất nhỏ, có tác dụng điều tiết sinh trưởng và phát triển. Chúng chia thành nhóm kích thích và nhóm ức chế.' },
      { h: 'Nhóm hormone kích thích' },
      { ul: ['Auxin: kích thích dãn dài tế bào, hướng động, tạo rễ', 'Gibberellin: kích thích kéo dài thân, nảy mầm hạt', 'Cytokinin: kích thích phân chia tế bào, làm chậm già lá'] },
      { h: 'Cơ chế tác động' },
      { p: 'Hormone tác động theo nồng độ và sự phối hợp giữa các loại. Cùng một hormone có thể kích thích cơ quan này nhưng ức chế cơ quan khác tuỳ nồng độ, ví dụ auxin nồng độ thích hợp kích thích rễ nhưng cao quá lại ức chế.' },
      { h: 'Ứng dụng' },
      { p: 'Người ta dùng auxin để kích thích ra rễ cành giâm, gibberellin để phá ngủ hạt và làm quả to, cytokinin để nhân giống nuôi cấy mô. Cần dùng đúng nồng độ vì quá liều có thể gây hại.' },
      { note: 'Thuốc kích thích ra rễ bán ngoài tiệm cây cảnh thực chất chứa auxin tổng hợp.' },
    ],
    examples: [
      { q: 'Vì sao khi giâm cành, người ta thường nhúng gốc cành vào dung dịch chứa auxin?', a: 'Auxin kích thích hình thành rễ. Nhúng gốc cành giâm vào dung dịch auxin ở nồng độ thích hợp giúp cành nhanh ra rễ, tăng tỉ lệ sống và rút ngắn thời gian nhân giống.' },
      { q: 'Vì sao dùng hormone thực vật phải hết sức chú ý đến nồng độ?', a: 'Vì tác dụng của hormone phụ thuộc nồng độ: liều thích hợp thì kích thích, nhưng liều quá cao lại ức chế hoặc gây hại cho cây. Dùng sai nồng độ có thể làm cây biến dạng hoặc chết, nên phải dùng đúng liều.' },
    ],
  },

  'H11SINH-w28-quiz': {
    topic: 'Phát triển ở thực vật có hoa',
    intro: 'Vì sao có cây ra hoa mùa xuân, có cây chỉ nở khi ngày ngắn? Các em sẽ tìm hiểu sự ra hoa và các nhân tố chi phối phát triển ở thực vật có hoa.',
    objectives: [
      'Nêu được các nhân tố chi phối sự ra hoa.',
      'Trình bày được hiện tượng quang chu kì.',
      'Vận dụng kiến thức để điều khiển sự ra hoa trong trồng trọt.',
    ],
    theory: [
      { h: 'Sự ra hoa' },
      { p: 'Ra hoa là dấu mốc chuyển cây từ giai đoạn sinh trưởng sang sinh sản. Sự ra hoa chịu chi phối của tuổi cây, nhiệt độ, ánh sáng và hormone.' },
      { h: 'Quang chu kì' },
      { ul: ['Quang chu kì là phản ứng ra hoa theo tương quan độ dài ngày và đêm', 'Cây ngày dài ra hoa khi đêm ngắn (cây mùa hè)', 'Cây ngày ngắn ra hoa khi đêm dài (cúc, mía)', 'Cây trung tính ra hoa không phụ thuộc độ dài ngày'] },
      { h: 'Vai trò của nhiệt độ' },
      { p: 'Một số cây cần trải qua nhiệt độ thấp (xuân hoá) mới ra hoa được, ví dụ lúa mì mùa đông. Nhiệt độ là tín hiệu giúp cây ra hoa đúng mùa thuận lợi.' },
      { h: 'Ứng dụng' },
      { p: 'Hiểu quang chu kì giúp người trồng điều khiển ra hoa trái vụ: thắp đèn ban đêm để hoa cúc nở muộn, che tối để thanh long ra hoa sớm, nhằm bán được giá và đáp ứng thị trường.' },
      { note: 'Việc thắp đèn cho ruộng thanh long ban đêm chính là điều khiển quang chu kì để cây ra hoa trái vụ.' },
    ],
    examples: [
      { q: 'Vì sao nhà vườn thắp đèn ban đêm cho ruộng hoa cúc để hoa nở vào đúng dịp Tết?', a: 'Cúc là cây ngày ngắn, ra hoa khi đêm dài. Thắp đèn ban đêm làm gián đoạn đêm dài, cây hiểu là đêm ngắn nên chưa ra hoa. Ngừng thắp đèn vào thời điểm thích hợp giúp điều chỉnh cho hoa nở đúng Tết.' },
      { q: 'Vì sao cùng một giống cây trồng ở hai vĩ độ khác nhau lại ra hoa vào thời điểm khác nhau?', a: 'Độ dài ngày đêm thay đổi theo vĩ độ. Với cây phụ thuộc quang chu kì, độ dài đêm đạt ngưỡng ra hoa ở mỗi nơi vào thời điểm khác nhau, nên cây ra hoa lệch mùa giữa các vĩ độ.' },
    ],
  },

  'H11SINH-w29-quiz': {
    topic: 'Sinh trưởng và phát triển ở động vật',
    intro: 'Có loài lớn lên giống bố mẹ thu nhỏ, có loài phải qua nòng nọc hay sâu rồi mới thành con trưởng thành. Các em sẽ tìm hiểu các kiểu phát triển ở động vật.',
    objectives: [
      'Phân biệt được phát triển không qua biến thái và qua biến thái.',
      'Phân biệt được biến thái hoàn toàn và không hoàn toàn.',
      'Nêu được vai trò của hormone trong sinh trưởng, phát triển ở động vật.',
    ],
    theory: [
      { h: 'Các kiểu phát triển' },
      { p: 'Phát triển ở động vật chia thành hai kiểu chính: phát triển không qua biến thái và phát triển qua biến thái. Biến thái là sự thay đổi đột ngột về hình thái, cấu tạo trong vòng đời.' },
      { h: 'Phát triển không qua biến thái' },
      { p: 'Con non sinh ra có hình dạng và cấu tạo gần giống con trưởng thành, chỉ lớn dần lên. Gặp ở đa số động vật có xương sống và một số không xương sống, ví dụ người, gà, mèo.' },
      { h: 'Phát triển qua biến thái' },
      { ul: ['Biến thái hoàn toàn: con non khác hẳn con trưởng thành, qua giai đoạn nhộng (bướm: trứng - sâu - nhộng - bướm)', 'Biến thái không hoàn toàn: con non gần giống con trưởng thành, lớn lên qua nhiều lần lột xác (châu chấu)', 'Nòng nọc phát triển thành ếch cũng là biến thái'] },
      { h: 'Vai trò của hormone' },
      { p: 'Hormone điều khiển sinh trưởng và biến thái. Ở côn trùng, hormone ecdysone gây lột xác và biến thái, hormone juvenile duy trì trạng thái sâu non. Ở động vật có xương sống, hormone sinh trưởng và hormone tuyến giáp điều khiển lớn lên và biến thái.' },
      { note: 'Nòng nọc không có chân, sống dưới nước, sau biến thái thành ếch có bốn chân và sống được trên cạn.' },
    ],
    examples: [
      { q: 'Vì sao sâu bướm và bướm trưởng thành khác hẳn nhau về hình dạng và thức ăn, dù là cùng một loài?', a: 'Đó là phát triển qua biến thái hoàn toàn. Sâu (ăn lá) và bướm (hút mật) là các giai đoạn khác nhau trong vòng đời, cách nhau bởi giai đoạn nhộng. Việc khác thức ăn giúp giảm cạnh tranh giữa con non và con trưởng thành.' },
      { q: 'Vì sao nòng nọc thiếu iốt trong nước có thể không biến thái được thành ếch?', a: 'Biến thái của nòng nọc do hormone tuyến giáp điều khiển, mà hormone này cần iốt để tổng hợp. Thiếu iốt, tuyến giáp không tạo đủ hormone nên nòng nọc không biến thái, cứ ở mãi dạng ấu trùng.' },
    ],
  },

  'H11SINH-w30-quiz': {
    topic: 'Tuổi dậy thì - Hormon sinh dục',
    intro: 'Tuổi dậy thì là giai đoạn cơ thể thay đổi mạnh mẽ để chuẩn bị cho khả năng sinh sản. Các em sẽ hiểu vai trò của hormone sinh dục và cách chăm sóc bản thân trong giai đoạn này.',
    objectives: [
      'Nêu được những biến đổi cơ thể ở tuổi dậy thì.',
      'Trình bày được vai trò của hormone sinh dục.',
      'Có ý thức chăm sóc sức khoẻ và giữ vệ sinh tuổi dậy thì.',
    ],
    theory: [
      { h: 'Tuổi dậy thì' },
      { p: 'Tuổi dậy thì là giai đoạn cơ thể chuyển từ trẻ em sang trưởng thành, bắt đầu có khả năng sinh sản. Cơ thể biến đổi nhanh về thể chất, sinh lý và cả tâm lý.' },
      { h: 'Hormone sinh dục' },
      { ul: ['Hormone sinh dục nam (testosterone) do tinh hoàn tiết ra', 'Hormone sinh dục nữ (estrogen, progesterone) do buồng trứng tiết ra', 'Tuyến yên và vùng dưới đồi điều khiển hoạt động tuyến sinh dục'] },
      { h: 'Biến đổi tuổi dậy thì' },
      { p: 'Dưới tác động của hormone sinh dục, cơ thể xuất hiện các đặc điểm sinh dục thứ cấp: nam vỡ giọng, mọc râu, vai rộng; nữ phát triển tuyến vú, hông nở, có kinh nguyệt. Đây là dấu hiệu cơ thể đã trưởng thành về sinh dục.' },
      { h: 'Chăm sóc sức khoẻ' },
      { p: 'Tuổi dậy thì cần dinh dưỡng đầy đủ, vận động hợp lý, ngủ đủ giấc và giữ vệ sinh cơ thể. Cần hiểu biết đúng về cơ thể, tránh xa các thói quen có hại và biết bảo vệ bản thân.' },
      { note: 'Những thay đổi tâm lý ở tuổi dậy thì là bình thường; hiểu biết đúng giúp các em tự tin và sống lành mạnh.' },
    ],
    examples: [
      { q: 'Vì sao đến tuổi dậy thì, bạn nam vỡ giọng còn bạn nữ phát triển tuyến vú?', a: 'Đó là các đặc điểm sinh dục thứ cấp do hormone sinh dục gây ra. Testosterone ở nam làm thanh quản phát triển nên vỡ giọng; estrogen ở nữ làm tuyến vú phát triển. Đây là dấu hiệu cơ thể trưởng thành về sinh dục.' },
      { q: 'Vì sao ở tuổi dậy thì cần đặc biệt chú ý dinh dưỡng và giấc ngủ?', a: 'Tuổi dậy thì cơ thể sinh trưởng và phát triển rất nhanh, hormone sinh trưởng tiết nhiều khi ngủ sâu. Dinh dưỡng đủ và ngủ đủ giúp cơ thể phát triển toàn diện về chiều cao, cơ bắp và sức khoẻ.' },
    ],
  },

  'H11SINH-w31-quiz': {
    topic: 'Sinh sản ở thực vật',
    intro: 'Thực vật duy trì nòi giống bằng nhiều cách, từ một mẩu cành đến hạt giống. Các em sẽ phân biệt sinh sản vô tính và hữu tính ở thực vật cùng ứng dụng của chúng.',
    objectives: [
      'Phân biệt được sinh sản vô tính và hữu tính ở thực vật.',
      'Nêu được các hình thức sinh sản vô tính.',
      'Trình bày được quá trình thụ phấn, thụ tinh và tạo hạt ở thực vật có hoa.',
    ],
    theory: [
      { h: 'Sinh sản vô tính' },
      { p: 'Sinh sản vô tính là tạo cơ thể mới không qua kết hợp giao tử, con sinh ra giống hệt cây mẹ. Gồm sinh sản sinh dưỡng (thân, rễ, lá) và sinh sản bằng bào tử.' },
      { h: 'Các hình thức sinh sản vô tính' },
      { ul: ['Sinh sản sinh dưỡng tự nhiên: thân bò, thân rễ, củ, chồi', 'Sinh sản sinh dưỡng nhân tạo: giâm, chiết, ghép, nuôi cấy mô', 'Ưu điểm: nhanh, giữ nguyên đặc tính cây mẹ'] },
      { h: 'Sinh sản hữu tính' },
      { p: 'Sinh sản hữu tính có sự kết hợp giao tử đực và cái tạo hợp tử. Ở thực vật có hoa, hoa là cơ quan sinh sản: nhị tạo hạt phấn (giao tử đực), nhuỵ chứa noãn (giao tử cái).' },
      { h: 'Thụ phấn, thụ tinh và tạo hạt' },
      { p: 'Thụ phấn là hạt phấn rơi lên đầu nhuỵ. Hạt phấn nảy mầm, ống phấn đưa giao tử đực tới noãn xảy ra thụ tinh. Ở thực vật có hoa có thụ tinh kép, sau đó noãn tạo hạt, bầu nhuỵ tạo quả.' },
      { note: 'Thụ tinh kép là nét đặc trưng của thực vật có hoa: một giao tử tạo phôi, một giao tử tạo nội nhũ nuôi phôi.' },
    ],
    examples: [
      { q: 'Vì sao trồng mía bằng cách giâm hom cho các cây con giống hệt cây mẹ?', a: 'Giâm hom là sinh sản vô tính, cây con tạo ra từ một phần cơ thể mẹ qua nguyên phân, không có kết hợp giao tử. Vì vậy cây con mang bộ gen giống hệt cây mẹ, giữ nguyên đặc tính tốt.' },
      { q: 'Sinh sản hữu tính ở thực vật có ưu điểm gì so với sinh sản vô tính?', a: 'Sinh sản hữu tính có sự kết hợp giao tử nên tạo ra biến dị tổ hợp, con cái đa dạng di truyền. Nhờ đó thực vật thích nghi tốt hơn với môi trường thay đổi, là cơ sở cho chọn giống và tiến hoá.' },
    ],
  },

  'H11SINH-w32-quiz': {
    topic: 'Sinh sản ở động vật',
    intro: 'Từ thuỷ tức mọc chồi đến thú đẻ con nuôi sữa, động vật có nhiều cách duy trì nòi giống. Các em sẽ tìm hiểu các hình thức sinh sản ở động vật.',
    objectives: [
      'Phân biệt được sinh sản vô tính và hữu tính ở động vật.',
      'Nêu được các hình thức sinh sản vô tính ở động vật.',
      'Trình bày được các giai đoạn của sinh sản hữu tính.',
    ],
    theory: [
      { h: 'Sinh sản vô tính ở động vật' },
      { ul: ['Phân đôi: cơ thể chia thành hai (trùng amip)', 'Nảy chồi: chồi mọc trên cơ thể mẹ rồi tách ra (thuỷ tức)', 'Phân mảnh: mỗi mảnh tạo cá thể mới (sao biển)', 'Trinh sản: trứng không thụ tinh phát triển thành cá thể (ong đực)'] },
      { h: 'Sinh sản hữu tính' },
      { p: 'Sinh sản hữu tính có sự kết hợp giao tử đực và cái tạo hợp tử. Quá trình gồm: hình thành giao tử, thụ tinh tạo hợp tử, và phát triển phôi thành cơ thể mới.' },
      { h: 'Thụ tinh trong và thụ tinh ngoài' },
      { p: 'Thụ tinh ngoài diễn ra trong nước (cá, ếch), tỉ lệ sống thấp nên đẻ nhiều trứng. Thụ tinh trong diễn ra trong cơ thể con cái (bò sát, chim, thú), tỉ lệ sống cao hơn nên đẻ ít hơn.' },
      { h: 'Đẻ trứng và đẻ con' },
      { p: 'Đẻ trứng là phôi phát triển trong trứng ngoài cơ thể mẹ (chim, bò sát). Đẻ con là phôi phát triển trong cơ thể mẹ, được nuôi dưỡng và bảo vệ (đa số thú), nên tỉ lệ con non sống sót cao.' },
      { note: 'Đẻ con và nuôi con bằng sữa giúp thú bảo vệ con non tốt nhất, là mức tiến hoá cao của sinh sản.' },
    ],
    examples: [
      { q: 'Vì sao cá và ếch thường đẻ rất nhiều trứng, còn chim và thú lại đẻ ít con?', a: 'Cá, ếch thụ tinh ngoài trong môi trường nước, trứng và con non dễ bị hao hụt nên phải đẻ nhiều để duy trì nòi giống. Chim, thú thụ tinh trong, con non được bảo vệ và chăm sóc nên tỉ lệ sống cao, chỉ cần đẻ ít.' },
      { q: 'Vì sao hình thức đẻ con và nuôi con bằng sữa được xem là tiến hoá nhất?', a: 'Phôi phát triển trong cơ thể mẹ được cung cấp dinh dưỡng và bảo vệ an toàn khỏi môi trường. Sau khi sinh, con non còn được nuôi bằng sữa giàu dưỡng chất. Nhờ đó tỉ lệ con sống sót rất cao, đảm bảo duy trì nòi giống tốt nhất.' },
    ],
  },

  'H11SINH-w33-quiz': {
    topic: 'Cơ chế điều hoà sinh sản và biện pháp tránh thai',
    intro: 'Sinh sản ở người được điều hoà tinh vi bởi hormone. Các em sẽ hiểu cơ chế đó và cơ sở khoa học của các biện pháp tránh thai, sinh đẻ có kế hoạch.',
    objectives: [
      'Trình bày được cơ chế điều hoà sinh sản bằng hormone.',
      'Nêu được cơ sở khoa học của các biện pháp tránh thai.',
      'Hiểu được ý nghĩa của sinh đẻ có kế hoạch.',
    ],
    theory: [
      { h: 'Điều hoà sinh sản bằng hormone' },
      { p: 'Quá trình sinh sản được điều hoà bởi hệ hormone từ vùng dưới đồi, tuyến yên và tuyến sinh dục. Các hormone phối hợp điều khiển sự sinh tinh, sinh trứng và chu kì kinh nguyệt ở nữ.' },
      { h: 'Chu kì kinh nguyệt' },
      { p: 'Ở nữ, hormone tuyến yên (FSH, LH) và hormone buồng trứng (estrogen, progesterone) phối hợp tạo chu kì kinh nguyệt, trong đó có giai đoạn trứng chín và rụng. Cơ chế liên hệ ngược điều chỉnh nồng độ các hormone.' },
      { h: 'Cơ sở các biện pháp tránh thai' },
      { ul: ['Ngăn trứng chín và rụng: thuốc tránh thai chứa hormone', 'Ngăn tinh trùng gặp trứng: bao cao su, đặt vòng', 'Mỗi biện pháp tác động vào một khâu của quá trình thụ thai'] },
      { h: 'Sinh đẻ có kế hoạch' },
      { p: 'Sinh đẻ có kế hoạch giúp điều chỉnh số con và khoảng cách sinh con phù hợp, bảo vệ sức khoẻ bà mẹ và trẻ em, nâng cao chất lượng cuộc sống và ổn định dân số.' },
      { note: 'Hiểu cơ chế sinh sản giúp các em có kiến thức bảo vệ sức khoẻ sinh sản và sống có trách nhiệm.' },
    ],
    examples: [
      { q: 'Vì sao thuốc tránh thai chứa hormone lại có thể ngăn quá trình thụ thai?', a: 'Thuốc chứa hormone duy trì nồng độ estrogen và progesterone cao, theo cơ chế liên hệ ngược ức chế tuyến yên tiết FSH và LH. Nhờ đó trứng không chín và không rụng, nên không thể thụ thai.' },
      { q: 'Vì sao sinh đẻ có kế hoạch lại có lợi cho cả gia đình và xã hội?', a: 'Với gia đình, nó giúp bảo vệ sức khoẻ người mẹ, nuôi dạy con tốt hơn, cải thiện kinh tế. Với xã hội, nó góp phần ổn định dân số, giảm áp lực lên y tế, giáo dục và nâng cao chất lượng dân số.' },
    ],
  },

  'H11SINH-w34-quiz': {
    topic: 'Ứng dụng sinh học và ngành nghề liên quan',
    intro: 'Kiến thức Sinh học 11 không chỉ để thi mà mở ra nhiều nghề nghiệp và ứng dụng trong đời sống. Các em sẽ thấy Sinh học gắn với nông nghiệp, y học và công nghệ ra sao.',
    objectives: [
      'Nêu được một số ứng dụng của Sinh học cơ thể trong thực tiễn.',
      'Kể được một số ngành nghề liên quan đến Sinh học.',
      'Liên hệ kiến thức đã học với định hướng nghề nghiệp.',
    ],
    theory: [
      { h: 'Ứng dụng trong nông nghiệp' },
      { ul: ['Điều khiển quang hợp, dinh dưỡng để tăng năng suất cây trồng', 'Nhân giống bằng nuôi cấy mô, ghép, chiết cành', 'Dùng hormone điều khiển ra hoa, đậu quả, bảo quản nông sản'] },
      { h: 'Ứng dụng trong chăn nuôi và y học' },
      { p: 'Hiểu sinh sản và sinh trưởng động vật giúp lai tạo, thụ tinh nhân tạo, nâng cao chất lượng vật nuôi. Trong y học, kiến thức về tuần hoàn, bài tiết, nội tiết là nền tảng chẩn đoán và điều trị bệnh.' },
      { h: 'Một số ngành nghề' },
      { ul: ['Bác sĩ, dược sĩ, kỹ thuật viên xét nghiệm', 'Kỹ sư nông nghiệp, công nghệ sinh học, thú y', 'Nghiên cứu viên, giáo viên Sinh học, chuyên gia môi trường'] },
      { h: 'Định hướng nghề nghiệp' },
      { p: 'Các em nên kết nối những gì đã học với sở thích và năng lực bản thân để chọn hướng đi. Sinh học là nền tảng của nhiều ngành đang phát triển như công nghệ sinh học, y sinh, nông nghiệp công nghệ cao.' },
      { note: 'Công nghệ sinh học hiện đại như nuôi cấy mô, kỹ thuật gene đang mở ra rất nhiều cơ hội nghề nghiệp.' },
    ],
    examples: [
      { q: 'Kiến thức về hormone thực vật được vận dụng vào những công việc nông nghiệp nào?', a: 'Người ta dùng auxin để kích thích ra rễ cành giâm, gibberellin để phá ngủ hạt và làm quả to, điều khiển quang chu kì để cây ra hoa trái vụ. Đó là ứng dụng trực tiếp của hormone trong sản xuất nông nghiệp.' },
      { q: 'Một bạn yêu thích chăm sóc cây và muốn làm việc với nông nghiệp công nghệ cao nên định hướng học ngành nào?', a: 'Bạn đó có thể hướng tới ngành nông học, công nghệ sinh học hoặc kỹ thuật nông nghiệp. Các ngành này vận dụng kiến thức quang hợp, dinh dưỡng, hormone và nhân giống để tạo giống tốt và canh tác hiệu quả.' },
    ],
  },

  'H11SINH-w35-quiz': {
    topic: 'Thi học kỳ — Tổng ôn cả năm Sinh 11',
    intro: 'Các em đã đi trọn hành trình Sinh học cơ thể: chuyển hoá, cảm ứng, sinh trưởng - phát triển và sinh sản. Bài tổng ôn này kết nối toàn bộ kiến thức để các em tự tin bước vào kì thi.',
    objectives: [
      'Hệ thống hoá kiến thức Sinh học 11 theo bốn chủ đề lớn.',
      'Liên hệ được mối quan hệ giữa các quá trình sống của cơ thể.',
      'Vận dụng kiến thức tổng hợp giải thích hiện tượng thực tiễn.',
    ],
    theory: [
      { h: 'Chủ đề 1: Chuyển hoá vật chất và năng lượng' },
      { p: 'Ở thực vật gồm trao đổi nước - khoáng, quang hợp, hô hấp; ở động vật gồm tiêu hoá, hô hấp, tuần hoàn, bài tiết, cân bằng nội môi. Tất cả nhằm cung cấp vật chất và năng lượng cho cơ thể.' },
      { h: 'Chủ đề 2: Cảm ứng' },
      { ul: ['Thực vật: hướng động và ứng động', 'Động vật: hệ thần kinh, điện thế và synap, tập tính', 'Cảm ứng giúp cơ thể phản ứng và thích nghi với môi trường'] },
      { h: 'Chủ đề 3: Sinh trưởng và phát triển' },
      { p: 'Sinh trưởng là biến đổi về lượng, phát triển là biến đổi về chất. Ở thực vật có hormone và quang chu kì; ở động vật có phát triển qua hoặc không qua biến thái, chịu điều khiển của hormone.' },
      { h: 'Chủ đề 4: Sinh sản' },
      { p: 'Sinh sản vô tính tạo con giống mẹ, nhanh và giữ đặc tính; sinh sản hữu tính tạo đa dạng di truyền. Cả thực vật và động vật đều có cả hai hình thức, được điều hoà bằng hormone.' },
      { note: 'Bốn chủ đề là bốn đặc trưng của sự sống ở cấp cơ thể; hãy ôn theo mối liên hệ giữa chúng, không học rời rạc.' },
    ],
    examples: [
      { q: 'Hãy chỉ ra mối liên hệ giữa quang hợp, sinh trưởng và sinh sản trong vòng đời của một cây có hoa.', a: 'Quang hợp tạo chất hữu cơ và năng lượng giúp cây sinh trưởng to lớn. Khi đủ điều kiện về tuổi, ánh sáng, nhiệt độ, cây chuyển sang phát triển ra hoa rồi sinh sản tạo hạt. Như vậy chuyển hoá là nền tảng cho sinh trưởng và sinh sản.' },
      { q: 'Vì sao có thể nói cân bằng nội môi là điều kiện để mọi quá trình sống khác diễn ra bình thường?', a: 'Cân bằng nội môi giữ ổn định nồng độ chất, pH, nhiệt độ của môi trường trong. Nhờ đó enzyme và tế bào hoạt động bình thường, làm nền cho chuyển hoá, cảm ứng, sinh trưởng và sinh sản. Mất cân bằng nội môi, mọi quá trình sống đều rối loạn.' },
    ],
  },

  'H11SINH-w36-quiz': {
    topic: 'Kết thúc Sinh Học 11 — Sự sống ở cấp cơ thể và bước ngoặt lớp 12',
    intro: 'Sinh Học 11 đã dẫn chúng ta đi sâu vào sự sống ở cấp độ cơ thể — từ cách thực vật hấp thu ánh sáng đến cách hệ thần kinh động vật xử lý thông tin. Hôm nay chúng ta nhìn lại toàn bộ hành trình và chuẩn bị cho chương trình lớp 12 đầy thú vị về di truyền và tiến hoá.',
    objectives: [
      'Hệ thống hoá 4 chủ đề lớn của Sinh Học 11: chuyển hoá, cảm ứng, sinh trưởng-phát triển, sinh sản.',
      'Kết nối kiến thức sinh học cơ thể với ứng dụng thực tiễn trong y học và nông nghiệp.',
      'Nắm định hướng học tập cho Sinh Học 12 — di truyền học và tiến hoá sinh học.',
    ],
    theory: [
      { h: 'Bốn chủ đề lớn của năm học' },
      { ul: [
        'Chuyển hoá vật chất và năng lượng: quang hợp (thực vật), hô hấp tế bào, tiêu hoá, hô hấp, tuần hoàn, bài tiết (động vật), cân bằng nội môi.',
        'Cảm ứng: hướng động/ứng động (thực vật); phản xạ, điện thế hoạt động, synap, tập tính (động vật).',
        'Sinh trưởng và phát triển: hormone thực vật (auxin, gibberellin, cytokinin, ABA, ethylene); biến thái hoàn toàn/không hoàn toàn, hormone sinh trưởng động vật.',
        'Sinh sản: vô tính (nảy chồi, phân mảnh, sinh sản sinh dưỡng) và hữu tính — ưu thế từng dạng.',
      ] },
      { h: 'Ứng dụng sinh học 11 trong cuộc sống' },
      { ul: [
        'Quang hợp → nông nghiệp: chọn giống cây trồng quang hợp hiệu quả cao; kĩ thuật trồng cây trong nhà kính.',
        'Hormone thực vật → công nghệ sau thu hoạch: ethylene kích chín trái cây; gibberellin kéo dài thời gian tươi của rau.',
        'Cảm ứng thần kinh → y học: hiểu cơ chế bệnh Parkinson, Alzheimer; thuốc tác động lên synap.',
        'Sinh sản vô tính → nhân giống: nuôi cấy mô tế bào thực vật — nhân giống cây quý hiếm hàng loạt.',
      ] },
      { h: 'Sinh Học 12 — hành trình kế tiếp' },
      { ul: [
        'Di truyền phân tử: AND, ARN, protein; nhân đôi, phiên mã, dịch mã — "trái tim" của sinh học hiện đại.',
        'Di truyền Mendel và biến dị: quy luật Mendel, liên kết gen, hoán vị gen, di truyền giới tính.',
        'Tiến hoá: chứng cứ tiến hoá, cơ chế tiến hoá Darwin, thuyết tiến hoá tổng hợp hiện đại.',
        'Sinh thái học: quần thể, quần xã, hệ sinh thái, chu trình vật chất và năng lượng, bảo vệ môi trường.',
      ] },
      { note: 'Sinh học là môn khoa học của sự sống — và sự sống thật sự hấp dẫn hơn bất kỳ cuốn sách nào. Hè này hãy quan sát cây cối quanh nhà: chúng đang quang hợp, vận chuyển nước, ra hoa và kết quả — tất cả đều là Sinh Học 11 đang diễn ra trước mắt em.' },
    ],
    examples: [
      { q: 'Làm thế nào để phân biệt hormone thực vật kích thích và ức chế khi ôn thi?', a: 'Cách nhớ đơn giản: Hai hormone KÍCH THÍCH tăng trưởng là auxin (kéo dài tế bào) và gibberellin (kéo dài chồi, phá miên trạng). Cytokinin kích thích phân chia tế bào. Hai hormone ỨC CHẾ là ABA (đóng khẩu, gây ngủ đông) và ethylene (kích chín, rụng lá). Để nhớ: "A và E ức chế, G và Aux kích thích, C là nhân đôi". Áp dụng: khi gặp đề hỏi về "rau tươi lâu hơn" → cần ức chế ethylene, tức bảo quản lạnh hoặc dùng 1-MCP.' },
      { q: 'Vì sao Sinh Học 12 lại được coi là quan trọng hơn Sinh Học 11 trong đề thi tốt nghiệp?', a: 'Đề thi tốt nghiệp THPT Quốc gia môn Sinh thường có cấu trúc: khoảng 60% câu hỏi về di truyền và tiến hoá (chương trình lớp 12) và 40% về sinh học cơ thể (lớp 11). Lý do di truyền chiếm tỉ trọng lớn hơn: nó có nhiều dạng bài toán phức tạp (xác suất di truyền, hoán vị gen, di truyền giới tính) đòi hỏi kỹ năng tính toán và suy luận cao. Tuy nhiên, không thể bỏ lớp 11 vì các câu lý thuyết về cơ thể thường không khó và giúp đảm bảo điểm nền tốt.' },
    ],
  },
};
