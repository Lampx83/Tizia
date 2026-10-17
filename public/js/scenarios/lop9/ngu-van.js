// ============================================================
// Lớp 9 · NGỮ VĂN — 35 tuần (HK1: 1–18 · HK2: 19–35)
// Bám CT GDPT 2018 — năm thi vào lớp 10.
// HK1: thơ hiện đại VN giai đoạn 1945–1975 + truyện ngắn hiện đại.
// HK2: thơ trữ tình sau 1975 + nghị luận xã hội + văn bản nhật dụng.
// ID prefix: "S9NV-wNN-quiz".
// ============================================================
import { Q, W, indexBy } from './_helper.js';

const M = (n, title, qs, opts) => W('S9NV', 'ngu-van', n, title, qs, opts);

export const S9NV_WEEKS = [
  // ──────────────── HK1 ────────────────
  M(1, 'Đồng chí — Chính Hữu', [
    Q('"Đồng chí" của Chính Hữu sáng tác năm nào?', ['1948', '1954', '1965', '1947'], 0, 'Bài thơ ra đời năm 1948, sau chiến dịch Việt Bắc thu đông 1947.', [
      '<b>"Đồng chí"</b> là một trong những bài thơ tiêu biểu nhất viết về người lính thời <i>kháng chiến chống Pháp</i>, được học ở đầu lớp 9 (bộ Kết nối tri thức, chủ điểm thơ hiện đại 1945–1975).',
      'Hoàn cảnh sáng tác gắn chặt với trải nghiệm thật của tác giả:',
      '<ul><li><b>Chính Hữu</b> (tên thật Trần Đình Đắc) cùng đồng đội tham gia chiến dịch <b>Việt Bắc thu đông 1947</b>.</li><li>Năm <code>1948</code>, sau chiến dịch, ông viết bài thơ trong những ngày ốm đau, gian khổ ở rừng Việt Bắc.</li></ul>',
      'Ghi nhớ mốc thời gian giúp phân biệt "Đồng chí" (chống Pháp) với các bài thơ chống Mỹ học sau như "Bài thơ về tiểu đội xe không kính".',
    ], [
      'Đúng — 1948, ngay sau chiến dịch Việt Bắc thu đông 1947, khi Chính Hữu cùng đồng đội trải qua gian khổ kháng chiến chống Pháp.',
      'Sai — 1954 là năm chiến thắng Điện Biên Phủ và ký Hiệp định Genève, không phải năm ra đời bài thơ.',
      'Sai — 1965 là giai đoạn kháng chiến chống Mỹ, muộn hơn nhiều so với "Đồng chí".',
      'Sai — 1947 là năm diễn ra chiến dịch Việt Bắc; bài thơ viết ngay sau đó, năm 1948.',
    ]),
    Q('Bài thơ "Đồng chí" thuộc thể thơ?', ['Song thất lục bát', 'Thất ngôn bát cú', 'Tự do', 'Lục bát'], 2, 'Chính Hữu dùng thể tự do, dòng dài ngắn linh hoạt để phù hợp cảm xúc.', [
      '<b>Thơ tự do</b> là thể thơ hiện đại không gò bó số tiếng mỗi dòng, số dòng mỗi khổ hay niêm luật như thơ Đường.',
      'Dấu hiệu nhận diện thơ tự do ở "Đồng chí":',
      '<ul><li>Dòng dài ngắn khác nhau, có dòng 7–8 tiếng, có dòng chỉ <code>2 tiếng</code> ("Đồng chí!").</li><li>Vần và nhịp linh hoạt, đi theo <i>mạch cảm xúc</i> chứ không theo khuôn cố định.</li></ul>',
      'Sự "phá khuôn" này giúp nhà thơ diễn tả tự nhiên tình cảm đồng đội mộc mạc, chân thật của người lính nông dân.',
    ], [
      'Sai — song thất lục bát có cặp 7-7 rồi 6-8, dùng trong ngâm khúc; "Đồng chí" không theo khuôn này.',
      'Sai — thất ngôn bát cú là thơ Đường luật 8 câu 7 chữ; "Đồng chí" có dòng dài ngắn khác nhau.',
      'Đúng — thể tự do với số chữ mỗi dòng linh hoạt, kể cả câu chỉ 2 tiếng "Đồng chí!", phù hợp mạch cảm xúc.',
      'Sai — lục bát là cặp 6-8 đều đặn; "Đồng chí" không gò vào vần luật lục bát.',
    ]),
    Q('Hình ảnh "Đầu súng trăng treo" có ý nghĩa?', ['Vẻ đẹp lãng mạn và hiện thực hòa quyện trong người lính', 'Nỗi nhớ quê hương', 'Sự khốc liệt của chiến tranh', 'Sự cô đơn của người lính'], 0, 'Đây là hình ảnh biểu tượng: súng (hiện thực, chiến đấu) + trăng (lãng mạn) ⇒ vẻ đẹp tâm hồn người lính.', [
      '<b>"Đầu súng trăng treo"</b> là câu kết, cũng là <i>nhãn tự</i> (chữ thần) của bài thơ — hình ảnh đẹp nhất khắc họa người lính trong đêm phục kích chờ giặc.',
      'Đây là <b>hình ảnh biểu tượng</b> ghép từ hai vế tưởng đối lập mà hòa hợp:',
      '<ul><li><code>Súng</code> — hiện thực chiến tranh, nhiệm vụ chiến đấu, chất <b>chiến sĩ</b>.</li><li><code>Trăng</code> — vẻ đẹp thiên nhiên, lãng mạn, bay bổng, chất <b>thi sĩ</b>.</li></ul>',
      'Súng và trăng, gần và xa, chiến tranh và hòa bình kết tinh trong một hình ảnh — vẻ đẹp tâm hồn người lính cách mạng Việt Nam.',
    ], [
      'Đúng — súng (hiện thực, chiến đấu) hòa với trăng (lãng mạn, thi vị) tạo biểu tượng chất chiến sĩ và thi sĩ trong người lính.',
      'Sai — nỗi nhớ quê hương được gợi ở câu "giếng nước gốc đa…", không phải hình ảnh này.',
      'Sai — sự khốc liệt thể hiện ở "áo rách vai", "chân không giày", còn đây là hình ảnh đẹp, lãng mạn.',
      'Sai — bài thơ ngợi ca tình đồng đội gắn bó, không phải sự cô đơn.',
    ]),
    Q('Hai câu "Quê hương anh nước mặn đồng chua / Làng tôi nghèo đất cày lên sỏi đá" cho thấy?', ['Khung cảnh thiên nhiên', 'Sự xa cách quê hương', 'Sự giàu có của quê', 'Hai người lính cùng xuất thân nông dân nghèo'], 3, 'Cùng xuất thân nông dân nghèo từ những vùng khác nhau ⇒ cơ sở của tình đồng chí.', [
      'Bảy câu đầu bài "Đồng chí" lý giải <b>cội nguồn của tình đồng chí</b>. Hai câu mở đầu giới thiệu <i>quê hương, xuất thân</i> của hai người lính.',
      'Tác giả dùng hai <b>thành ngữ dân gian</b> tả vùng đất khó:',
      '<ul><li>"<code>nước mặn đồng chua</code>" — vùng đồng bằng ven biển nhiễm mặn, chua phèn.</li><li>"<code>đất cày lên sỏi đá</code>" — vùng trung du, miền núi khô cằn.</li></ul>',
      'Hai miền quê khác nhau nhưng đều <b>nghèo khó</b> ⇒ sự tương đồng về giai cấp (đều là nông dân) là cơ sở đầu tiên gắn kết họ thành đồng chí.',
    ], [
      'Sai — hai câu không nhằm tả cảnh mà nói về nguồn gốc xuất thân của người lính.',
      'Sai — không nói về sự xa cách mà nhấn mạnh điểm chung giữa hai người lính.',
      'Sai — "nước mặn đồng chua", "đất cày lên sỏi đá" là hình ảnh đất nghèo, không phải giàu có.',
      'Đúng — cả hai cùng là nông dân nghèo từ những miền quê khác nhau, đó là cơ sở đầu tiên của tình đồng chí.',
    ]),
    Q('"Đồng chí!" được tách thành 1 câu thơ riêng có tác dụng?', ['Phá vỡ nhịp thơ', 'Không có ý nghĩa đặc biệt', 'Nhấn mạnh sự xa lạ', 'Như tiếng gọi thiêng liêng, là bản lề kết tinh tình cảm'], 3, 'Câu thơ 2 tiếng làm bản lề: khép lại 7 câu lý giải, mở ra hình tượng người đồng chí.', [
      'Câu thơ thứ bảy <b>"Đồng chí!"</b> chỉ gồm <code>2 tiếng</code> kèm dấu chấm than, đứng tách riêng — một dụng ý nghệ thuật đặc sắc.',
      'Tác dụng của câu thơ đặc biệt này:',
      '<ul><li>Là <b>bản lề</b> (câu chuyển): khép lại 6 câu trên lý giải cơ sở, mở ra phần dưới ngợi ca biểu hiện của tình đồng chí.</li><li>Như một <b>tiếng gọi</b> thiêng liêng, dồn nén và kết tinh mọi cảm xúc.</li><li>Lời <i>phát hiện</i>, <i>khẳng định</i> một thứ tình cảm mới mẻ, cao đẹp của thời đại cách mạng.</li></ul>',
    ], [
      'Sai — câu thơ không phá vỡ mà tạo điểm nhấn, dồn nén cảm xúc đột ngột.',
      'Sai — đây là dụng ý nghệ thuật đặc sắc, không phải vô nghĩa.',
      'Sai — tiếng gọi này thể hiện sự gắn bó thiêng liêng, hoàn toàn trái ngược với xa lạ.',
      'Đúng — câu 2 tiếng làm bản lề: khép lại 7 câu lý giải cơ sở, mở ra phần ca ngợi tình đồng chí.',
    ]),
    Q('Cảm hứng chủ đạo của bài thơ?', ['Niềm vui chiến thắng', 'Tình đồng chí, đồng đội thiêng liêng', 'Tình yêu đôi lứa', 'Tình mẫu tử'], 1, 'Ngợi ca tình đồng chí — cơ sở của sức mạnh kháng chiến.', [
      '<b>Cảm hứng chủ đạo</b> là tình cảm, tư tưởng bao trùm và xuyên suốt tác phẩm.',
      'Cả bài "Đồng chí" tập trung ngợi ca <b>tình đồng chí, đồng đội</b> của những người lính:',
      '<ul><li>Cùng chung <i>cảnh ngộ</i> (nông dân nghèo), chung <i>lý tưởng</i> (đánh giặc cứu nước).</li><li>Sẻ chia gian khổ ("áo rách vai", "chân không giày", cùng cơn sốt rét).</li><li>Gắn bó keo sơn: "Thương nhau tay nắm lấy bàn tay".</li></ul>',
      'Tình đồng chí ấy chính là <b>cội nguồn sức mạnh</b> giúp người lính vượt qua mọi thiếu thốn của buổi đầu kháng chiến.',
    ], [
      'Sai — bài thơ viết về gian khổ và tình đồng đội, không phải niềm vui chiến thắng.',
      'Đúng — cả bài ngợi ca tình đồng chí, đồng đội keo sơn, cội nguồn sức mạnh kháng chiến.',
      'Sai — đây là tình cảm giữa những người lính, không phải tình yêu đôi lứa.',
      'Sai — tình mẫu tử không phải chủ đề của "Đồng chí".',
    ]),
  ]),

  M(2, 'Bài thơ về tiểu đội xe không kính — Phạm Tiến Duật', [
    Q('Tác phẩm "Bài thơ về tiểu đội xe không kính" trích từ tập?', ['Việt Bắc', 'Đất nước', 'Vầng trăng quầng lửa', 'Đầu súng trăng treo'], 2, 'Trích từ tập "Vầng trăng quầng lửa" (1970) của Phạm Tiến Duật.', [
      '<b>Phạm Tiến Duật</b> (1941–2007) là gương mặt tiêu biểu của thế hệ nhà thơ trẻ thời <i>kháng chiến chống Mỹ</i>, được mệnh danh là "con chim lửa của Trường Sơn".',
      'Xuất xứ bài thơ:',
      '<ul><li>Sáng tác năm <code>1969</code>, in trong tập <b>"Vầng trăng quầng lửa"</b> (1970).</li><li>Bài thơ nằm trong chùm thơ được giải Nhất cuộc thi thơ báo Văn nghệ năm 1969.</li></ul>',
      'Cần phân biệt với các tập thơ khác: "Việt Bắc" của <i>Tố Hữu</i>, "Đầu súng trăng treo" của <i>Chính Hữu</i>.',
    ], [
      'Sai — "Việt Bắc" là tập thơ nổi tiếng của Tố Hữu, không phải của Phạm Tiến Duật.',
      'Sai — "Đất nước" gợi tên trường ca của Nguyễn Khoa Điềm; không phải xuất xứ bài thơ này.',
      'Đúng — bài thơ trích từ tập "Vầng trăng quầng lửa" (1970) của Phạm Tiến Duật.',
      'Sai — "Đầu súng trăng treo" là tập thơ của Chính Hữu, dễ nhầm vì là câu kết của "Đồng chí".',
    ]),
    Q('Bài thơ viết về người lính ở chiến trường nào?', ['Chống Mỹ, đường Trường Sơn', 'Điện Biên Phủ', 'Chống Pháp', 'Biên giới Tây Nam'], 0, 'Viết về người lính lái xe tải trên đường Trường Sơn thời kháng chiến chống Mỹ.', [
      'Bài thơ gắn với một <b>không gian lịch sử</b> cụ thể: tuyến đường <b>Trường Sơn</b> huyền thoại thời kháng chiến chống Mỹ.',
      'Bối cảnh:',
      '<ul><li><i>Đường Trường Sơn</i> (đường mòn Hồ Chí Minh) là tuyến vận tải chiến lược chi viện cho miền Nam.</li><li>Mỹ ném bom dữ dội hòng cắt đứt tuyến đường ⇒ những chiếc xe vận tải hứng chịu "bom giật bom rung".</li></ul>',
      'Người lính lái xe trở thành <b>hình tượng trung tâm</b>, tiêu biểu cho thế hệ trẻ Việt Nam "Xẻ dọc Trường Sơn đi cứu nước".',
    ], [
      'Đúng — viết về người lính lái xe trên tuyến đường Trường Sơn thời kháng chiến chống Mỹ.',
      'Sai — Điện Biên Phủ thuộc kháng chiến chống Pháp (1954), không liên quan tiểu đội xe không kính.',
      'Sai — bài thơ thuộc giai đoạn chống Mỹ, không phải chống Pháp.',
      'Sai — chiến tranh biên giới Tây Nam diễn ra cuối thập niên 1970, không phải bối cảnh bài thơ.',
    ]),
    Q('Vì sao xe không có kính?', ['Tác giả tưởng tượng', 'Tiết kiệm vật liệu', 'Bom đạn chiến tranh làm vỡ', 'Vì cũ kỹ'], 2, '"Không có kính không phải vì xe không có kính / Bom giật bom rung kính vỡ đi rồi".', [
      'Hình ảnh <b>"xe không kính"</b> là một sáng tạo độc đáo, mang đậm chất hiện thực trần trụi của chiến trường.',
      'Tác giả tự "giải thích" ngay ở hai câu đầu bằng giọng văn xuôi, ngang tàng:',
      '<ul><li>"<code>Không có kính không phải vì xe không có kính</code>"</li><li>"<code>Bom giật, bom rung kính vỡ đi rồi</code>"</li></ul>',
      'Nguyên nhân là <b>bom đạn chiến tranh</b> ⇒ chi tiết có thật, không hề lãng mạn hóa, tô đậm sự khốc liệt của tuyến lửa Trường Sơn.',
    ], [
      'Sai — đây là chi tiết hiện thực có thật ở chiến trường, không phải tưởng tượng.',
      'Sai — không phải lý do tiết kiệm; nguyên nhân là bom đạn.',
      'Đúng — chính bài thơ nói rõ: "Bom giật bom rung kính vỡ đi rồi".',
      'Sai — không phải vì xe cũ mà do bom đạn chiến tranh làm vỡ kính.',
    ]),
    Q('Giọng điệu chủ đạo của bài thơ?', ['Trang nghiêm, cổ kính', 'Ngang tàng, sôi nổi, lạc quan', 'Bi tráng, thê lương', 'Trầm buồn, da diết'], 1, 'Giọng tự nhiên, ngang tàng, đậm chất lính trẻ — đặc trưng thơ Phạm Tiến Duật.', [
      '<b>Giọng điệu</b> là sắc thái tình cảm, thái độ của tác giả thể hiện qua cách dùng từ, ngắt nhịp.',
      'Bài thơ mang giọng điệu <b>ngang tàng, sôi nổi, trẻ trung, tinh nghịch</b> — rất riêng của thơ Phạm Tiến Duật:',
      '<ul><li>Lời thơ gần với <i>khẩu ngữ</i>, văn xuôi: "ừ thì có bụi", "ừ thì ướt áo".</li><li>Thái độ <b>bất chấp gian khổ</b>, biến khó khăn thành niềm vui: "Chưa cần rửa, phì phèo châm điếu thuốc".</li></ul>',
      'Giọng điệu ấy làm nổi bật tâm hồn lạc quan, yêu đời của người lính lái xe Trường Sơn.',
    ], [
      'Sai — giọng bài thơ trẻ trung, đời thường, không trang nghiêm cổ kính.',
      'Đúng — giọng ngang tàng, sôi nổi, lạc quan, đậm chất lính trẻ là nét đặc trưng của Phạm Tiến Duật.',
      'Sai — bài thơ tươi vui, hóm hỉnh, không bi tráng thê lương.',
      'Sai — không trầm buồn da diết; ngược lại rất phơi phới, tinh nghịch.',
    ]),
    Q('Câu thơ "Chỉ cần trong xe có một trái tim" thể hiện?', ['Ý chí giải phóng miền Nam, tình yêu Tổ quốc', 'Nỗi cô đơn', 'Sự hi sinh', 'Tình yêu đôi lứa'], 0, '"Trái tim" tượng trưng cho ý chí, lòng yêu nước, quyết tâm giải phóng miền Nam.', [
      'Câu thơ cuối <b>"Chỉ cần trong xe có một trái tim"</b> là điểm sáng kết tinh tư tưởng cả bài.',
      'Hình ảnh <b>"trái tim"</b> dùng phép <i>hoán dụ</i>:',
      '<ul><li>Tượng trưng cho <b>ý chí</b>, <b>lòng yêu nước</b> và quyết tâm <code>giải phóng miền Nam</code>, thống nhất đất nước.</li><li>Đối lập với loạt "không có" (không kính, không đèn, không mui) ở trên ⇒ vật chất có thể thiếu nhưng <i>tinh thần</i> luôn đủ đầy.</li></ul>',
      'Trái tim yêu nước chính là động lực giúp những chiếc xe tiến về phía trước.',
    ], [
      'Đúng — "trái tim" là hoán dụ chỉ ý chí, lòng yêu nước và quyết tâm giải phóng miền Nam.',
      'Sai — câu thơ thể hiện sức mạnh tinh thần, không phải nỗi cô đơn.',
      'Sai — không nói về sự hi sinh mà nói về động lực, ý chí của người lính.',
      'Sai — "trái tim" ở đây là lòng yêu nước, không phải tình yêu đôi lứa.',
    ]),
    Q('Hình ảnh "xe không kính" có ý nghĩa?', ['Là hình ảnh độc đáo, gắn với hiện thực khốc liệt và làm nổi bật vẻ đẹp người lính', 'Sự sáng tạo nghệ thuật', 'Sự lạc hậu', 'Sự nghèo nàn vật chất'], 0, 'Hình ảnh thực + biểu tượng, làm nổi bật bản lĩnh lái xe trong gian khổ.', [
      'Nhan đề và hình tượng <b>"xe không kính"</b> là phát hiện độc đáo của Phạm Tiến Duật, vừa <i>chân thực</i> vừa giàu <i>sức gợi</i>.',
      'Hai lớp ý nghĩa:',
      '<ul><li><b>Hiện thực:</b> phản ánh sự khốc liệt của chiến tranh — bom đạn làm xe biến dạng, hư hỏng.</li><li><b>Biểu tượng:</b> chiếc xe trần trụi làm nổi bật <b>tư thế ung dung</b>, bản lĩnh hiên ngang của người lính: "Ung dung buồng lái ta ngồi / Nhìn đất, nhìn trời, nhìn thẳng".</li></ul>',
      'Cái thiếu thốn của vật chất càng tô đậm vẻ đẹp tinh thần của con người.',
    ], [
      'Đúng — vừa là hình ảnh thực vừa là biểu tượng, làm nổi bật bản lĩnh hiên ngang của người lính lái xe.',
      'Sai — đây là cách nói chung chung; câu hỏi cần ý nghĩa gắn với hiện thực và vẻ đẹp người lính.',
      'Sai — không nhằm phản ánh sự lạc hậu mà tô đậm tinh thần người lính trong gian khổ.',
      'Sai — không nhấn mạnh nghèo nàn vật chất mà ca ngợi tư thế ung dung của người lính.',
    ]),
  ]),

  M(3, 'Đoàn thuyền đánh cá — Huy Cận', [
    Q('"Đoàn thuyền đánh cá" sáng tác năm nào?', ['1965', '1948', '1975', '1958'], 3, 'Sáng tác năm 1958, trong chuyến đi thực tế vùng biển Quảng Ninh.', [
      '<b>Huy Cận</b> (1919–2005) trước Cách mạng nổi tiếng với thơ buồn ("Lửa thiêng"); sau 1945, hồn thơ ông tươi vui, tràn đầy niềm tin yêu cuộc sống mới.',
      'Hoàn cảnh sáng tác:',
      '<ul><li>Năm <code>1958</code>, Huy Cận đi thực tế dài ngày ở vùng mỏ <b>Quảng Ninh</b> (Hòn Gai, Cẩm Phả).</li><li>Bài thơ in trong tập <b>"Trời mỗi ngày lại sáng"</b> (1958).</li></ul>',
      'Chuyến đi thực tế đã giúp nhà thơ "tìm lại" cảm hứng từ vẻ đẹp lao động của con người miền Bắc.',
    ], [
      'Sai — 1965 là giai đoạn chống Mỹ; bài thơ ra đời sớm hơn, thời kỳ xây dựng miền Bắc.',
      'Sai — 1948 là năm của "Đồng chí" và kháng chiến chống Pháp, không phải bài thơ này.',
      'Sai — 1975 là năm thống nhất đất nước, muộn hơn nhiều.',
      'Đúng — 1958, sau chuyến đi thực tế vùng biển Quảng Ninh (Hòn Gai, Cẩm Phả) của Huy Cận.',
    ]),
    Q('Bối cảnh xã hội của bài thơ?', ['Đất nước thống nhất', 'Miền Bắc xây dựng CNXH sau 1954', 'Kháng chiến chống Mỹ', 'Kháng chiến chống Pháp'], 1, 'Miền Bắc bước vào thời kỳ xây dựng CNXH, không khí lao động hào hứng.', [
      'Hiểu <b>bối cảnh xã hội</b> giúp cắt nghĩa cảm hứng <i>vui tươi, hào hùng</i> của bài thơ.',
      'Năm 1958, đất nước ta:',
      '<ul><li>Miền Bắc vừa hòa bình (sau 1954), bước vào thời kỳ <b>xây dựng chủ nghĩa xã hội</b>.</li><li>Nhân dân lao động trở thành <i>người làm chủ</i> đất nước, hăng say sản xuất.</li></ul>',
      'Không khí lao động phơi phới ấy chính là nguồn cảm hứng cho khúc tráng ca về người ngư dân làm chủ biển khơi.',
    ], [
      'Sai — đất nước chưa thống nhất năm 1958; đây mới là thời kỳ xây dựng miền Bắc.',
      'Đúng — miền Bắc sau 1954 bước vào xây dựng CNXH, khí thế lao động hào hứng, làm chủ cuộc đời.',
      'Sai — kháng chiến chống Mỹ bùng nổ ác liệt muộn hơn, từ giữa thập niên 1960.',
      'Sai — kháng chiến chống Pháp đã kết thúc năm 1954, trước khi bài thơ ra đời.',
    ]),
    Q('Hình ảnh "Mặt trời xuống biển như hòn lửa" sử dụng biện pháp tu từ?', ['Ẩn dụ (mặt trời = hòn lửa ngầm)', 'Hoán dụ', 'So sánh', 'Nhân hóa'], 2, 'So sánh mặt trời với hòn lửa.', [
      'Cần phân biệt rõ hai biện pháp dễ nhầm là <b>so sánh</b> và <b>ẩn dụ</b>:',
      '<ul><li><b>So sánh:</b> đối chiếu hai sự vật, <i>có</i> từ so sánh ("như", "là", "tựa", "bằng").</li><li><b>Ẩn dụ:</b> so sánh ngầm, <i>ẩn</i> đi vế được so sánh và từ so sánh.</li></ul>',
      'Câu "<code>Mặt trời xuống biển như hòn lửa</code>" có từ <b>"như"</b> nối hai vế (mặt trời — hòn lửa) ⇒ đây là phép <b>so sánh</b>, vẽ nên cảnh hoàng hôn rực rỡ trên biển.',
    ], [
      'Sai — có từ so sánh "như" nên là so sánh chứ không phải ẩn dụ (ẩn dụ giấu vế so sánh).',
      'Sai — hoán dụ lấy bộ phận, dấu hiệu để gọi tên; ở đây không phải vậy.',
      'Đúng — từ "như" cho thấy đây là phép so sánh: mặt trời được ví với hòn lửa.',
      'Sai — nhân hóa gán đặc điểm người cho vật; câu này chỉ so sánh hai sự vật.',
    ]),
    Q('Câu thơ "Thuyền ta lái gió với buồm trăng / Lướt giữa mây cao với biển bằng" thể hiện?', ['Vẻ kì vĩ, tráng lệ của thiên nhiên và tầm vóc con người', 'Sự cô đơn', 'Cảnh hoàng hôn', 'Khó khăn lao động'], 0, 'Bút pháp lãng mạn: con thuyền hòa vào vũ trụ, con người sánh ngang tầm vóc thiên nhiên.', [
      'Khổ thơ này thể hiện rõ <b>bút pháp lãng mạn</b> và cảm hứng <i>vũ trụ</i> đặc trưng của thơ Huy Cận.',
      'Phân tích hình ảnh:',
      '<ul><li>Con thuyền được <b>phóng đại</b>: "lái gió", "buồm trăng", lướt giữa "mây cao", "biển bằng".</li><li>Con thuyền nhỏ bé hòa nhập, <b>sánh ngang</b> tầm vóc thiên nhiên, vũ trụ bao la.</li></ul>',
      'Qua đó, con người lao động hiện lên kì vĩ, làm chủ biển trời — đúng tư thế của người làm chủ cuộc đời mới.',
    ], [
      'Đúng — bút pháp lãng mạn phóng đại: con thuyền hòa vào vũ trụ, con người sánh ngang tầm thiên nhiên.',
      'Sai — câu thơ tràn đầy khí thế hào hùng, không gợi sự cô đơn.',
      'Sai — đây là cảnh đánh cá giữa trời biển bao la, không tả riêng hoàng hôn.',
      'Sai — câu thơ tô đậm vẻ làm chủ, hứng khởi chứ không nhấn mạnh khó khăn.',
    ]),
    Q('Bài thơ ngợi ca?', ['Chiến tranh', 'Thiên nhiên và con người lao động trong tư thế làm chủ', 'Nỗi buồn ly biệt', 'Tình yêu đôi lứa'], 1, 'Khúc tráng ca về thiên nhiên và người lao động mới làm chủ biển khơi, làm chủ cuộc đời.', [
      '<b>Chủ đề</b> bài thơ là khúc tráng ca ca ngợi <b>thiên nhiên</b> và <b>con người lao động</b>.',
      'Hai mạch cảm hứng hòa quyện:',
      '<ul><li>Cảm hứng về <i>thiên nhiên</i>: biển cả giàu đẹp, lung linh (cá thu, cá song, "đêm thở: sao lùa nước Hạ Long").</li><li>Cảm hứng về <i>lao động</i>: người ngư dân hăng say, khỏe khoắn, làm chủ biển khơi.</li></ul>',
      'Bài thơ thể hiện niềm vui, niềm tự hào của nhà thơ trước đất nước và cuộc sống mới đang đổi thay.',
    ], [
      'Sai — bài thơ ca ngợi lao động hòa bình, không viết về chiến tranh.',
      'Đúng — khúc tráng ca về thiên nhiên giàu đẹp và người lao động làm chủ biển khơi, làm chủ cuộc đời.',
      'Sai — cảm hứng bài thơ vui tươi, phơi phới, không phải nỗi buồn ly biệt.',
      'Sai — đây không phải bài thơ tình yêu đôi lứa.',
    ]),
    Q('Bài thơ kết thúc bằng cảnh?', ['Mặt trời đứng bóng', 'Bão biển', 'Đêm tối', 'Bình minh, đoàn thuyền trở về'], 3, 'Khép vòng: hoàng hôn ra khơi → đêm đánh cá → bình minh trở về.', [
      'Bài thơ có <b>kết cấu vòng tròn</b>, theo trình tự thời gian một chuyến ra khơi.',
      'Mạch vận động của bài:',
      '<ul><li><b>Mở đầu:</b> hoàng hôn — đoàn thuyền <i>ra khơi</i> ("Mặt trời xuống biển như hòn lửa").</li><li><b>Giữa bài:</b> đêm — cảnh <i>đánh cá</i> trên biển.</li><li><b>Kết thúc:</b> bình minh — đoàn thuyền <i>trở về</i> ("Mặt trời đội biển nhô màu mới").</li></ul>',
      'Câu thơ "<code>Đoàn thuyền chạy đua cùng mặt trời</code>" khép lại bằng khí thế hân hoan, thắng lợi.',
    ], [
      'Sai — bài thơ khép lại lúc bình minh, không phải khi mặt trời đứng bóng (giữa trưa).',
      'Sai — không có cảnh bão biển ở phần kết.',
      'Sai — đêm tối là thời gian đánh cá ở giữa bài, không phải cảnh kết.',
      'Đúng — kết cấu vòng tròn: hoàng hôn ra khơi, đêm đánh cá, bình minh đoàn thuyền trở về.',
    ]),
  ]),

  M(4, 'Bếp lửa — Bằng Việt', [
    Q('"Bếp lửa" sáng tác trong hoàn cảnh nào?', ['Khi tác giả ở chiến trường', 'Khi tác giả ở quê', 'Khi tác giả đang du học ở Liên Xô năm 1963', 'Sau ngày thống nhất'], 2, 'Bằng Việt viết bài này năm 1963 khi đang du học ở Liên Xô, nhớ về bà.', [
      '<b>Bằng Việt</b> thuộc thế hệ nhà thơ trưởng thành trong kháng chiến chống Mỹ. "Bếp lửa" là một trong những bài thơ đầu tay nổi tiếng của ông.',
      'Hoàn cảnh sáng tác đặc biệt:',
      '<ul><li>Năm <code>1963</code>, khi tác giả đang là <b>sinh viên du học ngành luật ở Liên Xô</b>.</li><li>Ở nơi xa quê, nhớ về <b>bà</b> và <b>bếp lửa</b> tuổi thơ ⇒ cảm xúc bật thành thơ.</li></ul>',
      'Chính khoảng cách không gian (xa quê) khiến nỗi nhớ bà càng da diết, thấm thía.',
    ], [
      'Sai — Bằng Việt không viết bài này ở chiến trường mà ở nơi đất khách xa quê.',
      'Sai — nỗi nhớ bà mãnh liệt chính vì tác giả đang ở xa, không phải đang ở quê.',
      'Đúng — năm 1963, khi đang là sinh viên du học ở Liên Xô, tác giả nhớ về bà và bếp lửa quê nhà.',
      'Sai — bài thơ viết năm 1963, trước ngày thống nhất 1975 nhiều năm.',
    ]),
    Q('Nhân vật trung tâm của bài thơ?', ['Người em', 'Người bà', 'Người mẹ', 'Người bố'], 1, 'Hình tượng người bà — biểu tượng tình thương, sự tần tảo.', [
      'Hình tượng <b>người bà</b> là trung tâm, gắn liền với hình ảnh <b>bếp lửa</b> xuyên suốt bài thơ.',
      'Vẻ đẹp người bà:',
      '<ul><li><b>Tần tảo, giàu đức hi sinh</b>: một mình nuôi cháu suốt "tám năm ròng" khi bố mẹ đi công tác.</li><li><b>Giàu nghị lực</b>: dặn cháu giữ kín chuyện nhà bị giặc đốt để bố mẹ yên tâm công tác.</li><li>Là người <i>nhóm lửa</i>, giữ lửa, truyền lửa — ngọn lửa của tình yêu và niềm tin.</li></ul>',
      'Qua hình tượng bà, tác giả gửi gắm lòng biết ơn và tình yêu gia đình, quê hương.',
    ], [
      'Sai — bài thơ không xoay quanh người em.',
      'Đúng — hình tượng người bà tần tảo, giàu yêu thương là trung tâm, gắn liền với bếp lửa.',
      'Sai — người chăm sóc cháu bên bếp lửa là bà, không phải mẹ.',
      'Sai — người bố không phải nhân vật trung tâm của bài thơ.',
    ]),
    Q('Hình ảnh "bếp lửa" trong bài có ý nghĩa biểu tượng?', ['Cuộc sống nông thôn', 'Sự nóng nực', 'Tình bà cháu, gia đình, quê hương, đất nước', 'Khó khăn vật chất'], 2, 'Bếp lửa = ngọn lửa tình bà cháu + tình quê hương đất nước thiêng liêng.', [
      '<b>"Bếp lửa"</b> vừa là hình ảnh tả thực, vừa là <b>hình ảnh biểu tượng</b> giàu ý nghĩa — đó là <i>nhãn đề</i> và là mạch cảm xúc của cả bài.',
      'Các tầng nghĩa biểu tượng:',
      '<ul><li>Bếp lửa gắn với <b>bàn tay bà</b> ⇒ biểu tượng cho <b>tình bà cháu</b> ấm áp.</li><li>Bếp lửa là tổ ấm <b>gia đình</b>, là kỉ niệm <b>tuổi thơ</b>.</li><li>Rộng hơn: bếp lửa là cội nguồn <b>quê hương, đất nước</b> — nơi nâng đỡ con người suốt cuộc đời.</li></ul>',
      'Bà nhóm bếp lửa cũng là nhóm lên niềm tin, tình yêu thương trong lòng cháu.',
    ], [
      'Sai — chỉ dừng ở "cuộc sống nông thôn" là chưa thấy tầng nghĩa biểu tượng sâu xa.',
      'Sai — bếp lửa không tượng trưng cho sự nóng nực mà cho hơi ấm tình thân.',
      'Đúng — bếp lửa là biểu tượng tình bà cháu, tổ ấm gia đình và rộng ra là quê hương, đất nước.',
      'Sai — bếp lửa gợi sự ấm áp, nghĩa tình chứ không phải khó khăn vật chất.',
    ]),
    Q('Câu thơ "Một bếp lửa chờn vờn sương sớm / Một bếp lửa ấp iu nồng đượm" sử dụng phép?', ['Điệp ngữ', 'Hoán dụ', 'Câu hỏi tu từ', 'So sánh'], 0, 'Điệp ngữ "một bếp lửa" gợi hình ảnh đậm sâu trong ký ức.', [
      '<b>Điệp ngữ</b> (lặp từ ngữ) là biện pháp lặp lại một từ/cụm từ nhằm nhấn mạnh, tạo nhịp điệu và khơi gợi cảm xúc.',
      'Trong hai câu mở đầu:',
      '<ul><li>Cụm "<code>Một bếp lửa</code>" được lặp ở <b>đầu hai dòng thơ</b> ⇒ điệp ngữ (điệp đầu).</li><li>Tác dụng: khắc sâu hình ảnh bếp lửa trong <i>kí ức</i>, gợi mạch hồi tưởng về bà.</li></ul>',
      'Hai từ láy "<i>chờn vờn</i>", "<i>ấp iu</i>" càng làm hình ảnh bếp lửa thêm sống động, ấm áp.',
    ], [
      'Đúng — cụm "một bếp lửa" được lặp lại đầu hai dòng là điệp ngữ, nhấn mạnh hình ảnh trong ký ức.',
      'Sai — không có hiện tượng lấy bộ phận thay toàn thể nên không phải hoán dụ.',
      'Sai — hai câu này không phải câu hỏi tu từ.',
      'Sai — không có từ so sánh hay vế so sánh nào trong hai câu.',
    ]),
    Q('"Ấp iu" trong bài có nghĩa?', ['Tắt ngấm', 'Đốt cháy', 'Nâng niu, chăm chút', 'Lạnh lẽo'], 2, '"Ấp iu" gợi bàn tay khéo léo, kiên nhẫn, đầy tình cảm của bà.', [
      '<b>"Ấp iu"</b> là một <i>từ láy</i> sáng tạo của Bằng Việt, kết hợp hai sắc thái "<b>ấp ủ</b>" và "<b>nâng niu</b>".',
      'Cách hiểu nghĩa và giá trị:',
      '<ul><li>Gợi <b>bàn tay khéo léo</b>, kiên nhẫn nhóm bếp của bà mỗi sớm mai.</li><li>Gợi tấm lòng <b>chi chút, chăm sóc</b>, đầy yêu thương dành cho cháu.</li></ul>',
      'Một từ ngữ nhỏ nhưng diễn tả trọn vẹn sự tảo tần, ân cần của người bà — đây là kiểu câu hỏi <i>giải nghĩa từ</i> thường gặp trong đề thi.',
    ], [
      'Sai — "ấp iu" trái nghĩa với tắt ngấm; nó gợi sự gìn giữ ngọn lửa.',
      'Sai — không phải "đốt cháy" mạnh mẽ mà là nâng niu, ấp ủ nhẹ nhàng.',
      'Đúng — "ấp iu" gợi bàn tay khéo léo, kiên nhẫn, nâng niu chăm chút của bà.',
      'Sai — từ này mang sắc thái ấm áp, không phải lạnh lẽo.',
    ]),
    Q('Câu thơ "Ôi kì lạ và thiêng liêng — bếp lửa!" thể hiện?', ['Nỗi sợ hãi', 'Cảm xúc dâng trào khi nhận ra ý nghĩa thiêng liêng của bếp lửa và bà', 'Sự ngạc nhiên thông thường', 'Sự thất vọng'], 1, 'Câu cảm thán chốt lại suy ngẫm: bếp lửa là cội nguồn thiêng liêng.', [
      'Câu thơ "<b>Ôi kì lạ và thiêng liêng — bếp lửa!</b>" là một <b>câu cảm thán</b>, chốt lại mạch suy ngẫm của cháu về bà và bếp lửa.',
      'Phân tích:',
      '<ul><li>Thán từ "<code>Ôi</code>" cùng dấu chấm than ⇒ bộc lộ cảm xúc dâng trào, xúc động.</li><li>Hai từ "<b>kì lạ</b>", "<b>thiêng liêng</b>" thể hiện sự <i>thức nhận sâu sắc</i>: bếp lửa bình dị mà chứa đựng bao điều lớn lao.</li></ul>',
      'Câu thơ là sự "vỡ òa" trong nhận thức: bếp lửa và bà là cội nguồn nuôi dưỡng tâm hồn cháu.',
    ], [
      'Sai — "Ôi" ở đây là cảm xúc trân trọng, xúc động, không phải sợ hãi.',
      'Đúng — câu cảm thán bộc lộ cảm xúc dâng trào khi cháu nhận ra ý nghĩa thiêng liêng của bếp lửa và bà.',
      'Sai — không phải ngạc nhiên thông thường mà là sự thức nhận sâu sắc, đầy thành kính.',
      'Sai — câu thơ thể hiện niềm biết ơn, không phải thất vọng.',
    ]),
  ]),

  M(5, 'Ánh trăng — Nguyễn Duy', [
    Q('"Ánh trăng" sáng tác năm nào?', ['1990', '1975', '1985', '1978'], 3, 'Sáng tác năm 1978, ba năm sau ngày đất nước thống nhất, tại TP.HCM.', [
      '<b>Nguyễn Duy</b> là nhà thơ - chiến sĩ trưởng thành trong kháng chiến chống Mỹ, nổi tiếng với những bài thơ đậm chất dân gian, suy ngẫm.',
      'Hoàn cảnh sáng tác:',
      '<ul><li>Năm <code>1978</code>, ba năm sau ngày thống nhất, khi tác giả sống ở <b>Thành phố Hồ Chí Minh</b>.</li><li>In trong tập <b>"Ánh trăng"</b> (1984) — tập thơ được Giải A của Hội Nhà văn Việt Nam.</li></ul>',
      'Sống giữa tiện nghi đô thị, con người dễ quên đi quá khứ gian khó — đó là khởi nguồn của bài thơ.',
    ], [
      'Sai — 1990 muộn hơn nhiều; bài thơ ra đời ngay sau chiến tranh.',
      'Sai — 1975 là năm thống nhất; bài thơ viết ba năm sau đó.',
      'Sai — 1985 không đúng; "Ánh trăng" viết năm 1978.',
      'Đúng — 1978, ba năm sau ngày thống nhất, khi tác giả sống ở TP.HCM giữa tiện nghi đô thị.',
    ]),
    Q('Bài thơ thuộc thể?', ['Bảy chữ', 'Lục bát', 'Năm chữ', 'Thơ tự do, không đếm chữ theo dòng'], 2, 'Thơ năm chữ, các khổ liền mạch như lời tâm sự.', [
      '<b>Thể thơ năm chữ</b> (ngũ ngôn) có mỗi dòng 5 tiếng, thường dùng để kể chuyện, tâm tình, nhịp nhẹ nhàng.',
      'Đặc điểm hình thức "Ánh trăng":',
      '<ul><li>Mỗi dòng <code>5 tiếng</code>; mỗi khổ 4 dòng.</li><li>Cả bài như một <b>câu chuyện nhỏ</b> được kể theo trình tự thời gian (xưa — nay — gặp lại trăng).</li><li>Chữ đầu mỗi khổ <i>không viết hoa</i> ⇒ tạo mạch cảm xúc, tâm sự liền mạch.</li></ul>',
      'Hình thức này giúp bài thơ mang dáng dấp một lời tự thú, tự nhắc nhở chân thành.',
    ], [
      'Sai — mỗi dòng "Ánh trăng" có năm chữ, không phải bảy chữ.',
      'Sai — không phải cặp 6-8 nên không phải lục bát.',
      'Đúng — thơ năm chữ, các khổ liền mạch như một câu chuyện kể, lời tâm sự.',
      'Sai — số chữ mỗi dòng đều đặn (năm chữ) nên không phải thơ tự do.',
    ]),
    Q('Vầng trăng trong bài có ý nghĩa biểu tượng?', ['Quá khứ nghĩa tình, thiên nhiên, đất nước', 'Người yêu', 'Niềm vui', 'Sự cô đơn'], 0, 'Trăng = quá khứ ân tình + thiên nhiên + nhân dân, đất nước.', [
      '<b>Vầng trăng</b> là hình tượng trung tâm, mang nhiều tầng nghĩa <i>biểu tượng</i> sâu sắc.',
      'Các lớp ý nghĩa:',
      '<ul><li>Là <b>thiên nhiên</b> tươi mát, hồn nhiên, vĩnh hằng.</li><li>Là <b>quá khứ nghĩa tình</b> — những năm tháng gian lao mà gắn bó: "hồi chiến tranh ở rừng / vầng trăng thành tri kỉ".</li><li>Là <b>nhân dân, đất nước</b> bao dung, độ lượng, thủy chung.</li></ul>',
      'Trăng còn là biểu tượng cho vẻ đẹp <i>bất biến</i>, nhắc nhở con người về lẽ sống ân nghĩa.',
    ], [
      'Đúng — vầng trăng tượng trưng cho quá khứ ân nghĩa, thiên nhiên và nhân dân, đất nước.',
      'Sai — trăng không tượng trưng cho người yêu trong bài thơ này.',
      'Sai — trăng không chỉ là niềm vui mà là biểu tượng nghĩa tình thủy chung.',
      'Sai — trăng gắn với tình nghĩa gắn bó, không tượng trưng cho cô đơn.',
    ]),
    Q('Tình huống "đèn điện tắt" trong bài có ý nghĩa?', ['Cảnh tối tăm', 'Khoảnh khắc giác ngộ, thức tỉnh lương tâm', 'Tình huống ngẫu nhiên', 'Sự cố kỹ thuật'], 1, 'Mất điện ⇒ gặp lại trăng ⇒ giật mình về sự lãng quên.', [
      'Tình huống "<b>đèn điện tắt</b>" ("Thình lình đèn điện tắt") là <b>bước ngoặt</b>, là tình huống bất ngờ làm bùng nổ cảm xúc cả bài.',
      'Ý nghĩa của tình huống:',
      '<ul><li>Phòng buyn-đinh tối om ⇒ con người <b>"vội bật tung cửa sổ"</b> và gặp lại <i>vầng trăng</i>.</li><li>Cuộc gặp gỡ bất ngờ ấy đánh thức kí ức, khiến con người <b>"giật mình"</b> nhìn lại bản thân.</li></ul>',
      'Đây là tình huống mang tính <i>biểu tượng</i>: ánh điện (tiện nghi hiện đại) tắt đi để ánh trăng (quá khứ nghĩa tình) hiện về, gợi sự <b>thức tỉnh lương tâm</b>.',
    ], [
      'Sai — bóng tối chỉ là cái cớ; ý nghĩa nằm ở sự thức tỉnh khi gặp lại trăng.',
      'Đúng — mất điện khiến con người gặp lại vầng trăng và giật mình thức tỉnh về sự lãng quên quá khứ.',
      'Sai — đây là tình huống có dụng ý nghệ thuật, là bước ngoặt của bài thơ.',
      'Sai — câu hỏi đòi hỏi ý nghĩa biểu tượng, không phải xét về kỹ thuật điện.',
    ]),
    Q('Câu thơ "Ánh trăng im phăng phắc / Đủ cho ta giật mình" thể hiện?', ['Niềm vui đoàn tụ', 'Sự bao dung của trăng và sự ăn năn của người', 'Sự giận dữ', 'Lời trách móc'], 1, 'Trăng im lặng nhưng đủ làm con người giật mình thức tỉnh.', [
      'Hai câu kết "<b>Ánh trăng im phăng phắc / Đủ cho ta giật mình</b>" là điểm sáng tư tưởng, dồn nén triết lí sâu xa của bài.',
      'Phân tích:',
      '<ul><li>"<code>im phăng phắc</code>" ⇒ trăng <b>bao dung, độ lượng</b>, không trách cứ, không oán hờn.</li><li>"<code>giật mình</code>" ⇒ sự <b>thức tỉnh, ăn năn</b> của con người khi nhận ra mình đã vô tình lãng quên quá khứ.</li></ul>',
      'Cái "giật mình" đáng quý là sự tự vấn lương tâm — bài học về lẽ sống thủy chung, ân nghĩa.',
    ], [
      'Sai — không phải niềm vui đoàn tụ mà là sự day dứt, ăn năn.',
      'Đúng — trăng im lặng, bao dung nhưng chính sự im lặng ấy đủ khiến con người giật mình tự vấn, ăn năn.',
      'Sai — trăng không giận dữ; nó "im phăng phắc", lặng lẽ độ lượng.',
      'Sai — trăng không lên tiếng trách móc; chính lương tâm con người tự thức tỉnh.',
    ]),
    Q('Bài thơ là lời nhắc nhở về?', ['Cảnh đẹp', 'Đạo lý "uống nước nhớ nguồn"', 'Chiến tranh', 'Tình yêu đôi lứa'], 1, 'Nhắc nhở thái độ sống với quá khứ ân nghĩa, với nhân dân.', [
      '<b>Chủ đề</b> bài "Ánh trăng" là lời tự nhắc nhở về thái độ sống với <i>quá khứ</i> và đạo lí truyền thống của dân tộc.',
      'Thông điệp:',
      '<ul><li>Nhắc nhở con người không được <b>vô tình, lãng quên</b> quá khứ gian lao, tình nghĩa.</li><li>Gợi đạo lí "<b>uống nước nhớ nguồn</b>", "ăn quả nhớ kẻ trồng cây" — biết ơn nhân dân, đồng đội, đất nước.</li></ul>',
      'Bài thơ có ý nghĩa với cả một thế hệ vừa bước ra khỏi chiến tranh, đang sống giữa hòa bình và tiện nghi.',
    ], [
      'Sai — bài thơ không dừng ở tả cảnh đẹp mà gửi gắm bài học đạo lý.',
      'Đúng — nhắc nhở thái độ sống thủy chung với quá khứ ân nghĩa, với nhân dân — đạo lý "uống nước nhớ nguồn".',
      'Sai — chiến tranh chỉ là nền ký ức; thông điệp là lẽ sống ân tình.',
      'Sai — đây không phải bài thơ tình yêu đôi lứa.',
    ]),
  ]),

  M(6, 'Làng — Kim Lân', [
    Q('Truyện ngắn "Làng" sáng tác năm nào?', ['1945', '1960', '1948', '1954'], 2, 'Viết năm 1948, thời kỳ đầu kháng chiến chống Pháp.', [
      '<b>Kim Lân</b> là nhà văn chuyên viết truyện ngắn, am hiểu sâu sắc đời sống <i>người nông dân</i> và nông thôn Bắc Bộ.',
      'Hoàn cảnh sáng tác:',
      '<ul><li>Truyện "Làng" viết năm <code>1948</code>, đăng trên tạp chí Văn nghệ năm 1948.</li><li>Đây là <b>thời kỳ đầu kháng chiến chống Pháp</b>, khi nhân dân các vùng bị giặc chiếm phải đi <i>tản cư</i>.</li></ul>',
      'Hiểu bối cảnh tản cư giúp lí giải tâm trạng đau đáu nhớ làng của ông Hai.',
    ], [
      'Sai — 1945 là năm Cách mạng tháng Tám; truyện viết sau đó, trong kháng chiến.',
      'Sai — 1960 muộn hơn; "Làng" ra đời ở thời kỳ đầu chống Pháp.',
      'Đúng — viết năm 1948, thời kỳ đầu kháng chiến chống Pháp, khi nhân dân đi tản cư.',
      'Sai — 1954 là năm kết thúc kháng chiến chống Pháp, sau khi truyện đã ra đời.',
    ]),
    Q('Nhân vật chính của truyện?', ['Bác Thứ', 'Đứa con út', 'Ông Hai', 'Bà chủ nhà'], 2, 'Ông Hai — người nông dân làng Chợ Dầu phải đi tản cư.', [
      '<b>Ông Hai</b> là nhân vật trung tâm — người nông dân làng <b>Chợ Dầu</b> phải đi tản cư nơi đất khách.',
      'Vẻ đẹp nhân vật ông Hai:',
      '<ul><li><b>Yêu làng tha thiết</b>: đi đâu cũng khoe làng, tự hào về làng Chợ Dầu.</li><li>Tình yêu làng <i>thống nhất</i> với <b>tình yêu nước</b> và tinh thần kháng chiến.</li></ul>',
      'Các nhân vật khác (bác Thứ, bà chủ nhà, mụ chủ, đứa con út) đều là <i>nhân vật phụ</i>, góp phần làm nổi bật ông Hai.',
    ], [
      'Sai — bác Thứ chỉ là nhân vật phụ trò chuyện với ông Hai.',
      'Sai — đứa con út xuất hiện trong cảnh ông Hai trò chuyện để giãi bày, không phải nhân vật chính.',
      'Đúng — ông Hai, người nông dân làng Chợ Dầu phải đi tản cư, là nhân vật trung tâm.',
      'Sai — bà chủ nhà nơi tản cư chỉ là nhân vật phụ.',
    ]),
    Q('Tình huống truyện đặc sắc là?', ['Nghe tin làng Chợ Dầu theo Tây', 'Cãi nhau với hàng xóm', 'Mất mùa', 'Đi đánh giặc'], 0, 'Nghe tin làng theo giặc ⇒ đẩy ông Hai vào xung đột nội tâm dữ dội.', [
      '<b>Tình huống truyện</b> là hoàn cảnh có vấn đề, đẩy nhân vật vào thử thách để bộc lộ tính cách, tư tưởng.',
      'Kim Lân xây dựng một tình huống <b>thắt nút</b> đầy kịch tính:',
      '<ul><li>Ông Hai đang ở nơi tản cư bỗng <b>nghe tin làng Chợ Dầu theo Tây</b>, làm Việt gian.</li><li>Tin dữ đặt ông vào <i>xung đột nội tâm</i> dữ dội: giữa tình yêu làng và tình yêu nước.</li></ul>',
      'Chính tình huống này làm bật lên tình yêu làng — yêu nước sâu sắc của người nông dân.',
    ], [
      'Đúng — tin làng Chợ Dầu theo giặc đẩy ông Hai vào xung đột nội tâm dữ dội, bộc lộ tình yêu làng - yêu nước.',
      'Sai — không có chi tiết cãi nhau với hàng xóm làm tình huống truyện.',
      'Sai — mất mùa không phải tình huống của truyện "Làng".',
      'Sai — ông Hai không trực tiếp đi đánh giặc; ông sống nơi tản cư.',
    ]),
    Q('Tâm trạng ông Hai khi nghe tin làng theo giặc?', ['Đau đớn, xấu hổ, dằn vặt', 'Bình thản', 'Phẫn nộ với cách mạng', 'Vui mừng'], 0, '"Cổ ông lão nghẹn ắng hẳn lại, da mặt tê rân rân" ⇒ đau đớn, tủi hổ.', [
      'Kim Lân rất tài khi <b>miêu tả diễn biến tâm lí</b> nhân vật — đây là điểm sáng nghệ thuật của truyện.',
      'Khi nghe tin sét đánh, ông Hai trải qua chuỗi cảm xúc đau đớn:',
      '<ul><li>Choáng váng: "<code>cổ ông lão nghẹn ắng hẳn lại, da mặt tê rân rân</code>".</li><li>Tủi hổ, dằn vặt: cúi gằm mặt đi về, không dám ra đường, lo cho tương lai.</li><li>Xung đột nội tâm: "<b>Làng thì yêu thật, nhưng làng theo Tây mất rồi thì phải thù</b>".</li></ul>',
      'Dù đau đớn, ông vẫn một lòng theo kháng chiến, theo cụ Hồ.',
    ], [
      'Đúng — "cổ nghẹn ắng, da mặt tê rân rân", ông Hai đau đớn, tủi hổ, dằn vặt khôn nguôi.',
      'Sai — ông không hề bình thản mà sững sờ, đau đớn cùng cực.',
      'Sai — ông một lòng theo kháng chiến, không phẫn nộ với cách mạng.',
      'Sai — tin dữ khiến ông đau khổ, hoàn toàn không vui mừng.',
    ]),
    Q('Khi nghe tin cải chính, ông Hai?', ['Vui sướng đi khoe khắp nơi, kể cả nhà bị Tây đốt', 'Im lặng', 'Không tin', 'Tức giận'], 0, 'Vui đến mức khoe cả việc nhà mình bị đốt — chứng tỏ làng không theo giặc.', [
      'Tin <b>cải chính</b> (làng Chợ Dầu không theo giặc) là <i>chi tiết mở nút</i>, giải tỏa mọi đau khổ của ông Hai.',
      'Phản ứng của ông Hai thật cảm động và độc đáo:',
      '<ul><li>Mặt "<code>tươi vui, rạng rỡ hẳn lên</code>", mua quà cho con, <b>đi khoe khắp nơi</b>.</li><li>Ông khoe cả việc "<b>Tây nó đốt nhà tôi rồi</b>" với niềm sung sướng kì lạ.</li></ul>',
      'Việc nhà bị đốt là <i>bằng chứng</i> làng ông không theo giặc ⇒ với ông, danh dự của làng quý hơn cả tài sản riêng. Đó là tình yêu làng hòa trong tình yêu nước.',
    ], [
      'Đúng — ông vui sướng đi khoe khắp nơi, khoe cả nhà mình bị Tây đốt vì đó là bằng chứng làng không theo giặc.',
      'Sai — ông không im lặng mà hồ hởi đi báo tin mừng cho mọi người.',
      'Sai — ông tin ngay vì đây là điều ông mong mỏi.',
      'Sai — ông vui mừng tột độ, không hề tức giận.',
    ]),
    Q('Chủ đề tác phẩm?', ['Tình yêu làng quê hòa quyện với tình yêu đất nước, kháng chiến', 'Phong tục Bắc Bộ', 'Tình mẫu tử', 'Cuộc sống nghèo khó'], 0, 'Tình yêu làng nâng lên thành tình yêu nước — bước trưởng thành của người nông dân.', [
      '<b>Chủ đề</b> truyện "Làng" là tình yêu làng quê hòa quyện, thống nhất với <b>tình yêu đất nước</b> và tinh thần kháng chiến.',
      'Giá trị tư tưởng:',
      '<ul><li>Ở người nông dân thời kháng chiến, <i>yêu làng</i> đã được nâng lên thành <b>yêu nước</b>.</li><li>Đây là <b>nhận thức mới, bước trưởng thành</b> trong tình cảm của người nông dân Việt Nam sau Cách mạng tháng Tám.</li></ul>',
      'Kim Lân đã phát hiện và ngợi ca vẻ đẹp tâm hồn ấy bằng nghệ thuật miêu tả tâm lí tinh tế.',
    ], [
      'Đúng — tình yêu làng được nâng lên thành tình yêu nước, đánh dấu bước trưởng thành của người nông dân kháng chiến.',
      'Sai — truyện không nhằm giới thiệu phong tục Bắc Bộ.',
      'Sai — tình mẫu tử không phải chủ đề của "Làng".',
      'Sai — cuộc sống nghèo khó chỉ là bối cảnh, không phải chủ đề chính.',
    ]),
  ]),

  M(7, 'Lặng lẽ Sa Pa — Nguyễn Thành Long', [
    Q('Tác phẩm "Lặng lẽ Sa Pa" ra đời năm?', ['1975', '1965', '1970', '1980'], 2, 'Sáng tác năm 1970 sau chuyến đi thực tế Lào Cai.', [
      '<b>Nguyễn Thành Long</b> là cây bút chuyên về <i>truyện ngắn và kí</i>, văn phong nhẹ nhàng, giàu chất thơ.',
      'Hoàn cảnh sáng tác:',
      '<ul><li>Truyện viết năm <code>1970</code>, sau chuyến đi thực tế ở <b>Lào Cai</b>.</li><li>In trong tập <b>"Giữa trong xanh"</b> (1972).</li></ul>',
      'Đây là thời kì miền Bắc vừa sản xuất vừa chiến đấu, tác phẩm ngợi ca những con người lao động thầm lặng dựng xây đất nước.',
    ], [
      'Sai — 1975 là năm thống nhất; truyện viết trước đó.',
      'Sai — 1965 không đúng; truyện ra đời năm 1970.',
      'Đúng — sáng tác năm 1970 sau chuyến đi thực tế Lào Cai của Nguyễn Thành Long.',
      'Sai — 1980 muộn hơn; truyện in trong tập "Giữa trong xanh" (1972).',
    ]),
    Q('Nhân vật chính của truyện?', ['Bác lái xe', 'Cô kỹ sư', 'Ông họa sĩ', 'Anh thanh niên làm khí tượng trên đỉnh Yên Sơn'], 3, 'Anh thanh niên 27 tuổi làm công tác khí tượng kiêm vật lý địa cầu trên đỉnh Yên Sơn 2 600 m.', [
      '<b>Anh thanh niên</b> là nhân vật chính, dù chỉ xuất hiện chốc lát qua cái nhìn của các nhân vật khác.',
      'Giới thiệu nhân vật:',
      '<ul><li>27 tuổi, làm công tác <b>khí tượng kiêm vật lí địa cầu</b> trên đỉnh <b>Yên Sơn</b> cao <code>2 600 m</code>.</li><li>Sống một mình, công việc là "đo gió, đo mưa, đo nắng, tính mây..." phục vụ sản xuất và chiến đấu.</li></ul>',
      'Các nhân vật phụ (bác lái xe, ông họa sĩ, cô kĩ sư) đóng vai trò <i>tô đậm</i> vẻ đẹp của anh thanh niên.',
    ], [
      'Sai — bác lái xe là nhân vật phụ, người đưa câu chuyện đến với người đọc.',
      'Sai — cô kỹ sư chỉ là nhân vật phụ chứng kiến, cảm phục anh thanh niên.',
      'Sai — ông họa sĩ là người quan sát, suy ngẫm, không phải nhân vật trung tâm.',
      'Đúng — anh thanh niên 27 tuổi làm khí tượng kiêm vật lý địa cầu trên đỉnh Yên Sơn 2 600 m là nhân vật chính.',
    ]),
    Q('Hoàn cảnh sống của anh thanh niên?', ['Cô độc trên đỉnh núi cao', 'Đông đúc, vui vẻ', 'Ở nông thôn đồng bằng', 'Trong thành phố'], 0, 'Sống một mình trên đỉnh núi cao 2 600 m, ít người qua lại.', [
      '<b>Hoàn cảnh sống</b> khắc nghiệt làm nổi bật phẩm chất của anh thanh niên.',
      'Điều kiện sống và làm việc:',
      '<ul><li>Sống <b>một mình</b> trên đỉnh Yên Sơn cao <code>2 600 m</code>, quanh năm mây mù lạnh giá.</li><li>Cái khó nhất không phải gian khổ vật chất mà là sự <b>cô đơn</b> — anh từng "thèm người" đến mức lăn cây chặn đường để được gặp người.</li></ul>',
      'Vượt lên hoàn cảnh ấy, anh vẫn yêu đời, yêu nghề — đó mới là vẻ đẹp đáng quý.',
    ], [
      'Đúng — anh sống một mình trên đỉnh Yên Sơn cao 2 600 m, quanh năm vắng người qua lại.',
      'Sai — anh sống cô độc, "thèm người", không phải nơi đông vui.',
      'Sai — anh làm việc trên đỉnh núi cao Sa Pa, không phải đồng bằng.',
      'Sai — anh sống giữa núi rừng heo hút, không phải trong thành phố.',
    ]),
    Q('Điều khiến anh thanh niên không thấy cô đơn?', ['Có nhiều bạn bè', 'Tình yêu công việc và ý thức cống hiến', 'Sống gần thành phố', 'Có TV xem'], 1, 'Anh tìm thấy niềm vui trong công việc: "khi ta làm việc, ta với công việc là đôi".', [
      'Vẻ đẹp nổi bật nhất của anh thanh niên là <b>tình yêu công việc</b> và <b>ý thức cống hiến</b>.',
      'Suy nghĩ đúng đắn về công việc:',
      '<ul><li>Anh tâm niệm: "<code>khi ta làm việc, ta với công việc là đôi, sao gọi là một mình được?</code>".</li><li>Anh thấy công việc gắn với việc lớn của đất nước ⇒ thấy mình <b>có ích</b>, nên hạnh phúc.</li></ul>',
      'Ngoài ra, anh còn tổ chức cuộc sống ngăn nắp (trồng hoa, nuôi gà, đọc sách) ⇒ một tâm hồn phong phú, không hề cô đơn.',
    ], [
      'Sai — anh sống một mình, không có nhiều bạn bè bên cạnh.',
      'Đúng — tình yêu công việc và ý thức cống hiến giúp anh thấy "ta với công việc là đôi", không còn cô đơn.',
      'Sai — anh sống trên núi cao heo hút, xa thành phố.',
      'Sai — niềm vui của anh đến từ công việc và lý tưởng, không phải tiện nghi giải trí.',
    ]),
    Q('Phong cách kể chuyện của Nguyễn Thành Long?', ['Hài hước, châm biếm', 'Nhẹ nhàng, thấm thía, giàu chất thơ và chất họa', 'Trầm uất, bi quan', 'Bi kịch, dữ dội'], 1, 'Văn chương trữ tình giàu chất thơ, ca ngợi cuộc sống lao động bình dị.', [
      '<b>Chất thơ</b> và <b>chất họa</b> là nét đặc sắc của truyện "Lặng lẽ Sa Pa".',
      'Biểu hiện:',
      '<ul><li><b>Chất thơ:</b> giọng văn nhẹ nhàng, trữ tình, thấm thía; cảnh và tình hòa quyện.</li><li><b>Chất họa:</b> những bức tranh thiên nhiên Sa Pa được vẽ bằng ngôn từ ("nắng đốt cháy rừng cây", "mây cuộn tròn lại từng cục...").</li></ul>',
      'Truyện gần như không có cốt truyện li kì mà chinh phục người đọc bằng <i>không khí trữ tình</i> và vẻ đẹp con người.',
    ], [
      'Sai — văn ông trữ tình, nhẹ nhàng, không thiên về hài hước châm biếm.',
      'Đúng — văn nhẹ nhàng, thấm thía, giàu chất thơ và chất họa, ca ngợi cuộc sống lao động bình dị.',
      'Sai — giọng văn trong sáng, lạc quan, không trầm uất bi quan.',
      'Sai — truyện êm đềm, lắng đọng, không bi kịch dữ dội.',
    ]),
    Q('Tại sao tác giả không đặt tên cho các nhân vật?', ['Vì không quan trọng', 'Lý do văn phong', 'Quên đặt', 'Tô đậm tính chất khái quát — họ là những người lao động vô danh đang âm thầm cống hiến'], 3, 'Tên gọi như "anh thanh niên", "ông họa sĩ", "cô kỹ sư" ⇒ điển hình hóa.', [
      'Việc <b>không đặt tên riêng</b> cho các nhân vật là một <i>dụng ý nghệ thuật</i> của Nguyễn Thành Long.',
      'Các nhân vật được gọi theo <b>nghề nghiệp, lứa tuổi</b>:',
      '<ul><li>"<code>anh thanh niên</code>", "<code>ông họa sĩ</code>", "<code>cô kĩ sư</code>", "<code>bác lái xe</code>"...</li><li>Cách gọi này mang tính <b>khái quát, điển hình hóa</b>.</li></ul>',
      'Ý nghĩa: họ là đại diện cho <b>lớp người lao động vô danh</b> đang ngày đêm âm thầm cống hiến cho đất nước trên mọi miền Tổ quốc.',
    ], [
      'Sai — đây là dụng ý nghệ thuật, không phải vì nhân vật không quan trọng.',
      'Sai — không đơn thuần là thói quen văn phong mà có ý nghĩa khái quát hóa.',
      'Sai — đây là chủ ý nghệ thuật chứ không phải tác giả quên đặt tên.',
      'Đúng — gọi theo nghề ("anh thanh niên", "ông họa sĩ", "cô kỹ sư") nhằm khái quát hóa lớp người lao động vô danh âm thầm cống hiến.',
    ]),
  ]),

  M(8, 'Chiếc lược ngà — Nguyễn Quang Sáng', [
    Q('"Chiếc lược ngà" sáng tác năm nào?', ['1966', '1970', '1975', '1980'], 0, 'Sáng tác năm 1966 khi tác giả đang ở chiến trường Nam Bộ.', [
      '<b>Nguyễn Quang Sáng</b> là nhà văn Nam Bộ, hầu hết tác phẩm viết về cuộc sống và con người Nam Bộ trong hai cuộc kháng chiến.',
      'Hoàn cảnh sáng tác:',
      '<ul><li>Truyện viết năm <code>1966</code>, khi tác giả đang hoạt động ở <b>chiến trường Nam Bộ</b> thời chống Mỹ.</li><li>Văn bản trong SGK là đoạn trích phần giữa truyện.</li></ul>',
      'Bối cảnh chiến tranh chia cắt chính là nền để câu chuyện tình cha con éo le, cảm động được kể lại.',
    ], [
      'Đúng — sáng tác năm 1966 khi Nguyễn Quang Sáng đang hoạt động ở chiến trường Nam Bộ.',
      'Sai — 1970 không đúng; truyện ra đời năm 1966.',
      'Sai — 1975 là năm thống nhất, sau khi truyện đã viết.',
      'Sai — 1980 muộn hơn nhiều so với năm sáng tác.',
    ]),
    Q('Hai nhân vật trung tâm là?', ['Ông Sáu và bà nội', 'Ông Sáu và bé Thu', 'Bác Ba và ông Sáu', 'Bé Thu và mẹ'], 1, 'Cha (ông Sáu) và con gái (bé Thu) — hai cha con trong chiến tranh.', [
      'Hai nhân vật trung tâm là <b>ông Sáu</b> (người cha) và <b>bé Thu</b> (con gái) — trục chính của câu chuyện tình phụ tử.',
      'Vai trò nhân vật:',
      '<ul><li><b>Ông Sáu:</b> người cha đi kháng chiến, khao khát được con gọi tiếng "ba".</li><li><b>Bé Thu:</b> cô bé bướng bỉnh nhưng yêu cha mãnh liệt, sâu sắc.</li><li><b>Bác Ba:</b> bạn ông Sáu, đóng vai trò <i>người kể chuyện</i> (nhân vật phụ).</li></ul>',
      'Tình huống truyện xoay quanh mối quan hệ giữa hai cha con trong hoàn cảnh chiến tranh.',
    ], [
      'Sai — bà nội chỉ là nhân vật phụ; trục chính là ông Sáu và bé Thu.',
      'Đúng — ông Sáu (cha) và bé Thu (con gái) là hai nhân vật trung tâm của câu chuyện tình phụ tử.',
      'Sai — bác Ba là người kể chuyện, nhân vật phụ.',
      'Sai — mẹ bé Thu không phải nhân vật trung tâm.',
    ]),
    Q('Vì sao bé Thu không nhận ông Sáu là cha?', ['Vì không quen', 'Vì ông Sáu có vết thẹo trên mặt khác với hình chụp', 'Vì ghét', 'Vì sợ người lạ mặc quân phục'], 1, 'Vết thẹo do chiến tranh làm khuôn mặt khác ảnh ⇒ bé Thu không nhận.', [
      'Chi tiết <b>vết thẹo</b> là một <i>chi tiết nghệ thuật đắt giá</i>, thắt nút câu chuyện.',
      'Nguyên nhân bé Thu không nhận cha:',
      '<ul><li>Ông Sáu xa nhà khi con chưa đầy một tuổi; bé Thu chỉ biết cha qua <b>tấm ảnh chụp chung với má</b>.</li><li>Khi gặp lại, mặt ông Sáu có <code>vết thẹo dài</code> do chiến tranh ⇒ khác bức ảnh ⇒ bé Thu nhất quyết không nhận.</li></ul>',
      'Chính sự ương ngạnh ấy lại cho thấy bé Thu yêu cha <b>sâu sắc, thủy chung</b> — chỉ nhận đúng người cha trong tâm trí mình.',
    ], [
      'Sai — không phải vì lạ mà vì khuôn mặt cha khác bức ảnh.',
      'Đúng — vết thẹo do chiến tranh khiến mặt ông Sáu khác bức ảnh chụp chung với má, nên bé Thu không nhận.',
      'Sai — bé Thu không ghét cha; ngược lại em rất yêu ba và chỉ trung thành với hình ảnh ba trong ảnh.',
      'Sai — em không nhận vì vết thẹo lạ trên mặt, không phải vì sợ quân phục.',
    ]),
    Q('Khoảnh khắc bé Thu gọi "ba" trong truyện?', ['Khi ăn cơm', 'Khi đi học', 'Khi mới gặp', 'Khi ông Sáu sắp lên đường, bé thu vỡ òa thét lên "Ba…a…a…ba!"'], 3, 'Cảnh chia tay đầy nước mắt — tiếng "ba" muộn màng nhưng cảm động.', [
      '<b>Cảnh chia tay</b> ở cuối đoạn trích là <i>cao trào cảm xúc</i>, là chi tiết cảm động nhất của truyện.',
      'Diễn biến:',
      '<ul><li>Đúng lúc ông Sáu phải lên đường, bé Thu bỗng <b>vỡ òa</b>, thét lên "<code>Ba…a…a…ba!</code>".</li><li>Em ôm chặt cổ ba, hôn cùng khắp, hôn cả vết thẹo — không cho ba đi.</li></ul>',
      'Tiếng "ba" muộn màng nhưng dồn nén bao yêu thương ⇒ bộc lộ tình cha con thiêng liêng, đồng thời cũng là nỗi đau do chiến tranh gây ra (đây là lần cuối cha con gặp nhau).',
    ], [
      'Sai — trong bữa cơm bé Thu còn hắt trứng cá, chưa chịu nhận ba.',
      'Sai — không có cảnh gọi "ba" lúc đi học.',
      'Sai — lúc mới gặp bé Thu sợ hãi bỏ chạy, không nhận ba.',
      'Đúng — đúng lúc ông Sáu sắp lên đường, bé Thu vỡ òa thét "Ba…a…a…ba!" — tiếng gọi muộn màng mà cảm động.',
    ]),
    Q('Chiếc lược ngà do ai làm và dành cho ai?', ['Bác Ba làm', 'Bé Thu làm', 'Bà nội làm', 'Ông Sáu làm từ ngà voi để tặng con gái'], 3, 'Ông Sáu kì công làm chiếc lược ngà tặng con — biểu tượng tình phụ tử.', [
      '<b>Chiếc lược ngà</b> là <i>hình ảnh trung tâm</i>, là nhan đề và là biểu tượng cho tình cha con.',
      'Câu chuyện chiếc lược:',
      '<ul><li>Nhớ lời con dặn, ở chiến khu, ông Sáu <b>kì công làm chiếc lược từ ngà voi</b> để tặng con gái.</li><li>Ông khắc dòng chữ "<code>Yêu nhớ tặng Thu con của ba</code>".</li><li>Ông hi sinh khi chưa kịp trao; bác Ba thay ông trao lại kỉ vật cho bé Thu.</li></ul>',
      'Chiếc lược trở thành <b>biểu tượng của tình phụ tử thiêng liêng, bất diệt</b> vượt lên cả cái chết.',
    ], [
      'Sai — bác Ba chỉ là người trao lại kỷ vật, không phải người làm.',
      'Sai — bé Thu là người được tặng, không phải người làm lược.',
      'Sai — không phải bà nội làm chiếc lược.',
      'Đúng — ông Sáu kì công làm chiếc lược từ ngà voi để tặng con gái — biểu tượng tình phụ tử thiêng liêng.',
    ]),
    Q('Chủ đề tác phẩm?', ['Tình bạn', 'Tình yêu đôi lứa', 'Lao động sản xuất', 'Tình cha con sâu nặng trong cảnh ngộ éo le của chiến tranh'], 3, 'Ca ngợi tình phụ tử thiêng liêng, đau đớn mất mát do chiến tranh.', [
      '<b>Chủ đề</b> "Chiếc lược ngà" là ca ngợi <b>tình cha con sâu nặng, thiêng liêng</b> trong hoàn cảnh éo le của chiến tranh.',
      'Hai mặt của tư tưởng tác phẩm:',
      '<ul><li><b>Ngợi ca:</b> tình phụ tử bền chặt, vượt cả khoảng cách và cái chết.</li><li><b>Tố cáo:</b> chiến tranh gây bao mất mát, chia li, đau thương cho con người.</li></ul>',
      'Qua đó, nhà văn khẳng định: tình cảm gia đình, tình cha con là giá trị bất diệt, không bom đạn nào hủy diệt được.',
    ], [
      'Sai — truyện không viết về tình bạn.',
      'Sai — đây không phải chủ đề tình yêu đôi lứa.',
      'Sai — lao động sản xuất không phải chủ đề của truyện.',
      'Đúng — ca ngợi tình cha con sâu nặng, thiêng liêng trong cảnh ngộ éo le, mất mát do chiến tranh.',
    ]),
  ]),

  M(9, 'Các phương châm hội thoại', [
    Q('Phương châm về lượng yêu cầu?', ['Nói ngắn gọn', 'Nói có đủ nội dung, không thừa không thiếu', 'Nói thật', 'Nói lễ phép'], 1, 'Cung cấp đủ thông tin, không thiếu, không thừa.', [
      'Trong giao tiếp có <b>5 phương châm hội thoại</b> (Tiếng Việt 9): về lượng, về chất, quan hệ, cách thức, lịch sự.',
      '<b>Phương châm về lượng</b>:',
      '<ul><li>Yêu cầu nội dung lời nói phải <b>đủ</b>, đáp ứng đúng yêu cầu giao tiếp.</li><li><i>Không thiếu</i> (nói chưa đủ ý) và <i>không thừa</i> (nói lặp, nói điều ai cũng biết).</li></ul>',
      'Ví dụ vi phạm: "Trâu là loài gia súc <code>nuôi ở nhà</code>" — thừa, vì "gia súc" đã hàm nghĩa nuôi ở nhà.',
    ], [
      'Sai — "ngắn gọn, rành mạch" là yêu cầu của phương châm cách thức, không phải về lượng.',
      'Đúng — phương châm về lượng đòi hỏi nội dung đủ, không thiếu cũng không thừa.',
      'Sai — "nói thật, có bằng chứng" thuộc phương châm về chất.',
      'Sai — "nói lễ phép" thuộc phương châm lịch sự.',
    ]),
    Q('Phương châm về chất yêu cầu?', ['Nói rõ ràng', 'Nói có bằng chứng xác đáng, không nói điều mình không tin là đúng', 'Nói lễ phép', 'Nói có nội dung'], 1, 'Không nói điều mình không tin là đúng hoặc không có bằng chứng.', [
      '<b>Phương châm về chất</b> liên quan đến tính <i>chân thực</i> của thông tin.',
      'Nội dung phương châm:',
      '<ul><li>Không nói những điều mình <b>không tin là đúng</b>.</li><li>Không nói điều mình <b>không có bằng chứng xác thực</b>.</li></ul>',
      'Khi chưa chắc chắn, người nói thường dùng các cách rào đón như "<code>hình như</code>", "<code>nghe nói</code>", "<code>nếu tôi không nhầm</code>" để báo trước độ tin cậy.',
    ], [
      'Sai — "nói rõ ràng" thuộc phương châm cách thức.',
      'Đúng — phương châm về chất đòi hỏi không nói điều mình không tin là đúng hoặc không có bằng chứng.',
      'Sai — "nói lễ phép" thuộc phương châm lịch sự.',
      'Sai — "nói có nội dung, đủ thông tin" thuộc phương châm về lượng.',
    ]),
    Q('Khi nói "Tôi nghe nói…", "Hình như…", người nói tuân thủ phương châm?', ['Phương châm về lượng (đủ thông tin)', 'Cách thức', 'Quan hệ', 'Chất'], 3, 'Báo trước độ tin cậy ⇒ tuân thủ phương châm về chất.', [
      'Đây là dạng bài <b>nhận diện phương châm hội thoại</b> qua các <i>cách nói rào đón</i>.',
      'Phân tích:',
      '<ul><li>Các cụm "<code>tôi nghe nói</code>", "<code>hình như</code>", "<code>theo tôi biết</code>" báo cho người nghe biết <b>thông tin chưa chắc chắn</b>.</li><li>Người nói chủ động <i>báo trước độ tin cậy</i> ⇒ tránh khẳng định điều mình chưa có bằng chứng.</li></ul>',
      'Vì vậy, đây là cách <b>tuân thủ phương châm về chất</b>.',
    ], [
      'Sai — không liên quan lượng thông tin nhiều ít mà liên quan độ tin cậy của tin.',
      'Sai — đây không phải vấn đề diễn đạt rõ ràng (cách thức).',
      'Sai — phương châm quan hệ đòi hỏi nói đúng đề tài, không phải vấn đề ở đây.',
      'Đúng — báo trước rằng tin chưa chắc chắn chính là cách tuân thủ phương châm về chất.',
    ]),
    Q('Phương châm cách thức yêu cầu?', ['Nói thật', 'Nói ngắn gọn, rành mạch, tránh mơ hồ', 'Nói có nội dung', 'Nói lễ phép'], 1, 'Trình bày rõ ràng, ngắn gọn, không mơ hồ.', [
      '<b>Phương châm cách thức</b> liên quan đến <i>hình thức diễn đạt</i> của lời nói.',
      'Nội dung phương châm:',
      '<ul><li>Nói <b>ngắn gọn, rành mạch</b>.</li><li>Tránh nói <b>mơ hồ</b>, tối nghĩa, dễ gây hiểu lầm.</li></ul>',
      'Ví dụ vi phạm: thành ngữ "<code>dây cà ra dây muống</code>", "<code>ông nói gà bà nói vịt</code>" chỉ cách nói rườm rà, không rõ ràng.',
    ], [
      'Sai — "nói thật" thuộc phương châm về chất.',
      'Đúng — phương châm cách thức đòi hỏi nói ngắn gọn, rành mạch, tránh mơ hồ.',
      'Sai — "nói có nội dung, đủ thông tin" thuộc phương châm về lượng.',
      'Sai — "nói lễ phép" thuộc phương châm lịch sự.',
    ]),
    Q('Phương châm lịch sự đòi hỏi?', ['Nói nhiều', 'Nói nhanh', 'Tôn trọng người đối thoại', 'Nói thật to'], 2, 'Tế nhị, tôn trọng đối tượng giao tiếp.', [
      '<b>Phương châm lịch sự</b> liên quan đến <i>thái độ, cách ứng xử</i> trong giao tiếp.',
      'Nội dung phương châm:',
      '<ul><li>Khi giao tiếp cần <b>tế nhị</b> và <b>tôn trọng</b> người đối thoại.</li><li>Thể hiện qua cách xưng hô, dùng từ ngữ phù hợp, không xúc phạm người khác.</li></ul>',
      'Tục ngữ minh họa: "<code>Lời nói chẳng mất tiền mua / Lựa lời mà nói cho vừa lòng nhau</code>".',
    ], [
      'Sai — nói nhiều có khi vi phạm phương châm về lượng, không phải lịch sự.',
      'Sai — tốc độ nói không phải nội dung của phương châm lịch sự.',
      'Đúng — phương châm lịch sự đòi hỏi tế nhị, tôn trọng người đối thoại.',
      'Sai — âm lượng to nhỏ không phải yêu cầu của phương châm lịch sự.',
    ]),
    Q('Câu "Trâu là một loài gia súc nuôi ở nhà" vi phạm phương châm?', ['Phương châm về chất (nói điều chưa chắc đúng)', 'Quan hệ', 'Lịch sự', 'Lượng (thừa)'], 3, '"Gia súc" đã hàm nghĩa "nuôi ở nhà" ⇒ thừa thông tin.', [
      'Đây là dạng bài <b>nhận diện lỗi vi phạm phương châm hội thoại</b>.',
      'Phân tích câu "Trâu là một loài gia súc nuôi ở nhà":',
      '<ul><li>Từ "<b>gia súc</b>" đã có nghĩa là "thú nuôi <i>ở nhà</i>".</li><li>Thêm cụm "<code>nuôi ở nhà</code>" là <b>lặp ý, thừa thông tin</b>.</li></ul>',
      'Nói thừa như vậy vi phạm <b>phương châm về lượng</b> (cung cấp thông tin không nhiều hơn mức cần thiết).',
    ], [
      'Sai — câu vẫn đúng sự thật, không vi phạm phương châm về chất.',
      'Sai — câu vẫn đúng đề tài (nói về trâu), không vi phạm phương châm quan hệ.',
      'Sai — câu không thiếu lịch sự với người nghe.',
      'Đúng — "gia súc" đã bao hàm nghĩa "nuôi ở nhà" nên thông tin bị thừa, vi phạm phương châm về lượng.',
    ]),
  ]),

  M(10, 'Cách dẫn trực tiếp và cách dẫn gián tiếp', [
    Q('Dẫn trực tiếp là?', ['Nhắc lại nguyên văn lời/ý của người khác, đặt trong dấu ngoặc kép', 'Bỏ qua', 'Tóm tắt lại ý', 'Diễn đạt khác đi'], 0, 'Trích nguyên văn, có dấu hai chấm + dấu ngoặc kép.', [
      'Trong Tiếng Việt 9 có hai cách dẫn lời nói/ý nghĩ: <b>dẫn trực tiếp</b> và <b>dẫn gián tiếp</b>.',
      '<b>Cách dẫn trực tiếp</b>:',
      '<ul><li>Nhắc lại <b>nguyên văn</b> lời nói hay ý nghĩ của người/nhân vật.</li><li>Lời dẫn được đặt trong <b>dấu ngoặc kép</b>, thường có dấu hai chấm phía trước.</li></ul>',
      'Ví dụ: <code>Mẹ tôi nói: "Ngày mai con đi học sớm nhé!"</code>',
    ], [
      'Đúng — dẫn trực tiếp là nhắc lại nguyên văn lời/ý người khác, đặt trong dấu ngoặc kép.',
      'Sai — bỏ qua không phải khái niệm dẫn lời.',
      'Sai — tóm tắt, diễn đạt lại theo ý mình là dẫn gián tiếp, không phải trực tiếp.',
      'Sai — diễn đạt khác đi chính là đặc điểm của dẫn gián tiếp.',
    ]),
    Q('Dẫn gián tiếp là?', ['Thuật lại lời/ý theo cách của mình, có thể thay đổi từ ngữ', 'Đặt trong ngoặc kép', 'Hỏi lại', 'Trích nguyên văn'], 0, 'Thuật lại, không cần ngoặc kép, có thể thay đổi đại từ, từ ngữ.', [
      '<b>Cách dẫn gián tiếp</b> là thuật lại lời nói hay ý nghĩ của người khác theo cách diễn đạt của mình.',
      'Đặc điểm:',
      '<ul><li><b>Không</b> dùng dấu ngoặc kép.</li><li>Có thể <b>điều chỉnh từ ngữ</b>, đại từ xưng hô cho phù hợp; thường dùng từ "<code>rằng</code>", "<code>là</code>".</li><li>Phải <i>trung thành</i> với ý của người nói.</li></ul>',
      'Ví dụ: <code>Mẹ tôi bảo (rằng) ngày mai tôi đi học sớm.</code>',
    ], [
      'Đúng — dẫn gián tiếp là thuật lại lời/ý theo cách của mình, có thể thay đổi từ ngữ, không cần ngoặc kép.',
      'Sai — đặt trong ngoặc kép là dấu hiệu của dẫn trực tiếp.',
      'Sai — hỏi lại không phải khái niệm dẫn lời.',
      'Sai — trích nguyên văn là dẫn trực tiếp, không phải gián tiếp.',
    ]),
    Q('Câu nào sử dụng cách dẫn trực tiếp?', ['Mẹ tôi nhắc về việc đi học', 'Mẹ tôi bảo ngày mai tôi đi học sớm', 'Tôi đi học sớm', 'Mẹ tôi nói: "Ngày mai con đi học sớm nhé!"'], 3, 'Có dấu hai chấm + ngoặc kép trích nguyên văn lời mẹ.', [
      'Đây là dạng bài <b>nhận diện cách dẫn</b> qua dấu hiệu hình thức.',
      'Dấu hiệu của <b>dẫn trực tiếp</b>:',
      '<ul><li>Có <b>dấu hai chấm</b> (:) trước lời dẫn.</li><li>Lời dẫn được đặt trong <b>dấu ngoặc kép</b> (" ").</li><li>Giữ nguyên ngữ điệu, từ xưng hô của người nói.</li></ul>',
      'Câu "<code>Mẹ tôi nói: "Ngày mai con đi học sớm nhé!"</code>" hội đủ dấu hiệu trên ⇒ dẫn trực tiếp.',
    ], [
      'Sai — câu này chỉ thuật lại chung chung, không trích nguyên văn.',
      'Sai — đây là dẫn gián tiếp, không có dấu hai chấm và ngoặc kép.',
      'Sai — câu này không dẫn lời ai cả.',
      'Đúng — có dấu hai chấm và dấu ngoặc kép trích nguyên văn lời của mẹ, đúng cách dẫn trực tiếp.',
    ]),
    Q('Chuyển sang gián tiếp: "Anh hỏi: \'Em có khỏe không?\'" → ?', ['Anh hỏi: em khỏe.', 'Anh hỏi em có khỏe không.', 'Anh nói em khỏe.', 'Em khỏe không?'], 1, 'Bỏ ngoặc kép, đổi đại từ phù hợp, thường thêm "có … không" hoặc "rằng".', [
      'Đây là dạng bài <b>chuyển lời dẫn trực tiếp sang gián tiếp</b> — kĩ năng hay gặp trong đề thi.',
      'Các thao tác cần làm:',
      '<ul><li><b>Bỏ</b> dấu hai chấm và dấu ngoặc kép.</li><li><b>Đổi đại từ</b> xưng hô cho phù hợp.</li><li>Với câu hỏi, giữ nghĩa hỏi bằng cấu trúc "<code>có … không</code>" hoặc thêm "rằng/liệu".</li></ul>',
      'Kết quả đúng: "<code>Anh hỏi em có khỏe không.</code>" — vừa bỏ ngoặc kép, vừa giữ nguyên ý hỏi.',
    ], [
      'Sai — vẫn còn dấu hai chấm và làm sai nghĩa (biến câu hỏi thành câu khẳng định).',
      'Đúng — bỏ ngoặc kép, giữ nghĩa hỏi bằng cấu trúc "có … không", thuật lại gián tiếp đúng cách.',
      'Sai — đổi "hỏi" thành "nói… khỏe" làm mất sắc thái câu hỏi ban đầu.',
      'Sai — giữ nguyên câu hỏi trực tiếp, chưa chuyển thành lời dẫn gián tiếp.',
    ]),
    Q('Khi dẫn gián tiếp, cần lưu ý?', ['Không cần chính xác', 'Đảm bảo trung thành ý của người nói', 'Chỉ cần ngắn gọn', 'Thay đổi hoàn toàn'], 1, 'Có thể đổi từ nhưng phải trung thành với ý nghĩa gốc.', [
      'Khi dẫn gián tiếp, người dẫn được tự do về <i>hình thức</i> nhưng phải giữ đúng <i>nội dung</i>.',
      'Nguyên tắc:',
      '<ul><li>Có thể <b>thay đổi từ ngữ, đại từ</b> cho phù hợp ngữ cảnh.</li><li>Nhưng phải <b>trung thành với ý nghĩa gốc</b> — không được làm sai lệch lời người nói.</li></ul>',
      'Nếu thay đổi tùy tiện làm sai ý, đó là <b>dẫn sai</b> (có khi vi phạm cả phương châm về chất).',
    ], [
      'Sai — vẫn phải bảo đảm đúng ý người nói, không được tùy tiện.',
      'Đúng — có thể đổi từ ngữ nhưng phải trung thành với ý nghĩa gốc của người nói.',
      'Sai — ngắn gọn chưa đủ; cốt yếu là không làm sai ý.',
      'Sai — thay đổi hoàn toàn sẽ làm sai lệch ý người nói.',
    ]),
    Q('Lời dẫn trực tiếp trong tác phẩm văn học thường dùng để?', ['Trữ tình', 'Trang trí', 'Rút gọn', 'Tăng tính chân thực, sinh động, khắc họa tính cách nhân vật'], 3, 'Giúp người đọc cảm nhận trực tiếp ngữ điệu, tính cách nhân vật.', [
      'Trong văn tự sự, <b>lời dẫn trực tiếp</b> (lời thoại nhân vật) có vai trò nghệ thuật quan trọng.',
      'Tác dụng:',
      '<ul><li>Tăng <b>tính chân thực, sinh động</b> cho câu chuyện.</li><li>Giúp người đọc cảm nhận <i>trực tiếp</i> ngữ điệu, cách nói.</li><li><b>Khắc họa tính cách</b> nhân vật qua chính lời ăn tiếng nói của họ.</li></ul>',
      'Ví dụ lời ông Hai ("Làng"), lời anh thanh niên ("Lặng lẽ Sa Pa") đều bộc lộ rõ tính cách nhân vật.',
    ], [
      'Sai — mục đích không chỉ là trữ tình mà là khắc họa nhân vật chân thực.',
      'Sai — lời dẫn trực tiếp có chức năng nghệ thuật, không chỉ để trang trí.',
      'Sai — lời dẫn trực tiếp thường làm câu dài hơn, không nhằm rút gọn.',
      'Đúng — lời dẫn trực tiếp giúp người đọc cảm nhận trực tiếp ngữ điệu, tính cách nhân vật, tăng tính chân thực, sinh động.',
    ]),
  ]),

  M(11, 'Sự phát triển của từ vựng', [
    Q('Từ vựng tiếng Việt phát triển bằng các con đường nào?', ['Chỉ tạo từ mới', 'Chỉ vay mượn', 'Không phát triển', 'Phát triển nghĩa, tạo từ mới, vay mượn'], 3, '3 con đường chính: phát triển nghĩa, tạo từ mới (từ ghép, từ láy), vay mượn.', [
      'Từ vựng tiếng Việt <b>không ngừng vận động, phát triển</b> để đáp ứng nhu cầu giao tiếp và nhận thức của con người.',
      'Có <b>ba con đường</b> chính:',
      '<ul><li><b>Phát triển nghĩa</b> của từ (theo ẩn dụ, hoán dụ).</li><li><b>Tạo từ ngữ mới</b> (ghép, láy) — vd: <code>điện thoại di động</code>, <code>sở hữu trí tuệ</code>.</li><li><b>Vay mượn</b> từ tiếng nước ngoài (Hán, Anh, Pháp...).</li></ul>',
      'Đây là kiến thức nền của bài "Sự phát triển của từ vựng" (Tiếng Việt 9).',
    ], [
      'Sai — tạo từ mới chỉ là một trong ba con đường, chưa đầy đủ.',
      'Sai — vay mượn chỉ là một con đường, còn phát triển nghĩa và tạo từ mới.',
      'Sai — từ vựng luôn vận động, phát triển theo thời gian.',
      'Đúng — ba con đường chính: phát triển nghĩa của từ, tạo từ mới và vay mượn.',
    ]),
    Q('Từ "chân" trong "chân bàn" so với "chân người" là?', ['Phát triển nghĩa từ nghĩa gốc theo phương thức ẩn dụ', 'Không liên quan', 'Vay mượn', 'Từ Hán-Việt'], 0, 'Từ "chân" mở rộng nghĩa: từ nghĩa gốc (bộ phận cơ thể) → nghĩa chuyển (phần dưới đỡ vật).', [
      '<b>Phát triển nghĩa của từ</b> là con đường quan trọng: từ một nghĩa gốc, từ có thêm các nghĩa chuyển.',
      'Hai phương thức chuyển nghĩa:',
      '<ul><li><b>Ẩn dụ:</b> chuyển nghĩa dựa trên sự <i>giống nhau</i>.</li><li><b>Hoán dụ:</b> chuyển nghĩa dựa trên quan hệ <i>gần gũi</i>, đi đôi.</li></ul>',
      'Từ "<code>chân</code>": nghĩa gốc là bộ phận cơ thể; "chân bàn" là nghĩa chuyển theo <b>ẩn dụ</b> (giống ở vị trí dưới cùng, chức năng nâng đỡ).',
    ], [
      'Đúng — "chân bàn" là nghĩa chuyển từ "chân người" theo phương thức ẩn dụ (giống về vị trí, chức năng đỡ phần trên).',
      'Sai — hai nghĩa có liên hệ chặt chẽ qua sự chuyển nghĩa.',
      'Sai — "chân" là từ thuần Việt, không phải từ vay mượn.',
      'Sai — "chân" không phải từ Hán-Việt.',
    ]),
    Q('Từ "internet", "email", "PC" thuộc loại?', ['Từ Hán-Việt', 'Từ vay mượn (từ tiếng Anh)', 'Từ thuần Việt', 'Từ láy'], 1, 'Mượn từ tiếng Anh, biểu thị khái niệm công nghệ mới.', [
      '<b>Vay mượn</b> là con đường tiếng Việt tiếp nhận từ ngữ của các ngôn ngữ khác để gọi tên những sự vật, khái niệm mới.',
      'Nguồn vay mượn:',
      '<ul><li>Phần lớn từ <b>tiếng Hán</b> (từ Hán-Việt).</li><li>Một bộ phận từ <b>tiếng Anh, Pháp</b>...</li></ul>',
      'Các từ "<code>internet</code>", "<code>email</code>", "<code>PC</code>" mượn từ <b>tiếng Anh</b>, biểu thị những khái niệm công nghệ thông tin mới mẻ.',
    ], [
      'Sai — đây là từ gốc tiếng Anh, không phải từ Hán-Việt.',
      'Đúng — đều là từ vay mượn từ tiếng Anh, biểu thị các khái niệm công nghệ mới.',
      'Sai — không phải từ thuần Việt mà mượn nguyên từ tiếng Anh.',
      'Sai — đây không phải từ láy.',
    ]),
    Q('Tỷ lệ từ Hán-Việt trong tiếng Việt khoảng?', ['10%', '90%', '60–70%', '30%'], 2, 'Hơn 60% từ vựng có nguồn gốc Hán, hình thành qua nhiều thế kỷ tiếp xúc.', [
      '<b>Từ Hán-Việt</b> là bộ phận quan trọng nhất trong vốn từ vay mượn của tiếng Việt.',
      'Đặc điểm:',
      '<ul><li>Chiếm khoảng <code>60–70%</code> vốn từ tiếng Việt.</li><li>Hình thành qua nhiều thế kỉ <b>tiếp xúc văn hóa</b> Việt - Hán.</li><li>Thường mang sắc thái <i>trang trọng, khái quát</i> (vd: "phụ nữ", "quốc gia", "hi sinh").</li></ul>',
      'Hiểu nghĩa yếu tố Hán-Việt giúp giải nghĩa và dùng từ chính xác hơn.',
    ], [
      'Sai — tỷ lệ thấp như 10% không đúng; từ Hán-Việt chiếm phần lớn vốn từ.',
      'Sai — 90% là quá cao; còn nhiều từ thuần Việt và vay mượn khác.',
      'Đúng — khoảng 60–70% vốn từ có nguồn gốc Hán, hình thành qua nhiều thế kỷ tiếp xúc văn hóa.',
      'Sai — 30% là quá thấp so với thực tế.',
    ]),
    Q('Từ "smartphone" được tạo theo phương thức?', ['Từ thuần Việt', 'Vay mượn có cải biến', 'Vay mượn nguyên dạng', 'Phát triển nghĩa'], 2, 'Mượn nguyên dạng tiếng Anh, không Việt hóa.', [
      'Từ vay mượn tiếng Anh trong tiếng Việt có thể được <i>Việt hóa</i> hoặc <i>giữ nguyên dạng</i>.',
      'Phân biệt:',
      '<ul><li><b>Mượn nguyên dạng:</b> giữ nguyên cách viết tiếng Anh (vd: <code>smartphone</code>, <code>laptop</code>).</li><li><b>Vay mượn có cải biến:</b> phiên âm/Việt hóa cách viết (vd: <i>xà phòng</i> &lt; savon, <i>ga</i> &lt; gare).</li></ul>',
      'Từ "<code>smartphone</code>" được dùng nguyên dạng tiếng Anh ⇒ thuộc kiểu <b>vay mượn nguyên dạng</b>.',
    ], [
      'Sai — đây là từ gốc tiếng Anh, không phải thuần Việt.',
      'Sai — từ này được giữ nguyên dạng, không bị cải biến cách viết.',
      'Đúng — mượn nguyên dạng tiếng Anh, không Việt hóa hình thức.',
      'Sai — đây là từ mượn mới, không phải mở rộng nghĩa của từ có sẵn.',
    ]),
    Q('Từ "kinh tế" trong tiếng Việt là?', ['Từ láy', 'Từ Hán-Việt (kinh thế tế dân)', 'Từ vay mượn từ Anh', 'Từ thuần Việt'], 1, '"Kinh tế" bắt nguồn từ "kinh bang tế thế" trong tiếng Hán cổ.', [
      'Nhiều từ Hán-Việt ngày nay đã có nghĩa <b>thu hẹp</b> hoặc <b>thay đổi</b> so với nghĩa gốc trong tiếng Hán.',
      'Trường hợp từ "<code>kinh tế</code>":',
      '<ul><li>Là <b>từ Hán-Việt</b>, bắt nguồn từ "<i>kinh bang tế thế</i>" / "<i>kinh thế tế dân</i>" (trị nước, cứu đời, giúp dân).</li><li>Ngày nay nghĩa đã <b>thu hẹp</b>, chỉ hoạt động sản xuất, trao đổi của cải vật chất.</li></ul>',
      'Đây cũng là một biểu hiện của sự <b>phát triển nghĩa của từ</b>.',
    ], [
      'Sai — "kinh tế" không phải từ láy (hai tiếng không láy âm, không có quan hệ ngữ âm).',
      'Đúng — "kinh tế" là từ Hán-Việt, bắt nguồn từ "kinh bang tế thế" / "kinh thế tế dân".',
      'Sai — đây là từ gốc Hán, không phải mượn từ tiếng Anh.',
      'Sai — "kinh tế" có nguồn gốc Hán, không phải từ thuần Việt.',
    ]),
  ]),

  M(12, 'Văn bản thuyết minh có yếu tố nghệ thuật', [
    Q('Văn bản thuyết minh là loại văn?', ['Bàn luận', 'Cung cấp tri thức khách quan về sự vật, hiện tượng', 'Bộc lộ cảm xúc', 'Kể chuyện'], 1, 'Mục đích: trình bày, giới thiệu, giải thích để người đọc hiểu rõ đối tượng.', [
      'Cần phân biệt <b>văn thuyết minh</b> với các kiểu văn bản khác đã học.',
      'Đặc trưng văn thuyết minh:',
      '<ul><li>Mục đích: <b>cung cấp tri thức khách quan</b> về đặc điểm, tính chất, công dụng... của sự vật, hiện tượng.</li><li>Yêu cầu: <i>chính xác, khách quan</i>, hữu ích.</li></ul>',
      'So sánh: nghị luận thì <i>bàn luận</i>, biểu cảm thì <i>bộc lộ cảm xúc</i>, tự sự thì <i>kể chuyện</i>.',
    ], [
      'Sai — bàn luận, thuyết phục là đặc trưng của văn nghị luận.',
      'Đúng — văn thuyết minh cung cấp tri thức khách quan, giúp người đọc hiểu rõ sự vật, hiện tượng.',
      'Sai — bộc lộ cảm xúc là đặc trưng của văn biểu cảm.',
      'Sai — kể chuyện là đặc trưng của văn tự sự.',
    ]),
    Q('Yếu tố nghệ thuật trong văn thuyết minh có vai trò?', ['Làm bài văn sinh động, hấp dẫn hơn nhưng vẫn đảm bảo tính khoa học', 'Thay thế thông tin', 'Không có vai trò', 'Phá vỡ tính khách quan'], 0, 'Kể chuyện, miêu tả, đối thoại… giúp bài văn thu hút mà vẫn chính xác.', [
      'Bài "Sử dụng một số biện pháp nghệ thuật trong văn bản thuyết minh" (Ngữ văn 9) đề cập việc <b>kết hợp yếu tố nghệ thuật</b>.',
      'Các yếu tố nghệ thuật có thể dùng:',
      '<ul><li><b>Kể chuyện, miêu tả, tự thuật, đối thoại, ẩn dụ, nhân hóa...</b></li><li>Vai trò: làm bài thuyết minh <b>sinh động, hấp dẫn</b> hơn.</li></ul>',
      '⚠️ Lưu ý: yếu tố nghệ thuật chỉ là <i>phụ trợ</i>, không được làm mờ hay phá vỡ <b>tính khoa học, chính xác</b> của tri thức.',
    ], [
      'Đúng — kể chuyện, miêu tả, đối thoại… làm bài thuyết minh sinh động, hấp dẫn mà vẫn giữ tính khoa học.',
      'Sai — yếu tố nghệ thuật hỗ trợ chứ không thay thế thông tin tri thức.',
      'Sai — yếu tố nghệ thuật có vai trò làm bài văn cuốn hút hơn.',
      'Sai — nếu lạm dụng mới phá vỡ tính khách quan; dùng đúng mức vẫn giữ tính khoa học.',
    ]),
    Q('Khi thuyết minh về một di tích lịch sử, cần?', ['Chỉ bộc lộ cảm xúc', 'Chỉ kể chuyện', 'Chỉ tả vẻ đẹp', 'Nêu vị trí, lịch sử, kiến trúc, giá trị + có thể kèm câu chuyện liên quan'], 3, 'Kết hợp thông tin xác thực + yếu tố biểu cảm phù hợp.', [
      'Khi thuyết minh về một <b>đối tượng cụ thể</b>, cần xác định đúng các tri thức cần cung cấp.',
      'Với một <b>di tích lịch sử</b>, cần nêu:',
      '<ul><li><b>Vị trí</b>, không gian địa lí.</li><li><b>Lịch sử</b> hình thành, các sự kiện gắn liền.</li><li><b>Kiến trúc</b>, đặc điểm nổi bật.</li><li><b>Giá trị</b> lịch sử, văn hóa.</li></ul>',
      'Có thể lồng ghép một <i>câu chuyện, truyền thuyết</i> liên quan để bài thêm hấp dẫn, nhưng phải xác thực.',
    ], [
      'Sai — chỉ bộc lộ cảm xúc sẽ thiếu tri thức khách quan về di tích.',
      'Sai — chỉ kể chuyện không cung cấp đủ thông tin thuyết minh.',
      'Sai — chỉ tả vẻ đẹp là thiên về miêu tả, thiếu tri thức về di tích.',
      'Đúng — cần nêu vị trí, lịch sử, kiến trúc, giá trị; có thể kèm câu chuyện để hấp dẫn nhưng vẫn xác thực.',
    ]),
    Q('Văn bản "Hạ Long — đá và nước" sử dụng phương pháp thuyết minh nào nổi bật?', ['Miêu tả + tưởng tượng', 'Liệt kê', 'So sánh', 'Thống kê'], 0, 'Tác giả miêu tả + tưởng tượng để Hạ Long hiện lên sống động, có hồn.', [
      '<b>"Hạ Long — đá và nước"</b> (Nguyên Ngọc) là văn bản thuyết minh mẫu mực có <i>kết hợp biện pháp nghệ thuật</i>.',
      'Phương pháp nổi bật:',
      '<ul><li><b>Miêu tả</b> kết hợp <b>tưởng tượng, liên tưởng</b>: đá và nước Hạ Long hiện lên sống động, "có hồn", biến hóa khôn lường.</li><li>Dùng cả <i>nhân hóa, ẩn dụ</i> để gợi vẻ đẹp kì thú của thiên nhiên.</li></ul>',
      'Nhờ đó, tri thức về Hạ Long không khô khan mà giàu sức gợi, hấp dẫn người đọc.',
    ], [
      'Đúng — tác giả kết hợp miêu tả và tưởng tượng để Hạ Long hiện lên sống động, có hồn.',
      'Sai — liệt kê không phải nét nổi bật làm nên sức gợi của văn bản này.',
      'Sai — so sánh có dùng nhưng không phải phương pháp nổi bật nhất ở đây.',
      'Sai — văn bản không thiên về thống kê số liệu.',
    ]),
    Q('Yêu cầu của văn thuyết minh là?', ['Chính xác, khách quan, rõ ràng', 'Biểu cảm mạnh', 'Giàu hình ảnh tưởng tượng, ẩn dụ', 'Hư cấu'], 0, 'Đảm bảo tính khoa học là yêu cầu hàng đầu.', [
      '<b>Tính khoa học</b> là yêu cầu hàng đầu, cốt lõi của văn thuyết minh.',
      'Ba yêu cầu cơ bản:',
      '<ul><li><b>Chính xác:</b> tri thức đúng với thực tế.</li><li><b>Khách quan:</b> không pha trộn cảm xúc, ý kiến chủ quan.</li><li><b>Rõ ràng:</b> trình bày mạch lạc, dễ hiểu.</li></ul>',
      'Dù có dùng yếu tố nghệ thuật, văn thuyết minh tuyệt đối <b>không được hư cấu</b> như văn tự sự.',
    ], [
      'Đúng — văn thuyết minh phải chính xác, khách quan, rõ ràng — đó là tính khoa học hàng đầu.',
      'Sai — biểu cảm mạnh là yêu cầu của văn biểu cảm.',
      'Sai — giàu hình ảnh, ẩn dụ là đặc trưng của văn nghệ thuật, không phải yêu cầu cốt lõi của thuyết minh.',
      'Sai — văn thuyết minh phản ánh sự thật, không hư cấu.',
    ]),
    Q('Phương pháp thuyết minh nào dùng để giới thiệu số liệu cụ thể?', ['Nêu ví dụ', 'Liệt kê', 'Phân loại', 'Dùng số liệu/thống kê'], 3, 'Số liệu tăng độ tin cậy, sức thuyết phục.', [
      'Văn thuyết minh có nhiều <b>phương pháp</b> để làm rõ đối tượng (đã học từ lớp 8).',
      'Một số phương pháp thường gặp:',
      '<ul><li><b>Nêu định nghĩa, giải thích.</b></li><li><b>Liệt kê, nêu ví dụ.</b></li><li><b>Phân loại, phân tích.</b></li><li><b>Dùng số liệu (thống kê)</b> — đưa con số cụ thể.</li></ul>',
      'Để giới thiệu <i>số liệu cụ thể</i> (diện tích, dân số, sản lượng...), ta dùng phương pháp <b>dùng số liệu/thống kê</b> ⇒ tăng độ tin cậy.',
    ], [
      'Sai — nêu ví dụ nhằm minh họa, không phải phương pháp đưa số liệu.',
      'Sai — liệt kê là kể ra hàng loạt đặc điểm, không nhất thiết kèm số liệu.',
      'Sai — phân loại là chia đối tượng thành các nhóm, không phải đưa số liệu.',
      'Đúng — dùng số liệu/thống kê là phương pháp giới thiệu con số cụ thể, tăng độ tin cậy và sức thuyết phục.',
    ]),
  ]),

  M(13, 'Văn tự sự kết hợp miêu tả nội tâm', [
    Q('Miêu tả nội tâm trong văn tự sự là?', ['Tả ngoại hình', 'Tả cảnh vật', 'Tái hiện ý nghĩ, cảm xúc, suy tư của nhân vật', 'Kể sự việc'], 2, 'Khắc họa thế giới bên trong nhân vật.', [
      '<b>Miêu tả nội tâm</b> là một yếu tố quan trọng trong văn tự sự hiện đại (Ngữ văn 9).',
      'Khái niệm:',
      '<ul><li>Là <b>tái hiện những ý nghĩ, cảm xúc, suy tư</b> diễn ra bên trong nhân vật.</li><li>Khác với tả <i>ngoại hình</i> (bên ngoài), tả <i>cảnh</i> (ngoại cảnh).</li></ul>',
      'Miêu tả nội tâm giúp khắc họa <b>thế giới tinh thần</b>, làm nhân vật có chiều sâu và sống động.',
    ], [
      'Sai — tả ngoại hình là miêu tả bên ngoài, không phải nội tâm.',
      'Sai — tả cảnh vật là miêu tả ngoại cảnh, không phải thế giới bên trong nhân vật.',
      'Đúng — miêu tả nội tâm là tái hiện ý nghĩ, cảm xúc, suy tư bên trong nhân vật.',
      'Sai — kể sự việc là thuật lại diễn biến, không phải khắc họa nội tâm.',
    ]),
    Q('Có những cách miêu tả nội tâm nào?', ['Trực tiếp (kể ra suy nghĩ) và gián tiếp (qua hành động, cử chỉ, nét mặt)', 'Không có cách nào', 'Chỉ gián tiếp', 'Chỉ trực tiếp'], 0, 'Trực tiếp: kể thẳng; gián tiếp: ngoại hiện qua hành động.', [
      'Có <b>hai cách</b> miêu tả nội tâm nhân vật.',
      'Phân biệt:',
      '<ul><li><b>Trực tiếp:</b> diễn tả thẳng những ý nghĩ, cảm xúc, tình cảm của nhân vật.</li><li><b>Gián tiếp:</b> miêu tả nội tâm <i>thông qua</i> cảnh vật, nét mặt, cử chỉ, hành động.</li></ul>',
      'Hai cách này thường được kết hợp linh hoạt để khắc họa nhân vật sâu sắc hơn.',
    ], [
      'Đúng — có hai cách: trực tiếp (kể thẳng ý nghĩ, cảm xúc) và gián tiếp (qua hành động, cử chỉ, nét mặt).',
      'Sai — có những cách miêu tả nội tâm rõ ràng đã được học.',
      'Sai — ngoài gián tiếp còn có cách trực tiếp kể thẳng nội tâm.',
      'Sai — ngoài trực tiếp còn có cách gián tiếp qua hành động, cử chỉ.',
    ]),
    Q('Đoạn "ông Hai vò đầu bứt tai, lẩm bẩm…" trong "Làng" sử dụng cách miêu tả nội tâm?', ['Không miêu tả nội tâm, chỉ kể sự việc', 'Trực tiếp', 'Gián tiếp qua hành động', 'Tả ngoại hình'], 2, 'Miêu tả hành động vò đầu bứt tai ⇒ thể hiện nội tâm rối bời.', [
      'Đây là dạng bài <b>nhận diện cách miêu tả nội tâm</b> qua ví dụ cụ thể.',
      'Phân tích đoạn "ông Hai vò đầu bứt tai, lẩm bẩm…":',
      '<ul><li>Tác giả không kể thẳng suy nghĩ của ông Hai.</li><li>Mà mô tả <b>hành động, cử chỉ</b> ("vò đầu bứt tai", "lẩm bẩm") ⇒ để người đọc tự cảm nhận tâm trạng <i>rối bời, lo lắng</i>.</li></ul>',
      'Đó là cách miêu tả nội tâm <b>gián tiếp qua hành động</b>.',
    ], [
      'Sai — đoạn này có miêu tả nội tâm thông qua hành động.',
      'Sai — không kể thẳng suy nghĩ mà bộc lộ qua cử chỉ nên không phải trực tiếp.',
      'Đúng — qua hành động "vò đầu bứt tai, lẩm bẩm", tác giả gián tiếp thể hiện nội tâm rối bời của ông Hai.',
      'Sai — đây không phải tả ngoại hình mà bộc lộ tâm trạng qua cử chỉ.',
    ]),
    Q('Miêu tả nội tâm giúp?', ['Không có ích', 'Ngắt mạch truyện', 'Bài văn dài hơn', 'Nhân vật trở nên sống động, có chiều sâu tâm hồn'], 3, 'Nhân vật có "linh hồn", lay động cảm xúc người đọc.', [
      '<b>Vai trò</b> của miêu tả nội tâm là điều cần ghi nhớ khi học văn tự sự lớp 9.',
      'Tác dụng:',
      '<ul><li>Khắc họa <b>chiều sâu tâm hồn</b>, tính cách nhân vật.</li><li>Làm nhân vật <b>sống động</b>, có "linh hồn", chân thực hơn.</li><li>Khơi gợi sự đồng cảm, lay động cảm xúc người đọc.</li></ul>',
      'Nhờ miêu tả nội tâm, các nhân vật như ông Hai, anh thanh niên, bé Thu... trở nên gần gũi, đáng nhớ.',
    ], [
      'Sai — miêu tả nội tâm rất có ích trong việc khắc họa nhân vật.',
      'Sai — miêu tả nội tâm hòa vào mạch truyện chứ không ngắt mạch.',
      'Sai — mục đích là khắc họa chiều sâu nhân vật, không phải kéo dài bài văn.',
      'Đúng — miêu tả nội tâm khiến nhân vật sống động, có chiều sâu tâm hồn, lay động người đọc.',
    ]),
    Q('Trong kể chuyện, đoạn độc thoại nội tâm thường?', ['Phải đặt trong ngoặc kép', 'Đặt sau gạch đầu dòng hoặc trong dấu ngoặc kép, có khi không dấu', 'Không cần dấu', 'Đặt trong dấu ngoặc đơn'], 1, 'Tùy phong cách tác giả; phổ biến là gạch đầu dòng hoặc dùng "nghĩ thầm:".', [
      '<b>Độc thoại nội tâm</b> là lời nhân vật tự nói với chính mình trong tâm trí — một cách miêu tả nội tâm trực tiếp.',
      'Cách trình bày trong văn bản:',
      '<ul><li>Có khi đặt sau <b>gạch đầu dòng</b> (như độc thoại có lời).</li><li>Có khi đặt trong <b>dấu ngoặc kép</b> kèm "nghĩ thầm", "tự nhủ".</li><li>Có khi <i>không dùng dấu</i>, hòa vào lời kể.</li></ul>',
      'Cách trình bày <b>linh hoạt</b> tùy phong cách tác giả, miễn người đọc nhận ra đó là tiếng nói nội tâm.',
    ], [
      'Sai — không bắt buộc phải đặt trong ngoặc kép; cách trình bày linh hoạt.',
      'Đúng — tùy phong cách tác giả, độc thoại nội tâm có thể đặt sau gạch đầu dòng, trong ngoặc kép, đôi khi không dùng dấu.',
      'Sai — không phải luôn không dùng dấu; cách trình bày đa dạng.',
      'Sai — dấu ngoặc đơn thường dùng cho chú thích, không phải độc thoại nội tâm.',
    ]),
    Q('Yếu tố nội tâm quan trọng nhất với thể loại?', ['Truyện ngắn, tiểu thuyết', 'Báo cáo', 'Văn bản hành chính', 'Thơ lục bát'], 0, 'Truyện hiện đại đặc biệt chú trọng khắc họa nội tâm.', [
      'Yếu tố miêu tả nội tâm gắn bó mật thiết với một số <b>thể loại văn học</b> nhất định.',
      'Phân tích:',
      '<ul><li><b>Truyện ngắn, tiểu thuyết hiện đại</b> đặc biệt chú trọng khắc họa nội tâm nhân vật.</li><li>Trong khi đó, <i>báo cáo, văn bản hành chính</i> mang tính khuôn mẫu, khách quan, không miêu tả nội tâm.</li></ul>',
      'Vì vậy, kĩ năng miêu tả nội tâm quan trọng nhất với <b>truyện ngắn, tiểu thuyết</b>.',
    ], [
      'Đúng — truyện ngắn, tiểu thuyết hiện đại đặc biệt chú trọng khắc họa nội tâm nhân vật.',
      'Sai — báo cáo là văn bản thông tin, không chú trọng nội tâm.',
      'Sai — văn bản hành chính mang tính khuôn mẫu, không miêu tả nội tâm.',
      'Sai — thơ lục bát thiên về trữ tình, nhưng yếu tố nội tâm nhân vật là đặc trưng của truyện hơn cả.',
    ]),
  ]),

  M(14, 'Truyện Kiều — Nguyễn Du (giới thiệu)', [
    Q('"Truyện Kiều" còn có tên gọi nào?', ['Đoạn trường tân thanh', 'Lục Vân Tiên', 'Cung oán ngâm', 'Chinh phụ ngâm'], 0, '"Đoạn trường tân thanh" — "Tiếng kêu mới đứt ruột".', [
      '<b>"Truyện Kiều"</b> là kiệt tác của <b>Nguyễn Du</b>, đỉnh cao của văn học trung đại Việt Nam.',
      'Về tên gọi tác phẩm:',
      '<ul><li>Tên chữ Hán: <b>"Đoạn trường tân thanh"</b> (nghĩa là "<i>tiếng kêu mới đứt ruột</i>").</li><li>Tên quen thuộc dân gian gọi: <b>"Truyện Kiều"</b> (theo tên nhân vật chính Thúy Kiều).</li></ul>',
      'Cần phân biệt với các truyện thơ Nôm khác: "Lục Vân Tiên" (Nguyễn Đình Chiểu), "Chinh phụ ngâm" (Đặng Trần Côn), "Cung oán ngâm" (Nguyễn Gia Thiều).',
    ], [
      'Đúng — tên chữ Hán của Truyện Kiều là "Đoạn trường tân thanh" (tiếng kêu mới đứt ruột).',
      'Sai — "Lục Vân Tiên" là truyện thơ của Nguyễn Đình Chiểu, không liên quan Truyện Kiều.',
      'Sai — "Cung oán ngâm khúc" là tác phẩm của Nguyễn Gia Thiều.',
      'Sai — "Chinh phụ ngâm" là tác phẩm của Đặng Trần Côn (Đoàn Thị Điểm dịch).',
    ]),
    Q('Tác phẩm gốc của Truyện Kiều là?', ['Kim Vân Kiều truyện (Thanh Tâm Tài Nhân)', 'Tam Quốc Diễn Nghĩa', 'Hồng Lâu Mộng', 'Tây Du Ký'], 0, 'Nguyễn Du sáng tạo từ tiểu thuyết "Kim Vân Kiều truyện" của Thanh Tâm Tài Nhân (TQ).', [
      'Truyện Kiều có <b>nguồn gốc</b> từ một tác phẩm văn xuôi của Trung Quốc, nhưng Nguyễn Du đã <i>sáng tạo lại</i> thành kiệt tác.',
      'Về nguồn gốc:',
      '<ul><li>Cốt truyện mượn từ tiểu thuyết <b>"Kim Vân Kiều truyện"</b> của <b>Thanh Tâm Tài Nhân</b> (Trung Quốc).</li><li>Nguyễn Du đã <b>sáng tạo</b>: chuyển sang thơ lục bát, nâng tầm tư tưởng - nghệ thuật, đậm tinh thần dân tộc.</li></ul>',
      'Vì thế, dù vay mượn cốt truyện, Truyện Kiều vẫn là <i>sáng tạo lớn</i> của thiên tài Nguyễn Du.',
    ], [
      'Đúng — Nguyễn Du dựa trên cốt truyện "Kim Vân Kiều truyện" của Thanh Tâm Tài Nhân (Trung Quốc) để sáng tạo.',
      'Sai — "Tam Quốc Diễn Nghĩa" của La Quán Trung, không liên quan Truyện Kiều.',
      'Sai — "Hồng Lâu Mộng" của Tào Tuyết Cần, không phải nguồn gốc Truyện Kiều.',
      'Sai — "Tây Du Ký" của Ngô Thừa Ân, không phải tác phẩm gốc.',
    ]),
    Q('Truyện Kiều viết bằng thể thơ?', ['Song thất lục bát', 'Lục bát', 'Thơ tự do, không gò bó vần luật', 'Thất ngôn'], 1, '3 254 câu lục bát.', [
      'Truyện Kiều là <b>truyện thơ Nôm</b> viết bằng thể thơ dân tộc.',
      'Đặc điểm thể loại:',
      '<ul><li>Viết bằng thể thơ <b>lục bát</b> (câu 6 - câu 8 xen kẽ).</li><li>Gồm <code>3 254</code> câu thơ lục bát.</li><li>Sử dụng chữ <b>Nôm</b> — chữ viết của dân tộc.</li></ul>',
      'Việc dùng lục bát và chữ Nôm cho thấy Nguyễn Du đã đưa <i>ngôn ngữ và thể thơ dân tộc</i> lên đỉnh cao nghệ thuật.',
    ], [
      'Sai — Truyện Kiều không theo thể song thất lục bát.',
      'Đúng — Truyện Kiều gồm 3 254 câu thơ lục bát.',
      'Sai — Truyện Kiều tuân thủ chặt chẽ vần luật lục bát, không phải thơ tự do.',
      'Sai — thất ngôn là thể thơ 7 chữ; Truyện Kiều là lục bát (6-8 chữ).',
    ]),
    Q('Giá trị nội dung lớn nhất của Truyện Kiều?', ['Sử thi', 'Tôn giáo', 'Giá trị hiện thực và nhân đạo sâu sắc', 'Trào phúng'], 2, 'Phê phán xã hội phong kiến + đề cao quyền sống, hạnh phúc con người.', [
      'Truyện Kiều có hai giá trị nội dung lớn: <b>giá trị hiện thực</b> và <b>giá trị nhân đạo</b>.',
      'Cụ thể:',
      '<ul><li><b>Giá trị hiện thực:</b> phơi bày, <i>phê phán</i> xã hội phong kiến bất công, tàn bạo chà đạp con người (bọn quan lại, buôn người, đồng tiền).</li><li><b>Giá trị nhân đạo:</b> niềm cảm thương sâu sắc với số phận con người; <i>đề cao</i> quyền sống, khát vọng tự do, công lí, tình yêu và hạnh phúc.</li></ul>',
      'Đây là nội dung cốt lõi làm nên tầm vóc nhân văn của kiệt tác.',
    ], [
      'Sai — Truyện Kiều không phải tác phẩm sử thi.',
      'Sai — giá trị cốt lõi không phải tôn giáo.',
      'Đúng — giá trị hiện thực (phê phán xã hội phong kiến) và nhân đạo (đề cao quyền sống, hạnh phúc con người).',
      'Sai — Truyện Kiều mang cảm hứng nhân đạo bi thương, không phải trào phúng.',
    ]),
    Q('Số phận Thúy Kiều là điển hình cho?', ['Anh hùng dân tộc', 'Người phụ nữ tài hoa, bạc mệnh trong xã hội phong kiến', 'Nông dân', 'Trí thức nho học'], 1, 'Tài sắc vẹn toàn nhưng bị xã hội vùi dập ⇒ chủ đề "hồng nhan bạc mệnh".', [
      '<b>Thúy Kiều</b> là hình tượng trung tâm, mang ý nghĩa <i>điển hình</i> cho thân phận con người trong xã hội cũ.',
      'Số phận Kiều tiêu biểu cho:',
      '<ul><li>Người <b>phụ nữ tài sắc vẹn toàn</b> nhưng bị xã hội phong kiến vùi dập.</li><li>Bi kịch "<b>hồng nhan bạc mệnh</b>", "tài mệnh tương đố".</li></ul>',
      'Qua Kiều, Nguyễn Du gửi gắm niềm thương cảm và tiếng nói đòi quyền sống cho con người, nhất là người phụ nữ.',
    ], [
      'Sai — Thúy Kiều không phải hình tượng anh hùng dân tộc.',
      'Đúng — Kiều tài sắc vẹn toàn nhưng bị xã hội phong kiến vùi dập, điển hình cho "hồng nhan bạc mệnh".',
      'Sai — Kiều xuất thân con nhà nho trung lưu, không phải hình tượng người nông dân.',
      'Sai — Kiều là người phụ nữ tài hoa bạc mệnh, không phải đại diện trí thức nho học.',
    ]),
    Q('Nguyễn Du sống ở thời kỳ nào?', ['Nhà Trần', 'Cuối Lê đầu Nguyễn (cuối 18 - đầu 19)', 'Nhà Tây Sơn xa xưa', 'Đầu nhà Lý'], 1, 'Nguyễn Du (1765–1820), chứng kiến biến động lớn cuối Lê - Tây Sơn - Nguyễn.', [
      'Hiểu <b>thời đại</b> của Nguyễn Du giúp lí giải tư tưởng nhân đạo và cảm hứng "đau đời" trong Truyện Kiều.',
      'Về tác giả:',
      '<ul><li><b>Nguyễn Du</b> (<code>1765–1820</code>), tên chữ Tố Như, hiệu Thanh Hiên, quê Tiên Điền - Hà Tĩnh.</li><li>Sống vào giai đoạn <b>cuối Lê - đầu Nguyễn</b>, một thời kì <i>lịch sử đầy biến động</i> (Lê - Tây Sơn - Nguyễn).</li></ul>',
      'Những thăng trầm thời đại và cuộc đời từng trải đã hun đúc nên tấm lòng nhân đạo bao la của ông.',
    ], [
      'Sai — nhà Trần ở thế kỷ XIII–XIV, quá sớm so với Nguyễn Du.',
      'Đúng — Nguyễn Du (1765–1820) sống cuối Lê - đầu Nguyễn, chứng kiến biến động lớn cuối Lê - Tây Sơn - Nguyễn.',
      'Sai — Nguyễn Du sống vắt qua thời Tây Sơn nhưng đó không phải "xa xưa"; ông là người cùng thời.',
      'Sai — nhà Lý ở thế kỷ XI–XIII, quá sớm.',
    ]),
  ]),

  M(15, 'Chị em Thuý Kiều (trích Truyện Kiều)', [
    Q('Đoạn "Chị em Thuý Kiều" giới thiệu nhân vật nào?', ['Kim Trọng', 'Thúy Vân và Thúy Kiều', 'Từ Hải', 'Mã Giám Sinh'], 1, 'Giới thiệu hai chị em Thúy Vân (em) và Thúy Kiều (chị).', [
      'Đoạn trích <b>"Chị em Thúy Kiều"</b> nằm ở phần <i>đầu</i> Truyện Kiều ("Gặp gỡ và đính ước").',
      'Nội dung đoạn trích:',
      '<ul><li>Giới thiệu vẻ đẹp <b>hai chị em</b>: <b>Thúy Vân</b> (em) và <b>Thúy Kiều</b> (chị).</li><li>Theo trình tự: tả khái quát ⇒ tả Vân ⇒ tả Kiều ⇒ nhận xét chung.</li></ul>',
      'Các nhân vật Kim Trọng, Từ Hải, Mã Giám Sinh xuất hiện ở những đoạn khác sau này.',
    ], [
      'Sai — Kim Trọng xuất hiện ở đoạn khác (gặp gỡ buổi du xuân), không phải đoạn này.',
      'Đúng — đoạn trích giới thiệu hai chị em Thúy Vân (em) và Thúy Kiều (chị).',
      'Sai — Từ Hải là người anh hùng Kiều gặp về sau, không thuộc đoạn này.',
      'Sai — Mã Giám Sinh là kẻ lừa mua Kiều, xuất hiện ở đoạn khác.',
    ]),
    Q('Câu "Mai cốt cách, tuyết tinh thần" miêu tả?', ['Vẻ đẹp cụ thể của Vân', 'Cảnh thiên nhiên', 'Tâm trạng buồn', 'Vẻ đẹp thanh cao của hai chị em'], 3, 'Khái quát vẻ đẹp tinh thần: cốt cách như mai, tinh thần như tuyết.', [
      'Câu "<b>Mai cốt cách, tuyết tinh thần</b>" là câu thơ <i>tả khái quát</i> vẻ đẹp chung của hai chị em.',
      'Nghệ thuật <b>ước lệ tượng trưng</b>:',
      '<ul><li>"<code>Mai cốt cách</code>" — dáng vẻ thanh tao, mảnh dẻ như cây mai.</li><li>"<code>Tuyết tinh thần</code>" — tâm hồn trong trắng, tinh khôi như tuyết.</li></ul>',
      'Cả hai chị em đều mang vẻ đẹp <b>duyên dáng, thanh cao, hoàn hảo</b> ("Mười phân vẹn mười").',
    ], [
      'Sai — câu này khái quát chung cho cả hai chị em, không riêng Vân.',
      'Sai — mai, tuyết ở đây là hình ảnh ước lệ tả người, không phải tả cảnh.',
      'Sai — câu không nói về tâm trạng buồn mà ca ngợi vẻ đẹp.',
      'Đúng — khái quát vẻ đẹp thanh cao của hai chị em: cốt cách như mai, tinh thần trong trắng như tuyết.',
    ]),
    Q('Vẻ đẹp Thúy Vân được miêu tả qua các câu?', ['Hồng nhan bạc mệnh', 'Làn thu thủy nét xuân sơn', 'Mai cốt cách', 'Khuôn trăng đầy đặn, nét ngài nở nang…'], 3, '"Khuôn trăng đầy đặn… mây thua nước tóc, tuyết nhường màu da" — đẹp đoan trang phúc hậu.', [
      '<b>Thúy Vân</b> được Nguyễn Du tả trước, làm <i>nền</i> để tôn lên vẻ đẹp của Kiều.',
      'Vẻ đẹp Thúy Vân:',
      '<ul><li>"<code>Khuôn trăng đầy đặn, nét ngài nở nang</code>" — gương mặt tròn đầy, phúc hậu.</li><li>"<code>Mây thua nước tóc, tuyết nhường màu da</code>" — vẻ đẹp đoan trang khiến thiên nhiên <b>"thua", "nhường"</b>.</li></ul>',
      'Vẻ đẹp ấy <i>hài hòa</i> với thiên nhiên ⇒ dự báo cuộc đời Vân êm đềm, suôn sẻ.',
    ], [
      'Sai — "hồng nhan bạc mệnh" là quan niệm về số phận, không phải câu tả Vân.',
      'Sai — "làn thu thủy nét xuân sơn" là câu tả Thúy Kiều, không phải Vân.',
      'Sai — "mai cốt cách" là câu khái quát chung cả hai chị em.',
      'Đúng — "khuôn trăng đầy đặn, nét ngài nở nang… mây thua nước tóc, tuyết nhường màu da" tả vẻ đoan trang, phúc hậu của Vân.',
    ]),
    Q('Vẻ đẹp Thúy Kiều được miêu tả?', ['Mạnh mẽ', 'Phúc hậu hiền lành', 'Trầm tư', 'Sắc sảo mặn mà hơn, "làn thu thủy nét xuân sơn", có tài thơ ca cầm kỳ'], 3, 'Kiều đẹp sắc sảo + có tài: thơ, vẽ, đàn, hát.', [
      'Tả Kiều, Nguyễn Du dùng thủ pháp <b>đòn bẩy</b>: tả Vân trước để làm nổi bật Kiều sau ("Kiều càng sắc sảo mặn mà").',
      'Vẻ đẹp và tài năng của Kiều:',
      '<ul><li><b>Nhan sắc:</b> "<code>Làn thu thủy, nét xuân sơn</code>" — đôi mắt trong như nước mùa thu, lông mày tươi như dáng núi mùa xuân.</li><li><b>Tài năng:</b> "<i>cầm, kì, thi, họa</i>" — đặc biệt là tài đàn (Bạc mệnh), đạt mức "vốn sẵn tính trời".</li></ul>',
      'Kiều đẹp <b>sắc sảo, mặn mà</b>, lại tài hoa hơn người — vẹn cả sắc lẫn tài.',
    ], [
      'Sai — vẻ đẹp Kiều là sắc sảo mặn mà, không phải nét mạnh mẽ.',
      'Sai — phúc hậu hiền lành là nét tả Thúy Vân, không phải Kiều.',
      'Sai — "trầm tư" không phải đặc điểm được tả ở Kiều trong đoạn này.',
      'Đúng — Kiều sắc sảo mặn mà, "làn thu thủy nét xuân sơn", lại tài hoa cầm kỳ thi họa vẹn toàn.',
    ]),
    Q('Nghệ thuật chủ đạo trong đoạn này?', ['Châm biếm', 'Ước lệ tượng trưng — lấy thiên nhiên làm chuẩn so sánh', 'Tả thực', 'Phóng đại'], 1, 'Bút pháp ước lệ cổ điển: mai, tuyết, hoa, ngọc, thu thủy, xuân sơn…', [
      '<b>Ước lệ tượng trưng</b> là bút pháp đặc trưng của văn học trung đại khi tả người.',
      'Biểu hiện trong đoạn trích:',
      '<ul><li>Lấy vẻ đẹp <b>thiên nhiên</b> làm chuẩn mực so sánh tả người: <code>mai, tuyết, trăng, hoa, ngọc, mây, thu thủy, xuân sơn</code>...</li><li>Không tả chi tiết, cụ thể mà gợi vẻ đẹp <i>khái quát, lí tưởng</i>.</li></ul>',
      'Qua bút pháp ước lệ, Nguyễn Du còn gửi gắm dự cảm về <b>số phận</b> mỗi nhân vật.',
    ], [
      'Sai — đoạn ca ngợi vẻ đẹp, không hề châm biếm.',
      'Đúng — bút pháp ước lệ tượng trưng cổ điển: lấy mai, tuyết, hoa, ngọc, thu thủy, xuân sơn làm chuẩn tả người.',
      'Sai — Nguyễn Du dùng ước lệ chứ không tả thực chi tiết.',
      'Sai — phóng đại có thể xuất hiện nhưng không phải nghệ thuật chủ đạo; cốt lõi là ước lệ tượng trưng.',
    ]),
    Q('Câu "Hoa ghen thua thắm, liễu hờn kém xanh" báo hiệu?', ['Cuộc đời Kiều bình yên', 'Tình yêu hạnh phúc', 'Vẻ đẹp tự nhiên', 'Kiều sẽ gặp nhiều sóng gió, đau khổ ("hồng nhan bạc mệnh")'], 3, 'Hoa, liễu phải ghen ⇒ tài sắc của Kiều gây tai họa cho chính nàng.', [
      'Câu "<b>Hoa ghen thua thắm, liễu hờn kém xanh</b>" là điểm tả Kiều có ý nghĩa <i>dự báo số phận</i>.',
      'So sánh với cách tả Vân:',
      '<ul><li>Tả Vân: thiên nhiên "<b>thua</b>", "<b>nhường</b>" ⇒ <i>hài hòa</i> ⇒ cuộc đời êm ả.</li><li>Tả Kiều: thiên nhiên "<b>ghen</b>", "<b>hờn</b>" ⇒ <i>đố kị</i> ⇒ dự báo cuộc đời <b>sóng gió, đau khổ</b>.</li></ul>',
      'Đó chính là quan niệm "hồng nhan bạc mệnh", "tạo hóa đố hồng nhan" mà Nguyễn Du gửi gắm.',
    ], [
      'Sai — "ghen", "hờn" báo hiệu sóng gió, không phải bình yên.',
      'Sai — câu thơ dự báo bất hạnh, không phải tình yêu hạnh phúc.',
      'Sai — câu không chỉ tả vẻ đẹp mà còn dự báo số phận.',
      'Đúng — hoa ghen, liễu hờn cho thấy thiên nhiên đố kỵ với sắc đẹp Kiều, dự báo cuộc đời sóng gió, "hồng nhan bạc mệnh".',
    ]),
  ]),

  M(16, 'Cảnh ngày xuân (trích Truyện Kiều)', [
    Q('"Cảnh ngày xuân" tả khung cảnh?', ['Ngày hè', 'Tết Nguyên Đán', 'Mùa đông', 'Lễ hội Thanh Minh tháng 3'], 3, 'Cảnh tiết Thanh Minh (tháng 3), chị em Kiều đi du xuân.', [
      'Đoạn trích <b>"Cảnh ngày xuân"</b> nằm ngay sau đoạn "Chị em Thúy Kiều" trong Truyện Kiều.',
      'Khung cảnh và nội dung:',
      '<ul><li>Tả cảnh ngày xuân trong tiết <b>Thanh Minh</b> (khoảng tháng ba âm lịch).</li><li>Chị em Thúy Kiều cùng đi <b>tảo mộ</b> và <b>du xuân</b> trong lễ hội.</li></ul>',
      'Đoạn thơ là bức tranh thiên nhiên và lễ hội mùa xuân tươi đẹp, trong sáng.',
    ], [
      'Sai — đoạn tả cảnh mùa xuân tiết Thanh Minh, không phải ngày hè.',
      'Sai — không phải Tết Nguyên Đán mà là tiết Thanh Minh tháng ba.',
      'Sai — cảnh xuân tươi tắn, không phải mùa đông.',
      'Đúng — cảnh tiết Thanh Minh (tháng 3) khi chị em Kiều đi tảo mộ và du xuân.',
    ]),
    Q('Câu "Cỏ non xanh tận chân trời / Cành lê trắng điểm một vài bông hoa" sử dụng?', ['Nhân hóa', 'Nghệ thuật chấm phá hội họa', 'So sánh', 'Phóng đại'], 1, 'Bút pháp chấm phá: nền xanh + điểm trắng ⇒ bức tranh xuân tinh khôi, thanh khiết.', [
      'Hai câu "<b>Cỏ non xanh tận chân trời / Cành lê trắng điểm một vài bông hoa</b>" được xem là <i>tuyệt bút</i> tả cảnh xuân.',
      'Nghệ thuật <b>chấm phá</b> (như hội họa):',
      '<ul><li><b>Nền</b>: thảm cỏ non xanh trải rộng "tận chân trời".</li><li><b>Điểm nhấn</b>: vài bông hoa lê trắng (chữ "<code>điểm</code>" rất gợi).</li></ul>',
      'Sự phối màu <i>xanh - trắng</i> hài hòa tạo bức tranh xuân <b>tinh khôi, khoáng đạt, tràn đầy sức sống</b>.',
    ], [
      'Sai — câu thơ không gán đặc điểm con người cho vật nên không phải nhân hóa.',
      'Đúng — bút pháp chấm phá hội họa: nền cỏ xanh điểm vài bông lê trắng tạo bức tranh xuân tinh khôi.',
      'Sai — không có từ so sánh và vế so sánh trong câu.',
      'Sai — đây là nét vẽ tinh tế, không phải phóng đại.',
    ]),
    Q('Lễ hội Thanh Minh có hai phần?', ['Lễ Phật + hội chợ', 'Lễ cưới + hội đèn', 'Lễ tảo mộ + hội đạp thanh', 'Lễ tế trời + hội thi thơ'], 2, 'Tảo mộ (sửa sang mồ mả) + đạp thanh (chơi xuân ngoài đồng).', [
      'Câu thơ "<i>Lễ là tảo mộ, hội là đạp thanh</i>" giới thiệu <b>hai hoạt động</b> của tiết Thanh Minh.',
      'Hai phần của lễ hội:',
      '<ul><li><b>Lễ tảo mộ:</b> đi sửa sang, viếng mộ phần tổ tiên (phần "lễ" - hướng về cội nguồn).</li><li><b>Hội đạp thanh:</b> đi chơi xuân, dẫm lên cỏ xanh ngoài đồng (phần "hội" - vui chơi).</li></ul>',
      'Nguyễn Du tái hiện sinh động <b>nét đẹp văn hóa truyền thống</b> của dân tộc qua không khí lễ hội "nô nức yến anh".',
    ], [
      'Sai — không phải lễ Phật và hội chợ.',
      'Sai — không phải lễ cưới và hội đèn.',
      'Đúng — gồm lễ tảo mộ (sửa sang mồ mả) và hội đạp thanh (đi chơi xuân ngoài đồng).',
      'Sai — không phải lễ tế trời và hội thi thơ.',
    ]),
    Q('Cuối đoạn, tâm trạng chị em Kiều?', ['Buồn ngủ', 'Bâng khuâng, man mác buồn khi chiều tà', 'Háo hức về nhà', 'Vui rộn ràng'], 1, '"Tà tà bóng ngả về tây" + "nao nao dòng nước uốn quanh" ⇒ buồn man mác, dự báo điều sắp xảy ra (gặp mộ Đạm Tiên).', [
      'Sáu câu cuối đoạn tả <b>cảnh chiều tan hội</b>, sử dụng nghệ thuật <i>tả cảnh ngụ tình</i>.',
      'Sự chuyển biến tâm trạng:',
      '<ul><li>Cảnh nhuốm màu tâm trạng: "<code>tà tà bóng ngả về tây</code>", "<code>nao nao dòng nước uốn quanh</code>".</li><li>Các từ láy "<i>tà tà, thanh thanh, nao nao, nho nhỏ</i>" gợi nỗi <b>bâng khuâng, man mác buồn</b>.</li></ul>',
      'Tâm trạng ấy còn <b>dự báo</b> sự việc sắp xảy ra: chị em Kiều gặp mộ Đạm Tiên, gặp Kim Trọng.',
    ], [
      'Sai — "buồn ngủ" không phải tâm trạng được gợi trong đoạn.',
      'Đúng — "tà tà bóng ngả về tây", "nao nao dòng nước" gợi nỗi bâng khuâng, man mác buồn lúc chiều tà.',
      'Sai — cảm xúc cuối đoạn lưu luyến, bâng khuâng chứ không phải háo hức về nhà.',
      'Sai — niềm vui rộn ràng là ở giữa hội; cuối đoạn lại lắng xuống buồn man mác.',
    ]),
    Q('Nghệ thuật miêu tả trong đoạn?', ['Tả cảnh thiên nhiên kết hợp tả tâm trạng (tả cảnh ngụ tình)', 'Đối thoại', 'Chỉ tả cảnh', 'Chỉ tả tâm trạng'], 0, 'Cảnh + tình hòa quyện — đặc trưng thơ Nguyễn Du.', [
      '<b>Tả cảnh ngụ tình</b> là bút pháp đặc sắc của Nguyễn Du — mượn cảnh để gửi gắm tâm trạng.',
      'Trong đoạn "Cảnh ngày xuân":',
      '<ul><li>Cảnh xuân đầu đoạn <i>tươi sáng</i> ⇒ ứng với tâm trạng vui, náo nức.</li><li>Cảnh chiều tà cuối đoạn <i>lặng buồn</i> ⇒ ứng với tâm trạng bâng khuâng, lưu luyến.</li></ul>',
      '<i>Cảnh và tình hòa quyện</i>, "người buồn cảnh có vui đâu bao giờ" — đó là chất thơ trữ tình của Nguyễn Du.',
    ], [
      'Đúng — đoạn dùng nghệ thuật tả cảnh ngụ tình: cảnh và tình hòa quyện, đặc trưng thơ Nguyễn Du.',
      'Sai — đoạn không xây dựng trên đối thoại nhân vật.',
      'Sai — không chỉ tả cảnh; cảnh còn gợi tâm trạng con người.',
      'Sai — không chỉ tả tâm trạng; tâm trạng được gửi gắm qua cảnh vật.',
    ]),
    Q('Từ "nao nao" trong "nao nao dòng nước uốn quanh" gợi?', ['Cô đơn', 'Vui vẻ', 'Tức giận', 'Cảm giác xôn xao, bâng khuâng'], 3, 'Từ láy gợi tâm trạng man mác, dự cảm.', [
      '<b>Từ láy</b> là phương tiện đắc lực để Nguyễn Du tả cảnh, tả tình một cách tinh tế.',
      'Phân tích từ "<code>nao nao</code>":',
      '<ul><li>Vừa tả thực dòng nước nhỏ uốn quanh, khẽ chảy.</li><li>Vừa <b>gợi tâm trạng</b>: cảm giác xôn xao, bâng khuâng, một nỗi buồn man mác khó tả.</li></ul>',
      'Đây là kiểu dùng từ láy <i>"tả cảnh mà ngụ tình"</i> — từ ngữ chỉ cảnh vật nhưng nhuốm màu tâm trạng con người.',
    ], [
      'Sai — "nao nao" không nghiêng hẳn về cô đơn mà gợi nỗi xao động mơ hồ.',
      'Sai — từ láy này gợi nỗi buồn man mác, không phải vui vẻ.',
      'Sai — "nao nao" không gợi sự tức giận.',
      'Đúng — từ láy "nao nao" gợi cảm giác xôn xao, bâng khuâng, dự cảm điều sắp xảy ra.',
    ]),
  ]),

  M(17, 'Kiều ở lầu Ngưng Bích', [
    Q('"Kiều ở lầu Ngưng Bích" diễn tả tâm trạng Kiều khi nào?', ['Sống cùng Từ Hải', 'Bị Mã Giám Sinh lừa, giam ở lầu Ngưng Bích', 'Vui chơi với gia đình', 'Mới gặp Kim Trọng'], 1, 'Kiều bị Tú Bà giam lỏng ở lầu Ngưng Bích sau khi bị Mã Giám Sinh lừa.', [
      'Đoạn trích <b>"Kiều ở lầu Ngưng Bích"</b> nằm ở phần "Gia biến và lưu lạc" của Truyện Kiều.',
      'Hoàn cảnh của Kiều:',
      '<ul><li>Sau khi bán mình chuộc cha, Kiều bị <b>Mã Giám Sinh lừa gạt</b>, rồi rơi vào tay <b>Tú Bà</b>.</li><li>Tú Bà giam lỏng Kiều ở <b>lầu Ngưng Bích</b>, chờ thực hiện âm mưu mới.</li></ul>',
      'Đoạn thơ tập trung diễn tả tâm trạng <i>cô đơn, buồn tủi, lo sợ</i> của Kiều nơi đất khách.',
    ], [
      'Sai — Kiều gặp Từ Hải về sau; đoạn này nàng đang bị giam lỏng cô đơn.',
      'Đúng — sau khi bị Mã Giám Sinh lừa, Kiều bị Tú Bà giam lỏng ở lầu Ngưng Bích.',
      'Sai — đoạn này Kiều cô đơn nơi đất khách, không phải vui chơi cùng gia đình.',
      'Sai — cảnh gặp Kim Trọng ở đoạn đầu tác phẩm, không phải đây.',
    ]),
    Q('Cảnh "Trước lầu Ngưng Bích khóa xuân" cho thấy?', ['Niềm vui', 'Sự cô đơn, bị giam cầm tuổi xuân', 'Sự tự do', 'Cảnh đẹp lãng mạn'], 1, '"Khóa xuân" = giam giữ tuổi thanh xuân; gợi không gian giam cầm, cô độc.', [
      'Câu mở đầu "<b>Trước lầu Ngưng Bích khóa xuân</b>" gợi cảnh ngộ đáng thương của Kiều.',
      'Phân tích:',
      '<ul><li>Hai chữ "<code>khóa xuân</code>" ⇒ <b>giam giữ tuổi thanh xuân</b>, khóa kín tuổi trẻ.</li><li>Không gian "bốn bề bát ngát", "non xa", "trăng gần", "cát vàng", "bụi hồng" ⇒ <i>mênh mông, hoang vắng</i> càng tô đậm sự <b>cô đơn</b>.</li></ul>',
      'Cảnh vật rợn ngợp ấy phản chiếu tâm trạng <b>bẽ bàng, cô độc</b> của Kiều.',
    ], [
      'Sai — "khóa xuân" gợi sự giam cầm, không phải niềm vui.',
      'Đúng — "khóa xuân" nghĩa là giam giữ tuổi thanh xuân, gợi không gian giam cầm, cô độc.',
      'Sai — Kiều đang bị giam lỏng, hoàn toàn mất tự do.',
      'Sai — không gian rộng nhưng hoang vắng, gợi cô đơn chứ không lãng mạn.',
    ]),
    Q('Kiều nhớ những ai trong đoạn này?', ['Nhớ Từ Hải', 'Chỉ nhớ Kim Trọng', 'Chỉ nhớ cha mẹ', 'Nhớ Kim Trọng và cha mẹ'], 3, 'Nỗi nhớ kép: Kim Trọng (tình yêu) và cha mẹ (chữ hiếu).', [
      'Tám câu giữa đoạn trích diễn tả <b>nỗi nhớ</b> của Kiều — biểu hiện vẻ đẹp tâm hồn của nàng.',
      'Kiều nhớ hai đối tượng:',
      '<ul><li><b>Nhớ Kim Trọng</b> (người yêu): nhớ lời thề nguyền, thương chàng mòn mỏi đợi tin.</li><li><b>Nhớ cha mẹ</b> (chữ hiếu): xót xa cảnh cha mẹ già "tựa cửa hôm mai" không ai chăm sóc.</li></ul>',
      'Trong cảnh ngộ đau khổ, Kiều vẫn nghĩ cho người khác ⇒ một tấm lòng <b>vị tha, thủy chung, hiếu thảo</b>.',
    ], [
      'Sai — Từ Hải chưa xuất hiện ở thời điểm này.',
      'Sai — Kiều không chỉ nhớ Kim Trọng mà còn nhớ cha mẹ.',
      'Sai — Kiều không chỉ nhớ cha mẹ mà còn nhớ Kim Trọng.',
      'Đúng — nỗi nhớ kép: nhớ Kim Trọng (tình yêu) và nhớ cha mẹ (chữ hiếu).',
    ]),
    Q('Vì sao Kiều nhớ Kim Trọng trước, cha mẹ sau?', ['Cha mẹ không quan trọng', 'Tác giả nhầm', 'Vì Kiều giận cha mẹ đã để mình bị bán', 'Phù hợp tâm lý: Kim Trọng là người Kiều đã hứa hôn, có lỗi nhất; cha mẹ Kiều biết Kiều đã bán mình'], 3, 'Tinh tế tâm lý: nỗi day dứt với Kim Trọng nặng hơn vì Kiều thấy có lỗi.', [
      'Trật tự <b>nhớ Kim Trọng trước, cha mẹ sau</b> là một <i>dụng ý nghệ thuật tinh tế</i>, đúng với tâm lí nhân vật.',
      'Lí giải:',
      '<ul><li>Với <b>cha mẹ</b>: Kiều đã <i>bán mình chuộc cha</i>, làm tròn chữ hiếu ⇒ phần nào yên tâm.</li><li>Với <b>Kim Trọng</b>: Kiều luôn day dứt vì <b>lỗi hẹn ước</b>, "tấm son gột rửa bao giờ cho phai" ⇒ nỗi nhớ này cồn cào, ám ảnh hơn.</li></ul>',
      'Nguyễn Du thấu hiểu sâu sắc <b>quy luật tâm lí</b> của con người, làm nên giá trị nhân đạo của tác phẩm.',
    ], [
      'Sai — Kiều rất hiếu thảo; cha mẹ luôn quan trọng với nàng.',
      'Sai — đây là dụng ý nghệ thuật tinh tế của Nguyễn Du, không phải nhầm lẫn.',
      'Sai — Kiều không giận cha mẹ; chính nàng đã tự nguyện bán mình chuộc cha.',
      'Đúng — phù hợp tâm lý: Kiều day dứt vì lỗi hẹn ước với Kim Trọng nhất, còn với cha mẹ nàng đã làm tròn chữ hiếu khi bán mình.',
    ]),
    Q('Đoạn "Buồn trông cửa bể chiều hôm…" sử dụng nghệ thuật?', ['Liệt kê', 'Phóng đại', 'Hài hước', 'Tả cảnh ngụ tình + điệp ngữ "buồn trông"'], 3, '8 câu cuối lặp "buồn trông" 4 lần ⇒ tâm trạng cô đơn, lo sợ chồng chất.', [
      'Tám câu cuối đoạn ("Buồn trông...") là <b>đỉnh cao</b> của nghệ thuật <i>tả cảnh ngụ tình</i> trong Truyện Kiều.',
      'Đặc sắc nghệ thuật:',
      '<ul><li><b>Điệp ngữ</b> "<code>buồn trông</code>" lặp lại <b>4 lần</b> ở đầu các cặp câu lục bát ⇒ tạo âm hưởng trầm buồn, day dứt.</li><li>Mỗi cảnh vật (cánh buồm, hoa trôi, nội cỏ, sóng gió) đều <b>ngụ một nỗi niềm</b>: cô đơn, lênh đênh, vô định, lo sợ.</li></ul>',
      'Tâm trạng buồn lo của Kiều cứ <i>tăng tiến, chồng chất</i> theo từng cặp câu.',
    ], [
      'Sai — đoạn không đơn thuần liệt kê mà gửi tâm trạng vào cảnh.',
      'Sai — không có yếu tố phóng đại làm nét nghệ thuật chủ đạo.',
      'Sai — đoạn thấm đẫm nỗi buồn, không hề hài hước.',
      'Đúng — tả cảnh ngụ tình kết hợp điệp ngữ "buồn trông" lặp 4 lần, dồn nén tâm trạng cô đơn, lo sợ.',
    ]),
    Q('Hình ảnh "ầm ầm tiếng sóng kêu quanh ghế ngồi" báo hiệu?', ['Tình yêu', 'Niềm vui', 'Tai họa, sóng gió sắp ập đến cuộc đời Kiều', 'Sự bình yên'], 2, 'Sóng dữ dội ⇒ dự báo phong ba cuộc đời sắp đến.', [
      'Câu kết "<b>Ầm ầm tiếng sóng kêu quanh ghế ngồi</b>" có ý nghĩa <i>dự báo</i> đặc sắc.',
      'Phân tích:',
      '<ul><li>Từ láy "<code>ầm ầm</code>" gợi âm thanh <b>dữ dội, hãi hùng</b> của sóng gió.</li><li>Cảnh sóng gió bủa vây ⇒ <b>dự báo tai họa, sóng gió</b> sắp ập đến cuộc đời Kiều (ngay sau đó Kiều mắc bẫy Sở Khanh).</li></ul>',
      'Đây tiếp tục là nghệ thuật <b>tả cảnh ngụ tình</b>: cảnh vật báo trước bi kịch của nhân vật.',
    ], [
      'Sai — tiếng sóng dữ dội không gợi tình yêu.',
      'Sai — hình ảnh này gợi bất an, không phải niềm vui.',
      'Đúng — tiếng sóng "ầm ầm" dữ dội dự báo tai họa, sóng gió sắp ập đến cuộc đời Kiều.',
      'Sai — âm thanh dữ dội báo hiệu bão tố, trái ngược sự bình yên.',
    ]),
  ]),

  M(18, 'Ôn tập học kỳ I', [
    Q('"Đồng chí" và "Bài thơ về tiểu đội xe không kính" cùng viết về?', ['Phụ nữ', 'Nông dân', 'Người lính trong kháng chiến', 'Trí thức'], 2, 'Cùng hình tượng người lính (chống Pháp / chống Mỹ).', [
      'Ôn tập HK1 cần biết <b>so sánh, đối chiếu</b> các tác phẩm cùng đề tài.',
      'Điểm chung của hai bài thơ:',
      '<ul><li>Cùng viết về hình tượng <b>người lính</b> trong kháng chiến.</li><li>"<i>Đồng chí</i>" (Chính Hữu) — người lính <b>chống Pháp</b>.</li><li>"<i>Bài thơ về tiểu đội xe không kính</i>" (Phạm Tiến Duật) — người lính <b>chống Mỹ</b>.</li></ul>',
      'Cả hai đều ca ngợi vẻ đẹp tinh thần, tình đồng đội của anh bộ đội Cụ Hồ.',
    ], [
      'Sai — cả hai bài đều viết về người lính, không phải về phụ nữ.',
      'Sai — nông dân chỉ là xuất thân ở "Đồng chí"; điểm chung là hình tượng người lính.',
      'Đúng — cả hai cùng viết về hình tượng người lính (chống Pháp trong "Đồng chí", chống Mỹ trong bài kia).',
      'Sai — đề tài chung là người lính, không phải trí thức.',
    ]),
    Q('"Bếp lửa" và "Ánh trăng" có điểm chung?', ['Đều viết về chiến tranh', 'Đều tả cảnh hoàng hôn', 'Đều là dòng hồi tưởng, suy ngẫm về quá khứ ân nghĩa', 'Đều thơ lục bát'], 2, 'Cả 2 đều khơi gợi đạo lý nhớ về cội nguồn, quá khứ.', [
      'Hai bài "<b>Bếp lửa</b>" (Bằng Việt) và "<b>Ánh trăng</b>" (Nguyễn Duy) gặp nhau ở <i>mạch cảm xúc hồi tưởng</i>.',
      'Điểm chung:',
      '<ul><li>Đều là dòng <b>hồi tưởng, suy ngẫm</b> về <b>quá khứ ân nghĩa</b>.</li><li>Đều khơi gợi đạo lí <i>nhớ về cội nguồn</i>, sống thủy chung, biết ơn.</li></ul>',
      'Khác: "Bếp lửa" hướng về tình bà cháu, gia đình; "Ánh trăng" hướng về nhân dân, đồng đội, thiên nhiên.',
    ], [
      'Sai — chiến tranh chỉ là phông nền; điểm chung là sự hồi tưởng quá khứ ân nghĩa.',
      'Sai — hai bài không cùng tả cảnh hoàng hôn.',
      'Đúng — cả hai đều là dòng hồi tưởng, suy ngẫm về quá khứ ân nghĩa, gợi đạo lý nhớ cội nguồn.',
      'Sai — "Bếp lửa" thiên về thể tám chữ, "Ánh trăng" là năm chữ; không phải lục bát.',
    ]),
    Q('Truyện ngắn "Làng" và "Chiếc lược ngà" có điểm chung?', ['Đều có nhân vật trẻ em', 'Đều buồn', 'Đều cảnh nông thôn', 'Đều xây dựng tình huống truyện độc đáo, khắc họa số phận con người trong chiến tranh'], 3, 'Tình huống truyện độc đáo + chủ đề chiến tranh và con người.', [
      'Hai truyện ngắn "<b>Làng</b>" (Kim Lân) và "<b>Chiếc lược ngà</b>" (Nguyễn Quang Sáng) có nhiều điểm tương đồng về <i>nghệ thuật</i>.',
      'Điểm chung:',
      '<ul><li>Đều xây dựng <b>tình huống truyện độc đáo</b>, có kịch tính.</li><li>Đều khắc họa <b>số phận, tình cảm con người</b> trong hoàn cảnh chiến tranh.</li><li>Đều thành công ở nghệ thuật <i>miêu tả tâm lí nhân vật</i>.</li></ul>',
      'Khác về chủ đề: "Làng" — tình yêu làng/nước; "Chiếc lược ngà" — tình cha con.',
    ], [
      'Sai — không phải cả hai đều xoáy vào nhân vật trẻ em (ông Hai là người lớn).',
      'Sai — sắc thái cảm xúc không phải điểm chung cốt lõi về nghệ thuật.',
      'Sai — bối cảnh không hoàn toàn là nông thôn; điểm chung là cách xây dựng truyện.',
      'Đúng — cả hai đều xây dựng tình huống truyện độc đáo, khắc họa số phận con người trong chiến tranh.',
    ]),
    Q('Phương châm hội thoại quan trọng nhất trong giao tiếp xã giao?', ['Phương châm về lượng (nói đủ, không thừa)', 'Cách thức', 'Phương châm về chất (nói đúng sự thật)', 'Lịch sự'], 3, 'Lịch sự là nền tảng giao tiếp văn hóa.', [
      'Ôn tập phần Tiếng Việt HK1: <b>các phương châm hội thoại</b> và vai trò của chúng.',
      'Trong giao tiếp <b>xã giao</b> (lời chào, lời mời, lời cảm ơn, xin lỗi...):',
      '<ul><li><b>Phương châm lịch sự</b> (tế nhị, tôn trọng người đối thoại) là nền tảng quan trọng nhất.</li><li>Thể hiện <i>văn hóa giao tiếp</i> và sự tôn trọng lẫn nhau.</li></ul>',
      'Các phương châm khác (lượng, chất, cách thức) thiên về <i>nội dung thông tin</i> hơn là quan hệ xã giao.',
    ], [
      'Sai — phương châm về lượng quan trọng nhưng không phải nền tảng của giao tiếp xã giao.',
      'Sai — phương châm cách thức bảo đảm rõ ràng, không phải yếu tố hàng đầu trong xã giao.',
      'Sai — phương châm về chất bảo đảm tính trung thực, nhưng xã giao đề cao thái độ lịch sự.',
      'Đúng — trong giao tiếp xã giao, phương châm lịch sự (tế nhị, tôn trọng) là nền tảng quan trọng nhất.',
    ]),
    Q('Thuý Kiều thuộc tác phẩm của?', ['Hồ Xuân Hương', 'Nguyễn Du', 'Đoàn Thị Điểm', 'Nguyễn Trãi'], 1, 'Nguyễn Du là tác giả Truyện Kiều.', [
      'Ôn tập phần văn học trung đại HK1: <b>Truyện Kiều</b> và các đoạn trích.',
      'Ghi nhớ:',
      '<ul><li><b>Thúy Kiều</b> là nhân vật chính của <b>Truyện Kiều</b>, tác giả là <b>Nguyễn Du</b>.</li><li>Phân biệt với các tác giả khác: <i>Hồ Xuân Hương</i> (thơ Nôm), <i>Đoàn Thị Điểm</i> (dịch Chinh phụ ngâm), <i>Nguyễn Trãi</i> (Bình Ngô đại cáo).</li></ul>',
      'Các đoạn trích Truyện Kiều học ở lớp 9: "Chị em Thúy Kiều", "Cảnh ngày xuân", "Kiều ở lầu Ngưng Bích".',
    ], [
      'Sai — Hồ Xuân Hương nổi tiếng với thơ Nôm trữ tình, không phải tác giả Truyện Kiều.',
      'Đúng — Thúy Kiều là nhân vật trong Truyện Kiều của Nguyễn Du.',
      'Sai — Đoàn Thị Điểm gắn với bản dịch "Chinh phụ ngâm", không phải Truyện Kiều.',
      'Sai — Nguyễn Trãi là tác giả "Bình Ngô đại cáo", "Quốc âm thi tập", không phải Truyện Kiều.',
    ]),
    Q('Văn bản thuyết minh khác văn miêu tả ở chỗ?', ['Thuyết minh: khách quan, cung cấp tri thức; miêu tả: chủ quan, gợi hình', 'Thuyết minh dài hơn', 'Không khác nhau', 'Miêu tả khoa học hơn'], 0, 'Mục đích khác: thuyết minh ⇒ hiểu; miêu tả ⇒ hình dung, cảm nhận.', [
      'Ôn tập Tập làm văn HK1: phân biệt <b>văn thuyết minh</b> và <b>văn miêu tả</b>.',
      'Bảng so sánh:',
      '<ul><li><b>Thuyết minh:</b> <i>khách quan</i>, cung cấp tri thức ⇒ giúp người đọc <b>hiểu</b> đối tượng.</li><li><b>Miêu tả:</b> <i>chủ quan</i>, gợi hình, gợi cảm ⇒ giúp người đọc <b>hình dung, cảm nhận</b>.</li></ul>',
      'Hai kiểu văn này có thể kết hợp trong một bài, nhưng cần xác định đúng <i>mục đích chính</i>.',
    ], [
      'Đúng — thuyết minh khách quan, cung cấp tri thức để hiểu; miêu tả chủ quan, gợi hình để hình dung, cảm nhận.',
      'Sai — độ dài không phải tiêu chí phân biệt hai loại văn.',
      'Sai — hai loại văn khác nhau rõ rệt về mục đích và đặc trưng.',
      'Sai — văn thuyết minh mới đề cao tính khoa học, không phải miêu tả.',
    ]),
  ]),

  // ──────────────── HK2 ────────────────
  M(19, 'Bến quê — Nguyễn Minh Châu', [
    Q('"Bến quê" của Nguyễn Minh Châu sáng tác năm?', ['1985', '1995', '1975', '1991'], 0, 'Truyện ngắn in trong tập "Bến quê" (1985).', [
      '<b>Nguyễn Minh Châu</b> là cây bút tiên phong của văn học Việt Nam thời kì <i>đổi mới</i>, với những truyện ngắn giàu tính triết lí.',
      'Xuất xứ:',
      '<ul><li>Truyện in trong tập <b>"Bến quê"</b> (<code>1985</code>).</li><li>Tác phẩm tiêu biểu cho khuynh hướng <b>"tự nhận thức"</b>, chiêm nghiệm về cuộc đời con người.</li></ul>',
      'Đây là truyện ngắn mang đậm tính <i>biểu tượng</i>, gửi gắm những suy ngẫm sâu sắc về lẽ sống.',
    ], [
      'Đúng — truyện in trong tập "Bến quê" (1985) của Nguyễn Minh Châu thời kỳ đổi mới.',
      'Sai — 1995 không đúng; tập "Bến quê" ra đời năm 1985.',
      'Sai — 1975 là năm thống nhất, sớm hơn so với sáng tác này.',
      'Sai — 1991 không đúng năm xuất bản tập truyện.',
    ]),
    Q('Nhân vật chính của truyện?', ['Nhĩ — người bệnh nặng đang nằm dưỡng bệnh', 'Ông Hai — người nông dân yêu làng tha thiết', 'Bác sĩ', 'Bà Hai — vợ ông Hai ở nơi tản cư'], 0, 'Nhĩ — người từng đi khắp nơi nhưng cuối đời bị bệnh nằm liệt giường.', [
      'Nhân vật chính của "Bến quê" là <b>Nhĩ</b> — một con người ở vào hoàn cảnh đặc biệt.',
      'Về nhân vật Nhĩ:',
      '<ul><li>Từng <b>đi khắp nơi trên thế giới</b> (công việc cho anh điều kiện đó).</li><li>Cuối đời mắc <b>bệnh hiểm nghèo</b>, nằm liệt giường, mọi sinh hoạt phải nhờ vợ con.</li></ul>',
      'Chính trong hoàn cảnh ấy, Nhĩ mới <i>nhận ra, chiêm nghiệm</i> những giá trị đích thực của cuộc sống. (Lưu ý: ông Hai, bà Hai là nhân vật của truyện "Làng").',
    ], [
      'Đúng — Nhĩ, người từng đi khắp nơi nhưng cuối đời bị bệnh nằm liệt giường, là nhân vật chính.',
      'Sai — ông Hai là nhân vật của truyện "Làng" (Kim Lân), không phải "Bến quê".',
      'Sai — bác sĩ không phải nhân vật của truyện này.',
      'Sai — bà Hai thuộc truyện "Làng"; vợ Nhĩ trong "Bến quê" tên là Liên.',
    ]),
    Q('Tình huống truyện nghịch lý là?', ['Nhĩ từng đi khắp thế giới nhưng cuối đời không thể bước qua bến sông quê mình', 'Nhĩ về quê làm ăn', 'Nhĩ bỏ nhà ra đi', 'Nhĩ bị mất trí nhớ'], 0, 'Nghịch lý: đi xa nhiều mà không khám phá ngay điều gần gũi nhất.', [
      'Nguyễn Minh Châu xây dựng một chuỗi <b>tình huống nghịch lí, trớ trêu</b> để gửi gắm triết lí.',
      'Nghịch lí của Nhĩ:',
      '<ul><li>Cả đời từng <b>đi khắp thế giới</b>, nhưng cuối đời lại <b>không thể tự bước qua bến sông</b> ngay trước cửa nhà.</li><li>Anh nhờ con trai sang bãi bồi bên kia sông, nhưng cậu con lại sa vào đám cờ thế ⇒ lỡ chuyến đò.</li></ul>',
      'Những nghịch lí ấy gợi suy ngẫm: con người dễ <i>bỏ quên những điều gần gũi, bình dị</i> quanh mình.',
    ], [
      'Đúng — nghịch lý: Nhĩ từng đi khắp thế giới nhưng cuối đời không thể tự bước qua bến sông ngay trước nhà.',
      'Sai — không có tình tiết Nhĩ về quê làm ăn.',
      'Sai — Nhĩ không bỏ nhà ra đi; anh đang nằm liệt một chỗ.',
      'Sai — Nhĩ không mất trí nhớ; anh vẫn tỉnh táo và suy ngẫm sâu sắc.',
    ]),
    Q('Hình ảnh "bãi bồi bên kia sông" tượng trưng cho?', ['Sự xa lạ', 'Vẻ đẹp bình dị, gần gũi của quê hương mà ta hay vô tình bỏ quên', 'Đất canh tác', 'Nơi du lịch'], 1, 'Biểu tượng cho vẻ đẹp giản dị, bến đỗ tinh thần con người.', [
      '"Bến quê" giàu <b>hình ảnh biểu tượng</b> — đây là nét đặc sắc nghệ thuật của truyện.',
      'Hình ảnh <b>"bãi bồi bên kia sông"</b>:',
      '<ul><li>Tượng trưng cho vẻ đẹp <b>bình dị, gần gũi</b> của quê hương, của cuộc sống.</li><li>Đó là những giá trị bền vững mà con người thường <i>vô tình bỏ quên</i> để chạy theo cái xa vời.</li></ul>',
      'Các hình ảnh khác cũng mang nghĩa biểu tượng: hoa bằng lăng cuối mùa, đứa con sa vào cờ thế, hành động cuối truyện của Nhĩ...',
    ], [
      'Sai — bãi bồi gợi sự thân thuộc, không phải xa lạ.',
      'Đúng — bãi bồi bên kia sông tượng trưng cho vẻ đẹp bình dị, gần gũi của quê hương mà con người dễ vô tình bỏ quên.',
      'Sai — không phải nghĩa đen đất canh tác mà là ý nghĩa biểu tượng.',
      'Sai — không phải nơi du lịch mà là biểu tượng bến đỗ tinh thần.',
    ]),
    Q('Thông điệp tác phẩm?', ['Đi nhiều là tốt', 'Hãy trân trọng những giá trị giản dị, gần gũi mà bền vững của quê hương, gia đình', 'Theo đuổi vinh hoa', 'Sống nhanh'], 1, 'Thức tỉnh: con người dễ bỏ qua vẻ đẹp bên cạnh mà chạy theo cái xa vời.', [
      '<b>Chủ đề - thông điệp</b> là phần cốt lõi cần nắm khi học "Bến quê".',
      'Thông điệp tác giả gửi gắm:',
      '<ul><li>Hãy <b>trân trọng những giá trị giản dị, gần gũi</b> mà bền vững (gia đình, quê hương).</li><li>Đừng vì những cái <i>xa vời, phù phiếm</i> mà bỏ quên hạnh phúc đang ở quanh ta.</li></ul>',
      'Truyện thức tỉnh người đọc về cách <b>nhìn nhận và sống</b> sao cho ý nghĩa.',
    ], [
      'Sai — truyện không cổ vũ "đi nhiều" mà nhắc trân trọng cái gần gũi.',
      'Đúng — hãy trân trọng những giá trị giản dị, gần gũi mà bền vững của quê hương, gia đình.',
      'Sai — thông điệp ngược lại với việc chạy theo vinh hoa, danh vọng xa vời.',
      'Sai — truyện đề cao sự lắng lại để nhận ra giá trị bên cạnh, không phải sống vội.',
    ]),
    Q('Nghệ thuật đặc sắc của Nguyễn Minh Châu trong "Bến quê"?', ['Hài hước', 'Sử thi', 'Xây dựng tình huống nghịch lý mang tính biểu tượng và triết lý', 'Phóng đại'], 2, 'Tình huống nghịch lý + giàu chất triết lý nhân sinh.', [
      '<b>Nghệ thuật</b> của "Bến quê" góp phần làm nên giá trị triết lí của truyện.',
      'Nét đặc sắc:',
      '<ul><li>Xây dựng <b>tình huống nghịch lí</b> mang tính khái quát, biểu tượng.</li><li>Hệ thống <b>hình ảnh giàu ý nghĩa biểu tượng</b>.</li><li>Miêu tả <b>tâm lí tinh tế</b>, nhiều chiêm nghiệm, triết lí nhân sinh.</li></ul>',
      'Tất cả tạo nên một truyện ngắn vừa giản dị vừa sâu sắc, đa nghĩa.',
    ], [
      'Sai — truyện không thiên về giọng hài hước.',
      'Sai — đây không phải tác phẩm sử thi.',
      'Đúng — Nguyễn Minh Châu xây dựng tình huống nghịch lý mang tính biểu tượng và triết lý nhân sinh sâu sắc.',
      'Sai — phóng đại không phải nét nghệ thuật chủ đạo của truyện.',
    ]),
  ]),

  M(20, 'Những ngôi sao xa xôi — Lê Minh Khuê', [
    Q('"Những ngôi sao xa xôi" sáng tác năm nào?', ['1975', '1980', '1971', '1965'], 2, 'Sáng tác năm 1971 khi kháng chiến chống Mỹ đang ác liệt.', [
      '<b>Lê Minh Khuê</b> là nhà văn nữ, từng là thanh niên xung phong trên tuyến đường Trường Sơn, nên viết rất chân thực về đề tài này.',
      'Hoàn cảnh sáng tác:',
      '<ul><li>Truyện viết năm <code>1971</code>, lúc cuộc <b>kháng chiến chống Mỹ</b> đang diễn ra ác liệt.</li><li>Là một trong những tác phẩm đầu tay của tác giả.</li></ul>',
      'Vốn sống thực tế giúp tác giả khắc họa sinh động vẻ đẹp của các nữ thanh niên xung phong.',
    ], [
      'Sai — 1975 là năm thống nhất, sau khi truyện đã ra đời.',
      'Sai — 1980 muộn hơn; truyện viết trong thời chiến.',
      'Đúng — sáng tác năm 1971 khi cuộc kháng chiến chống Mỹ đang ác liệt trên tuyến đường Trường Sơn.',
      'Sai — 1965 không đúng năm sáng tác.',
    ]),
    Q('Ba nhân vật nữ trong truyện là?', ['Phương, Lan, Hoa', 'Phương Định, Nho, Thao', 'Hồng, Nho, Thu', 'Định, Thao, Liên'], 1, 'Tổ trinh sát mặt đường: Phương Định, Nho, chị Thao.', [
      'Truyện kể về <b>tổ trinh sát mặt đường</b> gồm ba cô gái thanh niên xung phong.',
      'Ba nhân vật:',
      '<ul><li><b>Phương Định</b> — nhân vật chính, người kể chuyện, cô gái Hà Nội nhạy cảm, mơ mộng.</li><li><b>Nho</b> — cô em út, hồn nhiên, đáng yêu.</li><li><b>Chị Thao</b> — tổ trưởng, từng trải, dũng cảm mà cũng rất nữ tính.</li></ul>',
      'Mỗi người một cá tính nhưng đều mang vẻ đẹp chung của thế hệ trẻ thời chống Mỹ.',
    ], [
      'Sai — tên các nhân vật không phải Phương, Lan, Hoa.',
      'Đúng — tổ trinh sát mặt đường gồm Phương Định, Nho và chị Thao.',
      'Sai — không có nhân vật Hồng, Thu trong tổ trinh sát.',
      'Sai — Liên là vợ Nhĩ trong "Bến quê"; tên đúng là Phương Định, Nho, Thao.',
    ]),
    Q('Họ làm công việc gì trên tuyến đường Trường Sơn?', ['Lái xe', 'Phá bom, đo khối lượng đất đá đường bị bom phá', 'Liên lạc', 'Cứu thương cho bộ đội bị thương ngoài mặt trận'], 1, 'Trinh sát + đo, phá bom — nhiệm vụ cực kỳ nguy hiểm.', [
      'Công việc của các cô gái phản ánh sự <b>khốc liệt, hiểm nguy</b> của chiến tranh trên tuyến lửa Trường Sơn.',
      'Nhiệm vụ tổ trinh sát mặt đường:',
      '<ul><li><b>Đo khối lượng đất đá</b> lấp vào hố bom mỗi khi đường bị bom phá.</li><li><b>Đếm bom chưa nổ</b> và <b>phá bom</b> để thông đường.</li></ul>',
      'Đây là công việc <i>"thần kinh căng như chão"</i>, cận kề cái chết — qua đó làm nổi bật lòng dũng cảm của họ.',
    ], [
      'Sai — lái xe là công việc người lính trong "Bài thơ về tiểu đội xe không kính".',
      'Đúng — họ trinh sát mặt đường: đo khối lượng đất đá, đếm và phá bom chưa nổ — nhiệm vụ cực nguy hiểm.',
      'Sai — công việc của họ là phá bom, không phải liên lạc.',
      'Sai — họ không làm nhiệm vụ cứu thương mà phá bom mở đường.',
    ]),
    Q('Người kể chuyện trong tác phẩm là?', ['Người dẫn truyện ngôi thứ ba', 'Phương Định (ngôi thứ nhất)', 'Nho (ngôi thứ nhất, người em út tổ trinh sát)', 'Chị Thao'], 1, 'Phương Định kể chuyện ⇒ tạo cảm giác chân thực, trực tiếp.', [
      '<b>Ngôi kể</b> là một yếu tố nghệ thuật quan trọng của truyện.',
      'Phân tích ngôi kể:',
      '<ul><li>Truyện kể theo <b>ngôi thứ nhất</b>, người kể xưng "<code>tôi</code>" là <b>Phương Định</b>.</li><li>Vừa là người trong cuộc, vừa là nhân vật chính.</li></ul>',
      'Tác dụng: tạo cảm giác <i>chân thực, sinh động</i>; thuận lợi cho việc <b>miêu tả nội tâm</b>, bộc lộ thế giới tâm hồn phong phú của nhân vật.',
    ], [
      'Sai — truyện kể theo ngôi thứ nhất, không phải ngôi thứ ba.',
      'Đúng — Phương Định xưng "tôi" kể chuyện, tạo cảm giác chân thực, trực tiếp.',
      'Sai — người kể là Phương Định, không phải Nho.',
      'Sai — người kể là Phương Định, không phải chị Thao.',
    ]),
    Q('Nét đẹp chung của ba cô gái?', ['Lặng lẽ, cam chịu', 'Tài giỏi, kiêu hãnh', 'Dũng cảm, lạc quan, có tâm hồn trong sáng, mơ mộng', 'Mạnh mẽ, lạnh lùng'], 2, 'Vẻ đẹp người con gái Việt Nam thời chiến: dũng cảm + nữ tính, mơ mộng.', [
      'Ba cô gái có cá tính riêng nhưng cùng chung những <b>phẩm chất cao đẹp</b>.',
      'Vẻ đẹp chung:',
      '<ul><li><b>Dũng cảm, gan dạ</b> trong công việc phá bom nguy hiểm.</li><li><b>Tinh thần trách nhiệm</b>, tình đồng đội gắn bó.</li><li><b>Lạc quan, hồn nhiên</b>, tâm hồn <i>trong sáng, mơ mộng</i>, giàu nữ tính.</li></ul>',
      'Đó là vẻ đẹp tiêu biểu của <b>thế hệ trẻ Việt Nam</b> trong kháng chiến chống Mỹ.',
    ], [
      'Sai — họ chủ động, lạc quan chứ không cam chịu.',
      'Sai — không phải kiêu hãnh mà hồn nhiên, trong sáng.',
      'Đúng — dũng cảm, lạc quan, tâm hồn trong sáng, mơ mộng — vẻ đẹp người con gái Việt Nam thời chiến.',
      'Sai — họ giàu tình cảm, mơ mộng chứ không lạnh lùng.',
    ]),
    Q('Tên truyện "Những ngôi sao xa xôi" có ý nghĩa biểu tượng?', ['Khoảng cách địa lý', 'Biểu tượng cho vẻ đẹp tâm hồn, lý tưởng và sự bất tử của những cô gái thanh niên xung phong', 'Là ngôi sao thực', 'Khung cảnh đêm'], 1, 'Các cô gái như những vì sao sáng — vẻ đẹp lý tưởng và tinh thần.', [
      '<b>Nhan đề</b> "Những ngôi sao xa xôi" là một hình ảnh <i>ẩn dụ, biểu tượng</i> đẹp và giàu sức gợi.',
      'Ý nghĩa:',
      '<ul><li>Gợi liên tưởng đến những <b>ngôi sao trong mắt Phương Định</b>, ánh đèn thành phố quê hương.</li><li>Tượng trưng cho <b>vẻ đẹp tâm hồn, lí tưởng</b> trong sáng và <b>sự bất tử</b> của những cô gái thanh niên xung phong.</li></ul>',
      'Họ như những vì sao lấp lánh, lặng lẽ tỏa sáng giữa chiến trường khốc liệt.',
    ], [
      'Sai — nhan đề mang nghĩa biểu tượng, không nói về khoảng cách địa lý.',
      'Đúng — "những ngôi sao" tượng trưng cho vẻ đẹp tâm hồn, lý tưởng và sự bất tử của những cô gái thanh niên xung phong.',
      'Sai — không phải ngôi sao theo nghĩa đen vật lý.',
      'Sai — nhan đề không chỉ tả khung cảnh đêm mà mang ý nghĩa biểu tượng.',
    ]),
  ]),

  M(21, 'Mùa xuân nho nhỏ — Thanh Hải', [
    Q('"Mùa xuân nho nhỏ" sáng tác trong hoàn cảnh nào?', ['Mùa hè', 'Tết Nguyên Đán', 'Tháng 11/1980, khi Thanh Hải đang nằm trên giường bệnh', 'Sau ngày thống nhất ngay'], 2, 'Viết một tháng trước khi tác giả qua đời — như lời tâm sự cuối đời.', [
      '<b>Thanh Hải</b> là nhà thơ xứ Huế, có công xây dựng nền văn học cách mạng ở miền Nam thời chống Mỹ.',
      'Hoàn cảnh sáng tác đặc biệt cảm động:',
      '<ul><li>Bài thơ viết tháng <code>11/1980</code>, khi tác giả đang <b>nằm trên giường bệnh</b>.</li><li>Chỉ <b>một tháng</b> sau, nhà thơ qua đời.</li></ul>',
      'Như lời tâm niệm cuối đời, bài thơ thể hiện tình yêu cuộc sống và khát vọng cống hiến mãnh liệt.',
    ], [
      'Sai — bài thơ viết tháng 11/1980, không phải mùa hè.',
      'Sai — không phải dịp Tết Nguyên Đán; "mùa xuân" ở đây mang nghĩa biểu tượng.',
      'Đúng — viết tháng 11/1980, khi Thanh Hải nằm trên giường bệnh, chỉ một tháng trước khi qua đời.',
      'Sai — bài thơ ra đời năm 1980, không phải ngay sau ngày thống nhất 1975.',
    ]),
    Q('Bài thơ thuộc thể?', ['Năm chữ', 'Bảy chữ', 'Thơ tự do, các dòng không đều chữ', 'Lục bát'], 0, 'Thơ năm chữ, gần với âm hưởng dân ca xứ Huế.', [
      '<b>Thể thơ năm chữ</b> rất phù hợp để diễn tả cảm xúc nhẹ nhàng, tha thiết của bài.',
      'Đặc điểm hình thức:',
      '<ul><li>Mỗi dòng <code>5 tiếng</code>, nhịp <i>nhẹ nhàng, uyển chuyển</i>.</li><li>Gần với <b>âm hưởng dân ca xứ Huế</b> — quê hương tác giả.</li><li>Hình ảnh thơ trong sáng, giàu nhạc điệu (vì thế dễ phổ nhạc thành bài hát nổi tiếng).</li></ul>',
      'Thể thơ và nhạc điệu góp phần thể hiện tình yêu đời và niềm tin yêu cuộc sống.',
    ], [
      'Đúng — thơ năm chữ, nhịp nhẹ nhàng, gần với âm hưởng dân ca xứ Huế.',
      'Sai — mỗi dòng có năm chữ, không phải bảy chữ.',
      'Sai — số chữ mỗi dòng đều đặn (năm chữ) nên không phải thơ tự do.',
      'Sai — không theo cặp 6-8 nên không phải lục bát.',
    ]),
    Q('Câu "Ta làm con chim hót / Ta làm một cành hoa" thể hiện?', ['Sự cô đơn', 'Khao khát giàu sang', 'Mong ước du lịch', 'Ước nguyện hòa nhập, cống hiến phần nhỏ bé của mình cho cuộc đời'], 3, 'Khát vọng dâng hiến tự nhiên, khiêm nhường nhưng đẹp đẽ.', [
      'Khổ thơ "Ta làm con chim hót / Ta làm một cành hoa..." bộc lộ <b>ước nguyện cống hiến</b> của nhà thơ.',
      'Phân tích:',
      '<ul><li><b>Điệp ngữ</b> "<code>Ta làm</code>" và các hình ảnh nhỏ bé (con chim, cành hoa, nốt trầm) ⇒ ước muốn <b>hòa nhập</b> vào cuộc đời.</li><li>Mong góp phần <i>nhỏ bé nhưng đẹp đẽ</i> của mình để làm đẹp cho đời.</li></ul>',
      'Đó là lẽ sống <b>cao đẹp, khiêm nhường</b>: sống là để cống hiến.',
    ], [
      'Sai — câu thơ tràn đầy khát vọng dâng hiến, không gợi cô đơn.',
      'Sai — ước nguyện ở đây là cống hiến khiêm nhường, không phải giàu sang.',
      'Sai — không nói về mong ước du lịch.',
      'Đúng — ước nguyện hòa nhập và cống hiến phần nhỏ bé của mình cho cuộc đời, cho đất nước.',
    ]),
    Q('"Mùa xuân nho nhỏ" trong bài tượng trưng cho?', ['Sự đóng góp khiêm nhường nhưng quý giá của mỗi cá nhân vào mùa xuân lớn của đất nước', 'Tuổi thơ', 'Tình yêu', 'Mùa xuân thực'], 0, 'Mỗi người là 1 "mùa xuân nho nhỏ" góp vào mùa xuân lớn của dân tộc.', [
      '<b>"Mùa xuân nho nhỏ"</b> là nhan đề, cũng là <i>hình ảnh ẩn dụ</i> sáng tạo, độc đáo của Thanh Hải.',
      'Ý nghĩa biểu tượng:',
      '<ul><li>Mỗi người là một "<b>mùa xuân nho nhỏ</b>" — một phần đóng góp <i>khiêm nhường nhưng quý giá</i>.</li><li>Góp vào "<b>mùa xuân lớn</b>" của đất nước, của cuộc đời chung.</li></ul>',
      'Nhan đề thể hiện quan niệm sống đẹp: <b>cá nhân hòa vào cộng đồng</b>, lặng lẽ dâng hiến cho đời.',
    ], [
      'Đúng — mỗi người là một "mùa xuân nho nhỏ", đóng góp khiêm nhường nhưng quý giá vào mùa xuân lớn của đất nước.',
      'Sai — hình ảnh này không tượng trưng cho tuổi thơ.',
      'Sai — đây là ước nguyện cống hiến, không phải tình yêu đôi lứa.',
      'Sai — "mùa xuân nho nhỏ" mang nghĩa biểu tượng, không phải mùa xuân thực ngoài đời.',
    ]),
    Q('Câu thơ "Dù là tuổi hai mươi / Dù là khi tóc bạc" nhấn mạnh?', ['Sự khác biệt thế hệ', 'Sự cống hiến không phụ thuộc tuổi tác', 'Thời gian trôi nhanh', 'Sự già nua'], 1, 'Dâng hiến cả đời người — từ tuổi trẻ đến khi già.', [
      'Hai câu "<b>Dù là tuổi hai mươi / Dù là khi tóc bạc</b>" khẳng định lẽ sống cống hiến bền bỉ.',
      'Phân tích:',
      '<ul><li><b>Điệp ngữ</b> "<code>Dù là</code>" kết hợp hình ảnh đối lập "tuổi hai mươi" (tuổi trẻ) - "khi tóc bạc" (tuổi già).</li><li>Nhấn mạnh: sự cống hiến diễn ra <b>suốt cả cuộc đời</b>, <i>không phụ thuộc tuổi tác</i>.</li></ul>',
      'Đây là lời tự nhủ, tự nguyện dâng hiến cho đời bất kể thời gian, hoàn cảnh.',
    ], [
      'Sai — câu thơ không nhấn mạnh sự khác biệt mà sự bền bỉ suốt đời.',
      'Đúng — dù tuổi hai mươi hay khi tóc bạc, con người vẫn cống hiến; sự dâng hiến không phụ thuộc tuổi tác.',
      'Sai — ý nghĩa cốt lõi là cống hiến suốt đời, không phải than thời gian trôi nhanh.',
      'Sai — câu thơ ca ngợi tinh thần cống hiến, không nhấn mạnh sự già nua.',
    ]),
    Q('Khổ thơ cuối "Mùa xuân ta xin hát…" có âm hưởng?', ['Quan họ', 'Cải lương', 'Dân ca Huế (Nam ai, Nam bình)', 'Hành khúc'], 2, 'Mang âm hưởng dân ca xứ Huế — quê hương Thanh Hải.', [
      'Khổ thơ cuối ("Mùa xuân ta xin hát...") đậm <b>màu sắc quê hương</b>, khép lại bài thơ bằng khúc ca ngợi đất nước.',
      'Phân tích:',
      '<ul><li>Nhắc đến các làn điệu <b>dân ca Huế</b>: "<code>Nam ai, Nam bình</code>".</li><li>Âm hưởng ngọt ngào, tha thiết của <i>quê hương xứ Huế</i> — nơi tác giả gắn bó.</li></ul>',
      'Khổ cuối như tiếng lòng yêu đời, yêu quê hương, yêu đất nước của nhà thơ.',
    ], [
      'Sai — quan họ là dân ca Bắc Ninh, không phải âm hưởng bài thơ này.',
      'Sai — cải lương là loại hình Nam Bộ, không phải âm hưởng khổ cuối.',
      'Đúng — khổ cuối mang âm hưởng dân ca Huế (Nam ai, Nam bình) — quê hương Thanh Hải.',
      'Sai — bài thơ êm dịu, trữ tình, không mang âm hưởng hành khúc.',
    ]),
  ]),

  M(22, 'Viếng lăng Bác — Viễn Phương', [
    Q('"Viếng lăng Bác" sáng tác năm?', ['1969', '1976', '1980', '1975'], 1, 'Năm 1976, sau khi lăng Bác khánh thành, tác giả từ miền Nam ra viếng.', [
      '<b>Viễn Phương</b> là một trong những cây bút có mặt sớm nhất của lực lượng văn nghệ giải phóng miền Nam.',
      'Hoàn cảnh sáng tác:',
      '<ul><li>Năm <code>1976</code>, sau khi cuộc kháng chiến chống Mỹ kết thúc, đất nước thống nhất và <b>lăng Bác vừa khánh thành</b>.</li><li>Tác giả từ <b>miền Nam ra thăm lăng Bác</b> và viết bài thơ.</li><li>In trong tập <b>"Như mây mùa xuân"</b> (1978).</li></ul>',
      'Bài thơ thể hiện niềm xúc động thiêng liêng của người con miền Nam khi được viếng Bác.',
    ], [
      'Sai — 1969 là năm Bác mất, chưa có lăng để vào viếng.',
      'Đúng — năm 1976, sau khi lăng Bác khánh thành, Viễn Phương từ miền Nam ra viếng và viết bài thơ.',
      'Sai — 1980 muộn hơn năm sáng tác.',
      'Sai — 1975 là năm thống nhất; bài thơ viết năm sau, khi lăng đã khánh thành.',
    ]),
    Q('Bài thơ thuộc thể?', ['Năm chữ', 'Bảy chữ (kèm tám chữ)', 'Lục bát', 'Thơ tự do, dòng dài ngắn xen kẽ tự nhiên'], 1, 'Thơ 8 chữ + 7 chữ, đa dạng nhịp.', [
      '<b>Thể thơ</b> của "Viếng lăng Bác" phù hợp với giọng điệu trang nghiêm, thành kính.',
      'Đặc điểm:',
      '<ul><li>Chủ yếu là thơ <b>tám chữ</b>, có xen dòng <b>bảy chữ</b>.</li><li>Nhịp thơ <i>chậm rãi, trang trọng</i>, thể hiện sự thành kính, xúc động.</li></ul>',
      'Giọng điệu trang nghiêm ấy phù hợp với cảm xúc thiêng liêng khi viếng lăng Bác.',
    ], [
      'Sai — bài thơ không phải thể năm chữ.',
      'Đúng — chủ yếu là thơ tám chữ xen bảy chữ, nhịp trang trọng, thành kính.',
      'Sai — không theo cặp 6-8 nên không phải lục bát.',
      'Sai — số chữ mỗi dòng khá đều (7-8 chữ) chứ không tự do thoải mái.',
    ]),
    Q('Câu "Con ở miền Nam ra thăm lăng Bác" có ý nghĩa?', ['Lời xưng hô con — Bác thể hiện tình cảm gần gũi, ấm áp; "thăm" giảm đau buồn', 'Lời chào', 'Lời từ biệt', 'Lời thông báo'], 0, '"Con" — "Bác" + dùng "thăm" thay "viếng" ⇒ giảm nhẹ nỗi đau mất mát.', [
      'Câu thơ mở đầu "<b>Con ở miền Nam ra thăm lăng Bác</b>" giàu cảm xúc, thể hiện ngay tình cảm của tác giả.',
      'Phân tích từ ngữ:',
      '<ul><li>Cách xưng hô "<code>con</code>" - "<code>Bác</code>" ⇒ gợi tình cảm <b>ruột thịt, gần gũi, ấm áp</b>.</li><li>Dùng từ "<b>thăm</b>" thay cho "viếng" ⇒ <i>giảm nhẹ nỗi đau</i>, như Bác vẫn còn sống.</li></ul>',
      'Đây là <b>cách nói giảm nói tránh</b> (nói giảm) thể hiện nỗi lòng kìm nén của người con miền Nam.',
    ], [
      'Đúng — cách xưng "con" - "Bác" gợi tình cảm gần gũi, ấm áp; dùng "thăm" thay "viếng" để giảm nhẹ nỗi đau mất mát.',
      'Sai — đây không phải lời chào xã giao thông thường.',
      'Sai — câu thơ mở đầu cuộc viếng, không phải lời từ biệt.',
      'Sai — câu thơ chan chứa cảm xúc, không phải lời thông báo khô khan.',
    ]),
    Q('Hình ảnh "Mặt trời trong lăng rất đỏ" sử dụng?', ['Nhân hóa', 'Hoán dụ', 'So sánh', 'Ẩn dụ — Bác là mặt trời cách mạng'], 3, 'Ẩn dụ "mặt trời" = Bác Hồ — vĩ đại như vầng dương.', [
      'Hai câu "<i>Ngày ngày mặt trời đi qua trên lăng / Thấy một mặt trời trong lăng rất đỏ</i>" dùng nghệ thuật <b>ẩn dụ</b> đặc sắc.',
      'Phân tích:',
      '<ul><li><b>Mặt trời thứ nhất</b> (đi qua trên lăng): mặt trời <i>thực</i> của thiên nhiên.</li><li><b>Mặt trời thứ hai</b> (trong lăng rất đỏ): <b>ẩn dụ chỉ Bác Hồ</b>.</li></ul>',
      'Ví Bác như mặt trời ⇒ ca ngợi sự <b>vĩ đại, trường tồn, ấm áp</b>, đem lại ánh sáng, sự sống cho dân tộc.',
    ], [
      'Sai — không gán hành động của người cho vật nên không phải nhân hóa.',
      'Sai — không lấy dấu hiệu/bộ phận để gọi tên nên không phải hoán dụ.',
      'Sai — không có từ so sánh và hai vế so sánh rõ ràng.',
      'Đúng — ẩn dụ: "mặt trời trong lăng" ngầm chỉ Bác Hồ vĩ đại, ấm áp như vầng dương soi đường cách mạng.',
    ]),
    Q('"Ngày ngày dòng người đi trong thương nhớ / Kết tràng hoa dâng bảy mươi chín mùa xuân" gợi?', ['Số mùa xuân thật', 'Số học sinh', 'Tuổi của tác giả', 'Sự kính yêu của nhân dân với Bác (Bác sống 79 tuổi)'], 3, '"79 mùa xuân" = 79 năm cuộc đời Bác; tràng hoa = dòng người tưởng nhớ.', [
      'Hai câu thơ này dùng nhiều <b>hình ảnh ẩn dụ</b> đẹp, thể hiện lòng thành kính của nhân dân.',
      'Phân tích:',
      '<ul><li><b>"Kết tràng hoa"</b>: ẩn dụ chỉ dòng người vào lăng viếng Bác như những bông hoa kết thành tràng.</li><li><b>"Bảy mươi chín mùa xuân"</b>: ẩn dụ chỉ <code>79 năm</code> cuộc đời Bác (Bác sống 79 tuổi), mỗi năm là một mùa xuân đẹp đẽ.</li></ul>',
      'Hai câu thơ thể hiện <b>lòng kính yêu vô hạn</b> của nhân dân đối với Bác.',
    ], [
      'Sai — "79 mùa xuân" mang nghĩa biểu tượng về cuộc đời Bác, không phải số mùa xuân tả thực.',
      'Sai — không liên quan đến số học sinh.',
      'Sai — "79" là số năm cuộc đời Bác, không phải tuổi tác giả.',
      'Đúng — "79 mùa xuân" ẩn dụ 79 năm cuộc đời Bác; dòng người kết thành tràng hoa thể hiện sự kính yêu vô hạn của nhân dân.',
    ]),
    Q('Khổ thơ cuối thể hiện ước nguyện?', ['Muốn đi du lịch', 'Muốn làm con chim, đóa hoa, cây tre bên lăng Bác', 'Muốn về nhà', 'Muốn xây lăng to'], 1, 'Ước nguyện ở bên Bác mãi mãi để báo đáp ân tình.', [
      'Khổ thơ cuối thể hiện <b>niềm lưu luyến và ước nguyện</b> của tác giả khi phải rời lăng Bác.',
      'Phân tích:',
      '<ul><li><b>Điệp ngữ</b> "<code>Muốn làm</code>" lặp lại ⇒ khát khao tha thiết.</li><li>Ước làm <b>con chim hót</b>, <b>đóa hoa tỏa hương</b>, <b>cây tre trung hiếu</b> để mãi được ở bên Bác.</li></ul>',
      'Hình ảnh "<i>cây tre trung hiếu</i>" còn là biểu tượng cho lòng trung thành, hiếu nghĩa với Bác, với cách mạng.',
    ], [
      'Sai — khổ cuối không nói về du lịch.',
      'Đúng — tác giả ước làm con chim hót, đóa hoa tỏa hương, cây tre trung hiếu để được ở bên Bác mãi mãi.',
      'Sai — ước nguyện là được ở lại bên Bác, không phải muốn về nhà.',
      'Sai — không phải ước nguyện xây lăng mà là khát khao được hóa thân ở bên Bác.',
    ]),
  ]),

  M(23, 'Sang thu — Hữu Thỉnh', [
    Q('"Sang thu" sáng tác năm?', ['1975', '1980', '1977', '1985'], 2, 'Sáng tác cuối năm 1977, thời kỳ đất nước mới thống nhất.', [
      '<b>Hữu Thỉnh</b> là nhà thơ trưởng thành trong kháng chiến chống Mỹ, viết nhiều và hay về con người, cuộc sống ở nông thôn.',
      'Hoàn cảnh sáng tác:',
      '<ul><li>Bài thơ viết cuối năm <code>1977</code>, khi đất nước vừa thống nhất, hòa bình.</li><li>In trong tập <b>"Từ chiến hào đến thành phố"</b> (1991).</li></ul>',
      'Bài thơ ghi lại những cảm nhận tinh tế của tác giả về khoảnh khắc giao mùa từ hạ sang thu.',
    ], [
      'Sai — 1975 là năm thống nhất; bài thơ viết hai năm sau.',
      'Sai — 1980 không đúng năm sáng tác.',
      'Đúng — sáng tác cuối năm 1977, thời kỳ đất nước mới thống nhất.',
      'Sai — 1985 muộn hơn năm sáng tác.',
    ]),
    Q('Bài thơ tả khoảnh khắc?', ['Đông sang xuân', 'Mùa thu sang đông', 'Cuối hạ — đầu thu', 'Mùa xuân chuyển sang hè'], 2, 'Khoảnh khắc giao mùa hạ — thu, mơ hồ, tinh tế.', [
      'Nhan đề <b>"Sang thu"</b> đã gợi nội dung chính: thời điểm <i>giao mùa</i>.',
      'Khoảnh khắc được miêu tả:',
      '<ul><li>Là lúc <b>cuối hạ - đầu thu</b>, thiên nhiên chuyển mình sang thu.</li><li>Một khoảnh khắc <i>mơ hồ, mong manh</i>, đòi hỏi sự cảm nhận tinh tế.</li></ul>',
      'Khác với thơ thu cổ điển tả cảnh thu đã định hình, Hữu Thỉnh nắm bắt đúng lúc thu <b>vừa chớm</b>.',
    ], [
      'Sai — bài thơ không tả lúc đông sang xuân.',
      'Sai — nhan đề "Sang thu" tả lúc bước vào thu, không phải thu sang đông.',
      'Đúng — bài thơ tả khoảnh khắc giao mùa cuối hạ - đầu thu, mơ hồ và tinh tế.',
      'Sai — không phải lúc xuân chuyển sang hè.',
    ]),
    Q('Tín hiệu đầu tiên báo thu trong bài là?', ['Hương ổi phả vào trong gió se', 'Chim én bay đi', 'Trăng thu sáng', 'Lá vàng rơi'], 0, '"Bỗng nhận ra hương ổi / Phả vào trong gió se" — đặc trưng riêng của thu Bắc Bộ.', [
      'Khổ thơ đầu ghi lại <b>tín hiệu báo thu</b> qua cảm nhận tinh tế của tác giả.',
      'Phân tích:',
      '<ul><li>Tín hiệu đầu tiên là <b>hương ổi</b>: "<code>Bỗng nhận ra hương ổi / Phả vào trong gió se</code>".</li><li>Hương ổi chín nồng nàn, "phả" vào ngọn "gió se" se lạnh ⇒ nét rất riêng của <i>thu Bắc Bộ</i>.</li></ul>',
      'Khác với thơ thu xưa thường tả lá vàng, sen tàn — Hữu Thỉnh chọn hương ổi <b>dân dã, gần gũi</b>, mới mẻ.',
    ], [
      'Đúng — "Bỗng nhận ra hương ổi / Phả vào trong gió se" là tín hiệu đầu tiên, rất riêng của thu Bắc Bộ.',
      'Sai — bài thơ không lấy hình ảnh chim én làm tín hiệu thu.',
      'Sai — không phải trăng thu mà là hương ổi báo hiệu.',
      'Sai — hình ảnh quen thuộc "lá vàng rơi" không phải tín hiệu Hữu Thỉnh chọn ở đây.',
    ]),
    Q('Câu "Sương chùng chình qua ngõ / Hình như thu đã về" sử dụng?', ['Phóng đại', 'Nhân hóa "chùng chình" + từ tình thái "hình như"', 'So sánh', 'Ẩn dụ "sương" cho tâm trạng bâng khuâng'], 1, 'Sương được nhân hóa như cố ý nán lại; "hình như" thể hiện sự chưa rõ ràng.', [
      'Hai câu "<b>Sương chùng chình qua ngõ / Hình như thu đã về</b>" thể hiện cảm nhận tinh tế, mơ hồ.',
      'Phân tích nghệ thuật:',
      '<ul><li><b>Nhân hóa:</b> từ láy "<code>chùng chình</code>" khiến làn sương như có tâm trạng, cố ý <i>chậm lại, nán lại</i>.</li><li><b>Từ tình thái</b> "<code>hình như</code>" diễn tả sự <i>chưa chắc chắn</i>, mơ hồ, ngỡ ngàng khi thu vừa chớm.</li></ul>',
      'Sự kết hợp ấy gợi tâm trạng <b>bâng khuâng, xao xuyến</b> của con người trước khoảnh khắc giao mùa.',
    ], [
      'Sai — câu thơ tinh tế, nhẹ nhàng, không dùng phóng đại.',
      'Đúng — nhân hóa "chùng chình" (sương như cố ý nán lại) kết hợp từ tình thái "hình như" gợi cảm giác mơ hồ.',
      'Sai — không có từ so sánh và vế so sánh.',
      'Sai — "sương" ở đây tả thực rồi nhân hóa, không phải ẩn dụ cho tâm trạng.',
    ]),
    Q('Hình ảnh "Sấm cũng bớt bất ngờ / Trên hàng cây đứng tuổi" có hàm nghĩa?', ['Tả thực thiên nhiên', 'Cây cối già nua', 'Sấm sét nguy hiểm', 'Suy ngẫm: khi đã trưởng thành, con người vững vàng trước biến động cuộc đời'], 3, 'Hai tầng nghĩa: thiên nhiên (sấm thu ít hơn) + triết lý (người đứng tuổi vững vàng hơn).', [
      'Hai câu kết "<b>Sấm cũng bớt bất ngờ / Trên hàng cây đứng tuổi</b>" mang ý nghĩa <i>triết lí</i> sâu sắc.',
      'Hai tầng nghĩa:',
      '<ul><li><b>Nghĩa tả thực:</b> sang thu, sấm (mưa giông) đã thưa, ít bất ngờ hơn; hàng cây cổ thụ vững vàng.</li><li><b>Nghĩa ẩn dụ - triết lí:</b> "<code>sấm</code>" là những vang động, biến cố cuộc đời; "<code>hàng cây đứng tuổi</code>" là con người <b>từng trải</b> ⇒ khi đã trưởng thành, con người vững vàng hơn trước sóng gió.</li></ul>',
      'Đó là chiêm nghiệm về <i>con người và cuộc đời</i> lúc sang thu (chớm già dặn).',
    ], [
      'Sai — câu thơ không chỉ tả thực mà còn mang tầng nghĩa triết lý.',
      'Sai — "hàng cây đứng tuổi" là ẩn dụ về con người từng trải, không chỉ nói cây già.',
      'Sai — ý chính không phải sấm nguy hiểm mà là sự vững vàng của con người.',
      'Đúng — hai tầng nghĩa: thiên nhiên (sang thu ít sấm) và triết lý (người từng trải vững vàng trước biến động cuộc đời).',
    ]),
    Q('Đặc điểm nghệ thuật của bài thơ?', ['Hào hùng, mạnh mẽ', 'Bi tráng', 'Hài hước', 'Hình ảnh tinh tế, ngôn ngữ giản dị, giàu sức gợi'], 3, 'Sự tinh tế trong cảm nhận, mang phong vị riêng.', [
      '<b>Nghệ thuật</b> là một trong những điểm cần ghi nhớ khi học "Sang thu".',
      'Nét đặc sắc:',
      '<ul><li>Hình ảnh thơ <b>tinh tế, gợi cảm</b> (hương ổi, gió se, sương chùng chình, đám mây vắt nửa mình...).</li><li>Ngôn ngữ <b>giản dị, trong sáng</b>, giàu sức gợi.</li><li>Sử dụng nhiều <i>từ láy, nhân hóa</i> độc đáo.</li></ul>',
      'Tất cả thể hiện cảm nhận tinh tế của một tâm hồn nhạy cảm trước thiên nhiên.',
    ], [
      'Sai — bài thơ nhẹ nhàng, lắng đọng, không hào hùng mạnh mẽ.',
      'Sai — bài thơ không mang sắc thái bi tráng.',
      'Sai — bài thơ trầm lắng, suy tư, không hài hước.',
      'Đúng — hình ảnh tinh tế, ngôn ngữ giản dị mà giàu sức gợi, thể hiện cảm nhận tinh tế của tác giả.',
    ]),
  ]),

  M(24, 'Nói với con — Y Phương', [
    Q('"Nói với con" của Y Phương sáng tác năm?', ['1980', '1985', '1990', '1975'], 0, 'Khoảng năm 1980, sau khi tác giả có con.', [
      '<b>Y Phương</b> là nhà thơ dân tộc Tày, thơ ông thể hiện tâm hồn chân thật, mạnh mẽ, đậm bản sắc người miền núi.',
      'Hoàn cảnh sáng tác:',
      '<ul><li>Bài thơ viết khoảng năm <code>1980</code>, khi tác giả đã có con đầu lòng.</li><li>Là lời tâm tình của người cha với con, qua đó nói lên tình yêu quê hương, niềm tự hào về dân tộc.</li></ul>',
      'Bài thơ tiêu biểu cho tiếng nói của các nhà thơ dân tộc thiểu số trong nền văn học hiện đại.',
    ], [
      'Đúng — bài thơ viết khoảng năm 1980, khi tác giả đã có con.',
      'Sai — 1985 không đúng năm sáng tác.',
      'Sai — 1990 muộn hơn năm sáng tác.',
      'Sai — 1975 sớm hơn; bài thơ viết khoảng năm 1980.',
    ]),
    Q('Y Phương là nhà thơ dân tộc nào?', ['Mường, quê Hòa Bình', 'Thái, quê Sơn La', 'Tày', 'H\'Mông'], 2, 'Y Phương là người dân tộc Tày, quê Cao Bằng.', [
      'Hiểu về <b>tác giả</b> giúp cảm nhận đúng bản sắc dân tộc trong bài thơ.',
      'Về Y Phương:',
      '<ul><li>Tên thật Hứa Vĩnh Sước, là người dân tộc <b>Tày</b>, quê ở <b>Cao Bằng</b>.</li><li>Thơ ông phản ánh tâm hồn chân thật, mạnh mẽ và trong sáng, cách tư duy giàu hình ảnh của <i>người miền núi</i>.</li></ul>',
      'Bản sắc dân tộc Tày thấm đẫm trong cách diễn đạt mộc mạc của "Nói với con".',
    ], [
      'Sai — Y Phương không phải người Mường.',
      'Sai — Y Phương không phải người Thái.',
      'Đúng — Y Phương là người dân tộc Tày, quê ở Cao Bằng.',
      'Sai — Y Phương không phải người H\'Mông.',
    ]),
    Q('Bài thơ là lời?', ['Anh nói với em', 'Người cha nói với con về cội nguồn, quê hương và "người đồng mình"', 'Mẹ ru con', 'Con nói với cha'], 1, 'Lời tâm tình của người cha truyền cho con tình yêu quê hương, sức sống dân tộc.', [
      'Xác định đúng <b>chủ thể trữ tình</b> và đối tượng giúp hiểu mạch cảm xúc bài thơ.',
      'Về kết cấu lời thơ:',
      '<ul><li>Bài thơ là <b>lời người cha tâm tình với con</b>.</li><li>Người cha nói về <i>cội nguồn sinh dưỡng</i> (gia đình, quê hương) và về <b>"người đồng mình"</b> (người cùng quê).</li></ul>',
      'Qua lời dặn dò con, người cha gửi gắm niềm tự hào về quê hương và mong con sống xứng đáng.',
    ], [
      'Sai — không phải lời anh nói với em mà là lời cha nói với con.',
      'Đúng — là lời người cha tâm tình với con về cội nguồn, quê hương và "người đồng mình".',
      'Sai — không phải lời mẹ ru con mà là lời người cha dặn dò.',
      'Sai — chủ thể là người cha nói với con, không phải con nói với cha.',
    ]),
    Q('Cụm từ "người đồng mình" trong bài chỉ?', ['Những người cùng quê, cùng dân tộc, sống mộc mạc nghĩa tình', 'Bạn cùng lớp', 'Người ở vùng đồng bằng', 'Người nước ngoài'], 0, '"Người đồng mình" — cách gọi gần gũi của Y Phương để chỉ bà con dân tộc mình.', [
      '<b>"Người đồng mình"</b> là cách diễn đạt độc đáo, đậm chất miền núi của Y Phương.',
      'Ý nghĩa:',
      '<ul><li>Chỉ những người <b>cùng quê hương, cùng dân tộc</b>, cùng sống trên một miền đất.</li><li>Cách gọi <i>gần gũi, thân thương</i>, thể hiện sự gắn bó máu thịt.</li></ul>',
      'Qua "người đồng mình", người cha ca ngợi những phẩm chất tốt đẹp của <b>bà con quê hương mình</b>.',
    ], [
      'Đúng — "người đồng mình" là cách gọi gần gũi chỉ những người cùng quê, cùng dân tộc, sống mộc mạc, nghĩa tình.',
      'Sai — không phải chỉ bạn cùng lớp.',
      'Sai — "người đồng mình" gắn với quê hương miền núi của tác giả, không phải người đồng bằng.',
      'Sai — không phải chỉ người nước ngoài.',
    ]),
    Q('Câu "Người đồng mình thô sơ da thịt / Chẳng mấy ai nhỏ bé đâu con" thể hiện?', ['Tự hào về phẩm chất kiên cường, nghĩa khí của người dân tộc', 'Sự nghèo nàn', 'Sự lạc hậu', 'Vẻ đẹp ngoại hình'], 0, '"Thô sơ da thịt" nhưng "không nhỏ bé" về ý chí, nhân cách.', [
      'Hai câu "<b>Người đồng mình thô sơ da thịt / Chẳng mấy ai nhỏ bé đâu con</b>" ca ngợi phẩm chất "người đồng mình".',
      'Phân tích sự đối lập:',
      '<ul><li>"<code>thô sơ da thịt</code>" — mộc mạc, giản dị, có phần lam lũ về <i>hình thức bên ngoài</i>.</li><li>"<code>chẳng mấy ai nhỏ bé</code>" — lớn lao, <b>không hề nhỏ bé về ý chí, nhân cách, tâm hồn</b>.</li></ul>',
      'Đó là niềm <b>tự hào</b> về phẩm chất kiên cường, giàu nghĩa khí, ý chí của người dân tộc.',
    ], [
      'Đúng — dù "thô sơ da thịt" nhưng "không nhỏ bé" về ý chí, nhân cách — niềm tự hào về phẩm chất kiên cường, nghĩa khí của người dân tộc.',
      'Sai — câu thơ ca ngợi tầm vóc tinh thần, không nói về sự nghèo nàn.',
      'Sai — không nhằm phản ánh sự lạc hậu mà đề cao ý chí, bản lĩnh.',
      'Sai — câu thơ nói về vẻ đẹp tâm hồn, ý chí, không phải ngoại hình.',
    ]),
    Q('Bài thơ có gì độc đáo trong cách diễn đạt?', ['Thiên về suy luận triết học', 'Cấu trúc rất khái quát', 'Ngôn ngữ mộc mạc, hình ảnh cụ thể đặc trưng tư duy người miền núi', 'Sử dụng nhiều từ Hán Việt'], 2, 'Lối nói riêng của người dân tộc: cụ thể, hình ảnh, mộc mạc nhưng giàu ý nghĩa.', [
      '<b>Nét độc đáo về nghệ thuật</b> làm nên bản sắc riêng của "Nói với con".',
      'Đặc sắc diễn đạt:',
      '<ul><li>Ngôn ngữ <b>mộc mạc, giản dị</b>, gần với lời ăn tiếng nói hằng ngày.</li><li>Hình ảnh <b>cụ thể, sinh động</b>, mang đặc trưng <i>tư duy người miền núi</i> ("đan lờ cài nan hoa", "đá gập ghềnh", "thung nghèo đói"...).</li></ul>',
      'Chính lối nói giàu hình ảnh ấy tạo nên giọng điệu thiết tha, chân thật của bài thơ.',
    ], [
      'Sai — bài thơ giàu hình ảnh cụ thể chứ không thiên về suy luận triết học khô khan.',
      'Sai — bài thơ dùng hình ảnh cụ thể, sinh động chứ không khái quát trừu tượng.',
      'Đúng — ngôn ngữ mộc mạc, hình ảnh cụ thể đặc trưng tư duy người miền núi, giản dị mà giàu ý nghĩa.',
      'Sai — bài thơ ít dùng từ Hán Việt, thiên về lời nói mộc mạc của người dân tộc.',
    ]),
  ]),

  M(25, 'Nghị luận xã hội — Tư tưởng đạo lý', [
    Q('Nghị luận về một tư tưởng đạo lý là?', ['Trình bày ý kiến về một quan điểm, đạo lý sống', 'Tả cảnh', 'Kể chuyện', 'Tả người'], 0, 'Bàn luận, phân tích, đánh giá một tư tưởng/quan niệm sống.', [
      '<b>Nghị luận xã hội</b> ở lớp 9 gồm hai dạng: về <i>tư tưởng đạo lí</i> và về <i>hiện tượng đời sống</i>.',
      'Nghị luận về <b>tư tưởng, đạo lí</b>:',
      '<ul><li>Là kiểu bài <b>bàn luận, phân tích, đánh giá</b> về một quan điểm, đạo lí, lẽ sống.</li><li>Đề tài thường là các <i>câu tục ngữ, danh ngôn, ý kiến</i> về phẩm chất, lối sống (vd: lòng biết ơn, ý chí, tình bạn...).</li></ul>',
      'Khác hẳn với văn miêu tả (tả cảnh, tả người) hay tự sự (kể chuyện).',
    ], [
      'Đúng — là kiểu bài bàn luận, phân tích, đánh giá một quan điểm, đạo lý sống.',
      'Sai — tả cảnh thuộc văn miêu tả.',
      'Sai — kể chuyện thuộc văn tự sự.',
      'Sai — tả người thuộc văn miêu tả.',
    ]),
    Q('Cấu trúc bài nghị luận về tư tưởng đạo lý gồm?', ['Chỉ giải thích', 'Mở - Tả - Kết', 'Mở bài (giới thiệu) - Thân bài (giải thích, phân tích, chứng minh, bình luận) - Kết bài', 'Chỉ kể'], 2, 'Cấu trúc 3 phần với thân bài đầy đủ các thao tác.', [
      '<b>Bố cục ba phần</b> là khung chuẩn của một bài nghị luận về tư tưởng đạo lí.',
      'Cấu trúc:',
      '<ul><li><b>Mở bài:</b> giới thiệu vấn đề tư tưởng, đạo lí cần bàn.</li><li><b>Thân bài:</b> <i>giải thích</i> ⇒ <i>phân tích</i> ⇒ <i>chứng minh</i> ⇒ <i>bình luận</i> (bàn bạc, mở rộng, phản đề).</li><li><b>Kết bài:</b> khẳng định ý nghĩa, rút ra bài học.</li></ul>',
      'Nắm vững các thao tác lập luận này giúp viết bài đầy đủ, chặt chẽ.',
    ], [
      'Sai — chỉ giải thích là chưa đủ; cần thêm chứng minh, bình luận.',
      'Sai — "Tả" không phải thao tác của văn nghị luận.',
      'Đúng — gồm mở bài, thân bài (giải thích - phân tích - chứng minh - bình luận) và kết bài.',
      'Sai — kể chuyện thuộc văn tự sự, không phải cấu trúc bài nghị luận.',
    ]),
    Q('Khi bàn về câu "Có chí thì nên", cần làm rõ?', ['Khái niệm "chí", vai trò của ý chí, dẫn chứng người thành công, phản đề người thiếu chí', 'Chỉ ca ngợi', 'Chỉ kể chuyện vui', 'Chỉ phản đối'], 0, 'Đầy đủ: giải thích, chứng minh, bình luận, mở rộng.', [
      'Đây là ví dụ về cách <b>triển khai thân bài</b> cho một đề nghị luận tư tưởng đạo lí cụ thể.',
      'Với câu "Có chí thì nên", cần làm rõ:',
      '<ul><li><b>Giải thích:</b> "chí" là gì (ý chí, nghị lực, quyết tâm); câu nói nghĩa là gì.</li><li><b>Phân tích - chứng minh:</b> vai trò của ý chí; <i>dẫn chứng</i> những tấm gương thành công nhờ ý chí.</li><li><b>Bình luận - phản đề:</b> phê phán người thiếu ý chí, sống buông xuôi.</li></ul>',
      'Có đủ các thao tác, bài viết mới sâu sắc, thuyết phục.',
    ], [
      'Đúng — cần giải thích khái niệm "chí", vai trò ý chí, dẫn chứng người thành công, mở rộng bằng phản đề người thiếu chí.',
      'Sai — chỉ ca ngợi một chiều thì thiếu giải thích, chứng minh và phản đề.',
      'Sai — kể chuyện vui không phải thao tác nghị luận.',
      'Sai — chỉ phản đối là phiến diện, thiếu các thao tác cần thiết.',
    ]),
    Q('Dẫn chứng tốt cho bài nghị luận xã hội cần?', ['Tiêu biểu, xác thực, mới mẻ, đa dạng', 'Trùng lặp', 'Chung chung, không nêu số liệu cụ thể', 'Lâu đời'], 0, 'Tiêu biểu + xác thực + đa chiều ⇒ tăng sức thuyết phục.', [
      '<b>Dẫn chứng</b> là yếu tố làm nên sức nặng cho bài nghị luận xã hội.',
      'Tiêu chí của dẫn chứng tốt:',
      '<ul><li><b>Tiêu biểu:</b> đại diện, có sức khái quát cao.</li><li><b>Xác thực:</b> đúng sự thật, có thể kiểm chứng.</li><li><b>Mới mẻ, đa dạng:</b> cập nhật, nhiều lĩnh vực ⇒ tránh nhàm chán.</li></ul>',
      'Dẫn chứng nên lấy từ thực tế đời sống, người thật việc thật ⇒ tăng sức thuyết phục.',
    ], [
      'Đúng — dẫn chứng tốt phải tiêu biểu, xác thực, mới mẻ, đa dạng để tăng sức thuyết phục.',
      'Sai — dẫn chứng trùng lặp làm bài nhàm và kém thuyết phục.',
      'Sai — dẫn chứng chung chung, thiếu cụ thể sẽ làm yếu lập luận.',
      'Sai — "lâu đời" không phải tiêu chí; cần dẫn chứng tiêu biểu, cập nhật.',
    ]),
    Q('Sai lầm thường gặp khi viết NLXH?', ['Lập luận chung chung, thiếu dẫn chứng cụ thể', 'Cấu trúc rõ ràng', 'Lý lẽ chặt chẽ', 'Có dẫn chứng phong phú'], 0, 'Lạm dụng lý thuyết, thiếu dẫn chứng ⇒ bài thiếu sức nặng.', [
      'Nhận biết <b>lỗi thường gặp</b> giúp học sinh tự rút kinh nghiệm khi viết bài.',
      'Lỗi phổ biến trong bài nghị luận xã hội:',
      '<ul><li><b>Lập luận chung chung, sáo rỗng</b>, lạm dụng lí thuyết.</li><li><b>Thiếu dẫn chứng cụ thể</b>, hoặc dẫn chứng mơ hồ, không xác thực.</li></ul>',
      'Ngược lại, các điểm như <i>cấu trúc rõ ràng, lí lẽ chặt chẽ, dẫn chứng phong phú</i> là <b>ưu điểm</b> cần phát huy.',
    ], [
      'Đúng — lỗi phổ biến là lập luận chung chung, lạm dụng lý thuyết mà thiếu dẫn chứng cụ thể.',
      'Sai — cấu trúc rõ ràng là ưu điểm, không phải sai lầm.',
      'Sai — lý lẽ chặt chẽ là ưu điểm cần có.',
      'Sai — dẫn chứng phong phú là điểm mạnh, không phải sai lầm.',
    ]),
    Q('Vai trò bài học rút ra trong kết bài?', ['Lặp lại mở bài', 'Không cần', 'Bỏ qua', 'Liên hệ bản thân, rút ra hành động cụ thể'], 3, 'Bài học nhận thức + hành động ⇒ kết bài có giá trị thực tiễn.', [
      '<b>Kết bài</b> của bài nghị luận tư tưởng đạo lí cần làm tốt phần <i>liên hệ - bài học</i>.',
      'Yêu cầu:',
      '<ul><li><b>Liên hệ bản thân</b> và thực tế.</li><li>Rút ra <b>bài học nhận thức</b> (hiểu ra điều gì) và <b>bài học hành động</b> (làm gì).</li></ul>',
      'Phần này giúp bài viết có <i>giá trị thực tiễn</i>, tránh lí thuyết suông; không nên lặp lại y nguyên mở bài.',
    ], [
      'Sai — kết bài không nên lặp y nguyên mở bài.',
      'Sai — bài học nhận thức và hành động là phần quan trọng của kết bài.',
      'Sai — không thể bỏ qua phần liên hệ, rút ra bài học.',
      'Đúng — kết bài cần liên hệ bản thân, rút ra bài học nhận thức và hành động cụ thể, tạo giá trị thực tiễn.',
    ]),
  ]),

  M(26, 'Nghị luận xã hội — Hiện tượng đời sống', [
    Q('Nghị luận về hiện tượng đời sống là?', ['Bộc lộ cảm xúc', 'Kể chuyện', 'Tả cảnh', 'Bàn về một hiện tượng có thật trong xã hội (tốt hoặc xấu)'], 3, 'Hiện tượng cụ thể, có thật, đang được xã hội quan tâm.', [
      '<b>Nghị luận về một hiện tượng đời sống</b> là dạng thứ hai của nghị luận xã hội lớp 9.',
      'Khái niệm:',
      '<ul><li>Là kiểu bài <b>bàn về một hiện tượng có thật</b> trong đời sống xã hội.</li><li>Hiện tượng có thể <i>tích cực</i> (tốt) hoặc <i>tiêu cực</i> (xấu), đang được dư luận quan tâm.</li></ul>',
      'Ví dụ đề tài: bạo lực học đường, ô nhiễm môi trường, tinh thần tương thân tương ái, nghiện game...',
    ], [
      'Sai — bộc lộ cảm xúc là đặc trưng văn biểu cảm.',
      'Sai — kể chuyện thuộc văn tự sự.',
      'Sai — tả cảnh thuộc văn miêu tả.',
      'Đúng — là kiểu bài bàn về một hiện tượng có thật trong xã hội (tốt hoặc xấu) đang được quan tâm.',
    ]),
    Q('Các bước phân tích hiện tượng?', ['Chỉ ca ngợi', 'Chỉ kể lại sự việc, không phân tích bản chất', 'Chỉ phê phán', 'Nêu hiện tượng - thực trạng - nguyên nhân - hậu quả/ý nghĩa - giải pháp'], 3, 'Quy trình phân tích đa chiều: bản chất + nguyên nhân + tác động + giải pháp.', [
      '<b>Quy trình phân tích</b> một hiện tượng đời sống cần đầy đủ, theo trình tự hợp lí.',
      'Các bước trong thân bài:',
      '<ul><li><b>Nêu hiện tượng</b> + mô tả <b>thực trạng</b> (có số liệu, dẫn chứng).</li><li>Phân tích <b>nguyên nhân</b> (chủ quan - khách quan).</li><li>Chỉ ra <b>hậu quả</b> (nếu xấu) hoặc <b>ý nghĩa</b> (nếu tốt).</li><li>Đề xuất <b>giải pháp</b>.</li></ul>',
      'Phân tích đa chiều như vậy giúp bài viết toàn diện, sâu sắc.',
    ], [
      'Sai — chỉ ca ngợi là phiến diện, thiếu phân tích nguyên nhân, giải pháp.',
      'Sai — chỉ kể lại sự việc thì thiếu phân tích bản chất.',
      'Sai — chỉ phê phán là một chiều, thiếu các bước phân tích đầy đủ.',
      'Đúng — quy trình đầy đủ: nêu hiện tượng - thực trạng - nguyên nhân - hậu quả/ý nghĩa - giải pháp.',
    ]),
    Q('Khi viết về hiện tượng "ô nhiễm môi trường", cần?', ['Chỉ trách móc', 'Số liệu cụ thể về thực trạng, nêu nguyên nhân chủ quan/khách quan, hậu quả, giải pháp', 'Im lặng', 'Chỉ tả thiên nhiên'], 1, 'Số liệu + phân tích đa chiều ⇒ bài thuyết phục.', [
      'Đây là ví dụ vận dụng quy trình vào một <b>hiện tượng tiêu cực</b> cụ thể.',
      'Với đề "ô nhiễm môi trường", cần làm rõ:',
      '<ul><li><b>Thực trạng</b> (kèm số liệu cụ thể về mức độ ô nhiễm).</li><li><b>Nguyên nhân</b>: chủ quan (ý thức con người) và khách quan.</li><li><b>Hậu quả</b> với sức khỏe, sản xuất, hệ sinh thái.</li><li><b>Giải pháp</b> khắc phục.</li></ul>',
      'Số liệu thực tế và phân tích đa chiều làm tăng sức thuyết phục, tránh viết chung chung.',
    ], [
      'Sai — chỉ trách móc là một chiều, thiếu phân tích và giải pháp.',
      'Đúng — cần số liệu thực trạng, phân tích nguyên nhân chủ quan/khách quan, hậu quả và đề xuất giải pháp.',
      'Sai — im lặng, né tránh không phải cách viết nghị luận.',
      'Sai — chỉ tả thiên nhiên là văn miêu tả, không phải nghị luận hiện tượng.',
    ]),
    Q('Hiện tượng tích cực cần?', ['Bỏ qua', 'Chỉ phê phán', 'Im lặng', 'Ca ngợi + lan tỏa + đề xuất phát huy'], 3, 'Ghi nhận, biểu dương, nhân rộng.', [
      'Cần phân biệt cách viết về <b>hiện tượng tích cực</b> và <b>hiện tượng tiêu cực</b>.',
      'Với <b>hiện tượng tích cực</b> (vd: gương người tốt việc tốt, phong trào hiến máu...):',
      '<ul><li><b>Ca ngợi, biểu dương</b> ý nghĩa của hiện tượng.</li><li>Khuyến khích <b>lan tỏa</b>, đề xuất giải pháp <b>phát huy, nhân rộng</b>.</li></ul>',
      'Không phê phán hay bỏ qua một hiện tượng đáng được trân trọng.',
    ], [
      'Sai — hiện tượng tích cực cần được ghi nhận chứ không bỏ qua.',
      'Sai — phê phán không phù hợp với một hiện tượng tốt.',
      'Sai — không nên im lặng trước một hiện tượng đáng biểu dương.',
      'Đúng — với hiện tượng tích cực, cần ca ngợi, lan tỏa và đề xuất giải pháp phát huy, nhân rộng.',
    ]),
    Q('Khi nghị luận về "sống ảo trên mạng xã hội", thái độ phù hợp?', ['Phân tích cả mặt tích cực lẫn tiêu cực, không một chiều', 'Chỉ phản đối hoàn toàn', 'Né tránh', 'Chỉ ủng hộ'], 0, 'Nhìn nhận khách quan, đa chiều — không một chiều cực đoan.', [
      '<b>Thái độ khách quan, đa chiều</b> là yêu cầu quan trọng của người viết nghị luận xã hội.',
      'Với hiện tượng phức tạp như "sống ảo trên mạng xã hội":',
      '<ul><li>Cần phân tích <b>cả mặt tích cực và tiêu cực</b>, không nhìn một chiều.</li><li>Tránh thái độ <i>cực đoan</i>: phản đối hoàn toàn hoặc ủng hộ hoàn toàn.</li></ul>',
      'Cái nhìn khách quan, biện chứng giúp bài viết sâu sắc, thuyết phục và đúng đắn.',
    ], [
      'Đúng — cần nhìn nhận khách quan, phân tích cả mặt tích cực lẫn tiêu cực, không một chiều cực đoan.',
      'Sai — phản đối hoàn toàn là cái nhìn một chiều, phiến diện.',
      'Sai — né tránh không phải thái độ của người viết nghị luận.',
      'Sai — chỉ ủng hộ cũng là cái nhìn một chiều, thiếu khách quan.',
    ]),
    Q('Hiện tượng "bạo lực học đường" cần đề xuất giải pháp?', ['Không có giải pháp', 'Chỉ tuyên truyền', 'Chỉ kỷ luật', 'Từ gia đình, nhà trường, xã hội, bản thân học sinh'], 3, 'Giải pháp toàn diện, đồng bộ từ nhiều phía.', [
      'Phần <b>giải pháp</b> trong bài nghị luận hiện tượng tiêu cực cần <i>toàn diện, khả thi</i>.',
      'Với "bạo lực học đường", giải pháp cần đến từ nhiều phía:',
      '<ul><li><b>Gia đình:</b> quan tâm, giáo dục con em.</li><li><b>Nhà trường:</b> giáo dục đạo đức, kỉ luật nghiêm minh.</li><li><b>Xã hội:</b> tạo môi trường lành mạnh.</li><li><b>Bản thân học sinh:</b> rèn luyện nhân cách, kĩ năng ứng xử.</li></ul>',
      'Giải pháp đồng bộ, nhiều phía mới giải quyết được vấn đề tận gốc.',
    ], [
      'Sai — vấn đề cần giải pháp, không thể bỏ ngỏ.',
      'Sai — chỉ tuyên truyền là chưa đủ; cần giải pháp đồng bộ.',
      'Sai — chỉ kỷ luật là một phía; cần phối hợp nhiều bên.',
      'Đúng — giải pháp cần toàn diện, đồng bộ từ gia đình, nhà trường, xã hội và bản thân học sinh.',
    ]),
  ]),

  M(27, 'Nghị luận văn học — Phân tích bài thơ', [
    Q('Phân tích bài thơ là?', ['Học thuộc', 'Mổ xẻ làm rõ giá trị nội dung và nghệ thuật của bài thơ', 'Dịch nghĩa', 'Kể lại bài thơ'], 1, 'Làm rõ giá trị (nội dung + nghệ thuật) qua phân tích hình ảnh, ngôn từ, biện pháp.', [
      '<b>Nghị luận văn học</b> ở lớp 9 gồm: phân tích đoạn thơ/bài thơ và phân tích nhân vật/tác phẩm truyện.',
      '<b>Phân tích bài thơ</b> là:',
      '<ul><li><b>Mổ xẻ, làm rõ giá trị</b> nội dung và nghệ thuật của bài thơ.</li><li>Qua việc phân tích <i>hình ảnh, ngôn từ, biện pháp tu từ, nhịp điệu...</i></li></ul>',
      'Khác với việc học thuộc, dịch nghĩa hay kể lại nội dung bài thơ thành văn xuôi.',
    ], [
      'Sai — học thuộc không phải là phân tích bài thơ.',
      'Đúng — phân tích là mổ xẻ, làm rõ giá trị nội dung và nghệ thuật qua hình ảnh, ngôn từ, biện pháp tu từ.',
      'Sai — dịch nghĩa chỉ chuyển nghĩa, chưa phải phân tích giá trị.',
      'Sai — kể lại bài thơ thành văn xuôi không phải là phân tích.',
    ]),
    Q('Cấu trúc bài phân tích thơ?', ['Chỉ tả', 'Mở (giới thiệu) - Thân (phân tích theo từng khổ/từng ý) - Kết (đánh giá)', 'Chỉ thân bài', 'Chỉ cảm nhận'], 1, 'Cấu trúc chặt chẽ, có luận điểm rõ ràng.', [
      '<b>Bố cục ba phần</b> giúp bài phân tích thơ mạch lạc, chặt chẽ.',
      'Cấu trúc:',
      '<ul><li><b>Mở bài:</b> giới thiệu tác giả, tác phẩm và vấn đề nghị luận.</li><li><b>Thân bài:</b> phân tích lần lượt <i>theo từng khổ thơ / từng luận điểm</i>, có lí lẽ và dẫn chứng.</li><li><b>Kết bài:</b> đánh giá khái quát giá trị, nêu cảm nghĩ.</li></ul>',
      'Mỗi luận điểm cần rõ ràng, được làm sáng tỏ bằng việc phân tích từ ngữ, hình ảnh cụ thể.',
    ], [
      'Sai — phân tích thơ không phải chỉ tả mà cần lập luận, dẫn chứng.',
      'Đúng — mở bài (giới thiệu) - thân bài (phân tích theo từng khổ/từng ý) - kết bài (đánh giá).',
      'Sai — bài văn cần đủ ba phần, không chỉ có thân bài.',
      'Sai — chỉ cảm nhận chung chung thì thiếu phân tích có luận điểm.',
    ]),
    Q('Khi phân tích thơ, cần chú ý đến?', ['Chỉ tiểu sử tác giả', 'Số câu', 'Hình ảnh, ngôn từ, nhịp điệu, biện pháp tu từ, mạch cảm xúc', 'Chỉ nội dung'], 2, 'Phân tích đầy đủ các yếu tố nghệ thuật.', [
      'Để phân tích thơ sâu sắc, phải bám vào <b>các yếu tố nghệ thuật</b> đặc trưng của thơ.',
      'Những yếu tố cần chú ý:',
      '<ul><li><b>Hình ảnh thơ</b> và <b>ngôn từ</b> (từ ngữ đặc sắc).</li><li><b>Nhịp điệu, vần, nhạc tính</b>.</li><li><b>Biện pháp tu từ</b> (ẩn dụ, so sánh, điệp ngữ...).</li><li><b>Mạch cảm xúc</b> của bài thơ.</li></ul>',
      'Phân tích cả nội dung lẫn nghệ thuật, không sa vào kể tiểu sử hay đếm số câu.',
    ], [
      'Sai — tiểu sử tác giả chỉ là phần phụ trợ, không phải trọng tâm phân tích.',
      'Sai — đếm số câu không phải nội dung phân tích.',
      'Đúng — cần chú ý hình ảnh, ngôn từ, nhịp điệu, biện pháp tu từ và mạch cảm xúc của bài thơ.',
      'Sai — chỉ phân tích nội dung mà bỏ nghệ thuật là phiến diện.',
    ]),
    Q('Khi phân tích "Đồng chí", cần nhấn mạnh?', ['Kể về kháng chiến', 'Tả Chính Hữu', 'Cơ sở tình đồng chí, biểu hiện cụ thể, hình tượng "đầu súng trăng treo"', 'Bình luận chính trị'], 2, 'Bám vào chính bài thơ, làm rõ tư tưởng và nghệ thuật.', [
      'Đây là ví dụ về cách <b>xác định luận điểm</b> khi phân tích một bài thơ cụ thể.',
      'Khi phân tích "Đồng chí", cần làm rõ:',
      '<ul><li><b>Cơ sở</b> hình thành tình đồng chí (7 câu đầu).</li><li><b>Biểu hiện cụ thể</b> của tình đồng chí (đoạn giữa).</li><li>Vẻ đẹp biểu tượng qua hình tượng "<b>đầu súng trăng treo</b>" (3 câu cuối).</li></ul>',
      'Luôn <i>bám vào văn bản</i>, tránh sa đà kể lại lịch sử hay bình luận chính trị.',
    ], [
      'Sai — không sa đà kể lại lịch sử kháng chiến mà phải bám vào bài thơ.',
      'Sai — tả tiểu sử Chính Hữu không phải trọng tâm phân tích bài thơ.',
      'Đúng — cần làm rõ cơ sở tình đồng chí, các biểu hiện cụ thể và hình tượng "đầu súng trăng treo".',
      'Sai — không biến bài phân tích văn học thành bình luận chính trị.',
    ]),
    Q('Nên trích dẫn câu thơ trong bài phân tích?', ['Trích đúng + bình giảng làm rõ giá trị', 'Chỉ trích không bình', 'Trích sai cũng được', 'Không trích'], 0, 'Trích + phân tích, không "đọc thơ".', [
      '<b>Trích dẫn thơ</b> là kĩ năng quan trọng làm nên sức thuyết phục của bài phân tích.',
      'Nguyên tắc trích dẫn:',
      '<ul><li>Trích dẫn <b>chính xác</b> câu thơ (không trích sai).</li><li>Sau khi trích, phải <b>bình giảng, phân tích</b> để làm rõ giá trị nội dung - nghệ thuật.</li></ul>',
      '⚠️ Tránh lỗi "<i>đọc thơ</i>" — chỉ chép câu thơ ra mà không phân tích, hoặc kể lể không trích dẫn.',
    ], [
      'Đúng — cần trích dẫn chính xác và bình giảng để làm rõ giá trị, không chỉ "đọc thơ".',
      'Sai — trích mà không bình giảng thì chưa phải phân tích.',
      'Sai — trích sai làm sai lệch, mất tính chính xác và thuyết phục.',
      'Sai — không trích dẫn thì lập luận thiếu căn cứ từ văn bản.',
    ]),
    Q('Kết bài phân tích thơ nên?', ['Lặp lại mở bài', 'Bỏ trống', 'Tóm tắt nội dung', 'Đánh giá khái quát giá trị + nêu ấn tượng/cảm xúc người đọc'], 3, 'Khẳng định giá trị tác phẩm, vị trí trong nền văn học.', [
      '<b>Kết bài</b> của bài phân tích thơ cần nâng tầm khái quát, không chỉ tóm tắt.',
      'Yêu cầu:',
      '<ul><li><b>Đánh giá khái quát</b> giá trị nội dung - nghệ thuật của bài thơ.</li><li>Khẳng định <b>vị trí, sức sống</b> của tác phẩm.</li><li>Nêu <b>ấn tượng, cảm xúc</b> của người đọc.</li></ul>',
      'Kết bài tốt giúp bài viết trọn vẹn, để lại dư âm; tránh lặp lại mở bài hay bỏ trống.',
    ], [
      'Sai — kết bài không nên lặp y nguyên mở bài.',
      'Sai — không được bỏ trống kết bài.',
      'Sai — chỉ tóm tắt nội dung thì chưa nâng tầm đánh giá.',
      'Đúng — kết bài nên đánh giá khái quát giá trị tác phẩm và nêu ấn tượng, cảm xúc người đọc.',
    ]),
  ]),

  M(28, 'Nghị luận văn học — Phân tích nhân vật', [
    Q('Phân tích nhân vật cần làm rõ?', ['Chỉ tả ngoại hình', 'Chỉ kể lại', 'Đặc điểm (ngoại hình, hành động, lời nói, nội tâm) + ý nghĩa', 'Chỉ đánh giá đạo đức'], 2, 'Phân tích toàn diện các phương diện của nhân vật.', [
      '<b>Phân tích nhân vật</b> là kiểu bài nghị luận về tác phẩm truyện thường gặp trong đề thi vào 10.',
      'Cần làm rõ các phương diện:',
      '<ul><li><b>Ngoại hình</b> (nếu có ý nghĩa).</li><li><b>Hành động, lời nói, cử chỉ</b>.</li><li><b>Nội tâm</b> (suy nghĩ, cảm xúc).</li><li><b>Ý nghĩa</b> của nhân vật (điển hình cho điều gì).</li></ul>',
      'Phân tích toàn diện, tránh phiến diện (chỉ tả ngoại hình, chỉ kể, chỉ đánh giá đạo đức).',
    ], [
      'Sai — chỉ tả ngoại hình là phiến diện, bỏ qua nội tâm và hành động.',
      'Sai — kể lại không phải phân tích.',
      'Đúng — cần làm rõ đặc điểm (ngoại hình, hành động, lời nói, nội tâm) và ý nghĩa của nhân vật.',
      'Sai — chỉ đánh giá đạo đức là một mặt, thiếu phân tích toàn diện.',
    ]),
    Q('Khi phân tích Phương Định ("Những ngôi sao xa xôi"), cần làm rõ?', ['Chỉ tâm lý', 'Chỉ công việc', 'Vẻ đẹp dũng cảm trong chiến đấu + tâm hồn mơ mộng nữ tính', 'Chỉ ngoại hình'], 2, 'Tổng hòa các phẩm chất tạo nên chân dung sống động.', [
      'Đây là ví dụ <b>xác định luận điểm</b> khi phân tích một nhân vật cụ thể.',
      'Khi phân tích <b>Phương Định</b>, cần làm rõ hai vẻ đẹp:',
      '<ul><li><b>Vẻ đẹp dũng cảm</b>, gan dạ, có tinh thần trách nhiệm trong công việc phá bom.</li><li><b>Tâm hồn trong sáng, mơ mộng, nữ tính</b> (yêu ca hát, hồn nhiên, hay nhớ về Hà Nội).</li></ul>',
      'Tổng hòa hai vẻ đẹp ấy tạo nên chân dung sống động, tiêu biểu cho người con gái Việt Nam thời chiến.',
    ], [
      'Sai — chỉ phân tích tâm lý là chưa đủ; cần cả vẻ đẹp trong chiến đấu.',
      'Sai — chỉ nói về công việc thì bỏ qua tâm hồn nữ tính của nhân vật.',
      'Đúng — cần làm rõ vẻ đẹp dũng cảm trong chiến đấu và tâm hồn mơ mộng, nữ tính của Phương Định.',
      'Sai — chỉ tả ngoại hình thì không thấy được phẩm chất nhân vật.',
    ]),
    Q('Khi phân tích ông Hai ("Làng"), trọng tâm là?', ['Tả ngoại hình', 'Cảnh nông thôn', 'Tình yêu làng quê hòa quyện tình yêu kháng chiến qua diễn biến tâm trạng', 'Hoàn cảnh gia đình'], 2, 'Phân tích diễn biến tâm trạng — điểm sáng nghệ thuật.', [
      'Mỗi nhân vật có <b>điểm sáng nghệ thuật</b> riêng cần làm trọng tâm khi phân tích.',
      'Với nhân vật <b>ông Hai</b>:',
      '<ul><li>Trọng tâm là <b>tình yêu làng hòa quyện tình yêu nước</b>, tinh thần kháng chiến.</li><li>Bộc lộ qua <b>diễn biến tâm trạng</b>: trước khi nghe tin, khi nghe tin dữ, khi nghe tin cải chính.</li></ul>',
      'Ngoại hình, cảnh nông thôn, hoàn cảnh gia đình chỉ là <i>chi tiết phụ trợ</i>, không phải trọng tâm.',
    ], [
      'Sai — ngoại hình không phải trọng tâm khi phân tích ông Hai.',
      'Sai — cảnh nông thôn chỉ là bối cảnh, không phải trọng tâm.',
      'Đúng — trọng tâm là tình yêu làng hòa quyện tình yêu kháng chiến, thể hiện qua diễn biến tâm trạng nhân vật.',
      'Sai — hoàn cảnh gia đình chỉ là chi tiết phụ trợ.',
    ]),
    Q('Phân tích nhân vật cần trích dẫn?', ['Không cần', 'Lời thầy cô', 'Tác phẩm khác', 'Chi tiết, câu văn, lời thoại tiêu biểu từ tác phẩm'], 3, 'Dẫn chứng từ chính tác phẩm để bảo đảm tính thuyết phục.', [
      '<b>Dẫn chứng</b> trong bài phân tích nhân vật phải lấy từ chính tác phẩm đang phân tích.',
      'Loại dẫn chứng cần dùng:',
      '<ul><li><b>Chi tiết</b> tiêu biểu (hành động, cử chỉ của nhân vật).</li><li><b>Câu văn, lời thoại</b> đặc sắc của nhân vật.</li></ul>',
      'Dẫn chứng từ <i>chính tác phẩm</i> đảm bảo tính thuyết phục; không lấy lời thầy cô hay tác phẩm khác làm căn cứ chính.',
    ], [
      'Sai — không trích dẫn thì lập luận thiếu căn cứ.',
      'Sai — lời thầy cô không phải dẫn chứng văn học.',
      'Sai — trích từ tác phẩm khác không làm rõ nhân vật đang phân tích.',
      'Đúng — cần trích chi tiết, câu văn, lời thoại tiêu biểu từ chính tác phẩm để bảo đảm tính thuyết phục.',
    ]),
    Q('Ngoại hình nhân vật trong văn học thường?', ['Chỉ để trang trí, không liên quan tính cách', 'Tách rời tính cách', 'Tả ngẫu nhiên', 'Mang dụng ý nghệ thuật, gắn với tính cách'], 3, 'Ngoại hình là chi tiết có chủ đích, biểu hiện tính cách.', [
      'Khi phân tích, cần hiểu mối quan hệ giữa <b>ngoại hình</b> và <b>tính cách</b> nhân vật.',
      'Đặc điểm:',
      '<ul><li>Nhà văn <b>chọn lọc</b> chi tiết ngoại hình có chủ đích, không tả ngẫu nhiên.</li><li>Ngoại hình thường <b>gắn liền, biểu hiện</b> tính cách, số phận nhân vật.</li></ul>',
      'Vd: vết thẹo của ông Sáu ("Chiếc lược ngà") không chỉ tả mặt mà gợi <i>dấu ấn chiến tranh</i> và là nguyên nhân thắt nút câu chuyện.',
    ], [
      'Sai — ngoại hình không chỉ để trang trí mà có dụng ý nghệ thuật.',
      'Sai — ngoại hình thường gắn liền chứ không tách rời tính cách.',
      'Sai — nhà văn chọn lọc chi tiết ngoại hình có chủ đích, không ngẫu nhiên.',
      'Đúng — ngoại hình nhân vật thường mang dụng ý nghệ thuật, gắn với và biểu hiện tính cách.',
    ]),
    Q('Kết bài phân tích nhân vật nên?', ['Tả ngoại hình lần nữa', 'Lặp lại', 'Đánh giá vai trò nhân vật trong tác phẩm + ý nghĩa với người đọc', 'Bỏ trống'], 2, 'Khẳng định ý nghĩa, sức sống của nhân vật.', [
      '<b>Kết bài</b> của bài phân tích nhân vật cần khái quát, nâng tầm đánh giá.',
      'Yêu cầu:',
      '<ul><li><b>Đánh giá vai trò</b> của nhân vật trong tác phẩm (góp phần thể hiện chủ đề ra sao).</li><li>Nêu <b>ý nghĩa</b> của nhân vật với người đọc, với cuộc sống.</li></ul>',
      'Kết bài tốt khẳng định sức sống của nhân vật; tránh tả lại ngoại hình hay lặp lại các ý đã viết.',
    ], [
      'Sai — không cần tả lại ngoại hình ở kết bài.',
      'Sai — kết bài không nên lặp lại nguyên các ý đã viết.',
      'Đúng — kết bài nên đánh giá vai trò nhân vật trong tác phẩm và ý nghĩa của nhân vật với người đọc.',
      'Sai — không được bỏ trống kết bài.',
    ]),
  ]),

  M(29, 'Văn bản nhật dụng — Phong cách Hồ Chí Minh', [
    Q('"Phong cách Hồ Chí Minh" của ai?', ['Trường Chinh', 'Hồ Chí Minh', 'Lê Anh Trà', 'Phạm Văn Đồng'], 2, 'Tác giả Lê Anh Trà.', [
      '<b>"Phong cách Hồ Chí Minh"</b> là <i>văn bản nhật dụng</i> mở đầu chương trình Ngữ văn 9, thuộc chủ đề <b>hội nhập và giữ gìn bản sắc</b>.',
      'Về tác giả và xuất xứ:',
      '<ul><li>Tác giả là <b>Lê Anh Trà</b>.</li><li>Trích từ bài "Phong cách Hồ Chí Minh, cái vĩ đại gắn với cái giản dị".</li></ul>',
      'Lưu ý phân biệt: Phạm Văn Đồng viết "Đức tính giản dị của Bác Hồ" (học ở lớp 7), không phải văn bản này.',
    ], [
      'Sai — Trường Chinh không phải tác giả văn bản này.',
      'Sai — văn bản viết về Bác Hồ nhưng do người khác viết, không phải Bác tự viết.',
      'Đúng — văn bản "Phong cách Hồ Chí Minh" do Lê Anh Trà viết.',
      'Sai — Phạm Văn Đồng có viết về Bác (như "Đức tính giản dị của Bác Hồ") nhưng không phải tác giả văn bản này.',
    ]),
    Q('Văn bản nhật dụng là?', ['Văn cổ điển', 'Văn bản kịch sân khấu nhiều xung đột', 'Tiểu thuyết', 'Văn bản đề cập đến những vấn đề thiết thực, gần gũi với đời sống hiện nay'], 3, 'Đề tài nóng, gần gũi, mang tính thời sự, giáo dục.', [
      '<b>Văn bản nhật dụng</b> là một khái niệm về <i>nội dung</i> (không phải thể loại) cần nắm vững.',
      'Đặc điểm:',
      '<ul><li>Đề cập những vấn đề <b>thiết thực, gần gũi</b> với đời sống con người hôm nay.</li><li>Mang tính <b>thời sự, cập nhật</b> (môi trường, dân số, hội nhập, hòa bình, quyền trẻ em...).</li><li>Có ý nghĩa <i>giáo dục</i>.</li></ul>',
      'Văn bản nhật dụng có thể dùng nhiều thể loại, phương thức biểu đạt khác nhau.',
    ], [
      'Sai — văn nhật dụng không phải khái niệm chỉ văn cổ điển.',
      'Sai — kịch sân khấu là một thể loại riêng, không phải định nghĩa văn nhật dụng.',
      'Sai — tiểu thuyết là một thể loại hư cấu, không phải văn nhật dụng.',
      'Đúng — văn bản nhật dụng đề cập những vấn đề thiết thực, gần gũi, mang tính thời sự và giáo dục.',
    ]),
    Q('Phong cách Hồ Chí Minh là sự kết hợp?', ['Vẻ đẹp truyền thống dân tộc và tinh hoa văn hóa nhân loại', 'Hai phong cách phương Tây', 'Truyền thống và hiện đại', 'Đông và Tây cực đoan'], 0, 'Tinh hoa Đông + Tây + dân tộc, hài hòa.', [
      'Luận điểm cốt lõi của văn bản: phong cách Hồ Chí Minh là <b>sự kết hợp hài hòa</b> nhiều vẻ đẹp.',
      'Nội dung:',
      '<ul><li>Kết hợp giữa <b>vẻ đẹp truyền thống dân tộc</b> và <b>tinh hoa văn hóa nhân loại</b>.</li><li>Tiếp thu tinh hoa thế giới nhưng vẫn giữ vững <i>cốt cách, bản sắc Việt Nam</i>.</li></ul>',
      'Đó là sự nhuần nhuyễn giữa Đông và Tây, giữa truyền thống và hiện đại, không hề chắp vá, cực đoan.',
    ], [
      'Đúng — là sự kết hợp hài hòa giữa vẻ đẹp truyền thống dân tộc và tinh hoa văn hóa nhân loại.',
      'Sai — không phải kết hợp hai phong cách phương Tây mà là Đông - Tây và dân tộc.',
      'Sai — cách diễn đạt này chưa nêu đúng cốt lõi vẻ đẹp dân tộc và tinh hoa nhân loại.',
      'Sai — sự kết hợp ở Bác là hài hòa, không hề cực đoan.',
    ]),
    Q('Sự giản dị của Bác thể hiện ở?', ['Lối sống, trang phục, bữa ăn, nơi ở', 'Cách nói', 'Tất cả các đáp án trên', 'Cách viết'], 2, 'Giản dị toàn diện trong cuộc sống thường nhật.', [
      'Văn bản nhấn mạnh: <b>cái vĩ đại</b> của Bác gắn liền với <b>cái giản dị</b>.',
      'Sự giản dị thể hiện <i>toàn diện</i>:',
      '<ul><li><b>Nơi ở:</b> ngôi nhà sàn nhỏ bằng gỗ.</li><li><b>Trang phục:</b> bộ quần áo bà ba nâu, đôi dép lốp.</li><li><b>Bữa ăn:</b> cá kho, rau luộc, cà muối, cháo hoa...</li><li><b>Cách nói, cách viết:</b> ngắn gọn, dễ hiểu.</li></ul>',
      'Đó là lối sống thanh cao, "không tự thần thánh hóa" của một bậc vĩ nhân.',
    ], [
      'Sai — đúng nhưng chưa đầy đủ; sự giản dị còn ở cách nói, cách viết.',
      'Sai — đúng một phần; còn lối sống, trang phục, bữa ăn, cách viết.',
      'Đúng — sự giản dị của Bác thể hiện toàn diện: lối sống, trang phục, bữa ăn, nơi ở, cách nói và cách viết.',
      'Sai — đúng một phần; còn nhiều phương diện khác thể hiện sự giản dị.',
    ]),
    Q('Văn bản giúp người đọc?', ['Chỉ biết tiểu sử', 'Cảm phục và học tập tấm gương đạo đức, lối sống của Bác', 'Học ngoại ngữ', 'Học chính trị'], 1, 'Bồi dưỡng nhân cách, lý tưởng sống.', [
      '<b>Ý nghĩa</b> của văn bản nhật dụng này gắn với mục tiêu <i>giáo dục nhân cách</i>.',
      'Tác dụng với người đọc:',
      '<ul><li>Giúp <b>cảm phục</b> và <b>học tập</b> tấm gương đạo đức, lối sống giản dị mà thanh cao của Bác.</li><li>Gợi suy ngẫm về việc <i>hội nhập</i> mà vẫn giữ gìn bản sắc văn hóa dân tộc.</li></ul>',
      'Văn bản không dừng ở việc cung cấp tiểu sử mà bồi dưỡng nhân cách, lí tưởng sống cho học sinh.',
    ], [
      'Sai — văn bản không dừng ở cung cấp tiểu sử mà bồi dưỡng nhân cách.',
      'Đúng — văn bản giúp người đọc cảm phục và học tập tấm gương đạo đức, lối sống của Bác.',
      'Sai — mục đích văn bản không phải dạy ngoại ngữ.',
      'Sai — mục đích chính là bồi dưỡng nhân cách, lý tưởng sống, không phải học chính trị.',
    ]),
    Q('Sự kết hợp Đông - Tây trong phong cách Bác là kết quả của?', ['Du lịch', 'Đọc sách', 'Bẩm sinh', 'Quá trình học tập, lao động, hoạt động cách mạng ở nhiều quốc gia'], 3, 'Bác đã đến nhiều nước, tiếp xúc nhiều nền văn hóa.', [
      'Văn bản lí giải <b>nguồn gốc</b> vốn văn hóa sâu rộng của Bác.',
      'Sự kết hợp Đông - Tây trong phong cách Bác đến từ:',
      '<ul><li><b>Quá trình học tập, lao động, hoạt động cách mạng</b> ở nhiều nước trên thế giới.</li><li>Bác <i>tiếp xúc</i>, am hiểu nhiều nền văn hóa; thông thạo nhiều ngoại ngữ.</li><li>Tiếp thu có <b>chọn lọc, phê phán</b> trên nền tảng văn hóa dân tộc.</li></ul>',
      'Đó là kết quả của rèn luyện, trải nghiệm thực tiễn, không phải bẩm sinh hay du lịch đơn thuần.',
    ], [
      'Sai — không phải nhờ du lịch đơn thuần mà nhờ cả quá trình hoạt động cách mạng.',
      'Sai — đọc sách chỉ là một phần; cốt lõi là trải nghiệm thực tiễn ở nhiều nước.',
      'Sai — đây là kết quả của rèn luyện, không phải bẩm sinh.',
      'Đúng — đó là kết quả của quá trình học tập, lao động, hoạt động cách mạng ở nhiều quốc gia, tiếp xúc nhiều nền văn hóa.',
    ]),
  ]),

  M(30, 'Văn bản nhật dụng — Đấu tranh cho một thế giới hòa bình', [
    Q('Tác giả "Đấu tranh cho một thế giới hòa bình" là?', ['A. Chekhov', 'G. Márquez (G. Garcia Marquez)', 'M. Gorki', 'L. Tolstoy'], 1, 'Nhà văn Colombia G. Garcia Marquez — Nobel Văn học 1982.', [
      '<b>"Đấu tranh cho một thế giới hòa bình"</b> là văn bản nhật dụng thuộc chủ đề <i>bảo vệ hòa bình, chống chiến tranh</i>.',
      'Về tác giả:',
      '<ul><li><b>G. G. Mác-két</b> (G. Garcia Marquez), nhà văn <b>Cô-lôm-bi-a</b> (Nam Mỹ).</li><li>Được trao <b>giải Nobel Văn học năm 1982</b>.</li></ul>',
      'Văn bản trích từ bản tham luận của ông tại cuộc họp các nguyên thủ quốc gia bàn về chống chiến tranh hạt nhân (1986).',
    ], [
      'Sai — A. Chekhov là nhà văn Nga, không phải tác giả văn bản này.',
      'Đúng — tác giả là G. Garcia Marquez, nhà văn Colombia, Nobel Văn học 1982.',
      'Sai — M. Gorki là nhà văn Nga, không phải tác giả văn bản này.',
      'Sai — L. Tolstoy là đại văn hào Nga, không phải tác giả văn bản này.',
    ]),
    Q('Văn bản viết về vấn đề?', ['Môi trường', 'Giáo dục', 'Kinh tế', 'Hiểm họa chiến tranh hạt nhân và lời kêu gọi hòa bình'], 3, 'Cảnh báo về nguy cơ hủy diệt từ vũ khí hạt nhân.', [
      '<b>Vấn đề trung tâm</b> của văn bản là <i>nguy cơ chiến tranh hạt nhân</i> đe dọa loài người.',
      'Nội dung chính:',
      '<ul><li><b>Cảnh báo</b> hiểm họa của chiến tranh hạt nhân — sức hủy diệt khủng khiếp.</li><li><b>Kêu gọi</b> nhân loại đoàn kết đấu tranh cho một thế giới hòa bình.</li></ul>',
      'Đây là một vấn đề mang tính <b>toàn cầu, cấp thiết</b>, đúng tính chất của văn bản nhật dụng.',
    ], [
      'Sai — văn bản không bàn về môi trường.',
      'Sai — văn bản không viết về giáo dục.',
      'Sai — kinh tế chỉ được nhắc qua số liệu, không phải vấn đề trung tâm.',
      'Đúng — văn bản cảnh báo hiểm họa chiến tranh hạt nhân và kêu gọi đấu tranh cho hòa bình.',
    ]),
    Q('Tác giả dùng số liệu để chứng minh điều gì?', ['Sự giàu có', 'Sự phát triển', 'Sự nguy hiểm của vũ khí hạt nhân và sự lãng phí khổng lồ tiền của thay vì lo cho con người', 'Sự tiến bộ'], 2, 'Số liệu thuyết phục: chi phí khổng lồ cho vũ khí có thể giải quyết bao vấn đề nhân loại.', [
      'Mác-két dùng <b>lập luận bằng số liệu, dẫn chứng</b> rất giàu sức thuyết phục.',
      'Các số liệu chứng minh:',
      '<ul><li><b>Sự nguy hiểm</b>: kho vũ khí hạt nhân đủ sức tiêu diệt nhiều lần sự sống trên Trái Đất.</li><li><b>Sự lãng phí khổng lồ</b>: chi phí cho vũ khí có thể dùng để giải quyết nạn đói, bệnh tật, giáo dục cho hàng tỉ người.</li></ul>',
      'Cách so sánh cụ thể (chương trình y tế, lương thực, giáo dục...) làm nổi bật sự <i>phi lí, tốn kém</i> của chạy đua vũ trang.',
    ], [
      'Sai — số liệu không nhằm khoe sự giàu có.',
      'Sai — số liệu không dùng để ca ngợi sự phát triển.',
      'Đúng — số liệu chứng minh sự nguy hiểm của vũ khí hạt nhân và sự lãng phí khổng lồ tiền của lẽ ra nên lo cho con người.',
      'Sai — số liệu không nhằm chứng minh sự tiến bộ mà cảnh báo về hiểm họa.',
    ]),
    Q('Cách lập luận của tác giả?', ['Cảm tính', 'Sơ sài', 'Lan man', 'Chặt chẽ, đầy số liệu, có cảm xúc và sức thuyết phục cao'], 3, 'Kết hợp lý lẽ + số liệu + cảm xúc nhân văn.', [
      '<b>Nghệ thuật lập luận</b> là điểm nổi bật cần ghi nhớ về văn bản này.',
      'Đặc điểm lập luận của Mác-két:',
      '<ul><li><b>Chặt chẽ</b>, hệ thống luận điểm rõ ràng.</li><li>Giàu <b>số liệu, chứng cứ xác thực</b>.</li><li>Kết hợp <b>cảm xúc nhân văn</b>, nhiệt thành ⇒ sức thuyết phục cao.</li></ul>',
      'Lối lập luận này khiến văn bản nghị luận trở nên đanh thép mà vẫn lay động lòng người.',
    ], [
      'Sai — lập luận dựa trên số liệu xác thực chứ không cảm tính.',
      'Sai — lập luận công phu, dày dặn chứ không sơ sài.',
      'Sai — lập luận mạch lạc, tập trung chứ không lan man.',
      'Đúng — lập luận chặt chẽ, đầy số liệu, kết hợp cảm xúc nhân văn nên sức thuyết phục cao.',
    ]),
    Q('Thông điệp chính của văn bản?', ['Hãy bảo vệ hòa bình, đấu tranh ngăn chặn chiến tranh hạt nhân', 'Tích trữ vũ khí', 'Sống thờ ơ', 'Phát triển vũ khí'], 0, 'Lời kêu gọi nhân loại đoàn kết vì hòa bình.', [
      '<b>Thông điệp</b> là tư tưởng cốt lõi mà tác giả gửi gắm.',
      'Lời kêu gọi của Mác-két:',
      '<ul><li>Toàn nhân loại hãy <b>đoàn kết</b>, ngăn chặn nguy cơ <b>chiến tranh hạt nhân</b>.</li><li><b>Đấu tranh cho một thế giới hòa bình</b> — vì sự sống còn của Trái Đất và loài người.</li></ul>',
      'Thông điệp này trái ngược hoàn toàn với thái độ thờ ơ hay cổ vũ tích trữ, phát triển vũ khí.',
    ], [
      'Đúng — thông điệp là kêu gọi nhân loại đoàn kết bảo vệ hòa bình, đấu tranh ngăn chặn chiến tranh hạt nhân.',
      'Sai — văn bản phản đối chạy đua vũ trang, không cổ vũ tích trữ vũ khí.',
      'Sai — văn bản kêu gọi hành động, trái ngược với thái độ thờ ơ.',
      'Sai — văn bản phản đối phát triển vũ khí hạt nhân.',
    ]),
    Q('Văn bản có ý nghĩa với thế giới hiện đại?', ['Không còn ý nghĩa', 'Chỉ liên quan thế kỷ trước', 'Lỗi thời', 'Vẫn nóng hổi vì nguy cơ chiến tranh, xung đột chưa hết'], 3, 'Vấn đề vẫn rất thời sự — vũ khí hạt nhân vẫn là mối đe dọa.', [
      '<b>Tính thời sự</b> là đặc trưng quan trọng của văn bản nhật dụng.',
      'Giá trị với hôm nay:',
      '<ul><li>Dù viết từ năm 1986, vấn đề vẫn <b>nóng hổi, thời sự</b>.</li><li>Nguy cơ <i>chiến tranh, xung đột</i> và vũ khí hạt nhân vẫn còn là <b>mối đe dọa</b> đối với nhân loại.</li></ul>',
      'Vì vậy, văn bản vẫn giữ nguyên giá trị cảnh tỉnh và lời kêu gọi hòa bình.',
    ], [
      'Sai — văn bản vẫn còn nguyên giá trị, không hề mất ý nghĩa.',
      'Sai — vấn đề không chỉ giới hạn ở thế kỷ trước.',
      'Sai — thông điệp hòa bình không bao giờ lỗi thời.',
      'Đúng — văn bản vẫn nóng hổi vì nguy cơ chiến tranh, xung đột và vũ khí hạt nhân vẫn là mối đe dọa.',
    ]),
  ]),

  M(31, 'Ôn tập về thơ', [
    Q('Đặc điểm chung của thơ hiện đại VN giai đoạn 1945-1975?', ['Thơ tình cá nhân', 'Thơ tôn giáo', 'Cảm hứng yêu nước, cách mạng, hình tượng người lính, nhân dân lao động', 'Thơ trào phúng'], 2, 'Khuynh hướng sử thi + cảm hứng lãng mạn cách mạng.', [
      'Ôn tập về thơ HK2 cần nắm <b>đặc điểm chung theo từng giai đoạn</b>.',
      'Thơ hiện đại Việt Nam <b>1945–1975</b>:',
      '<ul><li>Cảm hứng <b>yêu nước, cách mạng</b> là chủ đạo.</li><li>Tập trung khắc họa hình tượng <b>người lính, nhân dân lao động</b>.</li><li>Mang khuynh hướng <i>sử thi</i> và cảm hứng <i>lãng mạn cách mạng</i>.</li></ul>',
      'Tiêu biểu: "Đồng chí", "Bài thơ về tiểu đội xe không kính", "Đoàn thuyền đánh cá".',
    ], [
      'Sai — giai đoạn này thơ hướng về cộng đồng, không thiên về tình cảm cá nhân.',
      'Sai — thơ tôn giáo không phải đặc điểm chung của giai đoạn này.',
      'Đúng — cảm hứng yêu nước, cách mạng với hình tượng người lính và nhân dân lao động, mang khuynh hướng sử thi và cảm hứng lãng mạn.',
      'Sai — trào phúng không phải đặc điểm chủ đạo của thơ giai đoạn 1945-1975.',
    ]),
    Q('Bài thơ nào sáng tác sau 1975?', ['Đồng chí', 'Sang thu, Mùa xuân nho nhỏ, Ánh trăng', 'Bài thơ về tiểu đội xe không kính', 'Đoàn thuyền đánh cá'], 1, 'Sang thu (1977), Mùa xuân nho nhỏ (1980), Ánh trăng (1978).', [
      'Ghi nhớ <b>mốc thời gian sáng tác</b> giúp phân loại các bài thơ trước/sau 1975.',
      'Các bài thơ <b>sau 1975</b>:',
      '<ul><li>"<code>Ánh trăng</code>" — Nguyễn Duy (1978).</li><li>"<code>Sang thu</code>" — Hữu Thỉnh (1977).</li><li>"<code>Mùa xuân nho nhỏ</code>" — Thanh Hải (1980).</li></ul>',
      'Ngược lại, "Đồng chí" (1948), "Đoàn thuyền đánh cá" (1958), "Bài thơ về tiểu đội xe không kính" (1969) đều trước 1975.',
    ], [
      'Sai — "Đồng chí" viết năm 1948, trước 1975.',
      'Đúng — Sang thu (1977), Mùa xuân nho nhỏ (1980), Ánh trăng (1978) đều ra đời sau 1975.',
      'Sai — "Bài thơ về tiểu đội xe không kính" viết năm 1969, trước 1975.',
      'Sai — "Đoàn thuyền đánh cá" viết năm 1958, trước 1975.',
    ]),
    Q('Cảm hứng chủ đạo của "Mùa xuân nho nhỏ"?', ['Khát vọng cống hiến', 'Tình yêu đôi lứa', 'Nỗi nhớ quê', 'Sự cô đơn'], 0, 'Cống hiến phần mình cho mùa xuân lớn của đất nước.', [
      'Ôn tập cần nhớ <b>cảm hứng/chủ đề</b> tiêu biểu của từng bài thơ.',
      'Với "<b>Mùa xuân nho nhỏ</b>" (Thanh Hải):',
      '<ul><li>Cảm hứng chủ đạo là <b>khát vọng cống hiến</b>.</li><li>Ước nguyện làm "một mùa xuân nho nhỏ" <i>lặng lẽ dâng cho đời</i>, cho đất nước.</li></ul>',
      'Đó là lẽ sống đẹp: sống là để cống hiến, hòa cái riêng vào cái chung.',
    ], [
      'Đúng — cảm hứng chủ đạo là khát vọng cống hiến phần nhỏ bé của mình cho mùa xuân lớn của đất nước.',
      'Sai — bài thơ không viết về tình yêu đôi lứa.',
      'Sai — cảm hứng chính là cống hiến, không phải nỗi nhớ quê.',
      'Sai — bài thơ tràn đầy khát vọng dâng hiến, không gợi sự cô đơn.',
    ]),
    Q('Bài thơ nào thể hiện tình cảm cha con sâu sắc?', ['Bếp lửa', 'Ánh trăng', 'Nói với con', 'Đồng chí'], 2, 'Y Phương — lời cha truyền con tình yêu cội nguồn.', [
      'Ôn tập cần phân biệt <b>chủ đề tình cảm gia đình</b> trong các bài thơ.',
      'Đối chiếu:',
      '<ul><li>"<b>Nói với con</b>" (Y Phương) — tình <b>cha con</b>, lời cha truyền con tình yêu cội nguồn, quê hương.</li><li>"<i>Bếp lửa</i>" — tình bà cháu; "<i>Ánh trăng</i>" — đạo lí nhớ quá khứ; "<i>Đồng chí</i>" — tình đồng đội.</li></ul>',
      'Vậy bài thể hiện tình cha con sâu sắc là "Nói với con".',
    ], [
      'Sai — "Bếp lửa" thể hiện tình bà cháu, không phải tình cha con.',
      'Sai — "Ánh trăng" nói về đạo lý nhớ quá khứ, không phải tình cha con.',
      'Đúng — "Nói với con" của Y Phương là lời cha truyền cho con tình yêu cội nguồn, quê hương.',
      'Sai — "Đồng chí" viết về tình đồng đội, không phải tình cha con.',
    ]),
    Q('Thể thơ năm chữ xuất hiện trong các bài?', ['Viếng lăng Bác', 'Bếp lửa', 'Đồng chí', 'Mùa xuân nho nhỏ, Ánh trăng, Sang thu'], 3, 'Cả 3 bài đều thể thơ 5 chữ — nhịp nhẹ nhàng, suy ngẫm.', [
      'Ôn tập cần phân loại <b>thể thơ</b> của các tác phẩm đã học.',
      'Các bài thơ <b>thể năm chữ</b>:',
      '<ul><li>"<code>Mùa xuân nho nhỏ</code>", "<code>Ánh trăng</code>", "<code>Sang thu</code>".</li><li>Nhịp <i>nhẹ nhàng, suy ngẫm</i>, phù hợp giãi bày cảm xúc.</li></ul>',
      'Đối chiếu: "Viếng lăng Bác" (tám chữ), "Bếp lửa" (tám chữ), "Đồng chí" (tự do).',
    ], [
      'Sai — "Viếng lăng Bác" chủ yếu là thơ tám chữ xen bảy chữ.',
      'Sai — "Bếp lửa" thiên về thể tám chữ.',
      'Sai — "Đồng chí" là thơ tự do.',
      'Đúng — Mùa xuân nho nhỏ, Ánh trăng, Sang thu đều là thơ năm chữ, nhịp nhẹ nhàng, suy ngẫm.',
    ]),
    Q('Đặc điểm nổi bật của thơ Việt Nam sau 1975?', ['Trào phúng', 'Cổ điển', 'Sử thi hào hùng', 'Cảm hứng đời tư, suy ngẫm, triết lý'], 3, 'Thơ chuyển hướng nội tâm, suy ngẫm sâu sắc về cuộc sống.', [
      'So sánh hai giai đoạn giúp nắm vững <b>sự vận động của thơ Việt Nam hiện đại</b>.',
      'Thơ <b>sau 1975</b> có đặc điểm:',
      '<ul><li>Chuyển từ khuynh hướng sử thi sang <b>cảm hứng đời tư, thế sự</b>.</li><li>Đi sâu vào <b>nội tâm, suy ngẫm, triết lí</b> về cuộc sống.</li></ul>',
      'Tiêu biểu: "Ánh trăng" (suy ngẫm về quá khứ), "Sang thu" (chiêm nghiệm lúc sang thu của đời người).',
    ], [
      'Sai — trào phúng không phải đặc điểm nổi bật của thơ sau 1975.',
      'Sai — thơ sau 1975 hiện đại, không quay về thi pháp cổ điển.',
      'Sai — khuynh hướng sử thi hào hùng là đặc điểm của thơ 1945-1975.',
      'Đúng — thơ sau 1975 chuyển hướng về cảm hứng đời tư, nội tâm, suy ngẫm và triết lý về cuộc sống.',
    ]),
  ]),

  M(32, 'Ôn tập về truyện', [
    Q('Đặc điểm truyện ngắn hiện đại VN?', ['Dài, nhiều nhân vật', 'Có cốt truyện độc đáo, tình huống đặc sắc, khắc họa nội tâm sâu sắc', 'Cổ điển', 'Sử thi'], 1, 'Tinh túy ở tình huống + tâm lý nhân vật.', [
      'Ôn tập về truyện HK2 cần nắm <b>đặc điểm chung</b> của truyện ngắn hiện đại.',
      'Đặc trưng:',
      '<ul><li>Dung lượng <b>nhỏ gọn</b>, ít nhân vật, ít sự kiện.</li><li>Thường có <b>tình huống truyện độc đáo</b>, đặc sắc.</li><li>Chú trọng <b>khắc họa nội tâm</b>, tâm lí nhân vật.</li></ul>',
      'Các truyện đã học: "Làng", "Lặng lẽ Sa Pa", "Chiếc lược ngà", "Bến quê", "Những ngôi sao xa xôi".',
    ], [
      'Sai — truyện ngắn thường dung lượng nhỏ gọn, ít nhân vật.',
      'Đúng — truyện ngắn hiện đại có cốt truyện độc đáo, tình huống đặc sắc và khắc họa nội tâm sâu sắc.',
      'Sai — "cổ điển" không phải đặc điểm của truyện ngắn hiện đại.',
      'Sai — sử thi là thể loại đồ sộ về cộng đồng, khác với truyện ngắn hiện đại.',
    ]),
    Q('Truyện "Làng" có tình huống độc đáo là?', ['Mất mùa', 'Ông Hai nghe tin làng theo Tây', 'Đám cưới', 'Cãi nhau'], 1, 'Tình huống đẩy nhân vật vào xung đột nội tâm dữ dội.', [
      'Ôn tập cần ghi nhớ <b>tình huống truyện</b> của từng tác phẩm.',
      'Tình huống truyện "<b>Làng</b>":',
      '<ul><li>Ông Hai <b>nghe tin làng Chợ Dầu theo Tây</b>, làm Việt gian.</li><li>Tình huống đẩy nhân vật vào <i>xung đột nội tâm dữ dội</i> giữa tình yêu làng và tình yêu nước.</li></ul>',
      'Qua đó, Kim Lân làm nổi bật tình yêu làng - yêu nước của người nông dân.',
    ], [
      'Sai — mất mùa không phải tình huống của truyện "Làng".',
      'Đúng — tin làng Chợ Dầu theo Tây đẩy ông Hai vào xung đột nội tâm dữ dội.',
      'Sai — không có tình tiết đám cưới làm tình huống truyện.',
      'Sai — cãi nhau không phải tình huống của truyện.',
    ]),
    Q('Truyện "Lặng lẽ Sa Pa" tỏa sáng vẻ đẹp của?', ['Trí thức', 'Người lao động vô danh âm thầm cống hiến', 'Anh hùng', 'Doanh nhân'], 1, 'Tôn vinh người lao động bình dị nhưng cao cả.', [
      'Ôn tập cần nhớ <b>chủ đề - đối tượng ngợi ca</b> của từng truyện.',
      'Với "<b>Lặng lẽ Sa Pa</b>" (Nguyễn Thành Long):',
      '<ul><li>Tỏa sáng vẻ đẹp của <b>người lao động vô danh</b> (anh thanh niên, ông kĩ sư vườn rau, anh cán bộ bản đồ sét...).</li><li>Họ <i>âm thầm cống hiến</i> cho đất nước nơi núi rừng lặng lẽ.</li></ul>',
      'Đó là vẻ đẹp bình dị mà cao cả của con người lao động mới.',
    ], [
      'Sai — truyện không nhằm ngợi ca riêng tầng lớp trí thức.',
      'Đúng — truyện tôn vinh vẻ đẹp của người lao động vô danh, bình dị mà âm thầm cống hiến.',
      'Sai — không phải hình tượng anh hùng theo nghĩa chiến trận.',
      'Sai — truyện không viết về doanh nhân.',
    ]),
    Q('Tình huống nhận cha của bé Thu ("Chiếc lược ngà") xảy ra khi?', ['Lúc ông Sáu chuẩn bị lên đường trở lại chiến trường', 'Khi ăn cơm', 'Lúc mới gặp', 'Khi đi học'], 0, 'Khoảnh khắc cảm động nhất — và là khoảnh khắc cuối cùng.', [
      'Ôn tập cần nhớ <b>chi tiết cao trào</b> của truyện "Chiếc lược ngà".',
      'Khoảnh khắc bé Thu nhận cha:',
      '<ul><li>Xảy ra đúng lúc ông Sáu <b>chuẩn bị lên đường</b> trở lại chiến trường.</li><li>Bé Thu vỡ òa gọi "ba", ôm chặt không cho ba đi.</li></ul>',
      'Đây là khoảnh khắc <i>cảm động nhất</i> và cũng là <i>lần cuối cùng</i> cha con gặp nhau ⇒ nỗi đau do chiến tranh.',
    ], [
      'Đúng — bé Thu nhận cha đúng lúc ông Sáu chuẩn bị lên đường, khoảnh khắc cảm động và cũng là cuối cùng.',
      'Sai — trong bữa cơm bé Thu còn chưa nhận, thậm chí hắt trứng cá.',
      'Sai — lúc mới gặp bé Thu sợ hãi bỏ chạy.',
      'Sai — không có cảnh nhận cha lúc đi học.',
    ]),
    Q('"Bến quê" mang chủ đề?', ['Tình yêu', 'Sự nghiệp', 'Chiến tranh', 'Triết lý sống — trân trọng giá trị giản dị, gần gũi'], 3, 'Thông điệp về việc thức tỉnh, trân trọng cái bên cạnh.', [
      'Ôn tập cần nhớ <b>chủ đề tư tưởng</b> của "Bến quê" (Nguyễn Minh Châu).',
      'Chủ đề:',
      '<ul><li>Mang ý nghĩa <b>triết lí sống</b>: hãy <i>trân trọng</i> những giá trị giản dị, gần gũi và bền vững.</li><li>Thức tỉnh con người đừng vì cái xa vời mà bỏ quên hạnh phúc bên cạnh.</li></ul>',
      'Đây là tác phẩm tiêu biểu cho khuynh hướng tự nhận thức của văn học thời đổi mới.',
    ], [
      'Sai — tình yêu không phải chủ đề trung tâm của "Bến quê".',
      'Sai — truyện không bàn về sự nghiệp.',
      'Sai — chiến tranh không phải chủ đề của "Bến quê".',
      'Đúng — chủ đề là triết lý sống: thức tỉnh, trân trọng những giá trị giản dị, gần gũi quanh ta.',
    ]),
    Q('Nhân vật Phương Định trong "Những ngôi sao xa xôi" mang vẻ đẹp?', ['Dũng cảm + nữ tính, mơ mộng', 'Chỉ dũng cảm', 'Lạnh lùng', 'Chỉ mơ mộng'], 0, 'Người con gái Việt Nam thời chiến: vừa anh hùng vừa nữ tính.', [
      'Ôn tập cần khái quát <b>vẻ đẹp nhân vật</b> Phương Định.',
      'Hai vẻ đẹp hòa quyện:',
      '<ul><li><b>Dũng cảm, gan dạ</b>, có tinh thần trách nhiệm trong chiến đấu (phá bom).</li><li><b>Nữ tính, mơ mộng</b>, hồn nhiên, yêu ca hát, nhạy cảm.</li></ul>',
      'Đó là vẻ đẹp tiêu biểu của <b>người con gái Việt Nam</b> thời kháng chiến chống Mỹ — vừa anh hùng vừa đời thường.',
    ], [
      'Đúng — Phương Định vừa dũng cảm trong chiến đấu vừa nữ tính, mơ mộng — vẻ đẹp người con gái Việt Nam thời chiến.',
      'Sai — chỉ nói dũng cảm là bỏ qua nét nữ tính, mơ mộng của cô.',
      'Sai — Phương Định giàu tình cảm, hồn nhiên chứ không lạnh lùng.',
      'Sai — chỉ nói mơ mộng là thiếu vẻ đẹp dũng cảm, gan dạ của cô.',
    ]),
  ]),

  M(33, 'Ôn tập tiếng Việt', [
    Q('Khởi ngữ là?', ['Trạng ngữ', 'Bổ ngữ', 'Vị ngữ', 'Thành phần đứng trước chủ ngữ để nêu đề tài được nói đến'], 3, 'Vd: "Quyển sách này, tôi đã đọc rồi" — "quyển sách này" là khởi ngữ.', [
      '<b>Khởi ngữ</b> là một thành phần câu được học ở học kì II lớp 9.',
      'Khái niệm:',
      '<ul><li>Là thành phần câu đứng <b>trước chủ ngữ</b> để nêu lên <b>đề tài</b> được nói đến.</li><li>Trước khởi ngữ thường có thể thêm quan hệ từ "<i>về</i>", "<i>đối với</i>".</li></ul>',
      'Ví dụ: "<code>Quyển sách này, tôi đã đọc rồi</code>" — "quyển sách này" là khởi ngữ.',
    ], [
      'Sai — trạng ngữ bổ sung thời gian, nơi chốn, nguyên nhân…, khác khởi ngữ.',
      'Sai — bổ ngữ bổ sung ý nghĩa cho động/tính từ, không phải khởi ngữ.',
      'Sai — vị ngữ nêu hoạt động, trạng thái của chủ ngữ, khác khởi ngữ.',
      'Đúng — khởi ngữ đứng trước chủ ngữ, nêu đề tài được nói đến (vd: "Quyển sách này, tôi đã đọc rồi").',
    ]),
    Q('Thành phần biệt lập tình thái dùng để?', ['Cảm thán', 'Thể hiện cách nhìn của người nói về sự việc (chắc, có lẽ, hình như…)', 'Phụ chú', 'Gọi đáp'], 1, 'Biểu thị độ tin cậy: chắc chắn, có lẽ, có thể…', [
      'Có <b>4 thành phần biệt lập</b>: tình thái, cảm thán, gọi - đáp, phụ chú.',
      '<b>Thành phần tình thái</b>:',
      '<ul><li>Thể hiện <b>cách nhìn của người nói</b> về độ tin cậy của sự việc.</li><li>Các từ thường gặp: "<code>chắc</code>", "<code>có lẽ</code>", "<code>hình như</code>", "<code>chắc chắn</code>"...</li></ul>',
      'Gọi là "biệt lập" vì không tham gia diễn đạt nghĩa sự việc của câu.',
    ], [
      'Sai — bộc lộ cảm xúc là thành phần cảm thán, không phải tình thái.',
      'Đúng — thành phần tình thái thể hiện cách nhìn của người nói về độ tin cậy sự việc (chắc, có lẽ, hình như…).',
      'Sai — bổ sung chi tiết, giải thích là thành phần phụ chú.',
      'Sai — tạo lập, duy trì quan hệ giao tiếp là thành phần gọi - đáp.',
    ]),
    Q('Phép liên kết nào sử dụng từ ngữ thay thế?', ['Phép liên tưởng', 'Phép thế', 'Phép nối', 'Phép lặp'], 1, 'Vd: dùng "nó", "đó", "cái ấy" thay cho từ đã nêu.', [
      '<b>Liên kết câu và đoạn văn</b> dùng nhiều phép liên kết: lặp, thế, nối, đồng nghĩa/trái nghĩa, liên tưởng.',
      '<b>Phép thế</b>:',
      '<ul><li>Dùng từ ngữ có tác dụng <b>thay thế</b> cho từ ngữ đã xuất hiện ở câu trước.</li><li>Từ thay thế thường là <i>đại từ</i>: "<code>nó</code>", "<code>đó</code>", "<code>cái ấy</code>", "<code>này</code>"...</li></ul>',
      'Phân biệt với phép lặp (lặp lại từ), phép nối (dùng quan hệ từ).',
    ], [
      'Sai — phép liên tưởng dùng từ cùng trường nghĩa, không phải từ thay thế.',
      'Đúng — phép thế dùng từ ngữ ("nó", "đó", "cái ấy"…) thay thế cho từ đã nêu để liên kết câu.',
      'Sai — phép nối dùng quan hệ từ, liên từ để nối câu.',
      'Sai — phép lặp lặp lại từ ngữ, không phải thay thế.',
    ]),
    Q('Phép nối sử dụng?', ['Lặp từ', 'Đồng nghĩa', 'Đại từ', 'Quan hệ từ, liên từ để nối câu (vì vậy, do đó, nhưng, và…)'], 3, 'Các từ nối ý: nhưng, tuy nhiên, vì vậy, do đó…', [
      '<b>Phép nối</b> là một trong những phép liên kết câu thường gặp.',
      'Đặc điểm:',
      '<ul><li>Dùng <b>quan hệ từ, từ ngữ chuyển tiếp</b> để nối câu sau với câu trước.</li><li>Các từ nối: "<code>vì vậy</code>", "<code>do đó</code>", "<code>nhưng</code>", "<code>và</code>", "<code>tuy nhiên</code>", "<code>thế là</code>"...</li></ul>',
      'Phép nối thể hiện rõ quan hệ ý nghĩa (nguyên nhân - kết quả, tương phản, tăng tiến...) giữa các câu.',
    ], [
      'Sai — lặp lại từ là phép lặp, không phải phép nối.',
      'Sai — dùng từ đồng nghĩa thuộc phép liên kết khác, không phải phép nối.',
      'Sai — dùng đại từ thay thế là phép thế, không phải phép nối.',
      'Đúng — phép nối dùng quan hệ từ, liên từ (vì vậy, do đó, nhưng, và…) để nối các câu.',
    ]),
    Q('Câu "Trời mưa to. Vì vậy, đường rất trơn" sử dụng phép?', ['Nối (qua "vì vậy")', 'Lặp (lặp lại từ "trời" ở câu sau)', 'Liên tưởng', 'Thế (thay "trời mưa" bằng đại từ)'], 0, '"Vì vậy" là từ nối quan hệ nguyên nhân - kết quả.', [
      'Đây là dạng bài <b>nhận diện phép liên kết</b> qua ví dụ cụ thể.',
      'Phân tích "Trời mưa to. Vì vậy, đường rất trơn":',
      '<ul><li>Từ "<code>vì vậy</code>" ở đầu câu sau là <b>từ nối</b>.</li><li>Nó thể hiện quan hệ <i>nguyên nhân - kết quả</i> giữa hai câu.</li></ul>',
      'Đây là <b>phép nối</b>; không phải phép lặp (không lặp từ) hay phép thế (không có đại từ thay thế).',
    ], [
      'Đúng — "vì vậy" là từ nối thể hiện quan hệ nguyên nhân - kết quả giữa hai câu, đó là phép nối.',
      'Sai — câu sau không lặp lại từ "trời" nên không phải phép lặp.',
      'Sai — không dùng từ cùng trường liên tưởng để liên kết.',
      'Sai — không có đại từ thay thế cho "trời mưa" nên không phải phép thế.',
    ]),
    Q('Hàm ý trong giao tiếp là?', ['Nghĩa từ điển', 'Nghĩa mặc định', 'Nghĩa không nói ra trực tiếp mà người nghe phải suy ra', 'Nghĩa hiển ngôn'], 2, 'Hàm ý đối lập với hiển ngôn — ý ngầm cần suy luận.', [
      '<b>Nghĩa tường minh và hàm ý</b> là bài học quan trọng ở Tiếng Việt 9 (HK2).',
      'Phân biệt:',
      '<ul><li><b>Nghĩa tường minh (hiển ngôn):</b> phần thông báo được diễn đạt <i>trực tiếp</i> bằng từ ngữ trong câu.</li><li><b>Hàm ý:</b> phần thông báo <b>không nói ra trực tiếp</b> mà người nghe phải <i>suy ra</i> từ ngữ cảnh.</li></ul>',
      'Sử dụng hàm ý giúp lời nói tế nhị, hàm súc, "ý tại ngôn ngoại".',
    ], [
      'Sai — nghĩa từ điển là nghĩa hiển ngôn, không phải hàm ý.',
      'Sai — "nghĩa mặc định" không phải khái niệm hàm ý.',
      'Đúng — hàm ý là phần nghĩa không nói trực tiếp, người nghe phải dựa vào ngữ cảnh để suy ra.',
      'Sai — nghĩa hiển ngôn là nghĩa diễn đạt trực tiếp, đối lập với hàm ý.',
    ]),
  ]),

  M(34, 'Đề ôn thi vào 10 — Đề số 1', [
    Q('Bài thơ "Mùa xuân nho nhỏ" của ai?', ['Hữu Thỉnh', 'Viễn Phương', 'Thanh Hải', 'Y Phương'], 2, 'Thanh Hải sáng tác năm 1980.', [
      'Đề thi vào 10 thường có câu hỏi <b>nhận biết tác giả - tác phẩm</b> ⇒ cần ghi nhớ chính xác.',
      'Ghi nhớ các cặp tác giả - tác phẩm thơ HK2:',
      '<ul><li>"<b>Mùa xuân nho nhỏ</b>" — <b>Thanh Hải</b>.</li><li>"Sang thu" — Hữu Thỉnh; "Viếng lăng Bác" — Viễn Phương; "Nói với con" — Y Phương.</li></ul>',
      'Học thuộc bảng tác giả - tác phẩm là bước cơ bản để làm tốt phần đọc hiểu.',
    ], [
      'Sai — Hữu Thỉnh là tác giả "Sang thu", không phải "Mùa xuân nho nhỏ".',
      'Sai — Viễn Phương là tác giả "Viếng lăng Bác".',
      'Đúng — "Mùa xuân nho nhỏ" là của Thanh Hải, sáng tác năm 1980.',
      'Sai — Y Phương là tác giả "Nói với con".',
    ]),
    Q('Tác phẩm nào KHÔNG phải của Nguyễn Du?', ['Văn chiêu hồn', 'Truyện Đoạn trường tân thanh', 'Lục Vân Tiên', 'Truyện Kiều'], 2, '"Lục Vân Tiên" của Nguyễn Đình Chiểu, các bài còn lại của Nguyễn Du.', [
      'Câu hỏi <b>loại trừ</b> đòi hỏi nhớ chính xác sự nghiệp các tác giả văn học trung đại.',
      'Đối chiếu:',
      '<ul><li><b>Của Nguyễn Du:</b> "Truyện Kiều" (tức "Đoạn trường tân thanh"), "Văn chiêu hồn" (Văn tế thập loại chúng sinh).</li><li><b>Của Nguyễn Đình Chiểu:</b> "<code>Lục Vân Tiên</code>".</li></ul>',
      'Vậy tác phẩm KHÔNG phải của Nguyễn Du là "Lục Vân Tiên".',
    ], [
      'Sai — "Văn chiêu hồn" (Văn tế thập loại chúng sinh) là của Nguyễn Du.',
      'Sai — "Đoạn trường tân thanh" chính là tên chữ Hán của Truyện Kiều, của Nguyễn Du.',
      'Đúng — "Lục Vân Tiên" là của Nguyễn Đình Chiểu; các tác phẩm còn lại đều của Nguyễn Du.',
      'Sai — "Truyện Kiều" là kiệt tác của Nguyễn Du.',
    ]),
    Q('Hình ảnh "đầu súng trăng treo" trong "Đồng chí" gợi?', ['Bóng tối', 'Tình yêu đôi lứa', 'Sự cô đơn', 'Vẻ đẹp hiện thực và lãng mạn, chất chiến sĩ và thi sĩ trong người lính'], 3, 'Hình ảnh kết tinh đẹp nhất bài thơ.', [
      'Đề thi thường hỏi về <b>hình ảnh đặc sắc</b> nhất của bài thơ.',
      'Hình ảnh "<b>đầu súng trăng treo</b>" gợi:',
      '<ul><li>Vẻ đẹp <b>hiện thực</b> (súng - chiến đấu) hòa quyện <b>lãng mạn</b> (trăng - thi vị).</li><li>Sự thống nhất giữa chất <b>chiến sĩ</b> và chất <b>thi sĩ</b> trong tâm hồn người lính.</li></ul>',
      'Đây là hình ảnh kết tinh đẹp nhất, là biểu tượng của thơ ca kháng chiến.',
    ], [
      'Sai — hình ảnh này gợi vẻ đẹp lãng mạn, không phải bóng tối.',
      'Sai — không liên quan đến tình yêu đôi lứa.',
      'Sai — hình ảnh gắn với tình đồng đội bên nhau, không gợi cô đơn.',
      'Đúng — gợi vẻ đẹp hiện thực hòa quyện lãng mạn, chất chiến sĩ và thi sĩ trong người lính.',
    ]),
    Q('Truyện "Chiếc lược ngà" ca ngợi?', ['Tình cha con trong chiến tranh', 'Tình mẹ con', 'Tình thầy trò', 'Tình bạn'], 0, 'Tình phụ tử sâu nặng dù hoàn cảnh éo le.', [
      'Câu hỏi <b>nhận biết chủ đề</b> tác phẩm truyện — dạng cơ bản trong đề thi.',
      'Chủ đề "<b>Chiếc lược ngà</b>":',
      '<ul><li>Ca ngợi <b>tình cha con</b> (ông Sáu - bé Thu) sâu nặng, thiêng liêng.</li><li>Trong cảnh ngộ <i>éo le</i>, mất mát do chiến tranh.</li></ul>',
      'Ghi nhớ đúng chủ đề giúp định hướng làm bài đọc hiểu và nghị luận văn học.',
    ], [
      'Đúng — truyện ca ngợi tình cha con (ông Sáu - bé Thu) sâu nặng, thiêng liêng trong cảnh ngộ éo le của chiến tranh.',
      'Sai — chủ đề là tình cha con, không phải tình mẹ con.',
      'Sai — truyện không viết về tình thầy trò.',
      'Sai — truyện không viết về tình bạn.',
    ]),
    Q('Thành phần biệt lập cảm thán?', ['Này, vâng', 'Có lẽ, hình như', 'Ôi, chao ôi, trời ơi…', 'Vì vậy, nhưng'], 2, 'Bộc lộ cảm xúc trực tiếp.', [
      'Đề thi phần tiếng Việt hay kiểm tra <b>các thành phần biệt lập</b>.',
      'Phân biệt qua dấu hiệu:',
      '<ul><li><b>Cảm thán:</b> "<code>ôi</code>", "<code>chao ôi</code>", "<code>trời ơi</code>" ⇒ bộc lộ cảm xúc.</li><li><b>Gọi - đáp:</b> "này", "vâng", "ơi"; <b>tình thái:</b> "có lẽ", "hình như".</li></ul>',
      'Lưu ý: "vì vậy", "nhưng" là quan hệ từ (dùng cho phép nối), không phải thành phần biệt lập.',
    ], [
      'Sai — "này", "vâng" là thành phần gọi - đáp, không phải cảm thán.',
      'Sai — "có lẽ", "hình như" là thành phần tình thái.',
      'Đúng — "ôi", "chao ôi", "trời ơi"… là thành phần cảm thán, bộc lộ cảm xúc trực tiếp.',
      'Sai — "vì vậy", "nhưng" là quan hệ từ dùng cho phép nối, không phải cảm thán.',
    ]),
    Q('Phép liên kết "Nó học giỏi. Nó còn ngoan ngoãn" là?', ['Phép lặp (lặp đại từ "Nó")', 'Phép thế', 'Phép nối', 'Liên tưởng'], 0, 'Lặp từ "Nó" để liên kết 2 câu.', [
      'Dạng bài <b>nhận diện phép liên kết</b> qua ví dụ — thường gặp trong đề thi.',
      'Phân tích "Nó học giỏi. Nó còn ngoan ngoãn":',
      '<ul><li>Từ "<code>Nó</code>" được <b>lặp lại</b> ở đầu hai câu.</li><li>Việc lặp từ ngữ để liên kết hai câu là <b>phép lặp</b>.</li></ul>',
      'Lưu ý: phép thế là <i>thay thế</i> từ (không lặp lại y nguyên), khác với phép lặp ở đây.',
    ], [
      'Đúng — hai câu lặp lại đại từ "Nó" để liên kết, đó là phép lặp.',
      'Sai — không có từ ngữ thay thế cho từ đã nêu nên không phải phép thế.',
      'Sai — không dùng quan hệ từ, liên từ để nối nên không phải phép nối.',
      'Sai — không dùng từ cùng trường liên tưởng nên không phải phép liên tưởng.',
    ]),
  ]),

  M(35, 'Đề ôn thi vào 10 — Đề số 2', [
    Q('Bài thơ "Sang thu" tả thời điểm?', ['Cuối thu', 'Cuối hạ — đầu thu', 'Mùa hè', 'Đầu xuân'], 1, 'Khoảnh khắc giao mùa tinh tế.', [
      'Đề ôn thi tiếp tục kiểm tra <b>nội dung tác phẩm thơ</b>.',
      'Với "<b>Sang thu</b>" (Hữu Thỉnh):',
      '<ul><li>Tả khoảnh khắc giao mùa <b>cuối hạ - đầu thu</b>.</li><li>Một thời điểm <i>tinh tế, mong manh</i>, được cảm nhận qua hương ổi, gió se, sương chùng chình.</li></ul>',
      'Ghi nhớ: nhan đề "Sang thu" gợi đúng thời điểm thu vừa chớm, không phải cuối thu hay đầu xuân.',
    ], [
      'Sai — bài thơ tả lúc chớm thu, không phải cuối thu.',
      'Đúng — "Sang thu" tả khoảnh khắc giao mùa cuối hạ - đầu thu tinh tế.',
      'Sai — không phải mùa hè mà là lúc hạ vừa qua, thu vừa tới.',
      'Sai — không phải đầu xuân mà là chớm thu.',
    ]),
    Q('"Người đồng mình thô sơ da thịt / Chẳng mấy ai nhỏ bé đâu con" — Tác giả là?', ['Y Phương', 'Hữu Thỉnh', 'Viễn Phương', 'Thanh Hải'], 0, 'Trích "Nói với con" của Y Phương.', [
      'Dạng bài <b>nhận biết tác giả qua câu thơ</b> — phổ biến trong phần đọc hiểu đề thi.',
      'Phân tích:',
      '<ul><li>Hai câu "<code>Người đồng mình thô sơ da thịt / Chẳng mấy ai nhỏ bé đâu con</code>" trích từ "<b>Nói với con</b>".</li><li>Tác giả là <b>Y Phương</b>, nhà thơ dân tộc <i>Tày</i>.</li></ul>',
      'Cụm từ "người đồng mình" là dấu hiệu nhận diện rõ nhất bài thơ của Y Phương.',
    ], [
      'Đúng — hai câu trích từ "Nói với con" của Y Phương, nhà thơ dân tộc Tày.',
      'Sai — Hữu Thỉnh là tác giả "Sang thu".',
      'Sai — Viễn Phương là tác giả "Viếng lăng Bác".',
      'Sai — Thanh Hải là tác giả "Mùa xuân nho nhỏ".',
    ]),
    Q('Hình tượng "bếp lửa" trong bài thơ cùng tên biểu trưng cho?', ['Sự ấm áp vật chất', 'Tình bạn', 'Tình bà cháu, gia đình, quê hương', 'Nỗi buồn'], 2, 'Bếp lửa = ngọn lửa tình thân và tình yêu cội nguồn.', [
      'Đề thi thường hỏi về <b>ý nghĩa hình tượng/biểu tượng</b> trong bài thơ.',
      'Hình tượng "<b>bếp lửa</b>" (bài thơ cùng tên của Bằng Việt):',
      '<ul><li>Biểu trưng cho <b>tình bà cháu</b> ấm áp.</li><li>Là tổ ấm <b>gia đình</b>, là tình yêu <b>quê hương, cội nguồn</b>.</li></ul>',
      'Bếp lửa không chỉ là hơi ấm vật chất mà mang ý nghĩa tinh thần thiêng liêng, sâu xa.',
    ], [
      'Sai — bếp lửa không chỉ là hơi ấm vật chất mà mang ý nghĩa tinh thần sâu xa.',
      'Sai — bếp lửa không biểu trưng cho tình bạn.',
      'Đúng — bếp lửa biểu trưng cho tình bà cháu, tổ ấm gia đình và tình yêu quê hương cội nguồn.',
      'Sai — bếp lửa gợi sự ấm áp, nghĩa tình chứ không phải nỗi buồn.',
    ]),
    Q('"Lặng lẽ Sa Pa" ngợi ca?', ['Tình yêu', 'Sự giàu sang', 'Vẻ đẹp người lao động bình dị', 'Cảnh thiên nhiên'], 2, 'Tôn vinh người lao động vô danh.', [
      'Câu hỏi <b>chủ đề truyện</b> — cần ghi nhớ chính xác cho đề thi.',
      'Với "<b>Lặng lẽ Sa Pa</b>" (Nguyễn Thành Long):',
      '<ul><li>Ngợi ca <b>vẻ đẹp của người lao động bình dị</b>, vô danh.</li><li>Họ <i>âm thầm cống hiến</i> cho đất nước (tiêu biểu là anh thanh niên làm khí tượng).</li></ul>',
      'Cảnh thiên nhiên Sa Pa thơ mộng chỉ là phông nền làm tôn lên vẻ đẹp con người.',
    ], [
      'Sai — truyện không nhằm ngợi ca tình yêu đôi lứa.',
      'Sai — truyện không ca ngợi sự giàu sang vật chất.',
      'Đúng — truyện ngợi ca vẻ đẹp của người lao động bình dị, vô danh mà âm thầm cống hiến.',
      'Sai — cảnh thiên nhiên Sa Pa chỉ là phông nền tôn lên con người.',
    ]),
    Q('Để viết bài nghị luận xã hội về "lòng biết ơn", cần?', ['Chỉ trách móc', 'Giải thích - phân tích biểu hiện - dẫn chứng - phản đề - bài học', 'Chỉ kể chuyện', 'Chỉ ca ngợi'], 1, 'Đầy đủ các thao tác lập luận.', [
      'Đề thi vào 10 thường có câu <b>nghị luận xã hội</b> về một tư tưởng, đạo lí.',
      'Với đề "lòng biết ơn", cần triển khai đủ các thao tác:',
      '<ul><li><b>Giải thích</b> khái niệm lòng biết ơn.</li><li><b>Phân tích biểu hiện</b> + nêu <b>dẫn chứng</b>.</li><li><b>Phản đề</b> (phê phán kẻ vô ơn) + rút ra <b>bài học</b>.</li></ul>',
      'Triển khai đủ thao tác giúp bài viết toàn diện, tránh lập luận một chiều.',
    ], [
      'Sai — chỉ trách móc là một chiều, thiếu các thao tác lập luận.',
      'Đúng — cần đủ các thao tác: giải thích - phân tích biểu hiện - dẫn chứng - phản đề - rút ra bài học.',
      'Sai — kể chuyện thuộc văn tự sự, không phải bài nghị luận.',
      'Sai — chỉ ca ngợi một chiều thì thiếu giải thích, dẫn chứng và phản đề.',
    ]),
    Q('Câu hỏi tu từ "Ôi! Còn gì đẹp hơn?" có tác dụng?', ['Hoài nghi', 'Hỏi để có câu trả lời', 'Khẳng định mạnh mẽ giá trị thẩm mỹ, bộc lộ cảm xúc', 'Cãi cọ'], 2, 'Câu hỏi tu từ = khẳng định + biểu cảm.', [
      '<b>Câu hỏi tu từ</b> là biện pháp tu từ thường xuất hiện trong đề thi phần đọc hiểu.',
      'Đặc điểm:',
      '<ul><li>Hình thức là <b>câu hỏi</b> nhưng <i>không nhằm hỏi để được trả lời</i>.</li><li>Mục đích: <b>khẳng định</b> một ý nghĩa và <b>bộc lộ cảm xúc</b>.</li></ul>',
      'Câu "Ôi! Còn gì đẹp hơn?" chính là cách <b>khẳng định mạnh mẽ</b> giá trị thẩm mĩ, đầy biểu cảm — kết lại chương trình Ngữ văn 9 với một dấu ấn nghệ thuật.',
    ], [
      'Sai — câu hỏi tu từ nhằm khẳng định, không phải bày tỏ hoài nghi.',
      'Sai — câu hỏi tu từ không nhằm tìm câu trả lời mà để nhấn mạnh.',
      'Đúng — câu hỏi tu từ ở đây khẳng định mạnh mẽ giá trị thẩm mỹ và bộc lộ cảm xúc.',
      'Sai — câu hỏi tu từ không nhằm tranh cãi.',
    ]),
  ]),

  M(36, 'Kết thúc Ngữ Văn THCS — Hành trình của những con chữ', [
    Q('Bốn điều văn học dạy chúng ta, theo bài tổng kết, là gì?',
      ['Chỉ là cách viết bài văn đúng cấu trúc', 'Đồng cảm · dùng ngôn ngữ chính xác và đẹp · cảm nhận cái đẹp trong điều bình dị · nhìn thực tế xã hội qua lăng kính nhân văn', 'Cách ghi nhớ tên tác giả và năm sáng tác', 'Kĩ năng đọc nhanh để làm bài thi'],
      1,
      'Văn học rèn sự đồng cảm, năng lực ngôn ngữ, cảm thụ cái đẹp và cái nhìn nhân văn về xã hội.',
      ['Bài tổng kết nêu bốn điều văn học để lại — đều là <b>năng lực sống</b>, không phải nội dung để thi.',
       '<ul><li><b>biết đặt mình vào vị trí người khác</b> — phát triển sự <b>đồng cảm</b></li><li><b>dùng ngôn ngữ chính xác và đẹp</b> — giao tiếp hiệu quả và tinh tế</li><li><b>cảm nhận cái đẹp trong những điều bình dị</b> — cuộc sống phong phú hơn</li><li><b>nhìn thẳng vào thực tế xã hội qua lăng kính nhân văn</b> — biết phân biệt đúng sai</li></ul>',
       'Như phần ghi chú: <i>"Văn học không dạy em trả lời đúng — văn học dạy em đặt câu hỏi đúng."</i>'],
      ['Sai — cấu trúc bài văn chỉ là một phần kĩ thuật.',
       'Đúng — bốn điều văn học để lại.',
       'Sai — đó là thông tin ghi nhớ, không phải điều văn học dạy.',
       'Sai — đọc nhanh là kĩ năng phụ trợ cho thi cử.']),
    Q('Ngữ Văn THPT khác THCS ở những điểm nào?',
      ['Văn bản dài và phức tạp hơn, yêu cầu nghị luận cao hơn, có tác phẩm kinh điển nước ngoài', 'Văn bản ngắn hơn cho dễ học', 'Không còn phần nghị luận', 'Chỉ học văn học dân gian'],
      0,
      'THPT có văn bản dài và nhiều tầng nghĩa hơn, yêu cầu nghị luận chặt hơn và thêm tác phẩm nước ngoài kinh điển.',
      ['Bốn thay đổi khi lên THPT:',
       '<ul><li><b>văn bản dài hơn, phức tạp hơn</b> — truyện ngắn dài, trích đoạn tiểu thuyết, thơ <i>nhiều tầng nghĩa</i></li><li><b>yêu cầu nghị luận cao hơn</b> — lập luận chặt, dẫn chứng phong phú, <b>văn phong riêng</b></li><li>xuất hiện <b>tác phẩm nước ngoài kinh điển</b> và các tác phẩm lớn: <i>Romeo và Juliet</i>, <i>Số đỏ</i>, <i>Chiếc thuyền ngoài xa</i>…</li><li>thi THPT Quốc gia: phần <b>Đọc hiểu</b> và <b>Nghị luận</b> chiếm tỉ trọng lớn</li></ul>',
       'Nghĩa là kĩ năng cần đầu tư nhất chính là <b>đọc hiểu văn bản dài</b> và <b>viết nghị luận có lập luận riêng</b>.'],
      ['Đúng — dài hơn, nghị luận cao hơn và có tác phẩm nước ngoài kinh điển.',
       'Sai — văn bản THPT dài và phức tạp hơn.',
       'Sai — nghị luận chiếm tỉ trọng lớn trong thi THPT.',
       'Sai — văn học dân gian là nội dung lớp 6.']),
    Q('Theo bài học, con đường duy nhất để viết hay là gì?',
      ['Học thuộc nhiều bài văn mẫu', 'Dùng thật nhiều từ khó cho bài văn sang trọng', 'Chờ có cảm hứng rồi mới viết', 'Đọc sách — đọc nhiều, đọc đa dạng'],
      3,
      'Bài học khẳng định: người viết giỏi đều là người đọc giỏi trước, không có con đường tắt.',
      ['Lời nhắn gửi của bài tổng kết rất dứt khoát: <b>đọc sách — đọc nhiều, đọc đa dạng</b>. Đó là <i>cách duy nhất</i> để viết hay, <b>không có con đường tắt nào khác</b>.',
       'Lí do:<ul><li>đọc nhiều tích luỹ <b>vốn từ</b> và <b>cách diễn đạt</b> tự nhiên — thứ không học thuộc được</li><li>đọc đa dạng cho em <b>nhiều giọng văn</b> để đối chiếu, từ đó tìm ra giọng của mình</li><li>đọc cho em <b>dẫn chứng</b> để nghị luận — phần yếu nhất của phần lớn bài viết</li></ul>',
       '<b>Người viết giỏi đều là người đọc giỏi trước.</b> Văn mẫu và từ khó không thay được điều đó: học thuộc văn mẫu thì bài viết không còn là của em, còn dùng từ khó sai ngữ cảnh lại làm bài kém đi.'],
      ['Sai — học thuộc văn mẫu khiến bài viết không còn là của em.',
       'Sai — dùng từ khó sai ngữ cảnh làm bài văn kém đi.',
       'Sai — cảm hứng thường đến trong khi viết, không phải trước khi viết.',
       'Đúng — đọc nhiều và đa dạng là con đường duy nhất.']),
    Q('Các tác giả Nguyễn Duy, Hữu Thỉnh, Y Phương, Thanh Hải thuộc mảng nào của chương trình THCS?',
      ['Văn học dân gian', 'Thơ Trung đại', 'Thơ hiện đại', 'Văn học nước ngoài'],
      2,
      'Đây là các tác giả thơ hiện đại trong chương trình THCS.',
      ['Bốn năm Ngữ Văn THCS đi qua nhiều mảng văn học, mỗi mảng gắn với một nhóm tác giả, tác phẩm.',
       '<ul><li><b>văn học dân gian</b> — <i>Thạch Sanh</i>, <i>Sự tích Hồ Gươm</i></li><li><b>thơ Trung đại</b> — Ức Trai (Nguyễn Trãi), <b>Nguyễn Du</b>, <b>Hồ Xuân Hương</b></li><li><b>văn học kháng chiến</b> — Chính Hữu, Nguyễn Đình Thi</li><li><b>thơ hiện đại</b> — <b>Nguyễn Duy, Hữu Thỉnh, Y Phương, Thanh Hải</b></li></ul>',
       'Hai câu thơ hiện đại thường được nhắc tới nhất ở lớp 9: <i>"Con dù lớn vẫn là con của mẹ / Đi hết đời, lòng mẹ vẫn theo con"</i> (Y Phương) và <i>"Ta làm con chim hót / Ta làm một cành hoa"</i> (Thanh Hải).'],
      ['Sai — văn học dân gian là Thạch Sanh, Sự tích Hồ Gươm.',
       'Sai — thơ Trung đại là Nguyễn Trãi, Nguyễn Du, Hồ Xuân Hương.',
       'Đúng — đây là các tác giả thơ hiện đại.',
       'Sai — cả bốn đều là tác giả Việt Nam.']),
    Q('Trong thời đại AI, vì sao kĩ năng Ngữ Văn vẫn rất quan trọng?',
      ['Vì AI không đọc được tiếng Việt', 'Vì người biết diễn đạt ý tưởng của mình chính xác sẽ là người dùng AI hiệu quả nhất', 'Vì AI sẽ viết thay hoàn toàn nên không cần học', 'Vì Ngữ Văn không liên quan gì tới công nghệ'],
      1,
      'Diễn đạt chính xác là điều kiện để dùng AI hiệu quả — và đó chính là kĩ năng Ngữ Văn rèn.',
      ['Ngữ Văn rèn ba kĩ năng nền tảng cho mọi lĩnh vực: <b>đọc hiểu</b>, <b>viết lách</b> và <b>diễn đạt</b>.',
       'Ứng dụng thực tế:<ul><li>trình bày ý kiến <b>rõ ràng, thuyết phục</b></li><li>đọc và <b>tóm tắt tài liệu</b> nhanh</li><li>viết email, báo cáo, luận văn đúng và hay</li></ul>',
       'Và trong thời đại AI: <b>người biết diễn đạt ý tưởng của mình chính xác chính là người dùng AI hiệu quả nhất</b> — vì chất lượng câu trả lời phụ thuộc rất nhiều vào chất lượng câu hỏi.'],
      ['Sai — AI xử lí được tiếng Việt.',
       'Đúng — diễn đạt chính xác là điều kiện để dùng AI hiệu quả.',
       'Sai — AI là công cụ, không thay được năng lực diễn đạt của em.',
       'Sai — kĩ năng ngôn ngữ gắn rất chặt với việc dùng công nghệ.']),
    Q('Câu nói nào khép lại bài tổng kết Ngữ Văn THCS?',
      ['Văn học dạy em trả lời đúng mọi câu hỏi', 'Văn học chỉ để thi, không cần mang theo', 'Văn học không dạy em trả lời đúng — văn học dạy em đặt câu hỏi đúng', 'Văn học chỉ dành cho người có năng khiếu'],
      2,
      'Bài học kết bằng: văn học dạy em đặt câu hỏi đúng, không phải trả lời đúng.',
      ['Câu kết của bốn năm Ngữ Văn THCS: <i>"<b>Văn học không dạy em trả lời đúng — văn học dạy em đặt câu hỏi đúng.</b> Hãy mang theo tình yêu con chữ ấy vào THPT và cả cuộc đời."</i>',
       'Ý nghĩa: một bài văn hay không phải bài có "đáp án chuẩn" mà là bài <b>đặt được câu hỏi đáng hỏi</b> về tác phẩm, về con người, về xã hội — rồi trả lời bằng lập luận và cảm nhận của chính em.',
       'Đó cũng là lí do ba mục tiêu của tuần cuối không có mục tiêu nào là "ôn thi": hệ thống hoá tác phẩm đã học, nhận ra giá trị văn học với <b>đời sống tâm hồn và nhân cách</b>, và tự tin bước vào Ngữ Văn THPT.'],
      ['Sai — bài học nói ngược lại.',
       'Sai — bài học khuyên mang tình yêu con chữ theo suốt cuộc đời.',
       'Đúng — văn học dạy em đặt câu hỏi đúng.',
       'Sai — văn học dành cho mọi người, và rèn được qua việc đọc.']),
  ]),
];

export const S9NV_SCENARIOS = indexBy(S9NV_WEEKS);
