const L = (topic, intro, objectives, theory, examples) => ({ topic, intro, objectives, theory, examples });

export const H12HDTN_LESSONS = {
  'H12HDTN-w01-quiz': L(
    'Tự đánh giá và hoàn thiện bản thân',
    'Cuối hành trình THPT, mỗi học sinh cần nhìn lại để hoàn thiện bản thân trước khi bước vào giai đoạn mới.',
    ['Thực hiện tự đánh giá toàn diện về năng lực và phẩm chất', 'Xác định điểm cần hoàn thiện', 'Lập kế hoạch phát triển bản thân'],
    [
      { h: 'Tự đánh giá toàn diện' },
      { p: 'Tự đánh giá là quá trình nhìn nhận khách quan về điểm mạnh, điểm yếu, cơ hội và thách thức của bản thân (phân tích SWOT cá nhân).' },
      { ul: ['Năng lực học tập và tư duy', 'Kĩ năng xã hội và giao tiếp', 'Phẩm chất đạo đức và thái độ', 'Sở thích và đam mê'] },
      { h: 'Hoàn thiện bản thân' },
      { p: 'Dựa trên kết quả tự đánh giá, xây dựng kế hoạch cải thiện cụ thể: đặt mục tiêu SMART, xác định nguồn lực, theo dõi tiến trình.' },
      { note: 'Tự đánh giá hiệu quả cần sự trung thực và cởi mở với phản hồi từ người khác.' },
    ],
    [
      { q: 'SWOT cá nhân khác SWOT tổ chức như thế nào?', a: 'SWOT cá nhân tập trung vào năng lực, tính cách và cơ hội nghề nghiệp của một người thay vì sản phẩm hay thị trường.' },
      { q: 'Mục tiêu SMART là gì?', a: 'Specific (cụ thể), Measurable (đo được), Achievable (khả thi), Relevant (liên quan), Time-bound (có thời hạn).' },
    ]
  ),
  'H12HDTN-w02-quiz': L(
    'Trưởng thành và tự chịu trách nhiệm',
    'Trưởng thành không chỉ là lớn tuổi mà là sẵn sàng chịu trách nhiệm về lời nói, hành động và hệ quả của mình.',
    ['Hiểu khái niệm trưởng thành về mặt tâm lí và xã hội', 'Rèn luyện tinh thần tự chịu trách nhiệm', 'Phân biệt trách nhiệm cá nhân và tập thể'],
    [
      { h: 'Trưởng thành là gì?' },
      { p: 'Trưởng thành bao gồm: tự lập trong quyết định, kiểm soát cảm xúc, tôn trọng người khác và chấp nhận hệ quả từ hành vi của mình.' },
      { h: 'Tự chịu trách nhiệm' },
      { p: 'Người trưởng thành không đổ lỗi cho hoàn cảnh hay người khác mà nhìn nhận vai trò của mình và tìm cách khắc phục.' },
      { ul: ['Nhận lỗi khi sai', 'Giữ lời hứa', 'Hoàn thành cam kết dù khó khăn', 'Học hỏi từ thất bại'] },
      { note: 'Tự chịu trách nhiệm là nền tảng xây dựng uy tín và niềm tin trong các mối quan hệ.' },
    ],
    [
      { q: 'Tại sao người trẻ thường khó nhận lỗi?', a: 'Do lo sợ bị đánh giá, mất mặt hoặc chưa được rèn luyện thói quen tự phản chiếu từ nhỏ.' },
      { q: 'Làm sao phân biệt lí do chính đáng và lí do đổ lỗi?', a: 'Lí do chính đáng giải thích hoàn cảnh khách quan, còn đổ lỗi là từ chối nhận phần trách nhiệm của mình.' },
    ]
  ),
  'H12HDTN-w03-quiz': L(
    'Quản lí tài chính cá nhân',
    'Kĩ năng quản lí tài chính giúp bạn sống độc lập và xây dựng nền tảng vững chắc cho tương lai.',
    ['Lập ngân sách cá nhân theo quy tắc 50-30-20', 'Hiểu khái niệm tiết kiệm và đầu tư cơ bản', 'Tránh các bẫy tài chính phổ biến'],
    [
      { h: 'Lập ngân sách cá nhân' },
      { p: 'Quy tắc 50-30-20: 50% thu nhập cho nhu cầu thiết yếu, 30% cho mong muốn cá nhân, 20% cho tiết kiệm và trả nợ.' },
      { h: 'Tiết kiệm và đầu tư' },
      { p: 'Tiết kiệm là giữ lại một phần thu nhập cho mục tiêu tương lai. Đầu tư là dùng tiền tiết kiệm sinh lời thêm (gửi ngân hàng, mua cổ phiếu, quỹ...).' },
      { ul: ['Quỹ khẩn cấp: 3–6 tháng chi tiêu', 'Mục tiêu ngắn hạn: du học, mua thiết bị', 'Mục tiêu dài hạn: khởi nghiệp, nhà ở'] },
      { note: 'Bắt đầu tiết kiệm sớm — dù số tiền nhỏ — mang lại lợi ích lớn nhờ lãi suất kép theo thời gian.' },
    ],
    [
      { q: 'Tại sao cần quỹ khẩn cấp?', a: 'Để xử lí các tình huống bất ngờ (bệnh tật, mất việc) mà không phải vay mượn hay bán tài sản.' },
      { q: 'Rủi ro của đầu tư so với gửi ngân hàng?', a: 'Đầu tư có thể mang lại lợi nhuận cao hơn nhưng cũng có nguy cơ mất vốn; gửi ngân hàng an toàn hơn nhưng lãi suất thấp.' },
    ]
  ),
  'H12HDTN-w04-quiz': L(
    'Xây dựng tổ ấm gia đình tương lai',
    'Hiểu về hôn nhân, gia đình và trách nhiệm làm cha mẹ giúp bạn chuẩn bị cho cuộc sống trưởng thành.',
    ['Hiểu các giá trị nền tảng của hôn nhân bền vững', 'Nhận thức trách nhiệm trong gia đình', 'Biết cách giải quyết mâu thuẫn gia đình'],
    [
      { h: 'Nền tảng hôn nhân bền vững' },
      { p: 'Hôn nhân hạnh phúc cần: tôn trọng lẫn nhau, giao tiếp cởi mở, chia sẻ giá trị và mục tiêu chung, và sẵn sàng thỏa hiệp.' },
      { h: 'Trách nhiệm trong gia đình' },
      { ul: ['Bình đẳng trong phân chia công việc nhà', 'Nuôi dưỡng và giáo dục con cái', 'Chăm sóc cha mẹ hai bên', 'Quản lí tài chính gia đình'] },
      { h: 'Giải quyết mâu thuẫn' },
      { p: 'Kĩ thuật "Tôi" thay vì "Bạn/Anh/Em": nói về cảm xúc của mình thay vì chỉ trích đối phương. Tìm thời điểm bình tĩnh để thảo luận.' },
      { note: 'Hôn nhân là quyết định lớn — cần dựa trên sự hiểu biết sâu sắc về nhau, không chỉ cảm xúc nhất thời.' },
    ],
    [
      { q: 'Tại sao giao tiếp quan trọng trong hôn nhân?', a: 'Giao tiếp giúp hai người hiểu nhau, giải quyết bất đồng trước khi trở thành mâu thuẫn nghiêm trọng.' },
      { q: 'Kĩ thuật "Tôi" hoạt động như thế nào?', a: 'Thay vì "Anh luôn bỏ mặc em", nói "Em cảm thấy cô đơn khi anh không dành thời gian cho em" — tập trung vào cảm xúc mình, không tấn công đối phương.' },
    ]
  ),
  'H12HDTN-w05-quiz': L(
    'Quan hệ và hợp tác trong công việc',
    'Kĩ năng làm việc nhóm và xây dựng quan hệ nghề nghiệp là yếu tố then chốt thành công trong thế giới công việc.',
    ['Hiểu động lực nhóm và vai trò cá nhân', 'Rèn luyện kĩ năng hợp tác hiệu quả', 'Xây dựng quan hệ nghề nghiệp tích cực'],
    [
      { h: 'Động lực nhóm' },
      { p: 'Nhóm hiệu quả có mục tiêu rõ ràng, vai trò phân công hợp lí, giao tiếp cởi mở và tinh thần trách nhiệm chung.' },
      { ul: ['Vai trò lãnh đạo', 'Vai trò thực thi', 'Vai trò hỗ trợ và kết nối', 'Vai trò sáng tạo và đề xuất'] },
      { h: 'Hợp tác hiệu quả' },
      { p: 'Lắng nghe tích cực, tôn trọng ý kiến khác biệt, chia sẻ thông tin minh bạch và sẵn sàng nhận phản hồi.' },
      { note: 'Xung đột trong nhóm là bình thường — quan trọng là cách giải quyết mang tính xây dựng.' },
    ],
    [
      { q: 'Làm sao xử lí thành viên không đóng góp trong nhóm?', a: 'Trước tiên trò chuyện riêng tư để hiểu nguyên nhân, đặt kì vọng rõ ràng và nếu cần, nhờ người dẫn dắt nhóm can thiệp.' },
      { q: 'Tại sao đa dạng quan điểm có lợi cho nhóm?', a: 'Quan điểm đa dạng giúp nhìn vấn đề từ nhiều góc độ, tránh tư duy nhóm và tạo ra giải pháp sáng tạo hơn.' },
    ]
  ),
  'H12HDTN-w06-quiz': L(
    'Hoạt động cộng đồng và phát triển xã hội',
    'Tham gia hoạt động cộng đồng không chỉ mang lại lợi ích cho xã hội mà còn phát triển bản thân toàn diện.',
    ['Nhận thức tầm quan trọng của tình nguyện và phục vụ cộng đồng', 'Lên kế hoạch tham gia hoạt động cộng đồng', 'Phản ánh về tác động cá nhân và xã hội'],
    [
      { h: 'Vai trò của hoạt động cộng đồng' },
      { p: 'Hoạt động cộng đồng giúp phát triển kĩ năng mềm, mở rộng mạng lưới quan hệ, gia tăng ý thức công dân và tạo ý nghĩa cuộc sống.' },
      { h: 'Các hình thức tham gia' },
      { ul: ['Tình nguyện viên cho tổ chức phi lợi nhuận', 'Dự án cộng đồng tại địa phương', 'Quyên góp và gây quỹ', 'Truyền thông nâng cao nhận thức xã hội'] },
      { h: 'Lên kế hoạch' },
      { p: 'Chọn lĩnh vực phù hợp với giá trị và kĩ năng của bạn, cam kết thời gian thực tế, và theo dõi tác động của hoạt động.' },
      { note: 'Phục vụ cộng đồng hiệu quả đòi hỏi sự bền bỉ, không chỉ tham gia một lần.' },
    ],
    [
      { q: 'Hoạt động tình nguyện có lợi gì cho bản thân?', a: 'Phát triển kĩ năng mềm, tăng tự tin, mở rộng quan hệ và có thêm kinh nghiệm thực tế cho hồ sơ nghề nghiệp.' },
      { q: 'Làm sao chọn hoạt động cộng đồng phù hợp?', a: 'Căn cứ vào giá trị bản thân, kĩ năng hiện có, thời gian sẵn có và nhu cầu thực sự của cộng đồng địa phương.' },
    ]
  ),
  'H12HDTN-w07-quiz': L(
    'Bảo vệ môi trường và phát triển bền vững',
    'Thế hệ trẻ có trách nhiệm đặc biệt trong việc bảo vệ môi trường cho các thế hệ tương lai.',
    ['Hiểu khái niệm phát triển bền vững', 'Nhận biết các vấn đề môi trường cấp bách', 'Thực hiện hành động xanh trong cuộc sống hằng ngày'],
    [
      { h: 'Phát triển bền vững' },
      { p: 'Phát triển bền vững là phát triển đáp ứng nhu cầu hiện tại mà không làm tổn hại đến khả năng đáp ứng nhu cầu của các thế hệ tương lai (định nghĩa Brundtland, 1987).' },
      { h: 'Vấn đề môi trường cấp bách' },
      { ul: ['Biến đổi khí hậu và nước biển dâng', 'Ô nhiễm không khí, nước, đất', 'Mất đa dạng sinh học', 'Rác thải nhựa đại dương'] },
      { h: 'Hành động cá nhân' },
      { p: 'Nguyên tắc 5R: Refuse (từ chối dùng thừa), Reduce (giảm thiểu), Reuse (tái sử dụng), Recycle (tái chế), Rot (ủ phân).' },
      { note: 'Mỗi hành động nhỏ của hàng triệu người tạo nên tác động lớn — hãy bắt đầu từ những thay đổi trong gia đình.' },
    ],
    [
      { q: 'Tại sao phát triển kinh tế và bảo vệ môi trường không mâu thuẫn?', a: 'Kinh tế xanh cho thấy có thể tăng trưởng bằng công nghệ sạch, năng lượng tái tạo và nền kinh tế tuần hoàn — thực tế còn tạo thêm việc làm.' },
      { q: 'Học sinh có thể làm gì để giảm dấu chân carbon?', a: 'Đi xe đạp hoặc phương tiện công cộng, ăn ít thịt đỏ hơn, tiết kiệm điện, giảm mua đồ không cần thiết và tuyên truyền cho gia đình.' },
    ]
  ),
  'H12HDTN-w08-quiz': L(
    'Khám phá thế giới nghề nghiệp',
    'Thế giới nghề nghiệp đang thay đổi nhanh chóng — hiểu rõ xu hướng giúp bạn chuẩn bị tốt hơn cho tương lai.',
    ['Nắm xu hướng nghề nghiệp trong thời đại số', 'Khám phá nghề mới nổi và nghề sẽ thay đổi', 'Xác định kĩ năng cần thiết cho tương lai'],
    [
      { h: 'Xu hướng thế giới nghề nghiệp' },
      { p: 'Tự động hóa và AI đang thay thế các công việc lặp lại, trong khi tạo ra nhu cầu mới về kĩ năng sáng tạo, phân tích, quản lí con người và công nghệ.' },
      { ul: ['Nghề mới nổi: AI/ML engineer, data scientist, sustainability consultant, UX designer', 'Nghề biến đổi: kế toán (tự động hóa hơn), marketing (số hóa hơn)', 'Nghề bền vững: y tế, giáo dục, nghệ thuật, dịch vụ cá nhân hóa'] },
      { h: 'Kĩ năng tương lai' },
      { p: 'WEF xác định 10 kĩ năng hàng đầu 2025: tư duy phân tích, tư duy sáng tạo, AI và dữ liệu lớn, lãnh đạo và ảnh hưởng xã hội, khả năng thích ứng...' },
      { note: 'Thay vì chọn một nghề cụ thể, hãy phát triển năng lực cốt lõi để linh hoạt thích ứng với nhiều vai trò.' },
    ],
    [
      { q: 'AI có thể thay thế hoàn toàn con người không?', a: 'Khó có thể — AI giỏi các nhiệm vụ có cấu trúc và dữ liệu lớn, nhưng con người vẫn vượt trội ở sáng tạo, đồng cảm và ra quyết định phức tạp trong hoàn cảnh mới.' },
      { q: 'Tại sao "học suốt đời" quan trọng hơn bao giờ hết?', a: 'Vì vòng đời của kĩ năng đang rút ngắn — một kĩ năng học năm nay có thể lỗi thời sau 5–10 năm nếu không cập nhật.' },
    ]
  ),
  'H12HDTN-w09-quiz': L(
    'Tìm hiểu sâu nghề và yêu cầu tuyển dụng',
    'Hiểu rõ yêu cầu cụ thể của ngành nghề mục tiêu giúp bạn chuẩn bị có định hướng và hiệu quả hơn.',
    ['Phân tích mô tả công việc và yêu cầu tuyển dụng', 'So sánh năng lực hiện tại với yêu cầu nghề', 'Lập kế hoạch phát triển kĩ năng thiếu hụt'],
    [
      { h: 'Đọc và phân tích JD (Job Description)' },
      { p: 'Mô tả công việc thường gồm: tiêu đề vị trí, trách nhiệm chính, yêu cầu học vấn/kinh nghiệm, kĩ năng cứng, kĩ năng mềm và phúc lợi.' },
      { h: 'Gap Analysis — Phân tích khoảng cách' },
      { ul: ['Liệt kê yêu cầu nghề mục tiêu', 'Tự đánh giá năng lực hiện tại theo từng yêu cầu', 'Xác định khoảng cách cần lấp đầy', 'Lên kế hoạch học/thực tập/rèn luyện'] },
      { h: 'Nguồn thông tin nghề nghiệp' },
      { p: 'LinkedIn, VietnamWorks, JobStreet, O*NET (Mỹ), bản mô tả nghề của Bộ LĐTBXH, phỏng vấn người đang làm nghề đó.' },
      { note: 'Thực tập và làm thêm là cách tốt nhất để xác minh liệu nghề đó có thực sự phù hợp với bạn không.' },
    ],
    [
      { q: 'Tại sao kĩ năng mềm ngày càng được nhà tuyển dụng coi trọng?', a: 'Vì kĩ năng cứng có thể đào tạo được, nhưng kĩ năng mềm như giao tiếp, làm việc nhóm, thích ứng rất khó dạy và quyết định hiệu quả làm việc lâu dài.' },
      { q: 'Informational interview là gì và tại sao hữu ích?', a: 'Là cuộc trò chuyện với người đang làm nghề bạn quan tâm để hỏi về kinh nghiệm thực tế — giúp bạn hiểu nghề sâu hơn mà không cần đã được nhận việc.' },
    ]
  ),
  'H12HDTN-w10-quiz': L(
    'Quyết định lựa chọn nghề nghiệp',
    'Quyết định nghề nghiệp là một trong những lựa chọn quan trọng nhất — cần cân nhắc kĩ lưỡng và có hệ thống.',
    ['Áp dụng mô hình ra quyết định có hệ thống', 'Cân bằng đam mê, năng lực và nhu cầu thị trường', 'Chấp nhận rằng quyết định có thể điều chỉnh'],
    [
      { h: 'Mô hình Ikigai' },
      { p: 'Ikigai (lí do tồn tại) là giao điểm của 4 yếu tố: điều bạn yêu thích, điều bạn giỏi, điều thế giới cần và điều người ta sẵn sàng trả tiền.' },
      { h: 'Ra quyết định có hệ thống' },
      { ul: ['Liệt kê các phương án nghề nghiệp (ít nhất 3)', 'Đánh giá từng phương án theo tiêu chí: thu nhập, phát triển, phù hợp giá trị, cân bằng cuộc sống', 'Tham khảo ý kiến tư vấn hướng nghiệp', 'Lên kế hoạch hành động cho phương án chọn'] },
      { h: 'Linh hoạt trong quyết định' },
      { p: 'Quyết định nghề nghiệp không phải là mãi mãi — trung bình người Việt thay đổi nghề 3–5 lần trong đời. Quan trọng là bắt đầu và học từ kinh nghiệm thực tế.' },
      { note: 'Tránh hai cực đoan: chọn hoàn toàn theo cha mẹ mà không có ý kiến riêng, hoặc chọn chỉ vì xu hướng mà không phù hợp bản thân.' },
    ],
    [
      { q: 'Làm sao khi đam mê và thu nhập mâu thuẫn?', a: 'Xem xét liệu có thể phát triển đam mê thành nghề bằng cách nâng cao kĩ năng; hoặc chọn nghề thu nhập tốt và phát triển đam mê như hoạt động phụ trước khi chuyển hẳn.' },
      { q: 'Cha mẹ phản đối lựa chọn nghề của mình thì sao?', a: 'Trình bày kế hoạch cụ thể, dẫn chứng thực tế về triển vọng nghề, lắng nghe lo lắng của cha mẹ và tìm điểm chung — thường họ lo lắng về sự ổn định chứ không phải phản đối đam mê.' },
    ]
  ),
  'H12HDTN-w11-quiz': L(
    'Chọn trường đại học, cao đẳng, trường nghề phù hợp',
    'Lựa chọn cơ sở đào tạo phù hợp là bước đi quan trọng trong hành trình học tập và phát triển nghề nghiệp.',
    ['So sánh các loại hình cơ sở đào tạo', 'Đánh giá tiêu chí chọn trường', 'Hiểu quy trình và thời hạn xét tuyển'],
    [
      { h: 'Các loại hình cơ sở đào tạo' },
      { ul: ['Đại học: 4–5 năm, thiên về lí thuyết và nghiên cứu', 'Cao đẳng: 2–3 năm, thực hành nhiều hơn, ra trường nhanh hơn', 'Trường nghề/TCCN: 1–2 năm, kĩ năng nghề cụ thể, gắn doanh nghiệp', 'Du học: cơ hội quốc tế, học bổng, chi phí cao hơn'] },
      { h: 'Tiêu chí chọn trường' },
      { p: 'Xét: chất lượng đào tạo (xếp hạng, kiểm định), tỉ lệ có việc làm sau ra trường, học phí và học bổng, vị trí địa lí, môi trường học tập và mạng lưới cựu sinh viên.' },
      { h: 'Thông tin xét tuyển' },
      { p: 'Tra cứu điểm chuẩn các năm trước, phương thức xét tuyển (điểm thi THPT, học bạ, đánh giá năng lực), thời hạn nộp hồ sơ trên Cổng thông tin tuyển sinh Bộ GD&ĐT.' },
      { note: 'Thăm quan thực tế hoặc tham gia ngày hội tuyển sinh là cách tốt nhất để cảm nhận không khí trường trước khi quyết định.' },
    ],
    [
      { q: 'Có nên chọn trường danh tiếng dù ngành không phù hợp không?', a: 'Không nên — phù hợp ngành với mục tiêu nghề nghiệp quan trọng hơn thương hiệu trường; học chương trình phù hợp giúp bạn thành công thực sự hơn.' },
      { q: 'Cao đẳng hay đại học tốt hơn?', a: 'Tùy mục tiêu — cao đẳng phù hợp nếu muốn ra trường sớm, thực hành nhiều và có thể liên thông lên đại học sau; đại học phù hợp nếu muốn nghiên cứu hoặc vị trí quản lí chuyên môn.' },
    ]
  ),
  'H12HDTN-w12-quiz': L(
    'Hồ sơ và quy chế tuyển sinh đại học, cao đẳng',
    'Nắm vững quy chế và quy trình tuyển sinh giúp bạn tránh sai sót và tối đa hóa cơ hội trúng tuyển.',
    ['Hiểu quy chế tuyển sinh hiện hành', 'Chuẩn bị hồ sơ đăng kí xét tuyển đầy đủ', 'Tránh các lỗi phổ biến trong hồ sơ'],
    [
      { h: 'Quy chế tuyển sinh' },
      { p: 'Bộ GD&ĐT quy định các phương thức: xét điểm thi THPT, xét học bạ, xét kết quả thi đánh giá năng lực (ĐHQG), tuyển thẳng. Mỗi trường có thể kết hợp nhiều phương thức.' },
      { h: 'Hồ sơ xét tuyển thường gồm' },
      { ul: ['Học bạ THPT (thường học kì 1 lớp 12 và các năm trước)', 'Giấy chứng nhận tốt nghiệp THPT hoặc bằng tốt nghiệp', 'Phiếu đăng kí xét tuyển (online qua hệ thống tuyển sinh)', 'Minh chứng ưu tiên (nếu có): hộ khẩu, giấy tờ diện ưu tiên'] },
      { h: 'Lưu ý quan trọng' },
      { p: 'Kiểm tra kĩ hạn chót nộp hồ sơ, điều kiện xét học bổng, và chính sách đăng kí nhiều nguyện vọng. Sắp xếp nguyện vọng theo thứ tự ưu tiên thực sự.' },
      { note: 'Lưu bản sao tất cả tài liệu quan trọng. Theo dõi thông báo kết quả qua email và SMS đã đăng kí.' },
    ],
    [
      { q: 'Nên đăng kí bao nhiêu nguyện vọng?', a: 'Tối thiểu 3–5 nguyện vọng từ cao đến thấp — nguyện vọng đầu là mơ ước, giữa là khả năng, cuối là chắc ăn — để tăng xác suất trúng tuyển.' },
      { q: 'Điểm ưu tiên khu vực ảnh hưởng thế nào?', a: 'Thí sinh ở khu vực ưu tiên được cộng điểm vào tổng điểm xét tuyển, giúp tăng cơ hội trúng tuyển các trường có điểm chuẩn cao.' },
    ]
  ),
  'H12HDTN-w13-quiz': L(
    'Kĩ năng viết hồ sơ xin việc (CV) cơ bản',
    'CV chuyên nghiệp là cánh cửa đầu tiên vào thị trường lao động — biết viết tốt giúp bạn tạo ấn tượng ngay từ đầu.',
    ['Hiểu cấu trúc CV chuẩn', 'Viết CV ấn tượng và phù hợp vị trí', 'Tránh các lỗi phổ biến khi viết CV'],
    [
      { h: 'Cấu trúc CV chuẩn' },
      { ul: ['Thông tin cá nhân (tên, liên hệ, LinkedIn)', 'Tóm tắt chuyên nghiệp (2–3 câu)', 'Học vấn (mới nhất trước)', 'Kinh nghiệm làm việc/thực tập', 'Kĩ năng (cứng và mềm)', 'Hoạt động ngoại khóa và giải thưởng', 'Sở thích (tùy chọn)'] },
      { h: 'Nguyên tắc viết CV' },
      { p: 'Dùng động từ mạnh, số liệu cụ thể (tăng 20%, quản lí đội 5 người), điều chỉnh theo từng vị trí ứng tuyển, giữ trong 1 trang cho người mới ra trường.' },
      { h: 'Lỗi phổ biến' },
      { ul: ['Lỗi chính tả và ngữ pháp', 'Thông tin quá chung chung, thiếu cụ thể', 'Dùng mẫu CV không phù hợp ngành', 'Ảnh không chuyên nghiệp', 'Email không chuyên nghiệp (vd: cuteboy2005@...)'] },
      { note: 'Luôn đọc lại CV ít nhất 2 lần trước khi gửi, và nhờ người khác xem xét.' },
    ],
    [
      { q: 'Nên dùng CV dạng đồ họa hay văn bản đơn giản?', a: 'Phụ thuộc ngành — ngành sáng tạo (thiết kế, marketing) ủng hộ CV đồ họa; ngành tài chính, luật, kĩ thuật thường ưa CV truyền thống, dễ đọc bởi phần mềm ATS.' },
      { q: 'ATS là gì và tại sao quan trọng?', a: 'ATS (Applicant Tracking System) là phần mềm công ty dùng để lọc CV theo từ khóa — CV phải chứa các từ khóa trong mô tả công việc để không bị loại tự động.' },
    ]
  ),
  'H12HDTN-w14-quiz': L(
    'Kĩ năng phỏng vấn xin việc cơ bản',
    'Phỏng vấn là bước quyết định — chuẩn bị kĩ lưỡng giúp bạn thể hiện tốt nhất năng lực và sự phù hợp với vị trí.',
    ['Chuẩn bị trước phỏng vấn hiệu quả', 'Trả lời câu hỏi phỏng vấn phổ biến bằng phương pháp STAR', 'Xử lí tình huống khó và đặt câu hỏi lại'],
    [
      { h: 'Chuẩn bị trước phỏng vấn' },
      { ul: ['Nghiên cứu kĩ công ty và vị trí ứng tuyển', 'Ôn lại CV và chuẩn bị ví dụ cụ thể', 'Chuẩn bị câu hỏi để hỏi lại nhà tuyển dụng', 'Chuẩn bị trang phục phù hợp văn hóa công ty'] },
      { h: 'Phương pháp STAR' },
      { p: 'STAR: Situation (tình huống) → Task (nhiệm vụ) → Action (hành động bạn đã thực hiện) → Result (kết quả đạt được). Dùng để trả lời câu hỏi hành vi như "Kể về lần bạn xử lí xung đột..."' },
      { h: 'Câu hỏi phổ biến' },
      { ul: ['"Hãy giới thiệu về bản thân" — tóm tắt 2 phút về điểm mạnh liên quan vị trí', '"Điểm yếu của bạn là gì?" — chọn điểm yếu thật nhưng đang cải thiện', '"Tại sao muốn làm ở đây?" — nghiên cứu kĩ và nêu lí do cụ thể'] },
      { note: 'Sau phỏng vấn, gửi email cảm ơn trong vòng 24 giờ — thể hiện sự chuyên nghiệp và duy trì ấn tượng tốt.' },
    ],
    [
      { q: 'Làm sao xử lí câu hỏi về mức lương kì vọng?', a: 'Nghiên cứu mức lương thị trường trước, đưa ra khoảng (vd: 8–12 triệu) thay vì con số cố định, và giải thích dựa trên giá trị bạn mang lại.' },
      { q: 'Nên hỏi gì khi được hỏi "Bạn có câu hỏi gì không?"?', a: 'Hỏi về kì vọng trong 90 ngày đầu, cơ hội phát triển, văn hóa đội nhóm — tránh hỏi về lương/phúc lợi ngay buổi phỏng vấn đầu tiên.' },
    ]
  ),
  'H12HDTN-w15-quiz': L(
    'Lập kế hoạch học tập và rèn luyện cho kì thi tốt nghiệp',
    'Kế hoạch học tập khoa học giúp bạn ôn tập hiệu quả và vào phòng thi với tâm thế tự tin.',
    ['Phân tích cấu trúc đề thi THPT quốc gia', 'Lập kế hoạch ôn tập cá nhân hóa', 'Áp dụng kĩ thuật học tập hiệu quả'],
    [
      { h: 'Phân tích cấu trúc đề thi' },
      { p: 'Nắm rõ: số môn thi, thời gian làm bài từng môn, tỉ lệ điểm theo mức độ nhận thức (nhận biết/thông hiểu/vận dụng/vận dụng cao), dạng câu hỏi phổ biến.' },
      { h: 'Lập kế hoạch ôn tập' },
      { ul: ['Đánh giá điểm xuất phát từng môn', 'Ưu tiên môn yếu và môn xét tuyển', 'Phân bổ thời gian theo tuần: học mới → ôn lại → luyện đề', 'Đặt mốc kiểm tra tiến độ hàng tuần'] },
      { h: 'Kĩ thuật học hiệu quả' },
      { p: 'Spaced repetition (ôn cách quãng), active recall (tự kiểm tra không nhìn tài liệu), Pomodoro (25 phút tập trung/5 phút nghỉ), giải đề thi thử tính giờ.' },
      { note: 'Giữ thể chất và tinh thần tốt không kém gì học — ngủ đủ giấc, ăn uống lành mạnh và tập thể dục nhẹ giúp não tiếp thu tốt hơn.' },
    ],
    [
      { q: 'Nên học nhóm hay học một mình?', a: 'Cả hai có ích — học một mình để tập trung và tự kiểm tra; học nhóm để giải thích cho nhau (dạy người khác là cách học tốt nhất) và giữ động lực.' },
      { q: 'Bao lâu trước kì thi nên bắt đầu ôn tập?', a: 'Lí tưởng là 3–4 tháng với kế hoạch từng giai đoạn; không nên ôn dồn vào tuần cuối vì trí nhớ cần thời gian củng cố.' },
    ]
  ),
  'H12HDTN-w16-quiz': L(
    'Sẵn sàng thích ứng môi trường học tập, lao động mới',
    'Chuyển từ THPT lên đại học hoặc đi làm là bước nhảy lớn — chuẩn bị tâm lí và kĩ năng thích ứng giúp bạn vượt qua dễ dàng hơn.',
    ['Nhận biết những thay đổi lớn khi chuyển giai đoạn', 'Phát triển tư duy tăng trưởng (growth mindset)', 'Xây dựng chiến lược thích ứng môi trường mới'],
    [
      { h: 'Những thay đổi khi chuyển giai đoạn' },
      { ul: ['Tự quản lí thời gian không có ai nhắc nhở', 'Khối lượng học/làm tăng đột biến', 'Môi trường xã hội và văn hóa mới', 'Trách nhiệm tài chính có thể tăng lên', 'Phải tự đưa ra nhiều quyết định hơn'] },
      { h: 'Tư duy tăng trưởng' },
      { p: 'Carol Dweck: tư duy cố định cho rằng năng lực là bẩm sinh; tư duy tăng trưởng tin rằng năng lực có thể phát triển qua nỗ lực. Người có tư duy tăng trưởng đón nhận thử thách và học từ thất bại.' },
      { h: 'Chiến lược thích ứng' },
      { ul: ['Chủ động tìm kiếm thông tin và hỗ trợ', 'Xây dựng thói quen mới dần dần', 'Kết nối với người đi trước (mentor, cựu sinh viên)', 'Cho phép bản thân mắc lỗi và học từ đó'] },
      { note: 'Khó khăn ban đầu là bình thường — hầu hết mọi người đều cảm thấy bỡ ngỡ khi bước vào môi trường mới.' },
    ],
    [
      { q: 'Tại sao một số học sinh giỏi ở THPT lại gặp khó khăn ở đại học?', a: 'Vì ở THPT có nhiều sự hỗ trợ cấu trúc từ thầy cô và cha mẹ; đại học đòi hỏi tự lập cao hơn, kĩ năng tự học và quản lí thời gian mà THPT chưa rèn nhiều.' },
      { q: 'Làm sao tránh "cú sốc văn hóa" khi đi làm?', a: 'Nghiên cứu văn hóa công ty trước, quan sát và học từ đồng nghiệp, đặt câu hỏi thay vì giả định, và thể hiện thái độ học hỏi cầu tiến.' },
    ]
  ),
  'H12HDTN-w17-quiz': L(
    'Rèn luyện sức khỏe và quản lí cảm xúc cuối cấp',
    'Áp lực cuối cấp có thể ảnh hưởng đến sức khỏe thể chất và tinh thần — biết cách chăm sóc bản thân là kĩ năng quan trọng.',
    ['Nhận biết dấu hiệu stress và burnout', 'Áp dụng chiến lược quản lí stress hiệu quả', 'Xây dựng thói quen chăm sóc sức khỏe toàn diện'],
    [
      { h: 'Nhận biết stress và burnout' },
      { p: 'Stress bình thường là phản ứng tạm thời trước áp lực. Burnout là kiệt sức kéo dài với cảm giác vô vọng và mất động lực — cần can thiệp kịp thời.' },
      { ul: ['Dấu hiệu thể chất: mệt mỏi kinh niên, đau đầu, rối loạn giấc ngủ', 'Dấu hiệu cảm xúc: lo âu, cáu kỉnh, buồn bã không lí do', 'Dấu hiệu hành vi: trốn tránh, năng suất giảm, cô lập'] },
      { h: 'Chiến lược quản lí stress' },
      { ul: ['Thở sâu và thiền định (5–10 phút/ngày)', 'Tập thể dục đều đặn (30 phút, 3–5 lần/tuần)', 'Ngủ đủ 7–9 tiếng mỗi đêm', 'Chia sẻ với người tin cậy hoặc chuyên viên tư vấn', 'Giới hạn thời gian mạng xã hội'] },
      { note: 'Tìm kiếm sự hỗ trợ chuyên nghiệp là dấu hiệu của sức mạnh, không phải yếu đuối — đừng ngại nói chuyện với chuyên viên tâm lí nếu cần.' },
    ],
    [
      { q: 'Tại sao ngủ đủ giấc quan trọng cho học tập?', a: 'Khi ngủ, não củng cố kí ức, loại bỏ độc tố tích tụ trong ngày và phục hồi khả năng tập trung — thiếu ngủ làm giảm nghiêm trọng hiệu suất học và thi.' },
      { q: 'Làm sao phân biệt stress tốt (eustress) và stress xấu (distress)?', a: 'Eustress tạo động lực và năng lượng tập trung vào mục tiêu; distress gây lo âu, làm tê liệt tư duy và kéo dài dai dẳng — cần các chiến lược đối phó tích cực.' },
    ]
  ),
  'H12HDTN-w18-quiz': L(
    'Ôn tập và tổng kết học kì I',
    'Nhìn lại học kì I giúp củng cố kiến thức, nhận ra điểm mạnh yếu và chuẩn bị tốt hơn cho học kì II.',
    ['Tổng kết kiến thức và kĩ năng học kì I', 'Đánh giá tiến bộ so với mục tiêu đề ra', 'Điều chỉnh kế hoạch cho học kì II'],
    [
      { h: 'Tổng kết học kì I' },
      { p: 'Xem lại tất cả chủ đề đã học trong HĐTN-HN học kì I: tự nhận thức, trưởng thành, tài chính, gia đình, hợp tác, cộng đồng, môi trường và khám phá nghề nghiệp.' },
      { h: 'Đánh giá tiến bộ' },
      { ul: ['Mục tiêu nào đã đạt?', 'Mục tiêu nào chưa đạt và lí do?', 'Kĩ năng nào đã cải thiện rõ nhất?', 'Bài học quý giá nhất từ học kì I là gì?'] },
      { h: 'Điều chỉnh kế hoạch' },
      { p: 'Dựa trên đánh giá, điều chỉnh kế hoạch học kì II: ưu tiên lại mục tiêu, áp dụng phương pháp mới cho điểm yếu, và giữ vững những gì đang hiệu quả.' },
      { note: 'Ôn tập không phải là nhìn lại thất bại mà là rút ra bài học để tiến bước hiệu quả hơn.' },
    ],
    [
      { q: 'Tại sao việc phản chiếu (reflection) quan trọng trong học tập?', a: 'Phản chiếu biến kinh nghiệm thành bài học — không suy nghĩ về trải nghiệm thì khó học được từ nó, dù thành công hay thất bại.' },
      { q: 'Nên làm gì nếu mục tiêu học kì I không đạt?', a: 'Phân tích nguyên nhân khách quan (hoàn cảnh) và chủ quan (hành vi, thái độ), điều chỉnh chiến lược và đặt lại mục tiêu thực tế hơn cho học kì II.' },
    ]
  ),
  'H12HDTN-w19-quiz': L(
    'Phát triển năng lực tự học và tự nghiên cứu',
    'Khả năng tự học là kĩ năng then chốt trong thế giới thông tin bùng nổ — người tự học hiệu quả có lợi thế lớn suốt đời.',
    ['Hiểu chu trình tự học hiệu quả', 'Áp dụng các công cụ và phương pháp tự học hiện đại', 'Phát triển thói quen học liên tục'],
    [
      { h: 'Chu trình tự học' },
      { p: 'Kolb: Trải nghiệm cụ thể → Quan sát phản chiếu → Khái niệm hóa trừu tượng → Thử nghiệm tích cực → (trở lại trải nghiệm mới). Áp dụng vào tự học: làm → suy nghĩ → rút ra nguyên tắc → thử lại.' },
      { h: 'Công cụ tự học hiện đại' },
      { ul: ['MOOCs: Coursera, edX, Khan Academy, Udemy', 'Podcast và audiobook khi di chuyển', 'Flashcard số: Anki cho ghi nhớ dài hạn', 'Mind map cho hệ thống hóa kiến thức', 'YouTube và blog chuyên môn'] },
      { h: 'Xây dựng thói quen học' },
      { p: 'Đặt thời gian cố định mỗi ngày cho học tập tự chủ (dù chỉ 20 phút), theo dõi tiến trình bằng nhật kí học tập và tham gia cộng đồng học cùng chủ đề.' },
      { note: 'Tự học hiệu quả cần mục tiêu rõ ràng — "học cho biết" ít hiệu quả hơn "học để làm được điều cụ thể".' },
    ],
    [
      { q: 'Làm sao đánh giá chất lượng nguồn học online?', a: 'Kiểm tra: ai tạo ra (chuyên gia hay không), có cập nhật không, người học đánh giá thế nào, nội dung có dẫn nguồn không, và thử áp dụng xem có hiệu quả không.' },
      { q: 'Tại sao "dạy người khác" là phương pháp học tốt nhất?', a: 'Khi giải thích cho người khác, bạn buộc phải tổ chức kiến thức rõ ràng, nhận ra chỗ mình chưa hiểu và củng cố thông tin — gọi là hiệu ứng Protégé.' },
    ]
  ),
  'H12HDTN-w20-quiz': L(
    'Xây dựng và phát triển mạng lưới quan hệ (networking)',
    'Networking không phải là "làm quen để lợi dụng" mà là xây dựng mối quan hệ chân thành mang lại giá trị cho cả hai bên.',
    ['Hiểu đúng bản chất và giá trị của networking', 'Thực hành kĩ năng gặp gỡ và duy trì quan hệ', 'Xây dựng thương hiệu cá nhân trực tuyến'],
    [
      { h: 'Networking là gì?' },
      { p: 'Networking là xây dựng mạng lưới quan hệ chuyên nghiệp và cá nhân — không phải thu thập danh thiếp mà là tạo kết nối có ý nghĩa dựa trên sự tôn trọng và trao đổi giá trị.' },
      { h: 'Kĩ năng thực hành' },
      { ul: ['Giới thiệu bản thân ngắn gọn hấp dẫn (elevator pitch 30 giây)', 'Đặt câu hỏi thể hiện quan tâm thực sự', 'Lắng nghe tích cực và ghi nhớ thông tin quan trọng', 'Theo dõi sau sự kiện bằng email hoặc LinkedIn'] },
      { h: 'Thương hiệu cá nhân online' },
      { p: 'LinkedIn là nền tảng chính: cập nhật hồ sơ đầy đủ, chia sẻ nội dung liên quan ngành, kết nối có chọn lọc và tương tác chân thành với nội dung của người khác.' },
      { note: 'Mạng lưới tốt nhất không phải lớn nhất mà là có chất lượng — 50 người thực sự biết và quý trọng bạn hơn 500 người chỉ có tên trong danh sách.' },
    ],
    [
      { q: 'Làm sao networking khi còn là học sinh và chưa có nhiều kinh nghiệm?', a: 'Bắt đầu từ thầy cô, cựu sinh viên, buổi hội thảo ngành; thể hiện sự học hỏi chân thành; tham gia câu lạc bộ chuyên ngành và cộng đồng online liên quan.' },
      { q: 'Tại sao giữ liên lạc quan trọng hơn số lần gặp đầu tiên?', a: 'Quan hệ chỉ tồn tại khi được duy trì — theo dõi định kì, chúc mừng thành công của đối phương và chia sẻ nội dung hữu ích giúp mối quan hệ sống và phát triển.' },
    ]
  ),
  'H12HDTN-w21-quiz': L(
    'Khởi nghiệp và tinh thần kinh doanh',
    'Tinh thần kinh doanh không chỉ dành cho người muốn lập công ty — nó là tư duy chủ động, sáng tạo và tạo ra giá trị có ích trong mọi lĩnh vực.',
    ['Phân biệt khởi nghiệp và tự kinh doanh', 'Hiểu vòng đời startup và tư duy lean', 'Phát triển tư duy khởi nghiệp trong học tập và công việc'],
    [
      { h: 'Khởi nghiệp là gì?' },
      { p: 'Khởi nghiệp (startup) là xây dựng doanh nghiệp mới có tiềm năng tăng trưởng nhanh. Tự kinh doanh (self-employment) là tạo nguồn thu nhập từ dịch vụ/sản phẩm cá nhân.' },
      { h: 'Tư duy Lean Startup' },
      { ul: ['Build: tạo sản phẩm tối giản (MVP)', 'Measure: đo phản ứng khách hàng thực tế', 'Learn: học từ dữ liệu và điều chỉnh', 'Lặp lại chu kì nhanh nhất có thể'] },
      { h: 'Tư duy khởi nghiệp trong cuộc sống' },
      { p: 'Dù không lập công ty, bạn vẫn cần: nhận biết vấn đề, tư duy giải pháp sáng tạo, chấp nhận rủi ro có tính toán, học nhanh từ thất bại và kiên trì theo đuổi mục tiêu.' },
      { note: 'Thất bại là một phần tất yếu của khởi nghiệp — điều quan trọng là "thất bại nhanh, học nhanh và điều chỉnh nhanh".' },
    ],
    [
      { q: 'MVP là gì và tại sao quan trọng?', a: 'MVP (Minimum Viable Product) là phiên bản tối thiểu có thể dùng được của sản phẩm — giúp kiểm tra ý tưởng với chi phí thấp nhất trước khi đầu tư nhiều hơn.' },
      { q: 'Học sinh có thể khởi nghiệp không?', a: 'Hoàn toàn có — nhiều startup thành công bắt đầu từ dự án sinh viên; quan trọng là giải quyết vấn đề thực sự, học từ người dùng và linh hoạt điều chỉnh.' },
    ]
  ),
  'H12HDTN-w22-quiz': L(
    'Đạo đức nghề nghiệp và văn hóa ứng xử',
    'Đạo đức nghề nghiệp là nền tảng xây dựng uy tín và sự nghiệp bền vững trong bất kì lĩnh vực nào.',
    ['Hiểu các nguyên tắc đạo đức nghề nghiệp cốt lõi', 'Nhận biết tình huống đạo đức khó xử và cách ứng xử', 'Xây dựng văn hóa ứng xử chuyên nghiệp'],
    [
      { h: 'Đạo đức nghề nghiệp' },
      { p: 'Bao gồm: trung thực và minh bạch, tôn trọng bảo mật thông tin, thực hiện đúng cam kết, tránh xung đột lợi ích và không phân biệt đối xử.' },
      { h: 'Tình huống đạo đức khó xử' },
      { ul: ['Biết đồng nghiệp vi phạm quy định — báo cáo hay im lặng?', 'Nhận lệnh làm điều không đúng từ cấp trên', 'Khách hàng yêu cầu vi phạm quy định', 'Biết thông tin nội bộ có thể mang lại lợi ích cá nhân'] },
      { h: 'Khung quyết định đạo đức' },
      { p: 'Trước quyết định khó: (1) Hành động này có hợp pháp không? (2) Có phù hợp với chính sách công ty không? (3) Nếu mọi người biết, mình có thoải mái không? Nếu bất kì câu nào là không → không làm.' },
      { note: 'Uy tín nghề nghiệp mất rất lâu để xây dựng nhưng có thể mất chỉ trong một quyết định sai — đạo đức là đầu tư dài hạn.' },
    ],
    [
      { q: 'Tại sao nên báo cáo vi phạm đạo đức dù rủi ro?', a: 'Im lặng trước vi phạm là đồng lõa ngầm; báo cáo bảo vệ tổ chức, đồng nghiệp và bản thân — nhiều tổ chức có cơ chế tố cáo bảo vệ người báo cáo.' },
      { q: 'Văn hóa công ty ảnh hưởng đến đạo đức như thế nào?', a: 'Văn hóa "cá nước nào bơi theo nước đó" có thể dẫn đến vi phạm đạo đức dù cá nhân có ý tốt — môi trường đạo đức lành mạnh cần lãnh đạo làm gương.' },
    ]
  ),
  'H12HDTN-w23-quiz': L(
    'Lao động và pháp luật lao động cơ bản',
    'Hiểu quyền và nghĩa vụ lao động giúp bạn tự bảo vệ và làm việc trong khuôn khổ pháp luật.',
    ['Nắm quyền cơ bản của người lao động', 'Hiểu hợp đồng lao động và các loại hình hợp đồng', 'Biết cách bảo vệ quyền lợi khi bị vi phạm'],
    [
      { h: 'Quyền cơ bản của người lao động (Bộ luật Lao động 2019)' },
      { ul: ['Làm việc theo hợp đồng lao động', 'Được trả lương đúng hạn và đúng mức tối thiểu', 'Nghỉ phép năm, nghỉ lễ theo quy định', 'Bảo hiểm xã hội, y tế, thất nghiệp', 'Môi trường làm việc an toàn', 'Không bị phân biệt đối xử'] },
      { h: 'Hợp đồng lao động' },
      { p: 'Các loại: HĐLĐ xác định thời hạn (dưới 36 tháng), HĐLĐ không xác định thời hạn. Đọc kĩ trước khi ký: lương, phụ cấp, thời gian làm việc, quy định nghỉ việc, điều khoản bảo mật.' },
      { h: 'Khi quyền bị vi phạm' },
      { p: 'Bước 1: Thương lượng trực tiếp với người sử dụng lao động. Bước 2: Hòa giải qua công đoàn hoặc hòa giải viên. Bước 3: Khiếu nại lên cơ quan lao động hoặc khởi kiện ra Tòa án.' },
      { note: 'Luôn yêu cầu hợp đồng văn bản — thỏa thuận miệng rất khó chứng minh khi có tranh chấp.' },
    ],
    [
      { q: 'Thử việc có được trả lương không?', a: 'Có — lương thử việc phải ít nhất 85% mức lương chính thức theo Bộ luật Lao động 2019; thời gian thử việc không quá 180 ngày với vị trí quản lí.' },
      { q: 'Bảo hiểm xã hội mang lại quyền lợi gì?', a: 'Hưu trí, ốm đau, thai sản, tai nạn lao động/bệnh nghề nghiệp và tử tuất — đây là quyền lợi dài hạn rất quan trọng, không nên để chủ sử dụng tránh đóng.' },
    ]
  ),
  'H12HDTN-w24-quiz': L(
    'An toàn lao động và sức khỏe nghề nghiệp',
    'An toàn lao động không chỉ là quy định pháp lí mà còn là trách nhiệm bảo vệ bản thân và đồng nghiệp.',
    ['Nhận biết các nguy cơ an toàn lao động phổ biến', 'Hiểu quyền từ chối công việc nguy hiểm', 'Thực hành văn hóa an toàn tại nơi làm việc'],
    [
      { h: 'Nguy cơ an toàn lao động' },
      { ul: ['Vật lí: tiếng ồn, rung động, nhiệt độ cực đoan, bức xạ', 'Hóa học: hóa chất độc hại, bụi ngành', 'Sinh học: vi khuẩn, nấm mốc trong môi trường y tế, nông nghiệp', 'Tâm lí: stress kéo dài, bắt nạt tại nơi làm việc (workplace bullying)', 'Cơ học: máy móc, vật nặng, làm việc trên cao'] },
      { h: 'Quyền của người lao động về an toàn' },
      { p: 'Người lao động có quyền: được cung cấp thiết bị bảo hộ cá nhân (PPE), được đào tạo an toàn, từ chối công việc có nguy cơ nghiêm trọng mà không bị trừng phạt, báo cáo tai nạn và bệnh nghề nghiệp.' },
      { h: 'Văn hóa an toàn' },
      { p: 'Tổ chức an toàn không chỉ có quy định mà có văn hóa — mọi người chủ động báo cáo nguy cơ, không bỏ qua vi phạm nhỏ và coi an toàn là trách nhiệm chung.' },
      { note: 'Hầu hết tai nạn lao động là có thể phòng ngừa — cần nhận biết nguy cơ trước khi nó xảy ra.' },
    ],
    [
      { q: 'Ergonomics là gì và tại sao quan trọng với dân văn phòng?', a: 'Ergonomics là khoa học thiết kế môi trường làm việc phù hợp với cơ thể người — bàn ghế đúng tư thế, màn hình đúng tầm mắt giúp phòng đau lưng, mỏi cổ và chấn thương lặp lại.' },
      { q: 'Bullying tại nơi làm việc gồm những hành vi nào?', a: 'Cô lập, chỉ trích công khai liên tục, giao việc vô lí hoặc không giao việc gì, lan truyền tin đồn — bất kì hành vi có hệ thống nào gây tổn hại tâm lí cho người khác.' },
    ]
  ),
  'H12HDTN-w25-quiz': L(
    'Bảo vệ môi trường tự nhiên và đa dạng sinh học',
    'Đa dạng sinh học là nền tảng của sự sống trên Trái Đất — mỗi loài mất đi có thể gây ra hiệu ứng dây chuyền không lường trước.',
    ['Hiểu khái niệm và tầm quan trọng của đa dạng sinh học', 'Nhận biết nguyên nhân và hệ quả của mất đa dạng sinh học', 'Hành động bảo vệ đa dạng sinh học trong cuộc sống'],
    [
      { h: 'Đa dạng sinh học' },
      { p: 'Đa dạng sinh học gồm: đa dạng gen (trong một loài), đa dạng loài (giữa các loài) và đa dạng hệ sinh thái (rừng, san hô, đầm lầy...). Việt Nam là một trong 16 nước có đa dạng sinh học cao nhất thế giới.' },
      { h: 'Nguyên nhân mất đa dạng sinh học' },
      { ul: ['Mất và suy thoái môi trường sống (phá rừng, ô nhiễm)', 'Khai thác quá mức (đánh bắt, săn bắt, buôn bán động vật hoang dã)', 'Loài xâm lấn cạnh tranh với loài bản địa', 'Biến đổi khí hậu thay đổi điều kiện sống', 'Ô nhiễm đất, nước, không khí'] },
      { h: 'Hành động bảo vệ' },
      { p: 'Không mua sản phẩm từ động vật hoang dã, ủng hộ thực phẩm hữu cơ và nông nghiệp bền vững, tham gia trồng cây, tuyên truyền trong cộng đồng và ủng hộ chính sách bảo tồn.' },
      { note: 'Mất một loài không chỉ là bi kịch sinh thái mà còn mất cơ hội khoa học — nhiều thuốc từ thực vật/động vật chưa được nghiên cứu đã tuyệt chủng.' },
    ],
    [
      { q: 'Tại sao mất loài thụ phấn (ong, bướm) ảnh hưởng đến con người?', a: 'Khoảng 75% cây trồng thực phẩm phụ thuộc vào thụ phấn của côn trùng — mất chúng đe dọa nguồn cung thực phẩm toàn cầu và an ninh lương thực.' },
      { q: 'Buôn bán động vật hoang dã ảnh hưởng gì đến dịch bệnh?', a: 'Nhiều dịch bệnh (COVID-19, Ebola, SARS) có nguồn gốc từ động vật hoang dã — buôn bán và tiêu thụ chúng tạo điều kiện virus nhảy sang người.' },
    ]
  ),
  'H12HDTN-w26-quiz': L(
    'Quản lí thời gian và hiệu suất cá nhân',
    'Quản lí thời gian hiệu quả là siêu năng lực trong thế giới đầy xao nhãng — không phải làm nhiều hơn mà là làm đúng việc.',
    ['Phân biệt khẩn cấp và quan trọng', 'Áp dụng các công cụ quản lí thời gian', 'Xây dựng hệ thống năng suất cá nhân bền vững'],
    [
      { h: 'Ma trận Eisenhower' },
      { p: 'Phân loại công việc theo 2 trục: khẩn cấp/không khẩn cấp và quan trọng/không quan trọng → 4 ô: Làm ngay (Q1), Lên kế hoạch (Q2), Ủy thác (Q3), Loại bỏ (Q4). Người hiệu quả dành nhiều thời gian ở Q2.' },
      { h: 'Công cụ và kĩ thuật' },
      { ul: ['Danh sách việc cần làm (to-do list) có ưu tiên', 'Time blocking: phân khung giờ cho từng loại công việc', 'Kĩ thuật 2 phút: nếu làm xong trong 2 phút thì làm ngay', 'Batch processing: gom các việc tương tự làm cùng lúc', 'Giờ vàng: dành thời gian năng lượng cao nhất cho việc quan trọng nhất'] },
      { h: 'Chống xao nhãng' },
      { p: 'Tắt thông báo không cần thiết, tạo môi trường làm việc tập trung, dùng Forest/website blocker khi cần, và thực hành "đơn nhiệm" thay vì đa nhiệm.' },
      { note: 'Năng suất không phải bận rộn — người bận rộn nhất không phải luôn là người hiệu quả nhất.' },
    ],
    [
      { q: 'Tại sao đa nhiệm (multitasking) thực ra kém hiệu quả?', a: 'Não người không thực sự làm nhiều việc cùng lúc mà chuyển đổi nhanh giữa các nhiệm vụ — mỗi lần chuyển mất thời gian khởi động lại và tăng tỉ lệ lỗi.' },
      { q: '"Ăn con ếch" (eat the frog) có nghĩa gì trong quản lí thời gian?', a: 'Làm việc khó, quan trọng nhất (con ếch) đầu tiên trong ngày — khi đã hoàn thành, phần còn lại của ngày cảm thấy dễ dàng hơn và không có nỗi lo kéo dài.' },
    ]
  ),
  'H12HDTN-w27-quiz': L(
    'Ứng dụng công nghệ và chuyển đổi số trong nghề nghiệp',
    'Chuyển đổi số đang tái định hình mọi ngành nghề — biết ứng dụng công nghệ đúng cách là lợi thế cạnh tranh quan trọng.',
    ['Hiểu xu hướng chuyển đổi số trong các ngành', 'Nắm các công nghệ nền tảng của thời đại số', 'Phát triển tư duy và kĩ năng số'],
    [
      { h: 'Công nghệ nền tảng thời đại số' },
      { ul: ['AI & Machine Learning: tự động hóa, phân tích dữ liệu, cá nhân hóa', 'Cloud Computing: lưu trữ và xử lí dữ liệu từ xa', 'Big Data: phân tích lượng dữ liệu khổng lồ để ra quyết định', 'IoT: kết nối thiết bị vật lí với internet', 'Blockchain: bảo mật và minh bạch giao dịch'] },
      { h: 'Chuyển đổi số theo ngành' },
      { p: 'Y tế: telemedicine, AI chẩn đoán hình ảnh. Giáo dục: e-learning, học cá nhân hóa. Tài chính: fintech, thanh toán số. Nông nghiệp: nông nghiệp chính xác, IoT. Bán lẻ: thương mại điện tử, omnichannel.' },
      { h: 'Kĩ năng số cần thiết' },
      { ul: ['Data literacy: đọc và hiểu dữ liệu cơ bản', 'Bảo mật thông tin cá nhân', 'Sử dụng công cụ cộng tác số', 'Tư duy phê phán với thông tin online', 'Học công cụ AI hỗ trợ công việc'] },
      { note: 'Không cần là lập trình viên để hưởng lợi từ công nghệ — hiểu công nghệ làm gì và biết khi nào dùng nó là đủ cho hầu hết nghề nghiệp.' },
    ],
    [
      { q: 'Prompt engineering là gì và tại sao hữu ích?', a: 'Là kĩ năng viết câu lệnh (prompt) cho AI để nhận được kết quả tốt nhất — người biết hướng dẫn AI hiệu quả có thể tăng năng suất đáng kể trong nhiều công việc.' },
      { q: 'Chuyển đổi số tạo ra và xóa bỏ việc làm như thế nào?', a: 'Xóa bỏ việc lặp lại (data entry, một số dịch vụ khách hàng); tạo ra việc mới (quản lí AI, phân tích dữ liệu, thiết kế trải nghiệm người dùng) và biến đổi nhiều việc hiện có.' },
    ]
  ),
  'H12HDTN-w28-quiz': L(
    'Tự đánh giá và điều chỉnh kế hoạch nghề nghiệp',
    'Kế hoạch nghề nghiệp không phải bản vẽ cứng nhắc mà là la bàn linh hoạt — cần thường xuyên xem lại và điều chỉnh.',
    ['Thực hiện tự đánh giá nghề nghiệp định kì', 'Nhận biết dấu hiệu cần điều chỉnh kế hoạch', 'Cập nhật kế hoạch theo bối cảnh thay đổi'],
    [
      { h: 'Đánh giá kế hoạch nghề nghiệp' },
      { p: 'Mỗi 6 tháng–1 năm, xem lại: tiến độ so với mục tiêu, thay đổi trong giá trị và ưu tiên cá nhân, thay đổi trong thị trường lao động và các cơ hội mới xuất hiện.' },
      { h: 'Dấu hiệu cần điều chỉnh' },
      { ul: ['Không còn hứng thú với nghề đã chọn', 'Ngành có thay đổi lớn (AI tự động hóa nhiều việc)', 'Cơ hội tốt hơn xuất hiện phù hợp hơn với giá trị mới', 'Sức khỏe hoặc hoàn cảnh gia đình thay đổi', 'Phát hiện ra tài năng/đam mê mới'] },
      { h: 'Điều chỉnh có kế hoạch' },
      { p: 'Pivot (chuyển hướng) trong nghề nghiệp thành công cần: phân tích kĩ lưỡng, thử nghiệm nhỏ trước (side project, thực tập), xây dựng kĩ năng chuyển tiếp và có kế hoạch tài chính dự phòng.' },
      { note: 'Trung thành với mục tiêu dài hạn (giá trị và tác động muốn tạo ra), nhưng linh hoạt về con đường đến đó.' },
    ],
    [
      { q: 'Khi nào nên bỏ một con đường nghề nghiệp đã chọn?', a: 'Khi đã thử đủ lâu và nghiêm túc (ít nhất 1–2 năm), đã tìm cách cải thiện nhưng vẫn không thấy phù hợp với giá trị cốt lõi của mình, và có hướng rõ ràng hơn phù hợp hơn.' },
      { q: 'Làm sao tránh "hội chứng cỏ xanh hơn ở vườn nhà người" khi muốn đổi nghề?', a: 'Nghiên cứu kĩ thực tế nghề mới (không chỉ phần hào nhoáng), nói chuyện với người đang làm, thử nghiệm nhỏ trước khi từ bỏ nghề hiện tại.' },
    ]
  ),
  'H12HDTN-w29-quiz': L(
    'Giữ gìn bản sắc văn hóa và hội nhập quốc tế',
    'Hội nhập thành công không có nghĩa là từ bỏ bản sắc — người tự tin về văn hóa gốc thường hội nhập quốc tế tốt hơn.',
    ['Hiểu bản sắc văn hóa và tại sao cần bảo tồn', 'Phát triển năng lực liên văn hóa (intercultural competence)', 'Cân bằng bản sắc dân tộc và công dân toàn cầu'],
    [
      { h: 'Bản sắc văn hóa' },
      { p: 'Bản sắc văn hóa là tổng thể các giá trị, truyền thống, ngôn ngữ và phong tục mà một cộng đồng chia sẻ và truyền lại qua các thế hệ. Đây là nguồn gốc tạo nên sự đa dạng phong phú của nhân loại.' },
      { h: 'Năng lực liên văn hóa' },
      { ul: ['Nhận thức văn hóa: hiểu rằng văn hóa định hình hành vi và giá trị', 'Kiến thức văn hóa: học về các nền văn hóa khác', 'Kĩ năng liên văn hóa: giao tiếp và hợp tác hiệu quả với người khác văn hóa', 'Thái độ: tôn trọng và cởi mở, không phán xét'] },
      { h: 'Cân bằng bản sắc và hội nhập' },
      { p: '"Văn hóa rễ" và "văn hóa cánh" — rễ văn hóa (ngôn ngữ, gia đình, truyền thống) cho bạn ổn định và bản sắc; cánh văn hóa (ngôn ngữ mới, kĩ năng toàn cầu) giúp bạn bay xa.' },
      { note: 'Biết ngoại ngữ và văn hóa quốc tế không có nghĩa là xấu hổ về văn hóa gốc — mà là làm phong phú thêm góc nhìn của mình.' },
    ],
    [
      { q: 'Làm sao tránh "sốc văn hóa ngược" khi về nước sau du học?', a: 'Chuẩn bị tâm lí rằng sự thay đổi của bản thân có thể gây bỡ ngỡ với người ở nhà; dành thời gian tái kết nối với cộng đồng và tìm cách áp dụng kiến thức quốc tế vào bối cảnh Việt Nam.' },
      { q: 'Tại sao người có bản sắc văn hóa mạnh thường hội nhập tốt hơn?', a: 'Bản sắc rõ ràng giúp họ tự tin giao tiếp về nguồn gốc, không bị nhầm lẫn về giá trị khi tiếp xúc văn hóa khác, và có điểm tựa vững chắc khi đối mặt với khác biệt.' },
    ]
  ),
  'H12HDTN-w30-quiz': L(
    'Tổng kết hành trình hướng nghiệp và quyết định cuối cùng',
    'Sau ba năm THPT khám phá và chuẩn bị, đây là lúc nhìn lại toàn bộ hành trình và xác nhận quyết định nghề nghiệp với sự tự tin.',
    ['Tổng kết quá trình tự khám phá và hướng nghiệp', 'Xác nhận hoặc điều chỉnh lần cuối quyết định nghề nghiệp', 'Viết tuyên ngôn nghề nghiệp cá nhân'],
    [
      { h: 'Nhìn lại hành trình' },
      { p: 'Từ lớp 10 (khám phá bản thân), lớp 11 (thử nghiệm và tham vấn), đến lớp 12 (quyết định và chuẩn bị) — mỗi bước đã giúp bạn hiểu rõ hơn về mình và thế giới nghề nghiệp.' },
      { h: 'Xác nhận quyết định' },
      { ul: ['Mình chọn ngành/nghề này vì lí do gì? (giá trị thực hay áp lực bên ngoài?)', 'Đã tìm hiểu đủ về thực tế nghề chưa?', 'Có kế hoạch dự phòng chưa?', 'Cha mẹ và người thân hiểu và ủng hộ không?'] },
      { h: 'Tuyên ngôn nghề nghiệp' },
      { p: 'Viết 3–5 câu: tôi là ai, tôi giỏi điều gì, tôi đam mê điều gì, tôi muốn đóng góp gì cho xã hội — đây là la bàn định hướng cho các quyết định nghề nghiệp tương lai.' },
      { note: 'Không có quyết định nghề nghiệp nào là hoàn hảo hay mãi mãi — điều quan trọng là có lí do chính đáng và sẵn sàng học hỏi trên con đường đã chọn.' },
    ],
    [
      { q: 'Tại sao viết tuyên ngôn nghề nghiệp có giá trị?', a: 'Buộc bạn minh bạch hóa giá trị và mục tiêu, giúp truyền đạt bản thân trong phỏng vấn và networking, và là điểm neo khi phải ra quyết định khó trong tương lai.' },
      { q: 'Kế hoạch dự phòng nghề nghiệp (Plan B) có cần thiết không?', a: 'Rất cần — không phải vì không tin vào Plan A, mà vì thị trường lao động không thể đoán trước hoàn toàn; Plan B giúp bạn quyết định mạo hiểm hơn vì biết có phương án thay thế.' },
    ]
  ),
  'H12HDTN-w31-quiz': L(
    'Dự án trải nghiệm hướng nghiệp tổng hợp',
    'Dự án hướng nghiệp tổng hợp là cơ hội áp dụng tất cả kiến thức và kĩ năng đã học vào một sản phẩm thực sự ý nghĩa.',
    ['Thiết kế và thực hiện dự án hướng nghiệp cá nhân', 'Áp dụng kĩ năng quản lí dự án', 'Trình bày và bảo vệ dự án trước nhóm'],
    [
      { h: 'Ý tưởng dự án hướng nghiệp' },
      { ul: ['Phỏng vấn chuyên sâu 3 người đang làm nghề mục tiêu', 'Thực hiện dự án mini trong lĩnh vực nghề quan tâm', 'Viết báo cáo phân tích ngành nghề chi tiết', 'Tạo portfolio cá nhân giới thiệu kĩ năng và kinh nghiệm', 'Tổ chức buổi chia sẻ hướng nghiệp cho bạn cùng lớp'] },
      { h: 'Quản lí dự án' },
      { p: 'Áp dụng chu trình PDCA: Plan (lên kế hoạch) → Do (thực hiện) → Check (kiểm tra) → Act (điều chỉnh). Đặt mốc thời gian cụ thể và theo dõi tiến độ hàng tuần.' },
      { h: 'Trình bày dự án' },
      { p: 'Cấu trúc: vấn đề/câu hỏi nghiên cứu → phương pháp → phát hiện → kết luận → bài học cá nhân. Dùng hình ảnh, biểu đồ minh họa. Trả lời câu hỏi tự tin và thành thật.' },
      { note: 'Quá trình thực hiện dự án quan trọng hơn sản phẩm cuối — những gì học được khi làm mới là giá trị thực sự.' },
    ],
    [
      { q: 'Portfolio là gì và nên đưa gì vào?', a: 'Portfolio là tập hợp bằng chứng về kĩ năng và kinh nghiệm: dự án đã làm, bài viết/thiết kế/code, giải thưởng, chứng chỉ, phản hồi từ người hướng dẫn — nên có cả quá trình chứ không chỉ kết quả.' },
      { q: 'Tại sao phỏng vấn người đang làm nghề lại có giá trị hơn đọc về nghề đó?', a: 'Người trong nghề chia sẻ thực tế hàng ngày (bao gồm cả những khó khăn thường bị che giấu), mạng lưới không chính thức và lời khuyên thực tế mà không sách vở nào có.' },
    ]
  ),
  'H12HDTN-w32-quiz': L(
    'Chuẩn bị tâm thế và kĩ năng cho kì thi quan trọng',
    'Vào phòng thi với tâm thế ổn định và chiến lược rõ ràng quan trọng không kém việc ôn tập đủ nội dung.',
    ['Hiểu tâm lí thi cử và quản lí lo âu', 'Áp dụng chiến lược làm bài thi hiệu quả', 'Chuẩn bị thể chất và tinh thần tối ưu'],
    [
      { h: 'Tâm lí thi cử' },
      { p: 'Lo âu thi cử ở mức vừa phải thực ra có lợi — tạo sự tập trung và nhanh nhẹn. Lo âu quá mức (test anxiety) cần được quản lí để không làm giảm hiệu suất.' },
      { h: 'Quản lí lo âu trước thi' },
      { ul: ['Chuẩn bị kĩ càng (sự tự tin thực sự)', 'Thở 4-7-8: hít vào 4 giây, giữ 7 giây, thở ra 8 giây', 'Hình dung tích cực (visualize) buổi thi thành công', 'Nói chuyện tử tế với bản thân (self-talk tích cực)', 'Ngủ đủ giấc đêm trước'] },
      { h: 'Chiến lược làm bài' },
      { p: 'Đọc toàn bộ đề trước khi làm, phân bổ thời gian theo điểm số, làm câu biết trước rồi quay lại câu khó, kiểm tra lại bài trước khi nộp.' },
      { note: 'Một kì thi không quyết định toàn bộ cuộc đời — nhưng chuẩn bị tốt giúp bạn thể hiện đúng năng lực thực sự của mình.' },
    ],
    [
      { q: 'Nên ôn tập như thế nào trong ngày cuối trước kì thi?', a: 'Nhẹ nhàng — ôn nhanh các điểm chính, nghỉ ngơi sớm để ngủ đủ giấc, chuẩn bị đồ dùng từ hôm trước và không học thêm kiến thức mới vào đêm hôm đó.' },
      { q: 'Nếu cảm thấy trống đầu (blank out) trong phòng thi thì làm gì?', a: 'Dừng lại, nhắm mắt thở sâu 3 hơi, chuyển sang câu khác và quay lại sau — não cần đôi khi được "reset" để tiếp cận thông tin đã học.' },
    ]
  ),
  'H12HDTN-w33-quiz': L(
    'Kĩ năng sống tự lập khi rời gia đình',
    'Rời nhà để học đại học hoặc đi làm là bước trưởng thành lớn — chuẩn bị kĩ năng sống tự lập giúp bạn tự tin và an toàn.',
    ['Nắm các kĩ năng sống độc lập thiết yếu', 'Tự quản lí cuộc sống hằng ngày', 'Xây dựng mạng lưới hỗ trợ khi xa nhà'],
    [
      { h: 'Kĩ năng sống thiết yếu' },
      { ul: ['Nấu ăn cơ bản: ít nhất 10 món đảm bảo dinh dưỡng', 'Giặt đồ, ủi đồ và giữ nhà sạch sẽ', 'Quản lí tài chính: ngân sách tháng, thanh toán hóa đơn', 'Sơ cứu cơ bản và nhận biết khi cần đi viện', 'Điều hướng giao thông và phương tiện công cộng'] },
      { h: 'Quản lí cuộc sống hằng ngày' },
      { p: 'Thiết lập thói quen: giờ giấc sinh hoạt ổn định, dọn dẹp định kì, mua sắm thực phẩm có kế hoạch, và dành thời gian cho sức khỏe thể chất tinh thần.' },
      { h: 'Mạng lưới hỗ trợ xa nhà' },
      { ul: ['Kết nối với bạn cùng phòng hoặc hàng xóm đáng tin', 'Tham gia câu lạc bộ, hội nhóm sinh viên', 'Giữ liên lạc đều đặn với gia đình', 'Biết địa chỉ cơ sở y tế, đồn công an gần nhất'] },
      { note: 'Cảm giác nhớ nhà (homesick) là hoàn toàn bình thường — cho phép mình cảm nhận và tìm cách kết nối với cộng đồng mới.' },
    ],
    [
      { q: 'Làm sao đặt ngân sách thực phẩm hợp lí khi sống xa nhà?', a: 'Lên thực đơn tuần trước khi mua sắm, ưu tiên thực phẩm tươi theo mùa (rẻ hơn và dinh dưỡng hơn), nấu số lượng lớn chia nhiều bữa, và hạn chế ăn ngoài.' },
      { q: 'Kí hợp đồng thuê nhà cần lưu ý gì?', a: 'Đọc kĩ điều khoản giá thuê, tiền đặt cọc, điều kiện chấm dứt hợp đồng, ai chịu phí tiện ích, quy định khách thăm, và chụp ảnh hiện trạng phòng trước khi dọn vào.' },
    ]
  ),
  'H12HDTN-w34-quiz': L(
    'Cam kết hành động và lộ trình phát triển bản thân',
    'Kết thúc THPT không phải kết thúc hành trình phát triển mà là khởi đầu của một chặng đường dài và thú vị hơn.',
    ['Viết cam kết hành động cụ thể cho giai đoạn tiếp theo', 'Xây dựng lộ trình phát triển bản thân 5 năm', 'Hiểu tầm quan trọng của học suốt đời'],
    [
      { h: 'Cam kết hành động' },
      { p: 'Cam kết hiệu quả cần: cụ thể (làm gì), đo được (như thế nào biết đạt), thời hạn (khi nào), và trách nhiệm giải trình (ai sẽ theo dõi). Chia sẻ cam kết với người bạn tin tưởng tăng xác suất thực hiện.' },
      { h: 'Lộ trình phát triển 5 năm' },
      { ul: ['Năm 1: thích ứng môi trường mới, xây nền tảng kĩ năng cốt lõi', 'Năm 2–3: tích lũy kinh nghiệm thực tế, xây dựng mạng lưới', 'Năm 4–5: chuyên sâu và tạo đóng góp có ý nghĩa trong lĩnh vực'] },
      { h: 'Học suốt đời' },
      { p: 'Trong thế giới thay đổi nhanh, kiến thức từ trường học chỉ là điểm bắt đầu — cam kết đọc sách, tham gia khóa học và phản chiếu thường xuyên là lợi thế cạnh tranh dài hạn.' },
      { note: 'Sự phát triển bền vững đến từ hành động nhỏ kiên trì mỗi ngày, không phải nỗ lực khổng lồ gián đoạn.' },
    ],
    [
      { q: 'Mentor là gì và làm sao tìm được người phù hợp?', a: 'Mentor là người đi trước trong lĩnh vực bạn quan tâm, sẵn sàng chia sẻ kinh nghiệm và hướng dẫn. Tìm qua mạng lưới trường học, alumni, LinkedIn hoặc sự kiện ngành — tiếp cận chân thành với câu hỏi cụ thể.' },
      { q: 'Tại sao có mục tiêu 5 năm nhưng vẫn cần linh hoạt theo năm?', a: 'Mục tiêu 5 năm cho phương hướng; kế hoạch năm cho hành động cụ thể thực tế hơn — thị trường và bản thân đều thay đổi, nên cần cập nhật thường xuyên mà không mất la bàn dài hạn.' },
    ]
  ),
  'H12HDTN-w35-quiz': L(
    'Tổng kết năm học và sẵn sàng vào đời',
    'Tuần cuối cùng của THPT — nhìn lại toàn bộ hành trình, trân trọng những gì đã đạt được và bước vào tương lai với tâm thế sẵn sàng.',
    ['Tổng kết toàn bộ hành trình THPT', 'Trân trọng và ghi nhớ những người đã đồng hành', 'Bước vào giai đoạn mới với tâm thế tự tin và biết ơn'],
    [
      { h: 'Nhìn lại hành trình THPT' },
      { p: 'Ba năm THPT là giai đoạn chuyển hóa quan trọng — từ học sinh phụ thuộc thành người trẻ tự chủ có định hướng. Ghi nhận cả thành công lẫn thất bại như những bài học quý giá.' },
      { h: 'Trân trọng những người đã đồng hành' },
      { ul: ['Thầy cô đã dạy dỗ và định hướng', 'Bạn bè đã chia sẻ vui buồn', 'Gia đình đã hỗ trợ và tin tưởng', 'Những người đã cho cơ hội thực tập và trải nghiệm'] },
      { h: 'Sẵn sàng vào đời' },
      { p: 'Bạn không cần biết mọi thứ để bắt đầu — cần: giá trị rõ ràng, tư duy học hỏi, khả năng thích ứng và sự dũng cảm thử điều mới. Những điều này bạn đã rèn luyện trong suốt THPT.' },
      { note: 'Hành trình phía trước sẽ có lúc khó khăn và bất ngờ — nhưng bạn đã được trang bị. Hãy tự tin bước vào đời!' },
    ],
    [
      { q: 'Làm sao giữ kết nối ý nghĩa với bạn bè THPT khi mọi người đi theo hướng khác nhau?', a: 'Chủ động giữ liên lạc định kì, tổ chức gặp mặt khi có cơ hội, chia sẻ thành công và hỏi thăm cuộc sống của nhau — tình bạn cần được nuôi dưỡng như mọi mối quan hệ.' },
      { q: 'Lời khuyên quan trọng nhất cho bản thân ở giai đoạn tiếp theo là gì?', a: 'Dũng cảm thử — sợ thất bại là cản trở lớn nhất; hầu hết hối tiếc trong cuộc sống đến từ điều không dám thử chứ không phải từ những gì đã thử và thất bại.' },
    ]
  ),

  'H12HDTN-w36-quiz': L(
    'Kết thúc HĐTN-HN 12 — Khép lại phổ thông, mở ra cuộc đời',
    'Đây là tuần cuối cùng của mười hai năm phổ thông. Từ đây, không còn thời khoá biểu nào được ai đó lập sẵn cho em — mọi lựa chọn đều là của em và hệ quả cũng vậy. Hãy cùng nhìn lại ba năm HĐTN-HN ở THPT và mang theo những gì cần thiết nhất để bước ra ngoài cánh cổng trường.',
    ['Hệ thống hoá lộ trình hướng nghiệp ba năm THPT và nội dung lớp 12.', 'Chuẩn bị tâm thế và kĩ năng cho giai đoạn sau tốt nghiệp: học tiếp, học nghề hoặc đi làm.', 'Xây dựng kế hoạch hành động cho 12 tháng đầu tiên sau THPT.'],
    [
      { h: 'Ba năm THPT nhìn lại' },
      { ul: [
        'Lớp 10 — KHÁM PHÁ RỘNG: hiểu tính cách, giá trị, năng lực; thử nhiều lĩnh vực; chưa chốt gì cả.',
        'Lớp 11 — TRẢI NGHIỆM SÂU: kiểm chứng sự phù hợp bằng trải nghiệm thật; tìm hiểu thông tin đào tạo; thu hẹp dần lựa chọn.',
        'Lớp 12 — QUYẾT ĐỊNH: chốt định hướng, chuẩn bị hồ sơ và nguyện vọng, rèn kĩ năng tự lập, sẵn sàng cho giai đoạn sau phổ thông.',
      ] },
      { h: 'Những gì HĐTN-HN 12 đã trang bị' },
      { ul: [
        'Ra quyết định nghề nghiệp có căn cứ: đối chiếu bản thân với yêu cầu nghề và thực tế thị trường lao động.',
        'Kĩ năng hồ sơ và tuyển sinh: đọc đề án tuyển sinh, hiểu phương thức xét tuyển, sắp xếp nguyện vọng theo nhóm ước mơ – vừa sức – an toàn.',
        'Kĩ năng sống tự lập: quản lí thời gian và tài chính, tự chăm sóc sức khoẻ, việc nhà cơ bản, xử lí tình huống khẩn cấp.',
        'Sức bền tinh thần: nhận diện và ứng phó với căng thẳng, thất bại và thay đổi — những thứ chắc chắn sẽ đến.',
      ] },
      { h: 'Ba điều cần mang theo' },
      { ul: [
        '"Một kì thi không phải cả cuộc đời." Kết quả tuyển sinh mở hoặc đóng một cánh cửa, nhưng không quyết định em trở thành người thế nào. Rất nhiều con đường dẫn tới cùng một đích.',
        '"Tự học là năng lực bền nhất." Kiến thức chuyên ngành sẽ lạc hậu, công cụ sẽ đổi, nghề nghiệp sẽ chuyển dạng. Khả năng tự học lại từ đầu là thứ duy nhất đi cùng em suốt đời.',
        '"Chủ động hơn chờ đợi." Cơ hội hiếm khi được trao cho người ngồi yên. Hỏi, thử, đề nghị, xin phản hồi — từ bây giờ không còn ai nhắc em làm những việc đó nữa.',
      ] },
      { h: 'Kế hoạch 12 tháng đầu sau THPT' },
      { ul: [
        'Ba tháng đầu: ổn định chỗ ở, nhịp sinh hoạt và tài chính; làm quen môi trường học tập hoặc làm việc mới.',
        'Sáu tháng đầu: xây dựng ít nhất hai mối quan hệ chất lượng trong môi trường mới; tìm một người đi trước để học hỏi.',
        'Trong năm đầu: bổ sung một kĩ năng mà môi trường mới đòi hỏi nhưng phổ thông chưa dạy; tham gia một hoạt động ngoài việc học hoặc việc làm chính.',
        'Cuối năm đầu: nhìn lại trung thực — hướng đi này có đúng như hình dung không, cần điều chỉnh gì. Điều chỉnh sớm rẻ hơn rất nhiều so với chịu đựng.',
      ] },
      { note: 'Kết thúc phổ thông không phải là đích đến mà là vạch xuất phát. Điều quan trọng không phải em bắt đầu từ đâu, mà là em có tiếp tục đi hay không.' },
    ],
    [
      { q: 'Nếu kết quả tuyển sinh không như mong muốn, em có những phương án nào?', a: 'Rất nhiều, và việc liệt kê trước sẽ giúp em bình tĩnh nếu tình huống đó xảy ra: xét tuyển bổ sung vào ngành hoặc trường khác; chọn ngành gần với ngành yêu thích rồi học thêm hoặc chuyển tiếp sau; học cao đẳng hoặc trường nghề với thời gian ngắn và cơ hội việc làm cụ thể; đi làm một thời gian để tích luỹ kinh nghiệm và tài chính rồi học tiếp; ôn lại và thi năm sau. Điều quan trọng là quyết định dựa trên tính toán chứ không phải trong lúc đang thất vọng nhất.' },
      { q: 'Em sắp sống xa nhà lần đầu. Hãy lập danh sách những kĩ năng cần rèn ngay trong hè này.', a: 'Nhóm sinh hoạt: nấu vài món cơ bản, giặt giũ, dọn dẹp, đi chợ và bảo quản thực phẩm. Nhóm tài chính: lập ngân sách tháng, ghi chép chi tiêu, phân biệt "cần" với "muốn", dự phòng khoản phát sinh. Nhóm hành chính: các loại giấy tờ tuỳ thân, bảo hiểm y tế, đăng kí tạm trú, sử dụng dịch vụ ngân hàng an toàn. Nhóm an toàn: số điện thoại khẩn cấp, xử lí khi ốm, nhận biết các hình thức lừa đảo nhắm vào sinh viên năm nhất.' },
      { q: 'Lời khuyên quan trọng nhất em muốn nhắn cho chính mình của một năm sau là gì?', a: 'Câu hỏi mở, không có đáp án đúng. Một câu trả lời sâu sắc thường chạm tới ba điều: dám thử dù chưa chắc thành công — phần lớn hối tiếc đến từ việc không dám thử chứ không phải từ thất bại; đừng so sánh tốc độ của mình với người khác, vì mỗi người xuất phát từ hoàn cảnh khác nhau; và giữ liên lạc với những người đã đồng hành cùng em ở phổ thông, vì các mối quan hệ cần được nuôi dưỡng chứ không tự tồn tại.' },
    ]
  ),
};
