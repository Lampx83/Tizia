// ============================================================
// Lớp 9 · GIÁO DỤC THỂ CHẤT — 35 tuần (HK1: 1–18 · HK2: 19–35)
// Bám CT GDPT 2018 môn GDTC Lớp 9: chạy bền, đá cầu, cầu lông, bóng chuyền, bóng rổ, bóng đá, võ thuật, bơi.
// 4–5 câu/tuần · ID prefix: "S9GDTC-wNN-quiz".
// ============================================================
import { Q, W, indexBy } from './_helper.js';

const M = (n, title, qs, opts) => W('S9GDTC', 'gdtc', n, title, qs, opts);

export const S9GDTC_WEEKS = [
  // ───── HK1 ─────
  M(1, 'Khởi động và an toàn thể thao', [
    Q('Mục đích khởi động?', ['Làm nóng cơ thể, tránh chấn thương', 'Mệt thêm', 'Tốn thời gian', 'Không cần'], 0, 'Khởi động giúp tăng nhiệt cơ và linh hoạt khớp.',
      [
        '<b>Khởi động (warm-up)</b> là phần bắt buộc mở đầu mỗi buổi GDTC theo CT GDPT 2018. Mục tiêu: <code>tăng dần nhiệt độ cơ</code>, làm trơn dịch khớp, đánh thức hệ tim mạch trước khi vào vận động chính.<ul><li><b>Khởi động chung:</b> chạy nhẹ, xoay các khớp cổ – vai – hông – gối – cổ chân.</li><li><b>Khởi động chuyên môn:</b> các động tác mô phỏng môn sắp tập (ví dụ bước chạy đạp sau trước khi chạy bền).</li></ul>',
        '<i>Vì sao quan trọng với lớp 9?</i> Đây là năm cuối THCS, lượng vận động và bài kiểm tra thể lực tăng. Cơ – gân – dây chằng được làm nóng sẽ <b>co giãn tốt hơn</b>, giảm hẳn nguy cơ căng cơ, chuột rút khi vào bài chính.',
        '<em>Trình tự an toàn</em> một buổi tập: <code>Khởi động → Vận động chính → Thả lỏng (hồi tĩnh)</code>. Bỏ qua khởi động là vi phạm nguyên tắc an toàn cơ bản nhất.',
      ],
      ['Đúng — khởi động làm nóng cơ, tăng linh hoạt khớp nên giảm nguy cơ chấn thương.', 'Sai — khởi động đúng cách không làm mệt mà giúp cơ thể sẵn sàng vận động.', 'Sai — vài phút khởi động đổi lại buổi tập an toàn, không phải lãng phí.', 'Sai — bỏ khởi động dễ căng cơ, chuột rút; đây là bước bắt buộc.']),
    Q('Thời gian khởi động tối thiểu?', ['30 giây', 'Không cần', '5–10 phút', '1 phút'], 2, '5–10 phút khởi động là khuyến nghị.',
      [
        '<b>Thời lượng khởi động</b> khuyến nghị là <code>5–10 phút</code>, đủ để nhịp tim và thân nhiệt nhích lên, mồ hôi bắt đầu rịn ra — dấu hiệu cơ thể đã "vào guồng".<ul><li>Buổi tập càng cường độ cao (chạy bền, thi thể lực) thì khởi động càng cần kỹ.</li><li>Trời lạnh cần khởi động lâu hơn vì cơ co cứng hơn.</li></ul>',
        '<i>Cấu trúc 5–10 phút:</i> khoảng 2–3 phút chạy/đi bộ nhanh làm nóng toàn thân, phần còn lại xoay khớp và động tác chuyên môn. Khởi động <b>quá ngắn</b> (vài chục giây) thì cơ chưa nóng; <b>quá dài</b> lại hao sức trước khi vào bài.',
      ],
      ['Sai — 30 giây quá ngắn, cơ chưa kịp nóng lên.', 'Sai — luôn cần khởi động trước khi vận động mạnh.', 'Đúng — 5–10 phút là thời gian khuyến nghị để cơ thể sẵn sàng.', 'Sai — 1 phút chưa đủ để làm nóng cơ và khớp.']),
    Q('Sau khi tập, cần?', ['Tắm nước lạnh ngay', 'Ăn ngay', 'Dừng đột ngột', 'Thả lỏng, giãn cơ, hồi phục'], 3, 'Cool-down giúp hồi phục tốt hơn.',
      [
        '<b>Thả lỏng (hồi tĩnh – cool-down)</b> là phần kết thúc buổi GDTC, ngược lại với khởi động: đưa cơ thể từ trạng thái vận động mạnh về nghỉ ngơi <b>một cách từ từ</b>.<ul><li>Đi bộ chậm, hít thở sâu để nhịp tim hạ dần.</li><li>Giãn cơ tĩnh (kéo giãn nhẹ và giữ) các nhóm cơ vừa làm việc.</li></ul>',
        '<i>Lợi ích:</i> giúp máu không bị ứ ở chân, giảm chóng mặt, đẩy nhanh đào thải axit lactic nên <b>đỡ đau mỏi cơ</b> ngày hôm sau. Đây là một thói quen tập luyện khoa học cần duy trì suốt đời.',
      ],
      ['Sai — tắm nước lạnh ngay khi đang nóng dễ gây sốc nhiệt, nên thả lỏng trước.', 'Sai — nên hạ nhịp trước, ăn ngay khi tim còn đập nhanh không tốt.', 'Sai — dừng đột ngột làm máu dồn, dễ chóng mặt; cần giảm dần.', 'Đúng — thả lỏng và giãn cơ giúp cơ thể hồi phục tốt hơn.']),
    Q('Khi bị chấn thương, nên?', ['Cố gắng tập', 'Dừng tập, sơ cứu, báo người lớn/y tế', 'Tự dán băng cá nhân rồi tập tiếp', 'Im lặng'], 1, 'An toàn là trên hết.',
      [
        '<b>Nguyên tắc an toàn</b> trong GDTC: khi có dấu hiệu chấn thương (đau nhói, sưng, hạn chế cử động) phải <code>DỪNG NGAY</code>, không cố tập cho hết bài.<ul><li>Sơ cứu ban đầu theo <b>RICE</b>: Nghỉ – Chườm đá – Băng ép – Kê cao.</li><li>Báo ngay giáo viên, người lớn hoặc y tế nhà trường.</li></ul>',
        '<i>Vì sao không tự xử lý qua loa?</i> Một số chấn thương (bong gân nặng, rạn xương) nhìn ngoài giống chấn thương nhẹ. Báo người có chuyên môn để được đánh giá đúng, tránh để di chứng lâu dài.',
      ],
      ['Sai — cố tập khi đã chấn thương làm vết thương nặng thêm.', 'Đúng — dừng lại, sơ cứu và báo người lớn hay y tế là cách an toàn.', 'Sai — dán băng rồi tập tiếp không xử lý gốc, dễ nguy hiểm.', 'Sai — im lặng khiến chấn thương không được xử lý kịp thời.']),
  ]),

  M(2, 'Chạy bền — Kỹ thuật chạy 800m–1500m', [
    Q('Chạy bền đòi hỏi?', ['Tốc độ tối đa', 'Sức mạnh tối đa', 'Linh hoạt', 'Sức bền tim mạch + nhịp thở đều'], 3, 'Chạy bền dựa trên sức bền aerobic.',
      [
        '<b>Chạy bền</b> (cự ly trung bình – dài) trong CT GDPT 2018 rèn <code>sức bền ưa khí (aerobic)</code> — khả năng duy trì vận động kéo dài nhờ tim phổi cung cấp đủ oxy cho cơ.<ul><li>Khác chạy ngắn (sprint) vốn dựa vào sức mạnh – tốc độ tức thời, không cần oxy (yếm khí).</li><li>Chạy bền cần phối hợp nhịp chạy đều và nhịp thở ổn định.</li></ul>',
        '<i>Tập luyện đều đặn</i> chạy bền giúp <b>tim khoẻ hơn, phổi nở hơn</b>, là nền tảng thể lực cho mọi môn thể thao và phục vụ tốt cho bài kiểm tra thể lực cuối cấp.',
      ],
      ['Sai — tốc độ tối đa là của chạy ngắn, chạy bền cần giữ sức lâu.', 'Sai — sức mạnh tối đa thuộc tập tạ, không phải chạy bền.', 'Sai — linh hoạt hỗ trợ nhưng không phải yếu tố chính của chạy bền.', 'Đúng — chạy bền dựa vào sức bền tim mạch và nhịp thở đều.']),
    Q('Cự ly 800m thuộc?', ['Sprint', 'Chạy cự ly ngắn (sprint dưới 400m)', 'Chạy bền cự ly trung bình', 'Marathon'], 2, '800m là cự ly trung bình.',
      [
        '<b>Phân loại cự ly chạy</b> trong điền kinh:<ul><li><b>Cự ly ngắn (sprint):</b> 100m, 200m, 400m — chạy hết tốc lực.</li><li><b>Cự ly trung bình:</b> 800m, 1500m — vừa nhanh vừa bền.</li><li><b>Cự ly dài:</b> 3000m trở lên; marathon 42,195km.</li></ul>',
        '<i>Vì sao 800m là trung bình?</i> Quãng đường này quá dài để chạy hết tốc như sprint, nhưng đủ ngắn để giữ nhịp khá nhanh — đòi hỏi <b>kết hợp tốc độ và sức bền</b>, nên còn gọi là cự ly "tốc độ – bền".',
      ],
      ['Sai — sprint là các cự ly rất ngắn như 100m, 200m.', 'Sai — 800m vượt quá 400m nên không phải cự ly ngắn.', 'Đúng — 800m là cự ly trung bình giữa ngắn và dài.', 'Sai — marathon dài hơn 42km, khác xa 800m.']),
    Q('Nhịp thở khi chạy bền?', ['Thở nhanh và nông liên tục', 'Thở gấp', 'Nín thở', 'Đều đặn, hít sâu thở ra dài'], 3, 'Thở đều và sâu cung cấp oxy cho cơ.',
      [
        '<b>Kỹ thuật thở khi chạy bền</b>: thở <code>đều và sâu</code>, phối hợp với bước chạy. Cách phổ biến là nhịp <b>2–2</b> (hít vào trong 2 bước, thở ra trong 2 bước) hoặc 3–3 khi chạy chậm.<ul><li>Hít sâu bằng cả mũi và miệng để lấy nhiều oxy.</li><li>Thở ra dài giúp tống hết khí CO₂.</li></ul>',
        '<i>Tránh:</i> thở nông – gấp khiến phổi không trao đổi đủ khí, cơ thiếu oxy và mau mệt. Nín thở thì rất nguy hiểm. Giữ nhịp thở ổn định chính là chìa khoá <b>chạy được lâu mà không hụt hơi</b>.',
      ],
      ['Sai — thở nông không lấy đủ oxy, dễ mất sức nhanh.', 'Sai — thở gấp khiến mau mệt, không duy trì được lâu.', 'Sai — nín thở làm thiếu oxy, rất nguy hiểm khi chạy.', 'Đúng — thở đều, hít sâu thở dài cung cấp đủ oxy cho cơ.']),
    Q('Khi chạy bị xóc bụng?', ['Giảm tốc, thở chậm sâu, ấn vùng đau', 'Tăng tốc', 'Dừng đột ngột', 'Mặc kệ'], 0, 'Giảm tốc và điều hoà hô hấp.',
      [
        '<b>Xóc bụng (đau xóc hông)</b> là cơn đau nhói vùng bụng dưới sườn, thường gặp khi chạy bền do cơ hoành co thắt hoặc ăn quá no trước khi chạy.<ul><li><b>Xử lý:</b> giảm tốc độ, hít thở chậm và sâu, dùng tay ấn nhẹ vào vùng đau.</li><li>Có thể hơi nghiêng người về phía đối diện chỗ đau.</li></ul>',
        '<i>Phòng tránh:</i> không ăn no sát giờ chạy, khởi động kỹ và thở đều ngay từ đầu. Tuyệt đối <b>không dừng đột ngột</b> vì dễ choáng — hãy giảm tốc từ từ rồi mới dừng.',
      ],
      ['Đúng — giảm tốc, thở chậm sâu và ấn nhẹ vùng đau giúp dịu cơn xóc.', 'Sai — tăng tốc làm cơn xóc bụng nặng hơn.', 'Sai — dừng đột ngột dễ choáng, nên giảm tốc từ từ.', 'Sai — mặc kệ khiến cơn đau kéo dài, ảnh hưởng buổi chạy.']),
    Q('Tư thế chạy bền đúng?', ['Ngả ra sau', 'Thân hơi nghiêng trước, vai thả lỏng, tay vung tự nhiên', 'Vai gồng', 'Tay khoanh'], 1, 'Tư thế thoải mái + tiết kiệm năng lượng.',
      [
        '<b>Tư thế chạy bền chuẩn</b> giúp tiết kiệm sức và chạy được lâu:<ul><li>Thân trên <code>hơi nghiêng về trước</code> để tận dụng đà, không ngả ra sau.</li><li>Vai và cổ <b>thả lỏng</b>, không gồng cứng.</li><li>Hai tay co khoảng 90°, vung nhẹ nhàng theo bước chân.</li></ul>',
        '<i>Bước chân:</i> tiếp đất bằng nửa bàn chân trước rồi cả bàn, bước vừa phải. Gồng vai hay khoanh tay đều làm <b>hao năng lượng vô ích</b> và mất thăng bằng. Giữ thân thoải mái là nguyên tắc của chạy bền hiệu quả.',
      ],
      ['Sai — ngả ra sau làm mất đà và tốn sức.', 'Đúng — thân hơi nghiêng trước, vai thả lỏng, tay vung tự nhiên giúp tiết kiệm sức.', 'Sai — gồng vai gây mỏi và lãng phí năng lượng.', 'Sai — khoanh tay cản nhịp chạy, không giữ thăng bằng tốt.']),
  ]),

  M(3, 'Chạy bền — Bài tập sức bền', [
    Q('Phương pháp tập sức bền?', ['Chỉ sprint', 'Chỉ tập tạ nặng cho chân', 'Không tập', 'Chạy liên tục đều tốc, chạy biến tốc, chạy interval'], 3, 'Nhiều phương pháp tập sức bền hiệu quả.',
      [
        '<b>Các phương pháp phát triển sức bền</b> trong GDTC:<ul><li><b>Chạy liên tục đều tốc:</b> giữ một tốc độ vừa phải trong thời gian dài.</li><li><b>Chạy biến tốc (fartlek):</b> tự do thay đổi nhanh – chậm theo địa hình, cảm giác.</li><li><b>Chạy lặp lại (interval):</b> xen kẽ đoạn nhanh và đoạn nghỉ/chậm theo kế hoạch.</li></ul>',
        '<i>Vì sao đa dạng?</i> Mỗi phương pháp kích thích cơ thể theo một kiểu khác nhau, kết hợp giúp <b>tránh nhàm chán và tiến bộ toàn diện</b>. Chỉ sprint thì rèn tốc độ chứ không phải sức bền; tạ nặng rèn sức mạnh.',
      ],
      ['Sai — chỉ sprint rèn tốc độ ngắn, không phải sức bền.', 'Sai — tạ nặng rèn sức mạnh chứ không phải sức bền.', 'Sai — không tập thì không thể tăng sức bền.', 'Đúng — chạy đều tốc, biến tốc và interval đều giúp tăng sức bền.']),
    Q('Interval training là?', ['Đi bộ chậm rãi suốt buổi tập', 'Chạy đều', 'Dừng nghỉ', 'Xen kẽ chạy nhanh – chậm'], 3, 'Interval tăng VO₂max hiệu quả.',
      [
        '<b>Chạy lặp lại (interval training)</b> là phương pháp xen kẽ <code>đoạn chạy nhanh – đoạn chạy chậm/nghỉ</code> theo chu kỳ. Ví dụ: chạy nhanh 200m rồi đi bộ 200m, lặp lại nhiều lần.<ul><li>Đoạn nhanh đẩy tim phổi làm việc cường độ cao.</li><li>Đoạn nghỉ giúp hồi phục một phần để tiếp tục.</li></ul>',
        '<i>Hiệu quả:</i> interval cải thiện mạnh <b>VO₂max</b> (lượng oxy tối đa cơ thể sử dụng) — chỉ số quan trọng của sức bền — nhanh hơn chạy đều tốc. Đây là phương pháp được vận động viên chạy trung bình – dài ưa dùng.',
      ],
      ['Sai — đi bộ chậm cả buổi không phải interval.', 'Sai — chạy đều một tốc độ là phương pháp khác.', 'Sai — chỉ dừng nghỉ không tạo nên bài interval.', 'Đúng — interval là xen kẽ đoạn chạy nhanh và đoạn chạy chậm.']),
    Q('Tần suất tập bền/tuần?', ['1 buổi', '7 buổi liên tục', '3–5 buổi', 'Không cần'], 2, '3–5 buổi/tuần là khuyến nghị.',
      [
        '<b>Tần suất tập sức bền</b> hợp lý là <code>3–5 buổi/tuần</code>, xen kẽ ngày tập và ngày nghỉ.<ul><li>Ngày nghỉ là lúc cơ thể <b>hồi phục và thích nghi</b> — chính lúc này thể lực mới tăng lên.</li><li>Tập đều đặn quan trọng hơn tập dồn một bữa thật nặng.</li></ul>',
        '<i>Lưu ý:</i> tập 7 buổi liên tục không cho cơ kịp phục hồi, dễ dẫn tới <b>quá tải, mệt mỏi, chấn thương</b>. Ngược lại 1 buổi/tuần thì quá thưa, cơ thể không nhận đủ kích thích để tiến bộ.',
      ],
      ['Sai — 1 buổi quá ít để tiến bộ rõ rệt.', 'Sai — 7 buổi liên tục không cho cơ thể hồi phục.', 'Đúng — 3–5 buổi mỗi tuần là mức khuyến nghị hợp lý.', 'Sai — phải tập đều đặn mới tăng được sức bền.']),
    Q('Để tiến bộ, cần?', ['Giữ nguyên cự ly và tốc độ trong nhiều tháng', 'Đột ngột', 'Không thay đổi', 'Tăng dần cự ly hoặc tốc độ theo nguyên tắc tăng tiến'], 3, 'Nguyên tắc progressive overload.',
      [
        '<b>Nguyên tắc tăng tiến (progressive overload)</b> là quy luật cơ bản của tập luyện: muốn tiến bộ phải <code>tăng dần lượng vận động</code> — kéo dài cự ly, nâng tốc độ hoặc tăng số buổi từ từ theo thời gian.<ul><li>Cơ thể thích nghi với mức hiện tại rồi mới cần kích thích mới để khoẻ hơn.</li></ul>',
        '<i>Then chốt là "từ từ":</i> tăng đột ngột (ví dụ hôm nay 1km, mai 5km) dễ <b>quá sức và chấn thương</b>. Giữ nguyên mãi thì cơ thể quen và đứng yên. Tăng khoảng 5–10% mỗi tuần là mức an toàn được khuyến nghị.',
      ],
      ['Sai — giữ nguyên mãi thì cơ thể quen và không tiến bộ.', 'Sai — tăng đột ngột dễ quá sức và chấn thương.', 'Sai — không thay đổi thì không tạo được kích thích mới.', 'Đúng — tăng dần cự ly hoặc tốc độ theo nguyên tắc tăng tiến mới tiến bộ.']),
  ]),

  M(4, 'Đá cầu — Kỹ thuật cơ bản', [
    Q('Đá cầu nguồn gốc?', ['Châu Mỹ', 'Châu Phi', 'Việt Nam, Trung Quốc, Đông Á', 'Châu Âu'], 2, 'Đá cầu phổ biến ở Đông Á, đặc biệt VN.',
      [
        '<b>Đá cầu</b> là môn thể thao truyền thống phổ biến ở <code>Đông Á</code>, đặc biệt là Việt Nam và Trung Quốc, có nguồn gốc từ trò chơi dân gian "đá kiện".<ul><li>Ở Việt Nam, đá cầu được đưa vào chương trình GDTC và là môn thi đấu chính thức.</li><li>Có cả nội dung thi đấu trong nước và quốc tế.</li></ul>',
        '<i>Giá trị:</i> đá cầu rèn <b>khéo léo, nhanh nhẹn, phối hợp mắt – chân</b> và phản xạ. Dụng cụ đơn giản (quả cầu), không tốn diện tích nên rất phù hợp với trường học Việt Nam.',
      ],
      ['Sai — đá cầu không khởi nguồn từ châu Mỹ.', 'Sai — đá cầu không phổ biến gốc ở châu Phi.', 'Đúng — đá cầu phổ biến ở Đông Á, đặc biệt là Việt Nam và Trung Quốc.', 'Sai — đá cầu không có nguồn gốc từ châu Âu.']),
    Q('Kỹ thuật đá cầu cơ bản?', ['Đá gót', 'Đá hông', 'Đá mu bàn chân, đá má trong, đá má ngoài', 'Đá gối'], 2, '3 kỹ thuật cơ bản theo phần chân tiếp xúc.',
      [
        '<b>Các kỹ thuật đá cầu cơ bản</b> được phân theo phần bàn chân tiếp xúc cầu:<ul><li><b>Đá mu bàn chân (tâng/đá chính diện):</b> dùng mu bàn chân hất cầu lên hoặc qua lưới.</li><li><b>Đá má trong:</b> dùng cạnh trong bàn chân, cầu đi chếch.</li><li><b>Đá má ngoài:</b> dùng cạnh ngoài bàn chân.</li></ul>',
        '<i>Lưu ý kỹ thuật:</i> mắt theo cầu, gối hơi chùng, tiếp xúc cầu ở điểm phù hợp để điều khiển hướng và độ cao. Đá gót, đá hông là <b>kỹ thuật nâng cao</b> hơn, không thuộc nhóm cơ bản.',
      ],
      ['Sai — đá gót là kỹ thuật nâng cao, không phải cơ bản.', 'Sai — đá hông không thuộc nhóm kỹ thuật cơ bản.', 'Đúng — đá mu bàn chân, má trong và má ngoài là ba kỹ thuật cơ bản.', 'Sai — đá gối không phải kỹ thuật cơ bản của đá cầu.']),
    Q('Sân đá cầu đơn?', ['Sân tennis', 'Dài 11,88m × rộng 6,1m', 'Sân tennis', 'Sân bóng đá'], 1, 'Sân đá cầu chính thức 11,88 × 6,1m.',
      [
        '<b>Sân đá cầu</b> tiêu chuẩn hình chữ nhật, kích thước <code>dài 11,88m × rộng 6,1m</code> (giống nền sân cầu lông), có lưới chia đôi ở giữa.<ul><li>Đường biên rõ ràng để xác định cầu trong hay ngoài.</li><li>Mặt sân phẳng, không trơn.</li></ul>',
        '<i>Ghi nhớ:</i> con số <b>11,88m và 6,1m</b> là chuẩn thi đấu chính thức. Sân tennis, sân bóng đá có kích thước khác hẳn, không dùng cho đá cầu.',
      ],
      ['Sai — sân tennis có kích thước khác hẳn sân đá cầu.', 'Đúng — sân đá cầu chính thức dài 11,88m và rộng 6,1m.', 'Sai — đây vẫn là sân tennis, không phải sân đá cầu.', 'Sai — sân bóng đá lớn hơn nhiều so với sân đá cầu.']),
    Q('Chiều cao lưới đá cầu (nam)?', ['1,5m', '2,5m', '2m', '1m'], 0, 'Lưới nam 1,5m; nữ 1,4m.',
      [
        '<b>Chiều cao lưới đá cầu</b> khác nhau theo giới: <code>nam 1,5m – nữ 1,4m</code> (tính ở mép trên giữa lưới).<ul><li>Lưới căng ngang giữa sân, chia hai phần sân của hai bên.</li><li>Chiều cao này thấp hơn lưới bóng chuyền và khác lưới cầu lông.</li></ul>',
        '<i>Vì sao cần nhớ?</i> Đá cầu thi đấu phải <b>đưa cầu qua trên lưới</b> sang sân đối phương; biết đúng độ cao giúp căn lực và quỹ đạo đá. Cầu chạm lưới rơi về sân mình là mất điểm.',
      ],
      ['Đúng — lưới đá cầu nam cao 1,5m, nữ là 1,4m.', 'Sai — 2,5m quá cao so với chuẩn đá cầu.', 'Sai — 2m cao hơn mức quy định cho nam.', 'Sai — 1m thấp hơn chiều cao lưới chuẩn.']),
    Q('Khi đá cầu, mắt nhìn?', ['Nhìn vào đối thủ để đoán hướng', 'Theo dõi cầu liên tục', 'Nhìn chân', 'Nhìn người khác'], 1, 'Mắt theo cầu để phán đoán điểm rơi.',
      [
        '<b>Quan sát khi đá cầu:</b> mắt phải <code>theo dõi quả cầu liên tục</code> từ lúc đối phương đá sang đến khi cầu rơi vào tầm. Đây là kỹ năng then chốt để phán đoán <b>điểm rơi</b> và chọn kỹ thuật đỡ phù hợp.',
        '<i>Vì sao không nhìn chỗ khác?</i> Cầu nhẹ, bay nhanh và đổi hướng theo gió; rời mắt khỏi cầu dù chỉ một khoảnh khắc là dễ đỡ hụt. Vừa theo cầu vừa <b>liếc nhanh vị trí đối thủ</b> để chọn hướng trả là kỹ năng của người chơi giỏi.',
      ],
      ['Sai — nhìn đối thủ dễ mất dấu cầu đang bay.', 'Đúng — mắt theo cầu liên tục để phán đoán điểm rơi.', 'Sai — nhìn chân làm lỡ đường cầu.', 'Sai — nhìn người khác khiến mất tập trung vào cầu.']),
  ]),

  M(5, 'Đá cầu — Thi đấu đơn', [
    Q('Phát cầu đầu trận?', ['Bốc thăm chọn bên hoặc quyền phát', 'Tự chọn', 'Trọng tài quyết', 'Đối phương quyết'], 0, 'Bốc thăm theo luật quốc tế.',
      [
        '<b>Bắt đầu trận đá cầu</b>: theo luật, hai bên <code>bốc thăm</code> để chọn quyền phát cầu trước hoặc chọn bên sân. Bên thua quyền chọn được lấy lựa chọn còn lại.<ul><li>Bốc thăm bảo đảm công bằng, không bên nào tự ý quyết.</li><li>Trọng tài là người điều hành việc bốc thăm.</li></ul>',
        '<i>Phát cầu</i> là động tác đưa cầu vào cuộc từ khu phát; phát đúng luật (đứng đúng vị trí, cầu qua lưới hợp lệ) mới được tính. Đây là kiến thức luật cơ bản của thi đấu đơn.',
      ],
      ['Đúng — bốc thăm để chọn bên sân hoặc quyền phát theo luật quốc tế.', 'Sai — không bên nào được tự chọn mà phải bốc thăm.', 'Sai — trọng tài điều hành bốc thăm chứ không tự quyết.', 'Sai — đối phương không được tự quyết quyền phát.']),
    Q('Một set thi đấu đơn?', ['21 điểm, chênh 2 điểm', '10 điểm', '15 điểm', '25 điểm'], 0, 'Đá cầu hiện đại: 21 điểm/set, chênh 2.',
      [
        '<b>Luật tính điểm đá cầu hiện đại</b>: mỗi set đấu đến <code>21 điểm</code> và bên thắng phải <b>cách biệt ít nhất 2 điểm</b> (ví dụ 21–19). Trận thường đấu 2 thắng 3 (best of 3 sets).<ul><li>Áp dụng luật mỗi pha cầu đều tính điểm (rally point).</li></ul>',
        '<i>Phân biệt:</i> con số 21 điểm dễ nhầm với cầu lông (cũng 21) nhưng khác bóng chuyền (25). Luật 15 điểm là <b>luật cũ</b> của đá cầu, nay đã đổi sang 21 điểm.',
      ],
      ['Đúng — một set đá cầu hiện đại đến 21 điểm và phải chênh 2 điểm.', 'Sai — 10 điểm không đúng luật đá cầu hiện đại.', 'Sai — 15 điểm là luật cũ, nay đã đổi.', 'Sai — 25 điểm là luật bóng chuyền, không phải đá cầu.']),
    Q('Lỗi khi nhận cầu?', ['Đá trả qua lưới', 'Để cầu chạm đất, ra ngoài, chạm 2 lần', 'Né cầu khi cầu bay sang phần sân mình', 'Lùi sau'], 1, 'Cầu chạm đất là mất điểm.',
      [
        '<b>Các lỗi thường gặp khi nhận cầu</b> (mất điểm):<ul><li>Để cầu <code>chạm đất</code> trong phần sân của mình.</li><li>Đá cầu <b>ra ngoài</b> biên hoặc chạm lưới rơi về sân nhà.</li><li>Chạm cầu <b>2 lần</b> liên tiếp (trong thi đấu đơn).</li></ul>',
        '<i>Ngược lại:</i> đá trả cầu qua lưới hợp lệ là chơi đúng luật, không phải lỗi. Hiểu rõ các lỗi giúp <b>giữ điểm</b> và biết khi nào đối phương phạm lỗi để được điểm.',
      ],
      ['Sai — đá trả cầu qua lưới là chơi hợp lệ, không phải lỗi.', 'Đúng — để cầu chạm đất, ra ngoài hoặc chạm 2 lần đều là lỗi.', 'Sai — né cầu không phải lỗi, chỉ là mất điểm nếu cầu rơi trong sân.', 'Sai — lùi sau để chuẩn bị đỡ cầu không phải lỗi.']),
    Q('Chiến thuật đơn?', ['Chỉ tốc độ', 'Phán đoán + tốc độ + sức bền', 'Chỉ dùng kỹ thuật đá mu chính diện', 'Chỉ sức mạnh'], 1, 'Đá cầu đơn cần tổng hợp nhiều yếu tố.',
      [
        '<b>Chiến thuật đá cầu đơn</b> đòi hỏi phối hợp nhiều năng lực:<ul><li><b>Phán đoán:</b> đọc hướng và điểm rơi của cầu sớm.</li><li><b>Tốc độ:</b> di chuyển nhanh tới vị trí đỡ.</li><li><b>Sức bền:</b> giữ phong độ qua nhiều pha cầu kéo dài.</li></ul>',
        '<i>Lối chơi khôn ngoan:</i> thay đổi điểm rơi (lúc xa lúc gần lưới), đổi nhịp nhanh – chậm để đối thủ <b>mất thăng bằng và bắt bài</b>. Chỉ dựa vào một kỹ thuật hay một yếu tố thì dễ bị đối phương khắc chế.',
      ],
      ['Sai — chỉ tốc độ không đủ để thắng trận đơn.', 'Đúng — đá cầu đơn cần phán đoán, tốc độ và sức bền kết hợp.', 'Sai — chỉ dùng một kỹ thuật rất dễ bị đối thủ bắt bài.', 'Sai — chỉ sức mạnh mà thiếu kỹ thuật và phán đoán thì khó thắng.']),
  ]),

  M(6, 'Đá cầu — Thi đấu đôi', [
    Q('Đá cầu đôi cần?', ['Không hợp tác', 'Phối hợp đồng đội, vị trí, hỗ trợ', 'Mỗi người tự đá nửa sân, không yểm trợ', 'Tự chơi'], 1, 'Đôi đòi hỏi phối hợp ăn ý.',
      [
        '<b>Đá cầu đôi</b> là nội dung hai người một bên sân, then chốt là <code>phối hợp đồng đội</code>: giữ vị trí hợp lý, hỗ trợ và yểm trợ cho nhau qua từng pha cầu.<ul><li>Hai người như một khối, bù trống cho nhau.</li><li>Phân công ai đỡ pha nào để tránh cùng lao vào hoặc cùng bỏ cầu.</li></ul>',
        '<i>Khác thi đấu đơn:</i> đá đôi đòi hỏi thêm <b>kỹ năng giao tiếp và ăn ý</b>. Mạnh ai nấy đá, không yểm trợ thì dễ để hở khoảng trống cho đối phương khai thác.',
      ],
      ['Sai — không hợp tác thì trận đôi sẽ rối loạn.', 'Đúng — đá đôi cần phối hợp đồng đội, giữ vị trí và hỗ trợ nhau.', 'Sai — tự đá nửa sân không yểm trợ dễ để lộ khoảng trống.', 'Sai — tự chơi một mình không phù hợp với thi đấu đôi.']),
    Q('Vị trí đứng đôi?', ['Không sắp xếp', 'Trước-sau hoặc trái-phải tuỳ chiến thuật', 'Đứng chéo góc sân, đối lưng nhau', 'Cùng vị trí'], 1, '2 chiến thuật vị trí phổ biến.',
      [
        '<b>Đội hình đá cầu đôi</b> có hai cách bố trí phổ biến tuỳ chiến thuật:<ul><li><b>Trước – sau:</b> một người lo phần trên (gần lưới), một người lo phần sau sân — hợp khi tấn công.</li><li><b>Trái – phải:</b> mỗi người giữ một nửa sân theo chiều ngang — hợp khi phòng thủ.</li></ul>',
        '<i>Linh hoạt:</i> đội giỏi biết <b>chuyển đổi đội hình</b> theo tình huống công – thủ. Đứng đối lưng nhau hay chồng cùng một vị trí đều khiến mất tầm quan sát và để hở sân.',
      ],
      ['Sai — không sắp xếp thì dễ chồng chéo và va nhau.', 'Đúng — đứng trước-sau hoặc trái-phải tuỳ chiến thuật là hai cách phổ biến.', 'Sai — đối lưng nhau khiến mất tầm quan sát chung.', 'Sai — cùng một vị trí làm trống nửa sân còn lại.']),
    Q('Khi cầu sang sân nhà, ai đá?', ['Người gần cầu hơn, đồng đội yểm trợ', 'Không ai đá', 'Cả hai cùng đá', 'Người đứng sau luôn đá bóng đầu tiên'], 0, 'Phân công rõ tránh va chạm.',
      [
        '<b>Phân công xử lý cầu</b> trong đá đôi: cầu rơi về phía ai gần hơn thì <code>người đó đá</code>, người còn lại lùi về <b>yểm trợ</b> và sẵn sàng cho pha tiếp theo.<ul><li>Quy ước rõ ràng tránh hai người cùng lao vào va nhau.</li><li>Cầu ở vùng giữa nên gọi tên để tránh nhường nhau bỏ cầu.</li></ul>',
        '<i>Then chốt:</i> không có quy tắc cứng "người sau luôn đá trước" — mà linh hoạt theo <b>vị trí cầu và sự ăn ý</b>. Cả hai cùng đá hoặc cùng bỏ đều là lỗi phối hợp.',
      ],
      ['Đúng — người gần cầu hơn xử lý, đồng đội yểm trợ để tránh va chạm.', 'Sai — bỏ cầu thì mất điểm ngay.', 'Sai — cả hai cùng lao vào dễ va chạm và lỡ cầu.', 'Sai — không phải lúc nào người đứng sau cũng đá trước.']),
    Q('Giao tiếp trong trận?', ['Chỉ giao tiếp sau khi kết thúc set', 'Im lặng', 'Gọi tên, ra hiệu, động viên', 'Cãi nhau'], 2, 'Giao tiếp giúp phối hợp tốt.',
      [
        '<b>Giao tiếp trong thi đấu đôi</b> là yếu tố quyết định sự ăn ý:<ul><li><b>Gọi tên / hô "của tôi" – "của bạn"</b> để phân công ngay trong pha cầu.</li><li><b>Ra hiệu</b> chiến thuật trước khi phát cầu.</li><li><b>Động viên</b> nhau giữ tinh thần khi bị dẫn điểm.</li></ul>',
        '<i>Vì sao quan trọng:</i> phải giao tiếp <b>ngay trong trận</b>, không thể đợi hết set mới trao đổi. Im lặng dễ gây hiểu nhầm; cãi nhau phá vỡ tinh thần đồng đội — cả hai đều làm đội yếu đi.',
      ],
      ['Sai — đợi hết set mới nói thì không kịp phối hợp trong pha cầu.', 'Sai — im lặng làm hai người dễ hiểu nhầm ý nhau.', 'Đúng — gọi tên, ra hiệu và động viên giúp phối hợp ăn ý.', 'Sai — cãi nhau phá vỡ tinh thần đồng đội.']),
  ]),

  M(7, 'Cầu lông — Kỹ thuật đôi nâng cao', [
    Q('Cầu lông đôi vị trí?', ['Cố định', 'Cùng đứng sau', 'Một người đứng giữa, một người đứng cuối sân', 'Trước-sau khi tấn công, ngang khi phòng thủ'], 3, 'Đội hình cầu lông đôi linh hoạt theo tình huống.',
      [
        '<b>Đội hình cầu lông đôi</b> thay đổi linh hoạt theo công – thủ:<ul><li><b>Khi tấn công:</b> đứng <code>trước – sau</code> — người trên lưới chặn, người dưới đập.</li><li><b>Khi phòng thủ:</b> đứng <code>ngang</code> — mỗi người giữ một nửa sân để đỡ smash.</li></ul>',
        '<i>Chuyển đổi liên tục:</i> trong một pha cầu, đôi giỏi xoay từ ngang sang trước–sau và ngược lại rất nhanh. Đứng <b>cố định</b> hay cùng đứng sau đều để hở vùng trên lưới, tạo cơ hội cho đối phương.',
      ],
      ['Sai — đội hình cố định không phù hợp với cầu lông đôi linh hoạt.', 'Sai — cùng đứng sau bỏ trống vùng trên lưới.', 'Sai — cách đứng này để hở nhiều khoảng trống.', 'Đúng — trước-sau khi tấn công, đứng ngang khi phòng thủ là chuẩn.']),
    Q('Tấn công cầu lông đôi?', ['Đập cầu mạnh + người trên lưới chặn', 'Chỉ phòng thủ', 'Đẩy bóng cao', 'Đẩy cầu cao sâu cuối sân đối thủ'], 0, 'Tấn công đập + chặn trên lưới hiệu quả.',
      [
        '<b>Tấn công đôi hiệu quả</b> dựa trên phối hợp đội hình trước – sau:<ul><li>Người phía sau <b>đập cầu (smash)</b> mạnh xuống.</li><li>Nếu đối phương đỡ được trả cầu sát lưới, người phía trước <b>chặn/bắt lưới</b> dứt điểm.</li></ul>',
        '<i>Nguyên tắc:</i> luôn ép cầu <b>xuống thấp</b> để đối phương phải đỡ lên, giữ thế chủ động. Đẩy cầu cao sâu là cách phòng thủ (chống đỡ), không tạo sức ép tấn công.',
      ],
      ['Đúng — một người đập mạnh, người kia chặn trên lưới rất hiệu quả.', 'Sai — chỉ phòng thủ thì không ghi được điểm.', 'Sai — đẩy bóng cao là phòng thủ, không phải tấn công.', 'Sai — đẩy cầu cao sâu là cách phòng thủ, không gây sức ép.']),
    Q('Cú smash hiệu quả khi?', ['Đối phương sát', 'Cầu sát đất', 'Khi cầu rơi sát lưới ở mép sân nhà', 'Cầu ở trên cao, đối phương ở xa'], 3, 'Smash tốt nhất khi cầu cao + đối thủ xa.',
      [
        '<b>Cú đập cầu (smash)</b> là vũ khí tấn công mạnh nhất, đập cầu từ trên cao cắm thẳng xuống sân đối phương với tốc độ lớn. Hiệu quả nhất khi <code>cầu ở trên cao</code> trong tầm với và <b>đối phương ở xa, mất vị trí</b>.',
        '<i>Khi nào không nên smash?</i> Cầu sát đất hay sát lưới thì không đủ độ cao để đập xuống — nên xử lý bằng cú net (đánh lưới). Smash đòi hỏi <b>điểm tiếp xúc cao và lực cổ tay</b>, đập đúng thời điểm mới ăn điểm.',
      ],
      ['Sai — đối phương ở sát rất dễ đỡ lại cú smash.', 'Sai — cầu sát đất không đủ độ cao để smash xuống.', 'Sai — cầu sát lưới ở sân nhà nên xử lý bằng cú net.', 'Đúng — smash hiệu quả nhất khi cầu ở trên cao và đối phương ở xa.']),
    Q('Cú net (cầu sát lưới)?', ['Đập mạnh', 'Cuốn cao', 'Dùng cổ tay khéo léo, đưa cầu sát lưới', 'Dùng cả cánh tay vung mạnh từ trên xuống'], 2, 'Net play đòi hỏi kỹ thuật cổ tay.',
      [
        '<b>Cú net (đánh cầu sát lưới)</b> là kỹ thuật tinh tế: dùng <code>cổ tay khéo léo</code> điều khiển cho cầu rơi nhẹ, sát mép trên lưới và đổ nhanh xuống sân đối phương.<ul><li>Lực nhẹ, kiểm soát chính xác hơn là dùng sức mạnh.</li><li>Buộc đối phương phải lao lên cứu cầu, mở khoảng trống phía sau.</li></ul>',
        '<i>Tránh:</i> đập mạnh hay cuốn cao ở sát lưới đều dễ làm cầu chạm lưới hoặc bay ra ngoài. Cú net là minh chứng "<b>khéo hơn mạnh</b>" trong cầu lông.',
      ],
      ['Sai — đập mạnh ở sát lưới dễ cầu chạm lưới hoặc ra ngoài.', 'Sai — cuốn cao tạo cơ hội cho đối thủ đập lại.', 'Đúng — cú net cần cổ tay khéo léo đưa cầu nhẹ sát lưới.', 'Sai — vung cả cánh tay mạnh không phù hợp với cú net tinh tế.']),
    Q('Sân cầu lông đôi rộng?', ['5,18m × 13,4m', '6 × 12m', '6,1m × 13,4m', '5 × 11m'], 2, 'Sân đôi rộng hơn sân đơn (6,1 vs 5,18m).',
      [
        '<b>Kích thước sân cầu lông</b>:<ul><li><b>Sân đôi:</b> rộng <code>6,1m</code> × dài <code>13,4m</code> — dùng toàn bộ bề ngang.</li><li><b>Sân đơn:</b> rộng 5,18m × dài 13,4m — hẹp hơn vì bỏ hai dải biên ngoài.</li></ul>',
        '<i>Vì sao đôi rộng hơn?</i> Có hai người nên cần phần sân ngang lớn hơn để bao quát. Biết đúng kích thước giúp <b>phán đoán cầu trong hay ngoài</b> chính xác khi thi đấu.',
      ],
      ['Sai — 5,18m là chiều rộng sân đơn chứ không phải sân đôi.', 'Sai — số đo này không đúng kích thước chuẩn.', 'Đúng — sân đôi rộng 6,1m và dài 13,4m.', 'Sai — kích thước này không khớp sân cầu lông tiêu chuẩn.']),
  ]),

  M(8, 'Bóng chuyền — Đập bóng', [
    Q('Đập bóng (smash/spike) là?', ['Tấn công mạnh từ trên cao xuống sân đối phương', 'Phát bóng cao sang sân đối thủ', 'Phòng thủ', 'Chuyền'], 0, 'Spike là cú tấn công chính trong bóng chuyền.',
      [
        '<b>Đập bóng (spike/smash)</b> là cú <code>tấn công chính</code> trong bóng chuyền: bật nhảy và đánh bóng mạnh từ trên cao cắm xuống sân đối phương.<ul><li>Là pha dứt điểm để ghi điểm trực tiếp.</li><li>Thường là bước thứ 3 trong chuỗi: đỡ bước 1 → chuyền (set) bước 2 → đập (spike) bước 3.</li></ul>',
        '<i>Phân biệt:</i> đập bóng là tấn công, khác với <b>phát bóng</b> (đưa bóng vào cuộc), <b>chuyền</b> (đưa bóng cho đồng đội) và <b>chắn</b> (phòng thủ tại lưới). Nắm rõ vai trò từng kỹ thuật giúp hiểu chiến thuật cả đội.',
      ],
      ['Đúng — đập bóng là cú tấn công mạnh từ trên cao xuống sân đối phương.', 'Sai — đó là cú phát bóng, không phải đập bóng.', 'Sai — đập bóng là tấn công chứ không phải phòng thủ.', 'Sai — chuyền là đưa bóng cho đồng đội, khác đập bóng.']),
    Q('Kỹ thuật đập bóng đúng?', ['Không nhảy', 'Lấy đà, nhảy cao, vung tay đập trên đỉnh đầu', 'Đập 2 tay', 'Đập sát ngực'], 1, 'Đập 1 tay từ trên đỉnh đầu sau khi nhảy.',
      [
        '<b>Kỹ thuật đập bóng</b> gồm bốn giai đoạn liền mạch:<ul><li><b>Lấy đà:</b> chạy đà 2–3 bước.</li><li><b>Giậm nhảy:</b> bật cao bằng cả hai chân.</li><li><b>Đập bóng:</b> vung một tay đánh bóng ở điểm <code>cao trên đỉnh đầu</code>.</li><li><b>Tiếp đất:</b> bằng hai chân, gối hơi chùng.</li></ul>',
        '<i>Vì sao đập một tay từ trên cao?</i> Tạo được <b>góc đập xuống và lực lớn nhất</b>. Không nhảy hay đập sát ngực thì bóng đi ngang, yếu, dễ bị chắn.',
      ],
      ['Sai — không nhảy thì không tạo được góc đập xuống.', 'Đúng — lấy đà, nhảy cao rồi vung tay đập trên đỉnh đầu là chuẩn.', 'Sai — đập bằng 2 tay không tạo lực mạnh như đập 1 tay.', 'Sai — đập sát ngực không có độ cao để dứt điểm.']),
    Q('Điểm tiếp xúc bóng?', ['Ngang ngực', 'Cao nhất có thể trong tầm vói', 'Khi bóng rơi sát mặt sân', 'Ngang vai'], 1, 'Tiếp xúc cao = góc đập tốt.',
      [
        '<b>Điểm tiếp xúc bóng</b> khi đập phải ở <code>vị trí cao nhất trong tầm với</code>, ngay phía trước – trên đỉnh đầu, lúc cơ thể đang ở đỉnh của cú nhảy.<ul><li>Tay vươn thẳng hết cỡ khi chạm bóng.</li><li>Cổ tay gập nhanh để tạo độ xoáy và điều hướng bóng.</li></ul>',
        '<i>Vì sao quan trọng:</i> tiếp xúc càng cao thì <b>góc đập xuống càng dốc</b>, bóng cắm mạnh và khó đỡ. Để bóng rơi xuống ngang vai hay ngực mới đập thì đã mất lợi thế độ cao.',
      ],
      ['Sai — tiếp xúc ngang ngực làm mất góc đập.', 'Đúng — chạm bóng ở điểm cao nhất trong tầm vói cho góc đập tốt.', 'Sai — để bóng rơi sát sân thì đã quá muộn để đập.', 'Sai — ngang vai vẫn thấp, không tận dụng được độ cao.']),
    Q('Lực đập từ?', ['Chỉ tay', 'Toàn thân: chân – hông – tay', 'Chỉ vai', 'Chỉ chân'], 1, 'Lực đập là chuỗi động học toàn thân.',
      [
        '<b>Nguồn lực của cú đập</b> là một <code>chuỗi động học toàn thân</code>: lực sinh ra từ chân (giậm nhảy) → truyền qua hông và thân (xoay vặn) → lên vai → cánh tay → cổ tay và bàn tay chạm bóng.<ul><li>Mỗi mắt xích cộng thêm lực, dồn hết vào điểm chạm.</li></ul>',
        '<i>Hệ quả:</i> chỉ dùng riêng tay hay riêng vai thì cú đập yếu. Phối hợp <b>nhịp nhàng cả cơ thể</b> mới tạo được cú đập mạnh và uy lực — đây là nguyên lý chung của nhiều động tác ném, đập trong thể thao.',
      ],
      ['Sai — chỉ dùng tay thì cú đập yếu.', 'Đúng — lực đập là chuỗi phối hợp từ chân, hông đến tay.', 'Sai — chỉ vai không đủ lực cho cú đập mạnh.', 'Sai — chỉ chân không tạo được lực vào bóng ở trên cao.']),
    Q('Sau khi đập, tiếp đất?', ['Một chân duỗi thẳng cứng để giữ thăng bằng', '2 chân, đầu gối hơi gập để giảm chấn', '1 chân', 'Cứng chân'], 1, 'Tiếp đất 2 chân + chùng gối tránh chấn thương.',
      [
        '<b>Tiếp đất an toàn</b> sau cú đập: rơi xuống bằng <code>cả hai chân</code> cùng lúc, <b>đầu gối hơi gập</b> để hấp thụ lực, giúp giảm chấn động lên khớp gối và cổ chân.<ul><li>Giữ thân cân bằng, sẵn sàng cho pha tiếp theo.</li><li>Tránh tiếp đất chạm lưới hay vạch giữa (phạm lỗi).</li></ul>',
        '<i>Nguy cơ:</i> tiếp đất bằng một chân hoặc chân duỗi thẳng cứng dồn toàn bộ lực vào một điểm, rất dễ <b>bong gân, chấn thương khớp gối</b>. Đây là kỹ năng an toàn quan trọng vì cú nhảy đập rất cao.',
      ],
      ['Sai — chân thẳng cứng dễ gây chấn thương khớp gối.', 'Đúng — tiếp đất bằng 2 chân, gối hơi gập giúp giảm chấn an toàn.', 'Sai — tiếp đất 1 chân dồn lực lớn, dễ chấn thương.', 'Sai — cứng chân khi tiếp đất gây sốc cho khớp.']),
  ]),

  M(9, 'Bóng chuyền — Chắn lưới (block)', [
    Q('Chắn lưới (block) là?', ['Tấn công', 'Đỡ cú đập đối phương ngay tại lưới', 'Chuyền', 'Phát bóng từ cuối sân sang đối thủ'], 1, 'Block là kỹ thuật phòng thủ tại lưới.',
      [
        '<b>Chắn lưới (block)</b> là kỹ thuật <code>phòng thủ tại lưới</code>: bật nhảy vươn hai tay cao qua lưới để chặn đường bóng từ cú đập của đối phương ngay khi nó vừa rời tay.<ul><li>Là tuyến phòng thủ đầu tiên của đội.</li><li>Chắn tốt có thể đẩy bóng ngược lại sân đối phương để ghi điểm.</li></ul>',
        '<i>Phân biệt:</i> chắn lưới là phòng thủ, khác hẳn đập bóng (tấn công), chuyền (đưa bóng cho đồng đội) hay phát bóng (đưa bóng vào cuộc). Đây là kỹ thuật then chốt của bóng chuyền hiện đại.',
      ],
      ['Sai — chắn lưới là phòng thủ, không phải tấn công.', 'Đúng — chắn lưới là chặn cú đập của đối phương ngay tại lưới.', 'Sai — chuyền là đưa bóng cho đồng đội, khác với chắn.', 'Sai — đó là cú phát bóng, không phải chắn lưới.']),
    Q('Vị trí chắn lưới?', ['Vị trí libero ở hàng sau', 'Hàng trên (3 vị trí trước)', 'Hàng dưới', 'Sân giữa'], 1, 'Chỉ vị trí hàng trên được chắn lưới.',
      [
        '<b>Ai được chắn lưới?</b> Theo luật, chỉ <code>3 cầu thủ hàng trên</code> (gần lưới) mới được phép nhảy chắn. Cầu thủ hàng sau và libero <b>không được</b> chắn lưới.<ul><li>Sân chia 6 vị trí, luân phiên xoay vòng (rotation) sau mỗi lần giành quyền phát.</li></ul>',
        '<i>Vì sao có luật này?</i> Để cân bằng tấn công – phòng thủ, tránh việc cả 6 người cùng dồn lên lưới. Libero là vị trí phòng thủ chuyên biệt ở hàng sau nên <b>không tham gia chắn và đập</b> trên lưới.',
      ],
      ['Sai — libero ở hàng sau không được chắn lưới.', 'Đúng — chỉ ba vị trí hàng trên mới được chắn lưới.', 'Sai — cầu thủ hàng sau không được lên chắn.', 'Sai — chắn lưới diễn ra tại lưới, không ở sân giữa.']),
    Q('Khi chắn?', ['Không nhảy', '1 tay', 'Nhảy thẳng, 2 tay vươn cao qua lưới', 'Nhảy chéo'], 2, '2 tay vươn cao + nhảy thẳng đứng.',
      [
        '<b>Kỹ thuật chắn lưới</b>: <code>bật nhảy thẳng đứng</code>, vươn <b>hai tay</b> cao qua mép lưới, các ngón tay xoè và căng, bàn tay hơi nghiêng để hướng bóng chắn xuống sân đối phương.<ul><li>Nhảy thẳng để không chạm lưới (lỗi).</li><li>Hai tay sát nhau che kín diện tích.</li></ul>',
        '<i>Vì sao hai tay, nhảy thẳng?</i> Hai tay che được vùng rộng hơn chắn một tay; nhảy thẳng giữ thăng bằng và tránh chạm lưới. Nhảy chéo dễ lệch điểm chắn và phạm lỗi va lưới.',
      ],
      ['Sai — không nhảy thì không vươn tay qua lưới được.', 'Sai — chắn 1 tay che được ít diện tích.', 'Đúng — nhảy thẳng và vươn cao 2 tay qua lưới mới chắn hiệu quả.', 'Sai — nhảy chéo dễ chạm lưới hoặc lệch điểm chắn.']),
    Q('Chắn 2 người gọi là?', ['Triple block', 'Double block', 'Single block', 'Half block (chắn nửa lưới)'], 1, 'Double block hiệu quả hơn single.',
      [
        '<b>Phân loại chắn lưới</b> theo số người tham gia:<ul><li><b>Single block:</b> một người chắn.</li><li><b>Double block:</b> hai người chắn cùng lúc.</li><li><b>Triple block:</b> ba người chắn (ít gặp, khi chống tay đập rất mạnh).</li></ul>',
        '<i>Vì sao chắn đôi hiệu quả hơn:</i> hai người che được <b>diện tích lớn hơn</b>, "bịt" nhiều hướng đập, buộc đối phương phải đập né khó hơn. Phối hợp double block ăn ý là dấu hiệu của đội phòng thủ tốt.',
      ],
      ['Sai — triple block là chắn 3 người.', 'Đúng — chắn 2 người gọi là double block, hiệu quả hơn chắn đơn.', 'Sai — single block là chắn 1 người.', 'Sai — không có thuật ngữ chắn nửa lưới này.']),
    Q('Lỗi chạm lưới?', ['Mất điểm cho đối phương', 'Không sao', 'Cảnh cáo', 'Tuỳ trọng tài'], 0, 'Chạm lưới là lỗi mất điểm trực tiếp.',
      [
        '<b>Lỗi chạm lưới</b>: theo luật bóng chuyền, cầu thủ <code>chạm vào lưới</code> trong lúc thực hiện động tác chơi bóng là phạm lỗi và <b>mất điểm trực tiếp</b> cho đối phương.<ul><li>Lỗi này hay xảy ra khi đập hoặc chắn sát lưới.</li><li>Vì vậy nhảy thẳng và kiểm soát tay rất quan trọng.</li></ul>',
        '<i>Một số lỗi tại lưới khác:</i> chạm bóng quá lưới sang sân đối phương, bước qua vạch giữa. Hiểu luật giúp <b>tránh mất điểm oan</b> trong những pha tranh chấp sát lưới.',
      ],
      ['Đúng — chạm lưới là lỗi và đối phương được điểm.', 'Sai — chạm lưới là phạm luật, không thể bỏ qua.', 'Sai — đây là lỗi mất điểm ngay chứ không chỉ cảnh cáo.', 'Sai — luật quy định rõ là lỗi, không phụ thuộc trọng tài.']),
  ]),

  M(10, 'Bóng rổ — Ném 3 điểm', [
    Q('Vạch 3 điểm cách rổ?', ['5m', '6,75m (FIBA) hoặc 7,24m (NBA)', '4m', '10m'], 1, 'FIBA 6,75m; NBA 7,24m.',
      [
        '<b>Vạch ném 3 điểm</b> là đường cong giới hạn vùng ghi 3 điểm. Khoảng cách tới tâm rổ: <code>6,75m theo FIBA</code> (luật quốc tế, áp dụng ở trường học, SEA Games) và <code>7,24m theo NBA</code>.<ul><li>Cú ném từ ngoài vạch được 3 điểm; trong vạch được 2 điểm.</li></ul>',
        '<i>Vì sao có vạch 3 điểm?</i> Để thưởng cho những cú ném xa khó hơn, tạo cơ hội lật ngược thế trận. Ghi nhớ con số <b>6,75m (FIBA)</b> vì đó là chuẩn các em gặp trong thi đấu học đường ở Việt Nam.',
      ],
      ['Sai — 5m gần hơn vạch 3 điểm thực tế.', 'Đúng — vạch 3 điểm cách rổ 6,75m theo FIBA và 7,24m theo NBA.', 'Sai — 4m quá gần so với vạch 3 điểm.', 'Sai — 10m xa hơn nhiều so với khoảng cách chuẩn.']),
    Q('Tư thế ném 3 điểm?', ['Đứng kiễng chân, hai tay giơ thẳng lên cao', 'Đứng thẳng, hai chân khép sát, ném bằng một tay', 'Đứng thẳng', 'Chân rộng bằng vai, đầu gối chùng, hai tay đỡ bóng, mắt nhìn rổ'], 3, 'BEEF: Balance, Eyes, Elbow, Follow-through.',
      [
        '<b>Tư thế ném rổ chuẩn</b> theo nguyên tắc <code>BEEF</code>:<ul><li><b>B</b>alance — chân rộng bằng vai, gối hơi chùng để giữ thăng bằng.</li><li><b>E</b>yes — mắt nhìn vào rổ (điểm ngắm).</li><li><b>E</b>lbow — khuỷu tay tạo chữ L, thẳng hàng với rổ.</li><li><b>F</b>ollow-through — vươn tay theo bóng sau khi ném.</li></ul>',
        '<i>Lực và thăng bằng:</i> chùng gối lấy đà từ chân, dồn lực lên qua thân – tay. Đứng kiễng chân hay khép chân sát đều làm <b>mất ổn định</b>, cú ném xa thiếu chính xác.',
      ],
      ['Sai — kiễng chân làm mất thăng bằng khi ném.', 'Sai — hai chân khép sát khó giữ ổn định cho cú ném xa.', 'Sai — chỉ đứng thẳng chưa đủ, cần chùng gối và lấy đà.', 'Đúng — chân rộng bằng vai, gối chùng, tay đỡ bóng, mắt nhìn rổ là tư thế chuẩn.']),
    Q('Khi ném, lực từ?', ['Chỉ tay', 'Chỉ vai', 'Chân – thân – tay phối hợp', 'Chỉ chân'], 2, 'Cả thân thể tham gia ném 3 điểm.',
      [
        '<b>Nguồn lực cú ném 3 điểm</b>: vì khoảng cách xa nên lực phải đến từ <code>cả cơ thể</code> — chùng gối lấy đà từ chân, truyền lực qua thân, lên vai, ra cánh tay và bật cổ tay khi bóng rời tay.<ul><li>Đây là cùng nguyên lý chuỗi động học như cú đập bóng chuyền.</li></ul>',
        '<i>Vì sao không chỉ dùng tay?</i> Ném xa chỉ bằng tay sẽ <b>thiếu lực và phải gắng sức</b>, làm sai kỹ thuật và lệch hướng. Phối hợp toàn thân giúp cú ném vừa đủ tầm vừa giữ được độ chính xác.',
      ],
      ['Sai — chỉ tay không đủ lực ném từ xa.', 'Sai — chỉ vai thì cú ném thiếu lực và độ chính xác.', 'Đúng — lực ném đến từ phối hợp chân, thân và tay.', 'Sai — chỉ chân không truyền lực được vào bóng khi ném.']),
    Q('Bóng ra khỏi tay với?', ['Không xoay', 'Xoay xuôi', 'Xoáy ngang (sidespin) sang trái', 'Spin (xoáy) ngược'], 3, 'Backspin giúp bóng ổn định và "bounce in" khi chạm vành.',
      [
        '<b>Độ xoáy ngược (backspin)</b>: khi bật cổ tay đúng cách, bóng rời tay với độ <code>xoáy ngược</code> (quay về phía người ném). Đây là dấu hiệu của cú ném kỹ thuật tốt.<ul><li>Xoáy ngược giúp bóng <b>bay ổn định</b> trong không khí.</li><li>Khi chạm vành rổ, bóng có xu hướng "rơi vào" (bounce in) thay vì bật ra.</li></ul>',
        '<i>Tạo backspin thế nào?</i> Gập – bật cổ tay dứt khoát và vươn các ngón tay theo bóng (follow-through). Bóng không xoay hay xoáy ngang đều kém ổn định và <b>khó vào rổ</b> hơn.',
      ],
      ['Sai — bóng không xoay sẽ kém ổn định trong không khí.', 'Sai — xoay xuôi không giúp bóng nảy vào rổ khi chạm vành.', 'Sai — xoáy ngang làm bóng lệch hướng.', 'Đúng — xoáy ngược giúp bóng ổn định và dễ nảy vào khi chạm vành.']),
    Q('Để giỏi ném 3 điểm, cần?', ['Tập đều, đúng kỹ thuật, kiên trì', 'May mắn', 'Tự nhiên', 'Không tập'], 0, 'Lặp lại đúng kỹ thuật là chìa khoá.',
      [
        '<b>Bí quyết ném 3 điểm giỏi</b>: <code>lặp lại đúng kỹ thuật</code> hàng nghìn lần để động tác thành phản xạ ổn định (muscle memory).<ul><li>Tập <b>đều đặn</b>, đúng tư thế BEEF mỗi lần ném.</li><li>Sửa sai ngay, không lặp lại lỗi.</li><li>Kiên trì qua thời gian dài.</li></ul>',
        '<i>Thông điệp:</i> không có cú ném "tự nhiên" hay nhờ may mắn — mọi tay ném giỏi đều là kết quả của <b>khổ luyện đúng phương pháp</b>. Đây cũng là tinh thần tự rèn luyện mà GDTC muốn xây dựng.',
      ],
      ['Đúng — tập đều, đúng kỹ thuật và kiên trì là chìa khoá ném giỏi.', 'Sai — may mắn không thay được luyện tập.', 'Sai — kỹ năng ném không tự nhiên mà có, phải rèn.', 'Sai — không tập thì không thể giỏi ném 3 điểm.']),
  ]),

  M(11, 'Bóng rổ — Phòng thủ và tấn công', [
    Q('Phòng thủ kèm người (man-to-man)?', ['Mỗi cầu thủ kèm 1 đối thủ cố định', 'Khu vực', 'Hỗn hợp', 'Chỉ kèm người đang giữ bóng, bỏ người khác'], 0, 'Man-to-man là kèm chặt 1-1.',
      [
        '<b>Phòng thủ kèm người (man-to-man)</b>: mỗi cầu thủ được phân công <code>kèm chặt một đối thủ cố định</code>, theo sát người đó di chuyển khắp sân, cản đường chuyền và đường ném.<ul><li>Đề cao trách nhiệm cá nhân và thể lực.</li><li>Gây áp lực trực tiếp lên từng đối thủ.</li></ul>',
        '<i>So sánh:</i> đây là một trong hai hệ thống phòng thủ cơ bản, đối lập với phòng thủ khu vực (zone). Man-to-man hiệu quả khi cả đội <b>thể lực tốt và kỷ luật</b> bám người.',
      ],
      ['Đúng — man-to-man là mỗi cầu thủ kèm chặt một đối thủ cố định.', 'Sai — kèm theo khu vực là zone defense, không phải man-to-man.', 'Sai — hỗn hợp là kiểu phòng thủ kết hợp, không phải kèm người thuần.', 'Sai — chỉ kèm người giữ bóng để hở các đối thủ khác.']),
    Q('Phòng thủ khu vực (zone)?', ['Đứng tập trung quanh vạch ném phạt', 'Kèm 1-1', 'Không phòng thủ', 'Mỗi cầu thủ phòng thủ 1 khu vực sân'], 3, 'Zone defense phân chia khu vực sân.',
      [
        '<b>Phòng thủ khu vực (zone defense)</b>: thay vì kèm người, mỗi cầu thủ <code>chịu trách nhiệm một khu vực sân</code> nhất định, phòng thủ bất kỳ đối thủ nào lọt vào vùng của mình.<ul><li>Sơ đồ phổ biến: 2-3, 3-2, 1-3-1.</li><li>Bảo vệ tốt khu vực gần rổ.</li></ul>',
        '<i>Khi nào dùng zone?</i> Khi muốn <b>tiết kiệm thể lực</b>, bịt vùng trong hoặc đối phó với đội đối phương đi bóng cá nhân giỏi. Đối lập với man-to-man; nhiều đội kết hợp cả hai (phòng thủ hỗn hợp).',
      ],
      ['Sai — chỉ tụ quanh vạch ném phạt để hở nhiều vùng khác.', 'Sai — kèm 1-1 là man-to-man chứ không phải zone.', 'Sai — zone vẫn là một cách phòng thủ tích cực.', 'Đúng — mỗi cầu thủ phụ trách một khu vực sân là phòng thủ zone.']),
    Q('Pick and roll là?', ['Ném 3 điểm sau khi nhận bóng từ chuyền dài', 'Phát bóng', 'Chiến thuật chắn + lăn tới rổ', 'Phòng thủ'], 2, 'Pick and roll là chiến thuật tấn công kinh điển.',
      [
        '<b>Pick and roll</b> là chiến thuật <code>tấn công phối hợp 2 người</code> kinh điển:<ul><li><b>Pick (chắn):</b> một đồng đội đứng chắn (đặt màn) cản hậu vệ đối phương đang kèm người cầm bóng.</li><li><b>Roll (lăn):</b> sau khi chắn, người đó xoay người lăn nhanh về phía rổ để nhận bóng.</li></ul>',
        '<i>Hiệu quả:</i> tạo ra <b>khoảng trống và tình huống thừa người</b> — hoặc người cầm bóng thoát đi ném, hoặc chuyền cho người lăn vào rổ. Đây là chiến thuật tấn công, không phải phòng thủ.',
      ],
      ['Sai — đó chỉ là một cú ném 3, không phải pick and roll.', 'Sai — pick and roll không phải động tác phát bóng.', 'Đúng — pick and roll là một người chắn rồi lăn người tới rổ để nhận bóng.', 'Sai — pick and roll là chiến thuật tấn công, không phải phòng thủ.']),
    Q('Lỗi cá nhân khi?', ['Phạm lỗi với đối thủ (đẩy, chặn không hợp lệ...)', 'Phòng thủ tốt', 'Đánh đầu', 'Ném tốt'], 0, 'Personal foul khi phạm luật với đối thủ.',
      [
        '<b>Lỗi cá nhân (personal foul)</b> trong bóng rổ là khi cầu thủ có <code>tiếp xúc phạm luật</code> với đối thủ: đẩy, kéo, chặn không hợp lệ, đánh tay khi đối phương ném...<ul><li>Mỗi lỗi được trọng tài ghi nhận cho cá nhân.</li><li>Đủ số lỗi quy định (5 theo FIBA) thì bị truất quyền thi đấu.</li></ul>',
        '<i>Phân biệt:</i> phòng thủ tốt, di chuyển chân đúng cách <b>không phải lỗi</b>. Hiểu rõ thế nào là tiếp xúc phạm luật giúp phòng thủ "sạch", tránh tặng đối phương quả ném phạt.',
      ],
      ['Đúng — lỗi cá nhân là khi phạm luật với đối thủ như đẩy hay chặn không hợp lệ.', 'Sai — phòng thủ đúng luật không bị tính lỗi.', 'Sai — đánh đầu không phải động tác trong bóng rổ.', 'Sai — ném bóng giỏi không bị tính là lỗi.']),
  ]),

  M(12, 'Bóng đá — Sút phạt', [
    Q('Đá phạt trực tiếp do?', ['Tự chọn', 'Phạm lỗi cấm hoặc handball trong vòng', 'Bóng ra ngoài đường biên ngang', 'Lỗi việt vị của tiền đạo'], 1, 'Đá phạt trực tiếp khi có lỗi nghiêm trọng.',
      [
        '<b>Đá phạt trực tiếp (direct free kick)</b> được hưởng khi đối phương phạm <code>lỗi nghiêm trọng</code>: đá, ngáng, xô đẩy, kéo người hoặc <b>chơi bóng bằng tay (handball)</b>.<ul><li>Bóng từ cú đá phạt trực tiếp có thể <b>vào thẳng khung thành tính bàn</b>.</li><li>Khác đá phạt gián tiếp (phải chạm người thứ hai mới hợp lệ).</li></ul>',
        '<i>Phân biệt tình huống:</i> bóng ra biên ngang dẫn tới phạt góc/phát bóng; lỗi việt vị dẫn tới đá phạt gián tiếp. Hiểu đúng loại lỗi giúp <b>biết cách tổ chức tấn công hoặc dựng hàng rào phòng thủ</b>.',
      ],
      ['Sai — đá phạt do trọng tài thổi lỗi, không phải tự chọn.', 'Đúng — đá phạt trực tiếp xảy ra khi có lỗi cấm hoặc chơi bóng bằng tay.', 'Sai — bóng ra biên ngang dẫn tới phạt góc hoặc phát bóng, không phải đá phạt.', 'Sai — lỗi việt vị dẫn tới đá phạt gián tiếp.']),
    Q('Hàng rào cách bóng?', ['Tối thiểu 9,15m (10 yards)', '5m', '15m', '20m'], 0, '9,15m là luật FIFA.',
      [
        '<b>Hàng rào (wall)</b> là hàng cầu thủ đứng chắn trước khung thành khi đối phương đá phạt. Luật FIFA quy định hàng rào phải cách bóng <code>tối thiểu 9,15m</code> (tương đương 10 yards).<ul><li>Trọng tài thường dùng bình xịt đánh dấu vạch 9,15m.</li><li>Đứng gần hơn là phạm luật, có thể bị phạt thẻ.</li></ul>',
        '<i>Vai trò hàng rào:</i> che một góc khung thành buộc người đá phải sút qua hoặc vòng qua hàng rào — đó là lý do có kỹ thuật <b>sút phạt cong</b> để đưa bóng "lượn" qua hàng rào vào góc.',
      ],
      ['Đúng — hàng rào phải cách bóng tối thiểu 9,15m theo luật FIFA.', 'Sai — 5m gần hơn quy định, dễ cản cú đá.', 'Sai — 15m xa hơn mức luật yêu cầu.', 'Sai — 20m không đúng khoảng cách chuẩn của hàng rào.']),
    Q('Kỹ thuật đá phạt cong?', ['Dùng mu ngoài bàn chân, đá thẳng tâm bóng', 'Mũi giày', 'Dùng gót chân giật ngược về sau', 'Dùng mu trong bàn chân, đá lệch tâm bóng'], 3, 'Mu trong + đá lệch tâm tạo độ xoáy cong.',
      [
        '<b>Sút phạt cong</b> (đường bóng "chuối"): dùng <code>mu trong bàn chân</code> tiếp xúc <b>lệch tâm bóng</b> (chạm vào một bên), tạo độ <b>xoáy ngang</b> khiến bóng bay cong trong không khí.<ul><li>Bóng có thể vòng qua hàng rào rồi đổi hướng vào góc khung thành.</li><li>Lực và điểm chạm quyết định độ cong.</li></ul>',
        '<i>Vì sao bóng cong?</i> Hiệu ứng Magnus: bóng xoáy làm áp suất không khí hai bên khác nhau, đẩy bóng lệch hướng. Đá thẳng tâm bóng thì <b>bóng đi thẳng</b>, không cong.',
      ],
      ['Sai — đá thẳng tâm bóng không tạo được độ cong.', 'Sai — mũi giày làm bóng đi thiếu kiểm soát, không cong đẹp.', 'Sai — đá gót về sau không dùng để sút phạt cong.', 'Đúng — dùng mu trong đá lệch tâm bóng mới tạo độ xoáy cong.']),
    Q('Đá phạt 11m (penalty)?', ['Đá phạt trực tiếp tại chấm 11m, không hàng rào', 'Có hàng rào', '20m', 'Tuỳ chọn'], 0, 'Penalty kick tại 11m, chỉ thủ môn cản.',
      [
        '<b>Phạt đền (penalty kick)</b>: khi đội phòng thủ phạm lỗi trực tiếp <code>trong vòng cấm địa</code> của mình, đối phương được đá phạt từ chấm <b>11m</b> trước khung thành.<ul><li><b>Không có hàng rào</b> — chỉ thủ môn được cản phá.</li><li>Thủ môn phải đứng trên vạch vôi cho tới khi bóng được đá.</li></ul>',
        '<i>Cơ hội ghi bàn cao:</i> vì 1 chọi 1 với thủ môn ở cự ly gần, penalty là tình huống nguy hiểm bậc nhất. Khi hai đội hoà ở vòng loại trực tiếp, có thể phải <b>sút luân lưu</b> từ chấm 11m để phân thắng bại.',
      ],
      ['Đúng — penalty là đá phạt tại chấm 11m, không có hàng rào, chỉ thủ môn cản.', 'Sai — đá penalty không có hàng rào.', 'Sai — chấm phạt đền cách khung thành 11m chứ không phải 20m.', 'Sai — vị trí và cách đá penalty cố định, không tuỳ chọn.']),
    Q('Khi đá phạt, mắt nhìn?', ['Nhìn bóng + định hướng đích trước, không nhìn thủ môn', 'Nhắm mắt', 'Nhìn thủ môn', 'Nhìn lung tung'], 0, 'Định hướng trước, tập trung vào bóng khi đá.',
      [
        '<b>Quan sát khi sút phạt</b>: <code>định hướng đích đến trước</code> (chọn góc sút khi quan sát hàng rào, thủ môn từ xa), rồi khi vào sút thì <b>tập trung nhìn vào bóng</b> để chạm bóng chính xác.<ul><li>Quyết định góc sút sớm, không đổi ý phút chót.</li><li>Mắt vào bóng đảm bảo điểm tiếp xúc đúng.</li></ul>',
        '<i>Tránh:</i> chăm chăm nhìn thủ môn khi sút dễ bị "<b>bắt bài</b>" và đá lỡ; nhắm mắt thì mất hoàn toàn kiểm soát. Tâm lý vững và quy trình ổn định là yếu tố quan trọng của người sút phạt giỏi.',
      ],
      ['Đúng — định hướng đích trước rồi tập trung nhìn bóng khi đá.', 'Sai — nhắm mắt làm mất kiểm soát cú đá.', 'Sai — chăm chăm nhìn thủ môn dễ đá lỡ và bị bắt bài.', 'Sai — nhìn lung tung khiến mất tập trung vào bóng.']),
  ]),

  M(13, 'Bóng đá — Phòng thủ và tấn công cơ bản', [
    Q('Phòng thủ cá nhân tốt khi?', ['Đứng xa', 'Chờ đối thủ chuyền sai rồi mới di chuyển', 'Bám sát, chặn đường chuyền, lấy bóng đúng lúc', 'Mặc kệ'], 2, 'Phòng thủ chủ động.',
      [
        '<b>Phòng thủ cá nhân tốt</b> là phòng thủ <code>chủ động</code>: bám sát đối thủ ở khoảng cách hợp lý, dùng vị trí cơ thể che hướng nguy hiểm, <b>chặn đường chuyền</b> và chọn đúng thời điểm xoạc/cướp bóng.<ul><li>Giữ thân thấp, mắt nhìn bóng.</li><li>Không lao vào ẩu khi đối thủ còn kiểm soát tốt.</li></ul>',
        '<i>Tránh:</i> đứng xa tạo khoảng trống để đối thủ thoải mái xử lý; chỉ chờ đợi là phòng thủ <b>bị động</b>, dễ bị vượt qua. Phòng thủ giỏi là gây áp lực buộc đối thủ mắc sai lầm.',
      ],
      ['Sai — đứng xa tạo khoảng trống cho đối thủ xử lý bóng.', 'Sai — chỉ chờ đợi là phòng thủ bị động, dễ bị vượt qua.', 'Đúng — bám sát, chặn đường chuyền và lấy bóng đúng lúc là phòng thủ chủ động.', 'Sai — mặc kệ thì đối thủ dễ dàng tấn công.']),
    Q('Phối hợp tấn công cơ bản?', ['Chuyền – chạy chỗ – mở khoảng trống', 'Ôm bóng', 'Sút xa từ giữa sân về phía khung thành', 'Chuyền ngược về thủ môn để câu giờ'], 0, 'Bóng đá hiện đại tập trung phối hợp.',
      [
        '<b>Phối hợp tấn công cơ bản</b> dựa trên ba việc làm liên tục:<ul><li><b>Chuyền bóng</b> nhanh, chính xác cho đồng đội.</li><li><b>Chạy chỗ (di chuyển không bóng)</b> để tạo phương án nhận bóng.</li><li><b>Mở khoảng trống</b> kéo giãn hàng thủ đối phương.</li></ul>',
        '<i>Bóng đá hiện đại</i> đề cao lối chơi tập thể: bóng di chuyển nhanh hơn người. Ôm bóng làm chậm nhịp và dễ mất bóng; sút xa bừa hiệu quả thấp; chuyền về thủ môn câu giờ là phòng ngự, <b>không phải tấn công</b>.',
      ],
      ['Đúng — chuyền, chạy chỗ và mở khoảng trống là phối hợp tấn công cơ bản.', 'Sai — ôm bóng làm chậm nhịp và dễ mất bóng.', 'Sai — sút xa bừa từ giữa sân hiệu quả thấp.', 'Sai — chuyền về thủ môn để câu giờ không phải tấn công.']),
    Q('Việt vị xảy ra khi?', ['Trong vòng cấm', 'Khi cầu thủ chạy nhanh hơn hậu vệ', 'Cầu thủ tấn công đứng dưới hậu vệ cuối khi bóng được chuyền', 'Tại trung lộ'], 2, 'Luật việt vị bảo vệ tính công bằng.',
      [
        '<b>Luật việt vị (offside)</b>: cầu thủ tấn công bị việt vị nếu vào <code>thời điểm đồng đội chuyền bóng</code>, anh ta đứng ở phần sân đối phương và <b>gần đường biên ngang cuối sân hơn cả bóng lẫn hậu vệ áp chót</b> (thường là hậu vệ cuối cùng).<ul><li>Mốc xét là lúc bóng được chuyền, không phải lúc nhận bóng.</li></ul>',
        '<i>Mục đích:</i> ngăn tiền đạo "rình" sẵn sát khung thành chờ bóng, bảo đảm <b>tính công bằng</b> của tấn công. Chạy nhanh hơn hậu vệ hay vị trí trung lộ không phải tiêu chí việt vị.',
      ],
      ['Sai — việt vị không chỉ giới hạn trong vòng cấm.', 'Sai — chạy nhanh hơn hậu vệ không phải tiêu chí việt vị.', 'Đúng — việt vị khi cầu thủ tấn công đứng dưới hậu vệ cuối lúc bóng được chuyền.', 'Sai — vị trí trung lộ không phải yếu tố xác định việt vị.']),
    Q('Thẻ vàng có nghĩa?', ['Đổi cầu thủ', 'Phạt tiền', 'Cảnh cáo', 'Truất quyền'], 2, 'Thẻ vàng cảnh cáo; 2 vàng = đỏ = truất.',
      [
        '<b>Thẻ vàng</b> là hình thức <code>cảnh cáo</code> của trọng tài với cầu thủ phạm lỗi (chơi xấu, phản ứng, câu giờ...).<ul><li><b>2 thẻ vàng</b> trong một trận = <b>1 thẻ đỏ</b> → bị truất quyền thi đấu, rời sân và đội phải đá thiếu người.</li><li><b>Thẻ đỏ trực tiếp</b> cho lỗi rất nghiêm trọng.</li></ul>',
        '<i>Ý nghĩa kỷ luật:</i> hệ thống thẻ giữ cho trận đấu <b>an toàn và fair play</b>. Thẻ vàng nhắc nhở; tích đủ thẻ qua giải còn dẫn tới treo giò ở trận sau.',
      ],
      ['Sai — thẻ vàng không phải lệnh thay người.', 'Sai — thẻ vàng trên sân là cảnh cáo, không phải phạt tiền.', 'Đúng — thẻ vàng là cảnh cáo; 2 thẻ vàng thành thẻ đỏ và bị truất.', 'Sai — thẻ đỏ mới truất quyền, thẻ vàng chỉ cảnh cáo.']),
  ]),

  M(14, 'Ôn tập + Kiểm tra giữa HK1', [
    Q('Khởi động trước tập có ý nghĩa?', ['Làm nóng cơ sau buổi tập là đủ', 'Tốn sức', 'Không cần', 'Tránh chấn thương, tăng hiệu quả'], 3, 'Khởi động bắt buộc trước khi tập.',
      [
        '<b>Ôn tập — Khởi động</b>: nhắc lại kiến thức nền của cả nửa học kì. Khởi động phải làm <code>TRƯỚC</code> buổi tập, nhằm hai mục tiêu: <b>tránh chấn thương</b> và <b>tăng hiệu quả vận động</b>.<ul><li>Làm nóng cơ, trơn khớp, khởi động tim mạch.</li><li>Trình tự: Khởi động → Tập chính → Thả lỏng.</li></ul>',
        '<i>Phân biệt:</i> làm nóng "sau" buổi tập là nhầm lẫn — sau tập là phần thả lỏng. Khởi động không hao sức mà giúp cơ thể <b>sẵn sàng</b>; bỏ qua nó là sai lầm an toàn cơ bản.',
      ],
      ['Sai — khởi động phải làm trước khi tập, không phải sau.', 'Sai — khởi động không làm hao sức mà giúp cơ thể sẵn sàng.', 'Sai — khởi động là bước bắt buộc trước mỗi buổi tập.', 'Đúng — khởi động giúp tránh chấn thương và tăng hiệu quả tập.']),
    Q('Chạy bền cần?', ['Linh hoạt tối đa', 'Tốc độ tối đa', 'Sức mạnh tối đa', 'Sức bền + nhịp thở đều'], 3, 'Aerobic endurance là then chốt.',
      [
        '<b>Ôn tập — Chạy bền</b>: yếu tố cốt lõi là <code>sức bền tim mạch (aerobic)</code> kết hợp <b>nhịp thở đều</b>. Đây là khả năng duy trì vận động kéo dài, khác hẳn với tốc độ hay sức mạnh tối đa.<ul><li>Tốc độ tối đa → chạy ngắn (sprint).</li><li>Sức mạnh tối đa → tập tạ.</li><li>Linh hoạt → giãn cơ, yoga.</li></ul>',
        '<i>Nhớ lại:</i> nhịp thở đều (ví dụ 2–2) và tư thế thoải mái giúp <b>chạy lâu không hụt hơi</b>. Chạy bền là nền tảng thể lực cho bài kiểm tra cuối cấp.',
      ],
      ['Sai — linh hoạt hỗ trợ nhưng không phải cốt lõi chạy bền.', 'Sai — tốc độ tối đa là của chạy ngắn.', 'Sai — sức mạnh tối đa thuộc tập tạ, không phải chạy bền.', 'Đúng — chạy bền cần sức bền tim mạch và nhịp thở đều.']),
    Q('Đá cầu cú nào cơ bản?', ['Đá gối', 'Đá hông', 'Mu bàn chân + má trong + má ngoài', 'Đá đầu'], 2, '3 kỹ thuật cơ bản.',
      [
        '<b>Ôn tập — Đá cầu</b>: ba kỹ thuật <code>cơ bản</code> phân theo phần chân tiếp xúc cầu là <b>đá mu bàn chân, đá má trong, đá má ngoài</b>.<ul><li>Mu bàn chân: tâng và đá chính diện.</li><li>Má trong / má ngoài: điều cầu đi chếch hai bên.</li></ul>',
        '<i>Phân biệt:</i> đá gối, đá hông là kỹ thuật <b>nâng cao</b>, không thuộc nhóm cơ bản; đá đầu không phải kỹ thuật đá cầu. Sân chuẩn 11,88 × 6,1m, lưới nam 1,5m – nữ 1,4m, mỗi set 21 điểm.',
      ],
      ['Sai — đá gối không thuộc nhóm kỹ thuật cơ bản.', 'Sai — đá hông là kỹ thuật nâng cao hơn.', 'Đúng — mu bàn chân, má trong và má ngoài là ba cú cơ bản.', 'Sai — đá đầu không phải kỹ thuật cơ bản của đá cầu.']),
    Q('Bóng chuyền — đập bóng cần?', ['Đứng yên dưới đất rồi đập bóng ngang vai', 'Nhảy cao + vung tay từ trên đỉnh đầu', 'Không nhảy', 'Đập sát đất'], 1, 'Đập bóng tốt = nhảy cao + tiếp xúc trên đỉnh.',
      [
        '<b>Ôn tập — Đập bóng</b>: kỹ thuật đúng là <code>lấy đà → nhảy cao → vung tay đập ở điểm cao trên đỉnh đầu → tiếp đất 2 chân</code>.<ul><li>Tiếp xúc bóng càng cao, góc đập xuống càng dốc.</li><li>Lực đập là chuỗi toàn thân: chân – hông – tay.</li></ul>',
        '<i>Nhớ lại chuỗi 3 bước</i> của một pha tấn công bóng chuyền: đỡ → chuyền (set) → đập (spike). Không nhảy hay đập ngang vai đều làm bóng <b>yếu và dễ bị chắn</b>.',
      ],
      ['Sai — đứng yên đập ngang vai không tạo góc và lực.', 'Đúng — nhảy cao và vung tay đập từ trên đỉnh đầu là kỹ thuật đúng.', 'Sai — không nhảy thì không có độ cao để đập xuống.', 'Sai — đập sát đất không phải động tác đập bóng tấn công.']),
    Q('Bóng rổ — ném 3 điểm cách rổ?', ['6,75m (FIBA)', '20m', '10m', '4m'], 0, '6,75m theo FIBA.',
      [
        '<b>Ôn tập — Ném 3 điểm</b>: vạch 3 điểm cách rổ <code>6,75m theo FIBA</code> (chuẩn thi đấu học đường và quốc tế), NBA là 7,24m.<ul><li>Ngoài vạch: 3 điểm; trong vạch: 2 điểm; ném phạt: 1 điểm.</li><li>Tư thế ném theo nguyên tắc <b>BEEF</b>.</li></ul>',
        '<i>Nhớ kỹ thuật:</i> chân rộng bằng vai, gối chùng, mắt nhìn rổ, vươn tay theo bóng tạo xoáy ngược (backspin). Lực đến từ <b>phối hợp chân – thân – tay</b>, không chỉ riêng tay.',
      ],
      ['Đúng — vạch 3 điểm cách rổ 6,75m theo luật FIBA.', 'Sai — 20m xa hơn nhiều so với vạch 3 điểm.', 'Sai — 10m không đúng khoảng cách chuẩn.', 'Sai — 4m gần hơn vạch 3 điểm thực tế.']),
  ]),

  M(15, 'Võ thuật — Vovinam giới thiệu', [
    Q('Vovinam – Việt Võ Đạo có nguồn gốc?', ['Hàn Quốc', 'Việt Nam, sáng tổ Nguyễn Lộc, 1938', 'Trung Quốc', 'Nhật Bản'], 1, 'Vovinam do Nguyễn Lộc sáng lập tại Hà Nội 1938.',
      [
        '<b>Vovinam – Việt Võ Đạo</b> là môn võ <code>thuần Việt</code>, do võ sư <b>Nguyễn Lộc</b> sáng lập tại Hà Nội năm <b>1938</b>.<ul><li>"Vovinam" ghép từ "Võ Việt Nam".</li><li>Là niềm tự hào dân tộc, nay đã phát triển ra hơn 60 quốc gia.</li></ul>',
        '<i>Giá trị giáo dục:</i> Vovinam không chỉ dạy võ mà còn rèn <b>võ đạo</b> — tinh thần, đạo đức và lòng yêu nước. Đây là nội dung thể thao tự chọn được nhiều trường ở Việt Nam đưa vào chương trình GDTC.',
      ],
      ['Sai — Vovinam không khởi nguồn từ Hàn Quốc.', 'Đúng — Vovinam do Nguyễn Lộc sáng lập tại Việt Nam năm 1938.', 'Sai — Vovinam là môn võ của Việt Nam, không phải Trung Quốc.', 'Sai — Vovinam không có nguồn gốc từ Nhật Bản.']),
    Q('Đặc trưng kỹ thuật Vovinam?', ['Chỉ vật', 'Đòn chân tấn công + đòn tay phối hợp + đòn vật, khoá', 'Chỉ đấm', 'Chỉ đá'], 1, 'Vovinam toàn diện: tay + chân + vật + khoá.',
      [
        '<b>Kỹ thuật Vovinam</b> mang tính <code>toàn diện</code>, gồm bốn nhóm phối hợp:<ul><li><b>Đòn chân</b> (đặc trưng: các "đòn chân tấn công" bay người kẹp cổ).</li><li><b>Đòn tay</b> (đấm, chém, gạt).</li><li><b>Đòn vật</b> và <b>đòn khoá – gỡ</b>.</li></ul>',
        '<i>Nét riêng:</i> hệ thống <b>21 đòn chân tấn công</b> là dấu ấn nổi bật của Vovinam. Sự kết hợp đầy đủ tay – chân – vật – khoá khiến Vovinam phong phú hơn nhiều môn chỉ thiên về một loại đòn.',
      ],
      ['Sai — Vovinam không chỉ có đòn vật.', 'Đúng — Vovinam toàn diện gồm đòn chân, đòn tay, đòn vật và khoá.', 'Sai — Vovinam không chỉ gói gọn trong đòn đấm.', 'Sai — Vovinam không chỉ dùng đòn đá.']),
    Q('Tinh thần Vovinam?', ['Cương nhu phối triển, võ đạo dân tộc', 'Cứng nhắc', 'Chỉ tự vệ', 'Chỉ tập đối kháng, không tập quyền'], 0, '"Cương nhu phối triển" là triết lý Vovinam.',
      [
        '<b>Triết lý Vovinam</b> cô đọng trong câu <code>"Cương nhu phối triển"</code>: kết hợp hài hoà giữa <b>cương</b> (cứng, mạnh mẽ) và <b>nhu</b> (mềm, linh hoạt), tuỳ tình huống mà vận dụng.<ul><li>Gắn với tinh thần <b>võ đạo dân tộc</b> và lòng yêu nước.</li></ul>',
        '<i>Ý nghĩa:</i> không cứng nhắc một chiều, không chỉ tự vệ đơn thuần. Người học Vovinam rèn cả <b>thân – tâm</b>: kỹ thuật giỏi đi đôi với đạo đức và bản lĩnh sống.',
      ],
      ['Đúng — Vovinam theo triết lý cương nhu phối triển và võ đạo dân tộc.', 'Sai — cương nhu kết hợp chứ không cứng nhắc một chiều.', 'Sai — Vovinam không chỉ giới hạn ở tự vệ.', 'Sai — Vovinam tập cả quyền lẫn đối kháng.']),
    Q('Lễ tiết khi luyện tập?', ['Chỉ chào khi gặp sư trưởng môn', 'Sau buổi', 'Chào sư, chào đồng môn, lễ phép', 'Không cần'], 2, 'Võ đạo coi trọng lễ tiết.',
      [
        '<b>Lễ tiết trong võ đạo</b> là phần không thể thiếu: <code>chào thầy (sư), chào đồng môn</code>, giữ thái độ lễ phép, khiêm tốn cả trong và ngoài võ đường.<ul><li>"Tiên học lễ, hậu học võ" — học lễ nghĩa trước, học võ sau.</li><li>Vovinam có nghi thức chào tay đặt lên ngực ("bàn tay thép đặt trên trái tim từ ái").</li></ul>',
        '<i>Vì sao quan trọng:</i> lễ tiết rèn <b>sự tôn trọng và tự kiểm soát</b>, ngăn lạm dụng võ thuật. Đây chính là điểm phân biệt người học võ chân chính với kẻ chỉ biết đánh nhau.',
      ],
      ['Sai — lễ tiết áp dụng cả với đồng môn chứ không chỉ với thầy.', 'Sai — chào hỏi không chỉ làm sau buổi tập.', 'Đúng — chào thầy, chào đồng môn và giữ lễ phép là lễ tiết võ đạo.', 'Sai — võ đạo luôn coi trọng lễ tiết.']),
  ]),

  M(16, 'Võ thuật — Vovinam bài quyền nhập môn', [
    Q('Bài quyền nhập môn Vovinam?', ['Nhập môn quyền', 'Tứ trụ quyền', 'Long hổ quyền', 'Thái cực'], 0, 'Nhập môn quyền dành cho người mới.',
      [
        '<b>Bài quyền (thảo)</b> là chuỗi động tác võ thuật được sắp xếp theo trình tự, mô phỏng tình huống chiến đấu. Bài đầu tiên dành cho người mới của Vovinam là <code>Nhập môn quyền</code>.<ul><li>Bao gồm các tấn pháp và đòn tay – chân cơ bản.</li><li>Là nền tảng trước khi học các bài cao hơn.</li></ul>',
        '<i>Phân biệt:</i> Tứ trụ quyền, Long hổ quyền là các bài <b>nâng cao</b> hơn; Thái cực thuộc môn võ khác. Học đúng trình tự từ Nhập môn quyền giúp xây nền kỹ thuật vững.',
      ],
      ['Đúng — Nhập môn quyền là bài quyền đầu tiên dành cho người mới.', 'Sai — Tứ trụ quyền là bài cao hơn, không dành cho người mới.', 'Sai — Long hổ quyền là bài nâng cao của Vovinam.', 'Sai — Thái cực không phải bài quyền nhập môn của Vovinam.']),
    Q('Bài quyền luyện?', ['Chỉ đứng', 'Tư thế cơ bản, tấn pháp, đòn tay-chân, di chuyển', 'Chỉ đá', 'Chỉ đấm'], 1, 'Quyền là chuỗi kỹ thuật cơ bản tổng hợp.',
      [
        '<b>Tập bài quyền</b> rèn luyện tổng hợp nhiều yếu tố cùng lúc:<ul><li><b>Tư thế cơ bản</b> và <b>tấn pháp</b> (cách đứng tấn).</li><li><b>Đòn tay – đòn chân</b> phối hợp.</li><li><b>Di chuyển</b>, đổi hướng, giữ thăng bằng.</li></ul>',
        '<i>Giá trị:</i> quyền giúp ghi nhớ kỹ thuật thành chuỗi liền mạch, rèn <b>trí nhớ vận động, sức bền và sự tập trung</b>. Quyền không phải chỉ đứng yên hay riêng đá/đấm mà là sự kết hợp toàn diện.',
      ],
      ['Sai — quyền không chỉ đứng yên mà còn nhiều động tác.', 'Đúng — quyền luyện tư thế cơ bản, tấn pháp, đòn tay-chân và di chuyển.', 'Sai — quyền không chỉ gồm các đòn đá.', 'Sai — quyền không chỉ gồm các đòn đấm.']),
    Q('Tấn pháp cơ bản?', ['Chỉ có tấn pháp đứng thẳng hai chân', 'Một tấn pháp duy nhất cho mọi đòn', 'Trung bình tấn, đinh tấn, hạc tấn, quỳ tấn', 'Đứng thẳng'], 2, 'Tấn pháp là nền tảng võ thuật.',
      [
        '<b>Tấn pháp (thế đứng tấn)</b> là nền tảng của võ thuật, quyết định sự vững chắc và lực phát đòn. Các tấn cơ bản gồm:<ul><li><b>Trung bình tấn:</b> hai chân dang rộng, hạ thấp trọng tâm đều hai bên.</li><li><b>Đinh tấn:</b> chân trước gập, chân sau duỗi (thế chữ đinh "丁").</li><li><b>Hạc tấn:</b> đứng một chân như con hạc.</li><li><b>Quỳ tấn:</b> hạ thấp một gối.</li></ul>',
        '<i>Vì sao nhiều tấn?</i> Mỗi đòn và tình huống cần một tấn phù hợp để <b>vững gốc và ra đòn mạnh</b>. "Tấn vững thì đòn mới mạnh" — không thể dùng một tấn duy nhất cho mọi đòn.',
      ],
      ['Sai — có nhiều tấn pháp chứ không chỉ đứng thẳng.', 'Sai — mỗi đòn dùng tấn pháp phù hợp khác nhau.', 'Đúng — trung bình tấn, đinh tấn, hạc tấn, quỳ tấn là các tấn pháp cơ bản.', 'Sai — chỉ đứng thẳng không phải là tấn pháp.']),
    Q('Khi tập quyền cần?', ['Tập trung, chính xác, có lực và nhịp', 'Cẩu thả', 'Tập nhanh hết bài, không cần dừng định hình', 'Bắt chước động tác mà không hiểu ý nghĩa'], 0, 'Quyền cần kết hợp chính xác + lực + nhịp.',
      [
        '<b>Yêu cầu khi tập quyền</b>:<ul><li><b>Tập trung</b> — tâm trí theo từng động tác.</li><li><b>Chính xác</b> — đúng tư thế, đúng hướng, đúng tấn.</li><li><b>Có lực</b> — phát đòn dứt khoát, không hời hợt.</li><li><b>Đúng nhịp</b> — nhanh – chậm, mạnh – nhẹ hợp lý, có điểm dừng định hình.</li></ul>',
        '<i>Tránh:</i> tập cẩu thả, tập vội cho xong hay bắt chước máy móc mà không hiểu ý nghĩa từng đòn. Hiểu "<b>vì sao</b>" của mỗi động tác giúp tiến bộ thực sự và vận dụng được khi cần.',
      ],
      ['Đúng — tập quyền cần tập trung, chính xác, có lực và đúng nhịp.', 'Sai — cẩu thả làm sai kỹ thuật và mất ý nghĩa bài quyền.', 'Sai — tập vội cho xong khiến động tác không chuẩn.', 'Sai — bắt chước mà không hiểu ý nghĩa thì khó tiến bộ.']),
  ]),

  M(17, 'Võ thuật — Karatedo', [
    Q('Karatedo nguồn gốc?', ['Trung Quốc', 'Okinawa, Nhật Bản', 'Việt Nam', 'Hàn Quốc'], 1, 'Karatedo phát triển từ Okinawa, Nhật Bản.',
      [
        '<b>Karatedo (Karate)</b> là môn võ phát triển từ đảo <code>Okinawa, Nhật Bản</code>, có chịu ảnh hưởng của võ thuật Trung Hoa nhưng định hình thành môn riêng của Nhật.<ul><li>Nay là môn võ phổ biến toàn cầu, có thi đấu tại Olympic.</li><li>Ở Việt Nam, Karatedo (Karate) là môn thế mạnh, từng giành nhiều HCV SEA Games, ASIAD.</li></ul>',
        '<i>Phân biệt:</i> đừng nhầm với Taekwondo (gốc Hàn Quốc) hay các môn võ Trung Quốc. Karatedo là một lựa chọn võ thuật trong nội dung thể thao tự chọn của GDTC.',
      ],
      ['Sai — Karatedo phát triển ở Nhật, không phải Trung Quốc.', 'Đúng — Karatedo phát triển từ Okinawa, Nhật Bản.', 'Sai — Karatedo không có nguồn gốc Việt Nam.', 'Sai — môn võ gốc Hàn Quốc là Taekwondo, không phải Karatedo.']),
    Q('Karatedo nghĩa là?', ['Có vũ khí', 'Đấu kiếm', 'Không thủ đạo — dùng tay không', 'Nhu thuật — kỹ thuật dùng đòn vật ngã'], 2, 'Kara = không, te = tay, do = đạo.',
      [
        '<b>Ý nghĩa tên gọi</b>: Karate-do ghép từ ba chữ Nhật — <code>Kara (không) + Te (tay) + Do (đạo)</code> — nghĩa là <b>"Không thủ đạo"</b>, con đường rèn luyện bằng tay không, không dùng vũ khí.<ul><li>Đề cao tự vệ bằng chính cơ thể.</li><li>"Do" (đạo) nhấn mạnh khía cạnh tinh thần, đạo đức.</li></ul>',
        '<i>So sánh:</i> Kendo là đấu kiếm, Judo là nhu đạo (đòn vật ngã). Mỗi môn võ Nhật có chữ "Do" (đạo) thể hiện đó không chỉ là kỹ thuật mà là <b>con đường tu dưỡng</b>.',
      ],
      ['Sai — Karatedo chủ yếu dùng tay không, không phải vũ khí.', 'Sai — đấu kiếm là môn khác (kendo).', 'Đúng — Karatedo nghĩa là không thủ đạo, dùng tay không (kara-te-do).', 'Sai — kỹ thuật vật ngã là của nhu đạo (judo).']),
    Q('Kỹ thuật Karatedo gồm?', ['Chỉ đá', 'Chỉ vật', 'Chỉ đấm', 'Tsuki (đấm), Keri (đá), Uke (đỡ), Kata (quyền)'], 3, '4 nhóm kỹ thuật cơ bản.',
      [
        '<b>Các nhóm kỹ thuật Karatedo</b> (dùng thuật ngữ tiếng Nhật):<ul><li><b>Tsuki:</b> đòn đấm.</li><li><b>Keri (Geri):</b> đòn đá.</li><li><b>Uke:</b> đòn đỡ, gạt.</li><li><b>Kata:</b> bài quyền — chuỗi động tác mô phỏng giao đấu.</li></ul>',
        '<i>Hai hình thức luyện:</i> <b>Kata</b> (quyền, tập một mình) và <b>Kumite</b> (đối luyện, giao đấu). Karatedo là sự kết hợp đầy đủ tấn công (đấm – đá) và phòng thủ (đỡ), không chỉ riêng một loại đòn.',
      ],
      ['Sai — Karatedo không chỉ có đòn đá.', 'Sai — đòn vật không phải đặc trưng của Karatedo.', 'Sai — Karatedo không chỉ gồm đòn đấm.', 'Đúng — Karatedo gồm Tsuki (đấm), Keri (đá), Uke (đỡ) và Kata (quyền).']),
    Q('Đai cao nhất Karatedo?', ['Đai trắng', 'Đai vàng', 'Đai đỏ', 'Đai đen (kuro-obi) với nhiều đẳng (dan)'], 3, 'Đai đen có nhiều đẳng (1–10 dan).',
      [
        '<b>Hệ thống đai (obi)</b> trong Karatedo thể hiện trình độ:<ul><li><b>Đai trắng:</b> người mới nhập môn.</li><li>Qua các màu (vàng, cam, xanh, nâu...) thể hiện cấp <b>Kyu</b> tăng dần.</li><li><b>Đai đen (kuro-obi):</b> cao nhất, chia nhiều <b>đẳng (dan)</b> từ 1 đến 10.</li></ul>',
        '<i>Ý nghĩa:</i> con đường từ đai trắng đến đai đen tượng trưng cho <b>quá trình khổ luyện bền bỉ</b>. Đạt đai đen không phải đích đến mà là khởi đầu của hành trình tu dưỡng sâu hơn.',
      ],
      ['Sai — đai trắng là đai của người mới bắt đầu.', 'Sai — đai vàng là cấp thấp, chưa phải cao nhất.', 'Sai — đai đỏ không phải đai cao nhất trong hệ thống thông dụng.', 'Đúng — đai đen (kuro-obi) là cao nhất, có nhiều đẳng từ 1 đến 10 dan.']),
    Q('Tinh thần Karatedo?', ['Đánh nhanh thắng nhanh trong mọi tình huống', 'Hung hăng', 'Karate ni sente nashi — Karate không đánh trước', 'Tấn công trước'], 2, 'Tinh thần phòng thủ và tự kiềm chế.',
      [
        '<b>Tinh thần Karatedo</b> gói trong câu châm ngôn nổi tiếng của tổ sư Funakoshi Gichin: <code>"Karate ni sente nashi"</code> — nghĩa là <b>"Karate không ra đòn trước"</b>.<ul><li>Đề cao <b>tự vệ</b>, không gây hấn, không tấn công trước.</li><li>Coi trọng tự kiềm chế và phòng thủ.</li></ul>',
        '<i>Ý nghĩa giáo dục:</i> học võ để bảo vệ chứ không để bắt nạt. Tinh thần này dạy người học sự <b>khiêm nhường và trách nhiệm</b> — sức mạnh chỉ dùng khi thật cần thiết, trái với hung hăng đánh trước.',
      ],
      ['Sai — Karatedo đề cao tự kiềm chế, không cổ vũ đánh nhanh để thắng.', 'Sai — hung hăng trái với tinh thần võ đạo Karatedo.', 'Đúng — Karate ni sente nashi nghĩa là Karate không ra đòn trước.', 'Sai — tinh thần Karatedo là không tấn công trước.']),
  ]),

  M(18, 'Ôn tập học kì I', [
    Q('Chạy bền + thở đều giúp?', ['Tốn sức', 'Tăng sức bền tim mạch', 'Không tác dụng', 'Giảm sức bền'], 1, 'Chạy bền cải thiện hệ tim mạch.',
      [
        '<b>Ôn tập HK1 — Lợi ích chạy bền</b>: tập chạy bền đều đặn kèm thở đúng giúp <code>tăng sức bền tim mạch (aerobic)</code> — tim bơm máu hiệu quả hơn, phổi trao đổi khí tốt hơn.<ul><li>Giảm nguy cơ bệnh tim mạch, béo phì.</li><li>Tăng thể lực nền cho mọi hoạt động.</li></ul>',
        '<i>Nhớ lại:</i> nhịp thở đều (2–2), tư thế thân hơi nghiêng trước, vai thả lỏng. Chạy bền <b>rèn sức chứ không phí sức</b> — đây là môn quan trọng cho bài kiểm tra thể lực cuối cấp THCS.',
      ],
      ['Sai — chạy bền đúng cách rèn sức chứ không phí sức.', 'Đúng — chạy bền và thở đều giúp tăng sức bền tim mạch.', 'Sai — chạy bền mang lại nhiều lợi ích cho sức khoẻ.', 'Sai — chạy bền làm tăng chứ không giảm sức bền.']),
    Q('Bóng chuyền — chắn lưới (block)?', ['Hàng trên, nhảy thẳng, 2 tay qua lưới', '1 tay', 'Không nhảy', 'Hàng dưới'], 0, 'Block kỹ thuật phòng thủ tại lưới.',
      [
        '<b>Ôn tập HK1 — Chắn lưới</b>: là kỹ thuật phòng thủ, chỉ <code>cầu thủ hàng trên</code> được thực hiện, bằng cách <b>nhảy thẳng đứng, vươn 2 tay cao qua lưới</b> để chặn cú đập.<ul><li>Nhảy thẳng để không chạm lưới (lỗi mất điểm).</li><li>Chắn 2 người = double block, hiệu quả hơn chắn đơn.</li></ul>',
        '<i>Nhớ luật:</i> libero và cầu thủ hàng sau <b>không được chắn</b>; chạm lưới là lỗi mất điểm trực tiếp. Phối hợp chắn ăn ý là dấu hiệu đội phòng thủ tốt.',
      ],
      ['Đúng — chắn lưới là cầu thủ hàng trên nhảy thẳng, vươn 2 tay qua lưới.', 'Sai — chắn 1 tay che được ít diện tích.', 'Sai — không nhảy thì không vươn tay qua lưới được.', 'Sai — cầu thủ hàng dưới không được lên chắn lưới.']),
    Q('Ném 3 điểm dùng nguyên tắc?', ['POP (Position, Orientation, Push)', 'BEEF', 'XYZ (eXtend, Yield, Zoom)', 'ABC (Aim, Bend, Catch)'], 1, 'BEEF: Balance, Eyes, Elbow, Follow-through.',
      [
        '<b>Ôn tập HK1 — Nguyên tắc ném rổ BEEF</b>:<ul><li><b>B</b>alance — thăng bằng (chân rộng bằng vai, gối chùng).</li><li><b>E</b>yes — mắt nhìn rổ.</li><li><b>E</b>lbow — khuỷu tay thẳng hàng với rổ.</li><li><b>F</b>ollow-through — vươn tay theo bóng tạo backspin.</li></ul>',
        '<i>Nhớ:</i> BEEF là cách dễ ghi nhớ 4 yếu tố then chốt của cú ném chuẩn. Vạch 3 điểm cách rổ 6,75m (FIBA). Lực ném đến từ <b>phối hợp chân – thân – tay</b>.',
      ],
      ['Sai — POP không phải nguyên tắc ném rổ chuẩn.', 'Đúng — BEEF (Balance, Eyes, Elbow, Follow-through) là nguyên tắc ném rổ.', 'Sai — XYZ không phải nguyên tắc ném 3 điểm.', 'Sai — ABC không phải nguyên tắc ném rổ chuẩn.']),
    Q('Vovinam triết lý?', ['Cương nhu phối triển', 'Nhu luôn', 'Chỉ tập đòn cứng cường lực', 'Cương luôn'], 0, '"Cương nhu phối triển" là triết lý cốt lõi.',
      [
        '<b>Ôn tập HK1 — Triết lý Vovinam</b>: <code>"Cương nhu phối triển"</code> — phối hợp hài hoà giữa <b>cương</b> (cứng, mạnh) và <b>nhu</b> (mềm, linh hoạt), không thiên lệch một bên.<ul><li>Vovinam do Nguyễn Lộc sáng lập tại Việt Nam, 1938.</li><li>Kỹ thuật toàn diện: đòn chân, đòn tay, vật, khoá.</li></ul>',
        '<i>Nhớ:</i> tinh thần võ đạo dân tộc, coi trọng lễ tiết. Triết lý cương nhu kết hợp cũng phản ánh cách ứng xử mềm dẻo mà bản lĩnh trong cuộc sống.',
      ],
      ['Đúng — cương nhu phối triển là triết lý cốt lõi của Vovinam.', 'Sai — Vovinam kết hợp cả cương lẫn nhu, không chỉ nhu.', 'Sai — Vovinam không chỉ luyện đòn cứng.', 'Sai — Vovinam không chỉ thiên về cương mà phối hợp cả nhu.']),
    Q('Karatedo — Karate ni sente nashi?', ['Đánh trước', 'Phản công', 'Không đánh trước', 'Luôn ra đòn quyết định trước'], 2, 'Tinh thần tự kiềm chế và phòng thủ.',
      [
        '<b>Ôn tập HK1 — Tinh thần Karatedo</b>: châm ngôn <code>"Karate ni sente nashi"</code> nghĩa là <b>"Karate không đánh trước"</b> — đề cao tự vệ, tự kiềm chế, không gây hấn.<ul><li>Karatedo = "Không thủ đạo" (dùng tay không).</li><li>Gốc Okinawa, Nhật Bản; đai cao nhất là đai đen.</li></ul>',
        '<i>Nhớ:</i> học võ để bảo vệ, không để bắt nạt. Tinh thần này dạy <b>khiêm nhường và trách nhiệm</b> — đúng với mục tiêu giáo dục nhân cách của môn võ trong nhà trường.',
      ],
      ['Sai — câu này dạy không ra đòn trước, ngược với đánh trước.', 'Sai — ý nghĩa là không đánh trước, không nói riêng về phản công.', 'Đúng — Karate ni sente nashi nghĩa là Karate không đánh trước.', 'Sai — tinh thần này đề cao tự kiềm chế, không ra đòn trước.']),
  ]),

  // ───── HK2 ─────
  M(19, 'Bơi sải — Kỹ thuật cơ bản', [
    Q('Bơi sải (freestyle) là?', ['Kiểu bơi nhanh nhất, vung tay luân phiên trên đầu', 'Bơi bướm', 'Bơi ếch', 'Bơi ngửa'], 0, 'Freestyle = front crawl, nhanh nhất.',
      [
        '<b>Bơi sải (freestyle / trườn sấp – front crawl)</b> là kiểu bơi <code>nhanh nhất</code> trong các kiểu bơi.<ul><li>Người nằm sấp, hai tay <b>vung luân phiên</b> qua đầu kéo nước.</li><li>Hai chân đập lên xuống nhanh (flutter kick).</li><li>Đầu quay sang ngang để thở.</li></ul>',
        '<i>Vì sao nhanh nhất?</i> Động tác tay liên tục, ít pha "trượt" nghỉ, lực kéo đều đặn. Biết bơi là <b>kỹ năng sinh tồn</b> quan trọng — Bộ GD&ĐT khuyến khích phổ cập bơi để phòng chống đuối nước cho học sinh.',
      ],
      ['Đúng — bơi sải là kiểu nhanh nhất, hai tay vung luân phiên qua đầu.', 'Sai — bơi bướm là kiểu khác, hai tay vung cùng lúc.', 'Sai — bơi ếch dùng tay đối xứng và chân đạp ếch.', 'Sai — bơi ngửa thì nằm ngửa, không phải bơi sải.']),
    Q('Hô hấp khi bơi sải?', ['Ngẩng đầu', 'Hít bằng miệng khi đầu úp xuống nước', 'Nín thở', 'Quay đầu sang ngang, hít vào khi tay vung qua đầu'], 3, 'Quay đầu hít vào kỹ thuật chuẩn.',
      [
        '<b>Kỹ thuật thở bơi sải</b>: <code>quay đầu sang ngang</code> (không ngẩng lên) để miệng vừa khỏi mặt nước, <b>hít vào</b> đúng lúc tay cùng bên vung qua đầu; sau đó úp mặt và <b>thở ra từ từ dưới nước</b> bằng mũi/miệng.<ul><li>Thở nhịp nhàng theo nhịp tay (ví dụ cứ 3 nhịp tay thở 1 lần).</li></ul>',
        '<i>Vì sao quay ngang chứ không ngẩng?</i> Ngẩng đầu làm <b>chân chìm</b>, mất tư thế nằm ngang và tăng lực cản. Không thể hít khi mặt úp nước; nín thở thì mau đuối sức. Thở đúng là chìa khoá bơi được xa.',
      ],
      ['Sai — ngẩng đầu làm chìm chân và mất tư thế ngang.', 'Sai — không thể hít vào khi mặt đang úp dưới nước.', 'Sai — nín thở khiến thiếu oxy, không bơi lâu được.', 'Đúng — quay đầu sang ngang hít vào khi tay vung qua đầu là kỹ thuật chuẩn.']),
    Q('Đạp chân bơi sải?', ['Không đạp', 'Đạp mạnh chậm', 'Đập chân nhanh, đầu gối hơi gập, gối-cổ chân thả lỏng', 'Đạp ếch hai chân cùng lúc, co rồi đẩy'], 2, 'Flutter kick nhanh đều.',
      [
        '<b>Đập chân bơi sải (flutter kick)</b>: hai chân thay nhau <code>đập lên – xuống nhanh và đều</code>, đầu gối hơi gập tự nhiên, <b>gối và cổ chân thả lỏng</b>, biên độ vừa phải xuất phát từ hông.<ul><li>Bàn chân duỗi như "vây cá".</li><li>Chân tạo lực đẩy phụ và giữ thân nằm ngang.</li></ul>',
        '<i>Phân biệt:</i> đập chân nhanh xen kẽ là của bơi sải; <b>đạp ếch</b> (co gối, đạp đối xứng) là của bơi ếch. Chân quá cứng hoặc đạp chậm mạnh đều làm <b>tốn sức và chìm chân</b>.',
      ],
      ['Sai — không đạp chân thì thiếu lực đẩy và mất thăng bằng.', 'Sai — đạp chậm mạnh không phù hợp với bơi sải.', 'Đúng — đập chân nhanh, gối hơi gập, gối và cổ chân thả lỏng (flutter kick).', 'Sai — đạp ếch hai chân cùng lúc là kỹ thuật của bơi ếch.']),
    Q('Tư thế thân?', ['Toàn thân chìm sâu dưới mặt nước 30cm', 'Ngẩng cao', 'Lưng cong xuống, hông võng dưới chân', 'Thẳng, sát mặt nước, không nhô lên cao'], 3, 'Tư thế ngang tiết kiệm năng lượng.',
      [
        '<b>Tư thế thân bơi sải</b>: giữ thân <code>thẳng và sát mặt nước</code> (nằm ngang – streamline), đầu – lưng – hông – chân trên một đường, không nhô cao cũng không chìm sâu.<ul><li>Giảm tối đa diện tích cản nước.</li><li>Mắt nhìn xuống đáy, hơi chếch về trước.</li></ul>',
        '<i>Vì sao quan trọng?</i> Tư thế ngang <b>tiết kiệm năng lượng</b> và tăng tốc độ. Ngẩng cao, chìm sâu hay hông võng đều làm <b>tăng lực cản</b>, khiến bơi chậm và mau mệt.',
      ],
      ['Sai — chìm sâu làm tăng lực cản, bơi chậm hơn.', 'Sai — ngẩng cao khiến chân chìm, mất tư thế ngang.', 'Sai — lưng cong, hông võng làm tăng lực cản nước.', 'Đúng — thân thẳng, sát mặt nước giúp giảm cản và tiết kiệm sức.']),
  ]),

  M(20, 'Bơi ếch — Kỹ thuật cơ bản', [
    Q('Bơi ếch (breaststroke) đặc trưng?', ['Tay luân phiên', '2 tay ra trước rồi đẩy ra ngoài, chân đạp ếch', 'Chân vẫy', 'Tay luân phiên vung qua đầu như bơi sải'], 1, 'Breaststroke: 2 tay đối xứng + chân đạp ếch.',
      [
        '<b>Bơi ếch (breaststroke)</b> đặc trưng bởi động tác <code>đối xứng</code> giống ếch bơi:<ul><li><b>Tay:</b> hai tay đưa ra trước rồi quạt vòng ra ngoài và thu về trước ngực.</li><li><b>Chân:</b> đạp ếch (co gối, xoay bàn chân, đạp ra sau).</li><li>Có pha duỗi người trượt nước.</li></ul>',
        '<i>Phân biệt:</i> bơi ếch dùng hai tay – hai chân <b>đối xứng cùng lúc</b>, khác bơi sải (tay luân phiên). Bơi ếch dễ giữ đầu trên mặt nước nên người mới học thường tập kiểu này trước.',
      ],
      ['Sai — tay luân phiên là của bơi sải, không phải bơi ếch.', 'Đúng — bơi ếch đưa 2 tay ra trước rồi đẩy ra ngoài, kết hợp chân đạp ếch.', 'Sai — chân vẫy là kiểu đạp của bơi sải.', 'Sai — vung tay luân phiên qua đầu là bơi sải, không phải bơi ếch.']),
    Q('Đạp chân ếch?', ['Co gối + xoay bàn chân ra ngoài + đạp về sau', 'Đập chân', 'Duỗi thẳng hai chân, đập lên xuống nhanh', 'Không đạp'], 0, 'Frog kick là kỹ thuật riêng.',
      [
        '<b>Đạp chân ếch (frog kick / whip kick)</b> theo trình tự:<ul><li><b>Co:</b> co hai gối, gót chân kéo về phía mông.</li><li><b>Xoay:</b> xoay bàn chân (mũi chân) ra ngoài.</li><li><b>Đạp:</b> đạp mạnh ra sau theo hình vòng cung rồi khép chân lại.</li></ul>',
        '<i>Đây là lực đẩy chính</i> của bơi ếch. Phân biệt với <b>flutter kick</b> (đập lên xuống nhanh) của bơi sải. Đạp ếch đúng kỹ thuật tạo lực mạnh và pha trượt nước hiệu quả.',
      ],
      ['Đúng — co gối, xoay bàn chân ra ngoài rồi đạp về sau là đạp ếch.', 'Sai — đập chân nhanh là flutter kick của bơi sải.', 'Sai — duỗi thẳng đập lên xuống là kiểu bơi sải.', 'Sai — không đạp chân thì không có lực đẩy đi.']),
    Q('Hô hấp khi bơi ếch?', ['Hít vào liên tục dưới nước qua mũi', 'Nín thở', 'Hít vào khi đầu nâng lên thì kéo tay', 'Hít sâu'], 2, 'Đồng bộ hô hấp + động tác tay.',
      [
        '<b>Hô hấp bơi ếch</b>: nhịp thở đồng bộ với chu kỳ tay. Khi <code>kéo tay quạt nước, đầu và vai nâng lên</code> khỏi mặt nước — đó là lúc <b>hít vào bằng miệng</b>; rồi cúi mặt xuống nước, đạp chân và thở ra.<ul><li>Mỗi chu kỳ tay – chân thở một lần.</li></ul>',
        '<i>Then chốt là "đồng bộ":</i> thở đúng thời điểm đầu nâng lên giúp lấy hơi mà không phá nhịp. Bơi ếch nhờ vậy dễ duy trì lâu, là kiểu bơi phù hợp để <b>bơi đường dài thư thả</b>.',
      ],
      ['Sai — không thể hít vào liên tục khi đầu ở dưới nước.', 'Sai — nín thở suốt khiến thiếu oxy, không bơi lâu.', 'Đúng — hít vào khi đầu nâng lên lúc kéo tay, đồng bộ với động tác.', 'Sai — chỉ nói hít sâu thì chưa chỉ rõ thời điểm hô hấp.']),
    Q('Bơi ếch chậm hơn sải vì?', ['Tốn sức hơn', 'Không có lý do', 'Khó hơn', 'Có pha trượt + đối xứng'], 3, 'Pha trượt làm bơi ếch chậm hơn.',
      [
        '<b>Vì sao bơi ếch chậm hơn bơi sải?</b> Hai lý do về cơ chế động tác:<ul><li><b>Có pha trượt (lướt nước):</b> sau mỗi chu kỳ, người duỗi thẳng trượt đi — có khoảnh khắc <code>không tạo lực đẩy</code>.</li><li><b>Đối xứng, gián đoạn:</b> tay – chân hoạt động theo chu kỳ ngắt quãng, không liên tục như bơi sải.</li></ul>',
        '<i>Đổi lại:</i> bơi ếch <b>nhẹ nhàng, dễ giữ đầu trên nước và dễ thở</b> hơn, phù hợp người mới và bơi thư giãn. Mỗi kiểu bơi có thế mạnh riêng tuỳ mục đích.',
      ],
      ['Sai — không phải vì tốn sức mà do cơ chế động tác.', 'Sai — có lý do rõ ràng về kỹ thuật khiến bơi ếch chậm hơn.', 'Sai — độ khó không phải lý do làm bơi ếch chậm.', 'Đúng — bơi ếch có pha trượt và động tác đối xứng nên chậm hơn bơi sải.']),
  ]),

  M(21, 'An toàn dưới nước', [
    Q('Trước khi xuống nước?', ['Khởi động kỹ, kiểm tra sức khoẻ, không ăn quá no', 'Cứ nhảy', 'Chỉ làm ướt mặt rồi nhảy xuống ngay', 'Ăn no một bữa lớn để có sức bơi lâu'], 0, 'An toàn xuống nước là quy tắc tiên quyết.',
      [
        '<b>Chuẩn bị trước khi xuống nước</b> để phòng đuối nước:<ul><li><b>Khởi động kỹ</b> các khớp và cơ để tránh chuột rút.</li><li><b>Kiểm tra sức khoẻ</b> — không bơi khi mệt, ốm, vừa ốm dậy.</li><li><b>Không ăn quá no</b> và không xuống nước ngay khi đang đói lả hoặc vừa ăn xong.</li></ul>',
        '<i>Quy tắc vàng:</i> làm ướt người, làm quen nhiệt độ nước từ từ trước khi bơi. Xuống nước ở nơi <b>có người lớn / cứu hộ</b>, biết rõ độ sâu. An toàn dưới nước là kiến thức sinh tồn bắt buộc.',
      ],
      ['Đúng — khởi động kỹ, kiểm tra sức khoẻ và không ăn quá no trước khi xuống nước.', 'Sai — nhảy luôn không khởi động dễ chuột rút, rất nguy hiểm.', 'Sai — chỉ làm ướt mặt rồi nhảy chưa đủ chuẩn bị an toàn.', 'Sai — ăn no rồi bơi dễ bị đau bụng, chuột rút.']),
    Q('Khi bị chuột rút dưới nước?', ['Lặn sâu', 'Hoảng loạn', 'Quẫy mạnh', 'Bình tĩnh, kéo bóp cơ, nổi lên kêu cứu'], 3, 'Chuột rút cần bình tĩnh xử lý.',
      [
        '<b>Xử lý chuột rút dưới nước</b> — tình huống nguy hiểm phải biết:<ul><li><b>Giữ bình tĩnh</b>, hít một hơi để nổi người.</li><li><b>Kéo căng và bóp nhẹ</b> bắp cơ bị rút (ví dụ chuột rút bắp chân thì kéo mũi bàn chân về phía người).</li><li><b>Nổi lên</b>, ra hiệu và <b>kêu cứu</b>.</li></ul>',
        '<i>Tuyệt đối tránh:</i> hoảng loạn, quẫy mạnh hay lặn sâu — đều làm <b>mất sức, sặc nước và chìm nhanh hơn</b>. Bình tĩnh là yếu tố sống còn trong mọi sự cố dưới nước.',
      ],
      ['Sai — lặn sâu làm tình huống nguy hiểm hơn.', 'Sai — hoảng loạn khiến mất sức và dễ chìm.', 'Sai — quẫy mạnh tốn sức, không giúp giảm chuột rút.', 'Đúng — bình tĩnh, kéo bóp cơ bị rút rồi nổi lên kêu cứu.']),
    Q('Cứu người đuối nước?', ['Nhảy ngay', 'Quay phim', 'Mặc kệ', 'Gọi cứu hộ, ném vật nổi, không tự lao xuống nếu không biết bơi'], 3, 'Tự bảo vệ trước khi cứu người khác.',
      [
        '<b>Cứu người đuối nước an toàn</b> theo nguyên tắc <code>"gọi – ném – không lao xuống liều"</code>:<ul><li><b>Gọi</b> người lớn / cứu hộ / gọi 115 ngay lập tức.</li><li><b>Ném</b> vật nổi (phao, can nhựa, dây, cành cây) cho nạn nhân bám.</li><li><b>Không tự lao xuống</b> nếu mình không biết bơi hoặc không được huấn luyện cứu hộ.</li></ul>',
        '<i>Vì sao?</i> Người đuối nước hoảng loạn có thể <b>ghì chặt làm chìm cả người cứu</b>. Tự bảo vệ mình trước rồi mới cứu người là nguyên tắc số một — tránh trở thành nạn nhân thứ hai.',
      ],
      ['Sai — nhảy ngay khi không biết bơi dễ thành nạn nhân thứ hai.', 'Sai — quay phim bỏ lỡ thời điểm cứu người.', 'Sai — mặc kệ là vô trách nhiệm và nguy hiểm.', 'Đúng — gọi cứu hộ, ném vật nổi và không tự lao xuống nếu không biết bơi.']),
    Q('Bể bơi an toàn cần?', ['Có cứu hộ, độ sâu rõ ràng, vệ sinh', 'Không cứu hộ', 'Có nhạc lớn và quầy bar quanh bể', 'Quan trọng nông'], 0, 'Bể bơi tiêu chuẩn cần cứu hộ.',
      [
        '<b>Bể bơi an toàn</b> cần đảm bảo:<ul><li>Có <b>nhân viên cứu hộ</b> trực và dụng cụ cứu sinh (phao, sào).</li><li><b>Biển báo độ sâu</b> rõ ràng ở từng khu vực.</li><li><b>Nước sạch</b>, vệ sinh, xử lý đúng chuẩn.</li><li>Nội quy rõ ràng, có khu nông cho người mới.</li></ul>',
        '<i>Trách nhiệm của người bơi:</i> chọn bể bơi an toàn, tuân thủ nội quy, không bơi một mình ở nơi vắng. Yếu tố quyết định là <b>cứu hộ và độ sâu rõ ràng</b>, không phải tiện nghi giải trí xung quanh.',
      ],
      ['Đúng — bể bơi an toàn cần có cứu hộ, biển báo độ sâu rõ và sạch sẽ.', 'Sai — thiếu cứu hộ thì rất nguy hiểm khi có sự cố.', 'Sai — nhạc lớn và quầy bar không liên quan tới an toàn.', 'Sai — chỉ nông thôi chưa đủ, vẫn cần cứu hộ và vệ sinh.']),
  ]),

  M(22, 'Đá cầu — Thi đấu nâng cao', [
    Q('Cú đá tấn công mạnh?', ['Đá nhẹ', 'Đá xoáy cầu đi ngang sát mặt lưới', 'Đá quét hoặc đá mu cao + xa', 'Đá thấp'], 2, 'Đá tấn công cần lực + chính xác.',
      [
        '<b>Cú đá tấn công trong đá cầu nâng cao</b>:<ul><li><b>Đá quét (móc cầu):</b> dùng lực mạnh quét cầu cắm nhanh xuống sân đối phương.</li><li><b>Đá mu cao và xa:</b> đưa cầu vọt cao, rơi sâu vào góc sân đối thủ.</li></ul>Cả hai đòi hỏi <code>lực mạnh kết hợp độ chính xác</code>.',
        '<i>Mục tiêu tấn công:</i> đưa cầu vào vị trí <b>đối phương khó đỡ nhất</b> (góc xa, sát biên) để ghi điểm. Đá nhẹ hay đá thấp thiếu uy lực, dễ bị đối thủ phản công.',
      ],
      ['Sai — đá nhẹ không tạo được sức ép tấn công.', 'Sai — cầu đi ngang sát lưới là cú khống chế chứ chưa phải tấn công mạnh.', 'Đúng — đá quét hoặc đá mu cao và xa là cú tấn công mạnh.', 'Sai — đá thấp thiếu lực để dứt điểm.']),
    Q('Cú đỡ cầu phòng thủ?', ['Đá cầu thẳng nhanh trở lại đối thủ', 'Đập mạnh ngay', 'Bỏ qua', 'Đá nhẹ + hướng lên cao để có thời gian phản ứng'], 3, 'Đỡ cao tạo thời gian phòng thủ.',
      [
        '<b>Cú đỡ cầu phòng thủ</b>: khi bị tấn công mạnh, đỡ cầu <code>nhẹ và hướng lên cao</code> để cầu bay vòng cung chậm — nhờ đó có <b>thời gian lấy lại vị trí và thăng bằng</b> cho pha tiếp theo.<ul><li>Mục tiêu là "giữ cầu trong cuộc", chưa vội phản công.</li></ul>',
        '<i>Vì sao không trả thẳng nhanh?</i> Đá thẳng nhanh khi đang ở thế bị động sẽ <b>tạo cơ hội cho đối thủ tấn công tiếp</b> hoặc dễ đá lỗi. Phòng thủ khôn ngoan là "câu giờ" để chuyển từ thủ sang công.',
      ],
      ['Sai — đá thẳng nhanh trở lại tạo cơ hội cho đối thủ tấn công tiếp.', 'Sai — đập mạnh ngay khi đang phòng thủ rất dễ lỗi.', 'Sai — bỏ qua thì mất điểm ngay.', 'Đúng — đỡ nhẹ hướng cầu lên cao để có thời gian phản ứng và lấy lại thế.']),
    Q('Chiến thuật trong trận đôi?', ['Cả hai đều tấn công không phòng thủ', 'Phân vai tấn công + phòng thủ rõ ràng', 'Cùng làm 1 việc', 'Không chiến thuật'], 1, 'Phối hợp đôi cần phân vai rõ.',
      [
        '<b>Chiến thuật đá cầu đôi nâng cao</b>: <code>phân vai rõ ràng</code> — thường một người thiên về tấn công (dứt điểm), một người thiên về phòng thủ và kiến tạo (đỡ, chuyền cầu).<ul><li>Đội hình linh hoạt chuyển trước–sau (công) / trái–phải (thủ).</li><li>Yểm trợ và giao tiếp liên tục.</li></ul>',
        '<i>Vì sao phân vai?</i> Cả hai cùng lao lên tấn công sẽ <b>bỏ trống phần phòng thủ</b>; cùng phòng thủ thì không ai dứt điểm. Phối hợp ăn ý với vai trò rõ là chìa khoá thắng trận đôi.',
      ],
      ['Sai — cả hai cùng tấn công sẽ bỏ trống phần phòng thủ.', 'Đúng — phân vai tấn công và phòng thủ rõ ràng giúp phối hợp tốt.', 'Sai — cùng làm một việc dễ chồng chéo và để hở sân.', 'Sai — thiếu chiến thuật thì khó phối hợp hiệu quả.']),
    Q('Sự kiện đá cầu lớn?', ['Giải vô địch bóng rổ Bắc Mỹ', 'Wimbledon', 'SEA Games, Giải đá cầu thế giới', 'World Cup'], 2, 'Đá cầu là môn thi đấu tại SEA Games.',
      [
        '<b>Các giải đá cầu lớn</b>:<ul><li><b>SEA Games:</b> đá cầu là môn thi đấu chính thức ở Đại hội Thể thao Đông Nam Á — Việt Nam là một cường quốc đá cầu.</li><li><b>Giải vô địch đá cầu thế giới (World Shuttlecock Championship):</b> giải đấu quốc tế cao nhất của môn này.</li></ul>',
        '<i>Niềm tự hào:</i> đội tuyển đá cầu Việt Nam nhiều lần vô địch thế giới và SEA Games. Phân biệt với Wimbledon (quần vợt), World Cup (bóng đá) — những giải của môn thể thao khác.',
      ],
      ['Sai — đó là giải bóng rổ, không phải đá cầu.', 'Sai — Wimbledon là giải quần vợt.', 'Đúng — đá cầu thi đấu tại SEA Games và có Giải đá cầu thế giới.', 'Sai — World Cup là giải bóng đá.']),
  ]),

  M(23, 'Cầu lông — Chiến thuật đôi', [
    Q('Tấn công đôi tối ưu khi?', ['Đối thủ ở thế phòng thủ, cầu cao gần lưới', 'Khi đối thủ vừa thực hiện cú đập mạnh', 'Đối thủ tấn công', 'Cầu thấp'], 0, 'Chọn thời điểm tấn công thông minh.',
      [
        '<b>Thời điểm tấn công đôi tối ưu</b>: khi <code>đối phương đang ở thế phòng thủ</code> (đứng ngang, bị động) và <b>cầu ở vị trí thuận lợi</b> (cao, gần lưới) để dứt điểm.<ul><li>Đội hình của ta nên ở thế trước–sau sẵn sàng đập – chặn.</li></ul>',
        '<i>Đọc tình huống:</i> ngay sau khi đối thủ vừa đập mạnh là lúc <b>ta đang đỡ</b>, chưa thể tấn công; khi đối thủ chủ động tấn công thì ta phải phòng thủ. Chọn đúng thời điểm là "đầu não" của lối chơi đôi.',
      ],
      ['Đúng — tấn công tốt nhất khi đối thủ đang phòng thủ và cầu cao gần lưới.', 'Sai — ngay sau cú đập mạnh của đối thủ ta đang ở thế đỡ.', 'Sai — khi đối thủ đang tấn công thì ta phải phòng thủ.', 'Sai — cầu thấp không thuận lợi để tấn công dứt điểm.']),
    Q('Phòng thủ đôi?', ['Trước-sau', 'Một người đứng trước, một người đứng sau', 'Đứng ngang, hai người chia đôi sân', 'Cùng vị trí'], 2, 'Đội hình ngang khi phòng thủ.',
      [
        '<b>Đội hình phòng thủ đôi</b>: hai người đứng <code>ngang nhau</code>, mỗi người phụ trách <b>một nửa sân</b> theo chiều dọc.<ul><li>Bao quát tốt cả bề ngang sân.</li><li>Sẵn sàng đỡ những cú smash từ đối phương ở mọi hướng.</li></ul>',
        '<i>Đối lập với tấn công:</i> đội hình <b>trước–sau</b> dùng khi tấn công (người trên chặn lưới, người sau đập). Đôi giỏi xoay liên tục giữa "ngang khi thủ" và "trước–sau khi công" trong cùng một pha cầu.',
      ],
      ['Sai — đứng trước-sau là đội hình tấn công.', 'Sai — một trước một sau hợp khi tấn công, không phải phòng thủ.', 'Đúng — phòng thủ đôi nên đứng ngang, mỗi người giữ một nửa sân.', 'Sai — cùng vị trí làm trống một bên sân.']),
    Q('Cú smash + drop nâng cao?', ['Đập rồi giả vờ smash → drop bất ngờ', 'Chỉ drop', 'Đập smash thẳng liên tục cho đến khi ăn điểm', 'Chỉ smash'], 0, 'Đánh lừa đối thủ bằng deception.',
      [
        '<b>Kết hợp smash – drop (đánh lừa / deception)</b>: tạo dáng như sắp <code>đập cầu mạnh (smash)</code> để đối phương lùi xuống đỡ, rồi bất ngờ <b>thả cầu nhẹ sát lưới (drop)</b> khiến họ trở tay không kịp.<ul><li>Khai thác phản xạ "đoán trước" của đối thủ.</li></ul>',
        '<i>Vì sao hiệu quả?</i> Sự <b>bất ngờ và thay đổi nhịp</b> quan trọng không kém sức mạnh. Smash thẳng liên tục dễ bị bắt bài; chỉ drop thì thiếu yếu tố uy hiếp. Biến hoá công – thủ mới làm đối thủ rối loạn.',
      ],
      ['Đúng — giả vờ smash rồi bất ngờ thả drop khiến đối thủ trở tay không kịp.', 'Sai — chỉ drop thiếu yếu tố đánh lừa.', 'Sai — smash thẳng liên tục dễ bị đối thủ bắt bài.', 'Sai — chỉ smash mà không kết hợp drop thì ít bất ngờ.']),
    Q('Sự kiện cầu lông VN?', ['Vietnam Open, SEA Games, ASIAD', 'Olympic chỉ vàng', 'World Cup bóng đá', 'Giải bóng đá ngoại hạng Anh (Premier League)'], 0, 'Vietnam Open là giải BWF tổ chức tại VN.',
      [
        '<b>Các giải cầu lông liên quan đến Việt Nam</b>:<ul><li><b>Vietnam Open:</b> giải thuộc hệ thống BWF tổ chức tại Việt Nam.</li><li><b>SEA Games, ASIAD:</b> đại hội thể thao khu vực và châu lục có nội dung cầu lông.</li></ul>Cầu lông cũng là môn ở <b>Olympic</b> (có đủ các bộ huy chương, không chỉ vàng).',
        '<i>Tự hào:</i> tay vợt Nguyễn Tiến Minh từng vào top thế giới, nhiều lần dự Olympic. Phân biệt với World Cup, Premier League — những giải bóng đá, không phải cầu lông.',
      ],
      ['Đúng — Vietnam Open, SEA Games và ASIAD đều có nội dung cầu lông.', 'Sai — Olympic có cầu lông nhưng không phải chỉ trao mỗi huy chương vàng.', 'Sai — World Cup là giải bóng đá, không phải cầu lông.', 'Sai — Premier League là giải bóng đá Anh.']),
  ]),

  M(24, 'Bóng chuyền — Phối hợp đội', [
    Q('Vị trí libero?', ['Chuyên phòng thủ, không được phát + tấn công trên lưới', 'Chuyên đập bóng tấn công ở hàng trên', 'Phát bóng', 'Tấn công'], 0, 'Libero chuyên đỡ bóng, mặc áo khác màu.',
      [
        '<b>Libero</b> là vị trí <code>chuyên phòng thủ</code> ở hàng sau, mặc <b>áo khác màu</b> để dễ nhận biết.<ul><li>Chuyên đỡ bước một (đỡ phát, đỡ đập) rất chắc.</li><li><b>Không được</b> phát bóng, chắn lưới hay đập bóng trên lưới.</li><li>Được thay người tự do, không tính vào số lần thay.</li></ul>',
        '<i>Vai trò:</i> libero giúp đội <b>phòng thủ ổn định hơn</b> mà không chiếm suất tấn công. Đây là vị trí ra đời để cân bằng công – thủ trong bóng chuyền hiện đại.',
      ],
      ['Đúng — libero chuyên phòng thủ, không được phát và không tấn công trên lưới.', 'Sai — libero không lên hàng trên đập bóng.', 'Sai — libero không được thực hiện cú phát bóng.', 'Sai — libero là vị trí phòng thủ, không tấn công.']),
    Q('Setter (chuyền 2) làm?', ['Chuyền bóng tới attacker để tấn công', 'Chặn các cú đập tại lưới', 'Phát bóng mở đầu mỗi pha', 'Đập bóng kết thúc pha tấn công'], 0, 'Setter là "nhạc trưởng" tấn công.',
      [
        '<b>Setter (chuyền 2)</b> là <code>"nhạc trưởng"</code> của đội: nhận bóng ở chạm thứ hai và <b>chuyền (set) đặt bóng</b> vào vị trí thuận lợi cho chủ công đập dứt điểm.<ul><li>Quyết định <b>ai đập, đập hướng nào</b> — điều phối cả nhịp tấn công.</li><li>Đòi hỏi đôi tay khéo và đầu óc chiến thuật.</li></ul>',
        '<i>Chuỗi tấn công:</i> đỡ (chạm 1) → <b>set / chuyền 2 (chạm 2 – setter)</b> → đập (chạm 3 – chủ công). Setter giỏi biến bóng đỡ khó thành cơ hội ghi điểm.',
      ],
      ['Đúng — setter chuyền bóng dọn cỗ cho chủ công tấn công.', 'Sai — chặn đập tại lưới là việc của người chắn, không phải nhiệm vụ chính của setter.', 'Sai — phát bóng không phải vai trò đặc trưng của setter.', 'Sai — đập bóng dứt điểm là việc của chủ công.']),
    Q('Số người mỗi đội?', ['5', '7', '4', '6 trên sân'], 3, 'Bóng chuyền 6 người/sân.',
      [
        '<b>Số người trên sân</b> trong bóng chuyền: mỗi đội <code>6 người</code>, bố trí thành 2 hàng (3 hàng trước gần lưới, 3 hàng sau).<ul><li>Các vị trí <b>xoay vòng (rotation)</b> theo chiều kim đồng hồ mỗi khi giành quyền phát.</li><li>Có thêm libero và cầu thủ dự bị ngoài sân.</li></ul>',
        '<i>So sánh để nhớ:</i> Bóng chuyền <b>6</b> người/sân — Bóng rổ <b>5</b> — Bóng đá <b>11</b>. Đừng nhầm con số giữa các môn khi làm bài.',
      ],
      ['Sai — 5 người/sân là bóng rổ.', 'Sai — 7 người không đúng với bóng chuyền.', 'Sai — 4 người ít hơn quy định của bóng chuyền.', 'Đúng — bóng chuyền có 6 người mỗi đội trên sân.']),
    Q('Cú phát mạnh phổ biến?', ['Phát bóng bằng đầu gối', 'Phát tay dưới', 'Phát đẩy', 'Phát đập (jump serve)'], 3, 'Jump serve là cú phát mạnh phổ biến.',
      [
        '<b>Các kiểu phát bóng</b> theo độ uy lực tăng dần:<ul><li><b>Phát tay dưới:</b> nhẹ, dễ, cho người mới.</li><li><b>Phát tay trên (phát đẩy):</b> mạnh hơn, ổn định.</li><li><b>Phát đập (jump serve):</b> tung bóng, chạy đà, nhảy lên đập như cú spike — <code>mạnh và uy lực nhất</code>.</li></ul>',
        '<i>Vì sao jump serve phổ biến ở trình độ cao?</i> Bóng đi nhanh, xoáy, cắm mạnh khiến đối phương <b>khó đỡ bước một</b>, có thể ghi điểm trực tiếp (ace). Đổi lại, độ khó và rủi ro lỗi cũng cao hơn.',
      ],
      ['Sai — không có kỹ thuật phát bằng đầu gối.', 'Sai — phát tay dưới nhẹ, dành cho người mới.', 'Sai — phát đẩy ít uy lực hơn phát đập.', 'Đúng — phát đập (jump serve) là cú phát mạnh và phổ biến.']),
    Q('Set bóng chuyền tới?', ['15 điểm', '30 điểm', '21 điểm', '25 điểm, chênh 2 (set 5 đến 15)'], 3, '25 điểm theo luật FIVB.',
      [
        '<b>Luật tính điểm bóng chuyền (FIVB)</b>:<ul><li>Mỗi set đấu đến <code>25 điểm</code>, bên thắng phải hơn ít nhất <b>2 điểm</b> (ví dụ 25–23, hoặc kéo dài 26–24...).</li><li>Trận đấu theo thể thức <b>thắng 3/5 set</b>.</li><li><b>Set quyết định (set 5)</b> chỉ đấu đến <b>15 điểm</b> (vẫn cách 2).</li></ul>',
        '<i>Phân biệt:</i> 25 điểm là bóng chuyền; 21 điểm là cầu lông và đá cầu hiện đại. Áp dụng luật điểm trực tiếp (rally point): <b>pha cầu nào cũng có điểm</b>.',
      ],
      ['Sai — chỉ set quyết định (set 5) mới đến 15 điểm.', 'Sai — không có set nào đến 30 điểm.', 'Sai — 21 điểm là luật cầu lông, không phải bóng chuyền.', 'Đúng — set bóng chuyền đến 25 điểm, chênh 2; set 5 đến 15 điểm.']),
  ]),

  M(25, 'Bóng rổ — Thi đấu', [
    Q('Bóng rổ một đội bao nhiêu người trên sân?', ['6', '4', '5', '7'], 2, 'Bóng rổ 5 người/sân.',
      [
        '<b>Số người trên sân</b> trong bóng rổ: mỗi đội <code>5 người</code>, thường gồm các vị trí: hậu vệ dẫn bóng (point guard), hậu vệ ghi điểm (shooting guard), tiền phong (forward) và trung phong (center).<ul><li>Có 5 người chính và các cầu thủ dự bị thay vào tự do.</li></ul>',
        '<i>So sánh để nhớ:</i> Bóng rổ <b>5</b> — Bóng chuyền <b>6</b> — Bóng đá <b>11</b>. Đây là con số dễ bị hỏi trong kiểm tra nên cần nhớ chắc.',
      ],
      ['Sai — 6 người/sân là bóng chuyền.', 'Sai — 4 người ít hơn quy định bóng rổ.', 'Đúng — bóng rổ có 5 người mỗi đội trên sân.', 'Sai — 7 người không đúng với bóng rổ.']),
    Q('Một trận chia mấy hiệp?', ['5 hiệp', '3 hiệp', '4 hiệp × 10 phút (FIBA)', '2 hiệp'], 2, 'FIBA: 4 × 10 phút; NBA: 4 × 12.',
      [
        '<b>Thời gian trận bóng rổ</b>: chia <code>4 hiệp (quarter)</code>:<ul><li><b>FIBA</b> (luật quốc tế, học đường): mỗi hiệp <b>10 phút</b>.</li><li><b>NBA</b>: mỗi hiệp <b>12 phút</b>.</li></ul>Giữa hiệp 2 và 3 có nghỉ giữa trận; nếu hoà sẽ đá hiệp phụ.',
        '<i>Lưu ý:</i> đồng hồ bóng rổ dừng nhiều lần (khi bóng chết, hội ý...) nên thời gian thực tế dài hơn. Phân biệt với bóng đá (2 hiệp × 45 phút).',
      ],
      ['Sai — bóng rổ không thi đấu 5 hiệp.', 'Sai — không phải 3 hiệp.', 'Đúng — theo FIBA, trận chia 4 hiệp mỗi hiệp 10 phút.', 'Sai — 2 hiệp là của bóng đá, không phải bóng rổ.']),
    Q('Điểm 1, 2, 3 từ?', ['Tất cả các cú ném đều được 3 điểm', 'Ném phạt (1), trong vạch 3 (2), ngoài vạch 3 (3)', 'Mọi cú ném vào rổ đều được 2 điểm', 'Ném phạt 2 điểm, ném sân 1 điểm'], 1, 'Quy tắc tính điểm rõ ràng.',
      [
        '<b>Cách tính điểm bóng rổ</b>:<ul><li><b>1 điểm:</b> mỗi quả <code>ném phạt</code> (free throw) thành công.</li><li><b>2 điểm:</b> ném vào rổ từ <b>trong vạch 3 điểm</b>.</li><li><b>3 điểm:</b> ném vào rổ từ <b>ngoài vạch 3 điểm</b> (cách rổ 6,75m theo FIBA).</li></ul>',
        '<i>Ý nghĩa chiến thuật:</i> cú 3 điểm khó hơn nhưng đáng giá hơn, có thể nhanh chóng thay đổi cục diện. Nắm chắc quy tắc điểm giúp hiểu vì sao các đội chú trọng ném xa.',
      ],
      ['Sai — không phải mọi cú ném đều 3 điểm.', 'Đúng — ném phạt được 1, trong vạch 3 được 2, ngoài vạch 3 được 3 điểm.', 'Sai — ném phạt chỉ 1 điểm và ngoài vạch 3 được 3 điểm.', 'Sai — ném phạt là 1 điểm, không phải 2.']),
    Q('5 lỗi cá nhân?', ['Phạt tiền', 'Không sao', 'Cảnh cáo', 'Bị truất quyền thi đấu (NCAA/FIBA)'], 3, '5 lỗi = bị truất (NBA là 6 lỗi).',
      [
        '<b>Giới hạn lỗi cá nhân</b>: theo <code>FIBA và NCAA</code>, một cầu thủ phạm đủ <b>5 lỗi cá nhân</b> sẽ <b>bị truất quyền thi đấu</b> (foul out), phải rời sân và được thay người khác.<ul><li>NBA quy định mức cao hơn: <b>6 lỗi</b>.</li></ul>',
        '<i>Vì sao có luật này?</i> Để hạn chế chơi xấu và bảo vệ cầu thủ. Cầu thủ giỏi phải biết <b>phòng thủ "sạch"</b> để không sớm bị loại vì quá nhiều lỗi — đó cũng là một phần của bản lĩnh thi đấu.',
      ],
      ['Sai — bóng rổ không phạt tiền khi đủ lỗi cá nhân.', 'Sai — đủ 5 lỗi thì có hậu quả, không phải không sao.', 'Sai — đây là bị truất khỏi sân chứ không chỉ cảnh cáo.', 'Đúng — đủ 5 lỗi cá nhân thì bị truất quyền thi đấu (theo FIBA/NCAA).']),
  ]),

  M(26, 'Bóng đá — Thi đấu chiến thuật', [
    Q('Đội hình phổ biến?', ['Đội hình không cố định, đổi từng pha', '4-4-2, 4-3-3, 3-5-2', 'Chỉ 4-4-2', '2-2-6'], 1, 'Nhiều đội hình theo chiến thuật.',
      [
        '<b>Sơ đồ đội hình bóng đá</b> đọc theo thứ tự <code>hậu vệ – tiền vệ – tiền đạo</code> (không kể thủ môn):<ul><li><b>4-4-2:</b> cân bằng, dễ chơi.</li><li><b>4-3-3:</b> thiên tấn công, nhiều phương án biên.</li><li><b>3-5-2:</b> mạnh ở tuyến giữa.</li></ul>',
        '<i>Linh hoạt:</i> đội có sơ đồ nền nhưng <b>thay đổi theo đối thủ và tình huống</b>. Tổng luôn là 10 cầu thủ + 1 thủ môn = 11. Sơ đồ quá lệch như 2-2-6 rất mất cân bằng, không được dùng.',
      ],
      ['Sai — đội bóng vẫn có sơ đồ nền dù linh hoạt theo pha.', 'Đúng — 4-4-2, 4-3-3 và 3-5-2 là các đội hình phổ biến.', 'Sai — không chỉ có mỗi 4-4-2 mà còn nhiều sơ đồ khác.', 'Sai — 2-2-6 quá mất cân bằng, không phổ biến.']),
    Q('Số người mỗi đội (11 người)?', ['10', '12', '11 trên sân kể thủ môn', '9'], 2, 'Bóng đá 11 người/sân.',
      [
        '<b>Số người trên sân</b> trong bóng đá: mỗi đội <code>11 người</code>, gồm <b>1 thủ môn</b> và <b>10 cầu thủ</b> ngoài sân (hậu vệ, tiền vệ, tiền đạo).<ul><li>Có cầu thủ dự bị trên ghế, được thay theo số lần quy định.</li><li>Nếu bị thẻ đỏ, đội phải đá thiếu người.</li></ul>',
        '<i>So sánh để nhớ:</i> Bóng đá <b>11</b> — Bóng chuyền <b>6</b> — Bóng rổ <b>5</b>. Đây là kiến thức cơ bản hay xuất hiện trong bài kiểm tra.',
      ],
      ['Sai — 10 thiếu một người so với đội hình đủ.', 'Sai — 12 nhiều hơn quy định cho phép.', 'Đúng — mỗi đội có 11 người trên sân, kể cả thủ môn.', 'Sai — 9 ít hơn số người chuẩn của bóng đá.']),
    Q('Thời gian trận đấu chuẩn?', ['120 phút', '70 phút', '90 phút (2 hiệp × 45)', '60 phút'], 2, '90 phút chính thức + bù giờ.',
      [
        '<b>Thời gian một trận bóng đá</b>: <code>90 phút</code> chính thức, chia <b>2 hiệp × 45 phút</b>, nghỉ giữa hai hiệp 15 phút.<ul><li>Cuối mỗi hiệp có <b>bù giờ (injury time)</b> cho thời gian bóng chết.</li><li>Nếu vòng loại trực tiếp hoà, đá thêm <b>2 hiệp phụ × 15 phút</b> (tổng 120 phút).</li></ul>',
        '<i>Phân biệt:</i> 120 phút là khi có hiệp phụ; bóng rổ thì chia 4 hiệp. Đồng hồ bóng đá <b>chạy liên tục</b>, không dừng như bóng rổ.',
      ],
      ['Sai — 120 phút là khi có 2 hiệp phụ.', 'Sai — 70 phút không đúng thời gian chuẩn.', 'Đúng — trận chuẩn 90 phút, chia 2 hiệp mỗi hiệp 45 phút.', 'Sai — 60 phút ngắn hơn thời gian thi đấu chuẩn.']),
    Q('Khi hoà ở loại trực tiếp?', ['Tung đồng xu', 'Hiệp phụ + sút penalty nếu vẫn hoà', 'Tính bàn thắng sân khách để phân định', 'Đá lại'], 1, 'Quy trình giải quyết hoà rõ ràng.',
      [
        '<b>Phân định thắng thua khi hoà</b> ở vòng loại trực tiếp (knock-out):<ul><li>Đá thêm <code>2 hiệp phụ × 15 phút</code>.</li><li>Nếu vẫn hoà → <b>sút luân lưu (penalty)</b> từ chấm 11m để tìm đội thắng.</li></ul>',
        '<i>Lưu ý:</i> tung đồng xu để phân thắng bại đã bị bỏ; <b>luật bàn thắng sân khách</b> cũng được nhiều giải bãi bỏ. Loạt sút luân lưu là màn căng thẳng và kịch tính bậc nhất của bóng đá.',
      ],
      ['Sai — tung đồng xu không dùng để phân định trận hoà ngày nay.', 'Đúng — đá hiệp phụ, nếu vẫn hoà thì sút luân lưu penalty.', 'Sai — luật bàn thắng sân khách đã bị bãi bỏ ở nhiều giải.', 'Sai — vòng loại trực tiếp thường không đá lại mà giải quyết trong ngày.']),
  ]),

  M(27, 'Thể chất — Sức mạnh và linh hoạt', [
    Q('Tập sức mạnh dùng?', ['Chỉ kéo dãn', 'Tạ, bodyweight (chống đẩy, gập bụng)', 'Chỉ cần đi bộ nhẹ hằng ngày là đủ', 'Chỉ chạy'], 1, 'Sức mạnh tập với tạ hoặc trọng lượng cơ thể.',
      [
        '<b>Tập sức mạnh (strength)</b> là rèn khả năng cơ sinh lực lớn, dùng <code>lực cản (kháng lực)</code>:<ul><li><b>Tạ</b> (tạ tay, tạ đòn) — với lứa tuổi học sinh dùng mức nhẹ, đúng kỹ thuật.</li><li><b>Trọng lượng cơ thể (bodyweight):</b> chống đẩy, gập bụng, squat, hít xà.</li></ul>',
        '<i>Phân biệt 4 tố chất thể lực:</i> <b>sức mạnh</b> (tạ, bodyweight), <b>sức bền</b> (chạy bền), <b>tốc độ</b> (sprint), <b>linh hoạt/mềm dẻo</b> (giãn cơ). Đi bộ nhẹ hay chạy rèn sức bền, không phải sức mạnh.',
      ],
      ['Sai — kéo dãn rèn linh hoạt chứ không phải sức mạnh.', 'Đúng — sức mạnh tập với tạ hoặc trọng lượng cơ thể như chống đẩy, gập bụng.', 'Sai — đi bộ nhẹ không đủ để tăng sức mạnh.', 'Sai — chạy rèn sức bền, không phải sức mạnh.']),
    Q('Tập linh hoạt?', ['Chạy bền tốc độ cao', 'Nâng tạ nặng tối đa', 'Tập sprint cự ly ngắn', 'Giãn cơ tĩnh + động, yoga, pilates'], 3, 'Stretching tăng linh hoạt.',
      [
        '<b>Tập linh hoạt (mềm dẻo – flexibility)</b> là tăng biên độ cử động của khớp và độ co giãn của cơ, bằng:<ul><li><b>Giãn cơ tĩnh:</b> kéo căng và giữ yên một tư thế.</li><li><b>Giãn cơ động:</b> vung, xoay khớp có kiểm soát.</li><li><b>Yoga, Pilates:</b> các bài tập chuyên tăng độ dẻo.</li></ul>',
        '<i>Lợi ích:</i> linh hoạt tốt giúp <b>cử động thoải mái, giảm chấn thương</b> và hỗ trợ kỹ thuật ở mọi môn. Nâng tạ nặng rèn sức mạnh, sprint rèn tốc độ — không phải linh hoạt.',
      ],
      ['Sai — chạy bền rèn sức bền, không phải linh hoạt.', 'Sai — nâng tạ nặng rèn sức mạnh, không phải linh hoạt.', 'Sai — sprint rèn tốc độ, không tăng độ dẻo.', 'Đúng — giãn cơ tĩnh và động, yoga, pilates giúp tăng linh hoạt.']),
    Q('Nguyên tắc tập luyện?', ['Quá sức', 'Đột ngột', 'Khởi động – tập – thả lỏng, tăng tiến dần', 'Tập cường độ tối đa ngay từ phút đầu'], 2, 'Quy trình tập an toàn.',
      [
        '<b>Nguyên tắc tập luyện an toàn và khoa học</b>:<ul><li><b>Trình tự:</b> <code>Khởi động → Tập chính → Thả lỏng</code> trong mỗi buổi.</li><li><b>Tăng tiến dần (progressive):</b> nâng dần lượng vận động theo thời gian.</li><li><b>Vừa sức, đều đặn, đa dạng.</b></li></ul>',
        '<i>Tránh:</i> tập quá sức, tăng đột ngột hay vào cường độ tối đa ngay từ phút đầu — đều dễ gây <b>chấn thương và kiệt sức</b>. Tập đúng nguyên tắc giúp tiến bộ bền vững và an toàn.',
      ],
      ['Sai — tập quá sức dễ gây chấn thương.', 'Sai — tăng đột ngột không an toàn cho cơ thể.', 'Đúng — khởi động, tập rồi thả lỏng và tăng tiến dần là nguyên tắc an toàn.', 'Sai — cường độ tối đa ngay từ đầu rất nguy hiểm.']),
    Q('Hồi phục cần?', ['Nhịn ăn để giảm cân nhanh hơn', 'Tập liên tục', 'Uống nước có ga thay cho nước lọc', 'Ngủ đủ, dinh dưỡng, nước'], 3, 'Hồi phục quan trọng như tập luyện.',
      [
        '<b>Hồi phục (recovery)</b> quan trọng ngang với tập luyện — cơ thể khoẻ lên chính trong lúc nghỉ. Ba trụ cột:<ul><li><b>Ngủ đủ giấc</b> (cơ phục hồi, tiết hormone tăng trưởng khi ngủ).</li><li><b>Dinh dưỡng đầy đủ</b> (protein xây cơ, carb nạp lại năng lượng).</li><li><b>Uống đủ nước.</b></li></ul>',
        '<i>Sai lầm:</i> nhịn ăn để giảm cân làm cơ thể <b>thiếu nguyên liệu hồi phục</b>; tập liên tục không nghỉ gây quá tải; nước có ga không thay được nước lọc. Cân bằng tập – nghỉ – ăn mới tiến bộ lâu dài.',
      ],
      ['Sai — nhịn ăn làm cơ thể thiếu năng lượng để hồi phục.', 'Sai — tập liên tục không nghỉ khiến cơ thể quá tải.', 'Sai — nước có ga không thay được nước lọc khi hồi phục.', 'Đúng — ngủ đủ, dinh dưỡng tốt và uống đủ nước giúp hồi phục.']),
  ]),

  M(28, 'Dinh dưỡng cho người tập thể thao', [
    Q('Carbohydrate cung cấp?', ['Vitamin', 'Nguyên liệu chính xây dựng cơ bắp', 'Năng lượng chính cho cơ thể', 'Khoáng chất giúp xương chắc khỏe'], 2, 'Carb là nguồn năng lượng chính.',
      [
        '<b>Carbohydrate (chất bột đường)</b> là <code>nguồn năng lượng chính</code> của cơ thể, đặc biệt khi vận động. Cơ thể chuyển carb thành glucose và tích trữ dưới dạng glycogen ở cơ và gan.<ul><li>Nguồn: cơm, bánh mì, khoai, mì, trái cây.</li></ul>',
        '<i>Phân biệt vai trò 3 nhóm chất sinh năng lượng:</i> <b>carb</b> = năng lượng chính, <b>protein</b> = xây cơ, <b>chất béo</b> = năng lượng dự trữ. Vitamin và khoáng chất là vi chất, đóng vai trò khác.',
      ],
      ['Sai — vitamin đến từ rau quả, không phải vai trò chính của carb.', 'Sai — xây cơ bắp là vai trò của protein.', 'Đúng — carbohydrate là nguồn năng lượng chính cho cơ thể.', 'Sai — khoáng chất cho xương là canxi, không phải carb.']),
    Q('Protein cần cho?', ['Xây và phục hồi cơ', 'Vitamin', 'Tăng độ dẻo dai cho khớp', 'Năng lượng'], 0, 'Protein xây cơ.',
      [
        '<b>Protein (chất đạm)</b> là nguyên liệu <code>xây dựng và phục hồi cơ bắp</code>, mô và tế bào. Sau khi tập, cơ có những vi tổn thương; protein giúp sửa chữa và làm cơ to – khoẻ hơn.<ul><li>Nguồn: thịt, cá, trứng, sữa, đậu, các loại hạt.</li></ul>',
        '<i>Quan trọng với người tập:</i> ăn đủ đạm giúp <b>cơ phục hồi nhanh và phát triển</b>. Năng lượng chính đến từ carb; vitamin là nhóm vi chất khác — không nhầm vai trò của protein.',
      ],
      ['Đúng — protein dùng để xây dựng và phục hồi cơ bắp.', 'Sai — vitamin là nhóm chất khác, không phải vai trò của protein.', 'Sai — độ dẻo dai khớp do tập luyện, không phải vai trò chính của protein.', 'Sai — năng lượng chính đến từ carb, không phải protein.']),
    Q('Trước tập 1 giờ nên?', ['Ăn nhiều đồ chiên rán giàu dầu mỡ', 'Ăn nhẹ, dễ tiêu (chuối, bánh mì)', 'Ăn một bữa thật no trước khi tập', 'Nhịn ăn để cơ thể đốt mỡ nhanh hơn'], 1, 'Ăn nhẹ trước tập 1 giờ giúp duy trì năng lượng.',
      [
        '<b>Ăn trước khi tập (khoảng 1 giờ)</b>: nên ăn <code>nhẹ, dễ tiêu, giàu carb</code> như <b>chuối, bánh mì, ngũ cốc</b> để có năng lượng mà không nặng bụng.<ul><li>Thực phẩm dễ tiêu giúp dạ dày không khó chịu khi vận động.</li></ul>',
        '<i>Tránh:</i> đồ chiên rán nhiều dầu mỡ <b>khó tiêu</b>; ăn quá no gây nặng bụng, đau xóc; nhịn ăn làm <b>tụt năng lượng, mệt và chóng mặt</b>. Ăn đúng cách trước tập giúp duy trì sức suốt buổi.',
      ],
      ['Sai — đồ chiên rán khó tiêu, dễ gây nặng bụng khi tập.', 'Đúng — ăn nhẹ, dễ tiêu như chuối hay bánh mì giúp duy trì năng lượng.', 'Sai — ăn quá no trước tập gây khó chịu và đau bụng.', 'Sai — nhịn ăn làm thiếu năng lượng, dễ mệt khi tập.']),
    Q('Uống nước khi tập?', ['Một lần nhiều', 'Uống đều, từng ngụm nhỏ', 'Không uống', 'Chỉ uống nước ngọt có ga để bổ sung đường'], 1, 'Hydration đều giúp tránh mất nước.',
      [
        '<b>Bù nước khi tập</b>: uống <code>đều đặn, từng ngụm nhỏ</code> trước – trong – sau khi vận động, không đợi đến khi thật khát mới uống.<ul><li>Vận động làm mất nước qua mồ hôi; thiếu nước gây giảm sức, chuột rút.</li><li>Buổi tập dài, ra nhiều mồ hôi có thể bù thêm điện giải.</li></ul>',
        '<i>Tránh:</i> uống thật nhiều một lúc gây <b>tức bụng, óc ách</b>; không uống thì mất nước; nước ngọt có ga không phù hợp để bù nước. Nước lọc là lựa chọn tốt nhất cho hầu hết buổi tập.',
      ],
      ['Sai — uống quá nhiều một lúc dễ tức bụng.', 'Đúng — uống đều từng ngụm nhỏ giúp giữ nước ổn định.', 'Sai — không uống dễ mất nước, giảm sức.', 'Sai — nước ngọt có ga không phù hợp để bù nước khi tập.']),
    Q('Sau tập nên ăn?', ['Chỉ ăn rau xanh và trái cây', 'Nhịn ăn 3 giờ để giảm cân', 'Chỉ rau', 'Carb + protein trong 30–60 phút (cửa sổ vàng)'], 3, 'Anabolic window giúp hồi phục cơ.',
      [
        '<b>Ăn sau khi tập</b>: bổ sung <code>carbohydrate + protein</code> trong khoảng <b>30–60 phút đầu</b> (gọi là "cửa sổ vàng" – anabolic window).<ul><li><b>Carb</b> nạp lại glycogen đã tiêu hao.</li><li><b>Protein</b> sửa chữa và xây dựng cơ.</li><li>Ví dụ: sữa, trứng + bánh mì, cơm + thịt.</li></ul>',
        '<i>Vì sao quan trọng?</i> Đây là lúc cơ thể <b>hấp thu và hồi phục tốt nhất</b>. Chỉ ăn rau quả thì thiếu đạm; nhịn ăn làm cơ chậm phục hồi. Ăn đúng sau tập giúp tiến bộ và đỡ mệt mỏi.',
      ],
      ['Sai — chỉ rau quả thiếu protein để phục hồi cơ.', 'Sai — nhịn ăn sau tập làm cơ chậm hồi phục.', 'Sai — chỉ ăn rau không cung cấp đủ chất cho cơ.', 'Đúng — bổ sung carb và protein trong 30–60 phút sau tập giúp hồi phục cơ.']),
  ]),

  M(29, 'Bệnh và chấn thương — Phòng tránh', [
    Q('Chấn thương phổ biến khi tập?', ['Đau bụng', 'Đau đầu do căng thẳng học tập', 'Cảm cúm', 'Bong gân, căng cơ, trật khớp'], 3, 'Chấn thương cơ-khớp phổ biến trong thể thao.',
      [
        '<b>Chấn thương thể thao phổ biến</b> là các tổn thương <code>cơ – xương – khớp</code>:<ul><li><b>Bong gân:</b> dây chằng quanh khớp bị giãn/rách (hay gặp ở cổ chân, cổ tay).</li><li><b>Căng cơ (giãn cơ):</b> sợi cơ bị kéo quá mức.</li><li><b>Trật khớp:</b> đầu xương lệch khỏi ổ khớp.</li></ul>',
        '<i>Phân biệt:</i> đau bụng, đau đầu, cảm cúm là <b>bệnh hoặc khó chịu chung</b>, không phải chấn thương do tập. Nhận biết đúng loại chấn thương giúp sơ cứu kịp thời và đúng cách.',
      ],
      ['Sai — đau bụng không phải chấn thương thể thao điển hình.', 'Sai — đau đầu do học tập không liên quan tập luyện.', 'Sai — cảm cúm là bệnh, không phải chấn thương khi tập.', 'Đúng — bong gân, căng cơ và trật khớp là chấn thương phổ biến khi tập.']),
    Q('Sơ cứu RICE?', ['Rest, Iron, Care, Exercise', 'Rest, Ice, Compression, Elevation', 'Run, Ice, Cry, Eat', 'Rub, Ice, Carry, Eat'], 1, 'RICE là quy trình sơ cứu cơ bản.',
      [
        '<b>RICE</b> là quy trình sơ cứu cơ bản cho chấn thương phần mềm (bong gân, căng cơ):<ul><li><b>R</b>est — <code>Nghỉ ngơi</code>, ngừng vận động vùng bị thương.</li><li><b>I</b>ce — <code>Chườm đá</code> (qua khăn) để giảm sưng, đau.</li><li><b>C</b>ompression — <code>Băng ép</code> cố định.</li><li><b>E</b>levation — <code>Kê cao</code> vùng bị thương hơn tim.</li></ul>',
        '<i>Lưu ý:</i> RICE áp dụng trong 24–48 giờ đầu. <b>Không</b> chườm nóng hay xoa bóp mạnh ngay vì làm sưng nặng hơn. Chấn thương nặng phải đến cơ sở y tế.',
      ],
      ['Sai — các từ này không khớp với quy trình RICE.', 'Đúng — RICE là Rest (nghỉ), Ice (chườm đá), Compression (băng ép), Elevation (kê cao).', 'Sai — đây không phải nội dung của RICE.', 'Sai — các từ này sai so với quy trình RICE.']),
    Q('Để tránh chấn thương?', ['Khởi động, đúng kỹ thuật, không quá sức', 'Bỏ khởi động', 'Tập càng nhanh và càng nặng càng tốt', 'Tập nhiều'], 0, 'Phòng > chữa.',
      [
        '<b>Phòng tránh chấn thương</b> theo nguyên tắc "<code>phòng hơn chữa</code>":<ul><li><b>Khởi động kỹ</b> trước khi tập.</li><li>Tập <b>đúng kỹ thuật</b>, đúng tư thế.</li><li><b>Không quá sức</b>, tăng tiến từ từ.</li><li>Dùng dụng cụ bảo hộ, sân bãi an toàn; thả lỏng sau tập.</li></ul>',
        '<i>Tránh:</i> bỏ khởi động, tập quá nhanh – quá nặng hay tập nhiều vô tội vạ đều <b>làm tăng nguy cơ chấn thương</b>. Một chấn thương có thể khiến phải nghỉ tập rất lâu, nên phòng ngừa luôn là ưu tiên.',
      ],
      ['Đúng — khởi động, tập đúng kỹ thuật và không quá sức giúp tránh chấn thương.', 'Sai — bỏ khởi động làm tăng nguy cơ chấn thương.', 'Sai — tập quá nhanh và nặng dễ gây chấn thương.', 'Sai — tập quá nhiều mà không hợp lý cũng dễ chấn thương.']),
    Q('Khi chấn thương nặng?', ['Tự nắn khớp và uống thuốc giảm đau', 'Đợi tự khỏi', 'Đến cơ sở y tế ngay', 'Chườm nóng rồi xoa bóp mạnh chỗ đau'], 2, 'Chấn thương nặng cần y tế chuyên môn.',
      [
        '<b>Xử lý chấn thương nặng</b> (nghi gãy xương, trật khớp, đau dữ dội, biến dạng): <code>đến cơ sở y tế ngay</code> để được bác sĩ chẩn đoán và xử lý chuyên môn.<ul><li>Cố định tạm thời, hạn chế cử động vùng tổn thương khi di chuyển.</li><li>Không tự ý nắn, kéo khớp.</li></ul>',
        '<i>Tuyệt đối tránh:</i> <b>tự nắn khớp</b> (có thể làm tổn thương mạch máu, thần kinh), chườm nóng và xoa bóp mạnh ngay (làm sưng và chảy máu trong nặng hơn), hay để "tự khỏi". An toàn và sức khoẻ là trên hết.',
      ],
      ['Sai — tự nắn khớp có thể làm tổn thương nặng thêm.', 'Sai — chấn thương nặng để tự khỏi rất nguy hiểm.', 'Đúng — chấn thương nặng cần đến cơ sở y tế ngay để xử lý chuyên môn.', 'Sai — chườm nóng và xoa bóp mạnh ngay có thể làm sưng nặng hơn.']),
  ]),

  M(30, 'Đạo đức trong thể thao', [
    Q('Fair play (chơi đẹp) là?', ['Phạm lỗi cố ý', 'Trung thực, tôn trọng luật, đối thủ, trọng tài', 'Khiêu khích', 'Gian lận'], 1, 'Fair play là tinh thần thể thao cao đẹp.',
      [
        '<b>Fair play (chơi đẹp)</b> là tinh thần thể thao cao đẹp: <code>trung thực, tôn trọng luật chơi, tôn trọng đối thủ và trọng tài</code>.<ul><li>Thi đấu hết mình nhưng đàng hoàng, không tiểu xảo.</li><li>Tôn trọng kết quả, chấp nhận thắng – thua trong danh dự.</li></ul>',
        '<i>Vì sao quan trọng?</i> Thể thao không chỉ rèn thể lực mà còn rèn <b>nhân cách</b>. Phạm lỗi cố ý, khiêu khích, gian lận đều đi ngược fair play — thắng kiểu đó không vinh quang. Đây là giá trị cốt lõi của giáo dục thể chất.',
      ],
      ['Sai — phạm lỗi cố ý trái với tinh thần fair play.', 'Đúng — fair play là trung thực, tôn trọng luật, đối thủ và trọng tài.', 'Sai — khiêu khích đối thủ không phải chơi đẹp.', 'Sai — gian lận đi ngược lại fair play.']),
    Q('Doping (dùng chất cấm) là?', ['Khôn ngoan', 'Vi phạm đạo đức + luật thể thao', 'Được phép nếu không bị phát hiện', 'Cách hợp pháp để nâng thành tích'], 1, 'Doping vi phạm cả đạo đức và luật.',
      [
        '<b>Doping</b> là việc dùng <code>chất cấm</code> hoặc phương pháp bị cấm để nâng cao thành tích thi đấu một cách gian lận. Đây là hành vi <b>vi phạm cả đạo đức lẫn luật thể thao</b>.<ul><li>Bị cấm bởi WADA (Cơ quan phòng chống doping thế giới).</li><li>Hậu quả: tước huy chương, cấm thi đấu, mất danh dự.</li></ul>',
        '<i>Quan trọng hơn:</i> doping <b>gây hại nghiêm trọng cho sức khoẻ</b> người dùng. Thành tích phải đến từ khổ luyện chân chính, không phải từ chất cấm — dù có bị phát hiện hay không, doping vẫn là sai trái.',
      ],
      ['Sai — doping không phải khôn ngoan mà là vi phạm.', 'Đúng — doping vi phạm cả đạo đức lẫn luật thể thao.', 'Sai — doping bị cấm dù có bị phát hiện hay không.', 'Sai — doping là bất hợp pháp, không phải cách nâng thành tích hợp lệ.']),
    Q('Khi thua trận?', ['Đổ lỗi', 'Bỏ giải', 'Khiêu khích', 'Tôn trọng đối thủ, rút kinh nghiệm'], 3, 'Tinh thần thể thao thể hiện khi thua.',
      [
        '<b>Thái độ khi thua trận</b> thể hiện rõ nhất tư cách của một vận động viên: <code>tôn trọng đối thủ</code> đã chơi tốt hơn, chúc mừng họ, và <b>bình tĩnh rút kinh nghiệm</b> để tiến bộ.<ul><li>Thất bại là một phần của thể thao và là bài học quý.</li></ul>',
        '<i>Tránh:</i> đổ lỗi cho đồng đội/trọng tài, bỏ giải hay khiêu khích — đều là biểu hiện thiếu fair play và <b>không giúp mình tiến bộ</b>. "Thắng không kiêu, bại không nản" là phẩm chất đáng quý.',
      ],
      ['Sai — đổ lỗi không giúp tiến bộ và thiếu fair play.', 'Sai — bỏ giải là thái độ thiếu chuyên nghiệp.', 'Sai — khiêu khích đối thủ là hành vi xấu.', 'Đúng — tôn trọng đối thủ và rút kinh nghiệm là tinh thần thể thao đẹp.']),
    Q('Khi thắng trận?', ['Khiêu khích', 'Khiêm tốn, tôn trọng đối thủ', 'Khoe khoang', 'Hung hăng'], 1, 'Khiêm tốn khi chiến thắng là phẩm chất tốt.',
      [
        '<b>Thái độ khi thắng trận</b>: giữ sự <code>khiêm tốn</code> và <b>tôn trọng đối thủ</b> đã cố gắng. Bắt tay, cảm ơn đối phương và trọng tài là cử chỉ đẹp của người chiến thắng.<ul><li>Niềm vui chiến thắng thể hiện chừng mực, không phô trương.</li></ul>',
        '<i>Tránh:</i> khoe khoang, khiêu khích hay hung hăng với đối thủ vừa thua — đó là biểu hiện thiếu văn hoá thể thao. "<b>Thắng không kiêu</b>" giúp giữ hình ảnh đẹp và sự nể trọng từ mọi người.',
      ],
      ['Sai — khiêu khích đối thủ khi thắng là hành vi xấu.', 'Đúng — khiêm tốn và tôn trọng đối thủ là phẩm chất tốt khi thắng.', 'Sai — khoe khoang thiếu tinh thần thể thao.', 'Sai — hung hăng trái với fair play.']),
  ]),

  M(31, 'Luyện sức bền — Chạy 1500m', [
    Q('Chiến thuật chạy 1500m?', ['Chạy chậm cả', 'Sprint từ đầu', 'Chạy bộ cùng nhịp với bạn bên cạnh', 'Bắt đầu vừa phải, giữ nhịp, tăng tốc cuối'], 3, 'Pacing là then chốt chạy bền.',
      [
        '<b>Chiến thuật chạy 1500m</b> dựa trên <code>phân phối sức (pacing)</code>:<ul><li><b>Đầu:</b> xuất phát ở tốc độ vừa phải, không lao quá nhanh.</li><li><b>Giữa:</b> giữ nhịp đều, tiết kiệm sức, thở ổn định.</li><li><b>Cuối:</b> dồn sức còn lại <b>tăng tốc bứt phá (nước rút)</b> về đích.</li></ul>',
        '<i>Vì sao pacing quan trọng?</i> Sprint từ đầu sẽ <b>cạn sức ở giữa đường</b>; chạy chậm cả thì không có thành tích. Chạy theo nhịp bạn bên cạnh có thể không hợp sức mình. Biết "đọc sức" của bản thân là chìa khoá.',
      ],
      ['Sai — chạy chậm cả quãng thì khó đạt thành tích tốt.', 'Sai — sprint từ đầu dễ kiệt sức ở giữa đường.', 'Sai — chạy theo nhịp bạn bên cạnh có thể không hợp sức mình.', 'Đúng — bắt đầu vừa phải, giữ nhịp đều rồi tăng tốc cuối là chiến thuật hợp lý.']),
    Q('Đảm bảo đủ nước?', ['Chỉ uống khi cảm thấy rất khát', 'Uống trước-trong-sau khi chạy', 'Chỉ sau', 'Không uống'], 1, 'Hydration đầy đủ giúp duy trì hiệu suất.',
      [
        '<b>Bù nước khi chạy bền</b>: uống đủ nước ở cả ba thời điểm <code>trước – trong – sau</code> khi chạy, không đợi đến lúc thật khát.<ul><li>Khát là dấu hiệu cơ thể <b>đã bắt đầu mất nước</b>.</li><li>Mất nước làm giảm sức bền, dễ chuột rút và choáng.</li></ul>',
        '<i>Cách uống:</i> từng ngụm nhỏ, đều đặn. Với buổi chạy dài và ra nhiều mồ hôi, có thể bù thêm <b>điện giải</b>. Đủ nước giúp <b>duy trì hiệu suất</b> suốt quãng đường.',
      ],
      ['Sai — đợi rất khát mới uống là đã mất nước rồi.', 'Đúng — uống nước trước, trong và sau khi chạy giúp giữ đủ nước.', 'Sai — chỉ uống sau khi chạy không đủ bù nước trong lúc tập.', 'Sai — không uống dễ mất nước, giảm hiệu suất.']),
    Q('Để chạy nhanh hơn?', ['Chỉ chạy chậm', 'Tăng cường interval + sức mạnh chân', 'Chỉ tập sức bền không cần sức mạnh', 'Bỏ tập'], 1, 'Interval + sức mạnh tăng VO₂max.',
      [
        '<b>Tập để chạy 1500m nhanh hơn</b> cần kết hợp:<ul><li><b>Chạy interval (lặp lại):</b> xen kẽ nhanh – chậm để nâng <code>VO₂max</code> và sức chịu đựng tốc độ.</li><li><b>Rèn sức mạnh chân</b> (squat, bật nhảy, chạy lên dốc) để mỗi bước chạy mạnh và bứt tốc tốt hơn.</li></ul>',
        '<i>Vì sao kết hợp?</i> Chỉ chạy chậm thì không tăng tốc độ; chỉ sức bền mà thiếu sức mạnh chân thì khó <b>nước rút ở cuối</b>. Phối hợp interval và sức mạnh giúp vừa bền vừa nhanh.',
      ],
      ['Sai — chỉ chạy chậm không giúp tăng tốc độ.', 'Đúng — kết hợp interval và rèn sức mạnh chân giúp chạy nhanh hơn.', 'Sai — chỉ sức bền mà thiếu sức mạnh chân thì khó bứt tốc.', 'Sai — bỏ tập thì không thể tiến bộ.']),
    Q('Trang phục chạy?', ['Giày thường', 'Mặc áo khoác dày để toát mồ hôi nhiều', 'Quần áo dày', 'Thoáng, hút mồ hôi, giày chuyên dụng'], 3, 'Trang phục phù hợp giúp hiệu suất.',
      [
        '<b>Trang phục chạy bền phù hợp</b>:<ul><li>Quần áo <code>thoáng mát, thấm hút mồ hôi</code>, nhẹ và co giãn.</li><li><b>Giày chạy chuyên dụng</b> — êm, nâng đỡ bàn chân, giảm chấn động lên khớp.</li></ul>',
        '<i>Tránh:</i> giày thường không nâng đỡ tốt dễ đau chân; <b>áo khoác dày</b> để "toát mồ hôi giảm cân" là quan niệm sai — gây nóng, mất nước nguy hiểm, không giảm mỡ thật. Quần áo dày làm vướng víu, nóng bức.',
      ],
      ['Sai — giày thường không nâng đỡ tốt khi chạy bền.', 'Sai — áo khoác dày gây nóng, mất nước, không giảm cân an toàn.', 'Sai — quần áo dày làm nóng và vướng víu.', 'Đúng — quần áo thoáng, hút mồ hôi và giày chuyên dụng giúp chạy hiệu quả.']),
  ]),

  M(32, 'Tổ chức trận đấu nhỏ', [
    Q('Trận đấu giao hữu cần?', ['Không cần trọng tài, các đội tự xử', 'Trọng tài, luật rõ ràng, tinh thần fair play', 'Không luật', 'Không trọng tài'], 1, 'Tổ chức cần đầy đủ và fair.',
      [
        '<b>Tổ chức một trận giao hữu</b> dù nhỏ cũng cần đủ ba yếu tố:<ul><li><b>Trọng tài</b> điều hành công bằng.</li><li><b>Luật chơi rõ ràng</b>, các đội thống nhất trước.</li><li><b>Tinh thần fair play</b> — chơi đẹp, vui là chính.</li></ul>',
        '<i>Vì sao cần?</i> Không có trọng tài hay luật rõ ràng thì trận đấu dễ <b>tranh cãi và hỗn loạn</b>. Biết cách tổ chức là một năng lực — giúp các em tự chủ trì hoạt động thể thao của lớp, của trường.',
      ],
      ['Sai — không có trọng tài thì dễ tranh cãi, thiếu công bằng.', 'Đúng — cần trọng tài, luật rõ ràng và tinh thần fair play.', 'Sai — không luật thì trận đấu thành hỗn loạn.', 'Sai — thiếu trọng tài làm khó xử lý tình huống.']),
    Q('Vai trò đội trưởng?', ['Im lặng', 'Đứng nhìn', 'Chỉ ghi điểm, không cần lãnh đạo đội', 'Dẫn dắt, động viên, giao tiếp với trọng tài'], 3, 'Đội trưởng có vai trò lãnh đạo.',
      [
        '<b>Vai trò đội trưởng (captain)</b>:<ul><li><b>Dẫn dắt</b> đội về chiến thuật và tinh thần.</li><li><b>Động viên</b> đồng đội, giữ đoàn kết khi gặp khó.</li><li>Là người <b>giao tiếp chính thức với trọng tài</b> (trao đổi, nhận quyết định).</li></ul>',
        '<i>Phẩm chất:</i> đội trưởng cần gương mẫu, bình tĩnh và biết lắng nghe. Đây là <b>vai trò lãnh đạo</b>, không phải chỉ ghi điểm hay đứng nhìn — rèn kỹ năng làm việc nhóm rất quý cho các em.',
      ],
      ['Sai — đội trưởng cần lên tiếng dẫn dắt, không im lặng.', 'Sai — đứng nhìn không phải vai trò của đội trưởng.', 'Sai — đội trưởng phải lãnh đạo chứ không chỉ ghi điểm.', 'Đúng — đội trưởng dẫn dắt, động viên đồng đội và giao tiếp với trọng tài.']),
    Q('Trọng tài cần?', ['Áp dụng luật khác nhau cho mỗi đội', 'Công bằng, hiểu luật, quyết đoán', 'Chỉ thổi còi khi có bàn thắng', 'Thiên vị'], 1, 'Trọng tài phải vô tư và hiểu luật.',
      [
        '<b>Phẩm chất trọng tài</b>:<ul><li><b>Công bằng – vô tư:</b> áp dụng <code>cùng một luật</code> cho cả hai đội.</li><li><b>Hiểu luật</b> tường tận để xử đúng tình huống.</li><li><b>Quyết đoán:</b> ra quyết định dứt khoát, không do dự.</li></ul>',
        '<i>Trách nhiệm:</i> trọng tài theo dõi <b>suốt trận</b>, không chỉ khi có bàn thắng. Thiên vị hay áp dụng luật khác nhau là điều cấm kỵ. Làm trọng tài giúp các em hiểu sâu luật và rèn tính công minh.',
      ],
      ['Sai — áp dụng luật khác nhau là thiên vị, sai nguyên tắc.', 'Đúng — trọng tài phải công bằng, hiểu luật và quyết đoán.', 'Sai — trọng tài phải theo dõi suốt trận, không chỉ khi có bàn thắng.', 'Sai — thiên vị là điều cấm kỵ với trọng tài.']),
    Q('Khi có tranh chấp?', ['Cãi nhau', 'Đánh nhau', 'Bỏ trận', 'Tôn trọng quyết định trọng tài'], 3, 'Tôn trọng trọng tài là tinh thần thể thao.',
      [
        '<b>Xử lý khi có tranh chấp</b> trong trận: <code>tôn trọng quyết định của trọng tài</code>. Nếu không đồng ý, đội trưởng có thể trao đổi lễ phép, nhưng kết luận cuối cùng thuộc về trọng tài.<ul><li>Giữ bình tĩnh, không để cảm xúc lấn át.</li></ul>',
        '<i>Tránh:</i> cãi nhau, đánh nhau hay bỏ trận đều là hành vi <b>thiếu fair play</b>, làm xấu hình ảnh và có thể bị kỷ luật. Tôn trọng trọng tài chính là tôn trọng luật chơi và tinh thần thể thao.',
      ],
      ['Sai — cãi nhau làm trận đấu căng thẳng và mất fair play.', 'Sai — đánh nhau là hành vi nghiêm trọng, bị cấm.', 'Sai — bỏ trận là thái độ thiếu chuyên nghiệp.', 'Đúng — tôn trọng quyết định trọng tài là tinh thần thể thao.']),
  ]),

  M(33, 'Ôn tập HK2', [
    Q('Bơi sải đặc trưng?', ['Hai tay vung cùng lúc ra trước rồi đẩy ngang', 'Không vung tay', 'Tay luân phiên trên đầu + đập chân nhanh', 'Tay đối xứng'], 2, 'Freestyle: tay luân phiên + flutter kick.',
      [
        '<b>Ôn tập HK2 — Bơi sải</b>: đặc trưng là <code>hai tay vung luân phiên qua đầu</code> kết hợp <b>đập chân nhanh (flutter kick)</b>, thân nằm ngang sát mặt nước.<ul><li>Là kiểu bơi nhanh nhất.</li><li>Thở bằng cách quay đầu sang ngang.</li></ul>',
        '<i>Phân biệt với bơi ếch:</i> bơi ếch dùng tay – chân <b>đối xứng cùng lúc</b> (hai tay quạt vòng, chân đạp ếch), có pha trượt nên chậm hơn. Nhớ rõ đặc trưng từng kiểu để không nhầm khi làm bài.',
      ],
      ['Sai — hai tay vung cùng lúc là kiểu khác (bơi ếch/bướm).', 'Sai — bơi sải phải vung tay để tạo lực kéo.', 'Đúng — bơi sải là tay luân phiên trên đầu kết hợp đập chân nhanh.', 'Sai — tay đối xứng là đặc trưng của bơi ếch, không phải bơi sải.']),
    Q('Sơ cứu chấn thương cơ khớp?', ['Heimlich', 'ABC (Airway, Breathing, Circulation)', 'RICE', 'Hô hấp nhân tạo và ép tim'], 2, 'RICE cho cơ-khớp; CPR khi ngừng tim.',
      [
        '<b>Ôn tập HK2 — Sơ cứu</b>: với chấn thương <code>cơ – khớp</code> (bong gân, căng cơ) dùng quy trình <b>RICE</b>:<ul><li><b>R</b>est (nghỉ) – <b>I</b>ce (chườm đá) – <b>C</b>ompression (băng ép) – <b>E</b>levation (kê cao).</li></ul>',
        '<i>Phân biệt các quy trình sơ cứu khác:</i> <b>Heimlich</b> dùng khi hóc dị vật; <b>ABC</b> (Airway–Breathing–Circulation) khi đánh giá người bất tỉnh; <b>hô hấp nhân tạo + ép tim (CPR)</b> khi ngừng tim. Mỗi tình huống có cách xử lý riêng.',
      ],
      ['Sai — Heimlich dùng khi bị hóc dị vật, không phải chấn thương cơ khớp.', 'Sai — ABC dùng khi đánh giá người bất tỉnh, không phải sơ cứu cơ khớp.', 'Đúng — RICE (nghỉ, chườm đá, băng ép, kê cao) dùng cho chấn thương cơ-khớp.', 'Sai — hô hấp nhân tạo và ép tim dùng khi ngừng tim, không phải bong gân.']),
    Q('Fair play là?', ['Gian lận', 'Thắng bằng mọi giá', 'Chỉ tuân thủ luật khi có trọng tài', 'Trung thực, tôn trọng đối thủ và luật'], 3, 'Fair play là tinh thần thể thao.',
      [
        '<b>Ôn tập HK2 — Fair play</b>: là <code>trung thực, tôn trọng đối thủ, luật chơi và trọng tài</code> — chơi đẹp trong mọi tình huống.<ul><li>Thắng không kiêu, bại không nản.</li><li>Giữ tinh thần thể thao kể cả <b>khi không có trọng tài quan sát</b>.</li></ul>',
        '<i>Liên hệ:</i> doping, gian lận, "thắng bằng mọi giá" đều trái fair play. Thể thao rèn cả thể lực lẫn <b>nhân cách</b> — đây là giá trị xuyên suốt chương trình GDTC.',
      ],
      ['Sai — gian lận trái ngược hoàn toàn với fair play.', 'Sai — thắng bằng mọi giá không phải tinh thần chơi đẹp.', 'Sai — fair play phải giữ kể cả khi không có trọng tài.', 'Đúng — fair play là trung thực, tôn trọng đối thủ và luật.']),
    Q('Bóng chuyền — libero?', ['Chuyên phòng thủ', 'Tấn công', 'Chuyền 2 đưa bóng cho chủ công', 'Phát bóng mở đầu mỗi pha'], 0, 'Libero chuyên đỡ bóng.',
      [
        '<b>Ôn tập HK2 — Libero</b>: vị trí <code>chuyên phòng thủ</code> ở hàng sau, mặc áo khác màu, chuyên đỡ bước một rất chắc.<ul><li><b>Không được</b> phát bóng, chắn lưới hay đập bóng trên lưới.</li></ul>',
        '<i>Phân biệt vai trò:</i> đưa bóng cho chủ công là việc của <b>setter (chuyền 2)</b>; đập dứt điểm là <b>chủ công</b>. Mỗi vị trí có nhiệm vụ riêng — hiểu rõ để phối hợp đội hiệu quả.',
      ],
      ['Đúng — libero là vị trí chuyên phòng thủ và đỡ bóng.', 'Sai — libero không tấn công trên lưới.', 'Sai — đưa bóng cho chủ công là việc của setter (chuyền 2).', 'Sai — libero không được thực hiện cú phát bóng.']),
    Q('Bóng đá — đội hình phổ biến?', ['6-3-1', '4-4-2, 4-3-3', '5-4-1 phòng thủ siêu chặt', '2-2-6'], 1, 'Các đội hình hiện đại.',
      [
        '<b>Ôn tập HK2 — Đội hình bóng đá</b>: các sơ đồ phổ biến hiện đại là <code>4-4-2</code> (cân bằng) và <code>4-3-3</code> (thiên tấn công), đọc theo thứ tự hậu vệ – tiền vệ – tiền đạo.<ul><li>Tổng luôn 10 cầu thủ + 1 thủ môn = 11.</li></ul>',
        '<i>Phân biệt:</i> các sơ đồ quá lệch như 2-2-6, 6-3-1 <b>mất cân bằng</b> nên không được dùng; 5-4-1 chỉ là biến thể phòng ngự đặc biệt. Đội hình thay đổi linh hoạt theo đối thủ và tình huống.',
      ],
      ['Sai — 6-3-1 không phải đội hình bóng đá thông dụng.', 'Đúng — 4-4-2 và 4-3-3 là các đội hình phổ biến hiện đại.', 'Sai — 5-4-1 chỉ là biến thể phòng ngự, không phổ biến chung.', 'Sai — 2-2-6 quá mất cân bằng nên không được dùng.']),
  ]),

  M(34, 'Thể chất suốt đời — Kế hoạch cá nhân', [
    Q('Tập thể dục thường xuyên?', ['Tốn sức', 'Giảm bệnh tim mạch, tiểu đường, béo phì', 'Không tác dụng', 'Tăng bệnh'], 1, 'Tập thể dục có nhiều lợi ích sức khoẻ.',
      [
        '<b>Lợi ích của tập thể dục thường xuyên</b>: vận động đều đặn giúp <code>phòng ngừa nhiều bệnh mạn tính</code> — <b>bệnh tim mạch, tiểu đường type 2, béo phì</b>, cao huyết áp...<ul><li>Tăng sức khoẻ, sức đề kháng.</li><li>Cải thiện tinh thần, giảm stress, ngủ ngon.</li></ul>',
        '<i>Thông điệp "thể chất suốt đời":</i> rèn luyện không chỉ cho điểm số mà là <b>thói quen sức khoẻ cả đời</b>. Vận động đúng cách mang lại lợi ích, không phải "tốn sức" hay gây hại như quan niệm sai lầm.',
      ],
      ['Sai — tập thể dục đều mang lại sức khoẻ chứ không phí sức.', 'Đúng — tập thể dục thường xuyên giảm nguy cơ bệnh tim mạch, tiểu đường, béo phì.', 'Sai — tập thể dục có nhiều lợi ích rõ rệt.', 'Sai — tập thể dục giúp phòng bệnh, không làm tăng bệnh.']),
    Q('WHO khuyến nghị người 5–17 tuổi?', ['10 phút', '5 phút', '30 phút mỗi tuần là đủ', '≥ 60 phút hoạt động trung bình-mạnh/ngày'], 3, 'WHO: ≥ 60 phút/ngày cho trẻ em + thanh thiếu niên.',
      [
        '<b>Khuyến nghị vận động của WHO</b> cho trẻ em và thanh thiếu niên (5–17 tuổi): vận động cường độ <code>trung bình đến mạnh ít nhất 60 phút/ngày</code>.<ul><li>Trong tuần nên có hoạt động <b>rèn cơ – xương</b> ít nhất 3 buổi.</li><li>Có thể chia nhỏ 60 phút thành nhiều lần trong ngày.</li></ul>',
        '<i>Ý nghĩa với học sinh lớp 9:</i> dù bận học thi vào 10, vẫn nên duy trì vận động — vừa khoẻ người vừa <b>giúp đầu óc minh mẫn, học tốt hơn</b>. Đi bộ, đạp xe, chơi thể thao đều được tính.',
      ],
      ['Sai — 10 phút mỗi ngày quá ít so với khuyến nghị.', 'Sai — 5 phút không đủ cho lứa tuổi này.', 'Sai — 30 phút mỗi tuần thấp hơn nhiều so với mức khuyến nghị.', 'Đúng — WHO khuyến nghị trẻ 5–17 tuổi vận động trung bình-mạnh ít nhất 60 phút mỗi ngày.']),
    Q('Hoạt động nào tốt?', ['Xem video thể thao trên điện thoại', 'Ngồi nhiều', 'Đi bộ, chạy, đạp xe, bơi, các môn bóng', 'Chơi game vận động bằng tay cầm'], 2, 'Nhiều hoạt động tốt cho sức khoẻ.',
      [
        '<b>Các hoạt động thể chất tốt</b> cho sức khoẻ:<ul><li><b>Đi bộ, chạy bộ</b> — đơn giản, dễ thực hiện.</li><li><b>Đạp xe, bơi lội</b> — tốt cho tim mạch, ít chấn thương.</li><li><b>Các môn bóng</b> (đá, rổ, chuyền, cầu lông) — vui và rèn nhiều kỹ năng.</li></ul>',
        '<i>Phân biệt:</i> xem video thể thao, chơi game bằng tay cầm hay ngồi nhiều <b>không phải vận động thực sự</b>. "Lối sống ít vận động" (sedentary) có hại cho sức khoẻ — hãy chọn hoạt động làm cơ thể thật sự chuyển động.',
      ],
      ['Sai — xem video không phải vận động thể chất.', 'Sai — ngồi nhiều có hại cho sức khoẻ.', 'Đúng — đi bộ, chạy, đạp xe, bơi và các môn bóng đều tốt cho sức khoẻ.', 'Sai — chơi game bằng tay cầm vận động rất ít.']),
    Q('Kế hoạch tập cá nhân cần?', ['Bị động', 'Tập theo cảm hứng, không cần lịch trình', 'Không kế hoạch', 'Mục tiêu rõ, lịch cụ thể, đa dạng môn'], 3, 'Kế hoạch giúp duy trì thói quen.',
      [
        '<b>Lập kế hoạch tập luyện cá nhân</b> cần:<ul><li><b>Mục tiêu rõ ràng</b> (ví dụ: chạy 1500m dưới X phút, tăng số lần chống đẩy).</li><li><b>Lịch tập cụ thể</b> (ngày nào, môn gì, bao lâu).</li><li><b>Đa dạng môn</b> để phát triển toàn diện và tránh nhàm chán.</li></ul>',
        '<i>Vì sao cần kế hoạch?</i> Có mục tiêu và lịch giúp <b>duy trì thói quen đều đặn</b>, đo được tiến bộ. Tập tuỳ hứng, bị động hay không kế hoạch thì dễ bỏ dở giữa chừng.',
      ],
      ['Sai — bị động thì khó duy trì việc tập đều.', 'Sai — tập tuỳ hứng dễ bỏ dở giữa chừng.', 'Sai — không có kế hoạch thì khó theo đuổi lâu dài.', 'Đúng — mục tiêu rõ, lịch cụ thể và đa dạng môn giúp duy trì thói quen.']),
    Q('Để duy trì lâu dài?', ['Chọn môn yêu thích, có bạn cùng tập', 'Ép mình', 'Đơn độc', 'Đặt mục tiêu thành tích cao ngay từ đầu'], 0, 'Yêu thích + bạn tập tăng độ bền lâu dài.',
      [
        '<b>Bí quyết duy trì tập luyện lâu dài</b>:<ul><li><b>Chọn môn yêu thích</b> — vui thì mới gắn bó được.</li><li><b>Có bạn cùng tập</b> — tạo động lực, trách nhiệm và niềm vui.</li><li>Đặt mục tiêu vừa sức, tăng dần.</li></ul>',
        '<i>Tránh:</i> ép mình quá mức, tập đơn độc thiếu động lực, hay đặt mục tiêu quá cao ngay từ đầu — đều dễ <b>chán nản và bỏ cuộc</b>. "Thể chất suốt đời" là hành trình bền bỉ, vui vẻ chứ không phải gắng sức ngắn hạn.',
      ],
      ['Đúng — chọn môn yêu thích và có bạn cùng tập giúp duy trì lâu dài.', 'Sai — ép mình quá mức dễ chán và bỏ cuộc.', 'Sai — tập một mình dễ thiếu động lực.', 'Sai — đặt mục tiêu quá cao ngay từ đầu dễ nản.']),
  ]),

  M(35, 'Tổng kết — Kiểm tra cuối kì', [
    Q('Khởi động trước tập?', ['Bắt buộc, tránh chấn thương', 'Không cần', 'Chỉ cần thiết khi tập sức mạnh', 'Có thể bỏ qua nếu đã quen tập'], 0, 'Khởi động là quy tắc an toàn.',
      [
        '<b>Tổng kết — Khởi động</b>: là phần <code>bắt buộc</code> mở đầu mọi buổi tập, mục đích chính là <b>tránh chấn thương</b> và làm cơ thể sẵn sàng vận động.<ul><li>Áp dụng cho mọi loại tập, không riêng tập sức mạnh.</li><li>Trình tự: Khởi động → Tập chính → Thả lỏng.</li></ul>',
        '<i>Nhớ:</i> dù đã quen tập đến đâu vẫn <b>không được bỏ khởi động</b>. Đây là nguyên tắc an toàn nền tảng nhất của giáo dục thể chất.',
      ],
      ['Đúng — khởi động là bắt buộc để tránh chấn thương.', 'Sai — luôn cần khởi động trước khi vận động.', 'Sai — khởi động cần cho mọi loại tập, không riêng tập sức mạnh.', 'Sai — dù quen tập vẫn phải khởi động.']),
    Q('Chạy 1500m chiến thuật?', ['Sprint giữa quãng để vượt đối thủ', 'Sprint từ đầu', 'Pacing đều + sprint cuối', 'Chạy chậm cả'], 2, 'Pacing là then chốt.',
      [
        '<b>Tổng kết — Chạy 1500m</b>: chiến thuật then chốt là <code>pacing</code> — phân phối sức hợp lý: bắt đầu vừa phải, <b>giữ nhịp đều</b> ở giữa, dồn sức <b>tăng tốc (nước rút) ở cuối</b>.<ul><li>Biết "đọc sức" bản thân là quan trọng nhất.</li></ul>',
        '<i>Nhớ:</i> sprint từ đầu hay sprint giữa quãng đều dễ <b>cạn sức trước khi về đích</b>; chạy chậm cả thì không có thành tích. Kết hợp interval và rèn sức mạnh chân để chạy nhanh hơn.',
      ],
      ['Sai — sprint giữa quãng dễ kiệt sức trước khi về đích.', 'Sai — sprint từ đầu làm cạn sức sớm.', 'Đúng — giữ nhịp đều rồi tăng tốc cuối (pacing) là chiến thuật then chốt.', 'Sai — chạy chậm cả quãng thì khó đạt thành tích tốt.']),
    Q('Bóng chuyền số người/sân?', ['6', '5', '7', '11'], 0, 'Bóng chuyền 6/sân.',
      [
        '<b>Tổng kết — Số người trên sân</b>: bóng chuyền có <code>6 người</code> mỗi đội, bố trí 3 hàng trước và 3 hàng sau, xoay vòng (rotation) khi giành quyền phát.<ul><li>Có thêm libero và dự bị ngoài sân.</li></ul>',
        '<i>Bảng nhớ nhanh:</i> Bóng chuyền <b>6</b> — Bóng rổ <b>5</b> — Bóng đá <b>11</b>. Ba con số này thường xuất hiện trong đề kiểm tra, cần nhớ thật chắc để không nhầm lẫn.',
      ],
      ['Đúng — bóng chuyền có 6 người mỗi đội trên sân.', 'Sai — 5 người/sân là bóng rổ.', 'Sai — 7 người không đúng với bóng chuyền.', 'Sai — 11 người/sân là bóng đá.']),
    Q('Bóng rổ số người/sân?', ['4', '5', '6', '7'], 1, 'Bóng rổ 5/sân.',
      [
        '<b>Tổng kết — Số người trên sân</b>: bóng rổ có <code>5 người</code> mỗi đội, gồm các vị trí hậu vệ, tiền phong và trung phong, thay người tự do.<ul><li>Đủ 5 lỗi cá nhân (FIBA) thì bị truất quyền thi đấu.</li></ul>',
        '<i>Bảng nhớ nhanh:</i> Bóng rổ <b>5</b> — Bóng chuyền <b>6</b> — Bóng đá <b>11</b>. Trận chia 4 hiệp × 10 phút (FIBA); tính điểm 1 (ném phạt) – 2 (trong vạch 3) – 3 (ngoài vạch 3).',
      ],
      ['Sai — 4 người ít hơn quy định của bóng rổ.', 'Đúng — bóng rổ có 5 người mỗi đội trên sân.', 'Sai — 6 người/sân là bóng chuyền.', 'Sai — 7 người không đúng với bóng rổ.']),
    Q('Fair play là?', ['Chỉ áp dụng khi có trọng tài quan sát', 'Hung hăng', 'Gian lận', 'Trung thực + tôn trọng'], 3, 'Fair play là tinh thần thể thao cao đẹp.',
      [
        '<b>Tổng kết — Fair play</b>: tinh thần thể thao cao đẹp = <code>trung thực + tôn trọng</code> đối thủ, luật chơi và trọng tài; chơi đẹp cả <b>khi không có ai giám sát</b>.<ul><li>Thắng không kiêu, bại không nản.</li><li>Doping, gian lận, hung hăng đều trái fair play.</li></ul>',
        '<i>Thông điệp khép lại chương trình GDTC lớp 9:</i> thể thao rèn <b>cả thân lẫn tâm</b> — sức khoẻ, kỹ năng và nhân cách. Hãy mang tinh thần fair play và thói quen vận động theo suốt cuộc đời.',
      ],
      ['Sai — fair play phải giữ kể cả khi không có trọng tài.', 'Sai — hung hăng trái với tinh thần fair play.', 'Sai — gian lận đi ngược lại fair play.', 'Đúng — fair play là trung thực và tôn trọng đối thủ, luật, trọng tài.']),
  ]),

  M(36, 'Kết thúc GDTC THCS — Sức khoẻ là nền tảng của mọi thành công', [
    Q('Vì sao nói "vận động thể chất là thuốc bổ cho não bộ"?',
      ['Vì vận động làm giảm thời gian học nên đỡ căng thẳng', 'Vì vận động tăng lưu lượng máu não, giải phóng BDNF và endorphin — cải thiện tập trung, ghi nhớ và tâm trạng', 'Vì vận động giúp ngủ nhiều hơn nên không cần học', 'Vì đó chỉ là cách nói cho vui, không có cơ sở'],
      1,
      'Vận động tăng máu lên não, giải phóng BDNF (yếu tố tăng trưởng thần kinh) và endorphin.',
      ['Câu nói này có <b>cơ sở sinh học</b> rõ ràng, không phải khẩu hiệu.',
       'Khi vận động, cơ thể:<ul><li><b>tăng lưu lượng máu não</b> — nhiều O₂ và dưỡng chất hơn cho tế bào thần kinh</li><li>giải phóng <b>BDNF</b> — yếu tố tăng trưởng thần kinh, giúp các tế bào não kết nối mạnh hơn</li><li>giải phóng <b>endorphin</b> — cải thiện tâm trạng, giảm stress</li></ul>',
       'Kết quả đo được: học sinh vận động đều đặn có khả năng <b>tập trung, ghi nhớ và giải quyết vấn đề</b> tốt hơn đáng kể. Trong mùa thi, một buổi <b>đi bộ 20–30 phút</b> có thể hiệu quả hơn thêm một tiếng ngồi im.'],
      ['Sai — lợi ích đến từ cơ chế sinh học, không phải từ việc học ít đi.',
       'Đúng — tăng máu não, BDNF và endorphin.',
       'Sai — vận động hỗ trợ việc học, không thay thế việc học.',
       'Sai — đã có nhiều nghiên cứu xác nhận.']),
    Q('Nguyên tắc nào giúp duy trì thói quen vận động LÂU DÀI?',
      ['Tập càng nhiều càng tốt trong một buổi', 'Chỉ tập khi có thời gian rảnh nhiều', 'Tập đều hơn tập nhiều — 30 phút mỗi ngày tốt hơn 3 tiếng cuối tuần', 'Chọn môn khó nhất để nhanh tiến bộ'],
      2,
      'Tập đều đặn quan trọng hơn tập nhiều: 30 phút mỗi ngày hơn 3 tiếng dồn vào cuối tuần.',
      ['GDTC THCS kết lại bằng <b>năm nguyên tắc</b> để vận động trở thành thói quen cả đời.',
       '<ul><li><b>chọn môn mình yêu thích</b> — sự thú vị quan trọng hơn hiệu quả ngắn hạn</li><li><b>tập đều hơn tập nhiều</b> — 30 phút/ngày đều đặn tốt hơn 3 tiếng dồn cuối tuần</li><li><b>rủ bạn tập cùng</b> — người đồng hành giúp duy trì kỉ luật</li><li><b>ghi nhật kí vận động</b> ngắn gọn — theo dõi tiến bộ tạo động lực</li><li><b>không hoàn hảo nhưng đừng bỏ cuộc</b> — một buổi tập nhẹ vẫn tốt hơn không tập</li></ul>',
       'Dồn hết vào một buổi cuối tuần vừa dễ gây <i>chấn thương</i>, vừa không tạo được thói quen.'],
      ['Sai — dồn vào một buổi dễ gây chấn thương.',
       'Sai — chờ rảnh nhiều thì thường không bao giờ tập.',
       'Đúng — tập đều đặn quan trọng hơn tập nhiều.',
       'Sai — chọn môn mình yêu thích mới duy trì được lâu dài.']),
    Q('Học sinh nên vận động ít nhất bao nhiêu phút mỗi ngày để có kết quả học tập và tinh thần tốt hơn?',
      ['60 phút', '10 phút', '20 phút', '180 phút'],
      0,
      'Các nghiên cứu cho thấy học sinh vận động ít nhất 60 phút mỗi ngày học tốt hơn và ít lo âu hơn.',
      ['Bài học dẫn kết quả nghiên cứu rất cụ thể: học sinh vận động <b>ít nhất 60 phút/ngày</b> thì:',
       '<ul><li><b>kết quả học tập tốt hơn</b></li><li><b>tinh thần ổn định hơn</b></li><li><b>ít lo âu hơn</b> so với bạn ít vận động</li></ul>',
       'Lô-gic đằng sau: <i>học tốt cần não bộ khoẻ mạnh — não bộ khoẻ cần cơ thể khoẻ</i>. Nếu quá bận, bài học khuyên khi lên THPT vẫn nên giữ <b>ít nhất 3 buổi/tuần</b> vận động nhẹ, chứ đừng bỏ hẳn.'],
      ['Đúng — ít nhất 60 phút mỗi ngày.',
       'Sai — 10 phút chưa đủ tạo hiệu quả rõ rệt.',
       'Sai — 20 phút tốt hơn không tập, nhưng chưa đạt mức khuyến nghị.',
       'Sai — 180 phút vượt xa mức cần thiết cho học sinh phổ thông.']),
    Q('Bản đồ GDTC THCS: giai đoạn lớp 6–7 tập trung vào nhóm nội dung nào?',
      ['Bóng rổ, bóng đá, cầu lông, võ thuật', 'Thể dục nhịp điệu, điền kinh, bơi lội', 'Chỉ học lí thuyết dinh dưỡng', 'Chuyên sâu một môn tự chọn'],
      1,
      'Lớp 6–7 xây nền thể lực toàn diện qua thể dục nhịp điệu, điền kinh và bơi lội.',
      ['Bốn năm GDTC THCS chia thành hai giai đoạn rõ rệt.',
       '<ul><li><b>Lớp 6–7</b> — <b>thể dục nhịp điệu, điền kinh, bơi lội</b>: xây <i>nền tảng thể lực toàn diện</i></li><li><b>Lớp 8–9</b> — <b>bóng rổ, bóng đá, cầu lông, võ thuật</b>: kĩ năng thể thao <i>đội nhóm và cá nhân</i></li></ul>',
       'Xuyên suốt cả bốn năm là nhóm kiến thức <b>cho cả đời</b>: khởi động, hồi tĩnh, an toàn, dinh dưỡng và sơ cứu.'],
      ['Sai — đó là nội dung giai đoạn lớp 8–9.',
       'Đúng — lớp 6–7 xây nền thể lực toàn diện.',
       'Sai — GDTC luôn gắn với thực hành vận động.',
       'Sai — học chuyên sâu một môn là định hướng ở lớp 9 và THPT.']),
    Q('Chiến lược nào giúp giữ thói quen tập thể dục khi lên THPT với lịch học dày hơn?',
      ['Bỏ tập trong năm học, để dành tới hè', 'Chỉ tập khi thấy cơ thể có vấn đề', 'Chờ có phòng gym mới bắt đầu tập', 'Gắn vận động vào hoạt động khác, chọn giờ tập nhất quán, tập ngắn nhưng đều và rủ bạn cùng tập'],
      3,
      'Gắn vận động vào việc hằng ngày, chọn giờ cố định, tập 20–30 phút đều đặn và có bạn đồng hành.',
      ['Lịch học THPT dày hơn, nên vận động phải được <b>thiết kế</b> chứ không thể trông vào "khi nào rảnh".',
       'Năm chiến lược thực tế:<ul><li><b>gắn kèm hoạt động khác</b> — đi bộ thay xe buýt một đoạn, leo cầu thang thay thang máy</li><li><b>chọn giờ tập nhất quán</b> — sáng sớm, trước khi mọi việc khác chiếm mất</li><li><b>tập ngắn nhưng đều</b> — 20–30 phút là đủ, không cần 2 tiếng</li><li><b>rủ bạn thân tập cùng</b> — hai người khó bỏ cuộc hơn một</li><li>xem giờ tập là <b>"sạc pin" cho việc học</b>, không phải "lấy mất giờ học"</li></ul>',
       'Gợi ý thêm: tham gia <b>CLB thể thao</b> của trường ngay từ tuần đầu tiên, và chia sẻ kiến thức GDTC cho bạn bè — <i>dạy lại là cách học tốt nhất</i>.'],
      ['Sai — bỏ cả năm rồi dồn vào hè là mất hẳn thói quen.',
       'Sai — vận động là để phòng ngừa, không phải chỉ để chữa.',
       'Sai — không cần phòng gym mới tập được.',
       'Đúng — gắn kèm, giờ cố định, tập ngắn đều đặn và có bạn đồng hành.']),
    Q('Theo bài học, "tài sản" nào của GDTC giữ giá trị suốt cả cuộc đời?',
      ['Huy chương và thành tích thi đấu', 'Điểm số môn GDTC trong học bạ', 'Một cơ thể khoẻ mạnh và thói quen vận động tốt', 'Số buổi tập đã ghi trong nhật kí'],
      2,
      'Huy chương và thành tích có thể phai theo thời gian; cơ thể khoẻ và thói quen vận động thì không.',
      ['Bài học phân biệt rõ hai thứ rất dễ bị nhầm là mục tiêu của GDTC.',
       '<ul><li><b>huy chương, thành tích thi đấu</b> — đáng trân trọng nhưng <i>có thể phai theo thời gian</i></li><li><b>một cơ thể khoẻ mạnh và thói quen vận động tốt</b> — là <b>"tài sản" giữ giá trị cả cuộc đời</b></li></ul>',
       'Đó là lí do năm nguyên tắc duy trì thói quen (chọn môn yêu thích, tập đều, có bạn đồng hành, ghi nhật kí, không bỏ cuộc) quan trọng hơn bất kì kỉ lục cá nhân nào em từng đạt trong bốn năm THCS.'],
      ['Sai — thành tích có thể phai theo thời gian.',
       'Sai — điểm số không phải mục tiêu cuối của GDTC.',
       'Đúng — cơ thể khoẻ mạnh và thói quen vận động tốt.',
       'Sai — nhật kí là công cụ theo dõi, không phải tài sản đích.']),
  ]),
];

export const S9GDTC_SCENARIOS = indexBy(S9GDTC_WEEKS);
