// ============================================================
// Lớp 5 · GIÁO DỤC THỂ CHẤT — 35 tuần (HK1: 1–18 · HK2: 19–35)
// Bám CT GDPT 2018 môn GDTC Lớp 5.
// ID prefix: "P5GDTC-wNN-quiz".
// ============================================================
import { Q, W, indexBy } from './_helper.js';

const M = (n, title, qs, opts) => W('P5GDTC', 'gdtc', n, title, qs, opts);

export const P5GDTC_WEEKS = [
  // ──────────────── HK1 ────────────────
  M(1, 'Giới thiệu — Đội hình đội ngũ', [
    Q('Trước khi tập, em nên?', ['Khởi động kĩ các khớp', 'Uống nhiều nước', 'Tập luôn', 'Chạy luôn một vòng sân để làm nóng'], 0, 'Khởi động kĩ để tránh chấn thương.', ['Đúng — khởi động kĩ các khớp giúp tránh chấn thương.', 'Sai — uống nước cần thiết nhưng chưa làm nóng cơ.', 'Sai — tập luôn khi cơ chưa nóng dễ bị đau.', 'Sai — chạy ngay chưa đủ, cần khởi động khớp trước.']),
    Q('Đội hình hàng ngang là?', ['Vòng tròn', 'Lung tung', 'Các bạn đứng cạnh nhau theo hàng', 'Đứng theo cột'], 2, 'Hàng ngang đứng cạnh nhau.', ['Sai — vòng tròn không phải hàng ngang.', 'Sai — đứng lung tung không phải đội hình.', 'Đúng — hàng ngang là đứng cạnh nhau theo hàng.', 'Sai — đứng theo cột là hàng dọc.']),
    Q('Đội hình hàng dọc?', ['Vòng tròn', 'Hàng ngang', 'Đứng theo cột (người sau – người trước)', 'Tản mác'], 2, 'Hàng dọc xếp theo cột.', ['Sai — vòng tròn không phải hàng dọc.', 'Sai — hàng ngang là đứng cạnh nhau.', 'Đúng — hàng dọc là đứng theo cột người sau người trước.', 'Sai — tản mác không phải đội hình.']),
    Q('Hô "Nghiêm!" em phải?', ['Đứng thẳng, tay áp đùi', 'Đứng thoải mái, hai chân dang rộng', 'Đưa hai tay lên ngang vai', 'Ngồi xuống'], 0, 'Đứng nghiêm tay áp đùi.', ['Đúng — nghiêm là đứng thẳng, tay áp đùi.', 'Sai — đứng thoải mái dang chân là tư thế nghỉ.', 'Sai — đưa tay ngang vai không phải nghiêm.', 'Sai — không ngồi khi hô nghiêm.']),
  ]),

  M(2, 'Bài thể dục liên hoàn — Động tác 1-3', [
    Q('Bài thể dục liên hoàn lớp 5 có?', ['3 động tác', '10 động tác', '5 động tác', '20 động tác'], 1, 'Lớp 5 có 10 động tác liên hoàn.', ['Sai — bài liên hoàn lớp 5 nhiều hơn 3 động tác.', 'Đúng — lớp 5 có 10 động tác liên hoàn.', 'Sai — không phải 5 động tác.', 'Sai — không nhiều tới 20 động tác.']),
    Q('Động tác 1 thường là?', ['Tay (đưa tay ngang)', 'Vươn thở', 'Chân (đá lăng chân)', 'Toàn thân'], 1, 'Vươn thở mở đầu để hít sâu.', ['Sai — động tác tay không phải mở đầu.', 'Đúng — vươn thở mở đầu để hít sâu.', 'Sai — động tác chân không phải đầu tiên.', 'Sai — toàn thân ở giữa bài, không mở đầu.']),
    Q('Khi tập vươn thở em nên?', ['Nín thở', 'Không cần', 'Thở vội', 'Hít vào - thở ra theo nhịp'], 3, 'Hít vào - thở ra theo nhịp.', ['Sai — nín thở là sai khi vươn thở.', 'Sai — vươn thở rất cần thở đúng.', 'Sai — thở vội không tốt.', 'Đúng — hít vào thở ra theo nhịp động tác.']),
    Q('Mục đích bài thể dục?', ['Không có mục đích', 'Mệt thêm', 'Béo lên', 'Khoẻ mạnh, dẻo dai'], 3, 'Khoẻ mạnh và dẻo dai.', ['Sai — tập thể dục luôn có mục đích.', 'Sai — tập đúng giúp khoẻ chứ không chỉ mệt.', 'Sai — tập thể dục không làm béo lên.', 'Đúng — bài thể dục giúp khoẻ mạnh, dẻo dai.']),
  ]),

  M(3, 'Bài thể dục liên hoàn — Động tác 4-6', [
    Q('Động tác tay giúp?', ['Khoẻ bụng', 'Khoẻ cơ vai và cánh tay', 'Khoẻ chân', 'Không có gì'], 1, 'Khoẻ cơ vai và tay.', ['Sai — động tác tay không nhằm vào bụng.', 'Đúng — động tác tay giúp khoẻ cơ vai và cánh tay.', 'Sai — đó là động tác chân.', 'Sai — động tác tay có ích cho cơ vai, tay.']),
    Q('Động tác chân giúp?', ['Khoẻ bụng', 'Khoẻ mặt', 'Khoẻ tay', 'Khoẻ cơ chân và đùi'], 3, 'Khoẻ cơ chân.', ['Sai — không nhằm vào bụng.', 'Sai — không phải để khoẻ mặt.', 'Sai — đó là động tác tay.', 'Đúng — động tác chân giúp khoẻ cơ chân và đùi.']),
    Q('Khi tập em nên?', ['Quá chậm', 'Theo đúng nhịp hô', 'Tự ý nhanh', 'Bỏ giữa'], 1, 'Theo đúng nhịp hô.', ['Sai — tập quá chậm sai nhịp.', 'Đúng — tập theo đúng nhịp hô.', 'Sai — tự ý nhanh sẽ lệch nhịp.', 'Sai — không bỏ giữa bài.']),
    Q('Sau buổi tập cần?', ['Ngồi luôn', 'Tắm ngay', 'Thả lỏng, hồi phục', 'Uống nước đá'], 2, 'Thả lỏng và hồi phục.', ['Sai — không nên ngồi luôn khi tim còn đập nhanh.', 'Sai — không tắm ngay khi vừa tập xong.', 'Đúng — cần thả lỏng để hồi phục.', 'Sai — không uống nước đá ngay sau tập.']),
  ]),

  M(4, 'Bài thể dục liên hoàn — Động tác 7-10', [
    Q('Động tác toàn thân giúp?', ['Phối hợp cả cơ thể', 'Chỉ chân', 'Chỉ tay', 'Không gì'], 0, 'Phối hợp toàn thân.', ['Đúng — động tác toàn thân giúp phối hợp cả cơ thể.', 'Sai — không chỉ riêng chân.', 'Sai — không chỉ riêng tay.', 'Sai — động tác này rất có ích.']),
    Q('Động tác cuối thường là?', ['Nhảy cao', 'Điều hoà', 'Chạy nhanh', 'Vươn thở'], 1, 'Điều hoà để hồi sức.', ['Sai — nhảy cao không phải động tác cuối.', 'Đúng — động tác cuối là điều hoà để hồi sức.', 'Sai — chạy nhanh không phải động tác cuối.', 'Sai — vươn thở là động tác mở đầu.']),
    Q('Tập 10 động tác liên hoàn cần?', ['Nhớ thứ tự và đúng nhịp', 'Chỉ cần tập động tác mình thích', 'Đổi thứ tự', 'Bỏ giữa'], 0, 'Nhớ thứ tự và nhịp.', ['Đúng — cần nhớ đúng thứ tự và đúng nhịp.', 'Sai — phải tập đủ, không chỉ động tác mình thích.', 'Sai — không tự đổi thứ tự.', 'Sai — không bỏ giữa bài.']),
    Q('Sau khi học xong, em có thể?', ['Không tập nữa', 'Tự tập ở nhà mỗi sáng', 'Chỉ tập ở lớp', 'Quên ngay'], 1, 'Tự tập ở nhà cũng tốt.', ['Sai — nên duy trì tập luyện.', 'Đúng — tự tập ở nhà mỗi sáng rất tốt.', 'Sai — có thể tập cả ở nhà.', 'Sai — không nên quên bài đã học.']),
  ]),

  M(5, 'Chạy 80m', [
    Q('Chạy 80m yêu cầu?', ['Chạy chậm', 'Chạy nhanh và đúng kĩ thuật', 'Đi bộ nhanh giữ sức đến vạch đích', 'Chạy nước rút ngay vài bước đầu rồi đi bộ'], 1, 'Chạy nhanh đúng kĩ thuật.', ['Sai — chạy chậm không đúng yêu cầu.', 'Đúng — chạy 80m cần nhanh và đúng kĩ thuật.', 'Sai — đi bộ không phải chạy.', 'Sai — không nên rút rồi đi bộ.']),
    Q('Xuất phát chạy 80m?', ['Tư thế chuẩn bị "vào chỗ"', 'Ngồi xổm chống hai tay xuống đất', 'Đứng nghiêm', 'Đứng nghiêng người, tay chống hông'], 0, '"Vào chỗ" rồi "sẵn sàng" rồi chạy.', ['Đúng — bắt đầu bằng tư thế chuẩn bị "vào chỗ".', 'Sai — ngồi xổm chống tay là xuất phát thấp của VĐV.', 'Sai — đứng nghiêm không phải tư thế xuất phát.', 'Sai — chống hông không phải tư thế chạy.']),
    Q('Khi chạy em nên?', ['Đi thẳng tay', 'Nhảy lò cò', 'Đánh tay và thở đều', 'Không thở'], 2, 'Đánh tay và thở đều.', ['Sai — tay phải đánh nhịp, không để thẳng.', 'Sai — không nhảy lò cò khi chạy.', 'Đúng — đánh tay nhịp nhàng và thở đều.', 'Sai — phải thở đều khi chạy.']),
    Q('Khi về đích em nên?', ['Đi bộ về', 'Quay lại', 'Dừng trước vạch', 'Chạy hết tốc lực qua vạch'], 3, 'Chạy hết qua vạch đích.', ['Sai — không đi bộ về đích.', 'Sai — không quay lại.', 'Sai — không dừng trước vạch.', 'Đúng — chạy hết tốc lực qua vạch đích.']),
  ]),

  M(6, 'Chạy 80m (luyện tập)', [
    Q('Để chạy nhanh hơn em cần?', ['Ngủ nhiều', 'Luyện tập đều, thở đúng', 'Ăn nhiều', 'Không tập'], 1, 'Luyện tập và thở đúng.', ['Sai — ngủ nhiều không giúp chạy nhanh hơn.', 'Đúng — luyện tập đều và thở đúng giúp chạy nhanh hơn.', 'Sai — ăn nhiều không làm chạy nhanh.', 'Sai — không tập thì không tiến bộ.']),
    Q('Bước chân khi chạy?', ['Bước chéo chân để tăng tốc', 'Rất dài', 'Tự nhiên, không quá dài', 'Rất ngắn'], 2, 'Tự nhiên, không quá dài/ngắn.', ['Sai — bước chéo chân dễ vấp ngã.', 'Sai — bước quá dài sẽ mất nhịp.', 'Đúng — bước tự nhiên, không quá dài hay quá ngắn.', 'Sai — bước quá ngắn thì chạy chậm.']),
    Q('Tay khi chạy?', ['Đánh tay nhịp nhàng', 'Khoanh tay', 'Không đánh', 'Đánh loạn'], 0, 'Đánh tay nhịp nhàng giúp đẩy người tới.', ['Đúng — đánh tay nhịp nhàng giúp đẩy người tới.', 'Sai — khoanh tay không chạy được tốt.', 'Sai — phải đánh tay khi chạy.', 'Sai — đánh tay loạn làm mất nhịp.']),
    Q('Khi chạy em không nên?', ['Thở đều', 'Nhìn xuống đất', 'Nhìn về phía trước', 'Đánh tay'], 1, 'Không nên cúi nhìn xuống đất.', ['Sai — thở đều là điều nên làm.', 'Đúng — không nên cúi nhìn xuống đất khi chạy.', 'Sai — nhìn về phía trước là đúng.', 'Sai — đánh tay là điều nên làm.']),
  ]),

  M(7, 'Bật xa tại chỗ', [
    Q('Bật xa giúp khoẻ?', ['Cơ chân, sức bật', 'Chỉ mặt', 'Chỉ tay', 'Không gì'], 0, 'Khoẻ cơ chân và sức bật.', ['Đúng — bật xa giúp khoẻ cơ chân và sức bật.', 'Sai — bật xa không tác động vào mặt.', 'Sai — bật xa không phải cho tay.', 'Sai — bật xa rất có ích.']),
    Q('Tư thế chuẩn bị?', ['Đứng chụm', 'Đứng một chân', 'Ngồi xổm, hai tay đặt sau lưng', 'Đứng hai chân rộng bằng vai'], 3, 'Hai chân rộng bằng vai.', ['Sai — đứng chụm khó lấy đà bật.', 'Sai — đứng một chân không vững.', 'Sai — tay nên ở phía trước để đánh tạo lực.', 'Đúng — đứng hai chân rộng bằng vai để chuẩn bị bật.']),
    Q('Khi bật?', ['Bật một chân', 'Đứng thẳng bật', 'Khuỵu gối, đánh tay, bật mạnh', 'Bật không khuỵu'], 2, 'Khuỵu gối và đánh tay tạo lực.', ['Sai — bật xa dùng cả hai chân.', 'Sai — đứng thẳng bật thiếu lực.', 'Đúng — khuỵu gối, đánh tay rồi bật mạnh tạo lực.', 'Sai — không khuỵu gối thì bật yếu.']),
    Q('Tiếp đất?', ['Một chân', 'Ngã ngửa', 'Hai chân chùng gối, không ngã', 'Chân thẳng'], 2, 'Chùng gối để hấp thụ lực.', ['Sai — tiếp đất một chân dễ ngã.', 'Sai — ngã ngửa là tiếp đất sai.', 'Đúng — hai chân chùng gối để hấp thụ lực, không ngã.', 'Sai — chân thẳng cứng dễ chấn thương.']),
  ]),

  M(8, 'Bật xa — Luyện tập', [
    Q('Đo bật xa từ?', ['Vạch xuất phát đến gót chân gần nhất', 'Đâu cũng được', 'Đỉnh đầu', 'Mũi chân xa nhất'], 0, 'Đo đến gót chân gần vạch nhất.', ['Đúng — đo từ vạch đến gót chân gần vạch nhất.', 'Sai — phải đo có quy định, không tuỳ tiện.', 'Sai — không đo theo đỉnh đầu.', 'Sai — đo theo gót gần vạch, không phải mũi chân xa.']),
    Q('Để bật xa hơn em cần?', ['Không tập', 'Luyện cơ chân và kĩ thuật', 'Ngủ ngày', 'Ăn nhiều'], 1, 'Luyện cơ và kĩ thuật.', ['Sai — không tập thì không tiến bộ.', 'Đúng — luyện cơ chân và kĩ thuật giúp bật xa hơn.', 'Sai — ngủ ngày không giúp bật xa.', 'Sai — ăn nhiều không làm bật xa hơn.']),
    Q('Bật xa thuộc môn?', ['Thể dục dụng cụ', 'Bóng đá', 'Cờ vua', 'Điền kinh'], 3, 'Bật xa là môn điền kinh.', ['Sai — bật xa không phải thể dục dụng cụ.', 'Sai — bật xa không phải bóng đá.', 'Sai — cờ vua là môn trí tuệ.', 'Đúng — bật xa là một nội dung điền kinh.']),
    Q('Trước khi bật?', ['Ăn nhẹ một quả chuối lấy sức', 'Khởi động chân kĩ', 'Uống nước đá', 'Bật ngay'], 1, 'Khởi động chân kĩ tránh chấn thương.', ['Sai — không cần ăn ngay trước khi bật.', 'Đúng — khởi động chân kĩ để tránh chấn thương.', 'Sai — không uống nước đá trước khi vận động.', 'Sai — bật ngay khi chưa khởi động dễ đau cơ.']),
  ]),

  M(9, 'Nhảy dây — Nhảy tốc độ', [
    Q('Nhảy dây tốc độ là?', ['Đếm 10 cái', 'Nhảy nhanh nhất có thể trong 1 phút', 'Nhảy chậm', 'Nhảy đếm số lần trong 3 phút'], 1, 'Nhảy nhanh tối đa trong 1 phút.', ['Sai — không chỉ đếm 10 cái.', 'Đúng — nhảy nhanh nhất có thể trong 1 phút.', 'Sai — nhảy chậm không phải nhảy tốc độ.', 'Sai — tính trong 1 phút, không phải 3 phút.']),
    Q('Khi nhảy em nên?', ['Nhảy nhẹ trên mũi chân', 'Nhảy 1 chân', 'Nhảy bằng cả bàn chân', 'Dậm gót'], 0, 'Nhảy nhẹ trên mũi chân.', ['Đúng — nhảy nhẹ trên mũi chân cho nhẹ nhàng.', 'Sai — nhảy tốc độ dùng cả hai chân.', 'Sai — đáp cả bàn chân nặng nề.', 'Sai — dậm gót dễ đau chân.']),
    Q('Quay dây?', ['Quay bằng cánh tay', 'Quay vai', 'Không quay', 'Quay bằng cổ tay'], 3, 'Quay bằng cổ tay.', ['Sai — quay cánh tay tốn sức và chậm.', 'Sai — không quay bằng vai.', 'Sai — phải quay dây mới nhảy được.', 'Đúng — quay dây bằng cổ tay cho nhanh, đỡ mỏi.']),
    Q('Để nhảy nhiều cái em cần?', ['Không phối hợp', 'Nhảy nhanh', 'Phối hợp tay-chân nhịp nhàng', 'Nhảy bừa'], 2, 'Tay-chân phối hợp nhịp nhàng.', ['Sai — thiếu phối hợp dễ vướng dây.', 'Sai — nhảy quá nhanh dễ rối nhịp.', 'Đúng — phối hợp tay và chân nhịp nhàng.', 'Sai — nhảy bừa dễ vấp dây.']),
  ]),

  M(10, 'Nhảy dây — Kĩ thuật nâng cao', [
    Q('Nhảy dây 2 chân là?', ['Đổi chân liên tục từng nhịp dây', 'Nhảy 1 chân', 'Nhảy lò cò', 'Nhảy cả 2 chân cùng lúc'], 3, 'Hai chân nhảy cùng lúc.', ['Sai — đổi chân là kiểu khác.', 'Sai — đó là nhảy một chân.', 'Sai — lò cò là nhảy một chân.', 'Đúng — nhảy 2 chân là cả hai chân bật cùng lúc.']),
    Q('Nhảy dây chéo tay?', ['Không tay', 'Tay thẳng', 'Một tay', 'Bắt chéo tay khi quay dây'], 3, 'Bắt chéo tay tạo vòng nhỏ.', ['Sai — vẫn cần dùng tay quay dây.', 'Sai — tay thẳng là nhảy thường.', 'Sai — vẫn dùng cả hai tay để bắt chéo.', 'Đúng — bắt chéo tay khi quay dây tạo vòng nhỏ.']),
    Q('Nhảy dây giúp em?', ['Khoẻ tim mạch, nhanh nhẹn', 'Mệt thêm', 'Không lợi', 'Béo lên'], 0, 'Khoẻ tim mạch và nhanh nhẹn.', ['Đúng — nhảy dây giúp khoẻ tim mạch và nhanh nhẹn.', 'Sai — tập đúng giúp khoẻ chứ không chỉ mệt.', 'Sai — nhảy dây rất có lợi.', 'Sai — nhảy dây không làm béo lên.']),
    Q('Khi mỏi em nên?', ['Đi ngủ', 'Bỏ luôn', 'Nghỉ một chút rồi nhảy tiếp', 'Cố quá sức'], 2, 'Nghỉ ngắn rồi tiếp tục.', ['Sai — không cần đi ngủ khi đang tập.', 'Sai — không bỏ luôn buổi tập.', 'Đúng — nghỉ một chút rồi nhảy tiếp.', 'Sai — cố quá sức dễ chấn thương.']),
  ]),

  M(11, 'Đá cầu — Tâng cầu cá nhân', [
    Q('Đá cầu là môn?', ['Của Pháp', 'Của Mỹ', 'Truyền thống Việt Nam', 'Hiện đại'], 2, 'Đá cầu là môn truyền thống VN.', ['Sai — đá cầu không phải của Pháp.', 'Sai — đá cầu không phải của Mỹ.', 'Đúng — đá cầu là môn truyền thống Việt Nam.', 'Sai — đá cầu có từ lâu đời, không phải mới.']),
    Q('Tâng cầu bằng?', ['Mu bàn chân, đùi, đầu gối', 'Lòng bàn chân (gan bàn chân)', 'Gót chân', 'Cạnh ngoài bàn chân'], 0, 'Mu bàn chân, đùi, đầu gối là chính.', ['Đúng — tâng cầu chính bằng mu bàn chân, đùi, đầu gối.', 'Sai — gan bàn chân khó tâng cầu.', 'Sai — gót chân không dùng để tâng cầu.', 'Sai — cạnh ngoài bàn chân không phải vị trí chính.']),
    Q('Để tâng được nhiều em cần?', ['Tay đánh cầu', 'Mắt nhìn cầu, chân phối hợp', 'Mắt nhắm', 'Quay lưng'], 1, 'Mắt nhìn và chân phối hợp.', ['Sai — không dùng tay đánh cầu khi tâng.', 'Đúng — mắt nhìn cầu và chân phối hợp tốt.', 'Sai — nhắm mắt thì không thấy cầu.', 'Sai — quay lưng thì mất cầu.']),
    Q('Khi tâng em đứng?', ['Cả 2 chân nhảy', 'Trụ 1 chân, chân kia tâng', 'Hai chân chụm sát, tâng bằng đầu gối', 'Đứng kiễng hai gót chân lên'], 1, 'Trụ 1 chân và tâng bằng chân kia.', ['Sai — không cần nhảy bằng cả hai chân.', 'Đúng — trụ một chân, chân kia tâng cầu.', 'Sai — chụm sát hai chân khó tâng.', 'Sai — kiễng hai gót không vững.']),
  ]),

  M(12, 'Đá cầu 3 người', [
    Q('Đá cầu 3 người là?', ['3 người chuyền cầu cho nhau', '2 người đá', '5 người', '1 người tự đá'], 0, '3 người chuyền nhau giữ cầu.', ['Đúng — ba người chuyền cầu cho nhau.', 'Sai — đó là đá cầu 2 người.', 'Sai — không phải 5 người.', 'Sai — đó là tâng cầu cá nhân.']),
    Q('Mục tiêu đá cầu 3 người?', ['Đá ra ngoài', 'Đập cầu', 'Giữ cầu không rơi lâu nhất', 'Đá rơi nhanh'], 2, 'Giữ cầu không rơi.', ['Sai — không nhằm đá cầu ra ngoài.', 'Sai — không phải để đập cầu.', 'Đúng — giữ cầu không rơi càng lâu càng tốt.', 'Sai — không cố đá cho rơi nhanh.']),
    Q('Vị trí 3 người?', ['Hàng ngang', 'Tam giác đều', 'Hàng dọc', 'Lung tung'], 1, 'Tam giác đều dễ chuyền.', ['Sai — hàng ngang khó chuyền cho nhau.', 'Đúng — đứng tam giác đều dễ chuyền cầu.', 'Sai — hàng dọc không tiện chuyền.', 'Sai — đứng lung tung khó phối hợp.']),
    Q('Khi chuyền cầu em nên?', ['Im lặng', 'Báo bạn rồi đá nhẹ', 'Đá mạnh', 'Đá sang chỗ khác'], 1, 'Báo bạn và đá vừa lực.', ['Sai — nên báo bạn để bạn sẵn sàng.', 'Đúng — báo bạn rồi đá nhẹ vừa lực.', 'Sai — đá mạnh quá bạn khó đỡ.', 'Sai — đá sang chỗ khác bạn không đón được.']),
  ]),

  M(13, 'Bóng đá mini — Luật cơ bản', [
    Q('Bóng đá mini có?', ['3 người', '11 người', '20 người', '5-7 người mỗi đội'], 3, 'Bóng đá mini 5-7 người.', ['Sai — mỗi đội nhiều hơn 3 người.', 'Sai — 11 người là bóng đá sân lớn.', 'Sai — không tới 20 người.', 'Đúng — bóng đá mini có 5-7 người mỗi đội.']),
    Q('Mục tiêu bóng đá?', ['Đá ra ngoài', 'Đá vào lưới mình', 'Đưa bóng vào lưới đối thủ', 'Cầm bóng'], 2, 'Đưa bóng vào lưới đối thủ.', ['Sai — đá ra ngoài không ghi bàn.', 'Sai — đá vào lưới mình là phản lưới.', 'Đúng — đưa bóng vào lưới đối thủ để ghi bàn.', 'Sai — cầu thủ không được cầm bóng (trừ thủ môn).']),
    Q('Cầu thủ KHÔNG được dùng?', ['Tay (trừ thủ môn)', 'Đầu (đánh đầu)', 'Chân (đá bóng)', 'Ngực (giữ bóng)'], 0, 'Không dùng tay (trừ thủ môn).', ['Đúng — cầu thủ không được dùng tay, trừ thủ môn.', 'Sai — được đánh đầu.', 'Sai — chân dùng để đá bóng.', 'Sai — được dùng ngực giữ bóng.']),
    Q('Thủ môn là?', ['Người giữ khung thành', 'Tiền đạo', 'Trọng tài', 'Khán giả'], 0, 'Thủ môn giữ khung thành.', ['Đúng — thủ môn là người giữ khung thành.', 'Sai — tiền đạo là người tấn công.', 'Sai — trọng tài điều khiển trận đấu.', 'Sai — khán giả ngồi xem.']),
  ]),

  M(14, 'Bóng đá mini — Luyện tập', [
    Q('Chuyền bóng cho bạn dùng?', ['Lòng trong bàn chân', 'Mu bàn chân (xa)', 'Mũi chân', 'Gót chân'], 0, 'Lòng trong bàn chân chuyền chính xác.', ['Đúng — lòng trong bàn chân chuyền chính xác.', 'Sai — mu bàn chân hợp với sút xa hơn là chuyền ngắn.', 'Sai — mũi chân chuyền dễ lệch.', 'Sai — gót chân chỉ dùng tình huống đặc biệt.']),
    Q('Sút bóng vào gôn dùng?', ['Gót chân (sút giật về sau)', 'Lòng bàn tay đập bóng', 'Mu bàn chân (lực mạnh)', 'Lòng trong'], 2, 'Mu bàn chân sút mạnh.', ['Sai — gót chân sút về sau không vào gôn trước.', 'Sai — không được dùng tay (trừ thủ môn).', 'Đúng — mu bàn chân cho lực sút mạnh.', 'Sai — lòng trong hợp chuyền hơn là sút mạnh.']),
    Q('Tinh thần đồng đội?', ['Chuyền bóng và phối hợp', 'Tự ý mình', 'Bỏ trận', 'Cãi bạn'], 0, 'Chuyền và phối hợp là quan trọng.', ['Đúng — chuyền bóng và phối hợp thể hiện tinh thần đồng đội.', 'Sai — tự ý mình không phải đồng đội.', 'Sai — bỏ trận là thiếu trách nhiệm.', 'Sai — cãi bạn làm mất đoàn kết.']),
    Q('Khi thua trận, em nên?', ['Đổ lỗi cho đồng đội đá kém', 'Cãi trọng tài', 'Đánh nhau', 'Chấp nhận và rút kinh nghiệm'], 3, 'Chấp nhận và rút kinh nghiệm.', ['Sai — không nên đổ lỗi cho đồng đội.', 'Sai — không cãi trọng tài.', 'Sai — đánh nhau là sai.', 'Đúng — chấp nhận thua và rút kinh nghiệm.']),
  ]),

  M(15, 'Bóng rổ mini', [
    Q('Bóng rổ ghi điểm bằng?', ['Đập bóng', 'Ném bóng vào rổ', 'Đá bóng', 'Cầm bóng'], 1, 'Ném bóng vào rổ.', ['Sai — đập bóng là cách dẫn bóng.', 'Đúng — ghi điểm bằng cách ném bóng vào rổ.', 'Sai — bóng rổ không đá bóng.', 'Sai — chỉ cầm bóng không ghi điểm.']),
    Q('Dẫn bóng bóng rổ?', ['Cầm chạy', 'Đập bóng xuống sàn', 'Đá bóng', 'Tung bóng'], 1, 'Đập bóng xuống sàn (dribble).', ['Sai — cầm bóng chạy là phạm luật.', 'Đúng — dẫn bóng là đập bóng xuống sàn (dribble).', 'Sai — không đá bóng trong bóng rổ.', 'Sai — tung bóng không phải dẫn bóng.']),
    Q('Khi ném rổ em dùng?', ['Chân (đá bóng vào rổ)', 'Hai tay hoặc một tay đẩy bóng', 'Vai (hích bóng vào rổ)', 'Đầu (đánh đầu vào rổ)'], 1, 'Hai tay hoặc một tay đẩy.', ['Sai — không đá bóng vào rổ.', 'Đúng — ném rổ dùng hai tay hoặc một tay đẩy bóng.', 'Sai — không dùng vai hích bóng.', 'Sai — không đánh đầu vào rổ.']),
    Q('Số người mỗi đội bóng rổ?', ['7 người', '3 người', '5 người', '11 người'], 2, 'Mỗi đội bóng rổ 5 người chính.', ['Sai — không phải 7 người.', 'Sai — 3 người là bóng rổ 3x3.', 'Đúng — mỗi đội bóng rổ có 5 người chính.', 'Sai — 11 người là bóng đá.']),
  ]),

  M(16, 'Cầu lông đôi', [
    Q('Cầu lông đôi là?', ['5 đánh 5', '2 người đánh 2 người', '1 đánh 1', '3 đánh 3'], 1, 'Đôi là 2 người đánh 2 người.', ['Sai — cầu lông không đánh 5 đánh 5.', 'Đúng — đánh đôi là 2 người đánh 2 người.', 'Sai — 1 đánh 1 là đánh đơn.', 'Sai — không có thể thức 3 đánh 3.']),
    Q('Cầu lông dùng?', ['Gậy và bóng nhỏ', 'Vợt và quả cầu lông', 'Vợt và bóng', 'Tay không và quả cầu lông'], 1, 'Vợt và quả cầu lông.', ['Sai — không dùng gậy và bóng.', 'Đúng — cầu lông dùng vợt và quả cầu lông.', 'Sai — không đánh bóng mà đánh quả cầu.', 'Sai — phải dùng vợt, không đánh tay không.']),
    Q('Khi đánh đôi em cần?', ['Tự đánh', 'Bỏ bạn', 'Phối hợp với bạn cùng cặp', 'Cãi nhau'], 2, 'Phối hợp với cặp đôi.', ['Sai — đánh đôi không tự đánh một mình.', 'Sai — không bỏ rơi bạn cùng cặp.', 'Đúng — cần phối hợp với bạn cùng cặp.', 'Sai — cãi nhau làm mất phối hợp.']),
    Q('Vợt cầu lông cầm?', ['Như cầm tay bắt tay', 'Như cầm dao', 'Như cầm bút', 'Như cầm búa'], 0, 'Cầm vợt như bắt tay.', ['Đúng — cầm vợt cầu lông như bắt tay.', 'Sai — không cầm như cầm dao.', 'Sai — không cầm như cầm bút.', 'Sai — không cầm như cầm búa.']),
  ]),

  M(17, 'Ôn tập cuối HK1', [
    Q('HK1 em đã học những môn nào?', ['Chỉ chạy', 'Không gì', 'Chỉ thể dục', 'Thể dục liên hoàn, chạy, bật xa, đá cầu, bóng đá…'], 3, 'Nhiều nội dung HK1.', ['Sai — không chỉ học chạy.', 'Sai — đã học rất nhiều nội dung.', 'Sai — không chỉ riêng thể dục.', 'Đúng — HK1 học nhiều môn: thể dục liên hoàn, chạy, bật xa, đá cầu, bóng đá…']),
    Q('Để khoẻ em cần?', ['Ngủ nhiều', 'Ăn nhiều', 'Không tập', 'Tập thể dục đều đặn'], 3, 'Tập thể dục đều đặn.', ['Sai — ngủ nhiều một mình chưa đủ khoẻ.', 'Sai — ăn nhiều không phải cách giữ sức khoẻ.', 'Sai — không tập thì không khoẻ.', 'Đúng — tập thể dục đều đặn giúp khoẻ mạnh.']),
    Q('Trước khi tập luôn phải?', ['Tập ngay động tác khó nhất', 'Khởi động', 'Bỏ qua', 'Uống nước đá'], 1, 'Khởi động trước khi tập.', ['Sai — không vào ngay động tác khó.', 'Đúng — phải khởi động trước khi tập.', 'Sai — không bỏ qua bước khởi động.', 'Sai — không uống nước đá trước khi tập.']),
    Q('Sau tập phải?', ['Tắm lạnh', 'Thả lỏng và hồi phục', 'Ngồi luôn', 'Uống nước đá'], 1, 'Thả lỏng và hồi phục.', ['Sai — không tắm lạnh ngay sau tập.', 'Đúng — sau tập cần thả lỏng và hồi phục.', 'Sai — không ngồi luôn khi tim còn đập nhanh.', 'Sai — không uống nước đá ngay sau tập.']),
  ]),

  M(18, 'Kiểm tra HK1', [
    Q('Khi kiểm tra em nên?', ['Cãi cô', 'Run và bỏ giữa các động tác', 'Tự tin, làm hết khả năng', 'Bỏ cuộc'], 2, 'Tự tin và cố gắng hết sức.', ['Sai — không cãi cô khi kiểm tra.', 'Sai — không nên run và bỏ giữa chừng.', 'Đúng — tự tin và làm hết khả năng.', 'Sai — không bỏ cuộc.']),
    Q('Khi thua bạn em nên?', ['Cãi trọng tài đã xử ép mình', 'Khóc trước mặt cả lớp', 'Bỏ về không bắt tay bạn', 'Chúc mừng bạn và cố gắng'], 3, 'Tinh thần thể thao là chúc mừng.', ['Sai — không cãi trọng tài.', 'Sai — không khóc trách móc khi thua.', 'Sai — nên bắt tay chúc mừng bạn.', 'Đúng — chúc mừng bạn và tiếp tục cố gắng.']),
    Q('Đánh giá thể chất gồm?', ['Chỉ chiều cao', 'Chỉ sức mạnh', 'Sức bền, sức mạnh, nhanh nhẹn', 'Chỉ cân nặng'], 2, 'Sức bền, sức mạnh, nhanh nhẹn.', ['Sai — không chỉ đo chiều cao.', 'Sai — không chỉ riêng sức mạnh.', 'Đúng — đánh giá gồm sức bền, sức mạnh, nhanh nhẹn.', 'Sai — không chỉ đo cân nặng.']),
    Q('Để tiến bộ?', ['Không tập', 'Luyện tập đều và đúng kĩ thuật', 'Tập quá sức', 'Tập ngẫu hứng'], 1, 'Đều đặn và đúng kĩ thuật.', ['Sai — không tập thì không tiến bộ.', 'Đúng — luyện tập đều và đúng kĩ thuật.', 'Sai — tập quá sức dễ chấn thương.', 'Sai — tập ngẫu hứng không đều khó tiến bộ.']),
  ]),

  // ──────────────── HK2 ────────────────
  M(19, 'Đi bộ thể thao', [
    Q('Đi bộ thể thao khác đi bộ thường?', ['Đi lùi', 'Đi nghiêng', 'Đi chậm', 'Đi nhanh, có kỹ thuật'], 3, 'Đi nhanh và có kỹ thuật.', ['Sai — đi bộ thể thao không phải đi lùi.', 'Sai — không phải đi nghiêng.', 'Sai — đi bộ thể thao không chậm.', 'Đúng — đi nhanh và có kỹ thuật, khác đi bộ thường.']),
    Q('Khi đi bộ thể thao em?', ['Đánh tay, bước dài hơn', 'Khoanh tay', 'Bước rất ngắn', 'Lệch người'], 0, 'Đánh tay và bước dài hơn bình thường.', ['Đúng — đánh tay và bước dài hơn bình thường.', 'Sai — khoanh tay làm mất nhịp.', 'Sai — bước quá ngắn đi chậm.', 'Sai — lệch người dễ mỏi và sai kĩ thuật.']),
    Q('Đi bộ thể thao có quy định?', ['Không quy định', 'Hai chân rời đất', 'Luôn có 1 chân chạm đất', 'Một chân duy nhất'], 2, 'Luôn có ít nhất 1 chân chạm đất.', ['Sai — đi bộ thể thao có quy định riêng.', 'Sai — hai chân rời đất là chạy, không phải đi bộ.', 'Đúng — luôn có ít nhất một chân chạm đất.', 'Sai — không đi chỉ bằng một chân.']),
    Q('Đi bộ thể thao tốt cho?', ['Thính giác và khả năng nghe xa', 'Tim mạch và xương khớp', 'Men răng và lợi', 'Thị lực và khả năng nhìn xa'], 1, 'Tốt cho tim mạch và xương khớp.', ['Sai — đi bộ không liên quan thính giác.', 'Đúng — đi bộ thể thao tốt cho tim mạch và xương khớp.', 'Sai — không liên quan men răng.', 'Sai — không liên quan thị lực.']),
  ]),

  M(20, 'Bơi sải — Bước cơ bản (mô phỏng)', [
    Q('Bơi sải là?', ['Bơi đứng', 'Bơi ếch', 'Kiểu bơi nhanh nhất', 'Bơi chậm nhất'], 2, 'Bơi sải (crawl) là nhanh nhất.', ['Sai — bơi sải không phải bơi đứng.', 'Sai — bơi ếch là kiểu khác.', 'Đúng — bơi sải (crawl) là kiểu bơi nhanh nhất.', 'Sai — bơi sải là nhanh nhất, không chậm.']),
    Q('Khi bơi sải tay?', ['Hai tay cùng vẫy', 'Khoanh tay', 'Vẫy luân phiên trên không và dưới nước', 'Không vẫy'], 2, 'Tay vẫy luân phiên.', ['Sai — bơi sải không vẫy hai tay cùng lúc.', 'Sai — không khoanh tay khi bơi.', 'Đúng — hai tay vẫy luân phiên trên không và dưới nước.', 'Sai — phải vẫy tay mới tiến lên.']),
    Q('Khi bơi sải chân?', ['Đạp ếch', 'Đập chân lên xuống liên tục', 'Không đập', 'Co chân'], 1, 'Đập chân lên xuống.', ['Sai — đạp ếch là kiểu bơi ếch.', 'Đúng — đập chân lên xuống liên tục.', 'Sai — phải đập chân để tiến tới.', 'Sai — co chân là động tác bơi ếch.']),
    Q('Thở khi bơi sải?', ['Thở dồn', 'Há mồm hít trong nước', 'Nghiêng đầu hít vào - úp mặt thở ra', 'Không thở'], 2, 'Nghiêng hít - úp thở.', ['Sai — không thở dồn khi bơi.', 'Sai — không há mồm hít trong nước (dễ sặc).', 'Đúng — nghiêng đầu hít vào, úp mặt thở ra.', 'Sai — phải thở đúng nhịp, không nín hoàn toàn.']),
  ]),

  M(21, 'An toàn dưới nước', [
    Q('Trước khi bơi cần?', ['Ăn no rồi xuống bể bơi luôn', 'Khởi động và đi vệ sinh', 'Bỏ qua', 'Uống nước'], 1, 'Khởi động và đi vệ sinh trước.', ['Sai — không xuống nước ngay khi vừa ăn no.', 'Đúng — cần khởi động và đi vệ sinh trước khi bơi.', 'Sai — không bỏ qua chuẩn bị trước khi bơi.', 'Sai — uống nước thôi chưa đủ, cần khởi động.']),
    Q('Khi xuống nước em phải?', ['Lén lút', 'Có người lớn giám sát', 'Không cần', 'Đi một mình'], 1, 'Phải có người lớn giám sát.', ['Sai — không lén lút xuống nước.', 'Đúng — phải có người lớn giám sát.', 'Sai — bơi cần có người trông coi.', 'Sai — không đi bơi một mình.']),
    Q('Nếu bị chuột rút em nên?', ['Bình tĩnh, gọi cứu hộ', 'Hoảng loạn', 'Im lặng chìm', 'Vẫy nước'], 0, 'Bình tĩnh và gọi cứu hộ.', ['Đúng — bình tĩnh và gọi cứu hộ giúp đỡ.', 'Sai — hoảng loạn càng nguy hiểm.', 'Sai — im lặng chìm rất nguy hiểm.', 'Sai — vẫy nước loạn không hiệu quả bằng gọi cứu hộ.']),
    Q('Em KHÔNG nên?', ['Bơi nơi an toàn có giám sát', 'Bơi với áo phao', 'Bơi sau khi khởi động', 'Bơi nơi ao hồ sâu một mình'], 3, 'Không bơi nơi sâu một mình.', ['Sai — bơi nơi an toàn có giám sát là điều nên làm.', 'Sai — bơi với áo phao là an toàn.', 'Sai — bơi sau khi khởi động là đúng.', 'Đúng — không nên bơi nơi ao hồ sâu một mình.']),
  ]),

  M(22, 'Kéo co tập thể', [
    Q('Kéo co là?', ['Trò 1 người', 'Đua chạy', 'Đẩy cây', 'Trò chơi đồng đội kéo dây'], 3, 'Kéo co là trò chơi tập thể.', ['Sai — kéo co cần nhiều người.', 'Sai — kéo co không phải đua chạy.', 'Sai — kéo co là kéo chứ không đẩy.', 'Đúng — kéo co là trò chơi đồng đội kéo dây.']),
    Q('Mục tiêu kéo co?', ['Cãi nhau', 'Bỏ cuộc', 'Ngồi xuống', 'Kéo đối thủ qua vạch'], 3, 'Kéo đối thủ qua vạch.', ['Sai — không phải để cãi nhau.', 'Sai — không bỏ cuộc.', 'Sai — không phải để ngồi xuống.', 'Đúng — mục tiêu là kéo đối thủ qua vạch.']),
    Q('Khi kéo em nên?', ['Mỗi bạn tự kéo theo nhịp của mình', 'Đồng lòng, dùng cả lực chân', 'Cười đùa', 'Buông dây'], 1, 'Đồng lòng và dùng lực chân.', ['Sai — mỗi người một nhịp sẽ mất lực.', 'Đúng — cả đội đồng lòng và dùng cả lực chân.', 'Sai — cười đùa làm mất tập trung.', 'Sai — buông dây là bỏ cuộc.']),
    Q('Tư thế kéo?', ['Ngồi xổm, hai tay nắm dây', 'Nằm sấp, kẹp dây dưới nách', 'Chân trước-sau, ngả người', 'Đứng thẳng'], 2, 'Chân trước-sau và ngả người.', ['Sai — ngồi xổm không tạo được lực kéo.', 'Sai — nằm sấp kẹp dây là sai tư thế.', 'Đúng — đặt chân trước-sau và ngả người để kéo.', 'Sai — đứng thẳng không tận dụng được lực.']),
  ]),

  M(23, 'Trò chơi vận động — "Mèo đuổi chuột"', [
    Q('Trò chơi này giúp?', ['Không lợi', 'Mệt thêm', 'Giảm khả năng phản xạ', 'Nhanh nhẹn và đoàn kết'], 3, 'Nhanh nhẹn và đoàn kết.', ['Sai — trò chơi này rất có lợi.', 'Sai — chơi đúng giúp khoẻ chứ không chỉ mệt.', 'Sai — trò chơi tăng phản xạ chứ không giảm.', 'Đúng — giúp nhanh nhẹn và đoàn kết.']),
    Q('Khi chơi em nên?', ['Tuân thủ luật chơi', 'Đánh bạn', 'Phá luật', 'Bỏ giữa'], 0, 'Tuân thủ luật chơi.', ['Đúng — cần tuân thủ luật chơi.', 'Sai — không đánh bạn.', 'Sai — không phá luật.', 'Sai — không bỏ giữa chừng.']),
    Q('Khi thua em nên?', ['Vui vẻ chơi tiếp', 'Cãi rằng mình không bị bắt', 'Khóc và không chơi nữa', 'Bỏ về giữa giờ ra chơi'], 0, 'Vui vẻ chơi tiếp.', ['Đúng — vui vẻ chơi tiếp là tinh thần thể thao.', 'Sai — không cãi để chối thua.', 'Sai — không khóc và bỏ chơi.', 'Sai — không bỏ về giữa chừng.']),
    Q('Trò chơi vận động là?', ['Xem TV', 'Đọc sách', 'Trò chơi có hoạt động cơ thể', 'Trò ngồi'], 2, 'Có hoạt động cơ thể.', ['Sai — xem TV không phải trò vận động.', 'Sai — đọc sách là hoạt động tĩnh.', 'Đúng — trò chơi vận động có hoạt động cơ thể.', 'Sai — trò ngồi yên không phải vận động.']),
  ]),

  M(24, 'Đá cầu — Thi đấu', [
    Q('Sân đá cầu?', ['Sân hình tròn không chia bên', 'Có lưới chia 2 bên', 'Hình tròn', 'Không lưới'], 1, 'Có lưới chia đôi sân.', ['Sai — sân đá cầu không phải hình tròn.', 'Đúng — sân đá cầu có lưới chia hai bên.', 'Sai — sân không phải hình tròn.', 'Sai — sân thi đấu có lưới.']),
    Q('Phát cầu em?', ['Tung cầu và đá qua lưới', 'Ném tay', 'Cầm tay', 'Đá vào lưới mình'], 0, 'Tung cầu rồi đá qua lưới.', ['Đúng — tung cầu rồi đá qua lưới sang sân đối thủ.', 'Sai — không ném cầu bằng tay.', 'Sai — không cầm cầu khi phát.', 'Sai — phải đá sang sân đối thủ, không vào lưới mình.']),
    Q('Khi đối thủ phát cầu em?', ['Cãi rằng đối thủ phát sai luật', 'Bỏ qua', 'Bắt tay', 'Đỡ và đá trả qua lưới'], 3, 'Đỡ và đá trả qua lưới.', ['Sai — không cãi vô cớ.', 'Sai — không bỏ mặc cầu.', 'Sai — không bắt cầu bằng tay.', 'Đúng — đỡ cầu và đá trả qua lưới.']),
    Q('Tinh thần thi đấu?', ['Bỏ thua', 'Cãi vã', 'Fair-play, tôn trọng đối thủ', 'Chơi xấu'], 2, 'Fair-play và tôn trọng đối thủ.', ['Sai — không bỏ cuộc giữa chừng.', 'Sai — cãi vã là thiếu fair-play.', 'Đúng — fair-play và tôn trọng đối thủ.', 'Sai — chơi xấu là sai tinh thần thể thao.']),
  ]),

  M(25, 'Bóng đá mini — Thi đấu', [
    Q('Đá bóng phải biết?', ['Chỉ chạy', 'Chỉ đá mạnh', 'Chuyền, sút, dẫn bóng', 'Không cần kĩ thuật'], 2, 'Chuyền, sút, dẫn bóng là cơ bản.', ['Sai — chỉ chạy là chưa đủ.', 'Sai — đá mạnh thôi chưa đủ kĩ thuật.', 'Đúng — cần biết chuyền, sút, dẫn bóng.', 'Sai — đá bóng rất cần kĩ thuật.']),
    Q('Khi mất bóng em nên?', ['Cãi trọng tài', 'Đứng yên', 'Bỏ vị trí về sân nhà chờ bóng', 'Truy cản và cướp lại'], 3, 'Truy cản và cướp lại.', ['Sai — không cãi trọng tài.', 'Sai — đứng yên là buông xuôi.', 'Sai — không bỏ vị trí chờ bóng.', 'Đúng — truy cản và cố cướp lại bóng.']),
    Q('Hành vi xấu trong bóng đá?', ['Cản phá', 'Sút bóng', 'Đánh đối thủ, cãi trọng tài', 'Chuyền bóng'], 2, 'Đánh đối thủ là hành vi xấu.', ['Sai — cản phá đúng luật là bình thường.', 'Sai — sút bóng là kĩ thuật cơ bản.', 'Đúng — đánh đối thủ và cãi trọng tài là hành vi xấu.', 'Sai — chuyền bóng là điều nên làm.']),
    Q('Sau trận em nên?', ['Bỏ về luôn', 'Bắt tay đối thủ', 'Đánh nhau', 'Cãi với trọng tài về tỉ số'], 1, 'Bắt tay là tinh thần thể thao.', ['Sai — không bỏ về ngay.', 'Đúng — bắt tay đối thủ thể hiện tinh thần thể thao.', 'Sai — không đánh nhau.', 'Sai — không cãi trọng tài về tỉ số.']),
  ]),

  M(26, 'Bóng rổ — Ném rổ', [
    Q('Ném rổ phía xa nên?', ['Đập bóng xuống đất rồi ném lên', 'Một tay', 'Đá bóng cao vào rổ', 'Hai tay đẩy trên ngực'], 3, 'Hai tay đẩy ngực cho lực ổn định.', ['Sai — đập bóng rồi ném không tạo lực xa.', 'Sai — một tay khó đủ lực ở xa.', 'Sai — không đá bóng vào rổ.', 'Đúng — hai tay đẩy trên ngực cho lực ổn định khi ném xa.']),
    Q('Ném rổ gần nên?', ['Hai tay mạnh', 'Đập bóng xuống sàn bật lên rổ', 'Một tay đẩy bóng nhẹ', 'Đá nhẹ bóng vào rổ'], 2, 'Một tay nhẹ khi gần rổ.', ['Sai — gần rổ không cần dùng lực hai tay mạnh.', 'Sai — đập bóng bật lên rổ không phải kĩ thuật ném.', 'Đúng — gần rổ thì một tay đẩy bóng nhẹ.', 'Sai — không đá bóng vào rổ.']),
    Q('Khi ném em phải?', ['Nhắm mắt', 'Nhìn bạn', 'Nhìn bóng', 'Nhìn vào rổ'], 3, 'Nhìn vào rổ để định hướng.', ['Sai — nhắm mắt thì không định hướng được.', 'Sai — nhìn bạn không giúp ném trúng.', 'Sai — nhìn bóng không định hướng được rổ.', 'Đúng — nhìn vào rổ để định hướng ném.']),
    Q('Bóng vào rổ em được?', ['10 điểm', '100 điểm', 'Không điểm', '1-2-3 điểm tuỳ vị trí'], 3, '1-2-3 điểm tuỳ vị trí ném.', ['Sai — không phải 10 điểm.', 'Sai — không phải 100 điểm.', 'Sai — vào rổ được tính điểm.', 'Đúng — được 1-2-3 điểm tuỳ vị trí ném.']),
  ]),

  M(27, 'Cầu lông — Đánh đôi', [
    Q('Khi đánh đôi cần?', ['Lấn sân', 'Phối hợp di chuyển với bạn', 'Cãi nhau', 'Tự đánh'], 1, 'Phối hợp di chuyển.', ['Sai — lấn sân làm rối vị trí.', 'Đúng — cần phối hợp di chuyển với bạn cùng đôi.', 'Sai — cãi nhau làm mất phối hợp.', 'Sai — không tự đánh một mình khi đánh đôi.']),
    Q('Vị trí cơ bản đôi?', ['Cùng một chỗ', 'Ngoài sân', 'Trên-dưới hoặc trái-phải', 'Lung tung'], 2, 'Trên-dưới hoặc trái-phải.', ['Sai — đứng cùng một chỗ bỏ trống sân.', 'Sai — không đứng ngoài sân.', 'Đúng — chia vị trí trên-dưới hoặc trái-phải.', 'Sai — đứng lung tung khó phối hợp.']),
    Q('Khi bạn đánh em?', ['Sẵn sàng vị trí hỗ trợ', 'Bỏ chạy', 'Đứng yên', 'Cãi nhau với bạn cùng đôi'], 0, 'Sẵn sàng hỗ trợ.', ['Đúng — sẵn sàng vào vị trí hỗ trợ bạn.', 'Sai — không bỏ chạy.', 'Sai — đứng yên không hỗ trợ được.', 'Sai — không cãi nhau với bạn cùng đôi.']),
    Q('Sau trận em?', ['Bỏ về không thu dọn vợt', 'Bắt tay đối thủ và đồng đội', 'Không bắt tay', 'Cãi với đồng đội vì lỗi cuối trận'], 1, 'Bắt tay là phép lịch sự thể thao.', ['Sai — nên thu dọn vợt gọn gàng.', 'Đúng — bắt tay đối thủ và đồng đội là phép lịch sự thể thao.', 'Sai — nên bắt tay sau trận.', 'Sai — không cãi đồng đội về lỗi cuối trận.']),
  ]),

  M(28, 'Nhảy dây nhóm', [
    Q('Nhảy dây nhóm là?', ['2 người', 'Không có dây', '1 người nhảy', 'Nhiều người nhảy chung 1 dây dài'], 3, 'Nhiều người chung 1 dây dài.', ['Sai — nhảy dây nhóm thường nhiều hơn 2 người.', 'Sai — vẫn cần một dây dài.', 'Sai — đó là nhảy dây cá nhân.', 'Đúng — nhiều người nhảy chung một dây dài.']),
    Q('Hai bạn cầm dây cần?', ['Quay loạn', 'Quay nhanh quá', 'Quay đều và nhịp nhàng', 'Không quay'], 2, 'Đều và nhịp nhàng.', ['Sai — quay loạn khiến bạn khó nhảy.', 'Sai — quay nhanh quá làm vướng dây.', 'Đúng — quay đều và nhịp nhàng để bạn nhảy được.', 'Sai — phải quay dây mới nhảy được.']),
    Q('Người nhảy nên?', ['Đứng ngoài vung dây thay người quay', 'Vào đúng nhịp', 'Đứng yên', 'Vào bất kì lúc nào'], 1, 'Vào đúng nhịp dây.', ['Sai — người nhảy không thay người quay tuỳ ý.', 'Đúng — vào nhảy đúng nhịp dây.', 'Sai — đứng yên thì không nhảy được.', 'Sai — vào sai nhịp dễ vướng dây.']),
    Q('Nhảy dây nhóm rèn?', ['Sự ích kỉ', 'Tinh thần cá nhân', 'Tinh thần đồng đội', 'Cô độc'], 2, 'Tinh thần đồng đội.', ['Sai — không rèn sự ích kỉ.', 'Sai — không phải tinh thần cá nhân.', 'Đúng — nhảy dây nhóm rèn tinh thần đồng đội.', 'Sai — chơi cùng nhau nên không cô độc.']),
  ]),

  M(29, 'Trò chơi vận động dân gian', [
    Q('Trò "Bịt mắt bắt dê" là?', ['Trò mới', 'Trò phương Tây', 'Trò dân gian VN', 'Trò chơi của Trung Quốc'], 2, 'Trò dân gian Việt Nam.', ['Sai — đây là trò có từ lâu đời.', 'Sai — không phải trò phương Tây.', 'Đúng — Bịt mắt bắt dê là trò dân gian Việt Nam.', 'Sai — không phải trò của Trung Quốc.']),
    Q('Trò "Rồng rắn lên mây" là?', ['Hàn Quốc', 'Dân gian VN', 'Nước Mỹ', 'Nhật Bản'], 1, 'Trò dân gian VN.', ['Sai — không phải của Hàn Quốc.', 'Đúng — Rồng rắn lên mây là trò dân gian Việt Nam.', 'Sai — không phải của nước Mỹ.', 'Sai — không phải của Nhật Bản.']),
    Q('Lợi ích trò chơi dân gian?', ['Vui và gắn bó văn hoá', 'Chỉ tốn thời gian học bài', 'Dễ bị thương vì luật đã cũ', 'Làm mất hứng học tập của bạn'], 0, 'Vui và giữ văn hoá.', ['Đúng — vui và gắn bó với văn hoá dân tộc.', 'Sai — chơi điều độ không hề tốn thời gian học.', 'Sai — chơi đúng luật vẫn an toàn.', 'Sai — chơi vui giúp tinh thần thoải mái hơn.']),
    Q('Em chơi trò dân gian em cần?', ['Chơi xấu', 'Đoàn kết và đúng luật', 'Bỏ giữa', 'Tự đổi luật chơi theo ý mình'], 1, 'Đoàn kết và đúng luật.', ['Sai — không chơi xấu.', 'Đúng — cần đoàn kết và chơi đúng luật.', 'Sai — không bỏ giữa chừng.', 'Sai — không tự đổi luật theo ý mình.']),
  ]),

  M(30, 'Chạy bền 400m', [
    Q('Chạy bền 400m yêu cầu?', ['Sức bền, phân phối sức', 'Chạy nhanh hết sức', 'Đi bộ nhanh và đi đều đến đích', 'Bỏ giữa'], 0, 'Sức bền và phân phối sức.', ['Đúng — chạy bền cần sức bền và biết phân phối sức.', 'Sai — chạy hết sức ngay sẽ kiệt sức sớm.', 'Sai — đi bộ không phải chạy bền.', 'Sai — không bỏ giữa chừng.']),
    Q('Khi chạy bền em nên?', ['Đi bộ nhanh xen kẽ chạy nước rút', 'Chạy hết tốc', 'Chạy đều, thở đều', 'Chạy chậm'], 2, 'Chạy đều và thở đều.', ['Sai — đi xen kẽ rút sức làm mất nhịp.', 'Sai — chạy hết tốc dễ kiệt sức.', 'Đúng — chạy đều và thở đều để giữ sức bền.', 'Sai — chạy quá chậm không đạt yêu cầu.']),
    Q('Thở khi chạy bền?', ['Há mồm hít', 'Hít bằng mũi, thở bằng miệng', 'Không thở', 'Nín thở'], 1, 'Hít mũi - thở miệng.', ['Sai — há mồm hít dễ khô họng, mất sức.', 'Đúng — hít bằng mũi và thở bằng miệng.', 'Sai — phải thở đều khi chạy.', 'Sai — không nín thở khi chạy bền.']),
    Q('Khi mệt em nên?', ['Cố chạy hết tốc lực đến đích', 'Ngồi xuống', 'Giảm tốc nhưng không dừng', 'Dừng ngay'], 2, 'Giảm tốc nhưng vẫn chạy.', ['Sai — cố hết tốc khi mệt dễ kiệt sức.', 'Sai — ngồi xuống là dừng cuộc.', 'Đúng — giảm tốc nhưng không dừng để giữ nhịp.', 'Sai — dừng ngay là bỏ cuộc.']),
  ]),

  M(31, 'Bài thể dục liên hoàn — Ôn tập', [
    Q('Ôn 10 động tác cần?', ['Bỏ giữa', 'Nhớ thứ tự và đúng nhịp', 'Tập theo nhịp riêng của mỗi bạn', 'Đổi thứ tự'], 1, 'Nhớ thứ tự và đúng nhịp.', ['Sai — không bỏ giữa bài.', 'Đúng — cần nhớ đúng thứ tự và đúng nhịp.', 'Sai — cả lớp tập chung một nhịp hô.', 'Sai — không tự đổi thứ tự động tác.']),
    Q('Tập đều mỗi sáng giúp?', ['Mệt thêm', 'Giảm chiều cao do tập nặng', 'Tăng cân nhanh do ăn nhiều hơn', 'Khoẻ, tinh thần tốt'], 3, 'Khoẻ và tinh thần tốt.', ['Sai — tập đúng giúp khoẻ chứ không chỉ mệt.', 'Sai — tập thể dục không làm giảm chiều cao.', 'Sai — tập thể dục không làm tăng cân nhanh.', 'Đúng — tập đều mỗi sáng giúp khoẻ và tinh thần tốt.']),
    Q('Khi tập sai em?', ['Đổ lỗi', 'Bỏ luôn', 'Sửa lại, không nản', 'Cãi cô'], 2, 'Sửa lại và không nản.', ['Sai — không đổ lỗi.', 'Sai — không bỏ luôn buổi tập.', 'Đúng — sửa lại và không nản chí.', 'Sai — không cãi cô.']),
    Q('Lên cấp 2 em vẫn nên?', ['Tập thể dục đều', 'Chỉ tập khi nào có giờ thể dục', 'Bỏ tập', 'Không quan tâm'], 0, 'Tập thể dục cả đời.', ['Đúng — lên cấp 2 vẫn nên tập thể dục đều.', 'Sai — nên tập đều, không chỉ trong giờ thể dục.', 'Sai — không bỏ tập.', 'Sai — sức khoẻ luôn cần quan tâm.']),
  ]),

  M(32, 'Đá cầu — Kiểm tra kĩ thuật', [
    Q('Kiểm tra tâng cầu?', ['Đếm số lần liên tục không rơi', 'Đá ra ngoài', 'Đá nhanh nhất', 'Đá xa nhất'], 0, 'Số lần liên tục không rơi.', ['Đúng — đếm số lần tâng liên tục không để cầu rơi.', 'Sai — không đá cầu ra ngoài.', 'Sai — không tính theo tốc độ.', 'Sai — không tính theo khoảng cách xa.']),
    Q('Để tâng nhiều?', ['Lực vừa, mắt nhìn cầu', 'Quay đầu', 'Mắt nhắm', 'Lực mạnh'], 0, 'Lực vừa và mắt nhìn.', ['Đúng — dùng lực vừa và mắt luôn nhìn cầu.', 'Sai — quay đầu sẽ mất cầu.', 'Sai — nhắm mắt thì không thấy cầu.', 'Sai — lực mạnh khiến cầu bay xa, khó tâng tiếp.']),
    Q('Khi cầu rơi em?', ['Đá vào bạn', 'Bỏ cuộc', 'Nhặt lên và tâng tiếp', 'Đổ lỗi cho bạn phát cầu quá mạnh'], 2, 'Nhặt lên và tiếp tục.', ['Sai — không đá cầu vào bạn.', 'Sai — không bỏ cuộc.', 'Đúng — nhặt cầu lên và tâng tiếp.', 'Sai — không đổ lỗi cho bạn.']),
    Q('Đá cầu giúp em?', ['Làm chân nhanh bị to ra', 'Chỉ giúp giải trí, không tập luyện', 'Khéo léo và khoẻ chân', 'Làm chậm phản xạ tay'], 2, 'Khéo léo và khoẻ chân.', ['Sai — đá cầu không làm chân to ra.', 'Sai — đá cầu vừa giải trí vừa rèn luyện.', 'Đúng — đá cầu giúp khéo léo và khoẻ chân.', 'Sai — đá cầu giúp phản xạ nhanh hơn.']),
  ]),

  M(33, 'Bóng đá - bóng rổ — Thi đấu giao hữu', [
    Q('Giao hữu là?', ['Thi đấu giao lưu, không quá căng thẳng', 'Cãi nhau', 'Đấu giải', 'Đấu loại'], 0, 'Giao lưu nhẹ nhàng.', ['Đúng — giao hữu là thi đấu giao lưu, không quá căng thẳng.', 'Sai — giao hữu không phải để cãi nhau.', 'Sai — đấu giải khác với giao hữu.', 'Sai — đấu loại căng thẳng hơn giao hữu.']),
    Q('Tinh thần giao hữu?', ['Chơi xấu', 'Đánh nhau', 'Vui, học hỏi, kết bạn', 'Tranh cãi tỉ số với đối thủ'], 2, 'Vui và kết bạn.', ['Sai — không chơi xấu.', 'Sai — không đánh nhau.', 'Đúng — giao hữu để vui, học hỏi và kết bạn.', 'Sai — không tranh cãi tỉ số.']),
    Q('Khi thắng em nên?', ['Khinh thường', 'Khiêm tốn, không chế giễu', 'Chế giễu', 'Khoe khoang'], 1, 'Khiêm tốn không chế giễu.', ['Sai — không khinh thường đối thủ.', 'Đúng — thắng thì khiêm tốn, không chế giễu.', 'Sai — không chế giễu người thua.', 'Sai — không khoe khoang.']),
    Q('Khi thua em nên?', ['Học hỏi điểm tốt của đối thủ', 'Bỏ về không bắt tay bạn', 'Cãi rằng mình đã chạm trước', 'Đánh nhau'], 0, 'Học hỏi từ đối thủ.', ['Đúng — học hỏi điểm tốt của đối thủ.', 'Sai — nên bắt tay bạn.', 'Sai — không cãi để chối thua.', 'Sai — không đánh nhau.']),
  ]),

  M(34, 'Tổng ôn cuối năm', [
    Q('Cả năm em học những môn?', ['Chỉ bóng', 'Thể dục, chạy, bật, nhảy dây, đá cầu, bóng đá, bóng rổ, cầu lông, kéo co, bơi', 'Chỉ học môn bóng và môn chạy', 'Chỉ chạy'], 1, 'Rất nhiều môn thể thao.', ['Sai — không chỉ học môn bóng.', 'Đúng — học rất nhiều môn: thể dục, chạy, bật, nhảy dây, đá cầu, bóng đá, bóng rổ, cầu lông, kéo co, bơi.', 'Sai — học nhiều hơn bóng và chạy.', 'Sai — không chỉ học chạy.']),
    Q('Để khoẻ suốt đời em cần?', ['Chỉ ngủ', 'Không tập', 'Chỉ tập khi có giờ thể dục ở lớp', 'Thói quen tập thể dục'], 3, 'Thói quen tập đều đặn.', ['Sai — chỉ ngủ thôi chưa đủ.', 'Sai — không tập thì không khoẻ.', 'Sai — nên tập đều, không chỉ trong giờ thể dục.', 'Đúng — cần tạo thói quen tập thể dục đều đặn.']),
    Q('Trước khi tập luôn?', ['Khởi động', 'Uống nước đá', 'Ăn no để có sức tập lâu', 'Bỏ qua'], 0, 'Khởi động luôn cần thiết.', ['Đúng — luôn khởi động trước khi tập.', 'Sai — không uống nước đá trước khi tập.', 'Sai — không ăn no rồi tập ngay.', 'Sai — không bỏ qua khởi động.']),
    Q('Tinh thần thể thao?', ['Chơi xấu', 'Bỏ cuộc', 'Fair-play, đoàn kết, tôn trọng', 'Hơn thua bằng mọi giá để thắng'], 2, 'Fair-play và tôn trọng.', ['Sai — chơi xấu trái tinh thần thể thao.', 'Sai — không bỏ cuộc.', 'Đúng — fair-play, đoàn kết và tôn trọng.', 'Sai — không hơn thua bằng mọi giá.']),
  ]),

  M(35, 'Kiểm tra cuối năm', [
    Q('Khi kiểm tra em nên?', ['Tự tin, cố gắng hết sức', 'Lo lắng và bỏ bớt động tác khó', 'Bỏ cuộc', 'Cãi cô'], 0, 'Tự tin và cố gắng.', ['Đúng — tự tin và cố gắng hết sức.', 'Sai — không lo lắng bỏ bớt động tác khó.', 'Sai — không bỏ cuộc.', 'Sai — không cãi cô.']),
    Q('Khi thua bạn?', ['Chúc mừng và cố gắng', 'Bỏ về không xem bạn nhận thưởng', 'Cãi trọng tài rằng tính điểm sai', 'Khóc vì không được hạng cao'], 0, 'Chúc mừng và cố gắng tiếp.', ['Đúng — chúc mừng bạn và tiếp tục cố gắng.', 'Sai — nên ở lại chia vui với bạn.', 'Sai — không cãi trọng tài.', 'Sai — không khóc trách vì thứ hạng.']),
    Q('Sau cấp 1 em sẽ?', ['Không quan tâm', 'Chỉ tập khi có giờ thể dục ở trường', 'Đợi đến khi lớn rồi mới tập', 'Tiếp tục tập thể dục ở cấp 2'], 3, 'Tiếp tục cấp 2.', ['Sai — sức khoẻ luôn cần quan tâm.', 'Sai — nên tập đều, không chỉ trong giờ thể dục.', 'Sai — nên tập ngay từ bây giờ.', 'Đúng — tiếp tục tập thể dục đều đặn ở cấp 2.']),
    Q('Lời cảm ơn thầy cô môn thể dục?', ['Chân thành, giữ thói quen tập', 'Tranh luận về điểm số cuối kì', 'Quên ngay sau khi học xong cấp 1', 'Im lặng'], 0, 'Chân thành và giữ thói quen.', ['Đúng — cảm ơn chân thành và giữ thói quen tập luyện.', 'Sai — không tranh luận điểm số.', 'Sai — không nên quên những gì đã học.', 'Sai — im lặng là thiếu lễ phép.']),
  ]),

  M(36, 'Kết thúc Tiểu học — Sức khoẻ là hành trang lên cấp 2', [
    Q('WHO khuyến nghị học sinh 6–17 tuổi vận động mỗi ngày ít nhất bao lâu?', ['15 phút', '30 phút', '60 phút', '180 phút'], 2, 'Khuyến nghị: ít nhất 60 phút vận động mỗi ngày.', ['Sai — 15 phút quá ít so với khuyến nghị.', 'Sai — 30 phút vẫn chưa đủ mức khuyến nghị.', 'Đúng — ít nhất 60 phút mỗi ngày.', 'Sai — 180 phút vượt xa mức khuyến nghị tối thiểu.']),
    Q('Khi chạy bền, cách thở đúng là?', ['Nín thở cho nhanh về đích', 'Hít vào bằng mũi, thở ra bằng miệng, thở đều', 'Thở gấp liên tục bằng miệng', 'Thở càng nhanh càng tốt'], 1, 'Thở đều: hít bằng mũi, thở ra bằng miệng, giữ nhịp ổn định.', ['Sai — nín thở làm cơ thể thiếu oxy, rất nguy hiểm.', 'Đúng — hít vào bằng mũi, thở ra bằng miệng và giữ nhịp thở đều.', 'Sai — thở gấp làm em nhanh mệt và mất sức.', 'Sai — thở quá nhanh khiến em hụt hơi sớm.']),
    Q('Học sinh cấp 2 nên ngủ mỗi đêm khoảng bao lâu?', ['4–5 tiếng', '6 tiếng', '12 tiếng', '8–9 tiếng'], 3, 'Ngủ đủ 8–9 tiếng mỗi đêm.', ['Sai — thiếu ngủ nghiêm trọng, ảnh hưởng sức khoẻ và học tập.', 'Sai — 6 tiếng vẫn chưa đủ cho lứa tuổi này.', 'Sai — 12 tiếng là quá nhiều so với nhu cầu.', 'Đúng — học sinh cấp 2 nên ngủ đủ 8–9 tiếng mỗi đêm.']),
    Q('Trước buổi tập, việc cần làm đầu tiên là gì?', ['Khởi động làm nóng cơ thể', 'Chạy hết sức ngay', 'Ăn thật no', 'Uống nước ngọt có ga'], 0, 'Khởi động giúp cơ nóng lên, tránh chấn thương.', ['Đúng — khởi động làm nóng cơ thể, giúp tránh chấn thương.', 'Sai — vào cường độ cao ngay rất dễ chuột rút, căng cơ.', 'Sai — ăn quá no rồi vận động dễ đau bụng.', 'Sai — nước ngọt có ga không phù hợp trước khi vận động.']),
    Q('Chế độ ăn phù hợp cho học sinh vận động nhiều là?', ['Chỉ ăn đồ ăn nhanh', 'Nhịn ăn để giảm cân', 'Cân bằng dinh dưỡng, uống đủ nước, hạn chế đồ ăn nhanh', 'Chỉ uống nước ngọt thay bữa'], 2, 'Ăn cân bằng, uống đủ nước, hạn chế đồ ăn nhanh.', ['Sai — đồ ăn nhanh nhiều dầu mỡ, thiếu chất cần thiết.', 'Sai — nhịn ăn ở tuổi đang lớn rất có hại.', 'Đúng — ăn cân bằng, uống đủ nước và hạn chế đồ ăn nhanh.', 'Sai — nước ngọt không thay thế được bữa ăn.']),
    Q('Công thức thành công mà môn Giáo dục thể chất nhắc tới là?', ['Cơ thể khoẻ → tinh thần sáng → học tập tốt', 'Học nhiều → ngủ ít → điểm cao', 'Ít vận động → tiết kiệm sức → khoẻ hơn', 'Ăn thật nhiều → khoẻ ngay'], 0, 'Sức khoẻ thể chất là nền tảng của tinh thần và học tập.', ['Đúng — cơ thể khoẻ giúp tinh thần sáng và học tập tốt hơn.', 'Sai — ngủ ít làm giảm trí nhớ và khả năng tập trung.', 'Sai — ít vận động khiến cơ thể yếu đi, không khoẻ lên.', 'Sai — ăn nhiều mà không cân bằng và không vận động thì không khoẻ.']),
  ]),
];

export const P5GDTC_SCENARIOS = indexBy(P5GDTC_WEEKS);
