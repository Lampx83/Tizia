// ============================================================
// Lớp 8 · GDTC (Giáo dục thể chất) — 35 tuần (HK1: 1–18 · HK2: 19–35)
// Điền kinh, thể dục, các môn thể thao theo CTGD 2018.
// ID prefix: "S8GDTC-wNN-quiz".
// ============================================================
import { Q, W, indexBy } from './_helper.js';

const M = (n, title, qs, opts) => W('S8GDTC', 'gdtc', n, title, qs, opts);

export const S8GDTC_WEEKS = [
  // ──────────────── HK1 ────────────────
  M(1, 'Chạy ngắn — Kỹ thuật chạy 60m, 100m', [
    Q('Chạy ngắn gồm 4 giai đoạn?', ['Xuất phát → tăng tốc sau xuất phát → giữa quãng → về đích', 'Đứng → chạy → nhảy → về', 'Chỉ chạy thẳng', 'Khởi động → chạy → về đích → nghỉ'], 0, '4 giai đoạn chạy ngắn: xuất phát, sau xuất phát, giữa quãng, về đích.',
      [
        '<b>Chủ đề Chạy cự ly ngắn</b> (SGK GDTC 8) chia kỹ thuật thành <b>4 giai đoạn</b> nối tiếp: <code>xuất phát</code> → <code>chạy lao sau xuất phát (tăng tốc)</code> → <code>chạy giữa quãng</code> → <code>về đích</code>.<ul><li>Mỗi giai đoạn có nhiệm vụ riêng nhưng phải liền mạch.</li></ul>',
        '<i>Vì sao chia giai đoạn?</i> Mỗi đoạn tối ưu một mục tiêu: bứt khỏi bàn đạp, đạt tốc độ tối đa, duy trì tốc độ rồi cắt đích.<ul><li>Chạy ngắn cự ly <code>60m, 100m</code> đòi hỏi <b>sức nhanh</b> là tố chất chủ đạo.</li></ul>',
      ],
      ['Đúng — đây là 4 giai đoạn chuẩn của chạy ngắn.', 'Sai — không có giai đoạn nhảy trong chạy ngắn.', 'Sai — chạy ngắn vẫn chia thành 4 giai đoạn kỹ thuật.', 'Sai — đây không phải các giai đoạn kỹ thuật của chạy ngắn.']),
    Q('Xuất phát thấp trong chạy ngắn?', ['Cúi đầu', 'Dùng bàn đạp, tư thế 3 điểm tựa', 'Đứng thẳng', 'Bật nhảy mạnh tại chỗ rồi chạy'], 1, 'Xuất phát thấp: dùng bàn đạp, 2 chân + 2 tay tạo 3 điểm tựa.',
      [
        '<b>Xuất phát thấp</b> là kỹ thuật chuẩn của chạy ngắn: vận động viên tì hai chân lên <code>bàn đạp</code>, hai tay chống đất tạo <b>3 điểm tựa</b> (2 tay + 2 chân tì bàn đạp).<ul><li>Tư thế thấp giúp dồn trọng tâm về trước, bật ra mạnh.</li></ul>',
        '<i>Phân biệt:</i> <code>xuất phát cao</code> (đứng) dùng cho chạy bền; <code>xuất phát thấp</code> dùng cho chạy ngắn để tạo gia tốc lớn ngay từ tiếng súng.<ul><li>Bàn đạp được chỉnh khoảng cách theo chiều dài chân.</li></ul>',
      ],
      ['Sai — cúi đầu không phải đặc điểm của xuất phát thấp.', 'Đúng — xuất phát thấp dùng bàn đạp, 2 chân và 2 tay tạo 3 điểm tựa.', 'Sai — đứng thẳng là xuất phát cao, không phải thấp.', 'Sai — không bật nhảy tại chỗ; tì bàn đạp để bật về trước.']),
    Q('Khẩu lệnh xuất phát?', ['"Vào chỗ" → "Sẵn sàng" → tiếng súng', 'Tự bắt đầu', 'Chạy ngay', '1-2-3'], 0, '3 khẩu lệnh chuẩn theo trọng tài quốc tế.',
      [
        'Khi xuất phát thấp có <b>3 khẩu lệnh</b> theo trình tự: <code>"Vào chỗ"</code> (đặt tay, chân vào bàn đạp) → <code>"Sẵn sàng"</code> (nâng hông) → <b>tiếng súng/còi</b> (bật chạy).<ul><li>Đây là chuẩn của Liên đoàn Điền kinh quốc tế.</li></ul>',
        '<i>Quy tắc:</i> rời bàn đạp <b>trước</b> tín hiệu là <code>phạm quy xuất phát sớm</code>.<ul><li>Phản xạ theo tiếng súng phải nhanh nhưng không được đoán trước.</li></ul>',
      ],
      ['Đúng — đây là 3 khẩu lệnh chuẩn quốc tế.', 'Sai — không tự bắt đầu, phải theo khẩu lệnh.', 'Sai — chạy ngay là phạm quy (xuất phát sớm).', 'Sai — không dùng đếm 1-2-3 mà dùng khẩu lệnh chuẩn.']),
    Q('Ở "Sẵn sàng", tư thế?', ['Nâng hông cao hơn vai một chút, chuyển trọng tâm về trước', 'Ngồi xuống', 'Đứng lên', 'Hai tay duỗi thẳng, hông ngang vai'], 0, 'Sẵn sàng: nâng hông, đầu thấp, trọng tâm dồn về tay — chờ tín hiệu chạy.',
      [
        'Ở khẩu lệnh <b>"Sẵn sàng"</b>, người chạy <code>nâng mông/hông</code> lên cao hơn vai một chút, đầu giữ thấp tự nhiên, trọng tâm dồn về phía trước (về hai tay).<ul><li>Tư thế "lò xo" này tạo thế chực bật ra ngay khi có súng.</li></ul>',
        '<i>Lưu ý kỹ thuật:</i> giữ <b>bất động</b> ở tư thế sẵn sàng cho tới tiếng súng; nhúc nhích sớm bị tính là phạm quy.<ul><li>Hông cao hơn vai → góc đùi mở, tận dụng được lực đạp bàn đạp.</li></ul>',
      ],
      ['Đúng — nâng hông cao hơn vai một chút, dồn trọng tâm về trước.', 'Sai — không ngồi xuống ở tư thế sẵn sàng.', 'Sai — không đứng lên, vẫn giữ tư thế thấp.', 'Sai — hông phải cao hơn vai, không ngang vai.']),
    Q('Mục đích về đích?', ['Bật nhảy qua vạch đích để rút ngắn thời gian', 'Cúi ngực để cắt đường đích', 'Tăng tốc và đột ngột chậm', 'Dừng đột ngột'], 1, 'Khi gần đích, cúi ngực về phía trước để cắt vạch sớm nhất.',
      [
        'Giai đoạn <b>về đích</b>: ở vài bước cuối, người chạy <code>cúi/đánh ngực về trước</code> (kỹ thuật "đánh đích") để bộ phận thân chạm vạch sớm nhất — thành tích tính khi <b>thân</b> qua vạch.<ul><li>Không tính theo đầu, tay hay chân.</li></ul>',
        '<i>Sai lầm cần tránh:</i> <code>bật nhảy</code> qua đích sẽ mất đà (pha bay trên không không nhanh hơn chạy), <code>giảm tốc</code> sớm làm chậm thời gian.<ul><li>Phải giữ tốc độ cao đến khi qua hẳn vạch.</li></ul>',
      ],
      ['Sai — không bật nhảy, sẽ mất đà và chậm hơn.', 'Đúng — cúi ngực về trước để cắt vạch đích sớm nhất.', 'Sai — không chậm lại trước đích, phải giữ tốc độ.', 'Sai — không dừng đột ngột ở đích.']),
  ]),

  M(2, 'Chạy 200m — Kỹ thuật chạy đường vòng', [
    Q('Chạy 200m khác 100m ở?', ['Không có đường vòng', 'Cùng kỹ thuật', 'Dài hơn 1 chút', 'Có đoạn đường vòng (cua)'], 3, '200m chạy hết 1 vòng cua sân điền kinh chuẩn.',
      [
        'Cự ly <b>200m</b> trên sân điền kinh chuẩn (đường chạy 400m) gồm <code>một đoạn đường vòng (cua)</code> rồi mới vào đoạn thẳng về đích — khác hẳn 100m chạy <b>toàn đường thẳng</b>.<ul><li>Đây là điểm kỹ thuật mấu chốt của bài 200m.</li></ul>',
        '<i>Hệ quả:</i> người chạy phải làm chủ kỹ thuật <code>chạy đường vòng</code> mà bài 100m không cần.<ul><li>200m vẫn thuộc nhóm <b>chạy ngắn</b>, cần sức nhanh và sức bền tốc độ.</li></ul>',
      ],
      ['Sai — 200m có đường vòng, đó chính là điểm khác.', 'Sai — kỹ thuật khác do phải chạy qua đường vòng.', 'Sai — khác biệt chính là có đường vòng, không chỉ dài hơn.', 'Đúng — 200m có đoạn đường vòng (cua) khác với 100m chạy thẳng.']),
    Q('Khi chạy đường vòng, kỹ thuật?', ['Nghiêng người vào trong, tay trong vung ngắn hơn tay ngoài', 'Đứng thẳng', 'Chạy chậm', 'Nghiêng ra ngoài'], 0, 'Nghiêng người vào tâm sân, vai trái thấp hơn vai phải (vòng trái).',
      [
        'Kỹ thuật <b>chạy đường vòng</b>: <code>nghiêng thân vào phía trong</code> (vào tâm sân) để chống lại <b>lực ly tâm</b> đẩy ra ngoài. Vì chạy ngược chiều kim đồng hồ, vai trái hơi thấp hơn vai phải.<ul><li>Tay phía trong vung ngắn, tay ngoài vung rộng hơn.</li></ul>',
        '<i>Chân:</i> bàn chân phía trong đặt hơi chếch, đạp sau mạnh để giữ quỹ đạo bám sát mép trong làn.<ul><li>Nghiêng đúng giúp <code>không văng khỏi làn</code> và giữ được tốc độ.</li></ul>',
      ],
      ['Đúng — nghiêng người vào trong để chống lực ly tâm.', 'Sai — đứng thẳng sẽ bị văng ra ngoài.', 'Sai — không cần chạy chậm khi vào cua đúng kỹ thuật.', 'Sai — nghiêng ra ngoài sẽ làm văng khỏi làn.']),
    Q('Xuất phát 200m từ vị trí?', ['Cùng 1 điểm cong đầu đường vòng', 'So le để bù chiều dài đường vòng', 'Cùng vạch xuất phát', 'Khác nhau ngẫu nhiên'], 1, 'Xuất phát so le để các làn có cùng độ dài 200m.',
      [
        'Trong các cự ly có đường vòng (200m, 400m...), vạch xuất phát được bố trí <b>so le</b> giữa các làn: làn ngoài đặt trước, làn trong đặt sau.<ul><li>Vì <code>chu vi vòng ngoài dài hơn vòng trong</code>.</li></ul>',
        '<i>Mục đích:</i> bù phần dài thêm của làn ngoài để <b>mọi vận động viên chạy đúng 200m</b> — đảm bảo công bằng.<ul><li>Vị trí so le được tính toán chính xác, không ngẫu nhiên.</li></ul>',
      ],
      ['Sai — không cùng một điểm, các làn xuất phát so le.', 'Đúng — xuất phát so le để mọi làn có cùng quãng đường.', 'Sai — không cùng vạch vì làn ngoài dài hơn.', 'Sai — vị trí được tính toán so le, không ngẫu nhiên.']),
    Q('Chiến thuật chạy 200m?', ['Chạy hết sức từ đầu', 'Chạy đều', 'Tăng tốc đường thẳng → giữ tốc độ vòng cua → bứt tốc 50m cuối', 'Chậm lúc cuối'], 2, '200m cần phân phối sức: tăng tốc đầu, giữ qua cua, bứt cuối.',
      [
        '<b>Chiến thuật 200m</b>: bứt tốc tốt ở đoạn đầu/đoạn thẳng, <code>giữ tốc độ</code> ổn định khi vào cua, rồi <b>tăng tốc tối đa 50m cuối</b> trên đoạn thẳng về đích.<ul><li>Đây là cách phân phối sức hợp lý cho cự ly ngắn dài.</li></ul>',
        '<i>Vì sao không "hết sức từ đầu"?</i> 200m dài hơn 100m, dồn toàn lực sớm sẽ <code>đuối ở 50m cuối</code> — nơi quyết định thành tích.<ul><li>Cần <b>sức bền tốc độ</b> để duy trì pha chạy nhanh lâu hơn.</li></ul>',
      ],
      ['Sai — chạy hết sức từ đầu sẽ đuối ở cuối.', 'Sai — chạy đều không tối ưu cho cự ly 200m.', 'Đúng — tăng tốc đầu, giữ qua cua, bứt 50m cuối là chiến thuật tốt.', 'Sai — phải bứt tốc lúc cuối, không chậm lại.']),
    Q('Lỗi thường gặp khi chạy vòng?', ['Đứng thẳng (không nghiêng) → mất tốc độ', 'Tay vung đều', 'Tốc độ ổn', 'Nghiêng quá nhiều'], 0, 'Không nghiêng người = lực ly tâm đẩy ra ngoài, mất đà.',
      [
        '<b>Lỗi phổ biến khi vào cua</b>: <code>đứng thẳng người</code>, không nghiêng vào trong → <b>lực ly tâm</b> đẩy thân ra mép ngoài làn, người chạy phải gắng giữ thăng bằng nên mất đà, giảm tốc.<ul><li>Có thể đạp vạch hoặc văng sang làn khác (phạm quy).</li></ul>',
        '<i>Khắc phục:</i> tập nghiêng thân vừa đủ, đánh tay không đối xứng, đặt bàn chân chếch vào trong.<ul><li>Nghiêng <b>quá nhiều</b> cũng sai nhưng lỗi điển hình của học sinh là <code>không nghiêng đủ</code>.</li></ul>',
      ],
      ['Đúng — đứng thẳng không chống được lực ly tâm nên mất tốc độ.', 'Sai — tay vung đều không phải lỗi.', 'Sai — tốc độ ổn là tốt, không phải lỗi.', 'Sai — lỗi phổ biến là không nghiêng đủ, chứ không phải nghiêng quá.']),
  ]),

  M(3, 'Chạy bền — Phương pháp Cooper', [
    Q('Chạy bền là?', ['Đi bộ nhanh xen kẽ chạy nhẹ', 'Chạy nhanh ngắn', 'Chạy lúc nghỉ', 'Chạy với cường độ vừa phải, thời gian dài'], 3, 'Chạy bền = chạy dài (≥1500m), cường độ vừa phải để rèn sức bền.',
      [
        '<b>Chạy bền</b> (chủ đề Chạy cự ly trung bình/dài) là chạy <code>cường độ vừa phải trong thời gian dài</code>, cự ly từ 1500m trở lên, nhằm phát triển <b>sức bền</b> — khả năng vận động kéo dài mà không kiệt sức.<ul><li>Khác với chạy ngắn (sức nhanh, cự ly ngắn, gắng sức tối đa).</li></ul>',
        '<i>Cơ chế:</i> chạy bền chủ yếu dùng năng lượng <code>ưa khí (có oxy)</code>, rèn cho tim – phổi hoạt động hiệu quả.<ul><li>Phải <b>chạy liên tục</b>, không phải đi bộ xen kẽ.</li></ul>',
      ],
      ['Sai — chạy bền là chạy liên tục, không phải đi bộ xen kẽ.', 'Sai — chạy nhanh ngắn là chạy cự ly ngắn, không phải chạy bền.', 'Sai — chạy bền không liên quan đến lúc nghỉ.', 'Đúng — chạy bền là chạy cường độ vừa phải trong thời gian dài.']),
    Q('Test Cooper là?', ['Chạy 1km', 'Chạy hết sức trong 12 phút, đo quãng đường', 'Đi bộ 5km', 'Chạy 100m'], 1, 'Test Cooper (1968): chạy/đi 12 phút, đo quãng đường để đánh giá VO2max.',
      [
        '<b>Test Cooper</b> (bác sĩ Kenneth Cooper, 1968) là bài kiểm tra sức bền: <code>chạy/đi hết sức trong 12 phút</code>, đo <b>quãng đường</b> đạt được.<ul><li>Quãng đường càng dài → sức bền tim mạch càng tốt.</li></ul>',
        '<i>Ý nghĩa:</i> dùng để ước lượng <code>VO2max</code> — chỉ số hấp thụ oxy tối đa, thước đo thể lực ưa khí.<ul><li>Là công cụ đơn giản để học sinh tự đánh giá tiến bộ <b>chạy bền</b>.</li></ul>',
      ],
      ['Sai — Test Cooper đo theo thời gian 12 phút, không phải 1km cố định.', 'Đúng — chạy hết sức trong 12 phút rồi đo quãng đường đạt được.', 'Sai — không phải đi bộ 5km.', 'Sai — chạy 100m là cự ly ngắn, không phải test sức bền.']),
    Q('Nguyên tắc chạy bền?', ['Nghỉ liên tục', 'Chạy hết sức ngay', 'Phân phối sức đều, hít thở nhịp nhàng', 'Chạy nhanh chậm thất thường'], 2, 'Chạy bền cần phân phối đều, hít thở theo nhịp (vd: 3 bước hít, 3 bước thở).',
      [
        '<b>Nguyên tắc chạy bền</b>: <code>phân phối sức đều</code> trên cả cự ly và <b>hít thở nhịp nhàng</b> theo bước chân (ví dụ 3 bước hít vào – 3 bước thở ra).<ul><li>Giữ tốc độ ổn định, dành sức cho đoạn cuối.</li></ul>',
        '<i>Tránh:</i> <code>chạy hết sức ngay từ đầu</code> hoặc <code>nhanh – chậm thất thường</code> đều làm hao sức nhanh, dễ "hụt hơi".<ul><li>Hơi thở đều giúp cung cấp oxy ổn định cho cơ.</li></ul>',
      ],
      ['Sai — chạy bền không nghỉ liên tục.', 'Sai — chạy hết sức ngay sẽ nhanh đuối sức.', 'Đúng — phân phối sức đều và hít thở nhịp nhàng là nguyên tắc chạy bền.', 'Sai — chạy thất thường làm hao sức, không hiệu quả.']),
    Q('Hít thở khi chạy bền?', ['Chỉ thở miệng', 'Chỉ hít mũi', 'Nín thở', 'Hít bằng mũi, thở bằng miệng, nhịp đều'], 3, 'Hít bằng mũi (lọc), thở bằng miệng để thoát nhiệt và CO2.',
      [
        '<b>Hít thở khi chạy bền</b>: <code>hít vào bằng mũi</code> (lọc, làm ấm không khí), <code>thở ra bằng miệng</code> (thoát nhanh CO₂ và nhiệt), giữ <b>nhịp đều</b> theo bước chân.<ul><li>Kết hợp cả mũi và miệng giúp lấy đủ oxy khi gắng sức.</li></ul>',
        '<i>Lưu ý:</i> không bao giờ <code>nín thở</code>; cũng không chỉ thở nông bằng miệng vì dễ khô họng, mất nước.<ul><li>Hơi thở sâu, đều giúp duy trì sức bền lâu hơn.</li></ul>',
      ],
      ['Sai — không chỉ thở miệng, nên hít bằng mũi.', 'Sai — cần kết hợp thở ra bằng miệng nữa.', 'Sai — không bao giờ nín thở khi chạy bền.', 'Đúng — hít bằng mũi, thở bằng miệng, giữ nhịp đều.']),
    Q('Lợi ích chạy bền?', ['Không có lợi', 'Mệt mỏi', 'Tăng sức bền tim phổi, đốt mỡ, cải thiện sức khoẻ', 'Chỉ giảm cân'], 2, 'Chạy bền cải thiện toàn diện hệ tim mạch, hô hấp, đốt mỡ, tinh thần.',
      [
        '<b>Lợi ích của chạy bền</b>: tăng <code>sức bền tim – phổi</code>, đốt mỡ thừa, cải thiện tuần hoàn và sức khoẻ tổng thể, giảm căng thẳng.<ul><li>Là nền tảng thể lực cho mọi môn thể thao khác.</li></ul>',
        '<i>Toàn diện:</i> không chỉ giảm cân — chạy bền còn rèn <b>ý chí</b>, sự kiên trì và tinh thần vượt khó.<ul><li>Tập đều giúp nhịp tim nghỉ thấp hơn — dấu hiệu tim khoẻ.</li></ul>',
      ],
      ['Sai — chạy bền có rất nhiều lợi ích.', 'Sai — mệt mỏi tạm thời không phải lợi ích.', 'Đúng — chạy bền tăng sức bền tim phổi, đốt mỡ và cải thiện sức khoẻ.', 'Sai — lợi ích rộng hơn nhiều chứ không chỉ giảm cân.']),
  ]),

  M(4, 'Bài thể dục liên hoàn nâng cao', [
    Q('Bài thể dục liên hoàn giúp?', ['Không có tác dụng', 'Phát triển các nhóm cơ và phối hợp toàn thân', 'Giải trí', 'Chỉ phát triển 1 nhóm cơ'], 1, 'Thể dục liên hoàn = chuỗi động tác phối hợp, phát triển toàn diện.',
      [
        '<b>Bài thể dục liên hoàn</b> (chủ đề Bài tập thể dục, SGK GDTC 8) là <code>chuỗi nhiều động tác nối tiếp liền mạch</code>, tác động lên <b>nhiều nhóm cơ</b> (tay, chân, lườn, bụng, lưng) và rèn khả năng <b>phối hợp toàn thân</b>.<ul><li>Bài lớp 8 nâng cao hơn lớp 6–7 về số động tác và độ khó.</li></ul>',
        '<i>Tác dụng:</i> phát triển sức mạnh, mềm dẻo, khéo léo và trí nhớ vận động (nhớ thứ tự động tác).<ul><li>Không phải chỉ một nhóm cơ — đó là điểm mạnh của bài liên hoàn.</li></ul>',
      ],
      ['Sai — bài liên hoàn có tác dụng rèn luyện rõ rệt.', 'Đúng — phát triển nhiều nhóm cơ và phối hợp toàn thân.', 'Sai — không chỉ để giải trí mà còn rèn thể chất.', 'Sai — bài liên hoàn rèn nhiều nhóm cơ, không chỉ một.']),
    Q('Trình tự thực hiện bài liên hoàn?', ['Thực hiện theo thứ tự ngẫu nhiên do nhóm chọn', 'Bài chính ngay', 'Thả lỏng trước', 'Khởi động → bài chính → thả lỏng'], 3, 'Luôn khởi động trước, làm bài chính, thả lỏng sau.',
      [
        '<b>Trình tự một buổi tập chuẩn</b>: <code>Khởi động</code> → <code>bài tập chính (bài liên hoàn)</code> → <code>thả lỏng (hồi tĩnh)</code>.<ul><li>Đây là cấu trúc bắt buộc trong mọi giờ GDTC.</li></ul>',
        '<i>Lý do:</i> khởi động làm nóng cơ – khớp để tránh chấn thương; thả lỏng đưa cơ thể về trạng thái nghỉ an toàn.<ul><li>Không bao giờ vào <b>bài chính ngay</b> khi cơ còn "lạnh".</li></ul>',
      ],
      ['Sai — không làm ngẫu nhiên, phải theo trình tự chuẩn.', 'Sai — không vào bài chính ngay khi chưa khởi động.', 'Sai — thả lỏng làm sau cùng, không phải trước.', 'Đúng — luôn khởi động, rồi bài chính, sau đó thả lỏng.']),
    Q('Mục đích khởi động?', ['Giảm sức', 'Không cần', 'Tăng nhiệt cơ thể, chuẩn bị hệ vận động, tránh chấn thương', 'Mất thời gian'], 2, 'Khởi động làm ấm cơ, tăng tuần hoàn, giảm nguy cơ chấn thương.',
      [
        '<b>Khởi động</b> nhằm <code>tăng nhiệt độ cơ thể</code>, làm nóng cơ – khớp, tăng tuần hoàn máu và <b>chuẩn bị hệ vận động</b> cho bài tập chính → giảm nguy cơ <b>chấn thương</b> (căng cơ, bong gân).<ul><li>Gồm khởi động chung (chạy nhẹ, xoay khớp) và khởi động chuyên môn.</li></ul>',
        '<i>Cơ chế:</i> cơ ấm thì sợi cơ co duỗi linh hoạt, ít rách; khớp ấm tiết dịch nhờn, trơn hơn.<ul><li>Thời gian khởi động hợp lý: <code>5–10 phút</code>.</li></ul>',
      ],
      ['Sai — khởi động chuẩn bị cho cơ thể chứ không giảm sức.', 'Sai — khởi động rất cần thiết trước khi tập.', 'Đúng — khởi động làm ấm cơ thể, chuẩn bị vận động, tránh chấn thương.', 'Sai — khởi động không phải lãng phí mà rất quan trọng.']),
    Q('Thả lỏng sau tập?', ['Giảm nhịp tim từ từ, kéo giãn cơ, tránh đau cơ', 'Dừng đột ngột', 'Uống nước đá', 'Ngồi xuống ngay'], 0, 'Thả lỏng dần giúp cơ thể hồi phục, giảm đau nhức.',
      [
        '<b>Thả lỏng (hồi tĩnh)</b> sau tập giúp <code>giảm nhịp tim từ từ</code>, đưa hơi thở về bình thường, <b>kéo giãn cơ</b> để giảm đau mỏi và đào thải axit lactic.<ul><li>Thường gồm đi bộ nhẹ + các động tác giãn cơ tĩnh.</li></ul>',
        '<i>Vì sao không dừng đột ngột?</i> Ngừng vận động đột ngột khiến máu dồn ở chi dưới, <code>dễ choáng, hại tim mạch</code>.<ul><li>Không uống nước đá ngay sau khi tập gắng sức.</li></ul>',
      ],
      ['Đúng — thả lỏng giúp giảm nhịp tim từ từ, giãn cơ, tránh đau cơ.', 'Sai — dừng đột ngột có hại cho tim mạch.', 'Sai — uống nước đá sau tập không tốt cho cơ thể.', 'Sai — ngồi xuống ngay khiến máu dồn, dễ choáng.']),
    Q('Phối hợp nhịp với động tác?', ['Đếm 1-2-3-4-5-6-7-8 đồng bộ', 'Nhanh nhất có thể', 'Chậm nhất', 'Đếm theo nhịp tim của mỗi cá nhân'], 0, 'Đếm nhịp 8 chuẩn đảm bảo đồng bộ trong nhóm và đúng kỹ thuật.',
      [
        '<b>Đếm nhịp 8</b> (<code>1-2-3-4-5-6-7-8</code>) là cách định nhịp chuẩn cho bài thể dục: mỗi nhịp ứng với một động tác, giúp cả lớp <b>đồng bộ</b> và thực hiện đúng tốc độ.<ul><li>Bài liên hoàn thường gồm nhiều "lần 8 nhịp" (2×8, 4×8...).</li></ul>',
        '<i>Vì sao không "nhanh/chậm nhất"?</i> Làm sai nhịp sẽ phá vỡ tính đồng bộ và <code>sai kỹ thuật động tác</code>.<ul><li>Nhịp đếm cố định, không theo nhịp tim cá nhân vì mỗi người khác nhau.</li></ul>',
      ],
      ['Đúng — đếm nhịp 8 giúp cả nhóm đồng bộ và đúng kỹ thuật.', 'Sai — làm nhanh nhất sẽ sai kỹ thuật và mất đồng bộ.', 'Sai — làm chậm nhất không phải mục tiêu.', 'Sai — không đếm theo nhịp tim cá nhân vì sẽ lệch nhau.']),
  ]),

  M(5, 'Nhảy cao — Kỹ thuật nằm nghiêng', [
    Q('4 giai đoạn nhảy cao?', ['Khởi động → nhảy', 'Chạy đà → giậm nhảy → bay qua xà → tiếp đất', 'Chạy → nhảy → nằm', 'Đứng → nhảy → đáp'], 1, '4 giai đoạn: chạy đà, giậm nhảy, bay qua xà, tiếp đất.',
      [
        'Kỹ thuật <b>nhảy cao</b> (SGK GDTC 8) gồm <b>4 giai đoạn</b>: <code>chạy đà</code> → <code>giậm nhảy</code> → <code>trên không (bay qua xà)</code> → <code>tiếp đất</code>.<ul><li>Đây là cấu trúc chung cho mọi kiểu nhảy cao.</li></ul>',
        '<i>Nhiệm vụ từng pha:</i> chạy đà tạo tốc độ, giậm nhảy đổi tốc độ ngang thành lực bật lên, pha trên không vượt qua xà, tiếp đất an toàn.<ul><li>Lớp 8 học kiểu <b>nằm nghiêng (bước qua)</b>.</li></ul>',
      ],
      ['Sai — đây không phải đủ 4 giai đoạn kỹ thuật.', 'Đúng — chạy đà, giậm nhảy, bay qua xà, tiếp đất là 4 giai đoạn.', 'Sai — không đủ và không đúng các giai đoạn nhảy cao.', 'Sai — đây không phải các giai đoạn kỹ thuật nhảy cao.']),
    Q('Kiểu nằm nghiêng (lưng qua xà)?', ['Quay đầu qua', 'Thân nằm song song xà, vắt qua, lưng xuống trước', 'Ngồi qua', 'Đứng qua'], 1, 'Kiểu nằm nghiêng: thân nằm song song xà, vắt qua, lưng/hông xuống đệm.',
      [
        '<b>Nhảy cao kiểu nằm nghiêng</b>: ở pha trên không, <code>thân nằm gần song song với xà</code>, lần lượt vắt từng phần cơ thể qua xà, lưng/hông hướng xuống đệm khi tiếp đất.<ul><li>Khác kiểu "bước qua" (úp bụng) ở tư thế thân trên xà.</li></ul>',
        '<i>Ưu điểm:</i> hạ thấp trọng tâm khi qua xà, tận dụng tốt lực giậm nhảy.<ul><li>Học sinh THCS thường học kiểu này trước khi tới kiểu "lưng qua xà" (Fosbury) phức tạp hơn.</li></ul>',
      ],
      ['Sai — không phải quay đầu qua xà.', 'Đúng — thân nằm song song xà, vắt qua, lưng xuống trước.', 'Sai — không ngồi qua xà.', 'Sai — không đứng qua xà.']),
    Q('Chân giậm nhảy là?', ['Chân thuận khi viết hoặc cầm bút', 'Chân yếu', 'Chân khoẻ hơn, đạp đất tạo lực bay', 'Cả 2 chân'], 2, 'Chân giậm = chân khoẻ hơn, đạp đất mạnh để tạo lực thẳng đứng.',
      [
        '<b>Chân giậm nhảy</b> là <code>chân khoẻ hơn</code>, đạp mạnh xuống đất ở pha giậm nhảy để biến tốc độ chạy đà thành <b>lực bật thẳng đứng</b> đưa cơ thể lên cao.<ul><li>Chỉ giậm bằng <b>một chân</b>, không phải cả hai.</li></ul>',
        '<i>Phân biệt:</i> chân giậm không liên quan đến "tay thuận viết bút"; nó được xác định bằng sức bật của chân.<ul><li>Chân còn lại là <code>chân lăng</code>, đá lên hỗ trợ đưa cơ thể qua xà.</li></ul>',
      ],
      ['Sai — chân giậm liên quan đến sức chân, không phải tay viết.', 'Sai — phải dùng chân khoẻ hơn để giậm.', 'Đúng — chân giậm là chân khoẻ hơn, đạp đất tạo lực bay.', 'Sai — chỉ giậm bằng một chân, không phải cả hai.']),
    Q('Chiều dài chạy đà?', ['3 bước', '5 bước, vuông góc 90° với xà', '15 bước', 'Khoảng 7–9 bước, góc 30–40° với xà'], 3, 'Chạy đà 7–9 bước, góc 30–40° để vào xà đúng kỹ thuật.',
      [
        '<b>Chạy đà nhảy cao</b> kiểu nằm nghiêng thường dài <code>khoảng 7–9 bước</code>, chạy chếch một <b>góc 30–40°</b> so với xà (không vuông góc).<ul><li>Góc chếch giúp vào xà thuận lợi và đá chân lăng đúng hướng.</li></ul>',
        '<i>Vì sao không quá ngắn/quá dài?</i> 3 bước không đủ đà; 15 bước thì thừa, khó căn điểm giậm chính xác.<ul><li>Tốc độ đà <b>tăng dần</b>, đạt cao nhất ở bước giậm nhảy.</li></ul>',
      ],
      ['Sai — 3 bước quá ngắn để tạo đủ đà.', 'Sai — góc 90° không phù hợp, và 5 bước hơi ít.', 'Sai — 15 bước quá dài cho nhảy cao.', 'Đúng — khoảng 7–9 bước, góc 30–40° với xà là hợp lý.']),
    Q('Tiếp đất an toàn?', ['Bụng xuống', 'Chân thẳng', 'Đầu xuống', 'Lưng hoặc hông xuống đệm dày'], 3, 'Tiếp đệm bằng lưng/hông (vùng cơ lớn), không bao giờ đầu hoặc chân thẳng (chấn thương).',
      [
        '<b>Tiếp đất an toàn</b> trong nhảy cao: rơi xuống <code>đệm dày</code> bằng <b>lưng hoặc hông</b> — những vùng cơ lớn, ít rủi ro chấn thương.<ul><li>Đệm phải đủ dày và đặt đúng vị trí rơi.</li></ul>',
        '<i>Tuyệt đối tránh:</i> tiếp đất bằng <code>đầu/gáy</code> (nguy hiểm cho cột sống cổ) hoặc <code>chân thẳng cứng</code> (chấn thương khớp gối, cổ chân).<ul><li>An toàn là yêu cầu hàng đầu khi tập nhảy cao.</li></ul>',
      ],
      ['Sai — tiếp bụng không an toàn.', 'Sai — chân thẳng dễ gây chấn thương khớp.', 'Sai — đầu xuống cực kỳ nguy hiểm cho cổ.', 'Đúng — tiếp bằng lưng hoặc hông trên đệm dày là an toàn.']),
  ]),

  M(6, 'Nhảy xa — Kiểu ưỡn thân', [
    Q('Kỹ thuật nhảy xa kiểu ưỡn thân?', ['Ngồi xổm', 'Cúi gập', 'Đứng thẳng', 'Bay xa với thân ưỡn cong sau, sau đó co lại trước tiếp đất'], 3, 'Kiểu ưỡn thân: ở giai đoạn bay, thân ưỡn cong, sau co lại đẩy chân ra xa.',
      [
        '<b>Nhảy xa kiểu ưỡn thân</b> (SGK GDTC 8): ở pha trên không, thân <code>ưỡn cong về sau</code> (như cánh cung) để giữ thăng bằng và kéo dài quỹ đạo bay, rồi <b>co gập lại</b>, vươn hai chân ra xa trước khi tiếp đất.<ul><li>Khó hơn kiểu "ngồi" học ở lớp dưới.</li></ul>',
        '<i>Mục đích:</i> tư thế ưỡn thân giúp đưa chân ra xa hơn ở thời điểm chạm cát → thành tích dài hơn.<ul><li>Cần phối hợp tốt giữa giậm nhảy và động tác trên không.</li></ul>',
      ],
      ['Sai — ngồi xổm không phải kỹ thuật ưỡn thân.', 'Sai — cúi gập không phải đặc trưng kiểu ưỡn thân.', 'Sai — đứng thẳng không tạo được pha ưỡn thân khi bay.', 'Đúng — thân ưỡn cong khi bay rồi co lại đẩy chân ra xa khi tiếp đất.']),
    Q('Giai đoạn nhảy xa?', ['3 bước → nhảy', 'Chạy đà → giậm nhảy → bay trên không → tiếp đất', 'Đi → nhảy', 'Đứng → nhảy'], 1, '4 giai đoạn nhảy xa.',
      [
        'Kỹ thuật <b>nhảy xa</b> gồm <b>4 giai đoạn</b>: <code>chạy đà</code> → <code>giậm nhảy</code> → <code>bay trên không</code> → <code>tiếp đất (chạm cát)</code>.<ul><li>Giống cấu trúc nhảy cao nhưng hướng lực ra <b>xa</b> thay vì lên cao.</li></ul>',
        '<i>Then chốt:</i> giậm nhảy đúng chân, đúng ván giậm, đổi tốc độ chạy đà thành lực bật chếch về trước.<ul><li>Chạy đà phải đạt tốc độ cao ở bước cuối.</li></ul>',
      ],
      ['Sai — không đủ các giai đoạn kỹ thuật.', 'Đúng — chạy đà, giậm nhảy, bay trên không, tiếp đất.', 'Sai — đi rồi nhảy không phải kỹ thuật nhảy xa.', 'Sai — đứng rồi nhảy không tạo đủ đà.']),
    Q('Chạy đà nhảy xa?', ['3 bước', '50 bước', '3–5 bước, chạy chậm rồi nhảy', '15–20 bước, tăng dần tốc độ'], 3, 'Đà 15–20 bước, tốc độ cao dần đạt cực đại ở vạch giậm nhảy.',
      [
        '<b>Chạy đà nhảy xa</b> thường dài <code>15–20 bước</code>, tốc độ <b>tăng dần</b> để đạt cực đại ngay tại <code>ván giậm nhảy</code> — vì thành tích phụ thuộc rất lớn vào tốc độ chạy đà.<ul><li>Đà dài hơn nhảy cao vì cần tốc độ ngang lớn.</li></ul>',
        '<i>Lưu ý:</i> phải căn bước để chân giậm đặt đúng ván, không phạm vạch (lỗi giậm chân quá vạch không tính thành tích).<ul><li>3 bước hay chạy chậm thì không đủ tốc độ.</li></ul>',
      ],
      ['Sai — 3 bước quá ngắn để tạo tốc độ.', 'Sai — 50 bước quá dài, gây mỏi và mất kiểm soát.', 'Sai — chạy chậm thì không đủ tốc độ giậm nhảy.', 'Đúng — đà 15–20 bước, tăng dần tốc độ đến cực đại ở vạch giậm.']),
    Q('Tiếp đất nhảy xa đo từ?', ['Đến đầu', 'Vạch giậm nhảy đến vết tiếp đất gần nhất', 'Đến vết xa nhất', 'Đến vai'], 1, 'Đo từ vạch giậm đến điểm tiếp đất GẦN NHẤT (gót, mông…).',
      [
        '<b>Cách đo thành tích nhảy xa</b>: đo từ <code>mép trong ván giậm</code> (vạch giậm nhảy) đến <b>vết tiếp đất gần nhất</b> mà bất kỳ bộ phận cơ thể để lại trên cát.<ul><li>Đo theo đường vuông góc với vạch giậm.</li></ul>',
        '<i>Hệ quả kỹ thuật:</i> nếu tiếp đất rồi ngã ngửa/chống tay ra sau, vết gần nhất bị tính sẽ làm <b>mất thành tích</b>.<ul><li>Vì vậy phải vươn chân ra xa và ngã người về trước khi chạm cát.</li></ul>',
      ],
      ['Sai — không đo đến đầu.', 'Đúng — đo từ vạch giậm đến vết tiếp đất gần nhất.', 'Sai — đo đến vết gần nhất, không phải xa nhất.', 'Sai — không đo đến vai.']),
    Q('Lỗi phổ biến nhảy xa?', ['Tay vung', 'Bước cuối ngắn, giậm sai chân, ngồi bệt', 'Chân vuông góc', 'Bay xa'], 1, 'Lỗi thường gặp: bước cuối ngắn (mất đà), giậm sai chân, tiếp đất ngồi bệt mông sớm.',
      [
        '<b>Lỗi phổ biến khi nhảy xa</b>: <code>bước cuối ngắn lại</code> (mất tốc độ giậm nhảy), <code>giậm sai chân/quá ván</code>, và <code>ngồi bệt mông sớm</code> khi tiếp đất làm vết gần nhất gần lại → thành tích kém.<ul><li>Đây là những lỗi cần sửa ngay khi tập.</li></ul>',
        '<i>Khắc phục:</i> tập căn đà ổn định, giữ tốc độ ở bước cuối, vươn chân và đổ người về trước lúc chạm cát.<ul><li>Vung tay là động tác hỗ trợ giữ thăng bằng, không phải lỗi.</li></ul>',
      ],
      ['Sai — vung tay là động tác hỗ trợ, không phải lỗi.', 'Đúng — bước cuối ngắn, giậm sai chân, ngồi bệt là các lỗi thường gặp.', 'Sai — chân vuông góc không phải lỗi điển hình.', 'Sai — bay xa là kết quả tốt, không phải lỗi.']),
  ]),

  M(7, 'Đẩy tạ — Kỹ thuật cơ bản', [
    Q('Đẩy tạ là môn?', ['Thể thao dưới nước', 'Môn đối kháng cá nhân', 'Môn bóng đồng đội', 'Điền kinh ném đẩy'], 3, 'Đẩy tạ thuộc nhóm môn ném đẩy của điền kinh.',
      [
        '<b>Đẩy tạ</b> thuộc nhóm các môn <code>ném – đẩy</code> của <b>điền kinh</b> (cùng nhóm với ném lao, ném đĩa, ném tạ xích).<ul><li>Đây là môn cá nhân, đo thành tích bằng khoảng cách tạ rơi.</li></ul>',
        '<i>Đặc điểm:</i> cần phối hợp <code>sức mạnh</code> của chân – thân – tay để đẩy quả tạ đi xa, kèm kỹ thuật chính xác.<ul><li>Không phải môn đối kháng hay môn bóng đồng đội.</li></ul>',
      ],
      ['Sai — đẩy tạ không phải môn dưới nước.', 'Sai — đẩy tạ không phải môn đối kháng.', 'Sai — đẩy tạ là môn cá nhân, không phải bóng đồng đội.', 'Đúng — đẩy tạ thuộc nhóm ném đẩy của điền kinh.']),
    Q('Khối lượng tạ HS nữ THCS?', ['7,26 kg', '~3 kg', '1 kg', '10 kg'], 1, 'Tạ HS nữ THCS khoảng 3 kg; nam ~4 kg (tuỳ cấp học).',
      [
        '<b>Khối lượng tạ tập luyện</b> cho học sinh THCS được giảm nhẹ phù hợp lứa tuổi: nữ <code>khoảng 3 kg</code>, nam khoảng 4 kg (tuỳ quy định từng cấp/giải).<ul><li>Mục tiêu là tập đúng kỹ thuật, không phải nâng tạ nặng.</li></ul>',
        '<i>So sánh:</i> tạ thi đấu nam VĐV chuyên nghiệp là <code>7,26 kg</code> — quá nặng và nguy hiểm với học sinh.<ul><li>Dùng tạ quá nặng dễ gây <b>chấn thương cổ tay, lưng</b>.</li></ul>',
      ],
      ['Sai — 7,26 kg là tạ nam VĐV chuyên nghiệp, quá nặng cho HS.', 'Đúng — tạ HS nữ THCS khoảng 3 kg.', 'Sai — 1 kg quá nhẹ so với chuẩn HS THCS.', 'Sai — 10 kg quá nặng cho HS THCS.']),
    Q('Vị trí cầm tạ?', ['Trên cổ tay/ngón tay, sát cằm', 'Trong lòng bàn tay', 'Sau lưng', 'Trên đầu'], 0, 'Cầm tạ trên các đốt ngón tay (không lòng bàn tay), giữ sát cằm.',
      [
        '<b>Cách giữ tạ</b>: đặt tạ trên <code>các đốt/chân ngón tay</code> (không lọt sâu vào lòng bàn tay), áp sát vào <b>cằm/cổ – dưới hàm</b>, khuỷu tay nâng ngang.<ul><li>Tư thế này giữ tạ ổn định và dồn được lực khi đẩy.</li></ul>',
        '<i>Vì sao không để trong lòng bàn tay?</i> Tạ sẽ <code>trượt</code> và dồn lực sai, dễ làm <b>đau, trẹo cổ tay</b>.<ul><li>Tạ luôn áp sát cổ cho tới khi bắt đầu pha đẩy ra.</li></ul>',
      ],
      ['Đúng — đặt tạ trên ngón tay, áp sát cằm.', 'Sai — đặt trong lòng bàn tay dễ trượt và đau cổ tay.', 'Sai — không để tạ sau lưng.', 'Sai — không giữ tạ trên đầu.']),
    Q('Kỹ thuật đẩy tạ?', ['Lùi vai → xoay người → đẩy tay thẳng theo hướng tạ bay', 'Thả từ trên cao', 'Hất tay', 'Ném như bóng'], 0, 'Đẩy (push) chứ không ném: lực xuất phát từ chân-eo-vai-tay, đẩy tạ ra.',
      [
        '<b>Kỹ thuật đẩy tạ</b>: lực truyền theo chuỗi <code>chân → eo → vai → tay</code>; người <b>lùi vai, xoay thân</b> rồi <code>đẩy tay duỗi thẳng</code> theo hướng tạ bay (chếch lên khoảng 40–42°).<ul><li>Là động tác "đẩy" (push), không phải "ném".</li></ul>',
        '<i>Phân biệt:</i> <code>hất tay</code> hay <code>ném như ném bóng</code> là sai kỹ thuật, dễ trẹo cổ tay và phạm luật.<ul><li>Luật quy định phải đẩy tạ từ vai bằng một tay, không được kéo ra sau rồi vung.</li></ul>',
      ],
      ['Đúng — lùi vai, xoay người rồi đẩy tay thẳng theo hướng tạ bay.', 'Sai — không thả tạ từ trên cao.', 'Sai — hất tay là động tác sai và dễ chấn thương cổ tay.', 'Sai — phải đẩy, không ném như bóng.']),
    Q('An toàn khi đẩy tạ?', ['Đẩy tự do', 'Đẩy về sau', 'Khu vực phía trước phải trống, đứng đúng vạch', 'Có người đứng phía trước'], 2, 'Tạ rất nặng — khu vực rơi phải hoàn toàn trống, đảm bảo an toàn người xung quanh.',
      [
        '<b>An toàn khi đẩy tạ</b>: <code>khu vực phía trước (vùng tạ rơi) phải hoàn toàn trống</code>, người tập đứng đúng vòng/vạch giậm, chỉ đẩy khi có hiệu lệnh.<ul><li>Tạ rất nặng — rơi trúng người gây chấn thương nghiêm trọng.</li></ul>',
        '<i>Quy tắc lớp học:</i> chỉ một người đẩy mỗi lượt, người khác đứng <b>phía sau</b>; chỉ ra nhặt tạ khi đã có lệnh an toàn.<ul><li>Tuyệt đối không để ai đứng phía trước hoặc đẩy về sau.</li></ul>',
      ],
      ['Sai — không đẩy tự do, phải theo hướng và vạch quy định.', 'Sai — không đẩy về sau, rất nguy hiểm.', 'Đúng — khu vực phía trước phải trống và đứng đúng vạch.', 'Sai — tuyệt đối không để ai đứng phía trước khi đẩy tạ.']),
  ]),

  M(8, 'Đá cầu — Đá tâng và đỡ cầu nhóm', [
    Q('Đá cầu là môn?', ['Bóng đá', 'Cầu lông', 'Bóng chuyền', 'Truyền thống VN, đá cầu lông gà bằng chân'], 3, 'Đá cầu = môn truyền thống VN, dùng chân (chủ yếu) tâng/đỡ cầu lông gà.',
      [
        '<b>Đá cầu</b> là môn thể thao <code>truyền thống Việt Nam</code>, sử dụng <b>chân</b> (chủ yếu) để tâng và chuyền quả cầu lông gà qua lưới hoặc giữ cầu trong nhóm.<ul><li>Có thi đấu chính thức trong SEA Games.</li></ul>',
        '<i>Phân biệt:</i> khác cầu lông (dùng vợt), bóng đá (bóng tròn lớn) hay bóng chuyền (dùng tay).<ul><li>Đá cầu rèn <b>khéo léo, phản xạ và phối hợp chân</b>.</li></ul>',
      ],
      ['Sai — bóng đá là môn khác, dùng bóng tròn.', 'Sai — cầu lông dùng vợt, không phải đá cầu.', 'Sai — bóng chuyền là môn khác.', 'Đúng — đá cầu là môn truyền thống VN, dùng chân tâng cầu lông gà.']),
    Q('Đá tâng cơ bản dùng?', ['Đầu gối', 'Mu bàn chân, đỡ cầu lên cao', 'Gót chân', 'Mũi chân'], 1, 'Tâng cầu chủ yếu bằng mu bàn chân (cờ-rép-đờ-pi-ê).',
      [
        '<b>Đá tâng cầu cơ bản</b> chủ yếu dùng <code>mu bàn chân</code> (phần mu trong/mu chính diện): bề mặt phẳng, rộng nên dễ <b>đỡ cầu lên cao</b> và kiểm soát hướng.<ul><li>Đây là kỹ thuật nền tảng trước khi học tâng đùi, má trong.</li></ul>',
        '<i>Vì sao không dùng mũi/gót?</i> Mũi chân nhỏ khó canh điểm chạm; gót chân khó tâng cầu lên đều.<ul><li>Mu bàn chân giữ cầu <b>ổn định</b> nhất cho người mới tập.</li></ul>',
      ],
      ['Sai — tâng bằng đầu gối ít chính xác cho động tác cơ bản.', 'Đúng — tâng cầu cơ bản chủ yếu bằng mu bàn chân.', 'Sai — gót chân không dùng cho đá tâng cơ bản.', 'Sai — mũi chân khó kiểm soát cầu khi tâng.']),
    Q('Đá cầu nhóm chuyền cho nhau cần?', ['Tâng tại chỗ', 'Đỡ cao, đẩy lực vừa phải đến đồng đội', 'Đá ra xa', 'Đá mạnh'], 1, 'Chuyền nhóm: tâng cầu lên cao + đẩy nhẹ sang đồng đội với lực vừa phải.',
      [
        '<b>Đá cầu chuyền nhóm</b>: đỡ cầu <code>lên cao vừa phải</code> rồi <b>đẩy với lực vừa</b> hướng tới đồng đội, để bạn có thời gian và tầm đỡ tiếp.<ul><li>Phối hợp nhịp nhàng giữ cầu không rơi.</li></ul>',
        '<i>Sai lầm:</i> <code>đá quá mạnh/ra xa</code> khiến đồng đội không kịp đỡ; <code>tâng tại chỗ</code> thì không chuyền được.<ul><li>Lực và hướng phải tính tới vị trí người nhận.</li></ul>',
      ],
      ['Sai — tâng tại chỗ không chuyền được cho đồng đội.', 'Đúng — đỡ cầu lên cao và đẩy lực vừa phải đến đồng đội.', 'Sai — đá ra xa khiến đồng đội khó đỡ.', 'Sai — đá mạnh quá làm cầu vượt tầm đồng đội.']),
    Q('Tư thế chuẩn bị đá cầu?', ['Đứng thẳng', 'Ngồi xổm', 'Trùng gối nhẹ, mắt theo cầu, trọng tâm thấp', 'Khom lưng'], 2, 'Tư thế "sẵn sàng": gối hơi trùng, trọng tâm thấp, sẵn sàng di chuyển.',
      [
        '<b>Tư thế chuẩn bị (sẵn sàng) đá cầu</b>: hai gối <code>hơi trùng</code>, trọng tâm <b>hạ thấp</b>, mắt luôn theo cầu, trọng lượng dồn nửa trước bàn chân để bật di chuyển nhanh.<ul><li>Sẵn sàng đỡ cầu ở mọi hướng.</li></ul>',
        '<i>Vì sao không đứng thẳng?</i> Đứng thẳng phản ứng chậm; ngồi xổm/khom lưng làm mất cân bằng, khó di chuyển.<ul><li>Trọng tâm thấp = ổn định + linh hoạt.</li></ul>',
      ],
      ['Sai — đứng thẳng khó di chuyển nhanh theo cầu.', 'Sai — ngồi xổm không phải tư thế sẵn sàng đá cầu.', 'Đúng — trùng gối nhẹ, mắt theo cầu, trọng tâm thấp.', 'Sai — khom lưng không tốt cho cân bằng.']),
    Q('Lợi ích đá cầu?', ['Chỉ rèn cơ chân, ít tác dụng tổng hợp', 'Phát triển khéo léo, phản xạ, phối hợp nhóm', 'Mất thời gian', 'Chỉ rèn sức mạnh'], 1, 'Đá cầu rèn khéo léo, phản xạ, phối hợp; là môn truyền thống nên cũng giữ gìn văn hoá.',
      [
        '<b>Lợi ích của đá cầu</b>: phát triển <code>sự khéo léo</code>, <code>phản xạ nhanh</code> và <b>khả năng phối hợp nhóm</b>; đồng thời góp phần giữ gìn môn thể thao <b>truyền thống dân tộc</b>.<ul><li>Rèn nhiều tố chất chứ không chỉ cơ chân.</li></ul>',
        '<i>Bổ sung:</i> đá cầu ít va chạm, phù hợp mọi lứa tuổi, dễ chơi ở sân nhỏ.<ul><li>Thiên về nhanh nhẹn – khéo léo hơn là sức mạnh.</li></ul>',
      ],
      ['Sai — đá cầu rèn nhiều tố chất, không chỉ cơ chân.', 'Đúng — đá cầu phát triển khéo léo, phản xạ và phối hợp nhóm.', 'Sai — đá cầu rất bổ ích, không lãng phí.', 'Sai — đá cầu thiên về khéo léo hơn là sức mạnh.']),
  ]),

  M(9, 'Bóng đá — Kỹ thuật chuyền bóng', [
    Q('Chuyền bóng ngắn dùng?', ['Mũi chân', 'Lòng trong bàn chân', 'Đầu gối', 'Gót chân'], 1, 'Chuyền ngắn (5–15m) chủ yếu bằng lòng trong bàn chân, độ chính xác cao.',
      [
        '<b>Chuyền bóng ngắn</b> (cự ly khoảng 5–15m) dùng <code>lòng trong bàn chân</code>: diện tiếp xúc rộng, phẳng nên <b>độ chính xác cao</b>, dễ điều khiển hướng bóng.<ul><li>Là kỹ thuật chuyền cơ bản, dùng nhiều nhất trong trận.</li></ul>',
        '<i>Điểm tựa:</i> chân trụ đặt cạnh bóng, mũi chân trụ hướng về phía chuyền; chân chuyền khoá cổ chân khi chạm bóng.<ul><li>Mũi chân/đầu gối khó điều khiển hướng chính xác.</li></ul>',
      ],
      ['Sai — mũi chân khó kiểm soát hướng bóng.', 'Đúng — chuyền ngắn dùng lòng trong bàn chân cho độ chính xác cao.', 'Sai — đầu gối không dùng để chuyền chính xác.', 'Sai — gót chân chỉ dùng cho tình huống đặc biệt.']),
    Q('Chuyền bóng dài dùng?', ['Lòng trong', 'Lòng ngoài bàn chân', 'Mu bàn chân', 'Đầu gối'], 2, 'Chuyền dài/sút xa dùng mu bàn chân để tạo lực lớn.',
      [
        '<b>Chuyền bóng dài / sút xa</b> dùng <code>mu bàn chân</code> (mu chính diện): tạo được <b>lực lớn</b>, đưa bóng đi xa và bổng.<ul><li>Cần lấy đà và vung chân mạnh, gập cổ chân khi chạm bóng.</li></ul>',
        '<i>So sánh:</i> lòng trong chính xác nhưng yếu lực (chuyền ngắn); mu chân mạnh lực (chuyền/sút dài).<ul><li>Lòng ngoài tạo bóng xoáy/cong cự ly ngắn–vừa.</li></ul>',
      ],
      ['Sai — lòng trong dùng cho chuyền ngắn chính xác.', 'Sai — lòng ngoài tạo bóng cong ngắn, không cho lực lớn.', 'Đúng — chuyền dài dùng mu bàn chân để tạo lực mạnh.', 'Sai — đầu gối không dùng để chuyền dài.']),
    Q('Trước khi chuyền, cần?', ['Quan sát đồng đội và đối phương', 'Chuyền tự do', 'Hỏi trọng tài', 'Nhắm mắt'], 0, 'Bóng đá hiện đại: quan sát trước khi nhận bóng để chuyền ngay với phương án tốt.',
      [
        '<b>Trước khi chuyền</b> cần <code>quan sát</code> vị trí đồng đội và đối phương để chọn phương án tốt nhất (chuyền cho ai, hướng nào, lực bao nhiêu).<ul><li>Bóng đá hiện đại: quan sát ngay <b>trước khi nhận bóng</b> để xử lý nhanh.</li></ul>',
        '<i>Vì sao quan trọng?</i> Quan sát giúp <code>tránh chuyền vào chân đối phương</code>, tạo đường chuyền có lợi cho tấn công.<ul><li>Chuyền tuỳ tiện dễ mất bóng.</li></ul>',
      ],
      ['Đúng — phải quan sát đồng đội và đối phương trước khi chuyền.', 'Sai — chuyền tuỳ tiện dễ mất bóng.', 'Sai — không cần hỏi trọng tài để chuyền.', 'Sai — nhắm mắt thì không thể chuyền chính xác.']),
    Q('Chiến thuật chuyền cơ bản?', ['Tự đi bóng mãi', 'Chỉ chuyền dài', 'Đứng yên', 'Chuyền-di chuyển không bóng (give and go)'], 3, 'Pass-and-move (chuyền và di chuyển) là nguyên tắc cơ bản của bóng đá.',
      [
        '<b>Chiến thuật cơ bản "chuyền – di chuyển"</b> (give and go / pass-and-move): chuyền bóng rồi <code>di chuyển ngay tới khoảng trống</code> để nhận lại bóng, kéo giãn hàng phòng ngự đối phương.<ul><li>Là nền tảng phối hợp nhóm trong bóng đá.</li></ul>',
        '<i>Vì sao hiệu quả?</i> Đối phương phải liên tục đuổi theo bóng và người, dễ tạo khoảng trống.<ul><li>Tự đi bóng mãi hoặc đứng yên đều dễ bị đoạt bóng.</li></ul>',
      ],
      ['Sai — tự đi bóng mãi dễ bị mất bóng.', 'Sai — chỉ chuyền dài không phải chiến thuật cơ bản.', 'Sai — đứng yên không tạo được phương án tấn công.', 'Đúng — chuyền rồi di chuyển (give and go) là nguyên tắc cơ bản.']),
    Q('Mục đích chuyền bóng?', ['Thể hiện cá nhân', 'Đưa bóng đến đồng đội an toàn, tạo cơ hội tấn công', 'Ăn thua đủ với đối phương', 'Đá đi cho khỏi mất bóng'], 1, 'Chuyền có mục đích: giữ bóng và phát triển tấn công.',
      [
        '<b>Mục đích của chuyền bóng</b>: <code>đưa bóng đến đồng đội an toàn</code>, giữ quyền kiểm soát bóng và <b>tạo cơ hội tấn công</b> (phát triển bóng lên phía trước).<ul><li>Chuyền là cách di chuyển bóng nhanh và ít rủi ro hơn dẫn bóng.</li></ul>',
        '<i>Tinh thần đồng đội:</i> chuyền vì lợi ích chung của đội, không phải để thể hiện cá nhân hay đá bừa.<ul><li>Đường chuyền tốt mở ra tình huống ghi bàn.</li></ul>',
      ],
      ['Sai — chuyền không phải để thể hiện cá nhân.', 'Đúng — chuyền để đưa bóng đến đồng đội an toàn, tạo cơ hội tấn công.', 'Sai — chuyền không nhằm ăn thua với đối phương.', 'Sai — chuyền có mục đích, không phải đá đi vô nghĩa.']),
  ]),

  M(10, 'Bóng đá — Chiến thuật cơ bản và sơ đồ', [
    Q('Sơ đồ phổ biến trong bóng đá 7 người HS?', ['1-3-3 hoặc 1-2-3-1', '1-11-0', '2-2-2-3', '0-0-0'], 0, 'Bóng đá 7 người thường chơi 1-3-3 hoặc 1-2-3-1 (thủ môn không tính vào số).',
      [
        '<b>Bóng đá 7 người</b> (phù hợp sân trường) thường dùng sơ đồ <code>1-3-3</code> hoặc <code>1-2-3-1</code> — con số chỉ hậu vệ – tiền vệ – tiền đạo, thủ môn không tính.<ul><li>Tổng cầu thủ trên sân (trừ thủ môn) là 6.</li></ul>',
        '<i>Ý nghĩa sơ đồ:</i> cách bố trí vị trí giúp <b>cân bằng công – thủ</b> và phân chia khu vực hoạt động rõ ràng.<ul><li>1-11-0 hay 2-2-2-3 vượt số người cho phép.</li></ul>',
      ],
      ['Đúng — 1-3-3 hoặc 1-2-3-1 là sơ đồ phổ biến cho 7 người.', 'Sai — 1-11-0 vượt quá số cầu thủ cho phép.', 'Sai — 2-2-2-3 cộng lại quá 7 cầu thủ.', 'Sai — 0-0-0 không phải sơ đồ thi đấu.']),
    Q('Vai trò hậu vệ?', ['Ghi bàn', 'Đỡ bóng', 'Thủ môn', 'Phòng ngự, cản phá tấn công đối phương'], 3, 'Hậu vệ chuyên phòng ngự, ngăn đối phương tiếp cận khung thành.',
      [
        '<b>Hậu vệ</b> có nhiệm vụ chính là <code>phòng ngự</code>: cản phá đợt tấn công của đối phương, không cho họ tiếp cận khung thành, hỗ trợ thủ môn.<ul><li>Hoạt động chủ yếu ở phần sân nhà.</li></ul>',
        '<i>Phân biệt vai trò:</i> ghi bàn là việc của <code>tiền đạo</code>, bắt/đỡ bóng bằng tay là của <code>thủ môn</code>.<ul><li>Hậu vệ hiện đại còn tham gia phát động tấn công từ tuyến dưới.</li></ul>',
      ],
      ['Sai — ghi bàn là nhiệm vụ chính của tiền đạo.', 'Sai — đỡ bóng (bắt bóng) là việc của thủ môn.', 'Sai — hậu vệ không phải thủ môn.', 'Đúng — hậu vệ phòng ngự, cản phá tấn công của đối phương.']),
    Q('Tiền đạo chính có nhiệm vụ?', ['Ghi bàn', 'Phát bóng', 'Phòng ngự', 'Đỡ phạt'], 0, 'Tiền đạo là mũi nhọn tấn công, có nhiệm vụ chính là ghi bàn.',
      [
        '<b>Tiền đạo</b> là mũi nhọn tấn công, nhiệm vụ chính là <code>ghi bàn</code>: chọn vị trí, dứt điểm, tận dụng cơ hội trước khung thành đối phương.<ul><li>Hoạt động chủ yếu ở phần sân đối phương.</li></ul>',
        '<i>Kỹ năng cần:</i> chọn vị trí thông minh, dứt điểm chính xác, tì đè và che bóng.<ul><li>Phát bóng, phòng ngự không phải nhiệm vụ chính của tiền đạo.</li></ul>',
      ],
      ['Đúng — tiền đạo có nhiệm vụ chính là ghi bàn.', 'Sai — phát bóng không phải nhiệm vụ chính của tiền đạo.', 'Sai — phòng ngự là việc của hậu vệ.', 'Sai — đỡ phạt không phải nhiệm vụ chính của tiền đạo.']),
    Q('Phòng ngự nhóm bằng cách?', ['Không kèm', 'Để 1 người', 'Tự phòng ngự', 'Kèm người + che chắn lẫn nhau'], 3, 'Phòng ngự nhóm: phối hợp kèm người + che chắn (cover) cho đồng đội.',
      [
        '<b>Phòng ngự nhóm</b>: phối hợp <code>kèm người</code> (theo sát đối thủ) với <code>che chắn (cover)</code> — đồng đội bọc lót phía sau người đang áp sát bóng.<ul><li>Nhiều người cùng phối hợp tạo lớp phòng ngự chắc chắn.</li></ul>',
        '<i>Vì sao cần phối hợp?</i> Một người không thể chặn hết; nếu bị vượt qua, người che chắn sẽ kịp bịt khoảng trống.<ul><li>Không kèm hoặc để một người gánh đều dễ bị xuyên phá.</li></ul>',
      ],
      ['Sai — không kèm thì đối phương dễ dàng tấn công.', 'Sai — để một người gánh thì dễ bị vượt qua.', 'Sai — phòng ngự nhóm cần phối hợp, không tự lo riêng.', 'Đúng — kèm người kết hợp che chắn cho đồng đội.']),
    Q('Khi mất bóng nên?', ['Pressing ngay để giành lại', 'Phàn nàn', 'Đứng yên', 'Bỏ về sân nhà luôn'], 0, 'Pressing/Counter-press ngay sau khi mất bóng là chiến thuật phổ biến hiện đại.',
      [
        '<b>Khi vừa mất bóng</b>: <code>pressing (gây áp lực) ngay lập tức</code> để giành lại bóng ngay tại khu vực vừa mất — gọi là counter-press.<ul><li>Đây là chiến thuật phổ biến của bóng đá hiện đại.</li></ul>',
        '<i>Lợi ích:</i> đoạt lại bóng nhanh khi đối phương chưa kịp tổ chức tấn công, ngay ở phần sân cao.<ul><li>Đứng yên/phàn nàn cho đối phương thời gian triển khai.</li></ul>',
      ],
      ['Đúng — pressing ngay để giành lại bóng là chiến thuật hiện đại.', 'Sai — phàn nàn không giúp giành lại bóng.', 'Sai — đứng yên cho đối phương tổ chức tấn công.', 'Sai — bỏ về sân nhà ngay làm mất cơ hội đoạt lại bóng.']),
  ]),

  M(11, 'Bóng rổ — Kỹ thuật chuyền 2 tay trước ngực', [
    Q('Chuyền 2 tay trước ngực?', ['Cầm bóng 2 bên, đẩy thẳng ra trước', 'Lăn bóng', 'Đẩy bóng bằng 1 tay qua đầu', 'Ném 1 tay'], 0, 'Chest pass: cầm bóng 2 bên ngực, đẩy thẳng đến đồng đội.',
      [
        '<b>Chuyền 2 tay trước ngực</b> (chest pass) là kỹ thuật chuyền cơ bản nhất của bóng rổ: <code>cầm bóng hai bên, đặt trước ngực</code>, rồi <b>đẩy thẳng ra trước</b> tới đồng đội bằng cả hai tay.<ul><li>Nhanh, chính xác ở cự ly gần – vừa.</li></ul>',
        '<i>Phân biệt:</i> chuyền nảy đất (bounce pass), chuyền trên đầu (overhead) là các kiểu khác.<ul><li>Lăn bóng hay ném một tay không phải chest pass.</li></ul>',
      ],
      ['Đúng — cầm bóng hai bên ngực rồi đẩy thẳng ra trước.', 'Sai — lăn bóng không phải chuyền trước ngực.', 'Sai — đẩy 1 tay qua đầu là kiểu chuyền khác.', 'Sai — ném 1 tay không phải chest pass.']),
    Q('Tư thế cầm bóng?', ['Ngón cái xuống', 'Cả lòng bàn tay áp', 'Cầm như quả trứng', 'Ngón tay xoè ôm bóng, ngón cái hướng lên'], 3, 'Cầm bóng bằng ngón tay (không lòng bàn tay), ngón cái lên trên, ôm ngang bóng.',
      [
        '<b>Cách cầm bóng rổ</b>: các <code>ngón tay xoè ôm hai bên bóng</code>, hai ngón cái hướng lên trên tạo chữ "W" phía sau bóng; tiếp xúc bằng <b>các ngón và phần chai tay</b>, không áp cả lòng bàn tay.<ul><li>Có khe hở nhỏ giữa lòng bàn tay và bóng.</li></ul>',
        '<i>Vì sao?</i> Cầm bằng ngón tay giúp <code>kiểm soát và xoáy bóng</code> tốt hơn, chuyền/ném chính xác.<ul><li>Áp cả lòng bàn tay làm bóng khó điều khiển.</li></ul>',
      ],
      ['Sai — ngón cái phải hướng lên, không xuống.', 'Sai — áp cả lòng bàn tay làm khó kiểm soát bóng.', 'Sai — bóng rổ to, không cầm như quả trứng.', 'Đúng — ngón tay xoè ôm bóng, ngón cái hướng lên.']),
    Q('Bước chân khi chuyền?', ['Lùi lại', 'Bước 1 chân về trước theo lực chuyền', 'Đứng yên', 'Bật nhảy 2 chân khi chuyền'], 1, 'Bước về trước giúp tăng lực và truyền động lượng theo hướng chuyền.',
      [
        '<b>Bước chân khi chuyền</b>: <code>bước một chân về phía trước</code> theo hướng chuyền, dồn trọng lượng theo lực đẩy — truyền thêm động lượng cho đường chuyền.<ul><li>Giúp bóng đi mạnh và chuẩn hơn.</li></ul>',
        '<i>Cơ chế:</i> lực chuyền cộng hưởng từ chân – thân – tay, không chỉ dùng sức tay.<ul><li>Lùi lại hoặc đứng yên làm yếu đường chuyền.</li></ul>',
      ],
      ['Sai — lùi lại làm giảm lực chuyền.', 'Đúng — bước một chân về trước giúp tăng lực chuyền.', 'Sai — đứng yên thì lực chuyền yếu hơn.', 'Sai — không cần bật nhảy 2 chân khi chuyền trước ngực.']),
    Q('Sau khi chuyền, tay?', ['Duỗi thẳng, lòng bàn tay hướng ra', 'Co lại', 'Buông xuống', 'Đan chéo trước ngực để giữ thăng bằng'], 0, 'Tay duỗi thẳng, lòng bàn tay hướng ra ngoài (follow-through).',
      [
        '<b>Động tác theo bóng (follow-through)</b>: sau khi đẩy bóng, hai tay <code>duỗi thẳng</code>, các ngón hơi xoè, <b>lòng bàn tay hướng ra ngoài/xuống dưới</b> theo hướng bóng đi.<ul><li>Là dấu hiệu đường chuyền dứt khoát, đúng hướng.</li></ul>',
        '<i>Tác dụng:</i> follow-through giúp bóng đi <code>thẳng và đủ lực</code>; dừng tay/co tay sớm làm bóng yếu và lệch.<ul><li>Áp dụng cho cả chuyền lẫn ném rổ.</li></ul>',
      ],
      ['Đúng — tay duỗi thẳng, lòng bàn tay hướng ra (follow-through).', 'Sai — co tay lại làm bóng đi yếu và thiếu chính xác.', 'Sai — buông tay xuống ngay không phải follow-through.', 'Sai — không đan chéo tay sau khi chuyền.']),
    Q('Khi nào không nên chuyền trước ngực?', ['Khi chạy chậm', 'Khi có hậu vệ chắn cao giữa 2 người', 'Khi đồng đội ở gần', 'Khi không bị kèm'], 1, 'Chest pass bay thẳng — dễ bị chặn nếu có hậu vệ cao chen giữa. Khi đó dùng bounce pass.',
      [
        '<b>Hạn chế của chuyền trước ngực</b>: bóng bay thẳng ngang tầm ngực nên <code>dễ bị chặn</code> khi có hậu vệ cao chen giữa hai người chuyền.<ul><li>Khi đó nên đổi sang <b>chuyền nảy đất (bounce pass)</b> đi thấp, luồn dưới tay đối thủ.</li></ul>',
        '<i>Nguyên tắc chọn kiểu chuyền:</i> tuỳ khoảng cách và vị trí đối phương mà chọn chest / bounce / overhead.<ul><li>Khi không bị kèm, chest pass vẫn là lựa chọn nhanh và chuẩn.</li></ul>',
      ],
      ['Sai — chạy chậm vẫn chuyền trước ngực được.', 'Đúng — khi có hậu vệ cao chen giữa, nên chuyền nảy đất thay vì trước ngực.', 'Sai — đồng đội ở gần vẫn chuyền trước ngực tốt.', 'Sai — khi không bị kèm thì chuyền trước ngực càng dễ.']),
  ]),

  M(12, 'Bóng rổ — Kỹ thuật ném rổ', [
    Q('Ném rổ cơ bản dùng tay?', ['2 tay đẩy mạnh', 'Ném dưới chân', '1 tay (tay thuận) ném, tay kia đỡ', 'Ném từ sau lưng'], 2, 'Set shot/jump shot dùng 1 tay thuận ném, tay kia chỉ đỡ phụ.',
      [
        '<b>Ném rổ cơ bản</b> (set shot/jump shot): dùng <code>tay thuận</code> để ném (lực và hướng), <b>tay kia chỉ đỡ phụ</b> giữ bóng cho tới lúc rời tay.<ul><li>Một tay điều khiển giúp bóng đi chuẩn hướng.</li></ul>',
        '<i>Lưu ý:</i> tay thuận đặt phía sau bóng, khuỷu thẳng dưới bóng; tay đỡ ở bên cạnh, không "đẩy" bóng.<ul><li>Hai tay cùng đẩy mạnh sẽ làm bóng lệch hướng.</li></ul>',
      ],
      ['Sai — ném rổ cơ bản dùng 1 tay chính, không phải 2 tay đẩy.', 'Sai — không ném từ dưới chân ở kỹ thuật cơ bản.', 'Đúng — tay thuận ném, tay kia chỉ đỡ giữ bóng.', 'Sai — không ném từ sau lưng.']),
    Q('Tư thế chân?', ['Cùng vạch', 'Chân thuận sau', 'Chân thuận lên trước, gối hơi trùng', 'Nhảy 1 chân'], 2, 'Chân thuận lên trước (BEEF: Balance), gối trùng để bật.',
      [
        '<b>Tư thế chân khi ném rổ</b>: <code>chân cùng bên tay thuận đặt lên trước</code> một chút, hai gối <b>hơi trùng</b> để giữ thăng bằng (Balance trong quy tắc BEEF) và tạo lực bật từ chân lên.<ul><li>Lực ném bắt nguồn từ chân, không chỉ từ tay.</li></ul>',
        '<i>Vì sao?</i> Tư thế cân bằng, vững giúp cú ném ổn định, lặp lại chính xác.<ul><li>Hai chân cùng vạch hay chân thuận ra sau làm mất cân bằng.</li></ul>',
      ],
      ['Sai — không để hai chân cùng vạch khi ném chuẩn.', 'Sai — chân thuận nên ở trước, không phải sau.', 'Đúng — chân thuận lên trước, gối hơi trùng để cân bằng và bật.', 'Sai — ném set shot không nhảy 1 chân.']),
    Q('Điểm ngắm khi ném?', ['Mép trước vành rổ', 'Tâm vòng rổ nhìn từ trên xuống', 'Mép sau vành', 'Trần nhà'], 0, 'Ngắm mép trước vành — bóng bay theo cung parabol vào trong rổ.',
      [
        '<b>Điểm ngắm khi ném rổ</b>: nhìn vào <code>mép trước của vành rổ</code> (gần mình nhất) làm mốc; bóng bay theo <b>cung parabol</b> cao rồi rơi vào trong rổ.<ul><li>Ngắm cố định một điểm giúp căn lực ổn định.</li></ul>',
        '<i>Vì sao không ngắm mép sau?</i> Dễ ném dài, bóng đập vành sau bật ra.<ul><li>Cú ném có độ cong (arc) hợp lý tăng khả năng vào rổ.</li></ul>',
      ],
      ['Đúng — ngắm mép trước vành để bóng theo cung parabol vào rổ.', 'Sai — không nhìn từ trên xuống khi đứng ném.', 'Sai — ngắm mép sau dễ làm bóng dài.', 'Sai — không ngắm trần nhà.']),
    Q('Quy tắc BEEF trong ném rổ?', ['B-East-E-Foot', 'Block, Eye, Energy, Focus', 'Body, Elbow, Eyes, Foot', 'Balance, Eyes, Elbow, Follow-through'], 3, 'BEEF: Balance (cân bằng), Eyes (mắt nhìn rổ), Elbow (khuỷu thẳng), Follow-through (theo tay).',
      [
        '<b>Quy tắc BEEF</b> ghi nhớ 4 yếu tố của cú ném rổ chuẩn: <code>B</code>alance (cân bằng), <code>E</code>yes (mắt nhìn rổ), <code>E</code>lbow (khuỷu tay thẳng dưới bóng), <code>F</code>ollow-through (theo tay sau khi ném).<ul><li>Thực hiện đủ 4 yếu tố giúp cú ném ổn định.</li></ul>',
        '<i>Áp dụng:</i> đứng vững → nhìn rổ → khuỷu thẳng hàng → bật và vẩy cổ tay theo bóng.<ul><li>Đây là phương pháp dạy ném rổ phổ biến.</li></ul>',
      ],
      ['Sai — đây không phải nội dung quy tắc BEEF.', 'Sai — các từ này không khớp BEEF.', 'Sai — gần đúng nhưng từ cuối phải là Follow-through.', 'Đúng — BEEF là Balance, Eyes, Elbow, Follow-through.']),
    Q('Sau khi ném, cổ tay?', ['Duỗi thẳng, lòng bàn tay úp xuống', 'Gập xuống (gooseneck), giữ tư thế đến khi bóng vào', 'Buông ngay', 'Cứng nguyên'], 1, 'Follow-through: cổ tay gập tự nhiên, giữ "tư thế ngỗng" cho đến khi bóng tiếp đích.',
      [
        '<b>Follow-through cổ tay</b>: sau khi bóng rời tay, cổ tay <code>gập xuống tự nhiên</code> (tư thế "cổ ngỗng" – gooseneck), các ngón hướng xuống rổ, giữ nguyên cho đến khi bóng vào.<ul><li>Tạo độ xoáy ngược giúp bóng "ăn vành" và vào rổ tốt.</li></ul>',
        '<i>Vì sao giữ tư thế?</i> Việc giữ follow-through giúp cú ném <b>nhất quán</b>, dễ tự điều chỉnh khi sai.<ul><li>Buông tay ngay hoặc giữ cổ tay cứng đều làm bóng kém chuẩn.</li></ul>',
      ],
      ['Sai — không duỗi thẳng cứng, cổ tay phải gập tự nhiên.', 'Đúng — cổ tay gập xuống (gooseneck), giữ tư thế đến khi bóng vào.', 'Sai — buông tay ngay làm mất độ chuẩn của cú ném.', 'Sai — giữ cổ tay cứng nguyên là sai kỹ thuật.']),
  ]),

  M(13, 'Bóng chuyền — Kỹ thuật chuyền cao 2 tay', [
    Q('Chuyền cao 2 tay (bunda) dùng để?', ['Chặn bóng', 'Đập bóng', 'Đỡ bóng cao, chuyền cho đồng đội tấn công', 'Phát bóng'], 2, 'Chuyền cao 2 tay (overhead pass) thường dùng làm bóng 2 cho chủ công.',
      [
        '<b>Chuyền cao 2 tay</b> (chuyền bóng trên cao bằng các ngón tay) dùng để <code>đỡ bóng ở tầm cao</code> và <b>chuyền (làm bóng 2) cho đồng đội tấn công</b> — thường do vị trí chuyền 2 (setter) thực hiện.<ul><li>Là kỹ thuật then chốt tổ chức tấn công.</li></ul>',
        '<i>Phân biệt:</i> chặn (chắn trên lưới), đập (smash tấn công), phát bóng (mở pha bóng) là các kỹ thuật khác.<ul><li>Chuyền cao đòi hỏi cảm giác ngón tay tốt.</li></ul>',
      ],
      ['Sai — chặn bóng là động tác chắn trên lưới, kỹ thuật khác.', 'Sai — đập bóng là tấn công, không phải chuyền cao.', 'Đúng — chuyền cao 2 tay để đỡ bóng cao cho đồng đội tấn công.', 'Sai — phát bóng là kỹ thuật bắt đầu pha bóng, khác chuyền.']),
    Q('Vị trí tay đỡ bóng?', ['2 tay trước bụng', '2 tay sau lưng', '2 tay tạo hình tam giác trên trán, ngón hướng lên', '1 tay'], 2, 'Tạo "tam giác" giữa 2 ngón cái và 2 ngón trỏ, đỡ bóng phía trên trán.',
      [
        '<b>Vị trí tay khi chuyền cao</b>: hai bàn tay đưa lên <code>phía trên trán</code>, hai ngón cái và hai ngón trỏ tạo thành <b>hình tam giác (cửa sổ)</b>, các ngón hướng lên, tiếp xúc bóng bằng <b>chùm ngón tay</b>.<ul><li>Nhìn bóng qua "cửa sổ" tam giác đó.</li></ul>',
        '<i>Vì sao?</i> Tư thế này phân lực đều ra các ngón, đỡ – đẩy bóng chính xác.<ul><li>Đỡ trước bụng là tư thế đệm bóng thấp, không phải chuyền cao.</li></ul>',
      ],
      ['Sai — đỡ trước bụng là tư thế đệm bóng thấp.', 'Sai — không để tay sau lưng.', 'Đúng — 2 tay tạo hình tam giác trên trán, ngón hướng lên.', 'Sai — chuyền cao dùng 2 tay, không phải 1 tay.']),
    Q('Khi đỡ bóng, lực truyền từ?', ['Chỉ cổ tay', 'Chỉ lòng bàn tay', 'Chân-eo-vai-cánh tay-ngón tay', 'Chỉ vai'], 2, 'Chuyền hiệu quả: lực bắt đầu từ chân, truyền qua eo, vai đến ngón tay.',
      [
        '<b>Chuỗi truyền lực khi chuyền bóng chuyền</b>: lực bắt đầu từ <code>chân (đạp duỗi gối)</code> → <code>eo</code> → <code>vai</code> → <code>cánh tay</code> → <b>ngón tay</b> đẩy bóng đi.<ul><li>Toàn thân phối hợp, không chỉ dùng tay.</li></ul>',
        '<i>Lợi ích:</i> dùng lực toàn thân giúp chuyền bóng xa, nhẹ nhàng mà chính xác, đỡ mỏi tay.<ul><li>Chỉ dùng cổ tay/lòng bàn tay sẽ yếu và dễ phạm lỗi.</li></ul>',
      ],
      ['Sai — chỉ dùng cổ tay thì lực yếu.', 'Sai — chỉ lòng bàn tay là sai kỹ thuật và phạm lỗi.', 'Đúng — lực truyền từ chân qua eo, vai đến ngón tay.', 'Sai — chỉ vai thôi thì không đủ và thiếu chính xác.']),
    Q('Đỡ bóng thấp dùng?', ['Đệm 2 tay (forearm pass / bump)', 'Đập bóng (spike) 1 tay qua đầu', 'Chuyền cao 2 tay', 'Chắn lưới (block) 2 tay trên cao'], 0, 'Bóng thấp: đệm 2 tay (gập ngực, 2 cẳng tay khép sát) — gọi là "bump".',
      [
        '<b>Đỡ bóng thấp</b> dùng kỹ thuật <code>đệm bóng 2 tay (forearm pass / bump)</code>: hai cẳng tay khép sát tạo mặt phẳng, đỡ bóng ở tầm thấp (ngang hông trở xuống).<ul><li>Dùng cho bóng phát, bóng đập sang.</li></ul>',
        '<i>Phân biệt theo tầm bóng:</i> bóng cao → chuyền cao 2 tay (ngón); bóng thấp → đệm 2 tay (cẳng tay).<ul><li>Đập và chắn là kỹ thuật tấn công/phòng thủ trên cao.</li></ul>',
      ],
      ['Đúng — bóng thấp đỡ bằng đệm 2 tay (bump).', 'Sai — đập bóng là tấn công, không dùng đỡ bóng thấp.', 'Sai — chuyền cao 2 tay dùng cho bóng trên cao.', 'Sai — chắn lưới là động tác phòng thủ trên cao.']),
    Q('Lỗi thường gặp khi chuyền cao?', ['Bóng đi đúng', 'Bóng đi xa', 'Đỡ bằng ngón tay', 'Đỡ bằng lòng bàn tay (vi phạm), bóng dừng lại'], 3, 'Đỡ bằng lòng bàn tay = "held ball" — phạm lỗi mất điểm.',
      [
        '<b>Lỗi thường gặp khi chuyền cao</b>: <code>đỡ bằng lòng bàn tay</code> làm bóng <b>dừng/giữ lại</b> trên tay (lỗi "dính bóng" – held ball) → phạm lỗi, mất điểm.<ul><li>Trọng tài bắt lỗi khi bóng không bật đi tức thì.</li></ul>',
        '<i>Khắc phục:</i> tiếp xúc bóng bằng <code>chùm ngón tay</code> và đẩy đi ngay, không ôm – giữ.<ul><li>Đỡ bằng ngón tay đúng kỹ thuật, không phải lỗi.</li></ul>',
      ],
      ['Sai — bóng đi đúng là kết quả tốt, không phải lỗi.', 'Sai — bóng đi xa không phải lỗi chuyền cao điển hình.', 'Sai — đỡ bằng ngón tay là kỹ thuật đúng.', 'Đúng — đỡ bằng lòng bàn tay làm bóng dừng (held ball) là phạm lỗi.']),
  ]),

  M(14, 'Bóng chuyền — Phát bóng và đập bóng', [
    Q('Phát bóng thấp tay dùng cho?', ['Vận động viên chuyên nghiệp', 'Người mới tập', 'Chỉ nam', 'Chỉ nữ'], 1, 'Phát thấp tay dễ thực hiện, phù hợp người mới.',
      [
        '<b>Phát bóng thấp tay</b> (đánh bóng từ dưới lên) là kỹ thuật <code>đơn giản, dễ thực hiện</code>, phù hợp <b>người mới tập</b> bóng chuyền vì ít đòi hỏi lực và kỹ thuật phức tạp.<ul><li>Tỉ lệ phát qua lưới cao, dễ kiểm soát.</li></ul>',
        '<i>Tư thế:</i> tay không thuận giữ bóng ngang hông, tay thuận đánh từ dưới lên vào đáy bóng.<ul><li>Người chơi lâu năm thường chuyển sang phát cao tay mạnh hơn.</li></ul>',
      ],
      ['Sai — VĐV chuyên nghiệp thường phát cao tay mạnh hơn.', 'Đúng — phát thấp tay dễ làm, phù hợp người mới tập.', 'Sai — không giới hạn riêng cho nam.', 'Sai — không giới hạn riêng cho nữ.']),
    Q('Phát bóng cao tay (jump serve) phù hợp?', ['Trẻ em', 'Người mới', 'Tất cả', 'VĐV nâng cao, lực mạnh hơn'], 3, 'Phát cao tay/nhảy phát đòi hỏi kỹ thuật và lực, phù hợp người đã tập lâu.',
      [
        '<b>Phát bóng cao tay / nhảy phát (jump serve)</b> đòi hỏi <code>kỹ thuật cao và lực mạnh</code> (tung bóng, bật nhảy, đập vào bóng) nên phù hợp <b>VĐV nâng cao</b>, người đã tập lâu.<ul><li>Bóng đi nhanh, uy lực, khó đỡ.</li></ul>',
        '<i>Vì sao không cho người mới?</i> Dễ sai kỹ thuật, bóng ra ngoài hoặc không qua lưới.<ul><li>Cần học vững phát thấp tay trước.</li></ul>',
      ],
      ['Sai — trẻ em chưa đủ kỹ thuật và lực cho phát cao tay.', 'Sai — người mới nên tập phát thấp tay trước.', 'Sai — không phải ai cũng làm tốt phát cao tay.', 'Đúng — phát cao tay phù hợp VĐV nâng cao, có lực mạnh.']),
    Q('Đập bóng (smash/spike) gồm?', ['Chạy đà → giậm nhảy → đập bóng → tiếp đất', 'Giậm nhảy → chạy đà → đập bóng → tiếp đất', 'Ngồi đập', 'Đứng đập'], 0, '4 giai đoạn: chạy đà, giậm nhảy, ra tay đập, tiếp đất.',
      [
        '<b>Đập bóng (smash/spike)</b> gồm <b>4 giai đoạn</b> theo thứ tự: <code>chạy đà</code> → <code>giậm nhảy</code> → <code>trên không ra tay đập</code> → <code>tiếp đất</code>.<ul><li>Là kỹ thuật tấn công ghi điểm chính.</li></ul>',
        '<i>Then chốt:</i> phải chạy đà trước rồi mới giậm nhảy (không thể giậm nhảy trước); tiếp xúc bóng ở điểm cao nhất.<ul><li>Tiếp đất bằng hai chân, gối trùng để giảm chấn động.</li></ul>',
      ],
      ['Đúng — chạy đà, giậm nhảy, đập bóng rồi tiếp đất.', 'Sai — sai thứ tự, phải chạy đà trước rồi mới giậm nhảy.', 'Sai — không ngồi đập.', 'Sai — đập bóng cần bật nhảy, không chỉ đứng đập.']),
    Q('Khi đập bóng, tay đập?', ['Vỗ nhẹ', 'Vung mạnh, gập cổ tay tạo lực và quỹ đạo xuống', 'Hất ngược', 'Đẩy thẳng'], 1, 'Đập: vung tay nhanh, gập cổ tay (snap) tạo bóng đi nhanh và cắm xuống.',
      [
        '<b>Động tác tay khi đập bóng</b>: <code>vung tay nhanh, mạnh</code> từ sau ra trước, <b>gập cổ tay (snap)</b> ở thời điểm chạm bóng để tạo lực lớn và quỹ đạo <b>cắm xuống sân đối phương</b>.<ul><li>Tiếp xúc bóng bằng cả lòng bàn tay xoè.</li></ul>',
        '<i>Vì sao gập cổ tay?</i> Tạo bóng đi nhanh, xoáy xuống, khó phòng thủ.<ul><li>Vỗ nhẹ/hất ngược/đẩy thẳng đều không tạo cú đập uy lực.</li></ul>',
      ],
      ['Sai — vỗ nhẹ không tạo được cú đập uy lực.', 'Đúng — vung mạnh và gập cổ tay để bóng đi nhanh, cắm xuống.', 'Sai — hất ngược không phải kỹ thuật đập.', 'Sai — đẩy thẳng không tạo quỹ đạo cắm xuống.']),
    Q('Vị trí đứng phòng thủ khi đối phương đập?', ['Chạy ra', 'Phía sau, gối thấp, tay sẵn sàng đệm', 'Quay lưng', 'Đứng thẳng'], 1, 'Phòng thủ cần tư thế thấp, sẵn sàng đỡ bóng đi nhanh.',
      [
        '<b>Tư thế phòng thủ khi đối phương đập</b>: đứng <code>phía sau (lùi về cuối sân)</code>, hạ <b>trọng tâm thấp, gối trùng</b>, hai tay sẵn sàng <b>đệm bóng</b> đi nhanh.<ul><li>Mắt quan sát tay người đập để đoán hướng.</li></ul>',
        '<i>Vì sao?</i> Bóng đập đi rất nhanh và cắm xuống; tư thế thấp giúp phản ứng và đỡ kịp.<ul><li>Đứng thẳng hay quay lưng đều phản ứng chậm.</li></ul>',
      ],
      ['Sai — chạy ra khỏi vị trí làm bỏ trống khu vực.', 'Đúng — đứng phía sau, gối thấp, tay sẵn sàng đệm.', 'Sai — quay lưng thì không quan sát được bóng.', 'Sai — đứng thẳng phản ứng chậm với bóng đi nhanh.']),
  ]),

  M(15, 'Võ thuật cơ bản — Bài quyền số 1', [
    Q('Võ truyền thống VN gồm?', ['Vovinam, Bình Định, Nhất Nam…', 'Karate', 'Chỉ Vovinam', 'Taekwondo'], 0, 'VN có nhiều môn võ truyền thống: Vovinam-Việt Võ Đạo, võ cổ truyền Bình Định, Nhất Nam…',
      [
        '<b>Võ thuật truyền thống Việt Nam</b> rất phong phú: <code>Vovinam – Việt Võ Đạo</code>, <code>võ cổ truyền Bình Định</code>, <code>Nhất Nam</code>… là những môn võ do người Việt sáng tạo và phát triển.<ul><li>Mang đậm bản sắc văn hoá dân tộc.</li></ul>',
        '<i>Phân biệt:</i> Karate là võ Nhật Bản, Taekwondo là võ Hàn Quốc — không phải võ truyền thống VN.<ul><li>Học võ giúp rèn thể chất và giữ gìn di sản văn hoá.</li></ul>',
      ],
      ['Đúng — VN có Vovinam, võ Bình Định, Nhất Nam… là võ truyền thống.', 'Sai — Karate là võ của Nhật Bản.', 'Sai — VN có nhiều môn võ truyền thống, không chỉ Vovinam.', 'Sai — Taekwondo là võ của Hàn Quốc.']),
    Q('Bài quyền là?', ['Chuỗi động tác tấn pháp + đòn đánh được biên soạn để luyện tập', 'Trò chơi', 'Khởi động', 'Đối kháng'], 0, 'Bài quyền (hình thức) = chuỗi động tác chuẩn hoá, rèn kỹ thuật + sức bền.',
      [
        '<b>Bài quyền</b> (còn gọi là "hình"/"thảo") là một <code>chuỗi động tác tấn pháp và đòn đánh được biên soạn chuẩn hoá</code> để luyện tập một mình, theo trình tự cố định.<ul><li>Mỗi môn võ có hệ thống bài quyền riêng.</li></ul>',
        '<i>Tác dụng:</i> rèn kỹ thuật đòn thế, tấn pháp, sức bền, trí nhớ vận động và tinh thần.<ul><li>Khác với đối kháng (luyện với đối thủ) hay chỉ là khởi động.</li></ul>',
      ],
      ['Đúng — bài quyền là chuỗi động tác tấn pháp và đòn đánh được biên soạn.', 'Sai — bài quyền không phải trò chơi.', 'Sai — bài quyền không chỉ là khởi động.', 'Sai — đối kháng là luyện tập với đối thủ, khác bài quyền.']),
    Q('Tấn (đứng) cơ bản trong võ?', ['Quỳ 1 gối, gối còn lại nâng cao', 'Đứng thẳng', 'Đinh tấn, trung bình tấn, hư tấn…', 'Ngồi xếp bằng giữ trọng tâm thấp'], 2, 'Tấn = các tư thế đứng nền tảng, giữ ổn định và truyền lực.',
      [
        '<b>Tấn pháp</b> là hệ thống các <code>tư thế đứng nền tảng</code> trong võ: <code>đinh tấn</code>, <code>trung bình tấn</code>, <code>hư tấn</code>… giúp giữ <b>thăng bằng, ổn định</b> và truyền lực cho đòn đánh.<ul><li>Tấn vững là gốc của mọi đòn thế.</li></ul>',
        '<i>Nguyên tắc:</i> hạ thấp trọng tâm, hai chân tạo thế vững, lưng thẳng.<ul><li>Đứng thẳng hai chân hay quỳ gối không phải tấn cơ bản.</li></ul>',
      ],
      ['Sai — quỳ gối không phải tấn cơ bản.', 'Sai — đứng thẳng không phải tư thế tấn vững.', 'Đúng — đinh tấn, trung bình tấn, hư tấn… là các tấn cơ bản.', 'Sai — ngồi xếp bằng không phải tấn trong võ.']),
    Q('Đinh tấn?', ['Chân trước trùng, chân sau thẳng — tư thế tấn công', 'Trùng cả 2 gối, trọng tâm dồn đều', 'Đứng thẳng 2 chân', 'Chân trước thẳng, chân sau trùng'], 0, 'Đinh tấn: 1 chân trước trùng gối, chân sau thẳng — chuẩn bị đấm/đá.',
      [
        '<b>Đinh tấn</b>: <code>chân trước trùng gối</code> (gối không vượt mũi chân), <code>chân sau duỗi thẳng</code>, trọng tâm dồn nhiều về chân trước — là tư thế <b>tấn công</b>, chuẩn bị ra đòn đấm/đá.<ul><li>Bàn chân sau bám đất tạo điểm tựa đẩy lực.</li></ul>',
        '<i>Phân biệt:</i> <code>trung bình tấn</code> trùng đều cả hai gối, trọng tâm dồn giữa; đinh tấn dồn về trước.<ul><li>Nhớ đúng: chân trước trùng – chân sau thẳng.</li></ul>',
      ],
      ['Đúng — chân trước trùng, chân sau thẳng, là tư thế tấn công.', 'Sai — trùng cả 2 gối dồn đều là trung bình tấn.', 'Sai — đứng thẳng 2 chân không phải đinh tấn.', 'Sai — ngược lại: chân trước trùng, chân sau mới thẳng.']),
    Q('Tinh thần học võ?', ['Thể hiện', 'Đánh nhau', 'Bắt nạt', 'Rèn thể chất + nhân cách, không lạm dụng'], 3, 'Học võ để rèn thân thể và đạo đức, tự vệ khi cần, không dùng vào việc xấu.',
      [
        '<b>Tinh thần (võ đạo) khi học võ</b>: rèn luyện <code>thể chất</code> đi đôi với <code>nhân cách, đạo đức</code>; chỉ dùng võ để tự vệ khi cần, <b>không lạm dụng</b> để gây sự hay bắt nạt.<ul><li>"Học võ trước hết là học làm người".</li></ul>',
        '<i>Giá trị:</i> kỷ luật, tôn sư trọng đạo, khiêm tốn, kiềm chế.<ul><li>Thể hiện, đánh nhau, bắt nạt đều đi ngược tinh thần võ đạo.</li></ul>',
      ],
      ['Sai — học võ không phải để thể hiện.', 'Sai — học võ không phải để đánh nhau.', 'Sai — học võ tuyệt đối không để bắt nạt người khác.', 'Đúng — học võ để rèn thể chất, nhân cách và không lạm dụng.']),
  ]),

  M(16, 'Thể dục dụng cụ — Xà đơn, lộn nhào cơ bản', [
    Q('Xà đơn rèn?', ['Cơ bụng đơn thuần', 'Không rèn', 'Cơ chân', 'Cơ tay, vai, lưng'], 3, 'Xà đơn (pull-up, treo người) rèn các nhóm cơ tay, vai, lưng.',
      [
        '<b>Tập xà đơn</b> (kéo xà – pull-up, treo người) chủ yếu rèn các nhóm <code>cơ tay (tay trước, cẳng tay)</code>, <code>cơ vai</code> và <code>cơ lưng (xô)</code> — toàn bộ thân trên.<ul><li>Là bài kiểm tra sức mạnh thân trên phổ biến của HS.</li></ul>',
        '<i>Lưu ý:</i> nắm xà chắc, kéo người lên cho cằm qua xà rồi hạ có kiểm soát.<ul><li>Không phải bài cho cơ chân hay chỉ cơ bụng.</li></ul>',
      ],
      ['Sai — xà đơn rèn cơ thân trên chứ không chỉ cơ bụng.', 'Sai — xà đơn rèn nhiều nhóm cơ rõ rệt.', 'Sai — xà đơn rèn cơ thân trên, không phải cơ chân.', 'Đúng — xà đơn rèn cơ tay, vai và lưng.']),
    Q('Lộn nhào cơ bản gồm?', ['Lộn nhào trước, lộn nhào sau', 'Lộn ngang', 'Chỉ sau', 'Chỉ trước'], 0, 'Bài cơ bản: lộn nhào trước (forward roll) và lộn nhào sau (backward roll).',
      [
        '<b>Lộn nhào cơ bản</b> trong thể dục dụng cụ gồm hai động tác: <code>lộn nhào trước (forward roll)</code> và <code>lộn nhào sau (backward roll)</code>.<ul><li>Cơ thể lăn tròn trên đệm theo trục trước – sau.</li></ul>',
        '<i>Yêu cầu:</i> cuộn tròn người, gập cằm vào ngực để bảo vệ cổ; thực hiện trên đệm.<ul><li>Lộn ngang là động tác khác, không thuộc bài cơ bản này.</li></ul>',
      ],
      ['Đúng — bài cơ bản gồm lộn nhào trước và lộn nhào sau.', 'Sai — lộn ngang không phải bài cơ bản này.', 'Sai — không chỉ có lộn sau, còn cả lộn trước.', 'Sai — không chỉ có lộn trước, còn cả lộn sau.']),
    Q('Khi lộn nhào trước, cần?', ['Lưng thẳng', 'Đầu thẳng', 'Cằm áp ngực, lưng cong, đẩy chân', 'Đẩy tay ngược'], 2, 'Cằm áp ngực (bảo vệ cổ), lưng cong tròn, đẩy chân để lăn về trước.',
      [
        '<b>Kỹ thuật lộn nhào trước</b>: <code>cằm áp sát ngực</code> (bảo vệ cột sống cổ), <b>lưng cong tròn</b> như quả bóng, hai tay chống đệm rồi <b>đẩy chân</b> để lăn người về trước.<ul><li>Lực lăn đến từ đẩy chân và cuộn thân.</li></ul>',
        '<i>Vì sao gập cằm?</i> Để gáy không chạm đất, tránh chấn thương cổ — yếu tố an toàn quan trọng nhất.<ul><li>Lưng/đầu thẳng sẽ không lăn được và rất nguy hiểm.</li></ul>',
      ],
      ['Sai — lưng thẳng khó lăn tròn và dễ đau lưng.', 'Sai — đầu thẳng gây nguy hiểm cho cổ.', 'Đúng — cằm áp ngực, lưng cong, đẩy chân để lăn về trước.', 'Sai — đẩy tay ngược không giúp lăn về trước.']),
    Q('An toàn khi tập thể dục dụng cụ?', ['Sàn cứng', 'Tập tự do', 'Không cần hỗ trợ', 'Có thảm đệm, có người hỗ trợ, khởi động kỹ'], 3, 'TDDC cần thảm dày, người hỗ trợ (spotter), khởi động kỹ vì rủi ro chấn thương cổ-lưng cao.',
      [
        '<b>An toàn khi tập thể dục dụng cụ</b>: phải có <code>thảm đệm dày</code>, có <code>người hỗ trợ (spotter)</code> bảo hiểm động tác, và <b>khởi động kỹ</b> trước khi tập.<ul><li>TDDC có rủi ro chấn thương cổ – lưng cao.</li></ul>',
        '<i>Nguyên tắc:</i> tập từ dễ đến khó, đúng kỹ thuật, không tự ý làm động tác chưa được hướng dẫn.<ul><li>Sàn cứng hay tập tự do đều nguy hiểm.</li></ul>',
      ],
      ['Sai — sàn cứng dễ gây chấn thương khi tập.', 'Sai — tập tự do không an toàn với dụng cụ.', 'Sai — cần có người hỗ trợ để đảm bảo an toàn.', 'Đúng — cần thảm đệm, người hỗ trợ và khởi động kỹ.']),
    Q('Lỗi nguy hiểm khi lộn nhào?', ['Đầu/cổ đỡ trọng lượng (không gập cằm)', 'Chân co', 'Tay đỡ', 'Lăn đều'], 0, 'Không gập cằm = đầu chịu lực = chấn thương cổ rất nguy hiểm.',
      [
        '<b>Lỗi nguy hiểm nhất khi lộn nhào</b>: <code>không gập cằm</code>, để <b>đầu/cổ (gáy) chịu trọng lượng</b> khi lăn → nguy cơ chấn thương cột sống cổ rất nghiêm trọng.<ul><li>Đây là lỗi phải tuyệt đối tránh.</li></ul>',
        '<i>Khắc phục:</i> luôn gập cằm vào ngực, đặt gáy – vai (không phải đỉnh đầu) tiếp đệm, cuộn tròn lưng.<ul><li>Chân co, tay đỡ, lăn đều là thực hiện đúng kỹ thuật.</li></ul>',
      ],
      ['Đúng — để đầu/cổ đỡ trọng lượng (không gập cằm) rất nguy hiểm.', 'Sai — chân co là động tác đúng để lăn tròn.', 'Sai — tay đỡ là kỹ thuật hỗ trợ đúng.', 'Sai — lăn đều là thực hiện tốt, không phải lỗi.']),
  ]),

  M(17, 'Trò chơi vận động và tổ chức thi đấu', [
    Q('Trò chơi vận động rèn?', ['Phản xạ, phối hợp, tinh thần đồng đội', 'Không rèn gì', 'Chỉ tốc độ', 'Chỉ sức mạnh'], 0, 'Trò chơi vận động (kéo co, cướp cờ, mèo đuổi chuột…) rèn nhiều tố chất.',
      [
        '<b>Trò chơi vận động</b> (kéo co, cướp cờ, mèo đuổi chuột, chạy tiếp sức…) rèn nhiều tố chất cùng lúc: <code>phản xạ</code>, <code>khả năng phối hợp</code> và <b>tinh thần đồng đội</b>.<ul><li>Vừa rèn thể chất vừa tạo hứng thú vận động.</li></ul>',
        '<i>Giá trị:</i> giúp HS vận động tự nhiên, đoàn kết, vui vẻ; nhiều trò mang yếu tố văn hoá dân gian.<ul><li>Rèn tổng hợp, không chỉ riêng tốc độ hay sức mạnh.</li></ul>',
      ],
      ['Đúng — trò chơi vận động rèn phản xạ, phối hợp và tinh thần đồng đội.', 'Sai — trò chơi vận động rèn nhiều tố chất.', 'Sai — không chỉ rèn tốc độ.', 'Sai — không chỉ rèn sức mạnh.']),
    Q('Tổ chức 1 giải thi đấu cần?', ['Không cần luật', 'Chỉ chơi', 'Luật, trọng tài, lịch trình, an toàn', 'Chỉ cần đăng ký đội và sân thi đấu'], 2, 'Giải đấu cần luật rõ, trọng tài, lịch (vòng bảng/loại trực tiếp), đảm bảo an toàn.',
      [
        '<b>Tổ chức một giải thi đấu</b> cần đủ các yếu tố: <code>luật chơi rõ ràng</code>, <code>trọng tài điều hành</code>, <code>lịch trình (vòng bảng/loại trực tiếp)</code> và <b>đảm bảo an toàn</b> cho người tham gia.<ul><li>Thiếu một yếu tố thì giải khó diễn ra công bằng, trật tự.</li></ul>',
        '<i>Bổ sung:</i> còn cần danh sách đội/VĐV, sân bãi – dụng cụ, ban tổ chức, hình thức khen thưởng.<ul><li>Chỉ "đăng ký đội và sân" là chưa đủ.</li></ul>',
      ],
      ['Sai — giải đấu cần luật rõ ràng.', 'Sai — không thể chỉ chơi mà không tổ chức.', 'Đúng — cần luật, trọng tài, lịch trình và đảm bảo an toàn.', 'Sai — chỉ đăng ký đội và sân là chưa đủ, còn cần luật và trọng tài.']),
    Q('Tinh thần fair-play?', ['Chửi đối thủ', 'Thắng bằng mọi giá', 'Gian lận', 'Trung thực, tôn trọng đối thủ và trọng tài'], 3, 'Fair-play = trung thực, tôn trọng đối thủ-trọng tài-luật chơi, chấp nhận thắng-thua.',
      [
        '<b>Fair-play (tinh thần thể thao cao thượng)</b> là chơi <code>trung thực</code>, <b>tôn trọng đối thủ, trọng tài và luật chơi</b>, chấp nhận thắng – thua một cách đàng hoàng.<ul><li>Là giá trị cốt lõi của thể thao.</li></ul>',
        '<i>Trái với fair-play:</i> chửi/khiêu khích đối thủ, gian lận, thắng bằng mọi giá.<ul><li>Fair-play quan trọng hơn cả kết quả thắng – thua.</li></ul>',
      ],
      ['Sai — chửi đối thủ trái hẳn tinh thần fair-play.', 'Sai — thắng bằng mọi giá không phải fair-play.', 'Sai — gian lận đi ngược fair-play.', 'Đúng — fair-play là trung thực, tôn trọng đối thủ và trọng tài.']),
    Q('Khi thua, thái độ đúng?', ['Đổ lỗi', 'Bỏ cuộc', 'Cãi trọng tài', 'Học hỏi từ trận đấu, không nản'], 3, 'Thể thao: thua là bài học. Phân tích để tiến bộ, không đổ lỗi.',
      [
        '<b>Thái độ đúng khi thua</b>: xem đó là <code>bài học</code>, phân tích điểm yếu để <b>tiến bộ</b>, giữ tinh thần lạc quan, <b>không nản chí</b>.<ul><li>"Thất bại là mẹ thành công".</li></ul>',
        '<i>Tránh:</i> đổ lỗi cho đồng đội, cãi trọng tài, bỏ cuộc — đều là biểu hiện thiếu fair-play.<ul><li>Tôn trọng kết quả và đội bạn.</li></ul>',
      ],
      ['Sai — đổ lỗi không giúp tiến bộ.', 'Sai — bỏ cuộc không phải thái độ thể thao.', 'Sai — cãi trọng tài là thiếu fair-play.', 'Đúng — học hỏi từ trận đấu và không nản chí.']),
    Q('Khi thắng?', ['Không bắt tay', 'Khoe khoang', 'Khiêm tốn, chúc mừng đối thủ', 'Chế giễu'], 2, 'Thắng cũng cần khiêm tốn và tôn trọng đối thủ — fair-play.',
      [
        '<b>Thái độ đúng khi thắng</b>: giữ <code>khiêm tốn</code>, bắt tay và <b>chúc mừng / cảm ơn đối thủ</b> đã thi đấu cùng — đây cũng là biểu hiện của fair-play.<ul><li>Tôn trọng đối thủ dù mình thắng.</li></ul>',
        '<i>Tránh:</i> khoe khoang, chế giễu, không bắt tay — làm mất hình ảnh đẹp của người chiến thắng.<ul><li>Chiến thắng đẹp là chiến thắng có văn hoá.</li></ul>',
      ],
      ['Sai — nên bắt tay đối thủ dù thắng.', 'Sai — khoe khoang là thiếu tôn trọng.', 'Đúng — khiêm tốn và chúc mừng đối thủ là tinh thần đẹp.', 'Sai — chế giễu đối thủ là sai tinh thần thể thao.']),
  ]),

  M(18, 'Ôn tập học kì I', [
    Q('Test Cooper đo?', ['1km', 'Quãng đường chạy/đi trong 12 phút', '12km', '100m'], 1, 'Test Cooper 12 phút.',
      [
        '<b>Ôn tập – Test Cooper</b>: đo <code>quãng đường chạy/đi được trong 12 phút</code> để đánh giá sức bền tim mạch (ước lượng VO2max).<ul><li>Càng chạy xa trong 12 phút → sức bền càng tốt.</li></ul>',
        '<i>Nhớ:</i> Cooper đo theo <b>thời gian cố định (12 phút)</b>, không phải cự ly cố định.<ul><li>Khác với các bài đo theo cự ly (chạy 60m, 1km tính giờ).</li></ul>',
      ],
      ['Sai — không đo 1km cố định.', 'Đúng — đo quãng đường chạy/đi được trong 12 phút.', 'Sai — không phải chạy 12km.', 'Sai — 100m là cự ly ngắn, không phải test bền.']),
    Q('Xuất phát thấp dùng?', ['Bàn đạp, tư thế 3 điểm tựa', 'Ngồi xổm', 'Nằm sấp, 2 tay chống đất', 'Đứng thẳng'], 0, 'Chạy ngắn.',
      [
        '<b>Ôn tập – Xuất phát thấp</b> (chạy ngắn): tì hai chân lên <code>bàn đạp</code>, hai tay chống đất tạo <b>3 điểm tựa</b> (2 tay + 2 chân tì bàn đạp).<ul><li>Giúp bật ra nhanh, mạnh ngay khi có tín hiệu.</li></ul>',
        '<i>Phân biệt:</i> xuất phát thấp dùng cho chạy ngắn; xuất phát cao (đứng) dùng cho chạy bền.<ul><li>Ngồi xổm hay nằm sấp không phải xuất phát thấp.</li></ul>',
      ],
      ['Đúng — xuất phát thấp dùng bàn đạp, tư thế 3 điểm tựa.', 'Sai — ngồi xổm không phải xuất phát thấp.', 'Sai — không nằm sấp khi xuất phát thấp.', 'Sai — đứng thẳng là xuất phát cao.']),
    Q('Nhảy cao kiểu nằm nghiêng tiếp đất?', ['Lưng/hông', 'Bằng 2 tay chống nệm', 'Bằng vai và gáy', 'Chân thẳng'], 0, 'An toàn.',
      [
        '<b>Ôn tập – Tiếp đất nhảy cao</b> kiểu nằm nghiêng: rơi xuống đệm dày bằng <code>lưng hoặc hông</code> (vùng cơ lớn) để an toàn.<ul><li>Tránh dồn lực vào khớp hay cột sống cổ.</li></ul>',
        '<i>Nguy hiểm:</i> tiếp đất bằng <b>vai – gáy</b> (hại cổ), <b>chân thẳng cứng</b> (hại khớp), hay chống tay (trẹo cổ tay).<ul><li>An toàn luôn là ưu tiên hàng đầu.</li></ul>',
      ],
      ['Đúng — tiếp đất bằng lưng/hông là an toàn.', 'Sai — chống tay dễ chấn thương cổ tay.', 'Sai — tiếp bằng vai và gáy nguy hiểm cho cổ.', 'Sai — chân thẳng dễ chấn thương khớp.']),
    Q('Đẩy tạ HS nữ khoảng?', ['3 kg', '1 kg', '7.26 kg', '10 kg'], 0, 'Tạ HS THCS.',
      [
        '<b>Ôn tập – Khối lượng tạ HS nữ THCS</b>: <code>khoảng 3 kg</code> (nam khoảng 4 kg), giảm nhẹ phù hợp lứa tuổi để tập đúng kỹ thuật.<ul><li>Mục tiêu là kỹ thuật, không phải tạ nặng.</li></ul>',
        '<i>So sánh:</i> tạ thi đấu nam chuyên nghiệp là <code>7,26 kg</code> — quá nặng và nguy hiểm với HS.<ul><li>Tạ quá nặng dễ gây chấn thương cổ tay, lưng.</li></ul>',
      ],
      ['Đúng — tạ HS nữ THCS khoảng 3 kg.', 'Sai — 1 kg quá nhẹ.', 'Sai — 7.26 kg là tạ nam chuyên nghiệp.', 'Sai — 10 kg quá nặng cho HS.']),
    Q('Chuyền bóng đá ngắn dùng?', ['Lòng ngoài bàn chân', 'Mu chân', 'Lòng trong bàn chân', 'Đầu gối'], 2, 'Chính xác cao.',
      [
        '<b>Ôn tập – Chuyền bóng đá ngắn</b>: dùng <code>lòng trong bàn chân</code> vì diện tiếp xúc rộng, phẳng → <b>độ chính xác cao</b> ở cự ly gần.<ul><li>Là đường chuyền cơ bản, dùng nhiều nhất.</li></ul>',
        '<i>Phân biệt:</i> mu chân cho chuyền/sút dài (lực mạnh); lòng ngoài tạo bóng cong cự ly ngắn.<ul><li>Đầu gối không dùng để chuyền chính xác.</li></ul>',
      ],
      ['Sai — lòng ngoài tạo bóng cong, ít chính xác cho chuyền ngắn.', 'Sai — mu chân dùng cho chuyền/sút dài.', 'Đúng — chuyền ngắn dùng lòng trong bàn chân cho độ chính xác cao.', 'Sai — đầu gối không dùng để chuyền chính xác.']),
  ]),

  // ──────────────── HK2 ────────────────
  M(19, 'Chạy bền nâng cao — Phân phối sức trong cự ly 1500m', [
    Q('Cự ly 1500m thuộc?', ['Marathon', 'Chạy bền trung bình', 'Chạy ngắn', 'Chạy việt dã'], 1, '1500m là cự ly bền trung bình trong điền kinh.',
      [
        '<b>Cự ly 1500m</b> thuộc nhóm <code>chạy cự ly trung bình</code> (chạy bền trung bình) trong điền kinh, đòi hỏi cả sức bền lẫn tốc độ.<ul><li>Nằm giữa chạy ngắn (≤400m) và chạy dài (≥3000m, marathon).</li></ul>',
        '<i>Phân biệt:</i> marathon 42,195km; chạy việt dã trên địa hình tự nhiên; chạy ngắn 100–400m.<ul><li>1500m chạy nhiều vòng sân điền kinh.</li></ul>',
      ],
      ['Sai — marathon dài hơn 42km, không phải 1500m.', 'Đúng — 1500m là cự ly bền trung bình.', 'Sai — chạy ngắn là 100–400m.', 'Sai — chạy việt dã diễn ra trên địa hình tự nhiên.']),
    Q('Phân phối sức 1500m?', ['Nhanh chậm thất thường', 'Hết sức từ đầu', 'Tốc độ đều, bứt cuối 200–300m', 'Chậm hết'], 2, 'Chiến thuật phổ biến: giữ tốc độ đều, dành sức bứt 200–300m cuối.',
      [
        '<b>Phân phối sức 1500m</b>: giữ <code>tốc độ đều</code> trong phần lớn cự ly, dành sức để <b>bứt tốc 200–300m cuối</b> (nước rút về đích).<ul><li>Phân phối hợp lý quyết định thành tích.</li></ul>',
        '<i>Vì sao?</i> Chạy hết sức từ đầu sẽ đuối giữa chừng; chạy thất thường hao sức nhanh.<ul><li>Cần cảm nhận và kiểm soát nhịp độ của bản thân.</li></ul>',
      ],
      ['Sai — chạy thất thường làm hao sức.', 'Sai — hết sức từ đầu sẽ đuối sớm.', 'Đúng — giữ tốc độ đều rồi bứt 200–300m cuối.', 'Sai — chạy chậm hết thì không đạt thành tích.']),
    Q('Hít thở khi chạy 1500m?', ['Nín thở', 'Thở nhanh nông', 'Sâu, đều, theo nhịp chân', 'Thở qua mũi đóng miệng'], 2, 'Hít thở sâu, đều, theo nhịp bước (vd 2-2 hoặc 3-3).',
      [
        '<b>Hít thở khi chạy 1500m</b>: thở <code>sâu, đều</code>, phối hợp <b>theo nhịp bước chân</b> (ví dụ 2 bước hít – 2 bước thở, hoặc 3-3).<ul><li>Đảm bảo cung cấp oxy ổn định cho cơ.</li></ul>',
        '<i>Tránh:</i> thở nhanh nông (thiếu oxy), nín thở, hay chỉ thở bằng mũi khi gắng sức (không đủ khí).<ul><li>Kết hợp mũi và miệng để lấy đủ không khí.</li></ul>',
      ],
      ['Sai — không bao giờ nín thở khi chạy.', 'Sai — thở nhanh nông không cung cấp đủ oxy.', 'Đúng — hít thở sâu, đều, theo nhịp chân.', 'Sai — chỉ thở qua mũi không đủ khí khi chạy gắng sức.']),
    Q('Khi đuối sức?', ['Giảm tốc nhưng không dừng, giữ nhịp', 'Tăng tốc đột ngột để vượt qua mệt', 'Bỏ cuộc', 'Dừng nghỉ'], 0, 'Đuối sức: giảm tốc, giữ nhịp thở, dần hồi phục rồi tăng lại.',
      [
        '<b>Khi đuối sức trong chạy bền</b>: <code>giảm tốc độ nhưng không dừng hẳn</code>, giữ <b>nhịp thở đều</b> để cơ thể dần hồi phục rồi tăng tốc lại.<ul><li>Vẫn duy trì vận động nhẹ tốt hơn là dừng.</li></ul>',
        '<i>Vì sao không dừng/bỏ cuộc?</i> Dừng giữa chừng làm cơ "nguội", chạy tiếp rất khó; tăng tốc đột ngột khi mệt dễ kiệt sức.<ul><li>Kiên trì vượt qua "điểm chết" là bài học sức bền.</li></ul>',
      ],
      ['Đúng — giảm tốc nhưng không dừng, giữ nhịp để hồi phục.', 'Sai — tăng tốc đột ngột khi mệt dễ kiệt sức.', 'Sai — không nên bỏ cuộc khi chỉ mới đuối sức.', 'Sai — dừng nghỉ giữa chừng làm khó chạy tiếp.']),
    Q('Sau khi về đích, nên?', ['Uống nước đá', 'Ngừng đột ngột', 'Ngồi xuống ngay', 'Đi bộ thả lỏng, hít thở sâu'], 3, 'Đi bộ thả lỏng 5–10 phút giúp tim trở về nhịp bình thường.',
      [
        '<b>Sau khi về đích chạy bền</b>: <code>đi bộ thả lỏng 5–10 phút</code>, kết hợp <b>hít thở sâu</b> để nhịp tim và hô hấp trở về bình thường từ từ.<ul><li>Đây là phần hồi tĩnh quan trọng.</li></ul>',
        '<i>Tránh:</i> ngừng/ngồi xuống đột ngột (máu dồn chân, dễ choáng), uống nước đá ngay (sốc nhiệt).<ul><li>Hồi phục đúng cách giúp giảm đau mỏi cơ.</li></ul>',
      ],
      ['Sai — uống nước đá ngay sau chạy không tốt.', 'Sai — ngừng đột ngột có hại cho tim mạch.', 'Sai — ngồi xuống ngay dễ choáng.', 'Đúng — đi bộ thả lỏng và hít thở sâu để tim về nhịp bình thường.']),
  ]),

  M(20, 'Nhảy dây — Kỹ thuật và sức bền', [
    Q('Nhảy dây rèn?', ['Không rèn gì', 'Sức bền, sự khéo léo, phối hợp tay-chân', 'Chỉ tốc độ', 'Chỉ sức mạnh'], 1, 'Nhảy dây rèn nhiều tố chất, tim phổi tốt + khéo léo + phối hợp.',
      [
        '<b>Nhảy dây</b> rèn nhiều tố chất cùng lúc: <code>sức bền (tim – phổi)</code>, <code>sự khéo léo</code> và <b>khả năng phối hợp tay – chân</b> nhịp nhàng.<ul><li>Là bài tập đơn giản, ít tốn dụng cụ nhưng hiệu quả cao.</li></ul>',
        '<i>Bổ sung:</i> nhảy dây còn rèn sức bật, nhịp điệu và sự tập trung.<ul><li>Rèn tổng hợp chứ không riêng tốc độ hay sức mạnh.</li></ul>',
      ],
      ['Sai — nhảy dây rèn nhiều tố chất.', 'Đúng — nhảy dây rèn sức bền, khéo léo và phối hợp tay-chân.', 'Sai — không chỉ rèn tốc độ.', 'Sai — không chỉ rèn sức mạnh.']),
    Q('Tư thế chuẩn bị?', ['Dây trước mặt', 'Đứng trên dây', 'Tay buông', 'Tay nắm cán dây, dây vắt sau, chân đứng giữa dây'], 3, 'Cầm 2 cán dây, dây vắt sau gót chân, sẵn sàng quay.',
      [
        '<b>Tư thế chuẩn bị nhảy dây</b>: hai tay <code>nắm hai cán dây</code>, <b>dây vắt sau gót chân</b>, người đứng thẳng tự nhiên, sẵn sàng quay dây từ sau ra trước.<ul><li>Khuỷu tay gần thân, cổ tay điều khiển dây.</li></ul>',
        '<i>Lưu ý:</i> chọn dây đúng độ dài — đứng giữa dây, hai cán kéo lên tới khoảng ngang ngực/nách.<ul><li>Để dây trước mặt hay đứng trên dây là sai tư thế.</li></ul>',
      ],
      ['Sai — dây phải vắt sau, không để trước mặt.', 'Sai — không đứng trên dây ở tư thế chuẩn bị.', 'Sai — tay phải nắm cán dây, không buông.', 'Đúng — tay nắm cán, dây vắt sau gót, chân giữa dây.']),
    Q('Khi nhảy?', ['Nhảy cao', 'Nhảy nhẹ trên đầu ngón chân, cổ tay xoay dây', 'Đáp gót mạnh', 'Cả lòng bàn chân'], 1, 'Nhảy nhẹ trên đầu ngón chân (forefoot), cổ tay xoay dây.',
      [
        '<b>Kỹ thuật nhảy dây</b>: bật <code>nhẹ trên đầu/nửa trước bàn chân (forefoot)</code>, chỉ nhảy vừa đủ cho dây qua; <b>cổ tay xoay dây</b> (không vung cả cánh tay).<ul><li>Tiết kiệm sức, nhảy được lâu và nhanh.</li></ul>',
        '<i>Vì sao?</i> Nhảy cao hay đáp gót mạnh tốn sức, dễ vướng dây và hại khớp.<ul><li>Cổ tay xoay đều giúp dây qua chân nhịp nhàng.</li></ul>',
      ],
      ['Sai — nhảy cao tốn sức và dễ vướng dây.', 'Đúng — nhảy nhẹ trên đầu ngón chân, cổ tay xoay dây.', 'Sai — đáp gót mạnh dễ chấn thương.', 'Sai — không tiếp cả lòng bàn chân khi nhảy nhanh.']),
    Q('Số lần nhảy dây 1 phút cơ bản?', ['500', 'HS THCS ~80–120 lần/phút', '1000', '10'], 1, 'HS THCS đạt ~80–120 lần/phút (nhảy đơn) là tốt.',
      [
        '<b>Tần số nhảy dây</b> của HS THCS ở mức cơ bản (nhảy đơn, mỗi vòng dây một lần bật) đạt <code>khoảng 80–120 lần/phút</code> là tốt.<ul><li>Tập đều giúp tăng dần số lần và độ bền.</li></ul>',
        '<i>Đối chiếu:</i> 500–1000 lần/phút là không thực tế; 10 lần/phút thì quá ít.<ul><li>Có thể tính số lần hoặc thời gian nhảy liên tục để đánh giá.</li></ul>',
      ],
      ['Sai — 500 lần/phút là không thực tế.', 'Đúng — HS THCS đạt khoảng 80–120 lần/phút là tốt.', 'Sai — 1000 lần/phút là không thể.', 'Sai — 10 lần/phút quá ít.']),
    Q('Lỗi thường gặp?', ['Nhảy quá cao, cổ tay không xoay đủ', 'Tốc độ ổn', 'Tay vung đều', 'Nhảy thấp'], 0, 'Nhảy cao tốn sức; cổ tay không xoay đủ làm dây không qua chân.',
      [
        '<b>Lỗi thường gặp khi nhảy dây</b>: <code>nhảy quá cao</code> (tốn sức, nhanh mỏi) và <code>cổ tay không xoay đủ</code> (dùng cả cánh tay) khiến dây không qua chân kịp, hay vướng dây.<ul><li>Khắc phục bằng cách bật thấp và xoay cổ tay đều.</li></ul>',
        '<i>Đúng kỹ thuật:</i> nhảy thấp, tốc độ ổn định, dùng cổ tay — đó là dấu hiệu tốt, không phải lỗi.<ul><li>Giữ nhịp đều giúp nhảy lâu mà không vướng.</li></ul>',
      ],
      ['Đúng — nhảy quá cao tốn sức, cổ tay không xoay đủ làm dây vướng.', 'Sai — tốc độ ổn là tốt, không phải lỗi.', 'Sai — tay vung đều không phải lỗi.', 'Sai — nhảy thấp là kỹ thuật đúng, không phải lỗi.']),
  ]),

  M(21, 'Thể dục nhịp điệu (aerobic) — Bài đơn giản', [
    Q('Aerobic là?', ['Tập sức nặng', 'Bài tĩnh', 'Bài tập có nhịp điệu, kéo dài, dùng nhiều oxy', 'Bài yoga'], 2, 'Aerobic = tập có oxy (chạy, đạp xe, nhảy nhịp điệu), rèn tim phổi.',
      [
        '<b>Aerobic (thể dục nhịp điệu)</b> là các <code>bài tập có nhịp điệu, kéo dài</code>, cường độ vừa, sử dụng <b>nhiều oxy (ưa khí)</b> để cung cấp năng lượng — như chạy, đạp xe, nhảy theo nhạc.<ul><li>Chủ yếu rèn sức bền tim – phổi.</li></ul>',
        '<i>Phân biệt:</i> tập sức nặng (tạ) là <code>yếm khí (anaerobic)</code>; yoga thiên về dẻo và tĩnh.<ul><li>Aerobic luôn gắn với vận động liên tục theo nhịp.</li></ul>',
      ],
      ['Sai — tập sức nặng là tập yếm khí (anaerobic).', 'Sai — aerobic là bài vận động, không phải bài tĩnh.', 'Đúng — aerobic là bài có nhịp điệu, kéo dài, dùng nhiều oxy.', 'Sai — yoga thiên về dẻo và tĩnh, khác aerobic.']),
    Q('Cường độ aerobic phù hợp?', ['Tăng dần đến hết sức tối đa', 'Cực mạnh', 'Cực nhẹ', 'Vừa phải, nói chuyện được nhưng không thuộc lòng'], 3, 'Cường độ vừa: "talk test" — vẫn nói được nhưng không hát/đọc thuộc lòng.',
      [
        '<b>Cường độ aerobic hợp lý</b> là mức <code>vừa phải</code>: theo "talk test", người tập <b>vẫn nói chuyện được nhưng không thể hát/đọc thuộc lòng cả câu dài</b>.<ul><li>Đủ để rèn tim – phổi mà không quá sức.</li></ul>',
        '<i>Vì sao?</i> Cực mạnh dễ chuyển sang yếm khí, nhanh kiệt sức; cực nhẹ thì không đủ hiệu quả.<ul><li>Cường độ vừa duy trì được lâu — đúng bản chất aerobic.</li></ul>',
      ],
      ['Sai — không cần đẩy đến hết sức tối đa.', 'Sai — cực mạnh dễ chuyển sang yếm khí.', 'Sai — cực nhẹ không đủ hiệu quả tim phổi.', 'Đúng — cường độ vừa, vẫn nói chuyện được (talk test).']),
    Q('Thời gian aerobic mỗi buổi?', ['2 phút', '5 phút', '≥20–30 phút', '5 giờ'], 2, 'Để có hiệu quả tim phổi: ≥20–30 phút/buổi, 3–5 buổi/tuần.',
      [
        '<b>Thời lượng aerobic mỗi buổi</b>: nên duy trì <code>ít nhất 20–30 phút</code> liên tục để đạt hiệu quả tim – phổi, tập <b>3–5 buổi/tuần</b>.<ul><li>Cơ thể cần thời gian để chuyển sang đốt mỡ và rèn sức bền.</li></ul>',
        '<i>Đối chiếu:</i> 2–5 phút quá ngắn; 5 giờ quá dài, dễ quá sức và chấn thương.<ul><li>Vừa đủ thời lượng + đều đặn là chìa khoá.</li></ul>',
      ],
      ['Sai — 2 phút quá ngắn để có hiệu quả.', 'Sai — 5 phút chưa đủ cho hiệu quả tim phổi.', 'Đúng — nên tập ít nhất 20–30 phút mỗi buổi.', 'Sai — 5 giờ quá dài và dễ quá sức.']),
    Q('Bài aerobic gồm?', ['Hồi phục trước', 'Khởi động → bài chính → hồi phục', 'Bài chính ngay', 'Chỉ cần khởi động và bài chính, bỏ hồi phục'], 1, '3 phần: warmup + main + cooldown.',
      [
        '<b>Cấu trúc một bài aerobic</b> gồm 3 phần: <code>khởi động (warm-up)</code> → <code>bài chính (main)</code> → <code>hồi phục/thả lỏng (cool-down)</code>.<ul><li>Giống cấu trúc chung của mọi buổi tập.</li></ul>',
        '<i>Vì sao đủ 3 phần?</i> Khởi động tránh chấn thương; hồi phục đưa cơ thể về nghỉ an toàn, giảm đau mỏi.<ul><li>Không vào bài chính ngay, cũng không bỏ phần hồi phục.</li></ul>',
      ],
      ['Sai — không hồi phục trước khi tập.', 'Đúng — gồm khởi động, bài chính rồi hồi phục.', 'Sai — không vào bài chính ngay khi chưa khởi động.', 'Sai — không bỏ phần hồi phục.']),
    Q('Lợi ích aerobic?', ['Chỉ giảm cân', 'Khoẻ tim phổi, đốt mỡ, giảm stress', 'Không có lợi', 'Chỉ tăng cơ bắp lớn ở chân'], 1, 'Aerobic là loại tập tốt nhất cho tim mạch, tinh thần.',
      [
        '<b>Lợi ích của aerobic</b>: tăng cường <code>sức khoẻ tim – phổi</code>, <code>đốt mỡ thừa</code> và <b>giảm căng thẳng (stress)</b>, cải thiện tinh thần.<ul><li>Là loại vận động tốt nhất cho hệ tim mạch.</li></ul>',
        '<i>Toàn diện:</i> không chỉ giảm cân — aerobic còn cải thiện giấc ngủ và sức bền chung.<ul><li>Không nhằm tăng cơ bắp lớn (đó là tập sức mạnh).</li></ul>',
      ],
      ['Sai — aerobic có nhiều lợi ích hơn là chỉ giảm cân.', 'Đúng — aerobic khoẻ tim phổi, đốt mỡ và giảm stress.', 'Sai — aerobic rất có lợi cho sức khoẻ.', 'Sai — aerobic không nhằm tăng cơ bắp lớn.']),
  ]),

  M(22, 'Bóng đá — Sút bóng và đối kháng nhóm', [
    Q('Sút bóng mu trong dùng để?', ['Sút bổng', 'Sút có độ cong (cong lưỡi liềm)', 'Sút thẳng', 'Sút yếu'], 1, 'Sút mu trong (inside curl) tạo bóng đi cong (kiểu Bend-it-like-Beckham).',
      [
        '<b>Sút bóng bằng mu trong</b> (inside curl): chân tiếp xúc <code>lệch bên trong quả bóng</code> tạo độ xoáy → bóng <b>đi cong (cong lưỡi liềm)</b>.<ul><li>Dùng để sút phạt, chuyền vòng qua hàng phòng ngự.</li></ul>',
        '<i>Phân biệt:</i> sút mu giữa cho bóng thẳng – mạnh; sút mu trong cho bóng cong – kỹ thuật.<ul><li>Mu trong vẫn tạo lực tốt, không phải sút yếu.</li></ul>',
      ],
      ['Sai — sút bổng dùng kỹ thuật khác (mũi/lòng chân luồn dưới bóng).', 'Đúng — sút mu trong tạo bóng đi cong.', 'Sai — sút thẳng dùng mu chính giữa.', 'Sai — mu trong vẫn tạo lực, không phải sút yếu.']),
    Q('Sút mu giữa?', ['Sút mạnh, bay thẳng', 'Bóng bổng', 'Bóng cong', 'Bóng yếu'], 0, 'Sút mu chính giữa: lực mạnh, bóng bay thẳng.',
      [
        '<b>Sút bằng mu chính giữa</b>: chân tiếp xúc <code>chính giữa quả bóng</code> bằng mu bàn chân → bóng đi <b>mạnh và thẳng</b>, không xoáy.<ul><li>Dùng để sút xa, dứt điểm uy lực.</li></ul>',
        '<i>Then chốt:</i> lấy đà, vung chân nhanh, gập cổ chân, chạm đúng tâm bóng.<ul><li>Bóng cong là sút mu trong/ngoài; mu giữa cho bóng thẳng.</li></ul>',
      ],
      ['Đúng — sút mu giữa cho lực mạnh và bóng bay thẳng.', 'Sai — mu giữa không tạo bóng bổng.', 'Sai — bóng cong là sút mu trong/ngoài.', 'Sai — mu giữa tạo lực mạnh, không phải bóng yếu.']),
    Q('Vị trí điểm tiếp xúc khi sút thẳng?', ['Trên bóng', 'Dưới bóng', 'Mu chính giữa bàn chân + chính giữa quả bóng', 'Mũi bàn chân + nửa trên quả bóng'], 2, 'Bóng thẳng: chân tiếp xúc chính giữa bóng để không tạo xoáy.',
      [
        '<b>Điểm tiếp xúc khi sút thẳng – mạnh</b>: dùng <code>mu chính giữa bàn chân</code> chạm vào <code>chính giữa quả bóng</code> → bóng đi thẳng, không tạo xoáy.<ul><li>Cộng thêm động tác gập cổ chân để tăng lực.</li></ul>',
        '<i>Vì sao?</i> Chạm trên bóng làm bóng cắm xuống; chạm dưới bóng làm bóng bổng lên.<ul><li>Chạm đúng tâm giúp bóng đi đúng hướng dự định.</li></ul>',
      ],
      ['Sai — tiếp xúc trên bóng làm bóng cắm xuống.', 'Sai — tiếp xúc dưới bóng làm bóng bổng lên.', 'Đúng — mu chính giữa bàn chân chạm chính giữa bóng để bóng đi thẳng.', 'Sai — mũi chân và nửa trên bóng làm bóng đi không chuẩn.']),
    Q('Đối kháng nhóm 3 vs 3 rèn?', ['Chỉ cá nhân', 'Đứng yên', 'Phối hợp, ra quyết định nhanh', 'Không rèn'], 2, 'Đối kháng nhóm nhỏ rèn phối hợp, ra quyết định và tinh thần đồng đội.',
      [
        '<b>Đối kháng nhóm nhỏ (3 vs 3)</b> rèn <code>khả năng phối hợp</code> và <b>ra quyết định nhanh</b> (chuyền, đi bóng hay dứt điểm) trong không gian hẹp, nhiều tình huống.<ul><li>Mỗi người chạm bóng nhiều → tiến bộ nhanh.</li></ul>',
        '<i>Bổ sung:</i> rèn cả tinh thần đồng đội, di chuyển không bóng và phòng ngự nhóm.<ul><li>Không phải chơi cá nhân hay đứng yên.</li></ul>',
      ],
      ['Sai — đối kháng nhóm rèn phối hợp chứ không chỉ cá nhân.', 'Sai — đứng yên không phải đối kháng.', 'Đúng — rèn phối hợp và ra quyết định nhanh.', 'Sai — đối kháng nhóm nhỏ rèn rất nhiều kỹ năng.']),
    Q('Khi không có bóng, cần?', ['Di chuyển chọn vị trí cho đồng đội chuyền', 'Đứng cạnh đồng đội cầm bóng để hỗ trợ', 'Đứng yên', 'Đứng nhìn đồng đội thi đấu'], 0, 'Bóng đá hiện đại: 80% thời gian không có bóng — di chuyển chọn vị trí rất quan trọng.',
      [
        '<b>Khi không có bóng</b>: phải <code>di chuyển chọn vị trí trống</code> để tạo phương án nhận bóng cho đồng đội đang cầm bóng.<ul><li>Một cầu thủ chỉ giữ bóng vài giây, còn lại là chơi không bóng.</li></ul>',
        '<i>Vì sao quan trọng?</i> Trong trận, mỗi cầu thủ <b>không có bóng tới ~80% thời gian</b> — di chuyển hợp lý quyết định lối chơi cả đội.<ul><li>Đứng yên/đứng sát người cầm bóng làm bí phương án chuyền.</li></ul>',
      ],
      ['Đúng — di chuyển chọn vị trí để đồng đội dễ chuyền.', 'Sai — đứng sát người cầm bóng làm bí phương án chuyền.', 'Sai — đứng yên không tạo được lựa chọn cho đồng đội.', 'Sai — đứng nhìn là thụ động, không hỗ trợ được đội.']),
  ]),

  M(23, 'Bóng rổ — Dẫn bóng và đột phá', [
    Q('Dẫn bóng (dribble) cơ bản?', ['Lăn bóng', 'Đẩy bóng', 'Vỗ bóng bằng đầu ngón tay, không nhìn xuống', 'Cầm bóng chạy'], 2, 'Dribble: vỗ bóng nhịp nhàng bằng đầu ngón tay, ngẩng đầu quan sát.',
      [
        '<b>Dẫn bóng (dribble) cơ bản</b>: <code>vỗ bóng nhịp nhàng bằng đầu các ngón tay</code> (không đập bằng lòng bàn tay), <b>ngẩng đầu quan sát</b> sân chứ không nhìn xuống bóng.<ul><li>Vỗ bóng cao ngang hông trở xuống.</li></ul>',
        '<i>Vì sao không nhìn xuống?</i> Để quan sát đồng đội, đối phương và đường lên rổ.<ul><li>Cầm bóng chạy (không vỗ) là phạm lỗi đi bộ (travel).</li></ul>',
      ],
      ['Sai — lăn bóng không phải dẫn bóng.', 'Sai — đẩy bóng không phải kỹ thuật dribble.', 'Đúng — vỗ bóng bằng đầu ngón tay, không nhìn xuống.', 'Sai — cầm bóng chạy là phạm lỗi đi bộ.']),
    Q('Lỗi đi bộ (travel)?', ['Chuyền', 'Dẫn quá nhanh', 'Đi quá 2 bước mà không dẫn bóng', 'Ném rổ'], 2, 'Bóng rổ cho phép ≤2 bước không dẫn bóng (sau khi dừng). Bước 3 = travel.',
      [
        '<b>Lỗi đi bộ (travel)</b>: khi đang cầm bóng (không vỗ), người chơi <code>di chuyển quá 2 bước</code> mà không dẫn bóng → phạm lỗi, mất quyền kiểm soát bóng.<ul><li>Luật cho phép tối đa 2 bước sau khi bắt/dừng bóng.</li></ul>',
        '<i>Khắc phục:</i> trong khi di chuyển phải liên tục vỗ bóng; nếu đã cầm thì chỉ được 2 bước rồi chuyền/ném.<ul><li>Chuyền, ném rổ, dẫn nhanh không phải lỗi travel.</li></ul>',
      ],
      ['Sai — chuyền không phải lỗi đi bộ.', 'Sai — dẫn nhanh không phải lỗi travel.', 'Đúng — đi quá 2 bước mà không dẫn bóng là lỗi đi bộ.', 'Sai — ném rổ không phải lỗi travel.']),
    Q('Lỗi 2 lần dẫn bóng (double dribble)?', ['Dẫn 2 tay luân phiên', 'Dẫn chậm', 'Dẫn nhanh', 'Cầm bóng rồi dẫn lại'], 3, 'Đã cầm bóng (catch) rồi dẫn tiếp = phạm lỗi double dribble.',
      [
        '<b>Lỗi hai lần dẫn bóng (double dribble)</b>: đã <code>cầm/bắt bóng bằng hai tay (kết thúc một lần dẫn)</code> rồi lại <b>dẫn bóng tiếp</b> → phạm lỗi.<ul><li>Mỗi lượt cầm bóng chỉ được dẫn một "đợt".</li></ul>',
        '<i>Phân biệt:</i> dẫn bằng một tay rồi đổi tay (chưa cầm bóng) vẫn hợp lệ.<ul><li>Dẫn nhanh hay chậm không phải lỗi này.</li></ul>',
      ],
      ['Sai — dẫn luân phiên 2 tay vẫn hợp lệ nếu chưa cầm bóng.', 'Sai — dẫn chậm không phải double dribble.', 'Sai — dẫn nhanh không phải double dribble.', 'Đúng — đã cầm bóng rồi dẫn lại là lỗi double dribble.']),
    Q('Đột phá lên rổ?', ['Tự ném 3 điểm', 'Chuyền cho người khác', 'Đứng yên ném', 'Crossover hoặc step-back qua hậu vệ rồi sút'], 3, 'Đột phá: crossover/cắt mặt qua hậu vệ rồi sút (layup) hoặc chuyền.',
      [
        '<b>Đột phá lên rổ</b>: dùng kỹ thuật <code>crossover (đảo bóng đổi hướng)</code> hoặc <code>step-back</code> để vượt qua hậu vệ, rồi <b>lên rổ (layup) hoặc sút</b>.<ul><li>Là cách tự tạo cơ hội ghi điểm.</li></ul>',
        '<i>Then chốt:</i> đổi hướng đột ngột, tăng tốc qua người, giữ bóng an toàn rồi dứt điểm.<ul><li>Đứng yên ném hay chuyền đi không phải đột phá.</li></ul>',
      ],
      ['Sai — tự ném 3 điểm không phải đột phá.', 'Sai — chuyền cho người khác không phải đột phá lên rổ.', 'Sai — đứng yên ném không phải đột phá.', 'Đúng — crossover hoặc step-back qua hậu vệ rồi sút là đột phá.']),
    Q('Layup là?', ['Sút 3 điểm', 'Lên rổ bằng 2 bước cuối + bật 1 chân', 'Sút tự do', 'Sút từ xa'], 1, 'Layup: bước 1, bước 2, bật 1 chân thuận, đưa bóng nhẹ vào rổ.',
      [
        '<b>Layup (lên rổ)</b>: cú ghi điểm gần rổ bằng <code>2 bước cuối</code> (bước 1 – bước 2) rồi <b>bật bằng một chân</b>, đưa bóng nhẹ nhàng đặt/thả vào rổ.<ul><li>Thường tận dụng bảng rổ để bóng dội vào.</li></ul>',
        '<i>Nhịp chân:</i> tay thuận lên rổ thì bật bằng chân nghịch (và ngược lại) — "bước phải, bước trái, bật".<ul><li>Khác hẳn sút 3 điểm hay ném phạt từ xa.</li></ul>',
      ],
      ['Sai — sút 3 điểm là cú ném từ xa, không phải layup.', 'Đúng — layup là lên rổ bằng 2 bước cuối và bật 1 chân.', 'Sai — sút tự do (ném phạt) khác layup.', 'Sai — layup là cú lên rổ gần, không phải sút từ xa.']),
  ]),

  M(24, 'Bóng chuyền — Phối hợp đập-chắn', [
    Q('Đập bóng có hiệu quả khi?', ['Bật thấp', 'Tiếp bóng muộn', 'Đứng đập', 'Cao điểm bật và tiếp xúc bóng đúng lúc'], 3, 'Hiệu quả tối đa khi đập ở đỉnh bật nhảy, tiếp xúc bóng đúng "sweet spot".',
      [
        '<b>Đập bóng hiệu quả</b> khi tiếp xúc bóng ở <code>đỉnh cao của cú bật nhảy</code> và <b>đúng thời điểm</b> (bóng ở tầm tay với cao nhất, hơi trước trán).<ul><li>Đập từ trên cao → góc cắm xuống tốt, khó đỡ.</li></ul>',
        '<i>Vì sao?</i> Bật cao + chạm đúng lúc tạo lực mạnh nhất và quỹ đạo hiểm.<ul><li>Bật thấp, đứng đập hay tiếp bóng muộn đều giảm uy lực.</li></ul>',
      ],
      ['Sai — bật thấp giảm uy lực cú đập.', 'Sai — tiếp bóng muộn làm mất điểm chạm tối ưu.', 'Sai — đứng đập không tạo được độ cao và lực.', 'Đúng — đập ở đỉnh bật nhảy, tiếp xúc bóng đúng lúc là hiệu quả nhất.']),
    Q('Chắn (block) bóng cần?', ['Bật cao đúng lúc, tay vươn qua lưới', 'Cúi xuống', 'Đứng yên', 'Nhảy chậm'], 0, 'Chắn: bật cùng lúc đối phương đập, 2 tay vươn qua lưới chặn bóng.',
      [
        '<b>Chắn bóng (block)</b>: <code>bật nhảy cao đúng thời điểm</code> đối phương đập, hai tay <b>vươn qua lưới</b> (các ngón xoè, lòng bàn tay hướng sang sân đối) để chặn bóng.<ul><li>Là tuyến phòng thủ đầu tiên trước cú đập.</li></ul>',
        '<i>Then chốt:</i> căn thời điểm bật theo người đập, giữ tay chắc, không chạm lưới.<ul><li>Cúi xuống, đứng yên hay nhảy chậm thì không chắn được.</li></ul>',
      ],
      ['Đúng — bật cao đúng lúc, hai tay vươn qua lưới để chắn.', 'Sai — cúi xuống không chắn được bóng.', 'Sai — đứng yên không chắn được cú đập.', 'Sai — nhảy chậm thì không kịp chắn.']),
    Q('Hợp lệ khi chắn?', ['Chạm lưới', 'Đánh sang', 'Chạm bóng trên sân đối', 'Không chạm lưới, không chạm bóng phía bên đối phương trước khi họ đập'], 3, 'Luật: không chạm lưới, chỉ chạm bóng khi bóng đã sang phần lưới của mình.',
      [
        '<b>Chắn hợp lệ</b> phải tuân thủ luật: <code>không chạm lưới</code> và <b>không chạm bóng ở phần sân đối phương trước khi họ thực hiện cú đập</b>.<ul><li>Tay có thể vươn qua lưới nhưng chỉ chạm bóng sau khi đối phương đã đập.</li></ul>',
        '<i>Phạm lỗi:</i> chạm lưới, hoặc chắn bóng khi bóng còn trên sân đối/chưa được đập.<ul><li>Vi phạm thì đối phương được điểm.</li></ul>',
      ],
      ['Sai — chạm lưới là phạm lỗi.', 'Sai — đánh sang không phải động tác chắn hợp lệ.', 'Sai — chạm bóng trên sân đối khi họ chưa đập là phạm lỗi.', 'Đúng — không chạm lưới và không chạm bóng bên sân đối trước khi họ đập.']),
    Q('Phối hợp đập-chắn?', ['Đập trừ chắn của đối phương; phòng thủ chắn ngăn đập', 'Cùng vai trò', 'Không liên quan', 'Loại trừ'], 0, 'Cuộc đối đầu giữa đập và chắn là tâm điểm chiến thuật bóng chuyền.',
      [
        '<b>Phối hợp đập – chắn</b> là tâm điểm chiến thuật: <code>đập để khắc chế hàng chắn của đối phương</code>, còn <code>chắn để ngăn cú đập</code>.<ul><li>Hai bên liên tục đấu trí, đấu kỹ thuật quanh lưới.</li></ul>',
        '<i>Quan hệ:</i> đập và chắn là hai vai trò <b>đối lập nhưng gắn bó</b>, tương tác chặt chẽ với nhau.<ul><li>Không phải "không liên quan" hay "loại trừ nhau".</li></ul>',
      ],
      ['Đúng — đập để khắc chế chắn, chắn để ngăn đập, là cuộc đối đầu chiến thuật.', 'Sai — đập và chắn là 2 vai trò đối lập, không cùng vai trò.', 'Sai — đập và chắn liên quan chặt chẽ.', 'Sai — chúng tương tác nhau chứ không loại trừ.']),
    Q('Tinh thần đồng đội bóng chuyền?', ['5 chạm', '1 chạm', 'Cá nhân', 'Mỗi bóng cần 3 chạm + phối hợp đỡ-chuyền-đập', 'Không phối hợp'], 3, 'Sơ đồ chuẩn: chạm 1 đỡ, chạm 2 chuyền 2 (setter), chạm 3 đập (chủ công).',
      [
        '<b>Phối hợp đồng đội bóng chuyền</b>: mỗi pha bóng nên dùng <code>3 chạm</code> theo sơ đồ <b>đỡ (chạm 1) → chuyền 2/setter (chạm 2) → đập/chủ công (chạm 3)</b>.<ul><li>Phối hợp nhịp nhàng mới tấn công hiệu quả.</li></ul>',
        '<i>Luật:</i> mỗi bên được chạm bóng <b>tối đa 3 lần</b> trước khi đưa bóng qua lưới (không tính chạm chắn).<ul><li>Chỉ 1 chạm hay không phối hợp đều kém hiệu quả.</li></ul>',
      ],
      ['Sai — luật cho tối đa 3 chạm mỗi bên, không phải 5.', 'Sai — chỉ 1 chạm thì không phối hợp được.', 'Sai — bóng chuyền là môn đồng đội, không chơi cá nhân.', 'Đúng — mỗi bóng nên dùng 3 chạm phối hợp đỡ-chuyền-đập.', 'Sai — không phối hợp thì không hiệu quả.']),
  ]),

  M(25, 'Đá cầu — Đá hất và đá cầu nhóm 3 người', [
    Q('Đá hất dùng?', ['Đỉnh đầu', 'Mu hoặc lòng bàn chân, đưa cầu sang đồng đội cao', 'Đầu gối', 'Bụng và ngực, đưa cầu sang ngang'], 1, 'Đá hất = đỡ + hất cầu lên cao cho đồng đội.',
      [
        '<b>Đá hất</b> trong đá cầu: dùng <code>mu hoặc lòng bàn chân</code> để đỡ rồi <b>hất cầu lên cao</b>, đưa cầu sang cho đồng đội nhận tiếp.<ul><li>Là kỹ thuật chuyền cầu trong phối hợp nhóm.</li></ul>',
        '<i>Yêu cầu:</i> điều chỉnh lực và độ cao phù hợp tầm với của đồng đội.<ul><li>Đầu gối, bụng – ngực khó kiểm soát cầu khi hất.</li></ul>',
      ],
      ['Sai — đỉnh đầu không dùng cho đá hất.', 'Đúng — đá hất dùng mu hoặc lòng bàn chân để đưa cầu lên cao.', 'Sai — đầu gối khó kiểm soát cầu khi hất.', 'Sai — bụng và ngực không phải kỹ thuật đá hất.']),
    Q('Đá cầu nhóm 3 cần?', ['Tránh nhau', 'Mỗi người tự đỡ rồi tự đá lại', 'Phân vị trí, đỡ-chuyền-tấn công', 'Đứng yên'], 2, 'Nhóm 3: có vai trò rõ ràng (đỡ, chuyền 2, tấn công).',
      [
        '<b>Đá cầu nhóm 3 người</b> cần <code>phân vị trí và vai trò rõ ràng</code>: người <b>đỡ</b> cầu sang → người <b>chuyền</b> (làm cầu) → người <b>tấn công</b> đưa cầu qua lưới.<ul><li>Tương tự sơ đồ phối hợp 3 chạm của bóng chuyền.</li></ul>',
        '<i>Vì sao?</i> Phân vai giúp phối hợp ăn ý, tận dụng được cú tấn công mạnh.<ul><li>Mỗi người tự lo hay tránh nhau thì không thành lối chơi nhóm.</li></ul>',
      ],
      ['Sai — tránh nhau làm rối phối hợp.', 'Sai — mỗi người tự lo thì không phối hợp nhóm.', 'Đúng — phân vị trí rõ: đỡ, chuyền, tấn công.', 'Sai — đứng yên không phối hợp được.']),
    Q('Khi cầu rơi xa?', ['Để cầu rơi', 'Đứng yên', 'Di chuyển nhanh tới vị trí, đỡ thấp', 'Gọi đồng đội'], 2, 'Di chuyển nhanh và đỡ ở vị trí thấp.',
      [
        '<b>Khi cầu rơi xa</b>: phải <code>di chuyển nhanh</code> tới vị trí cầu rơi và <b>đỡ ở tư thế thấp</b> để cứu cầu kịp thời.<ul><li>Phản xạ và tốc độ di chuyển rất quan trọng.</li></ul>',
        '<i>Tránh:</i> để cầu rơi (mất điểm), đứng yên, hay chỉ gọi đồng đội mà không di chuyển.<ul><li>Mọi người phải chủ động cứu cầu trong khả năng.</li></ul>',
      ],
      ['Sai — để cầu rơi là mất điểm.', 'Sai — đứng yên không cứu được cầu.', 'Đúng — di chuyển nhanh tới vị trí và đỡ thấp.', 'Sai — chỉ gọi đồng đội mà không di chuyển thì cầu vẫn rơi.']),
    Q('Tinh thần thi đấu đá cầu?', ['Thắng bằng mọi giá', 'Vui khoẻ, phối hợp, fair-play', 'Khoe khoang', 'Đè đối thủ'], 1, 'Tinh thần thể thao đặt lên hàng đầu.',
      [
        '<b>Tinh thần thi đấu đá cầu</b>: đặt <code>vui – khoẻ</code>, <b>phối hợp đồng đội</b> và <b>fair-play</b> lên hàng đầu, tôn trọng đối thủ và luật chơi.<ul><li>Đá cầu là môn truyền thống, đề cao tinh thần đẹp.</li></ul>',
        '<i>Tránh:</i> thắng bằng mọi giá, khoe khoang, tìm cách đè đối thủ — đều trái tinh thần thể thao.<ul><li>Niềm vui và sự tiến bộ quan trọng hơn thắng – thua.</li></ul>',
      ],
      ['Sai — thắng bằng mọi giá trái tinh thần thể thao.', 'Đúng — vui khoẻ, phối hợp và fair-play.', 'Sai — khoe khoang là thiếu tôn trọng.', 'Sai — đè đối thủ không phải tinh thần fair-play.']),
    Q('Sức mạnh nào quan trọng nhất khi đá cầu?', ['Sức nhanh + sự khéo léo + phản xạ', 'Chỉ nhảy cao', 'Chỉ chạy nhanh', 'Sức mạnh tối đa'], 0, 'Đá cầu thiên về nhanh nhẹn, khéo léo và phản xạ hơn là sức mạnh.',
      [
        '<b>Tố chất quan trọng nhất khi đá cầu</b>: <code>sức nhanh</code>, <code>sự khéo léo</code> và <b>phản xạ</b> — vì cầu nhỏ, bay nhanh, đổi hướng liên tục, đòi hỏi điều khiển tinh tế.<ul><li>Khéo léo bàn chân quyết định khả năng giữ và điều cầu.</li></ul>',
        '<i>Đối chiếu:</i> đá cầu <b>không thiên về sức mạnh tối đa</b>; nhảy cao hay chạy nhanh chỉ là một phần.<ul><li>Đây là môn rèn sự nhanh nhẹn, khéo léo điển hình.</li></ul>',
      ],
      ['Đúng — đá cầu cần sức nhanh, khéo léo và phản xạ.', 'Sai — không chỉ cần nhảy cao.', 'Sai — không chỉ cần chạy nhanh.', 'Sai — đá cầu không thiên về sức mạnh tối đa.']),
  ]),

  M(26, 'Võ thuật cơ bản — Bài quyền số 2 và kỹ thuật tự vệ', [
    Q('Tự vệ cơ bản nhằm mục đích?', ['Bắt nạt', 'Tấn công người khác', 'Khoe khoang', 'Bảo vệ bản thân khi bị tấn công'], 3, 'Tự vệ chỉ dùng để bảo vệ khi bị tấn công, không phải để gây sự.',
      [
        '<b>Tự vệ</b> nhằm mục đích duy nhất là <code>bảo vệ bản thân khi bị tấn công</code> — thoát khỏi nguy hiểm an toàn, không phải để gây sự hay làm hại người khác.<ul><li>Gắn liền với tinh thần võ đạo.</li></ul>',
        '<i>Nguyên tắc đạo đức:</i> chỉ dùng kỹ thuật tự vệ khi thật sự cần thiết, đủ để thoát thân.<ul><li>Bắt nạt, tấn công hay khoe khoang đều đi ngược mục đích tự vệ.</li></ul>',
      ],
      ['Sai — tự vệ không phải để bắt nạt.', 'Sai — tự vệ không nhằm tấn công người khác.', 'Sai — tự vệ không phải để khoe khoang.', 'Đúng — tự vệ để bảo vệ bản thân khi bị tấn công.']),
    Q('Nguyên tắc tự vệ?', ['Khiêu khích', 'Đánh đau', 'Tránh xung đột > đối thoại > tự vệ phản công khi không tránh được', 'Tấn công ngay'], 2, 'Ưu tiên: tránh xung đột → đối thoại → tự vệ khi buộc phải.',
      [
        '<b>Nguyên tắc xử lý theo thứ tự ưu tiên</b>: <code>tránh xung đột</code> → <code>đối thoại/hoà giải</code> → <b>tự vệ phản công chỉ khi không còn cách nào tránh được</b>.<ul><li>Hạn chế tối đa va chạm, ưu tiên giải pháp hoà bình.</li></ul>',
        '<i>Vì sao?</i> Tránh được nguy hiểm là tốt nhất; chỉ dùng vũ lực khi buộc phải để thoát thân.<ul><li>Khiêu khích hay tấn công ngay đều làm xung đột tệ hơn.</li></ul>',
      ],
      ['Sai — khiêu khích làm xung đột tệ hơn.', 'Sai — gây đau không phải nguyên tắc tự vệ.', 'Đúng — ưu tiên tránh xung đột, đối thoại, chỉ tự vệ khi buộc phải.', 'Sai — không tấn công ngay khi có thể tránh.']),
    Q('Khi bị kẹp cổ tay, cách thoát?', ['Xoay tay theo hướng ngón cái đối thủ (chỗ yếu nhất)', 'Kéo thẳng', 'Đẩy ngược', 'Không thoát được'], 0, 'Ngón cái là điểm yếu của bàn tay — xoay theo hướng ngón cái dễ thoát.',
      [
        '<b>Thoát khi bị nắm/kẹp cổ tay</b>: <code>xoay tay theo hướng ngón cái của đối thủ</code> — vì chỗ tiếp giáp ngón cái với các ngón là <b>điểm yếu nhất</b> của thế nắm.<ul><li>Lợi dụng đòn bẩy thoát ra dễ dàng.</li></ul>',
        '<i>Vì sao không kéo thẳng?</i> Kéo thẳng đối lực với cả bàn tay nắm chặt → rất khó thoát.<ul><li>Xoay đúng hướng tận dụng điểm yếu, không cần nhiều sức.</li></ul>',
      ],
      ['Đúng — xoay tay theo hướng ngón cái đối thủ là chỗ yếu nhất.', 'Sai — kéo thẳng khó thoát vì đối lực với cả bàn tay.', 'Sai — đẩy ngược không tận dụng được điểm yếu.', 'Sai — vẫn có thể thoát nếu đúng kỹ thuật.']),
    Q('Đòn thường dùng tự vệ?', ['Đá đầu', 'Vật ngã', 'Đấm ngực', 'Đấm cào, đá thẳng vào vùng yếu (gối, mu bàn chân)'], 3, 'Tự vệ thực tế: tấn công vùng yếu (gối, mu bàn chân, mắt cá) để thoát.',
      [
        '<b>Đòn tự vệ thực tế</b>: nhắm vào <code>vùng yếu/nhạy cảm</code> như <b>gối, mu bàn chân, mắt cá</b> (đá thẳng, giẫm) để làm đối thủ mất thăng bằng rồi <b>thoát chạy</b>.<ul><li>Mục tiêu là tạo cơ hội thoát thân, không phải hạ gục.</li></ul>',
        '<i>Vì sao không đá đầu/vật ngã?</i> Đòn cao và vật ngã đòi hỏi kỹ thuật cao, mạo hiểm cho người tự vệ.<ul><li>Tấn công vùng yếu nhanh, hiệu quả, an toàn hơn.</li></ul>',
      ],
      ['Sai — đá đầu khó và mạo hiểm cho người tự vệ.', 'Sai — vật ngã đòi hỏi kỹ thuật cao, không phù hợp tự vệ cơ bản.', 'Sai — đấm ngực ít hiệu quả để thoát thân.', 'Đúng — đánh vào vùng yếu (gối, mu bàn chân) để thoát nhanh.']),
    Q('Sau khi thoát, nên?', ['Đứng nhìn', 'Chạy tìm người lớn/cảnh sát, không nán lại', 'Quay lại trêu', 'Đánh tiếp'], 1, 'Mục đích tự vệ là thoát thân — tìm sự giúp đỡ ngay sau khi thoát.',
      [
        '<b>Sau khi thoát khỏi nguy hiểm</b>: <code>chạy tới nơi an toàn, tìm người lớn/cảnh sát</code> nhờ giúp đỡ, <b>không nán lại</b> hiện trường.<ul><li>Mục đích tự vệ là thoát thân và được bảo vệ.</li></ul>',
        '<i>Tránh:</i> đứng nhìn (dễ bị tấn công lại), quay lại trêu hay đánh tiếp — gây thêm xung đột và nguy hiểm.<ul><li>Báo người lớn để xử lý đúng cách.</li></ul>',
      ],
      ['Sai — đứng nhìn dễ bị tấn công lại.', 'Đúng — chạy tìm người lớn hoặc cảnh sát, không nán lại.', 'Sai — quay lại trêu là gây thêm xung đột.', 'Sai — đánh tiếp đi ngược mục đích tự vệ.']),
  ]),

  M(27, 'Thể dục dụng cụ — Bóng (medicine ball), tạ nhẹ', [
    Q('Bóng tạ (medicine ball) dùng để?', ['Trang trí', 'Đá bóng', 'Tập sức mạnh, sức bền, chức năng', 'Ném rổ'], 2, 'Medicine ball: bóng nặng dùng tập sức mạnh và chức năng (functional).',
      [
        '<b>Bóng tạ (medicine ball)</b> là quả bóng có trọng lượng, dùng để <code>tập sức mạnh, sức bền</code> và các bài tập <b>chức năng (functional)</b> — phối hợp nhiều nhóm cơ.<ul><li>An toàn hơn tạ kim loại cho người mới tập.</li></ul>',
        '<i>Đặc điểm:</i> có thể ném, bắt, đẩy, xoay — rèn sức mạnh kết hợp phối hợp toàn thân.<ul><li>Không phải để đá hay trang trí.</li></ul>',
      ],
      ['Sai — bóng tạ là dụng cụ tập, không phải trang trí.', 'Sai — bóng tạ không dùng để đá.', 'Đúng — bóng tạ dùng tập sức mạnh, sức bền và chức năng.', 'Sai — bóng tạ không phải bóng rổ.']),
    Q('Bài tập medicine ball cơ bản?', ['Không có bài', 'Ngồi lên bóng', 'Chỉ cầm', 'Đẩy ngực, ném cao, lăn bóng'], 3, 'Đẩy ngực (chest pass), ném lên cao, lăn bóng làm bụng…',
      [
        '<b>Các bài tập medicine ball cơ bản</b>: <code>đẩy ngực (chest pass)</code> rèn ngực – tay; <code>ném bóng lên cao</code> rèn vai – sức bật; <code>lăn bóng / gập bụng với bóng</code> rèn cơ bụng – lưng.<ul><li>Bài tập đa dạng cho nhiều nhóm cơ.</li></ul>',
        '<i>Lưu ý:</i> chọn bóng vừa sức, thực hiện đúng kỹ thuật, có chỗ tập an toàn.<ul><li>Chỉ cầm hay ngồi lên bóng thì không tập được gì.</li></ul>',
      ],
      ['Sai — có nhiều bài tập với bóng tạ.', 'Sai — ngồi lên bóng không phải bài tập medicine ball.', 'Sai — chỉ cầm thì không tập được gì.', 'Đúng — đẩy ngực, ném cao, lăn bóng là các bài cơ bản.']),
    Q('Tạ nhẹ phù hợp HS THCS?', ['~1–3 kg', '20 kg', '100 kg', '50 kg'], 0, 'HS THCS tập tạ rất nhẹ (1–3 kg), tập đúng kỹ thuật là chính.',
      [
        '<b>Tạ nhẹ phù hợp HS THCS</b>: chỉ <code>khoảng 1–3 kg</code>, tập trung vào <b>kỹ thuật đúng và số lần lặp</b>, không nâng tải nặng.<ul><li>Cơ thể đang phát triển cần thận trọng với tải trọng.</li></ul>',
        '<i>Vì sao?</i> Tạ 20–100 kg quá nặng, nguy hiểm và có thể ảnh hưởng xương – sụn tăng trưởng.<ul><li>Mục tiêu là làm quen kỹ thuật và rèn sức bền cơ.</li></ul>',
      ],
      ['Đúng — HS THCS tập tạ rất nhẹ, khoảng 1–3 kg.', 'Sai — 20 kg quá nặng cho HS THCS.', 'Sai — 100 kg cực kỳ nguy hiểm cho HS.', 'Sai — 50 kg quá nặng cho lứa tuổi này.']),
    Q('Nguyên tắc khi tập tạ?', ['Nâng tải tối đa ngay buổi đầu để bứt phá', 'Đúng kỹ thuật, nâng nhẹ trước, có người hỗ trợ', 'Không cần kỹ thuật', 'Nâng nặng ngay'], 1, 'Tập tạ ưu tiên kỹ thuật, tăng tải từ từ, có spotter.',
      [
        '<b>Nguyên tắc tập tạ an toàn</b>: ưu tiên <code>kỹ thuật đúng</code>, <code>nâng nhẹ trước rồi tăng tải từ từ</code>, và có <b>người hỗ trợ (spotter)</b> khi tập.<ul><li>Khởi động kỹ và kiểm soát động tác từng nhịp.</li></ul>',
        '<i>Vì sao?</i> Nâng tải tối đa/nặng ngay từ đầu rất dễ chấn thương cơ – khớp – cột sống.<ul><li>Kỹ thuật là yếu tố quan trọng nhất, không thể bỏ qua.</li></ul>',
      ],
      ['Sai — nâng tải tối đa ngay rất dễ chấn thương.', 'Đúng — đúng kỹ thuật, nâng nhẹ trước, có người hỗ trợ.', 'Sai — kỹ thuật là yếu tố quan trọng nhất.', 'Sai — nâng nặng ngay rất nguy hiểm.']),
    Q('Tập tạ quá nặng ở tuổi vị thành niên?', ['Có thể ảnh hưởng sự phát triển xương', 'Không sao', 'Tăng nhanh chiều cao và cơ bắp', 'Phát triển sức mạnh toàn diện hơn'], 0, 'Tạ quá nặng tuổi đang phát triển có thể ảnh hưởng xương, sụn tăng trưởng.',
      [
        '<b>Tập tạ quá nặng ở tuổi vị thành niên</b> có thể <code>ảnh hưởng xấu tới sự phát triển của xương và sụn tăng trưởng</code> (vùng đầu xương đang phát triển chiều cao).<ul><li>Lứa tuổi THCS hệ xương chưa hoàn thiện.</li></ul>',
        '<i>Khuyến nghị:</i> dùng tải nhẹ, đúng kỹ thuật, ưu tiên bài tập với trọng lượng cơ thể.<ul><li>Tạ quá nặng không giúp tăng chiều cao mà còn gây hại.</li></ul>',
      ],
      ['Đúng — tạ quá nặng có thể ảnh hưởng xương và sụn tăng trưởng.', 'Sai — tập quá nặng tuổi này thực sự có hại.', 'Sai — không giúp tăng chiều cao, ngược lại còn hại.', 'Sai — tải quá nặng gây hại chứ không phát triển toàn diện.']),
  ]),

  M(28, 'Bóng đá — Phòng ngự khu vực vs phòng ngự kèm người', [
    Q('Phòng ngự kèm người?', ['Không kèm', 'Mỗi hậu vệ kèm 1 đối thủ cụ thể', 'Đứng yên', 'Kèm khu vực'], 1, 'Man-marking: mỗi cầu thủ phòng ngự bám 1 đối thủ.',
      [
        '<b>Phòng ngự kèm người (man-marking)</b>: <code>mỗi cầu thủ phòng ngự được phân công bám sát một đối thủ cụ thể</code>, theo kèm đối thủ đó di chuyển khắp sân.<ul><li>Trách nhiệm theo "người".</li></ul>',
        '<i>Đặc điểm:</i> tạo áp lực trực tiếp, hạn chế đối thủ nhận bóng và xoay xở.<ul><li>Khác hẳn với phòng ngự theo khu vực.</li></ul>',
      ],
      ['Sai — phòng ngự kèm người là có kèm, không phải không kèm.', 'Đúng — mỗi hậu vệ kèm sát một đối thủ cụ thể.', 'Sai — đứng yên không phải kèm người.', 'Sai — kèm khu vực là kiểu phòng ngự khác.']),
    Q('Phòng ngự khu vực?', ['Cả đội dồn về một nửa sân tấn công', 'Không phòng', 'Mỗi cầu thủ phụ trách 1 khu vực, bóng/người vào thì kèm', 'Kèm người'], 2, 'Zone defense: trách nhiệm theo vùng, không theo người.',
      [
        '<b>Phòng ngự khu vực (zone defense)</b>: <code>mỗi cầu thủ phụ trách một khu vực trên sân</code>; ai (hoặc bóng) đi vào vùng đó thì cầu thủ phụ trách kèm.<ul><li>Trách nhiệm theo "vùng", không theo người.</li></ul>',
        '<i>Đặc điểm:</i> giữ được đội hình, các cầu thủ phối hợp bọc lót theo khu vực.<ul><li>Không phải "không phòng" hay dồn cả đội lên tấn công.</li></ul>',
      ],
      ['Sai — không phải dồn cả đội lên tấn công.', 'Sai — phòng ngự khu vực vẫn có phòng ngự.', 'Đúng — mỗi cầu thủ phụ trách một khu vực, ai vào vùng thì kèm.', 'Sai — kèm người là kiểu khác với phòng ngự khu vực.']),
    Q('Ưu điểm phòng ngự khu vực?', ['Giữ đội hình, ít mất sức', 'Dễ bị xé', 'Khó tổ chức', 'Tốn nhiều người'], 0, 'Zone giữ đội hình tốt, ít mất sức chạy theo người.',
      [
        '<b>Ưu điểm phòng ngự khu vực</b>: <code>giữ được đội hình</code> chặt chẽ và <b>ít mất sức</b> hơn vì không phải chạy theo một đối thủ khắp sân.<ul><li>Phù hợp khi cần ổn định và tiết kiệm thể lực.</li></ul>',
        '<i>Nhược điểm (đối lập):</i> dễ bị xé ở khoảng giao vùng nếu phối hợp kém.<ul><li>Đòi hỏi cả đội hiểu nhau và di chuyển đồng bộ.</li></ul>',
      ],
      ['Đúng — giữ đội hình tốt và ít mất sức chạy theo người.', 'Sai — dễ bị xé là nhược điểm, không phải ưu điểm.', 'Sai — khó tổ chức không phải ưu điểm.', 'Sai — tốn nhiều người không phải ưu điểm.']),
    Q('Ưu điểm phòng ngự kèm người?', ['Mất đội hình', 'Áp lực cao, cản trở trực tiếp đối phương', 'Tốn ít sức', 'Giữ đội hình kín, ít di chuyển'], 1, 'Man-marking tạo áp lực, hạn chế đối thủ trực tiếp.',
      [
        '<b>Ưu điểm phòng ngự kèm người</b>: tạo <code>áp lực cao</code>, <b>cản trở trực tiếp</b> đối thủ được kèm, khiến họ khó nhận và xử lý bóng.<ul><li>Hiệu quả khi cần "khoá" một cầu thủ nguy hiểm.</li></ul>',
        '<i>Nhược điểm (đối lập):</i> tốn nhiều sức (chạy theo người), dễ vỡ đội hình khi bị kéo dạt.<ul><li>Bị qua người là lộ khoảng trống ngay.</li></ul>',
      ],
      ['Sai — dễ mất đội hình là nhược điểm.', 'Đúng — tạo áp lực cao và cản trở đối phương trực tiếp.', 'Sai — kèm người tốn nhiều sức.', 'Sai — kèm người di chuyển nhiều, không phải ít.']),
    Q('Phòng ngự hỗn hợp?', ['Không thể', 'Chỉ 1 kiểu', 'Hậu vệ chỉ đứng giữ vị trí, không kèm', 'Kết hợp khu vực + kèm người tuỳ tình huống'], 3, 'Bóng đá hiện đại: hybrid — chủ yếu khu vực nhưng kèm người ở vị trí then chốt.',
      [
        '<b>Phòng ngự hỗn hợp (hybrid)</b>: <code>kết hợp phòng ngự khu vực và kèm người tuỳ tình huống</code> — thường giữ khối khu vực, nhưng cử người kèm sát đối thủ nguy hiểm ở vị trí then chốt.<ul><li>Tận dụng ưu điểm của cả hai kiểu.</li></ul>',
        '<i>Vì sao phổ biến?</i> Bóng đá hiện đại linh hoạt theo đối thủ và thời điểm trận đấu.<ul><li>Không bó cứng vào một kiểu phòng ngự.</li></ul>',
      ],
      ['Sai — phòng ngự hỗn hợp hoàn toàn khả thi.', 'Sai — hỗn hợp là kết hợp nhiều kiểu, không chỉ 1.', 'Sai — hỗn hợp vẫn có kèm người ở vị trí then chốt.', 'Đúng — kết hợp khu vực và kèm người tuỳ tình huống.']),
  ]),

  M(29, 'Kiểm tra giữa kì II — Chạy 800m và bài quyền', [
    Q('Chạy 800m thuộc?', ['Chạy ngắn', 'Marathon', 'Chạy việt dã', 'Chạy bền trung bình'], 3, '800m là cự ly bền trung bình.',
      [
        '<b>Cự ly 800m</b> thuộc nhóm <code>chạy cự ly trung bình (chạy bền trung bình)</code>, cần kết hợp sức bền và tốc độ.<ul><li>Chạy 2 vòng sân điền kinh 400m.</li></ul>',
        '<i>Phân biệt:</i> chạy ngắn 100–400m; marathon 42km; việt dã trên địa hình tự nhiên.<ul><li>800m thường là cự ly kiểm tra sức bền của HS THCS.</li></ul>',
      ],
      ['Sai — chạy ngắn là 100–400m.', 'Sai — marathon dài hơn 42km.', 'Sai — chạy việt dã trên địa hình tự nhiên.', 'Đúng — 800m là cự ly bền trung bình.']),
    Q('Chiến thuật chạy 800m?', ['Tốc độ đều, bứt 200m cuối', 'Bứt tốc 200m đầu rồi chạy chậm dần', 'Hết sức từ đầu', 'Đi bộ xen kẽ chạy nước rút'], 0, 'Tương tự 1500m: phân phối đều, bứt cuối.',
      [
        '<b>Chiến thuật chạy 800m</b>: giữ <code>tốc độ đều</code> ở phần lớn cự ly rồi <b>bứt tốc 200m cuối</b> — tương tự 1500m.<ul><li>Phân phối sức hợp lý quyết định thành tích.</li></ul>',
        '<i>Tránh:</i> bứt đầu rồi chậm dần (đuối cuối), hết sức từ đầu (kiệt sức), đi bộ xen kẽ (không hợp cự ly này).<ul><li>Kiểm soát nhịp độ là kỹ năng cốt lõi.</li></ul>',
      ],
      ['Đúng — giữ tốc độ đều rồi bứt 200m cuối.', 'Sai — bứt đầu rồi chậm dần sẽ đuối ở cuối.', 'Sai — hết sức từ đầu nhanh kiệt sức.', 'Sai — đi bộ xen kẽ không phù hợp cự ly 800m.']),
    Q('Bài quyền yêu cầu?', ['Ngẫu hứng sáng tạo động tác mới', 'Nhớ chuẩn động tác, mạnh dứt khoát, đúng tấn', 'Mềm yếu', 'Thực hiện chậm rãi, mềm mại như múa'], 1, 'Bài quyền chấm điểm: nhớ chuẩn, lực dứt khoát, tấn vững.',
      [
        '<b>Yêu cầu khi thực hiện bài quyền</b>: <code>nhớ chuẩn trình tự động tác</code>, ra đòn <b>mạnh, dứt khoát</b>, và đứng <b>đúng tấn (tấn vững)</b>.<ul><li>Đây là các tiêu chí chấm điểm bài quyền.</li></ul>',
        '<i>Lưu ý:</i> bài quyền theo chuẩn cố định, không ngẫu hứng; đòn thế có lực, không mềm yếu hay "mềm mại như múa".<ul><li>Kết hợp nhịp nhanh – chậm theo đúng bài.</li></ul>',
      ],
      ['Sai — bài quyền theo bài chuẩn, không ngẫu hứng.', 'Đúng — nhớ chuẩn động tác, ra đòn mạnh dứt khoát, tấn vững.', 'Sai — bài quyền cần lực dứt khoát, không mềm yếu.', 'Sai — bài quyền không thực hiện mềm mại như múa.']),
    Q('Đánh giá thể lực HS?', ['Sức nhanh + sức bền + sức mạnh + khéo léo', 'Chỉ dựa vào chiều cao và cân nặng', 'Chỉ sức mạnh', 'Chỉ sức nhanh'], 0, 'Đánh giá đa chiều: chạy 60m (nhanh) + 800m (bền) + bật xa (sức mạnh) + khéo léo.',
      [
        '<b>Đánh giá thể lực HS</b> mang tính <code>đa chiều</code>: <b>sức nhanh</b> (chạy 60m) + <b>sức bền</b> (chạy 800m/1000m) + <b>sức mạnh</b> (bật xa, nằm sấp chống đẩy) + <b>khéo léo</b>.<ul><li>Phản ánh đầy đủ các tố chất vận động.</li></ul>',
        '<i>Vì sao?</i> Một chỉ số đơn lẻ (chỉ sức mạnh, chỉ chiều cao – cân nặng) không phản ánh đủ thể lực toàn diện.<ul><li>Đó là lý do có nhiều test khác nhau.</li></ul>',
      ],
      ['Đúng — đánh giá đa chiều: nhanh, bền, mạnh và khéo léo.', 'Sai — chiều cao cân nặng không đủ đánh giá thể lực.', 'Sai — không chỉ đánh giá sức mạnh.', 'Sai — không chỉ đánh giá sức nhanh.']),
    Q('Trước kiểm tra, cần?', ['Ăn no sát giờ thi để dồi dào năng lượng', 'Thức khuya', 'Tập kiệt sức', 'Ăn nhẹ trước 2h, ngủ đủ, khởi động kỹ'], 3, 'Chuẩn bị: ăn nhẹ, ngủ đủ, khởi động kỹ.',
      [
        '<b>Chuẩn bị trước buổi kiểm tra thể lực</b>: <code>ăn nhẹ trước khoảng 2 giờ</code>, <code>ngủ đủ giấc</code> và <b>khởi động kỹ</b> ngay trước khi thi.<ul><li>Giúp cơ thể sẵn sàng, đạt thành tích tốt và tránh chấn thương.</li></ul>',
        '<i>Tránh:</i> ăn no sát giờ (nặng bụng, khó tiêu), thức khuya, tập kiệt sức ngay trước thi.<ul><li>Nghỉ ngơi và khởi động hợp lý là yếu tố then chốt.</li></ul>',
      ],
      ['Sai — ăn no sát giờ thi gây khó tiêu, nặng bụng.', 'Sai — thức khuya làm giảm thể lực.', 'Sai — tập kiệt sức trước thi khiến mệt mỏi.', 'Đúng — ăn nhẹ trước 2h, ngủ đủ và khởi động kỹ.']),
  ]),

  M(30, 'Bóng rổ — Thi đấu nhóm 3 vs 3', [
    Q('Bóng rổ 3x3 chơi?', ['1 rổ, 3 vs 3, thời gian ngắn', '2 rổ', '5 vs 5', 'Không giới hạn'], 0, '3x3: nhanh, 1 rổ, 10 phút hoặc đến 21 điểm.',
      [
        '<b>Bóng rổ 3x3</b> chơi trên <code>nửa sân với 1 rổ</code>, mỗi đội <b>3 người</b>, thời gian ngắn (10 phút hoặc đến 21 điểm trước).<ul><li>Là môn thi đấu chính thức tại Olympic.</li></ul>',
        '<i>Khác 5x5:</i> bóng rổ thường chơi cả sân, 2 rổ, 5 người mỗi đội.<ul><li>3x3 nhanh, gọn, phù hợp sân trường.</li></ul>',
      ],
      ['Đúng — bóng rổ 3x3 chơi 1 rổ, 3 vs 3, thời gian ngắn.', 'Sai — 3x3 chỉ dùng 1 rổ, không phải 2.', 'Sai — 5 vs 5 là bóng rổ thường, không phải 3x3.', 'Sai — 3x3 có giới hạn rõ về người và điểm.']),
    Q('Lợi ích 3x3 so với 5x5?', ['Ít vận động', 'Nhiều bóng hơn, không gian rộng', 'Khó hơn', 'Không có lợi'], 1, '3x3 mỗi người chạm bóng nhiều, không gian rộng, vận động cao.',
      [
        '<b>Lợi ích của 3x3 so với 5x5</b>: ít người trên sân nên <code>mỗi người được chạm bóng nhiều hơn</code> và <b>không gian rộng hơn</b> để xử lý.<ul><li>Vận động cao, phù hợp tập luyện và làm quen.</li></ul>',
        '<i>Hệ quả:</i> người chơi tiến bộ nhanh vì tham gia trực tiếp nhiều tình huống công – thủ.<ul><li>3x3 dễ tiếp cận hơn, không hẳn khó hơn 5x5.</li></ul>',
      ],
      ['Sai — 3x3 vận động cao hơn, không ít hơn.', 'Đúng — mỗi người chạm bóng nhiều hơn và không gian rộng hơn.', 'Sai — 3x3 không hẳn khó hơn mà dễ tiếp cận hơn.', 'Sai — 3x3 có nhiều lợi ích vận động.']),
    Q('Chiến thuật 3x3?', ['Pick & Roll, give and go', 'Đứng yên', 'Tránh đồng đội', 'Tự đi 1 mình'], 0, 'Pick & Roll (chặn-cuốn) và give-and-go là 2 chiến thuật cơ bản 3x3.',
      [
        '<b>Chiến thuật cơ bản 3x3</b>: <code>Pick & Roll (chặn – cuốn)</code> — một người đặt màn chắn cho đồng đội thoát kèm rồi di chuyển nhận bóng; và <code>give and go</code> — chuyền rồi cắt vào.<ul><li>Phối hợp đơn giản nhưng rất hiệu quả ở sân hẹp.</li></ul>',
        '<i>Vì sao?</i> Ít người nên các pha phối hợp 2 người tạo lợi thế nhanh.<ul><li>Đứng yên, tự đi một mình hay tránh đồng đội đều kém hiệu quả.</li></ul>',
      ],
      ['Đúng — Pick & Roll và give-and-go là chiến thuật cơ bản 3x3.', 'Sai — đứng yên không tạo được lối chơi.', 'Sai — tránh đồng đội làm mất phối hợp.', 'Sai — tự đi một mình không hiệu quả.']),
    Q('Tinh thần đồng đội?', ['Chuyền cho người tốt vị trí, không ích kỷ', 'Tự ném mãi', 'Cá nhân', 'Tránh đồng đội'], 0, 'Bóng rổ là môn đồng đội — chuyền cho người mở.',
      [
        '<b>Tinh thần đồng đội trong bóng rổ</b>: <code>chuyền cho người đang có vị trí tốt (đang trống)</code>, <b>không ích kỷ</b> ôm bóng tự ném.<ul><li>Phối hợp tạo cơ hội ghi điểm cao hơn.</li></ul>',
        '<i>Vì sao?</i> Bóng rổ là môn đồng đội; chia sẻ bóng làm đối phương khó phòng ngự.<ul><li>Tự ném mãi hay chơi cá nhân làm giảm hiệu quả cả đội.</li></ul>',
      ],
      ['Đúng — chuyền cho người có vị trí tốt, không ích kỷ.', 'Sai — tự ném mãi là ích kỷ.', 'Sai — chơi cá nhân trái tinh thần đồng đội.', 'Sai — tránh đồng đội làm mất phối hợp.']),
    Q('Sau trận đấu?', ['Cãi vã', 'Bắt tay, chúc mừng đối thủ', 'Không bắt tay', 'Rời sân ngay khi kết thúc, không chào trọng tài'], 1, 'Truyền thống thể thao: bắt tay cả thắng lẫn thua.',
      [
        '<b>Sau trận đấu</b>: theo truyền thống thể thao, hai đội <code>bắt tay và chúc mừng đối thủ</code>, cảm ơn trọng tài — dù thắng hay thua.<ul><li>Thể hiện tinh thần fair-play và tôn trọng.</li></ul>',
        '<i>Tránh:</i> cãi vã, không bắt tay, rời sân ngay không chào trọng tài — đều thiếu văn hoá thể thao.<ul><li>Kết thúc đẹp quan trọng như chính trận đấu.</li></ul>',
      ],
      ['Sai — cãi vã trái tinh thần thể thao.', 'Đúng — bắt tay và chúc mừng đối thủ.', 'Sai — nên bắt tay đối thủ sau trận.', 'Sai — nên chào trọng tài, không rời sân vội.']),
  ]),

  M(31, 'Đi bộ thể thao — Race walking', [
    Q('Đi bộ thể thao khác chạy ở?', ['Đi đều', 'Luôn có 1 chân chạm đất, chân trước thẳng khi chạm', 'Không khác', 'Đi chậm hơn'], 1, 'Race walking: 1 chân chạm đất liên tục + chân trước phải thẳng từ lúc chạm đến khi qua trục thẳng đứng.',
      [
        '<b>Đi bộ thể thao (race walking)</b> khác chạy ở hai quy định kỹ thuật bắt buộc: <code>luôn có ít nhất 1 chân chạm đất</code> (không có pha bay) và <code>chân trước phải duỗi thẳng</code> từ lúc chạm đất đến khi qua trục thẳng đứng của cơ thể.<ul><li>Là môn điền kinh có luật rất khắt khe.</li></ul>',
        '<i>Phân biệt với chạy:</i> chạy có pha "bay" (cả hai chân rời đất) và gối chân trước cong khi tiếp đất.<ul><li>Khác biệt là quy định kỹ thuật, không chỉ là "đi chậm hơn".</li></ul>',
      ],
      ['Sai — "đi đều" chưa nêu đặc điểm luật của đi bộ thể thao.', 'Đúng — luôn có 1 chân chạm đất và chân trước thẳng khi chạm.', 'Sai — đi bộ thể thao khác chạy ở quy định kỹ thuật.', 'Sai — khác biệt là quy định kỹ thuật, không chỉ là chậm hơn.']),
    Q('Vi phạm luật đi bộ?', ['Vung tay', 'Đi dài bước', '"Bay" (loss of contact) hoặc chân trước gập', 'Đi chậm'], 2, '2 lỗi chính: bay (cả 2 chân rời đất) hoặc chân trước gập gối.',
      [
        '<b>Hai lỗi vi phạm luật đi bộ thể thao</b>: <code>"bay" (loss of contact)</code> — cả hai chân cùng rời đất; và <code>chân trước gập gối</code> khi tiếp đất (không duỗi thẳng).<ul><li>Trọng tài giám sát và cảnh cáo, đủ 3 lỗi bị loại.</li></ul>',
        '<i>Đúng kỹ thuật:</i> giữ tiếp xúc đất liên tục và khoá thẳng gối chân trước.<ul><li>Vung tay, đi dài bước hay đi chậm không phải lỗi nếu giữ đúng luật.</li></ul>',
      ],
      ['Sai — vung tay là động tác bình thường.', 'Sai — đi dài bước không phải lỗi nếu giữ đúng luật.', 'Đúng — "bay" (mất tiếp xúc) hoặc chân trước gập gối là phạm luật.', 'Sai — đi chậm không phải lỗi.']),
    Q('Cự ly đi bộ phổ biến?', ['100m', '20km, 50km (Olympic)', '500m', '1km'], 1, 'Olympic: 20km nam-nữ, 50km nam (trước 2024).',
      [
        '<b>Cự ly đi bộ thể thao phổ biến</b> ở cấp Olympic là <code>20km</code> (nam và nữ) và <code>50km</code> (nam, đến trước 2024).<ul><li>Là môn thi đường trường, đòi hỏi sức bền lớn.</li></ul>',
        '<i>Đối chiếu:</i> 100m, 500m, 1km quá ngắn so với cự ly thi đấu đi bộ chuẩn.<ul><li>HS thường tập cự ly ngắn hơn để làm quen kỹ thuật.</li></ul>',
      ],
      ['Sai — 100m quá ngắn cho đi bộ thể thao.', 'Đúng — 20km và 50km là cự ly Olympic.', 'Sai — 500m không phải cự ly đi bộ thi đấu phổ biến.', 'Sai — 1km quá ngắn so với cự ly thi đấu chuẩn.']),
    Q('Đi bộ thể thao rèn?', ['Sức bền, kỹ thuật, tâm lý', 'Không rèn', 'Chỉ sức mạnh', 'Chỉ tốc độ'], 0, 'Race walking: bền + kỹ thuật rất khắt khe + tâm lý kiểm soát tốc độ.',
      [
        '<b>Đi bộ thể thao rèn</b> nhiều mặt: <code>sức bền</code> (cự ly dài), <code>kỹ thuật</code> (giữ đúng luật rất khắt khe) và <code>tâm lý</code> (kiểm soát tốc độ, kiên trì).<ul><li>Phải vừa nhanh vừa giữ kỹ thuật đúng luật.</li></ul>',
        '<i>Đặc thù:</i> khác các môn chỉ cần nhanh hay mạnh, đi bộ thể thao đòi hỏi sự chính xác kỹ thuật bền bỉ.<ul><li>Rèn tổng hợp chứ không riêng sức mạnh hay tốc độ.</li></ul>',
      ],
      ['Đúng — đi bộ thể thao rèn sức bền, kỹ thuật và tâm lý.', 'Sai — đi bộ thể thao rèn nhiều tố chất.', 'Sai — không chỉ rèn sức mạnh.', 'Sai — không chỉ rèn tốc độ.']),
    Q('HS THCS có thể tập đi bộ?', ['Chỉ người lớn', 'Có — phù hợp tất cả lứa tuổi, an toàn', 'Chỉ VĐV', 'Chỉ phù hợp người cao tuổi, không hợp HS'], 1, 'Đi bộ rất phù hợp HS — ít chấn thương, rèn bền tốt.',
      [
        '<b>HS THCS hoàn toàn có thể tập đi bộ</b>: đi bộ <code>phù hợp mọi lứa tuổi</code>, <b>ít va chạm, ít nguy cơ chấn thương</b>, rèn sức bền rất tốt.<ul><li>Là cách vận động an toàn, dễ duy trì.</li></ul>',
        '<i>Lợi ích:</i> rèn tim – phổi, tạo thói quen vận động lành mạnh suốt đời.<ul><li>Không riêng người lớn, VĐV hay người cao tuổi.</li></ul>',
      ],
      ['Sai — không chỉ người lớn mới tập được.', 'Đúng — đi bộ phù hợp mọi lứa tuổi và an toàn.', 'Sai — không chỉ dành cho VĐV.', 'Sai — đi bộ rất hợp với HS, không riêng người cao tuổi.']),
  ]),

  M(32, 'Trò chơi dân gian — Kéo co, đẩy gậy', [
    Q('Kéo co là trò chơi?', ['Hiện đại', 'Nước ngoài', 'Cờ vua', 'Dân gian VN, 2 đội kéo dây ngược chiều'], 3, 'Kéo co là trò chơi dân gian phổ biến ở VN, được UNESCO công nhận.',
      [
        '<b>Kéo co</b> là trò chơi <code>dân gian truyền thống Việt Nam</code>: hai đội nắm hai đầu một sợi dây, <b>kéo ngược chiều nhau</b>, đội nào kéo được vạch mốc về phía mình thì thắng.<ul><li>Nghi lễ kéo co đã được UNESCO ghi danh di sản văn hoá phi vật thể.</li></ul>',
        '<i>Đặc điểm:</i> rèn sức mạnh, phối hợp và tinh thần đồng đội.<ul><li>Không phải trò hiện đại, của nước ngoài hay trò trí tuệ như cờ vua.</li></ul>',
      ],
      ['Sai — kéo co là trò chơi dân gian truyền thống, không phải hiện đại.', 'Sai — kéo co rất phổ biến ở VN.', 'Sai — cờ vua là trò trí tuệ, khác kéo co.', 'Đúng — kéo co là trò chơi dân gian VN, 2 đội kéo dây ngược chiều.']),
    Q('Kỹ thuật kéo co?', ['Cúi gập', 'Trùng gối thấp, lưng thẳng, tay nắm dây cao', 'Đứng thẳng', 'Đứng thẳng, kéo dây bằng sức tay là chính'], 1, 'Tư thế: trùng gối thấp (dùng lực chân), lưng thẳng, kéo dây ngang vai.',
      [
        '<b>Kỹ thuật kéo co</b>: <code>trùng gối hạ thấp trọng tâm</code> (dùng lực chân và thân), <b>lưng thẳng</b> ngả nhẹ ra sau, hai tay nắm chắc dây.<ul><li>Cả đội kéo đồng loạt theo nhịp hô.</li></ul>',
        '<i>Vì sao?</i> Dùng lực chân – thân mạnh và an toàn hơn nhiều so với chỉ kéo bằng sức tay.<ul><li>Cúi gập dễ đau lưng; đứng thẳng làm mất lực.</li></ul>',
      ],
      ['Sai — cúi gập dễ đau lưng và mất lực.', 'Đúng — trùng gối thấp, lưng thẳng, dùng lực chân để kéo.', 'Sai — đứng thẳng làm mất lực kéo.', 'Sai — kéo co dùng lực chân và thân, không chỉ sức tay.']),
    Q('Đẩy gậy là?', ['Đá bóng', 'Đua chạy có cầm gậy tiếp sức', 'Đánh gậy vào quả cầu gỗ ghi điểm', 'Trò chơi 2 người dùng gậy đẩy nhau khỏi vòng'], 3, 'Đẩy gậy: 2 người cầm 2 đầu 1 gậy, đẩy đối thủ ra khỏi vòng tròn.',
      [
        '<b>Đẩy gậy</b> là môn thể thao dân tộc: <code>hai người cầm hai đầu một cây gậy</code>, dùng sức và kỹ thuật <b>đẩy đối thủ ra khỏi vòng tròn</b> quy định thì thắng.<ul><li>Phổ biến trong các lễ hội và hội thi thể thao dân tộc.</li></ul>',
        '<i>Đặc điểm:</i> rèn sức mạnh, thế tấn vững và sự khéo léo.<ul><li>Không phải đá bóng, chạy tiếp sức hay đánh cầu gỗ.</li></ul>',
      ],
      ['Sai — đẩy gậy không liên quan đến đá bóng.', 'Sai — đó là chạy tiếp sức, không phải đẩy gậy.', 'Sai — đó là môn khác, không phải đẩy gậy.', 'Đúng — 2 người cầm 2 đầu gậy, đẩy đối thủ ra khỏi vòng.']),
    Q('Lợi ích trò chơi dân gian?', ['Chỉ giúp giải trí, không có giá trị thể chất', 'Mất thời gian', 'Phát triển sức mạnh, đồng đội, giữ văn hoá', 'Lạc hậu'], 2, 'Trò chơi dân gian rèn thể chất + đồng đội + lưu giữ văn hoá truyền thống.',
      [
        '<b>Lợi ích của trò chơi dân gian</b>: phát triển <code>sức mạnh, thể chất</code>, rèn <b>tinh thần đồng đội</b> và <b>giữ gìn văn hoá truyền thống</b> dân tộc.<ul><li>Vừa khoẻ người vừa bồi đắp bản sắc.</li></ul>',
        '<i>Quan điểm đúng:</i> trò chơi dân gian không lạc hậu mà còn được trân trọng, đưa vào trường học và lễ hội.<ul><li>Có giá trị thể chất rõ rệt, không chỉ giải trí.</li></ul>',
      ],
      ['Sai — trò chơi dân gian có giá trị thể chất rõ rệt.', 'Sai — không lãng phí mà rất bổ ích.', 'Đúng — phát triển sức mạnh, đồng đội và giữ gìn văn hoá.', 'Sai — trò chơi dân gian không lạc hậu mà còn được trân trọng.']),
    Q('Tinh thần khi chơi?', ['Vui vẻ, fair-play, không ăn thua', 'Gian lận', 'Thắng bằng mọi giá', 'Lừa dối'], 0, 'Trò chơi dân gian đề cao vui và đồng đội hơn thắng-thua.',
      [
        '<b>Tinh thần khi chơi trò chơi dân gian</b>: <code>vui vẻ</code>, <b>fair-play</b>, đề cao sự gắn kết và niềm vui chung hơn là <b>nặng nề ăn thua</b>.<ul><li>Mục tiêu chính là rèn luyện và đoàn kết.</li></ul>',
        '<i>Tránh:</i> gian lận, lừa dối, thắng bằng mọi giá — đều trái với tinh thần đẹp của trò chơi.<ul><li>Chơi đẹp quan trọng hơn kết quả.</li></ul>',
      ],
      ['Đúng — vui vẻ, fair-play và không nặng ăn thua.', 'Sai — gian lận trái tinh thần trò chơi.', 'Sai — thắng bằng mọi giá không phải tinh thần đẹp.', 'Sai — lừa dối là sai trong mọi trò chơi.']),
  ]),

  M(33, 'Dinh dưỡng và phục hồi cho thể thao', [
    Q('Trước khi tập 1–2 giờ nên ăn?', ['Nhịn ăn', 'Carb (cơm, mì, bánh mì) + ít protein', 'Ăn nhiều protein và mỡ động vật', 'Đồ chiên'], 1, 'Trước tập: carb để có năng lượng + ít protein, tránh đồ khó tiêu.',
      [
        '<b>Ăn trước khi tập 1–2 giờ</b>: ưu tiên <code>tinh bột (carb)</code> như cơm, mì, bánh mì để cung cấp năng lượng, kèm <b>một ít protein</b>; chọn món dễ tiêu.<ul><li>Carb là "nhiên liệu" chính cho vận động.</li></ul>',
        '<i>Tránh:</i> nhịn ăn (thiếu năng lượng), ăn nhiều protein – mỡ động vật hoặc đồ chiên (khó tiêu, nặng bụng).<ul><li>Ăn quá no sát giờ tập gây khó chịu.</li></ul>',
      ],
      ['Sai — nhịn ăn khiến thiếu năng lượng khi tập.', 'Đúng — carb cho năng lượng kèm ít protein, dễ tiêu.', 'Sai — nhiều protein và mỡ khó tiêu, gây nặng bụng.', 'Sai — đồ chiên khó tiêu, không tốt trước tập.']),
    Q('Trong khi tập?', ['Không uống', 'Uống nước ngọt', 'Uống nhiều một lúc', 'Uống nước đều đặn, ngụm nhỏ'], 3, 'Uống nước đều đặn từng ngụm nhỏ để bù mất nước.',
      [
        '<b>Uống nước trong khi tập</b>: <code>uống đều đặn từng ngụm nhỏ</code> để bù lượng nước mất qua mồ hôi, tránh mất nước.<ul><li>Duy trì đủ nước giúp giữ sức và điều hoà thân nhiệt.</li></ul>',
        '<i>Tránh:</i> không uống (mất nước), nước ngọt (nhiều đường), hay uống nhiều một lúc (nặng bụng, xóc).<ul><li>Chia nhỏ lượng nước là cách hợp lý.</li></ul>',
      ],
      ['Sai — không uống dễ mất nước.', 'Sai — nước ngọt không tốt khi đang tập.', 'Sai — uống nhiều một lúc gây nặng bụng, khó tập.', 'Đúng — uống nước đều đặn từng ngụm nhỏ.']),
    Q('Sau tập, ăn?', ['Không ăn', 'Đồ ăn nhanh', 'Chỉ đường', 'Carb + protein trong 30–60 phút (cửa sổ vàng)'], 3, 'Cửa sổ 30–60 phút sau tập là tốt nhất để phục hồi: carb + protein.',
      [
        '<b>Ăn sau khi tập</b>: nên bổ sung <code>carb + protein trong vòng 30–60 phút</code> ("cửa sổ vàng") để cơ thể <b>phục hồi năng lượng và tái tạo cơ</b>.<ul><li>Carb nạp lại glycogen, protein sửa chữa cơ.</li></ul>',
        '<i>Tránh:</i> bỏ ăn (phục hồi chậm), đồ ăn nhanh (nhiều dầu mỡ), chỉ ăn đường (thiếu protein).<ul><li>Bữa cân đối giúp tiến bộ thể lực tốt hơn.</li></ul>',
      ],
      ['Sai — bỏ ăn làm cơ thể phục hồi chậm.', 'Sai — đồ ăn nhanh không tốt cho phục hồi.', 'Sai — chỉ đường thì thiếu protein để phục hồi cơ.', 'Đúng — carb kèm protein trong 30–60 phút (cửa sổ vàng).']),
    Q('Nước uống cho thể thao?', ['Nước ngọt', 'Nước có cồn', 'Nước lọc; nước điện giải với tập dài >1h', 'Cà phê'], 2, 'Nước lọc đủ với hầu hết buổi tập; tập >1h hoặc nắng nóng cần thêm điện giải.',
      [
        '<b>Nước uống cho thể thao</b>: <code>nước lọc</code> là đủ cho hầu hết buổi tập; chỉ khi <b>tập kéo dài trên 1 giờ</b> hoặc trời nắng nóng, ra nhiều mồ hôi mới cần bổ sung <b>nước điện giải</b>.<ul><li>Điện giải bù natri, kali mất qua mồ hôi.</li></ul>',
        '<i>Tránh:</i> nước ngọt (nhiều đường), nước có cồn (cấm với HS, gây hại), cà phê (lợi tiểu, không hợp để bù nước).<ul><li>Ưu tiên nước lọc trong sinh hoạt hằng ngày.</li></ul>',
      ],
      ['Sai — nước ngọt nhiều đường, không lý tưởng.', 'Sai — nước có cồn cấm với HS và có hại.', 'Đúng — nước lọc là chính, thêm điện giải khi tập dài hơn 1h.', 'Sai — cà phê không phù hợp để bù nước cho HS.']),
    Q('Ngủ và phục hồi?', ['Càng ít càng tốt', 'Ngủ ít vẫn ổn', 'Ngủ đủ 8–10h cho HS, cơ phục hồi khi ngủ', '4–5h là đủ'], 2, 'HS THCS cần 8–10h ngủ, cơ thể phục hồi và phát triển khi ngủ sâu.',
      [
        '<b>Ngủ và phục hồi</b>: HS THCS cần ngủ <code>đủ 8–10 giờ/đêm</code>; cơ bắp và cơ thể <b>phục hồi và phát triển mạnh khi ngủ sâu</b> (tiết hormone tăng trưởng).<ul><li>Ngủ đủ giúp tập hiệu quả và phát triển chiều cao.</li></ul>',
        '<i>Tác hại thiếu ngủ:</i> phục hồi kém, giảm thể lực, mất tập trung.<ul><li>4–5h là không đủ cho lứa tuổi đang phát triển.</li></ul>',
      ],
      ['Sai — ngủ quá ít gây hại cho phục hồi.', 'Sai — ngủ ít làm cơ thể khó phục hồi.', 'Đúng — HS cần ngủ đủ 8–10h, cơ phục hồi khi ngủ.', 'Sai — 4–5h không đủ cho HS đang phát triển.']),
  ]),

  M(34, 'Lập kế hoạch luyện tập cá nhân', [
    Q('Kế hoạch luyện tập cần?', ['Tập tuỳ ý', 'Tập khi nào có hứng, không cần lịch', 'Sao chép người khác', 'Mục tiêu cụ thể, lịch trình, đánh giá'], 3, 'Kế hoạch tốt: SMART goal + lịch trình + đánh giá định kỳ.',
      [
        '<b>Một kế hoạch luyện tập tốt</b> cần có: <code>mục tiêu cụ thể (SMART)</code>, <code>lịch trình tập rõ ràng</code> và <b>đánh giá định kỳ</b> để điều chỉnh.<ul><li>Có kế hoạch giúp tập đều và tiến bộ rõ.</li></ul>',
        '<i>Tránh:</i> tập tuỳ ý, chờ "có hứng", hay sao chép kế hoạch của người khác mà không phù hợp với bản thân.<ul><li>Kế hoạch phải dựa trên thể trạng và mục tiêu riêng.</li></ul>',
      ],
      ['Sai — tập tuỳ ý thiếu mục tiêu và hiệu quả.', 'Sai — chờ có hứng dễ bỏ tập, không đều đặn.', 'Sai — sao chép người khác không hợp với mình.', 'Đúng — cần mục tiêu cụ thể, lịch trình và đánh giá định kỳ.']),
    Q('SMART là?', ['Strong-Move', 'Sport, Muscle, Active, Run, Train', 'Specific, Measurable, Achievable, Relevant, Time-bound', 'Speed, Mass…'], 2, 'SMART: cụ thể, đo được, khả thi, liên quan, có thời hạn.',
      [
        '<b>Nguyên tắc SMART</b> đặt mục tiêu: <code>S</code>pecific (cụ thể), <code>M</code>easurable (đo được), <code>A</code>chievable (khả thi), <code>R</code>elevant (liên quan), <code>T</code>ime-bound (có thời hạn).<ul><li>Ví dụ: "Sau 8 tuần chạy được 1km dưới 5 phút".</li></ul>',
        '<i>Vì sao?</i> Mục tiêu SMART rõ ràng, dễ theo dõi và tạo động lực hơn mục tiêu mơ hồ.<ul><li>Giúp lập kế hoạch và đánh giá tiến bộ chính xác.</li></ul>',
      ],
      ['Sai — đây không phải nội dung SMART.', 'Sai — các từ này không khớp SMART.', 'Đúng — SMART là Specific, Measurable, Achievable, Relevant, Time-bound.', 'Sai — đây không phải nghĩa của SMART.']),
    Q('Tần suất tập phù hợp HS?', ['3–5 buổi/tuần, mỗi buổi 45–60 phút', 'Mỗi ngày 5h', '1 buổi/tháng', 'Không tập'], 0, 'WHO khuyến cáo: hoạt động thể chất 60 phút/ngày, ít nhất 3–5 buổi rèn luyện chính.',
      [
        '<b>Tần suất tập phù hợp HS</b>: khoảng <code>3–5 buổi rèn luyện chính/tuần</code>, mỗi buổi <b>45–60 phút</b>.<ul><li>WHO khuyến cáo trẻ vận động ~60 phút/ngày ở cường độ vừa – mạnh.</li></ul>',
        '<i>Vì sao không cực đoan?</i> Tập 5h/ngày quá sức, dễ chấn thương; 1 buổi/tháng hay không tập thì không có hiệu quả.<ul><li>Đều đặn và vừa sức là nguyên tắc cốt lõi.</li></ul>',
      ],
      ['Đúng — 3–5 buổi/tuần, mỗi buổi 45–60 phút là hợp lý.', 'Sai — 5h mỗi ngày quá sức với HS.', 'Sai — 1 buổi/tháng quá ít để có hiệu quả.', 'Sai — không tập thì không cải thiện thể lực.']),
    Q('Nguyên tắc tăng tải?', ['Tăng ngẫu nhiên', 'Tăng 100% ngay', 'Không tăng', 'Tăng dần (10% mỗi tuần)'], 3, 'Tăng tải từ từ (~10%/tuần) để cơ thể thích nghi, tránh chấn thương.',
      [
        '<b>Nguyên tắc tăng tải</b> (tăng tiến dần): tăng khối lượng/cường độ tập <code>từ từ, khoảng 10% mỗi tuần</code>, để cơ thể kịp <b>thích nghi</b> và tránh chấn thương.<ul><li>Còn gọi là "quy tắc 10%".</li></ul>',
        '<i>Vì sao?</i> Tăng đột ngột 100% rất dễ chấn thương; không tăng thì cơ thể không tiến bộ.<ul><li>Tăng tiến hợp lý là chìa khoá rèn luyện bền vững.</li></ul>',
      ],
      ['Sai — tăng ngẫu nhiên dễ quá sức hoặc kém hiệu quả.', 'Sai — tăng 100% ngay rất dễ chấn thương.', 'Sai — không tăng thì cơ thể không tiến bộ.', 'Đúng — tăng dần khoảng 10% mỗi tuần để cơ thể thích nghi.']),
    Q('Đánh giá tiến bộ qua?', ['Không cần đánh giá', 'Hỏi bạn', 'Nhìn gương', 'Đo định kỳ: chạy 60m, 1km, hít xà, bật xa'], 3, 'Đo định kỳ các test chuẩn để theo dõi tiến bộ khách quan.',
      [
        '<b>Đánh giá tiến bộ</b>: <code>đo định kỳ các test thể lực chuẩn</code> như chạy 60m (nhanh), chạy 1km (bền), hít xà (sức mạnh tay), bật xa (sức mạnh chân).<ul><li>So sánh số liệu qua các mốc thời gian.</li></ul>',
        '<i>Vì sao?</i> Số đo khách quan cho thấy chính xác mình tiến bộ ra sao, làm cơ sở điều chỉnh kế hoạch.<ul><li>Hỏi bạn hay nhìn gương đều không khách quan.</li></ul>',
      ],
      ['Sai — cần đánh giá để biết tiến bộ.', 'Sai — hỏi bạn không khách quan.', 'Sai — nhìn gương không đo được thể lực.', 'Đúng — đo định kỳ các test như chạy 60m, 1km, hít xà, bật xa.']),
  ]),

  M(35, 'Tổng kết và biểu diễn cuối năm', [
    Q('Mục tiêu GDTC THCS?', ['Chỉ vô địch', 'Phát triển toàn diện thể chất, tinh thần, kỹ năng', 'Chỉ tiêu khiển', 'Chỉ vui chơi'], 1, 'GDTC phát triển toàn diện, không chỉ thi đấu thành tích.',
      [
        '<b>Mục tiêu Giáo dục thể chất THCS</b> (GDPT 2018): <code>phát triển toàn diện</code> về <b>thể chất, tinh thần và kỹ năng vận động</b>, hình thành thói quen rèn luyện và lối sống lành mạnh.<ul><li>Không chỉ nhằm thi đấu giành thành tích.</li></ul>',
        '<i>Trọng tâm:</i> hình thành năng lực chăm sóc sức khoẻ và phẩm chất (kiên trì, trung thực, đồng đội).<ul><li>Không phải chỉ để vô địch, tiêu khiển hay vui chơi đơn thuần.</li></ul>',
      ],
      ['Sai — GDTC không chỉ nhằm vô địch.', 'Đúng — phát triển toàn diện thể chất, tinh thần và kỹ năng.', 'Sai — GDTC không chỉ để tiêu khiển.', 'Sai — GDTC không chỉ là vui chơi mà còn rèn luyện toàn diện.']),
    Q('Test thể lực HS THCS cuối năm?', ['Chỉ nhảy', 'Không có test', 'Chỉ chạy 100m', 'Chạy 60m, chạy bền 800m/1000m, bật xa, hít xà, nằm sấp chống đẩy'], 3, 'Test chuẩn đánh giá: sức nhanh, bền, mạnh, mềm dẻo, sức chịu đựng.',
      [
        '<b>Hệ thống test thể lực HS THCS cuối năm</b> gồm nhiều nội dung: <code>chạy 60m</code> (sức nhanh), <code>chạy bền 800m/1000m</code> (sức bền), <code>bật xa tại chỗ</code> (sức mạnh chân), <code>hít xà / nằm sấp chống đẩy</code> (sức mạnh tay).<ul><li>Đánh giá đa dạng các tố chất.</li></ul>',
        '<i>Vì sao nhiều test?</i> Mỗi test đo một tố chất khác nhau → phản ánh thể lực toàn diện.<ul><li>Chỉ một bài (chỉ nhảy, chỉ 100m) không đủ.</li></ul>',
      ],
      ['Sai — không chỉ test nhảy.', 'Sai — có hệ thống test thể lực cuối năm.', 'Sai — không chỉ chạy 100m.', 'Đúng — gồm chạy 60m, chạy bền, bật xa, hít xà, chống đẩy.']),
    Q('Tập thể dục đều đặn giúp?', ['Cải thiện sức khoẻ + học tập + tinh thần', 'Chỉ tốt khi vô địch', 'Mất thời gian', 'Không có lợi'], 0, 'Nghiên cứu: tập thể dục cải thiện trí nhớ, tập trung, tâm trạng và giấc ngủ.',
      [
        '<b>Tập thể dục đều đặn</b> mang lại lợi ích toàn diện: <code>cải thiện sức khoẻ thể chất</code>, <code>hỗ trợ học tập</code> (trí nhớ, tập trung) và <b>nâng cao tinh thần</b> (tâm trạng, giấc ngủ).<ul><li>Cơ thể khoẻ là nền tảng cho mọi hoạt động.</li></ul>',
        '<i>Vì sao?</i> Vận động tăng tuần hoàn não và tiết endorphin — chất "hạnh phúc" tự nhiên.<ul><li>Lợi ích có với tất cả mọi người, không phụ thuộc thắng – thua.</li></ul>',
      ],
      ['Đúng — tập đều đặn cải thiện sức khoẻ, học tập và tinh thần.', 'Sai — lợi ích không phụ thuộc vào việc vô địch.', 'Sai — tập thể dục rất bổ ích, không lãng phí.', 'Sai — tập thể dục có nhiều lợi ích.']),
    Q('Sau khi rời trường, nên?', ['Khi nào thích', 'Duy trì thói quen vận động suốt đời', 'Chỉ khi có thời gian', 'Bỏ tập'], 1, 'GDTC tạo thói quen vận động suốt đời — chìa khoá sức khoẻ dài hạn.',
      [
        '<b>Sau khi rời trường</b>: nên <code>duy trì thói quen vận động suốt đời</code> — đây chính là mục tiêu sâu xa của GDTC.<ul><li>Vận động đều là chìa khoá sức khoẻ dài hạn.</li></ul>',
        '<i>Vì sao?</i> Sức khoẻ cần được rèn luyện liên tục, không phải chỉ khi còn đi học hay khi rảnh.<ul><li>Bỏ tập làm thể lực giảm sút theo thời gian.</li></ul>',
      ],
      ['Sai — vận động cần đều đặn, không chỉ khi thích.', 'Đúng — duy trì thói quen vận động suốt đời.', 'Sai — nên ưu tiên vận động đều, không chỉ lúc rảnh.', 'Sai — bỏ tập làm sức khoẻ giảm sút.']),
    Q('Tinh thần thể thao đẹp?', ['Fair-play, kiên trì, đồng đội, tôn trọng', 'Cá nhân', 'Ăn thua đủ', 'Khoe khoang'], 0, 'Tinh thần thể thao: fair-play, kiên trì, đồng đội, tôn trọng — giá trị cốt lõi.',
      [
        '<b>Tinh thần thể thao đẹp</b> gồm các giá trị cốt lõi: <code>fair-play (trung thực, cao thượng)</code>, <code>kiên trì</code>, <b>tinh thần đồng đội</b> và <b>tôn trọng</b> đối thủ – trọng tài – luật chơi.<ul><li>Đây là phẩm chất mà GDTC bồi đắp.</li></ul>',
        '<i>Trái với tinh thần đẹp:</i> chơi cá nhân ích kỷ, ăn thua đủ, khoe khoang.<ul><li>Giá trị con người quan trọng hơn kết quả thắng – thua.</li></ul>',
      ],
      ['Đúng — fair-play, kiên trì, đồng đội và tôn trọng là tinh thần đẹp.', 'Sai — chỉ cá nhân thiếu tinh thần đồng đội.', 'Sai — ăn thua đủ không phải tinh thần đẹp.', 'Sai — khoe khoang là thiếu tôn trọng.']),
  ]),

  M(36, 'Kết thúc GDTC 8 — Thể chất khoẻ mạnh, tinh thần vững vàng', [
    Q('Chữ viết tắt R-I-C-E trong sơ cứu chấn thương thể thao có nghĩa là gì?',
      ['Run - Impact - Climb - Exercise', 'Rest - Ice - Compression - Elevation', 'Relax - Inhale - Continue - Endure', 'Rub - Include - Care - Eat'],
      1,
      'R-I-C-E = Rest (nghỉ) - Ice (chườm lạnh) - Compression (băng ép) - Elevation (nâng cao).',
      ['R-I-C-E là quy trình sơ cứu chuẩn cho <b>bong gân, căng cơ, chấn thương phần mềm</b> — rất dễ gặp khi chơi bóng.',
       '<ul><li><b>R – Rest</b> (nghỉ ngơi): dừng hoạt động ngay, tránh đặt trọng lực lên chỗ bị thương</li><li><b>I – Ice</b> (chườm lạnh): đá bọc trong khăn, <i>không đặt thẳng lên da</i>, 15–20 phút mỗi 2 giờ trong 48 h đầu</li><li><b>C – Compression</b> (băng ép): băng vừa đủ chặt để giảm sưng, không quá chặt</li><li><b>E – Elevation</b> (nâng cao): gác chỗ bị thương <b>cao hơn tim</b> khi nằm hoặc ngồi</li></ul>',
       'Nếu đau dữ dội hoặc không đi lại được sau 24 giờ thì <b>phải đến bác sĩ</b> chụp X-quang kiểm tra gãy xương.'],
      ['Sai — không có quy trình sơ cứu nào như vậy.',
       'Đúng — Rest, Ice, Compression, Elevation.',
       'Sai — "chịu đau tiếp tục tập" là cách xử lí sai, dễ làm chấn thương nặng hơn.',
       'Sai — đây không phải nội dung của R-I-C-E.']),
    Q('Một học sinh cao 1,60 m, nặng 64 kg. Chỉ số BMI và phân loại là?',
      ['BMI = 20, bình thường', 'BMI = 40, béo phì', 'BMI = 22,5, bình thường', 'BMI = 25, thừa cân'],
      3,
      'BMI = 64 / 1,60² = 64 / 2,56 = 25 → mức thừa cân (25–29,9).',
      ['Công thức: <b>BMI = cân nặng (kg) ÷ [chiều cao (m)]²</b>. Chú ý chiều cao phải tính bằng <i>mét</i>, và phải <b>bình phương</b>.',
       'Thay số: BMI = 64 ÷ 1,60² = 64 ÷ 2,56 = <b>25</b>.',
       'Thang phân loại:<ul><li>&lt; 18,5 — thiếu cân</li><li>18,5 – 24,9 — bình thường</li><li><b>25 – 29,9 — thừa cân</b></li><li>≥ 30 — béo phì</li></ul>Với học sinh đang tuổi phát triển, BMI chỉ là một chỉ báo tham khảo; cần xem cùng chiều cao, tuổi và mức vận động.'],
      ['Sai — nhầm khi chia cho chiều cao chưa bình phương sai cách.',
       'Sai — chia cho 1,6 thay vì 1,6² sẽ ra số quá lớn.',
       'Sai — đó là BMI nếu nặng khoảng 57,6 kg.',
       'Đúng — BMI = 25, thuộc mức thừa cân.']),
    Q('Vì sao khởi động trước khi tập là bắt buộc?',
      ['Vì làm ấm cơ, tăng máu tới cơ, tăng dần nhịp tim và giúp tập trung — giảm nguy cơ chấn thương', 'Vì để cho hết thời gian tiết học', 'Vì giúp giảm cân nhanh hơn', 'Vì bắt buộc theo luật thi đấu'],
      0,
      'Khởi động làm ấm cơ, tăng lưu lượng máu và nhịp tim dần, nhờ đó giảm nguy cơ chấn thương.',
      ['Bỏ khởi động là <b>nguyên nhân số một</b> gây chấn thương thể thao ở học sinh.',
       'Khởi động 5–10 phút giúp:<ul><li><b>tăng nhiệt độ cơ bắp</b> — cơ ấm co duỗi linh hoạt, giảm nguy cơ căng và rách cơ</li><li><b>tăng lưu lượng máu</b> đến cơ — cung cấp O₂ và dưỡng chất kịp thời</li><li><b>tăng nhịp tim và hô hấp từ từ</b> — tránh sốc tim đột ngột</li><li><b>chuẩn bị tâm lí</b> — tập trung và phối hợp thần kinh - cơ tốt hơn</li></ul>',
       'Cuối buổi tập cần <b>hồi tĩnh</b> (giãn cơ, đi bộ nhẹ) để nhịp tim về bình thường và cơ phục hồi nhanh hơn.'],
      ['Đúng — đó là bốn tác dụng chính của khởi động.',
       'Sai — khởi động có tác dụng sinh lí thật sự, không phải để lấp thời gian.',
       'Sai — giảm cân phụ thuộc vào cả buổi tập và chế độ ăn.',
       'Sai — khởi động cần cho mọi buổi tập, không chỉ khi thi đấu.']),
    Q('Trong chạy bền, cách thở hợp lí là?',
      ['Nín thở để chạy nhanh hơn', 'Chỉ thở bằng miệng thật gấp', 'Thở đều theo nhịp bước, ví dụ hít vào 3 bước - thở ra 3 bước', 'Thở càng nông càng tốt'],
      2,
      'Chạy bền cần thở đều theo nhịp bước chân, kết hợp tư thế ngả người nhẹ về trước.',
      ['Chạy bền (800 m, 1500 m) khác chạy ngắn ở chỗ <b>phân phối sức</b> và <b>nhịp thở</b>, không phải ở tốc độ tối đa.',
       'Kĩ thuật chạy bền:<ul><li><b>thở đều theo nhịp bước</b> — ví dụ hít vào 3 bước, thở ra 3 bước</li><li>thở <b>sâu bằng bụng</b>, không thở nông gấp gáp</li><li>tư thế <b>ngả người nhẹ về trước</b>, vai thả lỏng</li><li>giữ tốc độ đều, tăng tốc ở đoạn cuối</li></ul>',
       'Ngược lại, <b>chạy ngắn 100 m</b> dùng <i>xuất phát thấp</i>: quỳ một gối, hai tay chống sau vạch, khi chạy thì ngả người khoảng 45–50° để lực đẩy hiệu quả nhất trong 30–40 m đầu.'],
      ['Sai — nín thở làm thiếu O₂, kiệt sức rất nhanh.',
       'Sai — thở gấp và nông khiến mau mệt.',
       'Đúng — thở đều theo nhịp bước chân.',
       'Sai — thở nông cung cấp không đủ O₂ cho cơ.']),
    Q('Nhóm nào dưới đây đều là TỐ CHẤT THỂ LỰC?',
      ['Chiều cao, cân nặng, số đo vòng tay', 'Sức mạnh, sức bền, tốc độ, khéo léo, dẻo dai', 'Bóng đá, bóng rổ, bóng chuyền', 'Khởi động, tập chính, hồi tĩnh'],
      1,
      'Năm tố chất thể lực là sức mạnh, sức bền, tốc độ, khéo léo và dẻo dai.',
      ['GDTC không chỉ dạy kĩ thuật từng môn mà phát triển <b>năm tố chất thể lực</b> nền tảng.',
       '<ul><li><b>Sức mạnh</b> — tập với trọng lượng cơ thể, bài tay không</li><li><b>Sức bền</b> — chạy bền, bơi, đạp xe đường dài</li><li><b>Tốc độ</b> — chạy ngắn, bài tập bứt tốc</li><li><b>Khéo léo</b> — các môn bóng, aerobic, võ thuật</li><li><b>Dẻo dai</b> — giãn cơ, các bài mềm dẻo</li></ul>',
       'Chiều cao và cân nặng là <i>chỉ số hình thái</i>; bóng đá, bóng rổ là <i>môn thể thao</i>; khởi động - tập chính - hồi tĩnh là <i>cấu trúc một buổi tập</i>.'],
      ['Sai — đó là các chỉ số hình thái cơ thể.',
       'Đúng — năm tố chất thể lực cơ bản.',
       'Sai — đó là tên các môn thể thao.',
       'Sai — đó là ba phần của một buổi tập.']),
    Q('Theo khuyến nghị của WHO, học sinh nên vận động ít nhất bao nhiêu phút mỗi ngày?',
      ['15 phút', '30 phút', '60 phút', '120 phút'],
      2,
      'WHO khuyến nghị trẻ em và thanh thiếu niên vận động ít nhất 60 phút mỗi ngày.',
      ['Mùa hè trước khi vào lớp 9 là lúc dễ mất thói quen vận động nhất — nên cần một <b>kế hoạch cụ thể</b>.',
       'Khuyến nghị của <b>WHO</b> cho trẻ em và thanh thiếu niên:<ul><li>ít nhất <b>60 phút mỗi ngày</b> vận động ở mức trung bình đến mạnh</li><li>kết hợp môn em yêu thích với chạy bộ hoặc bơi lội</li><li>thêm bài tập tăng sức mạnh cơ - xương vài ngày mỗi tuần</li></ul>',
       'Lớp 9 là năm thi chuyển cấp, nên giữ thể lực tốt chính là <b>lợi thế khi ôn thi</b>: ngủ ngon hơn, tập trung lâu hơn, ít ốm hơn. Lớp 9 cũng học theo <i>chuyên đề thể thao</i> — em chọn một môn để học sâu hơn.'],
      ['Sai — 15 phút chưa đủ theo khuyến nghị.',
       'Sai — 30 phút là khuyến nghị cho người trưởng thành.',
       'Đúng — ít nhất 60 phút mỗi ngày.',
       'Sai — 120 phút là tốt nhưng không phải mức tối thiểu được khuyến nghị.']),
  ]),
];

export const S8GDTC_SCENARIOS = indexBy(S8GDTC_WEEKS);
