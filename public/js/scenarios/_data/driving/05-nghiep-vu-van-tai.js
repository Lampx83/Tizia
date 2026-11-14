// Ngân hàng câu hỏi LÝ THUYẾT LÁI XE B2 — Chương: NGHIỆP VỤ VẬN TẢI
// Format: { t, c, q, o, a, ex }
//  t : 'Kinh doanh vận tải' | 'Quyền - nghĩa vụ' | 'Hàng hoá - hành khách'
//  c : câu điểm liệt (hầu hết false)
//  o : 4 phương án; a : chỉ số đáp án đúng (0-based); ex : giải thích

export const ITEMS = [
  // ===== Kinh doanh vận tải =====
  {
    t: 'Kinh doanh vận tải',
    c: false,
    q: 'Kinh doanh vận tải bằng xe ô tô được hiểu là gì?',
    o: [
      'Việc thực hiện ít nhất một trong các công đoạn chính của hoạt động vận tải (trực tiếp điều hành phương tiện, lái xe hoặc quyết định giá cước) để vận chuyển hành khách, hàng hoá trên đường bộ nhằm mục đích sinh lợi',
      'Chỉ là việc lái xe chở người thân, bạn bè không thu tiền',
      'Việc tự lái xe của cá nhân để đi lại hằng ngày',
      'Việc mua bán xe ô tô để kiếm lời'
    ],
    a: 0,
    ex: 'Kinh doanh vận tải bằng ô tô là việc thực hiện ít nhất một công đoạn chính của hoạt động vận tải nhằm mục đích sinh lợi (vận chuyển hành khách, hàng hoá có thu tiền).'
  },
  {
    t: 'Kinh doanh vận tải',
    c: false,
    q: 'Hoạt động vận tải đường bộ được phân loại như thế nào?',
    o: [
      'Chỉ có vận tải hành khách',
      'Chỉ có vận tải hàng hoá',
      'Gồm hoạt động vận tải không kinh doanh và hoạt động kinh doanh vận tải bằng xe ô tô',
      'Chỉ gồm vận tải nội tỉnh'
    ],
    a: 2,
    ex: 'Hoạt động vận tải đường bộ gồm hai nhóm: vận tải không kinh doanh và kinh doanh vận tải bằng xe ô tô.'
  },
  {
    t: 'Kinh doanh vận tải',
    c: false,
    q: 'Kinh doanh vận tải hành khách bằng xe ô tô gồm các loại hình nào sau đây?',
    o: [
      'Tuyến cố định, xe buýt, taxi, xe hợp đồng và xe du lịch',
      'Chỉ có xe taxi',
      'Chỉ có xe buýt nội thành',
      'Chỉ có xe khách tuyến cố định liên tỉnh'
    ],
    a: 0,
    ex: 'Kinh doanh vận tải hành khách gồm: tuyến cố định, xe buýt theo tuyến cố định, taxi, xe hợp đồng và vận tải khách du lịch.'
  },
  {
    t: 'Kinh doanh vận tải',
    c: false,
    q: 'Đơn vị kinh doanh vận tải bằng xe ô tô phải có loại giấy phép nào để được hoạt động?',
    o: [
      'Giấy phép kinh doanh vận tải bằng xe ô tô do cơ quan có thẩm quyền cấp',
      'Chỉ cần giấy đăng ký xe',
      'Chỉ cần giấy phép lái xe của tài xế',
      'Không cần giấy phép nào'
    ],
    a: 0,
    ex: 'Đơn vị kinh doanh vận tải bằng ô tô phải được cấp Giấy phép kinh doanh vận tải bằng xe ô tô mới được hoạt động.'
  },
  {
    t: 'Kinh doanh vận tải',
    c: false,
    q: 'Xe ô tô kinh doanh vận tải hành khách (trừ xe buýt, taxi) khi hoạt động phải dán phù hiệu, biển hiệu như thế nào?',
    o: [
      'Không cần dán gì',
      'Phải được cấp và dán phù hiệu hoặc biển hiệu theo quy định trên kính xe',
      'Chỉ cần dán logo của hãng',
      'Chỉ dán khi chạy tuyến liên tỉnh'
    ],
    a: 1,
    ex: 'Xe kinh doanh vận tải phải được cấp và dán phù hiệu/biển hiệu theo quy định để cơ quan chức năng nhận biết và quản lý.'
  },
  {
    t: 'Kinh doanh vận tải',
    c: false,
    q: 'Niên hạn sử dụng đối với xe ô tô chở người (trên 9 chỗ) tham gia kinh doanh vận tải là bao nhiêu năm?',
    o: ['Không quá 15 năm', 'Không quá 20 năm', 'Không quá 25 năm', 'Không giới hạn'],
    a: 1,
    ex: 'Theo quy định, xe ô tô chở người trên 9 chỗ có niên hạn sử dụng không quá 20 năm (tính từ năm sản xuất).'
  },
  {
    t: 'Kinh doanh vận tải',
    c: false,
    q: 'Niên hạn sử dụng đối với xe ô tô chở hàng (xe tải) là bao nhiêu năm?',
    o: ['Không quá 15 năm', 'Không quá 20 năm', 'Không quá 25 năm', 'Không giới hạn'],
    a: 2,
    ex: 'Xe ô tô tải có niên hạn sử dụng không quá 25 năm tính từ năm sản xuất.'
  },
  {
    t: 'Kinh doanh vận tải',
    c: false,
    q: 'Xe taxi chở khách bắt buộc phải có thiết bị nào để tính tiền cước theo quãng đường?',
    o: [
      'Đồng hồ tính tiền (taximet) hoặc phần mềm tính tiền theo quy định',
      'Không cần thiết bị gì, tự thoả thuận giá',
      'Chỉ cần một chiếc đồng hồ đeo tay',
      'Chỉ cần máy tính cá nhân'
    ],
    a: 0,
    ex: 'Xe taxi phải gắn đồng hồ tính tiền (taximet) hoặc sử dụng phần mềm tính tiền được kết nối, niêm yết theo quy định.'
  },

  // ===== Thiết bị giám sát hành trình & giấy tờ =====
  {
    t: 'Kinh doanh vận tải',
    c: false,
    q: 'Thiết bị giám sát hành trình (GSHT) lắp trên xe kinh doanh vận tải dùng để làm gì?',
    o: [
      'Để nghe nhạc và xem phim cho tài xế',
      'Để ghi, lưu trữ và truyền dữ liệu về hành trình, tốc độ, thời gian lái xe nhằm phục vụ quản lý vận tải',
      'Để định vị tìm bạn bè',
      'Để thay thế cho gương chiếu hậu'
    ],
    a: 1,
    ex: 'Thiết bị GSHT ghi nhận và truyền dữ liệu hành trình, tốc độ, số lần/thời gian dừng đỗ, thời gian lái xe liên tục... phục vụ công tác quản lý vận tải và an toàn giao thông.'
  },
  {
    t: 'Kinh doanh vận tải',
    c: false,
    q: 'Xe ô tô kinh doanh vận tải khi tham gia giao thông bắt buộc phải lắp thiết bị nào sau đây?',
    o: [
      'Thiết bị giám sát hành trình hợp quy còn hoạt động bình thường',
      'Loa phát thanh công suất lớn',
      'Hệ thống đèn nháy trang trí',
      'Camera giải trí cho hành khách'
    ],
    a: 0,
    ex: 'Xe kinh doanh vận tải bắt buộc lắp thiết bị giám sát hành trình bảo đảm tình trạng kỹ thuật tốt và truyền dữ liệu liên tục về hệ thống.'
  },
  {
    t: 'Kinh doanh vận tải',
    c: false,
    q: 'Người lái xe kinh doanh vận tải khi điều khiển phương tiện phải mang theo những giấy tờ nào?',
    o: [
      'Chỉ cần giấy phép lái xe',
      'Giấy phép lái xe, giấy đăng ký xe, giấy chứng nhận kiểm định, bảo hiểm bắt buộc và giấy tờ liên quan đến hàng hoá/hành khách (lệnh vận chuyển, hợp đồng...)',
      'Chỉ cần căn cước công dân',
      'Không cần mang giấy tờ gì'
    ],
    a: 1,
    ex: 'Ngoài giấy tờ của người và xe, lái xe kinh doanh vận tải còn phải mang theo giấy tờ liên quan đến hoạt động vận tải như lệnh vận chuyển, hợp đồng, danh sách hành khách, giấy vận tải/hoá đơn hàng hoá.'
  },
  {
    t: 'Hàng hoá - hành khách',
    c: false,
    q: 'Khi vận chuyển hành khách theo tuyến cố định, lái xe phải mang theo giấy tờ đặc thù nào?',
    o: [
      'Lệnh vận chuyển và danh sách hành khách theo quy định',
      'Sổ tay cá nhân',
      'Bản đồ du lịch',
      'Không cần giấy tờ gì thêm'
    ],
    a: 0,
    ex: 'Vận tải khách tuyến cố định yêu cầu lái xe mang theo lệnh vận chuyển hợp lệ và danh sách hành khách (đối với một số loại hình) để phục vụ kiểm tra.'
  },
  {
    t: 'Hàng hoá - hành khách',
    c: false,
    q: 'Khi vận chuyển hàng hoá, lái xe hoặc người áp tải cần có giấy tờ gì để chứng minh nguồn gốc, khối lượng hàng?',
    o: [
      'Không cần giấy tờ gì',
      'Giấy vận tải (giấy vận chuyển) và hoá đơn, chứng từ liên quan đến hàng hoá',
      'Chỉ cần ảnh chụp hàng hoá',
      'Chỉ cần lời nói của chủ hàng'
    ],
    a: 1,
    ex: 'Vận chuyển hàng hoá phải có giấy vận tải kèm hoá đơn, chứng từ hợp pháp thể hiện loại hàng, khối lượng, nơi đi, nơi đến.'
  },

  // ===== Hợp đồng vận tải =====
  {
    t: 'Hàng hoá - hành khách',
    c: false,
    q: 'Hợp đồng vận tải hành khách, hàng hoá được hiểu là gì?',
    o: [
      'Là sự thoả thuận giữa các bên về việc vận chuyển hành khách, hàng hoá; xác định quyền và nghĩa vụ của các bên',
      'Là tờ vé xe đơn thuần',
      'Là biên bản xử phạt',
      'Là giấy đăng ký kinh doanh'
    ],
    a: 0,
    ex: 'Hợp đồng vận tải là thoả thuận giữa đơn vị vận tải với khách/chủ hàng, xác định quyền và nghĩa vụ của các bên, theo đó bên vận tải vận chuyển và bên thuê trả cước.'
  },
  {
    t: 'Hàng hoá - hành khách',
    c: false,
    q: 'Đối với xe ô tô vận tải hành khách theo hợp đồng, trước khi thực hiện chuyến đi đơn vị vận tải phải làm gì?',
    o: [
      'Tự ý gom khách dọc đường',
      'Cung cấp đầy đủ thông tin hợp đồng vận chuyển và không được đón thêm khách ngoài danh sách, ngoài hành trình đã ký',
      'Bán vé như xe tuyến cố định',
      'Chở càng nhiều khách càng tốt'
    ],
    a: 1,
    ex: 'Xe hợp đồng phải có hợp đồng vận chuyển, thông báo thông tin theo quy định và không được đón, trả khách ngoài danh sách/hành trình như xe tuyến cố định ("xe dù", "trá hình").'
  },

  // ===== Quá tải, quá số người =====
  {
    t: 'Hàng hoá - hành khách',
    c: false,
    q: 'Người lái xe ô tô chở hàng có được phép chở quá tải trọng cho phép của xe hay không?',
    o: [
      'Được, nếu hàng nhẹ',
      'Không được; chở hàng vượt quá khối lượng cho phép tham gia giao thông là hành vi bị nghiêm cấm và bị xử phạt',
      'Được, nếu quãng đường ngắn',
      'Được, nếu chủ hàng đồng ý'
    ],
    a: 1,
    ex: 'Chở hàng vượt quá khối lượng cho phép (quá tải) làm hư hỏng cầu đường và mất an toàn, bị nghiêm cấm và xử phạt theo mức độ vi phạm.'
  },
  {
    t: 'Hàng hoá - hành khách',
    c: false,
    q: 'Người lái xe ô tô chở khách có được chở quá số người quy định hay không?',
    o: [
      'Được, nếu khách tự nguyện đứng',
      'Không được chở quá số người quy định cho phép của xe',
      'Được, nếu là dịp lễ tết đông khách',
      'Được, nếu đi quãng đường ngắn'
    ],
    a: 1,
    ex: 'Chở quá số người quy định gây mất an toàn, là hành vi bị cấm và bị xử phạt; trên một số tuyến/loại xe còn bị xử lý nghiêm hơn.'
  },
  {
    t: 'Hàng hoá - hành khách',
    c: false,
    q: 'Khi xếp hàng hoá lên xe ô tô tải, người lái xe phải bảo đảm yêu cầu nào?',
    o: [
      'Xếp càng cao càng tốt để chở nhiều',
      'Xếp hàng đúng tải trọng, đúng kích thước cho phép, chằng buộc chắc chắn, không rơi vãi và bảo đảm an toàn khi vận chuyển',
      'Không cần chằng buộc nếu hàng nặng',
      'Có thể để hàng nhô ra hai bên thoải mái'
    ],
    a: 1,
    ex: 'Hàng hoá phải xếp đúng tải trọng và kích thước giới hạn xếp hàng, được chằng buộc chắc chắn, không gây rơi vãi, không che khuất tầm nhìn và bảo đảm an toàn.'
  },
  {
    t: 'Hàng hoá - hành khách',
    c: false,
    q: 'Khi vận chuyển hàng hoá nguy hiểm (chất dễ cháy, nổ, độc hại...), yêu cầu nào sau đây là bắt buộc?',
    o: [
      'Chở chung với hành khách cho tiết kiệm',
      'Phải có giấy phép vận chuyển hàng nguy hiểm, người lái xe và xe đáp ứng điều kiện theo quy định',
      'Không cần thủ tục gì đặc biệt',
      'Chỉ cần che bạt là đủ'
    ],
    a: 1,
    ex: 'Vận chuyển hàng nguy hiểm phải có giấy phép, phương tiện đạt yêu cầu, người lái xe/áp tải được tập huấn và tuân thủ quy định riêng về an toàn.'
  },

  // ===== Trách nhiệm người lái xe / quyền nghĩa vụ với hành khách =====
  {
    t: 'Quyền - nghĩa vụ',
    c: false,
    q: 'Trách nhiệm của người lái xe kinh doanh vận tải hành khách đối với hành khách là gì?',
    o: [
      'Bảo đảm an toàn, đón trả khách đúng nơi quy định, đối xử văn minh lịch sự và giúp đỡ hành khách đi xe',
      'Chỉ cần lái xe đến nơi, không quan tâm khách',
      'Được phép từ chối mọi hành khách tuỳ thích',
      'Chỉ phục vụ khách quen'
    ],
    a: 0,
    ex: 'Lái xe vận tải khách phải bảo đảm an toàn, đón/trả khách đúng nơi quy định, có thái độ văn minh, lịch sự, hướng dẫn và giúp đỡ hành khách, nhất là người khuyết tật, người già, trẻ em, phụ nữ có thai.'
  },
  {
    t: 'Quyền - nghĩa vụ',
    c: false,
    q: 'Người lái xe kinh doanh vận tải khách có được phép từ chối chuyên chở đối tượng nào sau đây?',
    o: [
      'Người già và trẻ em',
      'Người khuyết tật',
      'Hành khách có hành vi gây mất an ninh, trật tự, mang theo hàng cấm hoặc hàng nguy hiểm trái quy định trên xe khách',
      'Phụ nữ có thai'
    ],
    a: 2,
    ex: 'Lái xe được từ chối/đình chỉ chuyên chở hành khách gây rối, mất an toàn hoặc mang theo hàng cấm, hàng nguy hiểm; ngược lại phải ưu tiên giúp đỡ người già, trẻ em, người khuyết tật, phụ nữ có thai.'
  },
  {
    t: 'Quyền - nghĩa vụ',
    c: false,
    q: 'Quy định về thời gian lái xe liên tục và thời gian làm việc trong ngày của người lái xe ô tô kinh doanh vận tải như thế nào?',
    o: [
      'Lái xe bao lâu tuỳ thích',
      'Không lái xe liên tục quá 4 giờ và không làm việc quá 10 giờ trong một ngày',
      'Được lái liên tục 8 giờ không nghỉ',
      'Được làm việc 16 giờ mỗi ngày'
    ],
    a: 1,
    ex: 'Người lái xe ô tô kinh doanh vận tải không được lái xe liên tục quá 4 giờ và không làm việc quá 10 giờ trong một ngày để bảo đảm sức khoẻ, tránh buồn ngủ gây tai nạn.'
  },
  {
    t: 'Quyền - nghĩa vụ',
    c: false,
    q: 'Khi xảy ra tai nạn giao thông, người lái xe kinh doanh vận tải có trách nhiệm gì?',
    o: [
      'Bỏ chạy để tránh liên luỵ',
      'Dừng xe, giữ nguyên hiện trường, cấp cứu người bị nạn, bảo vệ tài sản và báo cho cơ quan công an, đơn vị vận tải',
      'Chỉ lo cho xe của mình',
      'Thoả thuận riêng rồi đi tiếp'
    ],
    a: 1,
    ex: 'Lái xe phải dừng xe, giữ nguyên hiện trường, cấp cứu người bị nạn, bảo vệ hiện trường và tài sản, báo cơ quan công an; nghiêm cấm bỏ trốn sau khi gây tai nạn.'
  },
  {
    t: 'Quyền - nghĩa vụ',
    c: false,
    q: 'Đối với hành lý, hàng hoá của hành khách bị mất, hư hỏng trong quá trình vận chuyển thì trách nhiệm thuộc về ai?',
    o: [
      'Hành khách tự chịu hoàn toàn',
      'Đơn vị kinh doanh vận tải (và người lái xe) phải bồi thường theo quy định và theo hợp đồng vận chuyển',
      'Không ai chịu trách nhiệm',
      'Cơ quan công an chịu trách nhiệm'
    ],
    a: 1,
    ex: 'Đơn vị vận tải chịu trách nhiệm về hành lý, hàng hoá nhận chở; nếu mất mát, hư hỏng do lỗi của bên vận tải thì phải bồi thường theo hợp đồng và quy định pháp luật.'
  },
  {
    t: 'Quyền - nghĩa vụ',
    c: false,
    q: 'Người lái xe taxi, xe khách có nghĩa vụ gì về giá cước đối với hành khách?',
    o: [
      'Thu tuỳ ý theo mặt khách',
      'Thu đúng giá cước niêm yết/theo đồng hồ tính tiền, xuất hoá đơn hoặc chứng từ khi khách yêu cầu',
      'Được tự ý tăng giá vào giờ cao điểm',
      'Không cần niêm yết giá'
    ],
    a: 1,
    ex: 'Lái xe phải thu đúng giá cước đã niêm yết hoặc theo đồng hồ tính tiền, không được tự ý nâng giá, ép giá và phải cung cấp hoá đơn/chứng từ khi hành khách yêu cầu.'
  },
  {
    t: 'Quyền - nghĩa vụ',
    c: false,
    q: 'Người lái xe ô tô kinh doanh vận tải bị nghiêm cấm thực hiện hành vi nào sau đây?',
    o: [
      'Sử dụng rượu, bia, chất kích thích bị cấm khi điều khiển phương tiện',
      'Kiểm tra an toàn kỹ thuật xe trước khi khởi hành',
      'Nhắc nhở hành khách thắt dây an toàn',
      'Đón trả khách đúng nơi quy định'
    ],
    a: 0,
    ex: 'Tuyệt đối nghiêm cấm lái xe khi trong cơ thể có nồng độ cồn hoặc đã sử dụng ma tuý, chất kích thích bị cấm — đây là hành vi gây nguy hiểm nghiêm trọng và bị xử lý nặng.'
  },

  // ===== BỔ SUNG — CHỞ NGƯỜI / AN TOÀN HÀNH KHÁCH (bộ 600 câu, req #29/#33/#34) =====
  {
    t: 'Hàng hoá - hành khách',
    c: false,
    q: 'Việc chở người trên thùng xe ô tô tải được quy định như thế nào?',
    o: [
      'Không được chở người trên thùng xe, trừ những trường hợp được pháp luật cho phép',
      'Được chở thoải mái nếu thùng rộng',
      'Chỉ cấm chở người trên thùng xe vào ban đêm',
      'Tuỳ người lái xe quyết định'
    ],
    a: 0,
    ex: 'Cấm chở người trên thùng xe tải, trừ các trường hợp đặc biệt do pháp luật quy định (người áp tải hàng, lực lượng làm nhiệm vụ, cứu hộ, cứu nạn...).'
  },
  {
    t: 'Hàng hoá - hành khách',
    c: false,
    q: 'Để bảo đảm an toàn khi chở trẻ em nhỏ trên ô tô, người lái xe nên làm gì?',
    o: [
      'Sử dụng thiết bị an toàn (ghế trẻ em) phù hợp và không để trẻ nhỏ ngồi một mình ở hàng ghế trước',
      'Bế trẻ trên tay khi ngồi ghế trước',
      'Để trẻ tự do đứng, đi lại trong xe khi đang chạy',
      'Cho trẻ thò đầu, tay ra ngoài cửa sổ cho thoáng'
    ],
    a: 0,
    ex: 'Trẻ nhỏ cần dùng ghế/thiết bị an toàn phù hợp, không nên ngồi ghế trước một mình; tuyệt đối không bế trẻ khi xe chạy hay để trẻ thò người ra ngoài.'
  }
];
