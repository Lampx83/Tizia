// ============================================================
// Lớp 1 · GDTC — 35 tuần (HK1: 1–18 · HK2: 19–35 · T22 nghỉ Tết)
// Bám CT GDPT 2018: đội hình đội ngũ, bài thể dục buổi sáng,
// đi – chạy – nhảy, ném/bắt bóng, đi trên ván hẹp, trò chơi
// vận động dân gian, an toàn khi tập luyện.
// ID prefix: "P1GDTC-wNN-quiz".
// ============================================================
import { Q, W, indexBy } from './_helper.js';

const M = (n, title, qs, opts) => W('P1GDTC', 'gdtc', n, title, qs, opts);

export const P1GDTC_WEEKS = [
  // ──────────────── HK1 ────────────────
  M(1, 'Làm quen môn GDTC', [
    Q('Trang phục giờ GDTC nên là?', ['Giày cao gót', 'Dép lê', 'Đồng phục thể thao, giày thể thao', 'Quần áo bó cứng'], 2, 'Quần áo thể thao và giày thể thao để dễ vận động.', ['Sai — giày cao gót dễ ngã, không tập được.', 'Sai — dép lê hay tuột, dễ vấp.', 'Đúng — đồ thể thao và giày thể thao giúp em vận động thoải mái.', 'Sai — quần áo bó cứng khó cử động.']),
    Q('Trước khi tập, em cần?', ['Khởi động làm nóng', 'Tập luôn cho nhanh', 'Ngồi xuống nghỉ', 'Uống thật nhiều nước'], 0, 'Phải khởi động làm nóng để tránh chấn thương.', ['Đúng — khởi động làm nóng cơ giúp tránh đau, tránh chấn thương.', 'Sai — tập luôn dễ bị đau cơ.', 'Sai — chưa tập mà nghỉ thì không khởi động được.', 'Sai — uống quá nhiều nước trước khi tập sẽ khó chịu.']),
    Q('Khi cô/thầy ra hiệu lệnh, em phải?', ['Cười đùa', 'Bỏ ra ngoài', 'Lắng nghe và thực hiện', 'Nói chuyện riêng'], 2, 'Lắng nghe và thực hiện đúng hiệu lệnh.', ['Sai — cười đùa sẽ không nghe rõ hiệu lệnh.', 'Sai — bỏ ra ngoài là không nghe lời.', 'Đúng — em lắng nghe rồi thực hiện đúng hiệu lệnh.', 'Sai — nói chuyện riêng làm em không tập đúng.']),
    Q('Sau giờ tập em nên?', ['Tắm nước lạnh ngay', 'Nằm xuống sân', 'Uống nước từng ngụm nhỏ', 'Uống ực một lần thật nhiều'], 2, 'Uống từng ngụm nhỏ, không tắm lạnh ngay.', ['Sai — tắm lạnh ngay khi người nóng dễ bị ốm.', 'Sai — nằm xuống sân mất vệ sinh và không tốt.', 'Đúng — uống từng ngụm nhỏ cho cơ thể dễ chịu.', 'Sai — uống ực một lần dễ bị sặc, đau bụng.']),
  ]),

  M(2, 'Tư thế đứng nghiêm – đứng nghỉ', [
    Q('“Nghiêm!” yêu cầu em?', ['Đứng thẳng, hai tay áp sát thân, mắt nhìn thẳng', 'Quay phải', 'Ngồi xuống', 'Quay đằng sau'], 0, 'Đứng nghiêm: thân thẳng, hai tay áp sát, mắt nhìn thẳng.', ['Đúng — đứng nghiêm là thân thẳng, tay áp sát, mắt nhìn thẳng.', 'Sai — quay phải là lệnh khác, không phải nghiêm.', 'Sai — ngồi xuống không phải tư thế nghiêm.', 'Sai — quay đằng sau là lệnh khác.']),
    Q('Khi “Nghỉ!”, chân nào hơi chùng?', ['Chân trái', 'Cả hai', 'Không chân nào', 'Chân phải'], 0, 'Đứng nghỉ: chân trái hơi chùng.', ['Đúng — khi nghỉ, chân trái hơi chùng cho thoải mái.', 'Sai — chùng cả hai chân thì sẽ ngả nghiêng.', 'Sai — đứng nghỉ thì có một chân hơi chùng.', 'Sai — chân hơi chùng là chân trái, không phải chân phải.']),
    Q('Hai bàn chân khi đứng nghiêm tạo hình?', ['Chữ X (bắt chéo)', 'Song song', 'Vuông góc', 'Chữ V (mở khoảng 45°)'], 3, 'Hai gót khép, mũi chân mở chữ V.', ['Sai — bắt chéo chữ X thì dễ ngã.', 'Sai — hai chân song song chưa đúng tư thế nghiêm.', 'Sai — vuông góc thì đứng không vững.', 'Đúng — hai gót khép, mũi chân mở thành chữ V.']),
    Q('Khi đứng nghiêm, mắt nhìn?', ['Xuống đất', 'Lên trời', 'Thẳng phía trước', 'Nhắm lại'], 2, 'Nhìn thẳng phía trước.', ['Sai — nhìn xuống đất làm em cúi đầu.', 'Sai — nhìn lên trời làm ngửa cổ.', 'Đúng — mắt nhìn thẳng phía trước.', 'Sai — nhắm mắt thì không đứng nghiêm đúng được.']),
  ]),

  M(3, 'Quay phải – quay trái', [
    Q('Khẩu lệnh “Bên phải, quay!” em xoay theo?', ['Bên trái', 'Đằng sau', 'Đứng yên', 'Bên phải'], 3, 'Xoay sang bên phải.', ['Sai — lệnh là bên phải, không phải bên trái.', 'Sai — quay đằng sau là lệnh khác.', 'Sai — nghe lệnh quay thì phải xoay, không đứng yên.', 'Đúng — “bên phải, quay” thì em xoay sang bên phải.']),
    Q('“Bên trái, quay!” em xoay sang?', ['Đằng sau', 'Đứng yên', 'Bên phải', 'Bên trái'], 3, 'Xoay sang bên trái.', ['Sai — quay đằng sau là lệnh khác.', 'Sai — nghe lệnh quay thì phải xoay.', 'Sai — lệnh là bên trái, không phải bên phải.', 'Đúng — “bên trái, quay” thì em xoay sang bên trái.']),
    Q('Khi quay, em dùng?', ['Mũi chân nhảy lên', 'Gót chân làm trụ', 'Cả bàn chân', 'Bằng đầu gối'], 1, 'Lấy gót chân làm trụ để quay gọn.', ['Sai — nhảy lên thì quay không gọn.', 'Đúng — lấy gót chân làm trụ để quay gọn gàng.', 'Sai — cả bàn chân thì quay khó và chậm.', 'Sai — không quay bằng đầu gối được.']),
    Q('Sau khi quay, tư thế em phải?', ['Cười đùa', 'Chạy đi', 'Đứng nghiêm', 'Ngồi xuống'], 2, 'Quay xong trở lại tư thế nghiêm.', ['Sai — cười đùa làm lệch hàng.', 'Sai — chưa có lệnh thì không chạy đi.', 'Đúng — quay xong em trở lại tư thế đứng nghiêm.', 'Sai — không ngồi xuống sau khi quay.']),
  ]),

  M(4, 'Đi đều theo hàng', [
    Q('Đi đều cần?', ['Mỗi người một kiểu', 'Đi giật lùi', 'Bước cùng chân, đều nhịp', 'Chạy thật nhanh'], 2, 'Đi đều: cùng chân, đều nhịp.', ['Sai — mỗi người một kiểu thì hàng không đều.', 'Sai — đi giật lùi dễ ngã và lộn xộn.', 'Đúng — đi đều là bước cùng chân, đều nhịp với nhau.', 'Sai — chạy nhanh không còn là đi đều.']),
    Q('Khi đi đều, tay vung?', ['Để yên', 'Khoanh trước ngực', 'Giơ lên cao', 'Tự nhiên ngược với chân'], 3, 'Tay vung ngược chiều với chân tự nhiên.', ['Sai — để yên tay thì đi không cân bằng.', 'Sai — khoanh tay làm dáng đi không đẹp.', 'Sai — giơ tay lên cao thì mỏi và sai tư thế.', 'Đúng — tay vung tự nhiên ngược chiều với chân.']),
    Q('Khoảng cách giữa hai bạn nên?', ['Càng sát càng tốt', 'Đủ rộng, không đạp gót nhau', 'Không cần đều', 'Càng xa càng tốt'], 1, 'Đủ rộng để không đạp gót bạn.', ['Sai — quá sát dễ đạp gót bạn.', 'Đúng — đủ rộng để không đạp gót nhau.', 'Sai — khoảng cách cần đều cho hàng đẹp.', 'Sai — quá xa thì hàng bị đứt quãng.']),
    Q('Đi đều giúp em?', ['Mất bạn', 'Buồn ngủ', 'Mệt mỏi', 'Rèn nề nếp, kỉ luật'], 3, 'Rèn nề nếp và kỉ luật.', ['Sai — đi đều cùng nhau không làm mất bạn.', 'Sai — đi đều giúp tỉnh táo, không buồn ngủ.', 'Sai — đi đều nhẹ nhàng, không gây mệt mỏi.', 'Đúng — đi đều rèn nề nếp và tính kỉ luật.']),
  ]),

  M(5, 'Đi thường, đi nhanh', [
    Q('Đi thường khác đi nhanh ở chỗ?', ['Cao hơn', 'Quay đầu', 'Nhảy lên', 'Nhịp bước (chậm hơn)'], 3, 'Đi thường có nhịp chậm hơn đi nhanh.', ['Sai — đi thường không cao hơn đi nhanh.', 'Sai — quay đầu không liên quan đến nhịp đi.', 'Sai — đi thường không phải nhảy lên.', 'Đúng — đi thường có nhịp bước chậm hơn đi nhanh.']),
    Q('Khi đi nhanh, tay em?', ['Giơ lên trời', 'Vung mạnh hơn theo nhịp', 'Khoanh trước ngực', 'Đút túi quần'], 1, 'Tay vung mạnh hơn cho cân bằng.', ['Sai — giơ tay lên trời thì mỏi và mất cân bằng.', 'Đúng — đi nhanh thì tay vung mạnh hơn theo nhịp.', 'Sai — khoanh tay làm em đi không cân bằng.', 'Sai — đút túi quần dễ ngã, không vung được tay.']),
    Q('Lưng khi đi nên?', ['Vẹo sang một bên', 'Khom xuống', 'Ngửa ra sau', 'Thẳng'], 3, 'Lưng thẳng để dáng đẹp.', ['Sai — vẹo lưng làm dáng đi xấu và đau lưng.', 'Sai — khom lưng làm dáng đi không đẹp.', 'Sai — ngửa ra sau dễ ngã.', 'Đúng — giữ lưng thẳng cho dáng đi đẹp.']),
    Q('Trước khi tăng tốc em nên?', ['Cười to', 'Khởi động chân tay', 'Tăng tốc luôn', 'Nhắm mắt'], 1, 'Khởi động trước khi tăng tốc tránh đau cơ.', ['Sai — cười to không giúp ích cho việc tăng tốc.', 'Đúng — khởi động chân tay trước để tránh đau cơ.', 'Sai — tăng tốc luôn dễ bị căng cơ.', 'Sai — nhắm mắt rất nguy hiểm.']),
  ]),

  M(6, 'Chạy nhanh ngắn', [
    Q('Khi chạy nhanh, em nhìn?', ['Nhắm mắt', 'Quay sang bạn', 'Thẳng phía trước', 'Xuống chân'], 2, 'Nhìn thẳng phía trước để không vấp.', ['Sai — nhắm mắt khi chạy rất nguy hiểm.', 'Sai — quay sang bạn dễ va vào nhau.', 'Đúng — nhìn thẳng phía trước để không vấp ngã.', 'Sai — cúi nhìn chân dễ va vào bạn phía trước.']),
    Q('Khi xuất phát em nên?', ['Nằm sấp', 'Đứng thẳng đơ', 'Hơi khom người, dồn lực', 'Ngồi xổm'], 2, 'Hơi khom người để dồn lực bật đi.', ['Sai — nằm sấp thì không xuất phát nhanh được.', 'Sai — đứng thẳng đơ khó bật đi nhanh.', 'Đúng — hơi khom người để dồn lực bật đi.', 'Sai — ngồi xổm thì xuất phát chậm.']),
    Q('Khi về đích em phải?', ['Nhảy lên', 'Giảm tốc dần, không dừng đột ngột', 'Dừng phắt lại', 'Ngã xuống'], 1, 'Giảm tốc dần để không bị ngã.', ['Sai — nhảy lên dễ mất thăng bằng và ngã.', 'Đúng — giảm tốc dần để không bị ngã.', 'Sai — dừng phắt lại dễ ngã chúi về trước.', 'Sai — không nên cố tình ngã xuống.']),
    Q('Khi chạy thấy mệt, em?', ['Khóc to', 'Báo cô để nghỉ', 'Bỏ chạy ra ngoài', 'Cố sức ngất xỉu'], 1, 'Nói với cô/thầy để được nghỉ.', ['Sai — khóc to không giúp em đỡ mệt.', 'Đúng — báo cô để được nghỉ và uống nước.', 'Sai — tự ý bỏ ra ngoài là không an toàn.', 'Sai — cố quá sức rất nguy hiểm cho sức khoẻ.']),
  ]),

  M(7, 'Bài thể dục buổi sáng – tay', [
    Q('Động tác tay giúp?', ['Hết khát', 'No bụng', 'Khỏe chân', 'Khởi động vai và cánh tay'], 3, 'Động tác tay làm nóng vai và cánh tay.', ['Sai — động tác tay không làm hết khát.', 'Sai — tập tay không làm no bụng.', 'Sai — động tác tay làm nóng tay, không phải chân.', 'Đúng — động tác tay khởi động vai và cánh tay.']),
    Q('Khi giơ tay lên cao, lưng em?', ['Vẹo sang', 'Thẳng', 'Ngửa ngược', 'Cong xuống'], 1, 'Giữ lưng thẳng để đúng tư thế.', ['Sai — vẹo lưng là sai tư thế, dễ đau.', 'Đúng — giữ lưng thẳng cho đúng tư thế.', 'Sai — ngửa ngược lưng dễ ngã.', 'Sai — cong lưng xuống là sai động tác.']),
    Q('Tay vươn cao em nên hít vào hay thở ra?', ['Nín thở', 'Hít vào', 'Thở ra', 'Vừa hít vừa thở liên tục'], 1, 'Vươn cao kết hợp hít vào.', ['Sai — nín thở dễ mệt và chóng mặt.', 'Đúng — khi vươn tay cao thì hít vào.', 'Sai — thở ra hợp với lúc hạ tay xuống.', 'Sai — vừa hít vừa thở liên tục thì rối nhịp.']),
    Q('Tập thể dục buổi sáng giúp em?', ['Tỉnh táo, khỏe mạnh', 'Buồn ngủ', 'Học kém', 'Mệt cả ngày'], 0, 'Thể dục buổi sáng cho cơ thể khoẻ, tinh thần tỉnh táo.', ['Đúng — thể dục buổi sáng giúp em tỉnh táo, khoẻ mạnh.', 'Sai — thể dục giúp tỉnh táo, không gây buồn ngủ.', 'Sai — khoẻ mạnh thì học tốt hơn.', 'Sai — vận động vừa sức không làm mệt cả ngày.']),
  ]),

  M(8, 'Bài TD buổi sáng – chân', [
    Q('Động tác chân giúp?', ['Khoẻ tay', 'Khoẻ chân, dẻo hông', 'No bụng', 'Hết đau đầu'], 1, 'Tăng sức cơ chân và độ dẻo của hông.', ['Sai — động tác chân làm khoẻ chân, không phải tay.', 'Đúng — động tác chân giúp khoẻ chân và dẻo hông.', 'Sai — tập chân không làm no bụng.', 'Sai — động tác chân không chữa đau đầu.']),
    Q('Khi đứng bằng một chân để giữ thăng bằng, em nên?', ['Nhắm mắt', 'Quay đầu', 'Cười to', 'Mắt nhìn một điểm cố định'], 3, 'Nhìn một điểm cố định để giữ thăng bằng.', ['Sai — nhắm mắt thì rất khó giữ thăng bằng.', 'Sai — quay đầu làm em mất thăng bằng.', 'Sai — cười to không giúp đứng vững.', 'Đúng — nhìn một điểm cố định giúp giữ thăng bằng.']),
    Q('Khi tập, nếu mất thăng bằng em nên?', ['Ngã ra sau', 'Hạ chân kia xuống, đứng lại', 'Cố nhảy lên', 'Ôm bạn cạnh'], 1, 'Hạ chân xuống đứng vững lại.', ['Sai — cố ngã ra sau rất nguy hiểm.', 'Đúng — hạ chân kia xuống để đứng vững lại.', 'Sai — cố nhảy lên dễ ngã thêm.', 'Sai — ôm bạn làm cả hai cùng ngã.']),
    Q('Tập đều đặn động tác chân giúp?', ['Đi đứng vững vàng', 'Đi chậm hơn', 'Khó đi hơn', 'Quên đường'], 0, 'Chân khoẻ giúp đi đứng vững vàng.', ['Đúng — chân khoẻ giúp em đi đứng vững vàng hơn.', 'Sai — chân khoẻ thì đi nhanh nhẹn hơn.', 'Sai — chân khoẻ làm đi lại dễ hơn.', 'Sai — tập chân không liên quan đến nhớ đường.']),
  ]),

  M(9, 'Bài TD buổi sáng – lườn, bụng', [
    Q('Động tác lườn giúp?', ['Dẻo eo, hai bên sườn', 'No bụng', 'Hết đau răng', 'Khoẻ tay'], 0, 'Tăng độ dẻo cho phần eo (lườn).', ['Đúng — động tác lườn làm dẻo eo và hai bên sườn.', 'Sai — tập lườn không làm no bụng.', 'Sai — động tác lườn không chữa đau răng.', 'Sai — lườn làm dẻo eo, không phải khoẻ tay.']),
    Q('Khi nghiêng lườn, em nên?', ['Ngửa hẳn về sau', 'Cúi gập về trước', 'Giữ lưng dài, không gập về trước', 'Xoắn cổ'], 2, 'Giữ lưng dài, chỉ nghiêng sang bên.', ['Sai — ngửa hẳn về sau dễ ngã và sai động tác.', 'Sai — cúi gập về trước là động tác khác.', 'Đúng — giữ lưng dài, chỉ nghiêng sang bên.', 'Sai — xoắn cổ dễ đau cổ.']),
    Q('Động tác bụng giúp?', ['Khoẻ cơ bụng', 'Khoẻ tóc', 'Khoẻ tai', 'Khoẻ tay'], 0, 'Tập cơ bụng cho khoẻ vùng bụng.', ['Đúng — động tác bụng giúp khoẻ cơ bụng.', 'Sai — tập bụng không làm khoẻ tóc.', 'Sai — tập bụng không liên quan đến tai.', 'Sai — động tác bụng làm khoẻ bụng, không phải tay.']),
    Q('Nếu thấy chóng mặt em nên?', ['Bỏ ra ngoài', 'Báo cô, ngồi nghỉ', 'Cố tập tiếp', 'Tự ra vòi nước rửa mặt'], 1, 'Báo cô và ngồi nghỉ.', ['Sai — tự bỏ ra ngoài là không an toàn.', 'Đúng — báo cô rồi ngồi nghỉ cho đỡ chóng mặt.', 'Sai — cố tập tiếp dễ bị ngã.', 'Sai — tự ý đi một mình khi chóng mặt rất nguy hiểm.']),
  ]),

  M(10, 'Nhảy bước nhỏ tại chỗ', [
    Q('Khi nhảy, em tiếp đất bằng?', ['Cả bàn chân giậm mạnh', 'Đầu gối', 'Mũi bàn chân, gối hơi chùng', 'Gót chân cứng'], 2, 'Mũi chân tiếp đất, gối chùng để êm.', ['Sai — giậm mạnh cả bàn chân dễ đau và mạnh quá.', 'Sai — không tiếp đất bằng đầu gối được.', 'Đúng — mũi bàn chân chạm trước, gối chùng cho êm.', 'Sai — gót chân cứng tiếp đất rất đau.']),
    Q('Nhảy tại chỗ, em nên nhìn?', ['Thẳng phía trước', 'Lên trời', 'Xuống chân', 'Nhắm mắt'], 0, 'Nhìn thẳng phía trước.', ['Đúng — nhìn thẳng phía trước để giữ thăng bằng.', 'Sai — nhìn lên trời dễ mất thăng bằng.', 'Sai — cúi nhìn chân làm em chúi người.', 'Sai — nhắm mắt khi nhảy rất nguy hiểm.']),
    Q('Tay khi nhảy nên?', ['Đút túi', 'Giơ cao mãi', 'Vung tự nhiên giữ thăng bằng', 'Khoanh trước ngực'], 2, 'Tay vung tự nhiên giúp thăng bằng.', ['Sai — đút túi thì không giữ được thăng bằng.', 'Sai — giơ cao mãi làm mỏi tay.', 'Đúng — tay vung tự nhiên giúp giữ thăng bằng.', 'Sai — khoanh tay khó giữ thăng bằng khi nhảy.']),
    Q('Trước khi nhảy nhiều em nên?', ['Nhảy luôn', 'Ngồi xuống', 'Khởi động chân', 'Uống thật no nước'], 2, 'Khởi động chân tránh chấn thương.', ['Sai — nhảy luôn dễ bị đau cơ chân.', 'Sai — ngồi xuống thì chưa khởi động được.', 'Đúng — khởi động chân trước để tránh chấn thương.', 'Sai — uống no nước rồi nhảy dễ đau bụng.']),
  ]),

  M(11, 'Bật xa tại chỗ', [
    Q('Để bật xa, em?', ['Nhắm mắt nhảy', 'Đứng thẳng nhảy', 'Khuỵu gối lấy đà rồi bật mạnh', 'Ngồi xuống nhảy'], 2, 'Khuỵu gối lấy đà rồi bật mạnh đi.', ['Sai — nhắm mắt nhảy rất nguy hiểm.', 'Sai — đứng thẳng nhảy thì không bật xa được.', 'Đúng — khuỵu gối lấy đà rồi bật mạnh giúp bật xa.', 'Sai — ngồi xuống thì không bật xa được.']),
    Q('Khi bật xa, hai tay?', ['Khoanh trước ngực', 'Vung mạnh ra trước', 'Để yên', 'Cho vào túi'], 1, 'Vung tay ra trước giúp bật xa hơn.', ['Sai — khoanh tay làm bật không xa.', 'Đúng — vung tay mạnh ra trước giúp bật xa hơn.', 'Sai — để yên tay thì thiếu lực bật.', 'Sai — cho tay vào túi dễ ngã.']),
    Q('Tiếp đất khi bật xa?', ['Ngã sấp', 'Hai chân, gối chùng', 'Gập người ra trước', 'Một chân'], 1, 'Tiếp đất hai chân, gối chùng cho êm.', ['Sai — ngã sấp dễ bị đau.', 'Đúng — tiếp đất bằng hai chân, gối chùng cho êm.', 'Sai — gập người ra trước dễ ngã chúi.', 'Sai — một chân tiếp đất dễ ngã.']),
    Q('Trước khi bật em phải?', ['Uống thật nhiều nước', 'Nín thở thật lâu', 'Khởi động kĩ', 'Bật luôn'], 2, 'Khởi động kĩ để tránh đau cơ.', ['Sai — uống nhiều nước rồi bật dễ đau bụng.', 'Sai — nín thở lâu làm chóng mặt.', 'Đúng — khởi động kĩ để tránh đau cơ.', 'Sai — bật luôn chưa khởi động dễ căng cơ.']),
  ]),

  M(12, 'Ném bóng – tay không thuận', [
    Q('Ném bóng đi xa, em đứng?', ['Hai chân khép sát', 'Một chân nhón', 'Chân trước chân sau vững vàng', 'Ngồi xổm'], 2, 'Chân trước chân sau vững để ném mạnh.', ['Sai — hai chân khép sát thì đứng không vững.', 'Sai — một chân nhón dễ ngã khi ném.', 'Đúng — chân trước chân sau giúp đứng vững và ném mạnh.', 'Sai — ngồi xổm thì ném không xa được.']),
    Q('Khi ném, mắt em nhìn?', ['Lên trời', 'Xuống đất', 'Quay đi', 'Đích nhắm'], 3, 'Mắt nhìn đích để ném trúng.', ['Sai — nhìn lên trời thì ném không trúng.', 'Sai — nhìn xuống đất thì ném sai hướng.', 'Sai — quay đi thì không thấy đích.', 'Đúng — mắt nhìn đích để ném trúng.']),
    Q('Sau khi ném, em nên?', ['Để tay tiếp tục đi theo bóng', 'Bỏ ra ngoài', 'Quay lưng', 'Co tay ngay lại'], 0, 'Tay đi theo bóng cho lực mượt.', ['Đúng — tay đi theo bóng giúp lực ném mượt và xa hơn.', 'Sai — bỏ ra ngoài là không tập đúng.', 'Sai — quay lưng thì động tác ném không đúng.', 'Sai — co tay ngay làm bóng đi yếu.']),
    Q('Khi nhặt bóng, em phải?', ['Chú ý xung quanh, tránh va chạm', 'Đẩy bạn', 'Chạy ào ra giành', 'Đá bóng đi'], 0, 'Chú ý xung quanh để an toàn.', ['Đúng — chú ý xung quanh để tránh va chạm với bạn.', 'Sai — đẩy bạn là không ngoan và nguy hiểm.', 'Sai — chạy ào ra giành dễ va vào nhau.', 'Sai — đá bóng đi làm mất bóng và lộn xộn.']),
  ]),

  M(13, 'Bắt bóng bằng hai tay', [
    Q('Khi bắt bóng, em đặt tay?', ['Khoanh tay', 'Hai tay khum mở trước ngực', 'Hai tay sau lưng', 'Một tay'], 1, 'Hai bàn tay khum, sẵn sàng đón bóng.', ['Sai — khoanh tay thì không bắt được bóng.', 'Đúng — hai tay khum mở trước ngực để đón bóng.', 'Sai — tay sau lưng thì không bắt kịp.', 'Sai — một tay khó bắt chắc bóng.']),
    Q('Mắt em khi bắt bóng?', ['Nhìn lên trời', 'Nhìn xuống chân', 'Nhìn theo bóng', 'Nhắm lại'], 2, 'Nhìn theo bóng để bắt chính xác.', ['Sai — nhìn lên trời thì không thấy bóng tới.', 'Sai — nhìn xuống chân thì lỡ bóng.', 'Đúng — nhìn theo bóng để bắt cho chính xác.', 'Sai — nhắm mắt thì không thể bắt bóng.']),
    Q('Khi bóng chạm tay, em nên?', ['Hơi rút tay về cho êm', 'Đẩy tay ra trước', 'Cứng đờ', 'Quay lưng lại'], 0, 'Rút tay về để giảm lực và bắt chắc.', ['Đúng — hơi rút tay về để giảm lực và bắt chắc.', 'Sai — đẩy tay ra trước làm bóng bật ra.', 'Sai — tay cứng đờ làm bóng nảy đi.', 'Sai — quay lưng thì làm rơi bóng.']),
    Q('Nếu trượt bóng, em nên?', ['Đứng yên chờ bạn nhặt giúp', 'Đổ lỗi cho bạn', 'Nhặt lại, tập tiếp', 'Đá bóng đi cho khuất mắt'], 2, 'Nhặt lại bóng và tập tiếp.', ['Sai — chờ bạn nhặt giúp là chưa cố gắng.', 'Sai — đổ lỗi cho bạn là không ngoan.', 'Đúng — nhặt lại bóng và tập tiếp cho giỏi hơn.', 'Sai — đá bóng đi làm mất bóng.']),
  ]),

  M(14, 'Đi trên vạch kẻ thẳng', [
    Q('Đi trên vạch kẻ giúp?', ['Hết khát', 'Khoẻ tay', 'Rèn thăng bằng', 'No bụng'], 2, 'Rèn cảm giác thăng bằng.', ['Sai — đi vạch không làm hết khát.', 'Sai — đi vạch không làm khoẻ tay.', 'Đúng — đi trên vạch kẻ rèn cảm giác thăng bằng.', 'Sai — đi vạch không làm no bụng.']),
    Q('Khi đi, mắt em nhìn?', ['Nhắm lại', 'Nhìn trời', 'Phía trước, hơi xuống vạch', 'Quay sang bạn'], 2, 'Nhìn phía trước, hơi hướng xuống vạch.', ['Sai — nhắm mắt thì không thấy vạch.', 'Sai — nhìn trời dễ bước lệch.', 'Đúng — nhìn phía trước, hơi hướng xuống vạch.', 'Sai — quay sang bạn làm em đi lệch.']),
    Q('Hai tay giữ thăng bằng nên?', ['Đút túi', 'Dang ngang nhẹ', 'Khoanh trước ngực', 'Giơ cao mãi'], 1, 'Dang ngang nhẹ giúp thăng bằng.', ['Sai — đút túi thì khó giữ thăng bằng.', 'Đúng — dang tay ngang nhẹ giúp giữ thăng bằng.', 'Sai — khoanh tay khó giữ thăng bằng.', 'Sai — giơ tay cao mãi làm mỏi tay.']),
    Q('Nếu bước lệch ra ngoài vạch?', ['Tiếp tục đi lệch tới đích', 'Cố nhảy thật xa', 'Nhắm mắt đi tiếp cho nhanh', 'Đứng lại, bước trở về vạch'], 3, 'Đứng lại rồi bước trở lại vạch.', ['Sai — đi lệch tiếp thì không đúng bài tập.', 'Sai — cố nhảy xa dễ ngã.', 'Sai — nhắm mắt đi tiếp rất nguy hiểm.', 'Đúng — đứng lại rồi bước trở về vạch.']),
  ]),

  M(15, 'Đi trên ván hẹp', [
    Q('Trước khi đi ván, em kiểm tra?', ['Ván tự bay', 'Ván đẹp', 'Ván chắc, không trơn', 'Ván dài'], 2, 'Kiểm tra ván chắc và không trơn.', ['Sai — ván không tự bay được.', 'Sai — ván đẹp chưa chắc đã an toàn.', 'Đúng — kiểm tra ván chắc và không trơn để an toàn.', 'Sai — ván dài hay ngắn không quan trọng bằng độ chắc.']),
    Q('Khi đi ván, em đi?', ['Vừa đi vừa quay', 'Nhảy lò cò', 'Chậm, từng bước chắc', 'Chạy thật nhanh'], 2, 'Đi chậm và chắc để khỏi ngã.', ['Sai — vừa đi vừa quay dễ ngã.', 'Sai — nhảy lò cò trên ván rất nguy hiểm.', 'Đúng — đi chậm, từng bước chắc để khỏi ngã.', 'Sai — chạy nhanh trên ván dễ ngã.']),
    Q('Tay khi đi ván?', ['Khoanh trước ngực', 'Đút túi', 'Dang ngang giữ thăng bằng', 'Giơ cao mãi'], 2, 'Dang ngang để thăng bằng.', ['Sai — khoanh tay khó giữ thăng bằng.', 'Sai — đút túi thì dễ ngã.', 'Đúng — dang tay ngang để giữ thăng bằng.', 'Sai — giơ tay cao mãi làm mỏi và mất thăng bằng.']),
    Q('Nếu mất thăng bằng em?', ['Cố nhảy', 'Ngồi xuống ván', 'La hét', 'Hạ chân xuống đất, dừng lại'], 3, 'Hạ chân xuống đất an toàn.', ['Sai — cố nhảy dễ ngã đau.', 'Sai — ngồi xuống ván dễ trượt.', 'Sai — la hét không giúp giữ thăng bằng.', 'Đúng — hạ chân xuống đất và dừng lại cho an toàn.']),
  ]),

  M(16, 'Trò chơi: Mèo đuổi chuột', [
    Q('Trong trò Mèo đuổi chuột, mèo phải?', ['Đuổi bạn ra cổng', 'Cào bạn', 'Đánh chuột', 'Bắt được chuột'], 3, 'Mèo bắt được chuột là thắng.', ['Sai — không đuổi bạn ra cổng, chỉ đuổi trong vòng.', 'Sai — cào bạn là làm đau bạn, không được.', 'Sai — không được đánh bạn khi chơi.', 'Đúng — mèo bắt được chuột là thắng.']),
    Q('Khi chơi em không được?', ['Chạy nhẹ nhàng theo vòng', 'Xô đẩy, đánh bạn', 'Vỗ tay', 'Bịt mắt bạn để bắt dễ hơn'], 1, 'Không xô đẩy, đánh bạn.', ['Sai — chạy nhẹ nhàng theo vòng là chơi đúng.', 'Đúng — không được xô đẩy hay đánh bạn.', 'Sai — vỗ tay cổ vũ là việc nên làm.', 'Sai — bịt mắt bạn là chơi gian và làm bạn đau.']),
    Q('Vai trò các bạn ngoài vòng?', ['Nắm tay tạo hang, cổ vũ', 'Đẩy mèo ngã', 'Đứng im không cho mèo qua', 'Đè chuột'], 0, 'Bạn ngoài nắm tay tạo hang và cổ vũ.', ['Đúng — các bạn ngoài nắm tay tạo hang và cổ vũ.', 'Sai — đẩy mèo ngã làm bạn đau.', 'Sai — đứng im chặn đường là chơi không vui.', 'Sai — đè chuột là làm đau bạn.']),
    Q('Mục đích trò chơi là?', ['Giành thắng bằng mọi giá', 'Bắt bạn', 'Chọc giận bạn', 'Vận động vui vẻ, đoàn kết'], 3, 'Trò chơi để vận động và đoàn kết.', ['Sai — không cần thắng bằng mọi giá.', 'Sai — bắt bạn để làm khó không phải mục đích.', 'Sai — chọc giận bạn là không ngoan.', 'Đúng — trò chơi để vận động vui vẻ và đoàn kết.']),
  ]),

  M(17, 'Trò chơi: Bịt mắt bắt dê', [
    Q('Người bịt mắt phải?', ['Quay đầu', 'Hé mắt', 'Mở mắt', 'Bịt kín mắt, không nhìn trộm'], 3, 'Bịt kín mắt mới công bằng.', ['Sai — quay đầu để nhìn là chơi gian.', 'Sai — hé mắt nhìn trộm là không công bằng.', 'Sai — mở mắt thì không còn là bịt mắt bắt dê.', 'Đúng — bịt kín mắt, không nhìn trộm mới công bằng.']),
    Q('Khi bị bắt em phải?', ['Tháo khăn bịt mắt ra ngay', 'Tiếp tục làm người đi tìm', 'Cãi cô', 'Vào thay làm “dê”'], 3, 'Bạn bị bắt sẽ vào thay vị trí.', ['Sai — bạn bị bắt mới là người vào thay, không tháo khăn.', 'Sai — người đi tìm không phải là bạn vừa bị bắt.', 'Sai — cãi cô là không ngoan.', 'Đúng — bạn bị bắt sẽ vào thay làm người bịt mắt.']),
    Q('Sân chơi nên?', ['Có nhiều đá', 'Bằng phẳng, không vật cản', 'Có nhiều bậc thang', 'Trơn trượt vì mới rửa'], 1, 'Sân bằng phẳng để an toàn.', ['Sai — nhiều đá dễ vấp ngã.', 'Đúng — sân bằng phẳng, không vật cản thì an toàn.', 'Sai — bậc thang dễ ngã khi bịt mắt.', 'Sai — sân trơn trượt rất nguy hiểm.']),
    Q('Trò chơi rèn?', ['Cãi nhau', 'Hét to', 'Phản xạ, thính giác, vui vẻ', 'Đánh bạn'], 2, 'Rèn phản xạ, thính giác và sự vui vẻ.', ['Sai — chơi để vui chứ không phải cãi nhau.', 'Sai — hét to không phải điều trò chơi rèn.', 'Đúng — trò chơi rèn phản xạ, thính giác và sự vui vẻ.', 'Sai — đánh bạn là sai, không phải mục đích.']),
  ]),

  M(18, 'Đánh giá HK1', [
    Q('Kết thúc HK1, em đã biết?', ['Không biết gì', 'Chỉ biết chạy', 'Chỉ biết ngồi', 'Đứng nghiêm, đi đều, ném-bắt bóng'], 3, 'Em đã học nhiều kĩ năng cơ bản.', ['Sai — em đã học được nhiều điều rồi.', 'Sai — em biết nhiều kĩ năng chứ không chỉ chạy.', 'Sai — em học vận động chứ không chỉ ngồi.', 'Đúng — em đã biết đứng nghiêm, đi đều, ném và bắt bóng.']),
    Q('Khi đánh giá, em nên?', ['Làm qua loa cho xong', 'Tự tin thể hiện', 'Bỏ giờ học', 'Sợ hãi'], 1, 'Tự tin thể hiện điều đã học.', ['Sai — làm qua loa thì không thể hiện được khả năng.', 'Đúng — tự tin thể hiện những điều em đã học.', 'Sai — bỏ giờ học là không nên.', 'Sai — không cần sợ hãi, cứ bình tĩnh làm.']),
    Q('Nếu chưa làm tốt, em sẽ?', ['Trách cô', 'Đổ lỗi bạn', 'Tập luyện thêm', 'Bỏ cuộc'], 2, 'Tập luyện thêm để tiến bộ.', ['Sai — trách cô là không đúng.', 'Sai — đổ lỗi bạn không giúp em giỏi hơn.', 'Đúng — tập luyện thêm để tiến bộ.', 'Sai — bỏ cuộc thì không tiến bộ được.']),
    Q('Sau khi kiểm tra, em nên?', ['Cảm ơn cô, dọn dụng cụ', 'Bỏ về luôn', 'Cãi bạn', 'Vứt dụng cụ'], 0, 'Cảm ơn cô và dọn gọn dụng cụ.', ['Đúng — cảm ơn cô và dọn gọn dụng cụ.', 'Sai — bỏ về luôn là không lễ phép.', 'Sai — cãi bạn là không ngoan.', 'Sai — vứt dụng cụ làm hỏng đồ chung.']),
  ]),

  // ──────────────── HK2 ────────────────
  M(19, 'Khởi động đầu giờ', [
    Q('Khởi động giúp?', ['Mệt thêm', 'Đói bụng', 'Mất nước nhanh', 'Làm nóng cơ, tránh chấn thương'], 3, 'Làm nóng cơ giúp tránh chấn thương.', ['Sai — khởi động giúp khoẻ chứ không mệt thêm.', 'Sai — khởi động không liên quan đến đói bụng.', 'Sai — khởi động nhẹ nhàng không làm mất nước nhanh.', 'Đúng — khởi động làm nóng cơ, giúp tránh chấn thương.']),
    Q('Thứ tự khởi động hợp lí?', ['Ngẫu nhiên', 'Chân → đầu', 'Cổ → vai → tay → eo → chân', 'Bụng → cổ'], 2, 'Từ trên xuống: cổ, vai, tay, eo, chân.', ['Sai — làm ngẫu nhiên dễ bỏ sót khớp.', 'Sai — nên làm từ trên xuống, không phải từ chân lên.', 'Đúng — từ trên xuống: cổ, vai, tay, eo rồi chân.', 'Sai — thứ tự bụng rồi cổ chưa hợp lí.']),
    Q('Khởi động nên?', ['Nhẹ nhàng, tăng dần', 'Mạnh ngay từ đầu', 'Ngồi yên', 'Chạy hết sức'], 0, 'Nhẹ nhàng rồi tăng dần.', ['Đúng — khởi động nhẹ nhàng rồi tăng dần.', 'Sai — mạnh ngay từ đầu dễ đau cơ.', 'Sai — ngồi yên thì chưa khởi động.', 'Sai — chạy hết sức ngay dễ bị căng cơ.']),
    Q('Sau khởi động, em cảm thấy?', ['Lạnh hơn', 'Người ấm, sẵn sàng tập', 'Đói lả', 'Buồn ngủ'], 1, 'Người ấm lên, sẵn sàng tập.', ['Sai — khởi động làm người ấm chứ không lạnh hơn.', 'Đúng — người ấm lên và sẵn sàng tập.', 'Sai — khởi động không gây đói lả.', 'Sai — khởi động giúp tỉnh táo, không buồn ngủ.']),
  ]),

  M(20, 'Đi vượt chướng ngại vật thấp', [
    Q('Khi đi qua chướng ngại thấp, em?', ['Cúi gập người', 'Nhắm mắt', 'Nhảy hết sức', 'Nâng cao đầu gối, nhìn phía trước'], 3, 'Nâng cao đầu gối qua vật, nhìn thẳng.', ['Sai — cúi gập người dễ mất thăng bằng.', 'Sai — nhắm mắt thì không thấy vật cản.', 'Sai — nhảy hết sức dễ ngã.', 'Đúng — nâng cao đầu gối qua vật và nhìn phía trước.']),
    Q('Trước khi đi, em phải?', ['Quan sát chướng ngại', 'Lao vào luôn', 'Nhắm mắt bước qua cho dũng cảm', 'Quay đi'], 0, 'Quan sát kĩ vật cản.', ['Đúng — quan sát kĩ chướng ngại trước khi đi.', 'Sai — lao vào luôn dễ vấp ngã.', 'Sai — nhắm mắt bước qua rất nguy hiểm.', 'Sai — quay đi thì không qua được vật cản.']),
    Q('Nếu vướng chân, em?', ['Khóc to', 'Cố lao tiếp', 'Đá vật ra xa', 'Dừng lại, đi lại'], 3, 'Dừng lại, đi lại cho đúng.', ['Sai — khóc to không giúp em qua được.', 'Sai — cố lao tiếp dễ ngã đau.', 'Sai — đá vật ra xa làm hỏng bài tập.', 'Đúng — dừng lại rồi đi lại cho đúng.']),
    Q('Mục đích bài tập?', ['Để buồn', 'Để mệt', 'Để đánh nhau', 'Rèn khéo léo, phản xạ'], 3, 'Rèn khéo léo và phản xạ.', ['Sai — bài tập để vui và khoẻ, không phải để buồn.', 'Sai — tập vừa sức không nhằm làm em mệt.', 'Sai — bài tập không phải để đánh nhau.', 'Đúng — bài tập rèn sự khéo léo và phản xạ.']),
  ]),

  M(21, 'Chạy theo vạch kẻ thẳng', [
    Q('Chạy theo vạch giúp?', ['Hết oxy', 'Mất bạn', 'Giữ hướng, không lệch', 'Mệt nhanh'], 2, 'Giúp giữ thẳng hướng.', ['Sai — chạy theo vạch không làm hết oxy.', 'Sai — chạy theo vạch không làm mất bạn.', 'Đúng — chạy theo vạch giúp giữ thẳng hướng, không lệch.', 'Sai — chạy đúng cách không làm mệt nhanh hơn.']),
    Q('Tay khi chạy?', ['Đút túi', 'Vung tự nhiên trước-sau', 'Giơ cao', 'Khoanh ngực'], 1, 'Tay vung trước-sau theo nhịp.', ['Sai — đút túi dễ ngã khi chạy.', 'Đúng — tay vung tự nhiên trước-sau theo nhịp.', 'Sai — giơ tay cao làm mỏi và mất sức.', 'Sai — khoanh ngực thì chạy không cân bằng.']),
    Q('Hơi thở khi chạy?', ['Nín thở', 'Hít mũi, thở miệng đều', 'Hét to', 'Cười to'], 1, 'Hít mũi thở miệng, đều đặn.', ['Sai — nín thở làm chóng mặt.', 'Đúng — hít bằng mũi, thở bằng miệng đều đặn.', 'Sai — hét to làm hụt hơi nhanh.', 'Sai — cười to khi chạy dễ sặc.']),
    Q('Nếu hết hơi em?', ['Ngã ra sân', 'Đi bộ chậm rồi nghỉ', 'Cố chạy nhanh thêm', 'La hét'], 1, 'Đi bộ chậm rồi nghỉ lấy hơi.', ['Sai — ngã ra sân dễ bị đau.', 'Đúng — đi bộ chậm rồi nghỉ để lấy lại hơi.', 'Sai — cố chạy nhanh thêm rất nguy hiểm.', 'Sai — la hét càng làm hụt hơi.']),
  ]),

  M(22, 'Nghỉ Tết – Trò chơi dân gian: Kéo co', [
    Q('Kéo co cần?', ['Hai đội cân sức, một sợi dây dài', 'Một người chơi', 'Một quả bóng', 'Một cái thước'], 0, 'Hai đội kéo dây — cân sức là vui nhất.', ['Đúng — kéo co cần hai đội cân sức và một sợi dây dài.', 'Sai — một người thì không kéo co được.', 'Sai — kéo co dùng dây chứ không dùng bóng.', 'Sai — kéo co không dùng thước.']),
    Q('Khi kéo, em nên?', ['Ngồi xổm', 'Đứng thẳng đơ', 'Chùng gối, ngả người ra sau, kéo đều', 'Nhảy lên'], 2, 'Chùng gối, ngả người ra sau để dồn lực.', ['Sai — ngồi xổm thì không kéo được mạnh.', 'Sai — đứng thẳng đơ thì thiếu lực kéo.', 'Đúng — chùng gối, ngả người ra sau để dồn lực kéo đều.', 'Sai — nhảy lên thì mất lực và dễ ngã.']),
    Q('Đội thắng là đội?', ['Đứng yên lâu nhất', 'Kéo được khăn/vạch sang phía mình', 'Hét to nhất', 'Chạy nhanh nhất'], 1, 'Kéo được vạch/khăn sang phía mình.', ['Sai — đứng yên không quyết định thắng thua.', 'Đúng — đội kéo được khăn/vạch sang phía mình là thắng.', 'Sai — hét to không làm đội thắng.', 'Sai — kéo co không tính chạy nhanh.']),
    Q('Khi chơi xong, em nên?', ['Bắt tay đội bạn, không tức tối', 'Trêu chọc đội thua', 'Giành dây kéo về phần mình', 'Vứt dây'], 0, 'Bắt tay nhau, vui vẻ chấp nhận kết quả.', ['Đúng — bắt tay đội bạn, vui vẻ chấp nhận kết quả.', 'Sai — trêu chọc đội thua là không ngoan.', 'Sai — giành dây về phần mình là ích kỉ.', 'Sai — vứt dây làm hỏng đồ chung.']),
  ]),

  M(23, 'Trò chơi dân gian: Rồng rắn lên mây', [
    Q('Trong trò Rồng rắn, các bạn?', ['Đứng tách rời', 'Chạy lung tung', 'Nắm áo bạn trước thành hàng dài', 'Ngồi yên'], 2, 'Nắm áo bạn trước tạo thành rồng rắn.', ['Sai — đứng tách rời thì không thành rồng rắn.', 'Sai — chạy lung tung thì hàng bị rối.', 'Đúng — nắm áo bạn trước tạo thành hàng dài rồng rắn.', 'Sai — ngồi yên thì không chơi được.']),
    Q('Người “thầy thuốc” sẽ làm gì?', ['Đứng im', 'Trả lời câu hỏi rồi đuổi bắt “đuôi rắn”', 'Đi theo đuôi rắn cùng các bạn', 'Đánh bạn'], 1, 'Trả lời rồi đuổi bắt đuôi rắn.', ['Sai — thầy thuốc không chỉ đứng im.', 'Đúng — thầy thuốc trả lời câu hỏi rồi đuổi bắt đuôi rắn.', 'Sai — thầy thuốc đứng riêng, không đi theo đuôi rắn.', 'Sai — không được đánh bạn khi chơi.']),
    Q('Khi chơi, em không được?', ['Xô đẩy mạnh', 'Chạy nhịp nhàng', 'Hát vần', 'Nắm chặt áo bạn phía trước'], 0, 'Không được xô đẩy mạnh.', ['Đúng — không được xô đẩy mạnh kẻo bạn ngã.', 'Sai — chạy nhịp nhàng là chơi đúng.', 'Sai — hát vần là một phần của trò chơi.', 'Sai — nắm áo bạn phía trước là chơi đúng.']),
    Q('Trò chơi giúp em?', ['Buồn ngủ', 'Cãi nhau', 'Đoàn kết, nhanh nhẹn', 'Mệt mỏi'], 2, 'Đoàn kết và nhanh nhẹn.', ['Sai — trò chơi vui khiến em tỉnh táo, không buồn ngủ.', 'Sai — trò chơi để vui chứ không cãi nhau.', 'Đúng — trò chơi giúp em đoàn kết và nhanh nhẹn.', 'Sai — chơi vừa sức không làm mệt mỏi.']),
  ]),

  M(24, 'Ném vòng vào cọc', [
    Q('Khi ném vòng, em nhắm?', ['Chân của mình', 'Cọc đích', 'Bạn bên cạnh', 'Đám mây trên cao'], 1, 'Nhắm cọc để ném trúng.', ['Sai — nhắm chân mình thì vòng không tới cọc.', 'Đúng — nhắm cọc đích để ném vòng trúng.', 'Sai — nhắm vào bạn là nguy hiểm.', 'Sai — nhắm đám mây thì ném sai hướng.']),
    Q('Tư thế ném?', ['Hai chân khép', 'Ngồi xổm', 'Nằm sấp', 'Chân trước chân sau, tay xuôi vòng'], 3, 'Chân trước chân sau, tay tự nhiên đưa vòng.', ['Sai — hai chân khép thì đứng không vững.', 'Sai — ngồi xổm thì ném không tốt.', 'Sai — nằm sấp thì không ném được.', 'Đúng — chân trước chân sau, tay tự nhiên đưa vòng.']),
    Q('Sau khi ném, em?', ['Đẩy bạn', 'Tranh cãi', 'Chạy ào ra', 'Đợi đến lượt mình rồi nhặt'], 3, 'Đợi lượt rồi mới ra nhặt.', ['Sai — đẩy bạn là không ngoan.', 'Sai — tranh cãi làm mất trật tự.', 'Sai — chạy ào ra dễ va vào bạn.', 'Đúng — đợi đến lượt mình rồi mới ra nhặt vòng.']),
    Q('Nếu trượt, em?', ['Đổi sang ném bằng chân', 'Trách bạn', 'Đứng sát cọc rồi thả vòng', 'Tập lại, không nản'], 3, 'Tập lại cho khéo hơn.', ['Sai — bài tập là ném vòng bằng tay.', 'Sai — trách bạn không giúp em ném trúng.', 'Sai — đứng sát cọc thả vòng là chơi gian.', 'Đúng — tập lại, không nản để ném khéo hơn.']),
  ]),

  M(25, 'Đá bóng – tâng bóng đơn giản', [
    Q('Khi đá bóng, em đặt chân trụ?', ['Lên trên bóng', 'Cách bóng 2 mét', 'Sau lưng bóng', 'Cạnh quả bóng, mũi chỉ hướng đá'], 3, 'Chân trụ cạnh bóng, mũi chỉ hướng đá.', ['Sai — đặt chân lên bóng thì dễ ngã.', 'Sai — cách bóng 2 mét thì không đá tới.', 'Sai — đặt sau lưng bóng thì đá không trúng.', 'Đúng — chân trụ đặt cạnh bóng, mũi chỉ hướng đá.']),
    Q('Mắt em khi đá bóng?', ['Nhắm mắt', 'Nhìn trời', 'Nhìn bóng và đích', 'Quay đi'], 2, 'Vừa nhìn bóng vừa nhắm đích.', ['Sai — nhắm mắt thì không đá trúng.', 'Sai — nhìn trời thì lỡ bóng.', 'Đúng — vừa nhìn bóng vừa nhắm đích.', 'Sai — quay đi thì không thấy bóng.']),
    Q('Khi sút bóng, em chú ý?', ['Không sút vào người bạn', 'Sút lên trời', 'Sút vào cửa sổ', 'Sút mạnh nhất có thể'], 0, 'Tránh sút vào người bạn và đồ vật.', ['Đúng — chú ý không sút vào người bạn để giữ an toàn.', 'Sai — sút lên trời thì bóng không tới đích.', 'Sai — sút vào cửa sổ làm vỡ kính.', 'Sai — sút mạnh quá dễ trúng người hoặc đồ vật.']),
    Q('Sau khi tập, em?', ['Cất bóng đúng chỗ', 'Vứt bóng', 'Đem bóng về nhà', 'Đá bóng đi xa'], 0, 'Cất bóng đúng chỗ.', ['Đúng — cất bóng đúng chỗ cho gọn gàng.', 'Sai — vứt bóng làm hỏng đồ chung.', 'Sai — bóng của lớp không đem về nhà.', 'Sai — đá bóng đi xa làm mất bóng.']),
  ]),

  M(26, 'Tâng bóng bằng tay', [
    Q('Tâng bóng cần?', ['Cầm chặt', 'Đẩy nhẹ bằng lòng bàn tay, nhìn theo bóng', 'Đá lên', 'Đập mạnh'], 1, 'Lòng bàn tay đẩy nhẹ, mắt theo bóng.', ['Sai — cầm chặt thì không tâng được.', 'Đúng — đẩy nhẹ bằng lòng bàn tay và nhìn theo bóng.', 'Sai — bài này tâng bằng tay, không đá lên.', 'Sai — đập mạnh thì bóng bay đi mất.']),
    Q('Khi tập tâng, em đứng?', ['Ngồi xổm', 'Một chân', 'Hai chân khép sát', 'Hai chân rộng bằng vai'], 3, 'Hai chân rộng bằng vai để vững.', ['Sai — ngồi xổm thì khó tâng.', 'Sai — đứng một chân thì không vững.', 'Sai — hai chân khép sát thì dễ mất thăng bằng.', 'Đúng — hai chân rộng bằng vai để đứng vững.']),
    Q('Nếu bóng rơi, em?', ['Lấy chân giữ bóng lại', 'Đổi sang đá bóng cho dễ', 'Đá bóng đi', 'Nhặt và tập lại'], 3, 'Nhặt lên tập lại.', ['Sai — bài này dùng tay, không dùng chân giữ bóng.', 'Sai — bài tập là tâng bóng bằng tay.', 'Sai — đá bóng đi làm mất bóng.', 'Đúng — nhặt bóng lên rồi tập lại.']),
    Q('Mục tiêu tập?', ['Đau tay', 'Mệt mỏi', 'Khéo léo tay và mắt', 'Cãi nhau'], 2, 'Rèn sự khéo léo tay-mắt.', ['Sai — tập đúng cách không làm đau tay.', 'Sai — tập vừa sức không nhằm làm mệt mỏi.', 'Đúng — tập tâng bóng rèn sự khéo léo tay và mắt.', 'Sai — tập để giỏi hơn chứ không phải cãi nhau.']),
  ]),

  M(27, 'Bài thể dục đồng diễn (ôn)', [
    Q('Đồng diễn cần?', ['Mỗi người một kiểu', 'Cả lớp làm cùng nhịp', 'Ngồi xuống', 'Im lặng đứng yên'], 1, 'Tất cả cùng nhịp cho đẹp mắt.', ['Sai — mỗi người một kiểu thì không đẹp.', 'Đúng — cả lớp làm cùng nhịp mới đẹp mắt.', 'Sai — đồng diễn là vận động, không ngồi xuống.', 'Sai — đồng diễn cần làm động tác, không chỉ đứng yên.']),
    Q('Khi quên động tác, em?', ['Bỏ ra ngoài', 'Đứng yên giữa hàng', 'Liếc nhìn bạn để theo kịp', 'Tự ý đổi sang động tác khác'], 2, 'Quan sát bạn để theo kịp nhịp.', ['Sai — bỏ ra ngoài làm trống hàng.', 'Sai — đứng yên giữa hàng làm lệch đội hình.', 'Đúng — liếc nhìn bạn để theo kịp nhịp.', 'Sai — tự đổi động tác làm cả hàng lộn xộn.']),
    Q('Hàng ngũ đồng diễn cần?', ['Chen lấn', 'Đẩy nhau', 'Thẳng và đều', 'Lộn xộn'], 2, 'Đứng hàng thẳng và đều.', ['Sai — chen lấn làm hàng xô lệch.', 'Sai — đẩy nhau làm bạn ngã.', 'Đúng — hàng ngũ phải thẳng và đều mới đẹp.', 'Sai — lộn xộn thì đồng diễn không đẹp.']),
    Q('Đồng diễn rèn?', ['Tinh thần tập thể', 'Cãi nhau', 'Ích kỉ', 'Buồn ngủ'], 0, 'Rèn tinh thần tập thể.', ['Đúng — đồng diễn rèn tinh thần tập thể.', 'Sai — đồng diễn để hợp tác, không cãi nhau.', 'Sai — đồng diễn rèn sự đoàn kết, không ích kỉ.', 'Sai — đồng diễn giúp tỉnh táo, không buồn ngủ.']),
  ]),

  M(28, 'Đi nhanh chuyển sang chạy', [
    Q('Chuyển từ đi sang chạy nên?', ['Quay lưng chạy', 'Tăng nhịp dần, không đột ngột', 'Lao vọt lên ngay', 'Dừng lại rồi chạy'], 1, 'Tăng nhịp từ từ.', ['Sai — quay lưng chạy rất nguy hiểm.', 'Đúng — tăng nhịp dần, không chuyển đột ngột.', 'Sai — lao vọt lên ngay dễ căng cơ.', 'Sai — dừng lại rồi chạy làm gián đoạn nhịp.']),
    Q('Khi chạy phải giữ?', ['Đẩy bạn', 'Hàng và khoảng cách', 'Chen lấn', 'Bám sát gót bạn'], 1, 'Giữ hàng và khoảng cách an toàn.', ['Sai — đẩy bạn làm bạn ngã.', 'Đúng — giữ hàng và khoảng cách an toàn khi chạy.', 'Sai — chen lấn dễ va vào nhau.', 'Sai — bám sát gót bạn dễ giẫm phải nhau.']),
    Q('Hơi thở khi chạy?', ['Hít sâu, thở đều', 'Nín thở', 'Cười to', 'Há mồm hét'], 0, 'Hít sâu thở đều cho có sức.', ['Đúng — hít sâu và thở đều giúp em có sức chạy.', 'Sai — nín thở làm chóng mặt.', 'Sai — cười to làm hụt hơi.', 'Sai — há mồm hét càng mau mệt.']),
    Q('Sau khi về đích?', ['Nằm xuống', 'Ngồi phịch ngay', 'Uống nước thật nhanh', 'Đi bộ chậm, hít thở sâu'], 3, 'Đi bộ chậm và hít thở sâu để hồi phục.', ['Sai — nằm xuống ngay không tốt cho tim.', 'Sai — ngồi phịch ngay dễ chóng mặt.', 'Sai — uống nước thật nhanh dễ bị sặc.', 'Đúng — đi bộ chậm và hít thở sâu để hồi phục.']),
  ]),

  M(29, 'Trò chơi: Cướp cờ', [
    Q('Cướp cờ chia?', ['Một đội duy nhất', 'Hai đội đối diện, có cờ giữa sân', 'Không đội nào', 'Cả lớp đứng yên'], 1, 'Hai đội đối diện, cờ đặt giữa sân.', ['Sai — một đội thì không thi đấu được.', 'Đúng — hai đội đối diện, cờ đặt giữa sân.', 'Sai — phải chia đội mới chơi được.', 'Sai — cướp cờ là chạy đua, không đứng yên.']),
    Q('Khi cầm cờ chạy về, nếu bị chạm em?', ['Vẫn được tính điểm cờ', 'Mất lượt cướp', 'Vẫn ăn cờ', 'Đánh bạn'], 1, 'Bị chạm là mất lượt.', ['Sai — bị chạm thì không được tính điểm.', 'Đúng — bị chạm khi cầm cờ là mất lượt.', 'Sai — bị chạm rồi thì không ăn cờ được.', 'Sai — đánh bạn là sai luật và không ngoan.']),
    Q('Khi chơi em phải?', ['Lén giấu cờ trong áo', 'Đánh bạn', 'Xô đẩy bạn', 'Tuân thủ luật, không xô đẩy'], 3, 'Tuân thủ luật chơi, không xô đẩy.', ['Sai — giấu cờ trong áo là chơi gian.', 'Sai — đánh bạn là sai và nguy hiểm.', 'Sai — xô đẩy bạn làm bạn ngã.', 'Đúng — tuân thủ luật chơi và không xô đẩy bạn.']),
    Q('Trò chơi rèn?', ['Lười biếng', 'Nhanh nhẹn, đoàn kết', 'Buồn ngủ', 'Tức giận'], 1, 'Rèn nhanh nhẹn và tinh thần đồng đội.', ['Sai — chơi cướp cờ làm em nhanh nhẹn, không lười.', 'Đúng — trò chơi rèn sự nhanh nhẹn và đoàn kết.', 'Sai — chơi vui khiến em tỉnh táo, không buồn ngủ.', 'Sai — chơi để vui chứ không phải để tức giận.']),
  ]),

  M(30, 'Trò chơi: Nhảy bao bố', [
    Q('Nhảy bao bố em đứng?', ['Ngoài bao', 'Cầm bao chạy', 'Trong bao, hai tay giữ miệng bao', 'Trên bao'], 2, 'Đứng trong bao, tay giữ miệng bao.', ['Sai — đứng ngoài bao thì không phải nhảy bao bố.', 'Sai — cầm bao chạy là sai luật chơi.', 'Đúng — đứng trong bao, hai tay giữ miệng bao.', 'Sai — đứng trên bao thì không nhảy được.']),
    Q('Để nhảy nhanh, em?', ['Nhảy một chân', 'Quay vòng', 'Nhảy hai chân cùng lúc, nhịp đều', 'Cởi bao bố ra rồi chạy'], 2, 'Nhảy hai chân, nhịp đều.', ['Sai — nhảy một chân trong bao dễ ngã.', 'Sai — quay vòng làm em chậm và chóng mặt.', 'Đúng — nhảy hai chân cùng lúc, nhịp đều thì nhanh.', 'Sai — cởi bao ra rồi chạy là chơi gian.']),
    Q('Khi ngã, em nên?', ['Nằm im', 'Bỏ cuộc', 'Khóc to', 'Đứng dậy, tiếp tục'], 3, 'Đứng dậy nhảy tiếp.', ['Sai — nằm im thì không chơi tiếp được.', 'Sai — bỏ cuộc thì không hoàn thành.', 'Sai — khóc to không giúp em đứng dậy.', 'Đúng — đứng dậy và tiếp tục nhảy.']),
    Q('Sau khi chơi, em?', ['Vứt bao đi', 'Xé bao', 'Mang về nhà', 'Gập bao gọn gàng'], 3, 'Cất bao gọn gàng cho lần sau.', ['Sai — vứt bao làm hỏng đồ chung.', 'Sai — xé bao làm hỏng dụng cụ.', 'Sai — bao của lớp không mang về nhà.', 'Đúng — gập bao gọn gàng để cất cho lần sau.']),
  ]),

  M(31, 'An toàn khi tập luyện', [
    Q('Trước khi tập, em kiểm tra?', ['Tóc có thơm không', 'Có ai xem không', 'Sân tập sạch, không vật sắc', 'Áo có đẹp không'], 2, 'Đảm bảo sân an toàn, không vật sắc.', ['Sai — tóc thơm không liên quan đến an toàn.', 'Sai — có ai xem không thì không quan trọng.', 'Đúng — kiểm tra sân tập sạch, không có vật sắc nhọn.', 'Sai — áo đẹp không phải điều cần kiểm tra để an toàn.']),
    Q('Khi đau, em phải?', ['Cố tập tiếp', 'Báo ngay cho cô/thầy', 'Đổ lỗi cho bạn', 'Giấu đi'], 1, 'Báo ngay cho cô/thầy để xử lí.', ['Sai — cố tập tiếp khi đau làm nặng thêm.', 'Đúng — báo ngay cho cô/thầy để được xử lí.', 'Sai — đổ lỗi cho bạn không giúp em đỡ đau.', 'Sai — giấu đi làm vết đau nặng hơn.']),
    Q('Trang phục an toàn?', ['Đi dép lê', 'Buộc dây giày gọn, không đeo trang sức', 'Mặc áo dài', 'Đeo vòng to'], 1, 'Buộc dây giày, không đeo trang sức gây vướng.', ['Sai — dép lê dễ tuột và vấp ngã.', 'Đúng — buộc dây giày gọn và không đeo trang sức gây vướng.', 'Sai — áo dài vướng víu khi vận động.', 'Sai — đeo vòng to dễ vướng và gây thương tích.']),
    Q('Sau khi tập, em không nên?', ['Lau khô mồ hôi', 'Uống nước từng ngụm', 'Tắm ngay bằng nước lạnh', 'Đi bộ nhẹ'], 2, 'Tránh tắm lạnh ngay sau khi tập.', ['Sai — lau khô mồ hôi là việc nên làm.', 'Sai — uống nước từng ngụm là tốt.', 'Đúng — không nên tắm ngay bằng nước lạnh khi người còn nóng.', 'Sai — đi bộ nhẹ giúp cơ thể hồi phục.']),
  ]),

  M(32, 'Tập hợp – dóng hàng', [
    Q('Khẩu lệnh “Tập hợp!” em phải?', ['Đi chỗ khác', 'Chạy đến vị trí, đứng hàng ngay', 'Ngồi xuống', 'Đứng im'], 1, 'Nhanh chóng tập hợp đứng hàng.', ['Sai — đi chỗ khác là không nghe lệnh.', 'Đúng — nhanh chóng chạy đến vị trí và đứng hàng ngay.', 'Sai — tập hợp là đứng hàng, không ngồi xuống.', 'Sai — đứng im một chỗ thì không vào hàng được.']),
    Q('Dóng hàng dọc, em nhìn?', ['Nhìn chân bạn phía trước', 'Bạn bên cạnh', 'Nhìn cô đứng phía trên', 'Gáy bạn phía trước'], 3, 'Nhìn gáy bạn phía trước để dóng thẳng.', ['Sai — nhìn chân bạn thì khó dóng thẳng.', 'Sai — nhìn bạn bên cạnh hợp với hàng ngang.', 'Sai — nhìn cô thì không dóng được hàng dọc.', 'Đúng — nhìn gáy bạn phía trước để dóng hàng dọc thẳng.']),
    Q('Dóng hàng ngang, em nhìn?', ['Bạn bên phải/trái để thẳng hàng', 'Quay sau', 'Trần nhà', 'Xuống chân'], 0, 'Nhìn bạn cùng hàng để dóng thẳng.', ['Đúng — nhìn bạn bên phải/trái để dóng hàng ngang thẳng.', 'Sai — quay sau thì lệch hàng.', 'Sai — nhìn trần nhà thì không dóng được hàng.', 'Sai — nhìn xuống chân thì khó dóng thẳng.']),
    Q('Khoảng cách trong hàng?', ['Một cánh tay', 'Hai mét', 'Một bước chân', 'Sát gáy bạn'], 0, 'Khoảng một cánh tay là vừa.', ['Đúng — khoảng một cánh tay là vừa đẹp.', 'Sai — hai mét thì hàng quá thưa.', 'Sai — một bước chân thì hơi hẹp.', 'Sai — sát gáy bạn thì quá chật, dễ va vào nhau.']),
  ]),

  M(33, 'Ôn tập – Đi, chạy, nhảy, bóng', [
    Q('Khi ôn tập, em nên?', ['Bỏ qua phần khó', 'Tập đầy đủ và đúng kĩ thuật', 'Làm cho có', 'Cười đùa'], 1, 'Tập đầy đủ và đúng kĩ thuật.', ['Sai — bỏ qua phần khó thì không tiến bộ.', 'Đúng — tập đầy đủ và đúng kĩ thuật mới giỏi.', 'Sai — làm cho có thì không học được gì.', 'Sai — cười đùa làm em không tập trung.']),
    Q('Nếu một động tác chưa tốt?', ['Bỏ qua', 'Hỏi cô và tập thêm', 'Tự tập sai thêm vài lần', 'Đổ lỗi'], 1, 'Hỏi cô, tập thêm cho tiến bộ.', ['Sai — bỏ qua thì động tác mãi không tốt.', 'Đúng — hỏi cô và tập thêm để tiến bộ.', 'Sai — tập sai nhiều lần thành quen sai.', 'Sai — đổ lỗi không giúp em làm tốt hơn.']),
    Q('Khi bạn làm tốt, em?', ['Cười nhạo', 'Khen ngợi, học hỏi', 'Trêu bạn', 'Ghét bạn'], 1, 'Khen ngợi và học hỏi bạn.', ['Sai — cười nhạo là không ngoan.', 'Đúng — khen ngợi và học hỏi bạn làm tốt.', 'Sai — trêu bạn là không lịch sự.', 'Sai — ghét bạn vì bạn giỏi là không nên.']),
    Q('Sau ôn tập em cảm thấy?', ['Mệt mỏi không học', 'Tự tin hơn', 'Sợ hãi', 'Quên hết các động tác đã học'], 1, 'Ôn tập giúp em tự tin hơn.', ['Sai — ôn tập giúp em vững hơn, không làm chán học.', 'Đúng — ôn tập giúp em tự tin hơn.', 'Sai — ôn tập làm em yên tâm, không sợ hãi.', 'Sai — ôn tập giúp em nhớ chứ không quên.']),
  ]),

  M(34, 'Kiểm tra cuối năm', [
    Q('Khi tới lượt, em nên?', ['Bình tĩnh thực hiện', 'Bỏ ra ngoài', 'Cuống cuồng', 'Chen lên làm trước bạn'], 0, 'Bình tĩnh thực hiện cho tốt.', ['Đúng — bình tĩnh thực hiện thì làm tốt hơn.', 'Sai — bỏ ra ngoài là không hoàn thành bài.', 'Sai — cuống cuồng dễ làm sai.', 'Sai — chen lên trước bạn là không lịch sự.']),
    Q('Nghe hiệu lệnh em phải?', ['Cãi cô', 'Im lặng đứng yên', 'Làm đúng theo lệnh', 'Làm theo ý mình'], 2, 'Làm đúng theo hiệu lệnh.', ['Sai — cãi cô là không ngoan.', 'Sai — nghe lệnh thì phải làm, không đứng yên.', 'Đúng — làm đúng theo hiệu lệnh.', 'Sai — làm theo ý mình là không nghe lời cô.']),
    Q('Nếu sai, em nên?', ['Cãi cô', 'Nản chí, bỏ', 'Bình tĩnh, làm lại đúng', 'Đổ lỗi bạn'], 2, 'Bình tĩnh làm lại cho đúng.', ['Sai — cãi cô là không đúng.', 'Sai — nản chí bỏ thì không tiến bộ.', 'Đúng — bình tĩnh và làm lại cho đúng.', 'Sai — đổ lỗi bạn không giúp em sửa sai.']),
    Q('Sau khi kiểm tra, em?', ['Cảm ơn cô', 'Cãi bạn', 'Vứt dụng cụ', 'Bỏ về luôn'], 0, 'Cảm ơn cô, dọn gọn dụng cụ.', ['Đúng — cảm ơn cô và dọn gọn dụng cụ.', 'Sai — cãi bạn là không ngoan.', 'Sai — vứt dụng cụ làm hỏng đồ chung.', 'Sai — bỏ về luôn là không lễ phép.']),
  ]),

  M(35, 'Tổng kết – Trò chơi dân gian tổng hợp', [
    Q('Tổng kết năm, lớp tổ chức?', ['Cãi nhau', 'Trò chơi vận động vui vẻ', 'Ngồi im', 'Bỏ lớp'], 1, 'Tổ chức trò chơi vận động vui vẻ.', ['Sai — tổng kết là để vui chứ không cãi nhau.', 'Đúng — lớp tổ chức trò chơi vận động vui vẻ.', 'Sai — ngồi im thì không vui và không vận động.', 'Sai — bỏ lớp là không nên.']),
    Q('Tinh thần chơi là?', ['Hơn thua nhau', 'Trêu chọc bạn', 'Vui là chính, đoàn kết', 'Phải thắng bằng mọi giá'], 2, 'Vui là chính, đề cao đoàn kết.', ['Sai — không nên đặt nặng hơn thua.', 'Sai — trêu chọc bạn là không ngoan.', 'Đúng — vui là chính và đề cao đoàn kết.', 'Sai — không cần thắng bằng mọi giá.']),
    Q('Sau một năm em đã?', ['Khoẻ hơn, nhanh nhẹn hơn', 'Yếu hơn', 'Lười hơn', 'Quên hết'], 0, 'Khoẻ hơn và nhanh nhẹn hơn.', ['Đúng — sau một năm tập luyện em khoẻ hơn, nhanh nhẹn hơn.', 'Sai — tập luyện làm em khoẻ hơn, không yếu đi.', 'Sai — tập đều đặn giúp em chăm hơn.', 'Sai — em nhớ và làm tốt hơn chứ không quên.']),
    Q('Em sẽ tiếp tục?', ['Ngồi xem điện thoại nhiều', 'Lười vận động', 'Tập thể dục đều đặn', 'Bỏ tập'], 2, 'Tiếp tục tập thể dục đều đặn.', ['Sai — ngồi xem điện thoại nhiều không tốt cho sức khoẻ.', 'Sai — lười vận động làm cơ thể yếu đi.', 'Đúng — tiếp tục tập thể dục đều đặn cho khoẻ.', 'Sai — bỏ tập thì không giữ được sức khoẻ.']),
  ]),

  M(36, 'Kết thúc Lớp 1 — Một năm chăm vận động', [
    Q('Bài thể dục buổi sáng giúp em điều gì?', ['Mệt mỏi cả ngày', 'Tỉnh táo, dẻo dai, học tốt hơn', 'Buồn ngủ hơn', 'Không có tác dụng gì'], 1, 'Vận động buổi sáng giúp cơ thể tỉnh táo và dẻo dai.', ['Sai — tập vừa sức làm em khoẻ hơn chứ không mệt cả ngày.', 'Đúng — tập buổi sáng giúp em tỉnh táo, dẻo dai, học tốt hơn.', 'Sai — tập thể dục làm em tỉnh táo chứ không buồn ngủ.', 'Sai — tập thể dục rất có ích cho sức khoẻ.']),
    Q('Trong hè, mỗi ngày em nên vận động ít nhất bao lâu?', ['5 phút', '10 phút', '30 phút', 'Không cần vận động'], 2, 'Ít nhất 30 phút mỗi ngày: chạy, nhảy dây, đá cầu…', ['Sai — 5 phút là quá ít để cơ thể khoẻ lên.', 'Sai — 10 phút vẫn còn ít, em nên tập nhiều hơn.', 'Đúng — ít nhất 30 phút mỗi ngày.', 'Sai — hè vẫn cần vận động đều để giữ sức khoẻ.']),
    Q('Chơi fair-play nghĩa là gì?', ['Thắng bằng mọi giá', 'Trêu chọc bạn thua', 'Chơi trung thực, tôn trọng bạn', 'Ăn gian cho nhanh thắng'], 2, 'Fair-play là chơi trung thực và tôn trọng bạn chơi.', ['Sai — thắng bằng mọi giá không phải tinh thần thể thao.', 'Sai — trêu chọc bạn thua là không tử tế.', 'Đúng — fair-play là chơi trung thực và tôn trọng bạn.', 'Sai — ăn gian là trái với tinh thần fair-play.']),
    Q('Trò chơi nào là trò chơi dân gian em đã học?', ['Bóng rổ nhà nghề', 'Đua xe', 'Cờ vua', 'Kéo co'], 3, 'Lớp 1 chơi bịt mắt bắt dê, kéo co, rồng rắn lên mây.', ['Sai — đó là môn thể thao chuyên nghiệp, không phải trò chơi dân gian.', 'Sai — đua xe không phải trò chơi dân gian ở trường.', 'Sai — cờ vua là môn cờ, không phải trò chơi vận động dân gian.', 'Đúng — kéo co là trò chơi dân gian em đã chơi cùng lớp.']),
    Q('Trước khi tập luyện em cần làm gì?', ['Khởi động', 'Ăn thật no', 'Uống nước ngọt', 'Chạy hết sức ngay'], 0, 'Khởi động giúp tránh chấn thương.', ['Đúng — khởi động làm nóng cơ thể, giúp tránh bị đau.', 'Sai — ăn quá no rồi tập sẽ bị đau bụng.', 'Sai — nước ngọt không tốt trước khi vận động.', 'Sai — chạy hết sức ngay rất dễ bị chuột rút, chấn thương.']),
    Q('Để có năng lượng cho ngày mới, em nên?', ['Thức khuya', 'Bỏ bữa sáng', 'Xem điện thoại tới khuya', 'Ngủ sớm và ngủ đủ giấc'], 3, 'Ngủ sớm, ăn đủ, uống đủ nước là nền tảng sức khoẻ.', ['Sai — thức khuya làm em mệt và khó tập trung.', 'Sai — bữa sáng cho em năng lượng để học và chơi.', 'Sai — xem điện thoại khuya làm em khó ngủ.', 'Đúng — ngủ sớm và đủ giấc giúp em khoẻ cho ngày mới.']),
  ]),
];

export const P1GDTC_SCENARIOS = indexBy(P1GDTC_WEEKS);
