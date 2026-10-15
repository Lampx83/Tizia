// ============================================================
// Lớp 8 · LỊCH SỬ VÀ ĐỊA LÍ — Lý thuyết + Ví dụ 35 tuần (GDPT 2018)
// Key TRÙNG id quiz: "S8LSDL-wNN-quiz".
// Bám SGK Lịch sử và Địa lí 8 — Kết nối tri thức / Chân trời sáng tạo / Cánh diều.
// HK1 chủ yếu Lịch sử thế giới + Việt Nam cận đại; HK2 xen Địa lí tự nhiên Việt Nam.
// ============================================================

const L = (topic, intro, objectives, theory, examples) => ({ topic, intro, objectives, theory, examples });

export const S8LSDL_LESSONS = {
  'S8LSDL-w01-quiz': L(
    'LS — Cách mạng tư sản Anh thế kỉ XVII',
    'Mở đầu Lịch sử lớp 8, các em đến với Cách mạng tư sản Anh — cuộc cách mạng tư sản đầu tiên trên thế giới, đặt nền móng cho thời đại tư bản chủ nghĩa.',
    [
      'Trình bày được nguyên nhân, kết quả của Cách mạng tư sản Anh.',
      'Nêu được những nét chính về diễn biến và đặc điểm "không triệt để".',
      'Phân tích được ý nghĩa lịch sử và tính chất của cuộc cách mạng.',
    ],
    [
      { h: 'Khái niệm "cách mạng tư sản"' },
      { p: 'Cách mạng tư sản là cuộc cách mạng do giai cấp tư sản (có khi liên minh với quý tộc mới, nông dân) lãnh đạo, nhằm lật đổ chế độ phong kiến, mở đường cho chủ nghĩa tư bản phát triển. Mỗi cuộc cách mạng tư sản có tiền đề kinh tế — xã hội, mục tiêu, lãnh đạo, động lực, kết quả và tính chất riêng.' },
      { h: 'Tiền đề kinh tế nước Anh thế kỉ XVII' },
      { ul: [
        'Anh là nước có nền kinh tế tư bản chủ nghĩa phát triển nhất châu Âu: công trường thủ công, ngoại thương, ngân hàng mở rộng.',
        'Hiện tượng "rào đất cướp ruộng" (enclosure) biến ruộng công thành đồng cỏ nuôi cừu lấy lông phục vụ nghề len dạ — "cừu ăn thịt người".',
        'Nông dân mất ruộng trở thành nhân công làm thuê tự do cho công trường thủ công.',
      ] },
      { h: 'Tiền đề xã hội — mâu thuẫn' },
      { p: 'Xuất hiện tầng lớp quý tộc mới — quý tộc kinh doanh theo lối tư bản. Quý tộc mới và giai cấp tư sản giàu lên nhưng bị chế độ quân chủ chuyên chế nhà Xtiu-ơt (Stuart) kìm hãm bằng thuế khoá, độc quyền. Mâu thuẫn giữa tư sản + quý tộc mới với chế độ phong kiến chuyên chế ngày càng gay gắt.' },
      { h: 'Diễn biến chính' },
      { ul: [
        '1640: Vua Sác-lơ I (Charles I) triệu tập Quốc hội để vay tiền nhưng bị phản đối — mở đầu cách mạng.',
        '1642–1648: Nội chiến giữa Quốc hội (do Ô-li-vơ Crôm-oen lãnh đạo quân đội) và nhà vua.',
        '1649: Sác-lơ I bị xử tử, Anh thành nước cộng hoà — đỉnh cao của cách mạng.',
        '1653: Crôm-oen thiết lập chế độ độc tài quân sự (Bảo hộ công).',
      ] },
      { h: 'Quân chủ phục hồi và "Cách mạng vinh quang"' },
      { p: 'Sau khi Crôm-oen mất, năm 1660 chế độ quân chủ được phục hồi. Đến năm 1688, Quốc hội làm chính biến không đổ máu — gọi là "Cách mạng vinh quang" (Glorious Revolution) — đưa Vin-hem Ô-ran-giơ lên ngôi, lập chế độ quân chủ lập hiến.' },
      { h: 'Kết quả và tính chất' },
      { ul: [
        'Lật đổ chế độ phong kiến chuyên chế, thiết lập chế độ quân chủ lập hiến: vua "trị vì nhưng không cai trị", Quốc hội nắm quyền.',
        'Mở đường cho chủ nghĩa tư bản phát triển mạnh ở Anh.',
        'Là cuộc cách mạng tư sản không triệt để: còn duy trì ngôi vua, chưa giải quyết ruộng đất cho nông dân.',
      ] },
      { h: 'Ý nghĩa lịch sử' },
      { p: 'Cách mạng tư sản Anh mở đầu thời kì lịch sử cận đại thế giới, cổ vũ và để lại bài học cho các cuộc cách mạng tư sản sau (Bắc Mỹ, Pháp). Nó khẳng định xu thế tất yếu: chế độ tư bản chủ nghĩa thay thế chế độ phong kiến.' },
      { note: 'Phân biệt: cách mạng tư sản Anh chọn hình thức "nội chiến", trong khi cách mạng Pháp 1789 là "cách mạng triệt để" lật hẳn ngôi vua. Cùng là cách mạng tư sản nhưng mức độ triệt để khác nhau.' },
    ],
    [
      { q: 'Vì sao nói "cừu ăn thịt người" lại là một tiền đề của Cách mạng tư sản Anh?', a: 'Phong trào "rào đất cướp ruộng" để nuôi cừu lấy lông (cừu "ăn" ruộng của người) đã đẩy nông dân khỏi ruộng đất, biến họ thành nhân công làm thuê tự do và làm giàu cho quý tộc mới — tạo ra cả lực lượng lao động lẫn giai cấp đối lập với chế độ phong kiến, là tiền đề kinh tế — xã hội của cách mạng.' },
      { q: 'Vì sao Cách mạng tư sản Anh được coi là "không triệt để"?', a: 'Vì sau cách mạng vẫn duy trì ngôi vua (quân chủ lập hiến) chứ không lập cộng hoà bền vững; quyền lợi chủ yếu thuộc về tư sản và quý tộc mới; vấn đề ruộng đất của nông dân không được giải quyết. Quần chúng nhân dân chưa được hưởng thành quả tương xứng.' },
      { q: 'Kết quả lớn nhất của Cách mạng tư sản Anh là gì?', a: 'Thiết lập chế độ quân chủ lập hiến — nhà vua chỉ còn là biểu tượng, Quốc hội nắm quyền lập pháp. Nhờ đó chủ nghĩa tư bản ở Anh được "cởi trói" để phát triển, chuẩn bị cho cuộc Cách mạng công nghiệp sau này.' },
    ]
  ),

  'S8LSDL-w02-quiz': L(
    'LS — Chiến tranh giành độc lập của 13 thuộc địa Anh ở Bắc Mỹ (1775–1783)',
    '13 thuộc địa Anh ở Bắc Mỹ đã đứng lên giành độc lập, lập ra Hợp chúng quốc Hoa Kỳ — một cuộc cách mạng tư sản dưới hình thức chiến tranh giải phóng.',
    [
      'Trình bày được nguyên nhân, kết quả của Chiến tranh giành độc lập ở Bắc Mỹ.',
      'Nêu được nội dung và ý nghĩa của Tuyên ngôn Độc lập 1776.',
      'Phân tích tính chất cách mạng tư sản của cuộc chiến tranh.',
    ],
    [
      { h: 'Sự ra đời của 13 thuộc địa' },
      { p: 'Từ thế kỉ XVII–XVIII, thực dân Anh lập 13 thuộc địa dọc bờ Đại Tây Dương ở Bắc Mỹ. Cư dân chủ yếu là người di cư từ châu Âu, kinh tế tư bản chủ nghĩa phát triển: công thương nghiệp ở miền Bắc, đồn điền dùng nô lệ ở miền Nam.' },
      { h: 'Nguyên nhân sâu xa' },
      { ul: [
        'Anh ban hành nhiều đạo luật hà khắc: cấm thuộc địa sản xuất hàng cạnh tranh với chính quốc, độc quyền buôn bán.',
        'Anh đánh thuế nặng (thuế chè, thuế tem) nhưng thuộc địa không có đại biểu trong Nghị viện Anh — "đánh thuế mà không có đại diện".',
        'Mâu thuẫn giữa nhân dân thuộc địa với chính quốc Anh ngày càng sâu sắc.',
      ] },
      { h: 'Nguyên cớ trực tiếp — "Tiệc chè Bô-xtơn"' },
      { p: 'Năm 1773, để phản đối thuế chè, nhân dân cảng Bô-xtơn (Boston) cải trang đổ các thùng chè của Anh xuống biển ("Boston Tea Party"). Anh trả đũa bằng các đạo luật trừng phạt, làm bùng nổ chiến tranh.' },
      { h: 'Diễn biến chính' },
      { ul: [
        '4/1775: Chiến tranh bùng nổ. Quân thuộc địa do Gioóc-giơ Oa-sinh-tơn (George Washington) chỉ huy.',
        '4/7/1776: Đại hội lục địa thông qua Tuyên ngôn Độc lập — khai sinh Hợp chúng quốc Hoa Kỳ.',
        '1777: Thắng lớn ở Xa-ra-tô-ga (Saratoga) — bước ngoặt, Pháp công khai giúp đỡ.',
        '1781: Chiến thắng quyết định ở Y-oóc-tao (Yorktown).',
        '1783: Anh kí Hoà ước Vec-xai (Paris), công nhận nền độc lập của Hoa Kỳ.',
      ] },
      { h: 'Tuyên ngôn Độc lập 1776' },
      { p: 'Do Tô-mát Giép-phơ-xơn (Thomas Jefferson) soạn thảo. Tuyên ngôn khẳng định quyền con người: "Mọi người sinh ra đều bình đẳng… có quyền sống, quyền tự do và quyền mưu cầu hạnh phúc". Đây là một văn kiện tiến bộ, ảnh hưởng lớn đến phong trào dân chủ thế giới (kể cả Tuyên ngôn Độc lập của Việt Nam 1945).' },
      { h: 'Hiến pháp 1787 và nhà nước Hoa Kỳ' },
      { ul: [
        '1787: Hiến pháp được thông qua, lập nhà nước cộng hoà liên bang theo nguyên tắc "tam quyền phân lập" (lập pháp — hành pháp — tư pháp).',
        '1789: Gioóc-giơ Oa-sinh-tơn trở thành Tổng thống đầu tiên.',
        'Hạn chế: chưa xoá bỏ chế độ nô lệ, phụ nữ và người da đen, người da đỏ chưa có quyền bầu cử.',
      ] },
      { h: 'Tính chất và ý nghĩa' },
      { p: 'Đây là cuộc cách mạng tư sản diễn ra dưới hình thức chiến tranh giải phóng dân tộc: vừa giành độc lập, vừa mở đường cho chủ nghĩa tư bản phát triển. Đây là cuộc cách mạng tư sản đầu tiên thắng lợi ở một thuộc địa, lập nên nước cộng hoà tư sản đầu tiên.' },
      { note: 'Hồ Chí Minh đã trích chính câu mở đầu Tuyên ngôn Độc lập của Hoa Kỳ trong Tuyên ngôn Độc lập 2/9/1945 — cho thấy tư tưởng "quyền bình đẳng, quyền tự do" có sức lan toả vượt thời gian.' },
    ],
    [
      { q: 'Vì sao Chiến tranh giành độc lập ở Bắc Mỹ vừa là chiến tranh giải phóng, vừa là cách mạng tư sản?', a: 'Vì nó giải phóng 13 thuộc địa khỏi ách thống trị của thực dân Anh (tính giải phóng dân tộc), đồng thời lật đổ quan hệ phong kiến và kìm hãm thuộc địa, lập nhà nước tư sản cộng hoà, mở đường cho chủ nghĩa tư bản phát triển (tính cách mạng tư sản).' },
      { q: 'Sự kiện "Tiệc chè Bô-xtơn" 1773 có ý nghĩa gì?', a: 'Là nguyên cớ trực tiếp châm ngòi chiến tranh: nhân dân Bô-xtơn đổ chè của Anh xuống biển để phản đối thuế, Anh trả đũa bằng các đạo luật trừng phạt khắc nghiệt, khiến mâu thuẫn bùng phát thành chiến tranh giành độc lập năm 1775.' },
      { q: 'Nêu hạn chế của cuộc cách mạng này dù đã thắng lợi.', a: 'Dù lập ra nhà nước cộng hoà tiến bộ, cuộc cách mạng chưa xoá bỏ chế độ nô lệ ở miền Nam; phụ nữ, người da đen, người da đỏ chưa được hưởng quyền bình đẳng và quyền bầu cử. Đó là tính chất chưa triệt để của cách mạng tư sản.' },
    ]
  ),

  'S8LSDL-w03-quiz': L(
    'LS — Cách mạng tư sản Pháp cuối thế kỉ XVIII',
    'Cách mạng tư sản Pháp 1789 là cuộc cách mạng tư sản triệt để nhất, "long trời lở đất", có ảnh hưởng sâu rộng đến lịch sử thế giới.',
    [
      'Trình bày được tình hình nước Pháp trước cách mạng (ba đẳng cấp).',
      'Nêu được những sự kiện chính của Cách mạng tư sản Pháp 1789–1794.',
      'Phân tích được ý nghĩa lịch sử và tính chất triệt để của cách mạng.',
    ],
    [
      { h: 'Tình hình kinh tế — xã hội nước Pháp' },
      { p: 'Cuối thế kỉ XVIII, Pháp vẫn là nước quân chủ chuyên chế (vua Lu-i XVI). Nông nghiệp lạc hậu, công thương nghiệp tư bản bị chế độ phong kiến kìm hãm; ngân khố cạn kiệt do triều đình ăn chơi và chiến tranh.' },
      { h: 'Chế độ ba đẳng cấp' },
      { ul: [
        'Đẳng cấp 1 — Tăng lữ: có đặc quyền, không phải nộp thuế.',
        'Đẳng cấp 2 — Quý tộc: có đặc quyền, nắm chức tước, không nộp thuế.',
        'Đẳng cấp 3 — Đẳng cấp thứ ba (tư sản, nông dân, bình dân thành thị): chiếm hơn 90% dân số, không có quyền lợi chính trị nhưng phải gánh mọi thuế khoá.',
      ] },
      { h: 'Trào lưu Triết học Ánh sáng' },
      { p: 'Các nhà tư tưởng Mông-te-xki-ơ, Vôn-te, Rút-xô phê phán chế độ phong kiến, đề cao tự do, bình đẳng, chủ quyền nhân dân và "tam quyền phân lập". Tư tưởng này dọn đường về mặt lí luận cho cách mạng.' },
      { h: 'Cách mạng bùng nổ — 14/7/1789' },
      { p: 'Vua triệu tập Hội nghị ba đẳng cấp để tăng thuế. Đẳng cấp thứ ba tự lập Quốc hội. Ngày 14/7/1789, quần chúng Pa-ri tấn công phá ngục Ba-xti (Bastille) — biểu tượng của chế độ chuyên chế — mở đầu cách mạng (nay là Quốc khánh Pháp).' },
      { h: 'Ba giai đoạn phát triển' },
      { ul: [
        'Giai đoạn quân chủ lập hiến (1789–1792): thông qua Tuyên ngôn Nhân quyền và Dân quyền (8/1789), Hiến pháp 1791.',
        'Giai đoạn cộng hoà (1792–1793): xử tử vua Lu-i XVI (1793), lập nền cộng hoà thứ nhất.',
        'Giai đoạn chuyên chính dân chủ Gia-cô-banh (1793–1794): Rô-be-xpie lãnh đạo, ban hành nhiều biện pháp triệt để (chia ruộng đất, giá tối đa), đưa cách mạng lên đỉnh cao.',
      ] },
      { h: 'Tuyên ngôn Nhân quyền và Dân quyền (1789)' },
      { p: 'Văn kiện nêu cao khẩu hiệu "Tự do — Bình đẳng — Bác ái" (Liberté, Égalité, Fraternité), khẳng định quyền tự nhiên của con người và chủ quyền thuộc về nhân dân. Đây là tuyên ngôn tiến bộ, vượt khỏi biên giới nước Pháp.' },
      { h: 'Kết thúc và ý nghĩa' },
      { ul: [
        '7/1794: Phái Gia-cô-banh bị lật đổ, cách mạng kết thúc giai đoạn cao trào. 1799: Na-pô-lê-ông đảo chính, lập chế độ độc tài.',
        'Lật đổ chế độ phong kiến, đưa giai cấp tư sản lên cầm quyền, mở đường mạnh mẽ cho chủ nghĩa tư bản.',
        'Là cuộc cách mạng tư sản triệt để nhất — giải quyết cả vấn đề ruộng đất, có sự tham gia quyết định của quần chúng nhân dân.',
      ] },
      { note: 'Lê-nin gọi Cách mạng Pháp là "cuộc đại cách mạng" vì nó thực sự lật đổ chế độ phong kiến tận gốc và có quần chúng nhân dân làm động lực thúc đẩy cách mạng đi lên.' },
    ],
    [
      { q: 'Vì sao Cách mạng tư sản Pháp được coi là triệt để nhất trong các cuộc cách mạng tư sản?', a: 'Vì nó lật đổ hoàn toàn chế độ quân chủ chuyên chế, xử tử nhà vua, lập nền cộng hoà; giải quyết vấn đề ruộng đất cho nông dân (thời Gia-cô-banh); có quần chúng nhân dân tham gia làm động lực đẩy cách mạng tiến lên đỉnh cao — điều mà cách mạng Anh hay Bắc Mỹ chưa làm được.' },
      { q: 'Vì sao sự kiện ngày 14/7/1789 được chọn làm Quốc khánh Pháp?', a: 'Vì ngày 14/7/1789 quần chúng Pa-ri tấn công phá ngục Ba-xti — biểu tượng của chế độ phong kiến chuyên chế. Đó là sự kiện mở đầu Cách mạng tư sản Pháp, đánh dấu thắng lợi đầu tiên của nhân dân, nên được lấy làm ngày Quốc khánh.' },
      { q: 'Khẩu hiệu "Tự do — Bình đẳng — Bác ái" thể hiện điều gì?', a: 'Thể hiện lí tưởng tiến bộ của cách mạng tư sản: con người sinh ra có quyền tự do, mọi người bình đẳng về quyền lợi, và tinh thần đoàn kết, tương thân (bác ái). Khẩu hiệu này trở thành biểu tượng của nền dân chủ và lan toả ra toàn thế giới.' },
    ]
  ),

  'S8LSDL-w04-quiz': L(
    'LS — Cách mạng công nghiệp (nửa sau thế kỉ XVIII – giữa thế kỉ XIX)',
    'Cách mạng công nghiệp khởi đầu ở Anh đã thay đổi căn bản cách thức sản xuất của loài người — từ lao động thủ công sang lao động bằng máy móc.',
    [
      'Trình bày được những thành tựu tiêu biểu của Cách mạng công nghiệp.',
      'Giải thích được vì sao Cách mạng công nghiệp khởi đầu ở Anh.',
      'Nêu được tác động của Cách mạng công nghiệp đối với sản xuất và xã hội.',
    ],
    [
      { h: 'Cách mạng công nghiệp là gì?' },
      { p: 'Cách mạng công nghiệp là quá trình chuyển từ sản xuất thủ công sang sản xuất bằng máy móc, từ công trường thủ công lên nền sản xuất công xưởng. Nó bắt đầu ở Anh từ những năm 60 của thế kỉ XVIII rồi lan ra châu Âu, Bắc Mỹ.' },
      { h: 'Vì sao khởi đầu ở Anh?' },
      { ul: [
        'Cách mạng tư sản đã giải phóng sức sản xuất, lập chế độ tư bản chủ nghĩa.',
        'Tích luỹ được nguồn vốn lớn từ buôn bán, thuộc địa và cướp bóc.',
        'Có nguồn nhân công tự do dồi dào (nông dân mất ruộng do "rào đất").',
        'Giàu tài nguyên: than đá, sắt; có nhiều phát minh kĩ thuật.',
      ] },
      { h: 'Cuộc cách mạng bắt đầu từ ngành dệt' },
      { ul: [
        '1764: Giêm Ha-gri-vơ phát minh máy kéo sợi Gien-ni (Jenny) — kéo nhiều sợi cùng lúc.',
        '1769: Ác-crai-tơ chế tạo máy kéo sợi chạy bằng sức nước.',
        '1785: Ét-mơn Các-rai phát minh máy dệt chạy bằng sức nước, tăng năng suất nhiều lần.',
      ] },
      { h: 'Máy hơi nước — phát minh "trái tim"' },
      { p: 'Năm 1784, Giêm Oát (James Watt) hoàn thiện máy hơi nước. Máy hơi nước có thể đặt ở bất cứ đâu (không phụ thuộc dòng nước), trở thành nguồn động lực cho mọi ngành: dệt, khai mỏ, luyện kim, giao thông — mở ra "thời đại máy hơi nước".' },
      { h: 'Cách mạng trong giao thông vận tải' },
      { ul: [
        '1807: Phơn-tơn (Mỹ) chế tạo tàu thuỷ chạy bằng máy hơi nước.',
        '1814: Xti-phen-xơn (Anh) chế tạo đầu máy xe lửa.',
        '1825: Tuyến đường sắt đầu tiên (Anh) được khánh thành.',
      ] },
      { h: 'Tác động về kinh tế' },
      { ul: [
        'Năng suất lao động tăng vọt, của cải xã hội dồi dào.',
        'Nhiều trung tâm công nghiệp, thành thị ra đời; quá trình đô thị hoá diễn ra nhanh.',
        'Nước Anh trở thành "công xưởng của thế giới".',
      ] },
      { h: 'Tác động về xã hội' },
      { ul: [
        'Hình thành hai giai cấp cơ bản của xã hội tư bản: giai cấp tư sản và giai cấp vô sản (công nhân).',
        'Mâu thuẫn giữa tư sản và vô sản ngày càng gay gắt — cơ sở cho phong trào công nhân.',
        'Đời sống công nhân cực khổ: lao động kéo dài, lương thấp, kể cả phụ nữ và trẻ em.',
      ] },
      { note: 'Cách mạng công nghiệp đề cao vai trò của khoa học — kĩ thuật: một phát minh (máy hơi nước) có thể làm thay đổi cả phương thức sản xuất và cơ cấu xã hội của nhân loại.' },
    ],
    [
      { q: 'Vì sao máy hơi nước của Giêm Oát được coi là phát minh quan trọng nhất của Cách mạng công nghiệp?', a: 'Vì máy hơi nước cung cấp nguồn động lực mạnh, ổn định và có thể đặt ở bất cứ nơi nào, không lệ thuộc vào dòng nước. Nhờ đó nó được dùng cho mọi ngành (dệt, khai mỏ, luyện kim, giao thông), đưa loài người bước vào "thời đại máy hơi nước".' },
      { q: 'Hãy giải thích vì sao Cách mạng công nghiệp lại khởi đầu ở Anh chứ không phải nước khác.', a: 'Vì ở Anh hội tụ đủ điều kiện: cách mạng tư sản đã thắng lợi, mở đường cho tư bản chủ nghĩa; có nguồn vốn tích luỹ lớn từ thuộc địa; có nhân công tự do dồi dào (nông dân mất ruộng); giàu than đá, sắt; và có nhiều phát minh kĩ thuật. Anh do đó đi tiên phong và trở thành "công xưởng của thế giới".' },
      { q: 'Cách mạng công nghiệp đã làm xuất hiện những giai cấp mới nào? Hệ quả là gì?', a: 'Làm hình thành rõ rệt giai cấp tư sản (chủ tư bản, nắm tư liệu sản xuất) và giai cấp vô sản — công nhân (bán sức lao động). Hệ quả là mâu thuẫn giữa hai giai cấp ngày càng sâu sắc, dẫn tới phong trào đấu tranh của công nhân chống tư sản trong thế kỉ XIX.' },
    ]
  ),

  'S8LSDL-w05-quiz': L(
    'LS — Công xã Pa-ri (1871)',
    'Công xã Pa-ri năm 1871 là cuộc cách mạng vô sản đầu tiên, lập nên nhà nước kiểu mới — nhà nước của giai cấp công nhân và nhân dân lao động.',
    [
      'Trình bày được hoàn cảnh ra đời của Công xã Pa-ri.',
      'Nêu được những chính sách tiến bộ của Công xã.',
      'Phân tích được ý nghĩa lịch sử và bài học của Công xã Pa-ri.',
    ],
    [
      { h: 'Bối cảnh — chiến tranh Pháp – Phổ' },
      { p: 'Năm 1870–1871, Pháp thua trong chiến tranh Pháp – Phổ, hoàng đế Na-pô-lê-ông III bị bắt. Chính phủ tư sản Pháp ("Chính phủ Vệ quốc") đầu hàng và định tước vũ khí của Quốc dân quân Pa-ri.' },
      { h: 'Cuộc khởi nghĩa ngày 18/3/1871' },
      { p: 'Sáng 18/3/1871, nhân dân Pa-ri (chủ yếu là công nhân) đứng lên chống lại âm mưu tước vũ khí. Chính phủ tư sản phải chạy về Véc-xai. Quần chúng làm chủ Pa-ri — đây là cuộc cách mạng vô sản đầu tiên trên thế giới.' },
      { h: 'Thành lập Công xã' },
      { p: 'Ngày 26/3/1871, nhân dân Pa-ri bầu Hội đồng Công xã theo nguyên tắc phổ thông đầu phiếu. Ngày 28/3/1871, Công xã Pa-ri chính thức được thành lập — một nhà nước kiểu mới do giai cấp công nhân làm chủ.' },
      { h: 'Bộ máy nhà nước kiểu mới' },
      { ul: [
        'Cơ quan cao nhất là Hội đồng Công xã, vừa ban hành luật, vừa tổ chức thi hành luật.',
        'Lập các uỷ ban phụ trách: quân sự, an ninh, tài chính, giáo dục…',
        'Đập tan bộ máy nhà nước tư sản cũ (quân đội, cảnh sát cũ), lập lực lượng vũ trang và an ninh của nhân dân.',
      ] },
      { h: 'Những chính sách tiến bộ' },
      { ul: [
        'Tách nhà thờ khỏi nhà nước, nhà trường không dạy giáo lí.',
        'Giao xí nghiệp của chủ bỏ trốn cho công nhân quản lí.',
        'Quy định tiền lương tối thiểu, cấm cúp phạt và đánh đập công nhân.',
        'Thực hiện giáo dục bắt buộc, không mất tiền.',
      ] },
      { h: '"Tuần lễ đẫm máu" và sự thất bại' },
      { p: 'Từ 21 đến 28/5/1871, quân Véc-xai (có sự tiếp tay của Phổ) tấn công Pa-ri trong "Tuần lễ đẫm máu". Công xã chiến đấu anh dũng nhưng thất bại; hàng vạn chiến sĩ Công xã bị giết hoặc tù đày. Công xã chỉ tồn tại 72 ngày (18/3–28/5/1871).' },
      { h: 'Ý nghĩa và bài học' },
      { ul: [
        'Là hình ảnh thu nhỏ của một nhà nước kiểu mới — nhà nước vô sản đầu tiên.',
        'Cổ vũ tinh thần đấu tranh của nhân dân lao động toàn thế giới.',
        'Để lại bài học quý: cần có chính đảng lãnh đạo, liên minh công – nông, và kiên quyết trấn áp kẻ thù.',
      ] },
      { note: 'Tuy thất bại, Công xã Pa-ri được Mác đánh giá là "tấm gương sáng chói" — lần đầu tiên giai cấp công nhân giành chính quyền và thử nghiệm xây dựng một nhà nước của chính mình.' },
    ],
    [
      { q: 'Vì sao nói Công xã Pa-ri là nhà nước kiểu mới?', a: 'Vì đó là nhà nước do giai cấp công nhân và nhân dân lao động làm chủ, được bầu theo phổ thông đầu phiếu; Hội đồng Công xã vừa lập pháp vừa hành pháp; đập tan bộ máy nhà nước tư sản cũ, thi hành các chính sách phục vụ người lao động (giáo dục miễn phí, giao xí nghiệp cho công nhân…). Khác hẳn nhà nước tư sản phục vụ giai cấp tư sản.' },
      { q: 'Nêu hai chính sách tiến bộ của Công xã Pa-ri và ý nghĩa.', a: 'Ví dụ: (1) Giao xí nghiệp của chủ bỏ trốn cho công nhân quản lí — thể hiện công nhân làm chủ tư liệu sản xuất; (2) Thực hiện giáo dục bắt buộc, miễn phí — thể hiện sự quan tâm đến quyền học tập của nhân dân lao động. Cả hai cho thấy bản chất vì dân của nhà nước vô sản.' },
      { q: 'Vì sao Công xã Pa-ri thất bại? Bài học rút ra là gì?', a: 'Công xã thất bại vì thiếu một chính đảng vô sản kiên định lãnh đạo, chưa kiên quyết trấn áp kẻ thù, chưa thực hiện liên minh chặt chẽ công – nông, lại bị quân Véc-xai (có Phổ hỗ trợ) đàn áp đẫm máu. Bài học: cách mạng vô sản cần có đảng lãnh đạo, có liên minh công – nông và phải kiên quyết với kẻ thù.' },
    ]
  ),

  'S8LSDL-w06-quiz': L(
    'LS — Sự ra đời của chủ nghĩa Mác và phong trào công nhân quốc tế',
    'C. Mác và Ph. Ăng-ghen đã sáng lập chủ nghĩa xã hội khoa học, soi đường cho phong trào công nhân và phong trào giải phóng dân tộc trên thế giới.',
    [
      'Nêu được vai trò của C. Mác và Ph. Ăng-ghen.',
      'Trình bày được nội dung và ý nghĩa của Tuyên ngôn của Đảng Cộng sản (1848).',
      'Biết được sự thành lập của Quốc tế thứ nhất.',
    ],
    [
      { h: 'Phong trào công nhân nửa đầu thế kỉ XIX' },
      { ul: [
        'Phong trào đập phá máy móc (Luddite) — hình thức đấu tranh tự phát ban đầu.',
        'Khởi nghĩa của công nhân dệt Li-ông (Pháp, 1831, 1834).',
        'Phong trào Hiến chương ở Anh (1836–1848) đòi quyền phổ thông đầu phiếu.',
      ] },
      { p: 'Các phong trào này tuy thất bại nhưng cho thấy giai cấp công nhân đã trở thành một lực lượng chính trị độc lập, cần có lí luận cách mạng đúng đắn dẫn đường.' },
      { h: 'C. Mác (1818–1883) và Ph. Ăng-ghen (1820–1895)' },
      { p: 'Hai nhà tư tưởng vĩ đại người Đức, gặp nhau năm 1844 và trở thành những người bạn, người đồng chí cùng xây dựng học thuyết cách mạng. Hai ông nghiên cứu sâu triết học, kinh tế chính trị và lịch sử phong trào công nhân.' },
      { h: 'Sự ra đời của chủ nghĩa xã hội khoa học' },
      { ul: [
        'Chỉ ra quy luật phát triển của xã hội loài người, vai trò sứ mệnh lịch sử của giai cấp công nhân.',
        'Khẳng định chủ nghĩa tư bản tất yếu bị thay thế bằng chủ nghĩa xã hội.',
        'Trang bị lí luận khoa học cho cuộc đấu tranh của giai cấp công nhân.',
      ] },
      { h: 'Tuyên ngôn của Đảng Cộng sản (2/1848)' },
      { p: 'Do Mác và Ăng-ghen soạn thảo, công bố ở Luân Đôn — văn kiện có tính cương lĩnh đầu tiên của phong trào cộng sản và công nhân quốc tế. Tuyên ngôn trình bày những luận điểm cơ bản về sự phát triển của xã hội và cách mạng vô sản, kết thúc bằng khẩu hiệu nổi tiếng: "Vô sản tất cả các nước, đoàn kết lại!".' },
      { h: 'Quốc tế thứ nhất (1864–1876)' },
      { ul: [
        'Thành lập ngày 28/9/1864 tại Luân Đôn, do C. Mác là "linh hồn".',
        'Là tổ chức quốc tế đầu tiên của giai cấp công nhân, đoàn kết phong trào công nhân các nước.',
        'Truyền bá chủ nghĩa Mác, đấu tranh chống các tư tưởng sai lệch trong phong trào công nhân.',
      ] },
      { h: 'Ý nghĩa' },
      { p: 'Sự ra đời của chủ nghĩa Mác và Quốc tế thứ nhất đánh dấu bước trưởng thành của phong trào công nhân quốc tế: từ đấu tranh tự phát chuyển sang đấu tranh tự giác, có lí luận và tổ chức dẫn đường.' },
      { note: 'Chủ nghĩa Mác – Lê-nin sau này là nền tảng tư tưởng để Nguyễn Ái Quốc tìm ra con đường cứu nước cho dân tộc Việt Nam.' },
    ],
    [
      { q: 'Vì sao sự ra đời của chủ nghĩa Mác được coi là bước ngoặt của phong trào công nhân?', a: 'Vì trước đó phong trào công nhân chủ yếu là đấu tranh tự phát (đập phá máy móc, bãi công lẻ tẻ), thiếu lí luận. Chủ nghĩa Mác cung cấp lí luận khoa học về sứ mệnh lịch sử của giai cấp công nhân và con đường cách mạng, giúp phong trào chuyển từ tự phát sang tự giác — có mục tiêu và tổ chức rõ ràng.' },
      { q: 'Khẩu hiệu "Vô sản tất cả các nước, đoàn kết lại!" có ý nghĩa gì?', a: 'Khẩu hiệu kêu gọi giai cấp công nhân ở tất cả các nước đoàn kết, vượt qua biên giới quốc gia để cùng đấu tranh chống áp bức của giai cấp tư sản. Nó thể hiện tinh thần quốc tế vô sản — cơ sở cho sự liên kết của phong trào công nhân toàn thế giới.' },
      { q: 'Quốc tế thứ nhất có vai trò gì đối với phong trào công nhân?', a: 'Quốc tế thứ nhất (1864–1876) là tổ chức quốc tế đầu tiên của công nhân, có vai trò đoàn kết phong trào công nhân các nước, truyền bá chủ nghĩa Mác và đấu tranh chống những khuynh hướng tư tưởng sai lệch, đặt nền móng cho sự phát triển của phong trào cộng sản quốc tế.' },
    ]
  ),

  'S8LSDL-w07-quiz': L(
    'LS — Các nước châu Á trước nguy cơ xâm lược (cuối XIX – đầu XX): Trung Quốc, Nhật Bản',
    'Cuối thế kỉ XIX, các nước phương Tây đẩy mạnh xâm lược châu Á. Trung Quốc trở thành nước nửa thuộc địa, còn Nhật Bản nhờ Duy tân Minh Trị đã vươn lên thành cường quốc.',
    [
      'Trình bày được quá trình các nước đế quốc xâm lược Trung Quốc.',
      'Nêu được nội dung và ý nghĩa của cuộc Duy tân Minh Trị ở Nhật Bản.',
      'So sánh con đường phát triển của Trung Quốc và Nhật Bản.',
    ],
    [
      { h: 'Bối cảnh chung của châu Á' },
      { p: 'Cuối thế kỉ XIX, chủ nghĩa tư bản phương Tây chuyển sang giai đoạn đế quốc chủ nghĩa, ráo riết tìm kiếm thuộc địa và thị trường. Hầu hết các nước châu Á (trừ Nhật Bản) đều trở thành thuộc địa hoặc nửa thuộc địa.' },
      { h: 'Trung Quốc và Chiến tranh thuốc phiện' },
      { ul: [
        '1840–1842: Chiến tranh thuốc phiện lần thứ nhất — Anh dùng vũ lực buộc nhà Thanh mở cửa.',
        'Sau chiến tranh, nhà Thanh phải kí Hiệp ước Nam Kinh, nhượng Hồng Kông cho Anh, mở nhiều cửa biển.',
        'Các nước đế quốc (Anh, Pháp, Đức, Nga, Nhật…) tranh nhau "xâu xé" Trung Quốc, biến thành nước nửa thuộc địa, nửa phong kiến.',
      ] },
      { h: 'Phong trào đấu tranh của nhân dân Trung Quốc' },
      { ul: [
        'Khởi nghĩa Thái bình Thiên quốc (1851–1864) do Hồng Tú Toàn lãnh đạo.',
        'Phong trào Nghĩa Hoà đoàn (cuối XIX – đầu XX) chống đế quốc.',
        'Cách mạng Tân Hợi (1911) do Tôn Trung Sơn lãnh đạo, lật đổ chế độ phong kiến Mãn Thanh, lập Trung Hoa Dân quốc.',
      ] },
      { h: 'Nhật Bản trước cải cách' },
      { p: 'Giữa thế kỉ XIX, Nhật Bản là nước phong kiến, chế độ Mạc phủ Tô-ku-ga-oa khủng hoảng. Các nước phương Tây (đặc biệt là Mỹ) ép Nhật "mở cửa". Trước nguy cơ bị xâm lược, Nhật chọn con đường cải cách.' },
      { h: 'Cuộc Duy tân Minh Trị (1868)' },
      { ul: [
        'Năm 1868, Thiên hoàng Minh Trị (Meiji) tiến hành cải cách toàn diện trên mọi lĩnh vực.',
        'Chính trị: thủ tiêu chế độ Mạc phủ, lập chính phủ mới, ban hành Hiến pháp 1889.',
        'Kinh tế: thống nhất thị trường, phát triển công thương nghiệp tư bản chủ nghĩa.',
        'Quân sự: tổ chức quân đội theo kiểu phương Tây, chú trọng công nghiệp quốc phòng.',
        'Giáo dục: thi hành giáo dục bắt buộc, cử người đi du học, tiếp thu khoa học phương Tây.',
      ] },
      { h: 'Kết quả và tính chất' },
      { p: 'Duy tân Minh Trị đưa Nhật Bản từ một nước phong kiến lạc hậu trở thành nước tư bản chủ nghĩa, thoát khỏi nguy cơ trở thành thuộc địa và vươn lên thành đế quốc duy nhất ở châu Á. Đây là một cuộc cách mạng tư sản (không triệt để) tiến hành từ trên xuống.' },
      { h: 'Mặt trái — Nhật chuyển sang đế quốc' },
      { p: 'Cuối thế kỉ XIX – đầu XX, Nhật Bản tiến hành chiến tranh xâm lược: chiến tranh Trung – Nhật (1894–1895), Nga – Nhật (1904–1905), thôn tính Triều Tiên (1910), trở thành đế quốc quân phiệt hiếu chiến.' },
      { note: 'Hai con đường của Trung Quốc (bị xâm lược, trở thành nửa thuộc địa) và Nhật Bản (chủ động cải cách, trở thành cường quốc) là bài học lớn: chủ động canh tân, mở cửa đúng hướng có thể cứu một dân tộc khỏi vòng nô lệ.' },
    ],
    [
      { q: 'Vì sao Nhật Bản thoát khỏi số phận thuộc địa còn Trung Quốc thì không?', a: 'Vì Nhật Bản chủ động tiến hành cuộc Duy tân Minh Trị (1868) cải cách toàn diện về chính trị, kinh tế, quân sự, giáo dục theo hướng tư bản chủ nghĩa, nhanh chóng mạnh lên. Còn nhà Thanh ở Trung Quốc bảo thủ, không cải cách kịp thời, bị các nước đế quốc xâu xé, trở thành nước nửa thuộc địa, nửa phong kiến.' },
      { q: 'Vì sao nói Duy tân Minh Trị mang tính chất một cuộc cách mạng tư sản?', a: 'Vì cuộc cải cách đã xoá bỏ chế độ phong kiến Mạc phủ, mở đường cho chủ nghĩa tư bản phát triển (thống nhất thị trường, phát triển công thương nghiệp, lập nhà nước theo mô hình tư sản). Tuy nhiên đó là cách mạng tư sản không triệt để, tiến hành "từ trên xuống" do Thiên hoàng và tầng lớp quý tộc tư sản hoá chủ trương.' },
      { q: 'Cách mạng Tân Hợi (1911) có ý nghĩa gì với Trung Quốc?', a: 'Cách mạng Tân Hợi do Tôn Trung Sơn lãnh đạo đã lật đổ chế độ phong kiến Mãn Thanh tồn tại hàng nghìn năm, lập ra Trung Hoa Dân quốc, mở đường cho chủ nghĩa tư bản phát triển. Tuy nhiên cách mạng không triệt để: chưa thủ tiêu giai cấp phong kiến, chưa đụng đến các nước đế quốc và chưa giải quyết ruộng đất cho nông dân.' },
    ]
  ),

  'S8LSDL-w08-quiz': L(
    'LS — Phong trào giải phóng dân tộc ở Đông Nam Á (nửa sau XIX – đầu XX)',
    'Cuối thế kỉ XIX, hầu hết các nước Đông Nam Á trở thành thuộc địa của thực dân phương Tây và đã dấy lên phong trào đấu tranh giải phóng dân tộc.',
    [
      'Trình bày được quá trình xâm lược Đông Nam Á của thực dân phương Tây.',
      'Nêu được những nét chính về phong trào giải phóng dân tộc ở khu vực.',
      'Rút ra đặc điểm chung và nguyên nhân thất bại của các phong trào.',
    ],
    [
      { h: 'Vị trí chiến lược của Đông Nam Á' },
      { p: 'Đông Nam Á có vị trí địa lí quan trọng, giàu tài nguyên, đông dân — là "miếng mồi" hấp dẫn đối với các nước tư bản phương Tây đang mở rộng thuộc địa.' },
      { h: 'Quá trình xâm lược' },
      { ul: [
        'Anh chiếm Mã Lai, Miến Điện (Mi-an-ma), Xin-ga-po.',
        'Pháp chiếm ba nước Đông Dương: Việt Nam, Lào, Cam-pu-chia.',
        'Hà Lan và Tây Ban Nha thôn tính In-đô-nê-xi-a; Tây Ban Nha rồi Mỹ chiếm Phi-líp-pin.',
        'Chỉ riêng Xiêm (Thái Lan) giữ được nền độc lập tương đối nhờ chính sách ngoại giao mềm dẻo và cải cách.',
      ] },
      { h: 'Phong trào ở In-đô-nê-xi-a' },
      { p: 'Nhân dân In-đô-nê-xi-a liên tục đấu tranh chống Hà Lan. Đầu thế kỉ XX xuất hiện các tổ chức như Hội Liên hiệp công nhân, Đảng Cộng sản In-đô-nê-xi-a (1920) — sớm nhất ở Đông Nam Á.' },
      { h: 'Phong trào ở Phi-líp-pin' },
      { ul: [
        '1896: Cách mạng Phi-líp-pin chống Tây Ban Nha, do Bô-ni-pha-xi-ô lãnh đạo.',
        'Năm 1898, Tây Ban Nha thua, Mỹ nhảy vào thay thế thống trị Phi-líp-pin.',
        'Nhân dân Phi-líp-pin tiếp tục đấu tranh chống Mỹ.',
      ] },
      { h: 'Phong trào ở ba nước Đông Dương' },
      { ul: [
        'Việt Nam: phong trào Cần Vương, khởi nghĩa Yên Thế, Đông Du, Đông Kinh Nghĩa Thục.',
        'Cam-pu-chia: khởi nghĩa của A-cha Xoa, Pu-côm-bô.',
        'Lào: khởi nghĩa của Pha-ca-đuốc, Ong Kẹo và Com-ma-đam.',
      ] },
      { h: 'Đặc điểm chung' },
      { ul: [
        'Diễn ra sôi nổi, liên tục, lôi cuốn đông đảo các tầng lớp nhân dân.',
        'Hình thức phong phú: khởi nghĩa vũ trang, cải cách, đấu tranh chính trị.',
        'Hầu hết đều thất bại do thiếu đường lối đúng đắn và giai cấp lãnh đạo tiên tiến.',
      ] },
      { note: 'Xiêm (Thái Lan) là nước duy nhất ở Đông Nam Á giữ được độc lập — nhờ vị trí "đệm" giữa thuộc địa Anh và Pháp, cùng chính sách cải cách và ngoại giao khôn khéo của vua Ra-ma V.' },
    ],
    [
      { q: 'Vì sao Xiêm (Thái Lan) giữ được độc lập trong khi các nước Đông Nam Á khác đều trở thành thuộc địa?', a: 'Vì Xiêm nằm ở vị trí "vùng đệm" giữa thuộc địa của Anh (phía Tây) và Pháp (phía Đông), được hai nước này muốn giữ để tránh xung đột. Đồng thời, vua Ra-ma V tiến hành cải cách đất nước theo hướng hiện đại và thực hiện chính sách ngoại giao mềm dẻo, cắt nhượng một số vùng đất để giữ phần lớn lãnh thổ.' },
      { q: 'Nêu đặc điểm chung của phong trào giải phóng dân tộc ở Đông Nam Á cuối XIX – đầu XX.', a: 'Phong trào diễn ra sôi nổi, liên tục, thu hút đông đảo nhân dân với nhiều hình thức (khởi nghĩa vũ trang, cải cách, đấu tranh chính trị). Tuy nhiên hầu hết đều thất bại vì còn mang tính tự phát, thiếu đường lối đúng đắn và chưa có giai cấp tiên tiến đủ sức lãnh đạo.' },
      { q: 'Việc Mỹ thay Tây Ban Nha thống trị Phi-líp-pin nói lên điều gì về thời đại đế quốc chủ nghĩa?', a: 'Nó cho thấy bản chất của thời đại đế quốc: các nước đế quốc tranh giành nhau thuộc địa, kẻ mạnh hơn (Mỹ) thay kẻ yếu hơn (Tây Ban Nha) để chiếm đoạt quyền lợi. Nhân dân thuộc địa vẫn tiếp tục bị áp bức, vì vậy phải tiếp tục đấu tranh chống đế quốc mới.' },
    ]
  ),

  'S8LSDL-w09-quiz': L(
    'LS — Thực dân Pháp xâm lược và cuộc kháng chiến ở Đà Nẵng – Gia Định (1858–1862)',
    'Năm 1858, thực dân Pháp nổ súng tấn công Đà Nẵng, mở đầu quá trình xâm lược Việt Nam. Nhân dân ta đã anh dũng kháng chiến ngay từ những ngày đầu.',
    [
      'Trình bày được nguyên cớ và quá trình Pháp xâm lược Việt Nam (1858–1862).',
      'Nêu được tinh thần kháng chiến của nhân dân ta.',
      'Phân tích thái độ "thủ để hoà" của triều đình nhà Nguyễn.',
    ],
    [
      { h: 'Bối cảnh — Việt Nam giữa thế kỉ XIX' },
      { p: 'Giữa thế kỉ XIX, chế độ phong kiến nhà Nguyễn lâm vào khủng hoảng: kinh tế đình trệ, đời sống nhân dân cực khổ, các cuộc khởi nghĩa nông dân nổ ra liên tiếp. Triều đình thi hành chính sách "bế quan toả cảng" và cấm đạo Thiên Chúa.' },
      { h: 'Nguyên nhân và nguyên cớ Pháp xâm lược' },
      { ul: [
        'Nguyên nhân sâu xa: chủ nghĩa tư bản Pháp cần thị trường, thuộc địa và nguyên liệu; Việt Nam giàu tài nguyên, vị trí chiến lược.',
        'Nguyên cớ trực tiếp: Pháp lấy cớ triều Nguyễn "cấm đạo, giết đạo" để can thiệp.',
      ] },
      { h: 'Pháp tấn công Đà Nẵng (1858)' },
      { ul: [
        'Ngày 1/9/1858, liên quân Pháp – Tây Ban Nha nổ súng tấn công bán đảo Sơn Trà (Đà Nẵng), mở đầu xâm lược.',
        'Pháp dự định "đánh nhanh thắng nhanh", chiếm Đà Nẵng rồi tiến ra Huế buộc triều đình đầu hàng.',
      ] },
      { h: 'Kháng chiến ở Đà Nẵng' },
      { p: 'Dưới sự chỉ huy của Nguyễn Tri Phương, quân dân ta đắp luỹ, lập phòng tuyến, thực hiện kế "vườn không nhà trống", cầm chân địch suốt 5 tháng. Kế hoạch "đánh nhanh thắng nhanh" của Pháp bước đầu thất bại.' },
      { h: 'Pháp chuyển hướng đánh Gia Định (1859)' },
      { ul: [
        'Tháng 2/1859, Pháp đưa quân vào đánh thành Gia Định (Sài Gòn).',
        'Quân triều đình nhanh chóng tan rã, nhưng nhân dân Gia Định tự động kháng chiến, gây cho địch nhiều khó khăn.',
        'Triều đình không tận dụng thời cơ phản công khi quân Pháp suy yếu vì phải dồn lực sang chiến trường Trung Quốc.',
      ] },
      { h: 'Phong trào kháng chiến của nhân dân' },
      { ul: [
        'Trương Định lập căn cứ ở Gò Công, được nhân dân tôn làm "Bình Tây Đại nguyên soái".',
        'Nguyễn Trung Trực chỉ huy đốt cháy tàu chiến Ét-pê-răng (Hi vọng) của Pháp trên sông Vàm Cỏ Đông (1861).',
        'Tinh thần "bao giờ người Tây nhổ hết cỏ nước Nam thì mới hết người Nam đánh Tây".',
      ] },
      { h: 'Thái độ của triều đình' },
      { p: 'Trong khi nhân dân quyết tâm kháng chiến, triều đình nhà Nguyễn lại lo đối phó với phong trào nông dân trong nước, thiếu quyết tâm đánh Pháp, chủ trương "thủ để hoà" (giữ thành để rồi cầu hoà) — bỏ lỡ nhiều thời cơ.' },
      { note: 'Ngay từ buổi đầu xâm lược, đã hình thành mâu thuẫn giữa ý chí kháng chiến của nhân dân và sự bạc nhược của triều đình — đặc điểm xuyên suốt giai đoạn 1858–1884.' },
    ],
    [
      { q: 'Vì sao Pháp chọn Đà Nẵng làm điểm mở đầu cuộc xâm lược Việt Nam?', a: 'Vì Đà Nẵng là hải cảng sâu, rộng, tàu chiến dễ ra vào; lại gần kinh đô Huế (cách khoảng 100 km). Pháp dự tính chiếm Đà Nẵng làm bàn đạp, sau đó tiến nhanh ra Huế buộc triều đình nhà Nguyễn đầu hàng — thực hiện kế "đánh nhanh thắng nhanh".' },
      { q: 'Kế "vườn không nhà trống" của Nguyễn Tri Phương có tác dụng gì?', a: 'Kế "vườn không nhà trống" làm cho quân Pháp không cướp được lương thực, không có chỗ tiếp tế, bị cầm chân tại chỗ, lại thêm bệnh tật. Nhờ đó quân dân ta cầm cự được 5 tháng ở Đà Nẵng, làm thất bại bước đầu kế hoạch "đánh nhanh thắng nhanh" của địch.' },
      { q: 'Qua phong trào kháng chiến của Trương Định, Nguyễn Trung Trực, em thấy tinh thần của nhân dân ta như thế nào?', a: 'Nhân dân ta thể hiện lòng yêu nước nồng nàn và ý chí quyết tâm đánh giặc: Trương Định không tuân lệnh bãi binh của triều đình mà ở lại cùng nhân dân kháng chiến; Nguyễn Trung Trực đốt cháy tàu chiến Pháp. Tinh thần ấy đối lập hẳn với sự bạc nhược, do dự của triều đình nhà Nguyễn.' },
    ]
  ),

  'S8LSDL-w10-quiz': L(
    'LS — Hiệp ước Nhâm Tuất (1862) và cuộc kháng chiến ở Nam Kì',
    'Năm 1862, triều đình nhà Nguyễn kí Hiệp ước Nhâm Tuất, cắt ba tỉnh miền Đông Nam Kì cho Pháp. Nhân dân Nam Kì vẫn kiên cường kháng chiến.',
    [
      'Trình bày được nội dung cơ bản của Hiệp ước Nhâm Tuất 1862.',
      'Nêu được phong trào kháng chiến của nhân dân Nam Kì.',
      'Phân tích trách nhiệm của triều đình nhà Nguyễn trong việc để mất đất.',
    ],
    [
      { h: 'Pháp mở rộng đánh chiếm' },
      { p: 'Sau khi củng cố Gia Định, đầu năm 1861 Pháp tấn công Đại đồn Chí Hoà, lần lượt chiếm các tỉnh Định Tường, Biên Hoà, Vĩnh Long. Triều đình hoang mang, chủ trương thương lượng để giữ ngai vàng.' },
      { h: 'Hiệp ước Nhâm Tuất (5/6/1862)' },
      { ul: [
        'Triều đình nhượng hẳn ba tỉnh miền Đông Nam Kì (Gia Định, Định Tường, Biên Hoà) và đảo Côn Lôn cho Pháp.',
        'Mở ba cửa biển (Đà Nẵng, Ba Lạt, Quảng Yên) cho Pháp vào buôn bán.',
        'Cho phép giáo sĩ Pháp và Tây Ban Nha tự do truyền đạo.',
        'Bồi thường chiến phí cho Pháp (4 triệu đồng).',
        'Pháp trả lại thành Vĩnh Long với điều kiện triều đình buộc dân ngừng kháng chiến.',
      ] },
      { h: 'Vì sao triều đình kí hiệp ước?' },
      { p: 'Triều đình nhà Nguyễn nuôi ảo tưởng có thể thương lượng để chuộc lại đất; đồng thời muốn rảnh tay đối phó với các phong trào nông dân khởi nghĩa ở Bắc Kì và Trung Kì. Đây là một hiệp ước đầu hàng đầu tiên, gây tổn hại lớn cho chủ quyền dân tộc.' },
      { h: 'Phong trào kháng chiến của nhân dân tiếp tục' },
      { ul: [
        'Khởi nghĩa Trương Định (1862–1864): nhân dân tôn ông làm "Bình Tây Đại nguyên soái", lập căn cứ ở Tân Hoà (Gò Công).',
        'Nguyễn Trung Trực với câu nói bất hủ: "Bao giờ người Tây nhổ hết cỏ nước Nam thì mới hết người Nam đánh Tây".',
        'Nguyễn Hữu Huân kiên trì khởi nghĩa nhiều năm ở Mỹ Tho.',
      ] },
      { h: 'Thực dân Pháp chiếm ba tỉnh miền Tây (1867)' },
      { p: 'Lợi dụng sự bạc nhược của triều đình, năm 1867 Pháp chiếm gọn ba tỉnh miền Tây Nam Kì (Vĩnh Long, An Giang, Hà Tiên) mà không tốn một viên đạn. Toàn bộ Nam Kì rơi vào tay Pháp.' },
      { h: 'Đặc điểm phong trào kháng chiến Nam Kì' },
      { ul: [
        'Diễn ra liên tục, sôi nổi, do nhiều sĩ phu yêu nước và nông dân lãnh đạo.',
        'Hình thức đấu tranh phong phú: khởi nghĩa vũ trang, "tị địa" (bỏ đất ra đi không hợp tác với giặc), dùng thơ văn yêu nước (Nguyễn Đình Chiểu).',
        'Thể hiện rõ thái độ "nước mất nhưng lòng dân không mất".',
      ] },
      { note: 'Nhà thơ mù Nguyễn Đình Chiểu đã dùng ngòi bút làm vũ khí với những câu thơ bất hủ: "Chở bao nhiêu đạo thuyền không khẳm / Đâm mấy thằng gian bút chẳng tà".' },
    ],
    [
      { q: 'Vì sao Hiệp ước Nhâm Tuất 1862 bị coi là một hiệp ước đầu hàng, bán nước?', a: 'Vì qua hiệp ước, triều đình nhà Nguyễn đã chủ động cắt ba tỉnh miền Đông Nam Kì và đảo Côn Lôn cho Pháp, mở cửa biển, cho tự do truyền đạo và bồi thường chiến phí. Triều đình còn ngăn cản nhân dân kháng chiến — tức là từ bỏ một phần chủ quyền lãnh thổ và quay lưng với cuộc kháng chiến của nhân dân.' },
      { q: 'Vì sao năm 1867 Pháp chiếm ba tỉnh miền Tây Nam Kì "không tốn một viên đạn"?', a: 'Vì triều đình nhà Nguyễn quá bạc nhược, không tổ chức kháng chiến mà chủ trương thương lượng, giao nộp. Khi Pháp gây sức ép, quan lại triều đình ở Vĩnh Long, An Giang, Hà Tiên nộp thành đầu hàng, khiến ba tỉnh miền Tây rơi vào tay giặc mà gần như không có sự kháng cự của quân triều đình.' },
      { q: 'Thái độ của Trương Định khác với triều đình ở điểm nào?', a: 'Khi triều đình kí hiệp ước và ra lệnh bãi binh, Trương Định đã cự tuyệt, ở lại cùng nhân dân tiếp tục kháng chiến và được tôn làm "Bình Tây Đại nguyên soái". Điều đó thể hiện ý chí kiên quyết chống Pháp của nhân dân, trái ngược với thái độ đầu hàng, thoả hiệp của triều đình.' },
    ]
  ),

  'S8LSDL-w11-quiz': L(
    'LS — Thực dân Pháp đánh Bắc Kì lần thứ nhất và lần thứ hai (1873, 1882)',
    'Sau khi chiếm Nam Kì, thực dân Pháp hai lần đánh ra Bắc Kì. Quân dân Hà Nội và Bắc Kì đã anh dũng kháng chiến với những chiến công vang dội ở Cầu Giấy.',
    [
      'Trình bày được hai lần Pháp đánh chiếm Bắc Kì.',
      'Nêu được tinh thần kháng chiến của quân dân Hà Nội.',
      'Phân tích ý nghĩa của hai trận Cầu Giấy.',
    ],
    [
      { h: 'Âm mưu của Pháp ở Bắc Kì' },
      { p: 'Sau khi chiếm Nam Kì, thực dân Pháp âm mưu đánh chiếm Bắc Kì — vùng đông dân, giàu tài nguyên, có sông Hồng làm đường thông thương lên Vân Nam (Trung Quốc).' },
      { h: 'Pháp đánh Bắc Kì lần thứ nhất (1873)' },
      { ul: [
        'Lấy cớ giải quyết vụ lái buôn Giăng Đuy-puy gây rối, Pháp cử Gác-ni-ê (Garnier) đem quân ra Bắc.',
        'Ngày 20/11/1873, Pháp nổ súng đánh thành Hà Nội. Tổng đốc Nguyễn Tri Phương chỉ huy chống cự.',
        'Thành Hà Nội thất thủ; Nguyễn Tri Phương bị thương nặng, bị bắt, ông nhịn ăn mà mất để giữ khí tiết.',
      ] },
      { h: 'Trận Cầu Giấy lần thứ nhất (21/12/1873)' },
      { p: 'Quân ta phối hợp với đội quân Cờ đen của Lưu Vĩnh Phúc phục kích ở Cầu Giấy, giết chết Gác-ni-ê. Chiến thắng làm nức lòng quân dân, khiến Pháp hoang mang, lúng túng.' },
      { h: 'Hiệp ước Giáp Tuất (1874)' },
      { p: 'Đáng tiếc, thay vì thừa thắng đánh đuổi giặc, triều đình lại kí Hiệp ước Giáp Tuất (1874), thừa nhận sáu tỉnh Nam Kì hoàn toàn thuộc Pháp, đổi lấy việc Pháp rút quân khỏi Bắc Kì — một bước nhượng bộ tai hại.' },
      { h: 'Pháp đánh Bắc Kì lần thứ hai (1882)' },
      { ul: [
        'Năm 1882, lấy cớ triều đình "vi phạm hiệp ước", Pháp cử Ri-vi-e (Rivière) đem quân đánh Bắc Kì lần hai.',
        'Ngày 25/4/1882, Pháp tấn công thành Hà Nội. Tổng đốc Hoàng Diệu chỉ huy quân dân chiến đấu.',
        'Thành thất thủ, Hoàng Diệu thắt cổ tự vẫn để bảo toàn khí tiết, nêu gương sáng về lòng trung nghĩa.',
      ] },
      { h: 'Trận Cầu Giấy lần thứ hai (19/5/1883)' },
      { p: 'Quân ta lại phối hợp với quân Cờ đen phục kích ở Cầu Giấy, tiêu diệt Ri-vi-e. Chiến thắng cổ vũ tinh thần kháng chiến, nhưng triều đình vẫn ảo tưởng thương lượng.' },
      { h: 'Hai tấm gương tiết tháo' },
      { p: 'Nguyễn Tri Phương và Hoàng Diệu — hai vị Tổng đốc Hà Nội — đều giữ trọn khí tiết, chết theo thành. Họ là biểu tượng cao đẹp của tinh thần "thà chết vinh còn hơn sống nhục", trái ngược với sự nhu nhược của triều đình.' },
      { note: 'Hai trận Cầu Giấy chứng tỏ: nếu triều đình biết dựa vào dân, phối hợp với các lực lượng kháng chiến và thừa thắng tiến công, hoàn toàn có thể đánh bại được giặc Pháp.' },
    ],
    [
      { q: 'Vì sao thực dân Pháp quyết tâm đánh chiếm Bắc Kì?', a: 'Vì Bắc Kì là vùng đông dân, giàu tài nguyên (khoáng sản, nông sản), lại có sông Hồng làm đường giao thông thuận tiện để thông thương buôn bán lên Vân Nam (Trung Quốc). Chiếm Bắc Kì sẽ giúp Pháp hoàn thành việc xâm chiếm toàn bộ Việt Nam và mở rộng ảnh hưởng sang Nam Trung Hoa.' },
      { q: 'Hai trận Cầu Giấy (1873 và 1883) có ý nghĩa như thế nào?', a: 'Hai trận Cầu Giấy đều tiêu diệt được chỉ huy cao cấp của Pháp (Gác-ni-ê và Ri-vi-e), làm cho quân Pháp hoang mang, lo sợ và lúng túng. Hai chiến thắng cổ vũ mạnh mẽ tinh thần kháng chiến của quân dân ta, chứng tỏ ta hoàn toàn có khả năng đánh thắng Pháp nếu kiên quyết chiến đấu.' },
      { q: 'Vì sao sau chiến thắng Cầu Giấy 1873, triều đình lại kí Hiệp ước Giáp Tuất bất lợi?', a: 'Vì triều đình nhà Nguyễn vẫn mang nặng tư tưởng cầu hoà, sợ chiến tranh kéo dài ảnh hưởng đến ngai vàng, lại nuôi ảo tưởng thương lượng để Pháp rút quân. Do đó, thay vì thừa thắng đánh đuổi giặc, triều đình đã kí Hiệp ước Giáp Tuất (1874), thừa nhận sáu tỉnh Nam Kì thuộc Pháp — một sai lầm nghiêm trọng.' },
    ]
  ),

  'S8LSDL-w12-quiz': L(
    'LS — Hiệp ước Hác-măng (1883) và Pa-tơ-nốt (1884) — Việt Nam trở thành thuộc địa',
    'Hai bản hiệp ước Hác-măng và Pa-tơ-nốt đã chính thức biến Việt Nam thành thuộc địa của thực dân Pháp, chấm dứt sự tồn tại độc lập của nhà nước phong kiến Nguyễn.',
    [
      'Trình bày được nội dung của Hiệp ước Hác-măng và Pa-tơ-nốt.',
      'Nêu được hậu quả: Việt Nam trở thành thuộc địa nửa phong kiến.',
      'Phân tích trách nhiệm của triều đình nhà Nguyễn để mất nước.',
    ],
    [
      { h: 'Pháp tấn công cửa biển Thuận An' },
      { p: 'Năm 1883, nhân lúc vua Tự Đức mất, triều đình rối ren, Pháp đem quân đánh thẳng vào cửa biển Thuận An — yết hầu của kinh đô Huế. Triều đình hoảng sợ, vội xin đình chiến.' },
      { h: 'Hiệp ước Hác-măng (25/8/1883)' },
      { ul: [
        'Triều đình thừa nhận sự bảo hộ của Pháp trên toàn Việt Nam.',
        'Nam Kì là xứ thuộc địa; Bắc Kì là đất bảo hộ; Trung Kì do triều đình quản lí nhưng dưới sự kiểm soát của Pháp.',
        'Mọi việc giao thiệp với nước ngoài (kể cả Trung Quốc) đều do Pháp nắm.',
        'Triều đình phải rút quân từ Bắc Kì về Trung Kì.',
      ] },
      { h: 'Phong trào kháng chiến vẫn sôi nổi' },
      { p: 'Hiệp ước Hác-măng gây bất bình lớn. Nhân dân và nhiều quan lại, văn thân tiếp tục kháng chiến, phong trào chống Pháp lan rộng khắp Bắc Kì và Trung Kì, khiến Pháp phải tìm cách xoa dịu.' },
      { h: 'Hiệp ước Pa-tơ-nốt (6/6/1884)' },
      { ul: [
        'Pháp sửa đổi đôi chút Hiệp ước Hác-măng để xoa dịu dư luận và mua chuộc triều đình, quan lại phong kiến.',
        'Mở rộng phần đất Trung Kì (trả lại một số tỉnh) cho triều đình quản lí trên danh nghĩa.',
        'Về cơ bản giữ nguyên tính chất: Việt Nam chính thức trở thành thuộc địa của Pháp.',
      ] },
      { h: 'Việt Nam — nước thuộc địa nửa phong kiến' },
      { ul: [
        'Hiệp ước Pa-tơ-nốt chấm dứt sự tồn tại của nhà nước phong kiến độc lập Việt Nam.',
        'Việt Nam trở thành thuộc địa nửa phong kiến: thực dân Pháp nắm quyền thống trị; bộ máy phong kiến nhà Nguyễn vẫn còn nhưng chỉ là bù nhìn, tay sai.',
        'Bắt đầu thời kì thực dân Pháp đô hộ kéo dài hơn 60 năm (1884–1945).',
      ] },
      { h: 'Nguyên nhân mất nước' },
      { ul: [
        'Khách quan: Pháp là nước tư bản mạnh, có ưu thế về vũ khí, kĩ thuật.',
        'Chủ quan: triều đình nhà Nguyễn bảo thủ, không canh tân đất nước; thiếu quyết tâm kháng chiến; chủ trương cầu hoà, từng bước nhượng bộ và đầu hàng.',
      ] },
      { h: 'Bài học lịch sử' },
      { p: 'Việc nước ta rơi vào tay Pháp không phải là điều "không thể tránh khỏi", mà chủ yếu do đường lối sai lầm, sự bạc nhược của triều đình. Đây là bài học sâu sắc về trách nhiệm của giai cấp lãnh đạo trước vận mệnh dân tộc.' },
      { note: 'Từ một quốc gia phong kiến độc lập, Việt Nam trở thành thuộc địa — mâu thuẫn cơ bản của xã hội từ đây chuyển thành mâu thuẫn giữa toàn thể dân tộc Việt Nam với thực dân Pháp xâm lược.' },
    ],
    [
      { q: 'Vì sao nói Hiệp ước Pa-tơ-nốt (1884) đã chính thức biến Việt Nam thành thuộc địa của Pháp?', a: 'Vì với Hiệp ước Pa-tơ-nốt, triều đình nhà Nguyễn chính thức thừa nhận quyền bảo hộ và thống trị của Pháp trên toàn lãnh thổ; chia nước ta thành ba kì với chế độ cai trị do Pháp định đoạt. Nhà nước phong kiến độc lập Việt Nam chấm dứt; Việt Nam trở thành thuộc địa nửa phong kiến.' },
      { q: 'Phân biệt tính chất ba kì (Bắc Kì, Trung Kì, Nam Kì) theo các hiệp ước.', a: 'Theo Hiệp ước Hác-măng và Pa-tơ-nốt: Nam Kì là xứ thuộc địa (Pháp trực tiếp cai trị); Bắc Kì là đất nửa bảo hộ (Pháp kiểm soát chặt); Trung Kì là đất bảo hộ, trên danh nghĩa do triều đình Huế quản lí nhưng thực chất nằm dưới sự khống chế của Pháp. Cách chia này nhằm "chia để trị".' },
      { q: 'Theo em, đâu là nguyên nhân chủ yếu khiến nước ta rơi vào tay thực dân Pháp?', a: 'Nguyên nhân chủ yếu (chủ quan) là do triều đình nhà Nguyễn bảo thủ, không chịu canh tân đất nước, thiếu quyết tâm kháng chiến và liên tục thoả hiệp, đầu hàng. Dù nhân dân kiên quyết chống Pháp, nhưng vì không có đường lối đúng và sự lãnh đạo kiên định nên cuối cùng nước ta mất vào tay Pháp.' },
    ]
  ),

  'S8LSDL-w13-quiz': L(
    'LS — Phong trào Cần Vương (1885–1896)',
    'Phong trào Cần Vương là phong trào yêu nước theo khuynh hướng phong kiến cuối cùng của dân tộc, do các văn thân, sĩ phu lãnh đạo nhằm "giúp vua cứu nước".',
    [
      'Trình bày được nguyên nhân bùng nổ và các giai đoạn của phong trào Cần Vương.',
      'Nêu được những cuộc khởi nghĩa tiêu biểu (Bãi Sậy, Ba Đình, Hương Khê).',
      'Phân tích nguyên nhân thất bại và ý nghĩa của phong trào.',
    ],
    [
      { h: 'Phái chủ chiến và cuộc phản công ở Huế' },
      { p: 'Sau hai hiệp ước 1883–1884, phái chủ chiến trong triều đình do Tôn Thất Thuyết đứng đầu vẫn nuôi hi vọng giành lại chủ quyền. Đêm 4 rạng 5/7/1885, Tôn Thất Thuyết hạ lệnh tấn công quân Pháp ở kinh thành Huế nhưng thất bại.' },
      { h: 'Chiếu Cần Vương' },
      { ul: [
        'Tôn Thất Thuyết đưa vua Hàm Nghi (13 tuổi) chạy ra Tân Sở (Quảng Trị).',
        'Ngày 13/7/1885, nhân danh vua Hàm Nghi, Tôn Thất Thuyết ban Chiếu Cần Vương, kêu gọi văn thân, sĩ phu và nhân dân đứng lên giúp vua cứu nước.',
        'Chiếu Cần Vương thổi bùng phong trào kháng chiến chống Pháp rộng khắp.',
      ] },
      { h: 'Hai giai đoạn của phong trào' },
      { ul: [
        'Giai đoạn 1 (1885–1888): phong trào dưới sự chỉ huy của vua Hàm Nghi và Tôn Thất Thuyết, nổ ra trên địa bàn rộng. Cuối 1888, vua Hàm Nghi bị bắt và bị đày sang An-giê-ri.',
        'Giai đoạn 2 (1888–1896): phong trào tuy mất sự lãnh đạo của triều đình nhưng vẫn tiếp tục, quy tụ thành các trung tâm khởi nghĩa lớn, đặc biệt là khởi nghĩa Hương Khê.',
      ] },
      { h: 'Khởi nghĩa Bãi Sậy (1883–1892)' },
      { p: 'Do Nguyễn Thiện Thuật lãnh đạo, diễn ra ở vùng Hưng Yên. Nghĩa quân lợi dụng địa hình đầm lầy, lau sậy, áp dụng lối đánh du kích linh hoạt, gây cho Pháp nhiều thiệt hại.' },
      { h: 'Khởi nghĩa Ba Đình (1886–1887)' },
      { p: 'Do Phạm Bành và Đinh Công Tráng lãnh đạo, ở Nga Sơn (Thanh Hoá). Nghĩa quân xây dựng căn cứ kiên cố giữa ba làng (Mậu Thịnh, Thượng Thọ, Mĩ Khê). Khi căn cứ bị phá, cuộc khởi nghĩa thất bại — đây là khởi nghĩa theo lối "phòng thủ kiên cố".' },
      { h: 'Khởi nghĩa Hương Khê (1885–1896) — tiêu biểu nhất' },
      { ul: [
        'Lãnh đạo: Phan Đình Phùng (lãnh tụ) và Cao Thắng (tướng giỏi chế tạo vũ khí).',
        'Địa bàn rộng khắp bốn tỉnh: Thanh Hoá, Nghệ An, Hà Tĩnh, Quảng Bình.',
        'Nghĩa quân tổ chức chặt chẽ, tự chế được súng trường theo kiểu Pháp.',
        'Kéo dài 11 năm, là cuộc khởi nghĩa quy mô lớn nhất, tiêu biểu nhất của phong trào Cần Vương.',
      ] },
      { h: 'Nguyên nhân thất bại và ý nghĩa' },
      { p: 'Phong trào thất bại do thiếu một đường lối và giai cấp lãnh đạo tiên tiến (vẫn theo ý thức hệ phong kiến lỗi thời), các cuộc khởi nghĩa lẻ tẻ, thiếu liên kết. Tuy nhiên, phong trào thể hiện truyền thống yêu nước, ý chí bất khuất và để lại nhiều bài học quý cho các phong trào sau.' },
      { note: 'Sự thất bại của phong trào Cần Vương đánh dấu sự chấm dứt vai trò lãnh đạo cách mạng của giai cấp phong kiến — đặt ra yêu cầu phải tìm con đường cứu nước mới.' },
    ],
    [
      { q: 'Vì sao Chiếu Cần Vương lại có sức kêu gọi mạnh mẽ đến vậy?', a: 'Vì Chiếu Cần Vương được ban hành nhân danh vua Hàm Nghi — biểu tượng chính thống của đất nước, kêu gọi "giúp vua cứu nước" đúng vào lúc lòng căm thù giặc Pháp đang dâng cao. Tư tưởng "trung quân ái quốc" còn ăn sâu trong các văn thân, sĩ phu và nhân dân, nên lời kêu gọi đã thổi bùng phong trào kháng chiến rộng khắp.' },
      { q: 'Vì sao khởi nghĩa Hương Khê được coi là tiêu biểu nhất của phong trào Cần Vương?', a: 'Vì khởi nghĩa Hương Khê có thời gian kéo dài nhất (11 năm, 1885–1896), địa bàn hoạt động rộng lớn (4 tỉnh: Thanh Hoá, Nghệ An, Hà Tĩnh, Quảng Bình), tổ chức chặt chẽ, có sự chỉ huy thống nhất của Phan Đình Phùng và Cao Thắng, lại tự chế tạo được vũ khí (súng trường). Đó là đỉnh cao của phong trào Cần Vương.' },
      { q: 'Nguyên nhân thất bại của phong trào Cần Vương nói lên điều gì?', a: 'Phong trào thất bại chủ yếu vì thiếu một đường lối đúng đắn và giai cấp lãnh đạo tiên tiến — vẫn dựa trên ý thức hệ phong kiến đã lỗi thời, các cuộc khởi nghĩa rời rạc, thiếu liên kết. Điều đó cho thấy con đường cứu nước theo khuynh hướng phong kiến đã bế tắc, đòi hỏi dân tộc phải tìm một con đường cứu nước mới.' },
    ]
  ),

  'S8LSDL-w14-quiz': L(
    'LS — Khởi nghĩa nông dân Yên Thế (1884–1913)',
    'Khởi nghĩa Yên Thế do Hoàng Hoa Thám lãnh đạo là cuộc khởi nghĩa nông dân lớn nhất và bền bỉ nhất trong phong trào chống Pháp cuối thế kỉ XIX – đầu thế kỉ XX.',
    [
      'Trình bày được nguyên nhân và các giai đoạn của khởi nghĩa Yên Thế.',
      'Nêu được vai trò của Hoàng Hoa Thám.',
      'So sánh khởi nghĩa Yên Thế với phong trào Cần Vương.',
    ],
    [
      { h: 'Vùng đất Yên Thế' },
      { p: 'Yên Thế là vùng đồi núi hiểm trở thuộc tỉnh Bắc Giang, nơi tụ họp của những nông dân nghèo từ nhiều nơi đến khai hoang sinh sống. Khi Pháp mở rộng chiếm đóng, đe doạ cuộc sống của họ, nông dân Yên Thế đã nổi dậy để tự vệ và bảo vệ quê hương.' },
      { h: 'Nguyên nhân khởi nghĩa' },
      { ul: [
        'Thực dân Pháp bình định và cướp đất, đe doạ trực tiếp cuộc sống của nông dân Yên Thế.',
        'Nông dân Yên Thế vốn có tinh thần thượng võ, bất khuất, không cam chịu áp bức.',
        'Khởi nghĩa mang tính tự phát, nhằm bảo vệ cuộc sống và ruộng đất.',
      ] },
      { h: 'Các giai đoạn của khởi nghĩa' },
      { ul: [
        'Giai đoạn 1884–1892: nhiều toán nghĩa quân hoạt động riêng rẽ, thủ lĩnh có uy tín nhất là Đề Nắm.',
        'Giai đoạn 1893–1908: Hoàng Hoa Thám (Đề Thám) lãnh đạo, hai lần giảng hoà với Pháp để củng cố lực lượng, xây dựng căn cứ Phồn Xương.',
        'Giai đoạn 1909–1913: Pháp tập trung lực lượng tấn công, nghĩa quân hao mòn dần. Năm 1913, Đề Thám bị sát hại, khởi nghĩa tan rã.',
      ] },
      { h: 'Hoàng Hoa Thám — "Hùm thiêng Yên Thế"' },
      { p: 'Hoàng Hoa Thám (Đề Thám) là thủ lĩnh tài ba, mưu trí, có biệt tài chỉ huy chiến tranh du kích và được nghĩa quân, nhân dân hết lòng tin yêu. Ông đã khôn khéo "giảng hoà" để tranh thủ thời gian xây dựng lực lượng.' },
      { h: 'Đặc điểm của khởi nghĩa Yên Thế' },
      { ul: [
        'Mang tính chất tự vệ, tự phát của nông dân (không chịu sự chi phối của Chiếu Cần Vương).',
        'Thời gian kéo dài gần 30 năm — lâu nhất trong các cuộc khởi nghĩa chống Pháp.',
        'Lối đánh du kích linh hoạt, dựa vào địa hình hiểm trở và sự ủng hộ của nhân dân.',
      ] },
      { h: 'Nguyên nhân thất bại và ý nghĩa' },
      { p: 'Khởi nghĩa thất bại do tương quan lực lượng quá chênh lệch, lại mang tính địa phương, thiếu sự lãnh đạo của một giai cấp tiên tiến và đường lối đúng đắn. Tuy vậy, khởi nghĩa thể hiện sức mạnh to lớn và tinh thần đấu tranh bền bỉ của nông dân Việt Nam.' },
      { note: 'Khởi nghĩa Yên Thế cho thấy: nông dân là một lực lượng cách mạng to lớn, nhưng tự bản thân giai cấp nông dân không thể lãnh đạo cách mạng đến thắng lợi — cần một giai cấp tiên tiến dẫn đường.' },
    ],
    [
      { q: 'Khởi nghĩa Yên Thế khác phong trào Cần Vương ở những điểm cơ bản nào?', a: 'Khác nhau ở mục tiêu, lãnh đạo và tính chất: phong trào Cần Vương do văn thân, sĩ phu lãnh đạo, hưởng ứng Chiếu Cần Vương "giúp vua cứu nước"; còn khởi nghĩa Yên Thế do nông dân (Hoàng Hoa Thám) lãnh đạo, mang tính tự vệ, tự phát để bảo vệ cuộc sống và ruộng đất, không chịu sự chi phối của triều đình. Yên Thế cũng kéo dài lâu hơn nhiều (gần 30 năm).' },
      { q: 'Vì sao khởi nghĩa Yên Thế tồn tại được gần 30 năm?', a: 'Vì nghĩa quân biết dựa vào địa hình rừng núi hiểm trở của Yên Thế, sử dụng lối đánh du kích linh hoạt, được nhân dân địa phương hết lòng ủng hộ, che chở. Hoàng Hoa Thám lại khôn khéo hai lần "giảng hoà" với Pháp để tranh thủ thời gian củng cố, xây dựng lực lượng. Nhờ đó khởi nghĩa duy trì được rất lâu.' },
      { q: 'Sự thất bại của khởi nghĩa Yên Thế để lại bài học gì?', a: 'Bài học: nông dân là lực lượng đông đảo, có tinh thần đấu tranh mạnh mẽ, nhưng nếu chỉ có nông dân tự phát mà thiếu một giai cấp tiên tiến lãnh đạo và một đường lối cách mạng đúng đắn thì không thể giành thắng lợi. Điều này đặt ra yêu cầu tìm con đường cứu nước mới cho dân tộc.' },
    ]
  ),

  'S8LSDL-w15-quiz': L(
    'LS — Trào lưu cải cách ở Việt Nam nửa cuối thế kỉ XIX',
    'Trước nguy cơ mất nước, một số quan lại, sĩ phu thức thời đã mạnh dạn đề nghị triều đình canh tân đất nước, nhưng các đề nghị cải cách đều không được thực hiện.',
    [
      'Trình bày được bối cảnh và nội dung các đề nghị cải cách.',
      'Nêu được những nhà cải cách tiêu biểu (Nguyễn Trường Tộ, Nguyễn Lộ Trạch…).',
      'Phân tích nguyên nhân các đề nghị cải cách không thực hiện được.',
    ],
    [
      { h: 'Bối cảnh đất nước' },
      { p: 'Nửa cuối thế kỉ XIX, triều đình nhà Nguyễn vẫn duy trì chính sách bảo thủ, kinh tế kiệt quệ, xã hội rối ren, trong khi thực dân Pháp ráo riết xâm lược. Trước tình hình ấy, một số người có tư tưởng tiến bộ đã đề nghị cải cách, canh tân để cứu nước.' },
      { h: 'Các nhà cải cách tiêu biểu' },
      { ul: [
        'Trần Đình Túc, Nguyễn Huy Tế: xin mở cửa biển Trà Lí (Nam Định) để thông thương.',
        'Đinh Văn Điền: xin đẩy mạnh khai khẩn ruộng hoang, khai mỏ, phát triển buôn bán, chấn chỉnh quốc phòng.',
        'Nguyễn Trường Tộ: gửi lên triều đình hơn 30 bản điều trần đề nghị cải cách toàn diện.',
        'Nguyễn Lộ Trạch: dâng "Thời vụ sách" đề nghị chấn hưng dân khí, khai thông dân trí, bảo vệ đất nước.',
        'Viện Thương bạc: xin mở ba cửa biển ở miền Bắc và miền Trung để giao thương.',
      ] },
      { h: 'Nguyễn Trường Tộ — nhà cải cách lớn' },
      { ul: [
        'Đề nghị chấn chỉnh bộ máy quan lại, phát triển công thương nghiệp và tài chính.',
        'Chỉnh đốn quân đội, mở rộng ngoại giao, cải tổ giáo dục (học khoa học kĩ thuật, ngoại ngữ).',
        'Tư tưởng cải cách của ông toàn diện, có tầm nhìn vượt thời đại.',
      ] },
      { h: 'Nội dung chung của các đề nghị cải cách' },
      { ul: [
        'Đổi mới về kinh tế: phát triển công thương nghiệp, khai mỏ, mở mang giao thương với nước ngoài.',
        'Đổi mới về quân sự: chấn chỉnh quân đội, mua sắm vũ khí hiện đại.',
        'Đổi mới về giáo dục, văn hoá: học tập khoa học kĩ thuật phương Tây.',
        'Đổi mới về ngoại giao: mở rộng quan hệ với các nước.',
      ] },
      { h: 'Kết cục và nguyên nhân thất bại' },
      { ul: [
        'Triều đình nhà Nguyễn bảo thủ, bất lực, không chấp nhận thay đổi nên các đề nghị cải cách đều bị khước từ.',
        'Các đề nghị còn mang tính lẻ tẻ, rời rạc, chưa thành một hệ thống hoàn chỉnh và chưa xuất phát từ cơ sở kinh tế — xã hội vững chắc.',
      ] },
      { h: 'Ý nghĩa của trào lưu cải cách' },
      { p: 'Dù không thực hiện được, trào lưu cải cách đã tấn công vào tư tưởng bảo thủ, phản ánh trình độ nhận thức mới của người Việt Nam, góp phần chuẩn bị cho phong trào Duy tân sôi nổi đầu thế kỉ XX.' },
      { note: 'So sánh: cùng thời điểm, Nhật Bản tiến hành Duy tân Minh Trị thành công, còn Việt Nam thì bỏ lỡ cơ hội cải cách do triều đình bảo thủ — một bài học đắt giá về tinh thần đổi mới.' },
    ],
    [
      { q: 'Vì sao các đề nghị cải cách ở Việt Nam nửa cuối thế kỉ XIX không được thực hiện?', a: 'Vì triều đình nhà Nguyễn quá bảo thủ, lạc hậu và bất lực, không muốn thay đổi để bảo vệ quyền lợi ích kỉ của giai cấp phong kiến. Mặt khác, các đề nghị cải cách còn mang tính lẻ tẻ, rời rạc, chưa thành hệ thống và chưa có cơ sở kinh tế — xã hội đủ mạnh để thực hiện.' },
      { q: 'Đánh giá tư tưởng cải cách của Nguyễn Trường Tộ.', a: 'Nguyễn Trường Tộ là nhà cải cách lớn, có tầm nhìn vượt thời đại: ông đề nghị canh tân toàn diện cả kinh tế, quân sự, giáo dục, ngoại giao, học tập khoa học kĩ thuật phương Tây. Hơn 30 bản điều trần của ông thể hiện lòng yêu nước và mong muốn đưa đất nước thoát khỏi nguy cơ mất nước, dù tiếc rằng không được triều đình chấp nhận.' },
      { q: 'Trào lưu cải cách cuối thế kỉ XIX có ý nghĩa gì đối với lịch sử dân tộc?', a: 'Tuy không thành hiện thực, trào lưu cải cách đã giáng một đòn vào tư tưởng bảo thủ của triều đình, phản ánh nhận thức mới, tiến bộ của một bộ phận người Việt Nam yêu nước. Nó góp phần chuẩn bị về tư tưởng cho sự ra đời của phong trào Duy tân, yêu nước theo khuynh hướng dân chủ tư sản đầu thế kỉ XX.' },
    ]
  ),

  'S8LSDL-w16-quiz': L(
    'LS — Phong trào yêu nước đầu thế kỉ XX: Đông Du, Duy tân, Đông Kinh Nghĩa Thục',
    'Đầu thế kỉ XX, các sĩ phu yêu nước tiến bộ đã tiếp thu tư tưởng dân chủ tư sản, mở ra một khuynh hướng cứu nước mới: bạo động hoặc cải cách, duy tân.',
    [
      'Trình bày được phong trào Đông Du của Phan Bội Châu.',
      'Nêu được chủ trương cải cách, duy tân của Phan Châu Trinh.',
      'Hiểu được vai trò của Đông Kinh Nghĩa Thục.',
    ],
    [
      { h: 'Bối cảnh đầu thế kỉ XX' },
      { p: 'Đầu thế kỉ XX, cuộc khai thác thuộc địa của Pháp làm xã hội Việt Nam phân hoá. Trào lưu tư tưởng dân chủ tư sản từ bên ngoài (qua Nhật Bản, Trung Quốc) tràn vào, kết hợp với lòng yêu nước, làm xuất hiện khuynh hướng cứu nước mới — khuynh hướng dân chủ tư sản.' },
      { h: 'Phan Bội Châu và xu hướng bạo động' },
      { ul: [
        'Chủ trương dùng bạo động vũ trang để giành độc lập, dựa vào sự giúp đỡ bên ngoài (Nhật Bản).',
        'Năm 1904, lập Hội Duy tân; năm 1905 phát động phong trào Đông Du, đưa thanh niên sang Nhật học tập.',
        'Năm 1908, Pháp – Nhật cấu kết trục xuất lưu học sinh; phong trào Đông Du tan rã (1909).',
        'Năm 1912, lập Việt Nam Quang phục hội, chuyển sang mục tiêu lập nước cộng hoà.',
      ] },
      { h: 'Phan Châu Trinh và xu hướng cải cách, duy tân' },
      { ul: [
        'Chủ trương dựa vào Pháp để cải cách, nâng cao dân trí, dân quyền rồi tiến tới giành độc lập.',
        'Khẩu hiệu: "Khai dân trí, chấn dân khí, hậu dân sinh".',
        'Phản đối bạo động và việc cầu viện bên ngoài; chú trọng cải cách văn hoá, giáo dục, kinh tế.',
      ] },
      { h: 'Phong trào Duy tân ở Trung Kì (1906–1908)' },
      { p: 'Do Phan Châu Trinh, Huỳnh Thúc Kháng, Trần Quý Cáp khởi xướng. Phong trào cổ vũ học chữ Quốc ngữ, mở trường học, lập hội buôn, vận động cải cách phong tục (cắt tóc ngắn, mặc âu phục). Năm 1908, phong trào chống thuế ở Trung Kì bùng nổ rồi bị Pháp đàn áp.' },
      { h: 'Đông Kinh Nghĩa Thục (1907)' },
      { ul: [
        'Do Lương Văn Can, Nguyễn Quyền sáng lập tại Hà Nội (phố Hàng Đào).',
        'Là một trường học kiểu mới: dạy chữ Quốc ngữ, kiến thức khoa học, tuyên truyền lòng yêu nước, cổ vũ duy tân.',
        'Tháng 11/1907, Pháp ra lệnh đóng cửa trường vì lo ngại ảnh hưởng yêu nước lan rộng.',
      ] },
      { h: 'Đặc điểm và hạn chế' },
      { ul: [
        'Khuynh hướng cứu nước mới — dân chủ tư sản, do tầng lớp sĩ phu tiến bộ khởi xướng.',
        'Hình thức phong phú: bạo động, cải cách, mở trường, lập hội.',
        'Hạn chế: chưa có đường lối đúng đắn, hoặc ảo tưởng dựa vào Nhật (đế quốc), hoặc dựa vào Pháp (kẻ thù) nên đều thất bại.',
      ] },
      { note: 'Bài học từ thất bại của hai cụ Phan: dựa vào "hổ" (Nhật) đuổi "sói" (Pháp) hay "xin" kẻ thù ban ơn đều không thể giành độc lập — con đường cứu nước đúng đắn vẫn còn ở phía trước.' },
    ],
    [
      { q: 'So sánh chủ trương cứu nước của Phan Bội Châu và Phan Châu Trinh.', a: 'Phan Bội Châu chủ trương dùng bạo động vũ trang để đánh Pháp giành độc lập, dựa vào sự giúp đỡ của Nhật Bản (Đông Du). Phan Châu Trinh chủ trương cải cách, duy tân, dựa vào Pháp để nâng cao dân trí, dân quyền rồi tiến tới độc lập, phản đối bạo động. Cả hai đều yêu nước nhưng khác nhau về phương pháp.' },
      { q: 'Vì sao phong trào Đông Du thất bại?', a: 'Phong trào Đông Du thất bại vì Phan Bội Châu chủ trương dựa vào Nhật Bản — vốn cũng là một nước đế quốc. Năm 1908, Pháp và Nhật cấu kết với nhau, Nhật trục xuất các lưu học sinh Việt Nam và Phan Bội Châu. Đó là sự ảo tưởng "đưa hổ cửa trước, rước beo cửa sau" nên phong trào tan rã.' },
      { q: 'Đông Kinh Nghĩa Thục có vai trò gì trong phong trào yêu nước đầu thế kỉ XX?', a: 'Đông Kinh Nghĩa Thục (1907) là một trường học kiểu mới, dạy chữ Quốc ngữ và kiến thức khoa học, đồng thời là trung tâm tuyên truyền lòng yêu nước, cổ vũ duy tân, nâng cao dân trí. Tuy chỉ tồn tại chưa đầy một năm nhưng nó có tác dụng thức tỉnh tinh thần dân tộc, cổ vũ phong trào yêu nước theo khuynh hướng dân chủ tư sản.' },
    ]
  ),

  'S8LSDL-w17-quiz': L(
    'LS — Cuộc khai thác thuộc địa lần thứ nhất của thực dân Pháp (1897–1914)',
    'Sau khi bình định xong Việt Nam, thực dân Pháp tiến hành cuộc khai thác thuộc địa lần thứ nhất, làm biến đổi sâu sắc kinh tế và xã hội nước ta.',
    [
      'Trình bày được chính sách khai thác kinh tế của Pháp.',
      'Nêu được những chuyển biến về kinh tế, xã hội Việt Nam.',
      'Phân tích sự xuất hiện của các giai cấp, tầng lớp mới.',
    ],
    [
      { h: 'Tổ chức bộ máy cai trị' },
      { ul: [
        'Năm 1897, Pháp lập Liên bang Đông Dương gồm Việt Nam, Lào, Cam-pu-chia, đứng đầu là Toàn quyền Đông Dương.',
        'Toàn quyền Pôn Đu-me (Paul Doumer) đẩy mạnh khai thác để vơ vét, làm giàu cho chính quốc.',
        'Việt Nam bị chia làm ba kì với ba chế độ cai trị khác nhau ("chia để trị").',
      ] },
      { h: 'Mục đích khai thác' },
      { p: 'Vơ vét tài nguyên thiên nhiên, bóc lột nhân công rẻ mạt, biến Việt Nam thành thị trường tiêu thụ hàng hoá và nơi cung cấp nguyên liệu cho nền công nghiệp Pháp.' },
      { h: 'Chính sách trong nông nghiệp' },
      { ul: [
        'Đẩy mạnh cướp đoạt ruộng đất để lập đồn điền (cà phê, cao su, chè).',
        'Duy trì phương thức bóc lột phong kiến (phát canh thu tô) để thu lợi nhuận cao.',
      ] },
      { h: 'Chính sách trong công nghiệp và giao thông' },
      { ul: [
        'Tập trung khai thác mỏ (than ở Quảng Ninh, thiếc, kẽm, vonfram) để xuất khẩu.',
        'Phát triển một số ngành công nghiệp nhẹ (chế biến nông sản, xi măng, dệt, điện nước).',
        'Xây dựng hệ thống giao thông (đường sắt, đường bộ, cầu cảng) phục vụ khai thác và đàn áp.',
      ] },
      { h: 'Chính sách thuế khoá và thương nghiệp' },
      { ul: [
        'Đánh thuế nặng, đặc biệt thuế thân, thuế muối, thuế rượu, thuế thuốc phiện.',
        'Nắm độc quyền thị trường, đánh thuế nặng hàng hoá các nước khác để bảo hộ hàng Pháp.',
      ] },
      { h: 'Chuyển biến về xã hội — giai cấp cũ' },
      { ul: [
        'Giai cấp địa chủ phong kiến: một bộ phận làm tay sai cho Pháp, một bộ phận có tinh thần yêu nước.',
        'Giai cấp nông dân: bị bần cùng hoá, là lực lượng đông đảo và cách mạng nhất.',
      ] },
      { h: 'Chuyển biến về xã hội — tầng lớp, giai cấp mới' },
      { ul: [
        'Giai cấp công nhân: ra đời từ cuộc khai thác, bị bóc lột nặng nề, có tinh thần đấu tranh.',
        'Tầng lớp tư sản: xuất thân từ các nhà thầu, chủ xưởng, chủ hãng buôn — thế lực kinh tế yếu.',
        'Tầng lớp tiểu tư sản thành thị: tiểu thương, viên chức, học sinh, sinh viên, trí thức — nhạy bén với thời cuộc.',
      ] },
      { note: 'Cuộc khai thác thuộc địa lần thứ nhất tuy làm xuất hiện một số yếu tố kinh tế tư bản chủ nghĩa, nhưng mục đích là vơ vét; xã hội Việt Nam vẫn là xã hội thuộc địa nửa phong kiến với hai mâu thuẫn cơ bản: dân tộc ta với Pháp, và nông dân với địa chủ phong kiến.' },
    ],
    [
      { q: 'Mục đích chính của cuộc khai thác thuộc địa lần thứ nhất là gì?', a: 'Mục đích chính của Pháp là vơ vét tài nguyên thiên nhiên, bóc lột sức lao động rẻ mạt của nhân dân ta, biến Việt Nam thành thị trường tiêu thụ hàng hoá và nơi cung cấp nguyên liệu cho nền công nghiệp chính quốc Pháp — chứ không phải để phát triển kinh tế Việt Nam.' },
      { q: 'Cuộc khai thác thuộc địa lần thứ nhất đã làm xuất hiện những giai cấp, tầng lớp mới nào?', a: 'Cuộc khai thác làm xuất hiện giai cấp công nhân (từ những người nông dân mất ruộng vào làm trong hầm mỏ, đồn điền, nhà máy), tầng lớp tư sản (chủ xưởng, nhà thầu, chủ hãng buôn) và tầng lớp tiểu tư sản thành thị (tiểu thương, viên chức, trí thức, học sinh). Đây là cơ sở xã hội cho các phong trào yêu nước mới.' },
      { q: 'Vì sao việc Pháp xây dựng đường sắt, cầu cảng lại không nhằm phát triển kinh tế Việt Nam?', a: 'Vì hệ thống giao thông được xây dựng chủ yếu để phục vụ mục đích khai thác (vận chuyển khoáng sản, nông sản về cảng để xuất sang Pháp) và phục vụ việc đàn áp, đi lại của bộ máy cai trị. Lợi nhuận từ khai thác chảy về Pháp, còn nhân dân ta vẫn bị bóc lột nặng nề, đời sống cực khổ.' },
    ]
  ),

  'S8LSDL-w18-quiz': L(
    'Ôn tập giữa học kì I (Lịch sử thế giới và Việt Nam cận đại)',
    'Tiết ôn tập giúp các em hệ thống lại kiến thức: các cuộc cách mạng tư sản, cách mạng công nghiệp, phong trào công nhân và quá trình Pháp xâm lược, phong trào yêu nước Việt Nam.',
    [
      'Hệ thống hoá các cuộc cách mạng tư sản tiêu biểu thế giới.',
      'Sắp xếp theo thời gian quá trình Pháp xâm lược Việt Nam.',
      'So sánh các phong trào yêu nước cuối XIX – đầu XX.',
    ],
    [
      { h: 'Các cuộc cách mạng tư sản tiêu biểu' },
      { ul: [
        'Cách mạng tư sản Anh (1640–1688): lập chế độ quân chủ lập hiến.',
        'Chiến tranh giành độc lập ở Bắc Mỹ (1775–1783): lập Hợp chúng quốc Hoa Kỳ.',
        'Cách mạng tư sản Pháp (1789–1794): triệt để nhất, lật đổ chế độ phong kiến.',
      ] },
      { h: 'Cách mạng công nghiệp và phong trào công nhân' },
      { ul: [
        'Cách mạng công nghiệp: máy hơi nước Giêm Oát, đầu máy xe lửa — chuyển sang sản xuất bằng máy.',
        'Sự ra đời hai giai cấp: tư sản và vô sản; phong trào công nhân phát triển.',
        'Chủ nghĩa Mác ra đời (1848 — Tuyên ngôn của Đảng Cộng sản); Quốc tế thứ nhất (1864); Công xã Pa-ri (1871).',
      ] },
      { h: 'Quá trình Pháp xâm lược Việt Nam' },
      { ul: [
        '1858: Pháp đánh Đà Nẵng, mở đầu xâm lược.',
        '1862: Hiệp ước Nhâm Tuất — mất ba tỉnh miền Đông Nam Kì.',
        '1867: Pháp chiếm ba tỉnh miền Tây Nam Kì.',
        '1873, 1882: Pháp đánh Bắc Kì lần một, lần hai.',
        '1883, 1884: Hiệp ước Hác-măng và Pa-tơ-nốt — Việt Nam thành thuộc địa.',
      ] },
      { h: 'Phong trào yêu nước Việt Nam' },
      { ul: [
        'Phong trào kháng chiến của nhân dân (Trương Định, Nguyễn Trung Trực…).',
        'Phong trào Cần Vương (1885–1896) — khuynh hướng phong kiến.',
        'Khởi nghĩa Yên Thế (1884–1913) — khởi nghĩa nông dân.',
        'Trào lưu cải cách cuối XIX; phong trào Đông Du, Duy tân, Đông Kinh Nghĩa Thục — khuynh hướng dân chủ tư sản.',
      ] },
      { h: 'Đặc điểm chung của phong trào yêu nước' },
      { p: 'Diễn ra liên tục, sôi nổi, thể hiện lòng yêu nước nồng nàn, nhưng đều thất bại do thiếu đường lối đúng đắn và giai cấp lãnh đạo tiên tiến. Điều đó đặt ra yêu cầu cấp thiết: tìm con đường cứu nước mới.' },
      { note: 'Mạch xuyên suốt của lịch sử giai đoạn này: chủ nghĩa tư bản chuyển sang đế quốc — đẩy mạnh xâm lược thuộc địa; còn dân tộc Việt Nam thì kiên cường tìm đường giải phóng.' },
    ],
    [
      { q: 'Sắp xếp các sự kiện sau theo thứ tự thời gian: A. Hiệp ước Pa-tơ-nốt; B. Pháp đánh Đà Nẵng; C. Hiệp ước Nhâm Tuất; D. Pháp đánh Bắc Kì lần thứ nhất.', a: 'Thứ tự đúng: B (1858) → C (1862) → D (1873) → A (1884).' },
      { q: 'Vì sao các cuộc cách mạng tư sản thế kỉ XVII–XVIII đều mở đường cho chủ nghĩa tư bản phát triển?', a: 'Vì các cuộc cách mạng tư sản đã lật đổ (hoặc hạn chế) chế độ phong kiến chuyên chế — vốn kìm hãm sản xuất, xoá bỏ các rào cản về thị trường, ruộng đất, nhân công; thiết lập nhà nước phục vụ lợi ích của giai cấp tư sản. Nhờ đó quan hệ sản xuất tư bản chủ nghĩa được "cởi trói" và phát triển mạnh mẽ.' },
      { q: 'Điểm chung trong nguyên nhân thất bại của các phong trào yêu nước Việt Nam cuối XIX – đầu XX là gì?', a: 'Điểm chung là đều thiếu một đường lối cứu nước đúng đắn và một giai cấp lãnh đạo tiên tiến: phong trào Cần Vương theo ý thức hệ phong kiến đã lỗi thời; khởi nghĩa Yên Thế mang tính tự phát của nông dân; phong trào Đông Du, Duy tân tuy mới nhưng còn ảo tưởng (dựa vào Nhật hoặc dựa vào Pháp). Vì vậy tất cả đều thất bại.' },
    ]
  ),

  'S8LSDL-w19-quiz': L(
    'ĐL — Vị trí địa lí và phạm vi lãnh thổ Việt Nam',
    'Bước vào phần Địa lí, các em tìm hiểu vị trí địa lí và phạm vi lãnh thổ — "tấm căn cước" của đất nước, quy định nhiều đặc điểm tự nhiên và kinh tế Việt Nam.',
    [
      'Trình bày được đặc điểm vị trí địa lí của Việt Nam.',
      'Xác định được phạm vi lãnh thổ (vùng đất, vùng biển, vùng trời).',
      'Phân tích được ảnh hưởng của vị trí địa lí đối với tự nhiên, kinh tế.',
    ],
    [
      { h: 'Vị trí địa lí' },
      { ul: [
        'Việt Nam nằm ở rìa phía Đông của bán đảo Đông Dương, gần trung tâm khu vực Đông Nam Á.',
        'Vừa gắn với lục địa Á – Âu, vừa tiếp giáp Biển Đông (thông ra Thái Bình Dương).',
        'Nằm trong khu vực nội chí tuyến bán cầu Bắc, trong vùng hoạt động của gió mùa châu Á.',
      ] },
      { h: 'Hệ toạ độ địa lí' },
      { ul: [
        'Điểm cực Bắc: ~23°23′B (Lũng Cú, Hà Giang).',
        'Điểm cực Nam: ~8°34′B (Đất Mũi, Cà Mau).',
        'Điểm cực Tây: ~102°09′Đ (Sín Thầu, Điện Biên).',
        'Điểm cực Đông: ~109°28′Đ (Vạn Thạnh, Khánh Hoà).',
      ] },
      { h: 'Phạm vi lãnh thổ — vùng đất' },
      { ul: [
        'Tổng diện tích đất liền khoảng 331 212 km².',
        'Đường biên giới trên đất liền dài hơn 4600 km, tiếp giáp ba nước: Trung Quốc, Lào, Cam-pu-chia.',
        'Có hơn 4000 hòn đảo lớn nhỏ, hai quần đảo xa bờ là Hoàng Sa và Trường Sa.',
      ] },
      { h: 'Phạm vi lãnh thổ — vùng biển' },
      { ul: [
        'Vùng biển rộng khoảng 1 triệu km², gấp khoảng 3 lần diện tích đất liền.',
        'Đường bờ biển dài 3260 km, từ Móng Cái (Quảng Ninh) đến Hà Tiên (Kiên Giang).',
        'Vùng biển gồm: nội thuỷ, lãnh hải, vùng tiếp giáp lãnh hải, vùng đặc quyền kinh tế và thềm lục địa.',
      ] },
      { h: 'Phạm vi lãnh thổ — vùng trời' },
      { p: 'Vùng trời là khoảng không gian bao trùm lên lãnh thổ nước ta; trên đất liền được xác định bằng đường biên giới, trên biển là ranh giới bên ngoài của lãnh hải và không gian trên các đảo.' },
      { h: 'Ý nghĩa tự nhiên của vị trí địa lí' },
      { ul: [
        'Quy định thiên nhiên nước ta mang tính chất nhiệt đới ẩm gió mùa.',
        'Tạo nên sự đa dạng sinh học (vị trí giao thoa của nhiều luồng sinh vật).',
        'Tài nguyên khoáng sản, sinh vật biển phong phú; nhưng cũng nhiều thiên tai (bão, lũ).',
      ] },
      { h: 'Ý nghĩa kinh tế, xã hội, quốc phòng' },
      { ul: [
        'Nằm trên ngã tư đường hàng hải và hàng không quốc tế — thuận lợi giao lưu, hội nhập.',
        'Cửa ngõ ra biển của các nước trong khu vực; phát triển kinh tế biển.',
        'Vị trí có ý nghĩa chiến lược về quốc phòng — an ninh, đặc biệt là chủ quyền biển đảo.',
      ] },
      { note: 'Vị trí "vừa gắn lục địa, vừa kề biển lớn, lại trong vùng gió mùa" là chìa khoá để giải thích hầu hết các đặc điểm tự nhiên Việt Nam mà các em sẽ học trong những tuần tới.' },
    ],
    [
      { q: 'Vì sao nói vị trí địa lí quy định thiên nhiên Việt Nam mang tính chất nhiệt đới ẩm gió mùa?', a: 'Vì Việt Nam nằm hoàn toàn trong vùng nội chí tuyến bán cầu Bắc (nhận lượng nhiệt lớn → tính nhiệt đới); lại tiếp giáp Biển Đông rộng lớn (cung cấp độ ẩm dồi dào → tính ẩm); và nằm trong khu vực hoạt động của gió mùa châu Á (sinh ra hai mùa gió → tính gió mùa). Ba yếu tố đó tạo nên thiên nhiên nhiệt đới ẩm gió mùa.' },
      { q: 'Vùng biển nước ta rộng khoảng bao nhiêu và gồm những bộ phận nào?', a: 'Vùng biển nước ta rộng khoảng 1 triệu km² (gấp khoảng 3 lần diện tích đất liền). Theo Công ước Luật Biển, vùng biển gồm các bộ phận: nội thuỷ, lãnh hải, vùng tiếp giáp lãnh hải, vùng đặc quyền kinh tế và thềm lục địa.' },
      { q: 'Phân tích ý nghĩa kinh tế của vị trí địa lí Việt Nam.', a: 'Việt Nam nằm trên ngã tư đường giao thông hàng hải, hàng không quốc tế, là cửa ngõ ra biển của nhiều nước trong khu vực, nên rất thuận lợi để giao lưu, buôn bán, hội nhập kinh tế. Vùng biển rộng giàu tài nguyên (hải sản, dầu khí, du lịch) tạo điều kiện phát triển mạnh kinh tế biển.' },
    ]
  ),

  'S8LSDL-w20-quiz': L(
    'ĐL — Đặc điểm chung của địa hình Việt Nam',
    'Địa hình là "khung xương" của tự nhiên. Bài học giúp các em hiểu những đặc điểm chung của địa hình nước ta và ý nghĩa của chúng.',
    [
      'Trình bày được đặc điểm chung của địa hình Việt Nam.',
      'Giải thích được vì sao đồi núi chiếm phần lớn diện tích.',
      'Nêu được hướng nghiêng và hai hướng núi chính.',
    ],
    [
      { h: 'Đồi núi chiếm phần lớn diện tích' },
      { ul: [
        'Đồi núi chiếm khoảng 3/4 diện tích đất liền, đồng bằng chỉ chiếm khoảng 1/4.',
        'Chủ yếu là đồi núi thấp: địa hình dưới 1000 m chiếm phần lớn diện tích.',
        'Núi cao trên 2000 m chỉ chiếm tỉ lệ rất nhỏ.',
      ] },
      { h: 'Địa hình phân bậc rõ rệt' },
      { p: 'Địa hình nước ta được nâng lên qua nhiều giai đoạn, tạo nên các bậc địa hình kế tiếp nhau: núi cao, núi trung bình, núi thấp, đồi, đồng bằng và thềm lục địa — thấp dần ra biển.' },
      { h: 'Hướng nghiêng chung của địa hình' },
      { p: 'Địa hình nước ta có hướng nghiêng chung là tây bắc – đông nam, thấp dần từ nội địa ra biển. Điều này được thể hiện qua hướng chảy của phần lớn sông ngòi.' },
      { h: 'Hai hướng núi chính' },
      { ul: [
        'Hướng tây bắc – đông nam: dãy Hoàng Liên Sơn, các dãy núi ở Bắc Trung Bộ (Trường Sơn Bắc).',
        'Hướng vòng cung: các cánh cung ở vùng Đông Bắc (Sông Gâm, Ngân Sơn, Bắc Sơn, Đông Triều) và vùng Trường Sơn Nam.',
      ] },
      { h: 'Địa hình mang tính chất nhiệt đới ẩm gió mùa' },
      { ul: [
        'Quá trình phong hoá diễn ra mạnh, lớp vỏ phong hoá dày.',
        'Mưa lớn gây xói mòn, cắt xẻ địa hình, tạo nhiều thung lũng sông.',
        'Vùng núi đá vôi hình thành địa hình các-xtơ độc đáo (hang động, như Phong Nha – Kẻ Bàng).',
      ] },
      { h: 'Địa hình chịu tác động của con người' },
      { p: 'Con người tạo nên nhiều dạng địa hình nhân tạo: đê điều, hồ chứa nước, kênh mương, ruộng bậc thang, đường sá. Hoạt động khai thác (phá rừng, khai mỏ) cũng làm biến đổi địa hình tự nhiên.' },
      { h: 'Ý nghĩa của địa hình đồi núi' },
      { ul: [
        'Thuận lợi: phát triển lâm nghiệp, thuỷ điện, khai khoáng, du lịch, cây công nghiệp.',
        'Khó khăn: giao thông trắc trở, đất dễ bị xói mòn, thiên tai (lũ quét, sạt lở).',
      ] },
      { note: 'Đỉnh Phan-xi-păng (3147 m, dãy Hoàng Liên Sơn) là đỉnh núi cao nhất nước ta, được mệnh danh là "nóc nhà của Đông Dương".' },
    ],
    [
      { q: 'Vì sao địa hình nước ta chủ yếu là đồi núi thấp?', a: 'Vì địa hình nước ta tuy được vận động Tân kiến tạo nâng lên nhưng cường độ nâng không đều và không quá mạnh, lại trải qua quá trình ngoại lực (phong hoá, xâm thực) bào mòn lâu dài trong điều kiện nhiệt đới ẩm. Do đó, phần lớn diện tích là đồi núi thấp (dưới 1000 m), núi cao trên 2000 m chỉ chiếm tỉ lệ rất nhỏ.' },
      { q: 'Hướng nghiêng chung tây bắc – đông nam của địa hình được thể hiện như thế nào?', a: 'Hướng nghiêng tây bắc – đông nam được thể hiện rõ qua việc địa hình thấp dần từ vùng núi tây bắc xuống đồng bằng và ra biển ở phía đông nam, và qua hướng chảy của phần lớn các con sông lớn (sông Hồng, sông Đà, sông Mã…) đều theo hướng tây bắc – đông nam rồi đổ ra Biển Đông.' },
      { q: 'Địa hình đồi núi đem lại những thuận lợi và khó khăn gì?', a: 'Thuận lợi: đồi núi giàu tài nguyên rừng, khoáng sản, có tiềm năng thuỷ điện lớn, đất badan và đất feralit thích hợp trồng cây công nghiệp, có cảnh quan đẹp để phát triển du lịch. Khó khăn: giao thông đi lại trắc trở, đất dễ bị xói mòn, rửa trôi, và thường xảy ra thiên tai như lũ quét, sạt lở đất.' },
    ]
  ),

  'S8LSDL-w21-quiz': L(
    'ĐL — Các khu vực địa hình: vùng núi',
    'Địa hình đồi núi nước ta được chia thành nhiều khu vực với những đặc điểm riêng. Bài học giúp các em nhận diện bốn vùng núi lớn.',
    [
      'Phân biệt được bốn vùng núi: Đông Bắc, Tây Bắc, Trường Sơn Bắc, Trường Sơn Nam.',
      'Nêu được đặc điểm địa hình tiêu biểu của từng vùng.',
      'Xác định được các dãy núi, cao nguyên chính trên bản đồ.',
    ],
    [
      { h: 'Vùng núi Đông Bắc' },
      { ul: [
        'Nằm ở tả ngạn sông Hồng, là vùng đồi núi thấp.',
        'Nổi bật với bốn cánh cung lớn mở rộng về phía bắc và đông: Sông Gâm, Ngân Sơn, Bắc Sơn, Đông Triều.',
        'Có nhiều địa hình các-xtơ (đá vôi) đẹp như cao nguyên đá Đồng Văn, vịnh Hạ Long.',
      ] },
      { h: 'Vùng núi Tây Bắc' },
      { ul: [
        'Nằm giữa sông Hồng và sông Cả, là vùng núi cao và đồ sộ nhất nước ta.',
        'Có dãy Hoàng Liên Sơn với đỉnh Phan-xi-păng (3147 m) — cao nhất Việt Nam.',
        'Hướng núi chủ yếu là tây bắc – đông nam; xen kẽ là các cao nguyên đá vôi và thung lũng sông.',
      ] },
      { h: 'Vùng núi Trường Sơn Bắc' },
      { ul: [
        'Từ phía nam sông Cả tới dãy Bạch Mã.',
        'Là vùng núi thấp, hẹp ngang, có hai sườn không đối xứng.',
        'Có nhiều nhánh núi đâm ngang ra biển (dãy Hoành Sơn, dãy Bạch Mã) tạo ranh giới tự nhiên.',
      ] },
      { h: 'Vùng núi Trường Sơn Nam' },
      { ul: [
        'Gồm các khối núi và cao nguyên ở phía nam dãy Bạch Mã.',
        'Nổi bật là các cao nguyên badan xếp tầng (Kon Tum, Plây Ku, Đắk Lắk, Lâm Viên, Di Linh).',
        'Có sự bất đối xứng giữa hai sườn đông và tây.',
      ] },
      { h: 'Địa hình bán bình nguyên và đồi trung du' },
      { p: 'Nằm chuyển tiếp giữa miền núi và đồng bằng là dải bán bình nguyên (Đông Nam Bộ) và vùng đồi trung du (rìa phía bắc và phía tây đồng bằng sông Hồng) — phần lớn là các đồi thấp dạng bát úp.' },
      { h: 'Giá trị của địa hình vùng núi' },
      { ul: [
        'Cao nguyên badan ở Tây Nguyên thuận lợi trồng cây công nghiệp (cà phê, cao su, hồ tiêu).',
        'Vùng núi đá vôi có nhiều hang động đẹp, phát triển du lịch.',
        'Giàu khoáng sản và tiềm năng thuỷ điện.',
      ] },
      { note: 'Nhớ phân biệt: Tây Bắc là vùng núi cao nhất, đồ sộ nhất; Đông Bắc nổi bật các cánh cung; Trường Sơn Nam đặc trưng bởi các cao nguyên badan xếp tầng.' },
    ],
    [
      { q: 'So sánh đặc điểm địa hình vùng núi Đông Bắc và Tây Bắc.', a: 'Vùng núi Đông Bắc (tả ngạn sông Hồng) chủ yếu là đồi núi thấp, nổi bật với bốn cánh cung lớn (Sông Gâm, Ngân Sơn, Bắc Sơn, Đông Triều) và nhiều địa hình đá vôi. Vùng núi Tây Bắc (giữa sông Hồng và sông Cả) cao và đồ sộ nhất nước ta, hướng tây bắc – đông nam, có dãy Hoàng Liên Sơn với đỉnh Phan-xi-păng cao nhất Việt Nam.' },
      { q: 'Vì sao các cao nguyên badan ở Trường Sơn Nam (Tây Nguyên) thuận lợi cho cây công nghiệp?', a: 'Vì các cao nguyên badan ở Tây Nguyên có bề mặt tương đối bằng phẳng, rộng lớn, lớp đất đỏ badan dày, màu mỡ, tơi xốp và thoát nước tốt. Kết hợp với khí hậu cận xích đạo phân hoá theo mùa, vùng này rất thích hợp để trồng các cây công nghiệp lâu năm như cà phê, cao su, hồ tiêu, chè.' },
      { q: 'Dãy Bạch Mã có vai trò gì về mặt địa hình và khí hậu?', a: 'Dãy Bạch Mã là một nhánh núi đâm ngang ra biển, làm ranh giới tự nhiên giữa vùng núi Trường Sơn Bắc và Trường Sơn Nam. Về khí hậu, dãy Bạch Mã còn là ranh giới chắn gió, góp phần phân chia khí hậu giữa miền Bắc (có mùa đông lạnh) và miền Nam (nóng quanh năm).' },
    ]
  ),

  'S8LSDL-w22-quiz': L(
    'ĐL — Các khu vực địa hình: vùng đồng bằng, bờ biển và thềm lục địa',
    'Tuy chỉ chiếm 1/4 diện tích, đồng bằng lại là nơi tập trung dân cư và sản xuất lương thực chính. Bài học tìm hiểu các đồng bằng, bờ biển và thềm lục địa nước ta.',
    [
      'Phân biệt được đồng bằng châu thổ và đồng bằng ven biển.',
      'Nêu được đặc điểm của đồng bằng sông Hồng và sông Cửu Long.',
      'Trình bày được đặc điểm bờ biển và thềm lục địa.',
    ],
    [
      { h: 'Hai loại đồng bằng' },
      { ul: [
        'Đồng bằng châu thổ: do phù sa sông lớn bồi đắp (đồng bằng sông Hồng, đồng bằng sông Cửu Long).',
        'Đồng bằng ven biển miền Trung: nhỏ hẹp, kém màu mỡ do chủ yếu là phù sa biển.',
      ] },
      { h: 'Đồng bằng sông Hồng' },
      { ul: [
        'Diện tích khoảng 15 000 km², do phù sa sông Hồng và sông Thái Bình bồi đắp.',
        'Có hệ thống đê ngăn lũ → bề mặt bị chia cắt thành các ô trũng; vùng trong đê không còn được bồi phù sa thường xuyên.',
        'Là cái nôi của nền văn minh lúa nước, dân cư đông đúc.',
      ] },
      { h: 'Đồng bằng sông Cửu Long' },
      { ul: [
        'Diện tích khoảng 40 000 km² — đồng bằng lớn nhất nước ta, do phù sa sông Mê Công bồi đắp.',
        'Địa hình thấp, bằng phẳng, không có đê lớn → hằng năm bị ngập lũ trên diện rộng và được bồi phù sa.',
        'Có nhiều vùng trũng lớn (Đồng Tháp Mười, Tứ giác Long Xuyên); là vựa lúa lớn nhất cả nước.',
      ] },
      { h: 'Đồng bằng ven biển miền Trung' },
      { ul: [
        'Tổng diện tích khoảng 15 000 km², bị chia cắt thành nhiều đồng bằng nhỏ bởi các dãy núi đâm ngang.',
        'Đất kém màu mỡ, nhiều cồn cát, đầm phá ven biển.',
        'Đồng bằng Thanh Hoá, Nghệ An, Quảng Nam, Phú Yên là những đồng bằng tương đối lớn.',
      ] },
      { h: 'Địa hình bờ biển' },
      { ul: [
        'Đường bờ biển dài 3260 km, có hai dạng chính: bờ biển bồi tụ (đồng bằng) và bờ biển mài mòn (chân núi, hải đảo).',
        'Nhiều vũng, vịnh kín thuận lợi xây dựng cảng (vịnh Vân Phong, vịnh Cam Ranh, vịnh Hạ Long).',
        'Nhiều bãi biển đẹp phục vụ du lịch.',
      ] },
      { h: 'Thềm lục địa' },
      { p: 'Thềm lục địa nước ta mở rộng ở vùng biển Bắc Bộ và Nam Bộ, thu hẹp ở miền Trung. Thềm lục địa nông và giàu tài nguyên, đặc biệt là dầu mỏ, khí đốt ở vùng biển phía Nam.' },
      { h: 'Giá trị kinh tế của đồng bằng và bờ biển' },
      { ul: [
        'Đồng bằng là vùng trọng điểm lương thực, thực phẩm, tập trung dân cư và đô thị.',
        'Bờ biển, vùng biển phát triển giao thông, đánh bắt – nuôi trồng thuỷ sản, du lịch, khai thác dầu khí.',
      ] },
      { note: 'Khác biệt cốt lõi: đồng bằng sông Hồng có đê nên không còn được bồi phù sa tự nhiên trong đê; đồng bằng sông Cửu Long không có đê lớn nên vẫn được lũ bồi đắp phù sa hằng năm.' },
    ],
    [
      { q: 'So sánh đồng bằng sông Hồng và đồng bằng sông Cửu Long.', a: 'Đồng bằng sông Hồng (~15 000 km²) do phù sa sông Hồng và sông Thái Bình bồi đắp, có hệ thống đê ngăn lũ nên bề mặt bị chia cắt, vùng trong đê không còn được bồi phù sa. Đồng bằng sông Cửu Long (~40 000 km²) lớn nhất nước, do phù sa sông Mê Công bồi đắp, địa hình thấp, không có đê lớn nên hằng năm bị ngập lũ và được bồi phù sa, có nhiều vùng trũng rộng.' },
      { q: 'Vì sao đồng bằng ven biển miền Trung nhỏ hẹp và kém màu mỡ?', a: 'Vì miền Trung có các dãy núi của Trường Sơn đâm ngang ra sát biển, chia cắt đồng bằng thành nhiều đồng bằng nhỏ. Đồng bằng ở đây chủ yếu do phù sa biển bồi đắp, lại có nhiều cồn cát, đầm phá, nên đất kém màu mỡ hơn so với hai đồng bằng châu thổ lớn.' },
      { q: 'Thềm lục địa nước ta có giá trị gì về kinh tế?', a: 'Thềm lục địa nước ta nông, mở rộng ở Bắc Bộ và Nam Bộ, giàu tài nguyên: là ngư trường lớn để khai thác – nuôi trồng thuỷ sản; đặc biệt vùng thềm lục địa phía Nam có trữ lượng lớn dầu mỏ và khí đốt, mang lại nguồn lợi kinh tế quan trọng cho đất nước.' },
    ]
  ),

  'S8LSDL-w23-quiz': L(
    'ĐL — Khí hậu Việt Nam: tính chất nhiệt đới ẩm gió mùa',
    'Khí hậu nước ta mang tính chất nhiệt đới ẩm gió mùa và phân hoá đa dạng. Hiểu khí hậu là chìa khoá để hiểu sông ngòi, đất, sinh vật và sản xuất nông nghiệp.',
    [
      'Trình bày được tính chất nhiệt đới ẩm gió mùa của khí hậu Việt Nam.',
      'Nêu được đặc điểm hai mùa gió.',
      'Phân tích sự phân hoá đa dạng của khí hậu.',
    ],
    [
      { h: 'Tính chất nhiệt đới' },
      { ul: [
        'Nhận lượng bức xạ Mặt Trời lớn, số giờ nắng cao.',
        'Nhiệt độ trung bình năm trên 21°C (tăng dần từ Bắc vào Nam).',
        'Tổng nhiệt độ hoạt động lớn, đáp ứng nhu cầu của cây trồng nhiệt đới.',
      ] },
      { h: 'Tính chất ẩm' },
      { ul: [
        'Lượng mưa trung bình năm lớn: 1500 – 2000 mm; nhiều nơi trên 2500 mm.',
        'Độ ẩm không khí cao, thường trên 80%.',
        'Cân bằng ẩm luôn dương (mưa nhiều hơn bốc hơi).',
      ] },
      { h: 'Tính chất gió mùa' },
      { p: 'Nằm trong khu vực hoạt động của gió mùa châu Á, khí hậu nước ta có hai mùa gió rõ rệt với tính chất trái ngược nhau: gió mùa mùa đông và gió mùa mùa hạ.' },
      { h: 'Gió mùa mùa đông (tháng 11 – tháng 4)' },
      { ul: [
        'Hướng đông bắc, xuất phát từ áp cao Xi-bia.',
        'Nửa đầu mùa đông: lạnh khô; nửa cuối mùa đông: lạnh ẩm, có mưa phùn ở miền Bắc.',
        'Càng vào Nam, gió mùa Đông Bắc càng suy yếu; từ dãy Bạch Mã trở vào hầu như không còn ảnh hưởng.',
      ] },
      { h: 'Gió mùa mùa hạ (tháng 5 – tháng 10)' },
      { ul: [
        'Hướng tây nam, nóng ẩm, gây mưa lớn cho cả nước.',
        'Đầu mùa hạ, khối khí từ Bắc Ấn Độ Dương gây hiện tượng phơn (gió Tây khô nóng) ở Bắc Trung Bộ và Tây Bắc.',
        'Giữa và cuối mùa hạ, gió mùa Tây Nam kết hợp dải hội tụ nhiệt đới gây mưa lớn và bão.',
      ] },
      { h: 'Sự phân hoá đa dạng của khí hậu' },
      { ul: [
        'Phân hoá theo bắc – nam: miền Bắc có mùa đông lạnh; miền Nam nóng quanh năm, chỉ có mùa mưa và mùa khô.',
        'Phân hoá theo đông – tây: sườn đón gió mưa nhiều, sườn khuất gió khô nóng (hiệu ứng phơn).',
        'Phân hoá theo độ cao: lên cao nhiệt độ giảm, hình thành các đai khí hậu (Sa Pa, Đà Lạt mát mẻ).',
      ] },
      { h: 'Thiên tai do khí hậu' },
      { p: 'Khí hậu nước ta cũng gây nhiều thiên tai: bão, lũ lụt, hạn hán, rét đậm rét hại, sương muối… ảnh hưởng đến sản xuất và đời sống.' },
      { note: 'Tính chất nhiệt đới ẩm gió mùa vừa là điều kiện thuận lợi (trồng nhiều vụ, đa dạng cây con) vừa gây khó khăn (sâu bệnh, thiên tai) cho sản xuất nông nghiệp Việt Nam.' },
    ],
    [
      { q: 'Vì sao miền Bắc nước ta có mùa đông lạnh còn miền Nam thì không?', a: 'Vì gió mùa Đông Bắc (lạnh) xuất phát từ áp cao Xi-bia thổi vào nước ta theo hướng đông bắc, nhưng càng đi xuống phía Nam càng bị biến tính và suy yếu. Đến dãy Bạch Mã, gió mùa Đông Bắc gần như bị chặn lại, nên từ đó trở vào (miền Nam) hầu như không chịu ảnh hưởng, khí hậu nóng quanh năm với hai mùa mưa và khô.' },
      { q: 'Hiện tượng gió phơn (gió Tây khô nóng) ở Bắc Trung Bộ hình thành như thế nào?', a: 'Đầu mùa hạ, khối khí nóng ẩm từ Bắc Ấn Độ Dương thổi tới, khi gặp dãy Trường Sơn bị chặn lại, gây mưa ở sườn đón gió (phía Tây). Khi vượt qua núi xuống sườn khuất gió (phía Đông – Bắc Trung Bộ), khối khí trở nên khô và nóng, tạo nên gió phơn Tây Nam (gió Lào) khô nóng đặc trưng của vùng này.' },
      { q: 'Nêu các biểu hiện của sự phân hoá khí hậu Việt Nam.', a: 'Khí hậu nước ta phân hoá theo ba chiều: theo bắc – nam (miền Bắc có mùa đông lạnh, miền Nam nóng quanh năm), theo đông – tây (sườn đón gió mưa nhiều, sườn khuất gió khô nóng), và theo độ cao (càng lên cao càng mát, hình thành các đai cao như Sa Pa, Đà Lạt). Sự phân hoá này tạo nên thiên nhiên đa dạng.' },
    ]
  ),

  'S8LSDL-w24-quiz': L(
    'ĐL — Thuỷ văn Việt Nam: sông ngòi và hồ, đầm',
    'Mạng lưới sông ngòi dày đặc với chế độ nước theo mùa là một đặc điểm nổi bật của tự nhiên Việt Nam, có vai trò quan trọng với đời sống và sản xuất.',
    [
      'Trình bày được đặc điểm chung của sông ngòi Việt Nam.',
      'Nêu được đặc điểm của các hệ thống sông lớn.',
      'Phân tích vai trò của sông ngòi, hồ đầm và vấn đề bảo vệ nguồn nước.',
    ],
    [
      { h: 'Mạng lưới sông ngòi dày đặc' },
      { ul: [
        'Nước ta có hơn 2360 con sông dài trên 10 km.',
        'Phần lớn là sông nhỏ, ngắn và dốc (do lãnh thổ hẹp ngang, nhiều đồi núi).',
        'Dọc bờ biển cứ khoảng 20 km lại có một cửa sông.',
      ] },
      { h: 'Hướng chảy của sông ngòi' },
      { ul: [
        'Hai hướng chính: tây bắc – đông nam (sông Hồng, sông Đà, sông Mã, sông Cả…) và vòng cung (các sông vùng Đông Bắc).',
        'Hướng chảy phù hợp với hướng nghiêng và hướng núi của địa hình.',
      ] },
      { h: 'Chế độ nước theo mùa' },
      { ul: [
        'Sông ngòi có hai mùa nước: mùa lũ và mùa cạn, tương ứng mùa mưa và mùa khô.',
        'Mùa lũ chiếm 70 – 80% lượng nước cả năm.',
        'Mùa lũ ở các sông không trùng nhau hoàn toàn do mùa mưa lệch nhau theo vùng.',
      ] },
      { h: 'Hàm lượng phù sa lớn' },
      { p: 'Do mưa lớn tập trung và quá trình xói mòn ở vùng đồi núi mạnh, sông ngòi nước ta vận chuyển một lượng phù sa lớn, bồi đắp nên các đồng bằng châu thổ màu mỡ.' },
      { h: 'Các hệ thống sông lớn' },
      { ul: [
        'Hệ thống sông Hồng: lớn nhất miền Bắc, lượng phù sa rất lớn (nước đỏ phù sa).',
        'Hệ thống sông Thái Bình, sông Mã, sông Cả ở Bắc Bộ và Bắc Trung Bộ.',
        'Hệ thống sông Mê Công (Cửu Long): lớn nhất nước ta, đổ ra biển qua nhiều cửa.',
        'Hệ thống sông Đồng Nai ở Đông Nam Bộ.',
      ] },
      { h: 'Hồ, đầm' },
      { ul: [
        'Hồ tự nhiên: hồ Ba Bể, hồ Tây, hồ Lắk; các đầm phá ven biển miền Trung (phá Tam Giang).',
        'Hồ nhân tạo: hồ Hoà Bình, hồ Thác Bà, hồ Dầu Tiếng — phục vụ thuỷ điện, thuỷ lợi.',
      ] },
      { h: 'Vai trò và vấn đề bảo vệ nguồn nước' },
      { ul: [
        'Vai trò: cung cấp nước tưới tiêu, sinh hoạt; giao thông thuỷ; thuỷ điện; thuỷ sản; du lịch; bồi đắp phù sa.',
        'Vấn đề: ô nhiễm nguồn nước, lũ lụt, sạt lở bờ sông → cần trồng rừng đầu nguồn, xử lí nước thải, sử dụng hợp lí.',
      ] },
      { note: 'Sông Mê Công đổ ra biển qua chín cửa nên đoạn chảy trong nước ta được gọi là sông Cửu Long ("chín con rồng").' },
    ],
    [
      { q: 'Vì sao sông ngòi nước ta có chế độ nước theo mùa?', a: 'Vì nguồn cung cấp nước chủ yếu cho sông ngòi là nước mưa, mà khí hậu nước ta có hai mùa: mùa mưa và mùa khô. Vào mùa mưa, lượng nước đổ về sông lớn tạo nên mùa lũ (chiếm 70–80% lượng nước cả năm); vào mùa khô, nước sông cạn dần tạo nên mùa cạn. Do đó sông ngòi có chế độ nước theo mùa rõ rệt.' },
      { q: 'Vì sao sông ngòi nước ta có hàm lượng phù sa lớn?', a: 'Vì nước ta có địa hình chủ yếu là đồi núi với độ dốc lớn, lại có mưa nhiều và tập trung theo mùa, khiến quá trình xói mòn, rửa trôi đất ở vùng đồi núi diễn ra mạnh. Lượng đất bị bào mòn được sông ngòi cuốn theo dòng nước, tạo nên hàm lượng phù sa lớn, bồi đắp cho các đồng bằng.' },
      { q: 'Nêu vai trò của sông ngòi đối với đời sống và sản xuất.', a: 'Sông ngòi có vai trò rất lớn: cung cấp nước cho sản xuất nông nghiệp, công nghiệp và sinh hoạt; bồi đắp phù sa tạo nên các đồng bằng màu mỡ; cung cấp thuỷ sản; là đường giao thông thuỷ; là nguồn thuỷ năng để xây dựng các nhà máy thuỷ điện (Hoà Bình, Sơn La…); và có giá trị du lịch.' },
    ]
  ),

  'S8LSDL-w25-quiz': L(
    'ĐL — Thổ nhưỡng và sinh vật Việt Nam',
    'Đất (thổ nhưỡng) và sinh vật là hai thành phần quan trọng của tự nhiên, phản ánh rõ tính chất nhiệt đới ẩm gió mùa và sự đa dạng của thiên nhiên nước ta.',
    [
      'Trình bày được đặc điểm và phân bố ba nhóm đất chính.',
      'Nêu được tính chất nhiệt đới ẩm gió mùa và sự đa dạng của sinh vật.',
      'Phân tích vấn đề sử dụng và bảo vệ tài nguyên đất, sinh vật.',
    ],
    [
      { h: 'Đặc điểm chung của thổ nhưỡng' },
      { p: 'Thổ nhưỡng (đất) nước ta đa dạng, thể hiện rõ tính chất nhiệt đới ẩm gió mùa: quá trình hình thành đất feralit diễn ra mạnh ở vùng đồi núi, quá trình bồi tụ phù sa diễn ra mạnh ở đồng bằng.' },
      { h: 'Nhóm đất feralit (đồi núi)' },
      { ul: [
        'Chiếm khoảng 65% diện tích đất tự nhiên, phân bố ở vùng đồi núi thấp.',
        'Đất có màu đỏ vàng do tích tụ ô-xít sắt, nhôm; thường chua, nghèo mùn.',
        'Đất feralit hình thành trên đá badan và đá vôi rất màu mỡ → thích hợp cây công nghiệp (cà phê, cao su, chè, hồ tiêu).',
      ] },
      { h: 'Nhóm đất phù sa (đồng bằng)' },
      { ul: [
        'Chiếm khoảng 24% diện tích, phân bố ở các đồng bằng.',
        'Đất tơi xốp, ít chua, giàu dinh dưỡng, độ phì cao.',
        'Thích hợp trồng lúa, hoa màu, cây ăn quả — là vùng trọng điểm lương thực.',
      ] },
      { h: 'Nhóm đất mùn núi cao' },
      { p: 'Phân bố ở vùng núi cao (trên 1600 – 1700 m), hình thành trong điều kiện khí hậu lạnh, ẩm; thích hợp phát triển rừng đầu nguồn, bảo vệ nguồn nước.' },
      { h: 'Tính chất nhiệt đới ẩm gió mùa của sinh vật' },
      { ul: [
        'Hệ sinh thái rừng nhiệt đới gió mùa phát triển trên đất feralit là kiểu thảm thực vật tiêu biểu.',
        'Sinh vật phát triển quanh năm, nhiều tầng tán, đa dạng loài.',
      ] },
      { h: 'Sự đa dạng sinh học' },
      { ul: [
        'Nước ta có khoảng hơn 50 000 loài sinh vật, nhiều loài quý hiếm, đặc hữu (sao la, voọc mũi hếch).',
        'Đa dạng về thành phần loài, nguồn gen và hệ sinh thái (rừng, biển, đất ngập nước…).',
        'Là một trong những trung tâm đa dạng sinh học của thế giới.',
      ] },
      { h: 'Vấn đề sử dụng và bảo vệ' },
      { ul: [
        'Đất bị suy thoái do xói mòn, rửa trôi, nhiễm mặn, nhiễm phèn → cần canh tác hợp lí, bón phân, trồng rừng.',
        'Đa dạng sinh học suy giảm do phá rừng, săn bắt → cần lập các vườn quốc gia, khu bảo tồn, thực thi pháp luật.',
      ] },
      { note: 'Đất badan ở Tây Nguyên và đất phù sa ở hai đồng bằng lớn là hai loại đất "vàng" của nông nghiệp Việt Nam — một cho cây công nghiệp, một cho cây lương thực.' },
    ],
    [
      { q: 'Vì sao đất feralit lại thích hợp trồng cây công nghiệp lâu năm?', a: 'Đất feralit (đặc biệt là đất feralit trên đá badan ở Tây Nguyên, Đông Nam Bộ) có tầng đất dày, tơi xốp, thoát nước tốt, lại phân bố trên các vùng đồi núi và cao nguyên rộng lớn, bằng phẳng. Nhờ đó, đất feralit rất thích hợp để lập đồn điền, trồng các cây công nghiệp lâu năm như cà phê, cao su, hồ tiêu, chè.' },
      { q: 'So sánh đất feralit và đất phù sa về đặc điểm và giá trị sử dụng.', a: 'Đất feralit phân bố ở vùng đồi núi, màu đỏ vàng, thường chua, nghèo mùn, thích hợp trồng cây công nghiệp và cây ăn quả. Đất phù sa phân bố ở đồng bằng, do sông bồi đắp, tơi xốp, giàu dinh dưỡng, ít chua, độ phì cao, thích hợp trồng lúa và hoa màu. Đất feralit chiếm diện tích lớn hơn (~65%), đất phù sa nhỏ hơn (~24%) nhưng có giá trị lương thực cao.' },
      { q: 'Cần làm gì để bảo vệ tài nguyên đất và đa dạng sinh học?', a: 'Để bảo vệ đất: canh tác hợp lí, làm ruộng bậc thang, trồng rừng phủ xanh đồi trọc, bón phân cải tạo, chống xói mòn và nhiễm mặn, nhiễm phèn. Để bảo vệ đa dạng sinh học: thành lập và quản lí tốt các vườn quốc gia, khu bảo tồn thiên nhiên; cấm phá rừng, săn bắt động vật hoang dã; thực thi nghiêm pháp luật và nâng cao ý thức cộng đồng.' },
    ]
  ),

  'S8LSDL-w26-quiz': L(
    'ĐL — Biển Đông và vùng biển đảo Việt Nam',
    'Biển Đông và vùng biển đảo là một bộ phận quan trọng của lãnh thổ, giàu tài nguyên và có ý nghĩa chiến lược to lớn về kinh tế, quốc phòng của nước ta.',
    [
      'Trình bày được đặc điểm tự nhiên của vùng biển đảo Việt Nam.',
      'Nêu được các nguồn tài nguyên và giá trị của Biển Đông.',
      'Hiểu được vấn đề bảo vệ chủ quyền và môi trường biển đảo.',
    ],
    [
      { h: 'Khái quát về Biển Đông' },
      { ul: [
        'Biển Đông là biển lớn, tương đối kín, nằm trong vùng nhiệt đới gió mùa Đông Nam Á.',
        'Vùng biển Việt Nam là một phần của Biển Đông, rộng khoảng 1 triệu km².',
        'Có hai quần đảo xa bờ quan trọng: quần đảo Hoàng Sa và quần đảo Trường Sa.',
      ] },
      { h: 'Đặc điểm khí hậu biển' },
      { ul: [
        'Mang tính chất nhiệt đới gió mùa hải dương.',
        'Nhiệt độ nước biển tầng mặt cao, trung bình trên 23°C.',
        'Chịu ảnh hưởng mạnh của gió mùa và bão.',
      ] },
      { h: 'Hải văn — dòng biển và thuỷ triều' },
      { ul: [
        'Dòng biển thay đổi theo mùa gió: mùa đông hướng đông bắc – tây nam, mùa hạ hướng ngược lại.',
        'Chế độ thuỷ triều đa dạng (nhật triều, bán nhật triều); vịnh Bắc Bộ có nhật triều điển hình.',
        'Độ muối trung bình khoảng 30 – 33‰.',
      ] },
      { h: 'Tài nguyên sinh vật biển' },
      { ul: [
        'Giàu hải sản: hàng nghìn loài cá, tôm, mực, các loài hải sản quý.',
        'Có các hệ sinh thái đặc sắc: rạn san hô, rừng ngập mặn, thảm cỏ biển.',
        'Là ngư trường lớn để đánh bắt và nuôi trồng thuỷ sản.',
      ] },
      { h: 'Tài nguyên khoáng sản và năng lượng' },
      { ul: [
        'Dầu mỏ, khí đốt với trữ lượng lớn ở vùng thềm lục địa phía Nam.',
        'Muối biển, ti-tan, cát thuỷ tinh dọc bờ biển.',
        'Tiềm năng năng lượng tái tạo (điện gió, điện thuỷ triều).',
      ] },
      { h: 'Giá trị kinh tế của biển đảo' },
      { ul: [
        'Phát triển giao thông vận tải biển, xây dựng cảng.',
        'Phát triển du lịch biển đảo (Hạ Long, Nha Trang, Phú Quốc).',
        'Khai thác khoáng sản, đánh bắt – nuôi trồng thuỷ sản, làm muối.',
      ] },
      { h: 'Bảo vệ chủ quyền và môi trường biển đảo' },
      { ul: [
        'Vùng biển đảo có vị trí chiến lược về quốc phòng — an ninh; bảo vệ chủ quyền là nhiệm vụ thiêng liêng.',
        'Cần khai thác đi đôi với bảo vệ môi trường biển, chống ô nhiễm, bảo tồn hệ sinh thái.',
        'Phát triển kinh tế biển gắn với giữ vững chủ quyền biển đảo của Tổ quốc.',
      ] },
      { note: 'Hoàng Sa và Trường Sa là hai quần đảo thiêng liêng thuộc chủ quyền của Việt Nam — bảo vệ chủ quyền biển đảo vừa có ý nghĩa kinh tế, vừa là trách nhiệm thiêng liêng của mỗi công dân.' },
    ],
    [
      { q: 'Vì sao Biển Đông có ý nghĩa chiến lược quan trọng đối với nước ta?', a: 'Vì Biển Đông giàu tài nguyên (hải sản, dầu khí, khoáng sản, du lịch), là cửa ngõ giao thương ra thế giới; vùng biển đảo có vị trí chiến lược về quốc phòng — an ninh, là tuyến phòng thủ phía đông của Tổ quốc. Phát triển kinh tế biển và bảo vệ chủ quyền biển đảo có ý nghĩa sống còn đối với sự phát triển và an ninh của đất nước.' },
      { q: 'Nêu các nguồn tài nguyên chính của vùng biển Việt Nam.', a: 'Vùng biển nước ta giàu tài nguyên: tài nguyên sinh vật (hàng nghìn loài cá, tôm, mực, hải sản quý, các hệ sinh thái san hô, rừng ngập mặn); tài nguyên khoáng sản và năng lượng (dầu mỏ, khí đốt ở thềm lục địa phía Nam, muối biển, cát, ti-tan); cùng tiềm năng lớn về du lịch và giao thông vận tải biển.' },
      { q: 'Theo em, vì sao phát triển kinh tế biển phải gắn với bảo vệ chủ quyền và môi trường biển?', a: 'Vì biển đảo vừa là không gian phát triển kinh tế, vừa là phần lãnh thổ thiêng liêng của Tổ quốc. Nếu chỉ khai thác mà không bảo vệ thì sẽ làm cạn kiệt tài nguyên, ô nhiễm môi trường, suy giảm hệ sinh thái; nếu không bảo vệ chủ quyền thì không thể yên ổn khai thác. Do đó phát triển kinh tế biển phải đi đôi với bảo vệ môi trường và giữ vững chủ quyền biển đảo.' },
    ]
  ),

  'S8LSDL-w27-quiz': L(
    'LS — Chiến tranh thế giới thứ nhất (1914–1918)',
    'Chiến tranh thế giới thứ nhất là cuộc chiến tranh đế quốc đầu tiên mang tính chất thế giới, gây ra những hậu quả thảm khốc cho nhân loại.',
    [
      'Trình bày được nguyên nhân của Chiến tranh thế giới thứ nhất.',
      'Nêu được những nét chính về diễn biến và kết cục của chiến tranh.',
      'Phân tích được hậu quả và tính chất của cuộc chiến.',
    ],
    [
      { h: 'Nguyên nhân sâu xa' },
      { p: 'Cuối thế kỉ XIX – đầu XX, sự phát triển không đều giữa các nước đế quốc làm thay đổi tương quan lực lượng. Mâu thuẫn về thuộc địa và thị trường giữa các nước đế quốc ngày càng gay gắt, dẫn tới việc hình thành hai khối quân sự đối đầu.' },
      { h: 'Hai khối quân sự đối lập' },
      { ul: [
        'Khối Liên minh: Đức, Áo – Hung, I-ta-li-a (1882).',
        'Khối Hiệp ước: Anh, Pháp, Nga (đầu thế kỉ XX).',
        'Cả hai khối đều ráo riết chạy đua vũ trang, chuẩn bị chiến tranh để chia lại thế giới.',
      ] },
      { h: 'Nguyên cớ trực tiếp' },
      { p: 'Ngày 28/6/1914, Thái tử Áo – Hung bị một người Xéc-bi ám sát ở Xa-ra-e-vô. Lấy cớ đó, Áo – Hung tuyên chiến với Xéc-bi, kéo theo các nước trong hai khối lần lượt tham chiến — chiến tranh bùng nổ.' },
      { h: 'Giai đoạn thứ nhất (1914–1916)' },
      { ul: [
        'Đức tập trung lực lượng đánh ở mặt trận phía Tây (Pháp) nhưng không thắng nhanh được.',
        'Chiến tranh chuyển sang thế giằng co, hình thành "chiến tranh chiến hào".',
        'Ưu thế nghiêng dần về phe Liên minh trong giai đoạn đầu.',
      ] },
      { h: 'Giai đoạn thứ hai (1917–1918)' },
      { ul: [
        'Năm 1917, Mỹ tham chiến đứng về phe Hiệp ước, làm thay đổi tương quan lực lượng.',
        'Cách mạng tháng Mười Nga (1917) thắng lợi; nước Nga Xô viết rút khỏi chiến tranh.',
        'Năm 1918, phe Liên minh liên tiếp thất bại; ngày 11/11/1918, Đức kí hiệp định đầu hàng — chiến tranh kết thúc.',
      ] },
      { h: 'Kết cục và hậu quả' },
      { ul: [
        'Phe Hiệp ước thắng; phe Liên minh thất bại.',
        'Khoảng 10 triệu người chết, hơn 20 triệu người bị thương; thiệt hại vật chất khổng lồ.',
        'Bản đồ chính trị thế giới thay đổi, nhiều đế quốc tan rã; trật tự thế giới mới được thiết lập (hệ thống Véc-xai – Oa-sinh-tơn).',
      ] },
      { h: 'Tính chất của chiến tranh' },
      { p: 'Chiến tranh thế giới thứ nhất là cuộc chiến tranh đế quốc phi nghĩa đối với cả hai bên, nhằm tranh giành thuộc địa, thị trường, phân chia lại thế giới — chỉ đem lại đau thương cho nhân dân các nước.' },
      { note: 'Thắng lợi của Cách mạng tháng Mười Nga ngay trong lòng cuộc chiến đã mở ra một thời đại mới, làm thay đổi căn bản tiến trình lịch sử thế giới.' },
    ],
    [
      { q: 'Vì sao Chiến tranh thế giới thứ nhất được coi là cuộc chiến tranh đế quốc phi nghĩa?', a: 'Vì cuộc chiến tranh do các nước đế quốc gây ra nhằm tranh giành thuộc địa, thị trường và phân chia lại thế giới — vì quyền lợi của giai cấp tư sản cầm quyền, không vì lợi ích của nhân dân. Cả hai phe (Liên minh và Hiệp ước) đều theo đuổi mục tiêu phi nghĩa, đẩy hàng chục triệu người vào chỗ chết, nên đó là cuộc chiến tranh đế quốc phi nghĩa.' },
      { q: 'Sự kiện nào là nguyên cớ trực tiếp làm bùng nổ chiến tranh?', a: 'Nguyên cớ trực tiếp là vụ ám sát Thái tử Áo – Hung tại Xa-ra-e-vô ngày 28/6/1914 do một người Xéc-bi thực hiện. Lấy cớ này, Áo – Hung tuyên chiến với Xéc-bi, kéo theo phản ứng dây chuyền của các nước trong hai khối quân sự, khiến chiến tranh bùng nổ trên quy mô thế giới.' },
      { q: 'Việc Mỹ tham chiến (1917) và Cách mạng tháng Mười Nga có tác động gì đến cục diện chiến tranh?', a: 'Việc Mỹ tham chiến năm 1917 đứng về phe Hiệp ước đã bổ sung tiềm lực kinh tế và quân sự lớn, làm thay đổi tương quan lực lượng có lợi cho phe Hiệp ước. Cùng năm, Cách mạng tháng Mười Nga thắng lợi, nước Nga Xô viết rút khỏi chiến tranh. Những yếu tố này góp phần đẩy phe Liên minh đến thất bại và kết thúc chiến tranh năm 1918.' },
    ]
  ),

  'S8LSDL-w28-quiz': L(
    'LS — Cách mạng tháng Mười Nga năm 1917',
    'Cách mạng tháng Mười Nga năm 1917 là cuộc cách mạng xã hội chủ nghĩa đầu tiên thắng lợi, mở ra một thời đại mới trong lịch sử nhân loại.',
    [
      'Trình bày được bối cảnh nước Nga trước cách mạng.',
      'Nêu được diễn biến chính của Cách mạng tháng Mười.',
      'Phân tích ý nghĩa lịch sử của Cách mạng tháng Mười Nga.',
    ],
    [
      { h: 'Nước Nga đầu thế kỉ XX' },
      { ul: [
        'Là nước quân chủ chuyên chế, đứng đầu là Nga hoàng Ni-cô-lai II.',
        'Kinh tế lạc hậu; đời sống công nhân, nông dân và các dân tộc cực khổ.',
        'Việc tham gia Chiến tranh thế giới thứ nhất và liên tiếp thất bại đẩy nước Nga vào khủng hoảng trầm trọng.',
      ] },
      { h: 'Cách mạng tháng Hai (1917)' },
      { ul: [
        'Tháng 2/1917, cách mạng dân chủ tư sản bùng nổ, lật đổ chế độ quân chủ chuyên chế Nga hoàng.',
        'Sau cách mạng, nước Nga tồn tại tình trạng hai chính quyền song song: Chính phủ lâm thời tư sản và các Xô viết đại biểu công nhân, binh lính.',
      ] },
      { h: 'Yêu cầu đặt ra sau tháng Hai' },
      { p: 'Chính phủ lâm thời tư sản vẫn tiếp tục theo đuổi chiến tranh và không đáp ứng nguyện vọng "hoà bình, ruộng đất, bánh mì" của nhân dân. Lê-nin và Đảng Bôn-sê-vích chủ trương chuyển từ cách mạng dân chủ tư sản sang cách mạng xã hội chủ nghĩa.' },
      { h: 'Cách mạng tháng Mười (1917)' },
      { ul: [
        'Đêm 24/10 (tức 6/11), khởi nghĩa vũ trang nổ ra ở Pê-tơ-rô-grát.',
        'Đêm 25/10 (tức 7/11/1917), quân khởi nghĩa tấn công Cung điện Mùa Đông, bắt giữ các bộ trưởng của Chính phủ lâm thời.',
        'Cách mạng thắng lợi ở thủ đô rồi nhanh chóng lan rộng ra cả nước.',
      ] },
      { h: 'Chính quyền Xô viết được thành lập' },
      { ul: [
        'Đại hội Xô viết toàn Nga tuyên bố thành lập chính quyền Xô viết do Lê-nin đứng đầu.',
        'Thông qua "Sắc lệnh hoà bình" và "Sắc lệnh ruộng đất" đáp ứng nguyện vọng của nhân dân.',
        'Nhà nước vô sản đầu tiên trên thế giới ra đời.',
      ] },
      { h: 'Ý nghĩa lịch sử' },
      { ul: [
        'Đối với nước Nga: đưa nhân dân lao động lên làm chủ, xây dựng chế độ mới — chế độ xã hội chủ nghĩa.',
        'Đối với thế giới: là cuộc cách mạng xã hội chủ nghĩa đầu tiên thắng lợi, làm thay đổi cục diện thế giới.',
        'Cổ vũ mạnh mẽ phong trào cách mạng của giai cấp công nhân và phong trào giải phóng dân tộc.',
      ] },
      { note: 'Cách mạng tháng Mười Nga có ảnh hưởng sâu sắc đến cách mạng Việt Nam: Nguyễn Ái Quốc đã tìm thấy ở đó con đường cứu nước đúng đắn cho dân tộc — con đường cách mạng vô sản.' },
    ],
    [
      { q: 'Vì sao năm 1917 nước Nga diễn ra hai cuộc cách mạng?', a: 'Vì cách mạng tháng Hai (1917) tuy lật đổ chế độ quân chủ chuyên chế Nga hoàng nhưng lại tạo ra cục diện hai chính quyền song song (Chính phủ lâm thời tư sản và các Xô viết). Chính phủ lâm thời vẫn theo đuổi chiến tranh, không đáp ứng nguyện vọng của nhân dân. Do đó, cần một cuộc cách mạng thứ hai — Cách mạng tháng Mười — để giành chính quyền về tay nhân dân lao động, xây dựng chế độ xã hội chủ nghĩa.' },
      { q: 'Cách mạng tháng Mười Nga có ý nghĩa quốc tế như thế nào?', a: 'Cách mạng tháng Mười Nga là cuộc cách mạng xã hội chủ nghĩa đầu tiên giành thắng lợi, lập nên nhà nước vô sản đầu tiên trên thế giới. Nó làm thay đổi cục diện thế giới, cổ vũ mạnh mẽ phong trào đấu tranh của giai cấp công nhân và phong trào giải phóng dân tộc ở các nước thuộc địa, mở ra một thời đại mới trong lịch sử nhân loại.' },
      { q: 'Vì sao Cách mạng tháng Mười Nga có ảnh hưởng lớn đến cách mạng Việt Nam?', a: 'Vì thắng lợi của Cách mạng tháng Mười đã chứng minh tính đúng đắn của con đường cách mạng vô sản. Chính từ tấm gương đó, Nguyễn Ái Quốc đã tìm ra con đường cứu nước cho dân tộc Việt Nam — đi theo con đường cách mạng vô sản dưới sự lãnh đạo của Đảng, gắn độc lập dân tộc với chủ nghĩa xã hội.' },
    ]
  ),

  'S8LSDL-w29-quiz': L(
    'LS — Thế giới giữa hai cuộc chiến tranh: khủng hoảng kinh tế và chủ nghĩa phát xít',
    'Giai đoạn giữa hai cuộc chiến tranh thế giới đầy biến động: khủng hoảng kinh tế 1929–1933 và sự xuất hiện của chủ nghĩa phát xít đã đẩy nhân loại tới một cuộc chiến tranh mới.',
    [
      'Trình bày được nguyên nhân và hậu quả của khủng hoảng kinh tế 1929–1933.',
      'Nêu được sự ra đời của chủ nghĩa phát xít.',
      'Phân tích con đường thoát khỏi khủng hoảng của các nước.',
    ],
    [
      { h: 'Bối cảnh sau Chiến tranh thế giới thứ nhất' },
      { p: 'Trật tự thế giới mới (hệ thống Véc-xai – Oa-sinh-tơn) chứa đựng nhiều mâu thuẫn. Trong những năm 1924–1929, các nước tư bản bước vào thời kì ổn định và phát triển, nhưng sự phát triển đó không vững chắc.' },
      { h: 'Khủng hoảng kinh tế 1929–1933' },
      { ul: [
        'Bắt đầu từ Mỹ (tháng 10/1929, thị trường chứng khoán Phố Wall sụp đổ) rồi lan ra toàn bộ thế giới tư bản.',
        'Là cuộc khủng hoảng "thừa" — sản xuất ồ ạt vượt quá sức mua của thị trường.',
        'Diễn ra trên quy mô lớn, kéo dài và gây hậu quả nặng nề nhất trong lịch sử chủ nghĩa tư bản.',
      ] },
      { h: 'Hậu quả của khủng hoảng' },
      { ul: [
        'Sản xuất công nghiệp, nông nghiệp đình đốn; sản lượng giảm sút nghiêm trọng.',
        'Hàng chục triệu người thất nghiệp, đời sống nhân dân lao động cực khổ.',
        'Mâu thuẫn xã hội gay gắt, các cuộc đấu tranh của nhân dân bùng nổ.',
      ] },
      { h: 'Hai con đường thoát khỏi khủng hoảng' },
      { ul: [
        'Các nước có nhiều thuộc địa (Anh, Pháp, Mỹ): cải cách kinh tế – xã hội (Mỹ thực hiện "Chính sách mới" của Ru-dơ-ven).',
        'Các nước ít thuộc địa, thiếu vốn (Đức, I-ta-li-a, Nhật Bản): phát xít hoá bộ máy thống trị, chạy đua vũ trang, gây chiến tranh chia lại thế giới.',
      ] },
      { h: 'Chủ nghĩa phát xít hình thành' },
      { ul: [
        'Đức: năm 1933, Hít-le lên cầm quyền, thiết lập chế độ phát xít.',
        'I-ta-li-a: Mút-xô-li-ni và đảng phát xít cầm quyền (từ 1922).',
        'Nhật Bản: giới quân phiệt nắm quyền, đẩy mạnh xâm lược.',
      ] },
      { h: 'Đặc điểm của chủ nghĩa phát xít' },
      { p: 'Chủ nghĩa phát xít là chế độ độc tài, tàn bạo, hiếu chiến nhất; thủ tiêu mọi quyền tự do dân chủ, chủ trương phân biệt chủng tộc, chạy đua vũ trang và phát động chiến tranh xâm lược — trở thành nguy cơ trực tiếp đe doạ hoà bình thế giới.' },
      { note: 'Chính sự ra đời và bành trướng của chủ nghĩa phát xít là nguyên nhân trực tiếp dẫn tới Chiến tranh thế giới thứ hai (1939–1945).' },
    ],
    [
      { q: 'Vì sao gọi cuộc khủng hoảng 1929–1933 là cuộc khủng hoảng "thừa"?', a: 'Gọi là khủng hoảng "thừa" vì hàng hoá được sản xuất ra ồ ạt, vượt quá sức mua có hạn của thị trường (do đời sống nhân dân lao động thấp). Hàng hoá ế thừa, không tiêu thụ được, dẫn đến sản xuất đình đốn, các nhà máy đóng cửa, công nhân thất nghiệp — chứ không phải do thiếu hàng hoá.' },
      { q: 'Vì sao Đức, I-ta-li-a, Nhật Bản lại chọn con đường phát xít hoá để thoát khỏi khủng hoảng?', a: 'Vì đây là những nước ít thuộc địa, thiếu vốn, thiếu nguyên liệu và thị trường, lại bất mãn với trật tự thế giới sau Chiến tranh thế giới thứ nhất. Để thoát khỏi khủng hoảng và thoả mãn tham vọng bành trướng, các nước này đã phát xít hoá bộ máy thống trị, tăng cường chạy đua vũ trang và chuẩn bị gây chiến tranh để chia lại thế giới.' },
      { q: 'Sự xuất hiện của chủ nghĩa phát xít đe doạ thế giới như thế nào?', a: 'Chủ nghĩa phát xít là chế độ độc tài, tàn bạo và hiếu chiến nhất: thủ tiêu các quyền tự do dân chủ, đàn áp nhân dân, phân biệt chủng tộc, chạy đua vũ trang và chủ trương phát động chiến tranh xâm lược. Vì vậy, sự ra đời và bành trướng của chủ nghĩa phát xít là nguy cơ trực tiếp đe doạ hoà bình, an ninh của toàn nhân loại, dẫn tới Chiến tranh thế giới thứ hai.' },
    ]
  ),

  'S8LSDL-w30-quiz': L(
    'LS — Chiến tranh thế giới thứ hai (1939–1945)',
    'Chiến tranh thế giới thứ hai là cuộc chiến tranh lớn nhất, khốc liệt nhất và tàn phá nặng nề nhất trong lịch sử loài người, do chủ nghĩa phát xít gây ra.',
    [
      'Trình bày được nguyên nhân bùng nổ Chiến tranh thế giới thứ hai.',
      'Nêu được những diễn biến chính và bước ngoặt của chiến tranh.',
      'Phân tích kết cục, hậu quả và bài học của chiến tranh.',
    ],
    [
      { h: 'Nguyên nhân' },
      { ul: [
        'Nguyên nhân sâu xa: mâu thuẫn về quyền lợi giữa các nước đế quốc sau Chiến tranh thế giới thứ nhất chưa được giải quyết.',
        'Tác động của khủng hoảng kinh tế 1929–1933 và sự hình thành chủ nghĩa phát xít hiếu chiến.',
        'Chính sách nhượng bộ, "dung dưỡng" phát xít của các nước Anh, Pháp, Mỹ tạo điều kiện cho phát xít gây chiến.',
      ] },
      { h: 'Chiến tranh bùng nổ' },
      { p: 'Ngày 1/9/1939, phát xít Đức tấn công Ba Lan. Anh, Pháp tuyên chiến với Đức — Chiến tranh thế giới thứ hai bùng nổ.' },
      { h: 'Giai đoạn đầu (1939–1941) — phe phát xít thắng thế' },
      { ul: [
        'Đức nhanh chóng chiếm Ba Lan rồi đánh chiếm hầu hết các nước Tây Âu, Bắc Âu.',
        'Tháng 6/1941, Đức tấn công Liên Xô — mở rộng chiến tranh.',
        'Ở châu Á – Thái Bình Dương, Nhật Bản bành trướng; tháng 12/1941 tập kích Trân Châu Cảng, Mỹ tham chiến.',
      ] },
      { h: 'Khối Đồng minh chống phát xít' },
      { p: 'Đầu năm 1942, Mặt trận Đồng minh chống phát xít được thành lập (đứng đầu là Liên Xô, Mỹ, Anh), đoàn kết các lực lượng yêu chuộng hoà bình chống lại phe phát xít.' },
      { h: 'Bước ngoặt của chiến tranh (1942–1943)' },
      { ul: [
        'Chiến thắng Xta-lin-grát (2/1943) của Hồng quân Liên Xô tạo nên bước ngoặt, chuyển phe Đồng minh sang phản công.',
        'Quân Đồng minh giành ưu thế trên các mặt trận; phe phát xít liên tiếp thất bại.',
      ] },
      { h: 'Giai đoạn kết thúc (1944–1945)' },
      { ul: [
        'Tháng 5/1945: phát xít Đức đầu hàng vô điều kiện, chiến tranh ở châu Âu kết thúc.',
        'Tháng 8/1945: Mỹ ném hai quả bom nguyên tử xuống Hi-rô-si-ma và Na-ga-xa-ki; Liên Xô tiêu diệt đạo quân Quan Đông của Nhật.',
        'Ngày 15/8/1945, Nhật Bản đầu hàng — Chiến tranh thế giới thứ hai kết thúc.',
      ] },
      { h: 'Kết cục và hậu quả' },
      { ul: [
        'Chủ nghĩa phát xít bị tiêu diệt hoàn toàn; Liên Xô và phe Đồng minh thắng lợi.',
        'Khoảng 60 triệu người chết, hàng chục triệu người bị thương, thiệt hại vật chất khổng lồ.',
        'Làm thay đổi căn bản tình hình thế giới: hệ thống xã hội chủ nghĩa mở rộng, phong trào giải phóng dân tộc dâng cao (Việt Nam giành độc lập 2/9/1945).',
      ] },
      { note: 'Chiến tranh thế giới thứ hai để lại bài học sâu sắc: phải kiên quyết đấu tranh chống chủ nghĩa phát xít, bảo vệ hoà bình và phải đoàn kết quốc tế để ngăn chặn nguy cơ chiến tranh.' },
    ],
    [
      { q: 'Vì sao nói chính sách nhượng bộ của Anh, Pháp, Mỹ đã tạo điều kiện cho phát xít gây chiến?', a: 'Vì trước hành động bành trướng của phe phát xít, Anh, Pháp thực hiện chính sách "nhượng bộ, dung dưỡng" (đỉnh cao là Hội nghị Muy-ních 1938 trao vùng đất của Tiệp Khắc cho Đức), còn Mỹ giữ thái độ "trung lập". Họ muốn đẩy phát xít tấn công Liên Xô. Chính sự nhượng bộ này đã làm phát xít càng lấn tới, dẫn đến chiến tranh bùng nổ.' },
      { q: 'Chiến thắng Xta-lin-grát có ý nghĩa gì đối với cục diện chiến tranh?', a: 'Chiến thắng Xta-lin-grát (2/1943) của Hồng quân Liên Xô là bước ngoặt của Chiến tranh thế giới thứ hai. Sau trận này, phe phát xít mất thế chủ động, chuyển từ tấn công sang phòng ngự; còn quân Đồng minh chuyển sang phản công trên khắp các mặt trận, từng bước tiến tới tiêu diệt hoàn toàn chủ nghĩa phát xít.' },
      { q: 'Chiến tranh thế giới thứ hai đã tác động như thế nào đến phong trào giải phóng dân tộc?', a: 'Việc chủ nghĩa phát xít bị tiêu diệt và các nước đế quốc suy yếu sau chiến tranh đã tạo điều kiện thuận lợi cho phong trào giải phóng dân tộc dâng cao. Nhiều dân tộc bị áp bức đã nổi dậy giành độc lập. Riêng ở Việt Nam, nhân dân ta đã chớp thời cơ Nhật đầu hàng để tiến hành Cách mạng tháng Tám, giành độc lập và lập nước Việt Nam Dân chủ Cộng hoà (2/9/1945).' },
    ]
  ),

  'S8LSDL-w31-quiz': L(
    'LS — Việt Nam đầu thế kỉ XX đến năm 1918',
    'Đầu thế kỉ XX, dưới tác động của cuộc khai thác thuộc địa, xã hội Việt Nam biến đổi sâu sắc; phong trào yêu nước chuyển sang khuynh hướng mới và Nguyễn Tất Thành ra đi tìm đường cứu nước.',
    [
      'Trình bày được những chuyển biến của xã hội Việt Nam đầu thế kỉ XX.',
      'Nêu được các phong trào yêu nước tiêu biểu giai đoạn 1900–1918.',
      'Hiểu được ý nghĩa việc Nguyễn Tất Thành ra đi tìm đường cứu nước.',
    ],
    [
      { h: 'Tác động của cuộc khai thác thuộc địa' },
      { p: 'Cuộc khai thác thuộc địa lần thứ nhất (1897–1914) làm cho kinh tế Việt Nam có những chuyển biến nhất định nhưng vẫn lạc hậu, lệ thuộc vào Pháp; xã hội phân hoá sâu sắc, xuất hiện các giai cấp và tầng lớp mới.' },
      { h: 'Các giai cấp, tầng lớp trong xã hội' },
      { ul: [
        'Giai cấp cũ: địa chủ phong kiến (phân hoá), nông dân (bị bần cùng hoá).',
        'Giai cấp, tầng lớp mới: công nhân, tư sản, tiểu tư sản thành thị.',
        'Sự phân hoá này tạo cơ sở xã hội cho phong trào yêu nước theo khuynh hướng mới.',
      ] },
      { h: 'Phong trào Đông Du và Hội Duy tân' },
      { p: 'Phan Bội Châu chủ trương bạo động, lập Hội Duy tân (1904), tổ chức phong trào Đông Du (1905–1908) đưa thanh niên sang Nhật học. Năm 1912, ông lập Việt Nam Quang phục hội, hướng tới mục tiêu cộng hoà.' },
      { h: 'Phong trào Duy tân và Đông Kinh Nghĩa Thục' },
      { ul: [
        'Phan Châu Trinh phát động phong trào Duy tân ở Trung Kì (1906–1908), chủ trương cải cách ôn hoà.',
        'Đông Kinh Nghĩa Thục (1907) ở Hà Nội cổ vũ chữ Quốc ngữ và lòng yêu nước.',
        'Cuối cùng đều bị thực dân Pháp đàn áp và thất bại.',
      ] },
      { h: 'Việt Nam trong những năm Chiến tranh thế giới thứ nhất' },
      { ul: [
        'Pháp tăng cường vơ vét sức người, sức của ở Việt Nam phục vụ chiến tranh.',
        'Nhiều cuộc đấu tranh, khởi nghĩa nổ ra (vụ binh biến, khởi nghĩa của binh lính, đồng bào dân tộc thiểu số).',
        'Đời sống nhân dân càng thêm cực khổ.',
      ] },
      { h: 'Nguyễn Tất Thành ra đi tìm đường cứu nước' },
      { ul: [
        'Sinh năm 1890 tại Nghệ An, sớm có lòng yêu nước và nhận thấy hạn chế của các con đường cứu nước đương thời.',
        'Ngày 5/6/1911, từ bến cảng Nhà Rồng (Sài Gòn), Người ra đi tìm đường cứu nước.',
        'Người chọn hướng sang phương Tây để tìm hiểu "tự do, bình đẳng, bác ái" rồi trở về giúp đồng bào.',
      ] },
      { h: 'Ý nghĩa bước đầu' },
      { p: 'Việc ra đi tìm đường cứu nước của Nguyễn Tất Thành mở ra một hướng đi mới — khác với các bậc tiền bối — đặt cơ sở để Người tìm thấy con đường cứu nước đúng đắn: con đường cách mạng vô sản.' },
      { note: 'Nguyễn Tất Thành không sang Nhật hay Trung Quốc như các cụ Phan, mà sang phương Tây — chính nơi sản sinh ra chủ nghĩa thực dân — để "xem họ làm thế nào rồi trở về giúp đồng bào ta".' },
    ],
    [
      { q: 'Vì sao đầu thế kỉ XX phong trào yêu nước Việt Nam lại chuyển sang khuynh hướng dân chủ tư sản?', a: 'Vì cuộc khai thác thuộc địa làm xã hội Việt Nam phân hoá, xuất hiện các giai cấp, tầng lớp mới (tư sản, tiểu tư sản, công nhân) và du nhập tư tưởng dân chủ tư sản từ bên ngoài (qua Nhật Bản, Trung Quốc). Trong khi con đường cứu nước phong kiến (Cần Vương) đã thất bại, các sĩ phu yêu nước tiến bộ tiếp thu tư tưởng mới, chuyển phong trào sang khuynh hướng dân chủ tư sản.' },
      { q: 'Con đường cứu nước của Nguyễn Tất Thành có gì khác so với các bậc tiền bối?', a: 'Các bậc tiền bối (Phan Bội Châu, Phan Châu Trinh) hướng về phương Đông (Nhật Bản, Trung Quốc) để cầu viện hoặc dựa vào Pháp để cải cách. Nguyễn Tất Thành lại quyết định sang phương Tây — nơi có các nước tư bản và sinh ra chủ nghĩa thực dân — để tìm hiểu bản chất của họ, học hỏi rồi trở về giúp đồng bào. Đó là một hướng đi mới, độc lập và sáng tạo.' },
      { q: 'Việc Nguyễn Tất Thành ra đi tìm đường cứu nước (1911) có ý nghĩa gì?', a: 'Sự kiện ngày 5/6/1911 mở ra một hướng đi mới cho cách mạng Việt Nam, khác với các con đường cứu nước đã thất bại trước đó. Đây là bước khởi đầu để Nguyễn Tất Thành — sau này là Nguyễn Ái Quốc — tìm thấy con đường cứu nước đúng đắn: con đường cách mạng vô sản, gắn độc lập dân tộc với chủ nghĩa xã hội.' },
    ]
  ),

  'S8LSDL-w32-quiz': L(
    'ĐL — Đặc điểm chung của tự nhiên Việt Nam',
    'Sau khi tìm hiểu từng thành phần (địa hình, khí hậu, sông ngòi, đất, sinh vật), bài học giúp các em khái quát những đặc điểm chung và mối quan hệ giữa các thành phần tự nhiên.',
    [
      'Khái quát được bốn đặc điểm chung của tự nhiên Việt Nam.',
      'Hiểu được mối quan hệ giữa các thành phần tự nhiên.',
      'Nêu được ảnh hưởng của tự nhiên tới phát triển kinh tế – xã hội.',
    ],
    [
      { h: 'Bốn đặc điểm chung của tự nhiên Việt Nam' },
      { ul: [
        'Tính chất nhiệt đới ẩm gió mùa.',
        'Tính chất ven biển (tính bán đảo) — chịu ảnh hưởng sâu sắc của biển.',
        'Tính chất đồi núi (đồi núi chiếm 3/4 diện tích).',
        'Thiên nhiên phân hoá đa dạng, phức tạp.',
      ] },
      { h: 'Đặc điểm 1 — Tính chất nhiệt đới ẩm gió mùa' },
      { p: 'Là tính chất nền tảng, bao trùm, chi phối toàn bộ thiên nhiên nước ta: thể hiện qua khí hậu nóng ẩm, mưa nhiều theo mùa; sông ngòi nhiều nước, theo mùa; đất feralit, rừng nhiệt đới gió mùa.' },
      { h: 'Đặc điểm 2 — Tính chất ven biển' },
      { p: 'Biển Đông rộng lớn đem lại lượng ẩm dồi dào, điều hoà khí hậu, tạo nên cảnh quan và tài nguyên biển phong phú. Ảnh hưởng của biển lan sâu vào đất liền nhờ lãnh thổ hẹp ngang.' },
      { h: 'Đặc điểm 3 — Tính chất đồi núi' },
      { p: 'Đồi núi là bộ phận quan trọng nhất của địa hình, chiếm 3/4 diện tích, chi phối sự phân hoá của khí hậu, sông ngòi, đất và sinh vật theo độ cao và theo sườn.' },
      { h: 'Đặc điểm 4 — Tính chất đa dạng, phức tạp' },
      { ul: [
        'Thiên nhiên phân hoá theo bắc – nam, đông – tây, theo độ cao.',
        'Có nhiều cảnh quan, hệ sinh thái khác nhau.',
        'Sự đa dạng tạo nên tiềm năng lớn nhưng cũng làm cho việc khai thác phức tạp.',
      ] },
      { h: 'Mối quan hệ giữa các thành phần tự nhiên' },
      { p: 'Các thành phần tự nhiên (địa hình, khí hậu, sông ngòi, đất, sinh vật) có mối quan hệ chặt chẽ, tác động qua lại lẫn nhau. Ví dụ: khí hậu nhiệt đới ẩm + địa hình đồi núi → quá trình feralit hoá đất; mưa lớn theo mùa → sông ngòi có chế độ nước theo mùa.' },
      { h: 'Ảnh hưởng tới phát triển kinh tế – xã hội' },
      { ul: [
        'Thuận lợi: phát triển nền nông nghiệp nhiệt đới đa dạng, lâm nghiệp, thuỷ sản, du lịch, công nghiệp khai khoáng, thuỷ điện.',
        'Khó khăn: nhiều thiên tai (bão, lũ, hạn hán, xói mòn), gây trở ngại cho sản xuất và đời sống.',
      ] },
      { note: 'Hiểu rõ đặc điểm chung của tự nhiên giúp chúng ta khai thác hợp lí tài nguyên và chủ động phòng chống thiên tai để phát triển bền vững.' },
    ],
    [
      { q: 'Vì sao tính chất nhiệt đới ẩm gió mùa được coi là đặc điểm nền tảng của tự nhiên Việt Nam?', a: 'Vì tính chất nhiệt đới ẩm gió mùa do vị trí địa lí quy định và chi phối toàn bộ các thành phần tự nhiên khác: nó quyết định khí hậu nóng ẩm mưa nhiều theo mùa, tạo nên sông ngòi nhiều nước và có chế độ nước theo mùa, hình thành đất feralit và thảm rừng nhiệt đới gió mùa. Vì vậy đây là đặc điểm cơ bản, bao trùm nhất.' },
      { q: 'Hãy chứng minh các thành phần tự nhiên có mối quan hệ chặt chẽ với nhau.', a: 'Ví dụ: khí hậu nhiệt đới ẩm với mưa lớn, nhiệt độ cao tác động lên địa hình đồi núi tạo nên quá trình feralit hoá, hình thành đất feralit; mưa nhiều theo mùa làm cho sông ngòi nhiều nước và có chế độ nước theo mùa (mùa lũ – mùa cạn); địa hình đồi núi lại làm khí hậu, sinh vật phân hoá theo độ cao. Như vậy địa hình – khí hậu – sông ngòi – đất – sinh vật gắn bó, tác động qua lại với nhau.' },
      { q: 'Nêu những thuận lợi và khó khăn của tự nhiên Việt Nam đối với phát triển kinh tế.', a: 'Thuận lợi: thiên nhiên nhiệt đới ẩm gió mùa, đa dạng cho phép phát triển nền nông nghiệp nhiệt đới nhiều vụ, đa dạng cây con; phát triển lâm nghiệp, thuỷ sản, du lịch, khai khoáng và thuỷ điện. Khó khăn: thiên nhiên diễn biến thất thường với nhiều thiên tai (bão, lũ lụt, hạn hán, xói mòn, sạt lở), gây thiệt hại cho sản xuất và đời sống, đòi hỏi phải chủ động phòng tránh.' },
    ]
  ),

  'S8LSDL-w33-quiz': L(
    'Ôn tập Lịch sử (cách mạng tư sản, hai cuộc chiến tranh thế giới và Việt Nam cận đại)',
    'Tiết ôn tập giúp các em hệ thống lại toàn bộ phần Lịch sử lớp 8: lịch sử thế giới cận – hiện đại và lịch sử Việt Nam từ 1858 đến 1918.',
    [
      'Hệ thống hoá các sự kiện lớn của lịch sử thế giới (cách mạng tư sản, hai cuộc chiến tranh thế giới).',
      'Khái quát quá trình Pháp xâm lược và phong trào yêu nước Việt Nam.',
      'Rút ra bài học và mạch phát triển của lịch sử.',
    ],
    [
      { h: 'Các cuộc cách mạng tư sản' },
      { ul: [
        'Cách mạng tư sản Anh (1640–1688): quân chủ lập hiến.',
        'Chiến tranh giành độc lập Bắc Mỹ (1775–1783): lập Hoa Kỳ.',
        'Cách mạng tư sản Pháp (1789–1794): triệt để nhất.',
        'Duy tân Minh Trị ở Nhật Bản (1868), Cách mạng Tân Hợi ở Trung Quốc (1911).',
      ] },
      { h: 'Cách mạng công nghiệp và phong trào công nhân' },
      { ul: [
        'Cách mạng công nghiệp: chuyển sang sản xuất bằng máy móc.',
        'Chủ nghĩa Mác ra đời (1848); Công xã Pa-ri (1871).',
      ] },
      { h: 'Cách mạng tháng Mười và hai cuộc chiến tranh thế giới' },
      { ul: [
        'Chiến tranh thế giới thứ nhất (1914–1918): chiến tranh đế quốc.',
        'Cách mạng tháng Mười Nga (1917): cách mạng xã hội chủ nghĩa đầu tiên.',
        'Khủng hoảng kinh tế 1929–1933 và chủ nghĩa phát xít.',
        'Chiến tranh thế giới thứ hai (1939–1945): tiêu diệt chủ nghĩa phát xít.',
      ] },
      { h: 'Pháp xâm lược và phong trào yêu nước Việt Nam' },
      { ul: [
        '1858: Pháp đánh Đà Nẵng; 1884: Việt Nam thành thuộc địa (Hiệp ước Pa-tơ-nốt).',
        'Phong trào Cần Vương (1885–1896); khởi nghĩa Yên Thế (1884–1913).',
        'Trào lưu cải cách cuối XIX; phong trào Đông Du, Duy tân, Đông Kinh Nghĩa Thục đầu XX.',
        'Nguyễn Tất Thành ra đi tìm đường cứu nước (5/6/1911).',
      ] },
      { h: 'Mạch phát triển của lịch sử thế giới' },
      { p: 'Chủ nghĩa tư bản hình thành (cách mạng tư sản) → phát triển nhờ cách mạng công nghiệp → chuyển sang giai đoạn đế quốc, đẩy mạnh xâm lược thuộc địa và gây chiến tranh thế giới → phong trào công nhân và cách mạng vô sản phát triển (đỉnh cao là Cách mạng tháng Mười Nga).' },
      { h: 'Mạch phát triển của lịch sử Việt Nam' },
      { p: 'Pháp xâm lược (1858) → triều Nguyễn từng bước đầu hàng, nước ta thành thuộc địa (1884) → các phong trào yêu nước liên tục nổ ra nhưng đều thất bại → đặt ra yêu cầu tìm con đường cứu nước mới (Nguyễn Tất Thành, 1911).' },
      { note: 'Bài học lớn: muốn giải phóng dân tộc phải có đường lối đúng đắn và một lực lượng lãnh đạo tiên tiến — điều mà các phong trào yêu nước cuối XIX – đầu XX còn thiếu.' },
    ],
    [
      { q: 'Sắp xếp các sự kiện lịch sử thế giới sau theo thứ tự thời gian: A. Cách mạng tháng Mười Nga; B. Cách mạng tư sản Pháp; C. Chiến tranh thế giới thứ hai; D. Chiến tranh thế giới thứ nhất.', a: 'Thứ tự đúng: B (1789) → D (1914–1918) → A (1917) → C (1939–1945).' },
      { q: 'Vì sao Cách mạng tháng Mười Nga được coi là sự kiện mở đầu thời kì lịch sử thế giới hiện đại?', a: 'Vì Cách mạng tháng Mười Nga (1917) là cuộc cách mạng xã hội chủ nghĩa đầu tiên thắng lợi, lập nên nhà nước vô sản đầu tiên trên thế giới, làm xuất hiện một chế độ xã hội mới và làm thay đổi căn bản cục diện thế giới. Vì vậy nó được lấy làm mốc mở đầu thời kì lịch sử thế giới hiện đại.' },
      { q: 'Qua các phong trào yêu nước cuối XIX – đầu XX, bài học lớn nhất rút ra là gì?', a: 'Bài học lớn nhất là: muốn giành được độc lập dân tộc, phải có một đường lối cứu nước đúng đắn và một giai cấp, lực lượng lãnh đạo tiên tiến. Các phong trào Cần Vương, Yên Thế, Đông Du, Duy tân tuy thể hiện lòng yêu nước nồng nàn nhưng đều thất bại vì thiếu điều đó. Đây chính là lí do thôi thúc Nguyễn Tất Thành ra đi tìm con đường cứu nước mới.' },
    ]
  ),

  'S8LSDL-w34-quiz': L(
    'Ôn tập Địa lí tự nhiên Việt Nam',
    'Tiết ôn tập giúp các em hệ thống lại toàn bộ kiến thức Địa lí tự nhiên Việt Nam: vị trí, địa hình, khí hậu, sông ngòi, đất, sinh vật và biển đảo.',
    [
      'Hệ thống hoá đặc điểm vị trí, phạm vi lãnh thổ và các thành phần tự nhiên.',
      'Khái quát các đặc điểm chung của tự nhiên Việt Nam.',
      'Vận dụng kiến thức để giải thích một số hiện tượng địa lí thực tế.',
    ],
    [
      { h: 'Vị trí và phạm vi lãnh thổ' },
      { ul: [
        'Nằm ở rìa đông bán đảo Đông Dương, gần trung tâm Đông Nam Á, trong vùng nội chí tuyến và khu vực gió mùa.',
        'Diện tích đất liền ~331 212 km²; vùng biển rộng ~1 triệu km²; bờ biển dài 3260 km.',
        'Tiếp giáp Trung Quốc, Lào, Cam-pu-chia; có hai quần đảo Hoàng Sa và Trường Sa.',
      ] },
      { h: 'Địa hình' },
      { ul: [
        'Đồi núi chiếm 3/4 diện tích, chủ yếu là đồi núi thấp; hướng nghiêng tây bắc – đông nam.',
        'Bốn vùng núi: Đông Bắc, Tây Bắc, Trường Sơn Bắc, Trường Sơn Nam.',
        'Hai đồng bằng châu thổ lớn: sông Hồng và sông Cửu Long.',
      ] },
      { h: 'Khí hậu' },
      { ul: [
        'Tính chất nhiệt đới ẩm gió mùa: nhiệt độ cao, mưa nhiều, độ ẩm lớn, hai mùa gió.',
        'Phân hoá theo bắc – nam, đông – tây và theo độ cao.',
        'Nhiều thiên tai: bão, lũ lụt, hạn hán.',
      ] },
      { h: 'Sông ngòi' },
      { ul: [
        'Mạng lưới dày đặc (>2360 sông dài trên 10 km), phần lớn nhỏ, ngắn, dốc.',
        'Hai hướng chảy chính (tây bắc – đông nam và vòng cung); chế độ nước theo mùa; nhiều phù sa.',
        'Các hệ thống sông lớn: sông Hồng, sông Mê Công (Cửu Long), sông Đồng Nai.',
      ] },
      { h: 'Đất và sinh vật' },
      { ul: [
        'Ba nhóm đất chính: feralit (đồi núi), phù sa (đồng bằng), mùn núi cao.',
        'Sinh vật đa dạng, mang tính nhiệt đới ẩm gió mùa, nhiều loài quý hiếm, đặc hữu.',
      ] },
      { h: 'Biển đảo' },
      { p: 'Vùng biển rộng, giàu tài nguyên (hải sản, dầu khí, du lịch), có ý nghĩa chiến lược về kinh tế và quốc phòng; bảo vệ chủ quyền biển đảo là nhiệm vụ thiêng liêng.' },
      { h: 'Các đặc điểm chung của tự nhiên' },
      { p: 'Tự nhiên Việt Nam có bốn đặc điểm chung: tính chất nhiệt đới ẩm gió mùa, tính ven biển, tính đồi núi và tính đa dạng, phức tạp. Các thành phần tự nhiên có mối quan hệ chặt chẽ, tác động qua lại.' },
      { note: 'Hiểu rõ tự nhiên Việt Nam giúp chúng ta khai thác hợp lí tài nguyên, phòng chống thiên tai và phát triển bền vững đất nước.' },
    ],
    [
      { q: 'Hãy giải thích vì sao nước ta có nền nông nghiệp nhiệt đới với cơ cấu cây trồng, vật nuôi đa dạng.', a: 'Vì khí hậu nước ta mang tính chất nhiệt đới ẩm gió mùa, nhiệt độ cao, mưa nhiều, lại phân hoá đa dạng theo bắc – nam, đông – tây và theo độ cao; địa hình và đất đai cũng đa dạng (đất phù sa, đất feralit, đất badan…). Nhờ đó, nước ta có thể trồng được cả cây nhiệt đới, cận nhiệt và ôn đới, canh tác nhiều vụ trong năm, với cơ cấu cây trồng, vật nuôi rất phong phú.' },
      { q: 'Vì sao đồng bằng sông Cửu Long là vựa lúa lớn nhất nước ta?', a: 'Vì đồng bằng sông Cửu Long là đồng bằng lớn nhất (~40 000 km²), địa hình thấp và bằng phẳng, đất phù sa màu mỡ do sông Mê Công bồi đắp, lại được lũ bồi phù sa hằng năm. Kết hợp với khí hậu cận xích đạo nóng ẩm quanh năm và nguồn nước dồi dào, vùng này rất thuận lợi để trồng lúa với năng suất và sản lượng cao, trở thành vựa lúa lớn nhất cả nước.' },
      { q: 'Nêu mối liên hệ giữa khí hậu và sông ngòi nước ta.', a: 'Khí hậu nhiệt đới ẩm gió mùa với lượng mưa lớn là nguồn cung cấp nước chủ yếu cho sông ngòi, làm cho mạng lưới sông ngòi dày đặc và nhiều nước. Vì mưa phân thành hai mùa (mùa mưa – mùa khô) nên sông ngòi cũng có chế độ nước theo mùa (mùa lũ – mùa cạn). Mưa lớn còn gây xói mòn mạnh ở vùng đồi núi, khiến sông ngòi giàu phù sa.' },
    ]
  ),

  'S8LSDL-w35-quiz': L(
    'Ôn tập cuối năm — Lịch sử và Địa lí lớp 8',
    'Tiết ôn tập cuối năm tổng kết toàn bộ chương trình Lịch sử và Địa lí lớp 8, liên hệ kiến thức với thực tiễn đất nước hôm nay.',
    [
      'Tổng kết các nội dung lớn của Lịch sử thế giới và Việt Nam cận đại.',
      'Tổng kết các nội dung lớn của Địa lí tự nhiên Việt Nam.',
      'Liên hệ kiến thức lịch sử – địa lí với thực tiễn và trách nhiệm công dân.',
    ],
    [
      { h: 'Tổng kết Lịch sử thế giới' },
      { ul: [
        'Các cuộc cách mạng tư sản (Anh, Bắc Mỹ, Pháp) và cách mạng công nghiệp.',
        'Sự ra đời của chủ nghĩa Mác; Công xã Pa-ri; Cách mạng tháng Mười Nga.',
        'Hai cuộc chiến tranh thế giới và sự xuất hiện, sụp đổ của chủ nghĩa phát xít.',
        'Các nước châu Á (Trung Quốc, Nhật Bản) và phong trào giải phóng dân tộc ở Đông Nam Á.',
      ] },
      { h: 'Tổng kết Lịch sử Việt Nam' },
      { ul: [
        'Quá trình Pháp xâm lược (1858) và Việt Nam trở thành thuộc địa (1884).',
        'Phong trào yêu nước theo khuynh hướng phong kiến (Cần Vương) và khởi nghĩa nông dân (Yên Thế).',
        'Phong trào yêu nước theo khuynh hướng dân chủ tư sản đầu thế kỉ XX.',
        'Nguyễn Tất Thành ra đi tìm đường cứu nước (1911).',
      ] },
      { h: 'Tổng kết Địa lí tự nhiên Việt Nam' },
      { ul: [
        'Vị trí địa lí, phạm vi lãnh thổ (đất liền, biển, trời).',
        'Địa hình (đồi núi 3/4, hai đồng bằng lớn); khí hậu nhiệt đới ẩm gió mùa.',
        'Sông ngòi, đất, sinh vật; vùng biển đảo giàu tài nguyên.',
        'Các đặc điểm chung của tự nhiên và mối quan hệ giữa các thành phần.',
      ] },
      { h: 'Liên hệ thực tiễn — Lịch sử' },
      { p: 'Những bài học lịch sử (về tinh thần yêu nước, về việc cần có đường lối đúng đắn) vẫn còn nguyên giá trị; nhiều địa danh, nhân vật lịch sử được ghi nhớ qua tên đường phố, trường học, lễ kỉ niệm hôm nay.' },
      { h: 'Liên hệ thực tiễn — Địa lí' },
      { p: 'Hiểu biết về tự nhiên giúp chúng ta ứng phó với biến đổi khí hậu, phòng chống thiên tai (bão, lũ, xâm nhập mặn ở đồng bằng sông Cửu Long), khai thác hợp lí tài nguyên và bảo vệ môi trường, chủ quyền biển đảo.' },
      { h: 'Trách nhiệm của học sinh' },
      { ul: [
        'Trân trọng lịch sử dân tộc, biết ơn các thế hệ cha ông.',
        'Có ý thức bảo vệ tài nguyên, môi trường và chủ quyền lãnh thổ.',
        'Học tập tốt để góp phần xây dựng đất nước.',
      ] },
      { note: 'Các em hãy tự lập sơ đồ tư duy theo dòng thời gian (Lịch sử) và theo các thành phần tự nhiên (Địa lí) để ôn tập hiệu quả và ghi nhớ lâu hơn.' },
    ],
    [
      { q: 'Vì sao việc học Lịch sử và Địa lí có ý nghĩa thiết thực đối với mỗi công dân?', a: 'Học Lịch sử giúp ta hiểu cội nguồn dân tộc, rút ra bài học từ quá khứ, bồi đắp lòng yêu nước và ý thức trách nhiệm. Học Địa lí giúp ta hiểu đặc điểm tự nhiên, tài nguyên của đất nước để khai thác hợp lí, phòng chống thiên tai, bảo vệ môi trường và chủ quyền lãnh thổ. Cả hai trang bị kiến thức và ý thức để mỗi công dân sống có trách nhiệm và góp phần xây dựng đất nước.' },
      { q: 'Liên hệ: hiểu biết về tự nhiên giúp đồng bằng sông Cửu Long ứng phó với thách thức gì hiện nay?', a: 'Đồng bằng sông Cửu Long hiện đang chịu tác động của biến đổi khí hậu và nước biển dâng, dẫn tới xâm nhập mặn, hạn hán, sạt lở bờ sông, bờ biển. Hiểu biết về địa hình thấp, chế độ nước sông Mê Công và đặc điểm khí hậu giúp người dân và chính quyền có giải pháp ứng phó như chuyển đổi cơ cấu cây trồng, xây dựng công trình thuỷ lợi, trữ nước ngọt và sử dụng tài nguyên hợp lí.' },
      { q: 'Từ những phong trào yêu nước đã học, em rút ra trách nhiệm gì của bản thân đối với đất nước hôm nay?', a: 'Từ tinh thần yêu nước bất khuất của cha ông qua các phong trào Cần Vương, Yên Thế, Đông Du, Duy tân và hành trình tìm đường cứu nước của Nguyễn Tất Thành, em thấy mình cần trân trọng nền độc lập, biết ơn các thế hệ đi trước; ra sức học tập, rèn luyện; có ý thức bảo vệ chủ quyền lãnh thổ, tài nguyên và môi trường; góp phần xây dựng đất nước ngày càng giàu mạnh.' },
    ]
  ),

  'S8LSDL-w36-quiz': L(
    'Kết thúc Lịch Sử & Địa Lý 8 — Việt Nam trên hành trình lịch sử và địa lý',
    'Năm lớp 8 đã đưa em ngược dòng thời gian về thế kỉ XIX — đầu thế kỉ XX, chứng kiến Việt Nam bị thực dân Pháp xâm lược và nhân dân ta anh dũng đứng lên kháng chiến. Đồng thời, em đã hiểu sâu hơn về địa lí tự nhiên và kinh tế xã hội của đất nước. Đây là hành trang không thể thiếu để bước vào lịch sử và địa lí lớp 9.',
    [
      'Hệ thống lại Lịch sử Việt Nam cận đại từ 1858 đến đầu thế kỉ XX.',
      'Tổng hợp Địa lí Việt Nam — tự nhiên và các miền địa lí.',
      'Nhận diện cầu nối sang lớp 9: lịch sử hiện đại và địa lí kinh tế-xã hội.',
    ],
    [
      { h: 'Lịch sử — Việt Nam bị xâm lược và kháng chiến (1858–1884)' },
      { ul: [
        '1858: Pháp nổ súng xâm lược tại Đà Nẵng; sau đó chiếm Gia Định (1859), lần lượt mở rộng ra Nam Kì và Bắc Kì.',
        'Các hiệp ước không bình đẳng: Nhâm Tuất (1862), Giáp Tuất (1874), Quý Mùi (1883), Patenôtre (1884) — Việt Nam mất hoàn toàn chủ quyền.',
        'Phong trào kháng chiến nhân dân: Trương Định, Nguyễn Trung Trực, Hoàng Hoa Thám (khởi nghĩa Yên Thế).',
        'Triều đình Nguyễn từng bước đầu hàng — bài học về sự cần thiết của đường lối đúng đắn trong chống ngoại xâm.',
      ] },
      { h: 'Lịch sử — Phong trào yêu nước cuối thế kỉ XIX – đầu thế kỉ XX' },
      { ul: [
        'Phong trào Cần Vương (1885–1895): Tôn Thất Thuyết, vua Hàm Nghi kêu gọi "cần vương" chống Pháp; tiêu biểu — khởi nghĩa Bãi Sậy, Ba Đình, Hương Khê.',
        'Xu hướng bạo động: Phan Bội Châu với phong trào Đông Du (1905–1909), Việt Nam Quang phục hội.',
        'Xu hướng cải cách duy tân: Phan Châu Trinh với chủ trương "khai dân trí, chấn dân khí, hậu dân sinh", phong trào Duy Tân.',
        'Hành trình cứu nước của Nguyễn Tất Thành (1911): xuất phát từ bến Nhà Rồng, ra đi tìm con đường mới — sự kiện mở ra trang sử mới cho cách mạng Việt Nam.',
      ] },
      { h: 'Địa lý Việt Nam — Tự nhiên' },
      { ul: [
        'Vị trí và hình dạng: tiếp giáp Trung Quốc, Lào, Campuchia, Biển Đông; đường bờ biển 3.260 km; dạng hình chữ S thuận lợi giao thương.',
        'Địa hình: ¾ đồi núi (hướng TB-ĐN, vòng cung); đồng bằng (sông Hồng, sông Cửu Long, duyên hải miền Trung).',
        'Khí hậu: nhiệt đới ẩm gió mùa; miền Bắc có 4 mùa; miền Nam 2 mùa mưa-khô; Tây Nguyên cao nguyên.',
        'Sông ngòi: dày đặc; sông Hồng và sông Mê Công là hai hệ thống lớn nhất.',
        'Tài nguyên: khoáng sản (than đá Quảng Ninh, dầu khí Biển Đông, bô-xít Tây Nguyên), rừng, biển.',
      ] },
      { h: 'Địa lý Việt Nam — Các vùng kinh tế' },
      { ul: [
        'Đồng bằng sông Hồng: vùng kinh tế trọng điểm phía Bắc; lúa nước, công nghiệp, Hà Nội là trung tâm.',
        'Trung du và miền núi Bắc Bộ: cây công nghiệp (chè, cà phê), thuỷ điện (Hoà Bình, Sơn La).',
        'Duyên hải Nam Trung Bộ và Tây Nguyên: du lịch biển, cà phê, hồ tiêu, bô-xít.',
        'Đồng bằng sông Cửu Long (ĐBSCL): vựa lúa, trái cây, thuỷ sản của cả nước; thách thức xâm nhập mặn và biến đổi khí hậu.',
      ] },
      { h: 'Biển Đảo Việt Nam' },
      { p: 'Việt Nam có hơn 3.000 đảo; hai quần đảo lớn là Hoàng Sa và Trường Sa thuộc chủ quyền Việt Nam. Biển Đông giàu hải sản, dầu mỏ, là tuyến đường biển quốc tế huyết mạch. Bảo vệ chủ quyền biển đảo là nhiệm vụ thiêng liêng của mỗi công dân.' },
      { h: 'Cầu nối sang lớp 9' },
      { ul: [
        'Lịch sử: Cách mạng Tháng Tám 1945, kháng chiến chống Pháp, kháng chiến chống Mỹ, thống nhất đất nước và đổi mới 1986.',
        'Địa lý: địa lí kinh tế-xã hội Việt Nam chi tiết (dân số, lao động, nông nghiệp, công nghiệp, dịch vụ); địa lí các vùng kinh tế.',
      ] },
      { note: 'Mỗi trang lịch sử là một bài học quý — hãy tự hỏi "Tại sao?" thay vì chỉ nhớ "Cái gì?". Hiểu lí do sẽ giúp em ghi nhớ sự kiện lâu hơn và rút ra bài học cho cuộc sống hôm nay.' },
    ],
    [
      { q: 'Trình bày nguyên nhân và kết quả của phong trào Cần Vương (1885–1895).', a: 'Nguyên nhân: Pháp áp đặt Hiệp ước Patenôtre (1884), biến Việt Nam thành thuộc địa; phe chủ chiến do Tôn Thất Thuyết lãnh đạo phản công Pháp đêm 4/7/1885, thất bại; vua Hàm Nghi ban chiếu Cần Vương kêu gọi nhân dân kháng chiến. Kết quả: phong trào nổ ra sôi nổi ở Bắc và Trung Kì với nhiều cuộc khởi nghĩa tiêu biểu (Bãi Sậy, Ba Đình, Hương Khê); cuối cùng thất bại do thiếu đường lối thống nhất và Pháp đàn áp dã man. Bài học: cần có tổ chức và đường lối cách mạng đúng đắn.' },
      { q: 'So sánh xu hướng bạo động của Phan Bội Châu và xu hướng cải cách của Phan Châu Trinh.', a: 'Phan Bội Châu (bạo động): chủ trương dùng vũ lực đánh đuổi Pháp; cầu viện Nhật Bản qua phong trào Đông Du (1905–1909); thành lập Việt Nam Quang phục hội. Phan Châu Trinh (cải cách-duy tân): chủ trương không dùng bạo lực mà "khai dân trí, chấn dân khí, hậu dân sinh"; hợp tác có điều kiện với Pháp để canh tân đất nước từng bước. Cả hai đều yêu nước sâu sắc nhưng khác nhau về phương pháp và định hướng, phản ánh hai xu hướng cứu nước phổ biến đầu thế kỉ XX.' },
      { q: 'Phân tích tầm quan trọng của sự kiện Nguyễn Tất Thành xuất dương tìm đường cứu nước năm 1911.', a: 'Ngày 5/6/1911, Nguyễn Tất Thành rời bến cảng Nhà Rồng (Sài Gòn) sang Pháp trên tàu Đô đốc La-tu-sơ Tờ-rê-vi-lơ — sự kiện mang ý nghĩa lịch sử trọng đại. Khác với các nhà yêu nước đi trước (cầu Nhật, cầu Pháp), Người chọn đến chính nước Pháp để tìm hiểu và học hỏi. Sau nhiều năm bôn ba khắp các châu lục, Người tiếp thu chủ nghĩa Mác-Lênin và tìm ra con đường cứu nước đúng đắn: cách mạng vô sản theo định hướng độc lập dân tộc gắn liền với chủ nghĩa xã hội. Đây là bước ngoặt quyết định, mở ra trang sử mới cho cách mạng Việt Nam.' },
    ]
  ),
};
