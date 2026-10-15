// ============================================================
// Lớp 8 · GIÁO DỤC THỂ CHẤT — Lý thuyết + Ví dụ 35 tuần (GDPT 2018)
// Điền kinh · Thể dục · Bóng · Võ · Trò chơi vận động · Kiến thức sức khoẻ.
// Key TRÙNG id quiz: "S8GDTC-wNN-quiz".
// Văn phong thầy/cô GDTC THCS; bám SGK GDTC 8 (KNTT/CTST/Cánh Diều).
// ============================================================

const L = (topic, intro, objectives, theory, examples) => ({ topic, intro, objectives, theory, examples });

export const S8GDTC_LESSONS = {
  'S8GDTC-w01-quiz': L(
    'Chạy ngắn — Kỹ thuật chạy 60m, 100m',
    'Lên lớp 8, chạy ngắn không còn dừng ở "chạy nhanh hết sức" nữa — các em phải hoàn thiện cả bốn giai đoạn và đặc biệt là kỹ thuật xuất phát thấp với bàn đạp. Tốc độ tối đa chỉ giữ được vài giây, nên ai chạy đúng kỹ thuật sẽ thắng người chỉ khoẻ mà sai động tác.',
    [
      'Nắm và phân tích được 4 giai đoạn của chạy cự ly ngắn.',
      'Thực hiện đúng xuất phát thấp theo 3 khẩu lệnh và kỹ thuật đánh tay.',
      'Hiểu vai trò của tần số bước và độ dài bước với thành tích.',
    ],
    [
      { h: 'Cự ly ngắn ở lớp 8 gồm những gì?' },
      { p: 'Chạy cự ly ngắn (chạy nhanh) là chạy với tốc độ TỐI ĐA trên các cự ly 60m, 100m. Khác với lớp 6–7, lớp 8 các em làm quen kỹ thuật xuất phát thấp có bàn đạp — kỹ thuật dùng trong thi đấu chính thức, cho tốc độ ban đầu cao hơn xuất phát cao.' },
      { h: 'Bốn giai đoạn của chạy ngắn' },
      { ul: [
        'Xuất phát (thấp) — tạo lực bật ban đầu mạnh nhất.',
        'Chạy lao sau xuất phát — tăng tốc nhanh trong 15–25m đầu, thân đổ nhiều về trước.',
        'Chạy giữa quãng — đạt và duy trì tốc độ tối đa, thân thẳng dần.',
        'Về đích — đánh đích bằng ngực/vai, không giảm tốc trước vạch.',
      ] },
      { h: 'Xuất phát thấp — 3 khẩu lệnh' },
      { ul: [
        '"Vào chỗ!": quỳ gối, hai tay chống đất rộng bằng vai sau vạch, ngón tay tạo "cầu", chân thuận đặt bàn đạp trước.',
        '"Sẵn sàng!": nâng mông cao hơn vai, dồn trọng tâm về tay, mắt nhìn xuống phía trước ~1m, nín thở giữ lực.',
        'Tín hiệu xuất phát: đạp MẠNH hai chân vào bàn đạp, tay rời đất, người lao về trước.',
      ] },
      { h: 'Đánh tay đúng kỹ thuật' },
      { p: 'Khuỷu tay gập khoảng 90°, đánh thẳng theo phương trước – sau, KHÔNG đánh ngang hay bắt chéo thân. Vai thả lỏng, bàn tay nắm hờ. Tay đánh mạnh và nhanh sẽ "kéo" tần số bước chân tăng theo — đây là điểm nhiều bạn bỏ qua.' },
      { h: 'Hai yếu tố quyết định tốc độ' },
      { ul: [
        'TẦN SỐ BƯỚC: số bước trong một đơn vị thời gian — đánh tay nhanh, tiếp đất bằng nửa trước bàn chân giúp tăng tần số.',
        'ĐỘ DÀI BƯỚC: khoảng cách mỗi bước — đến từ lực đạp sau mạnh và biên độ chân hợp lý.',
      ] },
      { p: 'Tốc độ = tần số bước × độ dài bước. Tăng được cả hai mà không gồng cứng là chìa khoá của chạy ngắn.' },
      { note: 'Lỗi phổ biến lớp 8: ngẩng đầu nhìn quanh khi xuất phát, đánh tay ngang, vai gồng cứng, tiếp đất bằng cả gót — tất cả đều làm chậm tốc độ. An toàn: khởi động kỹ cổ chân – gối – hông trước khi chạy tốc độ.' },
    ],
    [
      { q: 'Vì sao chạy ngắn dùng xuất phát thấp chứ không phải xuất phát cao?', a: 'Xuất phát thấp cho phép dồn trọng tâm về phía trước và đạp mạnh hai chân vào bàn đạp, tạo lực bật ban đầu lớn hơn nên tăng tốc nhanh hơn. Ở 100m, vài phần trăm giây có được từ xuất phát thấp đủ quyết định thắng thua.' },
      { q: 'Bạn em chạy 60m rất khoẻ nhưng đánh tay ngang trước ngực. Em góp ý thế nào?', a: 'Đánh tay ngang làm thân bị xoay theo, tốn lực và giảm tần số bước. Em hướng dẫn bạn gập khuỷu ~90°, đánh thẳng trước – sau theo nhịp chân, vai thả lỏng. Tay đánh nhanh – mạnh sẽ kéo chân bước nhanh hơn, thành tích cải thiện ngay.' },
      { q: 'Tốc độ chạy phụ thuộc hai yếu tố nào và làm sao tăng chúng?', a: 'Tốc độ = TẦN SỐ BƯỚC × ĐỘ DÀI BƯỚC. Tăng tần số bằng đánh tay nhanh và tiếp đất bằng nửa trước bàn chân để bật lại nhanh; tăng độ dài bước bằng đạp sau mạnh và biên độ chân hợp lý. Quan trọng là không gồng cứng — gồng làm cả hai giảm.' },
    ]
  ),

  'S8GDTC-w02-quiz': L(
    'Chạy 200m — Kỹ thuật chạy đường vòng',
    '200m là cự ly đặc biệt: nửa đầu chạy trên đường vòng (đường cong), nửa sau trên đường thẳng. Vào cua sai kỹ thuật là mất tốc độ và dễ trượt chân. Hôm nay các em học cách "ôm cua" và phân phối sức cho cự ly này.',
    [
      'Hiểu đặc điểm cấu trúc đường chạy 200m.',
      'Thực hiện đúng kỹ thuật chạy trên đường vòng (nghiêng thân, đánh tay lệch).',
      'Biết phân phối sức hợp lý giữa đoạn cong và đoạn thẳng.',
    ],
    [
      { h: 'Đặc điểm của cự ly 200m' },
      { p: '200m bắt đầu bằng đoạn đường cong rồi chuyển sang đoạn đường thẳng về đích. Vì có đường cong, vận động viên xuất phát ở các ô lệch nhau (so le) để mọi người chạy đúng quãng đường bằng nhau. Vẫn dùng xuất phát thấp như 100m.' },
      { h: 'Lực ly tâm khi vào cua' },
      { p: 'Khi chạy đường cong, cơ thể có xu hướng văng ra ngoài do lực ly tâm. Nếu chạy thẳng đứng, em sẽ bị đẩy ra mép ngoài làn, mất tốc độ. Vì vậy phải NGHIÊNG NGƯỜI VÀO TÂM vòng để giữ quỹ đạo cong.' },
      { h: 'Kỹ thuật chạy đường vòng' },
      { ul: [
        'Nghiêng cả thân vào phía trong vòng (~5–10°), không chỉ nghiêng đầu.',
        'Tay PHẢI đánh mạnh và rộng hơn tay trái để giữ thăng bằng khi nghiêng.',
        'Bàn chân phải hơi xoay vào trong, đặt gần vạch trong làn.',
        'Bước chân phải dài hơn, sải rộng hơn chân trái một chút.',
      ] },
      { h: 'Chuyển từ đường cong sang đường thẳng' },
      { p: 'Khi vừa hết cua, em từ từ đưa thân về thẳng đứng và "bung" hết tốc độ trên đoạn thẳng. Nhiều bạn giữ tư thế nghiêng quá lâu hoặc đột ngột đổi tư thế làm mất nhịp — phải chuyển mượt mà.' },
      { h: 'Phân phối sức cho 200m' },
      { ul: [
        '~50–60m đầu (vào cua): tăng tốc mạnh nhưng giữ kỹ thuật ôm cua chuẩn.',
        'Giữa quãng: duy trì tốc độ gần tối đa, thở đều.',
        '~80m cuối (đường thẳng): dồn toàn lực, đánh đích.',
      ] },
      { note: 'Lỗi hay gặp: chỉ nghiêng đầu mà thân vẫn thẳng (vô tác dụng), chạy dạt ra mép ngoài làn, hoặc xuất phát quá nhanh nên hụt hơi 50m cuối. Khởi động kỹ khớp gối – cổ chân vì vào cua tải lệch một bên.' },
    ],
    [
      { q: 'Khi chạy đường cong của 200m, em phải nghiêng người về phía nào và vì sao?', a: 'Em nghiêng cả thân vào TÂM VÒNG (phía trong). Lý do: chạy đường cong sinh ra lực ly tâm đẩy cơ thể văng ra ngoài; nghiêng vào trong giúp cân bằng lực này, giữ quỹ đạo chạy sát mép trong làn — quãng đường ngắn nhất và không mất tốc độ.' },
      { q: '200m vẫn dùng xuất phát thấp như 100m, đúng hay sai? Giải thích.', a: 'Đúng. Dù dài hơn 100m, 200m vẫn cần tăng tốc tối đa ngay từ đầu nên dùng xuất phát thấp có bàn đạp. Điểm khác là vị trí xuất phát so le ở đầu đường cong để mọi người chạy đủ quãng đường bằng nhau.' },
      { q: 'Bạn chạy 200m bị dạt ra mép ngoài làn ở khúc cua. Em chỉ lỗi và cách sửa?', a: 'Bạn chưa nghiêng thân vào trong, hoặc chỉ nghiêng đầu. Sửa: nghiêng cả thân ~5–10° vào tâm vòng, tay phải đánh mạnh hơn, bàn chân phải xoay nhẹ vào trong và đặt sát vạch trong. Tập chạy ôm cua chậm trước, quen rồi tăng tốc dần.' },
    ]
  ),

  'S8GDTC-w03-quiz': L(
    'Chạy bền — Phương pháp và test Cooper',
    'Chạy bền là môn rèn ý chí nhiều nhất — không phải ai bứt nhanh lúc đầu là thắng, mà ai phân phối sức và duy trì nhịp tốt mới về đích trước. Hôm nay các em học cách đánh giá sức bền tim phổi bằng test Cooper và cách rèn luyện khoa học.',
    [
      'Hiểu bản chất chạy bền và tác dụng với hệ tim mạch – hô hấp.',
      'Biết cách thực hiện và đánh giá test Cooper 12 phút.',
      'Xây dựng được kế hoạch rèn sức bền vừa sức, tăng dần.',
    ],
    [
      { h: 'Chạy bền là gì?' },
      { p: 'Chạy bền là chạy với tốc độ ỔN ĐỊNH trong thời gian dài (cự ly trung bình – dài). Mục tiêu không phải tốc độ tối đa mà là duy trì vận động lâu. Tập chạy bền giúp tim đập khoẻ hơn, phổi trao đổi khí tốt hơn, mạch máu dẻo dai — nền tảng sức khoẻ cho mọi môn.' },
      { h: 'Test Cooper — đo sức bền tim phổi' },
      { p: 'Test Cooper do bác sĩ Kenneth Cooper đề xuất: chạy HẾT SỨC trong đúng 12 phút trên đường bằng, rồi đo tổng quãng đường chạy được. Chạy càng xa, sức bền (chỉ số VO₂max — khả năng hấp thụ oxy tối đa) càng tốt.' },
      { h: 'Thang đánh giá tham khảo (nam 13–14 tuổi)' },
      { ul: [
        'Xuất sắc: trên 2400m.',
        'Tốt: 2200 – 2400m.',
        'Trung bình: 1900 – 2200m.',
        'Cần cố gắng: dưới 1900m.',
      ] },
      { p: 'Với nữ cùng độ tuổi, các mốc thấp hơn khoảng 200–300m. Đây chỉ là tham khảo — quan trọng là tiến bộ của chính em qua các lần đo.' },
      { h: 'Phân phối sức khi làm test' },
      { ul: [
        'Không lao đi như chạy ngắn ở phút đầu — sẽ kiệt sức giữa chừng.',
        'Giữ tốc độ đều mà em có thể duy trì gần hết 12 phút.',
        'Để dành sức "rút" ở 1–2 phút cuối nếu còn.',
      ] },
      { h: 'Cách rèn sức bền khoa học' },
      { ul: [
        'Chạy đều 20–30 phút, 3 buổi/tuần.',
        'Tăng dần thời gian/quãng đường mỗi 1–2 tuần (nguyên tắc tăng tiến).',
        'Xen kẽ chạy biến tốc (nhanh – chậm) để nâng ngưỡng chịu đựng.',
        'Không tập hai buổi nặng liên tiếp.',
      ] },
      { note: 'Nhịp thở là bí quyết: hít sâu bằng mũi, thở ra bằng miệng, theo nhịp chân (2 bước hít – 2 bước thở, hoặc 3-3 khi nhẹ). Thở có nhịp giúp tránh xóc hông và cấp đủ oxy.' },
    ],
    [
      { q: 'Test Cooper được thực hiện như thế nào và đo cái gì?', a: 'Chạy hết sức trong đúng 12 phút trên đường bằng, sau đó đo tổng quãng đường chạy được. Quãng đường phản ánh sức bền tim phổi (gián tiếp ước lượng VO₂max). Chạy càng xa, sức bền càng tốt.' },
      { q: 'Sai lầm phổ biến nhất khi mới tập chạy bền là gì?', a: 'Chạy quá nhanh ngay từ đầu rồi kiệt sức, phải đi bộ hoặc bỏ cuộc. Chạy bền đòi hỏi PHÂN PHỐI SỨC: khởi đầu vừa phải, giữ tốc độ đều, để dành sức rút đích. Đây vừa là kỹ thuật vừa là rèn ý chí.' },
      { q: 'Một bạn chạy Cooper được 2050m, lần sau được 2150m. Em đánh giá thế nào?', a: 'Lần đầu ở mức trung bình (nam 13–14 tuổi: 1900–2200m). Quan trọng hơn cả mốc là bạn ĐÃ TIẾN BỘ thêm 100m — chứng tỏ kế hoạch tập đang hiệu quả. Em khuyên bạn duy trì 3 buổi/tuần, tăng dần thời gian để tiếp tục cải thiện.' },
    ]
  ),

  'S8GDTC-w04-quiz': L(
    'Bài thể dục liên hoàn nâng cao',
    'Bài thể dục liên hoàn lớp 8 dài và khó hơn các lớp dưới: nhiều động tác hơn, biên độ rộng hơn, có cả động tác nhảy. Đẹp ở đây không phải làm cho có, mà là ĐÚNG biên độ — ĐÚNG nhịp — ĐỒNG ĐỀU cả lớp như một.',
    [
      'Nắm cấu trúc và thứ tự các nhóm động tác của bài liên hoàn.',
      'Thực hiện đúng biên độ và phối hợp tay – chân – thân nhịp nhàng.',
      'Phối hợp đồng đều theo nhịp đếm và biểu diễn được theo nhạc.',
    ],
    [
      { h: 'Bài thể dục liên hoàn là gì?' },
      { p: 'Là chuỗi các động tác nối tiếp nhau không ngừng, mỗi động tác nhắm một nhóm cơ và một hướng vận động khác nhau. Bài lớp 8 thường 8–10 động tác, mỗi động tác tính theo nhịp 2×8 hoặc 4×8.' },
      { h: 'Thứ tự các nhóm động tác' },
      { ul: [
        'Vươn thở — khởi đầu, điều hoà hơi thở.',
        'Tay — cơ vai, ngực, cánh tay.',
        'Chân — cơ đùi, bắp chân.',
        'Lườn — cơ vùng eo, hông.',
        'Bụng (lưng) — cơ bụng, lưng dưới.',
        'Vặn mình (toàn thân) — phối hợp nhiều nhóm cơ.',
        'Nhảy — sức bật, phối hợp.',
        'Điều hoà — hạ nhịp, kết thúc.',
      ] },
      { h: 'Yêu cầu kỹ thuật' },
      { ul: [
        'Đúng biên độ: tay giơ cao thì sát tai, đưa ngang thì ngang vai; chân gập/duỗi đủ tầm.',
        'Đúng nhịp: làm khớp với nhịp đếm 8, không nhanh hơn hay chậm hơn cả lớp.',
        'Phối hợp hơi thở: động tác mở/giơ lên — hít vào; động tác gập/hạ xuống — thở ra.',
      ] },
      { h: 'Yêu cầu tập thể' },
      { p: 'Bài liên hoàn thường tập đồng diễn cả lớp. Tiêu chí cốt lõi là: ĐỒNG ĐỀU — ĐÚNG NHỊP — ĐÚNG HƯỚNG. Một bạn lệch nhịp hay sai hướng sẽ phá vỡ cả đội hình.' },
      { h: 'Tác dụng của bài liên hoàn' },
      { p: 'Phát triển TOÀN DIỆN: sức mạnh, sức bền, độ dẻo, sự khéo léo và khả năng phối hợp vận động — vì không chuyên sâu vào một nhóm cơ nào mà tác động cân đối toàn thân.' },
      { note: 'Lỗi thường gặp: làm "cho xong", không hết biên độ, quên phối hợp thở, sai nhịp với lớp. Đẹp = đúng biên độ + đúng nhịp + khí thế dứt khoát.' },
    ],
    [
      { q: 'Mỗi động tác trong bài liên hoàn thường được đếm theo nhịp như thế nào?', a: 'Theo nhịp 8 — mỗi động tác kéo dài 2×8 hoặc 4×8 nhịp. Người hô đếm "1-2-3-4-5-6-7-8" cho lần thứ nhất, rồi "2-2-3-4..." cho lần thứ hai. Cả lớp phải khớp đúng nhịp đếm này.' },
      { q: 'Vì sao bài thể dục liên hoàn được coi là phát triển toàn diện?', a: 'Vì nó gồm nhiều động tác lần lượt tác động lên các nhóm cơ và hướng vận động khác nhau (tay, chân, lườn, bụng, vặn mình, nhảy), đồng thời rèn cả sức mạnh, sức bền, độ dẻo và khả năng phối hợp — không chuyên sâu một nhóm cơ mà phát triển cân đối toàn thân.' },
      { q: 'Một bạn làm động tác tay nhưng chỉ giơ lên lưng chừng, không sát tai. Em sửa thế nào?', a: 'Bạn chưa hết biên độ nên động tác vừa không đẹp vừa kém tác dụng lên cơ vai. Em nhắc bạn: khi giơ tay lên cao phải duỗi thẳng, ép sát hai tai; đưa ngang thì đúng ngang vai. Tập trước gương để tự thấy biên độ, kết hợp phối hợp thở cho đúng.' },
    ]
  ),

  'S8GDTC-w05-quiz': L(
    'Nhảy cao — Kỹ thuật nằm nghiêng (bước qua)',
    'Nhảy cao kiểu "nằm nghiêng" (hay "bước qua") là kỹ thuật cơ bản các em học ở THCS trước khi nghe tới kiểu "úp bụng" hay "lưng qua xà" của vận động viên. Một lần nhảy gồm bốn giai đoạn — quan trọng nhất là pha giậm nhảy chuyển tốc độ chạy đà thành lực bay lên.',
    [
      'Nắm 4 giai đoạn của kỹ thuật nhảy cao nằm nghiêng.',
      'Thực hiện đúng chạy đà, giậm nhảy bằng một chân và tư thế qua xà.',
      'Biết kỹ thuật tiếp đất an toàn.',
    ],
    [
      { h: 'Bốn giai đoạn của nhảy cao' },
      { ul: [
        'Chạy đà — thường 5–7 bước, chạy chếch với xà (góc ~30–45°).',
        'Giậm nhảy — đạp mạnh bằng MỘT chân (chân giậm, ở xa xà).',
        'Bay trên không (qua xà) — tư thế nằm nghiêng, lần lượt đưa chân qua.',
        'Tiếp đất — bằng chân lăng trước rồi chân giậm, hoặc lăn người trên đệm.',
      ] },
      { h: 'Chạy đà' },
      { p: 'Chạy đà chếch một góc với xà chứ không vuông góc. Mục tiêu là đạt tốc độ vừa phải, ỔN ĐỊNH để bước cuối rơi đúng điểm giậm. Người mới cần đo đà: chạy thử vài lần, đếm số bước, đánh dấu điểm xuất phát đà.' },
      { h: 'Giậm nhảy — quyết định độ cao' },
      { ul: [
        'Giậm bằng MỘT chân — chân ở xa xà, thường là chân khoẻ.',
        'Đặt cả bàn chân xuống đất, đạp mạnh hướng LÊN trên.',
        'Đồng thời chân kia (chân lăng) đá mạnh lên cao, hai tay vung phối hợp.',
        'Lực giậm chủ yếu hướng lên — khác với nhảy xa (hướng ra trước).',
      ] },
      { h: 'Tư thế "nằm nghiêng" qua xà' },
      { p: 'Khi lên đến điểm cao, người ở tư thế NẰM NGHIÊNG song song với xà: chân lăng vắt qua trước, thân nghiêng, rồi chân giậm gập gối thu qua sau. Vì người nghiêng song song xà nên gọi là kiểu "nằm nghiêng".' },
      { h: 'Tiếp đất an toàn' },
      { ul: [
        'Tiếp đất bằng chân lăng trước, rồi đến chân giậm.',
        'Khuỵu gối hoãn xung, có thể lăn người trên đệm để phân tán lực.',
        'Luôn nhảy vào đệm/hố cát, không nhảy xuống nền cứng.',
      ] },
      { note: 'Lỗi phổ biến: chạy đà vuông góc với xà, giậm hai chân, hoặc tiếp đất cứng bằng gót gây đau gối. An toàn: phải có đệm đỡ phía sau xà, xà phải dễ rơi khi va (không cố định cứng).' },
    ],
    [
      { q: 'Nhảy cao giậm nhảy bằng mấy chân và là chân nào?', a: 'Giậm bằng MỘT chân — là chân ở xa xà, thường là chân khoẻ (chân giậm). Chân còn lại là chân lăng, đá mạnh lên cao hỗ trợ lực bay. Giậm hai chân thì không chuyển được tốc độ chạy đà thành lực bay lên cao.' },
      { q: 'Vì sao kỹ thuật này gọi là "nằm nghiêng"?', a: 'Vì ở thời điểm qua xà, thân người ở tư thế nằm nghiêng song song với thanh xà — chân lăng vắt qua trước, thân nghiêng, chân giậm thu qua sau. Tư thế nghiêng đó là đặc trưng của kiểu nhảy này.' },
      { q: 'Lực giậm nhảy trong nhảy cao khác nhảy xa ở điểm nào?', a: 'Trong nhảy cao, lực giậm hướng chủ yếu LÊN TRÊN để đưa người vượt qua xà. Trong nhảy xa, lực giậm hướng ra TRƯỚC (và hơi lên) để bay xa. Cùng là giậm một chân nhưng hướng dồn lực khác nhau theo mục tiêu cao hay xa.' },
    ]
  ),

  'S8GDTC-w06-quiz': L(
    'Nhảy xa — Kiểu ưỡn thân',
    'Lớp dưới các em đã học nhảy xa kiểu "ngồi". Lên lớp 8, các em làm quen kiểu "ưỡn thân" — trên không ưỡn người ra sau như cánh cung để giữ thăng bằng và kéo dài đường bay. Đây là kỹ thuật khó hơn nhưng cho thành tích tốt hơn nếu làm đúng.',
    [
      'Nắm 4 giai đoạn của nhảy xa và đặc điểm kiểu ưỡn thân.',
      'Thực hiện đúng chạy đà – giậm nhảy đúng ván và động tác ưỡn thân trên không.',
      'Tiếp đất an toàn, lao thân về trước để không mất thành tích.',
    ],
    [
      { h: 'Bốn giai đoạn của nhảy xa' },
      { ul: [
        'Chạy đà — tạo tốc độ tối ưu, bước cuối rơi đúng ván giậm.',
        'Giậm nhảy — đạp một chân trên ván, chuyển tốc độ ngang thành lực bay.',
        'Bay trên không — kiểu ưỡn thân: ưỡn người ra sau giữ thăng bằng.',
        'Tiếp đất — duỗi chân về trước, khuỵu gối hoãn xung, lao thân về trước.',
      ] },
      { h: 'Chạy đà và giậm nhảy' },
      { p: 'Chạy đà đạt tốc độ TỐI ƯU (không phải tối đa) và ổn định để bước cuối rơi chính xác lên ván. Giậm bằng một chân (chân giậm), đạp cả bàn chân, lực hướng lên và ra trước. KHÔNG được vượt qua mép trước ván giậm — vượt là phạm quy, không tính thành tích.' },
      { h: 'Đặc điểm kiểu ưỡn thân' },
      { p: 'Sau khi rời ván, em ưỡn thân ra sau, hai tay đưa cao – ra sau, ngực căng như cánh cung. Tư thế này giúp GIỮ THĂNG BẰNG khi bay và chuẩn bị cho việc đưa chân ra xa khi tiếp đất, nhờ đó kéo dài đường bay so với kiểu ngồi.' },
      { h: 'Vì sao kiểu ưỡn thân cho thành tích tốt hơn?' },
      { ul: [
        'Giữ thăng bằng tốt trên không, không bị quay người sớm.',
        'Tạo đà để bung chân ra trước mạnh ở pha tiếp đất.',
        'Đưa được điểm tiếp đất xa hơn so với kiểu ngồi.',
      ] },
      { h: 'Tiếp đất' },
      { p: 'Khi sắp chạm cát, gập gối, đưa hai chân DUỖI THẲNG về trước, hai tay đưa ra trước. Tiếp đất bằng GÓT chân trước, rồi cả bàn chân, khuỵu gối hoãn xung và LAO THÂN VỀ TRƯỚC — tuyệt đối không ngã ngửa về sau.' },
      { h: 'Cách đo thành tích' },
      { p: 'Đo từ mép trước ván giậm tới DẤU CƠ THỂ GẦN VẠCH NHẤT trên cát, vuông góc với vạch giậm. Vì vậy nếu ngã ngửa, dấu mông/lưng gần vạch hơn gót → mất thành tích.' },
      { note: 'Lỗi phổ biến: đo đà sai nên giậm hụt/vượt ván, ưỡn thân quá đà mất kiểm soát, hoặc ngã ngửa khi tiếp đất. Bài bổ trợ: bật xa tại chỗ, lò cò chân giậm, bật cóc để tăng sức bật.' },
    ],
    [
      { q: 'Vì sao kỹ thuật này gọi là "ưỡn thân"?', a: 'Vì sau khi rời ván giậm, người ưỡn ra sau — ngực căng, lưng cong như cánh cung, hai tay đưa cao ra sau. Tư thế ưỡn người đặc trưng đó chính là tên gọi của kiểu nhảy.' },
      { q: 'Khi tiếp đất nhảy xa, em tiếp xúc cát bằng phần nào và phải lưu ý điều gì?', a: 'Tiếp đất bằng GÓT chân trước (hai chân duỗi thẳng về trước), rồi cả bàn chân, khuỵu gối hoãn xung. Lưu ý quan trọng: phải LAO THÂN VỀ TRƯỚC, không ngã ngửa — vì thành tích đo tới dấu cơ thể gần vạch giậm nhất, ngã ngửa sẽ tính dấu mông và mất thành tích.' },
      { q: 'Bạn nhảy xa giậm đúng ván nhưng trên không cứ co người lại như "ngồi", thành tích ngắn. Em góp ý gì?', a: 'Đó là kiểu "ngồi" cơ bản. Để cải thiện, bạn nên tập kiểu ưỡn thân: sau khi rời ván, ưỡn người ra sau giữ thăng bằng, rồi bung mạnh hai chân về trước khi tiếp đất. Cách này kéo điểm tiếp đất ra xa hơn, thành tích sẽ dài hơn rõ rệt.' },
    ]
  ),

  'S8GDTC-w07-quiz': L(
    'Đẩy tạ — Kỹ thuật cơ bản (vai hướng ném)',
    'Đẩy tạ là môn ném đặc trưng của điền kinh — nhưng "đẩy" chứ không phải "ném". Tạ nặng nên kỹ thuật sai rất dễ chấn thương khớp vai, khuỷu. Hôm nay các em học cách cầm tạ, tư thế chuẩn bị và động tác đẩy với lực đến từ chân – hông chứ không phải tay.',
    [
      'Biết cách cầm và đặt tạ đúng, an toàn.',
      'Thực hiện đúng tư thế chuẩn bị (vai hướng ném) và động tác ra sức cuối.',
      'Hiểu nguyên lý truyền lực và góc đẩy tối ưu.',
    ],
    [
      { h: 'Đẩy tạ — "đẩy" chứ không "ném"' },
      { p: 'Trong đẩy tạ, tạ được ĐẨY đi từ vai bằng động tác duỗi tay nhanh, KHÔNG vung tay ném như ném bóng. Ném tạ bằng động tác vung tay rất dễ trật khớp vai và là phạm quy. Đây là điều phải nhớ đầu tiên.' },
      { h: 'Cách cầm và đặt tạ' },
      { ul: [
        'Đặt tạ lên các đầu ngón tay và phần gốc ngón (không nắm sâu trong lòng bàn tay).',
        'Áp tạ vào hõm cổ – dưới cằm, sát hàm.',
        'Khuỷu tay nâng lên, hướng tạ về phía sẽ đẩy.',
      ] },
      { h: 'Tư thế chuẩn bị' },
      { p: 'Một kiểu cơ bản ở THCS là tư thế VAI HƯỚNG NÉM: đứng nghiêng, vai bên tay đẩy hướng về phía ném; chân thuận (chân trụ) ở sau, chân kia ở trước; thân hơi gập và xoay về sau để "lấy đà" cho thân.' },
      { h: 'Động tác ra sức cuối — chuỗi truyền lực' },
      { ul: [
        'Đạp mạnh chân trụ (chân sau), duỗi gối – hông.',
        'Xoay hông và thân về hướng đẩy.',
        'Vai vươn lên, cuối cùng DUỖI nhanh cánh tay đẩy tạ ra trước – lên cao.',
        'Cổ tay và ngón tay "bật" tạ ở khoảnh khắc cuối.',
      ] },
      { p: 'Lực đẩy chính đến từ CHÂN và HÔNG truyền lên, tay chỉ là khâu cuối. Người chỉ dùng tay sẽ đẩy rất gần và dễ đau vai.' },
      { h: 'Góc đẩy tối ưu' },
      { p: 'Góc đẩy hợp lý khoảng 38°–42° so với mặt đất — cân bằng giữa thành phần lực bay lên và bay ra xa. Quá ngang thì tạ rơi sớm, quá dốc thì tạ lên cao mà không đi xa.' },
      { note: 'KHÔNG ném tạ như ném bóng — dễ chấn thương khớp vai. Tạ cho HS THCS thường 3–4 kg. An toàn: chỉ đẩy khi phía trước trống và có hiệu lệnh; nhặt tạ theo lệnh, không tung hứng.' },
    ],
    [
      { q: 'Tạ cho học sinh THCS thường nặng bao nhiêu?', a: 'Khoảng 3–4 kg. Trọng lượng này vừa sức để học sinh tập đúng kỹ thuật mà không quá tải lên khớp vai, khuỷu. Quan trọng là tập đúng kỹ thuật hơn là cố đẩy tạ nặng.' },
      { q: 'Lực đẩy tạ chủ yếu đến từ đâu? Vì sao không nên chỉ dùng tay?', a: 'Lực đẩy chủ yếu đến từ CHÂN và HÔNG truyền lên: đạp chân trụ → xoay hông – thân → vai vươn → cuối cùng tay duỗi đẩy tạ. Nếu chỉ dùng tay, lực rất yếu nên tạ đi gần, đồng thời dồn áp lực lớn lên khớp vai gây đau và dễ chấn thương.' },
      { q: 'Bạn vung tay ném tạ như ném bóng. Em nhắc bạn điều gì?', a: 'Em nhắc bạn: đây là động tác SAI và NGUY HIỂM. Tạ phải được ĐẨY đi từ vai bằng cách duỗi nhanh cánh tay, không vung tay ném. Vung tay ném tạ rất dễ trật khớp vai và còn là phạm quy trong thi đấu. Bạn cần đặt tạ áp cổ, đẩy ra trước – lên cao theo chuỗi chân – hông – vai – tay.' },
    ]
  ),

  'S8GDTC-w08-quiz': L(
    'Đá cầu — Tâng cầu nhịp và phối hợp nhóm',
    'Đá cầu là môn thể thao dân tộc rất gần gũi với học sinh Việt Nam — sân nhỏ, dụng cụ rẻ, hai ba bạn cũng chơi được. Lớp 8 các em nâng cao số lần tâng cầu và học phối hợp đỡ – chuyền cầu theo nhóm, rèn phản xạ và sự ăn ý.',
    [
      'Thực hiện được tâng cầu bằng đùi, má trong với số lần nhiều hơn.',
      'Biết các cách đỡ cầu tuỳ độ cao của cầu đến.',
      'Phối hợp đá cầu nhóm 3 người, rèn phản xạ và sự ăn ý.',
    ],
    [
      { h: 'Đá cầu — môn thể thao dân tộc' },
      { p: 'Đá cầu là môn thể thao truyền thống của Việt Nam, được đưa vào thi đấu chính thức. Trò chơi rèn sự khéo léo, phản xạ, thăng bằng và sức bền chân. Lớp 8 yêu cầu cao hơn về số lần tâng và khả năng phối hợp nhóm.' },
      { h: 'Tâng cầu bằng đùi' },
      { p: 'Dùng mặt đùi (gần gối) tâng cầu liên tục lên cao ngang ngực. Đùi đưa lên dứt khoát, mắt nhìn cầu, thân giữ thăng bằng. Mục tiêu lớp 8: tâng đùi liên tục 30 lần trở lên.' },
      { h: 'Các cách đỡ cầu theo độ cao' },
      { ul: [
        'Cầu đến cao ngang đầu/ngực: đỡ bằng ngực hoặc đùi.',
        'Cầu đến tầm trung: đỡ bằng đùi.',
        'Cầu đến thấp: đỡ bằng MÁ TRONG hoặc mu bàn chân.',
      ] },
      { h: 'Kỹ thuật chung khi tâng – đỡ' },
      { ul: [
        'Trọng tâm thấp, gối hơi chùng, sẵn sàng di chuyển.',
        'Tiếp xúc cầu nhẹ nhàng, "đỡ" để cầu nảy vừa tầm rồi chuyền.',
        'Mắt luôn theo cầu, không nhìn chỗ khác.',
      ] },
      { h: 'Phối hợp đá cầu nhóm 3 người' },
      { p: 'Ba bạn đứng thành tam giác, lần lượt chuyền cầu cho nhau. Mỗi người chỉ chạm cầu MỘT lần rồi chuyền sang bạn khác, giữ cho cầu không rơi càng lâu càng tốt. Cần gọi tên/báo hiệu cho bạn nhận, đá nhẹ và chính xác.' },
      { h: 'Tác dụng của phối hợp nhóm' },
      { p: 'Rèn phản xạ nhanh, khả năng phán đoán đường cầu, sự ăn ý và tinh thần đồng đội. Một nhóm phối hợp tốt giữ cầu được rất lâu — đó là mục tiêu luyện tập.' },
      { note: 'Lỗi phổ biến: đá quá mạnh làm cầu bay khỏi tầm bạn, không báo hiệu nên hai người cùng đỡ một cầu, hoặc nhìn chỗ khác làm lỡ nhịp. An toàn: chọn sân phẳng, không vướng người qua lại.' },
    ],
    [
      { q: 'Đá cầu là môn thể thao truyền thống của nước nào?', a: 'Đá cầu là môn thể thao dân tộc của Việt Nam (một số nước châu Á cũng có trò tương tự), được đưa vào thi đấu chính thức. Trò chơi rèn sự khéo léo, phản xạ, thăng bằng và sức bền chân cho người tập.' },
      { q: 'Cầu đến ở các độ cao khác nhau thì đỡ bằng bộ phận nào?', a: 'Cầu đến cao ngang đầu/ngực thì đỡ bằng ngực hoặc đùi; cầu tầm trung đỡ bằng đùi; cầu thấp đỡ bằng má trong hoặc mu bàn chân. Chọn đúng bộ phận tiếp xúc theo độ cao giúp giữ cầu chính xác.' },
      { q: 'Trong đá cầu nhóm 3, cần lưu ý gì để giữ cầu lâu?', a: 'Cần đá NHẸ và chính xác về phía bạn nhận, báo hiệu/gọi tên để tránh hai người cùng đỡ một cầu, mỗi người chỉ chạm một lần rồi chuyền, và luôn theo dõi cầu để di chuyển kịp. Phản xạ nhanh và sự ăn ý là chìa khoá giữ cầu không rơi.' },
    ]
  ),

  'S8GDTC-w09-quiz': L(
    'Bóng đá — Kỹ thuật chuyền bóng',
    'Trong bóng đá, chuyền bóng chiếm phần lớn thời gian trận đấu — một đội chuyền tốt là đội kiểm soát được trận. Lớp 8 các em hoàn thiện chuyền ngắn bằng má trong (lòng trong) và làm quen chuyền dài bằng mu chính diện. Chuyền không chỉ là kỹ thuật chân mà còn là sự quan sát.',
    [
      'Thực hiện đúng chuyền ngắn bằng má trong (lòng trong) bàn chân.',
      'Làm quen kỹ thuật chuyền dài bằng mu chính diện/mu ngoài.',
      'Hiểu các yếu tố của một đường chuyền tốt: hướng, lực, thời điểm.',
    ],
    [
      { h: 'Vì sao chuyền bóng quan trọng?' },
      { p: 'Chuyền là kỹ năng cơ bản và được dùng nhiều nhất trong bóng đá — phần lớn thời gian một trận là chuyền – nhận. Đội nào chuyền chính xác, giữ được bóng thì kiểm soát thế trận. Vì thế chuyền tốt là nền tảng của mọi lối chơi.' },
      { h: 'Chuyền ngắn bằng má trong (lòng trong)' },
      { ul: [
        'Dùng cho cự ly ngắn, dưới ~15m — chính xác cao, dễ kiểm soát.',
        'Chân trụ đặt cạnh bóng, mũi chân trụ CHỈ HƯỚNG định chuyền.',
        'Chân chuyền xoay ra ngoài 90°, KHOÁ CỔ CHÂN chắc.',
        'Tiếp xúc bằng phần má trong (lòng trong), đánh vào tâm bóng.',
      ] },
      { h: 'Chuyền dài bằng mu chính diện' },
      { p: 'Để chuyền xa 20–30m, dùng MU CHÍNH DIỆN (hoặc mu ngoài) cho lực mạnh. Chạy đà chếch, vung chân mạnh, tiếp xúc dưới – giữa bóng để bóng vừa có lực vừa bay bổng qua khoảng cách dài.' },
      { h: 'Ba yếu tố của một đường chuyền tốt' },
      { ul: [
        'ĐÚNG HƯỚNG: bóng đến đúng vị trí đồng đội hoặc khoảng trống họ chạy tới.',
        'ĐỦ LỰC: không quá mạnh (đồng đội khó khống chế) cũng không quá nhẹ (đối phương cắt được).',
        'ĐÚNG THỜI ĐIỂM: chuyền khi đồng đội đang thoát người, đường chuyền có ý đồ.',
      ] },
      { h: 'Quan sát trước khi chuyền' },
      { p: 'Trước khi chuyền phải NGẨNG ĐẦU quan sát vị trí đồng đội và đối phương. Chuyền "có địa chỉ" chứ không chuyền đại. Chuyền vào hướng chạy phía trước đồng đội để họ nhận bóng trong di chuyển, không phải dừng lại chờ.' },
      { note: 'Lỗi phổ biến: mũi chân trụ không chỉ đúng hướng (bóng đi chéo), không khoá cổ chân (bóng yếu, lệch), cúi đầu nhìn bóng nên không thấy đồng đội. Tập chuyền tường 50 lần/ngày để chính xác dần.' },
    ],
    [
      { q: 'Chuyền má trong (lòng trong) hiệu quả ở cự ly khoảng bao nhiêu, xa hơn dùng kỹ thuật gì?', a: 'Chuyền má trong tốt nhất ở cự ly ngắn, dưới khoảng 15m, vì cho độ chính xác cao. Xa hơn thì dùng MU CHÍNH DIỆN (hoặc mu ngoài) để có lực mạnh, bóng bay được 20–30m.' },
      { q: 'Vì sao khi chuyền bóng đầu phải ngẩng lên?', a: 'Để QUAN SÁT vị trí đồng đội và đối phương trước khi chuyền, nhờ đó chuyền "có địa chỉ" và đúng thời điểm — đến đúng người hoặc khoảng trống họ đang chạy tới. Cúi đầu nhìn bóng sẽ không thấy ai đang trống, dễ chuyền hỏng hoặc bị cắt.' },
      { q: 'Bạn chuyền bóng bằng lòng trong nhưng bóng cứ đi chéo sang một bên. Em tìm lỗi giúp bạn?', a: 'Hai khả năng: (1) mũi chân TRỤ không chỉ đúng hướng định chuyền — bóng đi theo hướng chân trụ; (2) điểm chạm bóng lệch, không vào tâm bóng. Em bảo bạn đặt mũi chân trụ chỉ thẳng về đích trước, khoá cổ chân chuyền, đánh đúng tâm bóng. Tập chuyền tường để chỉnh dần.' },
    ]
  ),

  'S8GDTC-w10-quiz': L(
    'Bóng đá — Chiến thuật cơ bản và sơ đồ đội hình',
    'Biết đá bóng cá nhân chưa đủ — bóng đá là môn tập thể nên phải hiểu CHIẾN THUẬT: mỗi người chơi ở vị trí nào, làm nhiệm vụ gì, cả đội phối hợp ra sao. Hôm nay các em làm quen các sơ đồ đội hình phổ biến và cách chuyển đổi giữa tấn công và phòng ngự.',
    [
      'Đọc hiểu các sơ đồ đội hình phổ biến và đặc điểm của chúng.',
      'Nắm vai trò các tuyến: thủ môn, hậu vệ, tiền vệ, tiền đạo.',
      'Hiểu nguyên tắc chuyển đổi trạng thái công – thủ.',
    ],
    [
      { h: 'Sơ đồ đội hình là gì?' },
      { p: 'Sơ đồ đội hình là cách bố trí và phân vai 10 cầu thủ ngoài sân (không tính thủ môn) thành các tuyến hậu vệ – tiền vệ – tiền đạo. Cách viết theo thứ tự từ hàng phòng ngự ra hàng tấn công.' },
      { h: 'Các sơ đồ phổ biến' },
      { ul: [
        '4-4-2: cân bằng, dễ chơi, phổ biến với đội học sinh.',
        '4-3-3: thiên về tấn công, nhiều cầu thủ trên hàng công.',
        '5-3-2 (hoặc 5-4-1): thiên về phòng ngự, đông hậu vệ.',
        '3-5-2: kiểm soát tuyến giữa, hai tiền vệ cánh dâng cao – lùi sâu linh hoạt.',
      ] },
      { h: 'Vai trò các tuyến' },
      { ul: [
        'THỦ MÔN: người duy nhất được dùng tay trong vùng cấm, cản phá và phát động bóng.',
        'HẬU VỆ: bảo vệ khung thành, cắt bóng, kèm tiền đạo đối phương.',
        'TIỀN VỆ: "trái tim" đội bóng, nối phòng ngự với tấn công, tổ chức lối chơi.',
        'TIỀN ĐẠO: ghi bàn, gây sức ép lên hàng thủ đối phương.',
      ] },
      { h: 'Chuyển đổi công – thủ' },
      { p: 'Bóng đá hiện đại là chuyển trạng thái liên tục. KHI MẤT BÓNG: lập tức lùi về tổ chức phòng ngự, gây áp lực ngay để giành lại bóng (pressing). KHI CÓ BÓNG: dâng cao nhanh, mở rộng đội hình tìm khoảng trống để tấn công.' },
      { h: 'Nguyên tắc chung khi không có bóng' },
      { ul: [
        'Giữ cự ly đội hình hợp lý, không để hở khoảng trống lớn.',
        'Bọc lót cho đồng đội khi họ bị qua người.',
        'Pressing có tổ chức, không lao lên hỗn loạn.',
      ] },
      { note: 'Không có sơ đồ nào "mạnh nhất" tuyệt đối — tuỳ con người và đối thủ mà chọn. Quan trọng là cả đội HIỂU NHIỆM VỤ của mình và phối hợp ăn ý. Kỷ luật chiến thuật thắng tài năng lẻ tẻ.' },
    ],
    [
      { q: 'Sơ đồ "4-3-3" nghĩa là gì và thiên về điều gì?', a: 'Số đọc từ hàng phòng ngự ra: 4 hậu vệ – 3 tiền vệ – 3 tiền đạo (không tính thủ môn). Với 3 tiền đạo, sơ đồ này thiên về TẤN CÔNG, tạo nhiều mũi nhọn trên hàng công. Đổi lại, hàng phòng ngự phải vững và các tiền vệ phải lùi về hỗ trợ khi mất bóng.' },
      { q: 'Tiền vệ giữ vai trò gì trong đội hình?', a: 'Tiền vệ là tuyến giữa, được ví như "trái tim" đội bóng: NỐI hàng phòng ngự với hàng tấn công, tổ chức và phân phối bóng, vừa tham gia phòng ngự khi mất bóng vừa kiến tạo khi có bóng. Kiểm soát tuyến giữa thường quyết định thế trận.' },
      { q: 'Khi đội vừa mất bóng, theo nguyên tắc chiến thuật cả đội nên làm gì?', a: 'Lập tức chuyển sang trạng thái phòng ngự: lùi về tổ chức đội hình, giữ cự ly hợp lý, bọc lót cho nhau và GÂY ÁP LỰC ngay lên người cầm bóng (pressing) để cố giành lại bóng càng nhanh càng tốt — không để đối phương dễ dàng triển khai tấn công.' },
    ]
  ),

  'S8GDTC-w11-quiz': L(
    'Bóng rổ — Chuyền bóng hai tay trước ngực',
    'Bóng rổ là môn tốc độ và phối hợp. Chuyền bóng hai tay trước ngực (chest pass) là kiểu chuyền cơ bản và nhanh nhất — dùng nhiều nhất khi không có đối thủ cản trực tiếp. Hôm nay các em học cầm bóng, động tác đẩy và khi nào nên đổi sang kiểu chuyền khác.',
    [
      'Thực hiện đúng kỹ thuật cầm bóng và chuyền hai tay trước ngực.',
      'Hiểu cự ly và tình huống phù hợp của chest pass.',
      'Biết chọn kiểu chuyền thay thế khi bị đối thủ áp sát.',
    ],
    [
      { h: 'Cầm bóng' },
      { p: 'Hai bàn tay đặt hai bên bóng, ngón tay XOÈ RỘNG ôm lấy bóng, hai ngón cái phía sau tạo hình chữ "W". Bóng giữ ngang ngực, hai khuỷu hơi thu vào thân. Không ôm bóng bằng lòng bàn tay áp sát mà dùng đầu ngón và phần đệm ngón.' },
      { h: 'Động tác chuyền hai tay trước ngực' },
      { ul: [
        'Hơi gập gối lấy đà, có thể bước một chân về trước theo lực đẩy.',
        'Đẩy bóng từ ngực thẳng ra phía trước, DUỖI hai tay hết cỡ.',
        'Lật cổ tay xuống – ra ngoài, hai ngón cái quay xuống, tạo xoáy nhẹ.',
        'Hướng bóng tới NGANG NGỰC người nhận để họ dễ bắt.',
      ] },
      { h: 'Cự ly phù hợp' },
      { p: 'Chest pass hiệu quả ở cự ly khoảng 3–7m. Đây là đường chuyền nhanh và mạnh nhất khi đường truyền trống. Xa hơn nên dùng chuyền một tay trên đầu (overhead) hoặc chuyền móc; gần và bị cản thì dùng chuyền nảy đất.' },
      { h: 'Bounce pass — khi bị cản' },
      { p: 'Khi có đối thủ đứng giữa giơ tay cản, dùng BOUNCE PASS: cùng kỹ thuật nhưng đẩy bóng nảy xuống sàn một lần (điểm nảy ở khoảng 2/3 đường tới đồng đội). Bóng đi DƯỚI tầm tay đối thủ nên khó bị cắt, đồng đội bắt bóng ngang hông.' },
      { h: 'Quan sát và thời điểm chuyền' },
      { ul: [
        'Ngẩng đầu quan sát đồng đội và đối thủ trước khi chuyền.',
        'Chuyền đến tay đồng đội đang ở vị trí thuận lợi, không bị kèm.',
        'Đường chuyền dứt khoát, đủ lực, hướng vào điểm dễ bắt.',
      ] },
      { note: 'Lỗi phổ biến: chuyền yếu nên bị cắt, chuyền cao quá đầu hoặc thấp quá khó bắt, không lật cổ tay nên bóng không xoáy. Khi bị áp sát mà cố chest pass thẳng thì rất dễ bị chặn — phải chuyển sang bounce pass.' },
    ],
    [
      { q: 'Chuyền hai tay trước ngực hiệu quả ở cự ly khoảng bao nhiêu?', a: 'Khoảng 3–7m, khi đường truyền giữa em và đồng đội đang trống. Đây là đường chuyền nhanh và mạnh nhất trong tình huống đó. Xa hơn nên dùng chuyền một tay trên đầu hoặc chuyền móc.' },
      { q: 'Khi có đối thủ đứng giữa giơ tay cản, em nên chuyền kiểu gì và vì sao?', a: 'Dùng BOUNCE PASS (chuyền nảy đất): đẩy bóng nảy xuống sàn ở khoảng 2/3 đường tới đồng đội. Bóng đi DƯỚI tầm tay giơ cao của đối thủ nên khó bị cắt, đồng đội bắt bóng ngang hông. Chest pass thẳng trong trường hợp này dễ bị chặn.' },
      { q: 'Khi cầm bóng để chuyền chest pass, hai ngón cái và các ngón tay đặt thế nào?', a: 'Hai bàn tay đặt hai bên bóng, các ngón tay xoè rộng ôm bóng bằng đầu ngón và phần đệm ngón, hai ngón cái nằm phía sau bóng tạo thành hình chữ "W". Cách cầm này giúp kiểm soát bóng tốt và khi đẩy thì lật được cổ tay tạo xoáy.' },
    ]
  ),

  'S8GDTC-w12-quiz': L(
    'Bóng rổ — Kỹ thuật ném rổ',
    'Ném rổ là pha quyết định ghi điểm — và là kỹ thuật cần luyện tinh tế nhất. Ném vào rổ không phải nhờ mạnh tay mà nhờ tư thế chuẩn và sự ổn định. Hôm nay các em học quy tắc "BEEF" và chuỗi truyền lực từ chân lên tay khi ném.',
    [
      'Nắm quy tắc BEEF — bốn yếu tố của tư thế ném rổ chuẩn.',
      'Thực hiện đúng chuỗi truyền lực và động tác vung tay theo (follow-through).',
      'Hiểu vai trò của độ xoáy ngược (backspin) với khả năng vào rổ.',
    ],
    [
      { h: 'Cầm bóng để ném' },
      { p: 'Bóng đặt trên đầu ngón và phần đệm ngón của TAY THUẬN (tay ném). Tay không thuận đỡ BÊN cạnh bóng để giữ thăng bằng, KHÔNG đẩy bóng. Lòng bàn tay thuận không áp sát bóng — có khe hở nhỏ.' },
      { h: 'BEEF — bốn chữ vàng của ném rổ' },
      { ul: [
        'B — Balance: thăng bằng, hai chân rộng bằng vai, gối hơi chùng.',
        'E — Eyes: mắt nhìn vào điểm trên vành rổ.',
        'E — Elbow: khuỷu tay ném thẳng dưới bóng, hướng về rổ (không vẹo ra ngoài).',
        'F — Follow-through: vung tay theo sau khi ném, cổ tay gập, ngón tay chỉ vào rổ.',
      ] },
      { h: 'Chuỗi truyền lực khi ném' },
      { p: 'Lực ném đến từ CHÂN lên chứ không phải chỉ từ tay: gập gối lấy đà → duỗi gối – hông → vai vươn → tay đẩy bóng lên – ra trước → cổ tay và đầu ngón tay "đẩy" bóng cuối cùng. Nhờ vậy ném được xa mà tay không gồng cứng.' },
      { h: 'Follow-through và độ xoáy ngược' },
      { p: 'Sau khi bóng rời tay, tay vẫn DUỖI THẲNG theo, cổ tay gập xuống như động tác "vẫy chào" rổ. Bóng rời ra bằng đầu ngón tay nên xoay NGƯỢC (backspin). Bóng xoáy ngược khi chạm vành sẽ "ăn" vành, dội nhẹ và dễ rơi vào rổ hơn.' },
      { h: 'Nguyên tắc luyện ném' },
      { ul: [
        'Tập từ GẦN rồi xa dần — gần rổ, vạch ném phạt, rồi xa hơn.',
        'Ổn định tư thế BEEF trước khi nghĩ tới ném 3 điểm.',
        'Lặp lại nhiều lần để động tác thành phản xạ, ổn định.',
      ] },
      { note: 'Lỗi phổ biến: khuỷu tay vẹo ra ngoài (bóng lệch trái/phải), dùng cả hai tay đẩy bóng (bóng lệch), không follow-through (bóng không xoáy, hay trượt vành). Đứng trước gương kiểm tra khuỷu thẳng dưới bóng.' },
    ],
    [
      { q: 'BEEF trong ném rổ là viết tắt của những gì?', a: 'Bốn yếu tố của tư thế ném rổ chuẩn: Balance (thăng bằng), Eyes (mắt nhìn vành rổ), Elbow (khuỷu tay thẳng dưới bóng, hướng rổ), Follow-through (vung tay theo, cổ tay gập, ngón chỉ vào rổ). Nhớ BEEF giúp duy trì kỹ thuật ổn định.' },
      { q: 'Vì sao bóng cần xoáy ngược (backspin) khi ném rổ?', a: 'Bóng xoáy ngược khi chạm vành rổ sẽ "ăn" vành, mất bớt động năng và dội nhẹ nhàng nên dễ rơi vào rổ — kể cả khi chạm vành mà không vào trực tiếp. Xoáy ngược có được nhờ động tác follow-through: bóng rời ra bằng đầu ngón tay, cổ tay gập xuống.' },
      { q: 'Bạn ném rổ mà bóng cứ lệch sang một bên. Em chỉ lỗi theo BEEF?', a: 'Khả năng cao là KHUỶU tay (chữ E thứ hai) bị vẹo ra ngoài thay vì thẳng dưới bóng hướng về rổ; hoặc bạn dùng cả tay không thuận để đẩy bóng làm bóng lệch. Em bảo bạn đứng trước gương, chỉnh khuỷu thẳng dưới bóng, tay không thuận chỉ đỡ bên cạnh, rồi follow-through hướng ngón tay vào rổ.' },
    ]
  ),

  'S8GDTC-w13-quiz': L(
    'Bóng chuyền — Chuyền bóng cao tay (búng)',
    'Bóng chuyền có ba kỹ thuật nền: chuyền cao tay (búng), đệm bóng và đập. Chuyền cao tay là kỹ thuật chính của người chuyền 2 (setter) — đưa bóng đẹp lên cho đồng đội đập. Bí quyết nằm ở đôi tay tạo "khung" và tiếp xúc bằng đầu ngón tay.',
    [
      'Thực hiện đúng tư thế tay và thân khi chuyền cao tay.',
      'Tiếp xúc bóng bằng đầu ngón tay, phối hợp toàn thân để đẩy bóng.',
      'Biết tránh lỗi "cầm bóng" (dính bóng) khi chuyền.',
    ],
    [
      { h: 'Chuyền cao tay dùng khi nào?' },
      { p: 'Dùng cho bóng đến CAO — ngang trán hoặc cao hơn. Đây là kỹ thuật chuyền chính xác nhất, thường dùng để chuyền 2 (set ball) đưa bóng lên đúng vị trí cho đồng đội đập, hoặc trả bóng nhẹ qua lưới.' },
      { h: 'Tư thế tay — quan trọng nhất' },
      { ul: [
        'Hai tay đưa lên ngang trán, cao hơn đầu một chút.',
        'Hai ngón cái và hai ngón trỏ tạo HÌNH TAM GIÁC (như cửa sổ nhìn bóng).',
        'Các ngón còn lại xoè ra ôm theo hình quả bóng.',
        'CHỈ ĐẦU NGÓN TAY chạm bóng — KHÔNG dùng lòng bàn tay.',
      ] },
      { h: 'Tư thế thân' },
      { ul: [
        'Đứng dưới bóng, hai chân rộng bằng vai, một chân hơi trước.',
        'Đầu gối CHÙNG, sẵn sàng bật lên.',
        'Thân thẳng, mắt nhìn bóng qua "khung" hai tay.',
      ] },
      { h: 'Pha búng — phối hợp toàn thân' },
      { p: 'Khi bóng tới, duỗi đồng thời ĐẦU GỐI – HÔNG – TAY để đẩy bóng đi. Lực đẩy đến từ CẢ THÂN, không chỉ riêng tay. Tiếp xúc bóng chỉ trong khoảnh khắc rồi bóng đi ngay — không giữ bóng. Hướng bóng lên cao về phía tay đập (thường ở vị trí số 4).' },
      { h: 'Follow-through' },
      { p: 'Sau khi đẩy, hai tay DUỖI THẲNG theo hướng bóng đi. Đây là dấu hiệu của một pha chuyền có lực và đúng hướng.' },
      { h: 'Lỗi "cầm bóng" cần tránh' },
      { p: 'Nếu dùng lòng bàn tay hoặc giữ bóng quá lâu, trọng tài bắt lỗi "cầm bóng" (dính bóng/carrying) — mất điểm. Phải tiếp xúc bằng đầu ngón tay và đẩy đi NGAY, không dừng.' },
      { note: 'Tập tự búng tại chỗ với bóng nhẹ 50 lần/ngày để đầu ngón tay quen cảm giác. Lỗi hay gặp: tay không tạo tam giác (bóng lệch), không chùng gối (bóng yếu), dùng lòng tay (cầm bóng).' },
    ],
    [
      { q: 'Khi chuyền cao tay, em tiếp xúc bóng bằng phần nào của bàn tay?', a: 'Bằng ĐẦU NGÓN TAY — không phải lòng bàn tay. Hai ngón cái và hai ngón trỏ tạo thành hình tam giác, các ngón còn lại xoè ôm theo bóng. Tiếp xúc bằng đầu ngón giúp đẩy bóng chính xác và tránh lỗi cầm bóng.' },
      { q: 'Lỗi "cầm bóng" trong bóng chuyền là gì và làm sao tránh?', a: 'Là lỗi giữ/dính bóng quá lâu khi chuyền (thường do dùng lòng bàn tay) thay vì đẩy bóng đi ngay — trọng tài thổi phạt, mất điểm. Để tránh: chỉ chạm bóng bằng đầu ngón tay, tiếp xúc trong khoảnh khắc rồi đẩy bóng đi liền, không dừng lại.' },
      { q: 'Bạn chuyền cao tay nhưng bóng bay yếu và không đủ cao tới tay đập. Em góp ý?', a: 'Bạn chỉ dùng lực tay mà chưa phối hợp thân. Đúng kỹ thuật: khi bóng tới phải duỗi đồng thời đầu gối – hông – tay để đẩy bóng, lực đến từ cả thân. Em nhắc bạn chùng gối khi đón bóng rồi bật cả người lên đẩy bóng, kèm follow-through tay duỗi theo hướng bóng đi.' },
    ]
  ),

  'S8GDTC-w14-quiz': L(
    'Bóng chuyền — Phát bóng và đập bóng',
    'Một pha bóng chuyền bắt đầu bằng phát bóng và thường kết thúc bằng cú đập ghi điểm. Phát bóng mở đầu game, còn đập bóng là vũ khí tấn công mạnh nhất. Hôm nay các em học phát thấp tay/cao tay, kỹ thuật đập cơ bản và luật ba lần chạm.',
    [
      'Thực hiện được phát bóng thấp tay và làm quen phát cao tay.',
      'Nắm các bước cơ bản của kỹ thuật đập bóng.',
      'Hiểu luật ba lần chạm và phối hợp đỡ – chuyền – đập.',
    ],
    [
      { h: 'Phát bóng — mở đầu pha bóng' },
      { ul: [
        'Phát THẤP TAY: tay không thuận giữ bóng ngang hông, tay thuận vung từ dưới lên đánh vào bóng — dễ học, ổn định, hợp người mới.',
        'Phát CAO TAY: tung bóng lên cao, tay thuận vung trên đầu đánh vào bóng — mạnh và khó đỡ hơn nhưng khó thực hiện hơn.',
      ] },
      { h: 'Kỹ thuật đập bóng' },
      { ul: [
        'Chạy đà ngắn (thường 3 bước) hướng tới bóng.',
        'Giậm hai chân, bật nhảy cao.',
        'Trên không: vung tay nhanh, đập mạnh bóng XUỐNG sân đối phương.',
        'Tiếp đất bằng hai chân, khuỵu gối hoãn xung.',
      ] },
      { h: 'Vì sao đập là vũ khí ghi điểm?' },
      { p: 'Đập đưa bóng đi xuống với lực mạnh và góc dốc, đối phương rất khó đỡ. Một cú đập tốt cắm bóng vào điểm yếu của sân đối phương để ghi điểm trực tiếp.' },
      { h: 'Luật ba lần chạm' },
      { p: 'Mỗi đội được chạm bóng TỐI ĐA BA LẦN trước khi đưa bóng qua lưới (không kể chắn). Cách phối hợp chuẩn: chạm 1 ĐỠ bóng — chạm 2 CHUYỀN (set) — chạm 3 ĐẬP. Một người không được chạm bóng hai lần liên tiếp.' },
      { h: 'Phối hợp đội theo ba lần chạm' },
      { ul: [
        'Người đỡ: đỡ bóng phục vụ/đập của đối phương lên cho người chuyền.',
        'Người chuyền (setter): búng bóng đẹp lên đúng tầm tay đập.',
        'Người đập: bật nhảy đập bóng dứt điểm qua lưới.',
      ] },
      { note: 'Đập bóng nhảy bằng HAI chân để bật cao và giữ thăng bằng. An toàn: tiếp đất khuỵu gối, không chạm lưới khi đập. Lỗi hay gặp: chạm bóng quá 3 lần, một người chạm 2 lần liên tiếp, hoặc đập khi bóng còn quá thấp.' },
    ],
    [
      { q: 'Mỗi đội được chạm bóng tối đa mấy lần trước khi đưa bóng qua lưới?', a: 'Tối đa BA lần chạm (không kể động tác chắn). Cách phối hợp lý tưởng là: chạm 1 đỡ — chạm 2 chuyền (set) — chạm 3 đập. Một người không được chạm bóng hai lần liên tiếp.' },
      { q: 'Khi đập bóng, vận động viên giậm nhảy bằng mấy chân và vì sao?', a: 'Bằng HAI chân. Giậm hai chân giúp bật được cao và giữ thăng bằng tốt trên không để vung tay đập mạnh, chính xác. Sau khi đập, tiếp đất cũng bằng hai chân và khuỵu gối hoãn xung để an toàn cho khớp gối.' },
      { q: 'So sánh phát bóng thấp tay và phát bóng cao tay.', a: 'Phát THẤP tay: vung tay từ dưới lên đánh bóng giữ ngang hông — dễ học, ổn định, ít lỗi, phù hợp người mới. Phát CAO tay: tung bóng lên cao rồi vung tay trên đầu đánh bóng — đường bóng mạnh và khó đỡ hơn, nhưng kỹ thuật khó hơn nên dễ hỏng nếu chưa thành thạo.' },
    ]
  ),

  'S8GDTC-w15-quiz': L(
    'Võ thuật cơ bản — Bài quyền số 1',
    'Võ thuật trong trường học không phải để "đánh nhau" mà để rèn sức khoẻ, ý chí, sự tự tin và biết tự vệ khi cần. Hôm nay các em học các tư thế tấn, đòn tay – chân cơ bản và ghép thành bài quyền số 1 — một chuỗi động tác liên hoàn rèn trí nhớ và phối hợp.',
    [
      'Thực hiện đúng các tư thế tấn cơ bản và đòn tay – chân cơ bản.',
      'Nhớ và thực hiện được bài quyền số 1.',
      'Hiểu mục đích đúng đắn của việc học võ.',
    ],
    [
      { h: 'Tư thế tấn — nền tảng của võ thuật' },
      { ul: [
        'Tấn là tư thế đứng (của chân) cơ bản, tạo thế vững và phát lực.',
        'Các kiểu tấn cơ bản: trung bình tấn (đứng ngang), đinh tấn (chân trước – chân sau), hư bộ…',
        'Trọng tâm hạ THẤP, hai chân vững, lưng thẳng.',
      ] },
      { h: 'Đòn tay cơ bản' },
      { ul: [
        'Đấm thẳng — nắm đấm đi theo đường thẳng, xoay cổ tay khi chạm đích.',
        'Gạt (đỡ) — gạt trên đỡ đòn cao, gạt dưới đỡ đòn thấp.',
        'Chỏ — dùng khuỷu tay đánh ở cự ly gần.',
      ] },
      { h: 'Đòn chân cơ bản' },
      { ul: [
        'Đá thẳng (đá tống) — đẩy gót/mu bàn chân thẳng về trước.',
        'Đá vòng (đá tạt) — chân đi theo vòng cung đánh ngang.',
        'Giữ thăng bằng bằng chân trụ, thu chân nhanh sau khi đá.',
      ] },
      { h: 'Bài quyền số 1 là gì?' },
      { p: 'Bài quyền là một CHUỖI liên hoàn các động tác (khoảng 10–15 thế) kết hợp tấn – gạt – đấm – đá theo trình tự cố định. Bài quyền số 1 dành cho người mới: đơn giản, dễ nhớ, rèn trí nhớ vận động và sự phối hợp toàn thân.' },
      { h: 'Yêu cầu khi tập quyền' },
      { ul: [
        'Đúng thứ tự và đúng hướng các thế.',
        'Động tác dứt khoát, có lực, có "khí thế".',
        'Mắt nhìn theo hướng ra đòn, thân vững.',
      ] },
      { note: 'Tinh thần võ đạo: võ thuật để RÈN NHÂN CÁCH và TỰ VỆ, không phải để gây sự hay bắt nạt bạn. Người học võ chân chính càng khiêm tốn, biết kiềm chế. An toàn: tập đúng chỗ, không ra đòn thật vào bạn khi tập quyền.' },
    ],
    [
      { q: '"Tấn" trong võ thuật nghĩa là gì?', a: '"Tấn" là tư thế đứng cơ bản của chân trong võ thuật (như trung bình tấn, đinh tấn…), tạo thế đứng vững và làm nền để phát lực ra đòn. Trọng tâm hạ thấp, hai chân vững là đặc điểm chung của các thế tấn.' },
      { q: 'Bài quyền số 1 gồm những gì và rèn luyện điều gì?', a: 'Bài quyền số 1 là một chuỗi liên hoàn khoảng 10–15 động tác kết hợp tấn – gạt – đấm – đá theo trình tự cố định, dành cho người mới. Tập bài quyền rèn TRÍ NHỚ vận động, sự phối hợp toàn thân, tính kỷ luật và khí thế dứt khoát.' },
      { q: 'Mục đích chính của việc học võ trong trường là gì?', a: 'Học võ để RÈN SỨC KHOẺ, ý chí, sự tự tin và biết TỰ VỆ khi thật sự cần — đồng thời rèn nhân cách, sự khiêm tốn và biết kiềm chế. Tuyệt đối không phải để gây sự, khoe khoang hay bắt nạt người khác.' },
    ]
  ),

  'S8GDTC-w16-quiz': L(
    'Thể dục dụng cụ — Xà đơn và lộn nhào',
    'Thể dục dụng cụ rèn sức mạnh, sự dẻo dai và cả lòng can đảm. Lớp 8 các em tập xà đơn (treo, đu) và lộn nhào trên đệm. Đây là những bài đòi hỏi kỹ thuật và an toàn cao — phải có người bảo hộ và đệm đỡ đầy đủ.',
    [
      'Thực hiện đúng kỹ thuật bám xà, treo và đu xà đơn.',
      'Thực hiện được lộn nhào về trước (lăn trước) đúng kỹ thuật.',
      'Nắm các nguyên tắc an toàn khi tập thể dục dụng cụ.',
    ],
    [
      { h: 'Bám xà đơn đúng cách' },
      { ul: [
        'Nắm xà thuận chiều (lòng bàn tay hướng ra trước), hai tay rộng bằng vai.',
        'Treo người: hai tay duỗi thẳng, toàn thân buông thả lỏng, thẳng.',
        'Vai mở, không so vai lên tai.',
      ] },
      { h: 'Đu xà (kéo lên xà)' },
      { p: 'Từ thế treo, dùng SỨC TAY và lưng KÉO người lên cho đến khi cằm vượt qua xà, rồi từ từ hạ xuống. Động tác phải bằng sức tay – không lấy đà đu người. Đu lấy đà thì không được tính.' },
      { h: 'Số lần tham khảo' },
      { ul: [
        'HS lớp 8 nam: mục tiêu 5–10 cái kéo xà đúng kỹ thuật.',
        'HS lớp 8 nữ: 1–3 cái, hoặc treo giữ người 10–20 giây.',
        'Quan trọng là tiến bộ của bản thân qua từng tuần.',
      ] },
      { h: 'Lộn nhào về trước (lăn trước)' },
      { ul: [
        'Đứng thẳng trên đệm, gập người về trước, hai tay chống đệm rộng bằng vai.',
        'Cúi đầu (cằm thu vào ngực), đẩy mông qua đầu.',
        'Lăn tròn theo thứ tự: gáy → lưng → mông, cuộn người gọn.',
        'Kết thúc ở tư thế ngồi xổm rồi đứng lên.',
      ] },
      { h: 'Vì sao phải cúi đầu khi lộn nhào?' },
      { p: 'Cằm thu vào ngực để KHÔNG tiếp đất bằng đầu/cổ — điểm tiếp xúc phải là gáy rồi lưng, mông. Ngẩng đầu khi lộn rất nguy hiểm cho cột sống cổ.' },
      { note: 'An toàn bắt buộc: lộn nhào chỉ tập trên ĐỆM dày; có người bảo hộ khi mới tập; xà đơn phải chắc chắn, có đệm đỡ phía dưới. Lỗi phổ biến: đu xà lấy đà (không tính), lộn nhào ngẩng đầu hoặc chống tay không vững.' },
    ],
    [
      { q: 'Vì sao đu xà lấy đà (đu người trước rồi giật lên) lại không được tính?', a: 'Vì kéo xà đúng phải bằng SỨC TAY và lưng, kéo người lên đến khi cằm vượt xà. Đu người lấy đà là dùng quán tính chứ không phải sức cơ, nên động tác không đạt yêu cầu kỹ thuật và không được tính. Đu lấy đà còn dễ mất kiểm soát, va đập.' },
      { q: 'Khi lộn nhào về trước, em tiếp xúc đệm theo thứ tự các bộ phận nào?', a: 'Theo thứ tự GÁY → LƯNG → MÔNG, rồi kết thúc ở tư thế ngồi xổm và đứng lên. Tuyệt đối KHÔNG tiếp đất bằng đầu/cổ — phải cúi đầu (cằm thu vào ngực) để bảo vệ cột sống cổ.' },
      { q: 'Nêu hai nguyên tắc an toàn bắt buộc khi tập lộn nhào và xà đơn.', a: '(1) Lộn nhào phải tập trên ĐỆM dày, có người bảo hộ khi mới tập, cúi đầu thu cằm để không tiếp đất bằng cổ. (2) Xà đơn phải chắc chắn, có đệm đỡ phía dưới, và kéo xà bằng sức tay chứ không đu lấy đà gây mất kiểm soát. Không tập một mình khi chưa thành thạo.' },
    ]
  ),

  'S8GDTC-w17-quiz': L(
    'Trò chơi vận động và tổ chức thi đấu',
    'Trò chơi vận động vừa rèn thể lực, sự nhanh nhẹn, vừa rèn tinh thần đồng đội và "luật chơi" — tức là biết tuân thủ quy định, chơi đẹp, chấp nhận thắng thua. Lớp 8 các em không chỉ chơi mà còn tập TỔ CHỨC một trận đấu nhỏ.',
    [
      'Tham gia và nắm luật một số trò chơi vận động phổ biến.',
      'Hiểu các yếu tố của tinh thần thể thao: tuân thủ luật, fair-play.',
      'Biết các bước cơ bản để tổ chức một trận đấu/trò chơi.',
    ],
    [
      { h: 'Một số trò chơi vận động phổ biến' },
      { ul: [
        'Cướp cờ — rèn tốc độ, phản xạ, chiến thuật nhóm.',
        'Mèo đuổi chuột — rèn nhanh nhẹn, khéo léo.',
        'Kéo co — rèn sức mạnh tập thể, sự đồng nhịp.',
        'Bóng chuyền hơi/bóng ném — rèn phối hợp đồng đội.',
      ] },
      { h: 'Yếu tố tinh thần khi chơi' },
      { ul: [
        'TUÂN THỦ LUẬT — biết và làm đúng quy định trò chơi.',
        'FAIR-PLAY — chơi đẹp, trung thực, không gian lận.',
        'TINH THẦN ĐỒNG ĐỘI — phối hợp, hỗ trợ nhau.',
        'CHẤP NHẬN THẮNG – THUA — vui khi thắng, không nản khi thua.',
      ] },
      { h: 'Fair-play là gì?' },
      { p: 'Fair-play là "chơi đẹp": thi đấu trung thực, tôn trọng đối thủ và trọng tài, không tiểu xảo, không ăn vạ, không cay cú. Một đội thua mà chơi đẹp vẫn được tôn trọng hơn đội thắng bằng gian lận.' },
      { h: 'Các bước tổ chức một trận đấu nhỏ' },
      { ul: [
        'CHIA ĐỘI cân bằng về số lượng và sức.',
        'Phổ biến LUẬT chơi rõ ràng trước khi bắt đầu.',
        'Cử TRỌNG TÀI công bằng và người TÍNH ĐIỂM.',
        'Bố trí sân, dụng cụ an toàn; có cổ vũ cho không khí.',
      ] },
      { h: 'Vai trò của trọng tài' },
      { p: 'Trọng tài điều khiển trận đấu, áp dụng luật công bằng cho cả hai đội, xử lý tình huống và giữ trật tự. Người chơi phải TÔN TRỌNG quyết định của trọng tài — đó cũng là một phần của fair-play.' },
      { note: 'Tổ chức tốt = công bằng + an toàn + vui. An toàn: kiểm tra sân bãi, dụng cụ trước khi chơi; không chơi quá sức; xử lý ngay khi có va chạm. Trò chơi để gắn kết, không phải để hơn thua bằng mọi giá.' },
    ],
    [
      { q: 'Fair-play (chơi đẹp) trong thể thao nghĩa là gì?', a: 'Là thi đấu TRUNG THỰC, tôn trọng đối thủ và trọng tài, không gian lận, không tiểu xảo, không ăn vạ hay cay cú. Tinh thần fair-play coi trọng cách chơi và sự tôn trọng con người hơn là thắng – thua bằng mọi giá.' },
      { q: 'Để tổ chức một trận đấu nhỏ cần những vai trò/khâu nào?', a: 'Cần: chia đội cân bằng; phổ biến luật rõ ràng trước khi chơi; cử trọng tài công bằng và người tính điểm; bố trí sân – dụng cụ an toàn. Ngoài ra có thể có người cổ vũ để tạo không khí. Mục tiêu là trận đấu công bằng, an toàn và vui.' },
      { q: 'Một bạn thua trận thì giận dỗi, đổ lỗi cho đồng đội. Em góp ý gì về tinh thần thể thao?', a: 'Em nhắc bạn về tinh thần CHẤP NHẬN THẮNG – THUA: thua là chuyện bình thường, quan trọng là rút kinh nghiệm và cùng cố gắng lần sau. Đổ lỗi cho đồng đội đi ngược fair-play, làm rạn nứt đội. Thái độ đẹp khi thua đáng quý hơn cả một chiến thắng.' },
    ]
  ),

  'S8GDTC-w18-quiz': L(
    'Ôn tập học kì I',
    'Tuần cuối học kì I, chúng ta hệ thống lại toàn bộ nội dung đã học: điền kinh (chạy, nhảy, đẩy tạ), các môn bóng, võ thuật và thể dục dụng cụ. Ôn tập tốt giúp các em nắm vững kỹ thuật và sẵn sàng cho kiểm tra học kì.',
    [
      'Hệ thống hoá kiến thức – kỹ thuật điền kinh học kì I.',
      'Hệ thống các môn bóng và kỹ thuật cốt lõi của từng môn.',
      'Ôn lại võ thuật, thể dục dụng cụ và nguyên tắc an toàn.',
    ],
    [
      { h: 'Nhóm điền kinh' },
      { ul: [
        'Chạy ngắn (60/100/200m): xuất phát thấp, 4 giai đoạn, đánh đích.',
        'Chạy bền: phân phối sức đều, test Cooper 12 phút, thở theo nhịp chân.',
        'Nhảy cao (nằm nghiêng) và nhảy xa (ưỡn thân): giậm 1 chân, tiếp đất an toàn.',
        'Đẩy tạ: "đẩy" không "ném", lực từ chân – hông, góc ~40°.',
      ] },
      { h: 'Nhóm các môn bóng' },
      { ul: [
        'Bóng đá: chuyền má trong/mu chính diện, sơ đồ đội hình, chuyển công – thủ.',
        'Bóng rổ: chest pass, ném rổ theo BEEF, backspin.',
        'Bóng chuyền: chuyền cao tay (búng), phát bóng, đập, luật 3 lần chạm.',
        'Đá cầu: tâng đùi, đỡ cầu theo độ cao, phối hợp nhóm 3.',
      ] },
      { h: 'Võ thuật và thể dục dụng cụ' },
      { ul: [
        'Võ: tư thế tấn, đòn tay – chân cơ bản, bài quyền số 1, tinh thần võ đạo.',
        'Thể dục dụng cụ: bám và kéo xà đơn (sức tay), lộn nhào (cúi đầu, lăn gáy – lưng – mông).',
      ] },
      { h: 'Nguyên tắc xuyên suốt' },
      { ul: [
        'Khởi động kỹ trước – hồi tĩnh sau mỗi buổi tập.',
        'Đúng kỹ thuật quan trọng hơn cố gắng quá sức.',
        'An toàn: đệm đỡ, người bảo hộ, tuân thủ hiệu lệnh.',
      ] },
      { h: 'Cách ôn tập hiệu quả' },
      { p: 'Ôn theo nhóm: với mỗi môn, nhớ KỸ THUẬT CỐT LÕI và LỖI THƯỜNG GẶP. Tự thực hành lại các động tác chính, nhờ bạn quan sát sửa lỗi. Kết hợp ôn lý thuyết (luật, khẩu lệnh) và thực hành.' },
      { note: 'Học kì II sẽ đi sâu hơn: chạy 800m/1500m, nhảy dây, aerobic, các môn bóng nâng cao, võ bài 2 và tự vệ, cùng kiến thức dinh dưỡng – phục hồi. Hãy ôn kỹ nền tảng học kì I.' },
    ],
    [
      { q: 'Sức bền tim phổi được đánh giá bằng test nào và thực hiện ra sao?', a: 'Bằng TEST COOPER: chạy hết sức trong đúng 12 phút trên đường bằng, rồi đo tổng quãng đường chạy được. Quãng đường càng dài thì sức bền tim phổi càng tốt. Đây là cách đo tiêu chuẩn, dễ thực hiện ở trường.' },
      { q: 'Tư thế ném rổ chuẩn gồm bốn yếu tố nào (BEEF)?', a: 'Balance (thăng bằng, chân rộng bằng vai, gối chùng), Eyes (mắt nhìn vành rổ), Elbow (khuỷu tay thẳng dưới bóng, hướng rổ), Follow-through (vung tay theo, cổ tay gập, ngón chỉ vào rổ). Bốn yếu tố này giúp ném ổn định, chính xác.' },
      { q: 'Hãy nêu điểm khác nhau cốt lõi giữa đẩy tạ và ném bóng.', a: 'Đẩy tạ là ĐẨY tạ đi từ vai bằng cách duỗi nhanh cánh tay, lực chính từ chân – hông; KHÔNG vung tay ném. Ném bóng thì vung tay theo chuỗi truyền lực toàn thân để ném vật ra xa. Nếu "ném" tạ như ném bóng sẽ rất dễ trật khớp vai và là phạm quy.' },
    ]
  ),

  'S8GDTC-w19-quiz': L(
    'Chạy bền nâng cao — Phân phối sức cự ly 1500m',
    'Mở đầu học kì II, các em thử sức với cự ly dài hơn: 1500m. Đây là cự ly đòi hỏi kết hợp tốc độ và sức bền — phân phối sức sai một chút là kiệt sức giữa chừng. Hôm nay học cách chia quãng và "đọc" cơ thể mình khi chạy.',
    [
      'Biết cách phân chia 1500m thành các đoạn để phân phối sức.',
      'Áp dụng nhịp thở hợp lý khi chạy cự ly dài.',
      'Nhận biết và vượt qua "cực điểm" (giai đoạn mệt nhất).',
    ],
    [
      { h: 'Đặc điểm cự ly 1500m' },
      { p: '1500m là cự ly trung bình, cần CẢ tốc độ và sức bền. Khác chạy ngắn (bùng nổ vài giây) và khác chạy rất dài (chậm đều), 1500m đòi hỏi giữ tốc độ khá cao trong thời gian dài — nên phân phối sức là yếu tố quyết định.' },
      { h: 'Phân chia 1500m thành ba đoạn' },
      { ul: [
        '500m đầu: chạy đều ~70% sức, KHÔNG lao đi như chạy ngắn.',
        '500m giữa: giữ nhịp ổn định, không để tốc độ tụt xuống.',
        '500m cuối: tăng tốc dần, bứt mạnh ~100m cuối (rút đích).',
      ] },
      { h: 'Nhịp thở khi chạy dài' },
      { p: 'Thở theo NHỊP CHÂN để cấp oxy đều: ví dụ 2 bước hít vào – 2 bước thở ra (hoặc 3-3 khi nhẹ, 2-2 khi mệt hơn). Hít sâu bằng mũi, thở ra bằng miệng. Thở có nhịp giúp tránh xóc hông và duy trì tốc độ.' },
      { h: '"Cực điểm" — giai đoạn mệt nhất' },
      { p: 'Chạy được một đoạn, em sẽ thấy rất mệt, muốn bỏ — đó là "cực điểm", lúc cơ thể chưa kịp cân đối oxy. Nếu giảm tốc nhẹ, điều hoà hơi thở và kiên trì, cơ thể sẽ chuyển sang "hô hấp ổn định" (vượt cực điểm) — chạy nhẹ nhõm hơn nhiều.' },
      { h: 'Những điều cần tránh' },
      { ul: [
        'Chạy quá nhanh ở 500m đầu — lỗi phổ biến nhất, gây kiệt sức nửa giữa.',
        'Vung tay quá mạnh, gồng vai — tốn sức vô ích.',
        'Dừng đột ngột khi mệt — dễ choáng; nên chạy/đi chậm dần.',
      ] },
      { note: 'An toàn: khởi động kỹ trước khi chạy dài; nếu đau ngực, chóng mặt, khó thở dữ dội phải DỪNG ngay và báo thầy cô. Sau khi về đích, đi bộ chậm hồi tĩnh, không ngồi sụp xuống ngay.' },
    ],
    [
      { q: 'Sai lầm lớn nhất khi chạy 1500m là gì?', a: 'Chạy quá NHANH ở 500m đầu. Khi xuất phát hưng phấn, nhiều bạn chạy như chạy ngắn nên kiệt sức ở nửa giữa, phải đi bộ hoặc bỏ cuộc. Đúng cách là chạy 500m đầu ~70% sức, giữ đều ở giữa và để dành sức rút đích.' },
      { q: 'Nhịp thở chuẩn khi chạy bền cự ly dài như thế nào?', a: 'Thở theo nhịp chân, ví dụ 2 bước hít vào – 2 bước thở ra (có thể 3-3 khi chạy nhẹ). Hít sâu bằng mũi, thở ra bằng miệng. Thở có nhịp giúp cấp oxy đều cho cơ, tránh bị xóc hông và duy trì được tốc độ.' },
      { q: 'Đang chạy 1500m, em thấy rất mệt và muốn bỏ. Đó có thể là gì và xử lý ra sao?', a: 'Có thể em đang ở "CỰC ĐIỂM" — giai đoạn mệt nhất khi cơ thể chưa cân đối kịp oxy. Em GIẢM TỐC một chút, điều hoà hơi thở (hít sâu mũi – thở dài miệng theo nhịp chân) và kiên trì chạy tiếp. Vượt qua cực điểm, cơ thể vào "hô hấp ổn định" và chạy sẽ nhẹ hơn hẳn. Không bỏ cuộc.' },
    ]
  ),

  'S8GDTC-w20-quiz': L(
    'Nhảy dây — Kỹ thuật và phát triển sức bền',
    'Nhảy dây tưởng đơn giản nhưng là bài tập "vàng": rèn sức bền tim phổi, sức bật, sự phối hợp tay – chân – mắt, mà chỉ cần một sợi dây và khoảng đất nhỏ. Hôm nay các em học kỹ thuật chuẩn, các kiểu nhảy và cách test sức bền bằng nhảy dây.',
    [
      'Thực hiện đúng kỹ thuật nhảy dây cơ bản.',
      'Biết một số kiểu nhảy nâng cao.',
      'Hiểu tác dụng và biết test sức bền qua nhảy dây 1 phút.',
    ],
    [
      { h: 'Vì sao nhảy dây là bài tập tốt?' },
      { p: 'Nhảy dây cùng lúc rèn sức bền tim phổi, sức bật chân, sự khéo léo và phối hợp tay – chân – mắt. Bài tập gọn nhẹ, ít tốn diện tích và dụng cụ, có thể tập ở nhà — rất phù hợp với học sinh.' },
      { h: 'Kỹ thuật nhảy dây cơ bản' },
      { ul: [
        'Cầm dây bằng đầu ngón tay, khuỷu thu sát thân.',
        'QUAY DÂY bằng CỔ TAY — không vung cả cánh tay.',
        'Nhảy nhẹ bằng nửa trước bàn chân, gối hơi chùng.',
        'Mắt nhìn thẳng, thân thẳng, nhảy vừa đủ cao để dây lọt qua.',
      ] },
      { h: 'Một số kiểu nhảy' },
      { ul: [
        'Nhảy cơ bản: hai chân chụm bật cùng lúc.',
        'Nhảy đổi chân: luân phiên từng chân như chạy tại chỗ.',
        'Nhảy chân chéo: bắt chéo dây trước người rồi nhảy.',
        'Nhảy hai vòng một lần (double under): quay dây hai vòng trong một lần bật.',
      ] },
      { h: 'Chọn dây phù hợp' },
      { p: 'Dây quá dài hay quá ngắn đều khó nhảy. Cách đo nhanh: đứng giẫm một chân lên giữa dây, kéo hai đầu lên — đầu dây nên tới khoảng nách hoặc ngực là vừa.' },
      { h: 'Test sức bền qua nhảy dây' },
      { p: 'Một cách kiểm tra đơn giản: nhảy liên tục TRONG 1 PHÚT, đếm số lần. HS lớp 8 mục tiêu khoảng 120 lần trở lên. Theo dõi số lần qua các tuần để thấy tiến bộ về sức bền và phối hợp.' },
      { note: 'Lỗi phổ biến: quay dây bằng cả cánh tay (mỏi nhanh, vướng dây), nhảy quá cao tốn sức, tiếp đất bằng gót gây đau gối. An toàn: nhảy trên mặt phẳng, mang giày có đệm; người mới nên tập từng đoạn ngắn rồi tăng dần.' },
    ],
    [
      { q: 'Khi nhảy dây, em quay dây bằng phần nào của tay?', a: 'Bằng CỔ TAY, không phải cả cánh tay. Khuỷu thu sát thân, chỉ cổ tay xoay đều để quay dây. Quay bằng cả cánh tay sẽ mỏi nhanh, vướng dây và khó duy trì nhịp liên tục.' },
      { q: 'Nhảy dây giúp phát triển những tố chất gì?', a: 'Nhảy dây rèn cùng lúc nhiều tố chất: sức bền tim phổi, sức bật của chân, sự khéo léo và đặc biệt là phối hợp tay – chân – mắt. Đây là bài tập toàn diện, gọn nhẹ, có thể tập ở nhà.' },
      { q: 'Bạn nhảy dây hay tiếp đất bằng cả gót chân và kêu đau gối. Em góp ý?', a: 'Tiếp đất bằng gót cứng làm lực dội lên đầu gối. Em hướng dẫn bạn nhảy NHẸ bằng nửa trước bàn chân, gối hơi chùng làm "lò xo" hoãn xung, chỉ bật vừa đủ cao để dây lọt qua. Mang giày có đệm và nhảy trên mặt phẳng cũng giúp giảm đau gối.' },
    ]
  ),

  'S8GDTC-w21-quiz': L(
    'Thể dục nhịp điệu (aerobic) — Bài cơ bản',
    'Thể dục nhịp điệu (aerobic) kết hợp vận động liên tục với âm nhạc — vừa vui, vừa rèn tim phổi và sự dẻo dai. Hôm nay các em làm quen các bước cơ bản và cách ghép động tác theo nhịp nhạc để thành một bài aerobic hoàn chỉnh.',
    [
      'Hiểu thế nào là thể dục nhịp điệu (aerobic) và tác dụng của nó.',
      'Thực hiện được các bước/động tác cơ bản của aerobic.',
      'Biết phối hợp động tác theo nhịp nhạc.',
    ],
    [
      { h: 'Aerobic là gì?' },
      { p: 'Aerobic (thể dục nhịp điệu) là bài tập kết hợp các động tác vận động LIÊN TỤC với nhịp nhạc, thường ở khoảng 120–140 nhịp/phút (BPM). Tập aerobic làm tăng nhịp tim đều đặn, đốt năng lượng (mỡ), tăng sức bền và sự dẻo dai.' },
      { h: 'Các bước/động tác cơ bản' },
      { ul: [
        'March — giậm chân tại chỗ theo nhịp.',
        'Step touch — bước sang ngang một chân rồi chạm chân kia.',
        'Grapevine — bước chéo sang ngang (bước – chéo – bước – chạm).',
        'Knee lift — nâng gối cao theo nhịp.',
        'Jumping jack — bật giang hai tay – hai chân rồi thu về.',
      ] },
      { h: 'Phối hợp tay với chân' },
      { p: 'Aerobic đẹp ở chỗ tay và chân hoạt động phối hợp: ví dụ knee lift kết hợp đưa tay, step touch kết hợp vỗ tay. Tay phải dứt khoát, đúng biên độ, đồng bộ với chân và với cả nhóm.' },
      { h: 'Ghép động tác theo nhạc' },
      { ul: [
        'Mỗi động tác thường giữ trong 8 nhịp (một "phách").',
        'Đổi sang động tác mới sau mỗi 8 nhịp, hoặc theo cụm 8×4 = 32 nhịp.',
        'Nghe nhạc để vào đúng nhịp, không nhanh – chậm hơn cả nhóm.',
      ] },
      { h: 'Cường độ và an toàn' },
      { ul: [
        'Khởi động nhẹ trước, hạ nhịp (cool-down) sau bài.',
        'Tăng cường độ dần, không nhảy quá sức ngay từ đầu.',
        'Nhảy bằng nửa trước bàn chân, tiếp đất êm để bảo vệ gối.',
      ] },
      { note: 'Lỗi hay gặp: làm động tác lệch nhịp nhạc, biên độ tay yếu, mặt không tươi (aerobic cần khí thế vui tươi). Tác dụng chính: rèn tim phổi, đốt mỡ, tăng dẻo dai và tinh thần sảng khoái.' },
    ],
    [
      { q: 'Nhạc dùng cho aerobic thường ở nhịp độ khoảng bao nhiêu?', a: 'Khoảng 120–140 nhịp/phút (BPM). Nhịp độ này đủ nhanh để giữ nhịp tim tăng đều và tạo hứng khởi, nhưng vẫn cho phép thực hiện đúng các động tác liên tục mà không quá sức.' },
      { q: 'Tác dụng chính của tập thể dục nhịp điệu (aerobic) là gì?', a: 'Tăng nhịp tim đều đặn nên rèn sức bền tim phổi, đốt năng lượng (giảm mỡ), tăng sự dẻo dai và phối hợp vận động. Ngoài ra tập theo nhạc tạo tinh thần vui tươi, sảng khoái — yếu tố tốt cho sức khoẻ tâm lý.' },
      { q: 'Một động tác aerobic thường được giữ trong bao nhiêu nhịp và đổi động tác thế nào?', a: 'Mỗi động tác thường giữ trong 8 nhịp (một phách). Người tập đổi sang động tác mới sau mỗi 8 nhịp, hoặc theo cụm 8×4 = 32 nhịp. Phải nghe nhạc để vào đúng nhịp, đồng bộ với cả nhóm — đó là yếu tố làm bài aerobic đẹp.' },
    ]
  ),

  'S8GDTC-w22-quiz': L(
    'Bóng đá — Sút bóng và đối kháng nhóm nhỏ',
    'Sút bóng là khoảnh khắc bùng nổ — nơi quyết định ghi bàn. Lớp 8 các em hoàn thiện sút bằng mu chính diện (mạnh nhất) và làm quen sút má trong (sút "cong"). Sau đó tập đối kháng nhóm nhỏ 3 đấu 3 để vận dụng kỹ thuật vào tình huống thật.',
    [
      'Thực hiện đúng kỹ thuật sút bóng bằng mu chính diện.',
      'Làm quen sút bằng má trong/má ngoài tạo bóng cong.',
      'Vận dụng kỹ thuật vào đối kháng nhóm nhỏ 3 đấu 3.',
    ],
    [
      { h: 'Sút mu chính diện — cú sút mạnh nhất' },
      { ul: [
        'Chạy đà chếch 3–5 bước.',
        'Chân trụ đặt NGAY CẠNH bóng, mũi chân trụ CHỈ HƯỚNG khung thành.',
        'Vung chân thuận mạnh, mũi chân duỗi, KHOÁ căng mu.',
        'Tiếp xúc trọn TÂM BÓNG bằng mu chính diện (phần cứng nhất bàn chân).',
      ] },
      { h: 'Điều chỉnh độ cao quả sút' },
      { ul: [
        'Sút SỆT (thấp): chạm tâm bóng hoặc trên tâm, người hơi đổ trên bóng.',
        'Sút BỔNG: chạm dưới tâm bóng, người hơi ngả về sau.',
        'Muốn sút uy lực và khó cản thì thường sút thấp, mạnh.',
      ] },
      { h: 'Sút má trong tạo bóng cong' },
      { p: 'Dùng MÁ TRONG bàn chân quệt vào một bên bóng để tạo độ xoáy, bóng đi theo đường VÒNG CUNG (banana shot) — kiểu sút phạt nổi tiếng. Sút má ngoài cũng tạo bóng cong theo hướng ngược lại. Đây là kỹ thuật khó, cần luyện nhiều.' },
      { h: 'Follow-through khi sút' },
      { p: 'Sau khi chạm bóng, chân sút TIẾP TỤC vung theo hướng sút (follow-through) — không dừng chân tại điểm chạm. Vung tiếp giúp cú sút có lực và giảm nguy cơ chấn thương cổ chân.' },
      { h: 'Đối kháng nhóm nhỏ 3 đấu 3' },
      { ul: [
        'Sân nhỏ, ít người nên ai cũng được chạm bóng nhiều.',
        'Rèn phối hợp, đột phá, dứt điểm trong không gian hẹp.',
        'Chuyển công – thủ liên tục, ra quyết định nhanh.',
      ] },
      { note: 'An toàn: KHÔNG sút mạnh khi có người đứng gần phía trước và không có hiệu lệnh; trong giờ học sút theo chỉ định của thầy cô. Lỗi hay gặp: đặt chân trụ sau bóng (bóng bay bổng vọt xà), không khoá cổ chân (sút yếu, lệch).' },
    ],
    [
      { q: 'Cú sút mạnh nhất dùng phần nào của bàn chân?', a: 'Dùng MU CHÍNH DIỆN — phần mu giữa bàn chân, dọc theo xương bàn. Đây là phần cứng nhất nên cho lực sút mạnh nhất. Khi sút phải khoá căng mu, mũi chân duỗi và tiếp xúc trọn tâm bóng.' },
      { q: 'Bạn sút bóng cứ bay vọt lên cao qua xà ngang. Em chỉ lỗi?', a: 'Bạn đang chạm DƯỚI tâm bóng — thường do đặt chân trụ ở phía SAU bóng hoặc ngả người ra sau khi sút. Sửa: đặt chân trụ NGAY CẠNH bóng (ngang bóng), người HƠI ĐỔ TRÊN bóng, chạm vào tâm hoặc trên tâm bóng — quả sút sẽ đi thấp, có lực.' },
      { q: 'Sút bóng "cong" (banana shot) thực hiện bằng cách nào?', a: 'Dùng MÁ TRONG (hoặc má ngoài) bàn chân quệt vào MỘT BÊN của bóng thay vì đánh thẳng tâm, tạo độ xoáy làm bóng đi theo đường vòng cung. Đây là kỹ thuật khó, hay dùng trong sút phạt để bóng vòng qua hàng rào, cần luyện tập nhiều.' },
    ]
  ),

  'S8GDTC-w23-quiz': L(
    'Bóng rổ — Dẫn bóng và đột phá',
    'Dẫn bóng (dribbling) là kỹ năng cá nhân quan trọng nhất của bóng rổ — không dẫn bóng được thì không di chuyển được khi có bóng. Lớp 8 các em hoàn thiện dẫn bóng cả hai tay, học đổi tay nhanh (crossover) và đột phá lên rổ.',
    [
      'Thực hiện đúng kỹ thuật dẫn bóng (dribble) bằng cả hai tay.',
      'Biết kỹ thuật đổi tay nhanh (crossover) để vượt người.',
      'Làm quen đột phá dẫn bóng lên rổ (lay-up).',
    ],
    [
      { h: 'Kỹ thuật dẫn bóng đúng' },
      { ul: [
        'Đập bóng bằng ĐẦU NGÓN và phần đệm ngón — KHÔNG dùng lòng bàn tay.',
        'Bóng nảy ngang HÔNG — không quá cao (dễ bị cướp) cũng không quá thấp (khó kiểm soát).',
        'Thân hơi gập, gối chùng, tư thế thấp sẵn sàng đổi hướng.',
        'Tay không dẫn che bóng khỏi đối thủ.',
      ] },
      { h: 'Mắt khi dẫn bóng' },
      { p: 'Mắt phải NGẨNG quan sát đồng đội, đối thủ và rổ — KHÔNG cúi nhìn bóng. Người chơi giỏi gần như không nhìn bóng khi dẫn. Đây là điểm khác lớn nhất giữa người mới và người thành thạo.' },
      { h: 'Đổi tay nhanh — crossover' },
      { p: 'Crossover là đập bóng nhanh từ tay này sang tay kia (qua trước thân) để đổi hướng đột ngột, ĐÁNH LỪA đối thủ. Khi đối thủ nghiêng theo một bên, em crossover sang bên kia để vượt qua.' },
      { h: 'Đột phá lên rổ' },
      { ul: [
        'Tăng tốc dẫn bóng về phía rổ khi thấy khoảng trống.',
        'Bước cuối thực hiện nhịp bước 1–2 (hai bước) rồi bật lên.',
        'Kết thúc bằng lay-up (đặt bóng nhẹ vào bảng/rổ) hoặc ném gần.',
      ] },
      { h: 'Tập cả hai tay' },
      { p: 'Phải tập dẫn bóng và lay-up bằng CẢ tay thuận lẫn tay không thuận. Người chỉ giỏi một tay sẽ bị đối thủ "bắt bài" — chặn hướng tay thuận là vô hiệu hoá được.' },
      { note: 'Lỗi luật cần nhớ: dẫn bóng bằng đầu ngón, không dùng lòng tay; không "hai tiếng" (đã dừng đập rồi đập lại); không "chạy bộ" (cầm bóng đi quá bước cho phép mà không đập). Lỗi kỹ thuật hay gặp: cúi nhìn bóng, dẫn bóng quá cao.' },
    ],
    [
      { q: 'Khi dẫn bóng (dribble) trong bóng rổ, em dùng phần nào của tay và để bóng nảy ở đâu?', a: 'Dùng ĐẦU NGÓN TAY và phần đệm ngón (không dùng lòng bàn tay) để kiểm soát bóng tốt hơn. Bóng nên nảy NGANG HÔNG — không quá cao kẻo bị cướp, không quá thấp kẻo khó điều khiển. Thân gập nhẹ, gối chùng, mắt ngẩng quan sát.' },
      { q: 'Crossover là gì và dùng để làm gì?', a: 'Crossover là động tác đổi tay dẫn bóng NHANH (đập bóng từ tay này sang tay kia qua trước thân) để đổi hướng đột ngột. Mục đích là ĐÁNH LỪA đối thủ: khi đối thủ nghiêng theo một bên, em crossover sang bên kia để vượt qua người.' },
      { q: 'Vì sao phải tập dẫn bóng và lay-up bằng cả hai tay?', a: 'Vì nếu chỉ giỏi một tay, đối thủ sẽ "bắt bài" và chỉ cần chặn hướng tay thuận là vô hiệu hoá em. Thành thạo cả hai tay giúp em đột phá được sang cả hai hướng, khó bị phòng ngự bắt chết — linh hoạt và lợi hại hơn nhiều.' },
    ]
  ),

  'S8GDTC-w24-quiz': L(
    'Bóng chuyền — Phối hợp đập và chắn bóng',
    'Trên lưới bóng chuyền diễn ra cuộc đấu giữa người ĐẬP và người CHẮN. Đập là tấn công, chắn là phòng thủ ngay tại lưới. Lớp 8 các em nâng cao kỹ thuật đập và học chắn bóng (block), kể cả phối hợp 2–3 người chắn.',
    [
      'Hoàn thiện kỹ thuật đập bóng tấn công.',
      'Thực hiện được kỹ thuật chắn bóng (block) tại lưới.',
      'Hiểu cách phối hợp 2–3 người chắn và luật chạm lưới.',
    ],
    [
      { h: 'Đập bóng nâng cao' },
      { ul: [
        'Chạy đà nhanh (3 bước), giậm hai chân bật cao.',
        'Trên không vung tay nhanh, đánh mạnh bóng XUỐNG sân đối phương.',
        'Nhắm vào ĐIỂM YẾU/khoảng trống của sân đối phương, không đập bừa.',
        'Tiếp đất hai chân, khuỵu gối hoãn xung.',
      ] },
      { h: 'Chắn bóng (block) là gì?' },
      { p: 'Chắn là động tác bật nhảy đưa hai tay lên trên lưới để CHẶN cú đập của đối phương, đẩy bóng trở lại sân họ hoặc làm giảm lực bóng. Đây là tuyến phòng thủ đầu tiên ngay tại lưới.' },
      { h: 'Kỹ thuật chắn bóng' },
      { ul: [
        'Bật nhảy đúng thời điểm đối phương đập (hơi sau người đập một nhịp).',
        'Đưa hai tay lên cao TRÊN lưới, ngón tay căng và xoè rộng.',
        'Hai bàn tay vươn sang sân đối phương (penetrate), "úp" bóng xuống.',
        'Tiếp đất hai chân, không chạm lưới.',
      ] },
      { h: 'Phối hợp 2–3 người chắn' },
      { p: 'Nhiều người chắn cùng lúc tạo thành "bức tường tay" che phần lớn góc đập của đối phương. Người chắn phải bật ĐỒNG THỜI, tay sát nhau không để hở khe — nếu lệch nhịp hoặc hở khe thì bóng lọt qua.' },
      { h: 'Luật chạm lưới' },
      { p: 'Khi đập hoặc chắn, CẤM chạm lưới — chạm lưới trong lúc tham gia pha bóng là phạm lỗi, mất điểm. Vì vậy phải kiểm soát động tác để tay/người không va vào lưới.' },
      { note: 'Lỗi hay gặp: bật chắn quá sớm (đã rơi xuống khi bóng mới tới), tay không căng nên bóng xuyên qua, hoặc chạm lưới khi tiếp đất. An toàn: tiếp đất khuỵu gối; không lao người vào lưới hay cọc lưới.' },
    ],
    [
      { q: 'Khi chắn bóng (block), em đưa tay như thế nào?', a: 'Bật nhảy đưa hai tay lên cao TRÊN lưới, các ngón tay căng và xoè rộng, hai bàn tay vươn sang phía sân đối phương để "úp" bóng xuống. Phải bật đúng thời điểm đối phương đập và giữ tay sát nhau nếu chắn nhiều người.' },
      { q: 'Trong lúc đập hoặc chắn, chạm lưới có sao không?', a: 'CÓ — chạm lưới khi đang tham gia pha bóng là phạm lỗi, đội bị mất điểm. Vì vậy người đập và người chắn phải kiểm soát động tác để tay và người không va vào lưới khi bật nhảy và tiếp đất.' },
      { q: 'Hai người cùng chắn nhưng bóng vẫn lọt qua giữa hai tay. Em chỉ nguyên nhân?', a: 'Nhiều khả năng hai người bật KHÔNG đồng thời hoặc để HỞ KHE giữa các bàn tay. Để bịt "bức tường tay", hai người phải bật nhảy cùng lúc, đưa tay sát nhau không để khoảng hở, cùng vươn sang sân đối phương — như vậy bóng mới không lọt qua.' },
    ]
  ),

  'S8GDTC-w25-quiz': L(
    'Đá cầu — Đá hất (tấn công) và đá cầu nhóm 3',
    'Lên trình độ cao hơn, đá cầu không chỉ tâng giữ cầu mà còn có đòn TẤN CÔNG — đá hất đưa cầu đi mạnh và xa qua lưới. Hôm nay các em học đá hất, phối hợp nhóm 3 người và làm quen thi đấu mini qua lưới.',
    [
      'Thực hiện được kỹ thuật đá hất (tấn công).',
      'Phối hợp đá cầu nhóm 3 người để giữ cầu lâu.',
      'Hiểu cách thi đấu đá cầu mini qua lưới.',
    ],
    [
      { h: 'Đá hất — đòn tấn công của đá cầu' },
      { p: 'Đá hất dùng MÁ TRONG hoặc MU bàn chân hất cầu đi CAO và XA — tương tự "phát bóng" trong bóng chuyền. Đây là đòn dùng để đưa cầu sang sân đối phương hoặc tấn công, khác với đá tâng (nhẹ, giữ cầu trên không).' },
      { h: 'Phân biệt đá hất và đá tâng' },
      { ul: [
        'Đá TÂNG: chạm nhẹ, giữ cầu trên không, dùng để khống chế cầu.',
        'Đá HẤT: chạm mạnh, đẩy cầu đi cao – xa, dùng để chuyền xa hoặc tấn công.',
      ] },
      { h: 'Kỹ thuật đá hất' },
      { ul: [
        'Trọng tâm dồn vào chân trụ, gối hơi chùng.',
        'Chân đá đưa từ dưới lên, tiếp xúc dưới quả cầu.',
        'Hất dứt khoát, hướng cầu theo đích mong muốn.',
        'Giữ thăng bằng, thu chân nhanh để chuẩn bị pha tiếp.',
      ] },
      { h: 'Phối hợp nhóm 3 hợp tác' },
      { ul: [
        'Ba bạn đứng thành tam giác.',
        'Mỗi người chạm cầu một lần rồi chuyền cho bạn khác.',
        'Mục tiêu: giữ cầu trên không LÂU NHẤT có thể.',
        'Báo hiệu/gọi tên để tránh hai người cùng đỡ một cầu.',
      ] },
      { h: 'Thi đấu đá cầu mini qua lưới' },
      { p: 'Hai bên qua lưới (giống cầu lông nhưng chỉ dùng chân/đầu, không dùng tay). Có thể chơi đơn (1 người), đôi (2 người) hoặc đồng đội (3 người). Mỗi bên tìm cách đưa cầu sang sân đối phương sao cho họ không đỡ được.' },
      { note: 'Đá hất khác đá tâng ở lực và mục đích. An toàn: chọn sân phẳng, đủ rộng; khởi động kỹ cổ chân – gối. Lỗi hay gặp: đá hất quá mạnh làm cầu ra ngoài, hoặc đỡ – hất sai nhịp khiến cầu rơi.' },
    ],
    [
      { q: 'Đá hất khác đá tâng ở điểm nào?', a: 'Đá TÂNG là chạm nhẹ để giữ cầu trên không (khống chế cầu); đá HẤT là chạm mạnh, hất cầu đi CAO và XA để chuyền xa hoặc tấn công. Khác nhau ở LỰC tiếp xúc và MỤC ĐÍCH sử dụng trong pha bóng.' },
      { q: 'Đá cầu thi đấu thường có những thể thức mấy người mỗi đội?', a: 'Có thể chơi ĐƠN (1 người/đội), ĐÔI (2 người/đội) hoặc ĐỒNG ĐỘI (3 người/đội). Hai bên thi đấu qua lưới, chỉ dùng chân (và đầu, ngực) chứ không dùng tay, tìm cách đưa cầu sang sân đối phương để ghi điểm.' },
      { q: 'Để giữ cầu lâu khi đá nhóm 3, các bạn cần phối hợp thế nào?', a: 'Ba bạn đứng thành tam giác, mỗi người chỉ chạm cầu một lần rồi chuyền sang bạn khác bằng đường cầu vừa tầm (không quá mạnh). Cần báo hiệu/gọi tên để tránh hai người cùng đỡ một cầu, và luôn theo dõi cầu để di chuyển kịp — như vậy cầu mới không rơi.' },
    ]
  ),

  'S8GDTC-w26-quiz': L(
    'Võ thuật — Bài quyền số 2 và kỹ thuật tự vệ',
    'Sau bài quyền số 1, các em học bài quyền số 2 phức tạp hơn và bắt đầu làm quen các đòn TỰ VỆ thực tế — thoát hiểm khi bị nắm, kéo. Quan trọng nhất: hiểu tinh thần võ đạo, biết khi nào nên dùng và không nên dùng võ.',
    [
      'Thực hiện được bài quyền số 2 (phức tạp hơn bài 1).',
      'Biết một số đòn tự vệ thoát hiểm cơ bản.',
      'Hiểu tinh thần võ đạo và nguyên tắc ứng xử khi gặp nguy.',
    ],
    [
      { h: 'Bài quyền số 2' },
      { p: 'Bài quyền số 2 dài và khó hơn bài 1: khoảng 15–20 động tác, kết hợp GẠT – NÉ – ĐÁNH TRẢ nhanh và liên hoàn. Bài rèn trí nhớ vận động sâu hơn, sự phối hợp toàn thân và phản xạ chuyển đòn.' },
      { h: 'Yêu cầu khi tập quyền nâng cao' },
      { ul: [
        'Nhớ đúng thứ tự và hướng các thế.',
        'Chuyển đòn mượt, không khựng giữa các thế.',
        'Động tác dứt khoát, mạnh, có khí thế, mắt nhìn theo đòn.',
      ] },
      { h: 'Một số đòn tự vệ thoát hiểm' },
      { ul: [
        'Thoát nắm cổ tay: xoay tay theo chiều hở của ngón cái đối phương để bung ra.',
        'Thoát ôm từ sau: hạ thấp trọng tâm, dùng khuỷu tay/gót chân đánh vào điểm yếu rồi vùng ra.',
        'Né – đánh trả: bước chéo né đòn, đánh vào điểm yếu (mặt, hạ bộ) rồi chạy thoát.',
      ] },
      { h: 'Nguyên tắc tự vệ đúng đắn' },
      { p: 'Tự vệ KHÔNG phải đánh trả trong mọi tình huống. Ưu tiên hàng đầu là TRÁNH – CHẠY THOÁT – KÊU CỨU – báo người lớn. Chỉ đánh trả khi không còn lựa chọn nào khác để bảo vệ bản thân, và chỉ vừa đủ để thoát thân.' },
      { h: 'Tinh thần võ đạo' },
      { p: 'Võ đạo đề cao: LỄ – TÍN – NGHĨA – TRÍ – DŨNG. Người học võ chân chính không cậy võ bắt nạt kẻ yếu, không khoe khoang gây sự, biết kiềm chế và dùng sức mạnh đúng lúc, đúng chỗ.' },
      { note: 'An toàn khi tập tự vệ: chỉ tập theo cặp có kiểm soát, ra đòn chậm và không thật vào bạn, có thầy/cô hướng dẫn. Tuyệt đối không lấy bạn ra "thử đòn" thật.' },
    ],
    [
      { q: 'Tự vệ có nghĩa là phải đánh trả trong mọi tình huống không?', a: 'KHÔNG. Khi gặp nguy, ưu tiên hàng đầu là TRÁNH, CHẠY THOÁT, KÊU CỨU và báo người lớn. Chỉ đánh trả khi không còn lựa chọn nào khác để bảo vệ bản thân, và chỉ ra đòn vừa đủ để thoát thân chứ không phải để gây thương tích.' },
      { q: 'Tinh thần võ đạo gồm những phẩm chất nào?', a: 'Gồm LỄ – TÍN – NGHĨA – TRÍ – DŨNG. Người học võ chân chính biết lễ phép, giữ chữ tín, sống có nghĩa, có trí tuệ để biết đúng – sai, và dũng cảm đúng lúc — không cậy võ bắt nạt người yếu hay khoe khoang gây sự.' },
      { q: 'Bài quyền số 2 khác bài quyền số 1 ở điểm nào?', a: 'Bài số 2 dài và phức tạp hơn (khoảng 15–20 động tác so với 10–15), kết hợp gạt – né – đánh trả nhanh và liên hoàn hơn. Nó đòi hỏi trí nhớ vận động sâu hơn, chuyển đòn mượt mà và phản xạ tốt hơn so với bài số 1 dành cho người mới.' },
    ]
  ),

  'S8GDTC-w27-quiz': L(
    'Tập sức mạnh với dụng cụ nhẹ — Bóng tạ và tạ nhẹ',
    'Tuổi các em đang lớn, tập sức mạnh đúng cách giúp khoẻ và phòng chấn thương — nhưng KHÔNG được tập tạ nặng vì có thể ảnh hưởng sụn tăng trưởng. Hôm nay các em tập với bóng tạ (medicine ball) và tạ nhẹ, ưu tiên kỹ thuật chuẩn và an toàn.',
    [
      'Biết các bài tập cơ bản với bóng tạ (medicine ball).',
      'Biết các bài tập cơ bản với tạ nhẹ.',
      'Nắm nguyên tắc an toàn khi tập sức mạnh ở tuổi học sinh.',
    ],
    [
      { h: 'Vì sao tuổi học sinh không tập tạ nặng?' },
      { p: 'Ở tuổi dậy thì, xương vẫn đang phát triển ở các SỤN TĂNG TRƯỞNG. Tập tạ quá nặng, sai kỹ thuật có thể gây tổn thương các sụn này, ảnh hưởng phát triển chiều cao. Vì vậy nên dùng dụng cụ NHẸ và trọng lượng cơ thể, ưu tiên kỹ thuật.' },
      { h: 'Bài tập với bóng tạ (medicine ball 1–3 kg)' },
      { ul: [
        'Chest pass (ném 2 tay trước ngực vào tường/bạn) — cơ ngực, tay.',
        'Slam (nâng bóng qua đầu rồi đập mạnh xuống đất) — toàn thân, cơ bụng.',
        'Squat + ném bóng lên cao — chân, vai phối hợp.',
      ] },
      { h: 'Bài tập với tạ nhẹ (1–2 kg)' },
      { ul: [
        'Cuốn tay (bicep curl) — cơ tay trước.',
        'Đẩy vai (shoulder press) — cơ vai.',
        'Squat cầm tạ — cơ đùi, mông.',
      ] },
      { h: 'Nguyên tắc tập sức mạnh an toàn' },
      { ul: [
        'KHỞI ĐỘNG kỹ các khớp trước khi tập.',
        'Ưu tiên KỸ THUẬT chuẩn hơn là trọng lượng/số lần.',
        'Tăng tải DẦN DẦN, không nhảy vọt khối lượng.',
        'Có giáo viên/người lớn GIÁM SÁT.',
      ] },
      { h: 'Tập sức mạnh đúng có làm "lùn" không?' },
      { p: 'Tập sức mạnh ĐÚNG cách (dụng cụ nhẹ, kỹ thuật chuẩn, không quá tải) KHÔNG ngăn cản phát triển chiều cao; ngược lại còn giúp xương chắc, cơ khoẻ. Chỉ khi tập SAI (tạ quá nặng, sai kỹ thuật) mới có hại cho khớp và sụn.' },
      { note: 'Cơ bắp tăng KHI NGHỈ chứ không phải khi tập — nghỉ đủ giữa các buổi (48 giờ cho cùng nhóm cơ), ngủ đủ và ăn đủ đạm. Lỗi nguy hiểm: nín thở rặn khi nâng tạ, lưng cong khi squat/đẩy.' },
    ],
    [
      { q: 'Học sinh THCS nên tập tạ nặng bao nhiêu là phù hợp?', a: 'Chỉ nên dùng dụng cụ NHẸ — bóng tạ khoảng 1–3 kg, tạ tay 1–2 kg — và ưu tiên trọng lượng cơ thể. Quan trọng là tập đúng kỹ thuật chứ không phải cố nâng nặng. Tạ quá nặng có thể ảnh hưởng sụn tăng trưởng đang phát triển.' },
      { q: 'Tập sức mạnh có làm học sinh bị "lùn", không cao được không?', a: 'KHÔNG, nếu tập ĐÚNG cách (dụng cụ nhẹ, kỹ thuật chuẩn, tăng tải dần, có giám sát) — tập đúng còn giúp xương chắc, cơ khoẻ. Chỉ tập SAI (tạ quá nặng, sai kỹ thuật, nín thở rặn) mới gây hại cho khớp và sụn tăng trưởng.' },
      { q: 'Nêu hai nguyên tắc an toàn quan trọng khi tập sức mạnh ở tuổi học sinh.', a: '(1) Khởi động kỹ và ưu tiên KỸ THUẬT chuẩn hơn trọng lượng/số lần; tăng tải dần dần. (2) Dùng dụng cụ nhẹ, có giáo viên/người lớn giám sát, không nín thở rặn khi nâng và giữ lưng thẳng. Ngoài ra cần nghỉ đủ giữa các buổi để cơ phục hồi.' },
    ]
  ),

  'S8GDTC-w28-quiz': L(
    'Bóng đá — Phòng ngự khu vực và phòng ngự kèm người',
    'Phòng ngự là một nửa của bóng đá. Có hai chiến thuật phòng ngự cốt lõi: phòng ngự KHU VỰC (mỗi người giữ một vùng) và phòng ngự KÈM NGƯỜI (mỗi người bám một đối thủ). Mỗi cách có ưu – nhược riêng, và đội mạnh biết kết hợp cả hai.',
    [
      'Hiểu nguyên lý phòng ngự khu vực (zone).',
      'Hiểu nguyên lý phòng ngự kèm người (man-to-man).',
      'So sánh ưu – nhược điểm và biết khi nào dùng cách nào.',
    ],
    [
      { h: 'Phòng ngự khu vực (zone)' },
      { p: 'Mỗi cầu thủ chịu trách nhiệm một KHU VỰC trên sân. Khi bóng hoặc đối thủ đi vào khu vực của mình thì mới áp sát, ra khỏi khu thì bàn giao cho đồng đội phụ trách khu kế bên. Cả đội giữ cự ly và khối đội hình.' },
      { h: 'Phòng ngự kèm người (man-to-man)' },
      { p: 'Mỗi cầu thủ được phân công bám SÁT một đối thủ cụ thể, theo kèm họ đi khắp sân, không rời. Mục tiêu là vô hiệu hoá từng đối thủ, đặc biệt là các cầu thủ nguy hiểm.' },
      { h: 'So sánh ưu – nhược' },
      { ul: [
        'Khu vực: ÍT TỐN SỨC, kỷ luật, giữ khối đội hình chặt; nhưng dễ vỡ khi đối thủ chuyền nhanh, di chuyển chéo khu liên tục.',
        'Kèm người: hiệu quả khắc chế NGÔI SAO đối phương; nhưng RẤT TỐN SỨC (bám chạy khắp sân) và nếu bị qua một người là tạo lỗ hổng.',
      ] },
      { h: 'Phòng ngự lai (hybrid)' },
      { p: 'Trong thực tế, các đội thường KẾT HỢP: phòng ngự khu vực ở giữa sân để tiết kiệm sức và giữ khối, chuyển sang kèm người chặt trong vòng cấm địa hoặc với cầu thủ nguy hiểm. Linh hoạt theo tình huống.' },
      { h: 'Nguyên tắc phòng ngự chung' },
      { ul: [
        'Giữ cự ly đội hình, không để hở khoảng trống lớn.',
        'Bọc lót cho đồng đội bị qua người.',
        'Không lao vào tắc bóng liều lĩnh, nhất là trong vòng cấm.',
      ] },
      { note: 'Lựa chọn chiến thuật tuỳ con người và đối thủ: đội ít người/thể lực yếu nên thiên về khu vực; gặp đối thủ có một ngôi sao nổi bật thì cân nhắc kèm người. Quan trọng là cả đội hiểu và làm đúng nhiệm vụ.' },
    ],
    [
      { q: 'Phòng ngự khu vực và phòng ngự kèm người, cách nào tốn sức hơn? Vì sao?', a: 'Phòng ngự KÈM NGƯỜI tốn sức hơn, vì mỗi cầu thủ phải bám SÁT một đối thủ và theo họ chạy khắp sân không rời. Phòng ngự khu vực thì mỗi người chỉ giữ một vùng, ít di chuyển dài hơn nên tiết kiệm sức và giữ được khối đội hình.' },
      { q: 'Một đội học sinh thể lực còn yếu nên ưu tiên kiểu phòng ngự nào?', a: 'Nên ưu tiên phòng ngự KHU VỰC — ít tốn sức, có kỷ luật, giữ được khối đội hình chặt và hạn chế khoảng trống. Phòng ngự kèm người đòi hỏi thể lực cao để bám đối thủ khắp sân nên dễ đuối với đội thể lực còn yếu.' },
      { q: 'Vì sao nhiều đội dùng "phòng ngự lai" (hybrid)?', a: 'Vì mỗi kiểu có ưu – nhược riêng. Kết hợp giúp tận dụng ưu điểm cả hai: dùng phòng ngự khu vực ở giữa sân để tiết kiệm sức và giữ khối đội hình, rồi chuyển sang kèm người chặt trong vòng cấm hoặc với cầu thủ nguy hiểm. Cách lai linh hoạt và hiệu quả theo từng tình huống.' },
    ]
  ),

  'S8GDTC-w29-quiz': L(
    'Kiểm tra giữa kì II — Chạy 800m và bài quyền',
    'Tuần này các em được đánh giá giữa kì II với hai nội dung: chạy 800m (đo sức bền và kỹ thuật phân phối sức) và biểu diễn bài quyền (đo kỹ thuật, lực và tinh thần). Hiểu rõ tiêu chí đánh giá sẽ giúp các em chuẩn bị tốt.',
    [
      'Thực hiện chạy 800m với kỹ thuật phân phối sức hợp lý.',
      'Biểu diễn được bài quyền đúng kỹ thuật, có khí thế.',
      'Hiểu các tiêu chí đánh giá để tự chuẩn bị.',
    ],
    [
      { h: 'Nội dung 1 — Chạy 800m' },
      { p: '800m là cự ly trung bình, cần kết hợp tốc độ và sức bền. Phân chia hợp lý: 400m đầu chạy ~80% sức, giữ đều; 400m sau duy trì nhịp và DỒN SỨC rút đích. Không lao quá nhanh từ đầu kẻo hụt hơi nửa sau.' },
      { h: 'Mốc tham khảo 800m (lớp 8)' },
      { ul: [
        'Nam: dưới 3 phút 30 giây là mức Tốt.',
        'Nữ: dưới 4 phút 00 giây là mức Tốt.',
        'Quan trọng vẫn là kỹ thuật và sự cố gắng, tiến bộ của bản thân.',
      ] },
      { h: 'Nội dung 2 — Biểu diễn bài quyền' },
      { p: 'Biểu diễn bài quyền số 1 hoặc số 2. Đánh giá dựa trên: ĐÚNG KỸ THUẬT (đúng thế, đúng hướng, đủ biên độ), LỰC và sự DỨT KHOÁT, cùng KHÍ THẾ – tinh thần (ánh mắt, thần thái tự tin).' },
      { h: 'Tiêu chí đánh giá tham khảo' },
      { ul: [
        'Đúng kỹ thuật: ~50%.',
        'Tốc độ / lực / sức bền: ~30%.',
        'Tinh thần, thái độ, khí thế: ~20%.',
      ] },
      { h: 'Vì sao kỹ thuật được coi trọng nhất?' },
      { p: 'Với bài quyền, ĐÚNG KỸ THUẬT quan trọng hơn nhanh – mạnh: làm sai thế dù nhanh đến đâu cũng không đạt yêu cầu, vì mục tiêu là rèn động tác chuẩn. Với chạy 800m, kỹ thuật phân phối sức quyết định thành tích nhiều hơn việc lao nhanh từ đầu.' },
      { note: 'Chuẩn bị: khởi động kỹ trước khi chạy và biểu diễn; hồi tĩnh sau chạy 800m (đi bộ chậm, thở sâu). Giữ tâm lý bình tĩnh, tự tin. An toàn: nếu chóng mặt, đau ngực khi chạy phải dừng và báo thầy cô ngay.' },
    ],
    [
      { q: 'Mốc thành tích 800m mức Tốt cho nam và nữ học sinh lớp 8 là khoảng bao nhiêu?', a: 'Tham khảo: nam dưới khoảng 3 phút 30 giây, nữ dưới khoảng 4 phút 00 giây được xem là mức Tốt. Tuy nhiên kỹ thuật phân phối sức và sự tiến bộ, cố gắng của bản thân cũng được coi trọng trong đánh giá.' },
      { q: 'Khi đánh giá bài quyền, yếu tố nào được coi trọng nhất và vì sao?', a: 'ĐÚNG KỸ THUẬT được coi trọng nhất (~50%), vì mục tiêu của tập quyền là rèn động tác chuẩn — làm sai thế thì dù nhanh, mạnh đến đâu cũng không đạt yêu cầu. Sau đó mới đến lực/tốc độ (~30%) và tinh thần, khí thế (~20%).' },
      { q: 'Em nên phân phối sức thế nào khi chạy 800m kiểm tra?', a: '400m đầu chạy khoảng 80% sức và giữ nhịp ĐỀU, không lao quá nhanh; 400m sau duy trì nhịp rồi DỒN SỨC bứt tốc về đích. Thở theo nhịp chân, giữ kỹ thuật bước chạy. Tránh sai lầm chạy quá nhanh từ đầu khiến hụt hơi ở nửa sau.' },
    ]
  ),

  'S8GDTC-w30-quiz': L(
    'Bóng rổ — Thi đấu nhóm 3 đấu 3',
    'Bóng rổ 3 đấu 3 (3x3) là thể thức rất phổ biến — sân nhỏ, ít người, nhịp nhanh, đòi hỏi kỹ thuật cá nhân cao. Hôm nay các em nắm luật 3x3 cơ bản, vài miếng phối hợp và vận dụng vào thi đấu thật.',
    [
      'Nắm luật cơ bản của bóng rổ 3 đấu 3.',
      'Biết một số miếng phối hợp đơn giản (pick & roll, iso).',
      'Vận dụng kỹ thuật và chiến thuật vào thi đấu thực tế.',
    ],
    [
      { h: 'Bóng rổ 3x3 là gì?' },
      { p: 'Là thể thức chơi 3 đấu 3 trên NỬA sân, dùng MỘT rổ. Nhịp độ nhanh, mỗi người chạm bóng nhiều, đề cao kỹ thuật cá nhân và phối hợp nhỏ. Đây là môn đã có trong Olympic.' },
      { h: 'Luật 3x3 cơ bản' },
      { ul: [
        'Chơi trên nửa sân, một rổ.',
        'Bàn thắng: trong vạch tính 1 điểm, ngoài vạch 6.75m tính 2 điểm.',
        'Thắng khi đạt 21 điểm trước, hoặc dẫn điểm khi hết 10 phút.',
        'Sau mỗi lần ghi điểm/đổi quyền, phải đưa bóng RA NGOÀI vạch (check ball) rồi chơi tiếp.',
      ] },
      { h: 'Một số miếng phối hợp' },
      { ul: [
        'Pick & roll: một đồng đội đứng CHẮN (pick) cho người cầm bóng, rồi CẮT (roll) lên rổ nhận bóng.',
        'Iso (isolation): tạo khoảng trống cho một cá nhân đối đầu 1 đấu 1 với người kèm.',
        'Chuyền nhanh – di chuyển không bóng để tạo khoảng trống dứt điểm.',
      ] },
      { h: 'Phòng ngự trong 3x3' },
      { p: 'Vì ít người, phòng ngự KÈM NGƯỜI là chính. Khi đồng đội bị qua người, phải "help" (hỗ trợ) nhanh rồi xoay vòng kèm lại. Giao tiếp – gọi nhau là yếu tố quan trọng.' },
      { h: 'Tinh thần thi đấu' },
      { ul: [
        'Tôn trọng đối thủ và quyết định trọng tài (fair-play).',
        'Phối hợp đồng đội, không "ôm bóng" một mình.',
        'Giữ thể lực vì nhịp 3x3 rất nhanh, liên tục.',
      ] },
      { note: 'An toàn: sân nhỏ đông người dễ va chạm — kiểm soát động tác, không vào bóng thô bạo. Lỗi hay gặp: quên check ball sau khi ghi điểm, đứng yên không di chuyển không bóng nên bị kèm chết.' },
    ],
    [
      { q: 'Trong bóng rổ 3 đấu 3, đội cần đạt bao nhiêu điểm để thắng?', a: 'Đội thắng khi đạt 21 điểm trước (theo luật thông dụng), hoặc nếu hết 10 phút mà chưa đội nào tới 21 thì đội DẪN ĐIỂM thắng. Lưu ý cách tính điểm 3x3: trong vạch 1 điểm, ngoài vạch 6.75m tính 2 điểm.' },
      { q: '"Pick & roll" là miếng phối hợp như thế nào?', a: 'Một đồng đội đứng CHẮN (pick/đặt màn) cản người đang kèm bạn cầm bóng, tạo khoảng trống; ngay sau đó người chắn CẮT (roll) di chuyển nhanh về phía rổ để nhận bóng và dứt điểm. Đây là miếng phối hợp hai người rất phổ biến và hiệu quả.' },
      { q: 'Sau khi một đội ghi điểm trong trận 3x3, trận tiếp tục thế nào?', a: 'Đội kia phải đưa bóng RA NGOÀI vạch (thường là vạch 3 điểm) — gọi là "check ball" — rồi mới được triển khai tấn công tiếp. Đây là điểm khác với bóng rổ 5x5 và là lỗi nhiều bạn mới quên thực hiện.' },
    ]
  ),

  'S8GDTC-w31-quiz': L(
    'Đi bộ thể thao (race walking)',
    'Đi bộ thể thao (race walking) là một môn điền kinh thú vị: đi bộ nhanh nhưng có LUẬT nghiêm ngặt, không được "chạy". Đây cũng là cách vận động an toàn, ít va đập, phù hợp rèn sức bền lâu dài. Hôm nay các em tìm hiểu luật và kỹ thuật của môn này.',
    [
      'Nắm các quy tắc cơ bản của đi bộ thể thao.',
      'Hiểu kỹ thuật đi bộ thể thao đúng.',
      'Phân biệt đi bộ thể thao với chạy.',
    ],
    [
      { h: 'Đi bộ thể thao là gì?' },
      { p: 'Là môn điền kinh thi đấu đi bộ với TỐC ĐỘ CAO nhưng phải tuân thủ luật nghiêm để không biến thành chạy. Race walking ít va đập hơn chạy nên an toàn cho khớp, phù hợp rèn sức bền và là môn có trong Olympic.' },
      { h: 'Hai quy tắc bắt buộc' },
      { ul: [
        'LUÔN có MỘT chân chạm đất — không bao giờ được có thời điểm cả hai chân cùng rời đất.',
        'Chân tiếp đất phải DUỖI THẲNG (không gập gối) từ lúc chạm đất cho tới khi qua điểm thẳng đứng (chân ở dưới thân).',
      ] },
      { h: 'Kỹ thuật đi bộ thể thao' },
      { ul: [
        'Hông đẩy luân phiên về trước, tạo sải bước dài.',
        'Cánh tay gập ~90°, đánh mạnh trước – sau theo nhịp chân.',
        'Đặt chân từ gót, lăn tới mũi, chân thẳng khi qua điểm thẳng đứng.',
        'Tốc độ cao, khoảng 7–9 km/h hoặc hơn ở vận động viên.',
      ] },
      { h: 'Xử phạt vi phạm' },
      { p: 'Trọng tài quan sát và cảnh cáo nếu thấy vận động viên rời cả hai chân khỏi đất (lifting) hoặc gập gối khi tiếp đất. Bị cảnh cáo đủ số lần (thường 3 lần từ các trọng tài khác nhau) thì bị TRUẤT QUYỀN thi đấu.' },
      { h: 'Khác nhau giữa đi bộ thể thao và chạy' },
      { p: 'Điểm khác CỐT LÕI: chạy có "PHA BAY" — thời điểm cả hai chân cùng rời mặt đất; còn đi bộ thể thao thì LUÔN có ít nhất một chân chạm đất, không có pha bay. Ngoài ra race walking bắt buộc chân tiếp đất duỗi thẳng.' },
      { note: 'Đi bộ thể thao là cách rèn sức bền an toàn, ít chấn thương, có thể duy trì lâu dài cả khi lớn tuổi. Lỗi hay gặp khi tập: vô tình nhấc cả hai chân (thành chạy), gập gối khi tiếp đất.' },
    ],
    [
      { q: 'Khác nhau cốt lõi giữa đi bộ thể thao và chạy là gì?', a: 'Đi bộ thể thao LUÔN phải có ít nhất MỘT chân chạm đất — không có thời điểm cả hai chân cùng rời đất. Chạy thì có "PHA BAY" — thời điểm cả hai chân cùng rời mặt đất. Ngoài ra, race walking còn bắt buộc chân tiếp đất phải duỗi thẳng khi qua điểm thẳng đứng.' },
      { q: 'Vận động viên đi bộ thể thao bị truất quyền khi nào?', a: 'Khi vi phạm luật (rời cả hai chân khỏi đất – "lifting", hoặc gập gối khi tiếp đất) và bị cảnh cáo đủ số lần quy định, thường là 3 lần từ các trọng tài khác nhau. Lúc đó vận động viên bị loại khỏi cuộc thi.' },
      { q: 'Nêu hai quy tắc bắt buộc của đi bộ thể thao.', a: '(1) Luôn có một chân chạm đất — không bao giờ được có thời điểm cả hai chân cùng rời đất. (2) Chân tiếp đất phải DUỖI THẲNG (không gập gối) từ khi chạm đất cho tới khi qua điểm thẳng đứng. Vi phạm hai quy tắc này sẽ bị cảnh cáo, đủ lần thì bị truất quyền.' },
    ]
  ),

  'S8GDTC-w32-quiz': L(
    'Trò chơi dân gian — Kéo co, đẩy gậy',
    'Trò chơi dân gian là di sản văn hoá quý của dân tộc — vừa vui, vừa rèn sức khoẻ và tinh thần đồng đội. Hôm nay các em tìm hiểu kéo co (đã được UNESCO ghi danh) và đẩy gậy, cùng ý nghĩa văn hoá và cách chơi an toàn.',
    [
      'Nắm cách chơi và kỹ thuật kéo co, đẩy gậy.',
      'Hiểu các quy tắc an toàn khi chơi.',
      'Hiểu ý nghĩa văn hoá của trò chơi dân gian.',
    ],
    [
      { h: 'Kéo co — sức mạnh tập thể' },
      { p: 'Kéo co là trò chơi dân gian phổ biến nhất Việt Nam, đã được UNESCO ghi danh là Di sản văn hoá phi vật thể (cùng một số nước). Hai đội bằng số người đứng đối diện qua vạch giữa, mỗi đội nắm một đầu dây thừng có buộc dấu (ruy băng/khăn) ở giữa.' },
      { h: 'Kỹ thuật kéo co' },
      { ul: [
        'Đứng so le hai chân, chân thuận trước, chân kia sau làm trụ.',
        'Người hơi NGẢ RA SAU, lưng thẳng (không gập lưng).',
        'Hai tay nắm dây chắc, khuỷu hơi gập, dồn trọng tâm về sau.',
        'Đạp chân xuống đất lấy lực, kéo theo NHỊP HÔ của đội trưởng.',
      ] },
      { h: 'Khi nào thắng?' },
      { p: 'Khi có hiệu lệnh, hai đội cùng kéo. Đội nào kéo được DẤU GIỮA (ruy băng/khăn) qua mốc bên mình thì thắng. Mấu chốt là sự ĐỒNG NHỊP của cả đội — kéo riêng lẻ không hiệu quả bằng kéo đều cùng nhịp.' },
      { h: 'Đẩy gậy' },
      { ul: [
        'Hai người đối mặt, cùng giữ một cây gậy (dài khoảng 2m).',
        'Trong một vòng tròn quy định, mỗi người tìm cách ĐẨY đối phương ra khỏi vòng.',
        'Ai bị đẩy ra khỏi vòng (hoặc buông gậy) thì thua.',
        'Rèn sức mạnh cánh tay, hông, chân và sự kiên trì.',
      ] },
      { h: 'An toàn khi chơi' },
      { ul: [
        'KÉO CO: tuyệt đối KHÔNG quấn dây quanh tay/cổ/người — nếu thua kéo bị giật rất nguy hiểm.',
        'Mang giày bám sân, không đi dép; sân khô ráo, không trơn.',
        'Khi nghe hiệu lệnh "Buông!" thì tất cả buông dây CÙNG LÚC.',
      ] },
      { note: 'Trò chơi dân gian gắn với lễ hội truyền thống, rèn đoàn kết, sức bền và tinh thần thi đấu lành mạnh. Hãy chơi và truyền lại cho các em nhỏ để giữ gìn di sản văn hoá dân tộc.' },
    ],
    [
      { q: 'Để kéo co hiệu quả, cả đội cần chú ý điều gì nhất?', a: 'Sự ĐỒNG NHỊP — cả đội đạp chân, ngả người và kéo CÙNG NHỊP theo hiệu lệnh của đội trưởng. Kỹ thuật cá nhân (đứng so le, ngả ra sau, lưng thẳng, đạp chân chắc) cũng quan trọng, nhưng nếu mỗi người kéo một nhịp riêng thì lực bị triệt tiêu, không thắng được.' },
      { q: 'Vì sao tuyệt đối không được quấn dây kéo co quanh tay hay người?', a: 'Vì khi thua kéo hoặc bị giật mạnh đột ngột, dây quấn quanh tay/cổ/người sẽ siết lại gây trầy xước, bong gân, thậm chí nghẹt thở rất nguy hiểm. Phải nắm dây bằng tay không, và khi nghe lệnh "Buông!" thì tất cả buông dây cùng lúc.' },
      { q: 'Trò chơi đẩy gậy rèn luyện những gì?', a: 'Đẩy gậy rèn SỨC MẠNH của cánh tay, hông và chân, cùng sự KIÊN TRÌ và khả năng giữ thăng bằng. Hai người dùng lực đẩy nhau ra khỏi vòng tròn, nên ai khoẻ, trụ vững và bền bỉ hơn sẽ thắng. Đây cũng là môn thi đấu trong các ngày hội thể thao dân tộc.' },
    ]
  ),

  'S8GDTC-w33-quiz': L(
    'Dinh dưỡng và phục hồi cho người tập thể thao',
    'Tập luyện chỉ là một phần — ĂN và NGHỈ mới giúp cơ thể thực sự khoẻ lên. "Tập + ăn + nghỉ" là ba trụ cột của phát triển thể thao. Hôm nay các em học cách ăn uống quanh buổi tập, bù nước và phục hồi đúng cách.',
    [
      'Hiểu vai trò các nhóm chất dinh dưỡng với người tập.',
      'Biết ăn uống và bù nước trước – trong – sau khi tập.',
      'Nắm các nguyên tắc phục hồi sau tập.',
    ],
    [
      { h: 'Bốn nhóm chất dinh dưỡng chính' },
      { ul: [
        'BỘT ĐƯỜNG (carbohydrate): cơm, mì, khoai — nguồn NĂNG LƯỢNG chính cho vận động.',
        'ĐẠM (protein): thịt, cá, trứng, sữa, đậu — XÂY DỰNG và sửa chữa cơ bắp.',
        'CHẤT BÉO lành mạnh: cá béo, dầu thực vật — năng lượng dự trữ, hấp thu vitamin.',
        'VITAMIN – KHOÁNG: rau, củ, quả — điều hoà các quá trình trong cơ thể.',
      ] },
      { h: 'Ăn uống quanh buổi tập' },
      { ul: [
        'Trước tập ~1 giờ: ăn nhẹ có bột đường (chuối, bánh mì), không ăn no, không nhiều dầu mỡ.',
        'Trong khi tập: uống nước từng ngụm nhỏ đều đặn.',
        'Sau tập ~30 phút: ăn kết hợp ĐẠM + BỘT ĐƯỜNG để phục hồi (ví dụ sữa + chuối, cơm + cá).',
      ] },
      { h: 'Bù nước đúng cách' },
      { p: 'Buổi tập khoảng 1 giờ cần bù khoảng 500–1000ml nước (uống rải rác). Buổi tập kéo dài trên 1 giờ, ra mồ hôi nhiều, cần bù thêm ĐIỆN GIẢI (oresol pha loãng, nước dừa). Không tu nước đá lạnh ừng ực khi người đang nóng.' },
      { h: 'Phục hồi sau tập' },
      { ul: [
        'NGỦ đủ 8–9 tiếng — cơ phục hồi và phát triển chủ yếu khi ngủ.',
        'GIÃN CƠ (căng giãn tĩnh) sau buổi tập để giảm đau mỏi.',
        'NGHỈ ít nhất 1 ngày/tuần, không tập hai buổi nặng liên tiếp cùng nhóm cơ.',
      ] },
      { h: 'Đặc biệt với tuổi dậy thì' },
      { ul: [
        'Tăng nhu cầu CANXI (sữa, cá nhỏ ăn cả xương) — phát triển xương.',
        'Tăng nhu cầu SẮT (thịt đỏ, rau xanh đậm) — tránh thiếu máu.',
        'Đủ ĐẠM cho cơ bắp phát triển; không nhịn ăn để giảm cân.',
      ] },
      { note: 'Quy tắc đơn giản: ăn đa dạng – đủ no – đúng giờ; nước trước, trong, sau tập; hạn chế đồ ngọt, nước có gas và đồ ăn nhanh. Cơ lớn lên KHI NGHỈ chứ không phải khi tập.' },
    ],
    [
      { q: 'Sau khi tập xong nên ăn gì và trong khoảng thời gian nào?', a: 'Trong khoảng 30 phút sau tập, nên ăn kết hợp ĐẠM + BỘT ĐƯỜNG để phục hồi — ví dụ sữa với chuối, cơm với cá, hoặc bánh mì với trứng. Bột đường bù lại năng lượng đã tiêu hao, còn đạm giúp sửa chữa và xây dựng cơ bắp.' },
      { q: 'Ngủ đủ giấc giúp ích gì cho người tập thể thao?', a: 'Cơ bắp PHỤC HỒI và phát triển chủ yếu trong lúc ngủ (cơ thể tiết hormone tăng trưởng khi ngủ sâu). Ngủ đủ 8–9 tiếng giúp tăng cơ, hồi sức, giảm nguy cơ chấn thương và giữ tinh thần tỉnh táo. Thiếu ngủ thì tập mãi cũng khó tiến bộ.' },
      { q: 'Buổi tập kéo dài trên 1 giờ ra nhiều mồ hôi thì bù nước thế nào cho đúng?', a: 'Ngoài nước lọc (uống rải rác từng ngụm), cần bù thêm ĐIỆN GIẢI vì mồ hôi làm mất muối khoáng — có thể dùng oresol pha loãng hoặc nước dừa. Không nên tu nước đá lạnh ừng ực khi cơ thể đang nóng, dễ gây sốc nhiệt dạ dày, viêm họng.' },
    ]
  ),

  'S8GDTC-w34-quiz': L(
    'Lập kế hoạch luyện tập cá nhân',
    'Tập "lúc nào rảnh thì tập" rất khó tiến bộ. Muốn khoẻ lên đều đặn, các em cần một KẾ HOẠCH: mục tiêu rõ ràng, lịch tập hợp lý và cách theo dõi tiến bộ. Hôm nay các em học cách tự lập kế hoạch luyện tập cho mình.',
    [
      'Biết cách đặt mục tiêu tập luyện theo nguyên tắc SMART.',
      'Xây dựng được lịch tập một tuần cân đối.',
      'Biết cách theo dõi tiến bộ của bản thân.',
    ],
    [
      { h: 'Vì sao cần kế hoạch luyện tập?' },
      { p: 'Có kế hoạch giúp tập ĐỀU ĐẶN, đúng trọng tâm và tiến bộ rõ ràng — thay vì tập tuỳ hứng, lúc nhiều lúc bỏ. Kế hoạch cũng giúp cân đối giữa các nhóm tố chất (sức bền, sức mạnh, kỹ thuật) và có ngày nghỉ phục hồi.' },
      { h: 'Đặt mục tiêu theo nguyên tắc SMART' },
      { ul: [
        'S — Specific (cụ thể): ví dụ "chạy 1500m dưới 7 phút".',
        'M — Measurable (đo được): có con số để kiểm tra.',
        'A — Achievable (khả thi): phù hợp sức mình, không viển vông.',
        'R — Relevant (phù hợp): đúng điều mình cần cải thiện.',
        'T — Time-bound (có thời hạn): ví dụ "trong 3 tháng".',
      ] },
      { h: 'Xây dựng lịch tập một tuần' },
      { ul: [
        'Xen kẽ ngày RÈN SỨC (chạy, tạ nhẹ) và ngày KỸ THUẬT (bóng, võ).',
        'Có ngày NGHỈ CHỦ ĐỘNG (đi bộ, giãn cơ nhẹ) và ngày NGHỈ hoàn toàn.',
        'Ví dụ: T2-4-6 rèn sức; T3-5 kỹ thuật; T7 chơi thể thao giải trí; CN nghỉ.',
        'Tổng vận động hướng tới ≥ 60 phút/ngày theo khuyến cáo của WHO.',
      ] },
      { h: 'Nguyên tắc khi lập lịch' },
      { ul: [
        'KHỞI ĐỘNG trước, hồi tĩnh sau mỗi buổi.',
        'Không xếp hai buổi nặng cùng nhóm cơ sát nhau (cần 48 giờ phục hồi).',
        'Tăng khối lượng DẦN DẦN theo tuần (nguyên tắc tăng tiến).',
      ] },
      { h: 'Theo dõi tiến bộ' },
      { p: 'Ghi NHẬT KÝ TẬP (thời gian, số lần, cảm giác) và làm test định kỳ mỗi tháng (ví dụ test Cooper, nhảy dây 1 phút, số lần kéo xà). So sánh các lần để thấy mình tiến bộ và điều chỉnh kế hoạch.' },
      { note: 'Ngày NGHỈ là một phần của kế hoạch, không phải "lười": cơ phục hồi và phát triển trong ngày nghỉ. Kế hoạch tốt là kế hoạch DUY TRÌ được lâu dài, vừa sức và có niềm vui.' },
    ],
    [
      { q: 'Nguyên tắc SMART khi đặt mục tiêu tập luyện gồm những gì?', a: 'Specific (cụ thể), Measurable (đo được), Achievable (khả thi), Relevant (phù hợp), Time-bound (có thời hạn). Ví dụ một mục tiêu SMART: "Chạy 1500m dưới 7 phút trong vòng 3 tháng" — vừa cụ thể, đo được, khả thi, phù hợp, vừa có thời hạn rõ ràng.' },
      { q: 'Vì sao trong kế hoạch tập luyện cần có ngày nghỉ?', a: 'Vì cơ bắp PHỤC HỒI và phát triển trong ngày nghỉ chứ không phải lúc đang tập — tập là kích thích, nghỉ + ngủ + ăn là lúc cơ thực sự lớn lên. Không có ngày nghỉ, cơ thể quá tải, dễ chấn thương và mệt mỏi, kết quả tập kém đi. Ngày nghỉ là một phần thiết yếu của kế hoạch.' },
      { q: 'Em theo dõi tiến bộ tập luyện của mình bằng cách nào?', a: 'Ghi NHẬT KÝ TẬP (thời gian, số lần, cảm giác mỗi buổi) và làm các TEST định kỳ hằng tháng — ví dụ test Cooper 12 phút, nhảy dây 1 phút, số lần kéo xà. So sánh kết quả qua các tháng để biết mình có tiến bộ không và điều chỉnh kế hoạch cho phù hợp.' },
    ]
  ),

  'S8GDTC-w35-quiz': L(
    'Tổng kết và biểu diễn cuối năm',
    'Tuần cuối cùng của GDTC lớp 8, chúng ta cùng nhìn lại cả năm học và biểu diễn thành quả. Quan trọng hơn điểm số, đây là dịp để các em nhận ra những thói quen tốt cần GIỮ cho cả đời và chọn hướng đi tiếp ở lớp 9.',
    [
      'Hệ thống lại toàn bộ nội dung GDTC lớp 8.',
      'Biểu diễn được thành quả luyện tập theo nhóm.',
      'Xác định thói quen tốt cần duy trì và định hướng ở lớp 9.',
    ],
    [
      { h: 'Hệ thống nội dung cả năm' },
      { ul: [
        'Điền kinh: chạy ngắn, chạy bền (Cooper, 800m, 1500m), nhảy cao, nhảy xa, đẩy tạ, đi bộ thể thao.',
        'Các môn bóng: bóng đá, bóng rổ, bóng chuyền, đá cầu — kỹ thuật và chiến thuật.',
        'Võ thuật và thể dục dụng cụ: bài quyền 1–2, tự vệ, xà đơn, lộn nhào.',
        'Kiến thức sức khoẻ: dinh dưỡng – phục hồi, lập kế hoạch tập luyện, an toàn.',
      ] },
      { h: 'Biểu diễn cuối năm' },
      { ul: [
        'Bài thể dục liên hoàn (đồng diễn cả lớp).',
        'Bài quyền võ (cá nhân hoặc nhóm).',
        'Aerobic theo nhạc.',
        'Trận đấu giao hữu các môn bóng yêu thích.',
      ] },
      { h: 'Tiêu chí biểu diễn' },
      { p: 'Với bài quyền và thể dục: ĐÚNG KỸ THUẬT + mạnh, dứt khoát + khí thế (ánh mắt, thần thái tự tin). Với đồng diễn/aerobic: thêm yếu tố ĐỒNG ĐỀU và đúng nhịp nhạc của cả nhóm.' },
      { h: 'Những thói quen tốt cần giữ' },
      { ul: [
        'Vận động ít nhất 60 phút mỗi ngày (khuyến cáo WHO).',
        'Khởi động trước – hồi tĩnh sau mỗi buổi tập, luôn đặt an toàn lên trước.',
        'Ăn đủ chất, ngủ đủ 8–9 tiếng, hạn chế đồ ngọt và màn hình.',
      ] },
      { h: 'Định hướng lớp 9' },
      { p: 'Lên lớp 9, các em sẽ học chuyên sâu hơn và có thể chọn theo CHUYÊN ĐỀ một môn thể thao yêu thích. Hãy nghĩ về môn mà em giỏi hoặc thích nhất để theo đuổi sâu hơn — và có thể đặt mục tiêu thể lực cho năm cuối THCS.' },
      { note: 'GDTC không chỉ là điểm số — đó là rèn THỂ LỰC và NHÂN CÁCH cho cả đời. Sức khoẻ là tài sản quý nhất; hãy duy trì những thói quen tốt mà em đã xây dựng trong năm học này.' },
    ],
    [
      { q: 'Khi biểu diễn bài quyền võ cuối năm, em cần thể hiện những yếu tố gì?', a: 'Cần thể hiện ĐÚNG KỸ THUẬT (đúng thế, đúng hướng, đủ biên độ), động tác MẠNH và DỨT KHOÁT, cùng KHÍ THẾ – ánh mắt và thần thái tự tin. Ba yếu tố này kết hợp mới tạo nên một bài quyền vừa chuẩn vừa có "hồn".' },
      { q: 'Hãy nêu ba thói quen thể thao em sẽ giữ sau khi học xong GDTC lớp 8.', a: 'Ví dụ: (1) vận động ít nhất 60 phút mỗi ngày (chạy/đi bộ/chơi thể thao); (2) luôn khởi động trước – hồi tĩnh sau khi tập và đặt an toàn lên trước thành tích; (3) ăn đủ chất, ngủ đủ 8–9 tiếng, hạn chế đồ ngọt và thời gian ngồi trước màn hình. Đây là những thói quen theo em suốt đời.' },
      { q: 'Định hướng học GDTC ở lớp 9 có gì khác so với lớp 8?', a: 'Lớp 9 thường học CHUYÊN SÂU hơn và có thể theo CHUYÊN ĐỀ một môn thể thao yêu thích, đồng thời có yêu cầu cao hơn về thể lực. Vì vậy ngay từ bây giờ em nên xác định môn mình giỏi/thích nhất để theo đuổi sâu hơn và đặt mục tiêu thể lực cho năm cuối THCS.' },
    ]
  ),

  'S8GDTC-w36-quiz': L(
    'Kết thúc GDTC 8 — Thể chất khoẻ mạnh, tinh thần vững vàng',
    'Năm lớp 8 là năm em phát triển thể chất và kĩ năng vận động toàn diện nhất: từ điền kinh, các môn bóng, võ thuật đến aerobic và lí thuyết sức khoẻ. Hãy nhìn lại những tiến bộ đó — mỗi lần chạy nhanh hơn, mỗi pha bóng chuẩn hơn, mỗi bài quyền hoàn chỉnh hơn đều là thành quả của em. Và bây giờ, hãy chuẩn bị tinh thần bước vào năm lớp 9 khoẻ mạnh!',
    [
      'Tổng hợp các nội dung GDTC 8 đã học: điền kinh, bóng đá/rổ/chuyền, võ thuật, aerobic.',
      'Nhớ lại các quy tắc kĩ thuật, chiến thuật và yêu cầu an toàn quan trọng.',
      'Xây dựng kế hoạch vận động cá nhân cho mùa hè trước khi vào lớp 9.',
    ],
    [
      { h: 'Điền kinh' },
      { ul: [
        'Chạy ngắn (100m): kĩ thuật xuất phát thấp, tăng tốc, về đích; thở bụng.',
        'Chạy bền (800m/1500m): nhịp thở đều (thở vào 3 bước, thở ra 3 bước), tư thế ngả người nhẹ về trước.',
        'Nhảy xa: đà – giậm nhảy – trên không – tiếp đất (kĩ thuật ưỡn thân hoặc ngồi).',
        'Ném bóng/đẩy tạ: kĩ thuật cầm, động tác đẩy/ném và vòng tay thoát.',
      ] },
      { h: 'Các môn bóng' },
      { ul: [
        'Bóng đá: dẫn bóng, chuyền và nhận bóng, sút cầu môn; chiến thuật tấn công – phòng thủ cơ bản.',
        'Bóng rổ: dẫn bóng, chuyền (ngực, trên đầu, nảy đất), ném rổ (lay-up, ném tại chỗ); luật cơ bản (3 giây, 5 giây, di chuyển cùng bóng).',
        'Bóng chuyền: tư thế sẵn sàng, đệm bóng (pass), chuyền bóng cao tay; phát bóng; xoay vị trí.',
      ] },
      { h: 'Võ thuật và thể dục' },
      { ul: [
        'Võ thuật cổ truyền/bài quyền: yêu cầu đúng kĩ thuật (thế đứng, hướng đi, độ mở chân), động tác mạnh-dứt khoát, khí thế (ánh mắt, tinh thần).',
        'Aerobic/thể dục nhịp điệu: phối hợp tay-chân đồng thời với nhịp nhạc; đòi hỏi sự đồng đều khi biểu diễn nhóm.',
        'Thể dục tay không: các bài tập phát triển sức mạnh, dẻo dai và phối hợp vận động.',
      ] },
      { h: 'Lí thuyết sức khoẻ' },
      { ul: [
        'Các tố chất thể lực: sức mạnh, sức bền, tốc độ, khéo léo, dẻo dai — cách phát triển từng tố chất.',
        'Dinh dưỡng thể thao: carbohydrate (năng lượng), protein (phục hồi cơ), chất béo tốt, vitamin-khoáng chất và nước.',
        'BMI = cân nặng (kg) / [chiều cao (m)]²: <18,5 thiếu cân; 18,5–24,9 bình thường; 25–29,9 thừa cân; ≥30 béo phì.',
        'Chấn thương thể thao: phương pháp R-I-C-E (Rest-Ice-Compression-Elevation); khi nào cần đến bác sĩ.',
        'Khởi động và hồi tĩnh: bắt buộc trước và sau mỗi buổi tập để phòng chấn thương và phục hồi nhanh.',
      ] },
      { h: 'Kế hoạch mùa hè' },
      { p: 'Trước khi vào lớp 9, hãy lập kế hoạch vận động mùa hè: mỗi ngày ít nhất 60 phút (WHO), kết hợp môn yêu thích và chạy bộ/bơi lội. Điều này giúp duy trì thể lực và tinh thần sảng khoái cho năm học quan trọng nhất bậc THCS.' },
      { h: 'Định hướng lớp 9' },
      { p: 'Lớp 9 tập trung vào chuyên đề thể thao (em chọn một môn yêu thích để học sâu hơn) và yêu cầu thể lực cao hơn. Đây cũng là năm thi chuyển cấp, nên giữ sức khoẻ tốt sẽ là lợi thế lớn trong ôn thi.' },
      { note: 'GDTC không kết thúc sau khi chuông trường reng — đó là hành trình cả đời. Mỗi ngày vận động là một ngày đầu tư cho sức khoẻ tương lai. Hãy tìm một môn thể thao mà em yêu thích và theo đuổi nó suốt đời!' },
    ],
    [
      { q: 'Hãy giải thích kĩ thuật "xuất phát thấp" trong chạy ngắn và tại sao nó giúp tăng tốc độ.', a: 'Xuất phát thấp (sử dụng bàn đạp/khởi động): tư thế quỳ một gối, hai tay chống thẳng sau vạch, trọng tâm thấp. Khi nghe lệnh "Chạy!", đẩy mạnh bằng cả hai chân, người ngả về trước ở góc 45–50° và tăng bước nhanh. Ưu điểm: lực đẩy mạnh hơn so với xuất phát đứng do góc nghiêng tối ưu hoá lực tác dụng; giúp đạt tốc độ tối đa nhanh hơn trong 30–40m đầu tiên.' },
      { q: 'Áp dụng phương pháp R-I-C-E: bạn em bị bong gân cổ chân khi chơi bóng. Em nên xử lí thế nào?', a: 'R – Rest (Nghỉ ngơi): dừng hoạt động ngay, tránh đặt trọng lực lên cổ chân bị thương. I – Ice (Chườm lạnh): chườm đá (bọc trong khăn, không đặt thẳng lên da) 15–20 phút mỗi 2 giờ trong 48h đầu để giảm sưng và đau. C – Compression (Băng ép): băng cố định cổ chân vừa đủ chặt để giảm sưng, không quá chặt. E – Elevation (Nâng cao): gác cổ chân lên cao hơn tim khi nằm/ngồi để giảm dồn máu. Nếu đau dữ dội hoặc không thể đi lại sau 24h, cần đến bác sĩ chụp X-quang kiểm tra gãy xương.' },
      { q: 'Vì sao việc khởi động trước khi tập thể thao là bắt buộc, không thể bỏ qua?', a: 'Khởi động (5–10 phút) tăng dần cường độ vận động, giúp: (1) Tăng nhiệt độ cơ thể và cơ bắp — cơ ấm co duỗi linh hoạt hơn, giảm nguy cơ rách/căng cơ. (2) Tăng lưu lượng máu đến cơ — cung cấp O₂ và dưỡng chất kịp thời. (3) Tăng tần số tim và hô hấp từ từ — tránh sốc tim đột ngột. (4) Chuẩn bị tâm lí — tập trung, hưng phấn và phối hợp thần kinh-cơ tốt hơn. Bỏ qua khởi động là nguyên nhân số 1 gây chấn thương thể thao.' },
    ]
  ),
};
