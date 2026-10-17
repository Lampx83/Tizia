// Lý thuyết Tin học lớp 4 — bám SGK GDPT 2018
// Key trùng id quiz: 'P4TIN-wNN-quiz'

export const P4TIN_LESSONS = {
  'P4TIN-w01-quiz': {
    topic: 'Phần cứng và phần mềm',
    intro: 'Máy tính gồm hai phần: phần cứng nhìn thấy và sờ được, phần mềm là các chương trình giúp máy làm việc.',
    objectives: [
      'Phân biệt được phần cứng và phần mềm.',
      'Kể được một số thiết bị phần cứng và một số phần mềm quen thuộc.',
      'Hiểu máy tính cần cả phần cứng lẫn phần mềm mới hoạt động.',
    ],
    theory: [
      { h: 'Phần cứng là gì?' },
      { p: 'Phần cứng là những bộ phận của máy tính mà ta nhìn thấy và sờ được.' },
      { ul: ['Màn hình: hiển thị hình ảnh, chữ.', 'Bàn phím: dùng để gõ chữ và số.', 'Chuột: điều khiển con trỏ.', 'Thân máy (CPU): bộ phận xử lí bên trong.'] },
      { h: 'Phần mềm là gì?' },
      { p: 'Phần mềm là các chương trình giúp máy tính làm việc, ta không sờ được phần mềm.' },
      { ul: ['Phần mềm vẽ Paint.', 'Phần mềm soạn thảo văn bản.', 'Trình duyệt web để vào Internet.'] },
      { note: 'Máy tính cần CẢ phần cứng và phần mềm mới hoạt động được. Chỉ phần cứng thì máy không biết phải làm gì.' },
    ],
    examples: [
      { q: 'Màn hình là phần cứng hay phần mềm?', a: 'Là phần cứng vì ta nhìn thấy và sờ được.' },
      { q: 'Paint là phần cứng hay phần mềm?', a: 'Là phần mềm vì đó là một chương trình.' },
    ],
  },

  'P4TIN-w02-quiz': {
    topic: 'Thông tin và xử lí thông tin',
    intro: 'Thông tin là những điều giúp ta hiểu biết. Cả con người và máy tính đều nhận, xử lí rồi cho ra kết quả.',
    objectives: [
      'Hiểu thông tin là gì.',
      'Nêu được ba bước của quá trình xử lí thông tin.',
      'Biết máy tính giúp xử lí thông tin nhanh và chính xác.',
    ],
    theory: [
      { h: 'Thông tin là gì?' },
      { p: 'Thông tin là những điều giúp ta hiểu biết về sự vật, sự việc xung quanh.' },
      { h: 'Ba bước xử lí thông tin' },
      { ul: ['Nhận thông tin vào (ví dụ: nghe cô giảng bài).', 'Xử lí thông tin (suy nghĩ, tính toán).', 'Đưa ra kết quả (trả lời, ghi chép).'] },
      { p: 'Bộ não con người và máy tính đều làm theo các bước này.' },
      { note: 'Máy tính giúp con người xử lí thông tin nhanh và chính xác hơn.' },
    ],
    examples: [
      { q: 'Khi em nghe cô giáo giảng bài, em đang làm gì?', a: 'Đang nhận thông tin.' },
      { q: 'Xử lí thông tin gồm mấy bước?', a: 'Ba bước: nhận vào - xử lí - đưa ra kết quả.' },
    ],
  },

  'P4TIN-w03-quiz': {
    topic: 'Các dạng thông tin',
    intro: 'Thông tin có nhiều dạng: văn bản, hình ảnh và âm thanh. Máy tính xử lí được cả ba dạng này.',
    objectives: [
      'Nhận biết ba dạng thông tin: văn bản, hình ảnh, âm thanh.',
      'Cho ví dụ cho mỗi dạng thông tin.',
      'Biết máy tính xử lí được nhiều dạng thông tin.',
    ],
    theory: [
      { h: 'Ba dạng thông tin quen thuộc' },
      { ul: ['Văn bản: chữ viết và con số (ví dụ: bài thơ in trên giấy).', 'Hình ảnh: bức tranh, bức ảnh.', 'Âm thanh: tiếng nói, tiếng nhạc, tiếng chim hót.'] },
      { p: 'Máy tính có thể nhận, lưu và xử lí được cả văn bản, hình ảnh và âm thanh.' },
      { note: 'Một tờ báo có cả chữ (văn bản) và ảnh (hình ảnh).' },
    ],
    examples: [
      { q: 'Tiếng trống trường là dạng thông tin nào?', a: 'Dạng âm thanh.' },
      { q: 'Một bài thơ in trên giấy là dạng gì?', a: 'Dạng văn bản vì là chữ viết.' },
    ],
  },

  'P4TIN-w04-quiz': {
    topic: 'Bàn phím và hàng phím cơ sở',
    intro: 'Bàn phím dùng để gõ chữ và số. Hàng phím cơ sở ở giữa là nơi đặt các ngón tay khi bắt đầu gõ.',
    objectives: [
      'Xác định được hàng phím cơ sở và hai phím gờ nổi F, J.',
      'Biết đặt hai ngón cái ở phím cách.',
      'Ngồi đúng tư thế khi gõ phím.',
    ],
    theory: [
      { h: 'Hàng phím cơ sở' },
      { p: 'Hàng phím cơ sở (hàng phím gốc) nằm ở giữa bàn phím, là nơi đặt các ngón tay.' },
      { ul: ['Hai phím F và J có gờ nổi để đặt hai ngón trỏ mà không cần nhìn.', 'Hai ngón cái đặt ở phím cách (Space).'] },
      { h: 'Một số phím thường dùng' },
      { ul: ['Phím cách (Space): tạo khoảng trắng giữa các từ.', 'Phím Enter: xuống dòng.', 'Phím Backspace: xóa chữ.', 'Phím Shift: viết hoa.'] },
      { note: 'Ngồi lưng thẳng, mắt nhìn màn hình để gõ tốt và bảo vệ sức khỏe.' },
    ],
    examples: [
      { q: 'Hai phím gờ nổi để đặt ngón trỏ là phím nào?', a: 'Phím F và phím J.' },
      { q: 'Hai ngón cái đặt ở đâu?', a: 'Ở phím cách (Space).' },
    ],
  },

  'P4TIN-w05-quiz': {
    topic: 'Gõ mười ngón (phần 1)',
    intro: 'Gõ mười ngón là dùng đủ mười ngón tay để gõ phím, giúp gõ nhanh và ít mỏi tay.',
    objectives: [
      'Hiểu thế nào là gõ mười ngón và lợi ích của nó.',
      'Biết nhìn màn hình khi gõ, không nhìn bàn phím.',
      'Biết đưa ngón tay về hàng phím cơ sở sau khi gõ.',
    ],
    theory: [
      { h: 'Gõ mười ngón là gì?' },
      { p: 'Gõ mười ngón là dùng đủ mười ngón tay để gõ phím, mỗi ngón phụ trách một số phím nhất định.' },
      { h: 'Lợi ích của gõ mười ngón' },
      { ul: ['Gõ nhanh hơn nhiều so với dùng vài ngón.', 'Ít mỏi tay và mỏi mắt.', 'Không phải nhìn xuống bàn phím.'] },
      { ul: ['Khi gõ, mắt nhìn màn hình.', 'Gõ xong một phím, đưa ngón tay trở về hàng phím cơ sở.'] },
      { note: 'Muốn gõ giỏi cần luyện tập thường xuyên. Hãy gõ đúng trước, rồi mới nhanh dần.' },
    ],
    examples: [
      { q: 'Khi gõ, em nên nhìn vào đâu?', a: 'Nhìn màn hình, không nhìn bàn phím.' },
      { q: 'Gõ xong một phím, ngón tay nên làm gì?', a: 'Trở về hàng phím cơ sở.' },
    ],
  },

  'P4TIN-w06-quiz': {
    topic: 'Gõ mười ngón (phần 2)',
    intro: 'Mỗi ngón tay phụ trách một số phím. Luyện đúng vị trí ngón giúp em gõ nhanh và chính xác.',
    objectives: [
      'Biết ngón trỏ trái phụ trách F, ngón trỏ phải phụ trách J.',
      'Biết phím Enter gõ bằng ngón út tay phải.',
      'Hiểu nên gõ đúng trước rồi mới nhanh dần.',
    ],
    theory: [
      { h: 'Phân công ngón tay ở hàng cơ sở' },
      { ul: ['Ngón trỏ tay trái: đặt và phụ trách phím F.', 'Ngón trỏ tay phải: đặt và phụ trách phím J.', 'Ngón cái: gõ phím cách.', 'Ngón út tay phải: gõ phím Enter.'] },
      { h: 'Luyện gõ thế nào cho tốt?' },
      { ul: ['Gõ đúng trước, sau đó tăng dần tốc độ.', 'Không bỏ qua các phím khó, hãy luyện thêm.'] },
      { note: 'Phần mềm luyện gõ phím giúp em gõ nhanh và đúng hơn.' },
    ],
    examples: [
      { q: 'Ngón trỏ tay phải đặt ở phím nào?', a: 'Phím J.' },
      { q: 'Phím Enter thường gõ bằng ngón nào?', a: 'Ngón út tay phải.' },
    ],
  },

  'P4TIN-w07-quiz': {
    topic: 'Chuột và các thao tác với chuột',
    intro: 'Chuột dùng để điều khiển con trỏ trên màn hình. Có các thao tác: nháy đơn, nháy đúp, nháy phải, kéo thả.',
    objectives: [
      'Hiểu công dụng của chuột.',
      'Phân biệt nháy đơn, nháy đúp, nháy phải và kéo thả.',
      'Biết nháy đúp để mở chương trình.',
    ],
    theory: [
      { h: 'Các thao tác với chuột' },
      { ul: ['Nháy chuột (nháy đơn): nhấn nút trái một lần rồi thả.', 'Nháy đúp: nhấn nhanh nút trái hai lần liên tiếp, thường để mở chương trình.', 'Nháy nút phải: mở bảng chọn (menu) các lệnh.', 'Kéo thả: giữ nút trái, di chuyển chuột rồi thả.'] },
      { note: 'Chuột dùng để điều khiển con trỏ di chuyển trên màn hình.' },
    ],
    examples: [
      { q: 'Muốn mở một chương trình, em dùng thao tác nào?', a: 'Nháy đúp chuột.' },
      { q: 'Kéo thả là thao tác gì?', a: 'Giữ nút trái, di chuyển chuột đến chỗ mới rồi thả ra.' },
    ],
  },

  'P4TIN-w08-quiz': {
    topic: 'Phần mềm và biểu tượng',
    intro: 'Mỗi phần mềm có biểu tượng riêng. Nháy đúp vào biểu tượng để mở, nháy nút X để đóng phần mềm.',
    objectives: [
      'Hiểu biểu tượng (icon) là gì.',
      'Biết mở phần mềm bằng cách nháy đúp biểu tượng.',
      'Biết đóng phần mềm bằng nút X.',
    ],
    theory: [
      { h: 'Biểu tượng là gì?' },
      { p: 'Biểu tượng (icon) là hình nhỏ đại diện cho một phần mềm hoặc một tệp. Mỗi phần mềm thường có biểu tượng riêng để dễ nhận ra.' },
      { h: 'Mở và đóng phần mềm' },
      { ul: ['Mở: nháy đúp vào biểu tượng trên màn hình nền.', 'Đóng: nháy vào nút dấu X ở góc cửa sổ.'] },
      { note: 'Không nên rút dây điện để tắt phần mềm vì sẽ hại máy.' },
    ],
    examples: [
      { q: 'Để mở phần mềm từ biểu tượng, em làm gì?', a: 'Nháy đúp vào biểu tượng.' },
      { q: 'Để đóng phần mềm đang mở, em làm gì?', a: 'Nháy vào nút dấu X ở góc cửa sổ.' },
    ],
  },

  'P4TIN-w09-quiz': {
    topic: 'Ôn tập giữa học kì 1',
    intro: 'Ôn lại phần cứng - phần mềm, các dạng thông tin, bàn phím, chuột và biểu tượng.',
    objectives: [
      'Củng cố kiến thức về phần cứng, phần mềm, thông tin.',
      'Nhớ vị trí phím gờ nổi và các thao tác chuột.',
      'Ngồi đúng tư thế khi học máy tính.',
    ],
    theory: [
      { h: 'Những điều cần nhớ' },
      { ul: ['Phần cứng sờ được (bàn phím, màn hình); phần mềm là chương trình (Paint, trình duyệt).', 'Ba dạng thông tin: văn bản, hình ảnh, âm thanh.', 'Hai phím gờ nổi: F và J.', 'Nháy đúp chuột để mở phần mềm từ biểu tượng.'] },
      { note: 'Ngồi lưng thẳng, mắt cách màn hình một khoảng hợp lí để bảo vệ sức khỏe.' },
    ],
    examples: [
      { q: 'Tiếng trống trường thuộc dạng thông tin nào?', a: 'Dạng âm thanh.' },
      { q: 'Hai phím có gờ nổi là gì?', a: 'Phím F và phím J.' },
    ],
  },

  'P4TIN-w10-quiz': {
    topic: 'Thư mục — tạo và đặt tên',
    intro: 'Thư mục dùng để sắp xếp và chứa các tệp, thư mục con. Dùng thư mục giúp dễ tìm và quản lí tệp.',
    objectives: [
      'Hiểu công dụng của thư mục.',
      'Biết tạo thư mục mới và đặt tên rõ ràng.',
      'Biết một thư mục chứa được nhiều tệp và thư mục con.',
    ],
    theory: [
      { h: 'Thư mục là gì?' },
      { p: 'Thư mục dùng để sắp xếp và chứa các tệp, thư mục con. Một thư mục có thể chứa nhiều tệp và cả thư mục con.' },
      { h: 'Tạo và đặt tên thư mục' },
      { ul: ['Tạo thư mục: nháy phải chuột rồi chọn lệnh tạo thư mục mới (New Folder).', 'Đặt tên thư mục rõ ràng, dễ hiểu nội dung bên trong.'] },
      { note: 'Dùng thư mục giúp dễ tìm và quản lí tệp hơn.' },
    ],
    examples: [
      { q: 'Để tạo thư mục mới, em làm gì?', a: 'Nháy phải chuột rồi chọn lệnh tạo thư mục mới.' },
      { q: 'Nên đặt tên thư mục thế nào?', a: 'Rõ ràng, dễ hiểu nội dung bên trong.' },
    ],
  },

  'P4TIN-w11-quiz': {
    topic: 'Tệp — sao chép, di chuyển, xoá',
    intro: 'Tệp là nơi lưu dữ liệu. Em có thể sao chép, di chuyển hoặc xóa tệp khi cần.',
    objectives: [
      'Hiểu tệp (tập tin) là gì.',
      'Phân biệt sao chép và di chuyển tệp.',
      'Biết tệp xóa được chuyển vào thùng rác và cần cân nhắc trước khi xóa.',
    ],
    theory: [
      { h: 'Tệp là gì?' },
      { p: 'Tệp (tập tin) là nơi lưu dữ liệu như văn bản, hình ảnh, bài nhạc.' },
      { h: 'Các thao tác với tệp' },
      { ul: ['Sao chép (copy): tạo thêm một bản giống hệt, bản gốc vẫn còn.', 'Di chuyển (cut): chuyển tệp sang nơi khác, nơi cũ không còn.', 'Xóa: tệp được chuyển vào thùng rác (Recycle Bin) trước.'] },
      { note: 'Trước khi xóa, nên kiểm tra kĩ xem tệp có còn cần dùng không.' },
    ],
    examples: [
      { q: 'Sao chép tệp khác di chuyển tệp ở điểm nào?', a: 'Sao chép giữ bản gốc; di chuyển làm nơi cũ không còn tệp.' },
      { q: 'Khi xóa, tệp được chuyển vào đâu?', a: 'Vào thùng rác (Recycle Bin).' },
    ],
  },

  'P4TIN-w12-quiz': {
    topic: 'Sắp xếp dữ liệu',
    intro: 'Sắp xếp dữ liệu gọn gàng giúp em tìm và sử dụng thông tin nhanh hơn.',
    objectives: [
      'Hiểu lợi ích của việc sắp xếp dữ liệu.',
      'Biết có thể sắp xếp tệp theo tên, ngày tạo, loại tệp.',
      'Biết để mỗi môn vào một thư mục riêng.',
    ],
    theory: [
      { h: 'Vì sao cần sắp xếp dữ liệu?' },
      { p: 'Sắp xếp dữ liệu giúp dễ tìm và sử dụng thông tin hơn.' },
      { h: 'Cách sắp xếp tệp' },
      { ul: ['Theo tên: thường theo thứ tự bảng chữ cái A, B, C…', 'Theo ngày tạo.', 'Theo loại tệp.'] },
      { note: 'Để bài học gọn gàng, hãy để mỗi môn vào một thư mục riêng.' },
    ],
    examples: [
      { q: 'Sắp xếp theo tên thường theo thứ tự nào?', a: 'Theo bảng chữ cái A, B, C…' },
      { q: 'Sắp xếp dữ liệu giúp em điều gì?', a: 'Tìm thông tin nhanh hơn.' },
    ],
  },

  'P4TIN-w13-quiz': {
    topic: 'Internet — tìm kiếm thông tin',
    intro: 'Internet là mạng máy tính kết nối toàn cầu. Em dùng máy tìm kiếm để tìm thông tin bằng từ khóa.',
    objectives: [
      'Hiểu Internet là gì.',
      'Biết dùng máy tìm kiếm và gõ từ khóa.',
      'Biết chọn trang phù hợp, đáng tin cậy.',
    ],
    theory: [
      { h: 'Internet là gì?' },
      { p: 'Internet là mạng máy tính kết nối khắp toàn cầu, giúp em học hỏi và tìm hiểu nhiều điều bổ ích.' },
      { h: 'Tìm kiếm thông tin' },
      { ul: ['Dùng máy tìm kiếm (như Google).', 'Gõ từ khóa ngắn gọn, đúng nội dung cần tìm.', 'Khi có nhiều kết quả, chọn trang phù hợp và đáng tin cậy.'] },
      { note: 'Internet rất có ích nếu dùng đúng cách.' },
    ],
    examples: [
      { q: 'Để tìm thông tin trên Internet, em dùng gì?', a: 'Máy tìm kiếm như Google.' },
      { q: 'Khi tìm kiếm, em nên gõ gì?', a: 'Từ khóa ngắn gọn, đúng nội dung cần tìm.' },
    ],
  },

  'P4TIN-w14-quiz': {
    topic: 'Đánh giá thông tin tìm được',
    intro: 'Trên Internet có thông tin đúng và cả thông tin sai. Em cần biết chọn lọc và kiểm tra nguồn.',
    objectives: [
      'Biết thông tin trên mạng có đúng có sai.',
      'Biết kiểm tra ở trang uy tín và hỏi người lớn.',
      'Biết hiểu rồi viết lại theo cách của mình và ghi nguồn.',
    ],
    theory: [
      { h: 'Thông tin trên Internet' },
      { p: 'Trên Internet có cả thông tin đúng và thông tin sai, cần biết chọn lọc.' },
      { h: 'Làm sao biết thông tin đáng tin?' },
      { ul: ['Xem ở những trang uy tín.', 'Hỏi thầy cô, bố mẹ khi chưa chắc.', 'Thông tin đáng tin thường có nguồn rõ ràng, phù hợp với điều đã biết.'] },
      { note: 'Khi chép thông tin vào bài, hãy hiểu rồi viết lại theo cách của mình và ghi nguồn tham khảo.' },
    ],
    examples: [
      { q: 'Gặp thông tin lạ, đáng ngờ, em nên làm gì?', a: 'Hỏi thầy cô hoặc bố mẹ.' },
      { q: 'Thông tin đáng tin thường có đặc điểm gì?', a: 'Có nguồn rõ ràng, phù hợp với điều đã biết.' },
    ],
  },

  'P4TIN-w15-quiz': {
    topic: 'Internet an toàn — mật khẩu',
    intro: 'Mật khẩu bảo vệ tài khoản. Hãy giữ bí mật mật khẩu và không cho người lạ thông tin cá nhân.',
    objectives: [
      'Hiểu công dụng của mật khẩu.',
      'Biết giữ bí mật mật khẩu và tạo mật khẩu mạnh.',
      'Biết báo người lớn khi gặp nguy hiểm trên mạng.',
    ],
    theory: [
      { h: 'Mật khẩu' },
      { ul: ['Mật khẩu dùng để bảo vệ tài khoản, không cho người lạ dùng.', 'Giữ mật khẩu bí mật, chỉ cho người thân tin cậy như bố mẹ biết.', 'Mật khẩu mạnh khó đoán, thường có cả chữ và số (không nên dùng 123456 hay ngày sinh).'] },
      { h: 'An toàn khi lên mạng' },
      { ul: ['Không cung cấp địa chỉ nhà, thông tin cá nhân cho người lạ.', 'Không hẹn gặp người lạ trên mạng.'] },
      { note: 'Khi gặp điều khó chịu, nguy hiểm trên mạng, hãy kể ngay cho bố mẹ, thầy cô.' },
    ],
    examples: [
      { q: 'Mật khẩu mạnh có đặc điểm gì?', a: 'Khó đoán, thường có cả chữ và số.' },
      { q: 'Người lạ hỏi địa chỉ nhà, em nên làm gì?', a: 'Không cung cấp và báo cho bố mẹ biết.' },
    ],
  },

  'P4TIN-w16-quiz': {
    topic: 'Đạo đức số — ứng xử văn minh',
    intro: 'Lời nói trên mạng cũng làm người khác vui hoặc buồn như đời thực. Hãy ứng xử lịch sự, tôn trọng mọi người.',
    objectives: [
      'Biết nhắn tin, bình luận lịch sự, tôn trọng người khác.',
      'Biết bênh vực, an ủi bạn khi bạn bị trêu chọc.',
      'Biết xin phép trước khi đăng ảnh người khác.',
    ],
    theory: [
      { h: 'Ứng xử văn minh trên mạng' },
      { ul: ['Nhắn tin, bình luận một cách lịch sự, tôn trọng người khác.', 'Không nói lời thô tục, không chê bai, trêu chọc bạn.', 'Tử tế, trung thực với mọi người.'] },
      { h: 'Tôn trọng người khác' },
      { ul: ['Trước khi đăng ảnh người khác, hãy hỏi và được người đó đồng ý.', 'Thấy bạn bị trêu chọc thì an ủi bạn và báo người lớn.'] },
      { note: 'Lời nói trên mạng cũng khiến người khác vui hoặc buồn như ngoài đời thực.' },
    ],
    examples: [
      { q: 'Trước khi đăng ảnh người khác lên mạng, em nên làm gì?', a: 'Hỏi và được người đó đồng ý.' },
      { q: 'Thấy bạn bị trêu chọc trên mạng, em nên làm gì?', a: 'An ủi bạn và báo người lớn.' },
    ],
  },

  'P4TIN-w17-quiz': {
    topic: 'Bản quyền và tôn trọng sản phẩm số',
    intro: 'Sản phẩm số (bài hát, hình ảnh, phần mềm) là công sức của người tạo ra, cần được tôn trọng.',
    objectives: [
      'Hiểu sản phẩm số là công sức của người tạo ra.',
      'Biết xin phép hoặc ghi nguồn khi dùng sản phẩm của người khác.',
      'Hiểu sao chép khi chưa được phép là vi phạm bản quyền.',
    ],
    theory: [
      { h: 'Sản phẩm số là gì?' },
      { p: 'Sản phẩm số như bài hát, hình ảnh, phần mềm là công sức của người tạo ra, cần được tôn trọng.' },
      { h: 'Tôn trọng bản quyền' },
      { ul: ['Khi dùng hình ảnh, bài viết của người khác: xin phép hoặc ghi rõ nguồn.', 'Sao chép phần mềm, bài hát khi chưa được phép là vi phạm bản quyền.', 'Sản phẩm do em làm ra là của em, em có quyền với nó.'] },
      { note: 'Tôn trọng bản quyền khuyến khích người sáng tạo làm ra nhiều sản phẩm tốt.' },
    ],
    examples: [
      { q: 'Muốn dùng hình ảnh của người khác, em nên làm gì?', a: 'Xin phép hoặc ghi rõ nguồn.' },
      { q: 'Sao chép phần mềm khi chưa được phép là gì?', a: 'Là vi phạm bản quyền, việc làm không đúng.' },
    ],
  },

  'P4TIN-w18-quiz': {
    topic: 'Ôn tập cuối học kì 1',
    intro: 'Ôn lại thư mục - tệp, Internet, an toàn mạng, đạo đức số và bản quyền.',
    objectives: [
      'Củng cố cách tạo thư mục và giữ mật khẩu bí mật.',
      'Nhớ cách tôn trọng bản quyền và ứng xử văn minh.',
      'Biết dùng Internet để học hỏi.',
    ],
    theory: [
      { h: 'Những điều cần nhớ' },
      { ul: ['Tạo thư mục mới: nháy phải chuột chọn lệnh tạo thư mục mới.', 'Giữ mật khẩu bí mật để bảo vệ tài khoản.', 'Dùng hình ảnh của người khác phải xin phép hoặc ghi nguồn.', 'Nhắn tin, bình luận lịch sự, tôn trọng người khác.'] },
      { note: 'Internet giúp em học hỏi và tìm thông tin bổ ích nếu dùng đúng cách.' },
    ],
    examples: [
      { q: 'Mật khẩu nên được giữ thế nào?', a: 'Giữ bí mật.' },
      { q: 'Dùng hình ảnh của người khác, em nên làm gì?', a: 'Xin phép hoặc ghi nguồn.' },
    ],
  },

  'P4TIN-w19-quiz': {
    topic: 'Soạn thảo văn bản — gõ và sửa',
    intro: 'Phần mềm soạn thảo văn bản dùng để gõ, chỉnh sửa chữ và in ra. Em dùng các phím để sửa lỗi.',
    objectives: [
      'Hiểu công dụng của phần mềm soạn thảo văn bản.',
      'Biết công dụng của phím Backspace, Enter, Shift.',
      'Biết sửa lại khi gõ sai.',
    ],
    theory: [
      { h: 'Phần mềm soạn thảo văn bản' },
      { p: 'Phần mềm soạn thảo dùng để gõ, chỉnh sửa chữ và in ra.' },
      { h: 'Một số phím khi soạn thảo' },
      { ul: ['Backspace: xóa chữ bên trái con trỏ.', 'Enter: xuống dòng mới.', 'Shift: giữ Shift rồi gõ chữ để viết in hoa chữ đó.'] },
      { note: 'Khi gõ sai một từ, hãy xóa rồi gõ lại từ đúng.' },
    ],
    examples: [
      { q: 'Phím Backspace dùng để làm gì?', a: 'Xóa chữ bên trái con trỏ.' },
      { q: 'Để viết in hoa một chữ cái, em làm gì?', a: 'Giữ Shift rồi gõ chữ đó.' },
    ],
  },

  'P4TIN-w20-quiz': {
    topic: 'Định dạng chữ',
    intro: 'Định dạng chữ giúp văn bản đẹp và dễ đọc: chữ đậm, chữ nghiêng, đổi cỡ chữ.',
    objectives: [
      'Biết định dạng chữ đậm, chữ nghiêng.',
      'Biết thay đổi cỡ chữ.',
      'Biết định dạng vừa phải, hợp lí, dễ đọc.',
    ],
    theory: [
      { h: 'Các kiểu định dạng chữ' },
      { ul: ['Chữ đậm (Bold): chữ dày, đậm và nổi bật hơn.', 'Chữ nghiêng (Italic): chữ nghiêng đi.', 'Cỡ chữ (font size): để chữ to hơn hoặc nhỏ hơn.'] },
      { p: 'Để làm nổi bật tiêu đề bài, có thể tô đậm và tăng cỡ chữ.' },
      { note: 'Nên định dạng vừa phải, dễ đọc; không dùng quá nhiều màu gây rối mắt.' },
    ],
    examples: [
      { q: 'Định dạng chữ đậm làm chữ thế nào?', a: 'Chữ dày, đậm và nổi bật hơn.' },
      { q: 'Để chữ to hay nhỏ, em thay đổi gì?', a: 'Thay đổi cỡ chữ (font size).' },
    ],
  },

  'P4TIN-w21-quiz': {
    topic: 'Chèn hình vào văn bản',
    intro: 'Chèn hình vào văn bản giúp bài viết sinh động, dễ hiểu hơn. Hình nên phù hợp với nội dung.',
    objectives: [
      'Hiểu lợi ích của việc chèn hình.',
      'Biết dùng lệnh Chèn (Insert) để chèn hình.',
      'Biết chỉnh kích thước và xóa hình.',
    ],
    theory: [
      { h: 'Chèn hình vào văn bản' },
      { ul: ['Dùng lệnh Chèn (Insert) rồi chọn hình.', 'Sau khi chèn, có thể thay đổi kích thước to nhỏ của hình.', 'Muốn xóa hình: chọn hình rồi nhấn phím xóa.'] },
      { p: 'Hình chèn vào nên phù hợp với nội dung bài viết.' },
      { note: 'Chèn hình giúp bài viết sinh động và dễ hiểu hơn.' },
    ],
    examples: [
      { q: 'Để chèn một hình vào văn bản, em dùng lệnh nào?', a: 'Lệnh Chèn (Insert) rồi chọn hình.' },
      { q: 'Hình chèn vào bài nên thế nào?', a: 'Phù hợp với nội dung bài viết.' },
    ],
  },

  'P4TIN-w22-quiz': {
    topic: 'Trình bày trang và in',
    intro: 'Trước khi in nên xem trước trang in. Trình bày trang gọn gàng giúp văn bản đẹp và dễ đọc.',
    objectives: [
      'Biết xem trước trang in (Print Preview) trước khi in.',
      'Biết máy tính cần kết nối máy in để in.',
      'Hiểu canh lề giúp trang cân đối.',
    ],
    theory: [
      { h: 'Chuẩn bị để in' },
      { ul: ['Xem trước trang in (Print Preview) để kiểm tra rồi mới in.', 'Máy tính cần kết nối với máy in.', 'Nên in thử một bản trước khi in nhiều bản.'] },
      { h: 'Trình bày trang' },
      { ul: ['Lề trang (canh lề) giúp văn bản cân đối, không sát mép giấy.'] },
      { note: 'Trình bày trang gọn gàng giúp văn bản đẹp và dễ đọc hơn.' },
    ],
    examples: [
      { q: 'Trước khi in, em nên làm gì?', a: 'Xem trước trang in (Print Preview).' },
      { q: 'Lề trang giúp điều gì?', a: 'Giúp văn bản cân đối, không sát mép giấy.' },
    ],
  },

  'P4TIN-w23-quiz': {
    topic: 'Phần mềm vẽ nâng cao',
    intro: 'Phần mềm vẽ có nhiều công cụ: bút chì, đổ màu, vẽ hình. Vẽ sai có thể tẩy hoặc hoàn tác (Undo).',
    objectives: [
      'Biết công dụng các công cụ vẽ cơ bản.',
      'Biết dùng tẩy hoặc lệnh hoàn tác khi vẽ sai.',
      'Biết lưu (Save) bức tranh sau khi vẽ.',
    ],
    theory: [
      { h: 'Một số công cụ vẽ' },
      { ul: ['Bút chì (Pencil): vẽ những nét tự do.', 'Tô màu (đổ màu): tô màu cho một vùng kín.', 'Hình tròn (Ellipse): để vẽ hình tròn.'] },
      { p: 'Khi vẽ sai, có thể dùng công cụ tẩy hoặc lệnh hoàn tác (Undo).' },
      { note: 'Sau khi vẽ xong, hãy lưu (Save) tệp tranh lại để giữ.' },
    ],
    examples: [
      { q: 'Công cụ tô màu (đổ màu) dùng để làm gì?', a: 'Tô màu cho một vùng kín.' },
      { q: 'Khi vẽ sai, em có thể làm gì?', a: 'Dùng công cụ tẩy hoặc lệnh hoàn tác (Undo).' },
    ],
  },

  'P4TIN-w24-quiz': {
    topic: 'Trình chiếu — làm quen',
    intro: 'Phần mềm trình chiếu dùng để tạo các trang chiếu (slide) phục vụ thuyết trình rõ ràng, sinh động.',
    objectives: [
      'Hiểu công dụng của phần mềm trình chiếu.',
      'Biết mỗi trang gọi là trang chiếu (slide).',
      'Biết chọn Slide Show để xem toàn màn hình.',
    ],
    theory: [
      { h: 'Phần mềm trình chiếu' },
      { p: 'Phần mềm trình chiếu dùng để tạo các trang chiếu phục vụ thuyết trình.' },
      { ul: ['Mỗi trang gọi là một trang chiếu (slide).', 'Trên một trang chiếu có thể đưa vào chữ và hình ảnh.', 'Để xem toàn màn hình: chọn lệnh trình chiếu (Slide Show).'] },
      { note: 'Bài trình chiếu giúp trình bày ý tưởng rõ ràng và sinh động.' },
    ],
    examples: [
      { q: 'Mỗi trang trong bài trình chiếu gọi là gì?', a: 'Một trang chiếu (slide).' },
      { q: 'Để xem trên toàn màn hình, em chọn lệnh nào?', a: 'Lệnh trình chiếu (Slide Show).' },
    ],
  },

  'P4TIN-w25-quiz': {
    topic: 'Tạo trang trình chiếu',
    intro: 'Em thêm trang chiếu mới, đặt tiêu đề ngắn gọn, dùng chữ đủ to và mỗi trang một ý chính.',
    objectives: [
      'Biết thêm trang chiếu mới (New Slide).',
      'Biết đặt tiêu đề ngắn gọn và dùng chữ đủ to.',
      'Biết mỗi trang trình bày một ý chính và lưu bài.',
    ],
    theory: [
      { h: 'Tạo và trình bày trang chiếu' },
      { ul: ['Thêm trang: chọn lệnh thêm trang chiếu mới (New Slide).', 'Tiêu đề: ngắn gọn, nêu đúng nội dung trang.', 'Chữ: cỡ đủ to, dễ đọc từ xa.', 'Mỗi trang: trình bày một ý chính, gọn gàng.'] },
      { note: 'Sau khi tạo xong, hãy lưu lại để dùng khi thuyết trình.' },
    ],
    examples: [
      { q: 'Tiêu đề của một trang chiếu nên thế nào?', a: 'Ngắn gọn, nêu đúng nội dung trang.' },
      { q: 'Chữ trên trang chiếu nên thế nào?', a: 'Cỡ đủ to, dễ đọc từ xa.' },
    ],
  },

  'P4TIN-w26-quiz': {
    topic: 'Thuật toán — các bước giải quyết vấn đề',
    intro: 'Thuật toán là dãy các bước theo thứ tự để giải quyết một việc. Các bước cần đúng thứ tự và rõ ràng.',
    objectives: [
      'Hiểu thuật toán là gì.',
      'Biết các bước cần đúng thứ tự, rõ ràng.',
      'Cho được ví dụ thuật toán trong đời sống.',
    ],
    theory: [
      { h: 'Thuật toán là gì?' },
      { p: 'Thuật toán là dãy các bước theo thứ tự để giải quyết một việc.' },
      { ul: ['Các bước cần đúng thứ tự, rõ ràng.', 'Làm sai thứ tự thì kết quả có thể bị sai.', 'Ví dụ: các bước pha một cốc nước cam là một thuật toán.'] },
      { note: 'Để giải quyết một vấn đề, trước hết hãy hiểu rõ vấn đề rồi nghĩ ra các bước thực hiện.' },
    ],
    examples: [
      { q: 'Các bước trong thuật toán cần thế nào?', a: 'Đúng thứ tự và rõ ràng.' },
      { q: 'Nêu một ví dụ thuật toán trong đời sống.', a: 'Các bước pha một cốc nước cam.' },
    ],
  },

  'P4TIN-w27-quiz': {
    topic: 'Sơ đồ khối',
    intro: 'Sơ đồ khối mô tả các bước của thuật toán bằng hình vẽ, các bước nối với nhau bằng mũi tên chỉ thứ tự.',
    objectives: [
      'Hiểu công dụng của sơ đồ khối.',
      'Biết các bước được nối bằng mũi tên chỉ thứ tự.',
      'Biết đọc sơ đồ khối theo chiều mũi tên.',
    ],
    theory: [
      { h: 'Sơ đồ khối là gì?' },
      { p: 'Sơ đồ khối dùng để mô tả các bước của thuật toán bằng hình vẽ.' },
      { ul: ['Các bước được nối bằng mũi tên chỉ thứ tự thực hiện.', 'Mỗi loại hình thể hiện một loại bước khác nhau.', 'Đọc sơ đồ khối theo chiều mũi tên từ đầu đến cuối.'] },
      { note: 'Sơ đồ khối giúp nhìn rõ các bước và thứ tự thực hiện.' },
    ],
    examples: [
      { q: 'Các bước trong sơ đồ khối được nối bằng gì?', a: 'Bằng mũi tên chỉ thứ tự thực hiện.' },
      { q: 'Đọc sơ đồ khối, ta đi theo chiều nào?', a: 'Theo chiều mũi tên từ đầu đến cuối.' },
    ],
  },

  'P4TIN-w28-quiz': {
    topic: 'Lập trình kéo thả Scratch (1)',
    intro: 'Scratch là phần mềm lập trình bằng cách kéo thả và ghép các khối lệnh như xếp hình.',
    objectives: [
      'Hiểu Scratch là gì.',
      'Biết tạo chương trình bằng cách kéo thả, ghép khối lệnh.',
      'Biết khi sai có thể tháo khối và ghép lại.',
    ],
    theory: [
      { h: 'Scratch là gì?' },
      { p: 'Scratch là phần mềm lập trình bằng cách kéo thả các khối lệnh.' },
      { ul: ['Tạo chương trình bằng cách kéo thả và ghép các khối lệnh.', 'Các khối lệnh ghép với nhau như những mảnh xếp hình.', 'Scratch phù hợp để học sinh tập làm quen với lập trình.'] },
      { note: 'Khi sai, em có thể tháo khối ra và ghép lại cho đúng, không cần làm lại từ đầu.' },
    ],
    examples: [
      { q: 'Trong Scratch, em tạo chương trình bằng cách nào?', a: 'Kéo thả và ghép các khối lệnh.' },
      { q: 'Các khối lệnh ghép với nhau như thế nào?', a: 'Như những mảnh xếp hình.' },
    ],
  },

  'P4TIN-w29-quiz': {
    topic: 'Scratch — nhân vật và sân khấu',
    intro: 'Trong Scratch, nhân vật gọi là sprite, hoạt động trên sân khấu (Stage). Một chương trình có thể có nhiều nhân vật.',
    objectives: [
      'Biết nhân vật gọi là sprite, nơi hoạt động là sân khấu.',
      'Biết thay đổi trang phục, kích thước, vị trí nhân vật.',
      'Hiểu phông nền tạo khung cảnh cho câu chuyện.',
    ],
    theory: [
      { h: 'Nhân vật và sân khấu' },
      { ul: ['Nhân vật được gọi là sprite (đối tượng).', 'Sân khấu (Stage) là nơi nhân vật hoạt động và hiển thị.', 'Em có thể thay đổi trang phục, kích thước, vị trí của nhân vật.', 'Phông nền (backdrop) giúp tạo khung cảnh cho câu chuyện.'] },
      { note: 'Một chương trình Scratch có thể có nhiều nhân vật cùng hoạt động.' },
    ],
    examples: [
      { q: 'Trong Scratch, nhân vật được gọi là gì?', a: 'Sprite (đối tượng).' },
      { q: 'Sân khấu (Stage) là gì?', a: 'Nơi nhân vật hoạt động và hiển thị.' },
    ],
  },

  'P4TIN-w30-quiz': {
    topic: 'Scratch — khối lệnh chuyển động',
    intro: 'Khối lệnh chuyển động giúp nhân vật di chuyển và xoay hướng trên sân khấu.',
    objectives: [
      'Hiểu công dụng của khối lệnh chuyển động.',
      'Biết khối di chuyển và khối quay làm gì.',
      'Hiểu các khối thực hiện lần lượt theo thứ tự.',
    ],
    theory: [
      { h: 'Khối lệnh chuyển động' },
      { ul: ['Khối chuyển động giúp nhân vật di chuyển trên sân khấu.', 'Khối "di chuyển 10 bước": làm nhân vật tiến về phía trước 10 bước.', 'Khối "quay": làm nhân vật xoay hướng.'] },
      { note: 'Khi ghép nhiều khối chuyển động, nhân vật thực hiện lần lượt theo thứ tự các khối.' },
    ],
    examples: [
      { q: 'Khối "di chuyển 10 bước" làm nhân vật làm gì?', a: 'Tiến về phía trước 10 bước.' },
      { q: 'Khối "quay" làm nhân vật làm gì?', a: 'Xoay hướng.' },
    ],
  },

  'P4TIN-w31-quiz': {
    topic: 'Scratch — lặp lại',
    intro: 'Khối lệnh lặp lại giúp thực hiện một việc nhiều lần mà không phải ghép cùng một khối nhiều lần.',
    objectives: [
      'Hiểu công dụng và lợi ích của khối lặp.',
      'Biết khối "lặp lại 4 lần" và "lặp lại liên tục".',
      'Biết dùng khối lặp để vẽ hình.',
    ],
    theory: [
      { h: 'Khối lệnh lặp lại' },
      { ul: ['Dùng để thực hiện một việc nhiều lần.', 'Lợi ích: không phải ghép cùng một khối nhiều lần, chương trình gọn hơn.', 'Khối "lặp lại 4 lần": thực hiện các lệnh bên trong đúng 4 lần.', 'Khối "lặp lại liên tục (mãi mãi)": lặp không dừng cho tới khi ta dừng chương trình.'] },
      { note: 'Để vẽ hình vuông, dùng khối lặp các bước đi và quay 4 lần.' },
    ],
    examples: [
      { q: 'Khối "lặp lại 4 lần" làm gì?', a: 'Thực hiện các lệnh bên trong đúng 4 lần.' },
      { q: 'Để vẽ hình vuông, khối lặp giúp gì?', a: 'Lặp các bước đi và quay 4 lần.' },
    ],
  },

  'P4TIN-w32-quiz': {
    topic: 'Scratch — sự kiện (khi bấm)',
    intro: 'Khối sự kiện cho chương trình biết khi nào bắt đầu chạy, ví dụ khi bấm lá cờ xanh hay khi bấm phím cách.',
    objectives: [
      'Hiểu sự kiện là việc xảy ra để khởi động một nhóm lệnh.',
      'Biết khối "khi bấm lá cờ xanh", "khi bấm phím cách", "khi bấm vào nhân vật".',
      'Hiểu vai trò của khối sự kiện.',
    ],
    theory: [
      { h: 'Khối sự kiện trong Scratch' },
      { p: 'Sự kiện là việc xảy ra để khởi động một nhóm lệnh chạy.' },
      { ul: ['"Khi bấm lá cờ xanh": bắt đầu chạy chương trình khi bấm cờ.', '"Khi bấm phím cách": chạy lệnh khi em nhấn phím cách.', '"Khi bấm vào nhân vật": chạy khi em nháy chuột vào nhân vật.'] },
      { note: 'Khối sự kiện giúp chương trình biết khi nào bắt đầu chạy.' },
    ],
    examples: [
      { q: 'Khối "khi bấm lá cờ xanh" dùng để làm gì?', a: 'Bắt đầu chạy chương trình khi bấm cờ.' },
      { q: 'Khối sự kiện giúp chương trình điều gì?', a: 'Biết khi nào bắt đầu chạy.' },
    ],
  },

  'P4TIN-w33-quiz': {
    topic: 'Dự án Scratch nhỏ',
    intro: 'Làm một dự án Scratch nhỏ như trò chơi hoặc câu chuyện đơn giản giúp em rèn tư duy lập trình và sự sáng tạo.',
    objectives: [
      'Biết nghĩ ý tưởng và các bước trước khi làm.',
      'Biết kiểm tra và sửa lỗi khi chương trình chạy chưa đúng ý.',
      'Biết lưu và chia sẻ sản phẩm.',
    ],
    theory: [
      { h: 'Các bước làm dự án Scratch nhỏ' },
      { ul: ['Đầu tiên: nghĩ ý tưởng và các bước cần làm.', 'Dự án có thể là một trò chơi hoặc câu chuyện đơn giản.', 'Chạy chưa đúng ý: kiểm tra lại các khối lệnh và sửa.', 'Làm xong: lưu lại và có thể chia sẻ cho bạn xem.'] },
      { note: 'Làm dự án Scratch giúp em rèn tư duy lập trình và sự sáng tạo.' },
    ],
    examples: [
      { q: 'Khi làm dự án Scratch, đầu tiên em nên làm gì?', a: 'Nghĩ ý tưởng và các bước cần làm.' },
      { q: 'Chương trình chạy chưa đúng ý, em nên làm gì?', a: 'Kiểm tra lại các khối lệnh và sửa.' },
    ],
  },

  'P4TIN-w34-quiz': {
    topic: 'Dùng máy tính có trách nhiệm',
    intro: 'Dùng máy tính có trách nhiệm là dùng đúng lúc, đúng việc, vừa phải và giữ gìn máy.',
    objectives: [
      'Hiểu thế nào là dùng máy tính có trách nhiệm.',
      'Biết cách bảo vệ mắt và dùng máy vừa phải.',
      'Biết giữ gìn máy tính và máy tính dùng chung.',
    ],
    theory: [
      { h: 'Dùng máy tính có trách nhiệm' },
      { ul: ['Dùng đúng lúc, đúng việc, vừa phải theo lời người lớn dặn.', 'Bảo vệ mắt: nghỉ giải lao, nhìn ra xa sau một lúc.', 'Giữ gìn máy: dùng nhẹ nhàng, giữ máy sạch sẽ, không ăn uống trên bàn phím.'] },
      { note: 'Máy tính dùng chung ở trường nên giữ gìn cẩn thận và nhường bạn cùng dùng.' },
    ],
    examples: [
      { q: 'Để bảo vệ mắt khi dùng máy tính, em nên làm gì?', a: 'Nghỉ giải lao, nhìn ra xa sau một lúc.' },
      { q: 'Dùng máy tính chung ở trường, em nên thế nào?', a: 'Giữ gìn cẩn thận, nhường bạn cùng dùng.' },
    ],
  },

  'P4TIN-w35-quiz': {
    topic: 'Ôn tập cuối năm',
    intro: 'Ôn lại toàn bộ kiến thức cả năm: phần cứng - phần mềm, an toàn mạng, thuật toán và lập trình Scratch.',
    objectives: [
      'Củng cố phân biệt phần cứng và phần mềm.',
      'Nhớ cách bảo vệ tài khoản và khái niệm thuật toán.',
      'Nhớ cách lập trình Scratch và dùng máy có trách nhiệm.',
    ],
    theory: [
      { h: 'Những điều cần nhớ cả năm' },
      { ul: ['Phần cứng sờ được; phần mềm là các chương trình.', 'Để bảo vệ tài khoản, giữ bí mật mật khẩu.', 'Thuật toán là dãy các bước theo thứ tự để giải quyết một việc.', 'Trong Scratch, em lập trình bằng cách kéo thả và ghép các khối lệnh.'] },
      { note: 'Hãy dùng máy tính có trách nhiệm, an toàn và giữ gìn máy.' },
    ],
    examples: [
      { q: 'Phần cứng và phần mềm khác nhau ở chỗ nào?', a: 'Phần cứng sờ được; phần mềm là các chương trình.' },
      { q: 'Trong Scratch, em lập trình bằng cách nào?', a: 'Kéo thả và ghép các khối lệnh.' },
    ],
  },

  'P4TIN-w36-quiz': {
    topic: 'Kết thúc Lớp 4 — Hành trang Tin học vào Lớp 5',
    intro: 'Chúc mừng các em đã hoàn thành năm học Tin học Lớp 4! Hôm nay cô tổng kết hành trình số hóa, từ phần cứng đến Scratch, và mở ra những chân trời lập trình thú vị hơn ở Lớp 5!',
    objectives: [
      'Hệ thống toàn bộ kiến thức Tin học Lớp 4 theo bốn mảng lớn.',
      'Biết những kỹ năng lập trình và công nghệ mới chờ ở Lớp 5.',
      'Lập kế hoạch tự học lập trình trong kỳ hè.',
    ],
    theory: [
      { h: 'Bốn mảng Tin học Lớp 4' },
      { ul: [
        'Máy tính và phần cứng: CPU (bộ não), RAM (trí nhớ tạm), ổ cứng (lưu trữ), màn hình, bàn phím, chuột, loa; phân biệt phần cứng (sờ được) và phần mềm (chương trình).',
        'An toàn thông tin: mật khẩu mạnh (8+ ký tự, chữ hoa + thường + số + ký tự đặc biệt); không chia sẻ với ai; phòng tránh lừa đảo (phishing); không gặp người lạ biết qua mạng.',
        'Thuật toán và tư duy lập trình: thuật toán là dãy bước có thứ tự giải quyết vấn đề; các cấu trúc cơ bản — tuần tự, rẽ nhánh (nếu-thì), lặp (while/for).',
        'Lập trình Scratch: nhân vật (Sprite), phông nền (Backdrop); các khối lệnh (di chuyển, cảm biến, âm thanh, ngoại hình, điều kiện, lặp); tạo hoạt hình và trò chơi đơn giản.',
      ] },
      { h: 'Lớp 5 Tin học sẽ học gì?' },
      { ul: [
        'Thuật toán nâng cao: tìm kiếm nhị phân, sắp xếp bong bóng.',
        'Scratch nâng cao: biến (variable), danh sách, nhiều nhân vật tương tác, game có điểm số.',
        'Phần mềm soạn thảo văn bản: Microsoft Word/Google Docs — định dạng, bảng biểu, hình ảnh.',
        'Internet an toàn: nhận biết thông tin đúng/sai trên mạng; bảo vệ dữ liệu cá nhân.',
      ] },
      { h: 'Kế hoạch hè lập trình' },
      { ul: [
        'Làm 1 dự án Scratch nhỏ trong hè: thiết kế game câu cá hoặc quiz trắc nghiệm.',
        'Khám phá code.org (Hour of Code) — miễn phí, tiếng Việt, rất vui!',
        'Ghi nhật ký: mỗi tuần học được gì mới về máy tính/internet.',
      ] },
      { note: 'Thế giới số đang thay đổi mỗi ngày — em học Tin học hôm nay là chuẩn bị cho tương lai!' },
    ],
    examples: [
      { q: 'Viết thuật toán (các bước) để pha 1 ly nước chanh mật ong.', a: 'B1: Lấy ly sạch. B2: Vắt ½ quả chanh vào ly. B3: Thêm 1 thìa mật ong. B4: Rót nước ấm vào. B5: Khuấy đều. B6: Thêm đá nếu muốn uống lạnh. → Đây chính là thuật toán: dãy bước tuần tự để tạo ra kết quả mong muốn.' },
      { q: 'Trong Scratch, em muốn mèo tự động hỏi tên người dùng rồi chào. Em dùng những khối lệnh nào?', a: 'Khối "Hỏi [Bạn tên gì?] và chờ" → khối "Nói [Xin chào!] + [câu trả lời] trong 3 giây". Dùng biến "câu trả lời" (answer) để lưu tên người dùng.' },
    ],
  },
};
