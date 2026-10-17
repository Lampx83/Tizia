const L = (topic, intro, objectives, theory, examples) => ({ topic, intro, objectives, theory, examples });

export const H10HDTN_LESSONS = {
  'H10HDTN-w01-quiz': L(
    'Khám phá tính cách bản thân',
    'Hiểu rõ tính cách giúp em định hướng nghề nghiệp và phát triển bản thân phù hợp.',
    ['Nhận biết khái niệm tính cách và các đặc điểm tính cách phổ biến.', 'Biết cách tự khám phá và đánh giá tính cách của bản thân.', 'Vận dụng hiểu biết về tính cách để định hướng phát triển.'],
    [
      { h: 'Tính cách là gì?' },
      { p: 'Tính cách là hệ thống đặc điểm tâm lí tương đối ổn định, thể hiện qua cách ta suy nghĩ, cảm nhận và hành động trong các tình huống khác nhau.' },
      { ul: ['Hướng nội (introvert): nạp năng lượng khi ở một mình, thích suy ngẫm.', 'Hướng ngoại (extrovert): nạp năng lượng từ giao tiếp xã hội, thích hoạt động nhóm.', 'Hai chiều hướng này là phổ liên tục, không phải hai cực đối lập tuyệt đối.'] },
      { h: 'Cách khám phá tính cách' },
      { p: 'Kết hợp tự quan sát hành vi hằng ngày, ghi nhật kí, trao đổi với người thân và làm các trắc nghiệm tham khảo (MBTI, Holland...) giúp ta hiểu bản thân khách quan hơn.' },
      { note: 'Tính cách không cố định mà có thể rèn luyện và phát triển theo thời gian.' },
    ],
    [
      { q: 'Tại sao hiểu tính cách lại quan trọng trong hướng nghiệp?', a: 'Biết điểm mạnh, điểm yếu và sở thích tính cách giúp chọn nghề phù hợp, làm việc hiệu quả và gắn bó lâu dài với nghề.' },
      { q: 'Phân biệt người hướng nội và hướng ngoại như thế nào?', a: 'Người hướng nội nạp lại năng lượng khi ở một mình hoặc nhóm nhỏ; người hướng ngoại nạp năng lượng từ giao tiếp đông người. Cả hai đều có thể thành công trong nhiều nghề nghiệp.' },
    ]
  ),

  'H10HDTN-w02-quiz': L(
    'Giá trị và sở thích của bản thân',
    'Giá trị sống và sở thích là kim chỉ nam giúp em lựa chọn nghề nghiệp và lối sống phù hợp.',
    ['Xác định được các giá trị sống cá nhân.', 'Phân biệt sở thích và năng lực nghề nghiệp.', 'Biết cách khám phá sở thích qua trải nghiệm thực tế.'],
    [
      { h: 'Giá trị sống cá nhân' },
      { p: 'Giá trị sống là những điều ta cho là quan trọng và có ý nghĩa: trung thực, sáng tạo, gia đình, cộng đồng, thành công... Chúng định hướng các quyết định lớn trong cuộc sống.' },
      { h: 'Sở thích và năng lực' },
      { p: 'Sở thích là điều ta yêu thích làm; năng lực là điều ta làm tốt. Nghề lí tưởng thường là giao điểm của sở thích, năng lực và nhu cầu xã hội.' },
      { ul: ['Tham gia câu lạc bộ, hoạt động đa dạng để khám phá sở thích.', 'Quan sát phản ứng của bản thân: điều gì khiến em say mê và quên thời gian?', 'Nhờ người thân, thầy cô nhận xét về điểm mạnh của em.'] },
      { note: 'Nghề phù hợp giá trị sống giúp ta thấy ý nghĩa trong công việc và bền bỉ hơn.' },
    ],
    [
      { q: 'Vì sao cần xác định giá trị sống trước khi chọn nghề?', a: 'Nghề phù hợp với điều mình coi trọng giúp ta có động lực bền vững, không bị áp lực bởi sự bất đồng giữa công việc và quan điểm sống.' },
      { q: 'Nếu thích vẽ nhưng chưa giỏi, em có nên theo nghề thiết kế không?', a: 'Nên cân nhắc: sở thích là động lực học hỏi, năng lực có thể rèn luyện. Nếu đam mê đủ lớn và sẵn sàng nỗ lực, đây là lựa chọn đáng khám phá.' },
    ]
  ),

  'H10HDTN-w03-quiz': L(
    'Quản lí cảm xúc của bản thân',
    'Quản lí cảm xúc tốt giúp em học tập hiệu quả hơn và duy trì các mối quan hệ lành mạnh.',
    ['Hiểu khái niệm và tầm quan trọng của quản lí cảm xúc.', 'Nhận biết và gọi tên các cảm xúc của bản thân.', 'Biết cách điều chỉnh cảm xúc phù hợp trong các tình huống.'],
    [
      { h: 'Quản lí cảm xúc là gì?' },
      { p: 'Quản lí cảm xúc là khả năng nhận diện, hiểu nguyên nhân và điều chỉnh cảm xúc để hành xử phù hợp. Đây không phải là kìm nén mà là điều tiết có ý thức.' },
      { h: 'Các bước quản lí cảm xúc' },
      { ul: ['Nhận diện: Gọi tên cảm xúc đang có (tức giận, lo lắng, buồn...).', 'Hiểu nguyên nhân: Điều gì dẫn đến cảm xúc này?', 'Điều chỉnh: Hít thở sâu, tạm dừng, vận động nhẹ hoặc viết nhật kí.', 'Phản hồi: Chọn cách ứng xử phù hợp sau khi bình tĩnh.'] },
      { note: 'Ghi nhật kí cảm xúc giúp ta theo dõi và hiểu rõ các yếu tố tác động đến tâm trạng.' },
    ],
    [
      { q: 'Tại sao kìm nén cảm xúc lâu dài lại có hại?', a: 'Kìm nén không giải quyết được nguyên nhân gốc rễ, dễ tích tụ và bùng phát mạnh hơn, ảnh hưởng đến sức khoẻ tâm lí và các mối quan hệ.' },
      { q: 'Làm thế nào để bình tĩnh khi đang rất tức giận?', a: 'Hít thở sâu (hít 4 giây, thở ra 6 giây), tạm rời khỏi tình huống, đếm đến 10 hoặc uống nước để hệ thần kinh dịu lại trước khi phản ứng.' },
    ]
  ),

  'H10HDTN-w04-quiz': L(
    'Ứng phó với căng thẳng',
    'Căng thẳng là phản ứng tự nhiên; biết ứng phó đúng cách giúp em vượt qua thử thách hiệu quả.',
    ['Hiểu khái niệm và các dấu hiệu của căng thẳng.', 'Phân biệt căng thẳng tích cực và tiêu cực.', 'Áp dụng các biện pháp lành mạnh để ứng phó căng thẳng.'],
    [
      { h: 'Căng thẳng và tác động' },
      { p: 'Căng thẳng (stress) là phản ứng của cơ thể và tâm lí trước áp lực hoặc thử thách. Mức độ vừa phải có thể tạo động lực; kéo dài hoặc quá mức sẽ gây hại sức khoẻ.' },
      { ul: ['Dấu hiệu thể chất: mất ngủ, đau đầu, mệt mỏi, ăn uống thất thường.', 'Dấu hiệu tâm lí: cáu gắt, khó tập trung, lo lắng, trống rỗng.', 'Dấu hiệu hành vi: bỏ bê việc học, thu mình lại, tìm đến game/mạng xã hội quá mức.'] },
      { h: 'Biện pháp ứng phó lành mạnh' },
      { ul: ['Vận động thể chất: đi bộ, thể dục, thể thao 30 phút mỗi ngày.', 'Chia sẻ với người tin cậy: bạn bè, thầy cô, cha mẹ.', 'Lập kế hoạch và chia nhỏ nhiệm vụ để giảm cảm giác quá tải.', 'Nghỉ ngơi hợp lí: ngủ đủ giấc, giải trí lành mạnh.'] },
      { note: 'Tìm đến chuyên gia tâm lí khi căng thẳng vượt khả năng tự xử lí là điều bình thường và dũng cảm.' },
    ],
    [
      { q: 'Vì sao áp lực thi cử không phải lúc nào cũng có hại?', a: 'Áp lực vừa phải kích thích não bộ hoạt động tốt hơn, tăng sự tập trung và động lực học tập. Vấn đề chỉ xảy ra khi áp lực kéo dài hoặc vượt ngưỡng chịu đựng.' },
      { q: 'Bạn em đang căng thẳng nặng vì kì thi, em có thể giúp gì?', a: 'Lắng nghe và đồng cảm, không phán xét. Đề xuất cùng vận động, giúp lập kế hoạch ôn tập, hoặc khuyến khích bạn chia sẻ với thầy cô nếu cần.' },
    ]
  ),

  'H10HDTN-w05-quiz': L(
    'Tự chủ và tự lập',
    'Tự chủ và tự lập là nền tảng để em chủ động điều hướng cuộc sống và chuẩn bị cho tương lai.',
    ['Hiểu khái niệm tự chủ và tự lập.', 'Nhận biết biểu hiện của tự chủ trong học tập và cuộc sống.', 'Rèn luyện tính tự lập phù hợp với lứa tuổi.'],
    [
      { h: 'Tự chủ và tự lập' },
      { p: 'Tự chủ là khả năng làm chủ suy nghĩ, cảm xúc và hành vi của bản thân. Tự lập là chủ động lo liệu công việc cá nhân mà không cần phụ thuộc vào người khác.' },
      { h: 'Biểu hiện của tự chủ, tự lập' },
      { ul: ['Tự chuẩn bị đồ dùng học tập, sắp xếp thời gian biểu.', 'Tự đặt mục tiêu học tập và theo dõi tiến độ.', 'Kiểm soát thời gian sử dụng mạng xã hội và thiết bị điện tử.', 'Tự quyết định các việc nhỏ trong khả năng mà không cần nhờ người khác.'] },
      { note: 'Tự lập không có nghĩa là làm mọi thứ một mình — biết khi nào cần hỗ trợ cũng là một kĩ năng quan trọng.' },
    ],
    [
      { q: 'Tự chủ trong học tập thể hiện như thế nào?', a: 'Tự lập kế hoạch, tự học không cần giám sát, tự kiểm tra kết quả và điều chỉnh phương pháp khi chưa hiệu quả.' },
      { q: 'Tại sao rèn tính tự lập từ sớm lại quan trọng?', a: 'Tự lập giúp ta quen với trách nhiệm, tự tin hơn khi đối mặt với thử thách mới và không bị lúng túng khi sống xa gia đình hay bước vào môi trường làm việc.' },
    ]
  ),

  'H10HDTN-w06-quiz': L(
    'Quản lí tài chính cá nhân',
    'Biết quản lí tiền bạc từ sớm giúp em hình thành thói quen tài chính lành mạnh cho tương lai.',
    ['Hiểu tầm quan trọng của quản lí tài chính cá nhân.', 'Phân biệt nhu cầu thiết yếu và mong muốn.', 'Lập kế hoạch chi tiêu và tiết kiệm đơn giản.'],
    [
      { h: 'Tại sao cần quản lí tài chính?' },
      { p: 'Quản lí tài chính là biết lập kế hoạch thu chi, tiết kiệm và sử dụng tiền có mục đích. Thói quen này hình thành từ nhỏ sẽ giúp ta chủ động về tài chính suốt cuộc đời.' },
      { h: 'Phân biệt nhu cầu và mong muốn' },
      { ul: ['Nhu cầu thiết yếu: ăn uống đủ chất, đồ dùng học tập, trang phục cơ bản.', 'Mong muốn: giày hàng hiệu, điện thoại đời mới, đồ ăn vặt, giải trí.', 'Ưu tiên nhu cầu thiết yếu trước khi chi cho mong muốn.'] },
      { h: 'Quy tắc phân bổ đơn giản' },
      { p: 'Phân bổ tiền tiêu vặt theo tỉ lệ: 50% cho nhu cầu thiết yếu, 30% cho mong muốn, 20% tiết kiệm hoặc mục tiêu cụ thể.' },
      { note: 'Tiết kiệm đều đặn dù số nhỏ tốt hơn chờ dư nhiều mới tiết kiệm.' },
    ],
    [
      { q: 'Lập ngân sách chi tiêu giúp ích gì cho học sinh?', a: 'Giúp kiểm soát chi tiêu, tránh thiếu hụt giữa tháng, biết rõ tiền đi đâu và tích luỹ được cho mục tiêu như mua sách hay tham gia câu lạc bộ.' },
      { q: 'Nếu muốn mua một món đồ nhưng chưa đủ tiền, em nên làm gì?', a: 'Đặt mục tiêu tiết kiệm cụ thể, tính thời gian đạt được và trích dần từ tiền tiêu vặt. Đây là cách rèn luyện tính kiên nhẫn và kĩ năng lập kế hoạch tài chính.' },
    ]
  ),

  'H10HDTN-w07-quiz': L(
    'Trách nhiệm với gia đình',
    'Chia sẻ trách nhiệm gia đình giúp em rèn luyện kĩ năng sống và gắn kết với người thân.',
    ['Xác định trách nhiệm của học sinh trong gia đình.', 'Biết cách thể hiện sự quan tâm đến các thành viên.', 'Giải quyết bất đồng trong gia đình một cách tôn trọng.'],
    [
      { h: 'Trách nhiệm của học sinh trong gia đình' },
      { ul: ['Học tập tốt là trách nhiệm chính, nhưng không loại trừ các trách nhiệm khác.', 'Tham gia việc nhà phù hợp lứa tuổi: dọn phòng, rửa bát, nấu ăn đơn giản.', 'Quan tâm, lắng nghe và hỏi han người thân.', 'Tôn trọng và giữ gìn hoà khí gia đình.'] },
      { h: 'Giải quyết bất đồng trong gia đình' },
      { p: 'Bất đồng quan điểm với cha mẹ là điều tự nhiên khi trưởng thành. Hãy bình tĩnh trình bày quan điểm, lắng nghe phía đối lập và cùng tìm tiếng nói chung.' },
      { note: 'Làm việc nhà rèn tính tự lập, trách nhiệm và nhiều kĩ năng sống thiết thực không có trong sách giáo khoa.' },
    ],
    [
      { q: 'Tại sao học sinh cần chia sẻ việc nhà dù đang bận học?', a: 'Chia sẻ việc nhà giúp giảm gánh nặng cho cha mẹ, rèn tính trách nhiệm và kĩ năng sống. Sắp xếp hợp lí thì việc nhà không ảnh hưởng nhiều đến học tập.' },
      { q: 'Khi bất đồng với cha mẹ về chọn nghề, em nên làm gì?', a: 'Bình tĩnh trình bày căn cứ và lí do của mình, lắng nghe lo ngại của cha mẹ, tìm kiếm thông tin thêm và cùng thảo luận để đi đến quyết định cân nhắc cả hai phía.' },
    ]
  ),

  'H10HDTN-w08-quiz': L(
    'Xây dựng và giữ gìn quan hệ bạn bè',
    'Tình bạn lành mạnh là nguồn hỗ trợ quý giá giúp em học tập tốt và phát triển nhân cách.',
    ['Hiểu nền tảng của một tình bạn đẹp.', 'Biết cách xây dựng và giữ gìn quan hệ bạn bè lành mạnh.', 'Ứng phó với áp lực nhóm và bạn bè rủ làm điều sai.'],
    [
      { h: 'Nền tảng tình bạn đẹp' },
      { ul: ['Tôn trọng sự khác biệt: không áp đặt quan điểm lên nhau.', 'Tin tưởng và chân thành: không nói xấu sau lưng, giữ bí mật được giao.', 'Hỗ trợ nhau tiến bộ: khích lệ lúc khó khăn, góp ý thẳng thắn khi sai.', 'Sẵn sàng hòa giải khi có hiểu lầm.'] },
      { h: 'Áp lực nhóm và cách ứng phó' },
      { p: 'Khi bạn bè rủ làm điều không đúng, hãy kiên định từ chối lịch sự và giải thích lí do. Tình bạn thực sự sẽ tôn trọng quyết định của em.' },
      { note: 'Chất lượng quan trọng hơn số lượng: một vài người bạn thực sự có giá trị hơn nhiều người quen biết.' },
    ],
    [
      { q: 'Khi xảy ra hiểu lầm với bạn thân, em nên ứng xử thế nào?', a: 'Chủ động gặp gỡ, nói chuyện thẳng thắn và bình tĩnh để làm rõ mọi chuyện. Tránh nói xấu sau lưng hoặc im lặng quá lâu khiến khoảng cách ngày càng lớn.' },
      { q: 'Làm thế nào để nhận biết mình có đang bị bạn bè lợi dụng?', a: 'Xem lại sự cân bằng trong mối quan hệ: nếu chỉ em cho đi mà không nhận lại, bạn chỉ liên hệ khi cần nhờ vả và không quan tâm đến cảm xúc của em thì đây là dấu hiệu đáng lo ngại.' },
    ]
  ),

  'H10HDTN-w09-quiz': L(
    'Ôn tập và đánh giá giữa kì I',
    'Nhìn lại quá trình rèn luyện giúp em nhận ra tiến bộ và điều chỉnh kế hoạch phát triển bản thân.',
    ['Hệ thống hoá kiến thức và kĩ năng đã học từ đầu năm.', 'Tự đánh giá sự tiến bộ về các kĩ năng sống cá nhân.', 'Xác định điểm cần cải thiện và điều chỉnh kế hoạch.'],
    [
      { h: 'Tổng kết mạch "hướng vào bản thân"' },
      { ul: ['Tính cách và giá trị sống: biết mình là ai, coi trọng điều gì.', 'Quản lí cảm xúc: nhận diện, hiểu và điều tiết cảm xúc phù hợp.', 'Ứng phó căng thẳng: nhận biết dấu hiệu và áp dụng biện pháp lành mạnh.', 'Tự chủ, tự lập: chủ động trong học tập và cuộc sống cá nhân.', 'Quản lí tài chính: lập kế hoạch chi tiêu và tiết kiệm hợp lí.'] },
      { h: 'Tổng kết mạch "hướng đến xã hội"' },
      { ul: ['Trách nhiệm gia đình: chia sẻ, quan tâm và giải quyết bất đồng tôn trọng.', 'Quan hệ bạn bè: xây dựng tình bạn lành mạnh, ứng phó áp lực nhóm.'] },
      { note: 'Tự đánh giá khách quan là bước đầu tiên để cải thiện. Hãy ghi nhận tiến bộ dù nhỏ.' },
    ],
    [
      { q: 'Mạch "hướng vào bản thân" và "hướng đến xã hội" khác nhau như thế nào?', a: 'Hướng vào bản thân tập trung vào hiểu và phát triển bản thân (tính cách, cảm xúc, tự chủ). Hướng đến xã hội tập trung vào trách nhiệm và quan hệ với người khác (gia đình, bạn bè, cộng đồng).' },
      { q: 'Em đã tiến bộ điều gì nhất từ đầu năm đến nay?', a: 'Câu trả lời tuỳ từng học sinh. Quan trọng là nhận ra sự tiến bộ cụ thể, dù nhỏ, và xác định một điểm cần cải thiện trong nửa năm còn lại.' },
    ]
  ),

  'H10HDTN-w10-quiz': L(
    'Kỉ luật tích cực và nội quy nhà trường',
    'Nội quy và kỉ luật tích cực là nền tảng tạo môi trường học tập an toàn, công bằng và phát triển.',
    ['Hiểu vai trò của nội quy nhà trường.', 'Phân biệt kỉ luật tích cực với trừng phạt.', 'Rèn luyện thói quen tự giác chấp hành kỉ luật.'],
    [
      { h: 'Vai trò của nội quy' },
      { p: 'Nội quy nhà trường tạo môi trường học tập kỉ cương, an toàn và công bằng cho tất cả học sinh. Đây là khung chuẩn mực chung để mọi người cùng phát triển.' },
      { h: 'Kỉ luật tích cực là gì?' },
      { p: 'Kỉ luật tích cực không phải trừng phạt mà là giúp người mắc lỗi nhận ra sai lầm, hiểu hậu quả và tự nguyện sửa chữa trong sự tôn trọng nhân phẩm.' },
      { ul: ['Trừng phạt: gây sợ hãi, không giải quyết nguyên nhân gốc rễ.', 'Kỉ luật tích cực: giúp người sai hiểu vì sao sai và muốn thay đổi.'] },
      { note: 'Tự giác chấp hành kỉ luật rèn tính tự chủ và ý thức công dân, không phải vì sợ bị phạt.' },
    ],
    [
      { q: 'Khi phát hiện nội quy nhà trường có điều chưa hợp lí, em nên làm gì?', a: 'Phản ánh qua kênh chính thống như hội đồng học sinh, góp ý với giáo viên chủ nhiệm hoặc Ban giám hiệu. Đây là cách tham gia xây dựng nhà trường có trách nhiệm.' },
      { q: 'Tại sao chấp hành nội quy tự giác tốt hơn chấp hành vì sợ bị phạt?', a: 'Tự giác xuất phát từ nhận thức và trách nhiệm, giúp ta duy trì hành vi đúng ngay cả khi không có ai giám sát. Sợ phạt chỉ ngăn hành vi bên ngoài, không thay đổi bên trong.' },
    ]
  ),

  'H10HDTN-w11-quiz': L(
    'Phát huy truyền thống nhà trường',
    'Tự hào và phát huy truyền thống nhà trường giúp em gắn bó với tập thể và có trách nhiệm hơn.',
    ['Hiểu truyền thống nhà trường bao gồm những gì.', 'Biết cách phát huy truyền thống qua hành động cụ thể.', 'Xây dựng ý thức tự hào và trách nhiệm với ngôi trường.'],
    [
      { h: 'Truyền thống nhà trường' },
      { p: 'Truyền thống nhà trường là tổng hoà lịch sử, giá trị giáo dục, thành tích và nét đẹp văn hoá được vun đắp qua nhiều thế hệ thầy và trò.' },
      { ul: ['Bề dày lịch sử và những thế hệ thầy trò đã đóng góp.', 'Thành tích học tập, thể thao, văn nghệ, nghiên cứu khoa học.', 'Các giá trị cốt lõi: hiếu học, đoàn kết, sáng tạo, trung thực.', 'Các phong tục, lễ hội, hoạt động truyền thống hằng năm.'] },
      { h: 'Phát huy truyền thống' },
      { p: 'Học tập tốt, rèn luyện đạo đức, tham gia hoạt động nhà trường và giữ gìn hình ảnh tốt đẹp khi ra ngoài là những cách thiết thực nhất.' },
      { note: 'Truyền thống không phải để thờ cúng mà để tiếp nối và phát triển cho phù hợp thời đại.' },
    ],
    [
      { q: 'Tìm hiểu lịch sử nhà trường mang lại lợi ích gì cho học sinh?', a: 'Giúp ta hiểu con đường mà nhà trường đã trải qua, tự hào hơn về môi trường mình đang học và có ý thức trách nhiệm trong việc tiếp nối truyền thống tốt đẹp.' },
      { q: 'Tham gia các hoạt động văn nghệ, thể thao của trường có phải là phát huy truyền thống không?', a: 'Có. Tham gia tích cực vào đời sống học đường góp phần duy trì tinh thần đoàn kết, năng động và sáng tạo — những giá trị cốt lõi của truyền thống nhà trường.' },
    ]
  ),

  'H10HDTN-w12-quiz': L(
    'Hoạt động cộng đồng và thiện nguyện',
    'Tham gia hoạt động cộng đồng giúp em phát triển kĩ năng xã hội và ý thức trách nhiệm công dân.',
    ['Hiểu ý nghĩa của hoạt động cộng đồng và thiện nguyện.', 'Biết cách tham gia và tổ chức hoạt động thiện nguyện hiệu quả.', 'Rèn luyện tinh thần phục vụ và ý thức trách nhiệm.'],
    [
      { h: 'Ý nghĩa của hoạt động cộng đồng' },
      { p: 'Hoạt động cộng đồng và thiện nguyện giúp ta đóng góp cho xã hội, đồng thời phát triển kĩ năng lãnh đạo, làm việc nhóm, giao tiếp và sự đồng cảm.' },
      { ul: ['Hỗ trợ người có hoàn cảnh khó khăn: trẻ em, người già, người khuyết tật.', 'Bảo vệ môi trường: dọn dẹp, trồng cây, tuyên truyền.', 'Chia sẻ kiến thức: dạy học miễn phí, hỗ trợ bạn học kém.', 'Tham gia các phong trào, câu lạc bộ thiện nguyện.'] },
      { h: 'Tham gia thiện nguyện hiệu quả' },
      { p: 'Chọn hoạt động phù hợp với sở thích và khả năng, lập kế hoạch rõ ràng, phối hợp tốt với nhóm và đánh giá kết quả sau mỗi hoạt động.' },
      { note: 'Thiện nguyện không cần phải hoành tráng — những hành động nhỏ hằng ngày cũng có ý nghĩa to lớn.' },
    ],
    [
      { q: 'Tại sao thiện nguyện lại có lợi cho chính người tham gia?', a: 'Thiện nguyện giúp mở rộng mạng lưới quan hệ, phát triển kĩ năng, nâng cao sự tự tin và mang lại cảm giác ý nghĩa, hạnh phúc khi đóng góp được cho người khác.' },
      { q: 'Để tổ chức một hoạt động thiện nguyện nhỏ tại trường, em cần chuẩn bị gì?', a: 'Xác định mục tiêu và đối tượng hỗ trợ, lập kế hoạch chi tiết, phân công nhiệm vụ trong nhóm, liên hệ các bên liên quan và chuẩn bị nguồn lực cần thiết.' },
    ]
  ),

  'H10HDTN-w13-quiz': L(
    'Văn hoá ứng xử nơi công cộng',
    'Ứng xử văn minh nơi công cộng thể hiện nhân cách và góp phần tạo môi trường xã hội tốt đẹp.',
    ['Hiểu các chuẩn mực ứng xử văn minh nơi công cộng.', 'Nhận biết hành vi thiếu văn hoá và hậu quả của chúng.', 'Thực hành ứng xử có văn hoá trong đời sống hằng ngày.'],
    [
      { h: 'Văn hoá công cộng là gì?' },
      { p: 'Văn hoá công cộng là tập hợp chuẩn mực ứng xử được thừa nhận trong không gian chung, nhằm đảm bảo sự tôn trọng lẫn nhau và môi trường sống dễ chịu.' },
      { ul: ['Không xả rác, giữ vệ sinh chung.', 'Giữ yên lặng ở những nơi cần thiết: thư viện, bệnh viện, rạp chiếu phim.', 'Xếp hàng trật tự, nhường chỗ người già, phụ nữ có thai.', 'Không sử dụng điện thoại quá mức khi đang giao tiếp.', 'Tôn trọng tài sản và không gian chung.'] },
      { h: 'Ứng xử trên không gian mạng' },
      { p: 'Không gian mạng cũng là không gian công cộng: tránh bình luận thô lỗ, chia sẻ tin giả, bắt nạt trực tuyến hay vi phạm quyền riêng tư của người khác.' },
      { note: 'Ứng xử văn minh không phải quy tắc cứng nhắc mà là biểu hiện của sự tôn trọng người khác.' },
    ],
    [
      { q: 'Vì sao ứng xử văn hoá nơi công cộng quan trọng?', a: 'Góp phần tạo môi trường sống dễ chịu cho mọi người, thể hiện sự tôn trọng cộng đồng và phản ánh nhân cách của bản thân.' },
      { q: 'Khi thấy người khác vi phạm nội quy nơi công cộng, em nên làm gì?', a: 'Tuỳ tình huống: nhắc nhở nhẹ nhàng nếu an toàn, báo cho người có trách nhiệm hoặc không làm theo. Quan trọng là bản thân mình luôn gương mẫu.' },
    ]
  ),

  'H10HDTN-w14-quiz': L(
    'Bảo vệ môi trường và cảnh quan thiên nhiên',
    'Bảo vệ môi trường là trách nhiệm của mỗi người để gìn giữ hành tinh cho các thế hệ tương lai.',
    ['Hiểu tầm quan trọng của bảo vệ môi trường.', 'Biết các hành động bảo vệ môi trường thiết thực trong cuộc sống.', 'Tuyên truyền và lan toả ý thức bảo vệ môi trường.'],
    [
      { h: 'Thực trạng môi trường hiện nay' },
      { p: 'Biến đổi khí hậu, ô nhiễm không khí, nước và đất, suy giảm đa dạng sinh học đang đặt ra thách thức lớn cho toàn nhân loại và cả Việt Nam.' },
      { h: 'Hành động bảo vệ môi trường' },
      { ul: ['Giảm rác thải: mang túi vải, dùng đồ dùng lâu bền, tái sử dụng.', 'Tiết kiệm điện, nước và tài nguyên.', 'Phân loại rác tại nguồn.', 'Tham gia trồng cây, dọn vệ sinh khu vực xung quanh.', 'Không xả rác ra sông, hồ, không đốt rác bừa bãi.'] },
      { h: 'Lan toả ý thức bảo vệ môi trường' },
      { p: 'Chia sẻ thông tin môi trường chính xác, vận động gia đình và bạn bè tham gia, tổ chức hoặc tham gia các hoạt động xanh tại trường và địa phương.' },
      { note: 'Mỗi người thay đổi một thói quen nhỏ là đóng góp lớn cho môi trường.' },
    ],
    [
      { q: 'Tại sao học sinh có thể đóng vai trò quan trọng trong bảo vệ môi trường?', a: 'Học sinh là thế hệ tương lai, có sức lan toả lớn trong cộng đồng và nhà trường. Thói quen xanh hình thành từ trẻ sẽ theo suốt cuộc đời và ảnh hưởng đến những người xung quanh.' },
      { q: 'Phân loại rác tại nguồn giúp ích gì cho môi trường?', a: 'Giảm lượng rác đến bãi chôn lấp, tăng tỉ lệ tái chế, giảm ô nhiễm đất và nước ngầm, đồng thời tiết kiệm tài nguyên và năng lượng trong sản xuất.' },
    ]
  ),

  'H10HDTN-w15-quiz': L(
    'Bảo tồn danh lam thắng cảnh và di sản',
    'Di sản văn hoá và thiên nhiên là tài sản chung của dân tộc và nhân loại cần được bảo vệ.',
    ['Hiểu khái niệm di sản văn hoá và thiên nhiên.', 'Biết tầm quan trọng của bảo tồn di sản.', 'Thực hành ứng xử văn minh khi tham quan di sản.'],
    [
      { h: 'Di sản văn hoá và thiên nhiên' },
      { p: 'Di sản là những giá trị vật thể (công trình, hiện vật) và phi vật thể (lễ hội, nghệ thuật, tri thức) được cha ông để lại, cùng với cảnh quan thiên nhiên độc đáo.' },
      { ul: ['Di sản văn hoá vật thể: chùa chiền, thành quách, di tích lịch sử.', 'Di sản văn hoá phi vật thể: dân ca, lễ hội, nghề truyền thống, ẩm thực.', 'Di sản thiên nhiên: vịnh Hạ Long, Phong Nha - Kẻ Bàng, rừng quốc gia.'] },
      { h: 'Ứng xử văn minh khi tham quan di sản' },
      { ul: ['Không khắc chữ, vẽ bậy, xả rác tại di tích.', 'Tuân thủ nội quy khu di tích.', 'Tôn trọng không gian tâm linh và người dân địa phương.', 'Mua sản phẩm địa phương để hỗ trợ kinh tế cộng đồng.'] },
      { note: 'Di sản bị huỷ hoại thường không thể phục hồi — bảo vệ ngay từ hôm nay.' },
    ],
    [
      { q: 'Tại sao bảo tồn di sản lại quan trọng với thế hệ trẻ?', a: 'Di sản là cầu nối giữa quá khứ và tương lai, giúp ta hiểu cội nguồn, bản sắc dân tộc và học hỏi từ kinh nghiệm của cha ông. Mất di sản là mất một phần căn cước văn hoá.' },
      { q: 'Khi thấy bạn khắc tên lên di tích, em nên làm gì?', a: 'Nhắc nhở bạn ngay lập tức vì đây là hành vi vi phạm pháp luật về bảo vệ di sản, có thể bị xử phạt. Giải thích hậu quả và ý nghĩa của việc bảo vệ di tích.' },
    ]
  ),

  'H10HDTN-w16-quiz': L(
    'Thế giới nghề nghiệp đa dạng',
    'Hiểu sự đa dạng của nghề nghiệp giúp em mở rộng tầm nhìn và khám phá các lựa chọn phù hợp.',
    ['Hiểu sự đa dạng của thế giới nghề nghiệp hiện đại.', 'Biết cách tìm hiểu thông tin về các nghề nghiệp.', 'Kết nối nghề nghiệp với sở thích và giá trị cá nhân.'],
    [
      { h: 'Thế giới nghề nghiệp hiện đại' },
      { p: 'Có hàng nghìn nghề khác nhau trên thế giới và mỗi năm lại xuất hiện thêm nhiều nghề mới, đặc biệt trong lĩnh vực công nghệ, sáng tạo và dịch vụ.' },
      { ul: ['Nghề truyền thống: nông nghiệp, thủ công, giảng dạy, y tế.', 'Nghề công nghệ: lập trình, trí tuệ nhân tạo, an ninh mạng, thiết kế số.', 'Nghề sáng tạo: thiết kế, phim ảnh, âm nhạc, nội dung số.', 'Nghề dịch vụ: du lịch, tài chính, logistics, chăm sóc sức khoẻ.', 'Nghề khoa học: nghiên cứu, môi trường, dược phẩm, vật lí.'] },
      { h: 'Cách tìm hiểu nghề nghiệp' },
      { p: 'Đọc sách, xem video, phỏng vấn người trong nghề, tham quan doanh nghiệp, tham gia ngày hội hướng nghiệp và thực hành qua câu lạc bộ, dự án.' },
      { note: 'Nghề phù hợp không chỉ là nghề em giỏi mà còn là nghề xã hội cần và em thấy ý nghĩa khi làm.' },
    ],
    [
      { q: 'Tại sao thế giới nghề nghiệp ngày càng đa dạng?', a: 'Công nghệ phát triển, nhu cầu xã hội thay đổi và sự phân công lao động ngày càng chuyên sâu tạo ra nhiều nghề mới, đặc biệt trong kỉ nguyên số.' },
      { q: 'Làm thế nào để tìm hiểu thực tế về một nghề mà em quan tâm?', a: 'Phỏng vấn người đang làm nghề đó (shadow interview), xin thực tập hoặc tham quan, xem video thực tế từ người trong nghề và đọc mô tả công việc cụ thể thay vì chỉ đọc giới thiệu chung chung.' },
    ]
  ),

  'H10HDTN-w17-quiz': L(
    'Nhóm nghề và đặc điểm nghề nghiệp',
    'Phân loại nghề theo nhóm giúp em định hướng tìm kiếm nghề phù hợp với tính cách và sở thích.',
    ['Biết cách phân loại nghề nghiệp theo nhóm.', 'Hiểu đặc điểm của từng nhóm nghề.', 'Kết nối nhóm nghề với tính cách và sở thích bản thân.'],
    [
      { h: 'Phân loại nghề theo lí thuyết Holland' },
      { p: 'Nhà tâm lí học Holland chia nghề thành 6 nhóm dựa trên tính cách và môi trường làm việc phù hợp.' },
      { ul: ['Thực tế (R): làm việc với máy móc, công cụ, thiên nhiên.', 'Điều tra (I): phân tích, nghiên cứu, tìm hiểu.', 'Nghệ thuật (A): sáng tạo, biểu đạt, thẩm mĩ.', 'Xã hội (S): giúp đỡ, dạy học, chăm sóc người khác.', 'Doanh nhân (E): lãnh đạo, thuyết phục, kinh doanh.', 'Thông thường (C): tổ chức, số liệu, quy trình.'] },
      { h: 'Ứng dụng trong hướng nghiệp' },
      { p: 'Xác định nhóm nghề phù hợp với mình là bước đầu thu hẹp phạm vi tìm kiếm. Nhiều người phù hợp với 2-3 nhóm, giúp mở ra nhiều lựa chọn nghề.' },
      { note: 'Phân nhóm Holland chỉ là công cụ tham khảo, không phải kết luận cuối cùng về nghề nghiệp của em.' },
    ],
    [
      { q: 'Bạn thích giảng dạy, tư vấn và chăm sóc người khác thuộc nhóm Holland nào?', a: 'Nhóm Xã hội (S). Các nghề phù hợp: giáo viên, tư vấn tâm lí, bác sĩ, y tá, nhân viên xã hội, hướng dẫn viên...' },
      { q: 'Tại sao nên tìm hiểu nhóm nghề thay vì chỉ tìm một nghề cụ thể?', a: 'Tìm hiểu nhóm nghề giúp ta hiểu đặc điểm chung và môi trường làm việc phù hợp, từ đó khám phá nhiều lựa chọn cụ thể hơn và không bỏ sót nghề phù hợp.' },
    ]
  ),

  'H10HDTN-w18-quiz': L(
    'Ôn tập và đánh giá cuối kì I',
    'Hệ thống lại toàn bộ kiến thức học kì I để chuẩn bị tốt cho học kì II và kế hoạch hướng nghiệp.',
    ['Hệ thống hoá kiến thức và kĩ năng học kì I.', 'Đánh giá mức độ hiểu biết về thế giới nghề nghiệp.', 'Xác định định hướng ban đầu cho hành trình hướng nghiệp.'],
    [
      { h: 'Tổng kết mạch "hướng đến tự nhiên"' },
      { ul: ['Bảo vệ môi trường: hành động thiết thực và lan toả ý thức.', 'Bảo tồn di sản: ứng xử văn minh và có trách nhiệm.'] },
      { h: 'Tổng kết mạch "hướng nghiệp"' },
      { ul: ['Thế giới nghề nghiệp đa dạng và không ngừng thay đổi.', 'Phân loại nghề theo nhóm Holland.', 'Kết nối tính cách, giá trị, sở thích với nhóm nghề phù hợp.'] },
      { h: 'Câu hỏi định hướng' },
      { p: 'Đến cuối học kì I, em đã có thể trả lời sơ bộ: Mình là người thế nào? Mình coi trọng điều gì? Mình thích và giỏi điều gì? Nghề nào có thể phù hợp với mình?' },
      { note: 'Hướng nghiệp là hành trình dài, không phải quyết định một lần. Quan trọng là bắt đầu khám phá nghiêm túc từ hôm nay.' },
    ],
    [
      { q: 'Sau học kì I, em đã khám phá được điều gì về bản thân liên quan đến hướng nghiệp?', a: 'Tuỳ từng học sinh. Quan trọng là kết nối được ít nhất một điểm mạnh/sở thích với một nhóm nghề và có kế hoạch tìm hiểu thêm trong học kì II.' },
      { q: 'Bốn mạch nội dung HĐTN-HN lớp 10 là gì?', a: 'Hướng vào bản thân (khám phá và phát triển bản thân), hướng đến xã hội (trách nhiệm và quan hệ), hướng đến tự nhiên (môi trường và di sản), và hướng nghiệp (tìm hiểu và định hướng nghề).' },
    ]
  ),

  'H10HDTN-w19-quiz': L(
    'Thị trường lao động',
    'Hiểu thị trường lao động giúp em lựa chọn nghề nghiệp có tương lai và chuẩn bị cạnh tranh hiệu quả.',
    ['Hiểu khái niệm và cơ cấu thị trường lao động.', 'Biết các yếu tố ảnh hưởng đến cung cầu lao động.', 'Xác định xu hướng nghề nghiệp có triển vọng.'],
    [
      { h: 'Thị trường lao động là gì?' },
      { p: 'Thị trường lao động là nơi cung (người lao động) và cầu (nhà tuyển dụng) gặp nhau. Cơ chế cung - cầu quyết định mức lương, cơ hội việc làm và yêu cầu tuyển dụng.' },
      { ul: ['Nghề "hot": nhiều nhu cầu nhưng ít nguồn cung — lương cao, dễ xin việc.', 'Nghề bão hoà: nhiều người muốn làm nhưng ít vị trí — cạnh tranh cao.', 'Nghề mới nổi: đang hình thành, cần sớm chuẩn bị.'] },
      { h: 'Yếu tố ảnh hưởng đến thị trường lao động' },
      { ul: ['Công nghệ và tự động hoá: nhiều nghề cũ biến mất, nghề mới xuất hiện.', 'Toàn cầu hoá: kết nối lao động quốc tế, cạnh tranh rộng hơn.', 'Dân số và cơ cấu xã hội: nhu cầu chăm sóc người già tăng.', 'Chính sách kinh tế và đào tạo của nhà nước.'] },
      { note: 'Nghề có lương cao hôm nay có thể thay đổi trong 10 năm tới — hãy chú ý xu hướng dài hạn.' },
    ],
    [
      { q: 'Tại sao cần nghiên cứu thị trường lao động trước khi chọn nghề?', a: 'Để tránh chọn nghề đã bão hoà hoặc sắp biến mất, và hướng đến các nghề có nhu cầu cao trong tương lai, tăng cơ hội việc làm và thu nhập tốt.' },
      { q: 'Công nghệ AI ảnh hưởng thế nào đến thị trường lao động trong 10 năm tới?', a: 'AI có thể thay thế các công việc lặp đi lặp lại, đồng thời tạo ra nghề mới liên quan đến phát triển, giám sát và ứng dụng AI. Kĩ năng sáng tạo, phân tích và giao tiếp của con người ngày càng có giá trị hơn.' },
    ]
  ),

  'H10HDTN-w20-quiz': L(
    'Xu hướng phát triển nghề nghiệp',
    'Nắm bắt xu hướng nghề nghiệp tương lai giúp em chuẩn bị đúng hướng từ hôm nay.',
    ['Nhận biết các xu hướng nghề nghiệp nổi bật trong tương lai.', 'Hiểu tác động của chuyển đổi số đến nghề nghiệp.', 'Xác định kĩ năng cần chuẩn bị cho tương lai.'],
    [
      { h: 'Xu hướng nghề nghiệp thế kỉ 21' },
      { ul: ['Kinh tế số và công nghệ thông tin: lập trình, AI, dữ liệu, an ninh mạng.', 'Y tế và chăm sóc sức khoẻ: đặc biệt khi dân số già hoá.', 'Năng lượng tái tạo: điện mặt trời, điện gió, hydrogen sạch.', 'Giáo dục trực tuyến và công nghệ học tập.', 'Thương mại điện tử và logistics.', 'Nghề sáng tạo nội dung số.'] },
      { h: 'Kĩ năng tương lai' },
      { p: 'Diễn đàn Kinh tế Thế giới (WEF) xác định các kĩ năng quan trọng nhất: tư duy phân tích, sáng tạo, trí tuệ cảm xúc, lãnh đạo và học tập suốt đời.' },
      { note: 'Không cần chọn ngay một nghề cụ thể — nhưng cần bắt đầu rèn luyện các kĩ năng nền tảng ngay từ bây giờ.' },
    ],
    [
      { q: 'Kĩ năng nào sẽ khó bị thay thế bởi máy móc và AI?', a: 'Kĩ năng sáng tạo, tư duy phê phán, trí tuệ cảm xúc, lãnh đạo và giao tiếp liên văn hoá — những kĩ năng đòi hỏi tính người mà máy móc khó tái tạo hoàn toàn.' },
      { q: 'Tại sao "học suốt đời" trở thành kĩ năng quan trọng hàng đầu?', a: 'Nghề nghiệp thay đổi nhanh — những gì học ở trường có thể lỗi thời sau 5-10 năm. Người biết liên tục học hỏi kĩ năng mới sẽ thích ứng tốt hơn với mọi thay đổi.' },
    ]
  ),

  'H10HDTN-w21-quiz': L(
    'Phẩm chất của người lao động',
    'Phẩm chất nghề nghiệp là nền tảng không thể thiếu bên cạnh kiến thức và kĩ năng chuyên môn.',
    ['Hiểu tầm quan trọng của phẩm chất trong nghề nghiệp.', 'Nhận biết các phẩm chất cốt lõi được nhà tuyển dụng đánh giá cao.', 'Bắt đầu rèn luyện phẩm chất ngay từ trong trường học.'],
    [
      { h: 'Phẩm chất nghề nghiệp là gì?' },
      { p: 'Phẩm chất nghề nghiệp là các đặc điểm tính cách, đạo đức và thái độ cần thiết để làm việc tốt và được tín nhiệm trong môi trường nghề nghiệp.' },
      { ul: ['Trung thực: không gian dối, không lấy cắp công sức người khác.', 'Trách nhiệm: hoàn thành công việc đúng hẹn, nhận trách nhiệm khi sai.', 'Chăm chỉ và kiên trì: không bỏ cuộc trước khó khăn.', 'Tinh thần học hỏi: cởi mở với cái mới, liên tục cải thiện.', 'Hợp tác: làm việc tốt trong nhóm, tôn trọng đồng nghiệp.', 'Đạo đức nghề nghiệp: tuân thủ quy tắc và giá trị của nghề.'] },
      { note: 'Nhà tuyển dụng thường coi phẩm chất ngang bằng hoặc thậm chí quan trọng hơn bằng cấp khi tuyển dụng.' },
    ],
    [
      { q: 'Tại sao trung thực là phẩm chất hàng đầu trong nghề nghiệp?', a: 'Trung thực xây dựng niềm tin — tài sản quan trọng nhất trong mọi mối quan hệ nghề nghiệp. Mất trung thực có thể mất cả sự nghiệp.' },
      { q: 'Làm thế nào để rèn phẩm chất trách nhiệm ngay trong trường học?', a: 'Nộp bài đúng hạn dù chưa hoàn hảo, nhận lỗi khi sai thay vì đổ lỗi, hoàn thành phần việc được giao trong nhóm và chủ động thông báo sớm khi gặp khó khăn.' },
    ]
  ),

  'H10HDTN-w22-quiz': L(
    'Năng lực của người lao động',
    'Năng lực toàn diện bao gồm cả kiến thức, kĩ năng chuyên môn và kĩ năng mềm.',
    ['Phân biệt kiến thức, kĩ năng chuyên môn và kĩ năng mềm.', 'Hiểu tầm quan trọng của năng lực toàn diện trong nghề nghiệp.', 'Lập kế hoạch phát triển năng lực cá nhân.'],
    [
      { h: 'Ba trụ cột năng lực' },
      { ul: ['Kiến thức (Knowledge): hiểu biết lí thuyết trong lĩnh vực chuyên môn.', 'Kĩ năng cứng (Hard skills): kĩ năng kĩ thuật cụ thể của nghề (lập trình, thiết kế, kế toán...).', 'Kĩ năng mềm (Soft skills): giao tiếp, làm việc nhóm, giải quyết vấn đề, quản lí thời gian.'] },
      { h: 'Tại sao kĩ năng mềm quan trọng?' },
      { p: 'Khảo sát của nhiều doanh nghiệp cho thấy đa số sa thải nhân viên vì vấn đề kĩ năng mềm (thái độ, giao tiếp, không hợp tác) chứ không phải vì thiếu chuyên môn.' },
      { ul: ['Giao tiếp hiệu quả.', 'Làm việc nhóm và lãnh đạo.', 'Tư duy phê phán và giải quyết vấn đề.', 'Quản lí thời gian và ưu tiên.', 'Khả năng thích ứng với thay đổi.'] },
      { note: 'Chuyên môn giỏi giúp em được nhận việc; kĩ năng mềm tốt giúp em thăng tiến và giữ được việc.' },
    ],
    [
      { q: 'Tại sao chỉ có bằng cấp tốt chưa đủ để thành công trong nghề nghiệp?', a: 'Bằng cấp chứng minh kiến thức học thuật, nhưng môi trường làm việc đòi hỏi thêm kĩ năng thực hành, phẩm chất và kĩ năng mềm — những thứ bằng cấp không thể phản ánh đầy đủ.' },
      { q: 'Em có thể rèn luyện kĩ năng giao tiếp và thuyết trình ở đâu trong cuộc sống học sinh?', a: 'Tham gia câu lạc bộ, phát biểu trong lớp, thuyết trình dự án nhóm, tổ chức sự kiện, tham gia hoạt động đội nhóm tình nguyện hay các cuộc thi tranh luận.' },
    ]
  ),

  'H10HDTN-w23-quiz': L(
    'Rèn luyện theo định hướng nghề',
    'Bắt đầu rèn luyện theo định hướng nghề từ lớp 10 giúp em tạo lợi thế cạnh tranh khi tốt nghiệp.',
    ['Hiểu cách rèn luyện để phù hợp với nhóm nghề định hướng.', 'Biết cách lập kế hoạch phát triển bản thân theo nghề.', 'Kết nối các hoạt động học tập và ngoại khoá với mục tiêu nghề nghiệp.'],
    [
      { h: 'Rèn luyện theo định hướng nghề' },
      { p: 'Biết mình hướng đến nhóm nghề nào giúp em lựa chọn có mục đích các hoạt động học tập, câu lạc bộ và trải nghiệm ngay từ hôm nay.' },
      { ul: ['Môn học liên quan: ưu tiên học tốt và đào sâu các môn liên quan đến nghề.', 'Câu lạc bộ và hoạt động: tham gia nhóm phù hợp định hướng nghề.', 'Đọc thêm: sách, bài viết, video về lĩnh vực quan tâm.', 'Thực hành: dự án nhỏ, tình nguyện, làm thêm phù hợp lứa tuổi.', 'Kết nối: tìm người mentor, tham gia diễn đàn chuyên môn.'] },
      { note: 'Rèn luyện nhất quán theo hướng nghề tạo ra hồ sơ cá nhân nổi bật và kĩ năng thực tế quý giá.' },
    ],
    [
      { q: 'Muốn theo nghề y, em nên chuẩn bị những gì từ lớp 10?', a: 'Học tốt Sinh, Hoá, Lí; rèn kĩ năng giao tiếp và đồng cảm; tham gia câu lạc bộ sơ cứu hoặc hoạt động thiện nguyện y tế; đọc thêm về y học và thực hành tiếng Anh chuyên ngành.' },
      { q: 'Làm thế nào để biết các hoạt động nào phù hợp với định hướng nghề của em?', a: 'Liệt kê kĩ năng và phẩm chất nghề cần, sau đó tìm các hoạt động có thể giúp rèn luyện những điều đó. Nói chuyện với người đang làm nghề để biết họ cần gì nhất khi mới vào nghề.' },
    ]
  ),

  'H10HDTN-w24-quiz': L(
    'Ôn tập và đánh giá giữa kì II',
    'Đánh giá tiến trình học kì II giúp em điều chỉnh kế hoạch để đạt mục tiêu trước cuối năm.',
    ['Hệ thống hoá kiến thức hướng nghiệp từ đầu học kì II.', 'Tự đánh giá mức độ hiểu biết về thị trường lao động và nghề nghiệp.', 'Điều chỉnh kế hoạch hướng nghiệp cho nửa học kì còn lại.'],
    [
      { h: 'Tổng kết tuần 19–23' },
      { ul: ['Thị trường lao động: cung — cầu lao động, xu hướng nghề nghiệp tương lai.', 'Phẩm chất và năng lực: ba trụ cột năng lực, kĩ năng mềm quan trọng.', 'Rèn luyện theo nghề: kết nối học tập và hoạt động với định hướng nghề.'] },
      { h: 'Câu hỏi tự đánh giá' },
      { ul: ['Em đã thu hẹp được định hướng nghề chưa?', 'Em đã tham gia hoạt động nào liên quan đến nghề định hướng?', 'Còn thiếu thông tin gì em cần tìm hiểu thêm?', 'Kế hoạch cho nửa học kì còn lại là gì?'] },
      { note: 'Hướng nghiệp không phải việc một mình — hãy chia sẻ suy nghĩ với thầy cô, cha mẹ và người trong nghề.' },
    ],
    [
      { q: 'Sau khi tìm hiểu phẩm chất và năng lực nghề nghiệp, em thấy mình cần rèn luyện thêm điều gì?', a: 'Tuỳ từng học sinh. Quan trọng là nhận ra 1-2 điểm cụ thể cần cải thiện và đặt ra hành động cụ thể để phát triển trong nửa học kì còn lại.' },
      { q: 'Tại sao phẩm chất và năng lực cần rèn luyện từ khi còn đi học?', a: 'Thói quen và nhân cách hình thành qua quá trình dài, không thể có được đột ngột. Bắt đầu rèn từ sớm cho phép ta mắc lỗi và học hỏi trong môi trường an toàn trước khi bước vào thị trường lao động.' },
    ]
  ),

  'H10HDTN-w25-quiz': L(
    'Tìm hiểu thông tin nghề nghiệp',
    'Biết cách tìm và đánh giá thông tin nghề nghiệp giúp em đưa ra quyết định hướng nghiệp sáng suốt.',
    ['Biết các nguồn thông tin nghề nghiệp đáng tin cậy.', 'Phát triển kĩ năng phân tích và đánh giá thông tin nghề nghiệp.', 'Tổng hợp thông tin để đưa ra quyết định hướng nghiệp sơ bộ.'],
    [
      { h: 'Nguồn thông tin nghề nghiệp' },
      { ul: ['Ngày hội hướng nghiệp, triển lãm nghề nghiệp.', 'Phỏng vấn trực tiếp người đang làm nghề.', 'Trang web chính thống của trường đào tạo và doanh nghiệp.', 'Video thực tế từ người trong nghề (YouTube, podcast).', 'Thầy cô tư vấn hướng nghiệp và cựu học sinh.', 'Sách và tài liệu giới thiệu nghề nghiệp.'] },
      { h: 'Đánh giá thông tin nghề nghiệp' },
      { p: 'Không phải thông tin nào cũng chính xác. Hãy kiểm tra nguồn, so sánh nhiều nguồn và tìm hiểu từ người thực tế đang làm nghề.' },
      { ul: ['Hỏi: Thu nhập thực tế sau 5 năm là bao nhiêu? (không chỉ mức lương quảng cáo)', 'Hỏi: Thực tế công việc hằng ngày là gì? Áp lực thế nào?', 'Hỏi: Những khó khăn không ai kể khi bắt đầu nghề?'] },
      { note: 'Tìm kiếm thông tin từ người thực tế đang làm nghề (informational interview) là cách hiệu quả nhất.' },
    ],
    [
      { q: 'Tại sao không nên chỉ dựa vào một nguồn thông tin khi tìm hiểu nghề?', a: 'Mỗi nguồn có góc nhìn và lợi ích riêng. Trường đào tạo có thể quảng cáo nghề hấp dẫn hơn thực tế; người trong nghề có thể có trải nghiệm cá nhân không đại diện cho số đông.' },
      { q: 'Làm thế nào để có buổi phỏng vấn thông tin (informational interview) với người trong nghề?', a: 'Liên hệ qua LinkedIn, mạng xã hội hoặc nhờ thầy cô giới thiệu. Trình bày rõ mục đích là học hỏi, không phải xin việc; đặt câu hỏi chuẩn bị sẵn và cảm ơn sau buổi gặp.' },
    ]
  ),

  'H10HDTN-w26-quiz': L(
    'Tìm hiểu trường nghề và cơ sở đào tạo',
    'Hiểu rõ hệ thống đào tạo giúp em lựa chọn con đường học tập phù hợp sau THPT.',
    ['Biết các loại hình cơ sở đào tạo sau THPT.', 'Hiểu ưu điểm và đặc điểm của từng loại hình.', 'Biết cách tìm hiểu và so sánh các trường đào tạo.'],
    [
      { h: 'Hệ thống đào tạo sau THPT' },
      { ul: ['Đại học (ĐH): đào tạo 4-5 năm, cung cấp bằng cử nhân/kĩ sư.', 'Cao đẳng (CĐ): đào tạo 2-3 năm, thiên về thực hành.', 'Trung cấp nghề: đào tạo 1-2 năm, kĩ năng nghề cụ thể.', 'Trường nghề (Sơ cấp): đào tạo ngắn hạn, tập trung kĩ năng thực tế.', 'Học trực tuyến: linh hoạt, phù hợp để học thêm kĩ năng bổ trợ.'] },
      { h: 'Tiêu chí chọn trường' },
      { ul: ['Chất lượng đào tạo và uy tín trường.', 'Tỉ lệ sinh viên có việc làm sau tốt nghiệp.', 'Học phí và học bổng có thể nhận.', 'Vị trí địa lí và điều kiện kí túc xá.', 'Mối quan hệ với doanh nghiệp, cơ hội thực tập.'] },
      { note: 'Con đường học cao đẳng hay học nghề không kém giá trị hơn đại học — quan trọng là phù hợp với năng lực, sở thích và mục tiêu của em.' },
    ],
    [
      { q: 'Tại sao học nghề có thể là lựa chọn tốt với một số học sinh?', a: 'Học nghề giúp có việc làm sớm hơn, học phí thấp hơn, thực hành nhiều hơn và trong nhiều nghề kĩ thuật, thợ lành nghề được trả lương cao và có cơ hội thăng tiến tốt.' },
      { q: 'Cần xem xét yếu tố nào khi so sánh hai trường đào tạo cùng ngành?', a: 'Tỉ lệ sinh viên có việc làm sau 6 tháng tốt nghiệp, chất lượng giảng viên, chương trình thực hành và thực tập, mạng lưới doanh nghiệp đối tác và học phí tổng thể.' },
    ]
  ),

  'H10HDTN-w27-quiz': L(
    'Xây dựng kế hoạch học tập, rèn luyện',
    'Kế hoạch học tập rõ ràng giúp em tiến dần đến mục tiêu nghề nghiệp một cách có hệ thống.',
    ['Biết cách xây dựng kế hoạch học tập cá nhân hướng đến nghề.', 'Thiết lập mục tiêu học tập theo nguyên tắc SMART.', 'Theo dõi và điều chỉnh kế hoạch định kì.'],
    [
      { h: 'Mục tiêu SMART' },
      { p: 'Mục tiêu hiệu quả cần đáp ứng tiêu chí SMART: Specific (cụ thể), Measurable (đo được), Achievable (khả thi), Relevant (liên quan), Time-bound (có thời hạn).' },
      { h: 'Lập kế hoạch học tập' },
      { ul: ['Xác định môn học ưu tiên liên quan đến định hướng nghề.', 'Đặt mục tiêu học tập cụ thể cho từng kì, từng năm.', 'Lên kế hoạch hoạt động ngoài giờ học phù hợp.', 'Đăng kí và tham gia các khóa học bổ trợ nếu cần.', 'Định kì kiểm tra tiến độ và điều chỉnh.'] },
      { note: 'Kế hoạch là công cụ định hướng, không phải xiềng xích. Hãy linh hoạt điều chỉnh khi cần thiết.' },
    ],
    [
      { q: 'Cho ví dụ về một mục tiêu học tập theo tiêu chí SMART.', a: '"Đến cuối học kì II, điểm trung bình môn Toán của em sẽ đạt ít nhất 8.0, thông qua việc làm thêm 30 phút bài tập Toán mỗi ngày và tham gia nhóm học tập mỗi tuần một buổi."' },
      { q: 'Khi kế hoạch học tập bị gián đoạn vì lí do bất khả kháng, em nên làm gì?', a: 'Điều chỉnh kế hoạch thực tế hơn, không bỏ cuộc hoàn toàn. Xem lại ưu tiên, giảm mục tiêu nếu cần và bù đắp dần khi điều kiện cho phép.' },
    ]
  ),

  'H10HDTN-w28-quiz': L(
    'Quản lí thời gian và tự học',
    'Quản lí thời gian hiệu quả là kĩ năng then chốt giúp em cân bằng học tập và cuộc sống.',
    ['Hiểu tầm quan trọng của quản lí thời gian trong học tập.', 'Biết các phương pháp quản lí thời gian hiệu quả.', 'Phát triển thói quen tự học chủ động.'],
    [
      { h: 'Kẻ thù của thời gian' },
      { ul: ['Trì hoãn (procrastination): dời việc quan trọng sang ngày mai.', 'Mạng xã hội và điện thoại: kẻ đánh cắp thời gian vô hình.', 'Lịch học quá dày mà không có nghỉ ngơi.', 'Không biết ưu tiên: làm việc dễ trước, việc quan trọng sau.'] },
      { h: 'Phương pháp quản lí thời gian' },
      { ul: ['Kĩ thuật Pomodoro: làm 25 phút, nghỉ 5 phút, lặp lại.', 'Ma trận Eisenhower: ưu tiên việc quan trọng — khẩn cấp trước.', 'Lập thời gian biểu hằng ngày với giờ cụ thể.', 'Đặt giờ cố định để kiểm tra điện thoại, không xem liên tục.'] },
      { note: 'Không ai "không có thời gian" — mọi người đều có 24 giờ. Sự khác biệt nằm ở cách sử dụng thời gian.' },
    ],
    [
      { q: 'Kĩ thuật Pomodoro giúp ích gì cho việc học?', a: 'Chia nhỏ thời gian học thành các khối ngắn có nghỉ giải lao giúp duy trì tập trung cao độ, tránh mệt mỏi kéo dài và tạo cảm giác hoàn thành sau mỗi khối.' },
      { q: 'Làm thế nào để giảm sử dụng điện thoại trong giờ học?', a: 'Đặt điện thoại ở chế độ im lặng, úp màn hình xuống hoặc để ở phòng khác. Dùng ứng dụng chặn mạng xã hội trong giờ học và thưởng cho mình sau khi hoàn thành xong mục tiêu.' },
    ]
  ),

  'H10HDTN-w29-quiz': L(
    'Kĩ năng giao tiếp và làm việc nhóm',
    'Giao tiếp hiệu quả và làm việc nhóm tốt là kĩ năng nền tảng trong mọi nghề nghiệp.',
    ['Hiểu các nguyên tắc giao tiếp hiệu quả.', 'Biết cách đóng góp và hợp tác trong nhóm.', 'Giải quyết xung đột trong nhóm một cách tích cực.'],
    [
      { h: 'Giao tiếp hiệu quả' },
      { ul: ['Lắng nghe chủ động: chú tâm, không ngắt lời, phản hồi để xác nhận hiểu.', 'Diễn đạt rõ ràng: nói có cấu trúc, dùng ví dụ cụ thể.', 'Ngôn ngữ cơ thể: giao tiếp mắt, tư thế cởi mở, giọng điệu phù hợp.', 'Điều chỉnh theo đối tượng: cách nói với bạn bè khác với thầy cô hay sếp.'] },
      { h: 'Làm việc nhóm hiệu quả' },
      { ul: ['Phân công rõ vai trò và trách nhiệm từ đầu.', 'Lắng nghe và tôn trọng ý kiến của tất cả thành viên.', 'Giải quyết bất đồng bằng thảo luận, không bằng áp đặt.', 'Giao tiếp thường xuyên và cập nhật tiến độ.'] },
      { note: 'Nhóm không thất bại vì thiếu tài năng — nhóm thất bại vì giao tiếp kém và thiếu tin tưởng nhau.' },
    ],
    [
      { q: 'Lắng nghe chủ động khác với nghe thụ động như thế nào?', a: 'Lắng nghe chủ động là tập trung hoàn toàn, không nghĩ đến câu trả lời của mình, phản hồi bằng cách tóm tắt ý người nói và đặt câu hỏi làm rõ. Nghe thụ động là ngồi đó nhưng tâm trí ở chỗ khác.' },
      { q: 'Khi một thành viên nhóm không hoàn thành phần việc của mình, nhóm nên làm gì?', a: 'Trao đổi thẳng thắn và riêng tư với thành viên đó để tìm hiểu nguyên nhân. Nếu có khó khăn thì hỗ trợ; nếu không có trách nhiệm thì nhắc nhở và phân công lại với thời hạn rõ ràng.' },
    ]
  ),

  'H10HDTN-w30-quiz': L(
    'Trải nghiệm nghề nghiệp thực tế',
    'Trải nghiệm thực tế là cách học hỏi hiệu quả nhất về nghề nghiệp — không sách vở nào thay thế được.',
    ['Hiểu giá trị của trải nghiệm nghề nghiệp thực tế.', 'Biết các hình thức trải nghiệm phù hợp với học sinh THPT.', 'Biết cách tận dụng và rút kinh nghiệm từ trải nghiệm.'],
    [
      { h: 'Hình thức trải nghiệm nghề cho học sinh' },
      { ul: ['Tham quan doanh nghiệp, cơ sở sản xuất.', 'Ngày hội nghề nghiệp tại trường.', 'Phỏng vấn thông tin với người trong nghề.', 'Tình nguyện trong lĩnh vực quan tâm.', 'Dự án mini liên quan đến nghề (làm sản phẩm, viết bài, lập trình...).', 'Làm thêm bán thời gian phù hợp lứa tuổi.'] },
      { h: 'Tận dụng tối đa từ trải nghiệm' },
      { ul: ['Chuẩn bị câu hỏi trước khi đến.', 'Quan sát và ghi chép cụ thể, không chỉ lắng nghe.', 'Phản ánh: Em học được gì? Điều gì gây ngạc nhiên? Em có thực sự thích không?', 'Chia sẻ với thầy cô và bạn bè để củng cố bài học.'] },
      { note: 'Một buổi trải nghiệm thực tế có thể thay đổi hoàn toàn nhận thức của em về một nghề.' },
    ],
    [
      { q: 'Tại sao trải nghiệm thực tế lại quan trọng hơn chỉ đọc về nghề?', a: 'Thực tế cho ta thông tin trực tiếp về môi trường làm việc, áp lực nghề, văn hoá tổ chức và kĩ năng cần thiết — những thứ sách và website không thể truyền đạt đầy đủ.' },
      { q: 'Nếu sau khi trải nghiệm em thấy nghề không phù hợp như tưởng, đó có phải lãng phí không?', a: 'Hoàn toàn không — biết điều gì KHÔNG phù hợp với mình là thông tin vô giá giúp thu hẹp lựa chọn. Tốt hơn nhiều so với khám phá ra sau khi đã tốt nghiệp đại học.' },
    ]
  ),

  'H10HDTN-w31-quiz': L(
    'Lập hồ sơ và chuẩn bị nghề nghiệp',
    'Bắt đầu xây dựng hồ sơ cá nhân từ lớp 10 giúp em có nền tảng vững chắc cho tương lai.',
    ['Biết cách xây dựng hồ sơ học tập và hoạt động cá nhân.', 'Hiểu tầm quan trọng của hồ sơ trong xin học và xin việc.', 'Lên kế hoạch các hoạt động để làm phong phú hồ sơ.'],
    [
      { h: 'Hồ sơ cá nhân (Portfolio) là gì?' },
      { p: 'Hồ sơ cá nhân là bộ sưu tập có chọn lọc về thành tích, dự án, hoạt động và kĩ năng đã tích lũy — bằng chứng cụ thể về năng lực thực sự của em.' },
      { ul: ['Bằng cấp, chứng chỉ và kết quả học tập.', 'Dự án và sản phẩm đã làm (bài viết, sản phẩm thiết kế, code...).', 'Hoạt động ngoại khoá và vai trò đã đảm nhận.', 'Giải thưởng và thành tích nổi bật.', 'Hoạt động tình nguyện và cộng đồng.'] },
      { h: 'Bắt đầu xây dựng từ hôm nay' },
      { p: 'Tham gia các hoạt động có chủ đích, lưu giữ bằng chứng (ảnh, sản phẩm, giấy chứng nhận) và ghi lại những gì em học được từ mỗi trải nghiệm.' },
      { note: 'Hồ sơ tốt không cần hoành tráng — cần có chiều sâu và nhất quán với định hướng nghề.' },
    ],
    [
      { q: 'Tại sao nên bắt đầu xây dựng hồ sơ từ lớp 10 thay vì đợi đến lớp 12?', a: 'Có nhiều thời gian hơn để tích luỹ trải nghiệm đa dạng và có chiều sâu, sửa sai và thử lại, tham gia các cuộc thi và hoạt động lớn hơn.' },
      { q: 'Ngoài điểm số, em cần gì trong hồ sơ để nổi bật khi xin vào đại học?', a: 'Hoạt động ngoài giờ có ý nghĩa (không phải chỉ liệt kê), kĩ năng lãnh đạo và đóng góp cụ thể, dự án hay sản phẩm thực tế, và câu chuyện cá nhân nhất quán về định hướng và đam mê.' },
    ]
  ),

  'H10HDTN-w32-quiz': L(
    'Ra quyết định nghề nghiệp',
    'Quyết định nghề nghiệp là một trong những quyết định quan trọng nhất — cần có phương pháp khoa học.',
    ['Hiểu quy trình ra quyết định nghề nghiệp có căn cứ.', 'Biết cách cân nhắc các yếu tố khi ra quyết định.', 'Tránh các sai lầm phổ biến khi chọn nghề.'],
    [
      { h: 'Quy trình ra quyết định nghề nghiệp' },
      { ul: ['Tự hiểu: tính cách, giá trị, sở thích và năng lực của mình.', 'Tìm hiểu: nghề nghiệp, thị trường lao động, yêu cầu đào tạo.', 'So sánh: đặt các lựa chọn cạnh nhau và đánh giá theo tiêu chí.', 'Quyết định: chọn con đường phù hợp nhất, không nhất thiết "tốt nhất".', 'Kiểm tra: trải nghiệm thực tế và điều chỉnh nếu cần.'] },
      { h: 'Sai lầm phổ biến khi chọn nghề' },
      { ul: ['Chọn theo bạn bè hoặc áp lực cha mẹ mà không cân nhắc bản thân.', 'Chỉ chú ý đến lương mà bỏ qua sở thích và phẩm chất cần thiết.', 'Chọn nghề theo trào lưu mà không tìm hiểu kĩ thực tế.', 'Không thử nghiệm gì cả trước khi quyết định.'] },
      { note: 'Quyết định nghề nghiệp không phải cuối cùng — người trưởng thành đổi nghề nhiều lần là chuyện bình thường.' },
    ],
    [
      { q: 'Khi cha mẹ muốn em chọn một nghề nhưng em lại thích nghề khác, em nên làm gì?', a: 'Tìm hiểu căn nguyên lo ngại của cha mẹ, cung cấp thông tin thực tế về nghề em muốn theo, trình bày kế hoạch cụ thể và đề xuất thử nghiệm trước khi quyết định cuối cùng.' },
      { q: 'Làm thế nào để đánh giá khách quan hai lựa chọn nghề nghiệp?', a: 'Lập bảng tiêu chí quan trọng (sở thích, lương, cơ hội phát triển, yêu cầu đào tạo, tính phù hợp thị trường...) và cho điểm từng lựa chọn theo từng tiêu chí. So sánh kết quả cùng với phân tích định tính.' },
    ]
  ),

  'H10HDTN-w33-quiz': L(
    'Định hướng nghề nghiệp tương lai',
    'Định hướng rõ ràng giúp em tập trung nỗ lực và chuẩn bị tốt nhất cho giai đoạn tiếp theo.',
    ['Tổng hợp toàn bộ quá trình tìm hiểu hướng nghiệp trong năm học.', 'Xây dựng định hướng nghề nghiệp cá nhân có căn cứ.', 'Lập kế hoạch hành động cụ thể cho lớp 11 và 12.'],
    [
      { h: 'Định hướng nghề nghiệp là gì?' },
      { p: 'Định hướng nghề nghiệp không phải chọn một nghề dứt khoát mà là xác định vùng nghề phù hợp và con đường học tập để đến đó.' },
      { h: 'Xây dựng định hướng nghề nghiệp cá nhân' },
      { ul: ['Điểm mạnh và giá trị cốt lõi của em là gì?', 'Nhóm nghề phù hợp nhất với tính cách và sở thích của em?', 'Con đường đào tạo phù hợp: đại học, cao đẳng hay học nghề?', 'Các bước cụ thể cần thực hiện trong năm 11, 12.', 'Phương án dự phòng nếu kế hoạch chính không thực hiện được.'] },
      { note: 'Định hướng tốt nhất là có căn cứ, linh hoạt và được kiểm tra thực tế liên tục.' },
    ],
    [
      { q: 'Tại sao cần có phương án dự phòng trong kế hoạch nghề nghiệp?', a: 'Không ai kiểm soát được mọi biến số: kết quả thi, tình hình kinh tế, thay đổi thị trường lao động. Phương án dự phòng giúp ta không bị tê liệt khi kế hoạch chính không thực hiện được.' },
      { q: 'Định hướng nghề nghiệp của em sau một năm học HĐTN-HN là gì?', a: 'Tuỳ từng học sinh. Một định hướng tốt bao gồm: nhóm nghề quan tâm, lí do căn cứ vào tự hiểu bản thân, con đường đào tạo dự kiến và ít nhất một bước hành động cụ thể cho năm tới.' },
    ]
  ),

  'H10HDTN-w34-quiz': L(
    'Tổng kết hành trình trải nghiệm',
    'Nhìn lại hành trình cả năm học giúp em trân trọng sự tiến bộ và chuẩn bị cho năm học mới.',
    ['Tổng kết các hoạt động trải nghiệm trong năm học.', 'Nhận ra sự tiến bộ về kĩ năng và nhận thức.', 'Chia sẻ và lan toả những gì đã học được.'],
    [
      { h: 'Nhìn lại hành trình cả năm' },
      { ul: ['Mạch hướng vào bản thân: Em đã hiểu rõ hơn về mình ở những điểm nào?', 'Mạch hướng đến xã hội: Các mối quan hệ và trách nhiệm của em thay đổi thế nào?', 'Mạch hướng đến tự nhiên: Em đã hành động gì vì môi trường và di sản?', 'Mạch hướng nghiệp: Em đã khám phá được gì và định hướng ra sao?'] },
      { h: 'Chia sẻ bài học' },
      { p: 'Chia sẻ những gì học được với bạn bè, gia đình hoặc cộng đồng là cách củng cố kiến thức và lan toả giá trị.' },
      { note: 'Sự trưởng thành không đo bằng số tuổi mà bằng khả năng tự nhận thức, chịu trách nhiệm và không ngừng học hỏi.' },
    ],
    [
      { q: 'Điều gì bất ngờ nhất em học được từ HĐTN-HN trong năm qua?', a: 'Tuỳ từng học sinh. Câu hỏi này mời gọi sự phản tư — quan trọng là nhận ra ít nhất một điều thực sự thay đổi cách nhìn hay hành vi của em.' },
      { q: 'Em sẽ chia sẻ điều gì từ hành trình này với đàn em học lớp 10 năm sau?', a: 'Chia sẻ một bài học cụ thể và thực tế, không phải lời khuyên chung chung. Ví dụ: "Tham gia tình nguyện giúp tôi hiểu mình không phù hợp với nghề y nhưng rất thích công việc tổ chức sự kiện."' },
    ]
  ),

  'H10HDTN-w35-quiz': L(
    'Ôn tập và đánh giá cuối năm',
    'Đánh giá tổng kết năm học giúp em nhận ra tiến bộ và chuẩn bị bước vào năm học mới.',
    ['Hệ thống hoá toàn bộ kiến thức và kĩ năng đã học trong năm.', 'Tự đánh giá toàn diện kết quả rèn luyện.', 'Đặt mục tiêu phát triển cho năm học lớp 11.'],
    [
      { h: 'Tổng kết bốn mạch nội dung' },
      { ul: ['Hướng vào bản thân: tính cách, giá trị, cảm xúc, tự chủ, tài chính.', 'Hướng đến xã hội: gia đình, bạn bè, cộng đồng, di sản, môi trường.', 'Hướng đến tự nhiên: bảo vệ môi trường, bảo tồn cảnh quan và di sản.', 'Hướng nghiệp: thế giới nghề, phẩm chất, năng lực, kế hoạch nghề.'] },
      { h: 'Mục tiêu cho năm lớp 11' },
      { ul: ['Tiếp tục khám phá và thử nghiệm nghề nghiệp phù hợp.', 'Rèn luyện các phẩm chất và kĩ năng mềm còn yếu.', 'Làm phong phú hồ sơ cá nhân bằng trải nghiệm có chủ đích.', 'Chuẩn bị kiến thức chuyên môn cho định hướng đã chọn.'] },
      { note: 'Lớp 10 là nền tảng. Lớp 11–12 là giai đoạn đào sâu và quyết định. Hành trình tiếp tục!' },
    ],
    [
      { q: 'Từ bốn mạch nội dung HĐTN-HN, mạch nào em thấy có ích nhất với mình và vì sao?', a: 'Tuỳ từng học sinh. Điều quan trọng là có thể giải thích cụ thể tại sao — liên hệ với trải nghiệm thực tế của mình trong năm học.' },
      { q: 'Em đặt ra mục tiêu gì cho bản thân trong năm lớp 11?', a: 'Một mục tiêu tốt cho năm 11 nên: cụ thể hơn so với năm 10, dựa trên những gì đã khám phá được, bao gồm hành động hướng nghiệp và phát triển bản thân, đồng thời thực tế và khả thi.' },
    ]
  ),

  'H10HDTN-w36-quiz': L(
    'Kết thúc HĐTN-HN 10 — Hành trang vào lớp 11',
    'Năm đầu THPT khép lại. Lớp 10 không đòi em phải chốt nghề — nó đòi em mở mắt ra thật rộng: hiểu mình là ai, thử nhiều lĩnh vực, tích luỹ bằng chứng về bản thân. Tuần cuối, ta nhìn lại toàn bộ năm học và chuẩn bị cho lớp 11 — năm trải nghiệm sâu và thu hẹp dần lựa chọn.',
    ['Hệ thống hoá bốn mạch nội dung HĐTN-HN lớp 10.', 'Hiểu vị trí của lớp 10 trong lộ trình hướng nghiệp ba năm THPT.', 'Lập kế hoạch hè và đặt mục tiêu cụ thể cho năm lớp 11.'],
    [
      { h: 'Bức tranh toàn cảnh HĐTN-HN 10' },
      { ul: [
        'Hướng vào bản thân: tính cách và giá trị sống; quản lí cảm xúc và ứng phó căng thẳng; tự chủ trong học tập; quản lí tài chính cá nhân cơ bản.',
        'Hướng đến xã hội: quan hệ gia đình và bạn bè; giao tiếp và hợp tác; trách nhiệm với cộng đồng; giữ gìn di sản văn hoá.',
        'Hướng đến tự nhiên: bảo vệ môi trường sống; tiết kiệm tài nguyên; bảo tồn cảnh quan thiên nhiên.',
        'Hướng nghiệp: thế giới nghề nghiệp; phẩm chất và năng lực nghề; tự đánh giá sự phù hợp; phác thảo kế hoạch nghề nghiệp.',
      ] },
      { h: 'Lộ trình hướng nghiệp ba năm THPT' },
      { ul: [
        'Lớp 10 — KHÁM PHÁ RỘNG: hiểu bản thân, thử nhiều lĩnh vực, chưa cần chốt gì cả.',
        'Lớp 11 — TRẢI NGHIỆM SÂU: đi sâu vào vài hướng, kiểm chứng sự phù hợp bằng trải nghiệm thật, thu hẹp dần lựa chọn.',
        'Lớp 12 — QUYẾT ĐỊNH: chốt định hướng, chuẩn bị hồ sơ và nguyện vọng, rèn kĩ năng cho giai đoạn sau THPT.',
      ] },
      { h: 'Kế hoạch hè sau lớp 10' },
      { ul: [
        'Thử ít nhất một trải nghiệm nghề nghiệp mới: tham quan nơi làm việc, phỏng vấn một người đang làm nghề em quan tâm, hoặc một khoá học ngắn trực tuyến.',
        'Bổ sung hồ sơ năng lực (portfolio): lưu lại sản phẩm, chứng chỉ, ảnh hoạt động và một đoạn tự nhìn lại mình học được gì.',
        'Rèn một kĩ năng mềm còn yếu — thuyết trình, làm việc nhóm hay quản lí thời gian — bằng một việc cụ thể, đo được.',
        'Giữ nhịp sinh hoạt: ngủ đủ, vận động đều, không để hè phá vỡ thói quen tốt cả năm đã xây.',
      ] },
      { note: 'Lớp 10 chưa phải lúc trả lời câu hỏi "em sẽ làm nghề gì". Đây là lúc thu thập dữ liệu về chính mình — càng nhiều bằng chứng thật, quyết định ở lớp 12 càng vững.' },
    ],
    [
      { q: 'Nhìn lại bốn mạch nội dung của lớp 10, mạch nào giúp em thay đổi nhiều nhất và thay đổi ở điểm gì?', a: 'Câu trả lời tuỳ cá nhân nhưng cần cụ thể: nêu rõ một hành vi hoặc quyết định thực tế đã khác đi. Ví dụ: "Sau chủ đề quản lí tài chính, em bắt đầu ghi chép chi tiêu và để dành được 300 000 đồng trong ba tháng" — đó là bằng chứng, khác hẳn với câu nói chung chung "em thấy trưởng thành hơn".' },
      { q: 'Hãy đặt một mục tiêu hướng nghiệp SMART cho năm lớp 11 của em.', a: 'Ví dụ: "Trong học kì I lớp 11, em sẽ phỏng vấn ít nhất 3 người đang làm trong nhóm nghề Kĩ thuật – Công nghệ, mỗi người 30 phút, ghi lại yêu cầu công việc thực tế và so sánh với năng lực của mình, hoàn thành trước ngày 31/12." — Cụ thể, đo được (3 người), khả thi, liên quan tới hướng nghiệp và có hạn chót.' },
      { q: 'Vì sao lớp 10 không nên chốt nghề nghiệp ngay?', a: 'Vì ở giai đoạn này em chưa có đủ bằng chứng về chính mình. Nhiều sở thích ở tuổi 15 chỉ dựa trên hình dung chứ chưa qua trải nghiệm thực tế — một bạn thích phim về bác sĩ chưa chắc hợp với áp lực trực đêm. Chốt sớm còn khiến em bỏ qua những lĩnh vực chưa từng thử. Lớp 10 nên giữ nhiều cửa mở, thu hẹp dần ở lớp 11 khi đã có trải nghiệm thật.' },
    ]
  ),
};
