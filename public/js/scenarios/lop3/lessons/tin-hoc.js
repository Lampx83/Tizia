// ============================================================
// Lớp 3 · TIN HỌC (môn "Tin học và Công nghệ") — Lý thuyết + Ví dụ 35 tuần.
// Bám CT GDPT 2018: Máy tính · Chuột-bàn phím · Thông tin · Paint ·
// Tệp/thư mục · Internet an toàn · Đạo đức số · Thuật toán đời thường · Soạn thảo.
// Key TRÙNG id quiz: "P3TIN-wNN-quiz".
// ============================================================

export const P3TIN_LESSONS = {
  // ──────────────── HK1 ────────────────
  'P3TIN-w01-quiz': {
    topic: 'Máy tính - người bạn mới',
    intro: 'Chào các em! Máy tính giống như một người bạn thông minh, giúp em học bài, vẽ tranh, nghe nhạc. Cùng cô làm quen với người bạn này nhé!',
    objectives: [
      'Em biết máy tính giúp ích những việc gì.',
      'Em biết một số loại máy tính thường gặp.',
      'Em biết giữ gìn, dùng máy tính cẩn thận.',
    ],
    theory: [
      { h: 'Máy tính giúp em làm gì?' },
      { ul: ['Học bài, tìm hiểu kiến thức mới.', 'Vẽ tranh, tô màu.', 'Nghe nhạc, xem phim, chơi trò chơi học tập.'] },
      { h: 'Một số loại máy tính' },
      { ul: ['Máy tính để bàn: đặt cố định trên bàn học.', 'Máy tính xách tay (laptop): gọn nhẹ, gập lại mang theo được.', 'Máy tính bảng, điện thoại thông minh cũng là thiết bị số.'] },
      { note: 'Máy tính chỉ giúp em học tập tốt hơn khi em dùng đúng cách và giữ gìn cẩn thận, không đập, không đổ nước lên máy.' },
    ],
    examples: [
      { q: 'Em muốn vẽ một bức tranh con mèo. Máy tính giúp em được không?', a: 'Được. Em mở phần mềm vẽ (như Paint) là có thể vẽ và tô màu con mèo trên máy tính.' },
      { q: 'Máy tính nào nhỏ gọn, mang đi học được?', a: 'Máy tính xách tay (laptop). Nó gập lại được nên dễ mang theo.' },
    ],
  },

  'P3TIN-w02-quiz': {
    topic: 'Các bộ phận của máy tính',
    intro: 'Một chiếc máy tính để bàn có nhiều bộ phận, mỗi bộ phận làm một việc riêng. Cùng tìm hiểu xem từng bộ phận dùng để làm gì nhé!',
    objectives: [
      'Em kể được tên các bộ phận chính của máy tính.',
      'Em biết mỗi bộ phận dùng để làm gì.',
    ],
    theory: [
      { h: 'Các bộ phận chính' },
      { ul: ['Màn hình: để xem hình ảnh và chữ.', 'Bàn phím: để gõ chữ và số.', 'Chuột: để di chuyển con trỏ và nháy chọn.', 'Thân máy (CPU): chứa bộ phận xử lý, là "bộ não" của máy.', 'Loa hoặc tai nghe: để nghe âm thanh.'] },
      { note: 'Màn hình, bàn phím, chuột là những bộ phận em cầm, nhìn thấy được — gọi là phần cứng.' },
    ],
    examples: [
      { q: 'Em muốn nghe một bài hát từ máy tính, em dùng bộ phận nào?', a: 'Em dùng loa hoặc tai nghe để nghe âm thanh.' },
      { q: 'Bộ phận nào giúp em gõ chữ?', a: 'Bàn phím, vì trên bàn phím có các phím chữ và phím số.' },
    ],
  },

  'P3TIN-w03-quiz': {
    topic: 'Bật - tắt máy đúng cách',
    intro: 'Bật và tắt máy tính cũng cần làm đúng cách thì máy mới bền và không bị mất bài. Cùng học cách bật, tắt máy an toàn nhé!',
    objectives: [
      'Em biết bật máy bằng nút nguồn.',
      'Em biết tắt máy bằng lệnh Tắt máy (Shut down).',
      'Em biết lưu bài trước khi tắt.',
    ],
    theory: [
      { h: 'Bật máy' },
      { ul: ['Nhấn nút nguồn (Power) để bật máy.', 'Chờ một chút cho máy khởi động xong rồi mới dùng.'] },
      { h: 'Tắt máy' },
      { ul: ['Lưu lại bài đang làm trước.', 'Chọn lệnh Tắt máy (Shut down) trên màn hình.', 'Chờ máy tự tắt hẳn.'] },
      { note: 'Không rút dây điện khi máy đang chạy — làm vậy dễ hỏng máy và mất bài làm.' },
    ],
    examples: [
      { q: 'Em vẽ xong tranh và muốn tắt máy. Em làm gì trước tiên?', a: 'Lưu lại bài vẽ, rồi chọn lệnh Tắt máy (Shut down). Không rút điện đột ngột.' },
      { q: 'Vừa nhấn nút nguồn, máy chưa hiện gì. Em nên làm gì?', a: 'Chờ một chút cho máy khởi động xong, không nhấn nút liên tục.' },
    ],
  },

  'P3TIN-w04-quiz': {
    topic: 'Tư thế ngồi & bảo vệ sức khoẻ',
    intro: 'Ngồi đúng tư thế và biết nghỉ ngơi sẽ giúp mắt và lưng của em luôn khoẻ khi dùng máy tính. Cùng học nhé!',
    objectives: [
      'Em biết ngồi đúng tư thế khi dùng máy tính.',
      'Em biết giữ khoảng cách hợp lý với màn hình.',
      'Em biết nghỉ giải lao để bảo vệ mắt.',
    ],
    theory: [
      { h: 'Ngồi đúng tư thế' },
      { ul: ['Lưng thẳng, ngồi ngay ngắn.', 'Mắt cách màn hình một khoảng vừa phải, không quá gần.', 'Phòng đủ ánh sáng, không quá tối.'] },
      { h: 'Bảo vệ mắt và sức khoẻ' },
      { ul: ['Khoảng 30 phút nên nghỉ giải lao, nhìn ra xa.', 'Không dùng máy quá nhiều, quá lâu.'] },
      { note: 'Dùng máy tính quá nhiều và ngồi sai tư thế sẽ làm mỏi mắt, đau lưng. Hãy nhớ nghỉ ngơi nhé!' },
    ],
    examples: [
      { q: 'Em đã học trên máy được 30 phút, mắt hơi mỏi. Em nên làm gì?', a: 'Nghỉ giải lao một chút, nhìn ra xa hoặc ra ngoài cho mắt đỡ mỏi.' },
      { q: 'Bạn ngồi cúi sát vào màn hình. Em khuyên bạn thế nào?', a: 'Khuyên bạn ngồi lưng thẳng và lùi ra xa màn hình một khoảng vừa phải để bảo vệ mắt và lưng.' },
    ],
  },

  'P3TIN-w05-quiz': {
    topic: 'Sử dụng chuột',
    intro: 'Con chuột máy tính giúp em di chuyển và chọn mọi thứ trên màn hình. Cùng học các thao tác với chuột nhé!',
    objectives: [
      'Em biết các thao tác cơ bản với chuột.',
      'Em biết khi nào nháy, khi nào nháy đúp, khi nào kéo thả.',
    ],
    theory: [
      { h: 'Các thao tác với chuột' },
      { ul: ['Nháy (nhấn một lần nút trái): để chọn.', 'Nháy đúp (nhấn nhanh hai lần nút trái): để mở thư mục hoặc chương trình.', 'Nháy nút phải: để mở menu (bảng lệnh).', 'Kéo thả: giữ nút trái, di chuyển rồi thả ra.', 'Lăn bánh xe ở giữa: để cuộn trang lên xuống.'] },
      { note: 'Khi em di chuyển chuột, con trỏ chuột (mũi tên) sẽ di chuyển theo trên màn hình. Hãy cầm chuột nhẹ nhàng, không đập.' },
    ],
    examples: [
      { q: 'Em muốn mở phần mềm Paint từ biểu tượng. Em làm gì với chuột?', a: 'Em nháy đúp (nhấn nhanh hai lần nút trái) vào biểu tượng Paint.' },
      { q: 'Em muốn kéo một biểu tượng sang chỗ khác. Em làm sao?', a: 'Em giữ nút trái chuột lên biểu tượng, di chuyển đến chỗ mới rồi thả tay ra. Đó là kéo thả.' },
    ],
  },

  'P3TIN-w06-quiz': {
    topic: 'Sử dụng bàn phím',
    intro: 'Bàn phím có rất nhiều phím, mỗi phím có công dụng riêng. Cùng làm quen với những phím hay dùng nhất nhé!',
    objectives: [
      'Em biết công dụng của các phím thường dùng.',
      'Em biết gõ phím nhẹ nhàng, đúng cách.',
    ],
    theory: [
      { h: 'Các phím thường dùng' },
      { ul: ['Phím chữ cái và phím số: để gõ thành từ, câu.', 'Phím cách (Space): tạo khoảng trống giữa các chữ.', 'Phím Enter: xuống dòng mới hoặc đồng ý.', 'Phím Backspace (xoá lùi): xoá chữ ở bên trái con trỏ.', 'Phím Shift: giữ rồi gõ để có chữ in hoa.'] },
      { note: 'Gõ phím nhẹ nhàng vừa đủ, không đập mạnh để bảo vệ bàn phím và đôi tay.' },
    ],
    examples: [
      { q: 'Em gõ nhầm một chữ. Em nhấn phím nào để xoá?', a: 'Em nhấn phím Backspace để xoá chữ vừa gõ sai.' },
      { q: 'Em muốn viết chữ "A" in hoa. Em làm thế nào?', a: 'Em giữ phím Shift rồi gõ phím chữ a, sẽ được chữ A in hoa.' },
    ],
  },

  'P3TIN-w07-quiz': {
    topic: 'Thông tin quanh em',
    intro: 'Quanh em có rất nhiều thông tin: tiếng trống, bức tranh, dòng chữ... Cùng tìm hiểu các dạng thông tin nhé!',
    objectives: [
      'Em nhận ra thông tin có nhiều dạng khác nhau.',
      'Em biết em nhận thông tin bằng các giác quan.',
    ],
    theory: [
      { h: 'Các dạng thông tin' },
      { ul: ['Hình ảnh: bức tranh, tấm ảnh (em nhìn bằng mắt).', 'Âm thanh: tiếng trống, tiếng chuông (em nghe bằng tai).', 'Chữ viết (văn bản): dòng chữ trên biển, trên sách.', 'Con số: số trên nhiệt kế, số trên đồng hồ.'] },
      { note: 'Em nhận thông tin từ thế giới quanh mình bằng các giác quan: mắt nhìn, tai nghe, mũi ngửi...' },
    ],
    examples: [
      { q: 'Tiếng trống trường báo vào lớp là thông tin dạng gì?', a: 'Thông tin dạng âm thanh, vì em nghe được bằng tai.' },
      { q: 'Tấm biển ghi "CẤM HÚT THUỐC" cho em thông tin dạng gì?', a: 'Thông tin dạng chữ viết (văn bản), vì em đọc bằng mắt.' },
    ],
  },

  'P3TIN-w08-quiz': {
    topic: 'Thông tin và quyết định',
    intro: 'Khi có thông tin, em sẽ quyết định làm gì cho đúng. Cùng xem thông tin giúp em ra quyết định ra sao nhé!',
    objectives: [
      'Em hiểu thông tin giúp em quyết định và hành động đúng.',
      'Em biết xem xét thông tin cẩn thận trước khi quyết định.',
    ],
    theory: [
      { h: 'Thông tin giúp em quyết định' },
      { ul: ['Thấy đèn đỏ → em dừng lại.', 'Nghe trời sắp mưa → em mang theo áo mưa, ô.', 'Đọc thấy hộp sữa "hết hạn" → em không uống.'] },
      { note: 'Trước khi quyết định, em nên xem xét thông tin cẩn thận, không làm bừa, không chọn đại.' },
    ],
    examples: [
      { q: 'Em đọc trên hộp sữa thấy chữ "Đã hết hạn". Em quyết định thế nào?', a: 'Em không uống nữa, vì sữa hết hạn uống vào sẽ đau bụng.' },
      { q: 'Nghe dự báo trời sắp mưa, em chuẩn bị gì khi đi học?', a: 'Em mang theo áo mưa hoặc ô để không bị ướt.' },
    ],
  },

  'P3TIN-w09-quiz': {
    topic: 'Ôn tập giữa Học kì 1',
    intro: 'Nửa học kì đã trôi qua! Cùng ôn lại các bộ phận máy tính, cách bật-tắt, dùng chuột và các dạng thông tin nhé!',
    objectives: [
      'Em nhớ lại các bộ phận máy tính và công dụng.',
      'Em nhớ cách bật-tắt máy, dùng chuột.',
      'Em phân biệt được các dạng thông tin.',
    ],
    theory: [
      { h: 'Ôn lại kiến thức đã học' },
      { ul: ['Màn hình để xem, bàn phím để gõ, chuột để chọn, loa để nghe.', 'Bật máy: nhấn nút nguồn. Tắt máy: chọn lệnh Tắt máy (Shut down).', 'Nháy đúp nút trái chuột để mở thư mục, phần mềm.', 'Thông tin có dạng: hình ảnh, âm thanh, chữ viết, con số.'] },
      { note: 'Hãy luôn ngồi đúng tư thế, lưng thẳng và nghỉ ngơi khi mỏi mắt nhé!' },
    ],
    examples: [
      { q: 'Tiếng chuông báo thức là thông tin dạng gì?', a: 'Thông tin dạng âm thanh, vì em nghe được bằng tai.' },
      { q: 'Để mở một thư mục, em làm gì với chuột?', a: 'Em nháy đúp (nhấn nhanh hai lần) nút trái chuột vào thư mục đó.' },
    ],
  },

  'P3TIN-w10-quiz': {
    topic: 'Làm quen phần mềm',
    intro: 'Trên màn hình có nhiều biểu tượng nhỏ — đó là cửa mở vào các phần mềm. Cùng tìm hiểu phần mềm là gì nhé!',
    objectives: [
      'Em hiểu phần mềm là chương trình giúp máy tính làm việc.',
      'Em biết mở và đóng cửa sổ phần mềm.',
    ],
    theory: [
      { h: 'Phần mềm là gì?' },
      { p: 'Phần mềm là chương trình giúp máy tính làm việc. Ví dụ: phần mềm vẽ Paint, phần mềm soạn thảo văn bản.' },
      { h: 'Mở và đóng phần mềm' },
      { ul: ['Nháy đúp vào biểu tượng (icon) trên màn hình để mở phần mềm.', 'Nháy dấu X ở góc trên bên phải cửa sổ để đóng (tắt) phần mềm.'] },
      { note: 'Chuột, màn hình, bàn phím là phần cứng (cầm được). Paint, soạn thảo là phần mềm (chương trình).' },
    ],
    examples: [
      { q: 'Em muốn đóng cửa sổ phần mềm đang mở. Em nháy vào đâu?', a: 'Em nháy vào dấu X ở góc trên bên phải cửa sổ.' },
      { q: 'Paint là phần cứng hay phần mềm?', a: 'Paint là phần mềm, vì nó là chương trình giúp em vẽ trên máy tính.' },
    ],
  },

  'P3TIN-w11-quiz': {
    topic: 'Phần mềm vẽ Paint - công cụ',
    intro: 'Paint là phần mềm vẽ rất vui. Cùng làm quen với các công cụ vẽ trong Paint nhé!',
    objectives: [
      'Em biết Paint dùng để vẽ và tô màu.',
      'Em biết công dụng của các công cụ chính trong Paint.',
    ],
    theory: [
      { h: 'Các công cụ trong Paint' },
      { ul: ['Bút chì (Pencil): vẽ nét tự do.', 'Tẩy (Eraser): xoá phần vẽ sai.', 'Đổ màu (Fill): tô màu kín một vùng.', 'Bảng màu (Color): chọn màu để vẽ.'] },
      { note: 'Paint dùng để vẽ hình và tô màu. Trước khi vẽ, em chọn màu ở bảng màu rồi mới vẽ.' },
    ],
    examples: [
      { q: 'Em muốn tô màu xanh kín cả bầu trời trong tranh. Em dùng công cụ nào?', a: 'Em dùng công cụ Đổ màu (Fill), chọn màu xanh rồi nháy vào vùng bầu trời.' },
      { q: 'Em vẽ sai một nét nhỏ. Em dùng công cụ gì để xoá?', a: 'Em dùng công cụ Tẩy (Eraser) để xoá phần vẽ sai.' },
    ],
  },

  'P3TIN-w12-quiz': {
    topic: 'Vẽ hình với Paint',
    intro: 'Paint có sẵn các công cụ vẽ hình tròn, hình chữ nhật, đường thẳng. Cùng vẽ những hình đẹp nhé!',
    objectives: [
      'Em biết chọn công cụ phù hợp để vẽ từng loại hình.',
      'Em biết sửa lỗi khi vẽ sai.',
    ],
    theory: [
      { h: 'Vẽ các hình cơ bản' },
      { ul: ['Vẽ vòng tròn: chọn công cụ Hình tròn (ô-van).', 'Vẽ nét thẳng: chọn công cụ Đường thẳng (Line).', 'Vẽ khung: chọn công cụ Hình chữ nhật.'] },
      { h: 'Sửa khi vẽ sai' },
      { ul: ['Dùng công cụ Tẩy để xoá nét sai.', 'Hoặc dùng lệnh Hoàn tác (Undo) để bỏ thao tác vừa làm.'] },
      { note: 'Hãy vẽ cẩn thận và sáng tạo để có bức tranh đẹp nhé!' },
    ],
    examples: [
      { q: 'Em muốn vẽ mặt trời tròn. Em chọn công cụ nào?', a: 'Em chọn công cụ Hình tròn (ô-van) để vẽ vòng tròn cho mặt trời.' },
      { q: 'Em vừa vẽ một nét sai. Có mấy cách sửa?', a: 'Có hai cách: dùng công cụ Tẩy để xoá, hoặc dùng lệnh Hoàn tác (Undo).' },
    ],
  },

  'P3TIN-w13-quiz': {
    topic: 'Lưu & mở bài vẽ',
    intro: 'Vẽ xong rồi, làm sao để giữ lại bức tranh cho lần sau? Cùng học cách lưu và mở bài vẽ nhé!',
    objectives: [
      'Em biết lưu (Save) bài để giữ lại.',
      'Em biết mở (Open) lại bài đã lưu.',
      'Em biết đặt tên file dễ nhớ.',
    ],
    theory: [
      { h: 'Lưu và mở bài' },
      { ul: ['Lưu (Save): để giữ lại bài vẽ, đặt tên dễ nhớ, đúng nội dung.', 'Mở (Open): để mở lại bài đã lưu, xem hoặc sửa.'] },
      { note: 'Nếu không lưu mà tắt máy, bài làm có thể bị mất. Hãy nhớ lưu bài trước khi tắt nhé!' },
    ],
    examples: [
      { q: 'Em vẽ xong một bức tranh con cá. Em nên đặt tên file thế nào?', a: 'Đặt tên dễ nhớ, đúng nội dung, ví dụ "con ca", để lần sau dễ tìm lại.' },
      { q: 'Hôm nay em muốn vẽ tiếp bức tranh hôm qua đã lưu. Em làm gì?', a: 'Em dùng lệnh Mở (Open) để mở lại bài đã lưu rồi vẽ tiếp.' },
    ],
  },

  'P3TIN-w14-quiz': {
    topic: 'Trò chơi học tập',
    intro: 'Có những trò chơi trên máy tính giúp em vừa chơi vừa học. Cùng tìm hiểu cách chơi sao cho có ích nhé!',
    objectives: [
      'Em hiểu trò chơi học tập giúp luyện kỹ năng.',
      'Em biết chơi vừa phải, có giờ nghỉ.',
    ],
    theory: [
      { h: 'Trò chơi học tập có ích gì?' },
      { ul: ['Rèn tư duy, phản xạ, kiến thức.', 'Vừa chơi vừa học, giúp nhớ bài hơn.'] },
      { h: 'Chơi sao cho đúng' },
      { ul: ['Chơi vừa phải, có giờ nghỉ.', 'Không chơi đến khuya, không bỏ học để chơi.', 'Chơi xong nên tắt trò chơi và nghỉ ngơi.'] },
      { note: 'Mải chơi quên làm bài sẽ làm việc học sa sút. Hãy biết dừng đúng lúc nhé!' },
    ],
    examples: [
      { q: 'Em chơi trò chơi học toán đã khá lâu. Em nên làm gì?', a: 'Em nên tắt trò chơi, nghỉ ngơi cho mắt đỡ mỏi và làm việc khác.' },
      { q: 'Trò chơi học tập giúp em rèn điều gì?', a: 'Rèn tư duy, phản xạ và kiến thức, giúp em vừa chơi vừa học.' },
    ],
  },

  'P3TIN-w15-quiz': {
    topic: 'Gõ chữ đơn giản',
    intro: 'Cùng tập gõ những chữ và câu đơn giản trên máy tính nào! Gõ đúng cách sẽ nhanh và đẹp hơn.',
    objectives: [
      'Em biết dùng bàn phím để gõ chữ.',
      'Em biết các phím cơ bản khi gõ chữ.',
    ],
    theory: [
      { h: 'Gõ chữ trên máy tính' },
      { ul: ['Dùng bàn phím để gõ chữ.', 'Phím cách (Space): tạo khoảng trống giữa hai từ.', 'Phím Backspace: xoá chữ gõ sai.', 'Phím Shift: giữ rồi gõ để có chữ in hoa.'] },
      { note: 'Khi gõ, em nên nhìn vào màn hình và bàn phím để gõ đúng, không nhắm mắt hay nhìn chỗ khác.' },
    ],
    examples: [
      { q: 'Em muốn gõ "ban be" có khoảng trống giữa hai từ. Em nhấn phím gì giữa chúng?', a: 'Em nhấn phím cách (Space) để tạo khoảng trống giữa "ban" và "be".' },
      { q: 'Em gõ sai chữ vừa rồi. Em xoá bằng phím nào?', a: 'Em nhấn phím Backspace để xoá chữ gõ sai.' },
    ],
  },

  'P3TIN-w16-quiz': {
    topic: 'Internet là gì',
    intro: 'Internet giống như một thư viện khổng lồ nối các máy tính khắp thế giới. Cùng tìm hiểu Internet là gì nhé!',
    objectives: [
      'Em hiểu Internet là mạng kết nối nhiều máy tính.',
      'Em biết cần kết nối mạng và dùng trình duyệt để vào Internet.',
    ],
    theory: [
      { h: 'Internet là gì?' },
      { p: 'Internet là mạng kết nối nhiều máy tính trên khắp thế giới. Nhờ Internet, em có thể tìm thông tin, xem video học tập, liên lạc với người khác.' },
      { h: 'Để vào Internet' },
      { ul: ['Máy tính cần được kết nối mạng (wifi hoặc dây mạng).', 'Dùng trình duyệt web (như Chrome, Cốc Cốc) để xem các trang web.', 'Dùng công cụ tìm kiếm (như Google) để tìm thông tin.'] },
      { note: 'Internet rất hữu ích, nhưng em cần dùng an toàn và có người lớn hướng dẫn.' },
    ],
    examples: [
      { q: 'Máy tính của em không có wifi, không có dây mạng. Em có vào được Internet không?', a: 'Không. Máy phải được kết nối mạng (wifi hoặc dây mạng) mới vào được Internet.' },
      { q: 'Em muốn xem một trang web. Em mở phần mềm gì?', a: 'Em mở trình duyệt web, ví dụ Chrome hoặc Cốc Cốc.' },
    ],
  },

  'P3TIN-w17-quiz': {
    topic: 'Lợi ích Internet với học tập',
    intro: 'Internet giúp việc học của em thú vị và dễ dàng hơn rất nhiều. Cùng xem Internet giúp em học thế nào nhé!',
    objectives: [
      'Em biết Internet giúp tìm tài liệu, học bài, xem video.',
      'Em biết chọn nguồn đáng tin và vẫn tự học, tự suy nghĩ.',
    ],
    theory: [
      { h: 'Internet giúp học tập' },
      { ul: ['Tìm tài liệu, học bài, xem video bổ ích.', 'Học một bài hát mới qua video dạy hát.', 'Liên lạc với người thân, thầy cô ở xa.'] },
      { h: 'Dùng cho đúng' },
      { ul: ['Chọn trang đáng tin, hỏi người lớn khi cần.', 'Không tin tất cả mọi thứ, không bấm vào mọi quảng cáo.', 'Vẫn tự suy nghĩ và làm bài, không chép y nguyên.'] },
      { note: 'Internet chỉ hỗ trợ — em vẫn phải tự học và tự suy nghĩ thì mới giỏi lên.' },
    ],
    examples: [
      { q: 'Em không hiểu một bài toán. Em dùng Internet thế nào cho đúng?', a: 'Em tìm video hoặc trang web đáng tin để hiểu cách làm, rồi tự suy nghĩ làm lại, không chép y nguyên.' },
      { q: 'Trên mạng hiện ra nhiều quảng cáo. Em có nên bấm hết không?', a: 'Không nên bấm vào mọi quảng cáo, vì có thể dẫn tới thứ không an toàn. Khi cần, em hỏi người lớn.' },
    ],
  },

  'P3TIN-w18-quiz': {
    topic: 'Ôn tập cuối Học kì 1',
    intro: 'Học kì 1 sắp kết thúc! Cùng ôn lại về phần mềm, Paint, Internet và cách gõ chữ nhé!',
    objectives: [
      'Em nhớ Paint dùng để vẽ, biết lưu bài.',
      'Em nhớ Internet là gì và cách mở phần mềm.',
      'Em nhớ dùng bàn phím để gõ chữ.',
    ],
    theory: [
      { h: 'Ôn lại kiến thức Học kì 1' },
      { ul: ['Paint dùng để vẽ hình và tô màu; vẽ xong phải Lưu (Save).', 'Internet là mạng kết nối nhiều máy tính trên thế giới.', 'Nháy đúp vào biểu tượng để mở phần mềm.', 'Dùng bàn phím để gõ chữ.'] },
      { note: 'Hãy luôn dùng máy tính cẩn thận, ngồi đúng tư thế và nghỉ ngơi khi mỏi nhé!' },
    ],
    examples: [
      { q: 'Em vừa vẽ xong tranh trong Paint. Để giữ lại em phải làm gì?', a: 'Em phải Lưu (Save) bài, vì nếu không lưu mà tắt máy thì bài có thể bị mất.' },
      { q: 'Để mở một phần mềm từ biểu tượng trên màn hình, em làm gì?', a: 'Em nháy đúp vào biểu tượng đó.' },
    ],
  },

  // ──────────────── HK2 ────────────────
  'P3TIN-w19-quiz': {
    topic: 'Dùng Internet an toàn (1)',
    intro: 'Internet rất vui nhưng cũng có những điều cần cẩn thận. Cùng học cách dùng Internet an toàn nhé!',
    objectives: [
      'Em biết nên có người lớn bên cạnh khi dùng Internet.',
      'Em biết cách xử lý khi gặp nội dung xấu hoặc người lạ.',
    ],
    theory: [
      { h: 'Dùng Internet an toàn' },
      { ul: ['Nên có người lớn (bố mẹ, thầy cô) bên cạnh hướng dẫn.', 'Gặp thông tin xấu, hình ảnh đáng sợ: tắt đi và báo người lớn.', 'Người lạ trên mạng rủ gặp mặt: từ chối và báo người lớn.', 'Chỉ vào trang học tập, lành mạnh, phù hợp lứa tuổi.', 'Muốn tải hay cài gì đó: hỏi ý kiến người lớn trước.'] },
      { note: 'Em còn nhỏ, khi dùng Internet hãy luôn nhờ người lớn giúp đỡ để được an toàn.' },
    ],
    examples: [
      { q: 'Trên mạng hiện ra một hình ảnh đáng sợ. Em làm gì?', a: 'Em tắt đi ngay và báo cho người lớn biết, không xem tiếp và không gửi cho bạn.' },
      { q: 'Một người lạ trên mạng rủ em đi gặp mặt. Em làm gì?', a: 'Em từ chối và báo ngay cho bố mẹ, thầy cô. Tuyệt đối không đi gặp người lạ.' },
    ],
  },

  'P3TIN-w20-quiz': {
    topic: 'Dùng Internet an toàn (2)',
    intro: 'Thông tin cá nhân của em rất quý, cần được giữ kín. Cùng học cách bảo vệ thông tin cá nhân trên mạng nhé!',
    objectives: [
      'Em biết giữ kín thông tin cá nhân.',
      'Em biết không chia sẻ mật khẩu, ảnh riêng tư với người lạ.',
    ],
    theory: [
      { h: 'Bảo vệ thông tin cá nhân' },
      { ul: ['Không cho người lạ biết địa chỉ nhà.', 'Giữ kín tên, tuổi, trường, số điện thoại.', 'Không nói mật khẩu cho ai; nếu có người hỏi, báo người lớn.', 'Không tuỳ tiện đăng ảnh riêng tư của em và gia đình lên mạng.'] },
      { note: 'Bảo vệ thông tin cá nhân để tránh bị kẻ xấu lợi dụng. Đây là việc rất quan trọng.' },
    ],
    examples: [
      { q: 'Có người trên mạng hỏi mật khẩu của em. Em làm gì?', a: 'Em không nói mật khẩu cho họ và báo cho người lớn biết. Mật khẩu phải giữ bí mật.' },
      { q: 'Người lạ trên mạng hỏi địa chỉ nhà em. Em trả lời thế nào?', a: 'Em không cho biết địa chỉ nhà, vì cho người lạ biết là rất nguy hiểm.' },
    ],
  },

  'P3TIN-w21-quiz': {
    topic: 'Thư mục và tệp',
    intro: 'Máy tính cất giữ bài làm của em trong các tệp, và sắp xếp chúng trong các thư mục. Cùng tìm hiểu nhé!',
    objectives: [
      'Em hiểu tệp (file) và thư mục (folder) là gì.',
      'Em biết sắp xếp tệp vào thư mục cho gọn gàng.',
    ],
    theory: [
      { h: 'Tệp và thư mục' },
      { ul: ['Tệp (file): nơi chứa một bài làm, một bức tranh, một bài hát... Mỗi tệp có một tên riêng.', 'Thư mục (folder): dùng để chứa và sắp xếp nhiều tệp.', 'Một thư mục có thể chứa nhiều tệp và cả thư mục con.'] },
      { note: 'Sắp các tệp vào thư mục theo nhóm sẽ giúp bài làm gọn gàng và dễ tìm.' },
    ],
    examples: [
      { q: 'Em có nhiều bức tranh đã vẽ. Em nên cất chúng thế nào cho gọn?', a: 'Em tạo một thư mục, ví dụ "Tranh của em", rồi cất tất cả các tệp tranh vào đó.' },
      { q: 'Một bức tranh con mèo em vẽ được lưu thành gì trên máy?', a: 'Lưu thành một tệp (file), tệp đó có một tên riêng để em nhận ra.' },
    ],
  },

  'P3TIN-w22-quiz': {
    topic: 'Sắp xếp, tìm tệp',
    intro: 'Khi có nhiều tệp, em cần biết cách sắp xếp và tìm lại chúng cho nhanh. Cùng học nhé!',
    objectives: [
      'Em biết đặt tên và gom tệp để dễ tìm.',
      'Em biết dùng ô Tìm kiếm khi quên tệp ở đâu.',
    ],
    theory: [
      { h: 'Sắp xếp tệp' },
      { ul: ['Đặt tên rõ ràng, đúng nội dung.', 'Gom các tệp cùng loại vào một thư mục.', 'Có thể sắp xếp tệp theo tên, ngày tạo, loại tệp.'] },
      { h: 'Tìm tệp' },
      { ul: ['Khi quên tệp ở đâu, dùng ô Tìm kiếm (Search) để tìm theo tên.'] },
      { note: 'Sắp xếp gọn gàng giúp em tìm lại tệp nhanh, đỡ mất công.' },
    ],
    examples: [
      { q: 'Em quên mất bức tranh con cá lưu ở thư mục nào. Em làm sao tìm?', a: 'Em dùng ô Tìm kiếm (Search), gõ tên "con ca" để máy tìm giúp.' },
      { q: 'Em có nhiều bài hát trên máy. Em nên làm gì cho gọn?', a: 'Em gom tất cả các tệp bài hát vào một thư mục riêng, ví dụ "Bai hat".' },
    ],
  },

  'P3TIN-w23-quiz': {
    topic: 'Ứng xử văn minh trên mạng',
    intro: 'Trên mạng, em cũng cần lịch sự và tử tế như khi ở ngoài đời. Cùng học cách ứng xử văn minh nhé!',
    objectives: [
      'Em biết nhắn tin, bình luận lịch sự, lễ phép.',
      'Em biết bênh vực bạn khi bạn bị bắt nạt trên mạng.',
    ],
    theory: [
      { h: 'Ứng xử văn minh trên mạng' },
      { ul: ['Nhắn tin, bình luận lịch sự, lễ phép.', 'Không nói lời thô tục, không trêu chọc, doạ nạt người khác.', 'Thấy bạn bị bắt nạt: bênh vực bạn và báo người lớn.', 'Không nói dối, không lừa người khác.'] },
      { note: 'Lời em viết trên mạng có thể làm người khác vui hoặc buồn. Hãy luôn tôn trọng và tử tế với mọi người.' },
    ],
    examples: [
      { q: 'Em thấy một bạn bị nhiều người trêu chọc trên mạng. Em nên làm gì?', a: 'Em bênh vực bạn và báo cho người lớn, không hùa theo trêu hay cười nhạo bạn.' },
      { q: 'Em tức một bạn và muốn viết lời thô tục. Em nên làm gì?', a: 'Em không viết lời thô tục. Em nên bình tĩnh và ứng xử lịch sự, tôn trọng bạn.' },
    ],
  },

  'P3TIN-w24-quiz': {
    topic: 'Bản quyền - tôn trọng sản phẩm người khác',
    intro: 'Tranh, bài viết, bài hát của người khác là công sức của họ. Cùng học cách tôn trọng sản phẩm của người khác nhé!',
    objectives: [
      'Em hiểu cần xin phép, ghi nguồn khi dùng sản phẩm của người khác.',
      'Em biết chép bài của bạn là không trung thực.',
    ],
    theory: [
      { h: 'Tôn trọng bản quyền' },
      { ul: ['Sản phẩm người khác làm ra: tôn trọng, xin phép khi muốn dùng.', 'Dùng hình ảnh của người khác: ghi rõ nguồn hoặc tên tác giả.', 'Không chép y nguyên bài của bạn rồi nộp — đó là không trung thực.'] },
      { note: 'Tôn trọng bản quyền là tôn trọng công sức người tạo ra sản phẩm. Sản phẩm em tự làm là của em, em được tự hào.' },
    ],
    examples: [
      { q: 'Em dùng một bức ảnh đẹp của bạn cho bài của mình. Em nên làm gì?', a: 'Em xin phép bạn và ghi rõ tên bạn (tác giả), không nhận là mình tự làm.' },
      { q: 'Bạn rủ em chép y nguyên bài của bạn để nộp. Em nên làm gì?', a: 'Em từ chối, vì chép y nguyên là không trung thực. Em tự làm bài của mình.' },
    ],
  },

  'P3TIN-w25-quiz': {
    topic: 'Bảo vệ sức khoẻ khi dùng thiết bị số',
    intro: 'Điện thoại, máy tính bảng rất hấp dẫn, nhưng dùng nhiều quá sẽ hại sức khoẻ. Cùng học cách dùng hợp lý nhé!',
    objectives: [
      'Em biết dùng thiết bị số quá nhiều sẽ hại mắt, sức khoẻ.',
      'Em biết nghỉ ngơi, vận động và dùng hợp lý.',
    ],
    theory: [
      { h: 'Dùng thiết bị số hợp lý' },
      { ul: ['Dùng quá nhiều sẽ mỏi mắt, hại sức khoẻ.', 'Nhìn màn hình một lúc nên nghỉ ngơi, nhìn ra xa.', 'Không dùng điện thoại lâu trước khi đi ngủ.', 'Ngoài học và chơi máy, nên vận động, chơi ngoài trời.'] },
      { note: 'Dùng thiết bị số hợp lý là đúng giờ, đúng việc và có nghỉ ngơi.' },
    ],
    examples: [
      { q: 'Sắp đến giờ ngủ mà em vẫn muốn xem điện thoại. Em nên làm gì?', a: 'Em nên cất điện thoại, không dùng lâu trước khi ngủ để dễ ngủ và khoẻ mạnh.' },
      { q: 'Em đã ngồi máy tính khá lâu. Ngoài nghỉ mắt, em nên làm gì cho khoẻ?', a: 'Em nên ra ngoài vận động, chơi ngoài trời để hít thở không khí trong lành.' },
    ],
  },

  'P3TIN-w26-quiz': {
    topic: 'Các bước thực hiện công việc',
    intro: 'Mỗi việc trong đời thường đều có các bước làm theo thứ tự — đó là thuật toán đời thường. Cùng khám phá nhé!',
    objectives: [
      'Em hiểu thuật toán là các bước làm một việc theo thứ tự.',
      'Em biết nêu các bước cho một việc đơn giản.',
    ],
    theory: [
      { h: 'Thuật toán đời thường' },
      { p: 'Thuật toán là các bước làm một việc theo thứ tự. Ví dụ: để pha một cốc nước cam, bước đầu là chuẩn bị cam, cốc, nước.' },
      { h: 'Vì sao cần làm theo bước?' },
      { ul: ['Làm việc đúng và không quên bước nào.', 'Mỗi việc thường làm theo các bước có thứ tự rõ ràng.'] },
      { note: 'Nêu đúng các bước giúp em làm việc đúng, nhanh và ít sai hơn.' },
    ],
    examples: [
      { q: 'Trước khi đến trường, một bước em cần làm là gì?', a: 'Soạn cặp sách đầy đủ — đó là một bước quan trọng trước khi đến trường.' },
      { q: 'Để pha một cốc nước cam, bước đầu tiên là gì?', a: 'Chuẩn bị nguyên liệu và dụng cụ: cam, cốc, nước.' },
    ],
  },

  'P3TIN-w27-quiz': {
    topic: 'Sắp thứ tự các bước',
    intro: 'Các bước phải làm đúng thứ tự thì việc mới thành công. Cùng tập sắp đúng thứ tự các bước nhé!',
    objectives: [
      'Em biết sắp xếp các bước theo đúng thứ tự.',
      'Em hiểu làm sai thứ tự thì việc có thể hỏng.',
    ],
    theory: [
      { h: 'Sắp đúng thứ tự các bước' },
      { ul: ['Đánh răng: lấy bàn chải và kem trước, súc miệng sau, cất bàn chải cuối.', 'Rửa tay: làm ướt tay → xát xà phòng → rửa sạch → lau khô.', 'Trồng cây: đào hố trước rồi mới đặt cây vào.'] },
      { note: 'Làm các bước sai thứ tự thì việc có thể không thành công. Sắp đúng thứ tự giúp việc trơn tru, đúng kết quả.' },
    ],
    examples: [
      { q: 'Khi rửa tay, em làm ướt tay trước hay lau khô trước?', a: 'Làm ướt tay trước, rồi xát xà phòng, rửa sạch, cuối cùng mới lau khô.' },
      { q: 'Để trồng một cây non, em đào hố trước hay đặt cây trước?', a: 'Đào hố trước, rồi mới đặt cây vào hố. Làm ngược lại thì không trồng được.' },
    ],
  },

  'P3TIN-w28-quiz': {
    topic: 'Sơ đồ khối đơn giản',
    intro: 'Sơ đồ khối dùng hình vẽ và mũi tên để mô tả các bước làm việc. Cùng đọc sơ đồ khối nhé!',
    objectives: [
      'Em hiểu sơ đồ khối mô tả các bước bằng hình.',
      'Em biết mũi tên chỉ thứ tự các bước.',
    ],
    theory: [
      { h: 'Sơ đồ khối là gì?' },
      { p: 'Sơ đồ khối dùng để mô tả các bước làm việc bằng hình. Các bước được nối với nhau bằng mũi tên chỉ thứ tự.' },
      { h: 'Cách đọc sơ đồ khối' },
      { ul: ['Mũi tên cho biết đi từ bước này sang bước tiếp theo.', 'Thường đọc theo mũi tên, từ trên xuống.'] },
      { note: 'Sơ đồ khối giúp em nhìn rõ thứ tự các bước, dễ nhớ và dễ làm theo.' },
    ],
    examples: [
      { q: 'Trong sơ đồ khối, cái gì cho em biết thứ tự các bước?', a: 'Mũi tên — nó chỉ chiều đi từ bước này sang bước tiếp theo.' },
      { q: 'Em đọc sơ đồ khối theo chiều nào?', a: 'Theo chiều mũi tên, thường là từ trên xuống.' },
    ],
  },

  'P3TIN-w29-quiz': {
    topic: 'Lặp lại công việc',
    intro: 'Có những việc em làm đi làm lại mỗi ngày, như đánh răng, tưới cây — đó là lặp lại. Cùng tìm hiểu nhé!',
    objectives: [
      'Em hiểu lặp lại là làm đi làm lại một việc.',
      'Em nhận ra các việc được lặp lại trong đời sống.',
    ],
    theory: [
      { h: 'Lặp lại là gì?' },
      { p: 'Lặp lại nghĩa là làm đi làm lại một việc giống nhau nhiều lần. Ví dụ: đánh răng mỗi ngày, tưới cây mỗi sáng.' },
      { h: 'Nhận ra việc lặp lại' },
      { ul: ['Việc giống nhau làm nhiều lần là việc được lặp lại.', 'Việc chỉ xảy ra một lần (như sinh ra) thì không phải lặp lại.'] },
      { note: 'Lặp lại đều đặn những việc tốt giúp em hình thành thói quen tốt.' },
    ],
    examples: [
      { q: 'Tưới cây mỗi sáng là ví dụ của điều gì?', a: 'Là công việc được lặp lại hằng ngày, vì em làm đi làm lại mỗi sáng.' },
      { q: 'Đánh răng mỗi ngày có phải việc lặp lại không?', a: 'Có. Đánh răng được lặp lại mỗi ngày, giúp em có thói quen tốt.' },
    ],
  },

  'P3TIN-w30-quiz': {
    topic: 'Lựa chọn (nếu... thì...)',
    intro: 'Nhiều khi em phải quyết định tuỳ tình huống: "nếu... thì...". Cùng học về câu lựa chọn theo điều kiện nhé!',
    objectives: [
      'Em hiểu câu lựa chọn "nếu... thì...".',
      'Em nhận ra phần điều kiện trong câu lựa chọn.',
    ],
    theory: [
      { h: 'Câu lựa chọn theo điều kiện' },
      { ul: ['"Nếu trời mưa thì mang ô" — đây là câu lựa chọn.', '"Nếu đèn xanh thì được phép đi."', '"Nếu làm xong bài thì được đi chơi."'] },
      { h: 'Phần điều kiện' },
      { p: 'Trong câu "Nếu đói thì ăn cơm", phần "đói" là điều kiện. Nếu điều kiện đúng thì em làm việc phía sau (ăn cơm).' },
      { note: 'Câu lựa chọn "nếu... thì..." giúp em quyết định làm gì tuỳ từng tình huống.' },
    ],
    examples: [
      { q: '"Nếu trời mưa thì mang ô." Phần nào là điều kiện?', a: 'Phần "trời mưa" là điều kiện. Nếu trời mưa (điều kiện đúng) thì em mang ô.' },
      { q: 'Đèn giao thông màu xanh thì em làm gì?', a: 'Nếu đèn xanh thì em được phép đi. Đó là một câu lựa chọn theo điều kiện.' },
    ],
  },

  'P3TIN-w31-quiz': {
    topic: 'Soạn thảo - gõ & trình bày chữ',
    intro: 'Phần mềm soạn thảo giúp em gõ và trình bày chữ thật đẹp. Cùng làm quen với các nút trình bày nhé!',
    objectives: [
      'Em biết phần mềm soạn thảo dùng để gõ và trình bày chữ.',
      'Em biết làm chữ đậm, đổi cỡ chữ, xuống dòng.',
    ],
    theory: [
      { h: 'Phần mềm soạn thảo' },
      { p: 'Phần mềm soạn thảo văn bản dùng để gõ và trình bày chữ, văn bản.' },
      { h: 'Trình bày chữ' },
      { ul: ['Nút B (Bold): làm chữ in đậm.', 'Cỡ chữ: thay đổi để chữ to hơn hoặc nhỏ hơn.', 'Phím Enter: xuống dòng mới.'] },
      { note: 'Trình bày rõ ràng, chữ đều, ngay ngắn sẽ giúp bài đẹp và dễ đọc.' },
    ],
    examples: [
      { q: 'Em muốn tiêu đề bài nổi bật hơn. Em dùng nút nào?', a: 'Em dùng nút B (Bold) để làm chữ in đậm, hoặc tăng cỡ chữ cho to hơn.' },
      { q: 'Em muốn viết câu mới ở dòng dưới. Em nhấn phím gì?', a: 'Em nhấn phím Enter để xuống dòng mới.' },
    ],
  },

  'P3TIN-w32-quiz': {
    topic: 'Chèn hình vào bài',
    intro: 'Một bài viết có thêm hình ảnh phù hợp sẽ sinh động và dễ hiểu hơn. Cùng học cách chèn hình nhé!',
    objectives: [
      'Em biết chèn hình giúp bài sinh động, dễ hiểu.',
      'Em biết dùng lệnh Chèn và chọn hình phù hợp.',
    ],
    theory: [
      { h: 'Chèn hình vào bài' },
      { ul: ['Dùng lệnh Chèn (Insert) → Hình ảnh để thêm hình.', 'Chọn hình phù hợp với nội dung bài.', 'Sau khi chèn, có thể phóng to, thu nhỏ, di chuyển hình.'] },
      { note: 'Một bài có cả chữ và hình phù hợp sẽ hấp dẫn và dễ hiểu hơn. Tránh dùng hình không liên quan hay hình xấu, mờ.' },
    ],
    examples: [
      { q: 'Em viết bài về con voi và muốn thêm hình con voi. Em làm thế nào?', a: 'Em dùng lệnh Chèn (Insert) → Hình ảnh, rồi chọn một hình con voi phù hợp với bài.' },
      { q: 'Hình em vừa chèn quá to. Em có sửa được không?', a: 'Được. Sau khi chèn, em có thể thu nhỏ, phóng to hoặc di chuyển hình cho vừa.' },
    ],
  },

  'P3TIN-w33-quiz': {
    topic: 'Dự án nhỏ - sản phẩm số',
    intro: 'Em có thể tự làm ra sản phẩm số như tấm thiệp, bài viết bằng máy tính. Cùng làm một dự án nhỏ nhé!',
    objectives: [
      'Em hiểu sản phẩm số là sản phẩm làm bằng máy tính.',
      'Em biết các bước làm dự án và hợp tác với bạn.',
    ],
    theory: [
      { h: 'Sản phẩm số là gì?' },
      { p: 'Sản phẩm số là sản phẩm làm bằng máy tính, ví dụ: tranh vẽ, bài viết, tấm thiệp chúc mừng.' },
      { h: 'Làm dự án nhỏ' },
      { ul: ['Bước đầu: nghĩ ý tưởng, lên kế hoạch.', 'Làm cùng bạn: hợp tác, chia việc, giúp đỡ nhau.', 'Làm xong: lưu lại và chia sẻ với mọi người.'] },
      { note: 'Hãy tự hào về sản phẩm em làm ra và mạnh dạn chia sẻ với mọi người nhé!' },
    ],
    examples: [
      { q: 'Em muốn làm một tấm thiệp chúc mừng sinh nhật mẹ bằng máy tính. Bước đầu em làm gì?', a: 'Em nghĩ ý tưởng và lên kế hoạch: thiệp có hình gì, lời chúc gì, màu sắc ra sao.' },
      { q: 'Làm dự án cùng các bạn, em nên ứng xử thế nào?', a: 'Em hợp tác, chia việc và giúp đỡ nhau, không ôm hết hay cãi nhau.' },
    ],
  },

  'P3TIN-w34-quiz': {
    topic: 'Em là người dùng máy tính thông minh',
    intro: 'Người dùng máy tính thông minh biết dùng đúng cách, an toàn và biết cân bằng. Cùng trở thành người dùng thông minh nhé!',
    objectives: [
      'Em biết dùng máy tính đúng cách, đúng lúc, an toàn.',
      'Em biết kiểm tra thông tin và hỏi người lớn khi cần.',
    ],
    theory: [
      { h: 'Người dùng máy tính thông minh' },
      { ul: ['Dùng đúng cách, đúng lúc và an toàn.', 'Suy nghĩ, kiểm tra thông tin trước khi tin.', 'Giữ gìn máy, không tải hay cài thứ lạ.', 'Cân bằng giữa học, chơi, nghỉ ngơi và vận động.'] },
      { note: 'Khi chưa chắc về điều gì trên máy tính hay mạng, em nên hỏi người lớn để được giúp đỡ.' },
    ],
    examples: [
      { q: 'Trên mạng có một thông tin lạ, em chưa rõ đúng sai. Em làm gì?', a: 'Em suy nghĩ và kiểm tra trước khi tin, không chia sẻ luôn. Khi cần, em hỏi người lớn.' },
      { q: 'Một trang mạng bảo em tải một phần mềm lạ. Em làm gì?', a: 'Em không tải bừa. Em hỏi người lớn trước, vì cài thứ lạ có thể hại máy.' },
    ],
  },

  'P3TIN-w35-quiz': {
    topic: 'Ôn tập cuối năm',
    intro: 'Một năm học sắp khép lại! Cùng ôn lại những điều quan trọng nhất về máy tính, Internet, an toàn và thuật toán nhé!',
    objectives: [
      'Em nhớ các bộ phận máy tính và lợi ích Internet.',
      'Em nhớ cách giữ an toàn thông tin cá nhân.',
      'Em nhớ thuật toán là các bước theo thứ tự.',
    ],
    theory: [
      { h: 'Ôn lại kiến thức cả năm' },
      { ul: ['Bàn phím để gõ chữ và số; màn hình để xem; chuột để chọn.', 'Internet giúp tìm thông tin, học bài, xem video.', 'Thông tin cá nhân: giữ kín, không cho người lạ.', 'Thuật toán đời thường: các bước làm một việc theo thứ tự.', 'Người dùng thông minh: dùng đúng cách, đúng lúc, an toàn.'] },
      { note: 'Chúc các em nghỉ hè vui khoẻ và luôn là người dùng máy tính thông minh, an toàn nhé!' },
    ],
    examples: [
      { q: 'Trên mạng, thông tin cá nhân của em nên thế nào?', a: 'Giữ kín, không cho người lạ. Đây là việc rất quan trọng để được an toàn.' },
      { q: 'Thuật toán đời thường là gì?', a: 'Là các bước làm một việc theo thứ tự, ví dụ các bước rửa tay hay đánh răng.' },
    ],
  },

  'P3TIN-w36-quiz': {
    topic: 'Kết thúc Lớp 3 — Tin học: Em đã là "công dân số" nhỏ!',
    intro: 'Một năm Tin học Lớp 3 đầy thú vị và khám phá đã gần kết thúc! Em đã học cách dùng máy tính, vẽ tranh số, gõ phím và suy nghĩ như lập trình viên. Hôm nay cùng nhìn lại và chuẩn bị cho hành trình số hoá tiếp theo!',
    objectives: [
      'Tổng kết kiến thức và kĩ năng Tin học Lớp 3 đã học.',
      'Hiểu vai trò của công nghệ trong cuộc sống hiện đại.',
      'Chuẩn bị tinh thần học tập Tin học nâng cao ở Lớp 4.',
    ],
    theory: [
      { h: 'Hành trình số của em trong năm Lớp 3' },
      { ul: [
        'MÁY TÍNH CƠ BẢN: Bộ phận máy tính (CPU, màn hình, bàn phím, chuột); bật tắt an toàn; màn hình desktop và cửa sổ ứng dụng.',
        'GÕ PHÍM: Ngón tay đặt đúng vị trí; phím hàng chủ (ASDF JKL;); luyện tập gõ không nhìn bàn phím.',
        'PHẦN MỀM: Dùng Paint vẽ tranh số; dùng Word/Writer gõ văn bản ngắn; lưu file và tìm lại.',
        'AN TOÀN SỐ: Bảo mật thông tin cá nhân; không cho người lạ biết tên, địa chỉ, số điện thoại; nhờ người lớn khi gặp nội dung lạ.',
        'TƯ DUY THUẬT TOÁN: Hiểu thuật toán là dãy các bước tuần tự; viết thuật toán đơn giản bằng lời.',
      ] },
      { h: 'Công nghệ thay đổi thế giới như thế nào?' },
      { p: 'Ngày nay, công nghệ có mặt khắp nơi: từ điện thoại bố mẹ dùng đến máy ATM, từ đèn giao thông thông minh đến robot nhà máy. Người hiểu công nghệ sẽ có nhiều cơ hội hơn trong tương lai!' },
      { h: 'Lớp 4 sẽ học gì?' },
      { ul: [
        'Lập trình trực quan cơ bản bằng Scratch hoặc block coding.',
        'Tìm kiếm thông tin trên internet một cách an toàn.',
        'Tạo bài trình chiếu PowerPoint đơn giản.',
      ] },
      { note: 'Hè này hãy tập gõ 10 ngón hàng ngày — chỉ 10 phút/ngày, đến lớp 4 em sẽ gõ nhanh hơn cả thầy cô!' },
    ],
    examples: [
      { q: 'Viết thuật toán 5 bước để gửi tin nhắn chúc mừng sinh nhật bạn qua điện thoại.', a: '1. Mở ứng dụng nhắn tin. 2. Tìm tên bạn trong danh bạ. 3. Nhấn vào cuộc trò chuyện. 4. Gõ "Chúc mừng sinh nhật bạn nhé!". 5. Nhấn Gửi.' },
      { q: 'Có 3 việc em KHÔNG nên làm khi dùng máy tính ở lớp. Hãy kể.', a: '1. Vào trang web không liên quan đến bài học. 2. Mở file của bạn khác khi chưa được phép. 3. Tắt máy tính đột ngột mà không lưu bài.' },
    ],
  },
};
