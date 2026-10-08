// ============================================================
// Lớp 8 · NGỮ VĂN — 35 tuần (HK1: 1–18 · HK2: 19–35)
// Bám CTGD 2018 (Văn 8: thơ tiền chiến, truyện kí hiện đại,
// nghị luận trung đại, các kiểu câu, hành động nói, hội thoại).
// ID prefix: "S8NV-wNN-quiz".
// ============================================================
import { Q, W, indexBy } from './_helper.js';

const M = (n, title, qs, opts) => W('S8NV', 'ngu-van', n, title, qs, opts);

export const S8NV_WEEKS = [
  // ──────────────── HK1 ────────────────
  M(1, 'Tôi đi học — Thanh Tịnh', [
    Q('Tác giả truyện "Tôi đi học" là ai?', ['Thanh Tịnh', 'Ngô Tất Tố', 'Nam Cao', 'Nguyên Hồng'], 0, 'Thanh Tịnh (1911–1988), tác giả "Tôi đi học".', [
      '<b>Thanh Tịnh</b> (1911–1988) tên thật là Trần Văn Ninh, quê ở ngoại ô Huế. Ông sáng tác nhiều thể loại nhưng thành công nhất ở <i>truyện ngắn trữ tình</i> và thơ.',
      'Truyện ngắn <b>"Tôi đi học"</b> in trong tập <i>Quê mẹ</i> (1941). Văn của Thanh Tịnh nhẹ nhàng, đằm thắm, giàu chất thơ và lắng đọng cảm xúc.',
      '<ul><li>Ghi nhớ tác giả qua đặc trưng: <b>chất thơ</b> + <b>kỉ niệm tuổi học trò</b>.</li><li>Đừng nhầm với các nhà văn hiện thực cùng thời (Ngô Tất Tố, Nam Cao, Nguyên Hồng).</li></ul>',
    ], ['Đúng — Thanh Tịnh viết "Tôi đi học", giọng văn nhẹ nhàng giàu chất thơ.', 'Sai — Ngô Tất Tố viết "Tắt đèn", không phải "Tôi đi học".', 'Sai — Nam Cao là tác giả "Lão Hạc", không phải truyện này.', 'Sai — Nguyên Hồng viết "Những ngày thơ ấu", dễ nhầm vì cùng đề tài tuổi thơ.']),
    Q('Truyện "Tôi đi học" kể về kỉ niệm gì?', ['Tuổi thơ ở quê', 'Người thầy đầu tiên', 'Buổi tựu trường đầu tiên', 'Một ngày hè'], 2, 'Hồi tưởng buổi tựu trường đầu tiên.', [
      'Mạch truyện "Tôi đi học" được dẫn dắt theo <b>dòng hồi tưởng</b> của nhân vật "tôi" về <i>buổi tựu trường đầu tiên</i> trong đời.',
      'Khơi nguồn cảm xúc là tín hiệu mùa thu: <code>lá rụng</code>, <code>mây bàng bạc</code> trên không khiến nhân vật nao nức nhớ lại ngày đầu cắp sách.',
      '<ul><li>Trình tự: <b>trên đường tới trường → sân trường → vào lớp học</b>.</li><li>Mỗi chặng gắn với một cung bậc cảm xúc mới mẻ, bỡ ngỡ.</li></ul>',
    ], ['Sai — truyện không kể chung về tuổi thơ ở quê mà tập trung một buổi cụ thể.', 'Sai — "Người thầy đầu tiên" là tác phẩm của Ai-ma-tốp, nhầm sang văn bản khác.', 'Đúng — truyện hồi tưởng cảm xúc của ngày tựu trường đầu tiên.', 'Sai — bối cảnh là buổi khai trường mùa thu, không phải một ngày hè.']),
    Q('Tâm trạng nhân vật "tôi" trong truyện là?', ['Chán nản', 'Sợ hãi và buồn bã', 'Tức giận', 'Hồi hộp, bỡ ngỡ, háo hức'], 3, 'Tâm trạng pha trộn: hồi hộp, bỡ ngỡ, háo hức.', [
      'Diễn biến <b>tâm trạng</b> nhân vật "tôi" là điểm đặc sắc của truyện: vừa <i>hồi hộp</i>, vừa <i>bỡ ngỡ</i>, lại vừa <i>háo hức</i> trước thế giới mới.',
      'Những chi tiết bộc lộ tâm trạng: <code>thấy con đường quen mà tự nhiên lạ</code>, <code>thèm được như những học trò cũ</code>, <code>nép bên người thân</code>.',
      '<ul><li>Đây là cảm xúc <b>chân thực</b> của bất cứ đứa trẻ nào trong ngày đầu đến trường.</li><li>Cảm xúc trong sáng, thiêng liêng làm nên chất trữ tình của tác phẩm.</li></ul>',
    ], ['Sai — nhân vật không chán nản mà rất xúc động, mới mẻ.', 'Sai — có chút bỡ ngỡ nhưng không phải sợ hãi, buồn bã.', 'Sai — không có sắc thái tức giận trong cảm xúc nhân vật.', 'Đúng — tâm trạng pha trộn hồi hộp, bỡ ngỡ và háo hức của ngày đầu đi học.']),
    Q('Truyện được viết theo phương thức nào là chính?', ['Nghị luận', 'Hành chính', 'Thuyết minh', 'Tự sự kết hợp miêu tả và biểu cảm'], 3, 'Tự sự + miêu tả + biểu cảm tạo nên cảm xúc trữ tình.', [
      '"Tôi đi học" tiêu biểu cho kiểu <b>truyện ngắn trữ tình</b>: lấy <i>tự sự</i> làm khung nhưng đậm <i>miêu tả</i> và <i>biểu cảm</i>.',
      'Sự kết hợp các phương thức: <ul><li><b>Tự sự</b> — kể lại diễn biến buổi tựu trường.</li><li><b>Miêu tả</b> — cảnh thiên nhiên, sân trường, lớp học.</li><li><b>Biểu cảm</b> — bộc lộ cảm xúc nao nức, bồi hồi.</li></ul>',
      'Chính sự đan cài đó tạo nên <code>chất trữ tình</code> nhẹ nhàng, sâu lắng đặc trưng của Thanh Tịnh.',
    ], ['Sai — truyện không trình bày lí lẽ thuyết phục nên không phải nghị luận.', 'Sai — đây là truyện ngắn trữ tình, không phải văn bản hành chính.', 'Sai — không cung cấp tri thức khách quan nên không phải thuyết minh.', 'Đúng — tự sự kết hợp miêu tả và biểu cảm tạo chất trữ tình.']),
    Q('Hình ảnh "tôi" và mẹ trong ngày đầu đi học gợi điều gì?', ['Sự hờ hững', 'Tình cảm gia đình ấm áp', 'Sự xa cách', 'Sự nghiêm khắc'], 1, 'Tình mẹ con ấm áp, người mẹ là điểm tựa.', [
      'Hình ảnh người <b>mẹ</b> dắt con tới trường là một điểm tựa cảm xúc trong truyện, gợi <i>tình cảm gia đình ấm áp</i>.',
      'Bàn tay mẹ <code>âu yếm nắm tay</code>, cử chỉ dịu dàng khiến đứa trẻ thấy vững dạ giữa khung cảnh xa lạ.',
      '<ul><li>Người mẹ tượng trưng cho <b>sự chở che</b>, cho cội nguồn yêu thương.</li><li>Tình mẫu tử làm dịu đi nỗi bỡ ngỡ của buổi đầu đến lớp.</li></ul>',
    ], ['Sai — người mẹ ân cần dắt con đi học, không hề hờ hững.', 'Đúng — gợi tình mẹ con ấm áp, mẹ là điểm tựa của con.', 'Sai — hai mẹ con gần gũi, không có sự xa cách.', 'Sai — mẹ dịu dàng, không mang nét nghiêm khắc.']),
    Q('Đặc sắc nghệ thuật của truyện là?', ['Nhân vật phản diện sống động', 'Châm biếm sắc sảo', 'Cốt truyện li kì', 'Giọng văn nhẹ nhàng, hình ảnh giàu chất thơ'], 3, 'Giọng văn trữ tình, hình ảnh giàu chất thơ.', [
      '<b>Đặc sắc nghệ thuật</b> của "Tôi đi học" nằm ở <i>giọng văn nhẹ nhàng, trong trẻo</i> và hệ thống <i>hình ảnh giàu chất thơ</i>.',
      'Nổi bật là các <b>so sánh</b> tinh tế: <code>"ý nghĩ ấy thoáng qua... nhẹ nhàng như một làn mây lướt ngang trên ngọn núi"</code>.',
      '<ul><li>Bố cục theo dòng hồi tưởng, cảm xúc dẫn dắt mạch truyện.</li><li>Truyện gần như không có cốt truyện kịch tính mà thấm bằng <b>cảm xúc</b>.</li></ul>',
    ], ['Sai — truyện không có nhân vật phản diện, đó là nét của truyện hiện thực.', 'Sai — giọng văn trữ tình êm dịu, không châm biếm như hài kịch.', 'Sai — cốt truyện đơn giản, không li kì.', 'Đúng — đặc sắc ở giọng văn nhẹ nhàng và hình ảnh giàu chất thơ.']),
  ]),

  M(2, 'Trong lòng mẹ — Nguyên Hồng', [
    Q('"Trong lòng mẹ" trích từ tác phẩm nào?', ['Đất nước đứng lên', 'Nắng đồng bằng', 'Sống mòn', 'Những ngày thơ ấu'], 3, 'Trích "Những ngày thơ ấu" — hồi kí của Nguyên Hồng.', [
      '<b>"Trong lòng mẹ"</b> là tên đoạn trích chương IV của tập hồi kí <b>"Những ngày thơ ấu"</b> (1938) của Nguyên Hồng.',
      'Tác phẩm gồm 9 chương, ghi lại tuổi thơ <i>cay đắng, tủi cực</i> của chính tác giả — một chú bé mồ côi cha, sống thiếu thốn tình thương.',
      '<ul><li>Hồi kí kể bằng <b>ngôi thứ nhất</b> ("tôi" — bé Hồng).</li><li>Đừng nhầm với "Sống mòn" của Nam Cao hay "Đất nước đứng lên" của Nguyên Ngọc.</li></ul>',
    ], ['Sai — "Đất nước đứng lên" là của Nguyên Ngọc, không liên quan.', 'Sai — không phải tác phẩm chứa đoạn trích này.', 'Sai — "Sống mòn" là tiểu thuyết của Nam Cao, dễ nhầm tác giả.', 'Đúng — trích từ hồi kí "Những ngày thơ ấu" của Nguyên Hồng.']),
    Q('Tác giả "Những ngày thơ ấu" là?', ['Nguyên Hồng', 'Nam Cao', 'Thanh Tịnh', 'Ngô Tất Tố'], 0, 'Nguyên Hồng (1918–1982).', [
      '<b>Nguyên Hồng</b> (1918–1982) được mệnh danh là <i>"nhà văn của những người cùng khổ"</i>, đặc biệt là phụ nữ và trẻ em nghèo.',
      'Văn ông giàu <b>cảm xúc</b>, thiết tha, mãnh liệt — luôn dạt dào tình thương và niềm tin vào con người lao động.',
      '<ul><li>Tác phẩm tiêu biểu: <code>Những ngày thơ ấu</code>, <code>Bỉ vỏ</code>, <code>Cửa biển</code>.</li><li>Nhận diện qua chất văn <b>trữ tình thống thiết</b>.</li></ul>',
    ], ['Đúng — Nguyên Hồng (1918–1982) viết hồi kí "Những ngày thơ ấu".', 'Sai — Nam Cao viết "Lão Hạc", "Sống mòn".', 'Sai — Thanh Tịnh là tác giả "Tôi đi học".', 'Sai — Ngô Tất Tố viết "Tắt đèn".']),
    Q('Đoạn trích thể hiện tình cảm gì?', ['Tình bạn bè', 'Lòng căm thù giặc', 'Tình yêu thương mẹ vô bờ của bé Hồng', 'Tình yêu quê'], 2, 'Tình yêu thương mẹ sâu sắc, mãnh liệt.', [
      'Đoạn trích là khúc ca về <b>tình mẫu tử</b> — tình yêu thương mẹ <i>vô bờ bến</i> của bé Hồng dẫu phải xa cách và bị gièm pha.',
      'Dù bà cô gieo rắc điều xấu, Hồng vẫn một lòng <code>tin yêu, kính trọng và khao khát được gặp mẹ</code>.',
      '<ul><li>Khi gặp mẹ, niềm hạnh phúc òa vỡ thành nước mắt sung sướng.</li><li>Tình mẫu tử ở đây mãnh liệt, thiêng liêng và bất diệt.</li></ul>',
    ], ['Sai — đoạn trích không nói về tình bạn.', 'Sai — không có nội dung về căm thù giặc.', 'Đúng — thể hiện tình yêu thương mẹ vô bờ, mãnh liệt của bé Hồng.', 'Sai — chủ đề là tình mẫu tử, không phải tình yêu quê.']),
    Q('Nhân vật bà cô trong đoạn trích là người?', ['Cay nghiệt, gieo rắc hoài nghi', 'Hiền lành, yêu cháu', 'Vô tâm', 'Lạnh lùng nhưng tốt'], 0, 'Bà cô cay nghiệt, dùng lời lẽ độc địa xúc phạm mẹ Hồng.', [
      'Nhân vật <b>bà cô</b> là hiện thân của những thành kiến <i>cổ hủ, độc địa</i> trong xã hội cũ — kẻ thiếu tình người.',
      'Bà dùng giọng <code>"ngọt ngào" giả tạo</code>, những lời cay nghiệt để gieo rắc hoài nghi, chia rẽ tình mẹ con bé Hồng.',
      '<ul><li>Bà cô đối lập với tấm lòng trong sáng của bé Hồng.</li><li>Qua nhân vật này, tác giả tố cáo sự <b>lạnh lùng, tàn nhẫn</b> của lễ giáo phong kiến.</li></ul>',
    ], ['Đúng — bà cô cay nghiệt, dùng lời độc địa gieo rắc hoài nghi về mẹ Hồng.', 'Sai — hiểu sai nhân vật; bà cô không hề yêu thương cháu.', 'Sai — bà cô chủ động gây tổn thương, không phải vô tâm.', 'Sai — không có nét tốt, bản chất bà cô là tàn nhẫn.']),
    Q('Thể loại của tác phẩm là?', ['Truyện ngắn', 'Tuỳ bút', 'Hồi kí', 'Tiểu thuyết'], 2, 'Hồi kí — Nguyên Hồng kể lại tuổi thơ.', [
      '<b>Hồi kí</b> là thể loại ghi chép lại những sự việc <i>có thật đã xảy ra trong quá khứ</i> mà tác giả là người tham dự hoặc chứng kiến.',
      'Trong "Những ngày thơ ấu", Nguyên Hồng kể lại tuổi thơ của <b>chính mình</b> bằng ngôi thứ nhất, đậm chất trữ tình.',
      '<ul><li>Khác <b>truyện ngắn</b> (hư cấu) ở tính <code>xác thực</code> của sự kiện.</li><li>Khác <b>tuỳ bút</b> ở chỗ bám theo dòng sự việc đời thực của tác giả.</li></ul>',
    ], ['Sai — đây không phải truyện ngắn hư cấu mà là ghi lại đời thực.', 'Sai — tuỳ bút thiên về cảm xúc tản mạn, khác hồi kí.', 'Đúng — hồi kí, Nguyên Hồng kể lại tuổi thơ của chính mình.', 'Sai — tiểu thuyết là hư cấu dài, không phải thể loại tác phẩm này.']),
    Q('Khoảnh khắc cảm động nhất là khi?', ['Hồng được mẹ ôm vào lòng', 'Hồng cãi bà cô', 'Mẹ Hồng về', 'Hồng đi học'], 0, 'Khoảnh khắc Hồng được nằm trong lòng mẹ, hạnh phúc trào dâng.', [
      'Cao trào cảm xúc của đoạn trích là khoảnh khắc bé Hồng <b>được nằm trong lòng mẹ</b> — nguồn gốc của nhan đề "Trong lòng mẹ".',
      'Cảm giác sung sướng đến cực điểm: <code>"phải bé lại và lăn vào lòng một người mẹ... để bàn tay người mẹ vuốt ve..."</code>',
      '<ul><li>Bao tủi hờn tan biến, chỉ còn niềm hạnh phúc <b>ấm áp, thiêng liêng</b>.</li><li>Đây là đoạn văn thấm đẫm chất trữ tình nhất tác phẩm.</li></ul>',
    ], ['Đúng — khoảnh khắc Hồng được nằm trong lòng mẹ, hạnh phúc trào dâng.', 'Sai — Hồng kìm nén trước bà cô, không phải cảnh cao trào cảm xúc.', 'Sai — mẹ về là tiền đề, đỉnh cảm xúc là lúc được ôm vào lòng.', 'Sai — chi tiết đi học không xuất hiện làm cao trào trong đoạn trích.']),
  ]),

  M(3, 'Tức nước vỡ bờ — Ngô Tất Tố', [
    Q('"Tức nước vỡ bờ" trích từ tiểu thuyết nào?', ['Việc làng', 'Tắt đèn', 'Lều chõng', 'Tập án cái đình'], 1, 'Trích "Tắt đèn" của Ngô Tất Tố.', [
      '<b>"Tức nước vỡ bờ"</b> là đoạn trích thuộc chương XVIII của tiểu thuyết <b>"Tắt đèn"</b> (1939) của Ngô Tất Tố.',
      '"Tắt đèn" phơi bày số phận thê thảm của người nông dân Việt Nam trong mùa sưu thuế dưới ách <i>thực dân – phong kiến</i>.',
      '<ul><li>Nhan đề lấy từ thành ngữ <code>"tức nước vỡ bờ"</code> — bị áp bức tới cùng thì vùng lên.</li><li>"Việc làng", "Lều chõng" là tác phẩm khác của Ngô Tất Tố.</li></ul>',
    ], ['Sai — "Việc làng" là phóng sự của Ngô Tất Tố, không chứa đoạn trích.', 'Đúng — trích từ tiểu thuyết "Tắt đèn" của Ngô Tất Tố.', 'Sai — "Lều chõng" là tác phẩm khác của Ngô Tất Tố.', 'Sai — đây là tác phẩm khác, không phải nguồn của đoạn trích.']),
    Q('Nhân vật chính trong đoạn trích là?', ['Anh Dậu', 'Cai lệ', 'Nghị Quế', 'Chị Dậu'], 3, 'Chị Dậu — người vợ thương chồng, bảo vệ chồng.', [
      'Nhân vật trung tâm của đoạn trích là <b>chị Dậu</b> — điển hình cho người phụ nữ nông dân Việt Nam: <i>mộc mạc, giàu tình thương và tiềm tàng sức phản kháng</i>.',
      'Chị hết lòng chăm sóc, bảo vệ người chồng đang ốm yếu trước sự hung hãn của bọn tay sai.',
      '<ul><li>Anh Dậu chỉ là nhân vật được bảo vệ.</li><li>Cai lệ là nhân vật <b>phản diện</b> đối lập với chị Dậu.</li></ul>',
    ], ['Sai — anh Dậu ốm yếu, chỉ là nhân vật được bảo vệ.', 'Sai — cai lệ là nhân vật phản diện đối lập, không phải nhân vật chính.', 'Sai — Nghị Quế không xuất hiện trong đoạn trích này.', 'Đúng — chị Dậu là nhân vật chính, người vợ thương chồng và phản kháng.']),
    Q('Lúc đầu chị Dậu đối với cai lệ thế nào?', ['Hung dữ', 'Lạnh lùng', 'Van xin, nhẫn nhịn', 'Chế giễu'], 2, 'Chị van xin tha thiết để bảo vệ chồng.', [
      'Diễn biến hành động của chị Dậu phát triển theo quy luật <b>"tức nước vỡ bờ"</b>: từ <i>nhẫn nhịn → cự lại → vùng lên</i>.',
      'Ban đầu chị <code>"run run", "thiết tha van xin"</code>, xưng "cháu" – gọi "ông" để mong bọn chúng tha cho chồng.',
      '<ul><li>Sự nhẫn nhịn cho thấy chị là người <b>biết điều, nhường nhịn</b>.</li><li>Chỉ khi bị dồn ép quá đáng, chị mới phản kháng quyết liệt.</li></ul>',
    ], ['Sai — chị chỉ vùng lên hung dữ ở cuối, ban đầu thì nhẫn nhịn.', 'Sai — chị tha thiết van nài chứ không lạnh lùng.', 'Đúng — ban đầu chị van xin, nhẫn nhịn để bảo vệ chồng.', 'Sai — chị không chế giễu mà hạ mình cầu xin.']),
    Q('Hành động cuối cùng của chị Dậu thể hiện điều gì?', ['Sự nhu nhược', 'Sức phản kháng mạnh mẽ khi bị dồn đến đường cùng', 'Sự sợ hãi', 'Sự bất lực'], 1, '"Tức nước vỡ bờ" — bị áp bức cùng cực thì vùng lên.', [
      'Hành động cuối cùng — <b>quật ngã cả cai lệ và người nhà lí trưởng</b> — thể hiện <i>sức phản kháng mạnh mẽ</i> khi bị dồn đến đường cùng.',
      'Câu nói đanh thép <code>"Mày trói ngay chồng bà đi, bà cho mày xem!"</code> đánh dấu sự chuyển hóa từ nhẫn nhịn sang vùng dậy.',
      '<ul><li>Chân lí: <b>có áp bức, có đấu tranh</b>.</li><li>Đoạn văn báo hiệu sức mạnh tiềm tàng của người nông dân.</li></ul>',
    ], ['Sai — hiểu ngược ý nhan đề; cuối cùng chị mạnh mẽ chứ không nhu nhược.', 'Đúng — "tức nước vỡ bờ", bị dồn đến đường cùng thì vùng lên phản kháng.', 'Sai — chị vượt qua sợ hãi để chống trả.', 'Sai — chị không bất lực mà đánh ngã cả cai lệ.']),
    Q('Cai lệ tượng trưng cho?', ['Người tốt', 'Bộ máy thực dân – phong kiến tàn ác', 'Người trí thức', 'Người dân nghèo'], 1, 'Cai lệ là tay sai của bộ máy áp bức tàn bạo.', [
      'Nhân vật <b>cai lệ</b> chỉ là một tên tay sai mạt hạng nhưng lại là hiện thân thu nhỏ của <i>bộ máy thực dân – phong kiến tàn ác</i>.',
      'Hắn hành động <code>hung hãn, vũ phu, mất hết tính người</code>: sầm sập tiến vào, bịch vào ngực chị Dậu, trói anh Dậu đang ốm.',
      '<ul><li>Cai lệ tượng trưng cho <b>cường quyền, bạo lực</b>.</li><li>Qua nhân vật này, tác giả tố cáo chế độ sưu thuế dã man.</li></ul>',
    ], ['Sai — cai lệ tàn ác, không phải người tốt.', 'Đúng — cai lệ là tay sai, tượng trưng cho bộ máy thực dân – phong kiến tàn ác.', 'Sai — cai lệ không đại diện cho trí thức.', 'Sai — cai lệ là kẻ áp bức, đối lập với người dân nghèo.']),
    Q('Giá trị hiện thực chủ yếu của đoạn trích?', ['Ca ngợi triều đình', 'Tả cảnh đẹp', 'Phơi bày nỗi khổ của người nông dân', 'Kể chuyện cổ tích'], 2, 'Tố cáo xã hội tàn bạo, phơi bày bi kịch nông dân.', [
      '<b>Giá trị hiện thực</b> của đoạn trích là <i>phơi bày nỗi khổ cùng cực</i> của người nông dân và <i>tố cáo</i> xã hội tàn bạo trong mùa sưu thuế.',
      'Tác phẩm thuộc dòng <code>văn học hiện thực phê phán</code> 1930–1945, cùng dòng với "Lão Hạc", "Bước đường cùng".',
      '<ul><li>Bên cạnh giá trị hiện thực còn có <b>giá trị nhân đạo</b>: cảm thương, trân trọng người nông dân.</li></ul>',
    ], ['Sai — đoạn trích tố cáo chứ không ca ngợi bộ máy cai trị.', 'Sai — trọng tâm là số phận con người, không phải tả cảnh.', 'Đúng — phơi bày nỗi khổ của người nông dân, tố cáo xã hội tàn bạo.', 'Sai — đây là văn hiện thực phê phán, không phải cổ tích.']),
  ]),

  M(4, 'Lão Hạc — Nam Cao', [
    Q('Tác giả truyện "Lão Hạc" là?', ['Nguyên Hồng', 'Thanh Tịnh', 'Nam Cao', 'Ngô Tất Tố'], 2, 'Nam Cao (1917–1951).', [
      '<b>Nam Cao</b> (1917–1951) tên thật là Trần Hữu Tri, là cây bút xuất sắc của trào lưu <i>văn học hiện thực phê phán</i> trước Cách mạng.',
      'Ông viết về hai mảng đề tài chính: <b>người nông dân nghèo</b> ("Lão Hạc", "Chí Phèo") và <b>người trí thức nghèo</b> ("Đời thừa", "Sống mòn").',
      '<ul><li>Truyện ngắn "Lão Hạc" đăng báo năm 1943.</li><li>Nam Cao nổi tiếng với biệt tài <code>phân tích tâm lí nhân vật</code>.</li></ul>',
    ], ['Sai — Nguyên Hồng viết "Những ngày thơ ấu".', 'Sai — Thanh Tịnh là tác giả "Tôi đi học".', 'Đúng — Nam Cao (1917–1951) là tác giả truyện "Lão Hạc".', 'Sai — Ngô Tất Tố viết "Tắt đèn".']),
    Q('Số phận lão Hạc trong truyện là?', ['Hạnh phúc', 'Bi thảm, phải tự kết liễu', 'Giàu sang', 'Bình thường'], 1, 'Lão Hạc tự tử bằng bả chó để giữ tiền cho con.', [
      'Số phận lão Hạc là một <b>bi kịch</b> điển hình của người nông dân nghèo trong xã hội cũ: cô đơn, túng quẫn, bế tắc.',
      'Để giữ trọn mảnh vườn và món tiền dành cho con, lão chọn cái chết <code>ăn bả chó</code> — một cái chết dữ dội, đau đớn.',
      '<ul><li>Cái chết ấy là sự <b>hi sinh</b> thầm lặng vì con.</li><li>Đồng thời tố cáo xã hội đẩy người lương thiện vào đường cùng.</li></ul>',
    ], ['Sai — cuộc đời lão Hạc đầy bi kịch, không hạnh phúc.', 'Đúng — số phận bi thảm, lão tự kết liễu bằng bả chó để giữ tiền cho con.', 'Sai — lão Hạc rất nghèo túng, không giàu sang.', 'Sai — số phận lão Hạc là bi kịch, không bình thường.']),
    Q('Cậu Vàng trong truyện là?', ['Con trai lão Hạc', 'Con chó lão Hạc yêu thương', 'Người hàng xóm', 'Một địa chủ'], 1, 'Con chó cậu Vàng — kỉ vật của con trai lão Hạc.', [
      '<b>Cậu Vàng</b> là con chó mà lão Hạc hết mực yêu thương, coi như <i>người bạn, đứa con, người thân</i> trong cảnh cô đơn.',
      'Nó còn là <code>kỉ vật</code> của đứa con trai đã bỏ đi làm đồn điền cao su — nên gắn bó với lão càng thêm sâu nặng.',
      '<ul><li>Lão gọi yêu là "cậu Vàng", cho ăn cơm trong bát như người.</li><li>Việc bán cậu Vàng trở thành nỗi day dứt lớn nhất của lão.</li></ul>',
    ], ['Sai — con trai lão đi làm đồn điền cao su, không phải cậu Vàng.', 'Đúng — cậu Vàng là con chó lão yêu thương, kỉ vật của con trai.', 'Sai — cậu Vàng không phải người mà là con vật.', 'Sai — cậu Vàng không phải địa chủ.']),
    Q('Vì sao lão Hạc bán cậu Vàng?', ['Vì sợ chó cắn', 'Vì túng quẫn, sợ ăn vào tiền dành cho con', 'Vì cần tiền cờ bạc', 'Vì ghét chó'], 1, 'Lão quá nghèo, muốn giữ vẹn tiền và mảnh vườn cho con.', [
      'Lão Hạc buộc phải bán cậu Vàng vì <b>túng quẫn</b>: sau trận ốm, lão không còn sức làm thuê, lại <i>sợ tiêu lạm vào tiền và mảnh vườn dành cho con</i>.',
      'Quyết định ấy khiến lão <code>"cười như mếu", "mắt ầng ậng nước"</code> — đau đớn vì thấy mình đã "lừa một con chó".',
      '<ul><li>Việc bán chó cho thấy cảnh nghèo cùng đường.</li><li>Đồng thời làm nổi bật <b>lòng tự trọng</b> và tình thương con của lão.</li></ul>',
    ], ['Sai — lão yêu cậu Vàng, không sợ nó cắn.', 'Đúng — lão túng quẫn, sợ ăn vào tiền và mảnh vườn dành cho con.', 'Sai — lão sống lương thiện, không cờ bạc.', 'Sai — lão rất thương cậu Vàng, bán đi trong đau xót.']),
    Q('Phẩm chất nổi bật của lão Hạc là?', ['Lười biếng', 'Tham lam', 'Tự trọng và yêu con sâu sắc', 'Ích kỉ'], 2, 'Lão Hạc giàu lòng tự trọng, hi sinh vì con.', [
      'Vẻ đẹp của lão Hạc kết tinh ở hai phẩm chất: <b>lòng tự trọng</b> và <b>tình yêu thương con sâu sắc</b>.',
      'Lão thà chết chứ không chịu <code>"ăn vào" của con</code> hay phiền lụy hàng xóm; gửi ông giáo tiền lo ma chay để không làm khổ ai.',
      '<ul><li>Lão giữ <b>nhân cách trong sạch</b> ngay trong cảnh đói nghèo cùng cực.</li><li>Qua đó, Nam Cao khẳng định nhân phẩm cao quý của người nông dân.</li></ul>',
    ], ['Sai — lão chăm chỉ làm lụng, không lười biếng.', 'Sai — lão hi sinh tất cả cho con, không tham lam.', 'Đúng — phẩm chất nổi bật là lòng tự trọng và yêu con sâu sắc.', 'Sai — lão sống vì con, hoàn toàn không ích kỉ.']),
    Q('Nghệ thuật đặc sắc của truyện là?', ['Cốt truyện li kì', 'Lời thoại dài', 'Tả cảnh hùng vĩ', 'Miêu tả tâm lí nhân vật tinh tế'], 3, 'Nam Cao bậc thầy phân tích tâm lí nhân vật.', [
      '<b>Nghệ thuật đặc sắc</b> của "Lão Hạc" là biệt tài <i>miêu tả, phân tích tâm lí nhân vật</i> của Nam Cao.',
      'Tác giả dùng ngôi kể thứ nhất (ông giáo) và lối <code>kể chuyện đan xen triết lí</code> để khắc họa nội tâm giằng xé của lão Hạc.',
      '<ul><li>Ngôn ngữ <b>giản dị mà sâu sắc</b>, gần gũi lời ăn tiếng nói nông dân.</li><li>Cốt truyện đơn giản nhưng giàu sức ám ảnh.</li></ul>',
    ], ['Sai — cốt truyện giản dị, không li kì.', 'Sai — điểm mạnh không nằm ở lời thoại dài.', 'Sai — truyện không thiên về tả cảnh hùng vĩ.', 'Đúng — Nam Cao là bậc thầy miêu tả tâm lí nhân vật tinh tế.']),
  ]),

  M(5, 'Trường từ vựng', [
    Q('Trường từ vựng là?', ['Tập hợp từ có ít nhất một nét nghĩa chung', 'Từ trái nghĩa', 'Từ đồng nghĩa', 'Một câu'], 0, 'Định nghĩa: nhóm từ có nét nghĩa chung.', [
      '<b>Trường từ vựng</b> là tập hợp của những từ có <i>ít nhất một nét nghĩa chung</i>.',
      'Ví dụ trường <code>"mắt"</code> gồm: con ngươi, lông mi, nhìn, liếc, lờ đờ... — tất cả đều liên quan đến mắt.',
      '<ul><li>Đừng nhầm với <b>từ đồng nghĩa</b> (nghĩa giống nhau) hay <b>từ trái nghĩa</b> (nghĩa đối lập).</li><li>Trường từ vựng dựa trên <b>nét nghĩa chung</b>, không phải mức độ giống/khác.</li></ul>',
    ], ['Đúng — trường từ vựng là tập hợp từ có ít nhất một nét nghĩa chung.', 'Sai — từ trái nghĩa là quan hệ nghĩa đối lập, khác khái niệm trường từ vựng.', 'Sai — từ đồng nghĩa là quan hệ nghĩa giống nhau, không phải định nghĩa này.', 'Sai — trường từ vựng là một nhóm từ, không phải một câu.']),
    Q('Trong các từ sau, từ nào thuộc trường "bộ phận cơ thể người"?', ['đi, chạy, nhảy', 'cao, thấp', 'mắt, mũi, tai, miệng', 'đỏ, xanh, vàng'], 2, 'Đều là bộ phận cơ thể.', [
      'Để xác định một <b>trường từ vựng</b>, ta tìm các từ cùng chỉ về một phạm vi sự vật, đặc điểm hay hoạt động.',
      'Trường <b>"bộ phận cơ thể người"</b> gồm các danh từ như: <code>mắt, mũi, tai, miệng, tay, chân, đầu...</code>',
      '<ul><li>"đi, chạy, nhảy" → trường <i>hoạt động</i>.</li><li>"cao, thấp" → trường <i>kích thước</i>.</li><li>"đỏ, xanh, vàng" → trường <i>màu sắc</i>.</li></ul>',
    ], ['Sai — đi, chạy, nhảy thuộc trường hoạt động.', 'Sai — cao, thấp thuộc trường kích thước/chiều cao.', 'Đúng — mắt, mũi, tai, miệng đều là bộ phận cơ thể người.', 'Sai — đỏ, xanh, vàng thuộc trường màu sắc.']),
    Q('"vui, buồn, giận, hờn" thuộc trường nào?', ['Hành động', 'Âm thanh', 'Màu sắc', 'Trạng thái cảm xúc'], 3, 'Đều chỉ cảm xúc.', [
      'Các từ <code>vui, buồn, giận, hờn</code> đều chỉ những <b>trạng thái nội tâm</b> của con người, nên cùng thuộc trường <i>trạng thái cảm xúc</i>.',
      'Cách nhận diện: thử đặt câu hỏi "đây là cái gì / hoạt động gì / đặc điểm gì?" để quy về phạm vi nghĩa chung.',
      '<ul><li>Đây không phải <b>hành động</b> (đi, chạy), không phải <b>âm thanh</b> hay <b>màu sắc</b>.</li><li>Chúng diễn tả những rung động bên trong tâm hồn.</li></ul>',
    ], ['Sai — đây là các trạng thái nội tâm, không phải hành động.', 'Sai — không phải từ chỉ âm thanh.', 'Sai — không phải từ chỉ màu sắc.', 'Đúng — vui, buồn, giận, hờn đều chỉ trạng thái cảm xúc.']),
    Q('Trường từ vựng "động vật" gồm?', ['mặn, ngọt, chua', 'sáng, tối', 'bàn, ghế, tủ', 'chó, mèo, gà, vịt'], 3, 'Đều là động vật.', [
      'Trường từ vựng <b>"động vật"</b> gồm những từ gọi tên các loài vật: <code>chó, mèo, gà, vịt, trâu, bò...</code>',
      'Phân biệt với các trường khác trong những lựa chọn: <ul><li>"mặn, ngọt, chua" → trường <i>mùi vị</i>.</li><li>"sáng, tối" → trường <i>ánh sáng</i>.</li><li>"bàn, ghế, tủ" → trường <i>đồ vật / nội thất</i>.</li></ul>',
      'Mẹo: các từ trong cùng trường thường có thể thay thế nhau trong một khung ngữ cảnh nhất định.',
    ], ['Sai — mặn, ngọt, chua thuộc trường mùi vị.', 'Sai — sáng, tối thuộc trường ánh sáng.', 'Sai — bàn, ghế, tủ thuộc trường đồ vật.', 'Đúng — chó, mèo, gà, vịt đều là động vật.']),
    Q('Một từ có thể thuộc?', ['Mọi câu', 'Chỉ 1 trường', 'Nhiều trường nghĩa', 'Không trường nào'], 2, 'Một từ có thể tham gia nhiều trường khác nhau.', [
      'Do hiện tượng <b>nhiều nghĩa</b>, một từ có thể đồng thời thuộc về <i>nhiều trường từ vựng khác nhau</i>.',
      'Ví dụ từ <code>"ngọt"</code>: thuộc trường <b>mùi vị</b> (đường ngọt), trường <b>âm thanh</b> (đàn ngọt), trường <b>thời tiết</b> (rét ngọt).',
      '<ul><li>Mỗi nghĩa của từ ứng với một trường khác nhau.</li><li>Đây là cơ sở của nhiều biện pháp tu từ thú vị.</li></ul>',
    ], ['Sai — câu hỏi nói về trường từ vựng, không phải số câu.', 'Sai — một từ nhiều nghĩa có thể tham gia hơn một trường.', 'Đúng — một từ có thể thuộc nhiều trường nghĩa khác nhau.', 'Sai — mọi từ đều thuộc ít nhất một trường nghĩa.']),
    Q('"chân bàn", "chân núi" — từ "chân" được dùng theo cách?', ['Nghĩa gốc', 'Đồng nghĩa', 'Trái nghĩa', 'Chuyển trường, chuyển nghĩa ẩn dụ'], 3, 'Chuyển trường: từ bộ phận cơ thể → bộ phận đồ vật.', [
      'Nghĩa gốc của từ <b>"chân"</b> thuộc trường <i>bộ phận cơ thể người, động vật</i>.',
      'Trong "chân bàn", "chân núi", từ "chân" được <b>chuyển trường</b> sang chỉ bộ phận dưới cùng của sự vật — đây là <code>chuyển nghĩa theo phương thức ẩn dụ</code>.',
      '<ul><li>Sự chuyển trường giúp từ vựng thêm phong phú, gợi hình.</li><li>Đây là cách hình thành nghĩa chuyển phổ biến trong tiếng Việt.</li></ul>',
    ], ['Sai — nghĩa gốc của "chân" là bộ phận cơ thể, ở đây đã chuyển nghĩa.', 'Sai — đây là hiện tượng chuyển nghĩa, không phải đồng nghĩa.', 'Sai — không liên quan đến quan hệ trái nghĩa.', 'Đúng — "chân" chuyển trường từ bộ phận cơ thể sang bộ phận đồ vật theo ẩn dụ.']),
  ]),

  M(6, 'Từ tượng hình — Từ tượng thanh', [
    Q('Từ tượng hình là từ?', ['Chỉ màu sắc', 'Mô phỏng âm thanh', 'Chỉ tình cảm', 'Gợi tả hình ảnh, dáng vẻ'], 3, 'Tượng hình gợi hình dáng (lom khom, lả lướt…).', [
      '<b>Từ tượng hình</b> là từ <i>gợi tả hình ảnh, dáng vẻ, trạng thái</i> của sự vật.',
      'Ví dụ: <code>lom khom, lả lướt, ngoằn ngoèo, thướt tha, lừ đừ</code> — giúp người đọc hình dung rõ dáng dấp sự vật.',
      '<ul><li>Phần lớn từ tượng hình là <b>từ láy</b>.</li><li>Đừng nhầm với từ tượng thanh (mô phỏng âm thanh).</li></ul>',
    ], ['Sai — từ chỉ màu sắc là một trường nghĩa khác, không phải tượng hình.', 'Sai — mô phỏng âm thanh là định nghĩa của từ tượng thanh, dễ nhầm lẫn.', 'Sai — từ chỉ tình cảm không phải tượng hình.', 'Đúng — tượng hình gợi tả hình ảnh, dáng vẻ (lom khom, lả lướt).']),
    Q('Từ tượng thanh là từ?', ['Chỉ vị trí', 'Gợi tả hình ảnh', 'Mô phỏng âm thanh tự nhiên hoặc con người', 'Chỉ hành động'], 2, 'Tượng thanh mô phỏng âm thanh (rì rào, ầm ầm…).', [
      '<b>Từ tượng thanh</b> là từ <i>mô phỏng âm thanh</i> của tự nhiên hoặc của con người.',
      'Ví dụ: <code>rì rào, ầm ầm, róc rách, líu lo, ríu rít, ào ào</code> — tái hiện âm thanh sống động cho câu văn.',
      '<ul><li>Phần lớn cũng là <b>từ láy</b>.</li><li>Mẹo nhận biết: nhắm mắt lại, nếu "nghe" được thì là tượng thanh; nếu "thấy" được thì là tượng hình.</li></ul>',
    ], ['Sai — từ chỉ vị trí không phải tượng thanh.', 'Sai — gợi tả hình ảnh là định nghĩa của từ tượng hình, dễ nhầm lẫn.', 'Đúng — tượng thanh mô phỏng âm thanh tự nhiên hoặc con người (rì rào, ầm ầm).', 'Sai — từ chỉ hành động không phải tượng thanh.']),
    Q('Từ nào sau đây là từ tượng hình?', ['rì rào', 'lom khom', 'róc rách', 'vi vu'], 1, '"Lom khom" gợi dáng còng. Các từ khác là tượng thanh.', [
      'Để phân loại, hãy hỏi: từ này gợi <b>hình dáng</b> (thấy) hay <b>âm thanh</b> (nghe)?',
      '<code>"Lom khom"</code> gợi tả dáng người <i>cúi thấp, còng lưng</i> → là từ tượng hình.',
      '<ul><li>"rì rào" (sóng), "róc rách" (nước), "vi vu" (gió) đều mô phỏng <b>âm thanh</b> → là tượng thanh.</li></ul>',
    ], ['Sai — "rì rào" mô phỏng âm thanh nên là tượng thanh.', 'Đúng — "lom khom" gợi tả dáng còng nên là từ tượng hình.', 'Sai — "róc rách" mô phỏng âm thanh nước chảy, là tượng thanh.', 'Sai — "vi vu" mô phỏng âm thanh gió, là tượng thanh.']),
    Q('Từ nào sau đây là tượng thanh?', ['thướt tha', 'nhấp nhô', 'ríu rít', 'lảo đảo'], 2, '"Ríu rít" mô phỏng âm thanh chim hót.', [
      'Áp dụng tiêu chí "nghe hay thấy": từ tượng thanh phải gợi <b>âm thanh</b>.',
      '<code>"Ríu rít"</code> mô phỏng <i>tiếng chim hót</i> ríu ran → là từ tượng thanh.',
      '<ul><li>"thướt tha" (dáng), "nhấp nhô" (lên xuống), "lảo đảo" (đi nghiêng ngả) đều gợi <b>hình dáng</b> → là tượng hình.</li></ul>',
    ], ['Sai — "thướt tha" gợi dáng vẻ nên là từ tượng hình.', 'Sai — "nhấp nhô" gợi hình lên xuống, là từ tượng hình.', 'Đúng — "ríu rít" mô phỏng âm thanh chim hót nên là tượng thanh.', 'Sai — "lảo đảo" gợi dáng đi nghiêng ngả, là từ tượng hình.']),
    Q('Tác dụng chính của từ tượng hình, tượng thanh?', ['Thay từ Hán Việt', 'Làm câu ngắn lại', 'Tăng tính biểu cảm, sinh động cho câu văn', 'Không có tác dụng'], 2, 'Tạo hình ảnh và âm thanh sinh động.', [
      '<b>Tác dụng</b> của từ tượng hình, tượng thanh là <i>gợi hình, gợi thanh</i>, làm cho sự vật, hiện tượng hiện lên cụ thể, sinh động.',
      'Nhờ đó câu văn, câu thơ giàu <code>giá trị biểu cảm</code> và sức gợi tả mạnh mẽ.',
      '<ul><li>Thường dùng nhiều trong <b>văn miêu tả và tự sự</b>.</li><li>Ví dụ thơ Nguyễn Khuyến: <code>"Ao thu lạnh lẽo nước trong veo"</code>.</li></ul>',
    ], ['Sai — không nhằm thay thế từ Hán Việt.', 'Sai — không liên quan đến việc rút ngắn câu.', 'Đúng — tăng tính biểu cảm, gợi hình gợi thanh sinh động cho câu văn.', 'Sai — loại từ này có giá trị gợi tả rõ rệt.']),
    Q('Trong "Lao xao, chim hót líu lo" có?', ['Cả tượng hình và tượng thanh', 'Không có loại nào', 'Chỉ tượng thanh', 'Chỉ tượng hình'], 2, '"Lao xao", "líu lo" đều là tượng thanh.', [
      'Phân tích câu <code>"Lao xao, chim hót líu lo"</code> để tìm các từ tượng hình/tượng thanh.',
      'Cả hai từ đều mô phỏng <b>âm thanh</b>: "lao xao" (tiếng rì rầm, xôn xao), "líu lo" (tiếng chim hót) → đều là <i>tượng thanh</i>.',
      '<ul><li>Câu này <b>không có</b> từ gợi tả hình dáng.</li><li>Vì vậy chỉ chứa từ tượng thanh.</li></ul>',
    ], ['Sai — cả "lao xao" và "líu lo" đều gợi âm thanh, không có từ tượng hình.', 'Sai — câu này có chứa từ tượng thanh.', 'Đúng — "lao xao", "líu lo" đều mô phỏng âm thanh nên đều là tượng thanh.', 'Sai — không có từ gợi hình dáng trong câu này.']),
  ]),

  M(7, 'Cô bé bán diêm — An-đéc-xen', [
    Q('Tác giả "Cô bé bán diêm" là?', ['Tô-xtôi (Nga)', 'Bach (Pháp)', 'Grim (Đức)', 'An-đéc-xen (Đan Mạch)'], 3, 'An-đéc-xen — nhà văn Đan Mạch nổi tiếng truyện cổ.', [
      '<b>An-đéc-xen</b> (1805–1875) là nhà văn <i>Đan Mạch</i>, "ông vua truyện cổ tích" của thế giới.',
      'Truyện của ông nhẹ nhàng, đượm <code>chất thơ và lòng nhân ái</code>, thấm đẫm niềm tin yêu con người, đặc biệt là người nghèo khổ.',
      '<ul><li>Tác phẩm nổi tiếng: <code>Cô bé bán diêm</code>, <code>Nàng tiên cá</code>, <code>Bộ quần áo mới của hoàng đế</code>.</li><li>Đừng nhầm với anh em nhà Grim (Đức).</li></ul>',
    ], ['Sai — Tô-xtôi là nhà văn Nga, không viết "Cô bé bán diêm".', 'Sai — nhầm tên; không phải tác giả truyện này.', 'Sai — anh em Grim người Đức viết truyện cổ khác, dễ nhầm lẫn.', 'Đúng — An-đéc-xen, nhà văn Đan Mạch nổi tiếng truyện cổ, là tác giả.']),
    Q('Cô bé bán diêm kết thúc thế nào?', ['Trở nên giàu có', 'Đoàn tụ với gia đình', 'Chết cóng trong đêm giao thừa', 'Bay lên trời'], 2, 'Cô bé chết trong đêm giao thừa lạnh giá.', [
      'Truyện có <b>kết thúc bi thương</b>: cô bé <i>chết cóng</i> nơi xó tường trong đêm giao thừa giá rét, trên môi vẫn nở nụ cười.',
      'Cái chết đối lập gay gắt với cảnh <code>phố xá tưng bừng, nhà nhà ấm cúng</code> ngày đầu năm mới.',
      '<ul><li>Hình ảnh "bay lên trời cùng bà" chỉ là <b>mộng tưởng</b> đẹp trước lúc chết.</li><li>Kết thúc tố cáo sự thờ ơ, lạnh lùng của người đời.</li></ul>',
    ], ['Sai — cô bé nghèo khổ đến chết, không hề giàu có.', 'Sai — cô bé không đoàn tụ với gia đình, đó chỉ là mộng tưởng.', 'Đúng — cô bé chết cóng trong đêm giao thừa lạnh giá.', 'Sai — hình ảnh bay lên trời chỉ là mộng tưởng, không phải kết cục thực.']),
    Q('Mỗi lần quẹt diêm, cô bé thấy gì?', ['Quái vật', 'Tuyết rơi', 'Một mộng tưởng đẹp đẽ', 'Ngôi sao'], 2, 'Lò sưởi, bàn ăn, cây thông, bà nội — các mộng tưởng.', [
      'Chi tiết nghệ thuật đặc sắc nhất truyện là những lần <b>quẹt diêm</b>, mỗi que diêm bừng lên một <i>mộng tưởng đẹp đẽ</i>.',
      'Trình tự mộng tưởng: <ul><li>Que 1: <code>lò sưởi</code> ấm áp.</li><li>Que 2: <code>bàn ăn</code> thịnh soạn.</li><li>Que 3: <code>cây thông Nô-en</code>.</li><li>Que 4 và cả bao: <code>bà nội</code> hiền hậu hiện về.</li></ul>',
      'Mộng tưởng tương phản với thực tại đói rét, làm nổi bật bi kịch của em bé.',
    ], ['Sai — không có hình ảnh quái vật trong truyện.', 'Sai — tuyết là cảnh thực bên ngoài, không phải điều cô bé thấy khi quẹt diêm.', 'Đúng — mỗi que diêm gợi một mộng tưởng đẹp: lò sưởi, bàn ăn, cây thông, bà nội.', 'Sai — sao băng chỉ là chi tiết phụ, không phải nội dung mộng tưởng chính.']),
    Q('Hình ảnh "bà nội" trong mộng tưởng có ý nghĩa?', ['Người duy nhất yêu thương cô bé', 'Người ác', 'Người nghèo', 'Người xa lạ'], 0, 'Bà nội là người yêu thương cô bé nhất.', [
      'Trong mộng tưởng, <b>bà nội</b> là người <i>duy nhất từng yêu thương</i> cô bé khi còn sống — điểm tựa tinh thần ấm áp nhất.',
      'Hình ảnh bà <code>cao lớn, hiền từ</code> hiện ra cùng ánh sáng, dang tay đón em rời khỏi cõi đời đói rét, tủi cực.',
      '<ul><li>Bà tượng trưng cho <b>tình thương và niềm hạnh phúc</b> mà em hằng khao khát.</li><li>Khao khát níu giữ bà cho thấy em thiếu thốn tình thương đến nhường nào.</li></ul>',
    ], ['Đúng — bà nội là người duy nhất từng yêu thương cô bé.', 'Sai — bà nội hiền hậu, không phải người ác.', 'Sai — ý nghĩa hình ảnh nằm ở tình thương, không phải hoàn cảnh giàu nghèo.', 'Sai — bà nội là người thân yêu nhất, không xa lạ.']),
    Q('Truyện thể hiện thái độ gì của tác giả?', ['Đồng cảm với trẻ em nghèo và phê phán xã hội vô tâm', 'Khuyên trẻ học giỏi', 'Chế giễu trẻ con', 'Ca ngợi sự giàu sang'], 0, 'Lòng nhân ái sâu sắc và lời tố cáo xã hội thờ ơ.', [
      'Qua truyện, An-đéc-xen bộc lộ tấm lòng <b>nhân đạo sâu sắc</b>: <i>đồng cảm, xót thương</i> những em bé nghèo khổ, bất hạnh.',
      'Đồng thời, truyện kín đáo <code>phê phán xã hội vô tâm, lạnh lùng</code> — nơi người ta dửng dưng trước cái chết của một em bé.',
      '<ul><li>Đây là <b>giá trị nhân đạo</b> cốt lõi của tác phẩm.</li><li>Tác phẩm thức tỉnh lòng trắc ẩn nơi người đọc.</li></ul>',
    ], ['Đúng — tác giả đồng cảm với trẻ em nghèo và phê phán xã hội vô tâm.', 'Sai — truyện không nhằm khuyên trẻ học giỏi.', 'Sai — tác giả thương xót chứ không chế giễu trẻ con.', 'Sai — truyện phê phán sự thờ ơ, không ca ngợi giàu sang.']),
    Q('Truyện thuộc thể loại?', ['Hồi kí', 'Nghị luận', 'Tiểu thuyết', 'Truyện cổ tích/truyện ngắn lãng mạn'], 3, 'Truyện ngắn lãng mạn pha chất cổ tích.', [
      '"Cô bé bán diêm" là <b>truyện ngắn</b> mang đậm màu sắc <i>cổ tích</i> và bút pháp lãng mạn.',
      'Truyện kết hợp yếu tố <code>hiện thực</code> (cảnh đói nghèo) với yếu tố <code>mộng tưởng kì ảo</code> (các lần quẹt diêm).',
      '<ul><li>Không phải hồi kí (ghi đời thực tác giả).</li><li>Không phải nghị luận hay tiểu thuyết dài.</li></ul>',
    ], ['Sai — không phải hồi kí ghi lại đời thực tác giả.', 'Sai — không trình bày lí lẽ thuyết phục nên không phải nghị luận.', 'Sai — đây là truyện ngắn, không phải tiểu thuyết dài.', 'Đúng — truyện ngắn lãng mạn pha chất cổ tích.']),
  ]),

  M(8, 'Đánh nhau với cối xay gió — Xéc-van-tét', [
    Q('"Đánh nhau với cối xay gió" trích từ tác phẩm nào?', ['Robin Hood', 'Đôn Ki-hô-tê', 'Người khốn khổ', 'Romeo và Juliet'], 1, 'Trích tiểu thuyết "Đôn Ki-hô-tê" của Xéc-van-tét.', [
      '<b>"Đánh nhau với cối xay gió"</b> trích từ tiểu thuyết <b>"Đôn Ki-hô-tê"</b> của nhà văn Tây Ban Nha Xéc-van-tét.',
      '"Đôn Ki-hô-tê" là tiểu thuyết <i>nhại truyện hiệp sĩ</i>, châm biếm những con người ảo tưởng, lỗi thời.',
      '<ul><li>Đừng nhầm với "Người khốn khổ" (Victor Hugo) hay "Romeo và Juliet" (Shakespeare).</li><li>Robin Hood là truyền thuyết dân gian Anh.</li></ul>',
    ], ['Sai — Robin Hood là truyền thuyết Anh, không liên quan.', 'Đúng — trích tiểu thuyết "Đôn Ki-hô-tê" của Xéc-van-tét.', 'Sai — "Người khốn khổ" là của Victor Hugo (Pháp).', 'Sai — "Romeo và Juliet" là bi kịch của Shakespeare.']),
    Q('Đôn Ki-hô-tê là người?', ['Mộng tưởng, đầu óc hiệp sĩ điên cuồng', 'Thực tế, khôn ngoan', 'Hèn nhát', 'Lười biếng'], 0, 'Mê truyện hiệp sĩ tới mức hoang tưởng.', [
      '<b>Đôn Ki-hô-tê</b> là một quý tộc nghèo, vì <i>mê truyện hiệp sĩ</i> đến mức đầu óc <b>hoang tưởng, điên rồ</b>.',
      'Lão tự phong mình làm hiệp sĩ, đi <code>"trừ gian diệt ác"</code>, nhìn cối xay gió thành người khổng lồ để lao vào đánh.',
      '<ul><li>Đôn Ki-hô-tê có mặt đáng cười (hoang tưởng) nhưng cũng đáng trọng (cao thượng, dũng cảm).</li><li>Lão tiêu biểu cho con người <b>lí tưởng</b> nhưng xa rời thực tế.</li></ul>',
    ], ['Đúng — Đôn Ki-hô-tê mộng tưởng, mê truyện hiệp sĩ tới mức hoang tưởng.', 'Sai — thực tế khôn ngoan là nét của Xan-chô, không phải Đôn Ki-hô-tê.', 'Sai — Đôn Ki-hô-tê dũng cảm lao vào "trận chiến", không hèn nhát.', 'Sai — ông năng nổ phiêu lưu, không lười biếng.']),
    Q('Xan-chô Pan-xa là người?', ['Lãng mạn, mộng tưởng', 'Ác độc', 'Thực tế, tỉnh táo, hài hước', 'Lười biếng'], 2, 'Thực tế, đối lập với Đôn Ki-hô-tê.', [
      '<b>Xan-chô Pan-xa</b> là giám mã của Đôn Ki-hô-tê — một bác nông dân <i>thực tế, tỉnh táo, hài hước</i>.',
      'Bác luôn nghĩ đến chuyện ăn ngủ, sợ đau, và can ngăn chủ những hành động điên rồ → đối lập hoàn toàn với Đôn Ki-hô-tê.',
      '<ul><li>Xan-chô tiêu biểu cho con người gắn với <b>thực tế đời thường</b>.</li><li>Cặp đôi tạo nên hiệu quả <code>tương phản</code> đặc sắc.</li></ul>',
    ], ['Sai — lãng mạn mộng tưởng là nét của Đôn Ki-hô-tê, dễ nhầm.', 'Sai — Xan-chô tốt bụng, không ác độc.', 'Đúng — Xan-chô thực tế, tỉnh táo, hài hước, đối lập với Đôn Ki-hô-tê.', 'Sai — Xan-chô tận tụy theo hầu chủ, không lười biếng.']),
    Q('Đôn Ki-hô-tê tưởng cối xay gió là?', ['Quái vật biển', 'Thiên thần', 'Lâu đài', 'Người khổng lồ'], 3, 'Tưởng là người khổng lồ và lao vào đánh.', [
      'Vì đầu óc hoang tưởng, Đôn Ki-hô-tê tưởng những chiếc <b>cối xay gió</b> là <i>những tên khổng lồ gian ác</i>.',
      'Lão hùng hổ <code>thúc ngựa lao vào "giao chiến"</code>, kết quả bị cánh quạt hất ngã, người ngợm và ngựa đều tan tành.',
      '<ul><li>Tình huống gây cười nhưng cũng phê phán lối sống ảo tưởng, xa rời thực tế.</li><li>Đây là chi tiết nổi tiếng bậc nhất của tác phẩm.</li></ul>',
    ], ['Sai — ông tưởng tượng kẻ thù trên cạn, không phải quái vật biển.', 'Sai — không phải thiên thần.', 'Sai — chi tiết lâu đài thuộc cảnh khác trong tác phẩm.', 'Đúng — Đôn Ki-hô-tê tưởng cối xay gió là người khổng lồ và lao vào đánh.']),
    Q('Cặp nhân vật chính thể hiện?', ['Cùng tính cách', 'Hai mặt đối lập của con người: lí tưởng và thực tế', 'Là cha con', 'Yêu nhau'], 1, 'Cặp đôi đối lập kinh điển trong văn học.', [
      'Đôn Ki-hô-tê và Xan-chô Pan-xa là <b>cặp nhân vật tương phản</b> kinh điển trong văn học thế giới.',
      'Họ thể hiện <i>hai mặt đối lập</i> trong con người: <ul><li>Đôn Ki-hô-tê → <b>lí tưởng, mộng mơ, cao thượng</b> nhưng viển vông.</li><li>Xan-chô → <b>thực tế, tỉnh táo</b> nhưng đôi khi tầm thường.</li></ul>',
      'Sự bổ sung của hai tính cách làm nên chiều sâu tư tưởng và sức hấp dẫn của tác phẩm.',
    ], ['Sai — hai nhân vật trái ngược nhau hoàn toàn, không cùng tính cách.', 'Đúng — họ thể hiện hai mặt đối lập của con người: lí tưởng và thực tế.', 'Sai — họ là chủ và người hầu, không phải cha con.', 'Sai — đây không phải mối quan hệ tình cảm lứa đôi.']),
    Q('Tác giả Xéc-van-tét là người?', ['Italia', 'Bồ Đào Nha', 'Tây Ban Nha', 'Hy Lạp'], 2, 'Miguel de Cervantes — nhà văn Tây Ban Nha.', [
      '<b>Xéc-van-tét</b> (Miguel de Cervantes, 1547–1616) là nhà văn vĩ đại của <i>Tây Ban Nha</i> thời Phục hưng.',
      '"Đôn Ki-hô-tê" của ông được coi là một trong những <code>tiểu thuyết hiện đại đầu tiên</code> của châu Âu.',
      '<ul><li>Tác phẩm vừa hài hước vừa giàu ý nghĩa nhân văn sâu sắc.</li><li>Cervantes sống cùng thời với Shakespeare (Anh).</li></ul>',
    ], ['Sai — Xéc-van-tét không phải người Italia.', 'Sai — không phải người Bồ Đào Nha.', 'Đúng — Miguel de Cervantes là nhà văn Tây Ban Nha.', 'Sai — không phải người Hy Lạp.']),
  ]),

  M(9, 'Chiếc lá cuối cùng — O. Hen-ri', [
    Q('Tác giả "Chiếc lá cuối cùng" là?', ['Hemingway', 'Tolstoy', 'O. Hen-ri', 'Mark Twain'], 2, 'O. Henry — nhà văn Mỹ chuyên truyện ngắn.', [
      '<b>O. Hen-ri</b> (1862–1910) là nhà văn <i>Mỹ</i> bậc thầy về truyện ngắn, với hơn 600 tác phẩm.',
      'Truyện của ông thường viết về người nghèo, người lao động bình thường, đề cao <code>tình thương và lòng nhân ái</code>.',
      '<ul><li>Đặc trưng nổi bật: <b>kết thúc bất ngờ, đảo ngược tình huống</b>.</li><li>Đừng nhầm với Hemingway hay Mark Twain (cùng là nhà văn Mỹ).</li></ul>',
    ], ['Sai — Hemingway là nhà văn Mỹ khác, không viết truyện này.', 'Sai — Tolstoy là nhà văn Nga.', 'Đúng — O. Hen-ri, nhà văn Mỹ chuyên truyện ngắn, là tác giả.', 'Sai — Mark Twain là nhà văn Mỹ khác, không phải tác giả truyện này.']),
    Q('Giôn-xi trong truyện mắc bệnh gì?', ['Viêm phổi', 'Ung thư', 'Sốt rét', 'Tâm thần'], 0, 'Viêm phổi nặng, suy sụp tinh thần.', [
      'Nhân vật <b>Giôn-xi</b> là một nữ họa sĩ nghèo, mắc bệnh <i>viêm phổi</i> nặng trong mùa đông giá rét.',
      'Bệnh tật cộng với <code>tâm trạng tuyệt vọng</code> khiến cô buông xuôi, mất hết ý chí sống.',
      '<ul><li>Cô gắn sinh mệnh mình với những chiếc lá thường xuân rụng dần.</li><li>Bệnh tật ở đây là cái cớ để bộc lộ vai trò của <b>nghị lực sống</b>.</li></ul>',
    ], ['Đúng — Giôn-xi mắc viêm phổi nặng và suy sụp tinh thần.', 'Sai — truyện không nói cô bị ung thư.', 'Sai — không phải sốt rét.', 'Sai — cô suy sụp tinh thần do bệnh phổi, không phải bệnh tâm thần.']),
    Q('Giôn-xi tin rằng?', ['Cô sẽ khỏi', 'Bạn sẽ cứu cô', 'Có phép màu', 'Khi chiếc lá cuối cùng rụng, cô sẽ chết'], 3, 'Niềm tin tuyệt vọng vào chiếc lá thường xuân.', [
      'Trong tuyệt vọng, Giôn-xi có một niềm tin bệnh hoạn: <b>khi chiếc lá thường xuân cuối cùng rụng xuống thì cô sẽ chết</b>.',
      'Cô đếm ngược những chiếc lá còn lại trên dây thường xuân ngoài cửa sổ như đếm ngược <code>thời gian sống của mình</code>.',
      '<ul><li>Đây là biểu hiện của sự <b>buông xuôi, mất ý chí sống</b>.</li><li>Chính niềm tin lệch lạc này tạo nên tình huống cho câu chuyện.</li></ul>',
    ], ['Sai — lúc đầu Giôn-xi tuyệt vọng, không tin mình sẽ khỏi.', 'Sai — cô không đặt niềm tin vào việc bạn cứu mình.', 'Sai — cô không trông đợi phép màu mà gắn đời mình với chiếc lá.', 'Đúng — Giôn-xi tin khi chiếc lá thường xuân cuối cùng rụng thì cô sẽ chết.']),
    Q('Ai đã vẽ chiếc lá cuối cùng?', ['Xiu — bạn cùng phòng của Giôn-xi', 'Cụ Bơ-men', 'Giôn-xi', 'Bác sĩ'], 1, 'Cụ Bơ-men vẽ trong đêm mưa rét và chết vì sưng phổi.', [
      'Người vẽ chiếc lá cuối cùng là <b>cụ Bơ-men</b> — một họa sĩ già nghèo, cả đời mơ ước vẽ được một kiệt tác.',
      'Trong đêm mưa gió, cụ âm thầm vẽ chiếc lá lên tường để <i>cứu Giôn-xi</i>, rồi bị <code>sưng phổi và qua đời</code>.',
      '<ul><li>Sự thật này được hé lộ ở cuối truyện — kết thúc <b>bất ngờ</b> đặc trưng O. Hen-ri.</li><li>Xiu chỉ là người chăm sóc, không vẽ chiếc lá.</li></ul>',
    ], ['Sai — Xiu chăm sóc Giôn-xi nhưng không phải người vẽ chiếc lá.', 'Đúng — cụ Bơ-men vẽ chiếc lá trong đêm mưa rét và chết vì sưng phổi.', 'Sai — Giôn-xi là người bệnh, không vẽ chiếc lá.', 'Sai — bác sĩ chỉ chữa bệnh, không vẽ chiếc lá.']),
    Q('Chiếc lá cuối cùng là?', ['Kiệt tác do cụ Bơ-men vẽ', 'Lá thật', 'Sao chép', 'Hư cấu'], 0, 'Bức kiệt tác — đánh đổi bằng mạng cụ Bơ-men.', [
      'Chiếc lá cuối cùng được khẳng định là một <b>kiệt tác</b> của cụ Bơ-men.',
      'Gọi là kiệt tác bởi: <ul><li>Nó <i>giống y như thật</i>, đánh lừa được cả hai cô họa sĩ.</li><li>Nó được vẽ trong hoàn cảnh khắc nghiệt, bằng cả <b>tình thương và tính mạng</b>.</li><li>Nó <code>cứu sống một con người</code>.</li></ul>',
      'Nghệ thuật chân chính là nghệ thuật vì con người — đó là thông điệp lớn của tác phẩm.',
    ], ['Đúng — đó là bức kiệt tác do cụ Bơ-men vẽ, đánh đổi bằng cả tính mạng.', 'Sai — đó là lá vẽ, không phải lá thật trên cây.', 'Sai — không phải bản sao chép mà là sáng tạo cứu người.', 'Sai — trong truyện chiếc lá là vật thật được vẽ, không phải hư cấu.']),
    Q('Thông điệp chính của truyện?', ['Bệnh tật đáng sợ', 'Mùa thu buồn', 'Nghệ thuật chân chính phục vụ con người, lòng nhân ái cao cả', 'Tiền bạc là tất cả'], 2, 'Ca ngợi lòng nhân ái và nghệ thuật vì con người.', [
      '<b>Thông điệp</b> của "Chiếc lá cuối cùng" là ca ngợi <i>tình yêu thương cao cả</i> giữa những con người nghèo khổ.',
      'Đồng thời, truyện khẳng định: <code>nghệ thuật chân chính là nghệ thuật vì con người, hướng tới sự sống và cái đẹp</code>.',
      '<ul><li>Sức mạnh của <b>nghị lực sống</b> và niềm tin có thể cứu rỗi con người.</li><li>Đây là giá trị nhân văn sâu sắc của tác phẩm.</li></ul>',
    ], ['Sai — bệnh tật chỉ là bối cảnh, không phải thông điệp.', 'Sai — mùa thu chỉ là khung cảnh, không phải ý nghĩa chính.', 'Đúng — nghệ thuật chân chính phục vụ con người và lòng nhân ái cao cả.', 'Sai — truyện đề cao tình người, không tôn thờ tiền bạc.']),
  ]),

  M(10, 'Trợ từ — Thán từ', [
    Q('Trợ từ là?', ['Từ chỉ hành động', 'Từ chỉ thời gian', 'Từ chuyên đứng trước danh từ', 'Từ chuyên đi kèm để nhấn mạnh hoặc đánh giá'], 3, 'Trợ từ: nhấn mạnh hoặc bộc lộ thái độ (chính, ngay, những…).', [
      '<b>Trợ từ</b> là những từ chuyên đi kèm một từ ngữ trong câu để <i>nhấn mạnh</i> hoặc <i>biểu thị thái độ đánh giá</i> sự vật, sự việc.',
      'Các trợ từ thường gặp: <code>những, có, chính, đích, ngay, đến, mỗi...</code>',
      '<ul><li>Ví dụ: "Nó ăn <b>những</b> hai bát cơm" → nhấn mạnh ăn nhiều.</li><li>"<b>Chính</b> tôi làm việc đó" → nhấn mạnh đúng người.</li></ul>',
    ], ['Sai — từ chỉ hành động là động từ, không phải trợ từ.', 'Sai — từ chỉ thời gian không phải định nghĩa trợ từ.', 'Sai — trợ từ không nhất thiết đứng trước danh từ.', 'Đúng — trợ từ chuyên đi kèm để nhấn mạnh hoặc đánh giá (chính, ngay, những).']),
    Q('Từ nào là trợ từ trong "Nó ăn những hai bát cơm"?', ['nó — đại từ chủ ngữ', 'bát — danh từ chỉ đơn vị', 'những', 'ăn — động từ chính'], 2, '"Những" là trợ từ nhấn mạnh số lượng nhiều.', [
      'Phân tích câu "Nó ăn <b>những</b> hai bát cơm" để tìm trợ từ.',
      'Từ <code>"những"</code> đứng trước "hai bát cơm" để <i>nhấn mạnh số lượng nhiều hơn mức bình thường</i> → là trợ từ.',
      '<ul><li>"nó" là <b>đại từ</b> (chủ ngữ), "ăn" là <b>động từ</b>, "bát" là <b>danh từ chỉ đơn vị</b>.</li><li>Bỏ "những" đi, nghĩa cơ bản vẫn còn nhưng mất sắc thái nhấn mạnh.</li></ul>',
    ], ['Sai — "nó" là đại từ làm chủ ngữ, không phải trợ từ.', 'Sai — "bát" là danh từ chỉ đơn vị.', 'Đúng — "những" là trợ từ nhấn mạnh số lượng nhiều.', 'Sai — "ăn" là động từ chính của câu.']),
    Q('Thán từ là từ?', ['Chỉ hành động', 'Chỉ sự vật', 'Chỉ phương hướng', 'Bộc lộ cảm xúc hoặc dùng để gọi đáp'], 3, 'Thán từ: ôi, a, vâng, dạ, ơi…', [
      '<b>Thán từ</b> là những từ dùng để <i>bộc lộ tình cảm, cảm xúc</i> của người nói hoặc dùng để <i>gọi đáp</i>.',
      'Thán từ chia làm hai nhóm: <ul><li><b>Bộc lộ cảm xúc</b>: <code>a, ái, ôi, ô hay, than ôi, trời ơi...</code></li><li><b>Gọi đáp</b>: <code>này, ơi, vâng, dạ, ừ...</code></li></ul>',
      'Thán từ có thể tạo thành một câu đặc biệt độc lập.',
    ], ['Sai — từ chỉ hành động là động từ, không phải thán từ.', 'Sai — từ chỉ sự vật là danh từ.', 'Sai — từ chỉ phương hướng không phải thán từ.', 'Đúng — thán từ bộc lộ cảm xúc hoặc dùng để gọi đáp (ôi, a, vâng, dạ, ơi).']),
    Q('Trong "Ôi, đẹp quá!" — thán từ là?', ['quá — phó từ chỉ mức độ', 'Ôi', 'đẹp — tính từ miêu tả', 'Cả câu'], 1, '"Ôi" bộc lộ cảm xúc ngạc nhiên, thán phục.', [
      'Trong câu "<b>Ôi</b>, đẹp quá!", ta tìm từ bộc lộ cảm xúc trực tiếp.',
      'Từ <code>"Ôi"</code> đứng đầu câu, tách bằng dấu phẩy, dùng để <i>bộc lộ cảm xúc ngạc nhiên, thán phục</i> → là thán từ.',
      '<ul><li>"đẹp" là <b>tính từ</b>, "quá" là <b>phó từ chỉ mức độ</b>.</li><li>Thán từ thường đứng đầu câu và được ngăn bằng dấu phẩy.</li></ul>',
    ], ['Sai — "quá" là phó từ chỉ mức độ, không phải thán từ.', 'Đúng — "Ôi" là thán từ bộc lộ cảm xúc ngạc nhiên, thán phục.', 'Sai — "đẹp" là tính từ miêu tả.', 'Sai — chỉ riêng "Ôi" là thán từ, không phải cả câu.']),
    Q('Thán từ "vâng, dạ" thuộc loại?', ['Nghi vấn', 'Phủ định', 'Bộc lộ cảm xúc', 'Gọi đáp'], 3, 'Là thán từ gọi đáp lễ phép.', [
      'Thán từ được chia thành hai nhóm chính, và <code>"vâng, dạ"</code> thuộc nhóm <b>gọi đáp</b>.',
      'Đây là những từ dùng để <i>đáp lời người trên</i> một cách lễ phép, thể hiện thái độ tôn trọng.',
      '<ul><li>Khác với thán từ bộc lộ cảm xúc (ôi, a, than ôi).</li><li>Trong giao tiếp, "vâng, dạ" thể hiện phép lịch sự, văn hóa ứng xử.</li></ul>',
    ], ['Sai — "vâng, dạ" không dùng để hỏi.', 'Sai — đây không phải từ phủ định.', 'Sai — "vâng, dạ" dùng đáp lời lễ phép, không phải bộc lộ cảm xúc.', 'Đúng — "vâng, dạ" là thán từ gọi đáp lễ phép.']),
    Q('Vị trí thán từ thường ở?', ['Cuối câu', 'Đầu câu, tách bằng dấu phẩy', 'Giữa câu', 'Không vị trí cố định'], 1, 'Thường đầu câu, ngăn cách bằng dấu phẩy hoặc chấm than.', [
      'Về vị trí, <b>thán từ thường đứng ở đầu câu</b>, được ngăn cách với phần còn lại bằng dấu phẩy hoặc dấu chấm than.',
      'Ví dụ: <code>"Ôi, đẹp quá!"</code>, <code>"Trời ơi! Sao lại thế?"</code>, <code>"Vâng, cháu hiểu rồi ạ."</code>',
      '<ul><li>Thán từ cũng có thể tách ra thành một <b>câu đặc biệt</b> độc lập.</li><li>Vị trí này khá ổn định, giúp dễ nhận diện thán từ.</li></ul>',
    ], ['Sai — thán từ ít khi đứng cuối câu.', 'Đúng — thán từ thường đứng đầu câu, ngăn cách bằng dấu phẩy hoặc chấm than.', 'Sai — vị trí điển hình là đầu câu, không phải giữa câu.', 'Sai — thán từ có vị trí khá ổn định ở đầu câu.']),
  ]),

  M(11, 'Tình thái từ', [
    Q('Tình thái từ là?', ['Từ chỉ sự vật', 'Từ chỉ tình cảm', 'Từ thêm vào câu để cấu tạo câu nghi vấn, cầu khiến, cảm thán hoặc biểu thị sắc thái tình cảm', 'Từ chỉ hành động'], 2, 'Định nghĩa SGK 8.', [
      '<b>Tình thái từ</b> là những từ được <i>thêm vào câu</i> để cấu tạo câu theo mục đích nói (nghi vấn, cầu khiến, cảm thán) hoặc để biểu thị sắc thái tình cảm.',
      'Bốn loại tình thái từ chính: <ul><li><b>Nghi vấn</b>: à, ư, hả, chứ, chăng...</li><li><b>Cầu khiến</b>: đi, nào, với...</li><li><b>Cảm thán</b>: thay, sao...</li><li><b>Biểu thị sắc thái tình cảm</b>: ạ, nhé, cơ, mà...</li></ul>',
      'Tình thái từ giúp câu nói thêm sắc thái, lễ độ, gần gũi.',
    ], ['Sai — từ chỉ sự vật là danh từ, không phải tình thái từ.', 'Sai — từ chỉ tình cảm không phải định nghĩa tình thái từ.', 'Đúng — tình thái từ thêm vào câu để tạo câu nghi vấn, cầu khiến, cảm thán hoặc biểu thị sắc thái tình cảm.', 'Sai — từ chỉ hành động là động từ.']),
    Q('Trong "Anh đi à?" — tình thái từ là?', ['à', 'đi — vừa là động từ vừa là tình thái từ', 'đi — động từ chính của câu', 'Anh — đại từ xưng hô'], 0, '"À" là tình thái từ nghi vấn.', [
      'Phân tích câu "Anh đi <b>à</b>?" để tìm tình thái từ.',
      'Từ <code>"à"</code> đứng cuối câu, biến câu thành <i>câu nghi vấn</i> → là tình thái từ nghi vấn.',
      '<ul><li>"Anh" là đại từ, "đi" là động từ chính.</li><li>Bỏ "à" thì câu mất sắc thái hỏi: "Anh đi." → câu trần thuật.</li></ul>',
    ], ['Đúng — "à" là tình thái từ tạo sắc thái nghi vấn.', 'Sai — "đi" chỉ là động từ, không kiêm tình thái từ ở đây.', 'Sai — "đi" là động từ chính, không phải tình thái từ.', 'Sai — "Anh" là đại từ xưng hô.']),
    Q('Tình thái từ cảm thán thường gặp?', ['thay, sao, ơi', 'mà, kia', 'à, ư, hả', 'nhé, nào'], 0, 'Thay, sao, ơi… dùng để bộc lộ cảm xúc.', [
      'Tình thái từ <b>cảm thán</b> dùng để bộc lộ cảm xúc, thường gặp: <code>thay, sao, ơi</code>.',
      'Ví dụ: <i>"Thương <b>thay</b> cũng một kiếp người"</i>, <i>"Đẹp <b>sao</b> những cánh đồng quê"</i>.',
      '<ul><li>"à, ư, hả" → tình thái từ <b>nghi vấn</b>.</li><li>"nhé, nào" → tình thái từ <b>cầu khiến</b>.</li><li>"mà, kia" → tình thái từ <b>biểu thị sắc thái</b>.</li></ul>',
    ], ['Đúng — thay, sao, ơi là tình thái từ cảm thán bộc lộ cảm xúc.', 'Sai — "mà, kia" thiên về nhấn mạnh, không phải cảm thán.', 'Sai — "à, ư, hả" là tình thái từ nghi vấn.', 'Sai — "nhé, nào" là tình thái từ cầu khiến.']),
    Q('Trong "Đi học nhé!" — "nhé" là tình thái từ?', ['Cầu khiến', 'Nghi vấn', 'Phủ định', 'Cảm thán'], 0, '"Nhé" làm câu mang sắc thái cầu khiến, nhắc nhở.', [
      'Trong câu "Đi học <b>nhé</b>!", từ "nhé" tạo cho câu sắc thái <i>cầu khiến</i> nhẹ nhàng, có tính nhắc nhở, dặn dò.',
      '<code>"Nhé"</code> thường thể hiện sự thân mật, mềm mỏng trong lời đề nghị, yêu cầu.',
      '<ul><li>So với "Đi học đi!" (mệnh lệnh rõ), "Đi học nhé!" nhẹ nhàng, gần gũi hơn.</li><li>Tình thái từ giúp điều chỉnh sắc thái giao tiếp.</li></ul>',
    ], ['Đúng — "nhé" làm câu mang sắc thái cầu khiến, nhắc nhở.', 'Sai — "nhé" không tạo câu hỏi.', 'Sai — "nhé" không phải từ phủ định.', 'Sai — sắc thái ở đây là cầu khiến, không phải cảm thán.']),
    Q('Khi dùng tình thái từ cần chú ý?', ['Số tiếng', 'Tiếng Hán', 'Chính tả', 'Sắc thái biểu cảm và quan hệ vai giao tiếp'], 3, 'Phù hợp ngữ cảnh và quan hệ.', [
      'Khi sử dụng tình thái từ, cần chú ý đến <b>sắc thái biểu cảm</b> và <b>quan hệ vai giao tiếp</b> (tuổi tác, thứ bậc, thân – sơ).',
      'Ví dụ: với người trên dùng <code>"ạ"</code> để tỏ lễ phép ("Con chào bố <b>ạ</b>"); với bạn bè có thể dùng "nhé, nha".',
      '<ul><li>Dùng sai tình thái từ có thể gây <i>thiếu lễ độ</i> hoặc <i>không phù hợp ngữ cảnh</i>.</li><li>Đây là điểm cốt yếu khi rèn kĩ năng giao tiếp.</li></ul>',
    ], ['Sai — không phải vấn đề số tiếng trong câu.', 'Sai — không liên quan đến yếu tố Hán Việt.', 'Sai — chính tả không phải điều cốt yếu khi dùng tình thái từ.', 'Đúng — cần chú ý sắc thái biểu cảm và quan hệ vai giao tiếp.']),
    Q('"Em ăn cơm đi nào!" — tình thái từ là?', ['ăn — động từ chính', 'đi nào', 'Em — đại từ xưng hô', 'cơm — bổ ngữ chỉ vật'], 1, '"Đi nào" thúc giục, cầu khiến.', [
      'Phân tích câu "Em ăn cơm <b>đi nào</b>!" để tìm tình thái từ.',
      'Hai từ <code>"đi", "nào"</code> kết hợp tạo sắc thái <i>cầu khiến, thúc giục</i> thân mật → là tình thái từ.',
      '<ul><li>"ăn" là động từ chính, "cơm" là bổ ngữ, "Em" là đại từ xưng hô.</li><li>"đi", "nào" làm tăng tính giục giã, gần gũi của lời nói.</li></ul>',
    ], ['Sai — "ăn" là động từ chính, không phải tình thái từ.', 'Đúng — "đi nào" là tình thái từ thúc giục, cầu khiến.', 'Sai — "Em" là đại từ xưng hô.', 'Sai — "cơm" là bổ ngữ chỉ vật.']),
  ]),

  M(12, 'Ôn dịch, thuốc lá — Văn bản nhật dụng', [
    Q('"Ôn dịch, thuốc lá" thuộc kiểu văn bản?', ['Trữ tình', 'Nhật dụng (nghị luận – thuyết minh)', 'Cổ tích', 'Tự sự kết hợp miêu tả'], 1, 'Văn bản nhật dụng, có yếu tố thuyết minh – nghị luận.', [
      '<b>"Ôn dịch, thuốc lá"</b> là một <i>văn bản nhật dụng</i> — loại văn bản đề cập đến những vấn đề bức thiết của đời sống xã hội.',
      'Văn bản kết hợp phương thức <code>thuyết minh</code> (cung cấp thông tin về tác hại) và <code>nghị luận</code> (lập luận, thuyết phục).',
      '<ul><li>Dấu phẩy trong nhan đề <b>"Ôn dịch, thuốc lá"</b> nhấn mạnh sắc thái: thuốc lá như một ôn dịch.</li><li>Không phải văn trữ tình hay cổ tích.</li></ul>',
    ], ['Sai — văn bản nói về vấn đề xã hội, không phải trữ tình.', 'Đúng — đây là văn bản nhật dụng, có yếu tố thuyết minh – nghị luận.', 'Sai — không phải truyện cổ tích.', 'Sai — không kể chuyện nên không phải tự sự kết hợp miêu tả.']),
    Q('Đề tài của văn bản là?', ['Giao thông', 'Bảo vệ rừng', 'Ô nhiễm nước', 'Tác hại của thuốc lá'], 3, 'Cảnh báo về tác hại nghiêm trọng của thuốc lá.', [
      '<b>Đề tài</b> của văn bản là <i>tác hại nghiêm trọng của thuốc lá</i> đối với sức khỏe và đời sống cộng đồng.',
      'Văn bản phân tích tác hại trên nhiều phương diện: <ul><li>Sức khỏe người hút và người xung quanh (<code>hút thuốc thụ động</code>).</li><li>Đạo đức, lối sống (gương xấu cho thanh thiếu niên).</li><li>Kinh tế, xã hội.</li></ul>',
      'Đây là vấn đề có tính thời sự, gắn bó mật thiết với đời sống hiện đại.',
    ], ['Sai — văn bản không bàn về giao thông.', 'Sai — không phải đề tài bảo vệ rừng.', 'Sai — không bàn về ô nhiễm nước.', 'Đúng — đề tài là tác hại nghiêm trọng của thuốc lá.']),
    Q('Tác giả ví thuốc lá với gì?', ['Thuốc bổ', 'Thực phẩm', 'Bệnh nhẹ', 'Ôn dịch (đại dịch)'], 3, 'So sánh thuốc lá với "ôn dịch" để nhấn mức nguy hiểm.', [
      'Ngay từ nhan đề, tác giả đã ví thuốc lá với <b>"ôn dịch"</b> — tức một thứ <i>dịch bệnh nguy hiểm, lây lan</i>.',
      'Phép so sánh này nhằm <code>nhấn mạnh mức độ tàn phá ghê gớm</code> của thuốc lá, thậm chí còn "nặng hơn cả AIDS".',
      '<ul><li>Cách dùng từ tạo ấn tượng mạnh, gây cảnh tỉnh.</li><li>Đây là nét đặc sắc trong cách lập luận của văn bản.</li></ul>',
    ], ['Sai — thuốc lá có hại, không phải thuốc bổ.', 'Sai — thuốc lá không được ví với thực phẩm.', 'Sai — tác giả nhấn mạnh mức độ nguy hiểm cao, không phải bệnh nhẹ.', 'Đúng — ví thuốc lá với "ôn dịch" để nhấn mức nguy hiểm như đại dịch.']),
    Q('Văn bản kêu gọi điều gì?', ['Hút nhiều hơn', 'Toàn xã hội cùng chống thuốc lá', 'Trồng thuốc lá', 'Bán thuốc lá'], 1, 'Lời kêu gọi cộng đồng phòng chống thuốc lá.', [
      'Phần kết của văn bản là <b>lời kêu gọi</b>: toàn xã hội cùng chung tay <i>chống lại nạn thuốc lá</i>.',
      'Tác giả nhắc đến những chiến dịch chống thuốc lá ở các nước phát triển như một <code>tấm gương</code> đáng học tập.',
      '<ul><li>Văn bản hướng tới thay đổi <b>nhận thức và hành động</b> của cộng đồng.</li><li>Thể hiện trách nhiệm xã hội của người viết.</li></ul>',
    ], ['Sai — văn bản cảnh báo tác hại, không cổ vũ hút thuốc.', 'Đúng — kêu gọi toàn xã hội cùng chống thuốc lá.', 'Sai — không kêu gọi trồng thuốc lá.', 'Sai — không kêu gọi buôn bán thuốc lá.']),
    Q('Đặc điểm nổi bật của VB nhật dụng?', ['Có tính thời sự, gắn với đời sống đương đại', 'Cổ điển, xa rời thực tế', 'Toàn thơ', 'Không có nội dung cụ thể'], 0, 'Văn bản nhật dụng nói về vấn đề bức thiết hiện đại.', [
      '<b>Văn bản nhật dụng</b> có đặc điểm nổi bật là <i>tính thời sự</i>, gắn liền với những vấn đề bức thiết của đời sống đương đại.',
      'Đề tài thường gặp: <code>môi trường, dân số, ma túy, thuốc lá, quyền trẻ em, danh lam thắng cảnh...</code>',
      '<ul><li>Mục đích là <b>tác động vào nhận thức</b>, khơi gợi hành động của cộng đồng.</li><li>Văn bản nhật dụng có thể dùng nhiều phương thức biểu đạt khác nhau.</li></ul>',
    ], ['Đúng — văn bản nhật dụng có tính thời sự, gắn với đời sống đương đại.', 'Sai — văn bản nhật dụng gắn thực tế, không xa rời.', 'Sai — văn bản nhật dụng không phải toàn thơ.', 'Sai — văn bản nhật dụng bàn vấn đề cụ thể, bức thiết.']),
    Q('Phương thức biểu đạt chính?', ['Tự sự kết hợp biểu cảm', 'Biểu cảm', 'Thuyết minh kết hợp nghị luận', 'Miêu tả'], 2, 'Cung cấp thông tin + lập luận thuyết phục.', [
      '<b>Phương thức biểu đạt chính</b> của "Ôn dịch, thuốc lá" là <i>thuyết minh kết hợp nghị luận</i>.',
      'Cụ thể: <ul><li><b>Thuyết minh</b> — cung cấp số liệu, thông tin khoa học về tác hại của thuốc lá.</li><li><b>Nghị luận</b> — lập luận chặt chẽ để thuyết phục, kêu gọi.</li></ul>',
      'Sự kết hợp này khiến văn bản vừa <code>khách quan, đáng tin</code>, vừa có sức <code>thuyết phục mạnh mẽ</code>.',
    ], ['Sai — văn bản không kể chuyện nên không phải tự sự.', 'Sai — mục đích chính là cung cấp thông tin và thuyết phục, không phải biểu cảm.', 'Đúng — thuyết minh kết hợp nghị luận: cung cấp thông tin và lập luận thuyết phục.', 'Sai — không thiên về miêu tả cảnh vật.']),
  ]),

  M(13, 'Câu ghép', [
    Q('Câu ghép là?', ['Câu có 2 hay nhiều cụm CV không bao chứa nhau', 'Câu rút gọn', 'Câu có 1 cụm CV', 'Câu hỏi'], 0, 'Hai hay nhiều cụm chủ-vị, không bao chứa nhau.', [
      '<b>Câu ghép</b> là câu do <i>hai hoặc nhiều cụm chủ – vị (C–V)</i> không bao chứa nhau tạo thành. Mỗi cụm C–V là một <b>vế câu</b>.',
      'Ví dụ: <code>"Trời / mưa // nên đường / ướt"</code> — có hai cụm C–V độc lập.',
      '<ul><li>Khác <b>câu đơn</b> (chỉ 1 cụm C–V).</li><li>Khác câu mở rộng thành phần (cụm C–V bao chứa nhau).</li></ul>',
    ], ['Đúng — câu ghép có 2 hay nhiều cụm chủ-vị không bao chứa nhau.', 'Sai — câu rút gọn là khái niệm khác.', 'Sai — câu có 1 cụm chủ-vị là câu đơn.', 'Sai — câu hỏi phân loại theo mục đích nói, không phải định nghĩa câu ghép.']),
    Q('Câu "Trời mưa nên đường ướt" là?', ['Câu nghi vấn', 'Câu đơn', 'Câu ghép có quan hệ nguyên nhân – kết quả', 'Câu cảm thán'], 2, 'Hai vế nối bằng QHT "nên", chỉ nguyên nhân – kết quả.', [
      'Phân tích câu "Trời mưa nên đường ướt": có hai cụm C–V ("Trời / mưa", "đường / ướt") → là <b>câu ghép</b>.',
      'Hai vế nối với nhau bằng quan hệ từ <code>"nên"</code>, biểu thị quan hệ <i>nguyên nhân – kết quả</i> (mưa là nguyên nhân, đường ướt là kết quả).',
      '<ul><li>Đây không phải câu hỏi hay câu cảm thán.</li><li>Quan hệ ý nghĩa giữa các vế là điểm quan trọng cần xác định.</li></ul>',
    ], ['Sai — câu này không phải câu hỏi.', 'Sai — câu có hai cụm chủ-vị nên là câu ghép, không phải câu đơn.', 'Đúng — câu ghép, hai vế nối bằng "nên" chỉ nguyên nhân – kết quả.', 'Sai — câu này kể sự việc, không phải câu cảm thán.']),
    Q('Các vế câu ghép có thể nối bằng?', ['Dấu phẩy/dấu hai chấm', 'Cặp từ hô ứng', 'Tất cả các cách trên', 'Quan hệ từ'], 2, 'Nhiều cách: QHT, cặp từ hô ứng, dấu câu.', [
      'Có nhiều cách nối các vế của <b>câu ghép</b>:',
      '<ul><li>Dùng <b>quan hệ từ</b>: và, nhưng, nên, vì... ("Vì... nên...").</li><li>Dùng <b>cặp từ hô ứng</b>: vừa... đã..., càng... càng..., bao nhiêu... bấy nhiêu...</li><li>Dùng <b>dấu câu</b>: dấu phẩy, dấu chấm phẩy, dấu hai chấm.</li></ul>',
      'Vì cả ba cách đều đúng nên đáp án là <code>"tất cả các cách trên"</code>.',
    ], ['Sai — đúng nhưng chưa đủ; còn nối bằng quan hệ từ và cặp từ hô ứng.', 'Sai — đúng nhưng chưa đủ; còn nối bằng dấu câu và quan hệ từ.', 'Đúng — các vế có thể nối bằng quan hệ từ, cặp từ hô ứng hoặc dấu câu.', 'Sai — đúng nhưng chưa đủ; còn nối bằng dấu câu và cặp từ hô ứng.']),
    Q('"Tuy nhà nghèo nhưng nó học giỏi" — quan hệ giữa hai vế?', ['Tương phản', 'Nguyên nhân', 'Lựa chọn', 'Bổ sung'], 0, 'Cặp "Tuy…nhưng…" → tương phản (nhượng bộ).', [
      'Cặp quan hệ từ <code>"Tuy... nhưng..."</code> biểu thị quan hệ <b>tương phản (nhượng bộ)</b> giữa hai vế câu ghép.',
      'Ý nghĩa: dù vế đầu nêu một điều bất lợi ("nhà nghèo"), vế sau vẫn nêu kết quả trái ngược mong đợi ("học giỏi").',
      '<ul><li>Các cặp tương phản khác: <i>"Mặc dù... nhưng...", "Dù... vẫn..."</i>.</li><li>Phân biệt với "Vì... nên..." (nguyên nhân), "Nếu... thì..." (điều kiện).</li></ul>',
    ], ['Đúng — cặp "Tuy…nhưng…" biểu thị quan hệ tương phản (nhượng bộ).', 'Sai — không có cặp "Vì…nên…" nên không phải nguyên nhân.', 'Sai — không có quan hệ lựa chọn.', 'Sai — không phải quan hệ bổ sung.']),
    Q('"Vì trời mưa to nên trận đấu hoãn lại" — cặp quan hệ từ chỉ?', ['Tương phản', 'Mục đích', 'Nguyên nhân – kết quả', 'Điều kiện – kết quả'], 2, 'Vì… nên… → nguyên nhân – kết quả.', [
      'Cặp quan hệ từ <code>"Vì... nên..."</code> biểu thị quan hệ <b>nguyên nhân – kết quả</b>.',
      'Trong câu: "trời mưa to" là <i>nguyên nhân</i>, "trận đấu hoãn lại" là <i>kết quả</i>.',
      '<ul><li>Các cặp tương đương: <i>"Do... nên...", "Bởi vì... cho nên..."</i>.</li><li>Đừng nhầm với cặp "Nếu... thì..." (điều kiện) hay "Tuy... nhưng..." (tương phản).</li></ul>',
    ], ['Sai — cặp "Vì…nên…" không biểu thị tương phản.', 'Sai — không phải quan hệ mục đích.', 'Đúng — cặp "Vì…nên…" biểu thị quan hệ nguyên nhân – kết quả.', 'Sai — điều kiện – kết quả dùng cặp "Nếu…thì…", không phải "Vì…nên…".']),
    Q('"Nếu trời nắng thì chúng ta đi cắm trại" — quan hệ?', ['Nguyên nhân – kết quả', 'Tương phản', 'Tăng tiến', 'Điều kiện – kết quả'], 3, 'Nếu… thì… → điều kiện – kết quả.', [
      'Cặp quan hệ từ <code>"Nếu... thì..."</code> biểu thị quan hệ <b>điều kiện (giả thiết) – kết quả</b>.',
      'Trong câu: "trời nắng" là <i>điều kiện</i>, "chúng ta đi cắm trại" là <i>kết quả</i> sẽ xảy ra nếu điều kiện thỏa mãn.',
      '<ul><li>Các cặp tương đương: <i>"Hễ... thì...", "Giá... thì..."</i>.</li><li>Phân biệt rõ với "Vì... nên..." (nguyên nhân thực) — ở đây chỉ là giả thiết.</li></ul>',
    ], ['Sai — nguyên nhân – kết quả dùng "Vì…nên…", không phải "Nếu…thì…".', 'Sai — không phải quan hệ tương phản.', 'Sai — không phải quan hệ tăng tiến.', 'Đúng — cặp "Nếu…thì…" biểu thị quan hệ điều kiện – kết quả.']),
  ]),

  M(14, 'Dấu ngoặc đơn, dấu hai chấm', [
    Q('Dấu ngoặc đơn dùng để?', ['Đánh dấu lời trích dẫn', 'Liệt kê', 'Đánh dấu phần chú thích/giải thích thêm', 'Kết thúc câu'], 2, 'Bổ sung, giải thích, thuyết minh.', [
      '<b>Dấu ngoặc đơn</b> ( ) dùng để đánh dấu phần <i>chú thích</i> — giải thích, thuyết minh, bổ sung thêm thông tin.',
      'Ví dụ: <code>"Ba-sô (1644–1694) là nhà thơ nổi tiếng của Nhật Bản."</code> — phần trong ngoặc chú thích năm sinh, năm mất.',
      '<ul><li>Phần trong ngoặc đơn có thể bỏ đi mà nghĩa cơ bản của câu không đổi.</li><li>Đừng nhầm với dấu ngoặc kép (lời dẫn) hay dấu hai chấm (báo trước).</li></ul>',
    ], ['Sai — lời trích dẫn thường dùng dấu ngoặc kép.', 'Sai — liệt kê thường báo trước bằng dấu hai chấm.', 'Đúng — dấu ngoặc đơn đánh dấu phần chú thích, giải thích thêm.', 'Sai — kết thúc câu dùng dấu chấm/hỏi/than.']),
    Q('Trong "Nguyễn Du (1765–1820) là đại thi hào dân tộc" — phần trong ngoặc đơn là?', ['Năm sinh – năm mất', 'Lời nhân vật', 'Câu hỏi', 'Lời trích'], 0, 'Chú thích năm sinh – năm mất.', [
      'Phần trong dấu ngoặc đơn <code>(1765–1820)</code> là phần <b>chú thích</b> năm sinh – năm mất của Nguyễn Du.',
      'Đây là cách dùng phổ biến của dấu ngoặc đơn: bổ sung thông tin về <i>thời gian, xuất xứ, tên gọi khác</i>...',
      '<ul><li>Nếu bỏ phần này, câu vẫn trọn nghĩa: "Nguyễn Du là đại thi hào dân tộc."</li><li>Phần chú thích chỉ làm rõ thêm thông tin.</li></ul>',
    ], ['Đúng — phần trong ngoặc đơn chú thích năm sinh – năm mất.', 'Sai — đây không phải lời nhân vật.', 'Sai — không phải câu hỏi.', 'Sai — không phải lời trích dẫn.']),
    Q('Dấu hai chấm KHÔNG được dùng để?', ['Báo trước phần giải thích', 'Kết thúc câu cảm', 'Báo trước lời trích dẫn', 'Liệt kê'], 1, 'Kết câu cảm dùng dấu "!"; dấu : không kết câu cảm.', [
      '<b>Dấu hai chấm</b> ( : ) có các công dụng: <ul><li>Báo trước phần <b>giải thích, thuyết minh</b>.</li><li>Báo trước <b>lời dẫn trực tiếp</b> (kèm ngoặc kép) hoặc lời đối thoại (kèm gạch đầu dòng).</li><li>Báo trước phần <b>liệt kê</b>.</li></ul>',
      'Dấu hai chấm <i>không</i> dùng để <b>kết thúc câu</b> — việc kết thúc câu cảm thuộc về dấu chấm than (!).',
      'Vì vậy đáp án là "kết thúc câu cảm".',
    ], ['Sai — dấu hai chấm có dùng để báo trước phần giải thích.', 'Đúng — dấu hai chấm không kết thúc câu cảm; câu cảm dùng dấu "!".', 'Sai — dấu hai chấm có dùng để báo trước lời trích dẫn.', 'Sai — dấu hai chấm có dùng để báo trước phần liệt kê.']),
    Q('Trong "Mẹ bảo: \'Con học bài đi!\'" — dấu hai chấm để?', ['Giải thích', 'Đánh dấu câu hỏi tu từ', 'Liệt kê', 'Báo trước lời thoại'], 3, 'Báo trước lời nói trực tiếp.', [
      'Trong câu "Mẹ bảo: \'Con học bài đi!\'", dấu hai chấm dùng để <b>báo trước lời nói trực tiếp</b> của nhân vật.',
      'Sau dấu hai chấm là <code>lời dẫn trực tiếp</code> được đặt trong dấu ngoặc kép.',
      '<ul><li>Đây là một trong những công dụng chính của dấu hai chấm.</li><li>Phân biệt với dùng để liệt kê hay giải thích.</li></ul>',
    ], ['Sai — ở đây không phải để giải thích.', 'Sai — không liên quan đến câu hỏi tu từ.', 'Sai — sau dấu hai chấm là lời nói, không phải danh sách liệt kê.', 'Đúng — dấu hai chấm báo trước lời nói trực tiếp.']),
    Q('Dấu hai chấm trong "Vườn nhà em có nhiều loại cây: xoài, ổi, mít" để?', ['Báo trước phần liệt kê', 'Phủ định', 'Lời thoại', 'Nhấn mạnh ý phía sau'], 0, 'Báo trước liệt kê.', [
      'Trong câu này, dấu hai chấm dùng để <b>báo trước phần liệt kê</b> các loại cây: <code>xoài, ổi, mít</code>.',
      'Sau dấu hai chấm là một danh sách các sự vật cùng loại, ngăn cách bằng dấu phẩy.',
      '<ul><li>Đây là công dụng <i>liệt kê</i> của dấu hai chấm.</li><li>Phân biệt với báo trước lời thoại hay giải thích.</li></ul>',
    ], ['Đúng — dấu hai chấm báo trước phần liệt kê các loại cây.', 'Sai — không liên quan đến phủ định.', 'Sai — sau dấu hai chấm không phải lời thoại.', 'Sai — ở đây là liệt kê, không phải nhấn mạnh.']),
    Q('Khi viết, dấu ngoặc đơn được đặt?', ['Sau phần chú thích', 'Bất kì', 'Bao quanh phần chú thích', 'Trước phần chú thích'], 2, 'Phần chú thích nằm trong cặp ngoặc đơn.', [
      'Dấu ngoặc đơn là một <b>cặp dấu</b> ( ), được đặt để <i>bao quanh phần chú thích</i>.',
      'Phần cần chú thích nằm gọn giữa dấu mở ngoặc và dấu đóng ngoặc: <code>...( phần chú thích )...</code>',
      '<ul><li>Không đặt riêng lẻ một bên trước hay sau.</li><li>Vị trí cặp ngoặc ôm trọn nội dung cần giải thích thêm.</li></ul>',
    ], ['Sai — ngoặc đơn không đặt một bên sau phần chú thích.', 'Sai — vị trí không tùy tiện mà ôm trọn phần chú thích.', 'Đúng — cặp ngoặc đơn bao quanh phần chú thích.', 'Sai — ngoặc đơn không đặt một bên trước phần chú thích.']),
  ]),

  M(15, 'Dấu ngoặc kép', [
    Q('Dấu ngoặc kép KHÔNG dùng để?', ['Kết thúc câu', 'Đánh dấu tên tác phẩm', 'Đánh dấu lời dẫn trực tiếp', 'Đánh dấu từ ngữ hiểu theo nghĩa đặc biệt/mỉa mai'], 0, 'Kết thúc câu là chấm/hỏi/than, không phải ngoặc kép.', [
      '<b>Dấu ngoặc kép</b> ( " " ) có các công dụng: <ul><li>Đánh dấu <b>lời dẫn trực tiếp</b>.</li><li>Đánh dấu <b>tên tác phẩm</b>, tờ báo, tập san...</li><li>Đánh dấu từ ngữ hiểu theo <b>nghĩa đặc biệt</b> hoặc có hàm ý <b>mỉa mai</b>.</li></ul>',
      'Dấu ngoặc kép <i>không</i> dùng để <b>kết thúc câu</b> — kết thúc câu là việc của dấu chấm, chấm hỏi, chấm than.',
      'Vì vậy đáp án là "kết thúc câu".',
    ], ['Đúng — dấu ngoặc kép không dùng kết thúc câu; việc đó dùng dấu chấm/hỏi/than.', 'Sai — dấu ngoặc kép có dùng để đánh dấu tên tác phẩm.', 'Sai — dấu ngoặc kép có dùng để đánh dấu lời dẫn trực tiếp.', 'Sai — dấu ngoặc kép có dùng cho từ ngữ hiểu theo nghĩa đặc biệt/mỉa mai.']),
    Q('"Truyện Kiều" — dấu ngoặc kép dùng để?', ['Đánh dấu tên tác phẩm', 'Liệt kê', 'Lời dẫn', 'Mỉa mai'], 0, 'Đánh dấu tên tác phẩm.', [
      'Trong trường hợp này, dấu ngoặc kép dùng để <b>đánh dấu tên tác phẩm</b> "Truyện Kiều".',
      'Đây là một công dụng quan trọng: làm nổi bật <i>tên các tác phẩm văn học, nghệ thuật, sách báo</i>.',
      '<ul><li>Ví dụ: <code>"Tắt đèn", "Lão Hạc", "Dế Mèn phiêu lưu kí"</code>.</li><li>Không phải lời dẫn hay nghĩa mỉa mai.</li></ul>',
    ], ['Đúng — dấu ngoặc kép đánh dấu tên tác phẩm "Truyện Kiều".', 'Sai — không phải liệt kê.', 'Sai — đây không phải lời dẫn trực tiếp.', 'Sai — không mang nghĩa mỉa mai.']),
    Q('Trong "Cô ấy thật \'thông minh\' khi quên cả ví" — ngoặc kép thể hiện?', ['Tên tác phẩm', 'Lời trích', 'Liệt kê', 'Nghĩa mỉa mai, ngược'], 3, 'Thể hiện ý mỉa mai, ngược nghĩa.', [
      'Trong câu này, từ \'thông minh\' đặt trong ngoặc kép mang <b>nghĩa mỉa mai, ngược lại</b> với nghĩa thông thường.',
      'Thực chất câu nói có ý <i>chê</i> (quên cả ví là đãng trí), nên "thông minh" hàm ý châm biếm.',
      '<ul><li>Đây là công dụng đánh dấu từ ngữ hiểu theo <code>nghĩa đặc biệt / hàm ý mỉa mai</code>.</li><li>Ngữ cảnh quyết định cách hiểu của từ trong ngoặc kép.</li></ul>',
    ], ['Sai — "thông minh" ở đây không phải tên tác phẩm.', 'Sai — không phải lời trích dẫn.', 'Sai — không phải liệt kê.', 'Đúng — ngoặc kép thể hiện nghĩa mỉa mai, ngược nghĩa.']),
    Q('Lời dẫn trực tiếp được đánh dấu bằng?', ['Dấu chấm', 'Dấu ngoặc kép', 'Dấu hai chấm', 'Dấu ngoặc đơn'], 1, 'Lời dẫn trực tiếp đặt trong ngoặc kép.', [
      '<b>Lời dẫn trực tiếp</b> — nhắc lại nguyên văn lời nói hay ý nghĩ — được đặt trong <b>dấu ngoặc kép</b>.',
      'Thường đi kèm dấu hai chấm báo trước: <code>Bác Hồ dạy: "Không có gì quý hơn độc lập, tự do."</code>',
      '<ul><li>Dấu hai chấm chỉ <i>báo trước</i>, còn lời dẫn nằm trong <b>ngoặc kép</b>.</li><li>Phân biệt với lời dẫn gián tiếp (không dùng ngoặc kép).</li></ul>',
    ], ['Sai — dấu chấm dùng kết thúc câu, không đánh dấu lời dẫn.', 'Đúng — lời dẫn trực tiếp được đặt trong dấu ngoặc kép.', 'Sai — dấu hai chấm chỉ báo trước, còn lời dẫn nằm trong ngoặc kép.', 'Sai — dấu ngoặc đơn dùng cho phần chú thích.']),
    Q('"Bài thơ \'Quê hương\' của Tế Hanh rất hay" — ngoặc kép cho?', ['Phủ định', 'Lời dẫn', 'Tên tác phẩm', 'Mỉa mai'], 2, 'Đánh dấu tên bài thơ.', [
      'Trong câu này, dấu ngoặc kép dùng để <b>đánh dấu tên tác phẩm</b> — bài thơ "Quê hương" của Tế Hanh.',
      'Tên các bài thơ, truyện, vở kịch... khi viết trong văn bản thường được đặt trong ngoặc kép để dễ nhận diện.',
      '<ul><li>Không mang sắc thái mỉa mai hay phủ định.</li><li>Đây là cách dùng giống với "Truyện Kiều", "Tắt đèn".</li></ul>',
    ], ['Sai — không liên quan đến phủ định.', 'Sai — không phải lời dẫn trực tiếp.', 'Đúng — ngoặc kép đánh dấu tên bài thơ "Quê hương".', 'Sai — không mang sắc thái mỉa mai.']),
    Q('Trước dấu mở ngoặc kép cho lời dẫn, thường có dấu?', ['Hai chấm', 'Dấu phẩy', 'Chấm hỏi', 'Chấm than'], 0, 'Mẹ bảo: "Con học đi!" — có dấu hai chấm trước.', [
      'Khi dẫn <b>lời nói trực tiếp</b> trong ngoặc kép, thường có <b>dấu hai chấm</b> đứng trước để báo hiệu.',
      'Mô hình: <code>[Lời người dẫn] : "[Lời dẫn trực tiếp]"</code>. Ví dụ: <i>Mẹ bảo: "Con học bài đi!"</i>',
      '<ul><li>Dấu hai chấm có vai trò <b>báo trước</b> lời dẫn.</li><li>Không dùng dấu phẩy, chấm hỏi hay chấm than ở vị trí này.</li></ul>',
    ], ['Đúng — trước lời dẫn trong ngoặc kép thường có dấu hai chấm.', 'Sai — không dùng dấu phẩy để báo trước lời dẫn.', 'Sai — chấm hỏi không báo trước lời dẫn.', 'Sai — chấm than không báo trước lời dẫn.']),
  ]),

  M(16, 'Văn bản thuyết minh', [
    Q('Văn bản thuyết minh nhằm?', ['Kể chuyện', 'Khuyên răn', 'Cung cấp tri thức khách quan về sự vật, hiện tượng', 'Bộc lộ cảm xúc'], 2, 'Cung cấp thông tin khách quan.', [
      '<b>Văn bản thuyết minh</b> là kiểu văn bản nhằm <i>cung cấp tri thức khách quan</i> về đặc điểm, tính chất, nguyên nhân... của sự vật, hiện tượng trong tự nhiên và xã hội.',
      'Mục đích chính là <code>giúp người đọc hiểu biết</code> chứ không kể chuyện, không bộc lộ cảm xúc, không khuyên răn.',
      '<ul><li>Phổ biến trong đời sống: thuyết minh đồ vật, danh lam, phương pháp, thể loại.</li><li>Khác tự sự (kể), biểu cảm (cảm xúc), nghị luận (thuyết phục).</li></ul>',
    ], ['Sai — kể chuyện là đặc trưng của văn tự sự.', 'Sai — khuyên răn thường thuộc văn nghị luận.', 'Đúng — văn thuyết minh nhằm cung cấp tri thức khách quan về sự vật, hiện tượng.', 'Sai — bộc lộ cảm xúc là đặc trưng của văn biểu cảm.']),
    Q('Yêu cầu chính của VB thuyết minh?', ['Giàu hình ảnh, biểu cảm', 'Giàu cảm xúc', 'Hài hước', 'Chính xác, khoa học, rõ ràng'], 3, 'Tính khoa học và chính xác là then chốt.', [
      '<b>Yêu cầu</b> hàng đầu của văn bản thuyết minh là tính <i>chính xác, khoa học, rõ ràng</i>.',
      'Tri thức trong văn thuyết minh phải <code>khách quan, xác thực, đáng tin cậy</code> — không bịa đặt, không suy diễn cảm tính.',
      '<ul><li>Khác văn miêu tả/biểu cảm (đề cao hình ảnh, cảm xúc).</li><li>Tính khoa học là then chốt làm nên giá trị của văn thuyết minh.</li></ul>',
    ], ['Sai — giàu hình ảnh, biểu cảm là yêu cầu của văn miêu tả/biểu cảm.', 'Sai — giàu cảm xúc không phải yêu cầu của thuyết minh.', 'Sai — hài hước không phải tiêu chí của thuyết minh.', 'Đúng — yêu cầu chính là chính xác, khoa học, rõ ràng.']),
    Q('Các phương pháp thuyết minh thường gặp?', ['Phóng đại', 'Mỉa mai', 'Bịa đặt', 'Nêu định nghĩa, liệt kê, so sánh, dùng số liệu, phân loại'], 3, 'Các phương pháp thuyết minh phổ biến.', [
      'Để bài thuyết minh sáng rõ, người viết sử dụng các <b>phương pháp thuyết minh</b>:',
      '<ul><li><b>Nêu định nghĩa</b>: "X là..."</li><li><b>Liệt kê</b>: kể ra các đặc điểm, bộ phận.</li><li><b>So sánh</b>: đối chiếu cho dễ hình dung.</li><li><b>Dùng số liệu</b>: tăng độ tin cậy.</li><li><b>Phân loại, phân tích</b>: chia nhỏ đối tượng.</li></ul>',
      'Phóng đại, bịa đặt, mỉa mai đều <code>trái với tính khách quan</code> nên không phải phương pháp thuyết minh.',
    ], ['Sai — phóng đại làm sai lệch tri thức, trái với thuyết minh.', 'Sai — mỉa mai là giọng điệu, không phải phương pháp thuyết minh.', 'Sai — bịa đặt trái với tính khách quan của thuyết minh.', 'Đúng — nêu định nghĩa, liệt kê, so sánh, dùng số liệu, phân loại là các phương pháp thuyết minh.']),
    Q('Khi thuyết minh đồ vật, cần?', ['Phóng tác', 'Bộc lộ tình yêu', 'Kể chuyện cổ tích', 'Mô tả cấu tạo, công dụng, cách sử dụng'], 3, 'Tập trung vào cấu tạo – công dụng.', [
      'Khi <b>thuyết minh một đồ vật</b>, cần trình bày rõ: <i>cấu tạo, công dụng, cách sử dụng và bảo quản</i>.',
      'Ví dụ thuyết minh cái phích nước: <ul><li><b>Cấu tạo</b>: vỏ, ruột, nút.</li><li><b>Công dụng</b>: giữ nhiệt.</li><li><b>Cách dùng và bảo quản</b>.</li></ul>',
      'Người viết phải nắm vững <code>tri thức về đối tượng</code>, không phóng tác hay bộc lộ tình cảm cá nhân.',
    ], ['Sai — phóng tác làm sai lệch sự thật, không phù hợp thuyết minh.', 'Sai — bộc lộ tình yêu là biểu cảm, không phải thuyết minh.', 'Sai — kể chuyện cổ tích là tự sự.', 'Đúng — cần mô tả cấu tạo, công dụng, cách sử dụng của đồ vật.']),
    Q('Ngôn ngữ thuyết minh?', ['Châm biếm', 'Tối nghĩa', 'Hoa mỹ, ẩn dụ nhiều', 'Trong sáng, chính xác, dễ hiểu'], 3, 'Ngôn ngữ rõ ràng, đúng.', [
      '<b>Ngôn ngữ thuyết minh</b> cần <i>trong sáng, chính xác, chặt chẽ và dễ hiểu</i>.',
      'Tránh dùng từ ngữ <code>hoa mỹ, mơ hồ, đa nghĩa</code> vì sẽ làm giảm tính chính xác, gây hiểu lầm.',
      '<ul><li>Không lạm dụng ẩn dụ, so sánh bóng bẩy như văn nghệ thuật.</li><li>Câu văn rành mạch, thông tin rõ ràng là tiêu chí của thuyết minh.</li></ul>',
    ], ['Sai — châm biếm không phải ngôn ngữ thuyết minh.', 'Sai — thuyết minh cần rõ ràng, không được tối nghĩa.', 'Sai — lạm dụng ẩn dụ hoa mỹ làm mất tính chính xác.', 'Đúng — ngôn ngữ thuyết minh trong sáng, chính xác, dễ hiểu.']),
    Q('"Cái phích" — đoạn văn giới thiệu cấu tạo phích nước là?', ['Nghị luận', 'Thuyết minh', 'Miêu tả cảnh vật', 'Biểu cảm'], 1, 'Cung cấp tri thức về phích → thuyết minh.', [
      'Một đoạn văn giới thiệu <b>cấu tạo và công dụng của cái phích nước</b> chính là một văn bản <i>thuyết minh</i>.',
      'Vì nó <code>cung cấp tri thức khách quan</code> về đồ vật: vỏ phích, ruột phích, nguyên lí giữ nhiệt...',
      '<ul><li>Không trình bày lí lẽ (nghị luận), không tả cảnh, không bộc lộ cảm xúc.</li><li>Đây là dạng thuyết minh đồ vật quen thuộc trong chương trình.</li></ul>',
    ], ['Sai — không trình bày lí lẽ thuyết phục nên không phải nghị luận.', 'Đúng — cung cấp tri thức về cấu tạo phích nên là thuyết minh.', 'Sai — không tả cảnh vật mà giới thiệu đồ vật.', 'Sai — không bộc lộ cảm xúc nên không phải biểu cảm.']),
  ]),

  M(17, 'Hai cây phong — Ai-ma-tốp', [
    Q('Tác giả "Hai cây phong" là người nước nào?', ['Hoa Kỳ', 'nước Đức', 'Nga (Liên Xô cũ – Cư-rơ-gư-xtan)', 'Trung Quốc'], 2, 'Tsinghiz Aitmatov — nhà văn Cư-rơ-gư-xtan (Liên Xô cũ).', [
      '<b>Ai-ma-tốp</b> (Tsinghiz Aitmatov, 1928–2008) là nhà văn của nước cộng hòa <i>Cư-rơ-gư-xtan</i> thuộc Liên Xô cũ.',
      'Nhiều tác phẩm của ông viết về cuộc sống <code>khắc nghiệt nhưng giàu tình người</code> ở vùng núi quê hương.',
      '<ul><li>Tác phẩm nổi tiếng: "Người thầy đầu tiên", "Cây phong non trùm khăn đỏ".</li><li>Không phải nhà văn Mỹ, Đức hay Trung Quốc.</li></ul>',
    ], ['Sai — Ai-ma-tốp không phải người Hoa Kỳ.', 'Sai — không phải nhà văn Đức.', 'Đúng — Ai-ma-tốp là nhà văn Cư-rơ-gư-xtan thuộc Liên Xô cũ.', 'Sai — không phải nhà văn Trung Quốc.']),
    Q('Văn bản trích từ tác phẩm nào?', ['Cánh buồm đỏ thắm', 'Chiến tranh và hoà bình', 'Người thầy đầu tiên', 'Anna Karenina'], 2, 'Trích "Người thầy đầu tiên".', [
      '<b>"Hai cây phong"</b> là đoạn trích nằm ở phần đầu truyện vừa <b>"Người thầy đầu tiên"</b> của Ai-ma-tốp.',
      'Truyện kể về thầy giáo Đuy-sen đã hết lòng vì học trò, gieo mầm tri thức cho lũ trẻ vùng quê nghèo.',
      '<ul><li>"Chiến tranh và hoà bình", "Anna Karenina" là của Tolstoy (Nga).</li><li>"Cánh buồm đỏ thắm" là của A. Grin.</li></ul>',
    ], ['Sai — "Cánh buồm đỏ thắm" là của A. Grin, không phải nguồn đoạn trích.', 'Sai — "Chiến tranh và hoà bình" là của Tolstoy.', 'Đúng — "Hai cây phong" trích từ "Người thầy đầu tiên".', 'Sai — "Anna Karenina" là tiểu thuyết của Tolstoy.']),
    Q('Hai cây phong gắn với?', ['Cuộc chiến', 'Mối tình đầu', 'Thành phố', 'Tuổi thơ và ký ức về thầy Đuy-sen'], 3, 'Biểu tượng kí ức tuổi thơ và biết ơn người thầy.', [
      'Trong tâm trí người kể chuyện, <b>hai cây phong</b> gắn liền với <i>tuổi thơ</i> và <i>kí ức về thầy Đuy-sen</i>.',
      'Chính thầy Đuy-sen đã trồng hai cây phong với hi vọng gieo mầm tương lai tươi sáng cho cô bé An-tư-nai và lũ trẻ.',
      '<ul><li>Hai cây phong là <b>biểu tượng của lòng biết ơn</b> với người thầy.</li><li>Đồng thời là biểu tượng của quê hương, tuổi thơ.</li></ul>',
    ], ['Sai — hai cây phong không gắn với cuộc chiến.', 'Sai — không gắn với mối tình đầu.', 'Sai — gắn với làng quê chứ không phải thành phố.', 'Đúng — hai cây phong gắn với tuổi thơ và ký ức về thầy Đuy-sen.']),
    Q('Hai cây phong được tả qua góc nhìn?', ['Người hoạ sĩ', 'Cả hai', 'Đứa trẻ', 'Người đi đường'], 1, 'Người kể vừa là hoạ sĩ, vừa là đứa trẻ năm xưa.', [
      'Đoạn trích đặc sắc ở chỗ hai cây phong được tả đan xen qua <b>hai mạch kể, hai góc nhìn</b>.',
      'Người kể chuyện vừa là <i>người họa sĩ ở hiện tại</i> (cảm nhận bằng con mắt nghệ sĩ), vừa là <i>đứa trẻ năm xưa</i> (hồi tưởng kỉ niệm).',
      '<ul><li>Sự đan cài hai mạch kể (<code>"tôi"</code> và <code>"chúng tôi"</code>) tạo chiều sâu cảm xúc.</li><li>Vì vậy đáp án là "cả hai".</li></ul>',
    ], ['Sai — đúng một phần nhưng còn góc nhìn đứa trẻ năm xưa.', 'Đúng — người kể vừa là hoạ sĩ hiện tại, vừa là đứa trẻ năm xưa.', 'Sai — đúng một phần nhưng còn góc nhìn người hoạ sĩ.', 'Sai — không phải góc nhìn của người đi đường.']),
    Q('Tâm trạng nhân vật khi nhớ về hai cây phong?', ['Bồi hồi, yêu thương, biết ơn', 'Lạnh nhạt', 'Sợ hãi', 'Tức giận'], 0, 'Bồi hồi xúc động, biết ơn thầy Đuy-sen.', [
      'Khi nhớ về hai cây phong, nhân vật "tôi" mang tâm trạng <b>bồi hồi, yêu thương và biết ơn</b>.',
      'Mỗi lần về quê, anh đều <code>"đưa mắt nhìn hai cây phong quen thuộc"</code>, lòng dạt dào xúc động.',
      '<ul><li>Tình cảm gắn với quê hương, tuổi thơ và người thầy đầu tiên.</li><li>Không có sắc thái lạnh nhạt, sợ hãi hay tức giận.</li></ul>',
    ], ['Đúng — nhân vật bồi hồi, yêu thương và biết ơn thầy Đuy-sen.', 'Sai — nhân vật đầy xúc động, không hề lạnh nhạt.', 'Sai — không có sắc thái sợ hãi.', 'Sai — không có sự tức giận trong nỗi nhớ.']),
    Q('Hình tượng hai cây phong mang ý nghĩa?', ['Biểu tượng quê hương, kỉ niệm, tình thầy trò', 'Đồ trang trí', 'Một loài cây bình thường', 'Cây thuốc'], 0, 'Biểu tượng giàu sức gợi cảm.', [
      '<b>Hình tượng hai cây phong</b> là một biểu tượng giàu sức gợi: tượng trưng cho <i>quê hương, kỉ niệm tuổi thơ và tình thầy trò</i>.',
      'Hai cây phong như những con người có tâm hồn, biết <code>"nghiêng ngả thân cây, lay động lá cành, không ngớt tiếng rì rào"</code>.',
      '<ul><li>Đây không phải loài cây bình thường mà mang ý nghĩa <b>biểu tượng</b> sâu sắc.</li><li>Hình tượng làm nên chất trữ tình của đoạn trích.</li></ul>',
    ], ['Đúng — hai cây phong là biểu tượng quê hương, kỉ niệm, tình thầy trò.', 'Sai — không phải đồ trang trí.', 'Sai — đây là hình tượng giàu ý nghĩa, không chỉ là cây bình thường.', 'Sai — không phải cây thuốc.']),
  ]),

  M(18, 'Ôn tập học kì I', [
    Q('"Tôi đi học" của ai?', ['Ngô Tất Tố', 'Thanh Tịnh', 'Nguyên Hồng', 'Nam Cao'], 1, 'Thanh Tịnh.', [
      'Ôn lại các tác giả – tác phẩm truyện kí Việt Nam hiện đại học kì I.',
      '<b>"Tôi đi học"</b> là truyện ngắn trữ tình của <b>Thanh Tịnh</b>, viết về kỉ niệm buổi tựu trường đầu tiên.',
      '<ul><li>Ngô Tất Tố → "Tắt đèn".</li><li>Nguyên Hồng → "Những ngày thơ ấu".</li><li>Nam Cao → "Lão Hạc".</li></ul>',
    ], ['Sai — Ngô Tất Tố viết "Tắt đèn".', 'Đúng — "Tôi đi học" là của Thanh Tịnh.', 'Sai — Nguyên Hồng viết "Những ngày thơ ấu".', 'Sai — Nam Cao viết "Lão Hạc".']),
    Q('"Lão Hạc" do ai sáng tác?', ['Tô Hoài', 'Nguyên Hồng', 'Ngô Tất Tố', 'Nam Cao'], 3, 'Nam Cao.', [
      'Ghi nhớ: <b>"Lão Hạc"</b> là truyện ngắn xuất sắc của <b>Nam Cao</b> về số phận và phẩm giá người nông dân nghèo.',
      'Nam Cao là cây bút hiện thực phê phán bậc thầy, nổi tiếng với tài <code>phân tích tâm lí nhân vật</code>.',
      '<ul><li>Tô Hoài → "Dế Mèn phiêu lưu kí".</li><li>Đừng nhầm với các tác giả cùng thời.</li></ul>',
    ], ['Sai — Tô Hoài là tác giả khác, không viết "Lão Hạc".', 'Sai — Nguyên Hồng viết "Những ngày thơ ấu".', 'Sai — Ngô Tất Tố viết "Tắt đèn".', 'Đúng — "Lão Hạc" do Nam Cao sáng tác.']),
    Q('Thán từ trong "Ôi, đẹp quá!" là?', ['đẹp — tính từ chỉ vẻ đẹp', 'Ôi', 'quá — phó từ chỉ mức độ', 'Cả câu đều là thán từ'], 1, 'Ôi — thán từ.', [
      'Ôn lại <b>thán từ</b>: từ dùng bộc lộ cảm xúc hoặc gọi đáp.',
      'Trong "<b>Ôi</b>, đẹp quá!", từ <code>"Ôi"</code> đứng đầu câu, tách bằng dấu phẩy, bộc lộ cảm xúc → là thán từ.',
      '<ul><li>"đẹp" là tính từ, "quá" là phó từ chỉ mức độ.</li><li>Chỉ riêng "Ôi" là thán từ, không phải cả câu.</li></ul>',
    ], ['Sai — "đẹp" là tính từ miêu tả.', 'Đúng — "Ôi" là thán từ bộc lộ cảm xúc.', 'Sai — "quá" là phó từ chỉ mức độ.', 'Sai — chỉ riêng "Ôi" là thán từ, không phải cả câu.']),
    Q('Câu "Trời mưa nên đường trơn" là câu?', ['Đơn mở rộng thành phần', 'Ghép', 'Cảm thán', 'Đơn có trạng ngữ chỉ nguyên nhân'], 1, 'Có 2 cụm CV — câu ghép.', [
      'Ôn lại <b>câu ghép</b>: câu có hai hay nhiều cụm C–V không bao chứa nhau.',
      'Câu "Trời / mưa // nên đường / trơn" có <i>hai cụm chủ – vị độc lập</i>, nối bằng "nên" → là <b>câu ghép</b>.',
      '<ul><li>Quan hệ giữa hai vế: <code>nguyên nhân – kết quả</code>.</li><li>Không phải câu đơn hay câu cảm thán.</li></ul>',
    ], ['Sai — câu có hai cụm chủ-vị độc lập nên không phải câu đơn mở rộng.', 'Đúng — câu có hai cụm chủ-vị nối bằng "nên" nên là câu ghép.', 'Sai — câu kể sự việc, không phải cảm thán.', 'Sai — đây là hai vế chủ-vị, không phải câu đơn có trạng ngữ.']),
    Q('Dấu ngoặc kép dùng đánh dấu tên?', ['Địa danh', 'Số thứ tự chương mục', 'Tên riêng người nổi tiếng', 'Tác phẩm'], 3, 'Tên tác phẩm.', [
      'Ôn lại công dụng <b>dấu ngoặc kép</b>: đánh dấu lời dẫn trực tiếp, tên tác phẩm, từ ngữ hiểu theo nghĩa đặc biệt/mỉa mai.',
      'Trong các lựa chọn, dấu ngoặc kép dùng để đánh dấu <b>tên tác phẩm</b>: <code>"Truyện Kiều", "Tắt đèn"</code>.',
      '<ul><li>Không dùng cho địa danh, tên người, số thứ tự chương mục.</li><li>Tên người, địa danh dùng cách viết hoa, không cần ngoặc kép.</li></ul>',
    ], ['Sai — ngoặc kép không dùng đánh dấu địa danh.', 'Sai — không dùng cho số thứ tự chương mục.', 'Sai — tên người không đặt trong ngoặc kép.', 'Đúng — dấu ngoặc kép dùng đánh dấu tên tác phẩm.']),
    Q('Tượng hình khác tượng thanh ở chỗ?', ['Một bên gợi hình, một bên gợi âm', 'Đều gợi âm', 'Không phân biệt', 'Đều gợi hình'], 0, 'Tượng hình gợi hình; tượng thanh mô phỏng âm.', [
      'Ôn lại sự phân biệt <b>từ tượng hình</b> và <b>từ tượng thanh</b>.',
      '<ul><li><b>Tượng hình</b> → <i>gợi hình ảnh, dáng vẻ</i> (lom khom, thướt tha).</li><li><b>Tượng thanh</b> → <i>mô phỏng âm thanh</i> (rì rào, líu lo).</li></ul>',
      'Mẹo: tượng hình thì "thấy", tượng thanh thì "nghe" → <code>một bên gợi hình, một bên gợi âm</code>.',
    ], ['Đúng — tượng hình gợi hình dáng, tượng thanh mô phỏng âm thanh.', 'Sai — chỉ tượng thanh mới gợi âm.', 'Sai — hai loại có sự phân biệt rõ.', 'Sai — chỉ tượng hình mới gợi hình.']),
  ]),

  // ──────────────── HK2 ────────────────
  M(19, 'Nhớ rừng — Thế Lữ', [
    Q('Tác giả bài thơ "Nhớ rừng" là?', ['Huy Cận', 'Xuân Diệu', 'Thế Lữ', 'Lưu Trọng Lư'], 2, 'Thế Lữ (1907–1989), một trong những thủ lĩnh phong trào Thơ mới.', [
      '<b>Thế Lữ</b> (1907–1989) là một trong những nhà thơ tiên phong, <i>"thủ lĩnh"</i> của phong trào <b>Thơ mới</b> (1932–1945).',
      'Bài thơ <code>"Nhớ rừng"</code> là tác phẩm tiêu biểu, góp phần khẳng định thắng lợi của Thơ mới.',
      '<ul><li>Huy Cận, Xuân Diệu, Lưu Trọng Lư cũng thuộc Thơ mới nhưng không phải tác giả bài này.</li><li>Thế Lữ còn có công lớn với sân khấu kịch nói Việt Nam.</li></ul>',
    ], ['Sai — Huy Cận là nhà thơ khác của phong trào Thơ mới.', 'Sai — Xuân Diệu không phải tác giả "Nhớ rừng".', 'Đúng — Thế Lữ (1907–1989) là tác giả "Nhớ rừng".', 'Sai — Lưu Trọng Lư là nhà thơ khác, dễ nhầm vì cùng phong trào Thơ mới.']),
    Q('Nhân vật trữ tình trong "Nhớ rừng" là?', ['Con hổ trong vườn bách thú', 'Con sư tử', 'Người lữ khách', 'Người tù'], 0, 'Con hổ — biểu tượng cho khát vọng tự do.', [
      'Nhân vật trữ tình của bài thơ là <b>con hổ bị nhốt trong vườn bách thú</b>.',
      'Mượn lời con hổ, nhà thơ kín đáo bộc lộ <i>khát vọng tự do</i> và tâm sự của con người trong cảnh mất nước.',
      '<ul><li>Hình tượng con hổ là một <code>biểu tượng</code> nghệ thuật giàu ý nghĩa.</li><li>Hình tượng người tù là của "Khi con tu hú", không phải bài này.</li></ul>',
    ], ['Đúng — con hổ trong vườn bách thú là nhân vật trữ tình, biểu tượng khát vọng tự do.', 'Sai — không phải con sư tử mà là con hổ.', 'Sai — không phải người lữ khách.', 'Sai — hình tượng người tù là của "Khi con tu hú", không phải bài này.']),
    Q('Tâm trạng chủ đạo của con hổ là?', ['Bình thản', 'Vui vẻ', 'Hài lòng', 'Uất hận, chán ghét cuộc sống tù túng'], 3, 'Uất hận với cảnh tù túng, khao khát rừng già.', [
      'Tâm trạng chủ đạo của con hổ là nỗi <b>uất hận, chán ghét</b> cuộc sống <i>tù túng, giả dối, tầm thường</i> nơi vườn bách thú.',
      'Hổ "gặm một khối căm hờn trong cũi sắt", khinh bỉ cảnh <code>"hoa chăm, cỏ xén, lối phẳng, cây trồng"</code> tù hãm.',
      '<ul><li>Đối lập với quá khứ oai hùng nơi rừng già.</li><li>Tâm trạng ấy gửi gắm nỗi niềm của người dân mất nước.</li></ul>',
    ], ['Sai — con hổ không hề bình thản mà đầy uất ức.', 'Sai — con hổ không vui vẻ trong cảnh giam cầm.', 'Sai — con hổ chán ghét hiện tại, không hài lòng.', 'Đúng — tâm trạng uất hận, chán ghét cuộc sống tù túng, khao khát rừng già.']),
    Q('Bài thơ thể hiện khát vọng gì?', ['Học hành', 'Tình yêu đôi lứa', 'Yêu nước', 'Khát vọng tự do'], 3, 'Khát vọng tự do mãnh liệt, kín đáo bộc lộ tinh thần dân tộc.', [
      'Bài thơ thể hiện <b>khát vọng tự do</b> mãnh liệt — khát khao được trở về chốn rừng già hùng vĩ, được sống đúng với bản chất.',
      'Qua tâm sự con hổ, nhà thơ kín đáo khơi gợi <i>tinh thần dân tộc</i>, lòng yêu nước thầm kín của người dân mất nước.',
      '<ul><li>Khát vọng tự do là chủ đề trực tiếp, nổi bật nhất.</li><li>Tinh thần yêu nước ẩn sau, được gợi lên một cách tế nhị.</li></ul>',
    ], ['Sai — bài thơ không nói về khát vọng học hành.', 'Sai — không phải tình yêu đôi lứa.', 'Sai — tinh thần dân tộc chỉ kín đáo ẩn sau khát vọng tự do, không phải chủ đề trực tiếp.', 'Đúng — khát vọng tự do mãnh liệt, kín đáo bộc lộ tinh thần dân tộc.']),
    Q('Hình ảnh rừng già được miêu tả?', ['Khô cằn', 'Nhỏ bé', 'Hùng vĩ, bí ẩn, đầy sức sống', 'Tàn tạ'], 2, 'Rừng già hùng vĩ, là biểu tượng quá khứ vàng son.', [
      'Cảnh <b>rừng già</b> trong nỗi nhớ của con hổ hiện lên <i>hùng vĩ, bí ẩn, đầy sức sống</i> và hoang dã.',
      'Đó là chốn <code>"bóng cả, cây già", "gió gào ngàn", "giọng nguồn hét núi"</code> — nơi con hổ từng là chúa tể.',
      '<ul><li>Rừng già là biểu tượng cho <b>quá khứ vàng son, tự do</b>.</li><li>Đối lập gay gắt với cảnh vườn bách thú tù túng.</li></ul>',
    ], ['Sai — rừng già được tả tươi tốt, không khô cằn.', 'Sai — rừng già rộng lớn, không nhỏ bé.', 'Đúng — rừng già hùng vĩ, bí ẩn, đầy sức sống, biểu tượng quá khứ vàng son.', 'Sai — rừng già tràn đầy sức sống, không tàn tạ.']),
    Q('"Nhớ rừng" thuộc phong trào?', ['Văn học kháng chiến', 'Văn học hiện thực phê phán', 'Thơ Đường', 'Thơ mới'], 3, 'Thơ mới (1932–1945).', [
      '"Nhớ rừng" là một trong những bài thơ tiêu biểu của phong trào <b>Thơ mới</b> (1932–1945).',
      'Thơ mới phá vỡ niêm luật gò bó của thơ Đường, đề cao <i>cái tôi cá nhân và cảm xúc tự do</i>.',
      '<ul><li>Khác văn học hiện thực phê phán (văn xuôi: "Tắt đèn", "Lão Hạc").</li><li>Khác thơ Đường luật cổ điển niêm luật chặt chẽ.</li></ul>',
    ], ['Sai — không thuộc văn học kháng chiến.', 'Sai — hiện thực phê phán là dòng văn xuôi như "Tắt đèn", "Lão Hạc".', 'Sai — đây là thơ tự do hiện đại, không phải thơ Đường luật.', 'Đúng — "Nhớ rừng" thuộc phong trào Thơ mới (1932–1945).']),
  ]),

  M(20, 'Quê hương — Tế Hanh', [
    Q('Tác giả bài thơ "Quê hương" là?', ['Xuân Diệu', 'Huy Cận', 'Lưu Trọng Lư', 'Tế Hanh'], 3, 'Tế Hanh (1921–2009).', [
      '<b>Tế Hanh</b> (1921–2009) là nhà thơ trưởng thành từ phong trào <i>Thơ mới</i>, nổi tiếng với những vần thơ về quê hương.',
      'Bài thơ <code>"Quê hương"</code> sáng tác năm 1939, in trong tập "Nghẹn ngào", là nỗi nhớ quê da diết của tác giả.',
      '<ul><li>Xuân Diệu, Huy Cận, Lưu Trọng Lư cũng là nhà thơ mới nhưng không phải tác giả bài này.</li><li>Sau này Tế Hanh còn nổi tiếng với mảng thơ nhớ thương miền Nam.</li></ul>',
    ], ['Sai — Xuân Diệu là nhà thơ khác của phong trào Thơ mới.', 'Sai — Huy Cận không phải tác giả "Quê hương".', 'Sai — Lưu Trọng Lư là nhà thơ khác.', 'Đúng — "Quê hương" là của Tế Hanh (1921–2009).']),
    Q('Quê hương của Tế Hanh ở?', ['Sài Gòn', 'Làng quê ven sông Hương — Huế', 'Hà Nội', 'Làng chài ven biển Quảng Ngãi'], 3, 'Làng chài ven biển ở Quảng Ngãi.', [
      'Quê hương Tế Hanh là một <b>làng chài ven biển</b> ở tỉnh <i>Quảng Ngãi</i>.',
      'Vì thế bài thơ tràn ngập hình ảnh đặc trưng của làng biển: <code>con thuyền, cánh buồm, người dân chài, mùi mặn của biển</code>.',
      '<ul><li>Tình yêu làng chài chính là cội nguồn cảm hứng của bài thơ.</li><li>Không phải Sài Gòn, Huế hay Hà Nội.</li></ul>',
    ], ['Sai — quê Tế Hanh không phải Sài Gòn.', 'Sai — không phải làng ven sông Hương ở Huế.', 'Sai — không phải Hà Nội.', 'Đúng — quê Tế Hanh là làng chài ven biển Quảng Ngãi.']),
    Q('Hình ảnh trung tâm trong bài thơ?', ['Bến đò', 'Cánh buồm và đoàn thuyền đánh cá', 'Cánh đồng lúa', 'Cây đa'], 1, 'Đoàn thuyền và cánh buồm trắng.', [
      'Hình ảnh trung tâm của bài thơ là <b>cánh buồm và đoàn thuyền đánh cá</b> — biểu tượng cho cuộc sống lao động của làng chài.',
      'Cảnh đoàn thuyền ra khơi và trở về được miêu tả khỏe khoắn, đầy sức sống: <code>"Chiếc thuyền nhẹ hăng như con tuấn mã"</code>.',
      '<ul><li>Vì là làng biển nên không có cánh đồng lúa, cây đa làm trung tâm.</li><li>Hình ảnh con thuyền, cánh buồm gắn liền với hồn quê.</li></ul>',
    ], ['Sai — bến đò không phải hình ảnh trung tâm.', 'Đúng — hình ảnh trung tâm là cánh buồm và đoàn thuyền đánh cá.', 'Sai — quê biển nên không có cánh đồng lúa làm trung tâm.', 'Sai — cây đa không phải hình ảnh trung tâm bài thơ.']),
    Q('"Cánh buồm giương to như mảnh hồn làng" — biện pháp nghệ thuật?', ['Điệp ngữ', 'Nhân hoá', 'Hoán dụ', 'So sánh – ẩn dụ'], 3, 'So sánh — ẩn dụ độc đáo: cánh buồm = mảnh hồn làng.', [
      'Câu thơ <code>"Cánh buồm giương to như mảnh hồn làng"</code> sử dụng biện pháp <b>so sánh kết hợp ẩn dụ</b>.',
      'Cái <i>hữu hình</i> (cánh buồm) được so sánh với cái <i>vô hình, thiêng liêng</i> (mảnh hồn làng) → vừa cụ thể vừa giàu sức gợi.',
      '<ul><li>Cánh buồm trở thành biểu tượng cho linh hồn, sự sống của làng chài.</li><li>Đây là câu thơ đặc sắc nhất bài, thể hiện tài năng của Tế Hanh.</li></ul>',
    ], ['Sai — không có sự lặp lại từ ngữ nên không phải điệp ngữ.', 'Sai — không gán hành động người cho vật nên không phải nhân hoá.', 'Sai — không lấy bộ phận thay toàn thể nên không phải hoán dụ.', 'Đúng — so sánh kết hợp ẩn dụ: cánh buồm ví như mảnh hồn làng.']),
    Q('Cảm xúc chủ đạo của bài thơ?', ['Nỗi nhớ quê tha thiết', 'Tức giận', 'Vui vẻ', 'Buồn chán'], 0, 'Nỗi nhớ quê hương trong xa cách.', [
      'Cảm xúc chủ đạo, xuyên suốt bài thơ là <b>nỗi nhớ quê hương tha thiết</b> trong xa cách.',
      'Khổ thơ cuối bộc lộ trực tiếp: <code>"Tôi thấy nhớ cái mùi nồng mặn quá!"</code> — nỗi nhớ cụ thể, da diết.',
      '<ul><li>Tình yêu quê chân thành, trong sáng làm nên sức lay động của bài thơ.</li><li>Không phải tức giận hay buồn chán.</li></ul>',
    ], ['Đúng — cảm xúc chủ đạo là nỗi nhớ quê hương tha thiết trong xa cách.', 'Sai — bài thơ không mang sắc thái tức giận.', 'Sai — chủ âm là nỗi nhớ, không đơn thuần vui vẻ.', 'Sai — không phải buồn chán mà là nỗi nhớ trìu mến.']),
    Q('Bài thơ thuộc dòng?', ['Ca dao', 'Thơ mới', 'Thơ tự do hiện đại', 'Thơ Đường luật'], 1, 'Tế Hanh thuộc phong trào Thơ mới.', [
      'Bài thơ "Quê hương" thuộc dòng <b>Thơ mới</b> (1932–1945).',
      'Tế Hanh là một trong những nhà thơ tiêu biểu của phong trào, với cảm xúc <i>trong trẻo, hồn hậu</i>.',
      '<ul><li>Không phải ca dao dân gian (sáng tác tập thể, khuyết danh).</li><li>Thơ mới khác với thơ tự do hiện đại sau 1945 và thơ Đường luật cổ điển.</li></ul>',
    ], ['Sai — đây là sáng tác của một tác giả, không phải ca dao dân gian.', 'Đúng — Tế Hanh thuộc phong trào Thơ mới.', 'Sai — Thơ mới thời kì này khác với thơ tự do hiện đại sau 1945.', 'Sai — không phải thơ Đường luật niêm luật chặt chẽ.']),
  ]),

  M(21, 'Khi con tu hú — Tố Hữu', [
    Q('"Khi con tu hú" do ai sáng tác?', ['Tế Hanh', 'Thế Lữ', 'Hồ Chí Minh', 'Tố Hữu'], 3, 'Tố Hữu (1920–2002).', [
      '<b>Tố Hữu</b> (1920–2002) là <i>"lá cờ đầu"</i> của thơ ca cách mạng Việt Nam.',
      'Bài thơ <code>"Khi con tu hú"</code> nằm trong tập "Từ ấy", viết khi tác giả còn là một thanh niên giác ngộ lí tưởng.',
      '<ul><li>Tế Hanh → "Quê hương"; Thế Lữ → "Nhớ rừng".</li><li>Thơ Tố Hữu giàu tính trữ tình – chính trị.</li></ul>',
    ], ['Sai — Tế Hanh viết "Quê hương".', 'Sai — Thế Lữ viết "Nhớ rừng".', 'Sai — không phải Hồ Chí Minh.', 'Đúng — "Khi con tu hú" do Tố Hữu (1920–2002) sáng tác.']),
    Q('Bài thơ được sáng tác trong hoàn cảnh nào?', ['Hoà bình', 'Khi đi du học', 'Tác giả bị giam trong nhà lao Thừa Phủ (Huế) — 1939', 'Khi lên Tây Bắc'], 2, 'Tố Hữu sáng tác khi bị giam ở nhà lao Thừa Phủ, Huế.', [
      'Bài thơ ra đời trong <b>hoàn cảnh đặc biệt</b>: khi Tố Hữu đang bị thực dân giam trong <i>nhà lao Thừa Phủ (Huế)</i> năm 1939.',
      'Tiếng chim tu hú gọi bầy báo hiệu mùa hè đã khơi dậy trong lòng người tù trẻ tuổi nỗi <code>khao khát tự do</code> cháy bỏng.',
      '<ul><li>Hoàn cảnh tù đày giải thích cho tâm trạng ngột ngạt, bức bối trong bài.</li><li>Không phải thời hoà bình hay khi đi du học.</li></ul>',
    ], ['Sai — bài thơ ra đời khi tác giả bị giam, không phải thời hoà bình.', 'Sai — không phải sáng tác khi đi du học.', 'Đúng — Tố Hữu viết khi bị giam trong nhà lao Thừa Phủ (Huế) năm 1939.', 'Sai — không liên quan đến chuyến lên Tây Bắc.']),
    Q('Tiếng tu hú gợi điều gì?', ['Nỗi sợ', 'Cảnh chiến tranh', 'Mùa đông', 'Mùa hè và khát vọng tự do'], 3, 'Âm thanh mùa hè, khơi gợi khao khát tự do.', [
      'Tiếng chim <b>tu hú</b> là âm thanh báo hiệu <i>mùa hè</i> rộn rã, tràn đầy sức sống.',
      'Với người tù, âm thanh ấy khơi dậy bức tranh mùa hè tươi đẹp và bùng lên <code>khát vọng tự do</code> mãnh liệt.',
      '<ul><li>Tiếng tu hú mở đầu và kết thúc bài thơ, tạo kết cấu đầu cuối tương ứng.</li><li>Không gợi nỗi sợ, chiến tranh hay mùa đông.</li></ul>',
    ], ['Sai — tiếng tu hú không gợi nỗi sợ.', 'Sai — không gợi cảnh chiến tranh.', 'Sai — tiếng tu hú báo hiệu mùa hè, không phải mùa đông.', 'Đúng — tiếng tu hú gợi mùa hè và khơi dậy khát vọng tự do.']),
    Q('Tâm trạng nhân vật trữ tình?', ['Mệt mỏi', 'Vui sướng', 'Bình thản', 'Ngột ngạt, uất ức, khao khát phá tan ngục tù'], 3, 'Người tù khao khát thoát khỏi gông cùm.', [
      'Tâm trạng nhân vật trữ tình (người tù) là sự <b>ngột ngạt, uất ức</b> và <i>khao khát phá tan ngục tù</i> để giành lại tự do.',
      'Khổ cuối dồn nén cảm xúc: <code>"Ngột làm sao, chết uất thôi / Con chim tu hú ngoài trời cứ kêu!"</code>',
      '<ul><li>Cảnh tù túng đối lập với bức tranh mùa hè tự do bên ngoài.</li><li>Khát vọng tự do trở thành sức mạnh tinh thần của người chiến sĩ.</li></ul>',
    ], ['Sai — không chỉ là mệt mỏi mà là uất ức dữ dội.', 'Sai — người tù bức bối, không vui sướng.', 'Sai — tâm trạng đầy biến động, không bình thản.', 'Đúng — ngột ngạt, uất ức, khao khát phá tan ngục tù.']),
    Q('Thể thơ của bài là?', ['Thất ngôn bát cú', 'Thất ngôn tứ tuyệt Đường luật', 'Ngũ ngôn', 'Lục bát'], 3, 'Bài thơ viết theo thể lục bát.', [
      'Bài thơ "Khi con tu hú" được viết theo thể thơ <b>lục bát</b> — thể thơ truyền thống của dân tộc.',
      'Thể lục bát (câu 6 – câu 8 xen kẽ) tạo âm điệu <i>uyển chuyển, tha thiết</i>, phù hợp diễn tả cảm xúc.',
      '<ul><li>Không phải thất ngôn bát cú hay tứ tuyệt (thể Đường luật).</li><li>Không phải ngũ ngôn.</li></ul>',
    ], ['Sai — thất ngôn bát cú là thể Đường luật, không phải thể của bài này.', 'Sai — không phải thất ngôn tứ tuyệt Đường luật.', 'Sai — không phải thơ ngũ ngôn.', 'Đúng — bài thơ viết theo thể lục bát.']),
    Q('Câu thơ kết thể hiện?', ['Sự bình thản', 'Niềm vui', 'Niềm hi vọng', 'Sự ngột ngạt, đau khổ'], 3, '"Ngột làm sao chết uất thôi…" — bức bối, ngột ngạt.', [
      'Câu thơ kết của bài thể hiện sự <b>ngột ngạt, đau khổ</b> đến cực điểm của người tù.',
      'Cách ngắt nhịp bất thường, dùng động từ mạnh và từ cảm thán <code>"Ngột làm sao, chết uất thôi…"</code> dồn nén cảm xúc uất nghẹn.',
      '<ul><li>Tâm trạng đối lập với khung cảnh mùa hè tự do, rộn rã.</li><li>Đó là tiếng lòng khao khát phá tan xiềng xích.</li></ul>',
    ], ['Sai — câu kết đầy bức bối, không bình thản.', 'Sai — không thể hiện niềm vui.', 'Sai — câu kết nhấn nỗi uất ức chứ không phải hi vọng.', 'Đúng — "Ngột làm sao chết uất thôi…" thể hiện sự ngột ngạt, đau khổ.']),
  ]),

  M(22, 'Tức cảnh Pác Bó — Hồ Chí Minh', [
    Q('Bài "Tức cảnh Pác Bó" của ai?', ['Hồ Chí Minh', 'Trường Chinh', 'Phạm Văn Đồng', 'Tố Hữu'], 0, 'Hồ Chí Minh (1890–1969).', [
      'Bài thơ <b>"Tức cảnh Pác Bó"</b> do <b>Hồ Chí Minh</b> (1890–1969) sáng tác.',
      '"Tức cảnh" nghĩa là <i>ngắm cảnh mà nảy sinh cảm xúc, làm thơ</i> — một lối thơ quen thuộc của thơ ca cổ điển.',
      '<ul><li>Bài thơ thể hiện phong thái ung dung, tinh thần lạc quan của Bác.</li><li>Không phải Trường Chinh, Phạm Văn Đồng hay Tố Hữu.</li></ul>',
    ], ['Đúng — "Tức cảnh Pác Bó" là của Hồ Chí Minh (1890–1969).', 'Sai — không phải Trường Chinh.', 'Sai — không phải Phạm Văn Đồng.', 'Sai — Tố Hữu viết "Khi con tu hú", không phải bài này.']),
    Q('Bài thơ ra đời ở đâu?', ['Côn Đảo (nhà tù), 1932', 'Trung Quốc', 'Hà Nội', 'Pác Bó (Cao Bằng), 1941'], 3, 'Pác Bó – Cao Bằng, sau khi Bác về nước.', [
      'Bài thơ ra đời tại <b>Pác Bó (Cao Bằng)</b> năm <i>1941</i>, sau hơn 30 năm bôn ba, Bác trở về trực tiếp lãnh đạo cách mạng.',
      'Bác sống và làm việc trong điều kiện <code>gian khổ, thiếu thốn</code>: ở trong hang, ăn cháo bẹ rau măng, bàn làm việc bằng phiến đá.',
      '<ul><li>Hoàn cảnh ấy làm nổi bật tinh thần lạc quan trong bài thơ.</li><li>"Nhật kí trong tù" mới là tác phẩm viết ở Trung Quốc.</li></ul>',
    ], ['Sai — bài thơ không ra đời ở Côn Đảo.', 'Sai — viết tại Trung Quốc là "Nhật kí trong tù", không phải bài này.', 'Sai — không phải Hà Nội.', 'Đúng — bài thơ ra đời ở Pác Bó (Cao Bằng) năm 1941, sau khi Bác về nước.']),
    Q('Thể thơ?', ['Thất ngôn tứ tuyệt', 'Lục bát', 'Song thất lục bát', 'Thất ngôn bát cú Đường luật'], 0, 'Thất ngôn tứ tuyệt — bốn câu bảy tiếng.', [
      'Bài thơ viết theo thể <b>thất ngôn tứ tuyệt</b> Đường luật: <i>bốn câu, mỗi câu bảy tiếng</i>.',
      'Thể thơ cô đọng, hàm súc nhưng được Bác sử dụng với giọng điệu <code>tự nhiên, hóm hỉnh</code>.',
      '<ul><li>Khác thất ngôn bát cú (tám câu).</li><li>Không phải lục bát hay song thất lục bát.</li></ul>',
    ], ['Đúng — thất ngôn tứ tuyệt: bốn câu, mỗi câu bảy tiếng.', 'Sai — không phải thể lục bát.', 'Sai — không phải song thất lục bát.', 'Sai — bài chỉ bốn câu nên không phải thất ngôn bát cú (tám câu).']),
    Q('"Sáng ra bờ suối, tối vào hang" thể hiện?', ['Sự sang trọng', 'Sự ốm yếu', 'Sự cô đơn', 'Cuộc sống gian khổ nhưng vẫn ung dung'], 3, 'Phong thái ung dung, lạc quan dù gian khổ.', [
      'Câu thơ <code>"Sáng ra bờ suối, tối vào hang"</code> miêu tả nếp sinh hoạt đều đặn, hòa hợp với thiên nhiên của Bác.',
      'Dù điều kiện <i>gian khổ</i> (ở hang, bên suối), giọng thơ vẫn <b>ung dung, thư thái</b>, như một thú vui giữa núi rừng.',
      '<ul><li>Phép đối "sáng – tối", "ra – vào" tạo nhịp sống nhịp nhàng.</li><li>Thể hiện phong thái làm chủ hoàn cảnh của người chiến sĩ cách mạng.</li></ul>',
    ], ['Sai — câu thơ tả cảnh sống đơn sơ, không sang trọng.', 'Sai — không nói về sự ốm yếu.', 'Sai — không nhấn vào nỗi cô đơn mà vào sự ung dung.', 'Đúng — thể hiện cuộc sống gian khổ nhưng vẫn ung dung, lạc quan.']),
    Q('"Cuộc đời cách mạng thật là sang" — chữ "sang" thể hiện?', ['Niềm tự hào, tinh thần lạc quan cách mạng', 'Sự châm biếm', 'Giàu vật chất', 'Sự kiêu ngạo'], 0, 'Tinh thần cao đẹp, ung dung của người chiến sĩ.', [
      'Chữ <b>"sang"</b> là <i>"nhãn tự"</i> (chữ thần) của bài thơ, kết tinh tinh thần và cốt cách của Bác.',
      '"Sang" ở đây không phải giàu vật chất mà là <code>cái sang trọng trong tâm hồn</code>: niềm tự hào, niềm vui được cống hiến cho cách mạng.',
      '<ul><li>Dù gian khổ, Bác vẫn thấy cuộc đời cách mạng "thật là sang".</li><li>Thể hiện tinh thần lạc quan, phong thái ung dung hiếm có.</li></ul>',
    ], ['Đúng — chữ "sang" thể hiện niềm tự hào, tinh thần lạc quan cách mạng.', 'Sai — không mang ý châm biếm.', 'Sai — "sang" ở đây là sang trọng tinh thần, không phải giàu vật chất.', 'Sai — thể hiện khí phách cao đẹp, không phải kiêu ngạo.']),
    Q('Phong cách thơ Bác trong bài là?', ['Bi luỵ', 'Khô khan', 'Cầu kì, hoa mỹ', 'Cổ điển kết hợp hiện đại, giản dị mà sâu sắc'], 3, 'Đặc trưng thơ Hồ Chủ tịch.', [
      'Phong cách thơ Bác trong bài kết hợp hài hòa giữa <b>cổ điển và hiện đại</b>, <i>giản dị mà sâu sắc</i>.',
      'Chất <code>cổ điển</code>: thể thơ Đường luật, thi liệu thiên nhiên (suối, hang). Chất <code>hiện đại</code>: tinh thần lạc quan, chủ động làm chủ hoàn cảnh.',
      '<ul><li>Ngôn ngữ tự nhiên, hóm hỉnh, không cầu kì hoa mỹ.</li><li>Đây là nét đặc trưng của thơ Hồ Chủ tịch.</li></ul>',
    ], ['Sai — thơ Bác lạc quan, không bi luỵ.', 'Sai — thơ Bác giàu cảm xúc, không khô khan.', 'Sai — thơ Bác giản dị, không cầu kì hoa mỹ.', 'Đúng — phong cách cổ điển kết hợp hiện đại, giản dị mà sâu sắc.']),
  ]),

  M(23, 'Ngắm trăng — Hồ Chí Minh', [
    Q('"Ngắm trăng" (Vọng nguyệt) trích từ tập?', ['Sông núi', 'Đường kách mệnh', 'Truyện và kí', 'Nhật kí trong tù'], 3, '"Ngục trung nhật kí" — Nhật kí trong tù (1942–1943).', [
      '<b>"Ngắm trăng"</b> (nguyên tác chữ Hán: <i>Vọng nguyệt</i>) trích từ tập thơ <b>"Nhật kí trong tù"</b> (Ngục trung nhật kí).',
      'Tập thơ được Bác sáng tác trong thời gian bị giam cầm tại nhà tù của Tưởng Giới Thạch (1942–1943).',
      '<ul><li>"Đường kách mệnh" là tác phẩm chính luận, không phải tập thơ này.</li><li>"Truyện và kí" là mảng văn xuôi của Bác.</li></ul>',
    ], ['Sai — không phải tập "Sông núi".', 'Sai — "Đường kách mệnh" là tác phẩm chính luận, không phải tập thơ này.', 'Sai — "Truyện và kí" là mảng văn xuôi, không chứa bài thơ này.', 'Đúng — "Ngắm trăng" trích từ "Nhật kí trong tù" (1942–1943).']),
    Q('Bác viết "Nhật kí trong tù" bằng?', ['Chữ Hán', 'Tiếng Việt', 'Chữ Pháp', 'Chữ Nôm'], 0, 'Bằng chữ Hán.', [
      'Tập <b>"Nhật kí trong tù"</b> được Bác viết bằng <i>chữ Hán</i>.',
      'Bản tiếng Việt mà chúng ta học là <code>bản dịch</code> (nhiều bài do Nam Trân dịch).',
      '<ul><li>Việc viết bằng chữ Hán mang đậm màu sắc <b>thơ cổ điển phương Đông</b>.</li><li>Không viết bằng chữ Nôm, chữ Pháp hay tiếng Việt.</li></ul>',
    ], ['Đúng — Bác viết "Nhật kí trong tù" bằng chữ Hán.', 'Sai — nguyên tác không phải tiếng Việt; bản ta đọc là bản dịch.', 'Sai — không viết bằng chữ Pháp.', 'Sai — không viết bằng chữ Nôm.']),
    Q('Hoàn cảnh sáng tác?', ['Khi đi nước ngoài', 'Khi học ở Pháp', 'Hoà bình', 'Khi Bác bị Tưởng Giới Thạch giam tại nhà tù Trung Quốc'], 3, '1942–1943, bị giam tại Quảng Tây, Trung Quốc.', [
      'Bài thơ "Ngắm trăng" ra đời trong <b>hoàn cảnh tù ngục</b>: khi Bác bị chính quyền Tưởng Giới Thạch <i>giam giữ tại các nhà lao ở Quảng Tây, Trung Quốc</i> (1942–1943).',
      'Trong cảnh tù đày <code>"không rượu cũng không hoa"</code>, Bác vẫn say sưa ngắm trăng — thể hiện tâm hồn nghệ sĩ.',
      '<ul><li>Hoàn cảnh khắc nghiệt làm nổi bật phong thái ung dung.</li><li>Không phải thời hoà bình hay khi đi học ở Pháp.</li></ul>',
    ], ['Sai — không phải trong chuyến đi nước ngoài bình thường.', 'Sai — không phải khi học ở Pháp.', 'Sai — không phải thời hoà bình mà trong cảnh tù đày.', 'Đúng — sáng tác khi Bác bị Tưởng Giới Thạch giam tại nhà tù ở Quảng Tây, Trung Quốc (1942–1943).']),
    Q('Bài thơ thể hiện tâm hồn nào của Bác?', ['Mệt mỏi', 'Lãnh đạm', 'Yêu thiên nhiên, ung dung, vượt lên hoàn cảnh', 'Bi quan'], 2, 'Tâm hồn yêu thiên nhiên, phong thái thi sĩ – chiến sĩ.', [
      'Bài thơ thể hiện một tâm hồn <b>yêu thiên nhiên</b>, phong thái <i>ung dung, vượt lên hoàn cảnh</i> tù ngục của Bác.',
      'Dù thân bị giam cầm, tâm hồn Bác vẫn tự do giao hòa cùng vầng trăng: <code>"Người ngắm trăng soi ngoài cửa sổ / Trăng nhòm khe cửa ngắm nhà thơ"</code>.',
      '<ul><li>Đây là sự kết hợp giữa <b>chất thi sĩ và chất chiến sĩ</b>.</li><li>Tinh thần "thép" ẩn sau vẻ ung dung, lãng mạn.</li></ul>',
    ], ['Sai — bài thơ thể hiện sự ung dung, không phải mệt mỏi.', 'Sai — Bác say đắm trước trăng, không lãnh đạm.', 'Đúng — tâm hồn yêu thiên nhiên, ung dung, vượt lên hoàn cảnh tù ngục.', 'Sai — bài thơ lạc quan, không bi quan.']),
    Q('Hình ảnh trăng – người trong bài có quan hệ?', ['Đối lập', 'Không liên quan', 'Tri kỉ, bạn bè', 'Chủ — khách (trăng làm khách)'], 2, 'Trăng và người như đôi bạn tri kỉ.', [
      'Trong bài thơ, quan hệ giữa <b>trăng và người</b> là quan hệ <i>tri kỉ, bạn bè</i>, giao hòa bình đẳng.',
      'Phép nhân hóa và đối xứng cho thấy hai bên cùng chủ động hướng về nhau: <code>người ngắm trăng – trăng ngắm nhà thơ</code>.',
      '<ul><li>Song sắt nhà tù ngăn cách nhưng không thể chia lìa tâm hồn tự do với thiên nhiên.</li><li>Đây là cuộc "vượt ngục tinh thần" bằng tình yêu trăng.</li></ul>',
    ], ['Sai — trăng và người hoà hợp, không đối lập.', 'Sai — trăng và người gắn bó mật thiết.', 'Đúng — trăng và người như đôi bạn tri kỉ, giao hoà.', 'Sai — quan hệ là tri kỉ bình đẳng, không phải chủ – khách.']),
    Q('Thể thơ của bài?', ['Thất ngôn bát cú Đường luật', 'Lục bát', 'Thất ngôn tứ tuyệt', 'Song thất lục bát'], 2, 'Thất ngôn tứ tuyệt.', [
      'Nguyên tác "Ngắm trăng" viết theo thể <b>thất ngôn tứ tuyệt</b> Đường luật: bốn câu, mỗi câu bảy tiếng.',
      'Thể thơ cô đọng, hàm súc — đặc trưng của thơ cổ điển phương Đông.',
      '<ul><li>Khác thất ngôn bát cú (tám câu).</li><li>Không phải lục bát hay song thất lục bát.</li></ul>',
    ], ['Sai — bài chỉ bốn câu nên không phải thất ngôn bát cú.', 'Sai — không phải thể lục bát.', 'Đúng — bài thơ viết theo thể thất ngôn tứ tuyệt.', 'Sai — không phải song thất lục bát.']),
  ]),

  M(24, 'Đi đường — Hồ Chí Minh', [
    Q('Bài "Đi đường" (Tẩu lộ) thuộc tập?', ['Đường kách mệnh', 'Sông núi', 'Nhật kí trong tù', 'Truyện và kí'], 2, 'Cùng tập với "Ngắm trăng".', [
      'Bài <b>"Đi đường"</b> (nguyên tác chữ Hán: <i>Tẩu lộ</i>) cũng nằm trong tập <b>"Nhật kí trong tù"</b>, cùng tập với "Ngắm trăng".',
      'Bài thơ được khơi nguồn từ những lần Bác bị <code>giải đi từ nhà lao này sang nhà lao khác</code>, phải trèo đèo lội suối.',
      '<ul><li>"Đường kách mệnh" là tác phẩm chính luận.</li><li>"Truyện và kí" là mảng văn xuôi của Bác.</li></ul>',
    ], ['Sai — "Đường kách mệnh" là tác phẩm chính luận, không phải tập thơ này.', 'Sai — không phải tập "Sông núi".', 'Đúng — "Đi đường" thuộc tập "Nhật kí trong tù", cùng tập với "Ngắm trăng".', 'Sai — "Truyện và kí" là mảng văn xuôi.']),
    Q('Hình ảnh "đường" trong bài có nghĩa?', ['Đường đi thực và đường đời/đường cách mạng', 'Chỉ đường vật lí', 'Đường thủy', 'Đường biển'], 0, 'Nghĩa kép: đường đi và đường đời.', [
      'Hình ảnh <b>"con đường"</b> trong bài mang <i>nghĩa kép</i>, đó là nét đặc sắc của bài thơ.',
      '<ul><li><b>Nghĩa thực</b>: con đường núi gian nan mà người tù phải vượt qua.</li><li><b>Nghĩa biểu tượng</b>: <code>đường đời, đường cách mạng</code> nhiều chông gai, thử thách.</li></ul>',
      'Từ chuyện đi đường, bài thơ nâng lên thành một bài học, một triết lí sống sâu sắc.',
    ], ['Đúng — "đường" mang nghĩa kép: đường đi thực và đường đời/đường cách mạng.', 'Sai — hiểu sót nghĩa biểu tượng; không chỉ là đường vật lí.', 'Sai — không phải đường thuỷ.', 'Sai — không phải đường biển.']),
    Q('"Lên đến tận cùng…thu vào tầm mắt muôn trùng…" thể hiện?', ['Niềm vui chiến thắng và tầm nhìn người chiến sĩ', 'Khó khăn của hành trình', 'Sự mệt mỏi', 'Lời than'], 0, 'Vượt khó để đạt thành quả lớn lao.', [
      'Hai câu thơ cuối thể hiện <b>niềm vui chiến thắng</b> và <i>tầm nhìn rộng lớn</i> của người chiến sĩ sau khi vượt qua gian khó.',
      'Khi lên tới đỉnh cao nhất, <code>"muôn trùng nước non" thu cả vào tầm mắt</code> — phần thưởng cho người kiên trì vượt núi.',
      '<ul><li>Hình ảnh con người ở tư thế làm chủ, hân hoan trước thành quả.</li><li>Không phải lời than hay nhấn vào sự mệt mỏi.</li></ul>',
    ], ['Đúng — thể hiện niềm vui chiến thắng và tầm nhìn rộng lớn của người chiến sĩ.', 'Sai — câu này nói thành quả sau khi vượt khó, không phải nhấn vào khó khăn.', 'Sai — không thể hiện sự mệt mỏi.', 'Sai — không phải lời than mà là niềm hân hoan.']),
    Q('Triết lí bài thơ?', ['Đừng cố gắng', 'Hãy nghỉ ngơi', 'Càng gian nan càng thành công, đường đời nhiều thử thách nhưng vượt qua sẽ tới đích', 'Cuộc đời dễ dàng'], 2, 'Lời triết lí về kiên trì.', [
      'Bài thơ gửi gắm một <b>triết lí</b> sâu sắc: <i>càng gian nan, càng thử thách thì thành công, vinh quang càng lớn</i>.',
      'Đường đời, đường cách mạng nhiều chông gai, nhưng nếu <code>kiên trì vượt qua</code> thì nhất định sẽ tới đích, đạt thành quả.',
      '<ul><li>Từ chuyện đi đường núi, Bác khái quát thành bài học về ý chí, nghị lực.</li><li>Không phải khuyên buông xuôi hay nghỉ ngơi.</li></ul>',
    ], ['Sai — bài thơ khuyên nỗ lực, không phải buông xuôi.', 'Sai — thông điệp là kiên trì vượt khó, không phải nghỉ ngơi.', 'Đúng — càng gian nan càng thành công, vượt qua thử thách sẽ tới đích.', 'Sai — bài thơ nhấn mạnh gian nan, không nói cuộc đời dễ dàng.']),
    Q('Thể thơ?', ['Ngũ ngôn', 'Thất ngôn bát cú Đường luật', 'Tứ tuyệt thất ngôn', 'Lục bát'], 2, 'Tứ tuyệt Đường luật.', [
      'Nguyên tác "Đi đường" viết theo thể <b>thất ngôn tứ tuyệt</b> Đường luật: bốn câu, mỗi câu bảy tiếng.',
      'Bố cục theo cấu trúc <code>khai – thừa – chuyển – hợp</code> của thơ tứ tuyệt, dẫn dắt từ việc đi đường tới triết lí.',
      '<ul><li>Bản dịch của Nam Trân chuyển sang thể lục bát.</li><li>Không phải ngũ ngôn hay thất ngôn bát cú.</li></ul>',
    ], ['Sai — không phải thơ ngũ ngôn.', 'Sai — bài chỉ bốn câu nên không phải thất ngôn bát cú.', 'Đúng — bài thơ viết theo thể tứ tuyệt thất ngôn (Đường luật).', 'Sai — không phải thể lục bát.']),
    Q('Bản dịch quen thuộc của bài là của?', ['Nam Trân', 'Tố Hữu', 'Xuân Diệu', 'Huy Cận'], 0, 'Dịch giả Nam Trân.', [
      'Bản dịch thơ quen thuộc của bài "Đi đường" (cũng như nhiều bài trong "Nhật kí trong tù") là của dịch giả <b>Nam Trân</b>.',
      'Nam Trân đã chuyển nhiều bài thơ chữ Hán của Bác sang tiếng Việt với thể <code>lục bát</code> uyển chuyển.',
      '<ul><li>Tố Hữu, Xuân Diệu, Huy Cận là các nhà thơ, không phải dịch giả bài này.</li><li>Bản dịch giúp bài thơ đến gần độc giả Việt.</li></ul>',
    ], ['Đúng — bản dịch quen thuộc là của dịch giả Nam Trân.', 'Sai — Tố Hữu không phải dịch giả bài này.', 'Sai — không phải Xuân Diệu.', 'Sai — không phải Huy Cận.']),
  ]),

  M(25, 'Chiếu dời đô — Lí Công Uẩn', [
    Q('Tác giả "Chiếu dời đô" là?', ['Lí Thường Kiệt', 'Trần Quốc Tuấn', 'Lí Công Uẩn (Lý Thái Tổ)', 'Nguyễn Trãi'], 2, 'Lý Thái Tổ ban chiếu dời đô năm 1010.', [
      '<b>"Chiếu dời đô"</b> (Thiên đô chiếu) do <b>Lí Công Uẩn</b> — tức Lý Thái Tổ, vị vua khai sáng triều Lý — ban năm <i>1010</i>.',
      'Bài chiếu thể hiện tầm nhìn chiến lược của một vị minh quân về việc dời kinh đô từ Hoa Lư về Đại La.',
      '<ul><li>Lí Thường Kiệt → "Nam quốc sơn hà".</li><li>Trần Quốc Tuấn → "Hịch tướng sĩ"; Nguyễn Trãi → "Bình Ngô đại cáo".</li></ul>',
    ], ['Sai — Lí Thường Kiệt gắn với "Nam quốc sơn hà", không phải chiếu này.', 'Sai — Trần Quốc Tuấn viết "Hịch tướng sĩ".', 'Đúng — Lí Công Uẩn (Lý Thái Tổ) ban "Chiếu dời đô" năm 1010.', 'Sai — Nguyễn Trãi viết "Bình Ngô đại cáo".']),
    Q('Nội dung chính của chiếu?', ['Phê bình triều thần', 'Tuyên bố dời đô từ Hoa Lư về Đại La', 'Ca ngợi quân Tống', 'Khen Hoa Lư'], 1, 'Quyết định dời đô từ Hoa Lư về Đại La (Thăng Long).', [
      '<b>Nội dung chính</b> của bài chiếu là tuyên bố và thuyết phục về việc <i>dời kinh đô từ Hoa Lư (Ninh Bình) về Đại La</i> (sau đổi tên là Thăng Long).',
      'Lập luận của vua: dẫn việc dời đô của các triều đại Trung Hoa, phê phán việc đóng đô ở Hoa Lư chật hẹp, rồi khẳng định ưu thế của Đại La.',
      '<ul><li>Đây là một quyết định trọng đại, mở ra thời kì phát triển mới cho đất nước.</li><li>Bài chiếu không nhằm phê bình triều thần hay ca ngợi quân Tống.</li></ul>',
    ], ['Sai — chiếu không nhằm phê bình triều thần.', 'Đúng — chiếu tuyên bố dời đô từ Hoa Lư về Đại La (Thăng Long).', 'Sai — không ca ngợi quân Tống.', 'Sai — chiếu chỉ ra Hoa Lư chật hẹp, không phải khen Hoa Lư.']),
    Q('Đại La được mô tả là vùng đất?', ['Hẹp, hiểm trở', 'Núi cao', 'Hoang vu', 'Trung tâm, rộng rãi, địa thế đẹp, dân thịnh'], 3, 'Vùng đất "trung tâm trời đất", có thế rồng cuộn hổ ngồi.', [
      '<b>Đại La</b> được Lí Công Uẩn ca ngợi là nơi hội tụ mọi điều kiện lí tưởng để làm kinh đô.',
      'Đặc điểm: <ul><li><b>Vị trí</b>: "trung tâm trời đất", thế <code>"rồng cuộn hổ ngồi"</code>.</li><li><b>Địa thế</b>: rộng rãi, bằng phẳng, cao thoáng.</li><li><b>Đời sống</b>: muôn vật phong phú, dân cư đông đúc, thịnh vượng.</li></ul>',
      'Trái lại, Hoa Lư là vùng đất chật hẹp, hiểm trở — không còn phù hợp.',
    ], ['Sai — hẹp, hiểm trở là đặc điểm của Hoa Lư, không phải Đại La.', 'Sai — không phải vùng núi cao.', 'Sai — Đại La được tả là nơi dân cư thịnh vượng, không hoang vu.', 'Đúng — Đại La là vùng trung tâm, rộng rãi, địa thế đẹp, dân thịnh.']),
    Q('Thể văn?', ['Hịch — văn hiệu triệu tướng sĩ', 'Truyện', 'Cáo — văn tổng kết chiến thắng', 'Chiếu — văn nghị luận trung đại'], 3, 'Chiếu — văn bản nhà vua ban bố.', [
      '<b>Chiếu</b> là một thể văn nghị luận trung đại, do <i>vua dùng để ban bố mệnh lệnh</i> cho thần dân.',
      'Chiếu thường được viết bằng văn xuôi, văn vần hoặc văn biền ngẫu, có tính chất <code>trang trọng, thuyết phục</code>.',
      '<ul><li>Phân biệt với các thể nghị luận trung đại khác:</li><li><b>Hịch</b> (hiệu triệu tướng sĩ), <b>cáo</b> (tổng kết, tuyên bố), <b>tấu</b> (bề tôi dâng vua).</li></ul>',
    ], ['Sai — hịch dùng để hiệu triệu tướng sĩ, khác chiếu.', 'Sai — đây không phải truyện.', 'Sai — cáo dùng tổng kết, tuyên bố chiến thắng, khác chiếu.', 'Đúng — đây là thể chiếu, văn bản nhà vua ban bố mệnh lệnh.']),
    Q('Lí lẽ của tác giả dựa trên?', ['Sự kiện lịch sử và lợi ích lâu dài cho quốc gia', 'Truyền thuyết', 'Cảm xúc', 'Tâm linh'], 0, 'Dẫn nhà Thương – Chu dời đô và phân tích lợi ích.', [
      'Lập luận của bài chiếu rất <b>chặt chẽ, thuyết phục</b>, dựa trên <i>sử sách và lợi ích lâu dài cho quốc gia</i>.',
      'Tác giả dẫn việc dời đô của các vua nhà <code>Thương, Chu (Trung Hoa)</code> như tiền lệ; rồi phân tích cụ thể lợi thế của Đại La.',
      '<ul><li>Kết hợp giữa <b>lí lẽ</b> (dẫn sử) và <b>tình cảm</b> (hỏi ý kiến quần thần).</li><li>Không dựa vào truyền thuyết hay tâm linh đơn thuần.</li></ul>',
    ], ['Đúng — dựa trên sự kiện lịch sử (nhà Thương, Chu dời đô) và lợi ích lâu dài cho quốc gia.', 'Sai — không dựa vào truyền thuyết.', 'Sai — lập luận dựa vào lí lẽ, không chỉ cảm xúc.', 'Sai — không dựa vào yếu tố tâm linh.']),
    Q('Văn bản thể hiện?', ['Sự nóng nảy', 'Sự do dự, thiếu quyết đoán', 'Tham vọng cá nhân', 'Tầm nhìn xa, lòng yêu nước, vì dân vì nước'], 3, 'Tầm vóc một nhà lãnh đạo lớn.', [
      'Qua bài chiếu, ta thấy được <b>tầm nhìn xa trông rộng</b> và <i>lòng yêu nước, ý chí vì dân vì nước</i> của Lí Công Uẩn.',
      'Việc dời đô về Đại La là vì <code>sự nghiệp lâu dài, thịnh vượng của muôn dân và quốc gia</code>, chứ không vì lợi ích cá nhân.',
      '<ul><li>Bài chiếu thể hiện tầm vóc của một nhà lãnh đạo lớn.</li><li>Giọng văn vừa cương quyết, vừa thấu tình đạt lí.</li></ul>',
    ], ['Sai — văn bản điềm tĩnh, lập luận chặt chẽ, không nóng nảy.', 'Sai — nhà vua quyết đoán, không do dự.', 'Sai — mục đích vì dân vì nước, không phải tham vọng cá nhân.', 'Đúng — thể hiện tầm nhìn xa, lòng yêu nước, vì dân vì nước.']),
  ]),

  M(26, 'Hịch tướng sĩ — Trần Quốc Tuấn', [
    Q('Tác giả "Hịch tướng sĩ" là?', ['Nguyễn Trãi', 'Trần Quốc Tuấn', 'Lí Thường Kiệt', 'Lê Lợi'], 1, 'Hưng Đạo Vương Trần Quốc Tuấn.', [
      '<b>"Hịch tướng sĩ"</b> do <b>Trần Quốc Tuấn</b> — tức Hưng Đạo Vương, vị anh hùng dân tộc kiệt xuất — viết.',
      'Ông là tổng chỉ huy quân đội nhà Trần trong các cuộc kháng chiến chống quân Mông – Nguyên.',
      '<ul><li>Nguyễn Trãi → "Bình Ngô đại cáo".</li><li>Lí Thường Kiệt → "Nam quốc sơn hà"; Lê Lợi → chủ tướng khởi nghĩa Lam Sơn.</li></ul>',
    ], ['Sai — Nguyễn Trãi viết "Bình Ngô đại cáo".', 'Đúng — "Hịch tướng sĩ" của Hưng Đạo Vương Trần Quốc Tuấn.', 'Sai — Lí Thường Kiệt gắn với "Nam quốc sơn hà".', 'Sai — Lê Lợi là chủ tướng khởi nghĩa Lam Sơn, không viết hịch này.']),
    Q('Hịch được viết trong hoàn cảnh nào?', ['Khi xảy ra nội loạn', 'Khi đất nước thanh bình', 'Sau khi thắng trận', 'Trước cuộc kháng chiến chống Mông – Nguyên lần II (1285)'], 3, 'Khích lệ tướng sĩ trước cuộc kháng chiến chống Mông – Nguyên.', [
      'Bài hịch được viết vào khoảng <b>trước cuộc kháng chiến chống quân Mông – Nguyên lần thứ hai (1285)</b>.',
      'Lúc này giặc đang lăm le xâm lược, Trần Quốc Tuấn viết hịch để <i>khích lệ tinh thần</i>, kêu gọi tướng sĩ ra sức học tập binh thư, rèn luyện.',
      '<ul><li>Hoàn cảnh nước sôi lửa bỏng giải thích cho giọng văn đầy nhiệt huyết.</li><li>Không phải lúc thanh bình hay sau khi thắng trận.</li></ul>',
    ], ['Sai — không phải hoàn cảnh nội loạn.', 'Sai — viết khi giặc đe doạ, không phải lúc thanh bình.', 'Sai — viết trước trận đánh để khích lệ, không phải sau khi thắng.', 'Đúng — viết trước cuộc kháng chiến chống Mông – Nguyên lần II (1285).']),
    Q('Mục đích của hịch?', ['Báo cáo công lao', 'Thuyết phục, khích lệ tướng sĩ học binh thư, chuẩn bị chiến đấu', 'Thông báo nội bộ', 'Kể chuyện'], 1, 'Khơi gợi lòng yêu nước, căm thù giặc, sẵn sàng chiến đấu.', [
      '<b>Mục đích</b> của bài hịch là <i>thuyết phục, khích lệ</i> tướng sĩ học tập "Binh thư yếu lược", rèn luyện để sẵn sàng chiến đấu chống giặc.',
      'Tác giả khơi gợi <code>lòng yêu nước, lòng căm thù giặc</code> và ý thức trách nhiệm của mỗi tướng sĩ.',
      '<ul><li>Hịch là thể văn dùng để <b>hiệu triệu, kêu gọi</b>.</li><li>Không phải để báo cáo công lao hay thông báo nội bộ.</li></ul>',
    ], ['Sai — hịch không nhằm báo cáo công lao.', 'Đúng — thuyết phục, khích lệ tướng sĩ học binh thư, sẵn sàng chiến đấu.', 'Sai — hịch là lời hiệu triệu, không chỉ thông báo nội bộ.', 'Sai — hịch không phải để kể chuyện.']),
    Q('Tác giả bộc lộ tâm trạng?', ['Hờ hững', 'Bình thản', 'Lo lắng, đau xót khi nước nguy nan', 'Vui mừng'], 2, '"Ta thường tới bữa quên ăn, nửa đêm vỗ gối…"', [
      'Trong bài hịch, Trần Quốc Tuấn bộc lộ tâm trạng <b>lo lắng, đau xót</b> tột cùng khi vận nước lâm nguy.',
      'Nỗi lòng được thể hiện bằng những lời gan ruột: <code>"Ta thường tới bữa quên ăn, nửa đêm vỗ gối; ruột đau như cắt, nước mắt đầm đìa..."</code>',
      '<ul><li>Tấm lòng yêu nước, căm thù giặc sâu sắc của vị chủ tướng.</li><li>Tâm trạng ấy có sức lay động, cảm hóa tướng sĩ mạnh mẽ.</li></ul>',
    ], ['Sai — tác giả đau đáu việc nước, không hờ hững.', 'Sai — tác giả trăn trở mãnh liệt, không bình thản.', 'Đúng — lo lắng, đau xót khi nước nguy nan ("tới bữa quên ăn, nửa đêm vỗ gối").', 'Sai — bối cảnh nguy nan nên không thể vui mừng.']),
    Q('Thể loại?', ['Cáo — văn tổng kết, tuyên bố', 'Hịch — văn nghị luận trung đại', 'Chiếu — vua ban bố mệnh lệnh', 'Tấu — bề tôi dâng vua'], 1, 'Hịch — văn bản hiệu triệu.', [
      '<b>Hịch</b> là thể văn nghị luận trung đại, thường do <i>vua chúa, tướng lĩnh viết để cổ động, thuyết phục, kêu gọi</i> đấu tranh.',
      'Hịch có kết cấu chặt chẽ, lí lẽ sắc bén, dẫn chứng thuyết phục và giọng văn <code>hùng hồn, đanh thép</code>.',
      '<ul><li>Phân biệt: <b>cáo</b> (tổng kết, tuyên bố), <b>chiếu</b> (vua ban bố mệnh lệnh), <b>tấu</b> (bề tôi dâng vua).</li></ul>',
    ], ['Sai — cáo dùng tổng kết, tuyên bố, khác hịch.', 'Đúng — đây là thể hịch, văn nghị luận trung đại để hiệu triệu.', 'Sai — chiếu là văn vua ban bố mệnh lệnh.', 'Sai — tấu là văn bề tôi dâng vua.']),
    Q('Giọng văn nổi bật?', ['Lạnh nhạt', 'Hùng hồn, đanh thép, đầy nhiệt huyết', 'Châm biếm hài hước', 'Êm dịu, trữ tình'], 1, 'Giọng hùng hồn, kết hợp lý và tình.', [
      '<b>Giọng văn</b> nổi bật của "Hịch tướng sĩ" là <i>hùng hồn, đanh thép, đầy nhiệt huyết</i>.',
      'Tác giả kết hợp khéo léo giữa <code>lí và tình</code>: vừa phân tích thiệt hơn sắc bén, vừa khơi gợi tình cảm, lòng tự trọng.',
      '<ul><li>Cách dùng câu văn biền ngẫu, điệp ngữ tăng sức truyền cảm.</li><li>Không phải giọng lạnh nhạt, châm biếm hay êm dịu trữ tình.</li></ul>',
    ], ['Sai — giọng văn nhiệt huyết, không lạnh nhạt.', 'Đúng — giọng hùng hồn, đanh thép, đầy nhiệt huyết, kết hợp lý và tình.', 'Sai — không phải giọng châm biếm hài hước.', 'Sai — giọng mạnh mẽ, không êm dịu trữ tình.']),
  ]),

  M(27, 'Câu nghi vấn — Câu cầu khiến', [
    Q('Câu nghi vấn dùng để?', ['Tả cảnh', 'Khẳng định', 'Ra lệnh', 'Hỏi (và một số chức năng khác như cầu khiến, cảm thán…)'], 3, 'Chức năng chính là hỏi, ngoài ra có nhiều chức năng khác.', [
      '<b>Câu nghi vấn</b> có chức năng <i>chính là dùng để hỏi</i>.',
      'Đặc điểm hình thức: có <code>từ nghi vấn</code> (ai, gì, nào, sao, đâu, à, ư, hả, chứ...) và kết thúc bằng dấu chấm hỏi.',
      '<ul><li>Ngoài chức năng hỏi, câu nghi vấn còn có thể dùng để <b>cầu khiến, khẳng định, phủ định, đe dọa, bộc lộ cảm xúc</b>.</li><li>Ví dụ: "Sao con chưa học bài?" có thể là lời nhắc nhở.</li></ul>',
    ], ['Sai — tả cảnh là chức năng của miêu tả, không phải câu nghi vấn.', 'Sai — khẳng định là chức năng của câu trần thuật.', 'Sai — ra lệnh là chức năng của câu cầu khiến.', 'Đúng — câu nghi vấn dùng để hỏi và một số chức năng khác như cầu khiến, cảm thán.']),
    Q('Dấu kết câu nghi vấn thường dùng?', [',', '.', '?', 'Dấu chấm than'], 2, 'Dấu chấm hỏi.', [
      '<b>Câu nghi vấn</b> khi viết thường kết thúc bằng <i>dấu chấm hỏi</i> ( ? ).',
      'Ví dụ: <code>"Bạn đã làm bài tập chưa?"</code>',
      '<ul><li>Dấu chấm ( . ) kết câu trần thuật.</li><li>Dấu chấm than ( ! ) kết câu cảm thán, cầu khiến.</li><li>Dấu phẩy ( , ) không dùng để kết thúc câu.</li></ul>',
    ], ['Sai — dấu phẩy không kết thúc câu.', 'Sai — dấu chấm kết câu trần thuật.', 'Đúng — câu nghi vấn thường kết bằng dấu chấm hỏi (?).', 'Sai — dấu chấm than kết câu cảm thán/cầu khiến.']),
    Q('"Anh đi đâu đấy?" thuộc kiểu câu?', ['Trần thuật', 'Cảm thán', 'Nghi vấn', 'Cầu khiến'], 2, 'Có từ nghi vấn "đâu" và dấu "?".', [
      'Phân tích câu "Anh đi <b>đâu</b> đấy<b>?</b>" để xác định kiểu câu.',
      'Câu có <i>từ nghi vấn "đâu"</i> và kết thúc bằng <i>dấu chấm hỏi</i> → là <b>câu nghi vấn</b> (dùng để hỏi).',
      '<ul><li>Hai dấu hiệu nhận biết câu nghi vấn: từ nghi vấn + dấu hỏi.</li><li>Không phải câu trần thuật, cảm thán hay cầu khiến.</li></ul>',
    ], ['Sai — câu này hỏi chứ không trần thuật.', 'Sai — không bộc lộ cảm xúc nên không phải cảm thán.', 'Đúng — có từ nghi vấn "đâu" và dấu "?" nên là câu nghi vấn.', 'Sai — câu này không ra lệnh, yêu cầu.']),
    Q('Câu cầu khiến dùng để?', ['Hỏi để lấy thông tin', 'Bộc lộ cảm xúc', 'Ra lệnh, yêu cầu, đề nghị, khuyên bảo', 'Khen ngợi, tán thưởng'], 2, 'Mục đích: bảo người khác làm/không làm gì.', [
      '<b>Câu cầu khiến</b> dùng để <i>ra lệnh, yêu cầu, đề nghị, khuyên bảo</i> — bảo người khác làm hoặc không làm một việc gì đó.',
      'Đặc điểm hình thức: có <code>từ cầu khiến</code> (hãy, đừng, chớ, đi, thôi, nào...) hoặc ngữ điệu cầu khiến.',
      '<ul><li>Thường kết thúc bằng dấu chấm than hoặc dấu chấm.</li><li>Ví dụ: "Hãy giữ trật tự!", "Đừng làm ồn."</li></ul>',
    ], ['Sai — hỏi để lấy thông tin là chức năng câu nghi vấn.', 'Sai — bộc lộ cảm xúc là chức năng câu cảm thán.', 'Đúng — câu cầu khiến dùng để ra lệnh, yêu cầu, đề nghị, khuyên bảo.', 'Sai — khen ngợi thường thuộc câu cảm thán/trần thuật.']),
    Q('Trong "Đừng nói chuyện trong giờ học!" — đây là?', ['Nghi vấn', 'Cầu khiến', 'Cảm thán', 'Trần thuật'], 1, 'Cầu khiến (cấm đoán).', [
      'Phân tích câu "<b>Đừng</b> nói chuyện trong giờ học<b>!</b>" để xác định kiểu câu.',
      'Câu có <i>từ cầu khiến "đừng"</i> mang ý <code>cấm đoán</code> và kết thúc bằng dấu chấm than → là <b>câu cầu khiến</b>.',
      '<ul><li>"Đừng, chớ" thường dùng để cấm đoán, ngăn cản.</li><li>Không phải câu hỏi, cảm thán hay trần thuật.</li></ul>',
    ], ['Sai — câu này không hỏi.', 'Đúng — có từ "đừng" để cấm đoán nên là câu cầu khiến.', 'Sai — không bộc lộ cảm xúc nên không phải cảm thán.', 'Sai — câu này ra lệnh, không phải trần thuật.']),
    Q('Câu cầu khiến thường có từ?', ['à, ư, hả', 'và, hoặc', 'hãy, đừng, chớ, nào, đi', 'ôi, chao'], 2, 'Các từ cầu khiến điển hình.', [
      '<b>Câu cầu khiến</b> thường chứa các <i>từ cầu khiến điển hình</i>: <code>hãy, đừng, chớ, nào, đi, thôi...</code>',
      'Ví dụ: <i>"Hãy cố gắng lên!"</i>, <i>"Đừng buồn nữa!"</i>, <i>"Đi học đi!"</i>',
      '<ul><li>"à, ư, hả" → từ nghi vấn.</li><li>"và, hoặc" → quan hệ từ.</li><li>"ôi, chao" → thán từ bộc lộ cảm xúc.</li></ul>',
    ], ['Sai — "à, ư, hả" là từ nghi vấn.', 'Sai — "và, hoặc" là quan hệ từ.', 'Đúng — "hãy, đừng, chớ, nào, đi" là các từ cầu khiến điển hình.', 'Sai — "ôi, chao" là thán từ bộc lộ cảm xúc.']),
  ]),

  M(28, 'Câu cảm thán — Câu trần thuật', [
    Q('Câu cảm thán dùng để?', ['Liệt kê', 'Hỏi để lấy thông tin', 'Bộc lộ cảm xúc trực tiếp', 'Tả cảnh'], 2, 'Bộc lộ cảm xúc, tình cảm.', [
      '<b>Câu cảm thán</b> dùng để <i>bộc lộ trực tiếp cảm xúc</i> của người nói, người viết (vui, buồn, ngạc nhiên, đau xót...).',
      'Đặc điểm hình thức: có <code>từ cảm thán</code> (ôi, than ôi, hỡi ơi, chao ôi, thay, biết bao...) và thường kết thúc bằng dấu chấm than.',
      '<ul><li>Ví dụ: "Ôi, đẹp quá!", "Thương thay thân phận con người!"</li><li>Khác câu nghi vấn (hỏi) hay miêu tả (tả cảnh).</li></ul>',
    ], ['Sai — liệt kê không phải chức năng câu cảm thán.', 'Sai — hỏi để lấy thông tin là chức năng câu nghi vấn.', 'Đúng — câu cảm thán dùng để bộc lộ cảm xúc trực tiếp.', 'Sai — tả cảnh là chức năng của miêu tả.']),
    Q('Câu cảm thán thường kết bằng dấu?', ['!', '.', 'Dấu chấm hỏi', ','], 0, 'Dấu chấm than.', [
      '<b>Câu cảm thán</b> khi viết thường kết thúc bằng <i>dấu chấm than</i> ( ! ).',
      'Ví dụ: <code>"Trời ơi, đẹp quá!"</code>',
      '<ul><li>Dấu chấm ( . ) kết câu trần thuật.</li><li>Dấu chấm hỏi ( ? ) kết câu nghi vấn.</li><li>Dấu phẩy không kết thúc câu.</li></ul>',
    ], ['Đúng — câu cảm thán thường kết bằng dấu chấm than (!).', 'Sai — dấu chấm kết câu trần thuật.', 'Sai — dấu chấm hỏi kết câu nghi vấn.', 'Sai — dấu phẩy không kết thúc câu.']),
    Q('"Ôi, đẹp quá!" là câu?', ['Nghi vấn', 'Cầu khiến', 'Trần thuật', 'Cảm thán'], 3, 'Có thán từ "Ôi" và dấu "!".', [
      'Phân tích câu "<b>Ôi</b>, đẹp quá<b>!</b>" để xác định kiểu câu.',
      'Câu có <i>từ cảm thán "Ôi"</i> và kết thúc bằng <i>dấu chấm than</i> → là <b>câu cảm thán</b> (bộc lộ cảm xúc).',
      '<ul><li>Hai dấu hiệu: từ cảm thán + dấu chấm than.</li><li>Không phải câu nghi vấn, cầu khiến hay trần thuật.</li></ul>',
    ], ['Sai — câu này không hỏi.', 'Sai — câu này không ra lệnh, yêu cầu.', 'Sai — câu bộc lộ cảm xúc, không phải trần thuật.', 'Đúng — có thán từ "Ôi" và dấu "!" nên là câu cảm thán.']),
    Q('Câu trần thuật dùng để?', ['Cầu khiến', 'Cảm thán', 'Đặt câu hỏi để lấy thông tin', 'Trần thuật, kể, thông báo, miêu tả… (không có chức năng nghi vấn, cầu khiến, cảm thán)'], 3, 'Mục đích chính: trần thuật, thông báo.', [
      '<b>Câu trần thuật</b> dùng để <i>kể, thông báo, nhận định, miêu tả</i>... — là kiểu câu phổ biến nhất trong giao tiếp.',
      'Câu trần thuật <code>không có đặc điểm hình thức</code> của câu nghi vấn, cầu khiến hay cảm thán.',
      '<ul><li>Thường kết thúc bằng dấu chấm (đôi khi dấu chấm than hoặc dấu ba chấm).</li><li>Ví dụ: "Hôm nay trời nắng đẹp."</li></ul>',
    ], ['Sai — cầu khiến là chức năng câu cầu khiến.', 'Sai — cảm thán là chức năng câu cảm thán.', 'Sai — đặt câu hỏi là chức năng câu nghi vấn.', 'Đúng — câu trần thuật dùng để kể, thông báo, miêu tả, không có chức năng nghi vấn/cầu khiến/cảm thán.']),
    Q('Câu trần thuật kết bằng dấu?', ['Dấu hai chấm', 'Dấu chấm (đôi khi chấm than/ba chấm)', 'Dấu ngoặc kép', 'Dấu hỏi'], 1, 'Thường dùng dấu chấm.', [
      '<b>Câu trần thuật</b> khi viết thường kết thúc bằng <i>dấu chấm</i> ( . ).',
      'Đôi khi, để diễn tả sắc thái đặc biệt, câu trần thuật có thể kết bằng <code>dấu chấm than</code> hoặc <code>dấu ba chấm</code>.',
      '<ul><li>Dấu hai chấm chỉ báo trước liệt kê/lời dẫn, không kết câu.</li><li>Dấu hỏi kết câu nghi vấn.</li></ul>',
    ], ['Sai — dấu hai chấm dùng báo trước liệt kê/lời dẫn, không kết câu trần thuật.', 'Đúng — câu trần thuật thường kết bằng dấu chấm (đôi khi chấm than/ba chấm).', 'Sai — dấu ngoặc kép không kết thúc câu.', 'Sai — dấu hỏi kết câu nghi vấn.']),
    Q('Trong các câu sau, đâu là câu trần thuật?', ['Trời mưa à?', 'Trời mưa rất to.', 'Ôi, mưa to quá!', 'Đừng đi mưa!'], 1, 'Câu kể sự việc, kết bằng dấu chấm.', [
      'So sánh các câu để tìm ra <b>câu trần thuật</b> — câu kể, thông báo sự việc, kết bằng dấu chấm.',
      '<code>"Trời mưa rất to."</code> chỉ đơn thuần kể về sự việc → là câu trần thuật.',
      '<ul><li>"Trời mưa à?" → câu nghi vấn (từ "à" + dấu hỏi).</li><li>"Ôi, mưa to quá!" → câu cảm thán.</li><li>"Đừng đi mưa!" → câu cầu khiến.</li></ul>',
    ], ['Sai — "Trời mưa à?" có từ nghi vấn "à" nên là câu nghi vấn.', 'Đúng — "Trời mưa rất to." kể sự việc, kết bằng dấu chấm nên là câu trần thuật.', 'Sai — "Ôi, mưa to quá!" là câu cảm thán.', 'Sai — "Đừng đi mưa!" là câu cầu khiến.']),
  ]),

  M(29, 'Câu phủ định', [
    Q('Câu phủ định là?', ['Câu khẳng định', 'Câu cảm thán', 'Câu chứa từ phủ định để phản bác hoặc xác nhận sự không có/không xảy ra', 'Câu hỏi'], 2, 'Định nghĩa SGK 8.', [
      '<b>Câu phủ định</b> là câu có chứa <i>từ ngữ phủ định</i> để: <ul><li>Thông báo, xác nhận sự <b>không có, không xảy ra</b> (phủ định miêu tả).</li><li><b>Phản bác</b> một ý kiến, nhận định (phủ định bác bỏ).</li></ul>',
      'Ví dụ: <code>"Trời không mưa."</code> (miêu tả), <code>"Không, nó không hề lười!"</code> (bác bỏ).',
      'Đây là kiểu câu đối lập với câu khẳng định.',
    ], ['Sai — câu khẳng định là kiểu đối lập với câu phủ định.', 'Sai — câu cảm thán phân loại theo mục đích nói khác.', 'Đúng — câu phủ định chứa từ phủ định để phản bác hoặc xác nhận sự không có/không xảy ra.', 'Sai — câu hỏi là câu nghi vấn, không phải định nghĩa này.']),
    Q('Từ phủ định điển hình?', ['à, ư, nhỉ', 'hãy, đừng', 'không, chưa, chẳng, đâu (có)', 'mà, kia'], 2, 'Các từ chuyên dùng phủ định.', [
      '<b>Từ ngữ phủ định</b> điển hình gồm: <code>không, chưa, chẳng, chả, không phải, chẳng phải, đâu (có)...</code>',
      'Ví dụ: "Nó <b>chưa</b> làm bài.", "Tôi <b>chẳng</b> biết.", "Đâu <b>có</b> chuyện đó!"',
      '<ul><li>"à, ư, nhỉ" → tình thái từ nghi vấn.</li><li>"hãy, đừng" → từ cầu khiến.</li><li>"mà, kia" → tình thái từ nhấn mạnh.</li></ul>',
    ], ['Sai — "à, ư, nhỉ" là tình thái từ nghi vấn.', 'Sai — "hãy, đừng" là từ cầu khiến (riêng "đừng" mang nét cấm đoán).', 'Đúng — "không, chưa, chẳng, đâu (có)" là các từ phủ định điển hình.', 'Sai — "mà, kia" là tình thái từ nhấn mạnh.']),
    Q('"Hôm nay tôi không đi học" thuộc kiểu?', ['Trần thuật phủ định', 'Nghi vấn', 'Trần thuật khẳng định', 'Cầu khiến'], 0, 'Câu phủ định miêu tả sự việc không xảy ra.', [
      'Phân tích câu "Hôm nay tôi <b>không</b> đi học".',
      'Câu chứa từ phủ định "không" để <i>miêu tả một sự việc không xảy ra</i> → là <b>câu phủ định miêu tả</b> (một dạng câu trần thuật).',
      '<ul><li>Đây là phủ định <b>miêu tả</b>, không phải phủ định bác bỏ.</li><li>Không phải câu nghi vấn hay cầu khiến.</li></ul>',
    ], ['Đúng — có từ "không" miêu tả sự việc không xảy ra nên là câu trần thuật phủ định.', 'Sai — câu này không hỏi.', 'Sai — có từ "không" nên là phủ định, không phải khẳng định.', 'Sai — câu này không ra lệnh, yêu cầu.']),
    Q('"Cậu nói thế đâu có đúng!" là phủ định?', ['Bác bỏ', 'Miêu tả', 'Cảm thán', 'Khẳng định'], 0, 'Phủ định bác bỏ ý người khác.', [
      'Phân tích câu "Cậu nói thế <b>đâu có</b> đúng!".',
      'Câu dùng để <i>phản bác lại ý kiến, nhận định</i> của người khác (cho rằng điều người kia nói là sai) → là <b>câu phủ định bác bỏ</b>.',
      '<ul><li>Phủ định bác bỏ thường xuất hiện trong đối thoại, để tranh luận.</li><li>Khác phủ định miêu tả (chỉ thông báo sự việc không xảy ra).</li></ul>',
    ], ['Đúng — câu phủ định bác bỏ ý kiến người khác.', 'Sai — không miêu tả sự việc mà phản bác ý kiến.', 'Sai — đây là phủ định bác bỏ, không phải câu cảm thán.', 'Sai — câu có từ phủ định nên không phải khẳng định.']),
    Q('Phủ định kép "không phải không…" thực chất biểu thị?', ['Khẳng định', 'Cảm thán', 'Nghi vấn', 'Phủ định mạnh'], 0, 'Hai lần phủ định = khẳng định.', [
      'Hiện tượng <b>phủ định kép</b>: trong một câu có <i>hai từ phủ định</i> đi với nhau.',
      'Hai lần phủ định <code>triệt tiêu lẫn nhau</code>, kết quả thực chất là một ý <b>khẳng định</b>.',
      '<ul><li>Ví dụ: "Nó <b>không phải không</b> biết" = "Nó <b>có</b> biết".</li><li>Cách nói này nhấn mạnh ý khẳng định một cách tế nhị.</li></ul>',
    ], ['Đúng — hai lần phủ định triệt tiêu nhau, thực chất là khẳng định.', 'Sai — không phải bộc lộ cảm xúc.', 'Sai — không phải câu hỏi.', 'Sai — phủ định kép cho ý khẳng định, không phải phủ định mạnh.']),
    Q('"Tôi chưa làm bài tập" — từ phủ định?', ['Tôi — chủ ngữ xưng hô', 'bài tập', 'làm — động từ chính', 'chưa'], 3, '"Chưa" là từ phủ định.', [
      'Phân tích câu "Tôi <b>chưa</b> làm bài tập" để tìm từ phủ định.',
      'Từ <code>"chưa"</code> đứng trước động từ "làm", biểu thị sự việc <i>chưa xảy ra (đến thời điểm nói)</i> → là từ phủ định.',
      '<ul><li>"Tôi" là chủ ngữ, "làm" là động từ chính, "bài tập" là bổ ngữ.</li><li>"Chưa" khác "không" ở chỗ hàm ý việc đó có thể sẽ xảy ra sau.</li></ul>',
    ], ['Sai — "Tôi" là chủ ngữ, không phải từ phủ định.', 'Sai — "bài tập" là bổ ngữ.', 'Sai — "làm" là động từ chính.', 'Đúng — "chưa" là từ phủ định.']),
  ]),

  M(30, 'Hành động nói', [
    Q('Hành động nói là?', ['Cử chỉ', 'Hành động được thực hiện bằng lời nói nhằm mục đích nhất định', 'Hành động im lặng', 'Hành động viết ra giấy'], 1, 'Định nghĩa: dùng lời để thực hiện ý định.', [
      '<b>Hành động nói</b> là hành động được thực hiện <i>bằng lời nói</i> nhằm một <i>mục đích nhất định</i>.',
      'Khi ta nói, không chỉ phát ra âm thanh mà còn <code>thực hiện một ý định</code>: hỏi, kể, hứa, đề nghị, cảm ơn...',
      '<ul><li>Ví dụ: nói "Tôi xin lỗi" là thực hiện hành động xin lỗi.</li><li>Khác với cử chỉ, im lặng hay viết ra giấy.</li></ul>',
    ], ['Sai — cử chỉ là ngôn ngữ cơ thể, không phải hành động nói.', 'Đúng — hành động nói là hành động thực hiện bằng lời nói nhằm mục đích nhất định.', 'Sai — im lặng không phải hành động nói.', 'Sai — hành động nói thực hiện bằng lời, không phải bằng việc viết ra giấy.']),
    Q('Các kiểu hành động nói thường gặp?', ['Hỏi, trình bày, điều khiển, hứa hẹn, bộc lộ cảm xúc', 'Đi, đứng', 'Ngủ, nghỉ', 'Ăn, uống'], 0, 'Phân loại theo mục đích nói.', [
      'Người ta phân loại <b>hành động nói</b> theo <i>mục đích của lời nói</i>.',
      'Các kiểu thường gặp: <ul><li><b>Hỏi</b>: để lấy thông tin.</li><li><b>Trình bày</b>: kể, báo tin, nhận định.</li><li><b>Điều khiển</b>: cầu khiến, đề nghị, ra lệnh.</li><li><b>Hứa hẹn</b>: cam kết.</li><li><b>Bộc lộ cảm xúc</b>: vui, buồn, cảm ơn...</li></ul>',
      'Đi, đứng, ngủ, ăn... là hành động cơ thể, không phải hành động nói.',
    ], ['Đúng — hỏi, trình bày, điều khiển, hứa hẹn, bộc lộ cảm xúc là các kiểu hành động nói.', 'Sai — đi, đứng là hành động cơ thể, không phải hành động nói.', 'Sai — ngủ, nghỉ không phải hành động nói.', 'Sai — ăn, uống không phải hành động nói.']),
    Q('Khi nói "Tôi xin hứa sẽ học chăm" — hành động nói thuộc?', ['Hỏi xin ý kiến', 'Hứa hẹn', 'Điều khiển', 'Cảm xúc'], 1, 'Hành động hứa.', [
      'Phân tích câu "Tôi <b>xin hứa</b> sẽ học chăm" để xác định kiểu hành động nói.',
      'Người nói đang <i>cam kết, hứa hẹn</i> sẽ thực hiện một việc trong tương lai → đây là hành động nói <b>hứa hẹn</b>.',
      '<ul><li>Dấu hiệu rõ: cụm từ "xin hứa".</li><li>Không phải hỏi, điều khiển hay bộc lộ cảm xúc.</li></ul>',
    ], ['Sai — câu này không hỏi xin ý kiến.', 'Đúng — đây là hành động nói hứa hẹn.', 'Sai — không điều khiển người khác làm gì.', 'Sai — không nhằm bộc lộ cảm xúc.']),
    Q('"Bạn có thể đóng cửa giúp mình không?" — hành động nói?', ['Hứa hẹn sẽ giúp đỡ', 'Hỏi đơn thuần', 'Cảm thán', 'Cầu khiến gián tiếp (qua câu nghi vấn)'], 3, 'Hình thức nghi vấn nhưng mục đích cầu khiến.', [
      'Câu "Bạn có thể đóng cửa giúp mình không?" có <b>hình thức câu nghi vấn</b> nhưng <i>mục đích thực sự là đề nghị, nhờ vả</i>.',
      'Đây là <b>cách thực hiện hành động nói gián tiếp</b>: dùng kiểu câu này để thực hiện chức năng của kiểu câu khác (cầu khiến).',
      '<ul><li>Cách nói gián tiếp thường <code>lịch sự, tế nhị</code> hơn nói thẳng.</li><li>Không phải hỏi đơn thuần để lấy thông tin.</li></ul>',
    ], ['Sai — người nói đề nghị người khác làm, không phải tự hứa.', 'Sai — không chỉ hỏi mà nhằm nhờ làm việc.', 'Sai — không bộc lộ cảm xúc.', 'Đúng — hình thức câu nghi vấn nhưng mục đích là cầu khiến gián tiếp.']),
    Q('Hành động nói có thể được thực hiện?', ['Cả trực tiếp và gián tiếp', 'Không cách nào', 'Gián tiếp', 'Trực tiếp'], 0, 'Cả hai cách — gián tiếp thường lịch sự hơn.', [
      'Hành động nói có thể được thực hiện theo <b>hai cách</b>:',
      '<ul><li><b>Cách trực tiếp</b>: dùng kiểu câu đúng với chức năng (câu cầu khiến để cầu khiến).</li><li><b>Cách gián tiếp</b>: dùng kiểu câu này để thực hiện chức năng kiểu câu khác (câu nghi vấn để cầu khiến).</li></ul>',
      'Cách gián tiếp thường <code>tế nhị, lịch sự</code> hơn. Vì cả hai đều đúng nên đáp án là "cả trực tiếp và gián tiếp".',
    ], ['Đúng — hành động nói có thể thực hiện cả trực tiếp lẫn gián tiếp.', 'Sai — hành động nói luôn có cách thực hiện.', 'Sai — đúng một phần nhưng còn cách trực tiếp.', 'Sai — đúng một phần nhưng còn cách gián tiếp.']),
    Q('"Cô ấy là học sinh giỏi" — hành động nói?', ['Hứa hẹn về thành tích', 'Cảm xúc', 'Hỏi về kết quả học tập', 'Trình bày'], 3, 'Khẳng định một sự kiện.', [
      'Phân tích câu "Cô ấy là học sinh giỏi" để xác định kiểu hành động nói.',
      'Câu này <i>nhận định, khẳng định một sự việc</i> (cô ấy giỏi) → là hành động nói <b>trình bày</b>.',
      '<ul><li>Hành động trình bày gồm: kể, thông báo, nhận định, khẳng định.</li><li>Không phải hứa hẹn, hỏi hay bộc lộ cảm xúc.</li></ul>',
    ], ['Sai — câu này không hứa hẹn điều gì.', 'Sai — câu này không bộc lộ cảm xúc.', 'Sai — câu này khẳng định, không phải câu hỏi.', 'Đúng — đây là hành động nói trình bày, khẳng định một sự kiện.']),
  ]),

  M(31, 'Hội thoại — Lượt lời', [
    Q('Vai xã hội trong hội thoại được xác định bởi?', ['Ngẫu nhiên', 'Quan hệ trên – dưới, ngang hàng, thân – sơ', 'Tuổi tác duy nhất', 'Giới tính'], 1, 'Vai xã hội nhiều chiều: trên/dưới + thân/sơ.', [
      '<b>Vai xã hội</b> là vị trí của người tham gia hội thoại đối với người khác trong cuộc thoại.',
      'Vai xã hội được xác định bằng các <i>quan hệ</i>: <ul><li><b>Trên – dưới</b> hay <b>ngang hàng</b> (theo tuổi tác, thứ bậc).</li><li><b>Thân – sơ</b> (theo mức độ quen biết, gần gũi).</li></ul>',
      'Vì quan hệ xã hội đa dạng nên mỗi người có thể giữ nhiều vai khác nhau, cần xác định đúng để chọn cách nói phù hợp.',
    ], ['Sai — vai xã hội có quy luật, không phải ngẫu nhiên.', 'Đúng — vai xã hội xác định bởi quan hệ trên – dưới, ngang hàng, thân – sơ.', 'Sai — tuổi tác chỉ là một yếu tố, không phải duy nhất.', 'Sai — giới tính không quyết định vai xã hội trong hội thoại.']),
    Q('Lượt lời là?', ['Một câu', 'Phần nói của mỗi người trong hội thoại', 'Một từ', 'Toàn bộ cuộc thoại'], 1, 'Lượt lời = phần đối thoại của một người.', [
      '<b>Lượt lời</b> là <i>phần nói của mỗi người</i> trong một cuộc hội thoại.',
      'Trong hội thoại, mỗi lần một người nói (rồi đến lượt người khác) được tính là <code>một lượt lời</code>.',
      '<ul><li>Một lượt lời có thể gồm một hoặc nhiều câu, không chỉ một từ hay một câu.</li><li>Toàn bộ cuộc thoại gồm nhiều lượt lời nối tiếp nhau.</li></ul>',
    ], ['Sai — một lượt lời có thể gồm nhiều câu, không chỉ một câu.', 'Đúng — lượt lời là phần nói của mỗi người trong hội thoại.', 'Sai — lượt lời không chỉ là một từ.', 'Sai — toàn bộ cuộc thoại gồm nhiều lượt lời.']),
    Q('Khi tham gia hội thoại, cần?', ['Nói tự do', 'Cướp lời', 'Tôn trọng lượt lời người khác, không cắt ngang vô lí', 'Im lặng'], 2, 'Lịch sự, tôn trọng đối phương.', [
      'Khi tham gia hội thoại, cần giữ <b>phép lịch sự</b>: <i>tôn trọng lượt lời của người khác, không cắt ngang lời, không nói tranh, nói leo vô lí</i>.',
      'Người nói cần chờ đến lượt mình và lắng nghe khi người khác đang nói.',
      '<ul><li>"Cướp lời" hay "nói tự do" bất chấp là thiếu văn hóa giao tiếp.</li><li>Im lặng tuyệt đối thì không tham gia được hội thoại.</li></ul>',
    ], ['Sai — nói tự do bất chấp người khác là thiếu lịch sự.', 'Sai — cướp lời là hành vi không tôn trọng.', 'Đúng — cần tôn trọng lượt lời người khác, không cắt ngang vô lí.', 'Sai — luôn im lặng thì không tham gia được hội thoại.']),
    Q('Người vai dưới khi nói với vai trên cần?', ['Im lặng tuyệt đối', 'Lễ phép, thận trọng', 'Cộc lốc', 'Quát mắng'], 1, 'Đảm bảo phép tắc xã hội.', [
      'Khi giao tiếp, người ở <b>vai dưới</b> (ít tuổi hơn, thứ bậc thấp hơn) nói với người ở <b>vai trên</b> cần <i>lễ phép, thận trọng</i>.',
      'Cần lựa chọn <code>từ ngữ xưng hô, tình thái từ</code> phù hợp (dạ, vâng, ạ...) để thể hiện sự tôn trọng.',
      '<ul><li>Nói cộc lốc hay quát mắng vai trên là vi phạm phép tắc xã hội.</li><li>Im lặng tuyệt đối thì không giao tiếp được.</li></ul>',
    ], ['Sai — im lặng tuyệt đối thì không giao tiếp được.', 'Đúng — người vai dưới cần lễ phép, thận trọng khi nói với vai trên.', 'Sai — nói cộc lốc là thiếu lễ phép.', 'Sai — quát mắng vai trên là vi phạm phép tắc xã hội.']),
    Q('Khi không tham gia mà chỉ nghe, đó là?', ['Trả lời', 'Vai chính', 'Vai im lặng / không tham gia lượt lời', 'Đặt câu hỏi'], 2, 'Người nghe — không nhất thiết phải lên tiếng.', [
      'Trong hội thoại, có lúc một người <b>chỉ nghe mà không lên tiếng</b> — đó là giữ <i>"sự im lặng"</i>, không tham gia lượt lời.',
      'Việc chọn im lặng cũng là một cách ứng xử có thể mang nhiều hàm ý (đồng tình, e ngại, suy nghĩ...).',
      '<ul><li>Trả lời, đặt câu hỏi đều là đã <code>tham gia lượt lời</code>.</li><li>Người chỉ nghe không phải "vai chính" trong cuộc thoại.</li></ul>',
    ], ['Sai — trả lời là đã tham gia lượt lời.', 'Sai — chỉ nghe thì không phải vai chính.', 'Đúng — chỉ nghe mà không lên tiếng là vai im lặng, không tham gia lượt lời.', 'Sai — đặt câu hỏi là đã tham gia hội thoại.']),
    Q('Trong bữa cơm gia đình, lượt lời nên có?', ['Phải nói liên tục', 'Không quy tắc gì', 'Quy tắc tôn trọng, không nói khi đang ăn', 'Phải im lặng tuyệt đối'], 2, 'Văn hoá ứng xử trong gia đình.', [
      'Ngay cả trong sinh hoạt gia đình, việc luân phiên <b>lượt lời</b> cũng cần tuân theo những <i>quy tắc ứng xử</i> nhất định.',
      'Ví dụ: <code>không nói khi đang nhai, nhường người lớn nói trước, không ngắt lời</code> — thể hiện nếp sống văn hóa.',
      '<ul><li>Không phải nói liên tục hay im lặng tuyệt đối.</li><li>Giao tiếp lịch sự góp phần giữ không khí gia đình ấm cúng.</li></ul>',
    ], ['Sai — nói liên tục không phù hợp văn hoá ứng xử.', 'Sai — vẫn cần quy tắc lịch sự.', 'Đúng — cần quy tắc tôn trọng, không nói khi đang ăn.', 'Sai — không cần im lặng tuyệt đối, vẫn có thể trò chuyện đúng lúc.']),
  ]),

  M(32, 'Văn nghị luận — Luận điểm, luận cứ', [
    Q('Văn nghị luận là?', ['Văn kể chuyện', 'Văn biểu cảm', 'Văn bản trình bày ý kiến, quan điểm và thuyết phục người đọc bằng lí lẽ, dẫn chứng', 'Văn tả cảnh'], 2, 'Đặc trưng: thuyết phục bằng lí lẽ và dẫn chứng.', [
      '<b>Văn nghị luận</b> là kiểu văn bản dùng để <i>trình bày ý kiến, quan điểm</i> và <i>thuyết phục</i> người đọc, người nghe bằng <b>lí lẽ và dẫn chứng</b>.',
      'Đặc trưng cốt lõi: tác động vào <code>lí trí, nhận thức</code> để thuyết phục.',
      '<ul><li>Khác văn tự sự (kể chuyện), miêu tả (tả cảnh), biểu cảm (cảm xúc).</li><li>Ba yếu tố quan trọng: luận điểm, luận cứ, lập luận.</li></ul>',
    ], ['Sai — kể chuyện là đặc trưng văn tự sự.', 'Sai — biểu cảm là bộc lộ tình cảm, khác nghị luận.', 'Đúng — văn nghị luận trình bày ý kiến, quan điểm và thuyết phục bằng lí lẽ, dẫn chứng.', 'Sai — tả cảnh là đặc trưng văn miêu tả.']),
    Q('Luận điểm là?', ['Câu chuyện', 'Đoạn văn miêu tả', 'Ý kiến, tư tưởng, quan điểm chính cần khẳng định', 'Lời dẫn'], 2, 'Luận điểm = tư tưởng được bảo vệ.', [
      '<b>Luận điểm</b> là những <i>ý kiến, tư tưởng, quan điểm chính</i> mà người viết nêu ra và cần khẳng định, bảo vệ trong bài.',
      'Luận điểm là <code>linh hồn</code> của bài nghị luận, thường được diễn đạt dưới dạng một câu khẳng định.',
      '<ul><li>Một bài văn có thể có luận điểm chính và các luận điểm phụ.</li><li>Khác với luận cứ (lí lẽ, dẫn chứng làm rõ luận điểm).</li></ul>',
    ], ['Sai — câu chuyện thuộc văn tự sự, không phải luận điểm.', 'Sai — đoạn văn miêu tả không phải luận điểm.', 'Đúng — luận điểm là ý kiến, tư tưởng, quan điểm chính cần khẳng định.', 'Sai — lời dẫn không phải luận điểm.']),
    Q('Luận cứ là?', ['Câu cảm', 'Tên người', 'Câu hỏi', 'Lí lẽ và dẫn chứng dùng để làm rõ luận điểm'], 3, 'Bao gồm lí lẽ + bằng chứng.', [
      '<b>Luận cứ</b> là những <i>lí lẽ và dẫn chứng</i> được đưa ra để làm sáng tỏ, chứng minh cho luận điểm.',
      'Luận cứ gồm hai phần: <ul><li><b>Lí lẽ</b>: những lập luận, phân tích, suy lí.</li><li><b>Dẫn chứng</b>: những bằng chứng cụ thể, xác thực.</li></ul>',
      'Luận cứ phải <code>chân thực, đúng đắn, tiêu biểu</code> thì luận điểm mới có sức thuyết phục.',
    ], ['Sai — câu cảm thán không phải luận cứ.', 'Sai — tên người không phải luận cứ.', 'Sai — câu hỏi không phải luận cứ.', 'Đúng — luận cứ là lí lẽ và dẫn chứng dùng để làm rõ luận điểm.']),
    Q('Lập luận là?', ['Cách tả cảnh', 'Cách tổ chức, sắp xếp luận điểm, luận cứ để thuyết phục', 'Cách trình bày dẫn chứng', 'Cách kể chuyện'], 1, 'Lập luận = phương pháp triển khai.', [
      '<b>Lập luận</b> là <i>cách tổ chức, sắp xếp</i> luận điểm, luận cứ theo một trình tự hợp lí để <b>thuyết phục</b> người đọc.',
      'Lập luận chặt chẽ giúp bài văn <code>mạch lạc, logic, có sức thuyết phục</code>.',
      '<ul><li>Trình bày dẫn chứng chỉ là một phần, chưa phải toàn bộ lập luận.</li><li>Lập luận quyết định sự thành công của bài nghị luận.</li></ul>',
    ], ['Sai — tả cảnh không phải lập luận.', 'Đúng — lập luận là cách tổ chức, sắp xếp luận điểm, luận cứ để thuyết phục.', 'Sai — trình bày dẫn chứng chỉ là một phần, chưa phải toàn bộ lập luận.', 'Sai — kể chuyện thuộc văn tự sự.']),
    Q('Yêu cầu của một bài văn nghị luận tốt?', ['Cốt truyện li kì', 'Hình ảnh đẹp', 'Luận điểm rõ ràng, luận cứ xác đáng, lập luận chặt chẽ', 'Cảm xúc dạt dào'], 2, 'Tiêu chuẩn của văn nghị luận.', [
      'Một bài văn nghị luận <b>tốt</b> cần đáp ứng các tiêu chuẩn:',
      '<ul><li><b>Luận điểm</b> rõ ràng, đúng đắn.</li><li><b>Luận cứ</b> xác đáng, tiêu biểu, chân thực.</li><li><b>Lập luận</b> chặt chẽ, logic, thuyết phục.</li></ul>',
      'Cốt truyện li kì, hình ảnh đẹp, cảm xúc dạt dào là yêu cầu của <code>văn tự sự, miêu tả, biểu cảm</code> — không phải tiêu chí của nghị luận.',
    ], ['Sai — cốt truyện li kì là yêu cầu của văn tự sự.', 'Sai — hình ảnh đẹp là yêu cầu của văn miêu tả.', 'Đúng — luận điểm rõ ràng, luận cứ xác đáng, lập luận chặt chẽ.', 'Sai — cảm xúc dạt dào là yêu cầu của văn biểu cảm.']),
    Q('"Học, học nữa, học mãi" là?', ['Câu cầu khiến đơn thuần', 'Câu cảm thán', 'Một luận điểm về tinh thần tự học', 'Câu hỏi'], 2, 'Lời khuyên của Lê-nin, thường dùng làm luận điểm.', [
      'Câu nói nổi tiếng <code>"Học, học nữa, học mãi"</code> của Lê-nin thường được dùng làm một <b>luận điểm</b> trong văn nghị luận.',
      'Câu này nêu lên một <i>tư tưởng, quan điểm</i>: đề cao tinh thần học tập suốt đời, không ngừng nghỉ.',
      '<ul><li>Vì nó nêu một quan điểm cần khẳng định nên đóng vai trò luận điểm.</li><li>Không phải câu hỏi, cảm thán hay cầu khiến đơn thuần.</li></ul>',
    ], ['Sai — đây không phải câu cầu khiến đơn thuần mà mang tư tưởng.', 'Sai — không bộc lộ cảm xúc nên không phải câu cảm thán.', 'Đúng — câu này là một luận điểm về tinh thần tự học (lời Lê-nin).', 'Sai — đây không phải câu hỏi.']),
  ]),

  M(33, 'Bàn luận về phép học — Nguyễn Thiếp', [
    Q('"Bàn luận về phép học" của ai?', ['Nguyễn Trãi', 'Phan Bội Châu', 'Nguyễn Thiếp (La Sơn Phu Tử)', 'Lê Quý Đôn'], 2, 'La Sơn Phu Tử Nguyễn Thiếp (1723–1804).', [
      '<b>"Bàn luận về phép học"</b> (Luận học pháp) là của <b>Nguyễn Thiếp</b> — tức La Sơn Phu Tử (1723–1804).',
      'Ông là người <i>thiên tư sáng suốt, học rộng hiểu sâu</i>, được vua Quang Trung trọng dụng.',
      '<ul><li>Văn bản là phần trích từ bài tấu dâng vua Quang Trung.</li><li>Nguyễn Trãi → "Bình Ngô đại cáo"; Phan Bội Châu là chí sĩ đầu thế kỉ XX.</li></ul>',
    ], ['Sai — Nguyễn Trãi viết "Bình Ngô đại cáo".', 'Sai — Phan Bội Châu là chí sĩ đầu thế kỉ XX, không viết tác phẩm này.', 'Đúng — "Bàn luận về phép học" của La Sơn Phu Tử Nguyễn Thiếp (1723–1804).', 'Sai — Lê Quý Đôn là tác giả khác.']),
    Q('Thể loại?', ['Chiếu — vua ban bố mệnh lệnh', 'Hịch — hiệu triệu tướng sĩ', 'Cáo — tổng kết, tuyên bố', 'Tấu — văn nghị luận trung đại dâng vua'], 3, 'Tấu — bài tấu dâng vua Quang Trung.', [
      '<b>Tấu</b> là một thể văn nghị luận trung đại do <i>bề tôi, thần dân dâng lên vua chúa</i> để trình bày ý kiến, đề nghị.',
      '"Bàn luận về phép học" là phần trích từ bài tấu Nguyễn Thiếp dâng vua <code>Quang Trung (Nguyễn Huệ)</code> năm 1791.',
      '<ul><li>Phân biệt: <b>chiếu</b> (vua ban xuống), <b>hịch</b> (hiệu triệu), <b>cáo</b> (tổng kết, tuyên bố).</li><li>Tấu là văn từ dưới lên (bề tôi → vua).</li></ul>',
    ], ['Sai — chiếu là văn vua ban bố mệnh lệnh, khác tấu.', 'Sai — hịch dùng hiệu triệu tướng sĩ, khác tấu.', 'Sai — cáo dùng tổng kết, tuyên bố, khác tấu.', 'Đúng — đây là thể tấu, bài tấu dâng vua Quang Trung.']),
    Q('Tác giả phê phán lối học nào?', ['Học để giúp dân', 'Học khoa cử', 'Học hết sức', 'Chuộng hình thức, cầu danh lợi, không thực chất'], 3, 'Phê phán lối học cầu danh lợi, không thực chất.', [
      'Nguyễn Thiếp <b>phê phán</b> lối học lệch lạc đương thời: <i>học chuộng hình thức, cầu danh lợi, không có thực chất</i>.',
      'Đó là lối học <code>"học thuộc lòng câu chữ mà không hiểu nội dung"</code>, học để làm quan, vinh thân phì gia.',
      '<ul><li>Hậu quả: "chúa tầm thường, thần nịnh hót", nước mất nhà tan.</li><li>Ngược lại, tác giả đề cao việc học để giúp dân, giúp nước.</li></ul>',
    ], ['Sai — học để giúp dân là lối học tác giả đề cao, không phê phán.', 'Sai — câu trả lời chung chung, chưa nêu rõ bản chất bị phê phán.', 'Sai — học hết sức không phải điều bị chê.', 'Đúng — tác giả phê phán lối học chuộng hình thức, cầu danh lợi, không thực chất.']),
    Q('Phương pháp học đúng theo tác giả?', ['Học vẹt', 'Không cần thầy', 'Học từ thấp đến cao, học rộng rồi tóm gọn, học đi đôi với hành', 'Học gấp rút'], 2, 'Học có hệ thống, kết hợp lí thuyết với thực hành.', [
      'Nguyễn Thiếp đề ra <b>phương pháp học đúng đắn</b>, tiến bộ:',
      '<ul><li>Học <b>tuần tự từ thấp đến cao</b> (từ những điều cơ bản).</li><li>Học <b>rộng rồi tóm lược cho gọn</b> (nắm cốt lõi).</li><li><b>Học đi đôi với hành</b> — kết hợp lí thuyết với thực hành.</li></ul>',
      'Đây là những quan điểm <code>vẫn còn nguyên giá trị</code> cho đến ngày nay.',
    ], ['Sai — học vẹt là lối học sai bị phê phán.', 'Sai — tác giả không cho rằng học không cần thầy.', 'Đúng — học từ thấp đến cao, học rộng rồi tóm gọn, học đi đôi với hành.', 'Sai — học gấp rút không phải phương pháp tác giả đề cao.']),
    Q('Mục đích cao nhất của việc học theo tác giả?', ['Đỗ đạt làm quan', 'Kiếm tiền', 'Học để làm người, để hữu ích cho nước nhà', 'Vui chơi'], 2, 'Học để làm người và phục vụ xã hội.', [
      'Theo Nguyễn Thiếp, <b>mục đích cao nhất</b> của việc học là <i>học để làm người</i> (học đạo lí, lẽ sống) và <i>để hữu ích cho đất nước</i>.',
      'Học chân chính phải gắn với <code>đạo đức và trách nhiệm với quốc gia</code>, hướng đến điều thiện và sự thịnh trị.',
      '<ul><li>Đỗ đạt làm quan, kiếm tiền chỉ là lối học cầu danh lợi bị phê phán.</li><li>Quan điểm này thể hiện tư tưởng tiến bộ của tác giả.</li></ul>',
    ], ['Sai — học để đỗ đạt làm quan thuộc lối cầu danh lợi bị phê phán.', 'Sai — kiếm tiền không phải mục đích cao nhất theo tác giả.', 'Đúng — mục đích cao nhất là học để làm người, để hữu ích cho nước nhà.', 'Sai — vui chơi không phải mục đích của việc học.']),
    Q('Văn bản thể hiện tinh thần?', ['Đề cao việc học chân chính, lòng yêu nước', 'Chống học hành', 'Không quan tâm', 'Chế giễu kẻ học'], 0, 'Đề cao giáo dục, lòng yêu nước thiết tha.', [
      'Văn bản thể hiện tinh thần <b>đề cao việc học chân chính</b> và <i>lòng yêu nước</i> thiết tha của Nguyễn Thiếp.',
      'Tác giả tâm huyết với sự nghiệp giáo dục, coi <code>việc học là gốc rễ của đạo đức và sự hưng thịnh quốc gia</code>.',
      '<ul><li>Ông trân trọng người học chân chính, không hề chế giễu.</li><li>Tư tưởng "học để hành, học để giúp nước" rất tiến bộ.</li></ul>',
    ], ['Đúng — văn bản đề cao việc học chân chính và lòng yêu nước thiết tha.', 'Sai — tác giả đề cao việc học, không chống học hành.', 'Sai — tác giả rất tâm huyết với giáo dục.', 'Sai — văn bản trân trọng người học chân chính, không chế giễu.']),
  ]),

  M(34, 'Đi bộ ngao du — Ru-xô', [
    Q('Tác giả "Đi bộ ngao du" là?', ['Vôn-te', 'Ru-xô (Pháp)', 'Đi-đơ-rô', 'Mông-te-xki-ơ'], 1, 'Jean-Jacques Rousseau (1712–1778), nhà tư tưởng Pháp.', [
      '<b>Ru-xô</b> (Jean-Jacques Rousseau, 1712–1778) là nhà văn, <i>nhà tư tưởng lớn của nước Pháp</i> thời Khai sáng.',
      'Ông nổi tiếng với các tư tưởng tiến bộ về <code>tự do, bình đẳng và giáo dục tự nhiên</code>.',
      '<ul><li>Vôn-te, Đi-đơ-rô, Mông-te-xki-ơ cũng là nhà tư tưởng Pháp cùng thời nhưng không phải tác giả bài này.</li></ul>',
    ], ['Sai — Vôn-te là nhà tư tưởng Pháp khác, không viết tác phẩm này.', 'Đúng — Ru-xô (Rousseau, 1712–1778), nhà tư tưởng Pháp, là tác giả.', 'Sai — Đi-đơ-rô là nhà bách khoa khác, không phải tác giả.', 'Sai — Mông-te-xki-ơ là nhà tư tưởng Pháp khác.']),
    Q('Văn bản trích từ tác phẩm nào?', ['Ê-min hay Về giáo dục', 'Khế ước xã hội', 'Bàn về bất bình đẳng', 'Tự thuật'], 0, 'Trích "Ê-min hay Về giáo dục".', [
      '<b>"Đi bộ ngao du"</b> trích từ tác phẩm <b>"Ê-min hay Về giáo dục"</b> (1762) của Ru-xô.',
      'Đây là một <i>thiên luận văn – tiểu thuyết</i> bàn về việc giáo dục một em bé (Ê-min) từ lúc sơ sinh đến tuổi trưởng thành.',
      '<ul><li>"Khế ước xã hội", "Bàn về bất bình đẳng" là các tác phẩm chính trị khác của Ru-xô.</li><li>Đoạn trích bàn về lợi ích của việc đi bộ.</li></ul>',
    ], ['Đúng — "Đi bộ ngao du" trích từ "Ê-min hay Về giáo dục".', 'Sai — "Khế ước xã hội" là tác phẩm chính trị khác của Ru-xô.', 'Sai — "Bàn về bất bình đẳng" là tác phẩm khác của Ru-xô.', 'Sai — "Tự thuật" không phải nguồn của đoạn trích.']),
    Q('Theo Ru-xô, đi bộ ngao du có lợi ích gì?', ['Tự do, hiểu biết, tăng cường sức khoẻ, tâm hồn thanh thản', 'Mất thì giờ', 'Nguy hiểm', 'Tốn kém'], 0, 'Liệt kê 3 lợi ích: tự do – hiểu biết – sức khoẻ.', [
      'Ru-xô nêu lên những <b>lợi ích</b> của việc đi bộ ngao du qua ba luận điểm chính:',
      '<ul><li>Đi bộ đem lại <b>tự do</b>, thoải mái, không lệ thuộc ai.</li><li>Đi bộ giúp <b>trau dồi tri thức, hiểu biết</b> về tự nhiên, cuộc sống.</li><li>Đi bộ <b>tăng cường sức khoẻ</b> và mang lại tâm hồn vui vẻ, thanh thản.</li></ul>',
      'Cách lập luận liệt kê các lợi ích khiến luận điểm thêm thuyết phục.',
    ], ['Đúng — đi bộ ngao du đem lại tự do, hiểu biết, tăng cường sức khoẻ và tâm hồn thanh thản.', 'Sai — Ru-xô coi đó là lợi ích, không phải mất thì giờ.', 'Sai — tác giả không xem đi bộ là nguy hiểm.', 'Sai — đi bộ tiết kiệm, không tốn kém.']),
    Q('Phương pháp lập luận chủ yếu?', ['Tự sự kể chuyện hành trình', 'Miêu tả', 'Biểu cảm thuần', 'Nghị luận có dẫn chứng cụ thể từ bản thân'], 3, 'Nghị luận kết hợp dẫn chứng thực tế từ chính tác giả.', [
      '<b>Phương pháp lập luận</b> chủ yếu của văn bản là <i>nghị luận kết hợp với dẫn chứng cụ thể, sinh động từ chính bản thân tác giả</i>.',
      'Ru-xô dùng <code>trải nghiệm cá nhân</code> ("tôi", "Ê-min") làm dẫn chứng, khiến lí lẽ trở nên gần gũi, chân thực.',
      '<ul><li>Lập luận chặt chẽ kết hợp cảm xúc tự nhiên.</li><li>Không phải tự sự kể chuyện hay miêu tả, biểu cảm thuần túy.</li></ul>',
    ], ['Sai — văn bản không kể chuyện hành trình mà lập luận thuyết phục.', 'Sai — không thiên về miêu tả.', 'Sai — không chỉ thuần biểu cảm.', 'Đúng — nghị luận kết hợp dẫn chứng cụ thể từ chính bản thân tác giả.']),
    Q('Văn bản thể hiện quan niệm gì?', ['Đề cao quyền lực', 'Đề cao tự do cá nhân và giáo dục tự nhiên', 'Đề cao danh vọng', 'Đề cao tài chính'], 1, 'Tư tưởng tiến bộ thời Khai sáng Pháp.', [
      'Qua văn bản, Ru-xô thể hiện quan niệm <b>đề cao tự do cá nhân</b> và <i>tư tưởng giáo dục tự nhiên</i>.',
      'Ông cho rằng con người cần được giáo dục <code>gắn với thiên nhiên, với thực tiễn cuộc sống</code>, phát triển hài hòa cả thể chất lẫn tâm hồn.',
      '<ul><li>Đây là tư tưởng tiến bộ tiêu biểu của thời Khai sáng Pháp.</li><li>Không đề cao quyền lực, danh vọng hay tài chính.</li></ul>',
    ], ['Sai — văn bản không đề cao quyền lực.', 'Đúng — đề cao tự do cá nhân và giáo dục tự nhiên, tư tưởng tiến bộ thời Khai sáng.', 'Sai — không đề cao danh vọng.', 'Sai — không đề cao tài chính.']),
    Q('Văn phong của Ru-xô trong bài?', ['Giản dị, chân thành, gần gũi', 'Khô khan', 'Cầu kì', 'Bi luỵ'], 0, 'Giản dị, đầy sức thuyết phục.', [
      '<b>Văn phong</b> của Ru-xô trong bài <i>giản dị, chân thành, gần gũi</i> nhưng đầy sức thuyết phục.',
      'Ông viết bằng giọng <code>tâm tình, tự nhiên</code> như đang trò chuyện, chia sẻ trải nghiệm của chính mình.',
      '<ul><li>Lối viết mộc mạc khiến tư tưởng tiến bộ dễ đi vào lòng người.</li><li>Không khô khan, cầu kì hay bi luỵ.</li></ul>',
    ], ['Đúng — văn phong giản dị, chân thành, gần gũi và đầy sức thuyết phục.', 'Sai — văn phong sinh động, không khô khan.', 'Sai — không cầu kì mà mộc mạc.', 'Sai — giọng văn lạc quan, không bi luỵ.']),
  ]),

  M(35, 'Ôn tập cuối năm', [
    Q('"Nhớ rừng" của ai?', ['Tế Hanh', 'Thế Lữ', 'Hồ Chí Minh', 'Tố Hữu'], 1, 'Thế Lữ.', [
      'Ôn lại các tác giả – tác phẩm thơ tiêu biểu học kì II.',
      '<b>"Nhớ rừng"</b> là của <b>Thế Lữ</b> — một thủ lĩnh của phong trào Thơ mới, mượn lời con hổ để gửi gắm khát vọng tự do.',
      '<ul><li>Tế Hanh → "Quê hương".</li><li>Tố Hữu → "Khi con tu hú".</li><li>Hồ Chí Minh → "Tức cảnh Pác Bó", "Ngắm trăng", "Đi đường".</li></ul>',
    ], ['Sai — Tế Hanh viết "Quê hương".', 'Đúng — "Nhớ rừng" là của Thế Lữ.', 'Sai — không phải Hồ Chí Minh.', 'Sai — Tố Hữu viết "Khi con tu hú".']),
    Q('"Quê hương" của Tế Hanh có hình ảnh trung tâm?', ['Cánh đồng lúa', 'Núi rừng', 'Dòng sông', 'Cánh buồm và con thuyền'], 3, 'Cánh buồm và đoàn thuyền đánh cá.', [
      'Ôn lại bài <b>"Quê hương"</b> của Tế Hanh — bài thơ về làng chài ven biển Quảng Ngãi.',
      'Hình ảnh trung tâm là <i>cánh buồm và con thuyền đánh cá</i> — biểu tượng cho cuộc sống lao động và hồn quê.',
      '<ul><li>Câu thơ nổi tiếng: "Cánh buồm giương to như mảnh hồn làng".</li><li>Vì là làng biển nên không có cánh đồng lúa, núi rừng làm trung tâm.</li></ul>',
    ], ['Sai — quê biển nên không lấy cánh đồng lúa làm trung tâm.', 'Sai — không phải núi rừng.', 'Sai — dòng sông không phải hình ảnh trung tâm.', 'Đúng — hình ảnh trung tâm là cánh buồm và con thuyền đánh cá.']),
    Q('"Tức cảnh Pác Bó" – tâm trạng?', ['Sợ hãi', 'Bi luỵ', 'Buồn chán', 'Ung dung, lạc quan'], 3, 'Phong thái ung dung của Bác.', [
      'Ôn lại bài <b>"Tức cảnh Pác Bó"</b> của Hồ Chí Minh.',
      'Dù sống trong cảnh gian khổ (ở hang, ăn cháo bẹ rau măng), Bác vẫn giữ tâm trạng <i>ung dung, lạc quan</i>.',
      '<ul><li>Chữ "sang" ở câu cuối thể hiện tinh thần lạc quan cách mạng.</li><li>Không hề sợ hãi, bi luỵ hay buồn chán.</li></ul>',
    ], ['Sai — bài thơ không mang sắc thái sợ hãi.', 'Sai — không bi luỵ mà lạc quan.', 'Sai — không buồn chán.', 'Đúng — tâm trạng ung dung, lạc quan, phong thái của Bác.']),
    Q('"Hịch tướng sĩ" do ai viết?', ['Trần Quốc Tuấn', 'Nguyễn Trãi', 'Lê Lợi', 'Lí Thường Kiệt'], 0, 'Hưng Đạo Vương.', [
      'Ôn lại các văn bản nghị luận trung đại.',
      '<b>"Hịch tướng sĩ"</b> do <b>Trần Quốc Tuấn</b> (Hưng Đạo Vương) viết để khích lệ tướng sĩ chống quân Mông – Nguyên.',
      '<ul><li>Nguyễn Trãi → "Bình Ngô đại cáo".</li><li>Lí Thường Kiệt → "Nam quốc sơn hà"; Lê Lợi → chủ tướng Lam Sơn.</li></ul>',
    ], ['Đúng — "Hịch tướng sĩ" do Trần Quốc Tuấn (Hưng Đạo Vương) viết.', 'Sai — Nguyễn Trãi viết "Bình Ngô đại cáo".', 'Sai — Lê Lợi là chủ tướng Lam Sơn, không viết hịch này.', 'Sai — Lí Thường Kiệt gắn với "Nam quốc sơn hà".']),
    Q('Câu "Ôi, đẹp quá!" thuộc kiểu?', ['Nghi vấn', 'Trần thuật', 'Cảm thán', 'Cầu khiến'], 2, 'Câu cảm thán.', [
      'Ôn lại các kiểu câu chia theo mục đích nói.',
      'Câu "<b>Ôi</b>, đẹp quá<b>!</b>" có <i>từ cảm thán "Ôi"</i> và <i>dấu chấm than</i> → là <b>câu cảm thán</b> (bộc lộ cảm xúc).',
      '<ul><li>Câu nghi vấn (hỏi), cầu khiến (ra lệnh), trần thuật (kể) có dấu hiệu khác.</li><li>Nhận biết câu cảm thán: từ cảm thán + dấu chấm than.</li></ul>',
    ], ['Sai — câu này không hỏi.', 'Sai — câu bộc lộ cảm xúc, không phải trần thuật.', 'Đúng — có thán từ "Ôi" và dấu "!" nên là câu cảm thán.', 'Sai — câu này không ra lệnh, yêu cầu.']),
    Q('Văn bản nghị luận đòi hỏi?', ['Mô tả phong cảnh', 'Cốt truyện ly kì', 'Luận điểm, luận cứ, lập luận chặt chẽ', 'Cảm xúc tuôn trào'], 2, 'Ba yếu tố căn bản.', [
      'Ôn lại đặc trưng của <b>văn bản nghị luận</b>.',
      'Văn nghị luận đòi hỏi ba yếu tố căn bản: <ul><li><b>Luận điểm</b> rõ ràng.</li><li><b>Luận cứ</b> (lí lẽ, dẫn chứng) xác đáng.</li><li><b>Lập luận</b> chặt chẽ.</li></ul>',
      'Mô tả phong cảnh, cốt truyện li kì, cảm xúc tuôn trào là yêu cầu của <code>văn miêu tả, tự sự, biểu cảm</code>, không phải nghị luận.',
    ], ['Sai — mô tả phong cảnh là yêu cầu của văn miêu tả.', 'Sai — cốt truyện ly kì là yêu cầu của văn tự sự.', 'Đúng — văn nghị luận đòi hỏi luận điểm, luận cứ, lập luận chặt chẽ.', 'Sai — cảm xúc tuôn trào là yêu cầu của văn biểu cảm.']),
  ]),

  M(36, 'Kết thúc Ngữ Văn 8 — Ngôn ngữ và tâm hồn bước vào lớp 9', [
    Q('Tác phẩm "Hịch tướng sĩ" của Trần Quốc Tuấn thuộc thể loại nào?',
      ['Thơ thất ngôn tứ tuyệt', 'Hồi kí', 'Nghị luận trung đại', 'Truyện hiện thực phê phán'],
      2,
      '"Hịch tướng sĩ" là văn nghị luận trung đại, cùng nhóm với "Chiếu dời đô" và "Bàn luận về phép học".',
      ['Ngữ Văn 8 có một cụm bài rất đặc sắc: <b>nghị luận trung đại</b> viết bằng chữ Hán hoặc chữ Nôm.',
       'Ba tác phẩm trong cụm này:<ul><li><b>"Chiếu dời đô"</b> — Lý Công Uẩn: lập luận về sự cần thiết dời đô về Đại La</li><li><b>"Hịch tướng sĩ"</b> — Trần Quốc Tuấn: lòng yêu nước, căm thù giặc, kêu gọi ý chí quyết chiến</li><li><b>"Bàn luận về phép học"</b> — Nguyễn Thiếp: học thực chất để phục vụ đất nước</li></ul>',
       'Điểm chung của cả ba: <b>lập luận chặt chẽ</b>, dẫn chứng thuyết phục, <b>kết hợp lí trí và cảm xúc</b>, ngôn ngữ trang trọng.'],
      ['Sai — đó là thể thơ, ví dụ "Ngắm trăng" của Hồ Chí Minh.',
       'Sai — hồi kí là "Trong lòng mẹ" của Nguyên Hồng.',
       'Đúng — nghị luận trung đại, cùng nhóm "Chiếu dời đô".',
       'Sai — truyện hiện thực phê phán là "Lão Hạc", "Tức nước vỡ bờ".']),
    Q('Chủ đề của truyện ngắn "Lão Hạc" (Nam Cao) là gì?',
      ['Ca ngợi cuộc sống nông thôn thanh bình', 'Số phận bi thảm của người nông dân trước Cách mạng và vẻ đẹp tâm hồn họ', 'Phê phán sự lười nhác của người nông dân', 'Kể lại một chuyến đi xa'],
      1,
      'Truyện phản ánh số phận bi thảm của người nông dân nghèo và ngợi ca lòng tự trọng, tình phụ tử của họ.',
      ['"Lão Hạc" là đỉnh cao của dòng <b>truyện hiện thực phê phán trước 1945</b>, cùng với "Tức nước vỡ bờ" (Ngô Tất Tố).',
       '<b>Chủ đề</b> gồm hai mặt không tách rời:<ul><li>phản ánh <b>số phận bi thảm</b> của người nông dân nghèo trước Cách mạng</li><li>ngợi ca <b>vẻ đẹp tâm hồn</b> của họ — lòng tự trọng cao quý, tình phụ tử sâu nặng, ý thức giữ danh dự đến hơi thở cuối</li></ul>',
       '<b>Nghệ thuật</b>: nhân vật chân thực với tâm lí sâu sắc; đan xen ngôn ngữ người kể chuyện và nhân vật; <b>kết thúc đột ngột</b> gây xúc động mạnh; ngôn ngữ mộc mạc, giàu chất đời thường.'],
      ['Sai — truyện không lãng mạn hoá nông thôn.',
       'Đúng — vừa phản ánh số phận bi thảm, vừa ngợi ca vẻ đẹp tâm hồn.',
       'Sai — Nam Cao trân trọng chứ không phê phán người nông dân.',
       'Sai — đó không phải nội dung của truyện.']),
    Q('Tiếng Việt lớp 8 chia câu theo mục đích nói thành NĂM kiểu nào?',
      ['Câu đơn, câu ghép, câu phức, câu rút gọn, câu đặc biệt', 'Câu chủ động, câu bị động, câu khẳng định, câu phủ định, câu tường thuật', 'Câu nghi vấn, cầu khiến, cảm thán, trần thuật, phủ định', 'Câu diễn dịch, quy nạp, song hành, móc xích, tổng - phân - hợp'],
      2,
      'Năm kiểu câu theo mục đích nói: nghi vấn, cầu khiến, cảm thán, trần thuật, phủ định.',
      ['Phần Tiếng Việt lớp 8 có nhiều cách phân loại câu, rất dễ lẫn vì cùng gọi là "kiểu câu".',
       '<b>Chia theo mục đích nói</b> — năm kiểu:<ul><li><b>nghi vấn</b> (hỏi)</li><li><b>cầu khiến</b> (yêu cầu, đề nghị)</li><li><b>cảm thán</b> (bộc lộ cảm xúc)</li><li><b>trần thuật</b> (kể, thông báo)</li><li><b>phủ định</b></li></ul>',
       'Các cách phân loại khác: theo <i>cấu tạo</i> (câu đơn, câu ghép — với các quan hệ ý nghĩa nhân quả, tương phản, điều kiện…); còn <i>diễn dịch, quy nạp, tổng - phân - hợp</i> là cách triển khai <b>đoạn văn</b>, không phải kiểu câu.'],
      ['Sai — đó là phân loại theo cấu tạo câu.',
       'Sai — đó là những cặp đối lập khác, không phải năm kiểu theo mục đích nói.',
       'Đúng — nghi vấn, cầu khiến, cảm thán, trần thuật, phủ định.',
       'Sai — đó là các cách triển khai đoạn văn.']),
    Q('Bài thơ "Quê hương" là của tác giả nào?',
      ['Thế Lữ', 'Vũ Đình Liên', 'Tế Hanh', 'Hồ Chí Minh'],
      2,
      '"Quê hương" là của Tế Hanh; "Nhớ rừng" của Thế Lữ; "Ông đồ" của Vũ Đình Liên.',
      ['Cụm thơ lãng mạn và thơ cách mạng của Ngữ Văn 8 cần nhớ đúng cặp <b>tác phẩm ↔ tác giả</b>.',
       '<ul><li><b>"Nhớ rừng"</b> — <b>Thế Lữ</b></li><li><b>"Ông đồ"</b> — <b>Vũ Đình Liên</b></li><li><b>"Quê hương"</b> — <b>Tế Hanh</b></li><li><b>"Tức cảnh Pác Bó", "Ngắm trăng", "Đi đường"</b> — <b>Hồ Chí Minh</b>: tinh thần lạc quan, yêu thiên nhiên, bản lĩnh chiến sĩ</li></ul>',
       'Về thể thơ: lớp 8 học <b>thơ tám chữ</b> và <b>thất ngôn tứ tuyệt Đường luật</b>.'],
      ['Sai — Thế Lữ là tác giả "Nhớ rừng".',
       'Sai — Vũ Đình Liên là tác giả "Ông đồ".',
       'Đúng — "Quê hương" của Tế Hanh.',
       'Sai — thơ Hồ Chí Minh trong chương trình là "Ngắm trăng", "Đi đường", "Tức cảnh Pác Bó".']),
    Q('Kiểu bài tập làm văn trọng tâm của HỌC KÌ I lớp 8 là gì?',
      ['Văn thuyết minh', 'Văn nghị luận về tư tưởng đạo lí', 'Văn tự sự sáng tạo', 'Văn biểu cảm'],
      0,
      'Học kì I lớp 8 tập trung văn thuyết minh; học kì II chuyển sang văn nghị luận.',
      ['Tập làm văn lớp 8 chia rõ theo hai học kì.',
       '<ul><li><b>Học kì I — văn thuyết minh</b>: các phương pháp nêu định nghĩa, số liệu, ví dụ, so sánh; cấu trúc bài thuyết minh về đồ vật, di tích hoặc danh nhân</li><li><b>Học kì II — văn nghị luận</b>: luận điểm, luận cứ, lập luận; nghị luận về <i>sự việc, hiện tượng</i> và về <i>vấn đề tư tưởng đạo lí</i></li></ul>',
       'Kĩ năng viết đoạn xuyên suốt cả năm: <b>diễn dịch</b>, <b>quy nạp</b>, <b>tổng - phân - hợp</b>. Cách ôn hiệu quả: lập bảng Tác giả – Tác phẩm – Thể loại – Nội dung – Nghệ thuật rồi luyện đề hằng ngày.'],
      ['Đúng — học kì I trọng tâm là văn thuyết minh.',
       'Sai — nghị luận về tư tưởng đạo lí thuộc học kì II.',
       'Sai — tự sự sáng tạo không phải trọng tâm lớp 8.',
       'Sai — văn biểu cảm là trọng tâm của lớp 7.']),
    Q('Ở lớp 9, em sẽ học những truyện ngắn hiện đại Việt Nam nào?',
      ['"Cô bé bán diêm", "Chiếc lá cuối cùng"', '"Lão Hạc", "Tức nước vỡ bờ"', '"Trong lòng mẹ", "Ông đồ"', '"Làng", "Chiếc lược ngà", "Lặng lẽ Sa Pa"'],
      3,
      'Lớp 9 học "Làng" (Kim Lân), "Chiếc lược ngà" (Nguyễn Quang Sáng), "Lặng lẽ Sa Pa" (Nguyễn Thành Long).',
      ['Lớp 8 đã đi qua truyện hiện thực trước 1945 ("Lão Hạc", "Tức nước vỡ bờ"), hồi kí ("Trong lòng mẹ") và truyện nước ngoài ("Cô bé bán diêm", "Đánh nhau với cối xay gió", "Chiếc lá cuối cùng").',
       'Lớp 9 mở sang <b>truyện ngắn hiện đại Việt Nam</b>:<ul><li><b>"Làng"</b> — Kim Lân</li><li><b>"Chiếc lược ngà"</b> — Nguyễn Quang Sáng</li><li><b>"Lặng lẽ Sa Pa"</b> — Nguyễn Thành Long</li></ul>',
       'Cùng với đó: thơ hiện đại và thơ lãng mạn 1930–1945 đặc sắc hơn; <b>nghị luận xã hội</b> và <b>nghị luận văn học</b> ở mức sâu hơn; Tiếng Việt học <b>khởi ngữ</b>, <b>thành phần biệt lập</b> và <b>liên kết câu</b> trong đoạn và bài.'],
      ['Sai — đó là truyện nước ngoài đã học ở lớp 8.',
       'Sai — hai truyện này học ở lớp 8.',
       'Sai — cả hai đều là tác phẩm lớp 8.',
       'Đúng — ba truyện ngắn hiện đại của chương trình lớp 9.']),
  ]),
];

export const S8NV_SCENARIOS = indexBy(S8NV_WEEKS);
