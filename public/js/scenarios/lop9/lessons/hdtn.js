// ============================================================
// Lớp 9 · HĐTN, HƯỚNG NGHIỆP — Lý thuyết tuần (35 tuần)
// Mạch: hướng vào bản thân / xã hội / tự nhiên / hướng nghiệp (GDPT 2018).
// Key trùng id quiz: 'S9HDTN-wNN-quiz'.
// ============================================================

const L = (topic, intro, objectives, theory, examples) => ({ topic, intro, objectives, theory, examples });

export const S9HDTN_LESSONS = {
  'S9HDTN-w01-quiz': L(
    'Khám phá bản thân — Điểm mạnh, điểm yếu',
    'Chào mừng các em đến với năm học cuối cấp! Hành trình lớp 9 bắt đầu bằng câu hỏi quan trọng nhất: "Mình là ai, mình mạnh ở đâu và cần cải thiện điều gì?"',
    ['Nhận diện được điểm mạnh, điểm yếu của bản thân qua nhiều kênh thông tin.', 'Biết dùng công cụ đơn giản như bảng SWOT cá nhân.', 'Lập được kế hoạch phát huy điểm mạnh, khắc phục điểm yếu.', 'Hiểu rằng điểm yếu có thể cải thiện được nhờ rèn luyện.'],
    [
      { h: 'Vì sao phải hiểu chính mình?' },
      { p: 'Lớp 9 là năm các em đứng trước hai quyết định lớn: chọn trường THPT và bước đầu định hướng nghề nghiệp. Mọi lựa chọn đúng đều bắt đầu từ việc hiểu rõ bản thân — giống như muốn chọn giày vừa chân thì trước hết phải biết cỡ chân của mình.' },
      { h: 'Điểm mạnh là gì, điểm yếu là gì?' },
      { p: 'Điểm mạnh là những việc em làm tốt một cách tự nhiên hoặc nhờ rèn luyện: tính toán nhanh, viết văn hay, giao tiếp tự tin, kiên nhẫn, khéo tay... Điểm yếu là những mặt còn hạn chế khiến em gặp khó khăn: hay trì hoãn, ngại nói trước đám đông, dễ nản khi gặp bài khó.' },
      { ul: ['Điểm mạnh không chỉ là điểm số: thái độ, kĩ năng mềm, phẩm chất đều là điểm mạnh.', 'Điểm yếu không phải "bản án" — nó là danh sách việc cần rèn luyện.', 'Một đặc điểm có thể vừa là mạnh vừa là yếu tuỳ hoàn cảnh: cẩn thận quá mức có thể thành chậm chạp.'] },
      { h: 'Ba kênh để nhận diện bản thân' },
      { ul: ['Tự quan sát: ghi lại việc nào em làm say mê quên giờ, việc nào em né tránh.', 'Hỏi người khác: bố mẹ, thầy cô, bạn thân thấy em nổi bật và hạn chế ở điểm nào.', 'Nhìn kết quả thực tế: môn nào điểm cao đều, hoạt động nào em thường được giao phụ trách.'] },
      { h: 'Công cụ SWOT cá nhân' },
      { p: 'Kẻ tờ giấy thành 4 ô: S (Strengths — điểm mạnh), W (Weaknesses — điểm yếu), O (Opportunities — cơ hội bên ngoài như lớp học thêm, câu lạc bộ, người hướng dẫn), T (Threats — thách thức như áp lực thi vào 10, ham chơi game). Điền trung thực từng ô rồi tự hỏi: làm sao dùng S để nắm O và vượt qua T?' },
      { note: 'Hiểu mình không phải việc làm một lần. Hãy xem lại bảng SWOT mỗi học kì — em của tháng 12 đã khác em của tháng 9.' },
    ],
    [
      { q: 'Minh học giỏi Toán nhưng rất ngại phát biểu. Bạn ấy nên ghi gì vào bảng SWOT và hành động ra sao?', a: 'S: tư duy logic, học tốt Toán. W: ngại nói trước đám đông. Hành động: dùng điểm mạnh để tự tin hơn — xung phong chữa bài Toán trên bảng (nội dung mình chắc chắn), bắt đầu từ nhóm nhỏ rồi mở rộng dần. Mỗi tuần đặt mục tiêu phát biểu ít nhất 2 lần.' },
      { q: 'Lan hỏi 3 người về điểm mạnh của mình và nhận 3 câu trả lời khác nhau: mẹ nói "chăm chỉ", cô giáo nói "viết văn tốt", bạn thân nói "biết lắng nghe". Lan nên hiểu thế nào?', a: 'Cả 3 đều đúng vì mỗi người quan sát Lan ở môi trường khác nhau. Lan nên tổng hợp lại: mình có sự chăm chỉ (phẩm chất), năng lực ngôn ngữ (học tập) và kĩ năng lắng nghe (giao tiếp) — đó là bức tranh đa chiều, đầy đủ hơn bất kì câu trả lời đơn lẻ nào.' },
      { q: 'Khang ghi vào ô T (thách thức) của bảng SWOT: "hay sa đà vào game tới khuya". Bạn ấy lúng túng không biết xử lí ô này thế nào. Hãy hướng dẫn Khang dùng điểm mạnh S để khắc chế T.', a: 'Trước hết phân biệt: "sa đà game" thực ra vừa là điểm yếu W (thiếu kỉ luật) vừa tạo ra thách thức T (mất thời gian ôn thi). Cách dùng S khắc T: nếu S của Khang là "thích thử thách, ham cạnh tranh" thì chuyển năng lượng đó sang học — biến việc ôn thành "đua điểm" với chính mình, đặt mốc thưởng. Đồng thời chặn gốc T bằng giải pháp cụ thể: để điện thoại ngoài phòng trong khối học, hẹn giờ chơi có giới hạn. SWOT chỉ có giá trị khi mỗi ô được nối với một hành động.' },
    ]
  ),

  'S9HDTN-w02-quiz': L(
    'Mục tiêu SMART',
    'Tuần trước các em đã hiểu mình hơn; tuần này chúng ta biến hiểu biết đó thành mục tiêu cụ thể bằng công thức SMART — công cụ đặt mục tiêu được dùng trên toàn thế giới.',
    ['Trình bày được 5 tiêu chí của mục tiêu SMART.', 'Phân biệt mục tiêu mơ hồ và mục tiêu SMART.', 'Tự viết được ít nhất một mục tiêu SMART cho học kì 1.', 'Biết chia mục tiêu lớn thành các mốc nhỏ.'],
    [
      { h: 'Mục tiêu mơ hồ — kẻ thù của hành động' },
      { p: '"Em sẽ học giỏi hơn", "Em sẽ chăm chỉ hơn" — những câu này nghe hay nhưng không trả lời được: giỏi hơn bao nhiêu, đến khi nào, làm bằng cách gì? Mục tiêu mơ hồ giống như đặt vé tàu mà không ghi ga đến.' },
      { h: 'Công thức SMART' },
      { ul: ['S — Specific (Cụ thể): nói rõ làm gì, môn gì, kĩ năng gì.', 'M — Measurable (Đo được): có con số để biết đã đạt hay chưa.', 'A — Achievable (Khả thi): vừa sức nhưng đủ thách thức.', 'R — Relevant (Liên quan): phục vụ mục tiêu lớn hơn của em (thi vào 10, định hướng nghề).', 'T — Time-bound (Có thời hạn): hẹn ngày hoàn thành rõ ràng.'] },
      { h: 'Ví dụ chuyển đổi' },
      { p: 'Mơ hồ: "Em sẽ giỏi tiếng Anh." → SMART: "Đến hết học kì 1 (T), em nâng điểm trung bình tiếng Anh từ 6,5 lên 7,5 (M, A) bằng cách học 10 từ vựng mỗi ngày và làm 2 đề nghe mỗi tuần (S), để chuẩn bị cho kì thi vào 10 (R)."' },
      { h: 'Chia nhỏ mục tiêu — kĩ thuật bậc thang' },
      { p: 'Mục tiêu 1 học kì nên chia thành mốc tháng, mốc tháng chia thành việc tuần. Nâng 1 điểm trong 4 tháng nghĩa là mỗi tháng tiến khoảng 0,25 điểm — nghe nhẹ nhàng hơn nhiều và dễ theo dõi hơn.' },
      { h: 'Theo dõi và điều chỉnh' },
      { ul: ['Ghi mục tiêu ra giấy, dán nơi nhìn thấy hằng ngày.', 'Cuối mỗi tuần dành 10 phút tự kiểm: đạt bao nhiêu phần trăm kế hoạch?', 'Nếu liên tục không đạt, đừng bỏ cuộc — hãy hạ độ khó hoặc đổi cách làm, giữ nguyên đích đến.'] },
      { note: 'Mục tiêu viết ra giấy có khả năng hoàn thành cao hơn hẳn mục tiêu chỉ nghĩ trong đầu. Hãy viết xuống ngay hôm nay!' },
    ],
    [
      { q: 'Hãy chỉ ra mục tiêu sau thiếu tiêu chí nào: "Trong tháng 10, em sẽ làm thật nhiều bài tập Toán."', a: 'Có T (tháng 10), có S một phần (môn Toán) nhưng thiếu M — "thật nhiều" không đo được. Sửa lại: "Trong tháng 10, em hoàn thành 60 bài tập Toán hình học, mỗi ngày 2 bài" — giờ đã đo được và kiểm tra được từng ngày.' },
      { q: 'Hùng đặt mục tiêu "thi vào 10 đạt 9 điểm Toán" trong khi điểm hiện tại là 5. Mục tiêu này vi phạm tiêu chí nào và nên sửa ra sao?', a: 'Vi phạm A (khả thi) — nhảy từ 5 lên 9 trong vài tháng dễ gây nản chí. Nên đặt mốc trung gian: hết HK1 đạt 6,5; hết tháng 3 đạt 7,5; mục tiêu thi đạt 7,5–8. Khi đạt mốc sớm hơn dự kiến thì nâng dần.' },
      { q: 'Vì sao tiêu chí R (liên quan) lại quan trọng với học sinh lớp 9?', a: 'Vì thời gian lớp 9 rất quý. Một mục tiêu hay nhưng không phục vụ việc thi vào 10 hoặc định hướng cá nhân (ví dụ cày đủ 100 trận game xếp hạng) sẽ chiếm chỗ của mục tiêu quan trọng. R giúp em ưu tiên đúng việc.' },
    ]
  ),

  'S9HDTN-w03-quiz': L(
    'Quản lý thời gian — Time-block',
    'Có mục tiêu SMART rồi, câu hỏi tiếp theo là: lấy đâu ra thời gian? Tuần này các em học kĩ thuật time-block — chia ngày thành các khối giờ có chủ đích.',
    ['Hiểu nguyên tắc của phương pháp time-block.', 'Tự lập được thời gian biểu theo khối cho một ngày học.', 'Biết kết hợp ma trận Ưu tiên (quan trọng/khẩn cấp) để xếp việc.', 'Nhận diện và giảm các "kẻ cắp thời gian".'],
    [
      { h: 'Time-block là gì?' },
      { p: 'Time-block (khối thời gian) là cách chia ngày thành từng khối 30–90 phút, mỗi khối dành cho MỘT việc duy nhất: khối 19h00–20h00 chỉ làm Toán, khối 20h15–21h00 chỉ học tiếng Anh. Khác với danh sách việc cần làm (to-do list) chỉ liệt kê việc, time-block trả lời luôn câu hỏi "làm lúc nào".' },
      { h: 'Vì sao time-block hiệu quả?' },
      { ul: ['Chống đa nhiệm: não người làm một việc tại một thời điểm sẽ hiệu quả hơn nhảy qua lại nhiều việc.', 'Giảm quyết định vụn vặt: tối đến không phải băn khoăn "giờ học gì đây" — lịch đã định sẵn.', 'Nhìn thấy quỹ thời gian thật: khi xếp khối, em nhận ra một ngày không nhiều giờ trống như tưởng tượng.'] },
      { h: 'Ma trận ưu tiên — xếp việc nào vào khối nào' },
      { p: 'Chia việc theo 2 trục: quan trọng và khẩn cấp. Việc quan trọng + khẩn cấp (bài kiểm tra ngày mai) làm ngay khối đầu. Việc quan trọng + chưa khẩn cấp (ôn thi vào 10) phải có khối cố định hằng ngày — đây là nhóm quyết định tương lai. Việc khẩn cấp nhưng không quan trọng nên làm nhanh hoặc nhờ trợ giúp. Việc không quan trọng + không khẩn cấp (lướt mạng vô định) cắt giảm tối đa.' },
      { h: 'Quy tắc xếp khối cho học sinh' },
      { ul: ['Xếp việc khó nhất vào khung giờ em tỉnh táo nhất.', 'Giữa hai khối học nên nghỉ 10–15 phút: đứng dậy, uống nước, vận động nhẹ.', 'Luôn chừa 1 khối "dự phòng" cuối ngày cho việc phát sinh.', 'Khối giải trí cũng cần được xếp lịch — chơi có giờ thì chơi mới vui và học mới yên tâm.'] },
      { h: 'Kẻ cắp thời gian' },
      { p: 'Điện thoại là kẻ cắp lớn nhất: mỗi lần "xem 5 phút thôi" thường thành 40 phút, và não cần thêm thời gian để quay lại trạng thái tập trung. Trong khối học, hãy để điện thoại ở phòng khác hoặc bật chế độ tập trung.' },
      { note: 'Đừng xếp lịch kín 100%. Lịch tốt là lịch em theo được 80% đều đặn mỗi ngày, không phải lịch hoàn hảo chỉ theo được 1 hôm.' },
    ],
    [
      { q: 'Buổi tối của Nam: 19h ăn cơm xong, 22h30 đi ngủ. Nam cần ôn Toán (yếu), học từ vựng Anh và muốn xem video giải trí. Hãy xếp time-block giúp Nam.', a: '19h15–20h15: Toán (việc khó nhất xếp khi còn tỉnh táo). 20h15–20h30: nghỉ, vận động. 20h30–21h05: từ vựng tiếng Anh. 21h05–21h35: giải trí có giờ (đặt báo thức). 21h35–22h00: dự phòng — xem lại bài ngày mai hoặc làm nốt việc dở. 22h00 chuẩn bị đi ngủ. Điện thoại để ngoài tầm tay trong các khối học.' },
      { q: 'Hoa than: "Mình lập thời gian biểu rất đẹp nhưng chỉ theo được 2 ngày." Nguyên nhân thường gặp là gì?', a: 'Thường do lịch quá tham: xếp kín không có giờ nghỉ, không có khối dự phòng, đặt khối học dài quá 90 phút. Cách sửa: giảm còn 2–3 khối học trọng tâm mỗi tối, thêm giờ nghỉ và giờ giải trí hợp pháp, rồi nâng dần khi đã thành nếp.' },
      { q: 'Sáng mai Tú có 4 việc: nộp bài Văn (hạn 8h), ôn 15 phút từ vựng cho tiết kiểm tra miệng, mua quà sinh nhật bạn (chưa gấp), và một bài Toán khó về ôn thi vào 10. Hãy dùng ma trận ưu tiên xếp việc cho Tú.', a: 'Quan trọng + khẩn cấp: nộp bài Văn và ôn từ vựng kiểm tra miệng — làm ngay khối đầu buổi tối hôm trước hoặc sáng sớm. Quan trọng + chưa khẩn cấp: bài Toán ôn thi vào 10 — đây là nhóm quyết định tương lai, phải có khối cố định dù chưa "cháy"; Tú xếp một khối riêng buổi tối, không để nó mãi bị việc gấp lấn. Khẩn cấp nhưng ít quan trọng: mua quà — làm nhanh hoặc nhờ, chưa gấp thì để cuối tuần. Nguyên tắc: đừng để nhóm "quan trọng + chưa khẩn cấp" liên tục bị trì hoãn, vì đó mới là nhóm tạo ra khác biệt lớn.' },
    ]
  ),

  'S9HDTN-w04-quiz': L(
    'Kỹ năng học tập hiệu quả',
    'Học 4 tiếng mà đầu rỗng hay học 1 tiếng mà nhớ lâu — khác biệt nằm ở phương pháp. Tuần này các em học các kĩ thuật đã được khoa học kiểm chứng.',
    ['Phân biệt học thụ động và học chủ động.', 'Áp dụng được kĩ thuật chủ động gợi nhớ và lặp lại ngắt quãng.', 'Biết dùng Pomodoro để duy trì tập trung.', 'Tự chọn được phương pháp phù hợp với từng môn.'],
    [
      { h: 'Học thụ động và học chủ động' },
      { p: 'Đọc đi đọc lại, tô vàng cả trang sách là học thụ động — tạo cảm giác "quen mắt" nhưng dễ quên. Học chủ động là bắt não làm việc: tự kiểm tra, tự giải thích, tự tóm tắt. Khoa học về trí nhớ cho thấy học chủ động giúp nhớ lâu hơn nhiều lần.' },
      { h: 'Chủ động gợi nhớ (active recall)' },
      { p: 'Sau khi học xong một mục, gấp sách lại và tự hỏi: "Mình vừa học gì? Công thức là gì? Ví dụ ra sao?" Việc cố nhớ lại — kể cả khi nhớ sai rồi mở sách sửa — chính là lúc trí nhớ được củng cố mạnh nhất. Làm đề, dùng thẻ ghi nhớ (flashcard) đều là dạng gợi nhớ chủ động.' },
      { h: 'Lặp lại ngắt quãng (spaced repetition)' },
      { ul: ['Ôn lại sau 1 ngày, rồi 3 ngày, rồi 1 tuần, rồi 1 tháng — đúng lúc sắp quên thì ôn.', 'Hiệu quả hơn hẳn học dồn một đêm: cùng 5 lần ôn nhưng rải ra sẽ nhớ bền hơn dồn cục.', 'Áp dụng tốt nhất cho từ vựng tiếng Anh, công thức Toán — Lý — Hoá, mốc sự kiện Lịch sử.'] },
      { h: 'Pomodoro — quả cà chua tập trung' },
      { p: 'Học tập trung 25 phút, nghỉ 5 phút, lặp lại; sau 4 lượt nghỉ dài 15–30 phút. Phương pháp này hợp với người dễ xao nhãng: 25 phút đủ ngắn để não chấp nhận "cố nốt", và giờ nghỉ định sẵn giúp em không phải vừa học vừa thèm điện thoại.' },
      { h: 'Kĩ thuật Feynman — học bằng cách dạy lại' },
      { p: 'Chọn một khái niệm, thử giải thích cho em nhỏ lớp 5 nghe bằng lời của mình. Chỗ nào ấp úng chính là chỗ em chưa thực sự hiểu — quay lại sách học kĩ chỗ đó. Giảng bài cho bạn cùng lớp cũng là cách áp dụng kĩ thuật này.' },
      { h: 'Chọn phương pháp theo môn' },
      { ul: ['Toán, KHTN: làm bài tập là chính — hiểu lời giải rồi tự làm lại không nhìn đáp án.', 'Ngữ văn, Lịch sử: sơ đồ tư duy + kể lại nội dung bằng lời của mình.', 'Tiếng Anh: flashcard từ vựng + nghe đọc mỗi ngày một ít theo lặp lại ngắt quãng.'] },
      { note: 'Cảm giác "khó, phải vắt óc" khi tự gợi nhớ là dấu hiệu tốt — não đang luyện cơ trí nhớ. Học mà thấy trơn tru dễ dàng quá thường là đang học thụ động.' },
    ],
    [
      { q: 'Trước bài kiểm tra Sử, Mai đọc lại vở 3 lần và tô vàng kín trang nhưng vẫn quên khi làm bài. Mai nên đổi cách học thế nào?', a: 'Mai đang học thụ động. Cách sửa: đọc 1 lần, gấp vở, tự viết ra các mốc sự kiện nhớ được, mở vở kiểm tra và đánh dấu chỗ sai; hôm sau lặp lại chỉ với những chỗ sai. Có thể nhờ bạn hỏi đáp chéo — trả lời miệng cũng là gợi nhớ chủ động.' },
      { q: 'Tuấn học từ mới tiếng Anh rất nhanh nhưng một tuần sau quên gần hết. Kĩ thuật nào giúp Tuấn?', a: 'Lặp lại ngắt quãng. Tuấn nên làm flashcard, ôn theo lịch: học hôm nay → ôn ngày mai → ôn sau 3 ngày → sau 1 tuần → sau 1 tháng. Từ nào quên thì quay về chu kì ngắn. Mỗi ngày chỉ cần 10–15 phút nhưng đều đặn.' },
      { q: 'Khi nào nên dùng Pomodoro, khi nào không?', a: 'Nên dùng khi bắt đầu việc khó, dễ trì hoãn hoặc khi học môn mình ngại. Không nhất thiết dùng khi em đang "vào guồng" giải đề rất tập trung — lúc đó ngắt 25 phút có thể phá mạch suy nghĩ; hãy học tiếp và nghỉ khi xong bài lớn.' },
    ]
  ),

  'S9HDTN-w05-quiz': L(
    'Chuẩn bị thi vào 10 — Lộ trình',
    'Kì thi vào lớp 10 là chặng quan trọng nhất của năm nay. Tuần này chúng ta không học mẹo vặt mà xây hẳn một lộ trình ôn tập dài hơi, khoa học.',
    ['Nắm được cấu trúc cơ bản của kì thi vào 10 và cách tìm thông tin chính thức.', 'Tự đánh giá đúng năng lực hiện tại từng môn thi.', 'Xây dựng được lộ trình ôn tập theo 3 giai đoạn.', 'Biết cân bằng giữa học trên lớp và tự ôn.'],
    [
      { h: 'Hiểu rõ kì thi mình sắp dự' },
      { p: 'Mỗi tỉnh, thành phố có quy định riêng về môn thi, cách tính điểm và nguyện vọng. Việc đầu tiên của lộ trình là tìm thông tin CHÍNH THỨC từ Sở Giáo dục và Đào tạo địa phương và thầy cô chủ nhiệm: thi môn gì, hệ số bao nhiêu, đề các năm trước ra sao. Tuyệt đối không ôn theo tin đồn.' },
      { h: 'Bước 1: Đo điểm xuất phát' },
      { ul: ['Làm thử 1 đề thi vào 10 của năm trước cho mỗi môn, bấm giờ như thi thật.', 'Chấm điểm trung thực, phân loại lỗi: chưa học, học rồi nhưng quên, biết làm nhưng cẩu thả.', 'Kết quả này là "điểm xuất phát" để đặt mục tiêu SMART cho từng môn.'] },
      { h: 'Bước 2: Lộ trình 3 giai đoạn' },
      { ul: ['Giai đoạn nền (học kì 1): học chắc kiến thức lớp 9 trên lớp, lấp lỗ hổng lớp 6–8; chưa vội luyện đề khó.', 'Giai đoạn tăng tốc (tháng 1 – tháng 4): ôn theo chuyên đề, luyện dạng bài trọng tâm, mỗi tuần 1–2 đề có bấm giờ.', 'Giai đoạn nước rút (khoảng 6–8 tuần cuối): luyện đề tổng hợp, rèn chiến thuật làm bài, giữ sức khoẻ và nhịp sinh hoạt.'] },
      { h: 'Phân bổ thời gian giữa các môn' },
      { p: 'Nguyên tắc: môn yếu hơn được nhiều giờ hơn, nhưng không môn nào bị bỏ hẳn quá 3 ngày. Ví dụ em mạnh Văn yếu Toán thì tỉ lệ giờ tự học có thể là Toán 40%, Anh 30%, Văn 30% — và điều chỉnh mỗi tháng theo kết quả đề thử.' },
      { h: 'Học thêm — cần hay không?' },
      { p: 'Học thêm chỉ hiệu quả khi em xác định rõ mình cần gì: lấp hổng kiến thức, luyện đề nâng cao hay cần người giữ nhịp. Học thêm tràn lan kín tuần mà không có giờ tự học để "tiêu hoá" thì kiến thức không đọng lại. Tự học vẫn là cốt lõi.' },
      { h: 'Đồng hành cùng gia đình' },
      { p: 'Hãy chủ động nói chuyện với bố mẹ về nguyện vọng trường, lực học thật và lộ trình của em. Sự thống nhất sớm giữa em và gia đình giúp tránh căng thẳng "đổi nguyện vọng phút chót" — nguồn áp lực lớn của nhiều bạn lớp 9.' },
      { note: 'Lộ trình tốt không phải lộ trình học nhiều nhất, mà là lộ trình em duy trì được đều đặn 9 tháng không kiệt sức.' },
    ],
    [
      { q: 'Tháng 9, Quân làm thử đề Toán vào 10 được 4,5 điểm trong khi mục tiêu là 7,5. Quân nên bắt đầu thế nào?', a: 'Bước 1: phân tích bài làm — mất điểm ở đâu (đại số hay hình, do hổng kiến thức hay cẩu thả). Bước 2: nếu hổng nền lớp 8 (hằng đẳng thức, phương trình) thì giai đoạn đầu phải quay lại lấp hổng, chưa vội luyện đề. Bước 3: đặt mốc: HK1 đạt 5,5 → tháng 3 đạt 6,5 → thi đạt 7,5. Mỗi tháng làm 1 đề kiểm tra tiến độ.' },
      { q: 'Bố mẹ muốn Hà thi trường chuyên, nhưng lực học của Hà ở mức khá và em muốn vào trường công gần nhà. Hà nên làm gì?', a: 'Hà nên chuẩn bị một buổi nói chuyện nghiêm túc: đưa ra số liệu (điểm các bài thi thử, điểm chuẩn các năm của hai trường), trình bày nguyện vọng và lí do. Có thể nhờ giáo viên chủ nhiệm tư vấn thêm cho cả nhà. Quyết định tốt nhất là quyết định dựa trên dữ liệu thật và có sự lắng nghe hai chiều, không phải áp đặt từ một phía.' },
      { q: 'Đang ở giai đoạn nền (học kì 1), Vy nghe bạn khoe đã làm 20 đề thi thử khó nên hoảng, định bỏ ôn kiến thức cơ bản để lao vào luyện đề ngay. Em khuyên Vy thế nào?', a: 'Bình tĩnh — Vy đang định làm sai trình tự lộ trình. Giai đoạn nền có nhiệm vụ học chắc kiến thức và lấp lỗ hổng; luyện đề khó khi nền chưa vững chỉ khiến nản chí và ngộ nhận. Việc cần làm: tiếp tục học chắc lớp 9 trên lớp, rà lại các phần hổng lớp 6–8, mỗi môn chỉ làm 1 đề để "đo điểm xuất phát" chứ chưa cày đề. Luyện đề dày đặc dành cho giai đoạn tăng tốc (tháng 1–4). So mình với bạn về số đề là so sai chỉ số — quan trọng là đúng việc của từng giai đoạn.' },
    ]
  ),

  'S9HDTN-w06-quiz': L(
    'Kỹ năng làm bài thi',
    'Cùng một lực học nhưng người biết "chiến thuật phòng thi" có thể hơn người không biết cả điểm số. Tuần này các em học cách làm bài thi thông minh.',
    ['Biết quy trình 4 bước khi nhận đề thi.', 'Phân bổ được thời gian làm bài hợp lí theo thang điểm.', 'Áp dụng chiến thuật riêng cho trắc nghiệm và tự luận.', 'Tránh được các lỗi mất điểm phổ biến.'],
    [
      { h: 'Quy trình 4 bước khi nhận đề' },
      { ul: ['Bước 1 — Đọc lướt toàn đề (2–3 phút): biết đề có mấy câu, câu nào quen, câu nào lạ.', 'Bước 2 — Lập thứ tự: làm câu chắc ăn trước, câu khó để sau; đánh dấu câu cần quay lại.', 'Bước 3 — Làm bài theo kế hoạch, ghi nháp rõ ràng.', 'Bước 4 — Chừa 5–10 phút cuối rà soát: tên, số báo danh, đơn vị, kết luận, câu bỏ sót.'] },
      { h: 'Phân bổ thời gian theo điểm' },
      { p: 'Nguyên tắc vàng: thời gian dành cho mỗi câu tỉ lệ với số điểm của nó. Bài thi 120 phút thang 10 điểm thì mỗi điểm "đáng giá" khoảng 10–11 phút. Đừng dành 30 phút cho câu khó 0,5 điểm trong khi câu 2 điểm phía sau chưa đụng đến.' },
      { h: 'Chiến thuật trắc nghiệm' },
      { ul: ['Đọc kĩ câu hỏi, gạch chân từ khoá phủ định: "KHÔNG đúng", "NGOẠI TRỪ".', 'Dùng phương pháp loại trừ khi không chắc: loại được 2 đáp án sai là xác suất đúng tăng gấp đôi.', 'Không bỏ trống câu nào — trắc nghiệm thường không trừ điểm câu sai.', 'Cảnh giác khi đổi đáp án phút chót: chỉ đổi khi có lí do rõ ràng, không đổi theo cảm giác.'] },
      { h: 'Chiến thuật tự luận' },
      { ul: ['Viết dàn ý nhanh ra nháp trước khi viết bài, nhất là môn Văn.', 'Trình bày từng bước rõ ràng — nhiều môn chấm điểm theo từng ý, làm đúng bước nào ăn điểm bước đó.', 'Câu khó không làm được trọn vẹn vẫn nên viết các bước đầu mình biết.', 'Chữ viết rõ, gạch bỏ thẳng thớm phần sai, không tẩy xoá nhoè nhoẹt.'] },
      { h: 'Các lỗi mất điểm oan phổ biến' },
      { p: 'Đọc thiếu yêu cầu đề (đề hỏi 2 ý chỉ trả lời 1), quên đơn vị, quên kết luận, tính nhẩm sai ở bước cuối, tô nhầm số báo danh, làm đúng ra nháp nhưng chép sai vào bài. Tất cả đều tránh được bằng thói quen rà soát cuối giờ.' },
      { h: 'Đêm trước và buổi sáng thi' },
      { p: 'Đêm trước: ôn nhẹ, kiểm tra giấy tờ và dụng cụ, ngủ trước 23h. Sáng thi: ăn sáng quen thuộc, đến điểm thi sớm 30 phút, không tranh luận đáp án với bạn trước giờ vào phòng — việc này chỉ gây hoang mang.' },
      { note: 'Điểm thi = kiến thức × chiến thuật × tâm lí. Luyện đề có bấm giờ ở nhà chính là luyện cả ba thứ cùng lúc.' },
    ],
    [
      { q: 'Đề Toán 120 phút có câu hình khó 0,5 điểm. Linh đã loay hoay 25 phút chưa ra mà còn 2 câu 1,5 điểm chưa làm. Linh nên làm gì?', a: 'Dừng ngay câu khó, đánh dấu để quay lại. Chuyển sang 2 câu 1,5 điểm — đó là 3 điểm khả thi so với 0,5 điểm mạo hiểm. Nếu xong sớm quay lại câu khó, viết những bước đầu làm được để kiếm điểm thành phần.' },
      { q: 'Trong bài trắc nghiệm tiếng Anh, Sơn phân vân giữa B và C ở 5 câu. Sơn nên xử lí thế nào?', a: 'Với mỗi câu: gạch chân từ khoá, thử loại trừ bằng ngữ pháp (thì, sự hoà hợp chủ vị) hoặc nghĩa văn cảnh. Nếu vẫn không quyết được, chọn theo phán đoán đầu tiên và không bỏ trống. Sau buổi thi ghi lại các câu phân vân để ôn đúng điểm yếu đó.' },
      { q: 'Trong bài thi tự luận Toán, Hà gặp câu chứng minh hình học khó, không nghĩ ra cách làm trọn vẹn nên định bỏ trắng cả câu. Theo chiến thuật tự luận đã học, Hà nên làm gì?', a: 'Không bỏ trắng. Nhiều môn, nhất là Toán, chấm theo từng bước/từng ý: Hà nên viết những gì chắc chắn đúng — vẽ hình, ghi giả thiết - kết luận bằng kí hiệu, nêu các yếu tố suy ra được (góc bằng nhau, tam giác bằng nhau...), dù chưa tới đáp số. Mỗi bước đúng vẫn ăn điểm thành phần. Sau khi làm xong các câu chắc ăn còn thời gian thì quay lại mò tiếp. Kiếm 0,5–0,75 điểm thành phần ở câu khó nhiều khi chính là khoảng cách đỗ - trượt.' },
    ]
  ),

  'S9HDTN-w07-quiz': L(
    'Quản lý stress thi cử',
    'Hồi hộp trước kì thi là hoàn toàn bình thường — nhưng nếu lo lắng đến mất ngủ, đau bụng, học không vào thì cần học cách quản lý. Tuần này chúng ta làm bạn với stress.',
    ['Phân biệt được stress có ích và stress có hại.', 'Nhận diện dấu hiệu stress quá mức ở bản thân.', 'Thực hành được ít nhất 2 kĩ thuật giảm căng thẳng.', 'Biết khi nào và tìm ai để được trợ giúp.'],
    [
      { h: 'Stress không phải lúc nào cũng xấu' },
      { p: 'Một mức độ căng thẳng vừa phải giúp em tỉnh táo, tập trung và làm bài tốt hơn — các nhà tâm lý gọi đó là stress tích cực. Stress chỉ có hại khi quá mức và kéo dài: lúc đó nó làm giảm trí nhớ, khả năng tập trung và sức khoẻ.' },
      { h: 'Dấu hiệu stress quá mức' },
      { ul: ['Cơ thể: mất ngủ hoặc ngủ li bì, đau đầu, đau bụng, chán ăn hoặc ăn quá nhiều.', 'Cảm xúc: dễ cáu gắt, hay khóc, cảm giác bất lực, sợ hãi mơ hồ.', 'Hành vi: trì hoãn nặng hơn, né tránh việc học, thu mình khỏi bạn bè.', 'Tư duy: đầu óc trống rỗng khi ngồi vào bàn, đọc mãi không vào, hay nghĩ "mình chắc chắn trượt".'] },
      { h: 'Kĩ thuật thở 4-7-8 và thở hộp' },
      { p: 'Khi tim đập nhanh, hãy thở chậm có chủ đích: hít vào bằng mũi 4 nhịp, giữ 7 nhịp, thở ra từ từ bằng miệng 8 nhịp; lặp lại 4 lần. Hoặc "thở hộp": hít 4 — giữ 4 — thở 4 — giữ 4. Hơi thở chậm gửi tín hiệu an toàn cho não, cơ thể dịu lại sau 1–2 phút.' },
      { h: 'Chăm sóc nền tảng: ngủ — ăn — vận động' },
      { ul: ['Ngủ đủ 7–9 tiếng: thức khuya ôn bài liên tục làm giảm trí nhớ nhiều hơn là tăng kiến thức.', 'Ăn đủ bữa, hạn chế trà sữa và nước tăng lực sát giờ học tối.', 'Vận động 20–30 phút mỗi ngày: đi bộ, nhảy dây, đá cầu — vận động là "thuốc giảm stress" tự nhiên hiệu quả nhất.'] },
      { h: 'Đổi cách nghĩ về kì thi' },
      { p: 'Thay vì "thi trượt là hết", hãy nghĩ "kì thi đo mức độ chuẩn bị hiện tại của mình, và mình luôn có phương án dự phòng". Viết ra giấy điều mình sợ nhất, rồi viết tiếp: "Nếu điều đó xảy ra, mình sẽ..." — khi nỗi sợ có kế hoạch ứng phó, nó nhỏ đi đáng kể.' },
      { h: 'Khi nào cần tìm trợ giúp?' },
      { p: 'Nếu mất ngủ kéo dài hơn 2 tuần, buồn bã hầu hết các ngày, hoặc có suy nghĩ tiêu cực về bản thân lặp đi lặp lại — đó KHÔNG phải yếu đuối, đó là lúc cần nói chuyện với bố mẹ, thầy cô chủ nhiệm hoặc cán bộ tư vấn tâm lý học đường. Chia sẻ sớm thì gỡ nhanh.' },
      { note: 'Em không cần hết hồi hộp mới làm bài tốt. Mục tiêu là đưa hồi hộp về mức "vừa đủ tỉnh táo" — và kĩ thuật thở làm được điều đó ngay trong phòng thi.' },
    ],
    [
      { q: 'Vào phòng thi, vừa đọc đề Ngân thấy tim đập mạnh, đầu óc trắng xoá dù đã ôn kĩ. Ngân nên làm gì ngay lúc đó?', a: 'Đặt bút xuống, ngồi thẳng, thở 4-7-8 khoảng 3–4 lượt (chưa đến 2 phút). Sau đó bắt đầu từ câu dễ nhất để lấy lại cảm giác "mình làm được" — thành công nhỏ đầu tiên sẽ kéo trí nhớ quay lại. Hai phút trấn tĩnh này hiệu quả hơn nhiều so với cuống cuồng làm ngay.' },
      { q: 'Một tháng trước kì thi, Phúc học đến 1–2 giờ sáng mỗi ngày, ban ngày ngủ gật trên lớp và hay cáu với em gái. Phúc đang gặp vấn đề gì và nên điều chỉnh ra sao?', a: 'Phúc đang stress quá mức kèm thiếu ngủ — học khuya phản tác dụng vì giấc ngủ là lúc não củng cố kiến thức. Điều chỉnh: lùi giờ ngủ về trước 23h, chuyển giờ học sang buổi tối sớm và sáng sớm, thêm 20 phút vận động chiều, và nói chuyện với bố mẹ về lịch học để được hỗ trợ.' },
      { q: 'Bạn thân của em nói "tao chắc chắn trượt, học nữa cũng vô ích" và bỏ ôn cả tuần. Em nên làm gì?', a: 'Lắng nghe bạn trước, không phán xét hay nói suông "mày học giỏi mà". Giúp bạn nhìn bằng dữ liệu: điểm thi thử thực tế, phần nào còn cứu được. Rủ bạn học cùng theo mục tiêu nhỏ mỗi ngày. Nếu bạn vẫn buồn bã kéo dài, khuyên bạn nói với bố mẹ hoặc thầy cô — và em có thể báo riêng cho giáo viên chủ nhiệm để người lớn hỗ trợ kịp thời.' },
    ]
  ),

  'S9HDTN-w08-quiz': L(
    'Hướng nghiệp — RIASEC (Holland)',
    'Bắt đầu chùm bài hướng nghiệp! Tuần này các em làm quen với RIASEC — mô hình 6 kiểu tính cách nghề nghiệp của nhà tâm lý học John Holland, được dùng rộng rãi trong tư vấn hướng nghiệp toàn thế giới.',
    ['Trình bày được 6 nhóm tính cách nghề nghiệp trong mô hình RIASEC.', 'Tự xác định sơ bộ 2–3 nhóm trội của bản thân.', 'Kể được một số nghề tiêu biểu cho từng nhóm.', 'Hiểu đúng giới hạn của trắc nghiệm hướng nghiệp.'],
    [
      { h: 'Mô hình RIASEC là gì?' },
      { p: 'Nhà tâm lý học John Holland cho rằng con người và môi trường nghề nghiệp có thể phân thành 6 kiểu; người ta hài lòng và làm việc tốt nhất khi kiểu tính cách của mình khớp với môi trường nghề. RIASEC là chữ viết tắt của 6 kiểu đó.' },
      { h: 'Sáu nhóm tính cách' },
      { ul: ['R — Realistic (Kĩ thuật): thích làm việc với máy móc, công cụ, hoạt động tay chân ngoài trời. Nghề: kĩ sư cơ khí, thợ điện, nông nghiệp công nghệ cao, vận động viên.', 'I — Investigative (Nghiên cứu): thích quan sát, phân tích, giải quyết vấn đề bằng tư duy. Nghề: nhà khoa học, bác sĩ, chuyên gia dữ liệu, lập trình viên.', 'A — Artistic (Nghệ thuật): thích sáng tạo, tự do thể hiện. Nghề: hoạ sĩ, nhạc sĩ, nhà thiết kế, nhà văn, làm phim.', 'S — Social (Xã hội): thích giúp đỡ, dạy dỗ, chăm sóc người khác. Nghề: giáo viên, điều dưỡng, tư vấn tâm lý, công tác xã hội.', 'E — Enterprising (Quản lý/Thuyết phục): thích lãnh đạo, kinh doanh, thuyết phục. Nghề: doanh nhân, luật sư, marketing, quản lý dự án.', 'C — Conventional (Nghiệp vụ): thích dữ liệu, quy trình, sự chính xác ngăn nắp. Nghề: kế toán, kiểm toán, thư kí, ngân hàng, hành chính.'] },
      { h: 'Mã Holland — tổ hợp 2–3 chữ cái' },
      { p: 'Hầu như không ai thuần một kiểu. Kết quả trắc nghiệm thường là tổ hợp 2–3 nhóm trội, ví dụ IRC, SAE. Một bạn mã ISA có thể hợp với nghề bác sĩ tâm lý (I — nghiên cứu, S — giúp người, A — linh hoạt sáng tạo trong trị liệu).' },
      { h: 'Lục giác Holland' },
      { p: 'Sáu kiểu xếp trên một lục giác theo thứ tự R–I–A–S–E–C; các kiểu đứng cạnh nhau (như S và E) gần gũi, các kiểu đối diện (như A và C, R và S) khác biệt nhiều. Nếu mã của em gồm các kiểu kề nhau thì định hướng khá rõ; nếu gồm các kiểu đối nhau thì em đa dạng sở thích và cần thêm trải nghiệm để xác định.' },
      { h: 'Cách tự khám phá nhóm trội' },
      { ul: ['Nhớ lại hoạt động khiến em quên thời gian: sửa đồ, đọc sách khoa học, vẽ, giảng bài cho bạn, bán hàng gây quỹ, hay sắp xếp sổ sách lớp?', 'Làm bài trắc nghiệm RIASEC (nhiều phiên bản tiếng Việt miễn phí, nên làm cùng sự hướng dẫn của thầy cô).', 'Đối chiếu với nhận xét của người thân — như cách các em đã làm ở tuần 1.'] },
      { h: 'Giới hạn của trắc nghiệm' },
      { p: 'RIASEC là la bàn chứ không phải bản đồ chi tiết: nó gợi hướng, không "phán" nghề. Kết quả có thể thay đổi khi em trải nghiệm thêm. Quyết định nghề còn cần xét năng lực, nhu cầu xã hội và điều kiện gia đình — sẽ học ở tuần 10.' },
      { note: 'Ghi nhớ 6 chữ: R kĩ thuật — I nghiên cứu — A nghệ thuật — S xã hội — E thuyết phục — C nghiệp vụ. Hãy thử đoán mã của 3 người thân trước khi đoán mã của chính mình!' },
    ],
    [
      { q: 'Trang thích chăm em nhỏ, hay được bạn bè tìm đến tâm sự, đồng thời rất mê đọc sách về tâm lý con người. Mã Holland của Trang nghiêng về nhóm nào và gợi ý nghề gì?', a: 'Trội S (thích giúp đỡ, lắng nghe) kết hợp I (tò mò nghiên cứu tâm lý) — mã SI. Gợi ý nghề: chuyên viên tâm lý học đường, điều dưỡng, giáo viên, công tác xã hội, bác sĩ. Trang nên thử trải nghiệm: tham gia CLB kĩ năng, đọc thêm sách tâm lý phổ thông, phỏng vấn một người làm nghề tư vấn.' },
      { q: 'Kết quả trắc nghiệm của Đạt là RC nhưng bố mẹ muốn Đạt học kinh doanh (nhóm E). Đạt nên hiểu kết quả này thế nào?', a: 'Trên lục giác Holland, R và E không kề nhau, nghĩa là môi trường kinh doanh thuần thuyết phục - giao tiếp có thể không phải sở trường tự nhiên của Đạt. Nhưng trắc nghiệm chỉ là một nguồn thông tin: Đạt nên thử trải nghiệm thực tế (bán hàng online, hội chợ trường) xem mình có hứng thú không, đồng thời tìm hiểu các nghề giao thoa như quản lý kĩ thuật, kinh doanh thiết bị — nơi chất R và C vẫn phát huy.' },
      { q: 'Phong làm hai bài trắc nghiệm RIASEC cách nhau ba tháng, lần đầu ra mã IR, lần sau ra mã IA. Phong hoang mang "không lẽ mình không có nghề nào hợp". Hãy giải thích cho Phong.', a: 'Kết quả khác nhẹ giữa hai lần là hoàn toàn bình thường và còn là tín hiệu tốt: nhóm I (nghiên cứu) ổn định ở cả hai lần — đó là "trục" rõ ràng của Phong; chữ thứ hai dao động giữa R và A cho thấy Phong vừa thích làm thực tế vừa có chất sáng tạo. RIASEC là la bàn chứ không phải bản đồ, và ở tuổi 15 tính cách còn phát triển nên kết quả thay đổi là tự nhiên. Phong nên bám trục I (các nghề thiên về phân tích, tìm tòi) và để chữ thứ hai mở — thêm trải nghiệm sẽ giúp định rõ. Một mã chưa "đóng khung" nghĩa là nhiều cánh cửa còn mở, không phải không có cửa nào.' },
    ]
  ),

  'S9HDTN-w09-quiz': L(
    'Hướng nghiệp — Big Five (OCEAN)',
    'Nếu RIASEC trả lời "em thích làm gì" thì Big Five trả lời "em là người như thế nào". Đây là mô hình tính cách được giới tâm lý học hiện đại công nhận rộng rãi nhất.',
    ['Trình bày được 5 chiều tính cách trong mô hình Big Five.', 'Hiểu mỗi chiều là một dải liên tục, không phải nhãn tốt - xấu.', 'Liên hệ được từng chiều với việc học và môi trường làm việc.', 'Kết hợp Big Five với RIASEC để hiểu mình sâu hơn.'],
    [
      { h: 'Big Five là gì?' },
      { p: 'Big Five (Năm yếu tố lớn) mô tả tính cách con người theo 5 chiều, viết tắt là OCEAN. Khác trắc nghiệm vui trên mạng, Big Five được xây dựng từ hàng chục năm nghiên cứu khoa học và dự đoán khá tốt cách một người học tập, làm việc.' },
      { h: 'Năm chiều OCEAN' },
      { ul: ['O — Openness (Cởi mở với trải nghiệm): cao = tò mò, giàu tưởng tượng, thích cái mới; thấp = thực tế, ưa quen thuộc, ổn định.', 'C — Conscientiousness (Tận tâm): cao = kỉ luật, ngăn nắp, đáng tin; thấp = linh hoạt, tuỳ hứng, dễ trì hoãn.', 'E — Extraversion (Hướng ngoại): cao = năng động, thích đám đông, nạp năng lượng khi giao tiếp; thấp (hướng nội) = trầm tĩnh, nạp năng lượng khi ở một mình.', 'A — Agreeableness (Dễ mến/Hoà đồng): cao = hợp tác, vị tha, tin người; thấp = thẳng thắn, cạnh tranh, hay chất vấn.', 'N — Neuroticism (Bất ổn cảm xúc): cao = nhạy cảm, dễ lo âu; thấp = bình tĩnh, ổn định trước áp lực.'] },
      { h: 'Dải liên tục — không có tốt hay xấu' },
      { p: 'Mỗi chiều là một thước đo liên tục, đa số chúng ta nằm đâu đó ở giữa. Không có điểm "đẹp": hướng nội không thua hướng ngoại — nhà văn, lập trình viên, nhà nghiên cứu giỏi thường hướng nội; A thấp nghe có vẻ tiêu cực nhưng lại cần cho nghề đàm phán, phản biện, kiểm toán.' },
      { h: 'Big Five nói gì về việc học?' },
      { ul: ['C cao là yếu tố dự đoán kết quả học tập mạnh nhất — và tin vui: tính tận tâm RÈN được qua thói quen nhỏ mỗi ngày.', 'N cao dễ lo âu thi cử → cần luyện kĩ thuật quản lý stress (tuần 7) nhiều hơn bạn khác.', 'O cao học tốt khi được tự khám phá; O thấp học tốt với lộ trình rõ ràng, ví dụ cụ thể.'] },
      { h: 'Big Five và môi trường nghề' },
      { p: 'E cao hợp môi trường giao tiếp nhiều (bán hàng, giảng dạy, truyền thông); E thấp hợp công việc sâu, ít gián đoạn (nghiên cứu, kĩ thuật, viết). A cao hợp nghề chăm sóc, dịch vụ; C cao hợp nghề đòi hỏi chính xác như kế toán, y, hàng không. Lưu ý: tính cách chỉ là độ "thuận tay" — người hướng nội vẫn có thể thuyết trình giỏi nhờ luyện tập.' },
      { h: 'Kết hợp RIASEC + Big Five' },
      { p: 'RIASEC cho biết lĩnh vực em hứng thú; Big Five cho biết phong cách làm việc của em trong lĩnh vực đó. Ví dụ cùng mã I (nghiên cứu): bạn E cao có thể hợp giảng viên, bác sĩ lâm sàng; bạn E thấp hợp nghiên cứu viên, phân tích dữ liệu.' },
      { note: 'Tính cách ở tuổi 15 chưa "đóng khung" — não và tính cách còn phát triển đến sau tuổi 20. Kết quả hôm nay là ảnh chụp hiện tại, không phải số phận.' },
    ],
    [
      { q: 'Vy làm trắc nghiệm Big Five được kết quả: O cao, C thấp, E trung bình, A cao, N trung bình. Vy hay có ý tưởng hay nhưng thường bỏ dở giữa chừng. Kết quả giải thích điều này thế nào và Vy nên làm gì?', a: 'O cao cho Vy nhiều ý tưởng, nhưng C thấp khiến khó duy trì kỉ luật hoàn thành. Vy nên "mượn" kỉ luật từ bên ngoài: đặt mục tiêu SMART thật nhỏ, dùng time-block, học nhóm với bạn C cao, nhờ bạn hoặc bố mẹ kiểm tra tiến độ hằng tuần. Tận tâm là chiều có thể cải thiện rõ rệt qua thói quen.' },
      { q: 'Hai bạn cùng muốn theo ngành y: Khoa hướng nội, rất tỉ mỉ; Bình hướng ngoại, giỏi trấn an người khác. Big Five gợi ý gì cho hai bạn?', a: 'Cả hai đều có thể theo y nhưng hợp các vị trí khác nhau: Khoa (E thấp, C cao) có thể hợp xét nghiệm, chẩn đoán hình ảnh, nghiên cứu, giải phẫu bệnh — nơi cần tập trung sâu và chính xác; Bình (E cao, A cao) hợp bác sĩ gia đình, nhi khoa, cấp cứu — nơi giao tiếp với bệnh nhân liên tục. Cùng một ngành luôn có nhiều "ghế" cho nhiều kiểu tính cách.' },
      { q: 'Linh tự nhận N cao (dễ lo âu) và buồn vì nghĩ "tính này khiến mình thua bạn bè". Em dùng Big Five để giúp Linh nhìn lại thế nào?', a: 'Trước hết đính chính nhận thức: Big Five không có chiều "tốt - xấu", N cao chỉ là nhạy cảm hơn với cảm xúc, đi kèm cả mặt lợi (cẩn trọng, đồng cảm, lường trước rủi ro). Linh không "thua" ai cả. Tuy nhiên N cao đúng là khiến dễ lo âu thi cử, nên việc cần làm là chủ động luyện kĩ năng quản lý stress (kĩ thuật thở, ngủ đủ, vận động — tuần 7) nhiều hơn bạn khác, như người mắt yếu thì đeo kính — không phải khuyết điểm mà là điều cần hỗ trợ. Hiểu tính cách để CHĂM SÓC mình đúng cách, chứ không để tự dán nhãn tiêu cực.' },
    ]
  ),

  'S9HDTN-w10-quiz': L(
    'Định hướng nghề — Kết hợp tự nhận thức',
    'Em đã có SWOT, mã RIASEC và chân dung Big Five. Tuần này chúng ta ghép tất cả lại bằng mô hình "kiềng ba chân" để bước đầu khoanh vùng nghề phù hợp.',
    ['Nắm được 3 căn cứ chọn nghề: muốn — làm được — xã hội cần.', 'Tổng hợp dữ liệu tự nhận thức thành hồ sơ cá nhân.', 'Lập được danh sách 3–5 nghề tiềm năng để tìm hiểu sâu.', 'Biết cách tìm hiểu thực tế một nghề.'],
    [
      { h: 'Kiềng ba chân chọn nghề' },
      { p: 'Một lựa chọn nghề vững cần ba chân: (1) Em MUỐN — hứng thú, đam mê (RIASEC trả lời); (2) Em LÀM ĐƯỢC — năng lực, tính cách (SWOT, Big Five, điểm số trả lời); (3) Xã hội CẦN — nhu cầu nhân lực, cơ hội việc làm, thu nhập. Thiếu chân nào kiềng cũng đổ: thích mà không đủ năng lực thì vất vả; giỏi mà không thích thì chán; vừa thích vừa giỏi mà xã hội không cần thì khó sống bằng nghề.' },
      { h: 'Bước 1: Lập hồ sơ bản thân' },
      { ul: ['Gom kết quả 9 tuần qua vào một trang: 3 điểm mạnh nhất, mã RIASEC, nét Big Five nổi bật, môn học tốt nhất.', 'Thêm: điều kiện gia đình (tài chính, nơi ở), giá trị em coi trọng (thu nhập cao, ổn định, giúp người, tự do...).'] },
      { h: 'Bước 2: Khoanh vùng nhóm nghề' },
      { p: 'Từ mã RIASEC tra danh mục nghề tương ứng, gạch những nghề rõ ràng không hợp năng lực hoặc điều kiện, giữ lại 3–5 nghề "ứng viên". Lưu ý khoanh theo NHÓM nghề (chăm sóc sức khoẻ, công nghệ, giáo dục...) thay vì chốt cứng một nghề — vì thế giới nghề thay đổi nhanh.' },
      { h: 'Bước 3: Tìm hiểu thực tế từng nghề ứng viên' },
      { ul: ['Nghề này hằng ngày làm gì? (xem video "một ngày làm việc", đọc bài phỏng vấn)', 'Cần học gì, bằng cấp gì, mất mấy năm? Có những con đường nào (đại học, cao đẳng, học nghề)?', 'Thu nhập khởi điểm và triển vọng 10 năm tới? Nghề có nguy cơ bị tự động hoá thay thế không?', 'Hỏi trực tiếp người trong nghề — họ hàng, hàng xóm, phụ huynh bạn bè: điều gì khiến cô/chú vui nhất và mệt nhất với nghề?'] },
      { h: 'Cẩn thận với ba cái bẫy' },
      { ul: ['Bẫy hào nhoáng: chỉ thấy mặt lung linh trên mạng xã hội (streamer, người nổi tiếng) mà không thấy tỉ lệ thành công và lao động phía sau.', 'Bẫy đám đông: chọn ngành vì "bạn bè chọn nhiều" hay "đang hot" — ngành hot hôm nay có thể bão hoà khi em ra trường.', 'Bẫy áp đặt: theo nghề bố mẹ chọn hộ mà chưa từng tự tìm hiểu. Hãy đối thoại bằng dữ liệu thay vì im lặng làm theo hoặc cãi suông.'] },
      { h: 'Định hướng nghề là quá trình, không phải một quyết định' },
      { p: 'Ở lớp 9 em chỉ cần: hiểu mình, biết cách tìm hiểu nghề và chọn hướng học phù hợp ở cấp 3 (khối môn lựa chọn, trường nghề hay THPT). Cánh cửa vẫn mở và điều chỉnh được — quan trọng là em bắt đầu nghĩ về nó một cách có phương pháp.' },
      { note: 'Công thức kiểm tra nhanh một nghề ứng viên: Muốn? — Làm được? — Xã hội cần? Trả lời "có" cả ba với dẫn chứng cụ thể thì nghề đó đáng để đầu tư tìm hiểu sâu.' },
    ],
    [
      { q: 'Hồ sơ của Tú: mạnh Toán - Tin, mã RIASEC là IC, Big Five C cao E thấp, gia đình ở nông thôn điều kiện trung bình. Tú mê vẽ truyện tranh và định theo nghề hoạ sĩ truyện tranh. Hãy phân tích bằng kiềng ba chân.', a: 'Chân "muốn": có — Tú mê vẽ. Chân "làm được": cần kiểm chứng — mã IC và thế mạnh Toán - Tin chưa thể hiện năng lực A (nghệ thuật); Tú nên thử đăng truyện lên mạng, tham gia cuộc thi để đo phản hồi thực tế. Chân "xã hội cần": nghề hoạ sĩ truyện tranh cạnh tranh cao, thu nhập ban đầu bấp bênh. Gợi ý: giữ vẽ làm đam mê song song, cân nhắc hướng giao thoa như thiết kế đồ hoạ, làm game — nơi dùng được cả Tin học (IC) lẫn khiếu vẽ, cơ hội việc làm rộng hơn.' },
      { q: 'My muốn làm bác sĩ nhưng nhà không đủ điều kiện cho học 6 năm đại học y. My có nên từ bỏ chân "muốn" không?', a: 'Chưa vội từ bỏ — hãy mở rộng cách nhìn về nhóm nghề chăm sóc sức khoẻ: điều dưỡng, kĩ thuật viên xét nghiệm, dược sĩ cao đẳng, phục hồi chức năng... có thời gian học ngắn hơn, chi phí thấp hơn, vẫn thoả mãn giá trị "giúp người". Đồng thời tìm hiểu học bổng, chính sách tín dụng sinh viên. Một giá trị cốt lõi có thể được thoả mãn bằng nhiều nghề khác nhau.' },
      { q: 'Bảo thấy trên mạng nhiều bạn trẻ kiếm tiền tỉ nhờ làm streamer, livestream bán hàng nên quyết "không cần học nhiều, sau này làm streamer là đủ". Hãy dùng kiềng ba chân và "ba cái bẫy" để phân tích cho Bảo.', a: 'Bảo đang dính bẫy hào nhoáng: mạng xã hội chỉ chiếu số ít người thành công, giấu đi hàng triệu người thất bại và lao động phía sau (đầu tư thiết bị, dựng nội dung, cạnh tranh khốc liệt, thu nhập bấp bênh). Soi kiềng ba chân: "muốn" — cần kiểm chứng bằng việc tự làm thử kênh nhỏ xem có duy trì nổi không; "làm được" — nghề này cần kĩ năng giao tiếp, dựng video, hiểu thị trường chứ không phải "không cần học"; "xã hội cần" — thị trường đã bão hoà và biến động nhanh. Lời khuyên đúng: cứ thử làm sáng tạo nội dung như một trải nghiệm, nhưng đừng bỏ học — kĩ năng nền (giao tiếp, ngoại ngữ, kinh doanh, kĩ năng số) mới là thứ giúp Bảo trụ được dù theo nghề gì.' },
    ]
  ),

  'S9HDTN-w11-quiz': L(
    'Sức khoẻ tâm lý tuổi dậy thì',
    'Tuổi 14–15 là giai đoạn não bộ và cảm xúc thay đổi mạnh mẽ nhất đời người. Hiểu những gì đang diễn ra bên trong sẽ giúp các em bớt hoang mang và biết tự chăm sóc tinh thần.',
    ['Hiểu các thay đổi tâm lý bình thường của tuổi dậy thì.', 'Phân biệt buồn thoáng qua với dấu hiệu cần quan tâm.', 'Biết các cách tự chăm sóc sức khoẻ tinh thần hằng ngày.', 'Biết tìm trợ giúp đúng người, đúng lúc — cho mình và cho bạn.'],
    [
      { h: 'Chuyện gì đang xảy ra trong não tuổi dậy thì?' },
      { p: 'Ở tuổi này, vùng não cảm xúc phát triển nhanh hơn vùng não kiểm soát lí trí (vùng trán trước — phải đến sau tuổi 20 mới hoàn thiện). Vì vậy các em dễ vui buồn mãnh liệt, hành động theo cảm hứng, nhạy cảm với đánh giá của bạn bè. Đây là đặc điểm phát triển BÌNH THƯỜNG, không phải "hư" hay "yếu đuối".' },
      { h: 'Những thay đổi tâm lý thường gặp' },
      { ul: ['Tâm trạng thay đổi nhanh, đôi khi không rõ lí do.', 'Nhu cầu riêng tư tăng: muốn có không gian riêng, ít kể chuyện với bố mẹ hơn.', 'Coi trọng bạn bè và hình ảnh bản thân; nhạy cảm với lời chê, sự so sánh.', 'Bắt đầu đặt câu hỏi về bản sắc: mình là ai, mình muốn gì.'] },
      { h: 'Buồn bình thường và dấu hiệu cần quan tâm' },
      { p: 'Buồn vài giờ đến vài ngày sau một chuyện cụ thể (điểm kém, cãi nhau với bạn) là bình thường. Cần quan tâm khi: buồn bã hoặc trống rỗng gần như mỗi ngày kéo dài trên 2 tuần, mất hứng thú cả với thứ từng yêu thích, rối loạn giấc ngủ và ăn uống, tự cô lập, hoặc có ý nghĩ làm hại bản thân. Khi đó việc cần làm là nói với người lớn tin cậy — càng sớm càng tốt.' },
      { h: 'Tự chăm sóc tinh thần mỗi ngày' },
      { ul: ['Ngủ đủ — giấc ngủ là "thuốc bổ" tâm lý số một của tuổi dậy thì.', 'Vận động ngoài trời, gặp bạn bè trực tiếp thay vì chỉ qua màn hình.', 'Viết nhật kí cảm xúc: gọi tên được cảm xúc là đã giảm một nửa sức nặng của nó.', 'Giới hạn mạng xã hội trước giờ ngủ; nhớ rằng mạng chỉ chiếu "khoảnh khắc đẹp nhất" của người khác — so sánh với nó là so sánh không công bằng.'] },
      { h: 'Khi bạn bè tâm sự chuyện nặng nề' },
      { p: 'Hãy lắng nghe không phán xét và đừng hứa giữ bí mật tuyệt đối. Nếu bạn nhắc đến việc làm hại bản thân, em PHẢI báo cho người lớn tin cậy (bố mẹ bạn, giáo viên chủ nhiệm, tư vấn học đường) — đó không phải phản bội, đó là cứu bạn. An toàn của bạn quan trọng hơn lời hứa.' },
      { h: 'Các địa chỉ trợ giúp' },
      { ul: ['Trong trường: giáo viên chủ nhiệm, phòng tư vấn tâm lý học đường.', 'Trong gia đình: bố mẹ, anh chị, cô dì chú bác mà em tin cậy.', 'Tổng đài quốc gia bảo vệ trẻ em 111 — miễn phí, hoạt động 24/7, có thể gọi để được tư vấn tâm lý.'] },
      { note: 'Tìm sự giúp đỡ khi khó khăn là kĩ năng của người mạnh mẽ — giống như biết đi khám khi đau ốm. Không ai tự vượt qua mọi thứ một mình, kể cả người lớn.' },
    ],
    [
      { q: 'Gần đây Hằng hay cáu vô cớ với mẹ rồi lại thấy hối hận, em lo "mình có vấn đề". Em giải thích cho Hằng thế nào?', a: 'Cảm xúc dao động mạnh ở tuổi dậy thì là bình thường do não cảm xúc phát triển trước não kiểm soát. Hằng không "có vấn đề", nhưng có thể tập kĩ năng: khi thấy nóng lên thì tạm dừng — thở chậm — nói "con đang mệt, mình nói chuyện sau nhé" thay vì gắt. Sau đó chủ động xin lỗi và kể cho mẹ về cảm giác của mình; bố mẹ hiểu sẽ hỗ trợ tốt hơn.' },
      { q: 'Một tháng nay Trí bỏ đá bóng (môn yêu thích nhất), hay ngồi một mình, làm bài sa sút và nói "tớ thấy mọi thứ vô nghĩa". Là bạn cùng lớp, em nên làm gì?', a: 'Đây là các dấu hiệu cần quan tâm thật sự (mất hứng thú kéo dài, thu mình, suy nghĩ tiêu cực). Em nên: ngồi nghe Trí nói, không chế giễu hay giảng đạo lý; khuyến khích Trí nói chuyện với gia đình hoặc thầy cô; và quan trọng nhất — báo riêng cho giáo viên chủ nhiệm hoặc cán bộ tư vấn học đường để người lớn can thiệp. Tuyệt đối không giữ kín một mình.' },
      { q: 'Mỗi tối Quân lướt mạng xã hội rồi thấy buồn và tự ti vì "ai cũng giỏi, xinh, đi chơi vui, chỉ mình mình tệ". Em giải thích cơ chế này và gợi ý cho Quân thế nào?', a: 'Đây là cái bẫy "so sánh không công bằng": mạng xã hội chỉ chiếu khoảnh khắc đẹp nhất, đã chọn lọc và chỉnh sửa của người khác, rồi đem so với toàn bộ đời thực của mình — gồm cả những lúc mệt mỏi, lộn xộn. So thế chắc chắn mình "thua". Gợi ý cho Quân: giới hạn thời gian mạng xã hội, nhất là trước giờ ngủ; bỏ theo dõi những trang khiến mình thấy tệ đi; chuyển sang gặp bạn trực tiếp; và viết nhật kí biết ơn để não tập quét tìm cái tốt trong chính cuộc sống của mình. Cảm xúc đi xuống đều đặn sau khi dùng mạng là tín hiệu rõ ràng cần điều chỉnh thói quen.' },
    ]
  ),

  'S9HDTN-w12-quiz': L(
    'Ôn tập và đánh giá giữa học kì 1',
    'Đi được một phần ba chặng đường rồi! Tuần này chúng ta dừng lại nhìn lại: ôn các kiến thức cốt lõi 11 tuần qua và tự đánh giá sự tiến bộ của bản thân.',
    ['Hệ thống hoá kiến thức 11 tuần: tự nhận thức, mục tiêu, thời gian, học tập, thi cử, hướng nghiệp, tâm lý.', 'Tự đánh giá mức độ áp dụng từng kĩ năng vào đời sống.', 'Cập nhật bảng SWOT và mục tiêu SMART theo dữ liệu mới.', 'Lập kế hoạch cải thiện cho giai đoạn tới.'],
    [
      { h: 'Bản đồ kiến thức 11 tuần' },
      { ul: ['Hướng vào bản thân: SWOT cá nhân (t1), sức khoẻ tâm lý dậy thì (t11).', 'Quản trị việc học: mục tiêu SMART (t2), time-block (t3), học chủ động — gợi nhớ, ngắt quãng, Pomodoro, Feynman (t4).', 'Thi vào 10: lộ trình 3 giai đoạn (t5), chiến thuật phòng thi (t6), quản lý stress (t7).', 'Hướng nghiệp: RIASEC (t8), Big Five (t9), kiềng ba chân muốn — làm được — xã hội cần (t10).'] },
      { h: 'Ôn bằng chính kĩ thuật đã học' },
      { p: 'Tuần này hãy thực hành gợi nhớ chủ động lên chính môn HĐTN: gấp vở lại, tự viết ra 6 nhóm RIASEC, 5 chiều OCEAN, 5 tiêu chí SMART, 4 bước nhận đề thi. Viết xong mở vở kiểm tra — chỗ nào quên chính là chỗ cần ôn.' },
      { h: 'Tự đánh giá bằng thang 4 mức' },
      { p: 'Với mỗi kĩ năng, em tự chấm: mức 1 — biết tên gọi; mức 2 — giải thích được cho bạn; mức 3 — đã áp dụng ít nhất một lần; mức 4 — đã thành thói quen. Mục đích của môn HĐTN là mức 3–4, không phải thuộc lòng định nghĩa.' },
      { h: 'Soi lại mục tiêu SMART tuần 2' },
      { ul: ['Lấy lại tờ mục tiêu em viết ở tuần 2: đạt bao nhiêu phần trăm rồi?', 'Nếu vượt tiến độ: nâng nhẹ độ khó. Nếu hụt: tìm nguyên nhân — mục tiêu quá sức, cách làm chưa hợp, hay chưa kỉ luật?', 'Viết lại phiên bản mục tiêu điều chỉnh cho giai đoạn từ nay đến hết học kì 1.'] },
      { h: 'Cập nhật bảng SWOT' },
      { p: 'So với tháng 9, em có điểm mạnh nào mới (ví dụ: đã bớt ngại phát biểu)? Cơ hội nào mới xuất hiện (lớp ôn miễn phí, bạn học nhóm)? Thách thức nào tăng lên (lịch thi dày hơn)? Bảng SWOT sống là bảng được cập nhật.' },
      { h: 'Chuẩn bị cho giai đoạn tới' },
      { p: 'Từ tuần 13, môn học chuyển sang mạch trải nghiệm thực tế và kĩ năng sống: hoạt động tình nguyện, việc nhà, quản lý tiền. Hãy mang theo tinh thần "mức 3–4": học để LÀM, không học để biết.' },
      { note: 'Câu hỏi quan trọng nhất của tuần ôn tập không phải "em nhớ được gì" mà là "em đã THAY ĐỔI được thói quen nào trong 11 tuần qua".' },
    ],
    [
      { q: 'Tự đánh giá xong, Nhi thấy mình toàn mức 1–2: hiểu lý thuyết nhưng chưa áp dụng gì. Nhi nên bắt đầu lại thế nào?', a: 'Chọn MỘT kĩ năng có tác động lớn nhất với Nhi lúc này — với học sinh lớp 9 thường là time-block hoặc gợi nhớ chủ động. Áp dụng ở quy mô nhỏ nhất: 1 khối học 45 phút mỗi tối, duy trì 2 tuần liền. Thành công với một thói quen nhỏ sẽ tạo đà cho các kĩ năng khác — đừng sửa mọi thứ cùng lúc.' },
      { q: 'Mục tiêu tuần 2 của Phong là "nâng Toán từ 6 lên 7 trong học kì 1", giữa kì em đã đạt 7,2. Phong nên làm gì với mục tiêu này?', a: 'Phong đang vượt tiến độ — nên nâng mục tiêu có cân nhắc: đặt 7,5–7,8 cho cuối kì, kèm điều kiện giữ vững các môn khác (tránh dồn lệch). Đồng thời ghi lại "công thức thành công" của 11 tuần qua (cách học nào hiệu quả) để nhân rộng sang môn yếu hơn.' },
      { q: 'Khi ôn lại bằng gợi nhớ chủ động, Hạnh gấp vở viết được đủ 5 tiêu chí SMART và 6 nhóm RIASEC nhưng quên sạch 4 bước nhận đề thi và lẫn lộn 5 chiều OCEAN. Hạnh nên kết luận và làm gì tiếp?', a: 'Đây chính là tác dụng của gợi nhớ chủ động: nó chỉ ra CHÍNH XÁC chỗ hổng thay vì cảm giác "đọc thấy quen". Kết luận: SMART và RIASEC đã chắc, còn 4 bước nhận đề thi (tuần 6) và Big Five (tuần 9) là phần cần ôn lại. Việc làm: mở đúng hai bài đó học lại, hôm sau gấp vở viết lại RIÊNG hai phần này; nếu vẫn lẫn thì làm thẻ ghi nhớ. Đừng ôn dàn trải lại cả 11 tuần — dồn thời gian vào đúng chỗ vừa "thi trượt" với chính mình mới là ôn tập hiệu quả.' },
    ]
  ),

  'S9HDTN-w13-quiz': L(
    'Trải nghiệm thực tế — Hoạt động tình nguyện',
    'Học không chỉ trong sách vở. Tuần này các em tìm hiểu hoạt động tình nguyện (volunteer) — cách tuyệt vời để giúp cộng đồng, rèn kĩ năng và khám phá chính mình.',
    ['Hiểu ý nghĩa của hoạt động tình nguyện với cộng đồng và bản thân.', 'Biết các hình thức tình nguyện phù hợp lứa tuổi học sinh THCS.', 'Lập được kế hoạch tham gia một hoạt động tình nguyện an toàn.', 'Biết rút ra bài học sau mỗi hoạt động.'],
    [
      { h: 'Tình nguyện là gì và vì sao nên tham gia?' },
      { p: 'Tình nguyện là tự nguyện dành thời gian, công sức giúp đỡ người khác hoặc cộng đồng mà không vì thù lao. Với cộng đồng, đó là những bàn tay góp sức thiết thực. Với bản thân em, tình nguyện rèn kĩ năng làm việc nhóm, giao tiếp, tổ chức — và là "phòng thí nghiệm" hướng nghiệp: nhiều bạn phát hiện mình hợp nghề dạy học, y tế hay tổ chức sự kiện chính từ các hoạt động này.' },
      { h: 'Các hình thức phù hợp học sinh lớp 9' },
      { ul: ['Trong trường: kèm bạn học yếu, trực thư viện, làm báo tường, hỗ trợ sự kiện trường.', 'Khu dân cư: dọn vệ sinh ngõ xóm, kế hoạch nhỏ, thăm hỏi người già neo đơn cùng đoàn thể địa phương.', 'Môi trường: trồng cây, phân loại rác, đổi rác lấy quà, làm sạch bãi biển/bờ kênh (có người lớn tổ chức).', 'Quyên góp: sách cũ, quần áo ấm, nuôi heo đất ủng hộ bạn vùng khó khăn.'] },
      { h: 'Nguyên tắc an toàn và đúng mực' },
      { ul: ['Luôn xin phép và thông báo cho bố mẹ: đi đâu, với ai, mấy giờ về.', 'Chỉ tham gia hoạt động do nhà trường, Đoàn — Đội hoặc tổ chức uy tín đứng ra; cảnh giác lời kêu gọi quyên tiền mập mờ trên mạng.', 'Lượng sức: không nhận việc nặng quá sức, không bỏ bê việc học chính.', 'Tôn trọng người được giúp: giúp đỡ không phải ban ơn, không chụp ảnh người khó khăn đăng mạng khi chưa được đồng ý.'] },
      { h: 'Lập kế hoạch một hoạt động nhỏ' },
      { p: 'Áp dụng quy trình 5 bước: (1) Chọn vấn đề em quan tâm trong tầm tay — ví dụ tủ sách lớp nghèo sách; (2) Đặt mục tiêu SMART — quyên 100 đầu sách trong 3 tuần; (3) Lập nhóm và phân công; (4) Thực hiện kèm theo dõi tiến độ; (5) Tổng kết, cảm ơn người tham gia và bàn giao kết quả.' },
      { h: 'Rút bài học sau hoạt động' },
      { p: 'Sau mỗi hoạt động, dành 15 phút trả lời ba câu: Điều gì diễn ra tốt? Điều gì chưa tốt và vì sao? Lần sau làm khác đi thế nào? Ghi thêm: mình thấy hứng thú nhất với phần việc nào — dữ liệu quý cho hồ sơ hướng nghiệp tuần 10.' },
      { note: 'Giá trị của tình nguyện không đo bằng ảnh đăng mạng mà bằng thay đổi thật cho người được giúp — và thay đổi thật trong chính em.' },
    ],
    [
      { q: 'Lớp 9A muốn giúp các em lớp 6 yếu môn Toán trong trường. Hãy phác kế hoạch 5 bước cho hoạt động này.', a: '(1) Vấn đề: khoảng 10 em lớp 6 mất gốc Toán. (2) Mục tiêu SMART: sau 8 tuần, các em làm chắc phép tính phân số, kiểm tra đạt từ 6 trở lên. (3) Nhóm: 5 bạn 9A khá Toán, mỗi bạn kèm 2 em, xin cô chủ nhiệm hai lớp làm cố vấn, mượn phòng học chiều thứ Năm. (4) Thực hiện: mỗi buổi 60 phút, có sổ theo dõi từng em. (5) Tổng kết: làm bài kiểm tra nhỏ, báo cáo kết quả với hai cô, rút kinh nghiệm.' },
      { q: 'Trên mạng có lời kêu gọi: "Chuyển khoản ủng hộ trẻ vùng cao, ai chuyển sẽ được vinh danh". Đào muốn giúp nhưng băn khoăn. Em tư vấn gì cho Đào?', a: 'Băn khoăn là đúng — kêu gọi quyên tiền cá nhân trên mạng không kiểm chứng có rủi ro lừa đảo. Đào nên: chỉ ủng hộ qua kênh chính thống (nhà trường, Đội, Hội Chữ thập đỏ, quỹ có giấy phép); hoặc chuyển sang đóng góp hiện vật qua đợt quyên góp của trường. Lòng tốt cần đi cùng sự tỉnh táo, và học sinh nên hỏi ý kiến bố mẹ trước mọi khoản quyên góp.' },
      { q: 'Sau buổi dọn vệ sinh khu phố, một bạn trong nhóm Minh chụp ảnh các cụ già neo đơn được nhóm thăm rồi đăng kèm chú thích "thương quá, mọi người chia sẻ ủng hộ nhóm mình nhé". Minh thấy gợn. Theo nguyên tắc tuần này, điều này có ổn không?', a: 'Không ổn ở hai điểm. Một, đăng ảnh người được giúp khi chưa được họ đồng ý là xâm phạm phẩm giá của họ — giúp đỡ không phải ban ơn, càng không phải để "lấy hình" cho mình; nguyên tắc là tôn trọng người được giúp. Hai, biến hoạt động tử tế thành công cụ xin tương tác làm sai lệch ý nghĩa của tình nguyện (giá trị đo bằng thay đổi thật, không đo bằng ảnh đăng mạng). Minh nên góp ý nhẹ với bạn gỡ ảnh hoặc che mặt và bỏ phần kêu gọi; lần sau, nếu cần ghi lại hoạt động thì xin phép trước và tập trung vào việc làm chứ không vào người được giúp.' },
    ]
  ),

  'S9HDTN-w14-quiz': L(
    'Trải nghiệm thực tế — Tập làm việc như thực tập sinh',
    'Internship (thực tập) thường dành cho sinh viên, nhưng học sinh lớp 9 hoàn toàn có thể có "trải nghiệm nghề" phù hợp lứa tuổi: quan sát công việc, thử việc nhỏ có hướng dẫn. Tuần này học cách làm điều đó an toàn và hiệu quả.',
    ['Hiểu trải nghiệm nghề nghiệp là gì và lợi ích với việc hướng nghiệp.', 'Biết các hình thức trải nghiệm nghề phù hợp và hợp pháp với tuổi 14–15.', 'Chuẩn bị được tâm thế và câu hỏi khi đi quan sát một nghề.', 'Rút ra kết luận hướng nghiệp từ trải nghiệm.'],
    [
      { h: 'Trải nghiệm nghề — "nếm thử" trước khi chọn' },
      { p: 'Đọc về nghề giống xem ảnh món ăn; trải nghiệm nghề là được nếm thử. Một buổi theo chân người làm nghề có thể cho em nhiều thông tin thật hơn mười bài viết: nhịp công việc, áp lực, niềm vui, và cả những phần "không như phim".' },
      { h: 'Các hình thức phù hợp tuổi 14–15' },
      { ul: ['Quan sát công việc (job shadowing): theo chân bố mẹ, cô chú, người quen một buổi làm việc — chỉ quan sát và hỏi.', 'Phụ việc nhẹ trong gia đình: phụ bán hàng ở cửa hàng nhà, phụ sổ sách đơn giản, chăm vườn — dưới sự giám sát của người thân.', 'Tham quan hướng nghiệp do trường tổ chức: nhà máy, trang trại, bệnh viện, xưởng thủ công.', 'Dự án mô phỏng: gian hàng hội chợ trường, làm sản phẩm thủ công bán gây quỹ, làm video/bản tin lớp.'] },
      { h: 'Lưu ý pháp luật và an toàn' },
      { p: 'Pháp luật lao động Việt Nam bảo vệ người chưa đủ 15 tuổi rất chặt: chỉ được làm công việc nhẹ trong danh mục cho phép, thời gian giới hạn, phải có sự đồng ý của cha mẹ. Vì vậy ở lớp 9, mục tiêu là TRẢI NGHIỆM và HỌC HỎI, không phải đi làm kiếm tiền. Tránh xa lời mời "việc nhẹ lương cao" trên mạng — đó là dấu hiệu lừa đảo phổ biến.' },
      { h: 'Chuẩn bị trước buổi quan sát nghề' },
      { ul: ['Tìm hiểu trước về nghề và nơi đến để hỏi câu có chiều sâu.', 'Chuẩn bị 5–7 câu hỏi: một ngày làm việc diễn ra thế nào? Phần việc nào khó nhất? Cô/chú đã học gì để vào nghề? Nếu chọn lại có chọn nghề này không? Lời khuyên cho người muốn theo nghề?', 'Tác phong: đúng giờ, trang phục gọn gàng, xin phép trước khi chụp ảnh, không làm phiền công việc.'] },
      { h: 'Trong và sau buổi trải nghiệm' },
      { p: 'Trong buổi: quan sát kĩ và ghi chép — cả điều thích lẫn điều không ngờ tới. Sau buổi: gửi lời cảm ơn; rồi đối chiếu với hồ sơ bản thân (tuần 10): trải nghiệm này xác nhận hay thay đổi suy nghĩ của em về nghề? Em hợp/không hợp ở điểm nào?' },
      { h: 'Một trải nghiệm "gây thất vọng" vẫn là thành công' },
      { p: 'Nhiều bạn sau một buổi theo nghề mơ ước lại nhận ra "không như mình tưởng" — đó KHÔNG phải thất bại. Loại được một lựa chọn không phù hợp khi mới lớp 9 rẻ hơn rất nhiều so với khi đã học xong đại học. Mỗi trải nghiệm đều thu hẹp vùng tìm kiếm.' },
      { note: 'Câu hỏi hay nhất để hỏi người trong nghề: "Điều gì về nghề này mà người ngoài thường hiểu lầm nhất?" — câu trả lời thường đáng giá cả buổi trải nghiệm.' },
    ],
    [
      { q: 'Trường tổ chức tham quan một công ty phần mềm. Việt mê làm game và muốn tận dụng tối đa chuyến đi. Việt nên chuẩn bị gì?', a: 'Trước: tìm hiểu công ty làm sản phẩm gì, các vị trí nghề (lập trình, thiết kế, kiểm thử); chuẩn bị câu hỏi cụ thể như "một game ra đời qua những bước nào", "học Tin ở phổ thông cần chắc phần gì". Trong: quan sát môi trường làm việc thực tế, ghi chép. Sau: đối chiếu — mình thích khâu nào trong quy trình (code, vẽ, nghĩ cốt truyện, kiểm thử)? Từ đó tinh chỉnh hướng học: lập trình, mỹ thuật số hay thiết kế trò chơi.' },
      { q: 'Nghỉ hè, Quỳnh (15 tuổi) thấy tin tuyển "cộng tác viên chốt đơn online, việc nhẹ lương cao, chỉ cần điện thoại". Quỳnh có nên làm để lấy kinh nghiệm không?', a: 'Không. "Việc nhẹ lương cao" là khẩu hiệu kinh điển của lừa đảo: nạn nhân thường bị dụ nạp tiền "làm nhiệm vụ" rồi mất trắng, hoặc vô tình tiếp tay quảng cáo sai. Kinh nghiệm phù hợp tuổi Quỳnh là phụ việc cho người thân quen có giám sát, hoặc hoạt động do trường tổ chức. Bất kì việc gì qua mạng đều phải hỏi ý kiến bố mẹ trước.' },
      { q: 'Cường mơ làm đầu bếp, xin theo chú ruột (chủ một quán ăn) phụ bếp một buổi. Sau buổi đó Cường mệt rã rời, thấy bếp nóng bức, áp lực giờ cao điểm và nói "hoá ra không lung linh như trên TV, chắc mình bỏ ước mơ này". Em nhận xét thế nào?', a: 'Buổi trải nghiệm đã làm đúng nhiệm vụ — cho Cường "nếm thử" thay vì chỉ "xem ảnh", và lộ ra mặt thật của nghề (vất vả, nóng, áp lực thời gian). Nhưng đừng vội kết luận sau MỘT buổi mệt: (1) bất kì nghề nào ngày đầu cũng choáng, cần vài lần để quen; (2) Cường nên tách bạch — mình ghét cái gì: bản chất nấu nướng, hay chỉ là sự mệt và môi trường quán đông? Có thể hợp làm bánh, bếp nhà hàng khách sạn mát mẻ hơn, hay nghiên cứu ẩm thực. Nếu thử thêm vài lần vẫn thấy không hợp thì việc "loại" nghề này ở lớp 9 là một thành công, không phải thất bại — đã tiết kiệm được nhiều năm đi nhầm đường. Mỗi trải nghiệm đều thu hẹp vùng tìm kiếm.' },
    ]
  ),

  'S9HDTN-w15-quiz': L(
    'Kỹ năng sống — Nấu ăn cơ bản',
    'Tự nấu được bữa cơm đơn giản là kĩ năng sinh tồn ai cũng cần — đặc biệt khi vài năm nữa nhiều em sẽ sống xa nhà. Tuần này: vào bếp một cách an toàn và khoa học!',
    ['Nắm nguyên tắc an toàn khi sử dụng bếp, dao và thực phẩm.', 'Hiểu cơ cấu bữa ăn đủ chất theo 4 nhóm thực phẩm.', 'Tự thực hiện được một bữa ăn đơn giản 2–3 món.', 'Biết lên thực đơn và đi chợ trong ngân sách.'],
    [
      { h: 'An toàn trước đã' },
      { ul: ['Bếp gas: kiểm tra mùi gas trước khi bật; khoá van sau khi nấu; không để vật dễ cháy cạnh bếp. Bếp điện/từ: lau khô tay trước khi cắm rút điện.', 'Dao thớt: cầm dao chắc, ngón tay cong lại khi giữ thực phẩm; dùng thớt riêng cho đồ sống và đồ chín.', 'Dầu nóng: cho thức ăn ráo nước vào từ từ, tránh dầu bắn; tuyệt đối không dập lửa dầu bằng nước — hãy đậy vung và tắt bếp.', 'Rửa tay trước khi nấu; thực phẩm rã đông trong ngăn mát, không để thịt sống ở nhiệt độ phòng quá lâu.'] },
      { h: 'Bữa ăn đủ chất — 4 nhóm thực phẩm' },
      { p: 'Một bữa cơm cân đối cần đủ: chất bột đường (cơm, bún, khoai), chất đạm (thịt, cá, trứng, đậu phụ), chất béo (dầu, mỡ — vừa phải), vitamin và khoáng chất (rau, củ, quả). Công thức dễ nhớ cho một mâm cơm: cơm + một món mặn + một món rau + canh.' },
      { h: 'Năm kĩ thuật nền tảng' },
      { ul: ['Nấu cơm: vo gạo, đong nước (ngập gạo khoảng một đốt ngón tay với gạo tẻ thường).', 'Luộc: rau xanh luộc nước sôi già, không đậy vung quá lâu để giữ màu; trứng luộc 7–10 phút tuỳ độ chín.', 'Chiên/rán: lửa vừa, dầu nóng già mới cho thực phẩm; trở mặt khi đã vàng.', 'Xào: lửa lớn, đảo nhanh tay, nêm cuối.', 'Nấu canh: phi thơm, cho nước, sôi rồi mới thả rau, nêm vừa miệng.'] },
      { h: 'Lên thực đơn và đi chợ' },
      { p: 'Trước khi đi chợ hãy viết thực đơn và danh sách cần mua kèm ngân sách — tránh mua theo cảm hứng. Mẹo chọn: rau tươi lá không héo úa; cá mang đỏ, mắt trong; thịt màu tươi, ấn vào đàn hồi. Mua theo mùa vừa rẻ vừa ngon.' },
      { h: 'Quy trình nấu một bữa gọn gàng' },
      { p: 'Đọc kĩ công thức → sơ chế toàn bộ nguyên liệu trước (mise en place) → nấu món lâu nhất trước (cơm, món hầm) → món xào nấu sau cùng để ăn nóng → vừa nấu vừa dọn: rửa ngay dụng cụ đã dùng xong, bếp sạch khi món cuối hoàn thành.' },
      { h: 'Nấu ăn và hướng nghiệp' },
      { p: 'Nếu em thấy say mê việc bếp núc — sáng tạo món, trang trí đĩa, tính toán định lượng — đó có thể là tín hiệu của nhóm R (kĩ thuật khéo tay) và A (sáng tạo): ngành đầu bếp, làm bánh, quản trị nhà hàng — khách sạn đang rất cần nhân lực được đào tạo bài bản.' },
      { note: 'Bí quyết của người mới nấu: chọn món ÍT BƯỚC làm trước (trứng chiên, rau luộc, canh cà chua), thành công vài lần rồi mới nâng độ khó. Nêm nhạt trước, mặn thì khó cứu!' },
    ],
    [
      { q: 'Bố mẹ về muộn, Khang cần tự nấu bữa tối cho mình và em gái với đồ có sẵn: gạo, trứng, cà chua, rau muống. Hãy lập kế hoạch bữa ăn cho Khang.', a: 'Thực đơn đủ 4 nhóm: cơm (bột đường) + trứng chiên hoặc trứng sốt cà chua (đạm, béo) + rau muống luộc (vitamin), tận dụng nước luộc rau dầm sấu/vắt chanh làm canh. Thứ tự: cắm cơm trước → nhặt rửa rau, đánh trứng → luộc rau → chiên trứng sau cùng. Khoảng 30–40 phút có bữa tối nóng sốt, nhớ khoá bếp sau khi nấu.' },
      { q: 'Đang chiên cá thì chảo dầu của Vân bùng lửa. Vân hoảng quá định hắt nước vào. Hành động này đúng hay sai, xử lí chuẩn là gì?', a: 'SAI và rất nguy hiểm: nước gặp dầu sôi sẽ làm lửa bùng to và dầu cháy bắn tung toé. Xử lí chuẩn: tắt bếp, đậy vung (hoặc khăn ẩm dày phủ kín mặt chảo) để cắt oxy, lửa sẽ tự tắt; tuyệt đối không bê chảo đang cháy đi nơi khác. Nếu lửa lan, thoát ra ngoài và gọi 114, hô hoán người lớn.' },
      { q: 'Lần đầu vào bếp, Tâm chọn ngay món bò sốt vang cầu kì nhiều bước, kết quả vừa cháy vừa mặn chát phải bỏ. Tâm chán nản nghĩ "mình không có khiếu nấu ăn". Theo gợi ý của bài, Tâm nên bắt đầu lại thế nào?', a: 'Không phải "không có khiếu" mà là chọn sai độ khó. Bí quyết của người mới nấu là chọn món ÍT BƯỚC trước: trứng chiên, rau luộc, canh cà chua — thành công vài lần để tạo cảm giác làm được rồi mới nâng dần lên món nhiều bước. Về vị, quy tắc là nêm nhạt trước rồi thêm dần, vì mặn quá thì khó cứu. Trước khi nấu nên sơ chế hết nguyên liệu (mise en place) và nấu món lâu nhất trước. Một bữa thất bại không định nghĩa khả năng — đó là tư duy phát triển: kĩ năng nấu ăn rèn được qua luyện tập đúng cách.' },
    ]
  ),

  'S9HDTN-w16-quiz': L(
    'Kỹ năng sống — Giặt và gấp quần áo',
    'Nghe có vẻ nhỏ nhặt, nhưng tự lo được quần áo của mình là thước đo rõ nhất của sự tự lập. Tuần này: giặt đúng cách, phơi khéo, gấp gọn — và hiểu vì sao việc nhà là việc của mọi thành viên.',
    ['Đọc hiểu kí hiệu giặt là trên nhãn quần áo.', 'Biết phân loại và giặt quần áo đúng cách bằng tay và bằng máy.', 'Gấp và sắp xếp tủ quần áo gọn gàng, dễ tìm.', 'Hình thành ý thức chia sẻ việc nhà.'],
    [
      { h: 'Đọc nhãn quần áo — bản hướng dẫn bị bỏ quên' },
      { p: 'Mặt trong áo quần có nhãn ghi kí hiệu chăm sóc: chậu nước (giặt được, kèm nhiệt độ tối đa), bàn tay trong chậu (giặt tay), tam giác (chất tẩy), hình vuông có tròn bên trong (sấy máy), bàn là với số chấm (nhiệt độ ủi), kí hiệu gạch chéo nghĩa là KHÔNG được làm. Đọc nhãn 5 giây có thể cứu chiếc áo len khỏi co thành áo búp bê.' },
      { h: 'Phân loại trước khi giặt' },
      { ul: ['Theo màu: đồ trắng/sáng riêng, đồ màu đậm riêng — áo đỏ mới mua có thể nhuộm hồng cả mẻ đồ trắng.', 'Theo chất liệu: đồ len, đồ ren mỏng nên giặt tay hoặc dùng túi giặt; đồ jean lộn trái.', 'Theo độ bẩn: đồ thể thao lấm bùn nên xả qua trước.', 'Kiểm tra túi: rút hết giấy, tiền, tai nghe — thủ phạm quen thuộc của những mẻ giặt thảm hoạ.'] },
      { h: 'Giặt tay đúng cách' },
      { p: 'Hoà tan xà phòng trong nước trước rồi mới cho đồ vào ngâm 15–20 phút; vò nhẹ chỗ bẩn nhiều (cổ áo, cổ tay); xả lại bằng nước sạch đến khi hết xà phòng; vắt nhẹ — đồ len chỉ bóp nước, không vặn xoắn.' },
      { h: 'Giặt máy thông minh' },
      { ul: ['Không nhồi quá 80% lồng giặt — máy quá tải giặt không sạch và nhanh hỏng.', 'Đong bột/nước giặt theo hướng dẫn, nhiều hơn không sạch hơn mà còn gây cặn.', 'Chọn chế độ phù hợp: đồ thường, đồ mỏng nhẹ, vắt mạnh cho jean và khăn.', 'Giặt xong phơi ngay, đừng ủ trong máy — áo quần sẽ hôi và phải giặt lại.'] },
      { h: 'Phơi và gấp' },
      { p: 'Phơi: giũ mạnh cho phẳng trước khi phơi để đỡ phải ủi; áo phơi lộn trái nơi thoáng gió để giữ màu; đồ len phơi nằm ngang cho khỏi giãn. Gấp: gấp theo cùng một cỡ để xếp tủ thẳng hàng; có thể học cách gấp dựng đứng — mở ngăn kéo là thấy mọi chiếc áo, lấy một cái không làm xô cả chồng.' },
      { h: 'Việc nhà là việc chung' },
      { p: 'Ở tuổi 15, tự giặt đồ của mình và san sẻ việc giặt giũ của cả nhà là điều bình thường và đáng tự hào — không phân biệt con trai con gái. Mỗi tuần em chủ động nhận một phần việc cố định: cả nhà nhẹ đi một chút, và bố mẹ nhìn em bằng ánh mắt khác.' },
      { note: 'Quy tắc 1 phút: quần áo thay ra hoặc cho ngay vào giỏ giặt, hoặc treo lên — không có lựa chọn "vắt lên ghế". Chiếc ghế chất đống quần áo là kẻ thù của mọi căn phòng gọn gàng.' },
    ],
    [
      { q: 'Sáng thứ Hai, Tùng phát hiện chiếc áo đồng phục trắng bị loang màu hồng sau khi mẹ nhờ Tùng giặt máy tối qua. Nguyên nhân và bài học là gì?', a: 'Nguyên nhân: trong mẻ giặt có đồ màu đậm (thường là đồ đỏ/hồng mới) phai màu sang đồ trắng. Bài học: luôn phân loại trắng — màu trước khi giặt; đồ mới mua màu đậm nên giặt riêng lần đầu. Chữa cháy: ngâm áo trắng với sản phẩm tẩy an toàn cho vải trắng theo hướng dẫn, càng sớm càng dễ cứu.' },
      { q: 'Phòng của Chi lúc nào cũng có "núi" quần áo trên ghế dù tủ còn trống. Hãy thiết kế giải pháp trọn gói cho Chi.', a: 'Bước 1: dọn một lần triệt để — chia 3 loại: bẩn (vào giỏ giặt), mặc lại được (treo lên mắc), sạch (gấp vào tủ). Bước 2: lập quy tắc 1 phút — thay đồ xong xử lí ngay. Bước 3: sắp tủ theo nhóm (đồng phục, đồ nhà, đồ đẹp) và thử gấp dựng đứng cho ngăn kéo. Bước 4: đặt lịch 10 phút tối Chủ nhật chỉnh lại tủ. Vấn đề của Chi không phải thiếu chỗ mà thiếu hệ thống.' },
      { q: 'Mẹ nhờ Nam giặt máy mẻ đồ có chiếc áo len yêu thích của mẹ. Nam định cho tất vào máy giặt chế độ vắt mạnh cho nhanh. Theo nhãn giặt và nguyên tắc đã học, Nam nên làm gì?', a: 'Trước hết Nam phải đọc nhãn chiếc áo len: thường có kí hiệu "bàn tay trong chậu" (giặt tay) hoặc gạch chéo lên biểu tượng máy giặt/máy sấy — nghĩa là KHÔNG giặt máy, không vắt mạnh, vì len dễ co rút và giãn. Cách đúng: tách áo len ra giặt tay riêng (hoà tan xà phòng, ngâm nhẹ, chỉ bóp nước không vặn xoắn, phơi nằm ngang cho khỏi giãn); phần đồ còn lại phân loại theo màu rồi mới cho vào máy, kiểm tra túi trước. Đọc nhãn 5 giây cứu được chiếc áo len khỏi co thành áo búp bê — và cứu Nam khỏi làm hỏng đồ của mẹ.' },
    ]
  ),

  'S9HDTN-w17-quiz': L(
    'Kỹ năng sống — Quản lý tiền (Financial literacy)',
    'Tiền không tự nhiên sinh ra trong ví — và cũng biến mất rất nhanh nếu không có kế hoạch. Tuần này các em học những bài học tài chính cá nhân đầu tiên: chi tiêu, tiết kiệm và cảnh giác với cạm bẫy tiền bạc.',
    ['Phân biệt được nhu cầu thiết yếu và mong muốn.', 'Biết lập ngân sách đơn giản và ghi chép chi tiêu.', 'Hiểu nguyên tắc tiết kiệm có mục tiêu.', 'Nhận diện các cạm bẫy tài chính nhắm vào tuổi học sinh.'],
    [
      { h: 'Cần và muốn — câu hỏi đầu tiên trước khi mở ví' },
      { p: 'Nhu cầu (cần) là thứ thiết yếu: đồ dùng học tập, bữa sáng, tiền gửi xe. Mong muốn (muốn) là thứ có thì vui, không có vẫn ổn: trà sữa, vật phẩm game, áo phông in hình thần tượng. Không phải "muốn" là xấu — nhưng người quản lý tiền tốt luôn trả lời được: khoản này là cần hay muốn, và muốn này đáng giá bao nhiêu phần tiền của mình?' },
      { h: 'Quy tắc chia tiền 50-30-20 phiên bản học sinh' },
      { p: 'Với tiền tiêu vặt và tiền mừng tuổi, em có thể chia: khoảng 50% cho nhu cầu (ăn sáng, học tập), 30% cho mong muốn (giải trí, quà sinh nhật bạn), 20% cho tiết kiệm. Tỉ lệ có thể điều chỉnh, quan trọng là CÓ kế hoạch và phần tiết kiệm được cất riêng ngay khi nhận tiền — "trả cho tương lai mình trước".' },
      { h: 'Ghi chép chi tiêu — tấm gương soi ví tiền' },
      { ul: ['Ghi mọi khoản chi trong 30 ngày: sổ tay hoặc ứng dụng đều được.', 'Cuối tháng cộng theo nhóm: ăn vặt, giải trí, học tập... — hầu hết mọi người đều giật mình với một nhóm nào đó.', 'Tìm "lỗ rò": khoản nhỏ lặp lại mới đáng sợ — 15 nghìn trà sữa x 20 lần = 300 nghìn/tháng.'] },
      { h: 'Tiết kiệm có mục tiêu' },
      { p: 'Tiết kiệm vu vơ rất khó bền; tiết kiệm cho mục tiêu cụ thể thì khác hẳn: "Gom 600 nghìn trong 4 tháng mua giày thể thao" — đó chính là mục tiêu SMART áp vào tiền bạc. Chia nhỏ: mỗi tuần để dành 35–40 nghìn. Mẹo: bỏ ống/tài khoản riêng, ghi tên mục tiêu lên ống.' },
      { h: 'Cạm bẫy tài chính tuổi học sinh' },
      { ul: ['Nạp game theo cảm xúc: các vật phẩm "ưu đãi chỉ hôm nay" được thiết kế để em quyết định vội. Quy tắc: muốn nạp gì, đợi 48 giờ rồi quyết.', 'Vay tiền bạn bè dây dưa: vay nhỏ nhiều lần dễ mất kiểm soát và mất cả tình bạn. Đã vay phải ghi lại và trả đúng hẹn.', '"Kiếm tiền nhanh" trên mạng: nhiệm vụ nhận hoa hồng, đầu tư siêu lợi nhuận — đều là lừa đảo nhắm vào người nhẹ dạ. Tiền chỉ đến từ lao động và giá trị thật.', 'Khoe đồ — đua đồ: giá trị của em không nằm ở món đồ em mang trên người.'] },
      { h: 'Nói chuyện với bố mẹ về tiền' },
      { p: 'Đừng ngại hỏi bố mẹ: nhà mình chi tiêu thế nào, vì sao có khoản phải cân nhắc. Hiểu nỗ lực phía sau đồng tiền giúp em chi tiêu trân trọng hơn — và bố mẹ thường sẵn lòng "tài trợ có đối ứng" cho mục tiêu tiết kiệm nghiêm túc của con.' },
      { note: 'Công thức giàu có giản dị nhất: chi tiêu ít hơn số tiền mình có, đều đặn để dành phần chênh lệch, và đừng để ai lừa mất nó.' },
    ],
    [
      { q: 'Mỗi tháng Bảo có 400 nghìn tiền tiêu vặt nhưng luôn hết veo trước ngày 20 mà không rõ tiền đi đâu. Hãy thiết kế giải pháp cho Bảo.', a: 'Tháng đầu: chỉ cần ghi chép toàn bộ chi tiêu, chưa cần cắt gì — để có dữ liệu. Phân tích cuối tháng thường lộ ra "lỗ rò" (ví dụ ăn vặt 200 nghìn). Tháng sau: áp ngân sách 50-30-20 (200 nghìn cần — 120 nghìn muốn — 80 nghìn tiết kiệm), cất 80 nghìn ngay ngày đầu tháng, chia phần còn lại theo tuần (mỗi tuần ~80 nghìn) để không tiêu trước hụt sau.' },
      { q: 'Một anh lớp trên rủ Kiên tham gia "app đầu tư, nạp 500 nghìn mỗi tuần rút 100 nghìn lãi, rủ thêm bạn còn được thưởng". Kiên thấy anh ấy khoe đã rút được tiền thật. Kiên nên làm gì?', a: 'Từ chối dứt khoát. Lãi 20%/tuần là phi lý (ngân hàng chỉ vài phần trăm MỘT NĂM); "rút được tiền lúc đầu" là chiêu mồi kinh điển của mô hình đa cấp/Ponzi — lấy tiền người sau trả người trước, sụp là mất hết; "rủ thêm bạn được thưởng" chính là dấu hiệu đa cấp. Kiên nên kể với bố mẹ và báo thầy cô để cảnh báo các bạn khác — nhiều bạn cùng trường có thể đang là mục tiêu.' },
      { q: 'Hằng được 1 triệu tiền mừng tuổi. Bạn ấy muốn vừa mua được đôi giày 600 nghìn mơ ước, vừa không tiêu hết sạch như mọi năm. Hãy giúp Hằng lập kế hoạch theo các nguyên tắc đã học.', a: 'Áp "trả cho tương lai mình trước" và tiết kiệm có mục tiêu: ngay khi nhận 1 triệu, tách 20% (200 nghìn) cất riêng vào ống/tài khoản tiết kiệm — không động tới. Đôi giày 600 nghìn là "mong muốn" lớn, nên biến thành mục tiêu SMART: thay vì rút cả cục, đặt mục tiêu để dành thêm từ tiền tiêu vặt hằng tuần (mỗi tuần ~40 nghìn) để vừa mua giày vừa giữ được khoản tiết kiệm; hoặc nếu mua ngay thì coi như đã tiêu trước phần "mong muốn" của vài tháng và siết chi tiêu lại. Phần còn lại chia cho nhu cầu (đồ học tập) và chi tiêu vặt theo tuần. Mấu chốt: cất phần tiết kiệm TRƯỚC, và mỗi khoản chi đều tự hỏi "đây là cần hay muốn".' },
    ]
  ),

  'S9HDTN-w18-quiz': L(
    'Ôn tập học kì 1 — Tổng hợp',
    'Khép lại học kì 1! Tuần này chúng ta tổng kết toàn bộ hành trình: từ hiểu mình, quản trị việc học, hướng nghiệp đến kĩ năng sống — và chuẩn bị tâm thế cho học kì quyết định phía trước.',
    ['Hệ thống hoá kiến thức và kĩ năng của cả học kì 1.', 'Tự đánh giá toàn diện mức độ trưởng thành qua 18 tuần.', 'Viết được bản tổng kết cá nhân học kì.', 'Đặt mục tiêu trọng tâm cho học kì 2.'],
    [
      { h: 'Toàn cảnh học kì 1' },
      { ul: ['Chặng 1 — Hiểu mình và quản trị việc học (t1–t7): SWOT, SMART, time-block, học chủ động, lộ trình thi vào 10, chiến thuật làm bài, quản lý stress.', 'Chặng 2 — Hướng nghiệp và tâm lý (t8–t12): RIASEC, Big Five, kiềng ba chân chọn nghề, sức khoẻ tâm lý dậy thì.', 'Chặng 3 — Trải nghiệm và kĩ năng sống (t13–t17): tình nguyện, trải nghiệm nghề, nấu ăn, giặt gấp, quản lý tiền.'] },
      { h: 'Sợi chỉ đỏ xuyên suốt' },
      { p: 'Nhìn lại, mọi tuần đều xoay quanh một năng lực: TỰ CHỦ — tự hiểu mình, tự đặt mục tiêu, tự quản thời gian và tiền bạc, tự phục vụ, và tự tìm trợ giúp đúng lúc. Đó chính là hành trang quan trọng nhất cho cấp 3 và cuộc sống.' },
      { h: 'Ôn tập bằng sơ đồ kết nối' },
      { p: 'Thay vì ôn từng tuần rời rạc, hãy vẽ sơ đồ kết nối: SWOT (t1) cấp dữ liệu cho kiềng ba chân (t10); SMART (t2) là khung cho lộ trình thi (t5), tiết kiệm tiền (t17) và kế hoạch tình nguyện (t13); kĩ thuật thở (t7) phục vụ cả phòng thi lẫn mâu thuẫn cảm xúc (t11). Kiến thức kết nối là kiến thức bền.' },
      { h: 'Bản tổng kết cá nhân học kì' },
      { ul: ['Ba thay đổi lớn nhất của em so với đầu năm (thói quen, nhận thức, kĩ năng).', 'Một kĩ năng em tự hào nhất — kèm bằng chứng cụ thể.', 'Một điều em định làm mà chưa làm được — và rào cản thật sự là gì.', 'Mã RIASEC + nét Big Five + danh sách nghề ứng viên hiện tại của em.'] },
      { h: 'Chuẩn bị cho học kì 2' },
      { p: 'Học kì 2 có hai mặt trận: kì thi vào 10 đến gần (lộ trình bước vào giai đoạn tăng tốc) và mạch bài về quan hệ xã hội — phòng chống tệ nạn, bạo lực học đường, tình bạn tình yêu, giao tiếp. Cả hai đều cần nền tảng tự chủ em vừa xây.' },
      { h: 'Mục tiêu trọng tâm học kì 2' },
      { p: 'Chọn 1 mục tiêu học tập (gắn với thi vào 10) + 1 mục tiêu kĩ năng (ví dụ: duy trì ngân sách cá nhân, mỗi tháng một hoạt động cộng đồng) — viết theo chuẩn SMART, dán ở góc học tập, hẹn ngày tự kiểm giữa kì.' },
      { note: 'Trưởng thành không đo bằng tuổi mà đo bằng số việc em tự làm được mà trước đây phải nhờ người khác. Hãy đếm thử — con số của học kì này chắc chắn làm em ngạc nhiên.' },
    ],
    [
      { q: 'Viết bản tổng kết, Sang nhận ra mình nhớ hết lý thuyết RIASEC, SMART nhưng điểm thi thử vẫn giậm chân và tiền tiêu vẫn hết sạch mỗi tháng. Sang nên kết luận gì về học kì của mình?', a: 'Sang đang dừng ở "biết" mà chưa "làm" — mức 1–2 của thang tự đánh giá. Kết luận đúng: học kì 2 không cần học thêm lý thuyết mới mà cần cơ chế ép thực hành: học nhóm có kiểm tra chéo, đưa bố mẹ xem ngân sách mỗi tuần, làm đề có bấm giờ mỗi Chủ nhật. Kĩ năng chỉ thành của mình khi đã lặp lại đủ nhiều.' },
      { q: 'Hãy giúp Thu chọn mục tiêu trọng tâm học kì 2, biết: Thu thi vào 10 với môn Anh đang 6,0 (cần 7,0), mã RIASEC nhóm S, hay bị cuốn vào điện thoại buổi tối.', a: 'Mục tiêu học tập: "Đạt 7,0 đề thi thử tiếng Anh vào cuối tháng 4, bằng cách học từ vựng 15 phút/ngày theo lặp lại ngắt quãng và 2 đề/tuần" — kèm giải pháp gốc: điện thoại để ngoài phòng trong khối học tối. Mục tiêu kĩ năng (hợp nhóm S): "Duy trì kèm một em lớp 6 học yếu mỗi tuần 1 buổi đến hết tháng 4" — vừa giúp người vừa nuôi hồ sơ hướng nghiệp.' },
      { q: 'Vẽ sơ đồ kết nối cuối kì, Lộc không thấy các tuần liên quan gì nhau, học tuần nào quên tuần đó. Hãy chỉ cho Lộc vài "sợi chỉ" nối các tuần để kiến thức bền hơn.', a: 'Gợi vài kết nối cụ thể để Lộc thấy mọi tuần là một mạng lưới: SWOT (t1) cung cấp dữ liệu "điểm mạnh - điểm yếu" cho kiềng ba chân chọn nghề (t10); mục tiêu SMART (t2) là khung dùng lại cho lộ trình thi (t5), kế hoạch tiết kiệm tiền (t17) và kế hoạch tình nguyện (t13); kĩ thuật thở (t7) dùng cả trong phòng thi lẫn khi căng thẳng cảm xúc tuổi dậy thì (t11); học chủ động (t4) chính là cách ôn lại cả môn HĐTN này. Khi nhìn ra dây nối, học một tuần là củng cố nhiều tuần — đó là lí do kiến thức kết nối bền hơn kiến thức rời rạc.' },
    ]
  ),

  'S9HDTN-w19-quiz': L(
    'Phòng chống tệ nạn — Ma tuý',
    'Mở đầu học kì 2 bằng chủ đề nghiêm túc: ma tuý. Mục tiêu của bài không phải làm các em sợ hãi, mà trang bị hiểu biết khoa học và kĩ năng từ chối để tự bảo vệ mình và bạn bè.',
    ['Hiểu tác hại của ma tuý đối với sức khoẻ, học tập và tương lai.', 'Nhận diện các "vỏ bọc" và thủ đoạn dụ dỗ phổ biến.', 'Thực hành được kĩ năng từ chối kiên quyết.', 'Biết cách báo tin và tìm trợ giúp đúng kênh.'],
    [
      { h: 'Ma tuý là gì và vì sao nguy hiểm?' },
      { p: 'Ma tuý là các chất gây nghiện tác động lên hệ thần kinh, làm thay đổi tâm trạng và nhận thức. Điểm nguy hiểm cốt lõi là cơ chế GÂY NGHIỆN: chất ma tuý chiếm đoạt hệ thống tưởng thưởng của não, khiến người dùng mất dần khả năng tự kiểm soát — không phải vì họ "yếu đuối" mà vì não bộ đã bị thay đổi. Não tuổi vị thành niên đang phát triển nên bị tổn thương nhanh và nặng hơn người lớn.' },
      { h: 'Hậu quả nhiều tầng' },
      { ul: ['Sức khoẻ: tổn thương não, tim mạch, loạn thần; nguy cơ sốc thuốc đe doạ tính mạng.', 'Học tập: suy giảm trí nhớ và khả năng tập trung, bỏ bê rồi bỏ học.', 'Gia đình — xã hội: mất lòng tin, khánh kiệt kinh tế, bị lôi kéo vào phạm pháp để có tiền dùng chất.', 'Pháp luật: mọi hành vi mua bán, tàng trữ, tổ chức sử dụng trái phép chất ma tuý đều bị xử lí nghiêm khắc.'] },
      { h: 'Những "vỏ bọc" cần cảnh giác' },
      { p: 'Ma tuý hiện đại hiếm khi xuất hiện với hình dạng dễ nhận biết. Nó nguỵ trang trong những thứ trông vô hại: "kẹo lạ", "tem giấy", nước vui, đồ uống pha sẵn không rõ nguồn gốc, thuốc lá điện tử trộn chất cấm. Nguyên tắc an toàn: không nhận đồ ăn, thức uống, thuốc hút từ người lạ hoặc nguồn không rõ ràng — kể cả khi người đưa là "bạn của bạn".' },
      { h: 'Thủ đoạn dụ dỗ phổ biến' },
      { ul: ['Cho dùng thử miễn phí, nói dối "không gây nghiện, thử một lần cho biết".', 'Khích tướng: "sợ à?", "trẻ con thế!", "cả nhóm chơi mà".', 'Gài bẫy qua nợ nần: cho vay tiền, bao ăn chơi rồi ép "trả nợ" bằng việc dùng hoặc vận chuyển.', 'Lợi dụng lúc buồn chán, cô đơn: "cái này giúp quên buồn ngay".'] },
      { h: 'Kĩ năng từ chối — nói KHÔNG và rời đi' },
      { p: 'Công thức 3 bước: (1) Nói KHÔNG rõ ràng, dứt khoát, mắt nhìn thẳng — không cần gay gắt nhưng không lưỡng lự; (2) Đưa lí do ngắn hoặc đổi chủ đề — "mình không dùng, mình phải về có việc"; (3) RỜI KHỎI nơi đó ngay. Nếu bị ép buộc hay đe doạ, ưu tiên thoát thân an toàn rồi báo ngay cho người lớn. Tránh xa các buổi tụ tập không rõ mục đích, nơi vắng người với nhóm lạ.' },
      { h: 'Báo tin và trợ giúp' },
      { ul: ['Kể ngay với bố mẹ, thầy cô khi bị dụ dỗ hoặc thấy hiện tượng đáng ngờ quanh trường — em được pháp luật bảo vệ khi tố giác.', 'Gọi 113 (công an) khi thấy hành vi mua bán; Tổng đài 111 để được tư vấn, hỗ trợ.', 'Nếu nghi ngờ bạn mình đã dùng: không kì thị, không tự xử lí — báo cho gia đình bạn và nhà trường để bạn được giúp đỡ chuyên môn sớm. Can thiệp sớm cứu được cả tương lai.'] },
      { note: 'Không có "thử một lần cho biết" với ma tuý — vì quyết định lần thứ hai không còn hoàn toàn thuộc về em nữa. Phòng tuyến vững nhất là từ chối ngay từ lần đầu.' },
    ],
    [
      { q: 'Ở một buổi sinh nhật, có anh khoá trên đưa cho Phát một loại "kẹo" lạ, bảo "hàng vui, cả hội dùng rồi, mỗi mình em chưa". Phát nên xử lí thế nào?', a: 'Áp dụng 3 bước: nói "không, em không dùng" dứt khoát; kiếm lí do rời đi ngay ("em phải nghe điện thoại", "em về trước đây") — không cầm thử, không chụp ảnh tò mò; ra khỏi đó và kể lại cho bố mẹ. Việc "cả hội dùng rồi" càng là tín hiệu phải rời đi nhanh và báo người lớn, vì các bạn khác cũng đang gặp nguy hiểm.' },
      { q: 'Một bạn nói với Cường: "Thuốc lá điện tử khác ma tuý, hút cho sành điệu thôi, không nghiện đâu, thử một hơi đi." Cường nên hiểu và đáp lại thế nào?', a: 'Lập luận của bạn sai ở nhiều điểm. Thuốc lá điện tử không hề "vô hại": nó chứa nicotine gây nghiện, và nguy hiểm hơn — nhiều loại bị trộn chất ma tuý tổng hợp, là một trong những "vỏ bọc" phổ biến để dụ học sinh dùng chất cấm mà không biết. "Thử một hơi" chính là cái bẫy "thử một lần cho biết", vì sau lần đầu quyết định không còn hoàn toàn thuộc về mình. Cường áp công thức từ chối 3 bước: nói "không, mình không hút" dứt khoát, mắt nhìn thẳng → "mình phải đi có việc" → rời khỏi đó. "Sành điệu" hay "trẻ con" chỉ là chiêu khích tướng; bản lĩnh thật là dám từ chối, không phải dám thử.' },
      { q: 'Hoà phát hiện bạn thân gần đây hay xin tiền, người lúc lờ đờ lúc kích động, và từng thấy bạn cầm "tem giấy" lạ. Hoà sợ mất tình bạn nếu nói ra. Em khuyên Hoà thế nào?', a: 'Im lặng mới là mất bạn thật sự — vì nghiện càng lâu càng khó cứu. Hoà nên: nói chuyện riêng với bạn bằng sự quan tâm, không phán xét; và dù bạn thừa nhận hay không, PHẢI báo cho người lớn tin cậy (bố mẹ bạn, giáo viên chủ nhiệm) — đây là chuyện vượt quá khả năng xử lí của học sinh. Báo tin để bạn được giúp đỡ y tế và tâm lý kịp thời là hành động của một người bạn đúng nghĩa.' },
    ]
  ),

  'S9HDTN-w20-quiz': L(
    'Phòng chống tệ nạn — Cờ bạc và các cạm bẫy khác',
    'Tiếp tục mạch phòng chống tệ nạn: tuần này là cờ bạc — đặc biệt là cờ bạc trá hình trên mạng đang nhắm thẳng vào lứa tuổi học sinh — cùng cảnh giác chung với các cạm bẫy xâm hại.',
    ['Hiểu cơ chế gây nghiện của cờ bạc và tác hại của nó.', 'Nhận diện cờ bạc trá hình trong game và trên mạng.', 'Biết nguyên tắc tự bảo vệ trước nguy cơ dụ dỗ, xâm hại.', 'Biết các kênh trợ giúp và báo tin an toàn.'],
    [
      { h: 'Vì sao cờ bạc gây nghiện?' },
      { p: 'Cờ bạc đánh vào một điểm yếu của não người: phần thưởng NGẪU NHIÊN gây hưng phấn mạnh hơn phần thưởng đều đặn. Lúc thắng, não tiết chất tạo khoái cảm khiến ta muốn chơi tiếp; lúc thua, tâm lý "gỡ gạc" trỗi dậy — và càng gỡ càng lún. Người chơi luôn thua về lâu dài vì luật chơi được thiết kế để nhà cái thắng.' },
      { h: 'Tác hại dây chuyền' },
      { ul: ['Tiền bạc: từ tiền tiêu vặt đến trộm tiền nhà, vay nặng lãi — nhiều vụ học sinh bỏ nhà, bị đe doạ đòi nợ bắt đầu từ vài ván "vui vui".', 'Học tập và tâm lý: đầu óc chỉ nghĩ đến gỡ thua, lo âu, dối trá với gia đình.', 'Pháp luật: đánh bạc và tổ chức đánh bạc là hành vi bị pháp luật nghiêm cấm.'] },
      { h: 'Cờ bạc trá hình quanh học sinh' },
      { ul: ['Game có yếu tố may rủi nạp tiền: quay thưởng, mở hộp ngẫu nhiên (loot box) — cơ chế tâm lý giống hệt máy đánh bạc.', 'Cá cược bóng đá qua mạng, lô đề núp bóng "ghi số giùm".', 'App "dự đoán nhận thưởng", web "tài xỉu" quảng cáo tràn mạng xã hội với mồi "nạp ít thắng nhiều".', 'Bài bạc ăn tiền trong các dịp tụ tập, lễ Tết — "chơi nhỏ cho vui" là cánh cửa khởi đầu.'] },
      { h: 'Kĩ năng tự bảo vệ' },
      { p: 'Quy tắc 3 KHÔNG: KHÔNG chơi bất kì trò may rủi nào có ăn tiền dù nhỏ; KHÔNG nạp tiền vào game/app có yếu tố cờ bạc; KHÔNG vay tiền hoặc cầm đồ giúp ai để chơi. Khi bị rủ rê, dùng kĩ năng từ chối 3 bước đã học ở tuần 19. Nếu lỡ dính vào và bị đòi nợ, đe doạ: kể NGAY với bố mẹ — giấu giếm chỉ làm khoản nợ và nguy hiểm phình to.' },
      { h: 'Cảnh giác cạm bẫy dụ dỗ, xâm hại' },
      { p: 'Cùng nhóm tệ nạn xã hội còn có các đường dây dụ dỗ, lừa gạt người chưa thành niên vào hoạt động bị pháp luật nghiêm cấm. Dấu hiệu cảnh giác: người quen qua mạng tặng quà đắt tiền không lí do, hứa hẹn "việc nhẹ thu nhập cao" kèm yêu cầu giữ bí mật với gia đình, rủ đi gặp riêng ở nơi kín đáo, xin ảnh riêng tư. Nguyên tắc: cơ thể em là của em — không ai có quyền động chạm hay đòi hỏi hình ảnh riêng tư; mọi yêu cầu "giữ bí mật với bố mẹ" từ người lớn đều là cờ đỏ.' },
      { h: 'Kênh trợ giúp' },
      { ul: ['Tổng đài quốc gia bảo vệ trẻ em 111 — miễn phí, bảo mật, 24/7.', 'Công an 113 khi có nguy hiểm trực tiếp.', 'Bố mẹ, thầy cô, cán bộ tư vấn học đường — người lớn tin cậy luôn là phòng tuyến đầu tiên.', 'Nếu bạn em là nạn nhân: động viên bạn lên tiếng và cùng bạn báo người lớn; nạn nhân không bao giờ là người có lỗi.'] },
      { note: 'Nhà cái không bao giờ thua — nếu trò chơi có người thắng tiền dễ dàng đến vậy, người ta đã không phải bỏ tiền quảng cáo mời em chơi.' },
    ],
    [
      { q: 'Game Đức chơi ra mắt "vòng quay siêu phẩm": nạp 50 nghìn được quay, 1% trúng trang phục hiếm trị giá tiền triệu. Đức đã nạp 4 lần chưa trúng và định nạp tiếp "vì sắp trúng rồi". Hãy phân tích giúp Đức.', a: 'Đức đang rơi vào hai bẫy tâm lý của cờ bạc: phần thưởng ngẫu nhiên gây nghiện và nguỵ biện "sắp trúng" (xác suất mỗi lần quay vẫn là 1%, không hề tăng vì đã thua 4 lần). Tính toán: kì vọng để trúng là khoảng 100 lần quay = 5 triệu đồng cho một vật phẩm ảo. Đức nên dừng ngay, xoá thẻ thanh toán khỏi tài khoản, áp quy tắc đợi 48 giờ với mọi lần định nạp.' },
      { q: 'Dịp Tết, nhóm bạn rủ Toàn đánh bài ăn tiền "10 nghìn một ván cho vui thôi". Toàn từ chối thì bị trêu "keo thế". Toàn nên ứng xử thế nào?', a: 'Giữ vững 3 KHÔNG: cười xoà nhưng dứt khoát — "tớ không chơi bài ăn tiền, ai chơi vui không ăn tiền thì tớ tham gia" — rồi chuyển hoạt động khác hoặc rời đi. Lời trêu "keo" chỉ là khích tướng; đáp ứng nó bằng tiền của mình là cái giá quá đắt cho vài giây sĩ diện. Nếu nhóm vẫn duy trì sới bạc, Toàn nên kể với người lớn vì các bạn đang trượt vào thói quen nguy hiểm.' },
      { q: 'Một "anh" quen qua mạng nhắn tin với Hà (lớp 9), tặng thẻ game đắt tiền, khen Hà xinh, rủ đi gặp riêng ở quán cà phê và dặn "đừng nói với bố mẹ kẻo bị cấm". Hà nên nhận diện và xử lí thế nào?', a: 'Đây là chuỗi dấu hiệu cảnh báo điển hình của dụ dỗ, xâm hại: người lạ qua mạng tặng quà đắt tiền không lí do, khen ngợi tạo thiện cảm, rủ gặp riêng nơi kín và đặc biệt là yêu cầu "giữ bí mật với bố mẹ" — mọi yêu cầu giấu gia đình từ người lớn đều là cờ đỏ. Hà phải: KHÔNG đi gặp, KHÔNG nhận thêm quà, lưu lại bằng chứng (ảnh chụp tin nhắn), chặn tài khoản, và kể NGAY với bố mẹ hoặc thầy cô. Nếu thấy nguy hiểm có thể gọi 111. Nguyên tắc nằm lòng: cơ thể em là của em, không ai có quyền đòi hỏi hình ảnh riêng tư hay đụng chạm; và người lớn tin cậy luôn là phòng tuyến đầu tiên.' },
    ]
  ),

  'S9HDTN-w21-quiz': L(
    'Phòng chống bạo lực học đường',
    'Bạo lực học đường không chỉ là đánh nhau — nó gồm cả lời nói làm tổn thương, sự cô lập và bắt nạt trên mạng. Tuần này: nhận diện, ứng phó và cùng nhau xây trường học an toàn.',
    ['Nhận diện các hình thức bạo lực học đường, gồm cả bắt nạt trực tuyến.', 'Biết cách ứng phó an toàn khi là nạn nhân hoặc người chứng kiến.', 'Hiểu vai trò của "người đứng ngoài" trong việc chấm dứt bắt nạt.', 'Biết các kênh báo cáo và trợ giúp.'],
    [
      { h: 'Bạo lực học đường có những dạng nào?' },
      { ul: ['Thể chất: đánh, xô đẩy, trấn lột đồ, ép làm việc không muốn.', 'Lời nói: chửi mắng, đặt biệt danh xúc phạm, chế giễu ngoại hình, hoàn cảnh gia đình.', 'Quan hệ xã hội: cô lập, tẩy chay, tung tin đồn để mọi người xa lánh.', 'Trực tuyến (cyberbullying): nhắn tin đe doạ, lập nhóm nói xấu, đăng ảnh chế giễu, kêu gọi "tấn công" trang cá nhân — dạng này theo nạn nhân về tận nhà, 24/7.'] },
      { h: 'Phân biệt trêu đùa và bắt nạt' },
      { p: 'Trêu đùa: hai bên cùng vui, dừng ngay khi một bên khó chịu. Bắt nạt: lặp lại nhiều lần, có chủ ý làm tổn thương, và có sự chênh lệch sức mạnh (đông hiếp yếu, lớn hiếp nhỏ). Câu kiểm tra đơn giản: nếu người kia đã tỏ ra khó chịu mà vẫn tiếp tục — đó không còn là đùa.' },
      { h: 'Nếu em là nạn nhân' },
      { ul: ['An toàn trước hết: tránh đối đầu khi lực lượng chênh lệch, tìm chỗ đông người, hô to gây chú ý nếu bị tấn công.', 'KHÔNG im lặng chịu đựng: kể với bố mẹ, thầy cô — báo cáo không phải "mách lẻo", đó là quyền được bảo vệ của em.', 'Lưu bằng chứng: ảnh chụp tin nhắn, vết thương, ghi lại thời gian địa điểm, người chứng kiến.', 'Với bắt nạt mạng: không trả đũa, chặn tài khoản, lưu bằng chứng rồi báo người lớn và báo cáo nền tảng.'] },
      { h: 'Nếu em là người chứng kiến — sức mạnh của số đông' },
      { p: 'Nghiên cứu cho thấy bắt nạt thường dừng rất nhanh khi có người đứng ra can thiệp. Người chứng kiến im lặng vô tình tiếp sức cho kẻ bắt nạt; người chứng kiến lên tiếng là người thay đổi cục diện. Em có thể: nói "thôi, đủ rồi" nếu an toàn; kéo nạn nhân đi chỗ khác; KHÔNG quay phim cổ vũ; báo ngay giáo viên; và sau đó chủ động bắt chuyện, ngồi cùng nạn nhân — sự đồng hành làm vết thương lành nhanh hơn.' },
      { h: 'Vì sao không nên trả thù bằng bạo lực?' },
      { p: 'Đánh trả khi đang an toàn để "dạy cho nó một bài học" biến em từ nạn nhân thành người vi phạm, leo thang vòng xoáy bạo lực và có thể gây hậu quả pháp lí. Tự vệ chính đáng chỉ là hành động cần thiết để thoát thân khi bị tấn công — khác hoàn toàn với trả thù có chuẩn bị.' },
      { h: 'Cùng xây lớp học an toàn' },
      { ul: ['Thống nhất quy tắc lớp: không biệt danh xúc phạm, không tẩy chay, mâu thuẫn đưa ra hoà giải.', 'Lập "đôi bạn đồng hành" để không ai bị lẻ loi.', 'Báo tin kín qua giáo viên chủ nhiệm hoặc hộp thư của trường khi thấy dấu hiệu bắt nạt.', 'Tổng đài 111 hỗ trợ tư vấn mọi vấn đề bảo vệ trẻ em, kể cả bắt nạt.'] },
      { note: 'Trường học an toàn không phải nơi không có mâu thuẫn — mà là nơi mâu thuẫn được giải quyết bằng lời nói, và không ai phải sợ hãi khi đến lớp.' },
    ],
    [
      { q: 'Một nhóm bạn lập nhóm chat đăng ảnh chế giễu ngoại hình của Yến kèm những bình luận ác ý; Yến biết được và suy sụp, không muốn đi học. Nếu là bạn của Yến, em làm gì?', a: 'Ba việc song song: (1) Ở bên Yến — nhắn tin, ngồi cùng, khẳng định "cậu không có lỗi, bọn họ sai"; (2) Giúp Yến lưu bằng chứng (chụp màn hình tin nhắn, ảnh) — không chia sẻ tiếp; (3) Cùng Yến báo giáo viên chủ nhiệm và khuyên Yến kể với bố mẹ. Nếu Yến có dấu hiệu suy sụp nặng (như ở tuần 11), báo thêm cán bộ tư vấn học đường. Tuyệt đối không vào nhóm chửi lại — leo thang chỉ làm Yến bị tổn thương thêm.' },
      { q: 'Long bị một anh lớp trên chặn đường "xin" tiền hai lần. Anh ta doạ "mách thầy cô thì biết tay". Long sợ và định im lặng đưa tiền tiếp. Hãy phân tích và đưa lời khuyên.', a: 'Im lặng nộp tiền là chiến lược thua: trấn lột sẽ lặp lại và leo thang vì kẻ bắt nạt thấy "có tác dụng". Lời doạ chính là bằng chứng hắn sợ bị báo cáo. Long nên: tránh đi một mình đoạn đường đó, đi cùng nhóm bạn; kể NGAY với bố mẹ và giáo viên chủ nhiệm kèm mô tả thời gian, địa điểm, đặc điểm; nhà trường và gia đình có biện pháp xử lí kín đáo, an toàn. Trấn lột là hành vi vi phạm pháp luật, không phải "chuyện trẻ con".' },
      { q: 'Bị một bạn liên tục đặt biệt danh xúc phạm trước cả lớp suốt hai tuần, Đức ức quá định đợi tan học đánh cho bạn đó "một trận cho chừa". Hãy phân tích lựa chọn này và đưa cách ứng phó đúng.', a: 'Việc bạn kia làm là bắt nạt bằng lời nói (lặp lại, có chủ ý làm tổn thương). Nhưng đánh trả khi đang an toàn không phải tự vệ chính đáng — nó biến Đức từ nạn nhân thành người vi phạm, leo thang vòng xoáy bạo lực và có thể gây hậu quả pháp lí, kỉ luật. Cách ứng phó đúng: không đáp trả bằng bạo lực; lưu lại bằng chứng và nhân chứng các lần bị xúc phạm; báo giáo viên chủ nhiệm và bố mẹ để nhà trường xử lí kẻ bắt nạt. Tự vệ chính đáng chỉ là hành động cần thiết để thoát thân khi đang bị tấn công, hoàn toàn khác với trả thù có chuẩn bị. Để người lớn và quy tắc nhà trường giải quyết mới là cách chấm dứt bắt nạt mà không tự đẩy mình vào thế sai.' },
    ]
  ),

  'S9HDTN-w22-quiz': L(
    'Tình bạn — Tình yêu tuổi học trò',
    'Rung động đầu đời là điều tự nhiên và đẹp đẽ của tuổi mới lớn. Tuần này chúng ta nói chuyện thẳng thắn, khoa học về tình bạn, tình bạn khác giới và cách ứng xử có trách nhiệm với cảm xúc của mình.',
    ['Hiểu giá trị của tình bạn đẹp và cách nuôi dưỡng nó.', 'Nhìn nhận rung động tuổi học trò một cách tự nhiên, không hoảng sợ hay vội vàng.', 'Biết các nguyên tắc ứng xử đúng mực, tôn trọng trong quan hệ khác giới.', 'Biết giữ an toàn và tìm lời khuyên từ người lớn tin cậy.'],
    [
      { h: 'Tình bạn — tài sản quý của tuổi học trò' },
      { p: 'Một tình bạn đẹp xây trên ba trụ: chân thành (nói thật, không lợi dụng), tôn trọng (chấp nhận khác biệt, giữ bí mật riêng tư của nhau) và cùng tiến bộ (kéo nhau lên, không kéo nhau xuống). Bạn tốt không phải người luôn khen em, mà là người dám góp ý khi em sai và ở lại khi em khó khăn.' },
      { h: 'Rung động đầu đời — bình thường và tự nhiên' },
      { p: 'Ở tuổi dậy thì, sự thay đổi nội tiết tố khiến việc để ý, rung động trước một bạn khác là hiện tượng tâm sinh lí hoàn toàn bình thường — không phải "hư hỏng" và cũng không cần hoảng hốt. Điều quan trọng không phải là cảm xúc xuất hiện, mà là em ứng xử với nó như thế nào.' },
      { h: 'Phân biệt thích, ngưỡng mộ và yêu' },
      { ul: ['Ngưỡng mộ: ấn tượng với điểm giỏi, điểm đẹp của bạn — thường gặp và thoáng qua.', 'Thích: muốn gần gũi, trò chuyện, vui khi gặp — cảm xúc thật nhưng chưa phải tình yêu.', 'Tình yêu thực sự cần thêm: hiểu biết sâu về nhau, trách nhiệm và sự trưởng thành — những thứ cần thời gian và độ chín mà tuổi 15 mới bắt đầu xây dựng.'] },
      { h: 'Ứng xử có trách nhiệm với cảm xúc' },
      { ul: ['Giữ ưu tiên: năm lớp 9 có kì thi quan trọng — một mối quan hệ lành mạnh không kéo điểm số của cả hai đi xuống.', 'Tôn trọng: khi bạn từ chối, chấp nhận lịch sự; đeo bám, nhắn tin dồn dập, doạ dẫm là quấy rối, không phải lãng mạn.', 'Giữ ranh giới cơ thể: tuổi vị thành niên cần nói không với những đụng chạm vượt giới hạn; sự tôn trọng cơ thể là thước đo đầu tiên của sự tôn trọng con người.', 'Cảnh giác trên mạng: không gửi ảnh riêng tư cho BẤT KÌ ai dù tin tưởng đến đâu — ảnh đã gửi là vĩnh viễn mất quyền kiểm soát.'] },
      { h: 'Khi tình cảm không được đáp lại hoặc tan vỡ' },
      { p: 'Buồn là phản ứng lành mạnh — hãy cho mình thời gian, tâm sự với bạn thân hoặc người lớn tin cậy, dồn năng lượng vào học tập, thể thao, sở thích. Đừng làm những việc khiến mình hối hận: nói xấu, trả thù, bêu riếu trên mạng. Cách một người ứng xử khi bị từ chối nói lên nhân cách của người đó.' },
      { h: 'Người lớn là đồng minh, không phải "toà án"' },
      { p: 'Nhiều bạn giấu bố mẹ chuyện tình cảm vì sợ mắng — nhưng giấu giếm khiến em đơn độc khi gặp tình huống khó (bị đeo bám, bị đe doạ bằng ảnh, bị rủ rê vượt giới hạn). Hãy chọn ít nhất một người lớn tin cậy để có thể hỏi ý kiến; người từng đi qua tuổi này có nhiều kinh nghiệm hơn em nghĩ.' },
      { note: 'Mối quan hệ lành mạnh có dấu hiệu nhận biết giản dị: ở cạnh người đó, em thấy mình TỐT LÊN — học khá hơn, vui vẻ hơn, tự tin hơn. Nếu thấy mình tệ đi, lo âu và lén lút — đó là tín hiệu cần dừng lại.' },
    ],
    [
      { q: 'Nga và Hải cùng lớp 9 quý mến nhau; từ ngày "thân nhau hơn", cả hai hay nhắn tin đến khuya, điểm thi thử cùng tụt. Hai bạn nên làm gì để không phải chọn giữa tình cảm và kì thi?', a: 'Đặt quy ước cùng nhau: biến tình cảm thành động lực thay vì lực cản — không nhắn tin sau 21h30, biến giờ học thành "mục tiêu chung" (cùng học nhóm có kết quả đo được, khoe điểm tiến bộ thay vì khoe tin nhắn), hẹn rõ: cả hai cùng đỗ nguyện vọng thì mối quan hệ này mới có nền để đi tiếp. Một mối quan hệ tốt phải làm cả hai tốt lên — đó là phép thử thật nhất.' },
      { q: 'Một bạn nam liên tục nhắn tin tỏ tình với Thuý; Thuý đã từ chối lịch sự nhưng bạn vẫn nhắn dồn dập và doạ "sẽ làm ầm lên ở lớp". Thuý nên làm gì?', a: 'Hành vi đã chuyển từ tỏ tình sang quấy rối và đe doạ. Thuý nên: trả lời MỘT lần cuối rõ ràng "mình đã từ chối, đề nghị bạn dừng nhắn tin"; lưu toàn bộ bằng chứng tin nhắn; không đôi co thêm; kể với bố mẹ và giáo viên chủ nhiệm để người lớn can thiệp sớm trước khi sự việc leo thang. Từ chối là quyền của Thuý và không ai được trừng phạt người khác vì bị từ chối.' },
      { q: 'Người Trang thích nhắn: "Nếu thật lòng yêu thì gửi cho anh một tấm ảnh riêng tư, coi như bằng chứng tin nhau." Trang phân vân. Em khuyên Trang thế nào?', a: 'Dứt khoát KHÔNG gửi, và đây là một cờ đỏ rõ ràng về mối quan hệ. Lí do: ảnh đã gửi đi là vĩnh viễn mất quyền kiểm soát — có thể bị phát tán, dùng để đe doạ, tống tiền dù người nhận hứa gì đi nữa. Quan trọng hơn, tình cảm lành mạnh được xây trên tôn trọng, không phải trên "thử thách lòng tin" hay ép buộc; người thật sự quý Trang sẽ không bao giờ đặt em vào tình thế nguy hiểm để "chứng minh". Trang nên từ chối thẳng, và nếu bị nài ép hay doạ dẫm thì lưu bằng chứng và kể với người lớn tin cậy. Nhớ nguyên tắc: ở cạnh người khiến mình thấy LO ÂU, lén lút, bị ép — đó là tín hiệu cần dừng lại.' },
    ]
  ),

  'S9HDTN-w23-quiz': L(
    'Giao tiếp hiệu quả',
    'Cùng một nội dung, người nói khéo được lắng nghe, người nói vụng gây hiểu lầm. Tuần này các em học bộ kĩ năng giao tiếp cốt lõi: lắng nghe chủ động, nói rõ ý và phản hồi văn minh.',
    ['Thực hành được kĩ năng lắng nghe chủ động.', 'Diễn đạt ý kiến rõ ràng, tự tin bằng thông điệp "tôi".', 'Biết cách góp ý và tiếp nhận góp ý văn minh.', 'Ứng xử đúng mực trong giao tiếp trực tuyến.'],
    [
      { h: 'Giao tiếp là kĩ năng, không phải năng khiếu' },
      { p: 'Nhiều bạn nghĩ "mình vụng nói là do trời sinh". Sai — giao tiếp là tập hợp kĩ năng rèn được: nghe, nói, hỏi, phản hồi. Người giao tiếp giỏi nhất em từng gặp cũng từng vụng về và đã luyện tập rất nhiều.' },
      { h: 'Lắng nghe chủ động — một nửa của giao tiếp' },
      { ul: ['Hướng người về phía người nói, mắt nhìn, gật đầu — cất điện thoại đi.', 'Không cắt lời; nghe HẾT rồi mới đáp — đa số hiểu lầm sinh ra từ việc nghe nửa câu.', 'Hỏi lại để xác nhận: "Ý cậu là... đúng không?" — vừa tránh hiểu sai vừa cho người nói cảm giác được tôn trọng.', 'Nghe cả cảm xúc sau lời nói: bạn nói "tớ ổn" với giọng trĩu xuống thường nghĩa là không ổn.'] },
      { h: 'Thông điệp "tôi" — nói thẳng mà không gây chiến' },
      { p: 'So sánh: "Cậu LÚC NÀO cũng trễ hẹn, vô trách nhiệm!" (thông điệp "bạn" — chỉ trích con người, gây phòng thủ) với "Tớ đã đợi 30 phút và thấy khó chịu vì sợ lỡ việc nhóm. Lần sau cậu báo trước giúp tớ nhé" (thông điệp "tôi" — nói về sự việc + cảm xúc của mình + đề nghị cụ thể). Công thức: Khi [sự việc cụ thể], tôi cảm thấy [cảm xúc], tôi mong [đề nghị].' },
      { h: 'Nói trước đám đông — cấu trúc 3 phần' },
      { p: 'Phát biểu hay thuyết trình, hãy dựng khung: Mở (nêu thẳng ý chính trong 1 câu) — Thân (2–3 lí lẽ kèm ví dụ) — Kết (chốt lại và kêu gọi/đề xuất). Luyện nói trước gương hoặc quay video tự xem; run là bình thường — hít thở sâu, nhìn vào một vài gương mặt thân thiện trong lớp.' },
      { h: 'Góp ý và nhận góp ý' },
      { ul: ['Khi góp ý: nói riêng thay vì trước đám đông; góp ý vào VIỆC chứ không vào NGƯỜI ("đoạn mở bài chưa rõ ý" thay vì "cậu viết dở"); kèm gợi ý cải thiện.', 'Khi nhận góp ý: nghe hết, không vội thanh minh; cảm ơn người góp ý; lọc lấy phần đúng để sửa — góp ý đúng là món quà dù cách gói đôi khi vụng.'] },
      { h: 'Giao tiếp trực tuyến — dễ gõ, khó rút lại' },
      { ul: ['Tin nhắn không có giọng điệu và nét mặt nên rất dễ bị hiểu lầm — chuyện quan trọng hoặc nhạy cảm hãy nói trực tiếp.', 'Quy tắc 10 giây: trước khi gửi tin nhắn lúc đang nóng giận, dừng 10 giây đọc lại — hoặc lưu nháp để sáng mai quyết.', 'Không nói trên mạng những điều em không dám nói trước mặt người đó.', 'Tôn trọng giờ giấc: tránh nhắn việc không gấp lúc đêm khuya.'] },
      { note: 'Người ta có thể quên điều em nói, nhưng rất lâu mới quên cảm giác em mang lại cho họ. Lắng nghe thật lòng là cách gây thiện cảm mạnh hơn mọi lời hoa mỹ.' },
    ],
    [
      { q: 'Trong buổi học nhóm, Tâm thấy ý tưởng của mình hay nhưng vừa mở miệng đã bị Lộc nói át đi, cả nhóm theo ý Lộc. Tâm ấm ức định bỏ nhóm. Hãy gợi ý cách giao tiếp tốt hơn cho Tâm.', a: 'Tâm nên dùng kĩ năng quyết đoán thay vì rút lui: chờ Lộc nói xong rồi lên tiếng rõ ràng — "Ý của Lộc có điểm hay, tớ muốn bổ sung một phương án nữa để nhóm so sánh" — rồi trình bày theo khung Mở - Thân - Kết kèm lợi ích cụ thể. Nếu vẫn bị át, dùng thông điệp tôi với cả nhóm: "Tớ thấy chưa thoải mái vì ý kiến chưa được nghe hết, mình thống nhất mỗi người 2 phút trình bày nhé." Đề xuất quy tắc làm việc tốt hơn là âm thầm ấm ức.' },
      { q: 'Cô giáo trả bài tập làm văn của Vy với nhận xét "bố cục còn lủng củng, ý thiếu mạch lạc". Vy đọc xong cảm thấy bị chê, dỗi và định không sửa. Theo kĩ năng nhận góp ý, Vy nên phản ứng thế nào?', a: 'Vy đang rơi vào "lọc tiêu cực" — coi góp ý là chê con người mình. Cách nhận góp ý văn minh: nghe/đọc hết, không vội thanh minh hay tự ái; tách lời góp ý (về VIỆC — bố cục bài văn) khỏi giá trị bản thân; cảm ơn người góp ý vì góp ý đúng là món quà giúp mình tiến bộ. Sau đó lọc lấy phần hành động được: cô đã chỉ rõ hai chỗ — bố cục và mạch ý — Vy nên hỏi lại cô cụ thể "đoạn nào con nên tách ý, sắp xếp lại thế nào ạ" rồi viết lại theo khung Mở - Thân - Kết. Người tiến bộ nhanh là người biết biến lời chê thành danh sách việc cần sửa, không phải người né mọi lời chê.' },
      { q: 'Bình nhắn vào nhóm lớp: "đứa nào lấy sách của tao thì trả mau". Cả lớp khó chịu, không khí căng thẳng. Tin nhắn này sai ở đâu và nên viết lại thế nào?', a: 'Sai: buộc tội tập thể khi chưa có bằng chứng ("đứa nào lấy"), xưng hô gây hấn, gửi lúc nóng giận vào kênh chung. Viết lại: "Mình để quên quyển sách Toán ở ngăn bàn sáng nay, bạn nào thấy hoặc cầm nhầm cho mình xin lại với nhé, mình cảm ơn!" — cùng mục đích tìm sách nhưng giữ được quan hệ. Bài học: quy tắc 10 giây và giả định tích cực (cầm nhầm) trước khi buộc tội.' },
    ]
  ),

  'S9HDTN-w24-quiz': L(
    'Tự lập và trách nhiệm với gia đình',
    'Tuổi 15 đứng giữa hai vai: vẫn là con được chăm sóc, nhưng đã đủ lớn để gánh vác một phần việc nhà. Tuần này: tự lập là gì, trách nhiệm gia đình đến đâu, và làm sao để bố mẹ tin tưởng trao quyền nhiều hơn.',
    ['Hiểu đúng khái niệm tự lập — phân biệt với tự cô lập và bướng bỉnh.', 'Xác định được các trách nhiệm phù hợp của bản thân trong gia đình.', 'Biết cách thương lượng với bố mẹ để được trao thêm quyền tự quyết.', 'Trân trọng và thể hiện lòng biết ơn với người thân.'],
    [
      { h: 'Tự lập là gì — và không phải là gì' },
      { p: 'Tự lập là tự làm được những việc thuộc trách nhiệm của mình và tự chịu hậu quả từ lựa chọn của mình. Tự lập KHÔNG phải là: không cần ai (người tự lập vẫn biết nhờ trợ giúp đúng lúc), cãi lời cho ra vẻ người lớn, hay khoá cửa phòng tách khỏi gia đình. Tự lập đi cùng kết nối, không đi cùng cô lập.' },
      { h: 'Bậc thang tự lập của học sinh lớp 9' },
      { ul: ['Tự phục vụ: dậy đúng giờ không cần gọi, tự lo quần áo, góc học tập, bữa sáng đơn giản.', 'Tự quản việc học: tự lập thời gian biểu, tự theo dõi điểm số, chủ động trao đổi với thầy cô.', 'Tự quản tài chính nhỏ: ngân sách tiêu vặt, tiết kiệm có mục tiêu (tuần 17).', 'Gánh vác việc chung: đảm nhận việc nhà cố định, chăm em, hỗ trợ khi nhà có việc.'] },
      { h: 'Trách nhiệm gia đình — không phải "giúp mẹ" mà là phần của mình' },
      { p: 'Cách nghĩ "rửa bát là giúp mẹ" ngầm định việc nhà là của riêng mẹ. Cách nghĩ đúng: gia đình là đội, việc nhà là việc CHUNG, mỗi thành viên gánh một phần theo sức của mình. Ở tuổi 15, một phần việc cố định hằng ngày (nấu cơm hoặc rửa bát, dọn nhà, đổ rác, đón em) là hoàn toàn vừa sức.' },
      { h: 'Muốn thêm quyền? Hãy chứng minh bằng trách nhiệm' },
      { p: 'Quyền và trách nhiệm là hai mặt một đồng xu. Muốn bố mẹ cho đi chơi xa với lớp, hãy cho bố mẹ thấy em quản được giờ giấc hằng ngày. Công thức thương lượng: chủ động nhận việc → làm tốt ổn định 2–4 tuần → đề nghị cụ thể kèm cam kết ("Con xin tự đi xe đạp đến trường, con cam kết đội mũ bảo hiểm, đi đúng tuyến, nhắn tin khi đến nơi") → chấp nhận cơ chế kiểm tra ban đầu. Niềm tin xây bằng chuỗi việc nhỏ giữ đúng lời.' },
      { h: 'Khi bất đồng với bố mẹ' },
      { ul: ['Chọn thời điểm: nói lúc cả hai bình tĩnh, không nói khi đang căng.', 'Dùng thông điệp tôi (tuần 23): "Con cảm thấy... con mong..." thay vì "Bố mẹ chẳng bao giờ...".', 'Lắng nghe lí do của bố mẹ — sau những lệnh cấm thường là nỗi lo có thật; giải toả nỗi lo dễ hơn chống lại mệnh lệnh.', 'Chấp nhận có việc chưa thương lượng được — tự lập cũng gồm việc tôn trọng quyết định của người nuôi dưỡng mình.'] },
      { h: 'Lòng biết ơn — chất keo của gia đình' },
      { p: 'Đừng để mọi sự quan tâm của bố mẹ thành "mặc định". Lời cảm ơn, bữa cơm em nấu, tấm thiệp ngày sinh nhật, hay đơn giản là kể chuyện trường lớp mỗi tối — những điều nhỏ ấy nuôi không khí gia đình tốt hơn mọi món quà đắt tiền. Gia đình hoà thuận cũng chính là hậu phương vững nhất cho kì thi sắp tới của em.' },
      { note: 'Thước đo tự lập không phải "mình làm gì khi không ai bắt" mà là "mình có làm đều đặn cả khi không ai khen". Việc nhỏ, giữ lời, lặp lại — đó là cách người ta trưởng thành.' },
    ],
    [
      { q: 'Hân muốn bố mẹ cho dùng điện thoại riêng và tự quản giờ học, nhưng bố mẹ từ chối vì "con còn ham chơi". Hân nên làm gì thay vì giận dỗi?', a: 'Áp dụng công thức quyền đi đôi trách nhiệm: bước 1 — tự hỏi lí do bố mẹ lo có thật không (đã từng trễ học, quên việc?); bước 2 — chứng minh ngược lại bằng hành động 3–4 tuần: tự dậy đúng giờ, hoàn thành bài trước giờ chơi, nhận một việc nhà cố định; bước 3 — đề nghị có cơ chế: "Con xin dùng điện thoại với quy ước không dùng sau 21h30 và bố mẹ kiểm tra tháng đầu." Đề nghị kèm cam kết kiểm chứng được luôn thuyết phục hơn nài nỉ.' },
      { q: 'Nhà có em nhỏ 3 tuổi; mẹ Dương đi làm về muộn, bố công tác xa. Dương (lớp 9) cho rằng việc của mình chỉ là học, chuyện nhà là của mẹ. Em nghĩ gì về quan điểm này?', a: 'Quan điểm này biến Dương thành "khách trọ" trong chính nhà mình. Gia đình là một đội: mẹ đang gánh quá tải, và Dương ở tuổi 15 thừa sức chia lửa — đón em, tắm cho em, cắm cơm, dọn dẹp — mà vẫn đủ giờ học nếu dùng time-block. Hơn nữa, chính những việc đó rèn các kĩ năng sống (tuần 15–16) và tinh thần trách nhiệm mà không lớp học thêm nào dạy được. Học giỏi không miễn trừ trách nhiệm làm người trong gia đình.' },
      { q: 'Mỗi lần rửa bát hay quét nhà, Khoa đều nói "con giúp mẹ việc này nhé" và thấy mình đã rất "ngoan". Theo cách nghĩ đúng về trách nhiệm gia đình ở bài này, cách nhìn của Khoa cần điều chỉnh ra sao?', a: 'Chữ "giúp mẹ" tuy dễ thương nhưng ngầm định việc nhà là của riêng mẹ, còn Khoa chỉ "ra tay hỗ trợ" khi thích. Cách nghĩ đúng: gia đình là một đội, việc nhà là việc CHUNG, mỗi người gánh một phần theo sức mình — nên ở tuổi 15, một phần việc cố định hằng ngày (rửa bát, quét nhà, đổ rác...) là PHẦN của Khoa, không phải ân huệ ban cho mẹ. Điều chỉnh: chủ động nhận một đầu việc cố định và làm đều cả khi không ai nhắc, không cần "kể công". Đó cũng là cách chứng minh trách nhiệm để được bố mẹ trao thêm quyền tự quyết (quyền đi đôi trách nhiệm).' },
    ]
  ),

  'S9HDTN-w25-quiz': L(
    'Tham gia hoạt động cộng đồng',
    'Từ tình nguyện nhỏ lẻ (tuần 13), tuần này chúng ta nâng tầm: hiểu cộng đồng quanh mình, biết cách tham gia có tổ chức và thậm chí tự khởi xướng một dự án nhỏ phục vụ cộng đồng.',
    ['Hiểu khái niệm cộng đồng và trách nhiệm công dân của học sinh.', 'Biết các loại hình hoạt động cộng đồng tại địa phương.', 'Thiết kế được một dự án cộng đồng nhỏ theo quy trình.', 'Rèn kĩ năng làm việc nhóm và vận động người tham gia.'],
    [
      { h: 'Cộng đồng của em là ai?' },
      { p: 'Cộng đồng là những nhóm người gắn bó với em theo từng vòng: lớp — trường — tổ dân phố/thôn xóm — phường xã — và rộng hơn. Mỗi vòng đều có vấn đề riêng (rác thải, an toàn giao thông cổng trường, người già neo đơn, trẻ em thiếu chỗ chơi) và đều cần những bàn tay góp sức — kể cả bàn tay học sinh.' },
      { h: 'Vì sao học sinh nên tham gia?' },
      { ul: ['Với cộng đồng: nhiều việc vừa tầm học sinh lại thiết thực — dạy ông bà dùng điện thoại, hướng dẫn phân loại rác, làm bản tin măng non.', 'Với bản thân: rèn kĩ năng tổ chức, giao tiếp, giải quyết vấn đề thật — những thứ không có trong đề thi nhưng quyết định thành công sau này.', 'Với hồ sơ tương lai: trải nghiệm cộng đồng là điểm cộng trong học bạ, hồ sơ du học, học bổng.'] },
      { h: 'Các kênh tham gia có tổ chức' },
      { p: 'An toàn và hiệu quả nhất là tham gia qua tổ chức: Đội — Đoàn trường, các phong trào của phường xã (ngày Chủ nhật xanh, hội khuyến học), chương trình của nhà văn hoá, hoặc hoạt động do trường phát động. Tổ chức cho em khung an toàn, người hướng dẫn và sức mạnh tập thể.' },
      { h: 'Tự khởi xướng dự án nhỏ — quy trình 6 bước' },
      { ul: ['1. Quan sát: vấn đề nào quanh em lặp đi lặp lại? (góc phố nhiều rác, em nhỏ khu trọ không ai kèm học...)', '2. Tìm hiểu nguyên nhân: hỏi người trong cuộc, đừng vội kết luận.', '3. Thiết kế giải pháp vừa sức: nhỏ mà chạy được hơn to mà nằm trên giấy.', '4. Tìm đồng minh: rủ nhóm bạn, xin cố vấn của thầy cô, báo và xin phép người lớn/chính quyền nơi thực hiện.', '5. Thực hiện và ghi nhận: phân công rõ, chụp ảnh trước — sau, ghi số liệu.', '6. Tổng kết và duy trì: báo cáo kết quả, cảm ơn, bàn cách duy trì lâu dài.'] },
      { h: 'Kĩ năng vận động người khác tham gia' },
      { p: 'Muốn rủ được người, thông điệp phải có 3 phần: vấn đề cụ thể ("góc sân khu mình 3 bao rác mỗi ngày") — giải pháp rõ ràng ("mỗi nhà một bao phân loại, nhóm mình gom sáng Chủ nhật") — việc nhỏ dễ làm ngay ("cô chú chỉ cần để bao đúng chỗ"). Người ta không tham gia vì khẩu hiệu, người ta tham gia vì thấy việc cụ thể, vừa sức và có người dẫn dắt.' },
      { h: 'Lưu ý an toàn và đúng mực' },
      { ul: ['Mọi hoạt động ngoài trường phải có sự đồng ý của bố mẹ và tốt nhất có người lớn đồng hành.', 'Không tự ý quyên góp tiền; cần gây quỹ thì thông qua trường, Đội hoặc tổ dân phố.', 'Tôn trọng người được giúp: hỏi nhu cầu thật của họ thay vì áp đặt điều mình nghĩ là tốt.'] },
      { note: 'Đừng đợi "đủ lớn mới giúp đời". Dự án cộng đồng tốt nhất của học sinh là dự án nhỏ đến mức có thể bắt đầu vào cuối tuần này.' },
    ],
    [
      { q: 'Khu tập thể của Vinh có nhiều ông bà lớn tuổi không biết dùng điện thoại thông minh để gọi video cho con cháu, đặt lịch khám bệnh. Hãy thiết kế dự án 6 bước cho Vinh.', a: '1. Vấn đề: khoảng 10 ông bà cần trợ giúp kĩ năng số cơ bản. 2. Nguyên nhân: không có ai kiên nhẫn hướng dẫn chậm rãi. 3. Giải pháp: "Lớp công nghệ ông bà" — 30 phút chiều Chủ nhật tại nhà văn hoá, mỗi buổi 1 kĩ năng (gọi video, xem tin chính thống, cảnh giác lừa đảo qua mạng). 4. Đồng minh: rủ 3 bạn cùng khu, xin bác tổ trưởng mượn phòng, báo bố mẹ. 5. Thực hiện: mỗi bạn kèm 2–3 ông bà, có tờ hướng dẫn chữ to mang về. 6. Tổng kết sau 6 buổi: ông bà tự gọi được video — đo bằng số người làm được; tính chuyện duy trì mỗi tháng 1 buổi "hỏi đáp".' },
      { q: 'Nhóm của Ngọc hào hứng phát động "thu gom pin cũ" nhưng sau 2 tuần chỉ thu được 7 viên pin, các bạn nản và muốn bỏ. Nhóm nên làm gì?', a: 'Đừng bỏ — hãy chẩn đoán như bước 2 của quy trình: vấn đề thường không phải "mọi người vô tâm" mà là thùng thu gom đặt chỗ khuất, không ai biết chương trình, hoặc mọi người không hiểu vì sao pin cần thu riêng. Giải pháp: chuyển thùng ra chỗ đông qua lại (gần căng tin), làm poster giải thích tác hại của pin với 1 con số ấn tượng, nhờ cô tổng phụ trách nhắc trong giờ chào cờ, đặt mục tiêu nhỏ lại (50 viên/tháng). Dự án cộng đồng thất bại ở lần thiết kế đầu là chuyện bình thường — điều chỉnh dựa trên dữ liệu mới là kĩ năng thật.' },
      { q: 'Sơn muốn rủ các hộ trong khu cùng phân loại rác nhưng đến nhà ai cũng nói chung chung "mọi người hãy bảo vệ môi trường nhé" và bị từ chối. Theo kĩ năng vận động đã học, Sơn nên đổi thông điệp thế nào?', a: 'Khẩu hiệu chung chung không kéo được ai. Thông điệp vận động hiệu quả cần 3 phần cụ thể: (1) vấn đề sát sườn — "góc sân khu mình mỗi sáng có 3 bao rác lẫn lộn, bốc mùi"; (2) giải pháp rõ ràng — "mỗi nhà để riêng một túi rác hữu cơ và một túi rác tái chế, nhóm em gom sáng Chủ nhật"; (3) việc nhỏ dễ làm ngay — "cô chú chỉ cần để hai túi đúng chỗ, còn lại tụi cháu lo". Người ta tham gia vì thấy việc cụ thể, vừa sức và có người dẫn dắt, chứ không vì lời kêu gọi đạo lý. Sơn cũng nên xin phép bác tổ trưởng và bố mẹ trước khi triển khai.' },
    ]
  ),

  'S9HDTN-w26-quiz': L(
    'Bảo vệ môi trường — Sống xanh',
    'Biến đổi khí hậu, rác nhựa, ô nhiễm không khí không còn là chuyện trên tivi — nó ở ngay bữa ăn, con đường đến trường của các em. Tuần này: hiểu vấn đề và bắt đầu sống xanh từ những thói quen cụ thể.',
    ['Hiểu các vấn đề môi trường chính ở Việt Nam và liên hệ địa phương.', 'Nắm nguyên tắc 3R-5R trong giảm thiểu rác thải.', 'Xây dựng được thói quen sống xanh cá nhân đo đếm được.', 'Biết lan toả lối sống xanh đến gia đình và lớp học.'],
    [
      { h: 'Môi trường Việt Nam — những con số biết nói' },
      { p: 'Việt Nam nằm trong nhóm quốc gia chịu ảnh hưởng nặng của biến đổi khí hậu: nước biển dâng đe doạ đồng bằng sông Cửu Long, các đợt nắng nóng và bão lũ cực đoan tăng dần. Rác nhựa là vấn đề nhức nhối — mỗi người Việt thải hàng chục kg nhựa mỗi năm, phần lớn dùng một lần rồi tồn tại hàng trăm năm trong đất và đại dương.' },
      { h: 'Từ 3R đến 5R' },
      { ul: ['Refuse (Từ chối): không nhận thứ mình không cần — ống hút nhựa, túi nilon cho món đồ cầm tay được.', 'Reduce (Giảm thiểu): mua vừa đủ, ưu tiên đồ bền thay vì đồ dùng một lần.', 'Reuse (Tái sử dụng): bình nước cá nhân, túi vải, tận dụng giấy một mặt làm nháp.', 'Recycle (Tái chế): phân loại rác để giấy, nhựa, kim loại được quay vòng.', 'Rot (Ủ phân): rác hữu cơ (vỏ rau quả) có thể ủ làm phân bón cây.'] },
      { h: 'Thứ tự ưu tiên quan trọng' },
      { p: 'Nhiều người nghĩ tái chế là giải pháp số một — thực ra nó đứng gần cuối. Từ chối và giảm thiểu mới là gốc: chai nhựa tốt nhất là chai không được sản xuất ra. Tái chế tiêu tốn năng lượng và chỉ xử lí được một phần; đừng để "có tái chế rồi" thành lí do xả thoải mái.' },
      { h: 'Sống xanh của học sinh — cụ thể và đo được' },
      { ul: ['Mang bình nước riêng: bớt ~3–5 chai nhựa/tuần, tiền tiết kiệm thấy ngay.', 'Túi vải/cặp khi mua đồ; từ chối túi nilon cho món nhỏ.', 'Tắt điện, quạt khi ra khỏi phòng; rút sạc khi pin đầy.', 'Đi bộ, xe đạp cho quãng gần; xe buýt cho quãng xa.', 'Đồ cũ không vứt vội: quần áo còn tốt đem quyên góp, sách cũ tặng lại khoá sau.'] },
      { h: 'Lan toả — từ cá nhân ra tập thể' },
      { p: 'Một người sống xanh là tín hiệu, một lớp sống xanh là phong trào. Em có thể đề xuất: góc phân loại rác của lớp (giấy riêng — nhựa riêng), tuần lễ không rác nhựa, đổi giấy vụn lấy cây con, hoặc gắn dự án môi trường vào hoạt động cộng đồng tuần 25. Ở nhà: rủ cả nhà dùng làn đi chợ, ủ rác bếp trồng rau.' },
      { h: 'Tránh "sống xanh phong trào"' },
      { p: 'Sống xanh không phải mua thật nhiều đồ "eco" mới hay đăng ảnh nhặt rác rồi thôi. Bền vững nằm ở thói quen lặp lại hằng ngày, dù không ai nhìn thấy. Hãy chọn 2–3 thói quen vừa sức và giữ chúng trong 30 ngày — thay vì 10 thói quen giữ được 3 hôm.' },
      { note: 'Công thức bắt đầu: 1 bình nước + 1 túi vải + 1 thói quen tắt điện. Nhỏ, rẻ, làm được ngay hôm nay — và cộng dồn suốt đời thì không hề nhỏ.' },
    ],
    [
      { q: 'Căng tin trường Hoa bán nước bằng cốc nhựa dùng một lần, mỗi ngày thải cả trăm cốc. Hoa muốn thay đổi điều này. Em gợi ý cho Hoa lộ trình thế nào?', a: 'Đi từng bước có dữ liệu: (1) Đếm thực tế 1 tuần — ví dụ 500 cốc/tuần — và chụp ảnh thùng rác; (2) Đề xuất với cô phụ trách và căng tin giải pháp đôi bên cùng lợi: giảm 1–2 nghìn cho bạn mang bình cá nhân (căng tin đỡ chi phí cốc); (3) Truyền thông: poster "500 cốc nhựa mỗi tuần" ở căng tin, phát động qua giờ chào cờ; (4) Đo lại sau 1 tháng và công bố kết quả. Thay đổi hệ thống thuyết phục bằng số liệu và lợi ích, không chỉ bằng lời kêu gọi.' },
      { q: 'Mẹ Tú quen dùng túi nilon mỗi lần đi chợ vì "tiện, có mất gì đâu". Tú nên thuyết phục mẹ thế nào cho khéo?', a: 'Không giảng đạo lý — hãy làm cho lựa chọn xanh TIỆN hơn: Tú mua/may sẵn 2 túi vải gọn treo ngay chỗ mẹ lấy xe, chủ động xách làn đi chợ cùng mẹ vài lần đầu, và kể lợi ích sát sườn (túi vải chắc hơn, đựng nặng không đứt quai; nhà bớt cả núi túi nilon nhét gầm bếp). Thói quen của người thân thay đổi nhờ sự thuận tiện và đồng hành, hiếm khi nhờ bài thuyết trình.' },
      { q: 'Tâm nghĩ "cứ dùng đồ nhựa thoải mái, miễn là vứt vào thùng tái chế là xong, vì tái chế xử lí được hết". Quan niệm này sai ở đâu theo thứ tự ưu tiên 5R?', a: 'Sai vì đặt tái chế (Recycle) lên làm giải pháp số một, trong khi nó đứng gần cuối trong thang 5R. Thứ tự ưu tiên đúng là Từ chối (Refuse) → Giảm thiểu (Reduce) → Tái sử dụng (Reuse) → rồi mới Tái chế. Lí do: tái chế tiêu tốn năng lượng, chỉ xử lí được một phần và nhựa không tái chế được vô hạn lần; "chai nhựa tốt nhất là chai không được sản xuất ra". Coi "có tái chế rồi" là cái cớ để xả thoải mái khiến tổng lượng rác vẫn tăng. Tâm nên ưu tiên từ chối đồ nhựa dùng một lần và mang bình/túi cá nhân — gốc của vấn đề nằm ở giảm phát sinh, không phải ở khâu xử lí cuối.' },
    ]
  ),

  'S9HDTN-w27-quiz': L(
    'Tổ chức công việc cá nhân',
    'Càng gần kì thi, đầu việc càng dồn dập: ôn tập, hồ sơ, việc lớp, việc nhà. Tuần này các em học cách tổ chức công việc như một "người quản lý dự án" của chính cuộc đời mình.',
    ['Biết gom mọi đầu việc về một hệ thống duy nhất.', 'Phối hợp được danh sách việc, lịch và time-block thành quy trình tuần.', 'Biết chia việc lớn thành việc nhỏ khả thi.', 'Hình thành thói quen rà soát tuần.'],
    [
      { h: 'Vì sao "nhớ trong đầu" luôn thất bại?' },
      { p: 'Não người giỏi suy nghĩ nhưng kém lưu trữ việc cần làm — nó hay nhắc em việc cần làm vào... lúc không làm được (nhớ ra phải nộp giấy khám sức khoẻ khi đang ở giữa giờ Toán) và quên béng vào lúc cần. Nguyên tắc số một của tổ chức công việc: mọi việc phải được GHI RA ở một nơi tin cậy, để não rảnh mà suy nghĩ.' },
      { h: 'Hệ thống 3 lớp: Hộp thu — Lịch — Khối giờ' },
      { ul: ['Hộp thu (inbox): một cuốn sổ nhỏ hoặc ghi chú điện thoại — BẤT KÌ việc gì nảy ra đều ghi vào ngay, chưa cần phân loại.', 'Lịch: việc có ngày giờ cố định (hạn nộp hồ sơ, lịch thi thử, sinh nhật bạn) đưa lên lịch ngay.', 'Khối giờ (time-block, tuần 3): việc cần thời gian làm (ôn chuyên đề, viết bài) được hẹn vào khối giờ cụ thể trong tuần.'] },
      { h: 'Chia việc lớn thành việc làm-được-ngay' },
      { p: '"Ôn thi Văn" không phải một việc — nó là một dự án mơ hồ khiến em trì hoãn. Hãy chia đến mức mỗi việc bắt đầu bằng động từ và làm xong trong một buổi: "lập dàn ý 3 đề nghị luận xã hội", "học thuộc dẫn chứng bài thơ X", "viết 1 mở bài trong 15 phút". Quy tắc: nếu nhìn việc mà chưa biết bắt đầu từ đâu, nghĩa là nó chưa được chia đủ nhỏ.' },
      { h: 'Chọn 3 việc quan trọng nhất mỗi ngày' },
      { p: 'Danh sách 15 việc/ngày là danh sách thất bại được lên kế hoạch trước. Mỗi tối, chọn ra 3 việc quan trọng nhất cho ngày mai (ưu tiên việc "quan trọng — chưa khẩn cấp" như ôn thi); làm xong 3 việc đó là ngày thành công, việc khác là điểm cộng. Cách này giữ động lực và đảm bảo việc lớn luôn tiến.' },
      { h: 'Rà soát tuần — 20 phút thay đổi cục diện' },
      { ul: ['Chiều Chủ nhật, dành 20 phút: dọn hộp thu (phân loại hết việc đã ghi).', 'Nhìn lịch tuần tới: hạn nộp nào, bài kiểm tra nào đang đến?', 'Xếp khối giờ cho 3–5 việc quan trọng nhất tuần.', 'Nhìn lại tuần qua: việc gì trượt, vì sao, rút kinh nghiệm gì?'] },
      { h: 'Giấy hay ứng dụng?' },
      { p: 'Cả hai đều tốt — hệ thống tốt nhất là hệ thống em THỰC SỰ dùng mỗi ngày. Sổ giấy: không gây xao nhãng, hợp người hay bị điện thoại cám dỗ. Ứng dụng: có nhắc hẹn, đồng bộ. Có thể lai: lịch trên điện thoại (để có chuông nhắc) + sổ tay cho hộp thu và 3 việc mỗi ngày.' },
      { note: 'Hệ thống không cần đẹp, cần ĐỦ: mọi việc có chỗ ghi, việc có hạn lên lịch, việc cần làm có giờ làm, và cả hệ thống được rà lại mỗi tuần. Thiếu vòng rà soát tuần, mọi hệ thống đều mục dần.' },
    ],
    [
      { q: 'Tuần tới của Nhật: thứ Tư nộp hồ sơ dự thi, thứ Sáu kiểm tra Hoá, Chủ nhật thi thử Toán, cộng thêm trực nhật thứ Năm và đá bóng giao hữu thứ Bảy. Nhật đang rối. Hãy giúp Nhật tổ chức bằng hệ thống 3 lớp.', a: 'Lịch: ghi 5 mốc cố định (hạn hồ sơ T4, kiểm tra T6, thi thử CN, trực nhật T5, bóng T7). Hộp thu → chia việc: "nộp hồ sơ" = xin chữ kí bố mẹ (tối T2) + photo học bạ (chiều T3) + nộp (sáng T4); "kiểm tra Hoá" = ôn chương trọng tâm (khối 19h–20h30 T3 và T5); "thi thử Toán" = làm 1 đề bấm giờ (khối sáng T7 trước trận bóng). Ba việc quan trọng nhất mỗi ngày chọn từ đây. Mọi thứ vừa khít khi được trải ra — rối là do tất cả cùng nằm trong đầu.' },
      { q: 'Hiền lập kế hoạch tuần rất chi tiết vào Chủ nhật nhưng đến thứ Tư là vỡ trận vì việc phát sinh (cô giao thêm bài, nhà có khách). Lỗi nằm ở đâu?', a: 'Lỗi thiết kế phổ biến: xếp lịch kín 100% không có khoảng đệm. Cách sửa: chỉ xếp khối giờ cho khoảng 70–80% thời gian rảnh, chừa mỗi ngày 1 khối "linh hoạt" cho việc phát sinh; việc phát sinh mới thì ghi vào hộp thu rồi xếp vào khối linh hoạt thay vì phá khối đã định. Thêm thói quen 5 phút mỗi tối điều chỉnh kế hoạch ngày mai — kế hoạch là vật sống, chỉnh liên tục mới chạy được.' },
      { q: 'Mỗi tối Quân viết một danh sách dài 12–15 việc cho ngày mai rồi cuối ngày luôn thấy bỏ dở quá nửa, sinh chán nản. Theo nguyên tắc bài này, Quân nên đổi cách lập danh sách thế nào?', a: 'Danh sách 12–15 việc/ngày là "danh sách thất bại được lên kế hoạch trước" — quá tải nên ngày nào cũng dang dở và mất động lực. Nguyên tắc: mỗi tối chọn ra ĐÚNG 3 việc quan trọng nhất cho ngày mai, ưu tiên nhóm "quan trọng — chưa khẩn cấp" như ôn thi; làm xong 3 việc đó là ngày thành công, việc khác chỉ là điểm cộng. Các việc còn lại vẫn ghi vào hộp thu để không quên, nhưng không nhồi hết vào kế hoạch một ngày. Cách này giữ động lực và đảm bảo việc lớn (quan trọng) luôn nhích tới, thay vì cả ngày bận rộn mà toàn việc vụn.' },
    ]
  ),

  'S9HDTN-w28-quiz': L(
    'Đối mặt thất bại và rèn sự kiên trì',
    'Điểm thi thử thấp, trượt đội tuyển, tỏ tình bị từ chối, dự án thất bại — ai cũng sẽ va vào thất bại. Tuần này không học cách né nó, mà học cách NGÃ CHO ĐÚNG: đứng dậy nhanh hơn, khôn hơn và bền hơn.',
    ['Hiểu thất bại là dữ liệu, không phải bản án về giá trị bản thân.', 'Nắm khái niệm tư duy phát triển (growth mindset) và cách áp dụng.', 'Biết quy trình 4 bước xử lí một thất bại.', 'Rèn sự kiên trì bằng hệ thống thói quen nhỏ.'],
    [
      { h: 'Hai cách nhìn một cú ngã' },
      { p: 'Nhà tâm lý học Carol Dweck phân biệt hai kiểu tư duy: tư duy cố định (fixed mindset) tin rằng năng lực là bẩm sinh — nên thất bại là bằng chứng "mình kém", phải né tránh thử thách; tư duy phát triển (growth mindset) tin rằng năng lực rèn được qua nỗ lực đúng cách — nên thất bại là thông tin về việc cần điều chỉnh. Cùng một điểm 4 môn Toán: người tư duy cố định nghĩ "mình không có khiếu", người tư duy phát triển hỏi "mình hổng phần nào và cách học nào chưa ổn?"' },
      { h: 'Sức mạnh của từ "CHƯA"' },
      { p: 'Thay "mình không làm được" bằng "mình CHƯA làm được" — một từ thay đổi cả câu chuyện: nó thừa nhận hiện trạng nhưng mở cánh cửa tiến bộ. Não bộ có tính mềm dẻo: kĩ năng và trí thông minh thay đổi thật sự khi luyện tập đúng phương pháp, điều này đã được khoa học thần kinh xác nhận.' },
      { h: 'Quy trình 4 bước xử lí thất bại' },
      { ul: ['Bước 1 — Cho phép mình buồn (có thời hạn): thất vọng là phản ứng lành mạnh; cho nó 1 buổi tối đến 1–2 ngày, đừng giả vờ "ổn" ngay.', 'Bước 2 — Tách sự việc khỏi giá trị bản thân: "bài thi này 4 điểm" khác hoàn toàn "mình là đứa thất bại". Em THUA một ván, em không phải KẺ THUA.', 'Bước 3 — Mổ xẻ như huấn luyện viên xem lại trận đấu: cái gì trong tầm kiểm soát (cách ôn, phân bổ giờ, tâm lý phòng thi) và cái gì không (đề khó, ốm đúng hôm thi)? Chỉ rút bài học từ phần kiểm soát được.', 'Bước 4 — Một hành động điều chỉnh cụ thể, làm ngay trong 48 giờ: đổi cách ôn, hỏi thầy cô chỗ hổng, đặt lại mục tiêu mốc.'] },
      { h: 'Kiên trì không phải nghiến răng chịu đựng' },
      { p: 'Kiên trì bền vững dựa vào HỆ THỐNG chứ không dựa vào ý chí: mục tiêu chia nhỏ đến mức khó thất bại (15 phút từ vựng/ngày thay vì 2 tiếng/ngày), gắn vào thói quen sẵn có (học từ ngay sau bữa tối), theo dõi chuỗi ngày liên tục trên lịch, và có người đồng hành biết tiến độ của em. Ý chí cạn rất nhanh; hệ thống thì chạy cả lúc em lười.' },
      { h: 'Quy tắc "không bỏ hai lần liên tiếp"' },
      { p: 'Sẽ có ngày em vỡ kế hoạch — mệt, bận, lười. Không sao. Quy tắc duy nhất: không bỏ HAI ngày liên tiếp. Bỏ một ngày là tai nạn, bỏ hai ngày là khởi đầu của một thói quen mới (xấu). Hôm sau quay lại với phiên bản tối thiểu cũng được — 5 phút cũng tính là giữ chuỗi.' },
      { h: 'Người đi trước cũng từng ngã' },
      { p: 'Hầu hết những người em ngưỡng mộ đều có bộ sưu tập thất bại dày hơn bộ sưu tập thành công — nhà khoa học với hàng trăm thí nghiệm hỏng, vận động viên với hàng nghìn cú ngã, doanh nhân với những lần phá sản. Khác biệt không nằm ở việc họ ít ngã, mà ở chỗ mỗi cú ngã đều bị họ "moi" hết bài học trước khi bước tiếp.' },
      { note: 'Câu hỏi vàng sau mỗi thất bại: "Nếu việc này xảy ra với bạn thân của mình, mình sẽ nói gì với nó?" — rồi nói chính câu đó với bản thân. Ta thường công bằng với bạn hơn với chính mình.' },
    ],
    [
      { q: 'Thi thử lần 2, điểm Toán của Lâm còn tụt hơn lần 1 dù em đã học nhiều hơn hẳn. Lâm nói "chắc mình không có khiếu, học nữa cũng vô ích". Hãy dùng quy trình 4 bước giúp Lâm.', a: 'B1: cho Lâm một buổi tối buồn — hợp lệ. B2: tách bạch — điểm tụt là sự kiện, không phải định nghĩa về Lâm. B3: mổ xẻ — "học nhiều hơn" là học GÌ và CÁCH nào? Thường lộ ra: học thêm tràn lan nhưng thiếu tự luyện đề, hoặc ôn phần mình thích thay vì phần đề hay ra, hoặc lần này đề lệch tủ. So hai bài thi xem mất điểm ở dạng nào. B4: trong 48 giờ — mang cả hai bài thi đến nhờ thầy cô chỉ đúng 3 lỗ hổng lớn nhất, đổi lịch ôn: 60% thời gian cho 3 lỗ hổng đó. "Không có khiếu" là kết luận của tư duy cố định; dữ liệu chỉ nói: cách học vừa rồi chưa trúng.' },
      { q: 'Trang đặt mục tiêu dậy 5h30 học bài mỗi sáng, được 3 hôm thì bỏ và tự trách mình "không có ý chí". Vấn đề thật sự nằm ở đâu?', a: 'Vấn đề ở THIẾT KẾ, không ở ý chí: mục tiêu nhảy vọt (từ dậy 6h45 xuống 5h30), không có hệ thống đỡ (ngủ vẫn lúc 23h30 — thiếu ngủ thì não nào chịu dậy). Sửa: lùi giờ ngủ trước rồi mới lùi giờ dậy, mỗi tuần sớm hơn 15 phút; chuẩn bị sẵn bàn học từ tối; áp quy tắc không-bỏ-hai-lần: hôm nào lỡ dậy muộn thì học bù 15 phút buổi tối, mai quay lại. Và tự hỏi: có nhất thiết học buổi sáng không, hay khung giờ tối vốn đang ổn?' },
      { q: 'Nộp hồ sơ vào đội tuyển Văn của trường, Mai bị loại. Em buồn và nói "mình viết chẳng ra gì, chắc chẳng bao giờ giỏi Văn được". Hãy giúp Mai chuyển từ tư duy cố định sang tư duy phát triển.', a: 'Câu nói của Mai mang dấu hiệu tư duy cố định: lấy một thất bại để kết luận về năng lực bẩm sinh ("chẳng bao giờ giỏi"). Chuyển sang tư duy phát triển bắt đầu từ chữ "CHƯA": "mình CHƯA đủ giỏi để vào đội tuyển lần này" — thừa nhận hiện trạng nhưng mở cánh cửa tiến bộ. Áp quy trình 4 bước: cho mình buồn một buổi tối; tách bạch "trượt vòng tuyển" khỏi "mình là người thất bại"; mổ xẻ phần kiểm soát được — nhờ thầy cô chỉ ra bài viết yếu ở đâu (lập luận, dẫn chứng, hành văn?); rồi một hành động trong 48 giờ — đặt lịch luyện viết mỗi tuần, đọc thêm bài mẫu. Năng lực viết rèn được qua luyện tập đúng cách; cú trượt này chỉ là dữ liệu chỉ đường, không phải bản án.' },
    ]
  ),

  'S9HDTN-w29-quiz': L(
    'Chuẩn bị cho cấp 3 — Tìm hiểu trường THPT',
    'Còn vài tuần nữa là đăng kí nguyện vọng! Tuần này chúng ta học cách thu thập thông tin trường THPT một cách bài bản, hiểu luật chơi nguyện vọng và chiến lược chọn trường thông minh.',
    ['Biết các loại hình trường sau THCS và đặc điểm từng loại.', 'Thu thập, kiểm chứng thông tin trường từ nguồn chính thống.', 'Hiểu nguyên tắc đặt nguyện vọng và chiến lược 3 tầng.', 'Đối thoại hiệu quả với gia đình về lựa chọn trường.'],
    [
      { h: 'Bản đồ các con đường sau lớp 9' },
      { ul: ['THPT công lập: học phí thấp, tuyển bằng điểm thi vào 10 — cạnh tranh theo khu vực.', 'THPT chuyên: cho học sinh giỏi nổi trội một môn, thi thêm môn chuyên; áp lực cao, môi trường mạnh.', 'THPT tư thục, dân lập: xét học bạ hoặc thi riêng, học phí cao hơn, nhiều mô hình đa dạng.', 'Trung tâm GDNN-GDTX: vừa học văn hoá vừa học nghề, phù hợp bạn muốn đi làm sớm.', 'Trường nghề (trung cấp): học nghề chính quy, có thể liên thông lên cao đẳng, đại học sau này — một con đường nghiêm túc, không phải "phương án thất bại".'] },
      { h: 'Bộ tiêu chí chọn trường — không chỉ điểm chuẩn' },
      { ul: ['Học thuật: điểm chuẩn 3 năm gần nhất (xem XU HƯỚNG, không chỉ năm ngoái), tổ hợp môn lựa chọn ở lớp 10 có hợp định hướng nghề của em (tuần 10) không.', 'Khoảng cách: trường cách nhà bao xa? 3 năm đi học mỗi ngày 2 lượt — xa quá bào mòn sức khoẻ và thời gian.', 'Môi trường: hoạt động câu lạc bộ, nề nếp, văn hoá trường — hợp tính cách em (Big Five tuần 9) không.', 'Tài chính: học phí và chi phí đi kèm có vừa sức gia đình trong 3 năm không.'] },
      { h: 'Tìm thông tin ở đâu cho chuẩn?' },
      { p: 'Nguồn chính thống: văn bản tuyển sinh của Sở GD&ĐT (chỉ tiêu, khu vực tuyển, lịch thi), website chính thức của trường, thầy cô chủ nhiệm. Nguồn tham khảo có kiểm chứng: ngày hội tư vấn tuyển sinh, anh chị đang học tại trường (hỏi ít nhất 2–3 người để khỏi phiến diện). Cảnh giác: tin đồn "năm nay điểm chuẩn chắc chắn tăng/giảm", các hội nhóm không rõ nguồn — quyết định 3 năm không thể dựa trên lời đồn.' },
      { h: 'Chiến lược nguyện vọng 3 tầng' },
      { p: 'Nguyên tắc phổ biến (kiểm tra quy định cụ thể của địa phương em): xếp nguyện vọng theo 3 tầng — NV1 "ước mơ có cơ sở": trên lực học hiện tại một chút, đáng để phấn đấu; NV2 "vừa tầm": điểm chuẩn các năm sát với điểm thi thử ổn định của em; NV3 "an toàn": chắc chắn đỗ để không rơi tự do. Sai lầm kinh điển: cả 3 nguyện vọng đều là trường tốp trên — đỗ thì vẻ vang, trượt thì không còn lưới đỡ.' },
      { h: 'Ước lượng vị trí của mình bằng dữ liệu' },
      { p: 'So sánh: điểm thi thử (qua nhiều lần, lấy mức ổn định chứ không lấy lần cao nhất) với điểm chuẩn 3 năm của trường định đăng kí, có tính hệ số và cách tính điểm của địa phương. Hỏi thêm nhận định của giáo viên bộ môn — thầy cô nhìn hàng trăm học sinh mỗi năm nên ước lượng khá chuẩn. Khoảng cách an toàn: điểm ổn định của em nên cao hơn điểm chuẩn dự kiến của NV2 ít nhất 1–2 điểm.' },
      { h: 'Bàn với gia đình — cuộc họp, không phải cuộc chiến' },
      { p: 'Chuẩn bị như tuần 5 đã học: mang DỮ LIỆU lên bàn (bảng so sánh 3–4 trường theo bộ tiêu chí, điểm thi thử của em), lắng nghe mối quan tâm của bố mẹ (tài chính, an toàn, danh tiếng), và thống nhất sớm — đổi nguyện vọng phút chót trong hoảng loạn hầu như luôn là quyết định tồi.' },
      { note: 'Không có "trường tốt nhất", chỉ có "trường hợp nhất với em": vừa lực học, hợp định hướng, vừa sức gia đình. Chiếc áo đẹp trên người khác chưa chắc vừa người mình.' },
    ],
    [
      { q: 'Điểm thi thử ổn định của Sơn là 38–40 (thang 50). Trường A em mơ ước có điểm chuẩn 3 năm: 41 — 42,5 — 43; trường B: 36 — 37 — 37,5; trường C: 30 — 31 — 30,5. Hãy nhận xét chiến lược nguyện vọng cho Sơn.', a: 'Trường A đang trên lực của Sơn 3–5 điểm VÀ có xu hướng tăng — làm NV1 "ước mơ" được nhưng phải xác định rõ là cửa khó, cần bứt phá thật sự trong các tuần còn lại. Trường B sát mức ổn định, có khoảng dư 1–2 điểm — NV2 hợp lí. Trường C dư an toàn — NV3 chuẩn. Cơ cấu này ổn; điều cần làm thêm: kiểm tra cả 3 trường theo các tiêu chí ngoài điểm (khoảng cách, tổ hợp môn lớp 10, học phí) — đỗ một trường hoàn toàn không hợp mình cũng là một dạng rủi ro.' },
      { q: 'Bố mẹ Mai nhất quyết đăng kí trường X vì "gần nhà, bác hàng xóm khen", còn Mai thích trường Y có lớp chuyên Anh hợp định hướng du học. Hai bên căng thẳng. Mai nên chuẩn bị cuộc nói chuyện thế nào?', a: 'Mai nên biến tranh cãi cảm tính thành so sánh dữ liệu: lập bảng hai trường theo cùng bộ tiêu chí (điểm chuẩn so với lực học Mai, tổ hợp môn, khoảng cách, học phí, định hướng — trường Y có lợi thế gì cho mục tiêu du học: chương trình tiếng Anh, hoạt động, thành tích). Trình bày bằng thông điệp tôi: "Con muốn theo hướng du học nên tổ hợp ở trường Y giúp con vì...". Lắng nghe nỗi lo thật của bố mẹ (đường xa? học phí?) và đề xuất giải pháp cho từng nỗi lo. Nếu vẫn bế tắc, mời "trọng tài" chuyên môn: cô chủ nhiệm hoặc thầy cô tư vấn tuyển sinh của trường.' },
      { q: 'Lực học của Tài chỉ ở mức trung bình; em định nguyện vọng cuối là một trường nghề (trung cấp) và bị bạn bè chê "thi trượt mới phải học nghề". Em nên hiểu và nói lại thế nào?', a: 'Quan niệm "học nghề là phương án thất bại" là sai. Trường nghề/trung cấp là một con đường nghiêm túc sau lớp 9: học nghề chính quy, ra trường có kĩ năng làm việc thật, và hoàn toàn có thể liên thông lên cao đẳng, đại học sau này. Với bạn lực học trung bình hoặc muốn đi làm sớm, đây có khi còn là lựa chọn HỢP hơn việc cố vào một trường THPT không phù hợp rồi đuối sức 3 năm. Nguyên tắc của bài: không có "trường tốt nhất", chỉ có "trường hợp nhất với mình" — xét cả lực học, định hướng nghề và điều kiện gia đình. Tài nên tìm hiểu kĩ ngành nghề trường nghề đào tạo, cơ hội việc làm và lộ trình liên thông, rồi tự tin với lựa chọn dựa trên dữ liệu của mình thay vì để lời chê dẫn dắt.' },
    ]
  ),

  'S9HDTN-w30-quiz': L(
    'Kế hoạch học tập trung và dài hạn',
    'Tầm nhìn xa giúp bước chân gần có ý nghĩa. Tuần này các em học cách nối các mục tiêu ngắn hạn (kì thi vào 10) với bức tranh 3 năm cấp 3 và xa hơn — bằng một bản kế hoạch sống, biết tự điều chỉnh.',
    ['Phân biệt mục tiêu ngắn hạn, trung hạn, dài hạn và mối liên hệ giữa chúng.', 'Lập được kế hoạch học tập 3 năm THPT phác thảo từ định hướng nghề.', 'Biết nguyên tắc lập kế hoạch ngược (backward planning).', 'Hiểu cách giữ kế hoạch linh hoạt trước thay đổi.'],
    [
      { h: 'Ba tầm nhìn của một kế hoạch' },
      { ul: ['Ngắn hạn (đến 1 năm): thi vào 10, hoàn thành lớp 9 — cụ thể, đo được từng tuần.', 'Trung hạn (1–4 năm): học tốt tổ hợp môn phù hợp ở cấp 3, thi tốt nghiệp và xét tuyển đại học/cao đẳng/trường nghề.', 'Dài hạn (5–10 năm): bước vào nhóm nghề đã định hướng (tuần 10), trở thành phiên bản mình mong muốn.', 'Nguyên tắc: tầm nhìn xa quyết định HƯỚNG, kế hoạch gần quyết định BƯỚC — thiếu một trong hai đều lạc đường hoặc giậm chân.'] },
      { h: 'Lập kế hoạch ngược — bắt đầu từ đích' },
      { p: 'Thay vì hỏi "giờ mình nên học gì", hãy đi ngược từ đích: muốn vào nhóm nghề Y — sức khoẻ (đích 10 năm) → cần đỗ trường đào tạo khối ngành sức khoẻ (đích 4 năm) → khối xét tuyển thường cần Toán, Hoá, Sinh giỏi (đích 3 năm cấp 3) → vậy lớp 10 phải chọn tổ hợp có Hoá, Sinh và xây nền hai môn này ngay (đích năm tới) → và trước hết phải đỗ một trường THPT có tổ hợp đó (đích 3 tháng). Mỗi mắt xích đều nhìn thấy lí do của mình.' },
      { h: 'Khung kế hoạch 3 năm THPT (phác thảo)' },
      { ul: ['Lớp 10: thích nghi môi trường mới, chọn đúng tổ hợp môn, xây nền các môn cốt lõi của định hướng; thử 1–2 câu lạc bộ để mở rộng kĩ năng.', 'Lớp 11: năm "tăng tốc êm" — đào sâu môn thế mạnh, bắt đầu tìm hiểu kĩ các trường đại học/cao đẳng/học nghề, thi thử chứng chỉ nếu định hướng cần (ngoại ngữ, tin học).', 'Lớp 12: dồn lực cho kì thi tốt nghiệp và xét tuyển; hoàn thiện hồ sơ; quyết định dựa trên 2 năm dữ liệu đã tích luỹ.', 'Xuyên suốt: mỗi năm ít nhất 1 trải nghiệm nghề (tuần 14) để kiểm chứng định hướng.'] },
      { h: 'Kế hoạch phải sống — cơ chế rà soát định kì' },
      { p: 'Kế hoạch dài hạn không phải lời thề khắc đá. Đặt lịch rà soát mỗi 6 tháng: định hướng nghề còn đúng không (sau các trải nghiệm mới)? Năng lực thực tế tiến triển ra sao? Có thông tin mới về ngành nghề, tuyển sinh không? Được phép ĐIỀU CHỈNH hướng — nhưng điều chỉnh có cân nhắc dựa trên dữ liệu khác hoàn toàn với đẽo cày giữa đường theo cảm hứng.' },
      { h: 'Đầu tư cho kĩ năng nền — khoản lãi kép' },
      { p: 'Dù đích đến nào, có những kĩ năng chắc chắn cần trong 10 năm tới: ngoại ngữ, kĩ năng số (tuần 32 sẽ học), giao tiếp, tự học. Dành đều đặn một phần nhỏ thời gian mỗi tuần cho chúng ngay từ bây giờ — giống gửi tiết kiệm, giá trị cộng dồn theo năm tháng sẽ rất lớn.' },
      { h: 'Viết bản kế hoạch một trang' },
      { p: 'Gói tất cả vào MỘT trang giấy: dòng đầu — định hướng nghề hiện tại; tiếp theo — đích 3 năm, đích 1 năm; rồi 3 việc trọng tâm của 3 tháng tới; cuối trang — ngày rà soát kế tiếp. Một trang đủ nhìn mỗi tuần; một quyển sổ kế hoạch dày thường chỉ được đọc đúng một lần.' },
      { note: 'Người không có kế hoạch dài hạn sẽ sống trong kế hoạch của người khác — của thuật toán mạng xã hội, của trào lưu, của lời rủ rê gần nhất. Bản kế hoạch một trang chính là tuyên ngôn tự chủ của em.' },
    ],
    [
      { q: 'Oanh (mã RIASEC: AS, mê viết lách và truyền thông) sắp vào lớp 10. Hãy giúp Oanh lập kế hoạch ngược từ định hướng nghề truyền thông — báo chí.', a: 'Đích 10 năm: làm việc trong ngành truyền thông/báo chí. Đích 4 năm: đỗ ngành báo chí — truyền thông (khối xét tuyển thường nặng Văn, Anh, có trường xét năng khiếu). Đích 3 năm cấp 3: giỏi Văn và tiếng Anh, có "hồ sơ sản phẩm": bài viết cho báo tường, trang truyền thông của trường, cuộc thi viết. Năm lớp 10: chọn tổ hợp có các môn xã hội phù hợp, vào câu lạc bộ truyền thông/báo chí của trường, duy trì viết mỗi tuần 1 bài. Ba tháng tới: đỗ trường THPT có hoạt động truyền thông mạnh (đưa tiêu chí này vào bảng chọn trường tuần 29). Rà soát sau 6 tháng: còn thích viết sau khi đã viết đều 6 tháng không — đó là phép thử thật.' },
      { q: 'Giữa lớp 11, định hướng của Phước đổi từ kĩ thuật sang kinh tế sau một trải nghiệm hè ấn tượng. Bạn ấy hoang mang vì "kế hoạch 3 năm vỡ rồi". Em nói gì với Phước?', a: 'Kế hoạch không vỡ — nó đang làm đúng nhiệm vụ: va chạm với thực tế để được điều chỉnh. Phước nên rà soát có phương pháp thay vì đổi theo cảm hứng nhất thời: (1) kiểm chứng lại bằng 1–2 trải nghiệm/tìm hiểu sâu về nghề kinh tế (phỏng vấn người trong nghề, thử dự án nhỏ như gian hàng hội chợ); (2) nếu vẫn chắc, xem phần nào của kế hoạch cũ TÁI SỬ DỤNG được — Toán vốn là nền của cả kĩ thuật lẫn kinh tế, kĩ năng số và ngoại ngữ càng không bỏ đi đâu; (3) cập nhật bản kế hoạch một trang, đổi các việc trọng tâm (thêm môn xã hội cần cho khối xét tuyển mới). Đổi hướng ở lớp 11 với 1 năm chuẩn bị vẫn kịp — đó chính là lí do kế hoạch cần rà soát mỗi 6 tháng.' },
      { q: 'Khánh nói "kế hoạch dài hạn vô nghĩa vì 10 năm nữa nhiều nghề sẽ đổi, tính trước cũng thừa" nên không thèm vạch hướng gì, sống tuỳ hứng từng tuần. Hãy phản biện cho Khánh.', a: 'Khánh đúng một nửa (tương lai nghề nghiệp thay đổi nhanh) nhưng kết luận sai. Chính vì tương lai bất định mà kế hoạch dài hạn càng cần — không phải để khắc cứng một nghề, mà để xác định HƯỚNG và đầu tư vào những kĩ năng nền chắc chắn còn giá trị trong 10 năm tới: ngoại ngữ, kĩ năng số, giao tiếp, năng lực tự học (lãi kép). Hơn nữa kế hoạch dài hạn là vật SỐNG, được rà soát mỗi 6 tháng và điều chỉnh theo thông tin mới, chứ không phải lời thề khắc đá. Mặt khác, "sống tuỳ hứng từng tuần" không có nghĩa là tự do — như bài đã nói, người không có kế hoạch của riêng mình sẽ sống trong kế hoạch của người khác: của thuật toán mạng xã hội, của trào lưu, của lời rủ rê gần nhất. Bản kế hoạch một trang chính là tuyên ngôn tự chủ.' },
    ]
  ),

  'S9HDTN-w31-quiz': L(
    'Suy nghĩ tích cực và lòng biết ơn',
    'Càng sát kì thi, "tiếng nói trong đầu" càng quan trọng: nó có thể là huấn luyện viên cổ vũ hoặc kẻ phá hoại ngầm. Tuần này: rèn suy nghĩ tích cực ĐÚNG CÁCH — khoa học, không tô hồng — và sức mạnh của lòng biết ơn.',
    ['Phân biệt suy nghĩ tích cực thực tế với lạc quan tô hồng.', 'Nhận diện và điều chỉnh các kiểu suy nghĩ tiêu cực tự động.', 'Thực hành được bài tập lòng biết ơn có kiểm chứng khoa học.', 'Xây dựng thói quen chăm sóc đời sống tinh thần trước kì thi.'],
    [
      { h: 'Tích cực thật khác tô hồng' },
      { p: 'Suy nghĩ tích cực KHÔNG phải tự nhủ "mọi thứ đều tuyệt" khi đang gặp khó — đó là tô hồng, và nó sụp ngay khi va thực tế. Tích cực thật là: nhìn nhận khó khăn ĐÚNG như nó có, đồng thời tin rằng mình có thể hành động để cải thiện. Công thức: thực tế về hiện tại + niềm tin vào khả năng hành động = tích cực bền vững.' },
      { h: 'Bắt những "suy nghĩ tự động" tiêu cực' },
      { ul: ['Khái quát hoá quá mức: trượt một bài kiểm tra → "mình LUÔN LUÔN thất bại".', 'Trầm trọng hoá: sai một câu trong giờ → "kiểu này thi trượt, đời mình xong rồi".', 'Đọc suy nghĩ người khác: cô nhìn mình → "chắc cô thấy mình kém".', 'Lọc tiêu cực: được khen 5 điều, chê 1 điều → cả ngày chỉ nghĩ về 1 điều chê.'] },
      { h: 'Kĩ thuật 3 câu hỏi để "cãi lại" suy nghĩ tiêu cực' },
      { p: 'Khi bắt được một suy nghĩ tiêu cực, đưa nó ra toà với 3 câu hỏi: (1) Bằng chứng nào ỦNG HỘ và bằng chứng nào CHỐNG LẠI suy nghĩ này? (2) Nếu bạn thân mình nghĩ vậy, mình sẽ nói gì với nó? (3) Kể cả tình huống xấu xảy ra, bước hành động tiếp theo của mình là gì? Suy nghĩ tiêu cực sợ nhất bị tra hỏi bằng chứng — đa số chúng "đuối lí" rất nhanh.' },
      { h: 'Lòng biết ơn — bài tập rẻ nhất, lãi nhất' },
      { p: 'Nhiều nghiên cứu tâm lý học cho thấy: người duy trì thói quen ghi nhận điều biết ơn có mức hạnh phúc cao hơn, ngủ ngon hơn và ít triệu chứng stress hơn. Cơ chế: não có "thiên kiến tiêu cực" — tự động chú ý cái xấu để sinh tồn; bài tập biết ơn huấn luyện não chủ động quét tìm cái tốt, cân bằng lại ống kính nhìn đời.' },
      { h: 'Thực hành: nhật kí 3 điều biết ơn' },
      { ul: ['Mỗi tối trước khi ngủ, viết 3 điều cụ thể mình biết ơn trong ngày — càng cụ thể càng tốt: không viết "biết ơn gia đình" chung chung, mà "mẹ để phần con bát chè đỗ đen khi con học về muộn".', 'Mỗi tuần một lần, nói lời cảm ơn trực tiếp với một người cụ thể về một việc cụ thể.', 'Duy trì tối thiểu 3 tuần để não kịp hình thành "đường mòn" mới.'] },
      { h: 'Bộ ba nâng đỡ tinh thần mùa thi' },
      { p: 'Ghép các kĩ năng đã học thành thói quen tối: 3 phút thở chậm (tuần 7) + 3 dòng biết ơn + 1 câu tự nhủ thực tế cho ngày mai ("Mai mình ôn xong chuyên đề hàm số — đúng kế hoạch là ổn"). Năm phút mỗi tối này là "vitamin tinh thần" cho 60–70 ngày nước rút.' },
      { note: 'Em không điều khiển được suy nghĩ nào BẬT LÊN trong đầu, nhưng hoàn toàn điều khiển được suy nghĩ nào được GIỮ LẠI và nuôi dưỡng. Đó là khác biệt giữa người bị tâm trạng dẫn dắt và người tự lái.' },
    ],
    [
      { q: 'Trước kì thi 2 tháng, cứ ngồi vào bàn là đầu Quyên vang lên "học giờ này muộn rồi, không kịp nữa đâu". Hãy giúp Quyên xử lí suy nghĩ này bằng kĩ thuật 3 câu hỏi.', a: '(1) Bằng chứng: ủng hộ — còn một số chuyên đề chưa ôn; chống lại — 2 tháng = 60 ngày x 3 giờ = 180 giờ học, đủ cho các chuyên đề trọng tâm nếu có kế hoạch; nhiều anh chị từng bứt phá giai đoạn này. (2) Nói với bạn thân: "Cậu còn 2 tháng, đủ để tập trung vào phần ra thi nhiều nhất — ngồi than mới là cách duy nhất chắc chắn không kịp." (3) Hành động kế tiếp: liệt kê chuyên đề, đánh dấu phần trọng tâm chưa chắc, xếp vào time-block 60 ngày. Suy nghĩ "không kịp" co lại thành việc làm được ngay tối nay.' },
      { q: 'Hết tuần đầu viết nhật kí biết ơn, Đại thấy "sến và chẳng tác dụng gì", định bỏ. Em phân tích cho Đại thế nào?', a: 'Hai điểm: (1) Tác dụng của bài tập biết ơn là tích luỹ — nghiên cứu đo thấy thay đổi rõ sau vài tuần kiên trì, giống tập thể dục không thể có cơ bụng sau 7 ngày; quy tắc "không bỏ hai lần liên tiếp" (tuần 28) áp dụng được ở đây. (2) Kiểm tra cách làm: nếu Đại viết chung chung ("biết ơn bố mẹ" ngày nào cũng giống nhau) thì não không phải "quét tìm" gì cả — hãy ép độ cụ thể: mỗi ngày 3 điều MỚI, có chi tiết, có tên người. Viết đúng cách, chính việc đi tìm chất liệu để viết mới là bài tập thật cho não.' },
      { q: 'Để trấn an mình trước kì thi, Phương cứ tự nhủ "không sao đâu, mình chắc chắn đỗ thủ khoa, mọi thứ sẽ tuyệt vời" dù chưa ôn được mấy. Cách "tích cực" này có ổn không, nên đổi thế nào?', a: 'Không ổn — đây là lạc quan TÔ HỒNG, không phải tích cực thật, và nó sẽ sụp ngay khi va vào một đề thi thử khó. Tích cực bền vững theo công thức: thực tế về hiện tại + niềm tin vào khả năng hành động. Phương nên đổi thành: thừa nhận đúng tình hình ("mình còn nhiều chuyên đề chưa ôn") VÀ tin vào hành động cải thiện ("còn X tuần, nếu mỗi tối ôn đúng kế hoạch thì mình kịp các phần ra thi nhiều nhất"). Câu tự nhủ tốt là câu thực tế kèm bước đi cụ thể cho ngày mai, không phải lời hứa hẹn viển vông. Tự nhủ tô hồng làm dịu nhất thời nhưng khiến Phương lơ là hành động — đúng thứ đang thiếu.' },
    ]
  ),

  'S9HDTN-w32-quiz': L(
    'Kỹ năng số — Sử dụng công cụ học tập',
    'Chiếc điện thoại trong túi em vừa là thư viện lớn nhất lịch sử vừa là cỗ máy gây xao nhãng tinh vi nhất. Tuần này: biến công nghệ thành trợ thủ học tập — dùng công cụ số, kiểm chứng thông tin và làm chủ cả AI.',
    ['Biết chọn và dùng hiệu quả các nhóm công cụ số phục vụ học tập.', 'Kiểm chứng được thông tin trên mạng trước khi tin và chia sẻ.', 'Dùng AI hỗ trợ học đúng cách — làm chủ chứ không phụ thuộc.', 'Giữ an toàn thông tin cá nhân và sức khoẻ số.'],
    [
      { h: 'Bốn nhóm công cụ số cho việc học' },
      { ul: ['Ghi chú — lưu trữ: ứng dụng ghi chú có thư mục, ảnh chụp bài giảng được sắp xếp theo môn — nguyên tắc "mọi thứ có chỗ của nó" như hộp thu tuần 27.', 'Luyện tập: flashcard điện tử có lặp lại ngắt quãng (tuần 4), app luyện đề trắc nghiệm, video bài giảng để học lại phần hổng.', 'Lập kế hoạch: lịch điện tử có nhắc hẹn, app theo dõi thói quen, đồng hồ Pomodoro.', 'Hợp tác: tài liệu trực tuyến soạn chung cho bài tập nhóm, nhóm học tập có quy ước rõ (chỉ trao đổi bài, không spam).'] },
      { h: 'Nguyên tắc chọn công cụ: ÍT mà TINH' },
      { p: 'Cài 10 app học tập rồi bỏ cả 10 là chuyện kinh điển. Mỗi nhu cầu chỉ chọn MỘT công cụ và dùng đủ sâu: một app ghi chú, một app flashcard, một lịch. Công cụ tốt nhất không phải cái nhiều tính năng nhất mà là cái em mở ra mỗi ngày không cần cố gắng.' },
      { h: 'Kiểm chứng thông tin — kĩ năng sống còn trên mạng' },
      { ul: ['Kiểm tra nguồn: ai viết, trang nào đăng, có phải nguồn chính thống (cơ quan nhà nước, báo chí có giấy phép, nhà xuất bản) không?', 'Kiểm tra chéo: tin quan trọng phải thấy ở ít nhất 2–3 nguồn độc lập đáng tin.', 'Cảnh giác tiêu đề giật gân, ảnh cắt ghép, "nghe nói", "chia sẻ gấp kẻo bị xoá" — đặc sản của tin giả.', 'Với tài liệu ôn thi: chỉ tin văn bản từ Sở GD&ĐT và nhà trường; "đề thi rò rỉ", "tài liệu mật" trên mạng gần như chắc chắn là giả hoặc lừa đảo.'] },
      { h: 'Dùng AI hỗ trợ học — đúng cách và sai cách' },
      { p: 'Các công cụ AI trả lời câu hỏi ngày càng phổ biến. Cách dùng SAI: chép nguyên đáp án AI vào bài tập — em được điểm hôm nay và mất năng lực ngày thi (phòng thi không có AI). Cách dùng ĐÚNG: tự làm trước rồi nhờ AI kiểm tra và chỉ lỗi; yêu cầu AI giải thích khái niệm theo cách khác khi chưa hiểu bài; nhờ AI tạo câu hỏi ôn tập để tự kiểm. Hai lưu ý lớn: AI có thể trả lời SAI rất tự tin — luôn đối chiếu sách giáo khoa và thầy cô; và không nhập thông tin cá nhân nhạy cảm vào bất kì công cụ nào.' },
      { h: 'An toàn số cơ bản' },
      { ul: ['Mật khẩu mạnh, khác nhau cho từng tài khoản quan trọng; không chia sẻ mã OTP cho BẤT KÌ ai.', 'Không công khai thông tin định danh: địa chỉ nhà, lịch đi học, ảnh thẻ học sinh, căn cước.', 'Cảnh giác link lạ "trúng thưởng", "khoá học miễn phí", giả mạo thầy cô/nhà trường nhắn vay tiền — xác minh bằng cách gọi trực tiếp.', 'Trên mạng xã hội, mọi thứ đăng lên đều có thể tồn tại mãi — "suy nghĩ 10 giây" (tuần 23) trước mỗi lần đăng.'] },
      { h: 'Sức khoẻ số — làm chủ thiết bị, đừng để thiết bị làm chủ' },
      { p: 'Các ứng dụng được thiết kế để giữ em cuộn màn hình càng lâu càng tốt. Phòng vệ: tắt thông báo không cần thiết, đặt giới hạn giờ cho app giải trí, không mang điện thoại vào giường, và dùng "khối giờ không màn hình" trước khi ngủ 30–60 phút để bảo vệ giấc ngủ — tài sản số một mùa thi (tuần 7).' },
      { note: 'Câu hỏi định kì đáng giá: "Tuần qua, công nghệ phục vụ kế hoạch của mình hay mình phục vụ thuật toán của nó?" — xem thống kê thời gian dùng máy là có ngay câu trả lời trung thực.' },
    ],
    [
      { q: 'Trước kì thi, nhóm chat lớp lan truyền ảnh chụp "đề Văn vào 10 bị lộ" kèm lời "chia sẻ gấp". Một số bạn đã bỏ ôn các đề khác để học tủ theo đề này. Em xử lí thế nào?', a: 'Áp quy trình kiểm chứng: nguồn là ảnh trôi nổi không cơ quan nào xác nhận — gần như chắc chắn giả (lộ đề thật là sự kiện nghiêm trọng sẽ có thông báo chính thức và thi lại). Hành động: không chia sẻ tiếp, nhắn vào nhóm khuyến cáo các bạn thận trọng kèm lí do, báo giáo viên chủ nhiệm để cô thông tin chính thức. Học tủ theo "đề lộ" là đặt cược kì thi vào một tấm ảnh vô danh — rủi ro không thể chấp nhận.' },
      { q: 'Bài tập về nhà môn Toán, Kha dùng AI giải hộ toàn bộ rồi chép vào vở, điểm bài tập rất đẹp nhưng điểm kiểm tra trên lớp tụt thê thảm. Chuyện gì đang xảy ra và Kha nên đổi cách dùng AI ra sao?', a: 'Kha đã "thuê" AI tập thể dục hộ mình: bài tập vốn là buổi tập của não, chép đáp án nghĩa là não không tập buổi nào — kiểm tra trên lớp (không có AI) phơi bày đúng thực lực. Cách đổi: bước 1 tự làm hết sức, kể cả sai; bước 2 đưa lời giải của MÌNH cho AI, yêu cầu chỉ ra lỗi và giải thích vì sao sai; bước 3 tự làm lại một bài tương tự không trợ giúp. AI khi đó thành gia sư kiểm bài — người tập vẫn phải là Kha.' },
      { q: 'Nhi tải về 9 ứng dụng học tập khác nhau (3 app ghi chú, 2 app flashcard, mấy app lập lịch) nhưng sau hai tuần chẳng mở cái nào, việc học vẫn lộn xộn. Theo nguyên tắc chọn công cụ số, Nhi nên làm gì?', a: 'Nhi vi phạm nguyên tắc "ÍT mà TINH": cài thật nhiều app rồi bỏ cả là chuyện kinh điển, vì mỗi nhu cầu lại nhảy giữa nhiều công cụ khiến mọi thứ rời rạc và tốn công. Cách sửa: mỗi nhu cầu chỉ giữ MỘT công cụ và dùng đủ sâu — một app ghi chú (sắp theo môn, như "hộp thu" tuần 27), một app flashcard có lặp lại ngắt quãng (tuần 4), một lịch có nhắc hẹn. Xoá phần còn lại. Công cụ tốt nhất không phải cái nhiều tính năng nhất mà là cái Nhi mở ra mỗi ngày không cần cố gắng. Đồng thời tự hỏi định kì: tuần qua công nghệ phục vụ kế hoạch của mình, hay mình phục vụ thuật toán của nó?' },
    ]
  ),

  'S9HDTN-w33-quiz': L(
    'Ôn tập học kì 2 — Tổng hợp',
    'Tuần ôn tập cuối cùng của môn học! Chúng ta hệ thống lại toàn bộ học kì 2 — từ phòng chống tệ nạn đến kế hoạch dài hạn — và kiểm kê bộ kĩ năng em sẽ mang theo vào phòng thi và vào đời.',
    ['Hệ thống hoá kiến thức học kì 2 theo 3 mạch: tự bảo vệ, quan hệ xã hội, làm chủ tương lai.', 'Tự đánh giá mức độ thực hành từng nhóm kĩ năng.', 'Kết nối các kĩ năng thành "bộ công cụ" dùng cho mùa thi.', 'Hoàn thiện hồ sơ định hướng cá nhân trước khi kết thúc năm học.'],
    [
      { h: 'Toàn cảnh học kì 2 — ba mạch lớn' },
      { ul: ['Tự bảo vệ: ma tuý và kĩ năng từ chối (t19), cờ bạc và cạm bẫy (t20), bạo lực học đường (t21), an toàn số (t32).', 'Quan hệ xã hội: tình bạn — tình yêu tuổi học trò (t22), giao tiếp hiệu quả (t23), tự lập và gia đình (t24), cộng đồng (t25), sống xanh (t26).', 'Làm chủ tương lai: tổ chức công việc (t27), đối mặt thất bại (t28), chọn trường THPT (t29), kế hoạch dài hạn (t30), suy nghĩ tích cực (t31), kĩ năng số (t32).'] },
      { h: 'Những "công thức" cần thuộc nằm lòng' },
      { ul: ['Từ chối 3 bước: nói KHÔNG dứt khoát — lí do ngắn — rời đi (t19, dùng cho mọi lời rủ rê nguy hiểm).', 'Thông điệp tôi: khi [sự việc], tôi thấy [cảm xúc], tôi mong [đề nghị] (t23, dùng cho mọi mâu thuẫn).', 'Quy trình thất bại 4 bước: buồn có thời hạn — tách việc khỏi giá trị bản thân — mổ xẻ phần kiểm soát được — một hành động trong 48 giờ (t28).', 'Nguyện vọng 3 tầng: ước mơ — vừa tầm — an toàn (t29).', 'Kiểm chứng tin: nguồn nào — chéo chưa — giật gân không (t32).'] },
      { h: 'Tự đánh giá bằng tình huống, không bằng định nghĩa' },
      { p: 'Kĩ năng sống không kiểm tra được bằng học thuộc. Hãy tự vấn bằng tình huống: "Nếu bị rủ chơi tài xỉu online, mình nói câu gì, làm gì tiếp?", "Nếu tuần tới có 5 việc dồn cùng lúc, mình mở công cụ nào ra đầu tiên?", "Nếu điểm thi thử sắp tới tụt, mình sẽ đi qua 4 bước nào?". Trả lời trôi chảy và ĐÃ TỪNG làm thật mới là đạt.' },
      { h: 'Bộ công cụ mùa thi — gói lại từ cả năm học' },
      { p: 'Sáu mươi ngày tới, em cần nhất: lộ trình nước rút (t5) + chiến thuật phòng thi (t6) + thở và ngủ (t7) + time-block và 3 việc/ngày (t3, t27) + thói quen tối 5 phút: thở, biết ơn, tự nhủ thực tế (t31) + kỉ luật không-bỏ-hai-lần (t28). Viết 6 mục này vào một tấm thẻ dán ở bàn học — đó là bản đồ sinh tồn mùa thi của em.' },
      { h: 'Hoàn thiện hồ sơ định hướng cá nhân' },
      { ul: ['Cập nhật lần cuối trong năm: mã RIASEC, nét Big Five, bảng SWOT (đã đổi gì sau 1 năm?).', 'Danh sách nghề ứng viên + những trải nghiệm đã kiểm chứng (tình nguyện, quan sát nghề, dự án lớp).', 'Bản kế hoạch một trang (t30) với nguyện vọng THPT đã chốt.', 'Cất hồ sơ này lại — nó là món quà em gửi cho chính mình ở năm lớp 10.'] },
      { h: 'Nhìn lại để bước tiếp' },
      { p: 'So với tuần 18, câu hỏi nâng cấp: không chỉ "em thay đổi thói quen nào" mà "kĩ năng nào đã CỨU em một lần trong học kì này?" — một lời từ chối đúng lúc, một cuộc nói chuyện với bố mẹ thành công, một thất bại được xử lí gọn. Đó là bằng chứng môn học này đã thành của em.' },
      { note: 'Kiến thức môn khác giúp em ĐỖ kì thi; kĩ năng của môn này giúp em ĐI QUA kì thi mà vẫn khoẻ mạnh, vững vàng — và còn dùng tiếp 50 năm nữa.' },
    ],
    [
      { q: 'Rà soát bộ công cụ mùa thi, Vũ nhận thấy mình ổn về kế hoạch và phương pháp nhưng "cứ vào phòng thi thử là tim đập chân run, đầu trống rỗng". Vũ nên ưu tiên tập gì trong các tuần còn lại?', a: 'Vấn đề của Vũ nằm ở khâu tâm lý phòng thi — cần tập như tập kĩ năng, không chỉ "cố bình tĩnh": (1) mô phỏng áp lực: mỗi tuần làm đề tại bàn học với đúng nghi thức thi thật — bấm giờ, không tài liệu, ngồi liền mạch; (2) luyện sẵn "nghi thức 2 phút" đầu giờ: thở 4-7-8 ba lượt, đọc lướt đề, khoanh câu dễ làm trước (t6, t7); (3) tối trước thi thử dùng bộ 5 phút: thở — biết ơn — tự nhủ thực tế. Lặp đủ nhiều, phòng thi sẽ thành môi trường quen — não hết coi nó là mối đe doạ.' },
      { q: 'Hãy giúp Ánh trả lời ba tình huống tự vấn: bị anh họ rủ "đầu tư app lãi 20%/tuần"; bạn thân nhắn "tao chán sống lắm"; và tuần cuối có 6 đầu việc dồn ứ. Ánh cần dùng kĩ năng tuần nào cho từng tình huống?', a: 'Tình huống 1 — t20 (cờ bạc, cạm bẫy tài chính) + t17: nhận diện mô hình Ponzi (lãi phi lý + mồi rút tiền sớm + thưởng rủ thêm người), từ chối và báo bố mẹ. Tình huống 2 — t11 + t21: lắng nghe không phán xét, KHÔNG hứa giữ bí mật, báo ngay người lớn tin cậy (gia đình bạn, giáo viên, hoặc hướng dẫn bạn gọi 111) — an toàn của bạn trên hết. Tình huống 3 — t27: trút cả 6 việc ra giấy, việc có hạn lên lịch, chia nhỏ, chọn 3 việc quan trọng nhất ngày mai, xếp time-block. Ba tình huống — ba mạch của học kì: tự bảo vệ, quan hệ, làm chủ công việc.' },
      { q: 'Ôn tập, Quang đọc lại định nghĩa của cả 14 tuần học kì 2 rất trôi chảy và tự tin "mình nắm hết rồi". Theo cách tự đánh giá đúng của bài, kết luận của Quang có đáng tin không?', a: 'Chưa đáng tin. Kĩ năng sống không kiểm tra được bằng học thuộc định nghĩa — đọc trôi chảy chỉ chứng minh đã NHỚ, không chứng minh đã LÀM được. Quang nên tự đánh giá bằng TÌNH HUỐNG: "Nếu bị rủ chơi tài xỉu online, mình nói câu gì, làm gì tiếp?", "Nếu điểm thi thử tuần tới tụt, mình đi qua 4 bước nào?", "Nếu 5 việc dồn cùng lúc, mình mở công cụ nào trước?". Trả lời trôi chảy VÀ đã từng làm thật mới là đạt. Nếu thấy lúng túng ở tình huống nào, đó chính là kĩ năng còn dừng ở mức "biết" mà chưa thành "làm" — cần thực hành thật trong những tuần còn lại.' },
    ]
  ),

  'S9HDTN-w34-quiz': L(
    'Tổng kết — Kỹ năng sống suốt đời',
    'Tuần áp chót, chúng ta lùi lại một bước để nhìn toàn cảnh: trong tất cả những gì đã học, đâu là những kĩ năng sẽ theo em suốt đời — và làm sao để chúng không rơi rụng sau khi rời cấp 2?',
    ['Xác định được các kĩ năng nền tảng có giá trị suốt đời.', 'Hiểu nguyên lí chung đằng sau các kĩ năng đã học.', 'Biết cách duy trì và nâng cấp kĩ năng sau khi kết thúc môn học.', 'Hình thành tâm thế học tập suốt đời.'],
    [
      { h: 'Sàng lọc 35 tuần — còn lại gì sau 10 năm?' },
      { p: 'Kiến thức cụ thể có thể phai, nhưng có những thứ sẽ theo em mãi: cách hiểu mình (SWOT, RIASEC, Big Five), cách đặt mục tiêu và quản thời gian, cách học một thứ mới, cách đứng dậy sau thất bại, cách từ chối điều nguy hiểm, cách nói chuyện với con người, và cách tự chăm sóc thân — tâm. Đó là "hệ điều hành" của một người trưởng thành; mọi kiến thức chuyên môn sau này đều chạy trên nền nó.' },
      { h: 'Bốn nguyên lí gốc đằng sau mọi kĩ năng đã học' },
      { ul: ['Tự nhận thức trước, hành động sau: mọi quyết định tốt (chọn trường, chọn nghề, chọn bạn) đều bắt đầu từ dữ liệu trung thực về bản thân.', 'Chia nhỏ và đều đặn thắng dồn dập: từ ôn thi, tiết kiệm tiền đến tập thói quen — hệ thống nhỏ chạy bền thắng nỗ lực lớn bùng phát.', 'Mọi thứ đo được thì cải thiện được: ghi chép chi tiêu, theo dõi điểm thi thử, nhật kí cảm xúc — không đo thì chỉ đoán.', 'Không ai tự lớn một mình: biết tìm trợ giúp đúng người đúng lúc là kĩ năng, không phải điểm yếu.'] },
      { h: 'Vì sao kĩ năng rơi rụng — và cách chống' },
      { p: 'Kĩ năng không dùng sẽ mòn như ngoại ngữ không nói. Ba cách chống rơi rụng: (1) gắn kĩ năng vào đời sống thật — ngân sách cá nhân dùng tiền thật, time-block xếp lịch thật; (2) định kì rà soát — giữ thói quen "20 phút Chủ nhật" (t27) và "rà kế hoạch 6 tháng" (t30) như răng phải đánh mỗi ngày; (3) dạy lại cho người khác — em trai, bạn bè; dạy là cách học sâu nhất (kĩ thuật Feynman, t4).' },
      { h: 'Học tập suốt đời — tấm vé của thế kỉ 21' },
      { p: 'Thế giới nghề nghiệp đang thay đổi nhanh chưa từng có: nhiều nghề hôm nay sẽ biến đổi mạnh, nhiều nghề của tương lai chưa ra đời. Tài sản chắc chắn nhất không phải một nghề cụ thể mà là NĂNG LỰC HỌC NGHỀ MỚI: biết cách tự học (t4), kĩ năng số (t32), ngoại ngữ, và tư duy phát triển (t28). Người mang tâm thế "mình CHƯA biết — và mình học được" không bao giờ bị bỏ lại.' },
      { h: 'Bản cam kết cá nhân — 3 giữ, 1 thêm' },
      { ul: ['Chọn 3 thói quen đã có trong năm nay mà em CAM KẾT GIỮ qua hè và lên cấp 3 (ví dụ: time-block buổi tối, nhật kí biết ơn, ngân sách tháng).', 'Chọn 1 kĩ năng MỚI sẽ học trong hè bằng chính phương pháp của môn này: mục tiêu SMART, chia nhỏ, theo dõi chuỗi (bơi, một ngôn ngữ lập trình, nấu 10 món...).', 'Viết ra giấy, kí tên, nhờ một người thân làm "nhân chứng" — hẹn ngày cùng kiểm tra cuối hè.'] },
      { h: 'Lời gửi gắm' },
      { p: 'Môn học có thể kết thúc nhưng việc "trải nghiệm và hướng nghiệp" thì không — từ giờ em tự là giáo viên chủ nhiệm của chính cuộc đời mình: tự giao bài, tự chấm điểm, tự khen thưởng và tự nhắc nhở. Bộ công cụ đã đủ trong tay; thứ duy nhất quyết định là em có mở ra dùng mỗi ngày hay không.' },
      { note: 'Kĩ năng sống giống chiếc xe đạp: học thì lâu, quên thì gần như không bao giờ — NHƯNG chỉ với điều kiện em đã thật sự đạp đi vài vòng, chứ không chỉ đọc sách hướng dẫn.' },
    ],
    [
      { q: 'Viết bản cam kết "3 giữ 1 thêm", Hiếu phân vân giữa rất nhiều thói quen muốn giữ và 4–5 kĩ năng muốn học hè. Em tư vấn nguyên tắc chọn thế nào?', a: 'Áp nguyên lí "chia nhỏ và đều đặn thắng dồn dập": chọn theo tác động và tính bền — 3 thói quen giữ nên là loại nhỏ, hằng ngày, đã chạy ổn ít nhất 1 tháng (dễ duy trì qua hè không có áp lực trường lớp); kĩ năng mới chỉ chọn MỘT và phải có đầu ra đo được cuối hè ("bơi được 50m", "làm 1 trang web cá nhân") thay vì "học lập trình" chung chung. Tham lam 5 thứ thường kết thúc bằng 0 thứ — bài học xuyên suốt cả năm.' },
      { q: 'Bố của Thư nói: "Mấy môn kĩ năng này không thi, học làm gì, hè tập trung học trước Toán lớp 10 đi." Nếu là Thư, em trả lời thế nào cho thuyết phục?', a: 'Thư có thể trả lời bằng chính kĩ năng của môn này — thông điệp tôi + dẫn chứng: "Con sẽ học trước Toán theo kế hoạch (cho bố xem bản time-block hè) — và con xếp được kế hoạch này chính nhờ kĩ năng đã học. Năm qua con tự quản tiền tiêu vặt không xin thêm, tự dậy đúng giờ, điểm thi thử tăng nhờ đổi cách ôn — đó đều là kết quả của môn kĩ năng." Chứng minh bằng kết quả thật thuyết phục hơn tranh luận; và chính cuộc đối thoại bình tĩnh đó cũng là minh chứng sống cho giá trị môn học.' },
      { q: 'Sau khi môn học kết thúc, một tháng hè trôi qua, Đăng nhận ra mình đã bỏ hết time-block lẫn nhật kí biết ơn, "kĩ năng học rồi mà rơi đâu mất". Vì sao kĩ năng rơi rụng và Đăng nên làm gì để giữ?', a: 'Kĩ năng không dùng sẽ mòn như ngoại ngữ không nói — đó là quy luật, không phải Đăng "kém". Ba cách chống rơi rụng: (1) gắn kĩ năng vào đời sống thật — hè vẫn lập ngân sách bằng tiền thật, vẫn time-block cho một dự án hè cụ thể (học bơi, làm web), để kĩ năng có "đất" chạy; (2) định kì rà soát — giữ thói quen "20 phút Chủ nhật" và "rà kế hoạch 6 tháng" như đánh răng mỗi ngày; (3) dạy lại cho người khác — chỉ em trai cách gấp đồ, rủ bạn cùng dùng flashcard; dạy là cách học sâu nhất (kĩ thuật Feynman). Đăng nên áp ngay bản cam kết "3 giữ 1 thêm": chọn 3 thói quen cam kết giữ qua hè, lên cấp 3 và 1 kĩ năng mới học trong hè.' },
    ]
  ),

  'S9HDTN-w35-quiz': L(
    'Kết thúc cấp 2 — Chia tay và tiếp tục',
    'Tuần cuối cùng của bốn năm THCS. Bài học hôm nay không có công thức mới — chỉ có sự lắng lại: nhìn về bốn năm đã qua, trân trọng những gì đang có, và bước tiếp với lòng biết ơn cùng sự háo hức.',
    ['Nhìn lại hành trình 4 năm THCS một cách trọn vẹn, trân trọng.', 'Biết cách nói lời cảm ơn và tạm biệt ý nghĩa.', 'Giữ kết nối lành mạnh với bạn bè, thầy cô sau khi chia tay.', 'Chuẩn bị tâm thế tích cực cho chặng đường mới.'],
    [
      { h: 'Bốn năm — em đã đi xa hơn em nghĩ' },
      { p: 'Hãy nhớ lại cô bé, cậu bé lớp 6 ngày đầu rụt rè tìm phòng học — và nhìn em hôm nay: cao hơn một cái đầu, biết tự lập kế hoạch, biết mình mạnh gì muốn gì, sắp bước vào một kì thi lớn với tâm thế sẵn sàng. Khoảng cách giữa hai phiên bản ấy là công sức của chính em, của thầy cô, gia đình và bạn bè — đáng được dừng lại để nhìn ngắm một lần cho rõ.' },
      { h: 'Nghi thức nhìn lại — viết cho chính mình' },
      { ul: ['Ba kỉ niệm đẹp nhất 4 năm qua — và ai đã ở đó cùng em.', 'Một khó khăn lớn em đã vượt qua — và nó dạy em điều gì.', 'Một điều em ước mình làm khác đi — không phải để tiếc, mà để mang theo làm kinh nghiệm.', 'Lời nhắn cho "em của năm lớp 12": đọc lại sau 3 năm sẽ là món quà thú vị.'] },
      { h: 'Nói lời cảm ơn — đừng để dành' },
      { p: 'Lời cảm ơn cụ thể, nói trực tiếp, có sức nặng hơn mọi món quà: với thầy cô — "em cảm ơn cô vì năm lớp 8 cô đã không bỏ cuộc với em môn Văn"; với bố mẹ — một bữa cơm em nấu và lời cảm ơn cho 4 năm đưa đón; với bạn — nói thẳng điều em quý ở nó. Tuần cuối cấp là dịp hiếm hoi mọi lời chân thành đều tự nhiên — đừng lãng phí.' },
      { h: 'Chia tay không phải mất nhau' },
      { ul: ['Lên cấp 3 mỗi người một trường là lẽ tự nhiên — tình bạn thật không cần gặp hằng ngày để tồn tại.', 'Giữ kết nối có chất lượng: một cuộc hẹn nhóm mỗi vài tháng đáng giá hơn nghìn lượt thả tim qua loa.', 'Chấp nhận một số mối quan hệ sẽ nhạt dần — đó không phải phản bội, đó là dòng chảy bình thường của cuộc sống; trân trọng những gì đã có là đủ.', 'Và lớp mới sẽ có những người bạn mới đang đợi — hãy đến với họ bằng sự cởi mở như ngày đầu lớp 6.'] },
      { h: 'Mang gì theo, để gì lại?' },
      { p: 'Mang theo: bộ kĩ năng cả năm (t34), hồ sơ định hướng cá nhân (t33), những tình bạn quý, và lòng biết ơn. Để lại: những hiềm khích vụn vặt, biệt danh từng làm ai đó buồn (một lời xin lỗi muộn vẫn đẹp hơn im lặng), và cả những thất bại cũ — chúng đã hoàn thành nhiệm vụ dạy dỗ, không cần vác theo nữa.' },
      { h: 'Trước mắt: kì thi — rồi mùa hè — rồi chương mới' },
      { p: 'Vài tuần tới hãy dồn tâm trí cho kì thi bằng tất cả công cụ đã có — nhưng nhớ: kì thi là cánh cửa, không phải bản án; dù kết quả thế nào, các con đường (t29) vẫn mở và người biết tự học sẽ luôn tìm được lối. Sau đó, cho mình một mùa hè xứng đáng: nghỉ ngơi thật, chơi thật, và một dự án nhỏ cho riêng mình. Tháng 9 này, một sân khấu mới đang chờ — và lần này, em bước lên với đầy đủ hành trang.' },
      { note: 'Trang cuối của một cuốn sổ đẹp không làm ta buồn — vì ta biết mình đã viết kín nó bằng những điều xứng đáng, và cuốn sổ mới đang nằm sẵn trên bàn. Chúc các em thi tốt, hè vui, và hẹn gặp ở những chặng đường rộng lớn hơn!' },
    ],
    [
      { q: 'Lớp 9B muốn làm một buổi chia tay ý nghĩa thay vì chỉ liên hoan ăn uống. Hãy gợi ý một kịch bản vận dụng các kĩ năng đã học trong năm.', a: 'Kịch bản 3 phần do chính học sinh tổ chức (vận dụng t25, t27): (1) "Dòng thời gian 4 năm" — mỗi tổ phụ trách 1 năm học, kể lại bằng ảnh và 3 kỉ niệm; (2) "Lời cảm ơn có địa chỉ" — bốc thăm ngẫu nhiên, mỗi bạn nói một lời cảm ơn cụ thể cho người mình bốc được, và cả lớp viết thiệp chung cho từng thầy cô bộ môn; (3) "Hộp thư gửi tương lai" — mỗi bạn viết thư cho chính mình năm lớp 12, lớp trưởng giữ và hẹn họp lớp mở thư sau 3 năm. Phân công theo quy trình dự án: có người điều phối, ngân sách minh bạch (t17), và xin cô chủ nhiệm làm khách mời danh dự.' },
      { q: 'Sắp chia tay, An buồn đến mất tập trung ôn thi vì "tụi bạn thân mỗi đứa một trường, chẳng còn gì như cũ". Em chia sẻ với An thế nào?', a: 'Trước hết công nhận cảm xúc của An — buồn lúc chia tay là thật và lành mạnh (t11), không cần xấu hổ hay gạt đi. Sau đó giúp An tách hai chuyện: "không như cũ" đúng, nhưng "mất nhau" thì chưa chắc — tình bạn chuyển hình thức chứ không biến mất; cả nhóm có thể lập quy ước gặp nhau dịp lễ, hè. Cuối cùng kéo về hiện tại: cách tốt nhất để quãng thời gian còn lại không phí là cùng nhau ôn thi — biến vài tuần cuối thành kỉ niệm chung đẹp nhất thay vì ngồi buồn từng người một. Nỗi buồn chia tay xử lí tốt nhất bằng sự hiện diện trọn vẹn lúc còn bên nhau.' },
      { q: 'Nhớ lại năm lớp 8, Hậu từng đặt cho một bạn cùng lớp biệt danh chế giễu khiến bạn ấy buồn; giờ sắp chia tay, Hậu áy náy nhưng ngại "chuyện qua lâu rồi, nói ra kì lắm". Theo gợi ý "mang gì theo, để gì lại", Hậu nên làm gì?', a: 'Đây đúng là thứ nên "để lại" chứ không vác theo lên cấp 3: những biệt danh từng làm ai đó buồn, những hiềm khích vụn vặt. Và bài học chỉ rõ — một lời xin lỗi muộn vẫn đẹp hơn im lặng. Hậu nên chủ động gặp riêng bạn, nói lời xin lỗi cụ thể và chân thành: "Hồi lớp 8 mình đặt biệt danh trêu cậu, mình biết đã làm cậu buồn, mình thực sự xin lỗi." Không cần dài dòng hay biện minh. Tuần cuối cấp là dịp hiếm hoi mọi lời chân thành đều tự nhiên; nói ra giúp cả hai nhẹ lòng bước tiếp, còn giữ trong lòng thì sự áy náy mới là thứ đeo bám dai dẳng. Mang theo lòng biết ơn và những tình bạn quý, để lại các lỗi lầm cũ đã hoàn thành nhiệm vụ dạy dỗ.' },
    ]
  ),

  'S9HDTN-w36-quiz': L(
    'Kết thúc HĐTN THCS — Lễ bế giảng trong tim',
    'Đây là tuần học cuối cùng — không phải tuần học theo nghĩa thông thường. Đây là tuần các em ngồi lại với chính mình, nhìn vào cuốn sổ hành trình 4 năm, và viết những dòng cuối trước khi lật sang trang mới.',
    [
      'Viết thư gửi bản thân tương lai — kết tinh những gì đã trưởng thành.',
      'Thực hành nghi lễ chia tay có ý nghĩa với bạn bè và thầy cô.',
      'Bước vào THPT với nhận thức rõ ràng về điểm xuất phát và hướng đi.',
    ],
    [
      { h: 'Bốn năm — Bốn phiên bản của em' },
      { p: 'Em lớp 6 và em lớp 9 hôm nay là hai người rất khác nhau — dù cùng một tên, một khuôn mặt. Lớp 6: tất cả đều mới lạ, bỡ ngỡ, hào hứng. Lớp 7: bắt đầu tìm thấy nhóm bạn thật sự. Lớp 8: thách thức lớn hơn, bắt đầu thấy mình có thể làm được những điều mình tưởng không thể. Lớp 9: đứng ở ngưỡng cửa trưởng thành, biết mình là ai và muốn đi đâu.' },
      { h: 'Thư gửi bản thân — Hoạt động cuối năm' },
      { p: 'Dành 15 phút viết một lá thư cho bản thân 3 năm tới (em năm lớp 12). Viết về: (1) Những điều em tự hào nhất ở bản thân lớp 9. (2) Điều khó khăn nhất em đã vượt qua. (3) Ước mơ và mục tiêu gửi gắm cho em tương lai. (4) Lời nhắc nhở quan trọng nhất em muốn bản thân không quên. Giao lá thư cho người em tin tưởng giữ hộ.' },
      { h: 'Nghi lễ chia tay có ý nghĩa' },
      { ul: [
        'Nói lời cảm ơn cụ thể — không phải "cảm ơn thầy cô" chung chung, mà "cảm ơn cô vì buổi đó cô đã...".',
        'Chia sẻ kỉ niệm thật — không cần hoàn hảo, chỉ cần thật.',
        'Chụp ảnh kỉ niệm — nhưng cũng có những khoảnh khắc chỉ nhìn bằng mắt, không qua điện thoại.',
        'Hẹn gặp lại có lịch cụ thể — "gặp lại nhé" mơ hồ thường không bao giờ xảy ra.',
      ] },
      { h: 'Bước vào THPT — Em là ai?' },
      { p: 'THPT là sân khấu mới — không có ai biết "câu chuyện cũ" của em. Đây là cơ hội: em có thể quyết định trở thành phiên bản nào của chính mình. Người nhút nhát ở THCS có thể trở thành người tự tin ở THPT nếu dũng cảm thử một điều mới từ tuần đầu tiên.' },
      { note: 'Trang này đang khép lại. Trang tiếp theo trắng tinh, chờ em viết — và em có toàn quyền quyết định sẽ viết gì trên đó.' },
    ],
    [
      { q: 'Hãy viết vài dòng trong thư gửi bản thân năm lớp 12 của em.', a: 'Ví dụ mẫu (em hãy viết của riêng mình): "Bạn ơi, năm lớp 9 tôi đã rất sợ kì thi vào 10. Nhưng tôi đã vượt qua — dù kết quả thế nào thì việc chuẩn bị và đứng dậy sau mỗi lần vấp đã dạy tôi nhiều hơn bất kì bài học nào. Tôi hi vọng năm lớp 12, bạn vẫn giữ được sự tò mò và lòng tử tế với bạn bè như tôi đã cố gắng duy trì. Đừng quên: học giỏi quan trọng, nhưng làm người tốt còn quan trọng hơn. Chúc bạn đủ dũng cảm để là chính mình".' },
      { q: 'Điều gì thay đổi lớn nhất ở em từ lớp 6 đến lớp 9?', a: 'Câu trả lời của mỗi người khác nhau — đó chính là điều làm cho câu hỏi này có giá trị. Ví dụ: "Tôi đã thay đổi từ người luôn chờ người khác quyết định thay mình thành người dám lên tiếng và có chính kiến riêng. Hành trình đó không phải một bước mà là hàng trăm khoảnh khắc nhỏ: lần đầu phát biểu ý kiến dù tay run, lần đầu từ chối việc sai dù bạn bè thuyết phục, lần đầu tự quyết định hướng học tập mà không hoàn toàn phụ thuộc vào bố mẹ".' },
      { q: 'Nếu được nói một câu với em lớp 6 của chính mình, em sẽ nói gì?', a: 'Ví dụ: "Đừng sợ khác biệt — những điều khiến em khác người hôm nay sẽ là điểm mạnh của em mai sau. Cứ tử tế với bạn bè, học hết sức, và đừng nghiêm túc bản thân quá mức — em vẫn đang học cách trưởng thành và điều đó hoàn toàn ổn". Câu trả lời của em mới là đúng nhất.' },
    ]
  ),
};
