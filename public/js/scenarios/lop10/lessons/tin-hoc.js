// ============================================================
// Lớp 10 · TIN HỌC — Lý thuyết tuần (35 tuần)
// Key trùng id quiz: "H10TIN-wNN-quiz".
// Bám CT Tin học 10 GDPT 2018: Máy tính & xã hội tri thức — Lập trình Python — Thuật toán cơ bản.
// ============================================================

export const H10TIN_LESSONS = {
  'H10TIN-w01-quiz': {
    topic: 'Máy tính và xã hội tri thức',
    intro: 'Chào các em đến với Tin học 10. Mở đầu năm học, thầy/cô muốn các em hiểu vì sao máy tính lại trở thành công cụ trung tâm của xã hội hiện đại — nơi tri thức và thông tin là nguồn lực sản xuất quan trọng nhất.',
    objectives: [
      'Hiểu khái niệm xã hội tri thức và vai trò của thông tin.',
      'Nêu được máy tính là thiết bị xử lý thông tin tự động theo chương trình.',
      'Nhận biết tác động của cuộc cách mạng công nghiệp 4.0 và các nghề nghiệp tin học.',
    ],
    theory: [
      { h: 'Xã hội tri thức là gì?' },
      { p: 'Xã hội tri thức là xã hội mà tri thức và thông tin trở thành yếu tố sản xuất chính, quan trọng hơn cả đất đai, lao động chân tay hay máy móc cơ khí. Người nắm tri thức và biết khai thác thông tin sẽ tạo ra giá trị lớn.' },
      { h: 'Máy tính là gì?' },
      { p: 'Máy tính là thiết bị xử lý thông tin (dữ liệu) một cách tự động theo chương trình được lưu sẵn. Đặc trưng cốt lõi là khả năng thực hiện hàng loạt thao tác đã được lập trình mà không cần con người can thiệp từng bước.' },
      { h: 'Cách mạng công nghiệp 4.0' },
      { ul: ['Trí tuệ nhân tạo (AI) và học máy.', 'Internet vạn vật (IoT) — thiết bị kết nối mạng.', 'Dữ liệu lớn (big data) và điện toán đám mây.', 'Robot, in 3D, blockchain.'] },
      { p: 'Khác với CMCN 1.0 (hơi nước), 2.0 (điện), 3.0 (máy tính - tự động hoá), CMCN 4.0 dựa trên sự hội tụ của thế giới số, vật lý và sinh học.' },
      { h: 'Nghề nghiệp tin học và đạo đức' },
      { p: 'Các nghề CNTT phổ biến: lập trình viên, kỹ sư AI, nhà khoa học dữ liệu, kỹ sư an ninh mạng. Người làm tin học phải có đạo đức nghề nghiệp: tôn trọng bản quyền, bảo vệ quyền riêng tư, không lừa đảo hay phá hoại hệ thống.' },
      { note: 'Thiết bị thông minh (smartphone, máy tính bảng, smart TV) cũng là máy tính — chỉ khác về hình dạng và mục đích sử dụng.' },
    ],
    examples: [
      { q: 'Vì sao điện thoại thông minh được xem là một loại máy tính?', a: 'Vì nó có bộ xử lý (CPU), bộ nhớ, và chạy chương trình (ứng dụng) để xử lý thông tin tự động — đúng định nghĩa máy tính, chỉ khác về kích thước và giao diện.' },
      { q: 'Hãy kể 3 nghề nghiệp trong lĩnh vực tin học và mô tả ngắn.', a: 'Lập trình viên: viết phần mềm; Nhà khoa học dữ liệu: phân tích dữ liệu, xây mô hình; Kỹ sư an ninh mạng: bảo vệ hệ thống khỏi tấn công.' },
    ],
  },

  'H10TIN-w02-quiz': {
    topic: 'Biểu diễn thông tin trong máy tính',
    intro: 'Các em ơi, máy tính chỉ "hiểu" hai trạng thái: có điện và không điện, tương ứng với 1 và 0. Hôm nay chúng ta tìm hiểu cách máy tính dùng các con số 0-1 để biểu diễn mọi thông tin, và các đơn vị đo dung lượng.',
    objectives: [
      'Nắm được bit và byte là gì, mối quan hệ giữa các đơn vị dung lượng.',
      'Hiểu hệ đếm nhị phân và hệ thập lục phân.',
      'Quy đổi được giữa các đơn vị KB, MB, GB.',
    ],
    theory: [
      { h: 'Bit — đơn vị nhỏ nhất' },
      { p: 'Bit (viết tắt của binary digit) là đơn vị nhỏ nhất biểu diễn thông tin trong máy tính, nhận một trong hai giá trị: 0 hoặc 1. Mọi dữ liệu — số, chữ, ảnh, âm thanh — cuối cùng đều được lưu thành dãy bit.' },
      { h: 'Byte và các bội số' },
      { ul: ['1 byte = 8 bit (đủ biểu diễn 256 trạng thái khác nhau).', '1 KB = 1024 byte = 2¹⁰ byte.', '1 MB = 1024 KB.', '1 GB = 1024 MB.', '1 TB = 1024 GB.'] },
      { note: 'Trong tin học, các bội số nhân theo 1024 (luỹ thừa của 2), không phải 1000 như đơn vị thập phân thông thường.' },
      { h: 'Hệ đếm nhị phân' },
      { p: 'Hệ nhị phân (cơ số 2) chỉ dùng hai ký số 0 và 1, phù hợp với bản chất "đóng/mở" của mạch điện trong máy tính. Ví dụ: số 5 trong hệ thập phân được viết là 101 trong hệ nhị phân.' },
      { h: 'Hệ thập lục phân (hex)' },
      { p: 'Hệ thập lục phân (cơ số 16) dùng 16 ký số: 0-9 và A, B, C, D, E, F (tương ứng 10-15). Hex giúp con người viết gọn các dãy nhị phân dài — mỗi ký số hex thay cho 4 bit.' },
    ],
    examples: [
      { q: 'Một file ảnh nặng 2048 KB. File này bằng bao nhiêu MB?', a: '2048 KB ÷ 1024 = 2 MB.' },
      { q: 'Đổi số thập phân 5 sang hệ nhị phân.', a: '5 = 4 + 1 = 2² + 2⁰ → viết là 101 trong hệ nhị phân.' },
    ],
  },

  'H10TIN-w03-quiz': {
    topic: 'ASCII và Unicode',
    intro: 'Chào các em. Máy tính lưu chữ cái như thế nào nếu nó chỉ biết số? Câu trả lời nằm ở các bảng mã ký tự — mỗi chữ được gán một con số. Hôm nay ta tìm hiểu ASCII và Unicode, đặc biệt cách hiển thị tiếng Việt có dấu.',
    objectives: [
      'Hiểu nguyên lý mã hoá ký tự: mỗi ký tự ứng với một mã số.',
      'Phân biệt ASCII và Unicode.',
      'Biết vì sao web hiện đại dùng UTF-8 để hiển thị tiếng Việt.',
    ],
    theory: [
      { h: 'Bảng mã ASCII' },
      { p: 'ASCII (American Standard Code for Information Interchange) là bảng mã 7 bit, biểu diễn được 128 ký tự gồm chữ cái Latin, chữ số, dấu câu và các ký tự điều khiển. Đây là bảng mã nền tảng của tin học.' },
      { ul: ['Chữ "A" có mã 65, "B" là 66, ...', 'Chữ "a" có mã 97 — cách "A" đúng 32 đơn vị.', 'Chữ số "0" có mã 48.'] },
      { h: 'Hạn chế của ASCII' },
      { p: 'ASCII chỉ có 128 ký tự nên không đủ chỗ cho tiếng Việt có dấu, chữ Hán, chữ Ả Rập hay emoji. Vì thế người ta cần một bảng mã lớn hơn.' },
      { h: 'Unicode' },
      { p: 'Unicode là bảng mã thống nhất, đủ chỗ biểu diễn mọi ký tự của mọi ngôn ngữ trên thế giới, kể cả emoji. Các cách mã hoá Unicode phổ biến là UTF-8, UTF-16.' },
      { h: 'UTF-8 và tiếng Việt' },
      { p: 'UTF-8 mã hoá linh hoạt từ 1 đến 4 byte cho mỗi ký tự và tương thích ngược với ASCII (ký tự ASCII vẫn dùng 1 byte). Nhờ UTF-8, web hiện đại hiển thị đúng tiếng Việt có dấu và mọi ngôn ngữ.' },
      { note: 'Các bảng mã cũ như TCVN3, VNI thường gây lỗi font khi gặp hệ thống khác; UTF-8 là chuẩn chung an toàn nhất hiện nay.' },
    ],
    examples: [
      { q: 'Mã ASCII của "A" là 65, vậy mã của "C" là bao nhiêu?', a: '"C" đứng sau "A" hai vị trí: 65 + 2 = 67.' },
      { q: 'Vì sao nên lưu file văn bản tiếng Việt bằng UTF-8?', a: 'Vì UTF-8 biểu diễn được đầy đủ ký tự tiếng Việt có dấu và tương thích với hầu hết phần mềm, tránh lỗi font khi mở trên máy khác.' },
    ],
  },

  'H10TIN-w04-quiz': {
    topic: 'Biểu diễn số và hình ảnh',
    intro: 'Các em thân mến, sau khi biết chữ được mã hoá thế nào, hôm nay ta xem máy tính biểu diễn số (nguyên, thực) và hình ảnh số ra sao — từ điểm ảnh đến hệ màu RGB và các định dạng ảnh.',
    objectives: [
      'Hiểu cách biểu diễn số nguyên và số thực trong máy tính.',
      'Nắm khái niệm điểm ảnh (pixel) và hệ màu RGB.',
      'Phân biệt được ảnh nén có mất (JPG) và nén không mất (PNG).',
    ],
    theory: [
      { h: 'Biểu diễn số nguyên' },
      { p: 'Số nguyên được lưu dưới dạng nhị phân. Với số âm, máy tính dùng thêm một bit dấu hoặc kỹ thuật bù 2 (two\'s complement) để biểu diễn.' },
      { h: 'Biểu diễn số thực' },
      { p: 'Số thực (có phần thập phân) được biểu diễn theo chuẩn dấu phẩy động IEEE 754. Cách này cho phép lưu số rất lớn hoặc rất nhỏ, nhưng đôi khi có sai số làm tròn nhỏ.' },
      { h: 'Điểm ảnh và hệ màu RGB' },
      { p: 'Hình ảnh số được tạo từ các điểm ảnh (pixel) — đơn vị nhỏ nhất của ảnh. Mỗi pixel có một màu, thường mã hoá theo hệ RGB.' },
      { ul: ['RGB = Red (đỏ) + Green (lục) + Blue (lam).', 'Mỗi kênh màu dùng 8 bit, nhận giá trị 0-255.', 'Tổng 24 bit/pixel cho khoảng 16,7 triệu màu.'] },
      { h: 'Định dạng ảnh' },
      { p: 'JPG dùng nén có mất (lossy): file nhỏ hơn nhưng giảm chất lượng, phù hợp ảnh chụp. PNG dùng nén không mất (lossless): giữ nguyên chất lượng, hỗ trợ nền trong suốt, phù hợp ảnh đồ hoạ, logo.' },
    ],
    examples: [
      { q: 'Một màu RGB có giá trị (255, 0, 0) là màu gì?', a: 'Kênh đỏ ở mức tối đa (255), lục và lam bằng 0 — đó là màu đỏ tinh khiết.' },
      { q: 'Cần lưu một logo có nền trong suốt, nên chọn JPG hay PNG? Vì sao?', a: 'Chọn PNG, vì PNG hỗ trợ nền trong suốt và nén không mất nên giữ được nét sắc của logo.' },
    ],
  },

  'H10TIN-w05-quiz': {
    topic: 'Mạng máy tính và Internet',
    intro: 'Chào các em. Internet kết nối hàng tỷ thiết bị trên toàn cầu. Hôm nay ta tìm hiểu mạng máy tính, Internet và các khái niệm nền tảng như giao thức TCP/IP, địa chỉ IP, DNS và WWW.',
    objectives: [
      'Hiểu khái niệm mạng máy tính và Internet.',
      'Nắm vai trò của giao thức TCP/IP, địa chỉ IP và DNS.',
      'Phân biệt Internet với dịch vụ WWW.',
    ],
    theory: [
      { h: 'Mạng máy tính' },
      { p: 'Mạng máy tính là hệ thống nhiều thiết bị (máy tính, điện thoại, máy in...) được kết nối với nhau để chia sẻ tài nguyên và trao đổi dữ liệu. Mạng nhỏ trong một phòng/toà nhà gọi là LAN; mạng diện rộng gọi là WAN.' },
      { h: 'Internet' },
      { p: 'Internet là "mạng của các mạng" — kết nối hàng tỷ thiết bị trên toàn cầu. Mọi thiết bị giao tiếp với nhau dựa trên bộ giao thức nền tảng TCP/IP.' },
      { h: 'Địa chỉ IP và DNS' },
      { ul: ['Mỗi thiết bị trên Internet có một địa chỉ IP duy nhất (IPv4 hoặc IPv6).', 'DNS (Domain Name System) chuyển tên miền dễ nhớ như google.com thành địa chỉ IP.'] },
      { h: 'WWW — World Wide Web' },
      { p: 'WWW là một dịch vụ chạy trên Internet, cho phép truy cập các trang web qua giao thức HTTP/HTTPS. Cần phân biệt: Internet là hạ tầng mạng, còn WWW chỉ là một trong nhiều dịch vụ (cùng với email, truyền tệp...).' },
      { note: 'Khi gõ một tên miền vào trình duyệt, DNS sẽ tra ra địa chỉ IP rồi trình duyệt mới kết nối tới máy chủ web đó.' },
    ],
    examples: [
      { q: 'Khi gõ "tizia.vn" vào trình duyệt, thành phần nào giúp tìm ra địa chỉ IP của máy chủ?', a: 'DNS (Domain Name System) — nó dịch tên miền tizia.vn thành địa chỉ IP để trình duyệt kết nối.' },
      { q: 'Internet và WWW có phải là một không?', a: 'Không. Internet là hạ tầng mạng toàn cầu; WWW (web) chỉ là một dịch vụ chạy trên Internet, bên cạnh email, truyền tệp...' },
    ],
  },

  'H10TIN-w06-quiz': {
    topic: 'An toàn thông tin cá nhân',
    intro: 'Các em ơi, sống trong môi trường số, bảo vệ thông tin cá nhân là kỹ năng sống còn. Hôm nay ta học về các nguyên tắc an toàn: mật khẩu mạnh, xác thực hai yếu tố, và cách phòng tránh lừa đảo, mã độc.',
    objectives: [
      'Hiểu ba trụ cột an toàn thông tin: bảo mật, toàn vẹn, sẵn sàng (CIA).',
      'Biết cách đặt mật khẩu mạnh và dùng xác thực hai yếu tố.',
      'Nhận diện và phòng tránh phishing, malware.',
    ],
    theory: [
      { h: 'Bộ ba CIA' },
      { ul: ['Confidentiality (Bảo mật): chỉ người có quyền mới xem được dữ liệu.', 'Integrity (Toàn vẹn): dữ liệu không bị thay đổi trái phép.', 'Availability (Sẵn sàng): dữ liệu luôn sẵn sàng khi cần.'] },
      { h: 'Mật khẩu mạnh' },
      { p: 'Mật khẩu mạnh nên dài tối thiểu 8 ký tự, kết hợp chữ hoa, chữ thường, số và ký tự đặc biệt, và không liên quan đến thông tin cá nhân (tên, ngày sinh). Tránh các mật khẩu dễ đoán như 123456.' },
      { h: 'Xác thực hai yếu tố (2FA)' },
      { p: '2FA yêu cầu thêm một yếu tố thứ hai ngoài mật khẩu — như mã OTP gửi qua điện thoại, vân tay, hoặc khoá vật lý. Nhờ đó, dù mật khẩu bị lộ, kẻ xấu vẫn khó đăng nhập.' },
      { h: 'Phishing và malware' },
      { p: 'Phishing là chiêu lừa đảo: kẻ xấu giả mạo email, website ngân hàng... để dụ người dùng nhập mật khẩu, OTP. Malware (phần mềm độc hại) gồm virus, trojan, ransomware, spyware. Nguyên tắc: không click link lạ, không nhập thông tin nhạy cảm vào trang đáng ngờ.' },
      { note: 'Khi nhận email yêu cầu "xác minh tài khoản gấp" kèm link lạ — hãy nghi ngờ, kiểm tra địa chỉ gửi và không click.' },
    ],
    examples: [
      { q: 'Mật khẩu "namsinh2008" có mạnh không? Vì sao?', a: 'Không mạnh, vì nó liên quan đến thông tin cá nhân (tên + năm sinh) nên dễ bị đoán. Nên dùng chuỗi ngẫu nhiên có chữ hoa, số, ký tự đặc biệt.' },
      { q: 'Nhận email báo trúng thưởng kèm link "nhận quà ngay", em nên làm gì?', a: 'Không click link, không nhập thông tin cá nhân. Đây là dấu hiệu điển hình của phishing.' },
    ],
  },

  'H10TIN-w07-quiz': {
    topic: 'Đạo đức và pháp luật khi sử dụng Internet',
    intro: 'Chào các em. Mạng Internet cho ta tự do chia sẻ, nhưng tự do luôn đi kèm trách nhiệm. Hôm nay ta bàn về văn hoá ứng xử, đạo đức và pháp luật khi tham gia không gian mạng.',
    objectives: [
      'Hiểu trách nhiệm khi đăng tải nội dung lên mạng xã hội.',
      'Nhận biết tác hại của tin giả và hành vi bắt nạt qua mạng.',
      'Biết quy định pháp luật về bản quyền và tin sai sự thật.',
    ],
    theory: [
      { h: 'Ứng xử văn minh trên mạng' },
      { p: 'Khi đăng bài, bình luận, ta cần tôn trọng người khác, không xúc phạm, không lan truyền thông tin chưa kiểm chứng. Mọi phát ngôn trên mạng đều có thể để lại "dấu chân số" lâu dài.' },
      { h: 'Tin giả (fake news)' },
      { p: 'Tin giả gây hoang mang dư luận, định hướng sai và có thể gây thiệt hại kinh tế - xã hội. Trước khi chia sẻ, hãy kiểm tra nguồn tin từ các cơ quan, báo chí chính thống.' },
      { h: 'Pháp luật Việt Nam' },
      { ul: ['Đăng tin sai sự thật có thể bị xử phạt hành chính (thường 7,5-10 triệu đồng) hoặc xử lý hình sự nếu nghiêm trọng.', 'Nội dung trên Internet vẫn có bản quyền: phải xin phép hoặc ghi rõ nguồn khi sử dụng.'] },
      { h: 'Bắt nạt qua mạng (cyberbullying)' },
      { p: 'Cyberbullying là hành vi xúc phạm, đe doạ, làm nhục người khác qua không gian mạng — có thể vi phạm pháp luật. Nếu bị bắt nạt: lưu bằng chứng (chụp màn hình), chặn người bắt nạt, và báo cho người lớn, nhà trường hoặc cơ quan chức năng.' },
      { note: 'Đừng "đáp trả" bằng cách bắt nạt lại — hãy thu thập bằng chứng và tìm sự trợ giúp chính thức.' },
    ],
    examples: [
      { q: 'Bạn em chia sẻ một tin "sắp có động đất lớn" chưa rõ nguồn. Em nên làm gì?', a: 'Không vội chia sẻ tiếp; kiểm tra nguồn từ cơ quan khí tượng hoặc báo chính thống. Nếu là tin giả, khuyên bạn gỡ và không lan truyền.' },
      { q: 'Bị một tài khoản ẩn danh liên tục nhắn tin đe doạ, em xử lý thế nào?', a: 'Lưu lại bằng chứng (chụp màn hình tin nhắn), chặn tài khoản đó, và báo cho thầy cô/cha mẹ hoặc cơ quan chức năng.' },
    ],
  },

  'H10TIN-w08-quiz': {
    topic: 'Phần mềm và hệ điều hành',
    intro: 'Các em thân mến, máy tính cần phần mềm mới hoạt động được. Hôm nay ta phân loại phần mềm, tìm hiểu vai trò của hệ điều hành và khái niệm phần mềm mã nguồn mở.',
    objectives: [
      'Phân biệt phần mềm hệ thống và phần mềm ứng dụng.',
      'Hiểu vai trò của hệ điều hành.',
      'Nắm khái niệm phần mềm mã nguồn mở và ví dụ.',
    ],
    theory: [
      { h: 'Phân loại phần mềm' },
      { ul: ['Phần mềm hệ thống: hệ điều hành (Windows, Linux...) quản lý phần cứng và làm nền chạy ứng dụng.', 'Phần mềm ứng dụng: phục vụ công việc cụ thể (Word, trình duyệt, game...).'] },
      { h: 'Hệ điều hành (OS)' },
      { p: 'Hệ điều hành là phần mềm quản lý toàn bộ tài nguyên máy tính: CPU, bộ nhớ, thiết bị, tệp tin, và điều phối việc chạy các ứng dụng. Không có OS, máy tính không thể vận hành.' },
      { ul: ['Trên PC: Windows (phổ biến nhất), macOS, Linux.', 'Trên điện thoại: Android, iOS.'] },
      { h: 'Phần mềm mã nguồn mở (open source)' },
      { p: 'Phần mềm mã nguồn mở cho phép xem, sửa đổi và phân phối lại mã nguồn, thường theo các giấy phép như GPL, MIT. Điều này khuyến khích cộng đồng cùng phát triển.' },
      { note: 'Ví dụ mã nguồn mở quen thuộc: hệ điều hành Linux, trình duyệt Firefox, bộ văn phòng LibreOffice, ngôn ngữ Python.' },
    ],
    examples: [
      { q: 'Microsoft Word thuộc loại phần mềm nào?', a: 'Phần mềm ứng dụng — phục vụ công việc soạn thảo văn bản cụ thể, chạy trên nền hệ điều hành.' },
      { q: 'Kể tên hai phần mềm mã nguồn mở và cho biết công dụng.', a: 'Firefox: trình duyệt web; LibreOffice: bộ ứng dụng văn phòng (soạn thảo, bảng tính, trình chiếu).' },
    ],
  },

  'H10TIN-w09-quiz': {
    topic: 'Làm quen với Python',
    intro: 'Chào các em! Từ tuần này, chúng ta bước vào lập trình với ngôn ngữ Python — một ngôn ngữ trong sáng, dễ học, được dùng rộng rãi từ web đến AI. Hãy bắt đầu với chương trình đầu tiên.',
    objectives: [
      'Biết Python là ngôn ngữ lập trình bậc cao, thông dịch.',
      'Sử dụng được lệnh print() để in ra màn hình.',
      'Viết được chú thích (comment) trong Python.',
    ],
    theory: [
      { h: 'Python là gì?' },
      { p: 'Python là ngôn ngữ lập trình bậc cao, thông dịch (interpreted), đa năng, do Guido van Rossum tạo ra năm 1991. Cú pháp gần với tiếng Anh tự nhiên nên rất dễ đọc, dễ học.' },
      { h: 'Trình thông dịch' },
      { p: 'Khác với ngôn ngữ biên dịch (C++), Python cần một trình thông dịch (interpreter) để chạy từng dòng lệnh. Em có thể chạy Python trực tiếp trong môi trường lập trình hoặc trên các nền tảng trực tuyến.' },
      { h: 'Lệnh in ra màn hình' },
      { p: 'Lệnh print() dùng để in dữ liệu ra màn hình. Ví dụ lệnh in dòng chữ Hello:' },
      { ul: ['print(\'Hello\') in ra: Hello (không kèm dấu nháy).', 'print(\'Xin chao\', \'cac em\') in ra: Xin chao cac em.', 'print(2 + 3) in ra: 5 (tính rồi in kết quả).'] },
      { h: 'Chú thích (comment)' },
      { p: 'Chú thích là dòng ghi chú cho người đọc, máy tính bỏ qua khi chạy. Trong Python, chú thích một dòng bắt đầu bằng dấu #.' },
      { note: 'Python phân biệt chữ hoa - thường: Print() (chữ P hoa) sẽ báo lỗi, phải viết print() đúng chữ thường.' },
    ],
    examples: [
      { q: 'Viết chương trình in ra dòng chữ: Em yeu Tin hoc', a: 'print(\'Em yeu Tin hoc\')' },
      { q: 'Viết chương trình in ra hai dòng: dòng 1 là tên em, dòng 2 là lớp 10.', a: 'print(\'Nguyen Van A\')\nprint(\'Lop 10\')   # hoặc: print(\'Nguyen Van A\\nLop 10\')' },
    ],
  },

  'H10TIN-w10-quiz': {
    topic: 'Biến và kiểu dữ liệu',
    intro: 'Các em ơi, để chương trình ghi nhớ và xử lý dữ liệu, ta cần "biến". Hôm nay ta học cách tạo biến trong Python và bốn kiểu dữ liệu cơ bản: số nguyên, số thực, chuỗi và logic.',
    objectives: [
      'Hiểu khái niệm biến và cách khai báo biến trong Python.',
      'Phân biệt các kiểu dữ liệu int, float, str, bool.',
      'Gán giá trị cho biến và kiểm tra kiểu của biến.',
    ],
    theory: [
      { h: 'Biến là gì?' },
      { p: 'Biến là một cái tên gắn với một vùng nhớ chứa giá trị. Ta dùng biến để lưu trữ và xử lý dữ liệu trong chương trình.' },
      { h: 'Khai báo biến trong Python' },
      { p: 'Python dùng cơ chế gán giá trị trực tiếp — không cần khai báo kiểu trước. Chỉ cần viết: ten_bien = gia_tri. Ví dụ: tuoi = 15 sẽ tạo biến tuoi mang giá trị 15.' },
      { h: 'Bốn kiểu dữ liệu cơ bản' },
      { ul: ['int — số nguyên: 5, -10, 100.', 'float — số thực: 3.14, -2.5, 0.0.', 'str — chuỗi ký tự: \'Python\', \'lop 10\' (dùng dấu nháy).', 'bool — logic: chỉ có hai giá trị True và False (viết hoa chữ đầu).'] },
      { h: 'Python là ngôn ngữ định kiểu động' },
      { p: 'Kiểu của biến được xác định tự động theo giá trị gán vào, và có thể thay đổi. Hàm type(x) cho biết kiểu hiện tại của biến x.' },
      { note: 'Tên biến nên có nghĩa (vd: diem, ten_hoc_sinh), bắt đầu bằng chữ cái hoặc dấu gạch dưới, không chứa dấu cách.' },
    ],
    examples: [
      { q: 'Tạo một biến lưu điểm trung bình là 8.5 và một biến lưu họ tên là Lan.', a: 'diem_tb = 8.5      # kiểu float\nho_ten = \'Lan\'     # kiểu str' },
      { q: 'Biến x = 7 có kiểu gì? Làm sao kiểm tra bằng Python?', a: 'x = 7 là kiểu int (số nguyên). Kiểm tra bằng: print(type(x)) — kết quả hiển thị <class \'int\'>.' },
    ],
  },

  'H10TIN-w11-quiz': {
    topic: 'Toán tử và biểu thức',
    intro: 'Chào các em. Sau khi có biến, ta cần thực hiện tính toán. Hôm nay ta học các toán tử số học, toán tử so sánh trong Python, đặc biệt là phép chia nguyên, chia dư và luỹ thừa.',
    objectives: [
      'Sử dụng được các toán tử số học của Python.',
      'Phân biệt phép chia thực /, chia nguyên // và chia lấy dư %.',
      'Hiểu các toán tử so sánh và sự khác nhau giữa = và ==.',
    ],
    theory: [
      { h: 'Toán tử số học' },
      { ul: ['+ cộng, - trừ, * nhân.', '/ chia thực (luôn cho kết quả số thực float).', '// chia lấy phần nguyên.', '% chia lấy dư (modulo).', '** luỹ thừa.'] },
      { h: 'Ví dụ phép chia' },
      { p: 'Trong Python 3, các phép chia cho kết quả khác nhau:' },
      { ul: ['7 / 2 = 3.5 (chia thực, kết quả float).', '7 // 2 = 3 (lấy phần nguyên).', '7 % 2 = 1 (lấy số dư).', '2 ** 3 = 8 (2 mũ 3).'] },
      { h: 'Toán tử so sánh' },
      { p: 'Các toán tử so sánh trả về True hoặc False: == (bằng), != (khác), > (lớn hơn), < (nhỏ hơn), >= (lớn hơn hoặc bằng), <= (nhỏ hơn hoặc bằng).' },
      { note: 'Phân biệt rõ: dấu = dùng để gán giá trị (x = 5), còn dấu == dùng để so sánh bằng (x == 5).' },
    ],
    examples: [
      { q: 'Tính và cho biết kết quả: 17 // 5 và 17 % 5.', a: '17 // 5 = 3 (phần nguyên); 17 % 5 = 2 (số dư). Kiểm tra: 5 × 3 + 2 = 17.' },
      { q: 'Viết biểu thức kiểm tra số n có chia hết cho 3 không.', a: 'n % 3 == 0   # True nếu n chia hết cho 3, ngược lại False' },
    ],
  },

  'H10TIN-w12-quiz': {
    topic: 'Câu lệnh nhập - xuất',
    intro: 'Các em thân mến, chương trình thú vị hơn khi nó "trò chuyện" được với người dùng. Hôm nay ta học cách nhập dữ liệu từ bàn phím bằng input() và xuất dữ liệu đẹp mắt bằng f-string.',
    objectives: [
      'Sử dụng được hàm input() để nhập dữ liệu.',
      'Hiểu input() luôn trả về chuỗi và biết cách ép kiểu.',
      'In dữ liệu có định dạng bằng f-string.',
    ],
    theory: [
      { h: 'Nhập dữ liệu với input()' },
      { p: 'Hàm input() đọc một dòng người dùng gõ từ bàn phím. Lưu ý quan trọng: input() luôn trả về dữ liệu kiểu chuỗi (str), kể cả khi người dùng gõ số.' },
      { h: 'Ép kiểu dữ liệu' },
      { p: 'Để dùng dữ liệu nhập vào như một con số, ta phải ép kiểu:' },
      { ul: ['int(s) — đổi chuỗi sang số nguyên: int(\'5\') = 5.', 'float(s) — đổi chuỗi sang số thực: float(\'3.14\') = 3.14.', 'str(x) — đổi số sang chuỗi.'] },
      { h: 'Xuất dữ liệu có định dạng' },
      { p: 'f-string là cách định dạng hiện đại và gọn gàng nhất: đặt chữ f trước dấu nháy và chèn biến trong cặp ngoặc nhọn. Ví dụ: f\'Tuoi cua em la {tuoi}\'.' },
      { note: 'Quên ép kiểu khi tính toán với input() là lỗi rất thường gặp: \'5\' + \'3\' cho \'53\' (nối chuỗi), còn 5 + 3 mới cho 8.' },
    ],
    examples: [
      { q: 'Viết chương trình nhập tuổi rồi in ra: Nam sau em <tuoi+1> tuoi.', a: 'tuoi = int(input(\'Nhap tuoi: \'))\nprint(f\'Nam sau em {tuoi + 1} tuoi\')' },
      { q: 'Vì sao đoạn sau bị sai: a = input(); b = input(); print(a + b) khi muốn cộng hai số?', a: 'Vì input() trả về chuỗi, a + b sẽ nối chuỗi thay vì cộng số. Cần ép kiểu: a = int(input()); b = int(input()).' },
    ],
  },

  'H10TIN-w13-quiz': {
    topic: 'Câu lệnh điều kiện if-else',
    intro: 'Chào các em. Để chương trình "ra quyết định", ta dùng câu lệnh điều kiện. Hôm nay ta học cấu trúc if - elif - else trong Python và quy tắc thụt lề đặc trưng của ngôn ngữ này.',
    objectives: [
      'Viết được câu lệnh if, if-else, if-elif-else.',
      'Hiểu vai trò của thụt lề (indentation) trong Python.',
      'Kết hợp điều kiện với các toán tử logic and, or, not.',
    ],
    theory: [
      { h: 'Cấu trúc if' },
      { p: 'Câu lệnh điều kiện cho phép chạy một khối lệnh chỉ khi điều kiện đúng. Cú pháp: viết if điều_kiện: rồi xuống dòng, thụt lề khối lệnh bên trong.' },
      { h: 'Thụt lề trong Python' },
      { p: 'Khác với C/Java dùng dấu ngoặc nhọn {}, Python dùng thụt lề (thường 4 dấu cách) để xác định khối lệnh. Thụt lề sai sẽ gây lỗi hoặc làm chương trình chạy sai logic.' },
      { h: 'if - elif - else' },
      { ul: ['if: kiểm tra điều kiện đầu tiên.', 'elif: kiểm tra điều kiện tiếp theo nếu các điều kiện trước sai.', 'else: chạy khi tất cả điều kiện trên đều sai.'] },
      { h: 'Toán tử logic' },
      { p: 'Python dùng từ khoá tiếng Anh: and (và), or (hoặc), not (phủ định) — viết chữ thường. Ví dụ: if diem >= 5 and diem <= 10:.' },
      { note: 'Mỗi dòng if/elif/else đều kết thúc bằng dấu hai chấm, và khối lệnh bên dưới phải được thụt lề đều nhau.' },
    ],
    examples: [
      { q: 'Viết chương trình nhập điểm, in "Dat" nếu điểm >= 5, ngược lại in "Truot".', a: 'diem = float(input(\'Nhap diem: \'))\nif diem >= 5:\n    print(\'Dat\')\nelse:\n    print(\'Truot\')' },
      { q: 'Xếp loại: >= 8 Gioi, >= 6.5 Kha, >= 5 Trung binh, còn lại Yeu.', a: 'if diem >= 8:\n    print(\'Gioi\')\nelif diem >= 6.5:\n    print(\'Kha\')\nelif diem >= 5:\n    print(\'Trung binh\')\nelse:\n    print(\'Yeu\')' },
    ],
  },

  'H10TIN-w14-quiz': {
    topic: 'Vòng lặp for',
    intro: 'Các em ơi, máy tính rất giỏi lặp đi lặp lại công việc. Hôm nay ta học vòng lặp for cùng hàm range() — công cụ để lặp một số lần xác định trước.',
    objectives: [
      'Viết được vòng lặp for với hàm range().',
      'Hiểu cách hoạt động của range(stop), range(start, stop), range(start, stop, step).',
      'Áp dụng vòng for để tính tổng, in dãy số.',
    ],
    theory: [
      { h: 'Cú pháp vòng for' },
      { p: 'Vòng for lặp qua từng phần tử của một dãy. Cú pháp: for biến in dãy: rồi thụt lề khối lệnh lặp.' },
      { h: 'Hàm range()' },
      { ul: ['range(5) sinh dãy: 0, 1, 2, 3, 4 (không gồm 5).', 'range(1, 6) sinh: 1, 2, 3, 4, 5 (từ start đến stop-1).', 'range(0, 10, 2) sinh: 0, 2, 4, 6, 8 (bước nhảy step = 2).'] },
      { h: 'Lặp một số lần xác định' },
      { p: 'Khi chỉ cần lặp n lần mà không quan tâm biến đếm, ta thường dùng tên biến _ : for _ in range(n):.' },
      { h: 'Tính tổng bằng vòng lặp' },
      { p: 'Mẫu thường gặp: khởi tạo biến tổng = 0, rồi cộng dồn trong vòng lặp. Python còn có hàm sum() để tính tổng nhanh, ví dụ sum(range(1, 101)) cho 5050.' },
      { note: 'Nhớ rằng range(n) bắt đầu từ 0 và KHÔNG bao gồm n — đây là điểm dễ nhầm.' },
    ],
    examples: [
      { q: 'Viết chương trình in các số từ 1 đến 5, mỗi số một dòng.', a: 'for i in range(1, 6):\n    print(i)' },
      { q: 'Tính tổng các số từ 1 đến 100 bằng vòng for.', a: 'tong = 0\nfor i in range(1, 101):\n    tong = tong + i\nprint(tong)    # 5050' },
    ],
  },

  'H10TIN-w15-quiz': {
    topic: 'Vòng lặp while',
    intro: 'Chào các em. Khi không biết trước phải lặp bao nhiêu lần, ta dùng vòng lặp while. Hôm nay ta học cú pháp while, lệnh break, continue và cách tránh vòng lặp vô hạn.',
    objectives: [
      'Viết được vòng lặp while.',
      'Sử dụng break và continue đúng mục đích.',
      'Phân biệt khi nào nên dùng while thay vì for.',
    ],
    theory: [
      { h: 'Cú pháp while' },
      { p: 'Vòng while lặp lại khối lệnh khi điều kiện còn đúng (True), và dừng khi điều kiện sai (False). Cú pháp: while điều_kiện: rồi thụt lề khối lệnh.' },
      { h: 'break và continue' },
      { ul: ['break: thoát ngay khỏi vòng lặp gần nhất.', 'continue: bỏ qua phần còn lại của lần lặp hiện tại, chuyển sang lần lặp tiếp theo.'] },
      { h: 'Nguy cơ vòng lặp vô hạn' },
      { p: 'Nếu điều kiện luôn đúng và không có lệnh thay đổi biến điều khiển (hoặc break), vòng while sẽ chạy mãi không dừng — gọi là vòng lặp vô hạn. Phải đảm bảo biến điều kiện thay đổi để vòng lặp có thể kết thúc.' },
      { h: 'Khi nào dùng while?' },
      { p: 'Dùng for khi biết trước số lần lặp; dùng while khi số lần lặp không xác định trước, ví dụ: lặp cho đến khi người dùng nhập đúng mật khẩu.' },
      { note: 'Luôn kiểm tra: trong thân vòng while có lệnh nào làm điều kiện tiến tới False không? Nếu không, bạn đã tạo vòng lặp vô hạn.' },
    ],
    examples: [
      { q: 'In các số từ 1 đến 5 bằng vòng while.', a: 'i = 1\nwhile i <= 5:\n    print(i)\n    i = i + 1' },
      { q: 'Yêu cầu người dùng nhập số dương; lặp lại đến khi nhập đúng.', a: 'n = int(input(\'Nhap so duong: \'))\nwhile n <= 0:\n    print(\'Sai, nhap lai!\')\n    n = int(input(\'Nhap so duong: \'))\nprint(\'Cam on\')' },
    ],
  },

  'H10TIN-w16-quiz': {
    topic: 'Hàm trong Python',
    intro: 'Các em thân mến, khi một đoạn lệnh được dùng nhiều lần, ta nên đóng gói thành hàm. Hôm nay ta học cách định nghĩa hàm bằng def, truyền tham số, trả về giá trị và khái niệm phạm vi biến.',
    objectives: [
      'Định nghĩa hàm bằng từ khoá def và truyền tham số.',
      'Dùng return để trả về giá trị; hiểu hàm không return trả về None.',
      'Hiểu phạm vi (scope) cục bộ của biến trong hàm.',
    ],
    theory: [
      { h: 'Định nghĩa hàm' },
      { p: 'Hàm là một khối lệnh có tên, thực hiện một nhiệm vụ cụ thể, có thể tái sử dụng. Cú pháp: def ten_ham(tham_so): rồi thụt lề thân hàm.' },
      { h: 'Tham số và lời gọi hàm' },
      { p: 'Tham số là dữ liệu đầu vào của hàm. Khi gọi hàm, ta truyền giá trị (đối số) tương ứng. Ví dụ hàm chao(ten) in lời chào theo tên truyền vào.' },
      { h: 'Trả về giá trị với return' },
      { ul: ['return trả về kết quả cho nơi gọi hàm.', 'Hàm không có return sẽ tự động trả về None.', 'Sau return, hàm kết thúc ngay lập tức.'] },
      { h: 'Phạm vi biến (scope)' },
      { p: 'Biến tạo trong thân hàm là biến cục bộ (local) — chỉ tồn tại bên trong hàm, không nhìn thấy từ bên ngoài. Khi một hàm tự gọi chính nó để giải bài toán nhỏ hơn, ta gọi là đệ quy (recursion).' },
      { note: 'Phân biệt: print() chỉ hiển thị ra màn hình; return mới trả giá trị để chương trình dùng tiếp.' },
    ],
    examples: [
      { q: 'Viết hàm tinh_tong(a, b) trả về tổng hai số, rồi gọi với 3 và 5.', a: 'def tinh_tong(a, b):\n    return a + b\n\nkq = tinh_tong(3, 5)\nprint(kq)    # 8' },
      { q: 'Viết hàm chao(ten) in ra lời chào.', a: 'def chao(ten):\n    print(\'Xin chao,\', ten)\n\nchao(\'Lan\')   # Xin chao, Lan' },
    ],
  },

  'H10TIN-w17-quiz': {
    topic: 'Danh sách (list) và chuỗi (string)',
    intro: 'Chào các em. Để lưu nhiều giá trị cùng lúc, Python có kiểu danh sách (list). Hôm nay ta học cách tạo, truy cập, thêm phần tử vào list, và một số thao tác cơ bản với chuỗi.',
    objectives: [
      'Tạo và truy cập phần tử của danh sách (list).',
      'Thêm phần tử, đếm số phần tử của list.',
      'Tạo và nối chuỗi (string) trong Python.',
    ],
    theory: [
      { h: 'Danh sách (list)' },
      { p: 'List là một dãy có thứ tự gồm nhiều phần tử, khai báo bằng cặp dấu ngoặc vuông. Ví dụ: ds = [1, 2, 3] hoặc ten = [\'An\', \'Binh\', \'Chi\'].' },
      { h: 'Truy cập phần tử' },
      { p: 'Phần tử trong list được đánh chỉ số (index) bắt đầu từ 0. ds[0] là phần tử đầu tiên, ds[1] là phần tử thứ hai. Chỉ số âm đếm từ cuối: ds[-1] là phần tử cuối.' },
      { h: 'Một số thao tác với list' },
      { ul: ['ds.append(x): thêm x vào cuối danh sách.', 'len(ds): trả về số phần tử.', 'sum(ds): tổng các phần tử (với list số).', 'max(ds), min(ds): giá trị lớn nhất, nhỏ nhất.'] },
      { h: 'Chuỗi (string)' },
      { p: 'Chuỗi là dãy ký tự, tạo bằng dấu nháy đơn hoặc nháy kép. Nối hai chuỗi dùng toán tử +. Ví dụ: \'Hello\' + \' \' + \'World\' cho \'Hello World\'.' },
      { note: 'Cả list và string đều đánh chỉ số từ 0 và đều dùng được hàm len().' },
    ],
    examples: [
      { q: 'Tạo list điểm [7, 8, 9], thêm điểm 10 vào cuối rồi in số phần tử.', a: 'diem = [7, 8, 9]\ndiem.append(10)\nprint(len(diem))   # 4\nprint(diem)        # [7, 8, 9, 10]' },
      { q: 'Cho ho = \'Nguyen\' và ten = \'An\', ghép thành họ tên đầy đủ.', a: 'ho = \'Nguyen\'\nten = \'An\'\nho_ten = ho + \' \' + ten\nprint(ho_ten)   # Nguyen An' },
    ],
  },

  'H10TIN-w18-quiz': {
    topic: 'Ôn tập học kỳ 1',
    intro: 'Các em ơi, chúng ta đã đi hết học kỳ 1: từ kiến thức về máy tính, mạng, an toàn thông tin đến nền tảng lập trình Python. Tuần này ta hệ thống lại các kiến thức trọng tâm để chuẩn bị kiểm tra.',
    objectives: [
      'Hệ thống kiến thức về biểu diễn thông tin và đơn vị dung lượng.',
      'Ôn lại các thành phần cơ bản của Python: biến, kiểu dữ liệu, lệnh.',
      'Củng cố cấu trúc điều kiện, vòng lặp và hàm.',
    ],
    theory: [
      { h: 'Phần Máy tính và xã hội tri thức' },
      { ul: ['Bit là đơn vị nhỏ nhất; 1 byte = 8 bit; các bội số nhân theo 1024.', 'ASCII (7 bit, 128 ký tự); Unicode/UTF-8 cho mọi ngôn ngữ.', 'Internet dựa trên TCP/IP; DNS đổi tên miền sang IP.', 'An toàn thông tin: mật khẩu mạnh, 2FA, cảnh giác phishing.'] },
      { h: 'Phần Lập trình Python' },
      { ul: ['Lệnh in: print(); nhập: input() (trả về chuỗi).', 'Kiểu dữ liệu: int, float, str, bool.', 'Toán tử: //, %, ** và so sánh ==.'] },
      { h: 'Cấu trúc điều khiển' },
      { ul: ['Điều kiện: if - elif - else, dùng thụt lề.', 'Vòng lặp: for (với range), while.', 'Hàm: def ..., return giá trị.'] },
      { h: 'Lưu ý quan trọng' },
      { p: 'Python phân biệt chữ hoa - thường, dùng thụt lề để phân khối lệnh, và input() luôn trả về chuỗi nên phải ép kiểu khi cần tính toán.' },
      { note: 'Khi ôn, hãy tự gõ lại các ví dụ và chạy thử để nhớ lâu hơn thay vì chỉ đọc.' },
    ],
    examples: [
      { q: 'Một USB 8 GB chứa được khoảng bao nhiêu MB?', a: '8 GB × 1024 = 8192 MB.' },
      { q: 'Viết chương trình nhập một số, in "Chan" nếu chẵn, "Le" nếu lẻ.', a: 'n = int(input(\'Nhap so: \'))\nif n % 2 == 0:\n    print(\'Chan\')\nelse:\n    print(\'Le\')' },
    ],
  },

  'H10TIN-w19-quiz': {
    topic: 'Thuật toán và biểu diễn',
    intro: 'Chào các em, học kỳ 2 mở đầu bằng tư duy thuật toán — "linh hồn" của lập trình. Hôm nay ta học khái niệm thuật toán, các tính chất của nó và những cách biểu diễn thuật toán trước khi viết code.',
    objectives: [
      'Hiểu khái niệm và các tính chất của thuật toán.',
      'Biết các cách biểu diễn thuật toán: liệt kê, sơ đồ khối, mã giả.',
      'Hiểu vì sao nên thiết kế thuật toán trước khi viết code.',
    ],
    theory: [
      { h: 'Thuật toán là gì?' },
      { p: 'Thuật toán là một dãy hữu hạn các bước rõ ràng, được sắp xếp theo trình tự để giải một bài toán. Ví dụ đời thường: công thức nấu ăn cũng là một dạng thuật toán.' },
      { h: 'Các tính chất của thuật toán' },
      { ul: ['Tính dừng: sau hữu hạn bước phải kết thúc.', 'Tính xác định: mỗi bước rõ ràng, không mơ hồ.', 'Đầu vào và đầu ra: có dữ liệu vào và kết quả ra.', 'Tính hiệu quả: giải đúng và tiết kiệm tài nguyên.'] },
      { h: 'Các cách biểu diễn thuật toán' },
      { ul: ['Liệt kê các bước bằng ngôn ngữ tự nhiên.', 'Sơ đồ khối (flowchart): dùng hình vẽ.', 'Mã giả (pseudocode): gần ngôn ngữ tự nhiên, dễ chuyển thành code.'] },
      { h: 'Các khối trong sơ đồ khối' },
      { p: 'Hình oval cho điểm bắt đầu/kết thúc, hình chữ nhật cho bước xử lý, hình thoi cho điều kiện rẽ nhánh, và mũi tên chỉ luồng thực hiện.' },
      { note: 'Thiết kế thuật toán trước giúp ta hiểu rõ logic, tránh sai sót và viết code nhanh hơn.' },
    ],
    examples: [
      { q: 'Hãy liệt kê thuật toán tìm số lớn hơn trong hai số a và b.', a: 'Bước 1: Nhập a, b. Bước 2: Nếu a > b thì kết quả là a, ngược lại kết quả là b. Bước 3: In kết quả.' },
      { q: 'Trong sơ đồ khối, hình thoi dùng để biểu diễn gì?', a: 'Hình thoi biểu diễn điều kiện rẽ nhánh (kiểm tra đúng/sai để chọn hướng đi).' },
    ],
  },

  'H10TIN-w20-quiz': {
    topic: 'Thuật toán tìm kiếm tuyến tính',
    intro: 'Các em thân mến, tìm kiếm là một bài toán cơ bản. Hôm nay ta học thuật toán tìm kiếm tuyến tính — duyệt lần lượt từ đầu đến cuối để tìm một phần tử.',
    objectives: [
      'Hiểu nguyên lý của tìm kiếm tuyến tính.',
      'Biết độ phức tạp O(n) và khi nào nên dùng.',
      'Cài đặt tìm kiếm tuyến tính trong Python.',
    ],
    theory: [
      { h: 'Tìm kiếm tuyến tính là gì?' },
      { p: 'Tìm kiếm tuyến tính (linear search) duyệt tuần tự từng phần tử của danh sách, từ đầu đến cuối, so sánh với giá trị cần tìm. Khi gặp phần tử bằng giá trị cần tìm thì dừng và trả về vị trí.' },
      { h: 'Độ phức tạp' },
      { p: 'Trong trường hợp xấu nhất (phần tử ở cuối hoặc không có), ta phải duyệt cả n phần tử, nên độ phức tạp là O(n) — thời gian tăng tỉ lệ với kích thước dữ liệu.' },
      { h: 'Ưu điểm và khi nào dùng' },
      { ul: ['Không yêu cầu dữ liệu phải sắp xếp trước.', 'Đơn giản, dễ cài đặt.', 'Phù hợp với danh sách nhỏ hoặc dữ liệu chưa sắp xếp.'] },
      { h: 'Quy ước khi không tìm thấy' },
      { p: 'Khi không tìm thấy, hàm thường trả về -1 hoặc None để báo hiệu phần tử không tồn tại trong danh sách.' },
      { note: 'Hàm enumerate() rất tiện: nó trả về đồng thời chỉ số và giá trị của từng phần tử khi duyệt.' },
    ],
    examples: [
      { q: 'Viết hàm tìm tuyến tính trả về chỉ số của target trong list, -1 nếu không có.', a: 'def tim_tuyen_tinh(ds, target):\n    for i in range(len(ds)):\n        if ds[i] == target:\n            return i\n    return -1' },
      { q: 'Với ds = [4, 2, 7, 1], tìm số 7 trả về chỉ số bao nhiêu?', a: 'Chỉ số 2 (vì ds[2] = 7; chỉ số đếm từ 0).' },
    ],
  },

  'H10TIN-w21-quiz': {
    topic: 'Thuật toán tìm kiếm nhị phân',
    intro: 'Chào các em. Khi danh sách đã được sắp xếp, ta có cách tìm kiếm nhanh hơn rất nhiều: tìm kiếm nhị phân. Hôm nay ta học nguyên lý "chia đôi" thông minh này.',
    objectives: [
      'Hiểu điều kiện và nguyên lý của tìm kiếm nhị phân.',
      'Biết độ phức tạp O(log n) và ưu thế so với tìm tuyến tính.',
      'Mô tả được quá trình chia đôi để tìm phần tử.',
    ],
    theory: [
      { h: 'Điều kiện bắt buộc' },
      { p: 'Tìm kiếm nhị phân (binary search) chỉ áp dụng được khi danh sách đã được sắp xếp (tăng dần hoặc giảm dần). Đây là điều kiện tiên quyết.' },
      { h: 'Nguyên lý chia đôi' },
      { p: 'Mỗi bước, thuật toán so sánh giá trị cần tìm với phần tử ở giữa danh sách. Nếu bằng thì tìm thấy; nếu nhỏ hơn thì tìm tiếp ở nửa bên trái; nếu lớn hơn thì tìm ở nửa bên phải. Cứ thế, mỗi bước loại bỏ một nửa số phần tử.' },
      { h: 'Độ phức tạp' },
      { p: 'Do mỗi bước loại bỏ một nửa, độ phức tạp chỉ là O(log n) — nhanh hơn rất nhiều so với O(n) của tìm tuyến tính khi danh sách lớn.' },
      { h: 'Vòng lặp và điều kiện dừng' },
      { ul: ['Dùng hai biến left, right đánh dấu khoảng tìm kiếm.', 'Phần tử giữa: mid = (left + right) // 2.', 'Vòng lặp dừng khi left > right (khoảng tìm rỗng) — nghĩa là không tìm thấy.'] },
      { note: 'Python có sẵn module bisect hỗ trợ tìm kiếm nhị phân (bisect_left, bisect_right) trên danh sách đã sắp.' },
    ],
    examples: [
      { q: 'Tìm số 7 trong [1, 3, 5, 7, 9, 11] bằng nhị phân, mô tả các bước.', a: 'Mid = chỉ số 2 (giá trị 5); 7 > 5 nên tìm bên phải. Mid mới = chỉ số 4 (giá trị 9); 7 < 9 nên tìm bên trái. Mid = chỉ số 3 (giá trị 7) — tìm thấy.' },
      { q: 'Vì sao không dùng được tìm nhị phân trên danh sách [5, 2, 8, 1]?', a: 'Vì danh sách chưa được sắp xếp; tìm nhị phân yêu cầu danh sách đã sắp thì nguyên lý chia đôi mới đúng.' },
    ],
  },

  'H10TIN-w22-quiz': {
    topic: 'Sắp xếp nổi bọt (Bubble Sort)',
    intro: 'Các em ơi, sắp xếp là bài toán quan trọng. Hôm nay ta học thuật toán sắp xếp đầu tiên — sắp xếp nổi bọt, với ý tưởng "đẩy" dần phần tử lớn về cuối như bọt khí nổi lên.',
    objectives: [
      'Hiểu nguyên lý sắp xếp nổi bọt.',
      'Biết độ phức tạp O(n²) và tính ổn định.',
      'Cài đặt được bubble sort và biết cách hoán đổi hai biến.',
    ],
    theory: [
      { h: 'Nguyên lý nổi bọt' },
      { p: 'Sắp xếp nổi bọt (bubble sort) so sánh từng cặp phần tử kề nhau và hoán đổi chúng nếu sai thứ tự. Sau mỗi lượt duyệt, phần tử lớn nhất "nổi" dần về cuối danh sách. Lặp lại cho đến khi không còn hoán đổi nào.' },
      { h: 'Hoán đổi hai biến' },
      { p: 'Python cho phép hoán đổi hai biến gọn gàng: a, b = b, a. Không cần biến trung gian như nhiều ngôn ngữ khác.' },
      { h: 'Độ phức tạp và tính ổn định' },
      { ul: ['Độ phức tạp xấu nhất: O(n²) — chậm với danh sách lớn.', 'Bubble sort là thuật toán ổn định (stable): giữ nguyên thứ tự tương đối của các phần tử bằng nhau.'] },
      { h: 'Tối ưu dừng sớm' },
      { p: 'Có thể tối ưu bằng một biến cờ (flag): nếu trong một lượt duyệt mà không có hoán đổi nào, nghĩa là danh sách đã sắp xong, ta dừng ngay.' },
      { note: 'Bubble sort dễ hiểu nên hay dùng để dạy, nhưng trong thực tế các thuật toán nhanh hơn (như sorted() của Python) được ưu tiên.' },
    ],
    examples: [
      { q: 'Cài đặt bubble sort cho danh sách ds.', a: 'def bubble_sort(ds):\n    n = len(ds)\n    for i in range(n - 1):\n        for j in range(n - 1 - i):\n            if ds[j] > ds[j + 1]:\n                ds[j], ds[j + 1] = ds[j + 1], ds[j]\n    return ds' },
      { q: 'Hoán đổi giá trị hai biến x = 3, y = 8 trong Python.', a: 'x, y = y, x   # sau lệnh: x = 8, y = 3' },
    ],
  },

  'H10TIN-w23-quiz': {
    topic: 'Sắp xếp chọn và sắp xếp chèn',
    intro: 'Chào các em. Tiếp tục với sắp xếp, hôm nay ta học thêm hai thuật toán: sắp xếp chọn (selection sort) và sắp xếp chèn (insertion sort), cùng các hàm sắp xếp có sẵn của Python.',
    objectives: [
      'Hiểu nguyên lý sắp xếp chọn và sắp xếp chèn.',
      'Biết độ phức tạp và trường hợp tốt của mỗi thuật toán.',
      'Dùng được hàm sorted() và list.sort() của Python.',
    ],
    theory: [
      { h: 'Sắp xếp chọn (selection sort)' },
      { p: 'Mỗi lượt, thuật toán tìm phần tử nhỏ nhất trong phần chưa sắp xếp rồi đưa nó về đầu phần chưa sắp. Lặp lại đến khi toàn bộ danh sách được sắp. Độ phức tạp O(n²).' },
      { h: 'Sắp xếp chèn (insertion sort)' },
      { p: 'Thuật toán lấy từng phần tử và chèn nó vào đúng vị trí trong phần đã sắp ở đầu danh sách — giống cách ta sắp bài trên tay. Độ phức tạp xấu nhất O(n²), nhưng đạt O(n) khi danh sách gần như đã sắp xếp.' },
      { h: 'So sánh' },
      { ul: ['Selection sort: số lần hoán đổi ít, nhưng luôn duyệt đủ.', 'Insertion sort: rất nhanh nếu danh sách gần như đã sắp.'] },
      { h: 'Hàm sắp xếp của Python' },
      { ul: ['sorted(ds): trả về một danh sách mới đã sắp, giữ nguyên ds gốc.', 'ds.sort(): sắp xếp ngay trên danh sách gốc (tại chỗ).', 'sorted(ds, reverse=True): sắp giảm dần.'] },
      { note: 'Trong thực tế, ưu tiên dùng sorted() vì nó được cài đặt tối ưu (thuật toán Timsort), nhanh và đáng tin cậy.' },
    ],
    examples: [
      { q: 'Sắp xếp danh sách [5, 2, 8, 1] tăng dần bằng hàm có sẵn.', a: 'ds = [5, 2, 8, 1]\nkq = sorted(ds)\nprint(kq)   # [1, 2, 5, 8]' },
      { q: 'Sắp xếp [3, 9, 1, 6] giảm dần.', a: 'print(sorted([3, 9, 1, 6], reverse=True))   # [9, 6, 3, 1]' },
    ],
  },

  'H10TIN-w24-quiz': {
    topic: 'Bài toán đơn giản với mảng',
    intro: 'Các em thân mến, làm chủ danh sách giúp giải nhiều bài toán thực tế. Hôm nay ta luyện các thao tác phổ biến: tính tổng, trung bình, tìm max/min, đếm phần tử thoả điều kiện.',
    objectives: [
      'Tính tổng, trung bình, lớn nhất, nhỏ nhất của danh sách.',
      'Đếm phần tử thoả điều kiện bằng list comprehension.',
      'Đảo ngược danh sách.',
    ],
    theory: [
      { h: 'Các hàm tổng hợp có sẵn' },
      { ul: ['sum(ds): tổng các phần tử.', 'max(ds), min(ds): giá trị lớn nhất, nhỏ nhất.', 'len(ds): số phần tử.'] },
      { h: 'Tính trung bình cộng' },
      { p: 'Trung bình cộng bằng tổng chia cho số phần tử: sum(ds) / len(ds). Nhớ kiểm tra danh sách không rỗng để tránh lỗi chia cho 0.' },
      { h: 'List comprehension' },
      { p: 'List comprehension là cú pháp gọn để tạo danh sách mới từ danh sách cũ kèm điều kiện. Ví dụ lọc các số chẵn: [x for x in ds if x % 2 == 0].' },
      { h: 'Đếm và đảo ngược' },
      { ul: ['Đếm số chẵn: len([x for x in ds if x % 2 == 0]).', 'Đảo ngược: ds[::-1] (tạo bản mới) hoặc ds.reverse() (đảo tại chỗ).'] },
      { note: 'Kỹ thuật cắt lát ds[::-1] dùng bước nhảy -1 để duyệt danh sách từ cuối về đầu.' },
    ],
    examples: [
      { q: 'Cho ds = [4, 7, 2, 9, 6], tính trung bình cộng.', a: 'ds = [4, 7, 2, 9, 6]\ntb = sum(ds) / len(ds)\nprint(tb)   # 5.6' },
      { q: 'Đếm có bao nhiêu số chẵn trong ds = [3, 4, 7, 8, 10].', a: 'ds = [3, 4, 7, 8, 10]\nso_chan = len([x for x in ds if x % 2 == 0])\nprint(so_chan)   # 3' },
    ],
  },

  'H10TIN-w25-quiz': {
    topic: 'Xử lý chuỗi (string)',
    intro: 'Chào các em. Chuỗi xuất hiện ở khắp nơi: tên, địa chỉ, câu văn. Hôm nay ta học các phương thức xử lý chuỗi thông dụng của Python: đổi hoa/thường, tách, ghép, thay thế.',
    objectives: [
      'Sử dụng các phương thức cơ bản: upper, lower, len.',
      'Tách chuỗi thành list và ghép list thành chuỗi.',
      'Thay thế chuỗi con bằng replace.',
    ],
    theory: [
      { h: 'Độ dài và đổi hoa/thường' },
      { ul: ['len(s): số ký tự của chuỗi.', 's.upper(): trả về chuỗi viết hoa toàn bộ.', 's.lower(): trả về chuỗi viết thường toàn bộ.'] },
      { h: 'Tách chuỗi với split()' },
      { p: 'Phương thức split() tách chuỗi thành một danh sách các từ. Mặc định tách theo khoảng trắng. Ví dụ: \'a b c\'.split() cho [\'a\', \'b\', \'c\'].' },
      { h: 'Ghép chuỗi với join()' },
      { p: 'Phương thức join() ghép các phần tử của một danh sách chuỗi lại, ngăn cách bởi một chuỗi nối. Cú pháp: chuoi_noi.join(ds). Ví dụ: \' \'.join([\'a\', \'b\']) cho \'a b\'.' },
      { h: 'Thay thế với replace()' },
      { p: 's.replace(cu, moi) trả về chuỗi mới với mọi lần xuất hiện của chuỗi con cu được thay bằng moi. Lưu ý: chuỗi trong Python không thay đổi tại chỗ (immutable), các phương thức luôn trả về chuỗi mới.' },
      { note: 'Các phương thức xử lý chuỗi không làm thay đổi chuỗi gốc mà trả về một chuỗi mới — cần gán lại nếu muốn lưu kết quả.' },
    ],
    examples: [
      { q: 'Cho s = \'Tin hoc 10\', tách thành danh sách các từ.', a: 's = \'Tin hoc 10\'\nprint(s.split())   # [\'Tin\', \'hoc\', \'10\']' },
      { q: 'Đổi chuỗi \'python\' sang chữ hoa và đếm số ký tự.', a: 's = \'python\'\nprint(s.upper())   # PYTHON\nprint(len(s))      # 6' },
    ],
  },

  'H10TIN-w26-quiz': {
    topic: 'Điều kiện và lặp - bài tập tổng hợp',
    intro: 'Các em ơi, đây là lúc kết hợp điều kiện và vòng lặp để giải các bài toán hay gặp: kiểm tra dấu của số, in dãy, tính giai thừa, kiểm tra số nguyên tố, vẽ hình bằng dấu sao.',
    objectives: [
      'Kết hợp if và vòng lặp để giải bài toán.',
      'Cài đặt giai thừa, kiểm tra số nguyên tố.',
      'In các hình đơn giản bằng vòng lặp.',
    ],
    theory: [
      { h: 'Kiểm tra dấu của số' },
      { p: 'Dùng if - elif - else để xét: nếu x > 0 là số dương, x < 0 là số âm, còn lại x == 0.' },
      { h: 'Tính giai thừa' },
      { p: 'Giai thừa n! = 1 × 2 × ... × n. Cài đặt bằng cách tích luỹ: khởi tạo gt = 1, rồi nhân dồn gt *= i với i chạy từ 1 đến n.' },
      { h: 'Kiểm tra số nguyên tố' },
      { p: 'Số nguyên tố lớn hơn 1 và chỉ chia hết cho 1 và chính nó. Để kiểm tra n, ta thử chia n cho các số i từ 2 đến căn bậc hai của n; nếu có số chia hết thì n không phải số nguyên tố.' },
      { h: 'In hình bằng dấu sao' },
      { ul: ['Lặp i từ 1 đến 5, mỗi dòng in \'*\' * i tạo tam giác sao tăng dần.', 'Toán tử * nhân chuỗi: \'*\' * 3 cho \'***\'.'] },
      { note: 'Trong Python, n % 10 lấy chữ số cuối, n //= 10 bỏ chữ số cuối — kỹ thuật để xử lý từng chữ số của một số.' },
    ],
    examples: [
      { q: 'Tính giai thừa của n nhập từ bàn phím.', a: 'n = int(input(\'Nhap n: \'))\ngt = 1\nfor i in range(1, n + 1):\n    gt = gt * i\nprint(gt)' },
      { q: 'In tam giác sao 4 dòng (1 đến 4 sao).', a: 'for i in range(1, 5):\n    print(\'*\' * i)\n# *\n# **\n# ***\n# ****' },
    ],
  },

  'H10TIN-w27-quiz': {
    topic: 'Module và thư viện Python',
    intro: 'Chào các em. Python mạnh nhờ kho thư viện khổng lồ. Hôm nay ta học cách dùng từ khoá import để gọi thư viện, với hai ví dụ thường gặp: thư viện toán học math và thư viện ngẫu nhiên random.',
    objectives: [
      'Sử dụng từ khoá import để dùng thư viện.',
      'Dùng các hàm cơ bản của thư viện math.',
      'Sinh số ngẫu nhiên với thư viện random.',
    ],
    theory: [
      { h: 'Import thư viện' },
      { p: 'Để dùng một thư viện, ta khai báo import ten_thu_vien ở đầu chương trình. Sau đó gọi hàm theo cú pháp: ten_thu_vien.ten_ham().' },
      { h: 'Thư viện math' },
      { ul: ['math.sqrt(x): căn bậc hai, ví dụ math.sqrt(16) = 4.0.', 'math.pi: hằng số pi xấp xỉ 3.14159.', 'math.floor(x), math.ceil(x): làm tròn xuống, lên.', 'math.factorial(n): giai thừa.'] },
      { h: 'Thư viện random' },
      { ul: ['random.random(): số thực ngẫu nhiên trong [0, 1).', 'random.randint(a, b): số nguyên ngẫu nhiên trong [a, b] (gồm cả hai đầu).', 'random.choice(ds): chọn ngẫu nhiên một phần tử của danh sách.'] },
      { h: 'Lợi ích của thư viện' },
      { p: 'Dùng thư viện giúp ta tận dụng các hàm đã được viết và kiểm thử sẵn, không phải tự cài đặt lại — tiết kiệm thời gian và giảm lỗi.' },
      { note: 'math.sqrt(16) trả về 4.0 (kiểu float) chứ không phải 4 (int) — các hàm của math thường trả về số thực.' },
    ],
    examples: [
      { q: 'Tính căn bậc hai của 144 dùng thư viện math.', a: 'import math\nprint(math.sqrt(144))   # 12.0' },
      { q: 'Sinh một số nguyên ngẫu nhiên từ 1 đến 6 (giả lập tung xúc xắc).', a: 'import random\nxuc_xac = random.randint(1, 6)\nprint(xuc_xac)' },
    ],
  },

  'H10TIN-w28-quiz': {
    topic: 'Tin học và nghề nghiệp',
    intro: 'Các em thân mến, công nghệ thông tin mở ra rất nhiều nghề nghiệp hấp dẫn. Hôm nay ta tìm hiểu các vai trò phổ biến trong ngành và những kỹ năng cần chuẩn bị.',
    objectives: [
      'Biết các nghề nghiệp tiêu biểu trong ngành CNTT.',
      'Hiểu công việc của lập trình viên, nhà khoa học dữ liệu, kỹ sư AI, kỹ sư an ninh mạng.',
      'Nhận biết các kỹ năng cần thiết để theo ngành CNTT.',
    ],
    theory: [
      { h: 'Lập trình viên (Developer)' },
      { p: 'Lập trình viên viết, kiểm thử, gỡ lỗi và bảo trì phần mềm. Đây là vai trò nền tảng và phổ biến nhất trong ngành.' },
      { h: 'Nhà khoa học dữ liệu (Data Scientist)' },
      { p: 'Thu thập, làm sạch và phân tích dữ liệu để rút ra tri thức, xây dựng các mô hình học máy phục vụ ra quyết định.' },
      { h: 'Kỹ sư AI và kỹ sư an ninh mạng' },
      { ul: ['Kỹ sư AI: phát triển mô hình trí tuệ nhân tạo, xử lý ngôn ngữ tự nhiên, thị giác máy tính.', 'Kỹ sư an ninh mạng: bảo vệ hệ thống, phát hiện và xử lý các cuộc tấn công.'] },
      { h: 'Ngôn ngữ và kỹ năng' },
      { p: 'Các ngôn ngữ phổ biến hiện nay gồm Python, JavaScript, Java, C++. Người theo CNTT cần nền tảng toán/logic tốt, tiếng Anh, tư duy giải quyết vấn đề, tính kiên trì và khả năng tự học liên tục.' },
      { note: 'Công nghệ thay đổi rất nhanh, nên tinh thần học hỏi suốt đời là kỹ năng quan trọng nhất của người làm CNTT.' },
    ],
    examples: [
      { q: 'Một người chuyên phân tích dữ liệu bán hàng để dự đoán xu hướng làm nghề gì?', a: 'Nhà khoa học dữ liệu (Data Scientist) — thu thập, phân tích dữ liệu và xây mô hình dự đoán.' },
      { q: 'Kể ba kỹ năng cần thiết để theo đuổi ngành CNTT.', a: 'Tư duy logic/toán tốt, tiếng Anh để đọc tài liệu, và khả năng tự học liên tục công nghệ mới.' },
    ],
  },

  'H10TIN-w29-quiz': {
    topic: 'Lập trình hướng đối tượng - khái quát',
    intro: 'Chào các em. Khi chương trình lớn lên, ta cần cách tổ chức code khoa học hơn — đó là lập trình hướng đối tượng (OOP). Hôm nay ta làm quen các khái niệm cốt lõi: lớp, đối tượng và bốn nguyên lý của OOP.',
    objectives: [
      'Hiểu OOP là gì và bốn nguyên lý của nó.',
      'Phân biệt lớp (class) và đối tượng (object).',
      'Biết cách định nghĩa lớp và phương thức khởi tạo trong Python.',
    ],
    theory: [
      { h: 'OOP là gì?' },
      { p: 'OOP (Object-Oriented Programming - lập trình hướng đối tượng) là cách tổ chức chương trình quanh các "đối tượng" — mô phỏng sự vật trong thực tế, gói gọn cả dữ liệu và hành vi.' },
      { h: 'Bốn nguyên lý của OOP' },
      { ul: ['Đóng gói (Encapsulation): gom dữ liệu và phương thức vào một đối tượng, che giấu chi tiết bên trong.', 'Kế thừa (Inheritance): lớp con thừa hưởng từ lớp cha.', 'Đa hình (Polymorphism): cùng một thao tác có thể hoạt động khác nhau với các đối tượng khác nhau.', 'Trừu tượng (Abstraction): chỉ phơi bày những gì cần thiết, ẩn đi phức tạp.'] },
      { h: 'Lớp và đối tượng' },
      { p: 'Lớp (class) là bản thiết kế (blueprint), định nghĩa các thuộc tính và phương thức. Đối tượng (object) là một thể hiện cụ thể được tạo ra từ lớp.' },
      { h: 'Định nghĩa lớp trong Python' },
      { p: 'Dùng từ khoá class để định nghĩa lớp. Phương thức khởi tạo __init__ được gọi tự động khi tạo đối tượng mới, để gán các thuộc tính ban đầu.' },
      { note: 'Ví dụ trực quan: "HocSinh" là lớp (khuôn mẫu chung), còn bạn An, bạn Bình là các đối tượng cụ thể tạo từ lớp đó.' },
    ],
    examples: [
      { q: 'Định nghĩa lớp HocSinh có thuộc tính ten và diem.', a: 'class HocSinh:\n    def __init__(self, ten, diem):\n        self.ten = ten\n        self.diem = diem' },
      { q: 'Tạo một đối tượng HocSinh tên An điểm 9 và in tên ra.', a: 'an = HocSinh(\'An\', 9)\nprint(an.ten)    # An' },
    ],
  },

  'H10TIN-w30-quiz': {
    topic: 'Cơ sở dữ liệu - khái niệm',
    intro: 'Các em ơi, dữ liệu của ngân hàng, trường học hay mạng xã hội đều được lưu trong cơ sở dữ liệu. Hôm nay ta tìm hiểu khái niệm CSDL, hệ quản trị CSDL, ngôn ngữ SQL và cấu trúc bảng.',
    objectives: [
      'Hiểu khái niệm cơ sở dữ liệu và hệ quản trị CSDL.',
      'Biết SQL là ngôn ngữ truy vấn chuẩn và một số DBMS phổ biến.',
      'Nắm cấu trúc bảng và khái niệm khoá chính.',
    ],
    theory: [
      { h: 'Cơ sở dữ liệu (CSDL)' },
      { p: 'CSDL (database) là tập hợp dữ liệu có cấu trúc, được tổ chức, lưu trữ và quản lý để dễ dàng truy xuất, cập nhật. Ví dụ: danh sách học sinh, sản phẩm, giao dịch ngân hàng.' },
      { h: 'Hệ quản trị CSDL (DBMS)' },
      { p: 'DBMS (Database Management System) là phần mềm giúp tạo, lưu trữ, truy vấn và quản lý cơ sở dữ liệu. Các DBMS phổ biến: MySQL, PostgreSQL, Oracle, Microsoft SQL Server, MongoDB.' },
      { h: 'Ngôn ngữ SQL' },
      { p: 'SQL (Structured Query Language) là ngôn ngữ truy vấn chuẩn cho các CSDL quan hệ, dùng để thêm, sửa, xoá, và truy vấn dữ liệu.' },
      { h: 'Bảng và khoá chính' },
      { ul: ['Bảng (table) gồm các hàng (bản ghi/records) và cột (trường/fields).', 'Khoá chính (primary key) là cột định danh duy nhất mỗi hàng, không trùng và không để trống.'] },
      { note: 'Một CSDL trường học có thể gồm các bảng: HocSinh, Lop, MonHoc, Diem — liên kết với nhau qua các khoá.' },
    ],
    examples: [
      { q: 'Trong bảng HocSinh, cột nào nên làm khoá chính và vì sao?', a: 'Cột mã học sinh (vd MaHS), vì nó định danh duy nhất từng học sinh, không trùng lặp và không để trống — đúng yêu cầu khoá chính.' },
      { q: 'SQL dùng để làm gì trong cơ sở dữ liệu?', a: 'SQL là ngôn ngữ chuẩn để truy vấn và thao tác dữ liệu: thêm, sửa, xoá và tìm kiếm dữ liệu trong CSDL quan hệ.' },
    ],
  },

  'H10TIN-w31-quiz': {
    topic: 'Ứng dụng tin học trong đời sống',
    intro: 'Chào các em. Tin học đã len lỏi vào mọi lĩnh vực của cuộc sống. Hôm nay ta điểm qua các ứng dụng tiêu biểu trong y tế, giáo dục, giao thông, nông nghiệp, tài chính và giải trí.',
    objectives: [
      'Nhận biết ứng dụng của tin học trong các lĩnh vực đời sống.',
      'Hiểu cách công nghệ làm thay đổi cách con người làm việc và sinh hoạt.',
      'Liên hệ ứng dụng tin học với thực tế xung quanh.',
    ],
    theory: [
      { h: 'Y tế và giáo dục' },
      { ul: ['Y tế: bệnh án điện tử, chẩn đoán hình ảnh bằng AI, khám bệnh từ xa (telemedicine), robot phẫu thuật.', 'Giáo dục: hệ quản lý học tập (LMS), e-learning, MOOCs, gia sư AI, thực tế ảo VR/AR.'] },
      { h: 'Giao thông và nông nghiệp' },
      { ul: ['Giao thông: GPS, bản đồ số, xe tự lái, hệ thống giao thông thông minh (ITS).', 'Nông nghiệp: cảm biến IoT, drone, AI dự báo thời tiết - sâu bệnh, thuỷ canh thông minh.'] },
      { h: 'Tài chính và giải trí' },
      { ul: ['Tài chính: ngân hàng trực tuyến, ví điện tử (Momo, ZaloPay), blockchain.', 'Giải trí: game, streaming (Netflix, YouTube), mạng xã hội, thực tế ảo.'] },
      { h: 'Tác động chung' },
      { p: 'Tin học giúp tự động hoá công việc, tăng năng suất, kết nối toàn cầu và tạo ra các mô hình kinh doanh, dịch vụ hoàn toàn mới.' },
      { note: 'Em hãy thử nhìn quanh: chiếc điện thoại, app học tập, bản đồ chỉ đường — tất cả đều là ứng dụng của tin học trong đời sống.' },
    ],
    examples: [
      { q: 'Kể một ứng dụng tin học trong giáo dục mà em đang dùng.', a: 'Ví dụ: nền tảng học trực tuyến (LMS), ứng dụng luyện trắc nghiệm, hoặc lớp học qua video — đều là ứng dụng tin học trong giáo dục.' },
      { q: 'Công nghệ nào giúp nông dân giám sát độ ẩm đất từ xa?', a: 'Cảm biến IoT (Internet vạn vật) — gửi dữ liệu độ ẩm, nhiệt độ về điện thoại để nông dân theo dõi và điều khiển tưới tiêu.' },
    ],
  },

  'H10TIN-w32-quiz': {
    topic: 'AI và Machine Learning - sơ lược',
    intro: 'Các em thân mến, trí tuệ nhân tạo đang thay đổi thế giới. Hôm nay ta tìm hiểu sơ lược AI, học máy, học sâu, các ứng dụng phổ biến và những vấn đề đạo đức cần lưu ý.',
    objectives: [
      'Hiểu khái niệm AI, Machine Learning và Deep Learning.',
      'Biết các ứng dụng AI phổ biến.',
      'Nhận biết các vấn đề đạo đức khi dùng AI.',
    ],
    theory: [
      { h: 'Trí tuệ nhân tạo (AI)' },
      { p: 'AI (Artificial Intelligence) là lĩnh vực giúp máy tính mô phỏng các quá trình nhận thức của con người như học hỏi, suy luận, nhận diện và ra quyết định.' },
      { h: 'Học máy và học sâu' },
      { ul: ['Machine Learning (học máy): máy tự học các quy luật từ dữ liệu thay vì được lập trình thủ công từng trường hợp.', 'Deep Learning (học sâu): một nhánh của học máy, dùng mạng nơ-ron nhân tạo nhiều lớp.'] },
      { h: 'Ứng dụng AI phổ biến' },
      { p: 'Trợ lý ảo (Siri, Google Assistant), dịch máy (Google Translate), nhận dạng ảnh và khuôn mặt, chatbot, xe tự lái. ChatGPT là một mô hình ngôn ngữ lớn (LLM) ra mắt cuối năm 2022.' },
      { h: 'Đạo đức AI' },
      { ul: ['Thiên vị (bias): AI học từ dữ liệu lệch có thể đưa ra quyết định bất công.', 'Quyền riêng tư: AI thu thập nhiều dữ liệu cá nhân.', 'Trách nhiệm và minh bạch: ai chịu trách nhiệm khi AI sai?'] },
      { note: 'AI là công cụ mạnh — cần dùng có trách nhiệm, không phụ thuộc hoàn toàn và luôn kiểm chứng kết quả.' },
    ],
    examples: [
      { q: 'Phân biệt AI và Machine Learning.', a: 'AI là lĩnh vực rộng giúp máy mô phỏng trí thông minh; Machine Learning là một phương pháp của AI, trong đó máy học quy luật từ dữ liệu.' },
      { q: 'Nêu một rủi ro đạo đức khi sử dụng AI.', a: 'Thiên vị (bias): nếu AI được huấn luyện trên dữ liệu lệch, nó có thể đưa ra quyết định bất công với một số nhóm người.' },
    ],
  },

  'H10TIN-w33-quiz': {
    topic: 'Dự án lập trình nhỏ',
    intro: 'Chào các em. Lập trình thực tế là làm việc theo dự án và theo nhóm. Hôm nay ta tìm hiểu quy trình phát triển phần mềm, phương pháp Agile, kiểm thử và công cụ quản lý phiên bản Git.',
    objectives: [
      'Nắm các bước cơ bản của quy trình phát triển phần mềm.',
      'Hiểu phương pháp Agile và vai trò của kiểm thử.',
      'Biết Git và GitHub dùng để làm gì.',
    ],
    theory: [
      { h: 'Quy trình phát triển phần mềm' },
      { p: 'Một dự án phần mềm thường trải qua các bước: xác định bài toán (phân tích yêu cầu) → thiết kế → viết code → kiểm thử → triển khai → bảo trì.' },
      { h: 'Phương pháp Agile' },
      { p: 'Agile chia công việc thành các chu kỳ ngắn (sprint, thường 1-2 tuần), liên tục lấy phản hồi và cải tiến, thay vì lập một kế hoạch dài cứng nhắc.' },
      { h: 'Kiểm thử (testing)' },
      { ul: ['Unit test: kiểm thử từng đơn vị (hàm) nhỏ.', 'Integration test: kiểm thử khi ghép các phần.', 'System test: kiểm thử toàn hệ thống.'] },
      { h: 'Git và GitHub' },
      { ul: ['Git: hệ quản lý phiên bản, lưu lại lịch sử thay đổi mã nguồn.', 'GitHub: nền tảng lưu trữ Git repo trực tuyến, hỗ trợ nhiều người cùng cộng tác.'] },
      { note: 'Làm việc nhóm hiệu quả cần: giao tiếp tốt, phân công rõ ràng, dùng Git để tránh xung đột mã nguồn và review chéo.' },
    ],
    examples: [
      { q: 'Bước đầu tiên khi làm một dự án phần mềm là gì?', a: 'Xác định/phân tích bài toán — hiểu rõ yêu cầu cần giải quyết trước khi thiết kế và viết code.' },
      { q: 'Git và GitHub khác nhau thế nào?', a: 'Git là công cụ quản lý phiên bản chạy trên máy; GitHub là dịch vụ trực tuyến lưu trữ các repo Git và hỗ trợ cộng tác nhóm.' },
    ],
  },

  'H10TIN-w34-quiz': {
    topic: 'Hướng nghiệp tin học',
    intro: 'Các em ơi, nhiều em sẽ chọn CNTT làm con đường tương lai. Hôm nay ta bàn cụ thể về con đường học tập, kỹ năng cần có, cơ hội việc làm và các nguồn học tập miễn phí.',
    objectives: [
      'Biết các con đường học tập để vào ngành CNTT.',
      'Hiểu các kỹ năng và cơ hội việc làm trong ngành.',
      'Biết một số nguồn học tin học miễn phí.',
    ],
    theory: [
      { h: 'Con đường học tập' },
      { p: 'Ngành CNTT có thể học ở đại học, cao đẳng, trung cấp, các khoá bootcamp ngắn hạn, hoặc tự học qua các nền tảng trực tuyến. Khoa học máy tính đặc biệt cần nền tảng toán tốt.' },
      { h: 'Kỹ năng quan trọng' },
      { ul: ['Tư duy logic và giải quyết vấn đề.', 'Tiếng Anh để đọc tài liệu và giao tiếp quốc tế.', 'Kỹ năng tự học liên tục.', 'Khả năng làm việc nhóm.'] },
      { h: 'Cơ hội việc làm' },
      { p: 'CNTT cho phép làm việc từ xa (remote), freelance, hoặc làm cho các công ty đa quốc gia. Mức lương trong ngành ở Việt Nam thường cao hơn nhiều ngành khác và tăng nhanh.' },
      { h: 'Nguồn học miễn phí' },
      { p: 'Có rất nhiều nền tảng học miễn phí chất lượng: Coursera, edX, FreeCodeCamp, Khan Academy, và vô số kênh hướng dẫn trên YouTube.' },
      { note: 'Quan trọng không phải bắt đầu từ đâu, mà là sự kiên trì và thực hành đều đặn — hãy bắt đầu bằng một dự án nhỏ em yêu thích.' },
    ],
    examples: [
      { q: 'Em muốn tự học lập trình mà chưa có điều kiện học thêm, nên bắt đầu từ đâu?', a: 'Bắt đầu từ các nền tảng miễn phí như FreeCodeCamp, Khan Academy, hoặc các khoá Python cơ bản trên YouTube; thực hành đều đặn bằng dự án nhỏ.' },
      { q: 'Vì sao tiếng Anh quan trọng với người làm CNTT?', a: 'Vì hầu hết tài liệu kỹ thuật, ngôn ngữ lập trình, và cộng đồng quốc tế đều dùng tiếng Anh; thành thạo tiếng Anh giúp học nhanh và làm việc toàn cầu.' },
    ],
  },

  'H10TIN-w35-quiz': {
    topic: 'Ôn tập cuối năm',
    intro: 'Các em thân mến, một năm học Tin học 10 đã trôi qua. Tuần cuối này, ta cùng hệ thống lại toàn bộ kiến thức: từ máy tính và xã hội tri thức, lập trình Python đến các thuật toán cơ bản.',
    objectives: [
      'Hệ thống kiến thức về máy tính, biểu diễn thông tin và đơn vị dung lượng.',
      'Ôn lại nền tảng lập trình Python và OOP.',
      'Củng cố các thuật toán tìm kiếm và sắp xếp.',
    ],
    theory: [
      { h: 'Máy tính và biểu diễn thông tin' },
      { ul: ['Bit là đơn vị nhỏ nhất; 1 byte = 8 bit; 1 GB = 1024 MB.', 'ASCII và Unicode/UTF-8; hệ nhị phân và thập lục phân.', 'Mạng, Internet, an toàn thông tin và đạo đức số.'] },
      { h: 'Lập trình Python' },
      { ul: ['Biến, kiểu dữ liệu (int, float, str, bool).', 'Điều kiện if - elif - else; vòng lặp for, while.', 'Hàm (def, return); list và string.', 'OOP: lớp, đối tượng, 4 nguyên lý (đóng gói, kế thừa, đa hình, trừu tượng).'] },
      { h: 'Thuật toán cơ bản' },
      { ul: ['Tìm kiếm: tuyến tính O(n); nhị phân O(log n), yêu cầu danh sách đã sắp.', 'Sắp xếp: nổi bọt, chọn, chèn — đều O(n²).', 'Hàm có sẵn: sorted(), list.sort().'] },
      { h: 'Tổng kết' },
      { p: 'Tư duy thuật toán và kỹ năng lập trình là hành trang quý giá. Hãy tiếp tục luyện tập bằng cách giải các bài toán thực tế mà em quan tâm.' },
      { note: 'Khi ôn tập, hãy ưu tiên tự gõ lại code và chạy thử — thực hành luôn giúp nhớ lâu hơn đọc lý thuyết.' },
    ],
    examples: [
      { q: 'Vì sao tìm kiếm nhị phân nhanh hơn tìm tuyến tính trên danh sách lớn?', a: 'Vì nhị phân loại bỏ một nửa số phần tử sau mỗi bước (O(log n)), trong khi tuyến tính duyệt lần lượt (O(n)). Nhưng nhị phân yêu cầu danh sách đã sắp xếp.' },
      { q: 'Viết chương trình nhập danh sách điểm rồi in điểm cao nhất.', a: 'so = int(input(\'So hoc sinh: \'))\ndiem = []\nfor i in range(so):\n    diem.append(float(input(\'Nhap diem: \')))\nprint(\'Cao nhat:\', max(diem))' },
    ],
  },

  'H10TIN-w36-quiz': {
    topic: 'Kết thúc Tin Học 10 — Lập trình và Tư duy số cho lớp 11',
    intro: 'Tin Học 10 là bước đầu tiên trong hành trình lập trình: từ cơ sở dữ liệu đến Python cơ bản, từ thuật toán sắp xếp đến xử lý danh sách. Hôm nay chúng ta nhìn lại và chuẩn bị cho những thách thức thú vị hơn ở lớp 11.',
    objectives: [
      'Hệ thống hoá các kĩ năng lập trình và tư duy thuật toán đã học trong năm.',
      'Nhận biết những nền tảng Python lớp 10 nào cần củng cố trước khi học lớp 11.',
      'Xây dựng kế hoạch luyện code trong hè để tiếp tục phát triển kĩ năng.',
    ],
    theory: [
      { h: 'Bức tranh toàn cảnh Tin Học 10' },
      { ul: [
        'Cơ sở dữ liệu: mô hình quan hệ, SQL cơ bản (SELECT, WHERE, GROUP BY, JOIN).',
        'Lập trình Python: kiểu dữ liệu, điều kiện, vòng lặp, hàm, list, dict, file I/O.',
        'Thuật toán: sắp xếp (bubble sort, selection sort), tìm kiếm (tuyến tính, nhị phân), độ phức tạp O(n).',
        'Mạng máy tính và internet: giao thức TCP/IP, HTTP, bảo mật mạng cơ bản.',
        'Đạo đức số: bản quyền phần mềm, an toàn thông tin cá nhân.',
      ] },
      { h: 'Cầu nối sang Tin Học 11' },
      { ul: [
        'Python cơ bản → OOP (lập trình hướng đối tượng): class, object, kế thừa, đa hình.',
        'List và dict → Cấu trúc dữ liệu nâng cao: stack, queue, linked list, tree (tư duy).',
        'Thuật toán cơ bản → Đệ quy, quy hoạch động, đồ thị (graph).',
        'SQL cơ bản → Thiết kế CSDL phức tạp hơn, tối ưu truy vấn, kết nối Python-CSDL.',
      ] },
      { h: 'Kế hoạch code hè' },
      { ul: [
        'Làm 2–3 mini project Python: máy tính, quản lý danh sách, game đơn giản.',
        'Luyện 10–15 bài LeetCode Easy bằng Python — rèn tư duy thuật toán.',
        'Hoàn thiện SQL: làm thêm bài tập trên w3schools.com/sql hoặc sqlzoo.net.',
        'Đọc cuốn "Automate the Boring Stuff with Python" (miễn phí online) — ứng dụng thực tế.',
      ] },
      { note: 'Code là kĩ năng tích luỹ — mỗi dòng code em viết hôm nay làm tăng khả năng giải quyết vấn đề của em ngày mai. Đừng dừng code trong kì hè.' },
    ],
    examples: [
      { q: 'Những lỗi lập trình phổ biến nhất ở học sinh lớp 10 mà cần sửa trước khi học lớp 11?', a: 'Ba lỗi thường gặp nhất: (1) Không dùng hàm (def) — viết code lặp đi lặp lại thay vì tách thành hàm tái sử dụng; lớp 11 sẽ học OOP, không quen hàm sẽ khó học class; (2) Không kiểm tra đầu vào — code chạy được nhưng crash khi nhập sai kiểu dữ liệu; (3) Biến đặt tên tuỳ tiện (x, y, a, b) — khi code dài 50 dòng trở lên, tên không mô tả gây nhầm lẫn nghiêm trọng. Sửa 3 thói quen này trong hè sẽ tiết kiệm rất nhiều thời gian debug ở lớp 11.' },
      { q: 'Em nên học thêm gì trong hè để chuẩn bị tốt cho Tin Học 11 mà không bị quá tải?', a: 'Một lộ trình vừa đủ: (1) Tuần 1–2: ôn lại hàm Python và tạo 2 mini project từ đầu (không copy); (2) Tuần 3–4: tìm hiểu cơ bản về class và object trong Python — YouTube "Python OOP for beginners" khoảng 2 giờ; (3) Tuần 5–6: làm 5 bài SQL JOIN trên sqlzoo.net. Không cần học mọi thứ trước — chỉ cần nền hàm vững và biết OOP là gì là đủ để học lớp 11 nhẹ nhàng.' },
    ],
  },
};
