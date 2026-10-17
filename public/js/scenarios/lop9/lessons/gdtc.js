// ============================================================
// Lớp 9 · GIÁO DỤC THỂ CHẤT — Lý thuyết 35 tuần (chuẩn bị thi vào 10).
// Key trùng id quiz: "S9GDTC-wNN-quiz".
// Bám SGK Giáo dục thể chất 9 (GDPT 2018 — KNTT/CTST/Cánh Diều).
// Văn phong nghiêm túc, đúng chuẩn cấp THCS cuối cấp; độ sâu ngang lớp 6.
// ============================================================

const L = (topic, intro, objectives, theory, examples) => ({ topic, intro, objectives, theory, examples });

export const S9GDTC_LESSONS = {
  'S9GDTC-w01-quiz': L(
    'Khởi động và an toàn thể thao',
    'Năm cuối cấp, các em sẽ tập cường độ cao hơn để chuẩn bị bài kiểm tra thể lực vào 10. Bài mở đầu củng cố nguyên tắc an toàn — nền tảng không thể bỏ qua của mọi buổi tập.',
    ['Hiểu cấu trúc một buổi tập an toàn: khởi động – tập chính – hồi tĩnh.', 'Thực hiện đúng khởi động chung và khởi động chuyên môn.', 'Biết sơ cứu RICE và nhận biết dấu hiệu tập quá sức.'],
    [
      { h: 'Vì sao năm lớp 9 phải đặc biệt coi trọng an toàn?' },
      { p: 'Lớp 9 các em tập với khối lượng và cường độ cao nhất cấp THCS để chuẩn bị bài kiểm tra thể lực tuyển sinh vào 10 (chạy bền, bật xa, chạy ngắn…). Cường độ cao đi kèm nguy cơ chấn thương cao — vì vậy quy trình an toàn không phải "thủ tục" mà là điều kiện để tiến bộ bền vững.' },
      { h: 'Quy trình một buổi tập an toàn' },
      { ul: [
        'Khởi động chung 5–10 phút: chạy nhẹ 1–2 vòng + xoay khớp tuần tự từ cổ → vai → khuỷu → cổ tay → hông → gối → cổ chân.',
        'Khởi động chuyên môn: làm chậm và nhẹ các động tác sắp tập (chạy nâng cao đùi, gót chạm mông, đá lăng, tăng tốc ngắn 70–80%).',
        'Tập chính: theo giáo án, đúng kỹ thuật, tăng tiến hợp lý.',
        'Hồi tĩnh 5 phút: đi bộ chậm + giãn cơ tĩnh + hít thở sâu để đưa nhịp tim về bình thường.',
      ] },
      { note: 'Khẩu hiệu: "Khởi động từ chung đến chuyên môn — Hồi tĩnh từ mạnh về nhẹ". Không bao giờ tập nặng khi cơ chưa ấm.' },
      { h: 'Sơ cứu RICE — chấn thương cơ, khớp, dây chằng' },
      { ul: [
        'R – Rest (nghỉ): dừng vận động ngay, không cố gắng tiếp tục.',
        'I – Ice (chườm đá): 15–20 phút mỗi 2 giờ trong 48 giờ đầu, bọc đá qua khăn — không áp trực tiếp lên da.',
        'C – Compression (băng ép): băng thun ép vừa phải, kiểm tra đầu chi không tím.',
        'E – Elevation (nâng cao): kê chi tổn thương cao hơn tim để giảm sưng.',
      ] },
      { note: '48 giờ đầu TUYỆT ĐỐI không xoa dầu nóng, không xoa bóp mạnh, không chườm nóng — sẽ làm chảy máu trong và sưng nặng hơn.' },
      { h: 'Dấu hiệu tập quá sức (overtraining)' },
      { p: 'Mệt mỏi kéo dài nhiều ngày dù đã nghỉ, đau cơ dai dẳng, mất ngủ, chán ăn, dễ cáu, thành tích chững hoặc tụt. Khi gặp các dấu hiệu này phải giảm khối lượng, tăng ngủ và dinh dưỡng để cơ thể "siêu hồi phục".' },
      { h: 'Trang phục và môi trường tập' },
      { ul: [
        'Giày thể thao vừa chân, có đệm và bám sân; tuyệt đối không đi dép.',
        'Quần áo thoáng, thấm hút mồ hôi; tháo trang sức sắc nhọn.',
        'Sân tập bằng phẳng, khô ráo, không sỏi đá; tránh tập giữa trưa nắng gắt.',
      ] },
      { note: 'Chấn thương nặng (gãy xương, biến dạng khớp, choáng, đau dữ dội, mất cảm giác) phải đưa đến cơ sở y tế NGAY — không tự xử lý.' },
    ],
    [
      { q: 'Bạn bị bong gân cổ chân khi chạy. Em sơ cứu theo RICE thế nào?', a: 'R: đỡ bạn ngồi xuống, dừng ngay. I: chườm đá bọc khăn 15–20 phút. C: băng thun ép vừa quanh cổ chân (kiểm tra ngón chân không tím). E: kê chân cao hơn tim. Báo thầy/cô; nếu sưng to, đau nhiều thì đưa đi y tế. Tuyệt đối không xoa dầu nóng trong 48 giờ đầu.' },
      { q: 'Bạn nói: "Khởi động mất thời gian, tập luôn cho khoẻ". Em phản biện thế nào?', a: 'Khởi động không mất thời gian mà giúp buổi tập hiệu quả và an toàn. Tập ngay khi cơ chưa nóng dễ căng cơ, bong gân; tim chưa quen nhịp nên mệt nhanh hơn. 10 phút khởi động có thể tránh được vài tuần nghỉ vì chấn thương — đặc biệt năm lớp 9 tập cường độ cao.' },
      { q: 'Em tập đều 2 tuần nhưng càng tập càng mệt, mất ngủ, chán ăn. Vì sao và phải làm gì?', a: 'Đây là dấu hiệu tập quá sức — cơ thể không kịp hồi phục. Em nên giảm 30–40% khối lượng tuần này (tuần "deload"), ngủ đủ 8 tiếng, ăn đủ chất. Sau khi hồi phục, thành tích thường tốt lên nhờ hiện tượng siêu hồi phục.' },
    ]
  ),

  'S9GDTC-w02-quiz': L(
    'Chạy bền — Kỹ thuật chạy 800m–1500m',
    'Chạy bền là nội dung kiểm tra thể lực vào 10 ở nhiều địa phương. Kỹ thuật đúng giúp tiết kiệm sức và hoàn thành cự ly với thành tích tốt hơn.',
    ['Nắm tư thế và bước chạy bền hiệu quả.', 'Biết điều hoà nhịp thở theo nhịp chân.', 'Xử lý được tình huống xóc bụng và "cực điểm".'],
    [
      { h: 'Chạy bền 800m–1500m là gì?' },
      { p: 'Đây là cự ly trung bình, sử dụng chủ yếu hệ năng lượng ưa khí (aerobic). Mục tiêu không phải tốc độ tối đa mà là duy trì tốc độ ổn định trong thời gian dài — kết hợp giữa thể lực và chiến thuật phân phối sức (pacing).' },
      { h: 'Tư thế chạy bền chuẩn' },
      { ul: [
        'Thân hơi nghiêng trước 5–10 độ — không ngả ra sau, không gập bụng.',
        'Vai thả lỏng, tay vung tự nhiên trước – sau, khuỷu gập khoảng 90 độ, không vung chéo thân.',
        'Bàn chân tiếp đất bằng giữa bàn hoặc gần gót êm, không nện gót đột ngột.',
        'Đầu thẳng, mắt nhìn về trước 10–15m, không cúi nhìn chân.',
      ] },
      { h: 'Nhịp thở — bí quyết của chạy bền' },
      { p: 'Hít sâu vào bằng mũi, thở ra bằng miệng, thở theo nhịp chân. Phổ biến là 2 nhịp hít – 2 nhịp thở (2-2); khi mệt chuyển sang 3-2 hoặc 2-1. Quan trọng nhất là thở ĐỀU và SÂU để cung cấp oxy ổn định cho cơ.' },
      { h: 'Phân phối sức (pacing)' },
      { ul: [
        'Đoạn đầu: khởi động êm, không lao đi như chạy ngắn.',
        'Đoạn giữa: giữ tốc độ đều, đều bước, đều nhịp thở.',
        'Đoạn cuối: tăng tốc rút đích nếu còn sức.',
      ] },
      { h: '"Cực điểm" — giai đoạn mệt nhất' },
      { p: 'Sau một đoạn chạy, cơ thể chưa kịp cân đối oxy nên thấy rất mệt, muốn bỏ — đó là "cực điểm". Nếu giảm tốc nhẹ, điều hoà hơi thở và kiên trì, cơ thể sẽ vào trạng thái "hô hấp ổn định" (second wind), chạy nhẹ hơn rõ rệt.' },
      { h: 'Khi bị xóc bụng (đau nhói sườn)' },
      { p: 'Nguyên nhân thường do thở không đều hoặc ăn quá gần giờ chạy. Cách xử lý: giảm tốc, thở chậm sâu, dùng tay ấn nhẹ vùng đau, có thể uốn nhẹ thân về phía đau. Tuyệt đối không dừng đột ngột.' },
      { note: 'Cự ly 800m–1500m thuộc chạy bền trung bình — cần nền ưa khí tốt cộng chiến thuật pacing hợp lý ngay từ đầu trận.' },
    ],
    [
      { q: 'Chạy 800m mà mới 400m đã thở hổn hển. Em điều chỉnh thế nào?', a: 'Giảm tốc 10–15%, ổn định nhịp thở về 2-2 hoặc 3-2, vung tay nhẹ hơn để bớt gồng. Khi nhịp tim dịu lại thì tăng nhẹ trở lại. Bài học: pacing đầu trận đã quá nhanh — lần sau khởi đầu chậm hơn.' },
      { q: 'Bị xóc bụng giữa lúc chạy 1500m thì xử lý ra sao?', a: 'Giảm tốc xuống 60–70% sức, thở chậm sâu theo nhịp 4 hít – 4 thở, dùng ngón tay ấn vùng đau 3–5 giây, uốn nhẹ thân. Sau khoảng 100–200m thường hết — KHÔNG dừng hẳn vì sẽ khó chạy lại.' },
      { q: 'Đang chạy 1000m thấy thở dốc, hai chân nặng, muốn bỏ. Em làm gì?', a: 'Có thể em đang ở "cực điểm". Giảm tốc một chút, hít sâu bằng mũi – thở ra dài bằng miệng theo nhịp 3-3. Vài chục mét sau cơ thể điều hoà lại, chạy nhẹ hơn hẳn. Không bỏ cuộc — vượt qua cực điểm là bước ngoặt của chạy bền.' },
    ]
  ),

  'S9GDTC-w03-quiz': L(
    'Chạy bền — Bài tập phát triển sức bền',
    'Để chạy bền tiến bộ phải tập đúng phương pháp và tuân thủ nguyên tắc tăng tiến. Bài này giới thiệu ba phương pháp tập sức bền và cách lập kế hoạch tuần.',
    ['Phân biệt được phương pháp chạy đều, biến tốc và ngắt quãng.', 'Hiểu và áp dụng nguyên tắc tăng tiến dần.', 'Lập được kế hoạch tập sức bền cho HS lớp 9.'],
    [
      { h: 'Sức bền là gì và vì sao quan trọng?' },
      { p: 'Sức bền là khả năng duy trì hoạt động kéo dài mà không giảm hiệu suất. Sức bền tốt giúp tim – phổi khoẻ, chống mệt mỏi và là nền tảng để cải thiện mọi nội dung thể lực, đặc biệt là chạy bền thi vào 10.' },
      { h: 'Ba phương pháp tập sức bền' },
      { ul: [
        'Chạy đều (continuous): chạy liên tục 20–40 phút ở cường độ vừa — phát triển nền ưa khí, phù hợp người mới.',
        'Biến tốc (fartlek): xen kẽ nhanh – chậm theo cảm giác (ví dụ chạy nhanh tới cột điện, chạy chậm tới cây tiếp theo) — linh hoạt, đỡ nhàm.',
        'Ngắt quãng (interval): chạy nhanh 200–400m rồi nghỉ 1–2 phút, lặp 6–8 lần — tăng tốc độ và VO₂max.',
      ] },
      { h: 'Nguyên tắc tăng tiến (progressive overload)' },
      { p: 'Mỗi tuần chỉ tăng khoảng 5–10% cự ly hoặc tốc độ, không nhảy vọt. Cứ sau 3–4 tuần tăng tiến nên có 1 tuần "deload" (giảm 30–40% khối lượng) để cơ thể hồi phục và mạnh lên.' },
      { h: 'Tần suất tập hợp lý cho lớp 9' },
      { ul: [
        '3–5 buổi/tuần là tối ưu — ít hơn khó tiến bộ, nhiều hơn dễ quá tải.',
        'Không xếp hai buổi nặng liên tiếp; xen kẽ buổi nặng – nhẹ.',
        'Mỗi buổi đều có khởi động và hồi tĩnh đầy đủ.',
      ] },
      { h: 'Theo dõi tiến bộ' },
      { p: 'Đo lại thành tích cự ly mục tiêu mỗi 2–4 tuần. Có thể đo cảm giác mệt (RPE 1–10) hoặc nhịp tim sau chạy để biết cơ thể đang tiến bộ hay quá tải. Ghi nhật ký tập để điều chỉnh kịp thời.' },
      { note: 'Sức bền cải thiện chậm nhưng bền vững — kiên trì 6–8 tuần mới thấy rõ kết quả. Đừng nóng vội tăng tải đột ngột.' },
    ],
    [
      { q: 'Em đang chạy đều 2km × 3 buổi/tuần và muốn cải thiện thành tích 800m. Lập kế hoạch?', a: 'Giữ 1 buổi chạy đều dài (nền ưa khí) + thêm 1 buổi interval (8 × 200m nhanh, nghỉ 90 giây) + 1 buổi tập sức mạnh chân (squat, lunge, bật cóc). Sau 4 tuần đo lại thành tích — kỳ vọng cải thiện rõ.' },
      { q: 'Tuần nào em cũng tăng cự ly thì có vấn đề gì?', a: 'Cơ thể không kịp hồi phục, dễ chấn thương và thành tích chững (plateau). Đúng cách: 3–4 tuần tăng tiến rồi 1 tuần giảm tải để siêu hồi phục, sau đó tiếp tục tăng từ mức cao hơn.' },
      { q: 'Phân biệt fartlek và interval khác nhau ở điểm cốt lõi nào?', a: 'Fartlek đổi tốc theo CẢM GIÁC, không có quãng nghỉ cố định, vui và linh hoạt. Interval có cấu trúc CHẶT: cự ly, tốc độ và thời gian nghỉ định trước, lặp số lần định trước — nhằm tăng VO₂max một cách đo lường được.' },
    ]
  ),

  'S9GDTC-w04-quiz': L(
    'Đá cầu — Kỹ thuật cơ bản',
    'Đá cầu là môn thể thao thuần Việt, thi đấu chính thức tại SEA Games — nơi Việt Nam là cường quốc. Kỹ thuật cơ bản gồm tâng cầu và ba lối đá chính.',
    ['Nắm kỹ thuật tâng cầu và ba lối đá cơ bản.', 'Biết kích thước sân, lưới và quy cách quả cầu.', 'Phán đoán được điểm rơi của cầu để di chuyển kịp.'],
    [
      { h: 'Tâng cầu — kỹ thuật nền tảng' },
      { p: 'Tâng cầu là dùng mu bàn chân (hoặc đùi) đánh nhẹ cầu lên đều đặn để giữ cầu trên không. Đây là kỹ thuật nền — tâng tốt thì cảm giác cầu tốt, các lối đá khác mới chuẩn. Người mới nên tập tâng 20–30 lần liên tục mỗi ngày.' },
      { h: 'Ba lối đá cầu cơ bản' },
      { ul: [
        'Đá mu bàn chân: tiếp xúc cầu bằng mu — dùng để đá xa, đá tấn công mạnh.',
        'Đá má trong: tiếp xúc bằng phần trong bàn chân — điều khiển hướng tốt, đỡ và chuyền cầu.',
        'Đá má ngoài: tiếp xúc bằng phần ngoài bàn chân — đá chéo bất ngờ, lừa đối thủ.',
      ] },
      { h: 'Tư thế và di chuyển' },
      { p: 'Đứng chân trước chân sau, trọng tâm thấp, gối hơi chùng để sẵn sàng bật. Di chuyển bằng bước trượt ngang hoặc bước chéo, luôn đưa thân tới đúng điểm rơi của cầu rồi mới đá.' },
      { h: 'Sân và lưới đá cầu chuẩn' },
      { ul: [
        'Sân đơn: 11,88m × 5,18m; sân đôi: 11,88m × 6,1m.',
        'Lưới nam cao 1,5m; lưới nữ cao 1,4m.',
        'Quả cầu nặng khoảng 14g, gồm đế cao su và lông vũ.',
      ] },
      { h: 'Mắt theo dõi và phán đoán cầu' },
      { p: 'Mắt nhìn cầu liên tục từ khi đối thủ đá đến khi cầu chạm chân mình. Phán đoán điểm rơi sớm để di chuyển đến vị trí trước khi cầu tới — đứng đúng chỗ quan trọng hơn đá mạnh.' },
      { note: 'Đá cầu vào SEA Games chính thức từ năm 2003 — Việt Nam dẫn đầu nhiều kỳ. Đây là môn thể thao Việt nên các em tự hào tập luyện.' },
    ],
    [
      { q: 'Cầu bay cao gần lưới, em nên đá kiểu nào?', a: 'Nếu muốn tấn công: đá mu bàn chân đập cầu xuống mạnh vào sân đối phương. Nếu muốn cài bẫy: đá má trong nhẹ thả cầu sát lưới (drop) để đối thủ không kịp lên đỡ.' },
      { q: 'Em tâng cầu được vài cái là cầu lệch, rơi ra ngoài. Sửa thế nào?', a: 'Thường do tiếp xúc cầu không vào tâm mu chân và lực không đều. Tập tâng chậm, mắt nhìn cầu, giữ mu bàn chân phẳng và đánh thẳng lên trên. Mỗi ngày tăng dần số lần tâng liên tục; cảm giác cầu sẽ ổn định.' },
      { q: 'Đá má ngoài có lợi thế gì so với hai lối kia?', a: 'Đá má ngoài tạo đường cầu chéo, bất ngờ, đối thủ khó đoán hướng. Rất hiệu quả khi đối thủ đang đứng lệch một bên — em đẩy cầu sang góc trống bên kia.' },
    ]
  ),

  'S9GDTC-w05-quiz': L(
    'Đá cầu — Thi đấu đơn',
    'Tổ chức trận đấu đơn cần hiểu luật và biết vận dụng chiến thuật cá nhân — kết hợp sức bền, tốc độ di chuyển và đa dạng cú đá.',
    ['Nắm luật thi đấu đơn cơ bản và cách tính điểm.', 'Biết chiến thuật tấn công và phòng thủ trong trận đơn.', 'Hiểu vai trò của phát cầu trong giành quyền chủ động.'],
    [
      { h: 'Luật thi đấu đơn cơ bản' },
      { ul: [
        'Bốc thăm chọn bên hoặc quyền phát cầu đầu trận.',
        'Mỗi set tính tới 21 điểm, phải hơn đối thủ tối thiểu 2 điểm.',
        'Trận đấu thắng 2/3 set.',
        'Cầu chạm đất trong sân mình, đá ra ngoài, hoặc chạm 2 lần liền = mất điểm.',
      ] },
      { h: 'Kỹ thuật phát cầu' },
      { p: 'Phát cầu mở đầu mỗi pha. Phát thấp – nhanh để gây bất ngờ, hoặc phát cao – sâu để đẩy đối thủ về cuối sân. Phát cầu tốt giúp giành quyền chủ động ngay từ đầu pha bóng.' },
      { h: 'Chiến thuật tấn công' },
      { ul: [
        'Đá vào góc trống và đường biên để buộc đối thủ di chuyển nhiều.',
        'Kết hợp cú mạnh (smash) và cú thả nhẹ (drop) để phá nhịp đối thủ.',
        'Tấn công khi đối thủ mất thăng bằng hoặc đứng sai vị trí.',
      ] },
      { h: 'Chiến thuật phòng thủ' },
      { p: 'Khi bị động, đỡ cầu cao và xa (defensive lob) để có thời gian trở về vị trí trung tâm sân. Không cố đập trả khi đang mất thăng bằng — dễ hỏng cầu.' },
      { h: 'Thể lực trong trận đơn' },
      { p: 'Đá đơn rất tốn sức vì một mình phụ trách cả sân. Người có sức bền tốt thường thắng ở cuối set khi đối thủ mệt. Vì vậy tập chạy bền và di chuyển ngang là phần không tách rời của đá cầu đơn.' },
      { note: 'Người chiến thắng là người buộc được đối thủ chơi theo nhịp của mình — chủ động kéo dài hoặc rút ngắn pha bóng tuỳ điểm mạnh của bản thân.' },
    ],
    [
      { q: 'Đối thủ rất nhanh chân nhưng yếu sức bền. Em chọn chiến thuật nào?', a: 'Kéo dài pha bóng (rally), đẩy cầu xa về hai đường biên để buộc đối thủ chạy nhiều. Khi đối thủ thấm mệt và chậm chân, em dứt điểm bằng cú smash hoặc drop vào góc trống.' },
      { q: 'Khi nào nên phát cầu mạnh?', a: 'Khi đối thủ chưa sẵn sàng tư thế, khi cần tạo bất ngờ để giành điểm break, hoặc khi gió thuận hỗ trợ đường cầu. Nếu đối thủ đã đứng vững thì phát mạnh dễ bị phản công — nên phát biến hoá hơn.' },
      { q: 'Em đang dẫn nhưng cuối set hay đuối sức và bị gỡ. Khắc phục thế nào?', a: 'Vấn đề là sức bền. Bổ sung tập chạy bền và bài di chuyển ngang 2 buổi/tuần. Trong trận, tiết kiệm sức ở các pha không quan trọng (đỡ cầu cao về giữa sân) để dồn sức cho các pha quyết định cuối set.' },
    ]
  ),

  'S9GDTC-w06-quiz': L(
    'Đá cầu — Thi đấu đôi',
    'Đá cầu đôi đòi hỏi phối hợp ăn ý — không chỉ giỏi cá nhân. Phối hợp tốt có thể bù đắp chênh lệch kỹ thuật giữa hai người.',
    ['Hiểu vị trí và phân vai trong đôi.', 'Biết cách giao tiếp và yểm trợ trong trận.', 'Nắm cách xử lý cầu rơi vào vùng giáp ranh.'],
    [
      { h: 'Đặc thù của đá cầu đôi' },
      { p: 'Trong đá cầu đôi, hai người chia sẻ trách nhiệm cả sân. Lợi thế là mỗi người lo phần ít hơn, nhưng nguy cơ là cầu rơi vào vùng giáp ranh khiến cả hai cùng đỡ hoặc cùng nhường. Vì vậy phối hợp và giao tiếp là yếu tố quyết định.' },
      { h: 'Hai chiến thuật vị trí' },
      { ul: [
        'Trước – sau: một người chuyên tấn công ở gần lưới, một người phòng thủ và chuyền cầu ở hậu sân.',
        'Trái – phải: chia đôi sân theo chiều dọc, mỗi người phụ trách một nửa.',
        'Có thể luân chuyển linh hoạt theo diễn biến pha bóng.',
      ] },
      { h: 'Phân vai theo điểm mạnh' },
      { p: 'Người có cú đá mạnh, bật tốt làm vai tấn công. Người đỡ cầu chắc, chuyền chính xác làm vai phòng thủ – kiến tạo. Phân vai rõ giúp mỗi người phát huy sở trường thay vì tranh nhau cùng đánh.' },
      { h: 'Giao tiếp trong trận' },
      { ul: [
        'Gọi "Tôi!" khi quyết định đỡ cầu; gọi "Bạn!" khi nhường cho đồng đội.',
        'Ra hiệu trước khi phát cầu để đồng đội biết vị trí đứng.',
        'Động viên đồng đội sau mỗi điểm — dù thắng hay thua — để giữ tinh thần.',
      ] },
      { h: 'Yểm trợ và di chuyển bù' },
      { p: 'Người gần cầu hơn chủ động đá; đồng đội lập tức di chuyển bù để lấp khoảng trống vừa để lại. Không bao giờ cả hai cùng lao vào một quả cầu — vừa va chạm vừa bỏ trống sân.' },
      { note: 'Phối hợp đôi tốt quyết định khoảng một nửa trận đấu; kỹ thuật cá nhân chỉ là nửa còn lại. Một đôi ăn ý có thể thắng đôi mạnh hơn nhưng rời rạc.' },
    ],
    [
      { q: 'Cầu rơi đúng giữa em và đồng đội — cả hai cùng đứng nhìn. Sai ở đâu và đúng phải thế nào?', a: 'Sai vì không ai gọi và không ai quyết định. Đúng: phải có người gọi "Tôi!" rõ ràng để nhận trách nhiệm. Nếu không kịp hô, người gần hơn (theo phân công trước – sau / trái – phải) chủ động đỡ, người kia lập tức yểm trợ.' },
      { q: 'Đôi em mới ghép nên còn vướng nhau, hay đỡ hụt vùng giáp ranh. Khắc phục thế nào?', a: 'Tập riêng 2 buổi/tuần chỉ để rèn phối hợp: thống nhất vùng phụ trách, tập gọi "Tôi/Bạn", tập di chuyển bù. Sau khoảng 4 tuần sẽ ăn ý. Phối hợp là kỹ năng tập được, không phải tự nhiên có.' },
      { q: 'Đồng đội của em yếu hơn rõ rệt. Em nên chơi thế nào để đôi vẫn mạnh?', a: 'Em nhận vai tấn công và bao quát nhiều hơn, để đồng đội làm phần đơn giản (đỡ cầu cao về giữa sân, chuyền cầu cho em dứt điểm). Động viên thay vì trách. Đôi mạnh là đôi mỗi người làm tốt phần phù hợp với mình.' },
    ]
  ),

  'S9GDTC-w07-quiz': L(
    'Cầu lông — Kỹ thuật và đội hình đôi',
    'Cầu lông là môn HS thường chơi. Lớp 9 học các cú đánh nâng cao và đội hình đôi tấn công – phòng thủ chuyên sâu.',
    ['Phân biệt đội hình tấn công và phòng thủ trong đôi.', 'Hiểu các cú đánh nâng cao và khi nào dùng.', 'Nắm kích thước sân đơn, sân đôi.'],
    [
      { h: 'Cách cầm vợt và tư thế cơ bản' },
      { p: 'Cầm vợt kiểu "bắt tay" (forehand grip), các ngón thả lỏng, chỉ siết khi đánh. Tư thế chờ cầu: gối hơi chùng, trọng tâm thấp ở giữa sân, vợt đưa cao trước thân để phản ứng nhanh cả cú trên cao lẫn cú sát lưới.' },
      { h: 'Các cú đánh nâng cao' },
      { ul: [
        'Smash (đập): đánh mạnh xuống khi cầu cao và đối thủ ở xa — cú tấn công dứt điểm.',
        'Drop (bỏ nhỏ sát lưới): khi đối thủ đứng cuối sân, thả cầu rơi sát lưới buộc họ lao lên.',
        'Clear (đẩy cao xa): đẩy cầu về cuối sân đối thủ để có thời gian phòng thủ.',
        'Net play (cầu sát lưới): cổ tay khéo, đưa cầu rơi sát mép lưới.',
      ] },
      { h: 'Đội hình cầu lông đôi' },
      { ul: [
        'Tấn công: đội hình trước – sau (người trước chặn lưới, người sau đập cầu).',
        'Phòng thủ: đội hình ngang (mỗi người chia đôi sân để đỡ cú đập của đối phương).',
        'Chuyển đổi linh hoạt giữa hai đội hình theo tình huống — đây là phần khó nhất.',
      ] },
      { h: 'Nguyên tắc chuyển đổi đội hình' },
      { p: 'Khi đội mình đánh cầu cao lên (clear, lob) thì chuyển sang phòng thủ ngang; khi đánh cầu xuống (smash, drop) thì chuyển sang tấn công trước – sau. Đọc đúng tình huống để xoay đội hình kịp thời là chìa khoá thắng trận đôi.' },
      { h: 'Kích thước sân' },
      { ul: [
        'Sân đôi rộng 6,1m × dài 13,4m.',
        'Sân đơn hẹp hơn: 5,18m × 13,4m.',
        'Lưới cao 1,55m ở hai cột, 1,524m ở giữa.',
      ] },
      { note: 'Trong đôi, người không đánh cầu phải luôn di chuyển bù vị trí, không đứng yên xem đồng đội đánh.' },
    ],
    [
      { q: 'Đối phương đập mạnh xuống sân — đội em đang ở thế tấn công. Phòng thủ thế nào?', a: 'Chuyển ngay sang đội hình ngang, mỗi người phụ trách một nửa sân. Cố gắng đỡ cầu cao lên giữa sân để có thời gian xoay lại tấn công; không cố trả mạnh khi đang bị động.' },
      { q: 'Khi nào nên dùng cú drop?', a: 'Khi đối thủ đứng cuối sân hoặc đang lùi để chuẩn bị đỡ smash. Cú drop sát lưới buộc họ phải lao lên gấp, mất thăng bằng — tạo cơ hội cho cú dứt điểm tiếp theo của đội em.' },
      { q: 'Em và đồng đội hay va vào nhau khi cầu vào giữa. Nguyên nhân và cách sửa?', a: 'Do chưa thống nhất ai phụ trách vùng giữa và chưa quen chuyển đội hình. Quy ước: ở đội hình ngang thì người thuận tay (forehand) lo vùng giữa; gọi "Tôi/Bạn" rõ ràng. Tập chuyển đổi trước – sau / ngang nhiều lần để thành phản xạ.' },
    ]
  ),

  'S9GDTC-w08-quiz': L(
    'Bóng chuyền — Đập bóng (spike)',
    'Đập bóng (spike) là cú tấn công chính trong bóng chuyền — quyết định phần lớn điểm số. Lớp 9 hoàn thiện kỹ thuật bốn giai đoạn.',
    ['Nắm bốn giai đoạn của cú đập.', 'Hiểu nguyên lý truyền lực từ chuỗi động học toàn thân.', 'Biết tiếp đất an toàn để tránh chấn thương.'],
    [
      { h: 'Đập bóng là gì và vì sao khó?' },
      { p: 'Đập bóng là cú đánh mạnh từ trên cao xuống sân đối phương. Đây là kỹ thuật khó vì phải phối hợp lấy đà, bật nhảy, định thời điểm chạm bóng trên không và tiếp đất an toàn — tất cả trong một chuỗi liên tục.' },
      { h: 'Bốn giai đoạn đập bóng' },
      { ul: [
        'Lấy đà: 3 bước (chân nghịch – chân thuận – chân nghịch bước nhảy), tăng tốc dần.',
        'Bật nhảy: hai chân giậm đồng thời, hai tay vung mạnh từ sau ra trước – lên cao hỗ trợ bật.',
        'Tiếp xúc bóng: tay đập duỗi thẳng trên đỉnh đầu, đánh trùm lên bóng, cổ tay roi nhanh xuống.',
        'Tiếp đất: bằng hai chân, nửa trước bàn chân chạm trước, gối chùng để hoãn xung.',
      ] },
      { h: 'Truyền lực từ chuỗi động học toàn thân' },
      { p: 'Lực đập KHÔNG chỉ từ cánh tay. Nó truyền theo chuỗi: chân đẩy → hông xoay → thân vặn → vai vung → cánh tay vung → cổ tay roi. Mỗi mắt xích thêm lực, làm cú đập mạnh hơn nhiều so với chỉ "vung tay".' },
      { h: 'Định thời điểm chạm bóng' },
      { p: 'Phải chạm bóng ở điểm CAO NHẤT của cú nhảy, khi tay đã duỗi thẳng. Chạm quá sớm (bóng còn cao) hoặc quá muộn (đã rơi xuống) đều làm bóng vào lưới hoặc ra ngoài. Người mới nên tập timing với bóng treo cố định trước.' },
      { h: 'Tiếp đất an toàn' },
      { p: 'Tiếp đất bằng cả hai chân, nửa trước bàn chân chạm trước, đầu gối chùng khoảng 30 độ để hấp thụ lực. Tiếp đất một chân hoặc cứng gối rất dễ bong gân cổ chân và chấn thương đầu gối.' },
      { note: 'Lỗi phổ biến: bật nhảy không vung tay nên thấp; chạm bóng sai thời điểm; tiếp đất một chân. Sửa từng lỗi một, tập chậm trước khi tăng tốc.' },
    ],
    [
      { q: 'Em đập bóng vào lưới liên tục. Vì sao và sửa thế nào?', a: 'Thường do chạm bóng quá sớm (chưa tới điểm cao nhất) hoặc cổ tay không roi xuống. Khắc phục: chờ bóng lên cao hơn, đánh khi tay đã duỗi thẳng trên đầu, dùng cổ tay roi nhanh trùm lên bóng để bóng đi cắm xuống.' },
      { q: 'Sau khi đập, em hay đau đầu gối. Nguyên nhân là gì?', a: 'Do tiếp đất cứng chân, không chùng gối nên lực dội ngược lên khớp gối và cột sống. Phải tiếp đất bằng nửa trước bàn chân trước, rồi cả bàn chân, đồng thời chùng gối khoảng 30 độ như lò xo để hấp thụ lực.' },
      { q: 'Em bật cao tốt nhưng cú đập vẫn yếu. Vì sao?', a: 'Có thể em chỉ dùng sức cánh tay mà bỏ qua chuỗi truyền lực toàn thân. Tập đập có xoay hông và vặn thân: chân đẩy → hông xoay → vai vung → cổ tay roi. Khi cả chuỗi tham gia, cú đập sẽ mạnh hơn hẳn dù sức tay không đổi.' },
    ]
  ),

  'S9GDTC-w09-quiz': L(
    'Bóng chuyền — Chắn lưới (block)',
    'Chắn lưới (block) là kỹ thuật phòng thủ tại lưới — chặn cú đập của đối phương ngay khi bóng vừa qua lưới. Đây là tuyến phòng thủ đầu tiên của đội.',
    ['Hiểu vị trí và kỹ thuật chắn lưới.', 'Phân biệt chắn đơn (single) và chắn đôi (double block).', 'Tránh được lỗi chạm lưới khi chắn.'],
    [
      { h: 'Vai trò của chắn lưới' },
      { p: 'Chắn lưới là tuyến phòng thủ đầu tiên, chặn trực tiếp cú đập của đối phương hoặc làm chệch hướng bóng để hàng sau dễ đỡ. Một pha chắn tốt vừa ghi điểm trực tiếp, vừa gây áp lực tâm lý lên người tấn công đối phương.' },
      { h: 'Quy tắc chắn lưới' },
      { ul: [
        'Chỉ cầu thủ ở hàng trên (3 vị trí trước) được phép chắn.',
        'Nhảy thẳng đứng, không nhảy chéo về phía lưới.',
        'Hai tay vươn cao qua mép lưới nhưng KHÔNG được chạm lưới.',
        'Bàn tay xoè rộng, hơi úp xuống sân đối phương để bóng dội xuống đất họ.',
      ] },
      { h: 'Kỹ thuật bật chắn' },
      { p: 'Đứng cách lưới khoảng 20–30cm, gối chùng, hai tay đưa ngang ngực. Khi đối phương sắp đập, bật thẳng lên, vươn hai tay qua lưới, các ngón căng cứng. Khi rơi xuống thì rút tay về thân để không quệt lưới.' },
      { h: 'Chắn đơn và chắn đôi' },
      { p: 'Chắn đơn (single) là một người chắn. Chắn đôi (double) là hai người chắn cạnh nhau, tay khép sát để bịt kín diện tích lưới — hiệu quả hơn nhưng để hở phần sân nhiều hơn, cần hàng sau bọc lót tốt.' },
      { h: 'Đọc hướng đập của đối phương' },
      { p: 'Người chắn phải quan sát đường chuyền và vai của người đập để đoán hướng bóng, đặt tay che đúng hướng đập chính. Chắn không phải nhảy bừa mà là nhảy đúng chỗ, đúng lúc.' },
      { note: 'Chạm lưới khi nhảy = mất điểm trực tiếp. Tập trung bật thẳng và rút tay về đúng lúc để tránh quệt lưới.' },
    ],
    [
      { q: 'Khi nào nên dùng chắn đôi (double block)?', a: 'Khi đối phương có một tay đập (attacker) mạnh và ổn định. Hai người chắn cạnh nhau bịt kín hướng đập chính, buộc họ đập vào tay chắn hoặc đánh né ra biên. Hàng sau phải bọc lót phần sân bị hở do hai người dồn lên lưới.' },
      { q: 'Em hay bị thổi chạm lưới khi chắn. Sửa thế nào?', a: 'Đứng cách lưới 20–30cm trước khi bật, nhảy THẲNG đứng không lao về trước. Khi rơi xuống, chủ động rút hai tay về phía thân trước khi chúng quệt lưới. Tập bật chắn không bóng nhiều lần để thành phản xạ.' },
      { q: 'Đối phương đập mà em nhảy chắn luôn trượt — bóng đi hướng khác. Vì sao?', a: 'Do em chắn bừa, không đọc hướng đập. Phải quan sát đường chuyền và tư thế vai của người đập để đoán hướng, đặt tay che đúng hướng đó. Chắn đúng chỗ và đúng thời điểm quan trọng hơn bật cao.' },
    ]
  ),

  'S9GDTC-w10-quiz': L(
    'Bóng rổ — Ném rổ và ném 3 điểm',
    'Ném rổ là kỹ thuật ghi điểm cốt lõi; ném 3 điểm là vũ khí quan trọng của bóng rổ hiện đại. Lớp 9 hoàn thiện kỹ thuật chuẩn theo nguyên tắc BEEF.',
    ['Nắm nguyên tắc BEEF khi ném rổ.', 'Hiểu vai trò của bóng xoáy ngược (backspin).', 'Biết vị trí vạch 3 điểm và chuỗi truyền lực khi ném.'],
    [
      { h: 'Cầm bóng để ném' },
      { p: 'Bóng đặt trên đầu ngón và phần đệm ngón của tay thuận (tay ném). Tay không thuận đỡ bên cạnh bóng để giữ thăng bằng, KHÔNG đẩy bóng. Hai ngón cái tạo hình chữ T phía sau bóng.' },
      { h: 'Nguyên tắc BEEF' },
      { ul: [
        'B – Balance: tư thế cân bằng, hai chân rộng bằng vai, gối chùng.',
        'E – Eyes: mắt nhìn rổ, cụ thể là vành trước rổ.',
        'E – Elbow: khuỷu tay thẳng dưới bóng, tạo hình chữ L khoảng 90 độ.',
        'F – Follow-through: vẩy cổ tay sau khi bóng rời tay, ngón tay chỉ vào rổ như "thò tay vào hũ kẹo".',
      ] },
      { h: 'Chuỗi truyền lực khi ném' },
      { p: 'Lực ném đi từ chân lên: gối duỗi → hông duỗi → vai vươn → tay đẩy → cổ tay vẩy. Người mới hay chỉ dùng tay nên bóng yếu, không tới rổ. Phối hợp cả chuỗi giúp ném xa mà vẫn nhẹ nhàng, ổn định.' },
      { h: 'Bóng xoáy ngược (backspin)' },
      { p: 'Cổ tay vẩy nhanh khi bóng rời tay tạo backspin — bóng xoay ngược chiều bay. Khi chạm vành rổ, backspin giúp bóng "lăn vào" (bounce in) nhiều hơn thay vì bật ra ngoài, tăng tỉ lệ ghi điểm.' },
      { h: 'Vạch 3 điểm' },
      { p: 'Theo luật FIBA, vạch 3 điểm cách tâm rổ 6,75m; theo NBA là 7,24m. Cấp THCS thường dùng vạch FIBA. Ném ngoài vạch được 3 điểm, trong vạch được 2 điểm.' },
      { note: 'Người mới hay chỉ dùng tay nên bóng ngắn không tới rổ. Phải dồn lực từ chân lên và giữ kỹ thuật BEEF ổn định ở mọi cú ném.' },
    ],
    [
      { q: 'Bóng em ném luôn ngắn, không tới rổ. Nguyên nhân và cách sửa?', a: 'Thiếu lực chân. Tập squat và bật nhảy để mạnh chân. Khi ném, gập gối sâu hơn rồi đẩy lực từ chân lên tay theo chuỗi, không ráng dùng riêng sức tay. Bóng sẽ tới rổ mà vẫn mềm tay.' },
      { q: 'Bóng có xoáy ngược (backspin) có ý nghĩa thực tế gì?', a: 'Khi bóng chạm vành rổ, backspin giúp bóng lăn vào trong nhiều hơn — tăng tỉ lệ ghi điểm. Cú ném không xoáy thường bật thẳng ra ngoài khi chạm vành. Vì vậy phải vẩy cổ tay tạo xoáy ở mỗi cú ném.' },
      { q: 'Em ném hay lệch sang một bên dù lực đủ. Lỗi ở đâu trong BEEF?', a: 'Thường là chữ E thứ nhất — Elbow: khuỷu tay không thẳng dưới bóng mà vẹo ra ngoài, làm bóng đi chéo. Sửa: giữ khuỷu tay ném thẳng hàng dưới bóng và hướng về rổ, follow-through ngón tay chỉ thẳng vào rổ.' },
    ]
  ),

  'S9GDTC-w11-quiz': L(
    'Bóng rổ — Phòng thủ và tấn công',
    'Bóng rổ có hai hệ phòng thủ chính và những chiến thuật tấn công kinh điển. Hiểu chúng giúp đội chơi có tổ chức thay vì hỗn loạn.',
    ['Phân biệt phòng thủ người kèm người và phòng thủ khu vực.', 'Hiểu chiến thuật pick and roll.', 'Nắm luật lỗi cá nhân và phản công nhanh.'],
    [
      { h: 'Hai hệ phòng thủ chính' },
      { ul: [
        'Người kèm người (man-to-man): mỗi cầu thủ kèm chặt một đối thủ cố định — phù hợp khi đối thủ có trình độ tương đương.',
        'Khu vực (zone): mỗi cầu thủ phụ trách một vùng sân — phù hợp khi đối thủ có 1–2 ngôi sao nổi trội.',
      ] },
      { h: 'Tư thế và nguyên tắc phòng thủ' },
      { p: 'Trọng tâm thấp, gối chùng, hai tay dang để cản đường chuyền và đường ném. Luôn giữ vị trí giữa người tấn công và rổ. Di chuyển bằng bước trượt ngang, không bắt chéo chân để khỏi mất thăng bằng.' },
      { h: 'Pick and roll — chiến thuật tấn công kinh điển' },
      { p: 'Một người (pick) đứng chắn đường di chuyển của người phòng thủ; người cầm bóng vòng qua chắn để thoát kèm; ngay sau đó người chắn "roll" (lăn) tới rổ để nhận bóng. Đơn giản nhưng cực kỳ hiệu quả nếu phối hợp ăn ý.' },
      { h: 'Lỗi cá nhân' },
      { p: 'Phạm lỗi với đối thủ (đẩy, chặn không hợp lệ, đánh tay khi tranh bóng). Mỗi cầu thủ phạm 5 lỗi cá nhân sẽ bị truất quyền thi đấu (NBA: 6 lỗi). Phòng thủ tốt là phòng thủ bằng vị trí và đôi chân, không phạm lỗi bằng tay.' },
      { h: 'Phản công nhanh (fast-break)' },
      { p: 'Ngay khi cướp được bóng hoặc bắt bóng bật bảng, đội chuyển sang tấn công thật nhanh trước khi đối phương kịp về phòng thủ. Phản công nhanh là cách ghi điểm dễ nhất — phòng thủ tốt thường dẫn tới tấn công tốt.' },
      { note: 'Phòng thủ tốt = tấn công tốt. Cướp bóng rồi phản công nhanh là cách ghi điểm hiệu quả nhất.' },
    ],
    [
      { q: 'Đội em phòng thủ người kèm người nhưng đối thủ có một ngôi sao quá mạnh. Nên đổi sao?', a: 'Đổi sang phòng thủ khu vực, đặc biệt là zone 2-3 (2 người tuyến trên, 3 người tuyến dưới). Bịt hướng đột phá của ngôi sao, buộc họ ném xa hoặc chuyền cho đồng đội yếu hơn. Cả đội cùng vây vùng nguy hiểm thay vì để một người gánh.' },
      { q: 'Pick and roll của đội em hay thất bại. Lỗi thường nằm ở bước nào?', a: 'Hai lỗi phổ biến: (1) người chắn không chắn đủ chắc nên đối phương luồn qua được; (2) người cầm bóng không vòng đủ sát màn chắn nên đối thủ vẫn theo kịp. Sửa: chắn vững và đứng yên đúng luật, người cầm bóng đi sát "vai kề vai" với màn chắn.' },
      { q: 'Em phòng thủ hay phạm lỗi bằng tay. Cách phòng thủ đúng là gì?', a: 'Phòng thủ bằng VỊ TRÍ và đôi CHÂN, không bằng tay. Giữ trọng tâm thấp, di chuyển trượt ngang để luôn đứng giữa đối thủ và rổ. Tay chỉ dang để cản đường chuyền/ném, không với tay đánh bóng liều — đó là nguồn gốc các lỗi cá nhân.' },
    ]
  ),

  'S9GDTC-w12-quiz': L(
    'Bóng đá — Sút phạt',
    'Sút phạt là kỹ năng quyết định trong bóng đá hiện đại — từ đá phạt trực tiếp tới phạt đền (penalty). Kỹ thuật và tâm lý đều quan trọng.',
    ['Nắm luật đá phạt trực tiếp và penalty.', 'Biết kỹ thuật đá cong (curve) và sút có lực.', 'Hiểu vai trò của tâm lý khi đá penalty.'],
    [
      { h: 'Phân loại đá phạt' },
      { p: 'Đá phạt gồm hai loại chính: phạt trực tiếp (được sút thẳng vào khung thành tính bàn) và phạt gián tiếp (phải chạm một cầu thủ khác mới tính bàn). Penalty (phạt đền 11m) là một dạng phạt trực tiếp đặc biệt.' },
      { h: 'Đá phạt trực tiếp' },
      { ul: [
        'Cấp khi đối phương phạm lỗi nghiêm trọng (vào người, để bóng chạm tay).',
        'Hàng rào phòng ngự phải cách bóng tối thiểu 9,15m (10 yards).',
        'Bóng phải đứng yên trước khi đá; người sút chỉ được chạm bóng một lần.',
      ] },
      { h: 'Kỹ thuật đá cong (curve)' },
      { p: 'Đá bằng mu trong bàn chân, tiếp xúc LỆCH tâm bóng (vào nửa ngoài) để tạo xoáy. Bóng bay cong vòng qua hàng rào và lượn vào góc xa khung thành — nơi thủ môn khó với tới nhất.' },
      { h: 'Đặt chân trụ và follow-through' },
      { p: 'Chân trụ đặt ngay cạnh bóng, mũi chỉ về hướng định sút. Sau khi chạm bóng, chân sút tiếp tục vung theo hướng đi của bóng (follow-through) để giữ lực và độ chính xác. Dừng chân ngay tại điểm chạm sẽ mất lực.' },
      { h: 'Penalty 11m' },
      { p: 'Phạt đền tại chấm 11m, không có hàng rào, chỉ thủ môn cản. Người đá định hướng sút TRƯỚC khi đặt bóng và không nhìn thủ môn lúc chuẩn bị. Sút dứt khoát vào góc đã chọn.' },
      { note: 'Với penalty, tâm lý chiếm phần lớn thành công — bình tĩnh và quyết đoán là chìa khoá. Đắn đo, đổi ý phút chót thường dẫn tới hỏng ăn.' },
    ],
    [
      { q: 'Hàng rào cao, đá thẳng không vào được. Em chọn kiểu sút nào?', a: 'Đá cong (curve) bằng mu trong — bóng vòng qua hàng rào và lượn vào góc xa. Một lựa chọn khác là sút đập đất luồn dưới chân hàng rào khi họ nhảy lên. Quan trọng là đặt chân trụ chuẩn hướng và tạo đủ xoáy.' },
      { q: 'Em sút penalty hay run và đá hỏng. Khắc phục thế nào?', a: 'Định hướng đá vào một góc TRƯỚC khi đặt bóng và giữ nguyên quyết định đó. Hít sâu, không nhìn thủ môn, chạy đà đều và sút dứt khoát. Tâm lý quyết định phần lớn — đắn đo, đổi ý phút chót là nguyên nhân hỏng penalty.' },
      { q: 'Vì sao đá cong lại đưa bóng đi vòng được?', a: 'Khi chân chạm lệch tâm bóng, bóng vừa bay về trước vừa xoay tròn. Mặt bóng xoay tạo chênh lệch áp suất không khí hai bên, đẩy bóng lượn cong (hiệu ứng Magnus). Nhờ vậy bóng đi vòng qua hàng rào rồi bẻ vào góc khung thành.' },
    ]
  ),

  'S9GDTC-w13-quiz': L(
    'Bóng đá — Phòng thủ và tấn công',
    'Bóng đá hiện đại đề cao phối hợp tập thể — di chuyển và chạy chỗ quan trọng hơn kỹ thuật solo. Lớp 9 nắm cả phòng thủ, tấn công và luật cơ bản.',
    ['Hiểu phòng thủ cá nhân và phòng thủ đồng đội.', 'Nắm nguyên tắc tấn công phối hợp.', 'Hiểu luật việt vị và hệ thống thẻ phạt.'],
    [
      { h: 'Phòng thủ cá nhân và đồng đội' },
      { ul: [
        'Cá nhân: bám sát đối thủ, chặn đường chuyền, chọn thời điểm đoán bóng để cướp.',
        'Đồng đội: bọc lót cho nhau, dồn ép đối phương vào sát đường biên để hạn chế khoảng trống.',
      ] },
      { h: 'Kỹ thuật vào bóng (tackle)' },
      { p: 'Vào bóng đúng thời điểm là khi đối thủ vừa đẩy bóng ra khỏi chân, không phải sau khi họ đã chuyền đi (vào muộn = phạm lỗi). Trượt bóng (slide tackle) chỉ dùng khi chắc chắn chạm bóng trước, tránh phạm lỗi và chấn thương.' },
      { h: 'Tấn công phối hợp' },
      { p: 'Bóng đá hiện đại là chuyền – chạy chỗ – mở khoảng trống, không phải solo. Người KHÔNG có bóng phải chạy chỗ liên tục để tạo phương án chuyền. Phối hợp ngắn – nhanh hiệu quả hơn đá dài bóng bổng.' },
      { h: 'Luật việt vị' },
      { p: 'Cầu thủ tấn công đứng gần khung thành đối phương hơn cả bóng và cầu thủ phòng ngự áp chót, vào thời điểm đồng đội chuyền bóng cho mình = việt vị, pha bóng bị hủy. Luật này bảo vệ sự công bằng, chống "rình bóng" gần khung thành.' },
      { h: 'Hệ thống thẻ phạt' },
      { ul: [
        'Thẻ vàng: cảnh cáo (chơi xấu, kéo áo, phản ứng…).',
        'Thẻ đỏ: truất quyền thi đấu (lỗi nặng, hành vi bạo lực).',
        'Hai thẻ vàng trong một trận = một thẻ đỏ.',
      ] },
      { note: 'Bóng đá Việt Nam nên rèn phối hợp ngắn – nhanh, di chuyển không bóng nhiều, thay vì đá dài bóng bổng như lối chơi cũ.' },
    ],
    [
      { q: 'Em hay bị thẻ vàng vì vào bóng muộn. Khắc phục thế nào?', a: 'Tập timing vào bóng: chỉ vào khi đối thủ ĐANG chạm bóng, không phải sau khi họ đã chuyền đi. Tập trượt bóng (slide tackle) đúng kỹ thuật — chân chạm bóng trước, không chạm chân đối thủ. Khi không chắc, đứng cản đường thay vì lao vào liều.' },
      { q: 'Em bị bắt việt vị liên tục. Sửa thế nào?', a: 'Luôn quan sát vị trí hậu vệ áp chót của đối phương. Chỉ bứt phá khi bóng đã RỜI chân đồng đội, không xuất phát trước. Có thể tập "lùi xuống nhận bóng" rồi mới tăng tốc, thay vì đứng cao chờ bóng.' },
      { q: 'Vì sao phối hợp ngắn – nhanh lại được coi trọng hơn đá dài?', a: 'Phối hợp ngắn giữ được bóng tốt hơn, ít mất bóng, kéo đối phương ra khỏi vị trí và tạo khoảng trống. Đá dài bóng bổng tỉ lệ thành công thấp, phụ thuộc may rủi. Tuy nhiên đá dài vẫn hữu ích để đổi hướng tấn công nhanh khi đúng thời điểm.' },
    ]
  ),

  'S9GDTC-w14-quiz': L(
    'Ôn tập và kiểm tra giữa học kì I',
    'Tổng hợp kiến thức đã học trong nửa đầu HK1 — kỹ thuật cơ bản của nhiều môn thể thao và nguyên tắc an toàn.',
    ['Hệ thống hoá kiến thức nửa đầu HK1.', 'Tự đánh giá năng lực bản thân theo từng môn.', 'Nắm tiêu chí đánh giá giữa kì.'],
    [
      { h: 'Mục đích của ôn tập giữa kì' },
      { p: 'Ôn tập giúp các em hệ thống lại kiến thức, phát hiện môn còn yếu để tập trung cải thiện, và làm quen tiêu chí đánh giá. Không phải học thuộc lòng mà là hiểu để vận dụng vào trận đấu và bài kiểm tra thực hành.' },
      { h: 'Bảng tổng kết kiến thức' },
      { ul: [
        'Khởi động – hồi tĩnh – sơ cứu RICE: bắt buộc với mọi buổi tập.',
        'Chạy bền: nền ưa khí + nhịp thở đều + pacing hợp lý.',
        'Đá cầu: tâng cầu + ba lối đá (mu, má trong, má ngoài) + thi đấu đơn/đôi.',
        'Cầu lông: các cú đánh nâng cao + đội hình đôi tấn công/phòng thủ.',
        'Bóng chuyền: đập bóng + chắn lưới + tiếp đất an toàn.',
        'Bóng rổ: BEEF khi ném + người kèm người / khu vực + pick and roll.',
        'Bóng đá: sút phạt + việt vị + thẻ phạt.',
      ] },
      { h: 'Tiêu chí đánh giá giữa kì' },
      { p: 'Đánh giá kỹ thuật (khoảng 60%) + thể lực (30%) + thái độ (10%). Tích cực tham gia, thực hiện đúng kỹ thuật, biết tự sửa lỗi và tinh thần hợp tác đều được tính điểm.' },
      { h: 'Cách tự đánh giá' },
      { p: 'Em tự chấm điểm 0–10 cho từng môn ở ba mặt: kỹ thuật, thể lực, hiểu luật. Môn nào điểm thấp nhất sẽ là trọng tâm tập luyện thời gian tới.' },
      { note: 'Đừng học gạo lý thuyết — phải biết áp dụng vào tình huống thực tế trên sân. Kiểm tra thực hành mới là phần chính.' },
    ],
    [
      { q: 'Đề: "Phân biệt chắn đơn và chắn đôi trong bóng chuyền."', a: 'Chắn đơn (single) là một người chắn lưới; chắn đôi (double) là hai người chắn cạnh nhau. Chắn đôi hiệu quả hơn nhờ bịt kín diện tích lưới, nhưng để hở phần sân nhiều hơn nên hàng sau phải bọc lót tốt. Dùng chắn đôi khi đối phương có tay đập mạnh.' },
      { q: 'Đề: "Nguyên tắc BEEF trong ném rổ là gì?"', a: 'B – Balance (cân bằng, chân rộng bằng vai), E – Eyes (mắt nhìn vành rổ), E – Elbow (khuỷu thẳng dưới bóng), F – Follow-through (vẩy cổ tay sau khi ném, ngón tay chỉ vào rổ). Đây là bốn yếu tố của một cú ném chuẩn.' },
      { q: 'Em tự chấm: chạy bền 6/10, đá cầu 8/10, bóng rổ 5/10. Lập kế hoạch cải thiện?', a: 'Ưu tiên bóng rổ (yếu nhất): tập 3 buổi/tuần kỹ thuật ném BEEF + dẫn bóng. Duy trì chạy bền 2 buổi/tuần để nâng dần. Đá cầu chỉ cần 1 buổi giữ phong độ. Sau vài tuần đo lại, kỳ vọng bóng rổ lên 7/10.' },
    ]
  ),

  'S9GDTC-w15-quiz': L(
    'Võ thuật — Giới thiệu Vovinam',
    'Vovinam – Việt Võ Đạo là môn võ thuần Việt do võ sư Nguyễn Lộc sáng lập năm 1938 tại Hà Nội. Đây là niềm tự hào của võ thuật Việt Nam.',
    ['Hiểu lịch sử và triết lý Vovinam.', 'Nhận biết đặc trưng kỹ thuật của môn võ.', 'Hiểu ý nghĩa của lễ tiết và võ đạo.'],
    [
      { h: 'Lịch sử Vovinam' },
      { p: 'Võ sư Nguyễn Lộc (1912–1960) sáng lập Vovinam năm 1938 tại Hà Nội, trên cơ sở tinh hoa võ Việt kết hợp tiếp thu hợp lý võ thuật nước ngoài. "Vovinam" là cách viết tắt của Võ Việt Nam; tên đầy đủ là Vovinam – Việt Võ Đạo. Hiện môn võ có mặt tại hơn 60 quốc gia trên thế giới.' },
      { h: 'Triết lý "Cương nhu phối triển"' },
      { p: 'Đây là nguyên lý cốt lõi: Cương (cứng, mạnh) và Nhu (mềm, dẻo) phối hợp hài hoà. Khi đối thủ dùng lực cương thì mình nhu để hoá giải, khi đối thủ nhu thì mình cương để áp đảo. Linh hoạt thích ứng theo tình huống chứ không cứng nhắc một lối.' },
      { h: 'Đặc trưng kỹ thuật' },
      { ul: [
        'Đòn chân tấn công (đòn chân số 1–21), đặc biệt là các thế đá bay kẹp cổ độc đáo.',
        'Đòn tay phối hợp: đấm, chặt, gạt, chỏ.',
        'Đòn vật, khoá, gỡ để khống chế đối thủ mà không nhất thiết gây thương tích.',
      ] },
      { h: 'Hệ thống đai' },
      { p: 'Vovinam dùng màu đai theo cấp: xanh (nhập môn) → vàng → đỏ → trắng (cao nhất). Màu xanh tượng trưng hy vọng, vàng là võ đạo thấm vào da thịt, đỏ là máu đào nhiệt huyết, trắng là tinh khiết tột cùng.' },
      { h: 'Lễ tiết và võ đạo' },
      { p: 'Trước và sau buổi tập đều chào sư phụ, chào đồng môn; kính trên nhường dưới. Vovinam đề cao đạo đức — luyện võ không phải để hơn thua mà để rèn thân, rèn tâm và phục vụ điều thiện.' },
      { note: 'Bàn tay thép đặt trên trái tim từ ái — biểu tượng của Vovinam: sức mạnh đi cùng lòng nhân.' },
    ],
    [
      { q: '"Cương nhu phối triển" trong thực tế nghĩa là gì?', a: 'Khi đối thủ dùng lực mạnh đẩy mình, mình không chống cứng mà nương theo lực (nhu) để hoá giải, rồi mới phản đòn (cương). Như nước: gặp đá thì mềm mại lách qua, nhưng khi chảy mạnh thì xói mòn được cả đá. Linh hoạt theo tình huống mới là tinh thần Vovinam.' },
      { q: 'Vì sao Vovinam bắt buộc lễ tiết?', a: 'Vì võ đạo không chỉ là kỹ thuật mà còn là đạo đức. Người luyện võ mà kiêu ngạo, thiếu lễ độ dễ dùng võ sai mục đích, gây hại cho người khác. Lễ tiết rèn nhân cách, lòng khiêm tốn và sự tôn trọng — đó mới là gốc của võ.' },
      { q: 'Vovinam khác võ ngoại quốc ở điểm nổi bật nào?', a: 'Vovinam là võ thuần Việt, mang bản sắc dân tộc, nổi tiếng với các đòn chân tấn công (đòn chân bay kẹp cổ) gần như độc đáo. Triết lý "Cương nhu phối triển" và tinh thần "bàn tay thép trên trái tim từ ái" thể hiện đậm nét văn hoá và đạo lý Việt Nam.' },
    ]
  ),

  'S9GDTC-w16-quiz': L(
    'Võ thuật — Vovinam bài quyền nhập môn',
    'Bài quyền nhập môn là chuỗi động tác cơ bản dành cho người mới — học để thuộc tấn pháp và phối hợp đòn tay – chân.',
    ['Nắm bốn tấn pháp cơ bản.', 'Hiểu các yếu tố cần có khi luyện quyền.', 'Biết cách luyện từ chậm đến nhanh để có lực.'],
    [
      { h: 'Tấn pháp là nền của võ thuật' },
      { p: 'Tấn pháp là cách đứng tấn — nền tảng để ra đòn có lực và giữ thăng bằng. Tấn vững thì đòn mới mạnh; tấn yếu thì dù tay nhanh đến đâu cũng "rỗng". Vì vậy người mới phải luyện tấn trước khi học đòn.' },
      { h: 'Bốn tấn pháp cơ bản' },
      { ul: [
        'Trung bình tấn: hai chân rộng hơn vai, gối chùng, thân thẳng, trọng tâm chia đều — tấn nền tảng.',
        'Đinh tấn: chân trước chùng, chân sau thẳng, trọng tâm dồn trước — tấn để tấn công.',
        'Hạc tấn: đứng một chân, chân kia co lên — tấn linh hoạt, né và đá.',
        'Quỳ tấn (toạ tấn): một gối hạ gần đất, tấn thấp để né đòn và phản công.',
      ] },
      { h: 'Bốn yếu tố luyện quyền' },
      { p: 'Một bài quyền tốt cần: tập trung tinh thần + chính xác động tác + có lực + đúng nhịp. Người mới hay sai ở "chính xác" và "lực" — phải luyện chậm rãi đến khi thuộc và đúng, rồi mới tăng tốc.' },
      { h: 'Luyện từ chậm đến nhanh' },
      { p: 'Đánh quyền nhanh mà không có lực là vì đánh "rỗng", không truyền lực từ chân lên. Hãy đánh chậm trước để cảm nhận lực đi từ tấn → hông → vai → tay; khi đã đúng đường lực mới tăng dần tốc độ.' },
      { h: 'Hô khí (kiai) và hơi thở' },
      { p: 'Khi ra đòn quyết định, thở mạnh ra kèm tiếng hô để dồn lực và siết cơ bụng — vừa tăng sức mạnh đòn vừa bảo vệ thân. Hít vào khi thu đòn, thở ra khi phát đòn.' },
      { note: 'Bài quyền nhập môn là "ngữ pháp" của Vovinam — không thuộc nó thì không học sâu hơn được. Kiên trì luyện đúng từng động tác.' },
    ],
    [
      { q: 'Em tập trung bình tấn 5 phút thì đùi đau. Có bình thường không?', a: 'Bình thường — vì đùi trước phải làm việc để giữ thân ở tư thế tấn thấp. Hãy tăng dần thời gian: tuần 1 giữ 2 phút, tuần 2 giữ 3 phút… đến khi giữ được 8–10 phút mới đủ nền. Đùi mỏi là dấu hiệu cơ đang khoẻ lên.' },
      { q: 'Quyền của em đánh nhanh nhưng không có lực. Vì sao?', a: 'Vì em đánh "rỗng" — chỉ vung tay mà không truyền lực từ chân lên. Phải đánh chậm trước, cảm nhận lực đi từ tấn → hông → vai → tay; khi đường lực đã đúng mới tăng tốc. Lực thực sự đến từ tấn vững và chuỗi truyền lực toàn thân.' },
      { q: 'Khi nào dùng quỳ tấn (toạ tấn)?', a: 'Quỳ tấn dùng để hạ thấp người né đòn tấn công vào phần trên (đấm, đá cao) rồi phản công vào phần dưới đối thủ, hoặc để giữ thăng bằng khi ra đòn thấp. Đây là tấn thấp linh hoạt, giúp thay đổi độ cao bất ngờ làm đối thủ khó đoán.' },
    ]
  ),

  'S9GDTC-w17-quiz': L(
    'Võ thuật — Karatedo',
    'Karatedo là môn võ có nguồn gốc Okinawa (Nhật Bản), phổ biến toàn cầu và hiện là môn thi đấu Olympic.',
    ['Hiểu lịch sử và triết lý Karatedo.', 'Nắm bốn nhóm kỹ thuật cơ bản.', 'Hiểu hệ thống đai và ý nghĩa của kata.'],
    [
      { h: 'Lịch sử Karatedo' },
      { p: 'Karate phát triển từ Okinawa (Nhật Bản), kết hợp võ bản địa "Te" với Kung Fu Trung Hoa. "Karate" nghĩa là "không thủ" (tay không), "Karatedo" là đạo dùng tay không. Võ sư Funakoshi Gichin (1868–1957) có công đưa Karate ra toàn Nhật Bản và thế giới.' },
      { h: 'Bốn nhóm kỹ thuật cơ bản' },
      { ul: [
        'Tsuki (đấm): đấm thẳng (oi-tsuki, gyaku-tsuki), đấm móc (kagi-tsuki).',
        'Keri (đá): đá thẳng (mae-geri), đá vòng (mawashi-geri), đá hậu (ushiro-geri).',
        'Uke (đỡ): đỡ trên (jodan-uke), đỡ giữa (chudan-uke), đỡ dưới (gedan-barai).',
        'Kata (quyền): chuỗi kỹ thuật tổ hợp mô phỏng giao đấu với nhiều đối thủ tưởng tượng.',
      ] },
      { h: 'Kata và kumite' },
      { p: 'Karate có hai mảng thi đấu: kata (biểu diễn bài quyền, chấm điểm kỹ thuật và sức mạnh) và kumite (đối kháng có kiểm soát). Tập kata giúp thuộc kỹ thuật và rèn tinh thần; kumite rèn phản xạ và ứng dụng thực chiến.' },
      { h: 'Hệ thống đai và thăng cấp' },
      { p: 'Đai theo thứ tự phổ biến: trắng → vàng → cam → xanh → tím → nâu → đen (đen chia 1–10 dan). Lên đai phải thi: kỹ thuật cơ bản + kata + kumite nhẹ. Tiêu chí là thuộc và đúng, không phải nhanh hay mạnh.' },
      { h: 'Triết lý "Karate ni sente nashi"' },
      { p: 'Câu nói nổi tiếng của Funakoshi: "Karate ni sente nashi" — Karate không ra đòn trước, chỉ phòng vệ. Người luyện Karate phải biết kiềm chế, không gây sự, chỉ dùng võ khi buộc phải tự vệ.' },
      { note: 'Karate trở thành môn thi đấu Olympic chính thức từ năm 2020 (Olympic Tokyo). Việt Nam có nhiều vận động viên Karate đạt thành tích cao ở khu vực và châu lục.' },
    ],
    [
      { q: '"Karate ni sente nashi" trong thực tế nghĩa là gì?', a: 'Nghĩa là không ra đòn tấn công trước, chỉ phản công khi bị tấn công. Người luyện Karate phải kiềm chế, không gây sự, không dùng bạo lực vô cớ. Đây là chuẩn mực đạo đức của võ sĩ — sức mạnh phải đi cùng sự tự chủ.' },
      { q: 'Em đang đai trắng, bao lâu thì lên đai vàng?', a: 'Trung bình 3–6 tháng tập đều 2–3 buổi/tuần. Phải thi đủ: kỹ thuật cơ bản (tsuki, keri, uke), một bài kata đơn giản và kumite nhẹ. Quan trọng là thực hiện đúng và thuộc kỹ thuật, không phải đánh nhanh hay mạnh.' },
      { q: 'Tập kata có ích gì nếu nó chỉ là "đánh gió" với đối thủ tưởng tượng?', a: 'Kata giúp ghi nhớ và chuẩn hoá kỹ thuật, rèn tấn pháp, hơi thở, sức mạnh và sự tập trung. Mỗi động tác trong kata là một tình huống tự vệ thật được mã hoá. Thuộc kata vững thì khi vào kumite (đối kháng) phản xạ ra đòn mới đúng và nhanh.' },
    ]
  ),

  'S9GDTC-w18-quiz': L(
    'Ôn tập học kì I',
    'Tổng kết toàn bộ học kì I — chuẩn bị cho bài kiểm tra cuối kì và định hướng tập luyện học kì II.',
    ['Hệ thống hoá kiến thức cả học kì I.', 'Tự đánh giá tiến bộ cá nhân.', 'Lập định hướng tập luyện cho học kì II.'],
    [
      { h: 'Ý nghĩa của ôn tập cuối kì' },
      { p: 'Đây là dịp nhìn lại toàn bộ một học kì: những gì đã thành thạo, những gì còn yếu. Năm lớp 9 việc tự đánh giá càng quan trọng vì các em cần biết môn nào cần củng cố để chuẩn bị bài kiểm tra thể lực vào 10 ở học kì II.' },
      { h: 'Các chủ đề chính học kì I' },
      { ul: [
        'Khởi động – hồi tĩnh – sơ cứu RICE.',
        'Chạy bền: kỹ thuật + nhịp thở + ba phương pháp tập (đều, biến tốc, ngắt quãng).',
        'Đá cầu: tâng cầu + ba lối đá + thi đấu đơn/đôi.',
        'Cầu lông: cú đánh nâng cao + đội hình đôi.',
        'Bóng chuyền: đập bóng + chắn lưới.',
        'Bóng rổ: BEEF + người kèm người/khu vực + pick and roll.',
        'Bóng đá: sút phạt + việt vị + thẻ phạt.',
        'Võ thuật: Vovinam (cương nhu phối triển) + Karatedo (bốn nhóm kỹ thuật).',
      ] },
      { h: 'Tự đánh giá cá nhân' },
      { p: 'Tự chấm 0–10 cho từng môn ở ba mặt: kỹ thuật, thể lực, hiểu luật. Lập danh sách môn mạnh – môn yếu. Môn yếu nhất là trọng tâm tập luyện đầu học kì II.' },
      { h: 'Định hướng học kì II' },
      { p: 'Học kì II tập trung vào bơi và kỹ năng an toàn dưới nước, nâng cao các môn bóng, võ thuật, cùng các chủ đề sức mạnh – linh hoạt – dinh dưỡng. Đặc biệt là luyện chạy 1500m chuẩn bị kiểm tra thể lực vào 10.' },
      { note: 'Mục tiêu xuyên suốt: vượt qua bài kiểm tra thể lực vào 10 và giữ thói quen tập luyện đều đặn suốt đời.' },
    ],
    [
      { q: 'Em tự chấm: chạy bền 6/10, đá cầu 8/10, bóng rổ 5/10. Kế hoạch học kì II?', a: 'Tập trung bóng rổ 3 buổi/tuần (BEEF + dẫn bóng + ném rổ). Duy trì chạy bền 2 buổi/tuần để nâng dần, hướng tới bài thi vào 10. Đá cầu chỉ cần 1 buổi giữ phong độ. Cuối học kì II đo lại — kỳ vọng bóng rổ lên ít nhất 7/10.' },
      { q: 'Triết lý xuyên suốt học kì I là gì?', a: 'An toàn trước thành tích — kỹ thuật đúng trước sức mạnh — tập đều đặn và tăng tiến dần. Thể thao là cuộc chơi cả đời, không phải gắng sức ngắn hạn rồi bỏ. Ba nguyên tắc này theo em suốt quá trình tập luyện.' },
      { q: 'Vì sao học kì II phải đặc biệt chú trọng chạy 1500m?', a: 'Vì chạy bền (thường 1500m hoặc 800m) là nội dung kiểm tra thể lực tuyển sinh vào 10 ở nhiều địa phương. Chuẩn bị sớm từ đầu học kì II với kế hoạch tăng tiến giúp em đạt thành tích tốt, tránh "nước đến chân mới nhảy" gây quá tải, chấn thương.' },
    ]
  ),

  'S9GDTC-w19-quiz': L(
    'Bơi sải — Kỹ thuật cơ bản',
    'Bơi sải (freestyle/trườn sấp) là kiểu bơi nhanh nhất — đồng thời là kỹ năng sống thiết yếu, đặc biệt với học sinh Việt Nam.',
    ['Nắm bốn yếu tố kỹ thuật bơi sải.', 'Biết phối hợp hô hấp đồng bộ với động tác tay.', 'Hiểu vì sao bơi sải nhanh nhất.'],
    [
      { h: 'Vì sao học bơi là kỹ năng sống?' },
      { p: 'Việt Nam có nhiều sông ngòi, ao hồ, biển và đuối nước là nguyên nhân tử vong hàng đầu ở trẻ em. Biết bơi không chỉ để rèn thể chất mà còn để tự bảo vệ tính mạng. Bơi sải là kiểu nhanh, hiệu quả, nên học sớm.' },
      { h: 'Bốn yếu tố kỹ thuật bơi sải' },
      { ul: [
        'Tư thế thân: nằm ngang, thẳng, sát mặt nước, không nhô cao — giảm sức cản nước.',
        'Động tác tay: hai tay vung luân phiên qua đầu, vào nước bằng đầu ngón, kéo nước qua thân rồi đẩy nước về sau.',
        'Động tác chân: đập chân (flutter kick) nhanh đều, gối hơi gập, cổ chân thả lỏng.',
        'Đầu: úp xuống nước, mắt nhìn đáy bể, chỉ quay nghiêng khi cần hít thở.',
      ] },
      { h: 'Hô hấp đồng bộ' },
      { p: 'Quay đầu sang ngang khi tay cùng bên vung qua đầu để hít vào nhanh; khi đầu úp xuống thì thở ra từ từ dưới nước. Tuyệt đối không ngẩng đầu thẳng lên để thở — đó là lỗi làm chìm chân, tốn sức.' },
      { h: 'Phối hợp tay – chân – thở' },
      { p: 'Một chu kỳ bơi sải gồm: tay này kéo nước trong khi tay kia vung trên không, chân đập đều liên tục (thường 6 nhịp chân / 2 nhịp tay), và hít thở cứ vài nhịp tay một lần. Phối hợp nhịp nhàng giúp bơi êm và bền.' },
      { h: 'An toàn khi tập bơi' },
      { ul: [
        'Khởi động kỹ trên bờ trước khi xuống nước.',
        'Bơi nơi có cứu hộ hoặc người lớn quan sát; không bơi một mình.',
        'Không xuống nước khi quá đói hoặc quá no; kiểm tra độ sâu trước khi xuống.',
      ] },
      { note: 'Người mới hay bị "trầm" (chìm chân) do ngẩng đầu cao và đập chân chậm. Tập thả lỏng, úp đầu sâu và đập chân đều để thân nổi ngang.' },
    ],
    [
      { q: 'Em bơi sải mệt nhanh, chưa được 25m đã hết hơi. Nguyên nhân và cách sửa?', a: 'Thường do thở sai (hít ngắn, thở ra không hết) hoặc ngẩng đầu cao gây cản nước và chìm chân. Sửa: úp đầu sâu hơn, thở ra DÀI và hết dưới nước, hít nhanh một nhịp khi quay đầu. Khi tư thế thân ngang và thở đều, em sẽ bơi xa hơn nhiều.' },
      { q: 'Vì sao bơi sải là kiểu nhanh nhất?', a: 'Vì hai tay kéo nước LUÂN PHIÊN liên tục, không có pha trượt nghỉ như bơi ếch, nên lực đẩy gần như không gián đoạn. Thêm vào đó, tư thế thân nằm ngang sát mặt nước giảm tối đa sức cản. Hai yếu tố này khiến bơi sải nhanh nhất trong các kiểu bơi.' },
      { q: 'Em hay bị chìm chân khi bơi sải. Khắc phục thế nào?', a: 'Chìm chân thường do ngẩng đầu cao hoặc đập chân yếu/chậm. Hãy úp đầu nhìn đáy bể để thân nằm ngang, đập chân (flutter kick) đều và liên tục từ hông xuống, cổ chân thả lỏng. Có thể tập riêng đập chân với phao trước để quen nhịp.' },
    ]
  ),

  'S9GDTC-w20-quiz': L(
    'Bơi ếch — Kỹ thuật cơ bản',
    'Bơi ếch (breaststroke) là kiểu bơi chậm nhất nhưng ít tốn sức — phù hợp bơi đường dài, bơi quan sát và cứu hộ.',
    ['Hiểu chu kỳ động tác tay – chân của bơi ếch.', 'Nắm kỹ thuật đạp ếch (frog kick).', 'Biết phối hợp hô hấp đồng bộ và khi nào nên dùng bơi ếch.'],
    [
      { h: 'Đặc điểm của bơi ếch' },
      { p: 'Bơi ếch là kiểu đối xứng: hai tay và hai chân làm động tác giống nhau cùng lúc. Có pha "trượt" (lướt) sau mỗi chu kỳ nên chậm hơn bơi sải, nhưng đỡ tốn sức và cho phép ngẩng đầu quan sát — rất hữu ích trong nhiều tình huống.' },
      { h: 'Chu kỳ động tác bơi ếch' },
      { ul: [
        'Pha trượt: hai tay duỗi thẳng trước, hai chân duỗi thẳng sau, thân lướt tới.',
        'Tay tách ra ngoài và đẩy nước về sau – sang ngang, đồng thời đầu nhô lên hít vào.',
        'Tay co về trước ngực trong khi chân co gối và xoay bàn chân ra ngoài.',
        'Tay duỗi thẳng về trước đồng thời chân đạp ếch mạnh ra sau — trở lại pha trượt.',
      ] },
      { h: 'Kỹ thuật đạp ếch (frog kick)' },
      { p: 'Co gối kéo gót về phía mông, xoay mũi bàn chân ra ngoài, rồi đạp mạnh ra sau theo vòng cung và khép hai chân lại ở cuối nhịp. Điểm mấu chốt là XOAY bàn chân ra ngoài — nếu không, lực đẩy sẽ yếu.' },
      { h: 'Hô hấp' },
      { p: 'Đầu nhô lên hít vào khi hai tay đẩy nước về sau (lúc thân được nâng lên tự nhiên); úp mặt xuống thở ra trong pha trượt. Nhịp thở khớp với chu kỳ tay – chân: một chu kỳ một lần thở.' },
      { h: 'Vai trò của pha trượt' },
      { p: 'Sau khi đạp chân, phải DUỖI thẳng người và lướt khoảng một giây trước khi bắt đầu chu kỳ mới. Pha trượt tận dụng quán tính, giúp tiết kiệm sức — bỏ pha trượt (co duỗi liên tục) làm bơi tốn sức mà không nhanh hơn.' },
      { note: 'Bơi ếch chậm hơn sải vì có pha trượt và động tác đối xứng không liên tục kéo nước; bù lại nó bền sức và dễ quan sát xung quanh.' },
    ],
    [
      { q: 'Em bơi ếch nhưng không tiến tới nhanh. Sai ở đâu?', a: 'Thường do đạp chân sai: không xoay bàn chân ra ngoài nên lực đẩy rất yếu; hoặc bỏ pha trượt, cứ co duỗi liên tục. Sửa: xoay mũi chân ra ngoài rồi đạp mạnh khép chân; đạp xong DUỖI thẳng người lướt một giây mới co lại cho chu kỳ tiếp.' },
      { q: 'Bơi ếch phù hợp dùng khi nào?', a: 'Khi bơi đường dài (ít tốn sức), khi cần ngẩng đầu quan sát xung quanh, và đặc biệt khi bơi cứu hộ (vừa giữ đầu cao quan sát, vừa đẩy nạn nhân về bờ). Cũng phù hợp để "nghỉ tích cực" khi đã mệt sau khi bơi sải.' },
      { q: 'Vì sao xoay bàn chân ra ngoài lại quan trọng khi đạp ếch?', a: 'Khi bàn chân xoay ra ngoài, lòng bàn chân và mặt trong cẳng chân hướng về sau, tạo "mái chèo" lớn đẩy được nhiều nước. Nếu mũi chân duỗi thẳng như bơi sải, chỉ có mu chân chạm nước nên lực đẩy rất yếu, người gần như không tiến.' },
    ]
  ),

  'S9GDTC-w21-quiz': L(
    'An toàn dưới nước và cứu đuối',
    'Đuối nước là nguyên nhân tử vong hàng đầu ở trẻ em Việt Nam. Lớp 9 phải nắm vững quy tắc an toàn và cách cứu đuối gián tiếp.',
    ['Biết kiểm tra an toàn trước khi xuống nước.', 'Xử lý được chuột rút và tình huống khẩn cấp dưới nước.', 'Nắm nguyên tắc cứu đuối an toàn cho bản thân.'],
    [
      { h: 'Mức độ nghiêm trọng của đuối nước' },
      { p: 'Mỗi năm Việt Nam có hàng nghìn trẻ em tử vong vì đuối nước. Phần lớn xảy ra ở nơi không có cứu hộ, khi trẻ tự ý xuống nước hoặc liều mình cứu bạn. Vì vậy kiến thức an toàn dưới nước là kỹ năng sống bắt buộc.' },
      { h: 'Trước khi xuống nước' },
      { ul: [
        'Khởi động kỹ 10 phút trên bờ, đặc biệt cổ chân, cổ tay, gáy.',
        'Không xuống nước khi quá đói hoặc quá no (chờ 1–2 giờ sau ăn).',
        'Kiểm tra độ sâu trước; không nhảy cắm đầu xuống chỗ nước nông hoặc không rõ độ sâu.',
        'Chỉ bơi nơi có cứu hộ hoặc người lớn quan sát; không bơi một mình.',
      ] },
      { h: 'Xử lý chuột rút dưới nước' },
      { p: 'Bình tĩnh, KHÔNG hoảng loạn. Nổi ngửa để giữ hơi, dùng tay kéo bàn chân về phía thân và bóp nhẹ cơ bị rút (bắp chân: kéo mũi chân về phía gối). Sau khoảng 30 giây thường đỡ, sau đó bơi chậm rãi vào bờ và nghỉ.' },
      { h: 'Nguyên tắc cứu đuối an toàn' },
      { ul: [
        'Gọi to để báo người lớn và gọi cấp cứu 115.',
        'Ưu tiên cứu gián tiếp: ném phao, áo, dây, sào cho nạn nhân — KHÔNG tự lao xuống nếu chưa được huấn luyện.',
        'Nếu buộc phải xuống nước, tiếp cận nạn nhân từ phía SAU, đỡ cằm để giữ mặt họ trên mặt nước.',
        'Lên bờ: kiểm tra hô hấp; nếu ngừng thở/ngừng tim, hô hấp nhân tạo và ép tim ngoài lồng ngực.',
      ] },
      { h: 'Quy tắc vàng của cứu đuối' },
      { p: '"Tự bảo vệ trước khi cứu người khác". Rất nhiều ca cứu hộ tự phát bị nạn nhân hoảng loạn ôm chặt kéo theo, dẫn đến cả hai cùng đuối. Người chưa được huấn luyện chỉ nên cứu gián tiếp từ trên bờ.' },
      { note: 'Ghi nhớ trình tự cứu đuối an toàn cho người chưa được huấn luyện: GỌI – NÉM – KHÔNG NHẢY. Gọi người lớn/115, ném vật nổi, không tự lao xuống nước.' },
    ],
    [
      { q: 'Bạn em chới với giữa hồ, em chỉ biết bơi cơ bản. Em làm gì?', a: 'TUYỆT ĐỐI không tự lao xuống. Hô to gọi người lớn và gọi 115. Tìm vật nổi (phao, can nhựa), cây sào, áo dài hoặc dây — ném/đưa cho bạn để bạn bám rồi kéo vào. Nếu không có gì, chạy gọi người biết bơi và cứu hộ ngay. Tự lao xuống khi chưa được huấn luyện rất dễ thành nạn nhân thứ hai.' },
      { q: 'Em bị chuột rút bắp chân khi đang bơi giữa hồ. Xử lý thế nào?', a: 'Bình tĩnh, nổi ngửa để giữ hơi, KHÔNG hoảng loạn. Dùng tay kéo mũi bàn chân về phía thân và bóp mạnh bắp chân bị rút. Sau khoảng 30 giây cơ giãn ra, em bơi chậm rãi vào bờ và nghỉ ngơi. Nếu gần người lớn/cứu hộ thì gọi hỗ trợ.' },
      { q: 'Nếu buộc phải xuống nước cứu người, vì sao phải tiếp cận từ phía sau?', a: 'Vì người đang đuối thường hoảng loạn, sẽ ôm chặt bất cứ thứ gì chạm vào và có thể dìm cả người cứu. Tiếp cận từ phía SAU giúp người cứu giữ được nạn nhân (đỡ cằm để mặt nổi trên nước) mà tránh bị ôm ghì kéo xuống. Tuy nhiên đây chỉ dành cho người đã được huấn luyện cứu hộ.' },
    ]
  ),

  'S9GDTC-w22-quiz': L(
    'Đá cầu — Thi đấu nâng cao',
    'Lớp 9 thi đấu đá cầu ở trình độ nâng cao — kết hợp các cú tấn công hiểm và chiến thuật phối hợp trong trận đôi.',
    ['Biết các cú tấn công nâng cao.', 'Nắm chiến thuật phòng thủ và phối hợp trong trận đôi.', 'Hiểu cách phá nhịp đối thủ bằng đa dạng cú đá.'],
    [
      { h: 'Các cú tấn công nâng cao' },
      { ul: [
        'Đá quét (đá móc qua đầu): chân quét ngang qua đầu đập cầu xuống — mạnh, hiểm, rất khó đỡ.',
        'Đá mu cao và xa: tấn công khi cầu ở giữa sân, đẩy đối thủ về cuối sân.',
        'Đá lừa (giả động tác): giả vờ đá hướng A rồi đổi hướng B vào phút cuối.',
      ] },
      { h: 'Kết hợp mạnh – nhẹ để phá nhịp' },
      { p: 'Nếu chỉ đập mạnh, đối thủ sẽ quen và đứng lùi để đỡ. Phải xen kẽ cú đập mạnh (smash) với cú thả nhẹ sát lưới (drop) để buộc đối thủ liên tục di chuyển tiến – lùi, mất nhịp và lộ khoảng trống.' },
      { h: 'Phòng thủ chủ động' },
      { p: 'Khi bị tấn công, đỡ cầu cao và xa (defensive lob) để có thời gian phục hồi vị trí trung tâm. Không cố đập trả ngay khi đang mất thăng bằng — sẽ hỏng cầu hoặc bị phản công ngay.' },
      { h: 'Chiến thuật trận đôi nâng cao' },
      { p: 'Phân vai rõ: một người chuyên tấn công (cú mạnh, bật cao), một người chuyên phòng thủ và chuyền cầu chính xác. Khi cầu sang sân, người ở vị trí thuận xử lý, người kia di chuyển bù. Đổi vai linh hoạt khi cầu rơi lệch trái – phải.' },
      { h: 'Tâm lý và thể lực trong trận' },
      { p: 'Trận nâng cao kéo dài, người giữ được bình tĩnh và thể lực đến cuối thường thắng. Không nóng vội tung hết đòn mạnh ngay đầu trận; phân bổ sức và giữ cái đầu lạnh ở các điểm quyết định.' },
      { note: 'Đá cầu Việt Nam dẫn đầu nhiều kỳ SEA Games — đây là môn thể thao thuần Việt mà các em nên tự hào tập luyện và phát huy.' },
    ],
    [
      { q: 'Em đập cầu xuống mạnh nhưng đối thủ vẫn đỡ được. Vì sao?', a: 'Thường do em đập vào điểm dễ phán đoán (giữa sân) hoặc đập đơn điệu một kiểu. Phải đập vào GÓC TRỐNG, kết hợp cú lừa hướng và xen kẽ đập mạnh – thả nhẹ (drop) để đối thủ rối nhịp, không kịp về vị trí đỡ.' },
      { q: 'Đôi em rạn nứt vì đồng đội yếu hơn. Khắc phục thế nào?', a: 'Em nhận vai phòng thủ và chuyền cầu cao, chính xác để đồng đội tấn công dứt điểm. Tuyệt đối không trách mắng — động viên là chìa khoá giữ tinh thần. Tập riêng cùng đồng đội 2 buổi/tuần để nâng độ ăn ý; đôi mạnh là đôi phối hợp tốt, không phải hai cá nhân giỏi rời rạc.' },
      { q: 'Vì sao cần xen kẽ cú mạnh và cú nhẹ thay vì đập mạnh liên tục?', a: 'Vì nếu chỉ đập mạnh, đối thủ sẽ đoán được và đứng lùi để đỡ. Xen cú thả nhẹ sát lưới buộc họ lao lên, rồi cú đập sâu buộc họ lùi lại — đối thủ liên tục di chuyển, mất thăng bằng và lộ khoảng trống để em dứt điểm. Đa dạng cú đá là cách phá nhịp hiệu quả nhất.' },
    ]
  ),

  'S9GDTC-w23-quiz': L(
    'Cầu lông — Chiến thuật đôi',
    'Cầu lông đôi ở trình độ nâng cao đòi hỏi chiến thuật chuyển đổi đội hình nhuần nhuyễn và các cú đánh lừa (deception).',
    ['Thành thạo chuyển đổi đội hình tấn công – phòng thủ.', 'Biết chọn thời điểm tấn công.', 'Hiểu và vận dụng các cú đánh lừa.'],
    [
      { h: 'Chuyển đổi đội hình — chìa khoá của đôi' },
      { ul: [
        'Tấn công: đội hình trước – sau. Người trước chặn lưới, người sau đập cầu.',
        'Phòng thủ: đội hình ngang. Mỗi người chia đôi sân để đỡ cú đập.',
        'Chuyển đổi nhanh giữa hai đội hình theo diễn biến — đây là kỹ năng khó nhất của đôi.',
      ] },
      { h: 'Khi nào tấn công' },
      { p: 'Tấn công khi đối thủ đang ở thế phòng thủ và cầu ở vị trí cao gần lưới: đập mạnh hoặc bỏ nhỏ sát lưới. Tấn công sai thời điểm (khi cầu thấp hoặc mình mất thăng bằng) sẽ làm mất quyền chủ động.' },
      { h: 'Nguyên tắc giao tiếp và di chuyển bù' },
      { p: 'Gọi rõ "Tôi/Bạn" ở các quả vào vùng giáp ranh. Khi một người dâng lên đập, người kia lập tức lùi xuống bọc lót hậu sân. Hai người luôn di chuyển "đồng pha" để không bỏ trống khu vực.' },
      { h: 'Đánh lừa (deception)' },
      { p: 'Đánh lừa là dùng động tác giả để đối thủ phán đoán sai. Ví dụ smash + drop: vung tay đầy đủ như sắp đập mạnh, nhưng giảm lực ở phút cuối để cầu rơi nhẹ sát lưới. Đối thủ đã lùi sâu chờ đập sẽ không kịp lên đỡ.' },
      { h: 'Đọc đối thủ' },
      { p: 'Quan sát điểm yếu của đối thủ: ai đỡ smash kém, ai di chuyển chậm, ai trái tay yếu — rồi tập trung tấn công vào điểm đó. Chiến thuật tốt là khai thác điểm yếu của đối phương chứ không chỉ phô diễn kỹ thuật.' },
      { note: 'Sự kiện cầu lông Việt Nam: Vietnam Open (cấp BWF), SEA Games, ASIAD. Nguyễn Tiến Minh từng là tay vợt số 1 Việt Nam, vào tốp đầu thế giới — tấm gương về sự bền bỉ.' },
    ],
    [
      { q: 'Đối thủ smash mạnh xuống. Đội em phòng thủ thế nào?', a: 'Chuyển ngay sang đội hình ngang, mỗi người phụ trách một nửa sân. Người gần cầu đỡ, cố đánh cao lên giữa sân để có thời gian phục hồi đội hình. Không cố trả mạnh khi đang bị động — ưu tiên đỡ an toàn rồi mới phản công.' },
      { q: 'Khi nào nên dùng cú đánh lừa smash + drop?', a: 'Khi đối thủ đã quen với cú smash thật của mình và bắt đầu lùi sâu để đỡ. Lúc đó vung tay đầy đủ như sắp smash nhưng giảm lực phút cuối để cầu rơi sát lưới (drop). Đối thủ đang lùi sẽ không kịp lao lên = mất điểm.' },
      { q: 'Đội em hay bị bỏ trống vùng sân khi một người dâng lên đập. Sửa thế nào?', a: 'Do hai người chưa di chuyển đồng pha. Quy tắc: khi một người dâng lên tấn công (đội hình trước – sau), người kia phải LÙI xuống bao quát hậu sân; khi chuyển sang phòng thủ thì cả hai dàn NGANG. Tập chuyển đổi đội hình liên tục để thành phản xạ tự động.' },
    ]
  ),

  'S9GDTC-w24-quiz': L(
    'Bóng chuyền — Phối hợp đội',
    'Bóng chuyền thi đấu 6 người mỗi sân — đòi hỏi phối hợp ăn ý giữa các vị trí với vai trò chuyên biệt.',
    ['Hiểu vai trò sáu vị trí, đặc biệt setter và libero.', 'Nắm luật cơ bản và cách tính điểm.', 'Biết tổ chức phòng thủ – tấn công theo đội.'],
    [
      { h: 'Bóng chuyền là môn của phối hợp' },
      { p: 'Khác các môn cá nhân, bóng chuyền 6 người cần phân vai rõ và phối hợp ba chạm (đỡ – chuyền – đập) thật ăn ý. Một đội kỹ thuật cá nhân khá nhưng phối hợp rời rạc vẫn thua đội trung bình mà gắn kết.' },
      { h: 'Sáu vị trí và vai trò' },
      { ul: [
        'Chuyền hai (setter): "nhạc trưởng" — chuyền bóng bước hai cho tay đập tấn công.',
        'Chủ công (outside hitter): tay đập chính ở hai biên.',
        'Phụ công / chắn giữa (middle blocker): chuyên chắn lưới và tấn công nhanh ở giữa.',
        'Đối chuyền (opposite): tay đập bên phải, đối diện setter.',
        'Libero: chuyên phòng thủ hàng sau, mặc áo khác màu, không được phát và không được đập trên lưới.',
      ] },
      { h: 'Luật cơ bản' },
      { ul: [
        '6 người mỗi sân.',
        'Mỗi set tính tới 25 điểm, hơn 2 điểm (set 5 quyết định tới 15 điểm).',
        'Trận thắng 3/5 set.',
        'Mỗi đội tối đa 3 lần chạm bóng trước khi đưa bóng qua lưới.',
      ] },
      { h: 'Vai trò trung tâm của setter' },
      { p: 'Setter quyết định nhịp tấn công của cả đội: chuyền nhanh hay chậm, sang biên nào, cho ai đập. Setter giỏi biết đọc thế chắn của đối phương để chọn phương án tấn công khó đỡ nhất. Đây là vị trí "đạo diễn" của đội.' },
      { h: 'Cú phát mạnh (jump serve)' },
      { p: 'Phát nhảy (jump serve) là chạy đà, nhảy và đập bóng như một cú spike từ vạch phát. Lực rất mạnh, gây khó cho đối phương nhưng khó kiểm soát; cần tập nhiều để giảm tỉ lệ phát hỏng.' },
      { note: 'Phòng thủ tốt là tiền đề của tấn công: đỡ búa (dig) chắc thì setter mới có bóng đẹp để tổ chức tấn công. Libero và hàng sau là nền móng của đội.' },
    ],
    [
      { q: 'Vì sao libero phải mặc áo khác màu?', a: 'Để trọng tài và đối phương dễ nhận biết, vì libero có luật riêng: không được phát, không được đập bóng trên lưới, nhưng được vào – ra sân tự do thay người hàng sau. Áo khác màu giúp tránh nhầm libero với tay đập, đảm bảo trọng tài kiểm soát đúng luật.' },
      { q: 'Đội em phòng thủ yếu, hay bị thủng ở hàng sau. Bổ sung gì?', a: 'Đầu tư cho libero và hai vị trí hàng sau (back row). Tập đỡ búa (dig): quỳ trọng tâm thấp, hai cẳng tay đan thẳng tạo "mặt phẳng" đỡ bóng, không dùng bàn tay. Phòng thủ vững thì mới có bóng cho setter tổ chức phản công.' },
      { q: 'Vì sao setter được coi là vị trí quan trọng nhất?', a: 'Vì setter quyết định toàn bộ nhịp tấn công: chọn người đập, chọn hướng và tốc độ chuyền, đọc thế chắn đối phương để tạo cơ hội dứt điểm dễ nhất. Tay đập dù giỏi đến đâu cũng cần bóng chuyền hai chuẩn xác mới phát huy được. Setter là "bộ não" điều phối cả đội.' },
    ]
  ),

  'S9GDTC-w25-quiz': L(
    'Bóng rổ — Thi đấu',
    'Hiểu luật thi đấu bóng rổ theo FIBA, cách tính điểm và các lỗi phổ biến để chơi đúng và có tổ chức.',
    ['Nắm luật cơ bản FIBA.', 'Hiểu cách tính 1, 2, 3 điểm.', 'Nhận biết và tránh các lỗi di chuyển phổ biến.'],
    [
      { h: 'Luật cơ bản FIBA' },
      { ul: [
        '5 người mỗi đội trên sân.',
        '4 hiệp × 10 phút (NBA: 4 × 12 phút).',
        'Bóng phải đưa qua nửa sân đối phương trong 8 giây.',
        'Mỗi lần tấn công phải dứt điểm trong 24 giây (đồng hồ shot clock).',
        '5 lỗi cá nhân thì cầu thủ bị truất quyền thi đấu (NBA: 6 lỗi).',
      ] },
      { h: 'Cách tính điểm' },
      { ul: [
        '1 điểm: ném phạt (free throw) — được hưởng khi bị phạm lỗi.',
        '2 điểm: ném vào rổ từ trong vạch 3 điểm.',
        '3 điểm: ném vào rổ từ ngoài vạch 3 điểm (6,75m theo FIBA).',
      ] },
      { h: 'Các lỗi di chuyển phổ biến' },
      { ul: [
        'Chạy bước (travel): di chuyển quá hai bước mà không đập bóng.',
        'Hai lần dẫn (double dribble): đập bóng lại sau khi đã ôm bóng bằng hai tay.',
        'Lỗi 3 giây: đứng trong khu vực cấm địa (paint) quá 3 giây khi tấn công.',
      ] },
      { h: 'Kỹ thuật trụ chân (pivot)' },
      { p: 'Sau khi nhận bóng và dừng lại, em được phép giữ một chân làm trụ và xoay chân kia tự do mà không bị thổi travel — miễn là không nhấc chân trụ khỏi sàn trước khi chuyền hoặc dẫn bóng. Pivot tốt giúp xoay người tìm phương án tấn công.' },
      { h: 'Tinh thần thi đấu' },
      { p: 'Bóng rổ là môn nhanh, va chạm nhiều, nên giữ bình tĩnh và tôn trọng trọng tài rất quan trọng. Phòng thủ bằng vị trí thay vì phạm lỗi bằng tay; chấp nhận quyết định trọng tài để giữ trận đấu lành mạnh.' },
      { note: 'Bóng rổ là môn thi đấu Olympic; Việt Nam có giải nhà nghề VBA từ năm 2016, góp phần phát triển phong trào.' },
    ],
    [
      { q: 'Em bị phạm lỗi khi đang ném 3 điểm. Được hưởng mấy quả ném phạt?', a: 'Nếu cú ném không vào: được hưởng 3 quả ném phạt (tương ứng giá trị cú ném). Nếu cú ném vẫn vào rổ dù bị phạm lỗi: được tính 3 điểm + 1 quả ném phạt thưởng (cơ hội thành 4 điểm).' },
      { q: 'Đội em hay bị thổi lỗi chạy bước (travel). Sửa thế nào?', a: 'Tập kỹ thuật trụ chân (pivot): sau khi nhận bóng, đặt một chân làm trụ cố định, chân kia di chuyển tự do để tìm hướng. Không nhấc chân trụ lên trước khi dẫn bóng hoặc chuyền. Khi muốn di chuyển có bóng thì phải đập bóng liên tục, không ôm bóng chạy.' },
      { q: 'Vì sao có quy định 24 giây và 8 giây?', a: 'Quy định 8 giây buộc đội tấn công nhanh chóng đưa bóng qua nửa sân, không câu giờ ở phần sân nhà. Quy định 24 giây buộc mỗi đợt tấn công phải dứt điểm trong thời gian giới hạn, giúp trận đấu nhanh, hấp dẫn và công bằng — không cho đội dẫn điểm giữ bóng vô thời hạn.' },
    ]
  ),

  'S9GDTC-w26-quiz': L(
    'Bóng đá — Thi đấu chiến thuật',
    'Bóng đá hiện đại có nhiều sơ đồ chiến thuật — hiểu chúng giúp đội phối hợp có tổ chức và chọn lối chơi phù hợp năng lực.',
    ['Phân biệt ba sơ đồ chiến thuật phổ biến.', 'Nắm luật trận đấu cơ bản.', 'Biết chọn lối chơi phù hợp với điểm mạnh của đội.'],
    [
      { h: 'Ba sơ đồ chiến thuật phổ biến' },
      { ul: [
        '4-4-2: 4 hậu vệ + 4 tiền vệ + 2 tiền đạo — cân bằng, dễ tổ chức, phổ biến nhất.',
        '4-3-3: 4 hậu vệ + 3 tiền vệ + 3 tiền đạo — thiên về tấn công, áp đảo phần sân đối phương.',
        '3-5-2: 3 hậu vệ + 5 tiền vệ (gồm 2 hậu vệ biên dâng cao) + 2 tiền đạo — linh hoạt, kiểm soát tuyến giữa.',
      ] },
      { h: 'Luật trận đấu cơ bản' },
      { ul: [
        '11 người mỗi đội (kể cả thủ môn).',
        'Hai hiệp chính, mỗi hiệp 45 phút, cộng thời gian bù giờ.',
        'Đấu loại trực tiếp: hoà sau 90 phút thì đá hiệp phụ 2 × 15 phút, vẫn hoà thì đá luân lưu (penalty).',
        'FIFA cho phép thay tối đa 5 cầu thủ trong các giải chính thức (từ sau đại dịch).',
      ] },
      { h: 'Hai triết lý chơi bóng' },
      { p: 'Một là phòng thủ chặt – phản công nhanh: lùi sâu, cướp bóng rồi tấn công chớp nhoáng vào khoảng trống đối phương để lại. Hai là kiểm soát bóng (possession): giữ bóng nhiều, chuyền chắc để kéo giãn đối phương rồi tìm cơ hội. Chọn lối nào tuỳ năng lực đội bóng.' },
      { h: 'Gây sức ép (pressing)' },
      { p: 'Pressing là vây cướp bóng ngay khi đối phương vừa nhận, ở phần sân của họ. Pressing toàn sân tốn nhiều thể lực nhưng buộc đối phương mắc sai lầm gần khung thành — phù hợp với đội có thể lực sung mãn.' },
      { h: 'Vai trò chuyển trạng thái' },
      { p: 'Bóng đá hiện đại coi trọng "chuyển trạng thái" — khoảnh khắc vừa mất bóng (chuyển sang phòng ngự) hoặc vừa cướp được bóng (chuyển sang tấn công). Đội phản ứng nhanh ở các khoảnh khắc này thường tạo lợi thế lớn.' },
      { note: 'Đội U22 Việt Nam vô địch SEA Games 30 và 31 — minh chứng bóng đá Việt Nam đã vươn tầm khu vực nhờ tổ chức chiến thuật và thể lực tốt.' },
    ],
    [
      { q: 'Đội em yếu kỹ thuật cá nhân nhưng thể lực tốt. Nên chọn lối chơi nào?', a: 'Chọn pressing (gây sức ép) toàn sân để cướp bóng từ phần sân đối phương, tận dụng thể lực dồn ép họ mắc sai lầm. Đội hình 4-4-2 hoặc 4-3-3 phù hợp để vây cướp. Lối chơi này biến điểm mạnh thể lực thành lợi thế, che được điểm yếu kỹ thuật.' },
      { q: 'Vì sao sơ đồ 4-3-3 mạnh về tấn công?', a: 'Vì có 3 tiền đạo (2 cánh + 1 trung phong) luôn áp đảo số đông ở phần sân đối phương, cùng 3 tiền vệ đủ để luân chuyển và hỗ trợ bóng. Tuy nhiên hai cánh dâng cao để hở hai biên, nên đòi hỏi hậu vệ cánh khoẻ, biết lên công về thủ.' },
      { q: 'Lối chơi kiểm soát bóng (possession) đòi hỏi đội phải có gì?', a: 'Đòi hỏi kỹ thuật chuyền – đỡ tốt, di chuyển không bóng liên tục để tạo phương án chuyền, và sự kiên nhẫn. Đội kiểm soát bóng kéo giãn đối phương để tìm khe hở, nhưng nếu chuyền hỏng ở giữa sân dễ bị phản công. Vì vậy lối này phù hợp đội kỹ thuật và ăn ý cao.' },
    ]
  ),

  'S9GDTC-w27-quiz': L(
    'Thể chất — Sức mạnh và linh hoạt',
    'Sức mạnh và linh hoạt là hai tố chất nền tảng bổ trợ cho mọi môn thể thao. Lớp 9 cần tập đúng phương pháp, phù hợp lứa tuổi đang phát triển.',
    ['Nắm các phương pháp tập sức mạnh phù hợp lứa tuổi.', 'Hiểu nguyên tắc và cách giãn cơ.', 'Biết tập an toàn để bổ trợ thành tích mà không quá tải.'],
    [
      { h: 'Sức mạnh và linh hoạt là gì?' },
      { p: 'Sức mạnh là khả năng cơ bắp tạo ra lực; linh hoạt là biên độ vận động của khớp và độ dẻo của cơ. Sức mạnh giúp chạy nhanh, bật cao, đập mạnh; linh hoạt giúp động tác rộng, êm và phòng tránh chấn thương. Hai tố chất bổ sung cho nhau.' },
      { h: 'Phương pháp tập sức mạnh' },
      { ul: [
        'Trọng lượng cơ thể (bodyweight): chống đẩy, gập bụng, squat, plank, kéo xà — an toàn, không cần dụng cụ.',
        'Tạ nhẹ: dumbbell, barbell với kỹ thuật chuẩn và có người hướng dẫn.',
        'Dây kháng lực (resistance band): an toàn, đa dạng bài tập.',
        'Lứa tuổi 14–15 nên ưu tiên 60–70% bodyweight, chỉ thêm tạ nhẹ kỹ thuật đúng.',
      ] },
      { h: 'Lưu ý về tuổi đang phát triển' },
      { p: 'Học sinh lớp 9 đang trong giai đoạn tăng trưởng, sụn xương còn chưa cốt hoá hoàn toàn. Tập tạ NẶNG quá mức có thể ảnh hưởng đến sụn tăng trưởng. Vì vậy ưu tiên kỹ thuật đúng và tải vừa phải hơn là gồng tải nặng để "lên cơ" nhanh.' },
      { h: 'Phương pháp tập linh hoạt' },
      { ul: [
        'Giãn cơ tĩnh: giữ tư thế kéo giãn 20–30 giây mỗi động tác — tập SAU buổi tập.',
        'Giãn cơ động: vừa di chuyển vừa kéo giãn (đá lăng, xoay hông) — tập TRƯỚC buổi tập.',
        'Yoga / Pilates: tăng linh hoạt kết hợp cân bằng và sức mạnh vùng lõi (core).',
      ] },
      { h: 'Nguyên tắc tập an toàn' },
      { p: 'Luôn theo trình tự khởi động → tập chính → hồi tĩnh. Tăng tiến dần 5–10%/tuần. Tập đối xứng hai bên cơ thể. Lắng nghe cơ thể — đau xương khớp (khác với mỏi cơ) phải dừng ngay và nghỉ.' },
      { note: 'Sức mạnh không đồng nghĩa với "cơ to" mà là khả năng tạo lực. Linh hoạt cũng quan trọng không kém để vận động rộng và phòng chấn thương.' },
    ],
    [
      { q: 'Em muốn cao thêm — có nên tập tạ nặng?', a: 'Lớp 9 (14–15 tuổi) còn đang tăng trưởng. Tập tạ NHẸ với kỹ thuật đúng thì tốt cho cơ bắp và tư thế. Nhưng tập tạ NẶNG quá mức có thể ảnh hưởng sụn tăng trưởng. Hãy ưu tiên bodyweight và tạ nhẹ kỹ thuật chuẩn, kết hợp ngủ đủ, ăn đủ canxi và các môn kích thích chiều cao (bơi, bóng rổ, nhảy dây).' },
      { q: 'Em cứng người, cúi không chạm được mũi chân. Cải thiện thế nào?', a: 'Giãn cơ tĩnh đều đặn mỗi tối khoảng 15 phút trước khi ngủ — tập yoga cơ bản, gập người giữ 20–30 giây mỗi lần. Sau khoảng 4 tuần kiên trì sẽ thấy khác biệt rõ. Linh hoạt là tố chất tập được, không phải "trời cho".' },
      { q: 'Vì sao nên giãn cơ động trước buổi tập và giãn cơ tĩnh sau buổi tập?', a: 'Giãn cơ động (vừa di chuyển vừa kéo giãn) làm nóng cơ, tăng biên độ khớp và đánh thức thần kinh — chuẩn bị cho vận động, nên tập TRƯỚC. Giãn cơ tĩnh (giữ tư thế lâu) làm cơ thư giãn, dài ra và hồi phục — nếu giữ tĩnh quá lâu trước khi tập sẽ làm cơ "ngủ" và giảm sức bật, nên để SAU buổi tập.' },
    ]
  ),

  'S9GDTC-w28-quiz': L(
    'Dinh dưỡng cho người tập thể thao',
    'Tập đúng cộng ăn đúng mới có tiến bộ. Dinh dưỡng hợp lý quyết định phần lớn kết quả tập luyện và phục hồi.',
    ['Hiểu ba nhóm chất dinh dưỡng chính và vai trò.', 'Biết ăn uống hợp lý quanh buổi tập.', 'Hiểu tầm quan trọng của nước và ngủ với phục hồi.'],
    [
      { h: 'Vì sao dinh dưỡng quan trọng với người tập?' },
      { p: 'Tập luyện làm cơ thể tiêu hao năng lượng và "vi tổn thương" cơ bắp. Dinh dưỡng cung cấp nhiên liệu để vận động và nguyên liệu để phục hồi, xây dựng cơ. Tập nặng mà ăn thiếu chất thì không những không tiến bộ mà còn dễ chấn thương, ốm.' },
      { h: 'Ba nhóm chất dinh dưỡng chính' },
      { ul: [
        'Carbohydrate (tinh bột): nguồn năng lượng chính — cơm, mì, bánh mì, khoai. Khoảng 50–60% năng lượng/ngày.',
        'Protein (chất đạm): xây và phục hồi cơ — thịt, cá, trứng, sữa, các loại đậu. Khoảng 15–20%/ngày.',
        'Chất béo: tạo hormone và giúp hấp thụ vitamin — dầu thực vật, cá béo, các loại hạt. Khoảng 20–30%/ngày.',
      ] },
      { h: 'Vai trò của vitamin, khoáng chất' },
      { p: 'Ngoài ba nhóm chính, cơ thể cần vitamin và khoáng chất từ rau xanh, trái cây — đặc biệt canxi (xương), sắt (máu, vận chuyển oxy), kali (chống chuột rút). Ăn đa dạng màu sắc rau củ là cách đơn giản để đủ vi chất.' },
      { h: 'Ăn uống quanh buổi tập' },
      { ul: [
        'Trước tập khoảng 1 giờ: ăn nhẹ, dễ tiêu — chuối, bánh mì, sữa chua.',
        'Trong khi tập: uống nước đều, từng ngụm nhỏ.',
        'Sau tập 30–60 phút ("cửa sổ vàng"): ăn carb + protein để phục hồi — cơm với thịt/cá, hoặc sữa với trái cây.',
      ] },
      { h: 'Nước và phục hồi' },
      { p: 'Cơ thể khoảng 60% là nước; mất 2% nước đã làm giảm khoảng 10% hiệu suất. Học sinh tập thể thao nên uống 2–3 lít/ngày, nhiều hơn khi trời nóng. Ngoài ra, ngủ đủ 8 tiếng là "liều thuốc phục hồi" quan trọng nhất — cơ phục hồi và phát triển chủ yếu khi ngủ.' },
      { note: 'Không có "thực phẩm thần kỳ". Bí quyết là ăn đa dạng, đủ lượng, đúng thời điểm, kết hợp uống đủ nước và ngủ đủ giấc.' },
    ],
    [
      { q: 'Em tập gym muốn tăng cơ — nên ăn bao nhiêu protein?', a: 'Học sinh 14–15 tuổi tập thể thao nên ăn khoảng 1,2–1,5g protein/kg cân nặng/ngày. Nặng 50kg thì cần khoảng 60–75g/ngày. Ăn đa dạng: trứng, thịt nạc, cá, đậu nành, sữa. Nếu ăn đủ thực phẩm thì không cần dùng bột whey.' },
      { q: 'Sau buổi tập em rất đói — nên ăn gì?', a: 'Tận dụng "cửa sổ vàng" 30–60 phút sau tập: ăn carb + protein theo tỉ lệ khoảng 3:1. Ví dụ một bát cơm với thịt gà và rau, hoặc bánh mì kẹp trứng kèm sữa. Tránh đồ ngọt nhiều đường và nước có ga vì chúng cung cấp năng lượng "rỗng", không hỗ trợ phục hồi.' },
      { q: 'Vì sao uống đủ nước lại ảnh hưởng nhiều đến thành tích đến vậy?', a: 'Nước tham gia điều hoà thân nhiệt (qua mồ hôi), vận chuyển dưỡng chất và đào thải. Khi mất nước, máu đặc hơn, tim phải làm việc nhiều hơn, cơ dễ mỏi và chuột rút. Chỉ mất 2% nước đã giảm khoảng 10% hiệu suất, nên phải uống đều trước – trong – sau khi tập.' },
    ]
  ),

  'S9GDTC-w29-quiz': L(
    'Phòng tránh bệnh và chấn thương',
    'Phòng chấn thương quan trọng hơn chữa. Lớp 9 phải nắm các chấn thương phổ biến, cách sơ cứu RICE và nguyên tắc phòng tránh.',
    ['Nhận biết các chấn thương thể thao phổ biến.', 'Thực hành được sơ cứu RICE chi tiết.', 'Nắm các nguyên tắc phòng chấn thương.'],
    [
      { h: 'Vì sao "phòng hơn chữa"?' },
      { p: 'Một chấn thương có thể khiến em nghỉ tập vài tuần đến vài tháng, mất hết tiến bộ đã có và đôi khi để lại di chứng lâu dài. Phòng tránh chỉ tốn vài phút khởi động và sự cẩn trọng, nên luôn rẻ và lợi hơn chữa rất nhiều.' },
      { h: 'Các chấn thương phổ biến' },
      { ul: [
        'Bong gân: dây chằng bị giãn hoặc rách do khớp lệch quá mức — hay gặp ở cổ chân, cổ tay.',
        'Căng cơ (giãn cơ): cơ bị kéo căng quá mức — hay gặp ở đùi, bắp chân.',
        'Trật khớp: đầu khớp lệch khỏi vị trí — hay gặp ở vai, ngón tay.',
        'Gãy xương: ít gặp nhưng nguy hiểm — phải đến y tế ngay.',
      ] },
      { h: 'Sơ cứu RICE chi tiết' },
      { ul: [
        'R – Rest: nghỉ ngay, không cố tiếp tục vận động.',
        'I – Ice: chườm đá 15–20 phút mỗi 2 giờ trong 48 giờ đầu, bọc đá qua khăn (không áp trực tiếp lên da).',
        'C – Compression: băng ép bằng băng thun vừa phải, kiểm tra đầu ngón không tím.',
        'E – Elevation: nâng chi tổn thương cao hơn tim để giảm sưng.',
      ] },
      { note: '48 giờ đầu KHÔNG xoa dầu nóng, KHÔNG xoa bóp mạnh, KHÔNG chườm nóng — vì làm giãn mạch, chảy máu trong và sưng nặng hơn.' },
      { h: 'Nguyên tắc phòng chấn thương' },
      { ul: [
        'Khởi động kỹ trước, hồi tĩnh sau mỗi buổi tập.',
        'Tăng tiến dần khối lượng, không nhảy vọt.',
        'Thực hiện đúng kỹ thuật — sai kỹ thuật là nguyên nhân chấn thương hàng đầu.',
        'Đủ hồi phục: ngủ 8 tiếng, ăn đủ chất, không tập khi đang ốm hoặc quá mệt.',
      ] },
      { note: 'Chấn thương nặng (đau dữ dội, biến dạng khớp, mất cảm giác, nghi gãy xương) phải đến cơ sở y tế NGAY — tuyệt đối không tự nắn, tự xử lý.' },
    ],
    [
      { q: 'Em bong gân cổ chân khi đá bóng. Sơ cứu theo RICE thế nào?', a: 'R: ngồi xuống nghỉ ngay, không đi tiếp. I: chườm đá bọc khăn khoảng 20 phút. C: băng thun ép vừa quanh cổ chân (không quá chặt, kiểm tra ngón chân không tím). E: kê chân lên cao hơn tim. Sáng hôm sau nếu vẫn sưng đau nhiều thì đi khám. Không xoa dầu nóng trong 48 giờ đầu.' },
      { q: 'Bạn em ngã trật khớp vai. Em sơ cứu thế nào?', a: 'TUYỆT ĐỐI không cố nắn khớp về vị trí — sẽ gây tổn thương nặng hơn (rách thêm dây chằng, tổn thương mạch máu, thần kinh). Cố định cánh tay sát thân bằng khăn quàng (đai vải đỡ tay), chườm đá nếu có, rồi đưa bạn đến cơ sở y tế ngay để bác sĩ nắn đúng cách.' },
      { q: 'Vì sao 48 giờ đầu sau chấn thương cấp lại không được xoa dầu nóng?', a: 'Vì trong 48 giờ đầu, vùng tổn thương đang chảy máu và viêm trong mô. Dầu nóng và xoa bóp mạnh làm giãn mạch, tăng chảy máu trong và sưng nề nặng hơn, kéo dài thời gian hồi phục. Giai đoạn này phải chườm LẠNH để co mạch, giảm sưng và đau (theo nguyên tắc RICE).' },
    ]
  ),

  'S9GDTC-w30-quiz': L(
    'Đạo đức trong thể thao',
    'Fair play (chơi đẹp) là tinh thần cao quý của thể thao — không chỉ quan trọng ở việc thắng mà còn ở cách thắng và cách thua.',
    ['Hiểu nội dung của tinh thần fair play.', 'Nhận biết các hành vi sai trái trong thể thao.', 'Hiểu tác hại của doping.'],
    [
      { h: 'Fair play là gì?' },
      { p: 'Fair play (chơi đẹp) là thi đấu trung thực, tôn trọng luật, tôn trọng đối thủ và trọng tài, chấp nhận kết quả một cách văn minh. Một vận động viên chơi đẹp dù thua vẫn được kính trọng hơn người thắng bằng gian lận.' },
      { h: 'Bốn biểu hiện của fair play' },
      { ul: [
        'Trung thực — không gian lận, không ăn vạ, không lừa trọng tài.',
        'Tôn trọng luật — không cố ý phạm lỗi để trục lợi.',
        'Tôn trọng đối thủ — không khiêu khích, không xúc phạm; giúp đỡ đối thủ khi họ chấn thương.',
        'Tôn trọng trọng tài — không cãi cọ, chấp nhận quyết định.',
      ] },
      { h: 'Doping — dùng chất cấm' },
      { p: 'Doping là dùng chất tăng cường thành tích bị cấm (steroid, EPO…). Đây là hành vi vi phạm cả đạo đức, luật thi đấu và gây tổn hại sức khoẻ lâu dài. Mọi giải đấu lớn đều có kiểm tra doping nghiêm ngặt; bị phát hiện sẽ bị tước thành tích và cấm thi đấu.' },
      { h: 'Khi thắng và khi thua' },
      { ul: [
        'Khi thắng: khiêm tốn, bắt tay đối thủ, không khoe khoang hay chế giễu.',
        'Khi thua: chấp nhận, rút kinh nghiệm, không đổ lỗi cho đồng đội hay trọng tài.',
        'Cả hai trường hợp: cảm ơn đối thủ, trọng tài và khán giả.',
      ] },
      { h: 'Đạo đức trong thể thao học đường' },
      { p: 'Ở trường, fair play còn là động viên đồng đội khi họ mắc lỗi, không cười nhạo bạn yếu hơn, sẵn sàng hướng dẫn bạn. Thể thao học đường rèn không chỉ thể chất mà cả nhân cách — đó mới là mục tiêu sâu xa.' },
      { note: 'Câu nói đáng nhớ: "Người thắng đáng kính trọng, người thua đáng học hỏi" — đó là cốt lõi của tinh thần thể thao chân chính.' },
    ],
    [
      { q: 'Em thắng một trận quan trọng. Ăn mừng thế nào cho đúng tinh thần fair play?', a: 'Chia vui cùng đồng đội và thầy/cô. Bắt tay hoặc ôm đối thủ, cảm ơn họ vì trận đấu hay. Tránh khiêu khích, ăn mừng quá lố trước mặt đối thủ vừa thua. Cảm ơn trọng tài và khán giả. Niềm vui chiến thắng đi cùng sự tôn trọng mới là chiến thắng trọn vẹn.' },
      { q: 'Doping có hại thật sự không?', a: 'Có, rất nặng. Steroid phá gan, tim, rối loạn hormone và có thể gây vô sinh. EPO làm máu đặc, dễ đột quỵ và đột tử. Nhiều vận động viên chết trẻ vì doping. Chưa kể nếu bị phát hiện sẽ bị cấm thi đấu, tước hết danh hiệu và mất uy tín suốt đời. Cái giá của doping cao hơn nhiều so với lợi ích nhất thời.' },
      { q: 'Đối thủ ngã chấn thương khi em đang cầm bóng tấn công. Theo fair play em nên làm gì?', a: 'Em chủ động đưa bóng ra biên (trong bóng đá) để trận đấu dừng lại cho đối thủ được chăm sóc. Sau khi trận tiếp tục, đội bạn nên trả bóng lại cho đội em — đó là truyền thống fair play. Hành động này đặt sức khoẻ con người lên trên thắng thua, thể hiện nhân cách của vận động viên.' },
    ]
  ),

  'S9GDTC-w31-quiz': L(
    'Luyện sức bền — Chạy 1500m',
    'Chạy 1500m là nội dung kiểm tra thể lực tuyển sinh vào 10 ở nhiều địa phương — cần chuẩn bị kỹ với kế hoạch tập tăng tiến và chiến thuật pacing.',
    ['Nắm chiến thuật phân phối sức (pacing) cho 1500m.', 'Lập được kế hoạch tập luyện 8 tuần.', 'Biết chuẩn bị trang phục, nước và mục tiêu thành tích.'],
    [
      { h: 'Đặc điểm cự ly 1500m' },
      { p: '1500m là cự ly trung bình – dài, sử dụng chủ yếu hệ ưa khí nhưng vẫn cần tốc độ ở đoạn rút đích. Thành tích phụ thuộc vào nền sức bền, kỹ thuật thở và đặc biệt là chiến thuật phân phối sức hợp lý.' },
      { h: 'Chiến thuật pacing 1500m' },
      { ul: [
        '300m đầu: khởi động vào nhịp, giữ tốc độ 60–70% sức, không lao nhanh.',
        '300–1200m: giữ nhịp đều, ổn định ở khoảng 70–80% sức.',
        '1200–1500m cuối: tăng tốc dần, dồn sức rút đích (kick) ở đoạn cuối.',
      ] },
      { h: 'Kế hoạch tập 8 tuần' },
      { ul: [
        'Tuần 1–2: 3 buổi/tuần — chạy 1500m × 1 (đo thời gian) + chạy nhẹ 2km để xây nền.',
        'Tuần 3–4: thêm bài interval (8 × 200m nhanh, nghỉ 90 giây) để tăng tốc độ.',
        'Tuần 5–6: chạy tempo (1500m ở khoảng 85% sức) để quen nhịp thi đấu.',
        'Tuần 7: giảm tải khoảng 50% (tapering) để cơ thể hồi phục.',
        'Tuần 8: kiểm tra chính thức — phấn đấu cải thiện 5–10% so với ban đầu.',
      ] },
      { h: 'Trang phục và nước' },
      { p: 'Mặc quần áo thoáng, thấm hút mồ hôi; đi giày chạy chuyên dụng. Uống 200–300ml nước trước khi chạy khoảng 30 phút. Với cự ly 1500m, nếu đã uống đủ trước thì không cần uống trong lúc chạy.' },
      { h: 'Mục tiêu thành tích tham khảo' },
      { p: 'Học sinh lớp 9: nam thường khoảng 6–7 phút, nữ khoảng 7–8 phút cho 1500m. Đây chỉ là mốc tham khảo; mỗi địa phương có ngưỡng riêng, các em nên tìm hiểu chuẩn cụ thể của kì thi vào 10 ở nơi mình.' },
      { note: 'Lỗi pacing phổ biến nhất là bứt phá quá sớm rồi đuối. Kiểm soát tốc độ đầu trận chính là chìa khoá thành tích 1500m.' },
    ],
    [
      { q: 'Em chạy 1500m mất 8 phút, muốn rút xuống 6:30. Lộ trình thế nào?', a: 'Áp dụng kế hoạch 8 tuần ở trên, chú trọng bài interval (tăng tốc độ) và chạy tempo. Nếu thừa cân thì giảm cân hợp lý cũng giúp nhẹ người hơn. Mỗi tuần đo lại, kỳ vọng giảm khoảng 15–20 giây/tuần — có thể chạm 6:30 sau khoảng hai tháng nỗ lực kiên trì.' },
      { q: 'Em hay bứt phá ngay từ đầu rồi đuối sức. Sửa thế nào?', a: 'Đây là lỗi pacing phổ biến. Khắc phục: đeo đồng hồ và đặt mục tiêu thời gian cho mỗi 300m. Tập chạy cùng bạn có pacing tốt — bám theo bạn trong 1000m đầu rồi mới tăng tốc đoạn cuối. Dần dần cảm giác giữ tốc đều sẽ thành thói quen.' },
      { q: 'Vì sao tuần thứ 7 trong kế hoạch lại giảm tải (tapering)?', a: 'Tapering là giảm khối lượng tập trước ngày thi để cơ thể hồi phục hoàn toàn, "nạp lại" năng lượng và để hiệu ứng siêu hồi phục đạt đỉnh đúng ngày kiểm tra. Nếu tập nặng đến sát ngày thi, cơ thể còn mệt và thành tích sẽ kém hơn khả năng thực sự.' },
    ]
  ),

  'S9GDTC-w32-quiz': L(
    'Tổ chức trận đấu',
    'Tổ chức một trận đấu cần kỹ năng lãnh đạo, sự công bằng và tinh thần thể thao — không chỉ thi đấu mà còn biết điều hành.',
    ['Hiểu cấu trúc của một trận đấu giao hữu.', 'Biết vai trò và phẩm chất của đội trưởng.', 'Biết vai trò và phẩm chất của trọng tài.'],
    [
      { h: 'Ý nghĩa của việc tự tổ chức trận đấu' },
      { p: 'Biết tổ chức trận đấu giúp các em chủ động chơi thể thao ngoài giờ học, rèn kỹ năng lãnh đạo, tổ chức và xử lý tình huống. Một trận đấu được tổ chức tốt diễn ra công bằng, an toàn và vui vẻ cho tất cả.' },
      { h: 'Cấu trúc một trận đấu giao hữu' },
      { ul: [
        'Trước trận: bốc thăm chọn bên/quyền giao, kiểm tra sân và dụng cụ, khởi động chung.',
        'Trong trận: trọng tài điều khiển, hai đội tuân thủ luật và tôn trọng quyết định.',
        'Sau trận: bắt tay đối thủ, cảm ơn trọng tài, cùng dọn dẹp sân bãi.',
      ] },
      { h: 'Vai trò của đội trưởng' },
      { ul: [
        'Dẫn dắt tinh thần đội — động viên khi thua, kiềm chế khi thắng.',
        'Là người duy nhất được trao đổi chính thức với trọng tài.',
        'Phân công vị trí, điều phối thay người và giữ kỷ luật đội.',
      ] },
      { h: 'Vai trò của trọng tài' },
      { p: 'Trọng tài phải công bằng (không thiên vị bên nào), hiểu luật (thổi đúng), và quyết đoán (không do dự). Khi có tranh chấp, quyết định của trọng tài là cuối cùng và phải được tôn trọng — đó là điều kiện để trận đấu diễn ra trật tự.' },
      { h: 'Xử lý tình huống nóng' },
      { p: 'Khi cầu thủ căng thẳng, cãi cọ, đội trưởng và trọng tài phải làm dịu tình hình: tách cầu thủ, nhắc nhở bình tĩnh, nếu cần thì tạm dừng trận. Giữ trật tự quan trọng hơn việc tiếp tục thi đấu trong căng thẳng.' },
      { note: 'Một trận đấu thành công là trận mà thầy/cô tự hào về cả hai đội — dù ai thắng ai thua — vì tinh thần fair play và sự văn minh.' },
    ],
    [
      { q: 'Em làm đội trưởng, đồng đội tranh cãi gay gắt với trọng tài. Em xử lý thế nào?', a: 'Lập tức tiến tới, nhẹ nhàng đẩy đồng đội ra phía sau. Em tự thay mặt đội xin lỗi trọng tài (vì chỉ đội trưởng được trao đổi chính thức). Nói riêng với đồng đội: "Tôn trọng trọng tài, mình còn cơ hội ghi điểm". Giữ bình tĩnh và làm gương là phẩm chất quan trọng nhất của đội trưởng.' },
      { q: 'Em làm trọng tài nhưng không chắc lỗi có xảy ra hay không. Quyết định thế nào?', a: 'Tin vào quan sát đầu tiên của mình và quyết đoán, không do dự. Nếu thật sự không thấy rõ, có thể thổi "không lỗi" (cho lợi đội đang tấn công). Tuyệt đối KHÔNG đổi quyết định giữa trận vì sẽ mất uy tín. Sau trận có thể xem lại video để rút kinh nghiệm cho lần sau.' },
      { q: 'Vì sao chỉ đội trưởng được trao đổi chính thức với trọng tài?', a: 'Để giữ trật tự và tránh hỗn loạn. Nếu cầu thủ nào cũng được quây trọng tài phản ứng thì trận đấu sẽ rối loạn, dễ xô xát. Quy định chỉ đội trưởng trao đổi giúp ý kiến của đội được truyền đạt một cách có tổ chức, văn minh, và trọng tài cũng dễ kiểm soát trận đấu hơn.' },
    ]
  ),

  'S9GDTC-w33-quiz': L(
    'Ôn tập học kì II',
    'Tổng hợp kiến thức học kì II — bơi và an toàn dưới nước, các môn bóng nâng cao, võ thuật, dinh dưỡng và đạo đức thể thao.',
    ['Hệ thống hoá kiến thức học kì II.', 'Chuẩn bị cho bài kiểm tra cuối kì.', 'Định hướng tập luyện sau cấp THCS.'],
    [
      { h: 'Ý nghĩa của ôn tập cuối năm lớp 9' },
      { p: 'Đây là dịp khép lại bốn năm GDTC cấp THCS. Ngoài việc chuẩn bị kiểm tra cuối kì, ôn tập còn giúp các em chốt lại những kỹ năng và thói quen sẽ mang theo lên cấp 3 và suốt đời.' },
      { h: 'Các chủ đề chính học kì II' },
      { ul: [
        'Bơi sải và bơi ếch — kỹ thuật cơ bản và an toàn dưới nước, cứu đuối.',
        'Đá cầu nâng cao — cú tấn công hiểm và chiến thuật phối hợp đôi.',
        'Cầu lông đôi — chuyển đổi đội hình và đánh lừa (deception).',
        'Bóng chuyền — sáu vị trí, vai trò setter và libero.',
        'Bóng rổ — luật FIBA, cách tính điểm và các lỗi.',
        'Bóng đá — ba sơ đồ chiến thuật và luật trận đấu.',
        'Sức mạnh – linh hoạt – dinh dưỡng – phòng chấn thương.',
        'Đạo đức thể thao — fair play và tác hại của doping.',
      ] },
      { h: 'Tổng kết cấp THCS' },
      { p: 'Lớp 9 là năm cuối cấp THCS — chốt lại kiến thức và thể lực bốn năm. Lên cấp 3 các em sẽ học chuyên sâu hơn, có thêm môn Giáo dục Quốc phòng – An ninh. Quan trọng nhất là giữ được thói quen vận động đều đặn để có sức khoẻ cả đời.' },
      { h: 'Cấu trúc bài kiểm tra cuối kì' },
      { p: 'Thường gồm: lý thuyết (khoảng 20%) + kỹ thuật thực hành (50%) + thể lực (30%). Em nên cân đối ôn cả ba phần, đặc biệt là phần thực hành và thể lực — đây là phần chiếm trọng số lớn nhất.' },
      { note: 'Mục tiêu cao nhất không phải điểm số mà là duy trì được niềm yêu thích vận động và thói quen tập luyện sau khi rời ghế nhà trường.' },
    ],
    [
      { q: 'Tóm tắt ba nguyên tắc xuyên suốt GDTC cấp THCS?', a: '(1) An toàn trước thành tích — luôn khởi động, hồi tĩnh và thực hiện đúng kỹ thuật. (2) Tăng tiến dần — không nhảy vọt khối lượng để tránh chấn thương và quá tải. (3) Đa dạng — tập nhiều môn để phát triển toàn diện. Ba điều này theo em suốt quá trình tập luyện về sau.' },
      { q: 'Lên lớp 10 sẽ học gì khác so với THCS?', a: 'Cấp 3 có thêm môn Giáo dục Quốc phòng – An ninh hoàn toàn mới (điều lệnh đội ngũ, kiến thức quốc phòng, an ninh). Môn GDTC vẫn duy trì nhưng theo hướng cho chọn môn thể thao tự chọn để tập chuyên sâu theo sở thích, thay vì học dàn trải nhiều môn như THCS.' },
      { q: 'Trong các chủ đề học kì II, chủ đề nào liên quan trực tiếp đến kỹ năng sống nhất? Vì sao?', a: 'Bơi và an toàn dưới nước (tuần 19–21) liên quan trực tiếp đến kỹ năng sống nhất, vì đuối nước là nguyên nhân tử vong hàng đầu ở trẻ em Việt Nam. Biết bơi và biết cứu đuối an toàn (gọi – ném – không nhảy) có thể cứu chính mình và người khác. Đây là kiến thức bảo vệ tính mạng, không chỉ là rèn thể chất.' },
    ]
  ),

  'S9GDTC-w34-quiz': L(
    'Thể chất suốt đời — Kế hoạch cá nhân',
    'Mục tiêu cao nhất của GDTC là rèn thói quen vận động cho cả đời — không chỉ trong những năm đi học.',
    ['Hiểu lợi ích lâu dài của vận động.', 'Nắm khuyến nghị vận động của WHO theo lứa tuổi.', 'Lập được kế hoạch tập luyện cá nhân theo nguyên tắc SMART.'],
    [
      { h: 'Vì sao phải nghĩ đến vận động "suốt đời"?' },
      { p: 'Thể lực rèn được ở tuổi học sinh sẽ mai một nếu ngừng tập. Ngược lại, người duy trì vận động đều đặn cả đời có sức khoẻ, tinh thần và tuổi thọ tốt hơn hẳn. Vì vậy mục tiêu của GDTC không phải điểm số nhất thời mà là gieo một thói quen lâu dài.' },
      { h: 'Lợi ích của vận động suốt đời' },
      { ul: [
        'Giảm 30–40% nguy cơ bệnh tim mạch, tiểu đường type 2 và béo phì.',
        'Giảm trầm cảm, lo âu nhờ cơ thể tiết endorphin tự nhiên.',
        'Tăng tuổi thọ trung bình khoảng 3–5 năm.',
        'Giữ tinh thần minh mẫn lâu dài, góp phần phòng chống suy giảm trí nhớ (Alzheimer).',
      ] },
      { h: 'Khuyến nghị của WHO' },
      { p: 'Người 5–17 tuổi: vận động cường độ trung bình – mạnh ít nhất 60 phút/ngày. Người 18–64 tuổi: ít nhất 150 phút cường độ trung bình hoặc 75 phút cường độ mạnh mỗi tuần, kết hợp tập sức mạnh ít nhất 2 buổi/tuần.' },
      { h: 'Lập kế hoạch cá nhân theo SMART' },
      { p: 'Một mục tiêu tốt cần SMART: S – cụ thể (tập môn gì), M – đo được (bao nhiêu phút, bao nhiêu buổi), A – khả thi (phù hợp lịch học), R – có ý nghĩa (gắn với mục tiêu sức khoẻ của bản thân), T – có thời hạn (đặt mốc đánh giá, ví dụ sau 3 tháng).' },
      { h: 'Bí quyết duy trì lâu dài' },
      { ul: [
        'Chọn môn mình YÊU THÍCH — ép buộc sẽ sớm bỏ.',
        'Có bạn cùng tập để cùng chịu trách nhiệm và động viên nhau.',
        'Bắt đầu nhỏ và tăng tiến dần để không nản.',
        'Lồng vận động vào sinh hoạt: đi bộ, đạp xe đến trường, leo cầu thang thay thang máy.',
      ] },
      { note: 'Yếu tố quyết định sự bền bỉ là niềm vui — khi tập thấy vui, em sẽ tự nguyện duy trì mà không cần ai nhắc.' },
    ],
    [
      { q: 'Em lười tập, làm sao duy trì được thói quen?', a: 'Bắt đầu thật nhỏ: 10 phút/ngày với môn em thích (đạp xe, đi bộ nhanh, đá cầu). Sau khoảng một tháng quen rồi thì tăng dần lên 30 phút. Tìm một người bạn cùng tập để hai bên nhắc và động viên nhau. Đặt một mục tiêu cụ thể, hấp dẫn (ví dụ chạy được 5km sau 3 tháng) để có động lực phấn đấu.' },
      { q: 'Lên cấp 3 bận học, có nên tạm bỏ tập không?', a: 'TUYỆT ĐỐI không nên. Vận động giúp não tỉnh táo, giảm stress và học hiệu quả hơn. Chỉ cần 30 phút/ngày là đủ, mà có thể lồng vào sinh hoạt: đi bộ hoặc đạp xe đến trường, leo cầu thang thay thang máy, tập nhanh giữa giờ học. Lười vận động thường khiến cơ thể uể oải và học kém đi, chứ không "tiết kiệm" được thời gian như tưởng.' },
      { q: 'Hãy lập một mục tiêu SMART mẫu cho việc tập chạy bền.', a: 'Ví dụ: "Trong 3 tháng tới, em sẽ chạy bền 3 buổi/tuần, mỗi buổi 20–30 phút, để chạy được liên tục 3km mà không phải đi bộ". Phân tích: S (chạy bền), M (3 buổi/tuần, 20–30 phút, 3km), A (khả thi với lịch học), R (cải thiện sức khoẻ tim mạch), T (3 tháng). Đặt mốc đo lại mỗi 2 tuần để điều chỉnh.' },
    ]
  ),

  'S9GDTC-w35-quiz': L(
    'Tổng kết và kiểm tra cuối kì',
    'Bài cuối cấp THCS — tổng hợp toàn bộ chương trình GDTC và định hướng tập luyện sau lớp 9.',
    ['Hệ thống hoá toàn bộ chương trình GDTC THCS.', 'Nắm các triết lý xuyên suốt môn học.', 'Định hướng tập luyện cho cấp 3 và lâu dài.'],
    [
      { h: 'Nhìn lại bốn năm GDTC THCS' },
      { p: 'Từ lớp 6 đến lớp 9, các em đã đi từ những kỹ thuật cơ bản (đội hình đội ngũ, chạy, nhảy, ném) đến các môn thể thao và chiến thuật nâng cao, cùng kiến thức về dinh dưỡng, an toàn và đạo đức. Đó là một hành trình rèn cả thể chất, kỹ năng và nhân cách.' },
      { h: 'Triết lý xuyên suốt GDTC THCS' },
      { ul: [
        'An toàn > Thành tích.',
        'Kỹ thuật đúng > Sức mạnh thuần.',
        'Đều đặn > Bùng nổ nhất thời.',
        'Đa dạng > Chuyên sâu quá sớm (ở tuổi học sinh).',
        'Fair play > Chiến thắng bằng mọi giá.',
      ] },
      { h: 'Định hướng lên cấp 3' },
      { p: 'Cấp 3 sẽ có thêm môn Giáo dục Quốc phòng – An ninh hoàn toàn mới và GDTC theo hướng chuyên sâu môn tự chọn. Em nên chọn một môn yêu thích để tập sâu, nhưng vẫn duy trì cân bằng giữa rèn tim mạch (cardio), sức mạnh và linh hoạt để phát triển toàn diện.' },
      { h: 'Cấu trúc bài kiểm tra cuối kì' },
      { p: 'Thường gồm lý thuyết (khoảng 20%), kỹ thuật thực hành (50%) và thể lực (30%). Phần thực hành và thể lực chiếm trọng số lớn, nên các em cần thể hiện được kỹ thuật đã học và nền thể lực đã rèn suốt năm.' },
      { h: 'Lời cuối cấp THCS' },
      { p: 'Thể thao không chỉ để thi đua mà để rèn sức khoẻ, ý chí và tinh thần đồng đội. Người chiến thắng cuối cùng là người duy trì được thói quen vận động suốt đời — chứ không phải người tập gắng sức một thời gian rồi từ bỏ.' },
      { note: 'Sức khoẻ là tài sản quý nhất, không tiền nào mua được. Hãy đầu tư cho nó mỗi ngày bằng vài chục phút vận động.' },
    ],
    [
      { q: 'Ba thông điệp em sẽ mang từ cấp THCS sang cấp 3?', a: '(1) Khởi động và hồi tĩnh là bắt buộc với mọi buổi tập. (2) Sơ cứu RICE khi bị chấn thương cơ – khớp, và biết khi nào phải đến y tế. (3) Công thức khoẻ mạnh: ≥ 60 phút vận động/ngày + ngủ đủ + ăn cân bằng. Ba điều này sẽ theo em suốt đời, không chỉ trong trường học.' },
      { q: 'Vì sao ở tuổi học sinh nên ưu tiên "đa dạng" hơn "chuyên sâu quá sớm"?', a: 'Vì cơ thể đang phát triển cần phát triển toàn diện nhiều nhóm cơ và nhiều kỹ năng vận động. Chuyên sâu một môn quá sớm dễ dẫn đến phát triển lệch, quá tải một nhóm cơ và chấn thương lặp lại do dùng quá mức. Tập đa dạng giúp nền thể lực rộng và bền, đến khi lớn hơn mới chuyên sâu thì hiệu quả và an toàn hơn.' },
      { q: 'Lời cảm ơn cuối cấp dành cho thầy/cô GDTC?', a: 'Cảm ơn các thầy/cô GDTC đã rèn cho chúng em không chỉ kỹ thuật và thể lực, mà cả tinh thần fair play, tính kỷ luật và sự bền bỉ. Chúng em hứa sẽ giữ thói quen vận động đều đặn suốt đời và lan toả tinh thần thể thao lành mạnh. Hẹn gặp lại thầy/cô ở các giải giao hữu cấp 3!' },
    ]
  ),

  'S9GDTC-w36-quiz': L(
    'Kết thúc GDTC THCS — Sức khoẻ là nền tảng của mọi thành công',
    'Tuần cuối năm — nhìn lại hành trình GDTC THCS và cùng nhau xây dựng kế hoạch giữ gìn sức khoẻ cho cả cuộc đời.',
    [
      'Hệ thống hoá các môn thể thao và kĩ năng đã học trong chương trình THCS.',
      'Hiểu nguyên tắc duy trì thói quen vận động lâu dài.',
      'Xây dựng kế hoạch tập luyện cá nhân cho năm học THPT.',
    ],
    [
      { h: 'Bốn năm GDTC THCS — Hành trình vận động' },
      { ul: [
        'Lớp 6-7: Thể dục nhịp điệu, điền kinh, bơi lội — nền tảng thể lực toàn diện.',
        'Lớp 8-9: Bóng rổ, bóng đá, cầu lông, võ thuật — kĩ năng thể thao đội nhóm và cá nhân.',
        'Xuyên suốt: khởi động, hồi tĩnh, an toàn, dinh dưỡng, sơ cứu — kiến thức sức khoẻ cho cả đời.',
      ] },
      { h: 'Sức khoẻ — Nền tảng không thể thiếu' },
      { p: 'Học tốt cần não bộ khoẻ mạnh — não bộ khoẻ cần cơ thể khoẻ. Các nghiên cứu khoa học xác nhận: học sinh vận động ít nhất 60 phút/ngày có kết quả học tập tốt hơn, tinh thần ổn định hơn và ít lo âu hơn so với bạn ít vận động.' },
      { h: 'Nguyên tắc duy trì thói quen vận động lâu dài' },
      { ul: [
        'Chọn môn mình yêu thích — sự thú vị quan trọng hơn hiệu quả ngắn hạn.',
        'Tập đều hơn tập nhiều: 30 phút/ngày đều đặn tốt hơn 3 tiếng cuối tuần.',
        'Rủ bạn tập cùng — accountability partner giúp duy trì kỷ luật.',
        'Ghi nhật ký vận động ngắn gọn — theo dõi tiến bộ tạo động lực.',
        'Không hoàn hảo nhưng đừng bỏ cuộc — một buổi tập nhẹ vẫn tốt hơn không tập.',
      ] },
      { h: 'Gợi ý cho THPT' },
      { ul: [
        'Tham gia CLB thể thao trường ngay từ tuần đầu tiên.',
        'Dù bận học, ưu tiên ít nhất 3 buổi/tuần vận động nhẹ.',
        'Chia sẻ kiến thức GDTC đã học cho đồng đội và bạn bè — dạy lại là cách học tốt nhất.',
      ] },
      { note: 'Huy chương và thành tích thi đấu là thứ có thể phai theo thời gian. Nhưng một cơ thể khoẻ mạnh và thói quen vận động tốt là "tài sản" giữ giá trị cả cuộc đời.' },
    ],
    [
      { q: 'Vì sao nói "vận động thể chất là thuốc bổ cho não bộ"?', a: 'Khi vận động, cơ thể tăng lưu lượng máu não, giải phóng BDNF (yếu tố tăng trưởng thần kinh giúp kết nối tế bào não mạnh hơn) và các endorphin (cải thiện tâm trạng, giảm stress). Nhiều nghiên cứu cho thấy học sinh vận động đều đặn có khả năng tập trung, ghi nhớ và giải quyết vấn đề tốt hơn đáng kể. Đặc biệt trong mùa thi, một buổi đi bộ 20-30 phút có thể cải thiện hiệu quả ôn tập hơn là thêm một tiếng ngồi im.' },
      { q: 'Làm thế nào để duy trì thói quen tập thể dục khi lên THPT với lịch học dày hơn?', a: 'Chiến lược thực tế: (1) Biến vận động thành thói quen "gắn kèm" hoạt động khác — đi bộ thay xe buýt một đoạn, leo cầu thang thay thang máy. (2) Chọn giờ tập nhất quán — sáng sớm trước khi mọi thứ chiếm mất. (3) Tập ngắn nhưng đều — 20-30 phút là đủ, không cần 2 tiếng. (4) Rủ bạn thân tập cùng — hai người khó bỏ cuộc hơn một. (5) Xem giờ tập là "sạc pin" cho việc học, không phải "lấy giờ học".' },
      { q: 'Điều em tự hào nhất về bản thân trong môn GDTC sau 4 năm THCS?', a: 'Câu này không có đáp án đúng — hãy trả lời thật lòng. Ví dụ: "Tôi tự hào vì đã khắc phục nỗi sợ bơi lội từ lớp 6 — từ một người không dám bước xuống hồ sâu đến người bơi được 200m không nghỉ. Điều này dạy tôi rằng không có kĩ năng nào là không học được nếu kiên trì đủ lâu".' },
    ]
  ),
};
