// ============================================================
// Lớp 5 · TIN HỌC — Lý thuyết tuần (P5TIN_LESSONS)
// 35 tuần, key trùng id quiz: 'P5TIN-w01-quiz' … 'P5TIN-w35-quiz'.
// Bám CT GDPT 2018 môn Tin học Lớp 5.
// ============================================================

export const P5TIN_LESSONS = {
  'P5TIN-w01-quiz': {
    topic: 'Máy tính trong đời sống',
    intro: 'Máy tính có mặt ở khắp nơi quanh em: trường học, bệnh viện, ngân hàng, cửa hàng… Tuần này em tìm hiểu máy tính giúp con người làm gì và cách dùng máy tính sao cho khoẻ mạnh.',
    objectives: [
      'Kể được một số nơi và việc dùng máy tính trong đời sống.',
      'Nêu được lợi ích của máy tính: tính toán, lưu trữ, tìm thông tin.',
      'Biết giữ thói quen dùng máy tính an toàn cho sức khoẻ.',
    ],
    theory: [
      { h: 'Máy tính ở quanh em' },
      { p: 'Máy tính giúp con người làm việc nhanh hơn, chính xác hơn và lưu được nhiều thông tin.' },
      { ul: [
        'Có nhiều loại máy tính: máy tính để bàn, máy tính xách tay, máy tính bảng, điện thoại thông minh.',
        'Máy tính dùng ở trường học, bệnh viện, ngân hàng, siêu thị và nhiều nơi khác.',
        'Máy tính giúp tính toán, lưu trữ dữ liệu, tìm kiếm và chia sẻ thông tin.',
      ] },
      { note: 'Khi dùng máy tính lâu, em nên ngồi thẳng, để màn hình cách mắt vừa phải và nghỉ ngơi cho mắt đỡ mỏi.' },
    ],
    examples: [
      { q: 'Máy tính bảng có phải là máy tính không?', a: 'Có. Máy tính bảng là một loại máy tính, cầm tay được và có màn hình cảm ứng.' },
      { q: 'Dùng máy tính liên tục nhiều giờ có tốt không?', a: 'Không tốt. Em nên nghỉ ngơi, thư giãn mắt sau một khoảng thời gian để bảo vệ sức khoẻ.' },
    ],
  },

  'P5TIN-w02-quiz': {
    topic: 'Phần cứng & phần mềm',
    intro: 'Một máy tính hoạt động được nhờ hai phần: phần cứng (sờ được) và phần mềm (các chương trình). Em sẽ phân biệt chúng và nhận biết thiết bị nhập, thiết bị xuất.',
    objectives: [
      'Phân biệt được phần cứng và phần mềm.',
      'Nhận biết thiết bị nhập và thiết bị xuất.',
      'Biết một số phần mềm thông dụng và công dụng của chúng.',
    ],
    theory: [
      { h: 'Phần cứng và phần mềm' },
      { ul: [
        'Phần cứng là các bộ phận vật lí, sờ được: màn hình, bàn phím, chuột, vỏ máy.',
        'Phần mềm là các chương trình giúp máy tính hoạt động: phần mềm soạn thảo, trình duyệt, trò chơi.',
      ] },
      { h: 'Thiết bị nhập và thiết bị xuất' },
      { ul: [
        'Thiết bị nhập đưa dữ liệu vào máy: bàn phím, chuột, micro.',
        'Thiết bị xuất đưa kết quả ra ngoài: màn hình, loa, máy in.',
      ] },
      { note: 'Trò chơi, hình nền hay tài liệu là dữ liệu và phần mềm, không phải phần cứng vì em không sờ trực tiếp vào chúng được.' },
    ],
    examples: [
      { q: 'Bàn phím là thiết bị nhập hay xuất?', a: 'Bàn phím là thiết bị nhập, dùng để gõ và đưa dữ liệu vào máy.' },
      { q: 'Phần mềm soạn thảo dùng để làm gì?', a: 'Dùng để gõ chữ và trình bày văn bản cho đẹp, rõ ràng.' },
    ],
  },

  'P5TIN-w03-quiz': {
    topic: 'Thông tin số & lưu trữ',
    intro: 'Thông tin được lưu và xử lí trên máy tính gọi là thông tin số. Em tìm hiểu các thiết bị lưu trữ và cách giữ dữ liệu an toàn.',
    objectives: [
      'Hiểu thông tin số là thông tin được lưu, xử lí trên thiết bị số.',
      'Kể được vài thiết bị lưu trữ dữ liệu.',
      'Biết sao lưu để tránh mất dữ liệu.',
    ],
    theory: [
      { h: 'Thông tin số' },
      { p: 'Một tệp ảnh, một bài hát, một bài làm trên máy đều là thông tin số.' },
      { ul: [
        'Thiết bị lưu trữ thông dụng: ổ cứng, thẻ nhớ, USB.',
        'Dung lượng dữ liệu đo bằng MB, GB; số càng lớn thì chứa được càng nhiều.',
        'Sao lưu là tạo thêm một bản ở nơi khác để phòng khi mất dữ liệu.',
      ] },
      { note: 'Không nên để dữ liệu bừa bãi hay chỉ giữ một bản duy nhất, vì nếu hỏng máy là mất hết.' },
    ],
    examples: [
      { q: 'USB dùng để làm gì?', a: 'USB là thiết bị nhỏ gọn dùng để lưu trữ và mang dữ liệu đi nơi khác.' },
      { q: 'Vì sao cần sao lưu dữ liệu?', a: 'Để khi máy hỏng hoặc lỡ xoá nhầm, em vẫn còn một bản khác dùng được.' },
    ],
  },

  'P5TIN-w04-quiz': {
    topic: 'Tổ chức thư mục cây',
    intro: 'Để dễ tìm và quản lí tệp, ta sắp xếp chúng vào các thư mục lồng nhau, tạo thành cấu trúc thư mục cây.',
    objectives: [
      'Hiểu thư mục dùng để chứa và sắp xếp tệp.',
      'Nhận biết thư mục mẹ và thư mục con trong cấu trúc cây.',
      'Biết đặt tên thư mục ngắn gọn, rõ nghĩa.',
    ],
    theory: [
      { h: 'Thư mục và cấu trúc cây' },
      { ul: [
        'Thư mục giống một cái hộp để chứa các tệp và các thư mục con.',
        'Thư mục mẹ chứa thư mục con bên trong; thư mục con nằm trong thư mục mẹ.',
        'Các thư mục lồng nhau tạo thành cấu trúc thư mục cây, có nhánh rõ ràng.',
      ] },
      { note: 'Đặt tên thư mục ngắn gọn, đúng nội dung, ví dụ Hoc-tap, Anh-gia-dinh; tránh tên trống hay khó nhớ.' },
    ],
    examples: [
      { q: 'Thư mục Lop5 chứa thư mục Toan và Tieng-Viet thì thư mục nào là mẹ?', a: 'Thư mục Lop5 là thư mục mẹ, còn Toan và Tieng-Viet là thư mục con.' },
      { q: 'Sắp xếp tệp theo thư mục có lợi gì?', a: 'Giúp em tìm tệp nhanh hơn và quản lí gọn gàng hơn.' },
    ],
  },

  'P5TIN-w05-quiz': {
    topic: 'Tìm kiếm tệp & dữ liệu',
    intro: 'Khi quên tệp nằm ở đâu, em có thể dùng công cụ tìm kiếm trên máy để tìm nhanh thay vì mở từng thư mục.',
    objectives: [
      'Biết dùng công cụ tìm kiếm để tìm tệp.',
      'Tìm tệp theo tên hoặc phần mở rộng.',
      'Hiểu lợi ích của việc đặt tên và sắp xếp tệp rõ ràng.',
    ],
    theory: [
      { h: 'Cách tìm tệp nhanh' },
      { ul: [
        'Nhớ tên hoặc một phần tên tệp giúp tìm nhanh hơn.',
        'Phần mở rộng cho biết loại tệp: .jpg là ảnh, .mp3 là nhạc, .mp4 là phim.',
        'Có thể sắp xếp tệp theo tên hoặc theo ngày để dễ tìm.',
      ] },
      { note: 'Đặt tên tệp rõ ràng, đúng nội dung sẽ giúp em tìm và nhận ra tệp dễ hơn rất nhiều.' },
    ],
    examples: [
      { q: 'Muốn tìm tất cả tệp ảnh, em tìm theo đuôi nào?', a: 'Tìm theo đuôi .jpg (hoặc .png), vì đó là phần mở rộng của tệp ảnh.' },
      { q: 'Sắp xếp tệp theo ngày để làm gì?', a: 'Để tìm nhanh tệp mới làm gần đây hoặc tệp cũ đã lâu.' },
    ],
  },

  'P5TIN-w06-quiz': {
    topic: 'Internet & tìm kiếm hiệu quả',
    intro: 'Internet giúp em tìm và chia sẻ thông tin. Để tìm đúng và nhanh, em cần biết dùng từ khoá rõ ràng và chọn nguồn đáng tin.',
    objectives: [
      'Hiểu công dụng của Internet và trình duyệt web.',
      'Dùng từ khoá rõ ràng để tìm thông tin chính xác.',
      'Biết tìm kiếm an toàn, có người lớn hướng dẫn khi cần.',
    ],
    theory: [
      { h: 'Tìm kiếm trên Internet' },
      { ul: [
        'Trình duyệt web là phần mềm dùng để truy cập các trang web.',
        'Từ khoá rõ ràng, đúng trọng tâm giúp ra kết quả chính xác hơn.',
        'Khi có nhiều kết quả, nên đọc kĩ và chọn nguồn đáng tin.',
      ] },
      { note: 'Không tự ý vào mọi trang lạ, không bấm mọi quảng cáo; nên có người lớn hướng dẫn khi cần.' },
    ],
    examples: [
      { q: 'Muốn tìm cách chăm sóc cây xanh, em nên gõ thế nào?', a: 'Gõ từ khoá ngắn gọn, đúng trọng tâm như "cách chăm sóc cây xanh", không gõ thừa nhiều chữ.' },
      { q: 'Khi ra rất nhiều kết quả thì làm gì?', a: 'Đọc kĩ và chọn nguồn đáng tin, không vội tin ngay kết quả đầu tiên.' },
    ],
  },

  'P5TIN-w07-quiz': {
    topic: 'Đánh giá độ tin cậy thông tin',
    intro: 'Thông tin trên mạng có cả đúng và sai. Em học cách nhận biết nguồn đáng tin và kiểm tra trước khi tin.',
    objectives: [
      'Hiểu thông tin trên mạng có thể đúng hoặc sai.',
      'Nhận biết nguồn thông tin đáng tin.',
      'Biết so sánh nhiều nguồn để kiểm tra.',
    ],
    theory: [
      { h: 'Tin hay không tin?' },
      { ul: [
        'Trang của cơ quan, tổ chức uy tín thường đáng tin hơn tin đồn hay bình luận vô danh.',
        'So sánh nhiều nguồn khác nhau giúp em kiểm tra độ tin cậy.',
        'Tin giật gân, không ghi nguồn rõ ràng thường dễ là tin giả.',
      ] },
      { note: 'Khi nghi ngờ một thông tin, hãy hỏi người lớn và tra cứu thêm trước khi tin hay chia sẻ.' },
    ],
    examples: [
      { q: 'Một tin "uống thứ này khỏi mọi bệnh" có đáng tin không?', a: 'Không. Đó là tin giật gân, không có nguồn rõ ràng, dễ là tin giả.' },
      { q: 'Làm sao biết một thông tin có đúng không?', a: 'So sánh nó với nhiều nguồn đáng tin khác; nếu các nguồn đều nói giống nhau thì đáng tin hơn.' },
    ],
  },

  'P5TIN-w08-quiz': {
    topic: 'An toàn thông tin cá nhân',
    intro: 'Thông tin cá nhân như họ tên, địa chỉ, số điện thoại cần được giữ kín với người lạ trên mạng để tránh bị lừa hay làm phiền.',
    objectives: [
      'Biết những gì là thông tin cá nhân.',
      'Không cung cấp thông tin cá nhân cho người lạ.',
      'Biết báo người lớn khi gặp tình huống đáng ngờ.',
    ],
    theory: [
      { h: 'Bảo vệ thông tin của em' },
      { ul: [
        'Thông tin cá nhân gồm họ tên, địa chỉ nhà, số điện thoại, ảnh thẻ học sinh…',
        'Không cho người lạ trên mạng những thông tin này.',
        'Cân nhắc kĩ trước khi chia sẻ ảnh, video riêng tư.',
      ] },
      { note: 'Khi gặp tin nhắn lạ đáng ngờ, đừng trả lời hay bấm liên kết, hãy báo ngay cho người lớn.' },
    ],
    examples: [
      { q: 'Người lạ trên mạng hỏi địa chỉ nhà, em làm gì?', a: 'Không cho, và báo cho bố mẹ hoặc thầy cô biết.' },
      { q: 'Vì sao phải bảo vệ thông tin cá nhân?', a: 'Để tránh bị kẻ xấu lừa đảo, làm phiền hoặc gây hại.' },
    ],
  },

  'P5TIN-w09-quiz': {
    topic: 'Ôn tập giữa Học kì 1',
    intro: 'Tuần này em ôn lại các kiến thức đã học: thiết bị nhập/xuất, thư mục, tìm kiếm thông tin và an toàn trên mạng.',
    objectives: [
      'Hệ thống lại kiến thức nửa đầu Học kì 1.',
      'Củng cố kĩ năng tổ chức tệp và tìm thông tin.',
      'Nhớ các quy tắc an toàn cơ bản trên mạng.',
    ],
    theory: [
      { h: 'Những điều cần nhớ' },
      { ul: [
        'Bàn phím, chuột là thiết bị nhập; màn hình, loa, máy in là thiết bị xuất.',
        'Thư mục dùng để sắp xếp, chứa tệp; dùng từ khoá rõ ràng để tìm thông tin.',
        'Không cho người lạ thông tin cá nhân; sao lưu để tránh mất dữ liệu.',
      ] },
      { note: 'Ôn tập là dịp tốt để em tự kiểm tra xem mình còn quên phần nào và bổ sung lại.' },
    ],
    examples: [
      { q: 'Màn hình là thiết bị nhập hay xuất?', a: 'Màn hình là thiết bị xuất, dùng để hiển thị kết quả.' },
      { q: 'Để tránh mất dữ liệu, em nên làm gì?', a: 'Sao lưu dữ liệu thường xuyên sang nơi khác.' },
    ],
  },

  'P5TIN-w10-quiz': {
    topic: 'Mật khẩu mạnh & bảo mật',
    intro: 'Mật khẩu là chìa khoá bảo vệ tài khoản. Mật khẩu mạnh và được giữ bí mật sẽ giúp tài khoản của em an toàn.',
    objectives: [
      'Biết đặc điểm của mật khẩu mạnh.',
      'Giữ mật khẩu bí mật, không dùng chung.',
      'Biết đăng xuất khi dùng máy công cộng.',
    ],
    theory: [
      { h: 'Mật khẩu an toàn' },
      { ul: [
        'Mật khẩu mạnh nên dài, có cả chữ và số, khó đoán.',
        'Không đặt mật khẩu là tên mình, ngày sinh hay 123456 vì dễ bị đoán.',
        'Không dùng chung một mật khẩu cho nhiều nơi: lộ một nơi sẽ mất nhiều nơi.',
      ] },
      { note: 'Nếu nghi mật khẩu bị lộ, hãy đổi ngay; khi dùng máy công cộng nhớ đăng xuất sau khi xong.' },
    ],
    examples: [
      { q: 'Mật khẩu "123456" có mạnh không?', a: 'Không. Đó là mật khẩu quá đơn giản, rất dễ bị người khác đoán ra.' },
      { q: 'Có nên viết mật khẩu dán lên màn hình không?', a: 'Không nên, vì ai cũng nhìn thấy và tài khoản sẽ mất an toàn.' },
    ],
  },

  'P5TIN-w11-quiz': {
    topic: 'Phòng tránh lừa đảo trên mạng',
    intro: 'Trên mạng có những trò lừa đảo như hứa thưởng lớn, báo trúng thưởng bất ngờ rồi đòi thông tin. Em học cách nhận biết và phòng tránh.',
    objectives: [
      'Nhận biết dấu hiệu lừa đảo trên mạng.',
      'Không bấm liên kết lạ, không gửi tiền hay thông tin.',
      'Biết cảnh giác và hỏi người lớn.',
    ],
    theory: [
      { h: 'Cảnh giác với lừa đảo' },
      { ul: [
        'Lừa đảo thường hứa thưởng lớn rồi đòi thông tin hoặc tiền.',
        'Tin báo trúng thưởng bất ngờ thường là lừa đảo.',
        'Không bấm vào liên kết lạ, không nhập mật khẩu vào trang lạ.',
      ] },
      { note: 'Khi ai đó trên mạng đòi tiền hoặc thông tin, hãy từ chối và báo ngay cho người lớn.' },
    ],
    examples: [
      { q: 'Nhận tin "Bạn trúng điện thoại, bấm vào đây để nhận", em làm gì?', a: 'Không bấm vào, vì đây là dấu hiệu lừa đảo; nên hỏi người lớn.' },
      { q: 'Cách tốt nhất để phòng lừa đảo là gì?', a: 'Luôn cảnh giác và hỏi người lớn khi gặp điều đáng ngờ.' },
    ],
  },

  'P5TIN-w12-quiz': {
    topic: 'Đạo đức & pháp luật trong môi trường số',
    intro: 'Khi dùng mạng, em cần tôn trọng người khác, trung thực và làm đúng quy định, giống như khi sống ngoài đời thật.',
    objectives: [
      'Biết ứng xử tôn trọng, đúng quy định trên mạng.',
      'Hiểu lấy tài liệu của người khác làm của mình là sai.',
      'Nhận biết hành vi vi phạm khi dùng mạng.',
    ],
    theory: [
      { h: 'Cư xử đúng trên môi trường số' },
      { ul: [
        'Tôn trọng người khác, dùng lời lịch sự, tử tế trên mạng.',
        'Khi dùng bài của người khác, phải ghi rõ nguồn và xin phép.',
        'Tung tin sai sự thật, phá phách trang web là hành vi vi phạm.',
      ] },
      { note: 'Trên mạng, lời nói và hành động của em vẫn có hậu quả thật, nên cần suy nghĩ trước khi làm.' },
    ],
    examples: [
      { q: 'Lấy bài viết của bạn rồi nói là của mình có được không?', a: 'Không. Đó là sai trái, vi phạm đạo đức; phải ghi nguồn và xin phép.' },
      { q: 'Hành vi nào là vi phạm khi dùng mạng?', a: 'Tung tin sai sự thật để gây hiểu lầm hoặc làm hại người khác.' },
    ],
  },

  'P5TIN-w13-quiz': {
    topic: 'Bản quyền số',
    intro: 'Bản quyền là quyền của người tạo ra sản phẩm. Tôn trọng bản quyền là biết xin phép, ghi nguồn và không dùng sản phẩm lậu.',
    objectives: [
      'Hiểu bản quyền thuộc về người tạo ra sản phẩm.',
      'Biết tải nhạc, phim lậu là vi phạm bản quyền.',
      'Biết cách dùng sản phẩm của người khác đúng quy định.',
    ],
    theory: [
      { h: 'Tôn trọng bản quyền' },
      { ul: [
        'Bản quyền là quyền của người tạo ra bài hát, phần mềm, sách, ảnh…',
        'Tải nhạc, phim lậu là vi phạm bản quyền.',
        'Muốn dùng ảnh của người khác, nên xin phép hoặc dùng ảnh miễn phí được phép.',
      ] },
      { note: 'Tôn trọng bản quyền khích lệ mọi người sáng tạo thêm nhiều sản phẩm hay.' },
    ],
    examples: [
      { q: 'Sản phẩm nào có thể có bản quyền?', a: 'Bài hát, phần mềm, sách, tranh ảnh đều có thể có bản quyền.' },
      { q: 'Tải phim lậu trên mạng có đúng không?', a: 'Không. Đó là vi phạm bản quyền của người làm ra bộ phim.' },
    ],
  },

  'P5TIN-w14-quiz': {
    topic: 'Văn hoá ứng xử trên mạng xã hội',
    intro: 'Mạng xã hội giúp kết nối nhưng cần ứng xử có văn hoá: lịch sự, tử tế và suy nghĩ kĩ trước khi đăng.',
    objectives: [
      'Biết bình luận lịch sự, tôn trọng người khác.',
      'Biết giúp đỡ khi thấy bạn bị bắt nạt trên mạng.',
      'Suy nghĩ kĩ trước khi đăng bài.',
    ],
    theory: [
      { h: 'Ứng xử đẹp trên mạng' },
      { ul: [
        'Bình luận lịch sự, không nói lời cay nghiệt hay thô tục.',
        'Suy nghĩ kĩ về nội dung trước khi đăng; không đăng tin chưa kiểm chứng hay thông tin riêng tư.',
        'Lời nói trên mạng có thể ảnh hưởng cảm xúc người khác và còn lưu lại lâu dài.',
      ] },
      { note: 'Khi thấy bạn bị bắt nạt trên mạng, hãy giúp đỡ và báo người lớn, đừng hùa theo trêu chọc.' },
    ],
    examples: [
      { q: 'Thấy bạn bị nhiều người chê bai trên mạng, em làm gì?', a: 'Không hùa theo, nên động viên bạn và báo người lớn để được giúp đỡ.' },
      { q: 'Trước khi đăng một bài, em nên làm gì?', a: 'Suy nghĩ kĩ về nội dung, kiểm tra xem có phù hợp và đúng sự thật không.' },
    ],
  },

  'P5TIN-w15-quiz': {
    topic: 'Soạn thảo văn bản hoàn chỉnh',
    intro: 'Phần mềm soạn thảo giúp em gõ và trình bày văn bản cho rõ ràng, đẹp mắt với các công cụ định dạng cơ bản.',
    objectives: [
      'Gõ và trình bày được một văn bản đơn giản.',
      'Dùng các nút định dạng: in đậm, căn giữa.',
      'Biết lưu văn bản và chọn cỡ chữ, phông phù hợp.',
    ],
    theory: [
      { h: 'Trình bày văn bản' },
      { ul: [
        'Nút B (Bold) làm chữ in đậm; căn giữa đặt chữ vào giữa dòng.',
        'Chọn cỡ chữ và phông chữ phù hợp giúp văn bản rõ và đẹp.',
        'Không dùng quá nhiều màu loè loẹt hay cỡ chữ quá nhỏ.',
      ] },
      { note: 'Sau khi soạn xong, nhớ lưu lại tệp để không mất công sức đã làm.' },
    ],
    examples: [
      { q: 'Muốn tiêu đề nổi bật, em dùng nút nào?', a: 'Dùng nút B để in đậm và có thể căn giữa cho tiêu đề rõ hơn.' },
      { q: 'Soạn xong rồi tắt máy luôn có sao không?', a: 'Nếu chưa lưu mà tắt máy thì sẽ mất bài; phải lưu lại trước.' },
    ],
  },

  'P5TIN-w16-quiz': {
    topic: 'Bảng trong văn bản',
    intro: 'Bảng giúp trình bày dữ liệu theo hàng và cột, làm cho thông tin gọn gàng và dễ so sánh.',
    objectives: [
      'Hiểu bảng gồm hàng, cột và ô.',
      'Biết chèn thêm hàng hoặc cột khi cần.',
      'Thấy được lợi ích của việc lập bảng.',
    ],
    theory: [
      { h: 'Bảng dữ liệu' },
      { ul: [
        'Bảng gồm các hàng (nằm ngang), cột (nằm dọc) và ô.',
        'Ô là giao của một hàng và một cột.',
        'Khi cần thêm dữ liệu, có thể chèn thêm hàng hoặc cột.',
      ] },
      { note: 'Lập bảng giúp dữ liệu gọn gàng, dễ đọc và dễ so sánh hơn so với viết thành câu.' },
    ],
    examples: [
      { q: 'Ô trong bảng được tạo ra như thế nào?', a: 'Ô là chỗ giao nhau giữa một hàng và một cột.' },
      { q: 'Muốn thêm một dòng dữ liệu vào bảng, làm gì?', a: 'Chèn thêm một hàng mới vào bảng.' },
    ],
  },

  'P5TIN-w17-quiz': {
    topic: 'Trình chiếu, hiệu ứng & đa phương tiện',
    intro: 'Phần mềm trình chiếu giúp tạo bài trình bày bằng các trang chiếu, kết hợp chữ, hình, âm thanh, video và hiệu ứng.',
    objectives: [
      'Hiểu công dụng của phần mềm trình chiếu.',
      'Biết đa phương tiện gồm chữ, hình, âm thanh, video.',
      'Dùng hiệu ứng vừa phải, hợp lí.',
    ],
    theory: [
      { h: 'Bài trình chiếu' },
      { ul: [
        'Phần mềm trình chiếu tạo bài trình bày bằng nhiều trang chiếu.',
        'Đa phương tiện gồm chữ, hình ảnh, âm thanh và video.',
        'Hiệu ứng làm bài trình bày sinh động hơn nhưng cần dùng vừa phải.',
      ] },
      { note: 'Một bài trình chiếu tốt cần nội dung rõ ràng, dễ hiểu; không nên để quá nhiều chữ hay màu loè loẹt trên một trang.' },
    ],
    examples: [
      { q: 'Đa phương tiện trong trình chiếu gồm những gì?', a: 'Gồm chữ, hình ảnh, âm thanh và video.' },
      { q: 'Dùng thật nhiều hiệu ứng có tốt không?', a: 'Không. Quá nhiều hiệu ứng làm rối mắt và mất tập trung; nên dùng vừa phải.' },
    ],
  },

  'P5TIN-w18-quiz': {
    topic: 'Ôn tập cuối Học kì 1',
    intro: 'Tuần này em ôn lại kiến thức cả Học kì 1: an toàn mật khẩu, kiểm chứng thông tin, soạn thảo, bảng và trình chiếu.',
    objectives: [
      'Hệ thống kiến thức cả Học kì 1.',
      'Củng cố kĩ năng an toàn và kĩ năng soạn thảo, trình bày.',
      'Nhớ quy tắc tôn trọng bản quyền.',
    ],
    theory: [
      { h: 'Những điều cần nhớ' },
      { ul: [
        'Mật khẩu mạnh: dài, khó đoán, có chữ và số.',
        'Tin chưa kiểm chứng cần so sánh nhiều nguồn trước khi tin.',
        'Bảng trình bày dữ liệu theo hàng, cột; hiệu ứng trình chiếu dùng vừa phải.',
      ] },
      { note: 'Lấy bài của người khác làm của mình là vi phạm bản quyền; luôn ghi nguồn và xin phép.' },
    ],
    examples: [
      { q: 'Mật khẩu mạnh có đặc điểm gì?', a: 'Dài, khó đoán, có cả chữ và số, không phải tên hay ngày sinh.' },
      { q: 'Gặp tin chưa kiểm chứng thì nên làm gì?', a: 'Kiểm tra nhiều nguồn trước khi tin, không lan truyền ngay.' },
    ],
  },

  'P5TIN-w19-quiz': {
    topic: 'Bảng tính — ô, hàng, cột',
    intro: 'Phần mềm bảng tính dùng để tính toán và trình bày số liệu. Em làm quen với hàng, cột, ô và địa chỉ ô.',
    objectives: [
      'Hiểu công dụng của phần mềm bảng tính.',
      'Nhận biết hàng, cột, ô và địa chỉ ô.',
      'Biết mỗi ô có một địa chỉ riêng.',
    ],
    theory: [
      { h: 'Làm quen bảng tính' },
      { ul: [
        'Hàng được đánh số bằng các con số 1, 2, 3…',
        'Cột được đặt tên bằng các chữ cái A, B, C…',
        'Ô tính là giao của một hàng và một cột, có địa chỉ riêng như A1, B2.',
      ] },
      { note: 'Địa chỉ ô gồm tên cột rồi đến số hàng, ví dụ ô ở cột B, hàng 2 có địa chỉ B2.' },
    ],
    examples: [
      { q: 'Trong bảng tính, cột được đặt tên bằng gì?', a: 'Bằng các chữ cái A, B, C…' },
      { q: 'Ô ở cột A, hàng 1 có địa chỉ là gì?', a: 'Địa chỉ là A1.' },
    ],
  },

  'P5TIN-w20-quiz': {
    topic: 'Nhập dữ liệu & công thức đơn giản',
    intro: 'Bảng tính có thể tự tính toán nhờ công thức. Công thức bắt đầu bằng dấu bằng và có thể dùng địa chỉ ô.',
    objectives: [
      'Biết công thức bắt đầu bằng dấu bằng (=).',
      'Viết được công thức cộng đơn giản với địa chỉ ô.',
      'Hiểu công thức tự tính lại khi đổi số liệu.',
    ],
    theory: [
      { h: 'Công thức trong bảng tính' },
      { ul: [
        'Công thức thường bắt đầu bằng dấu bằng (=), ví dụ =3+5 cho kết quả 8.',
        'Có thể dùng địa chỉ ô: =A1+A2 để cộng giá trị hai ô.',
        'Khi đổi số liệu trong ô, công thức tự động tính lại kết quả.',
      ] },
      { note: 'Nhập dữ liệu đúng và cẩn thận thì kết quả tính mới chính xác.' },
    ],
    examples: [
      { q: 'Công thức =3+5 cho kết quả bao nhiêu?', a: 'Bằng 8.' },
      { q: 'Muốn cộng giá trị ô A1 và A2, em viết thế nào?', a: 'Viết =A1+A2.' },
    ],
  },

  'P5TIN-w21-quiz': {
    topic: 'Biểu đồ từ bảng tính',
    intro: 'Từ số liệu trong bảng tính, em có thể tạo biểu đồ để nhìn dữ liệu trực quan và dễ so sánh.',
    objectives: [
      'Hiểu biểu đồ giúp xem số liệu trực quan.',
      'Biết biểu đồ được tạo từ dữ liệu trong bảng tính.',
      'Biết biểu đồ cột dùng để so sánh số lượng.',
    ],
    theory: [
      { h: 'Biểu đồ' },
      { ul: [
        'Biểu đồ giúp nhìn số liệu trực quan, dễ so sánh hơn so với bảng số.',
        'Biểu đồ cột thường dùng để so sánh số lượng.',
        'Khi số liệu trong bảng thay đổi, biểu đồ có thể cập nhật theo.',
      ] },
      { note: 'Một biểu đồ rõ ràng nên có tiêu đề và nhãn dễ hiểu, số liệu phải đúng.' },
    ],
    examples: [
      { q: 'Biểu đồ được tạo ra từ đâu?', a: 'Từ dữ liệu có trong bảng tính.' },
      { q: 'Muốn so sánh số học sinh của các lớp, dùng biểu đồ nào?', a: 'Biểu đồ cột, vì nó giúp so sánh số lượng dễ dàng.' },
    ],
  },

  'P5TIN-w22-quiz': {
    topic: 'Thuật toán — tuần tự',
    intro: 'Thuật toán là các bước làm theo thứ tự để giải quyết một việc. Trong thuật toán tuần tự, các bước được làm lần lượt.',
    objectives: [
      'Hiểu thuật toán là các bước theo thứ tự.',
      'Hiểu thuật toán tuần tự làm các bước lần lượt.',
      'Biết thứ tự các bước rất quan trọng.',
    ],
    theory: [
      { h: 'Thuật toán tuần tự' },
      { ul: [
        'Thuật toán là các bước làm theo thứ tự để giải quyết một việc.',
        'Tuần tự nghĩa là thực hiện các bước lần lượt từ đầu đến cuối.',
        'Thứ tự các bước rất quan trọng, đảo lộn có thể làm sai kết quả.',
      ] },
      { note: 'Mô tả thuật toán cần rõ ràng, đầy đủ các bước thì người khác mới làm theo đúng được.' },
    ],
    examples: [
      { q: 'Để pha trà, bước nào nên làm trước?', a: 'Đun nước sôi trước, rồi mới pha trà và rót ra cốc.' },
      { q: 'Thứ tự các bước trong thuật toán có quan trọng không?', a: 'Rất quan trọng; làm sai thứ tự có thể cho kết quả sai.' },
    ],
  },

  'P5TIN-w23-quiz': {
    topic: 'Thuật toán — rẽ nhánh (nếu… thì)',
    intro: 'Cấu trúc rẽ nhánh dùng khi cần chọn việc làm tuỳ theo một điều kiện. Điều kiện cho kết quả đúng hoặc sai.',
    objectives: [
      'Hiểu rẽ nhánh dùng để chọn theo điều kiện.',
      'Biết điều kiện cho kết quả đúng hoặc sai.',
      'Nêu được ví dụ câu rẽ nhánh nếu… thì.',
    ],
    theory: [
      { h: 'Cấu trúc rẽ nhánh' },
      { ul: [
        'Rẽ nhánh dùng khi cần chọn việc làm tuỳ điều kiện.',
        'Điều kiện cho kết quả đúng hoặc sai.',
        'Nếu điều kiện đúng thì thực hiện việc tương ứng.',
      ] },
      { note: 'Rẽ nhánh giúp chương trình xử lí được nhiều trường hợp khác nhau, linh hoạt hơn.' },
    ],
    examples: [
      { q: '"Nếu trời mưa thì mang ô" là cấu trúc gì?', a: 'Đó là một câu rẽ nhánh nếu… thì.' },
      { q: 'Khi điều kiện đúng, chương trình làm gì?', a: 'Thực hiện việc tương ứng với điều kiện đó.' },
    ],
  },

  'P5TIN-w24-quiz': {
    topic: 'Thuật toán — lặp',
    intro: 'Cấu trúc lặp dùng khi cần làm một việc nhiều lần, giúp mô tả công việc gọn hơn.',
    objectives: [
      'Hiểu lặp dùng để làm một việc nhiều lần.',
      'Nêu được ví dụ về việc lặp lại.',
      'Hiểu số lần lặp cần được xác định hoặc có điều kiện dừng.',
    ],
    theory: [
      { h: 'Cấu trúc lặp' },
      { ul: [
        'Lặp dùng khi cần làm một việc nhiều lần, ví dụ đọc 5 lần một câu.',
        'Lặp giúp viết gọn việc làm nhiều lần thay vì viết lặp lại.',
        'Số lần lặp thường được xác định rõ hoặc theo một điều kiện dừng.',
      ] },
      { note: 'Cần có điều kiện dừng, tránh để vòng lặp chạy mãi mãi gây lỗi.' },
    ],
    examples: [
      { q: 'Lặp 3 lần việc "vỗ tay" nghĩa là gì?', a: 'Nghĩa là vỗ tay đúng 3 lần.' },
      { q: 'Vì sao nên dùng cấu trúc lặp?', a: 'Để viết gọn việc phải làm nhiều lần, đỡ phải viết lặp lại từng lệnh.' },
    ],
  },

  'P5TIN-w25-quiz': {
    topic: 'Scratch — biến & dữ liệu',
    intro: 'Scratch là phần mềm lập trình bằng cách ghép các khối lệnh. Biến trong Scratch dùng để lưu lại một giá trị, ví dụ điểm số.',
    objectives: [
      'Hiểu Scratch lập trình bằng cách ghép khối lệnh.',
      'Hiểu biến dùng để lưu một giá trị.',
      'Biết giá trị của biến có thể thay đổi khi chạy.',
    ],
    theory: [
      { h: 'Biến trong Scratch' },
      { ul: [
        'Scratch lập trình bằng cách ghép các khối lệnh lại với nhau.',
        'Biến dùng để lưu lại một giá trị, ví dụ lưu điểm số trong trò chơi.',
        'Giá trị của biến có thể thay đổi trong quá trình chạy.',
      ] },
      { note: 'Để cộng thêm điểm, ta tăng giá trị của biến; xoá biến đi thì mất luôn giá trị đang lưu.' },
    ],
    examples: [
      { q: 'Biến trong Scratch dùng để làm gì?', a: 'Để lưu lại một giá trị, chẳng hạn điểm số của người chơi.' },
      { q: 'Muốn cộng thêm điểm, em làm gì với biến?', a: 'Tăng giá trị của biến điểm số lên.' },
    ],
  },

  'P5TIN-w26-quiz': {
    topic: 'Scratch — rẽ nhánh',
    intro: 'Trong Scratch, khối "nếu… thì" giúp nhân vật làm việc khi điều kiện đúng, làm cho trò chơi phản ứng theo tình huống.',
    objectives: [
      'Biết khối "nếu… thì" làm việc khi điều kiện đúng.',
      'Nêu được ví dụ điều kiện trong Scratch.',
      'Hiểu khối "nếu… thì… nếu không" để chọn giữa hai việc.',
    ],
    theory: [
      { h: 'Rẽ nhánh trong Scratch' },
      { ul: [
        'Khối "nếu… thì" làm việc bên trong khi điều kiện đúng.',
        'Ví dụ điều kiện: "Nếu chạm vào tường".',
        'Khối "nếu… thì… nếu không" giúp chọn giữa hai việc làm.',
      ] },
      { note: 'Khi điều kiện sai, chương trình không thực hiện việc trong khối "nếu… thì".' },
    ],
    examples: [
      { q: '"Nếu chạm vào tường" trong Scratch là gì?', a: 'Đó là một điều kiện dùng cho khối rẽ nhánh.' },
      { q: 'Rẽ nhánh giúp trò chơi như thế nào?', a: 'Giúp trò chơi phản ứng theo từng tình huống, sinh động hơn.' },
    ],
  },

  'P5TIN-w27-quiz': {
    topic: 'Scratch — vòng lặp',
    intro: 'Khối lặp trong Scratch dùng để lặp lại một nhóm lệnh, giúp chương trình gọn hơn mà không phải viết lại nhiều lần.',
    objectives: [
      'Biết khối lặp dùng để lặp lại nhóm lệnh.',
      'Phân biệt "lặp 10 lần" và "lặp liên tục".',
      'Hiểu lợi ích của vòng lặp.',
    ],
    theory: [
      { h: 'Vòng lặp trong Scratch' },
      { ul: [
        'Khối "lặp 10 lần" thực hiện lệnh bên trong đúng 10 lần.',
        'Khối "lặp liên tục" lặp mãi cho đến khi dừng chương trình.',
        'Vòng lặp giúp chương trình gọn hơn, không phải viết lặp lại nhiều lệnh.',
      ] },
      { note: 'Muốn nhân vật đi tới 4 bước rồi lặp lại nhiều lần, ta đặt lệnh đi vào trong khối lặp.' },
    ],
    examples: [
      { q: 'Khối "lặp 10 lần" làm gì?', a: 'Thực hiện lệnh bên trong nó đúng 10 lần.' },
      { q: 'Vòng lặp giúp chương trình ra sao?', a: 'Giúp chương trình gọn hơn, đỡ phải viết lại nhiều lệnh giống nhau.' },
    ],
  },

  'P5TIN-w28-quiz': {
    topic: 'Scratch — kết hợp lệnh',
    intro: 'Khi kết hợp tuần tự, rẽ nhánh và lặp, em tạo được chương trình làm nhiều việc. Nếu chương trình chạy sai, em kiểm tra và gỡ lỗi.',
    objectives: [
      'Biết kết hợp tuần tự, rẽ nhánh, lặp trong Scratch.',
      'Biết kiểm tra lại từng khối khi chương trình chạy sai.',
      'Hiểu gỡ lỗi là tìm và sửa lỗi.',
    ],
    theory: [
      { h: 'Kết hợp các cấu trúc' },
      { ul: [
        'Kết hợp nhiều khối lệnh giúp tạo chương trình làm nhiều việc.',
        'Có thể kết hợp tuần tự, rẽ nhánh và lặp với nhau.',
        'Việc tìm và sửa lỗi chương trình gọi là gỡ lỗi.',
      ] },
      { note: 'Khi chương trình chạy sai, hãy kiểm tra lại từng khối lệnh; sắp xếp khối gọn gàng để dễ hiểu.' },
    ],
    examples: [
      { q: 'Sửa lỗi chương trình còn gọi là gì?', a: 'Gọi là gỡ lỗi.' },
      { q: 'Chương trình chạy sai thì nên làm gì?', a: 'Kiểm tra lại từng khối lệnh để tìm và sửa chỗ sai.' },
    ],
  },

  'P5TIN-w29-quiz': {
    topic: 'Dự án lập trình (1) — Lên ý tưởng',
    intro: 'Khi làm dự án lập trình, bước đầu là xác định ý tưởng và mục tiêu, rồi lập kế hoạch các bước thực hiện.',
    objectives: [
      'Biết bước đầu tiên là xác định ý tưởng, mục tiêu.',
      'Biết lập kế hoạch các bước thực hiện.',
      'Có thái độ kiên trì và hợp tác khi làm dự án.',
    ],
    theory: [
      { h: 'Bắt đầu một dự án' },
      { ul: [
        'Bước đầu tiên là xác định ý tưởng và mục tiêu của dự án.',
        'Sau khi có ý tưởng, nên lập kế hoạch các bước thực hiện.',
        'Một dự án nhỏ có thể là một trò chơi đơn giản trên Scratch.',
      ] },
      { note: 'Khi gặp khó khăn, hãy kiên trì tìm cách giải quyết; làm nhóm giúp học hỏi và chia sẻ với nhau.' },
    ],
    examples: [
      { q: 'Bước đầu tiên khi làm dự án lập trình là gì?', a: 'Xác định ý tưởng và mục tiêu của dự án.' },
      { q: 'Làm dự án theo nhóm có lợi gì?', a: 'Giúp các bạn học hỏi và chia sẻ với nhau.' },
    ],
  },

  'P5TIN-w30-quiz': {
    topic: 'Dự án lập trình (2) — Hoàn thiện',
    intro: 'Sau khi làm xong, em chạy thử để phát hiện lỗi, gỡ lỗi, lưu lại và cải tiến dựa trên góp ý.',
    objectives: [
      'Biết chạy thử để phát hiện và sửa lỗi.',
      'Biết lưu lại và kiểm tra kĩ khi hoàn thành.',
      'Biết cải tiến dự án dựa trên góp ý.',
    ],
    theory: [
      { h: 'Hoàn thiện dự án' },
      { ul: [
        'Khi dự án có lỗi, cần tìm và sửa lỗi (gỡ lỗi).',
        'Chạy thử chương trình giúp phát hiện lỗi để sửa.',
        'Khi hoàn thành, nên lưu lại và kiểm tra kĩ.',
      ] },
      { note: 'Thái độ tốt khi làm dự án là kiên trì, cẩn thận và hợp tác; biết tiếp thu góp ý để cải tiến.' },
    ],
    examples: [
      { q: 'Chạy thử chương trình để làm gì?', a: 'Để phát hiện lỗi rồi sửa cho chương trình chạy đúng.' },
      { q: 'Nhận được góp ý cho dự án, em nên làm gì?', a: 'Lắng nghe, tiếp thu và cải tiến cho dự án tốt hơn.' },
    ],
  },

  'P5TIN-w31-quiz': {
    topic: 'Trình bày & chia sẻ sản phẩm số',
    intro: 'Khi có sản phẩm số, em trình bày rõ ràng và chia sẻ đúng cách: chỉ chia sẻ nội dung phù hợp, không vi phạm bản quyền.',
    objectives: [
      'Biết trình bày sản phẩm rõ ràng, dễ hiểu.',
      'Biết các cách chia sẻ sản phẩm số an toàn.',
      'Biết lắng nghe và tiếp thu góp ý.',
    ],
    theory: [
      { h: 'Trình bày và chia sẻ' },
      { ul: [
        'Trình bày sản phẩm nên nói rõ ràng, dễ hiểu và chuẩn bị kĩ.',
        'Có thể chia sẻ sản phẩm bằng cách gửi tệp hoặc đăng lên nền tảng được phép.',
        'Chỉ chia sẻ nội dung phù hợp, không đăng thông tin riêng tư hay vi phạm bản quyền.',
      ] },
      { note: 'Khi nhận góp ý, hãy lắng nghe và tiếp thu để hoàn thiện sản phẩm, đừng tức giận hay cãi lại.' },
    ],
    examples: [
      { q: 'Chia sẻ sản phẩm số bằng cách nào?', a: 'Gửi tệp cho người khác hoặc đăng lên nền tảng được phép.' },
      { q: 'Khi trình bày sản phẩm, em nên nói thế nào?', a: 'Nói rõ ràng, dễ hiểu và chuẩn bị kĩ trước.' },
    ],
  },

  'P5TIN-w32-quiz': {
    topic: 'Nghề nghiệp liên quan máy tính',
    intro: 'Nhiều nghề ngày nay gắn với máy tính, như lập trình viên hay thiết kế đồ hoạ. Để làm các nghề đó cần học tập và rèn luyện kĩ năng.',
    objectives: [
      'Kể được vài nghề liên quan tới máy tính.',
      'Biết công việc của lập trình viên, người thiết kế đồ hoạ.',
      'Hiểu cần học tập, rèn luyện để làm nghề.',
    ],
    theory: [
      { h: 'Nghề và máy tính' },
      { ul: [
        'Lập trình viên là người viết chương trình cho máy tính.',
        'Người thiết kế đồ hoạ dùng máy tính để vẽ, tạo hình ảnh và sản phẩm số.',
        'Ngày nay máy tính được dùng trong hầu hết các ngành nghề.',
      ] },
      { note: 'Để làm nghề liên quan máy tính, cần học tập và rèn luyện kĩ năng chăm chỉ, không chỉ chơi game.' },
    ],
    examples: [
      { q: 'Lập trình viên làm công việc gì?', a: 'Viết chương trình cho máy tính.' },
      { q: 'Máy tính ngày nay được dùng ở những nghề nào?', a: 'Hầu hết các ngành nghề đều dùng máy tính.' },
    ],
  },

  'P5TIN-w33-quiz': {
    topic: 'Công dân số có trách nhiệm',
    intro: 'Công dân số có trách nhiệm là người dùng công nghệ đúng cách, tử tế, tôn trọng và an toàn khi tham gia môi trường mạng.',
    objectives: [
      'Hiểu thế nào là công dân số có trách nhiệm.',
      'Biết bảo vệ thông tin cá nhân là trách nhiệm của mỗi người.',
      'Biết không lan truyền nội dung xấu, dùng thời gian hợp lí.',
    ],
    theory: [
      { h: 'Công dân số' },
      { ul: [
        'Công dân số có trách nhiệm dùng công nghệ đúng cách, tử tế.',
        'Khi dùng mạng nên tôn trọng, trung thực và an toàn.',
        'Bảo vệ thông tin cá nhân là trách nhiệm của mỗi người dùng mạng.',
      ] },
      { note: 'Thấy nội dung xấu thì không lan truyền và báo người lớn; dùng thời gian trên mạng hợp lí để cân bằng học tập và nghỉ ngơi.' },
    ],
    examples: [
      { q: 'Thấy nội dung xấu trên mạng, em làm gì?', a: 'Không lan truyền và báo cho người lớn.' },
      { q: 'Dùng thời gian trên mạng hợp lí giúp ích gì?', a: 'Giúp cân bằng giữa học tập và nghỉ ngơi, bảo vệ sức khoẻ.' },
    ],
  },

  'P5TIN-w34-quiz': {
    topic: 'Tổng hợp kĩ năng tin học',
    intro: 'Tuần này em tổng hợp các kĩ năng đã học: chọn đúng phần mềm cho từng việc, bảo vệ tài khoản và ba cấu trúc thuật toán.',
    objectives: [
      'Chọn được phần mềm phù hợp với từng việc.',
      'Nhớ cách bảo vệ tài khoản.',
      'Nhớ ba cấu trúc cơ bản của thuật toán.',
    ],
    theory: [
      { h: 'Tổng hợp kĩ năng' },
      { ul: [
        'Soạn văn bản dùng phần mềm soạn thảo; tính số liệu dùng phần mềm bảng tính.',
        'Bảo vệ tài khoản cần mật khẩu mạnh và giữ bí mật.',
        'Ba cấu trúc cơ bản của thuật toán là tuần tự, rẽ nhánh, lặp.',
      ] },
      { note: 'Khi dùng máy tính và mạng, em luôn cần an toàn và có trách nhiệm.' },
    ],
    examples: [
      { q: 'Để tính toán số liệu, em dùng phần mềm nào?', a: 'Phần mềm bảng tính.' },
      { q: 'Ba cấu trúc cơ bản của thuật toán là gì?', a: 'Tuần tự, rẽ nhánh và lặp.' },
    ],
  },

  'P5TIN-w35-quiz': {
    topic: 'Ôn tập cuối năm',
    intro: 'Tuần cuối em ôn lại toàn bộ kiến thức cả năm: thiết bị, bảng tính, thuật toán và an toàn, trách nhiệm khi dùng mạng.',
    objectives: [
      'Hệ thống kiến thức cả năm học.',
      'Củng cố kĩ năng bảng tính, thuật toán và an toàn mạng.',
      'Khắc sâu ý thức làm công dân số có trách nhiệm.',
    ],
    theory: [
      { h: 'Những điều cần nhớ cả năm' },
      { ul: [
        'Màn hình là thiết bị xuất; công thức trong bảng tính bắt đầu bằng dấu bằng (=).',
        'Cấu trúc lặp dùng để làm một việc nhiều lần.',
        'An toàn trên mạng: bảo vệ thông tin, cảnh giác lừa đảo.',
      ] },
      { note: 'Là công dân số có trách nhiệm, em dùng công nghệ đúng cách, tử tế, không tung tin giả hay vi phạm bản quyền.' },
    ],
    examples: [
      { q: 'Trong bảng tính, công thức bắt đầu bằng gì?', a: 'Bằng dấu bằng (=).' },
      { q: 'Để an toàn trên mạng, em nên làm gì?', a: 'Bảo vệ thông tin cá nhân và cảnh giác với lừa đảo.' },
    ],
  },

  'P5TIN-w36-quiz': {
    topic: 'Kết thúc Tiểu học — Hành trang Tin học vào THCS',
    intro: 'Chúc mừng! Em đã hoàn thành hành trình Tin học tiểu học. Thế giới số đang chờ em khám phá!',
    objectives: [
      'Tổng kết kĩ năng tin học đã học trong 5 năm.',
      'Sẵn sàng học Tin học THCS với tư duy lập trình.',
    ],
    theory: [
      { h: '5 trụ cột Tin học tiểu học em đã học' },
      { ul: [
        '💻 **Thiết bị số:** máy tính, chuột, bàn phím, màn hình, tai nghe; cách bật/tắt và chăm sóc thiết bị.',
        '⌨️ **Kĩ năng cơ bản:** gõ bàn phím 10 ngón, sử dụng chuột, tạo và lưu file.',
        '📊 **Phần mềm:** soạn thảo văn bản, bảng tính (công thức =), trình chiếu, phần mềm học tập.',
        '🔒 **An toàn số:** bảo vệ thông tin cá nhân, không chia sẻ mật khẩu, cảnh giác lừa đảo trực tuyến.',
        '🧠 **Tư duy thuật toán:** bước tuần tự, rẽ nhánh, lặp — nền tảng của lập trình.',
      ] },
      { h: 'Lên THCS em sẽ học gì?' },
      { ul: [
        'Lập trình với Scratch → Python cơ bản.',
        'Xử lý dữ liệu và bảng tính nâng cao.',
        'Thiết kế đồ hoạ và media cơ bản.',
        'Mạng internet và bảo mật thông tin sâu hơn.',
      ] },
      { note: 'Tư duy thuật toán — biết chia vấn đề thành các bước nhỏ — giúp ích không chỉ trong Tin học mà cả Toán, Khoa học và cuộc sống.' },
    ],
    examples: [
      { q: 'Nêu 3 cấu trúc cơ bản trong thuật toán?', a: 'Tuần tự (từng bước), Rẽ nhánh (nếu-thì), Lặp (lặp lại nhiều lần).' },
      { q: 'Em muốn làm gì với Tin học trong hè?', a: 'Ví dụ: học Scratch trên code.org, tạo trang web đơn giản, hoặc tự học thêm các phím tắt máy tính.' },
    ],
  },
};
