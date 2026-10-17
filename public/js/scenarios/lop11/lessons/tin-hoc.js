// ============================================================
// Lớp 11 · TIN HỌC (Tin học ứng dụng - ICT) — Lý thuyết 35 tuần
// Bám CTGD 2018, bộ Kết nối tri thức (Phần I cốt lõi + Phần III Tin học ứng dụng).
// Key trùng id quiz: "H11TIN-wNN-quiz".
// ============================================================

export const H11TIN_LESSONS = {
  // ──────────────── HK1 — Phần I: Cốt lõi chung ────────────────
  'H11TIN-w01-quiz': {
    topic: 'Hệ điều hành',
    intro: 'Chào các em! Tuần này thầy trò ta tìm hiểu về "bộ não điều hành" của mọi thiết bị số — hệ điều hành. Đây là phần mềm các em dùng mỗi ngày mà ít khi để ý, nhưng nếu thiếu nó thì máy tính chỉ là một đống linh kiện vô tri.',
    objectives: [
      'Hiểu được hệ điều hành là gì và vì sao máy tính bắt buộc phải có nó.',
      'Nêu được các chức năng chính: quản lý tiến trình, bộ nhớ, tệp và thiết bị.',
      'Phân biệt được các hệ điều hành phổ biến cho máy tính và điện thoại.',
    ],
    theory: [
      { h: 'Hệ điều hành là gì?' },
      { p: 'Hệ điều hành (Operating System - OS) là phần mềm hệ thống quan trọng nhất, làm cầu nối giữa phần cứng và các phần mềm ứng dụng. Nó được nạp vào bộ nhớ ngay khi bật máy và chạy suốt quá trình sử dụng.' },
      { p: 'Không có hệ điều hành, các chương trình ứng dụng (trình duyệt, Word, game…) không thể chạy được, vì chúng đều phải nhờ hệ điều hành cấp phát tài nguyên và giao tiếp với phần cứng.' },
      { h: 'Bốn chức năng cốt lõi' },
      { ul: [
        'Quản lý tiến trình (process): quyết định chương trình nào được dùng CPU, khi nào — nhờ đó nhiều chương trình chạy "đồng thời" (đa nhiệm).',
        'Quản lý bộ nhớ (RAM): cấp phát và thu hồi vùng nhớ cho từng chương trình, tránh chúng giẫm lên nhau.',
        'Quản lý tệp và thư mục: tổ chức dữ liệu trên đĩa thành cây thư mục để dễ lưu trữ, tìm kiếm.',
        'Quản lý thiết bị: điều khiển chuột, bàn phím, máy in, màn hình… thông qua trình điều khiển (driver).',
      ] },
      { h: 'Các hệ điều hành phổ biến' },
      { p: 'Trên máy tính: Windows, macOS, Linux (Ubuntu, Fedora…). Trên điện thoại thông minh: Android và iOS chiếm thị phần lớn nhất.' },
      { h: 'Tài khoản người dùng và đa nhiệm' },
      { p: 'Hệ điều hành cho phép tạo nhiều tài khoản (user account) để phân quyền, bảo mật và cá nhân hoá. Đa nhiệm (multitasking) là khả năng chia sẻ thời gian CPU để chạy nhiều chương trình cùng lúc.' },
      { note: 'Khi máy chậm vì quá nhiều ứng dụng chạy nền, hãy mở Task Manager (Windows) hoặc Activity Monitor (macOS) để xem và tắt bớt tiến trình ngốn tài nguyên.' },
    ],
    examples: [
      { q: 'Vì sao khi mở quá nhiều ứng dụng cùng lúc thì máy tính chạy chậm đi?', a: 'Mỗi ứng dụng đều chiếm một phần RAM và cần được CPU phục vụ. Khi mở quá nhiều, RAM cạn kiệt (hệ điều hành phải dùng đĩa làm bộ nhớ ảo, rất chậm) và CPU phải chia thời gian cho nhiều tiến trình hơn, nên mỗi chương trình nhận được ít tài nguyên hơn và chạy chậm lại.' },
      { q: 'Hãy kể tên một việc mà phần mềm ứng dụng làm và một việc mà hệ điều hành làm khi em soạn thảo văn bản.', a: 'Phần mềm ứng dụng (ví dụ Word) làm việc soạn thảo, định dạng chữ. Hệ điều hành làm việc cấp RAM cho Word, nhận tín hiệu từ bàn phím chuyển vào Word, và lưu tệp xuống đĩa khi em bấm Save.' },
    ],
  },

  'H11TIN-w02-quiz': {
    topic: 'Thực hành sử dụng hệ điều hành',
    intro: 'Các em thân mến! Biết lý thuyết về hệ điều hành rồi, tuần này ta xắn tay thực hành: quản lý tệp và thư mục, dùng phím tắt, và xử lý các tình huống thường gặp như khôi phục tệp xoá nhầm.',
    objectives: [
      'Tổ chức được tệp và thư mục, hiểu khái niệm đường dẫn.',
      'Sử dụng thành thạo các phím tắt sao chép, di chuyển, hoàn tác.',
      'Biết khôi phục tệp đã xoá và mở Task Manager khi cần.',
    ],
    theory: [
      { h: 'Tệp, thư mục và đường dẫn' },
      { p: 'Tệp (file) là đơn vị lưu trữ dữ liệu. Thư mục (folder) dùng để gom nhóm, phân loại các tệp cho gọn gàng. Thư mục có thể chứa thư mục con, tạo thành cây thư mục.' },
      { p: 'Đường dẫn (path) cho biết vị trí của tệp. Đường dẫn tuyệt đối bắt đầu từ gốc, ví dụ trên Windows: C:\\Users\\HS\\Documents\\baitap.docx. Đường dẫn tương đối tính từ thư mục hiện tại, ví dụ ./tailieu/baitap.docx.' },
      { h: 'Phần mở rộng của tệp' },
      { ul: [
        '.docx, .txt — tệp văn bản;',
        '.jpg, .png — tệp ảnh;',
        '.mp3, .wav — tệp âm thanh;',
        '.exe — tệp thi hành (chương trình) trên Windows.',
      ] },
      { h: 'Phím tắt thường dùng' },
      { ul: [
        'Ctrl + C: sao chép; Ctrl + X: cắt; Ctrl + V: dán;',
        'Ctrl + Z: hoàn tác; Ctrl + S: lưu;',
        'Ctrl + Shift + Esc: mở Task Manager trực tiếp.',
      ] },
      { h: 'Khôi phục tệp và quản lý tác vụ' },
      { p: 'Khi xoá tệp, nó thường vào Thùng rác (Recycle Bin), có thể khôi phục lại. Chỉ khi dọn Thùng rác hoặc xoá bằng Shift+Delete thì tệp mới mất hẳn.' },
      { note: 'Quy tắc đặt tên: tên thư mục/tệp nên ngắn gọn, có ý nghĩa, tránh dấu cách thừa và ký tự đặc biệt để dễ tìm và tránh lỗi khi chia sẻ.' },
    ],
    examples: [
      { q: 'Em lỡ xoá tệp "bai-tap-toan.docx". Làm sao lấy lại?', a: 'Mở Thùng rác (Recycle Bin) trên màn hình nền, tìm tệp "bai-tap-toan.docx", bấm phải chuột chọn Restore (Khôi phục). Tệp sẽ trở về đúng vị trí cũ. Lưu ý: nếu đã dọn Thùng rác thì cách này không còn hiệu lực.' },
      { q: 'Cho đường dẫn C:\\Users\\HS\\Documents\\baitap.docx. Hãy cho biết đây là đường dẫn loại nào và tệp nằm ở đâu?', a: 'Đây là đường dẫn tuyệt đối (bắt đầu từ ổ đĩa C:). Tệp baitap.docx nằm trong thư mục Documents, thuộc thư mục HS, thuộc thư mục Users trên ổ đĩa C:.' },
    ],
  },

  'H11TIN-w03-quiz': {
    topic: 'Phần mềm nguồn mở và phần mềm chạy trên Internet',
    intro: 'Chào các em! Có những phần mềm phải mua bản quyền đắt tiền, nhưng cũng có vô số phần mềm miễn phí mà ai cũng được xem và sửa mã nguồn. Tuần này ta tìm hiểu hai xu hướng quan trọng: phần mềm nguồn mở và phần mềm chạy trên Internet.',
    objectives: [
      'Hiểu khái niệm phần mềm nguồn mở và ưu điểm của nó.',
      'Phân biệt phần mềm cài đặt cục bộ với phần mềm chạy trên Internet (web app).',
      'Nêu được ví dụ và lựa chọn phần mềm phù hợp với nhu cầu.',
    ],
    theory: [
      { h: 'Phần mềm nguồn mở (Open Source)' },
      { p: 'Phần mềm nguồn mở là phần mềm công khai mã nguồn, cho phép người dùng tự do xem, chỉnh sửa và phân phối lại theo điều khoản của giấy phép (ví dụ giấy phép GPL).' },
      { ul: [
        'Ví dụ: hệ điều hành Linux, bộ văn phòng LibreOffice, trình duyệt Firefox, phần mềm ảnh GIMP.',
        'Ưu điểm: thường miễn phí hoặc giá thấp, có cộng đồng hỗ trợ, có thể tuỳ biến theo nhu cầu.',
        'Đối lập là phần mềm độc quyền (proprietary): mã nguồn đóng, ví dụ Microsoft Office, Adobe Photoshop.',
      ] },
      { h: 'Phần mềm chạy trên Internet (Web App / SaaS)' },
      { p: 'Đây là phần mềm chạy trực tiếp trên trình duyệt qua Internet, không cần cài đặt vào máy. Ví dụ: Google Docs, Office 365 Online, Canva web.' },
      { ul: [
        'Ưu điểm: không cần cài đặt, truy cập mọi nơi có Internet, dễ cộng tác thời gian thực, tự động cập nhật.',
        'Hạn chế: cần kết nối mạng, dữ liệu phụ thuộc nhà cung cấp.',
      ] },
      { h: 'Chọn phần mềm thế nào?' },
      { p: 'Hãy cân nhắc: nhu cầu công việc, chi phí, bản quyền, có cần làm việc offline hay cộng tác nhiều người. Ưu tiên phần mềm hợp pháp; không dùng phần mềm bẻ khoá (crack) vì vi phạm bản quyền và tiềm ẩn mã độc.' },
      { note: 'Giấy phép GPL là một trong những giấy phép nguồn mở phổ biến nhất, buộc các bản phái sinh cũng phải giữ tính nguồn mở.' },
    ],
    examples: [
      { q: 'Một bạn cần soạn văn bản nhưng không có tiền mua Microsoft Office. Em tư vấn giải pháp nào?', a: 'Có hai hướng: (1) Dùng phần mềm nguồn mở miễn phí LibreOffice Writer cài vào máy; (2) Dùng phần mềm chạy trên Internet như Google Docs, chỉ cần trình duyệt và tài khoản. Cả hai đều hợp pháp, miễn phí và mở/lưu được định dạng .docx.' },
      { q: 'Vì sao Google Docs phù hợp cho nhóm làm bài tập chung hơn là Word cài cục bộ?', a: 'Google Docs chạy trên Internet, cho phép nhiều người cùng mở và chỉnh sửa một tài liệu theo thời gian thực, thấy được thay đổi của nhau, tự lưu và đồng bộ. Word cài cục bộ khó cộng tác như vậy nếu không qua dịch vụ chia sẻ riêng.' },
    ],
  },

  'H11TIN-w04-quiz': {
    topic: 'Bên trong máy tính',
    intro: 'Các em ơi! Đã bao giờ các em tò mò bên trong thùng máy tính có gì chưa? Tuần này ta "mở nắp" để xem các bộ phận chính: CPU, RAM, ROM, ổ cứng, card đồ hoạ — và hiểu chúng phối hợp ra sao.',
    objectives: [
      'Nêu được chức năng của CPU, RAM, ROM và phân biệt chúng.',
      'Hiểu các đơn vị đo dung lượng và tốc độ xử lý.',
      'Nhận biết vai trò của card đồ hoạ và các thành phần khác.',
    ],
    theory: [
      { h: 'CPU — Bộ xử lý trung tâm' },
      { p: 'CPU (Central Processing Unit) là "bộ não" thực hiện các lệnh và phép tính. Tốc độ CPU đo bằng Hertz, thường là GHz (tỉ chu kỳ mỗi giây). CPU nhiều nhân (core) xử lý nhiều việc song song tốt hơn.' },
      { h: 'Bộ nhớ: RAM và ROM' },
      { ul: [
        'RAM (Random Access Memory): bộ nhớ truy cập ngẫu nhiên, lưu tạm dữ liệu và chương trình khi máy đang chạy. RAM "bay hơi" — mất hết khi tắt máy.',
        'ROM (Read Only Memory): bộ nhớ chỉ đọc, lưu firmware khởi động. ROM giữ thông tin vĩnh viễn ngay cả khi tắt máy.',
        'Ổ cứng (HDD/SSD): bộ nhớ ngoài, lưu trữ dữ liệu lâu dài (hệ điều hành, tệp, phần mềm).',
      ] },
      { h: 'Đơn vị đo dung lượng' },
      { p: 'Bit là đơn vị nhỏ nhất; 8 bit = 1 byte (B). Tăng dần: KB < MB < GB < TB (mỗi bậc gấp 1024 lần). Ví dụ 1 MB = 1024 KB.' },
      { h: 'Card đồ hoạ và thành phần khác' },
      { p: 'GPU (Graphics Processing Unit) chuyên xử lý hình ảnh, video, đồ hoạ 3D, rất quan trọng với game và dựng phim. Ngoài ra còn có bo mạch chủ (mainboard) liên kết mọi linh kiện, và bộ nguồn (PSU) cấp điện.' },
      { note: 'Hãy nhớ điểm khác biệt cốt lõi: RAM nhanh nhưng bay hơi (lưu tạm khi chạy), ổ cứng chậm hơn nhưng lưu lâu dài.' },
    ],
    examples: [
      { q: 'Vì sao khi đang soạn văn bản chưa lưu mà mất điện đột ngột thì có thể mất bài?', a: 'Vì khi soạn thảo, văn bản đang nằm trong RAM — bộ nhớ tạm bay hơi. Khi mất điện, RAM mất sạch nội dung. Chỉ khi em bấm Save, dữ liệu mới được ghi xuống ổ cứng (lưu lâu dài). Vì vậy nên lưu thường xuyên.' },
      { q: 'Sắp xếp các đơn vị KB, TB, MB, GB theo thứ tự tăng dần và giải thích.', a: 'Thứ tự tăng dần: KB < MB < GB < TB. Mỗi bậc lớn gấp 1024 lần bậc dưới (1 MB ≈ 1024 KB, 1 GB ≈ 1024 MB, 1 TB ≈ 1024 GB). TB là lớn nhất.' },
    ],
  },

  'H11TIN-w05-quiz': {
    topic: 'Kết nối thiết bị số',
    intro: 'Chào các em! Máy tính, điện thoại, tai nghe, máy in… ngày nay kết nối với nhau bằng đủ loại cổng và sóng không dây. Tuần này ta tìm hiểu các chuẩn kết nối phổ biến: USB, Bluetooth, Wi-Fi, HDMI, NFC.',
    objectives: [
      'Nhận biết và phân biệt các cổng kết nối có dây thông dụng.',
      'Hiểu các chuẩn kết nối không dây: Wi-Fi, Bluetooth, NFC.',
      'Chọn được chuẩn kết nối phù hợp cho từng tình huống.',
    ],
    theory: [
      { h: 'Kết nối có dây' },
      { ul: [
        'USB (Universal Serial Bus): cổng phổ biến nhất, kết nối chuột, bàn phím, USB nhớ, ổ cứng ngoài; vừa truyền dữ liệu vừa sạc điện.',
        'HDMI: truyền tín hiệu hình ảnh và âm thanh số chất lượng cao tới màn hình, tivi, máy chiếu.',
        'Cổng mạng (Ethernet/RJ45): kết nối mạng LAN có dây, ổn định.',
      ] },
      { h: 'Kết nối không dây' },
      { ul: [
        'Wi-Fi: kết nối mạng không dây qua điểm phát (Access Point), phạm vi trong nhà/cơ quan.',
        'Bluetooth: kết nối không dây cự ly ngắn (~10m) giữa các thiết bị như tai nghe, loa, chuột.',
        'NFC (Near Field Communication): giao tiếp tầm rất gần (vài cm), dùng cho thanh toán, ghép cặp nhanh.',
      ] },
      { h: 'Chọn chuẩn kết nối phù hợp' },
      { p: 'Tùy mục đích: nối điện thoại với tivi để chiếu phim dùng HDMI (qua cáp) hoặc kết nối không dây; đeo tai nghe không dây dùng Bluetooth; chạm thẻ thanh toán dùng NFC; truyền tệp lớn ổn định dùng USB hoặc mạng có dây.' },
      { note: 'Khi cắm điện thoại vào máy tính bằng cáp USB, ta có thể vừa sạc vừa truyền dữ liệu (ảnh, video, tệp) — nhớ chọn chế độ "Truyền tệp" trên điện thoại.' },
    ],
    examples: [
      { q: 'Em muốn chiếu bài thuyết trình từ laptop lên máy chiếu trong lớp. Nên dùng cổng nào?', a: 'Dùng cổng HDMI: cắm cáp HDMI từ laptop sang máy chiếu để truyền cả hình ảnh và âm thanh số chất lượng cao. Nếu máy chiếu cũ chỉ có cổng VGA thì cần thêm bộ chuyển đổi (adapter).' },
      { q: 'So sánh Bluetooth và Wi-Fi về phạm vi và mục đích sử dụng.', a: 'Bluetooth: cự ly ngắn (~10m), dùng để nối thiết bị cá nhân như tai nghe, loa, chuột không dây. Wi-Fi: phạm vi rộng hơn (cả phòng/nhà), dùng để kết nối mạng Internet không dây cho nhiều thiết bị qua điểm phát.' },
    ],
  },

  'H11TIN-w06-quiz': {
    topic: 'Lưu trữ tệp trên Internet',
    intro: 'Các em thân mến! Thay vì chỉ lưu tệp trong máy, ngày nay ta có thể lưu trên "đám mây" để truy cập mọi nơi. Tuần này ta tìm hiểu lưu trữ đám mây (cloud storage): cách dùng, chia sẻ, đồng bộ và bảo mật.',
    objectives: [
      'Hiểu khái niệm và ưu điểm của lưu trữ đám mây.',
      'Biết cách chia sẻ tệp với các mức quyền khác nhau.',
      'Nắm nguyên tắc đồng bộ và bảo mật tệp trên cloud.',
    ],
    theory: [
      { h: 'Lưu trữ đám mây là gì?' },
      { p: 'Lưu trữ đám mây (cloud storage) là dịch vụ lưu tệp trên máy chủ qua Internet. Ví dụ: Google Drive, OneDrive, Dropbox, iCloud.' },
      { h: 'Ưu điểm' },
      { ul: [
        'Truy cập tệp từ mọi nơi, trên nhiều thiết bị;',
        'Đồng bộ tự động hai chiều giữa thiết bị và đám mây;',
        'Sao lưu an toàn — không mất dữ liệu khi hỏng máy cá nhân;',
        'Dễ chia sẻ và cộng tác.',
      ] },
      { h: 'Chia sẻ và phân quyền' },
      { p: 'Khi chia sẻ tệp, ta đặt mức quyền: "Chỉ xem" (người nhận xem nhưng không sửa), "Có thể bình luận", hoặc "Có thể chỉnh sửa". Chỉ chia sẻ công khai khi thực sự cần.' },
      { h: 'Bảo mật và thùng rác' },
      { p: 'Để bảo vệ tệp trên cloud: đặt mật khẩu mạnh, bật xác thực 2 lớp, hạn chế chia sẻ công khai. Khi xoá tệp (ví dụ Google Drive), tệp vào thùng rác khoảng 30 ngày trước khi mất hẳn — vẫn có thể khôi phục trong thời gian đó.' },
      { note: 'Đồng bộ (sync) khác với tải lên một lần: đồng bộ cập nhật hai chiều, mọi thay đổi ở thiết bị hay đám mây đều phản ánh sang nhau.' },
    ],
    examples: [
      { q: 'Em muốn gửi bài tập nhóm cho 3 bạn cùng chỉnh sửa, nhưng không cho người ngoài sửa. Làm thế nào trên Google Drive?', a: 'Tải tệp lên Drive, bấm Share (Chia sẻ), nhập email của 3 bạn và đặt quyền "Editor" (Có thể chỉnh sửa) cho riêng họ. Không bật chế độ "Bất kỳ ai có liên kết được sửa". Như vậy chỉ 3 bạn được mời mới chỉnh sửa được.' },
      { q: 'Bạn em lỡ xoá một tệp quan trọng trên Google Drive hôm qua. Cứu được không?', a: 'Được, miễn là chưa quá 30 ngày và chưa dọn thùng rác. Vào mục Trash/Thùng rác trên Drive, tìm tệp, bấm phải chọn Restore (Khôi phục). Tệp sẽ trở về vị trí cũ.' },
    ],
  },

  'H11TIN-w07-quiz': {
    topic: 'Thực hành tìm kiếm thông tin trên Internet',
    intro: 'Chào các em! Internet là kho tri thức khổng lồ, nhưng tìm đúng và đánh giá đúng thông tin lại là một kỹ năng. Tuần này ta học cách tìm kiếm hiệu quả và quan trọng hơn — đánh giá độ tin cậy của nguồn.',
    objectives: [
      'Đặt được từ khoá tìm kiếm hiệu quả.',
      'Sử dụng các toán tử tìm kiếm nâng cao trên Google.',
      'Đánh giá được độ tin cậy của một nguồn thông tin.',
    ],
    theory: [
      { h: 'Đặt từ khoá tốt' },
      { p: 'Từ khoá nên ngắn gọn, đúng chủ đề, dùng thuật ngữ chuyên biệt. Tránh viết cả câu dài lan man hay sai chính tả.' },
      { h: 'Toán tử tìm kiếm nâng cao trên Google' },
      { ul: [
        'Dấu ngoặc kép "..." : tìm chính xác cụm từ theo đúng thứ tự;',
        'Dấu trừ -từ : loại bỏ kết quả chứa từ đó;',
        'site:tenmien : giới hạn kết quả trong một trang web, ví dụ site:moet.gov.vn;',
        'filetype:pdf : chỉ tìm tệp PDF.',
      ] },
      { h: 'Đánh giá độ tin cậy của nguồn' },
      { p: 'Một thông tin đáng tin cần xét: tác giả là ai, đăng ngày nào, có dẫn nguồn không, và đối chiếu với nhiều nguồn khác. Ưu tiên trang chính thống (cơ quan nhà nước .gov.vn, tổ chức giáo dục, báo uy tín).' },
      { p: 'Wikipedia là nguồn tham khảo khởi điểm tốt, nhưng không nên trích nguyên văn vào báo cáo khoa học — hãy truy ngược về nguồn gốc mà bài viết dẫn ra.' },
      { note: 'Tư duy phản biện: gặp tin giật gân, hãy tự hỏi "ai nói? dựa vào đâu? có nguồn nào khác xác nhận không?" trước khi tin và chia sẻ.' },
    ],
    examples: [
      { q: 'Em chỉ muốn tìm thông tin về kỳ thi tốt nghiệp THPT trên trang của Bộ Giáo dục. Viết truy vấn thế nào?', a: 'Dùng toán tử site: để giới hạn nguồn, ví dụ: thi tốt nghiệp THPT site:moet.gov.vn. Như vậy Google chỉ trả về các trang thuộc moet.gov.vn — nguồn chính thống đáng tin.' },
      { q: 'Em đọc một bài blog nói "ăn trứng gây hại tim mạch". Có nên tin ngay không? Vì sao?', a: 'Không nên tin ngay. Cần kiểm tra: tác giả có chuyên môn y khoa không, bài có dẫn nghiên cứu khoa học không, đăng khi nào, và đối chiếu với các nguồn y tế uy tín khác. Một bài blog không nguồn không đủ tin cậy để kết luận.' },
    ],
  },

  'H11TIN-w08-quiz': {
    topic: 'Thực hành nâng cao thư điện tử và mạng xã hội',
    intro: 'Các em ơi! Email và mạng xã hội là công cụ giao tiếp hằng ngày. Tuần này ta học cách dùng chúng chuyên nghiệp, lịch sự và an toàn — từ mẹo To/Cc/Bcc đến văn hoá ứng xử trực tuyến.',
    objectives: [
      'Phân biệt và dùng đúng các ô To, Cc, Bcc khi gửi email.',
      'Biết quy tắc gửi email chuyên nghiệp, tránh bị coi là spam.',
      'Ứng xử văn minh và bảo vệ tài khoản trên mạng xã hội.',
    ],
    theory: [
      { h: 'To, Cc và Bcc' },
      { ul: [
        'To: người nhận chính, cần phản hồi/hành động;',
        'Cc (Carbon copy): người cần biết để theo dõi, không bắt buộc trả lời;',
        'Bcc (Blind carbon copy): gửi đồng thời cho nhiều người mà họ KHÔNG thấy địa chỉ của nhau — bảo vệ riêng tư khi gửi tập thể.',
      ] },
      { h: 'Tệp đính kèm và tránh spam' },
      { p: 'Tệp đính kèm (attachment) có giới hạn dung lượng tuỳ nhà cung cấp, ví dụ Gmail tối đa khoảng 25 MB; tệp lớn hơn nên gửi qua Google Drive. Để không bị coi là thư rác: tiêu đề rõ ràng, nội dung phù hợp, dùng Bcc khi gửi tập thể, không lạm dụng dấu chấm than.' },
      { h: 'Văn hoá mạng xã hội' },
      { ul: [
        'Đăng nội dung lịch sự, không vi phạm pháp luật và quyền riêng tư của người khác;',
        'Không đăng đời tư người khác khi chưa được phép, không lan truyền tin giả;',
        'Khi bị tag vào bài không mong muốn: gỡ thẻ, báo cáo, hoặc bật chế độ duyệt thẻ trước khi hiển thị.',
      ] },
      { h: 'Bảo vệ tài khoản' },
      { p: 'Dùng mật khẩu mạnh, bật xác thực 2 lớp, không bấm vào link lạ, không dùng chung một mật khẩu cho mọi tài khoản.' },
      { note: 'Một email chuyên nghiệp luôn có: tiêu đề rõ ràng, lời chào, nội dung mạch lạc, lời cảm ơn và chữ ký.' },
    ],
    examples: [
      { q: 'Lớp trưởng cần gửi thông báo cho cả 40 bạn nhưng không muốn lộ email của từng người. Nên làm sao?', a: 'Đưa địa chỉ của chính mình (hoặc giáo viên) vào ô To, rồi đưa toàn bộ 40 email vào ô Bcc. Nhờ Bcc, mỗi người nhận chỉ thấy email của mình, không thấy danh sách 40 người kia — bảo vệ riêng tư và tránh trả lời tràn lan.' },
      { q: 'Em bị một bạn tag vào tấm ảnh chế không hay. Em xử lý thế nào cho văn minh?', a: 'Bình tĩnh: gỡ thẻ (untag) khỏi ảnh để nó không hiện trên trang cá nhân của em; nếu nội dung xúc phạm thì báo cáo (report) bài; có thể bật chế độ "duyệt thẻ trước khi hiển thị" để chủ động hơn về sau. Không nên đăng bài trả thù.' },
    ],
  },

  'H11TIN-w09-quiz': {
    topic: 'Giao tiếp an toàn trên Internet',
    intro: 'Chào các em! Không gian mạng tiện lợi nhưng cũng nhiều cạm bẫy: lừa đảo, tin giả, đánh cắp dữ liệu. Tuần này ta học cách giao tiếp an toàn, nhận diện rủi ro và tôn trọng pháp luật, bản quyền trên mạng.',
    objectives: [
      'Nhận diện các hành vi vi phạm và rủi ro trên không gian mạng.',
      'Hiểu lừa đảo trực tuyến (phishing) và cách phòng tránh.',
      'Tôn trọng pháp luật về an ninh mạng và bản quyền.',
    ],
    theory: [
      { h: 'Hành vi vi phạm trên mạng' },
      { p: 'Phát tán tin giả, xúc phạm danh dự, lừa đảo, đánh cắp dữ liệu, phát tán mã độc… đều là hành vi vi phạm đạo đức và pháp luật, có thể bị xử lý.' },
      { h: 'Lừa đảo trực tuyến (Phishing)' },
      { p: 'Phishing là việc giả mạo trang web, email, tin nhắn để dụ người dùng nhập tài khoản, mật khẩu, mã OTP hoặc chuyển tiền. Dấu hiệu thường gặp: thông báo "trúng thưởng", giục gấp, đường link lạ, yêu cầu cung cấp thông tin nhạy cảm.' },
      { ul: [
        'Không nhập OTP, không chuyển tiền theo yêu cầu của tin nhắn/cuộc gọi lạ;',
        'Kiểm tra kỹ địa chỉ trang web, gọi đến số chính thức để xác minh;',
        'Báo người lớn hoặc cơ quan chức năng khi nghi ngờ.',
      ] },
      { h: 'Pháp luật và bản quyền' },
      { p: 'Luật An ninh mạng Việt Nam (ban hành 2018, có hiệu lực từ 01/01/2019) quy định hành vi được phép và bị cấm trên không gian mạng. Bản quyền tác giả bảo vệ các sản phẩm sáng tạo: văn bản, ảnh, video, phần mềm…' },
      { note: 'Khi dùng ảnh/nhạc/video trên Internet cho bài học, hãy kiểm tra giấy phép, ghi nguồn, ưu tiên tài nguyên CC0/Creative Commons; không cắt logo hay xoá tên tác giả.' },
    ],
    examples: [
      { q: 'Em nhận tin nhắn: "Chúc mừng bạn trúng iPhone! Nhập mã OTP vừa gửi để nhận quà." Em làm gì?', a: 'Đây là dấu hiệu lừa đảo (phishing) điển hình. Tuyệt đối KHÔNG nhập OTP — mã OTP là chìa khoá vào tài khoản/ngân hàng của em. Không bấm link, không chuyển tiền. Báo cho người lớn và có thể chặn, báo cáo số gửi. Không có chuyện tự nhiên trúng thưởng như vậy.' },
      { q: 'Em muốn dùng một bức ảnh đẹp trên mạng cho báo cáo. Cần lưu ý gì?', a: 'Phải tôn trọng bản quyền: kiểm tra ảnh có giấy phép cho phép dùng không. Nên chọn ảnh có giấy phép Creative Commons hoặc CC0 (miễn phí dùng), và ghi nguồn/tác giả nếu giấy phép yêu cầu. Không tự ý lấy ảnh có bản quyền, không xoá watermark/tên tác giả.' },
    ],
  },

  'H11TIN-w10-quiz': {
    topic: 'Lưu trữ dữ liệu và khai thác thông tin phục vụ quản lý',
    intro: 'Các em thân mến! Mọi tổ chức — trường học, ngân hàng, bệnh viện — đều phải lưu trữ và khai thác dữ liệu để quản lý. Tuần này ta phân biệt dữ liệu với thông tin, và hiểu vì sao cần đến cơ sở dữ liệu.',
    objectives: [
      'Phân biệt dữ liệu (data) và thông tin (information).',
      'Hiểu hạn chế của bảng tính và lợi ích của cơ sở dữ liệu cho dữ liệu lớn.',
      'Nắm khái niệm khai thác thông tin phục vụ quản lý.',
    ],
    theory: [
      { h: 'Dữ liệu và thông tin' },
      { p: 'Dữ liệu (data) là các sự kiện, con số thô chưa qua xử lý. Thông tin (information) là dữ liệu đã được xử lý, tổ chức để có ý nghĩa và phục vụ ra quyết định. Ví dụ: "8, 9, 7" là dữ liệu; "điểm trung bình môn Toán của lớp là 8,0" là thông tin.' },
      { h: 'Khi nào dùng bảng tính, khi nào dùng CSDL?' },
      { ul: [
        'Bảng tính (Excel) phù hợp với dữ liệu nhỏ, vài chục đến vài trăm bản ghi, tính toán đơn giản;',
        'Khi dữ liệu lớn (hàng nghìn/triệu bản ghi), cần nhiều người truy cập đồng thời, truy vấn phức tạp → cần Hệ Cơ sở dữ liệu (Database).',
      ] },
      { h: 'Khai thác thông tin phục vụ quản lý' },
      { p: 'Khai thác thông tin (information retrieval) là việc truy xuất, tổng hợp, phân tích dữ liệu để ra quyết định. Kết quả thường được trình bày dưới dạng báo cáo (report) — bản tổng hợp dễ đọc của một truy vấn.' },
      { h: 'Lợi ích của lưu trữ tập trung' },
      { p: 'So với việc mỗi người giữ một tệp riêng, lưu trữ tập trung trong CSDL giúp: tránh trùng lặp, đảm bảo nhất quán (một nguồn dữ liệu duy nhất), dễ phân quyền và bảo mật.' },
      { note: 'Hãy ghi nhớ chuỗi giá trị: Dữ liệu → (xử lý) → Thông tin → (phân tích) → Tri thức → Quyết định.' },
    ],
    examples: [
      { q: 'Trường có 1500 học sinh, cần quản lý điểm, học bạ, học phí với nhiều người cùng nhập liệu. Nên dùng Excel hay CSDL? Vì sao?', a: 'Nên dùng Hệ cơ sở dữ liệu. Với 1500 học sinh và nhiều người nhập liệu đồng thời, Excel dễ bị xung đột, trùng lặp, khó truy vấn liên kết (điểm-học bạ-học phí). CSDL đảm bảo nhất quán, phân quyền, truy vấn phức tạp và nhiều người dùng đồng thời an toàn.' },
      { q: 'Cho dãy số 6, 7, 8, 9, 10. Đâu là dữ liệu, đâu là thông tin?', a: 'Dãy "6, 7, 8, 9, 10" là dữ liệu thô (các điểm số). Khi xử lý thành "điểm trung bình là 8,0; cao nhất là 10" thì đó là thông tin — đã có ý nghĩa, dùng được để đánh giá.' },
    ],
  },

  'H11TIN-w11-quiz': {
    topic: 'Cơ sở dữ liệu',
    intro: 'Chào các em! Tuần này ta bước vào thế giới cơ sở dữ liệu (CSDL) — nền tảng của mọi hệ thống quản lý hiện đại. Ta sẽ hiểu CSDL là gì, có tính chất gì và được tổ chức ra sao.',
    objectives: [
      'Hiểu khái niệm cơ sở dữ liệu và các tính chất quan trọng.',
      'Phân biệt các mô hình tổ chức dữ liệu (phân cấp, quan hệ).',
      'Nắm mục tiêu thiết kế CSDL và cách người dùng tương tác.',
    ],
    theory: [
      { h: 'Cơ sở dữ liệu là gì?' },
      { p: 'Cơ sở dữ liệu (Database) là tập hợp dữ liệu có cấu trúc, được tổ chức để lưu trữ và khai thác hiệu quả, phục vụ nhiều người dùng và nhiều ứng dụng.' },
      { h: 'Các tính chất quan trọng' },
      { ul: [
        'Tính toàn vẹn: dữ liệu chính xác, tuân thủ ràng buộc;',
        'Tính nhất quán: không mâu thuẫn giữa các phần dữ liệu;',
        'Tính bảo mật: kiểm soát ai được truy cập gì;',
        'Tính độc lập dữ liệu: thay đổi cấu trúc lưu trữ không ảnh hưởng ứng dụng.',
      ] },
      { h: 'Các mô hình tổ chức dữ liệu' },
      { ul: [
        'Mô hình phân cấp: dữ liệu tổ chức theo hình cây (quan hệ cha - con);',
        'Mô hình quan hệ: dữ liệu tổ chức theo các bảng (table) gồm hàng và cột — phổ biến nhất hiện nay.',
      ] },
      { h: 'Mục tiêu thiết kế CSDL' },
      { p: 'Thiết kế tốt nhằm: giảm dư thừa dữ liệu, đảm bảo toàn vẹn, dễ truy vấn và dễ mở rộng. Người dùng cuối thường không thao tác trực tiếp với dữ liệu mà qua ứng dụng/giao diện (biểu mẫu, báo cáo).' },
      { note: 'Một CSDL tốt là "một nguồn sự thật duy nhất" (single source of truth): mọi người cùng dùng một dữ liệu nhất quán, không ai có bản riêng khác nhau.' },
    ],
    examples: [
      { q: 'Vì sao nói cơ sở dữ liệu giúp giảm dư thừa dữ liệu?', a: 'Vì dữ liệu được lưu tập trung, tổ chức hợp lý và liên kết qua khoá. Thay vì mỗi tệp/bộ phận lưu lại cùng một thông tin (ví dụ tên học sinh lặp ở nhiều nơi), CSDL lưu một lần và tham chiếu đến, nhờ đó tránh trùng lặp và giữ nhất quán khi cập nhật.' },
      { q: 'Mô hình quan hệ tổ chức dữ liệu theo cách nào? Cho ví dụ.', a: 'Mô hình quan hệ tổ chức dữ liệu thành các bảng gồm hàng (bản ghi) và cột (thuộc tính). Ví dụ bảng HOC_SINH có các cột MaHS, HoTen, NgaySinh, Lop; mỗi hàng là một học sinh cụ thể.' },
    ],
  },

  'H11TIN-w12-quiz': {
    topic: 'Hệ quản trị cơ sở dữ liệu và hệ CSDL',
    intro: 'Các em ơi! Có CSDL rồi thì ai quản lý, tạo lập và khai thác nó? Đó là nhiệm vụ của Hệ quản trị cơ sở dữ liệu. Tuần này ta tìm hiểu DBMS, hệ CSDL và vai trò người quản trị.',
    objectives: [
      'Hiểu khái niệm hệ quản trị cơ sở dữ liệu (DBMS) và nêu ví dụ.',
      'Phân biệt các thành phần của một hệ CSDL.',
      'Nắm vai trò người quản trị CSDL và cơ chế đảm bảo nhất quán.',
    ],
    theory: [
      { h: 'Hệ quản trị cơ sở dữ liệu (DBMS)' },
      { p: 'Hệ quản trị cơ sở dữ liệu (Database Management System - DBMS) là phần mềm cho phép tạo lập, lưu trữ, cập nhật và khai thác CSDL. DBMS đứng giữa người dùng/ứng dụng và dữ liệu.' },
      { ul: [
        'Ví dụ phổ biến: MySQL, PostgreSQL, MS Access, Oracle, SQL Server, SQLite.',
      ] },
      { h: 'Hệ cơ sở dữ liệu (Database System)' },
      { p: 'Một hệ CSDL hoàn chỉnh gồm bốn thành phần: CSDL (dữ liệu) + DBMS (phần mềm quản lý) + con người (người dùng, người quản trị) + phần cứng/mạng.' },
      { h: 'Người quản trị CSDL (DBA)' },
      { p: 'DBA (Database Administrator) chịu trách nhiệm thiết kế, vận hành, bảo trì, sao lưu và phân quyền CSDL. Sao lưu (backup) giúp phục hồi dữ liệu khi gặp sự cố như hỏng đĩa, lỗi người dùng, mã độc.' },
      { h: 'Đảm bảo nhất quán khi nhiều người dùng' },
      { p: 'Khi nhiều người cùng cập nhật, DBMS dùng cơ chế giao tác (transaction) và khoá (lock) để đảm bảo dữ liệu nhất quán, tránh ghi đè sai lẫn nhau.' },
      { note: 'Phân biệt: CSDL là "kho dữ liệu", còn DBMS là "phần mềm quản kho". Hai khái niệm khác nhau nhưng luôn đi cùng nhau.' },
    ],
    examples: [
      { q: 'Hãy chỉ ra bốn thành phần của hệ CSDL ở một trường học quản lý điểm bằng phần mềm.', a: 'CSDL: dữ liệu học sinh, điểm, lớp. DBMS: phần mềm quản trị (ví dụ MySQL/SQL Server) lưu và truy vấn dữ liệu. Con người: giáo viên nhập điểm, quản trị viên hệ thống. Phần cứng/mạng: máy chủ chạy DBMS và mạng để các máy truy cập.' },
      { q: 'Hai giáo viên cùng lúc sửa điểm của một học sinh. DBMS xử lý thế nào để không sai dữ liệu?', a: 'DBMS dùng cơ chế giao tác (transaction) và khoá (lock): khi một giao tác đang cập nhật bản ghi, nó khoá bản ghi đó; giao tác kia phải chờ đến lượt. Nhờ vậy hai thao tác không ghi đè lẫn nhau và dữ liệu giữ được nhất quán.' },
    ],
  },

  'H11TIN-w13-quiz': {
    topic: 'Cơ sở dữ liệu quan hệ',
    intro: 'Chào các em! Mô hình quan hệ là mô hình CSDL phổ biến nhất. Tuần này ta đi sâu: bảng, khoá chính, khoá ngoài, các loại quan hệ và chuẩn hoá — nền tảng để thiết kế CSDL đúng đắn.',
    objectives: [
      'Hiểu cấu trúc của bảng quan hệ: hàng, cột, bản ghi, thuộc tính.',
      'Phân biệt khoá chính và khoá ngoài, nhận biết các loại quan hệ.',
      'Nắm khái niệm ràng buộc toàn vẹn và chuẩn hoá.',
    ],
    theory: [
      { h: 'Cấu trúc bảng quan hệ' },
      { p: 'Một bảng (table/relation) gồm các hàng (bản ghi - record) và các cột (trường/thuộc tính - field). Mỗi hàng mô tả một đối tượng; mỗi cột mô tả một đặc điểm của đối tượng.' },
      { h: 'Khoá chính và khoá ngoài' },
      { ul: [
        'Khoá chính (Primary Key - PK): một trường (hoặc nhóm trường) định danh duy nhất mỗi bản ghi; phải duy nhất và khác NULL.',
        'Khoá ngoài (Foreign Key - FK): trường liên kết bản ghi giữa hai bảng, bằng cách tham chiếu đến khoá chính của bảng khác.',
      ] },
      { h: 'Các loại quan hệ' },
      { p: 'Quan hệ giữa hai bảng có thể là một-một (1-1), một-nhiều (1-n), hoặc nhiều-nhiều (n-n). Ví dụ: nhiều học sinh thuộc một lớp → quan hệ một-nhiều giữa LOP và HOC_SINH.' },
      { h: 'Ràng buộc toàn vẹn và chuẩn hoá' },
      { ul: [
        'Ràng buộc toàn vẹn thực thể: khoá chính phải duy nhất và khác NULL;',
        'Ràng buộc toàn vẹn tham chiếu: giá trị khoá ngoài phải tồn tại trong bảng được tham chiếu;',
        'Chuẩn hoá (normalization): tổ chức lại bảng để giảm dư thừa và phụ thuộc bất thường, tăng nhất quán.',
      ] },
      { note: 'Mẹo phân biệt: khoá chính nằm "trong nhà" để định danh; khoá ngoài là "cầu" nối sang bảng khác.' },
    ],
    examples: [
      { q: 'Cho hai bảng HOC_SINH(MaHS, HoTen, MaLop) và LOP(MaLop, TenLop). Hãy chỉ ra khoá chính, khoá ngoài và loại quan hệ.', a: 'Khoá chính của HOC_SINH là MaHS; khoá chính của LOP là MaLop. Trường MaLop trong HOC_SINH là khoá ngoài, tham chiếu LOP.MaLop. Quan hệ là một-nhiều: một lớp có nhiều học sinh, mỗi học sinh thuộc đúng một lớp.' },
      { q: 'Vì sao khoá chính không được phép có giá trị NULL?', a: 'Vì khoá chính dùng để định danh duy nhất mỗi bản ghi. Nếu cho phép NULL thì sẽ có bản ghi không có định danh, không thể phân biệt với bản ghi khác hay tham chiếu tới nó được — vi phạm ràng buộc toàn vẹn thực thể.' },
    ],
  },

  'H11TIN-w14-quiz': {
    topic: 'SQL — Ngôn ngữ truy vấn có cấu trúc',
    intro: 'Các em thân mến! Để "nói chuyện" với cơ sở dữ liệu, ta dùng SQL — ngôn ngữ truy vấn chuẩn. Tuần này ta học các câu lệnh cơ bản: SELECT, INSERT, UPDATE, DELETE và các hàm tổng hợp.',
    objectives: [
      'Hiểu SQL là gì và các nhóm lệnh chính.',
      'Viết được câu lệnh truy vấn SELECT với điều kiện WHERE.',
      'Sử dụng INSERT, DELETE và các hàm tổng hợp cơ bản.',
    ],
    theory: [
      { h: 'SQL là gì?' },
      { p: 'SQL (Structured Query Language - Ngôn ngữ truy vấn có cấu trúc) là ngôn ngữ chuẩn để thao tác với cơ sở dữ liệu quan hệ. Câu lệnh thường kết thúc bằng dấu chấm phẩy (;).' },
      { h: 'Truy vấn dữ liệu với SELECT' },
      { p: 'SELECT dùng để lấy dữ liệu. Dạng cơ bản: SELECT <cột> FROM <bảng> WHERE <điều kiện>;' },
      { ul: [
        'SELECT * FROM HocSinh; — lấy tất cả các cột của mọi học sinh;',
        'SELECT HoTen FROM HocSinh WHERE Lop = \'11A\'; — lấy họ tên các học sinh lớp 11A;',
        'Dấu * nghĩa là "mọi cột"; mệnh đề WHERE lọc bản ghi theo điều kiện.',
      ] },
      { h: 'Thêm, sửa, xoá dữ liệu' },
      { ul: [
        'INSERT INTO HocSinh(MaHS, HoTen) VALUES (\'HS01\', \'An\'); — thêm một bản ghi mới;',
        'UPDATE HocSinh SET Lop = \'11B\' WHERE MaHS = \'HS01\'; — cập nhật bản ghi;',
        'DELETE FROM HocSinh WHERE MaHS = \'HS01\'; — xoá bản ghi theo điều kiện.',
      ] },
      { h: 'Hàm tổng hợp' },
      { p: 'COUNT() đếm số bản ghi; SUM() tính tổng; AVG() tính trung bình; MAX(), MIN() tìm giá trị lớn/nhỏ nhất. Ví dụ: SELECT COUNT(*) FROM HocSinh WHERE Lop = \'11A\';' },
      { note: 'Cẩn thận với DELETE và UPDATE không có WHERE — chúng sẽ tác động lên TOÀN BỘ bảng. Luôn kiểm tra điều kiện trước khi chạy.' },
    ],
    examples: [
      { q: 'Viết câu lệnh SQL lấy họ tên và điểm trung bình của các học sinh lớp 11A.', a: 'SELECT HoTen, DiemTB FROM HocSinh WHERE Lop = \'11A\'; — Câu lệnh chọn hai cột HoTen và DiemTB, từ bảng HocSinh, chỉ lấy các hàng có Lop bằng \'11A\'.' },
      { q: 'Viết câu lệnh đếm xem lớp 11B có bao nhiêu học sinh.', a: 'SELECT COUNT(*) FROM HocSinh WHERE Lop = \'11B\'; — Hàm COUNT(*) đếm số bản ghi thoả điều kiện Lop = \'11B\', trả về tổng số học sinh của lớp đó.' },
    ],
  },

  'H11TIN-w15-quiz': {
    topic: 'Bảo mật và an toàn dữ liệu',
    intro: 'Chào các em! Dữ liệu là tài sản quý, nên bảo vệ nó là việc sống còn. Tuần này ta tìm hiểu bảo mật CSDL: phân quyền, mã hoá, mật khẩu mạnh, sao lưu và cảnh giác với mã độc như ransomware.',
    objectives: [
      'Hiểu mục tiêu của bảo mật dữ liệu.',
      'Nắm các biện pháp: phân quyền, mã hoá, mật khẩu mạnh, sao lưu.',
      'Nhận biết mối đe doạ ransomware và cách phòng tránh.',
    ],
    theory: [
      { h: 'Mục tiêu bảo mật dữ liệu' },
      { p: 'Bảo mật CSDL nhằm bảo vệ dữ liệu khỏi truy cập trái phép, sửa đổi và mất mát — giữ ba tính chất: bí mật, toàn vẹn và sẵn sàng.' },
      { h: 'Các biện pháp bảo vệ' },
      { ul: [
        'Phân quyền (authorization): cấp quyền truy cập theo vai trò người dùng, ai cần gì cấp nấy;',
        'Mã hoá (encryption): biến dữ liệu thành dạng không đọc được nếu không có khoá giải mã;',
        'Mật khẩu mạnh: dài, kết hợp chữ hoa/thường, số, ký tự đặc biệt, không trùng tên hay ngày sinh;',
        'Sao lưu định kỳ: chống mất dữ liệu do hỏng đĩa, lỗi người dùng, mã độc.',
      ] },
      { h: 'Ransomware và mã độc' },
      { p: 'Ransomware là mã độc mã hoá dữ liệu của nạn nhân rồi đòi tiền chuộc để mở khoá. Phòng tránh: không bấm link/đính kèm lạ, cập nhật phần mềm, và đặc biệt là sao lưu thường xuyên ở nơi tách biệt.' },
      { h: 'Quy tắc sao lưu 3-2-1' },
      { p: 'Giữ 3 bản sao dữ liệu, trên 2 loại phương tiện khác nhau, trong đó 1 bản ở nơi khác (cloud/ổ ngoài). Đây là nguyên tắc giúp an toàn trước hầu hết sự cố.' },
      { note: 'Sao lưu là tuyến phòng thủ cuối cùng trước ransomware: nếu có bản sao sạch, em chỉ cần khôi phục thay vì trả tiền chuộc.' },
    ],
    examples: [
      { q: 'Một mật khẩu "nguyen2008" có mạnh không? Hãy đề xuất cải thiện.', a: 'Không mạnh: nó là tên + năm sinh, dễ đoán và dễ bị dò. Cải thiện: dùng mật khẩu dài, không liên quan thông tin cá nhân, trộn chữ hoa/thường, số và ký tự đặc biệt, ví dụ một cụm từ vô nghĩa kèm ký tự như "Mua$Roi2k!Bay". Nên dùng kèm xác thực 2 lớp.' },
      { q: 'Máy của một cơ quan bị ransomware mã hoá toàn bộ dữ liệu và đòi tiền chuộc. Nhờ đâu họ vẫn khôi phục được mà không phải trả tiền?', a: 'Nhờ có sao lưu định kỳ và lưu ở nơi tách biệt (theo quy tắc 3-2-1). Họ chỉ cần làm sạch máy bị nhiễm rồi khôi phục dữ liệu từ bản sao lưu mới nhất, không cần và không nên trả tiền chuộc cho kẻ tấn công.' },
    ],
  },

  'H11TIN-w16-quiz': {
    topic: 'Nghề quản trị cơ sở dữ liệu (hướng nghiệp)',
    intro: 'Các em ơi! Dữ liệu ngày càng quan trọng nên các nghề liên quan đến dữ liệu rất "hot". Tuần này ta tìm hiểu nghề quản trị cơ sở dữ liệu (DBA) và hệ sinh thái nghề dữ liệu — biết đâu đó là con đường tương lai của em.',
    objectives: [
      'Hiểu công việc, kỹ năng và phẩm chất của người quản trị CSDL.',
      'Biết môi trường làm việc và ngành học liên quan.',
      'Nhận biết các nghề khác trong lĩnh vực dữ liệu.',
    ],
    theory: [
      { h: 'Người quản trị cơ sở dữ liệu (DBA)' },
      { p: 'DBA (Database Administrator) là người thiết kế, vận hành và bảo trì hệ CSDL của một tổ chức, đảm bảo dữ liệu an toàn, sẵn sàng và hiệu quả.' },
      { h: 'Kỹ năng và phẩm chất cần có' },
      { ul: [
        'Kỹ năng: thiết kế CSDL, thành thạo SQL, bảo mật, sao lưu/khôi phục, hiểu nghiệp vụ;',
        'Phẩm chất: cẩn thận, trung thực, có trách nhiệm cao với dữ liệu, ham học hỏi.',
      ] },
      { h: 'Môi trường làm việc' },
      { p: 'DBA cần ở bất cứ nơi nào có nhiều dữ liệu: ngân hàng, doanh nghiệp, bệnh viện, cơ quan nhà nước, công ty công nghệ. Ngành học liên quan: Khoa học máy tính, Công nghệ thông tin, Hệ thống thông tin.' },
      { h: 'Hệ sinh thái nghề dữ liệu' },
      { p: 'Ngoài DBA, lĩnh vực dữ liệu còn nhiều nghề: Data Engineer (kỹ sư dữ liệu), Data Analyst (phân tích dữ liệu), Data Scientist (khoa học dữ liệu), BI Engineer (kỹ sư trí tuệ doanh nghiệp).' },
      { note: 'Để chuẩn bị, ngay từ bây giờ hãy học chắc Toán, Tin, ngoại ngữ; luyện SQL và làm vài dự án CSDL nhỏ để có sản phẩm thực tế.' },
    ],
    examples: [
      { q: 'Vì sao trung thực và cẩn thận lại đặc biệt quan trọng với nghề DBA?', a: 'Vì DBA nắm dữ liệu nhạy cảm của tổ chức (thông tin khách hàng, tài chính, hồ sơ…). Cẩu thả có thể làm mất hoặc hỏng dữ liệu; thiếu trung thực có thể dẫn đến lạm dụng, rò rỉ dữ liệu — gây hậu quả nghiêm trọng và vi phạm pháp luật. Vì vậy phẩm chất này là yêu cầu hàng đầu.' },
      { q: 'Em thích làm việc với dữ liệu. Nên học chắc những môn nào ở phổ thông và rèn kỹ năng gì?', a: 'Học chắc Toán (tư duy logic, thống kê), Tin học (lập trình, CSDL, SQL) và ngoại ngữ (đọc tài liệu). Rèn kỹ năng viết câu lệnh SQL, thiết kế CSDL, và thực hành bằng các dự án nhỏ như quản lý thư viện, quản lý điểm lớp để tích luỹ kinh nghiệm thực tế.' },
    ],
  },

  'H11TIN-w17-quiz': {
    topic: 'Ôn tập cuối học kì 1',
    intro: 'Các em thân mến! Học kì 1 đã đi qua với rất nhiều kiến thức: hệ điều hành, phần cứng, mạng và Internet an toàn, cơ sở dữ liệu và SQL. Tuần này ta hệ thống lại toàn bộ để chuẩn bị cho bài kiểm tra.',
    objectives: [
      'Hệ thống lại kiến thức về hệ điều hành và phần cứng.',
      'Củng cố khái niệm CSDL quan hệ, khoá chính, khoá ngoài, SQL.',
      'Ôn lại kiến thức an toàn thông tin và phần mềm.',
    ],
    theory: [
      { h: 'Phần cứng và hệ điều hành' },
      { ul: [
        'Hệ điều hành quản lý tài nguyên (CPU, RAM, đĩa, thiết bị) và tiến trình;',
        'RAM bay hơi (lưu tạm), ổ cứng lưu lâu dài; CPU thực hiện lệnh, đo bằng GHz;',
        'Đơn vị dung lượng tăng dần: KB < MB < GB < TB.',
      ] },
      { h: 'Internet, phần mềm và an toàn' },
      { ul: [
        'Phần mềm nguồn mở: công khai mã nguồn, được sửa và phân phối lại;',
        'Cloud storage: truy cập mọi nơi, đồng bộ, sao lưu;',
        'Bcc giấu danh sách người nhận; phishing là lừa đảo giả mạo;',
        'Bảo vệ tài khoản: mật khẩu mạnh + xác thực 2 lớp.',
      ] },
      { h: 'Cơ sở dữ liệu và SQL' },
      { ul: [
        'CSDL quan hệ tổ chức theo bảng (hàng, cột);',
        'Khoá chính: duy nhất và khác NULL; khoá ngoài liên kết hai bảng;',
        'SQL có nhóm DDL (định nghĩa), DML (thao tác: SELECT, INSERT, UPDATE, DELETE);',
        'DBMS quản lý CSDL, cấp quyền, sao lưu, đảm bảo toàn vẹn.',
      ] },
      { note: 'Khi ôn, hãy tự đặt câu hỏi và trả lời, vẽ sơ đồ liên kết các khái niệm thay vì học vẹt — sẽ nhớ lâu và làm bài linh hoạt hơn.' },
    ],
    examples: [
      { q: 'Tự kiểm tra: SELECT thuộc nhóm lệnh nào của SQL, và khoá chính có đặc điểm gì?', a: 'SELECT thuộc nhóm DML (Data Manipulation Language - ngôn ngữ thao tác dữ liệu), dùng để truy vấn lấy dữ liệu. Khoá chính (Primary Key) có đặc điểm: duy nhất (không trùng) và khác NULL, dùng định danh từng bản ghi.' },
      { q: 'Hai bảng trong CSDL quan hệ được liên kết với nhau bằng gì?', a: 'Bằng khoá ngoài (Foreign Key) ở bảng này tham chiếu đến khoá chính (Primary Key) của bảng kia. Đây là cơ chế tạo quan hệ giữa các bảng, ví dụ HOC_SINH.MaLop tham chiếu LOP.MaLop.' },
    ],
  },

  'H11TIN-w18-quiz': {
    topic: 'Kiểm tra cuối học kì 1',
    intro: 'Chào các em! Đây là tuần kiểm tra cuối học kì 1. Thầy tổng hợp lại những điểm trọng tâm thường ra đề để các em tự tin bước vào phòng thi. Hãy đọc kỹ, làm cẩn thận và đừng quên đọc lại đề trước khi nộp.',
    objectives: [
      'Vận dụng tổng hợp kiến thức học kì 1 vào các tình huống.',
      'Làm chính xác các câu hỏi về SQL và CSDL.',
      'Rèn kỹ năng đọc đề và lựa chọn đáp án đúng.',
    ],
    theory: [
      { h: 'Trọng tâm phần cứng - hệ điều hành' },
      { p: 'Nhớ thứ tự đơn vị dung lượng (KB < MB < GB < TB, TB lớn nhất); vai trò hệ điều hành; phân biệt RAM/ROM.' },
      { h: 'Trọng tâm CSDL - SQL' },
      { ul: [
        'Câu truy vấn chuẩn: SELECT * FROM HocSinh WHERE Lop = \'11A\';',
        'Hai bảng liên kết bằng khoá ngoài tham chiếu khoá chính;',
        'DBMS: quản lý CSDL, cấp quyền, sao lưu, đảm bảo toàn vẹn.',
      ] },
      { h: 'Trọng tâm Internet và an toàn' },
      { ul: [
        'Cloud storage: truy cập nhiều thiết bị, sao lưu tự động;',
        'Phishing: lừa đảo giả danh trang/email để chiếm thông tin nhạy cảm;',
        'Bảo vệ tài khoản: mật khẩu mạnh, xác thực 2 lớp, không bấm link lạ.',
      ] },
      { h: 'Mẹo làm bài trắc nghiệm' },
      { p: 'Đọc kỹ từng từ trong câu hỏi (chú ý từ phủ định "KHÔNG"); loại nhanh đáp án sai rõ ràng; với câu SQL, kiểm tra đúng cú pháp và dấu nháy cho chuỗi.' },
      { note: 'Phân bổ thời gian hợp lý: câu dễ làm trước, câu khó đánh dấu quay lại sau; luôn dành 2-3 phút cuối để soát lại.' },
    ],
    examples: [
      { q: 'Trong các đơn vị KB, MB, GB, TB, đơn vị nào lớn nhất?', a: 'TB (Terabyte) là lớn nhất, theo thứ tự tăng dần KB < MB < GB < TB. Mỗi bậc gấp khoảng 1024 lần bậc dưới.' },
      { q: 'Câu lệnh nào đúng để lấy tất cả bản ghi học sinh lớp 11A?', a: 'SELECT * FROM HocSinh WHERE Lop = \'11A\'; — Đây là cú pháp SQL chuẩn: SELECT * lấy mọi cột, FROM HocSinh chỉ bảng, WHERE Lop = \'11A\' lọc đúng lớp cần tìm.' },
    ],
  },

  // ──────────────── HK2 — Phần III: Tin học ứng dụng (ICT) ────────────────
  'H11TIN-w19-quiz': {
    topic: 'Quản trị CSDL trên máy tính (làm quen MS Access)',
    intro: 'Chào các em! Học kì 2 ta chuyển sang định hướng Tin học ứng dụng. Mở đầu là làm quen với MS Access — phần mềm quản trị CSDL trực quan, rất hợp cho người mới và các dự án vừa, nhỏ.',
    objectives: [
      'Hiểu MS Access là gì và đặc điểm tệp Access.',
      'Nhận biết bốn đối tượng chính: bảng, truy vấn, biểu mẫu, báo cáo.',
      'Thực hiện được các thao tác cơ bản trên đối tượng Access.',
    ],
    theory: [
      { h: 'MS Access là gì?' },
      { p: 'MS Access là hệ quản trị cơ sở dữ liệu quan hệ trong bộ Microsoft Office, dành cho người dùng cuối và dự án quy mô vừa, nhỏ. Tệp Access có phần mở rộng .accdb (định dạng cũ là .mdb).' },
      { h: 'Bốn đối tượng chính' },
      { ul: [
        'Bảng (Table): nơi lưu trữ dữ liệu thực sự, gồm hàng và cột;',
        'Truy vấn (Query): lấy/lọc dữ liệu từ một hoặc nhiều bảng;',
        'Biểu mẫu (Form): giao diện nhập và hiển thị dữ liệu thân thiện;',
        'Báo cáo (Report): trình bày dữ liệu dạng dễ in/đọc.',
      ] },
      { h: 'Hai chế độ làm việc' },
      { p: 'Chế độ Thiết kế (Design View) để định nghĩa cấu trúc (trường, kiểu, khoá). Chế độ Bảng dữ liệu (Datasheet View) để xem và nhập dữ liệu.' },
      { h: 'Thao tác cơ bản' },
      { p: 'Để mở một bảng: nháy đúp tên bảng hoặc bấm phải chọn Open. Biểu mẫu (Form) giúp nhập liệu trực quan, hạn chế sai sót hơn so với nhập trực tiếp vào bảng.' },
      { note: 'Khác với Excel, Access là CSDL thực sự: dữ liệu có kiểu, có ràng buộc, có thể liên kết nhiều bảng và phục vụ truy vấn phức tạp.' },
    ],
    examples: [
      { q: 'Một CSDL quản lý thư viện trong Access nên có những đối tượng nào và mỗi đối tượng làm gì?', a: 'Bảng (Table) như SACH, DOCGIA, MUONTRA để lưu dữ liệu. Truy vấn (Query) để tra cứu sách đang được mượn. Biểu mẫu (Form) để thủ thư nhập thông tin mượn/trả dễ dàng. Báo cáo (Report) để in danh sách sách quá hạn. Mỗi đối tượng đảm nhiệm một vai trò riêng.' },
      { q: 'Phân biệt Design View và Datasheet View trong Access.', a: 'Design View dùng để thiết kế cấu trúc bảng: khai báo tên trường, kiểu dữ liệu, đặt khoá chính, ràng buộc. Datasheet View dùng để nhập, xem và sửa dữ liệu thực tế dưới dạng bảng. Một bên định nghĩa "khuôn", một bên đổ "dữ liệu".' },
    ],
  },

  'H11TIN-w20-quiz': {
    topic: 'Thực hành xác định cấu trúc bảng và các trường khoá',
    intro: 'Các em ơi! Trước khi nhập dữ liệu, ta phải thiết kế bảng đúng: chọn trường nào, kiểu dữ liệu gì, đặt khoá ở đâu. Tuần này ta thực hành xác định cấu trúc bảng và các trường khoá trong Access.',
    objectives: [
      'Chọn được kiểu dữ liệu phù hợp cho từng trường.',
      'Đặt khoá chính đúng cách trong Access.',
      'Thiết lập các ràng buộc cơ bản như Required.',
    ],
    theory: [
      { h: 'Chọn kiểu dữ liệu cho trường' },
      { ul: [
        'Short Text (Text): chữ và số không tính toán, ví dụ HoTen, MaHS;',
        'Number: số dùng tính toán, ví dụ DiemTB (kiểu Single/Double cho số thực);',
        'Date/Time: ngày tháng, ví dụ NgaySinh;',
        'Yes/No: giá trị đúng/sai, ví dụ "Đã nộp học phí";',
        'Currency: tiền tệ.',
      ] },
      { h: 'Đặt khoá chính' },
      { p: 'Trong Design View, chọn trường định danh duy nhất (ví dụ MaHS) rồi bấm Primary Key. Khoá chính giúp tránh trùng bản ghi và là điểm tham chiếu để liên kết bảng.' },
      { h: 'Ràng buộc dữ liệu' },
      { ul: [
        'Required = Yes: bắt buộc nhập, không cho để trống (NULL);',
        'Field Size: giới hạn độ dài;',
        'Validation Rule: quy tắc kiểm tra giá trị hợp lệ (ví dụ DiemTB >= 0 And <= 10).',
      ] },
      { h: 'Vì sao thiết kế đúng từ đầu lại quan trọng?' },
      { p: 'Kiểu dữ liệu đúng giúp Access kiểm tra và từ chối dữ liệu sai (ví dụ nhập chữ vào trường số sẽ báo lỗi), giảm rủi ro dữ liệu bẩn về sau.' },
      { note: 'Quy tắc vàng: chọn kiểu dữ liệu càng sát bản chất dữ liệu càng tốt — đừng để mọi thứ là Text, vì sẽ mất khả năng tính toán và kiểm tra hợp lệ.' },
    ],
    examples: [
      { q: 'Thiết kế bảng HOC_SINH(MaHS, HoTen, NgaySinh, DiemTB, DaNopHocPhi). Hãy chọn kiểu dữ liệu và khoá chính.', a: 'MaHS: Short Text, đặt làm khoá chính (định danh duy nhất). HoTen: Short Text. NgaySinh: Date/Time. DiemTB: Number kiểu Single/Double (số thực). DaNopHocPhi: Yes/No. MaHS nên đặt Required = Yes vì là khoá chính, không được để trống.' },
      { q: 'Khi nhập chữ "abc" vào trường DiemTB kiểu Number, điều gì xảy ra và vì sao?', a: 'Access báo lỗi và không lưu giá trị đó. Vì trường DiemTB được khai báo kiểu Number, Access kiểm tra kiểu dữ liệu khi nhập, nên từ chối giá trị chữ không phải số. Đây chính là lợi ích của việc chọn đúng kiểu dữ liệu: ngăn dữ liệu sai ngay từ đầu.' },
    ],
  },

  'H11TIN-w21-quiz': {
    topic: 'Thực hành tạo lập CSDL và các bảng',
    intro: 'Chào các em! Đã biết cách thiết kế cấu trúc, tuần này ta thực sự tạo lập một CSDL và các bảng trong Access, thiết lập liên kết giữa các bảng và nhập dữ liệu mẫu để kiểm thử.',
    objectives: [
      'Tạo được CSDL và bảng mới bằng Table Design.',
      'Thiết lập liên kết giữa các bảng qua khoá ngoài.',
      'Nhập dữ liệu mẫu và lưu bảng đúng cách.',
    ],
    theory: [
      { h: 'Tạo bảng mới' },
      { p: 'Vào Create → Table Design để chỉ định danh sách trường cùng kiểu dữ liệu, rồi đặt khoá chính. Lưu bảng bằng Ctrl + S và đặt tên có ý nghĩa (ví dụ HOC_SINH, LOP).' },
      { h: 'Thiết lập liên kết giữa các bảng' },
      { p: 'Khi bảng HOC_SINH có trường MaLop liên kết tới bảng LOP, thì MaLop là khoá ngoài tham chiếu LOP.MaLop. Trong Access, dùng công cụ Relationships để kéo nối khoá chính với khoá ngoài.' },
      { ul: [
        'Liên kết giúp đảm bảo toàn vẹn tham chiếu: không nhập được MaLop không tồn tại trong bảng LOP;',
        'Đặt MaHS làm khoá chính để tránh trùng học sinh.',
      ] },
      { h: 'Nhập và kiểm thử dữ liệu mẫu' },
      { p: 'Sau khi tạo bảng, nhập khoảng 10 bản ghi mẫu để kiểm tra cấu trúc hoạt động đúng và làm dữ liệu nháp cho việc thử truy vấn, biểu mẫu, báo cáo về sau.' },
      { h: 'Xử lý lỗi khi nhập' },
      { p: 'Nếu nhập sai kiểu (chữ vào số) hoặc bỏ trống trường Required, Access báo lỗi và không lưu — hãy sửa cho đúng rồi mới tiếp tục.' },
      { note: 'Thứ tự nhập dữ liệu nên hợp lý: nhập bảng "cha" (LOP) trước, rồi mới nhập bảng "con" (HOC_SINH), để các giá trị khoá ngoài đã có sẵn nơi tham chiếu.' },
    ],
    examples: [
      { q: 'Em tạo bảng LOP và HOC_SINH. Vì sao nên nhập dữ liệu cho LOP trước HOC_SINH?', a: 'Vì HOC_SINH.MaLop là khoá ngoài tham chiếu LOP.MaLop. Nếu nhập HOC_SINH trước với một MaLop chưa tồn tại trong LOP, ràng buộc toàn vẹn tham chiếu sẽ bị vi phạm và Access báo lỗi. Nhập bảng cha (LOP) trước đảm bảo giá trị khoá ngoài đã có nơi tham chiếu.' },
      { q: 'Nhập 10 bản ghi mẫu vào bảng để làm gì?', a: 'Để kiểm thử: xác nhận cấu trúc bảng, kiểu dữ liệu và ràng buộc hoạt động đúng; đồng thời tạo dữ liệu nháp để thử các truy vấn (Query), biểu mẫu (Form) và báo cáo (Report) sau này mà chưa cần dữ liệu thật.' },
    ],
  },

  'H11TIN-w22-quiz': {
    topic: 'Thực hành tạo biểu mẫu (Form)',
    intro: 'Các em thân mến! Nhập dữ liệu trực tiếp vào bảng dễ sai và không thân thiện. Tuần này ta tạo Biểu mẫu (Form) — giao diện đẹp, dễ dùng để nhập và xem dữ liệu trong Access.',
    objectives: [
      'Hiểu vai trò của biểu mẫu trong việc nhập/xem dữ liệu.',
      'Tạo nhanh biểu mẫu từ bảng và hiểu cấu trúc của nó.',
      'Liên kết biểu mẫu với nguồn dữ liệu và dùng các điều khiển.',
    ],
    theory: [
      { h: 'Biểu mẫu (Form) là gì?' },
      { p: 'Biểu mẫu là giao diện thân thiện để nhập, sửa và xem dữ liệu, thay cho việc nhập trực tiếp vào bảng. Form giúp hạn chế sai sót, có chỉ dẫn rõ ràng và kiểm soát được quyền nhập.' },
      { h: 'Tạo Form nhanh' },
      { p: 'Chọn bảng nguồn rồi vào Create → Form để Access tự sinh biểu mẫu tương ứng. Có thể tuỳ chỉnh giao diện trong Layout View hoặc Design View.' },
      { h: 'Cấu trúc và điều khiển trên Form' },
      { ul: [
        'Form gồm các phần: Form Header, Detail, Form Footer;',
        'Điều khiển Text Box: hiển thị và nhập giá trị một trường;',
        'Điều khiển khác: Label (nhãn), Combo Box (chọn từ danh sách), Button (nút lệnh).',
      ] },
      { h: 'Liên kết Form với nguồn dữ liệu' },
      { p: 'Thuộc tính Record Source xác định Form lấy/ghi dữ liệu vào bảng hay truy vấn nào. Đặt đúng Record Source thì Form mới hiển thị và lưu dữ liệu chính xác.' },
      { note: 'Ưu điểm của Form: kiểm soát nhập liệu (validation), giao diện rõ ràng, có thể ẩn trường nhạy cảm và phân quyền — chuyên nghiệp hơn nhiều so với nhập thẳng vào Datasheet.' },
    ],
    examples: [
      { q: 'Vì sao dùng Form để nhập điểm tốt hơn nhập trực tiếp vào bảng?', a: 'Form cho giao diện rõ ràng với nhãn từng ô, có thể đặt ràng buộc và chỉ dẫn (ví dụ điểm 0-10), ẩn các trường không liên quan và kiểm soát ai được nhập gì. Nhờ đó giảm sai sót và bảo mật hơn so với nhập trực tiếp vào bảng nơi mọi cột đều hiện ra.' },
      { q: 'Thuộc tính nào quyết định một Form lấy dữ liệu từ đâu? Nếu đặt sai thì sao?', a: 'Thuộc tính Record Source. Nó chỉ định bảng hoặc truy vấn nguồn của Form. Nếu đặt sai (trỏ nhầm bảng), Form sẽ hiển thị sai dữ liệu hoặc không lưu được vào đúng nơi cần — nên phải đặt đúng Record Source khi tạo Form.' },
    ],
  },

  'H11TIN-w23-quiz': {
    topic: 'Thực hành truy vấn dữ liệu (Query)',
    intro: 'Chào các em! Sức mạnh thực sự của CSDL nằm ở truy vấn — lọc, gộp, sắp xếp và tổng hợp dữ liệu theo ý muốn. Tuần này ta thực hành tạo truy vấn (Query) trong Access và hiểu câu SQL tương ứng.',
    objectives: [
      'Tạo được truy vấn lọc dữ liệu theo điều kiện.',
      'Hiểu JOIN để gộp dữ liệu từ nhiều bảng.',
      'Dùng ORDER BY, GROUP BY và hàm tổng hợp.',
    ],
    theory: [
      { h: 'Truy vấn (Query) là gì?' },
      { p: 'Truy vấn dùng để lấy dữ liệu theo điều kiện từ một hoặc nhiều bảng. Loại phổ biến nhất là Select Query (truy vấn chọn). Access có công cụ thiết kế trực quan, nhưng bản chất sinh ra một câu SQL.' },
      { h: 'Lọc dữ liệu với điều kiện' },
      { p: 'Ví dụ truy vấn học sinh lớp 11A tương đương câu SQL: SELECT * FROM HocSinh WHERE Lop = \'11A\';' },
      { h: 'Gộp dữ liệu nhiều bảng với JOIN' },
      { p: 'JOIN gộp dữ liệu từ hai bảng theo trường khoá chung. Ví dụ gộp HOC_SINH với LOP để lấy tên lớp thay vì chỉ mã lớp: SELECT HoTen, TenLop FROM HocSinh JOIN Lop ON HocSinh.MaLop = Lop.MaLop;' },
      { h: 'Sắp xếp và tổng hợp' },
      { ul: [
        'ORDER BY: sắp xếp kết quả theo cột, ví dụ ORDER BY DiemTB DESC (giảm dần);',
        'GROUP BY: nhóm dữ liệu, dùng cùng hàm tổng hợp COUNT, SUM, AVG, MAX, MIN.',
      ] },
      { note: 'Một câu truy vấn mạnh thường kết hợp nhiều mệnh đề: SELECT ... FROM ... JOIN ... WHERE ... GROUP BY ... ORDER BY ... — nhớ đúng thứ tự khi viết SQL.' },
    ],
    examples: [
      { q: 'Viết câu SQL lấy họ tên và tên lớp của mọi học sinh, biết bảng HOC_SINH(HoTen, MaLop) và LOP(MaLop, TenLop).', a: 'SELECT HoTen, TenLop FROM HocSinh JOIN Lop ON HocSinh.MaLop = Lop.MaLop; — Câu lệnh dùng JOIN để gộp hai bảng theo khoá chung MaLop, lấy HoTen từ HOC_SINH và TenLop từ LOP.' },
      { q: 'Viết câu SQL đếm số học sinh trong từng lớp.', a: 'SELECT MaLop, COUNT(*) FROM HocSinh GROUP BY MaLop; — GROUP BY MaLop nhóm các học sinh theo lớp, COUNT(*) đếm số học sinh trong mỗi nhóm, trả về số lượng theo từng mã lớp.' },
    ],
  },

  'H11TIN-w24-quiz': {
    topic: 'Thực hành báo cáo (Report)',
    intro: 'Các em ơi! Dữ liệu truy vấn xong cần được trình bày đẹp để in hoặc gửi. Đó là việc của Báo cáo (Report). Tuần này ta thực hành tạo báo cáo trong Access, biết nhóm dữ liệu và xuất ra PDF.',
    objectives: [
      'Hiểu vai trò và nguồn dữ liệu của báo cáo.',
      'Nắm cấu trúc báo cáo và cách nhóm (Group) dữ liệu.',
      'Xuất báo cáo ra PDF và trình bày chuyên nghiệp.',
    ],
    theory: [
      { h: 'Báo cáo (Report) là gì?' },
      { p: 'Báo cáo dùng để trình bày dữ liệu dưới dạng dễ in, dễ đọc. Nguồn dữ liệu của báo cáo thường là một bảng hoặc một truy vấn (Record Source).' },
      { h: 'Cấu trúc báo cáo' },
      { ul: [
        'Page Header: tiêu đề, lặp ở đầu mỗi trang;',
        'Detail: phần thân, hiển thị từng bản ghi;',
        'Page Footer: số trang, ngày in;',
        'Group Header/Footer: tiêu đề và tổng kết theo nhóm (nếu có nhóm).',
      ] },
      { h: 'Nhóm dữ liệu (Grouping)' },
      { p: 'Nhóm (Group) cho phép phân chia dữ liệu theo một trường (ví dụ theo Lop) và tính tổng/đếm theo từng nhóm — rất tiện cho báo cáo thống kê.' },
      { h: 'Xuất báo cáo ra PDF' },
      { p: 'Vào External Data → PDF/XPS để xuất báo cáo thành tệp PDF, tiện chia sẻ và in. Báo cáo nên trình bày sạch sẽ: có tiêu đề, đánh số trang, ghi ngày in.' },
      { note: 'Một báo cáo tốt giúp người đọc nắm thông tin trong vài giây: bố cục rõ ràng, không lòe loẹt, số liệu được nhóm và tổng kết hợp lý.' },
    ],
    examples: [
      { q: 'Cần làm báo cáo "Danh sách học sinh theo từng lớp, có tổng số mỗi lớp". Dùng tính năng gì của Report?', a: 'Dùng tính năng Nhóm (Group) theo trường Lop. Mỗi lớp tạo thành một nhóm có Group Header (tên lớp) và Group Footer (tổng số học sinh, dùng hàm COUNT). Phần Detail liệt kê học sinh trong lớp. Nhờ đó báo cáo phân nhóm gọn gàng và có thống kê theo lớp.' },
      { q: 'Sau khi thiết kế xong báo cáo, làm sao gửi cho thầy cô qua email mà giữ nguyên định dạng?', a: 'Xuất báo cáo ra PDF: vào External Data → PDF/XPS, lưu thành tệp .pdf rồi đính kèm email. PDF giữ nguyên bố cục, font và định dạng trên mọi máy, tiện cho việc in và đọc lại.' },
    ],
  },

  'H11TIN-w25-quiz': {
    topic: 'Thực hành phân quyền và bảo mật CSDL',
    intro: 'Chào các em! CSDL chứa thông tin quan trọng nên phải được bảo vệ. Tuần này ta thực hành phân quyền và bảo mật: đặt mật khẩu cho Access, cấp quyền trên DBMS lớn, và sao lưu để phòng sự cố.',
    objectives: [
      'Bảo vệ tệp CSDL Access bằng mật khẩu.',
      'Hiểu cơ chế phân quyền GRANT/REVOKE trên DBMS lớn.',
      'Nắm quy trình sao lưu và khôi phục dữ liệu.',
    ],
    theory: [
      { h: 'Bảo mật CSDL Access' },
      { p: 'Trong Access, có thể đặt mật khẩu mở tệp .accdb để chỉ người biết mật khẩu mới truy cập được. Không đăng tải tệp CSDL công khai lên Internet.' },
      { h: 'Phân quyền trên DBMS lớn' },
      { p: 'Trên các DBMS như MySQL, SQL Server, việc phân quyền thực hiện bằng lệnh GRANT (cấp quyền) và REVOKE (thu hồi quyền).' },
      { ul: [
        'Vai trò "chỉ đọc" thường được cấp quyền SELECT;',
        'Người nhập liệu được cấp INSERT, UPDATE;',
        'Chỉ quản trị viên mới có quyền DROP, GRANT.',
      ] },
      { h: 'Sao lưu và khôi phục' },
      { ul: [
        'Sao lưu Access: File → Save As → Back Up Database;',
        'Khôi phục sau sự cố: dùng bản sao lưu mới nhất (kèm nhật ký giao tác nếu có);',
        'Nên sao lưu định kỳ và lưu ở vị trí khác (cloud/ổ ngoài) theo quy tắc 3-2-1.',
      ] },
      { note: 'Nguyên tắc đặc quyền tối thiểu: chỉ cấp cho mỗi người đúng quyền họ cần để làm việc, không cấp dư — giảm rủi ro khi tài khoản bị lộ.' },
    ],
    examples: [
      { q: 'Trong một CSDL bán hàng trên MySQL, nhân viên thu ngân chỉ cần xem giá và tạo hoá đơn. Nên cấp quyền gì?', a: 'Theo nguyên tắc đặc quyền tối thiểu: cấp quyền SELECT trên bảng sản phẩm (để xem giá) và quyền INSERT trên bảng hoá đơn (để tạo hoá đơn). KHÔNG cấp DROP, DELETE toàn bộ hay GRANT. Dùng lệnh GRANT SELECT, INSERT ... TO thu_ngan;' },
      { q: 'Vì sao chỉ sao lưu một bản trên cùng ổ đĩa với CSDL gốc là chưa an toàn?', a: 'Vì nếu ổ đĩa đó hỏng, bị mã hoá bởi ransomware hay máy bị mất, thì cả CSDL gốc lẫn bản sao lưu cùng mất. Cần lưu bản sao ở nơi tách biệt (ổ ngoài, cloud) theo quy tắc 3-2-1 để vẫn còn dữ liệu khôi phục khi sự cố xảy ra.' },
    ],
  },

  'H11TIN-w26-quiz': {
    topic: 'Thực hành tổng hợp dự án CSDL nhỏ',
    intro: 'Các em thân mến! Tuần này ta vận dụng tất cả kiến thức về CSDL để làm một dự án nhỏ hoàn chỉnh — từ phân tích yêu cầu, vẽ sơ đồ, tạo bảng, đến kiểm thử và bàn giao. Đây là cách học hiệu quả nhất: làm thật một sản phẩm.',
    objectives: [
      'Nắm quy trình làm một dự án CSDL từ đầu đến cuối.',
      'Biết vẽ sơ đồ ERD và chuyển sang bảng quan hệ.',
      'Hiểu tầm quan trọng của kiểm thử, tài liệu và bàn giao.',
    ],
    theory: [
      { h: 'Quy trình làm dự án CSDL' },
      { ul: [
        'Phân tích yêu cầu nghiệp vụ: xác định thực thể, thuộc tính, quan hệ;',
        'Thiết kế: vẽ sơ đồ ERD, chuyển thành các bảng;',
        'Cài đặt: tạo bảng, liên kết, biểu mẫu, truy vấn, báo cáo;',
        'Kiểm thử với dữ liệu mẫu và kịch bản người dùng;',
        'Bàn giao: tài liệu, hướng dẫn, sao lưu, phân quyền.',
      ] },
      { h: 'Sơ đồ ERD (Thực thể - Liên kết)' },
      { p: 'ERD (Entity - Relationship Diagram) mô hình hoá các thực thể (đối tượng) và quan hệ giữa chúng. Khi chuyển sang CSDL quan hệ, mỗi thực thể trở thành một bảng có khoá chính; mỗi quan hệ thể hiện qua khoá ngoài.' },
      { h: 'Kiểm thử trước khi triển khai' },
      { p: 'Thử với dữ liệu mẫu và các kịch bản người dùng (thêm/sửa/xoá/tra cứu) để phát hiện lỗi sớm, tránh đẩy thẳng lên môi trường thật.' },
      { h: 'Tài liệu và bàn giao' },
      { p: 'Tài liệu dự án gồm: sơ đồ ERD, mô tả bảng, từ điển dữ liệu, hướng dẫn sử dụng. Khi bàn giao: hướng dẫn người dùng, thiết lập sao lưu, phân quyền và kế hoạch bảo trì.' },
      { note: 'Đừng vội code/tạo bảng ngay khi nhận đề bài. Phân tích yêu cầu rõ ràng trước sẽ tiết kiệm rất nhiều công sửa chữa về sau.' },
    ],
    examples: [
      { q: 'Em làm dự án "Quản lý mượn sách thư viện". Hãy xác định các thực thể chính và quan hệ.', a: 'Thực thể chính: SACH (sách), DOCGIA (độc giả), PHIEUMUON (phiếu mượn). Quan hệ: một độc giả có nhiều phiếu mượn (1-n); mỗi phiếu mượn liên quan đến nhiều sách và một sách có thể nằm trong nhiều phiếu mượn theo thời gian (n-n, cần bảng trung gian CHITIET_MUON). Mỗi thực thể thành một bảng có khoá chính.' },
      { q: 'Vì sao bước phân tích yêu cầu lại quan trọng nhất trong dự án CSDL?', a: 'Vì nếu hiểu sai nghiệp vụ, thiết kế bảng và quan hệ sẽ sai, dẫn đến phải làm lại từ đầu rất tốn kém. Phân tích đúng giúp xác định đầy đủ thực thể, thuộc tính, quan hệ và ràng buộc, làm nền cho mọi bước sau (thiết kế, cài đặt, kiểm thử) diễn ra thuận lợi.' },
    ],
  },

  'H11TIN-w27-quiz': {
    topic: 'Phần mềm chỉnh sửa ảnh — Làm quen',
    intro: 'Chào các em! Từ tuần này ta bước sang một mảng thú vị: xử lý ảnh số. Trước hết hãy làm quen các phần mềm chỉnh sửa ảnh và những khái niệm nền tảng: pixel, vector, độ phân giải, hệ màu.',
    objectives: [
      'Nhận biết các phần mềm chỉnh sửa ảnh phổ biến.',
      'Phân biệt ảnh raster (bitmap) và ảnh vector.',
      'Hiểu độ phân giải, hệ màu và các định dạng ảnh.',
    ],
    theory: [
      { h: 'Phần mềm chỉnh sửa ảnh' },
      { p: 'Phổ biến gồm: GIMP (mã nguồn mở, miễn phí), Adobe Photoshop (thương mại), Photopea (chạy trên trình duyệt). Chúng dùng để cắt, ghép, chỉnh màu, thêm hiệu ứng cho ảnh.' },
      { h: 'Ảnh raster và ảnh vector' },
      { ul: [
        'Ảnh raster (bitmap): tạo từ lưới các điểm ảnh (pixel); phóng to nhiều sẽ bị vỡ/răng cưa. Hợp với ảnh chụp. Định dạng: JPG, PNG, BMP.',
        'Ảnh vector: tạo từ các đối tượng hình học mô tả bằng toán học (đường, hình); phóng to thu nhỏ không vỡ. Hợp với logo, icon. Định dạng: SVG, AI.',
      ] },
      { h: 'Độ phân giải và hệ màu' },
      { ul: [
        'Độ phân giải đo bằng PPI (pixel per inch) cho màn hình, DPI khi in — càng cao càng nét;',
        'Hệ màu RGB (đỏ-lục-lam) cho hiển thị trên màn hình; hệ màu CMYK cho in ấn.',
      ] },
      { h: 'Định dạng ảnh thông dụng' },
      { p: 'JPG: nén tốt cho ảnh chụp (mất dữ liệu mỗi lần lưu). PNG: hỗ trợ nền trong suốt (alpha), phù hợp đồ hoạ. BMP/TIFF: không/ít nén, dung lượng lớn, chất lượng cao.' },
      { note: 'Nhớ điểm mấu chốt: phóng to ảnh raster thì vỡ hình, phóng to ảnh vector thì vẫn nét — đó là lý do logo luôn nên làm bằng vector.' },
    ],
    examples: [
      { q: 'Thiết kế logo cho câu lạc bộ, cần in từ danh thiếp nhỏ đến banner lớn không vỡ. Nên dùng ảnh raster hay vector?', a: 'Nên dùng ảnh vector (ví dụ làm bằng Inkscape, lưu .svg). Vì vector mô tả hình bằng toán học nên phóng to thu nhỏ tuỳ ý mà vẫn sắc nét, in ở mọi kích thước từ danh thiếp đến banner đều đẹp. Ảnh raster sẽ vỡ khi phóng to lên banner.' },
      { q: 'Em cần một ảnh có nền trong suốt để chèn lên poster. Chọn định dạng nào và vì sao?', a: 'Chọn định dạng PNG. PNG hỗ trợ kênh alpha (độ trong suốt), nên vùng nền có thể trong suốt và ảnh hoà vào poster tự nhiên. JPG không hỗ trợ nền trong suốt (luôn có nền đặc), nên không phù hợp cho yêu cầu này.' },
    ],
  },

  'H11TIN-w28-quiz': {
    topic: 'Thực hành chỉnh sửa ảnh cơ bản',
    intro: 'Các em ơi! Tuần này ta xắn tay thực hành chỉnh sửa ảnh: làm việc với lớp (layer), cắt ảnh, xoá khuyết điểm, chỉnh sáng tối — và quan trọng là làm việc không phá huỷ ảnh gốc.',
    objectives: [
      'Hiểu và sử dụng lớp (layer) để chỉnh sửa không phá huỷ.',
      'Dùng các công cụ cơ bản: Crop, Clone Stamp, Brightness/Contrast.',
      'Lưu và xuất ảnh giữ chất lượng hợp lý.',
    ],
    theory: [
      { h: 'Lớp (Layer)' },
      { p: 'Lớp giống như các tấm phim trong suốt xếp chồng lên nhau. Mỗi thành phần ảnh đặt trên một lớp riêng, có thể chỉnh sửa độc lập mà không ảnh hưởng lớp khác — đây là chỉnh sửa không phá huỷ (non-destructive).' },
      { h: 'Các công cụ cơ bản' },
      { ul: [
        'Crop: cắt lấy một phần ảnh, bỏ phần thừa;',
        'Clone Stamp: sao chép một vùng ảnh lên vùng khác — dùng xoá khuyết điểm, vết bẩn;',
        'Brightness/Contrast: chỉnh độ sáng và độ tương phản;',
        'Move, Rotate, Resize: di chuyển, xoay, đổi kích thước.',
      ] },
      { h: 'Lưu và xuất ảnh' },
      { p: 'Lưu tệp dự án (.psd của Photoshop, .xcf của GIMP) để giữ nguyên các lớp, dễ sửa lại sau. Khi cần ảnh thành phẩm thì export ra JPG/PNG. Tránh lưu JPG nhiều lần vì mỗi lần nén lại làm giảm chất lượng.' },
      { h: 'Quy trình không phá huỷ' },
      { p: 'Giữ ảnh gốc nguyên vẹn; chỉnh sửa trên lớp sao chép hoặc lớp điều chỉnh; lưu bản dự án tách rời với bản xuất. Như vậy luôn quay lại được nếu cần.' },
      { note: 'Đừng ghi đè trực tiếp lên ảnh gốc. Luôn giữ một bản gốc và làm việc trên bản sao — sai có thể làm lại từ đầu.' },
    ],
    examples: [
      { q: 'Ảnh chụp chân dung có một nốt mụn nhỏ trên trán. Em dùng công cụ nào để xoá mà tự nhiên?', a: 'Dùng công cụ Clone Stamp (con dấu nhân bản): chọn một vùng da sạch gần đó làm nguồn, rồi "tô" lên chỗ nốt mụn để sao chép vùng da đẹp che đi. Nên làm trên một lớp sao chép để giữ ảnh gốc, và giảm cỡ cọ cho tự nhiên.' },
      { q: 'Vì sao nên lưu file dự án .xcf/.psd riêng thay vì chỉ lưu JPG?', a: 'Vì file .xcf/.psd giữ nguyên toàn bộ lớp (layer) và các chỉnh sửa, cho phép quay lại sửa từng phần sau này. JPG gộp phẳng tất cả lớp và nén mất dữ liệu mỗi lần lưu, không thể tách lại các thành phần. Nên giữ bản dự án để sửa, và xuất JPG/PNG làm bản thành phẩm.' },
    ],
  },

  'H11TIN-w29-quiz': {
    topic: 'Thực hành nâng cao xử lý ảnh',
    intro: 'Chào các em! Sau khi nắm vững cơ bản, tuần này ta lên trình độ cao hơn: dùng bộ lọc, mặt nạ lớp, lớp điều chỉnh — những công cụ giúp chỉnh ảnh tinh tế và chuyên nghiệp, đồng thời nhớ tôn trọng đạo đức số.',
    objectives: [
      'Sử dụng bộ lọc (filter) và mặt nạ lớp (layer mask).',
      'Hiểu lợi ích của lớp điều chỉnh (adjustment layer).',
      'Chọn định dạng xuất phù hợp và ứng xử có đạo đức khi xử lý ảnh người khác.',
    ],
    theory: [
      { h: 'Bộ lọc (Filter)' },
      { p: 'Bộ lọc áp các hiệu ứng lên ảnh hoặc lớp: làm mờ (blur), làm sắc nét (sharpen), hiệu ứng nghệ thuật… Trước khi áp filter mạnh, nên sao chép lớp để giữ bản gốc.' },
      { h: 'Mặt nạ lớp (Layer Mask)' },
      { p: 'Mặt nạ lớp cho phép hiển thị hoặc che một phần của lớp một cách không phá huỷ: tô đen để ẩn, tô trắng để hiện. Khác với việc xoá hẳn, mặt nạ có thể chỉnh lại bất cứ lúc nào.' },
      { h: 'Lớp điều chỉnh (Adjustment Layer)' },
      { p: 'Lớp điều chỉnh tác động lên các lớp bên dưới (ví dụ chỉnh màu, độ sáng) mà không thay đổi pixel gốc. Có thể bật/tắt, chỉnh sửa hoặc xoá bất cứ lúc nào — rất linh hoạt.' },
      { h: 'Xuất ảnh và đạo đức số' },
      { ul: [
        'Xuất lên web: JPG (ảnh chụp), PNG (đồ hoạ/nền trong suốt), WebP (nén tốt, hiện đại);',
        'Khi chỉnh sửa ảnh người khác: tôn trọng bản quyền và quyền hình ảnh, không chế giễu, không làm giả để lừa dối.',
      ] },
      { note: 'Mặt nạ và lớp điều chỉnh là chìa khoá của chỉnh sửa chuyên nghiệp: mọi thao tác đều có thể hoàn tác vì không động đến pixel gốc.' },
    ],
    examples: [
      { q: 'Em muốn làm sáng riêng phần khuôn mặt trong ảnh mà không ảnh hưởng phần nền. Cách không phá huỷ là gì?', a: 'Tạo một lớp điều chỉnh độ sáng (Brightness/Levels), rồi dùng mặt nạ lớp: tô đen toàn bộ mặt nạ để ẩn hiệu ứng, sau đó tô trắng riêng vùng khuôn mặt để chỉ vùng đó được làm sáng. Pixel gốc không đổi, có thể chỉnh lại mặt nạ bất cứ lúc nào.' },
      { q: 'Bạn em định ghép mặt một người vào ảnh chế để trêu chọc đăng lên mạng. Em góp ý thế nào?', a: 'Khuyên bạn không làm. Việc ghép mặt người khác để chế giễu xâm phạm quyền hình ảnh và danh dự của họ, có thể vi phạm pháp luật và gây tổn thương. Xử lý ảnh phải tôn trọng đạo đức số: không bôi nhọ, không làm giả để lừa dối hay xúc phạm người khác.' },
    ],
  },

  'H11TIN-w30-quiz': {
    topic: 'Vẽ kĩ thuật số cơ bản',
    intro: 'Các em thân mến! Ngoài chỉnh sửa ảnh chụp, máy tính còn là công cụ sáng tạo để vẽ. Tuần này ta tìm hiểu vẽ kĩ thuật số: phần mềm, bảng vẽ điện tử, sự khác nhau giữa vẽ vector và raster.',
    objectives: [
      'Nhận biết các phần mềm vẽ kĩ thuật số phổ biến.',
      'Phân biệt khi nào dùng vẽ vector, khi nào dùng vẽ raster.',
      'Hiểu vai trò của bảng vẽ điện tử và bút áp lực.',
    ],
    theory: [
      { h: 'Phần mềm vẽ kĩ thuật số' },
      { p: 'Phổ biến gồm: Krita (raster, mã nguồn mở), Inkscape (vector, mã nguồn mở), Procreate (iPad), Photoshop, Illustrator. Mỗi phần mềm mạnh ở một kiểu vẽ.' },
      { h: 'Vẽ vector và vẽ raster' },
      { ul: [
        'Vẽ vector: phù hợp với logo, icon, hình minh hoạ phẳng — phóng to thu nhỏ không vỡ hình;',
        'Vẽ raster: phù hợp với tranh tả thực, chân dung, phong cảnh số — nhiều chi tiết, sắc độ phong phú.',
      ] },
      { h: 'Bảng vẽ điện tử và bút áp lực' },
      { ul: [
        'Bảng vẽ điện tử (graphic tablet, ví dụ Wacom, Huion) giúp vẽ nét tự nhiên và chính xác hơn chuột;',
        'Bút áp lực (pressure-sensitive pen): nét mỏng hay đậm tuỳ theo lực ấn, giống vẽ bút thật.',
      ] },
      { h: 'Xuất bản vẽ' },
      { p: 'Để giữ chất lượng khi chia sẻ: xuất SVG cho bản vẽ vector, PNG độ phân giải cao cho bản vẽ raster. Tránh xuất JPG chất lượng thấp làm vỡ chi tiết.' },
      { note: 'Bảng vẽ + bút áp lực biến máy tính thành "giấy và bút" số — nét vẽ phản hồi theo lực tay, tạo cảm giác và kết quả gần với vẽ truyền thống.' },
    ],
    examples: [
      { q: 'Em muốn vẽ một bộ icon đơn giản, nhiều màu phẳng, dùng cho cả app nhỏ lẫn poster lớn. Nên vẽ vector hay raster?', a: 'Nên vẽ vector (ví dụ bằng Inkscape, xuất SVG). Icon là hình phẳng, ít sắc độ, và cần dùng ở nhiều kích thước — vector phóng to thu nhỏ vẫn nét. Raster sẽ vỡ khi phóng lên poster lớn.' },
      { q: 'Bút áp lực mang lại điều gì mà chuột thường không có khi vẽ?', a: 'Bút áp lực cảm nhận lực ấn của tay: ấn nhẹ ra nét mỏng, ấn mạnh ra nét đậm, giống như vẽ bằng bút/cọ thật. Chuột chỉ cho nét đều một độ dày, khó tạo độ chuyển nét tự nhiên. Vì vậy bút áp lực giúp vẽ biểu cảm và chính xác hơn nhiều.' },
    ],
  },

  'H11TIN-w31-quiz': {
    topic: 'Ảnh động và làm phim — Khái niệm cơ bản',
    intro: 'Chào các em! Tuần này ta bước vào thế giới chuyển động: ảnh động và làm phim. Ta sẽ hiểu vì sao một chuỗi ảnh tĩnh lại tạo ra chuyển động, và quy trình cơ bản để làm một phim ngắn.',
    objectives: [
      'Hiểu nguyên lý tạo ảnh động và khái niệm FPS.',
      'Nhận biết các định dạng ảnh động và phần mềm làm phim.',
      'Nắm quy trình cơ bản làm một phim ngắn.',
    ],
    theory: [
      { h: 'Nguyên lý ảnh động' },
      { p: 'Ảnh động (animation) được tạo từ một chuỗi khung hình (frame) liên tiếp chiếu nhanh, đánh lừa thị giác thành chuyển động. Mắt người lưu ảnh trong khoảnh khắc, nên các khung hình nối liền thành chuyển động mượt.' },
      { h: 'Số khung hình mỗi giây (FPS)' },
      { p: 'FPS (frames per second) là số khung hình chiếu mỗi giây. Phim điện ảnh thường 24 fps; video web/TV thường 30 hoặc 60 fps. FPS càng cao chuyển động càng mượt nhưng dung lượng càng lớn.' },
      { h: 'Định dạng và phần mềm' },
      { ul: [
        'Định dạng ảnh động ngắn trên web: GIF, WebP, APNG;',
        'Phần mềm làm phim/biên tập video: DaVinci Resolve, Adobe Premiere, CapCut, Shotcut, OpenShot.',
      ] },
      { h: 'Quy trình làm phim ngắn' },
      { p: 'Gồm các bước: viết kịch bản → phân cảnh (storyboard) → quay/dựng hình → biên tập (dựng) → xử lý âm thanh → xuất bản. Storyboard là bảng phác thảo các cảnh giúp hình dung trước khi quay/dựng.' },
      { note: 'Một phim ngắn hay bắt đầu từ ý tưởng và kịch bản rõ ràng, không phải từ kỹ xảo. Storyboard giúp tiết kiệm thời gian và tránh quay/dựng lan man.' },
    ],
    examples: [
      { q: 'Một đoạn ảnh động dài 2 giây chạy ở 24 fps thì có bao nhiêu khung hình?', a: 'Số khung hình = FPS × số giây = 24 × 2 = 48 khung hình. Nghĩa là phải vẽ/dựng 48 hình liên tiếp để tạo 2 giây chuyển động ở tốc độ 24 fps.' },
      { q: 'Vì sao nên làm storyboard trước khi quay phim ngắn?', a: 'Storyboard (bảng phân cảnh) phác thảo trước từng cảnh: bố cục, góc máy, hành động. Nhờ đó cả nhóm thống nhất ý tưởng, biết cần quay những gì, tránh quay thiếu/thừa và đỡ phải quay lại. Nó tiết kiệm thời gian, công sức và giúp phim mạch lạc hơn.' },
    ],
  },

  'H11TIN-w32-quiz': {
    topic: 'Thực hành tạo ảnh động và đoạn phim ngắn',
    intro: 'Các em ơi! Tuần này ta thực hành dựng phim: làm việc trên đường thời gian (timeline), cắt ghép clip, thêm chuyển cảnh, phụ đề và xuất video — đồng thời nhớ tôn trọng bản quyền nhạc nền.',
    objectives: [
      'Sử dụng timeline để sắp xếp clip và âm thanh.',
      'Cắt ghép, thêm chuyển cảnh và phụ đề.',
      'Xuất video đúng định dạng và dùng nhạc hợp pháp.',
    ],
    theory: [
      { h: 'Đường thời gian (Timeline)' },
      { p: 'Timeline là khu vực sắp xếp các clip, âm thanh, hình ảnh và hiệu ứng theo trục thời gian. Mỗi đối tượng nằm trên một dòng (track), kéo thả để bố trí trước/sau.' },
      { h: 'Cắt ghép clip' },
      { p: 'Công cụ Cut (cắt) tách clip thành nhiều đoạn để loại bỏ phần thừa, sắp xếp lại. Đây là thao tác cốt lõi của dựng phim.' },
      { h: 'Chuyển cảnh và phụ đề' },
      { ul: [
        'Hiệu ứng chuyển cảnh (transition) như Fade giúp chuyển mượt giữa hai cảnh;',
        'Phụ đề (subtitle) giúp người khiếm thính hoặc không nghe rõ vẫn hiểu nội dung — tăng tính tiếp cận.',
      ] },
      { h: 'Xuất video và bản quyền âm thanh' },
      { ul: [
        'Xuất lên YouTube/TikTok thường dùng định dạng MP4 (codec H.264) — phổ biến, tương thích rộng;',
        'Nhạc nền phải dùng nguồn hợp pháp: nhạc royalty-free, Creative Commons, hoặc xin phép tác giả.',
      ] },
      { note: 'Đừng lạm dụng quá nhiều hiệu ứng chuyển cảnh — dùng vừa đủ và nhất quán mới chuyên nghiệp; hiệu ứng loè loẹt làm phân tán nội dung.' },
    ],
    examples: [
      { q: 'Em dựng video giới thiệu lớp, muốn chuyển mượt giữa các cảnh. Dùng tính năng gì và lưu ý gì?', a: 'Dùng hiệu ứng chuyển cảnh (transition), ví dụ Fade (mờ dần). Đặt transition giữa hai clip trên timeline. Lưu ý: dùng vừa phải và nhất quán một kiểu chuyển cảnh, không lạm dụng nhiều hiệu ứng khác nhau làm rối mắt và phân tán nội dung.' },
      { q: 'Em muốn thêm nhạc nền cho phim ngắn để đăng YouTube. Làm sao tránh vi phạm bản quyền?', a: 'Dùng nhạc có giấy phép phù hợp: nhạc royalty-free, nhạc Creative Commons cho phép dùng, hoặc thư viện âm thanh miễn phí của YouTube. Nếu muốn dùng bài hát thương mại thì phải xin phép tác giả. Tuyệt đối không lấy nhạc bản quyền tuỳ ý — video có thể bị gỡ hoặc tắt tiếng.' },
    ],
  },

  'H11TIN-w33-quiz': {
    topic: 'Biên tập và xuất bản sản phẩm đa phương tiện',
    intro: 'Chào các em! Tuần cuối của mảng đa phương tiện, ta hoàn thiện sản phẩm: biên tập kỹ lưỡng, chỉnh màu, kiểm tra chất lượng và xuất bản đúng cách cho từng nền tảng — luôn tuân thủ pháp luật và đạo đức.',
    objectives: [
      'Nắm quy trình biên tập video hoàn chỉnh.',
      'Hiểu chỉnh màu (color grading) và bước kiểm tra chất lượng.',
      'Xuất bản phù hợp nhiều nền tảng và đánh giá sản phẩm.',
    ],
    theory: [
      { h: 'Quy trình biên tập' },
      { p: 'Biên tập video gồm: sắp xếp clip → chỉnh màu → thêm hiệu ứng/đồ hoạ → hoà âm (nhạc, tiếng) → kiểm thử/xem lại trước khi xuất bản.' },
      { h: 'Chỉnh màu (Color Grading)' },
      { p: 'Chỉnh màu tạo cảm xúc và sự đồng nhất hình ảnh giữa các cảnh (ví dụ tông ấm cho cảnh vui, tông lạnh cho cảnh buồn). Đây là bước nâng tầm sản phẩm.' },
      { h: 'Xuất bản đa nền tảng' },
      { ul: [
        'Mỗi nền tảng có tỉ lệ khung hình phù hợp: 16:9 (YouTube ngang), 9:16 (TikTok/Shorts dọc), 1:1 (vuông);',
        'Nên xuất nhiều phiên bản theo từng nền tảng thay vì dùng chung một tỉ lệ.',
      ] },
      { h: 'Kiểm tra chất lượng và đạo đức' },
      { ul: [
        'Trước khi xuất bản: xem lại toàn bộ, kiểm lỗi chính tả, âm lượng, ánh sáng;',
        'Tuân thủ pháp luật, bản quyền, đạo đức và quyền riêng tư khi đăng tải;',
        'Đánh giá sản phẩm theo tiêu chí: mục tiêu, nội dung, hình ảnh, âm thanh, thông điệp, kỹ thuật.',
      ] },
      { note: 'Bước kiểm tra cuối (QA) rất quan trọng: một lỗi chính tả hay âm lượng chênh lệch có thể làm hỏng ấn tượng của cả sản phẩm công phu.' },
    ],
    examples: [
      { q: 'Em làm xong một video và muốn đăng cả lên YouTube lẫn TikTok. Nên xuất thế nào?', a: 'Nên xuất hai phiên bản theo tỉ lệ phù hợp từng nền tảng: bản 16:9 (ngang) cho YouTube và bản 9:16 (dọc) cho TikTok/Shorts. Dùng chung một bản 16:9 cho TikTok sẽ để lề đen lớn, trải nghiệm kém. Tùy chỉnh bố cục cho từng tỉ lệ giúp video hiển thị đẹp ở mọi nơi.' },
      { q: 'Liệt kê các tiêu chí để tự đánh giá một sản phẩm đa phương tiện trước khi nộp.', a: 'Đánh giá theo: (1) Mục tiêu — có đạt mục đích đề ra không; (2) Nội dung — đầy đủ, chính xác, mạch lạc; (3) Hình ảnh — rõ, đẹp, đúng tông màu; (4) Âm thanh — rõ, âm lượng cân đối, nhạc hợp pháp; (5) Thông điệp — truyền tải tốt; (6) Kỹ thuật — dựng mượt, không lỗi, đúng định dạng xuất bản.' },
    ],
  },

  'H11TIN-w34-quiz': {
    topic: 'Ôn tập cuối học kì 2',
    intro: 'Các em thân mến! Học kì 2 đã trang bị cho các em kỹ năng thực hành rất giá trị: quản trị CSDL với Access, xử lý ảnh, vẽ số và làm phim. Tuần này ta hệ thống lại để chuẩn bị kiểm tra.',
    objectives: [
      'Củng cố kiến thức CSDL quan hệ, SQL và Access.',
      'Ôn lại xử lý ảnh: định dạng, raster/vector.',
      'Hệ thống kiến thức làm phim và bản quyền số.',
    ],
    theory: [
      { h: 'CSDL, SQL và Access' },
      { ul: [
        'CSDL quan hệ tổ chức theo bảng (hàng và cột);',
        'SQL: SELECT (lấy), INSERT (thêm), UPDATE...SET...WHERE (cập nhật), DELETE (xoá);',
        'Access có bốn đối tượng: Table, Query, Form, Report; sao lưu để phòng mất dữ liệu.',
      ] },
      { h: 'Xử lý ảnh và đồ hoạ' },
      { ul: [
        'Ảnh raster (pixel) vỡ khi phóng to; ảnh vector phóng to không vỡ;',
        'PNG hỗ trợ nền trong suốt; JPG nén tốt cho ảnh chụp;',
        'Inkscape (vector) và GIMP/Krita (raster) là phần mềm nguồn mở.',
      ] },
      { h: 'Làm phim và đa phương tiện' },
      { ul: [
        'Phim làm từ chuỗi khung hình, đo bằng FPS;',
        'Xuất video lên YouTube thường dùng MP4 (H.264);',
        'Luôn tôn trọng bản quyền nhạc/ảnh/video khi sản xuất nội dung.',
      ] },
      { note: 'Ôn tập bằng cách thực hành lại một thao tác nhỏ ở mỗi mảng (viết một câu SQL, chỉnh một bức ảnh, dựng một clip ngắn) sẽ ghi nhớ sâu hơn đọc lý thuyết suông.' },
    ],
    examples: [
      { q: 'Viết câu SQL cập nhật điểm trung bình của học sinh có mã HS05 thành 8.5.', a: 'UPDATE HocSinh SET DiemTB = 8.5 WHERE MaHS = \'HS05\'; — Lệnh UPDATE sửa giá trị, SET DiemTB = 8.5 đặt điểm mới, WHERE MaHS = \'HS05\' đảm bảo chỉ sửa đúng học sinh đó (không sửa cả bảng).' },
      { q: 'Phần mềm nguồn mở nào dùng để vẽ vector, và định dạng ảnh nào hỗ trợ nền trong suốt?', a: 'Phần mềm nguồn mở vẽ vector là Inkscape. Định dạng ảnh hỗ trợ nền trong suốt là PNG (nhờ kênh alpha). JPG thì không hỗ trợ nền trong suốt.' },
    ],
  },

  'H11TIN-w35-quiz': {
    topic: 'Kiểm tra cuối học kì 2 — Tổng ôn cả năm Tin 11',
    intro: 'Chào các em! Đây là tuần cuối cùng và là bài kiểm tra tổng kết cả năm. Thầy đã đồng hành cùng các em qua hệ điều hành, cơ sở dữ liệu, SQL và cả mảng đa phương tiện. Hãy bình tĩnh, vận dụng tất cả những gì đã học. Chúc các em làm bài thật tốt!',
    objectives: [
      'Vận dụng tổng hợp kiến thức cả năm vào bài kiểm tra.',
      'Làm chính xác các câu SQL và CSDL trọng tâm.',
      'Củng cố ý thức an toàn thông tin và tôn trọng bản quyền.',
    ],
    theory: [
      { h: 'Trọng tâm cốt lõi (HK1)' },
      { ul: [
        'Hệ điều hành quản lý tài nguyên và điều khiển máy tính;',
        'Khoá chính: duy nhất và khác NULL; khoá ngoài liên kết hai bảng;',
        'SQL xoá có điều kiện: DELETE FROM HocSinh WHERE Lop = \'11A\';',
        'Cloud storage: truy cập mọi nơi, đồng bộ thiết bị.',
      ] },
      { h: 'Trọng tâm ứng dụng (HK2)' },
      { ul: [
        'Access: Table, Query, Form, Report; phân quyền và sao lưu;',
        'Ảnh raster/vector; PNG nền trong suốt; MP4 cho video;',
        'Quy trình làm phim: kịch bản → storyboard → dựng → xuất bản.',
      ] },
      { h: 'An toàn và đạo đức số (xuyên suốt)' },
      { ul: [
        'Bảo vệ tài khoản: mật khẩu mạnh + xác thực 2 lớp + cảnh giác phishing;',
        'Tôn trọng bản quyền: dùng tài nguyên có giấy phép phù hợp và ghi nguồn;',
        'Ứng xử văn minh, tuân thủ pháp luật trên không gian mạng.',
      ] },
      { note: 'Đọc kỹ đề, chú ý từ phủ định, kiểm tra cú pháp SQL (dấu nháy cho chuỗi, có WHERE khi cần). Dành thời gian soát lại trước khi nộp. Chúc các em hoàn thành tốt môn Tin học 11!' },
    ],
    examples: [
      { q: 'Viết câu SQL xoá tất cả học sinh thuộc lớp 11A (giả sử bảng HocSinh đã đúng).', a: 'DELETE FROM HocSinh WHERE Lop = \'11A\'; — Lệnh DELETE xoá bản ghi, mệnh đề WHERE Lop = \'11A\' giới hạn chỉ xoá học sinh lớp 11A. Lưu ý cực kỳ quan trọng: nếu quên WHERE, lệnh sẽ xoá TOÀN BỘ bảng.' },
      { q: 'Tổng kết: nêu ba nguyên tắc bảo vệ tài khoản và dữ liệu mà em đã học cả năm.', a: 'Ba nguyên tắc: (1) Dùng mật khẩu mạnh và bật xác thực 2 lớp cho mọi tài khoản quan trọng; (2) Cảnh giác với lừa đảo phishing — không bấm link lạ, không cung cấp OTP/mật khẩu; (3) Sao lưu dữ liệu định kỳ ở nơi tách biệt (quy tắc 3-2-1) để khôi phục khi gặp sự cố như hỏng đĩa hay ransomware.' },
    ],
  },

  'H11TIN-w36-quiz': {
    topic: 'Kết thúc Tin Học 11 — Lập trình và tư duy số cho thế kỉ 21',
    intro: 'Tin Học 11 đã đưa chúng ta từ tư duy giải thuật đến lập trình có cấu trúc, từ cơ sở dữ liệu đến an toàn thông tin. Hôm nay chúng ta nhìn lại hành trình đó, nhận ra giá trị thực tiễn của từng kỹ năng và hiểu tại sao tư duy lập trình là một trong những kỹ năng quan trọng nhất của thế kỉ 21.',
    objectives: [
      'Hệ thống hoá các chủ đề Tin Học 11: lập trình, CSDL, mạng máy tính, an toàn thông tin.',
      'Kết nối kỹ năng lập trình với nghề nghiệp và cuộc sống trong thế giới số.',
      'Hiểu định hướng học tiếp: Tin Học 12 và con đường vào đại học ngành CNTT.',
    ],
    theory: [
      { h: 'Bức tranh Tin Học 11 — những gì đã học' },
      { ul: [
        'Lập trình có cấu trúc: kiểu dữ liệu, biểu thức, câu lệnh rẽ nhánh (if-else), vòng lặp (for/while), thủ tục/hàm (function), mảng, xâu kí tự.',
        'Cơ sở dữ liệu: mô hình quan hệ, bảng/trường/khoá chính, SQL cơ bản (SELECT-FROM-WHERE, INSERT, UPDATE, DELETE).',
        'Mạng máy tính: giao thức TCP/IP, mô hình OSI, địa chỉ IP/subnet, các dịch vụ mạng (HTTP, DNS, FTP).',
        'An toàn thông tin: mã hoá đối xứng/bất đối xứng, phishing, ransomware, mật khẩu mạnh, xác thực 2 lớp.',
      ] },
      { h: 'Tư duy lập trình — kỹ năng sống' },
      { ul: [
        'Phân rã vấn đề (decomposition): chia bài toán lớn thành các bài nhỏ dễ giải — áp dụng được trong mọi lĩnh vực.',
        'Nhận diện mẫu (pattern recognition): tìm cấu trúc lặp lại để viết vòng lặp và hàm hiệu quả.',
        'Tư duy giải thuật (algorithmic thinking): từng bước cụ thể, có thể kiểm tra — không mơ hồ.',
        'Debug (gỡ lỗi): kiên nhẫn tìm và sửa lỗi — kỹ năng này cực kỳ giá trị trong mọi công việc đòi hỏi chính xác.',
      ] },
      { h: 'Con đường phía trước' },
      { ul: [
        'Tin Học 12: ứng dụng CNTT trong các lĩnh vực — thiết kế, truyền thông, quản lý, AI; định hướng nghề nghiệp.',
        'Đại học ngành CNTT/Kỹ thuật phần mềm: tiếp tục lập trình với Python, Java, C++ ở trình độ cao hơn.',
        'Học thêm hè: Python (miễn phí trên Coursera/YouTube), HTML+CSS (web cơ bản), tham gia hackathon cấp trường.',
        'Chứng chỉ IT phổ biến cho HS THPT: IC3 (cơ bản), MOS (Microsoft Office), Python Essentials (Cisco).',
      ] },
      { note: 'Thế giới việc làm năm 2030 sẽ cần không phải chuyên gia lập trình — mà là người HIỂU lập trình và biết ứng dụng CNTT trong lĩnh vực của mình: bác sĩ dùng AI chẩn đoán, giáo viên dùng dữ liệu học sinh, nhà thiết kế dùng code để tự động hoá. Tin Học 11 đã trao cho em chiếc chìa khoá đó.' },
    ],
    examples: [
      { q: 'Kỹ năng lập trình nào từ Tin Học 11 hữu ích nhất trong cuộc sống hàng ngày, dù em không theo ngành CNTT?', a: 'Kỹ năng hữu ích nhất không phải viết code — mà là tư duy phân rã vấn đề. Khi gặp dự án lớn (làm luận văn, tổ chức sự kiện, quản lý nhóm), người biết chia nhỏ thành từng bước rõ ràng và kiểm tra từng bước sẽ hoàn thành tốt hơn nhiều. Kỹ năng thứ hai là debug tư duy: khi kế hoạch không chạy đúng, tìm bước nào sai thay vì bỏ cuộc — đây là tư duy có giá trị trong mọi nghề.' },
      { q: 'Nếu muốn học thêm lập trình trong hè để chuẩn bị cho đại học CNTT, em nên bắt đầu từ đâu?', a: 'Lộ trình 3 bước cho hè: (1) Python cơ bản — học qua CS50P (Harvard, miễn phí) hoặc Sololearn Python. Python dễ đọc, cộng đồng lớn và là ngôn ngữ phổ biến nhất năm 2024. (2) Luyện bài tập giải thuật trên LeetCode/HackerRank — chọn bài Easy trước. (3) Làm 1 dự án nhỏ cá nhân: chatbot đơn giản, bảng điểm tự động, game tic-tac-toe. Dự án thực tế giúp em học nhanh hơn lý thuyết 3 lần và là "portfolio" đầu tiên khi xin học bổng hoặc phỏng vấn.' },
    ],
  },
};
