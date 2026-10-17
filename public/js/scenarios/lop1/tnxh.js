// ============================================================
// Lớp 1 · TỰ NHIÊN & XÃ HỘI — 35 tuần (HK1: 1–18 · HK2: 19–35)
// Bám CT GDPT 2018: Gia đình · Trường học · Cộng đồng địa phương
// → Thực vật · Động vật · Cơ thể người · Trái Đất – Bầu trời.
// ID prefix: "P1TNXH-wNN-quiz".
// ============================================================
import { Q, W, indexBy } from './_helper.js';

const M = (n, title, qs, opts) => W('P1TNXH', 'tnxh', n, title, qs, opts);

export const P1TNXH_WEEKS = [
  // ──────────────── HK1 — GIA ĐÌNH · TRƯỜNG HỌC · CỘNG ĐỒNG ────────────────
  M(1, 'Gia đình của em', [
    Q('Trong gia đình em thường có những ai?', ['Bố, mẹ và các con', 'Chỉ có em', 'Chỉ có bạn bè', 'Chỉ có bố'], 0, 'Gia đình cơ bản gồm bố, mẹ và các con.', ['Đúng — gia đình thường có bố, mẹ và các con.', 'Sai — nhà em còn có bố mẹ nữa, không chỉ mình em.', 'Sai — bạn bè là người ở lớp, không phải gia đình.', 'Sai — gia đình còn có mẹ và các con nữa.']),
    Q('Người sinh ra em là?', ['Bố mẹ', 'Cô giáo', 'Bác hàng xóm', 'Bạn bè'], 0, 'Bố mẹ là người sinh ra em.', ['Đúng — bố mẹ là người sinh ra em.', 'Sai — cô giáo dạy em ở trường, không sinh ra em.', 'Sai — bác hàng xóm ở gần nhà, không sinh ra em.', 'Sai — bạn bè cùng chơi với em thôi.']),
    Q('Bố của bố em gọi là?', ['Ông nội', 'Chú ruột', 'Ông ngoại', 'Bác'], 0, 'Bố của bố = ông nội.', ['Đúng — bố của bố em là ông nội.', 'Sai — chú là em trai của bố, không phải bố của bố.', 'Sai — ông ngoại là bố của mẹ.', 'Sai — bác là anh của bố, không phải bố của bố.']),
    Q('Mẹ của mẹ em gọi là?', ['Cô', 'Mẹ kế', 'Bà nội', 'Bà ngoại'], 3, 'Mẹ của mẹ = bà ngoại.', ['Sai — cô là em gái của bố.', 'Sai — mẹ kế không phải mẹ của mẹ.', 'Sai — bà nội là mẹ của bố.', 'Đúng — mẹ của mẹ em là bà ngoại.']),
    Q('Hành động lễ phép với ông bà là?', ['Bỏ đi chơi', 'Không nghe lời', 'Cãi lại', 'Chào hỏi, vâng lời'], 3, 'Lễ phép = chào hỏi, vâng lời.', ['Sai — bỏ đi chơi không chào là chưa ngoan.', 'Sai — không nghe lời ông bà là chưa ngoan.', 'Sai — cãi lại ông bà là vô lễ.', 'Đúng — chào hỏi và vâng lời là lễ phép.']),
    Q('Trong gia đình em yêu thương ai?', ['Chỉ yêu em bé', 'Chỉ yêu bố', 'Tất cả mọi người', 'Không yêu ai'], 2, 'Yêu thương tất cả thành viên trong gia đình.', ['Sai — em yêu cả nhà chứ không chỉ em bé.', 'Sai — em yêu cả mẹ và mọi người nữa.', 'Đúng — em yêu thương tất cả mọi người trong nhà.', 'Sai — gia đình thì phải yêu thương nhau.']),
  ]),

  M(2, 'Đồ dùng trong nhà', [
    Q('Đồ dùng để ngồi là?', ['Cái chổi', 'Cái ghế', 'Cái nồi', 'Cái chậu'], 1, 'Cái ghế dùng để ngồi.', ['Sai — chổi để quét nhà, không phải để ngồi.', 'Đúng — cái ghế dùng để ngồi.', 'Sai — cái nồi để nấu ăn.', 'Sai — cái chậu để đựng nước.']),
    Q('Đồ dùng để nấu cơm là?', ['Cái giường', 'Nồi cơm điện', 'Cái tủ', 'Cái bàn'], 1, 'Nồi cơm điện dùng nấu cơm.', ['Sai — cái giường để ngủ.', 'Đúng — nồi cơm điện dùng để nấu cơm.', 'Sai — cái tủ để cất đồ.', 'Sai — cái bàn để ngồi học, ngồi ăn.']),
    Q('Đồ dùng để ngủ là?', ['Cái ghế', 'Cái chậu', 'Cái bàn', 'Cái giường'], 3, 'Cái giường để ngủ.', ['Sai — cái ghế để ngồi.', 'Sai — cái chậu để đựng nước.', 'Sai — cái bàn để học, để ăn.', 'Đúng — cái giường dùng để ngủ.']),
    Q('Đồ dùng để quét nhà là?', ['Cái nồi', 'Cái thìa', 'Cái bát', 'Cái chổi'], 3, 'Chổi để quét nhà.', ['Sai — cái nồi để nấu ăn.', 'Sai — cái thìa để xúc thức ăn.', 'Sai — cái bát để đựng cơm.', 'Đúng — cái chổi dùng để quét nhà.']),
    Q('Sau khi dùng xong đồ vật, em nên?', ['Đập vỡ', 'Ném đi', 'Vứt bừa bãi', 'Cất gọn vào chỗ cũ'], 3, 'Cất gọn để giữ nhà ngăn nắp.', ['Sai — đập vỡ là phá đồ, rất phí.', 'Sai — ném đi sẽ làm hỏng đồ.', 'Sai — vứt bừa làm nhà bừa bộn.', 'Đúng — cất gọn vào chỗ cũ cho nhà ngăn nắp.']),
    Q('Đồ dùng nguy hiểm trẻ em KHÔNG nên tự dùng:', ['Dao, kéo, bếp lửa', 'Chổi quét', 'Sách vở', 'Bút chì'], 0, 'Dao, kéo, bếp dễ gây tai nạn.', ['Đúng — dao, kéo, bếp lửa dễ gây bị thương, bị bỏng.', 'Sai — chổi quét an toàn, em dùng được.', 'Sai — sách vở để học, không nguy hiểm.', 'Sai — bút chì để viết, em dùng được.']),
  ]),

  M(3, 'Công việc nhà em làm được', [
    Q('Việc bạn nhỏ lớp 1 có thể giúp mẹ là?', ['Tự gấp quần áo của mình', 'Sửa điện', 'Nấu cơm bằng bếp gas', 'Đi chợ một mình'], 0, 'Việc nhẹ phù hợp lứa tuổi.', ['Đúng — tự gấp quần áo là việc nhẹ em làm được.', 'Sai — sửa điện rất nguy hiểm, để người lớn làm.', 'Sai — bếp gas nóng và nguy hiểm với em.', 'Sai — em còn nhỏ, đi chợ một mình không an toàn.']),
    Q('Sau khi ăn xong, em nên?', ['Ném bát', 'Bỏ bát đi chơi', 'Để bát trên giường', 'Mang bát ra bồn rửa'], 3, 'Phụ dọn bát đũa giúp gia đình.', ['Sai — ném bát sẽ làm vỡ bát.', 'Sai — bỏ bát đi chơi là chưa ngoan.', 'Sai — để bát trên giường làm bẩn giường.', 'Đúng — mang bát ra bồn rửa giúp bố mẹ.']),
    Q('Đồ chơi chơi xong em nên?', ['Ném ra sân', 'Đập vỡ', 'Bỏ giữa nhà', 'Cất vào hộp'], 3, 'Cất gọn để không vấp ngã, không mất đồ.', ['Sai — ném ra sân sẽ làm mất, làm hỏng đồ chơi.', 'Sai — đập vỡ là phá đồ chơi.', 'Sai — bỏ giữa nhà dễ làm người khác vấp ngã.', 'Đúng — cất vào hộp cho gọn gàng.']),
    Q('Việc giúp đỡ bố mẹ thể hiện?', ['Sự lười biếng', 'Sự ngại ngùng', 'Tình yêu thương', 'Sự ích kỷ'], 2, 'Yêu thương qua hành động giúp đỡ.', ['Sai — giúp bố mẹ là chăm chỉ, không phải lười.', 'Sai — giúp bố mẹ là việc tốt, không phải ngại ngùng.', 'Đúng — giúp đỡ bố mẹ là thể hiện tình yêu thương.', 'Sai — ích kỷ là chỉ nghĩ cho mình, không giúp ai.']),
    Q('Khi mẹ mệt, em nên?', ['Khóc to', 'Bỏ đi chơi', 'Đòi mẹ chơi cùng', 'Hỏi thăm và rót nước cho mẹ'], 3, 'Quan tâm khi người thân không khoẻ.', ['Sai — khóc to làm mẹ thêm mệt.', 'Sai — bỏ đi chơi là không quan tâm mẹ.', 'Sai — mẹ đang mệt, không nên đòi mẹ chơi.', 'Đúng — hỏi thăm và rót nước là quan tâm mẹ.']),
    Q('Hành động nào KHÔNG tốt?', ['Tự dọn đồ chơi', 'Vứt rác bừa bãi', 'Mời ông bà ăn cơm', 'Chào bố mẹ khi đi học'], 1, 'Vứt rác bừa làm bẩn nhà.', ['Sai — tự dọn đồ chơi là việc tốt.', 'Đúng — vứt rác bừa bãi là không tốt, làm bẩn nhà.', 'Sai — mời ông bà ăn cơm là lễ phép.', 'Sai — chào bố mẹ khi đi học là ngoan.']),
  ]),

  M(4, 'An toàn ở nhà (1) — Tránh điện, lửa', [
    Q('Hành động nguy hiểm cần TRÁNH là?', ['Tưới cây', 'Cắm ngón tay vào ổ điện', 'Rửa tay sạch', 'Đọc sách'], 1, 'Chọc vào ổ điện bị điện giật.', ['Sai — tưới cây là việc tốt, không nguy hiểm.', 'Đúng — cắm tay vào ổ điện sẽ bị điện giật rất nguy hiểm.', 'Sai — rửa tay sạch là việc tốt.', 'Sai — đọc sách an toàn và bổ ích.']),
    Q('Tay ướt có nên chạm vào ổ điện?', ['Chỉ chạm 1 lần', 'Không, rất nguy hiểm', 'Được, nếu tay khô ráo', 'Có, nếu lau nhẹ trước'], 1, 'Nước dẫn điện → dễ bị giật.', ['Sai — chạm 1 lần cũng bị điện giật.', 'Đúng — tay ướt chạm ổ điện rất nguy hiểm.', 'Sai — câu hỏi nói tay ướt, mà tay ướt thì không được chạm.', 'Sai — tay còn ướt vẫn rất nguy hiểm.']),
    Q('Khi bếp đang cháy lửa, em nên?', ['Ném giấy vào lửa', 'Đứng xa', 'Lại gần xem', 'Nghịch quanh bếp'], 1, 'Đứng xa để tránh bỏng.', ['Sai — ném giấy vào lửa làm cháy to hơn.', 'Đúng — đứng xa bếp lửa để khỏi bị bỏng.', 'Sai — lại gần lửa dễ bị bỏng.', 'Sai — nghịch quanh bếp rất nguy hiểm.']),
    Q('Thấy nồi nước sôi trên bếp, em làm gì?', ['Mở nắp ngay', 'Đổ tay thử', 'Tự bê xuống', 'Báo người lớn'], 3, 'Trẻ nhỏ không tự bê nồi nóng.', ['Sai — mở nắp nồi sôi, hơi nóng bốc ra làm bỏng.', 'Sai — nước sôi rất nóng, đổ vào tay sẽ bỏng.', 'Sai — nồi nóng nặng, em tự bê dễ bị bỏng.', 'Đúng — báo người lớn để họ giúp em.']),
    Q('Nếu thấy khói/lửa to ở nhà, em phải?', ['Hô lớn báo người lớn và chạy ra', 'Trốn dưới giường', 'Tiếp tục chơi', 'Đóng kín cửa'], 0, 'Báo người lớn và thoát ra nơi an toàn.', ['Đúng — hô báo người lớn và chạy ra nơi an toàn.', 'Sai — trốn dưới giường rất nguy hiểm khi có cháy.', 'Sai — có cháy mà còn chơi thì rất nguy hiểm.', 'Sai — đóng kín cửa khiến em bị mắc kẹt bên trong.']),
    Q('Số điện thoại cứu hoả ở Việt Nam là?', ['115', '113', '116', '114'], 3, '114 = cứu hoả.', ['Sai — 115 là số cấp cứu y tế.', 'Sai — 113 là số công an.', 'Sai — 116 không phải số cứu hoả.', 'Đúng — 114 là số gọi cứu hoả.']),
  ]),

  M(5, 'An toàn ở nhà (2) — Tránh ngộ độc, té ngã', [
    Q('Thấy chai thuốc lạ, em có nên uống thử không?', ['Uống ít thôi', 'Chia bạn cùng uống', 'Có, nếu nhãn còn mới', 'Không, rất nguy hiểm'], 3, 'Có thể là thuốc/hoá chất gây ngộ độc.', ['Sai — uống ít thuốc lạ vẫn có thể ngộ độc.', 'Sai — không được cho bạn uống thuốc lạ.', 'Sai — nhãn mới cũng không được tự uống thuốc lạ.', 'Đúng — không uống thuốc lạ vì có thể bị ngộ độc.']),
    Q('Thức ăn rơi xuống đất bẩn, em nên?', ['Đưa em bé ăn', 'Nhặt lên ăn', 'Cất vào tủ', 'Bỏ đi'], 3, 'Bỏ đi để tránh vi khuẩn.', ['Sai — đồ bẩn không được cho em bé ăn.', 'Sai — đồ rơi xuống đất bẩn, ăn vào dễ đau bụng.', 'Sai — đồ ăn bẩn cất vào tủ sẽ làm bẩn tủ.', 'Đúng — bỏ đi vì đã dính bẩn, có vi khuẩn.']),
    Q('Trên cầu thang em nên?', ['Trượt cầu thang', 'Chạy nhảy nô đùa', 'Đẩy bạn', 'Đi từng bậc cẩn thận'], 3, 'Đi cẩn thận để không bị ngã.', ['Sai — trượt cầu thang rất dễ bị ngã.', 'Sai — chạy nhảy trên cầu thang dễ té.', 'Sai — đẩy bạn làm bạn ngã, rất nguy hiểm.', 'Đúng — đi từng bậc cẩn thận để không bị ngã.']),
    Q('Khi sàn nhà ướt, em nên?', ['Nhảy lên', 'Chạy nhanh qua', 'Trượt chân chơi', 'Đi cẩn thận'], 3, 'Sàn ướt rất trơn, dễ ngã.', ['Sai — nhảy trên sàn ướt dễ trượt ngã.', 'Sai — chạy nhanh trên sàn ướt rất dễ ngã.', 'Sai — sàn ướt trơn, trượt chân chơi sẽ ngã.', 'Đúng — sàn ướt trơn nên đi cẩn thận.']),
    Q('Khi nghi ngờ ai bị ngộ độc, cần?', ['Để mặc', 'Báo người lớn, gọi 115', 'Đùa giỡn', 'Cho uống thêm thuốc lạ'], 1, '115 là số cấp cứu.', ['Sai — để mặc thì người bị ngộ độc sẽ nặng hơn.', 'Đúng — báo người lớn và gọi 115 để cấp cứu.', 'Sai — lúc đó phải giúp đỡ, không được đùa giỡn.', 'Sai — cho uống thêm thuốc lạ càng nguy hiểm.']),
    Q('Đồ chơi nhỏ có nên cho vào miệng?', ['Cho em ăn thử', 'Có, nếu nhỏ vừa miệng', 'Không, dễ hóc nghẹn', 'Ngậm tí thôi'], 2, 'Dễ hóc nghẹn nguy hiểm.', ['Sai — không cho em bé ngậm đồ chơi nhỏ.', 'Sai — đồ nhỏ vừa miệng càng dễ bị hóc.', 'Đúng — không cho vào miệng vì dễ hóc nghẹn.', 'Sai — ngậm tí cũng có thể bị hóc.']),
  ]),

  M(6, 'Lớp học của em', [
    Q('Em đang học lớp mấy?', ['Lớp Lá (mẫu giáo)', 'Lớp mầm', 'Lớp 1', 'Lớp Chồi'], 2, 'Sách này dành cho lớp 1.', ['Sai — lớp Lá là ở trường mầm non rồi.', 'Sai — lớp mầm là ở trường mầm non rồi.', 'Đúng — em đang học lớp 1.', 'Sai — lớp Chồi là ở trường mầm non rồi.']),
    Q('Người trực tiếp dạy em là?', ['Lao công', 'Cô/thầy giáo chủ nhiệm', 'Bác sĩ', 'Bảo vệ'], 1, 'Thầy/cô chủ nhiệm dạy lớp em.', ['Sai — cô lao công dọn vệ sinh trường.', 'Đúng — thầy cô chủ nhiệm dạy lớp em.', 'Sai — bác sĩ chữa bệnh, không dạy học.', 'Sai — bác bảo vệ giữ an toàn cho trường.']),
    Q('Khi gặp thầy cô, em nên?', ['Chạy đi', 'Cười to', 'Quay đi', 'Chào lễ phép'], 3, 'Chào thầy cô là lễ phép.', ['Sai — chạy đi không chào là chưa ngoan.', 'Sai — cười to không chào là chưa lễ phép.', 'Sai — quay đi không chào là vô lễ.', 'Đúng — chào thầy cô lễ phép là ngoan.']),
    Q('Trong lớp học có?', ['Giường ngủ', 'Bể bơi', 'Bảng, bàn, ghế, sách vở', 'Bếp ăn'], 2, 'Đồ dùng cơ bản trong lớp.', ['Sai — giường ngủ ở nhà, không ở lớp.', 'Sai — bể bơi không có trong lớp học.', 'Đúng — lớp học có bảng, bàn, ghế, sách vở.', 'Sai — bếp ăn ở nhà bếp, không ở lớp.']),
    Q('Khi muốn phát biểu, em phải?', ['Im lặng', 'Đứng lên chạy', 'Hét to', 'Giơ tay xin phép'], 3, 'Giơ tay là quy tắc lớp học.', ['Sai — im lặng thì cô không biết em muốn nói.', 'Sai — đứng lên chạy làm mất trật tự lớp.', 'Sai — hét to làm ồn cả lớp.', 'Đúng — giơ tay xin phép rồi mới nói.']),
    Q('Em đến lớp để làm gì?', ['Chỉ chơi', 'Để ngủ trưa với bạn', 'Xem TV', 'Học và làm quen bạn bè'], 3, 'Đến lớp để học và chơi cùng bạn.', ['Sai — đến lớp còn để học chứ không chỉ chơi.', 'Sai — đến lớp chủ yếu để học, không phải để ngủ.', 'Sai — đến lớp để học, không phải xem TV.', 'Đúng — đến lớp để học và làm quen bạn bè.']),
  ]),

  M(7, 'Đồ dùng học tập', [
    Q('Đồ dùng để viết là?', ['Thước kẻ', 'Cục tẩy', 'Cặp sách', 'Bút'], 3, 'Bút để viết.', ['Sai — thước kẻ để đo và kẻ thẳng.', 'Sai — cục tẩy để xoá chữ sai.', 'Sai — cặp sách để đựng đồ dùng học tập.', 'Đúng — bút dùng để viết.']),
    Q('Đồ dùng để đọc là?', ['Bút chì', 'Vở ô li', 'Sách', 'Bảng con'], 2, 'Sách để đọc, để học.', ['Sai — bút chì để viết.', 'Sai — vở ô li để viết bài.', 'Đúng — sách dùng để đọc, để học.', 'Sai — bảng con để tập viết, không phải để đọc.']),
    Q('Đồ dùng để đo, kẻ thẳng là?', ['Cái chậu', 'Cái thước', 'Cái cốc', 'Cái mũ'], 1, 'Thước dùng để đo và kẻ.', ['Sai — cái chậu để đựng nước.', 'Đúng — cái thước dùng để đo và kẻ thẳng.', 'Sai — cái cốc để uống nước.', 'Sai — cái mũ để đội đầu.']),
    Q('Đồ dùng đựng sách vở khi đi học là?', ['Cái rổ', 'Cái nồi', 'Cái bình', 'Cặp sách'], 3, 'Cặp sách (ba lô) đựng sách vở.', ['Sai — cái rổ để đựng rau, đồ trong bếp.', 'Sai — cái nồi để nấu ăn.', 'Sai — cái bình để đựng nước.', 'Đúng — cặp sách dùng đựng sách vở đi học.']),
    Q('Sau khi học xong, em nên?', ['Vứt sách bừa bãi', 'Bỏ quên ở lớp', 'Xé sách', 'Cất sách vở vào cặp'], 3, 'Cất gọn để dùng cho ngày mai.', ['Sai — vứt sách bừa làm hỏng và mất sách.', 'Sai — bỏ quên ở lớp thì mai không có sách học.', 'Sai — xé sách là phá sách, rất phí.', 'Đúng — cất sách vở vào cặp cho gọn.']),
    Q('Giữ gìn đồ dùng học tập là?', ['Vẽ bẩn lên sách', 'Xé trang sách', 'Đập vỡ thước', 'Bọc bìa cẩn thận'], 3, 'Giữ gìn để dùng lâu, không tốn tiền.', ['Sai — vẽ bẩn lên sách làm sách xấu, hỏng.', 'Sai — xé trang sách là phá sách.', 'Sai — đập vỡ thước là làm hỏng đồ.', 'Đúng — bọc bìa cẩn thận giúp giữ gìn đồ dùng.']),
  ]),

  M(8, 'An toàn ở trường', [
    Q('Trong sân trường, em nên?', ['Leo lên cây cao', 'Đu vào cổng', 'Chạy nhảy xô đẩy mạnh', 'Chơi nhẹ nhàng, an toàn'], 3, 'Chơi an toàn để không bị thương.', ['Sai — leo cây cao dễ ngã, rất nguy hiểm.', 'Sai — đu vào cổng dễ ngã và làm hỏng cổng.', 'Sai — xô đẩy mạnh làm bạn và em bị thương.', 'Đúng — chơi nhẹ nhàng, an toàn để không bị thương.']),
    Q('Khi xuống cầu thang trường, em phải?', ['Trượt cầu thang', 'Chen lấn', 'Đi hàng đôi, vịn tay', 'Chạy nhanh'], 2, 'Đi cẩn thận tránh ngã chấn thương.', ['Sai — trượt cầu thang rất dễ bị ngã.', 'Sai — chen lấn làm bạn ngã, nguy hiểm.', 'Đúng — đi hàng đôi và vịn tay để an toàn.', 'Sai — chạy nhanh trên cầu thang dễ té.']),
    Q('Bạn rủ em trèo lên hàng rào, em sẽ?', ['Im lặng đi theo', 'Từ chối và báo cô', 'Trèo cùng', 'Cười cợt'], 1, 'Hành động nguy hiểm, cần từ chối.', ['Sai — im lặng đi theo việc nguy hiểm là không nên.', 'Đúng — từ chối và báo cô vì trèo rào rất nguy hiểm.', 'Sai — trèo cùng dễ bị ngã, bị thương.', 'Sai — cười cợt là cổ vũ việc nguy hiểm.']),
    Q('Khi bị bạn đánh, em nên?', ['Đánh lại', 'Báo thầy cô', 'Im lặng chịu đựng', 'Khóc rồi bỏ học'], 1, 'Báo thầy cô để được giúp đỡ.', ['Sai — đánh lại làm cả hai bị thương.', 'Đúng — báo thầy cô để được giúp đỡ.', 'Sai — im lặng chịu đựng thì bạn vẫn còn đánh.', 'Sai — bỏ học không giải quyết được việc.']),
    Q('Em không nên mang vật gì đến trường?', ['Dao, vật sắc nhọn', 'Sách vở', 'Cặp sách', 'Hộp bút màu'], 0, 'Dao, vật sắc nhọn rất nguy hiểm.', ['Đúng — dao, vật sắc nhọn rất nguy hiểm.', 'Sai — sách vở là đồ học tập, cần mang đi.', 'Sai — cặp sách dùng để đựng đồ học tập.', 'Sai — hộp bút màu để vẽ, em mang được.']),
    Q('Khi bị đau ở trường, em đến đâu?', ['Thư viện', 'Cổng trường', 'Phòng y tế', 'Sân bóng'], 2, 'Phòng y tế chăm sóc khi đau.', ['Sai — thư viện để đọc sách, không chữa đau.', 'Sai — cổng trường không phải nơi chữa đau.', 'Đúng — phòng y tế chăm sóc khi em bị đau.', 'Sai — sân bóng để chơi, không chữa đau.']),
  ]),

  M(9, 'Bạn bè trong lớp', [
    Q('Khi bạn bị ngã, em nên?', ['Đến đỡ bạn dậy', 'Chỉ trỏ trêu', 'Chạy đi mách cô rồi thôi', 'Cười nhạo'], 0, 'Giúp đỡ bạn khi gặp khó khăn.', ['Đúng — đến đỡ bạn dậy là biết giúp đỡ bạn.', 'Sai — chỉ trỏ trêu làm bạn buồn.', 'Sai — nên đỡ bạn dậy trước, không bỏ mặc bạn.', 'Sai — cười nhạo bạn là không tốt.']),
    Q('Khi bạn không có bút, em có?', ['Giấu bút đi', 'Mách cô liền', 'Cười bạn', 'Cho bạn mượn'], 3, 'Chia sẻ thể hiện tình bạn.', ['Sai — giấu bút đi là ích kỷ.', 'Sai — chuyện nhỏ này không cần mách cô.', 'Sai — cười bạn làm bạn buồn.', 'Đúng — cho bạn mượn bút là biết chia sẻ.']),
    Q('Bạn nói chuyện với em, em nên?', ['Quay đi', 'Lắng nghe', 'Bịt tai', 'Nói to át đi'], 1, 'Lịch sự lắng nghe khi bạn nói.', ['Sai — quay đi là không tôn trọng bạn.', 'Đúng — lắng nghe khi bạn nói là lịch sự.', 'Sai — bịt tai là không nghe bạn nói.', 'Sai — nói to át đi là không lịch sự.']),
    Q('Một người bạn tốt là?', ['Biết chia sẻ, giúp đỡ', 'Hay đòi quà', 'Hay bắt nạt', 'Hay nói xấu'], 0, 'Bạn tốt giúp nhau cùng tiến bộ.', ['Đúng — bạn tốt biết chia sẻ và giúp đỡ.', 'Sai — hay đòi quà không phải bạn tốt.', 'Sai — hay bắt nạt là bạn xấu.', 'Sai — hay nói xấu là bạn không tốt.']),
    Q('Trong lớp em có bạn yếu hơn, em nên?', ['Trêu chọc', 'Yêu thương, giúp đỡ', 'Cười nhạo', 'Tránh xa'], 1, 'Yêu thương bạn cùng lớp.', ['Sai — trêu chọc bạn là không tốt.', 'Đúng — yêu thương và giúp đỡ bạn cùng lớp.', 'Sai — cười nhạo làm bạn buồn.', 'Sai — tránh xa bạn là không thân thiện.']),
    Q('Khi tranh cãi với bạn, em nên?', ['Đánh nhau', 'Giận luôn', 'Nói chuyện nhẹ nhàng', 'Mách phụ huynh ngay'], 2, 'Hoà nhã trao đổi để hiểu nhau.', ['Sai — đánh nhau làm cả hai bị thương.', 'Sai — giận luôn thì hai bạn không hiểu nhau.', 'Đúng — nói chuyện nhẹ nhàng để hiểu nhau.', 'Sai — chuyện nhỏ nên tự nói với nhau trước.']),
  ]),

  M(10, 'An toàn khi tham gia giao thông (1)', [
    Q('Em đi bộ trên đường ở đâu?', ['Giữa đường', 'Lòng đường', 'Trên xe ô tô đậu', 'Vỉa hè'], 3, 'Vỉa hè dành cho người đi bộ.', ['Sai — đi giữa đường rất nguy hiểm vì có xe.', 'Sai — lòng đường dành cho xe chạy.', 'Sai — không được leo lên xe ô tô đậu.', 'Đúng — vỉa hè dành cho người đi bộ.']),
    Q('Khi qua đường, em phải?', ['Đi giữa đường', 'Chạy băng qua', 'Đi vào vạch trắng dành cho người đi bộ', 'Nhảy qua'], 2, 'Vạch kẻ ngang (sọc ngựa vằn) cho người đi bộ.', ['Sai — đi giữa đường rất nguy hiểm.', 'Sai — chạy băng qua dễ bị xe đâm.', 'Đúng — đi vào vạch trắng (sọc ngựa vằn) cho an toàn.', 'Sai — nhảy qua đường rất nguy hiểm.']),
    Q('Đèn giao thông màu đỏ nghĩa là?', ['Chạy nhanh', 'Chuẩn bị', 'Dừng lại', 'Đi chậm lại'], 2, 'Đỏ = dừng.', ['Sai — đèn đỏ phải dừng, không được chạy.', 'Sai — đèn đỏ là dừng hẳn, không phải chuẩn bị.', 'Đúng — đèn đỏ nghĩa là dừng lại.', 'Sai — đèn đỏ phải dừng hẳn, không đi chậm.']),
    Q('Đèn giao thông màu xanh nghĩa là?', ['Dừng lại', 'Đi', 'Chạy lùi', 'Chuẩn bị dừng'], 1, 'Xanh = được đi.', ['Sai — đèn đỏ mới là dừng lại.', 'Đúng — đèn xanh nghĩa là được đi.', 'Sai — đèn xanh là đi tới, không chạy lùi.', 'Sai — đèn vàng mới là chuẩn bị dừng.']),
    Q('Đèn vàng nghĩa là?', ['Dừng lại', 'Chuẩn bị dừng', 'Chạy nhanh', 'Được phép đi nhanh'], 1, 'Vàng = đi chậm, chuẩn bị dừng.', ['Sai — đèn đỏ mới là dừng hẳn.', 'Đúng — đèn vàng là đi chậm, chuẩn bị dừng.', 'Sai — đèn vàng phải đi chậm, không chạy nhanh.', 'Sai — đèn vàng là chuẩn bị dừng, không đi nhanh.']),
    Q('Trẻ em đi qua đường nên?', ['Vừa đi vừa chơi', 'Nắm tay người lớn', 'Chạy thật nhanh', 'Đi một mình'], 1, 'Nắm tay người lớn cho an toàn.', ['Sai — vừa đi vừa chơi dễ bị xe đâm.', 'Đúng — nắm tay người lớn khi qua đường cho an toàn.', 'Sai — chạy thật nhanh dễ bị ngã, bị tai nạn.', 'Sai — trẻ em không nên qua đường một mình.']),
  ]),

  M(11, 'An toàn khi tham gia giao thông (2)', [
    Q('Khi ngồi sau xe máy với bố mẹ, em phải?', ['Nhắm mắt', 'Đứng lên', 'Đội mũ bảo hiểm', 'Bỏ tay ra hai bên'], 2, 'Đội mũ bảo hiểm là bắt buộc.', ['Sai — nhắm mắt không giúp em an toàn.', 'Sai — đứng lên trên xe rất dễ ngã.', 'Đúng — đội mũ bảo hiểm để bảo vệ đầu.', 'Sai — bỏ tay ra hai bên dễ ngã, phải vịn chắc.']),
    Q('Khi ngồi trong ô tô, em nên?', ['Thắt dây an toàn', 'Đứng lên', 'Mở cửa lúc xe chạy', 'Thò đầu ra ngoài'], 0, 'Thắt dây an toàn để bảo vệ.', ['Đúng — thắt dây an toàn để bảo vệ em.', 'Sai — đứng lên khi xe chạy rất nguy hiểm.', 'Sai — mở cửa lúc xe chạy rất nguy hiểm.', 'Sai — thò đầu ra ngoài rất nguy hiểm.']),
    Q('Em có nên chơi đùa giữa đường?', ['Chỉ chơi tí', 'Không, rất nguy hiểm', 'Được, nếu đường ít xe', 'Có, vào buổi tối'], 1, 'Đường có xe → cấm chơi.', ['Sai — chơi tí giữa đường vẫn nguy hiểm.', 'Đúng — không chơi giữa đường vì xe chạy nguy hiểm.', 'Sai — đường ít xe vẫn có thể có xe bất ngờ.', 'Sai — buổi tối càng tối, càng nguy hiểm hơn.']),
    Q('Đi xe đạp khi nào?', ['Đi đêm khuya một mình', 'Đi ban ngày, có người lớn', 'Đi giữa lòng đường', 'Đi ngược chiều'], 1, 'An toàn nhất khi có người lớn.', ['Sai — đi đêm khuya một mình rất nguy hiểm.', 'Đúng — đi ban ngày có người lớn là an toàn nhất.', 'Sai — đi giữa lòng đường dễ bị xe đâm.', 'Sai — đi ngược chiều rất nguy hiểm.']),
    Q('Phương tiện giao thông đường bộ là?', ['Máy bay', 'Ô tô, xe máy', 'Thuyền', 'Tàu thuỷ'], 1, 'Đường bộ: ô tô, xe máy, xe đạp...', ['Sai — máy bay bay trên trời.', 'Đúng — ô tô, xe máy chạy trên đường bộ.', 'Sai — thuyền đi dưới nước.', 'Sai — tàu thuỷ đi trên biển, trên sông.']),
    Q('Khi xe buýt đang chạy, em không nên?', ['Thò đầu/tay ra cửa sổ', 'Nhường ghế', 'Ngồi yên', 'Vịn chắc tay'], 0, 'Thò đầu/tay ra rất nguy hiểm.', ['Đúng — thò đầu, tay ra cửa sổ rất nguy hiểm.', 'Sai — nhường ghế là việc ngoan, nên làm.', 'Sai — ngồi yên trên xe là an toàn.', 'Sai — vịn chắc tay để khỏi ngã, nên làm.']),
  ]),

  M(12, 'Nơi em sống', [
    Q('Nơi nhiều gia đình cùng sinh sống gọi là?', ['Lớp học', 'Siêu thị', 'Xóm/phường/thôn', 'Bệnh viện'], 2, 'Xóm/làng/phường là cộng đồng dân cư.', ['Sai — lớp học là nơi em học, không phải nơi nhiều gia đình ở.', 'Sai — siêu thị là nơi mua bán đồ.', 'Đúng — xóm, phường, thôn là nơi nhiều gia đình cùng ở.', 'Sai — bệnh viện là nơi chữa bệnh.']),
    Q('Hàng xóm là?', ['Người bán hàng', 'Người trong lớp', 'Người ở nhà bên cạnh', 'Người ở rất xa'], 2, 'Hàng xóm = người ở gần nhà.', ['Sai — người bán hàng là ở chợ, ở cửa hàng.', 'Sai — người trong lớp là bạn học của em.', 'Đúng — hàng xóm là người ở nhà bên cạnh.', 'Sai — hàng xóm là người ở gần, không phải ở xa.']),
    Q('Khi gặp hàng xóm, em nên?', ['Phớt lờ', 'Trốn đi', 'Quát to', 'Chào hỏi lễ phép'], 3, 'Chào hỏi để tạo tình cảm tốt.', ['Sai — phớt lờ là không lịch sự.', 'Sai — trốn đi là không thân thiện.', 'Sai — quát to là vô lễ.', 'Đúng — chào hỏi lễ phép để mọi người quý mến.']),
    Q('Vùng có nhiều ruộng đồng, cây cối là?', ['Làng quê', 'Vùng biển', 'Sa mạc', 'Thành phố'], 0, 'Làng quê có ruộng, vườn, cây.', ['Đúng — làng quê có nhiều ruộng đồng và cây cối.', 'Sai — vùng biển có nhiều nước biển, cát.', 'Sai — sa mạc khô cằn, ít cây cối.', 'Sai — thành phố nhiều nhà cao tầng và xe cộ.']),
    Q('Vùng có nhiều nhà cao tầng, xe cộ là?', ['Bãi biển', 'Làng quê', 'Thành phố', 'Núi cao'], 2, 'Thành phố nhiều nhà cao, đông xe.', ['Sai — bãi biển có cát và nước biển.', 'Sai — làng quê có ruộng đồng, cây cối.', 'Đúng — thành phố nhiều nhà cao tầng và xe cộ.', 'Sai — núi cao có nhiều cây và đá.']),
    Q('Em cần giữ vệ sinh nơi mình ở bằng cách?', ['Để rác giữa đường', 'Đốt rác trong nhà', 'Vứt rác bừa bãi', 'Bỏ rác đúng nơi quy định'], 3, 'Bỏ rác đúng chỗ → môi trường sạch.', ['Sai — để rác giữa đường làm bẩn và cản đường.', 'Sai — đốt rác trong nhà gây khói, nguy hiểm.', 'Sai — vứt rác bừa bãi làm bẩn nơi ở.', 'Đúng — bỏ rác đúng nơi quy định cho sạch sẽ.']),
  ]),

  M(13, 'Một số nghề trong cộng đồng', [
    Q('Người chữa bệnh là?', ['Tài xế', 'Bác sĩ', 'Nông dân', 'Giáo viên'], 1, 'Bác sĩ chữa bệnh ở bệnh viện.', ['Sai — tài xế lái xe chở khách.', 'Đúng — bác sĩ chữa bệnh ở bệnh viện.', 'Sai — nông dân trồng lúa, rau.', 'Sai — giáo viên dạy học.']),
    Q('Người dạy học là?', ['Đầu bếp', 'Bác sĩ', 'Giáo viên', 'Tài xế'], 2, 'Giáo viên (thầy/cô) dạy học.', ['Sai — đầu bếp nấu ăn.', 'Sai — bác sĩ chữa bệnh.', 'Đúng — giáo viên (thầy, cô) dạy học.', 'Sai — tài xế lái xe.']),
    Q('Người lái xe chở khách là?', ['Bộ đội', 'Thuỷ thủ', 'Phi công', 'Tài xế'], 3, 'Tài xế lái xe.', ['Sai — bộ đội bảo vệ đất nước.', 'Sai — thuỷ thủ làm việc trên tàu biển.', 'Sai — phi công lái máy bay.', 'Đúng — tài xế lái xe chở khách.']),
    Q('Người trồng lúa, rau là?', ['Công nhân', 'Thợ may', 'Bác sĩ', 'Nông dân'], 3, 'Nông dân làm nghề nông.', ['Sai — công nhân làm việc trong nhà máy.', 'Sai — thợ may may quần áo.', 'Sai — bác sĩ chữa bệnh.', 'Đúng — nông dân trồng lúa và rau.']),
    Q('Người giữ gìn an ninh trật tự là?', ['Đầu bếp', 'Công an', 'Giáo viên', 'Bác sĩ'], 1, 'Công an giữ an ninh.', ['Sai — đầu bếp nấu ăn.', 'Đúng — công an giữ gìn an ninh trật tự.', 'Sai — giáo viên dạy học.', 'Sai — bác sĩ chữa bệnh.']),
    Q('Mọi nghề lương thiện đều?', ['Chỉ bác sĩ là tốt', 'Chỉ vài nghề được coi trọng', 'Không cần thiết', 'Đáng quý'], 3, 'Nghề nào chân chính cũng đáng quý.', ['Sai — nghề nào chân chính cũng tốt, không chỉ bác sĩ.', 'Sai — mọi nghề chân chính đều được coi trọng.', 'Sai — nghề nào cũng giúp ích cho mọi người.', 'Đúng — mọi nghề lương thiện đều đáng quý.']),
  ]),

  M(14, 'Các bộ phận bên ngoài cơ thể (1)', [
    Q('Bộ phận trên cùng của cơ thể là?', ['Cánh tay', 'Bụng', 'Bàn chân', 'Đầu'], 3, 'Đầu ở trên cùng.', ['Sai — cánh tay ở hai bên thân mình.', 'Sai — bụng ở giữa thân mình.', 'Sai — bàn chân ở dưới cùng.', 'Đúng — đầu ở trên cùng của cơ thể.']),
    Q('Em dùng gì để nhìn?', ['Tai (đôi tai)', 'Mũi', 'Miệng', 'Mắt'], 3, 'Mắt để nhìn.', ['Sai — tai dùng để nghe.', 'Sai — mũi dùng để ngửi.', 'Sai — miệng dùng để ăn, để nói.', 'Đúng — mắt dùng để nhìn.']),
    Q('Em dùng gì để nghe?', ['Mũi', 'Lưỡi', 'Tai', 'Đôi mắt'], 2, 'Tai để nghe.', ['Sai — mũi dùng để ngửi.', 'Sai — lưỡi dùng để nếm.', 'Đúng — tai dùng để nghe.', 'Sai — mắt dùng để nhìn.']),
    Q('Em dùng gì để ngửi?', ['Mũi', 'Mắt', 'Lưỡi', 'Tai'], 0, 'Mũi để ngửi.', ['Đúng — mũi dùng để ngửi.', 'Sai — mắt dùng để nhìn.', 'Sai — lưỡi dùng để nếm.', 'Sai — tai dùng để nghe.']),
    Q('Em dùng gì để nếm?', ['Mắt', 'Răng', 'Đôi môi', 'Lưỡi'], 3, 'Lưỡi để nếm vị.', ['Sai — mắt dùng để nhìn.', 'Sai — răng dùng để nhai thức ăn.', 'Sai — môi giúp ngậm miệng, không nếm vị.', 'Đúng — lưỡi dùng để nếm vị.']),
    Q('Em dùng gì để nói?', ['Mũi', 'Miệng', 'Mắt', 'Lưỡi'], 1, 'Miệng để nói, để ăn.', ['Sai — mũi dùng để ngửi.', 'Đúng — miệng dùng để nói và để ăn.', 'Sai — mắt dùng để nhìn.', 'Sai — lưỡi dùng để nếm vị.']),
  ]),

  M(15, 'Các bộ phận bên ngoài cơ thể (2)', [
    Q('Em dùng gì để cầm, viết?', ['Khuỷu tay', 'Đầu gối', 'Bờ vai', 'Tay'], 3, 'Tay để cầm nắm, viết.', ['Sai — khuỷu tay chỉ là chỗ gập của tay.', 'Sai — đầu gối ở chân, dùng để gập chân.', 'Sai — bờ vai nối tay với thân, không cầm được.', 'Đúng — tay dùng để cầm nắm và viết.']),
    Q('Em dùng gì để đi, chạy?', ['Đầu gối', 'Chân', 'Bàn tay', 'Khuỷu tay'], 1, 'Chân để đi.', ['Sai — đầu gối chỉ là chỗ gập của chân.', 'Đúng — chân dùng để đi và chạy.', 'Sai — bàn tay dùng để cầm nắm.', 'Sai — khuỷu tay là chỗ gập của tay.']),
    Q('Một bàn tay có mấy ngón?', ['3', '5', '4', '6'], 1, 'Một bàn tay có 5 ngón.', ['Sai — bàn tay có nhiều hơn 3 ngón.', 'Đúng — một bàn tay có 5 ngón.', 'Sai — bàn tay có 5 ngón, không phải 4.', 'Sai — bàn tay chỉ có 5 ngón thôi.']),
    Q('Một bàn chân có mấy ngón?', ['4', '5', '3', '6'], 1, 'Một bàn chân có 5 ngón.', ['Sai — bàn chân có 5 ngón, không phải 4.', 'Đúng — một bàn chân có 5 ngón.', 'Sai — bàn chân có nhiều hơn 3 ngón.', 'Sai — bàn chân chỉ có 5 ngón thôi.']),
    Q('Em có mấy con mắt?', ['3', '2', '1', '4'], 1, 'Em có 2 mắt.', ['Sai — em chỉ có 2 mắt, không phải 3.', 'Đúng — em có 2 con mắt.', 'Sai — em có 2 mắt, không phải 1.', 'Sai — em có 2 mắt, không phải 4.']),
    Q('Bảo vệ cơ thể em nên?', ['Chơi vật sắc nhọn', 'Mặc đủ ấm, đội mũ khi nắng', 'Đùa nghịch với lửa', 'Không tắm rửa'], 1, 'Mặc phù hợp thời tiết để khoẻ mạnh.', ['Sai — chơi vật sắc nhọn dễ bị thương.', 'Đúng — mặc đủ ấm, đội mũ khi nắng để giữ sức khoẻ.', 'Sai — nghịch lửa dễ bị bỏng.', 'Sai — không tắm rửa làm cơ thể bẩn, dễ bệnh.']),
  ]),

  M(16, 'Giữ vệ sinh thân thể', [
    Q('Mỗi ngày em nên đánh răng mấy lần?', ['5 lần', '1 lần', '0 lần', '2 lần'], 3, 'Sáng và tối – 2 lần/ngày.', ['Sai — đánh răng 2 lần là đủ, không cần 5 lần.', 'Sai — chỉ 1 lần thì răng chưa sạch.', 'Sai — không đánh răng thì răng sẽ sâu.', 'Đúng — đánh răng 2 lần, sáng và tối.']),
    Q('Khi nào nên rửa tay?', ['Sau khi đi vệ sinh', 'Sau khi chơi bẩn', 'Cả ba lúc trên', 'Trước khi ăn'], 2, 'Rửa tay nhiều thời điểm để sạch khuẩn.', ['Sai — đó là một lúc nên rửa, nhưng còn nhiều lúc khác.', 'Sai — đó là một lúc nên rửa, nhưng còn nhiều lúc khác.', 'Đúng — cả ba lúc trên đều nên rửa tay.', 'Sai — đó là một lúc nên rửa, nhưng còn nhiều lúc khác.']),
    Q('Rửa tay bằng?', ['Khăn ướt nhiều lần', 'Nước cống', 'Nước sạch và xà phòng', 'Chỉ nước lã'], 2, 'Xà phòng và nước sạch.', ['Sai — khăn ướt không sạch bằng nước và xà phòng.', 'Sai — nước cống rất bẩn, không được dùng.', 'Đúng — rửa tay bằng nước sạch và xà phòng.', 'Sai — chỉ nước lã thì chưa sạch hết vi khuẩn.']),
    Q('Cắt móng tay để?', ['Cho đẹp', 'Không cắt', 'Để dài', 'Đỡ giữ vi khuẩn'], 3, 'Móng tay sạch → ít vi khuẩn.', ['Sai — cắt móng chủ yếu để sạch, ít vi khuẩn.', 'Sai — không cắt móng thì móng dài, bẩn.', 'Sai — móng để dài chứa nhiều vi khuẩn.', 'Đúng — cắt móng tay để đỡ giữ vi khuẩn.']),
    Q('Sau khi chơi xong, em nên?', ['Đi tắm/rửa tay chân', 'Ăn liền', 'Để bẩn vậy', 'Đi ngủ ngay'], 0, 'Vệ sinh thân thể sau khi chơi.', ['Đúng — sau khi chơi nên tắm, rửa tay chân.', 'Sai — tay bẩn ăn liền dễ bị đau bụng.', 'Sai — để bẩn dễ bị bệnh.', 'Sai — chơi xong người bẩn, nên vệ sinh trước.']),
    Q('Em tắm mỗi ngày để?', ['Sạch, thơm, khoẻ', 'Bẩn hơn', 'Tốn nước', 'Mệt người'], 0, 'Tắm rửa giúp cơ thể sạch.', ['Đúng — tắm mỗi ngày giúp sạch, thơm và khoẻ.', 'Sai — tắm giúp sạch hơn, không bẩn hơn.', 'Sai — tắm để giữ vệ sinh, rất cần thiết.', 'Sai — tắm xong người sạch và dễ chịu hơn.']),
  ]),

  M(17, 'Ăn uống lành mạnh, an toàn', [
    Q('Trước khi ăn em nên?', ['Chạy nhảy', 'Rửa tay sạch', 'Ăn liền', 'Xem TV'], 1, 'Rửa tay để không đưa vi khuẩn vào miệng.', ['Sai — chạy nhảy không giúp tay sạch.', 'Đúng — rửa tay sạch để không đưa vi khuẩn vào miệng.', 'Sai — tay bẩn ăn liền dễ bị đau bụng.', 'Sai — xem TV không liên quan đến giữ sạch tay.']),
    Q('Em cần uống mấy nước mỗi ngày?', ['Không uống', 'Chỉ nước ngọt', 'Rất ít', 'Đủ nước'], 3, 'Uống đủ nước lọc tốt cho sức khoẻ.', ['Sai — không uống nước thì cơ thể sẽ mệt.', 'Sai — uống nhiều nước ngọt không tốt cho răng.', 'Sai — uống rất ít thì cơ thể thiếu nước.', 'Đúng — uống đủ nước mỗi ngày tốt cho sức khoẻ.']),
    Q('Đồ ăn nào tốt cho sức khoẻ?', ['Đồ chiên rán nhiều', 'Bánh kẹo nhiều', 'Nước ngọt nhiều', 'Cơm, rau, thịt, cá'], 3, 'Bữa ăn cân bằng tốt nhất.', ['Sai — ăn nhiều đồ chiên rán không tốt.', 'Sai — ăn nhiều bánh kẹo dễ sâu răng.', 'Sai — uống nhiều nước ngọt không tốt.', 'Đúng — cơm, rau, thịt, cá là bữa ăn cân bằng.']),
    Q('Em KHÔNG nên ăn thức ăn?', ['Ôi thiu, hết hạn', 'Trái cây tươi', 'Nóng vừa', 'Cơm nhà'], 0, 'Thức ăn ôi thiu gây ngộ độc.', ['Đúng — thức ăn ôi thiu, hết hạn gây đau bụng, ngộ độc.', 'Sai — trái cây tươi tốt cho sức khoẻ.', 'Sai — thức ăn nóng vừa em ăn được.', 'Sai — cơm nhà sạch sẽ, em ăn được.']),
    Q('Khi ăn, em nên?', ['Nhai kỹ, ăn từ tốn', 'Vừa nằm vừa ăn', 'Nhai vội', 'Vừa ăn vừa chạy'], 0, 'Nhai kỹ tốt cho tiêu hoá.', ['Đúng — nhai kỹ, ăn từ tốn tốt cho bụng.', 'Sai — vừa nằm vừa ăn dễ bị sặc.', 'Sai — nhai vội không tốt cho tiêu hoá.', 'Sai — vừa ăn vừa chạy dễ bị sặc, nguy hiểm.']),
    Q('Sau khi ăn em không nên?', ['Uống nước', 'Chạy nhảy mạnh ngay', 'Súc miệng', 'Nghỉ ngơi nhẹ'], 1, 'Ăn xong chạy mạnh dễ đau bụng.', ['Sai — uống nước sau khi ăn là bình thường.', 'Đúng — ăn xong chạy nhảy mạnh ngay dễ đau bụng.', 'Sai — súc miệng sau khi ăn là việc tốt.', 'Sai — nghỉ ngơi nhẹ sau khi ăn là tốt.']),
  ]),

  M(18, 'Ôn tập HK1', [
    Q('Người sinh ra em là?', ['Cô giáo', 'Bố mẹ', 'Bạn bè', 'Hàng xóm'], 1, 'Bố mẹ là người sinh ra em.', ['Sai — cô giáo dạy em ở trường.', 'Đúng — bố mẹ là người sinh ra em.', 'Sai — bạn bè cùng chơi với em thôi.', 'Sai — hàng xóm ở gần nhà, không sinh ra em.']),
    Q('Khi qua đường, em đi vào?', ['Vạch ngang dành cho người đi bộ', 'Lòng đường', 'Trên xe đậu', 'Giữa đường'], 0, 'Vạch sọc ngựa vằn cho người đi bộ.', ['Đúng — đi vào vạch ngang (sọc ngựa vằn) cho an toàn.', 'Sai — lòng đường dành cho xe chạy.', 'Sai — không được leo lên xe đậu.', 'Sai — đi giữa đường rất nguy hiểm.']),
    Q('Đèn giao thông đỏ nghĩa là?', ['Đi nhanh', 'Chuẩn bị đi', 'Dừng', 'Chuẩn bị'], 2, 'Đỏ = dừng.', ['Sai — đèn đỏ phải dừng, không đi nhanh.', 'Sai — đèn đỏ là dừng hẳn.', 'Đúng — đèn đỏ nghĩa là dừng lại.', 'Sai — đèn đỏ là dừng, không phải chuẩn bị.']),
    Q('Em rửa tay bằng?', ['Nước cống', 'Khăn ướt', 'Chỉ nước lã', 'Nước và xà phòng'], 3, 'Xà phòng + nước sạch.', ['Sai — nước cống rất bẩn, không được dùng.', 'Sai — khăn ướt không sạch bằng nước và xà phòng.', 'Sai — chỉ nước lã thì chưa sạch hết.', 'Đúng — rửa tay bằng nước và xà phòng.']),
    Q('Hành động giúp bố mẹ là?', ['Vứt rác bừa', 'Đập đồ', 'Tự cất đồ chơi, gấp áo', 'Bày bừa'], 2, 'Việc nhẹ phù hợp tuổi em.', ['Sai — vứt rác bừa làm bẩn nhà.', 'Sai — đập đồ là phá đồ.', 'Đúng — tự cất đồ chơi, gấp áo là giúp bố mẹ.', 'Sai — bày bừa làm nhà lộn xộn.']),
    Q('Trong lớp muốn nói, em phải?', ['Hét to', 'Đứng dậy chạy', 'Giơ tay xin phép', 'Im lặng luôn'], 2, 'Giơ tay xin phép là nội quy.', ['Sai — hét to làm ồn cả lớp.', 'Sai — đứng dậy chạy làm mất trật tự.', 'Đúng — giơ tay xin phép rồi mới nói.', 'Sai — im lặng luôn thì cô không biết em muốn nói.']),
    Q('Em có mấy ngón tay (cả 2 bàn)?', ['8', '12', '10', '5'], 2, '2 bàn tay × 5 = 10 ngón.', ['Sai — 2 bàn tay có 10 ngón, không phải 8.', 'Sai — 2 bàn tay có 10 ngón, không phải 12.', 'Đúng — 2 bàn tay có 5 + 5 = 10 ngón.', 'Sai — 5 là số ngón của một bàn tay thôi.']),
    Q('Số gọi cứu hoả là?', ['116', '115', '114', '113'], 2, '114 = cứu hoả.', ['Sai — 116 không phải số cứu hoả.', 'Sai — 115 là số cấp cứu y tế.', 'Đúng — 114 là số gọi cứu hoả.', 'Sai — 113 là số công an.']),
  ], { difficulty: 2 }),

  // ──────────────── HK2 — THỰC VẬT · ĐỘNG VẬT · CƠ THỂ NGƯỜI · TRÁI ĐẤT ────────────────
  M(19, 'Cây xanh quanh em', [
    Q('Cây xanh giúp ta có?', ['Không khí trong lành', 'Tiếng ồn', 'Ô nhiễm', 'Khói bụi'], 0, 'Cây nhả ô-xi giúp không khí sạch.', ['Đúng — cây xanh giúp không khí trong lành.', 'Sai — cây không tạo ra tiếng ồn.', 'Sai — cây làm sạch không khí, không gây ô nhiễm.', 'Sai — cây giữ bụi, không tạo khói bụi.']),
    Q('Một cây thường có những bộ phận nào?', ['Rễ, thân, lá', 'Chỉ có lá', 'Chỉ có rễ', 'Chỉ có thân'], 0, 'Cây gồm rễ, thân, lá (và hoa, quả).', ['Đúng — cây có rễ, thân, lá (và hoa, quả).', 'Sai — cây còn có rễ và thân nữa.', 'Sai — cây còn có thân và lá nữa.', 'Sai — cây còn có rễ và lá nữa.']),
    Q('Phần nào của cây hút nước, hút chất?', ['Rễ', 'Quả cây', 'Lá cây', 'Hoa cây'], 0, 'Rễ hút nước và chất dinh dưỡng từ đất.', ['Đúng — rễ hút nước và chất từ trong đất.', 'Sai — quả là phần cho ta ăn.', 'Sai — lá giúp cây hứng ánh sáng.', 'Sai — hoa nở rồi tạo thành quả.']),
    Q('Cây cần gì để sống?', ['Chỉ rác', 'Nước, ánh sáng, không khí', 'Không cần gì', 'Chỉ bóng tối'], 1, 'Cây cần nước, ánh sáng mặt trời, không khí.', ['Sai — cây không sống bằng rác.', 'Đúng — cây cần nước, ánh sáng và không khí.', 'Sai — cây cần nhiều thứ mới sống được.', 'Sai — cây cần ánh sáng, không phải bóng tối.']),
    Q('Việc làm bảo vệ cây xanh là?', ['Đốt cây', 'Tưới nước, không bẻ cành', 'Bẻ cành, hái lá bừa', 'Khắc tên vào thân cây'], 1, 'Chăm sóc, không phá hoại cây.', ['Sai — đốt cây là phá hoại cây.', 'Đúng — tưới nước và không bẻ cành là bảo vệ cây.', 'Sai — bẻ cành, hái lá bừa làm hỏng cây.', 'Sai — khắc tên làm cây bị thương.']),
    Q('Cây cho ta?', ['Tiếng ồn', 'Bóng mát, gỗ, quả', 'Sương mù', 'Cát bụi'], 1, 'Cây cho bóng mát, gỗ, hoa, quả.', ['Sai — cây không tạo ra tiếng ồn.', 'Đúng — cây cho ta bóng mát, gỗ và quả.', 'Sai — cây không tạo ra sương mù.', 'Sai — cây giữ bụi chứ không tạo cát bụi.']),
  ]),

  M(20, 'Một số loại rau và quả', [
    Q('Rau nào em hay ăn?', ['Hoa cúc, hoa hồng', 'Rau muống, rau cải', 'Lá khô', 'Vỏ trấu'], 1, 'Đều là rau ăn lá phổ biến.', ['Sai — hoa cúc, hoa hồng để ngắm, không phải rau ăn.', 'Đúng — rau muống, rau cải là rau em hay ăn.', 'Sai — lá khô đã héo, không ăn được.', 'Sai — vỏ trấu là vỏ hạt lúa, không ăn được.']),
    Q('Quả nào màu đỏ, tròn?', ['Dưa leo', 'Quả cam', 'Cà chua', 'Dưa hấu vỏ xanh'], 2, 'Cà chua chín đỏ.', ['Sai — dưa leo màu xanh, dài.', 'Sai — quả cam màu cam.', 'Đúng — cà chua chín màu đỏ, tròn.', 'Sai — dưa hấu vỏ màu xanh.']),
    Q('Quả nào màu vàng, dài cong?', ['Táo', 'Chuối', 'Dưa hấu', 'Nho chùm tím'], 1, 'Chuối chín màu vàng, dài cong.', ['Sai — táo tròn, màu đỏ hoặc xanh.', 'Đúng — chuối chín màu vàng, dài cong.', 'Sai — dưa hấu to tròn, vỏ xanh.', 'Sai — nho mọc thành chùm, màu tím.']),
    Q('Trước khi ăn rau, quả tươi, em phải?', ['Lau bằng áo', 'Ăn liền', 'Rửa sạch', 'Để bẩn vậy'], 2, 'Rửa sạch để bỏ vi khuẩn, hoá chất.', ['Sai — lau bằng áo không sạch hết.', 'Sai — ăn liền khi chưa rửa dễ đau bụng.', 'Đúng — rửa sạch để bỏ vi khuẩn và hoá chất.', 'Sai — để bẩn ăn vào dễ bị bệnh.']),
    Q('Ăn rau, quả tốt cho?', ['Béo phì', 'Sức khoẻ, da đẹp, ít táo bón', 'Đau bụng', 'Sâu răng'], 1, 'Rau quả có vitamin, chất xơ.', ['Sai — rau quả không gây béo phì.', 'Đúng — rau quả tốt cho sức khoẻ, da đẹp, ít táo bón.', 'Sai — rau quả sạch không gây đau bụng.', 'Sai — ăn nhiều kẹo mới dễ sâu răng.']),
    Q('Quả nào KHÔNG phải trái cây?', ['Quả táo', 'Quả xoài', 'Cà rốt', 'Quả cam'], 2, 'Cà rốt là củ/rau.', ['Sai — quả táo là trái cây.', 'Sai — quả xoài là trái cây.', 'Đúng — cà rốt là củ (rau), không phải trái cây.', 'Sai — quả cam là trái cây.']),
  ]),

  M(21, 'Một số con vật quen thuộc (1)', [
    Q('Con vật nào kêu "meo meo"?', ['Bò (ụm bò)', 'Mèo', 'Chó (gâu gâu)', 'Gà (cục tác)'], 1, 'Mèo kêu meo meo.', ['Sai — bò kêu ụm bò.', 'Đúng — mèo kêu meo meo.', 'Sai — chó kêu gâu gâu.', 'Sai — gà mái kêu cục tác.']),
    Q('Con vật nào trông nhà, kêu "gâu gâu"?', ['Chó', 'Vịt (cạp cạp)', 'Mèo (meo meo)', 'Bò (ụm bò)'], 0, 'Chó kêu gâu gâu, trông nhà.', ['Đúng — chó trông nhà và kêu gâu gâu.', 'Sai — vịt kêu cạp cạp.', 'Sai — mèo kêu meo meo.', 'Sai — bò kêu ụm bò.']),
    Q('Con vật nào cho ta sữa?', ['Con ếch', 'Con cá', 'Bò', 'Gà mái'], 2, 'Bò cho sữa.', ['Sai — ếch không cho sữa.', 'Sai — cá không cho sữa.', 'Đúng — bò cho ta sữa.', 'Sai — gà mái cho ta trứng, không cho sữa.']),
    Q('Con vật nào đẻ trứng, gáy ò ó o?', ['Gà trống', 'Con lợn', 'Con vịt', 'Con bò'], 0, 'Gà trống gáy ò ó o.', ['Đúng — gà trống gáy ò ó o.', 'Sai — lợn kêu ụt ịt.', 'Sai — vịt kêu cạp cạp.', 'Sai — bò kêu ụm bò.']),
    Q('Con vật nào bơi dưới nước?', ['Con mèo', 'Con chó', 'Cá', 'Con gà'], 2, 'Cá sống và bơi dưới nước.', ['Sai — mèo sống trên cạn.', 'Sai — chó sống trên cạn.', 'Đúng — cá sống và bơi dưới nước.', 'Sai — gà sống trên cạn.']),
    Q('Em cần làm gì với con vật nuôi?', ['Yêu thương, chăm sóc', 'Bỏ đói', 'Trêu chọc', 'Đánh đập'], 0, 'Đối xử nhẹ nhàng với con vật.', ['Đúng — yêu thương, chăm sóc con vật nuôi.', 'Sai — bỏ đói con vật là không tốt.', 'Sai — trêu chọc làm con vật sợ.', 'Sai — đánh đập con vật là sai.']),
  ]),

  M(22, 'Tết Nguyên Đán quê em', [
    Q('Tết Nguyên Đán là?', ['Trung Thu', 'Tết Tây', 'Tết cổ truyền Việt Nam', 'Quốc khánh'], 2, 'Tết Nguyên Đán là Tết âm lịch của VN.', ['Sai — Trung Thu là rằm tháng Tám.', 'Sai — Tết Tây là ngày đầu năm dương lịch.', 'Đúng — Tết Nguyên Đán là Tết cổ truyền của Việt Nam.', 'Sai — Quốc khánh là ngày 2 tháng 9.']),
    Q('Hoa nào nở chơi Tết miền Bắc?', ['Hoa đào', 'Hoa mai', 'Hoa hồng', 'Hoa cúc'], 0, 'Miền Bắc chơi hoa đào.', ['Đúng — miền Bắc chơi hoa đào hồng vào Tết.', 'Sai — hoa mai là hoa Tết của miền Nam.', 'Sai — hoa hồng không phải hoa Tết đặc trưng.', 'Sai — hoa cúc thường chơi quanh năm.']),
    Q('Hoa nào nở chơi Tết miền Nam?', ['Hoa hồng', 'Hoa mai', 'Hoa đào', 'Hoa sen'], 1, 'Miền Nam chơi hoa mai vàng.', ['Sai — hoa hồng không phải hoa Tết đặc trưng.', 'Đúng — miền Nam chơi hoa mai vàng vào Tết.', 'Sai — hoa đào là hoa Tết của miền Bắc.', 'Sai — hoa sen nở vào mùa hè.']),
    Q('Bánh truyền thống Tết là?', ['Bánh kem', 'Bánh chưng, bánh tét', 'Bánh mì', 'Bánh tiêu'], 1, 'Bánh chưng (Bắc), bánh tét (Nam).', ['Sai — bánh kem dùng cho sinh nhật.', 'Đúng — bánh chưng, bánh tét là bánh Tết.', 'Sai — bánh mì ăn hằng ngày.', 'Sai — bánh tiêu không phải bánh Tết.']),
    Q('Khi được lì xì, em nên?', ['Cảm ơn lễ phép', 'Giật lấy ngay', 'Bóc liền tại chỗ', 'Đòi thêm'], 0, 'Cảm ơn lễ phép khi nhận lì xì.', ['Đúng — nhận lì xì thì cảm ơn lễ phép.', 'Sai — giật lấy ngay là không lịch sự.', 'Sai — bóc liền tại chỗ là chưa ngoan.', 'Sai — đòi thêm là không lễ phép.']),
    Q('Tết là dịp để?', ['Bỏ học mãi', 'Sum họp gia đình', 'Đập phá đồ', 'Cãi nhau'], 1, 'Tết để gia đình sum vầy.', ['Sai — Tết chỉ nghỉ học vài ngày, không bỏ học.', 'Đúng — Tết là dịp gia đình sum họp.', 'Sai — Tết không phải để đập phá đồ.', 'Sai — Tết là dịp vui vẻ, không cãi nhau.']),
  ]),

  M(23, 'Con vật nuôi và con vật hoang dã', [
    Q('Con vật nào được nuôi trong nhà?', ['Hổ, sư tử', 'Cá sấu', 'Voi, gấu', 'Chó, mèo'], 3, 'Chó mèo là vật nuôi quen thuộc.', ['Sai — hổ, sư tử là thú dữ trong rừng.', 'Sai — cá sấu sống ở sông, đầm lầy.', 'Sai — voi, gấu là thú rừng.', 'Đúng — chó, mèo là vật nuôi trong nhà.']),
    Q('Con vật nào sống trong rừng?', ['Gà, vịt', 'Mèo, chó', 'Bò, lợn', 'Hổ, voi'], 3, 'Hổ, voi sống ở rừng.', ['Sai — gà, vịt được nuôi ở nhà.', 'Sai — mèo, chó được nuôi ở nhà.', 'Sai — bò, lợn được nuôi ở nhà, ở trại.', 'Đúng — hổ, voi sống trong rừng.']),
    Q('Khi thấy con chó lạ, em nên?', ['Ném đá', 'Chạy lại vuốt', 'Đuổi đánh', 'Đứng yên, không trêu'], 3, 'Đứng yên để không bị cắn.', ['Sai — ném đá làm chó tức giận, có thể cắn.', 'Sai — chạy lại vuốt chó lạ dễ bị cắn.', 'Sai — đuổi đánh làm chó hung dữ hơn.', 'Đúng — đứng yên, không trêu để không bị cắn.']),
    Q('Con vật nào biết bay?', ['Chim', 'Con cá', 'Con bò', 'Con heo'], 0, 'Chim biết bay.', ['Đúng — chim có cánh và biết bay.', 'Sai — cá bơi dưới nước, không bay.', 'Sai — bò đi trên đất, không bay.', 'Sai — heo đi trên đất, không bay.']),
    Q('Con vật nào sống dưới nước?', ['Con khỉ', 'Con voi', 'Con hổ', 'Cá, tôm'], 3, 'Cá, tôm sống dưới nước.', ['Sai — khỉ sống trên cây.', 'Sai — voi sống trên cạn.', 'Sai — hổ sống trên cạn.', 'Đúng — cá, tôm sống dưới nước.']),
    Q('Hành động bảo vệ động vật là?', ['Nhốt vào lồng nhỏ', 'Săn bắt', 'Không phá tổ chim, không hành hạ', 'Ném đá'], 2, 'Không phá tổ, không hành hạ là yêu động vật.', ['Sai — nhốt vào lồng nhỏ làm con vật khổ.', 'Sai — săn bắt làm hại động vật.', 'Đúng — không phá tổ chim, không hành hạ là yêu động vật.', 'Sai — ném đá làm con vật bị thương.']),
  ]),

  M(24, 'Bốn mùa trong năm', [
    Q('Một năm có mấy mùa?', ['5', '2', '4', '3'], 2, 'Một năm thường có 4 mùa.', ['Sai — một năm có 4 mùa, không phải 5.', 'Sai — một năm có 4 mùa, không phải 2.', 'Đúng — một năm thường có 4 mùa.', 'Sai — một năm có 4 mùa, không phải 3.']),
    Q('Mùa nào trời nóng nhất?', ['Hạ', 'Mùa đông', 'Mùa thu', 'Mùa xuân'], 0, 'Mùa hạ (hè) nóng nhất.', ['Đúng — mùa hạ (hè) trời nóng nhất.', 'Sai — mùa đông trời lạnh nhất.', 'Sai — mùa thu trời mát mẻ.', 'Sai — mùa xuân trời ấm áp.']),
    Q('Mùa nào trời lạnh nhất?', ['Mùa xuân', 'Đông', 'Mùa thu', 'Mùa hạ'], 1, 'Mùa đông lạnh nhất.', ['Sai — mùa xuân trời ấm áp.', 'Đúng — mùa đông trời lạnh nhất.', 'Sai — mùa thu trời mát.', 'Sai — mùa hạ trời nóng nhất.']),
    Q('Mùa nào hoa nở, ấm áp?', ['Xuân', 'Mùa hạ', 'Mùa thu', 'Mùa đông'], 0, 'Mùa xuân hoa nở, ấm dần.', ['Đúng — mùa xuân hoa nở và trời ấm dần.', 'Sai — mùa hạ trời nóng.', 'Sai — mùa thu trời mát, lá rụng.', 'Sai — mùa đông trời lạnh.']),
    Q('Mùa nào lá vàng rụng?', ['Mùa hạ', 'Thu', 'Mùa đông', 'Mùa xuân'], 1, 'Mùa thu lá vàng rụng.', ['Sai — mùa hạ cây xanh tốt.', 'Đúng — mùa thu lá vàng rụng nhiều.', 'Sai — mùa đông trời lạnh.', 'Sai — mùa xuân cây đâm chồi xanh.']),
    Q('Mùa hè em mặc?', ['Áo mỏng, mát', 'Áo dày', 'Khăn len', 'Áo bông'], 0, 'Hè nóng → mặc mỏng mát.', ['Đúng — mùa hè nóng nên mặc áo mỏng, mát.', 'Sai — áo dày nóng, không hợp mùa hè.', 'Sai — khăn len dùng khi trời lạnh.', 'Sai — áo bông dùng cho mùa đông.']),
  ]),

  M(25, 'Thời tiết hôm nay', [
    Q('Trời có nắng gọi là?', ['Trời mưa', 'Trời nhiều mây', 'Trời tuyết', 'Trời nắng'], 3, 'Có nắng = trời nắng.', ['Sai — trời mưa là khi có mưa rơi.', 'Sai — trời nhiều mây là khi mây che kín.', 'Sai — ở nước ta hầu như không có tuyết.', 'Đúng — có nắng thì gọi là trời nắng.']),
    Q('Trời có mưa rơi gọi là?', ['Trời nắng', 'Trời bão', 'Trời tuyết', 'Trời mưa'], 3, 'Có mưa = trời mưa.', ['Sai — trời nắng là khi có nắng.', 'Sai — trời bão có mưa to và gió mạnh.', 'Sai — ở nước ta hầu như không có tuyết.', 'Đúng — có mưa rơi thì gọi là trời mưa.']),
    Q('Khi trời mưa ra ngoài, em cần?', ['Áo mưa hoặc ô', 'Mũ rộng vành chống nắng', 'Kính râm', 'Không cần gì'], 0, 'Áo mưa/ô để không bị ướt.', ['Đúng — mặc áo mưa hoặc cầm ô để không bị ướt.', 'Sai — mũ chống nắng không che được mưa.', 'Sai — kính râm dùng khi trời nắng.', 'Sai — không có gì che thì sẽ bị ướt mưa.']),
    Q('Khi trời nắng to, em nên?', ['Đứng phơi nắng lâu', 'Đội mũ, mặc áo nhẹ', 'Mặc áo bông', 'Đeo khăn len'], 1, 'Đội mũ chống nắng.', ['Sai — phơi nắng lâu dễ bị ốm, say nắng.', 'Đúng — đội mũ, mặc áo nhẹ khi trời nắng to.', 'Sai — áo bông rất nóng vào trời nắng.', 'Sai — khăn len dùng khi trời lạnh.']),
    Q('Khi trời lạnh, em nên?', ['Mặc áo cộc', 'Để chân trần', 'Mặc đủ ấm', 'Đi tắm nước lạnh'], 2, 'Mặc đủ ấm để không ốm.', ['Sai — áo cộc không đủ ấm khi trời lạnh.', 'Sai — để chân trần dễ bị lạnh, bị ốm.', 'Đúng — mặc đủ ấm để không bị ốm.', 'Sai — tắm nước lạnh khi trời lạnh dễ bị ốm.']),
    Q('Khi có sấm sét, em không nên?', ['Tắt thiết bị điện', 'Vào nhà tránh', 'Đứng dưới cây to', 'Đóng cửa sổ'], 2, 'Đứng dưới cây to dễ bị sét đánh.', ['Sai — tắt thiết bị điện là việc nên làm.', 'Sai — vào nhà tránh là việc nên làm.', 'Đúng — đứng dưới cây to dễ bị sét đánh, rất nguy hiểm.', 'Sai — đóng cửa sổ là việc nên làm.']),
  ]),

  M(26, 'Mặt Trời và ban ngày', [
    Q('Ban ngày em nhìn thấy?', ['Mặt Trăng', 'Mặt Trời', 'Cả hai luôn', 'Không thấy gì'], 1, 'Ban ngày nhìn thấy Mặt Trời.', ['Sai — Mặt Trăng thường thấy vào ban đêm.', 'Đúng — ban ngày em nhìn thấy Mặt Trời.', 'Sai — ban ngày chủ yếu thấy Mặt Trời.', 'Sai — ban ngày trời sáng, thấy Mặt Trời.']),
    Q('Mặt Trời cho ta?', ['Bóng tối', 'Ánh sáng và hơi ấm', 'Tiếng sấm', 'Gió mạnh'], 1, 'Mặt Trời cho sáng và ấm.', ['Sai — Mặt Trời cho ánh sáng, không phải bóng tối.', 'Đúng — Mặt Trời cho ánh sáng và hơi ấm.', 'Sai — tiếng sấm là do mưa bão.', 'Sai — gió mạnh không phải từ Mặt Trời.']),
    Q('Em có nên nhìn thẳng vào Mặt Trời?', ['Không, hại mắt', 'Cứ nhìn lâu lâu', 'Chỉ buổi trưa', 'Có, khi trời nhiều mây'], 0, 'Nhìn thẳng Mặt Trời rất hại mắt.', ['Đúng — không nhìn thẳng Mặt Trời vì rất hại mắt.', 'Sai — nhìn lâu càng hại mắt hơn.', 'Sai — buổi trưa Mặt Trời càng chói, càng hại mắt.', 'Sai — vẫn không nên nhìn thẳng Mặt Trời.']),
    Q('Khi không có ánh sáng Mặt Trời lâu thì?', ['Cây vẫn xanh tốt', 'Cây ra nhiều quả', 'Cây lớn nhanh', 'Cây không sống được'], 3, 'Cây cần ánh sáng để sống.', ['Sai — thiếu ánh sáng thì cây không xanh tốt được.', 'Sai — thiếu ánh sáng thì cây khó ra quả.', 'Sai — thiếu ánh sáng thì cây không lớn nhanh.', 'Đúng — cây cần ánh sáng, thiếu lâu thì không sống được.']),
    Q('Mặt Trời mọc ở hướng?', ['Hướng Nam', 'Hướng Tây', 'Hướng Bắc', 'Đông'], 3, 'Mặt Trời mọc ở phía Đông.', ['Sai — Mặt Trời mọc ở hướng Đông.', 'Sai — hướng Tây là nơi Mặt Trời lặn.', 'Sai — Mặt Trời mọc ở hướng Đông.', 'Đúng — Mặt Trời mọc ở phía Đông.']),
    Q('Buổi trưa Mặt Trời ở?', ['Dưới đất', 'Không thấy', 'Cao trên đỉnh đầu', 'Thấp gần đường chân trời'], 2, 'Buổi trưa Mặt Trời lên cao nhất.', ['Sai — Mặt Trời ở trên trời, không dưới đất.', 'Sai — buổi trưa trời sáng, vẫn thấy Mặt Trời.', 'Đúng — buổi trưa Mặt Trời lên cao trên đỉnh đầu.', 'Sai — gần chân trời là lúc sáng sớm hoặc chiều tối.']),
  ]),

  M(27, 'Mặt Trăng và ban đêm', [
    Q('Ban đêm em nhìn thấy?', ['Mặt Trời', 'Mặt Trăng và các ngôi sao', 'Cầu vồng', 'Mưa'], 1, 'Đêm có Mặt Trăng và sao.', ['Sai — Mặt Trời thấy vào ban ngày.', 'Đúng — ban đêm em thấy Mặt Trăng và các ngôi sao.', 'Sai — cầu vồng thường thấy sau cơn mưa, ban ngày.', 'Sai — mưa có thể có cả ngày lẫn đêm, không phải lúc nào cũng thấy.']),
    Q('Đêm rằm trăng có hình?', ['Vuông', 'Tròn', 'Lưỡi liềm', 'Tam giác'], 1, 'Trăng rằm tròn vành vạnh.', ['Sai — trăng không có hình vuông.', 'Đúng — đêm rằm trăng tròn vành vạnh.', 'Sai — trăng lưỡi liềm là ở đầu hoặc cuối tháng.', 'Sai — trăng không có hình tam giác.']),
    Q('Đêm cuối tháng trăng?', ['Không thấy / rất mảnh', 'Tròn vành vạnh', 'Lưỡi liềm to', 'Đỏ rực'], 0, 'Cuối tháng trăng khuyết hết, gần như không thấy.', ['Đúng — cuối tháng trăng khuyết hết, gần như không thấy.', 'Sai — trăng tròn là vào đêm rằm.', 'Sai — cuối tháng trăng rất mảnh, không to.', 'Sai — trăng bình thường không đỏ rực.']),
    Q('Tết Trung Thu là vào?', ['Rằm tháng Tám', 'Quốc khánh', 'Mùng 1 Tết', 'Rằm tháng Giêng'], 0, 'Trung Thu = rằm 15/8 âm lịch.', ['Đúng — Trung Thu là rằm tháng Tám âm lịch.', 'Sai — Quốc khánh là ngày 2 tháng 9.', 'Sai — mùng 1 Tết là Tết Nguyên Đán.', 'Sai — rằm tháng Giêng là dịp khác.']),
    Q('Ban đêm em nên?', ['La hét', 'Chạy nhảy ngoài đường', 'Đi ngủ đúng giờ', 'Thức xem TV khuya'], 2, 'Ngủ đủ giấc để khoẻ.', ['Sai — la hét ban đêm làm ồn mọi người.', 'Sai — chạy nhảy ngoài đường ban đêm nguy hiểm.', 'Đúng — đi ngủ đúng giờ để ngủ đủ, khoẻ mạnh.', 'Sai — thức khuya xem TV hại sức khoẻ và mắt.']),
    Q('Các ngôi sao ban đêm trông?', ['Sáng nhấp nháy', 'Tối thui', 'Có màu đen', 'To như Mặt Trăng'], 0, 'Sao nhỏ, sáng nhấp nháy.', ['Đúng — các ngôi sao nhỏ, sáng nhấp nháy.', 'Sai — sao thì sáng, không tối thui.', 'Sai — sao sáng, không có màu đen.', 'Sai — sao nhìn nhỏ hơn Mặt Trăng nhiều.']),
  ]),

  M(28, 'Ngày và đêm', [
    Q('Sự khác nhau giữa ngày và đêm là?', ['Cả hai đều tối', 'Ngày sáng, đêm tối', 'Ngày tối', 'Cả hai đều sáng'], 1, 'Ngày có Mặt Trời sáng, đêm tối.', ['Sai — ban ngày trời sáng, không tối.', 'Đúng — ngày thì sáng, đêm thì tối.', 'Sai — ban ngày trời sáng.', 'Sai — ban đêm trời tối, không sáng.']),
    Q('Một ngày có mấy giờ?', ['36', '12', '48', '24'], 3, 'Một ngày = 24 giờ.', ['Sai — một ngày có 24 giờ, không phải 36.', 'Sai — một ngày có 24 giờ, không phải 12.', 'Sai — một ngày có 24 giờ, không phải 48.', 'Đúng — một ngày có 24 giờ.']),
    Q('Em đi học thường vào?', ['Ban đêm', 'Cả ngày lẫn đêm', 'Ban ngày', 'Không đi'], 2, 'Học sinh học ban ngày.', ['Sai — ban đêm là lúc đi ngủ.', 'Sai — em chỉ học ban ngày thôi.', 'Đúng — học sinh đi học vào ban ngày.', 'Sai — em vẫn phải đi học để biết chữ.']),
    Q('Em đi ngủ thường vào?', ['Trưa', 'Ban đêm', 'Sáng sớm', 'Ban ngày'], 1, 'Trẻ em ngủ ban đêm là chính.', ['Sai — buổi trưa chỉ ngủ ngắn, ngủ chính là ban đêm.', 'Đúng — trẻ em ngủ ban đêm là chính.', 'Sai — sáng sớm là lúc thức dậy.', 'Sai — ban ngày là lúc học và chơi.']),
    Q('Sau khi Mặt Trời lặn là?', ['Buổi tối', 'Buổi sáng', 'Bình minh', 'Buổi trưa'], 0, 'Mặt Trời lặn → tối.', ['Đúng — Mặt Trời lặn thì trời tối, là buổi tối.', 'Sai — buổi sáng là lúc Mặt Trời mọc.', 'Sai — bình minh là lúc Mặt Trời mọc.', 'Sai — buổi trưa là lúc Mặt Trời lên cao.']),
    Q('Em nên dậy lúc?', ['Trưa, sau giờ học', 'Đêm khuya', 'Sáng sớm', 'Chiều tối'], 2, 'Dậy sớm để chuẩn bị đi học.', ['Sai — dậy trưa thì trễ giờ học.', 'Sai — đêm khuya là lúc đang ngủ.', 'Đúng — dậy sớm để chuẩn bị đi học.', 'Sai — chiều tối là lúc gần đi ngủ.']),
  ]),

  M(29, 'Nước trong cuộc sống', [
    Q('Em uống nước nào tốt?', ['Nước ao', 'Nước mưa chưa lọc', 'Nước sạch đun sôi để nguội', 'Nước cống'], 2, 'Nước sạch, đun sôi an toàn.', ['Sai — nước ao bẩn, uống dễ bị bệnh.', 'Sai — nước mưa chưa lọc còn bụi bẩn.', 'Đúng — nước sạch đun sôi để nguội thì an toàn.', 'Sai — nước cống rất bẩn, không được uống.']),
    Q('Nước có ở đâu?', ['Chỉ ngoài đường', 'Chỉ trong chai', 'Sông, hồ, biển, vòi nước', 'Không ở đâu'], 2, 'Nước có nhiều nơi trong tự nhiên.', ['Sai — nước có ở nhiều nơi, không chỉ ngoài đường.', 'Sai — nước còn ở sông, hồ, biển nữa.', 'Đúng — nước có ở sông, hồ, biển và vòi nước.', 'Sai — nước có ở rất nhiều nơi.']),
    Q('Em cần nước để làm gì?', ['Uống, tắm, nấu ăn, tưới cây', 'Vứt rác', 'Rửa xe ô tô mỗi ngày', 'Đốt lửa'], 0, 'Nước cần cho rất nhiều việc.', ['Đúng — nước dùng để uống, tắm, nấu ăn, tưới cây.', 'Sai — nước không dùng để vứt rác.', 'Sai — rửa xe mỗi ngày là phí nước.', 'Sai — nước dùng để dập lửa, không đốt lửa.']),
    Q('Tiết kiệm nước nghĩa là?', ['Vặn vòi vô tội vạ', 'Tắt vòi khi đánh răng', 'Tắm rất lâu', 'Để vòi chảy quên'], 1, 'Tắt vòi khi không dùng = tiết kiệm.', ['Sai — vặn vòi bừa là lãng phí nước.', 'Đúng — tắt vòi khi đánh răng là tiết kiệm nước.', 'Sai — tắm rất lâu tốn nhiều nước.', 'Sai — để vòi chảy quên là lãng phí nước.']),
    Q('Không nên đổ gì xuống sông?', ['Lá khô tự nhiên', 'Cát sạch', 'Rác, dầu', 'Nước sạch'], 2, 'Rác/dầu làm ô nhiễm nước.', ['Sai — lá khô tự nhiên không làm bẩn nhiều.', 'Sai — cát sạch không làm ô nhiễm nước.', 'Đúng — rác và dầu làm ô nhiễm nước sông.', 'Sai — nước sạch không làm bẩn nước sông.']),
    Q('Khi đi bơi, em cần?', ['Bơi đêm', 'Bơi một mình', 'Tự xuống chỗ sâu', 'Có người lớn trông'], 3, 'Trẻ em phải có người lớn giám sát.', ['Sai — bơi đêm rất nguy hiểm.', 'Sai — bơi một mình dễ gặp nguy hiểm.', 'Sai — tự xuống chỗ sâu rất nguy hiểm.', 'Đúng — phải có người lớn trông khi đi bơi.']),
  ]),

  M(30, 'Giữ vệ sinh môi trường', [
    Q('Em vứt rác vào?', ['Gốc cây', 'Thùng rác', 'Sân nhà người khác', 'Vỉa hè'], 1, 'Bỏ rác vào thùng rác.', ['Sai — vứt rác ở gốc cây làm bẩn và hại cây.', 'Đúng — bỏ rác vào thùng rác cho sạch sẽ.', 'Sai — vứt rác vào sân nhà người khác là không tốt.', 'Sai — vứt rác ra vỉa hè làm bẩn đường.']),
    Q('Hành động làm ô nhiễm môi trường là?', ['Trồng cây', 'Vứt rác bừa bãi', 'Tưới hoa', 'Quét nhà'], 1, 'Vứt rác bừa làm bẩn môi trường.', ['Sai — trồng cây giúp môi trường sạch hơn.', 'Đúng — vứt rác bừa bãi làm bẩn môi trường.', 'Sai — tưới hoa là việc tốt.', 'Sai — quét nhà giúp giữ sạch sẽ.']),
    Q('Phân loại rác là?', ['Đốt hết', 'Để rác hữu cơ riêng, vô cơ riêng', 'Vứt xuống sông', 'Trộn tất cả'], 1, 'Phân loại giúp tái chế tốt hơn.', ['Sai — đốt hết rác gây khói, ô nhiễm.', 'Đúng — để rác hữu cơ riêng, vô cơ riêng là phân loại.', 'Sai — vứt rác xuống sông làm ô nhiễm nước.', 'Sai — trộn tất cả thì không gọi là phân loại.']),
    Q('Trồng cây xanh giúp?', ['Không khí trong lành', 'Ô nhiễm hơn', 'Nhiều khói bụi', 'Mất bóng mát'], 0, 'Cây làm sạch không khí.', ['Đúng — trồng cây xanh giúp không khí trong lành.', 'Sai — cây làm sạch không khí, không gây ô nhiễm.', 'Sai — cây giữ bụi, không tạo khói bụi.', 'Sai — cây cho thêm bóng mát.']),
    Q('Khi thấy bạn xả rác, em nên?', ['Mặc kệ', 'Nhắc bạn nhặt lên', 'Cổ vũ bạn', 'Cười và làm theo'], 1, 'Nhắc nhở bạn giữ vệ sinh chung.', ['Sai — mặc kệ thì rác vẫn làm bẩn nơi đó.', 'Đúng — nhắc bạn nhặt lên để giữ vệ sinh chung.', 'Sai — cổ vũ bạn xả rác là không tốt.', 'Sai — làm theo càng làm bẩn môi trường.']),
    Q('Môi trường sạch giúp em?', ['Khoẻ mạnh', 'Đau ốm', 'Mệt mỏi', 'Bị bệnh'], 0, 'Môi trường sạch → sức khoẻ tốt.', ['Đúng — môi trường sạch giúp em khoẻ mạnh.', 'Sai — môi trường sạch không làm em đau ốm.', 'Sai — môi trường sạch giúp em dễ chịu, không mệt.', 'Sai — môi trường bẩn mới dễ làm em bị bệnh.']),
  ]),

  M(31, 'Phòng tránh muỗi, côn trùng', [
    Q('Để tránh muỗi đốt, ban đêm em nên?', ['Tắt đèn ngủ ngoài sân', 'Để chậu nước trong phòng', 'Mở cửa toang', 'Ngủ trong màn'], 3, 'Ngủ màn (mùng) chống muỗi.', ['Sai — ngủ ngoài sân càng dễ bị muỗi đốt.', 'Sai — chậu nước trong phòng làm muỗi sinh sản.', 'Sai — mở cửa toang muỗi bay vào nhiều hơn.', 'Đúng — ngủ trong màn (mùng) để muỗi không đốt.']),
    Q('Bệnh nguy hiểm do muỗi truyền là?', ['Đau mắt', 'Sốt xuất huyết', 'Cảm cúm thường', 'Đau răng'], 1, 'Muỗi vằn truyền sốt xuất huyết.', ['Sai — đau mắt không phải do muỗi truyền.', 'Đúng — muỗi vằn truyền bệnh sốt xuất huyết.', 'Sai — cảm cúm thường không phải do muỗi.', 'Sai — đau răng không liên quan đến muỗi.']),
    Q('Để không có muỗi sinh sản, em nên?', ['Vứt rác bừa', 'Trữ nước đọng lâu', 'Để chậu hoa nhiều nước cũ', 'Đổ nước đọng'], 3, 'Muỗi đẻ ở nước đọng → đổ đi.', ['Sai — vứt rác bừa làm bẩn và có muỗi.', 'Sai — nước đọng lâu là nơi muỗi đẻ.', 'Sai — nước cũ trong chậu hoa làm muỗi sinh sản.', 'Đúng — đổ nước đọng để muỗi không có chỗ đẻ.']),
    Q('Khi bị ong/kiến cắn, em nên?', ['Báo người lớn', 'Bóp mạnh chỗ cắn', 'Tiếp tục chơi', 'Bỏ qua'], 0, 'Báo người lớn để xử trí.', ['Đúng — báo người lớn để được giúp đỡ.', 'Sai — bóp mạnh chỗ cắn càng đau hơn.', 'Sai — bị cắn rồi mà chơi tiếp dễ bị nặng hơn.', 'Sai — bỏ qua thì có thể bị sưng, đau nặng.']),
    Q('Em có nên trêu chọc tổ ong, tổ kiến?', ['Có, để xem chúng phản ứng', 'Nếu rảnh', 'Tuỳ, nếu tổ ở xa', 'Không, rất nguy hiểm'], 3, 'Bị đốt rất đau, có thể nguy hiểm.', ['Sai — trêu chọc tổ ong dễ bị cả đàn đốt.', 'Sai — dù rảnh cũng không được trêu tổ ong, kiến.', 'Sai — dù tổ ở xa cũng không nên trêu chọc.', 'Đúng — không trêu vì bị đốt rất đau, nguy hiểm.']),
    Q('Sau khi đi ngoài đồng, em nên?', ['Lên giường ngủ luôn', 'Để bẩn', 'Tắm rửa sạch', 'Ăn ngay'], 2, 'Tắm rửa để bỏ vi khuẩn.', ['Sai — người còn bẩn mà lên giường làm bẩn giường.', 'Sai — để bẩn dễ bị bệnh.', 'Đúng — tắm rửa sạch để bỏ vi khuẩn.', 'Sai — tay bẩn ăn ngay dễ bị đau bụng.']),
  ]),

  M(32, 'Khi bị ốm', [
    Q('Khi bị sốt em cần?', ['Tự uống thuốc bất kỳ', 'Tắm nước lạnh', 'Báo người lớn', 'Chạy chơi ngoài nắng'], 2, 'Báo người lớn để được chăm sóc.', ['Sai — tự uống thuốc bất kỳ rất nguy hiểm.', 'Sai — đang sốt mà tắm nước lạnh càng dễ ốm nặng.', 'Đúng — báo người lớn để được chăm sóc.', 'Sai — đang sốt mà ra nắng làm bệnh nặng hơn.']),
    Q('Để phòng ốm, em nên?', ['Thức khuya', 'Tắm khuya', 'Mặc ấm khi lạnh, ăn uống đủ', 'Tắm nước lạnh khi nóng'], 2, 'Mặc phù hợp + ăn đủ chất → khoẻ.', ['Sai — thức khuya làm cơ thể yếu, dễ ốm.', 'Sai — tắm khuya dễ bị cảm lạnh.', 'Đúng — mặc ấm khi lạnh và ăn uống đủ để khoẻ.', 'Sai — tắm nước lạnh khi đang nóng dễ bị ốm.']),
    Q('Em có tự ý uống thuốc trong tủ?', ['Cho bạn cùng uống', 'Có, nếu thấy giống thuốc cũ', 'Không, rất nguy hiểm', 'Uống thử ít'], 2, 'Tự uống thuốc gây ngộ độc.', ['Sai — không được cho bạn uống thuốc bừa.', 'Sai — thuốc trông giống nhau nhưng có thể khác, rất nguy hiểm.', 'Đúng — không tự uống thuốc vì có thể bị ngộ độc.', 'Sai — uống thử ít cũng có thể bị ngộ độc.']),
    Q('Khi ho/hắt hơi, em nên?', ['Quay đi, che miệng', 'Hét to', 'Phun thẳng vào bạn', 'Không che'], 0, 'Che miệng tránh lây bệnh.', ['Đúng — quay đi và che miệng để không lây bệnh.', 'Sai — hét to không liên quan, lại làm ồn.', 'Sai — phun thẳng vào bạn sẽ lây bệnh cho bạn.', 'Sai — không che thì vi khuẩn bay ra ngoài.']),
    Q('Số gọi cấp cứu y tế là?', ['113', '116', '115', '114'], 2, '115 = cấp cứu.', ['Sai — 113 là số công an.', 'Sai — 116 không phải số cấp cứu.', 'Đúng — 115 là số cấp cứu y tế.', 'Sai — 114 là số cứu hoả.']),
    Q('Tiêm vắc-xin giúp em?', ['Phòng bệnh', 'Mệt mỏi mãi', 'Bị bệnh', 'Đau lâu'], 0, 'Vắc-xin giúp cơ thể chống bệnh.', ['Đúng — tiêm vắc-xin giúp em phòng bệnh.', 'Sai — vắc-xin không làm em mệt mỏi mãi.', 'Sai — vắc-xin giúp phòng bệnh, không gây bệnh.', 'Sai — vắc-xin bảo vệ em, không làm đau lâu.']),
  ]),

  M(33, 'Trang phục phù hợp', [
    Q('Mùa hè em mặc?', ['Khăn len', 'Áo mỏng, ngắn tay', 'Áo mưa', 'Áo bông dày'], 1, 'Hè nóng → mặc mát.', ['Sai — khăn len dùng khi trời lạnh.', 'Đúng — mùa hè nóng nên mặc áo mỏng, ngắn tay.', 'Sai — áo mưa chỉ mặc khi trời mưa.', 'Sai — áo bông dày rất nóng vào mùa hè.']),
    Q('Mùa đông em mặc?', ['Áo tắm', 'Áo cộc', 'Áo mưa mỏng', 'Áo ấm, áo bông'], 3, 'Đông lạnh → mặc ấm.', ['Sai — áo tắm chỉ mặc khi đi bơi.', 'Sai — áo cộc không đủ ấm khi trời lạnh.', 'Sai — áo mưa mỏng không giữ ấm được.', 'Đúng — mùa đông lạnh nên mặc áo ấm, áo bông.']),
    Q('Khi trời mưa em cần?', ['Quạt giấy', 'Kính râm', 'Áo bông', 'Áo mưa hoặc ô'], 3, 'Áo mưa/ô tránh ướt.', ['Sai — quạt giấy dùng khi trời nóng.', 'Sai — kính râm dùng khi trời nắng.', 'Sai — áo bông dùng khi trời lạnh.', 'Đúng — áo mưa hoặc ô giúp em không bị ướt.']),
    Q('Đi ra nắng to em cần?', ['Ô tô bự', 'Áo bông', 'Mũ rộng vành', 'Khăn quàng len'], 2, 'Mũ rộng vành chống nắng.', ['Sai — không phải lúc nào cũng có ô tô; cần mũ chống nắng.', 'Sai — áo bông rất nóng khi trời nắng.', 'Đúng — mũ rộng vành che nắng cho em.', 'Sai — khăn len dùng khi trời lạnh.']),
    Q('Khi đi ngủ em mặc?', ['Áo bơi', 'Áo vest', 'Đồ ngủ thoải mái', 'Đồng phục'], 2, 'Đồ ngủ rộng rãi dễ chịu.', ['Sai — áo bơi chỉ mặc khi đi bơi.', 'Sai — áo vest mặc khi đi dự lễ, không để ngủ.', 'Đúng — đồ ngủ rộng rãi, thoải mái dễ ngủ.', 'Sai — đồng phục mặc khi đi học.']),
    Q('Em nên giặt giũ quần áo?', ['Mỗi năm 1 lần', 'Khi rách', 'Không bao giờ', 'Khi bẩn'], 3, 'Bẩn là giặt để giữ sạch.', ['Sai — mỗi năm 1 lần thì áo quần rất bẩn.', 'Sai — bẩn là phải giặt, không đợi đến khi rách.', 'Sai — không giặt thì quần áo bẩn, có mùi.', 'Đúng — quần áo bẩn là giặt để giữ sạch.']),
  ]),

  M(34, 'Hoạt động ngoài trời và vận động', [
    Q('Tập thể dục đều mỗi ngày giúp em?', ['Béo bệu', 'Mệt mãi', 'Khoẻ mạnh', 'Yếu hơn'], 2, 'Vận động giúp cơ thể khoẻ.', ['Sai — tập thể dục giúp khoẻ, không béo bệu.', 'Sai — tập đều giúp khoẻ, không mệt mãi.', 'Đúng — tập thể dục đều giúp em khoẻ mạnh.', 'Sai — tập thể dục làm em khoẻ hơn, không yếu đi.']),
    Q('Hoạt động ngoài trời nào tốt?', ['Nằm cả ngày', 'Ngồi xem TV', 'Chơi điện tử lâu', 'Đá bóng, đá cầu, chạy bộ'], 3, 'Vận động ngoài trời khoẻ và vui.', ['Sai — nằm cả ngày làm cơ thể uể oải.', 'Sai — ngồi xem TV lâu hại mắt và ít vận động.', 'Sai — chơi điện tử lâu hại mắt.', 'Đúng — đá bóng, đá cầu, chạy bộ giúp khoẻ và vui.']),
    Q('Khi chơi ngoài trời nắng to, em nên?', ['Đội mũ, uống nước', 'Cởi áo phơi nắng', 'Chạy đến kiệt sức', 'Ở quá lâu'], 0, 'Bảo vệ đầu, bổ sung nước.', ['Đúng — đội mũ và uống nước để khỏi say nắng.', 'Sai — cởi áo phơi nắng dễ bị cháy nắng.', 'Sai — chạy đến kiệt sức rất hại cho cơ thể.', 'Sai — ở ngoài nắng quá lâu dễ bị ốm.']),
    Q('Khi chơi xong em nên?', ['Ăn liền tay bẩn', 'Rửa tay rửa mặt', 'Đi ngủ liền', 'Để bẩn vậy'], 1, 'Vệ sinh sau khi chơi.', ['Sai — tay bẩn ăn liền dễ bị đau bụng.', 'Đúng — rửa tay rửa mặt sau khi chơi cho sạch.', 'Sai — người còn bẩn mà ngủ làm bẩn giường.', 'Sai — để bẩn dễ bị bệnh.']),
    Q('Trẻ em nên xem TV/điện thoại?', ['Có giới hạn, ngắt nghỉ', 'Không bao giờ ngắt', 'Đến đêm khuya', 'Cả ngày'], 0, 'Xem ít, nghỉ mắt để bảo vệ thị lực.', ['Đúng — xem có giới hạn và ngắt nghỉ để bảo vệ mắt.', 'Sai — xem mãi không nghỉ rất hại mắt.', 'Sai — xem đến khuya hại mắt và thiếu ngủ.', 'Sai — xem cả ngày làm mỏi mắt, hại sức khoẻ.']),
    Q('Sau bữa ăn em nên?', ['Nhảy dây mạnh', 'Nghỉ ngơi nhẹ', 'Chạy ngay rất mạnh', 'Đi bơi liền'], 1, 'Ăn xong nên nghỉ nhẹ rồi mới vận động.', ['Sai — nhảy dây mạnh ngay sau ăn dễ đau bụng.', 'Đúng — ăn xong nên nghỉ ngơi nhẹ.', 'Sai — chạy mạnh ngay sau ăn dễ đau bụng.', 'Sai — đi bơi ngay sau ăn rất nguy hiểm.']),
  ]),

  M(35, 'Ôn tập cuối năm', [
    Q('Bố mẹ là người?', ['Hàng xóm', 'Người lạ', 'Sinh và nuôi nấng em', 'Bạn cùng lớp'], 2, 'Bố mẹ sinh và nuôi em.', ['Sai — hàng xóm ở gần nhà, không phải bố mẹ.', 'Sai — bố mẹ là người thân nhất, không phải người lạ.', 'Đúng — bố mẹ sinh ra và nuôi nấng em.', 'Sai — bạn cùng lớp là bạn học của em.']),
    Q('Đèn giao thông xanh nghĩa là?', ['Lùi xe', 'Đi', 'Dừng lại', 'Chuẩn bị dừng'], 1, 'Xanh = được đi.', ['Sai — đèn xanh là đi tới, không lùi xe.', 'Đúng — đèn xanh nghĩa là được đi.', 'Sai — đèn đỏ mới là dừng lại.', 'Sai — đèn vàng mới là chuẩn bị dừng.']),
    Q('Em có mấy mắt?', ['1', '4', '2', '3'], 2, '2 mắt để nhìn.', ['Sai — em có 2 mắt, không phải 1.', 'Sai — em có 2 mắt, không phải 4.', 'Đúng — em có 2 mắt để nhìn.', 'Sai — em có 2 mắt, không phải 3.']),
    Q('Một năm có mấy mùa?', ['4', '3', '5', '2'], 0, '4 mùa: xuân, hạ, thu, đông.', ['Đúng — một năm có 4 mùa: xuân, hạ, thu, đông.', 'Sai — một năm có 4 mùa, không phải 3.', 'Sai — một năm có 4 mùa, không phải 5.', 'Sai — một năm có 4 mùa, không phải 2.']),
    Q('Mặt Trời mọc ở hướng?', ['Đông', 'Hướng Tây', 'Hướng Nam', 'Hướng Bắc'], 0, 'Mặt Trời mọc hướng Đông.', ['Đúng — Mặt Trời mọc ở hướng Đông.', 'Sai — hướng Tây là nơi Mặt Trời lặn.', 'Sai — Mặt Trời mọc ở hướng Đông.', 'Sai — Mặt Trời mọc ở hướng Đông.']),
    Q('Em vứt rác vào?', ['Thùng rác', 'Xuống sông', 'Vỉa hè', 'Gốc cây'], 0, 'Bỏ rác đúng nơi.', ['Đúng — bỏ rác vào thùng rác cho sạch sẽ.', 'Sai — vứt rác xuống sông làm ô nhiễm nước.', 'Sai — vứt rác ra vỉa hè làm bẩn đường.', 'Sai — vứt rác ở gốc cây làm bẩn và hại cây.']),
    Q('Để tránh muỗi đốt, em nên?', ['Tắt đèn ngoài sân', 'Để nước đọng quanh nhà', 'Mở cửa toang', 'Ngủ trong màn'], 3, 'Ngủ màn (mùng) phòng muỗi.', ['Sai — tắt đèn ngoài sân không giúp tránh muỗi đốt.', 'Sai — nước đọng quanh nhà làm muỗi sinh sản.', 'Sai — mở cửa toang muỗi bay vào nhiều hơn.', 'Đúng — ngủ trong màn (mùng) để muỗi không đốt.']),
    Q('Số gọi cứu hoả là?', ['114', '115', '116', '113'], 0, '114 = cứu hoả.', ['Đúng — 114 là số gọi cứu hoả.', 'Sai — 115 là số cấp cứu y tế.', 'Sai — 116 không phải số cứu hoả.', 'Sai — 113 là số công an.']),
    Q('Trước khi ăn em nên?', ['Rửa tay sạch', 'Xem TV', 'Chạy chơi', 'Ăn liền'], 0, 'Rửa tay chống vi khuẩn.', ['Đúng — rửa tay sạch trước khi ăn để chống vi khuẩn.', 'Sai — xem TV không giúp tay sạch.', 'Sai — chạy chơi không giúp tay sạch.', 'Sai — tay bẩn ăn liền dễ bị đau bụng.']),
    Q('Bảo vệ cây xanh là?', ['Khắc tên', 'Chặt phá', 'Đốt cây', 'Tưới nước, không bẻ cành'], 3, 'Chăm sóc, không phá hoại cây.', ['Sai — khắc tên làm cây bị thương.', 'Sai — chặt phá là phá hoại cây.', 'Sai — đốt cây là phá hoại cây.', 'Đúng — tưới nước và không bẻ cành là bảo vệ cây.']),
  ], { difficulty: 2 }),

  M(36, 'Kết thúc Lớp 1 — Tổng kết Tự nhiên và Xã hội', [
    Q('Giác quan nào giúp em nhận biết màu sắc?', ['Tai', 'Mũi', 'Lưỡi', 'Mắt'], 3, 'Mắt (thị giác) giúp em nhìn thấy màu sắc.', ['Sai — tai dùng để nghe âm thanh.', 'Sai — mũi dùng để ngửi mùi.', 'Sai — lưỡi dùng để nếm vị.', 'Đúng — mắt giúp em nhìn thấy hình dạng và màu sắc.']),
    Q('Tai giúp em làm gì?', ['Nghe', 'Nhìn', 'Ngửi', 'Nếm'], 0, 'Tai là cơ quan thính giác.', ['Đúng — tai giúp em nghe âm thanh.', 'Sai — nhìn là việc của mắt.', 'Sai — ngửi là việc của mũi.', 'Sai — nếm là việc của lưỡi.']),
    Q('Việc nào giúp bảo vệ môi trường?', ['Xả rác xuống sông', 'Bỏ rác đúng nơi quy định', 'Bẻ cành hái hoa', 'Để vòi nước chảy mãi'], 1, 'Bỏ rác đúng chỗ là việc nhỏ nhưng rất quan trọng.', ['Sai — xả rác xuống sông làm ô nhiễm nguồn nước.', 'Đúng — bỏ rác đúng nơi quy định giúp giữ môi trường sạch.', 'Sai — bẻ cành hái hoa làm hại cây.', 'Sai — để nước chảy mãi là lãng phí nước sạch.']),
    Q('Nơi có ông bà, bố mẹ, nơi em được yêu thương là?', ['Trường học', 'Bệnh viện', 'Gia đình', 'Siêu thị'], 2, 'Gia đình là nơi em được yêu thương và chăm sóc.', ['Sai — trường học là nơi em học và có bạn bè.', 'Sai — bệnh viện là nơi khám chữa bệnh.', 'Đúng — gia đình là nơi em được yêu thương.', 'Sai — siêu thị là nơi mua sắm.']),
    Q('Trước khi ăn và sau khi đi vệ sinh, em cần làm gì?', ['Rửa tay bằng xà phòng', 'Xem tivi', 'Chạy chơi ngay', 'Không cần làm gì'], 0, 'Rửa tay giúp phòng bệnh đường tiêu hoá.', ['Đúng — rửa tay bằng xà phòng giúp em không bị đau bụng.', 'Sai — xem tivi không làm tay sạch.', 'Sai — chạy chơi làm tay bẩn thêm.', 'Sai — tay bẩn mang nhiều vi khuẩn, cần rửa sạch.']),
    Q('Khi ra đường, học sinh Lớp 1 nên?', ['Đi thật xa một mình', 'Đi cùng người lớn', 'Chạy giữa lòng đường', 'Chơi gần đường ray'], 1, 'Trẻ Lớp 1 ra đường cần có người lớn đi cùng.', ['Sai — đi xa một mình rất nguy hiểm với bạn nhỏ.', 'Đúng — em nên đi cùng người lớn để được an toàn.', 'Sai — lòng đường dành cho xe, rất nguy hiểm.', 'Sai — đường ray là nơi tàu chạy, tuyệt đối không chơi ở đó.']),
  ], { difficulty: 2 }),
];

export const P1TNXH_SCENARIOS = indexBy(P1TNXH_WEEKS);
