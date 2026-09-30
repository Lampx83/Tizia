import { Q, W, indexBy } from './_helper.js';

const M = (n, title, qs, opts) => W('H10GDDP', 'gd-dia-phuong', n, title, qs, opts);

export const H10GDDP_WEEKS = [
  // ── HỌC KỲ 1 ──────────────────────────────────────────────────────────────
  M(1, 'Thăng Long – Đông Đô – Hà Nội: hành trình nghìn năm', [
    Q('Năm nào vua Lý Thái Tổ dời đô từ Hoa Lư về Thăng Long?', ['1010','1000','1009','1054'], 0),
    Q('Tên gọi "Hà Nội" chính thức được đặt vào năm nào?', ['1831','1802','1873','1945'], 0),
    Q('Thăng Long – Đông Đô – Hà Nội đều là tên gọi của thành phố nào?', ['Hà Nội','Huế','Đà Nẵng','Hội An'], 0),
    Q('Chiếu dời đô năm 1010 do ai ban?', ['Lý Thái Tổ','Lê Lợi','Nguyễn Trãi','Lý Thánh Tông'], 0),
  ]),
  M(2, 'Địa lí và hành chính Hà Nội', [
    Q('Sau mở rộng năm 2008, Hà Nội giáp bao nhiêu tỉnh/thành?', ['8','6','7','9'], 0),
    Q('Diện tích Hà Nội hiện nay (sau 2008) xấp xỉ bao nhiêu km²?', ['3 358 km²','921 km²','2 000 km²','4 000 km²'], 0),
    Q('Hà Nội tiếp nhận mở rộng địa giới hành chính vào năm nào?', ['2008','2004','2010','2000'], 0),
    Q('Tỉnh nào được sáp nhập vào Hà Nội năm 2008?', ['Hà Tây','Nam Định','Hà Nam','Vĩnh Phúc'], 0),
  ]),
  M(3, 'Dân cư và văn hoá Hà Nội', [
    Q('Hà Nội là nơi sinh sống của bao nhiêu dân tộc?', ['Hơn 50','30','46','25'], 0),
    Q('Văn hoá Thăng Long được giao thoa từ nhiều vùng miền nào?', ['Cả ba miền Bắc–Trung–Nam','Chỉ miền Bắc','Chỉ miền Nam','Chỉ miền Trung'], 0),
    Q('Phong cách người Hà Nội xưa nổi tiếng với đức tính nào?', ['Thanh lịch, lịch sự','Hiếu chiến','Tiết kiệm','Cởi mở, phóng khoáng'], 0),
    Q('Hồ nào được coi là "trái tim" của Hà Nội?', ['Hồ Hoàn Kiếm','Hồ Tây','Hồ Gươm (Hoàn Kiếm)','Hồ Trúc Bạch'], 0),
  ]),
  M(4, 'Văn Miếu – Quốc Tử Giám', [
    Q('Văn Miếu – Quốc Tử Giám được xây dựng vào triều đại nào?', ['Nhà Lý','Nhà Trần','Nhà Lê sơ','Nhà Nguyễn'], 0),
    Q('Năm xây dựng Văn Miếu?', ['1070','1010','1100','1225'], 0),
    Q('Năm thành lập Quốc Tử Giám (trường đại học đầu tiên VN)?', ['1076','1070','1010','1232'], 0),
    Q('Văn Miếu thờ ai?', ['Khổng Tử','Lý Thái Tổ','Phật','Chu Văn An'], 0),
  ]),
  M(5, 'Hoàng thành Thăng Long', [
    Q('Hoàng thành Thăng Long được UNESCO công nhận di sản thế giới năm nào?', ['2010','2003','2014','2019'], 0),
    Q('Hoàng thành Thăng Long nằm ở quận nào của Hà Nội?', ['Ba Đình','Hoàn Kiếm','Đống Đa','Tây Hồ'], 0),
    Q('Khu di sản Hoàng thành Thăng Long gắn với bao nhiêu triều đại phong kiến?', ['Nhiều triều đại (Lý, Trần, Lê, Nguyễn)','Chỉ nhà Lý','Chỉ nhà Lê','Chỉ nhà Nguyễn'], 0),
    Q('Cổng phía Nam của Hoàng thành Thăng Long có tên là gì?', ['Đoan Môn','Kính Thiên','Hậu Lâu','Bắc Môn'], 0),
  ]),
  M(6, 'Phố cổ Hà Nội – 36 phường nghề', [
    Q('Khu phố cổ Hà Nội nằm ở quận nào?', ['Hoàn Kiếm','Ba Đình','Đống Đa','Hai Bà Trưng'], 0),
    Q('Phố Hàng Bạc truyền thống chuyên kinh doanh mặt hàng gì?', ['Đồ bạc, trang sức','Vải lụa','Đồ đồng','Gốm sứ'], 0),
    Q('Con phố nào ở Hà Nội nổi tiếng bán đồ gốm Bát Tràng?', ['Hàng Gai và các phố lân cận','Hàng Đào','Hàng Ngang','Hàng Chiếu'], 0),
    Q('Phố "36 phố phường" phản ánh đặc điểm gì của Hà Nội xưa?', ['Mỗi phố chuyên một nghề thủ công','Có 36 con phố chính','36 cổng thành','36 đình làng'], 0),
  ]),
  M(7, 'Hội Gióng – Di sản văn hoá phi vật thể', [
    Q('Hội Gióng gắn với truyền thuyết nhân vật nào?', ['Thánh Gióng','An Dương Vương','Sơn Tinh','Hùng Vương'], 0),
    Q('UNESCO công nhận Hội Gióng là di sản phi vật thể đại diện nhân loại năm nào?', ['2010','2003','2014','2019'], 0),
    Q('Hội Gióng chính được tổ chức tại làng nào?', ['Phù Đổng (Gia Lâm)','Sóc Sơn','Đông Anh','Từ Liêm'], 0),
    Q('Ý nghĩa chính của Hội Gióng là gì?', ['Tưởng nhớ người anh hùng đánh giặc Ân','Cầu mưa thuận gió hoà','Lễ hội mùa xuân','Cúng thần nông'], 0),
  ]),
  M(8, 'Ca trù – Nghệ thuật âm nhạc truyền thống Hà Nội', [
    Q('Ca trù được UNESCO ghi danh là di sản văn hoá phi vật thể cần bảo vệ khẩn cấp năm nào?', ['2009','2003','2011','2015'], 0),
    Q('Nhạc cụ đặc trưng của ca trù là gì?', ['Đàn đáy','Đàn tranh','Đàn bầu','Đàn nguyệt'], 0),
    Q('Người hát chính trong ca trù được gọi là?', ['Đào nương','Kép đàn','Quan viên','Trùm phường'], 0),
    Q('Ca trù thường được biểu diễn trong không gian nào?', ['Nhà tư nhân, đình làng','Sân khấu lớn','Ngoài trời','Đình chùa'], 0),
  ]),
  M(9, 'Làng nghề truyền thống: Vạn Phúc và Bát Tràng', [
    Q('Làng lụa Vạn Phúc nằm ở quận/huyện nào của Hà Nội?', ['Hà Đông','Gia Lâm','Thanh Trì','Đông Anh'], 0),
    Q('Làng gốm Bát Tràng nằm ở huyện nào?', ['Gia Lâm','Đông Anh','Sóc Sơn','Mê Linh'], 0),
    Q('Lụa Vạn Phúc nổi tiếng với chất liệu gì?', ['Tơ tằm','Bông','Sợi tổng hợp','Lanh'], 0),
    Q('Sản phẩm đặc trưng của làng Bát Tràng là gì?', ['Gốm sứ','Đồ đồng','Tranh dân gian','Mây tre đan'], 0),
  ]),
  M(10, 'Ẩm thực Hà Nội', [
    Q('Món ăn nào được coi là "quốc hồn" ẩm thực Hà Nội?', ['Phở','Bún bò Huế','Mì Quảng','Bánh mì'], 0),
    Q('Bún chả Hà Nội nổi tiếng thế giới sau sự kiện nào?', ['Tổng thống Obama ăn tại Hà Nội năm 2016','Được UNESCO công nhận','Xuất hiện trên CNN','Được vua Anh thưởng thức'], 0),
    Q('Bánh cuốn Hà Nội được làm từ nguyên liệu chính nào?', ['Bột gạo','Bột mì','Bột ngô','Bột sắn'], 0),
    Q('Chả cá Lã Vọng ở phố nào của Hà Nội?', ['Phố Chả Cá','Hàng Bạc','Hàng Đào','Đinh Tiên Hoàng'], 0),
  ]),
  M(11, 'Danh nhân Hà Nội: Lý Thái Tổ, Lê Lợi, Nguyễn Trãi', [
    Q('Lý Thái Tổ được nhớ đến với công lao gì với Hà Nội?', ['Dời đô về Thăng Long năm 1010','Đánh đuổi quân Nguyên','Mở mang bờ cõi về Nam','Lập triều Nguyễn'], 0),
    Q('Lê Lợi lãnh đạo cuộc khởi nghĩa nào?', ['Lam Sơn chống quân Minh','Tây Sơn','Hương Khê','Bãi Sậy'], 0),
    Q('Nguyễn Trãi nổi tiếng với tác phẩm nào?', ['Bình Ngô đại cáo','Quốc âm thi tập','Đoạn trường tân thanh','Nam quốc sơn hà'], 0),
    Q('Tượng Lý Thái Tổ đặt ở đâu tại Hà Nội?', ['Vườn hoa Lý Thái Tổ, Hoàn Kiếm','Văn Miếu','Hồ Tây','Hoàng thành'], 0),
  ]),
  M(12, 'Danh nhân văn hoá: Chu Văn An', [
    Q('Chu Văn An là thầy giáo nổi tiếng dưới triều đại nào?', ['Nhà Trần','Nhà Lý','Nhà Lê sơ','Nhà Nguyễn'], 0),
    Q('Chu Văn An được phong tước vị gì sau khi qua đời?', ['Văn Trinh Công','Thái sư','Trạng nguyên','Bảng nhãn'], 0),
    Q('Chu Văn An từng dạy học tại đâu?', ['Quốc Tử Giám','Văn Miếu','Hoàng thành','Tháp Rùa'], 0),
    Q('Tên trường Chu Văn An ở Hà Nội gắn với điều gì?', ['Tôn vinh vị thầy giáo mẫu mực','Địa điểm lịch sử','Nhân vật huyền thoại','Chiến tích quân sự'], 0),
  ]),
  M(13, 'Nghệ thuật truyền thống Hà Nội', [
    Q('Múa rối nước xuất xứ từ vùng nào?', ['Đồng bằng Bắc Bộ','Tây Nguyên','Nam Bộ','Trung Bộ'], 0),
    Q('Nhà hát Múa rối Thăng Long nổi tiếng với loại hình nghệ thuật nào?', ['Múa rối nước','Múa rối cạn','Kịch nói','Chèo'], 0),
    Q('Sân khấu chèo gắn với vùng văn hoá nào?', ['Đồng bằng Bắc Bộ','Tây Bắc','Nam Trung Bộ','Tây Nam Bộ'], 0),
    Q('Hát xẩm là thể loại âm nhạc đặc trưng của?', ['Miền Bắc Việt Nam','Miền Trung','Miền Nam','Tây Nguyên'], 0),
  ]),
  M(14, 'Kiến trúc Hà Nội', [
    Q('Cầu Long Biên được xây dựng vào thời kỳ nào?', ['Pháp thuộc (1899–1902)','Kháng chiến chống Mỹ','Thời Lý–Trần','Sau 1975'], 0),
    Q('Lăng Chủ tịch Hồ Chí Minh nằm ở quảng trường nào?', ['Ba Đình','Đông Kinh Nghĩa Thục','Cách mạng Tháng 8','Hồ Gươm'], 0),
    Q('Kiến trúc nhà hát lớn Hà Nội được xây dựng theo phong cách nào?', ['Pháp (tân cổ điển)','Á Đông','Hiện đại','Trung Quốc'], 0),
    Q('Chùa Một Cột được xây dựng dưới triều đại nào?', ['Nhà Lý','Nhà Trần','Nhà Lê','Nhà Nguyễn'], 0),
  ]),
  M(15, 'Lễ hội Hà Nội', [
    Q('Lễ hội Chùa Hương tổ chức vào thời điểm nào?', ['Mùa xuân (tháng 1–3 âm lịch)','Mùa thu','Mùa hè','Mùa đông'], 0),
    Q('Lễ hội Đống Đa kỷ niệm chiến thắng nào?', ['Chiến thắng Quang Trung đại phá quân Thanh (1789)','Điện Biên Phủ','Mùa Xuân 1975','Bạch Đằng'], 0),
    Q('Lễ hội Gò Đống Đa tổ chức vào ngày mùng mấy Tết?', ['Mùng 5','Mùng 1','Mùng 3','Mùng 7'], 0),
    Q('Hội Lim nổi tiếng với loại hình nghệ thuật nào?', ['Quan họ Bắc Ninh','Ca trù','Chèo','Múa rối nước'], 0),
  ]),
  M(16, 'Di sản tư liệu: Bia tiến sĩ Văn Miếu', [
    Q('Bia tiến sĩ Văn Miếu được UNESCO công nhận là gì năm 2010?', ['Di sản tư liệu thế giới','Di sản văn hoá vật thể','Di sản thiên nhiên','Di sản văn hoá phi vật thể'], 0),
    Q('Số bia tiến sĩ hiện còn lưu giữ tại Văn Miếu?', ['82 bia','100 bia','50 bia','36 bia'], 0),
    Q('Bia tiến sĩ khắc ghi thông tin của ai?', ['Những người đỗ tiến sĩ trong các kỳ thi triều đình','Danh nhân văn hoá','Vị quan lại triều đình','Các vị thần'], 0),
    Q('Bia tiến sĩ được đặt trên lưng con vật nào?', ['Rùa đá','Sư tử đá','Voi đá','Hổ đá'], 0),
  ]),
  M(17, 'Ôn tập học kỳ 1 – Phần 1', [
    Q('Hà Nội có bao nhiêu di sản được UNESCO công nhận?', ['Nhiều (Hoàng thành, Hội Gióng, Ca trù, Bia Tiến sĩ...)','Chỉ 1','Chỉ 2','Không có'], 0),
    Q('Năm 2010 Hoàng thành Thăng Long được công nhận là?', ['Di sản văn hoá thế giới','Di sản thiên nhiên','Di sản tư liệu','Di sản hỗn hợp'], 0),
    Q('Làng nghề nào của Hà Nội nổi tiếng với sản phẩm lụa tơ tằm?', ['Vạn Phúc','Bát Tràng','Đồng Kỵ','La Phù'], 0),
    Q('Phố cổ Hà Nội có đặc điểm kiến trúc gì đặc trưng?', ['Nhà ống hẹp, dài','Nhà mái vòm','Nhà sàn','Nhà hình tròn'], 0),
  ]),
  M(18, 'Ôn tập học kỳ 1 – Phần 2', [
    Q('Nghề truyền thống nào không thuộc 36 phường nghề Hà Nội?', ['Kéo tơ (miền Nam)','Đồ đồng','Vải lụa','Đồ gốm'], 0),
    Q('Ai là tác giả "Bình Ngô đại cáo"?', ['Nguyễn Trãi','Lê Lợi','Chu Văn An','Lý Thái Tổ'], 0),
    Q('Múa rối nước phổ biến nhất ở vùng nào?', ['Đồng bằng Bắc Bộ','Tây Nguyên','Đồng bằng sông Cửu Long','Miền Trung'], 0),
    Q('Hội Gióng được tổ chức để tưởng nhớ ai?', ['Thánh Gióng – người anh hùng đánh giặc Ân','Lê Lợi','Trần Hưng Đạo','Nguyễn Trãi'], 0),
  ]),

  // ── HỌC KỲ 2 ──────────────────────────────────────────────────────────────
  M(19, 'Hà Nội trong kháng chiến chống Pháp (1946–1954)', [
    Q('Ngày 19/12/1946 gắn với sự kiện lịch sử nào ở Hà Nội?', ['Toàn quốc kháng chiến bắt đầu','Tiếp quản Thủ đô','Ký Hiệp định Genève','Thành lập VNDCCH'], 0),
    Q('Cuộc chiến đấu trong lòng Hà Nội năm 1946–1947 được gọi là?', ['60 ngày đêm giữ Hà Nội','Mùa Đông năm 1946','Trận Điện Biên Phủ','Chiến dịch Hồ Chí Minh'], 0),
    Q('Trung đoàn Thủ đô được thành lập để chiến đấu bảo vệ Hà Nội trong giai đoạn nào?', ['1946–1947','1950–1951','1953–1954','1940–1945'], 0),
    Q('Kết quả của cuộc kháng chiến chống Pháp năm 1954?', ['Ký Hiệp định Genève, Pháp rút quân','Pháp vẫn kiểm soát Hà Nội','Hà Nội bị chia đôi','Chiến tranh tiếp diễn'], 0),
  ]),
  M(20, 'Tiếp quản Thủ đô 10/10/1954', [
    Q('Quân đội nhân dân Việt Nam tiếp quản Hà Nội vào ngày nào?', ['10/10/1954','02/09/1945','30/04/1975','19/12/1946'], 0),
    Q('Ngày 10/10/1954, lá cờ đỏ sao vàng được kéo lên ở đâu?', ['Cột cờ Hà Nội (Cột cờ Hà Nội)','Nhà hát lớn','Hoàng thành','Hồ Gươm'], 0),
    Q('Hà Nội trở thành Thủ đô của nước nào sau 1954?', ['Việt Nam Dân chủ Cộng hòa (miền Bắc)','Việt Nam Cộng hòa','Pháp','Trung Quốc'], 0),
    Q('Người chỉ huy tiếp quản Hà Nội năm 1954 là?', ['Đại đoàn 308 và các đơn vị QĐND','Hồ Chí Minh trực tiếp','Võ Nguyên Giáp','Phạm Văn Đồng'], 0),
  ]),
  M(21, 'Hà Nội trong kháng chiến chống Mỹ (1965–1972)', [
    Q('Cuộc chiến tranh phá hoại bằng không quân của Mỹ đối với miền Bắc bắt đầu năm nào?', ['1965','1954','1960','1968'], 0),
    Q('Hà Nội sơ tán học sinh và người dân về nông thôn nhằm mục đích gì?', ['Tránh bom Mỹ, bảo đảm an toàn','Xây dựng nông thôn','Tăng sản xuất','Phòng chống lũ lụt'], 0),
    Q('Cầu Long Biên bị bom Mỹ đánh phá nhiều nhất vào giai đoạn nào?', ['1965–1972','1946–1954','1954–1960','Sau 1975'], 0),
    Q('Phong trào "Ba đảm đang" ở Hà Nội trong kháng chiến chống Mỹ là phong trào của ai?', ['Phụ nữ','Thanh niên nam','Người cao tuổi','Học sinh'], 0),
  ]),
  M(22, '12 ngày đêm – Điện Biên Phủ trên không (12/1972)', [
    Q('Chiến dịch "Điện Biên Phủ trên không" diễn ra vào tháng mấy năm 1972?', ['Tháng 12 năm 1972','Tháng 4 năm 1972','Tháng 1 năm 1972','Tháng 7 năm 1972'], 0),
    Q('Loại máy bay ném bom chiến lược của Mỹ bị bắn rơi nhiều nhất trong 12 ngày đêm là?', ['B-52','F-105','F-4 Phantom','A-6'], 0),
    Q('Phố Khâm Thiên bị bom tàn phá nặng nề vào đêm nào?', ['Đêm 26/12/1972','Đêm 18/12/1972','Đêm 20/12/1972','Đêm 29/12/1972'], 0),
    Q('Kết quả của chiến dịch 12 ngày đêm?', ['Mỹ phải ký Hiệp định Paris 1973','Hà Nội bị tàn phá hoàn toàn','Mỹ tiếp tục leo thang','Việt Nam thua trận'], 0),
  ]),
  M(23, 'Hà Nội sau 1975 và Đổi mới 1986', [
    Q('Sau thống nhất đất nước (1975), Hà Nội giữ vai trò gì?', ['Thủ đô của nước CHXHCN Việt Nam','Thành phố trực thuộc Trung ương riêng biệt','Trung tâm kinh tế phía Bắc','Thành phố cảng quan trọng'], 0),
    Q('Công cuộc Đổi mới (Đổi mới) được khởi xướng tại Đại hội Đảng lần thứ mấy?', ['VI (1986)','V (1982)','VII (1991)','IV (1976)'], 0),
    Q('Đổi mới 1986 đã thay đổi kinh tế Hà Nội theo hướng nào?', ['Từ kế hoạch hoá tập trung sang kinh tế thị trường','Quốc hữu hoá tất cả tài sản','Đóng cửa với nước ngoài','Tập thể hoá nông nghiệp'], 0),
    Q('Thị trường bất động sản Hà Nội bắt đầu phát triển mạnh từ thập kỷ nào?', ['1990s','1970s','1980s','2010s'], 0),
  ]),
  M(24, 'Kinh tế Hà Nội hiện đại', [
    Q('Hà Nội đứng thứ mấy về GDP trong cả nước?', ['Thứ 2 (sau TP. HCM)','Thứ 1','Thứ 3','Thứ 5'], 0),
    Q('Khu công nghệ cao Hoà Lạc (HHT) nằm ở đâu?', ['Thạch Thất, Hà Nội','Gia Lâm','Đông Anh','Nam Từ Liêm'], 0),
    Q('Lĩnh vực nào đóng góp lớn nhất cho kinh tế Hà Nội hiện nay?', ['Dịch vụ, thương mại','Nông nghiệp','Khai khoáng','Thuỷ sản'], 0),
    Q('Hà Nội có bao nhiêu khu công nghiệp và chế xuất (tính đến 2024)?', ['Hơn 10 KCN','3','5','20 trở lên'], 0),
  ]),
  M(25, 'Hà Nội – Thành phố Sáng tạo UNESCO', [
    Q('Hà Nội được UNESCO công nhận là "Thành phố Sáng tạo" năm nào?', ['2019','2014','2022','2010'], 0),
    Q('Lĩnh vực sáng tạo nào giúp Hà Nội được công nhận?', ['Thiết kế','Ẩm thực','Âm nhạc','Văn học'], 0),
    Q('Mạng lưới "Thành phố Sáng tạo" do tổ chức nào quản lý?', ['UNESCO','WHO','WTO','APEC'], 0),
    Q('Sự kiện "Lễ hội Thiết kế Sáng tạo Hà Nội" lần đầu được tổ chức năm nào?', ['2019','2021','2015','2023'], 0),
  ]),
  M(26, 'Giao thông đô thị Hà Nội', [
    Q('Tuyến đường sắt đô thị (metro) đầu tiên của Hà Nội là tuyến nào?', ['Cát Linh – Hà Đông (tuyến 2A)','Nhổn – Ga Hà Nội (tuyến 3)','Long Biên – Ngọc Hồi (tuyến 1)','Mỹ Đình – Vân Hồ'], 0),
    Q('Cầu nào mới nhất (khánh thành 2024) qua sông Hồng tại Hà Nội?', ['Cầu Vĩnh Tuy giai đoạn 2','Cầu Nhật Tân','Cầu Long Biên','Cầu Thăng Long'], 0),
    Q('Vành đai 3 của Hà Nội có mục đích chính là gì?', ['Giảm ùn tắc nội đô','Kết nối với sân bay quốc tế','Phát triển khu đô thị mới','Phục vụ du lịch'], 0),
    Q('Sân bay Nội Bài nằm ở huyện nào của Hà Nội?', ['Sóc Sơn','Đông Anh','Mê Linh','Gia Lâm'], 0),
  ]),
  M(27, 'Môi trường và chất lượng không khí Hà Nội', [
    Q('Hà Nội thường xuyên đứng trong top thành phố có chỉ số ô nhiễm không khí nào?', ['PM2.5 cao','Tiếng ồn cao','Ô nhiễm nước','Nhiệt độ cao'], 0),
    Q('Nguyên nhân chính gây ô nhiễm không khí Hà Nội là?', ['Phương tiện cá nhân và công nghiệp','Rác thải sinh hoạt','Nông nghiệp','Du lịch'], 0),
    Q('Hà Nội có kế hoạch cấm xe máy nội đô vào năm nào?', ['2030','2025','2035','2040'], 0),
    Q('Chỉ số AQI là thước đo gì?', ['Chất lượng không khí','Chất lượng nước','Tiếng ồn','Nhiệt độ'], 0),
  ]),
  M(28, 'Hệ thống giáo dục Hà Nội', [
    Q('Hà Nội có bao nhiêu trường đại học và cao đẳng (xấp xỉ)?', ['Hơn 60','10','30','50'], 0),
    Q('Trường đại học nào lâu đời nhất Hà Nội (và cả nước)?', ['Đại học Quốc gia Hà Nội (tiền thân Đại học Đông Dương 1906)','ĐH Bách Khoa','ĐH Kinh tế Quốc dân','ĐH Y Hà Nội'], 0),
    Q('Kỳ thi THPT Quốc gia là kỳ thi cấp nào?', ['Quốc gia','Tỉnh/thành','Cụm trường','Quốc tế'], 0),
    Q('Trường THPT Chu Văn An Hà Nội là trường thuộc loại hình nào?', ['Trường chuyên công lập','Trường tư thục','Trường quốc tế','Trường nghề'], 0),
  ]),
  M(29, 'Y tế và sức khoẻ cộng đồng Hà Nội', [
    Q('Bệnh viện nào là bệnh viện đầu ngành tuyến trung ương lớn nhất Hà Nội?', ['Bệnh viện Bạch Mai','Bệnh viện Việt Đức','Bệnh viện K','Bệnh viện 108'], 0),
    Q('Hà Nội đã thực hiện mục tiêu "Y tế thông minh" qua việc gì?', ['Ứng dụng công nghệ, telemedicine','Tăng số bác sĩ','Mở thêm bệnh viện','Giảm phí khám'], 0),
    Q('Nguyên nhân phổ biến nhất ảnh hưởng sức khoẻ người Hà Nội hiện nay?', ['Ô nhiễm không khí và lối sống ít vận động','Suy dinh dưỡng','Bệnh nhiệt đới','Thiếu nước sạch'], 0),
    Q('Hà Nội có bảo hiểm y tế toàn dân (tỷ lệ bao phủ) đạt gần bao nhiêu %?', ['Trên 90%','Khoảng 50%','Khoảng 70%','100%'], 0),
  ]),
  M(30, 'Văn học đương đại Hà Nội', [
    Q('Nhà văn Nguyễn Huy Thiệp nổi tiếng với thể loại sáng tác nào?', ['Truyện ngắn','Thơ','Kịch','Tiểu thuyết'], 0),
    Q('Tác phẩm "Hà Nội băm sáu phố phường" của ai?', ['Thạch Lam','Vũ Bằng','Tô Hoài','Nguyễn Tuân'], 0),
    Q('Nhà thơ Xuân Quỳnh gắn với chủ đề thơ nào?', ['Tình yêu và cuộc sống','Chiến tranh cách mạng','Thiên nhiên miền núi','Lịch sử'], 0),
    Q('Tác phẩm "Dế Mèn phiêu lưu ký" của nhà văn nào người Hà Nội?', ['Tô Hoài','Nguyễn Huy Thiệp','Xuân Quỳnh','Nam Cao'], 0),
  ]),
  M(31, 'Âm nhạc và điện ảnh Hà Nội', [
    Q('Nhạc sĩ nào sáng tác "Hà Nội mùa thu"?', ['Vũ Thanh','Trịnh Công Sơn','Phú Quang','Nguyễn Cường'], 0),
    Q('Bài hát "Hà Nội niềm tin và hy vọng" được sáng tác trong thời kỳ nào?', ['Kháng chiến chống Mỹ','Đổi mới','Thống nhất đất nước','Thời bình'], 0),
    Q('Hãng phim nào gắn với nền điện ảnh cách mạng Hà Nội?', ['Hãng phim truyện Việt Nam','Galaxy Studio','BHD','CJ HK'], 0),
    Q('Liên hoan phim quốc tế Hà Nội (HANIFF) tổ chức mấy năm/lần?', ['2 năm một lần','Hàng năm','5 năm/lần','Không định kỳ'], 0),
  ]),
  M(32, 'Thể thao Hà Nội', [
    Q('Sân vận động nào là sân bóng đá lớn nhất Hà Nội?', ['Sân vận động Quốc gia Mỹ Đình','Sân Hàng Đẫy','Sân vận động Hoàng Tụy','Sân vận động Đống Đa'], 0),
    Q('Hà Nội FC chơi ở giải bóng đá nào?', ['V.League 1','V.League 2','Hạng Nhất','SEA Games'], 0),
    Q('Sự kiện thể thao quốc tế lớn nhất tổ chức tại Hà Nội năm 2003?', ['SEA Games 22','Asian Games','Olympic','AFC Champions League'], 0),
    Q('Người con gái Hà Nội nào đoạt huy chương vàng cử tạ Olympic 2000?', ['Hoàng Anh Tuấn (nam)','Trần Hiếu Ngân (nữ, taekwondo)','Nguyễn Thị Ánh Viên','Hoàng Xuân Vinh'], 0),
  ]),
  M(33, 'Hội nhập quốc tế của Hà Nội', [
    Q('Hà Nội từng là nơi tổ chức Hội nghị Thượng đỉnh Mỹ–Triều Tiên lần mấy?', ['Lần 2 (2019)','Lần 1 (2018)','Lần 3 (2020)','Chưa tổ chức'], 0),
    Q('Hà Nội ký kết quan hệ "thành phố hữu nghị" với nhiều thành phố nào trên thế giới?', ['Seoul, Paris, Berlin, Vientiane và nhiều thành phố khác','Chỉ Seoul','Chỉ Paris','Chưa ký kết'], 0),
    Q('Hà Nội là thành viên của mạng lưới quốc tế nào về đô thị bền vững?', ['Mạng lưới Thành phố Sáng tạo UNESCO','WTO','ASEAN Mayors Forum','C40 Cities'], 0),
    Q('Khu vực nào ở Hà Nội tập trung nhiều tổ chức quốc tế và đại sứ quán?', ['Ba Đình','Hoàn Kiếm','Đống Đa','Cầu Giấy'], 0),
  ]),
  M(34, 'Phát triển bền vững – Hà Nội xanh', [
    Q('Hà Nội đặt mục tiêu trồng thêm bao nhiêu cây xanh đến 2030?', ['1 triệu cây','100 nghìn cây','500 nghìn cây','5 triệu cây'], 0),
    Q('Dự án "xe bus điện" ở Hà Nội nhằm mục tiêu gì?', ['Giảm khí thải, phát triển giao thông xanh','Tăng thu nhập cho lái xe','Thay thế xe máy của người dân','Phát triển du lịch'], 0),
    Q('Hà Nội đặt mục tiêu đạt phát thải carbon bằng 0 vào năm nào?', ['2050','2030','2035','2045'], 0),
    Q('Chương trình nào giúp Hà Nội xử lý rác thải đô thị hiệu quả hơn?', ['Phân loại rác tại nguồn','Chôn lấp tập trung','Đốt rác không kiểm soát','Xuất khẩu rác'], 0),
  ]),
  M(35, 'Tổng kết – Trách nhiệm thế hệ trẻ với Hà Nội', [
    Q('Điều gì thể hiện "người Hà Nội thanh lịch văn minh"?', ['Ứng xử lịch sự, giữ vệ sinh, tôn trọng di sản','Mặc đẹp, ăn ngon','Có thu nhập cao','Nói tiếng Hà Nội giọng chuẩn'], 0),
    Q('Học sinh THPT Hà Nội có thể đóng góp gì để bảo tồn di sản?', ['Tìm hiểu, tuyên truyền, không xâm phạm di tích','Chỉ học trong sách giáo khoa','Không liên quan đến học sinh','Đợi khi lớn lên'], 0),
    Q('Khẩu hiệu của Hà Nội trong xây dựng đô thị?', ['"Thành phố Vì hoà bình"','Thành phố toàn cầu','Hà Nội xanh sạch đẹp','Thủ đô anh hùng'], 0),
    Q('Hà Nội được UNESCO trao tặng danh hiệu gì năm 1999?', ['"Thành phố Vì hoà bình"','Thành phố di sản','Di sản thế giới','Thành phố sáng tạo'], 0),
  ]),
];

export const H10GDDP_SCENARIOS = indexBy(H10GDDP_WEEKS);
