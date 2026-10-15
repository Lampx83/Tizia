// ============================================================
// Lớp 8 · GIÁO DỤC ĐỊA PHƯƠNG (HÀ NỘI) — 35 tuần
// Lịch sử HN cận đại, văn hoá HN, làng nghề, đô thị thông minh.
// ID prefix: "S8GDDP-wNN-quiz".
// ============================================================
import { Q, W, indexBy } from './_helper.js';

const M = (n, title, qs, opts) => W('S8GDDP', 'gd-dia-phuong', n, title, qs, opts);

export const S8GDDP_WEEKS = [
  // ──────────────── HK1 ────────────────
  M(1, 'Hà Nội trước năm 1873 — Thành Hà Nội thời Nguyễn', [
    Q('Trước khi Pháp xâm chiếm, HN có tên?', ['Thăng Long, sau đổi Hà Nội thời Minh Mạng (1831)', 'Hà Nội từ đầu', 'Hoa Lư', 'Sài Gòn'], 0, 'Thăng Long (1010), đổi Hà Nội năm 1831 thời Minh Mạng — "nội: trong đất, hà: sông".',
      [
      '<b>Tên gọi qua các thời kì:</b> vùng đất Thủ đô từng mang nhiều tên — <code>Đại La</code>, <code>Thăng Long</code> (từ năm 1010 khi Lý Công Uẩn dời đô), rồi <code>Hà Nội</code>.',
      'Năm <code>1831</code>, vua <b>Minh Mạng</b> cải cách hành chính, lập <i>tỉnh Hà Nội</i> — tên gọi này dùng đến ngày nay. "<i>Hà</i>" là sông, "<i>nội</i>" là phía trong: vùng đất <b>nằm trong các con sông</b> (sông Hồng, sông Đáy bao quanh).',
      '<ul><li>Thăng Long là kinh đô của Đại Việt suốt thời Lý – Trần – Lê.</li><li>Đến thời Nguyễn (kinh đô đặt ở Huế), Thăng Long thành lị sở của Bắc Thành rồi tỉnh Hà Nội.</li></ul>',
    ],
      ['Đúng — tên Thăng Long có từ 1010, đến 1831 vua Minh Mạng đổi thành Hà Nội.', 'Sai — tên Hà Nội chỉ có từ 1831, trước đó là Thăng Long.', 'Sai — Hoa Lư là kinh đô thời Đinh - Tiền Lê, không phải HN.', 'Sai — Sài Gòn ở miền Nam, không liên quan tên HN.']
    ),
    Q('Thành HN thời Nguyễn được xây?', ['Bằng tre', 'Theo kiểu Vauban (Pháp), gọn hơn Thăng Long cũ', 'Không có thành', 'Theo Trung Quốc'], 1, 'Thành HN (1805) xây kiểu Vauban (Pháp), nhỏ gọn hơn Hoàng thành Thăng Long.',
      [
      '<b>Thành Hà Nội thời Nguyễn</b> được xây năm <code>1805</code> dưới triều vua Gia Long, theo kiểu <b>Vauban</b> — kiểu thành luỹ quân sự của kĩ sư người Pháp Sébastien de Vauban.',
      'Đặc điểm thành Vauban: <i>tường gạch dày, có hào nước bao quanh, các góc nhô ra hình ngôi sao</i> để đặt pháo phòng thủ. Thành nhỏ gọn hơn Hoàng thành Thăng Long thời Lê.',
      '<ul><li>Cửa Bắc của thành nay vẫn còn, in dấu vết đạn pháo Pháp năm 1882.</li><li>Cột cờ Hà Nội (Kì đài) xây năm 1812 là một phần của khu thành này.</li></ul>',
    ],
      ['Sai — thành xây bằng gạch đá kiên cố, không phải tre.', 'Đúng — thành HN (1805) xây theo kiểu Vauban của Pháp, gọn hơn Thăng Long cũ.', 'Sai — thời Nguyễn vẫn có thành HN kiên cố.', 'Sai — mẫu thiết kế là Vauban (Pháp), không phải Trung Quốc.']
    ),
    Q('Vị trí thành HN cũ?', ['Đông Anh', 'Khu vực Hoàng thành Thăng Long hiện nay', 'Long Biên', 'Hồ Tây'], 1, 'Thành HN nay nằm trong khu vực Hoàng thành Thăng Long (di sản UNESCO).',
      [
      '<b>Vị trí thành Hà Nội cũ</b> nằm trong khu vực <code>Hoàng thành Thăng Long</code> ngày nay — khu vực Ba Đình, quanh đường Hoàng Diệu, Điện Biên Phủ.',
      'Hoàng thành Thăng Long được <b>UNESCO công nhận Di sản Văn hoá Thế giới năm 2010</b>, là minh chứng cho hơn 1000 năm lịch sử kinh đô.',
      '<ul><li>Di tích còn lại: Cột cờ, Đoan Môn, nền điện Kính Thiên, Cửa Bắc, Hậu Lâu.</li></ul>',
    ],
      ['Sai — Đông Anh ở ngoại thành phía bắc, không phải vị trí thành cũ.', 'Đúng — thành HN cũ nằm trong khu Hoàng thành Thăng Long ngày nay.', 'Sai — Long Biên ở bờ đông sông Hồng, không phải vị trí thành.', 'Sai — Hồ Tây là hồ lớn, không phải nơi đặt thành.']
    ),
    Q('Tổng đốc HN trước 1873?', ['Nguyễn Tri Phương', 'Hoàng Diệu', 'Phan Đình Phùng', 'Nguyễn Văn Tường'], 0, 'Nguyễn Tri Phương là Tổng đốc HN khi Pháp tấn công lần 1 (1873).',
      [
      '<b>Nguyễn Tri Phương (1800–1873)</b> là danh tướng triều Nguyễn, giữ chức <i>Tổng đốc Hà Ninh</i> (Hà Nội – Ninh Bình), chỉ huy bảo vệ thành Hà Nội khi Pháp tấn công lần thứ nhất.',
      'Ông từng chỉ huy quân dân chống Pháp ở mặt trận Đà Nẵng (1858) và Gia Định, là biểu tượng của tinh thần kháng chiến bền bỉ.',
      '<ul><li>Tổng đốc là chức quan đứng đầu một hoặc vài tỉnh, kiêm cả quân sự và hành chính.</li></ul>',
    ],
      ['Đúng — Nguyễn Tri Phương là Tổng đốc HN khi Pháp đánh lần 1 (1873).', 'Sai — Hoàng Diệu là Tổng đốc khi Pháp đánh lần 2 (1882).', 'Sai — Phan Đình Phùng lãnh đạo khởi nghĩa Hương Khê, không phải Tổng đốc HN.', 'Sai — Nguyễn Văn Tường là quan triều đình ở Huế.']
    ),
    Q('Kinh tế HN trước 1873?', ['Chỉ nông nghiệp', 'Chỉ chiến tranh', 'Thủ công nghiệp + thương mại (36 phố phường)', 'Hiện đại'], 2, 'HN có truyền thống thủ công + thương mại với 36 phố phường (Hàng…)',
      [
      '<b>Kinh tế Thăng Long – Hà Nội</b> trước 1873 dựa trên <i>thủ công nghiệp</i> và <i>thương mại</i>, không chỉ thuần nông.',
      'Khu vực "<b>Kẻ Chợ</b>" (chợ búa, phố phường) tập trung ở phía đông, hình thành nên <code>36 phố phường</code> — mỗi phố một nghề (Hàng Bạc, Hàng Đồng, Hàng Đào…).',
      '<ul><li>Hà Nội là đầu mối buôn bán lớn nhất Bắc Kì, nối với các trấn xung quanh qua đường sông Hồng.</li></ul>',
    ],
      ['Sai — HN không chỉ nông nghiệp mà mạnh về thủ công và buôn bán.', 'Sai — chiến tranh không phải hoạt động kinh tế.', 'Đúng — HN mạnh về thủ công nghiệp và thương mại với 36 phố phường.', 'Sai — kinh tế khi đó còn truyền thống, chưa hiện đại.']
    ),
  ]),

  M(2, 'Pháp xâm chiếm Hà Nội lần 1 (1873) — Nguyễn Tri Phương', [
    Q('Pháp tấn công HN lần 1 năm?', ['1885', '1882', '1873', '1858'], 2, 'Pháp đánh chiếm HN lần 1 năm 1873 (Francis Garnier).',
      [
      '<b>Pháp đánh Hà Nội lần thứ nhất năm <code>1873</code>.</b> Lấy cớ giải quyết "vụ Jean Dupuis" buôn lậu trên sông Hồng, thực dân Pháp đưa quân ra Bắc Kì.',
      'Đây là bước Pháp mở rộng xâm lược từ Nam Kì ra Bắc Kì sau khi đã chiếm sáu tỉnh Nam Kì (1862–1867).',
      '<ul><li>1858: Pháp nổ súng ở Đà Nẵng, mở đầu xâm lược Việt Nam.</li><li>1873 và 1882: hai lần Pháp đánh thành Hà Nội.</li></ul>',
    ],
      ['Sai — 1885 là năm phong trào Cần Vương bùng nổ.', 'Sai — 1882 là lần Pháp đánh HN lần 2.', 'Đúng — Pháp đánh chiếm HN lần 1 năm 1873 do Garnier chỉ huy.', 'Sai — 1858 là năm Pháp nổ súng ở Đà Nẵng, mở đầu xâm lược VN.']
    ),
    Q('Người chỉ huy quân Pháp?', ['Charner', 'Bonard', 'Francis Garnier', 'Henri Rivière'], 2, 'Francis Garnier (Đại uý hải quân) chỉ huy đánh chiếm HN 1873.',
      [
      '<b>Francis Garnier</b> (Đại uý hải quân Pháp) là người chỉ huy đánh chiếm thành Hà Nội lần thứ nhất (1873).',
      'Garnier nổi tiếng liều lĩnh: chỉ với một lực lượng nhỏ vẫn dám tấn công thành. Sau đó ông bị quân Cờ Đen của Lưu Vĩnh Phúc phục kích và giết ở <i>Cầu Giấy</i> (21/12/1873).',
      '<ul><li>Phân biệt: Garnier chỉ huy lần 1 (1873); Henri Rivière chỉ huy lần 2 (1882) — cả hai đều tử trận ở Cầu Giấy.</li></ul>',
    ],
      ['Sai — Charner là đô đốc Pháp ở Nam Kì, không đánh HN.', 'Sai — Bonard cũng hoạt động ở Nam Kì.', 'Đúng — Francis Garnier chỉ huy quân Pháp đánh HN lần 1 (1873).', 'Sai — Henri Rivière chỉ huy đánh HN lần 2 (1882).']
    ),
    Q('Pháp dùng bao nhiêu quân tấn công?', ['10 000 quân', '~180 lính + tàu chiến', '50 000', '~5 000 lính bộ binh + pháo binh'], 1, 'Garnier chỉ có ~180 lính Pháp + 1 tàu chiến nhưng dám tấn công HN.',
      [
      '<b>Lực lượng Pháp rất ít</b> — chỉ khoảng <code>180 lính</code> cùng một vài tàu chiến — nhưng vẫn đánh chiếm được thành nhờ vũ khí hiện đại (đại bác, súng trường) và lối đánh bất ngờ.',
      'Quân triều đình tuy đông hơn nhưng <i>vũ khí lạc hậu</i> (gươm giáo, súng thần công cũ) và cách tổ chức phòng thủ thụ động.',
      '<ul><li>Bài học: chênh lệch về vũ khí – kĩ thuật quân sự là một nguyên nhân khiến nhà Nguyễn thất bại.</li></ul>',
    ],
      ['Sai — quân Pháp ít hơn nhiều, không tới 10 000.', 'Đúng — Garnier chỉ có khoảng 180 lính và 1 tàu chiến nhưng vẫn tấn công.', 'Sai — số quân thực tế rất nhỏ, không phải 50 000.', 'Sai — quân Pháp chỉ vài trăm, không tới 5 000.']
    ),
    Q('Nguyễn Tri Phương khi thành thất thủ đã?', ['Bỏ chạy', 'Tự sát ngay', 'Bị thương nặng, tuyệt thực mà mất', 'Đầu hàng'], 2, 'Nguyễn Tri Phương bị thương, bị Pháp bắt, tuyệt thực tự sát để giữ khí tiết.',
      [
      '<b>Nguyễn Tri Phương</b> khi thành Hà Nội thất thủ đã <i>bị thương nặng</i>, bị Pháp bắt. Ông <b>khước từ chữa trị, tuyệt thực</b> mà mất để giữ khí tiết của một bề tôi trung nghĩa.',
      'Con trai ông là <i>Nguyễn Lâm</i> cũng tử trận khi giữ thành. Tấm gương cha con họ Nguyễn thể hiện tinh thần <b>"thà chết không hàng giặc"</b>.',
      '<ul><li>Khí tiết: phẩm chất giữ vững đạo nghĩa, không khuất phục trước kẻ thù.</li></ul>',
    ],
      ['Sai — ông không bỏ chạy mà chiến đấu đến cùng.', 'Sai — ông bị thương rồi tuyệt thực, không tự sát ngay.', 'Đúng — ông bị thương nặng, bị bắt và tuyệt thực mà mất để giữ khí tiết.', 'Sai — ông không đầu hàng giặc.']
    ),
    Q('Sau khi mất HN, hiệp ước nào?', ['Hác-măng 1883', 'Giáp Tuất 1874 — VN nhường thêm quyền cho Pháp', 'Pa-tơ-nốt 1884', 'Nhâm Tuất 1862'], 1, 'Hiệp ước Giáp Tuất (15/3/1874): VN nhường nhiều quyền lợi cho Pháp ở Bắc Kì.',
      [
      'Sau khi mất Hà Nội lần 1, triều đình Huế kí <b>Hiệp ước Giáp Tuất (15/3/1874)</b> với Pháp.',
      'Nội dung: triều đình <i>chính thức thừa nhận sáu tỉnh Nam Kì thuộc Pháp</i> và nhường thêm nhiều quyền lợi về thương mại, ngoại giao ở Bắc Kì.',
      '<ul><li>Chuỗi hiệp ước đầu hàng: Nhâm Tuất (1862) → Giáp Tuất (1874) → Hác-măng (1883) → Pa-tơ-nốt (1884).</li></ul>',
    ],
      ['Sai — Hác-măng (1883) ký sau này, công nhận quyền bảo hộ của Pháp.', 'Đúng — Hiệp ước Giáp Tuất (1874) ký sau khi mất HN lần 1.', 'Sai — Pa-tơ-nốt (1884) là hiệp ước muộn hơn.', 'Sai — Nhâm Tuất (1862) ký liên quan Nam Kì, trước đó.']
    ),
  ]),

  M(3, 'Pháp xâm chiếm Hà Nội lần 2 (1882) — Hoàng Diệu', [
    Q('Pháp tấn công HN lần 2 năm?', ['1858', '1873', '1882', '1885'], 2, 'Pháp đánh chiếm HN lần 2 năm 1882 (Henri Rivière).',
      [
      '<b>Pháp đánh Hà Nội lần thứ hai năm <code>1882</code>.</b> Lúc này Pháp đã củng cố lực lượng ở Nam Kì và muốn nhanh chóng thôn tính toàn bộ Bắc Kì giàu tài nguyên.',
      'Cái cớ lần này là việc triều đình "vi phạm" Hiệp ước 1874 và liên hệ với nhà Thanh.',
      '<ul><li>1873 — lần 1 (Garnier); 1882 — lần 2 (Rivière); 1883–1884 — Pháp đặt ách bảo hộ toàn cõi.</li></ul>',
    ],
      ['Sai — 1858 Pháp mở đầu xâm lược ở Đà Nẵng.', 'Sai — 1873 là lần Pháp đánh HN lần 1.', 'Đúng — Pháp đánh chiếm HN lần 2 năm 1882 do Henri Rivière chỉ huy.', 'Sai — 1885 là năm phong trào Cần Vương bùng nổ.']
    ),
    Q('Người chỉ huy quân Pháp lần này?', ['De Lattre', 'Courbet', 'Henri Rivière', 'Francis Garnier'], 2, 'Đại tá Henri Rivière chỉ huy quân Pháp đánh HN lần 2.',
      [
      '<b>Henri Rivière</b> (Đại tá hải quân Pháp) chỉ huy quân Pháp đánh thành Hà Nội lần thứ hai (1882).',
      'Giống Garnier, Rivière cũng bị quân Cờ Đen phục kích và giết ở <i>Cầu Giấy</i> (19/5/1883). Trận Cầu Giấy lần hai làm nức lòng quân dân ta.',
      '<ul><li>Cả hai viên chỉ huy Pháp đều bỏ mạng tại Cầu Giấy — địa danh gắn với chiến thắng của quân dân Bắc Kì.</li></ul>',
    ],
      ['Sai — De Lattre là tướng Pháp thời kháng chiến chống Pháp (1950).', 'Sai — Courbet là đô đốc hải quân Pháp, không đánh HN lần này.', 'Đúng — Đại tá Henri Rivière chỉ huy đánh HN lần 2 (1882).', 'Sai — Francis Garnier chỉ huy lần 1 (1873).']
    ),
    Q('Tổng đốc HN khi đó?', ['Nguyễn Tri Phương', 'Tôn Thất Thuyết', 'Phan Đình Phùng', 'Hoàng Diệu'], 3, 'Hoàng Diệu (1828–1882) là Tổng đốc HN bảo vệ thành.',
      [
      '<b>Hoàng Diệu (1829–1882)</b>, quê Quảng Nam, là <i>Tổng đốc Hà Ninh</i> chỉ huy bảo vệ thành Hà Nội năm 1882.',
      'Ông tổ chức phòng thủ quyết liệt nhưng vì lực lượng chênh lệch và triều đình không tiếp viện, thành vẫn thất thủ.',
      '<ul><li>Phân biệt: 1873 — Nguyễn Tri Phương; 1882 — Hoàng Diệu.</li></ul>',
    ],
      ['Sai — Nguyễn Tri Phương là Tổng đốc khi Pháp đánh lần 1 (1873).', 'Sai — Tôn Thất Thuyết là đại thần ở Huế, khởi xướng Cần Vương.', 'Sai — Phan Đình Phùng lãnh đạo khởi nghĩa Hương Khê.', 'Đúng — Hoàng Diệu là Tổng đốc HN bảo vệ thành năm 1882.']
    ),
    Q('Hoàng Diệu hành động thế nào khi thành mất?', ['Bỏ chạy', 'Đầu hàng', 'Cộng tác Pháp', 'Thắt cổ tự sát giữ khí tiết tại Võ Miếu'], 3, 'Hoàng Diệu sau khi thành thất thủ đã thắt cổ tự sát tại Võ Miếu để giữ tiết tháo.',
      [
      'Khi thành Hà Nội thất thủ (1882), <b>Hoàng Diệu</b> đã viết <i>biểu tạ tội</i> gửi vua rồi <b>thắt cổ tự vẫn ở Võ Miếu</b> (gần Cửa Bắc) để giữ trọn khí tiết.',
      'Hành động của ông thể hiện trách nhiệm của người giữ thành: "<i>thành mất thì người giữ thành phải chết theo</i>".',
      '<ul><li>Nhân dân Hà Nội lập đền thờ ông; nhiều đường phố, trường học mang tên Hoàng Diệu.</li></ul>',
    ],
      ['Sai — ông không bỏ chạy mà chọn cái chết để giữ khí tiết.', 'Sai — ông không đầu hàng giặc.', 'Sai — ông không cộng tác với Pháp.', 'Đúng — Hoàng Diệu thắt cổ tự sát tại Võ Miếu để giữ tiết tháo.']
    ),
    Q('Ý nghĩa cái chết Hoàng Diệu?', ['Chỉ là tai nạn cá nhân, không có ý nghĩa lịch sử', 'Biểu tượng kiên trung, không khuất phục', 'Hèn nhát', 'Chỉ là sự kiện địa phương, ít người biết đến'], 1, 'Cái chết của Hoàng Diệu là biểu tượng tinh thần kiên trung, bất khuất.',
      [
      '<b>Cái chết của Hoàng Diệu</b> trở thành <i>biểu tượng của tinh thần kiên trung, bất khuất</i> trước quân xâm lược.',
      'Cùng với Nguyễn Tri Phương, ông là tấm gương về lòng yêu nước và khí tiết của tầng lớp sĩ phu, được nhân dân ghi nhớ qua các đời.',
      '<ul><li>Bài học: tinh thần hi sinh vì độc lập là truyền thống quý báu của dân tộc và của người Hà Nội.</li></ul>',
    ],
      ['Sai — đó là sự hy sinh có ý nghĩa lịch sử lớn, không phải tai nạn.', 'Đúng — cái chết của ông là biểu tượng kiên trung, không khuất phục.', 'Sai — đó là hành động dũng cảm, không hề hèn nhát.', 'Sai — đây là sự kiện được cả nước ghi nhớ, không chỉ địa phương.']
    ),
  ]),

  M(4, 'Hà Nội thời Pháp thuộc — Quy hoạch thuộc địa', [
    Q('Pháp biến HN thành?', ['Trung tâm hành chính Bắc Kỳ và Liên bang Đông Dương', 'Khu nông nghiệp', 'Cảng thuần', 'Thủ đô'], 0, 'HN: trung tâm hành chính Bắc Kỳ (Tonkin) và Liên bang Đông Dương từ 1902.',
      [
      'Sau khi chiếm Bắc Kì, Pháp biến Hà Nội thành <b>trung tâm hành chính của Bắc Kì (Tonkin)</b> và của cả <code>Liên bang Đông Dương</code> (gồm Việt Nam, Lào, Campuchia) từ năm <b>1902</b>.',
      'Hà Nội trở thành nơi đặt <i>Phủ Toàn quyền Đông Dương</i> — cơ quan đầu não cai trị thuộc địa.',
      '<ul><li>Đông Dương thuộc Pháp: Bắc Kì, Trung Kì, Nam Kì + Lào + Campuchia.</li></ul>',
    ],
      ['Đúng — Pháp biến HN thành trung tâm hành chính Bắc Kỳ và cả Đông Dương.', 'Sai — HN là trung tâm hành chính, không phải khu nông nghiệp.', 'Sai — HN không phải cảng biển; cảng chính là Hải Phòng.', 'Sai — khi đó HN là trung tâm thuộc địa, chưa là thủ đô nước độc lập.']
    ),
    Q('Khu phố Pháp được quy hoạch ở?', ['Phía bắc', 'Phía nam hồ Hoàn Kiếm (khu Ba Đình, Hoàn Kiếm hiện nay)', 'Long Biên', 'Hà Đông'], 1, 'Khu phố Pháp được quy hoạch ở phía nam hồ Hoàn Kiếm — kiểu đại lộ, biệt thự.',
      [
      'Người Pháp <b>quy hoạch khu phố mới ("khu phố Pháp")</b> ở <i>phía nam hồ Hoàn Kiếm</i> (khu vực Hoàn Kiếm, Ba Đình ngày nay).',
      'Đặc trưng: <i>đại lộ rộng thẳng, vỉa hè trồng cây, biệt thự kiểu Pháp, công sở bề thế</i> — đối lập với phố cổ chật hẹp của người Việt ở phía bắc hồ.',
      '<ul><li>Mô hình quy hoạch này khiến Hà Nội mang dáng dấp "thành phố thuộc địa kiểu Âu".</li></ul>',
    ],
      ['Sai — phía bắc hồ là khu phố cổ của người Việt.', 'Đúng — khu phố Pháp ở phía nam hồ Hoàn Kiếm với đại lộ, biệt thự.', 'Sai — Long Biên ở bờ đông sông Hồng.', 'Sai — Hà Đông nằm xa trung tâm, không phải khu phố Pháp.']
    ),
    Q('36 phố phường thuộc khu?', ['Phố Pháp', 'Hà Đông', 'Khu phố cổ — phía bắc hồ Hoàn Kiếm', 'Tây Hồ'], 2, '36 phố phường = phố cổ Hà Nội ở phía bắc hồ Hoàn Kiếm.',
      [
      '<b>36 phố phường</b> là <i>khu phố cổ</i> của người Việt, nằm ở <code>phía bắc hồ Hoàn Kiếm</code> — khu "Kẻ Chợ" buôn bán sầm uất từ xưa.',
      'Đây là vùng dân cư – thương mại bản địa, khác hẳn khu phố Pháp mới quy hoạch ở phía nam hồ.',
      '<ul><li>Tên phố thường bắt đầu bằng chữ "Hàng" + mặt hàng (Hàng Đào, Hàng Bạc, Hàng Mã…).</li></ul>',
    ],
      ['Sai — phố Pháp là khu mới do Pháp xây ở phía nam hồ.', 'Sai — Hà Đông không phải khu 36 phố phường.', 'Đúng — 36 phố phường chính là khu phố cổ ở phía bắc hồ Hoàn Kiếm.', 'Sai — Tây Hồ là khu vực hồ lớn, không phải phố cổ.']
    ),
    Q('Kiến trúc Pháp tiêu biểu?', ['Văn Miếu', 'Lăng Vua', 'Nhà hát Lớn, Phủ Toàn quyền (Phủ Chủ tịch), cầu Long Biên', 'Chùa Một Cột'], 2, 'Kiến trúc Pháp: Nhà hát Lớn (1911), Phủ Toàn quyền, Cầu Long Biên (1902)…',
      [
      '<b>Kiến trúc thuộc địa Pháp tiêu biểu ở Hà Nội</b>: Nhà hát Lớn (1911), Phủ Toàn quyền (nay là Phủ Chủ tịch), cầu Long Biên (1902), Nhà thờ Lớn, Bưu điện…',
      'Phong cách chủ đạo là <i>tân cổ điển</i> kết hợp một số yếu tố bản địa — tạo nên "kiến trúc Đông Dương".',
      '<ul><li>Phân biệt với di tích thời phong kiến (Văn Miếu, Chùa Một Cột) vốn là kiến trúc truyền thống Việt.</li></ul>',
    ],
      ['Sai — Văn Miếu là công trình thời Lý, không phải kiến trúc Pháp.', 'Sai — đây không phải công trình do Pháp xây.', 'Đúng — Nhà hát Lớn, Phủ Toàn quyền, cầu Long Biên là kiến trúc Pháp tiêu biểu.', 'Sai — Chùa Một Cột là kiến trúc thời Lý.']
    ),
    Q('Đô thị HN cuối thế kỉ XIX có gì mới?', ['Đèn dầu', 'Điện, nước máy, xe điện', 'Không có gì', 'Chỉ ngựa'], 1, 'Pháp đưa vào: điện (1900), nước máy, xe điện (1900) — hiện đại hoá đô thị.',
      [
      '<b>Cuối thế kỉ XIX – đầu XX</b>, Pháp đưa vào Hà Nội nhiều tiện ích đô thị hiện đại: <code>điện</code> (~1900), <code>nước máy</code>, <code>xe điện (tàu điện leng keng)</code>.',
      'Những tiện ích này phục vụ chủ yếu cho bộ máy cai trị và người Pháp, nhưng cũng làm thay đổi diện mạo đô thị.',
      '<ul><li>Mặt trái: hiện đại hoá đi kèm bóc lột thuộc địa, đời sống đa số người Việt vẫn khổ cực.</li></ul>',
    ],
      ['Sai — đèn dầu là cũ; Pháp đưa vào đèn điện.', 'Đúng — Pháp đưa vào điện, nước máy, xe điện làm HN hiện đại hơn.', 'Sai — có nhiều thay đổi hạ tầng mới mẻ.', 'Sai — đã có xe điện và phương tiện mới, không chỉ ngựa.']
    ),
  ]),

  M(5, 'Cầu Long Biên — Biểu tượng kiến trúc Pháp', [
    Q('Cầu Long Biên xây dựng?', ['1945', '1920', '1900-1950', '1898–1902, do hãng Daydé & Pillé (Pháp) thiết kế'], 3, 'Cầu Long Biên xây 1898-1902, Daydé & Pillé (Pháp) thiết kế.',
      [
      '<b>Cầu Long Biên</b> được xây dựng trong các năm <code>1898–1902</code>, do hãng <i>Daydé & Pillé</i> (Pháp) thiết kế và thi công, bắc qua sông Hồng.',
      'Cầu là công trình giao thông trọng điểm, nối Hà Nội với cảng Hải Phòng và vùng mỏ Quảng Ninh để phục vụ khai thác thuộc địa.',
      '<ul><li>Thời điểm hoàn thành (1902), đây là một trong những cây cầu thép lớn nhất Đông Dương.</li></ul>',
    ],
      ['Sai — 1945 là năm Cách mạng tháng Tám, cầu đã có từ trước.', 'Sai — cầu hoàn thành năm 1902, sớm hơn 1920.', 'Sai — cầu chỉ xây trong 4 năm (1898-1902), không kéo dài tới 1950.', 'Đúng — cầu xây 1898-1902 do hãng Daydé & Pillé (Pháp) thiết kế.']
    ),
    Q('Tên ban đầu của cầu?', ['Cầu Sông Hồng', 'Cầu Hà Nội', 'Cầu Doumer (Paul Doumer — toàn quyền Đông Dương)', 'Cầu Long Biên'], 2, 'Tên gốc: Pont Doumer (cầu Doumer), đổi tên sau 1945.',
      [
      'Tên gốc của cầu là <b>cầu Doumer</b> (<i>Pont Doumer</i>), đặt theo tên <code>Paul Doumer</code> — Toàn quyền Đông Dương đã cho khởi công.',
      'Sau Cách mạng tháng Tám 1945, cầu được đổi tên thành <b>Long Biên</b> theo tên vùng đất bờ đông sông Hồng.',
      '<ul><li>Việc đổi tên thể hiện ý chí giành lại chủ quyền và xoá dấu ấn thực dân.</li></ul>',
    ],
      ['Sai — đây không phải tên gốc của cầu.', 'Sai — cầu không mang tên Cầu Hà Nội.', 'Đúng — tên gốc là cầu Doumer, theo tên Toàn quyền Paul Doumer.', 'Sai — Long Biên là tên đổi sau 1945, không phải tên ban đầu.']
    ),
    Q('Cầu Long Biên dài?', ['~2290m, là cầu thép dài nhất Đông Dương khi xây xong', '500m', '100m', '5000m'], 0, 'Cầu Long Biên dài 2290m, lúc xây là cầu thép dài nhất Đông Dương.',
      [
      '<b>Cầu Long Biên dài khoảng <code>2290 m</code></b> (gồm cả phần cầu dẫn), với 19 nhịp dầm thép đặt trên các trụ đá.',
      'Khi mới xây, đây từng là <i>cây cầu thép dài nhất Đông Dương</i> và là biểu tượng kĩ thuật của thời kì đó.',
      '<ul><li>Cầu có đường ray xe lửa ở giữa, hai bên là đường cho xe và người đi bộ.</li></ul>',
    ],
      ['Đúng — cầu dài khoảng 2290m, từng là cầu thép dài nhất Đông Dương.', 'Sai — cầu dài hơn nhiều, tới hơn 2km.', 'Sai — 100m quá ngắn so với chiều dài thực.', 'Sai — cầu dài khoảng 2290m, không tới 5000m.']
    ),
    Q('Cầu Long Biên thời chiến tranh?', ['Tự nhiên hỏng', 'Không bị bom', 'Bị Mỹ ném bom nhiều lần (1965–1972), được nối lại nhiều lần', 'Bị Pháp phá'], 2, 'Cầu Long Biên là mục tiêu chiến lược, bị Mỹ ném bom nặng nề 1965–1972.',
      [
      'Trong <b>kháng chiến chống Mỹ</b>, cầu Long Biên là <i>mục tiêu chiến lược</i> nối Hà Nội với các tỉnh phía bắc, bị máy bay Mỹ <b>ném bom nhiều lần (1965–1972)</b>.',
      'Nhiều nhịp cầu bị đánh sập rồi được quân dân ta <i>sửa chữa, nối lại</i> để giữ huyết mạch giao thông.',
      '<ul><li>Cầu trở thành "chứng nhân" của cả thời Pháp thuộc lẫn cuộc chiến chống Mỹ.</li></ul>',
    ],
      ['Sai — cầu hỏng do bom đạn, không phải tự nhiên.', 'Sai — cầu bị ném bom nhiều lần.', 'Đúng — cầu là mục tiêu chiến lược, bị Mỹ ném bom nhiều lần (1965-1972).', 'Sai — cầu bị Mỹ ném bom, không phải Pháp phá.']
    ),
    Q('Ý nghĩa Cầu Long Biên hiện nay?', ['Di sản kiến trúc, biểu tượng HN, gắn lịch sử dân tộc', 'Chỉ giao thông', 'Sắp phá bỏ', 'Chỉ là cây cầu sắt cũ kỹ chờ thay thế'], 0, 'Cầu Long Biên: di sản kiến trúc + biểu tượng HN + chứng nhân lịch sử (Pháp thuộc, KCN, chống Mỹ).',
      [
      'Ngày nay, <b>cầu Long Biên</b> vừa là <i>di sản kiến trúc – kĩ thuật</i>, vừa là <b>biểu tượng và chứng nhân lịch sử</b> của Hà Nội.',
      'Cầu gắn với nhiều giai đoạn: xây dựng thời Pháp, đổi tên sau 1945, hứng bom thời chống Mỹ — nay là điểm tham quan, chụp ảnh quen thuộc.',
      '<ul><li>Bảo tồn cầu Long Biên là gìn giữ kí ức đô thị cho các thế hệ sau.</li></ul>',
    ],
      ['Đúng — cầu là di sản kiến trúc, biểu tượng HN, gắn với lịch sử dân tộc.', 'Sai — ngoài giao thông, cầu còn là di sản và biểu tượng.', 'Sai — cầu được bảo tồn, không bị phá bỏ.', 'Sai — cầu là di sản quý giá, không chỉ là sắt cũ.']
    ),
  ]),

  M(6, 'Nhà hát Lớn Hà Nội', [
    Q('Nhà hát Lớn HN xây?', ['1990', '1901–1911, kiến trúc Pháp', '1945', '1800'], 1, 'Nhà hát Lớn HN xây 1901-1911, kiến trúc Pháp tân cổ điển.',
      [
      '<b>Nhà hát Lớn Hà Nội</b> được xây dựng trong các năm <code>1901–1911</code>, theo phong cách <i>kiến trúc tân cổ điển Pháp</i>.',
      'Đây là một trong những công trình văn hoá tiêu biểu mà người Pháp xây dựng để phục vụ đời sống tinh thần của giới quan chức và thị dân.',
      '<ul><li>Toạ lạc ở quảng trường Cách mạng tháng Tám, cuối phố Tràng Tiền.</li></ul>',
    ],
      ['Sai — nhà hát xây từ đầu thế kỷ XX, sớm hơn 1990 nhiều.', 'Đúng — Nhà hát Lớn xây 1901-1911 theo kiến trúc Pháp tân cổ điển.', 'Sai — 1945 là năm Cách mạng tháng Tám, nhà hát đã có từ trước.', 'Sai — năm 1800 quá sớm; nhà hát xây đầu thế kỷ XX.']
    ),
    Q('Mô hình của Nhà hát Lớn?', ['Mô phỏng Opéra Garnier (Paris)', 'VN truyền thống', 'Trung Quốc', 'Kiến trúc Gothic châu Âu thời Trung cổ'], 0, 'Mô phỏng Opéra Garnier (Paris) — nhà hát opera nổi tiếng nhất thế giới.',
      [
      'Nhà hát Lớn Hà Nội được <b>mô phỏng theo Nhà hát Opéra Garnier ở Paris</b> — nhà hát opera nổi tiếng bậc nhất thế giới.',
      'Công trình mang đặc trưng tân cổ điển: <i>mái vòm, cột đá, ban công, sảnh gương lộng lẫy</i>.',
      '<ul><li>Phân biệt: đây là kiến trúc Pháp, không phải kiến trúc truyền thống Việt hay Gothic Trung cổ.</li></ul>',
    ],
      ['Đúng — Nhà hát Lớn mô phỏng Opéra Garnier nổi tiếng ở Paris.', 'Sai — đây là kiến trúc Pháp, không phải kiểu VN truyền thống.', 'Sai — mẫu thiết kế từ Pháp, không phải Trung Quốc.', 'Sai — phong cách là tân cổ điển Pháp, không phải Gothic Trung cổ.']
    ),
    Q('Sức chứa Nhà hát Lớn?', ['10', '100', '5000', '~600 ghế (đã sửa lại)'], 3, '~600 ghế sau khi sửa chữa.',
      [
      'Sau khi tu sửa, <b>Nhà hát Lớn có sức chứa khoảng <code>600 ghế</code></b>, phục vụ các buổi hoà nhạc giao hưởng, opera, biểu diễn nghệ thuật.',
      'Không gian được thiết kế chú trọng âm thanh và tầm nhìn của khán giả.',
      '<ul><li>Đây là một trong những thánh đường nghệ thuật cổ điển hàng đầu Việt Nam.</li></ul>',
    ],
      ['Sai — 10 ghế quá ít so với một nhà hát.', 'Sai — sức chứa lớn hơn 100 nhiều.', 'Sai — nhà hát không chứa tới 5000 ghế.', 'Đúng — Nhà hát Lớn có khoảng 600 ghế sau khi sửa chữa.']
    ),
    Q('Sự kiện quan trọng tại Nhà hát Lớn?', ['Quốc hội đầu tiên VN họp 1946', 'Cách mạng Tháng Tám', 'Thành lập Hội Nhà văn', 'Đại hội Đảng'], 0, 'Quốc hội Khoá I VN khai mạc tại Nhà hát Lớn ngày 2/3/1946.',
      [
      'Nhà hát Lớn gắn với một sự kiện trọng đại: <b>kì họp đầu tiên của Quốc hội nước Việt Nam Dân chủ Cộng hoà</b> khai mạc tại đây ngày <code>2/3/1946</code>.',
      'Trước đó, trong Cách mạng tháng Tám 1945, quảng trường trước Nhà hát Lớn là nơi diễn ra cuộc mít-tinh lớn ngày 19/8/1945.',
      '<ul><li>Nhà hát Lớn vừa là biểu tượng văn hoá vừa gắn với các mốc lịch sử cách mạng.</li></ul>',
    ],
      ['Đúng — Quốc hội Khoá I khai mạc tại Nhà hát Lớn ngày 2/3/1946.', 'Sai — mít-tinh CMTT diễn ra ở quảng trường, đây là sự kiện Quốc hội.', 'Sai — đây không phải nơi thành lập Hội Nhà văn.', 'Sai — Đại hội Đảng họp ở nơi khác.']
    ),
    Q('Ý nghĩa kiến trúc Nhà hát Lớn?', ['Công trình hành chính thời Pháp thuộc', 'Biểu tượng văn hoá nghệ thuật HN', 'Lạc hậu', 'Sắp phá bỏ'], 1, 'Nhà hát Lớn: biểu tượng nghệ thuật, văn hoá HN; trung tâm biểu diễn classic.',
      [
      '<b>Nhà hát Lớn</b> là <i>biểu tượng văn hoá – nghệ thuật của Hà Nội</i>, trung tâm của các hoạt động biểu diễn cổ điển.',
      'Công trình còn là một điểm nhấn kiến trúc và là di sản đô thị cần được gìn giữ.',
      '<ul><li>Hình ảnh Nhà hát Lớn thường được dùng làm biểu trưng cho văn hoá Thủ đô.</li></ul>',
    ],
      ['Sai — đây là công trình nghệ thuật, không phải trụ sở hành chính.', 'Đúng — Nhà hát Lớn là biểu tượng văn hoá, nghệ thuật của HN.', 'Sai — nhà hát vẫn là điểm văn hoá quý giá, không lạc hậu.', 'Sai — nhà hát được bảo tồn, không bị phá bỏ.']
    ),
  ]),

  M(7, 'Phong trào yêu nước đầu XX tại Hà Nội — Đông Du', [
    Q('Phong trào Đông Du (1905-1908) khởi xướng bởi?', ['Hồ Chí Minh', 'Nguyễn Thái Học', 'Phan Bội Châu', 'Phan Châu Trinh'], 2, 'Phan Bội Châu (1867-1940) khởi xướng phong trào Đông Du, đưa thanh niên VN sang Nhật học.',
      [
      '<b>Phong trào Đông Du (1905–1908)</b> do <code>Phan Bội Châu</code> (1867–1940) khởi xướng, tổ chức trong khuôn khổ <i>Hội Duy Tân</i>.',
      '"Đông Du" nghĩa là <b>đi sang phương Đông (Nhật Bản) để học</b>, nhằm đào tạo nhân tài cứu nước theo con đường bạo động vũ trang.',
      '<ul><li>Phân biệt: Phan Bội Châu chủ trương bạo động (Đông Du); Phan Châu Trinh chủ trương cải cách ôn hoà (Duy Tân).</li></ul>',
    ],
      ['Sai — HCM ra đi tìm đường cứu nước năm 1911, sang phương Tây.', 'Sai — Nguyễn Thái Học lãnh đạo khởi nghĩa Yên Bái (1930).', 'Đúng — Phan Bội Châu khởi xướng phong trào Đông Du, đưa thanh niên sang Nhật.', 'Sai — Phan Châu Trinh chủ trương duy tân ôn hoà, không phải Đông Du.']
    ),
    Q('Mục đích Đông Du?', ['Định cư', 'Buôn bán', 'Đi du lịch', 'Đưa thanh niên sang Nhật học, chuẩn bị giành độc lập'], 3, 'Đông Du: đưa thanh niên sang Nhật học để chuẩn bị lực lượng giành độc lập.',
      [
      '<b>Mục đích Đông Du</b>: đưa thanh niên Việt Nam <i>sang Nhật Bản học tập</i> (quân sự, khoa học), chuẩn bị lực lượng để giành lại độc lập.',
      'Phan Bội Châu chọn Nhật vì Nhật là nước châu Á "đồng văn đồng chủng" vừa duy tân thành công, đánh thắng Nga (1905).',
      '<ul><li>Đây là con đường cứu nước theo khuynh hướng <b>bạo động vũ trang</b>.</li></ul>',
    ],
      ['Sai — mục đích là học rồi về cứu nước, không phải định cư.', 'Sai — không phải để buôn bán.', 'Sai — không phải đi du lịch mà là đi học.', 'Đúng — đưa thanh niên sang Nhật học để chuẩn bị giành độc lập.']
    ),
    Q('HN trong phong trào Đông Du?', ['Trung lập', 'Phản đối', 'Không tham gia', 'Là một trong các trung tâm tuyển chọn, vận động'], 3, 'HN là một trong các trung tâm vận động đưa thanh niên Đông Du.',
      [
      '<b>Hà Nội</b> là một trong những <i>trung tâm tuyển chọn, vận động</i> thanh niên tham gia phong trào Đông Du.',
      'Các sĩ phu yêu nước ở Hà Nội và Bắc Kì hưởng ứng, gây quỹ, liên lạc và đưa người sang Nhật.',
      '<ul><li>Phong trào lan rộng từ Trung Kì (quê Phan Bội Châu) ra cả Bắc Kì và Nam Kì.</li></ul>',
    ],
      ['Sai — HN có tham gia tích cực, không trung lập.', 'Sai — HN không phản đối mà ủng hộ phong trào.', 'Sai — HN có tham gia vận động.', 'Đúng — HN là một trong các trung tâm tuyển chọn, vận động Đông Du.']
    ),
    Q('Số thanh niên Đông Du?', ['1', '10', '~200 người', '10 000'], 2, '~200 thanh niên VN sang Nhật học theo phong trào Đông Du.',
      [
      'Tổng cộng có khoảng <b><code>200 thanh niên</code></b> Việt Nam sang Nhật Bản học tập theo phong trào Đông Du.',
      'Họ học tại các trường quân sự, kĩ thuật, được tổ chức thành nhóm và nhận sự giúp đỡ ban đầu của một số nhà hoạt động Nhật.',
      '<ul><li>Con số tuy không lớn nhưng có ý nghĩa mở đường cho việc đào tạo nhân tài cứu nước.</li></ul>',
    ],
      ['Sai — có hàng trăm người tham gia, không chỉ 1.', 'Sai — số người lớn hơn 10 nhiều.', 'Đúng — khoảng 200 thanh niên VN sang Nhật học theo phong trào.', 'Sai — con số khoảng 200, không tới 10 000.']
    ),
    Q('Phong trào kết thúc vì?', ['Thắng lợi', 'Thanh niên không học được', 'Pháp-Nhật thoả thuận trục xuất, 1909', 'Tự kết thúc'], 2, 'Pháp ký với Nhật, Nhật trục xuất thanh niên VN (1909), kết thúc Đông Du.',
      [
      '<b>Phong trào Đông Du tan rã năm <code>1908–1909</code></b>: thực dân Pháp câu kết với Nhật, <i>Nhật trục xuất lưu học sinh và Phan Bội Châu</i>.',
      'Bài học: dựa vào một đế quốc để chống một đế quốc khác là không thực tế ("đưa hổ cửa trước, rước beo cửa sau").',
      '<ul><li>Dù thất bại, phong trào đã cổ vũ mạnh mẽ tinh thần yêu nước và ý thức học tập, canh tân.</li></ul>',
    ],
      ['Sai — phong trào kết thúc do bị đàn áp, không phải thắng lợi.', 'Sai — thanh niên vẫn học được; phong trào bị trục xuất.', 'Đúng — Pháp - Nhật thoả thuận, Nhật trục xuất thanh niên VN (1909).', 'Sai — phong trào bị buộc kết thúc, không tự kết thúc.']
    ),
  ]),

  M(8, 'Đông Kinh Nghĩa Thục tại Hà Nội (1907)', [
    Q('Đông Kinh Nghĩa Thục thành lập?', ['1900 tại Sài Gòn', '1907 tại Hà Nội (phố Hàng Đào)', '1885', '1920'], 1, 'Đông Kinh Nghĩa Thục (3/1907) tại phố Hàng Đào, HN — Đông Kinh = HN, Nghĩa Thục = trường nghĩa.',
      [
      '<b>Đông Kinh Nghĩa Thục</b> được thành lập tháng <code>3/1907</code> tại <i>phố Hàng Đào, Hà Nội</i>.',
      'Tên gọi: "<b>Đông Kinh</b>" là tên cũ của Hà Nội (thời Lê), "<b>Nghĩa Thục</b>" là trường tư dạy học không thu tiền vì nghĩa.',
      '<ul><li>Đây là một trường học – đồng thời là phong trào yêu nước theo khuynh hướng cải cách.</li></ul>',
    ],
      ['Sai — trường thành lập ở HN năm 1907, không phải Sài Gòn 1900.', 'Đúng — Đông Kinh Nghĩa Thục lập năm 1907 tại phố Hàng Đào, HN.', 'Sai — 1885 là năm phong trào Cần Vương, không phải lập trường.', 'Sai — trường lập năm 1907, không phải 1920.']
    ),
    Q('Người sáng lập?', ['Lương Văn Can, Nguyễn Quyền và các nhà yêu nước', 'Phan Bội Châu', 'Hồ Chí Minh', 'Nguyễn Thái Học'], 0, 'Lương Văn Can, Nguyễn Quyền, Đào Nguyên Phổ, Hoàng Tăng Bí… sáng lập.',
      [
      '<b>Người sáng lập</b> Đông Kinh Nghĩa Thục là các nhà nho yêu nước: <code>Lương Văn Can</code> (thục trưởng), <code>Nguyễn Quyền</code>, cùng Đào Nguyên Phổ, Hoàng Tăng Bí…',
      'Họ là tầng lớp sĩ phu tiến bộ, chịu ảnh hưởng tư tưởng duy tân từ Nhật Bản và Trung Quốc.',
      '<ul><li>Lương Văn Can được coi là linh hồn của nhà trường.</li></ul>',
    ],
      ['Đúng — Lương Văn Can, Nguyễn Quyền và các nhà yêu nước sáng lập trường.', 'Sai — Phan Bội Châu lo phong trào Đông Du, không lập trường này.', 'Sai — HCM lúc đó còn rất trẻ, chưa hoạt động ở HN.', 'Sai — Nguyễn Thái Học hoạt động sau này (khởi nghĩa Yên Bái 1930).']
    ),
    Q('Mục đích?', ['Tuyên truyền Pháp', 'Chỉ dạy nông nghiệp', 'Dạy chữ Hán', 'Dạy chữ Quốc ngữ, kiến thức mới, đề cao tinh thần yêu nước'], 3, 'Đông Kinh Nghĩa Thục: dạy chữ Quốc ngữ, kiến thức khoa học, tinh thần yêu nước, cải cách XH.',
      [
      '<b>Mục đích Đông Kinh Nghĩa Thục</b>: dạy <i>chữ Quốc ngữ</i>, truyền bá <i>kiến thức khoa học mới</i> và đề cao <b>tinh thần yêu nước, cải cách xã hội</b>.',
      'Trường bài trừ lối học khoa cử cũ, cổ vũ thực học, dùng hàng nội, cắt tóc ngắn, bỏ hủ tục.',
      '<ul><li>Đề cao chữ Quốc ngữ là một bước tiến lớn trong việc nâng cao dân trí.</li></ul>',
    ],
      ['Sai — trường chống Pháp, không tuyên truyền cho Pháp.', 'Sai — trường dạy nhiều kiến thức mới, không chỉ nông nghiệp.', 'Sai — trường đề cao chữ Quốc ngữ và kiến thức mới, không chỉ chữ Hán.', 'Đúng — trường dạy chữ Quốc ngữ, kiến thức mới và đề cao tinh thần yêu nước.']
    ),
    Q('Đông Kinh Nghĩa Thục bị?', ['Pháp giải tán cuối 1907', 'Tự đóng', 'Phát triển mạnh', 'Trở thành đại học'], 0, 'Pháp lo sợ ảnh hưởng nên đóng cửa cuối 1907, bắt giam các nhà sáng lập.',
      [
      'Lo sợ ảnh hưởng của trường, <b>thực dân Pháp ra lệnh đóng cửa Đông Kinh Nghĩa Thục cuối năm <code>1907</code></b> và bắt giam nhiều người sáng lập.',
      'Như vậy trường chỉ hoạt động được khoảng <i>9 tháng</i>, nhưng đã gieo mầm tư tưởng tiến bộ.',
      '<ul><li>Lương Văn Can bị đày sang Campuchia; nhiều người khác bị bắt, bị quản thúc.</li></ul>',
    ],
      ['Đúng — Pháp lo sợ ảnh hưởng nên giải tán trường cuối 1907.', 'Sai — trường bị Pháp đóng, không tự đóng.', 'Sai — trường bị giải tán, không phát triển mạnh.', 'Sai — trường bị đóng cửa, không trở thành đại học.']
    ),
    Q('Ý nghĩa lịch sử?', ['Không có ý nghĩa', 'Thất bại hoàn toàn', 'Chỉ địa phương', 'Mở đầu phong trào canh tân giáo dục, văn hoá VN'], 3, 'Đông Kinh Nghĩa Thục là mở đầu phong trào canh tân giáo dục, văn hoá theo hướng mới ở VN.',
      [
      '<b>Ý nghĩa lịch sử</b>: Đông Kinh Nghĩa Thục <i>mở đầu phong trào canh tân giáo dục, văn hoá</i> theo hướng mới ở Việt Nam.',
      'Trường cổ vũ chữ Quốc ngữ, nâng cao dân trí, khơi dậy tinh thần dân tộc — ảnh hưởng lan rộng cả nước.',
      '<ul><li>Tuy tồn tại ngắn, di sản tư tưởng của trường còn tiếp nối trong các phong trào yêu nước sau này.</li></ul>',
    ],
      ['Sai — trường có ý nghĩa lịch sử lớn về canh tân.', 'Sai — dù bị đóng nhưng tư tưởng lan rộng, không thất bại hoàn toàn.', 'Sai — ảnh hưởng lan ra cả nước, không chỉ địa phương.', 'Đúng — trường mở đầu phong trào canh tân giáo dục, văn hoá VN.']
    ),
  ]),

  M(9, 'Phong trào duy tân tại Hà Nội — Phan Châu Trinh', [
    Q('Phan Châu Trinh (1872-1926) chủ trương?', ['Trung lập', 'Bạo động', 'Phục cổ', '"Khai dân trí, chấn dân khí, hậu dân sinh" — cải cách ôn hoà'], 3, 'Phan Châu Trinh: 3 chủ trương "Khai dân trí, chấn dân khí, hậu dân sinh".',
      [
      '<b>Phan Châu Trinh (1872–1926)</b> chủ trương đường lối <i>cải cách ôn hoà</i> với khẩu hiệu nổi tiếng: "<code>Khai dân trí, chấn dân khí, hậu dân sinh</code>".',
      'Nghĩa là: <b>mở mang trí tuệ – chấn hưng tinh thần – làm cho dân giàu</b>. Ông đặt việc nâng cao dân trí lên hàng đầu.',
      '<ul><li>Phong trào Duy tân (1906–1908) ở Trung Kì gắn liền với tên tuổi của ông.</li></ul>',
    ],
      ['Sai — ông chủ trương cải cách tích cực, không trung lập.', 'Sai — ông chủ trương ôn hoà, ngược với bạo động.', 'Sai — ông hướng tới canh tân, không phục cổ.', 'Đúng — ông chủ trương "Khai dân trí, chấn dân khí, hậu dân sinh".']
    ),
    Q('Phương pháp Phan Châu Trinh?', ['Bí mật', 'Khởi nghĩa', 'Ôn hoà, dựa Pháp để duy tân', 'Vũ trang'], 2, 'PCT chủ trương ôn hoà, dựa Pháp để cải cách dân trí, không dùng vũ lực.',
      [
      '<b>Phương pháp của Phan Châu Trinh</b> là <i>ôn hoà, công khai</i>: dựa vào Pháp để cải cách, nâng cao dân trí, phản đối bạo động và phản đối cả việc dựa vào nước ngoài để bạo động.',
      'Ông tin rằng dân trí được nâng cao thì mới có thể giành tự do, độc lập một cách bền vững.',
      '<ul><li>Hạn chế: chủ trương dựa Pháp để duy tân là ảo tưởng vì Pháp không muốn dân ta tiến bộ.</li></ul>',
    ],
      ['Sai — ông hoạt động công khai, ôn hoà.', 'Sai — ông không chủ trương khởi nghĩa vũ trang.', 'Đúng — ông chủ trương ôn hoà, dựa Pháp để duy tân.', 'Sai — ông phản đối dùng vũ lực.']
    ),
    Q('Khác biệt PCT và PBC?', ['PCT: ôn hoà duy tân; PBC: bạo động Đông Du', 'PCT bạo động', 'Giống nhau', 'PBC ôn hoà'], 0, 'PCT: ôn hoà duy tân, dựa Pháp; PBC: bạo động vũ trang, Đông Du sang Nhật.',
      [
      '<b>So sánh hai khuynh hướng cứu nước đầu thế kỉ XX:</b>',
      '<ul><li><b>Phan Bội Châu</b> (Đông Du): <i>bạo động vũ trang</i>, dựa vào Nhật để đánh Pháp.</li><li><b>Phan Châu Trinh</b> (Duy Tân): <i>cải cách ôn hoà</i>, dựa Pháp để nâng cao dân trí, dân sinh.</li></ul>',
      'Cả hai đều thất bại, cho thấy con đường cứu nước cũ chưa phù hợp — mở đường cho con đường mới của Nguyễn Ái Quốc.',
    ],
      ['Đúng — PCT chủ trương ôn hoà duy tân, còn PBC bạo động và Đông Du.', 'Sai — PCT mới là người chủ trương ôn hoà, không bạo động.', 'Sai — hai người có đường lối khác nhau rõ rệt.', 'Sai — PBC chủ trương bạo động, không ôn hoà.']
    ),
    Q('Ảnh hưởng PCT đến HN?', ['Truyền cảm hứng phong trào duy tân, cải cách văn hoá', 'Bị cấm hoàn toàn', 'Không ảnh hưởng', 'Tiêu cực'], 0, 'PCT truyền cảm hứng nhiều phong trào cải cách văn hoá-giáo dục ở HN và toàn quốc.',
      [
      'Tư tưởng <b>"khai dân trí" của Phan Châu Trinh</b> đã <i>truyền cảm hứng cho các phong trào duy tân, cải cách văn hoá – giáo dục</i> ở Hà Nội và cả nước.',
      'Đông Kinh Nghĩa Thục ở Hà Nội chính là một biểu hiện sinh động của tư tưởng duy tân ấy.',
      '<ul><li>Tên ông được đặt cho nhiều đường phố, trường học ở Hà Nội và khắp Việt Nam.</li></ul>',
    ],
      ['Đúng — PCT truyền cảm hứng cho phong trào duy tân, cải cách văn hoá ở HN.', 'Sai — tư tưởng PCT vẫn lan rộng, không bị cấm hoàn toàn.', 'Sai — PCT có ảnh hưởng lớn tới HN.', 'Sai — ảnh hưởng của PCT là tích cực, thúc đẩy tiến bộ.']
    ),
    Q('Lễ tang Phan Châu Trinh (1926) tại?', ['Sài Gòn, sau lan rộng cả nước, gồm HN', 'Hà Nội, do gia đình tổ chức tại quê cha', 'Huế, nơi ông từng làm quan triều Nguyễn', 'Hải Phòng'], 0, 'Lễ tang PCT (1926) ở SG, lan rộng cả nước thành phong trào yêu nước lớn.',
      [
      '<b>Lễ tang Phan Châu Trinh (1926)</b> tổ chức tại <i>Sài Gòn</i>, sau đó lan rộng thành <b>phong trào để tang trên cả nước</b>, kể cả Hà Nội.',
      'Đây trở thành một cuộc vận động yêu nước lớn, thu hút đông đảo thanh niên, học sinh, trí thức tham gia.',
      '<ul><li>Sự kiện cho thấy ảnh hưởng sâu rộng của Phan Châu Trinh trong lòng dân tộc.</li></ul>',
    ],
      ['Đúng — lễ tang PCT ở Sài Gòn, sau lan rộng cả nước, gồm HN.', 'Sai — lễ tang khởi đầu ở Sài Gòn, không phải HN.', 'Sai — lễ tang diễn ra ở Sài Gòn, không phải Huế.', 'Sai — lễ tang ở Sài Gòn, không phải Hải Phòng.']
    ),
  ]),

  M(10, 'Vụ Hà thành đầu độc (1908)', [
    Q('Vụ Hà thành đầu độc xảy ra năm?', ['1885', '1908', '1907', '1920'], 1, 'Vụ Hà thành đầu độc xảy ra ngày 27/6/1908.',
      [
      '<b>Vụ Hà thành đầu độc</b> diễn ra ngày <code>27/6/1908</code> tại Hà Nội.',
      'Đây là một âm mưu nổi dậy chống Pháp ngay trong lòng thành Hà Nội, gắn với phong trào yêu nước đầu thế kỉ XX.',
      '<ul><li>Phân biệt mốc: 1885 (Cần Vương) – 1907 (Đông Kinh Nghĩa Thục) – 1908 (Hà thành đầu độc).</li></ul>',
    ],
      ['Sai — 1885 là năm phong trào Cần Vương bùng nổ.', 'Đúng — vụ Hà thành đầu độc xảy ra năm 1908.', 'Sai — 1907 là năm lập Đông Kinh Nghĩa Thục.', 'Sai — vụ việc xảy ra năm 1908, không phải 1920.']
    ),
    Q('Mục đích vụ đầu độc?', ['Cướp tài sản', 'Trả thù cá nhân', 'Vô tình', 'Đánh úp lính Pháp đồn HN, kết hợp khởi nghĩa Yên Thế'], 3, 'Vụ Hà thành đầu độc: kế hoạch đánh úp lính Pháp đồn HN, phối hợp khởi nghĩa Yên Thế.',
      [
      '<b>Mục đích vụ Hà thành đầu độc</b>: <i>đầu độc rồi đánh úp lính Pháp trong thành Hà Nội</i>, phối hợp với nghĩa quân <b>Yên Thế của Đề Thám</b> tấn công từ bên ngoài.',
      'Đây là kế hoạch kết hợp "trong đánh ra, ngoài đánh vào" để chiếm thành.',
      '<ul><li>Vụ việc thể hiện tinh thần yêu nước, không cam chịu ách thống trị của thực dân.</li></ul>',
    ],
      ['Sai — đây là hành động yêu nước, không phải cướp tài sản.', 'Sai — không phải trả thù cá nhân mà là chống Pháp.', 'Sai — đây là kế hoạch có chủ đích, không vô tình.', 'Đúng — kế hoạch đánh úp lính Pháp ở HN, phối hợp khởi nghĩa Yên Thế.']
    ),
    Q('Người chỉ huy?', ['Hoàng Diệu', 'Vua Hàm Nghi', 'Đầu bếp Việt trong đồn binh Pháp, liên kết Đề Thám', 'Phan Bội Châu'], 2, 'Đầu bếp Việt trong đồn lính Pháp được Đề Thám liên kết, lên kế hoạch đầu độc thức ăn.',
      [
      '<b>Lực lượng nòng cốt</b> là những <i>người đầu bếp Việt phục vụ trong trại lính Pháp</i>, được vận động và liên kết với nghĩa quân của <code>Đề Thám (Hoàng Hoa Thám)</code>.',
      'Họ bỏ thuốc độc (cà độc dược) vào thức ăn của lính Pháp để gây tê liệt.',
      '<ul><li>Sự tham gia của những người lao động bình thường cho thấy lòng yêu nước trong mọi tầng lớp.</li></ul>',
    ],
      ['Sai — Hoàng Diệu mất năm 1882, trước vụ này.', 'Sai — vua Hàm Nghi gắn với Cần Vương, không phải vụ này.', 'Đúng — các đầu bếp Việt trong đồn Pháp liên kết với Đề Thám thực hiện.', 'Sai — Phan Bội Châu lo phong trào Đông Du.']
    ),
    Q('Phương pháp?', ['Bao vây', 'Đầu độc thức ăn của lính Pháp', 'Tấn công trực diện', 'Đánh bom'], 1, 'Đầu độc bằng bã hoa hòe trong thức ăn lính Pháp.',
      [
      '<b>Phương pháp</b>: <i>bỏ thuốc độc vào thức ăn của binh lính Pháp</i> để làm tê liệt, sau đó nghĩa quân bên trong và bên ngoài cùng nổi dậy chiếm thành.',
      'Tuy nhiên, độc dược không đủ liều và kế hoạch bị bại lộ nên cuộc nổi dậy thất bại.',
      '<ul><li>Đây là cách đánh táo bạo, lợi dụng nội ứng ngay trong hàng ngũ địch.</li></ul>',
    ],
      ['Sai — kế hoạch là đầu độc, không phải bao vây.', 'Đúng — đầu độc thức ăn của lính Pháp để làm tê liệt rồi tấn công.', 'Sai — phương pháp chính là đầu độc, không tấn công trực diện.', 'Sai — không dùng bom mà dùng chất độc trong thức ăn.']
    ),
    Q('Kết quả vụ Hà thành đầu độc?', ['Pháp bỏ HN', 'Không có ai chết', 'Thất bại, nhiều người bị tử hình', 'Thắng lợi'], 2, 'Kế hoạch bị lộ, Pháp phát hiện, nhiều người bị bắt và tử hình. Khởi nghĩa thất bại.',
      [
      '<b>Kết quả</b>: kế hoạch bị lộ, cuộc nổi dậy <i>thất bại</i>; thực dân Pháp <b>bắt và xử tử nhiều người</b> tham gia.',
      'Pháp tăng cường đàn áp, kiểm soát chặt chẽ Hà Nội hơn sau vụ việc.',
      '<ul><li>Dù thất bại, vụ Hà thành đầu độc vẫn là một trang sử yêu nước đáng trân trọng của Thủ đô.</li></ul>',
    ],
      ['Sai — Pháp không bỏ HN; kế hoạch thất bại.', 'Sai — nhiều người tham gia bị tử hình.', 'Đúng — kế hoạch bị lộ, thất bại, nhiều người bị tử hình.', 'Sai — kế hoạch thất bại chứ không thắng lợi.']
    ),
  ]),

  M(11, 'Khu phố cổ Hà Nội — 36 phố phường', [
    Q('36 phố phường HN có từ?', ['Sau 1945', 'Thời Pháp thuộc', 'Thời Lý-Trần, phát triển mạnh thời Lê-Nguyễn', '2000'], 2, '36 phố phường có từ thời Lý-Trần, phát triển mạnh thời Lê-Nguyễn (XVII-XIX).',
      [
      '<b>Khu 36 phố phường</b> hình thành từ <i>thời Lý – Trần</i> và phát triển mạnh vào <i>thời Lê – Nguyễn</i> (thế kỉ XVII–XIX).',
      'Đây là khu "Kẻ Chợ" — nơi tập trung thợ thủ công và người buôn bán từ các làng nghề về kinh đô lập phường.',
      '<ul><li>"Phường" xưa là tổ chức của những người cùng làm một nghề.</li></ul>',
    ],
      ['Sai — phố phường có từ rất lâu, trước 1945 nhiều.', 'Sai — phố phường có từ trước thời Pháp.', 'Đúng — 36 phố phường có từ thời Lý-Trần, mạnh lên thời Lê-Nguyễn.', 'Sai — đây là khu phố cổ lâu đời, không phải năm 2000.']
    ),
    Q('Tên các phố bắt đầu bằng?', ['Tên các vị vua triều Lý — Trần', 'Tên hoa', 'Tên người', '"Hàng" + sản phẩm bán (Hàng Mã, Hàng Đào…)'], 3, 'Tên phố cổ HN: "Hàng" + sản phẩm chính (Hàng Mã, Hàng Đào, Hàng Đồng, Hàng Bạc…).',
      [
      '<b>Tên phố cổ Hà Nội</b> thường bắt đầu bằng chữ "<code>Hàng</code>" + tên mặt hàng được bán hoặc sản xuất tại phố đó.',
      'Ví dụ: <i>Hàng Đào</i> (vải nhuộm), <i>Hàng Bạc</i> (đồ bạc), <i>Hàng Mã</i> (đồ mã), <i>Hàng Đồng, Hàng Thiếc…</i>',
      '<ul><li>Cách đặt tên phản ánh đặc điểm "mỗi phố một nghề" của Kẻ Chợ xưa.</li></ul>',
    ],
      ['Sai — tên phố theo mặt hàng, không phải tên vua.', 'Sai — tên phố không đặt theo tên hoa.', 'Sai — tên phố không đặt theo tên người.', 'Đúng — tên phố là "Hàng" + sản phẩm bán như Hàng Mã, Hàng Đào.']
    ),
    Q('Phố Hàng Đào nổi tiếng về?', ['Bán hoa đào', 'Vải, lụa, áo (đào = đỏ, màu của vải nhuộm)', 'Tên người', 'Đào quả'], 1, 'Hàng Đào: phố bán vải nhuộm đỏ (đào). Trung tâm thương mại lụa-vải xưa.',
      [
      '<b>Phố Hàng Đào</b> xưa nổi tiếng buôn bán <i>tơ lụa, vải vóc, áo quần</i>. Chữ "<code>đào</code>" chỉ <b>màu đỏ</b> của vải nhuộm điều.',
      'Đây từng là trung tâm buôn bán lụa, vải sầm uất bậc nhất Kẻ Chợ.',
      '<ul><li>"Hàng Đào" không liên quan đến hoa đào hay quả đào.</li></ul>',
    ],
      ['Sai — "đào" ở đây chỉ màu đỏ của vải, không phải hoa đào.', 'Đúng — Hàng Đào bán vải, lụa, áo; "đào" là màu đỏ của vải nhuộm.', 'Sai — tên phố theo mặt hàng vải, không theo tên người.', 'Sai — phố không bán đào quả mà bán vải nhuộm.']
    ),
    Q('Phố Hàng Bạc nổi tiếng về?', ['Nghề kim hoàn, đúc bạc', 'Ngân hàng', 'Bán bạc', 'Trang sức nhập'], 0, 'Hàng Bạc: nghề kim hoàn truyền thống, đúc bạc, làm trang sức.',
      [
      '<b>Phố Hàng Bạc</b> nổi tiếng với <i>nghề kim hoàn</i>: đúc bạc, chế tác đồ trang sức.',
      'Nghề này do thợ từ các làng nghề (Châu Khê, Định Công, Đồng Xâm) về lập phường ở Thăng Long.',
      '<ul><li>Hàng Bạc là một trong những phố nghề lâu đời và tinh xảo nhất phố cổ.</li></ul>',
    ],
      ['Đúng — Hàng Bạc nổi tiếng nghề kim hoàn, đúc bạc, làm trang sức.', 'Sai — phố gắn với nghề kim hoàn, không phải ngân hàng.', 'Sai — phố làm nghề kim hoàn chứ không chỉ bán bạc.', 'Sai — đây là nghề thủ công truyền thống, không phải trang sức nhập.']
    ),
    Q('Phố cổ HN có đặc trưng kiến trúc?', ['Nhà cao tầng', 'Nhà sàn gỗ một tầng kiểu dân tộc', 'Nhà ống dài, có sân trong, cao 2-3 tầng', 'Biệt thự lớn'], 2, 'Nhà phố cổ: dạng "ống" dài hẹp (do thuế tính theo mặt tiền), 2-3 tầng, có sân trong.',
      [
      '<b>Nhà phố cổ Hà Nội</b> có kiểu kiến trúc đặc trưng là <i>"nhà ống"</i>: bề ngang hẹp, chiều sâu dài, thường cao 2–3 tầng, có <b>sân trong</b> để lấy ánh sáng và thông gió.',
      'Hình dáng "nhà ống" hình thành do <i>thuế đất thời xưa tính theo bề rộng mặt tiền</i>, nên nhà làm hẹp ngang, kéo dài về sau.',
      '<ul><li>Tầng dưới thường để buôn bán, tầng trên để ở.</li></ul>',
    ],
      ['Sai — nhà phố cổ thường chỉ 2-3 tầng, không cao tầng.', 'Sai — phố cổ là nhà ống gạch, không phải nhà sàn.', 'Đúng — nhà phố cổ dạng ống dài hẹp, có sân trong, cao 2-3 tầng.', 'Sai — biệt thự lớn là kiểu khu phố Pháp, không phải phố cổ.']
    ),
  ]),

  M(12, 'Văn hoá Hà Nội — Thạch Lam và "Hà Nội 36 phố phường"', [
    Q('Thạch Lam (1910–1942) là?', ['Chính trị gia', 'Họa sĩ', 'Nhà văn nhóm Tự Lực Văn Đoàn', 'Nhạc sĩ'], 2, 'Thạch Lam: nhà văn, em ruột Nhất Linh và Hoàng Đạo, nhóm Tự Lực Văn Đoàn.',
      [
      '<b>Thạch Lam (1910–1942)</b> là <i>nhà văn</i> thuộc nhóm <code>Tự Lực Văn Đoàn</code>, em ruột của hai nhà văn Nhất Linh và Hoàng Đạo.',
      'Ông nổi tiếng với truyện ngắn và tuỳ bút giàu chất thơ, viết về những con người nhỏ bé và vẻ đẹp đời thường.',
      '<ul><li>Tự Lực Văn Đoàn là tổ chức văn học có ảnh hưởng lớn ở Việt Nam những năm 1930.</li></ul>',
    ],
      ['Sai — Thạch Lam là nhà văn, không phải chính trị gia.', 'Sai — ông là nhà văn, không phải họa sĩ.', 'Đúng — Thạch Lam là nhà văn thuộc nhóm Tự Lực Văn Đoàn.', 'Sai — ông viết văn, không phải nhạc sĩ.']
    ),
    Q('"Hà Nội 36 phố phường" của Thạch Lam?', ['Tiểu thuyết tình yêu', 'Tập ký sự về phố cổ, ẩm thực, văn hoá HN', 'Tập thơ', 'Hồi ký chiến tranh'], 1, '"Hà Nội 36 phố phường" (1943) — tập ký sự nổi tiếng về phố cổ, ẩm thực, văn hoá HN.',
      [
      '<b>"Hà Nội băm sáu phố phường"</b> (1943) của Thạch Lam là một <i>tập kí (tuỳ bút)</i> viết về <b>phố cổ, ẩm thực và nếp sống văn hoá Hà Nội</b>.',
      'Tác phẩm ghi lại tinh tế những món quà Hà Nội, những thức ăn dân dã và nét thanh lịch của người Tràng An.',
      '<ul><li>Đây là tư liệu quý về văn hoá ẩm thực Hà Nội nửa đầu thế kỉ XX.</li></ul>',
    ],
      ['Sai — đây là tập ký sự, không phải tiểu thuyết tình yêu.', 'Đúng — đây là tập ký sự về phố cổ, ẩm thực, văn hoá HN.', 'Sai — đây là văn xuôi ký sự, không phải thơ.', 'Sai — tác phẩm viết về phố phường HN, không phải hồi ký chiến tranh.']
    ),
    Q('Phong cách văn Thạch Lam?', ['Nhẹ nhàng, tinh tế, đầy cảm xúc', 'Mạnh mẽ', 'Khô khan', 'Hung hãn'], 0, 'Thạch Lam: văn nhẹ nhàng, tinh tế, lãng mạn, đầy cảm xúc về HN xưa.',
      [
      '<b>Phong cách văn Thạch Lam</b>: <i>nhẹ nhàng, tinh tế, đầy cảm xúc</i>, giàu chất thơ và lòng trắc ẩn.',
      'Văn ông thường ít cốt truyện, đi sâu vào cảm giác, tâm trạng và vẻ đẹp bình dị của cuộc sống.',
      '<ul><li>Truyện ngắn tiêu biểu: "Hai đứa trẻ", "Gió lạnh đầu mùa", "Dưới bóng hoàng lan".</li></ul>',
    ],
      ['Đúng — văn Thạch Lam nhẹ nhàng, tinh tế, đầy cảm xúc.', 'Sai — văn ông êm dịu, không mạnh mẽ gân guốc.', 'Sai — văn ông giàu cảm xúc, không khô khan.', 'Sai — văn ông nhẹ nhàng, hoàn toàn không hung hãn.']
    ),
    Q('Đặc sản HN qua bút Thạch Lam?', ['Bánh đậu xanh', 'Phở, bún chả, cốm Vòng, chả cá Lã Vọng, kem que', 'Hủ tiếu', 'Bún bò Huế'], 1, 'Thạch Lam viết về phở, bún chả, cốm Vòng, chả cá Lã Vọng… đặc sản HN.',
      [
      'Qua ngòi bút Thạch Lam, các <b>đặc sản Hà Nội</b> hiện lên sống động: <i>phở, bún chả, cốm Vòng, chả cá Lã Vọng…</i>',
      'Ông không chỉ tả món ăn mà còn tả cả cách thưởng thức tinh tế, gắn với nếp sống thanh lịch của người Hà Nội.',
      '<ul><li>Mỗi món ăn là một nét văn hoá, một phần hồn cốt của đất kinh kì.</li></ul>',
    ],
      ['Sai — bánh đậu xanh là đặc sản Hải Dương.', 'Đúng — ông viết về phở, bún chả, cốm Vòng, chả cá Lã Vọng — đặc sản HN.', 'Sai — hủ tiếu là món miền Nam.', 'Sai — bún bò Huế là đặc sản xứ Huế.']
    ),
    Q('Ý nghĩa tác phẩm?', ['Lưu giữ ký ức văn hoá HN xưa, gợi tình yêu HN', 'Chỉ là sách hướng dẫn du lịch HN', 'Phản ánh sai lệch đời sống thị dân HN', 'Sai lịch sử'], 0, '"36 phố phường" là tài liệu vô giá lưu ký ức văn hoá HN cuối thời Pháp.',
      [
      '<b>Ý nghĩa</b>: "Hà Nội băm sáu phố phường" <i>lưu giữ kí ức văn hoá Hà Nội xưa</i>, khơi gợi tình yêu và niềm tự hào về Thủ đô.',
      'Tác phẩm là cầu nối để người đọc hôm nay hình dung về một Hà Nội thanh lịch, tinh tế của quá khứ.',
      '<ul><li>Giá trị: vừa là văn học, vừa là tư liệu văn hoá – lịch sử.</li></ul>',
    ],
      ['Đúng — tác phẩm lưu giữ ký ức văn hoá HN xưa, gợi tình yêu HN.', 'Sai — đây là tác phẩm văn học giá trị, không phải sách du lịch.', 'Sai — tác phẩm phản ánh chân thực, không sai lệch.', 'Sai — tác phẩm có giá trị tư liệu, không sai lịch sử.']
    ),
  ]),

  M(13, 'Văn hoá Hà Nội — Nguyễn Tuân và "Vang bóng một thời"', [
    Q('Nguyễn Tuân (1910–1987) là?', ['Chính trị gia', 'Họa sĩ', 'Nhà văn, nhà tuỳ bút bậc thầy VN', 'Nhạc sĩ'], 2, 'Nguyễn Tuân: nhà văn lừng danh, bậc thầy tuỳ bút (essay) của VN.',
      [
      '<b>Nguyễn Tuân (1910–1987)</b> là <i>nhà văn lớn</i>, được coi là <b>bậc thầy tuỳ bút</b> của văn học Việt Nam hiện đại.',
      'Ông sinh ra ở Hà Nội, có phong cách tài hoa, uyên bác và cá tính độc đáo.',
      '<ul><li>Năm 1996, ông được truy tặng Giải thưởng Hồ Chí Minh về văn học nghệ thuật.</li></ul>',
    ],
      ['Sai — ông là nhà văn, không phải chính trị gia.', 'Sai — ông viết văn, không phải họa sĩ.', 'Đúng — Nguyễn Tuân là nhà văn, bậc thầy tuỳ bút của VN.', 'Sai — ông là nhà văn, không phải nhạc sĩ.']
    ),
    Q('"Vang bóng một thời" (1940) là?', ['Tiểu thuyết', 'Tập truyện ngắn về thú chơi tao nhã của trí thức xưa', 'Hồi ký', 'Tập thơ trữ tình về Hà Nội'], 1, '"Vang bóng một thời" — tập truyện ngắn ca ngợi thú chơi tao nhã (uống trà, ngâm thơ, chơi cây…) của các nhà nho.',
      [
      '<b>"Vang bóng một thời"</b> (1940) là <i>tập truyện ngắn</i> ca ngợi những <b>thú chơi tao nhã của lớp nhà nho xưa</b>: uống trà, thả thơ, thưởng hoa, chơi chữ…',
      'Tác phẩm thể hiện nỗi tiếc nuối vẻ đẹp văn hoá của một thời đã qua.',
      '<ul><li>"Vang bóng một thời" được xem là một đỉnh cao của văn xuôi Việt Nam trước Cách mạng.</li></ul>',
    ],
      ['Sai — đây là tập truyện ngắn, không phải tiểu thuyết.', 'Đúng — đây là tập truyện ngắn về thú chơi tao nhã của trí thức xưa.', 'Sai — đây không phải hồi ký.', 'Sai — đây là văn xuôi truyện ngắn, không phải thơ.']
    ),
    Q('Phong cách Nguyễn Tuân?', ['Sao chép', 'Đơn giản', 'Khô khan', 'Tài hoa, độc đáo, ngôn ngữ tinh tế, am tường'], 3, 'Nguyễn Tuân: phong cách tài hoa, độc đáo, ngôn từ tinh tế, am tường nhiều lĩnh vực.',
      [
      '<b>Phong cách Nguyễn Tuân</b>: <i>tài hoa, uyên bác, độc đáo</i>, ngôn ngữ tinh tế, vốn hiểu biết sâu rộng nhiều lĩnh vực.',
      'Ông luôn nhìn sự vật ở góc độ thẩm mĩ, ưa sự cầu kì, khác lạ và đề cao cái đẹp.',
      '<ul><li>Ông được gọi là người "suốt đời đi tìm cái đẹp".</li></ul>',
    ],
      ['Sai — ông rất sáng tạo, không sao chép.', 'Sai — văn ông cầu kỳ, độc đáo, không đơn giản.', 'Sai — văn ông giàu hình ảnh, không khô khan.', 'Đúng — phong cách Nguyễn Tuân tài hoa, độc đáo, ngôn ngữ tinh tế, am tường.']
    ),
    Q('Tác phẩm khác của Nguyễn Tuân?', ['Tắt đèn', 'Người lái đò sông Đà, Sông Đà, Chùa Đàn', 'Chí Phèo', 'Lão Hạc'], 1, '"Người lái đò sông Đà", "Sông Đà", "Chùa Đàn" — các tuỳ bút nổi tiếng của Nguyễn Tuân.',
      [
      '<b>Tác phẩm tiêu biểu khác của Nguyễn Tuân</b>: tuỳ bút "<i>Sông Đà</i>" (có bài "Người lái đò Sông Đà"), "<i>Chùa Đàn</i>"…',
      'Sau Cách mạng, ngòi bút của ông hướng tới ca ngợi con người lao động và vẻ đẹp đất nước.',
      '<ul><li>Phân biệt: "Tắt đèn" là của Ngô Tất Tố; "Chí Phèo", "Lão Hạc" là của Nam Cao.</li></ul>',
    ],
      ['Sai — "Tắt đèn" là của Ngô Tất Tố.', 'Đúng — "Người lái đò sông Đà", "Sông Đà", "Chùa Đàn" là của Nguyễn Tuân.', 'Sai — "Chí Phèo" là của Nam Cao.', 'Sai — "Lão Hạc" là của Nam Cao.']
    ),
    Q('Đóng góp Nguyễn Tuân với HN?', ['Chủ yếu viết về nông thôn, ít liên quan HN', 'Lưu giữ văn hoá tinh thần HN xưa, làm phong phú văn học VN', 'Tiêu cực', 'Không liên quan HN'], 1, 'Nguyễn Tuân lưu giữ tinh hoa văn hoá HN xưa, là cây bút tuỳ bút bậc thầy của VHVN hiện đại.',
      [
      '<b>Đóng góp của Nguyễn Tuân</b>: <i>lưu giữ những giá trị văn hoá tinh thần của Hà Nội xưa</i> và làm phong phú nền văn học Việt Nam hiện đại bằng thể tuỳ bút.',
      'Ông góp phần khẳng định vẻ đẹp thanh lịch, tài hoa của con người đất kinh kì.',
      '<ul><li>Văn Nguyễn Tuân là kho tư liệu về văn hoá, phong tục, ẩm thực và nghệ thuật.</li></ul>',
    ],
      ['Sai — ông viết nhiều về văn hoá HN, không chỉ nông thôn.', 'Đúng — ông lưu giữ văn hoá tinh thần HN xưa, làm phong phú văn học VN.', 'Sai — đóng góp của ông rất tích cực.', 'Sai — ông gắn bó và viết nhiều về HN.']
    ),
  ]),

  M(14, 'Làng nghề truyền thống Hà Nội — Lụa Vạn Phúc', [
    Q('Làng lụa Vạn Phúc thuộc?', ['Quận Ba Đình', 'Đông Anh', 'Quận Hà Đông, HN — có lịch sử >1000 năm', 'Sóc Sơn'], 2, 'Làng lụa Vạn Phúc (Hà Đông, HN) — làng nghề lụa nổi tiếng >1000 năm.',
      [
      '<b>Làng lụa Vạn Phúc</b> thuộc <i>quận Hà Đông, Hà Nội</i>, có lịch sử nghề dệt lụa hơn <code>1000 năm</code>.',
      'Đây là một trong những làng nghề dệt lụa nổi tiếng và lâu đời nhất Việt Nam.',
      '<ul><li>Hà Đông trước đây là một tỉnh, sáp nhập vào Hà Nội năm 2008.</li></ul>',
    ],
      ['Sai — Vạn Phúc ở Hà Đông, không phải Ba Đình.', 'Sai — Đông Anh ở phía bắc, không phải nơi có làng lụa.', 'Đúng — làng lụa Vạn Phúc thuộc Hà Đông, HN, lịch sử hơn 1000 năm.', 'Sai — Sóc Sơn không phải nơi có làng lụa Vạn Phúc.']
    ),
    Q('Đặc sản Vạn Phúc?', ['Lụa Hà Đông (Hà Đông silk)', 'Gốm sứ cao cấp', 'Đồ chạm khắc bạc', 'Bánh tráng'], 0, 'Lụa Hà Đông (Vạn Phúc silk) nổi tiếng trong và ngoài nước.',
      [
      'Đặc sản của làng là <b>lụa Hà Đông (Vạn Phúc)</b> — loại lụa tơ tằm nổi tiếng cả trong và ngoài nước.',
      'Lụa Hà Đông đi vào thơ ca, âm nhạc ("áo lụa Hà Đông") như một biểu tượng của sự mềm mại, thanh lịch.',
      '<ul><li>Phân biệt: gốm là của Bát Tràng, đúc đồng là của Ngũ Xã, lụa là của Vạn Phúc.</li></ul>',
    ],
      ['Đúng — đặc sản Vạn Phúc là lụa Hà Đông nổi tiếng.', 'Sai — gốm sứ là đặc sản của Bát Tràng.', 'Sai — đồ chạm bạc gắn với phố Hàng Bạc, không phải Vạn Phúc.', 'Sai — bánh tráng không phải đặc sản Vạn Phúc.']
    ),
    Q('Quy trình dệt lụa truyền thống?', ['Nuôi tằm → kéo tơ → dệt → nhuộm', 'Nhập tơ', 'Chỉ nhuộm', 'Chỉ dệt'], 0, 'Quy trình hoàn chỉnh: nuôi tằm → quay tơ → dệt vải → nhuộm/in hoa.',
      [
      '<b>Quy trình dệt lụa truyền thống</b> gồm các bước: <i>nuôi tằm → kéo (quay) tơ → dệt vải → nhuộm/in hoa</i>.',
      'Làng tự nuôi tằm lấy tơ, không phụ thuộc nguyên liệu nhập, nên giữ được chất lượng tơ tằm thật.',
      '<ul><li>"Nuôi tằm ăn lá dâu" là khâu đầu tiên quyết định chất lượng sợi tơ.</li></ul>',
    ],
      ['Đúng — quy trình là nuôi tằm, kéo tơ, dệt vải rồi nhuộm.', 'Sai — làng tự nuôi tằm lấy tơ, không nhập tơ.', 'Sai — quy trình gồm nhiều bước, không chỉ nhuộm.', 'Sai — quy trình gồm nhiều bước, không chỉ dệt.']
    ),
    Q('Đặc trưng lụa Vạn Phúc?', ['Dày, thô, ít hoa văn', 'Mềm, mượt, hoa văn truyền thống, bền', 'Không có hoa văn', 'Cứng, dễ phai màu khi giặt'], 1, 'Lụa Vạn Phúc: mềm mượt, hoa văn cổ truyền (hoa, chim, rồng…), bền màu.',
      [
      '<b>Đặc trưng lụa Vạn Phúc</b>: <i>mềm, mượt, nhẹ, bền màu</i>, với <b>hoa văn cổ truyền</b> (hoa, chim, rồng, chữ thọ…) dệt nổi trên nền lụa.',
      'Lụa vân (lụa có hoa văn chìm nổi) là loại lụa quý đặc trưng của làng.',
      '<ul><li>Mặc lụa Vạn Phúc mát về mùa hè, ấm về mùa đông.</li></ul>',
    ],
      ['Sai — lụa Vạn Phúc mềm mượt, không dày thô.', 'Đúng — lụa Vạn Phúc mềm, mượt, hoa văn truyền thống và bền màu.', 'Sai — lụa có hoa văn cổ truyền phong phú.', 'Sai — lụa bền màu, mềm mượt, không cứng hay dễ phai.']
    ),
    Q('Thách thức làng nghề ngày nay?', ['Phát triển mạnh', 'Không có vấn đề', 'Cạnh tranh hàng nhập, mất truyền nghề thế hệ trẻ', 'Dễ dàng'], 2, 'Làng nghề gặp khó: cạnh tranh hàng nhập rẻ, thanh niên không học nghề, chi phí cao.',
      [
      '<b>Thách thức của làng nghề ngày nay</b>: <i>cạnh tranh với hàng dệt công nghiệp, hàng nhập giá rẻ</i>, và nguy cơ <b>thất truyền nghề</b> khi lớp trẻ ít theo nghề.',
      'Ngoài ra còn có nạn lụa giả gắn mác Vạn Phúc làm ảnh hưởng uy tín làng nghề.',
      '<ul><li>Giải pháp: gắn làng nghề với du lịch, xây dựng thương hiệu, bảo hộ chỉ dẫn địa lí.</li></ul>',
    ],
      ['Sai — làng nghề đang gặp nhiều khó khăn, không thuận lợi.', 'Sai — thực tế có nhiều vấn đề cần giải quyết.', 'Đúng — thách thức là cạnh tranh hàng nhập và mất truyền nghề ở giới trẻ.', 'Sai — duy trì nghề không hề dễ dàng.']
    ),
  ]),

  M(15, 'Làng nghề truyền thống — Gốm Bát Tràng', [
    Q('Làng gốm Bát Tràng thuộc?', ['Huyện Gia Lâm, HN — bên sông Hồng', 'Tây Hồ', 'Hoài Đức', 'Long Biên'], 0, 'Làng gốm Bát Tràng ở Gia Lâm, HN — bên sông Hồng.',
      [
      '<b>Làng gốm Bát Tràng</b> thuộc <i>huyện Gia Lâm, Hà Nội</i>, nằm <b>bên bờ sông Hồng</b>.',
      'Vị trí ven sông thuận lợi cho việc lấy đất sét và vận chuyển sản phẩm bằng đường thuỷ.',
      '<ul><li>"Bát Tràng" nghĩa là "cái sân (tràng) chuyên làm bát" — phản ánh nghề gốm của làng.</li></ul>',
    ],
      ['Đúng — Bát Tràng thuộc huyện Gia Lâm, HN, nằm bên sông Hồng.', 'Sai — Tây Hồ là khu hồ lớn, không phải nơi có làng gốm.', 'Sai — Hoài Đức không phải nơi có Bát Tràng.', 'Sai — Long Biên không phải nơi có làng gốm Bát Tràng.']
    ),
    Q('Lịch sử Bát Tràng?', ['Thế kỷ XIX', 'Mới phát triển từ thế kỷ XX', 'Sau 1945', 'Có từ thời Lý (XI), nay đã ~1000 năm'], 3, 'Bát Tràng có truyền thống ~1000 năm, từ thời Lý — Trần.',
      [
      '<b>Làng gốm Bát Tràng</b> có lịch sử <i>khoảng 1000 năm</i>, hình thành từ <code>thời Lý</code> (thế kỉ XI) khi kinh đô dời về Thăng Long.',
      'Trải qua nhiều thế kỉ, Bát Tràng trở thành trung tâm sản xuất gốm sứ nổi tiếng bậc nhất Việt Nam.',
      '<ul><li>Gốm Bát Tràng từng được dùng làm đồ cống, đồ thờ và xuất khẩu.</li></ul>',
    ],
      ['Sai — làng có từ rất lâu, trước thế kỷ XIX nhiều.', 'Sai — Bát Tràng có lịch sử cả nghìn năm, không phải mới đây.', 'Sai — làng có từ thời Lý, không phải sau 1945.', 'Đúng — Bát Tràng có từ thời Lý, nay đã khoảng 1000 năm.']
    ),
    Q('Đặc sản Bát Tràng?', ['Gốm sứ men trắng, xanh lam, hoạ tiết tinh tế', 'Kim loại', 'Lụa tơ tằm dệt thủ công', 'Đồ mộc chạm khắc tinh xảo'], 0, 'Bát Tràng nổi tiếng: gốm sứ men trắng, hoa lam (xanh dương), hoạ tiết tinh tế.',
      [
      '<b>Đặc sản Bát Tràng</b>: <i>gốm sứ men trắng, men lam (xanh)</i>, hoạ tiết tinh tế, đa dạng sản phẩm (bát đĩa, lọ hoa, đồ thờ, đồ trang trí).',
      'Gốm Bát Tràng nổi bật ở chất men và kĩ thuật vẽ tay tỉ mỉ.',
      '<ul><li>Phân biệt: gốm là Bát Tràng, đồng là Ngũ Xã, lụa là Vạn Phúc.</li></ul>',
    ],
      ['Đúng — Bát Tràng nổi tiếng gốm sứ men trắng, xanh lam, hoạ tiết tinh tế.', 'Sai — đúc kim loại là nghề của làng Ngũ Xã.', 'Sai — lụa tơ tằm là đặc sản Vạn Phúc.', 'Sai — đồ mộc chạm khắc không phải nghề gốm Bát Tràng.']
    ),
    Q('Quy trình làm gốm?', ['Mua bán', 'Chỉ nung', 'Lọc đất → tạo hình → tráng men → nung', 'Chỉ tạo hình'], 2, 'Quy trình: lọc đất sét → tạo hình (bàn xoay) → phơi → tráng men → nung (~1300°C).',
      [
      '<b>Quy trình làm gốm</b> gồm: <i>lọc/nhào đất sét → tạo hình (bàn xoay) → phơi → trang trí → tráng men → nung</i> ở nhiệt độ rất cao (khoảng 1200–1300°C).',
      'Khâu nung quyết định độ bền và màu men của sản phẩm.',
      '<ul><li>"Nhất xương, nhì da, thứ ba dạc lò" — kinh nghiệm dân gian về làm gốm.</li></ul>',
    ],
      ['Sai — mua bán không phải khâu làm ra sản phẩm gốm.', 'Sai — quy trình gồm nhiều bước, không chỉ nung.', 'Đúng — quy trình là lọc đất, tạo hình, tráng men rồi nung.', 'Sai — quy trình gồm nhiều bước, không chỉ tạo hình.']
    ),
    Q('Bát Tràng hôm nay?', ['Chỉ làm cổ', 'Chỉ làm hiện đại', 'Bỏ nghề', 'Vừa giữ truyền thống vừa hiện đại hoá, du lịch'], 3, 'Bát Tràng: giữ nghề truyền thống + hiện đại hoá + phát triển du lịch trải nghiệm.',
      [
      '<b>Bát Tràng ngày nay</b> vừa <i>giữ nghề gốm truyền thống</i>, vừa <i>hiện đại hoá sản xuất</i> (lò gas, lò điện) và <b>phát triển du lịch trải nghiệm</b>.',
      'Du khách có thể tự tay nặn gốm, vẽ men — góp phần quảng bá và giữ gìn làng nghề.',
      '<ul><li>Chợ gốm Bát Tràng là điểm tham quan, mua sắm nổi tiếng.</li></ul>',
    ],
      ['Sai — làng vừa làm cổ vừa làm sản phẩm mới.', 'Sai — làng vẫn giữ nghề truyền thống bên cạnh đổi mới.', 'Sai — làng vẫn phát triển nghề, không bỏ.', 'Đúng — Bát Tràng vừa giữ truyền thống, vừa hiện đại hoá và làm du lịch.']
    ),
  ]),

  M(16, 'Làng nghề truyền thống — Đúc đồng Ngũ Xã', [
    Q('Làng Ngũ Xã thuộc?', ['Long Biên', 'Sóc Sơn', 'Phường Trúc Bạch, Ba Đình, HN', 'Hà Đông'], 2, 'Làng Ngũ Xã ở phường Trúc Bạch, Ba Đình, ven hồ Trúc Bạch.',
      [
      '<b>Làng Ngũ Xã</b> nằm ở <i>phường Trúc Bạch, quận Ba Đình, Hà Nội</i>, bên <b>hồ Trúc Bạch</b>.',
      'Đây là làng nghề nằm ngay trong nội thành Hà Nội, khác với các làng nghề ngoại thành.',
      '<ul><li>Tên "Ngũ Xã" do dân của <i>năm làng (xã)</i> chuyên đúc đồng hợp lại lập nên.</li></ul>',
    ],
      ['Sai — Long Biên không phải nơi có làng Ngũ Xã.', 'Sai — Sóc Sơn ở ngoại thành, không phải nơi có làng.', 'Đúng — làng Ngũ Xã ở phường Trúc Bạch, Ba Đình, ven hồ Trúc Bạch.', 'Sai — Hà Đông là nơi có làng lụa, không phải Ngũ Xã.']
    ),
    Q('Nghề truyền thống Ngũ Xã?', ['Gốm sứ men ngọc', 'Đúc đồng (chuông, tượng, đỉnh)', 'Bánh cốm và mứt sen truyền thống', 'Dệt lụa tơ tằm cao cấp'], 1, 'Ngũ Xã chuyên đúc đồng: chuông chùa, tượng Phật, đỉnh thờ…',
      [
      '<b>Nghề truyền thống của Ngũ Xã</b> là <i>đúc đồng</i>: làm chuông, tượng Phật, đỉnh, lư hương, đồ thờ bằng đồng.',
      'Đây là nghề thủ công đòi hỏi kĩ thuật cao về tạo khuôn, nấu đồng và xử lí bề mặt.',
      '<ul><li>Phân biệt: đồng là Ngũ Xã, gốm là Bát Tràng, lụa là Vạn Phúc.</li></ul>',
    ],
      ['Sai — gốm sứ là nghề của Bát Tràng.', 'Đúng — Ngũ Xã chuyên đúc đồng: chuông, tượng, đỉnh.', 'Sai — bánh cốm, mứt sen không phải nghề Ngũ Xã.', 'Sai — dệt lụa là nghề của Vạn Phúc.']
    ),
    Q('Lịch sử Ngũ Xã?', ['Sau 1945', 'Từ thời Lê, ~thế kỷ XVII', 'Thời Pháp', 'Thời Nguyễn, ~thế kỷ XIX'], 1, 'Làng Ngũ Xã có lịch sử ~thế kỷ XVII (thời Lê), do 5 xã hợp lại nên có tên Ngũ Xã.',
      [
      '<b>Làng Ngũ Xã</b> có lịch sử từ <i>thời Lê</i>, khoảng <code>thế kỉ XVII</code>, do thợ đúc đồng từ năm làng quê hợp lại.',
      'Trải qua nhiều đời, làng giữ vững và phát triển nghề đúc đồng nổi tiếng đất Thăng Long.',
      '<ul><li>Nghề đúc đồng gắn với nhu cầu làm đồ thờ cúng, chuông chùa của kinh đô.</li></ul>',
    ],
      ['Sai — làng có từ lâu, trước 1945 nhiều.', 'Đúng — làng có từ thời Lê, khoảng thế kỷ XVII, do 5 xã hợp lại.', 'Sai — làng có trước thời Pháp.', 'Sai — làng có từ thế kỷ XVII (thời Lê), sớm hơn thời Nguyễn.']
    ),
    Q('Tượng đồng nổi tiếng?', ['Tượng Trần Hưng Đạo', 'Tượng A-di-đà chùa Thần Quang (4m, 14 tấn)', 'Tượng Lý Thái Tổ ven Hồ Gươm', 'Tượng Bác Hồ'], 1, 'Tượng Phật A-di-đà chùa Thần Quang (Ngũ Xã) cao 4m, nặng 14 tấn — kiệt tác đúc đồng VN.',
      [
      'Tác phẩm tiêu biểu của làng là <b>tượng Phật A-di-đà chùa Thần Quang (chùa Ngũ Xã)</b> — cao khoảng <code>4 m</code>, nặng khoảng <code>14 tấn</code>.',
      'Đây được coi là một kiệt tác của nghệ thuật đúc đồng Việt Nam.',
      '<ul><li>Pho tượng thể hiện trình độ kĩ thuật và tài hoa của nghệ nhân Ngũ Xã.</li></ul>',
    ],
      ['Sai — tượng Trần Hưng Đạo không phải sản phẩm tiêu biểu của Ngũ Xã.', 'Đúng — tượng A-di-đà chùa Thần Quang (4m, 14 tấn) là kiệt tác của Ngũ Xã.', 'Sai — tượng Lý Thái Tổ ven Hồ Gươm không phải của Ngũ Xã.', 'Sai — đây không phải tác phẩm đặc trưng của làng Ngũ Xã.']
    ),
    Q('Hiện trạng làng nghề?', ['Phát triển mạnh', 'Số thợ ít, cần bảo tồn', 'Hiện đại hoá hoàn toàn', 'Bỏ nghề hoàn toàn'], 1, 'Số nghệ nhân Ngũ Xã ngày càng ít, cần bảo tồn để giữ nghề truyền thống.',
      [
      '<b>Hiện trạng làng nghề Ngũ Xã</b>: <i>số nghệ nhân và thợ ngày càng ít</i>, nghề có nguy cơ mai một, cần được <b>bảo tồn</b>.',
      'Do nằm trong nội thành chật hẹp và đô thị hoá, không gian sản xuất bị thu hẹp.',
      '<ul><li>Bảo tồn làng nghề là giữ gìn di sản văn hoá phi vật thể của Thủ đô.</li></ul>',
    ],
      ['Sai — làng nghề đang thu hẹp, không phát triển mạnh.', 'Đúng — số thợ ngày càng ít, cần bảo tồn để giữ nghề.', 'Sai — làng chưa hiện đại hoá hoàn toàn.', 'Sai — làng vẫn còn nghệ nhân giữ nghề, chưa bỏ hẳn.']
    ),
  ]),

  M(17, 'Nông nghiệp đô thị tại Hà Nội', [
    Q('Nông nghiệp đô thị (urban agriculture) là?', ['Du lịch', 'Nông thôn xa', 'Công nghiệp', 'Trồng cây-rau-hoa trong đô thị'], 3, 'Urban agriculture: trồng cây/rau/hoa trong và quanh đô thị.',
      [
      '<b>Nông nghiệp đô thị (urban agriculture)</b> là việc <i>trồng trọt, chăn nuôi cây – rau – hoa ngay trong và quanh đô thị</i>.',
      'Đây là hướng phát triển phù hợp với những thành phố lớn như Hà Nội, nơi quỹ đất hạn hẹp.',
      '<ul><li>Khác với nông nghiệp truyền thống ở vùng nông thôn rộng lớn.</li></ul>',
    ],
      ['Sai — du lịch không phải nông nghiệp đô thị.', 'Sai — đây là canh tác trong đô thị, không phải nông thôn xa.', 'Sai — đây là trồng trọt, không phải công nghiệp.', 'Đúng — nông nghiệp đô thị là trồng cây, rau, hoa trong đô thị.']
    ),
    Q('HN có làng nghề trồng?', ['Chỉ rau', 'Chỉ trồng cây cảnh trong chậu', 'Hoa Tây Hồ, đào Nhật Tân, quất Tứ Liên', 'Chỉ lúa'], 2, 'HN nổi tiếng: làng hoa Tây Hồ, đào Nhật Tân (Tết), quất cảnh Tứ Liên.',
      [
      '<b>Hà Nội</b> có nhiều vùng chuyên canh hoa, cây cảnh nổi tiếng: <i>làng hoa Tây Hồ, đào Nhật Tân, quất cảnh Tứ Liên</i>.',
      'Các vùng này cung cấp hoa, cây cảnh cho dịp lễ Tết và là nét đặc trưng của nông nghiệp đô thị Thủ đô.',
      '<ul><li>Nhật Tân, Tứ Liên, Quảng Bá đều thuộc quận Tây Hồ.</li></ul>',
    ],
      ['Sai — HN trồng nhiều loại, không chỉ rau.', 'Sai — HN có nhiều vùng trồng hoa, đào, quất, không chỉ cây chậu.', 'Đúng — HN nổi tiếng hoa Tây Hồ, đào Nhật Tân, quất Tứ Liên.', 'Sai — HN có nhiều vùng trồng hoa cảnh, không chỉ lúa.']
    ),
    Q('Lợi ích nông nghiệp đô thị?', ['Lãng phí đất', 'Cung cấp thực phẩm tươi, làm xanh đô thị, du lịch', 'Không hiệu quả kinh tế bằng nhập khẩu', 'Tốn nước'], 1, 'Lợi ích: thực phẩm tươi, xanh đô thị (giảm nhiệt, CO2), du lịch sinh thái.',
      [
      '<b>Lợi ích của nông nghiệp đô thị</b>:',
      '<ul><li>Cung cấp <i>thực phẩm tươi, hoa, cây cảnh</i> tại chỗ.</li><li><b>Làm xanh đô thị</b>, giảm nhiệt, hấp thụ khí CO₂.</li><li>Phát triển <i>du lịch sinh thái, du lịch trải nghiệm</i>.</li></ul>',
      'Đây là hướng phát triển bền vững, gắn kinh tế với môi trường.',
    ],
      ['Sai — đây là dùng đất hiệu quả, không lãng phí.', 'Đúng — lợi ích là thực phẩm tươi, làm xanh đô thị và phát triển du lịch.', 'Sai — nông nghiệp đô thị mang nhiều lợi ích thiết thực.', 'Sai — lợi ích lớn hơn nhiều so với chi phí nước tưới.']
    ),
    Q('Thách thức?', ['Đô thị hoá, mất đất, ô nhiễm', 'Quá nhiều đất', 'Dễ dàng', 'Không thách thức'], 0, 'Thách thức: đô thị hoá lấn đất nông nghiệp, ô nhiễm không khí-đất-nước.',
      [
      '<b>Thách thức của nông nghiệp đô thị Hà Nội</b>: <i>đô thị hoá lấn chiếm đất nông nghiệp</i> và <i>ô nhiễm không khí, đất, nước</i>.',
      'Diện tích đất canh tác ngày càng thu hẹp khi các khu đô thị, hạ tầng mở rộng.',
      '<ul><li>Cần quy hoạch hợp lí để giữ các vùng nông nghiệp đô thị có giá trị.</li></ul>',
    ],
      ['Đúng — thách thức là đô thị hoá lấn đất và ô nhiễm môi trường.', 'Sai — đất nông nghiệp ngày càng ít, không dư thừa.', 'Sai — duy trì nông nghiệp đô thị không hề dễ.', 'Sai — có nhiều thách thức cần giải quyết.']
    ),
    Q('Đào Nhật Tân nổi tiếng vào?', ['Mùa thu, dịp Trung thu', 'Tết Trung thu', 'Tết Nguyên Đán', 'Tết Tây'], 2, 'Đào Nhật Tân (Tây Hồ, HN) nổi tiếng dịp Tết Nguyên Đán — biểu tượng Tết HN.',
      [
      '<b>Đào Nhật Tân</b> (quận Tây Hồ) nổi tiếng nở rộ vào dịp <i>Tết Nguyên Đán</i>, là <b>biểu tượng của Tết Hà Nội</b> nói riêng và miền Bắc nói chung.',
      'Cây đào tượng trưng cho may mắn, sức sống và sự sum vầy ngày xuân.',
      '<ul><li>Phân biệt: hoa đào gắn với Tết Nguyên Đán, không phải Trung thu hay Tết Tây.</li></ul>',
    ],
      ['Sai — đào nở dịp Tết Nguyên Đán, không phải mùa thu.', 'Sai — Trung thu là rằm tháng tám, không phải mùa đào.', 'Đúng — đào Nhật Tân nổi tiếng dịp Tết Nguyên Đán, biểu tượng Tết HN.', 'Sai — đào gắn với Tết Nguyên Đán của VN, không phải Tết Tây.']
    ),
  ]),

  M(18, 'Ôn tập HK1', [
    Q('Pháp đánh HN lần 1?', ['1885', '1882', '1873 (Garnier)', '1858'], 2, 'Garnier.',
      [
      '<b>Ôn tập:</b> Pháp đánh Hà Nội <i>lần thứ nhất năm 1873</i>, do <code>Francis Garnier</code> chỉ huy.',
      'Tổng đốc bảo vệ thành khi đó là <b>Nguyễn Tri Phương</b>, người đã tuyệt thực mà mất để giữ khí tiết.',
      '<ul><li>Mốc cần nhớ: 1858 (Đà Nẵng) – 1873 (HN lần 1) – 1882 (HN lần 2).</li></ul>',
    ],
      ['Sai — 1885 là năm Cần Vương bùng nổ.', 'Sai — 1882 là lần Pháp đánh HN lần 2.', 'Đúng — Pháp đánh HN lần 1 năm 1873 do Garnier chỉ huy.', 'Sai — 1858 Pháp nổ súng ở Đà Nẵng.']
    ),
    Q('Tổng đốc HN khi mất 1882?', ['Tôn Thất Thuyết', 'Phan Đình Phùng', 'Hoàng Diệu', 'Nguyễn Tri Phương'], 2, 'Hoàng Diệu tuẫn tiết.',
      [
      '<b>Ôn tập:</b> khi Pháp đánh Hà Nội <i>lần thứ hai năm 1882</i>, Tổng đốc <code>Hoàng Diệu</code> đã chỉ huy giữ thành rồi <b>tuẫn tiết</b> khi thành thất thủ.',
      'Cùng với Nguyễn Tri Phương (1873), Hoàng Diệu (1882) là tấm gương trung liệt của Hà Nội.',
      '<ul><li>Ghi nhớ cặp: 1873 – Nguyễn Tri Phương; 1882 – Hoàng Diệu.</li></ul>',
    ],
      ['Sai — Tôn Thất Thuyết hoạt động ở Huế.', 'Sai — Phan Đình Phùng lãnh đạo khởi nghĩa Hương Khê.', 'Đúng — Hoàng Diệu là Tổng đốc HN, tuẫn tiết năm 1882.', 'Sai — Nguyễn Tri Phương gắn với lần 1 (1873).']
    ),
    Q('Cầu Long Biên xây?', ['1900', '1882', '1898-1902', '1945'], 2, 'Pont Doumer.',
      [
      '<b>Ôn tập:</b> <i>cầu Long Biên</i> (tên gốc Pont Doumer) được xây trong các năm <code>1898–1902</code>.',
      'Cầu do hãng Daydé & Pillé (Pháp) thiết kế, là cây cầu thép lớn bắc qua sông Hồng.',
      '<ul><li>Cầu là biểu tượng kiến trúc và chứng nhân lịch sử của Hà Nội.</li></ul>',
    ],
      ['Sai — cầu khởi công từ 1898, hoàn thành 1902.', 'Sai — 1882 là lần Pháp đánh HN lần 2.', 'Đúng — cầu Long Biên (Pont Doumer) xây 1898-1902.', 'Sai — 1945 là năm Cách mạng tháng Tám.']
    ),
    Q('Thạch Lam viết tác phẩm?', ['Hà Nội 36 phố phường', 'Vang bóng một thời', 'Thương nhớ mười hai', 'Tắt đèn'], 0, 'Ký sự HN.',
      [
      '<b>Ôn tập:</b> nhà văn <i>Thạch Lam</i> nổi tiếng với tập kí <b>"Hà Nội băm sáu phố phường"</b> viết về phố cổ và ẩm thực Hà Nội.',
      'Phân biệt với các tác giả khác: "Vang bóng một thời" – Nguyễn Tuân; "Tắt đèn" – Ngô Tất Tố.',
      '<ul><li>Thạch Lam thuộc nhóm Tự Lực Văn Đoàn.</li></ul>',
    ],
      ['Đúng — "Hà Nội 36 phố phường" là ký sự của Thạch Lam.', 'Sai — "Vang bóng một thời" là của Nguyễn Tuân.', 'Sai — "Thương nhớ mười hai" là của Vũ Bằng.', 'Sai — "Tắt đèn" là của Ngô Tất Tố.']
    ),
    Q('Làng lụa nổi tiếng HN?', ['Vạn Phúc', 'Bát Tràng', 'Ngũ Xã', 'Nhật Tân'], 0, 'Hà Đông.',
      [
      '<b>Ôn tập làng nghề:</b> làng lụa nổi tiếng của Hà Nội là <code>Vạn Phúc</code> (Hà Đông).',
      'Phân biệt ba làng nghề: <i>Vạn Phúc (lụa) – Bát Tràng (gốm) – Ngũ Xã (đúc đồng)</i>; còn Nhật Tân nổi tiếng trồng đào.',
      '<ul><li>Mỗi làng một nghề là nét đặc trưng của vùng đất Thăng Long – Hà Nội.</li></ul>',
    ],
      ['Đúng — Vạn Phúc (Hà Đông) là làng lụa nổi tiếng của HN.', 'Sai — Bát Tràng là làng gốm.', 'Sai — Ngũ Xã là làng đúc đồng.', 'Sai — Nhật Tân nổi tiếng trồng đào, không phải lụa.']
    ),
  ]),

  // ──────────────── HK2 ────────────────
  M(19, 'Phong trào Cần Vương tại Hà Nội và Bắc Bộ', [
    Q('Phong trào Cần Vương (1885-1896) do?', ['Tôn Thất Thuyết và vua Hàm Nghi khởi xướng', 'Phan Bội Châu', 'Hồ Chí Minh', 'Nguyễn Tri Phương'], 0, 'Cần Vương: Tôn Thất Thuyết soạn chiếu, vua Hàm Nghi ban (13/7/1885).',
      [
      '<b>Phong trào Cần Vương (1885–1896)</b> khởi xướng bởi <code>Tôn Thất Thuyết</code> (nhân danh vua) và <code>vua Hàm Nghi</code>.',
      'Sau cuộc phản công ở kinh thành Huế thất bại, Tôn Thất Thuyết đưa vua Hàm Nghi ra sơn phòng và lấy danh nghĩa vua ban <b>chiếu Cần Vương</b> ngày 13/7/1885.',
      '<ul><li>Phong trào kêu gọi văn thân, sĩ phu và nhân dân giúp vua đánh Pháp.</li></ul>',
    ],
      ['Đúng — Tôn Thất Thuyết soạn chiếu, vua Hàm Nghi ban để khởi xướng Cần Vương.', 'Sai — Phan Bội Châu hoạt động sau này với phong trào Đông Du.', 'Sai — HCM ra đi tìm đường cứu nước năm 1911.', 'Sai — Nguyễn Tri Phương mất năm 1873, trước Cần Vương.']
    ),
    Q('Ý nghĩa "Cần Vương"?', ['Trung lập', 'Phò vua, cứu nước', 'Phế vua', 'Theo Pháp'], 1, 'Cần Vương = "phò vua cứu nước" — kêu gọi toàn dân chống Pháp giành lại độc lập.',
      [
      '"<b>Cần Vương</b>" nghĩa là <i>"phò vua, giúp vua cứu nước"</i>.',
      'Khẩu hiệu này kêu gọi toàn dân đứng lên dưới ngọn cờ của vua để đánh đuổi thực dân Pháp, giành lại độc lập.',
      '<ul><li>Đây là phong trào yêu nước theo <b>ý thức hệ phong kiến</b> (trung quân – ái quốc).</li></ul>',
    ],
      ['Sai — Cần Vương là chống Pháp tích cực, không trung lập.', 'Đúng — Cần Vương nghĩa là "phò vua, cứu nước".', 'Sai — Cần Vương là phò vua, không phải phế vua.', 'Sai — Cần Vương chống Pháp, không theo Pháp.']
    ),
    Q('Phạm vi phong trào?', ['Chỉ Nam Bộ', 'Toàn quốc, nhất là Trung-Bắc Bộ', 'Chỉ HN', 'Chỉ Huế'], 1, 'Cần Vương lan rộng toàn quốc nhưng mạnh nhất ở Trung-Bắc Bộ.',
      [
      '<b>Phạm vi phong trào Cần Vương</b> lan rộng <i>khắp cả nước</i>, nhưng <b>mạnh nhất ở Trung Kì và Bắc Kì</b>.',
      'Ở Nam Kì, do đã bị Pháp chiếm từ trước, phong trào không phát triển mạnh.',
      '<ul><li>Các trung tâm khởi nghĩa lớn đều ở Bắc và Trung Bộ.</li></ul>',
    ],
      ['Sai — phong trào không chỉ ở Nam Bộ.', 'Đúng — phong trào lan toàn quốc, mạnh nhất ở Trung-Bắc Bộ.', 'Sai — phong trào lan rộng nhiều nơi, không chỉ HN.', 'Sai — phong trào không bó hẹp ở Huế.']
    ),
    Q('Khởi nghĩa Cần Vương lớn nhất Bắc Bộ?', ['Yên Thế', 'Đông Du', 'Bãi Sậy (Hưng Yên), Ba Đình (Thanh Hoá)', 'Khởi nghĩa Phan Bội Châu'], 2, 'Bắc Bộ: Bãi Sậy (Nguyễn Thiện Thuật, 1883-1892), Ba Đình (Đinh Công Tráng, 1886-1887).',
      [
      '<b>Các cuộc khởi nghĩa Cần Vương lớn ở Bắc Bộ</b>: <i>khởi nghĩa Bãi Sậy</i> (Nguyễn Thiện Thuật, Hưng Yên) và <i>khởi nghĩa Ba Đình</i> (Đinh Công Tráng, Thanh Hoá).',
      'Ở Trung Bộ có khởi nghĩa Hương Khê (Phan Đình Phùng) — tiêu biểu nhất.',
      '<ul><li>Phân biệt: Yên Thế (Đề Thám) là khởi nghĩa nông dân tự phát, không thuộc Cần Vương.</li></ul>',
    ],
      ['Sai — Yên Thế là khởi nghĩa nông dân tự phát, không thuộc Cần Vương.', 'Sai — Đông Du là phong trào yêu nước khác, không phải khởi nghĩa.', 'Đúng — Bãi Sậy và Ba Đình là các khởi nghĩa Cần Vương lớn ở Bắc Bộ.', 'Sai — Phan Bội Châu không lãnh đạo khởi nghĩa Cần Vương.']
    ),
    Q('Phong trào Cần Vương kết thúc?', ['1885', '1945', '1900', '1896, khi Phan Đình Phùng mất'], 3, 'Cần Vương kết thúc ~1896 khi khởi nghĩa Hương Khê (Phan Đình Phùng) bị dập tắt.',
      [
      '<b>Phong trào Cần Vương kết thúc khoảng năm <code>1896</code></b>, khi cuộc khởi nghĩa Hương Khê của <i>Phan Đình Phùng</i> bị dập tắt.',
      'Sự thất bại đánh dấu sự chấm dứt của con đường cứu nước theo ý thức hệ phong kiến.',
      '<ul><li>Mốc phong trào: 1885 (bùng nổ) – 1896 (kết thúc).</li></ul>',
    ],
      ['Sai — 1885 là năm phong trào bắt đầu.', 'Sai — 1945 là năm Cách mạng tháng Tám.', 'Sai — phong trào kết thúc khoảng 1896, không phải 1900.', 'Đúng — phong trào kết thúc khoảng 1896 khi Phan Đình Phùng mất.']
    ),
  ]),

  M(20, 'Khởi nghĩa Yên Thế (1884-1913) — Đề Thám', [
    Q('Khởi nghĩa Yên Thế (Bắc Giang) do?', ['Hoàng Hoa Thám (Đề Thám)', 'Phan Đình Phùng', 'Nguyễn Tri Phương', 'Tôn Thất Thuyết'], 0, 'Hoàng Hoa Thám (Đề Thám) — "hùm thiêng Yên Thế" — lãnh đạo khởi nghĩa.',
      [
      '<b>Khởi nghĩa Yên Thế (Bắc Giang)</b> do <code>Hoàng Hoa Thám (Đề Thám)</code> — được gọi là "<i>Hùm thiêng Yên Thế</i>" — lãnh đạo.',
      'Đây là cuộc khởi nghĩa nông dân chống Pháp lớn nhất và kéo dài nhất ở Bắc Kì.',
      '<ul><li>Phân biệt: Phan Đình Phùng (Hương Khê), Đề Thám (Yên Thế).</li></ul>',
    ],
      ['Đúng — Hoàng Hoa Thám (Đề Thám) lãnh đạo khởi nghĩa Yên Thế.', 'Sai — Phan Đình Phùng lãnh đạo khởi nghĩa Hương Khê.', 'Sai — Nguyễn Tri Phương mất năm 1873.', 'Sai — Tôn Thất Thuyết gắn với phong trào Cần Vương.']
    ),
    Q('Thời gian khởi nghĩa?', ['1884-1913 (29 năm — dài nhất chống Pháp)', '50 năm', '5 năm', '10 năm'], 0, '29 năm là cuộc kháng chiến chống Pháp dài nhất trong lịch sử cận đại VN.',
      [
      '<b>Khởi nghĩa Yên Thế kéo dài từ <code>1884 đến 1913</code></b> — khoảng <b>29 năm</b>, là cuộc kháng chiến chống Pháp dài nhất trong lịch sử cận đại Việt Nam.',
      'Nghĩa quân dựa vào địa hình rừng núi Yên Thế để chiến đấu lâu dài.',
      '<ul><li>Có những giai đoạn Đề Thám tạm hoà hoãn với Pháp để củng cố lực lượng.</li></ul>',
    ],
      ['Đúng — khởi nghĩa kéo dài 1884-1913, khoảng 29 năm, dài nhất chống Pháp.', 'Sai — khởi nghĩa kéo dài 29 năm, không tới 50 năm.', 'Sai — khởi nghĩa kéo dài nhiều hơn 5 năm.', 'Sai — khởi nghĩa kéo dài tới 29 năm, không phải 10 năm.']
    ),
    Q('Đề Thám có quan hệ với HN?', ['Không liên quan', 'Đánh HN', 'Từng kéo quân về đóng tại nội thành HN', 'Liên kết với vụ Hà thành đầu độc (1908)'], 3, 'Đề Thám liên kết với vụ Hà thành đầu độc 1908 — kế hoạch phối hợp khởi nghĩa.',
      [
      '<b>Đề Thám có liên hệ với Hà Nội</b>: ông từng <i>liên kết với những người tổ chức vụ Hà thành đầu độc năm 1908</i>, dự định phối hợp đánh Pháp ngay trong thành.',
      'Điều này cho thấy phong trào Yên Thế không tách rời mà gắn với phong trào yêu nước chung.',
      '<ul><li>Sau vụ 1908 thất bại, Pháp tăng cường đàn áp nghĩa quân Yên Thế.</li></ul>',
    ],
      ['Sai — Đề Thám có liên kết với phong trào ở HN.', 'Sai — Đề Thám không trực tiếp đánh HN.', 'Sai — Đề Thám hoạt động ở Yên Thế, không đóng quân nội thành HN.', 'Đúng — Đề Thám liên kết với vụ Hà thành đầu độc năm 1908.']
    ),
    Q('Tính chất khởi nghĩa Yên Thế?', ['Quân chính quy', 'Khởi nghĩa nông dân tự phát, sau liên kết Cần Vương', 'Tôn giáo', 'Phong kiến'], 1, 'Khởi nghĩa nông dân tự phát từ Yên Thế (Bắc Giang), sau liên kết phong trào yêu nước.',
      [
      '<b>Tính chất khởi nghĩa Yên Thế</b>: là cuộc <i>khởi nghĩa nông dân tự phát</i>, xuất phát từ nhu cầu bảo vệ ruộng đất, cuộc sống, sau đó <b>liên kết với phong trào yêu nước</b> chung.',
      'Đây không phải phong trào do triều đình hay sĩ phu lãnh đạo (khác với Cần Vương).',
      '<ul><li>Lực lượng chủ yếu là nông dân vùng Yên Thế.</li></ul>',
    ],
      ['Sai — đây là khởi nghĩa nông dân, không phải quân chính quy.', 'Đúng — là khởi nghĩa nông dân tự phát, sau liên kết phong trào yêu nước.', 'Sai — đây không phải phong trào tôn giáo.', 'Sai — đây là khởi nghĩa nông dân, không mang tính phong kiến.']
    ),
    Q('Đề Thám hy sinh?', ['1913, do bị phản bội', '1908', '1900', '1885'], 0, 'Đề Thám bị phản bội và sát hại năm 1913, kết thúc khởi nghĩa Yên Thế.',
      [
      '<b>Đề Thám hi sinh năm <code>1913</code></b> do bị tay sai phản bội, sát hại — đánh dấu sự kết thúc của khởi nghĩa Yên Thế.',
      'Cuộc khởi nghĩa thất bại nhưng để lại tấm gương bền bỉ, kiên cường của nông dân Việt Nam.',
      '<ul><li>Yên Thế khép lại một thời kì đấu tranh vũ trang tự phát, trước khi xuất hiện con đường cứu nước mới.</li></ul>',
    ],
      ['Đúng — Đề Thám bị phản bội và sát hại năm 1913.', 'Sai — 1908 là năm vụ Hà thành đầu độc, ông còn sống.', 'Sai — ông hy sinh năm 1913, không phải 1900.', 'Sai — 1885 là năm Cần Vương bùng nổ.']
    ),
  ]),

  M(21, 'Chính sách khai thác thuộc địa Pháp tại HN (1897-1914)', [
    Q('Pháp khai thác thuộc địa lần 1?', ['1897-1914', '1945-1954', '1882-1885', '1858-1873'], 0, 'Khai thác thuộc địa lần 1: 1897-1914 (toàn quyền Paul Doumer khởi xướng).',
      [
      '<b>Cuộc khai thác thuộc địa lần thứ nhất của Pháp diễn ra <code>1897–1914</code></b>, do Toàn quyền <i>Paul Doumer</i> khởi xướng.',
      'Đây là giai đoạn Pháp ổn định bộ máy cai trị và bắt đầu vơ vét tài nguyên thuộc địa quy mô lớn.',
      '<ul><li>Khai thác lần 2 diễn ra sau Chiến tranh thế giới thứ nhất (1919–1929).</li></ul>',
    ],
      ['Đúng — khai thác thuộc địa lần 1 diễn ra 1897-1914.', 'Sai — 1945-1954 là thời kỳ kháng chiến chống Pháp.', 'Sai — 1882-1885 là giai đoạn Pháp đánh chiếm Bắc Kì.', 'Sai — 1858-1873 là giai đoạn đầu Pháp xâm lược.']
    ),
    Q('Mục đích khai thác thuộc địa?', ['Phát triển VN', 'Trung lập', 'Bóc lột tài nguyên, thị trường, nhân công cho Pháp', 'Hỗ trợ VN'], 2, 'Mục đích duy nhất: bóc lột tài nguyên, biến VN thành thị trường và nguồn nhân công cho Pháp.',
      [
      '<b>Mục đích khai thác thuộc địa</b>: <i>bóc lột tài nguyên, biến Việt Nam thành thị trường tiêu thụ và nguồn nhân công, nguyên liệu rẻ cho Pháp</i>.',
      'Pháp không nhằm phát triển Việt Nam mà phục vụ lợi ích của chính quốc.',
      '<ul><li>Đây là bản chất bóc lột của chế độ thực dân.</li></ul>',
    ],
      ['Sai — Pháp khai thác để bóc lột, không vì phát triển VN.', 'Sai — đây là chính sách bóc lột, không trung lập.', 'Đúng — mục đích là bóc lột tài nguyên, thị trường và nhân công cho Pháp.', 'Sai — Pháp không nhằm hỗ trợ VN.']
    ),
    Q('Tại HN, Pháp đầu tư?', ['Xí nghiệp lớn', 'Bệnh viện đẳng cấp', 'Hạ tầng giao thông (đường, cầu, xe lửa), điện, nước', 'Trường đại học'], 2, 'Pháp đầu tư hạ tầng (cầu, đường, xe lửa, điện) để phục vụ khai thác — không phải phát triển VN.',
      [
      'Tại Hà Nội, Pháp <b>đầu tư hạ tầng giao thông</b> (đường bộ, cầu, đường sắt), <i>điện, nước máy</i> — nhưng chủ yếu để <b>phục vụ khai thác và cai trị</b>, không phải để phát triển dân sinh.',
      'Hà Nội trở thành đầu mối giao thông và hành chính của Đông Dương.',
      '<ul><li>Hệ thống đường sắt (ga Hàng Cỏ), cầu Long Biên là sản phẩm của giai đoạn này.</li></ul>',
    ],
      ['Sai — Pháp không cho VN phát triển công nghiệp nặng.', 'Sai — Pháp ít đầu tư cho phúc lợi như bệnh viện.', 'Đúng — Pháp đầu tư hạ tầng giao thông, điện, nước để phục vụ khai thác.', 'Sai — Pháp hạn chế đầu tư giáo dục đại học cho VN.']
    ),
    Q('Công nghiệp Pháp tại HN?', ['Đóng tàu', 'Cơ khí nặng', 'Vũ khí', 'Chế biến (rượu, thuốc lá, dệt)'], 3, 'Pháp tập trung công nghiệp nhẹ chế biến — không cho VN làm công nghiệp nặng.',
      [
      '<b>Công nghiệp Pháp ở Hà Nội</b> chủ yếu là <i>công nghiệp nhẹ – chế biến</i>: nhà máy <b>rượu, thuốc lá, dệt, diêm, da</b>…',
      'Pháp <i>không cho Việt Nam phát triển công nghiệp nặng</i> (cơ khí, luyện kim) để giữ thuộc địa lệ thuộc.',
      '<ul><li>Mục tiêu là khai thác lợi nhuận, không phải công nghiệp hoá Việt Nam.</li></ul>',
    ],
      ['Sai — Pháp không phát triển đóng tàu ở HN.', 'Sai — Pháp không cho VN làm cơ khí nặng.', 'Sai — Pháp không phát triển công nghiệp vũ khí ở VN.', 'Đúng — Pháp tập trung công nghiệp nhẹ chế biến như rượu, thuốc lá, dệt.']
    ),
    Q('Hậu quả khai thác thuộc địa?', ['Phát triển hiện đại', 'VN trở thành nước nông nghiệp lạc hậu, phụ thuộc Pháp', 'Độc lập', 'Hạnh phúc'], 1, 'VN trở thành nước nông nghiệp lạc hậu, phụ thuộc Pháp về kinh tế-chính trị.',
      [
      '<b>Hậu quả của khai thác thuộc địa</b>: Việt Nam trở thành <i>nước nông nghiệp lạc hậu, lệ thuộc vào Pháp</i> về kinh tế và chính trị.',
      'Tài nguyên bị vơ vét, đời sống nhân dân khổ cực; nhưng cũng làm xuất hiện những giai cấp, tầng lớp mới (công nhân, tư sản, tiểu tư sản).',
      '<ul><li>Sự ra đời của giai cấp công nhân là cơ sở cho phong trào cách mạng sau này.</li></ul>',
    ],
      ['Sai — VN bị kìm hãm, không phát triển hiện đại.', 'Đúng — VN thành nước nông nghiệp lạc hậu, phụ thuộc Pháp.', 'Sai — VN mất độc lập dưới ách thuộc địa.', 'Sai — đời sống nhân dân khổ cực dưới ách bóc lột.']
    ),
  ]),

  M(22, 'Nguyễn Tất Thành ra đi tìm đường cứu nước', [
    Q('Nguyễn Tất Thành (1890-1969) sinh tại?', ['Nghệ An, từng học tại HN', 'Huế, trong cung đình triều Nguyễn', 'Sài Gòn', 'Hà Nội, tại phố Hàng Đào'], 0, 'Nguyễn Tất Thành sinh tại Nghệ An (Nam Đàn), học một thời gian tại HN.',
      [
      '<b>Nguyễn Tất Thành (1890–1969)</b> — sau này là <i>Chủ tịch Hồ Chí Minh</i> — sinh ra tại <code>Nghệ An</code> (làng Sen, Nam Đàn).',
      'Thời niên thiếu, Người từng có thời gian học tập và sống ở Huế và nhiều nơi.',
      '<ul><li>Người sớm chứng kiến cảnh nước mất, dân khổ và nung nấu ý chí cứu nước.</li></ul>',
    ],
      ['Đúng — Nguyễn Tất Thành sinh tại Nghệ An, từng học một thời gian ở HN.', 'Sai — ông sinh ở Nghệ An, không phải cung đình Huế.', 'Sai — ông sinh ở Nghệ An, không phải Sài Gòn.', 'Sai — ông sinh ở Nghệ An, không phải HN.']
    ),
    Q('Người ra đi tìm đường cứu nước?', ['19/8/1945', '7/5/1954', '5/6/1911 từ bến Nhà Rồng (SG)', '2/9/1945'], 2, '5/6/1911: Nguyễn Tất Thành rời bến Nhà Rồng (Sài Gòn) trên tàu Amiral Latouche-Tréville.',
      [
      '<b>Ngày <code>5/6/1911</code></b>, Nguyễn Tất Thành rời <i>bến cảng Nhà Rồng (Sài Gòn)</i> trên con tàu Pháp <i>Amiral Latouche-Tréville</i>, ra đi tìm đường cứu nước.',
      'Người chọn hướng đi sang phương Tây để tìm hiểu vì sao các nước văn minh lại đi xâm lược nước khác.',
      '<ul><li>Đây là con đường khác với Phan Bội Châu (sang Nhật) và Phan Châu Trinh (dựa Pháp).</li></ul>',
    ],
      ['Sai — 19/8/1945 là Cách mạng tháng Tám.', 'Sai — 7/5/1954 là chiến thắng Điện Biên Phủ.', 'Đúng — ngày 5/6/1911 ông rời bến Nhà Rồng (Sài Gòn) ra đi tìm đường cứu nước.', 'Sai — 2/9/1945 là ngày Tuyên ngôn Độc lập.']
    ),
    Q('Đến Pháp năm?', ['1941', '1930', '1920', '1911'], 3, '1911 đến Marseille (Pháp), bắt đầu hành trình tìm đường cứu nước.',
      [
      'Năm <code>1911</code>, sau khi rời Sài Gòn, Nguyễn Tất Thành đến <b>nước Pháp</b> (cảng Mác-xây), bắt đầu hành trình bôn ba qua nhiều nước.',
      'Người vừa lao động kiếm sống, vừa quan sát, học hỏi để tìm con đường giải phóng dân tộc.',
      '<ul><li>Hành trình đưa Người qua châu Âu, châu Phi, châu Mĩ.</li></ul>',
    ],
      ['Sai — 1941 là năm ông trở về Pác Bó.', 'Sai — 1930 là năm thành lập Đảng.', 'Sai — 1920 là năm ông dự Đại hội Tours.', 'Đúng — năm 1911 ông đến Pháp, bắt đầu hành trình tìm đường cứu nước.']
    ),
    Q('Trở thành thành viên ĐCS Pháp?', ['1930', '1911', '1920 tại Đại hội Tours', '1945'], 2, '12/1920 tại Đại hội Tours, Nguyễn Ái Quốc tham gia sáng lập ĐCS Pháp — bước ngoặt đến với CN Mác-Lê.',
      [
      'Tháng <code>12/1920</code>, tại <b>Đại hội Tua (Tours)</b> ở Pháp, <i>Nguyễn Ái Quốc</i> bỏ phiếu tán thành Quốc tế Cộng sản và tham gia <b>sáng lập Đảng Cộng sản Pháp</b>.',
      'Đây là bước ngoặt: Người tìm thấy con đường cứu nước theo chủ nghĩa Mác – Lê-nin.',
      '<ul><li>Từ đây, Người trở thành người cộng sản Việt Nam đầu tiên.</li></ul>',
    ],
      ['Sai — 1930 là năm thành lập ĐCS Việt Nam.', 'Sai — 1911 là năm ông mới sang Pháp.', 'Đúng — năm 1920 tại Đại hội Tours ông tham gia sáng lập ĐCS Pháp.', 'Sai — 1945 là năm Cách mạng tháng Tám.']
    ),
    Q('Người trở về VN trực tiếp lãnh đạo?', ['1945', '1941 — về Pác Bó (Cao Bằng)', '1911', '1920'], 1, '1941: HCM về Pác Bó (Cao Bằng), trực tiếp lãnh đạo CMVN.',
      [
      'Sau gần 30 năm bôn ba, năm <code>1941</code>, lãnh tụ Nguyễn Ái Quốc <b>trở về nước qua Pác Bó (Cao Bằng)</b> để trực tiếp lãnh đạo cách mạng Việt Nam.',
      'Người chủ trì Hội nghị Trung ương lần thứ 8 (5/1941), thành lập Mặt trận Việt Minh, chuẩn bị cho Tổng khởi nghĩa.',
      '<ul><li>Mốc: 1911 (ra đi) – 1920 (đến chủ nghĩa Mác-Lê) – 1941 (về nước).</li></ul>',
    ],
      ['Sai — 1945 là năm Cách mạng tháng Tám thành công.', 'Đúng — năm 1941 ông về Pác Bó (Cao Bằng) trực tiếp lãnh đạo cách mạng.', 'Sai — 1911 là năm ông ra đi tìm đường cứu nước.', 'Sai — 1920 là năm ông dự Đại hội Tours ở Pháp.']
    ),
  ]),

  M(23, 'Văn hoá Hà Nội — Ẩm thực truyền thống', [
    Q('Phở HN có nguồn gốc?', ['Cuối XIX - đầu XX, có thể từ Nam Định', 'Trung Quốc', 'Pháp du nhập vào đầu thế kỷ XX', 'Sau 1975'], 0, 'Phở: ra đời cuối XIX - đầu XX, có giả thuyết từ Nam Định, phát triển mạnh ở HN.',
      [
      '<b>Phở</b> ra đời khoảng <i>cuối thế kỉ XIX – đầu thế kỉ XX</i>, có giả thuyết bắt nguồn từ <code>Nam Định</code>, sau phát triển rực rỡ và trở thành đặc sản gắn liền với Hà Nội.',
      'Phở là món ăn tiêu biểu nhất của ẩm thực Việt Nam, được bạn bè quốc tế biết đến rộng rãi.',
      '<ul><li>Phở là sáng tạo của người Việt, không phải món ngoại nhập.</li></ul>',
    ],
      ['Đúng — phở ra đời cuối XIX - đầu XX, có giả thuyết từ Nam Định.', 'Sai — phở là món Việt, không phải từ Trung Quốc.', 'Sai — phở là sáng tạo của người Việt, không do Pháp du nhập.', 'Sai — phở có từ cuối thế kỷ XIX, lâu trước 1975.']
    ),
    Q('Phở HN đặc trưng?', ['Nước dùng ngọt đậm, bánh phở dày', 'Vị cay nồng, thêm nhiều ớt sa tế', 'Đậm đà', 'Nước trong, thanh, bánh phở mềm, gia vị tinh tế'], 3, 'Phở HN: nước dùng trong, vị thanh; phở SG nước đậm, ngọt hơn.',
      [
      '<b>Phở Hà Nội đặc trưng</b> bởi <i>nước dùng trong, vị thanh, ngọt từ xương</i>, bánh phở mềm và gia vị tinh tế.',
      'Khác với phở miền Nam thường có nước dùng đậm, ngọt hơn và ăn kèm nhiều rau, giá.',
      '<ul><li>Phở bò, phở gà là hai loại phở phổ biến của Hà Nội.</li></ul>',
    ],
      ['Sai — đó là nét của phở miền Nam; phở HN nước trong, thanh.', 'Sai — phở HN vị thanh, không cay nồng nhiều sa tế.', 'Sai — phở HN đặc trưng ở vị thanh, không đậm đà như phở SG.', 'Đúng — phở HN nước trong, thanh, bánh phở mềm, gia vị tinh tế.']
    ),
    Q('Bún chả HN gồm?', ['Bún + bò', 'Bún + cá', 'Bún + chả nướng + nước chấm + rau sống', 'Bún + đậu'], 2, 'Bún chả: chả nướng (lợn) + nước mắm pha + bún + rau sống — đặc sản HN.',
      [
      '<b>Bún chả Hà Nội</b> gồm: <i>bún + chả nướng (thịt lợn) + nước chấm chua ngọt + rau sống</i>.',
      'Chả gồm chả miếng và chả băm, nướng trên than hoa, chấm cùng nước mắm pha có đu đủ, cà rốt.',
      '<ul><li>Bún chả là một trong những món ăn trưa đặc trưng của Hà Nội.</li></ul>',
    ],
      ['Sai — bún chả dùng chả lợn nướng, không phải bò.', 'Sai — đó là bún cá, không phải bún chả.', 'Đúng — bún chả gồm bún, chả nướng, nước chấm và rau sống.', 'Sai — đó là bún đậu, không phải bún chả.']
    ),
    Q('Cốm Vòng (làng Vòng, HN) làm từ?', ['Bột ngô nếp giã mịn', 'Nếp dẻo', 'Lúa non, mùa thu', 'Gạo tẻ'], 2, 'Cốm Vòng: làm từ lúa non vào mùa thu HN — biểu tượng văn hoá HN.',
      [
      '<b>Cốm Vòng</b> (làng Vòng, Cầu Giấy, Hà Nội) được làm từ <i>lúa nếp non</i> vào <b>mùa thu</b>.',
      'Hạt lúa non được rang, giã và sàng sảy công phu để cho ra những hạt cốm dẻo, thơm, xanh.',
      '<ul><li>Cốm là biểu tượng của mùa thu Hà Nội, thường gói trong lá sen.</li></ul>',
    ],
      ['Sai — cốm làm từ lúa nếp non, không phải bột ngô.', 'Sai — cốm làm từ lúa non, không phải nếp đã chín dẻo.', 'Đúng — cốm Vòng làm từ lúa non vào mùa thu HN.', 'Sai — cốm làm từ lúa nếp non, không phải gạo tẻ.']
    ),
    Q('Chả cá Lã Vọng nổi tiếng từ?', ['Thế kỷ XIX, phố Chả Cá HN', 'Sau 1975', 'Pháp đem vào', 'Du nhập từ Trung Quốc thế kỷ XX'], 0, 'Chả cá Lã Vọng: gia đình họ Đoàn, phố Chả Cá (HN) từ thế kỷ XIX.',
      [
      '<b>Chả cá Lã Vọng</b> nổi tiếng từ <i>thế kỉ XIX</i>, do gia đình họ Đoàn ở <b>phố Chả Cá (Hà Nội)</b> sáng tạo.',
      'Món gồm cá lăng (hoặc cá quả) ướp nghệ, nướng rồi rán cùng thì là, hành, ăn với bún và mắm tôm.',
      '<ul><li>Đây là món ăn của người Việt, gắn với một con phố mang luôn tên món ăn.</li></ul>',
    ],
      ['Đúng — chả cá Lã Vọng nổi tiếng từ thế kỷ XIX ở phố Chả Cá HN.', 'Sai — món này có từ thế kỷ XIX, lâu trước 1975.', 'Sai — đây là món của người Việt, không do Pháp đem vào.', 'Sai — chả cá Lã Vọng là món HN, không du nhập từ Trung Quốc.']
    ),
  ]),

  M(24, 'Hà Nội thời Cách mạng tháng Tám (1945)', [
    Q('Cách mạng tháng Tám 1945 ở HN?', ['Khởi nghĩa 19/8/1945 — giành chính quyền', '2/9/1945', '30/4/1975', '7/5/1954'], 0, '19/8/1945: Tổng khởi nghĩa giành chính quyền tại HN — bước ngoặt CMTT.',
      [
      'Tại Hà Nội, <b>cuộc khởi nghĩa giành chính quyền diễn ra ngày <code>19/8/1945</code></b> — mốc quan trọng của Cách mạng tháng Tám.',
      'Hàng vạn quần chúng cùng lực lượng tự vệ đã chiếm các công sở đầu não của chính quyền cũ.',
      '<ul><li>Phân biệt: 19/8 (khởi nghĩa giành chính quyền) – 2/9 (Tuyên ngôn Độc lập).</li></ul>',
    ],
      ['Đúng — khởi nghĩa giành chính quyền ở HN diễn ra ngày 19/8/1945.', 'Sai — 2/9/1945 là ngày đọc Tuyên ngôn Độc lập.', 'Sai — 30/4/1975 là ngày giải phóng miền Nam.', 'Sai — 7/5/1954 là chiến thắng Điện Biên Phủ.']
    ),
    Q('Người lãnh đạo khởi nghĩa HN?', ['Đại tướng Võ Nguyên Giáp chỉ huy trực tiếp', 'Võ Nguyên Giáp', 'Trường Chinh', 'Uỷ ban Khởi nghĩa do Nguyễn Khang chỉ huy'], 3, 'UB Khởi nghĩa HN do Nguyễn Khang phụ trách trực tiếp.',
      [
      'Cuộc khởi nghĩa ở Hà Nội do <b>Uỷ ban Khởi nghĩa Hà Nội</b> trực tiếp chỉ đạo, trong đó đồng chí <code>Nguyễn Khang</code> phụ trách.',
      'Mặt trận Việt Minh đã chuẩn bị lực lượng và phát động quần chúng nổi dậy đúng thời cơ.',
      '<ul><li>Khởi nghĩa thắng lợi nhanh chóng, gần như không đổ máu lớn.</li></ul>',
    ],
      ['Sai — Võ Nguyên Giáp không trực tiếp chỉ huy khởi nghĩa ở HN.', 'Sai — Võ Nguyên Giáp gắn với quân sự sau này.', 'Sai — Trường Chinh là Tổng Bí thư, không trực tiếp chỉ huy khởi nghĩa HN.', 'Đúng — Uỷ ban Khởi nghĩa HN do Nguyễn Khang phụ trách trực tiếp.']
    ),
    Q('Mít-tinh ngày 19/8 ở?', ['Hồ Tây', 'Đông Anh', 'Quảng trường Nhà hát Lớn HN', 'Ba Đình'], 2, 'Mít-tinh khổng lồ ngày 19/8/1945 ở Quảng trường Nhà hát Lớn.',
      [
      'Ngày 19/8/1945, một <b>cuộc mít-tinh khổng lồ</b> đã diễn ra tại <i>quảng trường Nhà hát Lớn Hà Nội</i>, sau đó chuyển thành biểu tình vũ trang giành chính quyền.',
      'Đây là điểm khởi phát của cuộc khởi nghĩa tại Thủ đô.',
      '<ul><li>Phân biệt: mít-tinh 19/8 ở Nhà hát Lớn; Tuyên ngôn 2/9 ở quảng trường Ba Đình.</li></ul>',
    ],
      ['Sai — mít-tinh không diễn ra ở Hồ Tây.', 'Sai — mít-tinh ở trung tâm HN, không phải Đông Anh.', 'Đúng — mít-tinh ngày 19/8/1945 diễn ra ở Quảng trường Nhà hát Lớn.', 'Sai — Quảng trường Ba Đình là nơi đọc Tuyên ngôn 2/9, không phải mít-tinh 19/8.']
    ),
    Q('Bác Hồ đọc Tuyên ngôn Độc lập?', ['19/8/1945', '30/4/1975', '2/9/1945 tại Quảng trường Ba Đình HN', '7/5/1954'], 2, '2/9/1945: Bác Hồ đọc Tuyên ngôn Độc lập tại Quảng trường Ba Đình, khai sinh nước VNDCCH.',
      [
      'Ngày <code>2/9/1945</code>, tại <b>quảng trường Ba Đình (Hà Nội)</b>, Chủ tịch <i>Hồ Chí Minh</i> đọc <b>Tuyên ngôn Độc lập</b>, khai sinh nước <b>Việt Nam Dân chủ Cộng hoà</b>.',
      'Đây là nhà nước công nông đầu tiên ở Đông Nam Á.',
      '<ul><li>Quảng trường Ba Đình từ đó trở thành địa danh thiêng liêng của dân tộc.</li></ul>',
    ],
      ['Sai — 19/8/1945 là ngày khởi nghĩa giành chính quyền.', 'Sai — 30/4/1975 là ngày giải phóng miền Nam.', 'Đúng — ngày 2/9/1945 Bác Hồ đọc Tuyên ngôn Độc lập tại Quảng trường Ba Đình.', 'Sai — 7/5/1954 là chiến thắng Điện Biên Phủ.']
    ),
    Q('Ý nghĩa CMTT?', ['Đánh đổ chế độ thuộc địa, thành lập nước VNDCCH', 'Không có ý nghĩa', 'Chỉ địa phương', 'Thất bại'], 0, 'CMTT 1945: đánh đổ thuộc địa Pháp + phát xít Nhật, thành lập nước VNDCCH đầu tiên ĐNÁ.',
      [
      '<b>Ý nghĩa Cách mạng tháng Tám 1945</b>: <i>đập tan ách thống trị của thực dân Pháp và phát xít Nhật</i>, lật đổ chế độ phong kiến, <b>lập nên nước Việt Nam Dân chủ Cộng hoà</b>.',
      'Đây là bước ngoặt vĩ đại, mở ra kỉ nguyên độc lập, tự do cho dân tộc.',
      '<ul><li>Hà Nội là nơi diễn ra những sự kiện trung tâm của cuộc cách mạng.</li></ul>',
    ],
      ['Đúng — CMTT đánh đổ chế độ thuộc địa, thành lập nước VNDCCH.', 'Sai — CMTT là bước ngoặt lịch sử trọng đại.', 'Sai — CMTT có ý nghĩa toàn quốc và quốc tế, không chỉ địa phương.', 'Sai — CMTT là thắng lợi vẻ vang, không thất bại.']
    ),
  ]),

  M(25, 'Hà Nội trong kháng chiến chống Pháp (1946-1954)', [
    Q('Toàn quốc kháng chiến bắt đầu?', ['2/9/1945', '19/8/1945', '19/12/1946 tại HN', '7/5/1954'], 2, '19/12/1946: HCM ra lời kêu gọi Toàn quốc kháng chiến — bắt đầu KCC Pháp 9 năm.',
      [
      '<b>Toàn quốc kháng chiến bùng nổ ngày <code>19/12/1946</code></b> tại Hà Nội, khi Chủ tịch Hồ Chí Minh ra <i>"Lời kêu gọi toàn quốc kháng chiến"</i>.',
      'Lời kêu gọi khẳng định quyết tâm: "<i>Thà hi sinh tất cả chứ nhất định không chịu mất nước, nhất định không chịu làm nô lệ</i>".',
      '<ul><li>Mở đầu cuộc kháng chiến chống Pháp kéo dài 9 năm (1946–1954).</li></ul>',
    ],
      ['Sai — 2/9/1945 là ngày Tuyên ngôn Độc lập.', 'Sai — 19/8/1945 là Cách mạng tháng Tám.', 'Đúng — Toàn quốc kháng chiến bắt đầu ngày 19/12/1946 tại HN.', 'Sai — 7/5/1954 là chiến thắng Điện Biên Phủ, kết thúc KC.']
    ),
    Q('Trung đoàn Thủ đô?', ['Trung đoàn 1', 'Trung đoàn 102, chiến đấu giữ HN ~60 ngày đêm', 'Tự vệ thành Hoàng Diệu', 'Quân Pháp'], 1, 'Trung đoàn Thủ đô (102) chiến đấu giữ HN 60 ngày đêm (19/12/1946 - 17/2/1947).',
      [
      '<b>Trung đoàn Thủ đô (Trung đoàn 102)</b> được thành lập từ các lực lượng tự vệ và Vệ quốc đoàn, <i>chiến đấu giam chân quân Pháp trong nội thành Hà Nội khoảng 60 ngày đêm</i> (19/12/1946 – 17/2/1947).',
      'Cuộc chiến đấu tạo điều kiện để cả nước chuyển vào kháng chiến lâu dài.',
      '<ul><li>Hình ảnh "chiến sĩ ôm bom ba càng" gắn với những ngày này.</li></ul>',
    ],
      ['Sai — đó không phải tên gọi của Trung đoàn Thủ đô.', 'Đúng — Trung đoàn Thủ đô (102) giữ HN khoảng 60 ngày đêm.', 'Sai — đó là lực lượng khác, không phải Trung đoàn Thủ đô.', 'Sai — đây là đơn vị của ta, không phải quân Pháp.']
    ),
    Q('Câu khẩu hiệu nổi tiếng?', ['"Tự do hay là chết"', '"Đoàn kết"', '"Hoà bình"', '"Quyết tử để Tổ quốc quyết sinh"'], 3, '"Quyết tử để Tổ quốc quyết sinh" — Trung đoàn Thủ đô.',
      [
      'Khẩu hiệu nổi tiếng của Trung đoàn Thủ đô và quân dân Hà Nội là: "<b>Quyết tử để Tổ quốc quyết sinh</b>".',
      'Khẩu hiệu thể hiện tinh thần sẵn sàng hi sinh để bảo vệ độc lập của Thủ đô.',
      '<ul><li>Tinh thần "quyết tử" trở thành biểu tượng của lòng yêu nước thời kháng chiến.</li></ul>',
    ],
      ['Sai — đó không phải khẩu hiệu của Trung đoàn Thủ đô.', 'Sai — đây không phải khẩu hiệu nổi tiếng của trận giữ HN.', 'Sai — đây không phải khẩu hiệu của Trung đoàn Thủ đô.', 'Đúng — "Quyết tử để Tổ quốc quyết sinh" là khẩu hiệu của Trung đoàn Thủ đô.']
    ),
    Q('Sau 60 ngày, Trung đoàn?', ['Bị tiêu diệt', 'Rút ra ngoài bảo toàn lực lượng', 'Tiếp tục cố thủ giữ nội thành HN', 'Đầu hàng'], 1, 'Sau 60 ngày, Trung đoàn rút ra ngoại thành theo kế hoạch, bảo toàn lực lượng cho KC lâu dài.',
      [
      'Sau khoảng 60 ngày đêm chiến đấu, <b>Trung đoàn Thủ đô rút ra ngoài (lên chiến khu)</b> để <i>bảo toàn lực lượng</i>, chuẩn bị cho cuộc kháng chiến lâu dài.',
      'Đây là cuộc rút lui có kế hoạch, an toàn qua gầm cầu Long Biên.',
      '<ul><li>"Bảo toàn lực lượng" là tư tưởng quan trọng trong nghệ thuật quân sự của ta.</li></ul>',
    ],
      ['Sai — Trung đoàn rút lui an toàn, không bị tiêu diệt.', 'Đúng — sau 60 ngày, Trung đoàn rút ra ngoài để bảo toàn lực lượng.', 'Sai — Trung đoàn rút ra ngoại thành, không cố thủ tiếp.', 'Sai — Trung đoàn không đầu hàng mà rút lui có kế hoạch.']
    ),
    Q('HN giải phóng?', ['7/5/1954', '30/4/1975', '2/9/1945', '10/10/1954'], 3, '10/10/1954: Đoàn quân tiến vào HN — Ngày giải phóng Thủ đô.',
      [
      '<b>Thủ đô Hà Nội được giải phóng ngày <code>10/10/1954</code></b>, khi đoàn quân chiến thắng tiến vào tiếp quản thành phố.',
      'Ngày Giải phóng Thủ đô đánh dấu Hà Nội sạch bóng quân Pháp sau gần một thế kỉ.',
      '<ul><li>Phân biệt: 7/5/1954 (Điện Biên Phủ) – 10/10/1954 (Giải phóng Thủ đô).</li></ul>',
    ],
      ['Sai — 7/5/1954 là chiến thắng Điện Biên Phủ.', 'Sai — 30/4/1975 là ngày giải phóng miền Nam.', 'Sai — 2/9/1945 là ngày Tuyên ngôn Độc lập.', 'Đúng — ngày 10/10/1954 là Ngày giải phóng Thủ đô HN.']
    ),
  ]),

  M(26, 'Hà Nội trong kháng chiến chống Mỹ — Điện Biên Phủ trên không 1972', [
    Q('Điện Biên Phủ trên không (1972)?', ['30/4/1975', '7/5/1954', '12 ngày đêm B52 Mỹ ném bom HN', '2/9/1945'], 2, '12 ngày đêm (18-29/12/1972): Mỹ dùng B52 ném bom HN — "Linebacker II".',
      [
      '<b>"Điện Biên Phủ trên không"</b> là chiến dịch <i>12 ngày đêm cuối tháng 12/1972</i> (18–29/12/1972), khi đế quốc Mỹ dùng <b>máy bay B-52</b> ném bom huỷ diệt Hà Nội, Hải Phòng (chiến dịch Linebacker II).',
      'Quân dân Hà Nội đã đánh trả oanh liệt, làm nên chiến thắng vang dội.',
      '<ul><li>Tên gọi gợi nhớ chiến thắng Điện Biên Phủ (1954) — nay là chiến thắng trên bầu trời.</li></ul>',
    ],
      ['Sai — 30/4/1975 là ngày giải phóng miền Nam.', 'Sai — 7/5/1954 là chiến thắng Điện Biên Phủ trên bộ.', 'Đúng — đây là 12 ngày đêm B52 Mỹ ném bom HN cuối năm 1972.', 'Sai — 2/9/1945 là ngày Tuyên ngôn Độc lập.']
    ),
    Q('Khu vực bị ném bom nặng?', ['Long Biên', 'Tây Hồ', 'Phố Khâm Thiên, BV Bạch Mai, Yên Viên', 'Hoàn Kiếm'], 2, 'Khâm Thiên (~280 người thiệt mạng), BV Bạch Mai bị tàn phá nặng.',
      [
      '<b>Các khu vực bị B-52 ném bom nặng nề ở Hà Nội</b>: <i>phố Khâm Thiên, Bệnh viện Bạch Mai, ga Yên Viên</i>…',
      'Phố Khâm Thiên bị tàn phá khủng khiếp, nhiều thường dân thiệt mạng — minh chứng cho tội ác chiến tranh.',
      '<ul><li>Đài tưởng niệm Khâm Thiên ghi dấu nỗi đau và tinh thần bất khuất của người Hà Nội.</li></ul>',
    ],
      ['Sai — Long Biên không phải nơi bị tàn phá nặng nhất.', 'Sai — Tây Hồ không phải khu bị ném bom nặng.', 'Đúng — phố Khâm Thiên, BV Bạch Mai, Yên Viên bị ném bom nặng nề.', 'Sai — Hoàn Kiếm không phải khu bị tàn phá nặng nhất.']
    ),
    Q('Số B52 bị bắn hạ?', ['34 B52 (chiến thắng vang dội)', '0', '100', '5'], 0, 'VN bắn hạ 34 chiếc B52 — "thần tượng bất bại" của không quân Mỹ.',
      [
      'Trong 12 ngày đêm, quân dân ta đã <b>bắn rơi <code>34 máy bay B-52</code></b> của Mỹ — loại "pháo đài bay" được coi là bất khả xâm phạm.',
      'Đây là tổn thất nặng nề chưa từng có với không quân chiến lược Mỹ.',
      '<ul><li>Bộ đội tên lửa, phòng không và nhân dân Hà Nội lập nên kì tích này.</li></ul>',
    ],
      ['Đúng — VN bắn hạ 34 chiếc B52, một chiến thắng vang dội.', 'Sai — VN bắn hạ nhiều B52, không phải con số 0.', 'Sai — số B52 bị bắn hạ là 34, không tới 100.', 'Sai — con số là 34 chiếc, không phải 5.']
    ),
    Q('Kết quả?', ['Mỹ thắng', 'Mỹ buộc ký Hiệp định Paris 27/1/1973', 'Tiếp tục chiến tranh', 'Hai bên ngừng bắn, giữ nguyên hiện trạng'], 1, 'Sau ĐBP trên không, Mỹ buộc ký Hiệp định Paris (27/1/1973), rút quân khỏi VN.',
      [
      '<b>Kết quả</b>: thất bại trong chiến dịch ném bom, <i>Mỹ buộc phải kí <b>Hiệp định Paris (27/1/1973)</b></i>, cam kết rút quân và chấm dứt chiến tranh xâm lược Việt Nam.',
      '"Điện Biên Phủ trên không" là đòn quyết định buộc Mỹ trở lại bàn đàm phán.',
      '<ul><li>Hiệp định Paris mở đường cho thắng lợi cuối cùng năm 1975.</li></ul>',
    ],
      ['Sai — Mỹ thất bại, buộc phải ký hiệp định và rút quân.', 'Đúng — Mỹ buộc ký Hiệp định Paris ngày 27/1/1973 và rút quân.', 'Sai — sau trận này Mỹ buộc ký hiệp định, không tiếp tục chiến tranh.', 'Sai — kết quả là Mỹ buộc ký Hiệp định Paris, rút quân.']
    ),
    Q('Ý nghĩa?', ['Chỉ là một trận đánh nhỏ ở ngoại thành HN', 'Thất bại', 'Chỉ địa phương', 'Đỉnh cao thắng lợi không quân, ngoại giao VN trong KC chống Mỹ'], 3, 'ĐBP trên không: thắng lợi quân sự + ngoại giao, buộc Mỹ ký Hiệp định Paris, rút quân.',
      [
      '<b>Ý nghĩa</b>: chiến thắng "Điện Biên Phủ trên không" là <i>đỉnh cao thắng lợi về quân sự và ngoại giao</i> của quân dân ta, đặc biệt là Hà Nội, trong kháng chiến chống Mỹ.',
      'Chiến thắng khẳng định bản lĩnh, trí tuệ và tinh thần Hà Nội anh hùng.',
      '<ul><li>Đây là trận thắng có tầm vóc lịch sử và quốc tế.</li></ul>',
    ],
      ['Sai — đây là chiến thắng lớn, không phải trận đánh nhỏ.', 'Sai — đây là thắng lợi vang dội, không thất bại.', 'Sai — ý nghĩa mang tầm quốc gia và quốc tế, không chỉ địa phương.', 'Đúng — đây là đỉnh cao thắng lợi quân sự và ngoại giao của VN chống Mỹ.']
    ),
  ]),

  M(27, 'Hà Nội — Thủ đô anh hùng', [
    Q('HN được phong "Thủ đô anh hùng"?', ['Mới đề xuất', '"Thành phố vì hoà bình" do UNESCO trao', 'Có — danh hiệu cao quý của Đảng và NN', 'Đang xét'], 2, 'HN được phong "Thủ đô anh hùng" (1999), "Thành phố vì hoà bình" (UNESCO 1999).',
      [
      'Hà Nội đã được Đảng và Nhà nước phong tặng danh hiệu <b>"Thủ đô Anh hùng"</b> (năm 1999) — danh hiệu cao quý ghi nhận truyền thống đấu tranh và xây dựng.',
      'Đây là sự tôn vinh cho những đóng góp to lớn của Hà Nội qua các thời kì lịch sử.',
      '<ul><li>"Thủ đô Anh hùng" do Nhà nước phong, khác với danh hiệu của UNESCO.</li></ul>',
    ],
      ['Sai — HN đã được phong từ năm 1999, không phải mới đề xuất.', 'Sai — đó là danh hiệu khác; "Thủ đô anh hùng" do Đảng và Nhà nước phong.', 'Đúng — HN được phong "Thủ đô anh hùng" — danh hiệu cao quý của Đảng và Nhà nước.', 'Sai — danh hiệu đã được trao, không còn đang xét.']
    ),
    Q('UNESCO công nhận HN?', ['Thành phố vì hoà bình (1999)', 'Di sản tự nhiên', 'Không công nhận', 'Di sản hỗn hợp'], 0, 'UNESCO 1999 công nhận HN là "Thành phố vì hoà bình" — vinh dự lớn.',
      [
      'Năm <code>1999</code>, <b>UNESCO trao tặng Hà Nội danh hiệu "Thành phố vì hoà bình"</b> — Hà Nội là thành phố duy nhất ở khu vực châu Á – Thái Bình Dương được nhận vinh dự này khi đó.',
      'Danh hiệu ghi nhận nỗ lực của Hà Nội về bình đẳng, phát triển đô thị, văn hoá, giáo dục và môi trường.',
      '<ul><li>Phân biệt: "Thủ đô Anh hùng" (Nhà nước) và "Thành phố vì hoà bình" (UNESCO).</li></ul>',
    ],
      ['Đúng — UNESCO công nhận HN là "Thành phố vì hoà bình" năm 1999.', 'Sai — HN được vinh danh là thành phố vì hoà bình, không phải di sản tự nhiên.', 'Sai — UNESCO đã công nhận HN năm 1999.', 'Sai — danh hiệu là "Thành phố vì hoà bình", không phải di sản hỗn hợp.']
    ),
    Q('Đặc trưng HN qua lịch sử?', ['Phục tùng', 'Kiên cường chống ngoại xâm, văn hiến', 'Tự do tuyệt đối', 'Hèn nhát'], 1, 'HN qua nhiều thời kỳ: chống xâm lược, giữ vai trò trung tâm chính trị-văn hoá-giáo dục.',
      [
      '<b>Đặc trưng của Hà Nội qua lịch sử</b>: <i>kiên cường chống ngoại xâm</i> và là vùng đất <b>văn hiến</b> — trung tâm chính trị, văn hoá, giáo dục lâu đời của cả nước.',
      'Truyền thống "nghìn năm văn hiến" là niềm tự hào của người Hà Nội.',
      '<ul><li>Văn hiến: truyền thống văn hoá tốt đẹp và lâu đời.</li></ul>',
    ],
      ['Sai — HN luôn kiên cường, không phục tùng giặc.', 'Đúng — HN kiên cường chống ngoại xâm và là vùng đất văn hiến.', 'Sai — đây không phải đặc trưng lịch sử của HN.', 'Sai — HN nổi tiếng dũng cảm, không hèn nhát.']
    ),
    Q('HN ngày nay là?', ['Thành phố trực thuộc TƯ', 'Khu tự trị', 'Thủ đô nước CHXHCN VN', 'Đặc khu kinh tế trực thuộc Chính phủ'], 2, 'HN: Thủ đô nước CHXHCN VN (1976 sau thống nhất), thành phố loại đặc biệt.',
      [
      '<b>Hà Nội ngày nay</b> là <i>Thủ đô của nước Cộng hoà Xã hội Chủ nghĩa Việt Nam</i>, đô thị loại đặc biệt, trung tâm đầu não của cả nước.',
      'Hà Nội chính thức là Thủ đô của nước Việt Nam thống nhất từ năm 1976.',
      '<ul><li>Là nơi đặt trụ sở các cơ quan trung ương của Đảng, Quốc hội, Chính phủ.</li></ul>',
    ],
      ['Sai — HN không chỉ là tỉnh/thành thường, mà là Thủ đô.', 'Sai — HN không phải khu tự trị.', 'Đúng — HN là Thủ đô nước CHXHCN Việt Nam.', 'Sai — HN là Thủ đô, không phải đặc khu kinh tế.']
    ),
    Q('Diện tích HN sau mở rộng 2008?', ['~500 km²', '~10000 km²', '~3344 km² (gấp 3 lần trước)', '~1000 km²'], 2, 'HN sáp nhập Hà Tây + 1 phần Vĩnh Phúc, Hoà Bình (8/2008) → ~3344 km².',
      [
      'Sau khi <b>mở rộng địa giới hành chính năm 2008</b> (sáp nhập Hà Tây và một phần Vĩnh Phúc, Hoà Bình), diện tích Hà Nội tăng lên khoảng <code>3344 km²</code>.',
      'Việc mở rộng nhằm tạo không gian phát triển bền vững cho Thủ đô.',
      '<ul><li>Hà Nội trở thành một trong những thủ đô có diện tích lớn trên thế giới.</li></ul>',
    ],
      ['Sai — diện tích lớn hơn nhiều sau mở rộng.', 'Sai — diện tích khoảng 3344 km², không tới 10000.', 'Đúng — sau mở rộng 2008, diện tích HN khoảng 3344 km².', 'Sai — diện tích khoảng 3344 km², lớn hơn 1000 nhiều.']
    ),
  ]),

  M(28, 'Văn miếu - Quốc tử giám', [
    Q('Văn Miếu - Quốc tử giám xây?', ['1500', '1010', '1070 (thời Lý Thánh Tông)', '1800'], 2, 'Văn Miếu xây năm 1070, Quốc tử giám 1076 — trường đại học đầu tiên VN.',
      [
      '<b>Văn Miếu</b> được xây dựng năm <code>1070</code> dưới thời vua <i>Lý Thánh Tông</i>; sáu năm sau (<code>1076</code>), vua Lý Nhân Tông lập <b>Quốc Tử Giám</b>.',
      'Quốc Tử Giám được coi là <b>trường đại học đầu tiên của Việt Nam</b>.',
      '<ul><li>Quần thể Văn Miếu – Quốc Tử Giám là Di tích Quốc gia đặc biệt.</li></ul>',
    ],
      ['Sai — Văn Miếu xây từ năm 1070, sớm hơn 1500.', 'Sai — 1010 là năm dời đô về Thăng Long, Văn Miếu xây sau.', 'Đúng — Văn Miếu xây năm 1070 thời Lý Thánh Tông.', 'Sai — Văn Miếu có từ thế kỷ XI, không phải 1800.']
    ),
    Q('Văn Miếu thờ ai?', ['Mẫu Liễu Hạnh và Tam phủ', 'Khổng Tử và các bậc tiên hiền nho học', 'Phật Thích Ca và các vị Bồ Tát', 'Lão Tử'], 1, 'Văn Miếu thờ Khổng Tử và các bậc đại nho.',
      [
      '<b>Văn Miếu thờ <code>Khổng Tử</code></b> — người sáng lập Nho giáo — cùng các bậc <i>tiên hiền, tiên nho</i> và những danh nhân có công với nền giáo dục.',
      'Văn Miếu là biểu tượng của truyền thống hiếu học và đạo học của dân tộc.',
      '<ul><li>Phân biệt: chùa thờ Phật; đền phủ thờ Mẫu; Văn Miếu thờ Khổng Tử.</li></ul>',
    ],
      ['Sai — Mẫu Liễu Hạnh thờ ở các đền phủ, không phải Văn Miếu.', 'Đúng — Văn Miếu thờ Khổng Tử và các bậc tiên hiền nho học.', 'Sai — Phật được thờ ở chùa, không phải Văn Miếu.', 'Sai — Văn Miếu thờ Khổng Tử của Nho giáo, không phải Lão Tử.']
    ),
    Q('Quốc tử giám có chức năng?', ['Trường thi Hương cho các sĩ tử Bắc Kỳ', 'Trường đại học đầu tiên VN, đào tạo quan lại', 'Thư viện thuần', 'Đền thờ tổ tiên hoàng tộc nhà Lý'], 1, 'Quốc tử giám: trường ĐH đầu tiên VN, đào tạo con em vua quan và nhân tài.',
      [
      '<b>Quốc Tử Giám</b> là <i>trường đại học đầu tiên của Việt Nam</i>, ban đầu dạy con vua, sau mở rộng đào tạo <b>nhân tài, quan lại</b> cho đất nước.',
      'Đây là trung tâm giáo dục cao cấp của các triều đại Lý, Trần, Lê.',
      '<ul><li>Học sinh giỏi được tuyển từ khắp nơi về học.</li></ul>',
    ],
      ['Sai — đây là trường đào tạo, không phải trường thi Hương.', 'Đúng — Quốc tử giám là trường đại học đầu tiên VN, đào tạo quan lại.', 'Sai — đây là trường học, không chỉ là thư viện.', 'Sai — đây là trường học, không phải đền thờ hoàng tộc.']
    ),
    Q('Bia tiến sĩ có?', ['10 bia', '1000 bia', '82 bia khắc tên 1304 tiến sĩ qua các khoa thi 1442-1779', '100 bia'], 2, '82 bia tiến sĩ khắc tên 1304 vị (1442-1779) — Di sản tư liệu UNESCO 2010.',
      [
      'Tại Văn Miếu hiện còn <b><code>82 bia tiến sĩ</code></b> khắc tên hơn <i>1300 vị tiến sĩ</i> đỗ đạt qua các khoa thi từ năm <code>1442 đến 1779</code>.',
      'Năm 2010, 82 bia tiến sĩ được <b>UNESCO công nhận là Di sản Tư liệu thế giới</b>.',
      '<ul><li>Bia tiến sĩ thể hiện truyền thống tôn vinh hiền tài: "Hiền tài là nguyên khí quốc gia".</li></ul>',
    ],
      ['Sai — số bia là 82, nhiều hơn 10.', 'Sai — số bia là 82, không tới 1000.', 'Đúng — có 82 bia tiến sĩ khắc tên 1304 vị qua các khoa thi 1442-1779.', 'Sai — số bia chính xác là 82, không phải 100.']
    ),
    Q('Ý nghĩa Văn Miếu hôm nay?', ['Chỉ là di tích cổ ít được quan tâm', 'Biểu tượng giáo dục, văn hoá HN; điểm du lịch', 'Bỏ hoang', 'Sắp phá'], 1, 'Văn Miếu: biểu tượng giáo dục-văn hoá HN, di tích quốc gia đặc biệt, điểm du lịch.',
      [
      '<b>Ý nghĩa của Văn Miếu ngày nay</b>: là <i>biểu tượng của nền giáo dục và văn hoá Hà Nội</i>, Di tích Quốc gia đặc biệt và là <b>điểm du lịch, văn hoá</b> quan trọng.',
      'Nhiều học sinh, sĩ tử đến đây trước các kì thi để bày tỏ tinh thần hiếu học.',
      '<ul><li>Văn Miếu là nơi tôn vinh truyền thống "tôn sư trọng đạo" của dân tộc.</li></ul>',
    ],
      ['Sai — Văn Miếu rất được quan tâm và tôn vinh.', 'Đúng — Văn Miếu là biểu tượng giáo dục, văn hoá HN và điểm du lịch.', 'Sai — Văn Miếu được bảo tồn tốt, không bỏ hoang.', 'Sai — Văn Miếu được gìn giữ, không bị phá.']
    ),
  ]),

  M(29, 'Hà Nội — Đô thị thông minh (Smart City)', [
    Q('Đô thị thông minh (smart city) là?', ['Đô thị nông thôn', 'Đô thị cũ', 'Đô thị ứng dụng công nghệ để nâng chất lượng sống', 'Đô thị giàu'], 2, 'Smart city: ứng dụng IoT, AI, big data… để cải thiện chất lượng dịch vụ và đời sống.',
      [
      '<b>Đô thị thông minh (smart city)</b> là đô thị <i>ứng dụng công nghệ (IoT, AI, dữ liệu lớn)</i> để <b>nâng cao chất lượng cuộc sống</b>, quản lí hiệu quả và phát triển bền vững.',
      'Công nghệ giúp đô thị vận hành thông minh hơn trong giao thông, năng lượng, dịch vụ công…',
      '<ul><li>IoT: Internet vạn vật — kết nối các thiết bị qua mạng để thu thập, xử lí dữ liệu.</li></ul>',
    ],
      ['Sai — smart city là đô thị công nghệ cao, không phải nông thôn.', 'Sai — smart city là đô thị hiện đại, không phải đô thị cũ.', 'Đúng — smart city là đô thị ứng dụng công nghệ để nâng chất lượng sống.', 'Sai — điểm cốt lõi là công nghệ, không phải mức độ giàu.']
    ),
    Q('HN có dự án smart city?', ['Chỉ ý tưởng', 'Có — đang xây smart city Đông Anh, tích hợp công nghệ Nhật', 'Hà Đông', 'Chỉ áp dụng wifi công cộng tại phố cổ'], 1, 'HN đang xây Smart City Đông Anh (~272 ha) — hợp tác Sumitomo (Nhật) và BRG.',
      [
      'Hà Nội đang triển khai <b>dự án thành phố thông minh ở khu vực <code>Đông Anh</code></b>, hợp tác với đối tác <i>Nhật Bản (Sumitomo)</i> và doanh nghiệp trong nước.',
      'Đây là một trong những dự án đô thị thông minh quy mô lớn ở Việt Nam.',
      '<ul><li>Dự án hướng tới đô thị xanh, hiện đại, tích hợp công nghệ cao.</li></ul>',
    ],
      ['Sai — đây không chỉ là ý tưởng mà đã triển khai.', 'Đúng — HN đang xây smart city Đông Anh, tích hợp công nghệ Nhật.', 'Sai — dự án smart city ở Đông Anh, không phải Hà Đông.', 'Sai — smart city là dự án lớn, không chỉ là wifi công cộng.']
    ),
    Q('Ứng dụng smart city ở HN?', ['Chỉ giải trí', 'Chỉ áp dụng tại các toà nhà chính phủ', 'Giao thông thông minh, dịch vụ công online, camera an ninh, IoT', 'Chỉ wifi'], 2, 'HN: hệ thống giao thông thông minh, dịch vụ công online (eGov), camera AI, IoT đô thị…',
      [
      '<b>Ứng dụng smart city ở Hà Nội</b> gồm: <i>giao thông thông minh, dịch vụ công trực tuyến (chính quyền điện tử), camera an ninh, hệ thống IoT</i>…',
      'Người dân có thể làm nhiều thủ tục hành chính qua mạng, tiết kiệm thời gian.',
      '<ul><li>Smart city phục vụ nhiều mặt đời sống, không chỉ một lĩnh vực.</li></ul>',
    ],
      ['Sai — smart city phục vụ nhiều mặt, không chỉ giải trí.', 'Sai — ứng dụng rộng khắp đô thị, không chỉ toà nhà chính phủ.', 'Đúng — gồm giao thông thông minh, dịch vụ công online, camera an ninh, IoT.', 'Sai — smart city gồm nhiều ứng dụng, không chỉ wifi.']
    ),
    Q('Lợi ích smart city?', ['Tăng ùn tắc', 'Làm tăng chi phí dịch vụ công cho người dân', 'Tốn điện', 'Giảm ùn tắc, tiết kiệm năng lượng, dịch vụ tốt hơn'], 3, 'Smart city: giảm ùn tắc (giao thông thông minh), tiết kiệm năng lượng (smart grid), dịch vụ công tốt.',
      [
      '<b>Lợi ích của smart city</b>:',
      '<ul><li><i>Giảm ùn tắc giao thông</i> nhờ điều hành thông minh.</li><li><i>Tiết kiệm năng lượng</i> (chiếu sáng, lưới điện thông minh).</li><li><b>Dịch vụ công thuận tiện, nhanh chóng hơn</b>.</li></ul>',
      'Smart city góp phần nâng cao chất lượng sống của người dân.',
    ],
      ['Sai — smart city giúp giảm ùn tắc chứ không tăng.', 'Sai — smart city giúp dịch vụ công thuận tiện và tiết kiệm hơn.', 'Sai — smart city giúp tiết kiệm năng lượng.', 'Đúng — smart city giảm ùn tắc, tiết kiệm năng lượng, dịch vụ tốt hơn.']
    ),
    Q('Thách thức smart city HN?', ['Đầu tư lớn, quyền riêng tư, đào tạo nhân lực', 'Không thách thức', 'Quá dễ', 'Hoàn thành rồi'], 0, 'Thách thức: vốn đầu tư rất lớn + bảo vệ quyền riêng tư + đào tạo nhân lực IT.',
      [
      '<b>Thách thức của smart city Hà Nội</b>: <i>cần vốn đầu tư rất lớn</i>, vấn đề <i>bảo vệ quyền riêng tư – an toàn dữ liệu</i>, và <i>đào tạo nguồn nhân lực công nghệ thông tin</i>.',
      'Việc thu thập dữ liệu cá nhân đặt ra yêu cầu cao về bảo mật và pháp lí.',
      '<ul><li>Xây dựng smart city là quá trình lâu dài, cần đầu tư đồng bộ.</li></ul>',
    ],
      ['Đúng — thách thức là vốn đầu tư lớn, quyền riêng tư và đào tạo nhân lực.', 'Sai — có nhiều thách thức cần giải quyết.', 'Sai — xây dựng smart city không hề dễ.', 'Sai — dự án còn đang triển khai, chưa hoàn thành.']
    ),
  ]),

  M(30, 'Quy hoạch và phát triển đô thị HN', [
    Q('Quy hoạch chung HN đến 2030?', ['Chỉ phố cổ', 'Giữ nguyên', 'Mở rộng, hiện đại nhưng giữ phố cổ', 'Phá phố cổ'], 2, 'QH HN đến 2030: phát triển mở rộng (vành đai), hiện đại nhưng bảo tồn phố cổ và hồ.',
      [
      '<b>Quy hoạch chung Hà Nội</b> hướng tới phát triển <i>mở rộng, hiện đại</i> nhưng vẫn <b>bảo tồn khu phố cổ, hồ và di sản</b>.',
      'Mục tiêu là một Thủ đô văn minh, hiện đại mà vẫn giữ được bản sắc nghìn năm.',
      '<ul><li>Bảo tồn di sản đi đôi với phát triển là nguyên tắc xuyên suốt.</li></ul>',
    ],
      ['Sai — quy hoạch không chỉ tập trung phố cổ.', 'Sai — HN phát triển mở rộng, không giữ nguyên.', 'Đúng — quy hoạch là mở rộng, hiện đại nhưng vẫn giữ phố cổ.', 'Sai — quy hoạch bảo tồn phố cổ, không phá bỏ.']
    ),
    Q('Vành đai HN?', ['Vành đai 1, 2, 2.5, 3, 3.5, 4 — phân cấp giao thông', '10 vành', '1 vành', 'Chỉ có vành đai 2 và vành đai 3'], 0, 'HN có nhiều vành đai (1-4) để phân cấp giao thông và giảm tải trung tâm.',
      [
      '<b>Hệ thống đường vành đai Hà Nội</b> gồm các vành đai <code>1, 2, 2.5, 3, 3.5, 4</code> — nhằm <i>phân luồng, giảm tải giao thông cho khu trung tâm</i>.',
      'Vành đai 4 (đang xây) là tuyến đường lớn liên kết Hà Nội với các tỉnh lân cận.',
      '<ul><li>Đường vành đai giúp xe quá cảnh không phải đi xuyên trung tâm.</li></ul>',
    ],
      ['Đúng — HN có các vành đai 1, 2, 2.5, 3, 3.5, 4 để phân cấp giao thông.', 'Sai — HN không có tới 10 vành đai.', 'Sai — HN có nhiều vành đai, không chỉ 1.', 'Sai — HN có nhiều vành đai hơn, gồm cả 1, 4...']
    ),
    Q('Metro HN?', ['Đã có tuyến 2A (Cát Linh-Hà Đông, 2021), nhiều tuyến đang xây', 'Chưa có', 'Đã có 10 tuyến', 'Chỉ 1 tuyến'], 0, 'Metro HN: tuyến 2A Cát Linh-Hà Đông (vận hành 11/2021), tuyến 3 Nhổn-Ga HN đang xây.',
      [
      'Hà Nội đã đưa vào vận hành <b>tuyến đường sắt đô thị (metro) 2A Cát Linh – Hà Đông</b> từ tháng <code>11/2021</code>; nhiều tuyến khác (như tuyến 3 Nhổn – ga Hà Nội) đang được xây dựng.',
      'Metro là phương tiện giao thông công cộng hiện đại, giúp giảm ùn tắc và ô nhiễm.',
      '<ul><li>Đây là tuyến đường sắt đô thị đầu tiên đi vào hoạt động ở Việt Nam.</li></ul>',
    ],
      ['Đúng — HN đã có tuyến 2A Cát Linh-Hà Đông (2021), nhiều tuyến đang xây.', 'Sai — HN đã có metro vận hành từ 2021.', 'Sai — HN chưa có tới 10 tuyến metro.', 'Sai — ngoài tuyến 2A, còn nhiều tuyến đang xây.']
    ),
    Q('Đô thị vệ tinh HN?', ['Sài Gòn', 'Chỉ có 2 đô thị Hoà Lạc và Sóc Sơn', 'Hoà Lạc, Sóc Sơn, Sơn Tây, Xuân Mai, Phú Xuyên', 'Hải Phòng và Bắc Ninh'], 2, 'HN có 5 đô thị vệ tinh trong quy hoạch (Hoà Lạc lớn nhất với ĐHQG, công nghệ cao).',
      [
      '<b>Năm đô thị vệ tinh của Hà Nội</b> theo quy hoạch: <i>Hoà Lạc, Sóc Sơn, Sơn Tây, Xuân Mai, Phú Xuyên</i>.',
      'Trong đó <b>Hoà Lạc</b> lớn nhất, gắn với Đại học Quốc gia Hà Nội và Khu công nghệ cao.',
      '<ul><li>Đô thị vệ tinh giúp giãn dân, giảm áp lực cho khu trung tâm.</li></ul>',
    ],
      ['Sai — Sài Gòn là thành phố lớn ở miền Nam, không phải vệ tinh của HN.', 'Sai — HN có 5 đô thị vệ tinh, không chỉ 2.', 'Đúng — gồm Hoà Lạc, Sóc Sơn, Sơn Tây, Xuân Mai, Phú Xuyên.', 'Sai — Hải Phòng và Bắc Ninh là tỉnh/thành riêng, không phải vệ tinh HN.']
    ),
    Q('Bảo tồn di sản trong phát triển?', ['Chỉ bảo tồn', 'Phá hết để xây mới', 'Không liên quan', 'Hài hoà phát triển và bảo tồn (phố cổ, hồ Hoàn Kiếm)'], 3, 'HN cần cân bằng: phát triển mới (vành đai, metro, smart city) + bảo tồn di sản (phố cổ, hồ, di tích).',
      [
      '<b>Bảo tồn di sản trong phát triển</b>: cần <i>hài hoà giữa phát triển mới và gìn giữ di sản</i> như khu phố cổ, hồ Hoàn Kiếm, các di tích.',
      'Phát triển bền vững là phát triển không đánh đổi di sản và môi trường.',
      '<ul><li>Vừa xây metro, vành đai, smart city; vừa bảo tồn phố cổ, hồ, di tích.</li></ul>',
    ],
      ['Sai — cần cân bằng cả phát triển lẫn bảo tồn.', 'Sai — không phá di sản mà phải gìn giữ.', 'Sai — bảo tồn di sản gắn liền với phát triển bền vững.', 'Đúng — cần hài hoà giữa phát triển và bảo tồn phố cổ, hồ Hoàn Kiếm.']
    ),
  ]),

  M(31, 'Bảo vệ môi trường tại Hà Nội', [
    Q('Vấn đề môi trường HN?', ['Quá sạch', 'Ô nhiễm không khí (PM2.5), nước, rác thải', 'Chỉ tiếng ồn', 'Không có vấn đề'], 1, 'HN: ô nhiễm không khí cao (mùa đông PM2.5 vượt chuẩn), ô nhiễm nước sông Tô Lịch, rác thải.',
      [
      '<b>Các vấn đề môi trường của Hà Nội</b>: <i>ô nhiễm không khí (bụi mịn PM2.5), ô nhiễm nguồn nước (sông Tô Lịch), rác thải</i>.',
      'Đây là mặt trái của quá trình đô thị hoá và gia tăng phương tiện cá nhân.',
      '<ul><li>Vào mùa đông, nồng độ bụi mịn ở Hà Nội thường vượt ngưỡng cho phép.</li></ul>',
    ],
      ['Sai — HN đang đối mặt với ô nhiễm, không phải quá sạch.', 'Đúng — HN có ô nhiễm không khí (PM2.5), nước và rác thải.', 'Sai — không chỉ tiếng ồn mà còn nhiều vấn đề khác.', 'Sai — HN có nhiều vấn đề môi trường cần giải quyết.']
    ),
    Q('PM2.5 là?', ['Vô hại', 'Khí CO2 thải ra từ xe máy', 'Bụi siêu mịn ≤2.5μm — gây hại sức khoẻ', 'Bụi to'], 2, 'PM2.5: bụi siêu mịn (≤2.5 micromet) đi vào phổi → bệnh hô hấp, tim mạch, ung thư.',
      [
      '<b>PM2.5</b> là <i>bụi siêu mịn có đường kính nhỏ hơn hoặc bằng <code>2,5 micromet</code></i> (μm).',
      'Vì rất nhỏ, PM2.5 có thể <b>đi sâu vào phổi và máu</b>, gây các bệnh hô hấp, tim mạch, thậm chí ung thư.',
      '<ul><li>Nguồn phát sinh: khói xe, đốt rác, công trường, hoạt động công nghiệp.</li></ul>',
    ],
      ['Sai — PM2.5 gây hại sức khoẻ, không vô hại.', 'Sai — PM2.5 là bụi mịn, không phải khí CO2.', 'Đúng — PM2.5 là bụi siêu mịn ≤2.5μm, đi vào phổi và gây hại sức khoẻ.', 'Sai — PM2.5 là bụi siêu mịn, không phải bụi to.']
    ),
    Q('Giải pháp giảm ô nhiễm không khí?', ['Phá rừng', 'Tăng xe', 'Chờ gió mùa đông bắc thổi sạch bụi', 'Giảm xe cá nhân, tăng metro/xe buýt, xe điện'], 3, 'Giải pháp: phương tiện công cộng + xe điện + cây xanh + đóng các xí nghiệp gây ô nhiễm.',
      [
      '<b>Giải pháp giảm ô nhiễm không khí</b>: <i>giảm xe cá nhân, tăng cường phương tiện công cộng (metro, xe buýt), dùng xe điện</i>, trồng cây xanh.',
      'Cần cả giải pháp chính sách (kiểm soát khí thải) và ý thức của mỗi người dân.',
      '<ul><li>Không thể chỉ trông chờ vào gió mùa "thổi sạch" bụi mà phải hành động chủ động.</li></ul>',
    ],
      ['Sai — phá rừng làm ô nhiễm nặng hơn.', 'Sai — tăng xe cá nhân làm ô nhiễm thêm.', 'Sai — không thể chỉ trông chờ vào gió mà cần hành động.', 'Đúng — giảm xe cá nhân, tăng metro/xe buýt và dùng xe điện.']
    ),
    Q('Sông Tô Lịch hiện?', ['Nước trong, có thể tắm và câu cá', 'Đã khôi phục', 'Đã lấp', 'Ô nhiễm nặng, đang được làm sạch'], 3, 'Sông Tô Lịch ô nhiễm nặng do nước thải; nhiều dự án thử nghiệm làm sạch (Nhật, Hàn).',
      [
      '<b>Sông Tô Lịch</b> hiện đang <i>ô nhiễm nặng</i> do nước thải sinh hoạt đổ trực tiếp; nhiều dự án (hợp tác với Nhật, Hàn) đang <b>thử nghiệm làm sạch</b> dòng sông.',
      'Tô Lịch từng là dòng sông đẹp gắn với lịch sử Thăng Long.',
      '<ul><li>Làm sạch sông Tô Lịch là một thách thức lớn về môi trường đô thị.</li></ul>',
    ],
      ['Sai — sông còn ô nhiễm, chưa thể tắm hay câu cá.', 'Sai — sông chưa được khôi phục hoàn toàn.', 'Sai — sông chưa bị lấp, vẫn còn dòng chảy.', 'Đúng — sông Tô Lịch ô nhiễm nặng, đang có nhiều dự án làm sạch.']
    ),
    Q('HS có thể đóng góp?', ['Không cần', 'Đi xe buýt, không xả rác, trồng cây, tuyên truyền', 'Tăng xe cá nhân', 'Vô can'], 1, 'HS: đi xe buýt/đạp, không xả rác, trồng cây, tuyên truyền gia đình & bạn bè.',
      [
      '<b>Học sinh có thể góp phần bảo vệ môi trường</b> bằng những việc cụ thể: <i>đi xe buýt/xe đạp, không xả rác, trồng và chăm sóc cây, tuyên truyền</i> cho gia đình và bạn bè.',
      'Những hành động nhỏ, nếu nhiều người cùng làm, sẽ tạo nên thay đổi lớn.',
      '<ul><li>Bảo vệ môi trường là trách nhiệm của mọi công dân, gồm cả học sinh.</li></ul>',
    ],
      ['Sai — HS hoàn toàn có thể góp phần bảo vệ môi trường.', 'Đúng — HS có thể đi xe buýt, không xả rác, trồng cây và tuyên truyền.', 'Sai — tăng xe cá nhân làm ô nhiễm thêm.', 'Sai — bảo vệ môi trường là trách nhiệm của mọi người, gồm HS.']
    ),
  ]),

  M(32, 'Du lịch Hà Nội — Di sản và trải nghiệm', [
    Q('Di sản UNESCO tại HN?', ['Vịnh Hạ Long', 'Hoàng thành Thăng Long, Bia tiến sĩ Văn Miếu', 'Mỹ Sơn', 'Phong Nha'], 1, 'HN có 2 di sản UNESCO: Hoàng thành Thăng Long (2010 - di sản văn hoá), 82 bia tiến sĩ (2010 - di sản tư liệu).',
      [
      '<b>Di sản được UNESCO ghi danh tại Hà Nội</b>: <i>Khu trung tâm Hoàng thành Thăng Long</i> (Di sản Văn hoá Thế giới, 2010) và <i>82 bia tiến sĩ Văn Miếu</i> (Di sản Tư liệu thế giới, 2010).',
      'Hà Nội là một trong những địa phương giàu di sản bậc nhất Việt Nam.',
      '<ul><li>Phân biệt: Vịnh Hạ Long (Quảng Ninh), Mỹ Sơn (Quảng Nam), Phong Nha (Quảng Bình).</li></ul>',
    ],
      ['Sai — Vịnh Hạ Long ở Quảng Ninh, không phải HN.', 'Đúng — HN có Hoàng thành Thăng Long và 82 bia tiến sĩ Văn Miếu được UNESCO ghi nhận.', 'Sai — Mỹ Sơn ở Quảng Nam, không phải HN.', 'Sai — Phong Nha ở Quảng Bình, không phải HN.']
    ),
    Q('Điểm du lịch nổi tiếng?', ['Hồ Hoàn Kiếm, phố cổ, Văn Miếu, Lăng Bác, Chùa Một Cột', 'Chỉ hồ Hoàn Kiếm', 'Chỉ phố cổ', 'Chỉ Văn Miếu'], 0, 'HN có nhiều điểm: Hồ Hoàn Kiếm, phố cổ, Văn Miếu, Lăng Bác, Chùa Một Cột, hồ Tây…',
      [
      '<b>Các điểm du lịch nổi tiếng ở Hà Nội</b>: <i>hồ Hoàn Kiếm, khu phố cổ, Văn Miếu – Quốc Tử Giám, Lăng Chủ tịch Hồ Chí Minh, Chùa Một Cột, Hồ Tây</i>…',
      'Hà Nội hấp dẫn du khách bởi sự kết hợp giữa di sản, văn hoá và ẩm thực.',
      '<ul><li>Du lịch văn hoá – lịch sử là thế mạnh của Thủ đô.</li></ul>',
    ],
      ['Đúng — HN có nhiều điểm như Hồ Hoàn Kiếm, phố cổ, Văn Miếu, Lăng Bác, Chùa Một Cột.', 'Sai — HN có nhiều điểm du lịch, không chỉ Hồ Hoàn Kiếm.', 'Sai — ngoài phố cổ còn nhiều điểm khác.', 'Sai — ngoài Văn Miếu còn nhiều điểm nổi tiếng khác.']
    ),
    Q('Phố đi bộ Hồ Gươm?', ['Suốt tuần', 'Mở 24/7 nhưng vẫn cho xe máy đi', 'Hoạt động cuối tuần, không xe cộ', 'Chỉ ngày lễ'], 2, 'Phố đi bộ quanh Hồ Gươm hoạt động cuối tuần (tối thứ 6 đến chủ nhật).',
      [
      '<b>Phố đi bộ quanh hồ Hoàn Kiếm</b> hoạt động vào <i>cuối tuần (tối thứ Sáu đến hết Chủ nhật)</i>, <b>cấm xe cộ</b> để dành không gian cho người đi bộ và các hoạt động văn hoá.',
      'Đây là điểm sinh hoạt cộng đồng, biểu diễn nghệ thuật, trò chơi dân gian.',
      '<ul><li>Không gian đi bộ góp phần quảng bá văn hoá và nâng cao chất lượng sống đô thị.</li></ul>',
    ],
      ['Sai — phố đi bộ chủ yếu hoạt động vào cuối tuần.', 'Sai — phố đi bộ cấm xe cộ, không cho xe máy đi.', 'Đúng — phố đi bộ Hồ Gươm hoạt động cuối tuần, không có xe cộ.', 'Sai — phố đi bộ hoạt động cuối tuần, không chỉ ngày lễ.']
    ),
    Q('Du lịch HN cần?', ['Khoe khoang', 'Chỉ chụp ảnh check-in mà không tìm hiểu', 'Hiểu lịch sử, văn hoá, tôn trọng di tích', 'Vô tâm'], 2, 'Du lịch văn hoá: hiểu lịch sử + tôn trọng di tích + ứng xử văn minh.',
      [
      '<b>Du lịch văn hoá ở Hà Nội</b> đòi hỏi du khách <i>tìm hiểu lịch sử, văn hoá và tôn trọng di tích</i>, ứng xử văn minh.',
      'Du lịch có trách nhiệm giúp bảo tồn di sản và giữ hình ảnh đẹp cho Thủ đô.',
      '<ul><li>Không nên chỉ "check-in" mà bỏ qua giá trị văn hoá – lịch sử của điểm đến.</li></ul>',
    ],
      ['Sai — du lịch không phải để khoe khoang.', 'Sai — nên tìm hiểu giá trị chứ không chỉ chụp ảnh.', 'Đúng — du lịch HN cần hiểu lịch sử, văn hoá và tôn trọng di tích.', 'Sai — cần quan tâm, tôn trọng nơi mình đến, không vô tâm.']
    ),
    Q('Đóng góp của du lịch HN?', ['Chỉ đóng góp dưới 1% GRDP của HN', '~10% GRDP, tạo nhiều việc làm', 'Không đáng kể', 'Gây hại'], 1, 'Du lịch HN ~10% GRDP, tạo hàng trăm nghìn việc làm, quảng bá hình ảnh VN.',
      [
      '<b>Du lịch đóng góp khoảng <code>10% GRDP</code> của Hà Nội</b>, tạo nhiều việc làm và quảng bá hình ảnh đất nước.',
      'GRDP là tổng sản phẩm trên địa bàn — thước đo quy mô kinh tế của một địa phương.',
      '<ul><li>Du lịch là ngành kinh tế quan trọng, có tính lan toả cao.</li></ul>',
    ],
      ['Sai — du lịch đóng góp khoảng 10% GRDP, lớn hơn 1% nhiều.', 'Đúng — du lịch HN đóng góp khoảng 10% GRDP và tạo nhiều việc làm.', 'Sai — đóng góp của du lịch là đáng kể.', 'Sai — du lịch mang lại lợi ích kinh tế, không gây hại.']
    ),
  ]),

  M(33, 'Văn hoá HN ngày nay — Giới trẻ và sáng tạo', [
    Q('Giới trẻ HN ngày nay?', ['Chỉ Tây hoá', 'Vô bản sắc', 'Năng động, hiện đại nhưng vẫn yêu văn hoá truyền thống', 'Chỉ truyền thống'], 2, 'Giới trẻ HN: kết hợp hiện đại + giữ gìn truyền thống (lễ hội, áo dài, ẩm thực).',
      [
      '<b>Giới trẻ Hà Nội ngày nay</b> <i>năng động, hiện đại</i> nhưng vẫn <b>trân trọng và giữ gìn văn hoá truyền thống</b> (lễ hội, áo dài, ẩm thực…).',
      'Họ biết kết hợp hài hoà giữa hội nhập quốc tế và bản sắc dân tộc.',
      '<ul><li>Đây là thế hệ tiếp nối, gìn giữ và phát huy giá trị văn hoá Thủ đô.</li></ul>',
    ],
      ['Sai — giới trẻ HN vẫn giữ bản sắc, không chỉ Tây hoá.', 'Sai — giới trẻ HN vẫn trân trọng văn hoá truyền thống.', 'Đúng — giới trẻ HN năng động, hiện đại nhưng vẫn yêu văn hoá truyền thống.', 'Sai — giới trẻ HN cũng rất hiện đại, không chỉ truyền thống.']
    ),
    Q('Phong trào sáng tạo trẻ?', ['Chỉ tập trung học truyền thống', 'Khởi nghiệp công nghệ, nghệ thuật đường phố, fashion', 'Chỉ học', 'Sao chép'], 1, 'HN: khởi nghiệp công nghệ, nghệ thuật đường phố (graffiti, hiphop), fashion VN…',
      [
      '<b>Phong trào sáng tạo của giới trẻ Hà Nội</b> rất đa dạng: <i>khởi nghiệp công nghệ (startup), nghệ thuật đường phố (graffiti, hip-hop), thời trang Việt</i>…',
      'Hà Nội còn được UNESCO ghi danh là <b>Thành phố sáng tạo</b> (lĩnh vực thiết kế, năm 2019).',
      '<ul><li>Sáng tạo là động lực phát triển kinh tế – văn hoá đô thị.</li></ul>',
    ],
      ['Sai — giới trẻ sáng tạo nhiều lĩnh vực mới, không chỉ học truyền thống.', 'Đúng — gồm khởi nghiệp công nghệ, nghệ thuật đường phố và fashion.', 'Sai — giới trẻ còn sáng tạo nhiều hơn việc học.', 'Sai — đây là sáng tạo, không phải sao chép.']
    ),
    Q('Áo dài HN?', ['Chỉ mặc trong các nghi lễ cung đình xưa', 'Không liên quan HN', 'Quốc phục, mặc dịp lễ, Tết, sự kiện', 'Chỉ phụ nữ già'], 2, 'Áo dài: quốc phục VN, mặc dịp lễ Tết, sự kiện trang trọng — biểu tượng văn hoá HN.',
      [
      '<b>Áo dài</b> là <i>quốc phục của Việt Nam</i>, được mặc trong các dịp <b>lễ, Tết, sự kiện trang trọng</b> và gắn với nét thanh lịch của người Hà Nội.',
      'Ngày nay áo dài được mọi lứa tuổi yêu thích, có nhiều cách tân hiện đại.',
      '<ul><li>Áo dài là biểu tượng văn hoá, thể hiện vẻ đẹp truyền thống Việt.</li></ul>',
    ],
      ['Sai — áo dài được mặc rộng rãi ngày nay, không chỉ cung đình xưa.', 'Sai — áo dài là biểu tượng văn hoá gắn với HN và cả nước.', 'Đúng — áo dài là quốc phục, mặc dịp lễ, Tết, sự kiện trang trọng.', 'Sai — áo dài được mọi lứa tuổi mặc, không chỉ phụ nữ già.']
    ),
    Q('Lễ hội truyền thống HN?', ['Bỏ hết', 'Chỉ Tết', 'Hội Gióng, hội Đống Đa, hội chùa Hương', 'Chỉ còn duy nhất hội Đền Hùng'], 2, 'HN nhiều lễ hội: Gióng (UNESCO), Đống Đa, chùa Hương, Cổ Loa…',
      [
      '<b>Lễ hội truyền thống ở Hà Nội</b>: <i>hội Gióng</i> (Di sản văn hoá phi vật thể của nhân loại – UNESCO), <i>hội gò Đống Đa, hội chùa Hương, hội Cổ Loa</i>…',
      'Lễ hội là dịp gìn giữ phong tục, tín ngưỡng và gắn kết cộng đồng.',
      '<ul><li>Phân biệt: hội Đền Hùng ở Phú Thọ, không phải Hà Nội.</li></ul>',
    ],
      ['Sai — HN vẫn giữ nhiều lễ hội truyền thống.', 'Sai — HN có nhiều lễ hội ngoài Tết.', 'Đúng — HN có hội Gióng, hội Đống Đa, hội chùa Hương và nhiều lễ hội khác.', 'Sai — HN còn nhiều lễ hội; Đền Hùng ở Phú Thọ.']
    ),
    Q('Cân bằng hội nhập và bản sắc?', ['Sùng ngoại', 'Đóng cửa', 'Bài ngoại', 'Tiếp thu tinh hoa + giữ gìn bản sắc dân tộc'], 3, 'Hội nhập đúng cách: tiếp thu tinh hoa thế giới + giữ gìn bản sắc văn hoá VN.',
      [
      '<b>Cân bằng hội nhập và bản sắc</b>: vừa <i>tiếp thu tinh hoa văn hoá thế giới</i>, vừa <b>giữ gìn bản sắc văn hoá dân tộc</b>.',
      'Hội nhập không có nghĩa là sùng ngoại hay đánh mất cái riêng của mình.',
      '<ul><li>"Hoà nhập nhưng không hoà tan" là quan điểm về giữ gìn bản sắc.</li></ul>',
    ],
      ['Sai — sùng ngoại làm mất bản sắc dân tộc.', 'Sai — đóng cửa khiến đất nước tụt hậu.', 'Sai — bài ngoại khiến ta không học hỏi được tinh hoa thế giới.', 'Đúng — cần tiếp thu tinh hoa thế giới và giữ gìn bản sắc dân tộc.']
    ),
  ]),

  M(34, 'Trách nhiệm công dân HN — Xây dựng Thủ đô', [
    Q('Trách nhiệm HS HN?', ['Chỉ học', 'Chỉ chơi', 'Vô can', 'Học tốt, góp phần xây Thủ đô văn minh, hiện đại'], 3, 'HS HN: học tốt + sống văn minh + góp phần xây Thủ đô đẹp, hiện đại.',
      [
      '<b>Trách nhiệm của học sinh Hà Nội</b>: <i>học tập tốt</i>, sống văn minh và <b>góp phần xây dựng Thủ đô văn minh, hiện đại</b>.',
      'Mỗi học sinh là một công dân tương lai của Thủ đô nghìn năm văn hiến.',
      '<ul><li>Học giỏi đi đôi với rèn luyện đạo đức, lối sống đẹp.</li></ul>',
    ],
      ['Sai — HS còn cần sống văn minh và đóng góp cộng đồng, không chỉ học.', 'Sai — HS có trách nhiệm học tập và đóng góp, không chỉ chơi.', 'Sai — HS là một phần của Thủ đô, không vô can.', 'Đúng — HS cần học tốt và góp phần xây Thủ đô văn minh, hiện đại.']
    ),
    Q('Hành động văn minh đô thị?', ['Không vứt rác, xếp hàng, không ồn ào, giúp người già', 'Vứt rác', 'La hét', 'Chen lấn'], 0, 'Văn minh đô thị: không xả rác, xếp hàng, giúp người yếu thế, ứng xử lịch sự.',
      [
      '<b>Hành động văn minh đô thị</b>: <i>không xả rác, xếp hàng nơi công cộng, không gây ồn ào, giúp đỡ người già và người yếu thế</i>, ứng xử lịch sự.',
      'Văn minh đô thị thể hiện qua những việc làm nhỏ hằng ngày.',
      '<ul><li>"Người Tràng An" gắn với nếp sống thanh lịch, văn minh.</li></ul>',
    ],
      ['Đúng — không vứt rác, xếp hàng, không ồn ào và giúp người già là văn minh.', 'Sai — vứt rác là hành vi thiếu văn minh.', 'Sai — la hét nơi công cộng là thiếu văn minh.', 'Sai — chen lấn là hành vi thiếu văn minh.']
    ),
    Q('Tham gia hoạt động xã hội?', ['CLB, tình nguyện, phong trào trường lớp', 'Chỉ làm khi bắt buộc', 'Khoe khoang', 'Không tham gia'], 0, 'Tham gia tích cực: CLB, tình nguyện, phong trào → rèn kỹ năng + đóng góp cộng đồng.',
      [
      '<b>Tham gia hoạt động xã hội</b>: học sinh nên tích cực tham gia <i>câu lạc bộ, hoạt động tình nguyện, phong trào trường lớp</i> để rèn kĩ năng và đóng góp cho cộng đồng.',
      'Hoạt động tập thể giúp phát triển kĩ năng giao tiếp, hợp tác, lãnh đạo.',
      '<ul><li>Tinh thần tình nguyện là nét đẹp của tuổi trẻ Thủ đô.</li></ul>',
    ],
      ['Đúng — tham gia CLB, tình nguyện, phong trào giúp rèn kỹ năng và đóng góp.', 'Sai — nên tham gia tự nguyện, không chỉ khi bắt buộc.', 'Sai — tham gia để đóng góp, không phải để khoe khoang.', 'Sai — không tham gia thì mất cơ hội rèn luyện và đóng góp.']
    ),
    Q('Tự hào về HN?', ['Sao chép', 'Chỉ hình thức', 'Không cần', 'Hiểu lịch sử, văn hoá, giới thiệu với bạn bè quốc tế'], 3, 'Tự hào HN: hiểu lịch sử-văn hoá, giới thiệu với bạn bè trong và ngoài nước.',
      [
      '<b>Tự hào về Hà Nội</b> bắt nguồn từ việc <i>hiểu biết lịch sử, văn hoá</i> của Thủ đô và <b>giới thiệu, lan toả</b> những giá trị ấy với bạn bè trong và ngoài nước.',
      'Tự hào chân chính đi liền với hành động giữ gìn và phát huy giá trị quê hương.',
      '<ul><li>Mỗi người dân là một "đại sứ" quảng bá hình ảnh Hà Nội.</li></ul>',
    ],
      ['Sai — tự hào thực chất không phải sao chép.', 'Sai — tự hào cần xuất phát từ hiểu biết, không chỉ hình thức.', 'Sai — tự hào về quê hương là điều nên có.', 'Đúng — tự hào HN là hiểu lịch sử, văn hoá và giới thiệu với bạn bè quốc tế.']
    ),
    Q('Tầm nhìn HN đến 2030-2045?', ['Tự do tuyệt đối', 'Lạc hậu', 'Đóng cửa', 'Thủ đô xanh, văn hiến, văn minh, hiện đại'], 3, 'Tầm nhìn HN: Thủ đô xanh, văn hiến, văn minh, hiện đại — kết hợp truyền thống + hiện đại.',
      [
      '<b>Tầm nhìn phát triển Hà Nội đến 2030–2045</b>: trở thành <i>Thủ đô "Văn hiến – Văn minh – Hiện đại"</i>, xanh, thông minh, đáng sống.',
      'Đây là định hướng kết hợp giữa giữ gìn truyền thống và phát triển hiện đại.',
      '<ul><li>Mục tiêu hướng tới một Thủ đô phát triển bền vững và hội nhập.</li></ul>',
    ],
      ['Sai — đây không phải tầm nhìn phát triển của HN.', 'Sai — HN hướng tới hiện đại, không lạc hậu.', 'Sai — HN hội nhập, không đóng cửa.', 'Đúng — tầm nhìn HN là Thủ đô xanh, văn hiến, văn minh, hiện đại.']
    ),
  ]),

  M(35, 'Ôn tập cuối năm', [
    Q('Pháp đánh HN lần 2 (1882) tổng đốc?', ['Hoàng Diệu', 'Nguyễn Tri Phương', 'Tôn Thất Thuyết', 'Đề Thám'], 0, '1882.',
      [
      '<b>Ôn tập:</b> khi Pháp đánh Hà Nội <i>lần thứ hai năm 1882</i>, Tổng đốc <code>Hoàng Diệu</code> chỉ huy giữ thành và tuẫn tiết khi thành thất thủ.',
      'Phân biệt với năm 1873 (Nguyễn Tri Phương) là nội dung trọng tâm cần ghi nhớ.',
      '<ul><li>1873 – Nguyễn Tri Phương; 1882 – Hoàng Diệu.</li></ul>',
    ],
      ['Đúng — Hoàng Diệu là Tổng đốc HN khi Pháp đánh lần 2 (1882).', 'Sai — Nguyễn Tri Phương gắn với lần 1 (1873).', 'Sai — Tôn Thất Thuyết hoạt động ở Huế.', 'Sai — Đề Thám lãnh đạo khởi nghĩa Yên Thế.']
    ),
    Q('Đông Kinh Nghĩa Thục thành lập?', ['1907', '1885', '1908', '1900'], 0, 'HN, phố Hàng Đào.',
      [
      '<b>Ôn tập:</b> <i>Đông Kinh Nghĩa Thục</i> được thành lập năm <code>1907</code> tại phố Hàng Đào, Hà Nội.',
      'Trường dạy chữ Quốc ngữ, kiến thức mới và đề cao tinh thần yêu nước, canh tân.',
      '<ul><li>Người sáng lập tiêu biểu: Lương Văn Can, Nguyễn Quyền.</li></ul>',
    ],
      ['Đúng — Đông Kinh Nghĩa Thục lập năm 1907 ở phố Hàng Đào, HN.', 'Sai — 1885 là năm phong trào Cần Vương.', 'Sai — 1908 là năm vụ Hà thành đầu độc.', 'Sai — trường lập năm 1907, không phải 1900.']
    ),
    Q('Vụ Hà thành đầu độc?', ['1908', '1907', '1885', '1873'], 0, 'Liên kết Đề Thám.',
      [
      '<b>Ôn tập:</b> <i>vụ Hà thành đầu độc</i> xảy ra năm <code>1908</code>, có sự liên kết với nghĩa quân <b>Yên Thế của Đề Thám</b>.',
      'Kế hoạch đầu độc lính Pháp rồi đánh úp thành đã bị bại lộ và thất bại.',
      '<ul><li>Mốc: 1907 (Đông Kinh Nghĩa Thục) – 1908 (Hà thành đầu độc).</li></ul>',
    ],
      ['Đúng — vụ Hà thành đầu độc xảy ra năm 1908, liên kết Đề Thám.', 'Sai — 1907 là năm lập Đông Kinh Nghĩa Thục.', 'Sai — 1885 là năm phong trào Cần Vương.', 'Sai — 1873 là năm Pháp đánh HN lần 1.']
    ),
    Q('Tác phẩm "Vang bóng một thời"?', ['Nam Cao', 'Nguyễn Tuân', 'Ngô Tất Tố', 'Thạch Lam'], 1, '1940.',
      [
      '<b>Ôn tập:</b> tác phẩm <i>"Vang bóng một thời"</i> (1940) là của nhà văn <code>Nguyễn Tuân</code>.',
      'Phân biệt với "Hà Nội băm sáu phố phường" (Thạch Lam) và "Tắt đèn" (Ngô Tất Tố).',
      '<ul><li>Nguyễn Tuân là bậc thầy tuỳ bút của văn học Việt Nam.</li></ul>',
    ],
      ['Sai — Nam Cao viết "Chí Phèo", "Lão Hạc".', 'Đúng — "Vang bóng một thời" là của Nguyễn Tuân (1940).', 'Sai — Ngô Tất Tố viết "Tắt đèn".', 'Sai — Thạch Lam viết "Hà Nội 36 phố phường".']
    ),
    Q('Bia tiến sĩ Văn Miếu có?', ['82 bia', '1000', '10', '100'], 0, 'Di sản tư liệu UNESCO 2010.',
      [
      '<b>Ôn tập:</b> tại Văn Miếu hiện còn <code>82 bia tiến sĩ</code>, được UNESCO công nhận là <i>Di sản Tư liệu thế giới năm 2010</i>.',
      'Bia tiến sĩ ghi danh các vị đỗ đạt từ năm 1442 đến 1779, thể hiện truyền thống hiếu học.',
      '<ul><li>"Hiền tài là nguyên khí quốc gia" — tinh thần của Văn Miếu – Quốc Tử Giám.</li></ul>',
    ],
      ['Đúng — Văn Miếu có 82 bia tiến sĩ, di sản tư liệu UNESCO 2010.', 'Sai — số bia là 82, không tới 1000.', 'Sai — số bia là 82, nhiều hơn 10.', 'Sai — số bia chính xác là 82, không phải 100.']
    ),
  ]),

  M(36, 'Kết thúc GD Địa Phương 8 — Hà Nội ngàn năm trong tim', [
    Q('Hoàng thành Thăng Long được UNESCO công nhận là Di sản Văn hoá Thế giới vào năm nào?',
      ['1999', '2019', '2010', '2009'],
      2,
      'Hoàng thành Thăng Long được UNESCO ghi danh năm 2010, đúng dịp 1000 năm Thăng Long - Hà Nội.',
      ['Hà Nội có nhiều danh hiệu UNESCO, rất dễ lẫn năm. Hãy gắn mỗi danh hiệu với <b>mốc thời gian</b> của nó.',
       '<ul><li><b>1999</b> — "Thành phố vì hoà bình"</li><li><b>2009</b> — <b>Ca trù</b>, di sản phi vật thể cần bảo vệ khẩn cấp</li><li><b>2010</b> — <b>Hoàng thành Thăng Long</b> (Di sản Văn hoá Thế giới) và <b>82 bia Tiến sĩ</b> Văn Miếu (Di sản tư liệu thế giới)</li><li><b>2019</b> — "Thành phố sáng tạo" lĩnh vực Thiết kế</li></ul>',
       'Năm 2010 là dịp <b>đại lễ 1000 năm Thăng Long - Hà Nội</b> (1010–2010), nên hai danh hiệu được ghi danh cùng năm ấy.'],
      ['Sai — 1999 là năm nhận danh hiệu "Thành phố vì hoà bình".',
       'Sai — 2019 là năm vào Mạng lưới các thành phố sáng tạo.',
       'Đúng — năm 2010, đúng dịp 1000 năm Thăng Long - Hà Nội.',
       'Sai — 2009 là năm ca trù được ghi danh.']),
    Q('Ai là vị Tổng đốc đã tuẫn tiết khi thành Hà Nội thất thủ trước quân Pháp năm 1882?',
      ['Nguyễn Tri Phương', 'Hoàng Diệu', 'Tôn Thất Thuyết', 'Phan Đình Phùng'],
      1,
      'Tổng đốc Hoàng Diệu tự vẫn trước Võ Miếu năm 1882 để giữ khí tiết.',
      ['Hai lần Pháp đánh thành Hà Nội gắn với hai vị tướng khác nhau — đây là chi tiết thường bị nhớ lẫn.',
       '<ul><li><b>1873</b> — <b>Nguyễn Tri Phương</b> chỉ huy bảo vệ thành, bị thương và tuyệt thực đến chết, không nhận thuốc của Pháp</li><li><b>1882</b> — Tổng đốc <b>Hoàng Diệu</b> chống cự quyết liệt; thành vỡ, ông <i>tự vẫn trước Võ Miếu</i></li></ul>',
       'Hành động của Hoàng Diệu biểu trưng cho tinh thần <b>"thành mất, tướng chết theo thành"</b>. Ngày nay tên ông được đặt cho nhiều đường phố và trường học ở Hà Nội và cả nước.'],
      ['Sai — Nguyễn Tri Phương hi sinh trong lần Pháp đánh thành năm 1873.',
       'Đúng — Tổng đốc Hoàng Diệu tuẫn tiết năm 1882.',
       'Sai — Tôn Thất Thuyết gắn với phong trào Cần Vương.',
       'Sai — Phan Đình Phùng lãnh đạo khởi nghĩa Hương Khê.']),
    Q('Chiến thắng nào của quân dân Hà Nội tháng 12/1972 được gọi là "Điện Biên Phủ trên không"?',
      ['Chiến thắng trong Cách mạng Tháng Tám', 'Chiến thắng 60 ngày đêm bảo vệ Thủ đô', 'Chiến thắng Đống Đa', 'Chiến thắng đánh bại chiến dịch ném bom B-52 của Mỹ'],
      3,
      'Trong 12 ngày đêm 18–29/12/1972, quân dân Hà Nội bắn hạ 81 máy bay, trong đó 34 chiếc B-52.',
      ['Tháng 12/1972, Mỹ mở chiến dịch <b>Linebacker II</b> ném bom huỷ diệt Hà Nội và các thành phố miền Bắc nhằm khuất phục Việt Nam.',
       'Kết quả 12 ngày đêm (<b>18–29/12/1972</b>):<ul><li>bắn hạ <b>81 máy bay</b>, trong đó <b>34 chiếc B-52</b> — loại "siêu pháo đài bay" vốn được coi là bất khả chiến bại</li><li>buộc Mỹ trở lại bàn đàm phán và kí <b>Hiệp định Paris (27/1/1973)</b></li></ul>',
       'Được gọi là "Điện Biên Phủ trên không" vì <i>tầm vóc lịch sử tương đương</i> chiến thắng Điện Biên Phủ 1954. Các mốc khác của Hà Nội: <b>19/8/1945</b> Cách mạng Tháng Tám, <b>19/12/1946</b> mở đầu Toàn quốc kháng chiến với "60 ngày đêm" giữ Thủ đô.'],
      ['Sai — Cách mạng Tháng Tám là 19/8/1945.',
       'Sai — "60 ngày đêm" là cuối năm 1946 - đầu 1947.',
       'Sai — Đống Đa là chiến thắng của Quang Trung năm 1789.',
       'Đúng — đánh bại chiến dịch ném bom B-52 tháng 12/1972.']),
    Q('Đâu là THÁCH THỨC lớn của Hà Nội hôm nay?',
      ['Ô nhiễm không khí, ùn tắc giao thông và áp lực đô thị hoá', 'Thiếu di sản văn hoá', 'Dân số giảm nhanh', 'Không thu hút được đầu tư nước ngoài'],
      0,
      'Hà Nội đối mặt với ô nhiễm không khí, ùn tắc giao thông và áp lực đô thị hoá, quản lí di sản đô thị.',
      ['Hà Nội hôm nay có cả <b>cơ hội</b> lẫn <b>thách thức</b> — nhìn đủ hai mặt mới hiểu đúng thành phố mình đang sống.',
       '<b>Cơ hội</b>:<ul><li>tăng trưởng kinh tế mạnh, thu hút đầu tư nước ngoài</li><li>khu công nghệ cao (Hoà Lạc), hội nhập quốc tế sâu rộng</li></ul><b>Thách thức</b>:<ul><li><b>ô nhiễm không khí</b> — AQI thường ở mức không tốt cho sức khoẻ vào mùa đông</li><li><b>ùn tắc giao thông</b></li><li><b>áp lực đô thị hoá</b> và việc quản lí di sản đô thị</li></ul>',
       'Định hướng: Hà Nội hướng tới <b>"Thành phố thông minh"</b> — metro và giao thông công cộng xanh, năng lượng tái tạo, quản lí đô thị bằng công nghệ.'],
      ['Đúng — đó là ba thách thức lớn nhất hiện nay.',
       'Sai — Hà Nội rất giàu di sản, vấn đề là giữ gìn chúng.',
       'Sai — dân số Hà Nội đang tăng do nhập cư và đô thị hoá.',
       'Sai — Hà Nội là một trong những điểm hút FDI lớn nhất nước.']),
    Q('Việc làm nào của học sinh góp phần giảm ô nhiễm không khí ở Hà Nội?',
      ['Đốt rác và rơm rạ cho gọn', 'Đi xe đạp hoặc đi bộ tới trường khi nhà gần, nhắc gia đình không đốt rác', 'Đóng kín cửa suốt ngày', 'Chỉ cần đeo khẩu trang là đủ'],
      1,
      'Giảm phát thải từ chính sinh hoạt hằng ngày mới là gốc; khẩu trang chỉ bảo vệ bản thân.',
      ['Ô nhiễm không khí Hà Nội đến từ nhiều nguồn: <b>khí thải xe máy, ô tô</b>, <b>khói đốt rơm rạ và rác</b>, <b>bụi xây dựng</b> và công nghiệp.',
       'Là học sinh, em góp phần được bằng những việc rất cụ thể:<ul><li><b>đi xe đạp hoặc đi bộ</b> tới trường nếu trong bán kính 2–3 km</li><li><b>nhắc gia đình không đốt rác, không đốt rơm rạ</b></li><li><b>trồng cây xanh</b> quanh nhà — cây hấp thụ CO₂ và bụi</li><li>theo dõi chỉ số <b>AQI</b> và đeo khẩu trang vào ngày ô nhiễm cao</li><li>tuyên truyền cho bạn bè và gia đình</li></ul>',
       'Khẩu trang chỉ <i>bảo vệ bản thân</i> khỏi bụi, nó không làm không khí sạch hơn. Muốn không khí sạch phải <b>giảm nguồn phát thải</b>.'],
      ['Sai — đốt rác và rơm rạ chính là một nguồn ô nhiễm lớn.',
       'Đúng — giảm phát thải từ chính sinh hoạt hằng ngày.',
       'Sai — đóng cửa chỉ tránh bụi tạm thời, không giảm ô nhiễm.',
       'Sai — khẩu trang bảo vệ bản thân nhưng không làm sạch không khí.']),
    Q('Trách nhiệm nào của học sinh Hà Nội thể hiện việc giữ gìn di sản?',
      ['Sưu tầm mảnh gạch cổ ở di tích làm kỉ niệm', 'Chỉ tham quan di tích vào dịp lễ', 'Không viết vẽ bậy, không xả rác tại di tích và phản đối hành vi phá hoại', 'Giữ im lặng khi thấy bạn khắc tên lên bia đá'],
      2,
      'Giữ gìn di sản là không xâm hại di tích và dám phản đối hành vi phá hoại.',
      ['Hà Nội là <b>di sản ngàn năm</b> mà các thế hệ đi trước gìn giữ và trao lại — giữ gìn nó là trách nhiệm của chính học sinh hôm nay.',
       'Những việc cụ thể:<ul><li><b>không viết vẽ bậy, không xả rác</b> tại di tích; <b>phản đối</b> hành vi phá hoại</li><li>ứng xử <b>văn minh thanh lịch</b> — đúng giờ, trật tự, nhường đường, thân thiện</li><li>bảo vệ môi trường — phân loại rác, ưu tiên xe đạp và xe điện</li><li>tìm hiểu và <b>tự hào</b> về lịch sử, văn hoá Thăng Long - Hà Nội</li></ul>',
       'Lấy đi một mảnh gạch cổ hay im lặng trước hành vi khắc tên lên bia đá đều là <i>làm tổn hại di sản</i> — dù chỉ là "một mảnh nhỏ" hay "chỉ một lần".'],
      ['Sai — lấy hiện vật khỏi di tích là làm tổn hại di sản.',
       'Sai — tham quan nhiều hay ít không phải là giữ gìn di sản.',
       'Đúng — không xâm hại di tích và dám phản đối hành vi phá hoại.',
       'Sai — im lặng trước hành vi phá hoại là gián tiếp cho phép nó xảy ra.']),
  ]),
];

export const S8GDDP_SCENARIOS = indexBy(S8GDDP_WEEKS);
