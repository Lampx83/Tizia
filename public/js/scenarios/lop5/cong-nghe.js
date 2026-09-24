// ============================================================
// Lớp 5 · CÔNG NGHỆ — 35 tuần (HK1: 1–18 · HK2: 19–35)
// Bám CT GDPT 2018 môn Công nghệ Lớp 5.
// ID prefix: "P5CN-wNN-quiz".
// ============================================================
import { Q, W, indexBy } from './_helper.js';

const M = (n, title, qs, opts) => W('P5CN', 'cong-nghe', n, title, qs, opts);

export const P5CN_WEEKS = [
  // ──────────────── HK1 ────────────────
  M(1, 'Vai trò của công nghệ', [
    Q('Công nghệ giúp con người?', ['Làm việc nhanh hơn, tốt hơn', 'Lười biếng', 'Mệt mỏi', 'Không lợi'], 0, 'Công nghệ giúp việc nhanh và tốt hơn.', ['Đúng — công nghệ giúp ta làm việc nhanh hơn và tốt hơn.', 'Sai — công nghệ không khiến con người lười biếng.', 'Sai — công nghệ giúp đỡ ta chứ không làm ta mệt mỏi.', 'Sai — công nghệ mang lại rất nhiều lợi ích.']),
    Q('Ví dụ về công nghệ trong nhà?', ['Cây cảnh trong chậu', 'Chén bát', 'Tivi, tủ lạnh, máy giặt', 'Ghế gỗ'], 2, 'Tivi, tủ lạnh, máy giặt là sản phẩm công nghệ.', ['Sai — cây cảnh là cây trồng, không phải sản phẩm công nghệ.', 'Sai — chén bát là đồ dùng thường, không chạy điện.', 'Đúng — tivi, tủ lạnh, máy giặt là sản phẩm công nghệ trong nhà.', 'Sai — ghế gỗ là đồ dùng đơn giản, không phải máy móc.']),
    Q('Sử dụng công nghệ em cần?', ['Đúng cách, an toàn', 'Tuỳ tiện', 'Dùng quá công suất cho phép', 'Không quan tâm'], 0, 'Đúng cách và an toàn.', ['Đúng — dùng đúng cách và an toàn mới tốt.', 'Sai — dùng tuỳ tiện dễ gây hỏng hóc, nguy hiểm.', 'Sai — dùng quá công suất cho phép rất nguy hiểm.', 'Sai — phải quan tâm để dùng an toàn.']),
    Q('Công nghệ có thể có hại nếu?', ['Dùng đúng', 'Dùng sai cách', 'Bảo quản tốt', 'Không dùng'], 1, 'Dùng sai gây nguy hiểm.', ['Sai — dùng đúng thì công nghệ rất hữu ích.', 'Đúng — dùng sai cách mới gây hại, nguy hiểm.', 'Sai — bảo quản tốt giúp đồ bền và an toàn hơn.', 'Sai — không dùng thì không gây hại.']),
  ]),

  M(2, 'Trồng rau ăn lá — Chuẩn bị', [
    Q('Rau ăn lá phổ biến?', ['Rau muống, cải, mồng tơi', 'Hành tỏi (lấy củ)', 'Khoai tây', 'Cà rốt'], 0, 'Rau muống, cải, mồng tơi.', ['Đúng — rau muống, cải, mồng tơi là rau ăn lá quen thuộc.', 'Sai — hành tỏi là loại lấy củ, không ăn lá.', 'Sai — khoai tây là cây lấy củ.', 'Sai — cà rốt là cây lấy củ.']),
    Q('Chuẩn bị trồng rau cần?', ['Chỉ cần nước tưới là đủ', 'Hạt giống và phân bón, không cần đất', 'Đất và dụng cụ, không cần hạt', 'Đất, hạt giống, dụng cụ'], 3, 'Đất, hạt giống, dụng cụ là cơ bản.', ['Sai — chỉ có nước thì không thể trồng rau được.', 'Sai — trồng rau lá vẫn cần đất để cây bám rễ.', 'Sai — thiếu hạt giống thì không có cây để trồng.', 'Đúng — cần đủ đất, hạt giống và dụng cụ.']),
    Q('Đất trồng rau tốt nhất?', ['Đất khô cứng', 'Đất tơi xốp, ẩm', 'Cát khô', 'Đất phèn'], 1, 'Đất tơi xốp và ẩm.', ['Sai — đất khô cứng làm rễ khó phát triển.', 'Đúng — đất tơi xốp, ẩm giúp rễ cây dễ mọc.', 'Sai — cát khô không giữ được nước và dinh dưỡng.', 'Sai — đất phèn chua, cây khó sống.']),
    Q('Vị trí trồng rau lá?', ['Trong tủ', 'Nắng gắt cả ngày', 'Nơi có ánh nắng vừa', 'Tối hoàn toàn'], 2, 'Nắng vừa, không quá gắt.', ['Sai — trong tủ thiếu ánh sáng, cây không sống được.', 'Sai — nắng gắt cả ngày làm rau héo.', 'Đúng — nơi có ánh nắng vừa giúp rau xanh tốt.', 'Sai — tối hoàn toàn thì cây không quang hợp được.']),
  ]),

  M(3, 'Trồng rau ăn lá — Gieo hạt', [
    Q('Trước khi gieo, đất cần?', ['Đổ nước nhiều', 'Làm tơi, có rãnh', 'Nén chặt', 'Để khô'], 1, 'Làm tơi và có rãnh.', ['Sai — đổ nước nhiều làm đất nhão, hạt dễ úng.', 'Đúng — làm đất tơi và tạo rãnh để gieo hạt.', 'Sai — nén chặt làm hạt khó nảy mầm.', 'Sai — đất quá khô thì hạt khó nảy mầm.']),
    Q('Khi gieo hạt em nên?', ['Đè sâu', 'Để trên mặt', 'Rắc đều, lấp đất mỏng', 'Vứt bừa'], 2, 'Rắc đều và lấp mỏng.', ['Sai — đè quá sâu hạt khó ngoi lên.', 'Sai — để trần trên mặt, hạt dễ khô hoặc bị trôi.', 'Đúng — rắc đều rồi lấp đất mỏng là cách gieo tốt.', 'Sai — vứt bừa thì hạt mọc không đều.']),
    Q('Tưới sau gieo?', ['Không tưới', 'Tưới nhẹ bằng vòi phun', 'Đổ nước nhiều', 'Tưới nước nóng'], 1, 'Tưới nhẹ tránh trôi hạt.', ['Sai — không tưới thì hạt thiếu nước, khó nảy.', 'Đúng — tưới nhẹ bằng vòi phun để không trôi hạt.', 'Sai — đổ nhiều nước sẽ làm trôi hạt vừa gieo.', 'Sai — nước nóng làm chết hạt giống.']),
    Q('Bao lâu hạt nảy mầm?', ['Vài ngày', 'Vài giây', 'Một năm', 'Một tháng'], 0, 'Hạt rau lá nảy trong vài ngày.', ['Đúng — hạt rau lá thường nảy mầm sau vài ngày.', 'Sai — vài giây là quá nhanh, không thể có.', 'Sai — một năm là quá lâu cho rau ăn lá.', 'Sai — một tháng là quá lâu cho hạt rau lá.']),
  ]),

  M(4, 'Trồng rau — Chăm sóc và thu hoạch', [
    Q('Chăm sóc rau gồm?', ['Tưới, làm cỏ, bón phân', 'Bỏ mặc', 'Chỉ phun thuốc trừ sâu mỗi ngày', 'Chỉ tưới nước, không cần làm cỏ'], 0, 'Tưới, làm cỏ, bón phân.', ['Đúng — chăm rau gồm tưới nước, làm cỏ và bón phân.', 'Sai — bỏ mặc thì rau còi cọc, chết dần.', 'Sai — phun thuốc mỗi ngày rất hại, không cần thiết.', 'Sai — phải làm cỏ để cỏ dại không tranh dinh dưỡng.']),
    Q('Tưới rau thường vào?', ['Không tưới', 'Đêm khuya', 'Sáng sớm hoặc chiều mát', 'Trưa nắng gắt'], 2, 'Sáng sớm hoặc chiều mát.', ['Sai — không tưới thì rau khô héo.', 'Sai — đêm khuya tưới dễ làm rau úng, sâu bệnh.', 'Đúng — tưới sáng sớm hoặc chiều mát là tốt nhất.', 'Sai — trưa nắng gắt tưới làm rau dễ héo, sốc nhiệt.']),
    Q('Khi rau bị sâu em nên?', ['Phun thuốc bừa', 'Phun thuốc trừ sâu nồng độ cao', 'Chặt cây', 'Bắt sâu hoặc dùng biện pháp sinh học'], 3, 'Bắt sâu hoặc sinh học là an toàn.', ['Sai — phun thuốc bừa rất hại sức khoẻ và rau.', 'Sai — thuốc nồng độ cao gây độc cho người ăn.', 'Sai — chặt cây thì mất luôn rau.', 'Đúng — bắt sâu hoặc dùng biện pháp sinh học là an toàn.']),
    Q('Khi nào thu hoạch?', ['Ngay khi cây vừa ra lá thật', 'Khi cây mới gieo', 'Khi héo', 'Khi cây đủ lớn, lá xanh tốt'], 3, 'Khi cây đủ lớn và xanh tốt.', ['Sai — cây vừa ra lá thật còn quá non.', 'Sai — cây mới gieo chưa có gì để thu.', 'Sai — khi héo thì rau đã hỏng, không ngon.', 'Đúng — thu hoạch khi cây đủ lớn, lá xanh tốt.']),
  ]),

  M(5, 'Chăm sóc gà', [
    Q('Gà cần được?', ['Cho ăn uống đầy đủ, ở chỗ sạch', 'Nhốt chật', 'Bỏ đói', 'Không vệ sinh'], 0, 'Cho ăn uống và vệ sinh.', ['Đúng — gà cần ăn uống đầy đủ và ở chỗ sạch sẽ.', 'Sai — nhốt chật khiến gà ngột ngạt, dễ bệnh.', 'Sai — bỏ đói thì gà yếu và chết.', 'Sai — không vệ sinh làm gà dễ mắc bệnh.']),
    Q('Thức ăn cho gà?', ['Cám, ngô, gạo, rau', 'Chỉ cho ăn thóc nguyên hạt', 'Bánh kẹo và đồ ngọt', 'Thức ăn thừa của người'], 0, 'Cám, ngô, gạo, rau.', ['Đúng — gà ăn cám, ngô, gạo và rau xanh.', 'Sai — chỉ thóc thì gà thiếu chất, không đủ dinh dưỡng.', 'Sai — bánh kẹo, đồ ngọt không hợp cho gà.', 'Sai — thức ăn thừa của người dễ làm gà bệnh.']),
    Q('Chuồng gà cần?', ['Sạch, thoáng, có mái che', 'Ngập nước', 'Tối, kín gió, ít ánh sáng', 'Nắng gắt'], 0, 'Sạch, thoáng và có mái.', ['Đúng — chuồng gà cần sạch, thoáng và có mái che.', 'Sai — ngập nước làm gà lạnh và dễ bệnh.', 'Sai — tối, kín gió khiến gà thiếu không khí.', 'Sai — nắng gắt làm gà nóng, khó chịu.']),
    Q('Khi gà bệnh em nên?', ['Báo người lớn, tách riêng', 'Để chung', 'Đánh gà', 'Bỏ mặc'], 0, 'Báo người lớn và tách riêng.', ['Đúng — báo người lớn và tách gà bệnh ra riêng.', 'Sai — để chung dễ lây bệnh cho cả đàn.', 'Sai — đánh gà là sai, không giúp gà khỏi bệnh.', 'Sai — bỏ mặc khiến gà bệnh nặng hơn.']),
  ]),

  M(6, 'Chăm sóc cá cảnh', [
    Q('Cá cảnh sống ở?', ['Bể nước sạch', 'Trên cạn', 'Nước bẩn', 'Trong cát'], 0, 'Bể nước sạch.', ['Đúng — cá cảnh sống trong bể nước sạch.', 'Sai — cá không thể sống trên cạn.', 'Sai — nước bẩn làm cá ngạt và chết.', 'Sai — cá sống trong nước, không phải trong cát.']),
    Q('Cho cá ăn?', ['Rất nhiều', 'Lượng vừa đủ, không thừa', 'Không cho', 'Cho cả ngày'], 1, 'Vừa đủ tránh ô nhiễm nước.', ['Sai — cho quá nhiều làm thức ăn thừa, bẩn nước.', 'Đúng — cho lượng vừa đủ để nước không bị ô nhiễm.', 'Sai — không cho ăn thì cá đói.', 'Sai — cho ăn cả ngày làm dư thừa, bẩn nước.']),
    Q('Thay nước bể cá?', ['Thay hết mỗi ngày', 'Không bao giờ', 'Thay khi nước chuyển màu đục', 'Định kì 1 phần, không thay hết'], 3, 'Thay 1 phần định kì.', ['Sai — thay hết mỗi ngày làm cá bị sốc nước.', 'Sai — không thay bao giờ thì nước bẩn, cá bệnh.', 'Sai — chờ nước đục mới thay là quá muộn.', 'Đúng — nên thay một phần nước định kì là tốt nhất.']),
    Q('Cá cần?', ['Oxy trong nước (sủi khí)', 'Đá nước', 'Không oxy', 'Sôi nước'], 0, 'Cần oxy hoà tan.', ['Đúng — cá cần oxy hoà tan trong nước (sủi khí).', 'Sai — đá nước làm nước lạnh, không phải thứ cá cần.', 'Sai — không có oxy thì cá ngạt thở.', 'Sai — nước sôi nóng sẽ làm chết cá.']),
  ]),

  M(7, 'An toàn điện trong nhà — Cơ bản', [
    Q('Điện có thể gây?', ['Vui vẻ', 'Giật, cháy nổ', 'Không hại', 'Mát mẻ'], 1, 'Điện có thể giật và gây cháy.', ['Sai — điện rất hữu ích nhưng cũng nguy hiểm, không phải chuyện đùa.', 'Đúng — dùng sai điện có thể gây giật và cháy nổ.', 'Sai — điện có thể gây nguy hiểm nếu dùng sai.', 'Sai — điện không phải để làm mát, nó có thể gây giật.']),
    Q('Khi tay ướt em?', ['Cứ chạm', 'Nhúng vào', 'KHÔNG chạm vào ổ điện', 'Bấm thử'], 2, 'Tuyệt đối không chạm khi tay ướt.', ['Sai — tay ướt chạm điện rất dễ bị giật.', 'Sai — nhúng vào ổ điện cực kỳ nguy hiểm.', 'Đúng — tuyệt đối không chạm ổ điện khi tay ướt.', 'Sai — bấm thử khi tay ướt rất nguy hiểm.']),
    Q('Dây điện hở em?', ['Quấn băng dính rồi dùng', 'Báo người lớn, không tự sửa', 'Tự sửa', 'Cắt bỏ đoạn dây bị hở'], 1, 'Báo người lớn để sửa đúng cách.', ['Sai — quấn băng dính tạm thời vẫn không an toàn.', 'Đúng — báo người lớn để sửa đúng cách, em không tự làm.', 'Sai — tự sửa dây điện rất nguy hiểm.', 'Sai — em không nên tự cắt dây điện.']),
    Q('Ổ điện trẻ em không dùng?', ['Cho em chơi', 'Cần bịt kín', 'Đút que vào', 'Mở thoải mái'], 1, 'Bịt kín ổ điện không dùng.', ['Sai — cho em chơi ổ điện rất nguy hiểm.', 'Đúng — ổ điện không dùng nên bịt kín để an toàn.', 'Sai — đút que vào ổ điện dễ bị giật.', 'Sai — để hở ổ điện không an toàn cho trẻ nhỏ.']),
  ]),

  M(8, 'An toàn điện — Nâng cao', [
    Q('Khi sấm sét em?', ['Ra ngoài cây cao', 'Dùng nhiều', 'Đứng dưới cây cao trú mưa', 'Không dùng thiết bị điện'], 3, 'Không dùng thiết bị điện khi sét.', ['Sai — ra ngoài cây cao khi sét rất nguy hiểm.', 'Sai — dùng nhiều thiết bị điện khi sét càng nguy hiểm.', 'Sai — đứng dưới cây cao khi sét dễ bị sét đánh.', 'Đúng — khi sấm sét không nên dùng thiết bị điện.']),
    Q('Cầu dao điện dùng để?', ['Trang trí', 'Đo lượng điện đã dùng', 'Không dùng', 'Ngắt điện khẩn cấp'], 3, 'Cầu dao ngắt điện khi cần.', ['Sai — cầu dao không phải để trang trí.', 'Sai — đo lượng điện là việc của đồng hồ điện.', 'Sai — cầu dao rất cần để ngắt điện khi nguy hiểm.', 'Đúng — cầu dao dùng để ngắt điện khẩn cấp.']),
    Q('Khi thấy người bị điện giật?', ['Ngắt điện rồi gọi cấp cứu, không sờ trực tiếp', 'Dùng tay kéo nạn nhân ra ngay', 'Bỏ chạy', 'Sờ vào kéo ra'], 0, 'Ngắt điện trước, không sờ trực tiếp.', ['Đúng — phải ngắt điện rồi gọi cấp cứu, không sờ trực tiếp.', 'Sai — kéo bằng tay khi còn điện thì em cũng bị giật.', 'Sai — bỏ chạy không giúp được nạn nhân.', 'Sai — sờ vào khi còn điện rất nguy hiểm.']),
    Q('Phích cắm rút?', ['Cắn dây', 'Kéo cả phích lẫn dây cùng lúc', 'Kéo dây', 'Cầm phích, không kéo dây'], 3, 'Cầm phích, không kéo dây.', ['Sai — cắn dây điện rất nguy hiểm.', 'Sai — không nên giật mạnh cả dây như vậy.', 'Sai — kéo dây dễ làm đứt và hở dây điện.', 'Đúng — phải cầm phích để rút, không kéo dây.']),
  ]),

  M(9, 'Sử dụng quạt máy', [
    Q('Quạt máy chạy bằng?', ['Điện', 'Hơi nước nóng', 'Sức gió tự nhiên', 'Tay quay thủ công'], 0, 'Quạt máy chạy bằng điện.', ['Đúng — quạt máy chạy bằng điện.', 'Sai — quạt máy không dùng hơi nước nóng.', 'Sai — quạt máy không chạy bằng sức gió tự nhiên.', 'Sai — quạt máy không quay bằng tay.']),
    Q('Bộ phận chính của quạt?', ['Bánh xe', 'Động cơ, cánh quạt', 'Lò xo và bánh răng', 'Ốc vít'], 1, 'Động cơ và cánh quạt.', ['Sai — quạt không chạy nhờ bánh xe.', 'Đúng — động cơ và cánh quạt là bộ phận chính.', 'Sai — lò xo, bánh răng không phải bộ phận chính của quạt.', 'Sai — ốc vít chỉ để gắn, không phải bộ phận chính.']),
    Q('Khi quạt đang chạy em?', ['KHÔNG cho tay vào cánh', 'Cho que vào', 'Cho tay', 'Lay quạt'], 0, 'Không cho tay vào cánh đang quay.', ['Đúng — không cho tay vào cánh quạt đang quay.', 'Sai — cho que vào cánh quạt rất nguy hiểm.', 'Sai — cho tay vào cánh đang quay sẽ bị thương.', 'Sai — lay quạt đang chạy dễ làm đổ, hỏng.']),
    Q('Vệ sinh quạt cần?', ['Phun nước', 'Không vệ sinh', 'Lau lúc chạy', 'Tắt điện trước khi lau'], 3, 'Tắt điện trước khi lau.', ['Sai — phun nước vào quạt điện rất nguy hiểm.', 'Sai — không vệ sinh thì quạt bám bụi, chạy yếu.', 'Sai — lau lúc quạt chạy dễ bị thương.', 'Đúng — phải tắt điện trước khi lau quạt.']),
  ]),

  M(10, 'Sử dụng bàn ủi (bàn là)', [
    Q('Bàn ủi dùng để?', ['Đập gập mép quần áo', 'Là phẳng quần áo', 'Cắt vải thành miếng nhỏ', 'Hâm nóng thức ăn nhanh'], 1, 'Là phẳng quần áo.', ['Sai — bàn ủi không dùng để đập gập mép.', 'Đúng — bàn ủi dùng để là phẳng quần áo.', 'Sai — bàn ủi không phải để cắt vải.', 'Sai — bàn ủi không dùng để hâm thức ăn.']),
    Q('Bàn ủi nóng có thể?', ['Vô hại', 'Làm mát da khi chạm vào', 'Tốt cho da', 'Gây bỏng'], 3, 'Bàn ủi nóng gây bỏng nguy hiểm.', ['Sai — bàn ủi nóng không hề vô hại.', 'Sai — bàn ủi nóng không làm mát, nó làm bỏng.', 'Sai — chạm bàn ủi nóng hại da chứ không tốt.', 'Đúng — bàn ủi nóng có thể gây bỏng, rất nguy hiểm.']),
    Q('Sau khi dùng bàn ủi?', ['Để cắm điện', 'Vứt sàn', 'Đặt thấp', 'Rút điện, đặt nơi cao tránh trẻ nhỏ'], 3, 'Rút điện và đặt nơi an toàn.', ['Sai — để cắm điện dễ gây cháy.', 'Sai — vứt sàn dễ làm cháy sàn và nguy hiểm.', 'Sai — đặt thấp thì trẻ nhỏ dễ chạm phải.', 'Đúng — rút điện và đặt nơi cao tránh trẻ nhỏ.']),
    Q('Khi là quần áo em nên?', ['Là khô', 'Theo nhiệt độ phù hợp loại vải', 'Không cần biết', 'Là nhiệt cao nhất'], 1, 'Theo nhiệt độ phù hợp.', ['Sai — chỉ là khô là chưa đủ, còn phải chỉnh nhiệt.', 'Đúng — chỉnh nhiệt độ phù hợp với từng loại vải.', 'Sai — cần biết để không làm cháy quần áo.', 'Sai — nhiệt cao nhất dễ làm cháy vải mỏng.']),
  ]),

  M(11, 'Máy vi tính — Vai trò', [
    Q('Máy vi tính giúp?', ['Mất thời gian', 'Học tập, làm việc, giải trí', 'Không lợi', 'Chỉ chơi game'], 1, 'Học tập, làm việc, giải trí.', ['Sai — dùng đúng thì máy tính giúp tiết kiệm thời gian.', 'Đúng — máy tính giúp học tập, làm việc và giải trí.', 'Sai — máy tính mang lại nhiều lợi ích.', 'Sai — máy tính làm được nhiều việc, không chỉ chơi game.']),
    Q('Bộ phận chính của máy tính?', ['Màn hình, bàn phím, chuột, CPU', 'Ăng-ten', 'Bánh xe', 'Loa ngoài và đĩa CD'], 0, 'Màn hình, bàn phím, chuột, CPU.', ['Đúng — màn hình, bàn phím, chuột, CPU là bộ phận chính.', 'Sai — ăng-ten không phải bộ phận chính của máy tính.', 'Sai — máy tính không có bánh xe.', 'Sai — loa và đĩa CD chỉ là phụ kiện thêm.']),
    Q('Chức năng của CPU?', ['Phát âm thanh', 'Hiển thị', 'Xử lý thông tin', 'Nhập liệu từ bàn phím'], 2, 'CPU là bộ xử lý.', ['Sai — phát âm thanh là việc của loa.', 'Sai — hiển thị là việc của màn hình.', 'Đúng — CPU là bộ xử lý thông tin của máy tính.', 'Sai — nhập liệu là việc của bàn phím.']),
    Q('Màn hình để?', ['Xử lý các phép tính', 'In tài liệu ra giấy', 'Nhập liệu', 'Hiển thị thông tin'], 3, 'Màn hình hiển thị.', ['Sai — xử lý phép tính là việc của CPU.', 'Sai — in ra giấy là việc của máy in.', 'Sai — nhập liệu là việc của bàn phím, chuột.', 'Đúng — màn hình để hiển thị thông tin cho ta xem.']),
  ]),

  M(12, 'Máy vi tính — An toàn', [
    Q('Khoảng cách mắt - màn hình?', ['Sát mắt', 'Khoảng 10-20 cm là đủ', 'Khoảng 50-70 cm', '3m'], 2, '50-70 cm là an toàn cho mắt.', ['Sai — ngồi sát màn hình rất hại mắt.', 'Sai — 10-20 cm là quá gần, hại mắt.', 'Đúng — khoảng 50-70 cm là an toàn cho mắt.', 'Sai — 3m thì quá xa, không nhìn rõ.']),
    Q('Sau bao lâu nên nghỉ mắt?', ['Không nghỉ', 'Cả ngày liền', 'Mỗi 30 phút nghỉ vài phút', '1 tuần'], 2, 'Mỗi 30 phút nghỉ vài phút.', ['Sai — không nghỉ làm mắt mỏi và hại mắt.', 'Sai — nhìn cả ngày liền rất hại mắt.', 'Đúng — cứ mỗi 30 phút nên nghỉ mắt vài phút.', 'Sai — đợi cả tuần mới nghỉ là quá lâu.']),
    Q('Khi mưa to em?', ['Tắt máy và rút điện', 'Cứ dùng', 'Lau bằng nước', 'Đút phích vào ổ ướt'], 0, 'Tắt máy và rút điện.', ['Đúng — khi mưa to nên tắt máy và rút điện cho an toàn.', 'Sai — cứ dùng khi mưa to dễ bị sét, chập điện.', 'Sai — lau máy bằng nước rất nguy hiểm.', 'Sai — đút phích vào ổ ướt dễ bị giật.']),
    Q('Lướt internet em?', ['Vào trang lành mạnh', 'Nhấn link lạ', 'Trang lạ bất kì', 'Cho người lạ thông tin'], 0, 'Chỉ vào trang an toàn.', ['Đúng — chỉ nên vào những trang lành mạnh, an toàn.', 'Sai — nhấn link lạ dễ dính virus, lừa đảo.', 'Sai — trang lạ bất kì có thể chứa nội dung xấu.', 'Sai — không cho người lạ thông tin của mình.']),
  ]),

  M(13, 'Sử dụng internet an toàn', [
    Q('Khi gặp nội dung xấu?', ['Xem tiếp', 'Lưu lại', 'Chia sẻ bạn', 'Tắt và báo người lớn'], 3, 'Tắt và báo người lớn.', ['Sai — không nên xem tiếp nội dung xấu.', 'Sai — không nên lưu lại nội dung xấu.', 'Sai — chia sẻ cho bạn là lan truyền cái xấu.', 'Đúng — nên tắt đi và báo cho người lớn biết.']),
    Q('KHÔNG nên cho người lạ?', ['Câu hỏi học', 'Thông tin cá nhân (tên, địa chỉ, ảnh)', 'Lời chào', 'Hình emoji'], 1, 'Không cho thông tin cá nhân.', ['Sai — hỏi bài học bình thường thì không sao.', 'Đúng — không cho người lạ tên, địa chỉ, ảnh của mình.', 'Sai — lời chào bình thường không có gì nguy hiểm.', 'Sai — gửi emoji không tiết lộ thông tin cá nhân.']),
    Q('Mật khẩu nên?', ['Mạnh, không chia sẻ ai', 'Cho bạn dùng chung', 'Đơn giản', 'Ghi nơi dễ thấy'], 0, 'Mật khẩu mạnh và bảo mật.', ['Đúng — mật khẩu nên mạnh và không chia sẻ với ai.', 'Sai — cho bạn dùng chung dễ mất an toàn.', 'Sai — mật khẩu đơn giản dễ bị đoán ra.', 'Sai — ghi nơi dễ thấy thì người khác sẽ biết.']),
    Q('Khi bị bắt nạt trên mạng?', ['Im lặng chịu đựng một mình', 'Trả đũa', 'Tự xử lý', 'Báo cha mẹ, không trả đũa'], 3, 'Báo cha mẹ ngay.', ['Sai — im lặng chịu đựng làm em buồn và cô đơn.', 'Sai — trả đũa làm mọi việc tệ hơn.', 'Sai — tự xử lý một mình không an toàn.', 'Đúng — nên báo cha mẹ và không trả đũa.']),
  ]),

  M(14, 'Ôn tập an toàn điện và thiết bị', [
    Q('Bảo quản điện thoại em?', ['Để chỗ ướt', 'Sạc đúng, không rơi', 'Sạc qua đêm', 'Để rơi'], 1, 'Sạc đúng và không rơi.', ['Sai — để chỗ ướt làm điện thoại hỏng.', 'Đúng — sạc đúng cách và giữ không bị rơi.', 'Sai — sạc qua đêm không tốt cho pin và an toàn.', 'Sai — để rơi làm điện thoại vỡ, hỏng.']),
    Q('Khi không dùng thiết bị?', ['Để chạy mãi', 'Để chế độ chờ (standby) cả đêm', 'Mở mức cao', 'Tắt và rút điện'], 3, 'Tắt và rút điện tiết kiệm.', ['Sai — để chạy mãi rất tốn điện.', 'Sai — để chế độ chờ cả đêm vẫn tốn điện.', 'Sai — mở mức cao càng tốn điện hơn.', 'Đúng — tắt và rút điện giúp tiết kiệm và an toàn.']),
    Q('Pin hỏng em?', ['Đập vỡ rồi vứt đi', 'Bỏ vào thùng pin riêng', 'Vứt thùng rác thường', 'Cho em bé'], 1, 'Pin hỏng phải xử lý đúng cách.', ['Sai — đập vỡ pin rất nguy hiểm và độc hại.', 'Đúng — pin hỏng nên bỏ vào thùng pin riêng.', 'Sai — vứt thùng rác thường gây ô nhiễm môi trường.', 'Sai — cho em bé rất nguy hiểm, pin có chất độc.']),
    Q('Tiết kiệm điện bằng?', ['Bỏ mặc', 'Tắt thiết bị khi không dùng', 'Mở nhiều', 'Bật cả ngày'], 1, 'Tắt khi không dùng.', ['Sai — bỏ mặc thiết bị chạy thì rất tốn điện.', 'Đúng — tắt thiết bị khi không dùng để tiết kiệm điện.', 'Sai — mở nhiều thiết bị càng tốn điện.', 'Sai — bật cả ngày rất lãng phí điện.']),
  ]),

  M(15, 'Lắp ghép mô hình — Giới thiệu', [
    Q('Mô hình lắp ghép là?', ['Tranh vẽ trên giấy', 'Đồ chơi từ các chi tiết ghép', 'Bánh kẹo', 'Quần áo'], 1, 'Đồ chơi từ chi tiết ghép lại.', ['Sai — tranh vẽ không phải mô hình lắp ghép.', 'Đúng — mô hình lắp ghép là đồ chơi từ các chi tiết ghép lại.', 'Sai — bánh kẹo là đồ ăn, không phải mô hình.', 'Sai — quần áo không phải mô hình lắp ghép.']),
    Q('Vật liệu lắp ghép?', ['Đinh và búa lớn', 'Que, ốc vít, bánh xe…', 'Đất sét ướt', 'Dây điện và pin cao áp'], 1, 'Que, ốc vít, bánh xe.', ['Sai — đinh và búa lớn không phải vật liệu lắp ghép mô hình.', 'Đúng — que, ốc vít, bánh xe là vật liệu lắp ghép.', 'Sai — đất sét ướt là vật liệu nặn, không phải lắp ghép.', 'Sai — pin cao áp rất nguy hiểm, không dùng để lắp ghép.']),
    Q('Dụng cụ cần?', ['Mỏ hàn nhiệt độ cao', 'Cờ-lê, tua vít', 'Cưa gỗ tay', 'Búa lớn'], 1, 'Cờ-lê và tua vít là cơ bản.', ['Sai — mỏ hàn nóng nguy hiểm, không hợp với học sinh.', 'Đúng — cờ-lê và tua vít là dụng cụ cơ bản để lắp ghép.', 'Sai — cưa gỗ dùng để cưa, không phải lắp ghép.', 'Sai — búa lớn không cần cho việc lắp ghép mô hình.']),
    Q('Trước khi lắp em nên?', ['Lắp ngay', 'Đọc hướng dẫn', 'Tháo rời các chi tiết ra trước', 'Bỏ qua'], 1, 'Đọc hướng dẫn trước.', ['Sai — lắp ngay khi chưa hiểu dễ làm sai.', 'Đúng — nên đọc hướng dẫn trước khi lắp.', 'Sai — không cần tháo rời tất cả ra trước.', 'Sai — bỏ qua bước chuẩn bị dễ lắp sai.']),
  ]),

  M(16, 'Lắp ghép mô hình xe', [
    Q('Xe có bộ phận?', ['Cánh quạt và đuôi lái', 'Vây bơi và mang cá', 'Mỏ và lông vũ', 'Khung, bánh, trục'], 3, 'Khung, bánh, trục.', ['Sai — cánh quạt, đuôi lái là của máy bay.', 'Sai — vây bơi, mang cá là của con cá.', 'Sai — mỏ và lông vũ là của con chim.', 'Đúng — xe có khung, bánh và trục.']),
    Q('Bánh xe cần?', ['Lắp chắc vào trục, quay được', 'Lắp lỏng cho dễ tháo lại', 'Tách rời', 'Cố định'], 0, 'Lắp chắc và quay được.', ['Đúng — bánh xe phải lắp chắc vào trục và quay được.', 'Sai — lắp lỏng thì bánh dễ rơi ra khi chạy.', 'Sai — bánh tách rời thì xe không chạy được.', 'Sai — bánh cố định không quay thì xe không lăn.']),
    Q('Khi lắp em phải?', ['Vội vàng', 'Cẩu thả', 'Bỏ qua bước kiểm tra', 'Cẩn thận, không vội'], 3, 'Cẩn thận và không vội.', ['Sai — vội vàng dễ lắp sai, làm hỏng chi tiết.', 'Sai — cẩu thả thì sản phẩm không chắc chắn.', 'Sai — bỏ qua kiểm tra dễ để lỗi sót lại.', 'Đúng — phải lắp cẩn thận và không vội vàng.']),
    Q('Sản phẩm hoàn thành em?', ['Tháo rời ngay lập tức', 'Bỏ vào thùng rác', 'Kiểm tra hoạt động', 'Bỏ qua'], 2, 'Kiểm tra hoạt động.', ['Sai — tháo rời ngay thì uổng công lắp.', 'Sai — không nên vứt sản phẩm vừa làm xong.', 'Đúng — nên kiểm tra xem sản phẩm hoạt động tốt không.', 'Sai — bỏ qua thì không biết sản phẩm có chạy được không.']),
  ]),

  M(17, 'Ôn tập cuối HK1', [
    Q('HK1 em đã học?', ['Chỉ trồng rau', 'Không gì', 'Chỉ máy tính', 'Trồng rau, chăm gà-cá, an toàn điện, máy tính, lắp ghép'], 3, 'Nhiều nội dung HK1.', ['Sai — HK1 học nhiều thứ, không chỉ trồng rau.', 'Sai — HK1 em đã học rất nhiều nội dung.', 'Sai — máy tính chỉ là một phần trong nhiều nội dung.', 'Đúng — HK1 gồm trồng rau, chăm gà-cá, an toàn điện, máy tính, lắp ghép.']),
    Q('Sản phẩm công nghệ giúp em?', ['Chỉ làm phức tạp thêm', 'Học tập, sinh hoạt thuận tiện', 'Mất nhiều thời gian học', 'Khó khăn'], 1, 'Học và sinh hoạt thuận tiện.', ['Sai — sản phẩm công nghệ giúp việc dễ hơn, không phức tạp thêm.', 'Đúng — sản phẩm công nghệ giúp học tập và sinh hoạt thuận tiện.', 'Sai — dùng đúng thì tiết kiệm thời gian.', 'Sai — công nghệ giúp đỡ chứ không gây khó khăn.']),
    Q('Khi dùng thiết bị cần?', ['Không quan tâm', 'Tuỳ tiện', 'Đúng cách, an toàn', 'Dùng vượt công suất thiết kế'], 2, 'Đúng cách và an toàn.', ['Sai — phải quan tâm để dùng an toàn.', 'Sai — dùng tuỳ tiện dễ gây hỏng, nguy hiểm.', 'Đúng — dùng thiết bị cần đúng cách và an toàn.', 'Sai — dùng vượt công suất thiết kế rất dễ cháy nổ.']),
    Q('Bảo vệ môi trường khi dùng công nghệ?', ['Tiết kiệm điện nước', 'Xả thải', 'Lãng phí', 'Phá thiết bị'], 0, 'Tiết kiệm điện nước.', ['Đúng — tiết kiệm điện nước giúp bảo vệ môi trường.', 'Sai — xả thải bừa làm ô nhiễm môi trường.', 'Sai — lãng phí là không bảo vệ môi trường.', 'Sai — phá thiết bị gây lãng phí và rác thải.']),
  ]),

  M(18, 'Kiểm tra HK1', [
    Q('Em chăm sóc rau bằng cách?', ['Phun thuốc trừ sâu liên tục', 'Tưới, làm cỏ, bón phân', 'Bỏ mặc', 'Tưới thật nhiều nước cùng lúc'], 1, 'Tưới, làm cỏ, bón phân.', ['Sai — phun thuốc liên tục rất hại sức khoẻ và rau.', 'Đúng — chăm rau bằng cách tưới, làm cỏ và bón phân.', 'Sai — bỏ mặc thì rau còi cọc, chết dần.', 'Sai — tưới quá nhiều cùng lúc làm rau úng.']),
    Q('An toàn điện cơ bản?', ['Tay khô, không chạm dây hở', 'Cắn dây', 'Tay ướt vẫn dùng', 'Đổ nước'], 0, 'Tay khô và không chạm dây hở.', ['Đúng — giữ tay khô và không chạm vào dây hở.', 'Sai — cắn dây điện rất nguy hiểm.', 'Sai — tay ướt dùng điện dễ bị giật.', 'Sai — đổ nước vào điện rất nguy hiểm.']),
    Q('Sử dụng máy tính đúng?', ['Sát màn hình', 'Tư thế đúng, nghỉ mắt', 'Ngồi nghiêng người sát màn hình', 'Dùng cả ngày'], 1, 'Tư thế đúng và nghỉ mắt.', ['Sai — ngồi sát màn hình rất hại mắt.', 'Đúng — ngồi đúng tư thế và nghỉ mắt thường xuyên.', 'Sai — ngồi nghiêng và sát màn hình hại mắt, hại lưng.', 'Sai — dùng cả ngày làm mỏi mắt và mệt người.']),
    Q('Khi lắp ghép xong?', ['Bỏ bừa', 'Cất gọn dụng cụ', 'Để dụng cụ rải rác trên bàn', 'Tháo rời sản phẩm vừa lắp'], 1, 'Cất gọn dụng cụ.', ['Sai — bỏ bừa dụng cụ dễ thất lạc, nguy hiểm.', 'Đúng — nên cất gọn dụng cụ sau khi lắp xong.', 'Sai — để rải rác trên bàn dễ rơi, mất.', 'Sai — không cần tháo rời sản phẩm vừa lắp xong.']),
  ]),

  // ──────────────── HK2 ────────────────
  M(19, 'Bếp đơn giản — Sandwich', [
    Q('Sandwich gồm?', ['Cơm trắng và trứng chiên', 'Bún tươi và rau sống', 'Phở bò có nước dùng', 'Bánh mì + nhân kẹp'], 3, 'Bánh mì kẹp nhân.', ['Sai — cơm trắng và trứng chiên không phải sandwich.', 'Sai — bún tươi và rau sống là món bún, không phải sandwich.', 'Sai — phở bò là món nước, không phải sandwich.', 'Đúng — sandwich là bánh mì kẹp nhân.']),
    Q('Nhân sandwich có thể?', ['Bột mì sống và muối', 'Đường nâu và bơ tan chảy', 'Trứng, jambon, rau, phô mai', 'Mì gói khô chưa nấu'], 2, 'Trứng, jambon, rau, phô mai.', ['Sai — bột mì sống không thể ăn được.', 'Sai — đường nâu và bơ chảy không phải nhân sandwich.', 'Đúng — nhân sandwich có thể là trứng, jambon, rau, phô mai.', 'Sai — mì gói khô chưa nấu không dùng làm nhân.']),
    Q('Khi cắt bánh em dùng?', ['Dao to sắc', 'Dao cắt bánh nhỏ, người lớn giúp', 'Kéo cắt giấy thường', 'Xé bằng tay không'], 1, 'Dao nhỏ và nhờ người lớn giúp.', ['Sai — dao to sắc nguy hiểm cho học sinh.', 'Đúng — dùng dao nhỏ và nhờ người lớn giúp cho an toàn.', 'Sai — kéo cắt giấy không sạch để cắt bánh.', 'Sai — xé tay làm bánh nát và không vệ sinh.']),
    Q('Trước khi làm em?', ['Bỏ qua', 'Rửa tay sạch', 'Lau qua tay bằng khăn ướt', 'Tay bẩn cũng được'], 1, 'Rửa tay là quan trọng nhất.', ['Sai — không thể bỏ qua bước vệ sinh tay.', 'Đúng — rửa tay sạch trước khi làm đồ ăn là quan trọng nhất.', 'Sai — lau khăn ướt chưa sạch bằng rửa tay với xà phòng.', 'Sai — tay bẩn làm đồ ăn dễ nhiễm khuẩn.']),
  ]),

  M(20, 'Salad rau quả', [
    Q('Salad là?', ['Món xào', 'Rau quả trộn, ăn sống/sơ chế', 'Món chiên', 'Món luộc'], 1, 'Rau quả trộn ăn sống.', ['Sai — salad không phải món xào nóng.', 'Đúng — salad là rau quả trộn, ăn sống hoặc sơ chế.', 'Sai — salad không phải món chiên.', 'Sai — salad không phải món luộc.']),
    Q('Nguyên liệu salad?', ['Mì tôm và xúc xích', 'Cơm nguội và thịt kho', 'Bánh quy và sô cô la', 'Xà lách, cà chua, dưa chuột'], 3, 'Rau quả tươi.', ['Sai — mì tôm, xúc xích không phải nguyên liệu salad.', 'Sai — cơm nguội, thịt kho không dùng làm salad.', 'Sai — bánh quy, sô cô la là đồ ngọt, không phải salad.', 'Đúng — salad dùng xà lách, cà chua, dưa chuột tươi.']),
    Q('Rau quả trước khi trộn?', ['Ngâm muối qua đêm', 'Để bẩn', 'Chần qua nước sôi nóng', 'Rửa sạch, để ráo'], 3, 'Rửa sạch và để ráo.', ['Sai — ngâm muối qua đêm làm rau mềm nhũn.', 'Sai — để bẩn thì ăn vào dễ đau bụng.', 'Sai — chần nước sôi làm rau quả mất độ giòn tươi.', 'Đúng — rau quả cần rửa sạch và để ráo trước khi trộn.']),
    Q('Salad tốt cho?', ['Không gì', 'Sức khoẻ, nhiều vitamin', 'Tăng cân nhanh chóng', 'Hại sức khoẻ'], 1, 'Tốt cho sức khoẻ.', ['Sai — salad có nhiều lợi ích cho cơ thể.', 'Đúng — salad tốt cho sức khoẻ vì nhiều vitamin.', 'Sai — salad ít năng lượng, không gây tăng cân nhanh.', 'Sai — salad tốt cho sức khoẻ chứ không hại.']),
  ]),

  M(21, 'An toàn trong bếp', [
    Q('Trong bếp em không nên?', ['Rửa rau', 'Giúp mẹ', 'Dọn chén', 'Đùa nghịch với lửa, dao'], 3, 'Không đùa với lửa và dao.', ['Sai — rửa rau là việc giúp đỡ tốt trong bếp.', 'Sai — giúp mẹ trong bếp là điều nên làm.', 'Sai — dọn chén là việc tốt, được khuyến khích.', 'Đúng — không được đùa nghịch với lửa và dao trong bếp.']),
    Q('Khi cầm dao em?', ['Cầm chuôi như búa', 'Vung loạn', 'Cẩn thận, lưỡi hướng xa', 'Chỉ vào người'], 2, 'Cẩn thận và hướng lưỡi xa người.', ['Sai — cầm dao như búa không đúng cách, dễ trượt.', 'Sai — vung dao loạn rất nguy hiểm.', 'Đúng — cầm dao cẩn thận, lưỡi hướng ra xa người.', 'Sai — chỉ dao vào người rất nguy hiểm.']),
    Q('Khi nồi nóng em?', ['Cầm trực tiếp bằng tay không', 'Áp mặt', 'Dùng găng tay/khăn dày', 'Tay không'], 2, 'Dùng găng tay tránh bỏng.', ['Sai — cầm trực tiếp bằng tay không sẽ bị bỏng.', 'Sai — áp mặt vào nồi nóng rất nguy hiểm.', 'Đúng — dùng găng tay hoặc khăn dày để tránh bỏng.', 'Sai — tay không chạm nồi nóng sẽ bị bỏng.']),
    Q('Khi bị bỏng nhẹ?', ['Bỏ qua', 'Bôi kem đánh răng', 'Bôi mỡ', 'Rửa nước mát ngay'], 3, 'Rửa nước mát ngay là sơ cứu đúng.', ['Sai — bỏ qua khiến vết bỏng nặng hơn.', 'Sai — bôi kem đánh răng không đúng, dễ nhiễm trùng.', 'Sai — bôi mỡ làm vết bỏng lâu lành hơn.', 'Đúng — rửa nước mát ngay là cách sơ cứu đúng.']),
  ]),

  M(22, 'Trồng rau thuỷ canh đơn giản', [
    Q('Thuỷ canh là?', ['Trồng cát', 'Trồng trên đá', 'Trồng đất khô', 'Trồng rau bằng nước (không đất)'], 3, 'Trồng bằng nước (dung dịch dinh dưỡng).', ['Sai — thuỷ canh không trồng trên cát.', 'Sai — thuỷ canh không trồng trên đá.', 'Sai — thuỷ canh không dùng đất khô.', 'Đúng — thuỷ canh là trồng rau bằng nước, không cần đất.']),
    Q('Ưu điểm thuỷ canh?', ['Tốn nhiều nước hơn trồng đất', 'Tốn đất', 'Sạch, không sâu bệnh đất', 'Bẩn hơn'], 2, 'Sạch và không sâu bệnh đất.', ['Sai — thuỷ canh thường tiết kiệm nước hơn.', 'Sai — thuỷ canh không cần đất nên không tốn đất.', 'Đúng — thuỷ canh sạch và tránh được sâu bệnh trong đất.', 'Sai — thuỷ canh sạch hơn chứ không bẩn hơn.']),
    Q('Thuỷ canh cần?', ['Dung dịch dinh dưỡng, ánh sáng', 'Đất phù sa và phân chuồng', 'Đá sỏi và mùn cưa', 'Cát mịn để giữ ẩm'], 0, 'Dung dịch và ánh sáng.', ['Đúng — thuỷ canh cần dung dịch dinh dưỡng và ánh sáng.', 'Sai — thuỷ canh không dùng đất phù sa, phân chuồng.', 'Sai — đá sỏi, mùn cưa không phải thứ thuỷ canh cần.', 'Sai — thuỷ canh không cần cát giữ ẩm.']),
    Q('Rau phù hợp thuỷ canh?', ['Lúa nước cao sản', 'Khoai lang và khoai tây', 'Mía đường dài ngày', 'Xà lách, cải'], 3, 'Rau lá ngắn ngày.', ['Sai — lúa nước không hợp trồng thuỷ canh tại nhà.', 'Sai — khoai lang, khoai tây là cây lấy củ, không hợp.', 'Sai — mía dài ngày, không hợp thuỷ canh.', 'Đúng — xà lách, cải là rau lá ngắn ngày, hợp thuỷ canh.']),
  ]),

  M(23, 'Chăm sóc cây cảnh trong nhà', [
    Q('Cây cảnh trong nhà cần?', ['Ánh sáng vừa, tưới hợp lý', 'Tối hoàn toàn', 'Nắng gắt', 'Không tưới'], 0, 'Ánh sáng vừa và tưới đúng.', ['Đúng — cây cảnh trong nhà cần ánh sáng vừa và tưới hợp lý.', 'Sai — tối hoàn toàn thì cây không sống được.', 'Sai — nắng gắt làm cây trong nhà bị héo.', 'Sai — không tưới thì cây sẽ khô và chết.']),
    Q('Cây nào dễ chăm trong nhà?', ['Hoa hồng', 'Mía đường ngoài đồng', 'Lưỡi hổ, trầu bà', 'Lúa nước cấy trong chậu'], 2, 'Lưỡi hổ, trầu bà dễ chăm.', ['Sai — hoa hồng cần nhiều nắng, khó trồng trong nhà.', 'Sai — mía là cây ngoài đồng, không hợp trong nhà.', 'Đúng — lưỡi hổ, trầu bà dễ chăm và sống tốt trong nhà.', 'Sai — lúa nước không trồng trong chậu trong nhà được.']),
    Q('Lá vàng có thể do?', ['Cây vui', 'Không lý do', 'Trời lạnh', 'Tưới quá nhiều/ít'], 3, 'Tưới sai gây lá vàng.', ['Sai — lá vàng là dấu hiệu cây không khoẻ.', 'Sai — lá vàng luôn có nguyên nhân.', 'Sai — trời lạnh không phải nguyên nhân chính gây lá vàng.', 'Đúng — tưới quá nhiều hoặc quá ít đều làm lá vàng.']),
    Q('Cây cảnh giúp?', ['Tốn nước tưới hàng ngày', 'Gây dị ứng cho cả nhà', 'Hút hết oxy ban đêm', 'Làm sạch không khí, trang trí'], 3, 'Sạch không khí và đẹp.', ['Sai — cây cảnh không cần quá nhiều nước hằng ngày.', 'Sai — đa số cây cảnh không gây dị ứng.', 'Sai — cây không hút hết oxy của cả nhà.', 'Đúng — cây cảnh giúp làm sạch không khí và trang trí đẹp.']),
  ]),

  M(24, 'Lắp ghép mô hình cơ khí phức tạp', [
    Q('Mô hình phức tạp gồm?', ['1 phần', 'Không cần', 'Nhiều bộ phận, cần chính xác', 'Đơn giản'], 2, 'Nhiều bộ phận và chính xác.', ['Sai — mô hình phức tạp không chỉ có 1 phần.', 'Sai — mô hình vẫn cần các bộ phận để lắp.', 'Đúng — mô hình phức tạp có nhiều bộ phận và cần lắp chính xác.', 'Sai — phức tạp nghĩa là không đơn giản.']),
    Q('Khi lắp khó em?', ['Dùng búa đập cho khớp', 'Đọc lại hướng dẫn, kiên trì', 'Trách bạn cùng nhóm', 'Bỏ dở giữa chừng'], 1, 'Đọc lại và kiên trì.', ['Sai — đập búa dễ làm gãy chi tiết.', 'Đúng — nên đọc lại hướng dẫn và kiên trì làm.', 'Sai — trách bạn không giúp giải quyết được việc.', 'Sai — bỏ dở thì không hoàn thành được sản phẩm.']),
    Q('Tua vít dùng để?', ['Đập dẹp đầu đinh', 'Đo độ dài chi tiết', 'Vặn ốc vít', 'Cắt rời dây nối'], 2, 'Vặn ốc vít.', ['Sai — đập đinh là việc của búa.', 'Sai — đo độ dài là việc của thước.', 'Đúng — tua vít dùng để vặn ốc vít.', 'Sai — cắt dây là việc của kìm hoặc kéo.']),
    Q('Cờ-lê dùng để?', ['Cắt giấy', 'Bẻ cong thanh kim loại', 'Vặn ốc lục giác', 'Đo dài'], 2, 'Vặn ốc lục giác.', ['Sai — cắt giấy là việc của kéo.', 'Sai — cờ-lê không dùng để bẻ cong kim loại.', 'Đúng — cờ-lê dùng để vặn ốc lục giác.', 'Sai — đo dài là việc của thước.']),
  ]),

  M(25, 'Mô hình chuyển động', [
    Q('Bánh răng dùng để?', ['Giữ chặt bánh xe đứng yên', 'Đo khoảng cách giữa hai trục', 'Truyền chuyển động', 'Trang trí'], 2, 'Truyền chuyển động giữa các trục.', ['Sai — bánh răng để truyền chuyển động, không phải giữ yên.', 'Sai — bánh răng không dùng để đo khoảng cách.', 'Đúng — bánh răng dùng để truyền chuyển động giữa các trục.', 'Sai — bánh răng có công dụng cơ học, không chỉ trang trí.']),
    Q('Khi bánh răng A quay, bánh răng B?', ['Quay nhanh hơn', 'Đứng yên', 'Cùng chiều', 'Quay ngược chiều'], 3, '2 bánh răng ăn khớp quay ngược chiều.', ['Sai — tốc độ tuỳ số răng, không hẳn nhanh hơn.', 'Sai — bánh B sẽ quay theo, không đứng yên.', 'Sai — hai bánh ăn khớp không quay cùng chiều.', 'Đúng — hai bánh răng ăn khớp thì quay ngược chiều nhau.']),
    Q('Mô hình xe có động cơ?', ['Bay lên không trung', 'Tự chạy được', 'Đứng yên', 'Bơi dưới nước được'], 1, 'Có động cơ thì tự chạy.', ['Sai — xe không bay lên được.', 'Đúng — xe có động cơ thì tự chạy được.', 'Sai — có động cơ thì xe chạy chứ không đứng yên.', 'Sai — xe trên cạn không bơi dưới nước.']),
    Q('Để xe chạy lâu?', ['Không cần', 'Pin yếu', 'Pin tốt và cơ khí trơn', 'Cơ khí kẹt'], 2, 'Pin tốt và cơ khí trơn tru.', ['Sai — muốn chạy lâu vẫn cần pin và cơ khí tốt.', 'Sai — pin yếu thì xe nhanh hết điện.', 'Đúng — pin tốt và cơ khí trơn tru giúp xe chạy lâu.', 'Sai — cơ khí kẹt làm xe khó chạy.']),
  ]),

  M(26, 'Vật liệu sản phẩm công nghệ', [
    Q('Vật liệu kim loại?', ['Vải bông và lụa tơ tằm', 'Gỗ thông và tre nứa', 'Sắt, nhôm, đồng', 'Nhựa PET và cao su'], 2, 'Sắt, nhôm, đồng là kim loại.', ['Sai — vải bông, lụa là vật liệu dệt, không phải kim loại.', 'Sai — gỗ thông, tre nứa là vật liệu từ cây.', 'Đúng — sắt, nhôm, đồng đều là kim loại.', 'Sai — nhựa và cao su không phải kim loại.']),
    Q('Vật liệu phi kim?', ['Đồng đỏ và đồng thau', 'Vàng và bạc nguyên chất', 'Sắt thép và inox', 'Gỗ, nhựa, vải'], 3, 'Gỗ, nhựa, vải là phi kim.', ['Sai — đồng đỏ, đồng thau là kim loại.', 'Sai — vàng, bạc là kim loại quý.', 'Sai — sắt thép, inox đều là kim loại.', 'Đúng — gỗ, nhựa, vải là vật liệu phi kim.']),
    Q('Tái chế nhựa giúp?', ['Tốn tiền', 'Bảo vệ môi trường', 'Hại môi trường', 'Làm tăng giá thành sản phẩm'], 1, 'Tái chế bảo vệ môi trường.', ['Sai — tái chế còn giúp tiết kiệm tài nguyên.', 'Đúng — tái chế nhựa giúp bảo vệ môi trường.', 'Sai — tái chế bảo vệ chứ không hại môi trường.', 'Sai — tái chế giúp giảm rác và tiết kiệm tài nguyên.']),
    Q('Kim loại bền hơn?', ['Tất cả các loại trên', 'Chỉ bền hơn gỗ thông', 'Chỉ bền hơn giấy bìa', 'Chỉ bền hơn nhựa thường'], 0, 'Kim loại bền hơn các loại này nói chung.', ['Đúng — kim loại nói chung bền hơn gỗ, giấy và nhựa.', 'Sai — kim loại bền hơn nhiều thứ chứ không chỉ gỗ thông.', 'Sai — kim loại bền hơn cả nhựa và gỗ nữa.', 'Sai — kim loại còn bền hơn cả gỗ và giấy.']),
  ]),

  M(27, 'Sản phẩm tái chế', [
    Q('Tái chế là?', ['Đốt rác thải để phát điện', 'Tận dụng vật cũ làm vật mới', 'Vứt đi', 'Chôn rác xuống lòng đất sâu'], 1, 'Tận dụng vật cũ.', ['Sai — đốt rác không phải là tái chế.', 'Đúng — tái chế là tận dụng vật cũ để làm vật mới.', 'Sai — vứt đi là bỏ phí, không phải tái chế.', 'Sai — chôn rác không phải tái chế.']),
    Q('Em có thể tái chế?', ['Vứt chai sông', 'Đốt chai', 'Đập vỡ chai', 'Chai nhựa làm chậu cây'], 3, 'Chai nhựa làm chậu cây.', ['Sai — vứt chai xuống sông gây ô nhiễm.', 'Sai — đốt chai nhựa thải khói độc.', 'Sai — đập vỡ chai không phải tái chế.', 'Đúng — chai nhựa cũ có thể làm chậu trồng cây.']),
    Q('Tái chế giấy?', ['Vẽ tranh, làm thiệp', 'Bỏ thẳng vào thùng rác chung', 'Vò nát', 'Đốt để giảm thể tích'], 0, 'Tận dụng giấy cũ làm sản phẩm.', ['Đúng — giấy cũ có thể tái chế thành tranh, thiệp.', 'Sai — bỏ thẳng vào thùng rác là lãng phí.', 'Sai — vò nát rồi vứt không phải tái chế.', 'Sai — đốt giấy gây khói và lãng phí.']),
    Q('Tái chế giúp?', ['Tiết kiệm và bảo vệ môi trường', 'Chỉ phù hợp cho người lớn', 'Làm ô nhiễm thêm môi trường', 'Tốn tiền'], 0, 'Tiết kiệm và bảo vệ môi trường.', ['Đúng — tái chế giúp tiết kiệm và bảo vệ môi trường.', 'Sai — học sinh cũng có thể tái chế dễ dàng.', 'Sai — tái chế làm giảm ô nhiễm chứ không tăng.', 'Sai — tái chế giúp tiết kiệm chứ không tốn tiền.']),
  ]),

  M(28, 'Ôn nấu ăn — Trứng ốp la', [
    Q('Trứng ốp la là?', ['Trứng luộc', 'Trứng sống', 'Trứng chiên đơn giản', 'Trứng nướng'], 2, 'Trứng chiên trong chảo.', ['Sai — trứng luộc là luộc trong nước, không phải ốp la.', 'Sai — trứng ốp la phải nấu chín, không ăn sống.', 'Đúng — trứng ốp la là trứng chiên đơn giản trong chảo.', 'Sai — trứng ốp la chiên trong chảo, không phải nướng.']),
    Q('Trước khi chiên cần?', ['Không cần dầu', 'Đập trên chảo lạnh', 'Chiên trứng nguyên vỏ', 'Đập trứng ra bát, có chảo nóng và dầu'], 3, 'Bát, chảo nóng và dầu.', ['Sai — chiên trứng cần một ít dầu để khỏi dính.', 'Sai — đập trên chảo lạnh thì trứng không chín đều.', 'Sai — phải đập bỏ vỏ, không chiên cả vỏ.', 'Đúng — đập trứng ra bát, chuẩn bị chảo nóng và dầu.']),
    Q('Khi chiên em?', ['Cẩn thận tránh dầu bắn', 'Đổ nước vào', 'Đứng sát', 'Khuấy mạnh'], 0, 'Cẩn thận tránh dầu bắn.', ['Đúng — chiên trứng cần cẩn thận tránh dầu bắn bỏng.', 'Sai — đổ nước vào dầu nóng làm dầu bắn tung toé.', 'Sai — đứng sát chảo dễ bị dầu bắn vào.', 'Sai — khuấy mạnh làm dầu văng ra ngoài.']),
    Q('Sau khi nấu xong?', ['Để bếp cháy', 'Tắt bếp, dọn dẹp', 'Vứt chảo', 'Bỏ chạy'], 1, 'Tắt bếp và dọn dẹp.', ['Sai — để bếp cháy rất nguy hiểm, dễ gây hoả hoạn.', 'Đúng — nấu xong nên tắt bếp và dọn dẹp gọn gàng.', 'Sai — không nên vứt chảo, cần rửa và cất.', 'Sai — bỏ chạy để bếp đang bật rất nguy hiểm.']),
  ]),

  M(29, 'Sử dụng tủ lạnh', [
    Q('Tủ lạnh dùng để?', ['Trang trí', 'Nấu chín thức ăn nhanh', 'Sưởi ấm phòng vào mùa đông', 'Bảo quản thức ăn lâu hơn'], 3, 'Bảo quản thức ăn.', ['Sai — tủ lạnh có công dụng chính, không chỉ trang trí.', 'Sai — tủ lạnh làm lạnh chứ không nấu chín.', 'Sai — tủ lạnh làm lạnh chứ không sưởi ấm.', 'Đúng — tủ lạnh dùng để bảo quản thức ăn lâu hơn.']),
    Q('Ngăn đông để?', ['Rau tươi', 'Hoa quả', 'Đồ đông lạnh, thịt cá', 'Đồ khô'], 2, 'Ngăn đông cho đồ cấp đông.', ['Sai — rau tươi nên để ngăn mát, không phải ngăn đông.', 'Sai — hoa quả tươi nên để ngăn mát.', 'Đúng — ngăn đông để đồ đông lạnh, thịt cá.', 'Sai — đồ khô không cần để ngăn đông.']),
    Q('Ngăn mát để?', ['Đồ đông cứng', 'Đồ khô', 'Rau, sữa, đồ ăn tươi', 'Bánh kẹo'], 2, 'Rau, sữa, đồ tươi.', ['Sai — đồ đông cứng nên để ngăn đông.', 'Sai — đồ khô không cần để tủ lạnh.', 'Đúng — ngăn mát để rau, sữa và đồ ăn tươi.', 'Sai — bánh kẹo thường để ngoài, không cần ngăn mát.']),
    Q('Mở tủ lạnh em nên?', ['Đập cửa', 'Để mở luôn', 'Mở lâu', 'Nhanh, đóng kín lại'], 3, 'Nhanh và đóng kín lại.', ['Sai — đập cửa làm hỏng tủ lạnh.', 'Sai — để mở luôn làm tủ tốn điện và đồ mau hỏng.', 'Sai — mở lâu làm thoát hơi lạnh, tốn điện.', 'Đúng — nên mở nhanh rồi đóng kín lại để giữ lạnh.']),
  ]),

  M(30, 'Lò vi sóng — Sử dụng an toàn', [
    Q('Lò vi sóng làm nóng bằng?', ['Điện trở', 'Hơi nước áp suất cao', 'Ngọn lửa nhỏ bên trong', 'Sóng vi ba'], 3, 'Sóng vi ba làm nóng đồ ăn.', ['Sai — điện trở là cách của lò nướng, không phải lò vi sóng.', 'Sai — lò vi sóng không dùng hơi nước áp suất cao.', 'Sai — lò vi sóng không có ngọn lửa bên trong.', 'Đúng — lò vi sóng làm nóng đồ ăn bằng sóng vi ba.']),
    Q('Không cho vào lò vi sóng?', ['Đồ kim loại', 'Đồ sứ tráng men kim loại', 'Đồ chịu nhiệt', 'Đồ thuỷ tinh'], 0, 'Kim loại gây tia lửa.', ['Đúng — không cho đồ kim loại vào vì gây tia lửa.', 'Sai — đồ sứ thường (không viền kim loại) thì dùng được.', 'Sai — đồ chịu nhiệt có thể dùng trong lò vi sóng.', 'Sai — đồ thuỷ tinh chịu nhiệt dùng được bình thường.']),
    Q('Lấy đồ nóng em?', ['Áp mặt', 'Tay không', 'Thổi mạnh cho nguội bớt', 'Dùng găng tay/khăn'], 3, 'Dùng găng tay tránh bỏng.', ['Sai — áp mặt vào đồ nóng rất dễ bị bỏng.', 'Sai — tay không cầm đồ nóng sẽ bị bỏng.', 'Sai — thổi không làm nguội nhanh, vẫn nóng bỏng tay.', 'Đúng — dùng găng tay hoặc khăn để tránh bỏng.']),
    Q('Đậy đồ trong lò?', ['Bịt kim loại', 'Không đậy', 'Nắp chuyên dụng có lỗ thoát', 'Kín mít'], 2, 'Nắp có lỗ thoát hơi.', ['Sai — bịt kim loại gây tia lửa, rất nguy hiểm.', 'Sai — không đậy thì đồ ăn dễ bắn tung ra.', 'Đúng — dùng nắp chuyên dụng có lỗ thoát hơi.', 'Sai — đậy kín mít làm hơi nóng tích lại, dễ nổ.']),
  ]),

  M(31, 'Sửa chữa nhỏ trong nhà', [
    Q('Khi bóng đèn hỏng?', ['Tháo ra chơi đùa', 'Bỏ mặc', 'Tự sửa', 'Báo người lớn để thay'], 3, 'Báo người lớn để thay an toàn.', ['Sai — bóng đèn hỏng dễ vỡ, không nên chơi đùa.', 'Sai — bỏ mặc thì đèn vẫn không sáng.', 'Sai — tự sửa điện nguy hiểm với học sinh.', 'Đúng — nên báo người lớn để thay bóng đèn an toàn.']),
    Q('Đinh lỏng em?', ['Bỏ qua', 'Rút hẳn đinh ra vứt đi', 'Tự đóng', 'Báo người lớn đóng lại'], 3, 'Báo người lớn giúp.', ['Sai — bỏ qua thì đinh lỏng dễ gây nguy hiểm.', 'Sai — rút đinh ra vứt đi không giải quyết được.', 'Sai — tự đóng đinh dễ làm em bị thương.', 'Đúng — nên báo người lớn đóng lại cho chắc.']),
    Q('Vòi nước rỉ?', ['Để chảy', 'Tự cạy', 'Bỏ qua', 'Báo người lớn sửa'], 3, 'Báo người lớn để khoá hoặc sửa.', ['Sai — để chảy gây lãng phí nước.', 'Sai — tự cạy vòi dễ làm hỏng thêm.', 'Sai — bỏ qua thì nước vẫn rỉ, lãng phí.', 'Đúng — nên báo người lớn để khoá hoặc sửa vòi.']),
    Q('Vít lỏng em?', ['Đập búa cho chặt lại', 'Bỏ qua', 'Cắt bỏ phần đầu vít', 'Vặn lại bằng tua vít'], 3, 'Vặn lại bằng tua vít.', ['Sai — đập búa không làm vít chặt, còn làm hỏng.', 'Sai — bỏ qua thì vít vẫn lỏng.', 'Sai — cắt đầu vít làm hỏng luôn vít.', 'Đúng — nên vặn lại vít cho chặt bằng tua vít.']),
  ]),

  M(32, 'Tiết kiệm điện - nước trong gia đình', [
    Q('Tiết kiệm điện?', ['Dùng đèn sợi đốt', 'Tắt khi không dùng, dùng đèn LED', 'Mở nhiều thiết bị', 'Bật cả ngày'], 1, 'Tắt và dùng đèn LED.', ['Sai — đèn sợi đốt tốn điện hơn đèn LED.', 'Đúng — tắt khi không dùng và dùng đèn LED giúp tiết kiệm điện.', 'Sai — mở nhiều thiết bị thì càng tốn điện.', 'Sai — bật cả ngày rất lãng phí điện.']),
    Q('Tiết kiệm nước?', ['Đổ thừa', 'Tắm rất lâu', 'Khoá vòi, hứng nước rửa rau tưới cây', 'Để chảy'], 2, 'Khoá vòi và tái sử dụng.', ['Sai — đổ thừa nước là lãng phí.', 'Sai — tắm rất lâu dùng nhiều nước.', 'Đúng — khoá vòi và tận dụng nước rửa rau để tưới cây.', 'Sai — để nước chảy hoài là lãng phí.']),
    Q('Đồng hồ điện đo?', ['Thời gian', 'Lượng điện đã dùng', 'Áp suất', 'Nhiệt độ'], 1, 'Đo lượng điện tiêu thụ (kWh).', ['Sai — đo thời gian là việc của đồng hồ thường.', 'Đúng — đồng hồ điện đo lượng điện đã dùng (kWh).', 'Sai — áp suất do đồng hồ áp suất đo.', 'Sai — nhiệt độ do nhiệt kế đo.']),
    Q('Vì sao cần tiết kiệm?', ['Để được khen ngoan', 'Không lý do', 'Bắt buộc', 'Tiền và môi trường'], 3, 'Tiết kiệm tiền và bảo vệ môi trường.', ['Sai — tiết kiệm không chỉ để được khen.', 'Sai — tiết kiệm luôn có lý do quan trọng.', 'Sai — tiết kiệm là ý thức tốt, không phải vì bị bắt buộc.', 'Đúng — tiết kiệm giúp đỡ tốn tiền và bảo vệ môi trường.']),
  ]),

  M(33, 'Sản phẩm em yêu thích', [
    Q('Em chọn sản phẩm công nghệ em yêu vì?', ['Vì có nhiều màu sắc lạ', 'Hữu ích cho cuộc sống', 'Vì có giá tiền cao nhất', 'Đẹp mã'], 1, 'Hữu ích là quan trọng nhất.', ['Sai — màu sắc lạ không phải lý do quan trọng nhất.', 'Đúng — sản phẩm hữu ích cho cuộc sống là điều quan trọng nhất.', 'Sai — giá cao không có nghĩa là sản phẩm tốt nhất.', 'Sai — đẹp mã thôi thì chưa đủ, quan trọng là hữu ích.']),
    Q('Khi giới thiệu sản phẩm em?', ['Khoe giá tiền của sản phẩm', 'Im lặng', 'Chê sản phẩm khác', 'Nói công dụng, cách dùng'], 3, 'Nói công dụng và cách dùng.', ['Sai — giới thiệu không phải để khoe giá tiền.', 'Sai — im lặng thì không ai biết sản phẩm.', 'Sai — chê sản phẩm khác là không lịch sự.', 'Đúng — nên nói công dụng và cách dùng của sản phẩm.']),
    Q('Bảo quản sản phẩm em?', ['Bỏ mặc', 'Dùng theo cách mình thích', 'Đúng hướng dẫn', 'Tháo rời ra xem cấu tạo'], 2, 'Theo hướng dẫn.', ['Sai — bỏ mặc thì sản phẩm nhanh hỏng.', 'Sai — dùng tuỳ thích dễ làm hỏng sản phẩm.', 'Đúng — nên bảo quản và dùng theo đúng hướng dẫn.', 'Sai — tháo rời ra dễ làm hỏng sản phẩm.']),
    Q('Khi sản phẩm hỏng em?', ['Đập bỏ vì giận', 'Tự sửa', 'Báo người lớn để sửa', 'Vứt vào thùng rác chung'], 2, 'Báo người lớn.', ['Sai — đập bỏ vì giận là lãng phí và không giải quyết được.', 'Sai — tự sửa dễ làm hỏng thêm hoặc gặp nguy hiểm.', 'Đúng — nên báo người lớn để sửa.', 'Sai — chưa nên vứt, hãy nhờ sửa trước.']),
  ]),

  M(34, 'Ôn tập cuối năm', [
    Q('Cả năm em đã học?', ['Không gì', 'Chỉ máy tính', 'Chỉ trồng rau', 'Trồng trọt, chăn nuôi, an toàn điện, máy tính, nấu ăn'], 3, 'Rất nhiều mảng kiến thức.', ['Sai — cả năm em đã học rất nhiều điều.', 'Sai — máy tính chỉ là một phần trong nhiều nội dung.', 'Sai — trồng rau chỉ là một trong nhiều nội dung.', 'Đúng — cả năm gồm trồng trọt, chăn nuôi, an toàn điện, máy tính, nấu ăn.']),
    Q('Công nghệ giúp em?', ['Tốn tiền mà không cần thiết', 'Làm con người lười biếng hơn', 'Gây căng thẳng mắt và đầu', 'Cuộc sống tốt hơn nếu dùng đúng'], 3, 'Tốt hơn nếu dùng đúng.', ['Sai — công nghệ rất cần thiết nếu dùng hợp lý.', 'Sai — dùng đúng thì công nghệ giúp ta làm việc tốt hơn.', 'Sai — dùng đúng cách thì không hại mắt và đầu.', 'Đúng — công nghệ làm cuộc sống tốt hơn nếu dùng đúng.']),
    Q('An toàn là?', ['Khi nào nhớ', 'Ưu tiên hàng đầu khi dùng công nghệ', 'Bỏ qua', 'Không cần'], 1, 'Ưu tiên hàng đầu.', ['Sai — an toàn phải luôn nhớ, không phải khi nào nhớ.', 'Đúng — an toàn là ưu tiên hàng đầu khi dùng công nghệ.', 'Sai — không được bỏ qua an toàn.', 'Sai — an toàn luôn cần thiết.']),
    Q('Tiết kiệm tài nguyên?', ['Chỉ dành cho người lớn lo', 'Lãng phí tốt hơn', 'Bảo vệ Trái Đất', 'Làm giảm chất lượng cuộc sống'], 2, 'Bảo vệ Trái Đất.', ['Sai — ai cũng cần tiết kiệm, kể cả học sinh.', 'Sai — lãng phí gây hại cho môi trường.', 'Đúng — tiết kiệm tài nguyên giúp bảo vệ Trái Đất.', 'Sai — tiết kiệm hợp lý không làm giảm chất lượng cuộc sống.']),
  ]),

  M(35, 'Kiểm tra cuối năm', [
    Q('Em chăm cây bằng cách?', ['Tưới, làm cỏ, bón phân', 'Cắt bỏ hết lá vàng', 'Phun thuốc diệt cỏ mạnh', 'Bỏ mặc'], 0, 'Tưới, làm cỏ, bón phân.', ['Đúng — chăm cây bằng cách tưới, làm cỏ và bón phân.', 'Sai — cắt hết lá vàng không phải cách chăm chính.', 'Sai — thuốc diệt cỏ mạnh có thể hại cả cây trồng.', 'Sai — bỏ mặc thì cây còi cọc, chết dần.']),
    Q('An toàn điện?', ['Tay ướt', 'Tay khô, không chạm dây hở, có cầu dao', 'Cắn dây', 'Cắm nhiều phích vào một ổ'], 1, 'Quy tắc an toàn điện.', ['Sai — tay ướt dùng điện rất dễ bị giật.', 'Đúng — giữ tay khô, không chạm dây hở, có cầu dao là an toàn.', 'Sai — cắn dây điện rất nguy hiểm.', 'Sai — cắm nhiều phích vào một ổ dễ gây cháy.']),
    Q('Internet an toàn?', ['Cho hết', 'Tự xử lý', 'Im lặng', 'Không cho người lạ thông tin, báo cha mẹ khi gặp xấu'], 3, 'Bảo mật và báo cha mẹ.', ['Sai — cho hết thông tin là không an toàn.', 'Sai — tự xử lý một mình dễ gặp nguy hiểm.', 'Sai — im lặng khi gặp việc xấu không tốt.', 'Đúng — không cho người lạ thông tin và báo cha mẹ khi gặp điều xấu.']),
    Q('Lên cấp 2 em vẫn?', ['Chỉ chơi điện thoại', 'Quên hết kiến thức đã học', 'Học công nghệ và áp dụng vào cuộc sống', 'Bỏ môn vì khó hơn'], 2, 'Tiếp tục học và ứng dụng.', ['Sai — chỉ chơi điện thoại là không tốt.', 'Sai — không nên quên kiến thức đã học.', 'Đúng — nên tiếp tục học công nghệ và áp dụng vào cuộc sống.', 'Sai — không nên bỏ môn chỉ vì khó hơn.']),
  ]),

  M(36, 'Kết thúc Tiểu học — Hành trang Công nghệ vào THCS', [
    Q('Quy trình tư duy thiết kế gồm các bước theo thứ tự nào?', ['Thực hiện → xác định vấn đề → đánh giá', 'Xác định vấn đề → lên ý tưởng → lập kế hoạch → thực hiện → đánh giá và cải tiến', 'Đánh giá → thực hiện → lên ý tưởng', 'Chỉ cần bắt tay vào làm là đủ'], 1, 'Xác định vấn đề → lên ý tưởng → lập kế hoạch → thực hiện → đánh giá và cải tiến.', ['Sai — không thể làm trước khi biết mình cần giải quyết vấn đề gì.', 'Đúng — đó là năm bước của tư duy thiết kế.', 'Sai — đánh giá là bước cuối, không phải bước đầu.', 'Sai — bỏ qua các bước chuẩn bị dễ làm hỏng sản phẩm.']),
    Q('Khi thiết bị điện trong nhà bị hỏng, em nên làm gì?', ['Tự tháo ra sửa', 'Dùng tay ướt kiểm tra', 'Báo người lớn, không tự ý sửa chữa', 'Cắm đi cắm lại nhiều lần'], 2, 'An toàn kĩ thuật: không tự ý sửa chữa thiết bị điện.', ['Sai — tự tháo sửa thiết bị điện rất nguy hiểm.', 'Sai — tay ướt chạm điện dễ bị điện giật.', 'Đúng — báo người lớn và không tự ý sửa chữa.', 'Sai — cắm đi cắm lại có thể gây chập cháy.']),
    Q('Bảo đảm vệ sinh an toàn thực phẩm khi nấu ăn nghĩa là?', ['Để thức ăn chín và đồ sống lẫn nhau', 'Dùng chung dao thớt cho đồ sống và đồ chín', 'Không cần rửa tay khi nấu', 'Rửa tay sạch, tách riêng đồ sống và đồ chín'], 3, 'Rửa tay, tách riêng đồ sống – chín để tránh nhiễm khuẩn chéo.', ['Sai — để lẫn dễ làm vi khuẩn từ đồ sống nhiễm sang đồ chín.', 'Sai — dùng chung dao thớt gây nhiễm khuẩn chéo.', 'Sai — rửa tay là bước bắt buộc trước khi chế biến thức ăn.', 'Đúng — rửa tay sạch và tách riêng đồ sống với đồ chín.']),
    Q('Trồng rau bằng phương pháp thuỷ canh nghĩa là trồng cây trong gì?', ['Dung dịch dinh dưỡng thay cho đất', 'Cát khô', 'Đá vôi', 'Không khí hoàn toàn khô'], 0, 'Thuỷ canh: trồng cây trong dung dịch dinh dưỡng, không dùng đất.', ['Đúng — thuỷ canh là trồng cây trong dung dịch dinh dưỡng thay cho đất.', 'Sai — cát khô không cung cấp được dinh dưỡng và nước.', 'Sai — đá vôi không phải môi trường trồng cây.', 'Sai — cây cần nước và dinh dưỡng, không sống được trong không khí khô.']),
    Q('Kĩ năng thủ công nào em đã học ở tiểu học?', ['Hàn kim loại', 'Cắt, xé, dán, đan, thêu, khâu', 'Đúc bê tông', 'Vận hành máy tiện'], 1, 'Thủ công kĩ thuật tiểu học: cắt, xé, dán, đan, thêu, khâu.', ['Sai — hàn kim loại là kĩ thuật của bậc học cao hơn.', 'Đúng — cắt, xé, dán, đan, thêu, khâu là kĩ năng thủ công tiểu học.', 'Sai — đó là công việc xây dựng của người lớn.', 'Sai — máy tiện là thiết bị cơ khí chuyên dụng.']),
    Q('Câu hỏi nào thể hiện tư duy của một kĩ sư tương lai?', ['"Bao giờ được nghỉ?"', '"Ai làm hộ mình?"', '"Làm thế nào để cuộc sống tốt hơn?"', '"Cái này đắt bao nhiêu?"'], 2, 'Công nghệ = làm ra sản phẩm hữu ích cho cuộc sống.', ['Sai — đó không phải câu hỏi hướng tới giải quyết vấn đề.', 'Sai — kĩ sư tự tìm cách làm chứ không chờ người khác.', 'Đúng — "Làm thế nào để cuộc sống tốt hơn?" là câu hỏi của kĩ sư.', 'Sai — giá tiền là một yếu tố, nhưng không phải câu hỏi cốt lõi.']),
  ]),
];

export const P5CN_SCENARIOS = indexBy(P5CN_WEEKS);
