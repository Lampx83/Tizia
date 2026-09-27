// ============================================================
// Lớp 7 — Giáo dục thể chất (GDTC) · 35 tuần
// Bám sát Chương trình GDPT 2018 môn GDTC cấp THCS.
// Trọng tâm: chạy ngắn, chạy bền, nhảy xa, nhảy cao, bóng,
// cầu lông, đá cầu, thể dục liên hoàn, an toàn tập luyện.
// ============================================================

import { Q, W, indexBy } from './_helper.js';

const M = (n, title, qs, opts) => W('S7GDTC', 'gdtc', n, title, qs, opts);

export const S7GDTC_WEEKS = [
  // ───────────── HK1 ─────────────

  M(1, 'Khởi động và an toàn tập luyện', [
    Q('Tại sao phải khởi động trước khi tập thể dục?', ['Làm nóng cơ, giảm nguy cơ chấn thương', 'Cho vui', 'Không cần thiết', 'Để mất sức'], 0, 'Khởi động làm tăng nhiệt cơ, lưu thông máu, làm dẻo khớp → giảm chấn thương.',
      [
        '<b>Khởi động</b> là bước bắt buộc mở đầu mọi buổi học GDTC. Mục đích là <code>làm nóng cơ thể</code>: tăng nhiệt độ cơ bắp, đẩy nhanh tuần hoàn máu và làm các khớp linh hoạt hơn trước khi vận động mạnh.<ul><li>Cơ ấm thì <b>đàn hồi tốt</b>, khó rách.</li><li>Khớp được "bôi trơn" (tăng dịch khớp) → cử động trơn tru.</li></ul>',
        'Nếu bỏ khởi động mà tập ngay, cơ và dây chằng còn "lạnh" và cứng rất dễ bị <i>căng cơ, bong gân, chuột rút</i>. Đây là nguyên nhân chấn thương phổ biến nhất ở học sinh.',
        '<em>Ghi nhớ:</em> khởi động không phải để "cho vui" hay "để mất sức" mà là một phần kỹ thuật giúp buổi tập <b>an toàn và hiệu quả</b> hơn.',
      ],
      [
        'Đúng — vì khởi động làm tăng nhiệt cơ, lưu thông máu, làm dẻo khớp nên giảm nguy cơ chấn thương. Lựa chọn <b>Làm nóng cơ, giảm nguy cơ chấn thương</b> là phương án chuẩn.',
        'Sai — vì đáp án đúng là <b>Làm nóng cơ, giảm nguy cơ chấn thương</b>. Khởi động có mục đích kỹ thuật rõ ràng, không phải "cho vui".',
        'Sai — vì đáp án đúng là <b>Làm nóng cơ, giảm nguy cơ chấn thương</b>. Khởi động là bước bắt buộc, rất cần thiết để phòng chấn thương.',
        'Sai — vì đáp án đúng là <b>Làm nóng cơ, giảm nguy cơ chấn thương</b>. Khởi động giúp cơ sẵn sàng vận động, không hề làm "mất sức".',
      ]),
    Q('Thứ tự khởi động đúng là?', ['Không cần thứ tự', 'Khởi động chung → khởi động chuyên môn', 'Khởi động chuyên môn trước', 'Bỏ qua khởi động chung'], 1, 'Khởi động chung (toàn thân) trước, rồi đến chuyên môn (phù hợp bài tập sắp tới).',
      [
        'Khởi động chia làm hai phần theo đúng thứ tự: <b>khởi động chung</b> rồi mới đến <b>khởi động chuyên môn</b>.<ul><li><i>Khởi động chung:</i> chạy nhẹ, xoay các khớp (cổ, vai, hông, gối, cổ tay – cổ chân) làm nóng <code>toàn thân</code>.</li><li><i>Khởi động chuyên môn:</i> các động tác mô phỏng bài sắp tập (vd chạy nâng cao đùi, đạp sau trước khi chạy ngắn).</li></ul>',
        'Trật tự này đi từ <b>tổng thể → cụ thể</b>: làm nóng cả người trước, sau đó tập trung vào nhóm cơ sẽ hoạt động chính. Đảo ngược trật tự hoặc bỏ phần chung đều làm khởi động kém hiệu quả và dễ chấn thương.',
      ],
      [
        'Sai — vì đáp án đúng là <b>Khởi động chung → khởi động chuyên môn</b>. Khởi động luôn có trật tự từ toàn thân đến chuyên biệt.',
        'Đúng — vì khởi động chung (toàn thân) phải đi trước, rồi mới đến chuyên môn phù hợp bài tập sắp tới. Lựa chọn <b>Khởi động chung → khởi động chuyên môn</b> là phương án chuẩn.',
        'Sai — vì đáp án đúng là <b>Khởi động chung → khởi động chuyên môn</b>. Không thể làm chuyên môn khi cơ thể chưa được làm nóng tổng thể.',
        'Sai — vì đáp án đúng là <b>Khởi động chung → khởi động chuyên môn</b>. Bỏ phần chung khiến nhiều nhóm cơ chưa sẵn sàng.',
      ]),
    Q('Thời gian khởi động hợp lý cho một buổi tập là?', ['Không khởi động', '30 giây', '30 phút', '5-10 phút'], 3, 'Khởi động khoảng 5-10 phút là phù hợp cho học sinh.',
      [
        'Thời lượng khởi động hợp lý cho học sinh THCS là khoảng <code>5–10 phút</code>. Đủ để cơ thể nóng lên và nhịp tim tăng nhẹ nhưng <b>chưa gây mệt</b> trước phần nội dung chính.<ul><li>Buổi tập càng nặng, khởi động càng cần kỹ.</li><li>Trời lạnh nên khởi động lâu hơn một chút.</li></ul>',
        '<i>Quá ngắn</i> (vài chục giây) thì cơ chưa kịp nóng; <i>quá dài</i> (30 phút) lại gây mệt, phí năng lượng cho phần tập chính. Cân bằng 5–10 phút là chuẩn.',
      ],
      [
        'Sai — vì đáp án đúng là <b>5-10 phút</b>. Buổi tập nào cũng cần khởi động, không thể bỏ.',
        'Sai — vì đáp án đúng là <b>5-10 phút</b>. 30 giây quá ngắn, cơ chưa kịp làm nóng.',
        'Sai — vì đáp án đúng là <b>5-10 phút</b>. 30 phút quá dài, gây mệt trước khi vào phần chính.',
        'Đúng — vì khởi động khoảng 5-10 phút là phù hợp cho học sinh. Lựa chọn <b>5-10 phút</b> là phương án chuẩn.',
      ]),
    Q('Khi tập luyện thấy chóng mặt, đau ngực thì nên?', ['Im lặng', 'Dừng tập, báo giáo viên', 'Chạy nhanh hơn', 'Cố tập tiếp'], 1, 'Có dấu hiệu bất thường → dừng ngay và báo giáo viên/người lớn.',
      [
        '<b>Chóng mặt, đau ngực, khó thở, hoa mắt</b> là những dấu hiệu cảnh báo cơ thể đang gặp vấn đề. Quy tắc an toàn: <code>dừng ngay – báo giáo viên/người lớn</code>.<ul><li>Ngồi/nằm nghỉ ở chỗ thoáng mát.</li><li>Uống chút nước, hít thở chậm.</li></ul>',
        '<i>Tuyệt đối không</i> giấu giếm ("im lặng"), cố tập tiếp hay tăng cường độ — vì có thể dẫn đến ngất, chấn thương hoặc nguy hiểm cho tim mạch. Báo người lớn để được xử lý kịp thời mới là đúng.',
      ],
      [
        'Sai — vì đáp án đúng là <b>Dừng tập, báo giáo viên</b>. Im lặng giấu triệu chứng rất nguy hiểm.',
        'Đúng — vì khi có dấu hiệu bất thường phải dừng ngay và báo giáo viên/người lớn. Lựa chọn <b>Dừng tập, báo giáo viên</b> là phương án chuẩn.',
        'Sai — vì đáp án đúng là <b>Dừng tập, báo giáo viên</b>. Chạy nhanh hơn càng làm tình trạng nặng thêm.',
        'Sai — vì đáp án đúng là <b>Dừng tập, báo giáo viên</b>. Cố tập tiếp có thể dẫn đến ngất hoặc nguy hiểm tim mạch.',
      ]),
    Q('Sau buổi tập nên làm gì?', ['Uống nước đá lạnh ngay', 'Dừng đột ngột', 'Ngồi bệt xuống', 'Thả lỏng (cool-down) và uống nước từ từ'], 3, 'Thả lỏng giúp cơ phục hồi, uống nước từ từ tránh sốc.',
      [
        'Kết thúc buổi tập cần có giai đoạn <b>thả lỏng (cool-down)</b>: đi bộ chậm, hít thở sâu, kéo giãn nhẹ nhàng. Việc này giúp nhịp tim hạ <code>từ từ</code>, cơ bắp giãn ra và phục hồi nhanh hơn.<ul><li>Giảm đau mỏi cơ sau tập.</li><li>Đưa máu về tim đều, tránh choáng.</li></ul>',
        '<i>Không nên:</i> dừng đột ngột hay ngồi bệt ngay (máu dồn xuống chân dễ gây choáng), cũng không uống nước đá lạnh ngay (dễ sốc, đau bụng). Hãy <b>uống nước từng ngụm nhỏ</b>, nhiệt độ thường.',
      ],
      [
        'Sai — vì đáp án đúng là <b>Thả lỏng (cool-down) và uống nước từ từ</b>. Nước đá lạnh ngay dễ gây sốc, đau bụng.',
        'Sai — vì đáp án đúng là <b>Thả lỏng (cool-down) và uống nước từ từ</b>. Dừng đột ngột dễ gây choáng do nhịp tim chưa kịp hạ.',
        'Sai — vì đáp án đúng là <b>Thả lỏng (cool-down) và uống nước từ từ</b>. Ngồi bệt ngay khiến máu dồn xuống chân, dễ choáng.',
        'Đúng — vì thả lỏng giúp cơ phục hồi và uống nước từ từ tránh sốc. Lựa chọn <b>Thả lỏng (cool-down) và uống nước từ từ</b> là phương án chuẩn.',
      ]),
  ]),

  M(2, 'Chạy ngắn — kỹ thuật xuất phát thấp', [
    Q('Chạy 100m thuộc loại chạy nào?', ['Chạy đường dài', 'Chạy bền', 'Chạy trung bình', 'Chạy ngắn (cự ly ngắn)'], 3, '100m thuộc cự ly ngắn (60m, 100m, 200m, 400m).',
      [
        'Trong điền kinh, các cự ly được phân nhóm: <b>chạy cự ly ngắn</b> gồm <code>60m, 100m, 200m, 400m</code> — đòi hỏi sức mạnh tốc độ và xuất phát nhanh.<ul><li>Cự ly trung bình: 800m, 1500m.</li><li>Cự ly dài: 5000m, 10000m, marathon.</li></ul>',
        'Vì vậy <b>100m</b> là môn chạy ngắn tiêu biểu — chạy hết tốc lực trong thời gian rất ngắn (chỉ hơn 10 giây với VĐV đỉnh cao), khác hẳn chạy bền là chạy chậm và lâu.',
      ],
      [
        'Sai — vì đáp án đúng là <b>Chạy ngắn (cự ly ngắn)</b>. Chạy đường dài là cự ly từ 5000m trở lên.',
        'Sai — vì đáp án đúng là <b>Chạy ngắn (cự ly ngắn)</b>. Chạy bền là chạy chậm và lâu, trái với 100m chạy hết tốc lực.',
        'Sai — vì đáp án đúng là <b>Chạy ngắn (cự ly ngắn)</b>. Cự ly trung bình là 800m–1500m.',
        'Đúng — vì 100m thuộc cự ly ngắn (cùng nhóm 60m, 100m, 200m, 400m). Lựa chọn <b>Chạy ngắn (cự ly ngắn)</b> là phương án chuẩn.',
      ]),
    Q('Tư thế xuất phát thấp trong chạy ngắn dùng để?', ['Giữ tốc độ ổn định suốt cự ly', 'Tăng tốc nhanh trong vài bước đầu', 'Đứng nghỉ', 'Chạy chậm'], 1, 'Xuất phát thấp giúp đẩy người về phía trước, tăng tốc nhanh.',
      [
        '<b>Xuất phát thấp</b> (dùng bàn đạp) là kỹ thuật đặc trưng của chạy ngắn. Người chạy cúi thấp, dồn trọng tâm về trước để khi xuất phát có thể <code>đạp mạnh – bật nhanh</code> ra phía trước.<ul><li>Tạo lực đẩy lớn ngay từ vài bước đầu.</li><li>Giúp đạt tốc độ tối đa sớm hơn.</li></ul>',
        'Trong cự ly ngắn, ai <i>tăng tốc nhanh hơn ở giai đoạn đầu</i> thường giành lợi thế lớn. Vì thế xuất phát thấp được dùng thay cho xuất phát cao (đứng) như ở chạy bền.',
      ],
      [
        'Sai — vì đáp án đúng là <b>Tăng tốc nhanh trong vài bước đầu</b>. Giữ tốc độ ổn định là đặc điểm của chạy bền.',
        'Đúng — vì xuất phát thấp giúp đẩy người về phía trước, tăng tốc nhanh. Lựa chọn <b>Tăng tốc nhanh trong vài bước đầu</b> là phương án chuẩn.',
        'Sai — vì đáp án đúng là <b>Tăng tốc nhanh trong vài bước đầu</b>. Xuất phát thấp là tư thế sẵn sàng bật đi, không phải để nghỉ.',
        'Sai — vì đáp án đúng là <b>Tăng tốc nhanh trong vài bước đầu</b>. Chạy ngắn cần tốc độ cao chứ không phải chạy chậm.',
      ]),
    Q('Ba khẩu lệnh chuẩn trong chạy ngắn là?', ['"Bắt đầu - giữa - kết thúc"', '"Vào chỗ" - "Sẵn sàng" - "Chạy"', '"Đứng - ngồi - chạy"', '"Một - hai - ba"'], 1, 'Ba khẩu lệnh chính thức: Vào chỗ → Sẵn sàng → Chạy (tiếng súng/còi).',
      [
        'Xuất phát thấp được điều khiển bằng <b>ba khẩu lệnh</b> theo thứ tự cố định:<ul><li><code>"Vào chỗ"</code> — bước vào bàn đạp, đặt tay sau vạch.</li><li><code>"Sẵn sàng"</code> — nâng hông, dồn trọng tâm về trước, tập trung cao độ.</li><li><code>"Chạy"</code> (tiếng súng/còi) — bật mạnh khỏi bàn đạp.</li></ul>',
        'Đây là quy chuẩn quốc tế trong điền kinh. Nắm đúng ba khẩu lệnh giúp em <i>phản xạ xuất phát</i> đúng thời điểm, không bị phạm quy (xuất phát sớm).',
      ],
      [
        'Sai — vì đáp án đúng là <b>"Vào chỗ" - "Sẵn sàng" - "Chạy"</b>. Đây mới là ba khẩu lệnh chuẩn trong điền kinh.',
        'Đúng — vì ba khẩu lệnh chính thức là Vào chỗ → Sẵn sàng → Chạy (tiếng súng/còi). Lựa chọn <b>"Vào chỗ" - "Sẵn sàng" - "Chạy"</b> là phương án chuẩn.',
        'Sai — vì đáp án đúng là <b>"Vào chỗ" - "Sẵn sàng" - "Chạy"</b>. Không có khẩu lệnh "đứng - ngồi" trong xuất phát chạy.',
        'Sai — vì đáp án đúng là <b>"Vào chỗ" - "Sẵn sàng" - "Chạy"</b>. "Một - hai - ba" không phải khẩu lệnh chuẩn.',
      ]),
    Q('Trong khi chạy nước rút (100m), hơi thở nên?', ['Ngắn, gấp, phối hợp với bước chân', 'Không cần quan tâm', 'Nín hoàn toàn', 'Thở rất sâu chậm'], 0, 'Chạy nước rút: hơi thở nhanh, nông, phối hợp với bước.',
      [
        'Khi <b>chạy nước rút</b>, cơ thể cần oxy gấp nên nhịp thở phải <code>nhanh và nông</code>, phối hợp nhịp nhàng với bước chân. Điều này giúp duy trì tốc độ cao trong thời gian ngắn.<ul><li>Không gồng cứng cơ mặt, cổ.</li><li>Thở ra mạnh để đẩy khí ra, hít vào tự nhiên.</li></ul>',
        '<i>Thở sâu – chậm</i> phù hợp với chạy bền chứ không phải nước rút. Và <i>nín thở</i> thì rất sai — làm thiếu oxy, nhanh đuối sức và dễ choáng.',
      ],
      [
        'Đúng — vì chạy nước rút cần hơi thở nhanh, nông, phối hợp với bước. Lựa chọn <b>Ngắn, gấp, phối hợp với bước chân</b> là phương án chuẩn.',
        'Sai — vì đáp án đúng là <b>Ngắn, gấp, phối hợp với bước chân</b>. Hơi thở rất quan trọng để cung cấp oxy khi chạy.',
        'Sai — vì đáp án đúng là <b>Ngắn, gấp, phối hợp với bước chân</b>. Nín thở gây thiếu oxy, nhanh đuối và dễ choáng.',
        'Sai — vì đáp án đúng là <b>Ngắn, gấp, phối hợp với bước chân</b>. Thở sâu chậm là kiểu thở của chạy bền, không hợp nước rút.',
      ]),
    Q('Đích đến trong chạy 100m: vận động viên nên?', ['Chạy hết tốc lực qua vạch đích (đâm đích)', 'Đi bộ qua đích', 'Dừng lại trước đích', 'Giảm tốc trước đích'], 0, 'Phải chạy hết tốc lực, có thể nghiêng người (đâm đích) để qua vạch.',
      [
        'Trong chạy ngắn, kết quả tính khi <b>thân trên (ngực)</b> chạm mặt phẳng vạch đích. Vì vậy phải <code>chạy hết tốc lực qua vạch</code>, không được giảm tốc hay dừng trước đích.<ul><li>Có thể chủ động <b>nghiêng/đẩy ngực</b> ra trước (đâm đích) để cắt vạch sớm vài phần trăm giây.</li></ul>',
        'Nhiều cuộc đua thắng – thua chỉ <i>vài phần trăm giây</i>, nên giai đoạn về đích quyết định thành tích. Giảm tốc sớm hay đi bộ qua đích là lỗi làm mất thành tích.',
      ],
      [
        'Đúng — vì phải chạy hết tốc lực, có thể nghiêng người (đâm đích) để qua vạch. Lựa chọn <b>Chạy hết tốc lực qua vạch đích (đâm đích)</b> là phương án chuẩn.',
        'Sai — vì đáp án đúng là <b>Chạy hết tốc lực qua vạch đích (đâm đích)</b>. Đi bộ qua đích làm mất hết thành tích.',
        'Sai — vì đáp án đúng là <b>Chạy hết tốc lực qua vạch đích (đâm đích)</b>. Dừng trước đích là chưa hoàn thành cự ly.',
        'Sai — vì đáp án đúng là <b>Chạy hết tốc lực qua vạch đích (đâm đích)</b>. Giảm tốc trước đích làm chậm thành tích đáng kể.',
      ]),
  ]),

  M(3, 'Chạy ngắn — kỹ thuật về đích', [
    Q('Kỹ thuật "đánh ngực" về đích trong chạy ngắn là?', ['Nhảy lên', 'Đẩy ngực ra trước khi đến vạch để cắt đích sớm', 'Đập tay vào ngực', 'Quay người'], 1, 'Kỹ thuật cắt đích bằng ngực giúp giành lợi thế thời gian.',
      [
        'Kỹ thuật <b>"đánh ngực" (đâm đích)</b> là động tác chủ động <code>đẩy ngực/thân trên ra trước</code> ở bước cuối khi sắp chạm vạch đích.<ul><li>Vì thành tích tính theo thời điểm ngực cắt vạch.</li><li>Đẩy ngực sớm giúp "ăn" vài phần trăm giây quý giá.</li></ul>',
        'Đây không phải nhảy lên hay quay người (sẽ làm chậm và mất thăng bằng), cũng không phải đập tay vào ngực. <i>Chỉ là gập thân, đưa ngực về trước</i> đúng khoảnh khắc cắt đích.',
      ],
      [
        'Sai — vì đáp án đúng là <b>Đẩy ngực ra trước khi đến vạch để cắt đích sớm</b>. Nhảy lên làm chậm và mất thăng bằng.',
        'Đúng — vì kỹ thuật cắt đích bằng ngực giúp giành lợi thế thời gian. Lựa chọn <b>Đẩy ngực ra trước khi đến vạch để cắt đích sớm</b> là phương án chuẩn.',
        'Sai — vì đáp án đúng là <b>Đẩy ngực ra trước khi đến vạch để cắt đích sớm</b>. "Đánh ngực" ở đây là đưa ngực ra trước, không phải đập tay.',
        'Sai — vì đáp án đúng là <b>Đẩy ngực ra trước khi đến vạch để cắt đích sớm</b>. Quay người làm lệch hướng và chậm lại.',
      ]),
    Q('Sau khi qua đích, vận động viên nên?', ['Giảm tốc dần, đi bộ vài bước', 'Dừng đột ngột', 'Chạy ngược lại', 'Ngồi bệt xuống'], 0, 'Giảm tốc dần để cơ thể thích nghi, tránh chấn thương.',
      [
        'Sau khi cắt đích, cơ thể vẫn còn quán tính tốc độ cao. Cần <b>giảm tốc dần</b> rồi đi bộ vài bước để nhịp tim và cơ bắp <code>thích nghi từ từ</code>.<ul><li>Tránh chấn thương khớp gối, cổ chân.</li><li>Đưa máu lưu thông đều, tránh choáng.</li></ul>',
        '<i>Dừng đột ngột</i> hay <i>ngồi bệt ngay</i> dễ gây căng cơ, choáng do máu dồn xuống chân. <i>Chạy ngược lại</i> thì vô lý và nguy hiểm vì có thể va chạm với người chạy sau.',
      ],
      [
        'Đúng — vì giảm tốc dần giúp cơ thể thích nghi, tránh chấn thương. Lựa chọn <b>Giảm tốc dần, đi bộ vài bước</b> là phương án chuẩn.',
        'Sai — vì đáp án đúng là <b>Giảm tốc dần, đi bộ vài bước</b>. Dừng đột ngột dễ gây căng cơ và choáng.',
        'Sai — vì đáp án đúng là <b>Giảm tốc dần, đi bộ vài bước</b>. Chạy ngược lại nguy hiểm, dễ va chạm người chạy sau.',
        'Sai — vì đáp án đúng là <b>Giảm tốc dần, đi bộ vài bước</b>. Ngồi bệt ngay khiến máu dồn xuống chân, dễ choáng.',
      ]),
    Q('Trong giai đoạn chạy giữa quãng (100m), bước chân nên thế nào?', ['Dài, đều, tốc độ cao', 'Ngắn, chậm', 'Không quan tâm', 'Bước nhảy'], 0, 'Giai đoạn chạy giữa: bước dài, tần số cao để giữ tốc độ.',
      [
        'Giai đoạn <b>chạy giữa quãng</b> là lúc đạt tốc độ tối đa của cự ly 100m. Bước chân cần <code>dài, đều và tần số cao</code> để duy trì vận tốc lớn nhất.<ul><li>Độ dài bước + tần số bước = tốc độ chạy.</li><li>Thân hơi đổ trước, tiếp đất bằng nửa trước bàn chân.</li></ul>',
        '<i>Bước ngắn – chậm</i> không thể giữ tốc độ; <i>bước nhảy</i> làm thân nhô lên xuống, phí năng lượng và chậm lại. Vì vậy bước dài đều, tốc độ cao mới đúng kỹ thuật.',
      ],
      [
        'Đúng — vì giai đoạn chạy giữa cần bước dài, tần số cao để giữ tốc độ. Lựa chọn <b>Dài, đều, tốc độ cao</b> là phương án chuẩn.',
        'Sai — vì đáp án đúng là <b>Dài, đều, tốc độ cao</b>. Bước ngắn chậm không giữ được tốc độ tối đa.',
        'Sai — vì đáp án đúng là <b>Dài, đều, tốc độ cao</b>. Kỹ thuật bước chân ảnh hưởng trực tiếp đến thành tích.',
        'Sai — vì đáp án đúng là <b>Dài, đều, tốc độ cao</b>. Bước nhảy làm thân nhô lên xuống, phí sức và chậm lại.',
      ]),
    Q('Tay vung khi chạy ngắn nên?', ['Vung ngược hướng chân, song song trục cơ thể', 'Khoanh tay', 'Vung loạn', 'Bỏ thõng'], 0, 'Tay vung trước-sau song song trục thân, ngược hướng chân.',
      [
        'Động tác <b>đánh tay</b> khi chạy ngắn rất quan trọng để giữ thăng bằng và tăng lực. Tay vung <code>trước – sau song song trục cơ thể</code>, theo nhịp <b>ngược hướng với chân</b> (chân phải tiến thì tay trái vung lên).<ul><li>Khuỷu gập khoảng 90°.</li><li>Vai thả lỏng, không gồng.</li></ul>',
        'Tay đánh đúng giúp <i>cân bằng lực xoay của thân</i> và hỗ trợ tần số bước chân. Vung loạn, khoanh tay hay bỏ thõng đều làm mất thăng bằng và giảm tốc độ.',
      ],
      [
        'Đúng — vì tay vung trước-sau song song trục thân, ngược hướng chân. Lựa chọn <b>Vung ngược hướng chân, song song trục cơ thể</b> là phương án chuẩn.',
        'Sai — vì đáp án đúng là <b>Vung ngược hướng chân, song song trục cơ thể</b>. Khoanh tay làm mất thăng bằng, không thể chạy nhanh.',
        'Sai — vì đáp án đúng là <b>Vung ngược hướng chân, song song trục cơ thể</b>. Vung loạn làm thân xoay, giảm tốc độ.',
        'Sai — vì đáp án đúng là <b>Vung ngược hướng chân, song song trục cơ thể</b>. Bỏ thõng tay mất lực hỗ trợ và thăng bằng.',
      ]),
    Q('Để cải thiện tốc độ chạy ngắn cần luyện gì?', ['Chỉ tập tay', 'Chỉ chạy chậm', 'Sức mạnh tốc độ, kỹ thuật, phản xạ xuất phát', 'Không tập gì'], 2, 'Chạy ngắn cần cả: sức mạnh, tốc độ, kỹ thuật và phản xạ.',
      [
        'Thành tích chạy ngắn phụ thuộc nhiều yếu tố phải luyện đồng thời:<ul><li><b>Sức mạnh tốc độ</b> của chân (bật, đạp).</li><li><b>Kỹ thuật</b> chạy: tư thế, đánh tay, bước chân.</li><li><b>Phản xạ xuất phát</b>: bật nhanh ngay khi có hiệu lệnh.</li></ul>',
        'Chỉ tập một mặt (vd chỉ tập tay, chỉ chạy chậm) thì không thể nhanh được. Phối hợp đủ <code>sức mạnh – kỹ thuật – phản xạ</code> mới giúp cải thiện tốc độ thực sự.',
      ],
      [
        'Sai — vì đáp án đúng là <b>Sức mạnh tốc độ, kỹ thuật, phản xạ xuất phát</b>. Chỉ tập tay là phiến diện.',
        'Sai — vì đáp án đúng là <b>Sức mạnh tốc độ, kỹ thuật, phản xạ xuất phát</b>. Chỉ chạy chậm không rèn được tốc độ.',
        'Đúng — vì chạy ngắn cần cả sức mạnh, tốc độ, kỹ thuật và phản xạ. Lựa chọn <b>Sức mạnh tốc độ, kỹ thuật, phản xạ xuất phát</b> là phương án chuẩn.',
        'Sai — vì đáp án đúng là <b>Sức mạnh tốc độ, kỹ thuật, phản xạ xuất phát</b>. Không tập thì không thể tiến bộ.',
      ]),
  ]),

  M(4, 'Chạy bền — đi/chạy luân phiên', [
    Q('"Chạy bền" rèn luyện chủ yếu yếu tố gì?', ['Tốc độ tối đa', 'Sức mạnh tối đa', 'Sức bền tim mạch và hô hấp', 'Khéo léo'], 2, 'Chạy bền (sức bền): rèn hệ tim mạch, hô hấp, sức bền cơ.',
      [
        '<b>Chạy bền</b> là chạy ở tốc độ vừa phải trong thời gian/quãng đường dài. Yếu tố thể lực chính được rèn là <code>sức bền tim mạch – hô hấp</code>.<ul><li>Tim đập khoẻ, bơm máu hiệu quả hơn.</li><li>Phổi tăng dung tích, hô hấp tốt hơn.</li><li>Cơ bắp bền hơn, lâu mỏi.</li></ul>',
        'Khác với chạy ngắn (rèn tốc độ tối đa) hay tập tạ (rèn sức mạnh tối đa), chạy bền hướng tới <i>khả năng vận động lâu dài</i> mà không kiệt sức — nền tảng sức khoẻ rất quan trọng.',
      ],
      [
        'Sai — vì đáp án đúng là <b>Sức bền tim mạch và hô hấp</b>. Tốc độ tối đa là mục tiêu của chạy ngắn.',
        'Sai — vì đáp án đúng là <b>Sức bền tim mạch và hô hấp</b>. Sức mạnh tối đa thuộc các bài tập tạ/sức mạnh.',
        'Đúng — vì chạy bền rèn hệ tim mạch, hô hấp và sức bền cơ. Lựa chọn <b>Sức bền tim mạch và hô hấp</b> là phương án chuẩn.',
        'Sai — vì đáp án đúng là <b>Sức bền tim mạch và hô hấp</b>. Khéo léo được rèn ở các môn bóng, đá cầu.',
      ]),
    Q('Đối với học sinh mới tập, kỹ thuật "đi/chạy luân phiên" có tác dụng gì?', ['Rút ngắn thời gian hoàn thành cự ly', 'Giảm hiệu quả', 'Mất thời gian', 'Làm quen dần, tránh quá sức'], 3, 'Đi/chạy luân phiên giúp cơ thể thích nghi tăng dần với sức bền.',
      [
        'Với người mới tập, <b>đi/chạy luân phiên</b> (chạy một đoạn rồi đi bộ một đoạn) là cách an toàn để bắt đầu rèn sức bền. Tác dụng là giúp cơ thể <code>làm quen dần</code>, tránh bị quá sức ngay từ đầu.<ul><li>Đoạn đi bộ giúp tim, phổi hồi phục.</li><li>Tăng dần đoạn chạy, giảm dần đoạn đi.</li></ul>',
        'Đây là nguyên tắc <i>tăng tải từ từ</i>. Nếu ép chạy liên tục ngay khi chưa quen, học sinh dễ kiệt sức, đau xóc bụng và nản. Luân phiên giúp tiến bộ bền vững.',
      ],
      [
        'Sai — vì đáp án đúng là <b>Làm quen dần, tránh quá sức</b>. Mục tiêu không phải rút ngắn thời gian mà là rèn sức bền an toàn.',
        'Sai — vì đáp án đúng là <b>Làm quen dần, tránh quá sức</b>. Luân phiên làm tăng, không giảm, hiệu quả tập với người mới.',
        'Sai — vì đáp án đúng là <b>Làm quen dần, tránh quá sức</b>. Đây là cách tập khoa học, không phải mất thời gian.',
        'Đúng — vì đi/chạy luân phiên giúp cơ thể thích nghi tăng dần với sức bền. Lựa chọn <b>Làm quen dần, tránh quá sức</b> là phương án chuẩn.',
      ]),
    Q('Hơi thở khi chạy bền nên?', ['Nhanh và nông', 'Sâu, đều, kết hợp mũi-miệng', 'Không quan tâm', 'Nín thở'], 1, 'Chạy bền: thở sâu, đều, theo nhịp bước (vd 3 bước hít - 3 bước thở).',
      [
        'Trong chạy bền, kiểu thở quyết định việc giữ sức lâu. Nên thở <code>sâu, đều và kết hợp mũi – miệng</code>, theo nhịp bước chân (ví dụ <b>3 bước hít vào – 3 bước thở ra</b>).<ul><li>Thở sâu đưa nhiều oxy vào phổi.</li><li>Thở đều giúp giữ nhịp chạy ổn định.</li></ul>',
        '<i>Thở nhanh – nông</i> phù hợp với nước rút, còn chạy bền sẽ làm nhanh đuối. <i>Nín thở</i> thì hoàn toàn sai vì thiếu oxy, dễ choáng và đau xóc bụng.',
      ],
      [
        'Sai — vì đáp án đúng là <b>Sâu, đều, kết hợp mũi-miệng</b>. Thở nhanh nông chỉ hợp với nước rút.',
        'Đúng — vì chạy bền cần thở sâu, đều, theo nhịp bước. Lựa chọn <b>Sâu, đều, kết hợp mũi-miệng</b> là phương án chuẩn.',
        'Sai — vì đáp án đúng là <b>Sâu, đều, kết hợp mũi-miệng</b>. Hơi thở quyết định khả năng giữ sức khi chạy bền.',
        'Sai — vì đáp án đúng là <b>Sâu, đều, kết hợp mũi-miệng</b>. Nín thở gây thiếu oxy, dễ choáng và xóc bụng.',
      ]),
    Q('Tốc độ chạy bền nên?', ['Vừa phải, ổn định, có thể duy trì lâu', 'Chạy nước rút từ đầu đến cuối', 'Chạy rồi nghỉ', 'Càng nhanh càng tốt'], 0, 'Chạy bền: tốc độ vừa phải, có thể nói chuyện được mới đúng.',
      [
        'Tốc độ chạy bền hợp lý là <b>vừa phải, ổn định và có thể duy trì lâu</b>. Một cách kiểm tra đơn giản: <code>vừa chạy vừa nói chuyện được</code> mà không hụt hơi là tốc độ đúng.<ul><li>Giữ tốc độ đều suốt cự ly.</li><li>Phân phối sức để không "đuối" giữa chừng.</li></ul>',
        'Nếu <i>chạy nước rút từ đầu</i> hoặc <i>càng nhanh càng tốt</i>, em sẽ kiệt sức rất nhanh và không hoàn thành nổi cự ly. Chạy bền cần sự bền bỉ, không phải bùng nổ tốc độ.',
      ],
      [
        'Đúng — vì chạy bền cần tốc độ vừa phải, có thể nói chuyện được mới đúng. Lựa chọn <b>Vừa phải, ổn định, có thể duy trì lâu</b> là phương án chuẩn.',
        'Sai — vì đáp án đúng là <b>Vừa phải, ổn định, có thể duy trì lâu</b>. Nước rút từ đầu sẽ kiệt sức rất nhanh.',
        'Sai — vì đáp án đúng là <b>Vừa phải, ổn định, có thể duy trì lâu</b>. Chạy rồi nghỉ làm mất nhịp, không rèn được sức bền.',
        'Sai — vì đáp án đúng là <b>Vừa phải, ổn định, có thể duy trì lâu</b>. Càng nhanh càng tốt khiến không hoàn thành nổi cự ly.',
      ]),
    Q('Lợi ích của chạy bền là?', ['Không có lợi', 'Hại sức khoẻ', 'Tăng sức bền tim phổi, giảm stress, tốt cho sức khoẻ', 'Chỉ làm mệt'], 2, 'Chạy bền thường xuyên: khoẻ tim phổi, giảm stress, kiểm soát cân nặng.',
      [
        'Chạy bền đều đặn mang lại nhiều lợi ích sức khoẻ:<ul><li>Tăng <b>sức bền tim phổi</b>, hệ tuần hoàn – hô hấp khoẻ hơn.</li><li><code>Giảm stress</code>, ngủ ngon nhờ tiết endorphin.</li><li>Kiểm soát cân nặng, đốt mỡ thừa.</li></ul>',
        'Đây là một trong những hình thức vận động <i>tốt nhất cho sức khoẻ tổng thể</i>, phù hợp mọi lứa tuổi. Nói chạy bền "không có lợi" hay "hại sức khoẻ" là hoàn toàn sai.',
      ],
      [
        'Sai — vì đáp án đúng là <b>Tăng sức bền tim phổi, giảm stress, tốt cho sức khoẻ</b>. Chạy bền có rất nhiều lợi ích.',
        'Sai — vì đáp án đúng là <b>Tăng sức bền tim phổi, giảm stress, tốt cho sức khoẻ</b>. Chạy bền đúng cách tốt cho sức khoẻ, không gây hại.',
        'Đúng — vì chạy bền thường xuyên giúp khoẻ tim phổi, giảm stress, kiểm soát cân nặng. Lựa chọn <b>Tăng sức bền tim phổi, giảm stress, tốt cho sức khoẻ</b> là phương án chuẩn.',
        'Sai — vì đáp án đúng là <b>Tăng sức bền tim phổi, giảm stress, tốt cho sức khoẻ</b>. Mệt là tạm thời, lợi ích lâu dài rất lớn.',
      ]),
  ]),

  M(5, 'Nhảy xa — kỹ thuật "ưỡn thân"', [
    Q('Nhảy xa gồm mấy giai đoạn chính?', ['4 giai đoạn: chạy đà, giậm nhảy, trên không, tiếp đất', '6 giai đoạn', '2 giai đoạn', '1 giai đoạn'], 0, '4 giai đoạn: chạy đà → giậm nhảy → bay trên không → tiếp đất.',
      [
        'Kỹ thuật <b>nhảy xa</b> được chia thành <code>4 giai đoạn</code> liên tục:<ul><li><b>Chạy đà</b> — tạo tốc độ ngang.</li><li><b>Giậm nhảy</b> — đạp mạnh chân giậm tại vạch.</li><li><b>Bay trên không</b> — giữ thăng bằng, "ưỡn thân".</li><li><b>Tiếp đất</b> — hai chân chạm hố cát, gối khuỵu.</li></ul>',
        'Bốn giai đoạn này nối liền mạch, mỗi giai đoạn ảnh hưởng đến giai đoạn sau. Nắm đúng cấu trúc giúp em luyện tập có hệ thống và đạt thành tích tốt.',
      ],
      [
        'Đúng — vì nhảy xa gồm 4 giai đoạn: chạy đà → giậm nhảy → bay trên không → tiếp đất. Lựa chọn <b>4 giai đoạn: chạy đà, giậm nhảy, trên không, tiếp đất</b> là phương án chuẩn.',
        'Sai — vì đáp án đúng là <b>4 giai đoạn</b>. Nhảy xa chỉ có 4 giai đoạn chính, không phải 6.',
        'Sai — vì đáp án đúng là <b>4 giai đoạn</b>. Chia thành 2 giai đoạn là thiếu, bỏ sót chạy đà và tiếp đất.',
        'Sai — vì đáp án đúng là <b>4 giai đoạn</b>. Nhảy xa là chuỗi động tác, không thể gộp thành 1 giai đoạn.',
      ]),
    Q('Trong nhảy xa, chân giậm nhảy là?', ['Chân thuận, mạnh hơn', 'Chân không thuận', 'Đổi chân luân phiên mỗi lần nhảy', 'Cả hai chân cùng lúc'], 0, 'Thường dùng chân thuận làm chân giậm (mạnh hơn).',
      [
        '<b>Chân giậm nhảy</b> là chân tạo lực bật để đưa cơ thể bay lên và ra xa. Thường dùng <code>chân thuận (chân khoẻ hơn)</code> để có lực giậm lớn nhất.<ul><li>Mỗi người nên xác định chân giậm cố định.</li><li>Tập đúng một chân giậm để hình thành phản xạ.</li></ul>',
        'Không đổi chân luân phiên (sẽ làm hỏng nhịp đà) và không giậm hai chân cùng lúc (đó là kỹ thuật bật xa tại chỗ, không phải nhảy xa có đà). <i>Một chân giậm cố định, chân thuận</i> mới đúng.',
      ],
      [
        'Đúng — vì thường dùng chân thuận (mạnh hơn) làm chân giậm. Lựa chọn <b>Chân thuận, mạnh hơn</b> là phương án chuẩn.',
        'Sai — vì đáp án đúng là <b>Chân thuận, mạnh hơn</b>. Dùng chân yếu sẽ giảm lực giậm.',
        'Sai — vì đáp án đúng là <b>Chân thuận, mạnh hơn</b>. Đổi chân luân phiên làm hỏng nhịp đà và phản xạ.',
        'Sai — vì đáp án đúng là <b>Chân thuận, mạnh hơn</b>. Giậm hai chân cùng lúc là bật xa tại chỗ, không phải nhảy xa có đà.',
      ]),
    Q('Khi tiếp đất trong nhảy xa, nên?', ['Tiếp bằng mông', 'Hai chân chạm đất cùng lúc, đầu gối hơi khuỵu', 'Một chân', 'Tiếp bằng tay'], 1, 'Hai chân cùng tiếp, gối khuỵu để giảm chấn — bảo vệ khớp.',
      [
        'Giai đoạn <b>tiếp đất</b> nên đưa <code>hai chân về trước, chạm hố cát cùng lúc</code>, đầu gối hơi khuỵu để hấp thụ lực, bảo vệ khớp.<ul><li>Gối khuỵu như "lò xo" giảm chấn động.</li><li>Thân và tay đưa về trước để không ngã ngửa.</li></ul>',
        'Tiếp đất bằng mông, một chân hay bằng tay đều sai: vừa dễ chấn thương, vừa làm vết chạm gần vạch giậm hơn → <i>mất khoảng cách</i> (thành tích bị tính theo điểm chạm gần vạch giậm nhất).',
      ],
      [
        'Sai — vì đáp án đúng là <b>Hai chân chạm đất cùng lúc, đầu gối hơi khuỵu</b>. Tiếp bằng mông dễ chấn thương và mất khoảng cách.',
        'Đúng — vì hai chân cùng tiếp, gối khuỵu để giảm chấn, bảo vệ khớp. Lựa chọn <b>Hai chân chạm đất cùng lúc, đầu gối hơi khuỵu</b> là phương án chuẩn.',
        'Sai — vì đáp án đúng là <b>Hai chân chạm đất cùng lúc, đầu gối hơi khuỵu</b>. Tiếp một chân dễ mất thăng bằng, ngã.',
        'Sai — vì đáp án đúng là <b>Hai chân chạm đất cùng lúc, đầu gối hơi khuỵu</b>. Tiếp bằng tay là sai và gần vạch giậm → mất thành tích.',
      ]),
    Q('Tại sao phải chạy đà trong nhảy xa?', ['Không cần đà', 'Để mệt', 'Trang trí', 'Tạo tốc độ ngang để chuyển thành xa'], 3, 'Đà tạo tốc độ ngang, kết hợp lực giậm → tạo quỹ đạo bay xa.',
      [
        '<b>Chạy đà</b> có vai trò tạo ra <code>tốc độ ngang</code>. Khi giậm nhảy, tốc độ ngang này kết hợp với lực bật thẳng tạo thành quỹ đạo bay vừa cao vừa xa.<ul><li>Đà càng nhanh, hợp lực bay càng lớn → nhảy càng xa.</li><li>Đà cần tăng dần, đạt cực đại ngay trước vạch giậm.</li></ul>',
        'Nếu không có đà (đứng tại chỗ giậm) thì chỉ bật được rất ngắn. Vì vậy chạy đà là yếu tố quyết định thành tích nhảy xa, không phải để "trang trí" hay "cho mệt".',
      ],
      [
        'Sai — vì đáp án đúng là <b>Tạo tốc độ ngang để chuyển thành xa</b>. Không có đà thì chỉ bật được rất ngắn.',
        'Sai — vì đáp án đúng là <b>Tạo tốc độ ngang để chuyển thành xa</b>. Chạy đà có mục đích kỹ thuật, không phải để mệt.',
        'Sai — vì đáp án đúng là <b>Tạo tốc độ ngang để chuyển thành xa</b>. Đà là yếu tố quyết định, không phải trang trí.',
        'Đúng — vì đà tạo tốc độ ngang, kết hợp lực giậm tạo quỹ đạo bay xa. Lựa chọn <b>Tạo tốc độ ngang để chuyển thành xa</b> là phương án chuẩn.',
      ]),
    Q('Vạch giậm nhảy là gì?', ['Vạch trang trí', 'Vạch xuất phát', 'Vạch quy định nơi giậm nhảy; bước qua = phạm luật', 'Vạch đích'], 2, 'Vạch giậm: chân không được bước qua, nếu phạm coi như nhảy hỏng.',
      [
        '<b>Vạch giậm nhảy</b> là vạch quy định nơi đặt chân giậm để bật. Quy tắc: <code>chân giậm không được bước/lấn qua vạch</code>. Nếu vượt qua thì lần nhảy bị tính <b>phạm luật (hỏng)</b>.<ul><li>Thành tích đo từ vạch giậm đến điểm chạm gần nhất.</li><li>Cần đo đà chính xác để giậm đúng trước vạch.</li></ul>',
        'Đây không phải vạch xuất phát hay vạch đích. Việc giậm đúng vạch đòi hỏi <i>đo đà chuẩn</i> — chạy thử nhiều lần, đếm bước và đánh dấu điểm xuất phát.',
      ],
      [
        'Sai — vì đáp án đúng là <b>Vạch quy định nơi giậm nhảy; bước qua = phạm luật</b>. Vạch giậm có vai trò luật lệ quan trọng.',
        'Sai — vì đáp án đúng là <b>Vạch quy định nơi giậm nhảy; bước qua = phạm luật</b>. Vạch xuất phát là nơi bắt đầu chạy đà, khác vạch giậm.',
        'Đúng — vì chân không được bước qua vạch giậm, nếu phạm coi như nhảy hỏng. Lựa chọn <b>Vạch quy định nơi giậm nhảy; bước qua = phạm luật</b> là phương án chuẩn.',
        'Sai — vì đáp án đúng là <b>Vạch quy định nơi giậm nhảy; bước qua = phạm luật</b>. Nhảy xa không có "vạch đích".',
      ]),
  ]),

  M(6, 'Nhảy cao — kiểu "bước qua"', [
    Q('Kiểu nhảy cao "bước qua" thực hiện như thế nào?', ['Chân giậm đẩy, chân lăng vung qua xà rồi đến chân giậm', 'Trườn người', 'Nhảy hai chân cùng lúc', 'Không qua xà'], 0, 'Bước qua: chân lăng vung qua xà trước, chân giậm qua sau như "bước".',
      [
        'Kiểu nhảy cao <b>"bước qua"</b> là kỹ thuật cơ bản nhất ở THCS. Trình tự: <code>chân giậm đạp mạnh đẩy người lên → chân lăng vung qua xà trước → chân giậm qua sau</code> như đang "bước" qua xà.<ul><li>Động tác như bước một bước dài qua xà.</li><li>Dễ học, an toàn cho học sinh mới tập.</li></ul>',
        'Đây không phải trườn người (đó là kiểu úp bụng/lưng), không nhảy hai chân cùng lúc, và đương nhiên phải qua được xà. <i>"Bước qua" lần lượt từng chân</i> mới đúng kỹ thuật.',
      ],
      [
        'Đúng — vì bước qua là chân lăng vung qua xà trước, chân giậm qua sau như "bước". Lựa chọn <b>Chân giậm đẩy, chân lăng vung qua xà rồi đến chân giậm</b> là phương án chuẩn.',
        'Sai — vì đáp án đúng là <b>Chân giậm đẩy, chân lăng vung qua xà rồi đến chân giậm</b>. Trườn người là kiểu úp bụng/lưng, khác bước qua.',
        'Sai — vì đáp án đúng là <b>Chân giậm đẩy, chân lăng vung qua xà rồi đến chân giậm</b>. Bước qua dùng một chân giậm, không giậm hai chân.',
        'Sai — vì đáp án đúng là <b>Chân giậm đẩy, chân lăng vung qua xà rồi đến chân giậm</b>. Mục tiêu là phải qua được xà.',
      ]),
    Q('Chân giậm nhảy cao là?', ['Chân thuận (mạnh)', 'Đổi chân giậm theo từng lần nhảy', 'Chân yếu', 'Cả hai'], 0, 'Chân giậm thường là chân thuận để tạo lực bật cao nhất.',
      [
        'Như nhảy xa, <b>chân giậm trong nhảy cao</b> nên là <code>chân thuận (chân mạnh)</code> để tạo lực bật lên cao nhất.<ul><li>Chân giậm cố định giúp hình thành phản xạ giậm đúng.</li><li>Chân còn lại làm chân lăng (vung qua xà trước).</li></ul>',
        'Đổi chân giậm mỗi lần nhảy sẽ làm hỏng nhịp đà và kỹ thuật; dùng chân yếu thì bật không cao. <i>Một chân giậm cố định, là chân thuận</i> mới hợp lý.',
      ],
      [
        'Đúng — vì chân giậm thường là chân thuận để tạo lực bật cao nhất. Lựa chọn <b>Chân thuận (mạnh)</b> là phương án chuẩn.',
        'Sai — vì đáp án đúng là <b>Chân thuận (mạnh)</b>. Đổi chân giậm mỗi lần làm hỏng nhịp đà và kỹ thuật.',
        'Sai — vì đáp án đúng là <b>Chân thuận (mạnh)</b>. Chân yếu bật không cao.',
        'Sai — vì đáp án đúng là <b>Chân thuận (mạnh)</b>. Nhảy cao giậm một chân, không giậm cả hai.',
      ]),
    Q('Trong nhảy cao, hướng chạy đà thường?', ['Song song với xà', 'Ngẫu nhiên', 'Vuông góc với xà', 'Chéo (khoảng 30-45 độ) với xà'], 3, 'Kiểu "bước qua" chạy đà chéo 30-45 độ với xà.',
      [
        'Với kiểu <b>"bước qua"</b>, hướng chạy đà tạo một góc <code>chéo khoảng 30–45°</code> so với xà ngang.<ul><li>Góc chéo giúp chân lăng vung qua xà thuận lợi.</li><li>Đà thẳng vuông góc hoặc song song đều khó đưa chân qua xà.</li></ul>',
        'Đà chéo còn giúp tạo nhịp đà tự nhiên và điểm giậm hợp lý trước xà. Đây là chi tiết kỹ thuật quan trọng của kiểu bước qua, không thể chạy đà "ngẫu nhiên".',
      ],
      [
        'Sai — vì đáp án đúng là <b>Chéo (khoảng 30-45 độ) với xà</b>. Chạy song song xà thì không qua được xà.',
        'Sai — vì đáp án đúng là <b>Chéo (khoảng 30-45 độ) với xà</b>. Hướng đà cần đúng góc, không thể ngẫu nhiên.',
        'Sai — vì đáp án đúng là <b>Chéo (khoảng 30-45 độ) với xà</b>. Đà vuông góc khó đưa chân lăng qua xà.',
        'Đúng — vì kiểu "bước qua" chạy đà chéo 30-45 độ với xà. Lựa chọn <b>Chéo (khoảng 30-45 độ) với xà</b> là phương án chuẩn.',
      ]),
    Q('Khi qua xà, nên?', ['Bám xà', 'Đẩy xà', 'Chạm nhẹ', 'Không chạm xà'], 3, 'Mục tiêu là qua xà mà không làm xà rơi.',
      [
        'Mục tiêu của nhảy cao là <b>vượt qua xà mà không làm xà rơi</b>. Vì vậy khi qua xà cần <code>không chạm xà</code>, nâng cơ thể đủ cao để xà giữ nguyên trên giá.<ul><li>Chạm xà làm xà rơi → lần nhảy không hợp lệ.</li><li>Cần giậm đủ mạnh và "ưỡn" các bộ phận qua xà gọn gàng.</li></ul>',
        'Bám xà hay đẩy xà đều khiến xà rơi và phạm luật. <i>Qua xà gọn, không chạm</i> mới là lần nhảy thành công.',
      ],
      [
        'Sai — vì đáp án đúng là <b>Không chạm xà</b>. Bám xà làm xà rơi, lần nhảy không hợp lệ.',
        'Sai — vì đáp án đúng là <b>Không chạm xà</b>. Đẩy xà khiến xà rơi và phạm luật.',
        'Sai — vì đáp án đúng là <b>Không chạm xà</b>. Chạm nhẹ vẫn có thể làm xà rơi; mục tiêu là không chạm.',
        'Đúng — vì mục tiêu là qua xà mà không làm xà rơi. Lựa chọn <b>Không chạm xà</b> là phương án chuẩn.',
      ]),
    Q('Tiếp đất sau khi qua xà nên?', ['Hai chân cùng lúc lưng còng', 'Chân lăng tiếp đất trước, đầu gối khuỵu', 'Ngã ngửa', 'Đầu xuống trước'], 1, 'Kiểu bước qua tiếp đất bằng chân lăng (chân vung qua trước).',
      [
        'Với kiểu <b>"bước qua"</b>, sau khi vượt xà thì <code>chân lăng (chân vung qua trước) tiếp đất trước</code>, đầu gối hơi khuỵu để giảm chấn.<ul><li>Vì chân lăng qua xà trước nên chạm đất trước.</li><li>Gối khuỵu như lò xo bảo vệ khớp.</li></ul>',
        'Tiếp đất bằng đầu, ngã ngửa hay lưng còng đều nguy hiểm, dễ chấn thương. Nhảy cao nên có <i>đệm rơi</i> phía sau xà để đảm bảo an toàn khi tiếp đất.',
      ],
      [
        'Sai — vì đáp án đúng là <b>Chân lăng tiếp đất trước, đầu gối khuỵu</b>. Lưng còng tiếp đất dễ chấn thương cột sống.',
        'Đúng — vì kiểu bước qua tiếp đất bằng chân lăng (chân vung qua trước). Lựa chọn <b>Chân lăng tiếp đất trước, đầu gối khuỵu</b> là phương án chuẩn.',
        'Sai — vì đáp án đúng là <b>Chân lăng tiếp đất trước, đầu gối khuỵu</b>. Ngã ngửa rất nguy hiểm cho lưng và đầu.',
        'Sai — vì đáp án đúng là <b>Chân lăng tiếp đất trước, đầu gối khuỵu</b>. Đầu xuống trước cực kỳ nguy hiểm, tuyệt đối tránh.',
      ]),
  ]),

  M(7, 'Bóng đá — kỹ thuật dẫn bóng', [
    Q('Khi dẫn bóng trong bóng đá, nên chạm bóng bằng?', ['Gót chân', 'Mũi chân duy nhất', 'Má trong, má ngoài, mu giữa bàn chân tuỳ tình huống', 'Lòng bàn chân áp sát mặt sân'], 2, 'Dẫn bóng linh hoạt: má trong (đổi hướng), má ngoài (lừa), mu (tốc độ).',
      [
        '<b>Dẫn bóng</b> trong bóng đá đòi hỏi sự linh hoạt: tuỳ tình huống mà chạm bóng bằng <code>má trong, má ngoài hay mu giữa bàn chân</code>.<ul><li><b>Má trong:</b> đổi hướng, giữ bóng sát chân.</li><li><b>Má ngoài:</b> lừa bóng, đổi hướng nhanh.</li><li><b>Mu bàn chân:</b> dẫn bóng tốc độ ở khoảng trống.</li></ul>',
        'Chỉ dùng một điểm chạm (như mũi chân) sẽ khó kiểm soát hướng và lực. Cầu thủ giỏi biết phối hợp nhiều vị trí bàn chân để dẫn bóng <i>vừa nhanh vừa chắc</i>.',
      ],
      [
        'Sai — vì đáp án đúng là <b>Má trong, má ngoài, mu giữa bàn chân tuỳ tình huống</b>. Dùng gót để dẫn bóng rất khó kiểm soát.',
        'Sai — vì đáp án đúng là <b>Má trong, má ngoài, mu giữa bàn chân tuỳ tình huống</b>. Chỉ dùng mũi chân khó điều khiển hướng và lực.',
        'Đúng — vì dẫn bóng linh hoạt dùng má trong (đổi hướng), má ngoài (lừa), mu (tốc độ). Lựa chọn <b>Má trong, má ngoài, mu giữa bàn chân tuỳ tình huống</b> là phương án chuẩn.',
        'Sai — vì đáp án đúng là <b>Má trong, má ngoài, mu giữa bàn chân tuỳ tình huống</b>. Áp lòng bàn chân sát sân là động tác giữ/đè bóng, không phải dẫn bóng linh hoạt.',
      ]),
    Q('Khoảng cách bóng khi dẫn nên?', ['Không cần', 'Đá thật mạnh', 'Càng xa càng tốt', 'Gần chân, kiểm soát được, không để bị cướp'], 3, 'Bóng cần gần chân để kiểm soát và xử lý nhanh khi đối phương áp sát.',
      [
        'Khi dẫn bóng, nên giữ bóng <b>gần chân, trong tầm kiểm soát</b>. Mỗi bước chạm bóng một nhịp nhẹ để bóng không lăn quá xa.<ul><li>Bóng gần chân → xoay xở, rê dắt, qua người dễ.</li><li>Khi đối phương áp sát, có thể xử lý ngay.</li></ul>',
        'Đẩy bóng quá xa (đá mạnh, đẩy "càng xa càng tốt") sẽ bị đối phương cắt bóng ngay. <i>Kiểm soát bóng sát chân</i> là nguyên tắc cơ bản của dẫn bóng tốt.',
      ],
      [
        'Sai — vì đáp án đúng là <b>Gần chân, kiểm soát được, không để bị cướp</b>. Khoảng cách bóng rất quan trọng khi dẫn.',
        'Sai — vì đáp án đúng là <b>Gần chân, kiểm soát được, không để bị cướp</b>. Đá mạnh làm bóng lăn xa, dễ mất bóng.',
        'Sai — vì đáp án đúng là <b>Gần chân, kiểm soát được, không để bị cướp</b>. Đẩy bóng càng xa càng dễ bị đối phương cắt bóng.',
        'Đúng — vì bóng cần gần chân để kiểm soát và xử lý nhanh khi đối phương áp sát. Lựa chọn <b>Gần chân, kiểm soát được, không để bị cướp</b> là phương án chuẩn.',
      ]),
    Q('Trong bóng đá, "chuyền bóng ngắn" thường dùng kỹ thuật?', ['Đá bằng mu chính diện bàn chân', 'Đá bằng má trong bàn chân', 'Đá bằng mũi chân', 'Đá bằng gót'], 1, 'Chuyền ngắn: má trong cho độ chính xác cao.',
      [
        '<b>Chuyền bóng ngắn</b> ưu tiên độ chính xác, nên dùng kỹ thuật <code>đá bằng má trong bàn chân</code>.<ul><li>Diện tiếp xúc má trong rộng → bóng đi đúng hướng.</li><li>Dễ điều chỉnh lực cho cự ly ngắn.</li></ul>',
        'Đá mu chính diện hợp với cú sút mạnh/chuyền dài; đá mũi chân hay gót thì khó chính xác. Vì vậy chuyền ngắn chuẩn là <i>má trong bàn chân</i>.',
      ],
      [
        'Sai — vì đáp án đúng là <b>Đá bằng má trong bàn chân</b>. Mu chính diện hợp cú sút mạnh/chuyền dài.',
        'Đúng — vì chuyền ngắn dùng má trong cho độ chính xác cao. Lựa chọn <b>Đá bằng má trong bàn chân</b> là phương án chuẩn.',
        'Sai — vì đáp án đúng là <b>Đá bằng má trong bàn chân</b>. Đá mũi chân khó chính xác, dễ lệch hướng.',
        'Sai — vì đáp án đúng là <b>Đá bằng má trong bàn chân</b>. Đá gót chỉ dùng trong tình huống đặc biệt, không phải chuyền ngắn cơ bản.',
      ]),
    Q('Khi sút cầu môn, kỹ thuật phổ biến nhất là?', ['Đá bằng gót', 'Đá bằng đầu gối', 'Dùng tay', 'Đá bằng mu bàn chân (mu chính diện)'], 3, 'Sút mạnh thường dùng mu bàn chân → bóng đi mạnh và chính diện.',
      [
        'Để <b>sút cầu môn</b> mạnh và uy lực, kỹ thuật phổ biến nhất là <code>đá bằng mu bàn chân (mu chính diện)</code>.<ul><li>Mu chân cứng, diện tiếp xúc tạo lực lớn.</li><li>Bóng đi thẳng, mạnh và căng.</li></ul>',
        'Đá gót hay đầu gối thì yếu và khó chính xác; dùng tay là phạm luật (trừ thủ môn trong vòng cấm). <i>Mu bàn chân</i> mới là kỹ thuật sút chuẩn.',
      ],
      [
        'Sai — vì đáp án đúng là <b>Đá bằng mu bàn chân (mu chính diện)</b>. Đá gót yếu và thiếu chính xác.',
        'Sai — vì đáp án đúng là <b>Đá bằng mu bàn chân (mu chính diện)</b>. Đầu gối không tạo được lực sút mạnh.',
        'Sai — vì đáp án đúng là <b>Đá bằng mu bàn chân (mu chính diện)</b>. Dùng tay là phạm luật (trừ thủ môn trong vòng cấm).',
        'Đúng — vì sút mạnh thường dùng mu bàn chân, bóng đi mạnh và chính diện. Lựa chọn <b>Đá bằng mu bàn chân (mu chính diện)</b> là phương án chuẩn.',
      ]),
    Q('Một trận bóng đá tiêu chuẩn có bao nhiêu cầu thủ mỗi đội trên sân?', ['5', '11', '9', '7'], 1, 'Bóng đá 11 người, bao gồm thủ môn.',
      [
        'Bóng đá tiêu chuẩn (sân 11 người) có <b>11 cầu thủ mỗi đội</b> trên sân, trong đó có <code>1 thủ môn</code> và 10 cầu thủ chơi ở các vị trí phòng ngự, tiền vệ, tấn công.<ul><li>Thủ môn được dùng tay trong vòng cấm đội nhà.</li><li>Mỗi đội còn có cầu thủ dự bị ngoài sân.</li></ul>',
        'Các con số 5, 7, 9 là số người của các hình thức thu nhỏ (futsal 5 người, sân 7…) chứ không phải bóng đá tiêu chuẩn. Bóng đá 11 người là thể thức thi đấu chính thức.',
      ],
      [
        'Sai — vì đáp án đúng là <b>11</b>. 5 người là futsal (bóng đá trong nhà).',
        'Đúng — vì bóng đá tiêu chuẩn có 11 người mỗi đội, bao gồm thủ môn. Lựa chọn <b>11</b> là phương án chuẩn.',
        'Sai — vì đáp án đúng là <b>11</b>. 9 không phải thể thức bóng đá tiêu chuẩn.',
        'Sai — vì đáp án đúng là <b>11</b>. 7 là bóng đá sân nhỏ (sân 7), không phải tiêu chuẩn.',
      ]),
  ]),

  M(8, 'Bóng rổ — kỹ thuật dẫn và chuyền bóng', [
    Q('Khi dẫn bóng rổ, tay nên?', ['Đập bóng xuống đất bằng ngón và phần dưới bàn tay', 'Dùng cả hai tay đập', 'Cầm bóng chạy', 'Đập bằng mu bàn tay'], 0, 'Dẫn bóng rổ: dùng đầu ngón và mu trong tay đẩy bóng xuống đất, nhịp nhàng.',
      [
        '<b>Dẫn bóng rổ</b> (dribble) là dùng <code>đầu ngón tay và phần dưới (gốc) bàn tay</code> đẩy bóng xuống đất nhịp nhàng, không dùng lòng bàn tay vỗ.<ul><li>Cổ tay thả lỏng, dùng lực đẩy nhẹ và đều.</li><li>Bóng nảy lên ngang hông là chiều cao hợp lý.</li></ul>',
        'Quy tắc: chỉ dùng <i>một tay</i> mỗi nhịp dẫn (dùng hai tay cùng lúc bắt bóng là phạm luật "hai lần dẫn"). Cầm bóng chạy mà không đập là lỗi "đi bộ" (travel).',
      ],
      [
        'Đúng — vì dẫn bóng rổ dùng đầu ngón và mu trong tay đẩy bóng xuống đất nhịp nhàng. Lựa chọn <b>Đập bóng xuống đất bằng ngón và phần dưới bàn tay</b> là phương án chuẩn.',
        'Sai — vì đáp án đúng là <b>Đập bóng xuống đất bằng ngón và phần dưới bàn tay</b>. Dùng hai tay cùng đập là phạm luật "hai lần dẫn".',
        'Sai — vì đáp án đúng là <b>Đập bóng xuống đất bằng ngón và phần dưới bàn tay</b>. Cầm bóng chạy không đập là lỗi "đi bộ".',
        'Sai — vì đáp án đúng là <b>Đập bóng xuống đất bằng ngón và phần dưới bàn tay</b>. Đập bằng mu bàn tay không kiểm soát được bóng.',
      ]),
    Q('"Đi bộ" (travel) trong bóng rổ là lỗi gì?', ['Chuyền bóng', 'Đập bóng', 'Cầm bóng chạy quá 2 bước mà không đập bóng', 'Đứng yên'], 2, 'Travel: di chuyển quá 2 bước với bóng trong tay mà không dẫn → phạm luật.',
      [
        'Lỗi <b>"đi bộ" (travel)</b> xảy ra khi cầu thủ <code>cầm bóng di chuyển quá 2 bước mà không đập (dẫn) bóng</code>.<ul><li>Khi cầm bóng, chỉ được bước tối đa 2 bước.</li><li>Muốn di chuyển tiếp phải vừa đi vừa dẫn bóng.</li></ul>',
        'Đây là một trong những lỗi cơ bản hay gặp ở người mới chơi. Hiểu luật travel giúp em <i>dẫn bóng đúng nhịp</i> thay vì ôm bóng chạy.',
      ],
      [
        'Sai — vì đáp án đúng là <b>Cầm bóng chạy quá 2 bước mà không đập bóng</b>. Chuyền bóng là kỹ thuật hợp lệ, không phải lỗi.',
        'Sai — vì đáp án đúng là <b>Cầm bóng chạy quá 2 bước mà không đập bóng</b>. Đập bóng (dẫn) là động tác hợp lệ.',
        'Đúng — vì travel là di chuyển quá 2 bước với bóng trong tay mà không dẫn. Lựa chọn <b>Cầm bóng chạy quá 2 bước mà không đập bóng</b> là phương án chuẩn.',
        'Sai — vì đáp án đúng là <b>Cầm bóng chạy quá 2 bước mà không đập bóng</b>. Đứng yên không phải lỗi travel.',
      ]),
    Q('Một quả ném rổ thông thường (2 điểm hoặc 3 điểm) được tính khi nào?', ['Bóng đi qua vành rổ từ trên xuống', 'Bóng chạm bảng', 'Bóng chạm vành', 'Bóng đập đất'], 0, 'Ghi điểm khi bóng đi xuyên qua vành rổ từ trên.',
      [
        'Một quả ném rổ được tính điểm khi <b>bóng đi xuyên qua vành rổ từ trên xuống</b> và lọt qua lưới.<ul><li>Trong vạch 3 điểm: 2 điểm.</li><li>Ngoài vạch 3 điểm: 3 điểm.</li><li>Ném phạt: 1 điểm.</li></ul>',
        'Chỉ chạm bảng hay chạm vành mà bóng không lọt qua thì <i>không được tính điểm</i>. Yếu tố quyết định là bóng phải <code>qua vành từ trên xuống</code>.',
      ],
      [
        'Đúng — vì ghi điểm khi bóng đi xuyên qua vành rổ từ trên xuống. Lựa chọn <b>Bóng đi qua vành rổ từ trên xuống</b> là phương án chuẩn.',
        'Sai — vì đáp án đúng là <b>Bóng đi qua vành rổ từ trên xuống</b>. Chạm bảng mà không lọt rổ thì không tính.',
        'Sai — vì đáp án đúng là <b>Bóng đi qua vành rổ từ trên xuống</b>. Chạm vành mà bóng không lọt thì không có điểm.',
        'Sai — vì đáp án đúng là <b>Bóng đi qua vành rổ từ trên xuống</b>. Bóng đập đất không liên quan đến ghi điểm.',
      ]),
    Q('Kỹ thuật chuyền bóng phổ biến trong bóng rổ là?', ['Chuyền trước ngực (chest pass), chuyền đập đất (bounce)', 'Đá bóng', 'Đập đầu', 'Đẩy bằng vai'], 0, 'Hai kiểu chuyền cơ bản: chest pass và bounce pass.',
      [
        'Hai kỹ thuật <b>chuyền bóng cơ bản</b> trong bóng rổ là:<ul><li><code>Chuyền trước ngực (chest pass)</code> — hai tay đẩy bóng thẳng từ ngực, nhanh và chính xác.</li><li><code>Chuyền đập đất (bounce pass)</code> — bóng nảy một lần xuống sàn rồi tới đồng đội, khó bị cắt.</li></ul>',
        'Đá bóng, đập đầu hay đẩy vai không phải kỹ thuật chuyền của bóng rổ. Hai kiểu chest và bounce là nền tảng phối hợp <i>tấn công – phòng thủ</i>.',
      ],
      [
        'Đúng — vì hai kiểu chuyền cơ bản là chest pass và bounce pass. Lựa chọn <b>Chuyền trước ngực (chest pass), chuyền đập đất (bounce)</b> là phương án chuẩn.',
        'Sai — vì đáp án đúng là <b>Chuyền trước ngực (chest pass), chuyền đập đất (bounce)</b>. Đá bóng là của bóng đá.',
        'Sai — vì đáp án đúng là <b>Chuyền trước ngực (chest pass), chuyền đập đất (bounce)</b>. Đập đầu không phải kỹ thuật chuyền bóng rổ.',
        'Sai — vì đáp án đúng là <b>Chuyền trước ngực (chest pass), chuyền đập đất (bounce)</b>. Đẩy vai không phải kỹ thuật chuyền chuẩn.',
      ]),
    Q('Trận bóng rổ tiêu chuẩn FIBA có bao nhiêu người mỗi đội trên sân?', ['5', '7', '11', '6'], 0, 'Bóng rổ 5 người mỗi đội trên sân (12 trong danh sách).',
      [
        'Theo luật <b>FIBA</b>, mỗi đội bóng rổ có <code>5 cầu thủ trên sân</code> tại một thời điểm (danh sách thi đấu có thể tới 12 người, còn lại là dự bị).<ul><li>5 người gồm các vị trí: hậu vệ, tiền phong, trung phong.</li><li>Thay người không giới hạn số lần.</li></ul>',
        'Các con số 6, 7, 11 là số người của các môn khác (bóng chuyền 6, bóng đá 11…). Bóng rổ luôn là <i>5 người mỗi đội trên sân</i>.',
      ],
      [
        'Đúng — vì bóng rổ có 5 người mỗi đội trên sân (12 trong danh sách). Lựa chọn <b>5</b> là phương án chuẩn.',
        'Sai — vì đáp án đúng là <b>5</b>. 7 không phải số người bóng rổ trên sân.',
        'Sai — vì đáp án đúng là <b>5</b>. 11 là số cầu thủ bóng đá.',
        'Sai — vì đáp án đúng là <b>5</b>. 6 là số người bóng chuyền.',
      ]),
  ]),

  M(9, 'Bóng chuyền — kỹ thuật chuyền bóng cao', [
    Q('Kỹ thuật "chuyền bóng cao tay" trong bóng chuyền dùng phần nào của tay?', ['Các đầu ngón tay, đặt như "rọ" trước trán', 'Cả tay nắm', 'Mu bàn tay đập', 'Lòng bàn tay đập'], 0, 'Chuyền cao tay: dùng đầu ngón tay tạo "rọ" trên trán đẩy bóng đi.',
      [
        '<b>Chuyền bóng cao tay</b> dùng <code>các đầu ngón tay</code> của hai bàn tay xoè ra tạo hình như cái "rọ" trước trán để đỡ và đẩy bóng đi.<ul><li>Tiếp xúc bóng bằng đầu ngón, không phải cả lòng bàn tay.</li><li>Dùng lực cổ tay + ngón + chân để đẩy bóng đi chính xác.</li></ul>',
        'Đây là kỹ thuật chuyền chính xác, thường dùng để <i>chuyền hai (nâng bóng)</i> cho đồng đội đập. Nắm cả tay hay đập bằng mu/lòng bàn tay đều sai kỹ thuật chuyền cao tay.',
      ],
      [
        'Đúng — vì chuyền cao tay dùng đầu ngón tay tạo "rọ" trên trán đẩy bóng đi. Lựa chọn <b>Các đầu ngón tay, đặt như "rọ" trước trán</b> là phương án chuẩn.',
        'Sai — vì đáp án đúng là <b>Các đầu ngón tay, đặt như "rọ" trước trán</b>. Nắm cả tay không thể chuyền cao tay.',
        'Sai — vì đáp án đúng là <b>Các đầu ngón tay, đặt như "rọ" trước trán</b>. Đập bằng mu bàn tay là động tác tấn công, không phải chuyền cao tay.',
        'Sai — vì đáp án đúng là <b>Các đầu ngón tay, đặt như "rọ" trước trán</b>. Lòng bàn tay đập không phải kỹ thuật chuyền cao tay.',
      ]),
    Q('Kỹ thuật "đệm bóng" (chuyền thấp tay) dùng phần nào?', ['Mặt cẳng tay (cẳng tay khép sát)', 'Lưng bàn tay', 'Khuỷu tay', 'Đầu ngón tay'], 0, 'Đệm bóng: hai cẳng tay khép, mặt cẳng tay đỡ bóng nảy lên.',
      [
        '<b>Đệm bóng (chuyền thấp tay)</b> dùng <code>mặt trên hai cẳng tay khép sát nhau</code> tạo thành một mặt phẳng để đỡ bóng nảy lên.<ul><li>Hai tay duỗi thẳng, khép sát, bàn tay nắm lại.</li><li>Dùng lực nhún chân và nâng tay, không vung mạnh.</li></ul>',
        'Đệm bóng thường dùng để <i>đỡ phát bóng hoặc đỡ cú đập</i> của đối phương — những đường bóng thấp và mạnh. Dùng lưng bàn tay, khuỷu tay hay đầu ngón đều sai kỹ thuật này.',
      ],
      [
        'Đúng — vì đệm bóng dùng hai cẳng tay khép, mặt cẳng tay đỡ bóng nảy lên. Lựa chọn <b>Mặt cẳng tay (cẳng tay khép sát)</b> là phương án chuẩn.',
        'Sai — vì đáp án đúng là <b>Mặt cẳng tay (cẳng tay khép sát)</b>. Lưng bàn tay không phải bộ phận đệm bóng.',
        'Sai — vì đáp án đúng là <b>Mặt cẳng tay (cẳng tay khép sát)</b>. Khuỷu tay không tạo được mặt phẳng đỡ bóng.',
        'Sai — vì đáp án đúng là <b>Mặt cẳng tay (cẳng tay khép sát)</b>. Đầu ngón tay là của chuyền cao tay, không phải đệm bóng.',
      ]),
    Q('Một đội bóng chuyền trên sân có bao nhiêu người?', ['7', '11', '5', '6'], 3, 'Bóng chuyền tiêu chuẩn: 6 người mỗi đội trên sân.',
      [
        'Bóng chuyền tiêu chuẩn có <b>6 cầu thủ mỗi đội</b> trên sân, sắp xếp thành <code>2 hàng</code> (3 trên lưới, 3 dưới).<ul><li>Các vị trí xoay vòng theo chiều kim đồng hồ khi giành quyền giao bóng.</li><li>Đội còn có cầu thủ dự bị (gồm libero chuyên phòng thủ).</li></ul>',
        'Con số 5 là bóng rổ, 7 là bóng ném, 11 là bóng đá. Bóng chuyền luôn là <i>6 người mỗi đội trên sân</i>.',
      ],
      [
        'Sai — vì đáp án đúng là <b>6</b>. 7 là số người của bóng ném.',
        'Sai — vì đáp án đúng là <b>6</b>. 11 là số cầu thủ bóng đá.',
        'Sai — vì đáp án đúng là <b>6</b>. 5 là số người bóng rổ.',
        'Đúng — vì bóng chuyền tiêu chuẩn có 6 người mỗi đội trên sân. Lựa chọn <b>6</b> là phương án chuẩn.',
      ]),
    Q('Mỗi đội được chạm bóng tối đa mấy lần trước khi đưa qua lưới?', ['1 lần', '3 lần', '7 lần', '5 lần'], 1, 'Tối đa 3 lần chạm (chắn không tính); thường: đỡ - chuyền - đập.',
      [
        'Luật bóng chuyền cho phép mỗi đội chạm bóng <code>tối đa 3 lần</code> trước khi đưa bóng qua lưới sang sân đối phương.<ul><li>Trình tự phổ biến: <b>đỡ → chuyền (nâng) → đập</b>.</li><li>Một người không được chạm bóng 2 lần liên tiếp.</li><li>Động tác chắn (block) không tính vào 3 lần.</li></ul>',
        'Chạm quá 3 lần là lỗi, mất điểm. Hiểu luật 3 lần chạm giúp đội <i>phối hợp tấn công</i> hiệu quả: đỡ chắc, nâng đẹp, đập mạnh.',
      ],
      [
        'Sai — vì đáp án đúng là <b>3 lần</b>. 1 lần thì không đủ để phối hợp đỡ – nâng – đập.',
        'Đúng — vì tối đa 3 lần chạm (chắn không tính), thường là đỡ - chuyền - đập. Lựa chọn <b>3 lần</b> là phương án chuẩn.',
        'Sai — vì đáp án đúng là <b>3 lần</b>. Chạm 7 lần là vượt xa luật cho phép.',
        'Sai — vì đáp án đúng là <b>3 lần</b>. Chạm 5 lần đã là lỗi quá số lần.',
      ]),
    Q('Tư thế chuẩn bị bóng chuyền là?', ['Khoanh tay', 'Ngồi xổm', 'Hai chân rộng bằng vai, gối khuỵu, trọng tâm thấp, tay hờ trước', 'Đứng thẳng cứng'], 2, 'Tư thế thấp giúp di chuyển nhanh và đỡ bóng dễ.',
      [
        '<b>Tư thế chuẩn bị</b> trong bóng chuyền: <code>hai chân rộng bằng vai, gối khuỵu, hạ thấp trọng tâm, hai tay hờ phía trước</code>.<ul><li>Trọng tâm thấp → bật, di chuyển mọi hướng nhanh.</li><li>Tay sẵn sàng đỡ bóng bất ngờ.</li></ul>',
        'Đứng thẳng cứng hay khoanh tay thì phản ứng chậm; ngồi xổm thì không di chuyển được. <i>Tư thế thấp, linh hoạt</i> là nền tảng để đỡ và xử lý bóng tốt.',
      ],
      [
        'Sai — vì đáp án đúng là <b>Hai chân rộng bằng vai, gối khuỵu, trọng tâm thấp, tay hờ trước</b>. Khoanh tay không thể đỡ bóng kịp.',
        'Sai — vì đáp án đúng là <b>Hai chân rộng bằng vai, gối khuỵu, trọng tâm thấp, tay hờ trước</b>. Ngồi xổm thì không di chuyển được.',
        'Đúng — vì tư thế thấp giúp di chuyển nhanh và đỡ bóng dễ. Lựa chọn <b>Hai chân rộng bằng vai, gối khuỵu, trọng tâm thấp, tay hờ trước</b> là phương án chuẩn.',
        'Sai — vì đáp án đúng là <b>Hai chân rộng bằng vai, gối khuỵu, trọng tâm thấp, tay hờ trước</b>. Đứng thẳng cứng phản ứng rất chậm.',
      ]),
  ]),

  M(10, 'Cầu lông — kỹ thuật phát cầu thấp tay', [
    Q('Kỹ thuật phát cầu thấp tay (low serve) thường dùng trong?', ['Không dùng', 'Phát cầu cao', 'Chỉ tập', 'Đánh đôi và đánh đơn để khống chế'], 3, 'Phát cầu thấp tay phổ biến ở đánh đôi để buộc đối thủ đỡ thấp.',
      [
        '<b>Phát cầu thấp tay (low serve)</b> đánh cầu bay sát lưới, rơi gần vạch phát cầu của đối thủ. Kỹ thuật này dùng cả trong <code>đánh đôi và đánh đơn</code> để khống chế đối thủ.<ul><li>Buộc đối thủ đỡ cầu ở vị trí thấp, khó tấn công.</li><li>Hạn chế cơ hội đối thủ đập cầu ngay.</li></ul>',
        'Phát thấp tay đặc biệt phổ biến trong <i>đánh đôi</i> vì giúp giành thế chủ động ngay từ pha phát cầu. Đây là kỹ thuật cơ bản và rất quan trọng.',
      ],
      [
        'Sai — vì đáp án đúng là <b>Đánh đôi và đánh đơn để khống chế</b>. Phát cầu thấp tay được dùng thực tế trong thi đấu.',
        'Sai — vì đáp án đúng là <b>Đánh đôi và đánh đơn để khống chế</b>. Phát cầu cao là kỹ thuật khác, không phải thấp tay.',
        'Sai — vì đáp án đúng là <b>Đánh đôi và đánh đơn để khống chế</b>. Đây là kỹ thuật thi đấu thật, không chỉ để tập.',
        'Đúng — vì phát cầu thấp tay phổ biến để buộc đối thủ đỡ thấp, dùng cả đôi và đơn. Lựa chọn <b>Đánh đôi và đánh đơn để khống chế</b> là phương án chuẩn.',
      ]),
    Q('Trong đánh đôi cầu lông, vị trí phát cầu là?', ['Ngoài sân', 'Bất kỳ chỗ nào', 'Trên lưới', 'Trong ô phát cầu, không chạm vạch'], 3, 'Phát cầu phải đứng trong ô phát cầu hợp lệ, không chạm/giẫm vạch.',
      [
        'Khi phát cầu, người phát phải đứng <b>trong ô phát cầu hợp lệ</b> và <code>không được chạm/giẫm lên vạch</code>.<ul><li>Hai chân chạm sàn, không di chuyển khi phát.</li><li>Phát chéo sang ô đối diện của đối thủ.</li></ul>',
        'Đứng ngoài sân, trên lưới hay tuỳ tiện "bất kỳ chỗ nào" đều phạm luật phát cầu. Tuân thủ vị trí ô phát giúp pha giao cầu <i>hợp lệ</i>, không bị mất điểm oan.',
      ],
      [
        'Sai — vì đáp án đúng là <b>Trong ô phát cầu, không chạm vạch</b>. Đứng ngoài sân là phạm luật phát cầu.',
        'Sai — vì đáp án đúng là <b>Trong ô phát cầu, không chạm vạch</b>. Không được phát ở bất kỳ chỗ nào.',
        'Sai — vì đáp án đúng là <b>Trong ô phát cầu, không chạm vạch</b>. Không thể phát cầu trên lưới.',
        'Đúng — vì phát cầu phải đứng trong ô phát cầu hợp lệ, không chạm/giẫm vạch. Lựa chọn <b>Trong ô phát cầu, không chạm vạch</b> là phương án chuẩn.',
      ]),
    Q('Cầu chạm lưới khi phát cầu nhưng vẫn rơi đúng ô thì?', ['Đối thủ thắng', 'Phát lại', 'Hợp lệ — tiếp tục chơi', 'Mất điểm'], 2, 'Luật BWF hiện đại: cầu chạm lưới khi phát vẫn hợp lệ nếu rơi đúng ô.',
      [
        'Theo luật <b>BWF hiện đại</b>, nếu khi phát cầu mà <code>cầu chạm mép lưới nhưng vẫn bay qua và rơi đúng ô</code> thì pha phát đó <b>hợp lệ — tiếp tục chơi</b>.<ul><li>Không có khái niệm "phát lại" do chạm lưới như trước đây.</li><li>Chỉ cần cầu qua lưới và rơi đúng vùng quy định.</li></ul>',
        'Đây là điểm luật được cập nhật nhằm làm trận đấu liền mạch hơn. Hiểu đúng để không nhầm tưởng phải "phát lại" hay "mất điểm" khi cầu chạm lưới.',
      ],
      [
        'Sai — vì đáp án đúng là <b>Hợp lệ — tiếp tục chơi</b>. Cầu vẫn qua lưới và rơi đúng ô thì không có chuyện đối thủ thắng.',
        'Sai — vì đáp án đúng là <b>Hợp lệ — tiếp tục chơi</b>. Luật BWF hiện đại không yêu cầu phát lại khi chạm lưới.',
        'Đúng — vì luật BWF hiện đại quy định cầu chạm lưới khi phát vẫn hợp lệ nếu rơi đúng ô. Lựa chọn <b>Hợp lệ — tiếp tục chơi</b> là phương án chuẩn.',
        'Sai — vì đáp án đúng là <b>Hợp lệ — tiếp tục chơi</b>. Cầu rơi đúng ô thì không mất điểm.',
      ]),
    Q('Vợt cầu lông cầm như thế nào để vung linh hoạt?', ['Cầm chặt cứng', 'Cầm bằng hai tay', 'Cầm vợt "bắt tay" (V của ngón cái-trỏ thẳng với cạnh vợt)', 'Cầm gần đầu vợt'], 2, 'Kiểu cầm "bắt tay" (handshake grip) là cơ bản, linh hoạt nhất.',
      [
        'Cách cầm vợt cơ bản nhất là kiểu <b>"bắt tay" (handshake grip)</b>: cầm cán vợt như đang bắt tay, sao cho <code>chữ V tạo bởi ngón cái và ngón trỏ thẳng hàng với cạnh vợt</code>.<ul><li>Cầm thoải mái, không gồng cứng.</li><li>Cho phép xoay cổ tay vung vợt linh hoạt mọi hướng.</li></ul>',
        'Cầm chặt cứng làm cổ tay kém linh hoạt; cầm hai tay hay cầm gần đầu vợt đều sai. Kiểu <i>bắt tay</i> là nền tảng để học mọi cú đánh thuận và trái tay.',
      ],
      [
        'Sai — vì đáp án đúng là <b>Cầm vợt "bắt tay" (V của ngón cái-trỏ thẳng với cạnh vợt)</b>. Cầm chặt cứng làm cổ tay kém linh hoạt.',
        'Sai — vì đáp án đúng là <b>Cầm vợt "bắt tay" (V của ngón cái-trỏ thẳng với cạnh vợt)</b>. Cầu lông cầm vợt bằng một tay.',
        'Đúng — vì kiểu cầm "bắt tay" (handshake grip) là cơ bản và linh hoạt nhất. Lựa chọn <b>Cầm vợt "bắt tay" (V của ngón cái-trỏ thẳng với cạnh vợt)</b> là phương án chuẩn.',
        'Sai — vì đáp án đúng là <b>Cầm vợt "bắt tay" (V của ngón cái-trỏ thẳng với cạnh vợt)</b>. Cầm gần đầu vợt làm mất lực và tầm với.',
      ]),
    Q('Trong đánh đôi cầu lông, mỗi đội có?', ['2 người', '4 người', '3 người', '1 người'], 0, 'Đôi: 2 người mỗi đội (tổng 4 trên sân).',
      [
        'Trong <b>đánh đôi cầu lông</b>, mỗi đội có <code>2 người</code>, nên cả sân có tổng cộng 4 người.<ul><li>Hai người phối hợp che sân (trên – dưới hoặc trái – phải).</li><li>Cần giao tiếp, gọi cầu để tránh va chạm.</li></ul>',
        'Đánh đơn thì mỗi bên 1 người. Phối hợp tốt giữa hai người là yếu tố quyết định trong đánh đôi — di chuyển ăn ý và hỗ trợ nhau.',
      ],
      [
        'Đúng — vì đánh đôi mỗi đội 2 người (tổng 4 trên sân). Lựa chọn <b>2 người</b> là phương án chuẩn.',
        'Sai — vì đáp án đúng là <b>2 người</b>. 4 người là tổng cả hai đội trên sân, không phải một đội.',
        'Sai — vì đáp án đúng là <b>2 người</b>. Cầu lông không có thể thức 3 người một đội.',
        'Sai — vì đáp án đúng là <b>2 người</b>. 1 người là đánh đơn, không phải đánh đôi.',
      ]),
  ]),

  M(11, 'Cầu lông — kỹ thuật đánh cao thuận tay', [
    Q('Đánh cao thuận tay (forehand clear) là?', ['Đánh cầu cao và sâu về cuối sân đối phương', 'Bỏ nhỏ', 'Đập cầu xuống', 'Phát cầu'], 0, 'Clear: đánh cầu bay cao, xa về cuối sân để đẩy đối phương lùi.',
      [
        '<b>Đánh cao thuận tay (forehand clear)</b> là cú đánh đưa cầu <code>bay cao và sâu về cuối sân đối phương</code>.<ul><li>Đẩy đối thủ lùi về cuối sân, lấy lại thế cân bằng.</li><li>Là cú đánh phòng thủ/khống chế cơ bản.</li></ul>',
        'Clear khác với bỏ nhỏ (cầu rơi sát lưới), đập cầu (cầu xuống nhanh) hay phát cầu. Đây là cú đánh nền tảng giúp em <i>tạo khoảng cách và thời gian</i> để trở về vị trí trung tâm.',
      ],
      [
        'Đúng — vì clear là đánh cầu bay cao, xa về cuối sân để đẩy đối phương lùi. Lựa chọn <b>Đánh cầu cao và sâu về cuối sân đối phương</b> là phương án chuẩn.',
        'Sai — vì đáp án đúng là <b>Đánh cầu cao và sâu về cuối sân đối phương</b>. Bỏ nhỏ là cầu rơi sát lưới, ngược với clear.',
        'Sai — vì đáp án đúng là <b>Đánh cầu cao và sâu về cuối sân đối phương</b>. Đập cầu là cầu đi nhanh xuống đất, khác clear.',
        'Sai — vì đáp án đúng là <b>Đánh cầu cao và sâu về cuối sân đối phương</b>. Phát cầu là cú giao cầu mở pha, không phải clear.',
      ]),
    Q('Khi đánh cao thuận tay, điểm tiếp xúc cầu nên ở?', ['Trên đầu, hơi trước người', 'Sau lưng', 'Dưới hông', 'Sát đất'], 0, 'Điểm chạm cầu trên đầu, hơi trước người giúp đánh xa và mạnh.',
      [
        'Khi đánh cao thuận tay, <b>điểm tiếp xúc cầu</b> tốt nhất là ở <code>trên đầu, hơi chếch về trước người</code>.<ul><li>Tay vươn cao hết cỡ, cổ tay gập đúng lúc.</li><li>Vị trí này cho lực mạnh nhất và đường cầu xa nhất.</li></ul>',
        'Nếu để cầu xuống thấp (dưới hông, sát đất) hay ra sau lưng mới đánh thì cầu sẽ <i>yếu, không thể đẩy về cuối sân</i>. Chọn đúng điểm chạm là then chốt của cú clear.',
      ],
      [
        'Đúng — vì điểm chạm cầu trên đầu, hơi trước người giúp đánh xa và mạnh. Lựa chọn <b>Trên đầu, hơi trước người</b> là phương án chuẩn.',
        'Sai — vì đáp án đúng là <b>Trên đầu, hơi trước người</b>. Để cầu ra sau lưng mới đánh thì cầu rất yếu.',
        'Sai — vì đáp án đúng là <b>Trên đầu, hơi trước người</b>. Đánh dưới hông không thể đẩy cầu về cuối sân.',
        'Sai — vì đáp án đúng là <b>Trên đầu, hơi trước người</b>. Đánh sát đất là cú đỡ thấp, không phải clear.',
      ]),
    Q('Cú "đập cầu" (smash) khác clear ở điểm gì?', ['Giống hệt nhau', 'Không có gì khác', 'Smash bay nhanh xuống đất; clear bay cao và xa', 'Smash chỉ bay ngang'], 2, 'Smash là cú đánh xuống mạnh, ăn điểm; clear là phòng thủ/đẩy đối thủ về sau.',
      [
        'Sự khác biệt cơ bản: <ul><li><b>Smash (đập cầu):</b> cầu bay <code>nhanh, mạnh, chúi xuống đất</code> sân đối phương — cú tấn công ăn điểm.</li><li><b>Clear:</b> cầu bay <code>cao và xa</code> về cuối sân — cú phòng thủ/khống chế.</li></ul>',
        'Cùng là cú đánh trên cao thuận tay nhưng mục đích trái ngược: smash để <i>dứt điểm</i>, clear để <i>tạo khoảng cách</i>. Smash không "bay ngang" mà cắm xuống đất.',
      ],
      [
        'Sai — vì đáp án đúng là <b>Smash bay nhanh xuống đất; clear bay cao và xa</b>. Hai cú này khác nhau rõ về mục đích và quỹ đạo.',
        'Sai — vì đáp án đúng là <b>Smash bay nhanh xuống đất; clear bay cao và xa</b>. Có sự khác biệt lớn giữa hai cú.',
        'Đúng — vì smash là cú đánh xuống mạnh ăn điểm, còn clear bay cao xa để phòng thủ. Lựa chọn <b>Smash bay nhanh xuống đất; clear bay cao và xa</b> là phương án chuẩn.',
        'Sai — vì đáp án đúng là <b>Smash bay nhanh xuống đất; clear bay cao và xa</b>. Smash cắm xuống đất chứ không bay ngang.',
      ]),
    Q('"Bỏ nhỏ" (drop shot) trong cầu lông là?', ['Đánh cầu nhẹ rơi sát lưới đối phương', 'Đập mạnh', 'Phát cầu', 'Đánh cao'], 0, 'Drop: đánh cầu nhẹ rơi sát lưới → khó đỡ vì đối thủ đứng xa.',
      [
        '<b>Bỏ nhỏ (drop shot)</b> là cú đánh nhẹ, khéo léo để cầu <code>rơi sát lưới bên phần sân đối phương</code>.<ul><li>Lực rất nhẹ, cầu vừa qua lưới là rơi xuống.</li><li>Hiệu quả khi đối thủ đang đứng ở cuối sân.</li></ul>',
        'Drop kết hợp với clear/smash tạo nên lối chơi <i>biến hoá xa – gần</i>, khiến đối thủ phải di chuyển nhiều và mất sức. Khác hẳn đập mạnh, đánh cao hay phát cầu.',
      ],
      [
        'Đúng — vì drop là đánh cầu nhẹ rơi sát lưới, khó đỡ vì đối thủ đứng xa. Lựa chọn <b>Đánh cầu nhẹ rơi sát lưới đối phương</b> là phương án chuẩn.',
        'Sai — vì đáp án đúng là <b>Đánh cầu nhẹ rơi sát lưới đối phương</b>. Đập mạnh là smash, ngược với bỏ nhỏ.',
        'Sai — vì đáp án đúng là <b>Đánh cầu nhẹ rơi sát lưới đối phương</b>. Phát cầu là cú giao cầu, không phải drop.',
        'Sai — vì đáp án đúng là <b>Đánh cầu nhẹ rơi sát lưới đối phương</b>. Đánh cao là clear, khác với bỏ nhỏ.',
      ]),
    Q('Lỗi thường gặp khi đánh forehand clear là?', ['Đánh sớm', 'Nhìn cầu', 'Đánh cầu khi đã đi qua khỏi đầu (muộn)', 'Cầm vợt đúng'], 2, 'Đánh muộn → cầu xuống thấp → không thể đẩy xa.',
      [
        'Lỗi phổ biến khi đánh forehand clear là <b>đánh muộn</b> — đợi cầu <code>đã đi qua khỏi đầu</code> mới vung vợt.<ul><li>Khi đó cầu đã xuống thấp, mất điểm chạm tối ưu.</li><li>Lực yếu, cầu không thể bay xa về cuối sân.</li></ul>',
        'Để sửa, cần <i>di chuyển nhanh đến điểm rơi và đánh sớm</i> khi cầu còn trên cao, hơi trước người. Nhìn cầu và cầm vợt đúng là điều tốt, không phải lỗi.',
      ],
      [
        'Sai — vì đáp án đúng là <b>Đánh cầu khi đã đi qua khỏi đầu (muộn)</b>. Đánh sớm đúng thời điểm không phải lỗi.',
        'Sai — vì đáp án đúng là <b>Đánh cầu khi đã đi qua khỏi đầu (muộn)</b>. Nhìn cầu là điều nên làm, không phải lỗi.',
        'Đúng — vì đánh muộn làm cầu xuống thấp, không thể đẩy xa. Lựa chọn <b>Đánh cầu khi đã đi qua khỏi đầu (muộn)</b> là phương án chuẩn.',
        'Sai — vì đáp án đúng là <b>Đánh cầu khi đã đi qua khỏi đầu (muộn)</b>. Cầm vợt đúng là kỹ thuật tốt, không phải lỗi.',
      ]),
  ]),

  M(12, 'Đá cầu — kỹ thuật tâng cầu cơ bản', [
    Q('Tâng cầu bằng má trong bàn chân là kỹ thuật?', ['Không tồn tại', 'Khó nhất', 'Chỉ dành cho VĐV', 'Cơ bản, dễ kiểm soát'], 3, 'Tâng má trong là kỹ thuật cơ bản đầu tiên, dễ kiểm soát hướng cầu.',
      [
        '<b>Tâng cầu bằng má trong bàn chân</b> là kỹ thuật <code>cơ bản và dễ kiểm soát nhất</code> trong đá cầu, thường được học đầu tiên.<ul><li>Diện má trong rộng, phẳng → dễ điều khiển hướng cầu.</li><li>Cầu nảy lên thẳng, ổn định.</li></ul>',
        'Vì là kỹ thuật nền tảng, ai cũng có thể tập được, không phải "khó nhất" hay "chỉ dành cho VĐV". Thành thạo tâng má trong là bước đệm để học các kỹ thuật nâng cao.',
      ],
      [
        'Sai — vì đáp án đúng là <b>Cơ bản, dễ kiểm soát</b>. Đây là kỹ thuật có thật và rất phổ biến.',
        'Sai — vì đáp án đúng là <b>Cơ bản, dễ kiểm soát</b>. Tâng má trong dễ chứ không phải khó nhất.',
        'Sai — vì đáp án đúng là <b>Cơ bản, dễ kiểm soát</b>. Ai cũng tập được, không chỉ dành cho VĐV.',
        'Đúng — vì tâng má trong là kỹ thuật cơ bản đầu tiên, dễ kiểm soát hướng cầu. Lựa chọn <b>Cơ bản, dễ kiểm soát</b> là phương án chuẩn.',
      ]),
    Q('Khi tâng cầu, mắt nên?', ['Nhìn xuống đất', 'Nhìn theo cầu', 'Nhắm mắt', 'Nhìn người khác'], 1, 'Luôn nhìn theo cầu để phản ứng đúng vị trí và lực.',
      [
        'Khi tâng cầu, mắt phải luôn <b>nhìn theo cầu</b> để xác định <code>vị trí, độ cao và tốc độ</code> của cầu, từ đó phản ứng kịp thời.<ul><li>Theo dõi cầu giúp đặt chân đúng điểm tiếp xúc.</li><li>Điều chỉnh lực tâng cho cầu nảy đều.</li></ul>',
        'Nhìn xuống đất, nhắm mắt hay nhìn người khác đều khiến em <i>mất dấu cầu</i> và lỡ nhịp. Tập trung mắt vào cầu là nguyên tắc đầu tiên của mọi môn dùng cầu/bóng.',
      ],
      [
        'Sai — vì đáp án đúng là <b>Nhìn theo cầu</b>. Nhìn xuống đất sẽ mất dấu cầu.',
        'Đúng — vì luôn nhìn theo cầu để phản ứng đúng vị trí và lực. Lựa chọn <b>Nhìn theo cầu</b> là phương án chuẩn.',
        'Sai — vì đáp án đúng là <b>Nhìn theo cầu</b>. Nhắm mắt thì không thể tâng cầu được.',
        'Sai — vì đáp án đúng là <b>Nhìn theo cầu</b>. Nhìn người khác làm lỡ nhịp tâng.',
      ]),
    Q('Khi đá cầu nhóm, mục tiêu chính là?', ['Đá cầu xa nhất', 'Phối hợp giữ cầu trên không lâu nhất', 'Đá cầu thật mạnh', 'Đẩy ngã bạn'], 1, 'Đá cầu nhóm/đồng đội: phối hợp giữ cầu lâu, hỗ trợ nhau.',
      [
        'Trong <b>đá cầu nhóm</b>, mục tiêu chính là <code>phối hợp giữ cầu trên không càng lâu càng tốt</code>, chuyền qua lại giữa các thành viên.<ul><li>Rèn sự ăn ý và tinh thần đồng đội.</li><li>Mỗi người chuyền vừa tầm để bạn dễ xử lý.</li></ul>',
        'Đá cầu nhóm không phải để đá xa nhất hay mạnh nhất, càng không phải "đẩy ngã bạn". Đây là hoạt động <i>hợp tác</i>, đề cao sự hỗ trợ lẫn nhau.',
      ],
      [
        'Sai — vì đáp án đúng là <b>Phối hợp giữ cầu trên không lâu nhất</b>. Đá xa nhất không phải mục tiêu của đá cầu nhóm.',
        'Đúng — vì đá cầu nhóm/đồng đội là phối hợp giữ cầu lâu, hỗ trợ nhau. Lựa chọn <b>Phối hợp giữ cầu trên không lâu nhất</b> là phương án chuẩn.',
        'Sai — vì đáp án đúng là <b>Phối hợp giữ cầu trên không lâu nhất</b>. Đá thật mạnh khiến bạn khó đỡ, mất phối hợp.',
        'Sai — vì đáp án đúng là <b>Phối hợp giữ cầu trên không lâu nhất</b>. Đẩy ngã bạn là hành vi sai, trái tinh thần đồng đội.',
      ]),
    Q('Tư thế đứng đá cầu chuẩn là?', ['Trọng tâm thấp, hai chân hơi rộng, gối khuỵu', 'Đứng thẳng cứng', 'Ngồi xổm', 'Một chân'], 0, 'Tư thế thấp giúp di chuyển và phản ứng nhanh.',
      [
        '<b>Tư thế đứng đá cầu chuẩn</b>: <code>trọng tâm thấp, hai chân hơi rộng, gối hơi khuỵu</code>, thân hơi đổ trước, sẵn sàng di chuyển.<ul><li>Trọng tâm thấp giúp phản ứng nhanh mọi hướng.</li><li>Dễ dồn trọng tâm sang chân tâng cầu.</li></ul>',
        'Đứng thẳng cứng phản ứng chậm; ngồi xổm hay đứng một chân thì mất thăng bằng, không di chuyển được. Tư thế <i>thấp, linh hoạt</i> là nền tảng chung của nhiều môn vận động.',
      ],
      [
        'Đúng — vì tư thế thấp giúp di chuyển và phản ứng nhanh. Lựa chọn <b>Trọng tâm thấp, hai chân hơi rộng, gối khuỵu</b> là phương án chuẩn.',
        'Sai — vì đáp án đúng là <b>Trọng tâm thấp, hai chân hơi rộng, gối khuỵu</b>. Đứng thẳng cứng phản ứng chậm.',
        'Sai — vì đáp án đúng là <b>Trọng tâm thấp, hai chân hơi rộng, gối khuỵu</b>. Ngồi xổm thì không di chuyển được.',
        'Sai — vì đáp án đúng là <b>Trọng tâm thấp, hai chân hơi rộng, gối khuỵu</b>. Đứng một chân mất thăng bằng.',
      ]),
    Q('Cầu (quả cầu đá) thường được làm từ?', ['Gỗ ép cứng bọc da', 'Thuỷ tinh', 'Đế cao su + chùm lông vũ/nhựa', 'Nhựa cứng'], 2, 'Cầu đá: đế cao su gắn chùm lông hoặc nhựa dẻo.',
      [
        '<b>Quả cầu đá</b> được cấu tạo gồm <code>đế cao su (hoặc nhựa dẻo) gắn với chùm lông vũ hoặc cánh nhựa</code> phía trên.<ul><li>Đế nặng giúp cầu rơi xuống ổn định.</li><li>Chùm lông/nhựa làm cầu bay chậm, dễ tâng và điều khiển.</li></ul>',
        'Cầu không làm từ gỗ cứng, thuỷ tinh hay nhựa cứng (sẽ nguy hiểm và khó chơi). Thiết kế đế mềm + cánh nhẹ là để cầu <i>vừa an toàn vừa dễ chơi</i>.',
      ],
      [
        'Sai — vì đáp án đúng là <b>Đế cao su + chùm lông vũ/nhựa</b>. Gỗ cứng bọc da không phải cấu tạo quả cầu đá.',
        'Sai — vì đáp án đúng là <b>Đế cao su + chùm lông vũ/nhựa</b>. Thuỷ tinh sẽ vỡ và rất nguy hiểm.',
        'Đúng — vì cầu đá có đế cao su gắn chùm lông hoặc nhựa dẻo. Lựa chọn <b>Đế cao su + chùm lông vũ/nhựa</b> là phương án chuẩn.',
        'Sai — vì đáp án đúng là <b>Đế cao su + chùm lông vũ/nhựa</b>. Nhựa cứng làm cầu khó tâng và dễ gây đau chân.',
      ]),
  ]),

  M(13, 'Đá cầu — phối hợp nhóm 3 người', [
    Q('Khi đá cầu 3 người, đội hình phổ biến là?', ['Ngẫu nhiên', 'Hàng dọc', 'Tam giác', 'Hàng ngang'], 2, 'Đội hình tam giác giúp chuyền cầu thuận lợi mọi hướng.',
      [
        'Khi đá cầu <b>3 người</b>, đội hình phổ biến và hiệu quả nhất là <code>hình tam giác</code>.<ul><li>Mỗi người ở một đỉnh, khoảng cách đều nhau.</li><li>Cho phép chuyền cầu thuận lợi sang hai bạn còn lại theo mọi hướng.</li></ul>',
        'So với hàng dọc hay hàng ngang (chỉ chuyền được một chiều), tam giác giúp <i>phân bố vị trí hợp lý</i> và giữ cầu lâu hơn nhờ nhiều phương án chuyền.',
      ],
      [
        'Sai — vì đáp án đúng là <b>Tam giác</b>. Đứng ngẫu nhiên thì khó phối hợp chuyền cầu.',
        'Sai — vì đáp án đúng là <b>Tam giác</b>. Hàng dọc chỉ chuyền được một chiều.',
        'Đúng — vì đội hình tam giác giúp chuyền cầu thuận lợi mọi hướng. Lựa chọn <b>Tam giác</b> là phương án chuẩn.',
        'Sai — vì đáp án đúng là <b>Tam giác</b>. Hàng ngang hạn chế hướng chuyền cầu.',
      ]),
    Q('Để chuyền cầu cho bạn trong nhóm, cần?', ['Đá thật mạnh', 'Đá vào mặt bạn', 'Đá nhẹ, đúng hướng, vừa tầm bạn', 'Đá ra xa'], 2, 'Chuyền chuẩn: lực vừa, hướng đúng, độ cao vừa tầm cho bạn xử lý.',
      [
        'Một đường <b>chuyền cầu tốt</b> cho đồng đội cần đảm bảo: <code>lực vừa phải, đúng hướng và độ cao vừa tầm</code> để bạn dễ đỡ và xử lý.<ul><li>Lực quá mạnh → bạn không kịp đỡ.</li><li>Hướng lệch → bạn phải di chuyển nhiều, mất cầu.</li></ul>',
        'Chuyền cầu là hành động <i>vì đồng đội</i>: đặt cầu vào nơi bạn thoải mái nhất. Đá mạnh, đá vào mặt bạn hay đá ra xa đều sai mục đích phối hợp.',
      ],
      [
        'Sai — vì đáp án đúng là <b>Đá nhẹ, đúng hướng, vừa tầm bạn</b>. Đá thật mạnh khiến bạn không kịp đỡ.',
        'Sai — vì đáp án đúng là <b>Đá nhẹ, đúng hướng, vừa tầm bạn</b>. Đá vào mặt bạn là nguy hiểm và sai mục đích.',
        'Đúng — vì chuyền chuẩn là lực vừa, hướng đúng, độ cao vừa tầm cho bạn xử lý. Lựa chọn <b>Đá nhẹ, đúng hướng, vừa tầm bạn</b> là phương án chuẩn.',
        'Sai — vì đáp án đúng là <b>Đá nhẹ, đúng hướng, vừa tầm bạn</b>. Đá ra xa khiến bạn không với tới cầu.',
      ]),
    Q('Khi bạn lỡ cầu, em nên?', ['Khuyến khích, không trách móc', 'Tức giận', 'Bỏ chơi', 'Chế giễu'], 0, 'Tinh thần đồng đội: động viên nhau khi mắc lỗi.',
      [
        'Khi bạn cùng nhóm lỡ cầu, hành xử đúng là <b>khuyến khích, động viên, không trách móc</b>.<ul><li>Ai cũng có lúc mắc lỗi, nhất là khi mới tập.</li><li>Lời động viên giúp bạn tự tin chơi tốt hơn.</li></ul>',
        'Tức giận, chế giễu hay bỏ chơi đều làm <i>không khí căng thẳng</i> và phá vỡ tinh thần đồng đội. Thể thao học đường đề cao sự sẻ chia và khích lệ lẫn nhau.',
      ],
      [
        'Đúng — vì tinh thần đồng đội là động viên nhau khi mắc lỗi. Lựa chọn <b>Khuyến khích, không trách móc</b> là phương án chuẩn.',
        'Sai — vì đáp án đúng là <b>Khuyến khích, không trách móc</b>. Tức giận làm bạn mất tự tin và phá không khí.',
        'Sai — vì đáp án đúng là <b>Khuyến khích, không trách móc</b>. Bỏ chơi là thiếu tinh thần đồng đội.',
        'Sai — vì đáp án đúng là <b>Khuyến khích, không trách móc</b>. Chế giễu bạn là hành vi không đẹp.',
      ]),
    Q('"Chuyền cầu chéo" giữa các thành viên có lợi ích gì?', ['Làm rối', 'Giúp giữ cầu lâu trên không một chỗ', 'Đánh lừa đối phương trong thi đấu, tạo nhịp', 'Giảm tốc'], 2, 'Chuyền chéo tạo bất ngờ và đa dạng phối hợp.',
      [
        '<b>Chuyền cầu chéo</b> giữa các thành viên giúp <code>đánh lừa đối phương trong thi đấu và tạo nhịp phối hợp</code>.<ul><li>Đối phương khó đoán hướng cầu sẽ tới ai.</li><li>Tạo sự đa dạng, bất ngờ trong tấn công.</li></ul>',
        'Chuyền chéo không phải để "làm rối" hay "giảm tốc" mà là <i>chiến thuật phối hợp thông minh</i>, làm đối thủ bị động và mở ra cơ hội ghi điểm.',
      ],
      [
        'Sai — vì đáp án đúng là <b>Đánh lừa đối phương trong thi đấu, tạo nhịp</b>. Chuyền chéo là chiến thuật, không phải làm rối.',
        'Sai — vì đáp án đúng là <b>Đánh lừa đối phương trong thi đấu, tạo nhịp</b>. Chuyền chéo tạo bất ngờ chứ không phải giữ cầu một chỗ.',
        'Đúng — vì chuyền chéo tạo bất ngờ và đa dạng phối hợp, đánh lừa đối phương. Lựa chọn <b>Đánh lừa đối phương trong thi đấu, tạo nhịp</b> là phương án chuẩn.',
        'Sai — vì đáp án đúng là <b>Đánh lừa đối phương trong thi đấu, tạo nhịp</b>. Mục đích là tạo bất ngờ, không phải giảm tốc.',
      ]),
    Q('Trong tập đá cầu nhóm, ai chịu trách nhiệm khi cầu rơi giữa hai người?', ['Người lớn tuổi hơn', 'Cả hai cùng có trách nhiệm; cần giao tiếp gọi cầu', 'Không ai', 'Người gần hơn'], 1, 'Phối hợp nhóm: cần "gọi cầu" (la to "tôi") để tránh va chạm và rơi cầu.',
      [
        'Khi cầu rơi vào khoảng giữa hai người, <b>cả hai cùng có trách nhiệm</b>. Cách giải quyết là <code>"gọi cầu"</code> — người định đỡ la to "tôi" để bạn nhường.<ul><li>Tránh tình huống cả hai cùng lao vào → va chạm.</li><li>Hoặc cả hai cùng nhường → cầu rơi.</li></ul>',
        'Giao tiếp gọi cầu là kỹ năng phối hợp quan trọng trong mọi môn đồng đội. Không đổ lỗi cho "người gần hơn" hay "người lớn tuổi" — đây là <i>trách nhiệm chung</i>.',
      ],
      [
        'Sai — vì đáp án đúng là <b>Cả hai cùng có trách nhiệm; cần giao tiếp gọi cầu</b>. Tuổi tác không quyết định trách nhiệm đỡ cầu.',
        'Đúng — vì cần "gọi cầu" để tránh va chạm và rơi cầu, đây là trách nhiệm chung. Lựa chọn <b>Cả hai cùng có trách nhiệm; cần giao tiếp gọi cầu</b> là phương án chuẩn.',
        'Sai — vì đáp án đúng là <b>Cả hai cùng có trách nhiệm; cần giao tiếp gọi cầu</b>. Không thể đổ "không ai" chịu trách nhiệm.',
        'Sai — vì đáp án đúng là <b>Cả hai cùng có trách nhiệm; cần giao tiếp gọi cầu</b>. Không chỉ người gần hơn mà cả hai phải giao tiếp.',
      ]),
  ]),

  M(14, 'Thể dục liên hoàn — bài tay không', [
    Q('"Thể dục liên hoàn" là gì?', ['Trò chơi', 'Khởi động đơn', 'Chuỗi các động tác nối tiếp thành bài hoàn chỉnh', 'Một động tác lặp lại'], 2, 'Thể dục liên hoàn: chuỗi 8-32 động tác liền mạch (vd: 8 nhịp × N động tác).',
      [
        '<b>Thể dục liên hoàn</b> là một <code>chuỗi nhiều động tác nối tiếp nhau liền mạch</code> thành một bài hoàn chỉnh (thường tính theo nhịp, ví dụ <i>8 nhịp × N động tác</i>).<ul><li>Các động tác chuyển tiếp mượt mà, không ngắt quãng.</li><li>Có nhịp điệu, tính thẩm mỹ cao.</li></ul>',
        'Đây không phải một động tác lặp lại đơn lẻ hay chỉ là khởi động. Bài liên hoàn rèn <i>thể lực toàn diện, phối hợp và trí nhớ vận động</i> (nhớ thứ tự động tác).',
      ],
      [
        'Sai — vì đáp án đúng là <b>Chuỗi các động tác nối tiếp thành bài hoàn chỉnh</b>. Thể dục liên hoàn là bài tập, không phải trò chơi.',
        'Sai — vì đáp án đúng là <b>Chuỗi các động tác nối tiếp thành bài hoàn chỉnh</b>. Nó là cả một bài hoàn chỉnh, không chỉ là khởi động.',
        'Đúng — vì thể dục liên hoàn là chuỗi nhiều động tác nối tiếp liền mạch thành bài hoàn chỉnh. Lựa chọn <b>Chuỗi các động tác nối tiếp thành bài hoàn chỉnh</b> là phương án chuẩn.',
        'Sai — vì đáp án đúng là <b>Chuỗi các động tác nối tiếp thành bài hoàn chỉnh</b>. Không phải một động tác lặp đi lặp lại.',
      ]),
    Q('Bài thể dục tay không thường gồm các nhóm động tác nào?', ['Chỉ chân', 'Tay, vặn mình, chân, lưng-bụng, toàn thân, nhảy', 'Chỉ tay', 'Không có cấu trúc'], 1, 'Cấu trúc chuẩn: tay → ngực-vai → chân → vặn mình → lưng bụng → toàn thân → nhảy → điều hoà.',
      [
        'Một <b>bài thể dục tay không</b> chuẩn gồm nhiều nhóm động tác tác động lần lượt các bộ phận cơ thể:<ul><li>Động tác <code>tay – ngực – vai</code>.</li><li>Động tác <code>vặn mình</code>.</li><li>Động tác <code>chân, lưng – bụng</code>.</li><li>Động tác <code>toàn thân, nhảy</code> và kết thúc bằng điều hoà.</li></ul>',
        'Cấu trúc này giúp <i>phát triển toàn diện</i> các nhóm cơ theo trình tự hợp lý — từ trên xuống dưới, từ nhẹ đến mạnh. Bài luôn có cấu trúc rõ ràng, không phải "không có cấu trúc".',
      ],
      [
        'Sai — vì đáp án đúng là <b>Tay, vặn mình, chân, lưng-bụng, toàn thân, nhảy</b>. Bài tập tác động toàn thân, không chỉ chân.',
        'Đúng — vì cấu trúc chuẩn gồm tay → ngực-vai → chân → vặn mình → lưng bụng → toàn thân → nhảy → điều hoà. Lựa chọn <b>Tay, vặn mình, chân, lưng-bụng, toàn thân, nhảy</b> là phương án chuẩn.',
        'Sai — vì đáp án đúng là <b>Tay, vặn mình, chân, lưng-bụng, toàn thân, nhảy</b>. Bài không chỉ tập riêng tay.',
        'Sai — vì đáp án đúng là <b>Tay, vặn mình, chân, lưng-bụng, toàn thân, nhảy</b>. Bài luôn có cấu trúc rõ ràng theo nhóm cơ.',
      ]),
    Q('Khi tập thể dục liên hoàn theo nhịp, điều quan trọng nhất là?', ['Bỏ qua nhịp', 'Mỗi người tự do', 'Đúng nhịp, đúng động tác, đồng đều cả nhóm', 'Càng nhanh càng tốt'], 2, 'Liên hoàn nhóm: đồng đều và đúng nhịp tạo tính thẩm mỹ và sức khoẻ.',
      [
        'Khi tập liên hoàn theo nhịp (nhất là tập nhóm), điều quan trọng nhất là <code>đúng nhịp, đúng động tác và đồng đều cả nhóm</code>.<ul><li>Cả nhóm chuyển động cùng lúc → đẹp mắt, có tính thẩm mỹ.</li><li>Đúng nhịp giúp bài tập có hiệu quả rèn luyện.</li></ul>',
        'Bỏ qua nhịp, mỗi người tự do hay "càng nhanh càng tốt" đều làm bài <i>lộn xộn, mất đồng bộ</i>. Tính đồng đều là linh hồn của thể dục liên hoàn nhóm/đồng diễn.',
      ],
      [
        'Sai — vì đáp án đúng là <b>Đúng nhịp, đúng động tác, đồng đều cả nhóm</b>. Bỏ qua nhịp làm bài mất đồng bộ.',
        'Sai — vì đáp án đúng là <b>Đúng nhịp, đúng động tác, đồng đều cả nhóm</b>. Mỗi người tự do làm bài lộn xộn.',
        'Đúng — vì liên hoàn nhóm cần đồng đều và đúng nhịp để tạo thẩm mỹ và hiệu quả. Lựa chọn <b>Đúng nhịp, đúng động tác, đồng đều cả nhóm</b> là phương án chuẩn.',
        'Sai — vì đáp án đúng là <b>Đúng nhịp, đúng động tác, đồng đều cả nhóm</b>. Càng nhanh càng dễ sai và mất đồng bộ.',
      ]),
    Q('Lợi ích của thể dục liên hoàn là?', ['Phát triển toàn diện, rèn nhịp điệu, ý thức tập thể', 'Chỉ rèn tay', 'Chỉ làm mệt', 'Chỉ phát triển cơ tay và cơ vai'], 0, 'Thể dục liên hoàn rèn cả thể chất, phối hợp và kỷ luật tập thể.',
      [
        '<b>Thể dục liên hoàn</b> mang lại lợi ích toàn diện:<ul><li>Phát triển <code>thể chất toàn diện</code> các nhóm cơ.</li><li>Rèn <code>nhịp điệu</code> và khả năng phối hợp.</li><li>Bồi dưỡng <code>ý thức tập thể, tính kỷ luật</code> khi tập đồng đều.</li></ul>',
        'Vì bài gồm nhiều nhóm động tác toàn thân nên không chỉ "rèn tay" hay "cơ vai". Đây là hình thức tập <i>vừa khoẻ người vừa rèn tinh thần kỷ luật</i>.',
      ],
      [
        'Đúng — vì thể dục liên hoàn rèn cả thể chất, phối hợp và kỷ luật tập thể. Lựa chọn <b>Phát triển toàn diện, rèn nhịp điệu, ý thức tập thể</b> là phương án chuẩn.',
        'Sai — vì đáp án đúng là <b>Phát triển toàn diện, rèn nhịp điệu, ý thức tập thể</b>. Bài tác động toàn thân, không chỉ tay.',
        'Sai — vì đáp án đúng là <b>Phát triển toàn diện, rèn nhịp điệu, ý thức tập thể</b>. Mệt là tạm thời, lợi ích thì toàn diện.',
        'Sai — vì đáp án đúng là <b>Phát triển toàn diện, rèn nhịp điệu, ý thức tập thể</b>. Không chỉ cơ tay và cơ vai.',
      ]),
    Q('Khi quên động tác giữa bài liên hoàn, nên?', ['Cố giữ nhịp, làm theo bạn, vào lại càng sớm càng tốt', 'Dừng hẳn', 'Bỏ chạy', 'Cười lớn'], 0, 'Giữ nhịp + nhìn bạn → vào lại nhanh để bài không bị "vỡ".',
      [
        'Nếu lỡ <b>quên động tác giữa bài</b>, cách xử lý đúng là <code>cố giữ nhịp, nhìn theo bạn bên cạnh và vào lại càng sớm càng tốt</code>.<ul><li>Giữ nhịp giúp bài không bị "vỡ" đội hình.</li><li>Nhìn bạn để nhớ lại động tác tiếp theo.</li></ul>',
        'Dừng hẳn, bỏ chạy hay cười lớn sẽ làm <i>cả nhóm rối loạn</i> và mất tính thẩm mỹ. Bình tĩnh hoà nhịp trở lại là kỹ năng quan trọng khi tập đồng diễn.',
      ],
      [
        'Đúng — vì giữ nhịp và nhìn bạn giúp vào lại nhanh để bài không bị "vỡ". Lựa chọn <b>Cố giữ nhịp, làm theo bạn, vào lại càng sớm càng tốt</b> là phương án chuẩn.',
        'Sai — vì đáp án đúng là <b>Cố giữ nhịp, làm theo bạn, vào lại càng sớm càng tốt</b>. Dừng hẳn làm vỡ đội hình.',
        'Sai — vì đáp án đúng là <b>Cố giữ nhịp, làm theo bạn, vào lại càng sớm càng tốt</b>. Bỏ chạy làm cả nhóm rối loạn.',
        'Sai — vì đáp án đúng là <b>Cố giữ nhịp, làm theo bạn, vào lại càng sớm càng tốt</b>. Cười lớn làm mất tập trung và thẩm mỹ.',
      ]),
  ]),

  M(15, 'Trò chơi vận động phối hợp', [
    Q('Trò chơi vận động giúp ích gì cho học sinh?', ['Lãng phí thời gian', 'Chỉ làm mệt', 'Rèn thể lực, phản xạ, tinh thần đồng đội, vui vẻ', 'Không có ích'], 2, 'Trò chơi vận động: học mà chơi — rèn thể lực và kỹ năng xã hội.',
      [
        '<b>Trò chơi vận động</b> mang lại nhiều lợi ích cho học sinh:<ul><li>Rèn <code>thể lực và phản xạ</code> một cách tự nhiên.</li><li>Bồi dưỡng <code>tinh thần đồng đội</code>, kỹ năng xã hội.</li><li>Tạo <code>niềm vui</code>, giảm căng thẳng học tập.</li></ul>',
        'Đây chính là tinh thần "học mà chơi, chơi mà học". Trò chơi vận động không hề "lãng phí thời gian" hay "vô ích" mà là phương pháp giáo dục thể chất hiệu quả, hấp dẫn.',
      ],
      [
        'Sai — vì đáp án đúng là <b>Rèn thể lực, phản xạ, tinh thần đồng đội, vui vẻ</b>. Trò chơi vận động rất bổ ích, không lãng phí.',
        'Sai — vì đáp án đúng là <b>Rèn thể lực, phản xạ, tinh thần đồng đội, vui vẻ</b>. Mệt là tạm thời, lợi ích thì nhiều mặt.',
        'Đúng — vì trò chơi vận động giúp rèn thể lực và kỹ năng xã hội theo cách học mà chơi. Lựa chọn <b>Rèn thể lực, phản xạ, tinh thần đồng đội, vui vẻ</b> là phương án chuẩn.',
        'Sai — vì đáp án đúng là <b>Rèn thể lực, phản xạ, tinh thần đồng đội, vui vẻ</b>. Trò chơi vận động rất có ích.',
      ]),
    Q('Khi tham gia trò chơi vận động, cần tuân thủ?', ['Bỏ qua luật', 'Đánh thắng mọi giá', 'Luật chơi và sự chỉ dẫn của giáo viên', 'Tự do hoàn toàn'], 2, 'Tuân thủ luật + tôn trọng đối phương là tinh thần fair-play.',
      [
        'Khi tham gia trò chơi vận động, cần <b>tuân thủ luật chơi và sự chỉ dẫn của giáo viên</b>.<ul><li>Luật đảm bảo trò chơi <code>công bằng và an toàn</code>.</li><li>Chỉ dẫn của giáo viên giúp tránh chấn thương.</li></ul>',
        '"Thắng mọi giá", "bỏ qua luật" hay "tự do hoàn toàn" đều đi ngược <i>tinh thần fair-play</i> và dễ gây nguy hiểm. Chơi đúng luật, tôn trọng nhau mới là chơi đẹp.',
      ],
      [
        'Sai — vì đáp án đúng là <b>Luật chơi và sự chỉ dẫn của giáo viên</b>. Bỏ qua luật làm trò chơi mất công bằng và nguy hiểm.',
        'Sai — vì đáp án đúng là <b>Luật chơi và sự chỉ dẫn của giáo viên</b>. Thắng mọi giá đi ngược fair-play.',
        'Đúng — vì tuân thủ luật và tôn trọng đối phương là tinh thần fair-play. Lựa chọn <b>Luật chơi và sự chỉ dẫn của giáo viên</b> là phương án chuẩn.',
        'Sai — vì đáp án đúng là <b>Luật chơi và sự chỉ dẫn của giáo viên</b>. Tự do hoàn toàn dễ gây nguy hiểm và mất công bằng.',
      ]),
    Q('Khi bạn cùng đội mắc lỗi, em nên?', ['Động viên, không trách móc', 'Bỏ chơi', 'La hét', 'Đổ lỗi'], 0, 'Tinh thần đồng đội: chia sẻ trách nhiệm, động viên bạn.',
      [
        'Khi bạn cùng đội mắc lỗi, hành xử đúng là <b>động viên, không trách móc</b>, cùng nhau khắc phục.<ul><li>Chia sẻ trách nhiệm — thắng thua là của cả đội.</li><li>Lời động viên giúp bạn lấy lại bình tĩnh, chơi tốt hơn.</li></ul>',
        'Bỏ chơi, la hét hay đổ lỗi chỉ làm <i>rạn nứt tinh thần đồng đội</i>. Một tập thể mạnh là tập thể biết nâng đỡ nhau lúc khó khăn.',
      ],
      [
        'Đúng — vì tinh thần đồng đội là chia sẻ trách nhiệm, động viên bạn. Lựa chọn <b>Động viên, không trách móc</b> là phương án chuẩn.',
        'Sai — vì đáp án đúng là <b>Động viên, không trách móc</b>. Bỏ chơi là thiếu tinh thần đồng đội.',
        'Sai — vì đáp án đúng là <b>Động viên, không trách móc</b>. La hét làm bạn thêm căng thẳng.',
        'Sai — vì đáp án đúng là <b>Động viên, không trách móc</b>. Đổ lỗi làm rạn nứt tập thể.',
      ]),
    Q('Nếu trong trò chơi xảy ra va chạm nhỏ, em nên?', ['Im lặng đi tiếp', 'Đánh lại', 'Xin lỗi nếu cần, kiểm tra bạn có sao không', 'Cãi nhau'], 2, 'Văn hoá thể thao: xin lỗi khi gây va chạm vô tình, hỏi thăm bạn.',
      [
        'Khi xảy ra <b>va chạm nhỏ</b> trong trò chơi, cách ứng xử văn minh là <code>xin lỗi nếu cần và kiểm tra xem bạn có sao không</code>.<ul><li>Va chạm vô tình là điều khó tránh khi vận động.</li><li>Một lời xin lỗi và quan tâm thể hiện văn hoá thể thao.</li></ul>',
        '"Đánh lại", "cãi nhau" làm tình huống căng thẳng và có thể gây thương tích; "im lặng đi tiếp" thì thiếu quan tâm. <i>Xin lỗi và hỏi thăm</i> mới là hành xử đẹp.',
      ],
      [
        'Sai — vì đáp án đúng là <b>Xin lỗi nếu cần, kiểm tra bạn có sao không</b>. Im lặng đi tiếp là thiếu quan tâm.',
        'Sai — vì đáp án đúng là <b>Xin lỗi nếu cần, kiểm tra bạn có sao không</b>. Đánh lại làm tình huống nghiêm trọng hơn.',
        'Đúng — vì văn hoá thể thao là xin lỗi khi gây va chạm vô tình và hỏi thăm bạn. Lựa chọn <b>Xin lỗi nếu cần, kiểm tra bạn có sao không</b> là phương án chuẩn.',
        'Sai — vì đáp án đúng là <b>Xin lỗi nếu cần, kiểm tra bạn có sao không</b>. Cãi nhau làm căng thẳng leo thang.',
      ]),
    Q('Khi đội đối phương thắng, em nên?', ['Tức giận', 'Đổ lỗi trọng tài', 'Chúc mừng, học hỏi kinh nghiệm', 'Phản ứng thái quá, tranh cãi với đối thủ'], 2, 'Tinh thần fair-play: thắng không kiêu, thua không nản, học hỏi đối thủ.',
      [
        'Khi đội bạn thắng, hành xử fair-play là <b>chúc mừng và học hỏi kinh nghiệm</b> từ họ.<ul><li>Tinh thần: <code>thắng không kiêu, thua không nản</code>.</li><li>Học cái hay của đối thủ để lần sau tiến bộ.</li></ul>',
        'Tức giận, đổ lỗi trọng tài hay tranh cãi đều là <i>phản ứng thiếu chuyên nghiệp</i>. Biết chấp nhận thất bại một cách lịch sự mới là người chơi thể thao bản lĩnh.',
      ],
      [
        'Sai — vì đáp án đúng là <b>Chúc mừng, học hỏi kinh nghiệm</b>. Tức giận đi ngược tinh thần fair-play.',
        'Sai — vì đáp án đúng là <b>Chúc mừng, học hỏi kinh nghiệm</b>. Đổ lỗi trọng tài là thiếu trung thực với chính mình.',
        'Đúng — vì tinh thần fair-play là thắng không kiêu, thua không nản, học hỏi đối thủ. Lựa chọn <b>Chúc mừng, học hỏi kinh nghiệm</b> là phương án chuẩn.',
        'Sai — vì đáp án đúng là <b>Chúc mừng, học hỏi kinh nghiệm</b>. Phản ứng thái quá, tranh cãi là thiếu chuyên nghiệp.',
      ]),
  ]),

  M(16, 'Ôn tập giữa kỳ — kỹ thuật cơ bản', [
    Q('Khẩu lệnh xuất phát chạy ngắn là?', ['"Vào chỗ - Sẵn sàng - Chạy"', '"Đứng - ngồi - chạy"', '"Một - hai - ba"', '"Chuẩn bị - Bắt đầu"'], 0, 'Ôn tuần 2.',
      [
        'Ôn lại <b>Tuần 2</b>: ba khẩu lệnh chuẩn của xuất phát thấp trong chạy ngắn là <code>"Vào chỗ" → "Sẵn sàng" → "Chạy"</code>.<ul><li>"Vào chỗ": vào bàn đạp, đặt tay.</li><li>"Sẵn sàng": nâng hông, dồn trọng tâm trước.</li><li>"Chạy" (súng/còi): bật khỏi bàn đạp.</li></ul>',
        'Đây là quy chuẩn quốc tế. Nhớ đúng trình tự khẩu lệnh giúp em không bị phạm quy xuất phát sớm.',
      ],
      [
        'Đúng — vì khẩu lệnh chuẩn là "Vào chỗ - Sẵn sàng - Chạy" (ôn tuần 2). Lựa chọn <b>"Vào chỗ - Sẵn sàng - Chạy"</b> là phương án chuẩn.',
        'Sai — vì đáp án đúng là <b>"Vào chỗ - Sẵn sàng - Chạy"</b>. Không có khẩu lệnh "đứng - ngồi" trong xuất phát.',
        'Sai — vì đáp án đúng là <b>"Vào chỗ - Sẵn sàng - Chạy"</b>. "Một - hai - ba" không phải khẩu lệnh chuẩn.',
        'Sai — vì đáp án đúng là <b>"Vào chỗ - Sẵn sàng - Chạy"</b>. "Chuẩn bị - Bắt đầu" không đúng trình tự ba khẩu lệnh.',
      ]),
    Q('Nhảy xa gồm mấy giai đoạn chính?', ['4', '2', '1', '6'], 0, 'Ôn tuần 5.',
      [
        'Ôn lại <b>Tuần 5</b>: nhảy xa gồm <code>4 giai đoạn chính</code>:<ul><li>Chạy đà.</li><li>Giậm nhảy.</li><li>Bay trên không.</li><li>Tiếp đất.</li></ul>',
        'Bốn giai đoạn nối liền mạch, mỗi giai đoạn ảnh hưởng đến giai đoạn sau và quyết định thành tích.',
      ],
      [
        'Đúng — vì nhảy xa gồm 4 giai đoạn (ôn tuần 5). Lựa chọn <b>4</b> là phương án chuẩn.',
        'Sai — vì đáp án đúng là <b>4</b>. Chia thành 2 giai đoạn là bỏ sót chạy đà và tiếp đất.',
        'Sai — vì đáp án đúng là <b>4</b>. Nhảy xa là chuỗi nhiều giai đoạn, không phải 1.',
        'Sai — vì đáp án đúng là <b>4</b>. Nhảy xa chỉ có 4 giai đoạn chính, không phải 6.',
      ]),
    Q('Đội bóng đá tiêu chuẩn có bao nhiêu cầu thủ trên sân?', ['11', '7', '5', '9'], 0, 'Ôn tuần 7.',
      [
        'Ôn lại <b>Tuần 7</b>: bóng đá tiêu chuẩn có <code>11 cầu thủ mỗi đội</code> trên sân, gồm 1 thủ môn và 10 cầu thủ.<ul><li>Thủ môn được dùng tay trong vòng cấm.</li><li>Sân 7 (7 người) là thể thức thu nhỏ, không phải tiêu chuẩn.</li></ul>',
        '<i>Ghi nhớ:</i> phân biệt số người các môn — bóng đá <b>11</b>, bóng chuyền <b>6</b>, bóng rổ <b>5</b>, bóng ném <b>7</b>.',
      ],
      [
        'Đúng — vì bóng đá tiêu chuẩn có 11 người mỗi đội (ôn tuần 7). Lựa chọn <b>11</b> là phương án chuẩn.',
        'Sai — vì đáp án đúng là <b>11</b>. 7 là bóng đá sân nhỏ, không phải tiêu chuẩn.',
        'Sai — vì đáp án đúng là <b>11</b>. 5 là futsal (bóng đá trong nhà).',
        'Sai — vì đáp án đúng là <b>11</b>. 9 không phải thể thức bóng đá tiêu chuẩn.',
      ]),
    Q('Đội bóng chuyền có bao nhiêu người trên sân?', ['7', '11', '5', '6'], 3, 'Ôn tuần 9.',
      [
        'Ôn lại <b>Tuần 9</b>: bóng chuyền tiêu chuẩn có <code>6 người mỗi đội</code> trên sân.<ul><li>Bóng rổ: 5 người.</li><li>Bóng đá: 11 người.</li><li>Bóng ném: 7 người.</li></ul>',
        '<i>Lưu ý:</i> 6 người bóng chuyền xếp thành 2 hàng (3 trên lưới, 3 dưới) và xoay vòng vị trí khi giành quyền giao bóng.',
      ],
      [
        'Sai — vì đáp án đúng là <b>6</b>. 7 là số người của bóng ném.',
        'Sai — vì đáp án đúng là <b>6</b>. 11 là số cầu thủ bóng đá.',
        'Sai — vì đáp án đúng là <b>6</b>. 5 là số người bóng rổ.',
        'Đúng — vì bóng chuyền có 6 người mỗi đội trên sân (ôn tuần 9). Lựa chọn <b>6</b> là phương án chuẩn.',
      ]),
    Q('Trong đánh đôi cầu lông, mỗi đội có?', ['1', '2', '4', '3'], 1, 'Ôn tuần 10.',
      [
        'Ôn lại <b>Tuần 10</b>: trong đánh đôi cầu lông, mỗi đội có <code>2 người</code> (tổng 4 người trên sân).<ul><li>Đánh đơn: mỗi bên 1 người.</li><li>Đôi cần phối hợp che sân và gọi cầu.</li></ul>',
        '<i>Mẹo phối hợp:</i> hai người che sân theo kiểu trên – dưới khi tấn công và trái – phải khi phòng thủ.',
      ],
      [
        'Sai — vì đáp án đúng là <b>2</b>. 1 người là đánh đơn, không phải đôi.',
        'Đúng — vì đánh đôi mỗi đội 2 người (ôn tuần 10). Lựa chọn <b>2</b> là phương án chuẩn.',
        'Sai — vì đáp án đúng là <b>2</b>. 4 là tổng cả hai đội, không phải một đội.',
        'Sai — vì đáp án đúng là <b>2</b>. Cầu lông không có thể thức 3 người một đội.',
      ]),
  ]),

  M(17, 'An toàn trong tập luyện', [
    Q('Khi bị bong gân nhẹ, sơ cứu đúng cách là?', ['Xoa nóng', 'Tiếp tục tập', 'RICE: Nghỉ - Chườm đá - Băng ép - Kê cao', 'Bóp mạnh'], 2, 'RICE = Rest, Ice, Compression, Elevation — sơ cứu chuẩn cho bong gân.',
      [
        'Sơ cứu <b>bong gân nhẹ</b> theo nguyên tắc <code>RICE</code>:<ul><li><b>R</b>est — Nghỉ ngơi, ngừng vận động vùng đau.</li><li><b>I</b>ce — Chườm đá (qua khăn) giảm sưng đau.</li><li><b>C</b>ompression — Băng ép vừa phải.</li><li><b>E</b>levation — Kê cao chỗ bị thương.</li></ul>',
        '<i>Xoa nóng, bóp mạnh hay tiếp tục tập</i> đều sai trong giai đoạn đầu — làm chỗ bong gân sưng và tổn thương nặng hơn. Nhớ RICE là sơ cứu chuẩn cho chấn thương mềm.',
      ],
      [
        'Sai — vì đáp án đúng là <b>RICE: Nghỉ - Chườm đá - Băng ép - Kê cao</b>. Xoa nóng làm sưng nặng hơn ở giai đoạn đầu.',
        'Sai — vì đáp án đúng là <b>RICE: Nghỉ - Chườm đá - Băng ép - Kê cao</b>. Tiếp tục tập làm chấn thương nặng thêm.',
        'Đúng — vì RICE (Rest, Ice, Compression, Elevation) là sơ cứu chuẩn cho bong gân. Lựa chọn <b>RICE: Nghỉ - Chườm đá - Băng ép - Kê cao</b> là phương án chuẩn.',
        'Sai — vì đáp án đúng là <b>RICE: Nghỉ - Chườm đá - Băng ép - Kê cao</b>. Bóp mạnh làm tổn thương thêm.',
      ]),
    Q('Trang phục thể thao nên?', ['Đi chân đất', 'Giày da', 'Gọn, thoáng, giày phù hợp môn tập', 'Quần áo dài rộng'], 2, 'Trang phục thể thao: gọn, thấm hút, giày chuyên dụng cho môn.',
      [
        '<b>Trang phục thể thao</b> hợp lý cần <code>gọn gàng, thoáng mát, thấm hút mồ hôi và đi giày phù hợp môn tập</code>.<ul><li>Quần áo gọn → vận động thoải mái, không vướng.</li><li>Giày thể thao đúng môn → bảo vệ chân, tránh trơn trượt.</li></ul>',
        'Đi chân đất dễ tổn thương bàn chân; giày da hay quần áo dài rộng thì vướng víu, không thấm hút. Mặc đúng đồ thể thao giúp tập <i>an toàn và hiệu quả</i> hơn.',
      ],
      [
        'Sai — vì đáp án đúng là <b>Gọn, thoáng, giày phù hợp môn tập</b>. Đi chân đất dễ tổn thương bàn chân.',
        'Sai — vì đáp án đúng là <b>Gọn, thoáng, giày phù hợp môn tập</b>. Giày da không phù hợp vận động thể thao.',
        'Đúng — vì trang phục thể thao cần gọn, thấm hút và giày chuyên dụng cho môn. Lựa chọn <b>Gọn, thoáng, giày phù hợp môn tập</b> là phương án chuẩn.',
        'Sai — vì đáp án đúng là <b>Gọn, thoáng, giày phù hợp môn tập</b>. Quần áo dài rộng vướng víu, dễ vấp.',
      ]),
    Q('Trước khi chạy/nhảy ngoài trời nắng, nên?', ['Không uống nước', 'Tập giữa trưa', 'Không cần chuẩn bị', 'Đội mũ, uống đủ nước, chọn giờ mát'], 3, 'Tránh sốc nhiệt: nắng to → mũ, nước, chọn giờ sáng/chiều mát.',
      [
        'Khi vận động <b>ngoài trời nắng</b>, cần chuẩn bị để tránh sốc nhiệt: <code>đội mũ, uống đủ nước và chọn giờ mát (sáng sớm/chiều)</code>.<ul><li>Mũ che nắng bảo vệ đầu.</li><li>Uống đủ nước bù lượng mất qua mồ hôi.</li><li>Tránh giờ nắng gắt (10–15h).</li></ul>',
        'Tập giữa trưa nắng gắt, không uống nước rất nguy hiểm — dễ <i>say nắng, sốc nhiệt, ngất</i>. Chuẩn bị đúng cách giúp buổi tập ngoài trời an toàn.',
      ],
      [
        'Sai — vì đáp án đúng là <b>Đội mũ, uống đủ nước, chọn giờ mát</b>. Không uống nước dễ mất nước, sốc nhiệt.',
        'Sai — vì đáp án đúng là <b>Đội mũ, uống đủ nước, chọn giờ mát</b>. Tập giữa trưa nắng gắt rất dễ say nắng.',
        'Sai — vì đáp án đúng là <b>Đội mũ, uống đủ nước, chọn giờ mát</b>. Vận động ngoài nắng luôn cần chuẩn bị kỹ.',
        'Đúng — vì để tránh sốc nhiệt cần đội mũ, uống đủ nước và chọn giờ mát. Lựa chọn <b>Đội mũ, uống đủ nước, chọn giờ mát</b> là phương án chuẩn.',
      ]),
    Q('Khi bạn cùng tập bị ngất, em nên?', ['Lay mạnh', 'Quay phim lại để xem sau', 'Tự xốc bạn dậy cho ngồi lên', 'Báo người lớn ngay, không tự ý xốc dậy'], 3, 'Báo người lớn/giáo viên ngay, để bạn nằm yên ở chỗ thoáng.',
      [
        'Khi bạn cùng tập <b>bị ngất</b>, việc cần làm ngay là <code>báo người lớn/giáo viên</code> và <code>không tự ý xốc bạn dậy</code>.<ul><li>Để bạn nằm yên ở chỗ thoáng mát.</li><li>Nới lỏng quần áo, kê cao chân nhẹ nếu cần.</li><li>Người lớn sẽ xử lý hoặc gọi cấp cứu.</li></ul>',
        '<i>Lay mạnh, tự xốc dậy</i> có thể làm bạn nguy hiểm hơn; <i>quay phim</i> là vô trách nhiệm. Bình tĩnh báo người lớn là cách xử lý đúng và an toàn nhất.',
      ],
      [
        'Sai — vì đáp án đúng là <b>Báo người lớn ngay, không tự ý xốc dậy</b>. Lay mạnh có thể làm bạn nguy hiểm hơn.',
        'Sai — vì đáp án đúng là <b>Báo người lớn ngay, không tự ý xốc dậy</b>. Quay phim là hành động vô trách nhiệm.',
        'Sai — vì đáp án đúng là <b>Báo người lớn ngay, không tự ý xốc dậy</b>. Tự xốc dậy khi chưa biết tình trạng có thể gây hại.',
        'Đúng — vì cần báo người lớn/giáo viên ngay và để bạn nằm yên ở chỗ thoáng. Lựa chọn <b>Báo người lớn ngay, không tự ý xốc dậy</b> là phương án chuẩn.',
      ]),
    Q('Uống nước khi tập đúng cách là?', ['Uống ừng ực', 'Chỉ uống khi tập xong', 'Không uống', 'Uống từng ngụm nhỏ, đều đặn'], 3, 'Uống ngụm nhỏ, đều đặn → tránh sốc, đảm bảo cơ thể đủ nước.',
      [
        'Cách <b>uống nước khi tập</b> đúng là <code>uống từng ngụm nhỏ, đều đặn</code> trong suốt buổi tập.<ul><li>Ngụm nhỏ giúp cơ thể hấp thụ tốt, không sốc.</li><li>Uống đều đặn bù nước mất qua mồ hôi liên tục.</li></ul>',
        '<i>Uống ừng ực</i> một lúc dễ gây đầy bụng, xóc bụng; <i>chỉ uống khi xong</i> hay <i>không uống</i> thì cơ thể đã mất nước, dễ chuột rút, mệt. Uống đều, từng ngụm là tốt nhất.',
      ],
      [
        'Sai — vì đáp án đúng là <b>Uống từng ngụm nhỏ, đều đặn</b>. Uống ừng ực dễ gây đầy bụng, xóc bụng.',
        'Sai — vì đáp án đúng là <b>Uống từng ngụm nhỏ, đều đặn</b>. Chỉ uống khi xong thì đã mất nước trong lúc tập.',
        'Sai — vì đáp án đúng là <b>Uống từng ngụm nhỏ, đều đặn</b>. Không uống dễ chuột rút và mệt do mất nước.',
        'Đúng — vì uống ngụm nhỏ đều đặn giúp tránh sốc và đảm bảo đủ nước. Lựa chọn <b>Uống từng ngụm nhỏ, đều đặn</b> là phương án chuẩn.',
      ]),
  ]),

  M(18, 'Kiểm tra cuối kỳ I — kỹ thuật', [
    Q('Sau khi qua đích chạy ngắn nên?', ['Giảm tốc dần, đi bộ', 'Ngồi bệt', 'Chạy ngược', 'Dừng đột ngột'], 0, 'Tổng hợp.',
      [
        'Tổng hợp kiến thức chạy ngắn: sau khi qua đích cần <code>giảm tốc dần, đi bộ vài bước</code> để cơ thể thích nghi, tránh chấn thương.<ul><li>Quán tính tốc độ cao cần được hãm từ từ.</li><li>Dừng đột ngột hay ngồi bệt dễ gây choáng, căng cơ.</li></ul>',
        '<i>Liên hệ:</i> nguyên tắc này giống giai đoạn thả lỏng (cool-down) cuối buổi tập — luôn hạ nhịp từ từ, không dừng đột ngột.',
      ],
      [
        'Đúng — vì sau khi qua đích cần giảm tốc dần, đi bộ để cơ thể thích nghi. Lựa chọn <b>Giảm tốc dần, đi bộ</b> là phương án chuẩn.',
        'Sai — vì đáp án đúng là <b>Giảm tốc dần, đi bộ</b>. Ngồi bệt ngay dễ gây choáng.',
        'Sai — vì đáp án đúng là <b>Giảm tốc dần, đi bộ</b>. Chạy ngược lại nguy hiểm, dễ va chạm.',
        'Sai — vì đáp án đúng là <b>Giảm tốc dần, đi bộ</b>. Dừng đột ngột dễ căng cơ và choáng.',
      ]),
    Q('Chân giậm nhảy xa thường là?', ['Chân thuận', 'Hai chân', 'Chân tiếp đất khi rơi xuống hố cát', 'Chân không thuận'], 0, 'Tổng hợp.',
      [
        'Tổng hợp kiến thức nhảy xa: <b>chân giậm</b> thường là <code>chân thuận (chân khoẻ hơn)</code> để tạo lực bật lớn nhất.<ul><li>Chân giậm cố định giúp hình thành phản xạ.</li><li>Nhảy xa giậm một chân, không giậm cả hai.</li></ul>',
        '<i>Nhớ thêm:</i> nhảy cao cũng giậm bằng chân thuận; nguyên tắc "dùng chân khoẻ làm chân giậm" áp dụng cho cả nhảy xa và nhảy cao.',
      ],
      [
        'Đúng — vì chân giậm nhảy xa thường là chân thuận để có lực bật lớn nhất. Lựa chọn <b>Chân thuận</b> là phương án chuẩn.',
        'Sai — vì đáp án đúng là <b>Chân thuận</b>. Giậm hai chân là bật xa tại chỗ, không phải nhảy xa có đà.',
        'Sai — vì đáp án đúng là <b>Chân thuận</b>. Chân tiếp đất là khái niệm khác với chân giậm.',
        'Sai — vì đáp án đúng là <b>Chân thuận</b>. Dùng chân không thuận thì lực giậm yếu hơn.',
      ]),
    Q('Sơ cứu bong gân nhẹ dùng phương pháp?', ['Xoa nóng', 'Bóp mạnh', 'RICE', 'Tập tiếp'], 2, 'Tổng hợp.',
      [
        'Tổng hợp kiến thức an toàn: sơ cứu bong gân nhẹ dùng nguyên tắc <code>RICE</code> (Rest – Nghỉ, Ice – Chườm đá, Compression – Băng ép, Elevation – Kê cao).<ul><li>Xoa nóng, bóp mạnh, tập tiếp đều sai ở giai đoạn đầu.</li></ul>',
        '<i>Vì sao:</i> chườm lạnh và băng ép giúp co mạch, giảm sưng – chảy máu trong; xoa nóng lại làm giãn mạch khiến chỗ thương sưng to hơn.',
      ],
      [
        'Sai — vì đáp án đúng là <b>RICE</b>. Xoa nóng làm sưng nặng hơn ở giai đoạn đầu.',
        'Sai — vì đáp án đúng là <b>RICE</b>. Bóp mạnh làm tổn thương thêm.',
        'Đúng — vì sơ cứu bong gân nhẹ dùng phương pháp RICE. Lựa chọn <b>RICE</b> là phương án chuẩn.',
        'Sai — vì đáp án đúng là <b>RICE</b>. Tập tiếp làm chấn thương nặng thêm.',
      ]),
    Q('Tâng cầu cơ bản dùng phần nào của bàn chân?', ['Mu chính diện', 'Má trong', 'Mũi chân', 'Gót'], 1, 'Tổng hợp.',
      [
        'Tổng hợp kiến thức đá cầu: kỹ thuật tâng cầu cơ bản dùng <code>má trong bàn chân</code> vì diện rộng, phẳng, dễ kiểm soát hướng cầu.<ul><li>Cầu nảy lên thẳng, ổn định.</li><li>Là kỹ thuật nền tảng học đầu tiên.</li></ul>',
        '<i>Lưu ý:</i> luôn nhìn theo cầu và giữ tư thế thấp (gối khuỵu) để tâng cầu đều và lâu hơn.',
      ],
      [
        'Sai — vì đáp án đúng là <b>Má trong</b>. Mu chính diện thường dùng cho cú đá mạnh, không phải tâng cơ bản.',
        'Đúng — vì tâng cầu cơ bản dùng má trong bàn chân để dễ kiểm soát hướng cầu. Lựa chọn <b>Má trong</b> là phương án chuẩn.',
        'Sai — vì đáp án đúng là <b>Má trong</b>. Mũi chân khó kiểm soát hướng cầu.',
        'Sai — vì đáp án đúng là <b>Má trong</b>. Gót không phải bộ phận tâng cầu cơ bản.',
      ]),
    Q('Mỗi đội bóng chuyền được chạm bóng tối đa mấy lần?', ['5', '1', '7', '3'], 3, 'Tổng hợp.',
      [
        'Tổng hợp kiến thức bóng chuyền: mỗi đội được chạm bóng <code>tối đa 3 lần</code> trước khi đưa qua lưới (thường: đỡ → nâng → đập).<ul><li>Một người không chạm 2 lần liên tiếp.</li><li>Động tác chắn (block) không tính.</li></ul>',
        '<i>Chiến thuật:</i> tận dụng đủ 3 lần chạm (đỡ chắc – nâng đẹp – đập mạnh) giúp đội tổ chức tấn công hiệu quả thay vì trả bóng vội.',
      ],
      [
        'Sai — vì đáp án đúng là <b>3</b>. Chạm 5 lần đã là lỗi quá số lần.',
        'Sai — vì đáp án đúng là <b>3</b>. 1 lần không đủ phối hợp đỡ – nâng – đập.',
        'Sai — vì đáp án đúng là <b>3</b>. 7 lần vượt xa luật cho phép.',
        'Đúng — vì mỗi đội bóng chuyền được chạm tối đa 3 lần. Lựa chọn <b>3</b> là phương án chuẩn.',
      ]),
  ]),

  // ───────────── HK2 ─────────────

  M(19, 'Chạy bền — nâng cao quãng đường', [
    Q('Để tăng dần quãng đường chạy bền, nên?', ['Tăng từ từ (10% mỗi tuần), không tăng đột ngột', 'Tuỳ hứng', 'Tăng gấp đôi mỗi tuần', 'Chỉ một quãng cố định'], 0, 'Nguyên tắc 10%: tăng cự ly không quá 10% mỗi tuần để cơ thể thích nghi an toàn.',
      [
        'Khi nâng cao quãng đường chạy bền, áp dụng <b>nguyên tắc 10%</b>: <code>mỗi tuần tăng cự ly không quá 10%</code> so với tuần trước.<ul><li>Cơ thể có thời gian thích nghi an toàn.</li><li>Tránh quá tải gây chấn thương, kiệt sức.</li></ul>',
        '<i>Tăng đột ngột (gấp đôi)</i> rất dễ chấn thương; <i>giữ một quãng cố định</i> thì không tiến bộ. Tăng đều đặn, từ từ là nguyên tắc khoa học của rèn sức bền.',
      ],
      [
        'Đúng — vì nguyên tắc 10% giúp cơ thể thích nghi an toàn khi tăng cự ly. Lựa chọn <b>Tăng từ từ (10% mỗi tuần), không tăng đột ngột</b> là phương án chuẩn.',
        'Sai — vì đáp án đúng là <b>Tăng từ từ (10% mỗi tuần), không tăng đột ngột</b>. Tập tuỳ hứng dễ quá tải hoặc kém hiệu quả.',
        'Sai — vì đáp án đúng là <b>Tăng từ từ (10% mỗi tuần), không tăng đột ngột</b>. Tăng gấp đôi mỗi tuần rất dễ chấn thương.',
        'Sai — vì đáp án đúng là <b>Tăng từ từ (10% mỗi tuần), không tăng đột ngột</b>. Giữ quãng cố định thì không tiến bộ.',
      ]),
    Q('Trong chạy bền, "đau xóc bụng" thường do?', ['Chạy chậm', 'Quần áo đẹp', 'Không liên quan ăn', 'Thở không đều hoặc ăn no trước khi chạy'], 3, 'Xóc bụng thường do thở nông + ăn no/uống nhiều trước khi chạy.',
      [
        '<b>Đau xóc bụng</b> khi chạy bền thường do hai nguyên nhân chính: <code>thở không đều (thở nông)</code> và <code>ăn no/uống nhiều trước khi chạy</code>.<ul><li>Thở nông làm cơ hoành mỏi, co thắt gây đau.</li><li>Dạ dày đầy chèn ép cơ hoành.</li></ul>',
        'Để phòng tránh: ăn trước khi chạy ít nhất <i>1–2 tiếng</i>, thở sâu và đều theo nhịp bước. Đây là kiến thức quan trọng để chạy bền thoải mái hơn.',
      ],
      [
        'Sai — vì đáp án đúng là <b>Thở không đều hoặc ăn no trước khi chạy</b>. Chạy chậm không gây xóc bụng.',
        'Sai — vì đáp án đúng là <b>Thở không đều hoặc ăn no trước khi chạy</b>. Quần áo không liên quan đến xóc bụng.',
        'Sai — vì đáp án đúng là <b>Thở không đều hoặc ăn no trước khi chạy</b>. Ăn no trước khi chạy chính là một nguyên nhân.',
        'Đúng — vì xóc bụng thường do thở nông và ăn no/uống nhiều trước khi chạy. Lựa chọn <b>Thở không đều hoặc ăn no trước khi chạy</b> là phương án chuẩn.',
      ]),
    Q('Khi đau xóc bụng đang chạy, nên?', ['Nín thở', 'Ngồi sụp xuống', 'Giảm tốc, thở sâu, ấn nhẹ chỗ đau', 'Cố chạy nhanh hơn'], 2, 'Chậm lại, thở sâu, ấn nhẹ vào chỗ đau và đi bộ vài phút.',
      [
        'Khi bị <b>đau xóc bụng</b> giữa lúc chạy, cách xử lý đúng là <code>giảm tốc, thở sâu và ấn nhẹ vào chỗ đau</code>, có thể đi bộ vài phút.<ul><li>Thở sâu giúp cơ hoành thư giãn.</li><li>Ấn nhẹ và cúi người giảm co thắt.</li></ul>',
        '<i>Nín thở</i> hay <i>cố chạy nhanh hơn</i> làm cơn đau nặng thêm; <i>ngồi sụp xuống</i> đột ngột dễ choáng. Bình tĩnh chậm lại và điều hoà hơi thở là cách hợp lý nhất.',
      ],
      [
        'Sai — vì đáp án đúng là <b>Giảm tốc, thở sâu, ấn nhẹ chỗ đau</b>. Nín thở làm cơn đau nặng thêm.',
        'Sai — vì đáp án đúng là <b>Giảm tốc, thở sâu, ấn nhẹ chỗ đau</b>. Ngồi sụp đột ngột dễ choáng.',
        'Đúng — vì cần chậm lại, thở sâu, ấn nhẹ vào chỗ đau và đi bộ vài phút. Lựa chọn <b>Giảm tốc, thở sâu, ấn nhẹ chỗ đau</b> là phương án chuẩn.',
        'Sai — vì đáp án đúng là <b>Giảm tốc, thở sâu, ấn nhẹ chỗ đau</b>. Cố chạy nhanh hơn càng làm đau tăng.',
      ]),
    Q('Khoảng cách giữa các buổi chạy bền nên?', ['Chạy liên tục mỗi ngày', 'Có ngày nghỉ giữa các buổi', 'Càng dày buổi càng tốt', 'Cách nhau cả tuần'], 1, 'Cần ngày nghỉ để cơ phục hồi (xen kẽ vận động nhẹ).',
      [
        'Giữa các buổi chạy bền nên <b>có ngày nghỉ</b> để cơ bắp và hệ tim mạch <code>phục hồi</code>.<ul><li>Cơ phục hồi và phát triển trong lúc nghỉ, không phải lúc tập.</li><li>Có thể xen kẽ vận động nhẹ (đi bộ, đạp xe) vào ngày nghỉ.</li></ul>',
        '<i>Chạy liên tục mỗi ngày, càng dày càng tốt</i> dễ dẫn đến quá tải, chấn thương; <i>cách cả tuần</i> thì quá thưa, khó tiến bộ. Cân bằng tập – nghỉ là then chốt.',
      ],
      [
        'Sai — vì đáp án đúng là <b>Có ngày nghỉ giữa các buổi</b>. Chạy liên tục mỗi ngày dễ quá tải.',
        'Đúng — vì cần ngày nghỉ để cơ phục hồi, có thể xen kẽ vận động nhẹ. Lựa chọn <b>Có ngày nghỉ giữa các buổi</b> là phương án chuẩn.',
        'Sai — vì đáp án đúng là <b>Có ngày nghỉ giữa các buổi</b>. Càng dày buổi càng dễ chấn thương.',
        'Sai — vì đáp án đúng là <b>Có ngày nghỉ giữa các buổi</b>. Cách cả tuần thì quá thưa, khó tiến bộ.',
      ]),
    Q('Chỉ số tốt cho thấy chạy bền tiến bộ là?', ['Cùng quãng đường nhưng nhịp tim thấp hơn, ít mệt hơn', 'Không thay đổi', 'Đau hơn', 'Mệt hơn nhiều'], 0, 'Tiến bộ thể hiện qua việc cùng tải nhưng cơ thể ít gắng sức hơn.',
      [
        'Dấu hiệu chạy bền <b>tiến bộ</b> là: với <code>cùng một quãng đường, nhịp tim thấp hơn và cảm thấy ít mệt hơn</code> so với trước.<ul><li>Tim khoẻ hơn → bơm máu hiệu quả, nhịp chậm lại.</li><li>Cơ thể quen với tải, gắng sức ít hơn.</li></ul>',
        'Nếu "không thay đổi", "đau hơn" hay "mệt hơn nhiều" thì không phải tiến bộ. Theo dõi nhịp tim và cảm giác mệt là cách <i>đánh giá hiệu quả tập luyện</i> đơn giản.',
      ],
      [
        'Đúng — vì tiến bộ thể hiện qua cùng tải nhưng cơ thể ít gắng sức hơn. Lựa chọn <b>Cùng quãng đường nhưng nhịp tim thấp hơn, ít mệt hơn</b> là phương án chuẩn.',
        'Sai — vì đáp án đúng là <b>Cùng quãng đường nhưng nhịp tim thấp hơn, ít mệt hơn</b>. Không thay đổi nghĩa là chưa tiến bộ.',
        'Sai — vì đáp án đúng là <b>Cùng quãng đường nhưng nhịp tim thấp hơn, ít mệt hơn</b>. Đau hơn là dấu hiệu xấu, không phải tiến bộ.',
        'Sai — vì đáp án đúng là <b>Cùng quãng đường nhưng nhịp tim thấp hơn, ít mệt hơn</b>. Mệt hơn nhiều là dấu hiệu quá tải.',
      ]),
  ]),

  M(20, 'Nhảy xa — toàn bài phối hợp', [
    Q('Chạy đà nhảy xa cần?', ['Chạy chậm đều', 'Chạy chậm rồi dừng trước vạch giậm', 'Chạy nhanh từ đầu', 'Tốc độ tăng dần, đến vạch là cực đại'], 3, 'Đà tăng dần, đạt tốc độ cực đại ngay trước vạch giậm.',
      [
        '<b>Chạy đà nhảy xa</b> đúng kỹ thuật cần <code>tốc độ tăng dần, đạt cực đại ngay trước vạch giậm</code>.<ul><li>Tốc độ ngang lớn nhất giúp bật xa nhất.</li><li>Bước đà cuối cần ổn định để giậm chính xác.</li></ul>',
        '<i>Chạy chậm đều, dừng trước vạch</i> thì không tạo đủ tốc độ; <i>chạy nhanh ngay từ đầu</i> thì đuối sức ở cuối đà. Tăng tốc dần để đạt đỉnh đúng lúc giậm là chuẩn.',
      ],
      [
        'Sai — vì đáp án đúng là <b>Tốc độ tăng dần, đến vạch là cực đại</b>. Chạy chậm đều không tạo đủ tốc độ ngang.',
        'Sai — vì đáp án đúng là <b>Tốc độ tăng dần, đến vạch là cực đại</b>. Dừng trước vạch thì mất hết đà.',
        'Sai — vì đáp án đúng là <b>Tốc độ tăng dần, đến vạch là cực đại</b>. Chạy nhanh từ đầu sẽ đuối ở cuối đà.',
        'Đúng — vì đà tăng dần, đạt tốc độ cực đại ngay trước vạch giậm. Lựa chọn <b>Tốc độ tăng dần, đến vạch là cực đại</b> là phương án chuẩn.',
      ]),
    Q('Khi đà của em hay bị "lệch" vạch giậm, nên?', ['Đo lại đà bằng cách chạy thử nhiều lần', 'Bỏ qua', 'Nhảy bừa', 'Đoán đại'], 0, 'Cần đo đà chuẩn: chạy thử và đếm bước, đánh dấu điểm xuất phát đúng.',
      [
        'Nếu đà hay bị <b>"lệch" vạch giậm</b> (giậm trước/sau vạch), cách khắc phục là <code>đo lại đà bằng cách chạy thử nhiều lần</code>.<ul><li>Chạy thử, đếm số bước từ vạch giậm về.</li><li>Đánh dấu điểm xuất phát chính xác.</li><li>Lặp lại để ổn định bước đà.</li></ul>',
        '<i>Nhảy bừa, đoán đại hay bỏ qua</i> sẽ khiến em liên tục phạm vạch (mất thành tích) hoặc giậm non. Đo đà chuẩn là bước chuẩn bị bắt buộc của nhảy xa.',
      ],
      [
        'Đúng — vì cần đo đà chuẩn bằng cách chạy thử, đếm bước và đánh dấu điểm xuất phát. Lựa chọn <b>Đo lại đà bằng cách chạy thử nhiều lần</b> là phương án chuẩn.',
        'Sai — vì đáp án đúng là <b>Đo lại đà bằng cách chạy thử nhiều lần</b>. Bỏ qua thì lỗi lệch vạch vẫn còn.',
        'Sai — vì đáp án đúng là <b>Đo lại đà bằng cách chạy thử nhiều lần</b>. Nhảy bừa dễ phạm vạch, mất thành tích.',
        'Sai — vì đáp án đúng là <b>Đo lại đà bằng cách chạy thử nhiều lần</b>. Đoán đại không giúp giậm chính xác.',
      ]),
    Q('Trong giai đoạn trên không, để bay xa hơn nên?', ['Ưỡn thân, vung tay phối hợp', 'Quay tròn', 'Buông xuôi', 'Co người tròn'], 0, 'Kiểu "ưỡn thân" giữ thăng bằng + tay vung tạo lực phụ.',
      [
        'Trong giai đoạn <b>bay trên không</b>, để bay xa và tiếp đất tốt nên áp dụng kiểu <code>"ưỡn thân", phối hợp vung tay</code>.<ul><li>Ưỡn thân giữ thăng bằng, kéo dài quỹ đạo bay.</li><li>Vung tay tạo lực phụ và hỗ trợ đưa chân về trước khi tiếp đất.</li></ul>',
        '<i>Quay tròn, buông xuôi hay co người tròn</i> đều làm mất thăng bằng và rút ngắn khoảng cách. Kỹ thuật "ưỡn thân" là nội dung trọng tâm của nhảy xa lớp 7.',
      ],
      [
        'Đúng — vì kiểu "ưỡn thân" giữ thăng bằng và tay vung tạo lực phụ. Lựa chọn <b>Ưỡn thân, vung tay phối hợp</b> là phương án chuẩn.',
        'Sai — vì đáp án đúng là <b>Ưỡn thân, vung tay phối hợp</b>. Quay tròn làm mất thăng bằng.',
        'Sai — vì đáp án đúng là <b>Ưỡn thân, vung tay phối hợp</b>. Buông xuôi không tận dụng được lực và quỹ đạo.',
        'Sai — vì đáp án đúng là <b>Ưỡn thân, vung tay phối hợp</b>. Co người tròn rút ngắn quỹ đạo bay.',
      ]),
    Q('Khoảng cách nhảy xa được đo từ?', ['Vạch giậm đến gót chân', 'Điểm xuất phát đến điểm xa nhất', 'Vạch giậm đến điểm xa nhất', 'Vạch giậm đến điểm tiếp đất gần vạch giậm nhất'], 3, 'Đo từ vạch giậm đến vết tiếp đất GẦN vạch giậm nhất (gồm cả vết tay nếu chạm).',
      [
        'Theo luật điền kinh, <b>thành tích nhảy xa</b> được đo từ <code>vạch giậm đến vết tiếp đất gần vạch giậm nhất</code> (bao gồm cả vết tay/mông nếu chạm hố cát phía sau).<ul><li>Vì vậy ngã ngửa về sau làm vết gần vạch → thành tích nhỏ đi.</li><li>Cần đưa chân về trước, không để bộ phận nào chạm cát gần vạch.</li></ul>',
        'Không đo đến "điểm xa nhất" hay từ "điểm xuất phát chạy đà". Hiểu đúng cách đo giúp em ý thức <i>tiếp đất gọn về trước</i> để không mất khoảng cách.',
      ],
      [
        'Sai — vì đáp án đúng là <b>Vạch giậm đến điểm tiếp đất gần vạch giậm nhất</b>. Không chỉ đo đến gót chân.',
        'Sai — vì đáp án đúng là <b>Vạch giậm đến điểm tiếp đất gần vạch giậm nhất</b>. Không đo từ điểm xuất phát chạy đà.',
        'Sai — vì đáp án đúng là <b>Vạch giậm đến điểm tiếp đất gần vạch giậm nhất</b>. Đo đến điểm GẦN nhất chứ không phải xa nhất.',
        'Đúng — vì đo từ vạch giậm đến vết tiếp đất gần vạch giậm nhất (gồm cả vết tay nếu chạm). Lựa chọn <b>Vạch giậm đến điểm tiếp đất gần vạch giậm nhất</b> là phương án chuẩn.',
      ]),
    Q('Lỗi phổ biến khi tiếp đất nhảy xa là?', ['Tiếp đất xa', 'Hai chân cùng tiếp', 'Gối khuỵu', 'Ngã ngửa về sau (gần vạch giậm) → mất khoảng cách'], 3, 'Ngã ngửa làm vết tay/mông gần vạch giậm → tính khoảng nhỏ hơn.',
      [
        'Lỗi phổ biến khi tiếp đất là <b>ngã ngửa về sau</b>. Khi đó tay hoặc mông chạm cát ở vị trí <code>gần vạch giậm hơn</code> so với gót chân → thành tích bị tính nhỏ đi.<ul><li>Vì đo đến điểm chạm gần vạch giậm nhất.</li><li>Cần đưa thân và tay về trước khi tiếp đất.</li></ul>',
        '<i>Tiếp đất xa, hai chân cùng tiếp, gối khuỵu</i> đều là kỹ thuật đúng, không phải lỗi. Khắc phục ngã ngửa giúp em không bị mất khoảng cách đã bay được.',
      ],
      [
        'Sai — vì đáp án đúng là <b>Ngã ngửa về sau (gần vạch giậm) → mất khoảng cách</b>. Tiếp đất xa là điều tốt, không phải lỗi.',
        'Sai — vì đáp án đúng là <b>Ngã ngửa về sau (gần vạch giậm) → mất khoảng cách</b>. Hai chân cùng tiếp là kỹ thuật đúng.',
        'Sai — vì đáp án đúng là <b>Ngã ngửa về sau (gần vạch giậm) → mất khoảng cách</b>. Gối khuỵu để giảm chấn là đúng kỹ thuật.',
        'Đúng — vì ngã ngửa làm vết tay/mông gần vạch giậm, tính khoảng nhỏ hơn. Lựa chọn <b>Ngã ngửa về sau (gần vạch giậm) → mất khoảng cách</b> là phương án chuẩn.',
      ]),
  ]),

  M(21, 'Nhảy cao — hoàn thiện kỹ thuật bước qua', [
    Q('Mức xà cần được điều chỉnh thế nào trong tập?', ['Cao ngay từ đầu', 'Cố định một mức', 'Tuỳ ý nhảy', 'Tăng dần phù hợp khả năng'], 3, 'Tăng dần theo khả năng để đảm bảo an toàn và tiến bộ.',
      [
        'Trong tập nhảy cao, <b>mức xà</b> nên được <code>tăng dần phù hợp với khả năng</code> của người tập.<ul><li>Bắt đầu ở mức vừa sức để hoàn thiện kỹ thuật.</li><li>Nâng dần khi đã qua xà ổn định, an toàn.</li></ul>',
        '<i>Đặt cao ngay từ đầu</i> dễ thất bại, nản và chấn thương; <i>cố định một mức</i> thì không tiến bộ. Nguyên tắc tăng tải từ từ áp dụng cho cả độ cao của xà.',
      ],
      [
        'Sai — vì đáp án đúng là <b>Tăng dần phù hợp khả năng</b>. Đặt cao ngay từ đầu dễ thất bại và chấn thương.',
        'Sai — vì đáp án đúng là <b>Tăng dần phù hợp khả năng</b>. Cố định một mức thì không tiến bộ.',
        'Sai — vì đáp án đúng là <b>Tăng dần phù hợp khả năng</b>. Tuỳ ý nhảy không có lộ trình tiến bộ.',
        'Đúng — vì tăng dần theo khả năng đảm bảo an toàn và tiến bộ. Lựa chọn <b>Tăng dần phù hợp khả năng</b> là phương án chuẩn.',
      ]),
    Q('Khi bị rớt xà 3 lần liên tiếp ở cùng một mức trong thi đấu, vận động viên?', ['Nhảy lại', 'Bị loại', 'Bỏ qua', 'Vẫn tiếp tục'], 1, 'Luật điền kinh: 3 lần rớt liên tiếp tại một mức xà → bị loại.',
      [
        'Theo <b>luật điền kinh</b>, nếu vận động viên <code>rớt xà 3 lần liên tiếp ở cùng một mức</code> thì <b>bị loại</b> khỏi nội dung thi.<ul><li>Mỗi mức xà có tối đa 3 lần thử.</li><li>Thành tích cuối là mức cao nhất đã qua thành công.</li></ul>',
        'Hiểu luật này giúp VĐV <i>quyết định chiến thuật</i>: có nên bỏ qua một mức để dồn sức cho mức cao hơn hay không. Không phải "nhảy lại" hay "vẫn tiếp tục" vô hạn.',
      ],
      [
        'Sai — vì đáp án đúng là <b>Bị loại</b>. Không được nhảy lại sau 3 lần rớt liên tiếp.',
        'Đúng — vì luật điền kinh quy định 3 lần rớt liên tiếp tại một mức xà thì bị loại. Lựa chọn <b>Bị loại</b> là phương án chuẩn.',
        'Sai — vì đáp án đúng là <b>Bị loại</b>. Không thể "bỏ qua" khi đã hết 3 lần thử ở mức đó.',
        'Sai — vì đáp án đúng là <b>Bị loại</b>. Không được tiếp tục thi sau khi hết lượt thử.',
      ]),
    Q('Để bật cao hơn, cần luyện?', ['Không tập', 'Chỉ chạy bộ', 'Sức mạnh chân (cơ đùi, mông) và kỹ thuật giậm', 'Chỉ tập tay'], 2, 'Nhảy cao đòi hỏi cơ chân + kỹ thuật giậm + nhịp đà chuẩn.',
      [
        'Để <b>bật cao hơn</b> trong nhảy cao, cần luyện <code>sức mạnh chân (cơ đùi, mông) và kỹ thuật giậm</code>.<ul><li>Cơ đùi, mông tạo lực bật mạnh.</li><li>Kỹ thuật giậm đúng (nhanh, dứt khoát) chuyển lực thành độ cao.</li><li>Kết hợp nhịp đà chuẩn.</li></ul>',
        '<i>Chỉ tập tay</i> không liên quan đến bật cao; <i>chỉ chạy bộ</i> rèn sức bền chứ không phải sức bật. Phối hợp sức mạnh chân và kỹ thuật mới giúp bật cao hơn.',
      ],
      [
        'Sai — vì đáp án đúng là <b>Sức mạnh chân (cơ đùi, mông) và kỹ thuật giậm</b>. Không tập thì không thể tiến bộ.',
        'Sai — vì đáp án đúng là <b>Sức mạnh chân (cơ đùi, mông) và kỹ thuật giậm</b>. Chỉ chạy bộ rèn sức bền, không rèn sức bật.',
        'Đúng — vì nhảy cao đòi hỏi cơ chân, kỹ thuật giậm và nhịp đà chuẩn. Lựa chọn <b>Sức mạnh chân (cơ đùi, mông) và kỹ thuật giậm</b> là phương án chuẩn.',
        'Sai — vì đáp án đúng là <b>Sức mạnh chân (cơ đùi, mông) và kỹ thuật giậm</b>. Chỉ tập tay không giúp bật cao.',
      ]),
    Q('Sai lầm khi giậm nhảy là?', ['Giậm đúng nhịp', 'Đặt cả bàn chân và giậm muộn', 'Tốc độ đủ', 'Tư thế đúng'], 1, 'Giậm muộn / cả bàn chân → mất lực bật và độ chính xác.',
      [
        'Một <b>sai lầm khi giậm nhảy</b> là <code>đặt cả bàn chân xuống và giậm muộn</code>.<ul><li>Đặt cả bàn chân làm động tác chậm, mất lực phản hồi.</li><li>Giậm muộn (qua điểm tối ưu) làm mất độ cao và chính xác.</li></ul>',
        '<i>Giậm đúng nhịp, tốc độ đủ, tư thế đúng</i> là những yếu tố tốt, không phải sai lầm. Giậm nhanh, dứt khoát và đúng thời điểm mới tạo lực bật tối đa.',
      ],
      [
        'Sai — vì đáp án đúng là <b>Đặt cả bàn chân và giậm muộn</b>. Giậm đúng nhịp là điều tốt, không phải sai lầm.',
        'Đúng — vì giậm muộn / cả bàn chân làm mất lực bật và độ chính xác. Lựa chọn <b>Đặt cả bàn chân và giậm muộn</b> là phương án chuẩn.',
        'Sai — vì đáp án đúng là <b>Đặt cả bàn chân và giậm muộn</b>. Tốc độ đủ là yếu tố tốt, không phải lỗi.',
        'Sai — vì đáp án đúng là <b>Đặt cả bàn chân và giậm muộn</b>. Tư thế đúng là điều cần có, không phải sai lầm.',
      ]),
    Q('Sau khi qua xà, để an toàn cần?', ['Tiếp bằng đầu', 'Tiếp bằng tay', 'Tiếp đất bằng đệm rơi (đệm nhảy)', 'Tiếp xuống sân cứng'], 2, 'Phải có đệm rơi (mattress) đủ dày để bảo vệ khi tiếp đất.',
      [
        'Để <b>an toàn khi tiếp đất</b> sau khi qua xà, cần có <code>đệm rơi (đệm nhảy/mattress) đủ dày</code> phía sau xà.<ul><li>Đệm hấp thụ lực rơi, bảo vệ lưng, cổ, đầu gối.</li><li>Đặc biệt quan trọng với các kiểu nhảy ngã lưng/úp bụng.</li></ul>',
        '<i>Tiếp xuống sân cứng, tiếp bằng đầu hay bằng tay</i> đều rất nguy hiểm, dễ chấn thương nặng. Có đệm rơi đạt chuẩn là điều kiện bắt buộc để tập nhảy cao an toàn.',
      ],
      [
        'Sai — vì đáp án đúng là <b>Tiếp đất bằng đệm rơi (đệm nhảy)</b>. Tiếp bằng đầu cực kỳ nguy hiểm.',
        'Sai — vì đáp án đúng là <b>Tiếp đất bằng đệm rơi (đệm nhảy)</b>. Tiếp bằng tay dễ gãy/trật khớp cổ tay.',
        'Đúng — vì phải có đệm rơi đủ dày để bảo vệ khi tiếp đất. Lựa chọn <b>Tiếp đất bằng đệm rơi (đệm nhảy)</b> là phương án chuẩn.',
        'Sai — vì đáp án đúng là <b>Tiếp đất bằng đệm rơi (đệm nhảy)</b>. Tiếp xuống sân cứng dễ chấn thương nặng.',
      ]),
  ]),

  M(22, 'Bóng đá — kỹ thuật chuyền và sút', [
    Q('Khi chuyền bóng cho đồng đội đang chạy, nên?', ['Chuyền vào chân đứng yên của bạn', 'Chuyền sau lưng bạn', 'Đứng giữ bóng', 'Chuyền vào không gian phía trước bạn'], 3, 'Chuyền "đón đường chạy" — bóng đến đúng nơi đồng đội sẽ tới.',
      [
        'Khi chuyền cho <b>đồng đội đang chạy</b>, kỹ thuật đúng là <code>chuyền vào khoảng không gian phía trước bạn</code> (chuyền "đón đường chạy").<ul><li>Bóng và đồng đội gặp nhau ở phía trước → không phải dừng lại.</li><li>Duy trì nhịp tấn công, vượt qua hàng phòng ngự.</li></ul>',
        '<i>Chuyền vào chân đứng yên hay sau lưng bạn</i> làm bạn phải dừng/lùi, mất đà; <i>đứng giữ bóng</i> thì bỏ lỡ cơ hội. Chuyền đón đầu là kỹ năng phối hợp quan trọng.',
      ],
      [
        'Sai — vì đáp án đúng là <b>Chuyền vào không gian phía trước bạn</b>. Chuyền vào chỗ bạn đứng yên buộc bạn phải dừng lại.',
        'Sai — vì đáp án đúng là <b>Chuyền vào không gian phía trước bạn</b>. Chuyền sau lưng làm bạn phải lùi, mất đà.',
        'Sai — vì đáp án đúng là <b>Chuyền vào không gian phía trước bạn</b>. Đứng giữ bóng bỏ lỡ cơ hội tấn công.',
        'Đúng — vì chuyền "đón đường chạy" đưa bóng đến đúng nơi đồng đội sẽ tới. Lựa chọn <b>Chuyền vào không gian phía trước bạn</b> là phương án chuẩn.',
      ]),
    Q('Khi đá phạt trực tiếp, người sút mong muốn gì?', ['Bóng trở lại', 'Bóng vào lưới (ghi bàn) trực tiếp', 'Bóng chạm đồng đội', 'Bóng ra ngoài'], 1, 'Đá phạt trực tiếp: cầu thủ có thể sút thẳng vào lưới ghi bàn.',
      [
        '<b>Đá phạt trực tiếp</b> là quả đá phạt mà cầu thủ <code>được phép sút thẳng vào lưới để ghi bàn</code> mà không cần chạm ai khác.<ul><li>Khác đá phạt gián tiếp (phải chạm cầu thủ thứ hai mới được tính bàn).</li><li>Thường có hàng rào chắn của đối phương.</li></ul>',
        'Vì vậy mục tiêu của người sút phạt trực tiếp là đưa bóng vào lưới. Hiểu rõ loại đá phạt giúp tổ chức tấn công đúng luật và hiệu quả.',
      ],
      [
        'Sai — vì đáp án đúng là <b>Bóng vào lưới (ghi bàn) trực tiếp</b>. Mong muốn là ghi bàn, không phải bóng trở lại.',
        'Đúng — vì đá phạt trực tiếp cho phép sút thẳng vào lưới ghi bàn. Lựa chọn <b>Bóng vào lưới (ghi bàn) trực tiếp</b> là phương án chuẩn.',
        'Sai — vì đáp án đúng là <b>Bóng vào lưới (ghi bàn) trực tiếp</b>. Chạm đồng đội là yêu cầu của đá phạt gián tiếp.',
        'Sai — vì đáp án đúng là <b>Bóng vào lưới (ghi bàn) trực tiếp</b>. Không ai sút phạt để bóng ra ngoài.',
      ]),
    Q('Vị trí "thủ môn" có gì khác các vị trí khác?', ['Không được bắt bóng', 'Không khác', 'Được dùng tay trong vòng cấm địa của đội mình', 'Không được di chuyển'], 2, 'Thủ môn là cầu thủ duy nhất được phép dùng tay (trong vòng 16m50 đội nhà).',
      [
        '<b>Thủ môn</b> là cầu thủ duy nhất <code>được phép dùng tay chơi bóng — nhưng chỉ trong vòng cấm địa (16m50) của đội mình</code>.<ul><li>Ra ngoài vòng cấm, thủ môn chơi như cầu thủ thường (không được dùng tay).</li><li>Thường mặc áo khác màu để phân biệt.</li></ul>',
        'Đây là đặc quyền giúp thủ môn bắt/đỡ bóng bảo vệ khung thành. Các phương án "không được bắt bóng" hay "không được di chuyển" đều sai hoàn toàn.',
      ],
      [
        'Sai — vì đáp án đúng là <b>Được dùng tay trong vòng cấm địa của đội mình</b>. Thủ môn được bắt bóng, đó là đặc quyền.',
        'Sai — vì đáp án đúng là <b>Được dùng tay trong vòng cấm địa của đội mình</b>. Thủ môn rất khác các vị trí khác.',
        'Đúng — vì thủ môn là cầu thủ duy nhất được dùng tay trong vòng cấm của đội mình. Lựa chọn <b>Được dùng tay trong vòng cấm địa của đội mình</b> là phương án chuẩn.',
        'Sai — vì đáp án đúng là <b>Được dùng tay trong vòng cấm địa của đội mình</b>. Thủ môn vẫn di chuyển bình thường.',
      ]),
    Q('"Việt vị" (offside) là lỗi gì?', ['Đứng ngoài sân', 'Chuyền sai', 'Đá ra biên', 'Cầu thủ tấn công đứng gần khung thành đối phương sát hơn bóng và hậu vệ thứ 2'], 3, 'Offside: lúc bóng được chuyền, cầu thủ nhận bóng đứng "trước" cả bóng và hậu vệ áp chót đối phương.',
      [
        'Lỗi <b>việt vị (offside)</b> xảy ra khi: vào thời điểm đồng đội chuyền bóng, <code>cầu thủ tấn công đứng gần khung thành đối phương hơn cả bóng và hậu vệ áp chót (thứ 2 từ cuối)</code>.<ul><li>Mục đích của luật: ngăn cầu thủ "rình rập" sẵn ở gần khung thành.</li><li>Xét tại thời điểm chuyền, không phải lúc nhận.</li></ul>',
        'Đây là một luật phức tạp nhưng quan trọng. Nắm được offside giúp em chơi tấn công hợp lệ và đọc tình huống tốt hơn.',
      ],
      [
        'Sai — vì đáp án đúng là <b>Cầu thủ tấn công đứng gần khung thành đối phương sát hơn bóng và hậu vệ thứ 2</b>. Đứng ngoài sân không phải việt vị.',
        'Sai — vì đáp án đúng là <b>Cầu thủ tấn công đứng gần khung thành đối phương sát hơn bóng và hậu vệ thứ 2</b>. Chuyền sai không phải việt vị.',
        'Sai — vì đáp án đúng là <b>Cầu thủ tấn công đứng gần khung thành đối phương sát hơn bóng và hậu vệ thứ 2</b>. Đá ra biên là lỗi khác.',
        'Đúng — vì offside là cầu thủ nhận bóng đứng "trước" cả bóng và hậu vệ áp chót lúc bóng được chuyền. Lựa chọn <b>Cầu thủ tấn công đứng gần khung thành đối phương sát hơn bóng và hậu vệ thứ 2</b> là phương án chuẩn.',
      ]),
    Q('Khi đối phương phạm lỗi, hành xử fair-play là?', ['Mắng chửi', 'Đánh trả', 'Bỏ trận', 'Bình tĩnh, không trả đũa, chờ trọng tài xử lý'], 3, 'Fair-play: kiềm chế, tin tưởng trọng tài, không trả đũa.',
      [
        'Khi đối phương phạm lỗi, hành xử <b>fair-play</b> là <code>bình tĩnh, không trả đũa, để trọng tài xử lý</code>.<ul><li>Trọng tài là người có quyền quyết định và xử phạt.</li><li>Trả đũa khiến chính em bị phạt, đội mất quân số.</li></ul>',
        '<i>Mắng chửi, đánh trả, bỏ trận</i> đều là hành vi phi thể thao, có thể bị thẻ phạt và làm xấu hình ảnh. Kiềm chế cảm xúc là phẩm chất của người chơi bản lĩnh.',
      ],
      [
        'Sai — vì đáp án đúng là <b>Bình tĩnh, không trả đũa, chờ trọng tài xử lý</b>. Mắng chửi là hành vi phi thể thao.',
        'Sai — vì đáp án đúng là <b>Bình tĩnh, không trả đũa, chờ trọng tài xử lý</b>. Đánh trả khiến chính em bị phạt.',
        'Sai — vì đáp án đúng là <b>Bình tĩnh, không trả đũa, chờ trọng tài xử lý</b>. Bỏ trận là thiếu tinh thần thi đấu.',
        'Đúng — vì fair-play là kiềm chế, tin tưởng trọng tài, không trả đũa. Lựa chọn <b>Bình tĩnh, không trả đũa, chờ trọng tài xử lý</b> là phương án chuẩn.',
      ]),
  ]),

  M(23, 'Bóng rổ — kỹ thuật ném rổ', [
    Q('Khi ném rổ, mắt nhìn vào?', ['Nhìn đường bay của bóng sau khi ném', 'Nhìn bảng rổ thay vì vành rổ', 'Người canh', 'Vành rổ (mục tiêu)'], 3, 'Nhìn vào vành rổ giúp tập trung và định hướng cú ném.',
      [
        'Khi ném rổ, mắt nên <b>nhìn vào vành rổ (mục tiêu)</b>.<ul><li>Nhìn mục tiêu giúp <code>định hướng và canh lực</code> chính xác.</li><li>Thường ngắm vào mép trước hoặc tâm vành rổ.</li></ul>',
        '<i>Nhìn đường bay của bóng, nhìn người canh hay chỉ nhìn bảng</i> đều làm mất tập trung vào đích. Tập trung ánh mắt vào vành rổ là nguyên tắc cơ bản của cú ném.',
      ],
      [
        'Sai — vì đáp án đúng là <b>Vành rổ (mục tiêu)</b>. Nhìn đường bay sau khi ném thì đã muộn.',
        'Sai — vì đáp án đúng là <b>Vành rổ (mục tiêu)</b>. Ngắm vành rổ chính xác hơn nhìn bảng (trừ cú ném bảng).',
        'Sai — vì đáp án đúng là <b>Vành rổ (mục tiêu)</b>. Nhìn người canh làm mất tập trung vào đích.',
        'Đúng — vì nhìn vào vành rổ giúp tập trung và định hướng cú ném. Lựa chọn <b>Vành rổ (mục tiêu)</b> là phương án chuẩn.',
      ]),
    Q('"Tay dẫn" và "tay đỡ" khi ném rổ là?', ['Cả hai cùng đẩy', 'Đập bằng đầu', 'Chỉ một tay', 'Tay thuận đẩy bóng, tay không thuận đỡ bên'], 3, 'Tay thuận là tay ném chính; tay kia chỉ đỡ phía bên để bóng cân bằng.',
      [
        'Trong kỹ thuật ném rổ một tay: <ul><li><b>Tay dẫn (tay thuận)</b> là tay <code>đẩy bóng đi</code>, tạo lực và hướng.</li><li><b>Tay đỡ (tay không thuận)</b> đặt <code>bên cạnh bóng</code> để giữ bóng cân bằng trước khi ném, không tham gia đẩy.</li></ul>',
        'Nếu <i>cả hai tay cùng đẩy</i> thì bóng dễ lệch hướng. Sự phân vai rõ giữa tay dẫn và tay đỡ giúp cú ném ổn định và chính xác hơn.',
      ],
      [
        'Sai — vì đáp án đúng là <b>Tay thuận đẩy bóng, tay không thuận đỡ bên</b>. Cả hai cùng đẩy làm bóng dễ lệch hướng.',
        'Sai — vì đáp án đúng là <b>Tay thuận đẩy bóng, tay không thuận đỡ bên</b>. Không đập bóng bằng đầu khi ném rổ.',
        'Sai — vì đáp án đúng là <b>Tay thuận đẩy bóng, tay không thuận đỡ bên</b>. Vẫn dùng hai tay nhưng với vai trò khác nhau.',
        'Đúng — vì tay thuận đẩy bóng còn tay kia đỡ bên để bóng cân bằng. Lựa chọn <b>Tay thuận đẩy bóng, tay không thuận đỡ bên</b> là phương án chuẩn.',
      ]),
    Q('Quỹ đạo cú ném rổ tốt là?', ['Đường thẳng', 'Hình zigzag', 'Hình vòng cung cao', 'Đi xuống'], 2, 'Vòng cung cao → bóng rơi gần thẳng xuống → dễ vào rổ.',
      [
        'Cú ném rổ tốt có quỹ đạo <b>hình vòng cung cao</b>.<ul><li>Vòng cung cao làm bóng rơi <code>gần như thẳng xuống</code> qua vành rổ.</li><li>Góc tiếp cận lớn → "cửa rổ" rộng hơn → dễ vào.</li></ul>',
        'Ném <i>đường thẳng hay đi xuống</i> thì góc vào rổ hẹp, dễ bật ra; "zigzag" là vô lý. Tạo vòng cung hợp lý là bí quyết tăng tỉ lệ ghi điểm.',
      ],
      [
        'Sai — vì đáp án đúng là <b>Hình vòng cung cao</b>. Đường thẳng có góc vào rổ hẹp, dễ bật ra.',
        'Sai — vì đáp án đúng là <b>Hình vòng cung cao</b>. Quỹ đạo zigzag là vô lý.',
        'Đúng — vì vòng cung cao làm bóng rơi gần thẳng xuống, dễ vào rổ. Lựa chọn <b>Hình vòng cung cao</b> là phương án chuẩn.',
        'Sai — vì đáp án đúng là <b>Hình vòng cung cao</b>. Quỹ đạo đi xuống không thể đưa bóng lên rổ.',
      ]),
    Q('Khoảng cách vạch 3 điểm trong bóng rổ FIBA khoảng?', ['6.75 m', '3 m', '1 m', '15 m'], 0, 'FIBA: vạch 3 điểm khoảng 6.75m từ tâm rổ.',
      [
        'Theo luật <b>FIBA</b>, vạch ném <code>3 điểm cách tâm rổ khoảng 6,75 m</code> (ở vị trí vòng cung).<ul><li>Ném từ ngoài vạch này: được 3 điểm.</li><li>Ném trong vạch: 2 điểm; ném phạt: 1 điểm.</li></ul>',
        'Các con số 3m, 1m hay 15m đều không đúng. Biết khoảng cách vạch 3 điểm giúp em hiểu cách tính điểm và lựa chọn vị trí ném hợp lý.',
      ],
      [
        'Đúng — vì FIBA quy định vạch 3 điểm khoảng 6.75m từ tâm rổ. Lựa chọn <b>6.75 m</b> là phương án chuẩn.',
        'Sai — vì đáp án đúng là <b>6.75 m</b>. 3m quá gần, không phải vạch 3 điểm.',
        'Sai — vì đáp án đúng là <b>6.75 m</b>. 1m là khoảng cách vô lý cho vạch 3 điểm.',
        'Sai — vì đáp án đúng là <b>6.75 m</b>. 15m quá xa so với vạch 3 điểm thực tế.',
      ]),
    Q('Số lần phạm lỗi cá nhân tối đa của mỗi cầu thủ trong một trận FIBA là?', ['7 lỗi', '5 lỗi', '3 lỗi', '10 lỗi'], 1, 'FIBA: 5 lỗi cá nhân là bị loại khỏi trận.',
      [
        'Theo luật <b>FIBA</b>, mỗi cầu thủ phạm <code>5 lỗi cá nhân</code> thì bị loại khỏi trận (phải rời sân, có cầu thủ khác thay).<ul><li>Số lỗi được trọng tài ghi nhận trong suốt trận.</li><li>Lỗi gồm: lỗi va chạm phòng ngự, lỗi tấn công…</li></ul>',
        'Hiểu luật lỗi cá nhân giúp cầu thủ <i>chơi tỉnh táo</i>, tránh phạm lỗi không cần thiết để không bị loại sớm. Con số đúng là 5, không phải 3, 7 hay 10.',
      ],
      [
        'Sai — vì đáp án đúng là <b>5 lỗi</b>. 7 lỗi không đúng theo luật FIBA.',
        'Đúng — vì FIBA quy định 5 lỗi cá nhân là bị loại khỏi trận. Lựa chọn <b>5 lỗi</b> là phương án chuẩn.',
        'Sai — vì đáp án đúng là <b>5 lỗi</b>. 3 lỗi chưa đến mức bị loại.',
        'Sai — vì đáp án đúng là <b>5 lỗi</b>. 10 lỗi vượt xa giới hạn của luật.',
      ]),
  ]),

  M(24, 'Bóng chuyền — phát bóng cao tay', [
    Q('Phát bóng cao tay (tennis serve) trong bóng chuyền là?', ['Đá bóng', 'Đẩy bóng nhẹ', 'Ném bóng', 'Tung bóng lên rồi đập bằng bàn tay trên đầu'], 3, 'Phát cao tay: tung bóng + đập từ trên đầu giống tennis serve.',
      [
        '<b>Phát bóng cao tay (tennis serve)</b> là kỹ thuật <code>tung bóng lên rồi đập bằng bàn tay từ trên đầu</code>, động tác giống cú giao bóng tennis.<ul><li>Bóng đi nhanh, mạnh và khó đỡ hơn phát thấp tay.</li><li>Vung tay từ sau ra trước, tiếp xúc bóng ở điểm cao nhất.</li></ul>',
        'Đây không phải đá bóng, ném bóng hay đẩy nhẹ. Phát cao tay là kỹ thuật phát bóng uy lực, được dùng phổ biến trong thi đấu bóng chuyền.',
      ],
      [
        'Sai — vì đáp án đúng là <b>Tung bóng lên rồi đập bằng bàn tay trên đầu</b>. Không đá bóng trong bóng chuyền.',
        'Sai — vì đáp án đúng là <b>Tung bóng lên rồi đập bằng bàn tay trên đầu</b>. Đẩy bóng nhẹ là phát thấp tay, khác cao tay.',
        'Sai — vì đáp án đúng là <b>Tung bóng lên rồi đập bằng bàn tay trên đầu</b>. Ném bóng không phải kỹ thuật phát hợp lệ.',
        'Đúng — vì phát cao tay là tung bóng và đập từ trên đầu giống tennis serve. Lựa chọn <b>Tung bóng lên rồi đập bằng bàn tay trên đầu</b> là phương án chuẩn.',
      ]),
    Q('Khi đập bóng tấn công, điểm tiếp xúc tốt nhất là?', ['Ngang hông', 'Trên cao điểm bật nhảy, hơi trước người', 'Sau lưng', 'Sát đất'], 1, 'Tiếp xúc bóng ở điểm cao nhất + hơi trước người → bóng đi mạnh và xuống.',
      [
        'Khi <b>đập bóng tấn công</b>, điểm tiếp xúc tốt nhất là ở <code>trên cao — đỉnh điểm bật nhảy, hơi chếch trước người</code>.<ul><li>Vị trí cao giúp đập bóng đi xuống (chúi xuống sân đối phương).</li><li>Hơi trước người để vung tay hết tầm, lực mạnh nhất.</li></ul>',
        'Đập khi bóng đã xuống thấp (ngang hông, sát đất) hay để ra sau lưng thì bóng yếu, đi ngang, dễ bị chắn. Chọn đúng điểm chạm là yếu tố then chốt của cú đập.',
      ],
      [
        'Sai — vì đáp án đúng là <b>Trên cao điểm bật nhảy, hơi trước người</b>. Đập ngang hông thì bóng đi ngang, dễ bị chắn.',
        'Đúng — vì tiếp xúc bóng ở điểm cao nhất, hơi trước người làm bóng đi mạnh và xuống. Lựa chọn <b>Trên cao điểm bật nhảy, hơi trước người</b> là phương án chuẩn.',
        'Sai — vì đáp án đúng là <b>Trên cao điểm bật nhảy, hơi trước người</b>. Để bóng ra sau lưng thì cú đập rất yếu.',
        'Sai — vì đáp án đúng là <b>Trên cao điểm bật nhảy, hơi trước người</b>. Đập sát đất không phải kỹ thuật tấn công.',
      ]),
    Q('"Chắn lưới" (block) trong bóng chuyền là?', ['Bật nhảy đưa tay qua lưới chặn cú đập đối phương', 'Phát bóng', 'Chạy lùi', 'Đỡ bóng dưới sân'], 0, 'Block: hai tay đưa qua lưới chắn đường bóng đập của đối phương.',
      [
        '<b>Chắn lưới (block)</b> là động tác <code>bật nhảy, đưa hai tay qua/sát lưới để chặn cú đập của đối phương</code> ngay trên lưới.<ul><li>Là tuyến phòng thủ đầu tiên chặn đòn tấn công.</li><li>Người chắn ở hàng trên (gần lưới).</li></ul>',
        'Block không phải phát bóng, chạy lùi hay đỡ bóng dưới sân. Chắn lưới tốt giúp đội <i>ngăn điểm và phản công</i>, là kỹ thuật quan trọng của hàng trên.',
      ],
      [
        'Đúng — vì block là bật nhảy đưa tay qua lưới chặn cú đập đối phương. Lựa chọn <b>Bật nhảy đưa tay qua lưới chặn cú đập đối phương</b> là phương án chuẩn.',
        'Sai — vì đáp án đúng là <b>Bật nhảy đưa tay qua lưới chặn cú đập đối phương</b>. Phát bóng là kỹ thuật giao bóng, khác block.',
        'Sai — vì đáp án đúng là <b>Bật nhảy đưa tay qua lưới chặn cú đập đối phương</b>. Chạy lùi không phải chắn lưới.',
        'Sai — vì đáp án đúng là <b>Bật nhảy đưa tay qua lưới chặn cú đập đối phương</b>. Đỡ bóng dưới sân là kỹ thuật phòng thủ khác.',
      ]),
    Q('Một set bóng chuyền hiện đại đấu đến bao nhiêu điểm?', ['30 điểm', '21 điểm', '25 điểm (cách 2)', '15 điểm'], 2, 'Bóng chuyền hiện đại: 25 điểm/set, phải hơn ít nhất 2 điểm.',
      [
        'Theo luật bóng chuyền hiện đại, một set thi đấu đến <code>25 điểm</code> và đội thắng phải <b>hơn đối phương ít nhất 2 điểm</b>.<ul><li>Nếu hoà 24–24 thì đấu tiếp đến khi cách biệt 2 điểm.</li><li>Set quyết định (set 5) thường đấu đến 15 điểm.</li></ul>',
        'Các con số 30, 21 hay 15 (cho set thường) đều sai. Hệ thống tính điểm "rally point" hiện đại: mỗi pha bóng đều có điểm, bất kể đội nào giao.',
      ],
      [
        'Sai — vì đáp án đúng là <b>25 điểm (cách 2)</b>. 30 điểm không phải mốc của set bóng chuyền hiện đại.',
        'Sai — vì đáp án đúng là <b>25 điểm (cách 2)</b>. 21 điểm là của cầu lông, không phải bóng chuyền.',
        'Đúng — vì bóng chuyền hiện đại đấu đến 25 điểm/set, phải hơn ít nhất 2 điểm. Lựa chọn <b>25 điểm (cách 2)</b> là phương án chuẩn.',
        'Sai — vì đáp án đúng là <b>25 điểm (cách 2)</b>. 15 điểm là set quyết định (set 5), không phải set thường.',
      ]),
    Q('Khi bóng chạm lưới rồi qua sân đối phương trong lúc đập, được tính?', ['Mất điểm', 'Lỗi chạm lưới, mất quyền giao bóng', 'Phát lại', 'Hợp lệ'], 3, 'Bóng chạm mép lưới rồi vẫn qua sân đối phương → hợp lệ.',
      [
        'Trong bóng chuyền, nếu khi đập mà <b>bóng chạm mép trên lưới rồi vẫn bay qua</b> sân đối phương thì pha bóng đó <code>hợp lệ</code>, tiếp tục chơi.<ul><li>Bóng chạm lưới (không phải người chạm lưới) là được phép.</li><li>Khác hẳn lỗi "người chạm lưới" — đó mới là phạm luật.</li></ul>',
        'Hiểu đúng điểm luật này để không nhầm tưởng "mất điểm" hay "phát lại" khi bóng chạm lưới. Chỉ cần bóng qua đúng sân đối phương là pha bóng được tính.',
      ],
      [
        'Sai — vì đáp án đúng là <b>Hợp lệ</b>. Bóng chạm lưới rồi qua sân không làm mất điểm.',
        'Sai — vì đáp án đúng là <b>Hợp lệ</b>. Bóng chạm lưới khác với người chạm lưới; chỉ người chạm lưới mới là lỗi.',
        'Sai — vì đáp án đúng là <b>Hợp lệ</b>. Không cần phát lại khi bóng chạm lưới và qua sân.',
        'Đúng — vì bóng chạm mép lưới rồi vẫn qua sân đối phương là hợp lệ. Lựa chọn <b>Hợp lệ</b> là phương án chuẩn.',
      ]),
  ]),

  M(25, 'Cầu lông — di chuyển và kỹ thuật phối hợp', [
    Q('Trong sân cầu lông, vị trí "trung tâm" (base) ở đâu?', ['Giữa sân, hơi lùi sau vạch giao bóng', 'Góc sân', 'Sát lưới', 'Sát cuối sân'], 0, 'Base = vị trí về giữa sân sau mỗi pha đánh để đỡ được mọi hướng.',
      [
        'Vị trí <b>"trung tâm" (base)</b> trong cầu lông là điểm <code>giữa sân, hơi lùi sau vạch giao bóng</code>, nơi người chơi trở về sau mỗi pha đánh.<ul><li>Từ đây có thể di chuyển nhanh tới mọi hướng (trên, dưới, trái, phải).</li><li>Giúp đỡ được cú đánh tiếp theo của đối thủ ở bất kỳ vị trí nào.</li></ul>',
        'Đứng cố định ở góc sân, sát lưới hay sát cuối sân sẽ bỏ hở các vùng khác. Luôn trở về base là nguyên tắc di chuyển cơ bản của cầu lông.',
      ],
      [
        'Đúng — vì base là vị trí về giữa sân sau mỗi pha đánh để đỡ được mọi hướng. Lựa chọn <b>Giữa sân, hơi lùi sau vạch giao bóng</b> là phương án chuẩn.',
        'Sai — vì đáp án đúng là <b>Giữa sân, hơi lùi sau vạch giao bóng</b>. Đứng góc sân bỏ hở các vùng khác.',
        'Sai — vì đáp án đúng là <b>Giữa sân, hơi lùi sau vạch giao bóng</b>. Sát lưới thì không đỡ được cầu sâu cuối sân.',
        'Sai — vì đáp án đúng là <b>Giữa sân, hơi lùi sau vạch giao bóng</b>. Sát cuối sân thì không kịp lên đỡ cầu gần lưới.',
      ]),
    Q('Bước "bước chéo" (split step) trong cầu lông dùng để?', ['Sẵn sàng phản xạ trước cú đánh của đối thủ', 'Tấn công', 'Nghỉ ngơi', 'Phát cầu'], 0, 'Split step: bật nhẹ hai chân trước khi đối thủ đánh → phản xạ nhanh hơn.',
      [
        '<b>Split step</b> (bước nhún sẵn sàng) là động tác <code>bật nhẹ hai chân ngay trước khi đối thủ đánh cầu</code>, để cơ thể ở trạng thái sẵn sàng bật đi mọi hướng.<ul><li>Giúp phản xạ và xuất phát nhanh hơn.</li><li>Tiếp đất bằng nửa trước bàn chân, gối hơi khuỵu.</li></ul>',
        'Đây là kỹ thuật di chuyển then chốt giúp người chơi "đọc" và đáp ứng kịp cú đánh của đối thủ. Không phải để tấn công, nghỉ ngơi hay phát cầu.',
      ],
      [
        'Đúng — vì split step là bật nhẹ hai chân trước khi đối thủ đánh để phản xạ nhanh hơn. Lựa chọn <b>Sẵn sàng phản xạ trước cú đánh của đối thủ</b> là phương án chuẩn.',
        'Sai — vì đáp án đúng là <b>Sẵn sàng phản xạ trước cú đánh của đối thủ</b>. Split step là bước chuẩn bị, không phải đòn tấn công.',
        'Sai — vì đáp án đúng là <b>Sẵn sàng phản xạ trước cú đánh của đối thủ</b>. Đây không phải động tác nghỉ ngơi.',
        'Sai — vì đáp án đúng là <b>Sẵn sàng phản xạ trước cú đánh của đối thủ</b>. Split step không liên quan đến phát cầu.',
      ]),
    Q('Khi đối thủ đánh sâu cuối sân, em cần?', ['Tiến lên', 'Quay lưng', 'Di chuyển lùi nhanh, đánh trả từ sau', 'Đứng yên'], 2, 'Di chuyển nhanh về cuối sân để có vị trí đánh trả tốt.',
      [
        'Khi đối thủ đánh cầu <b>sâu về cuối sân</b>, em cần <code>di chuyển lùi nhanh về cuối sân</code> để có vị trí đánh trả tốt.<ul><li>Dùng bước lùi (bước chéo/bước đan) để giữ thăng bằng.</li><li>Đến đúng vị trí dưới cầu, đánh trả bằng cú clear hoặc smash.</li></ul>',
        '<i>Tiến lên, đứng yên</i> thì cầu rơi sau lưng, không đỡ được; <i>quay lưng</i> làm mất tầm nhìn và thăng bằng. Di chuyển lùi đúng kỹ thuật là yếu tố quyết định.',
      ],
      [
        'Sai — vì đáp án đúng là <b>Di chuyển lùi nhanh, đánh trả từ sau</b>. Tiến lên thì cầu rơi sau lưng, không đỡ được.',
        'Sai — vì đáp án đúng là <b>Di chuyển lùi nhanh, đánh trả từ sau</b>. Quay lưng làm mất tầm nhìn và thăng bằng.',
        'Đúng — vì cần di chuyển nhanh về cuối sân để có vị trí đánh trả tốt. Lựa chọn <b>Di chuyển lùi nhanh, đánh trả từ sau</b> là phương án chuẩn.',
        'Sai — vì đáp án đúng là <b>Di chuyển lùi nhanh, đánh trả từ sau</b>. Đứng yên thì không thể đỡ cầu sâu.',
      ]),
    Q('"Bỏ nhỏ giả" (deception drop) là?', ['Đỡ cầu', 'Giả vung như đập rồi đánh nhẹ rơi sát lưới', 'Đập thật mạnh', 'Phát cầu cao'], 1, 'Đánh lừa: vung mạnh như đập nhưng kết thúc nhẹ → đối thủ đứng lùi hụt.',
      [
        '<b>Bỏ nhỏ giả (deception drop)</b> là cú đánh lừa: <code>giả vung mạnh như chuẩn bị đập</code> rồi <code>kết thúc nhẹ, để cầu rơi sát lưới</code>.<ul><li>Đối thủ tưởng em đập nên lùi về phòng thủ.</li><li>Cầu rơi nhẹ ở gần lưới khiến đối thủ không lên kịp.</li></ul>',
        'Đây là kỹ thuật nâng cao đòi hỏi sự khéo léo và động tác giả thật giống động tác thật. Khác với đập thật, đỡ cầu hay phát cầu cao.',
      ],
      [
        'Sai — vì đáp án đúng là <b>Giả vung như đập rồi đánh nhẹ rơi sát lưới</b>. Đỡ cầu là động tác phòng thủ, không phải bỏ nhỏ giả.',
        'Đúng — vì deception drop là vung mạnh như đập nhưng kết thúc nhẹ để đối thủ đứng lùi hụt. Lựa chọn <b>Giả vung như đập rồi đánh nhẹ rơi sát lưới</b> là phương án chuẩn.',
        'Sai — vì đáp án đúng là <b>Giả vung như đập rồi đánh nhẹ rơi sát lưới</b>. Đập thật mạnh không có yếu tố đánh lừa.',
        'Sai — vì đáp án đúng là <b>Giả vung như đập rồi đánh nhẹ rơi sát lưới</b>. Phát cầu cao là cú giao cầu, không phải bỏ nhỏ giả.',
      ]),
    Q('Để cầu chính xác, cần?', ['Không cần luyện', 'Tập kỹ thuật + lặp lại nhiều lần', 'Đánh nhanh', 'Đánh mạnh'], 1, 'Độ chính xác đến từ kỹ thuật chuẩn + lặp lại đủ nhiều.',
      [
        'Để đánh cầu <b>chính xác</b>, cần <code>tập đúng kỹ thuật và lặp lại nhiều lần</code>.<ul><li>Kỹ thuật chuẩn tạo nền tảng cho điểm rơi đúng.</li><li>Lặp lại nhiều giúp hình thành "trí nhớ cơ bắp", đánh ổn định.</li></ul>',
        'Độ chính xác không tự đến mà là kết quả của <i>luyện tập kiên trì</i>. Chỉ "đánh nhanh" hay "đánh mạnh" mà không chuẩn kỹ thuật thì cầu vẫn đi sai.',
      ],
      [
        'Sai — vì đáp án đúng là <b>Tập kỹ thuật + lặp lại nhiều lần</b>. Không luyện thì không thể chính xác.',
        'Đúng — vì độ chính xác đến từ kỹ thuật chuẩn và lặp lại đủ nhiều. Lựa chọn <b>Tập kỹ thuật + lặp lại nhiều lần</b> là phương án chuẩn.',
        'Sai — vì đáp án đúng là <b>Tập kỹ thuật + lặp lại nhiều lần</b>. Đánh nhanh mà sai kỹ thuật thì cầu vẫn đi lệch.',
        'Sai — vì đáp án đúng là <b>Tập kỹ thuật + lặp lại nhiều lần</b>. Đánh mạnh không đồng nghĩa với chính xác.',
      ]),
  ]),

  M(26, 'Đá cầu — kỹ thuật đỡ và đánh cầu nâng cao', [
    Q('Đỡ cầu cao bằng đầu/ngực là kỹ thuật nâng cao trong?', ['Bóng chuyền hơi', 'Đá cầu thi đấu', 'Cầu lông', 'Bóng đá'], 1, 'Đỡ cầu bằng đầu/ngực là kỹ thuật nâng cao trong đá cầu.',
      [
        'Trong <b>đá cầu thi đấu</b>, ngoài tâng/đỡ bằng chân, người chơi còn dùng kỹ thuật nâng cao là <code>đỡ cầu cao bằng đầu hoặc ngực</code>.<ul><li>Dùng khi cầu bay cao, không tiện đỡ bằng chân.</li><li>Đòi hỏi cảm giác cầu và kỹ thuật tốt.</li></ul>',
        'Kỹ thuật này thuộc về đá cầu (môn dùng quả cầu lông gà/cầu đá), không phải cầu lông (dùng vợt), bóng đá hay bóng chuyền hơi. Đỡ đầu/ngực giúp giữ cầu trong tình huống khó.',
      ],
      [
        'Sai — vì đáp án đúng là <b>Đá cầu thi đấu</b>. Đỡ đầu/ngực là kỹ thuật của đá cầu, không phải bóng chuyền hơi.',
        'Đúng — vì đỡ cầu bằng đầu/ngực là kỹ thuật nâng cao trong đá cầu. Lựa chọn <b>Đá cầu thi đấu</b> là phương án chuẩn.',
        'Sai — vì đáp án đúng là <b>Đá cầu thi đấu</b>. Cầu lông dùng vợt, không đỡ cầu bằng đầu/ngực.',
        'Sai — vì đáp án đúng là <b>Đá cầu thi đấu</b>. Bóng đá có đánh đầu nhưng câu hỏi nói về đỡ cầu, thuộc đá cầu.',
      ]),
    Q('Khi muốn chuyền cầu cho đồng đội qua đầu mình, nên?', ['Đẩy mạnh', 'Đá cầu bay vòng cung cao về phía đồng đội', 'Đá ngang', 'Đá thấp ngang'], 1, 'Chuyền cao vòng cung cho đồng đội tấn công cú quyết định.',
      [
        'Khi muốn <b>chuyền cầu cho đồng đội qua đầu mình</b>, nên <code>đá cầu bay vòng cung cao</code> về phía đồng đội.<ul><li>Vòng cung cao giúp cầu rơi đúng tầm cho đồng đội xử lý.</li><li>Tạo điều kiện cho cú tấn công quyết định (đập cầu).</li></ul>',
        'Đá mạnh, đá ngang hay đá thấp ngang đều khó để đồng đội đỡ và tấn công. Đường chuyền vòng cung cao là kiểu nâng cầu lý tưởng trong đá cầu đồng đội.',
      ],
      [
        'Sai — vì đáp án đúng là <b>Đá cầu bay vòng cung cao về phía đồng đội</b>. Đẩy mạnh khiến đồng đội khó đỡ.',
        'Đúng — vì chuyền cao vòng cung giúp đồng đội tấn công cú quyết định. Lựa chọn <b>Đá cầu bay vòng cung cao về phía đồng đội</b> là phương án chuẩn.',
        'Sai — vì đáp án đúng là <b>Đá cầu bay vòng cung cao về phía đồng đội</b>. Đá ngang không đưa cầu qua đầu được.',
        'Sai — vì đáp án đúng là <b>Đá cầu bay vòng cung cao về phía đồng đội</b>. Đá thấp ngang khó để đồng đội tấn công.',
      ]),
    Q('Trong đá cầu thi đấu, vạch lưới cao khoảng bao nhiêu?', ['2.5 m', '3 m', '0.5 m', '1.6 m cho nam (chuẩn quốc tế)'], 3, 'Đá cầu thi đấu: lưới ~1.5-1.6m tuỳ giới tính/giải.',
      [
        'Trong <b>đá cầu thi đấu</b>, chiều cao lưới khoảng <code>1,5–1,6 m</code> (cụ thể ~1,6 m cho nam theo chuẩn quốc tế), thay đổi tuỳ giới tính và giải đấu.<ul><li>Lưới nữ thường thấp hơn nam một chút.</li><li>Chiều cao này tạo độ khó vừa phải cho các pha đập và đỡ.</li></ul>',
        'Các con số 0,5 m, 2,5 m hay 3 m đều không đúng (quá thấp hoặc quá cao). Biết chiều cao lưới giúp người chơi căn cú đánh qua lưới hợp lý.',
      ],
      [
        'Sai — vì đáp án đúng là <b>1.6 m cho nam (chuẩn quốc tế)</b>. 2.5m quá cao so với lưới đá cầu.',
        'Sai — vì đáp án đúng là <b>1.6 m cho nam (chuẩn quốc tế)</b>. 3m là vô lý cho lưới đá cầu.',
        'Sai — vì đáp án đúng là <b>1.6 m cho nam (chuẩn quốc tế)</b>. 0.5m quá thấp.',
        'Đúng — vì đá cầu thi đấu có lưới ~1.5-1.6m tuỳ giới tính/giải. Lựa chọn <b>1.6 m cho nam (chuẩn quốc tế)</b> là phương án chuẩn.',
      ]),
    Q('Khi cầu rơi vào ô đối phương sau cú đập, đội em được?', ['Đá lại', 'Tính điểm', 'Đổi sân', 'Mất điểm'], 1, 'Cầu rơi đúng ô đối phương = ghi điểm.',
      [
        'Trong đá cầu thi đấu, nếu sau cú đập mà <b>cầu rơi vào trong ô (vùng hợp lệ) của đối phương</b> thì đội em <code>được tính điểm</code>.<ul><li>Đối phương không đỡ được hoặc để cầu chạm sân là thua pha đó.</li><li>Hệ thống tính điểm theo từng pha cầu.</li></ul>',
        'Đây là cách ghi điểm cơ bản. Cầu rơi đúng ô đối phương là kết quả tốt, không phải "đá lại", "đổi sân" hay "mất điểm".',
      ],
      [
        'Sai — vì đáp án đúng là <b>Tính điểm</b>. Cầu rơi đúng ô đối phương thì không phải đá lại.',
        'Đúng — vì cầu rơi đúng ô đối phương thì đội em ghi điểm. Lựa chọn <b>Tính điểm</b> là phương án chuẩn.',
        'Sai — vì đáp án đúng là <b>Tính điểm</b>. Đổi sân chỉ diễn ra giữa các hiệp, không phải sau mỗi pha cầu.',
        'Sai — vì đáp án đúng là <b>Tính điểm</b>. Đội em ghi điểm chứ không mất điểm.',
      ]),
    Q('Để rèn phản xạ đá cầu, nên?', ['Chỉ xem', 'Tập một mình mãi', 'Không tập', 'Tập đôi/nhóm thường xuyên'], 3, 'Tập đôi/nhóm tạo tình huống đa dạng → rèn phản xạ tốt.',
      [
        'Để <b>rèn phản xạ đá cầu</b>, nên <code>tập đôi hoặc tập nhóm thường xuyên</code>.<ul><li>Tập với người khác tạo ra các đường cầu đa dạng, bất ngờ.</li><li>Phải liên tục phản ứng → rèn phản xạ và sự nhanh nhẹn.</li></ul>',
        '<i>Chỉ xem, không tập</i> thì không có tiến bộ; <i>tập một mình mãi</i> thì thiếu sự biến hoá của đối thủ. Tập đôi/nhóm là cách hiệu quả nhất để nâng cao phản xạ.',
      ],
      [
        'Sai — vì đáp án đúng là <b>Tập đôi/nhóm thường xuyên</b>. Chỉ xem thì không rèn được phản xạ.',
        'Sai — vì đáp án đúng là <b>Tập đôi/nhóm thường xuyên</b>. Tập một mình mãi thiếu tình huống đa dạng.',
        'Sai — vì đáp án đúng là <b>Tập đôi/nhóm thường xuyên</b>. Không tập thì không có tiến bộ.',
        'Đúng — vì tập đôi/nhóm tạo tình huống đa dạng giúp rèn phản xạ tốt. Lựa chọn <b>Tập đôi/nhóm thường xuyên</b> là phương án chuẩn.',
      ]),
  ]),

  M(27, 'Thể dục liên hoàn — bài có dụng cụ', [
    Q('Bài thể dục với cờ/gậy/vòng có lợi ích gì?', ['Làm chậm bài', 'Chỉ phù hợp với học sinh nữ', 'Tăng tính thẩm mỹ và rèn phối hợp tay-mắt', 'Chỉ trang trí'], 2, 'Dụng cụ giúp bài đẹp hơn, rèn phối hợp mắt-tay-cơ thể.',
      [
        '<b>Bài thể dục với dụng cụ</b> (cờ, gậy, vòng…) có nhiều lợi ích:<ul><li><code>Tăng tính thẩm mỹ</code> — bài biểu diễn đẹp mắt, sinh động.</li><li><code>Rèn phối hợp tay – mắt</code> và toàn thân khi điều khiển dụng cụ.</li></ul>',
        'Dụng cụ không "làm chậm bài" hay "chỉ trang trí", cũng không phân biệt nam/nữ. Đây là hình thức tập đòi hỏi sự khéo léo và nhịp điệu cao hơn bài tay không.',
      ],
      [
        'Sai — vì đáp án đúng là <b>Tăng tính thẩm mỹ và rèn phối hợp tay-mắt</b>. Dụng cụ làm bài sinh động hơn, không làm chậm.',
        'Sai — vì đáp án đúng là <b>Tăng tính thẩm mỹ và rèn phối hợp tay-mắt</b>. Bài dụng cụ phù hợp cả nam và nữ.',
        'Đúng — vì dụng cụ giúp bài đẹp hơn và rèn phối hợp mắt-tay-cơ thể. Lựa chọn <b>Tăng tính thẩm mỹ và rèn phối hợp tay-mắt</b> là phương án chuẩn.',
        'Sai — vì đáp án đúng là <b>Tăng tính thẩm mỹ và rèn phối hợp tay-mắt</b>. Dụng cụ có giá trị rèn luyện, không chỉ trang trí.',
      ]),
    Q('Khi cầm dụng cụ tập, an toàn cần?', ['Giữ chắc, không vung ra phía bạn', 'Vung ngẫu nhiên', 'Không cần ý', 'Quăng dụng cụ'], 0, 'An toàn: cầm chắc, kiểm soát biên độ, không gây va chạm với bạn.',
      [
        'Khi cầm <b>dụng cụ tập</b>, quy tắc an toàn là <code>giữ chắc, kiểm soát biên độ và không vung dụng cụ về phía bạn</code>.<ul><li>Giữ khoảng cách an toàn với người xung quanh.</li><li>Kiểm soát lực và hướng vung để không gây va chạm.</li></ul>',
        '<i>Vung ngẫu nhiên, quăng dụng cụ hay không để ý</i> đều có thể gây thương tích cho bản thân và bạn bè. An toàn luôn là ưu tiên hàng đầu khi tập với dụng cụ.',
      ],
      [
        'Đúng — vì an toàn cần cầm chắc, kiểm soát biên độ, không gây va chạm với bạn. Lựa chọn <b>Giữ chắc, không vung ra phía bạn</b> là phương án chuẩn.',
        'Sai — vì đáp án đúng là <b>Giữ chắc, không vung ra phía bạn</b>. Vung ngẫu nhiên dễ gây va chạm, thương tích.',
        'Sai — vì đáp án đúng là <b>Giữ chắc, không vung ra phía bạn</b>. Luôn phải để ý an toàn khi tập với dụng cụ.',
        'Sai — vì đáp án đúng là <b>Giữ chắc, không vung ra phía bạn</b>. Quăng dụng cụ rất nguy hiểm.',
      ]),
    Q('Khi tập thể dục đồng diễn (lớn), điều quan trọng nhất là?', ['Đồng đều: cùng nhịp, cùng động tác, cùng hướng', 'Mỗi người tự do', 'Mỗi người khác', 'Càng nhanh càng tốt'], 0, 'Đồng diễn cần tính đồng đều cao → tập luyện kỹ và đúng nhịp.',
      [
        'Trong <b>thể dục đồng diễn</b> (số đông), điều quan trọng nhất là <code>tính đồng đều: cùng nhịp, cùng động tác, cùng hướng</code>.<ul><li>Cả tập thể chuyển động như một → tạo hiệu ứng thị giác mạnh.</li><li>Đòi hỏi tập luyện kỹ và tuân thủ nhịp chung.</li></ul>',
        '<i>Mỗi người tự do, mỗi người khác hay càng nhanh càng tốt</i> đều phá vỡ sự đồng bộ — linh hồn của đồng diễn. Kỷ luật và phối hợp là yếu tố then chốt.',
      ],
      [
        'Đúng — vì đồng diễn cần tính đồng đều cao, tập kỹ và đúng nhịp. Lựa chọn <b>Đồng đều: cùng nhịp, cùng động tác, cùng hướng</b> là phương án chuẩn.',
        'Sai — vì đáp án đúng là <b>Đồng đều: cùng nhịp, cùng động tác, cùng hướng</b>. Mỗi người tự do phá vỡ sự đồng bộ.',
        'Sai — vì đáp án đúng là <b>Đồng đều: cùng nhịp, cùng động tác, cùng hướng</b>. Mỗi người làm khác nhau làm hỏng đồng diễn.',
        'Sai — vì đáp án đúng là <b>Đồng đều: cùng nhịp, cùng động tác, cùng hướng</b>. Càng nhanh càng dễ lệch nhịp.',
      ]),
    Q('Bài thể dục liên hoàn cuối thường có phần?', ['Tăng tốc', 'Nhảy mạnh', 'Điều hoà (thả lỏng) toàn thân', 'Hét to'], 2, 'Kết bài là động tác điều hoà/thả lỏng để cơ thể bình tĩnh lại.',
      [
        'Phần <b>kết thúc bài thể dục liên hoàn</b> thường là động tác <code>điều hoà (thả lỏng) toàn thân</code>.<ul><li>Hít thở sâu, vươn duỗi nhẹ nhàng.</li><li>Giúp nhịp tim hạ dần, cơ thể trở về trạng thái bình thường.</li></ul>',
        'Kết bài bằng "tăng tốc, nhảy mạnh hay hét to" là không hợp lý — cần hạ nhiệt cơ thể sau khi vận động. Đây cũng giống nguyên tắc cool-down cuối buổi tập.',
      ],
      [
        'Sai — vì đáp án đúng là <b>Điều hoà (thả lỏng) toàn thân</b>. Kết bài cần hạ nhiệt, không phải tăng tốc.',
        'Sai — vì đáp án đúng là <b>Điều hoà (thả lỏng) toàn thân</b>. Nhảy mạnh ở cuối bài là không hợp lý.',
        'Đúng — vì kết bài là động tác điều hoà/thả lỏng để cơ thể bình tĩnh lại. Lựa chọn <b>Điều hoà (thả lỏng) toàn thân</b> là phương án chuẩn.',
        'Sai — vì đáp án đúng là <b>Điều hoà (thả lỏng) toàn thân</b>. Hét to không phải động tác kết thúc bài.',
      ]),
    Q('Lợi ích nổi bật của thể dục liên hoàn nhóm là?', ['Rèn tinh thần kỷ luật và đoàn kết', 'Chỉ tốn sức', 'Gây ức chế', 'Chỉ rèn riêng cơ tay và cơ chân'], 0, 'Thể dục liên hoàn nhóm rèn kỷ luật, đoàn kết, sự kiên trì.',
      [
        '<b>Thể dục liên hoàn nhóm</b> có lợi ích nổi bật là <code>rèn tinh thần kỷ luật và đoàn kết</code>.<ul><li>Cả nhóm phải phối hợp đồng đều → rèn kỷ luật.</li><li>Cùng tập, cùng nhớ bài → gắn kết, đoàn kết.</li><li>Rèn cả sự kiên trì và ý thức tập thể.</li></ul>',
        'Vì là bài tập toàn thân theo nhóm nên không chỉ "rèn riêng cơ tay, cơ chân" hay "chỉ tốn sức". Đây là hoạt động vừa khoẻ người vừa bồi dưỡng phẩm chất.',
      ],
      [
        'Đúng — vì thể dục liên hoàn nhóm rèn kỷ luật, đoàn kết và sự kiên trì. Lựa chọn <b>Rèn tinh thần kỷ luật và đoàn kết</b> là phương án chuẩn.',
        'Sai — vì đáp án đúng là <b>Rèn tinh thần kỷ luật và đoàn kết</b>. Lợi ích nhiều mặt chứ không chỉ tốn sức.',
        'Sai — vì đáp án đúng là <b>Rèn tinh thần kỷ luật và đoàn kết</b>. Tập đúng cách tạo niềm vui, không gây ức chế.',
        'Sai — vì đáp án đúng là <b>Rèn tinh thần kỷ luật và đoàn kết</b>. Bài tác động toàn thân, không chỉ cơ tay và cơ chân.',
      ]),
  ]),

  M(28, 'Thể lực chung — bài tập tăng cường', [
    Q('Bài "plank" (chống đẩy giữ) chủ yếu rèn nhóm cơ nào?', ['Chỉ chân', 'Chỉ tay', 'Cổ tay và cẳng tay', 'Cơ lõi (bụng, lưng, mông)'], 3, 'Plank rèn core (cơ lõi) — bụng, lưng dưới, mông.',
      [
        'Bài <b>plank</b> (giữ tư thế chống đẩy bằng cẳng tay) chủ yếu rèn <code>cơ lõi (core)</code> — gồm <b>bụng, lưng dưới và mông</b>.<ul><li>Cơ lõi khoẻ giúp giữ thăng bằng, tư thế đúng.</li><li>Hỗ trợ mọi vận động và bảo vệ cột sống.</li></ul>',
        'Plank giữ thân thẳng như tấm ván nên không chủ yếu rèn riêng tay, chân hay cổ tay. Đây là bài tập core nền tảng, rất hiệu quả và an toàn.',
      ],
      [
        'Sai — vì đáp án đúng là <b>Cơ lõi (bụng, lưng, mông)</b>. Plank không chỉ rèn chân.',
        'Sai — vì đáp án đúng là <b>Cơ lõi (bụng, lưng, mông)</b>. Plank không chỉ rèn tay.',
        'Sai — vì đáp án đúng là <b>Cơ lõi (bụng, lưng, mông)</b>. Cổ tay, cẳng tay chỉ giữ tư thế, không phải nhóm cơ chính.',
        'Đúng — vì plank rèn core (cơ lõi) gồm bụng, lưng dưới, mông. Lựa chọn <b>Cơ lõi (bụng, lưng, mông)</b> là phương án chuẩn.',
      ]),
    Q('"Chống đẩy" (push-up) rèn nhóm cơ nào?', ['Ngực, tay sau (triceps), vai', 'Cơ đùi sau và bắp chân', 'Chỉ bụng', 'Chỉ chân'], 0, 'Push-up: ngực + triceps + vai trước + cơ lõi giữ thăng bằng.',
      [
        'Bài <b>chống đẩy (push-up)</b> rèn các nhóm cơ thân trên: <code>ngực, cơ tay sau (triceps) và vai trước</code>, đồng thời cơ lõi giữ thăng bằng cho thân.<ul><li>Là bài tập sức mạnh thân trên kinh điển, không cần dụng cụ.</li><li>Có thể điều chỉnh độ khó (quỳ gối, nghiêng…).</li></ul>',
        'Push-up không rèn chủ yếu cơ chân hay riêng cơ bụng. Đây là bài bổ trợ tuyệt vời cho các môn cần lực đẩy của tay và vai.',
      ],
      [
        'Đúng — vì push-up rèn ngực, triceps, vai trước và cơ lõi giữ thăng bằng. Lựa chọn <b>Ngực, tay sau (triceps), vai</b> là phương án chuẩn.',
        'Sai — vì đáp án đúng là <b>Ngực, tay sau (triceps), vai</b>. Đùi sau và bắp chân là nhóm cơ chân, không phải push-up.',
        'Sai — vì đáp án đúng là <b>Ngực, tay sau (triceps), vai</b>. Push-up không chỉ rèn bụng.',
        'Sai — vì đáp án đúng là <b>Ngực, tay sau (triceps), vai</b>. Push-up là bài thân trên, không phải bài chân.',
      ]),
    Q('Bài "squat" (ngồi xổm) rèn?', ['Cơ đùi, mông, lưng dưới', 'Cơ ngực và cơ vai', 'Bàn tay', 'Cánh tay'], 0, 'Squat là bài "vua" của tập chân: đùi trước, đùi sau, mông, core.',
      [
        'Bài <b>squat (ngồi xổm)</b> được mệnh danh là bài "vua" của tập chân, rèn <code>cơ đùi (trước và sau), mông và lưng dưới</code>.<ul><li>Hạ thấp người như ngồi ghế rồi đứng lên.</li><li>Giữ lưng thẳng, gối không vượt quá mũi chân.</li></ul>',
        'Squat tập trung vào thân dưới nên không rèn cơ ngực, vai, bàn tay hay cánh tay. Đây là bài nền tảng giúp tăng sức mạnh và sức bật cho chân.',
      ],
      [
        'Đúng — vì squat rèn đùi trước, đùi sau, mông và core. Lựa chọn <b>Cơ đùi, mông, lưng dưới</b> là phương án chuẩn.',
        'Sai — vì đáp án đúng là <b>Cơ đùi, mông, lưng dưới</b>. Cơ ngực và vai được rèn bởi push-up, không phải squat.',
        'Sai — vì đáp án đúng là <b>Cơ đùi, mông, lưng dưới</b>. Squat không rèn bàn tay.',
        'Sai — vì đáp án đúng là <b>Cơ đùi, mông, lưng dưới</b>. Squat là bài chân, không phải bài cánh tay.',
      ]),
    Q('Để tập thể lực an toàn, cần?', ['Bỏ qua khởi động', 'Tư thế đúng, tăng dần khối lượng, không quá sức', 'Tập càng nặng càng tốt', 'Không cần kỹ thuật'], 1, 'Nguyên tắc: kỹ thuật trước số lượng/khối lượng; tăng dần để tránh chấn thương.',
      [
        'Để <b>tập thể lực an toàn</b>, cần: <code>tư thế đúng, tăng dần khối lượng, không tập quá sức</code>.<ul><li>Kỹ thuật đúng trước, số lượng/khối lượng sau.</li><li>Tăng tải từ từ để cơ thể thích nghi.</li><li>Lắng nghe cơ thể, không cố quá mức.</li></ul>',
        '<i>Bỏ qua khởi động, tập càng nặng càng tốt, không cần kỹ thuật</i> đều dễ gây chấn thương nghiêm trọng. Tập đúng và tăng dần mới bền và an toàn.',
      ],
      [
        'Sai — vì đáp án đúng là <b>Tư thế đúng, tăng dần khối lượng, không quá sức</b>. Bỏ qua khởi động dễ chấn thương.',
        'Đúng — vì cần kỹ thuật trước số lượng và tăng dần để tránh chấn thương. Lựa chọn <b>Tư thế đúng, tăng dần khối lượng, không quá sức</b> là phương án chuẩn.',
        'Sai — vì đáp án đúng là <b>Tư thế đúng, tăng dần khối lượng, không quá sức</b>. Tập càng nặng càng dễ chấn thương.',
        'Sai — vì đáp án đúng là <b>Tư thế đúng, tăng dần khối lượng, không quá sức</b>. Kỹ thuật là yếu tố an toàn quan trọng nhất.',
      ]),
    Q('Sau buổi tập thể lực, cơ "mỏi nhẹ" 1-2 ngày là?', ['Cần đi viện', 'Bình thường (DOMS)', 'Phải dừng tập', 'Bất thường, nguy hiểm'], 1, 'DOMS = mỏi cơ chậm, bình thường khi tập tải mới; nghỉ + ăn uống đủ sẽ hồi.',
      [
        'Cảm giác <b>mỏi cơ nhẹ 1–2 ngày</b> sau buổi tập thể lực (nhất là tập tải mới) là hiện tượng <code>bình thường, gọi là DOMS</code> (đau mỏi cơ khởi phát chậm).<ul><li>Do các vi tổn thương nhỏ ở cơ khi tập, cơ thể tự phục hồi.</li><li>Nghỉ ngơi, ăn uống đủ chất sẽ hết sau vài ngày.</li></ul>',
        'DOMS không cần đi viện hay coi là nguy hiểm. Tuy nhiên nếu đau dữ dội, sưng to bất thường thì mới cần lưu ý. Mỏi nhẹ là dấu hiệu cơ đang thích nghi và khoẻ lên.',
      ],
      [
        'Sai — vì đáp án đúng là <b>Bình thường (DOMS)</b>. Mỏi cơ nhẹ không cần đi viện.',
        'Đúng — vì DOMS là mỏi cơ chậm, bình thường khi tập tải mới và sẽ tự hồi. Lựa chọn <b>Bình thường (DOMS)</b> là phương án chuẩn.',
        'Sai — vì đáp án đúng là <b>Bình thường (DOMS)</b>. Không cần dừng tập, chỉ cần nghỉ hồi phục hợp lý.',
        'Sai — vì đáp án đúng là <b>Bình thường (DOMS)</b>. Mỏi nhẹ là hiện tượng bình thường, không nguy hiểm.',
      ]),
  ]),

  M(29, 'Dinh dưỡng cho người tập thể thao', [
    Q('Trước khi tập thể thao 1-2 tiếng nên ăn?', ['Nhẹ, dễ tiêu (chuối, bánh mì)', 'Uống nước ngọt có ga cho nhanh tỉnh', 'Ăn no nê', 'Đồ chiên mỡ'], 0, 'Bữa trước tập: nhẹ và dễ tiêu để có năng lượng mà không nặng bụng.',
      [
        '<b>Trước khi tập 1–2 tiếng</b>, nên ăn <code>nhẹ, dễ tiêu</code> như chuối, bánh mì, ngũ cốc.<ul><li>Cung cấp năng lượng (carbohydrate) cho buổi tập.</li><li>Dễ tiêu nên không gây nặng bụng, đầy hơi khi vận động.</li></ul>',
        '<i>Ăn no nê hay đồ chiên mỡ</i> làm dạ dày nặng, dễ xóc bụng, buồn nôn khi tập; <i>nước ngọt có ga</i> gây đầy hơi và không tốt. Bữa ăn nhẹ, đúng giờ là tối ưu.',
      ],
      [
        'Đúng — vì bữa trước tập nên nhẹ, dễ tiêu để có năng lượng mà không nặng bụng. Lựa chọn <b>Nhẹ, dễ tiêu (chuối, bánh mì)</b> là phương án chuẩn.',
        'Sai — vì đáp án đúng là <b>Nhẹ, dễ tiêu (chuối, bánh mì)</b>. Nước ngọt có ga gây đầy hơi, không tốt khi tập.',
        'Sai — vì đáp án đúng là <b>Nhẹ, dễ tiêu (chuối, bánh mì)</b>. Ăn no nê làm dạ dày nặng, dễ xóc bụng.',
        'Sai — vì đáp án đúng là <b>Nhẹ, dễ tiêu (chuối, bánh mì)</b>. Đồ chiên mỡ khó tiêu, gây nặng bụng.',
      ]),
    Q('Sau tập, cơ thể cần?', ['Chỉ uống nước có ga', 'Nhịn ăn', 'Ngủ ngay', 'Bù nước, đạm và carb để phục hồi'], 3, 'Sau tập: nước + carb + đạm trong 30-60 phút giúp phục hồi tốt.',
      [
        '<b>Sau khi tập</b>, cơ thể cần <code>bù nước, đạm (protein) và carbohydrate</code> để phục hồi.<ul><li><b>Nước:</b> bù lượng mất qua mồ hôi.</li><li><b>Carb:</b> nạp lại năng lượng đã tiêu hao.</li><li><b>Đạm:</b> giúp sửa chữa và phát triển cơ bắp.</li></ul>',
        'Khung "vàng" để nạp dinh dưỡng là <i>30–60 phút sau tập</i>. <i>Nhịn ăn, ngủ ngay hay chỉ uống nước có ga</i> đều làm cơ thể phục hồi kém.',
      ],
      [
        'Sai — vì đáp án đúng là <b>Bù nước, đạm và carb để phục hồi</b>. Chỉ nước có ga không đủ và không tốt.',
        'Sai — vì đáp án đúng là <b>Bù nước, đạm và carb để phục hồi</b>. Nhịn ăn làm cơ thể phục hồi kém.',
        'Sai — vì đáp án đúng là <b>Bù nước, đạm và carb để phục hồi</b>. Ngủ ngay mà không bù dinh dưỡng thì phục hồi chậm.',
        'Đúng — vì sau tập cần nước, carb và đạm trong 30-60 phút để phục hồi tốt. Lựa chọn <b>Bù nước, đạm và carb để phục hồi</b> là phương án chuẩn.',
      ]),
    Q('Nước là thành phần chiếm bao nhiêu phần trăm cơ thể người?', ['90%', '100%', '20%', 'Khoảng 60-70%'], 3, 'Cơ thể người có ~60-70% nước → uống đủ rất quan trọng.',
      [
        '<b>Nước</b> chiếm khoảng <code>60–70% trọng lượng cơ thể người</code>.<ul><li>Tham gia mọi quá trình: tuần hoàn, điều hoà nhiệt, tiêu hoá…</li><li>Vận động ra nhiều mồ hôi → mất nước nhiều → cần bù kịp thời.</li></ul>',
        'Các con số 20%, 90% hay 100% đều sai. Hiểu cơ thể chủ yếu là nước giúp em ý thức tầm quan trọng của việc uống đủ nước, nhất là khi tập thể thao.',
      ],
      [
        'Sai — vì đáp án đúng là <b>Khoảng 60-70%</b>. 90% quá cao so với tỉ lệ nước trong cơ thể.',
        'Sai — vì đáp án đúng là <b>Khoảng 60-70%</b>. Cơ thể không thể 100% là nước.',
        'Sai — vì đáp án đúng là <b>Khoảng 60-70%</b>. 20% quá thấp.',
        'Đúng — vì cơ thể người có khoảng 60-70% là nước. Lựa chọn <b>Khoảng 60-70%</b> là phương án chuẩn.',
      ]),
    Q('Vận động viên nên uống nước thế nào?', ['Trước - trong - sau khi tập, đủ nhu cầu', 'Chỉ trước tập', 'Chỉ khi khát', 'Càng ít càng tốt'], 0, 'Uống đều cả trước, trong, sau tập; không đợi khát mới uống.',
      [
        'Vận động viên nên uống nước <b>trước – trong – sau khi tập</b>, đủ theo nhu cầu cơ thể.<ul><li><b>Trước:</b> để cơ thể không bị thiếu nước khi bắt đầu.</li><li><b>Trong:</b> từng ngụm nhỏ, bù lượng mất qua mồ hôi.</li><li><b>Sau:</b> bù lại đầy đủ lượng đã mất.</li></ul>',
        '<i>Chỉ uống khi khát</i> là sai — khi thấy khát thì cơ thể đã bắt đầu mất nước. <i>Càng ít càng tốt</i> rất nguy hiểm. Uống đều và chủ động là nguyên tắc đúng.',
      ],
      [
        'Đúng — vì cần uống đều cả trước, trong, sau tập, không đợi khát mới uống. Lựa chọn <b>Trước - trong - sau khi tập, đủ nhu cầu</b> là phương án chuẩn.',
        'Sai — vì đáp án đúng là <b>Trước - trong - sau khi tập, đủ nhu cầu</b>. Chỉ uống trước tập thì thiếu nước trong và sau.',
        'Sai — vì đáp án đúng là <b>Trước - trong - sau khi tập, đủ nhu cầu</b>. Khi thấy khát thì cơ thể đã mất nước.',
        'Sai — vì đáp án đúng là <b>Trước - trong - sau khi tập, đủ nhu cầu</b>. Uống càng ít càng nguy hiểm cho cơ thể.',
      ]),
    Q('Đồ uống có ga / đường cao trong khi tập có hại vì?', ['Tăng sức nhanh', 'Không ảnh hưởng', 'Khó tiêu, gây xóc bụng, làm chậm hấp thụ nước', 'Tốt cho cơ thể'], 2, 'Đường cao trong nước ngọt làm chậm tiêu hoá, có thể gây xóc bụng khi tập.',
      [
        '<b>Đồ uống có ga / đường cao</b> uống trong khi tập có hại vì <code>khó tiêu, gây xóc bụng và làm chậm hấp thụ nước</code>.<ul><li>Đường nồng độ cao làm chậm việc nước đi vào cơ thể.</li><li>Ga (CO₂) gây đầy hơi, ợ, khó chịu khi vận động.</li></ul>',
        'Vì vậy đồ uống có ga/nhiều đường <i>không "tăng sức nhanh"</i> hay "tốt cho cơ thể" khi tập. Nước lọc (hoặc nước điện giải loãng cho buổi tập dài) mới là lựa chọn đúng.',
      ],
      [
        'Sai — vì đáp án đúng là <b>Khó tiêu, gây xóc bụng, làm chậm hấp thụ nước</b>. Đồ ngọt có ga không tăng sức nhanh khi tập.',
        'Sai — vì đáp án đúng là <b>Khó tiêu, gây xóc bụng, làm chậm hấp thụ nước</b>. Đồ uống có ga thực sự ảnh hưởng xấu.',
        'Đúng — vì đường cao làm chậm tiêu hoá, hấp thụ nước và có thể gây xóc bụng khi tập. Lựa chọn <b>Khó tiêu, gây xóc bụng, làm chậm hấp thụ nước</b> là phương án chuẩn.',
        'Sai — vì đáp án đúng là <b>Khó tiêu, gây xóc bụng, làm chậm hấp thụ nước</b>. Đồ uống có ga/đường cao không tốt khi tập.',
      ]),
  ]),

  M(30, 'Trò chơi dân gian vận động', [
    Q('Trò chơi "kéo co" rèn?', ['Phản xạ', 'Khéo léo', 'Sức mạnh, tinh thần đồng đội', 'Cân bằng'], 2, 'Kéo co rèn sức kéo + sự đồng lòng của cả đội.',
      [
        'Trò chơi dân gian <b>"kéo co"</b> chủ yếu rèn <code>sức mạnh và tinh thần đồng đội</code>.<ul><li>Cần lực kéo của cả nhóm.</li><li>Phải phối hợp đồng loạt, đồng lòng mới thắng.</li></ul>',
        'Kéo co không nhằm rèn phản xạ, sự khéo léo hay cân bằng. Đây là trò chơi tập thể tiêu biểu, đề cao sức mạnh và sự đoàn kết của cả đội.',
      ],
      [
        'Sai — vì đáp án đúng là <b>Sức mạnh, tinh thần đồng đội</b>. Kéo co không chủ yếu rèn phản xạ.',
        'Sai — vì đáp án đúng là <b>Sức mạnh, tinh thần đồng đội</b>. Khéo léo không phải trọng tâm của kéo co.',
        'Đúng — vì kéo co rèn sức kéo và sự đồng lòng của cả đội. Lựa chọn <b>Sức mạnh, tinh thần đồng đội</b> là phương án chuẩn.',
        'Sai — vì đáp án đúng là <b>Sức mạnh, tinh thần đồng đội</b>. Cân bằng không phải mục tiêu chính của kéo co.',
      ]),
    Q('Trò "nhảy dây" rèn chủ yếu?', ['Chỉ trí nhớ', 'Chỉ tay', 'Sức bền, phối hợp tay-chân, nhịp điệu', 'Chỉ rèn cơ bắp tay'], 2, 'Nhảy dây là bài tập tim mạch + phối hợp + nhịp điệu rất tốt.',
      [
        'Trò <b>"nhảy dây"</b> rèn chủ yếu <code>sức bền (tim mạch), khả năng phối hợp tay – chân và cảm giác nhịp điệu</code>.<ul><li>Nhảy liên tục → rèn sức bền tim phổi.</li><li>Quay dây và nhảy phải đồng bộ → phối hợp tay-chân.</li><li>Giữ nhịp đều → rèn nhịp điệu.</li></ul>',
        'Nhảy dây là một trong những bài tập đơn giản mà hiệu quả nhất, không chỉ rèn riêng tay hay trí nhớ. Rất tốt cho học sinh, dễ tập mọi lúc mọi nơi.',
      ],
      [
        'Sai — vì đáp án đúng là <b>Sức bền, phối hợp tay-chân, nhịp điệu</b>. Nhảy dây rèn thể lực, không chỉ trí nhớ.',
        'Sai — vì đáp án đúng là <b>Sức bền, phối hợp tay-chân, nhịp điệu</b>. Nhảy dây dùng cả tay và chân.',
        'Đúng — vì nhảy dây rèn tim mạch, phối hợp và nhịp điệu rất tốt. Lựa chọn <b>Sức bền, phối hợp tay-chân, nhịp điệu</b> là phương án chuẩn.',
        'Sai — vì đáp án đúng là <b>Sức bền, phối hợp tay-chân, nhịp điệu</b>. Nhảy dây không chỉ rèn cơ bắp tay.',
      ]),
    Q('Trò "rồng rắn lên mây" giúp ích gì?', ['Chỉ phù hợp với trẻ mẫu giáo', 'Vận động + tinh thần tập thể + phản xạ', 'Mệt vô lý', 'Chỉ trang trí'], 1, 'Trò chơi dân gian vận động vừa rèn thể chất vừa rèn tinh thần tập thể.',
      [
        'Trò <b>"rồng rắn lên mây"</b> giúp <code>vận động, rèn tinh thần tập thể và phản xạ</code>.<ul><li>Cả nhóm nối đuôi di chuyển, né tránh → vận động và phản xạ.</li><li>Phối hợp nhịp nhàng để "đầu rồng" bảo vệ "đuôi" → tinh thần tập thể.</li></ul>',
        'Đây là trò chơi dân gian phù hợp với nhiều lứa tuổi, không chỉ trẻ mẫu giáo, và rất có ý nghĩa giáo dục — vừa vui vừa rèn luyện.',
      ],
      [
        'Sai — vì đáp án đúng là <b>Vận động + tinh thần tập thể + phản xạ</b>. Trò chơi phù hợp nhiều lứa tuổi, không chỉ mẫu giáo.',
        'Đúng — vì trò chơi dân gian vận động vừa rèn thể chất vừa rèn tinh thần tập thể. Lựa chọn <b>Vận động + tinh thần tập thể + phản xạ</b> là phương án chuẩn.',
        'Sai — vì đáp án đúng là <b>Vận động + tinh thần tập thể + phản xạ</b>. Trò chơi có giá trị rèn luyện, không "mệt vô lý".',
        'Sai — vì đáp án đúng là <b>Vận động + tinh thần tập thể + phản xạ</b>. Trò chơi có ý nghĩa giáo dục, không chỉ trang trí.',
      ]),
    Q('Trò "đá cầu lá chuối/cầu lông gà" là dạng đá cầu?', ['Truyền thống dân gian', 'Của nước ngoài', 'Hiện đại', 'Không tồn tại'], 0, 'Trò đá cầu lá chuối/cầu lông gà có nguồn gốc dân gian Việt.',
      [
        'Trò <b>"đá cầu lá chuối / cầu lông gà"</b> là dạng đá cầu <code>truyền thống dân gian Việt Nam</code>.<ul><li>Quả cầu được làm thủ công từ lá chuối, lông gà, đồng xu…</li><li>Là tiền thân của môn đá cầu hiện đại.</li></ul>',
        'Đây là nét đẹp văn hoá dân gian, không phải trò "của nước ngoài" hay "hiện đại". Gìn giữ trò chơi dân gian là gìn giữ bản sắc văn hoá dân tộc.',
      ],
      [
        'Đúng — vì đá cầu lá chuối/cầu lông gà có nguồn gốc dân gian Việt. Lựa chọn <b>Truyền thống dân gian</b> là phương án chuẩn.',
        'Sai — vì đáp án đúng là <b>Truyền thống dân gian</b>. Đây là trò chơi dân gian Việt, không phải của nước ngoài.',
        'Sai — vì đáp án đúng là <b>Truyền thống dân gian</b>. Đây là trò truyền thống, không phải hiện đại.',
        'Sai — vì đáp án đúng là <b>Truyền thống dân gian</b>. Trò chơi này có thật và rất phổ biến trong dân gian.',
      ]),
    Q('Lợi ích chung của trò chơi dân gian là?', ['Giữ gìn văn hoá + rèn thể chất + gắn kết cộng đồng', 'Lạc hậu, vô ích', 'Chỉ trẻ con chơi', 'Không cần thiết'], 0, 'Trò chơi dân gian: giá trị văn hoá + sức khoẻ + cộng đồng.',
      [
        '<b>Trò chơi dân gian</b> mang nhiều lợi ích chung:<ul><li><code>Giữ gìn văn hoá</code> truyền thống dân tộc.</li><li><code>Rèn thể chất</code>, vận động lành mạnh.</li><li><code>Gắn kết cộng đồng</code>, tăng tình bạn và sự đoàn kết.</li></ul>',
        'Trò chơi dân gian hoàn toàn không "lạc hậu, vô ích" hay "chỉ trẻ con chơi". Đây là di sản quý cần được trân trọng và phát huy trong đời sống hiện đại.',
      ],
      [
        'Đúng — vì trò chơi dân gian mang giá trị văn hoá, sức khoẻ và cộng đồng. Lựa chọn <b>Giữ gìn văn hoá + rèn thể chất + gắn kết cộng đồng</b> là phương án chuẩn.',
        'Sai — vì đáp án đúng là <b>Giữ gìn văn hoá + rèn thể chất + gắn kết cộng đồng</b>. Trò chơi dân gian rất giá trị, không lạc hậu.',
        'Sai — vì đáp án đúng là <b>Giữ gìn văn hoá + rèn thể chất + gắn kết cộng đồng</b>. Người lớn cũng chơi và yêu thích.',
        'Sai — vì đáp án đúng là <b>Giữ gìn văn hoá + rèn thể chất + gắn kết cộng đồng</b>. Trò chơi dân gian rất cần được gìn giữ.',
      ]),
  ]),

  M(31, 'Bài thể dục buổi sáng', [
    Q('Tập thể dục buổi sáng có lợi ích gì?', ['Mệt cả ngày', 'Khởi động cơ thể, tỉnh táo cả ngày', 'Hại sức khoẻ', 'Chỉ phù hợp với người lớn tuổi'], 1, 'Tập buổi sáng giúp tỉnh táo, tăng trao đổi chất, năng lượng cho ngày.',
      [
        '<b>Tập thể dục buổi sáng</b> giúp <code>khởi động cơ thể và tỉnh táo cả ngày</code>.<ul><li>Đánh thức cơ bắp, tăng tuần hoàn máu.</li><li>Tăng trao đổi chất, tạo năng lượng cho một ngày mới.</li><li>Tinh thần sảng khoái, sẵn sàng học tập.</li></ul>',
        'Bài tập sáng vừa phải không hề "mệt cả ngày" hay "hại sức khoẻ", và phù hợp với mọi lứa tuổi chứ không riêng người lớn tuổi.',
      ],
      [
        'Sai — vì đáp án đúng là <b>Khởi động cơ thể, tỉnh táo cả ngày</b>. Bài tập sáng vừa phải không gây mệt cả ngày.',
        'Đúng — vì tập buổi sáng giúp tỉnh táo, tăng trao đổi chất và năng lượng cho ngày. Lựa chọn <b>Khởi động cơ thể, tỉnh táo cả ngày</b> là phương án chuẩn.',
        'Sai — vì đáp án đúng là <b>Khởi động cơ thể, tỉnh táo cả ngày</b>. Tập sáng tốt cho sức khoẻ, không gây hại.',
        'Sai — vì đáp án đúng là <b>Khởi động cơ thể, tỉnh táo cả ngày</b>. Tập sáng phù hợp với mọi lứa tuổi.',
      ]),
    Q('Bài thể dục buổi sáng nên?', ['Nhẹ, đơn giản, kéo dài 10-15 phút', 'Tập đến kiệt sức', 'Nặng và lâu', 'Bỏ qua khởi động'], 0, 'Bài buổi sáng nên vừa phải để khởi động cơ thể, không gây mệt.',
      [
        '<b>Bài thể dục buổi sáng</b> nên <code>nhẹ, đơn giản, kéo dài khoảng 10–15 phút</code>.<ul><li>Mục đích là đánh thức cơ thể, không phải tập nặng.</li><li>Vừa đủ để cơ thể tỉnh táo, không mất sức cho cả ngày học/làm.</li></ul>',
        '<i>Tập đến kiệt sức, tập nặng và lâu</i> vào sáng sớm sẽ làm mệt cả ngày; <i>bỏ qua khởi động</i> thì dễ chấn thương. Buổi sáng ưu tiên vận động nhẹ nhàng.',
      ],
      [
        'Đúng — vì bài buổi sáng nên vừa phải để khởi động cơ thể, không gây mệt. Lựa chọn <b>Nhẹ, đơn giản, kéo dài 10-15 phút</b> là phương án chuẩn.',
        'Sai — vì đáp án đúng là <b>Nhẹ, đơn giản, kéo dài 10-15 phút</b>. Tập đến kiệt sức buổi sáng làm mệt cả ngày.',
        'Sai — vì đáp án đúng là <b>Nhẹ, đơn giản, kéo dài 10-15 phút</b>. Tập nặng và lâu không hợp với buổi sáng.',
        'Sai — vì đáp án đúng là <b>Nhẹ, đơn giản, kéo dài 10-15 phút</b>. Buổi tập nào cũng cần khởi động.',
      ]),
    Q('Trước khi tập thể dục buổi sáng, nên?', ['Ăn bữa sáng đầy đủ trước khi tập', 'Uống cà phê nhiều', 'Nhịn nước', 'Uống một chút nước, vệ sinh nhẹ'], 3, 'Một chút nước + vệ sinh nhẹ là đủ; không nên ăn no trước tập.',
      [
        '<b>Trước khi tập buổi sáng</b>, chỉ nên <code>uống một chút nước và vệ sinh nhẹ</code>.<ul><li>Một ngụm nước bù lượng mất qua đêm.</li><li>Không nên ăn no trước tập (dễ nặng bụng, xóc bụng).</li></ul>',
        '<i>Ăn bữa sáng đầy đủ rồi tập ngay</i> gây khó chịu khi vận động; <i>uống cà phê nhiều</i> không phù hợp với học sinh; <i>nhịn nước</i> thì cơ thể thiếu nước. Bữa sáng đầy đủ nên ăn sau khi tập.',
      ],
      [
        'Sai — vì đáp án đúng là <b>Uống một chút nước, vệ sinh nhẹ</b>. Ăn no rồi tập ngay dễ xóc bụng.',
        'Sai — vì đáp án đúng là <b>Uống một chút nước, vệ sinh nhẹ</b>. Cà phê nhiều không phù hợp với học sinh.',
        'Sai — vì đáp án đúng là <b>Uống một chút nước, vệ sinh nhẹ</b>. Nhịn nước khiến cơ thể thiếu nước.',
        'Đúng — vì một chút nước và vệ sinh nhẹ là đủ, không nên ăn no trước tập. Lựa chọn <b>Uống một chút nước, vệ sinh nhẹ</b> là phương án chuẩn.',
      ]),
    Q('Buổi sáng nên ưu tiên hình thức tập nào?', ['Không tập', 'Khởi động, kéo giãn, đi bộ/chạy nhẹ', 'Thi đấu căng', 'Tập gym nặng'], 1, 'Sáng sớm: vận động nhẹ-vừa phù hợp; tập nặng nên vào chiều/tối.',
      [
        'Buổi sáng nên ưu tiên các hình thức vận động <b>nhẹ – vừa</b>: <code>khởi động, kéo giãn, đi bộ hoặc chạy nhẹ</code>.<ul><li>Phù hợp với trạng thái cơ thể vừa thức dậy.</li><li>Đánh thức cơ thể từ từ, an toàn.</li></ul>',
        '<i>Thi đấu căng hay tập gym nặng</i> nên để vào buổi chiều/tối khi cơ thể đã "ấm" và sung sức hơn. Vận động nhẹ buổi sáng là lựa chọn khoa học.',
      ],
      [
        'Sai — vì đáp án đúng là <b>Khởi động, kéo giãn, đi bộ/chạy nhẹ</b>. Không tập thì bỏ lỡ lợi ích của buổi sáng.',
        'Đúng — vì sáng sớm hợp với vận động nhẹ-vừa, tập nặng nên vào chiều/tối. Lựa chọn <b>Khởi động, kéo giãn, đi bộ/chạy nhẹ</b> là phương án chuẩn.',
        'Sai — vì đáp án đúng là <b>Khởi động, kéo giãn, đi bộ/chạy nhẹ</b>. Thi đấu căng buổi sáng không phù hợp.',
        'Sai — vì đáp án đúng là <b>Khởi động, kéo giãn, đi bộ/chạy nhẹ</b>. Tập gym nặng nên để vào chiều/tối.',
      ]),
    Q('Sau khi tập sáng, nên?', ['Đi ngủ tiếp', 'Tắm rửa sạch sẽ, ăn sáng đầy đủ', 'Tập tiếp ngay', 'Bỏ bữa sáng'], 1, 'Tắm + bữa sáng đầy đủ → khởi đầu ngày khoẻ mạnh.',
      [
        '<b>Sau khi tập buổi sáng</b>, nên <code>tắm rửa sạch sẽ và ăn sáng đầy đủ</code>.<ul><li>Tắm giúp sạch mồ hôi, sảng khoái (nên đợi cơ thể hạ nhiệt rồi tắm).</li><li>Bữa sáng đầy đủ nạp năng lượng cho cả buổi học.</li></ul>',
        '<i>Đi ngủ tiếp, tập tiếp ngay hay bỏ bữa sáng</i> đều không tốt. Bữa sáng là bữa quan trọng nhất trong ngày — không nên bỏ, nhất là sau khi đã vận động.',
      ],
      [
        'Sai — vì đáp án đúng là <b>Tắm rửa sạch sẽ, ăn sáng đầy đủ</b>. Đi ngủ tiếp làm uể oải, lãng phí buổi sáng.',
        'Đúng — vì tắm và ăn sáng đầy đủ giúp khởi đầu ngày khoẻ mạnh. Lựa chọn <b>Tắm rửa sạch sẽ, ăn sáng đầy đủ</b> là phương án chuẩn.',
        'Sai — vì đáp án đúng là <b>Tắm rửa sạch sẽ, ăn sáng đầy đủ</b>. Tập tiếp ngay dễ quá sức.',
        'Sai — vì đáp án đúng là <b>Tắm rửa sạch sẽ, ăn sáng đầy đủ</b>. Bỏ bữa sáng là thói quen có hại.',
      ]),
  ]),

  M(32, 'Tinh thần fair-play trong thi đấu', [
    Q('"Fair-play" nghĩa là?', ['Bỏ trận', 'Thắng bằng mọi giá', 'Thi đấu trung thực, tôn trọng đối thủ và luật', 'Gian lận thông minh'], 2, 'Fair-play = tinh thần "chơi đẹp": trung thực, tôn trọng, đúng luật.',
      [
        '<b>Fair-play</b> ("chơi đẹp") nghĩa là <code>thi đấu trung thực, tôn trọng đối thủ và tuân thủ luật</code>.<ul><li>Trung thực: không gian lận, không tiểu xảo.</li><li>Tôn trọng: đối xử lịch sự với đối thủ, trọng tài, đồng đội.</li><li>Đúng luật: chơi trong khuôn khổ quy định.</li></ul>',
        'Fair-play là giá trị cốt lõi của thể thao, đối lập hoàn toàn với "thắng bằng mọi giá" hay "gian lận". Người chơi đẹp được tôn trọng dù thắng hay thua.',
      ],
      [
        'Sai — vì đáp án đúng là <b>Thi đấu trung thực, tôn trọng đối thủ và luật</b>. Bỏ trận không phải fair-play.',
        'Sai — vì đáp án đúng là <b>Thi đấu trung thực, tôn trọng đối thủ và luật</b>. Thắng bằng mọi giá đi ngược fair-play.',
        'Đúng — vì fair-play là tinh thần chơi đẹp: trung thực, tôn trọng, đúng luật. Lựa chọn <b>Thi đấu trung thực, tôn trọng đối thủ và luật</b> là phương án chuẩn.',
        'Sai — vì đáp án đúng là <b>Thi đấu trung thực, tôn trọng đối thủ và luật</b>. Gian lận trái với tinh thần fair-play.',
      ]),
    Q('Khi đối thủ ngã, hành xử fair-play là?', ['Tiếp tục đá', 'Dừng tấn công, đỡ bạn dậy', 'Lợi dụng để ghi điểm', 'Cười nhạo'], 1, 'Văn hoá thể thao: dừng lại, đỡ đối thủ, ưu tiên sức khoẻ.',
      [
        'Khi <b>đối thủ ngã</b> (nhất là có vẻ bị đau), hành xử fair-play là <code>dừng tấn công và đỡ bạn dậy</code>, ưu tiên sức khoẻ con người.<ul><li>Sức khoẻ và sự an toàn quan trọng hơn điểm số.</li><li>Đây là nét đẹp văn hoá thể thao được cả thế giới đề cao.</li></ul>',
        '<i>Tiếp tục đá, lợi dụng để ghi điểm hay cười nhạo</i> đều là hành vi phi thể thao. Cử chỉ nhân văn với đối thủ thể hiện đẳng cấp và nhân cách của người chơi.',
      ],
      [
        'Sai — vì đáp án đúng là <b>Dừng tấn công, đỡ bạn dậy</b>. Tiếp tục đá khi đối thủ ngã đau là phi thể thao.',
        'Đúng — vì văn hoá thể thao là dừng lại, đỡ đối thủ, ưu tiên sức khoẻ. Lựa chọn <b>Dừng tấn công, đỡ bạn dậy</b> là phương án chuẩn.',
        'Sai — vì đáp án đúng là <b>Dừng tấn công, đỡ bạn dậy</b>. Lợi dụng để ghi điểm là thiếu nhân văn.',
        'Sai — vì đáp án đúng là <b>Dừng tấn công, đỡ bạn dậy</b>. Cười nhạo là hành vi thiếu tôn trọng.',
      ]),
    Q('Khi trọng tài quyết định sai (theo cảm nhận của em), em nên?', ['Đánh trọng tài', 'Bỏ trận', 'Bình tĩnh, không phản ứng thô lỗ', 'La hét'], 2, 'Tin tưởng trọng tài; nếu không đồng ý, đội trưởng có thể trao đổi lịch sự.',
      [
        'Khi cho rằng <b>trọng tài quyết định sai</b>, em nên <code>bình tĩnh, không phản ứng thô lỗ</code>.<ul><li>Trọng tài là người điều hành, quyết định của họ cần được tôn trọng.</li><li>Nếu không đồng ý, đội trưởng có thể trao đổi một cách lịch sự, đúng quy định.</li></ul>',
        '<i>Đánh trọng tài, la hét hay bỏ trận</i> là hành vi nghiêm trọng, có thể bị phạt nặng và làm xấu hình ảnh. Giữ bình tĩnh trước quyết định bất lợi là phẩm chất quan trọng.',
      ],
      [
        'Sai — vì đáp án đúng là <b>Bình tĩnh, không phản ứng thô lỗ</b>. Đánh trọng tài là hành vi nghiêm trọng, bị cấm.',
        'Sai — vì đáp án đúng là <b>Bình tĩnh, không phản ứng thô lỗ</b>. Bỏ trận là thiếu tinh thần thể thao.',
        'Đúng — vì cần tin tưởng trọng tài, nếu không đồng ý thì đội trưởng trao đổi lịch sự. Lựa chọn <b>Bình tĩnh, không phản ứng thô lỗ</b> là phương án chuẩn.',
        'Sai — vì đáp án đúng là <b>Bình tĩnh, không phản ứng thô lỗ</b>. La hét là phản ứng thiếu kiềm chế.',
      ]),
    Q('Khi thua trận, hành vi đẹp là?', ['Bắt tay đối thủ, chúc mừng họ', 'Khóc lóc', 'Phá phách', 'Đổ lỗi'], 0, 'Văn hoá thể thao: thua không nản, vẫn bắt tay chúc mừng.',
      [
        'Khi <b>thua trận</b>, hành vi đẹp là <code>bắt tay đối thủ và chúc mừng họ</code>.<ul><li>Thể hiện tinh thần "thua không nản", tôn trọng người thắng.</li><li>Coi thất bại là bài học để tiến bộ.</li></ul>',
        '<i>Khóc lóc, phá phách hay đổ lỗi</i> là phản ứng tiêu cực, thiếu chuyên nghiệp. Biết chấp nhận thua một cách bình thản và lịch sự mới là người chơi bản lĩnh.',
      ],
      [
        'Đúng — vì văn hoá thể thao là thua không nản, vẫn bắt tay chúc mừng. Lựa chọn <b>Bắt tay đối thủ, chúc mừng họ</b> là phương án chuẩn.',
        'Sai — vì đáp án đúng là <b>Bắt tay đối thủ, chúc mừng họ</b>. Khóc lóc là phản ứng tiêu cực.',
        'Sai — vì đáp án đúng là <b>Bắt tay đối thủ, chúc mừng họ</b>. Phá phách là hành vi xấu, thiếu chuyên nghiệp.',
        'Sai — vì đáp án đúng là <b>Bắt tay đối thủ, chúc mừng họ</b>. Đổ lỗi không giúp em tiến bộ.',
      ]),
    Q('Tinh thần đồng đội KHÔNG bao gồm?', ['Hỗ trợ bạn', 'Tôn trọng nhau', 'Tự đề cao mình, hạ thấp bạn', 'Cùng chia sẻ vinh quang và thất bại'], 2, 'Đồng đội: tôn trọng, hỗ trợ, chia sẻ — không bao gồm tự đề cao.',
      [
        '<b>Tinh thần đồng đội</b> bao gồm: <code>hỗ trợ bạn, tôn trọng nhau, cùng chia sẻ vinh quang và thất bại</code>.<ul><li>Cả đội cùng thắng, cùng thua.</li><li>Giúp đỡ và động viên nhau lúc khó khăn.</li></ul>',
        '<i>Tự đề cao mình, hạ thấp bạn</i> hoàn toàn đi ngược tinh thần đồng đội — nó gây chia rẽ và làm suy yếu tập thể. Một đội mạnh là đội biết đặt lợi ích chung lên trên.',
      ],
      [
        'Sai — vì đáp án đúng là <b>Tự đề cao mình, hạ thấp bạn</b>. Hỗ trợ bạn chính là tinh thần đồng đội.',
        'Sai — vì đáp án đúng là <b>Tự đề cao mình, hạ thấp bạn</b>. Tôn trọng nhau là một phần của đồng đội.',
        'Đúng — vì tinh thần đồng đội không bao gồm tự đề cao mình, hạ thấp bạn. Lựa chọn <b>Tự đề cao mình, hạ thấp bạn</b> là phương án chuẩn.',
        'Sai — vì đáp án đúng là <b>Tự đề cao mình, hạ thấp bạn</b>. Chia sẻ vinh quang và thất bại là cốt lõi của đồng đội.',
      ]),
  ]),

  M(33, 'Đo lường và đánh giá thể lực', [
    Q('Để đánh giá sức bền tim mạch, thường đo?', ['Cân nặng', 'Chiều cao nhảy', 'Quãng đường chạy được trong thời gian cố định (vd 6 phút)', 'Sức nâng tạ'], 2, 'Test sức bền tim mạch điển hình: chạy 6/12 phút (Cooper test).',
      [
        'Để đánh giá <b>sức bền tim mạch</b>, thường đo <code>quãng đường chạy được trong một thời gian cố định</code> (ví dụ chạy 6 phút, 12 phút — Cooper test).<ul><li>Chạy được càng xa trong thời gian quy định → sức bền càng tốt.</li><li>Phản ánh khả năng làm việc của tim và phổi.</li></ul>',
        'Cân nặng, sức nâng tạ hay chiều cao nhảy đo các yếu tố khác (vóc dáng, sức mạnh, sức bật), không phải sức bền tim mạch. Test chạy thời gian là phổ biến nhất.',
      ],
      [
        'Sai — vì đáp án đúng là <b>Quãng đường chạy được trong thời gian cố định (vd 6 phút)</b>. Cân nặng không đo sức bền tim mạch.',
        'Sai — vì đáp án đúng là <b>Quãng đường chạy được trong thời gian cố định (vd 6 phút)</b>. Chiều cao nhảy đo sức bật, không phải sức bền.',
        'Đúng — vì test sức bền tim mạch điển hình là chạy 6/12 phút (Cooper test). Lựa chọn <b>Quãng đường chạy được trong thời gian cố định (vd 6 phút)</b> là phương án chuẩn.',
        'Sai — vì đáp án đúng là <b>Quãng đường chạy được trong thời gian cố định (vd 6 phút)</b>. Sức nâng tạ đo sức mạnh, không phải sức bền tim mạch.',
      ]),
    Q('Để đo sức mạnh cánh tay học sinh, hay dùng bài?', ['Chống đẩy (push-up) tối đa trong thời gian quy định', 'Đo cao', 'Đếm hơi thở', 'Đứng yên'], 0, 'Test sức mạnh tay: số lần chống đẩy đúng kỹ thuật trong 30-60s.',
      [
        'Để đo <b>sức mạnh – sức bền cánh tay</b> của học sinh, hay dùng bài <code>chống đẩy (push-up) tối đa trong thời gian quy định</code> (ví dụ 30–60 giây).<ul><li>Đếm số lần chống đẩy đúng kỹ thuật.</li><li>Càng nhiều lần → sức mạnh tay, vai, ngực càng tốt.</li></ul>',
        'Đo chiều cao, đếm hơi thở hay đứng yên không liên quan đến sức mạnh cánh tay. Push-up là bài test đơn giản, không cần dụng cụ, dễ áp dụng trong trường học.',
      ],
      [
        'Đúng — vì test sức mạnh tay là số lần chống đẩy đúng kỹ thuật trong 30-60s. Lựa chọn <b>Chống đẩy (push-up) tối đa trong thời gian quy định</b> là phương án chuẩn.',
        'Sai — vì đáp án đúng là <b>Chống đẩy (push-up) tối đa trong thời gian quy định</b>. Đo cao không liên quan đến sức mạnh tay.',
        'Sai — vì đáp án đúng là <b>Chống đẩy (push-up) tối đa trong thời gian quy định</b>. Đếm hơi thở không đo được sức mạnh cánh tay.',
        'Sai — vì đáp án đúng là <b>Chống đẩy (push-up) tối đa trong thời gian quy định</b>. Đứng yên không phải bài test sức mạnh.',
      ]),
    Q('Để đo sức bật, bài test phổ biến là?', ['Đứng yên', 'Chạy bền', 'Hít sâu', 'Nhảy xa tại chỗ hoặc bật cao tại chỗ'], 3, 'Test sức bật: nhảy xa tại chỗ (standing long jump) hoặc bật cao (vertical jump).',
      [
        'Để đo <b>sức bật</b> (sức mạnh bột phát của chân), bài test phổ biến là <code>nhảy xa tại chỗ (standing long jump)</code> hoặc <code>bật cao tại chỗ (vertical jump)</code>.<ul><li>Đo khoảng cách nhảy xa được khi đứng tại chỗ.</li><li>Hoặc đo độ cao chạm tay khi bật nhảy.</li></ul>',
        'Chạy bền đo sức bền, hít sâu đo dung tích phổi, đứng yên thì không đo gì. Test nhảy/bật tại chỗ là cách đánh giá sức bật chính xác và đơn giản.',
      ],
      [
        'Sai — vì đáp án đúng là <b>Nhảy xa tại chỗ hoặc bật cao tại chỗ</b>. Đứng yên không đo được sức bật.',
        'Sai — vì đáp án đúng là <b>Nhảy xa tại chỗ hoặc bật cao tại chỗ</b>. Chạy bền đo sức bền, không phải sức bật.',
        'Sai — vì đáp án đúng là <b>Nhảy xa tại chỗ hoặc bật cao tại chỗ</b>. Hít sâu đo dung tích phổi, không phải sức bật.',
        'Đúng — vì test sức bật là nhảy xa tại chỗ hoặc bật cao tại chỗ. Lựa chọn <b>Nhảy xa tại chỗ hoặc bật cao tại chỗ</b> là phương án chuẩn.',
      ]),
    Q('Để đo độ dẻo, bài test cơ bản là?', ['Chạy nhanh', 'Đứng yên', 'Gập thân tới (sit and reach)', 'Chống đẩy'], 2, 'Sit and reach: gập thân về trước, đo khoảng cách tay vươn được.',
      [
        'Để đo <b>độ dẻo (sự mềm dẻo)</b>, bài test cơ bản là <code>gập thân về trước (sit and reach)</code>.<ul><li>Ngồi duỗi chân, gập thân vươn tay về phía trước hết mức.</li><li>Đo khoảng cách tay vươn được → đánh giá độ dẻo của thân và chân sau.</li></ul>',
        'Chạy nhanh đo tốc độ, chống đẩy đo sức mạnh tay, đứng yên không đo gì. Sit and reach là test độ dẻo đơn giản, được dùng rộng rãi trong đánh giá thể lực.',
      ],
      [
        'Sai — vì đáp án đúng là <b>Gập thân tới (sit and reach)</b>. Chạy nhanh đo tốc độ, không phải độ dẻo.',
        'Sai — vì đáp án đúng là <b>Gập thân tới (sit and reach)</b>. Đứng yên không đo được độ dẻo.',
        'Đúng — vì sit and reach đo khoảng cách tay vươn khi gập thân, đánh giá độ dẻo. Lựa chọn <b>Gập thân tới (sit and reach)</b> là phương án chuẩn.',
        'Sai — vì đáp án đúng là <b>Gập thân tới (sit and reach)</b>. Chống đẩy đo sức mạnh tay, không phải độ dẻo.',
      ]),
    Q('Kết quả đo thể lực dùng để?', ['Chế giễu bạn yếu', 'Loại bạn yếu', 'Không có ý nghĩa', 'Theo dõi tiến bộ, điều chỉnh kế hoạch tập'], 3, 'Đánh giá thể lực để biết điểm yếu/mạnh và điều chỉnh kế hoạch tập luyện.',
      [
        '<b>Kết quả đo thể lực</b> được dùng để <code>theo dõi tiến bộ và điều chỉnh kế hoạch tập luyện</code>.<ul><li>Biết điểm mạnh, điểm yếu của bản thân.</li><li>Đặt mục tiêu và lập kế hoạch cải thiện phù hợp.</li><li>So sánh với chính mình theo thời gian để thấy tiến bộ.</li></ul>',
        'Đo thể lực <i>tuyệt đối không</i> nhằm "chế giễu" hay "loại bạn yếu". Đây là công cụ giáo dục tích cực, giúp mỗi người tự hoàn thiện và phát triển.',
      ],
      [
        'Sai — vì đáp án đúng là <b>Theo dõi tiến bộ, điều chỉnh kế hoạch tập</b>. Đo thể lực không nhằm chế giễu ai.',
        'Sai — vì đáp án đúng là <b>Theo dõi tiến bộ, điều chỉnh kế hoạch tập</b>. Không dùng kết quả để loại bạn yếu.',
        'Sai — vì đáp án đúng là <b>Theo dõi tiến bộ, điều chỉnh kế hoạch tập</b>. Đo thể lực rất có ý nghĩa giáo dục.',
        'Đúng — vì đánh giá thể lực để biết điểm yếu/mạnh và điều chỉnh kế hoạch tập. Lựa chọn <b>Theo dõi tiến bộ, điều chỉnh kế hoạch tập</b> là phương án chuẩn.',
      ]),
  ]),

  M(34, 'Thể thao và cuộc sống', [
    Q('Tập thể thao đều đặn có lợi gì cho sức khoẻ tinh thần?', ['Giảm stress, tăng tự tin, ngủ tốt hơn', 'Không liên quan', 'Hại tinh thần', 'Tăng lo âu'], 0, 'Vận động giúp cơ thể tiết endorphin → giảm stress, tăng cảm xúc tích cực.',
      [
        '<b>Tập thể thao đều đặn</b> rất tốt cho sức khoẻ tinh thần: <code>giảm stress, tăng tự tin và ngủ tốt hơn</code>.<ul><li>Vận động kích thích cơ thể tiết <b>endorphin</b> — chất "hạnh phúc" tự nhiên.</li><li>Giúp tâm trạng tích cực, giảm lo âu, ngủ sâu hơn.</li></ul>',
        'Thể thao không hề "hại tinh thần" hay "tăng lo âu". Đây là một trong những phương pháp đơn giản và hiệu quả nhất để chăm sóc sức khoẻ tâm lý.',
      ],
      [
        'Đúng — vì vận động giúp tiết endorphin, giảm stress và tăng cảm xúc tích cực. Lựa chọn <b>Giảm stress, tăng tự tin, ngủ tốt hơn</b> là phương án chuẩn.',
        'Sai — vì đáp án đúng là <b>Giảm stress, tăng tự tin, ngủ tốt hơn</b>. Thể thao liên quan mật thiết đến sức khoẻ tinh thần.',
        'Sai — vì đáp án đúng là <b>Giảm stress, tăng tự tin, ngủ tốt hơn</b>. Thể thao có lợi cho tinh thần, không gây hại.',
        'Sai — vì đáp án đúng là <b>Giảm stress, tăng tự tin, ngủ tốt hơn</b>. Vận động làm giảm lo âu, không tăng.',
      ]),
    Q('Một người ít vận động dễ gặp vấn đề gì?', ['Không có vấn đề', 'Thông minh hơn', 'Béo phì, bệnh tim mạch, đái tháo đường tuýp 2', 'Khoẻ hơn'], 2, 'Lối sống ít vận động liên quan đến nhiều bệnh mãn tính.',
      [
        '<b>Lối sống ít vận động</b> làm tăng nguy cơ nhiều bệnh: <code>béo phì, bệnh tim mạch, đái tháo đường tuýp 2</code>…<ul><li>Ít vận động → tích mỡ, rối loạn chuyển hoá.</li><li>Tim mạch kém khoẻ, huyết áp dễ tăng.</li></ul>',
        'Ngược lại, vận động đều đặn giúp phòng tránh các bệnh này. Vì vậy ít vận động chắc chắn <i>không khiến khoẻ hơn hay thông minh hơn</i> — đó là yếu tố nguy cơ sức khoẻ.',
      ],
      [
        'Sai — vì đáp án đúng là <b>Béo phì, bệnh tim mạch, đái tháo đường tuýp 2</b>. Ít vận động gây nhiều vấn đề sức khoẻ.',
        'Sai — vì đáp án đúng là <b>Béo phì, bệnh tim mạch, đái tháo đường tuýp 2</b>. Ít vận động không giúp thông minh hơn.',
        'Đúng — vì lối sống ít vận động liên quan đến nhiều bệnh mãn tính. Lựa chọn <b>Béo phì, bệnh tim mạch, đái tháo đường tuýp 2</b> là phương án chuẩn.',
        'Sai — vì đáp án đúng là <b>Béo phì, bệnh tim mạch, đái tháo đường tuýp 2</b>. Ít vận động làm yếu đi, không khoẻ hơn.',
      ]),
    Q('Khuyến nghị thời gian vận động cho trẻ vị thành niên (WHO) là?', ['5 phút/ngày', 'Ít nhất 60 phút/ngày, vừa-mạnh', 'Không cần', '5 phút/tuần'], 1, 'WHO: trẻ 5-17 tuổi nên vận động vừa-mạnh ít nhất 60 phút mỗi ngày.',
      [
        'Theo khuyến nghị của <b>WHO</b>, trẻ em – vị thành niên (5–17 tuổi) nên vận động cường độ <code>vừa – mạnh ít nhất 60 phút mỗi ngày</code>.<ul><li>Có thể chia nhỏ trong ngày (ra chơi, đi bộ, chơi thể thao…).</li><li>Trong tuần nên có vài buổi rèn cơ – xương (chạy, nhảy).</li></ul>',
        'Các con số "5 phút/ngày", "5 phút/tuần" hay "không cần" đều quá ít so với khuyến nghị. 60 phút/ngày là mục tiêu nên hướng tới để phát triển khoẻ mạnh.',
      ],
      [
        'Sai — vì đáp án đúng là <b>Ít nhất 60 phút/ngày, vừa-mạnh</b>. 5 phút/ngày quá ít so với khuyến nghị.',
        'Đúng — vì WHO khuyến nghị trẻ 5-17 tuổi vận động vừa-mạnh ít nhất 60 phút mỗi ngày. Lựa chọn <b>Ít nhất 60 phút/ngày, vừa-mạnh</b> là phương án chuẩn.',
        'Sai — vì đáp án đúng là <b>Ít nhất 60 phút/ngày, vừa-mạnh</b>. Trẻ rất cần vận động hằng ngày.',
        'Sai — vì đáp án đúng là <b>Ít nhất 60 phút/ngày, vừa-mạnh</b>. 5 phút/tuần là quá ít.',
      ]),
    Q('Khi chọn môn thể thao để theo lâu dài, nên?', ['Chọn môn người khác bắt', 'Chọn môn em yêu thích và phù hợp thể trạng', 'Không cần chọn', 'Theo trào lưu'], 1, 'Theo môn mình thích → duy trì lâu dài, hiệu quả thực sự.',
      [
        'Khi chọn <b>môn thể thao để theo lâu dài</b>, nên <code>chọn môn mình yêu thích và phù hợp thể trạng</code>.<ul><li>Yêu thích → có động lực duy trì đều đặn.</li><li>Phù hợp thể trạng → tập an toàn, hiệu quả, ít chấn thương.</li></ul>',
        '<i>Chọn môn vì người khác bắt hay theo trào lưu</i> thì khó bền vì thiếu đam mê. Tìm được môn hợp với mình là chìa khoá để gắn bó với thể thao suốt đời.',
      ],
      [
        'Sai — vì đáp án đúng là <b>Chọn môn em yêu thích và phù hợp thể trạng</b>. Bị ép chọn thì khó duy trì lâu dài.',
        'Đúng — vì theo môn mình thích thì duy trì lâu dài và hiệu quả thực sự. Lựa chọn <b>Chọn môn em yêu thích và phù hợp thể trạng</b> là phương án chuẩn.',
        'Sai — vì đáp án đúng là <b>Chọn môn em yêu thích và phù hợp thể trạng</b>. Cần cân nhắc chọn môn hợp với mình.',
        'Sai — vì đáp án đúng là <b>Chọn môn em yêu thích và phù hợp thể trạng</b>. Theo trào lưu thường không bền.',
      ]),
    Q('"Thể thao học đường" có mục tiêu chính là?', ['Tìm tài năng thi đấu', 'Lãng phí thời gian', 'Phát triển toàn diện về thể chất, tinh thần và kỹ năng xã hội', 'Loại học sinh yếu'], 2, 'GDTC ở trường: phát triển toàn diện, không phải chỉ tuyển VĐV.',
      [
        '<b>Thể thao học đường (GDTC)</b> có mục tiêu chính là <code>phát triển toàn diện học sinh về thể chất, tinh thần và kỹ năng xã hội</code>.<ul><li>Rèn sức khoẻ, thể lực cho mọi học sinh.</li><li>Bồi dưỡng ý chí, kỷ luật, tinh thần đồng đội.</li><li>Hình thành thói quen vận động lành mạnh suốt đời.</li></ul>',
        'GDTC ở trường <i>không chỉ nhằm "tìm tài năng thi đấu" hay "loại học sinh yếu"</i> — mà hướng tới sự phát triển của tất cả học sinh, theo đúng tinh thần CT GDPT 2018.',
      ],
      [
        'Sai — vì đáp án đúng là <b>Phát triển toàn diện về thể chất, tinh thần và kỹ năng xã hội</b>. Tìm tài năng chỉ là mục tiêu phụ.',
        'Sai — vì đáp án đúng là <b>Phát triển toàn diện về thể chất, tinh thần và kỹ năng xã hội</b>. GDTC rất bổ ích, không lãng phí.',
        'Đúng — vì GDTC ở trường nhằm phát triển toàn diện cho mọi học sinh. Lựa chọn <b>Phát triển toàn diện về thể chất, tinh thần và kỹ năng xã hội</b> là phương án chuẩn.',
        'Sai — vì đáp án đúng là <b>Phát triển toàn diện về thể chất, tinh thần và kỹ năng xã hội</b>. GDTC không nhằm loại học sinh yếu.',
      ]),
  ]),

  M(35, 'Kiểm tra cuối kỳ II — tổng hợp', [
    Q('Khi bị bong gân nhẹ, sơ cứu đúng cách là?', ['RICE', 'Tập tiếp', 'Xoa nóng', 'Bóp mạnh'], 0, 'Ôn tuần 17.',
      [
        'Ôn lại <b>Tuần 17</b>: sơ cứu bong gân nhẹ dùng nguyên tắc <code>RICE</code> — Rest (nghỉ), Ice (chườm đá), Compression (băng ép), Elevation (kê cao).<ul><li>Xoa nóng, bóp mạnh, tập tiếp đều sai ở giai đoạn đầu.</li></ul>',
        '<i>Nhớ:</i> chườm lạnh trong 24–48h đầu giúp giảm sưng; nếu đau nhiều, sưng to bất thường thì cần báo người lớn và đi khám.',
      ],
      [
        'Đúng — vì sơ cứu bong gân nhẹ dùng phương pháp RICE (ôn tuần 17). Lựa chọn <b>RICE</b> là phương án chuẩn.',
        'Sai — vì đáp án đúng là <b>RICE</b>. Tập tiếp làm chấn thương nặng thêm.',
        'Sai — vì đáp án đúng là <b>RICE</b>. Xoa nóng làm sưng nặng hơn ở giai đoạn đầu.',
        'Sai — vì đáp án đúng là <b>RICE</b>. Bóp mạnh làm tổn thương thêm.',
      ]),
    Q('Nguyên tắc tăng cự ly chạy bền là?', ['Tăng gấp đôi mỗi tuần', 'Tuỳ hứng', 'Cố định', 'Tăng từ từ ~10% mỗi tuần'], 3, 'Ôn tuần 19.',
      [
        'Ôn lại <b>Tuần 19</b>: nguyên tắc tăng cự ly chạy bền là <code>tăng từ từ, không quá ~10% mỗi tuần</code>.<ul><li>Giúp cơ thể thích nghi an toàn.</li><li>Tránh quá tải, chấn thương khi tăng đột ngột.</li></ul>',
        '<i>Kèm theo:</i> nên có ngày nghỉ giữa các buổi để cơ phục hồi; dấu hiệu tiến bộ là cùng quãng đường mà nhịp tim thấp hơn, ít mệt hơn.',
      ],
      [
        'Sai — vì đáp án đúng là <b>Tăng từ từ ~10% mỗi tuần</b>. Tăng gấp đôi mỗi tuần rất dễ chấn thương.',
        'Sai — vì đáp án đúng là <b>Tăng từ từ ~10% mỗi tuần</b>. Tập tuỳ hứng dễ quá tải hoặc kém hiệu quả.',
        'Sai — vì đáp án đúng là <b>Tăng từ từ ~10% mỗi tuần</b>. Giữ cố định thì không tiến bộ.',
        'Đúng — vì nguyên tắc 10% giúp tăng cự ly an toàn (ôn tuần 19). Lựa chọn <b>Tăng từ từ ~10% mỗi tuần</b> là phương án chuẩn.',
      ]),
    Q('Một set bóng chuyền hiện đại đấu đến bao nhiêu điểm?', ['30', '25 (cách 2)', '21', '15'], 1, 'Ôn tuần 24.',
      [
        'Ôn lại <b>Tuần 24</b>: một set bóng chuyền hiện đại đấu đến <code>25 điểm</code>, đội thắng phải hơn ít nhất 2 điểm.<ul><li>Hoà 24–24 thì đấu tiếp đến khi cách biệt 2 điểm.</li><li>Set quyết định (set 5) đấu đến 15 điểm.</li></ul>',
        '<i>Lưu ý:</i> luật tính điểm "rally point" — mỗi pha bóng đều có điểm, bất kể đội nào giao bóng.',
      ],
      [
        'Sai — vì đáp án đúng là <b>25 (cách 2)</b>. 30 không phải mốc của set bóng chuyền hiện đại.',
        'Đúng — vì set bóng chuyền hiện đại đấu đến 25 điểm, cách 2 (ôn tuần 24). Lựa chọn <b>25 (cách 2)</b> là phương án chuẩn.',
        'Sai — vì đáp án đúng là <b>25 (cách 2)</b>. 21 là của cầu lông, không phải bóng chuyền.',
        'Sai — vì đáp án đúng là <b>25 (cách 2)</b>. 15 là set quyết định (set 5), không phải set thường.',
      ]),
    Q('Bài "plank" rèn nhóm cơ nào chủ yếu?', ['Chỉ chân', 'Cơ cổ tay và cẳng tay', 'Chỉ tay', 'Cơ lõi (bụng-lưng-mông)'], 3, 'Ôn tuần 28.',
      [
        'Ôn lại <b>Tuần 28</b>: bài plank rèn chủ yếu <code>cơ lõi (core)</code> — gồm bụng, lưng dưới và mông.<ul><li>Cơ lõi khoẻ giúp giữ thăng bằng và tư thế đúng.</li><li>Bảo vệ cột sống, hỗ trợ mọi vận động.</li></ul>',
        '<i>Phân biệt:</i> push-up rèn ngực – tay sau – vai; squat rèn đùi – mông; còn plank rèn cơ lõi giữ thân thẳng như tấm ván.',
      ],
      [
        'Sai — vì đáp án đúng là <b>Cơ lõi (bụng-lưng-mông)</b>. Plank không chỉ rèn chân.',
        'Sai — vì đáp án đúng là <b>Cơ lõi (bụng-lưng-mông)</b>. Cổ tay, cẳng tay chỉ giữ tư thế, không phải nhóm cơ chính.',
        'Sai — vì đáp án đúng là <b>Cơ lõi (bụng-lưng-mông)</b>. Plank không chỉ rèn tay.',
        'Đúng — vì plank rèn cơ lõi (bụng-lưng-mông) là chủ yếu (ôn tuần 28). Lựa chọn <b>Cơ lõi (bụng-lưng-mông)</b> là phương án chuẩn.',
      ]),
    Q('Fair-play nghĩa là?', ['Thắng bằng mọi giá', 'Gian lận', 'Bỏ trận', 'Thi đấu trung thực, tôn trọng đối thủ'], 3, 'Ôn tuần 32.',
      [
        'Ôn lại <b>Tuần 32</b>: fair-play ("chơi đẹp") nghĩa là <code>thi đấu trung thực, tôn trọng đối thủ và tuân thủ luật</code>.<ul><li>Không gian lận, không tiểu xảo.</li><li>Thắng không kiêu, thua không nản.</li></ul>',
        '<i>Biểu hiện:</i> đỡ đối thủ khi họ ngã, bắt tay chúc mừng khi thua, bình tĩnh trước quyết định của trọng tài.',
      ],
      [
        'Sai — vì đáp án đúng là <b>Thi đấu trung thực, tôn trọng đối thủ</b>. Thắng bằng mọi giá đi ngược fair-play.',
        'Sai — vì đáp án đúng là <b>Thi đấu trung thực, tôn trọng đối thủ</b>. Gian lận trái với fair-play.',
        'Sai — vì đáp án đúng là <b>Thi đấu trung thực, tôn trọng đối thủ</b>. Bỏ trận không phải fair-play.',
        'Đúng — vì fair-play là thi đấu trung thực, tôn trọng đối thủ (ôn tuần 32). Lựa chọn <b>Thi đấu trung thực, tôn trọng đối thủ</b> là phương án chuẩn.',
      ]),
  ]),
  // ========== TUẦN 36 — TỔNG KẾT NĂM HỌC ==========
  M(36, 'Kết thúc GDTC 7 — Thể chất khoẻ mạnh, tinh thần vui tươi', [
    Q('Theo khuyến nghị của WHO, trẻ 12–17 tuổi nên vận động ít nhất bao lâu mỗi ngày?',
      ['30 phút', '60 phút', '15 phút', '120 phút'],
      1,
      'WHO khuyến nghị trẻ 5–17 tuổi vận động trung bình ít nhất 60 phút mỗi ngày.',
      ['Con số <b>60 phút/ngày</b> là mức <i>tối thiểu</i> để cơ thể tuổi dậy thì phát triển bình thường, không phải mức của vận động viên.',
       '60 phút đó <b>không cần làm liền một mạch</b>: đi bộ tới trường 15 phút, ra chơi vận động 15 phút, chiều đá cầu 30 phút — cộng lại là đủ.',
       'Nên trộn cả hai loại:<ul><li><b>Cường độ cao</b> — chạy, bóng đá, bơi: khoẻ tim phổi</li><li><b>Cường độ vừa</b> — đi bộ, đạp xe: duy trì mỗi ngày, dễ giữ thói quen</li></ul>'],
      ['Sai — 30 phút là mức khuyến nghị cho người trưởng thành, chưa đủ cho lứa tuổi của em.',
       'Đúng — WHO khuyến nghị ít nhất 60 phút mỗi ngày cho lứa tuổi 5–17.',
       'Sai — 15 phút quá ít so với nhu cầu phát triển của tuổi dậy thì.',
       'Sai — 120 phút là rất tốt nhưng không phải mức tối thiểu được khuyến nghị.']),
    Q('Bạn em bị bong gân cổ chân khi chơi bóng chuyền. Bốn bước sơ cứu R-I-C-E theo đúng thứ tự là gì?',
      ['Chạy tiếp cho ấm – Xoa dầu nóng – Băng chặt – Hạ chân thấp',
       'Nghỉ – Xoa bóp mạnh – Chườm nóng – Nâng chân cao',
       'Băng chặt – Chườm nóng – Đi lại nhẹ – Nghỉ',
       'Rest (nghỉ) – Ice (chườm lạnh) – Compression (băng ép) – Elevation (nâng cao)'],
      3,
      'R-I-C-E = Rest, Ice, Compression, Elevation — nghỉ, chườm lạnh, băng ép, nâng cao chi.',
      ['Nguyên tắc cốt lõi của 24–48 giờ đầu sau bong gân là <b>giảm sưng và giảm chảy máu trong</b>, tuyệt đối không làm mạch máu giãn thêm.',
       'Bốn bước:<ul><li><b>R</b>est — dừng tập ngay, không cố đi lại</li><li><b>I</b>ce — chườm đá bọc vải mỏng 15–20 phút</li><li><b>C</b>ompression — băng thun ép nhẹ, không quá chặt</li><li><b>E</b>levation — nâng chân cao hơn tim</li></ul>',
       '⚠️ Ba việc <b>không được làm</b> trong 48 giờ đầu: <i>chườm nóng, xoa dầu nóng, xoa bóp mạnh</i> — cả ba đều làm giãn mạch, sưng nặng thêm. Đau nhiều, không đi được hoặc nghi gãy xương ⇒ gọi người lớn, đến cơ sở y tế.'],
      ['Sai — chạy tiếp và xoa dầu nóng làm tổn thương nặng thêm.',
       'Sai — xoa bóp mạnh và chườm nóng làm giãn mạch, tăng sưng.',
       'Sai — sai thứ tự và chườm nóng là điều cần tránh trong 48 giờ đầu.',
       'Đúng — R-I-C-E là nghỉ, chườm lạnh, băng ép và nâng cao chi.']),
    Q('Vì sao phải khởi động trước khi tập và thả lỏng sau khi tập?',
      ['Khởi động làm nóng cơ, tăng biên độ khớp để phòng chấn thương; thả lỏng đưa nhịp tim về bình thường và giảm đau mỏi cơ',
       'Chỉ là thói quen cho đẹp đội hình, không có tác dụng sinh lí',
       'Khởi động giúp tăng chiều cao, thả lỏng giúp giảm cân',
       'Chỉ cần thiết với vận động viên chuyên nghiệp'],
      0,
      'Khởi động làm nóng cơ và khớp để phòng chấn thương; thả lỏng giúp hồi phục, giảm đau mỏi cơ.',
      ['Cơ lạnh giống như <i>sợi dây chun để trong tủ lạnh</i> — kéo mạnh là đứt. Khởi động chính là làm ấm sợi dây đó.',
       '<ul><li><b>Khởi động</b> (5–10 phút) — tăng nhiệt độ cơ, tăng lưu lượng máu, tăng biên độ khớp, đánh thức phản xạ thần kinh cơ</li><li><b>Thả lỏng</b> (5–10 phút) — hạ nhịp tim từ từ, tránh choáng do máu dồn ở chân, đẩy nhanh việc dọn axit lactic ⇒ ít đau mỏi hôm sau</li></ul>',
       'Thứ tự đúng: khởi động <b>chung</b> (chạy nhẹ, xoay khớp) trước, rồi khởi động <b>chuyên môn</b> mô phỏng động tác sắp tập.'],
      ['Đúng — khởi động phòng chấn thương, thả lỏng giúp hồi phục.',
       'Sai — cả hai đều có tác dụng sinh lí rõ rệt, không phải hình thức.',
       'Sai — không có cơ sở nào cho tác dụng tăng chiều cao hay giảm cân tức thì như vậy.',
       'Sai — mọi người tập luyện đều cần, kể cả học sinh.']),
    Q('Trong chạy bền 800 m, chiến thuật hợp lí nhất cho học sinh lớp 7 là gì?',
      ['Chạy hết sức ngay từ tiếng súng để chiếm vị trí đầu',
       'Xuất phát ổn định, giữ tốc độ đều và thở nhịp nhàng, dồn sức rút ở đoạn cuối',
       'Chạy chậm suốt quãng đường rồi đi bộ về đích',
       'Nín thở từng đoạn dài để tiết kiệm sức'],
      1,
      'Chạy bền hiệu quả khi giữ tốc độ đều, thở nhịp nhàng và chỉ rút sức ở đoạn cuối.',
      ['Chạy bền khác chạy ngắn ở chỗ: thắng nhờ <b>phân phối sức</b>, không phải nhờ bùng nổ.',
       'Ba giai đoạn:<ul><li><b>Xuất phát</b> — nhanh vừa phải để chọn làn, không lao hết sức</li><li><b>Giữa cự li</b> — tốc độ đều, bước chân và nhịp thở khớp nhau (ví dụ 2 bước hít – 2 bước thở)</li><li><b>Rút về đích</b> — tăng tốc ở khoảng 100–150 m cuối</li></ul>',
       '<b>Hiện tượng cực điểm</b>: khoảng giữa quãng, em thấy tức ngực, chân nặng, muốn bỏ cuộc. Hãy giảm nhẹ tốc độ và <i>thở sâu, đều</i> — qua vài chục giây cơ thể sẽ có "hơi thở thứ hai" và dễ chịu trở lại.'],
      ['Sai — lao hết sức từ đầu gây kiệt sức sớm, đây là lỗi phổ biến nhất.',
       'Đúng — giữ tốc độ đều, thở nhịp nhàng và rút sức ở đoạn cuối.',
       'Sai — đi bộ về đích cho thành tích kém và không rèn được sức bền.',
       'Sai — nín thở làm thiếu oxy, rất nguy hiểm khi vận động.']),
    Q('Chỉ số BMI được tính bằng công thức nào?',
      ['Chiều cao chia cho cân nặng', 'Cân nặng nhân với chiều cao',
       'Cân nặng (kg) chia cho bình phương chiều cao (m)', 'Cân nặng cộng chiều cao rồi chia hai'],
      2,
      'BMI = cân nặng (kg) ÷ [chiều cao (m)]². Với học sinh, BMI được đọc theo biểu đồ phần trăm theo tuổi và giới.',
      ['<b>BMI</b> (Body Mass Index) là chỉ số so cân nặng với chiều cao, giúp ước lượng tình trạng dinh dưỡng.',
       'Công thức: <code>BMI = m / h²</code>, với <i>m</i> tính bằng <b>kilôgam</b> và <i>h</i> bằng <b>mét</b>.<br>Ví dụ: 40 kg, 1,50 m ⇒ BMI = 40 ÷ (1,50 × 1,50) = 40 ÷ 2,25 ≈ <b>17,8</b>.',
       '⚠️ Với <b>trẻ em và thiếu niên</b>, không dùng thẳng các mốc của người lớn. Phải tra <i>biểu đồ BMI theo tuổi và giới tính</i>, vì cơ thể còn đang lớn. BMI cũng không phân biệt được cơ và mỡ — bạn tập thể thao nhiều có thể có BMI cao mà vẫn rất khoẻ.'],
      ['Sai — công thức bị đảo ngược.',
       'Sai — BMI là phép chia, không phải phép nhân.',
       'Đúng — BMI = cân nặng (kg) chia cho bình phương chiều cao tính bằng mét.',
       'Sai — không có công thức trung bình cộng như vậy.']),
    Q('"Fair-play" trong thể thao nghĩa là gì?',
      ['Luôn nhường đối thủ để giữ hoà khí', 'Chỉ thi đấu khi chắc chắn thắng',
       'Chơi thế nào cũng được miễn trọng tài không thổi phạt',
       'Chơi trung thực, tôn trọng luật, tôn trọng đối thủ và trọng tài, chấp nhận thắng thua'],
      3,
      'Fair-play là tinh thần chơi trung thực, tôn trọng luật, đối thủ, trọng tài và chấp nhận kết quả.',
      ['Fair-play là <b>giá trị sống</b>, không chỉ là điều lệ thi đấu. Nó trả lời câu hỏi: <i>em là người thế nào khi không ai nhìn?</i>',
       'Biểu hiện cụ thể:<ul><li>Không ăn vạ, không chơi xấu, không cố tình gây chấn thương</li><li>Tôn trọng quyết định của trọng tài dù không đồng tình</li><li>Đỡ đối thủ bị ngã dậy; bắt tay sau trận dù thắng hay thua</li><li>Không chế giễu người thua, không kiêu ngạo khi thắng</li></ul>',
       'Phân biệt rõ: fair-play <i>không phải</i> là nhường nhịn. Em vẫn thi đấu <b>hết sức</b> để thắng — chỉ là thắng <b>đúng luật và tử tế</b>.'],
      ['Sai — fair-play không có nghĩa là nhường; em vẫn thi đấu hết sức.',
       'Sai — tinh thần thể thao là dám thi đấu kể cả khi có thể thua.',
       'Sai — trung thực ngay cả khi trọng tài không thấy mới đúng là fair-play.',
       'Đúng — fair-play là chơi trung thực, tôn trọng luật, đối thủ, trọng tài và chấp nhận kết quả.']),
  ]),
];

export const S7GDTC_SCENARIOS = indexBy(S7GDTC_WEEKS);
