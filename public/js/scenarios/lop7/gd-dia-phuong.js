// ============================================================
// Lớp 7 · GIÁO DỤC ĐỊA PHƯƠNG (Hà Nội) — 35 tuần
// Bám Tài liệu GDĐP Hà Nội lớp 7 · Sở GDĐT Hà Nội (CT GDPT 2018).
// Chủ đề: Lịch sử địa phương trung đại · Danh nhân · Di tích · Lễ hội ·
//         Làng nghề · Ẩm thực · Phương ngữ.
// 1 tiết/tuần · HK1: T1–18 · HK2: T19–35 · ID prefix: "S7GDDP-wNN-quiz".
// ============================================================
import { Q, W, indexBy } from './_helper.js';

const M = (n, title, qs, opts) => W('S7GDDP', 'gd-dia-phuong', n, title, qs, opts);

export const S7GDDP_WEEKS = [
  // ===== HK1 — LỊCH SỬ TRUNG ĐẠI THĂNG LONG — HÀ NỘI =====
  M(1, 'Thăng Long thời Lý — kinh đô đầu tiên', [
    Q('Năm nào Lý Công Uẩn dời đô về Đại La?', ['1226', '1428', '1010', '938'], 2, 'Lý Thái Tổ dời đô năm 1010 và đổi tên Thăng Long.',
      [
        '<b>Dời đô năm 1010:</b> mùa thu năm <code>1010</code>, vua <b>Lý Công Uẩn (Lý Thái Tổ)</b> rời kinh đô từ <code>Hoa Lư</code> (Ninh Bình) ra thành <code>Đại La</code>.',
        'Tương truyền khi thuyền cập bến, vua thấy <i>rồng vàng bay lên</i> nên đặt tên kinh đô mới là <b>Thăng Long</b> — nghĩa là "rồng bay lên".',
        '<ul><li>Mở ra thời kì phát triển rực rỡ của Thăng Long — Hà Nội.</li><li>Năm 2010 là dịp <b>Đại lễ 1000 năm Thăng Long — Hà Nội</b>.</li></ul>',
      ],
      [
        'Sai — <code>1226</code> là năm nhà Trần thay nhà Lý, không phải năm dời đô. Đáp án đúng là <b>1010</b> vì Lý Thái Tổ dời đô năm 1010 và đổi tên Thăng Long.',
        'Sai — <code>1428</code> là năm Lê Lợi lên ngôi sau khởi nghĩa Lam Sơn. Đáp án đúng là <b>1010</b> vì Lý Thái Tổ dời đô năm 1010 và đổi tên Thăng Long.',
        'Đúng — <b>1010</b> là năm Lý Công Uẩn dời đô về Đại La và đổi tên thành Thăng Long.',
        'Sai — <code>938</code> là năm Ngô Quyền thắng quân Nam Hán trên sông Bạch Đằng. Đáp án đúng là <b>1010</b> vì Lý Thái Tổ dời đô năm 1010 và đổi tên Thăng Long.',
      ]
    ),
    Q('"Chiếu dời đô" do ai viết?', ['Nguyễn Trãi', 'Trần Hưng Đạo', 'Lê Lợi', 'Lý Công Uẩn'], 3, '"Chiếu dời đô" do chính Lý Thái Tổ ban.',
      [
        '<b>"Chiếu dời đô" (Thiên đô chiếu)</b> do chính vua <b>Lý Công Uẩn</b> soạn và ban hành năm <code>1010</code>.',
        'Bài chiếu lập luận rằng Hoa Lư chật hẹp, không xứng là nơi đóng đô lâu dài; còn Đại La <i>"ở giữa khu vực trời đất, được thế rồng cuộn hổ ngồi"</i>.',
        '<ul><li>Đây là một <b>áng văn chính luận</b> nổi tiếng, thể hiện tầm nhìn xa của vị vua khai sáng triều Lý.</li></ul>',
      ],
      [
        'Sai — <code>Nguyễn Trãi</code> sống ở thời Lê sơ (thế kỉ XV), viết "Bình Ngô đại cáo". Đáp án đúng là <b>Lý Công Uẩn</b> vì "Chiếu dời đô" do chính Lý Thái Tổ ban.',
        'Sai — <code>Trần Hưng Đạo</code> là danh tướng thời Trần, soạn "Hịch tướng sĩ". Đáp án đúng là <b>Lý Công Uẩn</b> vì "Chiếu dời đô" do chính Lý Thái Tổ ban.',
        'Sai — <code>Lê Lợi</code> là vị vua thời Lê sơ (thế kỉ XV). Đáp án đúng là <b>Lý Công Uẩn</b> vì "Chiếu dời đô" do chính Lý Thái Tổ ban.',
        'Đúng — <b>Lý Công Uẩn (Lý Thái Tổ)</b> chính là tác giả của "Chiếu dời đô" năm 1010.',
      ]
    ),
    Q('Lý do chính chọn Đại La làm kinh đô?', ['Vị trí trung tâm, đất bằng, sông núi tụ hội', 'Ở vùng núi cao', 'Có biển', 'Gần biên giới'], 0, 'Đại La có vị trí thuận lợi để phát triển kinh tế, an ninh.',
      [
        'Theo "Chiếu dời đô", <b>Đại La</b> được chọn vì hội tụ nhiều thế mạnh: nằm ở <i>trung tâm đất nước</i>, đất đai bằng phẳng, cao ráo, lại có sông núi bao bọc.',
        '<ul><li>Vị trí <code>"thế rồng cuộn hổ ngồi"</code> — vừa thuận lợi giao thương, vừa dễ phòng thủ.</li><li>Đồng bằng phù sa sông Hồng màu mỡ, dân cư đông đúc, kinh tế phát triển.</li></ul>',
        'So với Hoa Lư núi non hiểm trở chỉ hợp phòng thủ, Đại La phù hợp để <b>phát triển lâu dài</b>.',
      ],
      [
        'Đúng — Đại La có <b>vị trí trung tâm, đất bằng, sông núi tụ hội</b>, thuận lợi cho phát triển kinh tế và an ninh.',
        'Sai — Đại La <i>không</i> ở vùng núi cao mà ở đồng bằng. Đáp án đúng là <b>vị trí trung tâm, đất bằng, sông núi tụ hội</b> vì đó là lí do chính được nêu trong Chiếu dời đô.',
        'Sai — Đại La nằm sâu trong đất liền, <i>không</i> giáp biển. Đáp án đúng là <b>vị trí trung tâm, đất bằng, sông núi tụ hội</b> vì Đại La có vị trí thuận lợi để phát triển kinh tế, an ninh.',
        'Sai — Đại La ở trung tâm đất nước chứ không gần biên giới. Đáp án đúng là <b>vị trí trung tâm, đất bằng, sông núi tụ hội</b> vì Đại La có vị trí thuận lợi để phát triển kinh tế, an ninh.',
      ]
    ),
    Q('Kinh đô Thăng Long thời Lý có bao nhiêu vòng thành?', ['2', '1', '3 (Cấm thành, Hoàng thành, Đại La thành)', '5'], 2, 'Thăng Long có 3 vòng thành: cấm thành — hoàng thành — đại la thành.',
      [
        '<b>Cấu trúc "tam trùng thành quách":</b> Thăng Long thời Lý — Trần được xây theo <code>3 vòng thành</code> đồng tâm.',
        '<ul><li><b>Cấm thành</b> (Long Phượng thành): khu vực ở của vua và hoàng tộc.</li><li><b>Hoàng thành</b>: nơi đặt cung điện, triều đình làm việc.</li><li><b>Đại La thành (La thành / Kinh thành)</b>: vòng ngoài cùng, nơi dân cư sinh sống.</li></ul>',
      ],
      [
        'Sai — chỉ <code>2</code> vòng là thiếu một lớp. Đáp án đúng là <b>3 (Cấm thành, Hoàng thành, Đại La thành)</b> theo cấu trúc tam trùng thành quách.',
        'Sai — <code>1</code> vòng thành không phản ánh cấu trúc kinh đô. Đáp án đúng là <b>3 (Cấm thành, Hoàng thành, Đại La thành)</b>.',
        'Đúng — Thăng Long có <b>3 vòng thành</b>: Cấm thành, Hoàng thành và Đại La thành.',
        'Sai — <code>5</code> vòng là quá nhiều. Đáp án đúng là <b>3 (Cấm thành, Hoàng thành, Đại La thành)</b> theo mô hình tam trùng thành quách.',
      ]
    ),
    Q('Quốc hiệu Đại Việt được đặt vào năm?', ['1054', '1226', '1010', '1400'], 0, 'Năm 1054, Lý Thánh Tông đổi quốc hiệu là Đại Việt.',
      [
        '<b>Quốc hiệu Đại Việt:</b> năm <code>1054</code>, vua <b>Lý Thánh Tông</b> lên ngôi và đổi tên nước thành <b>Đại Việt</b>.',
        '<ul><li>Trước đó, dưới thời Đinh — Tiền Lê — đầu Lý, quốc hiệu là <code>Đại Cồ Việt</code>.</li><li>Tên "Đại Việt" được dùng xuyên suốt các triều Lý, Trần, Lê (trừ giai đoạn nhà Hồ đổi thành Đại Ngu).</li></ul>',
      ],
      [
        'Đúng — năm <b>1054</b>, Lý Thánh Tông đổi quốc hiệu nước ta thành Đại Việt.',
        'Sai — <code>1226</code> là năm nhà Trần thành lập. Đáp án đúng là <b>1054</b> vì năm 1054 Lý Thánh Tông đổi quốc hiệu là Đại Việt.',
        'Sai — <code>1010</code> là năm dời đô, quốc hiệu khi đó vẫn là Đại Cồ Việt. Đáp án đúng là <b>1054</b> vì năm 1054 Lý Thánh Tông đổi quốc hiệu là Đại Việt.',
        'Sai — <code>1400</code> là năm Hồ Quý Ly lập nhà Hồ. Đáp án đúng là <b>1054</b> vì năm 1054 Lý Thánh Tông đổi quốc hiệu là Đại Việt.',
      ]
    ),
  ]),

  M(2, 'Văn Miếu — Quốc Tử Giám: Trường đại học đầu tiên Việt Nam', [
    Q('Văn Miếu được xây năm?', ['1070', '1226', '1010', '1428'], 0, 'Lý Thánh Tông xây Văn Miếu năm 1070 thờ Khổng Tử.',
      [
        '<b>Văn Miếu</b> được xây dựng năm <code>1070</code> dưới thời vua <b>Lý Thánh Tông</b>, để thờ <i>Khổng Tử</i>, Chu Công và các bậc tiên hiền Nho học.',
        '<ul><li>Là biểu tượng của truyền thống <b>hiếu học</b> và <b>tôn sư trọng đạo</b> của dân tộc.</li><li>Quần thể Văn Miếu — Quốc Tử Giám nằm ở phía nam Hoàng thành Thăng Long.</li></ul>',
      ],
      [
        'Đúng — <b>1070</b> là năm Lý Thánh Tông cho xây Văn Miếu để thờ Khổng Tử.',
        'Sai — <code>1226</code> là năm nhà Trần thành lập. Đáp án đúng là <b>1070</b> vì Lý Thánh Tông xây Văn Miếu năm 1070.',
        'Sai — <code>1010</code> là năm dời đô về Thăng Long. Đáp án đúng là <b>1070</b> vì Văn Miếu được xây năm 1070.',
        'Sai — <code>1428</code> là năm Lê Lợi lên ngôi. Đáp án đúng là <b>1070</b> vì Lý Thánh Tông xây Văn Miếu năm 1070.',
      ]
    ),
    Q('Quốc Tử Giám được lập năm?', ['1010', '1070', '1076', '1428'], 2, 'Quốc Tử Giám lập năm 1076 thời Lý Nhân Tông.',
      [
        '<b>Quốc Tử Giám</b> được lập năm <code>1076</code> dưới thời vua <b>Lý Nhân Tông</b>, ngay cạnh Văn Miếu.',
        '<ul><li>Được coi là <b>trường đại học đầu tiên của Việt Nam</b>.</li><li>Ban đầu dạy con vua quan, về sau mở rộng cho nhân tài cả nước.</li></ul>',
        'Cụm di tích <b>Văn Miếu — Quốc Tử Giám</b> là minh chứng cho nền giáo dục Nho học lâu đời của Thăng Long.',
      ],
      [
        'Sai — <code>1010</code> là năm dời đô. Đáp án đúng là <b>1076</b> vì Quốc Tử Giám lập năm 1076 thời Lý Nhân Tông.',
        'Sai — <code>1070</code> là năm xây Văn Miếu, còn Quốc Tử Giám lập sau đó. Đáp án đúng là <b>1076</b>.',
        'Đúng — <b>1076</b> là năm lập Quốc Tử Giám dưới thời Lý Nhân Tông.',
        'Sai — <code>1428</code> là năm Lê Lợi lên ngôi. Đáp án đúng là <b>1076</b> vì Quốc Tử Giám lập năm 1076 thời Lý Nhân Tông.',
      ]
    ),
    Q('Quốc Tử Giám ban đầu dạy cho?', ['Toàn dân', 'Chỉ thợ thủ công', 'Con vua quan', 'Chỉ phụ nữ'], 2, 'Ban đầu chỉ dạy con vua quan, sau mở rộng nhân tài.',
      [
        'Khi mới lập (1076), <b>Quốc Tử Giám</b> chỉ dành cho <b>con vua quan</b>, hoàng tộc và quý tộc — gọi là "quốc tử".',
        '<ul><li>Về sau, nhà trường <i>mở rộng</i> nhận cả con em thường dân học giỏi.</li><li>Đây là nơi đào tạo nhân tài cho triều đình suốt nhiều thế kỉ.</li></ul>',
      ],
      [
        'Sai — ban đầu Quốc Tử Giám chưa dạy <code>toàn dân</code> mà chỉ mở rộng dần. Đáp án đúng là <b>con vua quan</b> vì ban đầu chỉ dạy con vua quan, sau mới mở rộng.',
        'Sai — Quốc Tử Giám là trường Nho học, không dành riêng cho <code>thợ thủ công</code>. Đáp án đúng là <b>con vua quan</b>.',
        'Đúng — ban đầu Quốc Tử Giám chỉ dạy <b>con vua quan</b>, sau mới mở rộng cho nhân tài cả nước.',
        'Sai — thời phong kiến phụ nữ không được đi học, nên không thể <code>chỉ phụ nữ</code>. Đáp án đúng là <b>con vua quan</b>.',
      ]
    ),
    Q('Bia Tiến sĩ Văn Miếu khắc tên?', ['Thầy thuốc', 'Các tiến sĩ qua các khoa thi', 'Vua chúa', 'Tướng lĩnh'], 1, 'Khắc tên 1307 tiến sĩ qua 82 khoa thi.',
      [
        '<b>Bia Tiến sĩ</b> ở Văn Miếu khắc tên, quê quán những người <b>đỗ tiến sĩ</b> qua các khoa thi thời Lê — Mạc.',
        '<ul><li>Có <code>82 tấm bia</code>, khắc tên <code>1307 tiến sĩ</code> của 82 khoa thi (từ 1442 đến 1779).</li><li>Mỗi bia đặt trên lưng một con <i>rùa đá</i> — biểu tượng trường tồn.</li></ul>',
        'Năm 2010, bia Tiến sĩ được UNESCO ghi danh là <b>Di sản tư liệu thế giới</b>.',
      ],
      [
        'Sai — bia không khắc tên <code>thầy thuốc</code>. Đáp án đúng là <b>các tiến sĩ qua các khoa thi</b> — khắc tên 1307 tiến sĩ qua 82 khoa thi.',
        'Đúng — Bia Tiến sĩ khắc tên <b>các tiến sĩ qua các khoa thi</b>, tổng cộng 1307 người trên 82 tấm bia.',
        'Sai — bia ghi danh người đỗ đạt, không phải <code>vua chúa</code>. Đáp án đúng là <b>các tiến sĩ qua các khoa thi</b>.',
        'Sai — bia ghi danh khoa bảng văn học, không phải <code>tướng lĩnh</code>. Đáp án đúng là <b>các tiến sĩ qua các khoa thi</b>.',
      ]
    ),
    Q('Khuê Văn Các xây thời nào?', ['Thời Nguyễn (1805)', 'Thời Pháp thuộc', 'Thời Trần', 'Thời Lý'], 0, 'Khuê Văn Các xây năm 1805 thời Gia Long.',
      [
        '<b>Khuê Văn Các</b> được xây dựng năm <code>1805</code> dưới thời <b>nhà Nguyễn</b> (đời vua Gia Long), do Tổng trấn Bắc thành Nguyễn Văn Thành cho dựng.',
        '<ul><li>Là gác lầu hình vuông, tượng trưng cho <i>ngôi sao Khuê</i> — ngôi sao chủ về văn chương.</li><li>Ngày nay, Khuê Văn Các được chọn làm <b>biểu tượng của Thủ đô Hà Nội</b>.</li></ul>',
      ],
      [
        'Đúng — Khuê Văn Các được xây năm <b>1805 thời Nguyễn</b> (đời Gia Long).',
        'Sai — Khuê Văn Các có trước thời Pháp thuộc. Đáp án đúng là <b>thời Nguyễn (1805)</b> vì Khuê Văn Các xây năm 1805 thời Gia Long.',
        'Sai — công trình này thuộc thế kỉ XIX, không phải <code>thời Trần</code>. Đáp án đúng là <b>thời Nguyễn (1805)</b>.',
        'Sai — Văn Miếu có từ thời Lý nhưng Khuê Văn Các thì muộn hơn nhiều. Đáp án đúng là <b>thời Nguyễn (1805)</b>.',
      ]
    ),
  ]),

  M(3, 'Hoàng thành Thăng Long — di sản thế giới', [
    Q('Hoàng thành Thăng Long được UNESCO công nhận năm?', ['2010', '2008', '2015', '2000'], 0, 'UNESCO công nhận năm 2010 — dịp Đại lễ 1000 năm.',
      [
        '<b>Khu trung tâm Hoàng thành Thăng Long</b> được UNESCO ghi danh là <b>Di sản văn hoá thế giới</b> vào năm <code>2010</code>.',
        '<ul><li>Đúng dịp <b>Đại lễ kỉ niệm 1000 năm Thăng Long — Hà Nội</b>.</li><li>Giá trị nổi bật: là trung tâm quyền lực liên tục suốt hơn <i>13 thế kỉ</i>, từ thời tiền Thăng Long đến thời hiện đại.</li></ul>',
      ],
      [
        'Đúng — Hoàng thành Thăng Long được UNESCO công nhận năm <b>2010</b>, đúng dịp Đại lễ 1000 năm.',
        'Sai — <code>2008</code> là năm Hà Nội mở rộng địa giới, không phải năm ghi danh. Đáp án đúng là <b>2010</b>.',
        'Sai — <code>2015</code> muộn hơn thực tế. Đáp án đúng là <b>2010</b> vì UNESCO công nhận đúng dịp Đại lễ 1000 năm.',
        'Sai — <code>2000</code> quá sớm. Đáp án đúng là <b>2010</b> — dịp Đại lễ 1000 năm Thăng Long.',
      ]
    ),
    Q('Cổng phía Nam Hoàng thành tên gì?', ['Đông Môn', 'Bắc Môn', 'Đoan Môn', 'Tây Môn'], 2, 'Đoan Môn là cổng phía Nam còn nguyên vẹn.',
      [
        '<b>Đoan Môn</b> là cổng chính phía nam dẫn vào Cấm thành (khu vực Điện Kính Thiên) của Hoàng thành Thăng Long.',
        '<ul><li>Cổng được xây kiểu <i>vọng lâu</i>, có 5 cửa vòm cuốn bằng gạch và đá.</li><li>Là một trong số ít công trình cổ còn tương đối <b>nguyên vẹn</b> trong khu di tích.</li></ul>',
        'Phía bắc Hoàng thành còn <b>Bắc Môn</b> (Cửa Bắc) — nơi in dấu vết đạn pháo của thực dân Pháp.',
      ],
      [
        'Sai — "Đông Môn" không phải tên cổng nam tiêu biểu. Đáp án đúng là <b>Đoan Môn</b> — cổng phía nam còn nguyên vẹn.',
        'Sai — <code>Bắc Môn</code> là cổng phía bắc. Đáp án đúng là <b>Đoan Môn</b> vì đó là cổng phía Nam còn nguyên vẹn.',
        'Đúng — <b>Đoan Môn</b> là cổng chính phía Nam của Hoàng thành Thăng Long.',
        'Sai — "Tây Môn" không phải tên cổng nam. Đáp án đúng là <b>Đoan Môn</b> — cổng phía Nam còn nguyên vẹn.',
      ]
    ),
    Q('Cuộc khai quật 18 Hoàng Diệu phát lộ điều gì?', ['Văn Miếu', 'Nền móng cung điện Lý — Trần — Lê', 'Lăng vua Hùng', 'Sông cổ'], 1, 'Khai quật 2002–2004 phát lộ dấu tích các triều đại.',
      [
        'Cuộc khai quật khảo cổ tại <b>18 Hoàng Diệu</b> (2002–2004) đã phát lộ một quần thể <b>nền móng cung điện, lầu gác</b> của các triều <i>Lý — Trần — Lê</i> chồng xếp lên nhau.',
        '<ul><li>Tìm thấy hàng triệu hiện vật: gạch ngói, đồ gốm, vật liệu kiến trúc.</li><li>Đây là bằng chứng quan trọng giúp Hoàng thành được UNESCO công nhận năm 2010.</li></ul>',
      ],
      [
        'Sai — Văn Miếu nằm ở khu vực khác, không phải tại hố khai quật này. Đáp án đúng là <b>nền móng cung điện Lý — Trần — Lê</b>.',
        'Đúng — khai quật 18 Hoàng Diệu phát lộ <b>nền móng cung điện các triều Lý — Trần — Lê</b> chồng xếp lên nhau.',
        'Sai — lăng vua Hùng ở Phú Thọ. Đáp án đúng là <b>nền móng cung điện Lý — Trần — Lê</b> được phát lộ tại 18 Hoàng Diệu.',
        'Sai — đây là di tích cung điện chứ không phải "sông cổ". Đáp án đúng là <b>nền móng cung điện Lý — Trần — Lê</b>.',
      ]
    ),
    Q('Cột Cờ Hà Nội xây thời nào?', ['Thời Nguyễn (đầu XIX)', 'Thời Pháp', 'Thời Trần', 'Thời Lý'], 0, 'Cột Cờ xây năm 1812 thời Gia Long.',
      [
        '<b>Cột Cờ Hà Nội (Kỳ đài)</b> được xây dựng năm <code>1812</code> dưới thời vua <b>Gia Long</b> (nhà Nguyễn), nằm trong khu vực thành Hà Nội.',
        '<ul><li>Cao khoảng <code>33 m</code> (cả trụ treo cờ là hơn 41 m), gồm ba tầng đế và thân cột.</li><li>Là một trong những công trình hiếm hoi <b>còn nguyên vẹn</b> sau các đợt phá thành.</li></ul>',
      ],
      [
        'Đúng — Cột Cờ Hà Nội được xây năm <b>1812 thời Nguyễn</b> (đời Gia Long).',
        'Sai — Cột Cờ có trước thời Pháp. Đáp án đúng là <b>thời Nguyễn (đầu XIX)</b> vì Cột Cờ xây năm 1812 thời Gia Long.',
        'Sai — công trình này thuộc thế kỉ XIX, không phải thời Trần. Đáp án đúng là <b>thời Nguyễn (đầu XIX)</b>.',
        'Sai — Cột Cờ muộn hơn thời Lý rất nhiều. Đáp án đúng là <b>thời Nguyễn (đầu XIX)</b> — xây năm 1812.',
      ]
    ),
    Q('Điện Kính Thiên là?', ['Trại lính', 'Kho lương', 'Điện chính nơi vua thiết triều thời Lê', 'Nhà ăn'], 2, 'Điện Kính Thiên là nơi vua thiết triều.',
      [
        '<b>Điện Kính Thiên</b> là cung điện trung tâm, quan trọng nhất của Hoàng thành Thăng Long thời <b>Lê</b> — nơi vua <i>thiết triều</i>, bàn việc nước.',
        '<ul><li>Ngày nay chỉ còn <b>nền điện</b> và bộ <i>thềm rồng đá</i> (bậc thềm chạm rồng) tinh xảo của thế kỉ XV.</li><li>Đây là điểm nhấn của khu di tích trung tâm Hoàng thành.</li></ul>',
      ],
      [
        'Sai — Điện Kính Thiên không phải trại lính. Đáp án đúng là <b>điện chính nơi vua thiết triều thời Lê</b>.',
        'Sai — đây là điện thiết triều, không phải kho lương. Đáp án đúng là <b>điện chính nơi vua thiết triều thời Lê</b>.',
        'Đúng — <b>Điện Kính Thiên</b> là điện chính nơi vua thiết triều thời Lê, nay còn nền điện và thềm rồng đá.',
        'Sai — đây là nơi vua thiết triều, không phải nhà ăn. Đáp án đúng là <b>điện chính nơi vua thiết triều thời Lê</b>.',
      ]
    ),
  ]),

  M(4, 'Hà Nội thời Trần — chống Mông Nguyên', [
    Q('Triều Trần ba lần đánh thắng quân Mông — Nguyên vào các năm?', ['1010, 1077, 1288', '938, 1010, 1226', '1428, 1789, 1858', '1258, 1285, 1288'], 3, 'Ba lần kháng chiến chống Mông — Nguyên thắng lợi.',
      [
        '<b>Ba lần kháng chiến chống Mông — Nguyên</b> thời Trần diễn ra vào các năm <code>1258</code>, <code>1285</code> và <code>1287–1288</code>.',
        '<ul><li>Lần 1 (1258): đánh tan quân Mông Cổ của Ngột Lương Hợp Thai.</li><li>Lần 2 (1285) và lần 3 (1288): đánh bại quân Nguyên hùng mạnh, đỉnh cao là chiến thắng <b>Bạch Đằng 1288</b>.</li></ul>',
      ],
      [
        'Sai — <code>1077</code> là kháng chiến chống Tống thời Lý, không phải chống Mông — Nguyên. Đáp án đúng là <b>1258, 1285, 1288</b>.',
        'Sai — các mốc này thuộc thời Ngô — Lý, không phải chống Mông — Nguyên. Đáp án đúng là <b>1258, 1285, 1288</b>.',
        'Sai — đây là các mốc thời Lê — Tây Sơn — Pháp. Đáp án đúng là <b>1258, 1285, 1288</b> — ba lần kháng chiến chống Mông — Nguyên.',
        'Đúng — ba lần kháng chiến chống Mông — Nguyên thắng lợi vào các năm <b>1258, 1285, 1288</b>.',
      ]
    ),
    Q('Người tổng chỉ huy là?', ['Lê Lợi', 'Quang Trung', 'Lý Thường Kiệt', 'Trần Hưng Đạo'], 3, 'Trần Quốc Tuấn — Hưng Đạo Vương — Đại Vương quân sự.',
      [
        '<b>Trần Hưng Đạo (Trần Quốc Tuấn)</b> là Quốc công Tiết chế — tổng chỉ huy quân đội Đại Việt trong các cuộc kháng chiến chống Mông — Nguyên.',
        '<ul><li>Ông là <i>thiên tài quân sự</i>, tác giả "Hịch tướng sĩ" và binh thư "Vạn Kiếp tông bí truyền thư".</li><li>Được dân tôn là <b>Đức Thánh Trần</b>, lập đền thờ ở nhiều nơi.</li></ul>',
      ],
      [
        'Sai — Lê Lợi lãnh đạo khởi nghĩa Lam Sơn chống Minh (thế kỉ XV). Đáp án đúng là <b>Trần Hưng Đạo</b>.',
        'Sai — Quang Trung đánh quân Thanh (1789). Đáp án đúng là <b>Trần Hưng Đạo</b> — tổng chỉ huy chống Mông — Nguyên.',
        'Sai — Lý Thường Kiệt chống quân Tống thời Lý. Đáp án đúng là <b>Trần Hưng Đạo</b> vì ông là tổng chỉ huy quân đội thời Trần.',
        'Đúng — <b>Trần Hưng Đạo (Trần Quốc Tuấn)</b> là tổng chỉ huy quân đội chống Mông — Nguyên.',
      ]
    ),
    Q('"Hịch tướng sĩ" do ai soạn?', ['Nguyễn Trãi', 'Lý Thường Kiệt', 'Trần Hưng Đạo', 'Lê Lợi'], 2, 'Trần Hưng Đạo soạn để khích lệ binh sĩ.',
      [
        '<b>"Hịch tướng sĩ"</b> (Dụ chư tì tướng hịch văn) do <b>Trần Hưng Đạo</b> soạn trước cuộc kháng chiến chống Nguyên lần thứ hai (1285).',
        '<ul><li>Mục đích: <i>khích lệ tinh thần yêu nước</i>, kêu gọi tướng sĩ luyện tập, sẵn sàng đánh giặc.</li><li>Là một áng văn chính luận hùng hồn, thấm đẫm lòng căm thù giặc.</li></ul>',
      ],
      [
        'Sai — Nguyễn Trãi viết "Bình Ngô đại cáo" thời Lê sơ. Đáp án đúng là <b>Trần Hưng Đạo</b> — tác giả "Hịch tướng sĩ".',
        'Sai — Lý Thường Kiệt gắn với "Nam quốc sơn hà". Đáp án đúng là <b>Trần Hưng Đạo</b> vì ông soạn "Hịch tướng sĩ".',
        'Đúng — <b>Trần Hưng Đạo</b> soạn "Hịch tướng sĩ" để khích lệ binh sĩ trước khi đánh quân Nguyên.',
        'Sai — Lê Lợi là thủ lĩnh khởi nghĩa Lam Sơn. Đáp án đúng là <b>Trần Hưng Đạo</b> — tác giả "Hịch tướng sĩ".',
      ]
    ),
    Q('Hội nghị Diên Hồng tổ chức ở Thăng Long, các bô lão đồng thanh?', ['"Đầu hàng"', '"Hoà!"', '"Cống nạp"', '"Đánh!"'], 3, 'Các bô lão đồng thanh "Đánh!" tại Hội nghị Diên Hồng.',
      [
        '<b>Hội nghị Diên Hồng</b> do Thượng hoàng Trần Thánh Tông triệu tập (năm 1284) tại Thăng Long, mời các <i>bô lão</i> cả nước về hỏi kế đánh giặc.',
        '<ul><li>Khi được hỏi nên hoà hay nên đánh, các bô lão đồng thanh hô vang <b>"Đánh!"</b>.</li><li>Đây là biểu tượng của tinh thần <b>đoàn kết toàn dân</b> và ý chí quyết chiến chống ngoại xâm.</li></ul>',
      ],
      [
        'Sai — không một bô lão nào hô "Đầu hàng". Đáp án đúng là <b>"Đánh!"</b> — thể hiện ý chí quyết chiến.',
        'Sai — các bô lão không chọn "Hoà". Đáp án đúng là <b>"Đánh!"</b> tại Hội nghị Diên Hồng.',
        'Sai — tinh thần Diên Hồng là chống giặc, không phải "Cống nạp". Đáp án đúng là <b>"Đánh!"</b>.',
        'Đúng — các bô lão đồng thanh hô <b>"Đánh!"</b> tại Hội nghị Diên Hồng, thể hiện quyết tâm chống giặc.',
      ]
    ),
    Q('Vị vua nào lãnh đạo cuộc kháng chiến 1285?', ['Trần Nhân Tông', 'Trần Dụ Tông', 'Trần Anh Tông', 'Trần Thái Tông'], 0, 'Trần Nhân Tông là vua lãnh đạo kháng chiến lần 2 và 3.',
      [
        '<b>Trần Nhân Tông</b> là vị vua trực tiếp lãnh đạo cuộc kháng chiến chống Nguyên lần thứ hai (<code>1285</code>) và lần thứ ba (<code>1288</code>).',
        '<ul><li>Cùng với Thượng hoàng Trần Thánh Tông và Quốc công Tiết chế Trần Hưng Đạo, ông đưa Đại Việt đến thắng lợi vẻ vang.</li><li>Sau này, ông xuất gia và trở thành <b>tổ sáng lập Thiền phái Trúc Lâm</b> Yên Tử.</li></ul>',
      ],
      [
        'Đúng — <b>Trần Nhân Tông</b> là vua lãnh đạo cuộc kháng chiến lần 2 (1285) và lần 3 (1288).',
        'Sai — Trần Dụ Tông là vua thời sau, không gắn với 1285. Đáp án đúng là <b>Trần Nhân Tông</b>.',
        'Sai — Trần Anh Tông kế vị sau Trần Nhân Tông. Đáp án đúng là <b>Trần Nhân Tông</b> — vua lãnh đạo kháng chiến 1285.',
        'Sai — Trần Thái Tông là vua thời kháng chiến lần 1 (1258). Đáp án đúng là <b>Trần Nhân Tông</b> cho cuộc kháng chiến 1285.',
      ]
    ),
  ]),

  M(5, 'Thăng Long thời Lê sơ', [
    Q('Sau khi đánh tan quân Minh (1428), Lê Lợi đóng đô ở?', ['Phú Xuân', 'Hoa Lư', 'Lam Kinh', 'Đông Đô (Thăng Long)'], 3, 'Đông Đô (Thăng Long) là kinh đô chính.',
      [
        'Sau chiến thắng khởi nghĩa Lam Sơn năm <code>1428</code>, <b>Lê Lợi</b> lên ngôi (Lê Thái Tổ) và đóng đô tại <b>Đông Đô (Thăng Long)</b>.',
        '<ul><li>Thăng Long tiếp tục là kinh đô chính trị — kinh tế — văn hoá của Đại Việt suốt thời Lê sơ.</li><li><i>Lam Kinh</i> (Thanh Hoá) chỉ là quê hương, nơi đặt lăng miếu, không phải kinh đô chính.</li></ul>',
      ],
      [
        'Sai — Phú Xuân (Huế) là kinh đô thời Nguyễn. Đáp án đúng là <b>Đông Đô (Thăng Long)</b>.',
        'Sai — Hoa Lư là kinh đô thời Đinh — Tiền Lê — đầu Lý. Đáp án đúng là <b>Đông Đô (Thăng Long)</b>.',
        'Sai — Lam Kinh là quê hương, nơi đặt lăng miếu chứ không phải kinh đô chính. Đáp án đúng là <b>Đông Đô (Thăng Long)</b>.',
        'Đúng — Lê Lợi đóng đô tại <b>Đông Đô (Thăng Long)</b> sau khi đánh tan quân Minh.',
      ]
    ),
    Q('Lê Lợi đổi tên Thăng Long thành?', ['Đại La', 'Đông Đô', 'Đông Kinh', 'Đông Quan'], 2, 'Năm 1430, Lê Lợi đổi Đông Đô thành Đông Kinh.',
      [
        'Năm <code>1430</code>, vua <b>Lê Lợi (Lê Thái Tổ)</b> đổi tên <i>Đông Đô</i> thành <b>Đông Kinh</b>.',
        '<ul><li><code>Đông Quan</code> là tên mà quân Minh đặt cho Thăng Long khi đô hộ — mang tính áp đặt.</li><li>Việc đổi sang "Đông Kinh" khẳng định lại chủ quyền và vị thế kinh đô sau khi giành độc lập.</li></ul>',
      ],
      [
        'Sai — "Đại La" là tên thời trước khi Lý dời đô (năm 1010). Đáp án đúng là <b>Đông Kinh</b>.',
        'Sai — "Đông Đô" là tên trước khi Lê Lợi đổi. Đáp án đúng là <b>Đông Kinh</b> vì năm 1430 Lê Lợi đổi Đông Đô thành Đông Kinh.',
        'Đúng — năm 1430, Lê Lợi đổi tên Đông Đô thành <b>Đông Kinh</b>.',
        'Sai — "Đông Quan" là tên do quân Minh áp đặt, không phải tên Lê Lợi đặt. Đáp án đúng là <b>Đông Kinh</b>.',
      ]
    ),
    Q('Vị vua Lê nào nổi tiếng cải cách lớn?', ['Lê Thánh Tông', 'Lê Lợi', 'Lê Hiển Tông', 'Lê Nhân Tông'], 0, 'Lê Thánh Tông (1460–1497) — minh quân vĩ đại.',
      [
        '<b>Lê Thánh Tông</b> (trị vì 1460–1497) là vị vua nổi tiếng với những <b>cải cách lớn</b>, đưa Đại Việt thời Lê sơ đến giai đoạn cường thịnh nhất.',
        '<ul><li>Cải cách hành chính: chia cả nước thành <code>13 đạo thừa tuyên</code>.</li><li>Ban hành bộ <b>Luật Hồng Đức</b>, lập hội Tao Đàn, đề cao văn học và giáo dục.</li></ul>',
      ],
      [
        'Đúng — <b>Lê Thánh Tông</b> (1460–1497) là minh quân nổi tiếng với những cải cách lớn.',
        'Sai — Lê Lợi là người khai sáng triều Lê nhưng cải cách lớn gắn với cháu ông. Đáp án đúng là <b>Lê Thánh Tông</b>.',
        'Sai — Lê Hiển Tông thuộc thời Lê trung hưng về sau. Đáp án đúng là <b>Lê Thánh Tông</b>.',
        'Sai — Lê Nhân Tông là vua trước Lê Thánh Tông, trị vì ngắn. Đáp án đúng là <b>Lê Thánh Tông</b> — vị vua cải cách lớn.',
      ]
    ),
    Q('Bộ luật Hồng Đức ban hành thời?', ['Trần Hưng Đạo', 'Nguyễn Trãi', 'Lê Thánh Tông', 'Lê Lợi'], 2, 'Luật Hồng Đức là bộ luật tiến bộ thời Lê Thánh Tông.',
      [
        '<b>Quốc triều hình luật (Luật Hồng Đức)</b> được biên soạn và hoàn thiện dưới thời vua <b>Lê Thánh Tông</b> (niên hiệu Hồng Đức).',
        '<ul><li>Là bộ luật <b>tiến bộ bậc nhất</b> thời phong kiến Việt Nam.</li><li>Có nhiều điều khoản <i>bảo vệ quyền lợi của phụ nữ</i>, người yếu thế và đề cao luân lí.</li></ul>',
      ],
      [
        'Sai — Trần Hưng Đạo là danh tướng thời Trần. Đáp án đúng là <b>Lê Thánh Tông</b> — người ban Luật Hồng Đức.',
        'Sai — Nguyễn Trãi mất năm 1442, trước thời Hồng Đức. Đáp án đúng là <b>Lê Thánh Tông</b>.',
        'Đúng — Luật Hồng Đức là bộ luật tiến bộ ban hành thời <b>Lê Thánh Tông</b>.',
        'Sai — Lê Lợi mất năm 1433, Luật Hồng Đức ban hành dưới thời cháu ông. Đáp án đúng là <b>Lê Thánh Tông</b>.',
      ]
    ),
    Q('Văn Miếu được tu sửa lớn thời?', ['Lê Thánh Tông (dựng bia tiến sĩ đầu tiên 1484)', 'Trần Nhân Tông', 'Quang Trung', 'Lý Thái Tổ'], 0, 'Năm 1484, Lê Thánh Tông cho dựng bia tiến sĩ đầu tiên.',
      [
        'Năm <code>1484</code>, vua <b>Lê Thánh Tông</b> cho dựng những tấm <b>bia tiến sĩ đầu tiên</b> tại Văn Miếu, khắc tên người đỗ đạt từ khoa thi năm 1442.',
        '<ul><li>Việc này thể hiện chính sách <i>trọng dụng nhân tài</i>, "Hiền tài là nguyên khí quốc gia".</li><li>Văn Miếu được tu bổ, mở rộng quy mô lớn trong thời Lê sơ.</li></ul>',
      ],
      [
        'Đúng — năm 1484, <b>Lê Thánh Tông</b> cho dựng bia tiến sĩ đầu tiên tại Văn Miếu.',
        'Sai — Trần Nhân Tông thuộc thời Trần, không gắn với việc dựng bia tiến sĩ. Đáp án đúng là <b>Lê Thánh Tông (1484)</b>.',
        'Sai — Quang Trung là thời Tây Sơn (thế kỉ XVIII). Đáp án đúng là <b>Lê Thánh Tông (dựng bia tiến sĩ đầu tiên 1484)</b>.',
        'Sai — Lý Thái Tổ là người dời đô (1010), không liên quan bia tiến sĩ. Đáp án đúng là <b>Lê Thánh Tông (1484)</b>.',
      ]
    ),
  ]),

  M(6, 'Phố cổ Hà Nội — 36 phố phường', [
    Q('Khu phố cổ Hà Nội còn gọi là?', ['Khu mới', 'Khu chợ lớn', 'Khu công nghiệp', '36 phố phường'], 3, '"Hà Nội 36 phố phường" là tên truyền thống.',
      [
        '<b>Khu phố cổ Hà Nội</b> nằm ở phía đông Hoàng thành, thuộc quận Hoàn Kiếm, quen gọi là <b>"Hà Nội 36 phố phường"</b>.',
        '<ul><li>Tên gọi gắn với các phố bắt đầu bằng chữ <code>"Hàng"</code> — mỗi phố bán một mặt hàng.</li><li>Nhà văn Thạch Lam có tác phẩm nổi tiếng <i>"Hà Nội băm sáu phố phường"</i>.</li></ul>',
      ],
      [
        'Sai — "Khu mới" trái nghĩa với phố cổ. Đáp án đúng là <b>36 phố phường</b> — tên truyền thống của khu phố cổ.',
        'Sai — "Khu chợ lớn" không phải tên khu phố cổ Hà Nội. Đáp án đúng là <b>36 phố phường</b>.',
        'Sai — khu phố cổ là nơi buôn bán thủ công, không phải khu công nghiệp. Đáp án đúng là <b>36 phố phường</b>.',
        'Đúng — khu phố cổ Hà Nội còn gọi là <b>"36 phố phường"</b>.',
      ]
    ),
    Q('Chữ "Hàng" trong tên phố cổ chỉ?', ['Loại hàng hoá bán ở phố đó', 'Tên cây', 'Số nhà', 'Tên người'], 0, 'Mỗi phố tập trung 1 nghề/mặt hàng.',
      [
        'Chữ <b>"Hàng"</b> trong tên phố cổ (Hàng Bạc, Hàng Đào, Hàng Mã...) chỉ <b>loại hàng hoá hoặc nghề</b> được bán ở phố đó.',
        '<ul><li>Phố cổ hình thành từ các <i>phường nghề</i> tụ tập làm ăn theo từng mặt hàng.</li><li>Ví dụ: Hàng Bạc làm đồ bạc, Hàng Mã làm vàng mã, Hàng Thiếc làm đồ thiếc.</li></ul>',
      ],
      [
        'Đúng — chữ "Hàng" chỉ <b>loại hàng hoá bán ở phố đó</b>, mỗi phố tập trung một nghề.',
        'Sai — "Hàng" không phải tên cây. Đáp án đúng là <b>loại hàng hoá bán ở phố đó</b>.',
        'Sai — "Hàng" không chỉ số nhà. Đáp án đúng là <b>loại hàng hoá bán ở phố đó</b>.',
        'Sai — "Hàng" không phải tên người. Đáp án đúng là <b>loại hàng hoá bán ở phố đó</b>.',
      ]
    ),
    Q('Phố Hàng Bạc nổi tiếng?', ['Vải lụa', 'Đồ gốm sứ tráng men', 'Chế tác kim hoàn (bạc, vàng)', 'Hoa quả'], 2, 'Hàng Bạc chuyên chế tác kim hoàn.',
      [
        '<b>Phố Hàng Bạc</b> là một trong những phố nghề lâu đời nhất, chuyên <b>chế tác kim hoàn</b> — đúc bạc nén, làm đồ trang sức bằng bạc và vàng.',
        '<ul><li>Nghề kim hoàn ở đây gắn với các thợ giỏi từ làng Châu Khê (Hải Dương) và Định Công lên lập nghiệp.</li><li>Đến nay phố vẫn còn nhiều cửa hiệu vàng bạc.</li></ul>',
      ],
      [
        'Sai — vải lụa là đặc trưng của Hàng Đào. Đáp án đúng là <b>chế tác kim hoàn (bạc, vàng)</b> cho phố Hàng Bạc.',
        'Sai — gốm sứ là sản phẩm Bát Tràng, không phải Hàng Bạc. Đáp án đúng là <b>chế tác kim hoàn (bạc, vàng)</b>.',
        'Đúng — Hàng Bạc nổi tiếng với nghề <b>chế tác kim hoàn (bạc, vàng)</b>.',
        'Sai — Hàng Bạc không bán hoa quả. Đáp án đúng là <b>chế tác kim hoàn (bạc, vàng)</b>.',
      ]
    ),
    Q('Phố Hàng Đào nổi tiếng?', ['Giấy dó, sách Nho', 'Chế tác bạc nén', 'Đồ đồng đúc', 'Vải lụa, tơ tằm'], 3, 'Hàng Đào chuyên buôn vải lụa.',
      [
        '<b>Phố Hàng Đào</b> xưa là phố chuyên buôn bán <b>vải lụa, tơ tằm</b> và nhuộm điều (màu đỏ hồng — "đào").',
        '<ul><li>Tên "Đào" gắn với nghề nhuộm vải màu hồng đào nổi tiếng của phố.</li><li>Hàng Đào cùng Hàng Ngang tạo thành trục buôn bán sầm uất bậc nhất phố cổ.</li></ul>',
      ],
      [
        'Sai — giấy dó, sách Nho gắn với phố khác. Đáp án đúng là <b>vải lụa, tơ tằm</b> cho phố Hàng Đào.',
        'Sai — chế tác bạc nén là nghề của Hàng Bạc. Đáp án đúng là <b>vải lụa, tơ tằm</b>.',
        'Sai — đồ đồng đúc gắn với Ngũ Xã. Đáp án đúng là <b>vải lụa, tơ tằm</b> cho phố Hàng Đào.',
        'Đúng — Hàng Đào nổi tiếng buôn bán <b>vải lụa, tơ tằm</b>.',
      ]
    ),
    Q('Đặc trưng kiến trúc nhà phố cổ?', ['Nhà cao tầng', 'Nhà ống mặt tiền hẹp, chiều sâu lớn', 'Nhà sàn', 'Lâu đài'], 1, 'Nhà ống: mặt tiền 3–5m, chiều sâu lớn.',
      [
        'Kiến trúc đặc trưng của phố cổ Hà Nội là kiểu <b>nhà ống</b>: <i>mặt tiền hẹp</i> (3–5 m) nhưng <i>chiều sâu lớn</i>, có thể dài vài chục mét.',
        '<ul><li>Lí do: nhà mặt phố để buôn bán nên mặt tiền quý, dân chia nhỏ để nhiều hộ cùng có cửa hàng.</li><li>Bên trong thường có <code>sân giếng trời</code> để lấy ánh sáng và thông gió.</li></ul>',
      ],
      [
        'Sai — phố cổ là nhà thấp tầng, không phải nhà cao tầng. Đáp án đúng là <b>nhà ống mặt tiền hẹp, chiều sâu lớn</b>.',
        'Đúng — nhà phố cổ là kiểu <b>nhà ống mặt tiền hẹp, chiều sâu lớn</b>.',
        'Sai — nhà sàn là kiến trúc của đồng bào miền núi. Đáp án đúng là <b>nhà ống mặt tiền hẹp, chiều sâu lớn</b>.',
        'Sai — phố cổ không có lâu đài. Đáp án đúng là <b>nhà ống mặt tiền hẹp, chiều sâu lớn</b>.',
      ]
    ),
  ]),

  M(7, 'Danh nhân Hà Nội — Chu Văn An', [
    Q('Chu Văn An là?', ['Nhà giáo, hiệu trưởng Quốc Tử Giám thời Trần', 'Tướng quân', 'Thầy thuốc', 'Nhà thơ, quan đại thần triều Lê'], 0, 'Chu Văn An — "Vạn thế sư biểu".',
      [
        '<b>Chu Văn An</b> (1292–1370) là một <b>nhà giáo lỗi lạc</b> thời Trần, từng làm <i>Tư nghiệp Quốc Tử Giám</i> (như hiệu trưởng) dạy học cho các hoàng tử.',
        '<ul><li>Ông được tôn là <b>"Vạn thế sư biểu"</b> — người thầy mẫu mực của muôn đời.</li><li>Nổi tiếng vì tính cương trực, dạy học nghiêm khắc, đề cao đạo đức.</li></ul>',
      ],
      [
        'Đúng — Chu Văn An là <b>nhà giáo, từng làm Tư nghiệp (hiệu trưởng) Quốc Tử Giám thời Trần</b>, được tôn là "Vạn thế sư biểu".',
        'Sai — Chu Văn An là nhà giáo, không phải tướng quân. Đáp án đúng là <b>nhà giáo, hiệu trưởng Quốc Tử Giám thời Trần</b>.',
        'Sai — ông là thầy dạy học chứ không phải thầy thuốc. Đáp án đúng là <b>nhà giáo, hiệu trưởng Quốc Tử Giám thời Trần</b>.',
        'Sai — Chu Văn An sống ở thời Trần, không phải triều Lê. Đáp án đúng là <b>nhà giáo, hiệu trưởng Quốc Tử Giám thời Trần</b>.',
      ]
    ),
    Q('Tác phẩm nổi tiếng của Chu Văn An?', ['Bình Ngô đại cáo', 'Thất trảm sớ — đề nghị chém 7 nịnh thần', 'Truyện Kiều', 'Hịch tướng sĩ'], 1, '"Thất trảm sớ" thể hiện khí phách của ông.',
      [
        '<b>"Thất trảm sớ"</b> là bản tấu nổi tiếng của Chu Văn An, đề nghị vua <b>chém 7 tên nịnh thần</b> lộng quyền.',
        '<ul><li>Khi vua không nghe, ông từ quan, về ở ẩn dạy học.</li><li>Tác phẩm thể hiện <i>khí phách cương trực</i>, dám nói thẳng của một bậc trí thức chân chính.</li></ul>',
      ],
      [
        'Sai — "Bình Ngô đại cáo" là của Nguyễn Trãi. Đáp án đúng là <b>Thất trảm sớ</b> của Chu Văn An.',
        'Đúng — <b>"Thất trảm sớ"</b> — đề nghị chém 7 nịnh thần — thể hiện khí phách của Chu Văn An.',
        'Sai — "Truyện Kiều" là của Nguyễn Du. Đáp án đúng là <b>Thất trảm sớ</b> của Chu Văn An.',
        'Sai — "Hịch tướng sĩ" là của Trần Hưng Đạo. Đáp án đúng là <b>Thất trảm sớ</b> của Chu Văn An.',
      ]
    ),
    Q('Quê hương Chu Văn An nay thuộc?', ['Đà Nẵng', 'Thanh Trì, Hà Nội', 'Chí Linh, Hải Dương', 'Kinh Bắc, Bắc Ninh'], 1, 'Làng Văn Thôn (nay là Thanh Liệt, Thanh Trì, Hà Nội).',
      [
        'Chu Văn An sinh ra ở làng Văn Thôn, xã Quang Liệt — nay là xã <b>Thanh Liệt, huyện Thanh Trì, Hà Nội</b>.',
        '<ul><li>Sau khi từ quan, ông về ẩn dạy học ở vùng <i>Chí Linh (Hải Dương)</i> — nơi có đền thờ ông trên núi Phượng Hoàng.</li><li>Đừng nhầm <b>quê gốc</b> (Thanh Trì, Hà Nội) với <b>nơi về ẩn</b> (Chí Linh).</li></ul>',
      ],
      [
        'Sai — Chu Văn An không phải người Đà Nẵng. Đáp án đúng là <b>Thanh Trì, Hà Nội</b> — quê hương của ông.',
        'Đúng — quê hương Chu Văn An nay thuộc <b>Thanh Trì, Hà Nội</b> (làng Thanh Liệt).',
        'Sai — Chí Linh (Hải Dương) là nơi ông về ẩn dạy học, không phải quê gốc. Đáp án đúng là <b>Thanh Trì, Hà Nội</b>.',
        'Sai — quê ông ở Hà Nội, không phải Bắc Ninh. Đáp án đúng là <b>Thanh Trì, Hà Nội</b>.',
      ]
    ),
    Q('Vai trò của Chu Văn An?', ['Nhà thám hiểm', 'Nhà quân sự', 'Bậc thầy của nền giáo dục Việt Nam', 'Diễn viên'], 2, 'Ông được tôn là bậc thầy muôn đời.',
      [
        'Chu Văn An được tôn vinh là <b>bậc thầy của nền giáo dục Việt Nam</b>, người đặt nền móng cho đạo học và truyền thống tôn sư trọng đạo.',
        '<ul><li>Năm 2019, ông được UNESCO vinh danh là <b>Danh nhân văn hoá</b> nhân kỉ niệm 650 năm ngày mất.</li><li>Tên ông được đặt cho nhiều trường học danh tiếng trên cả nước.</li></ul>',
      ],
      [
        'Sai — Chu Văn An không phải nhà thám hiểm. Đáp án đúng là <b>bậc thầy của nền giáo dục Việt Nam</b>.',
        'Sai — ông là nhà giáo, không phải nhà quân sự. Đáp án đúng là <b>bậc thầy của nền giáo dục Việt Nam</b>.',
        'Đúng — Chu Văn An được tôn là <b>bậc thầy của nền giáo dục Việt Nam</b>.',
        'Sai — ông không phải diễn viên. Đáp án đúng là <b>bậc thầy của nền giáo dục Việt Nam</b>.',
      ]
    ),
    Q('Tên Chu Văn An ngày nay được đặt cho?', ['Cảng biển', 'Sân bay', 'Bệnh viện', 'Nhiều trường học khắp cả nước'], 3, 'Tên ông được đặt cho nhiều trường danh tiếng.',
      [
        'Để tưởng nhớ người thầy mẫu mực, tên <b>Chu Văn An</b> được đặt cho <b>nhiều trường học</b> nổi tiếng trên khắp cả nước.',
        '<ul><li>Tiêu biểu là Trường THPT Chu Văn An (Hà Nội) — một trong những ngôi trường lâu đời, danh tiếng nhất Thủ đô.</li><li>Việc đặt tên thể hiện sự tri ân và noi gương đạo đức, học vấn của ông.</li></ul>',
      ],
      [
        'Sai — tên ông không đặt cho cảng biển. Đáp án đúng là <b>nhiều trường học khắp cả nước</b>.',
        'Sai — tên ông không đặt cho sân bay. Đáp án đúng là <b>nhiều trường học khắp cả nước</b>.',
        'Sai — tên ông chủ yếu đặt cho trường học, không phải bệnh viện. Đáp án đúng là <b>nhiều trường học khắp cả nước</b>.',
        'Đúng — tên Chu Văn An được đặt cho <b>nhiều trường học danh tiếng khắp cả nước</b>.',
      ]
    ),
  ]),

  M(8, 'Danh nhân Hà Nội — Nguyễn Trãi', [
    Q('Nguyễn Trãi sinh năm?', ['1226', '1010', '1380', '1442'], 2, 'Nguyễn Trãi sinh năm 1380.',
      [
        '<b>Nguyễn Trãi</b> (hiệu Ức Trai) sinh năm <code>1380</code>, là con của Nguyễn Phi Khanh, cháu ngoại quan Tư đồ Trần Nguyên Đán.',
        '<ul><li>Ông sinh ra tại Thăng Long, sau về sống ở quê ngoại Côn Sơn (Hải Dương).</li><li>Là <b>anh hùng dân tộc</b>, nhà chính trị, quân sự, nhà văn hoá kiệt xuất.</li></ul>',
      ],
      [
        'Sai — <code>1226</code> là năm nhà Trần thành lập. Đáp án đúng là <b>1380</b> — năm sinh Nguyễn Trãi.',
        'Sai — <code>1010</code> là năm dời đô. Đáp án đúng là <b>1380</b> vì Nguyễn Trãi sinh năm 1380.',
        'Đúng — <b>1380</b> là năm sinh của Nguyễn Trãi.',
        'Sai — <code>1442</code> là năm mất của ông (vụ án Lệ Chi Viên), không phải năm sinh. Đáp án đúng là <b>1380</b>.',
      ]
    ),
    Q('Nguyễn Trãi là quân sư của ai?', ['Lý Thường Kiệt', 'Lê Lợi (khởi nghĩa Lam Sơn)', 'Trần Hưng Đạo', 'Quang Trung'], 1, 'Nguyễn Trãi là quân sư của Lê Lợi.',
      [
        '<b>Nguyễn Trãi</b> là <b>quân sư số một</b> của Lê Lợi trong cuộc khởi nghĩa <b>Lam Sơn</b> (1418–1427) chống quân Minh.',
        '<ul><li>Ông dâng <i>"Bình Ngô sách"</i>, đề ra chiến lược "tâm công" — đánh vào lòng người.</li><li>Sau thắng lợi, ông thay Lê Lợi viết "Bình Ngô đại cáo".</li></ul>',
      ],
      [
        'Sai — Lý Thường Kiệt thời Lý, trước Nguyễn Trãi nhiều thế kỉ. Đáp án đúng là <b>Lê Lợi (khởi nghĩa Lam Sơn)</b>.',
        'Đúng — Nguyễn Trãi là quân sư của <b>Lê Lợi trong khởi nghĩa Lam Sơn</b>.',
        'Sai — Trần Hưng Đạo thời Trần, không cùng thời Nguyễn Trãi. Đáp án đúng là <b>Lê Lợi (khởi nghĩa Lam Sơn)</b>.',
        'Sai — Quang Trung thời Tây Sơn (thế kỉ XVIII). Đáp án đúng là <b>Lê Lợi (khởi nghĩa Lam Sơn)</b>.',
      ]
    ),
    Q('Tác phẩm vĩ đại của Nguyễn Trãi?', ['"Nam quốc sơn hà"', '"Bình Ngô đại cáo"', '"Truyện Kiều"', '"Hịch tướng sĩ"'], 1, '"Bình Ngô đại cáo" — bản tuyên ngôn độc lập thứ 2.',
      [
        '<b>"Bình Ngô đại cáo"</b> (1428) do Nguyễn Trãi soạn thay lời Lê Lợi, tổng kết cuộc kháng chiến chống Minh thắng lợi.',
        '<ul><li>Được coi là bản <b>"Tuyên ngôn độc lập" thứ hai</b> của dân tộc, một áng "thiên cổ hùng văn".</li><li>Mở đầu bằng tư tưởng nhân nghĩa: "Việc nhân nghĩa cốt ở yên dân...".</li></ul>',
      ],
      [
        'Sai — "Nam quốc sơn hà" gắn với Lý Thường Kiệt. Đáp án đúng là <b>"Bình Ngô đại cáo"</b> của Nguyễn Trãi.',
        'Đúng — <b>"Bình Ngô đại cáo"</b> là tác phẩm vĩ đại của Nguyễn Trãi, bản tuyên ngôn độc lập thứ hai.',
        'Sai — "Truyện Kiều" là của Nguyễn Du. Đáp án đúng là <b>"Bình Ngô đại cáo"</b> của Nguyễn Trãi.',
        'Sai — "Hịch tướng sĩ" là của Trần Hưng Đạo. Đáp án đúng là <b>"Bình Ngô đại cáo"</b> của Nguyễn Trãi.',
      ]
    ),
    Q('Nguyễn Trãi được UNESCO công nhận là?', ['Nhà khoa học', 'Thủ tướng', 'Danh nhân văn hoá thế giới (1980)', 'Hoàng đế'], 2, 'UNESCO công nhận 1980 nhân 600 năm sinh.',
      [
        'Năm <code>1980</code>, nhân kỉ niệm <b>600 năm ngày sinh</b>, Nguyễn Trãi được UNESCO vinh danh là <b>Danh nhân văn hoá thế giới</b>.',
        '<ul><li>Ông để lại di sản đồ sộ: "Quân trung từ mệnh tập", "Quốc âm thi tập", "Dư địa chí"...</li><li>"Quốc âm thi tập" là tập thơ Nôm sớm nhất còn lại của văn học Việt Nam.</li></ul>',
      ],
      [
        'Sai — ông được vinh danh về văn hoá, không phải nhà khoa học. Đáp án đúng là <b>Danh nhân văn hoá thế giới (1980)</b>.',
        'Sai — Nguyễn Trãi không phải thủ tướng. Đáp án đúng là <b>Danh nhân văn hoá thế giới (1980)</b>.',
        'Đúng — Nguyễn Trãi được UNESCO công nhận là <b>Danh nhân văn hoá thế giới năm 1980</b>.',
        'Sai — ông là khai quốc công thần, không phải hoàng đế. Đáp án đúng là <b>Danh nhân văn hoá thế giới (1980)</b>.',
      ]
    ),
    Q('Vụ án oan của Nguyễn Trãi là?', ['Án trộm cắp', 'Án tử chiến tranh', 'Án phản bội', 'Án oan Lệ Chi Viên (1442)'], 3, 'Án oan Lệ Chi Viên khiến cả họ ông bị tru di.',
      [
        '<b>Vụ án Lệ Chi Viên</b> (Vườn Vải) năm <code>1442</code>: vua Lê Thái Tông đột ngột băng hà khi ghé thăm Nguyễn Trãi, ông bị vu oan và khép tội <b>tru di tam tộc</b>.',
        '<ul><li>Đây là một trong những <i>vụ án oan</i> bi thảm nhất lịch sử phong kiến Việt Nam.</li><li>Hơn 20 năm sau, vua Lê Thánh Tông minh oan và phục hồi danh dự cho ông.</li></ul>',
      ],
      [
        'Sai — không phải án trộm cắp. Đáp án đúng là <b>án oan Lệ Chi Viên (1442)</b>.',
        'Sai — không phải án tử chiến tranh. Đáp án đúng là <b>án oan Lệ Chi Viên (1442)</b>.',
        'Sai — ông bị vu oan chứ không phản bội. Đáp án đúng là <b>án oan Lệ Chi Viên (1442)</b>.',
        'Đúng — đó là <b>án oan Lệ Chi Viên (1442)</b> khiến cả họ Nguyễn Trãi bị tru di.',
      ]
    ),
  ]),

  M(9, 'Danh nhân Hà Nội — Lý Thường Kiệt', [
    Q('Lý Thường Kiệt là vị tướng thời nào?', ['Nguyễn', 'Lý', 'Trần', 'Tiền Lê'], 1, 'Lý Thường Kiệt là tướng thời Lý.',
      [
        '<b>Lý Thường Kiệt</b> (1019–1105) là danh tướng kiệt xuất thời <b>nhà Lý</b>, phục vụ dưới ba đời vua Lý.',
        '<ul><li>Ông giữ chức Thái uý, nắm binh quyền, là trụ cột của triều đình.</li><li>Tên thật là Ngô Tuấn, được ban quốc tính (họ Lý) nên gọi là Lý Thường Kiệt.</li></ul>',
      ],
      [
        'Sai — nhà Nguyễn ở thế kỉ XIX, rất muộn. Đáp án đúng là <b>Lý</b> — Lý Thường Kiệt là tướng thời Lý.',
        'Đúng — Lý Thường Kiệt là vị tướng kiệt xuất thời <b>Lý</b>.',
        'Sai — Lý Thường Kiệt sống trước thời Trần. Đáp án đúng là <b>Lý</b>.',
        'Sai — ông thuộc thời Lý, không phải Tiền Lê. Đáp án đúng là <b>Lý</b>.',
      ]
    ),
    Q('Chiến công vang dội của Lý Thường Kiệt?', ['Đánh Minh', 'Đánh Mông Nguyên', 'Đánh Thanh', 'Đánh tan quân Tống xâm lược 1075–1077'], 3, 'Ông chỉ huy kháng chiến chống Tống thắng lợi.',
      [
        'Chiến công lớn nhất của Lý Thường Kiệt là <b>đánh tan quân Tống xâm lược (1075–1077)</b>.',
        '<ul><li>Năm 1075, ông chủ động đem quân <i>"tiên phát chế nhân"</i>, đánh sang đất Tống (Ung Châu, Khâm Châu, Liêm Châu).</li><li>Năm 1077, ông lập phòng tuyến sông Như Nguyệt chặn đứng và đánh bại quân Tống.</li></ul>',
      ],
      [
        'Sai — đánh Minh là khởi nghĩa Lam Sơn (Lê Lợi, thế kỉ XV). Đáp án đúng là <b>đánh tan quân Tống xâm lược 1075–1077</b>.',
        'Sai — đánh Mông Nguyên là thời Trần. Đáp án đúng là <b>đánh tan quân Tống xâm lược 1075–1077</b>.',
        'Sai — đánh Thanh là Quang Trung (1789). Đáp án đúng là <b>đánh tan quân Tống xâm lược 1075–1077</b>.',
        'Đúng — Lý Thường Kiệt <b>đánh tan quân Tống xâm lược (1075–1077)</b>.',
      ]
    ),
    Q('Phòng tuyến nào nổi tiếng của Lý Thường Kiệt?', ['Chi Lăng', 'Ngọc Hồi', 'Phòng tuyến sông Như Nguyệt', 'Bạch Đằng'], 2, 'Phòng tuyến Như Nguyệt (sông Cầu) chặn Tống.',
      [
        '<b>Phòng tuyến sông Như Nguyệt</b> (sông Cầu) là chiến tuyến nổi tiếng do Lý Thường Kiệt lập để chặn quân Tống tiến vào Thăng Long (1077).',
        '<ul><li>Tại đây vang lên bài thơ thần <i>"Nam quốc sơn hà"</i> khích lệ quân sĩ.</li><li>Chi Lăng, Bạch Đằng là chiến tuyến của các thời kì khác (Lê, Ngô/Trần).</li></ul>',
      ],
      [
        'Sai — Chi Lăng gắn với khởi nghĩa Lam Sơn chống Minh. Đáp án đúng là <b>phòng tuyến sông Như Nguyệt</b>.',
        'Sai — Ngọc Hồi gắn với Quang Trung đánh Thanh. Đáp án đúng là <b>phòng tuyến sông Như Nguyệt</b>.',
        'Đúng — <b>phòng tuyến sông Như Nguyệt</b> (sông Cầu) là chiến tuyến nổi tiếng của Lý Thường Kiệt.',
        'Sai — Bạch Đằng gắn với Ngô Quyền và Trần Hưng Đạo. Đáp án đúng là <b>phòng tuyến sông Như Nguyệt</b>.',
      ]
    ),
    Q('Bài thơ thần "Nam quốc sơn hà" được cho là của?', ['Nguyễn Trãi', 'Hồ Quý Ly', 'Lý Thường Kiệt', 'Trần Hưng Đạo'], 2, '"Nam quốc sơn hà" — bản tuyên ngôn độc lập đầu tiên.',
      [
        '<b>"Nam quốc sơn hà"</b> (Sông núi nước Nam) được cho là của <b>Lý Thường Kiệt</b>, vang lên ở phòng tuyến Như Nguyệt.',
        '<ul><li>Được coi là <b>bản Tuyên ngôn độc lập đầu tiên</b> của dân tộc.</li><li>Khẳng định chủ quyền: <i>"Nam quốc sơn hà Nam đế cư / Tiệt nhiên định phận tại thiên thư"</i>.</li></ul>',
      ],
      [
        'Sai — Nguyễn Trãi viết "Bình Ngô đại cáo". Đáp án đúng là <b>Lý Thường Kiệt</b> cho "Nam quốc sơn hà".',
        'Sai — Hồ Quý Ly không gắn với bài thơ này. Đáp án đúng là <b>Lý Thường Kiệt</b>.',
        'Đúng — "Nam quốc sơn hà" được cho là của <b>Lý Thường Kiệt</b>, bản tuyên ngôn độc lập đầu tiên.',
        'Sai — Trần Hưng Đạo soạn "Hịch tướng sĩ". Đáp án đúng là <b>Lý Thường Kiệt</b> cho "Nam quốc sơn hà".',
      ]
    ),
    Q('Chiến lược nổi tiếng "tiên phát chế nhân" có nghĩa?', ['Cầu hoà', 'Đầu hàng', 'Phòng thủ', 'Chủ động tấn công trước'], 3, '"Tiên phát chế nhân" = đánh phủ đầu.',
      [
        '<b>"Tiên phát chế nhân"</b> nghĩa là <b>ra tay trước để chế ngự đối phương</b> — tức chủ động tấn công trước, đánh phủ đầu.',
        '<ul><li>Năm 1075, Lý Thường Kiệt đem quân đánh các căn cứ hậu cần của Tống trên đất Tống rồi chủ động rút về.</li><li>Đây là tư tưởng quân sự táo bạo, biến thế bị động thành chủ động.</li></ul>',
      ],
      [
        'Sai — "tiên phát chế nhân" không phải cầu hoà. Đáp án đúng là <b>chủ động tấn công trước</b>.',
        'Sai — đây là chiến lược tấn công, không phải đầu hàng. Đáp án đúng là <b>chủ động tấn công trước</b>.',
        'Sai — không phải phòng thủ mà là chủ động. Đáp án đúng là <b>chủ động tấn công trước</b>.',
        'Đúng — "tiên phát chế nhân" nghĩa là <b>chủ động tấn công trước</b>, đánh phủ đầu.',
      ]
    ),
  ]),

  M(10, 'Đền Ngọc Sơn — Hồ Hoàn Kiếm', [
    Q('Hồ Hoàn Kiếm còn gọi là?', ['Hồ Trúc Bạch', 'Hồ Bảy Mẫu', 'Hồ Tây', 'Hồ Gươm'], 3, 'Hồ Gươm là tên dân gian.',
      [
        '<b>Hồ Hoàn Kiếm</b> nằm ở trung tâm quận Hoàn Kiếm, dân gian quen gọi là <b>Hồ Gươm</b>.',
        '<ul><li>Tên "Hoàn Kiếm" (trả gươm) gắn với truyền thuyết Lê Lợi trả gươm thần cho Rùa Vàng.</li><li>Hồ Tây, Hồ Trúc Bạch, Hồ Bảy Mẫu là những hồ khác của Hà Nội.</li></ul>',
      ],
      [
        'Sai — Hồ Trúc Bạch là hồ khác, gần Hồ Tây. Đáp án đúng là <b>Hồ Gươm</b> cho Hồ Hoàn Kiếm.',
        'Sai — Hồ Bảy Mẫu nằm trong công viên Thống Nhất. Đáp án đúng là <b>Hồ Gươm</b>.',
        'Sai — Hồ Tây là hồ lớn nhất Hà Nội, khác Hồ Hoàn Kiếm. Đáp án đúng là <b>Hồ Gươm</b>.',
        'Đúng — Hồ Hoàn Kiếm còn gọi là <b>Hồ Gươm</b>.',
      ]
    ),
    Q('Truyền thuyết Hồ Gươm gắn với ai?', ['An Dương Vương', 'Trần Hưng Đạo', 'Lý Thái Tổ dời đô', 'Vua Lê Lợi trả gươm cho rùa thần'], 3, 'Lê Lợi trả gươm → tên Hồ Hoàn Kiếm.',
      [
        'Truyền thuyết Hồ Gươm kể về việc <b>vua Lê Lợi trả gươm thần cho Rùa Vàng</b> sau khi đánh thắng quân Minh.',
        '<ul><li>Đức Long Quân cho mượn gươm báu "Thuận Thiên" để đánh giặc.</li><li>Khi đất nước thanh bình, Rùa Vàng nổi lên đòi gươm — từ đó hồ mang tên <b>Hoàn Kiếm</b> (trả gươm).</li></ul>',
      ],
      [
        'Sai — An Dương Vương gắn với truyền thuyết Cổ Loa, nỏ thần. Đáp án đúng là <b>vua Lê Lợi trả gươm cho rùa thần</b>.',
        'Sai — Trần Hưng Đạo gắn với kháng chiến chống Nguyên. Đáp án đúng là <b>vua Lê Lợi trả gươm cho rùa thần</b>.',
        'Sai — Lý Thái Tổ gắn với việc dời đô, không phải truyền thuyết Hồ Gươm. Đáp án đúng là <b>vua Lê Lợi trả gươm cho rùa thần</b>.',
        'Đúng — truyền thuyết Hồ Gươm gắn với <b>vua Lê Lợi trả gươm cho rùa thần</b>.',
      ]
    ),
    Q('Đền Ngọc Sơn thờ ai?', ['Quang Trung', 'Lý Thái Tổ', 'Bác Hồ', 'Văn Xương đế quân và Trần Hưng Đạo'], 3, 'Đền thờ Văn Xương + Trần Hưng Đạo.',
      [
        '<b>Đền Ngọc Sơn</b> trên đảo Ngọc giữa Hồ Gươm thờ <b>Văn Xương đế quân</b> (thần chủ về văn chương, thi cử) và <b>Trần Hưng Đạo</b>.',
        '<ul><li>Đền còn phối thờ Quan Vũ và Lã Tổ, thể hiện sự dung hợp tín ngưỡng.</li><li>Trong đền lưu giữ tiêu bản <i>"cụ Rùa"</i> Hồ Gươm.</li></ul>',
      ],
      [
        'Sai — đền không thờ Quang Trung. Đáp án đúng là <b>Văn Xương đế quân và Trần Hưng Đạo</b>.',
        'Sai — đền không thờ Lý Thái Tổ. Đáp án đúng là <b>Văn Xương đế quân và Trần Hưng Đạo</b>.',
        'Sai — đền không thờ Bác Hồ. Đáp án đúng là <b>Văn Xương đế quân và Trần Hưng Đạo</b>.',
        'Đúng — Đền Ngọc Sơn thờ <b>Văn Xương đế quân và Trần Hưng Đạo</b>.',
      ]
    ),
    Q('Cầu nối ra đền Ngọc Sơn?', ['Cầu Thê Húc', 'Cầu Long Biên', 'Cầu Nhật Tân', 'Cầu Chương Dương'], 0, 'Cầu Thê Húc sơn đỏ nổi tiếng.',
      [
        '<b>Cầu Thê Húc</b> (nghĩa là "đậu ánh sáng ban mai") là cây cầu gỗ sơn màu đỏ son, cong cong nối bờ hồ ra đảo Ngọc — vào đền Ngọc Sơn.',
        '<ul><li>Cầu do nhà nho Nguyễn Văn Siêu cho dựng năm 1865.</li><li>Long Biên, Chương Dương, Nhật Tân là những cây cầu lớn bắc qua sông Hồng.</li></ul>',
      ],
      [
        'Đúng — <b>Cầu Thê Húc</b> sơn đỏ là cầu nối ra đền Ngọc Sơn.',
        'Sai — Cầu Long Biên bắc qua sông Hồng. Đáp án đúng là <b>Cầu Thê Húc</b>.',
        'Sai — Cầu Nhật Tân bắc qua sông Hồng. Đáp án đúng là <b>Cầu Thê Húc</b>.',
        'Sai — Cầu Chương Dương bắc qua sông Hồng. Đáp án đúng là <b>Cầu Thê Húc</b>.',
      ]
    ),
    Q('Tháp Rùa ở giữa hồ xây thời?', ['Thời Lê', 'Thời Trần', 'Cuối XIX (Bá Hộ Kim)', 'Thời Lý'], 2, 'Tháp Rùa xây cuối XIX bởi Bá Hộ Kim.',
      [
        '<b>Tháp Rùa</b> trên gò đảo giữa Hồ Gươm được xây vào <b>cuối thế kỉ XIX</b> (khoảng 1886) do <b>Bá Hộ Kim</b> (Nguyễn Ngọc Kim) đứng ra dựng.',
        '<ul><li>Tháp mang kiến trúc pha trộn phong cách Việt và Pháp.</li><li>Ngày nay, Tháp Rùa là một <i>biểu tượng quen thuộc</i> của Hồ Gươm và Hà Nội.</li></ul>',
      ],
      [
        'Sai — Tháp Rùa không có từ thời Lê. Đáp án đúng là <b>cuối XIX (Bá Hộ Kim)</b>.',
        'Sai — Tháp Rùa không phải công trình thời Trần. Đáp án đúng là <b>cuối XIX (Bá Hộ Kim)</b>.',
        'Đúng — Tháp Rùa xây <b>cuối thế kỉ XIX bởi Bá Hộ Kim</b>.',
        'Sai — Tháp Rùa muộn hơn thời Lý rất nhiều. Đáp án đúng là <b>cuối XIX (Bá Hộ Kim)</b>.',
      ]
    ),
  ]),

  M(11, 'Lễ hội chùa Hương', [
    Q('Lễ hội chùa Hương ở huyện nào?', ['Thạch Thất', 'Chương Mỹ', 'Phú Xuyên', 'Mỹ Đức'], 3, 'Chùa Hương ở xã Hương Sơn, huyện Mỹ Đức.',
      [
        '<b>Chùa Hương (Hương Sơn)</b> nằm ở xã Hương Sơn, huyện <b>Mỹ Đức</b>, phía tây nam Hà Nội.',
        '<ul><li>Là một quần thể chùa, động, suối trải dài trong vùng núi đá vôi.</li><li>Đây là điểm hành hương Phật giáo lớn nhất miền Bắc mỗi dịp đầu xuân.</li></ul>',
      ],
      [
        'Sai — Thạch Thất là huyện khác, gắn với chùa Tây Phương. Đáp án đúng là <b>Mỹ Đức</b>.',
        'Sai — Chương Mỹ gắn với làng mây tre Phú Vinh. Đáp án đúng là <b>Mỹ Đức</b>.',
        'Sai — Phú Xuyên là huyện ở phía nam, khác chùa Hương. Đáp án đúng là <b>Mỹ Đức</b>.',
        'Đúng — chùa Hương ở xã Hương Sơn, huyện <b>Mỹ Đức</b>.',
      ]
    ),
    Q('Lễ hội chùa Hương kéo dài?', ['Một ngày', 'Từ tháng 1 đến tháng 3 âm lịch', 'Cả năm', 'Một tuần'], 1, 'Lễ hội kéo dài hơn 2 tháng.',
      [
        '<b>Lễ hội chùa Hương</b> là một trong những lễ hội dài nhất nước, kéo dài <b>từ mồng 6 tháng Giêng đến hết tháng 3 âm lịch</b>.',
        '<ul><li>Cao điểm là từ rằm tháng Giêng đến 18 tháng Hai âm lịch.</li><li>Hàng triệu lượt khách trẩy hội mỗi mùa xuân.</li></ul>',
      ],
      [
        'Sai — lễ hội kéo dài nhiều tháng, không phải một ngày. Đáp án đúng là <b>từ tháng 1 đến tháng 3 âm lịch</b>.',
        'Đúng — lễ hội chùa Hương kéo dài <b>từ tháng 1 đến tháng 3 âm lịch</b> (hơn 2 tháng).',
        'Sai — lễ hội không kéo dài cả năm. Đáp án đúng là <b>từ tháng 1 đến tháng 3 âm lịch</b>.',
        'Sai — lễ hội dài hơn một tuần. Đáp án đúng là <b>từ tháng 1 đến tháng 3 âm lịch</b>.',
      ]
    ),
    Q('Phương tiện đến chùa Hương qua suối Yến?', ['Cáp treo (gần đây cũng có)', 'Xe máy', 'Đò gỗ', 'Đi bộ duy nhất'], 2, 'Đò trên suối Yến — Cáp treo có thêm sau này.',
      [
        'Để vào quần thể chùa Hương, du khách đi <b>đò gỗ trên suối Yến</b> — một nét đặc trưng không thể thiếu của lễ hội.',
        '<ul><li>Suối Yến uốn lượn giữa cảnh non nước hữu tình.</li><li>Đến chân động Hương Tích, gần đây có thêm <i>cáp treo</i> hỗ trợ leo núi, nhưng đò trên suối Yến vẫn là phương tiện chính.</li></ul>',
      ],
      [
        'Sai — cáp treo chỉ phục vụ đoạn lên động, không qua suối Yến. Đáp án đúng là <b>đò gỗ</b>.',
        'Sai — không đi xe máy trên suối Yến. Đáp án đúng là <b>đò gỗ</b>.',
        'Đúng — du khách đi <b>đò gỗ</b> trên suối Yến để vào chùa Hương.',
        'Sai — phương tiện qua suối là đò, không phải đi bộ. Đáp án đúng là <b>đò gỗ</b>.',
      ]
    ),
    Q('Động Hương Tích được mệnh danh?', ['"Nam thiên đệ nhất động"', '"Đệ nhất danh thắng Bắc Hà"', 'Nóc nhà', 'Hoàng thành'], 0, '"Nam thiên đệ nhất động" — chữ của chúa Trịnh.',
      [
        '<b>Động Hương Tích</b> được mệnh danh là <b>"Nam thiên đệ nhất động"</b> — động đẹp nhất trời Nam.',
        '<ul><li>Năm chữ này tương truyền do <i>chúa Trịnh Sâm</i> đề tạc trên cửa động năm 1770.</li><li>Trong động có nhiều khối thạch nhũ kì thú như "Đụn Gạo", "Cây Vàng", "Cây Bạc".</li></ul>',
      ],
      [
        'Đúng — động Hương Tích được mệnh danh là <b>"Nam thiên đệ nhất động"</b>.',
        'Sai — đây không phải danh xưng của động Hương Tích. Đáp án đúng là <b>"Nam thiên đệ nhất động"</b>.',
        'Sai — "nóc nhà" thường chỉ Phan Xi Păng, không phải động Hương Tích. Đáp án đúng là <b>"Nam thiên đệ nhất động"</b>.',
        'Sai — "Hoàng thành" là di tích khác. Đáp án đúng là <b>"Nam thiên đệ nhất động"</b>.',
      ]
    ),
    Q('Lễ hội chùa Hương thuộc tín ngưỡng?', ['Phật giáo', 'Thiên Chúa giáo', 'Hồi giáo', 'Đạo giáo'], 0, 'Chùa Hương là quần thể Phật giáo lớn.',
      [
        '<b>Lễ hội chùa Hương</b> thuộc tín ngưỡng <b>Phật giáo</b> — là cuộc hành hương về miền đất Phật.',
        '<ul><li>Quần thể thờ Phật Bà Quan Âm, gắn với hình ảnh từ bi cứu khổ.</li><li>Người trẩy hội cầu bình an, may mắn cho năm mới.</li></ul>',
      ],
      [
        'Đúng — lễ hội chùa Hương thuộc tín ngưỡng <b>Phật giáo</b>.',
        'Sai — chùa Hương không thuộc Thiên Chúa giáo. Đáp án đúng là <b>Phật giáo</b>.',
        'Sai — chùa Hương không thuộc Hồi giáo. Đáp án đúng là <b>Phật giáo</b>.',
        'Sai — chùa Hương là quần thể chùa Phật, không phải Đạo giáo. Đáp án đúng là <b>Phật giáo</b>.',
      ]
    ),
  ]),

  M(12, 'Lễ hội Gò Đống Đa', [
    Q('Lễ hội Gò Đống Đa tổ chức ngày?', ['1/1 dương lịch', '10/10 dương lịch', 'Mùng 5 Tết âm lịch', '15/8 âm lịch'], 2, 'Mùng 5 Tết — kỉ niệm chiến thắng Ngọc Hồi — Đống Đa.',
      [
        '<b>Lễ hội Gò Đống Đa</b> được tổ chức vào <b>mùng 5 Tết âm lịch</b> hằng năm.',
        '<ul><li>Đây là ngày kỉ niệm chiến thắng <b>Ngọc Hồi — Đống Đa</b> (Tết Kỷ Dậu 1789).</li><li>Vua Quang Trung đại phá 29 vạn quân Thanh, giải phóng Thăng Long.</li></ul>',
      ],
      [
        'Sai — không tổ chức vào 1/1 dương lịch. Đáp án đúng là <b>mùng 5 Tết âm lịch</b>.',
        'Sai — không phải 10/10. Đáp án đúng là <b>mùng 5 Tết âm lịch</b> — ngày chiến thắng Ngọc Hồi — Đống Đa.',
        'Đúng — lễ hội Gò Đống Đa tổ chức vào <b>mùng 5 Tết âm lịch</b>.',
        'Sai — không phải 15/8 âm lịch. Đáp án đúng là <b>mùng 5 Tết âm lịch</b>.',
      ]
    ),
    Q('Lễ hội tưởng nhớ chiến thắng nào?', ['Vạn Tường', 'Bạch Đằng', 'Chi Lăng', 'Quang Trung đại phá quân Thanh Tết Kỷ Dậu 1789'], 3, 'Chiến thắng Ngọc Hồi — Đống Đa năm 1789.',
      [
        'Lễ hội tưởng nhớ chiến thắng <b>Ngọc Hồi — Đống Đa</b>, khi <b>Quang Trung đại phá quân Thanh Tết Kỷ Dậu 1789</b>.',
        '<ul><li>Chỉ trong 5 ngày Tết, nghĩa quân Tây Sơn hành quân thần tốc đánh tan quân Thanh.</li><li>Gò Đống Đa là nơi chôn xác giặc, thành gò đống.</li></ul>',
      ],
      [
        'Sai — Vạn Tường là trận đánh thời kháng chiến chống Mỹ. Đáp án đúng là <b>Quang Trung đại phá quân Thanh Tết Kỷ Dậu 1789</b>.',
        'Sai — Bạch Đằng gắn với Ngô Quyền, Trần Hưng Đạo. Đáp án đúng là <b>Quang Trung đại phá quân Thanh Tết Kỷ Dậu 1789</b>.',
        'Sai — Chi Lăng gắn với khởi nghĩa Lam Sơn. Đáp án đúng là <b>Quang Trung đại phá quân Thanh Tết Kỷ Dậu 1789</b>.',
        'Đúng — lễ hội tưởng nhớ <b>Quang Trung đại phá quân Thanh Tết Kỷ Dậu 1789</b>.',
      ]
    ),
    Q('Quân Thanh do ai chỉ huy bị đánh bại?', ['Ô Mã Nhi', 'Tôn Sĩ Nghị', 'Hứa Thế Hanh', 'Lư Hán'], 1, 'Tôn Sĩ Nghị là tổng chỉ huy quân Thanh.',
      [
        '<b>Tôn Sĩ Nghị</b> là tổng chỉ huy đạo quân Thanh xâm lược, bị Quang Trung đánh bại tại Ngọc Hồi — Đống Đa (1789).',
        '<ul><li>Tôn Sĩ Nghị tháo chạy vội vã, bỏ cả ấn tín.</li><li>Ô Mã Nhi là tướng Nguyên (thời Trần), không phải tướng Thanh.</li></ul>',
      ],
      [
        'Sai — Ô Mã Nhi là tướng Nguyên thời Trần. Đáp án đúng là <b>Tôn Sĩ Nghị</b>.',
        'Đúng — <b>Tôn Sĩ Nghị</b> là tổng chỉ huy quân Thanh bị đánh bại.',
        'Sai — Hứa Thế Hanh là phó tướng, không phải tổng chỉ huy. Đáp án đúng là <b>Tôn Sĩ Nghị</b>.',
        'Sai — Lư Hán không phải tổng chỉ huy quân Thanh năm 1789. Đáp án đúng là <b>Tôn Sĩ Nghị</b>.',
      ]
    ),
    Q('Gò Đống Đa nay thuộc quận?', ['Hai Bà Trưng', 'Hoàn Kiếm', 'Ba Đình', 'Đống Đa'], 3, 'Gò Đống Đa thuộc quận Đống Đa.',
      [
        '<b>Gò Đống Đa</b> nay nằm ở phường Quang Trung, thuộc quận <b>Đống Đa</b>, Hà Nội.',
        '<ul><li>Tên quận Đống Đa lấy từ chính di tích lịch sử này.</li><li>Tại đây có tượng đài và công viên văn hoá Đống Đa.</li></ul>',
      ],
      [
        'Sai — không thuộc quận Hai Bà Trưng. Đáp án đúng là <b>Đống Đa</b>.',
        'Sai — không thuộc quận Hoàn Kiếm. Đáp án đúng là <b>Đống Đa</b>.',
        'Sai — không thuộc quận Ba Đình. Đáp án đúng là <b>Đống Đa</b>.',
        'Đúng — Gò Đống Đa thuộc quận <b>Đống Đa</b>.',
      ]
    ),
    Q('Nghi lễ chính của hội?', ['Bắn cung', 'Đua thuyền', 'Tế lễ, rước kiệu, đánh trận giả', 'Đấu vật'], 2, 'Lễ hội có rước kiệu và tái hiện trận đánh.',
      [
        'Nghi lễ chính của hội Gò Đống Đa gồm <b>tế lễ, rước kiệu và đánh trận giả</b> tái hiện chiến thắng năm xưa.',
        '<ul><li>Màn rước "rồng lửa Thăng Long" là điểm nhấn độc đáo.</li><li>Lễ hội vừa tưởng niệm anh hùng, vừa giáo dục truyền thống yêu nước.</li></ul>',
      ],
      [
        'Sai — bắn cung không phải nghi lễ chính của hội này. Đáp án đúng là <b>tế lễ, rước kiệu, đánh trận giả</b>.',
        'Sai — đua thuyền không phải nghi lễ hội Đống Đa. Đáp án đúng là <b>tế lễ, rước kiệu, đánh trận giả</b>.',
        'Đúng — nghi lễ chính gồm <b>tế lễ, rước kiệu, đánh trận giả</b>.',
        'Sai — đấu vật không phải nghi lễ chính. Đáp án đúng là <b>tế lễ, rước kiệu, đánh trận giả</b>.',
      ]
    ),
  ]),

  M(13, 'Hội Gióng — Di sản phi vật thể', [
    Q('Hội Gióng đền Phù Đổng tổ chức ở?', ['Đông Anh', 'Long Biên, Hà Nội', 'Gia Lâm, Hà Nội', 'Sóc Sơn'], 2, 'Đền Phù Đổng ở Gia Lâm.',
      [
        '<b>Hội Gióng đền Phù Đổng</b> được tổ chức ở xã Phù Đổng, huyện <b>Gia Lâm</b> — nơi tương truyền là quê hương Thánh Gióng.',
        '<ul><li>Đây là hội Gióng gốc, quy mô lớn và cổ kính nhất.</li><li>Hội Gióng đền Sóc thì ở huyện Sóc Sơn.</li></ul>',
      ],
      [
        'Sai — đền Phù Đổng không ở Đông Anh. Đáp án đúng là <b>Gia Lâm, Hà Nội</b>.',
        'Sai — đền Phù Đổng không ở Long Biên. Đáp án đúng là <b>Gia Lâm, Hà Nội</b>.',
        'Đúng — Hội Gióng đền Phù Đổng tổ chức ở <b>Gia Lâm, Hà Nội</b>.',
        'Sai — Sóc Sơn là nơi có đền Sóc, không phải đền Phù Đổng. Đáp án đúng là <b>Gia Lâm, Hà Nội</b>.',
      ]
    ),
    Q('Hội Gióng đền Sóc tổ chức ở?', ['Sóc Sơn', 'Đông Anh', 'Gia Lâm', 'Mê Linh'], 0, 'Đền Sóc ở Sóc Sơn.',
      [
        '<b>Hội Gióng đền Sóc</b> được tổ chức ở khu di tích đền Sóc, núi Sóc, huyện <b>Sóc Sơn</b> — nơi tương truyền Thánh Gióng bay về trời.',
        '<ul><li>Hội mở vào mồng 6 tháng Giêng âm lịch.</li><li>Cùng với hội Phù Đổng, đây là một trong hai trung tâm hội Gióng tiêu biểu.</li></ul>',
      ],
      [
        'Đúng — Hội Gióng đền Sóc tổ chức ở <b>Sóc Sơn</b>.',
        'Sai — đền Sóc không ở Đông Anh. Đáp án đúng là <b>Sóc Sơn</b>.',
        'Sai — Gia Lâm là nơi có đền Phù Đổng. Đáp án đúng là <b>Sóc Sơn</b> cho đền Sóc.',
        'Sai — đền Sóc không ở Mê Linh. Đáp án đúng là <b>Sóc Sơn</b>.',
      ]
    ),
    Q('Hội Gióng thờ ai?', ['Trần Hưng Đạo', 'Thánh Gióng (Phù Đổng Thiên Vương)', 'An Dương Vương', 'Hai Bà Trưng'], 1, 'Thánh Gióng — Phù Đổng Thiên Vương.',
      [
        '<b>Hội Gióng</b> thờ <b>Thánh Gióng (Phù Đổng Thiên Vương)</b> — một trong "Tứ bất tử" của tín ngưỡng dân gian Việt Nam.',
        '<ul><li>Thánh Gióng là cậu bé làng Phù Đổng vươn vai thành tráng sĩ, cưỡi ngựa sắt đánh giặc Ân.</li><li>Là biểu tượng cho sức mạnh và tinh thần chống ngoại xâm.</li></ul>',
      ],
      [
        'Sai — hội Gióng không thờ Trần Hưng Đạo. Đáp án đúng là <b>Thánh Gióng (Phù Đổng Thiên Vương)</b>.',
        'Đúng — Hội Gióng thờ <b>Thánh Gióng (Phù Đổng Thiên Vương)</b>.',
        'Sai — An Dương Vương gắn với Cổ Loa. Đáp án đúng là <b>Thánh Gióng (Phù Đổng Thiên Vương)</b>.',
        'Sai — Hai Bà Trưng được thờ ở đền khác. Đáp án đúng là <b>Thánh Gióng (Phù Đổng Thiên Vương)</b>.',
      ]
    ),
    Q('Hội Gióng được UNESCO công nhận năm?', ['2000', '2010', '2015', '2008'], 1, 'Năm 2010 — Di sản phi vật thể đại diện nhân loại.',
      [
        '<b>Hội Gióng</b> ở đền Phù Đổng và đền Sóc được UNESCO ghi danh là <b>Di sản văn hoá phi vật thể đại diện của nhân loại</b> vào năm <code>2010</code>.',
        '<ul><li>Đúng dịp Đại lễ 1000 năm Thăng Long — Hà Nội.</li><li>Đây là một trong những di sản phi vật thể tiêu biểu của Hà Nội.</li></ul>',
      ],
      [
        'Sai — <code>2000</code> quá sớm. Đáp án đúng là <b>2010</b>.',
        'Đúng — Hội Gióng được UNESCO công nhận năm <b>2010</b>.',
        'Sai — <code>2015</code> muộn hơn thực tế. Đáp án đúng là <b>2010</b>.',
        'Sai — <code>2008</code> là năm Hà Nội mở rộng địa giới. Đáp án đúng là <b>2010</b>.',
      ]
    ),
    Q('Hội Gióng tổ chức tháng?', ['Tháng 4 âm lịch (đền Phù Đổng)', 'Tháng Giêng', 'Tháng 10', 'Tháng 7'], 0, 'Hội Gióng Phù Đổng mùng 9 tháng 4 âm.',
      [
        '<b>Hội Gióng đền Phù Đổng</b> diễn ra vào <b>mồng 9 tháng 4 âm lịch</b> hằng năm.',
        '<ul><li>Còn hội Gióng đền Sóc mở vào mồng 6 tháng Giêng âm lịch.</li><li>Hội Phù Đổng nổi tiếng với màn diễn trận, rước cờ, "ông Hiệu" tái hiện cảnh đánh giặc.</li></ul>',
      ],
      [
        'Đúng — hội Gióng đền Phù Đổng tổ chức <b>tháng 4 âm lịch</b> (mồng 9).',
        'Sai — tháng Giêng là hội Gióng đền Sóc, không phải đền Phù Đổng. Đáp án đúng là <b>tháng 4 âm lịch (đền Phù Đổng)</b>.',
        'Sai — hội Gióng không tổ chức tháng 10. Đáp án đúng là <b>tháng 4 âm lịch (đền Phù Đổng)</b>.',
        'Sai — hội Gióng không tổ chức tháng 7. Đáp án đúng là <b>tháng 4 âm lịch (đền Phù Đổng)</b>.',
      ]
    ),
  ]),

  M(14, 'Làng nghề truyền thống Hà Nội — Bát Tràng', [
    Q('Bát Tràng nổi tiếng nghề?', ['Đúc đồng', 'Gốm sứ', 'Dệt lụa tơ tằm', 'Tre đan'], 1, 'Bát Tràng là làng gốm cổ truyền nổi tiếng.',
      [
        '<b>Bát Tràng</b> là làng nghề nổi tiếng với nghề <b>gốm sứ</b> cổ truyền hàng trăm năm.',
        '<ul><li>"Nhất chữ, nhì tranh, tam sành, tứ kiểng" — gốm Bát Tràng được giới chơi đồ ưa chuộng.</li><li>Sản phẩm men lam, men rạn nổi tiếng cả trong và ngoài nước.</li></ul>',
      ],
      [
        'Sai — đúc đồng là nghề của Ngũ Xã. Đáp án đúng là <b>gốm sứ</b> cho Bát Tràng.',
        'Đúng — Bát Tràng nổi tiếng với nghề <b>gốm sứ</b>.',
        'Sai — dệt lụa là nghề của Vạn Phúc. Đáp án đúng là <b>gốm sứ</b>.',
        'Sai — tre đan là nghề của Phú Vinh. Đáp án đúng là <b>gốm sứ</b>.',
      ]
    ),
    Q('Bát Tràng thuộc huyện?', ['Gia Lâm', 'Mỹ Đức', 'Đông Anh', 'Sóc Sơn'], 0, 'Bát Tràng ở Gia Lâm, ven sông Hồng.',
      [
        '<b>Làng gốm Bát Tràng</b> nằm ở xã Bát Tràng, huyện <b>Gia Lâm</b>, bên bờ sông Hồng — phía đông nam Hà Nội.',
        '<ul><li>Vị trí ven sông thuận lợi cho việc lấy đất sét và vận chuyển hàng hoá.</li><li>Nay Bát Tràng vừa là làng nghề vừa là điểm du lịch hấp dẫn.</li></ul>',
      ],
      [
        'Đúng — Bát Tràng thuộc huyện <b>Gia Lâm</b>, ven sông Hồng.',
        'Sai — Mỹ Đức là nơi có chùa Hương. Đáp án đúng là <b>Gia Lâm</b>.',
        'Sai — Đông Anh là nơi có Cổ Loa. Đáp án đúng là <b>Gia Lâm</b>.',
        'Sai — Sóc Sơn là nơi có đền Sóc. Đáp án đúng là <b>Gia Lâm</b>.',
      ]
    ),
    Q('Nghề gốm Bát Tràng có từ?', ['Thế kỉ XIV–XV', 'Thời Lý', 'Trước Công nguyên', 'Thế kỉ XX'], 0, 'Bát Tràng có lịch sử khoảng 700 năm.',
      [
        'Nghề gốm <b>Bát Tràng</b> hình thành khoảng <b>thế kỉ XIV–XV</b>, có lịch sử ước chừng <code>700 năm</code>.',
        '<ul><li>Tương truyền những dòng họ làm gốm từ Bồ Bát (Ninh Bình) ra lập nghiệp ven sông Hồng.</li><li>Trải qua nhiều thế kỉ, làng vẫn giữ và phát triển nghề gốm.</li></ul>',
      ],
      [
        'Đúng — nghề gốm Bát Tràng có từ <b>thế kỉ XIV–XV</b>, khoảng 700 năm.',
        'Sai — gốm Bát Tràng muộn hơn thời Lý. Đáp án đúng là <b>thế kỉ XIV–XV</b>.',
        'Sai — không phải trước Công nguyên. Đáp án đúng là <b>thế kỉ XIV–XV</b>.',
        'Sai — làng có lịch sử lâu đời, không phải mới ở thế kỉ XX. Đáp án đúng là <b>thế kỉ XIV–XV</b>.',
      ]
    ),
    Q('Sản phẩm gốm Bát Tràng nổi bật?', ['Vũ khí', 'Đồ điện tử', 'Vải lụa', 'Đồ thờ, ấm chén, bát đĩa, tượng'], 3, 'Gốm Bát Tràng đa dạng sản phẩm.',
      [
        'Sản phẩm gốm Bát Tràng rất đa dạng: <b>đồ thờ, ấm chén, bát đĩa, lọ hoa, tượng</b> trang trí...',
        '<ul><li>Nổi bật với nước men độc đáo và hoa văn truyền thống.</li><li>Sản phẩm vừa phục vụ đời sống, vừa mang giá trị nghệ thuật, xuất khẩu nhiều nước.</li></ul>',
      ],
      [
        'Sai — Bát Tràng không làm vũ khí. Đáp án đúng là <b>đồ thờ, ấm chén, bát đĩa, tượng</b>.',
        'Sai — Bát Tràng không làm đồ điện tử. Đáp án đúng là <b>đồ thờ, ấm chén, bát đĩa, tượng</b>.',
        'Sai — vải lụa là sản phẩm của Vạn Phúc. Đáp án đúng là <b>đồ thờ, ấm chén, bát đĩa, tượng</b>.',
        'Đúng — gốm Bát Tràng nổi bật với <b>đồ thờ, ấm chén, bát đĩa, tượng</b>.',
      ]
    ),
    Q('Hiện nay Bát Tràng là?', ['Điểm du lịch và trung tâm gốm sứ', 'Khu công nghiệp nặng', 'Sân bay', 'Cảng biển'], 0, 'Bát Tràng vừa sản xuất vừa du lịch.',
      [
        'Ngày nay, <b>Bát Tràng</b> vừa là <b>trung tâm sản xuất gốm sứ</b> lớn, vừa là <b>điểm du lịch làng nghề</b> hấp dẫn.',
        '<ul><li>Du khách có thể tự tay nặn gốm, tham quan chợ gốm, bảo tàng gốm.</li><li>Làng góp phần quảng bá văn hoá thủ công truyền thống của Hà Nội.</li></ul>',
      ],
      [
        'Đúng — hiện nay Bát Tràng là <b>điểm du lịch và trung tâm gốm sứ</b>.',
        'Sai — Bát Tràng không phải khu công nghiệp nặng. Đáp án đúng là <b>điểm du lịch và trung tâm gốm sứ</b>.',
        'Sai — Bát Tràng không phải sân bay. Đáp án đúng là <b>điểm du lịch và trung tâm gốm sứ</b>.',
        'Sai — Bát Tràng không phải cảng biển. Đáp án đúng là <b>điểm du lịch và trung tâm gốm sứ</b>.',
      ]
    ),
  ]),

  M(15, 'Làng nghề Hà Nội — Vạn Phúc, Đông Hồ', [
    Q('Làng Vạn Phúc nổi tiếng?', ['Đúc đồng', 'Gốm sứ', 'Tre đan', 'Lụa Hà Đông'], 3, 'Lụa Vạn Phúc — Lụa Hà Đông nổi tiếng.',
      [
        '<b>Làng Vạn Phúc</b> nổi tiếng với nghề dệt <b>lụa Hà Đông</b> — thứ lụa mềm mại, óng ả đã đi vào thơ ca.',
        '<ul><li>"Áo lụa Hà Đông" gắn liền với hình ảnh duyên dáng của người phụ nữ Việt.</li><li>Lụa Vạn Phúc có hoa văn tinh xảo, dệt hoàn toàn từ tơ tằm.</li></ul>',
      ],
      [
        'Sai — đúc đồng là nghề Ngũ Xã. Đáp án đúng là <b>lụa Hà Đông</b> cho Vạn Phúc.',
        'Sai — gốm sứ là nghề Bát Tràng. Đáp án đúng là <b>lụa Hà Đông</b>.',
        'Sai — tre đan là nghề Phú Vinh. Đáp án đúng là <b>lụa Hà Đông</b>.',
        'Đúng — làng Vạn Phúc nổi tiếng với <b>lụa Hà Đông</b>.',
      ]
    ),
    Q('Vạn Phúc thuộc quận?', ['Hà Đông', 'Đống Đa', 'Ba Đình', 'Hoàn Kiếm'], 0, 'Vạn Phúc ở quận Hà Đông.',
      [
        '<b>Làng lụa Vạn Phúc</b> nằm ở phường Vạn Phúc, quận <b>Hà Đông</b>, Hà Nội (vùng Hà Tây cũ).',
        '<ul><li>Vì thuộc Hà Đông nên lụa nơi đây quen gọi là "lụa Hà Đông".</li><li>Nay làng vẫn giữ nghề và đón khách du lịch.</li></ul>',
      ],
      [
        'Đúng — Vạn Phúc thuộc quận <b>Hà Đông</b>.',
        'Sai — Vạn Phúc không thuộc Đống Đa. Đáp án đúng là <b>Hà Đông</b>.',
        'Sai — Vạn Phúc không thuộc Ba Đình. Đáp án đúng là <b>Hà Đông</b>.',
        'Sai — Vạn Phúc không thuộc Hoàn Kiếm. Đáp án đúng là <b>Hà Đông</b>.',
      ]
    ),
    Q('Tranh Đông Hồ thuộc tỉnh?', ['Hải Dương', 'Hưng Yên', 'Bắc Ninh', 'Hà Nội'], 2, 'Đông Hồ ở Thuận Thành, Bắc Ninh (giáp Hà Nội).',
      [
        '<b>Tranh Đông Hồ</b> ra đời ở làng Đông Hồ, xã Song Hồ, huyện Thuận Thành, tỉnh <b>Bắc Ninh</b> (giáp Hà Nội).',
        '<ul><li>Tranh được in trên giấy điệp bằng các bản khắc gỗ, màu lấy từ thiên nhiên.</li><li>Đề tài quen thuộc: "Đám cưới chuột", "Lợn đàn", "Gà mái"...</li></ul>',
      ],
      [
        'Sai — Đông Hồ không ở Hải Dương. Đáp án đúng là <b>Bắc Ninh</b>.',
        'Sai — Đông Hồ không ở Hưng Yên. Đáp án đúng là <b>Bắc Ninh</b>.',
        'Đúng — tranh Đông Hồ thuộc tỉnh <b>Bắc Ninh</b> (Thuận Thành, giáp Hà Nội).',
        'Sai — Đông Hồ thuộc Bắc Ninh, không phải Hà Nội. Đáp án đúng là <b>Bắc Ninh</b>.',
      ]
    ),
    Q('Tranh dân gian Hàng Trống ở?', ['Bắc Ninh', 'Hải Dương', 'Hà Tây cũ', 'Hà Nội (phố Hàng Trống)'], 3, 'Tranh Hàng Trống là tranh dân gian Hà Nội.',
      [
        '<b>Tranh Hàng Trống</b> là dòng tranh dân gian của <b>Hà Nội</b>, xuất xứ từ <b>phố Hàng Trống</b> (quận Hoàn Kiếm).',
        '<ul><li>Khác với Đông Hồ (in toàn bộ), tranh Hàng Trống <i>in nét rồi tô màu bằng tay</i>.</li><li>Thường là tranh thờ, tranh Tết với màu sắc tươi tắn, đường nét thanh mảnh.</li></ul>',
      ],
      [
        'Sai — Bắc Ninh là quê tranh Đông Hồ. Đáp án đúng là <b>Hà Nội (phố Hàng Trống)</b>.',
        'Sai — tranh Hàng Trống không ở Hải Dương. Đáp án đúng là <b>Hà Nội (phố Hàng Trống)</b>.',
        'Sai — tranh Hàng Trống ở nội thành Hà Nội, không phải Hà Tây cũ. Đáp án đúng là <b>Hà Nội (phố Hàng Trống)</b>.',
        'Đúng — tranh Hàng Trống là tranh dân gian của <b>Hà Nội (phố Hàng Trống)</b>.',
      ]
    ),
    Q('Làng nghề mây tre đan nổi tiếng Hà Nội?', ['Vạn Phúc', 'Đông Hồ', 'Bát Tràng', 'Phú Vinh (Chương Mỹ)'], 3, 'Phú Vinh — làng mây tre đan nổi tiếng.',
      [
        '<b>Làng Phú Vinh</b> (xã Phú Nghĩa, huyện <b>Chương Mỹ</b>) là làng nghề <b>mây tre đan</b> nổi tiếng của Hà Nội.',
        '<ul><li>Được mệnh danh là "xứ mây" với những đôi tay tài hoa đan lát.</li><li>Sản phẩm tinh xảo: rổ rá, túi, đèn, đồ trang trí... xuất khẩu nhiều nước.</li></ul>',
      ],
      [
        'Sai — Vạn Phúc làm lụa. Đáp án đúng là <b>Phú Vinh (Chương Mỹ)</b> cho nghề mây tre đan.',
        'Sai — Đông Hồ làm tranh. Đáp án đúng là <b>Phú Vinh (Chương Mỹ)</b>.',
        'Sai — Bát Tràng làm gốm. Đáp án đúng là <b>Phú Vinh (Chương Mỹ)</b>.',
        'Đúng — <b>Phú Vinh (Chương Mỹ)</b> là làng mây tre đan nổi tiếng.',
      ]
    ),
  ]),

  M(16, 'Ẩm thực Hà Nội — Phở', [
    Q('Phở Hà Nội có nguồn gốc từ?', ['Thời Trần', 'Thời Lý', 'Đầu thế kỉ XX ở vùng Nam Định — Hà Nội', 'Thời Pháp thuộc'], 2, 'Phở xuất hiện đầu thế kỉ XX.',
      [
        '<b>Phở</b> được cho là xuất hiện vào <b>đầu thế kỉ XX</b>, hình thành ở vùng <b>Nam Định — Hà Nội</b>.',
        '<ul><li>Phở nhanh chóng trở thành món ăn đặc trưng, biểu tượng ẩm thực Hà Nội.</li><li>Ngày nay phở đã nổi tiếng khắp thế giới như một "đại sứ ẩm thực" của Việt Nam.</li></ul>',
      ],
      [
        'Sai — phở không có từ thời Trần. Đáp án đúng là <b>đầu thế kỉ XX ở vùng Nam Định — Hà Nội</b>.',
        'Sai — phở không có từ thời Lý. Đáp án đúng là <b>đầu thế kỉ XX ở vùng Nam Định — Hà Nội</b>.',
        'Đúng — phở có nguồn gốc <b>đầu thế kỉ XX ở vùng Nam Định — Hà Nội</b>.',
        'Sai — phở là món Việt, gắn với đầu thế kỉ XX. Đáp án đúng là <b>đầu thế kỉ XX ở vùng Nam Định — Hà Nội</b>.',
      ]
    ),
    Q('Phở Hà Nội đặc trưng với?', ['Nước dùng trong, bánh phở mỏng, hành lá', 'Sợi to', 'Không có nước dùng', 'Nước đục, bánh dày'], 0, 'Phở Hà Nội có nước dùng trong và thanh.',
      [
        '<b>Phở Hà Nội</b> đặc trưng với <b>nước dùng trong, thanh ngọt</b>, bánh phở <i>mỏng</i> và rắc <i>hành lá</i>.',
        '<ul><li>Nước dùng ninh từ xương bò/gà với gừng, hành nướng, quế, hồi.</li><li>Vị thanh đạm, không quá nhiều gia vị là nét riêng của phở Hà Nội.</li></ul>',
      ],
      [
        'Đúng — phở Hà Nội đặc trưng với <b>nước dùng trong, bánh phở mỏng, hành lá</b>.',
        'Sai — sợi phở Hà Nội mỏng chứ không to. Đáp án đúng là <b>nước dùng trong, bánh phở mỏng, hành lá</b>.',
        'Sai — phở luôn có nước dùng. Đáp án đúng là <b>nước dùng trong, bánh phở mỏng, hành lá</b>.',
        'Sai — phở Hà Nội nước trong, bánh mỏng. Đáp án đúng là <b>nước dùng trong, bánh phở mỏng, hành lá</b>.',
      ]
    ),
    Q('Phở Hà Nội có mấy loại chính?', ['2 (phở bò, phở gà)', '5 loại', '10 loại', '1 loại'], 0, 'Phở bò và phở gà là 2 loại chính.',
      [
        'Phở Hà Nội có <b>2 loại chính</b>: <b>phở bò</b> và <b>phở gà</b>.',
        '<ul><li>Phở bò có các kiểu: tái, chín, nạm, gầu...</li><li>Phở gà thường dùng thịt gà ta, nước dùng thanh nhẹ hơn.</li></ul>',
      ],
      [
        'Đúng — phở Hà Nội có <b>2 loại chính: phở bò, phở gà</b>.',
        'Sai — không phải 5 loại chính. Đáp án đúng là <b>2 (phở bò, phở gà)</b>.',
        'Sai — không phải 10 loại chính. Đáp án đúng là <b>2 (phở bò, phở gà)</b>.',
        'Sai — có hơn 1 loại. Đáp án đúng là <b>2 (phở bò, phở gà)</b>.',
      ]
    ),
    Q('Bún chả Hà Nội đặc trưng?', ['Thịt nướng chấm nước mắm chua ngọt với bún', 'Khô hoàn toàn', 'Trộn sẵn', 'Nước dùng nóng'], 0, 'Bún chả: thịt nướng + nước chấm + bún.',
      [
        '<b>Bún chả</b> Hà Nội gồm <b>thịt nướng</b> (viên chả và miếng chả) chấm với <b>nước mắm chua ngọt</b> pha đu đủ, cà rốt, ăn kèm <b>bún</b> và rau sống.',
        '<ul><li>Thịt được nướng trên than hoa thơm lừng.</li><li>Là món trưa quen thuộc, từng được nhiều du khách quốc tế biết đến.</li></ul>',
      ],
      [
        'Đúng — bún chả là <b>thịt nướng chấm nước mắm chua ngọt với bún</b>.',
        'Sai — bún chả có nước chấm, không khô hoàn toàn. Đáp án đúng là <b>thịt nướng chấm nước mắm chua ngọt với bún</b>.',
        'Sai — bún chả không trộn sẵn mà chấm. Đáp án đúng là <b>thịt nướng chấm nước mắm chua ngọt với bún</b>.',
        'Sai — nước chấm bún chả thường nguội/ấm, không phải nước dùng nóng. Đáp án đúng là <b>thịt nướng chấm nước mắm chua ngọt với bún</b>.',
      ]
    ),
    Q('Cốm làng Vòng đặc trưng vào mùa?', ['Mùa thu', 'Mùa đông', 'Mùa hè', 'Mùa xuân'], 0, 'Cốm Vòng là đặc sản mùa thu Hà Nội.',
      [
        '<b>Cốm làng Vòng</b> là đặc sản nổi tiếng của <b>mùa thu Hà Nội</b>, làm từ lúa nếp non.',
        '<ul><li>Hạt cốm xanh, dẻo, thơm, gói trong lá sen.</li><li>"Hà Nội mùa thu, mùa cốm xanh về..." — cốm gắn liền với hương thu Hà Thành.</li></ul>',
      ],
      [
        'Đúng — cốm làng Vòng là đặc sản <b>mùa thu</b> Hà Nội.',
        'Sai — cốm gắn với mùa thu, không phải mùa đông. Đáp án đúng là <b>mùa thu</b>.',
        'Sai — cốm không phải đặc sản mùa hè. Đáp án đúng là <b>mùa thu</b>.',
        'Sai — cốm không phải đặc sản mùa xuân. Đáp án đúng là <b>mùa thu</b>.',
      ]
    ),
  ]),

  M(17, 'Ẩm thực Hà Nội — Đặc sản khác', [
    Q('Bánh cuốn Thanh Trì nổi tiếng vì?', ['Vỏ cứng', 'Vị cay', 'Nhân thịt nhiều', 'Lớp bánh mỏng, mềm'], 3, 'Bánh cuốn Thanh Trì lớp mỏng đặc trưng.',
      [
        '<b>Bánh cuốn Thanh Trì</b> nổi tiếng vì <b>lớp bánh mỏng, mềm, mịn</b>, tráng khéo gần như trong suốt.',
        '<ul><li>Thường ăn với hành phi, chả quế và nước chấm pha khéo.</li><li>Là đặc sản lâu đời của vùng Thanh Trì, Hà Nội.</li></ul>',
      ],
      [
        'Sai — bánh cuốn Thanh Trì mỏng mềm, không phải vỏ cứng. Đáp án đúng là <b>lớp bánh mỏng, mềm</b>.',
        'Sai — đặc trưng không phải vị cay. Đáp án đúng là <b>lớp bánh mỏng, mềm</b>.',
        'Sai — bánh cuốn Thanh Trì truyền thống thường mỏng, ít/không nhân. Đáp án đúng là <b>lớp bánh mỏng, mềm</b>.',
        'Đúng — bánh cuốn Thanh Trì nổi tiếng vì <b>lớp bánh mỏng, mềm</b>.',
      ]
    ),
    Q('Chả cá Lã Vọng là?', ['Cá hấp', 'Cá kho', 'Cá rán', 'Cá nướng phục vụ với bún và rau'], 3, 'Chả cá Lã Vọng nổi tiếng phố Chả Cá.',
      [
        '<b>Chả cá Lã Vọng</b> là món cá (thường là cá lăng) ướp nghệ, <b>nướng rồi rán</b> trên chảo mỡ, ăn nóng với <b>bún, rau thơm, lạc rang</b> và mắm tôm.',
        '<ul><li>Món ăn gắn với phố Chả Cá (quận Hoàn Kiếm).</li><li>Là một trong những món ăn biểu tượng của ẩm thực Hà Nội.</li></ul>',
      ],
      [
        'Sai — chả cá không phải món cá hấp. Đáp án đúng là <b>cá nướng phục vụ với bún và rau</b>.',
        'Sai — chả cá không phải món cá kho. Đáp án đúng là <b>cá nướng phục vụ với bún và rau</b>.',
        'Sai — chả cá Lã Vọng được nướng rồi rán, đặc trưng là phục vụ nóng với bún và rau. Đáp án đúng là <b>cá nướng phục vụ với bún và rau</b>.',
        'Đúng — chả cá Lã Vọng là <b>cá nướng phục vụ với bún và rau</b>.',
      ]
    ),
    Q('Xôi xéo Hà Nội ăn với?', ['Đậu xanh, hành phi', 'Ruốc bông, lạp xưởng', 'Mật ong', 'Thịt sống'], 0, 'Xôi xéo có đậu xanh, hành phi.',
      [
        '<b>Xôi xéo</b> là món xôi nếp vàng óng (nhuộm nghệ) ăn kèm <b>đậu xanh</b> giã nhuyễn nắm thành khối, thái mỏng, rưới <b>mỡ và hành phi</b> thơm.',
        '<ul><li>Là món ăn sáng quen thuộc, bình dân của người Hà Nội.</li><li>Vị bùi của đậu xanh hoà cùng hành phi giòn rụm.</li></ul>',
      ],
      [
        'Đúng — xôi xéo ăn với <b>đậu xanh, hành phi</b>.',
        'Sai — ruốc bông, lạp xưởng là topping của xôi khác. Đáp án đúng là <b>đậu xanh, hành phi</b>.',
        'Sai — xôi xéo không ăn với mật ong. Đáp án đúng là <b>đậu xanh, hành phi</b>.',
        'Sai — xôi xéo không ăn với thịt sống. Đáp án đúng là <b>đậu xanh, hành phi</b>.',
      ]
    ),
    Q('Bánh tôm Hồ Tây làm từ?', ['Cá quả tươi, bột chiên', 'Mực ống, bột năng', 'Thịt cua đồng xay nhuyễn', 'Tôm tươi + bột chiên'], 3, 'Bánh tôm Hồ Tây là đặc sản ven hồ.',
      [
        '<b>Bánh tôm Hồ Tây</b> làm từ <b>tôm tươi</b> bọc <b>bột chiên</b> giòn, ăn nóng với rau sống và nước chấm chua ngọt.',
        '<ul><li>Món đặc sản gắn với khu vực ven Hồ Tây thơ mộng.</li><li>Tôm thường để cả con, chiên vàng giòn rất bắt mắt.</li></ul>',
      ],
      [
        'Sai — nguyên liệu chính là tôm, không phải cá quả. Đáp án đúng là <b>tôm tươi + bột chiên</b>.',
        'Sai — không làm từ mực. Đáp án đúng là <b>tôm tươi + bột chiên</b>.',
        'Sai — không làm từ cua đồng. Đáp án đúng là <b>tôm tươi + bột chiên</b>.',
        'Đúng — bánh tôm Hồ Tây làm từ <b>tôm tươi + bột chiên</b>.',
      ]
    ),
    Q('Trà sen Tây Hồ ướp?', ['Hoa nhài', 'Hoa lài', 'Sen Hồ Tây', 'Hoa cúc'], 2, 'Sen Hồ Tây ướp trà tạo nên trà sen.',
      [
        '<b>Trà sen Tây Hồ</b> là loại trà cầu kì, ướp hương từ <b>sen Hồ Tây</b> (sen Bách Diệp).',
        '<ul><li>Người làm tách lấy "gạo sen" (túi hương) để ướp vào trà.</li><li>Để có 1 kg trà sen cần hàng nghìn bông sen — nên đây là thức trà quý.</li></ul>',
      ],
      [
        'Sai — trà sen ướp bằng sen, không phải hoa nhài. Đáp án đúng là <b>sen Hồ Tây</b>.',
        'Sai — hoa lài dùng cho trà lài, không phải trà sen. Đáp án đúng là <b>sen Hồ Tây</b>.',
        'Đúng — trà sen Tây Hồ ướp bằng <b>sen Hồ Tây</b>.',
        'Sai — không ướp bằng hoa cúc. Đáp án đúng là <b>sen Hồ Tây</b>.',
      ]
    ),
  ]),

  M(18, 'Ôn tập HK1', [
    Q('Năm dời đô Đại La?', ['938', '1789', '1428', '1010'], 3, 'Lý Thái Tổ dời đô năm 1010.',
      [
        '<b>Năm 1010</b>, Lý Thái Tổ (Lý Công Uẩn) dời đô từ Hoa Lư về Đại La, đổi tên thành Thăng Long.',
        '<ul><li>Đây là mốc khởi đầu cho lịch sử nghìn năm của Thăng Long — Hà Nội.</li></ul>',
      ],
      [
        'Sai — 938 là chiến thắng Bạch Đằng của Ngô Quyền. Đáp án đúng là <b>1010</b>.',
        'Sai — 1789 là chiến thắng Ngọc Hồi — Đống Đa. Đáp án đúng là <b>1010</b>.',
        'Sai — 1428 là năm Lê Lợi lên ngôi. Đáp án đúng là <b>1010</b>.',
        'Đúng — Lý Thái Tổ dời đô năm <b>1010</b>.',
      ]
    ),
    Q('Văn Miếu xây năm?', ['1226', '1010', '1428', '1070'], 3, 'Văn Miếu xây năm 1070.',
      [
        '<b>Văn Miếu</b> được vua Lý Thánh Tông cho xây năm <code>1070</code> để thờ Khổng Tử.',
        '<ul><li>6 năm sau (1076), Quốc Tử Giám được lập bên cạnh — trường đại học đầu tiên của nước ta.</li></ul>',
      ],
      [
        'Sai — 1226 là năm nhà Trần thành lập. Đáp án đúng là <b>1070</b>.',
        'Sai — 1010 là năm dời đô. Đáp án đúng là <b>1070</b> cho năm xây Văn Miếu.',
        'Sai — 1428 là năm Lê Lợi lên ngôi. Đáp án đúng là <b>1070</b>.',
        'Đúng — Văn Miếu xây năm <b>1070</b>.',
      ]
    ),
    Q('Hội Gióng được UNESCO công nhận?', ['Hỗn hợp', 'Thiên nhiên', 'Di sản phi vật thể đại diện nhân loại', 'Tư liệu'], 2, 'Hội Gióng là Di sản phi vật thể nhân loại (2010).',
      [
        '<b>Hội Gióng</b> (đền Phù Đổng và đền Sóc) được UNESCO ghi danh là <b>Di sản văn hoá phi vật thể đại diện của nhân loại</b> năm 2010.',
        '<ul><li>Đây là loại hình di sản gắn với lễ hội, phong tục, tín ngưỡng — khác với di sản vật thể (công trình) hay tư liệu.</li></ul>',
      ],
      [
        'Sai — hội Gióng không phải di sản "hỗn hợp". Đáp án đúng là <b>di sản phi vật thể đại diện nhân loại</b>.',
        'Sai — hội Gióng không phải di sản "thiên nhiên". Đáp án đúng là <b>di sản phi vật thể đại diện nhân loại</b>.',
        'Đúng — Hội Gióng là <b>Di sản phi vật thể đại diện nhân loại</b> (2010).',
        'Sai — hội Gióng không phải di sản "tư liệu" (đó là bia Tiến sĩ). Đáp án đúng là <b>di sản phi vật thể đại diện nhân loại</b>.',
      ]
    ),
    Q('Bát Tràng nổi tiếng?', ['Đúc đồng', 'Tre đan', 'Gốm sứ', 'Đúc tượng đồng'], 2, 'Bát Tràng — gốm sứ truyền thống.',
      [
        '<b>Bát Tràng</b> (huyện Gia Lâm) là làng nghề <b>gốm sứ</b> truyền thống nổi tiếng nhất Hà Nội.',
        '<ul><li>Còn đúc đồng là nghề của làng Ngũ Xã (Ba Đình).</li></ul>',
      ],
      [
        'Sai — đúc đồng là nghề Ngũ Xã. Đáp án đúng là <b>gốm sứ</b>.',
        'Sai — tre đan là nghề Phú Vinh. Đáp án đúng là <b>gốm sứ</b>.',
        'Đúng — Bát Tràng nổi tiếng với <b>gốm sứ</b>.',
        'Sai — Bát Tràng làm gốm, không phải đúc tượng đồng. Đáp án đúng là <b>gốm sứ</b>.',
      ]
    ),
    Q('Phở Hà Nội có nước dùng?', ['Đục, đặc', 'Cay nồng', 'Trong, thanh', 'Ngọt như chè'], 2, 'Phở HN nước dùng trong, thanh.',
      [
        '<b>Phở Hà Nội</b> đặc trưng với <b>nước dùng trong, thanh</b> — ninh từ xương cùng gừng, hành nướng, quế hồi.',
        '<ul><li>Vị thanh đạm, tinh tế là nét riêng của phở Thủ đô.</li></ul>',
      ],
      [
        'Sai — phở Hà Nội nước trong, không đục đặc. Đáp án đúng là <b>trong, thanh</b>.',
        'Sai — phở Hà Nội không cay nồng. Đáp án đúng là <b>trong, thanh</b>.',
        'Đúng — phở Hà Nội có nước dùng <b>trong, thanh</b>.',
        'Sai — nước phở không ngọt như chè. Đáp án đúng là <b>trong, thanh</b>.',
      ]
    ),
  ]),

  // ===== HK2 — DI TÍCH, PHƯƠNG NGỮ, BẢN SẮC =====
  M(19, 'Di tích Đền Hai Bà Trưng', [
    Q('Đền Hai Bà Trưng ở Hà Nội nằm tại?', ['Mê Linh và Đồng Nhân (Hai Bà Trưng)', 'Đông Anh', 'Sóc Sơn', 'Sơn Tây'], 0, 'Đền chính ở Mê Linh — quê Hai Bà.',
      [
        '<b>Đền Hai Bà Trưng</b> ở Hà Nội nổi tiếng nhất tại <b>Mê Linh</b> (quê hương Hai Bà) và <b>Đồng Nhân</b> (quận Hai Bà Trưng).',
        '<ul><li>Đền Mê Linh là nơi thờ chính, gắn với nơi Hai Bà dấy binh khởi nghĩa.</li><li>Đền Đồng Nhân tương truyền lập từ thời Lý, bên bờ sông Hồng.</li></ul>',
      ],
      [
        'Đúng — đền Hai Bà Trưng ở Hà Nội nằm tại <b>Mê Linh và Đồng Nhân</b>.',
        'Sai — Đông Anh là nơi có Cổ Loa, không phải đền Hai Bà. Đáp án đúng là <b>Mê Linh và Đồng Nhân</b>.',
        'Sai — Sóc Sơn có đền Sóc thờ Thánh Gióng. Đáp án đúng là <b>Mê Linh và Đồng Nhân</b>.',
        'Sai — Sơn Tây gắn với thành cổ và làng Đường Lâm. Đáp án đúng là <b>Mê Linh và Đồng Nhân</b>.',
      ]
    ),
    Q('Hai Bà Trưng khởi nghĩa năm?', ['Năm 40', 'Năm 1428', 'Năm 1010', 'Năm 938'], 0, 'Khởi nghĩa năm 40 chống nhà Đông Hán.',
      [
        '<b>Khởi nghĩa Hai Bà Trưng</b> nổ ra năm <code>40</code> (sau Công nguyên), chống ách đô hộ của nhà <b>Đông Hán</b>.',
        '<ul><li>Đây là cuộc khởi nghĩa lớn đầu tiên giành lại độc lập sau khi nước ta bị Bắc thuộc.</li><li>Hai Bà giành 65 thành, lập nền tự chủ trong thời gian ngắn.</li></ul>',
      ],
      [
        'Đúng — Hai Bà Trưng khởi nghĩa năm <b>40</b>.',
        'Sai — 1428 là năm Lê Lợi lên ngôi. Đáp án đúng là <b>năm 40</b>.',
        'Sai — 1010 là năm dời đô. Đáp án đúng là <b>năm 40</b>.',
        'Sai — 938 là chiến thắng Bạch Đằng của Ngô Quyền. Đáp án đúng là <b>năm 40</b>.',
      ]
    ),
    Q('Trưng Trắc xưng vương đóng đô ở?', ['Hoa Lư', 'Thăng Long', 'Mê Linh', 'Cổ Loa'], 2, 'Trưng Trắc đóng đô ở Mê Linh quê hương.',
      [
        'Sau khi giành thắng lợi, <b>Trưng Trắc</b> được tôn làm vua (Trưng Vương) và đóng đô ở <b>Mê Linh</b> — quê hương của Hai Bà.',
        '<ul><li>Mê Linh trở thành trung tâm của chính quyền tự chủ non trẻ.</li><li>Thăng Long, Hoa Lư, Cổ Loa là kinh đô của các thời kì khác.</li></ul>',
      ],
      [
        'Sai — Hoa Lư là kinh đô thời Đinh — Tiền Lê. Đáp án đúng là <b>Mê Linh</b>.',
        'Sai — Thăng Long là kinh đô từ thời Lý. Đáp án đúng là <b>Mê Linh</b>.',
        'Đúng — Trưng Trắc đóng đô ở <b>Mê Linh</b> — quê hương Hai Bà.',
        'Sai — Cổ Loa là kinh đô Âu Lạc của An Dương Vương. Đáp án đúng là <b>Mê Linh</b>.',
      ]
    ),
    Q('Câu nói nổi tiếng "Một xin rửa sạch nước thù" là của?', ['Triệu Quang Phục', 'Bà Triệu', 'Trưng Trắc', 'Mai Thúc Loan'], 2, 'Thề báo thù chồng và giải phóng đất nước.',
      [
        'Lời thề <i>"Một xin rửa sạch nước thù..."</i> tương truyền gắn với <b>Trưng Trắc</b> khi phất cờ khởi nghĩa.',
        '<ul><li>Lời thề thể hiện chí lớn: rửa hận nước, nối nghiệp xưa, đền nợ chồng (Thi Sách).</li><li>Khẳng định mục tiêu giải phóng đất nước khỏi ách đô hộ.</li></ul>',
      ],
      [
        'Sai — Triệu Quang Phục gắn với kháng chiến chống Lương sau này. Đáp án đúng là <b>Trưng Trắc</b>.',
        'Sai — Bà Triệu có câu nói nổi tiếng khác ("cưỡi cơn gió mạnh, đạp luồng sóng dữ"). Đáp án đúng là <b>Trưng Trắc</b>.',
        'Đúng — lời thề đó gắn với <b>Trưng Trắc</b>.',
        'Sai — Mai Thúc Loan lãnh đạo khởi nghĩa thế kỉ VIII. Đáp án đúng là <b>Trưng Trắc</b>.',
      ]
    ),
    Q('Lễ hội Hai Bà Trưng tổ chức?', ['Mùng 6 tháng 2 âm lịch', '5 Tết', '1/1 dương', '15/8 âm'], 0, 'Lễ hội 6/2 âm — ngày Hai Bà khởi nghĩa.',
      [
        '<b>Lễ hội đền Hai Bà Trưng</b> (Mê Linh) được tổ chức vào <b>mùng 6 tháng 2 âm lịch</b> hằng năm.',
        '<ul><li>Tương truyền đây là ngày Hai Bà tế cờ, phất cờ khởi nghĩa.</li><li>Lễ hội có rước kiệu, tế lễ, tưởng nhớ công lao Hai Bà.</li></ul>',
      ],
      [
        'Đúng — lễ hội Hai Bà Trưng tổ chức <b>mùng 6 tháng 2 âm lịch</b>.',
        'Sai — mùng 5 Tết là lễ hội Gò Đống Đa. Đáp án đúng là <b>mùng 6 tháng 2 âm lịch</b>.',
        'Sai — không tổ chức vào 1/1 dương. Đáp án đúng là <b>mùng 6 tháng 2 âm lịch</b>.',
        'Sai — không phải 15/8 âm. Đáp án đúng là <b>mùng 6 tháng 2 âm lịch</b>.',
      ]
    ),
  ]),

  M(20, 'Đền Cổ Loa — An Dương Vương', [
    Q('Cổ Loa thuộc huyện?', ['Gia Lâm', 'Mê Linh', 'Sóc Sơn', 'Đông Anh'], 3, 'Cổ Loa nay thuộc Đông Anh, Hà Nội.',
      [
        '<b>Cổ Loa</b> nay thuộc huyện <b>Đông Anh</b>, Hà Nội — phía bắc sông Hồng.',
        '<ul><li>Đây là kinh đô của nước Âu Lạc thời An Dương Vương (thế kỉ III TCN).</li><li>Cổ Loa là một trong những trung tâm lịch sử lâu đời nhất của Việt Nam.</li></ul>',
      ],
      [
        'Sai — Gia Lâm là nơi có Bát Tràng, đền Phù Đổng. Đáp án đúng là <b>Đông Anh</b>.',
        'Sai — Mê Linh gắn với Hai Bà Trưng. Đáp án đúng là <b>Đông Anh</b>.',
        'Sai — Sóc Sơn có đền Sóc. Đáp án đúng là <b>Đông Anh</b>.',
        'Đúng — Cổ Loa nay thuộc huyện <b>Đông Anh</b>, Hà Nội.',
      ]
    ),
    Q('Cổ Loa là kinh đô của?', ['Nước Âu Lạc (An Dương Vương)', 'Văn Lang', 'Đại Việt', 'Vạn Xuân'], 0, 'Cổ Loa là kinh đô Âu Lạc.',
      [
        '<b>Cổ Loa</b> là kinh đô của nước <b>Âu Lạc</b> dưới thời <b>An Dương Vương</b> (Thục Phán).',
        '<ul><li>Văn Lang (thời Hùng Vương) đóng đô ở Phong Châu (Phú Thọ).</li><li>Vạn Xuân là quốc hiệu thời Lý Nam Đế; Đại Việt là quốc hiệu từ thời Lý về sau.</li></ul>',
      ],
      [
        'Đúng — Cổ Loa là kinh đô của nước <b>Âu Lạc (An Dương Vương)</b>.',
        'Sai — Văn Lang đóng đô ở Phong Châu, không phải Cổ Loa. Đáp án đúng là <b>nước Âu Lạc (An Dương Vương)</b>.',
        'Sai — Đại Việt là quốc hiệu thời Lý — Trần — Lê. Đáp án đúng là <b>nước Âu Lạc (An Dương Vương)</b>.',
        'Sai — Vạn Xuân là quốc hiệu thời Lý Nam Đế. Đáp án đúng là <b>nước Âu Lạc (An Dương Vương)</b>.',
      ]
    ),
    Q('Đặc trưng của thành Cổ Loa?', ['Thành vuông', '3 vòng thành hình xoắn ốc', 'Thành tròn', 'Không có thành'], 1, 'Thành Cổ Loa có 3 vòng xoắn ốc.',
      [
        '<b>Thành Cổ Loa</b> có kiến trúc độc đáo gồm <b>3 vòng thành đắp đất hình xoắn ốc</b> (nên còn gọi là Loa thành).',
        '<ul><li>Ba vòng: Thành Ngoại, Thành Trung, Thành Nội, có hào nước bao quanh.</li><li>Là toà thành cổ lớn và lâu đời bậc nhất Việt Nam.</li></ul>',
      ],
      [
        'Sai — Cổ Loa không phải thành vuông. Đáp án đúng là <b>3 vòng thành hình xoắn ốc</b>.',
        'Đúng — thành Cổ Loa có <b>3 vòng thành hình xoắn ốc</b>.',
        'Sai — không phải thành tròn đơn giản mà là 3 vòng xoắn ốc. Đáp án đúng là <b>3 vòng thành hình xoắn ốc</b>.',
        'Sai — Cổ Loa có hệ thống thành kiên cố. Đáp án đúng là <b>3 vòng thành hình xoắn ốc</b>.',
      ]
    ),
    Q('Truyền thuyết gắn với Cổ Loa?', ['Tấm Cám', 'An Dương Vương — Mỵ Châu — Trọng Thuỷ', 'Sơn Tinh Thuỷ Tinh', 'Thạch Sanh'], 1, 'Truyền thuyết An Dương Vương — Mỵ Châu nổi tiếng.',
      [
        'Cổ Loa gắn với truyền thuyết <b>An Dương Vương — Mỵ Châu — Trọng Thuỷ</b> và chiếc <i>nỏ thần</i>.',
        '<ul><li>Vì cả tin, An Dương Vương để mất nỏ thần, dẫn đến mất nước.</li><li>Câu chuyện là bài học về tinh thần cảnh giác trước kẻ thù.</li></ul>',
      ],
      [
        'Sai — Tấm Cám không gắn với Cổ Loa. Đáp án đúng là <b>An Dương Vương — Mỵ Châu — Trọng Thuỷ</b>.',
        'Đúng — truyền thuyết Cổ Loa là <b>An Dương Vương — Mỵ Châu — Trọng Thuỷ</b>.',
        'Sai — Sơn Tinh Thuỷ Tinh gắn với vùng núi Tản Viên. Đáp án đúng là <b>An Dương Vương — Mỵ Châu — Trọng Thuỷ</b>.',
        'Sai — Thạch Sanh là truyện cổ tích khác. Đáp án đúng là <b>An Dương Vương — Mỵ Châu — Trọng Thuỷ</b>.',
      ]
    ),
    Q('Lễ hội Cổ Loa tổ chức?', ['Mùng 6 tháng Giêng âm', 'Tháng 10', 'Tháng 4', 'Tháng 8'], 0, 'Lễ hội Cổ Loa vào tháng Giêng.',
      [
        '<b>Lễ hội Cổ Loa</b> được tổ chức từ <b>mùng 6 tháng Giêng âm lịch</b> hằng năm để tưởng nhớ An Dương Vương.',
        '<ul><li>Lễ hội có rước kiệu của "Bát xã hộ nhi" (tám làng cùng thờ).</li><li>Là một trong những lễ hội đầu xuân tiêu biểu của Hà Nội.</li></ul>',
      ],
      [
        'Đúng — lễ hội Cổ Loa tổ chức từ <b>mùng 6 tháng Giêng âm lịch</b>.',
        'Sai — không tổ chức tháng 10. Đáp án đúng là <b>mùng 6 tháng Giêng âm</b>.',
        'Sai — không tổ chức tháng 4. Đáp án đúng là <b>mùng 6 tháng Giêng âm</b>.',
        'Sai — không tổ chức tháng 8. Đáp án đúng là <b>mùng 6 tháng Giêng âm</b>.',
      ]
    ),
  ]),

  M(21, 'Đền Sóc — Phù Đổng Thiên Vương', [
    Q('Đền Sóc ở huyện?', ['Mê Linh', 'Đông Anh', 'Gia Lâm', 'Sóc Sơn'], 3, 'Đền Sóc ở núi Sóc, Sóc Sơn.',
      [
        '<b>Đền Sóc</b> nằm dưới chân núi Sóc, huyện <b>Sóc Sơn</b> — phía bắc Hà Nội.',
        '<ul><li>Tương truyền đây là nơi Thánh Gióng cởi áo giáp, bay về trời.</li><li>Khu di tích đền Sóc gồm nhiều đền, chùa và tượng đài Thánh Gióng.</li></ul>',
      ],
      [
        'Sai — Mê Linh gắn với Hai Bà Trưng. Đáp án đúng là <b>Sóc Sơn</b>.',
        'Sai — Đông Anh có Cổ Loa. Đáp án đúng là <b>Sóc Sơn</b>.',
        'Sai — Gia Lâm có đền Phù Đổng. Đáp án đúng là <b>Sóc Sơn</b> cho đền Sóc.',
        'Đúng — đền Sóc ở huyện <b>Sóc Sơn</b>.',
      ]
    ),
    Q('Đền Sóc thờ ai?', ['Thánh Gióng', 'Lý Thái Tổ', 'Hai Bà Trưng', 'Trần Hưng Đạo'], 0, 'Đền Sóc thờ Thánh Gióng (Phù Đổng Thiên Vương).',
      [
        '<b>Đền Sóc</b> thờ <b>Thánh Gióng (Phù Đổng Thiên Vương)</b> — vị anh hùng đánh giặc Ân.',
        '<ul><li>Đây là một trong "Tứ bất tử" của tín ngưỡng dân gian Việt Nam.</li><li>Đền gắn với truyền thuyết Gióng bay về trời tại núi Sóc.</li></ul>',
      ],
      [
        'Đúng — đền Sóc thờ <b>Thánh Gióng (Phù Đổng Thiên Vương)</b>.',
        'Sai — đền Sóc không thờ Lý Thái Tổ. Đáp án đúng là <b>Thánh Gióng</b>.',
        'Sai — Hai Bà Trưng thờ ở đền Mê Linh, Đồng Nhân. Đáp án đúng là <b>Thánh Gióng</b>.',
        'Sai — Trần Hưng Đạo thờ ở đền Ngọc Sơn, Kiếp Bạc. Đáp án đúng là <b>Thánh Gióng</b>.',
      ]
    ),
    Q('Theo truyền thuyết, Thánh Gióng bay về trời từ?', ['Núi Ba Vì', 'Núi Tản Viên', 'Núi Sóc (Sóc Sơn)', 'Núi Bà Đen'], 2, 'Núi Sóc là nơi Thánh Gióng bay về trời.',
      [
        'Theo truyền thuyết, sau khi đánh tan giặc Ân, Thánh Gióng cưỡi ngựa lên đỉnh <b>núi Sóc (Sóc Sơn)</b> rồi cởi giáp <b>bay về trời</b>.',
        '<ul><li>Vì thế đền Sóc được lập tại đây để tưởng nhớ.</li><li>Núi Ba Vì — Tản Viên gắn với Sơn Tinh; núi Bà Đen ở Tây Ninh.</li></ul>',
      ],
      [
        'Sai — núi Ba Vì gắn với Sơn Tinh. Đáp án đúng là <b>núi Sóc (Sóc Sơn)</b>.',
        'Sai — núi Tản Viên gắn với Tản Viên Sơn Thánh. Đáp án đúng là <b>núi Sóc (Sóc Sơn)</b>.',
        'Đúng — Thánh Gióng bay về trời từ <b>núi Sóc (Sóc Sơn)</b>.',
        'Sai — núi Bà Đen ở Tây Ninh, không liên quan. Đáp án đúng là <b>núi Sóc (Sóc Sơn)</b>.',
      ]
    ),
    Q('Thánh Gióng là biểu tượng của?', ['Nông nghiệp', 'Tinh thần yêu nước chống ngoại xâm', 'Học giỏi', 'Buôn bán'], 1, 'Thánh Gióng biểu tượng tinh thần yêu nước.',
      [
        '<b>Thánh Gióng</b> là biểu tượng cho <b>tinh thần yêu nước, sức mạnh quật khởi chống ngoại xâm</b> của dân tộc Việt Nam.',
        '<ul><li>Hình ảnh cậu bé vươn vai thành tráng sĩ thể hiện sức mạnh tiềm tàng của cả cộng đồng.</li><li>Là một trong những hình tượng đẹp nhất của văn hoá dân gian.</li></ul>',
      ],
      [
        'Sai — Thánh Gióng không phải biểu tượng nông nghiệp. Đáp án đúng là <b>tinh thần yêu nước chống ngoại xâm</b>.',
        'Đúng — Thánh Gióng biểu tượng cho <b>tinh thần yêu nước chống ngoại xâm</b>.',
        'Sai — Thánh Gióng không phải biểu tượng học giỏi. Đáp án đúng là <b>tinh thần yêu nước chống ngoại xâm</b>.',
        'Sai — Thánh Gióng không phải biểu tượng buôn bán. Đáp án đúng là <b>tinh thần yêu nước chống ngoại xâm</b>.',
      ]
    ),
    Q('Hội Gióng đền Sóc tổ chức?', ['Tháng 10', 'Tháng 8', 'Tháng Giêng', 'Tháng 4'], 2, 'Hội Sóc tổ chức 6 tháng Giêng âm.',
      [
        '<b>Hội Gióng đền Sóc</b> được khai hội vào <b>mùng 6 tháng Giêng âm lịch</b>.',
        '<ul><li>Khác với hội Gióng đền Phù Đổng (mồng 9 tháng 4 âm lịch).</li><li>Hội có nghi lễ rước giò hoa tre, trầu cau dâng Thánh.</li></ul>',
      ],
      [
        'Sai — hội Sóc không tổ chức tháng 10. Đáp án đúng là <b>tháng Giêng</b>.',
        'Sai — hội Sóc không tổ chức tháng 8. Đáp án đúng là <b>tháng Giêng</b>.',
        'Đúng — hội Gióng đền Sóc tổ chức <b>tháng Giêng</b> (mùng 6).',
        'Sai — tháng 4 là hội Gióng đền Phù Đổng. Đáp án đúng là <b>tháng Giêng</b> cho đền Sóc.',
      ]
    ),
  ]),

  M(22, 'Chùa Một Cột — biểu tượng Hà Nội', [
    Q('Chùa Một Cột xây thời?', ['Tiền Lê (cuối X)', 'Lý (1049)', 'Trần (giữa XIII)', 'Nguyễn'], 1, 'Lý Thái Tông xây chùa Một Cột năm 1049.',
      [
        '<b>Chùa Một Cột</b> được xây dựng năm <code>1049</code> dưới thời vua <b>Lý Thái Tông</b>.',
        '<ul><li>Tương truyền vua nằm mộng thấy Phật Bà Quan Âm ngồi trên đài sen, sau cho dựng chùa theo hình đó.</li><li>Là một kiệt tác kiến trúc độc đáo thời Lý.</li></ul>',
      ],
      [
        'Sai — chùa Một Cột không có từ thời Tiền Lê. Đáp án đúng là <b>Lý (1049)</b>.',
        'Đúng — chùa Một Cột xây thời <b>Lý (1049)</b>, đời Lý Thái Tông.',
        'Sai — chùa được xây thời Lý, không phải thời Trần. Đáp án đúng là <b>Lý (1049)</b>.',
        'Sai — chùa có từ thời Lý, không phải thời Nguyễn. Đáp án đúng là <b>Lý (1049)</b>.',
      ]
    ),
    Q('Chùa Một Cột có hình dạng?', ['Hình lục giác', 'Hình tròn lớn', 'Hoa sen nở trên một cột đá', 'Tháp vuông'], 2, 'Chùa hình hoa sen trên một cột — độc đáo.',
      [
        '<b>Chùa Một Cột</b> có hình dáng độc đáo như một <b>bông hoa sen nở</b> vươn lên từ mặt nước, đặt trên <b>một cột đá</b> duy nhất.',
        '<ul><li>Tên chữ là Liên Hoa Đài (đài hoa sen).</li><li>Kiến trúc tượng trưng cho sự thanh khiết của đạo Phật.</li></ul>',
      ],
      [
        'Sai — chùa không có hình lục giác. Đáp án đúng là <b>hoa sen nở trên một cột đá</b>.',
        'Sai — chùa không phải hình tròn lớn. Đáp án đúng là <b>hoa sen nở trên một cột đá</b>.',
        'Đúng — chùa Một Cột có hình <b>hoa sen nở trên một cột đá</b>.',
        'Sai — chùa không phải tháp vuông. Đáp án đúng là <b>hoa sen nở trên một cột đá</b>.',
      ]
    ),
    Q('Tên chính thức của chùa?', ['Trấn Quốc', 'Bộc Tự', 'Quán Sứ', 'Diên Hựu Tự'], 3, 'Tên chính thức là Diên Hựu Tự.',
      [
        'Tên chữ chính thức của chùa Một Cột là <b>Diên Hựu Tự</b> (nghĩa là "phúc lành dài lâu").',
        '<ul><li>Tên này do vua Lý đặt với mong ước phúc lộc bền lâu.</li><li>Trấn Quốc, Quán Sứ là tên của các ngôi chùa khác ở Hà Nội.</li></ul>',
      ],
      [
        'Sai — Trấn Quốc là chùa cổ ở Hồ Tây. Đáp án đúng là <b>Diên Hựu Tự</b>.',
        'Sai — "Bộc Tự" không phải tên chùa Một Cột. Đáp án đúng là <b>Diên Hựu Tự</b>.',
        'Sai — Quán Sứ là trụ sở Giáo hội Phật giáo. Đáp án đúng là <b>Diên Hựu Tự</b>.',
        'Đúng — tên chính thức của chùa Một Cột là <b>Diên Hựu Tự</b>.',
      ]
    ),
    Q('Chùa Một Cột nằm trong quần thể?', ['Văn Miếu', 'Hoàng thành', 'Lăng Chủ tịch Hồ Chí Minh', 'Hồ Tây'], 2, 'Chùa Một Cột nằm trong khu lăng Bác.',
      [
        '<b>Chùa Một Cột</b> nằm trong quần thể <b>Khu di tích Lăng Chủ tịch Hồ Chí Minh</b> tại quận Ba Đình.',
        '<ul><li>Gần đó là Lăng Bác, Bảo tàng Hồ Chí Minh, Phủ Chủ tịch.</li><li>Đây là khu vực có nhiều di tích lịch sử quan trọng của Thủ đô.</li></ul>',
      ],
      [
        'Sai — chùa Một Cột không thuộc Văn Miếu. Đáp án đúng là <b>Lăng Chủ tịch Hồ Chí Minh</b>.',
        'Sai — chùa Một Cột không nằm trong Hoàng thành. Đáp án đúng là <b>Lăng Chủ tịch Hồ Chí Minh</b>.',
        'Đúng — chùa Một Cột nằm trong quần thể <b>Lăng Chủ tịch Hồ Chí Minh</b>.',
        'Sai — chùa Một Cột không ở Hồ Tây (đó là chùa Trấn Quốc). Đáp án đúng là <b>Lăng Chủ tịch Hồ Chí Minh</b>.',
      ]
    ),
    Q('Ý nghĩa hình hoa sen?', ['Chiến tranh', 'Quyền lực', 'Sự thanh tịnh, vươn lên từ bùn lầy', 'Buôn bán'], 2, 'Hoa sen biểu tượng Phật giáo — thanh khiết.',
      [
        'Hình <b>hoa sen</b> của chùa Một Cột tượng trưng cho <b>sự thanh tịnh, vươn lên từ bùn lầy</b> mà không vương bùn.',
        '<ul><li>Trong Phật giáo, hoa sen là biểu tượng của sự giác ngộ, trong sạch.</li><li>"Gần bùn mà chẳng hôi tanh mùi bùn" — phẩm chất cao quý.</li></ul>',
      ],
      [
        'Sai — hoa sen không biểu tượng chiến tranh. Đáp án đúng là <b>sự thanh tịnh, vươn lên từ bùn lầy</b>.',
        'Sai — hoa sen không biểu tượng quyền lực. Đáp án đúng là <b>sự thanh tịnh, vươn lên từ bùn lầy</b>.',
        'Đúng — hoa sen tượng trưng cho <b>sự thanh tịnh, vươn lên từ bùn lầy</b>.',
        'Sai — hoa sen không biểu tượng buôn bán. Đáp án đúng là <b>sự thanh tịnh, vươn lên từ bùn lầy</b>.',
      ]
    ),
  ]),

  M(23, 'Chùa Trấn Quốc — chùa cổ nhất Hà Nội', [
    Q('Chùa Trấn Quốc nằm bên?', ['Hồ Bảy Mẫu', 'Hồ Gươm', 'Hồ Tây', 'Sông Hồng'], 2, 'Chùa Trấn Quốc ở Hồ Tây.',
      [
        '<b>Chùa Trấn Quốc</b> toạ lạc trên một hòn đảo nhỏ phía đông <b>Hồ Tây</b> (đường Thanh Niên).',
        '<ul><li>Cảnh chùa soi bóng mặt hồ tạo nên một bức tranh thanh tịnh.</li><li>Đây là một trong những ngôi chùa đẹp và linh thiêng bậc nhất Thủ đô.</li></ul>',
      ],
      [
        'Sai — chùa Trấn Quốc không ở Hồ Bảy Mẫu. Đáp án đúng là <b>Hồ Tây</b>.',
        'Sai — chùa Trấn Quốc không ở Hồ Gươm. Đáp án đúng là <b>Hồ Tây</b>.',
        'Đúng — chùa Trấn Quốc nằm bên <b>Hồ Tây</b>.',
        'Sai — chùa nằm bên Hồ Tây, không phải trên sông Hồng. Đáp án đúng là <b>Hồ Tây</b>.',
      ]
    ),
    Q('Chùa Trấn Quốc có lịch sử?', ['Hơn 1500 năm (từ thời Lý Nam Đế)', '100 năm', '2000 năm', '500 năm'], 0, 'Chùa lập từ thời Lý Nam Đế (thế kỉ VI).',
      [
        '<b>Chùa Trấn Quốc</b> có lịch sử <b>hơn 1500 năm</b>, được lập từ thời <b>Lý Nam Đế</b> (thế kỉ VI), với tên ban đầu là Khai Quốc.',
        '<ul><li>Đây được coi là ngôi chùa cổ nhất Hà Nội.</li><li>Trải qua nhiều lần dời và đổi tên, đến thời Lê mới mang tên Trấn Quốc.</li></ul>',
      ],
      [
        'Đúng — chùa Trấn Quốc có lịch sử <b>hơn 1500 năm</b> (từ thời Lý Nam Đế).',
        'Sai — chùa cổ hơn 100 năm rất nhiều. Đáp án đúng là <b>hơn 1500 năm (từ thời Lý Nam Đế)</b>.',
        'Sai — không tới 2000 năm. Đáp án đúng là <b>hơn 1500 năm (từ thời Lý Nam Đế)</b>.',
        'Sai — chùa cổ hơn 500 năm. Đáp án đúng là <b>hơn 1500 năm (từ thời Lý Nam Đế)</b>.',
      ]
    ),
    Q('Chùa Trấn Quốc có gì độc đáo?', ['Hồ nhân tạo lớn', 'Cột đá 30m', 'Bảo tháp 11 tầng cao 15m', 'Cầu vắt qua mây'], 2, 'Bảo tháp 11 tầng là điểm nhấn.',
      [
        'Điểm nhấn của chùa Trấn Quốc là <b>Bảo tháp Lục độ đài sen</b> — tháp <b>11 tầng, cao khoảng 15 m</b>.',
        '<ul><li>Mỗi tầng tháp có ô cửa đặt tượng Phật A Di Đà bằng đá quý.</li><li>Đỉnh tháp là đài sen chín tầng (Cửu phẩm liên hoa).</li></ul>',
      ],
      [
        'Sai — điểm nhấn không phải hồ nhân tạo. Đáp án đúng là <b>bảo tháp 11 tầng cao 15m</b>.',
        'Sai — cột đá 30m là chi tiết không đúng. Đáp án đúng là <b>bảo tháp 11 tầng cao 15m</b>.',
        'Đúng — điểm độc đáo của chùa là <b>bảo tháp 11 tầng cao 15m</b>.',
        'Sai — không có "cầu vắt qua mây". Đáp án đúng là <b>bảo tháp 11 tầng cao 15m</b>.',
      ]
    ),
    Q('Chùa Trấn Quốc thờ?', ['Khổng Tử', 'Lão Tử', 'Phật và nhiều vị thần', 'Mohammed'], 2, 'Là chùa Phật giáo.',
      [
        '<b>Chùa Trấn Quốc</b> là chùa Phật giáo, thờ <b>Phật</b> cùng nhiều vị Bồ Tát, thần linh theo tín ngưỡng dân gian.',
        '<ul><li>Khổng Tử được thờ ở Văn Miếu; chùa Trấn Quốc là nơi thờ Phật.</li><li>Chùa là chốn tu hành và chiêm bái linh thiêng.</li></ul>',
      ],
      [
        'Sai — Khổng Tử được thờ ở Văn Miếu. Đáp án đúng là <b>Phật và nhiều vị thần</b>.',
        'Sai — chùa thờ Phật, không phải Lão Tử. Đáp án đúng là <b>Phật và nhiều vị thần</b>.',
        'Đúng — chùa Trấn Quốc thờ <b>Phật và nhiều vị thần</b>.',
        'Sai — chùa Phật giáo, không thờ Mohammed (Hồi giáo). Đáp án đúng là <b>Phật và nhiều vị thần</b>.',
      ]
    ),
    Q('Phố nào nổi tiếng nhiều chùa lớn?', ['Bà Triệu', 'Phố Quán Sứ (chùa Quán Sứ — trụ sở Giáo hội Phật giáo)', 'Hàng Bạc', 'Hàng Đào'], 1, 'Quán Sứ là trụ sở Giáo hội Phật giáo VN.',
      [
        '<b>Phố Quán Sứ</b> có <b>chùa Quán Sứ</b> — nơi đặt <b>trụ sở Trung ương Giáo hội Phật giáo Việt Nam</b>.',
        '<ul><li>Chùa là trung tâm sinh hoạt Phật giáo quan trọng của cả nước.</li><li>Hàng Bạc, Hàng Đào là phố nghề thủ công, buôn bán.</li></ul>',
      ],
      [
        'Sai — Bà Triệu là phố lớn nhưng không gắn với chùa tiêu biểu này. Đáp án đúng là <b>phố Quán Sứ</b>.',
        'Đúng — <b>phố Quán Sứ</b> có chùa Quán Sứ — trụ sở Giáo hội Phật giáo Việt Nam.',
        'Sai — Hàng Bạc là phố nghề kim hoàn. Đáp án đúng là <b>phố Quán Sứ</b>.',
        'Sai — Hàng Đào là phố buôn vải lụa. Đáp án đúng là <b>phố Quán Sứ</b>.',
      ]
    ),
  ]),

  M(24, 'Thành Cổ Sơn Tây', [
    Q('Thành cổ Sơn Tây xây thời?', ['Lý (đầu XI)', 'Nguyễn (đầu XIX)', 'Trần (cuối XIV)', 'Lê trung hưng (XVII)'], 1, 'Thành cổ Sơn Tây xây thời Minh Mạng (1822).',
      [
        '<b>Thành cổ Sơn Tây</b> được xây dựng năm <code>1822</code> dưới thời vua <b>Minh Mạng</b> (nhà <b>Nguyễn</b>).',
        '<ul><li>Là một trong những toà thành quân sự quan trọng trấn giữ phía tây Thăng Long.</li><li>Thành có kiến trúc kiểu Vauban (kiểu phương Tây) thu nhỏ.</li></ul>',
      ],
      [
        'Sai — thành không có từ thời Lý. Đáp án đúng là <b>Nguyễn (đầu XIX)</b>.',
        'Đúng — thành cổ Sơn Tây xây thời <b>Nguyễn (đầu XIX)</b>, đời Minh Mạng (1822).',
        'Sai — thành không phải công trình thời Trần. Đáp án đúng là <b>Nguyễn (đầu XIX)</b>.',
        'Sai — thành xây thời Nguyễn, không phải Lê trung hưng. Đáp án đúng là <b>Nguyễn (đầu XIX)</b>.',
      ]
    ),
    Q('Thành cổ Sơn Tây làm bằng?', ['Gạch nung Bát Tràng', 'Bê tông', 'Đá ong', 'Gỗ lim, gỗ táu'], 2, 'Đá ong là vật liệu chính.',
      [
        '<b>Thành cổ Sơn Tây</b> độc đáo ở chỗ được xây chủ yếu bằng <b>đá ong</b> — loại vật liệu đặc trưng của vùng xứ Đoài.',
        '<ul><li>Đá ong có màu nâu vàng, nhiều lỗ rỗng, càng để lâu càng rắn chắc.</li><li>Đây là toà thành đá ong hiếm hoi còn lại ở Việt Nam.</li></ul>',
      ],
      [
        'Sai — thành không xây bằng gạch Bát Tràng. Đáp án đúng là <b>đá ong</b>.',
        'Sai — thời Nguyễn chưa dùng bê tông. Đáp án đúng là <b>đá ong</b>.',
        'Đúng — thành cổ Sơn Tây làm bằng <b>đá ong</b>.',
        'Sai — gỗ lim, gỗ táu dùng cho đình chùa, không phải tường thành. Đáp án đúng là <b>đá ong</b>.',
      ]
    ),
    Q('Sơn Tây nay thuộc?', ['Phú Thọ', 'Thị xã Sơn Tây, Hà Nội', 'Tỉnh khác', 'Hoà Bình'], 1, 'Sơn Tây là thị xã của Hà Nội.',
      [
        '<b>Sơn Tây</b> nay là <b>thị xã Sơn Tây thuộc Hà Nội</b> (sau khi sáp nhập Hà Tây năm 2008).',
        '<ul><li>Là trung tâm vùng văn hoá xứ Đoài cổ kính.</li><li>Đây là thị xã duy nhất của Hà Nội.</li></ul>',
      ],
      [
        'Sai — Sơn Tây không thuộc Phú Thọ. Đáp án đúng là <b>thị xã Sơn Tây, Hà Nội</b>.',
        'Đúng — Sơn Tây nay là <b>thị xã Sơn Tây thuộc Hà Nội</b>.',
        'Sai — Sơn Tây thuộc Hà Nội từ 2008. Đáp án đúng là <b>thị xã Sơn Tây, Hà Nội</b>.',
        'Sai — Sơn Tây không thuộc Hoà Bình. Đáp án đúng là <b>thị xã Sơn Tây, Hà Nội</b>.',
      ]
    ),
    Q('Đặc trưng kiến trúc thành cổ?', ['Mở cửa hoàn toàn', 'Vọng lâu, hào nước bao quanh', 'Không có tường', 'Không có hào'], 1, 'Vọng lâu và hào nước đặc trưng thành cổ.',
      [
        'Kiến trúc <b>thành cổ Sơn Tây</b> đặc trưng với <b>vọng lâu</b> (chòi canh trên cổng thành) và <b>hào nước bao quanh</b>.',
        '<ul><li>Bốn cổng thành (Đông, Tây, Nam, Bắc) đều có vọng lâu.</li><li>Hào nước giúp phòng thủ và tạo cảnh quan đẹp.</li></ul>',
      ],
      [
        'Sai — thành có tường và cổng kiên cố, không mở hoàn toàn. Đáp án đúng là <b>vọng lâu, hào nước bao quanh</b>.',
        'Đúng — thành cổ đặc trưng với <b>vọng lâu, hào nước bao quanh</b>.',
        'Sai — thành có tường thành. Đáp án đúng là <b>vọng lâu, hào nước bao quanh</b>.',
        'Sai — thành có hào nước. Đáp án đúng là <b>vọng lâu, hào nước bao quanh</b>.',
      ]
    ),
    Q('Sơn Tây gắn với di tích nào khác?', ['Văn Miếu', 'Hoàng thành', 'Cột Cờ', 'Đền Và (thờ Tản Viên Sơn Thánh)'], 3, 'Đền Và thờ Sơn Tinh — Tản Viên.',
      [
        'Sơn Tây còn gắn với <b>Đền Và</b> — nơi thờ <b>Tản Viên Sơn Thánh (Sơn Tinh)</b>, một trong "Tứ bất tử".',
        '<ul><li>Đền Và là trung tâm thờ Tản Viên lớn nhất xứ Đoài.</li><li>Văn Miếu, Hoàng thành, Cột Cờ đều nằm ở nội thành Hà Nội.</li></ul>',
      ],
      [
        'Sai — Văn Miếu ở nội thành Hà Nội. Đáp án đúng là <b>Đền Và (thờ Tản Viên Sơn Thánh)</b>.',
        'Sai — Hoàng thành ở trung tâm Hà Nội. Đáp án đúng là <b>Đền Và (thờ Tản Viên Sơn Thánh)</b>.',
        'Sai — Cột Cờ ở nội thành Hà Nội. Đáp án đúng là <b>Đền Và (thờ Tản Viên Sơn Thánh)</b>.',
        'Đúng — Sơn Tây gắn với <b>Đền Và (thờ Tản Viên Sơn Thánh)</b>.',
      ]
    ),
  ]),

  M(25, 'Làng cổ Đường Lâm', [
    Q('Đường Lâm thuộc?', ['Đà Nẵng', 'Hương Trà, Huế', 'Sơn Tây, Hà Nội', 'Củ Chi, TPHCM'], 2, 'Đường Lâm ở Sơn Tây, Hà Nội.',
      [
        '<b>Làng cổ Đường Lâm</b> thuộc thị xã <b>Sơn Tây, Hà Nội</b> — vùng xứ Đoài.',
        '<ul><li>Đây là làng cổ điển hình của vùng đồng bằng Bắc Bộ.</li><li>Năm 2006, Đường Lâm được công nhận là làng cổ cấp quốc gia đầu tiên.</li></ul>',
      ],
      [
        'Sai — Đường Lâm không ở Đà Nẵng. Đáp án đúng là <b>Sơn Tây, Hà Nội</b>.',
        'Sai — Đường Lâm không ở Huế. Đáp án đúng là <b>Sơn Tây, Hà Nội</b>.',
        'Đúng — Đường Lâm thuộc <b>Sơn Tây, Hà Nội</b>.',
        'Sai — Đường Lâm không ở TPHCM. Đáp án đúng là <b>Sơn Tây, Hà Nội</b>.',
      ]
    ),
    Q('Đường Lâm được biết đến là?', ['Cảng biển', 'Khu công nghiệp', 'Sân bay', 'Làng cổ điển hình với nhiều nhà cổ đá ong'], 3, 'Đường Lâm là làng cổ Việt Nam.',
      [
        '<b>Đường Lâm</b> được biết đến là <b>làng cổ điển hình</b> với nhiều <b>nhà cổ tường đá ong</b>, cổng làng, giếng nước, cây đa, sân đình.',
        '<ul><li>Lưu giữ gần như nguyên vẹn không gian làng quê truyền thống Bắc Bộ.</li><li>Là điểm du lịch văn hoá hấp dẫn.</li></ul>',
      ],
      [
        'Sai — Đường Lâm không phải cảng biển. Đáp án đúng là <b>làng cổ điển hình với nhiều nhà cổ đá ong</b>.',
        'Sai — Đường Lâm không phải khu công nghiệp. Đáp án đúng là <b>làng cổ điển hình với nhiều nhà cổ đá ong</b>.',
        'Sai — Đường Lâm không phải sân bay. Đáp án đúng là <b>làng cổ điển hình với nhiều nhà cổ đá ong</b>.',
        'Đúng — Đường Lâm là <b>làng cổ điển hình với nhiều nhà cổ đá ong</b>.',
      ]
    ),
    Q('Đường Lâm có "đất hai vua" — quê hương của?', ['Lê Lợi và Quang Trung', 'Ngô Quyền và Phùng Hưng', 'Lý Thái Tổ và Trần Hưng Đạo', 'Hồ Quý Ly và Nguyễn Ánh'], 1, 'Ngô Quyền và Phùng Hưng đều quê Đường Lâm.',
      [
        'Đường Lâm được gọi là <b>"đất hai vua"</b> vì là quê hương của <b>Ngô Quyền</b> và <b>Phùng Hưng</b> (Bố Cái Đại Vương).',
        '<ul><li>Ngô Quyền đánh tan quân Nam Hán trên sông Bạch Đằng (938).</li><li>Phùng Hưng lãnh đạo khởi nghĩa chống nhà Đường (thế kỉ VIII).</li></ul>',
      ],
      [
        'Sai — Lê Lợi quê Thanh Hoá, Quang Trung quê Bình Định. Đáp án đúng là <b>Ngô Quyền và Phùng Hưng</b>.',
        'Đúng — "đất hai vua" Đường Lâm là quê của <b>Ngô Quyền và Phùng Hưng</b>.',
        'Sai — Lý Thái Tổ quê Bắc Ninh, Trần Hưng Đạo quê Nam Định. Đáp án đúng là <b>Ngô Quyền và Phùng Hưng</b>.',
        'Sai — Hồ Quý Ly và Nguyễn Ánh không quê Đường Lâm. Đáp án đúng là <b>Ngô Quyền và Phùng Hưng</b>.',
      ]
    ),
    Q('Đặc trưng nhà cổ Đường Lâm?', ['Nhà sàn', 'Lâu đài', 'Tường đá ong, mái ngói', 'Nhà cao tầng'], 2, 'Nhà cổ Đường Lâm có tường đá ong rất đẹp.',
      [
        'Nhà cổ Đường Lâm đặc trưng với <b>tường xây bằng đá ong</b> và <b>mái lợp ngói</b> ta truyền thống.',
        '<ul><li>Đá ong màu nâu vàng tạo nét rêu phong cổ kính.</li><li>Nhiều ngôi nhà có tuổi hàng trăm năm vẫn được gìn giữ.</li></ul>',
      ],
      [
        'Sai — nhà cổ Đường Lâm không phải nhà sàn. Đáp án đúng là <b>tường đá ong, mái ngói</b>.',
        'Sai — không phải lâu đài. Đáp án đúng là <b>tường đá ong, mái ngói</b>.',
        'Đúng — nhà cổ Đường Lâm có <b>tường đá ong, mái ngói</b>.',
        'Sai — nhà cổ Đường Lâm thấp tầng. Đáp án đúng là <b>tường đá ong, mái ngói</b>.',
      ]
    ),
    Q('Đường Lâm được Bộ VH-TT-DL công nhận?', ['Di sản thế giới', 'Di tích quốc gia làng cổ', 'Khu đô thị', 'Khu công nghiệp'], 1, 'Đường Lâm là di tích quốc gia.',
      [
        'Năm 2006, <b>Đường Lâm</b> được Bộ Văn hoá — Thể thao và Du lịch công nhận là <b>Di tích kiến trúc nghệ thuật cấp quốc gia (làng cổ)</b>.',
        '<ul><li>Đây là làng cổ đầu tiên của cả nước được xếp hạng di tích quốc gia.</li><li>Việc công nhận giúp bảo tồn và phát huy giá trị làng cổ.</li></ul>',
      ],
      [
        'Sai — Đường Lâm chưa phải di sản thế giới. Đáp án đúng là <b>di tích quốc gia làng cổ</b>.',
        'Đúng — Đường Lâm được công nhận là <b>di tích quốc gia làng cổ</b>.',
        'Sai — Đường Lâm không phải khu đô thị. Đáp án đúng là <b>di tích quốc gia làng cổ</b>.',
        'Sai — Đường Lâm không phải khu công nghiệp. Đáp án đúng là <b>di tích quốc gia làng cổ</b>.',
      ]
    ),
  ]),

  M(26, 'Làng nghề Hà Nội (tiếp) — Nhật Tân, Quảng Bá', [
    Q('Làng đào Nhật Tân nổi tiếng?', ['Đan tre', 'Trồng hoa đào Tết', 'Trồng lúa', 'Đúc đồng'], 1, 'Nhật Tân — hoa đào nổi tiếng cả nước.',
      [
        '<b>Làng Nhật Tân</b> (quận Tây Hồ) nổi tiếng với nghề <b>trồng hoa đào</b> phục vụ Tết.',
        '<ul><li>Đào Nhật Tân có cánh kép, màu thắm, được ưa chuộng khắp nơi.</li><li>Mỗi dịp giáp Tết, vườn đào Nhật Tân rực rỡ thu hút du khách.</li></ul>',
      ],
      [
        'Sai — Nhật Tân không nổi tiếng đan tre. Đáp án đúng là <b>trồng hoa đào Tết</b>.',
        'Đúng — làng Nhật Tân nổi tiếng <b>trồng hoa đào Tết</b>.',
        'Sai — Nhật Tân nổi tiếng hoa đào, không phải trồng lúa. Đáp án đúng là <b>trồng hoa đào Tết</b>.',
        'Sai — đúc đồng là nghề Ngũ Xã. Đáp án đúng là <b>trồng hoa đào Tết</b>.',
      ]
    ),
    Q('Làng quất Quảng Bá nổi tiếng?', ['Trồng rau', 'Trồng quất cảnh Tết', 'Làm gốm sứ men lam', 'Dệt lụa tơ tằm'], 1, 'Quảng Bá — quất cảnh nổi tiếng.',
      [
        '<b>Làng Quảng Bá</b> (quận Tây Hồ) nổi tiếng với nghề <b>trồng quất cảnh</b> chơi Tết.',
        '<ul><li>Quất Quảng Bá quả sai, dáng đẹp, tượng trưng cho sung túc.</li><li>Cùng đào Nhật Tân, quất Quảng Bá làm nên không khí Tết ven Hồ Tây.</li></ul>',
      ],
      [
        'Sai — Quảng Bá nổi tiếng quất cảnh, không phải trồng rau. Đáp án đúng là <b>trồng quất cảnh Tết</b>.',
        'Đúng — làng Quảng Bá nổi tiếng <b>trồng quất cảnh Tết</b>.',
        'Sai — gốm men lam là Bát Tràng. Đáp án đúng là <b>trồng quất cảnh Tết</b>.',
        'Sai — dệt lụa là Vạn Phúc. Đáp án đúng là <b>trồng quất cảnh Tết</b>.',
      ]
    ),
    Q('Làng hoa Ngọc Hà xưa nổi tiếng?', ['Đúc đồ đồng thờ cúng', 'Trồng lúa nếp cái hoa vàng', 'Nuôi cá chép hồ Tây', 'Trồng hoa cung cấp cho Hà Nội'], 3, 'Ngọc Hà là làng hoa truyền thống.',
      [
        '<b>Làng Ngọc Hà</b> (quận Ba Đình) xưa là làng hoa nổi tiếng, chuyên <b>trồng hoa cung cấp cho Hà Nội</b>.',
        '<ul><li>Cùng với Hữu Tiệp, Ngọc Hà tạo nên vùng trồng hoa truyền thống của Thăng Long xưa.</li><li>Ngày nay đô thị hoá khiến nghề trồng hoa nơi đây mai một dần.</li></ul>',
      ],
      [
        'Sai — đúc đồ đồng là nghề Ngũ Xã. Đáp án đúng là <b>trồng hoa cung cấp cho Hà Nội</b>.',
        'Sai — Ngọc Hà nổi tiếng trồng hoa, không phải lúa nếp. Đáp án đúng là <b>trồng hoa cung cấp cho Hà Nội</b>.',
        'Sai — Ngọc Hà là làng hoa, không phải nuôi cá. Đáp án đúng là <b>trồng hoa cung cấp cho Hà Nội</b>.',
        'Đúng — làng Ngọc Hà xưa nổi tiếng <b>trồng hoa cung cấp cho Hà Nội</b>.',
      ]
    ),
    Q('Làng nghề đúc đồng nổi tiếng ở?', ['Đường Lâm', 'Bát Tràng', 'Vạn Phúc', 'Ngũ Xã (Ba Đình)'], 3, 'Ngũ Xã — làng đúc đồng nổi tiếng.',
      [
        '<b>Làng Ngũ Xã</b> (quận Ba Đình, ven Hồ Trúc Bạch) nổi tiếng với nghề <b>đúc đồng</b> truyền thống.',
        '<ul><li>Thợ Ngũ Xã từng đúc nhiều tượng, chuông lớn cho các chùa, đền.</li><li>Đây là một trong "tứ nghề" tinh hoa của đất Thăng Long.</li></ul>',
      ],
      [
        'Sai — Đường Lâm là làng cổ, không phải làng đúc đồng. Đáp án đúng là <b>Ngũ Xã (Ba Đình)</b>.',
        'Sai — Bát Tràng làm gốm. Đáp án đúng là <b>Ngũ Xã (Ba Đình)</b>.',
        'Sai — Vạn Phúc dệt lụa. Đáp án đúng là <b>Ngũ Xã (Ba Đình)</b>.',
        'Đúng — <b>Ngũ Xã (Ba Đình)</b> là làng đúc đồng nổi tiếng.',
      ]
    ),
    Q('Làng giấy Bưởi nổi tiếng làm?', ['Giấy bao bì', 'Giấy báo', 'Giấy ảnh', 'Giấy dó truyền thống'], 3, 'Làng Bưởi — giấy dó.',
      [
        '<b>Làng Bưởi</b> (vùng Yên Thái, Hồ Khẩu — quận Tây Hồ) xưa nổi tiếng với nghề làm <b>giấy dó</b> truyền thống.',
        '<ul><li>Giấy dó làm từ vỏ cây dó, bền và đẹp, dùng để in tranh, viết chữ.</li><li>Câu ca "Nhịp chày Yên Thái, mặt gương Tây Hồ" nhắc đến nghề giã dó làm giấy.</li></ul>',
      ],
      [
        'Sai — làng Bưởi làm giấy dó, không phải giấy bao bì. Đáp án đúng là <b>giấy dó truyền thống</b>.',
        'Sai — không phải giấy báo. Đáp án đúng là <b>giấy dó truyền thống</b>.',
        'Sai — không phải giấy ảnh. Đáp án đúng là <b>giấy dó truyền thống</b>.',
        'Đúng — làng Bưởi nổi tiếng làm <b>giấy dó truyền thống</b>.',
      ]
    ),
  ]),

  M(27, 'Phương ngữ Hà Nội', [
    Q('Phương ngữ Hà Nội thuộc?', ['Phương ngữ Bắc Bộ', 'Nam Bộ', 'Tây Nguyên', 'Trung Bộ'], 0, 'Hà Nội thuộc phương ngữ Bắc Bộ.',
      [
        'Tiếng nói của người Hà Nội thuộc <b>phương ngữ Bắc Bộ</b> (phương ngữ Bắc).',
        '<ul><li>Tiếng Việt có 3 vùng phương ngữ chính: Bắc Bộ, Trung Bộ, Nam Bộ.</li><li>Phương ngữ Bắc Bộ lấy tiếng Hà Nội làm tiêu biểu.</li></ul>',
      ],
      [
        'Đúng — phương ngữ Hà Nội thuộc <b>phương ngữ Bắc Bộ</b>.',
        'Sai — Hà Nội ở miền Bắc, không thuộc phương ngữ Nam Bộ. Đáp án đúng là <b>phương ngữ Bắc Bộ</b>.',
        'Sai — Tây Nguyên không phải vùng phương ngữ của Hà Nội. Đáp án đúng là <b>phương ngữ Bắc Bộ</b>.',
        'Sai — Hà Nội không thuộc phương ngữ Trung Bộ. Đáp án đúng là <b>phương ngữ Bắc Bộ</b>.',
      ]
    ),
    Q('Đặc trưng giọng nói Hà Nội?', ['Nặng, kéo dài', 'Trống vắng', 'Không có dấu', 'Nhẹ nhàng, chuẩn xác, không nặng dấu'], 3, 'Giọng Hà Nội nhẹ và chuẩn xác.',
      [
        'Giọng nói <b>Hà Nội</b> đặc trưng là <b>nhẹ nhàng, chuẩn xác, không nặng dấu</b>.',
        '<ul><li>Phát âm rõ ràng các thanh điệu, dễ nghe.</li><li>Vì vậy giọng Hà Nội thường được lấy làm chuẩn phát thanh, truyền hình.</li></ul>',
      ],
      [
        'Sai — giọng Hà Nội không nặng, kéo dài. Đáp án đúng là <b>nhẹ nhàng, chuẩn xác, không nặng dấu</b>.',
        'Sai — "trống vắng" không phải đặc trưng giọng nói. Đáp án đúng là <b>nhẹ nhàng, chuẩn xác, không nặng dấu</b>.',
        'Sai — giọng Hà Nội vẫn phát âm đủ dấu. Đáp án đúng là <b>nhẹ nhàng, chuẩn xác, không nặng dấu</b>.',
        'Đúng — giọng Hà Nội <b>nhẹ nhàng, chuẩn xác, không nặng dấu</b>.',
      ]
    ),
    Q('Hà Nội từ xưa được coi là?', ['Khó nghe', 'Không có ý nghĩa', 'Chuẩn mực phát âm tiếng Việt', 'Nói khác hẳn'], 2, 'Giọng Hà Nội thường được coi là chuẩn.',
      [
        'Tiếng Hà Nội từ xưa thường được coi là <b>chuẩn mực phát âm tiếng Việt</b>.',
        '<ul><li>Là cơ sở để xây dựng chuẩn chính tả, phát thanh.</li><li>Tuy vậy, mỗi vùng miền đều có nét đẹp riêng trong cách nói.</li></ul>',
      ],
      [
        'Sai — giọng Hà Nội không bị coi là khó nghe. Đáp án đúng là <b>chuẩn mực phát âm tiếng Việt</b>.',
        'Sai — đây là đánh giá phi lí. Đáp án đúng là <b>chuẩn mực phát âm tiếng Việt</b>.',
        'Đúng — tiếng Hà Nội được coi là <b>chuẩn mực phát âm tiếng Việt</b>.',
        'Sai — giọng Hà Nội được lấy làm chuẩn, không phải "nói khác hẳn". Đáp án đúng là <b>chuẩn mực phát âm tiếng Việt</b>.',
      ]
    ),
    Q('Từ "ăn cơm" ở Hà Nội nói?', ['Như chuẩn (ăn cơm)', 'Hoàn toàn khác', 'Eng com', 'En cum'], 0, 'Người Hà Nội phát âm gần với chuẩn.',
      [
        'Người Hà Nội phát âm từ <i>"ăn cơm"</i> <b>như chuẩn</b> — rõ ràng, đúng âm và dấu.',
        '<ul><li>Đây là một ví dụ cho thấy phương ngữ Hà Nội gần với tiếng phổ thông.</li><li>Một số vùng miền khác có thể phát âm chệch đi.</li></ul>',
      ],
      [
        'Đúng — người Hà Nội nói "ăn cơm" <b>như chuẩn</b>.',
        'Sai — người Hà Nội phát âm gần chuẩn, không "hoàn toàn khác". Đáp án đúng là <b>như chuẩn (ăn cơm)</b>.',
        'Sai — đây là cách phát âm chệch không đúng giọng Hà Nội. Đáp án đúng là <b>như chuẩn (ăn cơm)</b>.',
        'Sai — đây là cách phát âm chệch. Đáp án đúng là <b>như chuẩn (ăn cơm)</b>.',
      ]
    ),
    Q('Văn hoá nói "thưa, dạ, vâng" được coi trọng ở?', ['Không ai', 'Chỉ trẻ em', 'Chỉ người già', 'Hà Nội (lịch sự, lễ phép)'], 3, 'Hà Nội coi trọng lễ phép trong giao tiếp.',
      [
        'Văn hoá nói <b>"thưa, dạ, vâng"</b> được coi trọng ở <b>Hà Nội</b> — thể hiện sự lịch sự, lễ phép trong giao tiếp.',
        '<ul><li>Đây là nét đẹp trong ứng xử của người Tràng An.</li><li>Lời ăn tiếng nói nhã nhặn được giữ gìn qua nhiều thế hệ.</li></ul>',
      ],
      [
        'Sai — không phải "không ai" coi trọng. Đáp án đúng là <b>Hà Nội (lịch sự, lễ phép)</b>.',
        'Sai — không chỉ trẻ em. Đáp án đúng là <b>Hà Nội (lịch sự, lễ phép)</b>.',
        'Sai — không chỉ người già. Đáp án đúng là <b>Hà Nội (lịch sự, lễ phép)</b>.',
        'Đúng — văn hoá "thưa, dạ, vâng" được coi trọng ở <b>Hà Nội (lịch sự, lễ phép)</b>.',
      ]
    ),
  ]),

  M(28, 'Bản sắc văn hoá người Hà Nội', [
    Q('Người Hà Nội được biết đến với?', ['Thô lỗ', 'Sự thanh lịch, văn minh, lễ phép', 'Lạnh nhạt', 'Ồn ào, vội vã, xô bồ'], 1, '"Chẳng thơm cũng thể hoa nhài / Dẫu không thanh lịch cũng người Tràng An".',
      [
        'Người Hà Nội từ xưa được biết đến với <b>sự thanh lịch, văn minh, lễ phép</b> trong ứng xử.',
        '<ul><li>Câu ca dao: <i>"Chẳng thơm cũng thể hoa nhài / Dẫu không thanh lịch cũng người Tràng An"</i>.</li><li>Nét hào hoa, tinh tế là bản sắc của người Thủ đô.</li></ul>',
      ],
      [
        'Sai — người Hà Nội nổi tiếng thanh lịch, không phải thô lỗ. Đáp án đúng là <b>sự thanh lịch, văn minh, lễ phép</b>.',
        'Đúng — người Hà Nội được biết đến với <b>sự thanh lịch, văn minh, lễ phép</b>.',
        'Sai — "lạnh nhạt" không phải bản sắc người Hà Nội. Đáp án đúng là <b>sự thanh lịch, văn minh, lễ phép</b>.',
        'Sai — nét đẹp người Hà Nội là thanh lịch, không phải "ồn ào, xô bồ". Đáp án đúng là <b>sự thanh lịch, văn minh, lễ phép</b>.',
      ]
    ),
    Q('Câu "Chẳng thơm cũng thể hoa nhài" nói về?', ['Người Huế', 'Người Sài Gòn', 'Người Hà Nội (Tràng An)', 'Người Đà Nẵng'], 2, 'Câu ca dao đề cao thanh lịch người Tràng An — Hà Nội.',
      [
        'Câu ca dao <i>"Chẳng thơm cũng thể hoa nhài / Dẫu không thanh lịch cũng người Tràng An"</i> nói về <b>người Hà Nội (Tràng An)</b>.',
        '<ul><li>"Tràng An" là tên gọi đẹp chỉ kinh đô — Hà Nội.</li><li>Câu ca đề cao nét thanh lịch, văn minh của người Thủ đô.</li></ul>',
      ],
      [
        'Sai — câu ca nói về người Hà Nội, không phải người Huế. Đáp án đúng là <b>người Hà Nội (Tràng An)</b>.',
        'Sai — câu ca không nói về người Sài Gòn. Đáp án đúng là <b>người Hà Nội (Tràng An)</b>.',
        'Đúng — câu ca dao nói về <b>người Hà Nội (Tràng An)</b>.',
        'Sai — câu ca không nói về người Đà Nẵng. Đáp án đúng là <b>người Hà Nội (Tràng An)</b>.',
      ]
    ),
    Q('Trang phục truyền thống của người Hà Nội xưa?', ['Đồ thể thao', 'Đồ ngắn', 'Đồ tây', 'Áo dài (nữ), áo the khăn xếp (nam)'], 3, 'Áo dài và áo the là truyền thống.',
      [
        'Trang phục truyền thống của người Hà Nội xưa là <b>áo dài</b> (với nữ) và <b>áo the, khăn xếp</b> (với nam).',
        '<ul><li>Đây là trang phục lịch lãm trong các dịp lễ Tết, hội hè.</li><li>Áo dài về sau trở thành quốc phục, biểu tượng vẻ đẹp Việt Nam.</li></ul>',
      ],
      [
        'Sai — đồ thể thao không phải trang phục truyền thống. Đáp án đúng là <b>áo dài (nữ), áo the khăn xếp (nam)</b>.',
        'Sai — "đồ ngắn" không phải trang phục truyền thống. Đáp án đúng là <b>áo dài (nữ), áo the khăn xếp (nam)</b>.',
        'Sai — "đồ tây" là trang phục du nhập thời sau. Đáp án đúng là <b>áo dài (nữ), áo the khăn xếp (nam)</b>.',
        'Đúng — trang phục truyền thống là <b>áo dài (nữ), áo the khăn xếp (nam)</b>.',
      ]
    ),
    Q('Lối sống của người Hà Nội xưa coi trọng?', ['Hào nhoáng', 'Phô trương', 'Vật chất', 'Gia đình, lễ nghĩa, tri thức'], 3, 'Người HN coi trọng tinh thần, gia đình, học vấn.',
      [
        'Lối sống của người Hà Nội xưa coi trọng <b>gia đình, lễ nghĩa và tri thức</b>.',
        '<ul><li>Đề cao nền nếp gia phong, sự học và đạo lí.</li><li>Coi trọng giá trị tinh thần hơn là phô trương vật chất.</li></ul>',
      ],
      [
        'Sai — người Hà Nội xưa không chuộng hào nhoáng. Đáp án đúng là <b>gia đình, lễ nghĩa, tri thức</b>.',
        'Sai — không coi trọng sự phô trương. Đáp án đúng là <b>gia đình, lễ nghĩa, tri thức</b>.',
        'Sai — coi trọng tinh thần hơn vật chất. Đáp án đúng là <b>gia đình, lễ nghĩa, tri thức</b>.',
        'Đúng — người Hà Nội xưa coi trọng <b>gia đình, lễ nghĩa, tri thức</b>.',
      ]
    ),
    Q('Hà Nội được mệnh danh là?', ['"Thành phố vì hoà bình"', 'Trung tâm tài chính lớn nhất', 'Cảng biển lớn', 'Thủ đô công nghiệp'], 0, 'UNESCO trao danh hiệu "Thành phố vì hoà bình" năm 1999.',
      [
        'Năm <code>1999</code>, Hà Nội được UNESCO trao danh hiệu <b>"Thành phố vì hoà bình"</b>.',
        '<ul><li>Đây là thành phố duy nhất của khu vực châu Á — Thái Bình Dương được trao danh hiệu này khi đó.</li><li>Danh hiệu ghi nhận nỗ lực vì hoà bình, đoàn kết và phát triển bền vững.</li></ul>',
      ],
      [
        'Đúng — Hà Nội được mệnh danh là <b>"Thành phố vì hoà bình"</b> (UNESCO, 1999).',
        'Sai — đây không phải danh hiệu của Hà Nội. Đáp án đúng là <b>"Thành phố vì hoà bình"</b>.',
        'Sai — Hà Nội không phải cảng biển. Đáp án đúng là <b>"Thành phố vì hoà bình"</b>.',
        'Sai — Hà Nội là trung tâm văn hoá — chính trị, không phải "thủ đô công nghiệp". Đáp án đúng là <b>"Thành phố vì hoà bình"</b>.',
      ]
    ),
  ]),

  M(29, 'Đình làng Việt — Đình Tây Đằng', [
    Q('Đình làng có vai trò?', ['Chỉ thờ tổ tiên', 'Chỉ để chơi', 'Nơi thờ Thành hoàng và sinh hoạt cộng đồng', 'Khu công nghiệp'], 2, 'Đình thờ Thành hoàng và sinh hoạt cộng đồng.',
      [
        '<b>Đình làng</b> có vai trò là <b>nơi thờ Thành hoàng</b> và là trung tâm <b>sinh hoạt cộng đồng</b> của làng.',
        '<ul><li>Đình là nơi hội họp, mở hội, xử việc làng.</li><li>Là biểu tượng của tính cố kết cộng đồng làng xã Việt Nam.</li></ul>',
      ],
      [
        'Sai — đình không chỉ thờ tổ tiên (đó là nhà thờ họ). Đáp án đúng là <b>nơi thờ Thành hoàng và sinh hoạt cộng đồng</b>.',
        'Sai — đình không phải chỉ để chơi. Đáp án đúng là <b>nơi thờ Thành hoàng và sinh hoạt cộng đồng</b>.',
        'Đúng — đình làng là <b>nơi thờ Thành hoàng và sinh hoạt cộng đồng</b>.',
        'Sai — đình không phải khu công nghiệp. Đáp án đúng là <b>nơi thờ Thành hoàng và sinh hoạt cộng đồng</b>.',
      ]
    ),
    Q('Đình Tây Đằng ở?', ['Đông Anh', 'Mê Linh', 'Ba Vì, Hà Nội', 'Sơn Tây'], 2, 'Đình Tây Đằng ở Ba Vì.',
      [
        '<b>Đình Tây Đằng</b> nằm ở thị trấn Tây Đằng, huyện <b>Ba Vì</b>, Hà Nội — vùng xứ Đoài.',
        '<ul><li>Đây là một trong những ngôi đình cổ nhất còn lại của Việt Nam.</li><li>Nổi tiếng với nghệ thuật chạm khắc gỗ tinh xảo.</li></ul>',
      ],
      [
        'Sai — đình Tây Đằng không ở Đông Anh. Đáp án đúng là <b>Ba Vì, Hà Nội</b>.',
        'Sai — đình Tây Đằng không ở Mê Linh. Đáp án đúng là <b>Ba Vì, Hà Nội</b>.',
        'Đúng — đình Tây Đằng ở <b>Ba Vì, Hà Nội</b>.',
        'Sai — đình Tây Đằng ở Ba Vì, không phải thị xã Sơn Tây. Đáp án đúng là <b>Ba Vì, Hà Nội</b>.',
      ]
    ),
    Q('Đình Tây Đằng nổi tiếng vì?', ['Là đình cổ nhất còn lại ở Việt Nam (thế kỉ XV)', 'Lớn nhất', 'Cao nhất', 'Mới xây nhất'], 0, 'Đình Tây Đằng là một trong những đình cổ nhất.',
      [
        '<b>Đình Tây Đằng</b> nổi tiếng là <b>một trong những đình cổ nhất còn lại ở Việt Nam</b>, có niên đại khoảng <b>thế kỉ XV–XVI</b>.',
        '<ul><li>Chạm khắc gỗ ở đình phản ánh sinh động đời sống dân gian.</li><li>Là di tích kiến trúc nghệ thuật quý giá của xứ Đoài.</li></ul>',
      ],
      [
        'Đúng — đình Tây Đằng nổi tiếng là <b>đình cổ nhất còn lại ở Việt Nam (thế kỉ XV)</b>.',
        'Sai — đình nổi tiếng vì cổ kính, không phải lớn nhất. Đáp án đúng là <b>là đình cổ nhất còn lại ở Việt Nam (thế kỉ XV)</b>.',
        'Sai — không phải vì cao nhất. Đáp án đúng là <b>là đình cổ nhất còn lại ở Việt Nam (thế kỉ XV)</b>.',
        'Sai — ngược lại, đình rất cổ chứ không "mới xây nhất". Đáp án đúng là <b>là đình cổ nhất còn lại ở Việt Nam (thế kỉ XV)</b>.',
      ]
    ),
    Q('Kiến trúc đình làng đặc trưng?', ['Mái cong, cột gỗ lớn, chạm khắc tinh xảo', 'Kim loại', 'Bê tông cốt thép', 'Tường gạch ốp đá hoa cương'], 0, 'Đình làng đặc trưng với gỗ và mái cong.',
      [
        'Kiến trúc đình làng đặc trưng với <b>mái cong, hệ cột gỗ lớn và chạm khắc tinh xảo</b>.',
        '<ul><li>Bộ khung gỗ liên kết bằng mộng, không dùng đinh.</li><li>Các đầu dư, kẻ, bẩy được chạm rồng, phượng, hoa lá, cảnh sinh hoạt.</li></ul>',
      ],
      [
        'Đúng — đình làng đặc trưng với <b>mái cong, cột gỗ lớn, chạm khắc tinh xảo</b>.',
        'Sai — đình làng làm bằng gỗ, không phải kim loại. Đáp án đúng là <b>mái cong, cột gỗ lớn, chạm khắc tinh xảo</b>.',
        'Sai — đình cổ không dùng bê tông cốt thép. Đáp án đúng là <b>mái cong, cột gỗ lớn, chạm khắc tinh xảo</b>.',
        'Sai — đình cổ không ốp đá hoa cương. Đáp án đúng là <b>mái cong, cột gỗ lớn, chạm khắc tinh xảo</b>.',
      ]
    ),
    Q('Thành hoàng làng thường là?', ['Vị anh hùng, tổ nghề, thần linh có công với làng', 'Người không liên quan', 'Kẻ thù', 'Người ngoài'], 0, 'Thành hoàng là vị có công được dân tôn thờ.',
      [
        '<b>Thành hoàng làng</b> thường là <b>vị anh hùng, tổ nghề hoặc thần linh có công với làng</b>, được dân tôn thờ làm vị thần bảo hộ.',
        '<ul><li>Có thể là người có công lập làng, dạy nghề, đánh giặc.</li><li>Cũng có thể là nhiên thần (thần núi, thần sông) hoặc nhân thần được sắc phong.</li></ul>',
      ],
      [
        'Đúng — Thành hoàng làng thường là <b>vị anh hùng, tổ nghề, thần linh có công với làng</b>.',
        'Sai — Thành hoàng là người có công, không phải người không liên quan. Đáp án đúng là <b>vị anh hùng, tổ nghề, thần linh có công với làng</b>.',
        'Sai — không bao giờ thờ kẻ thù làm Thành hoàng. Đáp án đúng là <b>vị anh hùng, tổ nghề, thần linh có công với làng</b>.',
        'Sai — Thành hoàng phải có công với làng. Đáp án đúng là <b>vị anh hùng, tổ nghề, thần linh có công với làng</b>.',
      ]
    ),
  ]),

  M(30, 'Bảo tàng Hà Nội', [
    Q('Bảo tàng Hà Nội nằm ở?', ['Đống Đa', 'Ba Đình', 'Phạm Hùng (Nam Từ Liêm)', 'Hoàn Kiếm'], 2, 'Bảo tàng Hà Nội ở đường Phạm Hùng.',
      [
        '<b>Bảo tàng Hà Nội</b> nằm trên đường <b>Phạm Hùng</b>, quận <b>Nam Từ Liêm</b>.',
        '<ul><li>Toà nhà có kiến trúc kim tự tháp ngược độc đáo.</li><li>Trưng bày hiện vật về lịch sử, văn hoá nghìn năm của Thăng Long — Hà Nội.</li></ul>',
      ],
      [
        'Sai — Bảo tàng Hà Nội không ở Đống Đa. Đáp án đúng là <b>Phạm Hùng (Nam Từ Liêm)</b>.',
        'Sai — Bảo tàng Hà Nội không ở Ba Đình. Đáp án đúng là <b>Phạm Hùng (Nam Từ Liêm)</b>.',
        'Đúng — Bảo tàng Hà Nội nằm ở đường <b>Phạm Hùng (Nam Từ Liêm)</b>.',
        'Sai — Bảo tàng Hà Nội không ở Hoàn Kiếm. Đáp án đúng là <b>Phạm Hùng (Nam Từ Liêm)</b>.',
      ]
    ),
    Q('Bảo tàng Hà Nội khánh thành năm?', ['2010 (Đại lễ 1000 năm Thăng Long)', '2000', '2020', '1990'], 0, 'Khánh thành dịp Đại lễ 1000 năm Thăng Long.',
      [
        '<b>Bảo tàng Hà Nội</b> được khánh thành năm <code>2010</code>, đúng dịp <b>Đại lễ 1000 năm Thăng Long — Hà Nội</b>.',
        '<ul><li>Là công trình chào mừng sự kiện trọng đại của Thủ đô.</li><li>Lưu giữ hàng vạn tài liệu, hiện vật quý.</li></ul>',
      ],
      [
        'Đúng — Bảo tàng Hà Nội khánh thành năm <b>2010 (Đại lễ 1000 năm Thăng Long)</b>.',
        'Sai — <code>2000</code> không đúng. Đáp án đúng là <b>2010 (Đại lễ 1000 năm Thăng Long)</b>.',
        'Sai — <code>2020</code> muộn hơn thực tế. Đáp án đúng là <b>2010 (Đại lễ 1000 năm Thăng Long)</b>.',
        'Sai — <code>1990</code> quá sớm. Đáp án đúng là <b>2010 (Đại lễ 1000 năm Thăng Long)</b>.',
      ]
    ),
    Q('Bảo tàng Lịch sử Quân sự VN ở?', ['Điện Biên Phủ, Ba Đình', 'Cầu Giấy', 'Hoàn Kiếm', 'Đống Đa'], 0, 'Trên đường Điện Biên Phủ, Ba Đình.',
      [
        '<b>Bảo tàng Lịch sử Quân sự Việt Nam</b> (cơ sở cũ) nằm trên đường <b>Điện Biên Phủ, quận Ba Đình</b>, cạnh Cột Cờ Hà Nội.',
        '<ul><li>Trưng bày hiện vật về lịch sử đấu tranh giữ nước của dân tộc.</li><li>Gần đây bảo tàng có thêm cơ sở mới ở quận Nam Từ Liêm.</li></ul>',
      ],
      [
        'Đúng — Bảo tàng Lịch sử Quân sự (cơ sở cũ) ở <b>Điện Biên Phủ, Ba Đình</b>.',
        'Sai — không ở Cầu Giấy. Đáp án đúng là <b>Điện Biên Phủ, Ba Đình</b>.',
        'Sai — không ở Hoàn Kiếm. Đáp án đúng là <b>Điện Biên Phủ, Ba Đình</b>.',
        'Sai — không ở Đống Đa. Đáp án đúng là <b>Điện Biên Phủ, Ba Đình</b>.',
      ]
    ),
    Q('Bảo tàng Dân tộc học VN trưng bày?', ['Lịch sử', 'Văn hoá 54 dân tộc VN', 'Quân sự', 'Khoa học'], 1, 'Bảo tàng Dân tộc học trưng bày văn hoá các dân tộc.',
      [
        '<b>Bảo tàng Dân tộc học Việt Nam</b> (quận Cầu Giấy) trưng bày về <b>văn hoá của 54 dân tộc Việt Nam</b>.',
        '<ul><li>Có khu nhà trưng bày trong nhà và khu vườn kiến trúc ngoài trời.</li><li>Là điểm đến hấp dẫn để tìm hiểu sự đa dạng văn hoá các dân tộc.</li></ul>',
      ],
      [
        'Sai — đây không phải bảo tàng lịch sử nói chung. Đáp án đúng là <b>văn hoá 54 dân tộc VN</b>.',
        'Đúng — Bảo tàng Dân tộc học trưng bày về <b>văn hoá 54 dân tộc VN</b>.',
        'Sai — quân sự là chủ đề của bảo tàng khác. Đáp án đúng là <b>văn hoá 54 dân tộc VN</b>.',
        'Sai — khoa học là chủ đề của bảo tàng khác. Đáp án đúng là <b>văn hoá 54 dân tộc VN</b>.',
      ]
    ),
    Q('Hà Nội có nhiều bảo tàng vì?', ['Là thủ đô — trung tâm văn hoá lịch sử', 'Du lịch', 'Không có lý do', 'Tình cờ'], 0, 'Hà Nội là trung tâm văn hoá lịch sử cả nước.',
      [
        'Hà Nội có nhiều bảo tàng vì là <b>Thủ đô — trung tâm văn hoá, lịch sử</b> của cả nước.',
        '<ul><li>Nơi tập trung các cơ quan, viện nghiên cứu, di sản lớn.</li><li>Hệ thống bảo tàng giúp lưu giữ và giáo dục truyền thống cho thế hệ sau.</li></ul>',
      ],
      [
        'Đúng — Hà Nội có nhiều bảo tàng vì <b>là thủ đô — trung tâm văn hoá lịch sử</b>.',
        'Sai — du lịch chỉ là một phần, lí do chính là vị thế thủ đô. Đáp án đúng là <b>là thủ đô — trung tâm văn hoá lịch sử</b>.',
        'Sai — luôn có lí do. Đáp án đúng là <b>là thủ đô — trung tâm văn hoá lịch sử</b>.',
        'Sai — không phải tình cờ. Đáp án đúng là <b>là thủ đô — trung tâm văn hoá lịch sử</b>.',
      ]
    ),
  ]),

  M(31, 'Khu di tích Chủ tịch Hồ Chí Minh', [
    Q('Khu di tích Bác Hồ ở?', ['Hồ Gươm', 'Hồ Tây', 'Sân bay', 'Quảng trường Ba Đình'], 3, 'Khu di tích Bác Hồ ở Ba Đình.',
      [
        '<b>Khu di tích Chủ tịch Hồ Chí Minh</b> nằm tại khu vực <b>Quảng trường Ba Đình</b>, quận Ba Đình.',
        '<ul><li>Gồm Lăng Bác, Phủ Chủ tịch, nhà sàn, ao cá, vườn cây.</li><li>Là nơi linh thiêng, thu hút đông đảo người dân và du khách viếng thăm.</li></ul>',
      ],
      [
        'Sai — khu di tích Bác Hồ không ở Hồ Gươm. Đáp án đúng là <b>Quảng trường Ba Đình</b>.',
        'Sai — khu di tích Bác Hồ không ở Hồ Tây. Đáp án đúng là <b>Quảng trường Ba Đình</b>.',
        'Sai — không phải ở sân bay. Đáp án đúng là <b>Quảng trường Ba Đình</b>.',
        'Đúng — khu di tích Bác Hồ ở <b>Quảng trường Ba Đình</b>.',
      ]
    ),
    Q('Lăng Chủ tịch Hồ Chí Minh khánh thành?', ['1985', '1969', 'Năm 1975', '1945'], 2, 'Lăng khánh thành ngày 29/8/1975.',
      [
        '<b>Lăng Chủ tịch Hồ Chí Minh</b> được khánh thành ngày <code>29/8/1975</code>.',
        '<ul><li>Lăng được khởi công năm 1973, sau khi Bác mất (1969).</li><li>Là nơi gìn giữ thi hài Bác để nhân dân vào viếng.</li></ul>',
      ],
      [
        'Sai — 1985 muộn hơn thực tế. Đáp án đúng là <b>năm 1975</b>.',
        'Sai — 1969 là năm Bác mất, không phải năm khánh thành lăng. Đáp án đúng là <b>năm 1975</b>.',
        'Đúng — Lăng Bác khánh thành <b>năm 1975</b> (ngày 29/8).',
        'Sai — 1945 là năm đọc Tuyên ngôn Độc lập. Đáp án đúng là <b>năm 1975</b>.',
      ]
    ),
    Q('Khu di tích gồm?', ['Chỉ vườn', 'Chỉ nhà sàn', 'Lăng Bác, nhà sàn, ao cá, vườn', 'Chỉ lăng'], 2, 'Quần thể nhiều di tích.',
      [
        '<b>Khu di tích Chủ tịch Hồ Chí Minh</b> là một quần thể gồm <b>Lăng Bác, nhà sàn, ao cá, vườn cây</b>, Phủ Chủ tịch và Bảo tàng Hồ Chí Minh.',
        '<ul><li>Mỗi công trình gắn với một phần cuộc đời và sự nghiệp của Bác.</li><li>Nhà sàn và ao cá thể hiện lối sống giản dị, gần gũi thiên nhiên.</li></ul>',
      ],
      [
        'Sai — khu di tích không chỉ có vườn. Đáp án đúng là <b>Lăng Bác, nhà sàn, ao cá, vườn</b>.',
        'Sai — không chỉ có nhà sàn. Đáp án đúng là <b>Lăng Bác, nhà sàn, ao cá, vườn</b>.',
        'Đúng — khu di tích gồm <b>Lăng Bác, nhà sàn, ao cá, vườn</b> và nhiều công trình khác.',
        'Sai — không chỉ có lăng. Đáp án đúng là <b>Lăng Bác, nhà sàn, ao cá, vườn</b>.',
      ]
    ),
    Q('Quảng trường Ba Đình là nơi Bác Hồ?', ['Đọc Tuyên ngôn Độc lập (2/9/1945)', 'Họp gia đình', 'Tiếp khách', 'Sinh ra'], 0, 'Ngày 2/9/1945 Bác đọc Tuyên ngôn Độc lập tại Ba Đình.',
      [
        'Ngày <code>2/9/1945</code>, tại <b>Quảng trường Ba Đình</b>, Chủ tịch Hồ Chí Minh đã <b>đọc bản Tuyên ngôn Độc lập</b>, khai sinh nước Việt Nam Dân chủ Cộng hoà.',
        '<ul><li>Đây là sự kiện trọng đại, mở ra kỉ nguyên độc lập của dân tộc.</li><li>Ngày 2/9 trở thành Quốc khánh Việt Nam.</li></ul>',
      ],
      [
        'Đúng — Quảng trường Ba Đình là nơi Bác <b>đọc Tuyên ngôn Độc lập (2/9/1945)</b>.',
        'Sai — đây là nơi diễn ra sự kiện lịch sử, không phải họp gia đình. Đáp án đúng là <b>đọc Tuyên ngôn Độc lập (2/9/1945)</b>.',
        'Sai — không phải nơi tiếp khách. Đáp án đúng là <b>đọc Tuyên ngôn Độc lập (2/9/1945)</b>.',
        'Sai — Bác Hồ sinh ở Nghệ An. Đáp án đúng là <b>đọc Tuyên ngôn Độc lập (2/9/1945)</b>.',
      ]
    ),
    Q('Nhà sàn Bác Hồ phản ánh?', ['Cuộc sống cô đơn', 'Lối sống giản dị, thanh bạch', 'Không có ý nghĩa', 'Cuộc sống xa hoa'], 1, 'Nhà sàn thể hiện lối sống giản dị của Bác.',
      [
        '<b>Nhà sàn Bác Hồ</b> phản ánh <b>lối sống giản dị, thanh bạch</b> của Người.',
        '<ul><li>Ngôi nhà sàn nhỏ bằng gỗ, đơn sơ nhưng ấm cúng, gần gũi thiên nhiên.</li><li>Là bài học về đức tính khiêm tốn, tiết kiệm.</li></ul>',
      ],
      [
        'Sai — nhà sàn không phản ánh cuộc sống cô đơn. Đáp án đúng là <b>lối sống giản dị, thanh bạch</b>.',
        'Đúng — nhà sàn Bác Hồ phản ánh <b>lối sống giản dị, thanh bạch</b>.',
        'Sai — nhà sàn rất giàu ý nghĩa. Đáp án đúng là <b>lối sống giản dị, thanh bạch</b>.',
        'Sai — nhà sàn thể hiện sự giản dị, không xa hoa. Đáp án đúng là <b>lối sống giản dị, thanh bạch</b>.',
      ]
    ),
  ]),

  M(32, 'Hà Nội ngày nay — đô thị hoá', [
    Q('Hà Nội mở rộng địa giới năm?', ['1975', '2008', '2020', '1954'], 1, 'Năm 2008 sáp nhập Hà Tây.',
      [
        'Năm <code>2008</code>, Hà Nội mở rộng địa giới hành chính lớn nhất khi <b>sáp nhập toàn bộ tỉnh Hà Tây</b>, huyện Mê Linh (Vĩnh Phúc) và 4 xã của Hoà Bình.',
        '<ul><li>Diện tích tăng gấp khoảng 3,6 lần.</li><li>Mở rộng không gian phát triển cho Thủ đô.</li></ul>',
      ],
      [
        'Sai — 1975 không phải năm mở rộng. Đáp án đúng là <b>2008</b>.',
        'Đúng — Hà Nội mở rộng địa giới năm <b>2008</b> (sáp nhập Hà Tây).',
        'Sai — 2020 không phải năm mở rộng địa giới lớn. Đáp án đúng là <b>2008</b>.',
        'Sai — 1954 là năm giải phóng Thủ đô. Đáp án đúng là <b>2008</b>.',
      ]
    ),
    Q('Diện tích Hà Nội hiện?', ['~10000 km²', '~1000 km²', '~3 359 km²', '~5000 km²'], 2, '~3 359 km² sau 2008.',
      [
        'Sau khi mở rộng năm 2008, diện tích Hà Nội khoảng <b>~3 359 km²</b>.',
        '<ul><li>Hà Nội trở thành một trong những thủ đô có diện tích lớn trên thế giới.</li><li>Dân số trên 8 triệu người.</li></ul>',
      ],
      [
        'Sai — ~10000 km² quá lớn. Đáp án đúng là <b>~3 359 km²</b>.',
        'Sai — ~1000 km² là diện tích trước khi mở rộng. Đáp án đúng là <b>~3 359 km²</b>.',
        'Đúng — diện tích Hà Nội hiện khoảng <b>~3 359 km²</b>.',
        'Sai — ~5000 km² không chính xác. Đáp án đúng là <b>~3 359 km²</b>.',
      ]
    ),
    Q('Hà Nội có bao nhiêu quận?', ['20', '5', '12 quận', '30'], 2, 'Hà Nội có 12 quận nội thành.',
      [
        'Hà Nội có <b>12 quận</b> nội thành cùng với 1 thị xã và nhiều huyện ngoại thành.',
        '<ul><li>Các quận: Hoàn Kiếm, Ba Đình, Đống Đa, Hai Bà Trưng, Tây Hồ, Cầu Giấy, Thanh Xuân, Hoàng Mai, Long Biên, Hà Đông, Bắc Từ Liêm, Nam Từ Liêm.</li></ul>',
      ],
      [
        'Sai — không phải 20 quận. Đáp án đúng là <b>12 quận</b>.',
        'Sai — Hà Nội nhiều hơn 5 quận. Đáp án đúng là <b>12 quận</b>.',
        'Đúng — Hà Nội có <b>12 quận</b> nội thành.',
        'Sai — không phải 30 quận. Đáp án đúng là <b>12 quận</b>.',
      ]
    ),
    Q('Thị xã duy nhất của Hà Nội?', ['Hà Đông', 'Long Biên', 'Sơn Tây', 'Hoàng Mai'], 2, 'Sơn Tây là thị xã duy nhất.',
      [
        '<b>Sơn Tây</b> là <b>thị xã duy nhất</b> của Hà Nội.',
        '<ul><li>Hà Đông, Long Biên, Hoàng Mai đều đã là quận.</li><li>Sơn Tây là trung tâm vùng văn hoá xứ Đoài.</li></ul>',
      ],
      [
        'Sai — Hà Đông nay là quận. Đáp án đúng là <b>Sơn Tây</b>.',
        'Sai — Long Biên nay là quận. Đáp án đúng là <b>Sơn Tây</b>.',
        'Đúng — <b>Sơn Tây</b> là thị xã duy nhất của Hà Nội.',
        'Sai — Hoàng Mai nay là quận. Đáp án đúng là <b>Sơn Tây</b>.',
      ]
    ),
    Q('Vấn đề lớn của đô thị Hà Nội?', ['Tốt hoàn hảo', 'Ô nhiễm không khí, tắc đường, dân số đông', 'Quá ít người', 'Không có giao thông'], 1, 'Hà Nội đối mặt nhiều vấn đề đô thị lớn.',
      [
        'Quá trình đô thị hoá nhanh khiến Hà Nội đối mặt nhiều vấn đề: <b>ô nhiễm không khí, ùn tắc giao thông, dân số đông</b>, áp lực hạ tầng.',
        '<ul><li>Cần các giải pháp về quy hoạch, giao thông công cộng, cây xanh.</li><li>Bảo vệ môi trường là trách nhiệm của mỗi người dân Thủ đô.</li></ul>',
      ],
      [
        'Sai — Hà Nội còn nhiều thách thức, không "hoàn hảo". Đáp án đúng là <b>ô nhiễm không khí, tắc đường, dân số đông</b>.',
        'Đúng — vấn đề lớn của đô thị Hà Nội là <b>ô nhiễm không khí, tắc đường, dân số đông</b>.',
        'Sai — Hà Nội đông dân, không phải quá ít người. Đáp án đúng là <b>ô nhiễm không khí, tắc đường, dân số đông</b>.',
        'Sai — Hà Nội có hệ thống giao thông phức tạp. Đáp án đúng là <b>ô nhiễm không khí, tắc đường, dân số đông</b>.',
      ]
    ),
  ]),

  M(33, 'Trách nhiệm bảo vệ di sản Hà Nội', [
    Q('Là HS Hà Nội, em có thể bảo vệ di sản bằng?', ['Vẽ bậy', 'Tìm hiểu, giữ vệ sinh, giới thiệu với bạn bè', 'Khắc tên kỉ niệm lên di tích', 'Mặc kệ'], 1, 'HS có thể bảo vệ di sản bằng nhiều cách phù hợp.',
      [
        'Là học sinh Hà Nội, em có thể bảo vệ di sản bằng cách <b>tìm hiểu, giữ vệ sinh và giới thiệu với bạn bè</b>.',
        '<ul><li>Học và lan toả giá trị di sản là cách bảo vệ thiết thực.</li><li>Mỗi hành động nhỏ đúng đắn đều góp phần gìn giữ di sản.</li></ul>',
      ],
      [
        'Sai — vẽ bậy là phá hoại di sản. Đáp án đúng là <b>tìm hiểu, giữ vệ sinh, giới thiệu với bạn bè</b>.',
        'Đúng — em bảo vệ di sản bằng cách <b>tìm hiểu, giữ vệ sinh, giới thiệu với bạn bè</b>.',
        'Sai — khắc tên lên di tích là hành vi phá hoại. Đáp án đúng là <b>tìm hiểu, giữ vệ sinh, giới thiệu với bạn bè</b>.',
        'Sai — "mặc kệ" là thái độ thờ ơ, vô trách nhiệm. Đáp án đúng là <b>tìm hiểu, giữ vệ sinh, giới thiệu với bạn bè</b>.',
      ]
    ),
    Q('Khi tham quan di tích, em nên?', ['Vẽ kỉ niệm', 'Chạy nhảy, đùa nghịch trong đền', 'Tuân thủ nội quy, không xả rác', 'Bẻ cây'], 2, 'Tuân thủ nội quy là bảo vệ di sản.',
      [
        'Khi tham quan di tích, em nên <b>tuân thủ nội quy và không xả rác</b>.',
        '<ul><li>Giữ trật tự, đi nhẹ nói khẽ ở nơi tôn nghiêm.</li><li>Không sờ, không trèo, không làm hư hại hiện vật.</li></ul>',
      ],
      [
        'Sai — vẽ kỉ niệm lên di tích là phá hoại. Đáp án đúng là <b>tuân thủ nội quy, không xả rác</b>.',
        'Sai — không nên chạy nhảy đùa nghịch nơi tôn nghiêm. Đáp án đúng là <b>tuân thủ nội quy, không xả rác</b>.',
        'Đúng — khi tham quan di tích, em nên <b>tuân thủ nội quy, không xả rác</b>.',
        'Sai — bẻ cây là hành vi gây hại. Đáp án đúng là <b>tuân thủ nội quy, không xả rác</b>.',
      ]
    ),
    Q('Hành vi nào VI PHẠM bảo vệ di sản?', ['Quảng bá', 'Vẽ tên lên tường di tích', 'Quét dọn', 'Trồng cây'], 1, 'Vẽ bậy là vi phạm nghiêm trọng.',
      [
        'Hành vi <b>vẽ tên lên tường di tích</b> là <b>vi phạm</b> việc bảo vệ di sản — làm hư hại, biến dạng di tích.',
        '<ul><li>Đây là hành vi bị pháp luật nghiêm cấm.</li><li>Quảng bá, quét dọn, trồng cây đều là việc tốt góp phần bảo vệ di sản.</li></ul>',
      ],
      [
        'Sai — quảng bá là việc tốt. Đáp án đúng (hành vi vi phạm) là <b>vẽ tên lên tường di tích</b>.',
        'Đúng — <b>vẽ tên lên tường di tích</b> là hành vi vi phạm bảo vệ di sản.',
        'Sai — quét dọn là việc tốt, không vi phạm. Đáp án đúng (hành vi vi phạm) là <b>vẽ tên lên tường di tích</b>.',
        'Sai — trồng cây là việc tốt. Đáp án đúng (hành vi vi phạm) là <b>vẽ tên lên tường di tích</b>.',
      ]
    ),
    Q('Vì sao cần bảo vệ phố cổ?', ['Tốn tiền', 'Là di sản kiến trúc và văn hoá độc đáo', 'Để cản trở đô thị hoá', 'Không cần thiết'], 1, 'Phố cổ là di sản quý của Hà Nội.',
      [
        'Cần bảo vệ <b>phố cổ Hà Nội</b> vì đây là <b>di sản kiến trúc và văn hoá độc đáo</b>, lưu giữ hồn cốt nghìn năm của Thủ đô.',
        '<ul><li>Phố cổ là không gian sống động của lịch sử, nghề truyền thống.</li><li>Bảo tồn phố cổ giúp phát triển du lịch và giữ gìn bản sắc.</li></ul>',
      ],
      [
        'Sai — bảo vệ phố cổ là cần thiết, không phải "tốn tiền vô ích". Đáp án đúng là <b>là di sản kiến trúc và văn hoá độc đáo</b>.',
        'Đúng — cần bảo vệ phố cổ vì <b>là di sản kiến trúc và văn hoá độc đáo</b>.',
        'Sai — bảo vệ phố cổ không nhằm cản trở đô thị hoá mà để hài hoà phát triển. Đáp án đúng là <b>là di sản kiến trúc và văn hoá độc đáo</b>.',
        'Sai — bảo vệ phố cổ rất cần thiết. Đáp án đúng là <b>là di sản kiến trúc và văn hoá độc đáo</b>.',
      ]
    ),
    Q('Cách giới thiệu Hà Nội cho bạn bè quốc tế?', ['Chỉ đưa đi mua sắm', 'Đưa đi tham quan di tích, giới thiệu ẩm thực — văn hoá', 'Không cần giới thiệu', 'Chỉ đưa đi ăn fast food'], 1, 'Giới thiệu di sản và ẩm thực Hà Nội cho khách.',
      [
        'Cách hay để giới thiệu Hà Nội cho bạn bè quốc tế là <b>đưa đi tham quan di tích, giới thiệu ẩm thực và văn hoá</b>.',
        '<ul><li>Như Văn Miếu, Hoàng thành, Hồ Gươm, phố cổ, phở, bún chả...</li><li>Đây là cách lan toả bản sắc và niềm tự hào về Thủ đô.</li></ul>',
      ],
      [
        'Sai — không nên chỉ đưa đi mua sắm. Đáp án đúng là <b>đưa đi tham quan di tích, giới thiệu ẩm thực — văn hoá</b>.',
        'Đúng — nên <b>đưa đi tham quan di tích, giới thiệu ẩm thực — văn hoá</b>.',
        'Sai — nên chủ động giới thiệu Hà Nội. Đáp án đúng là <b>đưa đi tham quan di tích, giới thiệu ẩm thực — văn hoá</b>.',
        'Sai — nên giới thiệu ẩm thực Hà Nội thay vì fast food. Đáp án đúng là <b>đưa đi tham quan di tích, giới thiệu ẩm thực — văn hoá</b>.',
      ]
    ),
  ]),

  M(34, 'Tổng kết — Hà Nội xưa và nay', [
    Q('Hà Nội có lịch sử trên?', ['500 năm', '100 năm', '200 năm', '1000 năm (từ 1010)'], 3, 'Hà Nội — Thăng Long có lịch sử trên 1000 năm.',
      [
        '<b>Hà Nội — Thăng Long</b> có lịch sử trên <b>1000 năm</b>, tính từ khi Lý Thái Tổ dời đô (năm <code>1010</code>).',
        '<ul><li>Năm 2010 là dịp Đại lễ kỉ niệm 1000 năm Thăng Long — Hà Nội.</li><li>Là một trong những thủ đô lâu đời của khu vực.</li></ul>',
      ],
      [
        'Sai — Hà Nội cổ hơn 500 năm nhiều. Đáp án đúng là <b>1000 năm (từ 1010)</b>.',
        'Sai — không phải chỉ 100 năm. Đáp án đúng là <b>1000 năm (từ 1010)</b>.',
        'Sai — không phải 200 năm. Đáp án đúng là <b>1000 năm (từ 1010)</b>.',
        'Đúng — Hà Nội có lịch sử trên <b>1000 năm (từ 1010)</b>.',
      ]
    ),
    Q('Hà Nội là thủ đô từ năm?', ['1010 (Thăng Long) và 1945 (CHXHCN)', '1000', '2000', '500'], 0, 'Thăng Long là thủ đô từ 1010 và HN thủ đô CHXHCN VN từ 1945.',
      [
        'Hà Nội là thủ đô từ năm <code>1010</code> (Thăng Long, thời Lý) và là thủ đô của nước Việt Nam độc lập từ năm <code>1945</code>.',
        '<ul><li>Trải qua nhiều triều đại, Thăng Long — Hà Nội giữ vai trò trung tâm.</li><li>Sau 1945, Hà Nội là thủ đô của nước Việt Nam Dân chủ Cộng hoà (nay là CHXHCN Việt Nam).</li></ul>',
      ],
      [
        'Đúng — Hà Nội là thủ đô từ <b>1010 (Thăng Long) và 1945 (CHXHCN)</b>.',
        'Sai — năm 1000 không phải mốc đúng. Đáp án đúng là <b>1010 (Thăng Long) và 1945 (CHXHCN)</b>.',
        'Sai — năm 2000 không phải mốc đúng. Đáp án đúng là <b>1010 (Thăng Long) và 1945 (CHXHCN)</b>.',
        'Sai — năm 500 không phải mốc đúng. Đáp án đúng là <b>1010 (Thăng Long) và 1945 (CHXHCN)</b>.',
      ]
    ),
    Q('Di sản UNESCO của Hà Nội?', ['Vịnh Hạ Long', 'Cố đô Huế', 'Phố cổ Hội An', 'Hoàng thành Thăng Long, bia tiến sĩ Văn Miếu, Hội Gióng'], 3, 'HN có 3 di sản UNESCO chính: HTTL, bia VM, Hội Gióng.',
      [
        'Hà Nội có các di sản được UNESCO ghi danh: <b>Hoàng thành Thăng Long</b> (di sản văn hoá thế giới), <b>bia Tiến sĩ Văn Miếu</b> (di sản tư liệu) và <b>Hội Gióng</b> (di sản phi vật thể).',
        '<ul><li>Vịnh Hạ Long ở Quảng Ninh; Cố đô Huế ở Thừa Thiên Huế; Hội An ở Quảng Nam.</li></ul>',
      ],
      [
        'Sai — Vịnh Hạ Long ở Quảng Ninh. Đáp án đúng là <b>Hoàng thành Thăng Long, bia tiến sĩ Văn Miếu, Hội Gióng</b>.',
        'Sai — Cố đô Huế ở Thừa Thiên Huế. Đáp án đúng là <b>Hoàng thành Thăng Long, bia tiến sĩ Văn Miếu, Hội Gióng</b>.',
        'Sai — Phố cổ Hội An ở Quảng Nam. Đáp án đúng là <b>Hoàng thành Thăng Long, bia tiến sĩ Văn Miếu, Hội Gióng</b>.',
        'Đúng — di sản UNESCO của Hà Nội gồm <b>Hoàng thành Thăng Long, bia tiến sĩ Văn Miếu, Hội Gióng</b>.',
      ]
    ),
    Q('Hà Nội được UNESCO trao danh hiệu?', ['Thủ đô tài chính', 'Cảng biển lớn', 'Thành phố công nghiệp', 'Thành phố vì hoà bình (1999)'], 3, 'UNESCO trao "Thành phố vì hoà bình" năm 1999.',
      [
        'Năm <code>1999</code>, Hà Nội được UNESCO trao danh hiệu <b>"Thành phố vì hoà bình"</b>.',
        '<ul><li>Ghi nhận nỗ lực vì hoà bình, đoàn kết và phát triển bền vững.</li><li>Là niềm tự hào của Thủ đô và cả nước.</li></ul>',
      ],
      [
        'Sai — Hà Nội không được trao danh hiệu "thủ đô tài chính". Đáp án đúng là <b>thành phố vì hoà bình (1999)</b>.',
        'Sai — Hà Nội không phải cảng biển. Đáp án đúng là <b>thành phố vì hoà bình (1999)</b>.',
        'Sai — đây không phải danh hiệu UNESCO trao. Đáp án đúng là <b>thành phố vì hoà bình (1999)</b>.',
        'Đúng — Hà Nội được UNESCO trao danh hiệu <b>"Thành phố vì hoà bình" (1999)</b>.',
      ]
    ),
    Q('Bản sắc người Hà Nội?', ['Thanh lịch, văn minh', 'Phóng khoáng, ồn ào', 'Lạnh lùng', 'Thô lỗ'], 0, 'Thanh lịch — văn minh là nét đặc trưng của người Hà Nội.',
      [
        'Bản sắc của người Hà Nội là <b>thanh lịch, văn minh</b> — nét đẹp được gìn giữ qua nhiều thế hệ.',
        '<ul><li>Thể hiện qua lời ăn tiếng nói, cách ứng xử nhã nhặn.</li><li>"Người Tràng An" là cách gọi đầy tự hào về người Hà Nội.</li></ul>',
      ],
      [
        'Đúng — bản sắc người Hà Nội là <b>thanh lịch, văn minh</b>.',
        'Sai — "phóng khoáng, ồn ào" không phải bản sắc người Hà Nội. Đáp án đúng là <b>thanh lịch, văn minh</b>.',
        'Sai — "lạnh lùng" không phải nét đặc trưng. Đáp án đúng là <b>thanh lịch, văn minh</b>.',
        'Sai — người Hà Nội thanh lịch, không thô lỗ. Đáp án đúng là <b>thanh lịch, văn minh</b>.',
      ]
    ),
  ]),

  M(35, 'Ôn tập cuối năm', [
    Q('Lý Thái Tổ dời đô năm?', ['1010', '1789', '1428', '938'], 0, 'Năm 1010 — dời đô về Đại La, đổi tên Thăng Long.',
      [
        '<b>Năm 1010</b>, Lý Thái Tổ dời đô từ Hoa Lư về Đại La và đổi tên thành Thăng Long.',
        '<ul><li>Đây là mốc khởi đầu của lịch sử nghìn năm Thăng Long — Hà Nội.</li></ul>',
      ],
      [
        'Đúng — Lý Thái Tổ dời đô năm <b>1010</b>.',
        'Sai — 1789 là chiến thắng Ngọc Hồi — Đống Đa. Đáp án đúng là <b>1010</b>.',
        'Sai — 1428 là năm Lê Lợi lên ngôi. Đáp án đúng là <b>1010</b>.',
        'Sai — 938 là chiến thắng Bạch Đằng của Ngô Quyền. Đáp án đúng là <b>1010</b>.',
      ]
    ),
    Q('Văn Miếu xây thời?', ['Lý (1070)', 'Nguyễn', 'Trần (1230)', 'Lê sơ (1428)'], 0, 'Lý Thánh Tông xây 1070.',
      [
        '<b>Văn Miếu</b> được xây thời <b>Lý</b> (năm <code>1070</code>), do vua Lý Thánh Tông cho dựng để thờ Khổng Tử.',
        '<ul><li>Cùng với Quốc Tử Giám (1076), đây là trung tâm giáo dục Nho học đầu tiên.</li></ul>',
      ],
      [
        'Đúng — Văn Miếu xây thời <b>Lý (1070)</b>.',
        'Sai — Văn Miếu không xây thời Nguyễn (chỉ Khuê Văn Các). Đáp án đúng là <b>Lý (1070)</b>.',
        'Sai — Văn Miếu xây thời Lý, không phải Trần. Đáp án đúng là <b>Lý (1070)</b>.',
        'Sai — Văn Miếu có trước thời Lê sơ. Đáp án đúng là <b>Lý (1070)</b>.',
      ]
    ),
    Q('Hội Gióng tổ chức ở?', ['Bắc Ninh', 'Phù Đổng (Gia Lâm) và Sóc Sơn', 'Cố đô Huế', 'Hội An'], 1, 'Hội Gióng tổ chức ở Phù Đổng và Sóc Sơn.',
      [
        '<b>Hội Gióng</b> được tổ chức ở <b>đền Phù Đổng (Gia Lâm)</b> và <b>đền Sóc (Sóc Sơn)</b>.',
        '<ul><li>Đây là hai trung tâm hội Gióng tiêu biểu nhất.</li><li>Hội Gióng được UNESCO ghi danh năm 2010.</li></ul>',
      ],
      [
        'Sai — hội Gióng không tổ chức ở Bắc Ninh. Đáp án đúng là <b>Phù Đổng (Gia Lâm) và Sóc Sơn</b>.',
        'Đúng — Hội Gióng tổ chức ở <b>Phù Đổng (Gia Lâm) và Sóc Sơn</b>.',
        'Sai — hội Gióng không ở Huế. Đáp án đúng là <b>Phù Đổng (Gia Lâm) và Sóc Sơn</b>.',
        'Sai — hội Gióng không ở Hội An. Đáp án đúng là <b>Phù Đổng (Gia Lâm) và Sóc Sơn</b>.',
      ]
    ),
    Q('Bát Tràng nổi tiếng?', ['Đúc đồng', 'Dệt lụa tơ tằm', 'Tre đan', 'Gốm sứ'], 3, 'Bát Tràng — làng gốm cổ.',
      [
        '<b>Bát Tràng</b> (huyện Gia Lâm) là làng nghề <b>gốm sứ</b> cổ truyền nổi tiếng của Hà Nội.',
        '<ul><li>Đúc đồng là nghề Ngũ Xã, dệt lụa là Vạn Phúc, tre đan là Phú Vinh.</li></ul>',
      ],
      [
        'Sai — đúc đồng là nghề Ngũ Xã. Đáp án đúng là <b>gốm sứ</b>.',
        'Sai — dệt lụa là nghề Vạn Phúc. Đáp án đúng là <b>gốm sứ</b>.',
        'Sai — tre đan là nghề Phú Vinh. Đáp án đúng là <b>gốm sứ</b>.',
        'Đúng — Bát Tràng nổi tiếng với <b>gốm sứ</b>.',
      ]
    ),
    Q('Phở Hà Nội đặc trưng?', ['Cay nồng', 'Mặn chát', 'Nước đục đặc', 'Nước dùng trong, bánh phở mỏng, thanh'], 3, 'Phở HN nổi tiếng nước dùng trong và thanh.',
      [
        '<b>Phở Hà Nội</b> đặc trưng với <b>nước dùng trong, bánh phở mỏng và vị thanh</b>.',
        '<ul><li>Nước dùng ninh từ xương với gừng, hành nướng, quế hồi.</li><li>Là món ăn biểu tượng của ẩm thực Thủ đô.</li></ul>',
      ],
      [
        'Sai — phở Hà Nội không cay nồng. Đáp án đúng là <b>nước dùng trong, bánh phở mỏng, thanh</b>.',
        'Sai — phở Hà Nội không mặn chát. Đáp án đúng là <b>nước dùng trong, bánh phở mỏng, thanh</b>.',
        'Sai — phở Hà Nội nước trong, không đục đặc. Đáp án đúng là <b>nước dùng trong, bánh phở mỏng, thanh</b>.',
        'Đúng — phở Hà Nội đặc trưng với <b>nước dùng trong, bánh phở mỏng, thanh</b>.',
      ]
    ),
  ]),
  // ========== TUẦN 36 — TỔNG KẾT NĂM HỌC ==========
  M(36, 'Kết thúc GD Địa phương 7 — Tình yêu quê hương nuôi dưỡng tâm hồn', [
    Q('Vua Lý Thái Tổ dời đô từ Hoa Lư ra Đại La và đổi tên thành Thăng Long vào năm nào?',
      ['Năm 938', 'Năm 1010', 'Năm 1288', 'Năm 1789'],
      1,
      'Năm 1010, Lý Thái Tổ ban Chiếu dời đô, dời từ Hoa Lư ra Đại La và đặt tên là Thăng Long.',
      ['Mốc <b>1010</b> là khởi đầu của Hà Nội với tư cách kinh đô — cũng là lí do năm 2010 Thủ đô kỉ niệm <i>1000 năm Thăng Long – Hà Nội</i>.',
       'Bốn mốc lớn của Thăng Long – Hà Nội em đã học:<ul><li><b>1010</b> — Lý Thái Tổ dời đô, đặt tên Thăng Long ("rồng bay lên")</li><li><b>1076</b> — lập Quốc Tử Giám, trường đại học đầu tiên</li><li><b>1288</b> — chiến thắng Bạch Đằng, Thăng Long ba lần bị chiếm rồi giải phóng</li><li><b>1789</b> — Quang Trung đại phá quân Thanh ở Ngọc Hồi – Đống Đa</li></ul>',
       'Lí do dời đô nêu trong <i>Chiếu dời đô</i>: Đại La ở trung tâm đất nước, đất rộng mà bằng phẳng, muôn vật phong phú — thuận cho việc phát triển lâu dài, khác với Hoa Lư hiểm trở chỉ hợp phòng thủ.'],
      ['Sai — năm 938 là chiến thắng Bạch Đằng của Ngô Quyền.',
       'Đúng — năm 1010 Lý Thái Tổ dời đô và đặt tên Thăng Long.',
       'Sai — 1288 là chiến thắng Bạch Đằng thời Trần.',
       'Sai — 1789 là chiến thắng Ngọc Hồi – Đống Đa của vua Quang Trung.']),
    Q('Di tích nào của Hà Nội đã được UNESCO công nhận là Di sản văn hoá thế giới?',
      ['Chùa Một Cột', 'Đền Ngọc Sơn', 'Chợ Đồng Xuân', 'Khu trung tâm Hoàng thành Thăng Long'],
      3,
      'Khu trung tâm Hoàng thành Thăng Long được UNESCO ghi danh là Di sản văn hoá thế giới năm 2010.',
      ['Hoàng thành Thăng Long được ghi danh năm <b>2010</b>, đúng dịp Đại lễ 1000 năm Thăng Long – Hà Nội.',
       'Ba lí do UNESCO đưa ra:<ul><li><b>Chiều dài lịch sử liên tục</b> — hơn 13 thế kỉ là trung tâm quyền lực, qua các triều Lý, Trần, Lê, Nguyễn</li><li><b>Tầng văn hoá chồng xếp</b> — khảo cổ tìm thấy dấu tích nhiều thời đại nằm chồng lên nhau tại cùng một chỗ</li><li><b>Giao thoa văn hoá</b> — kết hợp ảnh hưởng khu vực với bản sắc Việt</li></ul>',
       'Các di tích còn lại đều rất quý (Chùa Một Cột, Văn Miếu, đền Ngọc Sơn) nhưng là <i>di tích quốc gia đặc biệt</i>, không phải Di sản thế giới.'],
      ['Sai — Chùa Một Cột là di tích quốc gia, chưa phải Di sản thế giới.',
       'Sai — đền Ngọc Sơn thuộc quần thể di tích quốc gia đặc biệt hồ Hoàn Kiếm.',
       'Sai — chợ Đồng Xuân là công trình thương mại lịch sử, không phải di sản UNESCO.',
       'Đúng — Khu trung tâm Hoàng thành Thăng Long được UNESCO ghi danh năm 2010.']),
    Q('Văn Miếu – Quốc Tử Giám có giá trị tiêu biểu nào?',
      ['Là chợ lớn nhất kinh thành Thăng Long xưa',
       'Là thành luỹ quân sự bảo vệ kinh đô',
       'Là trường đại học đầu tiên của Việt Nam, nơi lưu giữ 82 bia tiến sĩ',
       'Là cung điện nơi vua ở và làm việc'],
      2,
      'Quốc Tử Giám lập năm 1076 là trường đại học đầu tiên; nơi đây còn 82 bia tiến sĩ đặt trên lưng rùa đá.',
      ['Văn Miếu (lập 1070) thờ Khổng Tử và các bậc hiền tài; <b>Quốc Tử Giám</b> (lập 1076) là <i>trường đại học đầu tiên</i> của nước ta.',
       '<b>82 bia tiến sĩ</b> khắc tên 1307 người đỗ trong 82 khoa thi từ 1442 đến 1779. Năm 2010 UNESCO ghi danh các bia này là <i>Di sản tư liệu thế giới</i>.',
       'Ý nghĩa sâu xa: khắc tên người đỗ lên đá là cách cha ông <b>tôn vinh học vấn</b> và nhắc người đỗ phải sống xứng với tên mình — một truyền thống hiếu học kéo dài gần mười thế kỉ.'],
      ['Sai — chợ lớn của Thăng Long xưa nằm ở khu phố cổ, không phải Văn Miếu.',
       'Sai — công trình phòng thủ là thành Thăng Long, không phải Văn Miếu.',
       'Đúng — Quốc Tử Giám là trường đại học đầu tiên, nơi lưu giữ 82 bia tiến sĩ.',
       'Sai — nơi vua ở và làm việc là Hoàng thành.']),
    Q('Chỉ số AQI dùng để đo điều gì?',
      ['Mật độ giao thông trên đường phố', 'Chất lượng không khí',
       'Độ sâu của sông Hồng', 'Số lượng khách du lịch đến Hà Nội'],
      1,
      'AQI (Air Quality Index) là chỉ số chất lượng không khí; chỉ số càng cao thì không khí càng ô nhiễm.',
      ['<b>AQI</b> = <i>Air Quality Index</i> — chỉ số chất lượng không khí, quy đổi nồng độ các chất ô nhiễm (bụi mịn PM2.5, PM10, NO₂, SO₂, CO, O₃) về một con số dễ hiểu.',
       'Thang màu quen thuộc:<ul><li><b>0–50</b> xanh lá — tốt</li><li><b>51–100</b> vàng — trung bình</li><li><b>101–150</b> cam — kém, nhóm nhạy cảm nên hạn chế ra ngoài</li><li><b>151–200</b> đỏ — xấu</li><li><b>&gt;200</b> tím, nâu — rất xấu và nguy hại</li></ul>',
       'Hà Nội thường có AQI cao vào <i>mùa đông và sáng sớm</i>, do nghịch nhiệt giữ bụi sát mặt đất. Ngày AQI cao: đeo khẩu trang lọc bụi mịn, giảm vận động mạnh ngoài trời.'],
      ['Sai — mật độ giao thông là một nguyên nhân gây ô nhiễm, không phải thứ AQI đo.',
       'Đúng — AQI là chỉ số chất lượng không khí.',
       'Sai — độ sâu sông là chỉ số thuỷ văn, không liên quan đến AQI.',
       'Sai — lượng khách du lịch là số liệu kinh tế, không phải AQI.']),
    Q('Làng nghề nào của Hà Nội nổi tiếng với nghề gốm?',
      ['Bát Tràng', 'Vạn Phúc', 'Nhật Tân', 'Chuyên Mỹ'],
      0,
      'Bát Tràng (huyện Gia Lâm) là làng gốm cổ truyền nổi tiếng hơn 500 năm của Hà Nội.',
      ['Hà Nội là đất <b>trăm nghề</b>. Bốn làng nghề tiêu biểu em đã học, mỗi làng một sản phẩm khác hẳn nhau:',
       '<ul><li><b>Bát Tràng</b> (Gia Lâm) — <b>gốm sứ</b>, hơn 500 năm tuổi</li><li><b>Vạn Phúc</b> (Hà Đông) — <b>lụa tơ tằm</b></li><li><b>Nhật Tân</b> (Tây Hồ) — <b>hoa đào</b> chơi Tết</li><li><b>Chuyên Mỹ</b> (Phú Xuyên) — <b>khảm trai</b></li></ul>',
       'Làng nghề không chỉ tạo việc làm mà còn là <i>bảo tàng sống</i>: kĩ thuật truyền từ đời này sang đời khác. Giữ làng nghề cũng là giữ một phần bản sắc Thủ đô.'],
      ['Đúng — Bát Tràng là làng gốm cổ truyền nổi tiếng của Hà Nội.',
       'Sai — Vạn Phúc nổi tiếng với nghề dệt lụa.',
       'Sai — Nhật Tân nổi tiếng với nghề trồng hoa đào.',
       'Sai — Chuyên Mỹ nổi tiếng với nghề khảm trai.']),
    Q('Trước mâu thuẫn giữa bảo tồn phố cổ và phát triển đô thị hiện đại, cách nhìn hợp lí nhất là gì?',
      ['Phá bỏ hết nhà cổ để xây cao ốc cho hiện đại',
       'Giữ nguyên mọi thứ, cấm mọi hoạt động xây dựng và kinh doanh',
       'Chuyển toàn bộ dân phố cổ đi nơi khác, biến khu phố thành bảo tàng đóng cửa',
       'Bảo tồn kiến trúc và nếp sống đặc trưng, đồng thời cải thiện hạ tầng để người dân sống tốt hơn'],
      3,
      'Bảo tồn và phát triển cần song hành: giữ giá trị di sản nhưng vẫn nâng chất lượng sống cho cư dân.',
      ['Đây là bài toán khó nhất của mọi đô thị cổ trên thế giới, và không có lời giải cực đoan nào đúng.',
       'Vì sao hai cực đều sai:<ul><li><b>Phá hết</b> ⇒ mất bản sắc nghìn năm, không gì mua lại được</li><li><b>Đóng băng hoàn toàn</b> ⇒ nhà xuống cấp, người dân sống chật chội, thiếu nước sạch và phòng cháy; di sản "chết" vì không còn ai sống trong đó</li></ul>',
       'Hướng đi được chọn: giữ <b>kiến trúc mặt phố và nếp sinh hoạt</b>, đồng thời nâng cấp <i>hạ tầng ngầm, phòng cháy, vệ sinh</i>; phát triển du lịch để chính di sản nuôi lại việc bảo tồn. Phố đi bộ quanh hồ Hoàn Kiếm là một ví dụ.'],
      ['Sai — phá bỏ di sản là mất mát không thể khôi phục.',
       'Sai — đóng băng hoàn toàn khiến nhà xuống cấp và người dân sống khổ.',
       'Sai — di sản sống nhờ cộng đồng cư dân; đưa dân đi là biến phố cổ thành nơi vắng hồn.',
       'Đúng — bảo tồn giá trị đặc trưng song song với cải thiện hạ tầng và đời sống.']),
  ]),
];

export const S7GDDP_SCENARIOS = indexBy(S7GDDP_WEEKS);
