// ============================================================
// Lớp 8 · HĐ TRẢI NGHIỆM – HƯỚNG NGHIỆP — 35 tuần (GDPT 2018)
// 4 mạch: Bản thân → Gia đình/Xã hội → Tự nhiên/Cộng đồng → Hướng nghiệp.
// Bám SGK HĐTN-HN 8 (KNTT / CTST / Cánh Diều).
// Key: "S8HDTN-wNN-quiz".
// ============================================================

const L = (topic, intro, objectives, theory, examples) => ({ topic, intro, objectives, theory, examples });

export const S8HDTN_LESSONS = {
  'S8HDTN-w01-quiz': L(
    'Khám phá bản thân — Tính cách và sở thích',
    'Các em thân mến, lớp 8 là lúc các em bắt đầu thật sự "hiểu mình". Hiểu rõ tính cách và sở thích chính là bước đầu để sau này chọn đúng nghề, đúng bạn và đúng cách sống. Cùng cô khám phá nhé!',
    [
      'Nhận diện được những nét tính cách nổi bật của bản thân.',
      'Liệt kê và sắp xếp được các sở thích, sở trường của mình.',
      'Phân biệt được sở thích nhất thời và đam mê bền vững.',
      'Có thái độ tích cực, trân trọng nét riêng của bản thân.',
    ],
    [
      { h: 'Vì sao lớp 8 cần khám phá bản thân?' },
      { p: 'Ở tuổi 13–14, cơ thể và tâm lí của em thay đổi nhanh, em bắt đầu có chính kiến riêng và những rung động mới. Hiểu rõ bản thân giúp em tự tin hơn, biết mình hợp với điều gì, từ đó chọn môn học, hoạt động, bạn bè và định hướng nghề nghiệp phù hợp — tránh chạy theo đám đông rồi lạc lối.' },
      { h: 'Tính cách là gì?' },
      { p: 'Tính cách là tập hợp những nét tâm lí tương đối ổn định, chi phối cách em suy nghĩ, cảm nhận và hành động. Ví dụ: hướng nội hay hướng ngoại, cẩn thận hay phóng khoáng, điềm tĩnh hay nóng nảy. Không có tính cách nào "tốt" hay "xấu" tuyệt đối — mỗi nét đều có mặt mạnh và mặt cần lưu ý.' },
      { h: 'Các cách khám phá bản thân' },
      { ul: [
        'Tự quan sát: khi nào em thấy vui, hào hứng, làm quên cả giờ; khi nào thấy mệt, chán nản.',
        'Lắng nghe phản hồi từ thầy cô, bố mẹ, bạn thân — họ nhìn em từ bên ngoài.',
        'Làm trắc nghiệm tính cách uy tín như MBTI, Big Five (chỉ để tham khảo, không "đóng khung").',
        'Thử nghiệm nhiều hoạt động khác nhau để biết mình thật sự hợp với gì.',
        'Ghi nhật kí: mỗi tuần liệt kê 3 việc làm tốt và 1 điều muốn cải thiện.',
      ] },
      { h: 'Phân biệt sở thích và đam mê' },
      { ul: [
        'Sở thích: điều em thích làm lúc rảnh, dễ thay đổi theo thời gian (nghe nhạc, xem phim).',
        'Sở trường: việc em làm tốt hơn nhiều bạn khác (tính nhẩm nhanh, vẽ đẹp).',
        'Đam mê: điều em làm hàng giờ không chán, sẵn sàng nỗ lực vượt khó để giỏi hơn — bền vững và sâu sắc.',
      ] },
      { h: 'Lưu ý khi dùng trắc nghiệm tính cách' },
      { p: 'Các bài trắc nghiệm như MBTI giúp em có "ngôn ngữ" để hiểu mình, nhưng không phải lời tiên tri. Em là con người đang lớn lên và thay đổi, không bị "đóng khung" trong một mã chữ cái. Hãy dùng kết quả như gợi ý, đừng coi đó là giới hạn của bản thân.' },
      { note: 'Mỗi người là một phiên bản độc nhất. Em không cần giống ai cả — điều quan trọng là hiểu mình để phát huy điểm mạnh và rèn giũa điểm cần cải thiện.' },
    ],
    [
      { q: 'Em là người hướng nội, ngại nói trước đám đông, trong khi nhiều bạn rất sôi nổi. Em có nên buồn vì điều đó không?', a: 'Em hoàn toàn không cần buồn. Hướng nội không phải nhược điểm — người hướng nội thường lắng nghe sâu, suy nghĩ kĩ, làm việc tập trung. Em có thể phát huy thế mạnh đó (viết, nghiên cứu, làm việc nhóm nhỏ) đồng thời luyện thêm kĩ năng nói trước lớp từ những nhóm nhỏ trước. Quan trọng là hiểu và chấp nhận nét riêng của mình.' },
      { q: 'Em thích chơi game mỗi tối — đó là sở thích hay đam mê?', a: 'Nếu em chỉ chơi để giải trí lúc rảnh thì đó là sở thích. Nó trở thành đam mê khi em chủ động tìm hiểu sâu (cách thiết kế game, lập trình, đồ hoạ), nỗ lực học thêm để tạo ra sản phẩm chứ không chỉ tiêu thụ. Hãy thử biến sở thích thành điều có ích — biết đâu đó là khởi đầu cho nghề lập trình game của em.' },
      { q: 'Bố mẹ muốn em sau này làm bác sĩ, nhưng em lại thấy hứng thú với hội hoạ. Em nên làm gì?', a: 'Em không nên vội phản đối hay giấu giếm. Hãy bình tĩnh khám phá kĩ cả hai hướng: thử học vẽ nghiêm túc, đồng thời tìm hiểu công việc bác sĩ thật sự ra sao. Sau đó em chia sẻ thật lòng với bố mẹ về cảm nhận của mình. Hiểu bản thân rõ sẽ giúp em đối thoại với bố mẹ một cách thuyết phục, có cơ sở.' },
    ]
  ),

  'S8HDTN-w02-quiz': L(
    'Phong cách học tập — Xác định kiểu học của em',
    'Mỗi người tiếp thu kiến thức theo một cách khác nhau. Biết được "kiểu học" của riêng mình giúp em học nhanh hơn, nhớ lâu hơn mà lại đỡ mệt. Cùng cô tìm ra phong cách học của em nhé!',
    [
      'Hiểu được mô hình 4 phong cách học tập VARK.',
      'Tự xác định được phong cách học nổi trội của bản thân.',
      'Biết áp dụng phương pháp học phù hợp với phong cách của mình.',
      'Biết kết hợp nhiều cách học để hiệu quả hơn.',
    ],
    [
      { h: 'Phong cách học tập là gì?' },
      { p: 'Phong cách học tập là cách thức mà mỗi người tiếp nhận và xử lí thông tin hiệu quả nhất. Cùng một bài học, có bạn nhớ ngay khi nhìn sơ đồ, có bạn phải nghe giảng mới hiểu, có bạn cần tự tay làm thí nghiệm. Hiểu phong cách của mình giúp em chọn cách học phù hợp thay vì học vất vả mà kém hiệu quả.' },
      { h: 'Mô hình VARK — 4 phong cách' },
      { ul: [
        'V – Visual (Thị giác): học tốt qua hình ảnh, sơ đồ, biểu đồ, video, màu sắc.',
        'A – Auditory (Thính giác): học tốt qua nghe — bài giảng, thảo luận, đọc to, podcast.',
        'R – Read/Write (Đọc – Viết): học tốt qua đọc tài liệu, ghi chép, viết tóm tắt.',
        'K – Kinesthetic (Vận động): học tốt qua thực hành, thí nghiệm, vận động, trải nghiệm thực tế.',
      ] },
      { h: 'Làm sao tự xác định phong cách của em?' },
      { p: 'Em hãy nhớ lại: khi học một bài mới khó, em thấy dễ tiếp thu nhất qua cách nào — xem video minh hoạ, nghe thầy cô giảng, đọc kĩ sách giáo khoa, hay tự tay làm thử? Cách giúp em "à, hiểu rồi!" nhanh nhất chính là phong cách nổi trội của em. Nhiều bạn có 2–3 phong cách kết hợp.' },
      { h: 'Áp dụng theo từng phong cách' },
      { ul: [
        'Visual: vẽ sơ đồ tư duy, dùng thẻ ghi nhớ (flashcard) nhiều màu, xem video minh hoạ.',
        'Auditory: đọc bài to lên, ghi âm rồi nghe lại, học nhóm thảo luận, giảng lại cho bạn.',
        'Read/Write: ghi chép chi tiết, viết tóm tắt, gạch ý chính, làm đề cương.',
        'Kinesthetic: làm thí nghiệm, đóng vai, vừa đi vừa đọc bài, dùng vật thật để minh hoạ.',
      ] },
      { h: 'Vì sao nên kết hợp nhiều cách?' },
      { p: 'Dù em có phong cách nổi trội, việc kết hợp nhiều giác quan sẽ giúp nhớ sâu hơn. Ví dụ: vừa đọc (R), vừa vẽ sơ đồ (V), vừa giảng lại cho bạn (A). Càng dùng nhiều "kênh" để học, kiến thức càng được khắc ghi vững chắc.' },
      { note: 'Không có phong cách học nào "thông minh" hơn phong cách nào. Điều quan trọng là em tìm ra cách phù hợp với mình và kiên trì áp dụng.' },
    ],
    [
      { q: 'VARK là viết tắt của những từ nào và có ý nghĩa gì?', a: 'VARK gồm Visual (thị giác — học qua hình ảnh), Auditory (thính giác — học qua nghe), Read/Write (đọc-viết — học qua chữ viết) và Kinesthetic (vận động — học qua thực hành). Đây là mô hình giúp em nhận diện cách tiếp thu kiến thức hiệu quả nhất của bản thân.' },
      { q: 'Em thuộc nhóm Kinesthetic, nhưng môn Lịch sử chỉ có chữ và ngày tháng khô khan. Em học thế nào cho dễ nhớ?', a: 'Em hãy biến kiến thức tĩnh thành hoạt động: vẽ trục thời gian rồi đi từng mốc, đóng vai nhân vật lịch sử, làm sa bàn trận đánh, hay vừa đi quanh phòng vừa kể lại sự kiện. Khi cơ thể vận động cùng việc học, em — người thuộc nhóm Kinesthetic — sẽ nhớ lâu hơn nhiều.' },
      { q: 'Bạn em học bằng cách nghe nhạc và đọc to, còn em thì cần yên tĩnh để đọc. Ai đúng?', a: 'Cả hai đều đúng theo phong cách riêng. Bạn em có thể thiên về Auditory nên cần âm thanh, còn em thiên về Read/Write nên cần yên tĩnh để tập trung vào chữ. Không nên áp đặt cách học của mình cho người khác. Mỗi người tự tìm và tôn trọng phong cách của nhau.' },
    ]
  ),

  'S8HDTN-w03-quiz': L(
    'Kỹ năng quản lý thời gian',
    'Mỗi người đều có đúng 24 giờ mỗi ngày — không ai nhiều hơn, không ai ít hơn. Điều làm nên khác biệt là cách chúng ta dùng quỹ thời gian đó. Cùng cô học cách trở thành "ông chủ" của thời gian nhé!',
    [
      'Hiểu và biết dùng ma trận ưu tiên Eisenhower.',
      'Biết áp dụng kĩ thuật Pomodoro để tập trung.',
      'Nhận diện và khắc phục thói quen trì hoãn.',
      'Biết lập kế hoạch và cân bằng học – chơi – nghỉ.',
    ],
    [
      { h: 'Vì sao quản lí thời gian quan trọng với lớp 8?' },
      { p: 'Lên lớp 8, khối lượng bài vở nặng hơn, nhiều môn cần đào sâu, lại thêm hoạt động ngoại khoá và áp lực chuẩn bị cho lớp 9. Nếu không biết sắp xếp, em dễ rơi vào cảnh "việc gì cũng dở dang", học khuya mà vẫn quên bài. Quản lí thời gian tốt giúp em làm chủ cuộc sống, giảm căng thẳng và vẫn có thời gian nghỉ ngơi.' },
      { h: 'Ma trận Eisenhower — sắp xếp ưu tiên' },
      { ul: [
        'Khẩn cấp + Quan trọng: làm NGAY (bài kiểm tra ngày mai, việc đến hạn gấp).',
        'Quan trọng + Không khẩn cấp: LÊN LỊCH — đây là "vùng vàng" (ôn thi, rèn sức khoẻ, học kĩ năng).',
        'Khẩn cấp + Không quan trọng: làm nhanh hoặc nhờ giúp (việc vặt, tin nhắn).',
        'Không khẩn cấp + Không quan trọng: BỎ QUA (lướt mạng vô bổ, xem video vô tận).',
      ] },
      { h: '"Vùng vàng" — bí quyết của người thành công' },
      { p: 'Phần lớn người thành công dành nhiều thời gian cho ô "Quan trọng nhưng chưa khẩn cấp" — như ôn bài đều đặn, tập thể dục, đọc sách. Những việc này không gây áp lực ngay nhưng quyết định tương lai. Nếu cứ chờ đến lúc "khẩn cấp" mới làm, em sẽ luôn cuống cuồng và mệt mỏi.' },
      { h: 'Kĩ thuật Pomodoro' },
      { p: 'Cách làm rất đơn giản: học tập trung 25 phút, sau đó nghỉ 5 phút. Cứ sau 4 chu kì (4 lần 25 phút) thì nghỉ dài 15–30 phút. Trong 25 phút đó, em tắt thông báo điện thoại và chỉ làm một việc duy nhất. Cách này giúp não đỡ mệt và giữ được sự tập trung cao.' },
      { h: 'Vì sao chúng ta hay trì hoãn?' },
      { ul: [
        'Việc quá lớn, nhìn vào thấy "ngợp" nên không muốn bắt đầu.',
        'Sợ làm không tốt nên trì hoãn để khỏi đối mặt.',
        'Bị xao nhãng bởi điện thoại, mạng xã hội hấp dẫn hơn.',
        'Không có hạn chót rõ ràng nên "để mai làm".',
      ] },
      { h: 'Cách chống trì hoãn hiệu quả' },
      { ul: [
        'Chia việc lớn thành các bước nhỏ, dễ bắt đầu.',
        'Áp dụng "quy tắc 5 phút": chỉ làm 5 phút thôi — đà sẽ kéo em đi tiếp.',
        'Tắt thông báo, để điện thoại ở phòng khác khi học.',
        'Học cùng bạn để nhắc nhau (cam kết trách nhiệm).',
        'Tự thưởng nhỏ sau khi hoàn thành (xem 1 video, ăn món thích).',
      ] },
      { note: 'Thời gian là tài sản công bằng nhất và cũng quý nhất — đã trôi qua thì không bao giờ lấy lại được. Mỗi giờ em quản lí tốt hôm nay là một viên gạch xây tương lai.' },
    ],
    [
      { q: 'Việc "học tiếng Anh đều đặn mỗi ngày" thuộc ô nào trong ma trận Eisenhower? Vì sao?', a: 'Việc này thuộc ô "Quan trọng nhưng không khẩn cấp" — chính là vùng vàng. Học tiếng Anh không gấp gáp hôm nay, nên dễ bị bỏ qua, nhưng lại cực kì quan trọng cho tương lai. Em cần chủ động lên lịch và duy trì đều đặn, đừng đợi đến khi sát kì thi mới cuống cuồng học.' },
      { q: 'Em có một bài tập lớn phải nộp sau 2 tuần nhưng cứ trì hoãn vì thấy nó quá khó. Em nên làm gì?', a: 'Em hãy chia bài tập lớn thành các bước nhỏ: ngày 1 tìm tài liệu, ngày 2 lập dàn ý, ngày 3 viết phần mở đầu... Mỗi ngày chỉ làm một bước nhỏ, áp dụng "quy tắc 5 phút" để bắt đầu. Khi đã khởi động, em sẽ thấy việc không đáng sợ như tưởng tượng, và 2 tuần là dư dả thời gian.' },
      { q: 'Em áp dụng Pomodoro nhưng cứ đến phút 25 lại muốn lướt điện thoại "một chút" rồi quên luôn việc học. Em nên làm sao?', a: 'Em nên để điện thoại ở phòng khác trong suốt phiên học, hoặc bật chế độ không làm phiền. Phút nghỉ 5 phút em đứng dậy uống nước, vươn vai thay vì cầm điện thoại — vì mạng xã hội rất dễ "nuốt" mất 5 phút thành 50 phút. Hãy thay phần thưởng "lướt điện thoại" bằng vận động nhẹ để não nghỉ thật sự.' },
    ]
  ),

  'S8HDTN-w04-quiz': L(
    'Kỹ năng phản biện (critical thinking)',
    'Trong thời đại thông tin tràn ngập, biết "dừng lại và tự hỏi: Điều này có đúng không?" là một kĩ năng cực kì quý giá. Tư duy phản biện không phải là cãi cọ, mà là cách suy nghĩ thông minh và độc lập. Cùng cô tìm hiểu nhé!',
    [
      'Hiểu được tư duy phản biện (critical thinking) là gì.',
      'Biết đặt các câu hỏi đúng để đánh giá thông tin.',
      'Phân biệt tư duy phản biện với tranh cãi hơn thua.',
      'Nhận diện một số thiên kiến thường gặp.',
    ],
    [
      { h: 'Tư duy phản biện là gì?' },
      { p: 'Tư duy phản biện là khả năng phân tích thông tin một cách khách quan, đánh giá lập luận dựa trên bằng chứng, không vội tin hay vội bác bỏ điều gì. Người có tư duy phản biện luôn tự hỏi "Vì sao?", "Có bằng chứng không?", "Có cách hiểu khác không?" trước khi kết luận.' },
      { h: 'Vì sao kĩ năng này đặc biệt cần ở thời nay?' },
      { p: 'Mỗi ngày em tiếp xúc với hàng trăm thông tin trên mạng — tin tức, quảng cáo, bài đăng của bạn bè, video lan truyền. Trong đó có rất nhiều tin sai, tin giật gân, quảng cáo gây hiểu lầm. Không có tư duy phản biện, em dễ bị dẫn dắt, lừa gạt hoặc lan truyền tin sai mà không biết.' },
      { h: '5 câu hỏi cốt lõi khi đánh giá thông tin' },
      { ul: [
        'Ai là người đưa ra thông tin này? Họ có đáng tin không?',
        'Họ được lợi gì khi nói điều đó? (có thể là quảng cáo trá hình).',
        'Có bằng chứng, số liệu, nguồn rõ ràng không?',
        'Có cách giải thích hay góc nhìn khác không?',
        'Mình có đang bị thiên kiến hay cảm xúc chi phối không?',
      ] },
      { h: 'Một số thiên kiến cần cảnh giác' },
      { ul: [
        'Thiên kiến xác nhận: chỉ tin điều hợp với suy nghĩ sẵn có của mình.',
        'Thiên kiến đám đông: thấy nhiều người tin nên cũng tin theo.',
        'Thiên kiến hào quang: thấy người nổi tiếng nói nên cho là đúng.',
      ] },
      { h: 'Tư duy phản biện KHÁC tranh cãi hơn thua' },
      { ul: [
        'Tư duy phản biện: mục tiêu là tìm ra sự thật, sẵn sàng thay đổi ý kiến khi thấy mình sai.',
        'Tranh cãi hơn thua: mục tiêu là thắng đối phương, cố bảo vệ ý mình dù sai, không chịu lắng nghe.',
        'Người tư duy phản biện tôn trọng người đối thoại; người tranh cãi thường công kích cá nhân.',
      ] },
      { h: 'Rèn tư duy phản biện mỗi ngày' },
      { p: 'Em có thể tập từ những việc nhỏ: trước khi tin một tin trên mạng, hãy kiểm tra nguồn; khi đọc quảng cáo, tự hỏi "họ đang muốn mình mua gì"; khi nghe một ý kiến, thử nghĩ xem có ý kiến trái chiều nào hợp lí không. Dần dần thói quen "dừng lại và suy nghĩ" sẽ trở thành phản xạ tự nhiên.' },
      { note: 'Tư duy phản biện không có nghĩa là nghi ngờ tất cả mọi thứ, mà là biết đánh giá điều gì đáng tin dựa trên bằng chứng và lí lẽ.' },
    ],
    [
      { q: 'Một người bạn chia sẻ tin "Uống nước chanh nóng vào buổi sáng chữa được bệnh ung thư". Em nên phản ứng thế nào?', a: 'Em không vội tin cũng không vội share. Em áp dụng các câu hỏi phản biện: Nguồn tin từ đâu — bác sĩ, tổ chức y tế hay trang vô danh? Có nghiên cứu khoa học nào chứng minh không? Các tổ chức uy tín như WHO, Bộ Y tế nói gì? Sau khi kiểm tra, nếu là tin sai, em nhẹ nhàng nói lại với bạn để tránh lan truyền thông tin nguy hiểm.' },
      { q: 'Trong giờ thảo luận, một bạn chỉ ra điểm sai trong bài của em. Em cảm thấy bị xúc phạm. Phản ứng đó có đúng không?', a: 'Phản ứng đó là tự nhiên, nhưng chưa phải tư duy phản biện. Em nên tách "ý kiến về bài" khỏi "đánh giá về bản thân". Bạn góp ý về nội dung, không phải chê em là người kém. Hãy bình tĩnh lắng nghe, xem điểm sai đó có thật không. Nếu bạn đúng, em cảm ơn và sửa — đó mới là thái độ trưởng thành.' },
      { q: 'Em thấy một quảng cáo "Khoá học giúp giỏi tiếng Anh sau 7 ngày, cam kết 100%". Em nên nghĩ gì?', a: 'Em hãy cảnh giác với các từ tuyệt đối như "100%", "7 ngày". Học một ngôn ngữ cần thời gian dài và nỗ lực — không có phép màu. Em tự hỏi: ai làm quảng cáo này, họ được lợi gì (bán khoá học), có bằng chứng thật từ học viên không? Lời hứa "quá đẹp để là sự thật" thường là dấu hiệu của chiêu trò.' },
    ]
  ),

  'S8HDTN-w05-quiz': L(
    'Quản lý cảm xúc tuổi dậy thì',
    'Tuổi dậy thì giống như một con tàu lượn cảm xúc — có lúc vui phơi phới, có lúc buồn vô cớ, có lúc cáu gắt mà chẳng hiểu vì sao. Đó là điều rất bình thường. Cùng cô học cách làm chủ "cơn bão cảm xúc" bên trong nhé!',
    [
      'Hiểu vì sao cảm xúc tuổi dậy thì dễ xáo trộn.',
      'Biết gọi tên và nhận diện cảm xúc của bản thân.',
      'Nắm được các kĩ thuật làm dịu khi cảm xúc tiêu cực ập đến.',
      'Biết khi nào và tìm đến ai để được hỗ trợ.',
    ],
    [
      { h: 'Vì sao cảm xúc tuổi dậy thì dễ xáo trộn?' },
      { p: 'Ở tuổi 13–14, hormone trong cơ thể thay đổi mạnh mẽ, ảnh hưởng đến tâm trạng. Đồng thời, vùng não kiểm soát cảm xúc và lí trí chưa phát triển hoàn thiện (phải đến khoảng 25 tuổi mới hoàn chỉnh). Cộng thêm áp lực học tập, bạn bè, hình ảnh bản thân — tất cả khiến cảm xúc của em dễ dao động hơn người lớn. Đây là điều hoàn toàn tự nhiên.' },
      { h: 'Không có cảm xúc nào là "xấu"' },
      { p: 'Tức giận, buồn bã, lo lắng đều là cảm xúc bình thường và có ích — chúng báo cho em biết có điều gì đó cần chú ý. Tức giận báo hiệu ranh giới bị xâm phạm; lo lắng nhắc em chuẩn bị kĩ hơn. Vấn đề không nằm ở cảm xúc, mà ở CÁCH em phản ứng với cảm xúc đó.' },
      { h: 'Bước 1: Gọi tên cảm xúc' },
      { p: 'Khi cảm thấy khó chịu, em hãy tự nói thầm: "Tôi đang TỨC GIẬN", "Tôi đang LO LẮNG", "Tôi đang THẤT VỌNG". Nghe có vẻ đơn giản nhưng việc gọi đúng tên cảm xúc giúp phần não lí trí "thức dậy", làm dịu phản ứng bốc đồng. Đây là bước đầu tiên để kiểm soát.' },
      { h: 'Kĩ thuật làm dịu khi cảm xúc dâng cao' },
      { ul: [
        'Thở 4-7-8: hít vào 4 giây, giữ hơi 7 giây, thở ra 8 giây — lặp 3–4 lần.',
        'Đếm ngược từ 100 về 1, hoặc đếm hơi thở.',
        'Tạm rời khỏi tình huống căng thẳng 5–10 phút.',
        'Vận động nhẹ: đi bộ, vươn vai, uống một cốc nước mát.',
        'Viết ra giấy điều đang làm mình bực bội.',
      ] },
      { h: 'Cách thể hiện cảm xúc lành mạnh' },
      { ul: [
        'Dùng câu "Tôi cảm thấy...": "Tớ cảm thấy buồn khi bị bỏ rơi" thay vì "Cậu thật tệ".',
        'Chia sẻ với người tin cậy thay vì dồn nén hay bùng nổ.',
        'Tránh trút giận lên người vô can hoặc lên mạng xã hội.',
        'Tìm hoạt động giải toả lành mạnh: thể thao, vẽ, nghe nhạc.',
      ] },
      { h: 'Khi nào cần tìm người lớn hỗ trợ?' },
      { ul: [
        'Buồn bã, chán nản kéo dài trên 2 tuần không rõ lí do.',
        'Mất ngủ thường xuyên, ăn uống thất thường.',
        'Có suy nghĩ tự làm hại bản thân.',
        'Tự cô lập, xa lánh bạn bè và gia đình.',
      ] },
      { note: 'Tìm sự giúp đỡ KHÔNG phải là dấu hiệu yếu đuối — đó là dấu hiệu của sự trưởng thành. Em có thể gọi Tổng đài Quốc gia Bảo vệ Trẻ em 111 (miễn phí, 24/7) hoặc trò chuyện với thầy cô, người thân tin cậy.' },
    ],
    [
      { q: 'Em đang ôn bài thì em trai cứ mở nhạc to khiến em bực bội muốn quát. Em nên xử lí thế nào?', a: 'Trước hết em áp dụng kĩ thuật làm dịu: dừng lại, hít thở sâu vài lần, tự nhủ "Mình đang tức". Khi đã bình tĩnh, em nói nhẹ nhàng: "Em ơi, chị cần yên tĩnh để học, em vặn nhỏ giúp chị nhé." Cách nói ôn hoà giải quyết vấn đề tốt hơn nhiều so với quát mắng — quát mắng chỉ gây cãi vã và làm em vẫn không học được.' },
      { q: 'Kĩ thuật thở 4-7-8 cụ thể là làm gì và giúp ích thế nào?', a: 'Em hít vào bằng mũi trong 4 giây, giữ hơi 7 giây, rồi thở ra từ từ bằng miệng trong 8 giây, lặp lại 3–4 lần. Cách thở chậm và sâu này kích hoạt hệ thần kinh thư giãn, làm chậm nhịp tim, giúp em bình tĩnh lại nhanh chóng khi đang tức giận hay lo lắng. Em có thể dùng trước giờ kiểm tra hoặc khi căng thẳng.' },
      { q: 'Em buồn chán suốt ba tuần nay, không muốn gặp ai, học hành sa sút. Đây có phải chuyện bình thường của tuổi dậy thì không?', a: 'Buồn vài hôm khi gặp chuyện không vui là bình thường, nhưng buồn chán kéo dài trên hai tuần kèm theo xa lánh mọi người và sa sút học tập là dấu hiệu cần được quan tâm nghiêm túc. Em nên chia sẻ ngay với bố mẹ, thầy cô hoặc gọi Tổng đài 111. Tìm sự hỗ trợ sớm sẽ giúp em vượt qua, đây không phải điều đáng xấu hổ.' },
    ]
  ),

  'S8HDTN-w06-quiz': L(
    'Kỹ năng giao tiếp hiệu quả',
    'Giao tiếp giống như chiếc cầu nối giữa em và mọi người xung quanh. Một người giao tiếp tốt sẽ có nhiều bạn tốt, được thầy cô quý mến và sau này thành công hơn trong công việc. Cùng cô rèn kĩ năng quan trọng này nhé!',
    [
      'Hiểu vai trò của giao tiếp trong cuộc sống và công việc.',
      'Nắm được kĩ năng lắng nghe chủ động.',
      'Biết cách diễn đạt rõ ràng, mạch lạc.',
      'Hiểu được vai trò của ngôn ngữ cơ thể.',
    ],
    [
      { h: 'Giao tiếp gồm những gì?' },
      { p: 'Giao tiếp không chỉ là nói. Một thông điệp được truyền đi qua ba kênh: lời nói (nội dung em nói), giọng điệu (cao thấp, nhanh chậm, ấm áp hay gắt gỏng) và ngôn ngữ cơ thể (ánh mắt, nét mặt, cử chỉ). Nhiều nghiên cứu cho thấy ngôn ngữ cơ thể và giọng điệu chiếm phần lớn ấn tượng mà người nghe nhận được.' },
      { h: 'Lắng nghe chủ động — nửa quan trọng của giao tiếp' },
      { ul: [
        'Nhìn vào mắt người nói, hướng cơ thể về phía họ.',
        'Không cắt lời, không vội phán xét hay đưa lời khuyên.',
        'Gật đầu, "ừ", "rồi sao nữa" để thể hiện đang lắng nghe.',
        'Tóm lại điều người kia vừa nói: "Ý cậu là... đúng không?" để chắc mình hiểu đúng.',
        'Không vừa nghe vừa bấm điện thoại.',
      ] },
      { h: 'Diễn đạt rõ ràng, mạch lạc' },
      { ul: [
        'Suy nghĩ một chút trước khi nói, sắp xếp ý.',
        'Dùng câu ngắn gọn, đi thẳng vào ý chính.',
        'Hạn chế từ đệm "ờ", "à", "kiểu như" lặp đi lặp lại.',
        'Nói với tốc độ vừa phải, âm lượng đủ nghe.',
        'Dùng ví dụ cụ thể để người nghe dễ hình dung.',
      ] },
      { h: 'Ngôn ngữ cơ thể tích cực' },
      { ul: [
        'Tư thế mở: không khoanh tay, không đút túi, người hướng về đối phương.',
        'Ánh mắt nhìn người đối diện, không lảng tránh.',
        'Nụ cười phù hợp tạo thiện cảm.',
        'Giữ khoảng cách hợp lí (khoảng một sải tay).',
      ] },
      { h: 'Giao tiếp trong tình huống khó' },
      { p: 'Khi cần từ chối, phê bình hay bày tỏ bất đồng, em dùng cách nói "thành thật nhưng tử tế": nêu cảm nhận của mình ("Tớ thấy..."), trình bày lí do, đề xuất giải pháp. Tránh chỉ trích cá nhân ("Cậu lúc nào cũng..."). Cách này giúp giải quyết vấn đề mà không làm tổn thương mối quan hệ.' },
      { h: 'Những lỗi giao tiếp thường gặp' },
      { ul: [
        'Cắt lời, cướp lượt nói của người khác.',
        'Chỉ chăm chăm chờ đến lượt mình nói mà không thật sự lắng nghe.',
        'Nói xấu người vắng mặt.',
        'Dùng điện thoại khi đang nói chuyện với ai đó.',
      ] },
      { note: 'Giao tiếp tốt không phải là nói thật nhiều hay thật hay, mà là khiến người đối diện cảm thấy được lắng nghe và tôn trọng.' },
    ],
    [
      { q: 'Khi bạn đang kể chuyện buồn, em liền chen vào kể chuyện của mình "còn buồn hơn". Điều này có nên không?', a: 'Không nên. Khi bạn chia sẻ chuyện buồn, điều bạn cần nhất là được lắng nghe và đồng cảm, không phải nghe em "thi xem ai khổ hơn". Em hãy lắng nghe trọn vẹn, gật đầu, nói "Mình hiểu cảm giác của cậu". Sau khi bạn nói hết, nếu phù hợp em mới chia sẻ trải nghiệm của mình như một cách động viên, chứ không phải để giành sự chú ý.' },
      { q: 'Em rất ngại nhìn vào mắt người khác khi nói chuyện. Điều này ảnh hưởng gì đến giao tiếp?', a: 'Tránh ánh mắt có thể khiến người đối diện hiểu lầm em thiếu tự tin, không quan tâm hoặc đang giấu giếm điều gì. Em có thể luyện dần: bắt đầu nhìn vào vùng giữa hai lông mày hoặc sống mũi của người nói (trông giống như nhìn vào mắt), rồi tăng dần thời gian nhìn thẳng. Luyện với người thân trước sẽ giúp em đỡ ngại hơn.' },
      { q: 'Ngôn ngữ cơ thể quan trọng đến mức nào trong giao tiếp?', a: 'Ngôn ngữ cơ thể rất quan trọng — nhiều nghiên cứu cho thấy nó cùng với giọng điệu chiếm phần lớn ấn tượng người nghe cảm nhận, đôi khi hơn cả nội dung lời nói. Một câu nói tử tế nhưng kèm nét mặt cau có sẽ bị hiểu sai. Vì vậy, ngoài việc chọn lời, em cần chú ý đến ánh mắt, nụ cười, tư thế để thông điệp được truyền đi đúng và thiện cảm.' },
    ]
  ),

  'S8HDTN-w07-quiz': L(
    'Tình bạn — Tình yêu lành mạnh tuổi học trò',
    'Tuổi 13–14, bên cạnh tình bạn thân thiết, nhiều bạn bắt đầu có những rung động đầu đời. Đó là điều tự nhiên và đẹp đẽ. Điều quan trọng là biết phân biệt thế nào là lành mạnh và biết giữ ranh giới an toàn. Cùng cô tìm hiểu một cách cởi mở nhé!',
    [
      'Nhận diện đặc điểm của tình bạn lành mạnh.',
      'Hiểu rung động đầu đời là điều tự nhiên, biết ứng xử phù hợp.',
      'Biết thiết lập và giữ vững ranh giới an toàn cho bản thân.',
      'Biết tìm sự giúp đỡ khi gặp tình huống không an toàn.',
    ],
    [
      { h: 'Tình bạn lành mạnh có đặc điểm gì?' },
      { ul: [
        'Tôn trọng lẫn nhau, không ép buộc, không lợi dụng.',
        'Cùng nhau tiến bộ, động viên nhau làm điều tốt.',
        'Chia sẻ vui buồn, tin tưởng và giữ bí mật cho nhau.',
        'Góp ý thẳng thắn khi bạn sai, vui mừng khi bạn thành công.',
        'Tôn trọng quyền riêng tư và sự khác biệt của nhau.',
      ] },
      { h: 'Dấu hiệu của tình bạn không lành mạnh' },
      { ul: [
        'Rủ rê làm điều sai trái, vi phạm nội quy, pháp luật.',
        'Lợi dụng, kiểm soát, ghen tị khi bạn có bạn khác.',
        'Hạ thấp, chế giễu, khiến em cảm thấy tự ti.',
        'Ép em làm điều khiến em không thoải mái.',
      ] },
      { h: 'Rung động đầu đời — điều tự nhiên' },
      { p: 'Việc em thấy quý mến đặc biệt một bạn khác giới (hay cùng giới) là cảm xúc tự nhiên ở tuổi này, không có gì sai hay đáng xấu hổ. Điều quan trọng là cách em ứng xử: giữ tình cảm trong sáng, lành mạnh, biến nó thành động lực để cùng nhau học tốt và sống tốt hơn, thay vì để nó chi phối khiến sao nhãng việc học.' },
      { h: 'Ứng xử với rung động đầu đời' },
      { ul: [
        'Giữ tình cảm hồn nhiên, trong sáng; tập trung quý mến và giúp đỡ học tập.',
        'Không để tình cảm chiếm hết thời gian, ảnh hưởng việc học.',
        'Tôn trọng đối phương, không ép buộc, không đeo bám.',
        'Chia sẻ với người lớn tin cậy nếu em băn khoăn, lo lắng.',
      ] },
      { h: 'Ranh giới an toàn — TUYỆT ĐỐI giữ vững' },
      { ul: [
        'Không ai được ép em làm điều khiến em không thoải mái — em có quyền nói "Không".',
        'Tuyệt đối không chia sẻ hình ảnh nhạy cảm của bản thân — nguy cơ bị phát tán, tống tiền.',
        'Không có quan hệ tình dục ở tuổi này — cả về mặt sức khoẻ, tâm lí và pháp luật.',
        'Báo ngay người lớn tin cậy nếu bị quấy rối, đe doạ hay ép buộc.',
      ] },
      { h: 'Pháp luật bảo vệ em' },
      { p: 'Pháp luật Việt Nam bảo vệ nghiêm ngặt trẻ em dưới 16 tuổi. Mọi hành vi quan hệ tình dục với người dưới 16 tuổi đều là tội phạm và bị xử lí nghiêm khắc. Việc phát tán hình ảnh nhạy cảm của người khác cũng là vi phạm pháp luật. Em hiểu điều này để tự bảo vệ mình và không vướng vào sai lầm.' },
      { note: 'Tình cảm đẹp là tình cảm khiến cả hai cùng tốt hơn, tôn trọng nhau và biết giữ ranh giới. Khi gặp khó khăn, đừng ngại tìm đến bố mẹ, thầy cô hoặc gọi 111.' },
    ],
    [
      { q: 'Bạn mà em quý mến nhắn tin đòi em gửi ảnh nhạy cảm "để chứng minh tình cảm". Em nên làm gì?', a: 'Em từ chối dứt khoát và nói thẳng: "Mình không thoải mái với việc đó." Một người thật sự quý mến em sẽ không bao giờ ép em làm điều khiến em khó xử. Tuyệt đối không gửi ảnh nhạy cảm vì chúng có thể bị phát tán hoặc dùng để tống tiền. Nếu bạn tiếp tục ép, em ngừng liên lạc và kể ngay cho bố mẹ hoặc thầy cô — đây là vấn đề an toàn nghiêm túc.' },
      { q: 'Em đang có rung động với một bạn cùng lớp và lo lắng không biết điều đó có sai không. Em nên nghĩ thế nào?', a: 'Rung động đầu đời là cảm xúc hoàn toàn tự nhiên ở tuổi của em, không có gì sai hay đáng xấu hổ. Điều quan trọng là em giữ cho tình cảm ấy trong sáng, không để nó làm sao nhãng việc học, và tôn trọng đối phương. Em có thể biến sự quý mến thành động lực cùng nhau học tốt. Nếu băn khoăn, em có thể tâm sự với mẹ hoặc cô chủ nhiệm.' },
      { q: 'Một người bạn thân rủ em trốn học đi chơi và nói "bạn bè thì phải đi cùng nhau chứ". Em nên làm gì?', a: 'Đây là dấu hiệu của tình bạn chưa lành mạnh — bạn thật sự sẽ không rủ em làm điều sai. Em từ chối rõ ràng: "Trốn học là sai, mình không đi đâu, cậu cũng đừng trốn nhé." Tình bạn tốt được xây trên sự tôn trọng và cùng nhau tiến bộ, không phải bằng việc rủ nhau vi phạm. Nếu bạn giận, đó là điều bạn cần suy nghĩ lại, không phải lỗi của em.' },
    ]
  ),

  'S8HDTN-w08-quiz': L(
    'Hướng nghiệp — Mô hình Holland (RIASEC)',
    'Trên đời có hàng nghìn nghề khác nhau, làm sao biết nghề nào hợp với mình? Nhà tâm lí John Holland đã chia con người thành 6 nhóm sở thích nghề nghiệp, giúp em định hướng dễ dàng hơn. Cùng cô khám phá nhé!',
    [
      'Hiểu 6 nhóm sở thích nghề nghiệp theo mô hình Holland (RIASEC).',
      'Bước đầu tự xác định nhóm sở thích nổi trội của bản thân.',
      'Biết liên hệ các nhóm với một số nghề nghiệp cụ thể.',
      'Hiểu rằng mỗi người thường thuộc nhiều nhóm kết hợp.',
    ],
    [
      { h: 'Mô hình Holland là gì?' },
      { p: 'Mô hình Holland (còn gọi là RIASEC) phân loại sở thích nghề nghiệp của con người thành 6 nhóm. Mỗi người thường nổi trội ở 2–3 nhóm, tạo thành "mã Holland" riêng. Biết mã của mình giúp em khoanh vùng những nghề có thể phù hợp, tiết kiệm thời gian tìm hiểu lan man.' },
      { h: '6 nhóm sở thích RIASEC' },
      { ul: [
        'R – Realistic (Thực tế / Kĩ thuật): thích làm việc bằng tay, máy móc, công cụ, ngoài trời.',
        'I – Investigative (Nghiên cứu): thích tìm tòi, khám phá, giải quyết vấn đề, khoa học.',
        'A – Artistic (Nghệ thuật): thích sáng tạo, tự do, cái đẹp, biểu đạt cảm xúc.',
        'S – Social (Xã hội): thích giúp đỡ, dạy dỗ, chăm sóc, làm việc với con người.',
        'E – Enterprising (Quản lí / Kinh doanh): thích lãnh đạo, thuyết phục, kinh doanh, mạo hiểm.',
        'C – Conventional (Nghiệp vụ / Quy củ): thích tổ chức, sắp xếp dữ liệu, làm việc theo quy trình.',
      ] },
      { h: 'Cách tự xác định nhóm của em' },
      { p: 'Em hãy đọc kĩ mô tả 6 nhóm và tự hỏi: hoạt động nào khiến em hào hứng, làm quên cả giờ? Em thích sửa đồ, làm thí nghiệm, vẽ, giúp bạn, tổ chức sự kiện hay sắp xếp giấy tờ? Chọn ra 3 nhóm em thấy giống mình nhất, sắp xếp theo thứ tự — đó là mã Holland sơ bộ của em (ví dụ: AIS, REC).' },
      { h: 'Liên hệ nhóm với nghề nghiệp' },
      { ul: [
        'R: kĩ sư cơ khí, thợ điện, kĩ thuật viên, nông nghiệp, vận động viên.',
        'I: bác sĩ, nhà khoa học, lập trình viên, nhà nghiên cứu, chuyên viên phân tích.',
        'A: hoạ sĩ, nhạc sĩ, nhà văn, nhà thiết kế, diễn viên, kiến trúc sư.',
        'S: giáo viên, bác sĩ tâm lí, điều dưỡng, công tác xã hội, hướng dẫn viên.',
        'E: doanh nhân, nhà quản lí, luật sư, chuyên viên marketing, MC.',
        'C: kế toán, thủ thư, nhân viên hành chính, kiểm toán, chuyên viên dữ liệu.',
      ] },
      { h: 'Hầu hết nghề là sự kết hợp' },
      { p: 'Rất ít nghề chỉ thuộc một nhóm. Ví dụ bác sĩ cần cả I (nghiên cứu bệnh) và S (chăm sóc người); kiến trúc sư cần cả A (sáng tạo) và R (kĩ thuật) và I (tính toán). Vì vậy em đừng lo nếu mình hợp nhiều nhóm — đó lại là lợi thế để chọn nghề phong phú.' },
      { note: 'Mô hình Holland là công cụ gợi ý, không phải lời phán quyết. Sở thích có thể thay đổi khi em trải nghiệm thêm. Hãy dùng nó để mở rộng hiểu biết về nghề, không phải để tự giới hạn mình.' },
    ],
    [
      { q: 'Em thích vẽ, thích giúp đỡ các em nhỏ và thích kể chuyện. Mã Holland của em có thể là gì và hợp nghề nào?', a: 'Sở thích vẽ thuộc nhóm A (Artistic), giúp đỡ em nhỏ thuộc nhóm S (Social), kể chuyện cũng thiên về A. Vậy mã Holland của em có thể là ASE hoặc SAE. Những nghề phù hợp gồm giáo viên mầm non/mĩ thuật, nhà thiết kế đồ hoạ cho thiếu nhi, người làm sách tranh, hay hoạ sĩ minh hoạ truyện. Em có thể tìm hiểu sâu các nghề này.' },
      { q: 'Nghề bác sĩ thuộc nhóm Holland nào? Vì sao?', a: 'Bác sĩ chủ yếu thuộc nhóm I (Investigative) và S (Social), tạo thành mã IS. Nhóm I vì bác sĩ phải nghiên cứu, chẩn đoán, giải quyết vấn đề bệnh tật; nhóm S vì bác sĩ làm việc trực tiếp với con người, cần thấu hiểu và chăm sóc bệnh nhân. Điều này cho thấy một nghề thường kết hợp nhiều nhóm sở thích chứ không chỉ một.' },
      { q: 'Em làm trắc nghiệm ra mã Holland là REC, nhưng em lại đang mơ làm ca sĩ (nhóm A). Em có nên từ bỏ ước mơ không?', a: 'Em không nên vội từ bỏ. Trắc nghiệm chỉ phản ánh sở thích ở thời điểm hiện tại và có thể chưa thật chính xác. Sở thích cũng thay đổi theo trải nghiệm. Em hãy tiếp tục thử sức với ca hát một cách nghiêm túc để biết đó là đam mê thật hay chỉ là sở thích nhất thời. Đồng thời, mã REC cho thấy em cũng có thế mạnh ở các nghề kĩ thuật, kinh doanh, nghiệp vụ — đây là những lựa chọn dự phòng tốt. Hiểu mình từ nhiều nguồn sẽ giúp em chọn đúng hơn.' },
    ]
  ),

  'S8HDTN-w09-quiz': L(
    'Hướng nghiệp — 10 nhóm ngành lớn theo Holland',
    'Thế giới nghề nghiệp vô cùng rộng lớn và luôn thay đổi. Để không bị "ngợp", người ta nhóm hàng nghìn nghề thành những nhóm ngành lớn. Cùng cô khám phá bức tranh tổng quan này để định hướng cho tương lai nhé!',
    [
      'Biết các nhóm ngành nghề lớn trong xã hội.',
      'Liên hệ được các nhóm ngành với mô hình Holland.',
      'Hiểu xu hướng nghề nghiệp trong thời đại mới.',
      'Bước đầu định hướng nhóm ngành phù hợp với bản thân.',
    ],
    [
      { h: 'Vì sao cần biết các nhóm ngành?' },
      { p: 'Có hàng nghìn nghề khác nhau, nếu tìm hiểu từng nghề một thì không bao giờ hết. Cách thông minh là nắm các nhóm ngành lớn trước, sau đó đi sâu vào nhóm em thấy hứng thú. Đây giống như xem bản đồ tổng thể trước khi chọn con đường cụ thể.' },
      { h: 'Các nhóm ngành nghề lớn' },
      { ul: [
        '1. Công nghệ thông tin – Khoa học máy tính.',
        '2. Kĩ thuật – Cơ khí, điện, điện tử, xây dựng, ô tô.',
        '3. Y – Dược – Chăm sóc sức khoẻ.',
        '4. Khoa học tự nhiên – Toán, Lí, Hoá, Sinh, Môi trường.',
        '5. Khoa học xã hội và nhân văn – Tâm lí, Lịch sử, Ngôn ngữ, Văn học.',
        '6. Kinh tế – Tài chính, Kế toán, Quản trị kinh doanh, Marketing.',
        '7. Luật – Pháp lí.',
        '8. Sư phạm – Giáo dục.',
        '9. Nghệ thuật – Mĩ thuật, Âm nhạc, Thiết kế, Sân khấu điện ảnh.',
        '10. Nông – Lâm – Ngư nghiệp.',
      ] },
      { h: 'Liên hệ nhóm ngành với Holland' },
      { ul: [
        'Nhóm I (Nghiên cứu): CNTT, Y dược, Khoa học tự nhiên.',
        'Nhóm R (Thực tế): Kĩ thuật, Nông – Lâm – Ngư.',
        'Nhóm A (Nghệ thuật): Nghệ thuật, Thiết kế.',
        'Nhóm S (Xã hội): Sư phạm, Khoa học xã hội, Y (chăm sóc).',
        'Nhóm E (Kinh doanh): Kinh tế, Luật.',
        'Nhóm C (Nghiệp vụ): Kế toán, Hành chính, một phần CNTT.',
      ] },
      { h: 'Nghề nghiệp trong thời đại số' },
      { p: 'Thế giới nghề đang thay đổi nhanh do công nghệ và trí tuệ nhân tạo (AI). Nhiều nghề mới ra đời (chuyên viên dữ liệu, sáng tạo nội dung số, kĩ sư AI), một số nghề cũ thay đổi cách làm. Vì vậy, ngoài kiến thức chuyên môn, em cần rèn các kĩ năng "không bị thay thế": tư duy sáng tạo, giải quyết vấn đề, giao tiếp, học hỏi suốt đời.' },
      { h: 'Không có nghề "sang" hay "hèn"' },
      { p: 'Mọi nghề lương thiện đều đáng quý và cần thiết cho xã hội — từ bác sĩ, kĩ sư đến đầu bếp, thợ điện, nông dân công nghệ cao. Điều quan trọng là chọn nghề phù hợp với năng lực, sở thích của em và làm nghề đó bằng cả sự tận tâm.' },
      { note: 'Định hướng nghề ở lớp 8 không phải để "chốt" ngay một nghề, mà để em bắt đầu quan sát, tìm hiểu và dần dần nhận ra mình hợp với hướng nào.' },
    ],
    [
      { q: 'Em thích máy tính và giải các bài toán logic. Nhóm ngành nào phù hợp và cần Holland gì?', a: 'Em phù hợp với nhóm ngành Công nghệ thông tin – Khoa học máy tính. Nhóm này cần chủ yếu sở thích I (Investigative — thích nghiên cứu, giải quyết vấn đề) kết hợp với C (Conventional — làm việc có quy trình, logic). Em có thể bắt đầu tìm hiểu các nghề như lập trình viên, kĩ sư phần mềm, chuyên viên an ninh mạng và thử học lập trình cơ bản ngay từ bây giờ.' },
      { q: 'Bố mẹ nói "học gì cũng được, miễn là kiếm nhiều tiền". Em nên hiểu thế nào về việc chọn nghề?', a: 'Tiền là một yếu tố quan trọng nhưng không phải tất cả. Nếu chọn nghề chỉ vì tiền mà không hợp sở thích, năng lực, em sẽ chán nản và khó giỏi. Ngược lại, khi làm nghề phù hợp và làm giỏi, thu nhập sẽ đến một cách tự nhiên. Em nên cân nhắc cả ba yếu tố: sở thích, năng lực và nhu cầu xã hội (nghề có việc làm, có thu nhập ổn). Đó mới là lựa chọn bền vững.' },
      { q: 'AI ngày càng giỏi, liệu sau này nghề nào cũng bị máy thay thế hết không?', a: 'AI sẽ thay đổi nhiều nghề và làm một số công việc lặp đi lặp lại tốt hơn con người, nhưng những công việc đòi hỏi sáng tạo, đồng cảm, lãnh đạo, giải quyết vấn đề phức tạp và giao tiếp con người vẫn rất cần con người. Vì vậy em đừng quá lo. Thay vào đó, hãy rèn các kĩ năng "rất người" và tinh thần học hỏi suốt đời để luôn thích nghi được với những thay đổi của thế giới nghề nghiệp.' },
    ]
  ),

  'S8HDTN-w10-quiz': L(
    'An toàn mạng nâng cao — Quyền riêng tư cá nhân',
    'Trên không gian mạng, thông tin cá nhân của em quý giá như chìa khoá ngôi nhà vậy. Để hớ hênh, kẻ xấu có thể lợi dụng để lừa đảo, bắt nạt hay làm hại em. Cùng cô học cách "khoá cửa" thật chặt cho ngôi nhà số của mình nhé!',
    [
      'Hiểu khái niệm thông tin cá nhân và vì sao cần bảo vệ.',
      'Biết cách thiết lập quyền riêng tư trên mạng xã hội.',
      'Nhận diện và phòng tránh hành vi phát tán thông tin cá nhân (doxxing).',
      'Có ý thức cẩn trọng với dấu chân số của bản thân.',
    ],
    [
      { h: 'Thông tin cá nhân gồm những gì?' },
      { p: 'Thông tin cá nhân (còn gọi là PII) là những dữ liệu giúp nhận ra hoặc tìm đến chính em, gồm: họ tên thật, ngày sinh, địa chỉ nhà, số điện thoại, số căn cước công dân, ảnh khuôn mặt, tên trường lớp, lịch sinh hoạt hằng ngày, thậm chí cả vị trí em check-in. Khi rơi vào tay kẻ xấu, những thông tin này có thể bị lợi dụng để lừa đảo hoặc gây hại.' },
      { h: 'Dấu chân số — điều em để lại trên mạng' },
      { p: 'Mỗi bài đăng, bình luận, ảnh, video em chia sẻ đều để lại "dấu chân số" tồn tại rất lâu, đôi khi mãi mãi. Một bức ảnh hay câu nói thiếu cân nhắc hôm nay có thể ảnh hưởng đến hình ảnh của em nhiều năm sau, khi xin học bổng hay xin việc. Vì vậy, hãy suy nghĩ kĩ trước khi đăng bất cứ thứ gì.' },
      { h: 'Thiết lập quyền riêng tư trên mạng xã hội' },
      { ul: [
        'Facebook: đặt trang cá nhân ở chế độ "chỉ bạn bè"; kiểm soát ai có thể tìm thấy em.',
        'Instagram/TikTok: chuyển tài khoản sang chế độ riêng tư; tắt chia sẻ vị trí.',
        'Không bật định vị (location) khi đăng ảnh, không check-in vị trí thực.',
        'Định kì rà soát danh sách bạn bè, gỡ những tài khoản lạ.',
      ] },
      { h: 'Thông tin TUYỆT ĐỐI không công khai' },
      { ul: [
        'Địa chỉ nhà chi tiết, tên trường lớp kèm khuôn mặt.',
        'Số điện thoại, số căn cước, thông tin tài khoản ngân hàng.',
        'Lịch trình bố mẹ đi vắng, thông tin tài sản gia đình.',
        'Mật khẩu các tài khoản — không chia sẻ cho bất kì ai, kể cả bạn thân.',
      ] },
      { h: 'Doxxing — mối nguy hiểm cần biết' },
      { p: 'Doxxing là hành vi đào tìm và phát tán thông tin cá nhân của ai đó lên mạng nhằm mục đích xấu — khiến nạn nhân bị quấy rối, bắt nạt, đe doạ, thậm chí bị hành hung ngoài đời. Em vừa cần bảo vệ mình khỏi bị doxxing, vừa tuyệt đối không tham gia phát tán thông tin của người khác.' },
      { h: 'Cách tự bảo vệ' },
      { ul: [
        'Hạn chế công khai thông tin nhận dạng và vị trí.',
        'Dùng mật khẩu mạnh, khác nhau cho từng tài khoản, bật xác thực hai lớp.',
        'Không kết bạn, không nhận lời mời từ người lạ.',
        'Cẩn trọng với các đường link, ứng dụng yêu cầu quá nhiều quyền truy cập.',
      ] },
      { note: 'Quyền riêng tư trên mạng cũng quan trọng như khoá cửa nhà. Một phút cẩn thận hôm nay tránh được nhiều rắc rối về sau.' },
    ],
    [
      { q: 'Em định đăng ảnh "Cả nhà đi du lịch Đà Nẵng 5 ngày!" kèm ảnh ngôi nhà. Tại sao điều này nguy hiểm?', a: 'Bài đăng này vô tình thông báo cho kẻ xấu rằng nhà em đang không có ai trong 5 ngày, lại còn cho thấy nhà em trông thế nào. Đây là thông tin lí tưởng cho kẻ trộm. Em nên đợi đến khi về nhà mới chia sẻ ảnh kỉ niệm, và không công khai địa chỉ hay hình ảnh nhận diện ngôi nhà. Niềm vui chia sẻ không đáng để đánh đổi sự an toàn của gia đình.' },
      { q: 'Một nhóm bạn lập nhóm chat để "bóc phốt", chia sẻ ảnh và số điện thoại của một bạn họ ghét. Em được rủ tham gia. Em nên làm gì?', a: 'Em tuyệt đối không tham gia — đây chính là hành vi doxxing, vừa độc ác vừa vi phạm pháp luật. Em từ chối và có thể nói: "Mình không tham gia chuyện này, làm vậy là sai và có thể bị xử lí." Nếu thấy bạn nạn nhân đang gặp nguy hiểm, em báo cho thầy cô hoặc người lớn để can thiệp. Đứng về phía đúng, dù số đông làm sai.' },
      { q: 'Một ứng dụng game miễn phí yêu cầu truy cập danh bạ, vị trí, ảnh và micro của em. Em có nên đồng ý không?', a: 'Em nên cảnh giác và từ chối những quyền không cần thiết. Một game đơn giản không có lí do gì cần đọc danh bạ, vị trí hay micro của em — đó có thể là cách thu thập thông tin cá nhân để bán hoặc lợi dụng. Em chỉ cấp quyền thật sự cần thiết, và nếu ứng dụng đòi quá nhiều quyền đáng ngờ thì không nên cài đặt. Tốt nhất nên hỏi ý kiến bố mẹ trước khi tải app.' },
    ]
  ),

  'S8HDTN-w11-quiz': L(
    'An toàn mạng nâng cao — Deepfake và tin giả',
    'Công nghệ ngày nay có thể tạo ra video, hình ảnh, giọng nói giả mạo y như thật. Giữa biển thông tin thật-giả lẫn lộn, biết cách kiểm chứng là kĩ năng sống còn. Cùng cô học cách trở thành "người dùng mạng thông thái" nhé!',
    [
      'Hiểu tin giả (fake news) và deepfake là gì.',
      'Nhận biết các dấu hiệu của tin giả.',
      'Biết các bước kiểm chứng thông tin.',
      'Có thái độ trách nhiệm: không tin vội, không chia sẻ vội.',
    ],
    [
      { h: 'Tin giả (fake news) là gì?' },
      { p: 'Tin giả là những thông tin sai sự thật được tạo ra và lan truyền có chủ đích, nhằm gây hiểu lầm, câu view, lừa đảo hoặc thao túng dư luận. Tin giả thường được "trang điểm" để trông giống tin thật, đánh vào cảm xúc khiến người đọc tin và chia sẻ ngay mà không kiểm chứng.' },
      { h: 'Deepfake — công nghệ giả mạo siêu thực' },
      { p: 'Deepfake là công nghệ dùng trí tuệ nhân tạo để tạo video, hình ảnh hoặc giọng nói giả mạo giống hệt người thật. Kẻ xấu có thể ghép mặt người nổi tiếng vào video, giả giọng người thân để gọi điện xin tiền, hoặc tạo phát ngôn giả. Deepfake ngày càng tinh vi, khó phân biệt bằng mắt thường.' },
      { h: 'Tác hại của tin giả và deepfake' },
      { ul: [
        'Lừa đảo tài chính: giả người thân, giả công an, ngân hàng để chiếm đoạt tiền.',
        'Bôi nhọ, vu khống: ghép mặt người khác vào video xấu để hạ uy tín.',
        'Gây hoang mang xã hội: tung tin sai về dịch bệnh, thiên tai.',
        'Bắt nạt trên mạng: chế ảnh, dựng video giả để chế giễu bạn bè.',
      ] },
      { h: 'Dấu hiệu nhận biết tin giả' },
      { ul: [
        'Tiêu đề giật gân, dùng từ tuyệt đối: "SỐC!", "100%", "kinh hoàng".',
        'Không ghi nguồn, không tên tác giả, không ngày tháng rõ ràng.',
        'Địa chỉ trang web lạ, na ná trang chính thống (ví dụ đổi đuôi .net thành .org).',
        'Ảnh bị cắt ghép, video bị cắt khỏi ngữ cảnh; lỗi chính tả nhiều.',
        'Nội dung đánh mạnh vào cảm xúc tức giận, sợ hãi để em chia sẻ ngay.',
      ] },
      { h: 'Các bước kiểm chứng thông tin' },
      { ul: [
        'Kiểm tra nguồn: thông tin này có trên báo lớn, uy tín không (VTV, Tuổi Trẻ, Thanh Niên)?',
        'Đối chiếu nhiều nguồn: nhiều nơi uy tín cùng đưa tin thì khả năng đúng cao hơn.',
        'Tìm ảnh ngược (reverse image search) để biết ảnh gốc từ đâu, có bị dùng sai không.',
        'Với deepfake: chú ý chi tiết bất thường (chớp mắt lạ, ánh sáng, viền mặt, giọng méo).',
        'Tra cứu các trang chuyên kiểm chứng (fact-check) khi nghi ngờ.',
      ] },
      { h: 'Trách nhiệm của em' },
      { p: 'Chia sẻ tin giả, dù vô tình, cũng góp phần lan truyền cái sai và có thể gây hại cho người khác. Vì vậy, quy tắc vàng là: "Chưa kiểm chứng thì chưa chia sẻ". Khi phát hiện tin giả, em có thể nhẹ nhàng đính chính để mọi người không bị lừa.' },
      { note: 'Trong thời đại số, người thông minh không phải là người biết nhiều tin, mà là người biết phân biệt tin nào đáng tin.' },
    ],
    [
      { q: 'Em nhận được cuộc gọi video, thấy mặt và nghe giọng đúng là bạn thân, bạn ấy khóc lóc xin em chuyển gấp 2 triệu. Em nên làm gì?', a: 'Em cảnh giác vì đây có thể là deepfake — kẻ xấu giả mặt và giọng bạn em. Em không chuyển tiền ngay. Em cúp máy và gọi lại trực tiếp vào số điện thoại thật của bạn (hoặc gọi cho bố mẹ bạn) để xác minh. Em cũng có thể hỏi một câu chỉ hai đứa biết. Việc dừng lại xác minh vài phút có thể giúp em tránh bị lừa mất tiền.' },
      { q: 'Trên mạng lan truyền tin "WHO khuyến cáo ngừng tiêm tất cả vắc xin". Làm sao em kiểm chứng?', a: 'Em không tin và không chia sẻ ngay. Để kiểm chứng, em vào thẳng trang chính thức của WHO hoặc Bộ Y tế Việt Nam để xem họ có thực sự công bố như vậy không. Em cũng tìm xem các báo lớn, uy tín có đưa tin tương tự không. Thông tin về sức khoẻ cộng đồng nếu sai có thể gây hậu quả nghiêm trọng, nên càng phải kiểm chứng kĩ từ nguồn gốc.' },
      { q: 'Bạn em gửi một bức ảnh chế mặt một bạn khác vào video hài hước và bảo em chia sẻ cho vui. Em nên làm gì?', a: 'Em không chia sẻ. Dù bạn nói "cho vui", việc ghép mặt người khác vào ảnh/video mà không được phép là xúc phạm và có thể khiến bạn nạn nhân bị tổn thương nặng nề, thậm chí là hành vi vi phạm pháp luật. Em từ chối và khuyên bạn xoá đi: "Cái này không vui đâu, bạn ấy sẽ buồn lắm, mình đừng làm vậy." Niềm vui không nên xây trên nỗi đau của người khác.' },
    ]
  ),

  'S8HDTN-w12-quiz': L(
    'Bảo vệ môi trường — Biến đổi khí hậu',
    'Biến đổi khí hậu là một trong những thách thức lớn nhất của thế kỉ này, và Việt Nam là một trong những nước chịu ảnh hưởng nặng nề nhất. Tin vui là mỗi học sinh đều có thể góp phần. Cùng cô tìm hiểu và hành động nhé!',
    [
      'Hiểu biến đổi khí hậu là gì và nguyên nhân của nó.',
      'Biết những tác động của biến đổi khí hậu đến Việt Nam.',
      'Nêu được các hành động cá nhân góp phần ứng phó.',
      'Có ý thức trách nhiệm với môi trường sống.',
    ],
    [
      { h: 'Biến đổi khí hậu là gì?' },
      { p: 'Biến đổi khí hậu là sự thay đổi lâu dài của nhiệt độ và thời tiết Trái Đất. Hiện nay, Trái Đất đang nóng lên do con người thải quá nhiều khí nhà kính (CO₂, mêtan) từ việc đốt than, dầu, khí; chặt phá rừng; chăn nuôi và sản xuất công nghiệp. Hậu quả là thời tiết trở nên cực đoan: nắng nóng kỉ lục, bão lũ dữ dội, hạn hán kéo dài.' },
      { h: 'Hiệu ứng nhà kính hoạt động thế nào?' },
      { p: 'Khí nhà kính trong bầu khí quyển giống như một lớp chăn giữ nhiệt cho Trái Đất. Một lớp vừa đủ giúp Trái Đất ấm áp để sống được. Nhưng khi con người thải quá nhiều, "lớp chăn" dày lên, giữ nhiệt quá mức khiến Trái Đất nóng dần lên — đó là nguyên nhân cốt lõi của biến đổi khí hậu.' },
      { h: 'Tác động đến Việt Nam' },
      { ul: [
        'Đồng bằng sông Cửu Long bị sạt lở, xâm nhập mặn, mất đất canh tác.',
        'Bão ngày càng mạnh, lũ lụt nghiêm trọng ở miền Trung.',
        'Nắng nóng kéo dài, hạn hán ảnh hưởng nông nghiệp và nước sinh hoạt.',
        'Nước biển dâng đe doạ các vùng ven biển, đô thị thấp.',
        'Đa dạng sinh học suy giảm, nhiều loài bị đe doạ.',
      ] },
      { h: 'Hành động cá nhân của em' },
      { ul: [
        'Tiết kiệm điện: tắt đèn, quạt, điều hoà khi không dùng.',
        'Đi bộ, đi xe đạp cho quãng đường ngắn thay vì xe máy.',
        'Giảm rác thải nhựa, tái sử dụng, phân loại rác.',
        'Ăn nhiều rau quả hơn; hạn chế lãng phí thức ăn.',
        'Trồng và chăm sóc cây xanh; tham gia hoạt động bảo vệ môi trường.',
      ] },
      { h: 'Vì sao hành động nhỏ lại có ý nghĩa lớn?' },
      { p: 'Một mình em tiết kiệm điện thì có vẻ chẳng đáng kể. Nhưng nếu hàng triệu, hàng tỉ người cùng làm những việc nhỏ như vậy, tác động cộng lại là khổng lồ. Hơn nữa, hành động của em còn lan toả — truyền cảm hứng cho gia đình, bạn bè cùng thay đổi. Em là một phần của giải pháp.' },
      { note: 'Trái Đất là ngôi nhà chung duy nhất của chúng ta. Bảo vệ môi trường không phải việc của riêng ai, mà là trách nhiệm của mỗi người, bắt đầu từ những việc nhỏ mỗi ngày.' },
    ],
    [
      { q: 'Vì sao việc ăn quá nhiều thịt bò lại liên quan đến biến đổi khí hậu?', a: 'Chăn nuôi bò thải ra rất nhiều khí mêtan — một loại khí nhà kính có khả năng giữ nhiệt mạnh hơn CO₂ nhiều lần. Ngoài ra, việc chăn nuôi quy mô lớn còn tiêu tốn nhiều đất, nước và thức ăn. Vì vậy, ăn cân đối hơn, tăng rau quả và giảm bớt thịt đỏ không chỉ tốt cho sức khoẻ mà còn giúp giảm phát thải khí nhà kính, góp phần bảo vệ môi trường.' },
      { q: 'Khu vực nào của Việt Nam chịu ảnh hưởng nặng nề nhất từ biến đổi khí hậu và vì sao?', a: 'Đồng bằng sông Cửu Long là một trong những khu vực chịu ảnh hưởng nặng nề nhất. Do địa hình thấp, gần biển, nơi đây đang bị nước biển dâng gây xâm nhập mặn, sạt lở bờ sông bờ biển và mất dần đất canh tác. Điều này ảnh hưởng trực tiếp đến sản xuất lúa gạo — vốn là vựa lương thực của cả nước — và đời sống hàng triệu người dân.' },
      { q: 'Em thấy việc bảo vệ môi trường là chuyện của người lớn và nhà nước, học sinh thì làm được gì? Suy nghĩ này đúng không?', a: 'Suy nghĩ này chưa đúng. Tuy học sinh không quyết định chính sách lớn, nhưng những hành động nhỏ hằng ngày của em — tiết kiệm điện nước, giảm rác nhựa, trồng cây, đi xe đạp — khi nhân lên với hàng triệu học sinh sẽ tạo tác động lớn. Quan trọng hơn, em còn có thể tuyên truyền, vận động gia đình và bạn bè cùng làm. Mỗi người là một phần của giải pháp, và thay đổi luôn bắt đầu từ những việc nhỏ.' },
    ]
  ),

  'S8HDTN-w13-quiz': L(
    'Tiêu dùng có trách nhiệm',
    'Mỗi đồng tiền em chi tiêu giống như một "lá phiếu" — khi em chọn mua sản phẩm của doanh nghiệp tử tế, em đang ủng hộ những điều tốt đẹp cho xã hội. Cùng cô học cách trở thành người tiêu dùng thông minh và có trách nhiệm nhé!',
    [
      'Hiểu thế nào là tiêu dùng thông minh và có trách nhiệm.',
      'Biết nhận diện sản phẩm tốt cho sức khoẻ và môi trường.',
      'Biết tránh lãng phí và chống lại tiêu dùng bốc đồng.',
      'Hiểu sức mạnh của người tiêu dùng trong việc tạo thay đổi.',
    ],
    [
      { h: 'Tiêu dùng thông minh là gì?' },
      { p: 'Tiêu dùng thông minh là biết cân nhắc kĩ trước khi mua: mình có thật sự cần không, chất lượng ra sao, giá có hợp lí không, có sản phẩm thay thế tốt hơn không. Người tiêu dùng thông minh không bị quảng cáo dẫn dắt, không mua theo cảm xúc nhất thời.' },
      { h: 'Tiêu dùng có trách nhiệm là gì?' },
      { p: 'Tiêu dùng có trách nhiệm là chọn sản phẩm, dịch vụ vừa tốt cho mình, vừa ít gây hại cho môi trường và xã hội. Đó là ưu tiên sản phẩm thân thiện môi trường, doanh nghiệp đối xử công bằng với người lao động, không bóc lột, không gây hại sức khoẻ cộng đồng.' },
      { h: 'Cách nhận diện sản phẩm tốt' },
      { ul: [
        'Bao bì có thể tái chế, ít nhựa dùng một lần.',
        'Sản xuất trong nước hoặc gần — giảm chi phí và khí thải vận chuyển.',
        'Có chứng nhận an toàn, nguồn gốc rõ ràng, hạn sử dụng còn dài.',
        'Doanh nghiệp uy tín, không có tai tiếng bóc lột lao động.',
        'Đọc kĩ thành phần, nhất là với thực phẩm và mĩ phẩm.',
      ] },
      { h: 'Chống tiêu dùng bốc đồng' },
      { ul: [
        'Áp dụng "quy tắc 24 giờ": muốn mua món gì, chờ một ngày rồi quyết.',
        'Lập danh sách trước khi đi mua sắm, bám theo danh sách.',
        'Phân biệt "cần" (thật sự thiếu) và "muốn" (thích nhất thời).',
        'Cảnh giác với các chiêu giảm giá, "sắp hết hàng" tạo cảm giác gấp gáp.',
      ] },
      { h: 'Tránh lãng phí' },
      { ul: [
        'Mua đủ dùng, không tích trữ thừa thãi (nhất là đồ ăn).',
        'Sửa chữa, tận dụng thay vì vứt bỏ ngay.',
        'Cho, tặng, trao đổi đồ cũ còn dùng được.',
        'Hạn chế "thời trang nhanh" (quần áo rẻ, mặc vài lần rồi bỏ).',
      ] },
      { h: 'Sức mạnh của người tiêu dùng' },
      { p: 'Khi nhiều người cùng chọn sản phẩm thân thiện môi trường và tẩy chay sản phẩm gây hại, các doanh nghiệp buộc phải thay đổi để chiều theo khách hàng. Vì vậy, mỗi lựa chọn mua sắm của em góp phần định hình thị trường theo hướng tốt hơn. Đây là quyền lực thật sự của người tiêu dùng.' },
      { note: 'Tiêu dùng thông minh không phải là keo kiệt hay không mua gì, mà là chi tiêu có suy nghĩ, đúng nhu cầu và có trách nhiệm với cộng đồng.' },
    ],
    [
      { q: '"Thời trang nhanh" (fast fashion) có hại gì mà nên hạn chế?', a: 'Thời trang nhanh là quần áo giá rẻ, mẫu mã thay đổi liên tục để khuyến khích người ta mua nhiều, mặc vài lần rồi bỏ. Hệ quả là tạo ra lượng rác thải khổng lồ, tiêu tốn rất nhiều nước và hoá chất để sản xuất, đồng thời nhiều xưởng may bóc lột công nhân với điều kiện và đồng lương thấp. Hạn chế thời trang nhanh, chọn quần áo bền và dùng lâu là cách tiêu dùng có trách nhiệm hơn.' },
      { q: 'Em thấy một món đồ chơi đang giảm giá "chỉ còn hôm nay" và rất muốn mua dù không thật cần. Em nên làm gì?', a: 'Em hãy nhận ra đây là chiêu tạo cảm giác gấp gáp để khiến em mua bốc đồng. Em áp dụng quy tắc 24 giờ: tự hỏi mình có thật sự cần món này không, hay chỉ thích nhất thời? Đợi một ngày, thường em sẽ thấy mình không cần đến nó. Phần lớn các đợt "giảm giá hôm nay" rồi sẽ có đợt khác — đừng để chúng điều khiển quyết định của em.' },
      { q: 'Vì sao mỗi đồng em chi tiêu được ví như một "lá phiếu"?', a: 'Vì khi em mua sản phẩm của một doanh nghiệp, em đang ủng hộ và giúp doanh nghiệp đó tồn tại, phát triển. Nếu em chọn mua hàng của những doanh nghiệp làm ăn tử tế, thân thiện môi trường, đối xử tốt với người lao động, em đang "bỏ phiếu" cho những giá trị tốt đẹp. Ngược lại, khi nhiều người ngừng mua sản phẩm gây hại, doanh nghiệp buộc phải thay đổi. Vì vậy lựa chọn tiêu dùng của em thật sự có sức mạnh tạo thay đổi cho xã hội.' },
    ]
  ),

  'S8HDTN-w14-quiz': L(
    'Tham gia hoạt động cộng đồng — Tình nguyện',
    'Cho đi không làm em nghèo đi, mà làm em giàu có hơn về tâm hồn. Hoạt động tình nguyện vừa giúp ích cho người khác, vừa giúp chính em trưởng thành. Cùng cô tìm hiểu cách tham gia tình nguyện thật ý nghĩa nhé!',
    [
      'Hiểu giá trị của hoạt động tình nguyện với bản thân và cộng đồng.',
      'Biết các hình thức tình nguyện phù hợp với học sinh.',
      'Hiểu tinh thần tình nguyện đúng đắn.',
      'Biết cách tham gia an toàn và hiệu quả.',
    ],
    [
      { h: 'Tình nguyện là gì?' },
      { p: 'Tình nguyện là tự nguyện dành thời gian, công sức để giúp đỡ người khác và cộng đồng mà không đòi hỏi đền đáp vật chất. Cốt lõi nằm ở chữ "tự nguyện" — em làm vì lòng tốt và mong muốn đóng góp, chứ không phải vì bị ép buộc hay để khoe khoang.' },
      { h: 'Lợi ích cho cộng đồng và cho chính em' },
      { ul: [
        'Giúp đỡ những người khó khăn, làm xã hội tốt đẹp hơn.',
        'Rèn kĩ năng giao tiếp, làm việc nhóm, giải quyết vấn đề.',
        'Mở rộng hiểu biết về xã hội, biết trân trọng những gì mình có.',
        'Tích luỹ trải nghiệm quý cho hồ sơ học tập, học bổng sau này.',
        'Mang lại niềm vui, cảm giác có ích và hạnh phúc.',
      ] },
      { h: 'Hình thức tình nguyện phù hợp với học sinh' },
      { ul: [
        'Dạy kèm, kèm bài cho các em nhỏ trong xóm, trong khu phố.',
        'Quyên góp sách vở, quần áo cho bạn vùng khó khăn.',
        'Dọn vệ sinh công viên, bãi biển, khu dân cư (có người lớn).',
        'Thăm hỏi, giúp đỡ người già, người neo đơn ở khu phố.',
        'Tham gia chiến dịch trồng cây, bảo vệ môi trường của Đoàn – Đội.',
      ] },
      { h: 'Tinh thần tình nguyện đúng đắn' },
      { ul: [
        'Làm vì thật sự muốn giúp, không phải để lấy điểm hay khoe trên mạng.',
        'Giúp đỡ với sự tôn trọng, không thương hại hay coi thường người nhận.',
        'Khiêm tốn, không "diễn" trước máy quay, không khoe khoang.',
        'Làm tới nơi tới chốn, đã nhận việc thì có trách nhiệm.',
      ] },
      { h: 'Tham gia an toàn' },
      { ul: [
        'Luôn hỏi và xin phép bố mẹ trước khi tham gia.',
        'Tham gia qua tổ chức uy tín: Đoàn Thanh niên, Đội, Hội Chữ thập đỏ, câu lạc bộ trường.',
        'Cảnh giác với tổ chức lạ yêu cầu đóng tiền hoặc thông tin cá nhân.',
        'Đi cùng nhóm, có người lớn hướng dẫn, không đi một mình đến nơi xa lạ.',
      ] },
      { note: 'Tình nguyện không cần điều gì to tát. Một giờ dạy em nhỏ học, một quyển sách cũ trao đi, một lời hỏi thăm cụ già hàng xóm — đều là những việc tử tế đáng quý.' },
    ],
    [
      { q: 'Một bạn nói "Mình đi tình nguyện chủ yếu để chụp ảnh đăng mạng cho oai và để được cộng điểm thôi". Suy nghĩ này có gì chưa đúng?', a: 'Suy nghĩ này làm mất đi ý nghĩa đẹp đẽ của tình nguyện. Khi làm vì khoe khoang hay vì điểm số, người được giúp có thể cảm nhận được sự thiếu chân thành, thậm chí cảm thấy bị lợi dụng làm "đạo cụ" chụp ảnh. Tình nguyện đúng nghĩa xuất phát từ lòng tốt thật sự và sự tôn trọng người nhận. Điểm số hay trải nghiệm tốt sẽ tự đến như kết quả, chứ không nên là mục đích chính.' },
      { q: 'Em muốn tham gia tình nguyện nhưng không biết bắt đầu từ đâu. Em nên làm gì?', a: 'Em có thể bắt đầu từ những việc gần gũi và an toàn. Trước hết, em hỏi ý kiến bố mẹ và tìm đến các tổ chức uy tín như Đội Thiếu niên, Đoàn Thanh niên ở trường, hoặc các câu lạc bộ. Em cũng có thể bắt đầu nhỏ ngay trong khu phố: kèm em nhỏ học bài, giúp cụ già hàng xóm. Điều quan trọng là chọn việc phù hợp sức và luôn có người lớn biết và đồng hành.' },
      { q: 'Một nhóm tự xưng "tổ chức từ thiện" rủ em tham gia nhưng yêu cầu mỗi người đóng 300.000 đồng và cung cấp số tài khoản ngân hàng. Em nên làm gì?', a: 'Em phải hết sức cảnh giác — đây có thể là lừa đảo. Em không đóng tiền và không cung cấp thông tin cá nhân hay tài khoản. Em báo cho bố mẹ và thầy cô để cùng kiểm tra tính minh bạch của tổ chức này. Các hoạt động tình nguyện uy tín thường không bắt học sinh đóng khoản tiền lớn không rõ ràng. Khi muốn làm từ thiện, em nên thông qua nhà trường hoặc các tổ chức chính thống để đảm bảo an toàn và đúng mục đích.' },
    ]
  ),

  'S8HDTN-w15-quiz': L(
    'Phòng chống xâm hại — Quyền cơ thể',
    'Cơ thể của em là của riêng em, và em có quyền được an toàn tuyệt đối. Không ai có quyền xâm phạm em, dù họ là ai. Cùng cô tìm hiểu cách nhận biết, phòng tránh và lên tiếng để tự bảo vệ mình nhé. Đây là bài học rất quan trọng.',
    [
      'Hiểu quyền bất khả xâm phạm về thân thể của bản thân.',
      'Nhận diện được các hành vi xâm hại.',
      'Biết các bước phản ứng khi gặp tình huống không an toàn.',
      'Nhớ các địa chỉ và số điện thoại hỗ trợ.',
    ],
    [
      { h: 'Quyền với cơ thể của em' },
      { p: 'Em có quyền tuyệt đối với cơ thể mình. Không một ai — kể cả người thân, người quen, người lớn — được phép chạm vào em theo cách khiến em không thoải mái, nếu không có sự đồng ý của em. Đây là quyền cơ bản được pháp luật bảo vệ.' },
      { h: 'Vùng riêng tư' },
      { p: 'Vùng riêng tư là những phần cơ thể được đồ lót/đồ bơi che (ngực, mông, bộ phận sinh dục) và cả miệng. Không ai được chạm, nhìn, hay yêu cầu em chụp ảnh những vùng này. Tương tự, em cũng không được làm vậy với người khác.' },
      { h: 'Các hành vi xâm hại cần nhận biết' },
      { ul: [
        'Cố tình chạm vào vùng riêng tư của em.',
        'Yêu cầu em chạm vào cơ thể họ, hoặc cho xem/chụp ảnh vùng riêng tư.',
        'Cho em xem hình ảnh, video không phù hợp.',
        'Dùng lời lẽ, hành động khiến em thấy khó chịu, sợ hãi về mặt cơ thể.',
        'Dụ dỗ, đe doạ, yêu cầu em giữ "bí mật" về những điều này.',
      ] },
      { h: 'Quy tắc bảo vệ bản thân: KHÔNG – BỎ ĐI – KỂ NGAY' },
      { ul: [
        'KHÔNG: nói "Không!" thật dứt khoát, em có quyền từ chối.',
        'BỎ ĐI: rời khỏi tình huống đó càng nhanh càng tốt, tìm nơi đông người.',
        'KỂ NGAY: kể với người lớn tin cậy ngay lập tức, không giữ trong lòng.',
      ] },
      { h: 'Ghi nhớ quan trọng' },
      { ul: [
        'Bị xâm hại KHÔNG BAO GIỜ là lỗi của em, dù trong hoàn cảnh nào.',
        'Đừng giữ "bí mật" theo lời kẻ xấu — hãy kể cho người lớn tin cậy.',
        'Nếu một người không tin em, hãy kể cho người khác cho đến khi được giúp.',
        'Cảm xúc sợ hãi, xấu hổ là tự nhiên, nhưng im lặng sẽ khiến em bị hại lâu hơn.',
      ] },
      { h: 'Địa chỉ hỗ trợ' },
      { ul: [
        '111 – Tổng đài Quốc gia Bảo vệ Trẻ em (miễn phí, 24/7).',
        '113 – Công an khi có nguy hiểm khẩn cấp.',
        'Bố mẹ, thầy cô chủ nhiệm, người thân tin cậy.',
        'Phòng tư vấn tâm lí học đường (nếu trường có).',
      ] },
      { note: 'Pháp luật Việt Nam bảo vệ nghiêm ngặt trẻ em. Xâm hại trẻ em là tội rất nặng. Em không có gì phải sợ hay xấu hổ khi lên tiếng — người sai là kẻ xâm hại, không phải em.' },
    ],
    [
      { q: 'Một người thân chạm vào vùng riêng tư của em rồi nói "đây là cách bác thể hiện yêu thương cháu, đừng kể với ai nhé". Điều đó có đúng không?', a: 'Hoàn toàn KHÔNG đúng. Đây là hành vi xâm hại, dù người đó là người thân và viện cớ "yêu thương". Yêu thương thật sự không bao giờ đi kèm việc chạm vào vùng riêng tư và bắt giữ bí mật. Em phải kể NGAY cho bố mẹ hoặc người lớn tin cậy khác, hoặc gọi 111. Lời dặn "đừng kể với ai" chính là dấu hiệu của kẻ làm điều sai. Em không có lỗi gì cả.' },
      { q: 'Số điện thoại Tổng đài Quốc gia Bảo vệ Trẻ em là số mấy và dùng khi nào?', a: 'Đó là số 111 — Tổng đài Quốc gia Bảo vệ Trẻ em, hoạt động miễn phí 24 giờ mỗi ngày, tất cả các ngày trong tuần. Em có thể gọi khi bị xâm hại, bị bạo hành, bị bắt nạt nghiêm trọng, hoặc khi chứng kiến một bạn khác đang gặp nguy hiểm. Các chuyên viên ở đây sẽ lắng nghe, tư vấn và hỗ trợ em một cách bảo mật. Em nên ghi nhớ số này.' },
      { q: 'Em đã kể với một người lớn về việc mình bị quấy rối nhưng người đó không tin và bảo em "nghĩ nhiều". Em nên làm gì tiếp theo?', a: 'Em không được bỏ cuộc và không tự nghi ngờ bản thân. Việc một người không tin không có nghĩa em sai. Em hãy tiếp tục kể cho một người lớn tin cậy khác — bố mẹ, thầy cô chủ nhiệm, người thân — cho đến khi có người lắng nghe và giúp đỡ. Em cũng có thể gọi trực tiếp Tổng đài 111 để được hỗ trợ chuyên nghiệp. Sự an toàn của em là quan trọng nhất, hãy kiên trì lên tiếng.' },
    ]
  ),

  'S8HDTN-w16-quiz': L(
    'Kỹ năng sống — Đối phó stress',
    'Căng thẳng (stress) là một phần tự nhiên của cuộc sống — ai cũng từng trải qua. Điều quan trọng không phải là loại bỏ hoàn toàn căng thẳng, mà là biết nhận diện và quản lí nó. Cùng cô học cách giữ vững tinh thần nhé!',
    [
      'Nhận biết các dấu hiệu của căng thẳng.',
      'Hiểu các nguyên nhân gây căng thẳng ở lứa tuổi học sinh.',
      'Biết các cách giảm căng thẳng lành mạnh.',
      'Biết khi nào cần tìm sự hỗ trợ chuyên môn.',
    ],
    [
      { h: 'Căng thẳng là gì? Có hoàn toàn xấu không?' },
      { p: 'Căng thẳng là phản ứng của cơ thể và tâm trí trước những áp lực, thử thách. Một mức căng thẳng vừa phải lại có ích — nó giúp em tập trung, nỗ lực hơn trước kì thi hay khi làm việc quan trọng. Vấn đề chỉ xảy ra khi căng thẳng quá lớn hoặc kéo dài, ảnh hưởng xấu đến sức khoẻ và cuộc sống.' },
      { h: 'Dấu hiệu của căng thẳng' },
      { ul: [
        'Về thể chất: đau đầu, đau bụng, tim đập nhanh, mất ngủ, mệt mỏi.',
        'Về cảm xúc: cáu gắt, lo lắng, buồn bã, dễ khóc, bồn chồn.',
        'Về hành vi: ăn quá nhiều hoặc bỏ ăn, lười học, tránh né mọi người.',
        'Về suy nghĩ: khó tập trung, hay quên, suy nghĩ tiêu cực.',
      ] },
      { h: 'Nguyên nhân gây căng thẳng ở học sinh' },
      { ul: [
        'Áp lực học tập, điểm số, kì thi.',
        'Mâu thuẫn với bạn bè, gia đình.',
        'So sánh bản thân với người khác trên mạng xã hội.',
        'Những thay đổi của cơ thể và tâm lí tuổi dậy thì.',
        'Kì vọng quá cao từ bản thân hoặc người lớn.',
      ] },
      { h: 'Các cách giảm căng thẳng lành mạnh' },
      { ul: [
        'Vận động: chạy bộ, đạp xe, chơi thể thao, nhảy — giải toả rất tốt.',
        'Ngủ đủ giấc (8–10 tiếng), ăn uống điều độ.',
        'Trò chuyện, chia sẻ với người tin cậy thay vì dồn nén.',
        'Thực hành hít thở sâu, thư giãn, thiền 5–10 phút mỗi ngày.',
        'Làm điều mình thích: nghe nhạc, vẽ, đọc sách; hạn chế mạng xã hội.',
        'Chia nhỏ công việc, lập kế hoạch để bớt cảm giác quá tải.',
      ] },
      { h: 'Cách ứng phó SAI cần tránh' },
      { ul: [
        'Trút giận lên người khác hoặc lên đồ vật.',
        'Vùi đầu vào game, mạng xã hội để trốn tránh.',
        'Bỏ ăn, thức khuya, tự cô lập bản thân.',
        'Giữ mọi thứ trong lòng, không chia sẻ với ai.',
      ] },
      { h: 'Khi nào cần hỗ trợ chuyên môn?' },
      { p: 'Khi căng thẳng kéo dài nhiều tuần, ảnh hưởng nặng đến ăn ngủ, học tập, hoặc em cảm thấy tuyệt vọng, có suy nghĩ tiêu cực về bản thân, em cần tìm đến người lớn và chuyên gia. Em có thể nói chuyện với phòng tư vấn tâm lí của trường, bác sĩ, hoặc gọi Tổng đài 111. Đây là điều bình thường và đáng làm.' },
      { note: 'Chăm sóc sức khoẻ tinh thần cũng quan trọng như chăm sóc thể chất. Biết nghỉ ngơi và xin giúp đỡ đúng lúc là dấu hiệu của người mạnh mẽ và khôn ngoan.' },
    ],
    [
      { q: 'Sắp đến giờ thi mà em hồi hộp, tim đập nhanh, tay run. Em nên làm gì để bình tĩnh lại?', a: 'Một chút hồi hộp trước thi là bình thường và có thể giúp em tỉnh táo hơn. Để bình tĩnh, em hít thở sâu vài lần theo nhịp chậm, tự nhủ "Mình đã ôn bài rồi, mình làm được". Em có thể uống một ngụm nước, vươn vai nhẹ. Quan trọng là không nên cố nhồi nhét kiến thức ngay sát giờ thi — điều đó chỉ làm em thêm rối. Hãy tin vào quá trình ôn tập của mình.' },
      { q: 'Em đang rất căng thẳng vì áp lực học hành. Một bạn nói "căng thì chơi game cho quên đi". Lời khuyên đó có tốt không?', a: 'Chơi game một lúc để giải trí thì không sao, nhưng dùng game để "trốn" áp lực thì không phải cách giải quyết tốt — vì khi tắt game, áp lực vẫn còn nguyên, thậm chí nặng hơn vì đã mất thời gian. Thay vào đó, em nên đối diện với nguyên nhân: lập kế hoạch học chia nhỏ, vận động để giải toả, chia sẻ với bố mẹ hoặc thầy cô. Đó là cách giảm căng thẳng lành mạnh và bền vững hơn.' },
      { q: 'Em cảm thấy căng thẳng, buồn bã kéo dài nhiều tuần, không muốn làm gì cả. Em có nên tự mình chịu đựng không?', a: 'Em không nên tự chịu đựng một mình. Khi căng thẳng và buồn bã kéo dài nhiều tuần, ảnh hưởng đến sinh hoạt và học tập, đó là dấu hiệu em cần được hỗ trợ. Em hãy chia sẻ với bố mẹ, thầy cô chủ nhiệm, hoặc đến phòng tư vấn tâm lí của trường. Em cũng có thể gọi Tổng đài 111 để được lắng nghe. Tìm sự giúp đỡ không phải là yếu đuối — đó là cách thông minh để vượt qua giai đoạn khó khăn.' },
    ]
  ),

  'S8HDTN-w17-quiz': L(
    'Định hướng học tập THPT',
    'Lớp 8 là thời điểm thích hợp để em bắt đầu nghĩ về con đường sau khi tốt nghiệp lớp 9. Có nhiều hướng đi khác nhau, không chỉ một con đường duy nhất. Cùng cô tìm hiểu để chuẩn bị sớm và chủ động nhé!',
    [
      'Biết các hướng đi sau khi tốt nghiệp Trung học cơ sở.',
      'Hiểu các tiêu chí để lựa chọn hướng đi phù hợp.',
      'Biết cần chuẩn bị gì ngay từ lớp 8.',
      'Hiểu rằng mọi con đường đều có thể dẫn đến thành công.',
    ],
    [
      { h: 'Các hướng đi sau lớp 9' },
      { ul: [
        'Trung học phổ thông (THPT) công lập: học phí thấp, là con đường phổ biến lên đại học.',
        'Trường THPT chuyên: dành cho học sinh giỏi, tuyển chọn qua kì thi.',
        'THPT tư thục, dân lập, quốc tế: cơ sở vật chất tốt, học phí cao.',
        'Trung tâm Giáo dục thường xuyên: học văn hoá linh hoạt, có thể vừa học vừa làm.',
        'Trường trung cấp, cao đẳng nghề: học nghề kết hợp văn hoá, ra trường có nghề sớm.',
      ] },
      { h: 'Mỗi con đường đều đáng quý' },
      { p: 'Không phải ai cũng nhất thiết phải vào đại học mới thành công. Học nghề là một lựa chọn rất tốt với nhiều bạn — xã hội đang rất thiếu thợ lành nghề giỏi, và nhiều nghề có thu nhập cao, việc làm ổn định. Điều quan trọng là chọn con đường phù hợp với năng lực, sở thích và hoàn cảnh của em.' },
      { h: 'Tiêu chí lựa chọn' },
      { ul: [
        'Năng lực học tập và kết quả của em (điểm số các môn).',
        'Sở thích, định hướng nghề nghiệp tương lai.',
        'Vị trí địa lí, khoảng cách đi lại.',
        'Điều kiện tài chính của gia đình.',
        'Nguyện vọng của bản thân kết hợp với tư vấn của bố mẹ, thầy cô.',
      ] },
      { h: 'Chuẩn bị ngay từ lớp 8' },
      { ul: [
        'Học vững các môn nền tảng, đặc biệt là Toán, Ngữ văn, Tiếng Anh (thường thi vào lớp 10).',
        'Tham gia hoạt động ngoại khoá để rèn kĩ năng và làm đẹp hồ sơ.',
        'Tìm hiểu sớm về các trường THPT, trường nghề mình quan tâm.',
        'Bắt đầu khám phá sở thích nghề nghiệp (qua Holland, trải nghiệm thực tế).',
        'Xây dựng thói quen học tập tốt, có kế hoạch cho năm lớp 9.',
      ] },
      { h: 'Vai trò của em trong quyết định' },
      { p: 'Đây là tương lai của em, nên em cần chủ động tìm hiểu và có chính kiến, đồng thời biết lắng nghe lời khuyên của bố mẹ, thầy cô. Quyết định tốt nhất là sự kết hợp giữa nguyện vọng của em và sự tư vấn dựa trên kinh nghiệm của người lớn. Đừng chọn theo bạn bè hay vì áp lực bên ngoài.' },
      { note: 'Định hướng sớm không có nghĩa là "chốt cứng" ngay từ bây giờ, mà là để em có thời gian tìm hiểu, chuẩn bị và đưa ra lựa chọn sáng suốt khi đến lúc.' },
    ],
    [
      { q: 'Em học lực trung bình và thấy mình thích sửa chữa máy móc, làm việc bằng tay hơn là học lí thuyết. Hướng đi nào có thể phù hợp với em?', a: 'Với sở thích làm việc thực tế bằng tay (thiên về nhóm R trong Holland), con đường học nghề có thể rất phù hợp với em. Em có thể tìm hiểu các trường trung cấp, cao đẳng nghề về cơ khí, điện, ô tô, điện lạnh. Học nghề giúp em sớm có một nghề trong tay, mà xã hội lại đang rất cần thợ lành nghề giỏi với thu nhập tốt. Đây là lựa chọn đáng tự hào, không hề "kém" hơn con đường đại học.' },
      { q: 'Bạn thân của em rủ "thi vào trường chuyên cho có bạn có bè". Em có nên chọn trường theo bạn không?', a: 'Em không nên chọn trường chỉ vì muốn đi cùng bạn. Trường chuyên đòi hỏi năng lực rất cao và phù hợp với những bạn thật sự giỏi, đam mê môn chuyên đó. Nếu em chọn theo bạn mà không hợp năng lực hay sở thích, em sẽ vất vả và áp lực. Em cần chọn trường dựa trên năng lực, sở thích và định hướng của chính mình. Tình bạn tốt sẽ vẫn được giữ dù hai đứa học khác trường.' },
      { q: 'Em rất thích các môn khoa học tự nhiên và muốn theo hướng kĩ thuật, công nghệ sau này. Lớp 8 em nên chuẩn bị gì?', a: 'Em nên tập trung học vững các môn Toán và Khoa học tự nhiên, vì đây là nền tảng cho hướng kĩ thuật, công nghệ. Em cũng nên trau dồi Tiếng Anh để sau này đọc tài liệu chuyên ngành. Ngoài ra, em có thể tham gia câu lạc bộ khoa học, lập trình, robotics nếu trường có; tìm hiểu các trường THPT có thế mạnh về khoa học tự nhiên. Bắt đầu khám phá sớm sẽ giúp em định hướng rõ ràng hơn cho lớp 9 và những năm tiếp theo.' },
    ]
  ),

  'S8HDTN-w18-quiz': L(
    'Ôn tập HK1',
    'Một học kì đã trôi qua với biết bao điều em đã học và trải nghiệm. Đây là lúc em ngồi lại, nhìn nhận hành trình của mình một cách trung thực — không phải để khen chê, mà để hiểu mình hơn và bước tiếp vững vàng hơn. Cùng cô tổng kết nhé!',
    [
      'Hệ thống lại các nội dung, kĩ năng đã học trong học kì 1.',
      'Biết cách tự đánh giá bản thân một cách khách quan.',
      'Biết lập kế hoạch hành động cho học kì 2.',
      'Có thái độ tích cực, hướng tới tiến bộ.',
    ],
    [
      { h: 'Những mạch nội dung của học kì 1' },
      { p: 'Trong học kì vừa qua, em đã đi qua bốn mạch nội dung lớn: khám phá và phát triển bản thân; rèn các kĩ năng sống thiết yếu; bảo vệ bản thân và sống an toàn; và bước đầu định hướng nghề nghiệp. Đây là những hành trang quan trọng cho cả cuộc đời.' },
      { h: 'Nhóm kĩ năng phát triển bản thân' },
      { ul: [
        'Khám phá bản thân: tính cách, sở thích, phong cách học tập.',
        'Quản lí thời gian, tư duy phản biện.',
        'Quản lí cảm xúc, ứng phó với căng thẳng.',
        'Giao tiếp hiệu quả, xây dựng tình bạn lành mạnh.',
      ] },
      { h: 'Nhóm kiến thức an toàn và xã hội' },
      { ul: [
        'An toàn mạng: bảo vệ quyền riêng tư, nhận diện tin giả và deepfake.',
        'Phòng chống xâm hại, biết quyền được an toàn.',
        'Bảo vệ môi trường: ứng phó biến đổi khí hậu, tiêu dùng có trách nhiệm.',
        'Tham gia hoạt động cộng đồng, tình nguyện.',
      ] },
      { h: 'Nhóm hướng nghiệp' },
      { ul: [
        'Mô hình Holland (RIASEC) và 6 nhóm sở thích nghề nghiệp.',
        'Các nhóm ngành nghề lớn trong xã hội.',
        'Định hướng học tập sau Trung học cơ sở.',
      ] },
      { h: 'Cách tự đánh giá khách quan' },
      { ul: [
        'So với mục tiêu mình đã đặt ra đầu kì, không so với bạn giỏi nhất lớp.',
        'Nhìn cả tiến bộ chứ không chỉ thành tích tuyệt đối.',
        'Ghi nhận điểm mạnh đã phát huy và điều cần cải thiện.',
        'Tránh tự ti quá mức cũng như tự cao thiếu cơ sở.',
      ] },
      { h: 'Kế hoạch hành động cho học kì 2' },
      { ul: [
        'Chọn 3 điểm mạnh muốn tiếp tục phát huy.',
        'Chọn 2–3 điều cụ thể muốn cải thiện và cách làm.',
        'Đặt 1 thói quen tốt mới muốn xây dựng.',
        'Thử 1 hoạt động hoặc kĩ năng mới.',
      ] },
      { note: 'Biết tự nhìn lại và đánh giá bản thân một cách trung thực là dấu hiệu của sự trưởng thành. Mỗi học kì là một chặng, và em đang ngày càng vững vàng hơn trên hành trình của mình.' },
    ],
    [
      { q: 'Đầu kì em đặt mục tiêu Toán đạt 8.0 nhưng cuối kì chỉ được 6.5. Em nên tự đánh giá thế nào cho đúng?', a: 'Em không nên chỉ nhìn vào con số rồi tự trách "mình kém". Hãy đánh giá khách quan: so với đầu năm em có tiến bộ không? Em sai chủ yếu ở dạng bài nào — đại số hay hình học? Em đã học đều chưa? Từ đó, em đặt mục tiêu học kì 2 thực tế hơn (ví dụ lên 7.5 trước) kèm phương pháp cụ thể như học thêm phần yếu mỗi tuần. Đánh giá để cải tiến, không phải để dằn vặt bản thân.' },
      { q: 'Trong số các kĩ năng đã học học kì 1, đâu là 3 kĩ năng em thấy quan trọng nhất với mình và vì sao?', a: 'Đây là câu hỏi để em tự suy ngẫm, không có đáp án duy nhất. Em có thể chọn, ví dụ: quản lí thời gian (vì giúp em không bị quá tải), quản lí cảm xúc (vì giúp em bình tĩnh hơn trước áp lực) và tư duy phản biện (vì giúp em không bị tin giả dẫn dắt). Quan trọng là em giải thích được vì sao chúng quan trọng với hoàn cảnh của mình và dự định áp dụng chúng vào học kì 2 ra sao.' },
      { q: 'Em nhận thấy học kì 1 mình ít tham gia hoạt động tập thể và còn rụt rè. Em nên đặt mục tiêu học kì 2 thế nào?', a: 'Em nên đặt mục tiêu cụ thể, đo lường được thay vì chung chung. Ví dụ: "Học kì 2 mình sẽ đăng kí tham gia ít nhất 2 hoạt động — văn nghệ chào mừng 26/3 và một buổi tình nguyện của lớp." Em chọn hoạt động phù hợp sở thích để tham gia với tâm thế thoải mái, bắt đầu từ vai trò nhỏ rồi tăng dần. Mục tiêu nhỏ và rõ ràng sẽ dễ thực hiện hơn, và mỗi lần tham gia em sẽ tự tin hơn một chút.' },
    ]
  ),

  'S8HDTN-w19-quiz': L(
    'Khám phá nghề — 10 nhóm ngành lớn (1)',
    'Học kì 2 chúng ta sẽ đi sâu khám phá thế giới nghề nghiệp. Hôm nay cùng cô tìm hiểu ba nhóm ngành "hot" và rất cần cho xã hội: Công nghệ thông tin, Kĩ thuật và Y dược. Mỗi nhóm là một thế giới thú vị đang chờ em khám phá!',
    [
      'Hiểu đặc điểm công việc của nhóm CNTT, Kĩ thuật, Y dược.',
      'Biết các nghề tiêu biểu và yêu cầu của từng nhóm.',
      'Liên hệ với mô hình Holland và năng lực bản thân.',
      'Có cái nhìn thực tế về cơ hội và thách thức của mỗi nghề.',
    ],
    [
      { h: 'Nhóm Công nghệ thông tin – Khoa học máy tính' },
      { p: 'Đây là nhóm ngành đang phát triển mạnh nhất, len lỏi vào mọi lĩnh vực của đời sống. Người làm CNTT tạo ra phần mềm, ứng dụng, trang web, trò chơi, hệ thống trí tuệ nhân tạo. Công việc đòi hỏi tư duy logic, khả năng giải quyết vấn đề và tinh thần học hỏi liên tục vì công nghệ thay đổi rất nhanh.' },
      { ul: [
        'Nghề tiêu biểu: lập trình viên, kĩ sư phần mềm, chuyên viên AI, phân tích dữ liệu, an ninh mạng, thiết kế giao diện (UI/UX), phát triển game.',
        'Sở thích Holland: I (nghiên cứu) + C (quy củ).',
        'Yêu cầu: giỏi Toán, tư duy logic, kiên nhẫn, tiếng Anh tốt.',
        'Cơ hội: nhu cầu nhân lực rất lớn, thu nhập tốt, làm việc linh hoạt.',
      ] },
      { h: 'Nhóm Kĩ thuật' },
      { p: 'Kĩ sư là những người thiết kế, chế tạo, vận hành máy móc, công trình, hệ thống — từ chiếc cầu, toà nhà đến ô tô, robot, nhà máy. Đây là nhóm ngành "xương sống" của nền công nghiệp, biến ý tưởng và khoa học thành sản phẩm thực tế phục vụ con người.' },
      { ul: [
        'Nghề tiêu biểu: kĩ sư cơ khí, điện – điện tử, xây dựng, ô tô, tự động hoá, hàng không.',
        'Sở thích Holland: R (thực tế) + I (nghiên cứu).',
        'Yêu cầu: giỏi Toán, Lí, tư duy không gian, tỉ mỉ, thích làm việc với máy móc.',
        'Cơ hội: ổn định, gắn với sự phát triển hạ tầng và công nghiệp của đất nước.',
      ] },
      { h: 'Nhóm Y – Dược' },
      { p: 'Đây là nhóm ngành chăm sóc sức khoẻ con người — một trong những nghề cao quý và được xã hội trân trọng nhất. Người làm y dược cần cả kiến thức khoa học vững vàng lẫn tấm lòng nhân ái, sự kiên nhẫn và tinh thần trách nhiệm cao vì liên quan đến sinh mạng con người.' },
      { ul: [
        'Nghề tiêu biểu: bác sĩ, dược sĩ, điều dưỡng, kĩ thuật viên xét nghiệm, y học cổ truyền.',
        'Sở thích Holland: I (nghiên cứu) + S (xã hội).',
        'Yêu cầu: giỏi Sinh, Hoá, kiên nhẫn, chịu áp lực tốt, có lòng nhân ái.',
        'Đặc thù: thời gian đào tạo dài (6–8 năm với bác sĩ), áp lực cao nhưng ý nghĩa lớn.',
      ] },
      { note: 'Khi tìm hiểu một nghề, em hãy nhìn cả hai mặt: điều thú vị, ý nghĩa và cả khó khăn, thách thức. Hiểu thực tế sẽ giúp em chọn nghề một cách tỉnh táo, không ảo tưởng.' },
    ],
    [
      { q: 'Em thích giải các bài toán logic và mày mò máy tính. Nghề lập trình viên cần những sở thích Holland nào?', a: 'Nghề lập trình viên phù hợp với mã Holland IC: nhóm I (Investigative — thích nghiên cứu, giải quyết vấn đề, tìm tòi cách làm cho chương trình chạy đúng) và nhóm C (Conventional — thích làm việc có quy trình, logic, chính xác). Sở thích giải toán logic và mày mò máy tính của em rất khớp với nghề này. Em có thể bắt đầu học lập trình cơ bản qua các trang web miễn phí để thử sức ngay.' },
      { q: 'Em muốn làm bác sĩ. Nghề này mất bao lâu để đào tạo và đòi hỏi gì?', a: 'Để trở thành bác sĩ, em cần học khoảng 6 năm đại học y, sau đó thường phải học thêm thực hành/nội trú vài năm nữa, tổng cộng có thể tới 7–8 năm trước khi hành nghề độc lập. Nghề này đòi hỏi học giỏi các môn Sinh, Hoá, có khả năng chịu áp lực cao và đặc biệt là lòng nhân ái, sự kiên nhẫn vì liên quan đến sức khoẻ, sinh mạng con người. Đây là con đường dài và vất vả nhưng vô cùng ý nghĩa.' },
      { q: 'Nghe nói nghề kĩ thuật "khô khan" và chỉ hợp với con trai. Suy nghĩ này có đúng không?', a: 'Suy nghĩ này không đúng. Nghề kĩ thuật thực ra rất sáng tạo — kĩ sư biến ý tưởng thành những công trình, máy móc thực tế phục vụ con người, đó là điều rất thú vị. Và nghề kĩ thuật không phân biệt giới tính: ngày càng nhiều bạn nữ thành công trong các ngành cơ khí, xây dựng, công nghệ. Năng lực và đam mê mới là yếu tố quyết định, không phải giới tính. Em đừng để định kiến giới hạn lựa chọn của mình.' },
    ]
  ),

  'S8HDTN-w20-quiz': L(
    'Khám phá nghề — 10 nhóm ngành lớn (2)',
    'Tiếp tục hành trình khám phá nghề, hôm nay cùng cô tìm hiểu các nhóm ngành Khoa học (tự nhiên và xã hội), Kinh tế và Luật. Đây là những lĩnh vực vừa cần tư duy sâu, vừa gắn bó mật thiết với đời sống con người và xã hội.',
    [
      'Hiểu đặc điểm của nhóm Khoa học tự nhiên và Khoa học xã hội.',
      'Biết các nghề tiêu biểu của nhóm Kinh tế và Luật.',
      'Liên hệ với sở thích Holland và năng lực bản thân.',
      'Hiểu vai trò của các nhóm ngành này trong xã hội.',
    ],
    [
      { h: 'Nhóm Khoa học tự nhiên' },
      { p: 'Đây là những người đi tìm hiểu các quy luật của thế giới tự nhiên — từ con số, vật chất, phản ứng hoá học đến sự sống và môi trường. Họ làm việc trong phòng thí nghiệm, viện nghiên cứu hoặc giảng dạy, đặt nền móng kiến thức cho mọi tiến bộ công nghệ.' },
      { ul: [
        'Nghề tiêu biểu: nhà toán học, vật lí, hoá học, sinh học, nhà nghiên cứu môi trường.',
        'Sở thích Holland: I (nghiên cứu).',
        'Yêu cầu: tư duy logic, đam mê khám phá, kiên trì, tỉ mỉ.',
        'Hướng đi: nghiên cứu khoa học hoặc giảng dạy.',
      ] },
      { h: 'Nhóm Khoa học xã hội và Nhân văn' },
      { p: 'Nhóm này nghiên cứu về con người, xã hội, văn hoá, lịch sử, ngôn ngữ và tâm lí. Họ giúp chúng ta hiểu chính mình, hiểu xã hội và gìn giữ các giá trị văn hoá. Đây là nhóm ngành rất cần cho một xã hội phát triển hài hoà.' },
      { ul: [
        'Nghề tiêu biểu: nhà tâm lí học, nhà nghiên cứu lịch sử, nhà ngôn ngữ, nhà báo, nhà xã hội học.',
        'Sở thích Holland: S (xã hội) + A (nghệ thuật) + I (nghiên cứu).',
        'Yêu cầu: giỏi Văn, khả năng đọc – viết – diễn đạt, thấu hiểu con người.',
      ] },
      { h: 'Nhóm Kinh tế' },
      { p: 'Người làm kinh tế tham gia vào việc tạo ra, quản lí và phân phối của cải vật chất — từ quản lí tài chính, bán hàng, marketing đến điều hành doanh nghiệp. Đây là nhóm ngành năng động, gắn liền với thị trường và sự phát triển của nền kinh tế.' },
      { ul: [
        'Nghề tiêu biểu: kế toán, chuyên viên tài chính, marketing, quản trị kinh doanh, xuất nhập khẩu.',
        'Sở thích Holland: E (kinh doanh) + C (quy củ).',
        'Yêu cầu: nhạy với con số, năng động, giao tiếp tốt, biết phân tích.',
      ] },
      { h: 'Nhóm Luật' },
      { p: 'Người làm luật bảo vệ công lí và đảm bảo xã hội vận hành theo pháp luật. Họ tư vấn, bào chữa, xét xử, đảm bảo quyền lợi hợp pháp cho mọi người. Nghề luật đòi hỏi tư duy chặt chẽ, khả năng lập luận sắc bén và một tinh thần công bằng, chính trực.' },
      { ul: [
        'Nghề tiêu biểu: luật sư, thẩm phán, kiểm sát viên, công chứng viên, chuyên viên pháp chế.',
        'Sở thích Holland: E (kinh doanh) + S (xã hội).',
        'Yêu cầu: giỏi lập luận, trí nhớ tốt, công bằng, chính trực, giao tiếp thuyết phục.',
      ] },
      { note: 'Mỗi nhóm ngành đều đóng vai trò không thể thiếu trong xã hội. Hãy tìm hiểu kĩ để biết nhóm nào khơi dậy sự hứng thú và phù hợp với thế mạnh của em.' },
    ],
    [
      { q: 'Em thích đọc sách, viết lách và tranh luận về các vấn đề xã hội. Những nghề nào có thể phù hợp với em?', a: 'Sở thích đọc, viết và tranh luận của em rất phù hợp với các nghề thuộc nhóm Khoa học xã hội và Luật. Em có thể tìm hiểu các nghề như nhà báo, biên tập viên, luật sư, nhà nghiên cứu xã hội học, hoặc giáo viên Ngữ văn. Những nghề này đề cao khả năng đọc – viết – lập luận và sự hiểu biết về con người, xã hội. Em hãy thử rèn luyện thêm bằng cách viết bài, tham gia câu lạc bộ tranh biện nếu có.' },
      { q: 'Nghề Kinh tế và Luật có điểm gì chung về sở thích Holland?', a: 'Cả hai nhóm nghề này đều cần mạnh ở nhóm E (Enterprising — kinh doanh, lãnh đạo). Người làm kinh tế cần khả năng thuyết phục khách hàng, đàm phán, ra quyết định; người làm luật cần khả năng lập luận, thuyết phục tại toà hoặc khi tư vấn. Điểm chung là kĩ năng giao tiếp thuyết phục và sự năng động, tự tin. Tuy nhiên, kinh tế còn cần nhóm C (làm việc với số liệu), còn luật cần thêm nhóm S (làm việc với con người, bảo vệ công lí).' },
      { q: 'Em giỏi Toán nhưng lại không thích làm kĩ sư. Liệu có nghề nào dùng được thế mạnh Toán của em không?', a: 'Có rất nhiều nghề tận dụng thế mạnh Toán mà không phải làm kĩ sư. Em có thể hướng tới nhóm Kinh tế (kế toán, tài chính, phân tích dữ liệu kinh doanh), nhóm Công nghệ thông tin (lập trình, khoa học dữ liệu), hoặc nhóm Khoa học tự nhiên (nhà toán học, nghiên cứu). Toán là công cụ nền tảng được dùng trong rất nhiều lĩnh vực. Em hãy kết hợp thế mạnh Toán với sở thích cụ thể của mình để tìm ra nghề vừa giỏi vừa thích.' },
    ]
  ),

  'S8HDTN-w21-quiz': L(
    'Khám phá nghề — 10 nhóm ngành lớn (3)',
    'Khép lại hành trình khám phá nghề, hôm nay cùng cô tìm hiểu ba nhóm ngành giàu ý nghĩa: Sư phạm "trồng người", Nghệ thuật làm đẹp cuộc sống, và Nông – Lâm – Ngư nuôi sống xã hội. Mỗi nhóm đều có những giá trị rất riêng!',
    [
      'Hiểu đặc điểm và ý nghĩa của nhóm Sư phạm.',
      'Biết các nghề tiêu biểu của nhóm Nghệ thuật.',
      'Hiểu tương lai hiện đại của nhóm Nông – Lâm – Ngư.',
      'Liên hệ với sở thích và năng lực bản thân.',
    ],
    [
      { h: 'Nhóm Sư phạm' },
      { p: 'Nghề giáo được ví như nghề "trồng người" — gieo tri thức và nhân cách cho các thế hệ. Người thầy không chỉ truyền đạt kiến thức mà còn truyền cảm hứng, định hình tâm hồn học trò. Đây là nghề cao quý, ổn định và mang lại niềm vui khi thấy học trò trưởng thành.' },
      { ul: [
        'Nghề tiêu biểu: giáo viên các cấp, giảng viên đại học, chuyên viên giáo dục.',
        'Sở thích Holland: S (xã hội) kết hợp I/A/C tuỳ môn dạy.',
        'Yêu cầu: yêu trẻ, kiên nhẫn, giỏi truyền đạt, tận tâm.',
        'Đặc thù: công việc ổn định, ý nghĩa, nhưng đòi hỏi tâm huyết và sự nhẫn nại.',
      ] },
      { h: 'Nhóm Nghệ thuật' },
      { p: 'Người làm nghệ thuật mang cái đẹp đến cho cuộc sống — qua tranh vẽ, âm nhạc, phim ảnh, thiết kế, kiến trúc. Họ biểu đạt cảm xúc, sáng tạo những điều mới mẻ, làm phong phú đời sống tinh thần của con người. Đây là nhóm ngành đòi hỏi tài năng cộng với sự khổ luyện.' },
      { ul: [
        'Nghề tiêu biểu: hoạ sĩ, nhạc sĩ, ca sĩ, diễn viên, nhà thiết kế, kiến trúc sư, đạo diễn.',
        'Sở thích Holland: A (nghệ thuật).',
        'Yêu cầu: năng khiếu, sáng tạo, kiên trì luyện tập, có cá tính riêng.',
        'Đặc thù: cạnh tranh cao, cần cả tài năng lẫn nỗ lực bền bỉ.',
      ] },
      { h: 'Nhóm Nông – Lâm – Ngư nghiệp' },
      { p: 'Đây là nhóm ngành nuôi sống cả xã hội — sản xuất lương thực, thực phẩm, bảo vệ rừng và nuôi trồng thuỷ sản. Ngày nay, nông nghiệp không còn chỉ là "chân lấm tay bùn" mà đã chuyển sang nông nghiệp công nghệ cao, ứng dụng khoa học kĩ thuật hiện đại, mở ra nhiều cơ hội hấp dẫn.' },
      { ul: [
        'Nghề tiêu biểu: kĩ sư nông nghiệp, lâm nghiệp, thuỷ sản, bác sĩ thú y, chuyên gia công nghệ thực phẩm.',
        'Sở thích Holland: R (thực tế) + I (nghiên cứu).',
        'Yêu cầu: yêu thiên nhiên, chịu khó, giỏi Sinh – Hoá, ham học hỏi công nghệ mới.',
        'Tương lai: nông nghiệp thông minh, hữu cơ, công nghệ cao có thu nhập tốt.',
      ] },
      { note: 'Đừng đánh giá nghề qua định kiến cũ. Nhiều nghề tưởng "bình thường" lại đang đổi mới mạnh mẽ và đầy triển vọng. Hãy mở lòng tìm hiểu trước khi kết luận.' },
    ],
    [
      { q: 'Em vừa yêu thích vẽ vừa thích dùng máy tính. Có nghề nào kết hợp được cả hai sở thích này không?', a: 'Có nhiều nghề kết hợp được cả nghệ thuật (vẽ) và công nghệ (máy tính). Em có thể tìm hiểu các nghề như: nhà thiết kế đồ hoạ, thiết kế giao diện (UI/UX), hoạ sĩ vẽ minh hoạ kĩ thuật số, làm phim hoạt hình 3D, hoặc thiết kế game. Những nghề này thuộc sự giao thoa giữa nhóm A (nghệ thuật) và nhóm công nghệ — đang rất được ưa chuộng và có nhu cầu cao. Em hãy thử học vẽ trên máy tính để khám phá hướng đi này.' },
      { q: '"Làm nông nghiệp thì nghèo và vất vả" — quan niệm này có còn đúng không?', a: 'Quan niệm này đã lỗi thời. Nông nghiệp hiện đại đang chuyển sang công nghệ cao: nhà kính thông minh, tưới tiêu tự động, nông nghiệp hữu cơ, ứng dụng dữ liệu và máy móc. Các kĩ sư nông nghiệp công nghệ cao, chuyên gia thực phẩm sạch có thu nhập tốt và nhu cầu lớn. Việt Nam là nước nông nghiệp nên lĩnh vực này có tương lai rất sáng. Vấn đề không phải nghề "nghèo" mà là cách làm — làm nông nghiệp thông minh hoàn toàn có thể giàu có và đáng tự hào.' },
      { q: 'Em muốn làm giáo viên nhưng lo nghề này "lương thấp, vất vả". Em nên cân nhắc thế nào?', a: 'Em nên cân nhắc cả hai mặt một cách thực tế. Nghề giáo đúng là đòi hỏi nhiều tâm huyết và sự kiên nhẫn, thu nhập có thể không cao bằng một số ngành khác. Nhưng đây là nghề ổn định, được xã hội tôn trọng, và mang lại niềm hạnh phúc đặc biệt khi thấy học trò trưởng thành. Nếu em thật sự yêu trẻ và đam mê truyền đạt kiến thức, đó là động lực bền vững vượt qua khó khăn. Em hãy tự hỏi điều gì quan trọng nhất với mình — nếu ý nghĩa công việc quan trọng hơn thu nhập, thì sư phạm là lựa chọn xứng đáng.' },
    ]
  ),

  'S8HDTN-w22-quiz': L(
    'Lập mục tiêu cá nhân — SMART goal',
    'Ước mơ mà không có mục tiêu cụ thể thì giống như con tàu không có bánh lái. Nguyên tắc SMART là một công cụ kinh điển giúp em biến mong muốn mơ hồ thành mục tiêu rõ ràng, có thể đạt được. Cùng cô học cách đặt mục tiêu thông minh nhé!',
    [
      'Hiểu và nắm được 5 tiêu chí của mục tiêu SMART.',
      'Biết cách viết một mục tiêu cụ thể theo SMART.',
      'Biết cách theo dõi và điều chỉnh mục tiêu.',
      'Hiểu vai trò của mục tiêu trong việc tạo động lực.',
    ],
    [
      { h: 'Vì sao cần đặt mục tiêu?' },
      { p: 'Mục tiêu giúp em biết mình muốn đi đâu và đo được mình đã đi được bao xa. Không có mục tiêu, em dễ trôi theo cảm hứng, làm việc thiếu định hướng. Một mục tiêu rõ ràng tạo động lực, giúp em tập trung và biết cách phân bổ thời gian, công sức hợp lí.' },
      { h: 'SMART là gì?' },
      { ul: [
        'S – Specific (Cụ thể): mục tiêu rõ ràng, không chung chung.',
        'M – Measurable (Đo lường được): có thể đo bằng con số, mức độ.',
        'A – Achievable (Khả thi): vừa sức, có thể đạt được với nỗ lực.',
        'R – Relevant (Phù hợp): liên quan đến điều em thật sự cần và quan tâm.',
        'T – Time-bound (Có thời hạn): có mốc thời gian rõ ràng để hoàn thành.',
      ] },
      { h: 'So sánh mục tiêu mơ hồ và mục tiêu SMART' },
      { ul: [
        'Mơ hồ: "Mình muốn giỏi tiếng Anh hơn." → không biết bắt đầu từ đâu, khi nào xong.',
        'SMART: "Trong 3 tháng tới, mình học thuộc 50 từ vựng mới mỗi tuần và làm 1 đề đọc hiểu mỗi tuần."',
        'Mục tiêu SMART cho em biết chính xác phải làm gì, làm bao nhiêu, đến khi nào.',
      ] },
      { h: 'Các bước theo dõi mục tiêu' },
      { ul: [
        'Ghi mục tiêu ra giấy hoặc ứng dụng, dán nơi dễ thấy.',
        'Chia mục tiêu lớn thành các bước nhỏ theo tuần.',
        'Cuối mỗi tuần kiểm tra: mình đã làm được bao nhiêu phần trăm?',
        'Điều chỉnh nếu thấy quá khó hoặc quá dễ.',
        'Tự thưởng và ăn mừng khi đạt được mục tiêu.',
      ] },
      { h: 'Khi không đạt mục tiêu' },
      { p: 'Nếu chưa đạt, em đừng vội nản hay tự trách. Hãy bình tĩnh xem lại: mục tiêu có quá tham không? Phương pháp đã đúng chưa? Có việc bất ngờ xen vào không? Từ đó điều chỉnh mục tiêu cho thực tế hơn. Việc không đạt mục tiêu là cơ hội để học cách đặt mục tiêu tốt hơn.' },
      { note: 'Mục tiêu là công cụ phục vụ em, không phải áp lực đè nặng em. Hãy đặt mục tiêu đủ thách thức để tiến bộ, nhưng cũng đủ thực tế để giữ niềm vui và động lực.' },
    ],
    [
      { q: 'Mục tiêu "Em muốn chạy nhanh hơn" đã đạt chuẩn SMART chưa? Nếu chưa, hãy sửa lại.', a: 'Mục tiêu này chưa đạt chuẩn SMART vì còn mơ hồ — không rõ nhanh hơn bao nhiêu, đo bằng cách nào, trong bao lâu. Sửa lại theo SMART có thể là: "Trong 3 tháng tới, em rút ngắn thời gian chạy 1500m từ 8 phút xuống còn 7 phút, bằng cách tập chạy 3 buổi mỗi tuần." Mục tiêu này cụ thể (1500m), đo được (8 xuống 7 phút), khả thi, phù hợp và có thời hạn (3 tháng) — nên em biết chính xác phải làm gì.' },
      { q: 'Vì sao mục tiêu nhất thiết phải "đo lường được"?', a: 'Vì nếu không đo được, em sẽ không biết mình có thật sự tiến bộ hay không. Ví dụ mục tiêu "học giỏi hơn" rất khó đánh giá — giỏi đến mức nào là đủ? Ngược lại, mục tiêu "tăng điểm trung bình môn Toán từ 6.5 lên 7.5" thì rõ ràng, em đo được bằng con số cụ thể. Khả năng đo lường giúp em biết khi nào đã đạt mục tiêu, theo dõi được tiến độ và giữ được động lực khi thấy mình tiến lên từng bước.' },
      { q: 'Em đặt mục tiêu "trong 1 tháng đọc xong 20 cuốn sách" nhưng đến giữa tháng mới đọc được 2 cuốn. Em nên làm gì?', a: 'Em nên nhận ra mục tiêu ban đầu có thể quá tham so với thời gian và sức của mình — yếu tố A (khả thi) chưa được bảo đảm. Thay vì nản chí và bỏ cuộc, em điều chỉnh mục tiêu cho thực tế hơn, ví dụ "đọc 1 cuốn mỗi tuần". Em cũng xem lại cách thực hiện: có thể dành 20 phút đọc mỗi tối thành thói quen. Việc điều chỉnh mục tiêu cho phù hợp không phải là thất bại, mà là kĩ năng quan trọng để đặt mục tiêu tốt hơn về sau.' },
    ]
  ),

  'S8HDTN-w23-quiz': L(
    'Mindset cố định vs Mindset phát triển',
    'Cách em nghĩ về khả năng của mình quyết định em sẽ tiến xa đến đâu. Nhà tâm lí học Carol Dweck đã phát hiện ra rằng có hai kiểu tư duy, và chỉ cần thay đổi cách nghĩ, em có thể thay đổi cả tương lai. Cùng cô khám phá điều kì diệu này nhé!',
    [
      'Phân biệt được tư duy cố định và tư duy phát triển.',
      'Tự nhận diện tư duy của bản thân.',
      'Biết cách chuyển từ tư duy cố định sang tư duy phát triển.',
      'Hiểu vai trò của nỗ lực và thái độ với thất bại.',
    ],
    [
      { h: 'Hai kiểu tư duy' },
      { p: 'Nhà tâm lí Carol Dweck phát hiện con người thường có một trong hai kiểu tư duy về khả năng của mình: tư duy cố định (fixed mindset) và tư duy phát triển (growth mindset). Kiểu tư duy này ảnh hưởng rất lớn đến cách em học tập, đối mặt khó khăn và phát triển trong cuộc sống.' },
      { h: 'Tư duy cố định (fixed mindset)' },
      { ul: [
        'Tin rằng tài năng, trí thông minh là bẩm sinh, không thay đổi được.',
        'Hay nói "Tôi không có khiếu môn này" và tin chắc như vậy.',
        'Sợ thử thách vì sợ thất bại sẽ chứng tỏ mình "kém".',
        'Dễ bỏ cuộc khi gặp khó; xem thất bại là dấu chấm hết.',
        'Coi nỗ lực là vô ích, hoặc là dấu hiệu của sự "kém cỏi".',
      ] },
      { h: 'Tư duy phát triển (growth mindset)' },
      { ul: [
        'Tin rằng khả năng có thể phát triển qua học hỏi và nỗ lực.',
        'Nói "Tôi CHƯA giỏi môn này" — và tin mình sẽ giỏi nếu cố gắng.',
        'Đón nhận thử thách như cơ hội để học hỏi và lớn lên.',
        'Kiên trì khi gặp khó; xem thất bại là bài học để tiến bộ.',
        'Coi nỗ lực là con đường dẫn đến thành thạo.',
      ] },
      { h: 'Sức mạnh của chữ "CHƯA"' },
      { p: 'Chỉ một thay đổi nhỏ trong cách nói cũng tạo khác biệt lớn. Thay vì "Mình không làm được", hãy nói "Mình CHƯA làm được". Chữ "chưa" mở ra cánh cửa tương lai — nó nhắc em rằng đây chỉ là điểm hiện tại, không phải giới hạn vĩnh viễn. Não bộ con người có khả năng thay đổi và phát triển suốt đời.' },
      { h: 'Cách rèn tư duy phát triển' },
      { ul: [
        'Thêm chữ "chưa" vào những câu phủ định về bản thân.',
        'Tự khen mình vì NỖ LỰC và CÁCH LÀM, không chỉ vì kết quả.',
        'Xem mỗi lỗi sai là một bài học cụ thể, hỏi "mình học được gì?".',
        'Học hỏi từ người giỏi thay vì ghen tị với họ.',
        'Đón nhận góp ý như món quà giúp mình tiến bộ.',
      ] },
      { note: 'Nghiên cứu cho thấy học sinh có tư duy phát triển tiến bộ vượt trội về lâu dài. Tài năng là điểm khởi đầu, nhưng nỗ lực và thái độ mới quyết định em đi được bao xa.' },
    ],
    [
      { q: 'Hãy đổi câu "Mình dốt Văn, viết mãi không hay được đâu" theo tư duy phát triển.', a: 'Em có thể đổi thành: "Mình CHƯA giỏi Văn, nhưng nếu mình đọc nhiều sách hơn và luyện viết đều đặn mỗi ngày, mình sẽ tiến bộ." Cách nói này thay thái độ buông xuôi bằng niềm tin có cơ sở vào khả năng phát triển. Chữ "chưa" biến một lời tự phán xét tiêu cực thành một mục tiêu để hành động. Khi tin mình có thể giỏi hơn, em sẽ thật sự nỗ lực và tiến bộ.' },
      { q: 'Bạn em được điểm cao và mọi người khen "Cậu thông minh quá!". Theo tư duy phát triển, nên khen thế nào tốt hơn?', a: 'Theo tư duy phát triển, nên khen NỖ LỰC và CÁCH LÀM thay vì chỉ khen tài năng bẩm sinh. Ví dụ: "Cậu đã chăm chỉ ôn luyện nên xứng đáng đạt điểm cao" hoặc "Cách cậu giải bài này rất thông minh". Khen nỗ lực khuyến khích người ta tiếp tục cố gắng, còn khen "thông minh sẵn" dễ khiến người ta sợ thất bại (vì sợ bị xem là "hết thông minh"). Cách khen tưởng nhỏ nhưng ảnh hưởng lớn đến động lực.' },
      { q: 'Em vừa làm sai một bài kiểm tra quan trọng và thấy rất thất vọng, muốn bỏ cuộc. Tư duy phát triển sẽ giúp em nghĩ thế nào?', a: 'Với tư duy phát triển, em xem thất bại này là một bài học chứ không phải dấu chấm hết. Em tự hỏi: "Mình sai ở đâu? Mình học được gì từ lỗi này để lần sau làm tốt hơn?" Thay vì kết luận "mình kém", em nói "mình CHƯA nắm chắc phần này, mình sẽ ôn lại kĩ hơn". Mỗi thất bại được nhìn đúng cách đều giúp em tiến bộ. Những người thành công đều từng thất bại nhiều lần — điều khác biệt là họ không bỏ cuộc mà học hỏi và đứng dậy.' },
    ]
  ),

  'S8HDTN-w24-quiz': L(
    'Quản lý tài chính cá nhân cơ bản',
    'Biết quản lí tiền bạc là một kĩ năng sống quan trọng mà tiếc thay ít được dạy. Học cách quản lí tiền tiêu vặt ngay từ tuổi này sẽ giúp em hình thành thói quen tốt theo suốt cả đời. Cùng cô làm chủ những đồng tiền nhỏ nhé!',
    [
      'Hiểu vai trò của việc quản lí tiền tiêu vặt.',
      'Biết áp dụng quy tắc phân chia thu nhập đơn giản.',
      'Hiểu giá trị và cách tiết kiệm.',
      'Biết cảnh giác với các rủi ro tài chính.',
    ],
    [
      { h: 'Vì sao lớp 8 cần học quản lí tiền?' },
      { p: 'Ở tuổi này, em đã có tiền tiêu vặt và bắt đầu tự quyết định mua sắm. Đây là cơ hội tuyệt vời để tập quản lí tiền — một kĩ năng mà người lớn nào cũng cần. Người biết quản lí tiền từ nhỏ thường có cuộc sống tài chính vững vàng hơn khi trưởng thành.' },
      { h: 'Phân biệt "cần" và "muốn"' },
      { ul: [
        '"Cần": những thứ thật sự thiết yếu (đồ dùng học tập, ăn uống cơ bản).',
        '"Muốn": những thứ thích nhưng không thiết yếu (đồ chơi, đồ ăn vặt, đồ hợp mốt).',
        'Ưu tiên chi cho "cần" trước, "muốn" sau và có chừng mực.',
      ] },
      { h: 'Quy tắc phân chia 50 – 30 – 20' },
      { ul: [
        '50% cho nhu cầu thiết yếu (đồ ăn, học liệu cần thiết).',
        '30% cho sở thích, giải trí (truyện, đồ chơi, đồ ăn vặt).',
        '20% để tiết kiệm (heo đất, sổ tiết kiệm).',
        'Tỉ lệ này linh hoạt, em có thể điều chỉnh nhưng nên luôn dành phần tiết kiệm.',
      ] },
      { h: 'Bí quyết tiết kiệm hiệu quả' },
      { ul: [
        '"Tiết kiệm trước, chi tiêu sau": trích phần tiết kiệm ngay khi nhận tiền.',
        'Đặt mục tiêu tiết kiệm cụ thể: "để dành 200.000đ mua cuốn sách yêu thích".',
        'Áp dụng quy tắc 24 giờ trước khi mua món đắt tiền.',
        'Ghi chép các khoản chi để biết tiền "đi đâu".',
      ] },
      { h: 'Cảnh giác với rủi ro tài chính' },
      { ul: [
        'Không cho bạn vay khoản lớn — dễ mất cả tiền lẫn tình bạn.',
        'Cẩn thận với lừa đảo online: nạp thẻ trúng thưởng, đầu tư "lãi khủng".',
        'Không cung cấp thông tin tài khoản, mã OTP cho bất kì ai.',
        'Không mua bán những thứ vượt khả năng, không "đú" theo bạn bè.',
      ] },
      { h: 'Tiền và giá trị bản thân' },
      { p: 'Em cần hiểu rằng giá trị của một người không nằm ở việc có nhiều tiền hay nhiều đồ đắt tiền. Đừng so sánh hay chạy theo bạn bè về vật chất. Biết hài lòng với những gì mình có và chi tiêu khôn ngoan mới là dấu hiệu của sự trưởng thành.' },
      { note: 'Quản lí tiền không phải là keo kiệt, mà là dùng tiền một cách có kế hoạch và khôn ngoan. Thói quen tốt với những đồng tiền nhỏ hôm nay sẽ giúp em quản lí tốt những khoản lớn mai sau.' },
    ],
    [
      { q: 'Em được cho 100.000đ tiền tiêu vặt mỗi tuần. Hãy phân chia theo quy tắc 50 – 30 – 20.', a: 'Theo quy tắc 50 – 30 – 20, em chia như sau: 50.000đ (50%) cho nhu cầu thiết yếu như đồ dùng học tập, ăn uống cơ bản; 30.000đ (30%) cho sở thích, giải trí như mua truyện hay đồ ăn vặt; và 20.000đ (20%) để tiết kiệm vào heo đất. Cách chia này giúp em vừa đáp ứng nhu cầu, vừa có niềm vui, lại vừa hình thành thói quen tiết kiệm. Quan trọng là em nên trích phần tiết kiệm ngay khi nhận tiền, trước khi tiêu.' },
      { q: '"Mua sắm bốc đồng" là gì và làm sao để tránh?', a: 'Mua sắm bốc đồng là khi em thấy món gì đó liền mua ngay mà không suy nghĩ kĩ, thường do bị cuốn theo cảm xúc, quảng cáo hay khuyến mãi. Để tránh, em áp dụng "quy tắc 24 giờ": khi muốn mua món gì không thiết yếu, hãy chờ một ngày rồi mới quyết. Thường sau 24 giờ, em sẽ nhận ra mình không thật sự cần nó. Em cũng nên tự hỏi "đây là cần hay chỉ là muốn nhất thời?" trước khi rút ví.' },
      { q: 'Một người lạ nhắn tin báo em "trúng thưởng 10 triệu, chỉ cần nạp thẻ 200.000đ phí nhận thưởng". Em nên làm gì?', a: 'Đây chắc chắn là lừa đảo, em tuyệt đối không nạp thẻ hay làm theo. Quy tắc đơn giản: không ai cho không ai khoản tiền lớn, và phần thưởng thật sẽ không bao giờ bắt em phải nộp tiền trước để "nhận". Em chặn tin nhắn đó và báo cho bố mẹ biết. Em cũng không bao giờ cung cấp thông tin cá nhân, mã thẻ cào, mã OTP cho người lạ. Cảnh giác với những lời mời "lãi khủng", "trúng thưởng" là cách bảo vệ tiền của mình.' },
    ]
  ),

  'S8HDTN-w25-quiz': L(
    'Sức khoẻ tinh thần — Tự chăm sóc bản thân',
    'Cũng như cơ thể cần được ăn uống, nghỉ ngơi, tâm hồn em cũng cần được chăm sóc mỗi ngày. Tự chăm sóc bản thân (self-care) không phải là ích kỉ, mà là điều cần thiết để em luôn khoẻ mạnh và hạnh phúc. Cùng cô tìm hiểu nhé!',
    [
      'Hiểu khái niệm tự chăm sóc bản thân (self-care).',
      'Biết các hoạt động chăm sóc thể chất, tinh thần, xã hội.',
      'Biết cách thiết lập ranh giới lành mạnh.',
      'Hiểu tự chăm sóc là cần thiết, không phải ích kỉ.',
    ],
    [
      { h: 'Tự chăm sóc bản thân là gì?' },
      { p: 'Tự chăm sóc bản thân là những hoạt động chủ động em làm để duy trì và nâng cao sức khoẻ thể chất, tinh thần và cảm xúc của chính mình. Đó không phải là nuông chiều bản thân hay tiêu xài, mà là những thói quen lành mạnh giúp em luôn ở trạng thái tốt nhất để học tập và sống vui.' },
      { h: 'Chăm sóc thể chất' },
      { ul: [
        'Ngủ đủ 8–10 tiếng mỗi đêm, ngủ và dậy đúng giờ.',
        'Ăn uống lành mạnh, đủ chất, đúng bữa.',
        'Vận động ít nhất 30–60 phút mỗi ngày.',
        'Giữ vệ sinh cá nhân, uống đủ nước.',
      ] },
      { h: 'Chăm sóc tinh thần' },
      { ul: [
        'Dành thời gian làm điều mình thích: đọc sách, vẽ, nghe nhạc.',
        'Thực hành thư giãn, hít thở sâu, thiền vài phút mỗi ngày.',
        'Viết nhật kí để giải toả và hiểu cảm xúc của mình.',
        'Hạn chế thời gian trên mạng xã hội, tránh thông tin tiêu cực.',
      ] },
      { h: 'Chăm sóc các mối quan hệ' },
      { ul: [
        'Dành thời gian cho gia đình và những người bạn tốt.',
        'Chia sẻ cảm xúc với người tin cậy thay vì dồn nén.',
        'Tránh xa những mối quan hệ độc hại làm em mệt mỏi.',
        'Biết nhờ giúp đỡ khi cần.',
      ] },
      { h: 'Thiết lập ranh giới lành mạnh' },
      { ul: [
        'Biết nói "không" với những việc vượt quá khả năng hoặc khiến em không thoải mái.',
        'Dành thời gian riêng để nghỉ ngơi, nạp lại năng lượng.',
        'Không để người khác lợi dụng lòng tốt của mình.',
        'Cân bằng giữa giúp đỡ người khác và chăm sóc bản thân.',
      ] },
      { h: 'Vì sao tự chăm sóc không phải ích kỉ?' },
      { p: 'Nhiều bạn nghĩ chăm lo cho bản thân là ích kỉ, nhưng thực ra ngược lại. Khi em khoẻ mạnh và cân bằng, em mới có đủ năng lượng để học tốt, giúp đỡ gia đình, bạn bè. Giống như khi đi máy bay, người ta dặn đeo mặt nạ dưỡng khí cho mình trước rồi mới giúp người khác — em phải ổn thì mới có thể chăm sóc người khác được.' },
      { note: 'Chăm sóc bản thân là khoản đầu tư quan trọng nhất. Một chiếc bình có đầy thì mới rót cho người khác được — hãy giữ cho "chiếc bình" của em luôn đầy năng lượng tích cực.' },
    ],
    [
      { q: 'Có bạn nói "Self-care chỉ là đi spa, mua sắm và tiêu tiền cho bản thân". Suy nghĩ này đúng không?', a: 'Suy nghĩ này chưa đúng và khá phiến diện. Tự chăm sóc bản thân thực ra chủ yếu là những thói quen lành mạnh, đơn giản và miễn phí: ngủ đủ giấc, ăn uống điều độ, vận động, dành thời gian cho sở thích, trò chuyện với người thân, và giữ tinh thần tích cực. Mua sắm hay làm đẹp có thể là một phần nhỏ, nhưng cốt lõi của self-care là duy trì sức khoẻ thể chất và tinh thần một cách bền vững, chứ không phải tiêu tiền.' },
      { q: 'Bạn rủ em đi chơi cả buổi tối nhưng em đang rất mệt và cần nghỉ ngơi. Em nên làm gì?', a: 'Em có quyền chăm sóc bản thân bằng cách từ chối một cách lịch sự và thành thật: "Cảm ơn cậu đã rủ, nhưng hôm nay mình mệt quá, mình cần nghỉ ngơi. Hẹn cậu dịp khác nhé." Đây chính là thiết lập ranh giới lành mạnh — biết lắng nghe nhu cầu của cơ thể mình. Một người bạn tốt sẽ hiểu và tôn trọng. Việc nói "không" khi cần không phải là vô tâm, mà là cách em tự bảo vệ sức khoẻ của mình.' },
      { q: 'Em luôn cố gắng giúp đỡ mọi người, nhận hết việc của nhóm và rồi kiệt sức. Em nên thay đổi thế nào?', a: 'Giúp đỡ người khác là điều tốt, nhưng em cũng cần thiết lập ranh giới để không kiệt sức. Em hãy học cách phân chia công việc công bằng trong nhóm thay vì ôm hết, và biết nói "mình giúp phần này thôi, phần kia bạn khác làm nhé". Em không có trách nhiệm gánh vác tất cả. Khi em chăm sóc bản thân tốt, em mới giúp người khác bền lâu được. Hãy nhớ: cân bằng giữa cho đi và giữ lại năng lượng cho chính mình mới là cách sống khoẻ mạnh.' },
    ]
  ),

  'S8HDTN-w26-quiz': L(
    'Phòng chống nghiện game và mạng xã hội',
    'Điện thoại, game và mạng xã hội mang lại nhiều niềm vui và tiện ích, nhưng chúng được thiết kế để giữ chân em càng lâu càng tốt. Hiểu được điều đó giúp em làm chủ công nghệ thay vì bị nó điều khiển. Cùng cô tìm hiểu nhé!',
    [
      'Nhận biết các dấu hiệu của việc lạm dụng thiết bị số.',
      'Hiểu cơ chế khiến game và mạng xã hội gây nghiện.',
      'Biết các cách sử dụng công nghệ điều độ, lành mạnh.',
      'Biết cân bằng giữa thế giới ảo và đời thực.',
    ],
    [
      { h: 'Công nghệ là con dao hai lưỡi' },
      { p: 'Điện thoại, internet, mạng xã hội giúp em học tập, kết nối, giải trí. Nhưng nếu dùng quá mức, chúng có thể ảnh hưởng đến học tập, giấc ngủ, sức khoẻ và các mối quan hệ thật. Vấn đề không phải là công nghệ xấu, mà là cách em sử dụng nó.' },
      { h: 'Dấu hiệu lạm dụng thiết bị số' },
      { ul: [
        'Dùng điện thoại, chơi game nhiều giờ liền mỗi ngày, khó dừng lại.',
        'Cảm thấy bứt rứt, khó chịu khi không được dùng.',
        'Ảnh hưởng đến học tập, giấc ngủ, sức khoẻ.',
        'Mất hứng thú với các hoạt động khác ngoài đời.',
        'Nói dối hoặc giấu giếm về thời gian sử dụng.',
      ] },
      { h: 'Vì sao game và mạng xã hội dễ gây nghiện?' },
      { p: 'Các ứng dụng này được thiết kế rất tinh vi để giữ chân người dùng. Mỗi lượt thích, mỗi thông báo, mỗi chiến thắng trong game đều kích thích não tiết ra dopamine — chất tạo cảm giác vui thích, khiến em muốn tiếp tục. Các nhà thiết kế cố tình tạo ra cơ chế "cuốn" như lướt vô tận, phần thưởng bất ngờ để em dùng càng lâu càng tốt, vì họ kiếm tiền từ thời gian và sự chú ý của em.' },
      { h: 'Cách sử dụng công nghệ điều độ' },
      { ul: [
        'Đặt giới hạn thời gian rõ ràng (ví dụ 1–2 giờ giải trí mỗi ngày).',
        'Tắt các thông báo không cần thiết để bớt bị "kéo" vào điện thoại.',
        'Để điện thoại ở xa khi học và khi ngủ (ít nhất 1 giờ trước khi ngủ).',
        'Dùng các tính năng quản lí thời gian màn hình để theo dõi và nhắc nhở.',
        'Đặt ra những khoảng "không màn hình": giờ ăn cơm, lúc trò chuyện gia đình.',
      ] },
      { h: 'Cân bằng thế giới ảo và đời thực' },
      { ul: [
        'Thay thế thời gian online bằng sở thích ngoài đời: thể thao, vẽ, đọc sách.',
        'Hẹn gặp bạn bè trực tiếp thay vì chỉ nhắn tin, chơi game online.',
        'Tham gia hoạt động ngoài trời, vận động thân thể.',
        'Nhớ rằng cuộc sống thật mới mang lại những trải nghiệm và mối quan hệ sâu sắc nhất.',
      ] },
      { note: 'Công nghệ là công cụ tuyệt vời khi em làm chủ nó. Hãy là người sử dụng thông minh — dùng công nghệ để phục vụ cuộc sống, chứ đừng để cuộc sống bị công nghệ chiếm mất.' },
    ],
    [
      { q: 'Các game miễn phí (free-to-play) không bán giá thì kiếm tiền bằng cách nào, và điều đó liên quan gì đến việc gây nghiện?', a: 'Game miễn phí kiếm tiền chủ yếu qua hai cách: bán vật phẩm, trang phục, lượt chơi trong game, và chiếu quảng cáo. Vì lợi nhuận phụ thuộc vào việc giữ người chơi càng lâu và càng quay lại nhiều càng tốt, nhà phát triển cố tình thiết kế game để gây nghiện — như phần thưởng hằng ngày, nhiệm vụ liên tục, cảm giác "sắp thắng". Hiểu được điều này giúp em cảnh giác và chủ động đặt giới hạn cho mình, thay vì để game điều khiển thời gian của em.' },
      { q: 'Em nhận ra mình dùng điện thoại quá nhiều, làm gì cũng muốn cầm điện thoại. Em nên làm gì để giảm bớt?', a: 'Em có thể bắt đầu bằng những bước cụ thể: đặt giới hạn thời gian dùng mỗi ngày và dùng tính năng theo dõi thời gian màn hình; tắt thông báo không cần thiết; để điện thoại ở phòng khác khi học và khi ngủ. Quan trọng nhất là tìm hoạt động thay thế thú vị ngoài đời — chơi thể thao, gặp bạn, đọc sách, học một sở thích mới. Khi cuộc sống thực đủ phong phú và vui, em sẽ tự nhiên bớt phụ thuộc vào điện thoại. Hãy thay đổi từng chút một, đừng ép mình quá đột ngột.' },
      { q: 'Bạn em nói "Mình chơi game cả ngày cũng có sao đâu, miễn là vui". Em nên trao đổi với bạn thế nào?', a: 'Em có thể chia sẻ với bạn một cách nhẹ nhàng, không phán xét: "Chơi game vui thì không sao, nhưng nếu chơi cả ngày thì có thể ảnh hưởng đến học tập, giấc ngủ và sức khoẻ của cậu đấy. Hay là mình rủ nhau đi đá bóng, hoặc đặt giờ chơi vừa phải thôi?" Em giúp bạn thấy rằng niềm vui ngoài đời cũng rất hấp dẫn, và cân bằng mới là điều quan trọng. Tuy nhiên, em tôn trọng quyết định của bạn và làm gương bằng chính cách sử dụng điều độ của mình.' },
    ]
  ),

  'S8HDTN-w27-quiz': L(
    'Trở thành công dân số có trách nhiệm',
    'Mỗi lần em đăng bài, bình luận hay chia sẻ trên mạng, em đang để lại dấu ấn và tạo ra ảnh hưởng đến người khác. Là một công dân số có trách nhiệm nghĩa là cư xử văn minh, tử tế trên không gian mạng như ngoài đời thật. Cùng cô tìm hiểu nhé!',
    [
      'Hiểu khái niệm công dân số và trách nhiệm trên mạng.',
      'Biết các nguyên tắc ứng xử văn minh trực tuyến.',
      'Biết cách bảo vệ bản thân và người khác trên mạng.',
      'Có ý thức trách nhiệm với mỗi hành động số của mình.',
    ],
    [
      { h: 'Công dân số là gì?' },
      { p: 'Công dân số là người tham gia vào không gian mạng — học tập, giải trí, kết nối, chia sẻ thông tin. Là công dân số có trách nhiệm nghĩa là em hành xử văn minh, tôn trọng người khác và tuân thủ pháp luật trên môi trường trực tuyến, giống như cách em cư xử tốt ngoài đời thật.' },
      { h: 'Nguyên tắc ứng xử văn minh trên mạng' },
      { ul: [
        'Tử tế trên mạng như ngoài đời — đằng sau mỗi tài khoản là một con người thật.',
        'Tôn trọng quyền riêng tư và sự khác biệt của người khác.',
        'Không tin và không lan truyền thông tin chưa kiểm chứng.',
        'Tôn trọng quyền tác giả, không sao chép, ăn cắp công sức người khác.',
        'Suy nghĩ kĩ trước khi đăng — những gì lên mạng rất khó xoá hết.',
      ] },
      { h: 'Quy tắc "suy nghĩ trước khi đăng"' },
      { p: 'Trước khi đăng hay chia sẻ điều gì, em hãy tự hỏi: Điều này có đúng sự thật không? Có tử tế không? Có làm tổn thương ai không? Mình có thoải mái nếu bố mẹ, thầy cô nhìn thấy không? Một bài đăng thiếu suy nghĩ có thể để lại hậu quả lâu dài, ảnh hưởng đến hình ảnh và cả tương lai của em.' },
      { h: 'Trách nhiệm với hành vi của mình' },
      { ul: [
        'Không tham gia công kích, miệt thị, "ném đá" tập thể ai đó.',
        'Không lan truyền tin đồn, hình ảnh chế giễu người khác.',
        'Báo cáo (report) những nội dung xấu, độc hại mà em gặp.',
        'Chịu trách nhiệm về lời nói của mình, dám xin lỗi khi sai.',
      ] },
      { h: 'Bảo vệ người khác trên mạng' },
      { ul: [
        'Không chia sẻ ảnh, thông tin của người khác khi chưa được phép.',
        'Khi thấy ai đó bị bắt nạt trên mạng, hãy đứng về phía nạn nhân.',
        'Gửi lời động viên cho người đang bị tấn công, không "hùa theo".',
        'Báo người lớn hoặc nền tảng khi thấy bạn bè gặp nguy hiểm.',
      ] },
      { note: 'Internet không quên. Mỗi dấu chân số em để lại hôm nay đều có thể theo em suốt nhiều năm. Hãy xây dựng một hình ảnh số tích cực và tử tế cho chính mình.' },
    ],
    [
      { q: 'Em thấy một bạn cùng trường đang bị nhiều người vào trang cá nhân chế giễu, bình luận ác ý. Em nên làm gì?', a: 'Em không "hùa theo" đám đông dù chỉ là thả một biểu tượng cười. Em hãy đứng về phía bạn nạn nhân: gửi cho bạn một tin nhắn riêng động viên ("Đừng buồn nhé, mình ủng hộ cậu"), viết bình luận tích cực nếu phù hợp, và báo cáo những nội dung ác ý cho nền tảng. Nếu tình hình nghiêm trọng, em báo thầy cô hoặc người lớn. Một hành động tử tế nhỏ của em có thể giúp bạn vượt qua khủng hoảng. Im lặng đứng nhìn cũng là một cách gián tiếp ủng hộ kẻ bắt nạt.' },
      { q: 'Vì sao quy tắc "suy nghĩ trước khi đăng" lại quan trọng đến vậy?', a: 'Vì những gì đã đăng lên internet rất khó xoá triệt để — người khác có thể đã chụp màn hình, chia sẻ, lưu lại. Một bài đăng nóng giận, một bức ảnh thiếu cân nhắc hay một bình luận ác ý có thể gây tổn thương cho người khác và để lại "vết" theo em nhiều năm, ảnh hưởng đến hình ảnh, việc học bổng, xin việc sau này. "Suy nghĩ trước khi đăng" giúp em tránh những hối tiếc không thể sửa chữa. Một vài giây dừng lại cân nhắc có thể tránh được rắc rối lớn về sau.' },
      { q: 'Bạn em chụp lén một bạn khác đang ngủ gật buồn cười và định đăng lên nhóm lớp "cho vui". Em nên nói gì?', a: 'Em khuyên bạn không nên đăng: "Đừng đăng nhé, bạn ấy không cho phép và sẽ rất xấu hổ, ngại với cả lớp đấy. Nếu là mình bị chụp lén như vậy thì mình cũng buồn lắm." Việc đăng ảnh người khác khi chưa được phép là xâm phạm quyền riêng tư, và một trò "cho vui" có thể khiến bạn nạn nhân tổn thương. Em giúp bạn đặt mình vào vị trí người khác để hiểu hậu quả. Là công dân số có trách nhiệm, em tôn trọng quyền riêng tư của mọi người.' },
    ]
  ),

  'S8HDTN-w28-quiz': L(
    'Hợp tác và làm việc nhóm',
    'Trong học tập cũng như trong công việc tương lai, hiếm khi em làm việc một mình. Biết hợp tác và làm việc nhóm hiệu quả là một trong những kĩ năng quan trọng nhất của thế kỉ 21. Cùng cô rèn luyện kĩ năng này nhé!',
    [
      'Hiểu giá trị và các vai trò trong làm việc nhóm.',
      'Biết cách phân công và phối hợp công việc.',
      'Biết giải quyết xung đột trong nhóm một cách văn minh.',
      'Hiểu nguyên tắc đánh giá đồng đẳng công bằng.',
    ],
    [
      { h: 'Vì sao làm việc nhóm quan trọng?' },
      { p: 'Một mình thì đi nhanh, nhưng cùng nhau thì đi xa. Làm việc nhóm cho phép kết hợp nhiều ý tưởng, năng lực, chia sẻ công việc và học hỏi lẫn nhau. Hầu hết các thành tựu lớn của xã hội đều là kết quả của sự hợp tác. Vì vậy, kĩ năng làm việc nhóm rất cần cho cả việc học hiện tại và công việc tương lai.' },
      { h: 'Các vai trò trong nhóm' },
      { ul: [
        'Nhóm trưởng: điều phối, phân công, đôn đốc, giữ nhóm đi đúng hướng.',
        'Thư kí: ghi chép, tổng hợp ý kiến và kết quả.',
        'Người sáng tạo: đưa ra ý tưởng mới.',
        'Người thực thi: triển khai công việc cụ thể, đúng hạn.',
        'Người phản biện: kiểm tra, đặt câu hỏi để nhóm tránh sai sót.',
      ] },
      { h: 'Bí quyết phối hợp hiệu quả' },
      { ul: [
        'Thống nhất mục tiêu chung và phân công rõ ràng ngay từ đầu.',
        'Mỗi người làm tốt phần của mình và đúng hạn.',
        'Giao tiếp thường xuyên, cập nhật tiến độ cho nhau.',
        'Tôn trọng, lắng nghe ý kiến mọi người, không áp đặt.',
        'Hỗ trợ nhau khi có thành viên gặp khó khăn.',
      ] },
      { h: 'Giải quyết xung đột trong nhóm' },
      { ul: [
        'Lắng nghe đầy đủ ý kiến các bên trước khi kết luận.',
        'Tập trung vào vấn đề, không công kích cá nhân.',
        'Tìm điểm chung, hướng tới mục tiêu chung của nhóm.',
        'Sẵn sàng nhượng bộ, dung hoà; nếu cần thì biểu quyết theo số đông.',
      ] },
      { h: 'Đánh giá đồng đẳng công bằng' },
      { p: 'Đánh giá đồng đẳng là việc các thành viên đánh giá đóng góp của nhau. Em cần đánh giá trung thực dựa trên đóng góp thực tế, mức độ hợp tác và chất lượng công việc — không vì thân quen mà thiên vị, cũng không vì mâu thuẫn mà hạ thấp. Đánh giá công bằng giúp nhóm hoạt động lành mạnh và mọi người đều có trách nhiệm.' },
      { note: 'Một nhóm mạnh không phải là nhóm toàn người giỏi, mà là nhóm biết phối hợp, tôn trọng và cùng nhau tiến bộ. Hãy là một thành viên đáng tin cậy của nhóm.' },
    ],
    [
      { q: 'Trong nhóm có một bạn không làm gì nhưng vẫn muốn được ghi tên vào bài chung. Em nên xử lí thế nào?', a: 'Trước hết, em nên trò chuyện riêng với bạn để tìm hiểu lí do — có thể bạn gặp khó khăn hoặc không biết làm phần nào. Em cùng nhóm có thể giao cho bạn một phần việc phù hợp để bạn đóng góp. Nếu bạn vẫn không hợp tác, khi đánh giá đồng đẳng em cần trung thực phản ánh mức đóng góp thực tế, và có thể báo thầy cô để được hướng dẫn xử lí công bằng. Bao che cho sự không đóng góp là không công bằng với các thành viên đã nỗ lực, nhưng cách giải quyết nên ưu tiên giúp bạn quay lại trước khi loại trừ.' },
      { q: 'Vai trò "người phản biện" trong nhóm có thật sự cần thiết không, hay chỉ làm nhóm thêm tranh cãi?', a: 'Vai trò phản biện rất cần thiết và có giá trị. Người phản biện đặt những câu hỏi khó, chỉ ra điểm chưa hợp lí, giúp nhóm phát hiện sai sót trước khi quá muộn và đưa ra quyết định kĩ lưỡng hơn. Đây không phải là gây tranh cãi vô ích, mà là góp ý mang tính xây dựng. Một nhóm chỉ toàn gật đầu đồng ý dễ mắc sai lầm tập thể. Tất nhiên, người phản biện cần góp ý với thái độ tôn trọng, tập trung vào vấn đề chứ không công kích cá nhân.' },
      { q: 'Hai bạn trong nhóm tranh cãi gay gắt về cách làm, không ai chịu ai, khiến cả nhóm bế tắc. Em nên làm gì?', a: 'Em có thể đóng vai trò hoà giải: mời từng bạn bình tĩnh trình bày quan điểm của mình, để mọi người lắng nghe đầy đủ. Sau đó, em hướng cả nhóm tập trung vào mục tiêu chung và tìm điểm chung giữa hai ý kiến. Nếu vẫn chưa thống nhất, nhóm có thể thử cả hai cách trên một phần nhỏ để xem cách nào hiệu quả hơn, hoặc biểu quyết theo số đông. Quan trọng là tách "vấn đề" khỏi "con người" — tranh luận về cách làm, không biến thành công kích cá nhân.' },
    ]
  ),

  'S8HDTN-w29-quiz': L(
    'Sáng tạo và đổi mới (creativity & innovation)',
    'Sáng tạo không chỉ dành cho hoạ sĩ hay nhà phát minh — đó là kĩ năng mà bất cứ ai cũng có thể rèn luyện và rất cần trong thời đại ngày nay. Cùng cô khám phá cách khơi dậy và nuôi dưỡng sự sáng tạo của chính em nhé!',
    [
      'Hiểu khái niệm sáng tạo và đổi mới.',
      'Phân biệt được sáng tạo và đổi mới.',
      'Biết các phương pháp rèn luyện tư duy sáng tạo.',
      'Tin rằng sáng tạo là kĩ năng có thể học được.',
    ],
    [
      { h: 'Sáng tạo là gì?' },
      { p: 'Sáng tạo là khả năng tạo ra những ý tưởng mới mẻ, hoặc kết nối những điều đã có theo cách mới lạ và hữu ích. Sáng tạo không nhất thiết là phát minh ra điều chưa từng tồn tại — nhiều khi đó là nhìn một vấn đề quen thuộc theo góc độ khác, tìm ra cách giải quyết độc đáo.' },
      { h: 'Đổi mới là gì? Khác sáng tạo thế nào?' },
      { p: 'Nếu sáng tạo là nghĩ ra ý tưởng mới, thì đổi mới (innovation) là biến ý tưởng đó thành sản phẩm, giải pháp thực tế có giá trị. Sáng tạo là "nghĩ ra", đổi mới là "làm cho thành hiện thực". Ví dụ: nghĩ ra ý tưởng về một ứng dụng học tập là sáng tạo; thật sự tạo ra và đưa ứng dụng đó vào sử dụng là đổi mới.' },
      { h: 'Sáng tạo là kĩ năng có thể rèn luyện' },
      { p: 'Nhiều người lầm tưởng sáng tạo là tài năng bẩm sinh chỉ một số ít người có. Thực ra, sáng tạo là kĩ năng mọi người đều có thể rèn luyện và phát triển. Càng tiếp xúc nhiều, đặt nhiều câu hỏi và dám thử nghiệm, em càng trở nên sáng tạo hơn.' },
      { h: 'Các phương pháp rèn luyện sáng tạo' },
      { ul: [
        'Quan sát nhiều, đọc nhiều, trải nghiệm nhiều để có "nguyên liệu" cho ý tưởng.',
        'Đặt câu hỏi "Nếu... thì sao?" để mở ra những khả năng mới.',
        'Động não (brainstorming): liệt kê thật nhiều ý tưởng trước, không vội phê phán.',
        'Kết hợp những điều tưởng chừng không liên quan để tạo ý tưởng mới.',
        'Dám thử và sai — nhiều phát minh ra đời sau rất nhiều lần thất bại.',
        'Cho mình thời gian nghỉ ngơi — ý tưởng hay thường đến lúc thư giãn.',
      ] },
      { h: 'Nguyên tắc khi động não (brainstorming)' },
      { ul: [
        'Đưa ra càng nhiều ý tưởng càng tốt — số lượng trước, chất lượng sau.',
        'Không phê phán, chê bai ý tưởng nào trong lúc đang động não.',
        'Khuyến khích ý tưởng "điên rồ", khác thường.',
        'Phát triển dựa trên ý tưởng của người khác.',
      ] },
      { note: 'Mỗi người đều có khả năng sáng tạo. Đừng sợ ý tưởng của mình "ngớ ngẩn" — nhiều phát minh vĩ đại từng bị coi là viển vông. Hãy mạnh dạn nghĩ khác và thử nghiệm.' },
    ],
    [
      { q: 'Sáng tạo có phải là tài năng bẩm sinh mà chỉ một số người có không?', a: 'Không. Đây là một quan niệm sai lầm phổ biến. Sáng tạo là kĩ năng mà bất kì ai cũng có thể rèn luyện và phát triển. Bằng cách quan sát nhiều, đọc nhiều, đặt câu hỏi, dám thử nghiệm và không sợ thất bại, em sẽ ngày càng sáng tạo hơn. Tài năng bẩm sinh có thể giúp một số người khởi đầu thuận lợi, nhưng phần lớn sự sáng tạo đến từ luyện tập và thói quen tư duy mở. Vì vậy em hoàn toàn có thể trở nên sáng tạo hơn nếu chịu rèn luyện.' },
      { q: 'Hãy nêu sự khác nhau giữa "sáng tạo" và "đổi mới" qua một ví dụ.', a: 'Sáng tạo là nghĩ ra ý tưởng mới, còn đổi mới là biến ý tưởng đó thành hiện thực có giá trị. Ví dụ: chiếc điện thoại thông minh là một sự đổi mới — nó kết hợp những thứ đã có sẵn (điện thoại, máy tính bỏ túi, máy nghe nhạc, máy ảnh) thành một sản phẩm hoàn toàn mới và đưa vào sử dụng rộng rãi. Ý tưởng "gộp nhiều thiết bị làm một" là sáng tạo, còn việc thiết kế, chế tạo và bán ra sản phẩm thực tế chính là đổi mới. Sáng tạo là bước đầu, đổi mới là bước hiện thực hoá.' },
      { q: 'Khi cả nhóm đang động não tìm ý tưởng, một bạn đưa ra ý tưởng nghe có vẻ kì quặc. Em nên phản ứng thế nào?', a: 'Theo nguyên tắc động não, em không nên vội phê phán hay chê bai ý tưởng đó, dù nó nghe kì quặc. Trong giai đoạn động não, mục tiêu là thu thập càng nhiều ý tưởng càng tốt, kể cả những ý "điên rồ" — vì chính chúng đôi khi gợi mở ra giải pháp hay. Em có thể đón nhận và phát triển thêm: "Ý hay đấy, nếu kết hợp với... thì sao nhỉ?" Việc đánh giá, chọn lọc ý tưởng nào khả thi sẽ làm sau khi đã có đủ ý. Tạo không khí cởi mở, không phán xét giúp mọi người tự tin đóng góp và nhóm sáng tạo hơn.' },
    ]
  ),

  'S8HDTN-w30-quiz': L(
    'Kỹ năng thuyết trình',
    'Biết trình bày ý tưởng của mình một cách rõ ràng, thuyết phục trước người khác là kĩ năng em sẽ dùng suốt cả đời — từ thuyết trình trên lớp đến phỏng vấn, làm việc sau này. Cùng cô luyện kĩ năng "nói trước đám đông" thật tự tin nhé!',
    [
      'Biết cách chuẩn bị nội dung thuyết trình.',
      'Biết nguyên tắc thiết kế slide hỗ trợ hiệu quả.',
      'Nắm các kĩ năng trình bày tự tin, cuốn hút.',
      'Biết cách tương tác với người nghe.',
    ],
    [
      { h: 'Vì sao kĩ năng thuyết trình quan trọng?' },
      { p: 'Dù có ý tưởng hay đến đâu, nếu không biết trình bày thì người khác cũng khó hiểu và khó bị thuyết phục. Kĩ năng thuyết trình giúp em chia sẻ kiến thức, bảo vệ quan điểm, và để lại ấn tượng tốt. Đây là kĩ năng cần cho học tập, thi cử, phỏng vấn và công việc tương lai.' },
      { h: 'Chuẩn bị nội dung' },
      { ul: [
        'Hiểu rõ người nghe là ai để chọn cách nói phù hợp.',
        'Xây dựng cấu trúc 3 phần rõ ràng: mở đầu – thân bài – kết luận.',
        'Mở đầu thu hút bằng câu hỏi, con số ấn tượng hoặc một câu chuyện.',
        'Tập trung vào 3–5 ý chính, đừng ôm đồm quá nhiều.',
        'Kết thúc mạnh mẽ, có thể là một lời kêu gọi hành động hoặc thông điệp đáng nhớ.',
      ] },
      { h: 'Thiết kế slide hỗ trợ' },
      { ul: [
        'Mỗi slide chỉ trình bày một ý chính.',
        'Dùng chữ to, ít chữ; ưu tiên hình ảnh, sơ đồ thay cho đoạn văn dài.',
        'Màu sắc hài hoà, dễ đọc; tránh quá nhiều hiệu ứng rối mắt.',
        'Slide là công cụ hỗ trợ, không phải để em đọc nguyên văn.',
      ] },
      { h: 'Kĩ năng trình bày tự tin' },
      { ul: [
        'Đứng thẳng, tư thế tự tin, ánh mắt nhìn bao quát người nghe.',
        'Nói với tốc độ vừa phải, âm lượng đủ nghe, có lên xuống giọng.',
        'Tuyệt đối không cắm mặt đọc slide hay đọc giấy.',
        'Dùng cử chỉ tay tự nhiên để nhấn mạnh ý.',
        'Quản lí thời gian, không nói quá dài.',
      ] },
      { h: 'Tương tác với người nghe' },
      { ul: [
        'Đặt câu hỏi mở để lôi cuốn: "Có bao nhiêu bạn từng...?"',
        'Quan sát phản ứng người nghe để điều chỉnh.',
        'Mỉm cười, tạo không khí thân thiện, gần gũi.',
        'Sẵn sàng trả lời câu hỏi một cách bình tĩnh.',
      ] },
      { h: 'Vượt qua nỗi sợ nói trước đám đông' },
      { p: 'Hồi hộp khi nói trước nhiều người là điều rất bình thường, ngay cả người chuyên nghiệp cũng vậy. Bí quyết là chuẩn bị thật kĩ và luyện tập nhiều lần — tập trước gương, trước người thân. Càng luyện tập, em càng tự tin. Hãy hít thở sâu trước khi bắt đầu và nhớ rằng người nghe luôn mong em làm tốt.' },
      { note: 'Thuyết trình giỏi không phải bẩm sinh mà do luyện tập. Mỗi lần đứng lên trình bày là một lần em tiến bộ. Đừng ngại, hãy nắm lấy mọi cơ hội để rèn luyện.' },
    ],
    [
      { q: 'Em làm slide thuyết trình với mỗi slide chứa khoảng 50 chữ kín đặc. Cách làm này có vấn đề gì?', a: 'Cách làm này có vấn đề lớn: slide quá nhiều chữ khiến người nghe phải đọc thay vì lắng nghe em nói, làm họ mất tập trung và nhàm chán. Slide chỉ nên là công cụ hỗ trợ, mỗi slide một ý chính, dùng chữ to, ít chữ, ưu tiên hình ảnh và sơ đồ. Nếu em chỉ đọc nguyên văn slide, bài thuyết trình sẽ kém hấp dẫn và em trông thiếu tự tin. Em nên rút gọn slide thành các ý ngắn, còn nội dung chi tiết thì em trình bày bằng lời.' },
      { q: 'Khi thuyết trình, em thấy người nghe có vẻ buồn ngủ, không tập trung. Em nên làm gì?', a: 'Em có thể chủ động tăng tương tác để kéo sự chú ý trở lại. Hãy đặt một câu hỏi mở cho cả lớp như "Có bạn nào từng gặp tình huống này chưa?", hoặc kể một câu chuyện, ví dụ thú vị liên quan. Em cũng có thể thay đổi giọng điệu, di chuyển nhẹ, mỉm cười để tạo không khí sinh động hơn. Quan sát phản ứng người nghe và linh hoạt điều chỉnh là kĩ năng quan trọng của người thuyết trình giỏi. Tránh cứ cắm cúi nói một mạch theo kịch bản mà không để ý đến người nghe.' },
      { q: 'Em rất sợ và run khi phải nói trước lớp. Làm sao để bớt sợ và tự tin hơn?', a: 'Hồi hộp khi nói trước đám đông là điều hoàn toàn bình thường, ai cũng từng trải qua kể cả người chuyên nghiệp. Bí quyết quan trọng nhất là chuẩn bị thật kĩ và luyện tập nhiều lần — em tập trước gương, tập với bố mẹ hoặc bạn thân, ghi âm để nghe lại. Càng quen với nội dung, em càng đỡ run. Trước khi nói, em hít thở sâu vài lần để bình tĩnh, và nhớ rằng các bạn ở dưới đều mong em làm tốt chứ không "soi" em. Bắt đầu từ những lần phát biểu nhỏ rồi tăng dần, sự tự tin sẽ đến theo thời gian.' },
    ]
  ),

  'S8HDTN-w31-quiz': L(
    'Hoạt động cộng đồng — Bảo vệ môi trường địa phương',
    'Thay đổi lớn luôn bắt đầu từ những việc nhỏ ngay nơi mình sống. Hôm nay cùng cô học cách quan sát vấn đề môi trường ở khu phố, lập kế hoạch và thực hiện một dự án nhỏ để góp phần làm nơi mình sống xanh sạch đẹp hơn nhé!',
    [
      'Biết cách quan sát và xác định vấn đề môi trường địa phương.',
      'Biết lập kế hoạch cho một dự án cộng đồng nhỏ.',
      'Biết tổ chức thực hiện và đánh giá kết quả.',
      'Hiểu sức mạnh của hành động cộng đồng từ những điều nhỏ.',
    ],
    [
      { h: 'Bắt đầu từ nơi mình sống' },
      { p: 'Bảo vệ môi trường không phải điều gì xa vời. Em có thể bắt đầu ngay từ con phố, khu dân cư của mình. Khi nhiều người cùng hành động ở quy mô nhỏ, tác động cộng lại sẽ rất lớn. Một dự án nhỏ thành công còn truyền cảm hứng cho nhiều người khác cùng làm.' },
      { h: 'Bước 1: Quan sát và xác định vấn đề' },
      { ul: [
        'Đường phố, kênh rạch có nhiều rác thải.',
        'Sông, hồ, ao bị ô nhiễm.',
        'Khu vực thiếu cây xanh, không khí ngột ngạt.',
        'Người dân chưa có thói quen phân loại rác.',
      ] },
      { h: 'Bước 2: Lập kế hoạch' },
      { ul: [
        'Chọn 1 vấn đề cụ thể, vừa sức để giải quyết.',
        'Tìm hiểu nguyên nhân của vấn đề đó.',
        'Đề xuất giải pháp khả thi, phù hợp khả năng.',
        'Phân công vai trò trong nhóm, lập lịch thực hiện.',
        'Xin phép và phối hợp với người lớn, chính quyền địa phương nếu cần.',
      ] },
      { h: 'Bước 3: Thực hiện' },
      { ul: [
        'Tổ chức buổi dọn rác, làm sạch khu vực.',
        'Tuyên truyền, vận động hàng xóm cùng tham gia.',
        'Trồng và chăm sóc cây xanh.',
        'Đặt thùng rác phân loại, dán hướng dẫn.',
        'Viết thư, đề xuất với tổ dân phố, chính quyền về vấn đề lớn hơn.',
      ] },
      { h: 'Bước 4: Đánh giá và rút kinh nghiệm' },
      { p: 'Sau khi thực hiện, em cùng nhóm nhìn lại: kết quả đạt được thế nào? Điều gì làm tốt, điều gì chưa? Bài học rút ra là gì? Bước tiếp theo nên làm gì để duy trì kết quả? Việc đánh giá giúp dự án sau hiệu quả hơn và kết quả được giữ lâu dài.' },
      { note: 'Đừng nghĩ "mình còn nhỏ thì làm được gì". Tuổi nhỏ làm việc nhỏ, nhưng khi nhiều người cùng chung tay, những việc nhỏ tạo nên thay đổi lớn. Hãy bắt đầu từ chính nơi em sống.' },
    ],
    [
      { q: 'Con phố nơi em ở thường xuyên ngập rác vì mọi người vứt bừa bãi. Em muốn cải thiện thì nên bắt đầu thế nào?', a: 'Em nên đi theo các bước của một dự án nhỏ. Trước hết, em quan sát kĩ để hiểu nguyên nhân (thiếu thùng rác? thói quen của người dân?). Sau đó em rủ một nhóm bạn lập kế hoạch: tổ chức một buổi dọn rác, đề xuất đặt thêm thùng rác, và làm bảng tuyên truyền nhắc nhở. Em xin phép bố mẹ và phối hợp với tổ dân phố. Sau buổi dọn, em vận động hàng xóm cùng giữ gìn. Quan trọng là bắt đầu từ việc cụ thể, vừa sức, có người lớn hỗ trợ, rồi duy trì đều đặn.' },
      { q: 'Có bạn nói "Một mình học sinh thì làm sao thay đổi được môi trường cả khu phố?". Em nghĩ sao?', a: 'Em không đồng tình với suy nghĩ bi quan đó. Tuy một mình em không thể thay đổi tất cả, nhưng em có thể bắt đầu và lan toả. Em tổ chức một nhóm bạn, mỗi người làm một phần; em vận động gia đình, hàng xóm cùng tham gia; em đề xuất ý tưởng với tổ dân phố. Một hành động nhỏ nhưng nhân lên với nhiều người sẽ tạo thay đổi thật sự. Nhiều phong trào bảo vệ môi trường lớn cũng bắt đầu từ một vài người dám hành động. Nhỏ cộng với nhiều và kiên trì sẽ thành thay đổi lớn.' },
      { q: 'Sau khi nhóm em tổ chức một buổi trồng cây ở khu phố, em nên làm gì tiếp theo để việc làm có ý nghĩa lâu dài?', a: 'Sau khi trồng cây, em không nên "trồng xong rồi bỏ". Em cùng nhóm cần lên kế hoạch chăm sóc cây: phân công tưới nước, theo dõi cây có sống tốt không. Em cũng đánh giá lại buổi tổ chức: điều gì làm tốt, điều gì cần cải thiện cho lần sau. Quan trọng nữa là vận động hàng xóm cùng giữ gìn và bảo vệ cây. Việc theo dõi, duy trì và rút kinh nghiệm giúp dự án có kết quả lâu dài, chứ không chỉ là một hoạt động chụp ảnh rồi quên lãng.' },
    ]
  ),

  'S8HDTN-w32-quiz': L(
    'Kỹ năng giải quyết vấn đề',
    'Cuộc sống luôn đặt ra những vấn đề, khó khăn cần giải quyết — từ việc học, mối quan hệ đến những tình huống bất ngờ. Biết cách giải quyết vấn đề một cách có phương pháp là kĩ năng nền tảng giúp em vững vàng trước mọi thử thách. Cùng cô tìm hiểu nhé!',
    [
      'Nắm được quy trình 5 bước giải quyết vấn đề.',
      'Biết vận dụng tư duy phản biện khi giải quyết vấn đề.',
      'Biết đưa ra nhiều giải pháp và lựa chọn phương án tốt nhất.',
      'Áp dụng được vào tình huống thực tế.',
    ],
    [
      { h: 'Vì sao cần kĩ năng giải quyết vấn đề?' },
      { p: 'Vấn đề là một phần tất yếu của cuộc sống. Người có kĩ năng giải quyết vấn đề tốt sẽ bình tĩnh hơn, ít bị stress hơn và tìm được lối ra ngay cả trong tình huống khó. Đây là kĩ năng được nhà tuyển dụng đánh giá rất cao và cần cho mọi lĩnh vực của cuộc sống.' },
      { h: 'Quy trình 5 bước giải quyết vấn đề' },
      { ul: [
        'Bước 1 – Xác định vấn đề: nêu rõ ràng vấn đề là gì, đừng mơ hồ.',
        'Bước 2 – Phân tích nguyên nhân: tìm hiểu vì sao vấn đề xảy ra.',
        'Bước 3 – Đề xuất các giải pháp: nghĩ ra nhiều cách giải quyết khác nhau.',
        'Bước 4 – Lựa chọn giải pháp tốt nhất: cân nhắc lợi – hại của từng cách.',
        'Bước 5 – Thực hiện và đánh giá: làm thử, theo dõi kết quả, điều chỉnh.',
      ] },
      { h: 'Vận dụng tư duy phản biện' },
      { ul: [
        'Đừng vội kết luận khi chưa hiểu rõ vấn đề.',
        'Thu thập thêm thông tin trước khi quyết định.',
        'Xem xét vấn đề từ nhiều góc nhìn khác nhau.',
        'Cân nhắc rủi ro và lợi ích của mỗi giải pháp.',
      ] },
      { h: 'Vì sao nên nghĩ ra nhiều giải pháp?' },
      { p: 'Giải pháp đầu tiên nghĩ ra thường không phải là giải pháp tốt nhất. Khi em liệt kê nhiều phương án và so sánh, em sẽ thấy được những lựa chọn hay hơn mà ban đầu chưa nghĩ tới. Đây là lúc tư duy sáng tạo và phản biện kết hợp với nhau.' },
      { h: 'Một ví dụ vận dụng' },
      { p: 'Giả sử điểm Toán của em đang sa sút. Bước 1: vấn đề là "điểm Toán giảm 2 điểm trong 2 tháng qua". Bước 2: phân tích nguyên nhân — có thể do không hiểu bài mới, lười làm bài tập, hay thiếu ngủ. Bước 3: đề xuất giải pháp — hỏi thầy cô, học nhóm, ngủ đủ giấc, làm thêm bài tập. Bước 4: chọn giải pháp khả thi nhất — học nhóm kết hợp ngủ đủ. Bước 5: thực hiện trong 1 tháng rồi đánh giá xem điểm có cải thiện không.' },
      { note: 'Đứng trước một vấn đề, đừng hoảng loạn cũng đừng né tránh. Hãy bình tĩnh đi qua từng bước. Khả năng giải quyết vấn đề chính là khả năng làm chủ cuộc sống của mình.' },
    ],
    [
      { q: 'Hãy nêu 5 bước của quy trình giải quyết vấn đề.', a: 'Quy trình giải quyết vấn đề gồm 5 bước: (1) Xác định vấn đề một cách rõ ràng; (2) Phân tích nguyên nhân của vấn đề; (3) Đề xuất nhiều giải pháp khác nhau; (4) Lựa chọn giải pháp tốt nhất sau khi cân nhắc lợi – hại; (5) Thực hiện giải pháp và đánh giá kết quả để điều chỉnh nếu cần. Đi tuần tự qua các bước này giúp em giải quyết vấn đề một cách bình tĩnh và hiệu quả, thay vì hành động vội vàng theo cảm tính.' },
      { q: 'Vì sao không nên chọn ngay giải pháp đầu tiên nghĩ ra mà cần đề xuất nhiều giải pháp?', a: 'Vì giải pháp đầu tiên thường là phản xạ nhanh, chưa được cân nhắc kĩ và hiếm khi là phương án tối ưu. Khi em chịu khó nghĩ ra nhiều giải pháp rồi so sánh chúng về mặt lợi ích, rủi ro, tính khả thi, em sẽ phát hiện những lựa chọn hay hơn mà ban đầu chưa nghĩ tới. Việc có nhiều phương án cũng cho em "đường lui" nếu cách đầu không hiệu quả. Đây là lúc tư duy sáng tạo (nghĩ ra nhiều cách) kết hợp với tư duy phản biện (đánh giá từng cách) để đưa ra quyết định khôn ngoan.' },
      { q: 'Em và bạn thân vừa cãi nhau và không nói chuyện cả tuần. Em rất buồn. Hãy áp dụng quy trình giải quyết vấn đề.', a: 'Em có thể áp dụng 5 bước. Bước 1 — xác định vấn đề: "Mình và bạn thân giận nhau, không nói chuyện đã một tuần." Bước 2 — phân tích nguyên nhân: do hiểu lầm gì? Ai đã nói gì làm tổn thương ai? Bước 3 — đề xuất giải pháp: chủ động nhắn tin làm hoà, nhờ bạn chung hoà giải, viết một lời xin lỗi, hay chờ thêm thời gian. Bước 4 — chọn giải pháp tốt nhất: có lẽ là chủ động gặp riêng bạn, bình tĩnh nói ra cảm xúc và lắng nghe bạn. Bước 5 — thực hiện và đánh giá: sau khi nói chuyện, xem mối quan hệ có cải thiện không, và rút kinh nghiệm để tránh hiểu lầm lần sau. Cách tiếp cận này giúp em giải quyết mâu thuẫn một cách chín chắn thay vì để nó kéo dài.' },
    ]
  ),

  'S8HDTN-w33-quiz': L(
    'Định hướng tương lai — Tầm nhìn 5-10 năm',
    'Có một tầm nhìn cho tương lai giống như có ngọn hải đăng dẫn đường — giúp em không lạc lối giữa những lo toan thường ngày. Hôm nay cùng cô tập tưởng tượng và phác hoạ bức tranh tương lai mà em mong muốn nhé!',
    [
      'Hiểu khái niệm tầm nhìn cá nhân và vai trò của nó.',
      'Biết cách xây dựng tầm nhìn cho bản thân.',
      'Biết phương pháp lập kế hoạch ngược (từ mục tiêu xa về hiện tại).',
      'Hiểu rằng tầm nhìn có thể điều chỉnh theo thời gian.',
    ],
    [
      { h: 'Tầm nhìn cá nhân là gì?' },
      { p: 'Tầm nhìn cá nhân là bức tranh về tương lai mà em mong muốn — em muốn trở thành người như thế nào, làm công việc gì, sống ra sao, đóng góp điều gì cho mọi người. Tầm nhìn không phải là kế hoạch chi tiết, mà là hình dung tổng thể về hướng đi và những giá trị em theo đuổi.' },
      { h: 'Vì sao cần có tầm nhìn?' },
      { p: 'Khi có tầm nhìn, em sẽ biết mình đang đi đâu và vì sao mình cố gắng. Nó giúp em không bị cuốn vào những lo toan ngắn hạn mà quên mất mục tiêu lớn. Tầm nhìn cũng tạo động lực mạnh mẽ — những ngày khó khăn, nghĩ về tương lai mong muốn sẽ giúp em kiên trì hơn.' },
      { h: 'Cách xây dựng tầm nhìn cho bản thân' },
      { ul: [
        'Tưởng tượng 5–10 năm sau, em đang làm gì, ở đâu, với ai?',
        'Em muốn trở thành người như thế nào, có phẩm chất gì?',
        'Em muốn đóng góp điều gì cho gia đình, xã hội?',
        'Điều gì khiến em cảm thấy hạnh phúc và tự hào?',
      ] },
      { h: 'Lập kế hoạch ngược (backwards planning)' },
      { ul: [
        'Tầm nhìn 10 năm: bức tranh lớn về con người và cuộc sống em mong muốn.',
        'Mục tiêu 5 năm: những cột mốc trung gian cần đạt.',
        'Mục tiêu 1 năm: điều cần làm trong năm tới.',
        'Bước đi tháng này, tuần này: những hành động cụ thể ngay bây giờ.',
      ] },
      { h: 'Tầm nhìn không phải "khoá cứng"' },
      { p: 'Tầm nhìn ở tuổi 14 không cần phải chính xác tuyệt đối và cũng không bắt buộc phải giữ nguyên suốt đời. Khi em trải nghiệm và hiểu mình hơn, tầm nhìn có thể thay đổi — và đó là điều bình thường. Quan trọng là em luôn có một hướng đi để định hướng hành động hiện tại, thay vì sống không mục tiêu.' },
      { note: 'Tương lai không phải điều ta chờ đợi, mà là điều ta tạo nên từ hôm nay. Có tầm nhìn rõ ràng và hành động mỗi ngày, em đang từng bước xây dựng tương lai mình mong muốn.' },
    ],
    [
      { q: 'Em mới 14 tuổi, vì sao đã cần nghĩ đến tầm nhìn 10 năm khi tương lai còn rất xa và chưa chắc chắn?', a: 'Đúng là tương lai 10 năm còn xa và có thể thay đổi, nhưng việc có tầm nhìn ngay từ bây giờ vẫn rất hữu ích. Tầm nhìn giúp em định hướng những lựa chọn quan trọng sắp tới — chọn trường THPT, chọn môn học, chọn nghề. Nó không cần chính xác tuyệt đối; chỉ cần một hướng đi để em biết mình đang cố gắng vì điều gì. Tầm nhìn còn tạo động lực giúp em kiên trì qua những lúc khó khăn. Và nếu sau này tầm nhìn thay đổi khi em hiểu mình hơn, đó cũng là điều hoàn toàn bình thường.' },
      { q: 'Phương pháp "lập kế hoạch ngược" hoạt động như thế nào?', a: 'Lập kế hoạch ngược là cách đi từ mục tiêu xa nhất rồi lùi dần về hiện tại. Em bắt đầu bằng tầm nhìn 10 năm (con người và cuộc sống em mong muốn), rồi tự hỏi: để đạt được điều đó, 5 năm nữa mình cần đạt cột mốc gì? Tiếp theo, để đạt mốc 5 năm, năm tới mình cần làm gì? Và cuối cùng, để đạt mục tiêu năm tới, tháng này, tuần này mình cần hành động cụ thể ra sao? Cách này giúp biến một ước mơ lớn, xa vời thành những bước đi nhỏ, rõ ràng mà em có thể bắt đầu ngay hôm nay.' },
      { q: 'Em từng mơ ước làm phi công, nhưng giờ lại thấy thích nghề khác hơn. Em có "thất bại" hay "thiếu kiên định" không?', a: 'Hoàn toàn không. Việc thay đổi ước mơ khi em lớn lên và hiểu mình hơn là điều rất bình thường và tự nhiên, không phải là thất bại hay thiếu kiên định. Ở tuổi của em, được khám phá nhiều hướng khác nhau chính là cách để tìm ra điều thật sự phù hợp. Tầm nhìn không phải là "khoá cứng" suốt đời — nó có thể và nên được điều chỉnh theo trải nghiệm. Điều quan trọng là em vẫn luôn có một hướng đi để nỗ lực, và mỗi lần khám phá lại giúp em hiểu bản thân rõ hơn. Hãy cứ tiếp tục tìm hiểu nghề mới mà em thấy hứng thú.' },
    ]
  ),

  'S8HDTN-w34-quiz': L(
    'Tham gia hoạt động ngoại khoá và CLB',
    'Bên cạnh việc học chính khoá, các hoạt động ngoại khoá và câu lạc bộ là nơi tuyệt vời để em phát triển kĩ năng, khám phá đam mê và kết bạn. Cùng cô tìm hiểu cách chọn và tham gia hoạt động ngoại khoá sao cho thật ý nghĩa nhé!',
    [
      'Hiểu lợi ích của hoạt động ngoại khoá và câu lạc bộ.',
      'Biết các loại câu lạc bộ phổ biến.',
      'Biết cách chọn hoạt động phù hợp với bản thân.',
      'Biết tham gia tích cực và cân bằng với việc học.',
    ],
    [
      { h: 'Vì sao hoạt động ngoại khoá quan trọng?' },
      { p: 'Hoạt động ngoại khoá quan trọng không kém học chính khoá. Đây là nơi em rèn những kĩ năng mà sách vở không dạy được, khám phá những đam mê mới và xây dựng các mối quan hệ. Nhiều bài học quý giá về cuộc sống đến từ chính những hoạt động ngoài giờ học.' },
      { h: 'Lợi ích cụ thể' },
      { ul: [
        'Phát triển kĩ năng mềm: lãnh đạo, làm việc nhóm, giao tiếp, tổ chức.',
        'Khám phá và nuôi dưỡng đam mê, sở thích.',
        'Mở rộng mạng lưới bạn bè cùng sở thích.',
        'Tạo lợi thế cho hồ sơ xét tuyển, học bổng sau này.',
        'Mang lại niềm vui, cân bằng và sức khoẻ tinh thần.',
      ] },
      { h: 'Các loại câu lạc bộ phổ biến' },
      { ul: [
        'Học thuật: câu lạc bộ Toán, Tiếng Anh, Khoa học, Tranh biện.',
        'Nghệ thuật: Âm nhạc, Mĩ thuật, Múa, Kịch.',
        'Thể thao: Bóng đá, Bóng rổ, Cầu lông, Cờ vua.',
        'Xã hội: Tình nguyện, Môi trường, Truyền thông.',
        'Công nghệ: Lập trình, Robotics, Sáng tạo.',
      ] },
      { h: 'Cách chọn hoạt động phù hợp' },
      { ul: [
        'Chọn hoạt động em THẬT SỰ thích, không chạy theo bạn bè hay vì "oai".',
        'Cân nhắc thời gian: chỉ nên tham gia 2–3 hoạt động để làm sâu.',
        'Chọn hoạt động giúp em phát triển kĩ năng mình muốn rèn.',
        'Thử trải nghiệm vài buổi trước khi cam kết lâu dài.',
      ] },
      { h: 'Tham gia tích cực và cân bằng' },
      { ul: [
        'Đã tham gia thì cam kết, đi đều đặn, đóng góp thật sự.',
        'Không bỏ giữa chừng, có trách nhiệm với hoạt động đã nhận.',
        'Luôn đảm bảo việc học chính khoá không bị ảnh hưởng.',
        'Biết dừng lại nếu cảm thấy quá tải hoặc không còn phù hợp.',
      ] },
      { note: 'Một hoạt động ngoại khoá làm sâu sắc và bền bỉ có giá trị hơn nhiều so với việc đăng kí thật nhiều mà chỉ tham gia hời hợt. Chất lượng quan trọng hơn số lượng.' },
    ],
    [
      { q: 'Bạn em đăng kí cùng lúc 5 câu lạc bộ để "hồ sơ đẹp". Cách làm này có tốt không?', a: 'Cách làm này không tốt. Tham gia quá nhiều câu lạc bộ cùng lúc khiến em không thể đầu tư sâu vào hoạt động nào, dễ tham gia hời hợt, không đóng góp được nhiều và còn ảnh hưởng đến việc học. Tham gia 2–3 hoạt động mà làm thật sâu, có đóng góp và thành tích cụ thể sẽ giá trị hơn nhiều — cả cho sự phát triển bản thân lẫn cho hồ sơ sau này. Một hồ sơ "đẹp" thật sự là hồ sơ thể hiện sự gắn bó, cam kết và trưởng thành qua một vài hoạt động, chứ không phải một danh sách dài mà chỉ ghi tên cho có.' },
      { q: 'Em được rủ vào câu lạc bộ bóng rổ vì bạn thân ở đó, nhưng em lại thích vẽ hơn. Em nên chọn thế nào?', a: 'Em nên chọn hoạt động mà mình THẬT SỰ thích — trong trường hợp này là câu lạc bộ mĩ thuật, vẽ. Tham gia hoạt động vì đam mê thật sự sẽ giúp em vui vẻ, gắn bó lâu dài và tiến bộ; còn tham gia chỉ vì bạn rủ thì em sẽ nhanh chán và không phát triển được. Em vẫn có thể giữ tình bạn với bạn ở câu lạc bộ bóng rổ mà không cần phải tham gia cùng. Hãy can đảm chọn theo sở thích của mình. Nếu thích, em cũng có thể thử một buổi bóng rổ cho biết, nhưng quyết định cuối cùng nên dựa trên đam mê thật của em.' },
      { q: 'Em tham gia câu lạc bộ nhưng dạo này thấy việc học bị ảnh hưởng, điểm sa sút. Em nên làm gì?', a: 'Em cần đánh giá lại sự cân bằng giữa hoạt động ngoại khoá và việc học. Trước hết, em xem mình có đang tham gia quá nhiều hoạt động không — nếu vậy nên giảm bớt, chỉ giữ lại hoạt động em thật sự yêu thích. Em cũng xem lại cách quản lí thời gian: có thể sắp xếp lịch học và lịch sinh hoạt câu lạc bộ hợp lí hơn. Việc học chính khoá luôn cần được ưu tiên đảm bảo. Nếu sau khi điều chỉnh mà vẫn quá tải, em có thể tạm dừng hoạt động một thời gian để tập trung cho việc học. Cân bằng là chìa khoá — ngoại khoá bổ trợ cho việc học, chứ không nên lấn át nó.' },
    ]
  ),

  'S8HDTN-w35-quiz': L(
    'Tổng kết — Hành trang vào lớp 9',
    'Một năm học với biết bao điều đã được học và trải nghiệm sắp khép lại. Đây là lúc em nhìn lại chặng đường đã qua, gói ghém những hành trang quý giá và chuẩn bị tâm thế vững vàng bước vào lớp 9 — năm học quan trọng nhất của bậc Trung học cơ sở. Cùng cô tổng kết nhé!',
    [
      'Hệ thống lại toàn bộ kĩ năng đã học trong năm.',
      'Xác định hành trang quan trọng để vào lớp 9.',
      'Biết định hướng và lập kế hoạch cho năm học tới.',
      'Có thái độ tự tin, tích cực hướng về tương lai.',
    ],
    [
      { h: 'Nhìn lại một năm trưởng thành' },
      { p: 'Suốt năm lớp 8, em đã đi qua một hành trình dài với rất nhiều kĩ năng và hiểu biết mới. Từ việc khám phá bản thân, rèn các kĩ năng sống, học cách sống an toàn và có trách nhiệm, đến bước đầu định hướng nghề nghiệp — tất cả đã giúp em trưởng thành hơn rất nhiều so với đầu năm.' },
      { h: 'Nhóm kĩ năng phát triển bản thân' },
      { ul: [
        'Hiểu bản thân: tính cách, sở thích, phong cách học tập.',
        'Quản lí thời gian, cảm xúc, ứng phó căng thẳng, tự chăm sóc.',
        'Tư duy phát triển, lập mục tiêu SMART, xây dựng tầm nhìn.',
      ] },
      { h: 'Nhóm kĩ năng xã hội và tư duy' },
      { ul: [
        'Giao tiếp hiệu quả, hợp tác nhóm, thuyết trình.',
        'Tư duy phản biện, giải quyết vấn đề, sáng tạo và đổi mới.',
        'Xây dựng tình bạn lành mạnh, ứng xử văn minh.',
      ] },
      { h: 'Nhóm kiến thức sống an toàn và trách nhiệm' },
      { ul: [
        'An toàn mạng: quyền riêng tư, nhận diện tin giả, công dân số.',
        'Phòng chống xâm hại, quyền được an toàn.',
        'Bảo vệ môi trường, tiêu dùng có trách nhiệm, hoạt động cộng đồng.',
        'Quản lí tài chính cá nhân.',
      ] },
      { h: 'Hành trang vào lớp 9' },
      { ul: [
        'Định hướng tương lai rõ ràng hơn (hướng đi sau THCS, sở thích nghề).',
        'Thói quen học tập tốt và kĩ năng quản lí bản thân.',
        'Tinh thần vững vàng và các mối quan hệ tích cực.',
        'Mục tiêu cụ thể cho năm thi chuyển cấp.',
      ] },
      { h: 'Lớp 9 — năm học bản lề' },
      { p: 'Lớp 9 là năm thi chuyển cấp, quan trọng nhất bậc THCS. Em cần học vững các môn, đặc biệt là Toán, Ngữ văn, Tiếng Anh (thường là các môn thi vào lớp 10), có kế hoạch ôn tập sớm, đồng thời giữ gìn sức khoẻ thể chất và tinh thần. Đừng để áp lực làm em quên mất phải nghỉ ngơi và chăm sóc bản thân.' },
      { note: 'Em đã trưởng thành rất nhiều qua một năm học. Mỗi kĩ năng học được là một viên gạch xây nên tương lai. Hãy tự tin và bước vào lớp 9 với tất cả hành trang quý giá em đã tích luỹ. Cô tin ở em!' },
    ],
    [
      { q: 'Trong tất cả kĩ năng đã học năm lớp 8, em sẽ mang theo 3 kĩ năng nào vào lớp 9 và vì sao?', a: 'Đây là câu hỏi để em tự suy ngẫm, không có đáp án cố định. Em có thể chọn, ví dụ: quản lí thời gian (vì lớp 9 nhiều bài vở, cần sắp xếp tốt để ôn thi), tư duy phát triển (để không nản chí trước môn khó, tin mình tiến bộ được), và ứng phó căng thẳng (vì năm thi chuyển cấp nhiều áp lực). Quan trọng là em giải thích được vì sao những kĩ năng đó cần cho lớp 9 và quyết tâm áp dụng chúng vào thực tế, chứ không chỉ biết trên lí thuyết.' },
      { q: 'Lớp 9 là năm thi chuyển cấp quan trọng. Theo em, những sai lầm nào cần tránh trong năm học này?', a: 'Một số sai lầm cần tránh trong năm lớp 9 gồm: học vẹt, học tủ mà không thật sự hiểu bài; để dồn đến cuối năm mới ôn thi thay vì có kế hoạch sớm; thức quá khuya, bỏ ăn, hi sinh sức khoẻ để học, dẫn đến kiệt sức; tự tạo áp lực quá lớn cho bản thân hoặc so sánh tiêu cực với bạn bè; và ngại nhờ giúp đỡ khi gặp khó khăn. Để học tốt và thi tốt, em nên học hiểu bản chất, có kế hoạch ôn tập đều đặn từ sớm, ngủ đủ giấc, giữ tinh thần thoải mái và biết tìm sự hỗ trợ từ thầy cô, bạn bè khi cần.' },
      { q: 'Em cảm thấy lo lắng khi nghĩ đến áp lực thi cử của lớp 9. Em nên chuẩn bị tâm lí thế nào?', a: 'Cảm giác lo lắng trước một năm quan trọng là điều bình thường, và em hoàn toàn có thể chuẩn bị tâm lí tốt. Trước hết, hãy nhớ rằng em đã tích luỹ được rất nhiều kĩ năng quý trong năm lớp 8 — đó là hành trang vững chắc. Em nên lập kế hoạch ôn tập sớm và chia nhỏ để không bị "ngợp" vào phút cuối; áp dụng các kĩ thuật quản lí căng thẳng đã học như hít thở sâu, vận động, chia sẻ với người thân. Đừng quên chăm sóc sức khoẻ và dành thời gian nghỉ ngơi. Quan trọng nhất, hãy đặt mục tiêu vừa sức và tin vào sự nỗ lực của mình. Áp lực vừa phải sẽ là động lực, miễn là em biết cân bằng và không cô đơn trên hành trình này.' },
    ]
  ),

  'S8HDTN-w36-quiz': L(
    'Kết thúc HĐTN 8 — Trưởng thành qua từng trải nghiệm, vững bước vào lớp 9',
    'Năm lớp 8 là năm em trưởng thành vượt bậc — không chỉ về kiến thức mà còn về kĩ năng sống: biết quản lí bản thân, biết ứng phó với căng thẳng, biết làm việc nhóm, biết tư duy tài chính và định hướng nghề nghiệp. Đây là tuần nhìn lại toàn bộ hành trình đó và chuẩn bị tinh thần cho lớp 9 — năm học quan trọng và thử thách nhất bậc THCS.',
    [
      'Tổng kết các kĩ năng và trải nghiệm đã học trong HĐTN lớp 8.',
      'Nhận diện những điểm đã tiến bộ và những điểm cần tiếp tục rèn luyện.',
      'Xây dựng kế hoạch hành động cụ thể cho mùa hè và năm học lớp 9.',
    ],
    [
      { h: 'Chủ đề 1 — Hiểu bản thân và phát triển cá nhân' },
      { ul: [
        'Khám phá điểm mạnh và điểm yếu bản thân qua MBTI, sở thích Holland, bài kiểm tra đa trí tuệ.',
        'Tư duy phát triển (growth mindset): tin rằng năng lực có thể phát triển qua nỗ lực và học hỏi, không phải bẩm sinh cố định.',
        'Mục tiêu SMART: Specific, Measurable, Achievable, Relevant, Time-bound — cách đặt mục tiêu hiệu quả.',
        'Quản lí thời gian: ma trận Eisenhower (khẩn cấp/quan trọng); nguyên tắc Pareto 80/20; kĩ thuật Pomodoro.',
      ] },
      { h: 'Chủ đề 2 — Sức khoẻ thể chất và tinh thần' },
      { ul: [
        'Sức khoẻ tinh thần: nhận biết và đặt tên cảm xúc (wheel of emotions); điều tiết cảm xúc bằng hít thở, vận động, viết nhật kí.',
        'Ứng phó căng thẳng (stress): phân biệt eustress (căng thẳng tốt — thúc đẩy) và distress (căng thẳng xấu — ảnh hưởng sức khoẻ); kĩ thuật thư giãn (5-4-3-2-1 giác quan, hít thở hộp vuông).',
        'Giấc ngủ và phục hồi: thiếu ngủ ảnh hưởng trí nhớ, cảm xúc và hiệu suất; 8–9 tiếng/đêm là khuyến cáo cho thiếu niên.',
        'Tránh xa thuốc lá, rượu bia, chất kích thích: não bộ ở tuổi 13–18 đang phát triển mạnh — chất kích thích gây tổn hại vĩnh viễn.',
      ] },
      { h: 'Chủ đề 3 — Kĩ năng xã hội và cộng đồng' },
      { ul: [
        'Giao tiếp hiệu quả: lắng nghe chủ động (active listening), phản ánh cảm xúc, đặt câu hỏi mở.',
        'Làm việc nhóm: phân vai rõ ràng, tôn trọng ý kiến khác biệt, giải quyết xung đột bằng đối thoại.',
        'Sự đồng cảm (empathy): đặt mình vào vị trí người khác — nền tảng của mọi mối quan hệ tốt đẹp.',
        'Trách nhiệm cộng đồng: tham gia hoạt động tình nguyện, bảo vệ môi trường, ứng xử văn minh nơi công cộng.',
      ] },
      { h: 'Chủ đề 4 — Tài chính và hướng nghiệp' },
      { ul: [
        'Quản lí tài chính cá nhân: ngân sách (thu – chi – tiết kiệm); phân biệt nhu cầu và mong muốn; tránh chi tiêu bốc đồng.',
        'Khởi nghiệp sáng tạo: tư duy thiết kế (design thinking), mô hình kinh doanh đơn giản.',
        'Hướng nghiệp: tìm hiểu các nhóm ngành nghề; liên kết sở thích – điểm mạnh – nhu cầu xã hội để định hướng nghề tương lai.',
      ] },
      { h: 'Lớp 9 — Năm học bản lề: Những điều cần chuẩn bị' },
      { ul: [
        'Học vững ba môn thi vào lớp 10 (thường là Toán, Văn, Tiếng Anh) từ sớm — không để dồn vào HK II.',
        'Giữ sức khoẻ: ngủ đủ giấc, ăn uống lành mạnh, tập thể dục — đây là nền tảng của hiệu suất học tập.',
        'Tìm người hỗ trợ: thầy cô, bố mẹ, bạn bè tin cậy — không cô đơn chiến đấu với áp lực.',
        'Biết "nói không": từ chối những hoạt động không cần thiết để bảo vệ thời gian và năng lượng.',
        'Lập nhật kí phát triển: ghi lại cảm xúc, bài học và tiến bộ — đây là công cụ giúp em nhìn thấy mình đang lớn lên.',
      ] },
      { h: '3 Bài học lớn nhất của năm lớp 8' },
      { ul: [
        'Bài học 1: Em có khả năng thay đổi và phát triển — năng lực không phải là thứ cố định mà được rèn giũa qua nỗ lực.',
        'Bài học 2: Mối quan hệ tốt là tài sản quý — đầu tư thời gian và tâm sức cho những mối quan hệ ý nghĩa.',
        'Bài học 3: Hành động nhỏ, đều đặn, mỗi ngày — sẽ tạo ra kết quả lớn theo thời gian.',
      ] },
      { note: 'Em đã trưởng thành rất nhiều trong năm học này. Mỗi thử thách em vượt qua, mỗi kĩ năng em rèn được, mỗi mối quan hệ em xây dựng — đó là những viên gạch của người em sẽ trở thành. Hãy bước vào lớp 9 với tất cả sự tự tin và lòng biết ơn vì đã có hành trình đẹp như vậy!' },
    ],
    [
      { q: 'Em đã từng trải qua một tình huống căng thẳng cao điểm (kì thi, xung đột với bạn bè). Hãy kể lại và phân tích cách em đã ứng phó, theo khung đã học.', a: 'Đây là câu hỏi để em tự phản tư — không có đáp án đúng/sai cố định. Một câu trả lời tốt gồm: (1) MÔ TẢ tình huống cụ thể (thi gì? Chuyện gì xảy ra?). (2) NHẬN BIẾT cảm xúc khi đó (lo lắng, tức giận, áp lực — đặt đúng tên). (3) PHÂN TÍCH cách ứng phó: Em đã làm gì? (hít thở, nói chuyện với ai, tạm rời khỏi tình huống?). Cách đó có hiệu quả không? (4) BÀI HỌC: nếu xảy ra lại, em sẽ làm khác thế nào? Quan trọng là em trung thực với bản thân và rút ra được bài học thực tế.' },
      { q: 'Nếu phải đặt MỘT mục tiêu SMART cho mùa hè trước khi vào lớp 9, em sẽ đặt mục tiêu gì và tại sao?', a: 'Ví dụ mục tiêu SMART: "Trong 8 tuần mùa hè (1/6–31/7), tôi sẽ ôn lại toàn bộ chương trình Toán lớp 8 bằng cách làm 3 bài tập/ngày, đạt tỉ lệ đúng ≥ 80% vào cuối kì." Phân tích: Specific (ôn Toán 8), Measurable (3 bài/ngày, 80% đúng), Achievable (vừa sức), Relevant (chuẩn bị cho lớp 9), Time-bound (8 tuần cụ thể). Em nên chọn mục tiêu gắn với điểm yếu cụ thể của mình — không nhất thiết phải là Toán.' },
      { q: 'Vì sao tư duy phát triển (growth mindset) lại quan trọng đặc biệt trong năm lớp 9?', a: 'Lớp 9 là năm thử thách và áp lực nhất bậc THCS. Tư duy phát triển quan trọng vì: (1) Khi gặp khó (môn khó, điểm kém), tư duy phát triển nhắc em "Tôi chưa giỏi ĐỰA NÀY thôi, chứ không phải tôi không thể" — tránh nản chí và bỏ cuộc. (2) Giúp em coi thất bại là phản hồi để cải thiện, không phải là bằng chứng của sự kém cỏi. (3) Khi bạn bè giỏi hơn, tư duy phát triển chuyển ghen tị thành cảm hứng: "Họ giỏi là vì họ đã nỗ lực — tôi cũng có thể!" (4) Đây là nền tảng tâm lí để học hiệu quả suốt đời, không chỉ riêng lớp 9.' },
    ]
  ),
};
