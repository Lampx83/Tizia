// ============================================================
// Lớp 11 · LỊCH SỬ — Lý thuyết tuần (35 tuần · THPT)
// Bám CT GDPT 2018 (Lịch sử 11 — bộ Kết nối tri thức).
// 6 chủ đề: CMTS & CNTB · CNXH 1917→nay · Đông Nam Á ·
//   Chiến tranh bảo vệ Tổ quốc & giải phóng dân tộc · Cải cách lớn · Biển Đông.
// Key trùng id quiz: "H11SU-wNN-quiz".
// ============================================================

export const H11SU_LESSONS = {
  // ──────────────── HK1 · Chủ đề 1: Cách mạng tư sản & CNTB ────────────────
  'H11SU-w01-quiz': {
    topic: 'Một số vấn đề chung về cách mạng tư sản (tiền đề)',
    intro: 'Chào các em! Mở đầu chương trình Lịch sử 11, chúng ta tìm hiểu cách mạng tư sản — những cuộc cách mạng đã làm thay đổi căn bản bộ mặt thế giới từ thế kỷ XVI đến XIX. Hiểu rõ tiền đề, lực lượng và mục tiêu sẽ giúp các em soi chiếu mọi cuộc cách mạng tư sản cụ thể sau này.',
    objectives: [
      'Trình bày được tiền đề (kinh tế, chính trị, xã hội, tư tưởng) của các cuộc cách mạng tư sản.',
      'Phân biệt giai cấp lãnh đạo, động lực và mục tiêu của cách mạng tư sản.',
      'Nêu được ý nghĩa lịch sử chung của các cuộc cách mạng tư sản.',
    ],
    theory: [
      { h: 'Cách mạng tư sản là gì?' },
      { p: 'Cách mạng tư sản là cuộc cách mạng do giai cấp tư sản (có nơi liên minh với quý tộc mới) lãnh đạo, nhằm lật đổ chế độ phong kiến hoặc ách thống trị thuộc địa, mở đường cho chủ nghĩa tư bản phát triển.' },
      { h: 'Tiền đề của cách mạng tư sản' },
      { ul: [
        'Kinh tế: quan hệ sản xuất tư bản chủ nghĩa hình thành và lớn mạnh trong lòng xã hội phong kiến, nhưng bị chế độ cũ kìm hãm.',
        'Chính trị - xã hội: mâu thuẫn giữa giai cấp tư sản, các tầng lớp nhân dân với chế độ phong kiến (hoặc thực dân) ngày càng gay gắt.',
        'Tư tưởng: trào lưu Triết học Ánh sáng (Pháp) và tư tưởng dân chủ tư sản phê phán chế độ chuyên chế, dọn đường cho cách mạng.',
      ] },
      { h: 'Lãnh đạo, động lực, mục tiêu' },
      { p: 'Lãnh đạo là giai cấp tư sản; ở Anh có thêm quý tộc mới. Động lực gồm tư sản, quý tộc mới cùng đông đảo quần chúng nhân dân (nông dân, thợ thủ công, bình dân thành thị). Mục tiêu chung là xoá bỏ rào cản phong kiến, giành chính quyền, mở đường cho kinh tế tư bản chủ nghĩa.' },
      { note: 'Quần chúng nhân dân là lực lượng đông đảo quyết định thắng lợi, nhưng thành quả cách mạng chủ yếu rơi vào tay giai cấp tư sản — đó là tính chất "tư sản" của các cuộc cách mạng này.' },
      { h: 'Ý nghĩa lịch sử' },
      { p: 'Các cuộc cách mạng tư sản đánh đổ chế độ phong kiến, mở ra thời kỳ thắng lợi của chủ nghĩa tư bản đối với phong kiến trên phạm vi thế giới, thúc đẩy lực lượng sản xuất phát triển mạnh mẽ.' },
    ],
    examples: [
      { q: 'Vì sao nói cách mạng tư sản "mở đường cho chủ nghĩa tư bản phát triển"?', a: 'Phân tích: Trước cách mạng, chế độ phong kiến với những đặc quyền, thuế khoá, phường hội đã kìm hãm sản xuất tư bản. Cách mạng xoá bỏ các rào cản đó, giải phóng sức lao động và thị trường, nhờ vậy quan hệ sản xuất tư bản chủ nghĩa được tự do phát triển — đây là ý nghĩa cốt lõi của mọi cuộc cách mạng tư sản.' },
      { q: 'Tại sao quần chúng nhân dân là động lực nhưng cách mạng vẫn mang tính chất tư sản?', a: 'Phân tích: Nhân dân tham gia đông đảo và quyết định thắng lợi, nhưng người lãnh đạo và hưởng thành quả chính là giai cấp tư sản. Mục tiêu cách mạng dừng ở việc thiết lập trật tự tư bản, chưa xoá bỏ áp bức bóc lột — nên bản chất vẫn là cách mạng tư sản.' },
    ],
  },

  'H11SU-w02-quiz': {
    topic: 'Cách mạng tư sản Anh và Chiến tranh giành độc lập ở Bắc Mỹ',
    intro: 'Các em thân mến, tuần này ta khảo sát hai cuộc cách mạng tư sản đầu tiên: cách mạng tư sản Anh thế kỷ XVII và Chiến tranh giành độc lập của 13 thuộc địa Anh ở Bắc Mỹ — nơi khai sinh Hợp chúng quốc Hoa Kỳ.',
    objectives: [
      'Trình bày diễn biến chính và tính chất của cách mạng tư sản Anh.',
      'Trình bày Chiến tranh giành độc lập của 13 thuộc địa Bắc Mỹ.',
      'Nêu được kết quả, ý nghĩa của hai cuộc cách mạng.',
    ],
    theory: [
      { h: 'Cách mạng tư sản Anh (1642-1689)' },
      { p: 'Cách mạng do tư sản và quý tộc mới lãnh đạo, chống lại nền quân chủ chuyên chế của vua Charles I (Sác-lơ I). Nội chiến nổ ra năm 1642; nhà vua bị xử tử năm 1649, nước Anh thành nền cộng hoà.' },
      { p: 'Năm 1688-1689, qua cuộc "Cách mạng vinh quang", Anh thiết lập chế độ quân chủ lập hiến — vua "trị vì nhưng không cai trị", quyền lực thực tế thuộc về Nghị viện.' },
      { note: 'Cách mạng tư sản Anh là cuộc cách mạng KHÔNG triệt để: nó thoả hiệp với quý tộc, duy trì ngôi vua dưới hình thức lập hiến thay vì xoá bỏ hoàn toàn.' },
      { h: 'Chiến tranh giành độc lập ở Bắc Mỹ (1775-1783)' },
      { ul: [
        '13 thuộc địa Anh ở Bắc Mỹ phát triển kinh tế tư bản nhưng bị chính quốc Anh kìm hãm bằng thuế và luật lệ.',
        'Năm 1775 chiến tranh bùng nổ; ngày 4-7-1776 Tuyên ngôn Độc lập (do Thomas Jefferson chấp bút) ra đời, khai sinh Hợp chúng quốc Hoa Kỳ.',
        'Năm 1783 Anh công nhận nền độc lập; Hiến pháp 1787 xác lập thể chế cộng hoà liên bang.',
      ] },
      { p: 'Đây là cuộc cách mạng tư sản diễn ra dưới hình thức một cuộc chiến tranh giải phóng dân tộc: vừa giành độc lập, vừa mở đường cho chủ nghĩa tư bản phát triển ở Bắc Mỹ.' },
    ],
    examples: [
      { q: 'Vì sao cách mạng tư sản Anh được coi là không triệt để?', a: 'Phân tích: Cách mạng kết thúc bằng chế độ quân chủ lập hiến (1689) — giai cấp tư sản thoả hiệp với quý tộc mới, giữ lại ngôi vua thay vì lập nền cộng hoà bền vững. Quyền lợi của quần chúng lao động, đặc biệt vấn đề ruộng đất, chưa được giải quyết. Do đó cách mạng dừng lại nửa vời, mang tính không triệt để.' },
      { q: 'Vì sao nói Chiến tranh giành độc lập ở Bắc Mỹ vừa là chiến tranh giải phóng vừa là cách mạng tư sản?', a: 'Phân tích: Về dân tộc, nó giải phóng 13 thuộc địa khỏi ách thống trị của thực dân Anh, lập ra quốc gia độc lập. Về giai cấp - kinh tế, nó thủ tiêu sự kìm hãm của chính quốc, mở đường cho kinh tế tư bản chủ nghĩa phát triển. Hai mặt đó hoà quyện nên cuộc chiến vừa là giải phóng dân tộc vừa là cách mạng tư sản.' },
    ],
  },

  'H11SU-w03-quiz': {
    topic: 'Cách mạng tư sản Pháp (1789)',
    intro: 'Các em ạ, cách mạng tư sản Pháp 1789 được coi là cuộc cách mạng tư sản triệt để và điển hình nhất thời cận đại. Tuần này ta theo dõi diễn biến từ ngày phá ngục Bastille đến đỉnh cao chuyên chính Giacôbanh và rút ra ý nghĩa quốc tế to lớn của nó.',
    objectives: [
      'Trình bày tiền đề và diễn biến chính của cách mạng Pháp 1789.',
      'Phân tích vai trò của phái Giacôbanh và Tuyên ngôn Nhân quyền - Dân quyền.',
      'Nêu tính chất triệt để và ý nghĩa quốc tế của cách mạng.',
    ],
    theory: [
      { h: 'Bùng nổ cách mạng' },
      { p: 'Nước Pháp cuối thế kỷ XVIII khủng hoảng trầm trọng dưới chế độ quân chủ chuyên chế của vua Louis XVI. Ngày 14-7-1789, quần chúng Paris tấn công phá ngục Bastille — mở đầu cách mạng.' },
      { p: 'Tháng 8-1789, Quốc hội lập hiến thông qua Tuyên ngôn Nhân quyền và Dân quyền, nêu các nguyên tắc "tự do, bình đẳng, quyền tư hữu" — một văn kiện tiến bộ nổi tiếng.' },
      { h: 'Đỉnh cao: chuyên chính Giacôbanh (1793-1794)' },
      { ul: [
        'Phái Giacôbanh do Robespierre (Rô-be-spie) đứng đầu lên nắm quyền giữa lúc thù trong giặc ngoài.',
        'Họ thi hành nhiều biện pháp kiên quyết: giải quyết ruộng đất cho nông dân, ban hành hiến pháp dân chủ, tổng động viên đánh bại liên quân phong kiến châu Âu.',
        'Đây là đỉnh cao của cách mạng — nền chuyên chính dân chủ cách mạng.',
      ] },
      { note: 'Sau đảo chính tháng 7-1794, phái Giacôbanh sụp đổ; cách mạng thoái trào, dẫn tới chế độ Đốc chính rồi nền độc tài quân sự của Napoléon.' },
      { h: 'Tính chất và ý nghĩa' },
      { p: 'Cách mạng Pháp 1789 là cuộc cách mạng tư sản triệt để: lật đổ tận gốc chế độ phong kiến chuyên chế, giải quyết vấn đề ruộng đất, thiết lập nền cộng hoà. Ý nghĩa quốc tế to lớn — cổ vũ mạnh mẽ phong trào cách mạng dân chủ tư sản và giải phóng dân tộc trên toàn thế giới.' },
    ],
    examples: [
      { q: 'Vì sao cách mạng Pháp 1789 được xem là triệt để hơn cách mạng Anh?', a: 'Phân tích: Cách mạng Pháp lật đổ hoàn toàn chế độ phong kiến chuyên chế, xử tử nhà vua, lập nền cộng hoà, và dưới phái Giacôbanh đã giải quyết vấn đề ruộng đất cho nông dân — điều mà cách mạng Anh né tránh. Quần chúng nhân dân được lôi cuốn sâu rộng và đẩy cách mạng tiến lên. Vì vậy tính chất của nó triệt để hơn hẳn.' },
      { q: 'Ý nghĩa quốc tế của cách mạng tư sản Pháp thể hiện như thế nào?', a: 'Phân tích: Khẩu hiệu "Tự do - Bình đẳng - Bác ái" và Tuyên ngôn Nhân quyền lan toả khắp châu Âu, làm rung chuyển các chế độ phong kiến và cổ vũ nhiều cuộc đấu tranh dân chủ. Tinh thần cách mạng còn truyền cảm hứng cho phong trào giải phóng dân tộc ở các nước thuộc địa trong các thế kỷ sau.' },
    ],
  },

  'H11SU-w04-quiz': {
    topic: 'Sự xác lập và phát triển của chủ nghĩa tư bản',
    intro: 'Các em thân mến, sau các cuộc cách mạng tư sản, chủ nghĩa tư bản dần xác lập và lớn mạnh, chuyển từ tự do cạnh tranh sang giai đoạn đế quốc rồi tới chủ nghĩa tư bản hiện đại. Tuần này ta tìm hiểu các giai đoạn đó cùng tiềm năng và hạn chế của nó.',
    objectives: [
      'Trình bày các giai đoạn phát triển của chủ nghĩa tư bản.',
      'Nêu đặc điểm của chủ nghĩa đế quốc và chủ nghĩa tư bản hiện đại.',
      'Phân tích tiềm năng và hạn chế của chủ nghĩa tư bản.',
    ],
    theory: [
      { h: 'Các giai đoạn phát triển' },
      { ul: [
        'Tự do cạnh tranh: từ sau các cuộc cách mạng tư sản đến giữa thế kỷ XIX.',
        'Đế quốc chủ nghĩa: cuối thế kỷ XIX - đầu thế kỷ XX, gắn với việc mở rộng thuộc địa.',
        'Chủ nghĩa tư bản hiện đại: từ sau Chiến tranh thế giới thứ hai đến nay.',
      ] },
      { h: 'Đặc trưng của chủ nghĩa đế quốc' },
      { p: 'Hình thành các tổ chức độc quyền (các-ten, xanh-đi-ca, tơ-rớt). Tư bản công nghiệp kết hợp với tư bản ngân hàng tạo thành tư bản tài chính. Đẩy mạnh xuất khẩu tư bản và xâm chiếm thuộc địa, phân chia thị trường thế giới.' },
      { h: 'Chủ nghĩa tư bản hiện đại' },
      { p: 'Khoa học - công nghệ trở thành lực lượng sản xuất trực tiếp. Nhà nước can thiệp điều tiết nền kinh tế. Hình thức sở hữu và quản lý đa dạng; các công ty xuyên quốc gia chi phối mạnh.' },
      { h: 'Tiềm năng và hạn chế' },
      { note: 'Tiềm năng: khả năng tự điều chỉnh và sức mạnh khoa học - công nghệ giúp chủ nghĩa tư bản vẫn phát triển. Hạn chế cố hữu: mâu thuẫn cơ bản giữa lực lượng sản xuất xã hội hoá ngày càng cao với chế độ chiếm hữu tư nhân tư bản — nguồn gốc của khủng hoảng và bất công xã hội.' },
    ],
    examples: [
      { q: 'Vì sao cuối thế kỷ XIX chủ nghĩa tư bản chuyển sang giai đoạn đế quốc?', a: 'Phân tích: Cách mạng công nghiệp thúc đẩy sản xuất tập trung, dẫn tới cạnh tranh khốc liệt và sự ra đời của các tổ chức độc quyền. Tư bản công nghiệp gắn với tư bản ngân hàng thành tư bản tài chính; nhu cầu nguyên liệu và thị trường buộc các nước đẩy mạnh xâm chiếm thuộc địa. Tổng hợp các yếu tố đó đánh dấu bước chuyển sang chủ nghĩa đế quốc.' },
      { q: 'Mâu thuẫn cơ bản của chủ nghĩa tư bản là gì và biểu hiện ra sao?', a: 'Phân tích: Đó là mâu thuẫn giữa tính chất xã hội hoá ngày càng cao của lực lượng sản xuất với chế độ chiếm hữu tư nhân tư bản chủ nghĩa. Biểu hiện rõ nhất là các cuộc khủng hoảng kinh tế chu kỳ, thất nghiệp và sự phân hoá giàu nghèo — những vấn đề mà bản thân chủ nghĩa tư bản không thể giải quyết tận gốc.' },
    ],
  },

  // ──────────────── Chủ đề 2: Chủ nghĩa xã hội từ 1917 đến nay ────────────────
  'H11SU-w05-quiz': {
    topic: 'Cách mạng tháng Mười Nga và sự hình thành Liên Xô',
    intro: 'Các em ạ, Cách mạng tháng Mười Nga 1917 là sự kiện vĩ đại mở ra một thời đại mới trong lịch sử loài người — thời đại quá độ lên chủ nghĩa xã hội. Tuần này ta tìm hiểu thắng lợi của cách mạng và sự ra đời của nhà nước xã hội chủ nghĩa đầu tiên.',
    objectives: [
      'Trình bày thắng lợi của Cách mạng tháng Mười Nga 1917.',
      'Nêu sự ra đời của Liên bang Cộng hoà XHCN Xô viết (1922).',
      'Phân tích ý nghĩa lịch sử của Cách mạng tháng Mười.',
    ],
    theory: [
      { h: 'Thắng lợi của Cách mạng tháng Mười (1917)' },
      { p: 'Dưới sự lãnh đạo của V.I. Lenin và Đảng Bolshevik, ngày 25-10-1917 (theo lịch Nga, tức 7-11 dương lịch), khởi nghĩa ở Petrograd thắng lợi, lật đổ Chính phủ tư sản lâm thời, lập nên chính quyền Xô viết.' },
      { p: 'Đây là cuộc cách mạng vô sản (xã hội chủ nghĩa) đầu tiên trên thế giới giành thắng lợi, đưa giai cấp công nhân và nhân dân lao động lên nắm chính quyền.' },
      { h: 'Sự thành lập Liên Xô (1922)' },
      { p: 'Sau Nội chiến và đấu tranh chống can thiệp, ngày 30-12-1922 Liên bang Cộng hoà Xã hội chủ nghĩa Xô viết (Liên Xô) được thành lập trên cơ sở liên hiệp các nước cộng hoà Xô viết.' },
      { h: 'Ý nghĩa lịch sử' },
      { ul: [
        'Mở ra thời đại mới — thời đại quá độ từ chủ nghĩa tư bản lên chủ nghĩa xã hội trên phạm vi thế giới.',
        'Cổ vũ mạnh mẽ phong trào cộng sản, công nhân quốc tế.',
        'Soi đường, chỉ lối cho phong trào giải phóng dân tộc ở các nước thuộc địa theo khuynh hướng vô sản.',
      ] },
      { note: 'Với Việt Nam, Nguyễn Ái Quốc đã tìm thấy ở Cách mạng tháng Mười và chủ nghĩa Mác - Lenin con đường cứu nước đúng đắn cho dân tộc.' },
    ],
    examples: [
      { q: 'Vì sao nói Cách mạng tháng Mười Nga mở ra một thời đại mới?', a: 'Phân tích: Lần đầu tiên trong lịch sử, một cuộc cách mạng vô sản giành thắng lợi và lập nên nhà nước của giai cấp công nhân, nhân dân lao động. Nó chứng minh chủ nghĩa xã hội từ lý luận trở thành hiện thực, mở đầu cho thời đại quá độ lên chủ nghĩa xã hội trên phạm vi toàn thế giới — do đó được coi là mốc mở ra thời đại mới.' },
      { q: 'Cách mạng tháng Mười ảnh hưởng đến phong trào giải phóng dân tộc như thế nào?', a: 'Phân tích: Cách mạng nêu tấm gương về việc nhân dân bị áp bức tự đứng lên giải phóng, đồng thời truyền bá chủ nghĩa Mác - Lenin tới các dân tộc thuộc địa. Nhờ đó nhiều nhà yêu nước, trong đó có Nguyễn Ái Quốc, tìm thấy con đường cứu nước theo khuynh hướng vô sản thay cho con đường phong kiến và dân chủ tư sản đã bế tắc.' },
    ],
  },

  'H11SU-w06-quiz': {
    topic: 'Liên Xô xây dựng chủ nghĩa xã hội (1922-1991)',
    intro: 'Các em thân mến, sau khi thành lập, Liên Xô đã trải qua quá trình xây dựng chủ nghĩa xã hội đầy gian khó nhưng đạt nhiều thành tựu kỳ vĩ, đồng thời cũng bộc lộ những hạn chế dẫn đến khủng hoảng. Tuần này ta nhìn lại chặng đường ấy.',
    objectives: [
      'Trình bày các chính sách và thành tựu xây dựng CNXH ở Liên Xô.',
      'Nêu vai trò của Liên Xô trong Chiến tranh thế giới thứ hai.',
      'Phân tích nguyên nhân khủng hoảng và sự tan rã của Liên Xô.',
    ],
    theory: [
      { h: 'Khôi phục và công nghiệp hoá' },
      { p: 'Năm 1921 Lenin đề ra Chính sách kinh tế mới (NEP) khôi phục nền kinh tế sau Nội chiến. Từ cuối thập niên 1920, Liên Xô tiến hành công nghiệp hoá xã hội chủ nghĩa và tập thể hoá nông nghiệp, nhanh chóng trở thành cường quốc công nghiệp.' },
      { h: 'Vai trò trong Chiến tranh thế giới thứ hai' },
      { p: 'Liên Xô là lực lượng chủ chốt trong việc đánh bại chủ nghĩa phát xít Đức, cứu loài người khỏi thảm hoạ phát xít, với cái giá hy sinh to lớn.' },
      { h: 'Thành tựu khoa học - kỹ thuật' },
      { ul: [
        'Năm 1957 phóng thành công vệ tinh nhân tạo đầu tiên của Trái Đất (Sputnik).',
        'Năm 1961 đưa con người (Yuri Gagarin) lần đầu bay vào vũ trụ.',
        'Trở thành một trong hai siêu cường thế giới thời kỳ Chiến tranh lạnh.',
      ] },
      { h: 'Hạn chế và sự tan rã' },
      { note: 'Mô hình tập trung, quan liêu, bao cấp kéo dài khiến nền kinh tế trì trệ, chậm đổi mới. Cải tổ thiếu đúng đắn cùng các yếu tố trong và ngoài nước đã dẫn tới sự sụp đổ của Liên Xô vào cuối năm 1991.' },
    ],
    examples: [
      { q: 'Đánh giá vai trò của Liên Xô trong Chiến tranh thế giới thứ hai.', a: 'Phân tích: Liên Xô gánh chịu phần lớn sức tấn công của phát xít Đức ở mặt trận phía Đông, qua các chiến thắng như Stalingrad và Kursk đã bẻ gãy thế tiến công của địch, rồi giải phóng nhiều nước châu Âu và tiến tới Berlin. Liên Xô là lực lượng chủ chốt tiêu diệt chủ nghĩa phát xít, đóng vai trò quyết định kết thúc chiến tranh.' },
      { q: 'Vì sao mô hình chủ nghĩa xã hội Xô viết bộc lộ hạn chế?', a: 'Phân tích: Mô hình quản lý tập trung quan liêu, bao cấp đã từng phù hợp với thời chiến và công nghiệp hoá ban đầu, nhưng duy trì quá lâu khiến nó triệt tiêu động lực sản xuất, thiếu năng động và chậm ứng dụng tiến bộ khoa học. Khi không kịp thời cải cách đúng hướng, nền kinh tế trì trệ kéo dài, tích tụ khủng hoảng dẫn tới sụp đổ.' },
    ],
  },

  'H11SU-w07-quiz': {
    topic: 'Sự mở rộng và phát triển của CNXH sau năm 1945',
    intro: 'Các em ạ, sau Chiến tranh thế giới thứ hai, chủ nghĩa xã hội từ một nước đã trở thành một hệ thống thế giới. Tuần này ta tìm hiểu sự ra đời của các nước xã hội chủ nghĩa ở Đông Âu, châu Á, Mỹ La-tinh và cả những thử thách của hệ thống đó.',
    objectives: [
      'Trình bày sự hình thành hệ thống xã hội chủ nghĩa thế giới.',
      'Nêu sự ra đời của các nước XHCN tiêu biểu ở châu Á, Mỹ La-tinh.',
      'Nhận biết quá trình khủng hoảng và sụp đổ ở Đông Âu, Liên Xô.',
    ],
    theory: [
      { h: 'Hình thành hệ thống xã hội chủ nghĩa' },
      { p: 'Sau năm 1945, nhiều nước Đông Âu được giải phóng đã đi theo con đường xã hội chủ nghĩa. Cùng với Liên Xô, chủ nghĩa xã hội trở thành một hệ thống thế giới, mở rộng sang châu Á và Mỹ La-tinh.' },
      { h: 'Các nước XHCN tiêu biểu' },
      { ul: [
        'Trung Quốc: nước Cộng hoà Nhân dân Trung Hoa thành lập ngày 1-10-1949.',
        'Cuba: cách mạng thắng lợi năm 1959 do Fidel Castro lãnh đạo — ngọn cờ XHCN ở Mỹ La-tinh.',
        'Việt Nam, Triều Tiên, Lào… cùng nhiều nước Đông Âu xây dựng chế độ mới.',
      ] },
      { h: 'Hợp tác trong hệ thống' },
      { p: 'Năm 1949 các nước XHCN lập Hội đồng Tương trợ kinh tế (SEV) nhằm hợp tác, giúp đỡ nhau về kinh tế; sau đó có thêm khối liên minh chính trị - quân sự.' },
      { h: 'Khủng hoảng và sụp đổ' },
      { note: 'Cuối thập niên 1980 - đầu thập niên 1990, do cải tổ sai lầm cùng nhiều nguyên nhân, chế độ xã hội chủ nghĩa ở Đông Âu và Liên Xô lần lượt sụp đổ (1989-1991). Đây là tổn thất to lớn của phong trào cách mạng thế giới.' },
    ],
    examples: [
      { q: 'Vì sao sau năm 1945 chủ nghĩa xã hội trở thành một hệ thống thế giới?', a: 'Phân tích: Chiến thắng phát xít tạo điều kiện cho nhiều nước Đông Âu được giải phóng và lựa chọn con đường xã hội chủ nghĩa; ở châu Á, Trung Quốc, Việt Nam, Triều Tiên cũng đi theo con đường này, ở Mỹ La-tinh có Cuba. Từ một nước duy nhất là Liên Xô, chủ nghĩa xã hội đã trải khắp nhiều châu lục, hình thành một hệ thống thế giới.' },
      { q: 'Sự sụp đổ của Liên Xô và Đông Âu có phải là sự cáo chung của chủ nghĩa xã hội không?', a: 'Phân tích: Không. Đó là sự sụp đổ của một mô hình cụ thể với nhiều khuyết tật, không phải sự cáo chung của chủ nghĩa xã hội. Trung Quốc, Việt Nam, Lào, Cuba vẫn kiên trì xây dựng chủ nghĩa xã hội theo con đường cải cách, đổi mới và đạt nhiều thành tựu, chứng tỏ sức sống của lý tưởng này.' },
    ],
  },

  'H11SU-w08-quiz': {
    topic: 'Chủ nghĩa xã hội từ 1991 đến nay — cải cách, đổi mới',
    intro: 'Các em thân mến, sau biến động 1991, chủ nghĩa xã hội tiếp tục được kiên trì xây dựng và đổi mới ở một số nước, tiêu biểu là cải cách mở cửa ở Trung Quốc và công cuộc Đổi mới ở Việt Nam. Tuần này ta tìm hiểu thành tựu và ý nghĩa của những công cuộc đó.',
    objectives: [
      'Nêu các nước kiên trì con đường XHCN sau năm 1991.',
      'Trình bày thành tựu cải cách mở cửa của Trung Quốc và Đổi mới của Việt Nam.',
      'Phân tích ý nghĩa của những thành tựu đó.',
    ],
    theory: [
      { h: 'Các nước kiên trì con đường XHCN' },
      { p: 'Sau năm 1991, chủ nghĩa xã hội tiếp tục được xây dựng ở Trung Quốc, Việt Nam, Lào, Cuba và Triều Tiên với những con đường, bước đi phù hợp với điều kiện mỗi nước.' },
      { h: 'Cải cách mở cửa ở Trung Quốc' },
      { p: 'Từ tháng 12-1978, dưới sự khởi xướng của Đặng Tiểu Bình, Trung Quốc tiến hành cải cách mở cửa, xây dựng chủ nghĩa xã hội mang màu sắc Trung Quốc. Nhờ đó Trung Quốc vươn lên thành nền kinh tế lớn thứ hai thế giới.' },
      { h: 'Công cuộc Đổi mới ở Việt Nam' },
      { p: 'Từ Đại hội VI (tháng 12-1986), Việt Nam tiến hành công cuộc Đổi mới toàn diện, phát triển kinh tế thị trường định hướng xã hội chủ nghĩa, đạt nhiều thành tựu to lớn về kinh tế - xã hội và hội nhập quốc tế.' },
      { h: 'Ý nghĩa' },
      { note: 'Thành tựu của Trung Quốc và Việt Nam khẳng định sức sống, tính ưu việt của chủ nghĩa xã hội trong điều kiện mới, chứng minh con đường đi lên CNXH gắn với cải cách, đổi mới là đúng đắn, sáng tạo.' },
    ],
    examples: [
      { q: 'Điểm chung giữa cải cách mở cửa của Trung Quốc và Đổi mới của Việt Nam là gì?', a: 'Phân tích: Cả hai đều giữ vững định hướng xã hội chủ nghĩa và vai trò lãnh đạo của Đảng Cộng sản, đồng thời mạnh dạn phát triển kinh tế thị trường, mở cửa hội nhập quốc tế và đổi mới quản lý. Nhờ kết hợp nguyên tắc với linh hoạt, cả hai nước đều thoát khủng hoảng và phát triển nhanh.' },
      { q: 'Vì sao thành tựu Đổi mới khẳng định sức sống của chủ nghĩa xã hội?', a: 'Phân tích: Sau Đổi mới, Việt Nam từ nước thiếu lương thực, khủng hoảng đã trở thành nước xuất khẩu gạo hàng đầu, tăng trưởng cao, đời sống nhân dân được cải thiện rõ rệt và vị thế quốc tế nâng lên. Những thành quả này cho thấy chủ nghĩa xã hội, khi được vận dụng sáng tạo, vẫn có sức sống và tính ưu việt trong thời đại mới.' },
    ],
  },

  // ──────────────── Chủ đề 3: Đông Nam Á ────────────────
  'H11SU-w09-quiz': {
    topic: 'Quá trình xâm lược của thực dân phương Tây ở Đông Nam Á',
    intro: 'Các em ạ, từ thế kỷ XVI, thực dân phương Tây từng bước xâm lược Đông Nam Á và đến cuối thế kỷ XIX hầu hết khu vực này đã trở thành thuộc địa. Tuần này ta tìm hiểu quá trình đó và lý do vì sao Xiêm giữ được nền độc lập tương đối.',
    objectives: [
      'Trình bày quá trình xâm lược của thực dân phương Tây ở Đông Nam Á.',
      'Xác định các nước trở thành thuộc địa của Anh, Pháp, Hà Lan, Tây Ban Nha.',
      'Giải thích vì sao Xiêm giữ được nền độc lập tương đối.',
    ],
    theory: [
      { h: 'Quá trình xâm lược' },
      { p: 'Từ thế kỷ XVI, Bồ Đào Nha, Tây Ban Nha rồi Hà Lan, Anh, Pháp lần lượt đặt chân tới Đông Nam Á. Đến cuối thế kỷ XIX - đầu thế kỷ XX, hầu hết các nước trong khu vực đã trở thành thuộc địa hoặc lệ thuộc.' },
      { h: 'Sự phân chia thuộc địa' },
      { ul: [
        'Anh chiếm Miến Điện, Mã Lai, Singapore.',
        'Pháp lập Liên bang Đông Dương gồm Việt Nam, Lào, Campuchia.',
        'Hà Lan thống trị In-đô-nê-xi-a (Đông Ấn Hà Lan).',
        'Tây Ban Nha rồi Mỹ chiếm Phi-líp-pin.',
      ] },
      { h: 'Trường hợp Xiêm (Thái Lan)' },
      { p: 'Xiêm là nước duy nhất ở Đông Nam Á giữ được nền độc lập tương đối, nhờ cải cách của vua Rama V và chính sách ngoại giao mềm dẻo, khéo léo lợi dụng mâu thuẫn giữa Anh và Pháp để giữ vị trí "vùng đệm".' },
      { note: 'Tuy giữ độc lập về danh nghĩa, Xiêm vẫn phải nhượng nhiều quyền lợi cho phương Tây và lệ thuộc về kinh tế, đối ngoại.' },
    ],
    examples: [
      { q: 'Vì sao đến cuối thế kỷ XIX hầu hết các nước Đông Nam Á trở thành thuộc địa?', a: 'Phân tích: Đông Nam Á giàu tài nguyên, nằm trên đường giao thương quan trọng, là miếng mồi hấp dẫn của tư bản phương Tây đang cần thuộc địa. Trong khi đó, chế độ phong kiến các nước này lâm vào khủng hoảng, suy yếu, không đủ sức chống lại sự xâm lược có ưu thế về vũ khí, tổ chức của thực dân. Do đó phần lớn khu vực rơi vào ách thuộc địa.' },
      { q: 'Vì sao Xiêm giữ được nền độc lập tương đối còn Việt Nam thì không?', a: 'Phân tích: Xiêm tiến hành cải cách theo hướng tư bản dưới thời Rama V và thực thi ngoại giao khôn khéo, biến mình thành "vùng đệm" giữa thuộc địa Anh và Pháp. Triều Nguyễn ở Việt Nam lại bảo thủ, từ chối canh tân, "bế quan toả cảng", nên không đủ thực lực và cũng không có dư địa ngoại giao để tránh bị Pháp xâm lược.' },
    ],
  },

  'H11SU-w10-quiz': {
    topic: 'Chính sách cai trị của thực dân và hệ quả ở Đông Nam Á',
    intro: 'Các em thân mến, ách thống trị của thực dân để lại những hệ quả sâu sắc cho Đông Nam Á — cả tiêu cực lẫn những biến đổi ngoài ý muốn. Tuần này ta phân tích chính sách cai trị và tác động của nó tới kinh tế, xã hội khu vực.',
    objectives: [
      'Trình bày chính sách cai trị của thực dân phương Tây ở Đông Nam Á.',
      'Phân tích hệ quả tiêu cực và những biến đổi ngoài ý muốn.',
      'Nhận biết sự xuất hiện của các giai cấp xã hội mới.',
    ],
    theory: [
      { h: 'Chính sách cai trị' },
      { p: 'Thực dân chủ yếu nhằm vơ vét tài nguyên, bóc lột nhân công rẻ mạt và biến Đông Nam Á thành thị trường tiêu thụ, nơi cung cấp nguyên liệu. Chúng thi hành chính sách "chia để trị", duy trì giai cấp phong kiến tay sai và kìm hãm phát triển bản địa.' },
      { h: 'Hệ quả tiêu cực' },
      { ul: [
        'Kinh tế các nước lệ thuộc, phát triển méo mó, mất cân đối.',
        'Mất chủ quyền dân tộc, đời sống nhân dân cực khổ.',
        'Văn hoá truyền thống bị chèn ép, xã hội phân hoá sâu sắc.',
      ] },
      { h: 'Những biến đổi ngoài ý muốn' },
      { p: 'Cùng với ách cai trị, một số yếu tố kinh tế - xã hội cận đại của phương Tây được du nhập: phương thức sản xuất tư bản, đô thị, giao thông, trường học. Trên cơ sở đó xuất hiện các giai cấp, tầng lớp mới như tư sản dân tộc, tiểu tư sản và giai cấp công nhân (vô sản).' },
      { note: 'Sự ra đời của giai cấp công nhân và tư sản dân tộc tạo cơ sở xã hội cho các phong trào yêu nước theo khuynh hướng mới — dân chủ tư sản và vô sản — đầu thế kỷ XX.' },
    ],
    examples: [
      { q: 'Vì sao nói kinh tế các nước thuộc địa Đông Nam Á phát triển "méo mó"?', a: 'Phân tích: Thực dân chỉ đầu tư vào những ngành phục vụ vơ vét như khai mỏ, đồn điền cây công nghiệp, còn kìm hãm công nghiệp nặng và sản xuất bản địa để giữ thuộc địa làm thị trường tiêu thụ. Nền kinh tế vì thế mất cân đối, lệ thuộc hoàn toàn vào chính quốc — đó là sự phát triển méo mó, què quặt.' },
      { q: 'Sự xuất hiện giai cấp công nhân và tư sản dân tộc có ý nghĩa gì với phong trào yêu nước?', a: 'Phân tích: Hai giai cấp mới này mang theo những khuynh hướng đấu tranh mới. Tư sản dân tộc là cơ sở của phong trào theo khuynh hướng dân chủ tư sản; giai cấp công nhân, chịu ảnh hưởng Cách mạng tháng Mười, trở thành cơ sở của phong trào theo khuynh hướng vô sản. Nhờ vậy phong trào giải phóng dân tộc bước sang giai đoạn mới đầu thế kỷ XX.' },
    ],
  },

  'H11SU-w11-quiz': {
    topic: 'Hành trình đi đến độc lập của các dân tộc Đông Nam Á',
    intro: 'Các em ạ, từ những phong trào yêu nước cuối thế kỷ XIX đến các cuộc cách mạng giải phóng dân tộc thế kỷ XX, các dân tộc Đông Nam Á đã kiên cường đấu tranh và lần lượt giành độc lập. Tuần này ta theo dõi hành trình ấy.',
    objectives: [
      'Trình bày các giai đoạn của phong trào đấu tranh giành độc lập ở Đông Nam Á.',
      'Nêu sự xuất hiện khuynh hướng vô sản sau Chiến tranh thế giới thứ nhất.',
      'Xác định mốc giành độc lập của các nước tiêu biểu.',
    ],
    theory: [
      { h: 'Các khuynh hướng đấu tranh' },
      { p: 'Cuối thế kỷ XIX - đầu XX, phong trào yêu nước đi từ khuynh hướng phong kiến sang dân chủ tư sản. Sau Chiến tranh thế giới thứ nhất, dưới ảnh hưởng của Cách mạng tháng Mười, xuất hiện thêm khuynh hướng vô sản.' },
      { h: 'Sự ra đời các Đảng Cộng sản' },
      { ul: [
        'Đảng Cộng sản In-đô-nê-xi-a (1920).',
        'Đảng Cộng sản Việt Nam / Đông Dương (1930).',
        'Các đảng này lãnh đạo phong trào theo khuynh hướng vô sản.',
      ] },
      { h: 'Giành độc lập' },
      { ul: [
        'In-đô-nê-xi-a tuyên bố độc lập ngày 17-8-1945.',
        'Việt Nam: Cách mạng tháng Tám 1945 thắng lợi, lập nước Việt Nam Dân chủ Cộng hoà (2-9-1945).',
        'Lào tuyên bố độc lập ngày 12-10-1945.',
        'Nhân dân ba nước Đông Dương kết thúc thắng lợi cuộc kháng chiến chống Mỹ năm 1975.',
      ] },
      { note: 'Cách mạng tháng Tám 1945 ở Việt Nam được coi là sự kiện mở đầu cho thắng lợi của phong trào giải phóng dân tộc ở Đông Nam Á sau Chiến tranh thế giới thứ hai.' },
    ],
    examples: [
      { q: 'Vì sao sau Chiến tranh thế giới thứ nhất, khuynh hướng vô sản xuất hiện ở Đông Nam Á?', a: 'Phân tích: Cách mạng tháng Mười Nga thắng lợi và chủ nghĩa Mác - Lenin được truyền bá đã chỉ ra con đường cứu nước mới. Cùng lúc, giai cấp công nhân ở các nước Đông Nam Á đã trưởng thành. Hai yếu tố đó dẫn tới sự ra đời các Đảng Cộng sản và khuynh hướng vô sản trong phong trào giải phóng dân tộc.' },
      { q: 'Vì sao Cách mạng tháng Tám 1945 có ý nghĩa với cả khu vực Đông Nam Á?', a: 'Phân tích: Đây là một trong những cuộc cách mạng giải phóng dân tộc thành công sớm nhất sau Chiến tranh thế giới thứ hai, lập nên nhà nước độc lập. Thắng lợi đó cổ vũ mạnh mẽ và mở đầu cho làn sóng giành độc lập của các dân tộc Đông Nam Á, chứng minh khả năng tự giải phóng của nhân dân thuộc địa.' },
    ],
  },

  'H11SU-w12-quiz': {
    topic: 'Xây dựng và phát triển ở Đông Nam Á sau khi giành độc lập',
    intro: 'Các em thân mến, sau khi giành độc lập, các nước Đông Nam Á bắt tay xây dựng đất nước theo những con đường khác nhau và cùng nhau lập nên ASEAN — tổ chức gắn kết khu vực. Tuần này ta tìm hiểu công cuộc đó.',
    objectives: [
      'Trình bày công cuộc xây dựng, phát triển ở các nước Đông Nam Á sau độc lập.',
      'Nêu sự ra đời và phát triển của ASEAN.',
      'Xác định vị trí của Việt Nam trong ASEAN.',
    ],
    theory: [
      { h: 'Công cuộc xây dựng đất nước' },
      { p: 'Sau khi giành độc lập, các nước Đông Nam Á tập trung khôi phục, phát triển kinh tế - xã hội theo những con đường riêng. Một số nước đạt thành tựu vượt bậc — Singapore được mệnh danh là "con rồng" châu Á; Việt Nam, Lào tiến hành đổi mới, cải cách từ giữa thập niên 1980.' },
      { h: 'Sự ra đời của ASEAN' },
      { ul: [
        'Hiệp hội các quốc gia Đông Nam Á (ASEAN) thành lập ngày 8-8-1967.',
        'Việt Nam gia nhập ASEAN ngày 28-7-1995.',
        'Đến nay ASEAN có 10 nước thành viên, hướng tới Cộng đồng ASEAN.',
      ] },
      { h: 'Mục tiêu của ASEAN' },
      { p: 'Xây dựng một Cộng đồng ASEAN hoà bình, ổn định, đoàn kết, hợp tác cùng phát triển trên ba trụ cột: chính trị - an ninh, kinh tế, văn hoá - xã hội.' },
      { note: 'Từ một tổ chức của vài nước, ASEAN đã trở thành tổ chức khu vực gắn kết toàn Đông Nam Á, nâng cao vị thế của khu vực trên trường quốc tế.' },
    ],
    examples: [
      { q: 'Vì sao các nước Đông Nam Á thành lập ASEAN?', a: 'Phân tích: Sau độc lập, các nước cần hợp tác để phát triển kinh tế, đồng thời muốn giữ hoà bình, ổn định khu vực giữa bối cảnh Chiến tranh lạnh và can thiệp của các nước lớn. Liên kết khu vực giúp các nước hỗ trợ nhau cùng phát triển và nâng cao tiếng nói chung — đó là lý do ASEAN ra đời năm 1967.' },
      { q: 'Việc Việt Nam gia nhập ASEAN năm 1995 có ý nghĩa gì?', a: 'Phân tích: Gia nhập ASEAN đánh dấu Việt Nam phá thế bao vây, cô lập, mở rộng hội nhập khu vực và quốc tế, tạo môi trường hoà bình thuận lợi cho phát triển. Đồng thời nó góp phần củng cố đoàn kết, hợp tác và đưa ASEAN tiến tới bao gồm toàn bộ Đông Nam Á.' },
    ],
  },

  'H11SU-w13-quiz': {
    topic: 'Ôn tập chủ đề Đông Nam Á cận - hiện đại',
    intro: 'Các em ạ, tuần này ta hệ thống lại toàn bộ chủ đề Đông Nam Á: từ khi bị xâm lược, đấu tranh giành độc lập đến xây dựng và liên kết khu vực, đồng thời rút ra những bài học chung.',
    objectives: [
      'Khái quát con đường lịch sử của Đông Nam Á từ cận đại đến hiện đại.',
      'So sánh các con đường giành độc lập và phát triển của các nước.',
      'Rút ra bài học về đoàn kết và lựa chọn con đường phù hợp.',
    ],
    theory: [
      { h: 'Khái quát tiến trình' },
      { ul: [
        'Cuối XIX - đầu XX: phần lớn các nước trở thành thuộc địa, riêng Xiêm giữ độc lập tương đối.',
        'Đầu - giữa XX: phong trào giải phóng dân tộc theo hai khuynh hướng dân chủ tư sản và vô sản; nhiều nước giành độc lập từ năm 1945.',
        'Sau độc lập: xây dựng đất nước và liên kết khu vực qua ASEAN.',
      ] },
      { h: 'Đặc điểm chung' },
      { p: 'Các dân tộc Đông Nam Á có truyền thống yêu nước, kiên cường đấu tranh; con đường giành độc lập gắn liền với việc lựa chọn đường lối và lực lượng lãnh đạo phù hợp.' },
      { h: 'Bài học lịch sử' },
      { note: 'Bài học lớn là phải đoàn kết dân tộc, lựa chọn con đường cứu nước đúng đắn, biết tận dụng thời cơ và sau độc lập thì hợp tác khu vực để cùng phát triển.' },
      { p: 'Với Việt Nam, sự lựa chọn con đường cách mạng vô sản từ năm 1930 cùng vai trò lãnh đạo của Đảng là nhân tố quyết định thắng lợi.' },
    ],
    examples: [
      { q: 'So sánh con đường giành độc lập của Việt Nam và In-đô-nê-xi-a.', a: 'Phân tích: Cả hai nước đều tận dụng thời cơ Nhật đầu hàng Đồng minh năm 1945 để tuyên bố độc lập. Tuy nhiên Việt Nam đi theo khuynh hướng vô sản dưới sự lãnh đạo của Đảng Cộng sản và phải tiến hành hai cuộc kháng chiến lâu dài để bảo vệ thành quả; In-đô-nê-xi-a chủ yếu theo khuynh hướng dân tộc tư sản. Điểm chung là đều phát huy sức mạnh đoàn kết toàn dân.' },
      { q: 'Từ lịch sử Đông Nam Á, rút ra bài học gì cho sự phát triển khu vực hiện nay?', a: 'Phân tích: Lịch sử cho thấy đoàn kết và hợp tác là chìa khoá: khi chia rẽ, các nước dễ bị chia để trị; khi liên kết qua ASEAN, khu vực có sức mạnh và vị thế lớn hơn. Bài học là phải giữ hoà bình, ổn định, tăng cường hợp tác và lựa chọn con đường phát triển phù hợp với điều kiện mỗi nước.' },
    ],
  },

  // ──────────────── Chủ đề 4: Chiến tranh bảo vệ Tổ quốc & giải phóng dân tộc ────────────────
  'H11SU-w14-quiz': {
    topic: 'Khái quát chiến tranh bảo vệ Tổ quốc trong lịch sử Việt Nam',
    intro: 'Các em thân mến, lịch sử dân tộc ta là lịch sử dựng nước đi đôi với giữ nước. Tuần này ta khái quát những cuộc kháng chiến chống ngoại xâm tiêu biểu — từ chống Tống, Mông - Nguyên đến chống Thanh — và vị trí của chúng trong lịch sử dân tộc.',
    objectives: [
      'Khái quát các cuộc kháng chiến bảo vệ Tổ quốc tiêu biểu.',
      'Xác định người lãnh đạo và triều đại gắn với từng cuộc kháng chiến.',
      'Nhận thức truyền thống chống ngoại xâm của dân tộc.',
    ],
    theory: [
      { h: 'Truyền thống giữ nước' },
      { p: 'Do vị trí chiến lược, dân tộc Việt Nam nhiều lần phải đối phó với các thế lực ngoại xâm, chủ yếu từ phương Bắc và sau này là phương Tây. Truyền thống chống ngoại xâm trở thành nét nổi bật của lịch sử dân tộc.' },
      { h: 'Các cuộc kháng chiến tiêu biểu' },
      { ul: [
        'Kháng chiến chống Tống lần thứ nhất (981) do Lê Hoàn (Lê Đại Hành) lãnh đạo.',
        'Kháng chiến chống Tống lần thứ hai (1075-1077) gắn với Lý Thường Kiệt và bài "Nam quốc sơn hà".',
        'Ba lần kháng chiến chống Mông - Nguyên (thế kỷ XIII) dưới triều Trần, do Trần Hưng Đạo (Trần Quốc Tuấn) chỉ huy.',
        'Kháng chiến chống Thanh (1789) do Nguyễn Huệ - Quang Trung lãnh đạo, với chiến thắng Ngọc Hồi - Đống Đa.',
      ] },
      { note: 'Hầu hết các cuộc kháng chiến đều thắng lợi, bảo vệ vững chắc nền độc lập và toàn vẹn lãnh thổ, để lại nhiều bài học quân sự quý báu.' },
      { h: 'Vị trí trong lịch sử dân tộc' },
      { p: 'Các cuộc kháng chiến bảo vệ Tổ quốc gắn liền với những triều đại phong kiến độc lập (Ngô, Đinh, Tiền Lê, Lý, Trần, Lê sơ, Tây Sơn), thể hiện ý chí tự cường và là nguồn cảm hứng hun đúc tinh thần yêu nước qua các thế hệ.' },
    ],
    examples: [
      { q: 'Vì sao nói lịch sử Việt Nam là lịch sử "dựng nước đi đôi với giữ nước"?', a: 'Phân tích: Do nằm ở vị trí chiến lược và giàu tài nguyên, nước ta liên tục bị các thế lực bên ngoài nhòm ngó. Vì vậy quá trình xây dựng, phát triển đất nước luôn gắn liền với những cuộc chiến đấu bảo vệ chủ quyền. Hai nhiệm vụ dựng nước và giữ nước song hành xuyên suốt lịch sử dân tộc.' },
      { q: 'Đánh giá chiến thắng Ngọc Hồi - Đống Đa năm 1789.', a: 'Phân tích: Chỉ trong vài ngày của dịp Tết Kỷ Dậu, quân Tây Sơn dưới sự chỉ huy thiên tài của Quang Trung đã thần tốc tiến công, đại phá 29 vạn quân Thanh, giải phóng Thăng Long. Đây là một trong những chiến công hiển hách nhất trong lịch sử chống ngoại xâm, thể hiện nghệ thuật "đánh nhanh thắng nhanh" và tinh thần dân tộc quật cường.' },
    ],
  },

  'H11SU-w15-quiz': {
    topic: 'Nguyên nhân thắng lợi và bài học của các cuộc kháng chiến',
    intro: 'Các em ạ, vì sao một dân tộc nhỏ lại nhiều lần đánh bại những đạo quân xâm lược hùng mạnh? Tuần này ta phân tích nguyên nhân thắng lợi, nghệ thuật quân sự và bài học cho công cuộc bảo vệ Tổ quốc hôm nay.',
    objectives: [
      'Phân tích nguyên nhân thắng lợi của các cuộc kháng chiến.',
      'Nêu những nét đặc sắc của nghệ thuật quân sự Việt Nam.',
      'Rút ra bài học cho sự nghiệp xây dựng và bảo vệ Tổ quốc.',
    ],
    theory: [
      { h: 'Nguyên nhân thắng lợi' },
      { ul: [
        'Truyền thống yêu nước, tinh thần đoàn kết toàn dân — nhân tố quyết định.',
        'Đường lối, chiến lược, chiến thuật đúng đắn của các lãnh tụ kiệt xuất.',
        'Tính chất chính nghĩa của cuộc kháng chiến, được nhân dân ủng hộ.',
      ] },
      { h: 'Nghệ thuật quân sự đặc sắc' },
      { p: 'Ông cha ta sáng tạo nghệ thuật "lấy ít địch nhiều, lấy yếu chống mạnh", phát huy chiến tranh nhân dân; kết hợp các kế sách như "vườn không nhà trống", rút lui bảo toàn lực lượng, chọn thời cơ phản công, mai phục, đánh nhanh thắng nhanh.' },
      { h: 'Bài học lịch sử' },
      { note: 'Bài học lớn nhất là phát huy sức mạnh đại đoàn kết toàn dân tộc, kết hợp với đường lối lãnh đạo đúng đắn. Đây là kim chỉ nam cho sự nghiệp xây dựng và bảo vệ Tổ quốc Việt Nam ngày nay.' },
      { p: 'Các cuộc kháng chiến thắng lợi không chỉ bảo vệ độc lập, chủ quyền mà còn giữ gìn bản sắc văn hoá và hun đúc ý chí tự cường của dân tộc.' },
    ],
    examples: [
      { q: 'Vì sao nói tinh thần đoàn kết toàn dân là nguyên nhân quyết định thắng lợi?', a: 'Phân tích: Trước những đạo quân xâm lược đông và mạnh, dân tộc ta thường ở thế ít hơn về quân số, vũ khí. Chỉ khi cả nước một lòng — từ vua tôi nhà Trần đến hội nghị Diên Hồng, đến từng người dân thực hiện "vườn không nhà trống" — mới tạo nên sức mạnh tổng hợp đủ để chiến thắng. Vì vậy đoàn kết toàn dân là nhân tố quyết định.' },
      { q: 'Nghệ thuật "lấy ít địch nhiều, lấy yếu chống mạnh" thể hiện thế nào qua kháng chiến chống Mông - Nguyên?', a: 'Phân tích: Nhà Trần không dàn trận đối đầu trực diện với đội quân Mông - Nguyên hùng mạnh, mà chủ động rút lui, thực hiện "vườn không nhà trống" để làm địch mệt mỏi, thiếu lương thực, rồi chọn đúng thời cơ phản công, tiêu biểu là trận Bạch Đằng năm 1288. Cách đánh đó biến cái yếu thành cái mạnh và giành thắng lợi.' },
    ],
  },

  'H11SU-w16-quiz': {
    topic: 'Một số cuộc khởi nghĩa và chiến tranh giải phóng (thời kỳ Bắc thuộc đến thế kỷ XVIII)',
    intro: 'Các em thân mến, bên cạnh các cuộc kháng chiến bảo vệ Tổ quốc còn có những cuộc khởi nghĩa và chiến tranh giải phóng dân tộc chống ách đô hộ. Tuần này ta tìm hiểu từ Hai Bà Trưng, Bạch Đằng đến khởi nghĩa Lam Sơn và phong trào Tây Sơn.',
    objectives: [
      'Trình bày các cuộc khởi nghĩa tiêu biểu thời Bắc thuộc.',
      'Nêu ý nghĩa của chiến thắng Bạch Đằng 938 và khởi nghĩa Lam Sơn.',
      'Phân tích vai trò của phong trào Tây Sơn.',
    ],
    theory: [
      { h: 'Khởi nghĩa thời Bắc thuộc' },
      { ul: [
        'Khởi nghĩa Hai Bà Trưng (năm 40) chống ách đô hộ nhà Đông Hán.',
        'Khởi nghĩa Bà Triệu (năm 248) chống quân Đông Ngô.',
        'Khởi nghĩa Lý Bí (542) lập nên nước Vạn Xuân.',
      ] },
      { h: 'Chiến thắng Bạch Đằng (938)' },
      { p: 'Ngô Quyền chỉ huy quân dân đánh tan quân Nam Hán trên sông Bạch Đằng bằng kế cắm cọc, chấm dứt hơn một nghìn năm Bắc thuộc, mở ra thời kỳ độc lập, tự chủ lâu dài cho dân tộc.' },
      { h: 'Khởi nghĩa Lam Sơn và phong trào Tây Sơn' },
      { ul: [
        'Khởi nghĩa Lam Sơn (1418-1427) do Lê Lợi, Nguyễn Trãi lãnh đạo, đánh đuổi quân Minh, lập nên triều Lê sơ.',
        'Phong trào Tây Sơn (cuối thế kỷ XVIII) đánh đổ các tập đoàn phong kiến Trịnh - Nguyễn, xoá bỏ tình trạng chia cắt và đánh tan quân Xiêm, quân Thanh xâm lược.',
      ] },
      { note: 'Các cuộc khởi nghĩa và chiến tranh giải phóng thể hiện ý chí độc lập bất khuất; chiến thắng Bạch Đằng 938 là dấu mốc mở ra kỷ nguyên độc lập của dân tộc.' },
    ],
    examples: [
      { q: 'Vì sao chiến thắng Bạch Đằng năm 938 là một mốc son lịch sử?', a: 'Phân tích: Chiến thắng này chấm dứt hơn một nghìn năm Bắc thuộc, khẳng định nền độc lập, tự chủ của dân tộc Việt Nam. Với kế cắm cọc trên sông lợi dụng thuỷ triều, Ngô Quyền tiêu diệt thuỷ quân Nam Hán, mở ra thời kỳ phong kiến độc lập lâu dài. Vì vậy đây được coi là một mốc son chói lọi.' },
      { q: 'Phong trào Tây Sơn có những đóng góp lịch sử nào?', a: 'Phân tích: Phong trào Tây Sơn lật đổ các tập đoàn phong kiến Nguyễn, Trịnh - Lê, xoá bỏ tình trạng chia cắt Đàng Trong - Đàng Ngoài, đặt cơ sở cho việc thống nhất đất nước. Đồng thời, dưới sự lãnh đạo của Nguyễn Huệ - Quang Trung, phong trào đánh tan quân Xiêm (1785) và quân Thanh (1789), bảo vệ độc lập dân tộc. Đó là đóng góp kép vừa dân tộc vừa thống nhất quốc gia.' },
    ],
  },

  'H11SU-w17-quiz': {
    topic: 'Hai cuộc kháng chiến chống Pháp và chống Mỹ (thế kỷ XX)',
    intro: 'Các em ạ, trong thế kỷ XX, dân tộc ta tiến hành thắng lợi hai cuộc kháng chiến chống thực dân Pháp và đế quốc Mỹ, hoàn thành cách mạng dân tộc dân chủ và thống nhất đất nước. Tuần này ta điểm lại những mốc và ý nghĩa lớn.',
    objectives: [
      'Trình bày các mốc lớn của kháng chiến chống Pháp và chống Mỹ.',
      'Nêu ý nghĩa của Cách mạng tháng Tám, Điện Biên Phủ, Đại thắng mùa Xuân 1975.',
      'Phân tích vai trò lãnh đạo của Đảng và Chủ tịch Hồ Chí Minh.',
    ],
    theory: [
      { h: 'Cách mạng tháng Tám 1945' },
      { p: 'Cách mạng tháng Tám thành công, lập nên nước Việt Nam Dân chủ Cộng hoà (2-9-1945), mở ra kỷ nguyên độc lập, tự do và đi lên chủ nghĩa xã hội.' },
      { h: 'Kháng chiến chống Pháp (1945-1954)' },
      { p: 'Chiến thắng Điện Biên Phủ (7-5-1954) "lừng lẫy năm châu, chấn động địa cầu" buộc Pháp ký Hiệp định Genève, kết thúc chiến tranh Đông Dương, miền Bắc được giải phóng.' },
      { h: 'Kháng chiến chống Mỹ (1954-1975)' },
      { ul: [
        'Hiệp định Paris về chấm dứt chiến tranh, lập lại hoà bình ở Việt Nam ký ngày 27-1-1973.',
        'Đại thắng mùa Xuân 1975, đỉnh cao là Chiến dịch Hồ Chí Minh, kết thúc ngày 30-4-1975, giải phóng hoàn toàn miền Nam, thống nhất đất nước.',
      ] },
      { note: 'Vai trò lãnh đạo của Đảng Cộng sản Việt Nam và Chủ tịch Hồ Chí Minh là nhân tố quyết định mọi thắng lợi của cách mạng Việt Nam.' },
    ],
    examples: [
      { q: 'Vì sao chiến thắng Điện Biên Phủ 1954 có ý nghĩa quyết định?', a: 'Phân tích: Điện Biên Phủ đập tan cố gắng quân sự cao nhất của Pháp, làm phá sản kế hoạch Navarre, buộc Pháp phải ngồi vào bàn đàm phán và ký Hiệp định Genève. Chiến thắng này kết thúc cuộc kháng chiến chống Pháp, giải phóng miền Bắc, đồng thời cổ vũ phong trào giải phóng dân tộc trên thế giới — nên có ý nghĩa quyết định.' },
      { q: 'Ý nghĩa của Đại thắng mùa Xuân 1975 đối với dân tộc.', a: 'Phân tích: Đại thắng mùa Xuân 1975 kết thúc thắng lợi cuộc kháng chiến chống Mỹ cứu nước, hoàn thành cách mạng dân tộc dân chủ nhân dân trong cả nước, giải phóng hoàn toàn miền Nam và thống nhất đất nước. Đây là thắng lợi vĩ đại mở ra kỷ nguyên độc lập, thống nhất, cả nước đi lên chủ nghĩa xã hội.' },
    ],
  },

  'H11SU-w18-quiz': {
    topic: 'Ôn tập học kỳ I',
    intro: 'Các em thân mến, tuần này ta hệ thống lại kiến thức học kỳ I: từ các cuộc cách mạng tư sản, sự phát triển của chủ nghĩa tư bản và chủ nghĩa xã hội, đến Đông Nam Á và truyền thống chống ngoại xâm của dân tộc.',
    objectives: [
      'Hệ thống hoá kiến thức bốn chủ đề đã học trong học kỳ I.',
      'Liên hệ, so sánh các sự kiện và quá trình lịch sử lớn.',
      'Rèn kỹ năng phân tích, đánh giá ý nghĩa lịch sử.',
    ],
    theory: [
      { h: 'Cách mạng tư sản và chủ nghĩa tư bản' },
      { p: 'Các cuộc cách mạng tư sản Anh, Mỹ, Pháp đều mở đường cho chủ nghĩa tư bản phát triển. Chủ nghĩa tư bản trải qua các giai đoạn tự do cạnh tranh, đế quốc và hiện đại, mang trong mình mâu thuẫn cơ bản giữa lực lượng sản xuất xã hội hoá và chế độ chiếm hữu tư nhân.' },
      { h: 'Chủ nghĩa xã hội' },
      { p: 'Cách mạng tháng Mười Nga 1917 mở ra thời đại quá độ lên chủ nghĩa xã hội. Hệ thống XHCN từng phát triển mạnh rồi khủng hoảng, nhưng vẫn được kiên trì xây dựng qua cải cách, đổi mới ở Trung Quốc, Việt Nam.' },
      { h: 'Đông Nam Á và lịch sử dân tộc' },
      { ul: [
        'Đông Nam Á từ thuộc địa đến độc lập và liên kết ASEAN.',
        'Việt Nam có truyền thống chống ngoại xâm với nhiều chiến công như Bạch Đằng, Chi Lăng, Đống Đa.',
      ] },
      { note: 'Bài học xuyên suốt: phát huy sức mạnh đoàn kết toàn dân kết hợp với đường lối lãnh đạo đúng đắn là chìa khoá của mọi thắng lợi.' },
    ],
    examples: [
      { q: 'So sánh ý nghĩa quốc tế của cách mạng tư sản Pháp 1789 và Cách mạng tháng Mười Nga 1917.', a: 'Phân tích: Cách mạng Pháp 1789 cổ vũ phong trào dân chủ tư sản và giải phóng dân tộc, làm lung lay chế độ phong kiến châu Âu. Cách mạng tháng Mười Nga 1917 thì mở ra thời đại mới — thời đại quá độ lên chủ nghĩa xã hội, soi đường cho phong trào giải phóng dân tộc theo khuynh hướng vô sản. Cả hai đều có tầm ảnh hưởng thế giới nhưng ở những giai đoạn và tính chất khác nhau.' },
      { q: 'Bài học chung rút ra từ các cuộc kháng chiến chống ngoại xâm của dân tộc là gì?', a: 'Phân tích: Bài học chung là phải phát huy sức mạnh đại đoàn kết toàn dân tộc, dưới sự lãnh đạo với đường lối đúng đắn, biết phát huy nghệ thuật quân sự "lấy ít địch nhiều" và chọn đúng thời cơ. Đây là kinh nghiệm quý cho sự nghiệp xây dựng và bảo vệ Tổ quốc ngày nay.' },
    ],
  },

  // ──────────────── HK2 · Chủ đề 5: Một số cuộc cải cách lớn trong LSVN ────────────────
  'H11SU-w19-quiz': {
    topic: 'Cải cách của Hồ Quý Ly và triều Hồ — bối cảnh',
    intro: 'Các em ạ, bước sang học kỳ II, ta tìm hiểu các cuộc cải cách lớn trong lịch sử dân tộc. Mở đầu là cải cách của Hồ Quý Ly cuối thế kỷ XIV - đầu XV — một cuộc cải cách táo bạo ra đời trong bối cảnh đầy thử thách.',
    objectives: [
      'Trình bày bối cảnh lịch sử dẫn đến cải cách của Hồ Quý Ly.',
      'Nêu mục đích và một số nội dung cải cách về kinh tế, ruộng đất.',
      'Bước đầu đánh giá tính chất cuộc cải cách.',
    ],
    theory: [
      { h: 'Bối cảnh lịch sử' },
      { p: 'Cuối thế kỷ XIV, nhà Trần lâm vào khủng hoảng, suy yếu trầm trọng: kinh tế sa sút, mâu thuẫn xã hội gay gắt, khởi nghĩa nông dân nổ ra, trong khi nguy cơ xâm lược từ nhà Minh phương Bắc ngày càng rõ.' },
      { h: 'Sự ra đời của triều Hồ' },
      { p: 'Năm 1400, Hồ Quý Ly phế truất nhà Trần, lập nên triều Hồ. Ông tiến hành cải cách nhằm khắc phục khủng hoảng, củng cố quốc gia và tăng cường khả năng phòng thủ trước nguy cơ ngoại xâm.' },
      { h: 'Một số nội dung kinh tế - ruộng đất' },
      { ul: [
        'Phát hành tiền giấy "Thông bảo hội sao" — loại tiền giấy đầu tiên ở Việt Nam.',
        'Thi hành chính sách "hạn điền": giới hạn ruộng đất tư hữu nhằm hạn chế quyền lực của địa chủ, quý tộc.',
      ] },
      { note: 'Cải cách Hồ Quý Ly là một cuộc cải cách toàn diện, táo bạo, mang nhiều nội dung mới mẻ so với thời đại, thể hiện tinh thần dám đổi mới của ông.' },
    ],
    examples: [
      { q: 'Vì sao Hồ Quý Ly tiến hành cải cách?', a: 'Phân tích: Nhà Trần cuối thế kỷ XIV khủng hoảng toàn diện, đất nước suy yếu trong khi nhà Minh đang lăm le xâm lược. Để cứu vãn tình thế, củng cố nhà nước và tăng sức mạnh phòng thủ, Hồ Quý Ly buộc phải tiến hành những cải cách mạnh mẽ về kinh tế, xã hội, quân sự. Đó là đòi hỏi khách quan của bối cảnh lịch sử.' },
      { q: 'Chính sách "hạn điền" nhằm mục đích gì?', a: 'Phân tích: "Hạn điền" giới hạn số ruộng đất tư mà mỗi người được sở hữu, qua đó hạn chế sự bành trướng của tầng lớp địa chủ, quý tộc lớn và tăng nguồn ruộng đất, tô thuế cho nhà nước. Mục đích sâu xa là làm suy yếu thế lực cũ, củng cố quyền lực của chính quyền trung ương.' },
    ],
  },

  'H11SU-w20-quiz': {
    topic: 'Nội dung và ý nghĩa cải cách Hồ Quý Ly',
    intro: 'Các em thân mến, tuần này ta đi sâu vào những nội dung còn lại của cải cách Hồ Quý Ly về xã hội, giáo dục, quân sự và rút ra ý nghĩa cùng nguyên nhân thất bại của triều Hồ.',
    objectives: [
      'Trình bày nội dung cải cách về xã hội, giáo dục, quân sự.',
      'Phân tích hạn chế và kết cục của triều Hồ.',
      'Đánh giá ý nghĩa và bài học từ cải cách.',
    ],
    theory: [
      { h: 'Nội dung cải cách' },
      { ul: [
        'Xã hội: chính sách "hạn nô" hạn chế số nô tì trong các nhà quý tộc.',
        'Giáo dục: đề cao chữ Nôm và tinh thần tự cường dân tộc, dịch sách chữ Hán ra chữ Nôm.',
        'Quân sự: tăng cường quân đội, xây thành Tây Đô (thành nhà Hồ) kiên cố — nay là Di sản văn hoá thế giới.',
      ] },
      { h: 'Hạn chế và kết cục' },
      { p: 'Cải cách được tiến hành vội vàng, một số chính sách chưa lôi cuốn được sự ủng hộ rộng rãi của nhân dân. Năm 1407, quân Minh xâm lược, triều Hồ nhanh chóng thất bại, đất nước rơi vào ách đô hộ.' },
      { h: 'Ý nghĩa và bài học' },
      { note: 'Dù thất bại, cải cách Hồ Quý Ly là cuộc cải cách táo bạo, để lại bài học sâu sắc: cải cách phải hợp lòng dân, có lộ trình phù hợp và phải gắn với việc củng cố khối đoàn kết toàn dân tộc.' },
    ],
    examples: [
      { q: 'Vì sao triều Hồ nhanh chóng thất bại trước quân Minh?', a: 'Phân tích: Cải cách tiến hành quá nhanh, nhiều chính sách động chạm quyền lợi và chưa được nhân dân đồng tình, khiến nhà Hồ không tập hợp được sức mạnh toàn dân. Khi quân Minh xâm lược năm 1407, triều Hồ thiếu hậu thuẫn của lòng dân nên thất bại nhanh chóng. Đó là bài học về vai trò quyết định của lòng dân.' },
      { q: 'Đánh giá ý nghĩa của cải cách Hồ Quý Ly.', a: 'Phân tích: Cải cách Hồ Quý Ly tuy thất bại nhưng mang tính tiến bộ và táo bạo: tiền giấy, hạn điền, hạn nô, đề cao chữ Nôm đều vượt trước thời đại. Nó để lại bài học lớn rằng đổi mới đất nước phải gắn với lòng dân và có bước đi thích hợp — bài học còn nguyên giá trị cho công cuộc cải cách sau này.' },
    ],
  },

  'H11SU-w21-quiz': {
    topic: 'Cải cách của Lê Thánh Tông — bối cảnh và tổ chức nhà nước',
    intro: 'Các em ạ, cải cách của Lê Thánh Tông giữa thế kỷ XV đã đưa Đại Việt đạt tới đỉnh cao của mô hình nhà nước quân chủ trung ương tập quyền. Tuần này ta tìm hiểu bối cảnh, mục tiêu và tổ chức bộ máy nhà nước thời ông.',
    objectives: [
      'Trình bày bối cảnh và mục tiêu cải cách của Lê Thánh Tông.',
      'Nêu nội dung cải cách về hành chính và bộ máy nhà nước.',
      'Đánh giá mức độ hoàn chỉnh của mô hình nhà nước.',
    ],
    theory: [
      { h: 'Bối cảnh và mục tiêu' },
      { p: 'Lê Thánh Tông lên ngôi năm 1460, khi triều Lê sơ vừa được củng cố nhưng bộ máy nhà nước còn nhiều bất cập, quyền lực một số quan lại lớn. Ông tiến hành cải cách nhằm xây dựng một nhà nước quân chủ trung ương tập quyền vững mạnh.' },
      { h: 'Cải cách hành chính địa phương' },
      { p: 'Lê Thánh Tông chia lại cả nước thành 13 đạo thừa tuyên cùng phủ Trung Đô; mỗi đạo có ba ty phụ trách hành chính, quân sự và giám sát, giúp triều đình kiểm soát chặt chẽ địa phương.' },
      { h: 'Bộ máy trung ương' },
      { ul: [
        'Tổ chức Lục bộ (sáu bộ) đảm nhiệm các công việc chủ yếu của nhà nước.',
        'Lập các cơ quan giám sát, tư vấn như Ngự sử đài, Hàn lâm viện.',
        'Tăng cường quyền lực tập trung vào tay nhà vua.',
      ] },
      { note: 'Hệ thống tổ chức nhà nước thời Lê Thánh Tông được đánh giá là hoàn chỉnh và quy củ nhất trong lịch sử các triều đại phong kiến Việt Nam.' },
    ],
    examples: [
      { q: 'Vì sao mô hình nhà nước thời Lê Thánh Tông được đánh giá là hoàn chỉnh nhất?', a: 'Phân tích: Bộ máy được tổ chức chặt chẽ từ trung ương đến địa phương, với Lục bộ, các cơ quan giám sát và hệ thống 13 đạo thừa tuyên có ba ty độc lập kiểm soát lẫn nhau. Quyền lực tập trung cao vào nhà vua, hạn chế lạm quyền của quan lại. Sự quy củ và cân đối đó khiến mô hình này trở thành đỉnh cao của nhà nước quân chủ tập quyền Việt Nam.' },
      { q: 'Mục tiêu cốt lõi trong cải cách hành chính của Lê Thánh Tông là gì?', a: 'Phân tích: Cốt lõi là tăng cường quyền lực trung ương và sự kiểm soát của nhà vua đối với toàn bộ đất nước. Việc chia đạo thừa tuyên với ba ty riêng biệt, lập cơ quan giám sát, đều nhằm phân tán quyền lực địa phương và buộc mọi cấp phục tùng triều đình. Đó là tinh thần trung ương tập quyền xuyên suốt cuộc cải cách.' },
    ],
  },

  'H11SU-w22-quiz': {
    topic: 'Nội dung và ý nghĩa cải cách Lê Thánh Tông',
    intro: 'Các em thân mến, tuần này ta tìm hiểu các nội dung cải cách về pháp luật, giáo dục, quân sự thời Lê Thánh Tông — đặc biệt là bộ Luật Hồng Đức nổi tiếng — và rút ra ý nghĩa của cuộc cải cách.',
    objectives: [
      'Trình bày cải cách về pháp luật, giáo dục, quân sự thời Lê Thánh Tông.',
      'Nêu giá trị của bộ Luật Hồng Đức.',
      'Đánh giá ý nghĩa và bài học của cuộc cải cách.',
    ],
    theory: [
      { h: 'Pháp luật — Luật Hồng Đức' },
      { p: 'Lê Thánh Tông ban hành bộ Quốc triều hình luật (Luật Hồng Đức) — bộ luật hoàn chỉnh, tiêu biểu của nhà nước phong kiến Việt Nam, có những điểm tiến bộ như bảo vệ một phần quyền lợi của phụ nữ, người lao động và dân thường.' },
      { h: 'Giáo dục và quân sự' },
      { ul: [
        'Mở rộng giáo dục, khoa cử Nho học; dựng bia tiến sĩ ở Văn Miếu để khắc tên người đỗ đạt.',
        'Tổ chức quân đội chính quy, ban hành phép quân điền chia ruộng cho binh sĩ và dân đinh.',
      ] },
      { h: 'Ý nghĩa và bài học' },
      { p: 'Cải cách đưa Đại Việt phát triển cường thịnh ở thế kỷ XV, củng cố vững chắc nhà nước trung ương tập quyền. Bài học để lại là phải hoàn thiện bộ máy nhà nước và đề cao vai trò của pháp luật trong quản lý đất nước.' },
      { note: 'Luật Hồng Đức và hệ thống khoa cử thời Lê Thánh Tông là những di sản pháp lý, giáo dục quý báu, phản ánh trình độ tổ chức nhà nước cao của Đại Việt.' },
    ],
    examples: [
      { q: 'Vì sao Luật Hồng Đức được đánh giá là có nhiều điểm tiến bộ?', a: 'Phân tích: Trong khuôn khổ một bộ luật phong kiến, Luật Hồng Đức vẫn có những điều khoản bảo vệ quyền lợi của phụ nữ (quyền tài sản, quyền trong hôn nhân), bảo vệ người lao động và dân thường ở mức độ nhất định. So với nhiều bộ luật cùng thời, đây là những nội dung nhân văn, tiến bộ đáng ghi nhận.' },
      { q: 'Cải cách giáo dục - khoa cử của Lê Thánh Tông có tác dụng gì?', a: 'Phân tích: Việc mở rộng khoa cử Nho học và dựng bia tiến sĩ khuyến khích học tập, tuyển chọn nhân tài cho bộ máy nhà nước, đề cao việc học và đạo lý. Nhờ đó nhà nước có đội ngũ quan lại được đào tạo, góp phần làm cho triều đại cường thịnh và để lại truyền thống hiếu học cho dân tộc.' },
    ],
  },

  'H11SU-w23-quiz': {
    topic: 'Cải cách của Minh Mạng — bối cảnh và cải cách hành chính địa phương',
    intro: 'Các em ạ, cải cách của vua Minh Mạng đầu thế kỷ XIX đã định hình bộ máy hành chính mà dấu ấn còn lưu đến tận ngày nay qua việc chia cả nước thành các tỉnh. Tuần này ta tìm hiểu bối cảnh và cải cách hành chính địa phương của ông.',
    objectives: [
      'Trình bày bối cảnh cải cách của Minh Mạng.',
      'Nêu nội dung cải cách hành chính địa phương (chia tỉnh).',
      'Phân tích mục đích tập trung quyền lực trung ương.',
    ],
    theory: [
      { h: 'Bối cảnh' },
      { p: 'Minh Mạng là vua thứ hai của triều Nguyễn (1820-1841). Khi lên ngôi, đất nước tuy đã thống nhất nhưng bộ máy quản lý địa phương còn cồng kềnh: cả nước chia thành Bắc Thành, Gia Định Thành và các trấn, quyền lực địa phương lớn, dễ phân tán.' },
      { h: 'Cải cách hành chính địa phương' },
      { ul: [
        'Bãi bỏ Bắc Thành và Gia Định Thành cùng cấp trấn.',
        'Năm 1831-1832, chia cả nước thành 30 tỉnh và phủ Thừa Thiên.',
        'Đặt các chức quan đứng đầu tỉnh trực thuộc triều đình.',
      ] },
      { h: 'Mục đích' },
      { note: 'Mục đích cốt lõi là tăng cường quyền lực của chính quyền trung ương, kiểm soát chặt chẽ các địa phương, khắc phục tình trạng phân quyền và thống nhất quản lý trên cả nước.' },
      { p: 'Đây là cuộc cải cách hành chính quy mô lớn, đặt nền móng cho cách phân chia đơn vị hành chính tỉnh tồn tại lâu dài về sau.' },
    ],
    examples: [
      { q: 'Vì sao Minh Mạng bãi bỏ Bắc Thành và Gia Định Thành?', a: 'Phân tích: Bắc Thành và Gia Định Thành là những đơn vị hành chính lớn với quyền lực tập trung trong tay các tổng trấn, dễ tạo thế "cát cứ" và làm suy yếu sự kiểm soát của triều đình. Bãi bỏ chúng, chia nhỏ cả nước thành tỉnh trực thuộc trung ương giúp Minh Mạng nắm chắc địa phương và củng cố quyền lực tập trung.' },
      { q: 'Cải cách chia tỉnh của Minh Mạng có ý nghĩa lâu dài như thế nào?', a: 'Phân tích: Việc chia cả nước thành các tỉnh năm 1831-1832 tạo ra một mô hình hành chính thống nhất, gọn và dễ quản lý. Mô hình tỉnh này về cơ bản được kế thừa và là nền tảng cho hệ thống hành chính cấp tỉnh của Việt Nam đến ngày nay — đó là di sản lâu bền nhất của cuộc cải cách.' },
    ],
  },

  'H11SU-w24-quiz': {
    topic: 'Cải cách Minh Mạng — bộ máy trung ương và kết quả',
    intro: 'Các em thân mến, tuần này ta tìm hiểu cải cách của Minh Mạng ở cấp trung ương, chính sách với miền núi và nông nghiệp, cùng những kết quả, hạn chế và ý nghĩa của cuộc cải cách.',
    objectives: [
      'Trình bày cải cách bộ máy trung ương và chính sách dân tộc của Minh Mạng.',
      'Nêu kết quả và hạn chế của cuộc cải cách.',
      'Đánh giá ý nghĩa lịch sử của cải cách Minh Mạng.',
    ],
    theory: [
      { h: 'Bộ máy trung ương' },
      { p: 'Minh Mạng lập thêm các cơ quan giúp việc cho vua như Nội các và Cơ mật viện, hoàn thiện bộ máy hành chính trung ương; pháp luật vận hành chủ yếu theo bộ Hoàng Việt luật lệ (Luật Gia Long).' },
      { h: 'Chính sách dân tộc và kinh tế' },
      { ul: [
        'Thực hiện "cải thổ quy lưu": bãi bỏ chế độ thổ ty ở miền núi, đặt quan cai trị như miền xuôi.',
        'Quan tâm nông nghiệp: khuyến khích khai hoang, lập đồn điền, sửa đắp đê điều.',
      ] },
      { h: 'Hạn chế và ý nghĩa' },
      { p: 'Hạn chế: tư tưởng vẫn nặng Nho giáo bảo thủ, chính sách "đóng cửa" khiến đất nước chậm tiếp cận khoa học - kỹ thuật phương Tây. Ý nghĩa: hoàn thiện mô hình nhà nước quân chủ tập quyền, để lại di sản về tổ chức hành chính, nhất là việc chia tỉnh.' },
      { note: 'Cải cách Minh Mạng củng cố sự thống nhất quốc gia và quản lý hành chính, nhưng sự bảo thủ về tư tưởng cũng góp phần khiến triều Nguyễn tụt hậu trước nguy cơ xâm lược của phương Tây.' },
    ],
    examples: [
      { q: 'Chính sách "cải thổ quy lưu" của Minh Mạng nhằm mục đích gì?', a: 'Phân tích: "Cải thổ quy lưu" bãi bỏ chế độ thổ ty cha truyền con nối ở miền núi, thay bằng quan lại do triều đình bổ nhiệm như ở miền xuôi. Mục đích là xoá bỏ tình trạng tự trị của các thủ lĩnh địa phương, thống nhất quản lý hành chính trên cả nước và tăng cường quyền lực của trung ương đến tận vùng dân tộc thiểu số.' },
      { q: 'Vì sao nói sự bảo thủ trong cải cách Minh Mạng để lại hệ quả lâu dài?', a: 'Phân tích: Minh Mạng giỏi về tổ chức hành chính nhưng vẫn giữ tư tưởng Nho giáo bảo thủ và chính sách "đóng cửa", từ chối canh tân theo phương Tây. Vì thế đất nước không kịp hiện đại hoá quân sự, kinh tế, dẫn đến tụt hậu và suy yếu trước làn sóng xâm lược của thực dân phương Tây giữa thế kỷ XIX — một hệ quả lâu dài, nặng nề.' },
    ],
  },

  'H11SU-w25-quiz': {
    topic: 'Ôn tập chủ đề các cuộc cải cách trong lịch sử Việt Nam',
    intro: 'Các em ạ, tuần này ta hệ thống và so sánh ba cuộc cải cách lớn — Hồ Quý Ly, Lê Thánh Tông, Minh Mạng — để rút ra những điểm chung, khác biệt và bài học.',
    objectives: [
      'So sánh bối cảnh, nội dung và kết quả của ba cuộc cải cách.',
      'Xác định cuộc cải cách hoàn thiện nhất về mặt nhà nước.',
      'Rút ra bài học chung từ các cuộc cải cách.',
    ],
    theory: [
      { h: 'Điểm chung' },
      { p: 'Cả ba cuộc cải cách đều nhằm củng cố và phát triển nhà nước, tăng cường quyền lực trung ương, đều do người đứng đầu nhà nước khởi xướng và đều để lại dấu ấn trong lịch sử.' },
      { h: 'Điểm khác biệt nổi bật' },
      { ul: [
        'Hồ Quý Ly: táo bạo, nhiều nội dung mới nhưng thất bại nhanh do thiếu sự ủng hộ và gặp ngoại xâm.',
        'Lê Thánh Tông: hoàn thiện nhất về tổ chức nhà nước, đưa đất nước cường thịnh.',
        'Minh Mạng: để lại di sản hành chính lâu dài (mô hình tỉnh) nhưng còn bảo thủ.',
      ] },
      { h: 'Hạn chế chung và bài học' },
      { note: 'Hạn chế chung: các cuộc cải cách vẫn trong khuôn khổ phong kiến, chưa giải quyết tận gốc mâu thuẫn xã hội. Bài học: cải cách phải dựa vào dân, làm có hệ thống và phù hợp với thực tiễn đất nước.' },
    ],
    examples: [
      { q: 'Vì sao cải cách Lê Thánh Tông được coi là thành công và hoàn thiện nhất?', a: 'Phân tích: Khác với cải cách Hồ Quý Ly thất bại nhanh, cải cách Lê Thánh Tông được tiến hành trong điều kiện đất nước ổn định, có lộ trình bài bản và được duy trì lâu dài. Nó xây dựng bộ máy nhà nước quy củ nhất, ban hành Luật Hồng Đức tiến bộ và đưa Đại Việt cường thịnh ở thế kỷ XV. Vì vậy đây là cuộc cải cách hoàn thiện và thành công nhất.' },
      { q: 'Vì sao cải cách Hồ Quý Ly thất bại nhanh còn Lê Thánh Tông, Minh Mạng để lại dấu ấn lâu dài?', a: 'Phân tích: Cải cách Hồ Quý Ly diễn ra vội vàng, thiếu sự đồng thuận của nhân dân và gặp ngay nạn ngoại xâm nhà Minh. Trong khi đó, Lê Thánh Tông và Minh Mạng cải cách khi đất nước đã thống nhất, ổn định, có thời gian thực thi và củng cố. Yếu tố lòng dân, sự ổn định và thời gian thực hiện chính là điều tạo nên khác biệt về kết quả.' },
    ],
  },

  'H11SU-w26-quiz': {
    topic: 'Sơ kết — bài học cải cách cho công cuộc đổi mới hiện nay',
    intro: 'Các em thân mến, từ những cuộc cải cách trong lịch sử, dân tộc ta rút ra nhiều bài học quý cho công cuộc Đổi mới ngày nay. Tuần này ta liên hệ lịch sử với hiện tại.',
    objectives: [
      'Liên hệ bài học cải cách lịch sử với công cuộc Đổi mới.',
      'Nêu vai trò của lãnh đạo đúng đắn và đoàn kết toàn dân.',
      'Nhận thức ý nghĩa của việc học lịch sử cải cách.',
    ],
    theory: [
      { h: 'Bài học từ lịch sử cải cách' },
      { p: 'Lịch sử cho thấy cải cách chỉ thành công khi hợp lòng dân, hợp với xu thế thời đại và được tiến hành có tổ chức, có lộ trình. Thất bại của Hồ Quý Ly và thành công của Lê Thánh Tông là hai bài học đối lập sâu sắc.' },
      { h: 'Công cuộc Đổi mới ở Việt Nam' },
      { p: 'Công cuộc Đổi mới từ năm 1986 là một cuộc cải cách toàn diện, sâu sắc trong thời kỳ mới, được tiến hành dưới sự lãnh đạo đúng đắn của Đảng và phát huy sức mạnh đoàn kết toàn dân.' },
      { h: 'Yếu tố then chốt' },
      { ul: [
        'Sự lãnh đạo sáng suốt, đường lối đúng đắn.',
        'Phát huy khối đại đoàn kết toàn dân tộc.',
        'Coi khoa học - công nghệ và đổi mới sáng tạo là động lực phát triển.',
      ] },
      { note: 'Học lịch sử cải cách không chỉ để biết quá khứ mà còn để vận dụng các bài học vào quản lý và phát triển đất nước hôm nay.' },
    ],
    examples: [
      { q: 'Bài học nào từ lịch sử cải cách được vận dụng trong công cuộc Đổi mới?', a: 'Phân tích: Bài học quan trọng nhất là cải cách phải hợp lòng dân và phù hợp với xu thế thời đại, đồng thời có tổ chức, có bước đi vững chắc. Công cuộc Đổi mới từ 1986 đã vận dụng đúng tinh thần ấy: vừa kiên định định hướng, vừa linh hoạt, dựa vào dân và hội nhập theo xu thế thế giới, nhờ đó đạt nhiều thành tựu.' },
      { q: 'Vì sao học lịch sử các cuộc cải cách lại có ý nghĩa thực tiễn?', a: 'Phân tích: Các cuộc cải cách trong lịch sử để lại bài học về thời cơ, lòng dân, lộ trình và vai trò lãnh đạo. Học và hiểu chúng giúp thế hệ hôm nay tránh lặp lại sai lầm quá khứ, biết cách tiến hành đổi mới hiệu quả. Vì vậy lịch sử cải cách có giá trị thực tiễn trực tiếp đối với quản lý, phát triển đất nước.' },
    ],
  },

  // ──────────────── Chủ đề 6: Lịch sử bảo vệ chủ quyền trên Biển Đông ────────────────
  'H11SU-w27-quiz': {
    topic: 'Vị trí và tầm quan trọng của Biển Đông',
    intro: 'Các em ạ, Biển Đông có vị trí địa - chiến lược và giá trị kinh tế đặc biệt quan trọng đối với khu vực và thế giới, nhất là với Việt Nam. Tuần này ta tìm hiểu vị trí, tài nguyên và tầm quan trọng của Biển Đông.',
    objectives: [
      'Xác định vị trí địa lý của Biển Đông.',
      'Nêu nguồn tài nguyên và tầm quan trọng kinh tế của Biển Đông.',
      'Phân tích vị trí chiến lược của Biển Đông.',
    ],
    theory: [
      { h: 'Vị trí địa lý' },
      { p: 'Biển Đông là một biển rìa Tây Thái Bình Dương, thuộc loại biển nửa kín, tiếp giáp với nhiều quốc gia và vùng lãnh thổ ven biển. Trong Biển Đông có hai quần đảo lớn là Hoàng Sa và Trường Sa.' },
      { h: 'Tuyến hàng hải huyết mạch' },
      { p: 'Biển Đông nằm trên tuyến hàng hải quốc tế quan trọng nối Thái Bình Dương với Ấn Độ Dương, là một trong những tuyến đường biển nhộn nhịp và đông đúc bậc nhất thế giới.' },
      { h: 'Tài nguyên phong phú' },
      { ul: [
        'Dầu mỏ, khí đốt với trữ lượng lớn.',
        'Hải sản đa dạng, phong phú.',
        'Tiềm năng du lịch biển và năng lượng tái tạo (điện gió, năng lượng biển).',
      ] },
      { note: 'Với vị trí và tài nguyên đó, Biển Đông có tầm quan trọng chiến lược toàn diện về kinh tế, an ninh - quốc phòng và giao thương đối với cả khu vực và thế giới.' },
    ],
    examples: [
      { q: 'Vì sao Biển Đông được coi là tuyến hàng hải huyết mạch của thế giới?', a: 'Phân tích: Biển Đông nằm trên con đường biển ngắn nhất nối Thái Bình Dương và Ấn Độ Dương, là cửa ngõ giao thương giữa châu Á với châu Âu, châu Phi. Một khối lượng hàng hoá và dầu mỏ khổng lồ của thế giới được vận chuyển qua đây mỗi năm. Vì thế Biển Đông là tuyến hàng hải huyết mạch, có ý nghĩa sống còn với thương mại toàn cầu.' },
      { q: 'Phân tích tầm quan trọng chiến lược của Biển Đông đối với Việt Nam.', a: 'Phân tích: Biển Đông cung cấp nguồn lợi kinh tế lớn (dầu khí, hải sản, du lịch, cảng biển), là không gian sinh tồn và phát triển. Đồng thời, với hai quần đảo Hoàng Sa, Trường Sa, Biển Đông giữ vai trò "tiền tiêu" về an ninh - quốc phòng, bảo vệ sườn phía Đông của đất nước. Do đó Biển Đông có tầm chiến lược đặc biệt với Việt Nam cả về kinh tế lẫn quốc phòng.' },
    ],
  },

  'H11SU-w28-quiz': {
    topic: 'Biển Đông trong quan hệ quốc tế và khu vực',
    intro: 'Các em thân mến, Biển Đông không chỉ quan trọng về kinh tế mà còn là khu vực có những tranh chấp phức tạp. Tuần này ta tìm hiểu vấn đề Biển Đông trong quan hệ quốc tế và cơ sở pháp lý để giải quyết tranh chấp.',
    objectives: [
      'Nêu thực trạng tranh chấp chủ quyền ở Biển Đông.',
      'Trình bày vai trò của Công ước Luật Biển 1982 (UNCLOS).',
      'Nêu chủ trương giải quyết tranh chấp của Việt Nam.',
    ],
    theory: [
      { h: 'Tình hình tranh chấp' },
      { p: 'Biển Đông là khu vực có những tranh chấp chủ quyền phức tạp giữa nhiều bên, liên quan đến chủ quyền biển đảo và quyền lợi trên biển. Tình hình này tác động đến hoà bình, ổn định của khu vực.' },
      { h: 'Cơ sở pháp lý quốc tế — UNCLOS 1982' },
      { ul: [
        'Công ước của Liên hợp quốc về Luật Biển năm 1982 (UNCLOS) là cơ sở pháp lý cốt lõi để xác lập, giải quyết các vấn đề trên biển.',
        'Việt Nam phê chuẩn UNCLOS năm 1994.',
        'Năm 2002, ASEAN và Trung Quốc ký Tuyên bố về ứng xử của các bên ở Biển Đông (DOC).',
      ] },
      { h: 'Chủ trương của Việt Nam' },
      { note: 'Việt Nam chủ trương giải quyết các tranh chấp bằng biện pháp hoà bình, trên cơ sở tôn trọng luật pháp quốc tế, nhất là UNCLOS 1982, giữ vững hoà bình, ổn định trong khu vực.' },
    ],
    examples: [
      { q: 'Vì sao UNCLOS 1982 là cơ sở pháp lý quan trọng để giải quyết tranh chấp Biển Đông?', a: 'Phân tích: UNCLOS 1982 là bộ "hiến pháp về biển và đại dương" được hầu hết các quốc gia công nhận, quy định rõ các vùng biển (nội thuỷ, lãnh hải, vùng đặc quyền kinh tế, thềm lục địa) và quyền, nghĩa vụ của các nước. Khi mọi bên cùng tuân thủ UNCLOS, tranh chấp có cơ sở pháp lý khách quan để giải quyết hoà bình, công bằng — đó là lý do nó giữ vai trò cốt lõi.' },
      { q: 'Chủ trương giải quyết tranh chấp Biển Đông của Việt Nam thể hiện điều gì?', a: 'Phân tích: Việt Nam kiên trì biện pháp hoà bình, dựa trên luật pháp quốc tế và UNCLOS 1982, đồng thời thúc đẩy DOC và hướng tới COC. Chủ trương này thể hiện thái độ trách nhiệm, thiện chí, vừa kiên quyết bảo vệ chủ quyền vừa giữ gìn hoà bình, ổn định và hợp tác trong khu vực.' },
    ],
  },

  'H11SU-w29-quiz': {
    topic: 'Việt Nam và Biển Đông — cơ sở lịch sử về chủ quyền',
    intro: 'Các em ạ, Việt Nam có đầy đủ cơ sở lịch sử và pháp lý để khẳng định chủ quyền đối với hai quần đảo Hoàng Sa và Trường Sa. Tuần này ta tìm hiểu các bằng chứng lịch sử về quá trình xác lập, thực thi chủ quyền của cha ông.',
    objectives: [
      'Nêu cơ sở lịch sử khẳng định chủ quyền của Việt Nam với Hoàng Sa, Trường Sa.',
      'Trình bày hoạt động của đội Hoàng Sa và các tư liệu lịch sử.',
      'Nhận biết quá trình quản lý liên tục của Nhà nước Việt Nam.',
    ],
    theory: [
      { h: 'Chủ quyền với Hoàng Sa và Trường Sa' },
      { p: 'Việt Nam khẳng định chủ quyền đối với hai quần đảo Hoàng Sa và Trường Sa dựa trên những bằng chứng lịch sử và cơ sở pháp lý rõ ràng, được xác lập và thực thi liên tục từ nhiều thế kỷ trước.' },
      { h: 'Hoạt động thực thi chủ quyền' },
      { ul: [
        'Từ thời các chúa Nguyễn rồi triều Nguyễn, Nhà nước lập đội Hoàng Sa (và đội Bắc Hải) để khai thác, đo đạc và thực thi chủ quyền tại Hoàng Sa, Trường Sa.',
        'Nhiều tư liệu, bản đồ khẳng định chủ quyền: Phủ biên tạp lục, Đại Nam thực lục, Châu bản triều Nguyễn…',
      ] },
      { h: 'Quản lý liên tục' },
      { p: 'Thời Pháp thuộc, chính quyền Pháp (với tư cách đại diện cho Việt Nam) tiếp tục thực thi chủ quyền tại hai quần đảo. Sau năm 1975, Nhà nước Cộng hoà xã hội chủ nghĩa Việt Nam tiếp tục quản lý và bảo vệ chủ quyền.' },
      { note: 'Quá trình xác lập và thực thi chủ quyền của Việt Nam với Hoàng Sa, Trường Sa là liên tục, hoà bình và phù hợp với luật pháp quốc tế.' },
    ],
    examples: [
      { q: 'Đội Hoàng Sa thời chúa Nguyễn - triều Nguyễn có vai trò gì?', a: 'Phân tích: Đội Hoàng Sa được Nhà nước phong kiến Việt Nam tổ chức để ra quần đảo Hoàng Sa (và Trường Sa) khai thác sản vật, đo đạc, cắm mốc và tuần tra. Đây là hoạt động của Nhà nước nhằm xác lập và thực thi chủ quyền một cách hoà bình, liên tục — bằng chứng lịch sử quan trọng khẳng định chủ quyền của Việt Nam.' },
      { q: 'Vì sao các tư liệu như Phủ biên tạp lục, Châu bản triều Nguyễn có giá trị khẳng định chủ quyền?', a: 'Phân tích: Đây là những thư tịch, văn bản hành chính chính thức của Nhà nước Việt Nam ghi chép việc quản lý, khai thác Hoàng Sa, Trường Sa. Chúng chứng minh hoạt động thực thi chủ quyền có tổ chức, liên tục từ nhiều thế kỷ. Vì là tư liệu lịch sử gốc, đáng tin cậy, chúng có giá trị pháp lý và lịch sử cao trong việc khẳng định chủ quyền.' },
    ],
  },

  'H11SU-w30-quiz': {
    topic: 'Việt Nam và Biển Đông — chủ trương và đối ngoại',
    intro: 'Các em thân mến, tuần này ta tìm hiểu chủ trương nhất quán và hoạt động đối ngoại của Việt Nam trong việc bảo vệ chủ quyền biển đảo, cùng trách nhiệm của mỗi công dân.',
    objectives: [
      'Nêu chủ trương nhất quán của Việt Nam về Biển Đông.',
      'Trình bày hoạt động đối ngoại và cơ sở pháp lý trong nước.',
      'Xác định trách nhiệm của công dân, học sinh với biển đảo.',
    ],
    theory: [
      { h: 'Chủ trương nhất quán' },
      { p: 'Việt Nam kiên quyết, kiên trì bảo vệ chủ quyền, quyền chủ quyền và quyền tài phán trên biển; đồng thời giữ vững môi trường hoà bình, ổn định để hợp tác và phát triển.' },
      { h: 'Hoạt động đối ngoại và pháp lý' },
      { ul: [
        'Là thành viên tích cực của ASEAN và Liên hợp quốc trong các vấn đề Biển Đông.',
        'Ban hành Luật Biển Việt Nam năm 2012 làm cơ sở pháp lý trong nước.',
        'Cùng các bên hướng tới xây dựng Bộ Quy tắc ứng xử ở Biển Đông (COC) thực chất, hiệu lực.',
      ] },
      { h: 'Trách nhiệm công dân' },
      { note: 'Mỗi công dân, học sinh có trách nhiệm học tập, tìm hiểu, tuyên truyền thông tin chính xác, đoàn kết và ủng hộ chủ trương, chính sách của Nhà nước về biển đảo.' },
      { p: 'Bảo vệ chủ quyền biển đảo là nhằm giữ vững độc lập, toàn vẹn lãnh thổ và bảo đảm lợi ích phát triển lâu dài của đất nước.' },
    ],
    examples: [
      { q: 'Luật Biển Việt Nam năm 2012 có ý nghĩa gì?', a: 'Phân tích: Luật Biển Việt Nam 2012 cụ thể hoá các quy định của UNCLOS 1982 vào pháp luật trong nước, xác định rõ các vùng biển, quyền và nghĩa vụ của Nhà nước. Đây là cơ sở pháp lý vững chắc để Việt Nam quản lý, bảo vệ chủ quyền và lợi ích trên biển, đồng thời thể hiện cam kết tuân thủ luật pháp quốc tế.' },
      { q: 'Là học sinh, em có thể làm gì để góp phần bảo vệ chủ quyền biển đảo?', a: 'Phân tích: Học sinh có thể tích cực học tập, tìm hiểu lịch sử và pháp lý về chủ quyền biển đảo; lan toả thông tin chính xác, phản bác thông tin sai lệch; tham gia các hoạt động hướng về biển đảo; rèn luyện và ủng hộ chính sách của Nhà nước. Những việc làm đó góp phần củng cố ý thức và sức mạnh toàn dân trong bảo vệ chủ quyền.' },
    ],
  },

  'H11SU-w31-quiz': {
    topic: 'Phát triển kinh tế biển bền vững',
    intro: 'Các em ạ, phát triển kinh tế biển gắn với bảo vệ chủ quyền và môi trường là chiến lược quan trọng của Việt Nam. Tuần này ta tìm hiểu các ngành kinh tế biển và định hướng phát triển bền vững.',
    objectives: [
      'Nêu chiến lược phát triển bền vững kinh tế biển của Việt Nam.',
      'Trình bày các ngành kinh tế biển chính.',
      'Phân tích mối quan hệ giữa phát triển kinh tế biển và quốc phòng, môi trường.',
    ],
    theory: [
      { h: 'Chiến lược kinh tế biển' },
      { p: 'Việt Nam xác định mục tiêu trở thành quốc gia mạnh về biển, giàu lên từ biển, phát triển bền vững kinh tế biển gắn với bảo đảm quốc phòng, an ninh và bảo vệ môi trường.' },
      { h: 'Các ngành kinh tế biển chính' },
      { ul: [
        'Khai thác và nuôi trồng thuỷ sản.',
        'Du lịch và dịch vụ biển.',
        'Khai thác dầu khí và khoáng sản biển.',
        'Kinh tế hàng hải (cảng biển, vận tải biển).',
        'Năng lượng tái tạo biển, tiêu biểu là điện gió ngoài khơi.',
      ] },
      { h: 'Phát triển bền vững' },
      { note: 'Phát triển kinh tế biển phải đi đôi với bảo vệ môi trường biển và bảo đảm an ninh - quốc phòng. Các đảo và quần đảo vừa có giá trị kinh tế, vừa là "tiền tiêu" về an ninh.' },
      { p: 'Kết hợp sức mạnh dân tộc với sức mạnh thời đại, đẩy mạnh đối ngoại hoà bình là phương châm trong xây dựng và bảo vệ chủ quyền biển đảo.' },
    ],
    examples: [
      { q: 'Vì sao phát triển kinh tế biển phải gắn với bảo vệ môi trường và quốc phòng?', a: 'Phân tích: Tài nguyên biển không phải vô hạn; khai thác quá mức và gây ô nhiễm sẽ huỷ hoại nguồn lợi lâu dài. Mặt khác, các vùng biển, đảo là địa bàn an ninh - quốc phòng trọng yếu. Vì vậy phát triển kinh tế biển phải bền vững, vừa giữ gìn môi trường vừa bảo đảm chủ quyền, an ninh — ba mặt này gắn bó chặt chẽ.' },
      { q: 'Vai trò "tiền tiêu" của các đảo, quần đảo được hiểu như thế nào?', a: 'Phân tích: Các đảo, quần đảo như Hoàng Sa, Trường Sa nằm ở phía ngoài, là tuyến đầu bảo vệ đất liền. Chúng vừa là điểm tựa để phát triển kinh tế biển (đánh bắt, dịch vụ, hậu cần), vừa là vị trí trọng yếu về an ninh - quốc phòng, giúp kiểm soát vùng biển. Do đó chúng giữ vai trò "tiền tiêu" cả về kinh tế lẫn quốc phòng.' },
    ],
  },

  'H11SU-w32-quiz': {
    topic: 'Ôn tập chủ đề Biển Đông',
    intro: 'Các em thân mến, tuần này ta hệ thống lại toàn bộ chủ đề Biển Đông: vị trí, tài nguyên, cơ sở pháp lý quốc tế và chủ trương của Việt Nam, cùng trách nhiệm của thế hệ trẻ.',
    objectives: [
      'Khái quát vị trí, tầm quan trọng và tình hình Biển Đông.',
      'Hệ thống các quy định cơ bản của UNCLOS 1982.',
      'Củng cố nhận thức về cơ sở chủ quyền và trách nhiệm bảo vệ biển đảo.',
    ],
    theory: [
      { h: 'Khái quát Biển Đông' },
      { p: 'Biển Đông là biển nửa kín ở rìa Tây Thái Bình Dương, có vị trí chiến lược và tài nguyên phong phú, nhưng cũng là khu vực có tranh chấp chủ quyền phức tạp.' },
      { h: 'Một số quy định của UNCLOS 1982' },
      { ul: [
        'Quốc gia ven biển có chủ quyền đối với nội thuỷ và lãnh hải (lãnh hải rộng 12 hải lý từ đường cơ sở).',
        'Vùng đặc quyền kinh tế (EEZ) rộng 200 hải lý tính từ đường cơ sở.',
        'Quốc gia ven biển có quyền chủ quyền về thăm dò, khai thác tài nguyên trong EEZ và thềm lục địa.',
      ] },
      { h: 'Cơ sở chủ quyền và trách nhiệm' },
      { note: 'Việt Nam khẳng định chủ quyền với Hoàng Sa, Trường Sa dựa trên bằng chứng lịch sử và cơ sở pháp lý quốc tế; cùng ASEAN và Trung Quốc hướng tới Bộ Quy tắc ứng xử (COC).' },
      { p: 'Thế hệ trẻ có trách nhiệm học tập, lan toả thông tin chính xác và tham gia các hoạt động hướng về biển đảo.' },
    ],
    examples: [
      { q: 'Phân biệt lãnh hải và vùng đặc quyền kinh tế theo UNCLOS 1982.', a: 'Phân tích: Lãnh hải rộng 12 hải lý từ đường cơ sở, là vùng biển mà quốc gia ven biển có chủ quyền đầy đủ (như trên đất liền, chỉ chịu hạn chế bởi quyền qua lại vô hại). Vùng đặc quyền kinh tế rộng tới 200 hải lý, nơi quốc gia ven biển không có chủ quyền hoàn toàn mà có "quyền chủ quyền" về thăm dò, khai thác tài nguyên và quyền tài phán nhất định. Hai vùng khác nhau cả về phạm vi và mức độ quyền.' },
      { q: 'Vì sao Việt Nam và ASEAN hướng tới xây dựng COC?', a: 'Phân tích: DOC năm 2002 mới là tuyên bố chính trị, chưa có ràng buộc pháp lý chặt chẽ. Bộ Quy tắc ứng xử (COC) được kỳ vọng có tính ràng buộc, thực chất hơn, giúp ngăn ngừa xung đột, quản lý tranh chấp và giữ hoà bình, ổn định ở Biển Đông. Vì vậy Việt Nam và ASEAN tích cực thúc đẩy xây dựng COC.' },
    ],
  },

  'H11SU-w33-quiz': {
    topic: 'Sơ kết — bảo vệ chủ quyền và lợi ích trên Biển Đông',
    intro: 'Các em ạ, tuần này ta sơ kết chủ đề Biển Đông, làm rõ chính sách của Việt Nam, vai trò của ASEAN và yếu tố quyết định để bảo vệ chủ quyền lâu dài.',
    objectives: [
      'Khái quát chính sách bảo vệ chủ quyền Biển Đông của Việt Nam.',
      'Nêu vai trò của ASEAN trong vấn đề Biển Đông.',
      'Rút ra bài học bảo vệ Tổ quốc trong tình hình mới.',
    ],
    theory: [
      { h: 'Chính sách của Việt Nam' },
      { p: 'Việt Nam kiên quyết, kiên trì giải quyết tranh chấp Biển Đông bằng biện pháp hoà bình, trên cơ sở luật pháp quốc tế, nhất là UNCLOS 1982, đồng thời giữ vững chủ quyền và lợi ích quốc gia.' },
      { h: 'Vai trò của ASEAN' },
      { p: 'ASEAN tạo cơ chế đối thoại, thúc đẩy thực hiện DOC và xây dựng COC, góp phần duy trì hoà bình, ổn định và giải quyết tranh chấp một cách hoà bình ở Biển Đông.' },
      { h: 'Yếu tố quyết định và bài học' },
      { ul: [
        'Sức mạnh tổng hợp: kinh tế, quốc phòng, đối ngoại và đoàn kết toàn dân.',
        'Phát huy đại đoàn kết dân tộc kết hợp với sức mạnh thời đại.',
        'Giáo dục biển đảo để bồi dưỡng tình yêu nước, ý thức chủ quyền cho thế hệ trẻ.',
      ] },
      { note: 'Hoàng Sa, Trường Sa là một phần lãnh thổ thiêng liêng, không thể tách rời của Tổ quốc Việt Nam.' },
    ],
    examples: [
      { q: 'Yếu tố nào quyết định việc bảo vệ chủ quyền biển đảo lâu dài?', a: 'Phân tích: Bảo vệ chủ quyền không thể chỉ dựa vào một mặt mà cần sức mạnh tổng hợp: kinh tế biển vững mạnh, quốc phòng - an ninh đủ mạnh, đối ngoại khôn khéo dựa trên luật pháp quốc tế, và trên hết là sự đoàn kết toàn dân tộc. Kết hợp sức mạnh dân tộc với sức mạnh thời đại chính là yếu tố quyết định để giữ vững chủ quyền lâu dài.' },
      { q: 'Vai trò của ASEAN trong vấn đề Biển Đông được thể hiện thế nào?', a: 'Phân tích: ASEAN đóng vai trò trung tâm trong việc tạo diễn đàn đối thoại đa phương, thúc đẩy thực hiện DOC và đàm phán COC với Trung Quốc. Thông qua tiếng nói chung và các cơ chế hợp tác, ASEAN góp phần kiềm chế căng thẳng, duy trì hoà bình, ổn định và giải quyết tranh chấp Biển Đông bằng biện pháp hoà bình.' },
    ],
  },

  // ──────────────── Ôn tập cuối năm ────────────────
  'H11SU-w34-quiz': {
    topic: 'Ôn tập cuối năm — tổng hợp lịch sử thế giới và Việt Nam',
    intro: 'Các em thân mến, tuần này ta tổng hợp toàn bộ chương trình Lịch sử 11: từ cách mạng tư sản, chủ nghĩa tư bản và xã hội chủ nghĩa, Đông Nam Á, đến các cuộc cải cách trong lịch sử dân tộc và vấn đề Biển Đông.',
    objectives: [
      'Hệ thống hoá kiến thức toàn bộ chương trình Lịch sử 11.',
      'Liên hệ, so sánh các quá trình lịch sử thế giới và Việt Nam.',
      'Củng cố kỹ năng phân tích, đánh giá và liên hệ thực tiễn.',
    ],
    theory: [
      { h: 'Lịch sử thế giới cận - hiện đại' },
      { ul: [
        'Cách mạng tư sản Anh, Mỹ, Pháp mở đường cho chủ nghĩa tư bản; mâu thuẫn cơ bản của CNTB vẫn tồn tại.',
        'Cách mạng tháng Mười Nga 1917 mở ra thời đại quá độ lên chủ nghĩa xã hội; hệ thống XHCN trải qua thăng trầm và đổi mới.',
        'Đông Nam Á từ thuộc địa đến độc lập và liên kết ASEAN, với hai khuynh hướng dân chủ tư sản và vô sản.',
      ] },
      { h: 'Lịch sử Việt Nam' },
      { p: 'Các cuộc cải cách Hồ Quý Ly, Lê Thánh Tông, Minh Mạng cho thấy nỗ lực canh tân đất nước; trong đó cải cách Lê Thánh Tông tiêu biểu cho mô hình nhà nước quân chủ tập quyền hoàn chỉnh.' },
      { h: 'Biển Đông' },
      { note: 'Việt Nam chủ trương bảo vệ chủ quyền biển đảo bằng biện pháp hoà bình, tuân thủ UNCLOS 1982, kết hợp sức mạnh dân tộc với sức mạnh thời đại.' },
    ],
    examples: [
      { q: 'Vì sao nói cả ba cuộc cách mạng tư sản Anh, Mỹ, Pháp đều mở đường cho chủ nghĩa tư bản?', a: 'Phân tích: Dù khác nhau về hình thức (nội chiến, chiến tranh giải phóng, cách mạng triệt để), cả ba cuộc cách mạng đều lật đổ trở lực phong kiến hoặc ách thuộc địa kìm hãm sản xuất. Sau cách mạng, quan hệ sản xuất tư bản chủ nghĩa được tự do phát triển. Điểm chung cốt lõi đó khiến chúng đều được xếp vào cách mạng tư sản, mở đường cho chủ nghĩa tư bản.' },
      { q: 'Liên hệ bài học từ các cuộc cải cách lịch sử với việc bảo vệ chủ quyền Biển Đông hiện nay.', a: 'Phân tích: Bài học xuyên suốt là phải dựa vào sức mạnh đại đoàn kết toàn dân và có đường lối, sách lược đúng đắn, phù hợp xu thế thời đại. Trong bảo vệ chủ quyền Biển Đông, Việt Nam vận dụng bài học đó: kết hợp sức mạnh dân tộc với sức mạnh thời đại, kiên trì biện pháp hoà bình dựa trên luật pháp quốc tế và phát huy đoàn kết toàn dân.' },
    ],
  },

  'H11SU-w35-quiz': {
    topic: 'Thi học kỳ II — tổng ôn cả năm',
    intro: 'Các em ạ, đây là tuần cuối — ta tổng ôn những kiến thức trọng tâm nhất của cả năm học để chuẩn bị cho bài thi học kỳ II. Hãy nắm chắc các mốc sự kiện và ý nghĩa lịch sử then chốt.',
    objectives: [
      'Tổng ôn các sự kiện và mốc thời gian trọng tâm cả năm.',
      'Củng cố cách phân tích ý nghĩa lịch sử của sự kiện.',
      'Sẵn sàng tâm thế cho bài thi học kỳ II.',
    ],
    theory: [
      { h: 'Các mốc thế giới trọng tâm' },
      { ul: [
        'Cách mạng tư sản Pháp 1789, đỉnh cao là chuyên chính Giacôbanh (1793-1794).',
        'Cách mạng tháng Mười Nga 1917; Liên Xô tan rã năm 1991.',
        'Cách mạng tháng Tám 1945 ở Việt Nam mở đầu thắng lợi giải phóng dân tộc ở Đông Nam Á sau chiến tranh.',
      ] },
      { h: 'Các mốc Việt Nam trọng tâm' },
      { ul: [
        'Chiến thắng Bạch Đằng năm 938 do Ngô Quyền lãnh đạo, chấm dứt Bắc thuộc.',
        'Cải cách Minh Mạng (1831-1832) chia cả nước thành các tỉnh — nền tảng hành chính hiện đại.',
      ] },
      { h: 'Biển Đông' },
      { note: 'Việt Nam chủ trương bảo vệ vững chắc chủ quyền biển đảo, giải quyết tranh chấp bằng biện pháp hoà bình trên cơ sở UNCLOS 1982.' },
      { p: 'Khi ôn tập, các em nên gắn mỗi sự kiện với nguyên nhân, diễn biến chính và ý nghĩa, đồng thời tập liên hệ giữa lịch sử thế giới và lịch sử dân tộc.' },
    ],
    examples: [
      { q: 'Hãy nêu và phân tích ngắn gọn ý nghĩa của chiến thắng Bạch Đằng năm 938.', a: 'Phân tích: Chiến thắng Bạch Đằng 938 do Ngô Quyền lãnh đạo đã đánh tan quân Nam Hán, chấm dứt hơn một nghìn năm Bắc thuộc và mở ra thời kỳ độc lập, tự chủ lâu dài cho dân tộc. Đây là mốc son đánh dấu sự khẳng định nền độc lập của quốc gia Đại Việt sau nghìn năm đấu tranh.' },
      { q: 'Vì sao cải cách Minh Mạng để lại di sản hành chính đến ngày nay?', a: 'Phân tích: Cải cách Minh Mạng năm 1831-1832 chia cả nước thành các tỉnh trực thuộc trung ương, tạo ra mô hình hành chính thống nhất, gọn nhẹ và dễ quản lý. Mô hình tỉnh này được kế thừa qua nhiều giai đoạn và là nền tảng cho hệ thống hành chính cấp tỉnh của Việt Nam hiện đại — đó là di sản lâu bền của cuộc cải cách.' },
    ],
  },

  'H11SU-w36-quiz': {
    topic: 'Kết thúc Lịch Sử 11 — Thế giới và Việt Nam trước thời đại của chúng ta',
    intro: 'Lịch Sử 11 đã mang chúng ta du hành qua những biến động lớn nhất của thế giới và Việt Nam từ thế kỉ XIX đến đầu thế kỉ XX. Hôm nay chúng ta nhìn lại những bài học lịch sử quan trọng nhất và chuẩn bị cho lớp 12 — nơi lịch sử tiếp tục kể chuyện về đấu tranh giành độc lập và xây dựng đất nước.',
    objectives: [
      'Hệ thống hoá các chủ đề lịch sử thế giới và Việt Nam đã học trong năm lớp 11.',
      'Nhận biết những bài học lịch sử có giá trị bền vững đối với cuộc sống hiện đại.',
      'Chuẩn bị tâm thế và phương pháp học Lịch Sử lớp 12 — môn thi tốt nghiệp quan trọng.',
    ],
    theory: [
      { h: 'Lịch sử thế giới lớp 11 — những chuyển biến lớn' },
      { ul: [
        'Thế giới cuối TK XIX – đầu TK XX: chủ nghĩa tư bản độc quyền, xâm lược thuộc địa, mâu thuẫn đế quốc.',
        'Các cuộc cách mạng: Cách mạng tư sản Pháp (1789), Cách mạng Nga (1917) — sự kiện làm thay đổi bản đồ chính trị thế giới.',
        'Chiến tranh thế giới thứ nhất (1914–1918): nguyên nhân sâu xa (tranh giành thuộc địa) và nguyên nhân trực tiếp; hậu quả và trật tự Versailles.',
        'Sự nổi lên của phong trào giải phóng dân tộc ở châu Á, châu Phi.',
      ] },
      { h: 'Lịch sử Việt Nam lớp 11 — đấu tranh và thức tỉnh' },
      { ul: [
        'Pháp xâm lược (1858–1884): từ Đà Nẵng đến hiệp ước Patenôtre — mất độc lập dân tộc.',
        'Phong trào yêu nước cuối TK XIX: Văn thân, Cần Vương, Hoàng Hoa Thám — khởi nghĩa vũ trang chống Pháp.',
        'Đầu TK XX — tìm con đường mới: Phan Bội Châu (bạo động), Phan Châu Trinh (cải lương), Nguyễn Ái Quốc.',
        'Phong trào yêu nước 1919–1930: phong trào công nhân, hội Việt Nam Cách mạng Thanh niên, Đảng Cộng sản Việt Nam ra đời (3/2/1930).',
      ] },
      { h: 'Bài học lịch sử có giá trị hôm nay' },
      { ul: [
        'Độc lập dân tộc là điều kiện tiên quyết để phát triển — không có độc lập, không có tương lai.',
        'Mỗi cuộc cách mạng thành công đều có sự chuẩn bị kỹ lưỡng và lực lượng quần chúng rộng rãi.',
        'Lịch sử lặp lại theo chu kỳ — hiểu quá khứ giúp ta dự đoán và ứng phó với hiện tại.',
      ] },
      { h: 'Lịch Sử 12 — câu chuyện tiếp theo' },
      { ul: [
        'Cách mạng tháng Tám 1945: Hồ Chí Minh và sự ra đời của nước Việt Nam Dân chủ Cộng hoà.',
        'Kháng chiến chống Pháp (1946–1954): Điện Biên Phủ — chiến thắng vĩ đại nhất TK XX.',
        'Kháng chiến chống Mỹ (1954–1975): thống nhất đất nước 30/4/1975.',
        'Đổi mới 1986 và Việt Nam hội nhập thế giới — lịch sử đương đại gần nhất với cuộc sống của em.',
      ] },
      { note: 'Học lịch sử không phải học thuộc ngày tháng mà là hiểu TẠI SAO sự kiện xảy ra và để lại bài học gì. Khi đọc tin tức hôm nay — xung đột, thương mại, ngoại giao — em sẽ thấy những quy luật lịch sử cũ đang lặp lại. Đó là lúc lịch sử thực sự sống trong em.' },
    ],
    examples: [
      { q: 'Hãy giải thích ngắn gọn tại sao tất cả các phong trào chống Pháp ở Việt Nam cuối TK XIX đều thất bại.', a: 'Phân tích: Các phong trào Cần Vương, Văn thân... thất bại vì: (1) Thiếu đường lối cách mạng tiên tiến — vẫn theo tư tưởng phong kiến, không có giai cấp lãnh đạo phù hợp với thời đại; (2) Lực lượng phân tán, thiếu sự phối hợp thống nhất; (3) Vũ khí, trang bị kém hơn quân Pháp rất nhiều; (4) Không có hậu thuẫn quốc tế. Bài học: cần có đường lối đúng, lực lượng mạnh và thời cơ phù hợp để cách mạng thành công.' },
      { q: 'Sự kiện lịch sử nào của lớp 11 có ảnh hưởng sâu sắc nhất đến tình hình Việt Nam ngày nay? Tại sao?', a: 'Sự kiện quan trọng nhất là Nguyễn Ái Quốc tìm ra con đường cứu nước và thành lập Đảng Cộng sản Việt Nam (3/2/1930). Sự kiện này quyết định toàn bộ lịch sử 100 năm tiếp theo: có tổ chức lãnh đạo với đường lối đúng đắn, phong trào giải phóng dân tộc mới đủ sức đánh bại cả Pháp lẫn Mỹ, thống nhất đất nước năm 1975 và tiến hành Đổi mới 1986 đưa Việt Nam ra thế giới. Nếu không có sự kiện 1930, lịch sử Việt Nam có thể đi theo hướng hoàn toàn khác.' },
    ],
  },
};
