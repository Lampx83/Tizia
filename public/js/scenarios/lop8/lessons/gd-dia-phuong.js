// ============================================================
// Lớp 8 · Giáo dục địa phương Hà Nội — Lý thuyết + Ví dụ 35 tuần (GDPT 2018)
// Hà Nội nửa cuối XIX - đầu XX · Văn hoá · Đô thị hiện đại.
// Key: "S8GDDP-wNN-quiz".
// ============================================================

const L = (topic, intro, objectives, theory, examples) => ({ topic, intro, objectives, theory, examples });

export const S8GDDP_LESSONS = {
  'S8GDDP-w01-quiz': L(
    'Hà Nội trước năm 1873 — Thành Hà Nội thời Nguyễn',
    'Các em ơi, mở đầu chương trình lớp 8, cô trò ta lùi về Hà Nội đầu thế kỉ XIX — khi Thăng Long không còn là kinh đô, nhưng vẫn là trung tâm lớn nhất Bắc Kỳ với một toà thành kiểu Vauban độc đáo.',
    [
      'Trình bày được vị trí, vai trò của Hà Nội đầu thời Nguyễn.',
      'Mô tả được kiến trúc thành Hà Nội kiểu Vauban.',
      'Hiểu nét đời sống kinh tế — văn hoá của đất Kinh kỳ trước khi Pháp xâm chiếm.',
    ],
    [
      { h: 'Từ Thăng Long đến Hà Nội' },
      { p: 'Năm 1802, vua Gia Long lập triều Nguyễn, chọn Phú Xuân (Huế) làm kinh đô. Thăng Long mất vai trò kinh đô, hạ xuống thành trị sở của Bắc Thành (sau là tỉnh). Năm 1831, vua Minh Mạng cải cách hành chính, lập tỉnh Hà Nội — cái tên "Hà Nội" (vùng đất bên trong các con sông) chính thức ra đời từ đây.' },
      { h: 'Vị trí và vai trò' },
      { p: 'Tuy không còn là kinh đô, Hà Nội vẫn là đô thị lớn nhất, đông dân nhất Bắc Kỳ, là đầu mối buôn bán và là trung tâm hành chính — quân sự cho cả vùng đồng bằng Bắc Bộ.' },
      { h: 'Thành Hà Nội kiểu Vauban' },
      { p: 'Năm 1805, vua Gia Long cho xây lại thành Hà Nội theo kiểu Vauban — một kiểu thành luỹ quân sự của kĩ sư Pháp Sébastien Vauban, đặc trưng bởi tường thành thấp mà dày, có hào nước bao quanh và các pháo đài góc nhô ra để bắn chéo cánh sẻ.' },
      { ul: [
        'Bình đồ gần vuông, mỗi cạnh khoảng 1km, chu vi hơn 5km.',
        'Có 5 cửa: Đông, Tây, Nam, Bắc và Đông Nam.',
        'Bên trong có hành cung, Kỳ đài (Cột Cờ, xây 1812), điện Kính Thiên — nơi vua ngự khi Bắc tuần.',
        'Là trung tâm chỉ huy quân sự và hành chính của toàn Bắc Kỳ.',
      ] },
      { h: 'Đời sống kinh tế — văn hoá' },
      { ul: [
        'Khu "36 phố phường" buôn bán sầm uất bên ngoài thành.',
        'Nho sĩ, quan lại, thợ thủ công, thương nhân tập trung đông.',
        'Vẫn giữ nếp sống "Kinh kỳ — kẻ chợ" thanh lịch, hiếu học.',
      ] },
      { note: 'Cột Cờ Hà Nội (xây 1812) là một trong số ít công trình của thành cổ còn nguyên vẹn đến nay — nay nằm trong khuôn viên Bảo tàng Lịch sử Quân sự Việt Nam.' },
    ],
    [
      { q: 'Vì sao đến năm 1831 vùng đất Thăng Long mới mang tên "Hà Nội"?', a: 'Năm 1831, vua Minh Mạng tiến hành cải cách hành chính, chia cả nước thành các tỉnh và lập tỉnh Hà Nội. "Hà" là sông, "Nội" là bên trong — tên gọi chỉ vùng đất nằm giữa sông Hồng và sông Đáy.' },
      { q: 'Thành Hà Nội được xây theo kiểu nào và đặc điểm là gì?', a: 'Xây năm 1805 theo kiểu Vauban (kiểu thành luỹ quân sự của Pháp): tường thấp nhưng dày, hào nước bao quanh, có 5 cửa và các pháo đài góc để phòng thủ — khác hẳn thành cao kiểu phương Đông truyền thống.' },
      { q: 'Vì sao nói Hà Nội đầu thời Nguyễn tuy mất ngôi kinh đô nhưng vẫn là trung tâm Bắc Kỳ?', a: 'Vì Hà Nội vẫn đông dân nhất, buôn bán sầm uất nhất với "36 phố phường", là đầu mối giao thông và là trung tâm hành chính — quân sự chỉ huy cả vùng đồng bằng Bắc Bộ.' },
    ]
  ),

  'S8GDDP-w02-quiz': L(
    'Pháp xâm chiếm Hà Nội lần thứ nhất (1873) — Nguyễn Tri Phương',
    'Các em ạ, năm 1873 lần đầu tiên gót giày thực dân Pháp giẫm lên thành Hà Nội. Trận chiến chỉ kéo dài vài giờ nhưng để lại một tấm gương khí tiết sáng ngời: Tổng đốc Nguyễn Tri Phương.',
    [
      'Trình bày được bối cảnh và nguyên cớ Pháp đánh Bắc Kỳ lần thứ nhất.',
      'Thuật lại diễn biến trận đánh thành Hà Nội năm 1873.',
      'Phân tích được khí tiết của Tổng đốc Nguyễn Tri Phương và ý nghĩa chiến thắng Cầu Giấy.',
    ],
    [
      { h: 'Bối cảnh' },
      { p: 'Năm 1867, Pháp đã chiếm trọn 6 tỉnh Nam Kỳ. Tham vọng tiếp theo của chúng là mở đường buôn bán lên Vân Nam (Trung Quốc) qua sông Hồng và biến Bắc Kỳ thành thuộc địa.' },
      { h: 'Nguyên cớ "vụ Jean Dupuis"' },
      { p: 'Lái buôn Pháp Jean Dupuis tự ý chở vũ khí, muối qua sông Hồng lên Vân Nam, gây xung đột với quan lại nhà Nguyễn. Lấy cớ "dàn xếp", Thống đốc Nam Kỳ phái đại uý Francis Garnier ra Hà Nội — nhưng thực chất là để đánh chiếm.' },
      { h: 'Diễn biến (20/11/1873)' },
      { ul: [
        'Sáng 20/11/1873, Garnier chỉ huy khoảng 200 quân Pháp nổ súng đánh thành Hà Nội.',
        'Quân triều đình đông hơn nhiều nhưng vũ khí lạc hậu, bị động.',
        'Pháp dùng pháo bắn phá cửa Đông Nam, sau ít giờ thì hạ được thành.',
        'Chỉ trong khoảng 3 tuần, Pháp đánh chiếm thêm Hưng Yên, Phủ Lý, Hải Dương, Ninh Bình, Nam Định.',
      ] },
      { h: 'Tổng đốc Nguyễn Tri Phương (1800–1873)' },
      { p: 'Nguyễn Tri Phương quê Thừa Thiên, là vị tướng lừng danh từng chỉ huy chống Pháp ở Đà Nẵng (1858) và Gia Định. Năm 1873 ông đã 73 tuổi, giữ chức Tổng đốc Hà Nội. Trong trận đánh, ông bị trọng thương ở bụng, con trai là phò mã Nguyễn Lâm tử trận.' },
      { ul: [
        'Bị Pháp bắt, ông kiên quyết từ chối để chúng chữa trị.',
        'Ông nhịn ăn (tuyệt thực) gần một tháng rồi qua đời để giữ trọn khí tiết.',
      ] },
      { h: 'Chiến thắng Cầu Giấy lần thứ nhất (21/12/1873)' },
      { p: 'Quân ta phối hợp với đội quân Cờ đen của Lưu Vĩnh Phúc phục kích tại Cầu Giấy, giết chết Francis Garnier. Chiến thắng làm nức lòng nhân dân, buộc Pháp phải tạm rút.' },
      { note: 'Tương truyền câu nói khẳng khái của Nguyễn Tri Phương: "Bây giờ nếu ta chỉ gắng lay lắt mà sống, sao bằng thung dung chết vì việc nghĩa."' },
    ],
    [
      { q: 'Pháp lấy cớ gì để đánh thành Hà Nội năm 1873?', a: 'Lấy cớ ra "dàn xếp" vụ lái buôn Jean Dupuis gây rối trên sông Hồng, Pháp phái Francis Garnier ra Hà Nội, nhưng thực chất là để đánh chiếm Bắc Kỳ — mở đường buôn bán lên Vân Nam.' },
      { q: 'Em hãy phân tích khí tiết của Tổng đốc Nguyễn Tri Phương.', a: 'Dù đã 73 tuổi, ông trực tiếp chỉ huy giữ thành, bị thương nặng vẫn không đầu hàng. Khi bị bắt, ông từ chối để Pháp chữa trị và tuyệt thực gần một tháng để chết, không chịu sống nhục — đó là tấm gương "chết vì việc nghĩa" sáng ngời.' },
      { q: 'Chiến thắng Cầu Giấy lần thứ nhất có ý nghĩa gì?', a: 'Quân ta cùng quân Cờ đen phục kích, giết chết chủ tướng Francis Garnier, khiến Pháp hoang mang phải tạm rút. Chiến thắng cổ vũ tinh thần kháng chiến và chứng tỏ nhân dân Bắc Kỳ không hề khuất phục.' },
    ]
  ),

  'S8GDDP-w03-quiz': L(
    'Pháp xâm chiếm Hà Nội lần thứ hai (1882) — Hoàng Diệu',
    'Chín năm sau, năm 1882, Pháp quay lại đánh thành Hà Nội lần thứ hai. Một lần nữa, vị Tổng đốc giữ thành — Hoàng Diệu — đã chọn cái chết để giữ tròn danh dự.',
    [
      'Trình bày diễn biến Pháp đánh thành Hà Nội lần thứ hai (1882).',
      'Phân tích khí tiết của Tổng đốc Hoàng Diệu qua "Di biểu".',
      'Hiểu hệ quả: Hiệp ước Hácmăng 1883 và nền bảo hộ của Pháp.',
    ],
    [
      { h: 'Bối cảnh' },
      { p: 'Sau khi tạm lui, Pháp vẫn nuôi ý đồ chiếm Bắc Kỳ. Năm 1882, lấy cớ triều đình Huế "vi phạm Hiệp ước 1874" và bảo vệ buôn bán, Pháp lại đưa quân ra Hà Nội.' },
      { h: 'Diễn biến (25/4/1882)' },
      { ul: [
        'Sáng 25/4/1882, đại tá Henri Rivière gửi tối hậu thư đòi Tổng đốc Hoàng Diệu nộp thành.',
        'Không đợi trả lời, Pháp nổ súng tấn công.',
        'Quân triều đình chống cự quyết liệt nhưng vũ khí thua kém; kho thuốc súng trong thành phát nổ gây hoảng loạn.',
        'Sau khoảng nửa ngày, thành Hà Nội thất thủ.',
      ] },
      { h: 'Tổng đốc Hoàng Diệu (1829–1882)' },
      { p: 'Hoàng Diệu quê Quảng Nam, đỗ Phó bảng, là vị quan thanh liêm, cương trực. Khi thành mất, ông không chịu rơi vào tay giặc: ông vào Võ miếu (trong thành), thắt cổ tự vẫn để giữ trọn khí tiết của bậc trung thần.' },
      { ul: [
        'Trước khi mất, ông để lại "Di biểu" (tờ biểu tạ tội gửi vua), nhận trách nhiệm để mất thành.',
        'Nhân dân Hà Nội lập đền thờ ông; tên ông được đặt cho con phố ngay sát Hoàng thành Thăng Long.',
      ] },
      { h: 'Chiến thắng Cầu Giấy lần thứ hai (19/5/1883)' },
      { p: 'Một lần nữa, quân Cờ đen của Lưu Vĩnh Phúc phục kích tại Cầu Giấy, giết chết chủ tướng Henri Rivière — lặp lại số phận của Garnier mười năm trước.' },
      { h: 'Hệ quả: nền bảo hộ' },
      { p: 'Dù thắng ở Cầu Giấy, triều đình Huế nhu nhược. Năm 1883, sau khi vua Tự Đức mất, triều đình kí Hiệp ước Hácmăng (Harmand), thừa nhận quyền bảo hộ của Pháp ở Bắc Kỳ và Trung Kỳ — Việt Nam mất độc lập, trở thành thuộc địa.' },
      { note: 'Phố Hoàng Diệu hôm nay chạy dọc khu khảo cổ 18 Hoàng Diệu của Hoàng thành Thăng Long — gắn tên người anh hùng với chính nơi ông đã hi sinh.' },
    ],
    [
      { q: 'Pháp đánh thành Hà Nội lần thứ hai năm nào, ai chỉ huy?', a: 'Năm 1882, do đại tá Henri Rivière chỉ huy. Sau khi gửi tối hậu thư, Pháp nổ súng và hạ thành chỉ trong khoảng nửa ngày.' },
      { q: 'Vì sao Tổng đốc Hoàng Diệu được nhân dân tôn kính?', a: 'Vì ông là quan thanh liêm, cương trực, đã quyết tử giữ thành. Khi thành mất, ông thắt cổ tự vẫn ở Võ miếu và để lại "Di biểu" nhận trách nhiệm — chọn cái chết để giữ tròn danh dự bề tôi, không đầu hàng giặc.' },
      { q: 'Hệ quả của việc mất thành Hà Nội lần thứ hai là gì?', a: 'Pháp tăng cường lực lượng ở Bắc Kỳ. Năm 1883 triều đình Huế kí Hiệp ước Hácmăng, thừa nhận quyền bảo hộ của Pháp ở Bắc và Trung Kỳ — Việt Nam chính thức mất độc lập, trở thành thuộc địa.' },
    ]
  ),

  'S8GDDP-w04-quiz': L(
    'Hà Nội thời Pháp thuộc — Quy hoạch đô thị kiểu thuộc địa',
    'Khi đã làm chủ Hà Nội, người Pháp bắt tay "vẽ lại" thành phố theo kiểu phương Tây: phá thành cổ, mở đại lộ, xây công sở. Hà Nội mang một diện mạo mới — vừa hấp dẫn, vừa đầy bất công.',
    [
      'Hiểu vì sao Hà Nội trở thành thủ phủ Liên bang Đông Dương (1902).',
      'Trình bày những thay đổi trong quy hoạch đô thị kiểu thuộc địa.',
      'So sánh "khu phố Tây" và "khu phố ta" để thấy tính phân biệt của quy hoạch.',
    ],
    [
      { h: 'Hà Nội — thủ phủ Liên bang Đông Dương' },
      { p: 'Năm 1887, Pháp lập Liên bang Đông Dương (gồm Bắc Kỳ, Trung Kỳ, Nam Kỳ, Lào, Campuchia). Năm 1902, dưới thời Toàn quyền Paul Doumer, Hà Nội thay Sài Gòn trở thành thủ phủ của cả Liên bang — trung tâm đầu não cai trị toàn Đông Dương.' },
      { h: 'Phá thành cổ, mở phố mới' },
      { ul: [
        'Từ 1894–1897, Pháp phá gần hết thành Hà Nội kiểu Vauban, chỉ giữ lại Cửa Bắc và Cột Cờ làm chứng tích.',
        'Mở các đại lộ rộng, trồng cây, lát vỉa hè; đặt tên phố kiểu Pháp (như rue Paul Bert — nay là phố Tràng Tiền).',
        'Xây hệ thống cấp nước, thoát nước, đèn điện đầu tiên ở Hà Nội.',
      ] },
      { h: 'Những công trình tiêu biểu' },
      { ul: [
        'Phủ Toàn quyền Đông Dương (nay là Phủ Chủ tịch).',
        'Nhà hát Lớn, Bưu điện Bờ Hồ, Ga Hàng Cỏ.',
        'Cầu Long Biên bắc qua sông Hồng.',
        'Trường Đại học Đông Dương, Viện Viễn Đông Bác cổ.',
      ] },
      { h: '"Khu phố Tây" và "khu phố ta"' },
      { ul: [
        'Khu phố Tây (vùng Tràng Tiền, Tràng Thi, Lý Thường Kiệt): biệt thự, đại lộ rộng, vườn hoa, dành cho người Pháp và tầng lớp giàu có.',
        'Khu phố ta (36 phố phường cổ): nhà ống chật chội, ngõ nhỏ, đông đúc, là nơi ở của người Việt buôn bán, lao động.',
      ] },
      { h: 'Phong cách "Kiến trúc Đông Dương"' },
      { p: 'Những năm 1920–1930, kiến trúc sư Ernest Hébrard sáng tạo phong cách "Kiến trúc Đông Dương" — kết hợp kết cấu, vật liệu Pháp với mái ngói, con sơn, hoa văn Á Đông cho phù hợp khí hậu nhiệt đới. Tiêu biểu là Đại học Đông Dương, Bảo tàng Louis Finot.' },
      { note: 'Quy hoạch của Pháp để lại một di sản kiến trúc quý cho Hà Nội, nhưng đằng sau đó là sự phân biệt rõ rệt giữa người cai trị và người bị trị.' },
    ],
    [
      { q: 'Vì sao năm 1902 là cột mốc quan trọng với Hà Nội thời thuộc địa?', a: 'Năm 1902, Hà Nội thay Sài Gòn trở thành thủ phủ của Liên bang Đông Dương — tức trung tâm đầu não cai trị toàn bộ Việt Nam, Lào, Campuchia của thực dân Pháp.' },
      { q: 'Sau khi Pháp phá thành cổ (1894–1897), Hà Nội còn giữ lại chứng tích gì?', a: 'Còn giữ Cửa Bắc (chính Bắc Môn, trên đó vẫn in dấu đạn pháo Pháp năm 1882) và Cột Cờ Hà Nội — hai công trình của thành cổ tồn tại đến ngày nay.' },
      { q: 'Quy hoạch của Pháp thể hiện sự phân biệt như thế nào?', a: 'Pháp chia thành "khu phố Tây" với biệt thự, đại lộ, vườn hoa dành cho người Pháp và "khu phố ta" 36 phố phường chật chội dành cho người Việt — cho thấy đô thị được quy hoạch phục vụ tầng lớp cai trị là chính.' },
    ]
  ),

  'S8GDDP-w05-quiz': L(
    'Cầu Long Biên — biểu tượng kiến trúc và lịch sử Hà Nội',
    'Bắc qua sông Hồng, cây cầu thép Long Biên đã hơn trăm tuổi vẫn nằm đó — chứng nhân của bao thăng trầm lịch sử Thủ đô, từ thời thuộc địa đến hai cuộc kháng chiến.',
    [
      'Trình bày lịch sử xây dựng và đặc điểm kiến trúc cầu Long Biên.',
      'Đính chính ngộ nhận "cầu do Eiffel thiết kế".',
      'Phân tích giá trị lịch sử của cây cầu qua các thời kì.',
    ],
    [
      { h: 'Lịch sử xây dựng' },
      { ul: [
        'Khởi công năm 1898, hoàn thành năm 1902, dưới thời Toàn quyền Paul Doumer.',
        'Ban đầu mang tên "cầu Doumer"; sau Cách mạng Tháng Tám 1945 đổi thành cầu Long Biên.',
        'Là cây cầu thép lớn đầu tiên bắc qua sông Hồng, dài khoảng 1.680 m, từng thuộc hàng cầu dài bậc nhất châu Á thời đó.',
      ] },
      { h: 'Ai thiết kế cầu?' },
      { p: 'Nhiều người lầm tưởng cầu do Gustave Eiffel (tác giả Tháp Eiffel) thiết kế. Thực ra cầu do hãng Daydé & Pillé của Pháp thiết kế và thi công. Sự nhầm lẫn này rất phổ biến, các em cần nhớ cho đúng.' },
      { h: 'Đặc điểm kiến trúc' },
      { ul: [
        'Kết cấu dầm thép, gồm 19 nhịp dầm thép đặt trên 20 trụ.',
        'Tuyến đường sắt chạy ở giữa, hai bên là đường cho xe thô sơ và người đi bộ.',
        'Các nhịp dầm hình "rồng cong" đặc trưng, mang nét thẩm mỹ của kĩ thuật đầu thế kỉ XX.',
      ] },
      { h: 'Chứng nhân lịch sử' },
      { ul: [
        'Là tuyến giao thông huyết mạch nối Hà Nội với Hải Phòng, Lào Cai, Lạng Sơn.',
        'Trong kháng chiến chống Mỹ (1965–1972), cầu nhiều lần bị bom đánh sập từng nhịp.',
        'Bộ đội và nhân dân vừa bảo vệ vừa sửa cầu để giữ mạch giao thông.',
      ] },
      { h: 'Cầu Long Biên hôm nay' },
      { p: 'Do bom đạn, nhiều nhịp nguyên bản đã mất, chỉ còn một số nhịp dầm gốc hình "rồng cong"; phần còn lại được nối tạm. Cầu nay chỉ dành cho tàu hoả, xe máy, xe đạp và người đi bộ — trở thành điểm tham quan, chụp ảnh được yêu thích.' },
      { note: 'Cầu Long Biên được ví là "tháp Eiffel nằm ngang" của Hà Nội — một di sản cần được bảo tồn và phát huy giá trị.' },
    ],
    [
      { q: 'Cầu Long Biên do ai thiết kế, có phải Gustave Eiffel không?', a: 'Không phải. Cầu do hãng Daydé & Pillé (Pháp) thiết kế và thi công, không phải Gustave Eiffel. Đây là một ngộ nhận phổ biến mà ta cần đính chính cho đúng.' },
      { q: 'Vì sao nói cầu Long Biên là "chứng nhân lịch sử"?', a: 'Vì cây cầu trải qua hơn một thế kỉ thăng trầm: là tuyến huyết mạch thời thuộc địa, bị bom Mỹ đánh phá nhiều lần trong kháng chiến chống Mỹ, được quân dân bảo vệ và sửa chữa — nó gắn liền với nhiều sự kiện lớn của Hà Nội.' },
      { q: 'Vì sao cầu Long Biên hiện nay không còn nguyên vẹn như ban đầu?', a: 'Vì trong chiến tranh chống Mỹ, nhiều nhịp cầu bị bom đánh sập; sau này chỉ còn lại một số nhịp dầm gốc hình "rồng cong", phần còn lại được nối tạm bằng các nhịp khác.' },
    ]
  ),

  'S8GDDP-w06-quiz': L(
    'Nhà hát Lớn Hà Nội — viên ngọc kiến trúc tân cổ điển',
    'Đứng ở quảng trường Cách mạng Tháng Tám, Nhà hát Lớn Hà Nội như một viên ngọc kiến trúc châu Âu giữa lòng Thủ đô — nơi từng vang lên cả tiếng nhạc opera lẫn tiếng hô cách mạng.',
    [
      'Trình bày lịch sử xây dựng và phong cách kiến trúc Nhà hát Lớn.',
      'Nhận biết Nhà hát Lớn mô phỏng Nhà hát Opéra Garnier (Paris).',
      'Phân tích vai trò văn hoá và lịch sử của công trình, đặc biệt năm 1945.',
    ],
    [
      { h: 'Lịch sử xây dựng' },
      { ul: [
        'Khởi công năm 1901, hoàn thành năm 1911 — mất tròn 10 năm.',
        'Do kiến trúc sư người Pháp Broyer, Harlay và Lagisquet thiết kế.',
        'Mô phỏng Nhà hát Opéra Garnier ở Paris, là một trong những nhà hát lớn nhất Đông Dương khi đó.',
      ] },
      { h: 'Phong cách kiến trúc' },
      { ul: [
        'Phong cách Tân cổ điển (Neoclassical) sang trọng.',
        'Mặt tiền đối xứng, có hàng cột Ionic, mái mansard kiểu Pháp.',
        'Khán phòng ban đầu khoảng 870 chỗ, có sảnh gương, cầu thang đá hoa cương, trần vẽ thủ công.',
      ] },
      { h: 'Vai trò văn hoá' },
      { p: 'Đây là nơi biểu diễn opera, hoà nhạc giao hưởng, ballet, kịch nói — điểm hẹn nghệ thuật bậc cao của Hà Nội suốt hơn một thế kỉ. Nhiều dàn nhạc và nghệ sĩ danh tiếng thế giới từng biểu diễn tại đây.' },
      { h: 'Dấu ấn lịch sử năm 1945' },
      { ul: [
        'Ngày 17/8/1945, cuộc mít tinh do chính quyền thân Nhật tổ chức trước Nhà hát Lớn đã bị Việt Minh "biến" thành cuộc tuần hành ủng hộ cách mạng.',
        'Ngày 19/8/1945, hàng vạn quần chúng tập trung trước Nhà hát Lớn rồi toả đi chiếm các công sở — mở đầu Tổng khởi nghĩa giành chính quyền ở Hà Nội.',
      ] },
      { note: 'Quảng trường trước Nhà hát Lớn nay mang tên Quảng trường Cách mạng Tháng Tám — để ghi nhớ những ngày tháng Tám lịch sử năm 1945.' },
    ],
    [
      { q: 'Nhà hát Lớn Hà Nội mô phỏng công trình nào, theo phong cách gì?', a: 'Nhà hát Lớn mô phỏng Nhà hát Opéra Garnier ở Paris, theo phong cách kiến trúc Tân cổ điển (Neoclassical) với hàng cột Ionic, mái mansard và sảnh gương sang trọng.' },
      { q: 'Sự kiện lịch sử nào gắn với Nhà hát Lớn năm 1945?', a: 'Ngày 17/8 và 19/8/1945, quảng trường trước Nhà hát Lớn là nơi diễn ra các cuộc mít tinh, tuần hành mở đầu Tổng khởi nghĩa giành chính quyền ở Hà Nội trong Cách mạng Tháng Tám.' },
      { q: 'Vì sao Nhà hát Lớn được coi là một di sản kiến trúc quý của Hà Nội?', a: 'Vì đây là công trình tân cổ điển đẹp bậc nhất Đông Dương, mất 10 năm xây dựng, là trung tâm nghệ thuật cao cấp suốt hơn một thế kỉ, đồng thời là chứng tích của Cách mạng Tháng Tám — hội tụ cả giá trị kiến trúc, văn hoá và lịch sử.' },
    ]
  ),

  'S8GDDP-w07-quiz': L(
    'Phong trào Đông Du và ảnh hưởng tới Hà Nội (1905–1909)',
    'Đầu thế kỉ XX, khi súng đạn của các phong trào cũ đã lặng, một con đường mới được mở ra: đưa thanh niên sang Nhật học để về cứu nước. Đó là phong trào Đông Du của Phan Bội Châu.',
    [
      'Trình bày chủ trương và hoạt động của phong trào Đông Du.',
      'Hiểu vai trò của Phan Bội Châu và xu hướng bạo động cứu nước.',
      'Liên hệ ảnh hưởng của phong trào tới thanh niên, sĩ phu Hà Nội.',
    ],
    [
      { h: 'Phan Bội Châu (1867–1940)' },
      { p: 'Nhà yêu nước lớn, quê Nghệ An, lãnh đạo xu hướng cứu nước bằng bạo động đầu thế kỉ XX. Ông lập Hội Duy tân (1904) rồi tổ chức phong trào Đông Du, chủ trương dựa vào Nhật Bản — một nước "đồng văn đồng chủng" vừa thắng Nga (1905) — để gây dựng lực lượng đánh Pháp.' },
      { h: 'Vì sao chọn Nhật Bản?' },
      { ul: [
        'Nhật là nước châu Á duy nhất duy tân thành công, đánh bại đế quốc Nga năm 1905.',
        'Người Nhật cùng màu da, chữ Hán — dễ học hỏi.',
        'Các sĩ phu hi vọng Nhật sẽ giúp Việt Nam giành độc lập.',
      ] },
      { h: 'Hoạt động của phong trào Đông Du (1905–1909)' },
      { ul: [
        'Đưa thanh niên Việt Nam sang Nhật học khoa học, kĩ thuật, quân sự.',
        'Lúc cao điểm có khoảng 200 du học sinh Việt Nam ở Nhật.',
        'Tổ chức tuyên truyền, vận động quyên góp tiền của trong nước, trong đó có sự đóng góp của sĩ phu, thương nhân Bắc Kỳ.',
      ] },
      { h: 'Vai trò của Hà Nội và Bắc Kỳ' },
      { p: 'Hà Nội và vùng đồng bằng Bắc Bộ là nơi tuyển chọn du học sinh, quyên góp tài chính và lan toả tư tưởng yêu nước mới. Nhiều thanh niên Hà Nội háo hức hưởng ứng phong trào.' },
      { h: 'Vì sao phong trào tan rã?' },
      { p: 'Năm 1908, do thoả thuận với Pháp, Nhật Bản trục xuất Phan Bội Châu và các du học sinh Việt Nam. Phong trào Đông Du tan rã, để lại bài học: không thể trông cậy hoàn toàn vào ngoại bang để cứu nước.' },
      { note: 'Phan Bội Châu (bạo động) và Phan Châu Trinh (cải cách ôn hoà) là hai khuynh hướng cứu nước tiêu biểu đầu thế kỉ XX — như hai cánh của một con chim yêu nước.' },
    ],
    [
      { q: 'Phong trào Đông Du do ai khởi xướng và chủ trương điều gì?', a: 'Do Phan Bội Châu khởi xướng (qua Hội Duy tân). Chủ trương đưa thanh niên Việt Nam sang Nhật Bản học khoa học, kĩ thuật, quân sự để về xây dựng lực lượng vũ trang đánh Pháp giành độc lập.' },
      { q: 'Vì sao các sĩ phu lại chọn dựa vào Nhật Bản?', a: 'Vì Nhật là nước châu Á "đồng văn đồng chủng", đã duy tân thành công và vừa đánh thắng đế quốc Nga năm 1905; các sĩ phu hi vọng Nhật sẽ giúp Việt Nam canh tân và giành độc lập.' },
      { q: 'Phong trào Đông Du tan rã để lại bài học gì?', a: 'Năm 1908, Nhật bắt tay với Pháp, trục xuất du học sinh khiến phong trào tan rã. Bài học rút ra là không thể hoàn toàn trông cậy vào sự giúp đỡ của ngoại bang để giải phóng dân tộc.' },
    ]
  ),

  'S8GDDP-w08-quiz': L(
    'Đông Kinh Nghĩa Thục tại Hà Nội (1907)',
    'Ngay giữa phố Hàng Đào, năm 1907 ra đời một ngôi trường kì lạ: dạy không lấy tiền, dạy chữ Quốc ngữ, hô hào canh tân. Tuy chỉ sống 9 tháng, Đông Kinh Nghĩa Thục đã làm rung chuyển tư tưởng cả Bắc Kỳ.',
    [
      'Trình bày sự ra đời và hoạt động của Đông Kinh Nghĩa Thục.',
      'Hiểu chủ trương duy tân: chữ Quốc ngữ, lối sống mới, dùng hàng nội.',
      'Phân tích ý nghĩa của phong trào với Hà Nội và cả nước.',
    ],
    [
      { h: 'Bối cảnh' },
      { p: 'Đầu thế kỉ XX, các sĩ phu yêu nước nhận ra muốn cứu nước phải canh tân, nâng cao dân trí. Họ học theo mô hình Khánh Ứng Nghĩa Thục của Nhật Bản — trường học mở mang dân trí, không vụ lợi.' },
      { h: 'Sự ra đời (tháng 3/1907)' },
      { ul: [
        'Trường lập tại số 4 phố Hàng Đào, Hà Nội.',
        'Người sáng lập: Lương Văn Can (làm Thục trưởng — hiệu trưởng), Nguyễn Quyền và nhiều sĩ phu yêu nước.',
        '"Nghĩa thục" nghĩa là trường tư dạy không thu học phí, vì nghĩa lớn.',
      ] },
      { h: 'Nội dung và hình thức dạy học' },
      { ul: [
        'Dạy chữ Quốc ngữ thay cho chữ Hán; dạy cả tiếng Pháp, Toán, Lịch sử, Địa lí, vệ sinh thường thức.',
        'Soạn và in sách giáo khoa, tài liệu tuyên truyền tư tưởng mới.',
        'Tổ chức diễn thuyết, bình văn để cổ động lòng yêu nước.',
      ] },
      { h: 'Vận động lối sống mới' },
      { ul: [
        'Hô hào cắt tóc ngắn, bỏ búi tó; mặc Âu phục gọn gàng.',
        'Bài trừ hủ tục, mê tín; cổ vũ vệ sinh, thể dục.',
        'Kêu gọi "dùng hàng nội hoá", chấn hưng thực nghiệp, tẩy chay hàng ngoại.',
      ] },
      { h: 'Bị Pháp đóng cửa' },
      { p: 'Lo sợ ảnh hưởng lan rộng, tháng 11/1907 thực dân Pháp ra lệnh đóng cửa trường, bắt giam nhiều người lãnh đạo. Đông Kinh Nghĩa Thục chỉ tồn tại khoảng 9 tháng.' },
      { h: 'Ý nghĩa' },
      { ul: [
        'Góp phần phổ biến chữ Quốc ngữ trong nhân dân.',
        'Khơi dậy tinh thần yêu nước, ý thức dân chủ và canh tân.',
        'Đặt nền móng cho phong trào Duy tân rộng khắp.',
      ] },
      { note: 'Hà Nội tự hào là nơi đặt Đông Kinh Nghĩa Thục — ngôi trường tuy đoản mệnh nhưng để lại tiếng vang lớn trong lịch sử tư tưởng dân tộc.' },
    ],
    [
      { q: 'Đông Kinh Nghĩa Thục được lập ở đâu, ai đứng đầu?', a: 'Trường lập tháng 3/1907 tại số 4 phố Hàng Đào, Hà Nội; do Lương Văn Can làm Thục trưởng (hiệu trưởng), cùng Nguyễn Quyền và nhiều sĩ phu yêu nước.' },
      { q: '"Nghĩa thục" có nghĩa là gì và trường dạy những gì mới?', a: '"Nghĩa thục" là trường tư dạy không thu học phí, vì nghĩa lớn. Trường dạy chữ Quốc ngữ, tiếng Pháp, Toán, Sử, Địa, vệ sinh; đồng thời cổ vũ cắt tóc ngắn, mặc Âu phục, dùng hàng nội, bài trừ hủ tục.' },
      { q: 'Tuy chỉ tồn tại 9 tháng, vì sao Đông Kinh Nghĩa Thục vẫn có ý nghĩa lớn?', a: 'Vì nó phổ biến chữ Quốc ngữ, khơi dậy tinh thần yêu nước, ý thức dân chủ và canh tân, đặt nền móng cho phong trào Duy tân lan rộng khắp cả nước.' },
    ]
  ),

  'S8GDDP-w09-quiz': L(
    'Phan Châu Trinh và xu hướng duy tân ôn hoà',
    'Cùng thời với Phan Bội Châu, một nhà yêu nước khác lại chọn con đường khác hẳn: không bạo động, mà nâng cao dân trí, dân khí, dân sinh. Đó là Phan Châu Trinh với tư tưởng "Khai dân trí, chấn dân khí, hậu dân sinh".',
    [
      'Trình bày tiểu sử và tư tưởng duy tân của Phan Châu Trinh.',
      'Phân biệt xu hướng cải cách ôn hoà (Phan Châu Trinh) với bạo động (Phan Bội Châu).',
      'Liên hệ hoạt động của ông tại Hà Nội.',
    ],
    [
      { h: 'Phan Châu Trinh (1872–1926)' },
      { p: 'Nhà nho yêu nước quê Quảng Nam, đỗ Phó bảng. Khác Phan Bội Châu chủ trương bạo động, ông chọn con đường cải cách ôn hoà: dựa vào canh tân để tự cường, phản đối ỷ lại vào ngoại bang.' },
      { h: 'Tư tưởng "Tam dân"' },
      { ul: [
        'Khai dân trí: mở mang trí tuệ, bỏ lối học cũ, học chữ Quốc ngữ và kiến thức mới.',
        'Chấn dân khí: làm cho dân có chí khí, biết quyền lợi và nghĩa vụ của mình.',
        'Hậu dân sinh: phát triển kinh tế, nâng cao đời sống nhân dân.',
      ] },
      { h: 'Chủ trương "ỷ Pháp cầu tiến bộ"' },
      { p: 'Phan Châu Trinh chủ trương dựa vào những điều "văn minh" mà người Pháp mang lại để mở mang dân trí, đòi cải cách dân chủ; ông phản đối bạo động vì cho rằng dân trí còn thấp, nóng vội sẽ thất bại. Đây là điểm khác biệt căn bản với Phan Bội Châu.' },
      { h: 'Hoạt động tại Hà Nội' },
      { ul: [
        'Tham gia diễn thuyết, cổ động duy tân ở Đông Kinh Nghĩa Thục.',
        'Viết báo, gửi thư phê phán nền cai trị hà khắc của Pháp.',
        'Năm 1908, sau phong trào chống thuế ở Trung Kỳ, ông bị Pháp bắt, đày Côn Đảo rồi sang Pháp.',
        'Năm 1925 về nước; năm 1926 qua đời, đám tang ông trở thành cuộc vận động yêu nước lớn khắp cả nước.',
      ] },
      { note: 'Phan Bội Châu và Phan Châu Trinh đều một lòng cứu nước nhưng đi hai con đường khác nhau — bạo động và cải cách — cho thấy sự phong phú của tư tưởng yêu nước đầu thế kỉ XX.' },
    ],
    [
      { q: 'Tư tưởng "Tam dân" của Phan Châu Trinh gồm những gì?', a: 'Gồm ba điều: Khai dân trí (mở mang trí tuệ), Chấn dân khí (làm dân có chí khí, ý thức quyền lợi) và Hậu dân sinh (phát triển kinh tế, nâng cao đời sống nhân dân).' },
      { q: 'Phan Châu Trinh khác Phan Bội Châu ở điểm nào căn bản?', a: 'Phan Châu Trinh chủ trương cải cách ôn hoà, dựa vào việc nâng cao dân trí, dân khí, phản đối bạo động và ỷ lại ngoại bang; còn Phan Bội Châu chủ trương bạo động, dựa vào Nhật để gây dựng lực lượng vũ trang đánh Pháp.' },
      { q: 'Vì sao đám tang Phan Châu Trinh năm 1926 trở thành sự kiện lớn?', a: 'Vì ông là nhà yêu nước được kính trọng; đám tang ông biến thành cuộc vận động yêu nước rộng khắp, thu hút đông đảo các tầng lớp, nhất là thanh niên, học sinh — thể hiện lòng dân hướng về độc lập dân tộc.' },
    ]
  ),

  'S8GDDP-w10-quiz': L(
    'Vụ Hà thành đầu độc (1908)',
    'Đêm 27/6/1908, một âm mưu táo bạo diễn ra ngay trong trại lính Pháp ở Hà Nội: những người đầu bếp Việt bỏ thuốc độc vào thức ăn của giặc. Tuy thất bại, vụ việc cho thấy lòng yêu nước âm ỉ ngay trong hàng ngũ quân địch.',
    [
      'Trình bày bối cảnh và diễn biến vụ Hà thành đầu độc.',
      'Hiểu vai trò của binh lính người Việt trong quân đội Pháp.',
      'Rút ra ý nghĩa và bài học của sự kiện.',
    ],
    [
      { h: 'Bối cảnh' },
      { p: 'Đầu thế kỉ XX, phong trào yêu nước (Đông Du, Đông Kinh Nghĩa Thục) lan rộng. Tinh thần ấy thấm cả vào binh lính người Việt trong quân đội Pháp — những người phải đi lính cho giặc nhưng vẫn nuôi lòng yêu nước.' },
      { h: 'Âm mưu khởi nghĩa' },
      { ul: [
        'Lực lượng nòng cốt là binh lính người Việt (lính khố đỏ) trong thành Hà Nội.',
        'Có sự phối hợp, liên hệ với nghĩa quân Hoàng Hoa Thám (Yên Thế) ở bên ngoài.',
        'Kế hoạch: đầu độc lính Pháp cho tê liệt, rồi quân bên ngoài đánh vào chiếm thành.',
      ] },
      { h: 'Diễn biến (đêm 27/6/1908)' },
      { ul: [
        'Những người đầu bếp Việt bỏ thuốc (cà độc dược) vào thức ăn, đồ uống của lính Pháp.',
        'Khoảng 200 lính Pháp bị trúng độc, nôn mửa, mê man.',
        'Nhưng kế hoạch bị lộ, lực lượng bên ngoài không vào kịp; quân Pháp kịp thời đối phó.',
      ] },
      { h: 'Hậu quả' },
      { ul: [
        'Pháp đàn áp dữ dội: nhiều binh lính, đầu bếp Việt bị xử chém công khai để răn đe.',
        'Pháp siết chặt kiểm soát binh lính người Việt.',
      ] },
      { h: 'Ý nghĩa' },
      { p: 'Dù thất bại, vụ Hà thành đầu độc cho thấy tinh thần yêu nước đã thấm sâu ngay trong hàng ngũ binh lính người Việt phục vụ quân Pháp — một minh chứng cho ý chí không cam chịu nô lệ của dân tộc.' },
      { note: 'Sự kiện này còn cho thấy hạn chế của các cuộc nổi dậy đầu thế kỉ XX: thiếu tổ chức chặt chẽ, dễ bị lộ và bị đàn áp.' },
    ],
    [
      { q: 'Vụ Hà thành đầu độc diễn ra khi nào, do lực lượng nào thực hiện?', a: 'Diễn ra đêm 27/6/1908, do binh lính người Việt (lính khố đỏ) và những người đầu bếp Việt trong thành Hà Nội thực hiện, có liên hệ với nghĩa quân Yên Thế của Hoàng Hoa Thám.' },
      { q: 'Kế hoạch của những người khởi nghĩa là gì và vì sao thất bại?', a: 'Kế hoạch là đầu độc lính Pháp cho tê liệt, rồi lực lượng bên ngoài đánh vào chiếm thành. Nhưng kế hoạch bị lộ, lực lượng phối hợp bên ngoài không vào kịp, quân Pháp kịp đối phó nên thất bại.' },
      { q: 'Vụ Hà thành đầu độc có ý nghĩa gì dù thất bại?', a: 'Nó cho thấy tinh thần yêu nước đã thấm cả vào hàng ngũ binh lính người Việt phục vụ cho Pháp; chứng tỏ ý chí không cam chịu làm nô lệ của dân tộc, dù bị đàn áp đẫm máu.' },
    ]
  ),

  'S8GDDP-w11-quiz': L(
    'Khu phố cổ Hà Nội — 36 phố phường',
    'Bước vào khu phố cổ, các em như đi giữa một bảo tàng sống. Mỗi con phố "Hàng" là một nghề, mỗi ngôi nhà ống là một câu chuyện về cách người Thăng Long xưa sống và buôn bán.',
    [
      'Hiểu nguồn gốc và đặc điểm "36 phố phường".',
      'Phân tích kiến trúc nhà ống và lí do hình thành.',
      'Nhận thức giá trị di sản và yêu cầu bảo tồn phố cổ.',
    ],
    [
      { h: 'Nguồn gốc "36 phố phường"' },
      { p: 'Từ thời Lý — Trần, dân các làng nghề tụ về Thăng Long lập phường thủ công, buôn bán. Đến thời Lê, kinh thành chia thành nhiều phường; "36 phố phường" trở thành tên gọi quen thuộc cho khu buôn bán sầm uất ở phía đông Hoàng thành.' },
      { h: 'Tên phố "Hàng..."' },
      { p: 'Tên các phố thường bắt đầu bằng chữ "Hàng" gắn với mặt hàng buôn bán hoặc nghề thủ công của phố đó — mỗi phố một nghề, tạo nên nét rất riêng của phố cổ Hà Nội.' },
      { h: 'Một số phố nghề tiêu biểu' },
      { ul: [
        'Hàng Bạc: chế tác, buôn bán vàng bạc, kim hoàn.',
        'Hàng Đào: buôn tơ lụa, vải nhuộm màu.',
        'Hàng Mã: đồ vàng mã, đèn lồng, đồ chơi giấy.',
        'Hàng Thiếc: đồ kim loại gia dụng, đèn dầu.',
        'Hàng Bồ, Hàng Buồm, Hàng Gai, Hàng Khoai... mỗi phố một mặt hàng.',
      ] },
      { h: 'Kiến trúc nhà ống' },
      { ul: [
        'Mặt tiền hẹp (khoảng 2–4 m), chiều sâu lớn (có nhà sâu tới 50–60 m).',
        'Một lí do là thuế đất xưa thường tính theo bề rộng mặt tiền, nên nhà làm hẹp mà sâu.',
        'Bên trong có nhiều lớp nhà, xen kẽ sân trong (giếng trời) để lấy sáng và thông gió.',
        'Mặt tiền vừa là cửa hàng, vừa là xưởng; phía sau là nơi ở.',
      ] },
      { h: 'Chợ Đồng Xuân' },
      { p: 'Chợ Đồng Xuân (quận Hoàn Kiếm) là chợ đầu mối lớn nhất phố cổ, có lịch sử hơn 130 năm, là trung tâm buôn bán sầm uất bậc nhất Hà Nội.' },
      { h: 'Bảo tồn phố cổ' },
      { p: 'Năm 2004, khu phố cổ Hà Nội được công nhận là Di tích lịch sử cấp Quốc gia. Thành phố có quy chế quản lí nghiêm về chiều cao, mật độ, kiến trúc để giữ gìn diện mạo cổ kính, dù việc bảo tồn vẫn gặp nhiều thách thức do dân cư đông đúc.' },
      { note: 'Phố cổ là "linh hồn" của Hà Nội ngàn năm — bảo tồn phố cổ cũng là giữ gìn bản sắc của Thủ đô.' },
    ],
    [
      { q: 'Vì sao các phố cổ Hà Nội thường có tên bắt đầu bằng chữ "Hàng"?', a: 'Vì mỗi phố cổ xưa chuyên một nghề hoặc một mặt hàng; tên phố được đặt theo mặt hàng đó (Hàng Bạc bán bạc, Hàng Đào bán tơ lụa, Hàng Mã bán đồ vàng mã...) — mỗi phố một nghề.' },
      { q: 'Vì sao nhà ống phố cổ lại có mặt tiền hẹp mà chiều sâu rất lớn?', a: 'Một lí do quan trọng là thuế đất xưa tính theo chiều rộng mặt tiền, nên người dân làm nhà hẹp bề ngang để chịu thuế ít, kéo dài về phía sau; bên trong có sân trong (giếng trời) để lấy sáng, thông gió.' },
      { q: 'Việc công nhận phố cổ là Di tích Quốc gia (2004) có ý nghĩa gì?', a: 'Nó khẳng định giá trị lịch sử — văn hoá đặc biệt của khu phố cổ, tạo cơ sở pháp lí để quản lí, bảo tồn kiến trúc và diện mạo cổ kính, giữ gìn "linh hồn" ngàn năm của Hà Nội cho mai sau.' },
    ]
  ),

  'S8GDDP-w12-quiz': L(
    'Văn hoá Hà Nội — Thạch Lam và "Hà Nội băm sáu phố phường"',
    'Có những trang văn nhẹ như hơi thở mà giữ được cả hồn vía một thành phố. Thạch Lam, với "Hà Nội băm sáu phố phường", đã ướp Hà Nội đầu thế kỉ XX vào từng món quà, từng góc phố.',
    [
      'Trình bày tiểu sử và phong cách văn chương của Thạch Lam.',
      'Hiểu giá trị tản văn "Hà Nội băm sáu phố phường".',
      'Cảm nhận nét tinh tế của văn hoá ẩm thực Hà Nội qua văn Thạch Lam.',
    ],
    [
      { h: 'Thạch Lam (1910–1942)' },
      { p: 'Tên thật Nguyễn Tường Vinh (sau đổi Nguyễn Tường Lân), em ruột Nhất Linh và Hoàng Đạo, là thành viên nhóm Tự Lực Văn Đoàn. Ông gắn bó sâu nặng với Hà Nội và mất sớm vì bệnh lao khi mới 32 tuổi.' },
      { h: 'Phong cách văn chương' },
      { ul: [
        'Văn nhẹ nhàng, tinh tế, giàu cảm xúc và chất thơ.',
        'Cốt truyện thường giản dị, đi sâu vào thế giới nội tâm và cảm giác.',
        'Quan tâm tới những người nghèo, những cảnh đời bình dị nơi phố thị.',
      ] },
      { h: 'Tác phẩm tiêu biểu' },
      { ul: [
        'Tập truyện ngắn "Gió đầu mùa", "Nắng trong vườn".',
        'Truyện ngắn "Hai đứa trẻ", "Dưới bóng hoàng lan".',
        'Tản văn "Hà Nội băm sáu phố phường".',
      ] },
      { h: '"Hà Nội băm sáu phố phường" (1943)' },
      { ul: [
        'Là tập tản văn (bút kí) in sau khi ông qua đời.',
        'Mỗi bài viết về một món quà, một góc phố Hà Nội: phở, cốm Vòng, bún chả, bánh cuốn, ốc...',
        'Tác phẩm lưu giữ hương vị và nếp sống thanh lịch của Hà Nội đầu thế kỉ XX bằng những trang văn đẹp.',
      ] },
      { h: 'Giá trị' },
      { p: 'Tác phẩm không chỉ tả món ăn mà còn nâng ẩm thực thành nét văn hoá tinh tế của người Hà Nội; thể hiện tình yêu sâu sắc và sự trân trọng đối với Thủ đô.' },
      { note: 'Đoạn viết về phở của Thạch Lam ("Phở là một thứ quà đặc biệt của Hà Nội...") đã trở thành những dòng văn quen thuộc với nhiều thế hệ học sinh.' },
    ],
    [
      { q: 'Thạch Lam thuộc nhóm văn học nào và có quan hệ thế nào với các nhà văn khác?', a: 'Thạch Lam là thành viên nhóm Tự Lực Văn Đoàn, là em ruột của hai nhà văn Nhất Linh và Hoàng Đạo. Ông mất sớm năm 1942 vì bệnh lao khi mới 32 tuổi.' },
      { q: '"Hà Nội băm sáu phố phường" thuộc thể loại gì và viết về điều gì?', a: 'Đây là tập tản văn (bút kí), in sau khi ông mất. Mỗi bài viết về một món quà, một góc phố Hà Nội như phở, cốm, bún chả, bánh cuốn — lưu giữ hương vị và nếp sống thanh lịch của Hà Nội đầu thế kỉ XX.' },
      { q: 'Vì sao văn của Thạch Lam được coi là góp phần lưu giữ văn hoá Hà Nội?', a: 'Vì ông không chỉ tả món ăn mà còn nâng ẩm thực thành nét văn hoá tinh tế của người Hà Nội, ghi lại nếp sống, cảm giác và không khí phố phường — giúp người đọc đời sau hình dung và trân trọng Hà Nội xưa.' },
    ]
  ),

  'S8GDDP-w13-quiz': L(
    'Văn hoá Hà Nội — Nguyễn Tuân và "Vang bóng một thời"',
    'Nếu Thạch Lam dịu dàng thì Nguyễn Tuân lại tài hoa, kiêu bạc. Ông tôn thờ cái đẹp và viết về những con người tài hoa cuối mùa của một Hà Nội đang đổi thay.',
    [
      'Trình bày tiểu sử và phong cách của Nguyễn Tuân.',
      'Hiểu giá trị tập truyện "Vang bóng một thời".',
      'Phân tích nét tài hoa, uyên bác trong văn Nguyễn Tuân.',
    ],
    [
      { h: 'Nguyễn Tuân (1910–1987)' },
      { p: 'Quê làng Mọc (Nhân Mục, nay thuộc quận Thanh Xuân, Hà Nội). Ông là một trong những nhà văn lớn nhất của văn học Việt Nam hiện đại, bậc thầy của thể tuỳ bút. Trước Cách mạng, ông viết về cái đẹp của văn hoá truyền thống; sau Cách mạng, ngòi bút hướng về kháng chiến và xây dựng đất nước.' },
      { h: 'Phong cách nghệ thuật' },
      { ul: [
        'Tài hoa, uyên bác; câu chữ trau chuốt, độc đáo.',
        'Tôn thờ cái đẹp, luôn nhìn sự vật ở góc độ thẩm mỹ, văn hoá.',
        'Nhân vật thường là những người tài hoa, có nhân cách, cốt cách "ngông".',
      ] },
      { h: '"Vang bóng một thời" (1940)' },
      { ul: [
        'Tập truyện ngắn viết về những nét đẹp văn hoá của một thời đã qua.',
        'Ca ngợi thú chơi tao nhã của người xưa: chữ thư pháp, thưởng trà, thả thơ, chơi cờ, làm đèn kéo quân...',
        'Nhân vật là những nhà nho tài hoa, giữ khí tiết giữa buổi giao thời "Tây — Ta" lẫn lộn.',
      ] },
      { h: 'Truyện "Chữ người tử tù"' },
      { p: '"Chữ người tử tù" — truyện nổi bật nhất trong "Vang bóng một thời" — kể về Huấn Cao, người tử tù tài hoa, khí phách, cho chữ viên quản ngục ngay trong nhà lao. Tác phẩm khẳng định cái đẹp và thiên lương có thể toả sáng ở cả nơi tăm tối nhất.' },
      { h: 'Tác phẩm sau Cách mạng' },
      { p: 'Sau Cách mạng, Nguyễn Tuân viết tuỳ bút "Sông Đà" (1960) với hình tượng con sông Đà "hung bạo và trữ tình" và "người lái đò Sông Đà" tài hoa — vẫn giữ nguyên chất tài hoa, uyên bác đặc trưng.' },
      { note: 'Nguyễn Tuân được mệnh danh là "người suốt đời đi tìm cái đẹp" — một cây bút tài hoa bậc nhất gắn bó với đất Hà Nội.' },
    ],
    [
      { q: '"Vang bóng một thời" viết về điều gì?', a: 'Tập truyện viết về những nét đẹp văn hoá của một thời đã qua: thú chơi chữ thư pháp, thưởng trà, thả thơ, chơi cờ... với nhân vật là những nhà nho tài hoa giữ khí tiết giữa buổi giao thời, thể hiện niềm tiếc nuối thời "vàng son".' },
      { q: 'Truyện "Chữ người tử tù" khẳng định điều gì?', a: 'Qua hình tượng Huấn Cao cho chữ viên quản ngục ngay trong nhà lao, truyện khẳng định cái đẹp và thiên lương con người có thể toả sáng ngay ở nơi tăm tối, nhơ nhuốc nhất — cái đẹp gắn liền với khí phách, nhân cách.' },
      { q: 'Nét đặc trưng trong phong cách của Nguyễn Tuân là gì?', a: 'Đó là sự tài hoa, uyên bác: câu chữ trau chuốt, độc đáo; luôn nhìn sự vật ở góc độ thẩm mỹ — văn hoá; tôn thờ cái đẹp và xây dựng những nhân vật tài hoa, có cốt cách. Ông được gọi là "người suốt đời đi tìm cái đẹp".' },
    ]
  ),

  'S8GDDP-w14-quiz': L(
    'Làng nghề truyền thống Hà Nội — Lụa Vạn Phúc',
    'Sang quận Hà Đông, các em sẽ lạc vào con phố rực rỡ sắc lụa: làng Vạn Phúc nghìn năm dệt lụa. Từ con tằm đến tấm lụa óng ả là cả một nghệ thuật được truyền qua bao đời.',
    [
      'Trình bày lịch sử và vị trí làng lụa Vạn Phúc.',
      'Mô tả quy trình dệt lụa từ tằm.',
      'Trân trọng giá trị nghề thủ công truyền thống.',
    ],
    [
      { h: 'Làng lụa nghìn năm' },
      { p: 'Vạn Phúc nay thuộc quận Hà Đông, bên dòng sông Nhuệ, cách trung tâm Hà Nội khoảng 10 km. Tương truyền nghề dệt do bà tổ A Lã Thị Nương truyền dạy từ thế kỉ IX. Thời Pháp thuộc, lụa Vạn Phúc (lụa Hà Đông) từng được xuất sang Pháp và đoạt giải tại các hội chợ quốc tế những năm 1930.' },
      { h: 'Quy trình dệt lụa' },
      { ul: [
        '1. Trồng dâu, nuôi tằm — tằm ăn lá dâu, nhả tơ kết thành kén.',
        '2. Ươm tơ: luộc kén, rút sợi tơ mảnh.',
        '3. Hồ sợi, mắc cửi: nhuộm và hồ cho sợi bền, dai.',
        '4. Dệt trên khung cửi (xưa hoàn toàn thủ công).',
        '5. Tẩy, nhuộm màu, hấp định hình tấm lụa.',
      ] },
      { h: 'Các loại lụa nổi tiếng' },
      { ul: [
        'Lụa Vân: dệt có hoa văn nổi chìm, là sản phẩm tinh xảo, danh tiếng nhất của Vạn Phúc.',
        'Lụa Lĩnh: dày, trơn bóng, trang trọng.',
        'Lụa Sa, lụa Là: mỏng, nhẹ, mát.',
      ] },
      { h: 'Đặc trưng và hoa văn' },
      { p: 'Lụa Vạn Phúc mềm, mịn, mát, bền màu, có độ óng ánh đặc biệt. Hoa văn truyền thống mang ý nghĩa tốt lành: lưỡng long, song hạc, hoa mai, hoa sen...' },
      { h: 'Vạn Phúc hôm nay' },
      { p: 'Phố Lụa Vạn Phúc dài hơn 1 km là điểm du lịch quen thuộc. Phần lớn cơ sở nay dệt bằng máy, song vẫn còn một số hộ giữ kĩ thuật khung cửi thủ công — vừa sản xuất vừa phục vụ khách tham quan, trải nghiệm.' },
      { note: 'Bài thơ "Áo lụa Hà Đông" (Nguyên Sa) được phổ nhạc đã đưa lụa Hà Đông thành biểu tượng của vẻ đẹp dịu dàng người con gái Việt.' },
    ],
    [
      { q: 'Làng lụa Vạn Phúc nằm ở đâu và có lịch sử thế nào?', a: 'Vạn Phúc thuộc quận Hà Đông, bên sông Nhuệ, cách trung tâm Hà Nội khoảng 10 km. Tương truyền nghề dệt có từ thế kỉ IX; thời Pháp thuộc, lụa Vạn Phúc từng xuất khẩu sang Pháp và đoạt giải ở các hội chợ quốc tế những năm 1930.' },
      { q: 'Em hãy nêu các bước chính để làm ra một tấm lụa.', a: 'Trồng dâu nuôi tằm để tằm nhả tơ kết kén; ươm tơ (luộc kén, rút sợi); hồ sợi, mắc cửi; dệt trên khung cửi; cuối cùng tẩy, nhuộm màu và hấp định hình tấm lụa.' },
      { q: 'Lụa Vân khác lụa Lĩnh ở điểm nào?', a: 'Lụa Vân được dệt có hoa văn nổi chìm, tinh xảo và danh tiếng nhất; còn lụa Lĩnh thì dày, trơn bóng, trang trọng — không có hoa văn nổi như lụa Vân.' },
    ]
  ),

  'S8GDDP-w15-quiz': L(
    'Làng nghề truyền thống — Gốm Bát Tràng',
    'Bên kia sông Hồng, thuộc huyện Gia Lâm, có một làng gốm 700 năm tuổi mà tên tuổi đã đi vào ca dao: Bát Tràng. Mỗi sản phẩm là kết tinh của đất, nước, lửa và bàn tay người thợ.',
    [
      'Trình bày lịch sử và vị trí làng gốm Bát Tràng.',
      'Mô tả quy trình làm gốm và các loại men đặc trưng.',
      'Nhận thức giá trị và hướng phát triển của làng nghề hôm nay.',
    ],
    [
      { h: 'Làng gốm ven sông Hồng' },
      { p: 'Bát Tràng thuộc huyện Gia Lâm, bên sông Hồng, cách trung tâm Hà Nội khoảng 13 km về phía đông nam. Nghề gốm có lịch sử khoảng 700 năm, từ thời Trần — Hồ, khi cư dân từ làng Bồ Bát (Ninh Bình) di cư đến vùng đất có nguồn đất sét tốt này.' },
      { h: 'Quy trình làm gốm' },
      { ul: [
        '1. Chuẩn bị đất: phơi, ngâm, lọc, nhào đất sét đến độ dẻo mịn.',
        '2. Tạo hình: chuốt trên bàn xoay hoặc đổ khuôn.',
        '3. Phơi khô, sửa nguội, trang trí (vẽ, khắc hoa văn).',
        '4. Tráng men.',
        '5. Nung trong lò ở nhiệt độ cao (khoảng 1.200–1.300°C); xưa nung lò bầu, lò ếch bằng củi, nay phổ biến lò gas, lò điện.',
      ] },
      { h: 'Các loại men nổi tiếng' },
      { ul: [
        'Men lam: vẽ chàm xanh trên nền trắng — đặc trưng quen thuộc của Bát Tràng.',
        'Men rạn: bề mặt nứt như mạng nhện, tạo nét cổ kính độc đáo.',
        'Men ngọc: xanh trong, có từ thời Lý — Trần.',
        'Men nâu: nâu đen, mộc mạc.',
      ] },
      { h: 'Sản phẩm' },
      { ul: [
        'Đồ gia dụng: bát, đĩa, ấm chén, bình, lọ.',
        'Đồ thờ cúng, tượng gốm, gạch Bát Tràng.',
        'Ngày nay có thêm gốm trang trí (decor), gốm mỹ nghệ xuất khẩu.',
      ] },
      { h: 'Bát Tràng hôm nay' },
      { p: 'Làng có Chợ Gốm và hàng trăm xưởng sản xuất. Du khách, đặc biệt là học sinh, có thể trải nghiệm tự nặn, vẽ, tô gốm. Sản phẩm Bát Tràng được xuất khẩu sang nhiều nước.' },
      { note: 'Câu ca dao xưa: "Ước gì anh lấy được nàng / Để anh mua gạch Bát Tràng về xây." — cho thấy danh tiếng lâu đời của gạch và gốm Bát Tràng.' },
    ],
    [
      { q: 'Làng gốm Bát Tràng có từ thời nào và do ai lập nên?', a: 'Bát Tràng (huyện Gia Lâm) có nghề gốm khoảng 700 năm, hình thành từ thời Trần — Hồ, khi cư dân từ làng Bồ Bát (Ninh Bình) di cư đến vùng đất có đất sét tốt bên sông Hồng.' },
      { q: 'Đặc trưng men gốm nào quen thuộc nhất của Bát Tràng?', a: 'Men lam — tức hoa văn vẽ bằng chàm xanh trên nền men trắng — là đặc trưng quen thuộc nhất; ngoài ra Bát Tràng còn nổi tiếng với men rạn (nứt như mạng nhện), men ngọc, men nâu.' },
      { q: 'Vì sao khâu nung lò lại quan trọng trong làm gốm?', a: 'Vì gốm phải được nung ở nhiệt độ rất cao (khoảng 1.200–1.300°C) thì đất và men mới chín, kết khối, cho ra sản phẩm cứng, bền và lên màu men đẹp; nung không đủ lửa hoặc quá lửa đều làm hỏng sản phẩm.' },
    ]
  ),

  'S8GDDP-w16-quiz': L(
    'Làng nghề truyền thống — Đúc đồng Ngũ Xã',
    'Ngay giữa lòng Hà Nội, bên hồ Trúc Bạch, có một làng nghề đúc đồng cổ từng đúc nên những pho tượng, quả chuông lừng danh: làng Ngũ Xã.',
    [
      'Trình bày lịch sử và vị trí làng đúc đồng Ngũ Xã.',
      'Mô tả quy trình kĩ thuật đúc đồng.',
      'Nhận biết các tác phẩm tiêu biểu của làng nghề.',
    ],
    [
      { h: 'Lịch sử' },
      { ul: [
        'Hình thành khoảng thế kỉ XVII (thời Lê).',
        'Vị trí: vùng ven hồ Trúc Bạch, quận Ba Đình ngày nay.',
        'Do thợ giỏi từ 5 làng đúc đồng vùng Bắc Ninh đến lập nghiệp, nên gọi là "Ngũ Xã" (năm làng).',
        'Chuyên đúc chuông, tượng Phật, đồ thờ tinh xảo.',
      ] },
      { h: 'Kĩ thuật đúc đồng' },
      { ul: [
        '1. Tạo mẫu và làm khuôn bằng đất sét đặc biệt.',
        '2. Nung (đốt) khuôn cho thật cứng, khô.',
        '3. Nấu đồng cho nóng chảy (đồng nóng chảy ở khoảng 1.080°C).',
        '4. Rót đồng lỏng vào khuôn.',
        '5. Để nguội, phá khuôn, rồi mài, giũa, chạm, đánh bóng hoàn thiện.',
      ] },
      { h: 'Tác phẩm tiêu biểu' },
      { ul: [
        'Pho tượng A Di Đà bằng đồng tại chùa Thần Quang (chùa Ngũ Xã) — tác phẩm đúc đồng đồ sộ, tinh xảo.',
        'Nhiều chuông chùa, đồ thờ cung đình và đình chùa khắp Bắc Bộ.',
      ] },
      { h: 'Ngũ Xã hôm nay' },
      { p: 'Số hộ làm nghề đã giảm nhiều do đô thị hoá, nhưng vẫn còn một số gia đình giữ nghề đúc đồng mỹ nghệ. Tên làng còn được biết tới qua món ăn nổi tiếng "phở cuốn Ngũ Xã".' },
      { note: 'Nghề đúc đồng đòi hỏi sự tỉ mỉ và kinh nghiệm: chỉ một sai sót nhỏ về nhiệt độ hay khuôn cũng làm hỏng cả pho tượng lớn.' },
    ],
    [
      { q: 'Vì sao làng đúc đồng có tên là "Ngũ Xã"?', a: 'Vì làng do thợ giỏi đến từ 5 làng đúc đồng vùng Bắc Ninh hợp lại lập nên — "Ngũ Xã" nghĩa là "năm làng". Làng nằm ven hồ Trúc Bạch, quận Ba Đình.' },
      { q: 'Em hãy nêu các bước chính trong kĩ thuật đúc đồng.', a: 'Tạo mẫu và làm khuôn đất sét; nung khuôn cho cứng khô; nấu đồng nóng chảy (khoảng 1.080°C); rót đồng vào khuôn; để nguội, phá khuôn rồi mài giũa, chạm, đánh bóng hoàn thiện.' },
      { q: 'Tác phẩm nào tiêu biểu cho tay nghề của làng Ngũ Xã?', a: 'Tiêu biểu là pho tượng A Di Đà bằng đồng tại chùa Thần Quang (chùa Ngũ Xã) — một tác phẩm đúc đồng đồ sộ, tinh xảo, thể hiện trình độ cao của nghệ nhân làng nghề.' },
    ]
  ),

  'S8GDDP-w17-quiz': L(
    'Nông nghiệp đô thị và sản vật đặc trưng Hà Nội',
    'Giữa nhịp sống đô thị hối hả, Hà Nội vẫn giữ những vùng quê xanh mướt với hoa, rau, đặc sản. Đó là "nông nghiệp đô thị" — một nét rất riêng của Thủ đô mở rộng.',
    [
      'Nhận biết các vùng nông nghiệp và sản vật đặc trưng của Hà Nội.',
      'Hiểu khái niệm "nông nghiệp đô thị" và xu hướng nông nghiệp công nghệ cao.',
      'Trân trọng giá trị của các đặc sản và làng nghề nông nghiệp.',
    ],
    [
      { h: 'Vì sao Hà Nội vẫn có nông nghiệp?' },
      { p: 'Sau khi mở rộng địa giới năm 2008, Hà Nội có diện tích lớn với 17 huyện ngoại thành. Vì vậy, bên cạnh đô thị, Thủ đô vẫn duy trì các vùng sản xuất nông nghiệp — nay phát triển theo hướng "nông nghiệp đô thị": gần thành phố, giá trị cao, gắn với dịch vụ và du lịch.' },
      { h: 'Các vùng nông nghiệp tiêu biểu' },
      { ul: [
        'Đông Anh, Sóc Sơn, Mê Linh: rau, hoa, cây ăn quả.',
        'Thanh Trì, Thường Tín, Ứng Hoà: lúa, rau, thuỷ sản.',
        'Đan Phượng, Hoài Đức: rau an toàn, hoa, cây cảnh.',
      ] },
      { h: 'Sản vật đặc trưng' },
      { ul: [
        'Cốm làng Vòng (Cầu Giấy) — đặc sản mùa thu nổi tiếng.',
        'Hoa Tây Tựu (Bắc Từ Liêm), hoa Mê Linh.',
        'Bưởi Diễn, cam Canh, ổi Đông Dư.',
        'Rau an toàn Vân Nội (Đông Anh), Văn Đức (Gia Lâm).',
      ] },
      { h: 'Cốm Vòng — tinh hoa ẩm thực thu Hà Nội' },
      { p: 'Cốm làng Vòng làm từ lúa nếp non, qua các công đoạn rang, giã, sàng sảy công phu, gói trong lá sen, lá ráy. Cốm là biểu tượng mùa thu Hà Nội, thường dùng làm quà và trong lễ ăn hỏi truyền thống.' },
      { h: 'Nông nghiệp công nghệ cao' },
      { ul: [
        'Trồng rau, hoa trong nhà kính, nhà lưới; tưới nhỏ giọt, thuỷ canh.',
        'Sản xuất rau quả an toàn, hữu cơ (organic).',
        'Phát triển du lịch nông nghiệp: vườn dâu, vườn hoa, trải nghiệm làm nông.',
      ] },
      { note: 'Nông nghiệp đô thị không chỉ cung cấp thực phẩm sạch mà còn giữ "vành đai xanh", góp phần điều hoà môi trường cho Thủ đô.' },
    ],
    [
      { q: '"Nông nghiệp đô thị" của Hà Nội có đặc điểm gì?', a: 'Là nền nông nghiệp ở vùng ven và ngoại thành gần đô thị, hướng tới giá trị cao: sản xuất rau hoa quả an toàn, ứng dụng công nghệ (nhà kính, thuỷ canh), gắn với dịch vụ và du lịch nông nghiệp, đồng thời giữ "vành đai xanh" cho thành phố.' },
      { q: 'Cốm Vòng là đặc sản của vùng nào và gắn với mùa nào?', a: 'Cốm Vòng là đặc sản của làng Vòng (Cầu Giấy), làm từ lúa nếp non; gắn với mùa thu Hà Nội — là biểu tượng ẩm thực mùa thu, thường dùng làm quà và trong lễ ăn hỏi.' },
      { q: 'Hãy kể tên một vài sản vật và vùng trồng tiêu biểu của Hà Nội.', a: 'Hoa Tây Tựu (Bắc Từ Liêm) và hoa Mê Linh; bưởi Diễn, cam Canh, ổi Đông Dư; rau an toàn Vân Nội (Đông Anh); cốm làng Vòng (Cầu Giấy) — mỗi vùng một đặc sản nổi tiếng.' },
    ]
  ),

  'S8GDDP-w18-quiz': L(
    'Ôn tập học kì I — Hà Nội cận đại: lịch sử, văn hoá, làng nghề',
    'Khép lại học kì I, cô trò ta cùng nhìn lại chặng đường Hà Nội nửa cuối thế kỉ XIX — đầu thế kỉ XX: từ những trận giữ thành bi tráng, các phong trào yêu nước, đến văn hoá và làng nghề Thủ đô.',
    [
      'Hệ thống các sự kiện lịch sử Hà Nội từ 1873 đến đầu thế kỉ XX.',
      'Khái quát các giá trị văn hoá và làng nghề tiêu biểu.',
      'Liên hệ giữa sự kiện — nhân vật — di tích.',
    ],
    [
      { h: 'Pháp xâm chiếm và những anh hùng giữ thành' },
      { ul: [
        '1873: Pháp đánh thành Hà Nội lần 1 — Tổng đốc Nguyễn Tri Phương tuyệt thực hi sinh; chiến thắng Cầu Giấy giết Garnier.',
        '1882: Pháp đánh lần 2 — Tổng đốc Hoàng Diệu tự vẫn giữ khí tiết; chiến thắng Cầu Giấy lần 2 giết Rivière.',
        '1883: Hiệp ước Hácmăng — Việt Nam thành thuộc địa.',
      ] },
      { h: 'Hà Nội thời thuộc địa' },
      { ul: [
        '1902: Hà Nội thành thủ phủ Liên bang Đông Dương; quy hoạch kiểu thuộc địa.',
        'Công trình tiêu biểu: cầu Long Biên, Nhà hát Lớn, Phủ Toàn quyền.',
      ] },
      { h: 'Các phong trào yêu nước đầu thế kỉ XX' },
      { ul: [
        'Đông Du (Phan Bội Châu) — bạo động, dựa vào Nhật.',
        'Đông Kinh Nghĩa Thục (1907) — canh tân, dạy chữ Quốc ngữ.',
        'Duy tân ôn hoà (Phan Châu Trinh) — "khai dân trí, chấn dân khí, hậu dân sinh".',
        'Vụ Hà thành đầu độc (1908).',
      ] },
      { h: 'Văn hoá Hà Nội' },
      { ul: [
        'Phố cổ "36 phố phường", nhà ống.',
        'Nhà văn Thạch Lam ("Hà Nội băm sáu phố phường"), Nguyễn Tuân ("Vang bóng một thời").',
      ] },
      { h: 'Làng nghề và sản vật' },
      { ul: [
        'Lụa Vạn Phúc (Hà Đông), gốm Bát Tràng (Gia Lâm), đúc đồng Ngũ Xã (Ba Đình).',
        'Nông nghiệp đô thị, cốm Vòng, hoa Tây Tựu.',
      ] },
      { note: 'Hãy tự lập một bảng thời gian (timeline) các sự kiện Hà Nội 1873 — 1908 — em sẽ thấy mạch lịch sử Thủ đô rõ ràng hơn nhiều.' },
    ],
    [
      { q: 'Hai anh hùng giữ thành Hà Nội thời Pháp xâm chiếm là ai?', a: 'Là Tổng đốc Nguyễn Tri Phương (giữ thành năm 1873, tuyệt thực hi sinh) và Tổng đốc Hoàng Diệu (giữ thành năm 1882, tự vẫn ở Võ miếu) — hai tấm gương khí tiết của sĩ phu Việt Nam.' },
      { q: 'Kể tên ba làng nghề truyền thống tiêu biểu của Hà Nội đã học.', a: 'Lụa Vạn Phúc (Hà Đông), gốm Bát Tràng (Gia Lâm) và đúc đồng Ngũ Xã (Ba Đình) — ba làng nghề thủ công lâu đời, tiêu biểu của Thủ đô.' },
      { q: 'So sánh ngắn gọn ba khuynh hướng cứu nước đầu thế kỉ XX gắn với Hà Nội.', a: 'Đông Du (Phan Bội Châu) chủ trương bạo động, dựa vào Nhật; Đông Kinh Nghĩa Thục và Phan Châu Trinh chủ trương duy tân, canh tân ôn hoà qua giáo dục, nâng cao dân trí; còn vụ Hà thành đầu độc là cuộc nổi dậy vũ trang tự phát của binh lính người Việt.' },
    ]
  ),

  'S8GDDP-w19-quiz': L(
    'Phong trào Cần Vương và các cuộc khởi nghĩa ở Bắc Bộ',
    'Khi vua Hàm Nghi xuống chiếu Cần Vương, cả nước bừng lên ngọn lửa kháng Pháp. Ở Bắc Bộ, nhiều cuộc khởi nghĩa lớn nổ ra, và Hà Nội âm thầm là một mắt xích của phong trào.',
    [
      'Trình bày hoàn cảnh ra đời và mục tiêu của phong trào Cần Vương.',
      'Kể tên các cuộc khởi nghĩa tiêu biểu ở Bắc Bộ.',
      'Hiểu vai trò và sự đóng góp của sĩ phu, nhân dân vùng Hà Nội.',
    ],
    [
      { h: 'Hoàn cảnh ra đời' },
      { p: 'Sau Hiệp ước Hácmăng (1883) và Patơnốt (1884), phái chủ chiến trong triều do Tôn Thất Thuyết đứng đầu chuẩn bị kháng Pháp. Đêm 4 rạng 5/7/1885, cuộc phản công ở kinh thành Huế thất bại; Tôn Thất Thuyết đưa vua Hàm Nghi ra Tân Sở (Quảng Trị).' },
      { h: 'Chiếu Cần Vương (13/7/1885)' },
      { p: 'Vua Hàm Nghi xuống chiếu Cần Vương ("giúp vua cứu nước"), kêu gọi văn thân, sĩ phu và nhân dân cả nước đứng lên đánh Pháp. Một phong trào yêu nước rộng lớn bùng nổ, kéo dài đến năm 1896.' },
      { h: 'Các cuộc khởi nghĩa lớn ở Bắc Bộ và Bắc Trung Bộ' },
      { ul: [
        'Khởi nghĩa Bãi Sậy (Nguyễn Thiện Thuật) — vùng Hưng Yên, Hải Dương, dùng lối đánh du kích ở đầm lầy.',
        'Khởi nghĩa Ba Đình (Phạm Bành, Đinh Công Tráng) — Nga Sơn, Thanh Hoá, nổi tiếng với chiến luỹ kiên cố.',
        'Khởi nghĩa Hùng Lĩnh (Tống Duy Tân) — Thanh Hoá.',
        'Khởi nghĩa Hương Khê (Phan Đình Phùng, Cao Thắng) — Hà Tĩnh, tiêu biểu nhất của phong trào Cần Vương.',
      ] },
      { h: 'Vai trò của vùng Hà Nội' },
      { p: 'Hà Nội bị Pháp kiểm soát chặt nên không nổ ra khởi nghĩa lớn ngay trong thành phố. Tuy vậy, nhiều sĩ phu, nho sĩ vùng Hà Nội và phụ cận âm thầm ủng hộ Cần Vương qua việc liên lạc, vận động, tiếp tế cho nghĩa quân ở các tỉnh lân cận.' },
      { note: 'Phong trào Cần Vương tuy thất bại nhưng chứng tỏ tinh thần yêu nước bất khuất và là đỉnh cao của khuynh hướng cứu nước phong kiến cuối thế kỉ XIX.' },
    ],
    [
      { q: 'Chiếu Cần Vương do ai ban ra và kêu gọi điều gì?', a: 'Chiếu Cần Vương do vua Hàm Nghi ban ngày 13/7/1885 (với sự giúp sức của Tôn Thất Thuyết), kêu gọi văn thân, sĩ phu và nhân dân cả nước đứng lên "giúp vua cứu nước", đánh đuổi thực dân Pháp.' },
      { q: 'Cuộc khởi nghĩa nào là tiêu biểu nhất của phong trào Cần Vương?', a: 'Khởi nghĩa Hương Khê (1885–1896) do Phan Đình Phùng và Cao Thắng lãnh đạo ở vùng Hà Tĩnh — quy mô lớn, kéo dài, tổ chức chặt chẽ và chế tạo được súng — được coi là tiêu biểu nhất của phong trào Cần Vương.' },
      { q: 'Vì sao tại Hà Nội không nổ ra khởi nghĩa Cần Vương lớn?', a: 'Vì Hà Nội bị Pháp chiếm đóng và kiểm soát chặt chẽ. Tuy vậy, sĩ phu, nho sĩ vùng Hà Nội vẫn âm thầm ủng hộ phong trào bằng cách liên lạc, vận động và tiếp tế cho nghĩa quân ở các tỉnh lân cận.' },
    ]
  ),

  'S8GDDP-w20-quiz': L(
    'Khởi nghĩa Yên Thế (1884–1913) — Hoàng Hoa Thám',
    'Trong khi phong trào Cần Vương dần tàn, ở vùng rừng núi Yên Thế (Bắc Giang) một cuộc khởi nghĩa nông dân bền bỉ kéo dài gần 30 năm, gắn với tên tuổi "Hùm thiêng Yên Thế" — Hoàng Hoa Thám.',
    [
      'Trình bày diễn biến chính của khởi nghĩa Yên Thế.',
      'Hiểu vai trò của Hoàng Hoa Thám và tính chất nông dân của phong trào.',
      'So sánh khởi nghĩa Yên Thế với phong trào Cần Vương.',
    ],
    [
      { h: 'Hoàng Hoa Thám (Đề Thám)' },
      { p: 'Tên thật Trương Văn Thám, được gọi là Đề Thám hay "Hùm thiêng Yên Thế". Khác các thủ lĩnh Cần Vương vốn là văn thân, sĩ phu, ông xuất thân nông dân và lãnh đạo cuộc khởi nghĩa của chính nông dân vùng Yên Thế (Bắc Giang) chống Pháp.' },
      { h: 'Nguyên nhân' },
      { p: 'Thực dân Pháp mở rộng chiếm đất, lập đồn điền, đẩy nông dân Yên Thế vào cảnh mất ruộng, bị bóc lột. Để bảo vệ cuộc sống và quê hương, nông dân nơi đây đã vùng lên.' },
      { h: 'Diễn biến chính' },
      { ul: [
        '1884–1892: nhiều toán nghĩa quân hoạt động riêng lẻ, sau quy về dưới ngọn cờ Đề Thám.',
        '1893–1908: nghĩa quân vừa chiến đấu vừa hai lần giảng hoà với Pháp để củng cố lực lượng, xây dựng căn cứ Phồn Xương.',
        '1909–1913: Pháp tập trung lực lượng lớn tấn công; ngày 10/2/1913 Hoàng Hoa Thám bị sát hại, khởi nghĩa tan rã.',
      ] },
      { h: 'Tính chất và ý nghĩa' },
      { ul: [
        'Là cuộc khởi nghĩa nông dân lớn nhất, kéo dài gần 30 năm — bền bỉ bậc nhất thời chống Pháp.',
        'Mang tính tự vệ, bảo vệ quê hương, ruộng đất — không gắn với khẩu hiệu "giúp vua".',
        'Thể hiện tinh thần đấu tranh kiên cường, mưu trí của nông dân Việt Nam.',
      ] },
      { note: 'Đề Thám từng có liên hệ với những người yêu nước ở Hà Nội (như trong vụ Hà thành đầu độc 1908) — cho thấy phong trào Yên Thế không hề biệt lập.' },
    ],
    [
      { q: 'Hoàng Hoa Thám là ai và lãnh đạo cuộc khởi nghĩa nào?', a: 'Hoàng Hoa Thám (Đề Thám, "Hùm thiêng Yên Thế"), tên thật Trương Văn Thám, là thủ lĩnh nông dân lãnh đạo cuộc khởi nghĩa Yên Thế (Bắc Giang) chống Pháp, kéo dài từ năm 1884 đến 1913.' },
      { q: 'Khởi nghĩa Yên Thế khác phong trào Cần Vương ở điểm nào?', a: 'Khởi nghĩa Yên Thế mang tính chất nông dân tự vệ, do Hoàng Hoa Thám (xuất thân nông dân) lãnh đạo nhằm bảo vệ ruộng đất, quê hương; không gắn với khẩu hiệu "giúp vua cứu nước" như phong trào Cần Vương do văn thân, sĩ phu lãnh đạo.' },
      { q: 'Vì sao khởi nghĩa Yên Thế được coi là tiêu biểu cho tinh thần nông dân?', a: 'Vì đây là cuộc khởi nghĩa nông dân lớn nhất, kéo dài gần 30 năm, bền bỉ và mưu trí; nghĩa quân biết dựa vào địa hình, xây căn cứ, vừa đánh vừa hoà để bảo toàn lực lượng — thể hiện ý chí kiên cường của người nông dân Việt Nam.' },
    ]
  ),

  'S8GDDP-w21-quiz': L(
    'Cuộc khai thác thuộc địa lần thứ nhất và tác động tới Hà Nội (1897–1914)',
    'Sau khi bình định xong, Pháp bắt đầu "vắt kiệt" Đông Dương qua cuộc khai thác thuộc địa lần thứ nhất. Hà Nội — thủ phủ Liên bang — biến đổi mạnh mẽ cả về kinh tế lẫn cơ cấu xã hội.',
    [
      'Trình bày mục đích và nội dung cuộc khai thác thuộc địa lần thứ nhất.',
      'Phân tích tác động tới kinh tế — xã hội Hà Nội.',
      'Nhận biết sự ra đời các giai cấp, tầng lớp mới.',
    ],
    [
      { h: 'Mục đích' },
      { p: 'Toàn quyền Paul Doumer chủ trương khai thác để bù đắp chi phí xâm lược và thu lợi nhuận tối đa cho chính quốc Pháp, biến Đông Dương thành nơi cung cấp nguyên liệu, nhân công rẻ và tiêu thụ hàng hoá Pháp.' },
      { h: 'Nội dung khai thác' },
      { ul: [
        'Nông nghiệp: cướp đoạt ruộng đất, lập đồn điền trồng lúa, cao su, chè, cà phê.',
        'Công nghiệp: tập trung khai mỏ (than Quảng Ninh, thiếc, kẽm); phát triển công nghiệp nhẹ (dệt, xay xát, rượu, xi măng, điện, nước).',
        'Giao thông: xây đường sắt (Hà Nội — Lạng Sơn, Hà Nội — Lào Cai, Hà Nội — Hải Phòng), cầu Long Biên, mở rộng đường bộ, cảng.',
        'Tài chính: lập Ngân hàng Đông Dương, độc quyền phát hành tiền; đặt nhiều thứ thuế nặng (thuế thân, thuế muối, rượu, thuốc phiện).',
      ] },
      { h: 'Tác động tới Hà Nội' },
      { ul: [
        'Bộ mặt đô thị thay đổi: xây cầu, đường, nhà máy, công sở; Hà Nội thành trung tâm hành chính — kinh tế của cả Liên bang.',
        'Xuất hiện nhà máy, xí nghiệp; hình thành đội ngũ công nhân.',
        'Một bộ phận người Việt trở thành tư sản, tiểu tư sản, viên chức.',
      ] },
      { h: 'Cơ cấu xã hội mới' },
      { ul: [
        'Giai cấp công nhân ra đời, gắn với nhà máy, hầm mỏ, đường sắt.',
        'Tầng lớp tư sản, tiểu tư sản (tiểu thương, viên chức, học sinh, trí thức) hình thành ở đô thị.',
        'Nông dân vẫn chiếm đa số, đời sống ngày càng cực khổ vì mất ruộng, sưu cao thuế nặng.',
      ] },
      { note: 'Cuộc khai thác làm Hà Nội "hiện đại" hơn về hạ tầng, nhưng bản chất là phục vụ bóc lột thuộc địa; chính sự phân hoá xã hội này tạo tiền đề cho các phong trào yêu nước theo khuynh hướng mới sau này.' },
    ],
    [
      { q: 'Toàn quyền nào chủ trương cuộc khai thác thuộc địa lần thứ nhất và nhằm mục đích gì?', a: 'Toàn quyền Paul Doumer chủ trương cuộc khai thác (1897–1914), nhằm bù đắp chi phí xâm lược và thu lợi nhuận tối đa cho Pháp — biến Đông Dương thành nơi cung cấp nguyên liệu, nhân công rẻ và tiêu thụ hàng hoá Pháp.' },
      { q: 'Cuộc khai thác tác động thế nào đến cơ cấu xã hội ở Hà Nội?', a: 'Nó làm xuất hiện giai cấp công nhân (gắn với nhà máy, đường sắt) và các tầng lớp tư sản, tiểu tư sản, viên chức ở đô thị; trong khi đó nông dân vẫn chiếm đa số nhưng đời sống ngày càng cực khổ vì mất ruộng, sưu thuế nặng.' },
      { q: 'Vì sao nói cuộc khai thác làm Hà Nội "hiện đại" hơn nhưng bản chất vẫn là bóc lột?', a: 'Pháp xây cầu, đường, nhà máy, công sở khiến hạ tầng đô thị Hà Nội thay đổi rõ rệt; nhưng tất cả nhằm phục vụ việc vơ vét tài nguyên, thu thuế nặng và bóc lột nhân công — lợi nhuận chảy về chính quốc, người dân thuộc địa vẫn nghèo khổ.' },
    ]
  ),

  'S8GDDP-w22-quiz': L(
    'Nguyễn Tất Thành ra đi tìm đường cứu nước (1911)',
    'Khi các phong trào cũ lần lượt thất bại, một người thanh niên 21 tuổi đã chọn một hướng đi khác hẳn: ra nước ngoài, đi vào lòng các nước "văn minh" để tìm con đường giải phóng cho dân tộc.',
    [
      'Hiểu bối cảnh bế tắc của các con đường cứu nước đầu thế kỉ XX.',
      'Trình bày hành trình và bước ngoặt tư tưởng của Nguyễn Tất Thành.',
      'Liên hệ ý nghĩa của sự kiện với phong trào yêu nước Việt Nam.',
    ],
    [
      { h: 'Bối cảnh bế tắc' },
      { p: 'Đầu thế kỉ XX, các con đường cứu nước đều thất bại: Cần Vương tan rã, Đông Du bị giải tán, Đông Kinh Nghĩa Thục bị đóng cửa, Yên Thế dần suy yếu. Dân tộc Việt Nam đứng trước câu hỏi lớn: đi theo con đường nào để giành lại độc lập?' },
      { h: 'Người thanh niên Nguyễn Tất Thành' },
      { p: 'Nguyễn Tất Thành (sau này là Chủ tịch Hồ Chí Minh) sinh năm 1890. Khác các bậc tiền bối hướng sang Nhật hay Trung Quốc, anh quyết định sang phương Tây — đến tận nước Pháp và các nước khác — để xem họ làm thế nào, rồi trở về giúp đồng bào.' },
      { h: 'Hành trình ra đi' },
      { ul: [
        'Ngày 5/6/1911, từ Bến Nhà Rồng (Sài Gòn), anh lên tàu Latouche-Tréville làm phụ bếp, lấy tên Văn Ba, bắt đầu hành trình tìm đường cứu nước.',
        '1911–1917: qua nhiều nước ở châu Âu, châu Phi, châu Mỹ; vừa lao động kiếm sống vừa học hỏi, quan sát.',
        '1919: gửi "Bản yêu sách của nhân dân An Nam" tới Hội nghị Vécxai, đòi quyền tự do, dân chủ cho dân tộc.',
      ] },
      { h: 'Bước ngoặt tư tưởng (1920)' },
      { p: 'Năm 1920, Nguyễn Ái Quốc đọc "Sơ thảo lần thứ nhất những luận cương về vấn đề dân tộc và vấn đề thuộc địa" của Lê-nin và tìm thấy con đường cứu nước: con đường cách mạng vô sản. Cuối năm 1920, Người tham gia sáng lập Đảng Cộng sản Pháp — trở thành người cộng sản Việt Nam đầu tiên.' },
      { h: 'Liên hệ với Hà Nội' },
      { p: 'Khi ra đi năm 1911, Nguyễn Tất Thành chưa từng đến Hà Nội. Nhưng tinh thần dấn thân tìm đường cứu nước của Người là sự kế thừa và vượt lên các sĩ phu yêu nước, trong đó có những người gắn bó với phong trào ở Hà Nội.' },
      { note: 'Việc Nguyễn Tất Thành tìm ra con đường cách mạng vô sản đã mở ra một thời kì mới cho phong trào giải phóng dân tộc Việt Nam ở thế kỉ XX.' },
    ],
    [
      { q: 'Ngày tháng năm nào Nguyễn Tất Thành ra đi tìm đường cứu nước, từ đâu?', a: 'Ngày 5/6/1911, Nguyễn Tất Thành rời Bến Nhà Rồng (Sài Gòn) trên con tàu Latouche-Tréville, làm phụ bếp với tên gọi Văn Ba, bắt đầu hành trình tìm đường cứu nước.' },
      { q: 'Hướng đi của Nguyễn Tất Thành khác các bậc tiền bối ở điểm nào?', a: 'Trong khi Phan Bội Châu hướng sang Nhật, nhiều sĩ phu hướng về phương Đông, thì Nguyễn Tất Thành quyết định sang phương Tây — đến tận nước Pháp và các nước khác để tìm hiểu rồi trở về giúp dân tộc.' },
      { q: 'Bước ngoặt tư tưởng năm 1920 của Nguyễn Ái Quốc là gì?', a: 'Năm 1920, Người đọc Luận cương của Lê-nin về vấn đề dân tộc và thuộc địa, tìm ra con đường cứu nước là con đường cách mạng vô sản; cuối năm đó Người tham gia sáng lập Đảng Cộng sản Pháp, trở thành người cộng sản Việt Nam đầu tiên.' },
    ]
  ),

  'S8GDDP-w23-quiz': L(
    'Văn hoá Hà Nội — Ẩm thực truyền thống',
    'Người ta nói "ăn Bắc, mặc Kinh" — ẩm thực Hà Nội nổi tiếng tinh tế, thanh tao. Mỗi món ăn không chỉ ngon mà còn là một câu chuyện văn hoá của đất Thủ đô.',
    [
      'Kể tên và mô tả các món ăn đặc trưng của Hà Nội.',
      'Hiểu nét tinh tế, thanh tao trong ẩm thực Hà Nội.',
      'Nhận thức ẩm thực là một phần của di sản văn hoá cần giữ gìn.',
    ],
    [
      { h: 'Phở Hà Nội' },
      { p: 'Xuất hiện đầu thế kỉ XX, phở là niềm tự hào ẩm thực của Hà Nội: nước dùng hầm xương bò trong veo, ngọt thanh, thoảng hương quế — hồi; bánh phở mỏng mềm; ăn kèm hành lá, chút tiêu, chanh, ớt. Có cả phở bò và phở gà.' },
      { h: 'Bún chả' },
      { p: 'Gồm thịt nướng trên than hoa (chả miếng và chả viên), nước mắm pha chua ngọt với đu đủ, cà rốt, bún rối và rau sống. Năm 2016, Tổng thống Mỹ Barack Obama đã thưởng thức bún chả Hà Nội cùng đầu bếp Anthony Bourdain.' },
      { h: 'Chả cá Lã Vọng' },
      { p: 'Cá lăng (hoặc cá quả) tẩm nghệ, riềng, mắm tôm, nướng rồi rán trên chảo nóng ngay tại bàn, ăn cùng bún, lạc rang, rau thơm, mắm tôm pha. Quán Chả cá Lã Vọng có lịch sử hơn 130 năm, đến mức tên quán thành tên một con phố.' },
      { h: 'Các món đặc trưng khác' },
      { ul: [
        'Bánh cuốn Thanh Trì: vỏ mỏng, trắng, không nhân, chấm nước mắm.',
        'Bún thang: thanh nhã, nhiều nguyên liệu, đậm chất Hà Nội.',
        'Cốm Vòng (mùa thu), bánh cốm dùng trong lễ ăn hỏi.',
        'Phở cuốn, bánh tôm Hồ Tây.',
      ] },
      { h: 'Nét tinh tế của ẩm thực Hà Nội' },
      { ul: [
        'Vị thanh, ít cay, ít ngọt, chuộng sự hài hoà.',
        'Nhiều rau thơm, gia vị tươi.',
        'Ăn theo mùa: cốm thu, ốc đông; trình bày trang nhã, ăn từ tốn.',
      ] },
      { note: 'Năm 2016, "bữa bún chả Obama" tại quán Hương Liên (phố Lê Văn Hưu) đã đưa hình ảnh ẩm thực Hà Nội ra thế giới.' },
    ],
    [
      { q: 'Món ăn Hà Nội nào gắn với chuyến thăm của Tổng thống Mỹ Obama năm 2016?', a: 'Đó là món bún chả. Năm 2016, Tổng thống Obama đã ăn bún chả tại quán Hương Liên (phố Lê Văn Hưu, Hà Nội) cùng đầu bếp Anthony Bourdain — sự kiện được gọi vui là "bữa bún chả Obama".' },
      { q: 'Em hãy mô tả một bát phở bò Hà Nội ngon.', a: 'Nước dùng trong veo, ánh vàng nhẹ, ngọt thanh từ xương bò và thơm hương quế — hồi; bánh phở mỏng mềm; thịt bò chín hoặc tái thái mỏng; rắc hành lá, chút tiêu, ăn kèm chanh, ớt — vị thanh tự nhiên, không nồng gắt.' },
      { q: 'Nét tinh tế đặc trưng của ẩm thực Hà Nội là gì?', a: 'Ẩm thực Hà Nội chuộng vị thanh, ít cay ít ngọt, đề cao sự hài hoà; dùng nhiều rau thơm, gia vị tươi; ăn theo mùa (cốm thu, ốc đông) và chú trọng cách trình bày trang nhã, ăn uống từ tốn — thể hiện nếp sống thanh lịch của người Hà Nội.' },
    ]
  ),

  'S8GDDP-w24-quiz': L(
    'Hà Nội trong Cách mạng Tháng Tám 1945',
    'Mùa thu năm 1945, thời cơ "ngàn năm có một" đã đến. Ngày 19/8/1945, Hà Nội rực cờ đỏ sao vàng — Tổng khởi nghĩa thắng lợi, mở ra kỉ nguyên độc lập cho dân tộc.',
    [
      'Trình bày thời cơ và diễn biến Tổng khởi nghĩa ở Hà Nội.',
      'Hiểu ý nghĩa ngày 19/8 và ngày 2/9/1945.',
      'Nhận biết các địa danh lịch sử của Cách mạng Tháng Tám tại Hà Nội.',
    ],
    [
      { h: 'Thời cơ "ngàn năm có một"' },
      { ul: [
        'Ngày 9/3/1945, Nhật đảo chính Pháp, độc chiếm Đông Dương.',
        'Ngày 15/8/1945, phát xít Nhật đầu hàng Đồng minh; chính quyền tay sai hoang mang.',
        'Đảng và Mặt trận Việt Minh phát động Tổng khởi nghĩa giành chính quyền trong cả nước.',
      ] },
      { h: 'Diễn biến tại Hà Nội' },
      { ul: [
        'Ngày 17/8/1945, cuộc mít tinh của chính quyền thân Nhật trước Nhà hát Lớn bị Việt Minh biến thành cuộc tuần hành ủng hộ cách mạng.',
        'Sáng 19/8/1945, hàng vạn quần chúng dự mít tinh tại Quảng trường Nhà hát Lớn, rồi chia thành các đoàn đi chiếm Phủ Khâm sai, Trại Bảo an binh, Sở Cảnh sát, Bắc Bộ phủ...',
        'Cuối ngày 19/8, chính quyền cách mạng được thành lập; cờ đỏ sao vàng tung bay trên Kỳ đài Hà Nội.',
      ] },
      { h: 'Ý nghĩa thắng lợi tại Hà Nội' },
      { p: 'Thắng lợi của khởi nghĩa ở Hà Nội — trung tâm đầu não — đã cổ vũ mạnh mẽ, thúc đẩy nhân dân cả nước nổi dậy giành chính quyền, góp phần quyết định vào thành công của Cách mạng Tháng Tám.' },
      { h: 'Ngày 2/9/1945 — Tuyên ngôn Độc lập' },
      { p: 'Tại Quảng trường Ba Đình, Chủ tịch Hồ Chí Minh đọc bản Tuyên ngôn Độc lập, khai sinh nước Việt Nam Dân chủ Cộng hoà — nhà nước công nông đầu tiên ở Đông Nam Á. Câu hỏi thân tình "Tôi nói đồng bào nghe rõ không?" thể hiện sự gần gũi của Bác với nhân dân.' },
      { note: 'Quảng trường Ba Đình từ đó trở thành không gian thiêng liêng bậc nhất của đất nước — nơi có Lăng Bác, Phủ Chủ tịch và Cột Cờ.' },
    ],
    [
      { q: 'Tổng khởi nghĩa giành chính quyền ở Hà Nội thắng lợi vào ngày nào?', a: 'Ngày 19/8/1945. Hàng vạn quần chúng dự mít tinh tại Quảng trường Nhà hát Lớn rồi đi chiếm các công sở của chính quyền tay sai; cuối ngày, chính quyền cách mạng được thành lập, cờ đỏ sao vàng tung bay trên Kỳ đài Hà Nội.' },
      { q: 'Vì sao thắng lợi của khởi nghĩa ở Hà Nội có ý nghĩa đặc biệt quan trọng?', a: 'Vì Hà Nội là trung tâm đầu não; khởi nghĩa thắng lợi ở đây đã cổ vũ và thúc đẩy nhân dân cả nước nổi dậy giành chính quyền, góp phần quyết định vào thành công chung của Cách mạng Tháng Tám 1945.' },
      { q: 'Sự kiện nào diễn ra tại Quảng trường Ba Đình ngày 2/9/1945?', a: 'Chủ tịch Hồ Chí Minh đọc bản Tuyên ngôn Độc lập, khai sinh nước Việt Nam Dân chủ Cộng hoà — nhà nước công nông đầu tiên ở Đông Nam Á.' },
    ]
  ),

  'S8GDDP-w25-quiz': L(
    'Hà Nội trong kháng chiến chống Pháp (1946–1954)',
    'Mới giành được độc lập, Hà Nội đã phải bước vào cuộc chiến mới. "Quyết tử để Tổ quốc quyết sinh" — 60 ngày đêm mở đầu toàn quốc kháng chiến là một bản hùng ca của Thủ đô.',
    [
      'Trình bày hoàn cảnh và lời kêu gọi Toàn quốc kháng chiến (19/12/1946).',
      'Hiểu tinh thần "Quyết tử để Tổ quốc quyết sinh" của Trung đoàn Thủ đô.',
      'Biết mốc Giải phóng Thủ đô 10/10/1954.',
    ],
    [
      { h: 'Hoàn cảnh' },
      { p: 'Sau Cách mạng Tháng Tám, thực dân Pháp dã tâm quay lại xâm lược. Chúng liên tiếp gây hấn, khiêu khích ở Hà Nội. Đàm phán thất bại, ta buộc phải cầm súng để bảo vệ nền độc lập.' },
      { h: 'Lời kêu gọi Toàn quốc kháng chiến (19/12/1946)' },
      { p: 'Đêm 19/12/1946, hưởng ứng Lời kêu gọi Toàn quốc kháng chiến của Chủ tịch Hồ Chí Minh ("Chúng ta thà hi sinh tất cả, chứ nhất định không chịu mất nước, nhất định không chịu làm nô lệ"), quân và dân Hà Nội nổ súng mở đầu cuộc kháng chiến chống Pháp trên cả nước.' },
      { h: '60 ngày đêm khói lửa (12/1946 – 2/1947)' },
      { ul: [
        'Trung đoàn Thủ đô được thành lập, chiến đấu giam chân địch trong lòng thành phố.',
        'Quân dân đào hào, đục tường thông nhà, dựng chiến luỹ, đánh địch từng căn nhà, góc phố.',
        'Tinh thần "Quyết tử để Tổ quốc quyết sinh" trở thành biểu tượng của Thủ đô.',
        'Đêm 17/2/1947, Trung đoàn Thủ đô rút lui an toàn qua gầm cầu Long Biên ra vùng tự do để bảo toàn lực lượng — một cuộc rút lui thần kì.',
      ] },
      { h: 'Hà Nội dưới tạm chiếm và ngày Giải phóng' },
      { ul: [
        'Từ 1947 đến 1954, Hà Nội nằm dưới sự tạm chiếm của Pháp; phong trào đấu tranh trong lòng địch vẫn âm thầm diễn ra.',
        'Sau chiến thắng Điện Biên Phủ và Hiệp định Giơ-ne-vơ (1954), ngày 10/10/1954, Hà Nội được giải phóng — đại quân ta tiến vào tiếp quản Thủ đô trong rừng cờ hoa.',
      ] },
      { note: 'Ngày 10/10 hằng năm được kỉ niệm là Ngày Giải phóng Thủ đô — một ngày hội lớn của Hà Nội.' },
    ],
    [
      { q: 'Lời kêu gọi Toàn quốc kháng chiến được phát đi khi nào, của ai?', a: 'Đêm 19/12/1946, Chủ tịch Hồ Chí Minh ra Lời kêu gọi Toàn quốc kháng chiến với câu nói nổi tiếng "Chúng ta thà hi sinh tất cả, chứ nhất định không chịu mất nước, nhất định không chịu làm nô lệ" — mở đầu cuộc kháng chiến chống Pháp trên cả nước.' },
      { q: 'Tinh thần "Quyết tử để Tổ quốc quyết sinh" gắn với lực lượng nào ở Hà Nội?', a: 'Gắn với Trung đoàn Thủ đô và quân dân Hà Nội trong 60 ngày đêm chiến đấu giam chân địch trong lòng thành phố (cuối 1946 – đầu 1947), thể hiện ý chí sẵn sàng hi sinh để bảo vệ Tổ quốc.' },
      { q: 'Ngày nào Hà Nội được giải phóng khỏi sự tạm chiếm của Pháp?', a: 'Ngày 10/10/1954. Sau chiến thắng Điện Biên Phủ và Hiệp định Giơ-ne-vơ, đại quân ta tiến vào tiếp quản Thủ đô — ngày này được kỉ niệm là Ngày Giải phóng Thủ đô.' },
    ]
  ),

  'S8GDDP-w26-quiz': L(
    'Hà Nội — "Điện Biên Phủ trên không" tháng 12/1972',
    '12 ngày đêm cuối năm 1972, bầu trời Hà Nội rực sáng đạn lửa phòng không. Đây là lần đầu tiên trên thế giới "pháo đài bay" B-52 bị bắn rơi — một chiến công vang dội của Thủ đô.',
    [
      'Trình bày bối cảnh và quy mô chiến dịch tập kích đường không của Mỹ.',
      'Hiểu vũ khí, chiến thuật bắn rơi B-52 của quân dân Hà Nội.',
      'Phân tích ý nghĩa "Điện Biên Phủ trên không" và tưởng nhớ thảm hoạ Khâm Thiên.',
    ],
    [
      { h: 'Bối cảnh' },
      { p: 'Khi đàm phán ở Hội nghị Paris bế tắc, Tổng thống Mỹ Nixon mở chiến dịch tập kích đường không chiến lược (Linebacker II), dùng "pháo đài bay" B-52 ném bom rải thảm Hà Nội, Hải Phòng nhằm gây sức ép, buộc ta kí hiệp định theo điều kiện của Mỹ.' },
      { h: '12 ngày đêm (18 – 29/12/1972)' },
      { ul: [
        'Mỹ huy động hàng trăm lần chiếc B-52 cùng nhiều máy bay chiến thuật, ném hàng vạn tấn bom.',
        'Quân dân Hà Nội dùng tên lửa SAM-2 làm vũ khí chủ lực, phối hợp pháo cao xạ, súng máy phòng không và máy bay MiG-21 đánh chặn ban đêm.',
        'Cả thành phố tổ chức sơ tán, đào hầm trú ẩn khắp các phố.',
      ] },
      { h: 'Thảm hoạ Khâm Thiên' },
      { p: 'Đêm 26/12/1972, B-52 rải thảm phố Khâm Thiên — khu dân cư đông đúc — làm 287 người chết, hàng nghìn ngôi nhà bị phá huỷ. Tượng đài người mẹ bồng con đã mất nay là chứng tích tố cáo tội ác chiến tranh.' },
      { h: 'Kết quả và ý nghĩa' },
      { ul: [
        'Quân dân Hà Nội cùng miền Bắc bắn rơi nhiều máy bay Mỹ, trong đó có hàng chục chiếc B-52 — lần đầu tiên B-52 bị bắn hạ trên chiến trường.',
        'Mỹ thất bại nặng nề, buộc phải ngừng ném bom và kí Hiệp định Paris (27/1/1973), cam kết rút quân khỏi Việt Nam.',
        'Chiến thắng được ví như một "Điện Biên Phủ trên không".',
      ] },
      { note: 'Hà Nội là thủ đô duy nhất trên thế giới đánh thắng "pháo đài bay" B-52 — một niềm tự hào lớn của dân tộc.' },
    ],
    [
      { q: 'Vì sao chiến thắng tháng 12/1972 được gọi là "Điện Biên Phủ trên không"?', a: 'Vì tầm vóc của nó ngang với chiến thắng Điện Biên Phủ 1954: cả hai đều buộc đối phương phải ngồi vào bàn đàm phán và kí hiệp định kết thúc chiến tranh; điểm khác là trận quyết chiến lần này diễn ra trên bầu trời, đánh bại B-52 của Mỹ.' },
      { q: 'Phố nào ở Hà Nội bị B-52 rải thảm gây thiệt hại nặng nề nhất?', a: 'Phố Khâm Thiên. Đêm 26/12/1972, B-52 rải thảm khu dân cư này làm 287 người chết, hàng nghìn ngôi nhà bị phá huỷ; nay có tượng đài người mẹ bồng con để tưởng niệm.' },
      { q: 'Kết quả của "Điện Biên Phủ trên không" đối với cuộc chiến là gì?', a: 'Quân dân ta bắn rơi nhiều máy bay Mỹ, trong đó có hàng chục chiếc B-52 (lần đầu B-52 bị hạ trên chiến trường), khiến Mỹ thất bại nặng nề, buộc phải ngừng ném bom và kí Hiệp định Paris ngày 27/1/1973.' },
    ]
  ),

  'S8GDDP-w27-quiz': L(
    'Hà Nội — Thủ đô anh hùng, Thành phố vì hoà bình',
    'Với những đóng góp và hi sinh to lớn, Hà Nội được trao những danh hiệu cao quý. Nhưng vinh quang quá khứ cũng đặt lên vai mỗi công dân hôm nay một trách nhiệm.',
    [
      'Biết các danh hiệu cao quý của Hà Nội.',
      'Hiểu cơ sở để Hà Nội xứng đáng với những danh hiệu đó.',
      'Liên hệ trách nhiệm xây dựng Thủ đô hôm nay.',
    ],
    [
      { h: 'Các danh hiệu cao quý' },
      { ul: [
        'Năm 1999, UNESCO trao tặng Hà Nội danh hiệu "Thành phố vì hoà bình" — thành phố châu Á đầu tiên được nhận.',
        'Hà Nội được Nhà nước phong tặng danh hiệu "Thủ đô Anh hùng" và Huân chương Sao Vàng.',
        'Truyền thống "Hà Nội — Thủ đô của lương tri và phẩm giá con người".',
      ] },
      { h: 'Cơ sở của những danh hiệu' },
      { ul: [
        '60 ngày đêm khói lửa mở đầu Toàn quốc kháng chiến (1946–1947).',
        'Chiến thắng "Điện Biên Phủ trên không" (1972).',
        'Đóng góp to lớn về sức người, sức của cho cả hai cuộc kháng chiến chống Pháp và chống Mỹ.',
        'Là trung tâm chính trị — văn hoá, nơi hội tụ tinh hoa của dân tộc qua ngàn năm.',
      ] },
      { h: 'Trách nhiệm của Hà Nội hôm nay' },
      { ul: [
        'Phát triển kinh tế, khoa học — công nghệ, xứng tầm thủ đô khu vực.',
        'Bảo tồn và phát huy các giá trị di sản văn hoá, lịch sử.',
        'Xây dựng Thủ đô "Văn hiến — Văn minh — Hiện đại".',
        'Giữ gìn môi trường, ứng xử văn minh, thanh lịch.',
      ] },
      { h: 'Trách nhiệm của học sinh' },
      { p: 'Mỗi học sinh Hà Nội cần học tập tốt, sống có ý thức, giữ gìn di sản và môi trường, ứng xử văn minh — góp phần xứng đáng với truyền thống "Thủ đô Anh hùng".' },
      { note: 'Danh hiệu là vinh dự, nhưng cũng là trách nhiệm: giữ gìn và làm rạng danh Thủ đô là việc của mọi người dân, trong đó có chính các em.' },
    ],
    [
      { q: 'Hà Nội được UNESCO trao danh hiệu gì vào năm 1999?', a: 'Năm 1999, UNESCO trao tặng Hà Nội danh hiệu "Thành phố vì hoà bình" — Hà Nội là thành phố châu Á đầu tiên được nhận danh hiệu này.' },
      { q: 'Vì sao Hà Nội được phong là "Thủ đô Anh hùng"?', a: 'Vì những đóng góp và chiến công to lớn: 60 ngày đêm mở đầu Toàn quốc kháng chiến, chiến thắng "Điện Biên Phủ trên không" 1972, cùng sự đóng góp lớn về sức người sức của cho cả hai cuộc kháng chiến chống Pháp và chống Mỹ.' },
      { q: 'Theo em, học sinh Hà Nội cần làm gì để xứng đáng với truyền thống Thủ đô?', a: 'Học sinh cần học tập tốt, sống có ý thức và trách nhiệm; giữ gìn di sản văn hoá, bảo vệ môi trường; ứng xử văn minh, thanh lịch — góp phần xây dựng Thủ đô "Văn hiến — Văn minh — Hiện đại" và làm rạng danh truyền thống anh hùng.' },
    ]
  ),

  'S8GDDP-w28-quiz': L(
    'Văn Miếu – Quốc Tử Giám: trường đại học đầu tiên của Việt Nam',
    'Giữa lòng Hà Nội có một không gian thanh tịnh gần nghìn năm tuổi — Văn Miếu – Quốc Tử Giám, biểu tượng của truyền thống hiếu học và đạo lí "tôn sư trọng đạo" của dân tộc.',
    [
      'Nắm niên đại lập Văn Miếu (1070) và Quốc Tử Giám (1076).',
      'Hiểu giá trị của 82 bia Tiến sĩ và Khuê Văn Các.',
      'Trân trọng truyền thống hiếu học, tôn vinh nhân tài.',
    ],
    [
      { h: '1070 — Văn Miếu' },
      { p: 'Năm 1070, vua Lý Thánh Tông cho lập Văn Miếu thờ Khổng Tử, Chu Công và các bậc tiên hiền của đạo Nho — nơi tôn vinh đạo học.' },
      { h: '1076 — Quốc Tử Giám' },
      { p: 'Năm 1076, vua Lý Nhân Tông lập Quốc Tử Giám bên cạnh Văn Miếu — được coi là trường đại học đầu tiên của Việt Nam, ban đầu dành cho con vua quan, về sau mở rộng cho cả những học trò giỏi trong dân chúng.' },
      { h: 'Kiến trúc 5 lớp sân' },
      { ul: [
        'Khu di tích chia thành 5 lớp không gian, ngăn cách bởi các cổng và tường.',
        'Hồ Thiên Quang ở khu trung tâm.',
        'Khuê Văn Các — gác nhỏ hình ngôi sao Khuê — và nhà bia Tiến sĩ.',
        'Đại Bái đường, điện Đại Thành — nơi thờ tự.',
      ] },
      { h: '82 bia Tiến sĩ' },
      { p: 'Từ năm 1442, triều Lê dựng bia khắc tên những người đỗ tiến sĩ qua các khoa thi. Hiện còn 82 tấm bia đặt trên lưng rùa đá, ghi danh hơn 1.300 tiến sĩ. Năm 2010, UNESCO ghi danh 82 bia Tiến sĩ là Di sản tư liệu thế giới.' },
      { h: 'Khuê Văn Các — biểu tượng Hà Nội' },
      { p: 'Khuê Văn Các (xây năm 1805 thời Nguyễn) là gác gỗ hai tầng, có cửa sổ tròn tượng trưng cho sao Khuê — ngôi sao của văn chương. Đây là biểu tượng văn hoá của Thủ đô Hà Nội, được in trên tờ tiền 100.000 đồng.' },
      { note: 'Trên bia Tiến sĩ có câu nổi tiếng của Thân Nhân Trung: "Hiền tài là nguyên khí của quốc gia" — đề cao vai trò của người tài đối với đất nước.' },
    ],
    [
      { q: 'Văn Miếu và Quốc Tử Giám được lập vào những năm nào, dưới triều vua nào?', a: 'Văn Miếu được lập năm 1070 dưới thời vua Lý Thánh Tông (thờ Khổng Tử); Quốc Tử Giám được lập năm 1076 dưới thời vua Lý Nhân Tông — được coi là trường đại học đầu tiên của Việt Nam.' },
      { q: 'Vì sao 82 bia Tiến sĩ ở Văn Miếu có giá trị đặc biệt?', a: 'Vì các tấm bia khắc tên, quê quán những người đỗ tiến sĩ qua các khoa thi, vừa là tư liệu lịch sử khoa cử quý giá, vừa là tác phẩm điêu khắc; thể hiện chính sách trọng dụng nhân tài. Năm 2010, UNESCO ghi danh là Di sản tư liệu thế giới.' },
      { q: 'Khuê Văn Các có ý nghĩa biểu tượng như thế nào?', a: 'Khuê Văn Các (gác sao Khuê) tượng trưng cho văn chương, học vấn; được chọn làm biểu tượng văn hoá của Thủ đô Hà Nội và được in trên tờ tiền 100.000 đồng — gắn với truyền thống hiếu học của dân tộc.' },
    ]
  ),

  'S8GDDP-w29-quiz': L(
    'Hà Nội xây dựng đô thị thông minh (Smart City)',
    'Hà Nội của các em đang bước vào kỉ nguyên số. "Đô thị thông minh" không còn là chuyện viễn tưởng — nó hiện diện trong từng dịch vụ công trực tuyến, từng chiếc đèn giao thông biết "suy nghĩ".',
    [
      'Hiểu khái niệm đô thị thông minh (smart city).',
      'Nhận biết các ứng dụng công nghệ trong quản lí đô thị Hà Nội.',
      'Hình dung hướng phát triển công nghệ của Thủ đô.',
    ],
    [
      { h: 'Đô thị thông minh là gì?' },
      { p: 'Đô thị thông minh (smart city) là thành phố ứng dụng công nghệ thông tin và truyền thông (ICT), dữ liệu lớn (big data), Internet vạn vật (IoT) và trí tuệ nhân tạo (AI) vào quản lí và đời sống — nhằm nâng cao chất lượng sống của người dân, tiết kiệm tài nguyên và quản lí hiệu quả hơn.' },
      { h: 'Các trụ cột của đô thị thông minh' },
      { ul: [
        'Chính quyền số: dịch vụ công trực tuyến, giảm giấy tờ.',
        'Giao thông thông minh: đèn tín hiệu tự điều chỉnh, camera giám sát, bản đồ giao thông trực tuyến.',
        'Môi trường: cảm biến quan trắc không khí, nước theo thời gian thực.',
        'Y tế, giáo dục số: hồ sơ điện tử, học và khám trực tuyến.',
      ] },
      { h: 'Ứng dụng tại Hà Nội' },
      { ul: [
        'Cổng dịch vụ công trực tuyến cho phép người dân nộp hồ sơ, thủ tục qua mạng.',
        'Ứng dụng "iHanoi" giúp tra cứu thông tin, phản ánh kiến nghị, theo dõi giao thông, hành chính.',
        'Lắp đặt camera giám sát giao thông, an ninh; thí điểm đèn tín hiệu thông minh.',
        'Hệ thống quan trắc chất lượng không khí công bố công khai.',
      ] },
      { h: 'Hướng phát triển tương lai' },
      { ul: [
        'Phủ sóng mạng 5G, mở rộng hạ tầng số.',
        'Ứng dụng AI hỗ trợ điều hành giao thông, y tế, dịch vụ công.',
        'Xây dựng các khu đô thị thông minh ở phía Bắc sông Hồng.',
        'Phát triển thanh toán không tiền mặt, vé điện tử cho metro, xe buýt.',
      ] },
      { note: 'Công nghệ chỉ phát huy hiệu quả khi mỗi người dân — trong đó có học sinh — biết sử dụng đúng cách và có trách nhiệm trên không gian số.' },
    ],
    [
      { q: 'Đô thị thông minh (smart city) là gì?', a: 'Là thành phố ứng dụng công nghệ thông tin, dữ liệu lớn (big data), Internet vạn vật (IoT) và trí tuệ nhân tạo (AI) vào quản lí và đời sống, nhằm nâng cao chất lượng sống của người dân, tiết kiệm tài nguyên và quản lí hiệu quả hơn.' },
      { q: 'Ứng dụng "iHanoi" giúp người dân làm những gì?', a: 'Ứng dụng "iHanoi" giúp người dân tra cứu thông tin về hành chính, giao thông, dịch vụ; phản ánh, kiến nghị với chính quyền; theo dõi tình hình thành phố — góp phần xây dựng chính quyền số và đô thị thông minh.' },
      { q: 'Hãy nêu một vài hướng phát triển công nghệ của Hà Nội trong tương lai.', a: 'Phủ sóng mạng 5G và mở rộng hạ tầng số; ứng dụng AI hỗ trợ điều hành giao thông, y tế; xây dựng khu đô thị thông minh phía Bắc sông Hồng; phát triển thanh toán không tiền mặt và vé điện tử cho metro, xe buýt.' },
    ]
  ),

  'S8GDDP-w30-quiz': L(
    'Quy hoạch và phát triển đô thị Hà Nội',
    'Hà Nội đang lớn lên từng ngày. Đằng sau những toà nhà cao tầng và những con đường vành đai là cả một bài toán quy hoạch lớn — làm sao để Thủ đô vừa hiện đại, vừa đáng sống.',
    [
      'Biết những nét chính trong định hướng quy hoạch Hà Nội.',
      'Hiểu việc mở rộng địa giới năm 2008 và mô hình đô thị vệ tinh.',
      'Nhận diện các thách thức của quá trình đô thị hoá.',
    ],
    [
      { h: 'Mở rộng địa giới năm 2008' },
      { p: 'Năm 2008, Hà Nội sáp nhập toàn bộ tỉnh Hà Tây, huyện Mê Linh (Vĩnh Phúc) và 4 xã của Hoà Bình. Diện tích Thủ đô tăng lên hơn 3.300 km², trở thành một trong những thủ đô có diện tích lớn trên thế giới, mở rộng không gian phát triển.' },
      { h: 'Định hướng quy hoạch' },
      { ul: [
        'Lấy sông Hồng làm trục cảnh quan trung tâm của thành phố.',
        'Phát triển mô hình đô thị trung tâm cùng các đô thị vệ tinh: Hoà Lạc, Sơn Tây, Xuân Mai, Phú Xuyên, Sóc Sơn.',
        'Mở rộng hệ thống giao thông: các tuyến vành đai, đường sắt đô thị (metro), cầu vượt sông Hồng.',
        'Phát triển các khu đô thị mới hiện đại (Mỹ Đình, Tây Hồ Tây, Đông Anh...).',
      ] },
      { h: 'Đô thị vệ tinh là gì?' },
      { p: 'Đô thị vệ tinh là các thành phố nhỏ nằm quanh đô thị trung tâm, có chức năng riêng (công nghệ, du lịch, đào tạo...), giúp "giãn" dân và hoạt động ra khỏi nội đô, giảm áp lực cho khu trung tâm.' },
      { h: 'Những thách thức của đô thị hoá' },
      { ul: [
        'Ùn tắc giao thông ở các trục chính, nhất là giờ cao điểm.',
        'Ô nhiễm không khí, nước, tiếng ồn.',
        'Ngập úng cục bộ khi mưa lớn.',
        'Áp lực dân số: nhà ở, trường học, bệnh viện quá tải.',
      ] },
      { note: 'Quy hoạch tốt là quy hoạch cân bằng giữa phát triển và bảo tồn, giữa hiện đại và bản sắc — để Hà Nội vừa lớn mạnh vừa giữ được hồn cốt ngàn năm.' },
    ],
    [
      { q: 'Việc mở rộng địa giới Hà Nội năm 2008 diễn ra như thế nào?', a: 'Năm 2008, Hà Nội sáp nhập toàn bộ tỉnh Hà Tây, huyện Mê Linh (Vĩnh Phúc) và 4 xã của Hoà Bình, khiến diện tích Thủ đô tăng lên hơn 3.300 km² — trở thành một trong những thủ đô có diện tích lớn, mở rộng không gian phát triển.' },
      { q: '"Đô thị vệ tinh" là gì và Hà Nội định phát triển những đô thị vệ tinh nào?', a: 'Đô thị vệ tinh là các thành phố nhỏ quanh đô thị trung tâm, có chức năng riêng, giúp giãn dân và giảm áp lực cho nội đô. Hà Nội định hướng phát triển 5 đô thị vệ tinh: Hoà Lạc, Sơn Tây, Xuân Mai, Phú Xuyên, Sóc Sơn.' },
      { q: 'Quá trình đô thị hoá đặt ra những thách thức gì cho Hà Nội?', a: 'Đó là ùn tắc giao thông, ô nhiễm không khí — nước — tiếng ồn, ngập úng khi mưa lớn và áp lực dân số khiến nhà ở, trường học, bệnh viện quá tải — đòi hỏi quy hoạch và quản lí hợp lí.' },
    ]
  ),

  'S8GDDP-w31-quiz': L(
    'Bảo vệ môi trường ở Hà Nội',
    'Thủ đô càng phát triển thì sức ép lên môi trường càng lớn. Bảo vệ bầu không khí, dòng sông, mảng xanh của Hà Nội không phải việc của riêng ai — mỗi học sinh đều có thể góp một tay.',
    [
      'Nhận diện các vấn đề môi trường nổi cộm của Hà Nội.',
      'Hiểu nguyên nhân ô nhiễm không khí và nước.',
      'Đề xuất giải pháp và hành động ở mức học sinh.',
    ],
    [
      { h: 'Hiện trạng môi trường' },
      { ul: [
        'Không khí: chỉ số bụi mịn PM2.5 nhiều ngày vượt ngưỡng an toàn, nhất là mùa đông — đầu xuân.',
        'Nước: các sông Tô Lịch, Kim Ngưu, Lừ, Sét bị ô nhiễm nặng, nước đen và bốc mùi.',
        'Rác thải: thành phố thải ra hàng nghìn tấn rác mỗi ngày.',
        'Tiếng ồn ở nhiều tuyến phố vượt mức cho phép.',
      ] },
      { h: 'Bụi mịn PM2.5 là gì?' },
      { p: 'PM2.5 là các hạt bụi mịn có đường kính nhỏ hơn 2,5 micromet — nhỏ tới mức có thể đi sâu vào phổi và máu, gây bệnh hô hấp, tim mạch, thậm chí ung thư. Đây là loại ô nhiễm không khí nguy hiểm đối với sức khoẻ.' },
      { h: 'Nguyên nhân' },
      { ul: [
        'Khí thải từ hàng triệu xe máy, ô tô.',
        'Bụi từ các công trình xây dựng.',
        'Đốt rơm rạ sau vụ mùa ở ngoại thành; đốt rác tự phát.',
        'Hiện tượng nghịch nhiệt mùa đông khiến bụi bị "nén" lại sát mặt đất.',
        'Nước thải sinh hoạt, công nghiệp chưa được xử lí triệt để.',
      ] },
      { h: 'Giải pháp' },
      { ul: [
        'Phát triển giao thông công cộng (metro, xe buýt điện); khuyến khích xe điện.',
        'Cấm và xử lí việc đốt rơm rạ, đốt rác bừa bãi.',
        'Cải tạo, làm sạch các dòng sông; xây nhà máy xử lí nước thải.',
        'Tăng mảng xanh, trồng thêm cây; phân loại rác tại nguồn.',
      ] },
      { h: 'Học sinh có thể làm gì?' },
      { p: 'Đi bộ, đi xe đạp hoặc xe buýt thay cho việc đi xe máy quãng ngắn; không xả rác, tham gia phân loại rác; trồng và chăm sóc cây; tuyên truyền cho gia đình, bạn bè cùng bảo vệ môi trường.' },
      { note: 'Bảo vệ môi trường bắt đầu từ những thói quen nhỏ hằng ngày — nhưng nếu hàng triệu người cùng làm, hiệu quả sẽ rất lớn.' },
    ],
    [
      { q: 'Bụi mịn PM2.5 là gì và vì sao nguy hiểm?', a: 'PM2.5 là các hạt bụi mịn có đường kính nhỏ hơn 2,5 micromet, nhỏ tới mức đi sâu vào phổi và máu, gây bệnh hô hấp, tim mạch, thậm chí ung thư — nên rất nguy hiểm cho sức khoẻ con người.' },
      { q: 'Hãy nêu các nguyên nhân chính gây ô nhiễm không khí ở Hà Nội.', a: 'Khí thải từ hàng triệu xe máy, ô tô; bụi từ công trình xây dựng; đốt rơm rạ và đốt rác tự phát; cùng hiện tượng nghịch nhiệt mùa đông khiến bụi bị nén lại sát mặt đất, làm không khí thêm ô nhiễm.' },
      { q: 'Là học sinh, em có thể làm gì để góp phần bảo vệ môi trường Thủ đô?', a: 'Đi bộ, đi xe đạp hoặc xe buýt thay xe máy quãng ngắn; không xả rác và tham gia phân loại rác tại nguồn; trồng, chăm sóc cây xanh; đồng thời tuyên truyền cho gia đình và bạn bè cùng chung tay bảo vệ môi trường.' },
    ]
  ),

  'S8GDDP-w32-quiz': L(
    'Du lịch Hà Nội — di sản và trải nghiệm',
    'Hà Nội là một trong những điểm đến hấp dẫn nhất Việt Nam, nơi du khách có thể chạm vào lịch sử, thưởng thức ẩm thực và đắm mình trong văn hoá. Hiểu về du lịch Thủ đô cũng là hiểu cách quảng bá quê hương.',
    [
      'Kể tên các điểm du lịch tiêu biểu của Hà Nội.',
      'Nhận biết các loại hình trải nghiệm văn hoá — ẩm thực.',
      'Hiểu vai trò của học sinh trong việc quảng bá, gìn giữ di sản.',
    ],
    [
      { h: 'Các điểm du lịch tiêu biểu' },
      { ul: [
        'Hồ Hoàn Kiếm — Tháp Rùa — Đền Ngọc Sơn — Cầu Thê Húc.',
        'Văn Miếu – Quốc Tử Giám; Hoàng thành Thăng Long.',
        'Lăng Chủ tịch Hồ Chí Minh, Phủ Chủ tịch, Quảng trường Ba Đình.',
        'Khu phố cổ, Nhà thờ Lớn, cầu Long Biên.',
        'Hồ Tây, làng cổ Đường Lâm (Sơn Tây), Bát Tràng, Vạn Phúc.',
      ] },
      { h: 'Trải nghiệm văn hoá' },
      { ul: [
        'Xem múa rối nước tại Nhà hát Múa rối Thăng Long.',
        'Thưởng thức ẩm thực: phở, bún chả, chả cá, cà phê trứng.',
        'Dạo phố đi bộ Hồ Gươm cuối tuần, nghe biểu diễn nghệ thuật đường phố.',
        'Tham quan bảo tàng, trải nghiệm tour đêm Hoả Lò.',
      ] },
      { h: 'Du lịch làng nghề và ngoại thành' },
      { p: 'Du khách có thể về Bát Tràng nặn gốm, sang Vạn Phúc xem dệt lụa, thăm làng cổ Đường Lâm với những ngôi nhà đá ong, hay lên Ba Vì, chùa Hương để hoà mình vào thiên nhiên.' },
      { h: 'Du lịch có trách nhiệm' },
      { ul: [
        'Giữ vệ sinh, không xả rác, không viết — vẽ bậy lên di tích.',
        'Ăn mặc lịch sự khi vào đền, chùa; tôn trọng nghi lễ.',
        'Mua sắm có chọn lọc, ủng hộ sản phẩm làng nghề thật.',
      ] },
      { h: 'Vai trò của học sinh' },
      { p: 'Học sinh có thể trở thành "đại sứ du lịch" của Hà Nội: hiểu biết về di sản để giới thiệu cho bạn bè trong và ngoài nước; học ngoại ngữ để giao tiếp; tự hào và có ý thức bảo vệ di sản quê hương.' },
      { note: 'Cà phê trứng — món thức uống độc đáo do quán Café Giảng (phố Nguyễn Hữu Huân) sáng tạo từ năm 1946 — đã trở thành một "đặc sản" gắn với du lịch Hà Nội.' },
    ],
    [
      { q: 'Hãy kể tên một số điểm du lịch tiêu biểu ở khu vực trung tâm Hà Nội.', a: 'Hồ Hoàn Kiếm với Tháp Rùa, Đền Ngọc Sơn, Cầu Thê Húc; Văn Miếu – Quốc Tử Giám; Hoàng thành Thăng Long; khu phố cổ và Nhà thờ Lớn; Lăng Bác và Quảng trường Ba Đình — đều nằm ở khu trung tâm.' },
      { q: 'Du lịch có trách nhiệm khi tham quan di tích nghĩa là gì?', a: 'Là giữ vệ sinh, không xả rác, không viết vẽ bậy lên di tích; ăn mặc lịch sự và tôn trọng nghi lễ khi vào đền chùa; mua sắm có chọn lọc, ủng hộ sản phẩm làng nghề thật — để vừa thưởng thức vừa góp phần gìn giữ di sản.' },
      { q: 'Học sinh có thể đóng vai trò gì trong việc quảng bá du lịch Hà Nội?', a: 'Học sinh có thể là "đại sứ du lịch": tìm hiểu kĩ về di sản để giới thiệu cho bạn bè trong và ngoài nước, học ngoại ngữ để giao tiếp, đồng thời tự hào và có ý thức bảo vệ, gìn giữ di sản quê hương.' },
    ]
  ),

  'S8GDDP-w33-quiz': L(
    'Hà Nội — Thành phố sáng tạo của UNESCO',
    'Năm 2019, Hà Nội gia nhập Mạng lưới các Thành phố sáng tạo của UNESCO. Thủ đô ngàn năm tuổi đang trẻ lại từng ngày nhờ sức sáng tạo của giới trẻ và những không gian văn hoá mới.',
    [
      'Biết danh hiệu "Thành phố sáng tạo" của Hà Nội (2019).',
      'Hiểu khái niệm công nghiệp văn hoá và "bảo tồn động".',
      'Nhận biết các không gian sáng tạo và cách học sinh tham gia.',
    ],
    [
      { h: 'Danh hiệu Thành phố sáng tạo (2019)' },
      { p: 'Năm 2019, Hà Nội chính thức gia nhập Mạng lưới các Thành phố sáng tạo của UNESCO (UCCN) ở lĩnh vực Thiết kế — khẳng định Thủ đô là nơi hội tụ ý tưởng, thiết kế và sáng tạo, lấy văn hoá làm nguồn lực phát triển.' },
      { h: 'Sức sáng tạo của giới trẻ Hà Nội' },
      { ul: [
        'Thời trang Việt, streetwear; nghệ thuật đường phố (street art).',
        'Phim ngắn, podcast, âm nhạc độc lập.',
        'Khởi nghiệp công nghệ, thiết kế đồ hoạ, nội dung số.',
      ] },
      { h: 'Các không gian sáng tạo' },
      { ul: [
        'Phố đi bộ Hồ Gươm — sân khấu nghệ thuật cuối tuần.',
        'Các tổ hợp sáng tạo cải tạo từ nhà máy, kho cũ (như Complex 01, Hanoi Creative City).',
        'Lễ hội Thiết kế Sáng tạo Hà Nội tổ chức hằng năm, biến các di sản thành không gian trưng bày, biểu diễn.',
      ] },
      { h: '"Bảo tồn động" — sáng tạo trên nền di sản' },
      { p: '"Bảo tồn động" là cách giữ gìn di sản không phải bằng việc "đóng băng" mà bằng việc thổi sức sống mới vào: dùng nghệ thuật, công nghệ (chiếu sáng nghệ thuật, AR/VR, tour đêm) để di sản gần gũi với người trẻ và tạo nguồn lực nuôi việc bảo tồn.' },
      { h: 'Học sinh tham gia thế nào?' },
      { ul: [
        'Tham gia câu lạc bộ nghệ thuật, thiết kế, công nghệ ở trường.',
        'Đi xem triển lãm, workshop, lễ hội sáng tạo.',
        'Tự sáng tạo: vẽ, viết, làm video về Hà Nội.',
      ] },
      { note: 'Sáng tạo không chỉ là việc của nghệ sĩ — mỗi học sinh đều có thể đóng góp ý tưởng mới cho Thủ đô, bắt đầu từ chính trường lớp của mình.' },
    ],
    [
      { q: 'Hà Nội gia nhập Mạng lưới Thành phố sáng tạo của UNESCO năm nào, ở lĩnh vực gì?', a: 'Năm 2019, Hà Nội gia nhập Mạng lưới các Thành phố sáng tạo của UNESCO (UCCN) ở lĩnh vực Thiết kế — khẳng định Thủ đô lấy văn hoá, sáng tạo làm nguồn lực phát triển.' },
      { q: '"Bảo tồn động" di sản nghĩa là gì?', a: 'Là cách giữ gìn di sản không bằng việc "đóng băng" mà bằng việc thổi sức sống mới vào nó — dùng nghệ thuật và công nghệ (chiếu sáng, AR/VR, tour đêm...) để di sản gần gũi với người trẻ, đồng thời tạo nguồn lực nuôi việc bảo tồn.' },
      { q: 'Học sinh có thể tham gia vào đời sống sáng tạo của Hà Nội bằng cách nào?', a: 'Tham gia các câu lạc bộ nghệ thuật, thiết kế, công nghệ ở trường; đi xem triển lãm, workshop, lễ hội sáng tạo; và tự sáng tạo bằng cách vẽ, viết, làm video, chia sẻ ý tưởng mới về Hà Nội.' },
    ]
  ),

  'S8GDDP-w34-quiz': L(
    'Trách nhiệm của công dân trong xây dựng Thủ đô',
    'Hà Nội đẹp hay không, văn minh hay không — phụ thuộc vào chính cách mỗi người dân sống và ứng xử. Mỗi học sinh hôm nay là một "đại sứ" của Thủ đô.',
    [
      'Hiểu trách nhiệm của công dân với Thủ đô.',
      'Biết nội dung Quy tắc ứng xử nơi công cộng của Hà Nội.',
      'Liên hệ những việc học sinh có thể làm để góp phần xây dựng Thủ đô.',
    ],
    [
      { h: 'Vì sao công dân Thủ đô có trách nhiệm đặc biệt?' },
      { p: 'Hà Nội là Thủ đô — bộ mặt của cả nước, nơi bạn bè quốc tế nhìn vào để hình dung về Việt Nam. Vì vậy, mỗi công dân Hà Nội không chỉ sống cho mình mà còn góp phần tạo nên hình ảnh của Thủ đô và đất nước.' },
      { h: 'Trách nhiệm của công dân' },
      { ul: [
        'Tuân thủ pháp luật, giữ gìn trật tự, an toàn giao thông.',
        'Bảo vệ môi trường, giữ vệ sinh nơi công cộng.',
        'Gìn giữ và phát huy di sản văn hoá, lịch sử.',
        'Ứng xử văn minh, thanh lịch; đóng góp lao động, trí tuệ cho thành phố.',
      ] },
      { h: 'Quy tắc ứng xử nơi công cộng' },
      { p: 'Năm 2017, Hà Nội ban hành "Quy tắc ứng xử nơi công cộng" nhằm xây dựng người Hà Nội thanh lịch, văn minh: không xả rác, không nói tục, xếp hàng nơi đông người, nhường ghế cho người già — trẻ em — phụ nữ có thai trên xe buýt, ăn mặc lịch sự ở nơi tôn nghiêm...' },
      { h: '"Người Hà Nội thanh lịch, văn minh"' },
      { p: 'Nét "thanh lịch" của người Hà Nội không phải sự khoe khoang, mà thể hiện ở cách ứng xử lịch sự, tôn trọng người khác, có văn hoá trong lời nói và việc làm hằng ngày. Ca dao xưa: "Chẳng thơm cũng thể hoa nhài / Dẫu không thanh lịch cũng người Tràng An."' },
      { h: 'Học sinh đóng góp gì?' },
      { ul: [
        'Học tập tốt — là tương lai của Thủ đô.',
        'Giữ gìn vệ sinh, bảo vệ môi trường nơi mình sống.',
        'Tham gia hoạt động cộng đồng, tình nguyện.',
        'Ứng xử văn minh và giới thiệu, quảng bá Hà Nội với bạn bè.',
      ] },
      { note: 'Mỗi học sinh Hà Nội đều là "đại sứ" của Thủ đô — cách các em ứng xử cho người khác thấy người Hà Nội là như thế nào.' },
    ],
    [
      { q: '"Người Hà Nội thanh lịch, văn minh" nên được hiểu như thế nào?', a: 'Đó không phải sự khoe khoang, mà thể hiện ở cách ứng xử lịch sự, tôn trọng người khác, có văn hoá trong lời nói và việc làm hằng ngày — đúng như câu ca dao "Chẳng thơm cũng thể hoa nhài / Dẫu không thanh lịch cũng người Tràng An".' },
      { q: 'Quy tắc ứng xử nơi công cộng của Hà Nội (2017) gồm những nội dung gì?', a: 'Gồm các nội dung như: không xả rác, không nói tục; xếp hàng nơi đông người; nhường ghế cho người già, trẻ em, phụ nữ có thai trên xe buýt; ăn mặc lịch sự ở nơi tôn nghiêm... nhằm xây dựng người Hà Nội thanh lịch, văn minh.' },
      { q: 'Là học sinh, em có thể đóng góp gì cho việc xây dựng Thủ đô?', a: 'Học tập tốt vì là tương lai của Thủ đô; giữ gìn vệ sinh, bảo vệ môi trường nơi mình sống; tham gia hoạt động cộng đồng, tình nguyện; ứng xử văn minh và tích cực giới thiệu, quảng bá hình ảnh Hà Nội với bạn bè.' },
    ]
  ),

  'S8GDDP-w35-quiz': L(
    'Ôn tập cuối năm — Hà Nội: lịch sử, văn hoá và tương lai',
    'Khép lại một năm học Giáo dục địa phương, cô trò ta cùng nhìn lại bức tranh trọn vẹn về Hà Nội: từ những trang sử cận đại bi tráng, kho tàng văn hoá đặc sắc, đến một Thủ đô hiện đại đang vươn mình.',
    [
      'Hệ thống các sự kiện lịch sử Hà Nội cận — hiện đại.',
      'Khái quát các giá trị văn hoá và di sản tiêu biểu.',
      'Liên hệ quá khứ — hiện tại — tương lai và trách nhiệm của bản thân.',
    ],
    [
      { h: 'Lịch sử Hà Nội (1873–1972)' },
      { ul: [
        'Pháp xâm chiếm (1873, 1882) — Nguyễn Tri Phương, Hoàng Diệu.',
        'Quy hoạch thuộc địa, cầu Long Biên, Nhà hát Lớn.',
        'Phong trào yêu nước: Đông Du, Đông Kinh Nghĩa Thục, Yên Thế.',
        'Cách mạng Tháng Tám 1945, kháng chiến chống Pháp 1946–1954.',
        '"Điện Biên Phủ trên không" 1972.',
      ] },
      { h: 'Văn hoá Hà Nội' },
      { ul: [
        'Khu phố cổ "36 phố phường"; làng nghề Vạn Phúc, Bát Tràng, Ngũ Xã.',
        'Văn Miếu – Quốc Tử Giám — biểu tượng hiếu học.',
        'Nhà văn Thạch Lam, Nguyễn Tuân; ẩm thực truyền thống.',
      ] },
      { h: 'Hà Nội hiện đại' },
      { ul: [
        'Đô thị thông minh (smart city); quy hoạch và đô thị vệ tinh.',
        'Bảo vệ môi trường; du lịch và Thành phố sáng tạo UNESCO (2019).',
        'Trách nhiệm công dân và Quy tắc ứng xử nơi công cộng.',
      ] },
      { h: 'Các di sản và danh hiệu UNESCO liên quan Hà Nội' },
      { ul: [
        'Hoàng thành Thăng Long — Di sản Văn hoá Thế giới (2010).',
        '82 bia Tiến sĩ Văn Miếu — Di sản tư liệu thế giới (2010).',
        'Hà Nội — Thành phố vì hoà bình (1999), Thành phố sáng tạo (2019).',
      ] },
      { h: 'Trách nhiệm của em' },
      { p: 'Hiểu và tự hào về lịch sử, văn hoá Hà Nội; giữ gìn di sản và môi trường; ứng xử văn minh, thanh lịch; học tập tốt để góp phần xây dựng Thủ đô "Văn hiến — Văn minh — Hiện đại".' },
      { note: '"Dù có đi bốn phương trời, lòng vẫn nhớ về Hà Nội." — Hà Nội ngàn năm là nơi hội tụ cả lịch sử, văn hoá và tương lai. Tự hào và trách nhiệm là hai mặt không thể tách rời.' },
    ],
    [
      { q: 'Hãy nêu ba cột mốc lịch sử lớn của Hà Nội thời cận — hiện đại đã học.', a: 'Đó là: Pháp xâm chiếm Hà Nội (1873, 1882) gắn với Nguyễn Tri Phương và Hoàng Diệu; Cách mạng Tháng Tám thắng lợi (19/8/1945); và chiến thắng "Điện Biên Phủ trên không" (tháng 12/1972).' },
      { q: 'Kể tên các di sản và danh hiệu UNESCO liên quan đến Hà Nội đã học trong năm.', a: 'Hoàng thành Thăng Long — Di sản Văn hoá Thế giới (2010); 82 bia Tiến sĩ Văn Miếu — Di sản tư liệu thế giới (2010); cùng các danh hiệu "Thành phố vì hoà bình" (1999) và "Thành phố sáng tạo" (2019).' },
      { q: 'Sau khi học xong Giáo dục địa phương lớp 8, em rút ra trách nhiệm gì cho bản thân?', a: 'Em hiểu và tự hào về lịch sử, văn hoá Thủ đô; có trách nhiệm giữ gìn di sản và môi trường, ứng xử văn minh thanh lịch và học tập thật tốt để góp phần xây dựng Hà Nội "Văn hiến — Văn minh — Hiện đại". Tự hào luôn đi liền với trách nhiệm.' },
    ]
  ),

  'S8GDDP-w36-quiz': L(
    'Kết thúc GD Địa Phương 8 — Hà Nội ngàn năm trong tim',
    'Hai năm học Giáo dục địa phương (lớp 7 và 8) đã dẫn em qua lịch sử Thăng Long ngàn năm — từ kinh đô thời Lý-Trần-Lê đến Hà Nội thời cận-hiện đại với những thăng trầm bi hùng và những danh hiệu UNESCO đáng tự hào. Đây là tuần ôn tập tổng kết để em khắc sâu tình yêu và trách nhiệm với Thủ đô trước khi bước vào năm lớp 9.',
    [
      'Hệ thống lại lịch sử và văn hoá Hà Nội đã học trong hai năm lớp 7–8.',
      'Nắm vững các di sản, danh hiệu UNESCO và bài học lịch sử cận-hiện đại.',
      'Xác định trách nhiệm của học sinh đối với Thủ đô và định hướng học lớp 9.',
    ],
    [
      { h: 'Nhìn lại lớp 7 — Thăng Long lịch sử và văn hoá truyền thống' },
      { ul: [
        'Lịch sử Thăng Long: Lý Công Uẩn dời đô (1010), trận chiến Đống Đa (1789), các triều đại Lý-Trần-Lê.',
        'Di sản văn hoá vật thể: Hồ Gươm và Tháp Rùa, Văn Miếu-Quốc Tử Giám, Hoàng thành Thăng Long, chùa Hương, Đền Hùng (trong vùng ảnh hưởng).',
        'Văn hoá phi vật thể: ca trù, hát chèo, quan họ, lễ hội đặc trưng Hà Nội, ẩm thực (phở, bún chả, chả cá Lã Vọng).',
        'Thiên nhiên và làng nghề: 36 phố phường; làng nghề truyền thống (gốm Bát Tràng, lụa Vạn Phúc, mây tre đan Phú Vinh).',
      ] },
      { h: 'Lớp 8 — Hà Nội cận và hiện đại' },
      { ul: [
        '1873 & 1882 — Pháp xâm chiếm Hà Nội: Nguyễn Tri Phương (1873) và Hoàng Diệu (1882) — hai vị tướng anh dũng hi sinh bảo vệ Thành Hà Nội.',
        '19/8/1945 — Cách mạng Tháng Tám: nhân dân Hà Nội vùng lên giành chính quyền; Hà Nội là một trong những nơi Cách mạng thắng lợi sớm nhất.',
        'Toàn quốc kháng chiến (19/12/1946): Hà Nội và "60 ngày đêm" — quân dân Thủ đô cầm chân địch để cả nước chuẩn bị kháng chiến lâu dài.',
        'Tháng 12/1972 — "Điện Biên Phủ trên không": quân dân Hà Nội bắn rơi hàng chục B-52 của Mỹ, buộc Mỹ ngồi vào bàn đàm phán ký Hiệp định Paris (1/1973).',
        'Hà Nội sau 1975: thủ đô nước Việt Nam thống nhất; Đổi Mới 1986 biến đổi bộ mặt kinh tế-xã hội.',
      ] },
      { h: 'Danh hiệu và di sản UNESCO của Hà Nội' },
      { ul: [
        'Hoàng thành Thăng Long — Di sản Văn hoá Thế giới (2010): 13 thế kỉ lịch sử kinh đô.',
        '82 bia Tiến sĩ tại Văn Miếu — Di sản tư liệu thế giới (2010): tôn vinh học vấn và truyền thống hiếu học.',
        '"Thành phố vì hoà bình" (UNESCO, 1999): ghi nhận nỗ lực tái thiết và phát triển hoà bình.',
        '"Thành phố sáng tạo" trong lĩnh vực Thiết kế (UNESCO Creative Cities Network, 2019): công nhận tiềm năng sáng tạo và kinh tế văn hoá.',
        'Ca trù — Di sản văn hoá phi vật thể cần bảo vệ khẩn cấp (UNESCO, 2009).',
      ] },
      { h: 'Hà Nội hôm nay — Cơ hội và thách thức' },
      { ul: [
        'Cơ hội: tăng trưởng kinh tế mạnh; nhiều khu công nghệ cao (Khu CNC Hoà Lạc); thu hút đầu tư nước ngoài; hội nhập quốc tế sâu rộng.',
        'Thách thức: ô nhiễm không khí (AQI thường ở mức không tốt cho sức khoẻ vào mùa đông); ùn tắc giao thông; áp lực đô thị hoá và quản lí di sản đô thị.',
        'Định hướng: Hà Nội hướng tới "Thành phố thông minh" với giao thông công cộng xanh (metro), năng lượng tái tạo và quản lí đô thị bằng công nghệ.',
      ] },
      { h: 'Trách nhiệm của học sinh' },
      { ul: [
        'Tìm hiểu và tự hào về lịch sử, văn hoá Thăng Long-Hà Nội.',
        'Giữ gìn di sản: không viết vẽ bậy, không xả rác tại di tích; phản đối hành vi phá hoại.',
        'Ứng xử văn minh thanh lịch: đúng giờ, trật tự, nhường đường, thân thiện.',
        'Bảo vệ môi trường: đi xe đạp/xe máy điện thay xe xăng; phân loại rác; không đốt rơm rạ.',
        'Học tập tốt để trở thành chủ nhân của Thủ đô "Văn hiến — Văn minh — Hiện đại".',
      ] },
      { note: '"Dù có đi bốn phương trời, lòng vẫn nhớ về Hà Nội." Hà Nội không chỉ là nơi em sinh ra và lớn lên — đó là di sản ngàn năm mà các thế hệ đi trước đã gìn giữ và trao lại. Hãy trân trọng, tiếp nối và làm Thủ đô ngày càng đẹp hơn!' },
    ],
    [
      { q: 'Phân tích tinh thần của tướng Hoàng Diệu trong sự kiện Pháp chiếm thành Hà Nội năm 1882.', a: 'Năm 1882, quân Pháp tấn công thành Hà Nội. Tổng đốc Hoàng Diệu chỉ huy quân dân chống cự quyết liệt nhưng lực lượng quá chênh lệch, thành bị phá vỡ. Thay vì đầu hàng, Hoàng Diệu đã tự vẫn trước Võ Miếu để giữ khí tiết và thể hiện trách nhiệm đối với Thủ đô. Hành động đó biểu trưng cho tinh thần "thành mất, tướng chết theo thành" — một phẩm chất anh hùng khiến hậu thế mãi kính trọng. Ngày nay tên ông được đặt cho nhiều con phố và trường học ở Hà Nội và cả nước.' },
      { q: 'Ý nghĩa lịch sử của 12 ngày đêm "Điện Biên Phủ trên không" (tháng 12/1972) đối với Hà Nội và Việt Nam.', a: 'Trong 12 ngày đêm (18–29/12/1972), Mỹ mở chiến dịch Linebacker II ném bom huỷ diệt Hà Nội và các thành phố miền Bắc nhằm khuất phục Việt Nam. Quân dân Thủ đô đã chiến đấu kiên cường, bắn hạ 81 máy bay (trong đó có 34 B-52 — "siêu pháo đài bay" vốn được xem là bất khả chiến bại). Chiến thắng vang dội này buộc Mỹ phải quay lại bàn đàm phán và kí Hiệp định Paris (27/1/1973) — kết thúc sự can dự trực tiếp của Mỹ vào cuộc chiến. Chiến thắng được mệnh danh là "Điện Biên Phủ trên không" vì tầm vóc lịch sử tương đương chiến thắng Điện Biên Phủ 1954.' },
      { q: 'Em có thể làm gì cụ thể để góp phần giải quyết vấn đề ô nhiễm không khí ở Hà Nội?', a: 'Ô nhiễm không khí Hà Nội có nhiều nguyên nhân: khí thải xe máy/ô tô, khói đốt rơm rạ, bụi xây dựng và công nghiệp. Là học sinh, em có thể đóng góp bằng nhiều cách: (1) Đi xe đạp hoặc đi bộ đến trường nếu trong bán kính 2–3km — tiết kiệm tiền, tốt cho sức khoẻ và giảm khí thải. (2) Nhắc nhở gia đình không đốt rác, không đốt rơm rạ ngoài đồng. (3) Trồng cây xanh trong nhà và xung quanh nhà — cây hấp thụ CO₂ và bụi mịn. (4) Theo dõi chỉ số AQI và đeo khẩu trang N95 vào những ngày ô nhiễm cao. (5) Tuyên truyền cho bạn bè và gia đình về tác hại của ô nhiễm và các giải pháp giảm thiểu.' },
    ]
  ),
};
