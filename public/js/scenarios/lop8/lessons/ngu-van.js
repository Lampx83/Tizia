// ============================================================
// Lớp 8 · NGỮ VĂN — Lý thuyết + Ví dụ 35 tuần (GDPT 2018)
// Key TRÙNG id quiz: "S8NV-wNN-quiz".
// Bám SGK Ngữ văn 8 (KNTT, CTST, Cánh Diều). Dùng cho "Học thêm" trước quiz.
// ============================================================

const L = (topic, intro, objectives, theory, examples) => ({ topic, intro, objectives, theory, examples });

export const S8NV_LESSONS = {
  'S8NV-w01-quiz': L(
    'Tôi đi học — Thanh Tịnh',
    'Các em thân mến, ta mở đầu Ngữ văn 8 bằng một truyện ngắn dịu dàng như một bài thơ — "Tôi đi học" của Thanh Tịnh. Hãy để dòng hồi tưởng về buổi tựu trường đầu tiên dẫn ta vào thế giới của những cảm xúc trong trẻo nhất.',
    [
      'Hiểu nội dung và đặc sắc nghệ thuật của truyện ngắn giàu chất trữ tình.',
      'Phân tích diễn biến tâm trạng nhân vật "tôi" theo trình tự thời gian.',
      'Nhận diện và cảm nhận giá trị của các hình ảnh so sánh giàu chất thơ.',
      'Liên hệ kỉ niệm ngày đầu đến trường của bản thân.',
    ],
    [
      { h: 'Tác giả Thanh Tịnh' },
      { p: 'Thanh Tịnh (1911–1988), tên khai sinh Trần Văn Ninh, quê ở Huế. Ông sáng tác cả thơ và văn xuôi; văn phong đằm thắm, êm dịu, trong trẻo, đậm chất trữ tình. Tập truyện ngắn "Quê mẹ" (1941) là tác phẩm tiêu biểu, trong đó có "Tôi đi học".' },
      { h: 'Xuất xứ và thể loại' },
      { p: '"Tôi đi học" in trong tập "Quê mẹ" (1941), thuộc thể loại truyện ngắn trữ tình. Truyện không xây dựng cốt truyện gay cấn mà là dòng hồi tưởng êm đềm về buổi tựu trường đầu tiên — gần với tản văn, tuỳ bút.' },
      { h: 'Mạch cảm xúc của truyện' },
      { ul: [
        'Khơi nguồn: cảnh cuối thu, lá rụng, mây bàng bạc gợi nhớ buổi tựu trường.',
        'Trên đường tới trường: con đường quen bỗng thấy lạ, cảnh vật đổi thay trong lòng "tôi".',
        'Trước sân trường: ngỡ ngàng trước ngôi trường Mĩ Lí, hồi hộp khi nghe gọi tên.',
        'Vào lớp học: bỡ ngỡ rồi dần thân thuộc, đón nhận bài học đầu tiên.',
      ] },
      { h: 'Diễn biến tâm trạng nhân vật "tôi"' },
      { p: 'Tâm trạng "tôi" biến chuyển tinh tế: từ nao nức, mơn man khi nhớ lại, đến trang trọng, đứng đắn khi cầm vở mới; từ bỡ ngỡ, lo sợ vẩn vơ giữa sân trường đến giật mình lúng túng khi nghe gọi tên, rồi vừa ngỡ ngàng vừa tự tin bước vào lớp học đầu đời.' },
      { h: 'Đặc sắc nghệ thuật' },
      { ul: [
        'Kết hợp hài hoà tự sự, miêu tả và biểu cảm.',
        'Hình ảnh so sánh giàu chất thơ, gợi cảm.',
        'Ngôn ngữ trong sáng, giọng văn nhẹ nhàng, ấm áp, đầy hoài niệm.',
        'Bố cục theo dòng hồi tưởng, mạch cảm xúc tự nhiên.',
      ] },
      { note: 'Câu mở đầu nổi tiếng: "Hằng năm cứ vào cuối thu, lá ngoài đường rụng nhiều và trên không có những đám mây bàng bạc, lòng tôi lại nao nức những kỉ niệm mơn man của buổi tựu trường." — Đây là "cánh cửa" mở ra cả thiên truyện.' },
    ],
    [
      { q: 'Phân tích tâm trạng nhân vật "tôi" trên đường cùng mẹ đến trường ngày đầu.', a: 'Con đường vốn quen "tôi" đi lại lắm lần bỗng thấy lạ, cảnh vật chung quanh đều thay đổi — vì chính lòng "tôi" đang có sự thay đổi lớn: hôm nay tôi đi học. Cảm giác trang trọng, đứng đắn khiến cậu bé thấy mình đã lớn, không lội qua sông thả diều, không ra đồng nô đùa như thằng Sơn nữa. Sự thay đổi của cảnh chính là tấm gương phản chiếu sự đổi thay trong tâm hồn.' },
      { q: 'Tìm và phân tích một hình ảnh so sánh đặc sắc trong truyện.', a: '"Ý nghĩ ấy thoáng qua trong trí tôi nhẹ nhàng như một làn mây lướt ngang trên ngọn núi." So sánh ý nghĩ trừu tượng với làn mây cụ thể, nhẹ, thoáng — vừa diễn tả được sự non nớt, trong sáng của ý nghĩ trẻ thơ, vừa làm câu văn bay bổng, giàu chất thơ.' },
      { q: 'Hình ảnh "bàn tay dịu dàng đẩy tôi tới trước" của ông đốc và người mẹ gợi điều gì?', a: 'Gợi sự nâng đỡ ân cần của người lớn dành cho trẻ thơ trong bước ngoặt đầu đời. Bàn tay ấy vừa xua tan nỗi sợ, vừa trao niềm tin để cậu bé can đảm bước vào lớp học — vào một thế giới mới mẻ, thiêng liêng.' },
    ]
  ),

  'S8NV-w02-quiz': L(
    'Trong lòng mẹ — Nguyên Hồng',
    'Tuần này, cô trò mình bước vào trang hồi kí thấm đẫm nước mắt và tình thương — "Trong lòng mẹ", trích "Những ngày thơ ấu" của Nguyên Hồng. Ở đó, tình mẫu tử hiện lên thiêng liêng và mãnh liệt đến nghẹn ngào.',
    [
      'Hiểu nội dung và đặc trưng thể loại hồi kí qua đoạn trích.',
      'Phân tích tâm trạng đau đớn và tình yêu mẹ mãnh liệt của bé Hồng.',
      'Cảm nhận giọng văn trữ tình thiết tha, đầy cảm xúc của Nguyên Hồng.',
      'Hiểu giá trị nhân đạo: ngợi ca tình mẫu tử, lên án thành kiến cổ hủ.',
    ],
    [
      { h: 'Tác giả Nguyên Hồng' },
      { p: 'Nguyên Hồng (1918–1982), quê Nam Định, sống nhiều ở Hải Phòng. Ông được mệnh danh là "nhà văn của những người cùng khổ" — phụ nữ, trẻ em, dân nghèo thành thị. Văn Nguyên Hồng giàu cảm xúc, thiết tha, mãnh liệt.' },
      { h: 'Xuất xứ và thể loại' },
      { p: '"Trong lòng mẹ" là chương IV của tập hồi kí "Những ngày thơ ấu" (1938–1940), kể về tuổi thơ cay đắng nhưng giàu tình thương của chính tác giả. Thể loại hồi kí — ghi lại những điều có thật trong cuộc đời người viết.' },
      { h: 'Tình cảnh của bé Hồng' },
      { ul: [
        'Cha mất, mẹ vì cùng túng phải đi tha hương cầu thực.',
        'Sống trong sự ghẻ lạnh của họ hàng bên nội.',
        'Bị bà cô gieo rắc thành kiến, lời lẽ cay độc về mẹ.',
      ] },
      { h: 'Nhân vật người cô' },
      { p: 'Người cô hiện lên với nụ cười "rất kịch", giọng nói ngọt mà cay nghiệt, cố ý gieo vào lòng bé Hồng sự khinh miệt, ruồng rẫy mẹ. Đó là hiện thân của thành kiến phong kiến tàn nhẫn, lạnh lùng đối với người phụ nữ.' },
      { h: 'Tình yêu mẹ của bé Hồng' },
      { p: 'Dù bị gieo rắc nghi ngờ, bé Hồng vẫn yêu mẹ tha thiết. Em căm ghét những cổ tục đã đày đoạ mẹ: "Giá những cổ tục đã đày đoạ mẹ tôi là một vật như hòn đá hay cục thuỷ tinh, đầu mẩu gỗ, tôi quyết vồ ngay lấy mà cắn, mà nhai, mà nghiến cho kì nát vụn mới thôi."' },
      { h: 'Giây phút trong lòng mẹ' },
      { ul: [
        'Thoáng thấy bóng người giống mẹ, em cuống quýt đuổi theo, gọi bối rối.',
        'Khi được mẹ kéo lên xe, em oà khóc nức nở — niềm sung sướng và tủi hờn vỡ oà.',
        'Cảm giác ấm áp khi áp mặt vào ngực mẹ — "êm dịu vô cùng".',
      ] },
      { note: 'Lời bình nổi tiếng: "Phải bé lại và lăn vào lòng một người mẹ... mới thấy người mẹ có một êm dịu vô cùng." Tình mẫu tử ở đây thiêng liêng, vượt lên mọi rẻ rúng, thành kiến.' },
    ],
    [
      { q: 'Vì sao những lời cay độc của người cô không làm bé Hồng ghét mẹ mà chỉ khiến em đau hơn?', a: 'Vì tình yêu mẹ trong em đã thành "tình thương yêu và lòng kính mến mẹ" bền chặt, không gì lay chuyển nổi. Em nhận ra dã tâm của người cô, nên lời cay độc chỉ làm em xót xa, căm giận những cổ tục đã đày đoạ mẹ, chứ không thể chia rẽ tình mẹ con. Đau là vì thương mẹ chứ không phải vì ngờ vực mẹ.' },
      { q: 'Phân tích cảm xúc của bé Hồng khi được nằm trong lòng mẹ.', a: 'Đó là niềm hạnh phúc tột cùng. Em oà khóc nức nở — tiếng khóc của tủi hờn dồn nén bấy lâu được giải toả, và của sung sướng vô bờ khi được gặp lại mẹ. Cảm giác ấm áp, mơn man khi áp mặt vào ngực mẹ, ngửi thấy hơi thở quen thuộc khiến em quên hết những lời cay nghiệt — chỉ còn lại "êm dịu vô cùng" của lòng mẹ.' },
      { q: 'Đoạn trích thể hiện đặc điểm nào của thể hồi kí?', a: 'Đoạn trích mang đậm chất hồi kí: kể lại sự việc có thật trong tuổi thơ tác giả bằng ngôi thứ nhất ("tôi"); cảm xúc chân thật, mãnh liệt, không che giấu; chi tiết nhỏ giàu sức gợi (hơi thở, hơi ấm của mẹ). Cái "tôi" trữ tình nhập cuộc, vừa kể vừa bộc lộ nỗi đau và niềm hạnh phúc của chính mình.' },
    ]
  ),

  'S8NV-w03-quiz': L(
    'Tức nước vỡ bờ — Ngô Tất Tố',
    'Từ trang hồi kí xúc động, ta bước sang một trang hiện thực dữ dội — "Tức nước vỡ bờ", trích "Tắt đèn" của Ngô Tất Tố. Đây là nơi sức chịu đựng của người nông dân bị dồn đến tận cùng và bùng lên thành sức phản kháng mãnh liệt.',
    [
      'Hiểu bức tranh hiện thực xã hội nông thôn Việt Nam trước Cách mạng tháng Tám.',
      'Phân tích diễn biến tâm lí và hành động của nhân vật chị Dậu.',
      'Cảm nhận quy luật "tức nước vỡ bờ" và tinh thần phản kháng của người nông dân.',
      'Hiểu giá trị hiện thực và nhân đạo của tác phẩm.',
    ],
    [
      { h: 'Tác giả Ngô Tất Tố' },
      { p: 'Ngô Tất Tố (1893–1954), quê làng Lộc Hà (nay thuộc Hà Nội), là nhà văn hiện thực phê phán xuất sắc, nhà báo, học giả. Ông am hiểu sâu sắc đời sống nông thôn và đặc biệt thành công khi viết về người nông dân.' },
      { h: 'Tác phẩm "Tắt đèn" và đoạn trích' },
      { p: '"Tắt đèn" (1939) là kiệt tác hiện thực, dựng lại bộ mặt tàn ác của xã hội thực dân nửa phong kiến qua nạn sưu thuế. "Tức nước vỡ bờ" trích chương XVIII, kể cảnh nhà chị Dậu trong vụ thu sưu.' },
      { h: 'Tình thế của gia đình chị Dậu' },
      { ul: [
        'Phải bán con, bán chó, bán cả gánh khoai để nộp sưu cho chồng.',
        'Còn thiếu suất sưu của người em chồng đã chết.',
        'Anh Dậu ốm yếu, vừa bị đánh trói ngoài đình, được khiêng về.',
      ] },
      { h: 'Sự tàn bạo của cai lệ và người nhà lí trưởng' },
      { p: 'Cai lệ và người nhà lí trưởng xông vào "sầm sập", quát tháo, bịch vào ngực chị Dậu, sấn đến trói anh Dậu đang ốm. Chúng là hiện thân của bộ máy thống trị tàn bạo, mất hết tính người, chỉ biết roi vọt, dây thừng.' },
      { h: 'Diễn biến tâm lí và hành động của chị Dậu' },
      { ul: [
        'Ban đầu: van xin tha thiết, xưng "cháu" gọi "ông" — nhẫn nhịn.',
        'Khi cai lệ bịch vào ngực, sấn tới trói chồng: liều mạng cự lại, xưng "tôi" gọi "ông".',
        'Khi bị tát: vùng lên phản kháng, xưng "bà" gọi "mày", quật ngã cả hai tên tay sai.',
      ] },
      { h: 'Quy luật "tức nước vỡ bờ"' },
      { p: 'Sự thay đổi cách xưng hô (cháu–ông → tôi–ông → bà–mày) cho thấy người nông dân hiền lành khi bị áp bức đến cùng cực sẽ vùng lên mạnh mẽ. Đó chính là quy luật "có áp bức, có đấu tranh".' },
      { note: 'Câu nói khảng khái của chị Dậu: "Thà ngồi tù. Để cho chúng nó làm tình làm tội mãi thế, tôi không chịu được." — thể hiện sức sống tiềm tàng và tinh thần phản kháng quật cường.' },
    ],
    [
      { q: 'Vì sao chị Dậu chuyển từ van xin nhẫn nhịn sang phản kháng quyết liệt?', a: 'Lúc đầu chị van xin để mong cứu chồng đang ốm. Nhưng khi cai lệ không thèm nghe, bịch vào ngực chị rồi sấn đến trói anh Dậu, sức chịu đựng của chị bị đẩy đến giới hạn. Lòng yêu thương chồng cùng sự phẫn uất trước cái ác đã khiến chị vùng dậy phản kháng — tình thế "tức nước vỡ bờ", không thể nhẫn nhịn thêm.' },
      { q: 'Phân tích ý nghĩa nhan đề "Tức nước vỡ bờ".', a: 'Nhan đề mượn hình ảnh tự nhiên: nước dâng quá cao, quá mạnh thì bờ phải vỡ. Đặt vào tác phẩm, nó biểu thị quy luật xã hội: khi người dân bị áp bức, bóc lột đến tận cùng, họ tất yếu sẽ vùng lên đấu tranh. Nhan đề khái quát tinh thần phản kháng và dự báo quy luật "có áp bức, có đấu tranh".' },
      { q: 'Hành động phản kháng của chị Dậu thể hiện vẻ đẹp gì ở người phụ nữ nông dân?', a: 'Thể hiện vẻ đẹp của tình yêu thương chồng con tha thiết, đức hi sinh, và đặc biệt là sức sống tiềm tàng, tinh thần phản kháng mạnh mẽ. Người phụ nữ tưởng chừng nhẫn nhục, cam chịu lại có sức mạnh quật ngã hai tên tay sai — đó là sức mạnh của lòng căm thù và bản lĩnh của người lao động khi bị dồn đến đường cùng.' },
    ]
  ),

  'S8NV-w04-quiz': L(
    'Lão Hạc — Nam Cao',
    'Tuần này ta gặp một trong những trang văn cảm động nhất viết về người nông dân — truyện ngắn "Lão Hạc" của Nam Cao. Một cái chết đau đớn nhưng sáng ngời nhân cách, để lại trong lòng người đọc nỗi day dứt khôn nguôi.',
    [
      'Hiểu số phận bi thảm và vẻ đẹp nhân cách của người nông dân qua nhân vật lão Hạc.',
      'Phân tích nghệ thuật miêu tả tâm lí nhân vật bậc thầy của Nam Cao.',
      'Cảm nhận giá trị hiện thực và nhân đạo sâu sắc của truyện.',
      'Hiểu ý nghĩa những triết lí về con người mà tác giả gửi gắm.',
    ],
    [
      { h: 'Tác giả Nam Cao' },
      { p: 'Nam Cao (1915–1951), tên thật Trần Hữu Tri, quê Hà Nam, là nhà văn hiện thực xuất sắc và là một trong những cây bút truyện ngắn tài năng nhất của văn học Việt Nam hiện đại. Ông có biệt tài phân tích tâm lí, ngòi bút thấm đượm tinh thần nhân đạo.' },
      { h: 'Tác phẩm "Lão Hạc"' },
      { p: '"Lão Hạc" (1943) viết về người nông dân nghèo trước Cách mạng. Truyện kể bằng lời nhân vật ông giáo — người hàng xóm chứng kiến và thấu hiểu lão Hạc.' },
      { h: 'Hoàn cảnh của lão Hạc' },
      { ul: [
        'Vợ chết, con trai vì nghèo không lấy được vợ, phẫn chí bỏ đi làm phu đồn điền cao su.',
        'Lão sống cô đơn, làm bạn với con chó Vàng — kỉ vật của con trai.',
        'Ốm đau, mất việc, không muốn tiêu vào tiền và mảnh vườn để dành cho con.',
      ] },
      { h: 'Tâm trạng lão Hạc khi bán cậu Vàng' },
      { p: 'Bán "cậu Vàng", lão day dứt như đã lừa một con vật trung thành. Lão "cười như mếu", "mắt ầng ậng nước", rồi "mặt co rúm lại", "những nếp nhăn xô lại với nhau, ép cho nước mắt chảy ra"... Nỗi đau đớn, ân hận được Nam Cao khắc hoạ tinh tế qua từng nét mặt.' },
      { h: 'Cái chết của lão Hạc' },
      { p: 'Lão gửi ông giáo mảnh vườn và tiền lo ma chay, rồi xin bả chó của Binh Tư, tự kết liễu đời mình bằng cái chết dữ dội, đau đớn. Cái chết ấy là sự lựa chọn để giữ trọn nhân cách: không tiêu lạm vào phần của con, không sống lay lắt bằng sự lừa lọc.' },
      { h: 'Triết lí về con người' },
      { ul: [
        '"Một người đau chân có lúc nào quên được cái chân đau của mình để nghĩ đến một cái gì khác đâu?" — triết lí về sự ích kỉ và lòng cảm thông.',
        '"Chao ôi! Đối với những người ở quanh ta... cái bản tính tốt của người ta bị những nỗi lo lắng, buồn đau, ích kỉ che lấp mất." — cái nhìn nhân hậu, bao dung.',
      ] },
      { note: 'Giá trị nhân đạo: Nam Cao trân trọng, ngợi ca nhân cách cao đẹp của người nông dân nghèo; đồng thời tố cáo xã hội đẩy con người lương thiện vào đường cùng.' },
    ],
    [
      { q: 'Vì sao lão Hạc chọn cái chết? Cái chết ấy nói lên điều gì về nhân cách lão?', a: 'Lão chọn chết để giữ trọn nhân cách và lòng tự trọng: không muốn tiêu lạm vào số tiền và mảnh vườn dành cho con, không muốn sống bằng cách "ăn vạ" hay lừa lọc như Binh Tư. Cái chết đau đớn bằng bả chó như một sự tự trừng phạt vì đã "lừa" cậu Vàng. Đó là cái chết đầy bi tráng, khẳng định nhân cách trong sạch, lòng thương con vô bờ và sự tự trọng cao quý của lão.' },
      { q: 'Phân tích nghệ thuật miêu tả tâm lí của Nam Cao qua đoạn lão Hạc kể chuyện bán chó.', a: 'Nam Cao miêu tả tâm lí qua ngoại hình một cách bậc thầy: "cười như mếu", "đôi mắt ầng ậng nước", "mặt đột nhiên co rúm lại", "những vết nhăn xô lại với nhau, ép cho nước mắt chảy ra", "cái đầu ngoẹo về một bên", "cái miệng móm mém mếu như con nít". Mỗi chi tiết ngoại hình đều phơi bày nội tâm giằng xé — sự đau đớn, ân hận tột cùng của một con người nhân hậu khi buộc phải làm điều trái với lòng mình.' },
      { q: 'Nhân vật ông giáo có vai trò gì trong truyện?', a: 'Ông giáo là người kể chuyện ở ngôi thứ nhất, vừa chứng kiến vừa thấu hiểu và đồng cảm với lão Hạc. Qua cái nhìn của ông giáo, câu chuyện trở nên chân thực, giàu cảm xúc; đồng thời ông giáo cũng là người phát ngôn cho những triết lí nhân sinh sâu sắc của Nam Cao về cách nhìn nhận, đánh giá con người — phải nhìn bằng đôi mắt của tình thương.' },
    ]
  ),

  'S8NV-w05-quiz': L(
    'Trường từ vựng',
    'Sau những trang truyện đầy cảm xúc, ta chuyển sang một mảnh đất thú vị của Tiếng Việt — trường từ vựng. Hiểu được nó, các em sẽ thấy các từ trong tiếng Việt không đứng riêng lẻ mà liên kết với nhau thành những "họ hàng" về nghĩa.',
    [
      'Hiểu khái niệm trường từ vựng.',
      'Nhận biết và xác lập được các trường từ vựng.',
      'Hiểu một số đặc điểm: tính hệ thống, hiện tượng nhiều trường, chuyển trường.',
      'Vận dụng trường từ vựng để nâng cao hiệu quả diễn đạt.',
    ],
    [
      { h: 'Khái niệm trường từ vựng' },
      { p: 'Trường từ vựng là tập hợp những từ có ít nhất một nét chung về nghĩa. Ví dụ, các từ "mặt, mắt, mũi, miệng, tai, da, gò má" cùng thuộc trường từ vựng "bộ phận của khuôn mặt người".' },
      { h: 'Cách xác lập một trường từ vựng' },
      { ul: [
        'Chọn một nét nghĩa chung làm cơ sở (ví dụ: "hoạt động của mắt").',
        'Tập hợp các từ có chứa nét nghĩa đó (nhìn, ngó, liếc, trông, dòm, nhòm...).',
        'Một trường lớn có thể chia thành nhiều trường nhỏ.',
      ] },
      { h: 'Một từ thuộc nhiều trường từ vựng' },
      { p: 'Do hiện tượng nhiều nghĩa, một từ có thể thuộc nhiều trường khác nhau. Ví dụ từ "ngọt": thuộc trường "mùi vị" (đường ngọt), trường "âm thanh" (lời nói ngọt), trường "thời tiết" (rét ngọt).' },
      { h: 'Chuyển trường từ vựng' },
      { p: 'Trong văn thơ, người ta thường chuyển từ từ trường này sang trường khác để tăng sức gợi — chính là biện pháp nhân hoá, ẩn dụ, so sánh. Ví dụ dùng từ vốn chỉ người ("tưởng, mừng, cậu, chực, ngoan") để nói về con chó (cậu Vàng) trong truyện "Lão Hạc".' },
      { h: 'Tác dụng của trường từ vựng' },
      { ul: [
        'Giúp diễn đạt phong phú, tránh lặp từ.',
        'Tạo nên sức liên kết, mạch lạc cho văn bản.',
        'Việc chuyển trường tạo nên các biện pháp tu từ giàu hình ảnh.',
      ] },
      { note: 'Lưu ý: các từ trong một trường từ vựng có thể khác nhau về từ loại (danh từ, động từ, tính từ). Ví dụ trường "trường học": thầy, trò (danh từ), giảng, học (động từ), chăm, lười (tính từ).' },
    ],
    [
      { q: 'Các từ "hồ, ao, sông, suối, kênh, rạch, biển" thuộc trường từ vựng nào?', a: 'Chúng thuộc trường từ vựng "vùng nước tự nhiên / nguồn nước" trên mặt đất. Tất cả đều có nét nghĩa chung là chỉ những nơi chứa nước.' },
      { q: 'Xếp các từ sau vào các trường từ vựng thích hợp: đỏ, tím, gà, chó, vui, buồn, nhìn, ngó.', a: 'Trường "màu sắc": đỏ, tím. Trường "động vật nuôi": gà, chó. Trường "trạng thái cảm xúc": vui, buồn. Trường "hoạt động của mắt": nhìn, ngó.' },
      { q: 'Trong câu thơ "Áo nâu liền với áo xanh / Nông thôn cùng với thị thành đứng lên", hãy chỉ ra hiện tượng chuyển trường từ vựng và tác dụng.', a: '"Áo nâu", "áo xanh" vốn thuộc trường "trang phục" được dùng để chỉ người (nông dân mặc áo nâu, công nhân mặc áo xanh) — đây là hoán dụ trên cơ sở chuyển trường. Cách dùng này khiến câu thơ giàu hình ảnh, gợi hình tượng các tầng lớp nhân dân cùng đứng lên.' },
    ]
  ),

  'S8NV-w06-quiz': L(
    'Từ tượng hình — Từ tượng thanh',
    'Tiếng Việt có một kho từ ngữ giàu sức gợi đến lạ kì — chỉ một từ "lom khom" hay "róc rách" đã đủ vẽ ra hình, gợi ra tiếng. Đó chính là từ tượng hình và từ tượng thanh mà ta cùng khám phá hôm nay.',
    [
      'Hiểu khái niệm từ tượng hình và từ tượng thanh.',
      'Phân biệt được hai loại từ này.',
      'Cảm nhận giá trị gợi tả, gợi cảm của chúng trong văn miêu tả và tự sự.',
      'Vận dụng từ tượng hình, tượng thanh trong nói và viết.',
    ],
    [
      { h: 'Từ tượng hình' },
      { p: 'Từ tượng hình là từ gợi tả hình ảnh, dáng vẻ, trạng thái của sự vật. Phần lớn từ tượng hình là từ láy. Ví dụ: lom khom, lụ khụ, lừ đừ, rón rén, thướt tha, lênh khênh, ngoằn ngoèo, mấp mô.' },
      { h: 'Từ tượng thanh' },
      { p: 'Từ tượng thanh là từ mô phỏng âm thanh của tự nhiên, của con người và sự vật. Ví dụ: róc rách, ào ào, ầm ầm, leng keng, tích tắc, thì thầm, ríu rít, ha hả, hu hu.' },
      { h: 'Đặc điểm chung' },
      { ul: [
        'Đa số là từ láy (toàn bộ hoặc bộ phận).',
        'Giàu giá trị gợi hình, gợi cảm cao.',
        'Thường được dùng trong văn miêu tả và tự sự.',
      ] },
      { h: 'Công dụng' },
      { p: 'Từ tượng hình và từ tượng thanh làm cho hình ảnh, âm thanh được miêu tả trở nên cụ thể, sinh động, có giá trị biểu cảm cao. Bỏ đi những từ này, câu văn sẽ khô khan, kém gợi.' },
      { h: 'Ví dụ minh hoạ trong văn bản đã học' },
      { p: 'Trong "Lão Hạc", từ "móm mém", "hu hu" gợi rõ vẻ già nua và tiếng khóc đau đớn. Trong thơ "Qua Đèo Ngang" của Bà Huyện Thanh Quan: "Lom khom dưới núi tiều vài chú / Lác đác bên sông chợ mấy nhà" — "lom khom", "lác đác" vừa gợi hình vừa gợi sự vắng vẻ, heo hút.' },
      { note: 'Mẹo phân biệt: từ gợi ra HÌNH ẢNH, dáng vẻ nhìn thấy được là tượng hình; từ gợi ra ÂM THANH nghe được là tượng thanh.' },
    ],
    [
      { q: 'Phân loại các từ sau thành tượng hình và tượng thanh: lom khom, ầm ầm, lung linh, thì thầm, thướt tha, róc rách.', a: 'Từ tượng hình (gợi hình ảnh, dáng vẻ): lom khom, lung linh, thướt tha. Từ tượng thanh (mô phỏng âm thanh): ầm ầm, thì thầm, róc rách.' },
      { q: 'Đặt một câu có sử dụng từ tượng hình "thướt tha" và phân tích tác dụng.', a: 'Ví dụ: "Tà áo dài thướt tha bay trong gió chiều khiến cả con phố như dịu lại." Từ "thướt tha" gợi tả dáng mềm mại, uyển chuyển, duyên dáng của tà áo dài, làm câu văn giàu hình ảnh và gợi cảm.' },
      { q: 'Tìm các từ tượng thanh mô phỏng tiếng nước và tiếng cười.', a: 'Tiếng nước: róc rách (suối nhỏ), ào ào (nước lớn), tí tách (mưa rơi), ồ ồ (nước chảy mạnh). Tiếng cười: khúc khích, ha hả, hi hi, sằng sặc, khanh khách. Mỗi từ gợi một sắc thái âm thanh riêng.' },
    ]
  ),

  'S8NV-w07-quiz': L(
    'Cô bé bán diêm — An-đéc-xen',
    'Ta cùng mở cánh cửa văn học nước ngoài bằng một truyện cổ tích buồn mà ấm áp — "Cô bé bán diêm" của An-đéc-xen. Trong đêm giao thừa giá rét, ánh lửa của những que diêm thắp lên cả một thế giới của ước mơ và tình thương.',
    [
      'Hiểu nội dung và ý nghĩa nhân văn của truyện.',
      'Phân tích nghệ thuật tương phản và sự đan xen giữa mộng tưởng và hiện thực.',
      'Cảm nhận lòng thương cảm sâu sắc của tác giả với những em bé bất hạnh.',
      'Rút ra thông điệp về tình yêu thương con người.',
    ],
    [
      { h: 'Tác giả An-đéc-xen' },
      { p: 'Han-xơ Crít-xtian An-đéc-xen (1805–1875) là nhà văn Đan Mạch, được mệnh danh là "người kể chuyện cổ tích" nổi tiếng thế giới. Truyện của ông nhẹ nhàng, giàu chất thơ và thấm đượm tinh thần nhân đạo, thường lấy trẻ em và người nghèo làm nhân vật.' },
      { h: 'Tóm tắt truyện' },
      { p: 'Đêm giao thừa rét buốt, một cô bé mồ côi mẹ, đầu trần chân đất, đi bán diêm. Không bán được que nào, em không dám về nhà vì sợ cha đánh. Em ngồi nép vào góc tường, quẹt những que diêm để sưởi ấm. Mỗi lần quẹt, em thấy những hình ảnh kì diệu. Sáng hôm sau, người ta thấy em đã chết cóng nhưng đôi má vẫn hồng, đôi môi mỉm cười.' },
      { h: 'Nghệ thuật tương phản' },
      { ul: [
        'Cảnh phố sực nức mùi ngỗng quay >< em bé đói rét.',
        'Cửa sổ mọi nhà sáng đèn, ấm cúng >< em ngồi co ro nơi góc tường tối.',
        'Quá khứ êm đềm bên bà >< hiện tại cô đơn, khốn khổ.',
      ] },
      { h: 'Mộng tưởng qua từng que diêm' },
      { ul: [
        'Que thứ nhất: lò sưởi ấm áp (em đang rét).',
        'Que thứ hai: bàn ăn với ngỗng quay (em đang đói).',
        'Que thứ ba: cây thông Nô-en (em khao khát niềm vui).',
        'Que thứ tư: người bà hiền hậu (em khao khát tình thương).',
        'Quẹt tất cả: bà cầm tay em bay lên trời.',
      ] },
      { h: 'Ý nghĩa cái chết của cô bé' },
      { p: 'Cái chết của em là lời tố cáo xã hội lạnh lùng, thờ ơ trước nỗi đau của trẻ thơ. Nhưng hình ảnh "đôi má hồng và đôi môi đang mỉm cười" thể hiện tấm lòng nhân đạo của tác giả: em đã được giải thoát khỏi khổ đau, được về với bà nơi "chẳng còn đói rét, đau buồn".' },
      { note: 'Truyện vừa hiện thực vừa lãng mạn: hiện thực ở số phận em bé, lãng mạn ở những mộng tưởng và niềm tin vào tình thương, vào cõi hạnh phúc sau cái chết.' },
    ],
    [
      { q: 'Phân tích ý nghĩa của trình tự các mộng tưởng khi cô bé quẹt diêm.', a: 'Các mộng tưởng diễn ra theo trình tự rất hợp lí, gắn với nhu cầu thực tế của em: đang rét nên mơ lò sưởi; đang đói nên mơ bàn ăn; khao khát niềm vui ngày Tết nên mơ cây thông Nô-en; khao khát tình thương nên mơ thấy bà. Từ nhu cầu vật chất (ấm, no) đến nhu cầu tinh thần (vui, được yêu thương) — cho thấy ước mơ giản dị mà tha thiết của một tâm hồn trẻ thơ bất hạnh.' },
      { q: 'Vì sao tác giả miêu tả cô bé chết mà "đôi má vẫn hồng và đôi môi đang mỉm cười"?', a: 'Đây là chi tiết mang đậm tinh thần nhân đạo và màu sắc lãng mạn. Tác giả không muốn nhấn vào sự bi thảm của cái chết mà muốn an ủi: em bé đã thoát khỏi đói rét, khổ đau để về với bà nơi hạnh phúc. Nụ cười ấy vừa xót xa (vì hạnh phúc chỉ đến khi em lìa đời) vừa ấm áp (vì em ra đi thanh thản). Nó cũng là lời nhắc nhở người đọc hãy yêu thương những số phận bất hạnh.' },
      { q: 'Truyện gửi gắm thông điệp gì tới người đọc hôm nay?', a: 'Truyện kêu gọi lòng yêu thương, sự sẻ chia với những con người bé nhỏ, bất hạnh, đặc biệt là trẻ em. Nó cảnh tỉnh về sự vô cảm, thờ ơ của xã hội. Thông điệp ấy vẫn còn nguyên giá trị: hãy quan tâm, đùm bọc nhau, đừng để bất cứ em nhỏ nào phải cô đơn, đói rét giữa cuộc đời.' },
    ]
  ),

  'S8NV-w08-quiz': L(
    'Đánh nhau với cối xay gió — Xéc-van-tét',
    'Hôm nay ta gặp một cặp nhân vật bất hủ của văn học thế giới: hiệp sĩ Đôn Ki-hô-tê gầy gò mơ mộng và giám mã Xan-chô Pan-xa béo lùn thực tế. Tiếng cười bật ra từ sự đối lập của họ, nhưng phía sau là cả những suy ngẫm sâu xa về con người.',
    [
      'Hiểu nội dung đoạn trích và vị trí của nó trong tiểu thuyết "Đôn Ki-hô-tê".',
      'Phân tích cặp nhân vật tương phản Đôn Ki-hô-tê và Xan-chô Pan-xa.',
      'Cảm nhận nghệ thuật xây dựng nhân vật và ý nghĩa phê phán, ngợi ca.',
      'Rút ra bài học về cách sống vừa có lí tưởng vừa tỉnh táo, thực tế.',
    ],
    [
      { h: 'Tác giả Xéc-van-tét' },
      { p: 'Mi-ghen đơ Xéc-van-tét (1547–1616) là nhà văn lớn của Tây Ban Nha. Cuộc đời ông long đong, từng đi lính, bị thương, bị bắt làm tù binh. Tiểu thuyết "Đôn Ki-hô-tê" là kiệt tác, được xem là một trong những tác phẩm vĩ đại nhất của văn học thế giới.' },
      { h: 'Vị trí đoạn trích' },
      { p: 'Đoạn trích "Đánh nhau với cối xay gió" nằm ở chương VIII phần thứ nhất của tiểu thuyết, kể lại một trong những "chiến công" nực cười của nhà hiệp sĩ Đôn Ki-hô-tê.' },
      { h: 'Nhân vật Đôn Ki-hô-tê' },
      { ul: [
        'Lai lịch: quý tộc nghèo, gầy gò, cao lênh khênh, mê truyện hiệp sĩ đến hoá điên.',
        'Khát vọng: trừ gian diệt ác, lập chiến công, giúp đời — lí tưởng cao đẹp.',
        'Hành động: nhầm cối xay gió là người khổng lồ, lao vào đánh và bị thương.',
        'Vừa đáng cười (hoang tưởng, gàn dở) vừa đáng trọng (dũng cảm, cao thượng).',
      ] },
      { h: 'Nhân vật Xan-chô Pan-xa' },
      { ul: [
        'Lai lịch: bác nông dân béo lùn, cưỡi lừa, làm giám mã vì mơ chức thống đốc.',
        'Tính cách: tỉnh táo, thực tế, ham ăn, ham ngủ, sợ đau.',
        'Hành động: can ngăn chủ, nhưng chủ không nghe; biết chăm sóc bản thân.',
        'Vừa đáng quý (thực tế, trung thành) vừa đáng chê (thực dụng, thiếu lí tưởng).',
      ] },
      { h: 'Nghệ thuật tương phản' },
      { p: 'Hai nhân vật đối lập hoàn toàn về ngoại hình (gầy/béo, cao/lùn), tính cách (mơ mộng/thực tế), lí tưởng (cao siêu/thực dụng). Sự tương phản này tạo nên tiếng cười và làm nổi bật đặc điểm của mỗi người, đồng thời gợi suy ngẫm: con người cần dung hoà cả lí tưởng lẫn sự tỉnh táo.' },
      { note: 'Tên "Đôn Ki-hô-tê" đã trở thành danh từ chung chỉ người sống xa rời thực tế; "đánh nhau với cối xay gió" thành thành ngữ chỉ việc chiến đấu với những kẻ thù tưởng tượng, vô ích.' },
    ],
    [
      { q: 'Vì sao Đôn Ki-hô-tê tưởng những chiếc cối xay gió là người khổng lồ?', a: 'Vì Đôn Ki-hô-tê đọc quá nhiều truyện hiệp sĩ đến mức đầu óc mê muội, mất khả năng phân biệt thực và ảo. Lúc nào lão cũng khao khát lập chiến công như các hiệp sĩ trong truyện. Tâm trí đầy ảo tưởng ấy khiến lão nhìn những cánh quạt cối xay quay thành cánh tay của bọn khổng lồ gian ác cần phải tiêu diệt — một sự hoang tưởng vừa nực cười vừa đáng thương.' },
      { q: 'Phân tích sự đối lập giữa Đôn Ki-hô-tê và Xan-chô Pan-xa qua đoạn trích.', a: 'Đôn Ki-hô-tê gầy cao, cưỡi ngựa còm, mê mộng, lí tưởng cao đẹp nhưng phi thực tế, dũng cảm đến liều lĩnh, coi thường đau đớn. Xan-chô Pan-xa béo lùn, cưỡi lừa, tỉnh táo, thực tế, biết sợ đau, ham ăn ham ngủ nhưng thiếu lí tưởng. Sự đối lập về mọi mặt ấy bổ sung cho nhau, tạo nên một cặp nhân vật hoàn chỉnh và tiếng cười trào lộng đầy ý nghĩa.' },
      { q: 'Qua hai nhân vật, tác giả gửi gắm bài học gì về cách sống?', a: 'Tác giả phê phán lối sống hoang tưởng, xa rời thực tế (Đôn Ki-hô-tê) lẫn lối sống thực dụng, thiếu lí tưởng (Xan-chô Pan-xa). Bài học rút ra là con người cần biết kết hợp: vừa có lí tưởng, hoài bão cao đẹp, dám hành động vì điều tốt, vừa phải tỉnh táo, thực tế, biết nhìn nhận đúng hoàn cảnh. Sống thiếu một trong hai đều dẫn đến lệch lạc.' },
    ]
  ),

  'S8NV-w09-quiz': L(
    'Chiếc lá cuối cùng — O. Hen-ri',
    'Tuần này, ta đến với một kiệt tác về tình người — "Chiếc lá cuối cùng" của O. Hen-ri. Một chiếc lá vẽ trên tường đã cứu sống một con người, và đằng sau nó là sự hi sinh thầm lặng khiến ta rưng rưng.',
    [
      'Hiểu nội dung và ý nghĩa nhân văn của truyện.',
      'Phân tích nhân vật cụ Bơ-men và kiệt tác "chiếc lá cuối cùng".',
      'Cảm nhận tình yêu thương cao cả giữa những con người nghèo khổ.',
      'Hiểu nghệ thuật đảo ngược tình huống và kết thúc bất ngờ.',
    ],
    [
      { h: 'Tác giả O. Hen-ri' },
      { p: 'O. Hen-ri (1862–1910) là nhà văn Mĩ chuyên viết truyện ngắn. Tác phẩm của ông thường nhẹ nhàng, toát lên tinh thần nhân đạo, yêu thương người nghèo khổ; nổi bật với nghệ thuật kết thúc bất ngờ (đảo ngược tình huống).' },
      { h: 'Tóm tắt truyện' },
      { p: 'Xiu và Giôn-xi là hai nữ hoạ sĩ nghèo. Giôn-xi bị sưng phổi nặng, tuyệt vọng đếm những chiếc lá thường xuân rụng, nghĩ khi chiếc lá cuối cùng rụng thì mình cũng chết. Cụ Bơ-men — hoạ sĩ già cùng khu trọ — đã âm thầm vẽ một chiếc lá thường xuân lên tường trong đêm mưa gió. Chiếc lá không rụng giúp Giôn-xi hồi sinh nghị lực sống, nhưng cụ Bơ-men chết vì sưng phổi sau đêm vẽ ấy.' },
      { h: 'Nhân vật Giôn-xi' },
      { p: 'Giôn-xi từ chỗ tuyệt vọng, buông xuôi (gắn sự sống của mình vào chiếc lá) đã hồi sinh khi thấy chiếc lá kiên cường bám trụ. Sự hồi sinh ấy cho thấy vai trò của nghị lực và niềm tin trong cuộc chiến với bệnh tật.' },
      { h: 'Nhân vật cụ Bơ-men và kiệt tác' },
      { ul: [
        'Cụ là hoạ sĩ già nghèo, suốt đời mơ vẽ một kiệt tác nhưng chưa thực hiện được.',
        'Cụ lặng lẽ vẽ chiếc lá trong đêm mưa tuyết để cứu Giôn-xi.',
        'Cụ chết vì sưng phổi — đánh đổi mạng sống để giữ lại sự sống cho người khác.',
        'Chiếc lá là kiệt tác đích thực: được vẽ bằng tình yêu thương và sự hi sinh.',
      ] },
      { h: 'Nghệ thuật đảo ngược tình huống' },
      { p: 'Truyện có hai lần đảo ngược: Giôn-xi tưởng chết lại sống; cụ Bơ-men đang khoẻ lại chết. Cùng với kết thúc bất ngờ (đến cuối truyện người đọc và Giôn-xi mới biết sự thật về chiếc lá), nghệ thuật này tạo nên sức hấp dẫn và xúc động sâu sắc.' },
      { note: 'Vì sao "chiếc lá cuối cùng" là một kiệt tác? Vì nó giống y như thật, đánh lừa được con mắt hoạ sĩ; được vẽ trong hoàn cảnh khắc nghiệt; và quan trọng nhất, nó được vẽ bằng cả tình thương và mạng sống, cứu sống một con người.' },
    ],
    [
      { q: 'Vì sao có thể nói chiếc lá cụ Bơ-men vẽ là một kiệt tác?', a: 'Thứ nhất, chiếc lá được vẽ giống thật đến mức Giôn-xi và cả Xiu đều không nhận ra đó là lá vẽ. Thứ hai, nó được vẽ trong hoàn cảnh vô cùng khắc nghiệt — đêm mưa tuyết lạnh giá. Thứ ba và quan trọng nhất, chiếc lá được vẽ bằng tình yêu thương con người và sự hi sinh cao cả: nó đã cứu sống Giôn-xi, đánh đổi bằng chính mạng sống của cụ Bơ-men. Một tác phẩm nghệ thuật chân chính phải hướng tới và phục vụ con người — chiếc lá ấy đã làm được điều đó.' },
      { q: 'Phân tích diễn biến tâm trạng của Giôn-xi và ý nghĩa của sự hồi sinh.', a: 'Ban đầu Giôn-xi tuyệt vọng, buông xuôi, gắn sự sống của mình vào những chiếc lá thường xuân đang rụng dần. Nhưng khi thấy chiếc lá cuối cùng vẫn kiên cường bám trụ qua đêm mưa gió, cô nhận ra mình đã có ý nghĩ tệ hại và muốn được sống. Sự hồi sinh ấy cho thấy: niềm tin và nghị lực có sức mạnh chiến thắng bệnh tật; con người cần bám víu vào hi vọng để vượt qua nghịch cảnh.' },
      { q: 'Nêu tác dụng của nghệ thuật kết thúc bất ngờ trong truyện.', a: 'Kết thúc bất ngờ (đến cuối truyện, qua lời Xiu, người đọc và Giôn-xi mới biết chiếc lá là tranh vẽ và cụ Bơ-men đã chết để cứu Giôn-xi) tạo nên sự xúc động mạnh và dư âm sâu lắng. Nó làm nổi bật sự hi sinh thầm lặng, cao cả của cụ Bơ-men, đồng thời tô đậm chủ đề về tình yêu thương giữa những con người nghèo khổ. Đây là đặc trưng nghệ thuật làm nên tên tuổi O. Hen-ri.' },
    ]
  ),

  'S8NV-w10-quiz': L(
    'Trợ từ — Thán từ',
    'Tiếng Việt có những từ tuy nhỏ bé nhưng làm câu nói thêm sắc thái, thêm cảm xúc — đó là trợ từ và thán từ. Hôm nay ta cùng tìm hiểu hai loại từ giàu sức biểu cảm này.',
    [
      'Hiểu khái niệm và đặc điểm của trợ từ.',
      'Hiểu khái niệm, đặc điểm và phân loại thán từ.',
      'Phân biệt trợ từ, thán từ với các từ loại khác.',
      'Sử dụng trợ từ, thán từ phù hợp khi nói và viết.',
    ],
    [
      { h: 'Trợ từ là gì?' },
      { p: 'Trợ từ là những từ chuyên đi kèm một từ ngữ trong câu để nhấn mạnh hoặc biểu thị thái độ đánh giá sự vật, sự việc được nói đến. Ví dụ: những, có, chính, đích, ngay, chỉ, đến, mỗi, cả, ngay cả...' },
      { h: 'Tác dụng của trợ từ' },
      { ul: [
        'Nhấn mạnh: "Nó ăn những hai bát cơm" (nhấn mạnh số lượng nhiều).',
        'Biểu thị thái độ đánh giá: "Chính anh ấy đã giúp tôi" (khẳng định).',
        'So sánh: "Nó ăn có hai bát cơm" (đánh giá là ít).',
      ] },
      { h: 'Thán từ là gì?' },
      { p: 'Thán từ là những từ dùng để bộc lộ tình cảm, cảm xúc của người nói hoặc dùng để gọi đáp. Thán từ thường đứng ở đầu câu, có khi tách ra thành một câu đặc biệt.' },
      { h: 'Hai loại thán từ' },
      { ul: [
        'Thán từ bộc lộ cảm xúc: a, ái, ơ, ôi, ô hay, than ôi, trời ơi...',
        'Thán từ gọi đáp: này, ơi, vâng, dạ, ừ...',
      ] },
      { h: 'Vị trí và cách dùng' },
      { p: 'Thán từ thường đứng đầu câu, được ngăn cách với phần còn lại bằng dấu phẩy hoặc dấu chấm than. Ví dụ: "Ôi, đẹp quá!"; "Này, cậu đi đâu đấy?". Cùng một thán từ có thể biểu thị nhiều cảm xúc tuỳ ngữ cảnh.' },
      { note: 'Lưu ý phân biệt: "những", "có" khi là trợ từ thì đi kèm để nhấn mạnh, đánh giá; còn khi là số từ, động từ thì mang nghĩa từ vựng thông thường. So sánh: "Nó có những hai quyển" (trợ từ) với "Tôi có sách" (động từ "có").' },
    ],
    [
      { q: 'Tìm trợ từ và nêu tác dụng trong câu: "Nó ăn những hai bát cơm."', a: 'Trợ từ là "những". Tác dụng: nhấn mạnh, biểu thị thái độ đánh giá rằng việc ăn hai bát cơm là nhiều, vượt mức bình thường. Nếu bỏ "những" đi, câu chỉ còn thông báo trung tính "Nó ăn hai bát cơm", mất đi sắc thái nhấn mạnh.' },
      { q: 'Tìm thán từ và cho biết nó biểu thị điều gì trong câu: "Vâng! Cháu cũng đã nghĩ như cụ."', a: 'Thán từ là "Vâng". Đây là thán từ gọi đáp, biểu thị sự lễ phép, đồng tình, tiếp nhận ý kiến của người trên (đáp lại lời cụ một cách kính trọng).' },
      { q: 'Đặt hai câu, một câu có trợ từ "chính", một câu có thán từ bộc lộ cảm xúc.', a: 'Câu có trợ từ: "Chính bạn ấy là người nhặt được chiếc ví." ("chính" nhấn mạnh, khẳng định đúng đối tượng). Câu có thán từ: "Ôi, bức tranh này đẹp quá!" ("Ôi" bộc lộ cảm xúc ngạc nhiên, thán phục).' },
    ]
  ),

  'S8NV-w11-quiz': L(
    'Tình thái từ',
    'Cũng là một câu, nhưng thêm "ạ", "nhé", "à" vào cuối thì sắc thái đổi hẳn — lễ phép hơn, thân mật hơn, hay thành câu hỏi. Đó là phép màu của tình thái từ mà ta học hôm nay.',
    [
      'Hiểu khái niệm tình thái từ.',
      'Nhận biết và phân loại tình thái từ theo chức năng.',
      'Hiểu vai trò của tình thái từ trong việc tạo sắc thái biểu cảm.',
      'Sử dụng tình thái từ phù hợp với hoàn cảnh giao tiếp.',
    ],
    [
      { h: 'Tình thái từ là gì?' },
      { p: 'Tình thái từ là những từ được thêm vào câu để tạo các kiểu câu (nghi vấn, cầu khiến, cảm thán) hoặc để biểu thị sắc thái tình cảm của người nói.' },
      { h: 'Tình thái từ tạo kiểu câu' },
      { ul: [
        'Tình thái từ nghi vấn: à, ư, hả, hử, chứ, chăng... ("Anh đi đấy à?")',
        'Tình thái từ cầu khiến: đi, nào, với... ("Đi nhanh lên nào!")',
        'Tình thái từ cảm thán: thay, sao... ("Thương thay!")',
      ] },
      { h: 'Tình thái từ biểu thị sắc thái tình cảm' },
      { ul: [
        'ạ: thể hiện sự kính trọng, lễ phép ("Con chào mẹ ạ.")',
        'nhé: thể hiện sự thân mật, mong đợi ("Cố lên nhé!")',
        'cơ, mà: thể hiện sự nũng nịu, khẳng định ("Con muốn cái kia cơ.")',
        'nhỉ: thể hiện sự thân mật, đồng tình ("Trời đẹp nhỉ!")',
      ] },
      { h: 'Sử dụng tình thái từ phù hợp' },
      { p: 'Khi nói và viết, phải chọn tình thái từ phù hợp với hoàn cảnh giao tiếp: quan hệ tuổi tác, thứ bậc, mức độ thân sơ. Dùng "ạ" với người lớn để tỏ lễ phép; dùng "nhé", "nhỉ" với bạn bè để tỏ thân mật.' },
      { note: 'Lưu ý: tình thái từ thường đứng ở cuối câu. Cần phân biệt với trợ từ (đi kèm để nhấn mạnh, có thể đứng giữa câu) và thán từ (bộc lộ cảm xúc, thường đứng đầu câu).' },
    ],
    [
      { q: 'Xác định tình thái từ và chức năng trong câu: "Em chào thầy ạ!"', a: 'Tình thái từ là "ạ". Chức năng: biểu thị sắc thái tình cảm — sự lễ phép, kính trọng của học sinh đối với thầy giáo. Nếu bỏ "ạ", câu "Em chào thầy" vẫn đúng nhưng giảm đi sự kính trọng.' },
      { q: 'Phân tích các tình thái từ trong câu: "Mẹ ơi, con đói rồi mẹ ạ."', a: 'Có hai từ cần xét: "ơi" là tình thái từ gọi đáp (gọi mẹ một cách thân thương) — ở một số sách xếp vào thán từ gọi đáp; "ạ" là tình thái từ biểu thị sự lễ phép, kính trọng với mẹ. Cả câu vừa thân mật vừa lễ phép, thể hiện tình cảm gần gũi của con với mẹ.' },
      { q: 'So sánh sắc thái của hai câu: "Bạn giúp mình nhé." và "Bạn giúp mình đi."', a: '"nhé" tạo sắc thái nhẹ nhàng, thân mật, có ý mong đợi, đề nghị một cách lịch sự. "đi" tạo sắc thái thúc giục, yêu cầu mạnh hơn, gần với mệnh lệnh. Cùng một nội dung nhưng tình thái từ khác nhau khiến mức độ và thái độ đề nghị khác nhau rõ rệt.' },
    ]
  ),

  'S8NV-w12-quiz': L(
    'Ôn dịch, thuốc lá — Văn bản nhật dụng',
    'Văn bản nhật dụng đưa ta đối diện với những vấn đề nóng bỏng của đời sống. Hôm nay là một "ôn dịch" có thật, len lỏi trong từng gia đình — thuốc lá. Cách đặt vấn đề của tác giả khiến ta phải giật mình suy nghĩ.',
    [
      'Hiểu khái niệm và đặc điểm của văn bản nhật dụng.',
      'Nắm được những tác hại nhiều mặt của thuốc lá qua văn bản.',
      'Phân tích nghệ thuật lập luận, thuyết minh kết hợp biểu cảm.',
      'Có ý thức và thái độ kiên quyết tránh xa thuốc lá.',
    ],
    [
      { h: 'Văn bản nhật dụng là gì?' },
      { p: 'Văn bản nhật dụng là loại văn bản đề cập tới những vấn đề gần gũi, bức thiết của đời sống con người và cộng đồng: môi trường, dân số, tệ nạn xã hội, sức khoẻ, quyền trẻ em... Nó không phải một thể loại riêng mà chỉ nội dung mang tính thời sự, cập nhật.' },
      { h: 'Ý nghĩa nhan đề "Ôn dịch, thuốc lá"' },
      { p: 'Dấu phẩy giữa "Ôn dịch" và "thuốc lá" là một dụng ý nghệ thuật: vừa thông báo (thuốc lá là một thứ ôn dịch), vừa thể hiện thái độ căm ghét, nguyền rủa (như một lời chửi "Ôn dịch!"). Gọi thuốc lá là "ôn dịch" để nhấn mạnh đây là một thứ bệnh dịch nguy hiểm, lan tràn.' },
      { h: 'Tác hại của thuốc lá đối với sức khoẻ' },
      { ul: [
        'Khói thuốc chứa nhiều chất độc: ni-cô-tin, hắc ín, ô-xít các-bon.',
        'Gây các bệnh: viêm phế quản, ung thư vòm họng, ung thư phổi, nhồi máu cơ tim.',
        'Người hút thuốc thụ động (hít phải khói thuốc) cũng bị nhiễm độc, đặc biệt nguy hại cho phụ nữ mang thai và trẻ em.',
      ] },
      { h: 'Tác hại đối với đạo đức và xã hội' },
      { ul: [
        'Nêu gương xấu cho con cháu, làm hỏng lối sống.',
        'Tốn kém tiền bạc, có thể dẫn đến trộm cắp, nghiện ngập khác.',
        'So sánh với "ôn dịch" lan tràn, đe doạ cả cộng đồng.',
      ] },
      { h: 'Nghệ thuật của văn bản' },
      { p: 'Văn bản kết hợp thuyết minh (cung cấp số liệu, kiến thức y học), lập luận chặt chẽ (so sánh tác hại thuốc lá còn nặng hơn ôn dịch), và biểu cảm (thái độ căm ghét, lời cảnh báo khẩn thiết). Cách so sánh, dùng số liệu khiến văn bản vừa khoa học vừa giàu sức thuyết phục.' },
      { note: 'Lời kêu gọi của tác giả: "Nghĩ đến mà kinh!... Đã đến lúc mọi người phải đứng lên chống lại, ngăn ngừa nạn ôn dịch này." — vừa cảnh báo vừa kêu gọi hành động.' },
    ],
    [
      { q: 'Vì sao tác giả lại đặt dấu phẩy trong nhan đề "Ôn dịch, thuốc lá"?', a: 'Dấu phẩy có dụng ý nghệ thuật. Một mặt, nó tạo cách hiểu: "Thuốc lá là một thứ ôn dịch" — một sự nhận định, cảnh báo. Mặt khác, nó tạo ngữ điệu như một lời nguyền rủa, chửi mắng ("Ôn dịch!", rồi mới đến "thuốc lá"), thể hiện thái độ căm ghét, ghê tởm của tác giả đối với tệ nạn này. Nhan đề vì thế vừa có tính thông báo vừa giàu sắc thái biểu cảm.' },
      { q: 'Tác hại của thuốc lá đối với người hút thuốc thụ động là gì? Vì sao tác giả nhấn mạnh điều này?', a: 'Người hút thuốc thụ động là người không hút nhưng phải hít phải khói thuốc của người khác. Họ cũng bị nhiễm các chất độc, có nguy cơ mắc bệnh tương tự, đặc biệt nguy hại cho phụ nữ có thai (ảnh hưởng thai nhi) và trẻ em. Tác giả nhấn mạnh điều này để cho thấy thuốc lá không chỉ hại người hút mà còn gieo rắc tác hại cho cả những người vô tội xung quanh — đúng như tính chất "lây lan" của một thứ ôn dịch.' },
      { q: 'Văn bản đã sử dụng những phương pháp thuyết minh nào để tăng sức thuyết phục?', a: 'Văn bản sử dụng nhiều phương pháp: nêu định nghĩa (giải thích "ôn dịch"), dùng số liệu (tỉ lệ người mắc bệnh, lượng tiền tốn kém), so sánh (tác hại thuốc lá so với ôn dịch, so với tệ nạn khác), phân tích (chỉ rõ từng chất độc và tác hại của nó). Sự kết hợp các phương pháp này khiến thông tin trở nên cụ thể, đáng tin cậy và có sức cảnh tỉnh mạnh mẽ.' },
    ]
  ),

  'S8NV-w13-quiz': L(
    'Câu ghép',
    'Một câu có thể chỉ diễn đạt một sự việc, nhưng đời sống thì đầy những quan hệ phức tạp — nguyên nhân, điều kiện, tương phản... Để diễn đạt chúng, ta cần câu ghép. Đây là một kiến thức ngữ pháp quan trọng của lớp 8.',
    [
      'Hiểu khái niệm và đặc điểm của câu ghép.',
      'Phân biệt câu ghép với câu đơn có nhiều thành phần.',
      'Nhận biết các cách nối và các quan hệ ý nghĩa giữa các vế câu.',
      'Đặt câu ghép đúng và phù hợp với mục đích diễn đạt.',
    ],
    [
      { h: 'Câu ghép là gì?' },
      { p: 'Câu ghép là câu do hai hoặc nhiều cụm chủ – vị không bao chứa nhau tạo thành. Mỗi cụm chủ – vị này được gọi là một vế câu. Ví dụ: "Trời/ mưa to // nên đường/ ngập nước." (hai vế, hai cụm C–V).' },
      { h: 'Phân biệt với câu mở rộng thành phần' },
      { p: 'Cần phân biệt câu ghép (các cụm C–V ngang hàng, không bao chứa nhau) với câu đơn có cụm C–V làm thành phần (một cụm C–V nhỏ nằm trong một thành phần câu). Ví dụ: "Quyển sách tôi mua rất hay" là câu đơn mở rộng (cụm "tôi mua" làm phụ ngữ).' },
      { h: 'Cách nối các vế câu ghép' },
      { ul: [
        'Nối bằng quan hệ từ: vì, nên, nếu, tuy, nhưng, mà, và, hay...',
        'Nối bằng cặp quan hệ từ: vì... nên..., nếu... thì..., tuy... nhưng...',
        'Nối bằng cặp phó từ, đại từ hô ứng: vừa... đã..., càng... càng..., bao nhiêu... bấy nhiêu...',
        'Nối trực tiếp bằng dấu câu: dấu phẩy, dấu chấm phẩy, dấu hai chấm.',
      ] },
      { h: 'Quan hệ ý nghĩa giữa các vế' },
      { ul: [
        'Nguyên nhân – kết quả: "Vì trời mưa nên đường trơn."',
        'Điều kiện (giả thiết) – kết quả: "Nếu cố gắng thì em sẽ thành công."',
        'Tương phản, nhượng bộ: "Tuy nhà nghèo nhưng nó học rất giỏi."',
        'Tăng tiến: "Trời càng về khuya, gió càng lạnh."',
        'Lựa chọn: "Anh đi hay là tôi đi?"',
        'Bổ sung, nối tiếp, đồng thời: "Gió thổi và lá rơi."',
      ] },
      { note: 'Để xác định quan hệ ý nghĩa giữa các vế, cần dựa vào quan hệ từ, cặp từ hô ứng và đặc biệt là hoàn cảnh giao tiếp, nội dung cụ thể của câu.' },
    ],
    [
      { q: 'Câu "Vì trời mưa to nên chúng em phải nghỉ học." là câu ghép loại nào? Phân tích cấu tạo.', a: 'Đây là câu ghép có quan hệ nguyên nhân – kết quả. Cấu tạo gồm hai vế: vế 1 "trời mưa to" (chủ ngữ: trời; vị ngữ: mưa to) chỉ nguyên nhân; vế 2 "chúng em phải nghỉ học" (chủ ngữ: chúng em; vị ngữ: phải nghỉ học) chỉ kết quả. Hai vế nối với nhau bằng cặp quan hệ từ "Vì... nên...".' },
      { q: 'Đặt một câu ghép biểu thị quan hệ tương phản và một câu ghép biểu thị quan hệ tăng tiến.', a: 'Câu tương phản: "Tuy bạn Lan nhỏ tuổi nhất lớp nhưng bạn ấy học giỏi nhất." (cặp "Tuy... nhưng..."). Câu tăng tiến: "Mưa càng lúc càng to, gió càng lúc càng mạnh." (cặp hô ứng "càng... càng...").' },
      { q: 'Phân biệt hai câu sau, đâu là câu ghép, đâu là câu đơn: (1) "Cuốn truyện mẹ tặng tôi rất hay." (2) "Mẹ tặng tôi cuốn truyện và tôi rất thích nó."', a: 'Câu (1) là câu đơn mở rộng thành phần: chỉ có một nòng cốt "Cuốn truyện... rất hay", trong đó "mẹ tặng tôi" là cụm C–V làm phụ ngữ cho danh từ "cuốn truyện". Câu (2) là câu ghép: gồm hai vế ngang hàng "Mẹ tặng tôi cuốn truyện" và "tôi rất thích nó", nối với nhau bằng quan hệ từ "và".' },
    ]
  ),

  'S8NV-w14-quiz': L(
    'Dấu ngoặc đơn và dấu hai chấm',
    'Dấu câu không chỉ là những kí hiệu nhỏ — chúng là "nhịp thở" và "ngữ điệu" của câu văn viết. Hôm nay ta tìm hiểu công dụng của dấu ngoặc đơn và dấu hai chấm.',
    [
      'Hiểu công dụng của dấu ngoặc đơn.',
      'Hiểu công dụng của dấu hai chấm.',
      'Biết phối hợp hai dấu câu này trong khi viết.',
      'Sử dụng đúng quy ước, tránh các lỗi thường gặp.',
    ],
    [
      { h: 'Dấu ngoặc đơn ( )' },
      { p: 'Dấu ngoặc đơn dùng để đánh dấu phần có chức năng chú thích — giải thích, thuyết minh, bổ sung thêm cho phần đứng trước.' },
      { ul: [
        'Giải thích, làm rõ: "Nguyễn Du (đại thi hào dân tộc) viết Truyện Kiều."',
        'Bổ sung thông tin: "Cuốn sách này (xuất bản năm 2020) rất hay."',
        'Thuyết minh thêm: "Ba-sô (1644–1694) là nhà thơ Nhật Bản."',
      ] },
      { h: 'Lưu ý về dấu ngoặc đơn' },
      { p: 'Phần trong dấu ngoặc đơn chỉ có tính chất bổ sung. Nếu bỏ phần này đi, ý nghĩa cơ bản của câu vẫn không thay đổi.' },
      { h: 'Dấu hai chấm :' },
      { ul: [
        'Báo trước phần giải thích, thuyết minh cho phần trước đó.',
        'Báo trước lời dẫn trực tiếp (dùng với dấu ngoặc kép) hoặc lời đối thoại (dùng với dấu gạch ngang).',
        'Báo trước một sự liệt kê.',
      ] },
      { h: 'Ví dụ về dấu hai chấm' },
      { ul: [
        'Lời dẫn: Bác Hồ dạy: "Không có việc gì khó..."',
        'Liệt kê: Trong vườn có nhiều cây ăn quả: cam, bưởi, ổi, na.',
        'Giải thích: Cảnh vật thật buồn: trời u ám, gió hiu hắt.',
      ] },
      { note: 'Phân biệt: dấu ngoặc đơn đánh dấu phần chú thích đặt xen vào giữa hoặc cuối câu; còn dấu hai chấm báo trước phần tiếp theo (giải thích, dẫn lời, liệt kê) đặt ngay phía sau nó.' },
    ],
    [
      { q: 'Đặt một câu có sử dụng dấu ngoặc đơn để chú thích về năm sinh, năm mất của một tác giả.', a: 'Ví dụ: "Nam Cao (1915–1951) là nhà văn hiện thực xuất sắc của văn học Việt Nam." Dấu ngoặc đơn đánh dấu phần chú thích về năm sinh, năm mất của tác giả — phần bổ sung thông tin, bỏ đi câu vẫn trọn nghĩa.' },
      { q: 'Đặt một câu có sử dụng dấu hai chấm để báo trước một sự liệt kê.', a: 'Ví dụ: "Tủ sách của em có đủ các thể loại: truyện cổ tích, truyện ngắn, thơ và sách khoa học." Dấu hai chấm báo trước phần liệt kê các thể loại sách.' },
      { q: 'Nêu công dụng của dấu hai chấm trong câu: Ông giáo nói: "Lão Hạc là người tốt."', a: 'Dấu hai chấm ở đây dùng để báo trước một lời dẫn trực tiếp (lời nói của nhân vật ông giáo), được đặt trong dấu ngoặc kép. Nó cho người đọc biết phần tiếp theo chính là lời người được nhắc đến nói ra.' },
    ]
  ),

  'S8NV-w15-quiz': L(
    'Dấu ngoặc kép',
    'Tiếp nối bài học về dấu câu, hôm nay ta tìm hiểu một dấu câu rất hay gặp — dấu ngoặc kép. Nó có nhiều công dụng tinh tế mà nếu dùng đúng, bài viết của các em sẽ chuẩn mực và sắc sảo hơn.',
    [
      'Hiểu các công dụng của dấu ngoặc kép.',
      'Biết phân biệt các trường hợp sử dụng.',
      'Đặt câu và viết đoạn có sử dụng dấu ngoặc kép đúng.',
      'Tránh các lỗi thường gặp khi dùng dấu ngoặc kép.',
    ],
    [
      { h: 'Công dụng của dấu ngoặc kép' },
      { p: 'Dấu ngoặc kép (" ") là một dấu câu có nhiều chức năng. Nắm vững từng chức năng giúp các em dùng dấu này chính xác.' },
      { h: 'Đánh dấu lời dẫn trực tiếp' },
      { p: 'Dấu ngoặc kép đánh dấu từ ngữ, câu, đoạn được dẫn trực tiếp (nguyên văn lời nói, ý nghĩ của người khác). Ví dụ: Chủ tịch Hồ Chí Minh khẳng định: "Không có gì quý hơn độc lập, tự do."' },
      { h: 'Đánh dấu từ ngữ hiểu theo nghĩa đặc biệt' },
      { p: 'Dấu ngoặc kép đánh dấu từ ngữ được hiểu theo một nghĩa đặc biệt hoặc có hàm ý mỉa mai, châm biếm. Ví dụ: Cụ Bơ-men đã hoàn thành "kiệt tác" của đời mình. (Hàm ý đề cao đặc biệt chiếc lá vẽ.)' },
      { h: 'Đánh dấu tên tác phẩm, tờ báo, tập san...' },
      { p: 'Dấu ngoặc kép đánh dấu tên của tác phẩm, tờ báo, tập san được dẫn trong câu. Ví dụ: Em rất thích đọc "Dế Mèn phiêu lưu kí" của Tô Hoài.' },
      { h: 'Lưu ý khi sử dụng' },
      { ul: [
        'Lời dẫn trực tiếp dẫn nguyên văn, đặt sau dấu hai chấm và trong dấu ngoặc kép.',
        'Lời dẫn gián tiếp (thuật lại ý) thì không dùng dấu ngoặc kép.',
        'Không lạm dụng dấu ngoặc kép cho mọi từ ngữ.',
      ] },
      { note: 'Phân biệt dẫn trực tiếp và gián tiếp: "Nam nói: \'Tôi sẽ đi.\'" (trực tiếp, có ngoặc kép) khác với "Nam nói rằng cậu ấy sẽ đi." (gián tiếp, không ngoặc kép).' },
    ],
    [
      { q: 'Đặt một câu có dấu ngoặc kép đánh dấu lời dẫn trực tiếp.', a: 'Ví dụ: Trần Quốc Tuấn từng viết trong Hịch tướng sĩ: "Ta thường tới bữa quên ăn, nửa đêm vỗ gối; ruột đau như cắt, nước mắt đầm đìa." Dấu ngoặc kép đánh dấu lời dẫn nguyên văn, đặt sau dấu hai chấm.' },
      { q: 'Nêu công dụng của dấu ngoặc kép trong câu: Nó là một "anh hùng" trong mắt cả lớp vì dám đứng lên nhận lỗi.', a: 'Ở đây, nếu hiểu theo nghĩa khen ngợi chân thành thì dấu ngoặc kép nhấn mạnh nghĩa đặc biệt — đề cao hành động dũng cảm. Nếu ngữ cảnh là mỉa mai thì lại mang hàm ý châm biếm. Trong câu này, với việc "dám đứng lên nhận lỗi", dấu ngoặc kép đánh dấu từ "anh hùng" được dùng với nghĩa đặc biệt, trân trọng, hơi hài hước.' },
      { q: 'Đặt một câu có dấu ngoặc kép đánh dấu tên tác phẩm văn học.', a: 'Ví dụ: Đoạn trích "Trong lòng mẹ" được trích từ tập hồi kí "Những ngày thơ ấu" của Nguyên Hồng. Cả hai cụm trong dấu ngoặc kép đều là tên tác phẩm được dẫn trong câu.' },
    ]
  ),

  'S8NV-w16-quiz': L(
    'Văn bản thuyết minh',
    'Khi muốn giới thiệu về một loài hoa, một danh lam, một món ăn hay một đồ vật, ta dùng văn thuyết minh. Đây là kiểu văn bản rất hữu ích trong đời sống mà các em sẽ học và thực hành nhiều ở lớp 8.',
    [
      'Hiểu đặc điểm, vai trò của văn bản thuyết minh.',
      'Phân biệt văn thuyết minh với các kiểu văn bản khác.',
      'Nắm được các phương pháp thuyết minh thường dùng.',
      'Bước đầu viết được đoạn văn thuyết minh.',
    ],
    [
      { h: 'Văn bản thuyết minh là gì?' },
      { p: 'Văn bản thuyết minh là kiểu văn bản thông dụng, nhằm cung cấp tri thức (kiến thức) khách quan về đặc điểm, tính chất, nguyên nhân, công dụng... của các sự vật, hiện tượng trong tự nhiên và xã hội bằng phương thức trình bày, giới thiệu, giải thích.' },
      { h: 'Đặc điểm của văn thuyết minh' },
      { ul: [
        'Tri thức khách quan, xác thực, không hư cấu, không bịa đặt.',
        'Ngôn ngữ chính xác, rõ ràng, chặt chẽ, cô đọng.',
        'Trình bày khoa học, mạch lạc, có hệ thống.',
      ] },
      { h: 'Phân biệt với các kiểu văn bản khác' },
      { ul: [
        'Khác tự sự: thuyết minh không kể chuyện, không có cốt truyện, nhân vật.',
        'Khác miêu tả: thuyết minh cung cấp tri thức khách quan, không nặng cảm xúc, hình ảnh.',
        'Khác nghị luận: thuyết minh giới thiệu, giải thích chứ không bàn luận, thuyết phục.',
      ] },
      { h: 'Các phương pháp thuyết minh' },
      { ul: [
        'Nêu định nghĩa, giải thích: "Huế là một thành phố đẹp...".',
        'Liệt kê: kể ra các đặc điểm, bộ phận.',
        'Nêu ví dụ: dẫn ra dẫn chứng cụ thể.',
        'Dùng số liệu (con số): tăng độ tin cậy.',
        'So sánh: làm nổi bật đặc điểm.',
        'Phân loại, phân tích: chia đối tượng thành từng mặt, từng phần.',
      ] },
      { note: 'Muốn làm tốt văn thuyết minh, người viết phải quan sát, tìm hiểu, tích luỹ tri thức về đối tượng. Không có hiểu biết thì không thể thuyết minh chính xác, hấp dẫn.' },
    ],
    [
      { q: 'Văn bản thuyết minh khác văn bản tự sự ở những điểm cốt lõi nào?', a: 'Văn thuyết minh nhằm cung cấp tri thức khách quan về đối tượng (đặc điểm, công dụng, cấu tạo...), trình bày chính xác, không có cốt truyện. Văn tự sự nhằm kể lại một chuỗi sự việc, có nhân vật, có diễn biến, có thể hư cấu và bộc lộ cảm xúc. Nói gọn: thuyết minh để người đọc HIỂU BIẾT về sự vật; tự sự để người đọc THEO DÕI một câu chuyện.' },
      { q: 'Viết một đoạn văn thuyết minh ngắn (3–4 câu) về cây tre Việt Nam, có sử dụng phương pháp thuyết minh.', a: 'Ví dụ: "Tre là loài cây thân thẳng, rỗng ruột, chia thành nhiều đốt, thường mọc thành bụi, thành luỹ. Cây tre cao trung bình từ 10 đến 18 mét, sống được ở nhiều loại đất (phương pháp dùng số liệu). Tre có nhiều công dụng: làm nhà, đan rổ rá, làm cán nông cụ, làm măng để ăn (phương pháp liệt kê). Từ bao đời nay, cây tre đã gắn bó thân thiết với làng quê và con người Việt Nam."' },
      { q: 'Khi thuyết minh về một danh lam thắng cảnh, em sẽ dùng những phương pháp nào? Vì sao?', a: 'Em sẽ dùng: phương pháp nêu định nghĩa (giới thiệu khái quát danh thắng), liệt kê (kể các cảnh đẹp, các điểm tham quan), dùng số liệu (diện tích, độ cao, năm xây dựng), so sánh (làm nổi bật vẻ độc đáo), nêu ví dụ (các chi tiết tiêu biểu). Kết hợp nhiều phương pháp giúp bài thuyết minh vừa chính xác, đầy đủ vừa sinh động, hấp dẫn, giúp người đọc hình dung rõ và muốn đến tham quan.' },
    ]
  ),

  'S8NV-w17-quiz': L(
    'Hai cây phong — Ai-ma-tốp',
    'Có những hình ảnh tuổi thơ theo ta suốt đời. Với người kể chuyện trong "Hai cây phong" của Ai-ma-tốp, đó là hai cây phong trên đồi cao — chứng nhân của tình thầy trò và tình yêu quê hương sâu nặng.',
    [
      'Hiểu nội dung và vị trí đoạn trích trong truyện "Người thầy đầu tiên".',
      'Phân tích hình ảnh hai cây phong qua hai mạch kể đan xen.',
      'Cảm nhận tình yêu quê hương và lòng biết ơn thầy giáo Đuy-sen.',
      'Thấy được chất hoạ sĩ trong ngòi bút miêu tả của tác giả.',
    ],
    [
      { h: 'Tác giả Ai-ma-tốp' },
      { p: 'Trin-ghi-dơ Ai-ma-tốp (1928–2008) là nhà văn nổi tiếng người Cư-rơ-gư-xtan (thuộc Liên Xô cũ). Tác phẩm của ông thường viết về cuộc sống và con người vùng quê miền núi, giàu chất trữ tình, đậm tình yêu quê hương.' },
      { h: 'Xuất xứ đoạn trích' },
      { p: '"Hai cây phong" trích từ phần đầu truyện vừa "Người thầy đầu tiên". Truyện kể về thầy giáo Đuy-sen đã hết lòng vì học trò và cô bé An-tư-nai. Hai cây phong gắn với hình ảnh người thầy đầu tiên ấy.' },
      { h: 'Hai mạch kể đan xen' },
      { ul: [
        'Mạch kể xưng "tôi": người hoạ sĩ kể về cảm xúc riêng với hai cây phong.',
        'Mạch kể xưng "chúng tôi": kỉ niệm tuổi thơ của cả bọn trẻ trèo lên cây phong nhìn ra thế giới rộng lớn.',
        'Hai mạch hoà quyện làm hình ảnh hai cây phong vừa riêng tư vừa gắn với cả một thế hệ.',
      ] },
      { h: 'Hình ảnh hai cây phong' },
      { ul: [
        'Được miêu tả như những con người: có tiếng nói riêng, tâm hồn riêng, biết "nghiêng ngả thân cây, lay động lá cành".',
        'Là tín hiệu của làng quê, "ngọn hải đăng đặt trên núi" dẫn lối người đi xa trở về.',
        'Gắn với người trồng cây — thầy Đuy-sen và cô bé An-tư-nai.',
      ] },
      { h: 'Chất hoạ sĩ trong ngòi bút' },
      { p: 'Người kể chuyện là một hoạ sĩ nên miêu tả hai cây phong rất giàu màu sắc, hình ảnh, âm thanh. Thiên nhiên hiện lên qua đôi mắt và tâm hồn nghệ sĩ — vừa hùng vĩ vừa tha thiết, vừa cụ thể vừa giàu sức gợi.' },
      { note: 'Hai cây phong là biểu tượng của tình yêu quê hương và lòng biết ơn người thầy — người đã "trồng" cây và "trồng người", gieo niềm tin và ước mơ cho lớp trẻ.' },
    ],
    [
      { q: 'Vì sao hình ảnh hai cây phong lại gắn bó thiêng liêng với người kể chuyện?', a: 'Hai cây phong gắn với cả tuổi thơ và quê hương của người kể chuyện. Đó là nơi lũ trẻ trèo lên, từ đó lần đầu nhìn ra thế giới bao la, khơi dậy bao mơ ước. Sâu xa hơn, hai cây phong do thầy Đuy-sen trồng cùng cô bé An-tư-nai, gắn với hình ảnh người thầy đầu tiên đầy lòng nhân ái. Vì thế, mỗi lần về quê, người kể chuyện đều bồi hồi nhìn về phía hai cây phong — chúng là một phần kí ức, là quê hương, là lòng biết ơn không thể nào quên.' },
      { q: 'Phân tích cách tác giả miêu tả hai cây phong như những sinh thể có tâm hồn.', a: 'Tác giả nhân hoá hai cây phong: chúng "có tiếng nói riêng và hẳn phải có một tâm hồn riêng", biết "nghiêng ngả thân cây, lay động lá cành, không ngớt tiếng rì rào theo nhiều cung bậc khác nhau", khi thì "thì thầm thiết tha nồng thắm", khi "im bặt một thoáng" rồi "cất tiếng thở dài". Cách miêu tả giàu hình ảnh, âm thanh này khiến hai cây phong hiện lên sống động như những con người có cảm xúc, càng làm tăng tình cảm gắn bó của người kể với chúng.' },
      { q: 'Hình ảnh hai cây phong mang ý nghĩa biểu tượng gì?', a: 'Hai cây phong là biểu tượng đa tầng: biểu tượng của quê hương (như ngọn hải đăng dẫn lối người đi xa trở về), của tuổi thơ trong sáng với những ước mơ đầu đời, và đặc biệt là biểu tượng của tình thầy trò, lòng biết ơn thầy Đuy-sen — người đã trồng cây và vun đắp tâm hồn, mở ra chân trời tri thức cho học trò. Cây phong "trồng đất" gợi đến người thầy "trồng người".' },
    ]
  ),

  'S8NV-w18-quiz': L(
    'Ôn tập học kì I',
    'Một học kì đã trôi qua với biết bao trang văn xúc động và bao kiến thức Tiếng Việt. Tuần này, cô trò mình cùng hệ thống lại tất cả để vững vàng bước vào kì kiểm tra cuối học kì.',
    [
      'Hệ thống hoá các văn bản truyện kí Việt Nam và văn học nước ngoài đã học.',
      'Củng cố kiến thức Tiếng Việt: các lớp từ, các loại dấu câu, câu ghép.',
      'Ôn lại kĩ năng làm văn thuyết minh.',
      'Rèn kĩ năng tổng hợp, vận dụng khi làm bài kiểm tra.',
    ],
    [
      { h: 'Truyện kí Việt Nam 1930–1945' },
      { ul: [
        '"Tôi đi học" (Thanh Tịnh): hồi tưởng buổi tựu trường, giàu chất trữ tình.',
        '"Trong lòng mẹ" (Nguyên Hồng): hồi kí, tình mẫu tử thiêng liêng.',
        '"Tức nước vỡ bờ" (Ngô Tất Tố): hiện thực, sức phản kháng của người nông dân.',
        '"Lão Hạc" (Nam Cao): bi kịch và nhân cách cao đẹp của người nông dân.',
      ] },
      { h: 'Văn học nước ngoài' },
      { ul: [
        '"Cô bé bán diêm" (An-đéc-xen): lòng thương cảm với trẻ em bất hạnh.',
        '"Đánh nhau với cối xay gió" (Xéc-van-tét): cặp nhân vật tương phản.',
        '"Chiếc lá cuối cùng" (O. Hen-ri): tình người và sự hi sinh thầm lặng.',
        '"Hai cây phong" (Ai-ma-tốp): tình yêu quê hương và lòng biết ơn thầy.',
      ] },
      { h: 'Văn bản nhật dụng' },
      { p: '"Ôn dịch, thuốc lá": cảnh báo tác hại nhiều mặt của thuốc lá, kết hợp thuyết minh với biểu cảm.' },
      { h: 'Kiến thức Tiếng Việt' },
      { ul: [
        'Các lớp từ: trường từ vựng, từ tượng hình – tượng thanh.',
        'Các từ loại: trợ từ, thán từ, tình thái từ.',
        'Câu ghép và các quan hệ ý nghĩa giữa các vế.',
        'Các dấu câu: dấu ngoặc đơn, dấu hai chấm, dấu ngoặc kép.',
      ] },
      { h: 'Tập làm văn' },
      { p: 'Trọng tâm học kì I là văn thuyết minh: đặc điểm, các phương pháp thuyết minh, cách viết bài thuyết minh về một thứ đồ dùng, một danh lam, một thể loại văn học.' },
      { note: 'Cách ôn hiệu quả: lập bảng hệ thống tác giả – tác phẩm – nội dung – nghệ thuật; với mỗi đơn vị Tiếng Việt, học khái niệm kèm một ví dụ tiêu biểu và tự đặt câu vận dụng.' },
    ],
    [
      { q: 'Truyện ngắn "Lão Hạc" là của tác giả nào? Nêu giá trị nhân đạo của tác phẩm.', a: 'Truyện ngắn "Lão Hạc" là của Nam Cao. Giá trị nhân đạo: tác phẩm thể hiện niềm thương cảm sâu sắc với số phận bi thảm của người nông dân nghèo trước Cách mạng; đồng thời trân trọng, ngợi ca vẻ đẹp nhân cách của họ — lòng thương con, đức tự trọng, sự lương thiện. Qua đó, Nam Cao cũng tố cáo xã hội bất công đã đẩy con người lương thiện vào đường cùng.' },
      { q: '"Tức nước vỡ bờ" được trích từ tác phẩm nào, của ai? Nội dung chính là gì?', a: '"Tức nước vỡ bờ" được trích từ tiểu thuyết "Tắt đèn" của Ngô Tất Tố. Nội dung chính: vạch trần bộ mặt tàn ác của xã hội thực dân nửa phong kiến qua nạn sưu thuế; đồng thời ca ngợi vẻ đẹp tâm hồn và sức phản kháng tiềm tàng mạnh mẽ của người phụ nữ nông dân — chị Dậu, qua quy luật "có áp bức, có đấu tranh".' },
      { q: 'So sánh điểm chung về giá trị nhân đạo của "Cô bé bán diêm" và "Chiếc lá cuối cùng".', a: 'Cả hai truyện đều thấm đượm tinh thần nhân đạo, hướng về những con người nghèo khổ, bất hạnh. "Cô bé bán diêm" thể hiện lòng thương cảm với em bé mồ côi, đói rét, đồng thời lên án sự vô cảm của xã hội. "Chiếc lá cuối cùng" ngợi ca tình yêu thương, sự hi sinh cao cả giữa những con người nghèo khổ (cụ Bơ-men hi sinh để cứu Giôn-xi). Điểm chung: cả hai đều đề cao tình thương con người và niềm tin vào những giá trị nhân văn tốt đẹp.' },
    ]
  ),

  'S8NV-w19-quiz': L(
    'Nhớ rừng — Thế Lữ',
    'Học kì hai mở ra với phong trào Thơ mới rực rỡ. Bài "Nhớ rừng" của Thế Lữ mượn lời con hổ trong vườn bách thú để cất lên tiếng kêu bi tráng về tự do — tiếng lòng của cả một thế hệ.',
    [
      'Hiểu nội dung và vị trí của bài thơ trong phong trào Thơ mới.',
      'Phân tích tâm trạng con hổ và ý nghĩa biểu tượng của hình tượng này.',
      'Cảm nhận bút pháp lãng mạn, giọng điệu hùng tráng của bài thơ.',
      'Hiểu khát vọng tự do và nỗi bất hoà với thực tại của tầng lớp trí thức đương thời.',
    ],
    [
      { h: 'Tác giả Thế Lữ' },
      { p: 'Thế Lữ (1907–1989), tên thật Nguyễn Thứ Lễ, là một trong những nhà thơ tiên phong và có công đầu trong việc đem lại chiến thắng cho phong trào Thơ mới buổi đầu (những năm 1932–1935). Hồn thơ Thế Lữ dồi dào, lãng mạn, bay bổng.' },
      { h: 'Hoàn cảnh và thể loại' },
      { p: '"Nhớ rừng" sáng tác năm 1934, in trong tập "Mấy vần thơ" (1935), là một trong những bài thơ tiêu biểu nhất của phong trào Thơ mới. Bài thơ theo thể tám chữ tự do, phóng khoáng.' },
      { h: 'Hình tượng con hổ và bố cục' },
      { ul: [
        'Đoạn 1 và 4: cảnh con hổ bị nhốt trong vườn bách thú — uất hận, chán ghét.',
        'Đoạn 2 và 3: hồi tưởng cảnh núi rừng oai linh, thời vàng son làm chúa sơn lâm.',
        'Đoạn 5: lời nhắn gửi tha thiết về chốn giang sơn cũ.',
      ] },
      { h: 'Nỗi uất hận của con hổ' },
      { p: 'Bị giam cầm, con hổ "gậm một khối căm hờn trong cũi sắt", khinh ghét cảnh "tầm thường, giả dối" của vườn bách thú. Đó là nỗi đau của một bậc chúa tể sa cơ, bị tước đoạt tự do và phải sống cuộc đời tù túng, nhục nhã.' },
      { h: 'Quá khứ huy hoàng nơi rừng thẳm' },
      { ul: [
        'Cảnh núi rừng hùng vĩ, "bóng cả, cây già", "gió gào ngàn", "giọng nguồn hét núi".',
        'Bộ tranh tứ bình tuyệt đẹp: đêm trăng bên suối, ngày mưa rừng, bình minh chan hoà, hoàng hôn rực đỏ.',
        'Tư thế chúa tể đầy uy quyền: "Ta bước chân lên, dõng dạc, đường hoàng".',
      ] },
      { h: 'Ý nghĩa biểu tượng' },
      { p: 'Tâm trạng con hổ là tâm trạng của người dân Việt Nam mất nước đầu thế kỉ XX: khao khát tự do, chán ghét thực tại tù túng, nhớ tiếc một thời oanh liệt. Nỗi "nhớ rừng" trở thành biểu tượng của khát vọng tự do và lòng yêu nước thầm kín.' },
      { note: 'Câu thơ "Than ôi! Thời oanh liệt nay còn đâu?" lặp lại như một tiếng thở dài bi tráng — vừa nuối tiếc quá khứ, vừa bất lực với hiện tại.' },
    ],
    [
      { q: 'Hình tượng con hổ trong bài thơ tượng trưng cho điều gì?', a: 'Hình tượng con hổ bị giam cầm tượng trưng cho người dân Việt Nam mất nước trong cảnh nô lệ đầu thế kỉ XX. Con hổ "nhớ rừng", khao khát tự do, chán ghét cảnh tù túng giả dối chính là biểu tượng cho khát vọng tự do mãnh liệt, nỗi bất hoà sâu sắc với thực tại và lòng yêu nước thầm kín của một thế hệ — đặc biệt là tầng lớp thanh niên trí thức đương thời.' },
      { q: 'Phân tích sự đối lập giữa cảnh vườn bách thú và cảnh núi rừng trong bài thơ.', a: 'Cảnh vườn bách thú hiện lên tù túng, tầm thường, giả dối: "hoa chăm, cỏ xén, lối phẳng, cây trồng", "dải nước đen giả suối"... — tất cả đều nhân tạo, nhỏ bé, nhàm chán. Ngược lại, cảnh núi rừng trong hồi tưởng hùng vĩ, hoang dã, tráng lệ: "bóng cả cây già", "gió gào ngàn", những đêm trăng, ngày mưa, bình minh huy hoàng. Sự đối lập gay gắt này làm nổi bật nỗi uất hận với hiện tại và niềm tiếc nhớ khôn nguôi với quá khứ tự do — qua đó thể hiện khát vọng được sống đúng với tầm vóc, được tự do.' },
      { q: 'Vì sao nói bài thơ mang đậm bút pháp lãng mạn?', a: 'Bài thơ mang đậm bút pháp lãng mạn vì: nó xây dựng hình tượng kì vĩ, phi thường (con hổ chúa sơn lâm, núi rừng đại ngàn hùng vĩ); thể hiện cảm xúc mãnh liệt, trào dâng (uất hận, kiêu hãnh, nhớ tiếc); sử dụng trí tưởng tượng phong phú với những hình ảnh tráng lệ (bộ tranh tứ bình); và đặc biệt là khuynh hướng thoát li thực tại tầm thường để vươn tới một thế giới lí tưởng, tự do trong quá khứ và mộng tưởng. Giọng thơ hùng tráng, biến hoá cũng là đặc trưng của cảm hứng lãng mạn.' },
    ]
  ),

  'S8NV-w20-quiz': L(
    'Quê hương — Tế Hanh',
    'Nếu "Nhớ rừng" là tiếng gào của khát vọng tự do thì "Quê hương" của Tế Hanh lại là khúc hát trong trẻo về một làng chài ven biển. Cả bài thơ thấm đẫm nỗi nhớ và tình yêu quê hương tha thiết.',
    [
      'Hiểu nội dung và mạch cảm xúc của bài thơ.',
      'Phân tích bức tranh làng chài và hình ảnh người dân chài.',
      'Cảm nhận tình yêu quê hương trong sáng, thiết tha của tác giả.',
      'Thấy được nét đặc sắc của nghệ thuật so sánh, nhân hoá trong bài thơ.',
    ],
    [
      { h: 'Tác giả Tế Hanh' },
      { p: 'Tế Hanh (1921–2009), quê ở Quảng Ngãi — một làng chài ven biển. Ông đến với Thơ mới khi phong trào đã có nhiều thành tựu. Thơ Tế Hanh trong trẻo, đằm thắm, dạt dào tình cảm với quê hương, đất nước.' },
      { h: 'Hoàn cảnh sáng tác' },
      { p: '"Quê hương" sáng tác năm 1939, khi Tế Hanh đang học xa nhà, in trong tập "Nghẹn ngào" (sau in lại trong tập "Hoa niên"). Bài thơ là nỗi nhớ về làng chài quê hương của một người con xa xứ.' },
      { h: 'Bức tranh đoàn thuyền ra khơi' },
      { ul: [
        'Khung cảnh: "trời trong, gió nhẹ, sớm mai hồng" — không gian tươi sáng, thanh bình.',
        'Hình ảnh con thuyền: "hăng như con tuấn mã", "phăng mái chèo, mạnh mẽ vượt trường giang" — khoẻ khoắn, đầy sức sống.',
        'Cánh buồm: "Cánh buồm giương to như mảnh hồn làng / Rướn thân trắng bao la thâu góp gió" — so sánh độc đáo, cánh buồm thành biểu tượng thiêng liêng của làng chài.',
      ] },
      { h: 'Cảnh đoàn thuyền trở về và hình ảnh người dân chài' },
      { ul: [
        'Không khí: "Dân làng tấp nập đón ghe về", "Nhờ ơn trời, biển lặng, cá đầy ghe".',
        'Người dân chài: "Làn da ngăm rám nắng / Cả thân hình nồng thở vị xa xăm" — vẻ đẹp khoẻ khoắn, mặn mòi của biển cả.',
        'Con thuyền: "im bến mỏi trở về nằm / Nghe chất muối thấm dần trong thớ vỏ" — nhân hoá, con thuyền như một sinh thể có tâm hồn.',
      ] },
      { h: 'Nỗi nhớ quê hương' },
      { p: 'Khổ cuối, tác giả trực tiếp bày tỏ nỗi nhớ: "Nay xa cách lòng tôi luôn tưởng nhớ... Tôi thấy nhớ cái mùi nồng mặn quá!". Quê hương được cảm nhận bằng cả thị giác, xúc giác và khứu giác — cụ thể, da diết.' },
      { note: 'Điểm đặc sắc: Tế Hanh không chỉ tả mà còn thổi hồn vào cảnh vật. Con thuyền, cánh buồm đều có linh hồn, gắn bó máu thịt với con người và quê hương làng chài.' },
    ],
    [
      { q: 'Phân tích hình ảnh so sánh "Cánh buồm giương to như mảnh hồn làng".', a: 'Đây là một so sánh độc đáo và đầy sáng tạo. Tác giả so sánh "cánh buồm" — một vật cụ thể, hữu hình với "mảnh hồn làng" — một khái niệm trừu tượng, thiêng liêng. Cách so sánh "cái cụ thể với cái trừu tượng" này khiến cánh buồm trở nên lớn lao, thiêng liêng, mang theo cả linh hồn, sự sống và niềm hi vọng của cả làng chài ra khơi. Cánh buồm không còn là vật vô tri mà thành biểu tượng cho quê hương, cho khát vọng và sức sống của người dân biển.' },
      { q: 'Hình ảnh người dân chài được khắc hoạ qua những câu thơ nào? Vẻ đẹp của họ là gì?', a: 'Người dân chài hiện lên qua hai câu: "Dân chài lưới làn da ngăm rám nắng / Cả thân hình nồng thở vị xa xăm". Vẻ đẹp của họ là vẻ đẹp khoẻ khoắn, rắn rỏi với làn da rám nắng vì lao động giữa nắng gió biển khơi; đồng thời là vẻ đẹp lãng mạn, mặn mòi — "nồng thở vị xa xăm" gợi cả hơi thở của đại dương, của những chuyến đi xa thấm vào thân hình họ. Đó là hình ảnh con người lao động vừa chân thực vừa thi vị, mang tầm vóc của biển cả.' },
      { q: 'Nỗi nhớ quê hương ở khổ thơ cuối được thể hiện qua những giác quan nào?', a: 'Nỗi nhớ được thể hiện qua nhiều giác quan, làm nó trở nên cụ thể, sống động: thị giác (nhớ "màu nước xanh", "cá bạc", "chiếc buồm vôi", "con thuyền rẽ sóng"), và đặc biệt là khứu giác (nhớ "cái mùi nồng mặn"). Việc kết thúc bằng nỗi nhớ "mùi nồng mặn" — mùi đặc trưng của biển, của làng chài — cho thấy quê hương đã thấm vào tận tâm hồn, máu thịt tác giả; tình yêu quê hương vì thế thật chân thành, da diết.' },
    ]
  ),

  'S8NV-w21-quiz': L(
    'Khi con tu hú — Tố Hữu',
    'Trong bốn bức tường nhà lao, người chiến sĩ trẻ Tố Hữu nghe tiếng tu hú gọi bầy và lòng bừng lên khát vọng tự do cháy bỏng. "Khi con tu hú" là bài thơ của mùa hè, của tuổi trẻ và của lí tưởng cách mạng.',
    [
      'Hiểu hoàn cảnh sáng tác và mạch cảm xúc của bài thơ.',
      'Phân tích bức tranh mùa hè và tâm trạng người tù cách mạng.',
      'Cảm nhận khát vọng tự do mãnh liệt của người chiến sĩ trẻ.',
      'Hiểu ý nghĩa hình ảnh và âm thanh tiếng chim tu hú.',
    ],
    [
      { h: 'Tác giả Tố Hữu' },
      { p: 'Tố Hữu (1920–2002), tên thật Nguyễn Kim Thành, quê ở Thừa Thiên Huế, là lá cờ đầu của thơ ca cách mạng Việt Nam. Thơ ông là thơ trữ tình – chính trị, gắn bó với từng chặng đường cách mạng của dân tộc.' },
      { h: 'Hoàn cảnh sáng tác' },
      { p: '"Khi con tu hú" sáng tác tháng 7 năm 1939, khi Tố Hữu mới bị thực dân Pháp bắt giam tại nhà lao Thừa Phủ (Huế). Bài thơ in trong phần "Xiềng xích" của tập thơ "Từ ấy". Tiếng chim tu hú gọi bầy đã khơi nguồn cảm hứng cho bài thơ.' },
      { h: 'Bức tranh mùa hè (6 câu đầu)' },
      { ul: [
        'Âm thanh: tiếng tu hú gọi bầy, tiếng ve ngân, tiếng sáo diều.',
        'Màu sắc: lúa chiêm "đang chín", trái cây "ngọt dần", bắp "vàng hạt", nắng "đào", trời "xanh".',
        'Không gian: "trời xanh càng rộng càng cao", cánh diều "lộn nhào từng không".',
        'Một bức tranh mùa hè rộn ràng, tràn đầy sức sống, tự do, khoáng đạt.',
      ] },
      { h: 'Tâm trạng người tù (4 câu cuối)' },
      { p: 'Đối lập với bức tranh mùa hè tự do là tâm trạng ngột ngạt, uất ức của người tù: "Ta nghe hè dậy bên lòng / Mà chân muốn đạp tan phòng, hè ôi! / Ngột làm sao, chết uất thôi / Con chim tu hú ngoài trời cứ kêu!". Khát vọng tự do bùng lên mãnh liệt qua các động từ mạnh "đạp tan phòng", qua các từ cảm thán "ôi", "thôi", "làm sao".' },
      { h: 'Ý nghĩa tiếng chim tu hú' },
      { p: 'Tiếng tu hú mở đầu và kết thúc bài thơ, tạo kết cấu đầu cuối tương ứng. Đó là tiếng gọi của mùa hè, của sự sống và tự do bên ngoài. Tiếng chim ấy càng khắc sâu nỗi khao khát được tự do, được hoà vào cuộc sống, được tiếp tục hoạt động cách mạng của người tù.' },
      { note: 'So sánh sắc thái tiếng tu hú: mở đầu bài thơ, nó gợi cảnh mùa hè tươi đẹp; cuối bài, cũng tiếng chim ấy lại như giục giã, thiêu đốt, làm bùng lên nỗi uất ức và khát vọng phá tung xiềng xích.' },
    ],
    [
      { q: 'Phân tích bức tranh mùa hè trong sáu câu thơ đầu.', a: 'Sáu câu đầu vẽ nên một bức tranh mùa hè rực rỡ, tràn đầy sức sống và tự do. Bức tranh ấy có âm thanh (tu hú gọi bầy, ve ngân, sáo diều), có màu sắc (lúa chín vàng, trái cây ngọt, bắp vàng hạt, nắng đào, trời xanh), có hương vị (trái cây ngọt dần), có không gian khoáng đạt (trời xanh rộng cao, diều lộn nhào). Tất cả hiện lên qua trí tưởng tượng phong phú của người tù — một tâm hồn yêu đời, yêu tự do đến mãnh liệt, dù đang bị giam cầm vẫn cảm nhận trọn vẹn vẻ đẹp của cuộc sống bên ngoài.' },
      { q: 'Tâm trạng người tù được thể hiện như thế nào trong bốn câu thơ cuối?', a: 'Bốn câu cuối thể hiện tâm trạng ngột ngạt, uất ức và khát vọng tự do cháy bỏng. Các động từ mạnh ("đạp tan phòng"), các từ ngữ chỉ cảm giác cao độ ("ngột", "chết uất"), các từ cảm thán ("hè ôi", "làm sao", "thôi") diễn tả nỗi bức bối không thể kìm nén của người chiến sĩ trẻ khi bị giam cầm giữa lúc cuộc sống bên ngoài đang rộn ràng, tự do. Đó là khát vọng được phá tung xiềng xích, được trở về với tự do và lí tưởng cách mạng.' },
      { q: 'Nêu ý nghĩa và tác dụng của kết cấu đầu cuối tương ứng (tiếng tu hú ở đầu và cuối bài).', a: 'Tiếng chim tu hú xuất hiện ở câu đầu và câu cuối tạo nên kết cấu đầu cuối tương ứng, làm bài thơ chặt chẽ, trọn vẹn. Nhưng sắc thái của tiếng chim đã thay đổi: ở đầu bài, tiếng tu hú là tín hiệu gợi ra bức tranh mùa hè tươi đẹp, tự do; ở cuối bài, cũng tiếng chim ấy lại như tiếng gọi thúc giục, day dứt, làm trào dâng nỗi uất ức và khát vọng tự do của người tù. Sự thay đổi này thể hiện diễn biến tâm trạng từ say mê cảnh đẹp đến đau đớn, bức bối vì mất tự do — làm nổi bật chủ đề khát vọng tự do của bài thơ.' },
    ]
  ),

  'S8NV-w22-quiz': L(
    'Tức cảnh Pác Bó — Hồ Chí Minh',
    'Hôm nay ta gặp Bác Hồ ở hang Pác Bó — nơi Người sống cuộc đời cách mạng gian khổ mà vẫn ung dung, lạc quan. Bài thơ "Tức cảnh Pác Bó" cho ta thấy một tâm hồn lớn ẩn sau những vần thơ giản dị, hóm hỉnh.',
    [
      'Hiểu hoàn cảnh sáng tác bài thơ.',
      'Phân tích phong thái ung dung, tinh thần lạc quan của Bác.',
      'Cảm nhận tình yêu thiên nhiên và lí tưởng cách mạng cao cả.',
      'Thấy được sự kết hợp hài hoà giữa cổ điển và hiện đại trong thơ Bác.',
    ],
    [
      { h: 'Hoàn cảnh sáng tác' },
      { p: 'Sau ba mươi năm bôn ba tìm đường cứu nước, tháng 2 năm 1941, Bác Hồ về nước trực tiếp lãnh đạo cách mạng. Người sống và làm việc trong hang Pác Bó (Cao Bằng), điều kiện vô cùng gian khổ. Bài thơ "Tức cảnh Pác Bó" ra đời trong hoàn cảnh ấy, theo thể thất ngôn tứ tuyệt.' },
      { h: 'Toàn văn bài thơ' },
      { p: '"Sáng ra bờ suối, tối vào hang / Cháo bẹ rau măng vẫn sẵn sàng / Bàn đá chông chênh dịch sử Đảng / Cuộc đời cách mạng thật là sang."' },
      { h: 'Cuộc sống và phong thái của Bác' },
      { ul: [
        'Nếp sinh hoạt: "Sáng ra bờ suối, tối vào hang" — nhịp sống đều đặn, hoà hợp với thiên nhiên.',
        'Điều kiện vật chất: "cháo bẹ rau măng" — kham khổ, đạm bạc, nhưng "vẫn sẵn sàng".',
        'Công việc: "Bàn đá chông chênh dịch sử Đảng" — gian khó mà vẫn miệt mài làm cách mạng.',
      ] },
      { h: 'Tinh thần lạc quan, ung dung' },
      { p: 'Dù sống thiếu thốn nơi rừng sâu hang lạnh, Bác vẫn giữ phong thái ung dung, tự tại, hoà mình với thiên nhiên. Giọng thơ hóm hỉnh, vui tươi; cuộc sống gian khổ được nhìn như một niềm vui thanh cao.' },
      { h: 'Chữ "sang" và lí tưởng cách mạng' },
      { p: 'Chữ "sang" ở cuối bài là nhãn tự (chữ thần) của bài thơ. "Sang" không phải sang giàu về vật chất mà là sự sang trọng trong tâm hồn — niềm vui, niềm tự hào được cống hiến cho cách mạng, được sống cuộc đời có lí tưởng. Với Bác, làm cách mạng dù gian khổ vẫn là điều cao quý, "sang" nhất.' },
      { note: 'Sự hài hoà cổ điển – hiện đại: bài thơ mang hình thức cổ điển (thể tứ tuyệt, thú lâm tuyền của bậc ẩn sĩ) nhưng tinh thần lại rất hiện đại — đó là tinh thần của người chiến sĩ cách mạng làm chủ hoàn cảnh, lạc quan vì lí tưởng.' },
    ],
    [
      { q: 'Câu thơ "Cuộc đời cách mạng thật là sang" thể hiện điều gì về tâm hồn Bác?', a: 'Câu thơ thể hiện tinh thần lạc quan, ung dung và niềm tự hào của Bác về cuộc đời cách mạng. Chữ "sang" ở đây không hề chỉ sự giàu sang vật chất (bởi cuộc sống của Bác vô cùng kham khổ: ở hang, ăn cháo bẹ rau măng) mà chỉ sự sang trọng, cao quý trong tâm hồn — niềm vui được sống và cống hiến cho lí tưởng cách mạng, cho sự nghiệp giải phóng dân tộc. Đó là cách Bác làm chủ hoàn cảnh, biến gian khổ thành niềm vui, thể hiện một bản lĩnh và một tâm hồn lớn.' },
      { q: 'Phân tích sự đối lập giữa điều kiện sống và phong thái của Bác trong bài thơ.', a: 'Bài thơ có sự đối lập rõ nét: một bên là điều kiện sống vô cùng gian khổ, thiếu thốn ("tối vào hang", "cháo bẹ rau măng", "bàn đá chông chênh"); một bên là phong thái ung dung, tự tại, lạc quan, hóm hỉnh của Bác (nhịp sống đều đặn hoà với thiên nhiên, lương thực đạm bạc mà "vẫn sẵn sàng", cuối cùng khẳng định "thật là sang"). Sự đối lập này làm nổi bật vẻ đẹp tâm hồn Bác: vượt lên trên mọi khó khăn vật chất, giữ vững tinh thần lạc quan và niềm tin vào con đường cách mạng.' },
      { q: 'Vì sao nói bài thơ kết hợp hài hoà giữa màu sắc cổ điển và tinh thần hiện đại?', a: 'Màu sắc cổ điển thể hiện ở: thể thơ thất ngôn tứ tuyệt truyền thống; hình ảnh con người sống hoà hợp với thiên nhiên nơi suối, hang (gợi thú lâm tuyền, lối sống thanh cao của các bậc ẩn sĩ xưa). Tinh thần hiện đại thể hiện ở: nhân vật trữ tình không phải ẩn sĩ lánh đời mà là người chiến sĩ cách mạng đang hoạt động ("dịch sử Đảng"), làm chủ hoàn cảnh, lạc quan vì lí tưởng. Sự hoà quyện này tạo nên nét đặc sắc riêng trong thơ Hồ Chí Minh — vừa đậm đà truyền thống vừa mang hơi thở của thời đại cách mạng.' },
    ]
  ),

  'S8NV-w23-quiz': L(
    'Ngắm trăng — Hồ Chí Minh',
    'Trong chốn lao tù tăm tối, Bác Hồ vẫn say sưa ngắm vầng trăng sáng. "Ngắm trăng" (Vọng nguyệt) trong "Nhật kí trong tù" là cuộc vượt ngục bằng tinh thần, là cuộc gặp gỡ thơ mộng giữa thi nhân và ánh trăng.',
    [
      'Hiểu hoàn cảnh đặc biệt khi Bác sáng tác bài thơ.',
      'Phân tích tình yêu thiên nhiên và phong thái ung dung của Bác.',
      'Cảm nhận cuộc giao hoà thơ mộng giữa người và trăng.',
      'Thấy được tinh thần thép ẩn sau vẻ ung dung của thi nhân – chiến sĩ.',
    ],
    [
      { h: 'Tập thơ "Nhật kí trong tù"' },
      { p: '"Nhật kí trong tù" là tập thơ chữ Hán gồm 133 bài, Bác Hồ sáng tác trong thời gian bị chính quyền Tưởng Giới Thạch bắt giam (1942–1943) tại Quảng Tây, Trung Quốc. "Ngắm trăng" (nguyên tác "Vọng nguyệt") là một trong những bài thơ hay nhất của tập thơ.' },
      { h: 'Nguyên tác và dịch thơ' },
      { p: 'Phiên âm: "Ngục trung vô tửu diệc vô hoa / Đối thử lương tiêu nại nhược hà? / Nhân hướng song tiền khán minh nguyệt / Nguyệt tòng song khích khán thi gia." Dịch thơ (Nam Trân): "Trong tù không rượu cũng không hoa / Cảnh đẹp đêm nay, khó hững hờ / Người ngắm trăng soi ngoài cửa sổ / Trăng nhòm khe cửa ngắm nhà thơ."' },
      { h: 'Hoàn cảnh ngắm trăng đặc biệt' },
      { ul: [
        'Ngắm trăng trong tù — nơi không có "rượu", không có "hoa" (những thứ thường có khi thưởng trăng).',
        'Câu hỏi tu từ "nại nhược hà?" (biết làm thế nào?) thể hiện sự bối rối, xốn xang đầy thi vị trước cảnh đẹp.',
        'Vượt lên hoàn cảnh ngục tù khắc nghiệt để thưởng thức vẻ đẹp thiên nhiên.',
      ] },
      { h: 'Cuộc giao hoà người – trăng' },
      { p: 'Hai câu cuối là cuộc gặp gỡ kì diệu: "Người" (nhân) hướng ra ngoài cửa sổ ngắm trăng; "Trăng" (nguyệt) cũng vượt qua song sắt để ngắm "nhà thơ" (thi gia). Phép nhân hoá khiến trăng thành người bạn tri âm; song sắt nhà tù trở nên bất lực, không thể ngăn cách tâm hồn thi nhân với vầng trăng.' },
      { h: 'Chất thép và chất tình' },
      { p: 'Bài thơ thể hiện tình yêu thiên nhiên say đắm và phong thái ung dung của Bác (chất tình); đồng thời cho thấy bản lĩnh phi thường, tinh thần vượt lên trên gông cùm, xiềng xích của người chiến sĩ cách mạng (chất thép). Đây là cuộc "vượt ngục" bằng tinh thần.' },
      { note: 'Cấu trúc đối xứng tinh tế ở hai câu cuối: "nhân – nguyệt", "minh nguyệt – thi gia", "song tiền – song khích" tạo nên thế song hành, gắn bó giữa người và trăng, giữa thi nhân và thiên nhiên.' },
    ],
    [
      { q: 'Hoàn cảnh ngắm trăng của Bác trong bài thơ có gì đặc biệt?', a: 'Hoàn cảnh ngắm trăng của Bác vô cùng đặc biệt và đầy nghịch cảnh: Bác ngắm trăng khi đang ở trong tù — nơi thiếu thốn mọi bề, "không rượu cũng không hoa" (hai thứ mà người xưa thường có khi thưởng trăng), lại bị giam cầm, mất tự do. Vậy mà trước "cảnh đẹp đêm nay", Bác vẫn không thể "hững hờ", vẫn say sưa thưởng thức. Điều này cho thấy tình yêu thiên nhiên mãnh liệt và phong thái ung dung, tự tại vượt lên trên hoàn cảnh khắc nghiệt của Bác.' },
      { q: 'Phân tích phép nhân hoá và nghệ thuật đối trong hai câu thơ cuối.', a: 'Hai câu cuối ("Người ngắm trăng soi ngoài cửa sổ / Trăng nhòm khe cửa ngắm nhà thơ") sử dụng phép nhân hoá: trăng được nhân hoá thành một con người, biết "nhòm", biết "ngắm" nhà thơ như một người bạn tri âm. Nghệ thuật đối được thể hiện qua cấu trúc song hành: "Người" đối với "Trăng", "ngắm" đối với "nhòm/ngắm", người chủ động hướng ra với trăng và trăng cũng chủ động tìm đến với người. Hai câu thơ tạo nên cuộc giao hoà tuyệt đẹp, trong đó song sắt nhà tù trở nên bất lực, không thể ngăn cách tâm hồn tự do của thi nhân với vầng trăng — biểu tượng của cái đẹp và tự do.' },
      { q: 'Bài thơ thể hiện sự hoà hợp giữa "chất thép" và "chất tình" như thế nào?', a: '"Chất tình" thể hiện ở tình yêu thiên nhiên say đắm, ở tâm hồn nghệ sĩ rung động trước vẻ đẹp của trăng, ở cuộc giao hoà thơ mộng giữa người và trăng. "Chất thép" thể hiện ở bản lĩnh, ý chí kiên cường: dù bị giam cầm, xiềng xích, Bác vẫn giữ được sự ung dung, tự do trong tâm hồn, vẫn ngắm trăng làm thơ — một cuộc "vượt ngục tinh thần". Sự hoà hợp giữa tâm hồn nghệ sĩ và ý chí chiến sĩ này chính là vẻ đẹp đặc trưng trong con người và thơ ca Hồ Chí Minh.' },
    ]
  ),

  'S8NV-w24-quiz': L(
    'Đi đường — Hồ Chí Minh',
    'Từ những chặng đường chuyển lao gian nan, Bác Hồ đã đúc kết một triết lí sống sâu sắc trong bài "Đi đường" (Tẩu lộ). Bài thơ tả thực việc đi đường mà ngụ ý cả con đường cách mạng và con đường đời.',
    [
      'Hiểu hoàn cảnh sáng tác và nội dung bài thơ.',
      'Phân tích lớp nghĩa tả thực và lớp nghĩa biểu tượng.',
      'Rút ra triết lí về sự kiên trì vượt khó để đi tới thành công.',
      'Cảm nhận vẻ đẹp tâm hồn và bản lĩnh người chiến sĩ cách mạng.',
    ],
    [
      { h: 'Xuất xứ và thể loại' },
      { p: '"Đi đường" (nguyên tác chữ Hán "Tẩu lộ") cũng nằm trong tập "Nhật kí trong tù". Bài thơ được gợi cảm hứng từ những lần Bác bị giải đi từ nhà lao này sang nhà lao khác, phải trèo đèo lội suối vô cùng vất vả. Nguyên tác theo thể thất ngôn tứ tuyệt.' },
      { h: 'Nguyên tác và dịch thơ' },
      { p: 'Phiên âm: "Tẩu lộ tài tri tẩu lộ nan / Trùng san chi ngoại hựu trùng san / Trùng san đăng đáo cao phong hậu / Vạn lí dư đồ cố miện gian." Dịch thơ (Nam Trân): "Đi đường mới biết gian lao / Núi cao rồi lại núi cao trập trùng / Núi cao lên đến tận cùng / Thu vào tầm mắt muôn trùng nước non."' },
      { h: 'Lớp nghĩa tả thực' },
      { ul: [
        'Câu 1: nỗi gian lao của việc đi đường — chỉ khi đi mới thấm thía ("tài tri").',
        'Câu 2: hết lớp núi này lại đến lớp núi khác, trùng điệp, không dứt.',
        'Câu 3: cuối cùng cũng lên tới đỉnh núi cao nhất.',
        'Câu 4: từ đỉnh cao, thu vào tầm mắt cả muôn trùng nước non hùng vĩ.',
      ] },
      { h: 'Lớp nghĩa biểu tượng' },
      { p: 'Việc đi đường gian nan tượng trưng cho con đường cách mạng và con đường đời đầy thử thách. "Trùng san" (núi tiếp núi) là những khó khăn chồng chất. Lên đến đỉnh cao và thu cả nước non vào tầm mắt là hình ảnh của thành công, của tầm cao tư tưởng đạt được sau khi vượt qua mọi gian khó.' },
      { h: 'Triết lí của bài thơ' },
      { p: 'Bài thơ gửi gắm bài học sâu sắc: con đường đi tới thành công bao giờ cũng đầy gian nan, thử thách. Nhưng nếu có ý chí kiên trì, bền bỉ vượt qua hết khó khăn này đến khó khăn khác, con người nhất định sẽ đạt tới đỉnh cao thắng lợi và có được tầm nhìn, tư thế làm chủ.' },
      { note: 'Bài thơ mang dáng dấp một bài thơ tả cảnh, kể chuyện đi đường nhưng thực chất là bài thơ triết lí — "ý tại ngôn ngoại" (ý ở ngoài lời), nhẹ nhàng mà thâm thuý.' },
    ],
    [
      { q: 'Phân tích hai lớp nghĩa (tả thực và biểu tượng) của bài thơ.', a: 'Lớp nghĩa tả thực: bài thơ kể về việc đi đường gian nan — đi rồi mới biết đường khó, núi cao tiếp nối núi cao trùng điệp, nhưng cuối cùng cũng lên đến đỉnh và ngắm được muôn trùng nước non. Lớp nghĩa biểu tượng: việc đi đường tượng trưng cho con đường cách mạng và con đường đời; những lớp núi trùng điệp là những khó khăn, thử thách chồng chất; việc lên tới đỉnh cao và thu cả nước non vào tầm mắt là hình ảnh của sự chiến thắng, thành công và tầm cao tư tưởng đạt được sau khi kiên trì vượt qua gian khó. Lớp nghĩa thứ hai mới là điều tác giả thực sự muốn gửi gắm.' },
      { q: 'Bài thơ rút ra triết lí gì về con đường đi tới thành công?', a: 'Bài thơ rút ra triết lí: con đường đi tới thành công luôn đầy gian nan, thử thách, hết khó khăn này lại đến khó khăn khác ("Núi cao rồi lại núi cao trập trùng"). Tuy nhiên, nếu con người có ý chí kiên trì, bền bỉ, không nản lòng, quyết tâm vượt qua tất cả thì cuối cùng nhất định sẽ đạt tới đỉnh cao của thắng lợi, có được niềm vui và tầm nhìn rộng lớn ("Thu vào tầm mắt muôn trùng nước non"). Gian khổ chính là điều kiện thử thách và tôi luyện để đi tới thành công.' },
      { q: 'Hình ảnh "Thu vào tầm mắt muôn trùng nước non" gợi cho em cảm nhận gì?', a: 'Hình ảnh này gợi tư thế và tâm thế của người đã chiến thắng, đã vượt qua mọi gian khó để lên tới đỉnh cao. Từ trên đỉnh núi, tầm mắt được mở rộng vô tận, thu cả "muôn trùng nước non" hùng vĩ. Đó vừa là niềm vui sướng, tự hào của người đi đường khi đạt đích, vừa là biểu tượng cho tầm cao tư tưởng, cho cái nhìn bao quát và tư thế làm chủ của người chiến sĩ cách mạng sau khi vượt qua thử thách. Câu thơ kết thúc trong một âm hưởng khoáng đạt, hân hoan và đầy chất suy tưởng.' },
    ]
  ),

  'S8NV-w25-quiz': L(
    'Chiếu dời đô — Lí Công Uẩn',
    'Ta lùi về một mốc son lịch sử — năm 1010, khi vua Lí Công Uẩn ban "Chiếu dời đô", đặt nền móng cho kinh đô Thăng Long ngàn năm văn hiến. Đây là áng văn nghị luận trung đại với lập luận chặt chẽ và tầm nhìn xa rộng.',
    [
      'Hiểu hoàn cảnh lịch sử và đặc điểm thể chiếu.',
      'Phân tích trình tự lập luận chặt chẽ của bài chiếu.',
      'Hiểu khát vọng xây dựng đất nước hùng cường và tầm nhìn của vua Lí Công Uẩn.',
      'Thấy được sự kết hợp giữa lí và tình trong văn nghị luận.',
    ],
    [
      { h: 'Tác giả và thể loại' },
      { p: 'Lí Công Uẩn (974–1028), tức vua Lí Thái Tổ, là người sáng lập vương triều Lí. "Chiếu dời đô" (Thiên đô chiếu) viết năm 1010 bày tỏ ý định dời kinh đô từ Hoa Lư về thành Đại La. Chiếu là thể văn do vua dùng để ban bố mệnh lệnh, thường viết bằng văn biền ngẫu.' },
      { h: 'Trình tự lập luận của bài chiếu' },
      { ul: [
        'Nêu tiền đề lịch sử: dẫn việc dời đô của nhà Thương, nhà Chu bên Trung Quốc — đều nhằm mưu toan nghiệp lớn, làm đất nước thịnh vượng.',
        'Soi vào thực tế: phê phán hai nhà Đinh, Lê không theo dấu cũ, cứ đóng đô ở Hoa Lư nên triều đại ngắn ngủi, dân khổ.',
        'Khẳng định lợi thế của Đại La: vị trí trung tâm, thế đất đẹp, thuận lợi mọi mặt.',
        'Kết luận: quyết định dời đô, hỏi ý kiến quần thần.',
      ] },
      { h: 'Lợi thế của thành Đại La' },
      { ul: [
        'Vị thế lịch sử: từng là kinh đô cũ của Cao Vương (Cao Biền).',
        'Vị trí địa lí: "ở vào nơi trung tâm trời đất", "thế rồng cuộn hổ ngồi", chính giữa nam bắc đông tây.',
        'Điều kiện tự nhiên: đất rộng mà bằng phẳng, cao mà thoáng, dân không khổ vì ngập lụt, muôn vật phong phú.',
        'Kết luận: "thật là chốn tụ hội trọng yếu của bốn phương đất nước; cũng là nơi kinh đô bậc nhất của đế vương muôn đời".',
      ] },
      { h: 'Sự kết hợp giữa lí và tình' },
      { p: 'Bài chiếu vừa có lí lẽ chặt chẽ, dẫn chứng thuyết phục (lí), vừa thấm đượm tình cảm. Câu kết "Trẫm muốn dựa vào sự thuận lợi của đất ấy để định chỗ ở. Các khanh nghĩ thế nào?" cho thấy vua không áp đặt mà bàn bạc, hỏi ý quần thần — thể hiện tinh thần dân chủ và sự đồng thuận.' },
      { note: 'Việc dời đô về Đại La (đổi tên thành Thăng Long) là một quyết định sáng suốt, có tầm nhìn chiến lược, mở ra thời kì phát triển lâu dài, thịnh vượng cho dân tộc.' },
    ],
    [
      { q: 'Vì sao Lí Công Uẩn quyết định dời đô từ Hoa Lư về Đại La?', a: 'Lí Công Uẩn quyết định dời đô vì hai lí do chính. Thứ nhất, Hoa Lư là vùng đất chật hẹp, hiểm trở, chỉ thuận lợi cho việc phòng thủ quân sự nhưng không thuận cho việc phát triển kinh tế, văn hoá lâu dài; hai nhà Đinh, Lê cứ đóng đô ở đó nên triều đại ngắn ngủi. Thứ hai, Đại La có nhiều lợi thế vượt trội: ở vị trí trung tâm đất nước, thế đất "rồng cuộn hổ ngồi", đất rộng bằng phẳng, cao thoáng, dân cư thuận lợi làm ăn, muôn vật phong phú — xứng đáng là kinh đô bậc nhất của đế vương muôn đời. Quyết định này thể hiện khát vọng xây dựng đất nước hùng cường và tầm nhìn chiến lược của nhà vua.' },
      { q: 'Phân tích trình tự lập luận của bài chiếu để thấy sự chặt chẽ, thuyết phục.', a: 'Bài chiếu lập luận theo trình tự rất chặt chẽ: (1) Mở đầu nêu tiền đề lịch sử — dẫn việc các vua nhà Thương, nhà Chu nhiều lần dời đô để mưu nghiệp lớn, làm cơ sở cho việc dời đô là hợp đạo lí, hợp quy luật. (2) Tiếp đó soi vào thực tế nước ta, phê phán hai nhà Đinh, Lê đóng đô ở Hoa Lư khiến triều đại không bền, dân khổ — tạo nhu cầu phải thay đổi. (3) Sau đó phân tích kĩ những lợi thế nhiều mặt của thành Đại La (lịch sử, địa lí, tự nhiên) để khẳng định đây là nơi định đô lí tưởng. (4) Cuối cùng đi đến kết luận dời đô và hỏi ý kiến quần thần. Trình tự từ tiền đề → thực tiễn → giải pháp → kết luận khiến lập luận vừa logic, vừa giàu sức thuyết phục.' },
      { q: 'Câu kết "Các khanh nghĩ thế nào?" thể hiện điều gì về cách ứng xử của vua Lí Công Uẩn?', a: 'Câu kết "Trẫm muốn dựa vào sự thuận lợi của đất ấy để định chỗ ở. Các khanh nghĩ thế nào?" cho thấy vua Lí Công Uẩn tuy có quyền tối cao nhưng không hề áp đặt, độc đoán. Thay vì ra lệnh, vua đưa vấn đề ra bàn bạc, hỏi ý kiến quần thần. Điều này thể hiện tinh thần dân chủ, sự gần gũi, biết lắng nghe và tôn trọng ý kiến của bề tôi; đồng thời cho thấy nhà vua mong muốn có sự đồng thuận để quyết định dời đô được lòng người, thuận ý trời. Đây là cách ứng xử khôn ngoan, thể hiện đức độ của một vị minh quân.' },
    ]
  ),

  'S8NV-w26-quiz': L(
    'Hịch tướng sĩ — Trần Quốc Tuấn',
    'Trước hoạ xâm lăng của giặc Nguyên – Mông, Hưng Đạo Vương Trần Quốc Tuấn đã viết "Hịch tướng sĩ" — áng hùng văn bất hủ thổi bùng ngọn lửa yêu nước và quyết tâm đánh giặc trong lòng quân sĩ.',
    [
      'Hiểu hoàn cảnh lịch sử và đặc điểm thể hịch.',
      'Phân tích nghệ thuật lập luận và sức truyền cảm của bài hịch.',
      'Cảm nhận lòng yêu nước, căm thù giặc của Trần Quốc Tuấn.',
      'Thấy được vai trò khích lệ tinh thần chiến đấu của bài hịch.',
    ],
    [
      { h: 'Tác giả và hoàn cảnh' },
      { p: 'Trần Quốc Tuấn (1231?–1300), tức Hưng Đạo Đại Vương, là vị anh hùng dân tộc, nhà quân sự thiên tài. "Hịch tướng sĩ" được viết khoảng trước cuộc kháng chiến chống quân Nguyên – Mông lần thứ hai (1285), nhằm khích lệ tướng sĩ học tập "Binh thư yếu lược" và quyết tâm đánh giặc. Hịch là thể văn nghị luận dùng để cổ vũ, kêu gọi, thuyết phục.' },
      { h: 'Bố cục và mạch lập luận' },
      { ul: [
        'Nêu gương các trung thần nghĩa sĩ trong sử sách để khích lệ ý chí.',
        'Tố cáo tội ác của giặc và bày tỏ lòng căm thù, nỗi đau của chủ tướng.',
        'Phân tích lẽ thiệt hơn, phê phán thái độ sai lầm của tướng sĩ.',
        'Kêu gọi tướng sĩ học "Binh thư yếu lược", nêu cao tinh thần cảnh giác và quyết chiến.',
      ] },
      { h: 'Lòng căm thù giặc và nỗi đau của chủ tướng' },
      { p: 'Trần Quốc Tuấn bày tỏ nỗi đau và lòng căm thù mãnh liệt: "Ta thường tới bữa quên ăn, nửa đêm vỗ gối; ruột đau như cắt, nước mắt đầm đìa; chỉ căm tức chưa xả thịt lột da, nuốt gan uống máu quân thù. Dẫu cho trăm thân này phơi ngoài nội cỏ, nghìn xác này gói trong da ngựa, ta cũng vui lòng." Đoạn văn dồn dập, mãnh liệt, thể hiện tinh thần xả thân vì nước.' },
      { h: 'Nghệ thuật lập luận' },
      { ul: [
        'Kết hợp lí lẽ sắc bén với dẫn chứng phong phú (gương trung thần, thực tế giặc tàn bạo).',
        'Giọng văn linh hoạt: khi tâm tình, khi nghiêm khắc phê phán, khi tha thiết kêu gọi.',
        'Sử dụng nhiều câu văn biền ngẫu, điệp ngữ, so sánh, ẩn dụ giàu sức truyền cảm.',
        'Lập luận chặt chẽ, vừa đánh vào lí trí vừa khơi gợi tình cảm.',
      ] },
      { note: 'Bài hịch vừa là mệnh lệnh của chủ tướng, vừa là lời tâm huyết của người yêu nước; vừa nghiêm khắc vừa ân tình — nên có sức lay động và cổ vũ mạnh mẽ tinh thần tướng sĩ.' },
    ],
    [
      { q: 'Mục đích của bài "Hịch tướng sĩ" là gì?', a: 'Mục đích của bài hịch là khích lệ tinh thần yêu nước, lòng căm thù giặc và ý chí quyết chiến quyết thắng của các tướng sĩ trước hoạ xâm lăng của giặc Nguyên – Mông. Cụ thể, Trần Quốc Tuấn muốn thức tỉnh các tướng sĩ, phê phán những thái độ sai lầm (ham vui chơi, bàng quan trước vận nước), kêu gọi họ từ bỏ lối sống hưởng lạc, ra sức học tập "Binh thư yếu lược", rèn luyện võ nghệ, nêu cao cảnh giác để sẵn sàng chiến đấu bảo vệ Tổ quốc.' },
      { q: 'Phân tích đoạn văn thể hiện lòng căm thù giặc của Trần Quốc Tuấn ("Ta thường tới bữa quên ăn...").', a: 'Đoạn văn "Ta thường tới bữa quên ăn, nửa đêm vỗ gối; ruột đau như cắt, nước mắt đầm đìa; chỉ căm tức chưa xả thịt lột da, nuốt gan uống máu quân thù..." thể hiện lòng yêu nước và căm thù giặc đến tột cùng của vị chủ tướng. Các hình ảnh cụ thể, mạnh mẽ ("quên ăn", "vỗ gối", "ruột đau như cắt", "nước mắt đầm đìa") diễn tả nỗi đau đớn, trăn trở khôn nguôi trước cảnh nước mất; các động từ dữ dội ("xả thịt", "lột da", "nuốt gan", "uống máu") thể hiện lòng căm thù sôi sục. Câu "Dẫu cho trăm thân này phơi ngoài nội cỏ... ta cũng vui lòng" thể hiện tinh thần sẵn sàng hi sinh vì nước. Đoạn văn có sức lay động lớn, là tấm gương sáng để cổ vũ tướng sĩ.' },
      { q: 'Vì sao bài hịch có sức thuyết phục và cổ vũ mạnh mẽ đối với tướng sĩ?', a: 'Bài hịch có sức thuyết phục và cổ vũ mạnh mẽ nhờ nghệ thuật lập luận xuất sắc kết hợp với tình cảm chân thành. Về lí: lập luận chặt chẽ, dẫn chứng phong phú (gương các trung thần nghĩa sĩ, tội ác giặc, lẽ thiệt hơn được mất), phân tích thấu đáo. Về tình: chủ tướng bày tỏ nỗi đau, lòng căm thù và cả tình cảm gắn bó, ân nghĩa với tướng sĩ, khiến họ cảm động. Giọng văn linh hoạt — khi tâm tình thân mật, khi nghiêm khắc phê phán, khi tha thiết kêu gọi — cùng với các câu văn biền ngẫu, điệp ngữ, so sánh giàu hình ảnh tạo nên sức truyền cảm lớn, vừa đánh thức lí trí vừa khơi dậy tình cảm và ý chí chiến đấu của tướng sĩ.' },
    ]
  ),

  'S8NV-w27-quiz': L(
    'Câu nghi vấn — Câu cầu khiến',
    'Trong giao tiếp, ta dùng nhiều kiểu câu khác nhau tuỳ mục đích nói. Hôm nay ta tìm hiểu hai kiểu câu phân loại theo mục đích nói: câu nghi vấn (để hỏi) và câu cầu khiến (để yêu cầu, ra lệnh).',
    [
      'Hiểu đặc điểm hình thức và chức năng của câu nghi vấn.',
      'Hiểu đặc điểm hình thức và chức năng của câu cầu khiến.',
      'Nhận biết các chức năng khác (gián tiếp) của câu nghi vấn.',
      'Sử dụng đúng hai kiểu câu này trong giao tiếp.',
    ],
    [
      { h: 'Câu nghi vấn' },
      { p: 'Câu nghi vấn là câu có chức năng chính dùng để hỏi. Về hình thức, câu nghi vấn có các từ nghi vấn (ai, gì, nào, sao, đâu, bao giờ, bao nhiêu, à, ư, hử, chứ, không, chưa...) hoặc có từ "hay" nối các vế lựa chọn; khi viết kết thúc bằng dấu chấm hỏi.' },
      { h: 'Chức năng khác của câu nghi vấn' },
      { ul: [
        'Dùng để cầu khiến: "Bạn có thể đóng giúp mình cửa được không?"',
        'Dùng để khẳng định/phủ định: "Ai bảo tôi sai?" (= không ai bảo).',
        'Dùng để bộc lộ cảm xúc: "Sao mà đẹp thế!"',
        'Dùng để đe doạ: "Mày có im đi không?"',
      ] },
      { h: 'Câu cầu khiến' },
      { p: 'Câu cầu khiến là câu có những từ cầu khiến (hãy, đừng, chớ, đi, thôi, nào...) hay ngữ điệu cầu khiến; dùng để ra lệnh, yêu cầu, đề nghị, khuyên bảo. Khi viết thường kết thúc bằng dấu chấm than, nhưng khi ý cầu khiến không được nhấn mạnh có thể kết thúc bằng dấu chấm.' },
      { h: 'Các sắc thái của câu cầu khiến' },
      { ul: [
        'Ra lệnh: "Đứng dậy!"',
        'Yêu cầu, đề nghị: "Hãy giữ trật tự."',
        'Khuyên bảo: "Em đừng buồn nữa."',
        'Van xin: "Xin ông tha cho cháu!"',
      ] },
      { note: 'Cùng một nội dung có thể diễn đạt bằng câu cầu khiến trực tiếp ("Đóng cửa lại!") hoặc câu nghi vấn mang ý cầu khiến ("Bạn đóng cửa giúp mình nhé?"). Câu nghi vấn dùng để cầu khiến thường lịch sự hơn.' },
    ],
    [
      { q: 'Phân loại hai câu sau theo mục đích nói: "Bạn đi đâu đấy?" và "Hãy đi học đi!".', a: 'Câu "Bạn đi đâu đấy?" là câu nghi vấn, dùng để hỏi (có từ nghi vấn "đâu" và kết thúc bằng dấu chấm hỏi). Câu "Hãy đi học đi!" là câu cầu khiến, dùng để yêu cầu, thúc giục (có từ cầu khiến "hãy", "đi" và kết thúc bằng dấu chấm than).' },
      { q: 'Câu "Bạn có thể nói nhỏ hơn được không?" thuộc kiểu câu gì và có chức năng gì?', a: 'Về hình thức, đây là câu nghi vấn (có từ nghi vấn "được không" và kết thúc bằng dấu chấm hỏi). Tuy nhiên, về chức năng, câu này không dùng để hỏi mà dùng để cầu khiến — đề nghị người khác nói nhỏ hơn một cách lịch sự, nhã nhặn. Đây là trường hợp câu nghi vấn được dùng với chức năng gián tiếp (cầu khiến), khiến lời đề nghị trở nên tế nhị, dễ được chấp nhận hơn.' },
      { q: 'Đặt một câu nghi vấn (để hỏi) và một câu cầu khiến (để khuyên bảo).', a: 'Câu nghi vấn để hỏi: "Hôm nay em đã làm bài tập về nhà chưa?" (có từ nghi vấn "chưa", dấu chấm hỏi). Câu cầu khiến để khuyên bảo: "Em đừng thức khuya quá, hãy giữ gìn sức khoẻ nhé." (có các từ cầu khiến "đừng", "hãy").' },
    ]
  ),

  'S8NV-w28-quiz': L(
    'Câu cảm thán — Câu trần thuật',
    'Tiếp nối bài học về các kiểu câu chia theo mục đích nói, hôm nay ta tìm hiểu câu cảm thán (bộc lộ cảm xúc) và câu trần thuật (kể, tả, thông báo) — kiểu câu phổ biến nhất trong giao tiếp.',
    [
      'Hiểu đặc điểm hình thức và chức năng của câu cảm thán.',
      'Hiểu đặc điểm hình thức và chức năng của câu trần thuật.',
      'Phân biệt câu trần thuật với các kiểu câu khác.',
      'Sử dụng đúng hai kiểu câu này trong nói và viết.',
    ],
    [
      { h: 'Câu cảm thán' },
      { p: 'Câu cảm thán là câu có những từ ngữ cảm thán (ôi, than ôi, hỡi ơi, chao ôi, trời ơi, thay, biết bao, biết chừng nào, xiết bao...) dùng để bộc lộ trực tiếp cảm xúc của người nói (người viết). Khi viết, câu cảm thán thường kết thúc bằng dấu chấm than.' },
      { h: 'Cách dùng câu cảm thán' },
      { ul: [
        'Bộc lộ vui sướng, ngạc nhiên, thán phục: "Ôi, đẹp quá!"',
        'Bộc lộ đau buồn, xót xa: "Than ôi! Thời oanh liệt nay còn đâu?"',
        'Câu cảm thán xuất hiện nhiều trong văn biểu cảm, thơ ca; ít dùng trong văn bản hành chính, khoa học.',
      ] },
      { h: 'Câu trần thuật' },
      { p: 'Câu trần thuật là câu không có đặc điểm hình thức của các kiểu câu nghi vấn, cầu khiến, cảm thán; thường dùng để kể, thông báo, nhận định, miêu tả... Khi viết, câu trần thuật thường kết thúc bằng dấu chấm (đôi khi là dấu chấm than hoặc chấm lửng).' },
      { h: 'Chức năng của câu trần thuật' },
      { ul: [
        'Kể: "Hôm qua, em đi thăm bà ngoại."',
        'Miêu tả: "Bầu trời hôm nay trong xanh."',
        'Thông báo: "Ngày mai lớp ta nghỉ học."',
        'Nhận định, đánh giá: "Bài thơ này rất hay."',
        'Yêu cầu, bộc lộ cảm xúc (gián tiếp): "Anh nên về sớm."',
      ] },
      { note: 'Câu trần thuật là kiểu câu cơ bản và được dùng phổ biến nhất trong giao tiếp. Nó có thể đảm nhận cả chức năng của các kiểu câu khác (cầu khiến, cảm thán) một cách gián tiếp.' },
    ],
    [
      { q: 'Phân loại hai câu sau: "Trời ơi, nóng quá!" và "Hôm nay trời rất nóng.".', a: 'Câu "Trời ơi, nóng quá!" là câu cảm thán: có từ cảm thán "Trời ơi", "quá", dùng để bộc lộ trực tiếp cảm xúc (sự khó chịu trước cái nóng), kết thúc bằng dấu chấm than. Câu "Hôm nay trời rất nóng." là câu trần thuật: dùng để thông báo, nhận định về thời tiết một cách bình thường, không có dấu hiệu của các kiểu câu khác, kết thúc bằng dấu chấm.' },
      { q: 'Đặt một câu cảm thán bộc lộ sự thán phục và một câu trần thuật miêu tả.', a: 'Câu cảm thán: "Ôi, cảnh hoàng hôn trên biển đẹp biết bao!" (từ cảm thán "Ôi", "biết bao", bộc lộ sự thán phục, dấu chấm than). Câu trần thuật: "Mặt trời từ từ lặn xuống sau rặng núi, nhuộm đỏ cả một góc trời." (miêu tả cảnh, kết thúc bằng dấu chấm).' },
      { q: 'Vì sao trong các văn bản khoa học, hành chính, người ta hầu như không dùng câu cảm thán?', a: 'Vì câu cảm thán dùng để bộc lộ cảm xúc chủ quan của người nói, người viết. Trong khi đó, văn bản khoa học, hành chính đòi hỏi tính chính xác, khách quan, trung tính, không thể hiện cảm xúc cá nhân. Việc cung cấp thông tin, trình bày sự việc, quy định trong các văn bản này cần dựa trên lí trí và dữ kiện, nên chủ yếu dùng câu trần thuật. Câu cảm thán chỉ phù hợp với các văn bản nghệ thuật, biểu cảm như thơ, văn, nhật kí, thư từ.' },
    ]
  ),

  'S8NV-w29-quiz': L(
    'Câu phủ định',
    'Hoàn tất nhóm các kiểu câu chia theo mục đích nói, hôm nay ta tìm hiểu câu phủ định — kiểu câu dùng để thông báo sự vắng mặt của sự vật, sự việc hoặc để bác bỏ một ý kiến, một nhận định.',
    [
      'Hiểu đặc điểm hình thức và chức năng của câu phủ định.',
      'Phân biệt câu phủ định miêu tả và câu phủ định bác bỏ.',
      'Nhận biết hiện tượng phủ định của phủ định (mang ý khẳng định).',
      'Sử dụng câu phủ định phù hợp trong giao tiếp.',
    ],
    [
      { h: 'Câu phủ định là gì?' },
      { p: 'Câu phủ định là câu có những từ ngữ phủ định như: không, chẳng, chả, chưa, không phải (là), chẳng phải (là), đâu (có), có... đâu, làm gì có... Đây là dấu hiệu hình thức để nhận biết câu phủ định.' },
      { h: 'Hai chức năng của câu phủ định' },
      { ul: [
        'Phủ định miêu tả: thông báo, xác nhận không có sự vật, sự việc, tính chất, quan hệ nào đó. Ví dụ: "Hôm nay trời không mưa."',
        'Phủ định bác bỏ: phản bác một ý kiến, một nhận định. Ví dụ: "Không, nó không hề lười học!" (bác bỏ ý cho rằng "nó lười học").',
      ] },
      { h: 'Cách phân biệt hai loại' },
      { p: 'Câu phủ định bác bỏ thường xuất hiện sau một ý kiến, nhận định nào đó (để phản bác lại). Câu phủ định miêu tả thì chỉ đơn thuần thông báo sự không tồn tại, không nhằm bác bỏ điều gì. Phải dựa vào ngữ cảnh để phân biệt.' },
      { h: 'Phủ định của phủ định' },
      { p: 'Trong câu, nếu dùng hai lần từ phủ định thì lại mang ý nghĩa khẳng định (nhấn mạnh). Ví dụ: "Không phải là tôi không biết." = "Tôi có biết." Hoặc: "Trẫm rất đau xót về việc đó, không thể không dời đổi." (= phải dời đổi).' },
      { note: 'Lưu ý: không phải cứ có từ "không, chưa, chẳng" là câu phủ định. Cần xem từ đó có dùng để phủ định hay không. Ví dụ "Đẹp không tả xiết" lại mang nghĩa khẳng định cái đẹp.' },
    ],
    [
      { q: 'Phân biệt câu phủ định miêu tả và câu phủ định bác bỏ, cho ví dụ.', a: 'Câu phủ định miêu tả thông báo, xác nhận sự không tồn tại của một sự vật, sự việc, tính chất nào đó, không nhằm phản bác ai. Ví dụ: "Trong lớp không có ai đến muộn." Câu phủ định bác bỏ dùng để phản bác, bác bỏ một ý kiến, nhận định đã được nêu ra trước đó. Ví dụ: khi có người nói "Cậu làm vỡ lọ hoa rồi", ta đáp: "Không, không phải tôi làm vỡ đâu!" — câu này bác bỏ lời buộc tội kia. Như vậy, điểm phân biệt là: phủ định bác bỏ luôn gắn với một ý kiến có trước cần phản bác, còn phủ định miêu tả thì không.' },
      { q: 'Đặt một câu phủ định miêu tả và một câu phủ định bác bỏ.', a: 'Câu phủ định miêu tả: "Tôi chưa từng đọc cuốn tiểu thuyết này." (chỉ thông báo về việc chưa đọc, không phản bác ai). Câu phủ định bác bỏ: "Không, bạn nhầm rồi, mình không hề nói như thế!" (bác bỏ lại lời của người khác cho rằng "mình đã nói như thế").' },
      { q: 'Giải thích ý nghĩa của câu sau và cho biết nó khẳng định hay phủ định: "Không phải là em không thích món quà này."', a: 'Câu này chứa hai từ phủ định: "không phải" và "không". Theo quy tắc phủ định của phủ định, hai lần phủ định lại tạo thành ý nghĩa khẳng định. Vì vậy câu "Không phải là em không thích món quà này" thực chất mang ý nghĩa khẳng định: "Em có thích món quà này." Cách nói này thường được dùng để khẳng định một cách nhẹ nhàng, tế nhị, hoặc để nhấn mạnh, đính chính lại một hiểu lầm trước đó (rằng em không thích).' },
    ]
  ),

  'S8NV-w30-quiz': L(
    'Hành động nói',
    'Khi ta nói "Tôi hứa sẽ giúp bạn", lời nói ấy chính là một hành động — hành động hứa. Bài học hôm nay về "hành động nói" sẽ giúp các em hiểu rằng nói không chỉ để truyền tin mà còn để thực hiện những hành động trong giao tiếp.',
    [
      'Hiểu khái niệm hành động nói.',
      'Nhận biết các kiểu hành động nói thường gặp.',
      'Phân biệt cách thực hiện hành động nói trực tiếp và gián tiếp.',
      'Vận dụng vào việc phân tích và sử dụng ngôn ngữ trong giao tiếp.',
    ],
    [
      { h: 'Hành động nói là gì?' },
      { p: 'Hành động nói là hành động được thực hiện bằng lời nói nhằm một mục đích nhất định. Khi nói, ta không chỉ phát ra âm thanh mà còn thực hiện một việc gì đó: hỏi, hứa, ra lệnh, mời, cảm ơn, xin lỗi...' },
      { h: 'Các kiểu hành động nói thường gặp' },
      { ul: [
        'Hành động hỏi: "Bây giờ là mấy giờ rồi?"',
        'Hành động trình bày (báo tin, kể, nêu ý kiến, miêu tả...): "Tôi đã làm xong bài tập."',
        'Hành động điều khiển (cầu khiến, ra lệnh, đề nghị, khuyên...): "Hãy đóng cửa lại."',
        'Hành động hứa hẹn: "Tôi nhất định sẽ đến đúng giờ."',
        'Hành động bộc lộ cảm xúc: "Tôi rất vui khi gặp lại bạn."',
      ] },
      { h: 'Cách thực hiện hành động nói' },
      { p: 'Mỗi hành động nói có thể được thực hiện bằng kiểu câu phù hợp với chức năng chính của nó.' },
      { ul: [
        'Cách trực tiếp: dùng kiểu câu đúng với chức năng — hỏi bằng câu nghi vấn, ra lệnh bằng câu cầu khiến...',
        'Cách gián tiếp: dùng kiểu câu này để thực hiện hành động vốn của kiểu câu khác — ví dụ dùng câu nghi vấn "Cậu đóng cửa giúp mình được không?" để thực hiện hành động điều khiển (đề nghị).',
      ] },
      { h: 'Ý nghĩa của cách nói gián tiếp' },
      { p: 'Cách thực hiện hành động nói gián tiếp thường làm cho lời nói tế nhị, lịch sự, mềm mại hơn. Ví dụ, thay vì ra lệnh thẳng "Im lặng!", ta nói "Các em có thể giữ trật tự được không?" — vừa đạt mục đích vừa lịch sự.' },
      { note: 'Để xác định hành động nói, cần dựa vào mục đích của lời nói trong ngữ cảnh cụ thể, chứ không chỉ dựa vào hình thức câu.' },
    ],
    [
      { q: 'Câu "Mai bảy giờ tôi sẽ đến đón bạn." thực hiện hành động nói gì?', a: 'Câu này thực hiện hành động nói hứa hẹn. Người nói cam kết với người nghe rằng mình sẽ thực hiện một việc trong tương lai (đến đón vào bảy giờ sáng mai). Về hình thức, đây là câu trần thuật, nhưng chức năng của nó là hứa hẹn — một hành động ràng buộc trách nhiệm của người nói.' },
      { q: 'Xác định hành động nói của câu: "Con hãy giúp mẹ rửa bát nhé!".', a: 'Câu này thực hiện hành động nói điều khiển (cụ thể là đề nghị, sai khiến một cách nhẹ nhàng). Người mẹ yêu cầu, nhờ con thực hiện một việc (rửa bát). Về hình thức, đây là câu cầu khiến (có từ "hãy", "nhé"), được dùng trực tiếp để thực hiện hành động điều khiển. Từ "nhé" làm cho lời đề nghị thêm thân mật, nhẹ nhàng.' },
      { q: 'So sánh hai cách nói sau và cho biết cách nào lịch sự hơn, vì sao: (1) "Tắt quạt đi!" (2) "Bạn tắt quạt giúp mình được không?".', a: 'Cả hai câu đều thực hiện cùng một hành động nói: điều khiển (đề nghị tắt quạt). Câu (1) "Tắt quạt đi!" là câu cầu khiến, thực hiện hành động điều khiển một cách trực tiếp — thẳng thắn nhưng có phần mệnh lệnh, kém tế nhị. Câu (2) "Bạn tắt quạt giúp mình được không?" là câu nghi vấn dùng để thực hiện hành động điều khiển một cách gián tiếp. Cách (2) lịch sự hơn vì nó diễn đạt lời đề nghị dưới hình thức một câu hỏi, tôn trọng sự lựa chọn của người nghe, khiến lời nói trở nên mềm mại, nhã nhặn và dễ được chấp nhận hơn.' },
    ]
  ),

  'S8NV-w31-quiz': L(
    'Hội thoại — Vai xã hội và lượt lời',
    'Giao tiếp hằng ngày của chúng ta phần lớn diễn ra qua hội thoại. Hiểu về vai xã hội và lượt lời sẽ giúp các em ứng xử lịch sự, đúng mực và hiệu quả hơn trong mọi cuộc trò chuyện.',
    [
      'Hiểu khái niệm vai xã hội trong hội thoại.',
      'Hiểu khái niệm lượt lời và quy tắc luân phiên lượt lời.',
      'Biết cách xác định và giữ đúng vai xã hội khi giao tiếp.',
      'Rèn thái độ lịch sự, tôn trọng người khác trong hội thoại.',
    ],
    [
      { h: 'Vai xã hội trong hội thoại' },
      { p: 'Vai xã hội là vị trí của người tham gia hội thoại đối với người khác trong cuộc thoại. Vai xã hội được xác định bằng các quan hệ xã hội: quan hệ trên – dưới hay ngang hàng (theo tuổi tác, thứ bậc trong gia đình và xã hội); quan hệ thân – sơ (theo mức độ quen biết, gần gũi).' },
      { h: 'Lưu ý về vai xã hội' },
      { ul: [
        'Quan hệ xã hội đa dạng nên vai xã hội của mỗi người cũng đa dạng, nhiều chiều.',
        'Khi giao tiếp, cần xác định đúng vai để chọn cách nói cho phù hợp.',
        'Ví dụ: cùng một người, ở nhà là con (vai dưới với cha mẹ), ở trường là học sinh (vai dưới với thầy cô), với em nhỏ lại là vai trên.',
      ] },
      { h: 'Lượt lời trong hội thoại' },
      { p: 'Trong hội thoại, ai cũng được nói. Mỗi lần có một người tham gia hội thoại nói được gọi là một lượt lời. Các lượt lời luân phiên nhau giữa những người tham gia.' },
      { h: 'Quy tắc giữ lượt lời lịch sự' },
      { ul: [
        'Tôn trọng lượt lời của người khác, không cướp lời, không nói chen vào.',
        'Tránh nói tranh, nói leo, nói át lời người đang nói.',
        'Khi im lặng đến lượt mình nói cũng là một cách biểu thị thái độ.',
        'Lắng nghe khi người khác nói, chờ đến lượt mình.',
      ] },
      { note: 'Giữ đúng vai xã hội và tôn trọng lượt lời là biểu hiện của người có văn hoá giao tiếp. Nói đúng vai, đúng lượt giúp cuộc hội thoại diễn ra suôn sẻ, lịch sự và hiệu quả.' },
    ],
    [
      { q: 'Vai xã hội được xác định dựa trên những quan hệ nào? Cho ví dụ.', a: 'Vai xã hội được xác định dựa trên hai loại quan hệ chính. Thứ nhất là quan hệ trên – dưới hoặc ngang hàng, xét theo tuổi tác và thứ bậc trong gia đình, xã hội. Ví dụ: trong gia đình, ông bà – cha mẹ – con cháu là quan hệ trên – dưới; anh chị em ruột là quan hệ ngang hàng. Thứ hai là quan hệ thân – sơ, xét theo mức độ quen biết, gần gũi. Ví dụ: với bạn thân thì thân, với người mới gặp thì sơ. Khi giao tiếp, ta phải xác định đúng các quan hệ này để xưng hô và nói năng cho phù hợp.' },
      { q: 'Nêu một số lỗi thường gặp khi không tôn trọng lượt lời trong hội thoại.', a: 'Một số lỗi thường gặp khi không tôn trọng lượt lời gồm: cướp lời (giành nói khi người khác chưa nói xong), nói tranh, nói leo (chen ngang vào câu chuyện của người lớn khi không được hỏi), nói át lời người khác (nói to để lấn lượt), không lắng nghe mà chỉ lo phần nói của mình. Những lỗi này đều thể hiện sự thiếu tôn trọng người đối thoại, làm cuộc hội thoại trở nên lộn xộn, kém hiệu quả và bị đánh giá là thiếu lịch sự, thiếu văn hoá.' },
      { q: 'Trong một cuộc họp lớp, em nên giữ lượt lời như thế nào cho đúng mực?', a: 'Trong một cuộc họp lớp, để giữ lượt lời đúng mực, em nên: phát biểu khi được mời hoặc khi đến lượt mình, giơ tay xin phép trước khi nói; không nói chen vào, không cắt lời bạn đang phát biểu; chú ý lắng nghe ý kiến của các bạn và của thầy cô; trình bày ý kiến của mình một cách rõ ràng, ngắn gọn, lịch sự; tôn trọng cả những ý kiến khác với mình. Ứng xử như vậy vừa thể hiện sự tôn trọng tập thể, vừa giúp cuộc họp diễn ra trật tự, hiệu quả.' },
    ]
  ),

  'S8NV-w32-quiz': L(
    'Văn nghị luận — Luận điểm, luận cứ, lập luận',
    'Lớp 8 là năm các em học sâu về văn nghị luận — kiểu văn dùng lí lẽ và dẫn chứng để thuyết phục người khác. Nắm vững luận điểm, luận cứ và lập luận là chìa khoá để viết được những bài nghị luận sắc bén.',
    [
      'Hiểu đặc điểm của văn nghị luận.',
      'Phân biệt rõ luận điểm, luận cứ và lập luận.',
      'Biết cách xây dựng và sắp xếp luận điểm trong bài văn.',
      'Bước đầu lập được dàn ý cho một bài văn nghị luận.',
    ],
    [
      { h: 'Văn nghị luận là gì?' },
      { p: 'Văn nghị luận là kiểu văn bản dùng lí lẽ và dẫn chứng để trình bày, bảo vệ một quan điểm, tư tưởng về một vấn đề trong đời sống hoặc văn học, nhằm thuyết phục người đọc, người nghe tin và làm theo. Có hai dạng chính: nghị luận xã hội và nghị luận văn học.' },
      { h: 'Luận điểm' },
      { p: 'Luận điểm là những tư tưởng, quan điểm chính mà người viết nêu ra trong bài. Luận điểm phải đúng đắn, rõ ràng, sáng tỏ và nhất quán. Một bài nghị luận thường có một luận điểm chính (luận đề) và các luận điểm phụ triển khai cho luận điểm chính.' },
      { h: 'Luận cứ' },
      { ul: [
        'Luận cứ là lí lẽ và dẫn chứng dùng để làm sáng tỏ, chứng minh cho luận điểm.',
        'Lí lẽ: những lập luận, phân tích, giải thích hợp lí, có sức thuyết phục.',
        'Dẫn chứng: những sự việc, số liệu, ví dụ cụ thể, xác thực, tiêu biểu.',
        'Luận cứ phải chân thực, đúng đắn và tiêu biểu thì luận điểm mới vững chắc.',
      ] },
      { h: 'Lập luận' },
      { p: 'Lập luận là cách nêu luận cứ để dẫn dắt người đọc đi đến luận điểm; là cách tổ chức, sắp xếp lí lẽ và dẫn chứng một cách hợp lí, chặt chẽ, logic. Lập luận tốt thì bài văn mới có sức thuyết phục.' },
      { h: 'Yêu cầu của một bài nghị luận hay' },
      { ul: [
        'Luận điểm rõ ràng, đúng đắn, mới mẻ.',
        'Luận cứ chân thực, tiêu biểu, đầy đủ.',
        'Lập luận chặt chẽ, mạch lạc, logic.',
        'Ngôn ngữ chính xác, trong sáng, giàu sức thuyết phục.',
      ] },
      { note: 'Mối quan hệ: luận điểm là "xương sống", luận cứ là "thịt và máu", còn lập luận là "cách sắp xếp, liên kết" để tạo nên một bài nghị luận hoàn chỉnh và thuyết phục.' },
    ],
    [
      { q: 'Phân biệt luận điểm và luận cứ trong văn nghị luận.', a: 'Luận điểm là tư tưởng, quan điểm chính mà người viết muốn khẳng định và muốn người đọc tin theo — đây là điều cần được chứng minh. Luận cứ là lí lẽ và dẫn chứng được người viết đưa ra để làm sáng tỏ, chứng minh cho luận điểm ấy. Nói cách khác, luận điểm trả lời câu hỏi "Khẳng định điều gì?", còn luận cứ trả lời câu hỏi "Vì sao lại khẳng định như vậy?" và "Lấy gì để chứng minh?". Một luận điểm cần được chống đỡ bởi các luận cứ chân thực, tiêu biểu thì mới đứng vững và thuyết phục.' },
      { q: 'Với đề bài "Học sinh nên đọc sách mỗi ngày", hãy xác định luận điểm chính và nêu hai luận cứ.', a: 'Luận điểm chính: "Học sinh nên đọc sách mỗi ngày." Hai luận cứ (lí lẽ kèm dẫn chứng): Luận cứ 1: Đọc sách giúp mở mang kiến thức, bồi dưỡng tâm hồn và rèn luyện tư duy ngôn ngữ — nhiều học sinh giỏi văn đều có thói quen đọc sách thường xuyên. Luận cứ 2: Đọc sách mỗi ngày giúp hình thành thói quen tốt, tránh xa những trò giải trí vô bổ trên mạng — thời gian đọc sách chính là thời gian tự học, tự bồi dưỡng mà không tốn kém. Hai luận cứ này làm sáng tỏ vì sao học sinh nên đọc sách hằng ngày.' },
      { q: 'Vì sao lập luận chặt chẽ lại quan trọng đối với một bài văn nghị luận?', a: 'Lập luận chặt chẽ rất quan trọng vì nó quyết định sức thuyết phục của bài nghị luận. Dù có luận điểm đúng và luận cứ hay đến đâu, nếu cách sắp xếp, liên kết lí lẽ và dẫn chứng lộn xộn, thiếu logic, rời rạc thì người đọc cũng không bị thuyết phục. Lập luận chặt chẽ giúp dẫn dắt người đọc đi từ luận cứ đến luận điểm một cách tự nhiên, hợp lí, khiến họ "tâm phục khẩu phục". Đó là sợi dây liên kết các thành phần của bài văn thành một khối thống nhất, mạch lạc, có sức nặng và độ tin cậy.' },
    ]
  ),

  'S8NV-w33-quiz': L(
    'Bàn luận về phép học — Nguyễn Thiếp',
    'Hơn hai thế kỉ trước, La Sơn Phu Tử Nguyễn Thiếp đã dâng vua những lời tâm huyết về việc học. "Bàn luận về phép học" nêu lên mục đích chân chính và phương pháp học đúng đắn — những điều vẫn còn nguyên giá trị đến hôm nay.',
    [
      'Hiểu hoàn cảnh ra đời và đặc điểm thể tấu.',
      'Nắm được quan điểm về mục đích và phương pháp học của Nguyễn Thiếp.',
      'Phân tích nghệ thuật lập luận chặt chẽ của văn bản.',
      'Liên hệ với việc học của bản thân hôm nay.',
    ],
    [
      { h: 'Tác giả và thể loại' },
      { p: 'Nguyễn Thiếp (1723–1804), thường được gọi là La Sơn Phu Tử, là người học rộng, đức cao, được vua Quang Trung tin dùng. "Bàn luận về phép học" (Luận học pháp) là phần trích từ bài tấu của ông gửi vua Quang Trung (1791). Tấu là loại văn thư của bề tôi trình lên vua để trình bày ý kiến, đề nghị.' },
      { h: 'Mục đích chân chính của việc học' },
      { ul: [
        'Tác giả mở đầu bằng câu châm ngôn: "Ngọc không mài, không thành đồ vật; người không học, không biết rõ đạo".',
        '"Đạo" ở đây là đạo lí làm người, là lẽ đối xử hằng ngày giữa mọi người.',
        'Học để biết và làm theo đạo lí, để trở thành người có ích — không phải để cầu danh lợi.',
      ] },
      { h: 'Phê phán lối học lệch lạc' },
      { p: 'Nguyễn Thiếp phê phán lối học hình thức, học thuộc lòng câu chữ mà không hiểu nội dung, học để cầu danh lợi (lối học "chuộng hình thức, hòng cầu danh lợi"). Lối học sai lầm ấy gây ra hậu quả nghiêm trọng: "chúa tầm thường, thần nịnh hót", nước mất nhà tan.' },
      { h: 'Phương pháp học đúng đắn' },
      { ul: [
        'Học phải theo trình tự từ thấp đến cao, từ dễ đến khó (học tiểu học để bồi lấy gốc, rồi tiến lên tứ thư, ngũ kinh, chư sử).',
        'Học rộng rồi tóm lược cho gọn, nắm lấy điều cốt yếu.',
        'Học phải đi đôi với hành — "theo điều học mà làm".',
      ] },
      { h: 'Tác dụng của phép học chân chính' },
      { p: 'Nếu việc học được tiến hành đúng đắn thì "người tốt nhiều", "triều đình ngay ngắn", "thiên hạ thịnh trị" — đất nước sẽ vững bền, phát triển. Đó là tầm nhìn xa của một bậc trí giả về vai trò của giáo dục đối với vận mệnh quốc gia.' },
      { note: 'Tư tưởng "học đi đôi với hành" của Nguyễn Thiếp là một quan điểm giáo dục tiến bộ, đúng đắn, đến nay vẫn là phương châm giáo dục quan trọng.' },
    ],
    [
      { q: 'Theo Nguyễn Thiếp, mục đích chân chính của việc học là gì?', a: 'Theo Nguyễn Thiếp, mục đích chân chính của việc học là để "biết rõ đạo" — tức là học để hiểu và làm theo đạo lí làm người, để biết cách đối nhân xử thế đúng đắn, để tu dưỡng nhân cách và trở thành người có ích cho gia đình, đất nước. Ông khẳng định điều này qua câu mở đầu giàu hình ảnh: "Ngọc không mài, không thành đồ vật; người không học, không biết rõ đạo." Học không phải để cầu danh lợi, để khoe khoang, mà để hoàn thiện bản thân và phụng sự xã hội. Đây là quan niệm học tập đúng đắn, nhân văn.' },
      { q: 'Nguyễn Thiếp đề xuất những phương pháp học nào? Phương pháp nào còn ý nghĩa với hôm nay?', a: 'Nguyễn Thiếp đề xuất các phương pháp học: học theo trình tự từ thấp đến cao, từ dễ đến khó, bồi đắp nền tảng vững chắc trước; học rộng nhưng phải biết tóm lược, nắm lấy điều cốt yếu; và đặc biệt là học phải đi đôi với hành — "theo điều học mà làm". Tất cả các phương pháp này đều còn nguyên ý nghĩa với việc học hôm nay, đặc biệt là tư tưởng "học đi đôi với hành". Học mà không thực hành thì kiến thức trở nên sách vở, vô dụng; chỉ khi vận dụng được điều đã học vào thực tế thì việc học mới thực sự có giá trị. Đây cũng chính là một trong những phương châm giáo dục cốt lõi của nền giáo dục hiện đại.' },
      { q: 'Văn bản có lập luận chặt chẽ như thế nào?', a: 'Văn bản lập luận rất chặt chẽ theo một trình tự logic: trước hết, tác giả nêu mục đích chân chính của việc học (học để biết đạo lí làm người); tiếp đó, phê phán những lối học lệch lạc, sai lầm (học hình thức, cầu danh lợi) cùng tác hại của chúng đối với đất nước; rồi đề xuất phương pháp học đúng đắn (học có trình tự, học rộng mà tóm gọn, học đi đôi với hành); cuối cùng khẳng định tác dụng tốt đẹp của việc học chân chính đối với cá nhân và xã hội (người tốt nhiều, triều đình ngay ngắn, thiên hạ thịnh trị). Cách lập luận đi từ mục đích → phê phán cái sai → nêu giải pháp đúng → khẳng định kết quả khiến văn bản mạch lạc, thuyết phục, thể hiện tầm tư tưởng sâu sắc của tác giả.' },
    ]
  ),

  'S8NV-w34-quiz': L(
    'Đi bộ ngao du — Ru-xô',
    'Khép lại chương trình với một áng văn nghị luận đặc sắc của phương Tây — "Đi bộ ngao du" trích từ "Ê-min hay Về giáo dục" của Ru-xô. Qua việc ca ngợi đi bộ, nhà tư tưởng lớn gửi gắm cả một quan niệm về tự do và giáo dục.',
    [
      'Hiểu nội dung đoạn trích và tư tưởng giáo dục của Ru-xô.',
      'Phân tích hệ thống luận điểm về lợi ích của đi bộ ngao du.',
      'Cảm nhận con người giản dị, yêu tự do, quý trọng thiên nhiên của tác giả.',
      'Thấy được nghệ thuật lập luận sinh động, kết hợp lí lẽ với trải nghiệm.',
    ],
    [
      { h: 'Tác giả Ru-xô' },
      { p: 'Giăng Giắc Ru-xô (1712–1778) là nhà văn, nhà triết học lớn của Pháp thời Khai sáng. Ông đề cao tự do, bình đẳng và quan niệm giáo dục tự nhiên. "Ê-min hay Về giáo dục" (1762) là thiên luận văn – tiểu thuyết trình bày quan điểm giáo dục con người qua nhân vật Ê-min.' },
      { h: 'Hệ thống luận điểm của đoạn trích' },
      { ul: [
        'Luận điểm 1: Đi bộ ngao du thì ta hoàn toàn được tự do, không lệ thuộc vào ai, vào điều gì (giờ giấc, đường đi, phương tiện).',
        'Luận điểm 2: Đi bộ ngao du thì ta được mở mang hiểu biết, trau dồi tri thức (quan sát thiên nhiên, sưu tầm, học hỏi thực tế).',
        'Luận điểm 3: Đi bộ ngao du có tác dụng tốt cho sức khoẻ và tinh thần (khoẻ khoắn, vui vẻ, ăn ngon, ngủ ngon).',
      ] },
      { h: 'Quan điểm giáo dục tự nhiên' },
      { p: 'Qua việc ca ngợi đi bộ, Ru-xô thể hiện tư tưởng giáo dục tự nhiên: con người, đặc biệt là trẻ em, cần được học hỏi qua trải nghiệm thực tế, qua quan sát thiên nhiên và cuộc sống, được tự do phát triển theo bản tính tự nhiên — chứ không phải bị nhồi nhét kiến thức sách vở khô khan, gò bó.' },
      { h: 'Hình ảnh tác giả qua đoạn trích' },
      { ul: [
        'Một con người giản dị, yêu tự do, không thích sự ràng buộc.',
        'Một tâm hồn yêu thiên nhiên, quý trọng những trải nghiệm thực tế.',
        'Một nhà tư tưởng đề cao việc học gắn với cuộc sống.',
      ] },
      { h: 'Nghệ thuật lập luận' },
      { p: 'Lập luận của Ru-xô sinh động, chặt chẽ: ông thường xen kẽ lí lẽ với trải nghiệm cá nhân, lúc dùng đại từ "ta" (khái quát), lúc dùng "tôi" (kinh nghiệm riêng), khiến lời văn vừa giàu sức thuyết phục vừa gần gũi, chân thực. Các luận điểm được sắp xếp hợp lí, bổ sung cho nhau.' },
      { note: 'Tư tưởng giáo dục tự nhiên, đề cao trải nghiệm và tự do của Ru-xô có ảnh hưởng sâu rộng đến nền giáo dục hiện đại — nơi học sinh được khuyến khích học qua làm, qua trải nghiệm thực tế.' },
    ],
    [
      { q: 'Theo Ru-xô, đi bộ ngao du mang lại những lợi ích gì?', a: 'Theo Ru-xô, đi bộ ngao du mang lại ba lợi ích chính. Thứ nhất, đó là sự tự do tuyệt đối: người đi bộ được tuỳ thích chọn đường đi, dừng nghỉ, quan sát, không phụ thuộc vào ngựa xe, giờ giấc hay bất cứ ai. Thứ hai, đi bộ giúp mở mang hiểu biết, trau dồi tri thức: được trực tiếp quan sát thiên nhiên, đất đai, sản vật, được sưu tầm, học hỏi từ thực tế chứ không chỉ từ sách vở. Thứ ba, đi bộ tốt cho sức khoẻ và tinh thần: làm cơ thể khoẻ khoắn, tâm trạng vui vẻ, ăn ngon, ngủ ngon, tính khí trở nên vui vẻ, hoà nhã. Như vậy, đi bộ ngao du bồi dưỡng cả thể chất, trí tuệ lẫn tinh thần con người.' },
      { q: 'Đoạn trích thể hiện quan điểm giáo dục nào của Ru-xô?', a: 'Đoạn trích thể hiện quan điểm giáo dục tự nhiên của Ru-xô. Theo ông, con người — đặc biệt là trẻ em — cần được giáo dục bằng cách cho tiếp xúc, trải nghiệm trực tiếp với thiên nhiên và cuộc sống, được tự do quan sát, khám phá và học hỏi từ thực tế, được phát triển theo đúng bản tính tự nhiên của mình. Ông đề cao việc "học đi đôi với hành", học qua trải nghiệm chứ không phải lối giáo dục nhồi nhét kiến thức sách vở một cách thụ động, gò bó. Hình ảnh đi bộ ngao du tự do, vừa đi vừa quan sát, học hỏi chính là minh hoạ sinh động cho tư tưởng giáo dục tiến bộ ấy.' },
      { q: 'Qua đoạn trích, em hình dung tác giả Ru-xô là người như thế nào?', a: 'Qua đoạn trích, ta hình dung Ru-xô là một con người giản dị, phóng khoáng và yêu tự do tha thiết — ông ghét sự lệ thuộc, ràng buộc, thích được tự mình quyết định mọi việc. Ông cũng là người yêu thiên nhiên, quý trọng những trải nghiệm thực tế và việc học hỏi từ cuộc sống. Hơn nữa, ông là một nhà tư tưởng sâu sắc, có quan điểm giáo dục tiến bộ, đề cao sự phát triển tự nhiên và tự do của con người. Cách ông xen kẽ lí lẽ với những trải nghiệm, cảm xúc cá nhân cho thấy một tâm hồn chân thành, gần gũi, vừa giàu trí tuệ vừa giàu tình cảm.' },
    ]
  ),

  'S8NV-w35-quiz': L(
    'Ôn tập cuối năm',
    'Một năm học Ngữ văn 8 sắp khép lại với biết bao tác phẩm và kiến thức. Tuần cuối này, cô trò mình cùng hệ thống toàn bộ chương trình để các em tự tin bước vào kì kiểm tra cuối năm và mang theo những giá trị đẹp đẽ đã học.',
    [
      'Hệ thống hoá toàn bộ các văn bản đã học trong năm theo cụm thể loại.',
      'Củng cố kiến thức Tiếng Việt cả năm.',
      'Ôn tập kĩ năng làm văn thuyết minh và nghị luận.',
      'Rèn kĩ năng tổng hợp, vận dụng cho bài kiểm tra cuối năm.',
    ],
    [
      { h: 'Truyện kí Việt Nam và văn học nước ngoài (HK I)' },
      { ul: [
        'Truyện kí Việt Nam: Tôi đi học, Trong lòng mẹ, Tức nước vỡ bờ, Lão Hạc — hiện thực và nhân đạo.',
        'Văn học nước ngoài: Cô bé bán diêm, Đánh nhau với cối xay gió, Chiếc lá cuối cùng, Hai cây phong.',
        'Văn bản nhật dụng: Ôn dịch, thuốc lá.',
      ] },
      { h: 'Thơ mới và thơ cách mạng (HK II)' },
      { ul: [
        'Thơ mới: Nhớ rừng (Thế Lữ), Quê hương (Tế Hanh) — khát vọng tự do, tình yêu quê hương.',
        'Thơ Tố Hữu: Khi con tu hú — khát vọng tự do của người chiến sĩ.',
        'Thơ Hồ Chí Minh: Tức cảnh Pác Bó, Ngắm trăng, Đi đường — tinh thần lạc quan, bản lĩnh cách mạng.',
      ] },
      { h: 'Văn nghị luận trung đại và nước ngoài (HK II)' },
      { ul: [
        'Nghị luận trung đại: Chiếu dời đô (Lí Công Uẩn), Hịch tướng sĩ (Trần Quốc Tuấn), Bàn luận về phép học (Nguyễn Thiếp).',
        'Nghị luận nước ngoài: Đi bộ ngao du (Ru-xô).',
        'Đặc điểm chung: lập luận chặt chẽ, kết hợp lí và tình, thấm đượm lòng yêu nước và tư tưởng tiến bộ.',
      ] },
      { h: 'Kiến thức Tiếng Việt cả năm' },
      { ul: [
        'Các lớp từ: trường từ vựng, từ tượng hình – tượng thanh.',
        'Các từ loại: trợ từ, thán từ, tình thái từ.',
        'Câu: câu ghép; các kiểu câu chia theo mục đích nói (nghi vấn, cầu khiến, cảm thán, trần thuật, phủ định).',
        'Hành động nói; hội thoại (vai xã hội, lượt lời); các dấu câu.',
      ] },
      { h: 'Tập làm văn' },
      { p: 'Trọng tâm: văn thuyết minh (HK I) và văn nghị luận (HK II — luận điểm, luận cứ, lập luận; cách trình bày một đoạn văn, một bài văn nghị luận).' },
      { note: 'Cách ôn hiệu quả: lập bảng hệ thống tác giả – tác phẩm – thể loại – nội dung – nghệ thuật; học mỗi đơn vị Tiếng Việt kèm một ví dụ; luyện viết đoạn văn thuyết minh và nghị luận theo các đề tiêu biểu.' },
    ],
    [
      { q: 'Kể tên các bài thơ của Hồ Chí Minh được học trong chương trình Ngữ văn 8 và nêu điểm chung về nội dung.', a: 'Các bài thơ của Hồ Chí Minh được học gồm: "Tức cảnh Pác Bó", "Ngắm trăng" (trích "Nhật kí trong tù") và "Đi đường" (trích "Nhật kí trong tù"). Điểm chung về nội dung: cả ba bài đều thể hiện vẻ đẹp tâm hồn của Bác — tinh thần lạc quan, phong thái ung dung, tự tại, tình yêu thiên nhiên sâu sắc và bản lĩnh kiên cường của người chiến sĩ cách mạng luôn vượt lên trên mọi hoàn cảnh gian khổ (sống thiếu thốn nơi hang Pác Bó, bị giam cầm trong tù ngục). Các bài thơ đều kết hợp hài hoà giữa màu sắc cổ điển và tinh thần hiện đại, giữa chất thép và chất tình.' },
      { q: 'Nêu đặc điểm chung của ba văn bản nghị luận trung đại đã học: "Chiếu dời đô", "Hịch tướng sĩ", "Bàn luận về phép học".', a: 'Ba văn bản nghị luận trung đại này có nhiều đặc điểm chung. Về nội dung: đều thể hiện tư tưởng lớn, lòng yêu nước, tinh thần trách nhiệm với vận mệnh dân tộc — "Chiếu dời đô" thể hiện khát vọng xây dựng đất nước hùng cường; "Hịch tướng sĩ" thể hiện lòng yêu nước, căm thù giặc và ý chí quyết chiến; "Bàn luận về phép học" thể hiện tư tưởng giáo dục tiến bộ vì sự thịnh trị của quốc gia. Về nghệ thuật: đều có lập luận chặt chẽ, dẫn chứng và lí lẽ thuyết phục, kết hợp hài hoà giữa lí trí và tình cảm; ngôn ngữ trang trọng, giàu sức biểu cảm; nhiều câu văn biền ngẫu cân đối. Chúng đều là những áng văn chính luận mẫu mực của văn học trung đại Việt Nam.' },
      { q: 'Trong chương trình Ngữ văn 8, em đã học những kiểu câu nào chia theo mục đích nói? Cho ví dụ mỗi loại.', a: 'Chia theo mục đích nói, em đã học năm kiểu câu. (1) Câu nghi vấn — để hỏi: "Bạn đã làm bài chưa?". (2) Câu cầu khiến — để yêu cầu, ra lệnh, khuyên bảo: "Em hãy giữ trật tự!". (3) Câu cảm thán — để bộc lộ cảm xúc: "Ôi, đẹp quá!". (4) Câu trần thuật — để kể, tả, thông báo, nhận định: "Hôm nay trời nắng đẹp." (5) Câu phủ định — để thông báo sự vắng mặt hoặc bác bỏ: "Tôi không đi học muộn." Mỗi kiểu câu có đặc điểm hình thức (từ ngữ, dấu câu) và chức năng riêng, nhưng trong giao tiếp thực tế, một kiểu câu cũng có thể được dùng để thực hiện chức năng của kiểu câu khác (cách dùng gián tiếp).' },
    ]
  ),

  'S8NV-w36-quiz': L(
    'Kết thúc Ngữ Văn 8 — Ngôn ngữ và tâm hồn bước vào lớp 9',
    'Năm lớp 8 đã đưa các em đến với những áng thơ chứa chan tình cảm, những áng văn nghị luận hào hùng, những trang truyện đặc sắc và kho tiếng Việt phong phú. Tuần này, hãy nhìn lại hành trình đó, ghi nhớ những điểm tựa quan trọng để tự tin bước vào Ngữ Văn lớp 9 — nơi chờ đón em những tác phẩm lớn hơn và những bài nghị luận sâu sắc hơn.',
    [
      'Hệ thống hoá văn học lớp 8 theo ba thể loại: thơ, truyện, văn nghị luận.',
      'Nắm vững kiến thức Tiếng Việt trọng tâm: câu ghép, các kiểu câu, hành động nói, hội thoại.',
      'Tự đánh giá kĩ năng tập làm văn (thuyết minh, nghị luận) và định hướng học lớp 9.',
    ],
    [
      { h: 'Văn học — Thơ' },
      { ul: [
        'Thơ Hồ Chí Minh: "Tức cảnh Pác Bó", "Ngắm trăng", "Đi đường" — tinh thần lạc quan, yêu thiên nhiên, bản lĩnh chiến sĩ.',
        'Thơ lãng mạn và thơ cách mạng HK I: "Nhớ rừng" (Thế Lữ), "Ông đồ" (Vũ Đình Liên), "Quê hương" (Tế Hanh).',
        'Đặc điểm thể thơ tám chữ và thơ thất ngôn tứ tuyệt Đường luật.',
      ] },
      { h: 'Văn học — Truyện và kí' },
      { ul: [
        '"Trong lòng mẹ" (Nguyên Hồng) — hồi kí, tình mẫu tử thắm thiết.',
        '"Tức nước vỡ bờ" (Ngô Tất Tố), "Lão Hạc" (Nam Cao) — truyện hiện thực phê phán trước 1945.',
        'Truyện nước ngoài: "Cô bé bán diêm" (Andersen), "Đánh nhau với cối xay gió" (Cervantes), "Chiếc lá cuối cùng" (O. Henry).',
      ] },
      { h: 'Văn học — Nghị luận trung đại (văn xuôi chữ Hán/Nôm)' },
      { ul: [
        '"Chiếu dời đô" (Lý Công Uẩn): lập luận về sự cần thiết dời đô về Đại La, khát vọng xây dựng đất nước hùng cường.',
        '"Hịch tướng sĩ" (Trần Quốc Tuấn): lòng yêu nước, căm thù giặc, kêu gọi ý chí quyết tâm chống giặc.',
        '"Bàn luận về phép học" (Nguyễn Thiếp): tư tưởng giáo dục tiến bộ — học thực chất để phục vụ đất nước.',
        'Điểm chung: lập luận chặt chẽ, dẫn chứng thuyết phục, kết hợp lí trí và cảm xúc, ngôn ngữ trang trọng.',
      ] },
      { h: 'Tiếng Việt trọng tâm' },
      { ul: [
        'Từ vựng: trường từ vựng, từ tượng hình – tượng thanh.',
        'Từ loại: trợ từ, thán từ, tình thái từ.',
        'Câu ghép: cách nối (dùng từ nối, dùng dấu câu); quan hệ ý nghĩa (nhân quả, tương phản, điều kiện...).',
        'Năm kiểu câu chia theo mục đích nói: nghi vấn, cầu khiến, cảm thán, trần thuật, phủ định.',
        'Hành động nói; hội thoại (vai xã hội, lượt lời); các dấu câu nâng cao.',
      ] },
      { h: 'Tập làm văn' },
      { ul: [
        'Văn thuyết minh (HK I): phương pháp (nêu định nghĩa, số liệu, ví dụ, so sánh), cấu trúc bài thuyết minh về đồ vật/di tích/danh nhân.',
        'Văn nghị luận (HK II): luận điểm, luận cứ, lập luận; văn bản nghị luận về sự việc/hiện tượng và nghị luận về vấn đề tư tưởng đạo lí.',
        'Kĩ năng viết đoạn văn diễn dịch – quy nạp – tổng – phân – hợp.',
      ] },
      { h: 'Cầu nối sang lớp 9' },
      { ul: [
        'Truyện ngắn hiện đại Việt Nam: "Làng" (Kim Lân), "Chiếc lược ngà" (Nguyễn Quang Sáng), "Lặng lẽ Sa Pa" (Nguyễn Thành Long).',
        'Thơ hiện đại và thơ lãng mạn 1930–1945 đặc sắc hơn.',
        'Nghị luận xã hội (về hiện tượng đời sống) và nghị luận văn học (phân tích nhân vật, đoạn thơ) ở mức độ sâu sắc hơn.',
        'Tiếng Việt: khởi ngữ, thành phần biệt lập, liên kết câu trong đoạn và bài.',
      ] },
      { note: 'Cách ôn hiệu quả: lập bảng tổng hợp theo cột Tác giả – Tác phẩm – Thể loại – Nội dung – Nghệ thuật; luyện đề văn hằng ngày; đọc to và ghi nhớ những câu thơ, đoạn văn hay nhất của năm.' },
    ],
    [
      { q: 'Phân tích tâm trạng của nhân vật bé Hồng trong đoạn trích "Trong lòng mẹ" (Nguyên Hồng).', a: 'Bé Hồng trong đoạn trích thể hiện tâm trạng phức tạp và sâu sắc. Trước những lời nói cay độc của người cô về mẹ, Hồng vừa đau đớn, tủi cực, vừa căm tức "những cổ tục" đã áp bức mẹ mình. Em bướng bỉnh bảo vệ hình ảnh mẹ trong lòng, không để những lời độc ác làm lung lay tình yêu thiêng liêng đó. Khi gặp lại mẹ, Hồng trào dâng niềm hạnh phúc, sung sướng tột cùng — được ôm vào lòng mẹ là "thiên đường" của đứa trẻ khao khát tình mẫu tử. Nguyên Hồng đã thể hiện tình cảm chân thật, mãnh liệt qua ngòi bút đặm chất trữ tình.' },
      { q: 'Nêu chủ đề và nghệ thuật đặc sắc của truyện ngắn "Lão Hạc" (Nam Cao).', a: 'Chủ đề: tác phẩm phản ánh số phận bi thảm của người nông dân nghèo trước Cách mạng; đồng thời ngợi ca vẻ đẹp tâm hồn của họ — lòng tự trọng cao quý, tình phụ tử sâu nặng và ý thức giữ gìn danh dự đến hơi thở cuối cùng. Nghệ thuật: xây dựng nhân vật chân thực, tâm lí sâu sắc (lão Hạc, nhân vật "tôi"); đan xen ngôn ngữ người kể chuyện và ngôn ngữ nhân vật; kết thúc đột ngột gây xúc động mạnh; ngôn ngữ mộc mạc, giàu chất đời thường.' },
      { q: 'Hãy viết một đoạn văn ngắn (5–7 câu) nghị luận về ý kiến: "Đọc sách là hành trình làm giàu tâm hồn."', a: 'Đọc sách là một hành trình làm giàu tâm hồn không có điểm cuối. Qua từng trang sách, người đọc được sống nhiều cuộc đời, đặt chân đến những vùng đất xa lạ và hiểu thêm về bản chất con người. Sách mang đến tri thức, mở rộng nhận thức và trau dồi ngôn ngữ — những điều không thể có được nếu chỉ dựa vào kinh nghiệm sống đơn thuần. Hơn thế, những tác phẩm văn học lớn còn bồi đắp cảm xúc, lòng trắc ẩn và trí tưởng tượng, giúp chúng ta sống nhân văn hơn. Vì vậy, dù thế giới số phát triển đến đâu, thói quen đọc sách vẫn là tài sản quý giá nhất mà mỗi người cần nuôi dưỡng suốt đời.' },
    ]
  ),
};
