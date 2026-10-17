// ============================================================
// Lớp 4 · KHOA HỌC — Lý thuyết + Ví dụ 35 tuần (GDPT 2018)
// Key TRÙNG id quiz: "P4KH-wNN-quiz".
// HK1 (1–18): Nước · Không khí · Ánh sáng · Nhiệt · Âm thanh.
// HK2 (19–35): Sự sống · Cơ thể người · Môi trường.
// ============================================================

export const P4KH_LESSONS = {
  'P4KH-w01-quiz': {
    topic: 'Nước — tính chất',
    intro: 'Chào các em lớp 4! Tuần đầu năm môn Khoa học, cô trò mình cùng khám phá NƯỚC — chất rất quen thuộc nhưng có nhiều điều thú vị nhé!',
    objectives: [
      'Nêu được các tính chất cơ bản của nước.',
      'Phân biệt nước với các chất khác qua quan sát.',
      'Hiểu vì sao nước rất quan trọng.',
    ],
    theory: [
      { h: 'Nước có gì đặc biệt?' },
      { ul: [
        'Trong suốt, không màu.',
        'Không mùi, không vị (nước tinh khiết).',
        'Không có hình dạng nhất định — đựng vào cốc thì có hình cốc, vào chai thì có hình chai.',
        'Chảy từ cao xuống thấp.',
        'Có thể hoà tan một số chất (muối, đường) nhưng không hoà tan dầu, sỏi.',
      ] },
      { h: 'Thí nghiệm nhỏ' },
      { p: 'Rót nước từ cốc sang chai — nước đổi hình dạng theo vật chứa. Cho thìa đường vào cốc nước, khuấy đều — đường biến mất. Cho dầu ăn vào nước — dầu nổi lên trên, không hoà tan.' },
      { note: 'Nước tinh khiết không màu, không mùi, không vị. Nếu nước có màu hoặc mùi lạ thì nước đã bị nhiễm bẩn.' },
    ],
    examples: [
      { q: 'Vì sao khi rót nước vào các vật chứa khác nhau, nước có hình dạng khác nhau?', a: 'Vì nước KHÔNG có hình dạng cố định — nó lấy hình dạng theo vật chứa.' },
      { q: 'Cho muối vào nước rồi khuấy đều, muối biến đi đâu?', a: 'Muối đã HOÀ TAN trong nước. Nếm thấy nước có vị mặn — muối vẫn còn trong nước.' },
    ],
  },

  'P4KH-w02-quiz': {
    topic: 'Ba thể của nước',
    intro: 'Các em ơi, nước có thể tồn tại ở 3 thể khác nhau: rắn, lỏng và khí. Cùng tìm hiểu nhé!',
    objectives: [
      'Kể được 3 thể của nước.',
      'Hiểu sự chuyển thể: nóng chảy, đông đặc, bay hơi, ngưng tụ.',
      'Liên hệ ví dụ trong đời sống.',
    ],
    theory: [
      { h: '3 thể của nước' },
      { ul: [
        'Thể RẮN: nước đá, băng tuyết.',
        'Thể LỎNG: nước ta dùng hàng ngày.',
        'Thể KHÍ: hơi nước (mắt thường khó thấy).',
      ] },
      { h: 'Chuyển thể' },
      { ul: [
        'Đông đặc: lỏng → rắn (cho nước vào ngăn đá tủ lạnh).',
        'Nóng chảy: rắn → lỏng (đá tan thành nước).',
        'Bay hơi: lỏng → khí (phơi quần áo, nước bay hơi).',
        'Ngưng tụ: khí → lỏng (giọt nước đọng trên nắp nồi).',
      ] },
      { h: 'Thí nghiệm minh hoạ' },
      { p: 'Đun một cốc nước trên bếp — hơi nước bay lên. Úp đĩa lạnh lên trên — hơi nước gặp đĩa lạnh sẽ ngưng tụ lại thành những giọt nước.' },
      { note: 'Nước đông đặc ở 0°C và sôi ở 100°C.' },
    ],
    examples: [
      { q: 'Sau khi phơi quần áo ướt, sau một thời gian quần áo khô — nước đi đâu?', a: 'Nước đã BAY HƠI vào không khí (chuyển từ thể lỏng sang thể khí).' },
      { q: 'Giọt nước đọng dưới nắp nồi đang đun có từ đâu?', a: 'Hơi nước nóng bay lên, gặp nắp nồi LẠNH thì NGƯNG TỤ thành giọt nước.' },
    ],
  },

  'P4KH-w03-quiz': {
    topic: 'Vòng tuần hoàn của nước',
    intro: 'Các em ơi, nước trong tự nhiên không bao giờ mất đi — nó đi vòng quanh Trái Đất theo một chu trình kì diệu. Cùng tìm hiểu nhé!',
    objectives: [
      'Mô tả được vòng tuần hoàn của nước.',
      'Hiểu vai trò Mặt Trời và mây trong chu trình.',
      'Vẽ sơ đồ đơn giản.',
    ],
    theory: [
      { h: 'Vòng tuần hoàn' },
      { ul: [
        'Mặt Trời chiếu nóng → nước ở biển, sông, hồ BAY HƠI lên cao.',
        'Hơi nước gặp khí lạnh trên cao → NGƯNG TỤ thành mây.',
        'Mây nặng → MƯA rơi xuống đất.',
        'Nước mưa chảy ra sông, hồ, ngấm vào đất → trở về biển.',
      ] },
      { h: 'Vai trò Mặt Trời' },
      { p: 'Mặt Trời là "động cơ" của vòng tuần hoàn — không có nhiệt từ Mặt Trời thì nước không bay hơi được.' },
      { note: 'Nhờ vòng tuần hoàn, lượng nước trên Trái Đất gần như không đổi qua hàng triệu năm.' },
    ],
    examples: [
      { q: 'Vì sao có mưa?', a: 'Vì hơi nước bay lên cao, gặp lạnh → ngưng tụ thành mây → mây nặng → tạo thành những giọt nước rơi xuống = mưa.' },
      { q: 'Nếu không có Mặt Trời, vòng tuần hoàn của nước có xảy ra không?', a: 'Không. Mặt Trời cung cấp nhiệt để nước bay hơi — bước đầu của vòng tuần hoàn.' },
    ],
  },

  'P4KH-w04-quiz': {
    topic: 'Nước cần cho sự sống',
    intro: 'Tuần này các em tìm hiểu vì sao NƯỚC rất quan trọng với con người, động vật và thực vật nhé!',
    objectives: [
      'Hiểu vai trò của nước với sinh vật.',
      'Biết cách dùng nước tiết kiệm.',
      'Phân biệt nước sạch và nước bẩn.',
    ],
    theory: [
      { h: 'Vai trò của nước' },
      { ul: [
        'Con người: uống, nấu ăn, tắm rửa, giặt giũ. Cơ thể người chứa khoảng 70% là nước.',
        'Động vật: uống và sống trong nước (cá, tôm).',
        'Thực vật: rễ hút nước để cây phát triển.',
        'Sản xuất: tưới lúa, làm điện thuỷ điện, công nghiệp.',
      ] },
      { h: 'Tiết kiệm nước' },
      { ul: [
        'Khoá vòi khi đánh răng.',
        'Tận dụng nước rửa rau để tưới cây.',
        'Tắm vòi sen thay vì bồn (đỡ tốn).',
        'Báo người lớn khi thấy vòi rò rỉ.',
      ] },
      { note: 'Người có thể nhịn ăn vài ngày nhưng không thể nhịn uống nước quá 3 ngày.' },
    ],
    examples: [
      { q: 'Tại sao tưới cây phải dùng nước?', a: 'Vì rễ cây cần hút nước để vận chuyển chất dinh dưỡng nuôi cây. Không có nước, cây sẽ héo và chết.' },
      { q: 'Khi đánh răng, em nên làm gì để tiết kiệm nước?', a: 'KHOÁ VÒI khi đang chải răng, chỉ mở khi cần lấy nước súc miệng.' },
    ],
  },

  'P4KH-w05-quiz': {
    topic: 'Ô nhiễm nước & bảo vệ nguồn nước',
    intro: 'Các em ơi, nước rất quan trọng nhưng đang bị ô nhiễm ở nhiều nơi. Cùng tìm hiểu nguyên nhân và cách bảo vệ nhé!',
    objectives: [
      'Nhận biết nguyên nhân làm ô nhiễm nước.',
      'Tác hại của nước bẩn.',
      'Hành động bảo vệ nguồn nước.',
    ],
    theory: [
      { h: 'Nguyên nhân ô nhiễm' },
      { ul: [
        'Vứt rác xuống sông, hồ, kênh rạch.',
        'Nước thải sinh hoạt, nhà máy không xử lí.',
        'Phun thuốc trừ sâu, phân bón hoá học chảy xuống nguồn nước.',
        'Tràn dầu, hoá chất từ tàu thuyền.',
      ] },
      { h: 'Tác hại' },
      { p: 'Nước bẩn làm cá chết, người dùng phải nước ô nhiễm dễ mắc bệnh tiêu chảy, tả, đau bụng. Cây trồng tưới nước bẩn cũng có thể nhiễm độc.' },
      { h: 'Bảo vệ nguồn nước' },
      { ul: [
        'Không vứt rác xuống sông hồ.',
        'Dùng tiết kiệm, không gây lãng phí.',
        'Tham gia dọn dẹp kênh rạch ở khu phố.',
        'Báo người lớn nếu thấy ai xả thải trái phép.',
      ] },
      { note: 'Nước sạch là tài nguyên quý — không tự có vô hạn. Hành động nhỏ của em cũng giúp bảo vệ Trái Đất.' },
    ],
    examples: [
      { q: 'Vứt vỏ chai nhựa xuống sông gây ra hậu quả gì?', a: 'Làm sông bẩn, cá khó sống; nhựa rất khó phân huỷ (mất hàng trăm năm).' },
      { q: 'Em có thể làm gì để bảo vệ nguồn nước ở quê?', a: 'Không vứt rác xuống sông; nhắc người thân không phun thuốc sâu gần ao; tiết kiệm nước khi dùng.' },
    ],
  },

  'P4KH-w06-quiz': {
    topic: 'Không khí — tính chất',
    intro: 'Các em không nhìn thấy không khí nhưng nó luôn ở quanh ta. Tuần này mình khám phá tính chất của không khí nhé!',
    objectives: [
      'Nêu được các tính chất của không khí.',
      'Chứng minh không khí có thật bằng thí nghiệm.',
      'Hiểu không khí chiếm chỗ trong vật.',
    ],
    theory: [
      { h: 'Không khí có tính chất gì?' },
      { ul: [
        'Trong suốt, không màu, không mùi, không vị.',
        'Không có hình dạng nhất định — chiếm hình dạng của vật chứa.',
        'Có thể bị nén lại hoặc giãn ra.',
        'Có khắp nơi quanh ta.',
      ] },
      { h: 'Thí nghiệm chứng minh không khí có thật' },
      { ul: [
        'Bóp túi nilon rỗng — túi căng phồng. Đó là không khí.',
        'Nhúng cốc úp ngược vào chậu nước — nước không vào được vì không khí đang chiếm chỗ trong cốc.',
        'Nghiêng cốc cho không khí thoát ra (sủi bong bóng) — lúc đó nước mới vào được.',
      ] },
      { note: 'Bơm xe đạp ép không khí vào săm — chứng minh không khí có thể bị nén.' },
    ],
    examples: [
      { q: 'Tại sao khi bóp quả bóng đã thổi căng, ta thấy bóng vẫn đàn hồi?', a: 'Vì không khí bên trong bị NÉN lại; khi buông tay, nó giãn ra → bóng phồng trở lại.' },
      { q: 'Úp cốc rỗng xuống chậu nước, nước không tràn vào được — vì sao?', a: 'Vì trong cốc đã có KHÔNG KHÍ chiếm chỗ, không có chỗ cho nước.' },
    ],
  },

  'P4KH-w07-quiz': {
    topic: 'Thành phần không khí',
    intro: 'Không khí gồm những gì? Tuần này mình tìm hiểu các chất tạo nên không khí nhé các em!',
    objectives: [
      'Kể được thành phần chính của không khí.',
      'Hiểu vai trò khí ô-xy.',
      'Phân biệt khí ô-xy và khí các-bô-níc.',
    ],
    theory: [
      { h: 'Thành phần' },
      { ul: [
        'Khí Ni-tơ chiếm khoảng 78% — chất khí chính.',
        'Khí Ô-xy chiếm khoảng 21% — duy trì sự sống và sự cháy.',
        'Khí Các-bô-níc (CO₂), hơi nước, bụi… chiếm phần nhỏ còn lại.',
      ] },
      { h: 'Vai trò khí ô-xy' },
      { p: 'Con người, động vật, thực vật đều hít khí ô-xy để sống. Đám cháy cũng cần ô-xy để duy trì.' },
      { h: 'Thí nghiệm minh hoạ' },
      { p: 'Úp cốc thuỷ tinh lên ngọn nến đang cháy — sau một lúc nến tắt. Vì khí ô-xy trong cốc đã bị nến dùng hết, không còn để duy trì sự cháy.' },
      { note: 'Khi có nhiều người trong phòng kín → ô-xy giảm, CO₂ tăng → cảm thấy ngột ngạt. Cần mở cửa cho thoáng.' },
    ],
    examples: [
      { q: 'Vì sao úp cốc lên ngọn nến, nến tắt?', a: 'Vì hết khí ô-xy trong cốc — không còn chất duy trì sự cháy.' },
      { q: 'Trong không khí, chất khí nào duy trì sự sống?', a: 'Khí Ô-xy. Người và động vật hít ô-xy mỗi khi thở.' },
    ],
  },

  'P4KH-w08-quiz': {
    topic: 'Gió — không khí chuyển động',
    intro: 'Gió chính là không khí đang chuyển động đấy các em! Cùng tìm hiểu vì sao có gió nhé.',
    objectives: [
      'Hiểu gió là không khí chuyển động.',
      'Nguyên nhân gây ra gió.',
      'Phân biệt gió nhẹ, gió to, bão.',
    ],
    theory: [
      { h: 'Gió là gì?' },
      { p: 'Gió là KHÔNG KHÍ CHUYỂN ĐỘNG. Khi nơi nóng và nơi lạnh có sự chênh lệch, không khí sẽ di chuyển từ nơi lạnh đến nơi nóng → tạo ra gió.' },
      { h: 'Mức độ gió' },
      { ul: [
        'Gió nhẹ: lá cây hơi lay động.',
        'Gió vừa: cành cây đung đưa.',
        'Gió mạnh: cây nghiêng, thổi bay đồ.',
        'Bão: cây đổ, mái nhà tốc, nguy hiểm.',
      ] },
      { h: 'Thí nghiệm' },
      { p: 'Mở cửa sổ nơi nắng nóng (như phòng ngoài) và phòng có máy lạnh — sẽ cảm nhận luồng gió từ phòng lạnh đẩy ra. Hoặc giơ tay trước quạt — cảm nhận luồng không khí di chuyển.' },
      { note: 'Khi có dự báo bão, cần đóng kín cửa, không ra ngoài, nghe theo người lớn.' },
    ],
    examples: [
      { q: 'Vì sao quạt máy thổi gió mát?', a: 'Quạt làm KHÔNG KHÍ CHUYỂN ĐỘNG nhanh — chính là gió. Gió mang hơi nóng trên da đi → ta cảm thấy mát.' },
      { q: 'Khi có bão lớn, em nên làm gì?', a: 'Ở trong nhà, đóng kín cửa, không ra ngoài; nghe theo bố mẹ và người lớn.' },
    ],
  },

  'P4KH-w09-quiz': {
    topic: 'Bảo vệ bầu không khí',
    intro: 'Không khí sạch giúp ta khoẻ mạnh. Nhưng nhiều nơi không khí đang bị ô nhiễm — cùng tìm hiểu cách bảo vệ nhé!',
    objectives: [
      'Nguyên nhân làm bẩn không khí.',
      'Tác hại của khói bụi.',
      'Hành động bảo vệ không khí.',
    ],
    theory: [
      { h: 'Nguyên nhân' },
      { ul: [
        'Khói xe máy, ô tô.',
        'Khói nhà máy, đốt rác.',
        'Bụi từ công trường xây dựng.',
        'Khói thuốc lá.',
      ] },
      { h: 'Tác hại' },
      { p: 'Không khí bẩn gây ho, viêm họng, viêm phổi, hen suyễn. Lâu dài có thể gây bệnh nặng.' },
      { h: 'Em làm gì?' },
      { ul: [
        'Trồng cây xanh quanh nhà và trường.',
        'Đi bộ, đi xe đạp những quãng ngắn.',
        'Không đốt rác trong sân.',
        'Đeo khẩu trang khi đi đường nhiều xe.',
      ] },
      { note: 'Cây xanh "uống" khí CO₂ và nhả khí ô-xy — cây là máy lọc không khí tự nhiên.' },
    ],
    examples: [
      { q: 'Vì sao trồng nhiều cây xanh giúp không khí trong lành?', a: 'Cây hút khí CO₂ và nhả khí Ô-XY trong quá trình quang hợp → không khí thêm sạch và giàu ô-xy.' },
      { q: 'Trên đường nhiều khói bụi, em nên làm gì?', a: 'Đeo khẩu trang để bảo vệ mũi và phổi.' },
    ],
  },

  'P4KH-w10-quiz': {
    topic: 'Ánh sáng — nguồn sáng',
    intro: 'Các em ơi, nhờ có ánh sáng ta mới nhìn thấy mọi vật. Tuần này mình tìm hiểu về ánh sáng nhé!',
    objectives: [
      'Phân biệt nguồn sáng tự nhiên và nhân tạo.',
      'Hiểu vật phát sáng và vật được chiếu sáng.',
      'Hiểu ánh sáng truyền theo đường thẳng.',
    ],
    theory: [
      { h: 'Nguồn sáng' },
      { ul: [
        'Tự nhiên: Mặt Trời, các vì sao, đom đóm.',
        'Nhân tạo: đèn điện, đèn pin, nến, đèn dầu.',
      ] },
      { h: 'Vật được chiếu sáng' },
      { p: 'Mặt Trăng KHÔNG tự phát sáng — nó phản chiếu ánh sáng Mặt Trời. Các vật quanh ta (bàn, sách) cũng vậy — ta thấy được vì có ánh sáng chiếu vào và phản xạ tới mắt ta.' },
      { h: 'Đường truyền của ánh sáng' },
      { p: 'Ánh sáng truyền theo ĐƯỜNG THẲNG. Thí nghiệm: chiếu đèn pin qua 3 tấm bìa có lỗ thẳng hàng — ánh sáng đi qua được; nếu lệch lỗ thì không qua.' },
      { note: 'Mặt Trời là nguồn sáng quan trọng nhất với Trái Đất.' },
    ],
    examples: [
      { q: 'Mặt Trăng có phải nguồn sáng không?', a: 'Không. Mặt Trăng phản chiếu ánh sáng từ Mặt Trời — ta nhìn thấy Trăng sáng nhờ ánh sáng Mặt Trời.' },
      { q: 'Vì sao trong phòng tối, ta không nhìn thấy đồ vật?', a: 'Vì không có ánh sáng chiếu vào vật để phản xạ tới mắt ta.' },
    ],
  },

  'P4KH-w11-quiz': {
    topic: 'Bóng tối & vật cản sáng',
    intro: 'Tuần này các em học vì sao có bóng và phân biệt các loại vật cản sáng nhé!',
    objectives: [
      'Hiểu bóng tối hình thành khi nào.',
      'Phân biệt vật trong suốt, vật trong mờ, vật cản sáng.',
      'Quan sát bóng thay đổi theo nguồn sáng.',
    ],
    theory: [
      { h: 'Bóng tối là gì?' },
      { p: 'Khi ánh sáng bị một vật chặn lại, phía sau vật đó không có ánh sáng → tạo BÓNG TỐI.' },
      { h: 'Phân loại vật' },
      { ul: [
        'Vật TRONG SUỐT (kính, nước trong): ánh sáng đi qua hoàn toàn.',
        'Vật TRONG MỜ (giấy mỏng, tấm nhựa mờ): ánh sáng đi qua một phần.',
        'Vật CẢN SÁNG (gỗ, tường, người): ánh sáng không đi qua được → tạo bóng rõ.',
      ] },
      { h: 'Thí nghiệm bóng' },
      { p: 'Chiếu đèn pin vào tay đặt trước tường — bóng tay xuất hiện. Đèn càng gần tay → bóng càng to. Đèn càng xa → bóng càng nhỏ và rõ.' },
      { note: 'Vào trưa nắng, bóng người ngắn nhất vì Mặt Trời ở gần thẳng đỉnh đầu.' },
    ],
    examples: [
      { q: 'Kính cửa sổ có phải vật cản sáng không?', a: 'Không. Kính là vật TRONG SUỐT — ánh sáng đi qua được. Vì vậy ta nhìn xuyên qua kính được.' },
      { q: 'Vì sao bóng cây lúc sáng sớm thì dài, lúc trưa thì ngắn?', a: 'Vì Mặt Trời sáng sớm ở thấp → tia sáng nghiêng → bóng dài. Trưa Mặt Trời ở cao → tia thẳng đứng → bóng ngắn.' },
    ],
  },

  'P4KH-w12-quiz': {
    topic: 'Mắt nhìn thấy vật khi nào',
    intro: 'Các em ơi, vì sao có lúc mình nhìn thấy đồ vật, có lúc lại không? Hôm nay mình tìm hiểu nhé!',
    objectives: [
      'Hiểu điều kiện để mắt nhìn thấy vật.',
      'Phòng tránh tổn thương mắt.',
      'Bảo vệ mắt khi học, xem TV, dùng điện thoại.',
    ],
    theory: [
      { h: 'Khi nào mắt nhìn thấy vật?' },
      { p: 'Mắt nhìn thấy vật khi có ÁNH SÁNG TỪ VẬT TRUYỀN TỚI MẮT. Vật phát sáng (đèn) hoặc vật phản xạ ánh sáng (bàn, sách) đều có thể nhìn thấy nếu có đủ ánh sáng.' },
      { h: 'Thí nghiệm' },
      { p: 'Đặt một quyển sách trong phòng kín, tắt hết đèn — không nhìn thấy quyển sách. Mở đèn — ngay lập tức nhìn thấy. Vì có ánh sáng từ đèn chiếu vào sách rồi phản xạ tới mắt.' },
      { h: 'Bảo vệ mắt' },
      { ul: [
        'Học/đọc sách phải đủ ánh sáng (đèn bàn).',
        'Không xem TV/điện thoại trong phòng tối.',
        'Giữ mắt cách sách 25–30cm khi đọc.',
        'Không nhìn thẳng vào Mặt Trời.',
        'Nghỉ ngơi cho mắt sau mỗi 30 phút học.',
      ] },
      { note: 'Mắt là cửa sổ tâm hồn — bảo vệ mắt từ nhỏ để không bị cận thị.' },
    ],
    examples: [
      { q: 'Tại sao trong phòng kín tối om, ta không nhìn thấy bàn ghế?', a: 'Vì không có ánh sáng để phản xạ từ bàn ghế đến mắt ta.' },
      { q: 'Để bảo vệ mắt khi đọc sách, em cần làm gì?', a: 'Đọc nơi đủ sáng, giữ sách cách mắt 25–30cm, không đọc khi nằm hay khi đi tàu xe xóc.' },
    ],
  },

  'P4KH-w13-quiz': {
    topic: 'Nhiệt — vật nóng vật lạnh',
    intro: 'Các em ơi, có vật nóng, có vật lạnh. Tuần này mình tìm hiểu về NHIỆT và cách đo nhiệt nhé!',
    objectives: [
      'Phân biệt vật nóng, vật lạnh.',
      'Biết dùng nhiệt kế đo nhiệt độ.',
      'Đơn vị đo nhiệt độ: độ C (°C).',
    ],
    theory: [
      { h: 'Vật nóng — vật lạnh' },
      { ul: [
        'Vật nóng: nước sôi, lửa, mặt bếp đang nấu.',
        'Vật lạnh: nước đá, tủ lạnh, gió mùa đông.',
        'Vật ấm: nước ấm, da người (~37°C).',
      ] },
      { h: 'Đo nhiệt độ' },
      { p: 'Nhiệt độ được đo bằng NHIỆT KẾ. Đơn vị thông dụng là độ C (°C).' },
      { ul: [
        'Nước đá đang tan: 0°C',
        'Nước sôi: 100°C',
        'Cơ thể người bình thường: 36,5–37°C',
        'Nước tắm em bé: khoảng 37–38°C',
      ] },
      { note: 'Khi sốt: nhiệt độ cơ thể trên 37,5°C → cần nghỉ ngơi và báo người lớn.' },
    ],
    examples: [
      { q: 'Nước đá đang tan có nhiệt độ bao nhiêu?', a: '0°C (không độ C).' },
      { q: 'Vì sao khi em bị sốt, mẹ cặp nhiệt kế?', a: 'Để đo NHIỆT ĐỘ cơ thể — biết có sốt cao không, để chăm sóc hoặc cho uống thuốc đúng.' },
    ],
  },

  'P4KH-w14-quiz': {
    topic: 'Truyền nhiệt',
    intro: 'Tuần này mình tìm hiểu nhiệt truyền từ vật nóng sang vật lạnh như thế nào nhé các em!',
    objectives: [
      'Hiểu nguyên tắc truyền nhiệt.',
      'Phân biệt vật dẫn nhiệt tốt và kém.',
      'Ứng dụng trong đời sống.',
    ],
    theory: [
      { h: 'Nguyên tắc' },
      { p: 'Nhiệt truyền từ vật NÓNG hơn sang vật LẠNH hơn cho đến khi cùng nhiệt độ.' },
      { h: 'Vật dẫn nhiệt' },
      { ul: [
        'Dẫn nhiệt TỐT: kim loại (sắt, đồng, nhôm) — đáy nồi, đáy chảo thường làm bằng kim loại.',
        'Dẫn nhiệt KÉM (cách nhiệt): gỗ, nhựa, vải, không khí, len — tay cầm nồi thường bọc gỗ/nhựa.',
      ] },
      { h: 'Thí nghiệm' },
      { p: 'Cắm một thìa kim loại và một thìa nhựa vào cốc nước nóng. Sau vài phút, sờ thấy thìa kim loại nóng nhanh hơn, thìa nhựa vẫn lạnh. → kim loại dẫn nhiệt tốt hơn nhựa.' },
      { note: 'Mùa đông mặc áo len để giữ ấm — len dẫn nhiệt kém, giữ hơi ấm cơ thể không thoát ra.' },
    ],
    examples: [
      { q: 'Vì sao tay cầm nồi thường làm bằng gỗ hoặc nhựa?', a: 'Vì gỗ/nhựa DẪN NHIỆT KÉM → ít nóng → tay không bị bỏng khi cầm.' },
      { q: 'Mùa đông mặc áo len có tác dụng gì?', a: 'Áo len dẫn nhiệt KÉM → giữ hơi ấm cơ thể, không cho nhiệt thoát ra ngoài → ấm hơn.' },
    ],
  },

  'P4KH-w15-quiz': {
    topic: 'Nguồn nhiệt & an toàn',
    intro: 'Trong đời sống có nhiều nguồn nhiệt. Tuần này các em học cách dùng an toàn nhé!',
    objectives: [
      'Kể tên các nguồn nhiệt thường gặp.',
      'Hiểu vai trò của nguồn nhiệt.',
      'Quy tắc an toàn với lửa, điện, vật nóng.',
    ],
    theory: [
      { h: 'Nguồn nhiệt' },
      { ul: [
        'Mặt Trời — nguồn nhiệt lớn nhất.',
        'Lửa: bếp gas, bếp củi, nến, đèn dầu.',
        'Điện: bếp điện, bàn là, lò vi sóng.',
        'Cơ thể người (~37°C) cũng toả nhiệt.',
      ] },
      { h: 'Vai trò' },
      { p: 'Nguồn nhiệt giúp ta đun nấu, sưởi ấm, làm khô đồ ướt, sản xuất (sấy, hàn…).' },
      { h: 'An toàn với nguồn nhiệt' },
      { ul: [
        'Không tự ý bật bếp gas, bếp điện.',
        'Không sờ vào ấm nước nóng, nồi vừa nấu.',
        'Tránh đứng quá gần lửa, dầu mỡ.',
        'Khi cháy: hô to "Cháy!" và gọi 114 (cứu hoả).',
      ] },
      { note: 'Số 114 là số cứu hoả Việt Nam. Hãy nhớ kĩ.' },
    ],
    examples: [
      { q: 'Vì sao không được sờ tay vào nồi vừa mới nấu xong?', a: 'Vì nồi rất nóng — sờ vào sẽ bị BỎNG, rất đau và nguy hiểm.' },
      { q: 'Khi thấy nhà cháy, em làm gì?', a: 'Chạy ra ngoài an toàn, hô to "Cháy!" và gọi 114 báo cứu hoả.' },
    ],
  },

  'P4KH-w16-quiz': {
    topic: 'Âm thanh — nguồn âm',
    intro: 'Tuần này các em tìm hiểu vì sao có âm thanh và âm thanh truyền đi như thế nào nhé!',
    objectives: [
      'Hiểu âm thanh phát ra do vật rung động.',
      'Biết âm thanh truyền qua chất rắn, lỏng, khí.',
      'Phân biệt âm to – nhỏ, cao – thấp.',
    ],
    theory: [
      { h: 'Âm thanh sinh ra như thế nào?' },
      { p: 'Âm thanh phát ra khi vật RUNG ĐỘNG. Khi vật ngừng rung, âm thanh tắt.' },
      { h: 'Thí nghiệm' },
      { ul: [
        'Gõ trống — mặt trống rung, đặt nắm gạo lên thấy gạo nảy lên.',
        'Bật dây đàn guitar — dây rung, nghe được tiếng đàn.',
        'Đặt tay lên cổ khi nói — cảm nhận thanh quản rung.',
      ] },
      { h: 'Đường truyền' },
      { ul: [
        'Khí: tai ta nghe tiếng vì âm truyền qua không khí.',
        'Rắn: áp tai xuống bàn, gõ đầu bàn kia — nghe rõ hơn cả khi đứng nghe.',
        'Lỏng: cá nghe được dưới nước.',
      ] },
      { note: 'Trong CHÂN KHÔNG (không có không khí) thì âm thanh KHÔNG truyền được.' },
    ],
    examples: [
      { q: 'Vì sao khi ta gõ trống, nghe được tiếng?', a: 'Vì mặt trống RUNG ĐỘNG → tạo âm thanh truyền qua không khí đến tai ta.' },
      { q: 'Cá bơi dưới sông có nghe được âm thanh không?', a: 'Có. Âm thanh truyền được qua chất LỎNG (nước) đến tai cá.' },
    ],
  },

  'P4KH-w17-quiz': {
    topic: 'Bảo vệ tai & chống tiếng ồn',
    intro: 'Tai của em rất nhạy cảm. Cùng học cách bảo vệ tai và phòng tránh tiếng ồn nhé!',
    objectives: [
      'Hiểu tác hại của tiếng ồn.',
      'Biết cách bảo vệ tai.',
      'Nhận biết môi trường yên tĩnh và ồn ào.',
    ],
    theory: [
      { h: 'Tiếng ồn là gì?' },
      { p: 'Tiếng ồn là âm thanh TO, KHÓ CHỊU, không mong muốn. Ví dụ: tiếng còi xe inh ỏi, máy khoan, loa to quá mức.' },
      { h: 'Tác hại' },
      { ul: [
        'Đau đầu, mất ngủ.',
        'Khó tập trung học bài.',
        'Lâu dài có thể giảm thính lực, ù tai.',
      ] },
      { h: 'Bảo vệ tai' },
      { ul: [
        'Không nghe nhạc với loa/tai nghe quá to.',
        'Tránh xa nơi quá ồn (công trường, loa lớn).',
        'Không cho vật nhọn vào tai (que, tăm).',
        'Khi tắm tránh để nước vào tai.',
        'Đeo bịt tai khi đi qua nơi quá ồn.',
      ] },
      { note: 'Quy ước im lặng trong thư viện, bệnh viện, lớp học — vừa lịch sự vừa bảo vệ tai mọi người.' },
    ],
    examples: [
      { q: 'Nghe nhạc bằng tai nghe quá to, lâu ngày sẽ thế nào?', a: 'Có thể bị GIẢM THÍNH LỰC, ù tai, hỏng màng nhĩ.' },
      { q: 'Trong thư viện em cần làm gì?', a: 'Giữ IM LẶNG — không gây tiếng ồn để mọi người tập trung đọc sách.' },
    ],
  },

  'P4KH-w18-quiz': {
    topic: 'Ôn tập HK1',
    intro: 'Tuần cuối học kì 1! Cùng cô ôn lại các kiến thức về NƯỚC, KHÔNG KHÍ, ÁNH SÁNG, NHIỆT, ÂM THANH nhé!',
    objectives: [
      'Hệ thống kiến thức HK1.',
      'Vận dụng giải thích hiện tượng thực tế.',
      'Chuẩn bị làm bài kiểm tra cuối HK1.',
    ],
    theory: [
      { h: 'Nước' },
      { ul: [
        '3 thể: rắn, lỏng, khí.',
        'Vòng tuần hoàn: bay hơi → mây → mưa → sông biển.',
        'Tiết kiệm và bảo vệ nguồn nước.',
      ] },
      { h: 'Không khí' },
      { ul: [
        'Trong suốt, không màu mùi vị, có khắp nơi.',
        'Thành phần chính: Ni-tơ (78%) và Ô-xy (21%).',
        'Gió = không khí chuyển động.',
      ] },
      { h: 'Ánh sáng – nhiệt – âm thanh' },
      { ul: [
        'Ánh sáng truyền thẳng; bóng do vật cản sáng.',
        'Nhiệt truyền từ vật nóng → vật lạnh. Kim loại dẫn nhiệt tốt.',
        'Âm thanh do vật rung động; truyền qua khí, lỏng, rắn.',
      ] },
      { note: 'Đọc kĩ từng tuần, vẽ sơ đồ, nhớ thí nghiệm minh hoạ — bài thi sẽ làm tốt.' },
    ],
    examples: [
      { q: 'Khi đun nước sôi, có khói bốc lên từ ấm — đó là gì?', a: 'Đó là HƠI NƯỚC. Khi nước được đun nóng → bay hơi thành thể khí.' },
      { q: 'Vì sao mặc áo len mùa đông ấm hơn áo cotton?', a: 'Vì len DẪN NHIỆT KÉM hơn → giữ hơi ấm cơ thể tốt hơn.' },
    ],
  },

  'P4KH-w19-quiz': {
    topic: 'Thực vật cần gì để sống',
    intro: 'Học kì 2 bắt đầu! Tuần này các em khám phá thực vật cần những gì để sống và phát triển nhé.',
    objectives: [
      'Kể được các yếu tố cần cho cây sống.',
      'Hiểu vai trò ánh sáng, nước, đất, không khí.',
      'Thiết kế thí nghiệm đơn giản.',
    ],
    theory: [
      { h: 'Cây cần gì?' },
      { ul: [
        'Nước: rễ hút từ đất lên.',
        'Ánh sáng: lá hấp thụ để quang hợp.',
        'Không khí: lá lấy khí CO₂ và thải O₂.',
        'Chất khoáng: hoà tan trong đất.',
        'Nhiệt độ thích hợp: không quá nóng/lạnh.',
      ] },
      { h: 'Thí nghiệm cây cần ánh sáng' },
      { p: 'Trồng 2 cây giống nhau. Cây 1 đặt ngoài sáng, cây 2 đặt trong hộp kín tối. Sau 1 tuần: cây 1 xanh tốt; cây 2 vàng úa. Kết luận: cây cần ánh sáng.' },
      { note: 'Cây sống thiếu một yếu tố sẽ chậm lớn, vàng lá, có thể chết.' },
    ],
    examples: [
      { q: 'Vì sao cây trồng trong nhà tối lâu ngày bị vàng lá?', a: 'Vì thiếu ÁNH SÁNG → lá không quang hợp được → cây yếu, vàng.' },
      { q: 'Em quên tưới cây mấy ngày liền, cây héo — vì sao?', a: 'Vì thiếu NƯỚC. Cây mất nước qua lá nhanh, rễ không hút bù kịp → héo.' },
    ],
  },

  'P4KH-w20-quiz': {
    topic: 'Quang hợp cơ bản',
    intro: 'Tuần này các em học một quá trình rất kì diệu — QUANG HỢP, "nhà bếp" của cây xanh nhé!',
    objectives: [
      'Hiểu quang hợp là gì.',
      'Biết nguyên liệu và sản phẩm.',
      'Vai trò cây xanh với Trái Đất.',
    ],
    theory: [
      { h: 'Quang hợp là gì?' },
      { p: 'Quang hợp là quá trình cây dùng ÁNH SÁNG để tạo ra thức ăn cho mình.' },
      { h: 'Công thức đơn giản' },
      { p: 'Nước + khí Các-bô-níc (CO₂) + Ánh sáng → Thức ăn (đường) + khí Ô-xy (O₂).' },
      { ul: [
        'Nguyên liệu: nước (rễ hút), CO₂ (lá lấy từ không khí), ánh sáng Mặt Trời.',
        'Diễn ra ở: LÁ cây (lá có chất diệp lục màu xanh).',
        'Sản phẩm: thức ăn nuôi cây + khí Ô-xy thải ra.',
      ] },
      { note: 'Nhờ cây xanh thải ô-xy, con người và động vật mới có khí để thở. Bảo vệ rừng = bảo vệ sự sống.' },
    ],
    examples: [
      { q: 'Cây thải ra chất khí gì khi quang hợp?', a: 'Khí Ô-xy (O₂) — chất cần thiết cho hô hấp của người và động vật.' },
      { q: 'Vì sao cây xanh được gọi là "lá phổi" của Trái Đất?', a: 'Vì cây hút CO₂ và thải Ô-xy → làm sạch không khí, cung cấp khí thở cho mọi sinh vật.' },
    ],
  },

  'P4KH-w21-quiz': {
    topic: 'Động vật cần gì để sống',
    intro: 'Cũng như cây cối, động vật cần một số thứ để sống. Cùng cô tìm hiểu nhé các em!',
    objectives: [
      'Kể được các yếu tố cần cho động vật.',
      'Hiểu sự khác nhau giữa động vật và thực vật trong việc lấy thức ăn.',
      'Chăm sóc thú nuôi đúng cách.',
    ],
    theory: [
      { h: 'Động vật cần gì?' },
      { ul: [
        'Thức ăn: cỏ, lá, thịt, hạt… (tuỳ loài).',
        'Nước uống.',
        'Không khí (đa số hít khí ô-xy).',
        'Nơi ở: hang, tổ, chuồng…',
        'Nhiệt độ thích hợp.',
      ] },
      { h: 'Khác biệt với thực vật' },
      { p: 'Thực vật TỰ TẠO thức ăn nhờ quang hợp. Động vật KHÔNG tự tạo được — phải đi tìm thức ăn (cỏ, hạt, con vật khác).' },
      { h: 'Chăm sóc thú nuôi' },
      { ul: [
        'Cho ăn đủ, uống nước sạch.',
        'Dọn chuồng sạch sẽ.',
        'Vận động hằng ngày (chó cần dắt đi).',
        'Tiêm phòng theo lịch thú y.',
      ] },
      { note: 'Mỗi loài thú nuôi có nhu cầu khác nhau — tìm hiểu kĩ trước khi nuôi.' },
    ],
    examples: [
      { q: 'Vì sao cá phải sống trong nước?', a: 'Vì cá hít ô-xy hoà tan TRONG NƯỚC bằng MANG. Lên cạn thiếu nước, mang khô → cá chết.' },
      { q: 'Em nuôi mèo cần làm gì?', a: 'Cho ăn cơm hoặc đồ ăn mèo, cho uống nước sạch, dọn cát vệ sinh, đưa đi tiêm phòng định kì.' },
    ],
  },

  'P4KH-w22-quiz': {
    topic: 'Chuỗi thức ăn',
    intro: 'Tuần này các em học cách các sinh vật ĂN NHAU theo một chuỗi liên kết — gọi là CHUỖI THỨC ĂN nhé!',
    objectives: [
      'Hiểu chuỗi thức ăn là gì.',
      'Phân biệt sinh vật sản xuất, tiêu thụ.',
      'Vẽ được chuỗi thức ăn đơn giản.',
    ],
    theory: [
      { h: 'Chuỗi thức ăn' },
      { p: 'Là một dãy các sinh vật, trong đó sinh vật trước làm thức ăn cho sinh vật sau.' },
      { h: 'Phân loại' },
      { ul: [
        'Sinh vật SẢN XUẤT: thực vật (tự tạo thức ăn).',
        'Sinh vật TIÊU THỤ bậc 1: ăn thực vật (gà, thỏ, sâu).',
        'Sinh vật TIÊU THỤ bậc 2: ăn động vật ăn cỏ (rắn ăn chuột).',
        'Sinh vật TIÊU THỤ bậc 3: ăn động vật ăn thịt (đại bàng ăn rắn).',
      ] },
      { h: 'Ví dụ chuỗi' },
      { p: 'Cỏ → Bò → Người. Hoặc: Lúa → Chuột → Rắn → Đại bàng.' },
      { note: 'Mũi tên "→" trong chuỗi nghĩa là "BỊ ĂN BỞI". Cỏ "bị ăn bởi" bò; bò "bị ăn bởi" người.' },
    ],
    examples: [
      { q: 'Vẽ chuỗi thức ăn cho: cỏ, bò, người.', a: 'Cỏ → Bò → Người. (Cỏ là sản xuất; bò là tiêu thụ bậc 1; người là tiêu thụ bậc 2.)' },
      { q: 'Trong chuỗi "Lúa → Chuột → Rắn", chuột ăn gì?', a: 'Chuột ăn LÚA. (Còn rắn ăn chuột.)' },
    ],
  },

  'P4KH-w23-quiz': {
    topic: 'Con người — dinh dưỡng',
    intro: 'Các em ơi, cơ thể chúng ta cần ăn đa dạng nhiều loại thức ăn để khoẻ mạnh. Cùng tìm hiểu các nhóm chất dinh dưỡng nhé!',
    objectives: [
      'Kể được 4 nhóm chất dinh dưỡng chính.',
      'Biết nguồn thực phẩm của mỗi nhóm.',
      'Ăn cân đối các nhóm.',
    ],
    theory: [
      { h: '4 nhóm chất dinh dưỡng' },
      { ul: [
        'Chất BỘT ĐƯỜNG: gạo, mì, khoai, bánh mì → cung cấp NĂNG LƯỢNG chính.',
        'Chất ĐẠM: thịt, cá, trứng, sữa, đậu → giúp CƠ THỂ LỚN LÊN.',
        'Chất BÉO: dầu, mỡ, bơ → cung cấp năng lượng và giúp hấp thụ vitamin.',
        'VITAMIN và CHẤT KHOÁNG: rau xanh, trái cây → giúp cơ thể KHOẺ MẠNH.',
      ] },
      { h: 'Cân đối bữa ăn' },
      { p: 'Mỗi bữa nên có đủ 4 nhóm: cơm (bột đường) + thịt/cá (đạm) + canh rau (vitamin) + chút dầu mỡ (béo).' },
      { note: 'Uống đủ 1,5–2 lít nước mỗi ngày. Hạn chế bánh kẹo, nước ngọt.' },
    ],
    examples: [
      { q: 'Cơm cung cấp chủ yếu chất gì?', a: 'Chất BỘT ĐƯỜNG (tinh bột) — cho năng lượng để học và vui chơi.' },
      { q: 'Em chỉ thích ăn thịt, không ăn rau — có ổn không?', a: 'Không. Thiếu rau → thiếu vitamin và chất khoáng → dễ mệt, táo bón, da xấu. Cần ăn đủ 4 nhóm.' },
    ],
  },

  'P4KH-w24-quiz': {
    topic: 'Vitamin & chất khoáng',
    intro: 'Tuần này các em tìm hiểu sâu hơn về VITAMIN và CHẤT KHOÁNG — những "vệ sĩ" của cơ thể nhé!',
    objectives: [
      'Biết một số vitamin quan trọng.',
      'Nguồn thực phẩm giàu vitamin.',
      'Hiểu tác hại của thiếu vitamin.',
    ],
    theory: [
      { h: 'Một số vitamin' },
      { ul: [
        'Vitamin A: cà rốt, gấc, đu đủ → tốt cho MẮT.',
        'Vitamin C: cam, chanh, ổi → tăng SỨC ĐỀ KHÁNG, chống cảm cúm.',
        'Vitamin D: ánh nắng sớm, cá, trứng → tốt cho XƯƠNG.',
        'Vitamin nhóm B: gạo lứt, đậu → tốt cho thần kinh.',
      ] },
      { h: 'Chất khoáng' },
      { ul: [
        'Can-xi: sữa, tôm, cua → CHẮC XƯƠNG, RĂNG.',
        'Sắt: thịt đỏ, rau dền → tạo MÁU.',
        'I-ốt: muối i-ốt, hải sản → giúp trí não phát triển.',
      ] },
      { note: 'Tắm nắng sáng (trước 9h) 10–15 phút mỗi ngày để có vitamin D tự nhiên.' },
    ],
    examples: [
      { q: 'Ăn nhiều cà rốt tốt cho gì?', a: 'Tốt cho MẮT. Cà rốt giàu vitamin A — giúp mắt sáng, ít mỏi mắt.' },
      { q: 'Vì sao trẻ em uống sữa giúp cao lớn?', a: 'Vì sữa giàu CAN-XI — giúp xương phát triển, chắc khoẻ.' },
    ],
  },

  'P4KH-w25-quiz': {
    topic: 'An toàn thực phẩm',
    intro: 'Tuần này các em học cách chọn và bảo quản thực phẩm để không bị ngộ độc nhé!',
    objectives: [
      'Phân biệt thực phẩm tươi/ôi thiu.',
      'Biết cách bảo quản đơn giản.',
      'Phòng tránh ngộ độc thực phẩm.',
    ],
    theory: [
      { h: 'Thực phẩm sạch' },
      { ul: [
        'Rau xanh tươi, không úa vàng, không có mùi lạ.',
        'Thịt còn đỏ tươi, không có mùi hôi.',
        'Cá còn cứng, mang đỏ, mắt trong.',
        'Đồ hộp còn hạn sử dụng, vỏ không phồng/móp.',
      ] },
      { h: 'Bảo quản' },
      { ul: [
        'Rau tươi: bọc giấy, để ngăn mát tủ lạnh.',
        'Thịt cá: cho ngăn đá nếu chưa dùng ngay.',
        'Đồ ăn chín: đậy nắp, ăn trong ngày.',
      ] },
      { h: 'Phòng ngộ độc' },
      { ul: [
        'Rửa tay trước khi ăn.',
        'Rửa kĩ rau quả dưới vòi nước sạch.',
        'Không ăn đồ đã ôi, mốc, có mùi lạ.',
        'Ăn chín, uống sôi.',
      ] },
      { note: 'Nếu có dấu hiệu đau bụng, buồn nôn sau khi ăn → báo người lớn ngay.' },
    ],
    examples: [
      { q: 'Quả táo có vết thâm và mùi lạ, em có nên ăn không?', a: 'KHÔNG. Đó là dấu hiệu táo đã hỏng → có thể gây đau bụng, ngộ độc.' },
      { q: 'Trước khi ăn cơm cần làm gì để an toàn?', a: 'RỬA TAY bằng xà phòng để loại bỏ vi khuẩn.' },
    ],
  },

  'P4KH-w26-quiz': {
    topic: 'Phòng tránh bệnh',
    intro: 'Tuần này các em học cách phòng tránh một số bệnh thường gặp ở trẻ em nhé!',
    objectives: [
      'Nhận biết bệnh thường gặp.',
      'Hiểu nguyên nhân lây bệnh.',
      'Cách phòng tránh đơn giản.',
    ],
    theory: [
      { h: 'Bệnh thường gặp' },
      { ul: [
        'Cảm cúm: ho, sổ mũi, sốt.',
        'Tiêu chảy: đi ngoài lỏng nhiều lần.',
        'Sâu răng: răng đen, đau khi nhai.',
        'Đau mắt đỏ: mắt sưng đỏ, có ghèn.',
      ] },
      { h: 'Đường lây' },
      { ul: [
        'Qua không khí: hắt hơi, ho.',
        'Qua tay: chạm vật bẩn → đưa lên mũi miệng.',
        'Qua thức ăn nước uống bẩn.',
      ] },
      { h: 'Phòng tránh' },
      { ul: [
        'Rửa tay bằng xà phòng thường xuyên.',
        'Đeo khẩu trang nơi đông người, khi bị ho.',
        'Tiêm phòng vắc-xin đầy đủ.',
        'Đánh răng 2 lần/ngày.',
        'Khám sức khoẻ định kì.',
      ] },
      { note: 'Khi bị bệnh phải nghỉ học, đeo khẩu trang để không lây cho bạn.' },
    ],
    examples: [
      { q: 'Vì sao phải rửa tay trước khi ăn?', a: 'Vì tay chạm nhiều vật bẩn, có vi khuẩn → nếu không rửa, vi khuẩn theo thức ăn vào bụng gây bệnh.' },
      { q: 'Em bị cảm cúm, đi học có nên đeo khẩu trang không?', a: 'CÓ. Để không hắt hơi, ho lây vi-rút cho các bạn cùng lớp.' },
    ],
  },

  'P4KH-w27-quiz': {
    topic: 'Vận động & nghỉ ngơi',
    intro: 'Cơ thể khoẻ mạnh cần VẬN ĐỘNG và NGHỈ NGƠI hợp lí. Cùng tìm hiểu nhé các em!',
    objectives: [
      'Hiểu lợi ích của vận động.',
      'Biết thời lượng ngủ phù hợp lứa tuổi.',
      'Lên thời gian biểu sinh hoạt lành mạnh.',
    ],
    theory: [
      { h: 'Vận động' },
      { ul: [
        'Giúp cơ bắp khoẻ, xương chắc, cao lớn.',
        'Tăng tuần hoàn máu, tim khoẻ.',
        'Tinh thần vui, ăn ngon, ngủ ngon.',
        'Nên vận động ít nhất 60 phút/ngày: chạy, bơi, đạp xe, đá bóng…',
      ] },
      { h: 'Nghỉ ngơi và ngủ' },
      { ul: [
        'Trẻ em 9–11 tuổi nên ngủ 9–10 giờ/đêm.',
        'Ngủ giúp cơ thể phát triển và phục hồi.',
        'Tránh thức khuya — ngủ trước 22h.',
      ] },
      { h: 'Cân bằng' },
      { p: 'Học – chơi – nghỉ ngơi cần xen kẽ. Học liền 1 tiếng nên nghỉ 5–10 phút để mắt và não thư giãn.' },
      { note: 'Ngồi học/xem TV quá lâu không tốt cho cột sống và mắt — đứng lên đi lại sau mỗi 30–45 phút.' },
    ],
    examples: [
      { q: 'Trẻ lớp 4 nên ngủ bao nhiêu giờ mỗi đêm?', a: 'Khoảng 9–10 giờ/đêm để cơ thể phát triển tốt.' },
      { q: 'Em ngồi học liên tục 2 tiếng có nên không?', a: 'Không nên. Cần đứng lên đi lại 5–10 phút sau mỗi 30–45 phút học để mắt và lưng thư giãn.' },
    ],
  },

  'P4KH-w28-quiz': {
    topic: 'Tiêu hoá thức ăn',
    intro: 'Khi em ăn cơm, thức ăn đi đâu trong cơ thể? Tuần này mình tìm hiểu hệ tiêu hoá nhé!',
    objectives: [
      'Biết các bộ phận chính của hệ tiêu hoá.',
      'Hiểu quá trình tiêu hoá đơn giản.',
      'Bảo vệ hệ tiêu hoá.',
    ],
    theory: [
      { h: 'Đường đi của thức ăn' },
      { ul: [
        'Miệng: răng nhai, lưỡi trộn, nước bọt thấm.',
        'Thực quản: ống dẫn xuống dạ dày.',
        'Dạ dày: bóp – nghiền – trộn với dịch vị.',
        'Ruột non: hấp thụ chất dinh dưỡng vào máu.',
        'Ruột già: hấp thụ nước, tạo phân thải ra.',
      ] },
      { h: 'Bảo vệ hệ tiêu hoá' },
      { ul: [
        'Ăn chậm, nhai kĩ.',
        'Ăn đúng giờ, đủ bữa.',
        'Không ăn quá no/quá đói.',
        'Uống đủ nước, ăn rau xanh tránh táo bón.',
        'Không ăn đồ sống, ôi thiu.',
      ] },
      { note: 'Nhai kĩ giúp dạ dày làm việc nhẹ hơn — "ăn chậm nhai kĩ no lâu" mà.' },
    ],
    examples: [
      { q: 'Cơ quan nào hấp thụ chất dinh dưỡng vào máu?', a: 'RUỘT NON — nơi diễn ra hấp thụ chính các chất dinh dưỡng từ thức ăn vào máu.' },
      { q: 'Vì sao phải nhai kĩ thức ăn?', a: 'Để thức ăn được nghiền nhỏ + thấm nước bọt → dạ dày dễ tiêu hoá hơn, đỡ đau bụng.' },
    ],
  },

  'P4KH-w29-quiz': {
    topic: 'Hô hấp',
    intro: 'Mỗi giây em đều thở. Cùng tìm hiểu cơ quan hô hấp làm việc thế nào nhé các em!',
    objectives: [
      'Biết bộ phận của hệ hô hấp.',
      'Hiểu quá trình hít vào – thở ra.',
      'Bảo vệ phổi.',
    ],
    theory: [
      { h: 'Bộ phận hô hấp' },
      { ul: [
        'Mũi: lọc bụi, làm ấm không khí.',
        'Khí quản: ống dẫn không khí.',
        'Hai lá phổi: nơi trao đổi khí.',
      ] },
      { h: 'Quá trình' },
      { ul: [
        'HÍT vào: lấy khí Ô-xy vào phổi.',
        'Tại phổi: Ô-xy thấm vào máu; CO₂ từ máu vào phổi.',
        'THỞ ra: thải khí CO₂ ra ngoài.',
      ] },
      { h: 'Bảo vệ phổi' },
      { ul: [
        'Thở bằng MŨI, không thở bằng miệng (để mũi lọc bụi).',
        'Tránh xa khói thuốc lá, khói than.',
        'Đeo khẩu trang nơi nhiều bụi.',
        'Tập thể dục hằng ngày để phổi khoẻ.',
      ] },
      { note: 'Người lớn trung bình thở 12–20 nhịp/phút khi nghỉ. Khi chạy nhanh, nhịp thở tăng.' },
    ],
    examples: [
      { q: 'Vì sao nên thở bằng mũi thay vì bằng miệng?', a: 'Vì mũi có LÔNG MŨI và DỊCH NHẦY lọc bụi + làm ấm không khí trước khi vào phổi.' },
      { q: 'Khi chạy bộ, nhịp thở tăng hay giảm? Vì sao?', a: 'TĂNG. Vì cơ thể cần nhiều ô-xy hơn để cơ bắp hoạt động → phải thở nhanh hơn.' },
    ],
  },

  'P4KH-w30-quiz': {
    topic: 'Tuần hoàn — tim & máu',
    intro: 'Tim là động cơ bơm máu đi nuôi cả cơ thể. Tuần này mình tìm hiểu hệ tuần hoàn nhé!',
    objectives: [
      'Biết vị trí và vai trò của tim.',
      'Hiểu máu mang gì đi nuôi cơ thể.',
      'Cách bảo vệ tim mạch.',
    ],
    theory: [
      { h: 'Tim ở đâu?' },
      { p: 'Tim nằm trong lồng ngực, hơi lệch về bên TRÁI. Tim to khoảng bằng nắm tay của chính em.' },
      { h: 'Vai trò' },
      { ul: [
        'Tim BƠM MÁU đi khắp cơ thể qua mạch máu.',
        'Máu chở Ô-xy và chất dinh dưỡng đến các cơ quan.',
        'Máu chở CO₂ và chất thải ra để phổi và thận xử lí.',
      ] },
      { h: 'Bảo vệ tim mạch' },
      { ul: [
        'Tập thể dục đều đặn.',
        'Ăn ít đồ chiên rán, nhiều rau quả.',
        'Không hút thuốc, tránh khói thuốc.',
        'Ngủ đủ giấc, tránh căng thẳng.',
      ] },
      { note: 'Bắt mạch ở cổ tay: đếm số nhịp mạch trong 1 phút — đó chính là nhịp tim. Trẻ em ~70–100 lần/phút khi nghỉ.' },
    ],
    examples: [
      { q: 'Tim nằm bên trái hay bên phải lồng ngực?', a: 'Tim nằm trong lồng ngực, lệch về bên TRÁI.' },
      { q: 'Khi em chạy nhanh, tim đập nhanh hay chậm hơn? Vì sao?', a: 'NHANH HƠN. Vì cơ thể cần nhiều ô-xy hơn → tim phải bơm máu nhanh để chở ô-xy đến cơ bắp.' },
    ],
  },

  'P4KH-w31-quiz': {
    topic: 'Môi trường & rác thải',
    intro: 'Tuần này các em tìm hiểu về MÔI TRƯỜNG sống và vấn đề RÁC THẢI đang gây hại Trái Đất nhé!',
    objectives: [
      'Hiểu môi trường gồm những gì.',
      'Nguyên nhân ô nhiễm môi trường.',
      'Phân loại rác đơn giản.',
    ],
    theory: [
      { h: 'Môi trường' },
      { p: 'Môi trường là tất cả những gì xung quanh ta: không khí, nước, đất, cây cối, động vật, con người. Tất cả ảnh hưởng đến nhau.' },
      { h: 'Ô nhiễm môi trường' },
      { ul: [
        'Rác thải sinh hoạt vứt bừa bãi.',
        'Khói bụi nhà máy, xe cộ.',
        'Phun thuốc trừ sâu, hoá chất.',
        'Chặt phá rừng.',
      ] },
      { h: 'Phân loại rác' },
      { ul: [
        'Rác HỮU CƠ: vỏ trái cây, rau thừa, lá cây → ủ phân được.',
        'Rác TÁI CHẾ: giấy, vỏ chai nhựa, lon kim loại → đem bán/tái chế.',
        'Rác KHÔNG TÁI CHẾ: pin cũ, đồ nhựa hỏng → vứt thùng riêng.',
      ] },
      { note: 'Pin cũ chứa kim loại độc → KHÔNG vứt chung rác sinh hoạt, phải mang đến điểm thu pin riêng.' },
    ],
    examples: [
      { q: 'Vỏ chuối nên bỏ vào loại rác nào?', a: 'Rác HỮU CƠ — có thể ủ thành phân bón cây.' },
      { q: 'Pin AA cũ nên xử lí thế nào?', a: 'Mang đến điểm thu pin cũ; KHÔNG vứt chung rác thường vì pin chứa kim loại độc.' },
    ],
  },

  'P4KH-w32-quiz': {
    topic: 'Tái chế — 3R',
    intro: 'Tuần này các em học nguyên tắc 3R để giảm rác và bảo vệ môi trường nhé!',
    objectives: [
      'Hiểu nguyên tắc 3R.',
      'Áp dụng vào sinh hoạt hàng ngày.',
      'Có ý thức bảo vệ Trái Đất.',
    ],
    theory: [
      { h: '3R là gì?' },
      { ul: [
        'REDUCE = GIẢM dùng đồ dùng một lần.',
        'REUSE = TÁI SỬ DỤNG đồ còn dùng được.',
        'RECYCLE = TÁI CHẾ thành vật mới.',
      ] },
      { h: 'Ví dụ thực hành' },
      { ul: [
        'Giảm: dùng túi vải đi chợ thay túi nilon; mang bình nước riêng.',
        'Tái dùng: dùng giấy nháp cả 2 mặt; biến chai nhựa thành chậu cây.',
        'Tái chế: gom giấy, lon, chai bán ve chai.',
      ] },
      { h: 'Lợi ích' },
      { p: 'Bớt rác → bớt ô nhiễm. Tiết kiệm tài nguyên (cây, dầu, kim loại). Tiết kiệm tiền cho gia đình.' },
      { note: 'Một túi nilon mất 100–500 năm để phân huỷ. Hạn chế dùng từ hôm nay!' },
    ],
    examples: [
      { q: 'Vỏ chai nhựa cũ em có thể làm gì?', a: 'TÁI SỬ DỤNG làm chậu trồng cây nhỏ, ống đựng bút; hoặc TÁI CHẾ (bán ve chai).' },
      { q: 'Đi chợ với bố mẹ, em đề xuất gì để giảm rác nhựa?', a: 'Mang TÚI VẢI thay vì xin túi nilon. Mang HỘP NHỰA RIÊNG để đựng thịt cá.' },
    ],
  },

  'P4KH-w33-quiz': {
    topic: 'Tiết kiệm điện - nước',
    intro: 'Tuần này các em học cách tiết kiệm điện và nước trong gia đình nhé — tiết kiệm tiền và bảo vệ môi trường!',
    objectives: [
      'Hiểu vì sao phải tiết kiệm điện - nước.',
      'Hành động cụ thể tại nhà.',
      'Tuyên truyền cho bạn bè, người thân.',
    ],
    theory: [
      { h: 'Vì sao phải tiết kiệm?' },
      { ul: [
        'Điện được sản xuất từ than, khí, thuỷ điện — đều có giới hạn.',
        'Nước sạch ngày càng khan hiếm ở nhiều vùng.',
        'Tiết kiệm điện - nước = giảm hoá đơn và bảo vệ tài nguyên.',
      ] },
      { h: 'Tiết kiệm điện' },
      { ul: [
        'Tắt đèn, quạt khi ra khỏi phòng.',
        'Rút phích cắm tivi, sạc điện thoại khi không dùng.',
        'Dùng đèn LED tiết kiệm điện.',
        'Dùng điều hoà ở 26–28°C, không để quá lạnh.',
      ] },
      { h: 'Tiết kiệm nước' },
      { ul: [
        'Khoá vòi khi đánh răng, rửa mặt.',
        'Tắm vòi sen, không tắm bồn.',
        'Sửa ngay vòi rò rỉ.',
        'Hứng nước rửa rau để tưới cây.',
      ] },
      { note: 'Một vòi rò rỉ nhỏ giọt cả ngày có thể mất vài chục lít nước — sửa ngay đừng để!' },
    ],
    examples: [
      { q: 'Em ra khỏi phòng học mà quên tắt đèn quạt — có hại gì?', a: 'Lãng phí điện → tốn tiền, đốt thêm nhiên liệu để phát điện → ô nhiễm.' },
      { q: 'Cách dùng máy điều hoà tiết kiệm điện?', a: 'Đặt ở 26–28°C, đóng kín cửa khi bật, tắt khi không dùng, vệ sinh lưới lọc định kì.' },
    ],
  },

  'P4KH-w34-quiz': {
    topic: 'Bảo vệ động - thực vật quý',
    intro: 'Trên Trái Đất có nhiều loài động - thực vật quý hiếm đang có nguy cơ tuyệt chủng. Cùng tìm hiểu cách bảo vệ nhé!',
    objectives: [
      'Biết một số loài quý hiếm ở Việt Nam.',
      'Hiểu nguyên nhân nguy cơ tuyệt chủng.',
      'Hành động bảo vệ.',
    ],
    theory: [
      { h: 'Một số loài quý ở Việt Nam' },
      { ul: [
        'Động vật: Sao la, Voọc chà vá, Tê tê, Rùa biển, Voi.',
        'Thực vật: Sâm Ngọc Linh, Trầm hương, Lim, Pơ mu.',
      ] },
      { h: 'Vì sao đang giảm?' },
      { ul: [
        'Săn bắn trái phép để lấy thịt, lông, ngà, sừng.',
        'Chặt phá rừng → mất nơi ở.',
        'Ô nhiễm môi trường.',
        'Buôn bán động vật hoang dã.',
      ] },
      { h: 'Bảo vệ' },
      { ul: [
        'KHÔNG dùng sản phẩm từ động vật hoang dã.',
        'Bảo vệ rừng — không chặt cây bừa bãi.',
        'Trồng cây xanh.',
        'Tham gia tuyên truyền ở trường.',
      ] },
      { note: 'Sao la được phát hiện ở Việt Nam năm 1992, là một trong những loài thú quý hiếm nhất thế giới — gần như chỉ còn ở dãy Trường Sơn.' },
    ],
    examples: [
      { q: 'Vì sao tê tê đang nguy cấp?', a: 'Vì bị SĂN BẮT trái phép để lấy VẢY và THỊT bán. Mất môi trường rừng cũng làm chúng giảm.' },
      { q: 'Em có thể làm gì để bảo vệ động vật hoang dã?', a: 'Không mua đồ làm từ ngà, sừng, lông động vật; trồng cây; tuyên truyền cho bạn bè.' },
    ],
  },

  'P4KH-w35-quiz': {
    topic: 'Ôn tập cuối năm',
    intro: 'Tuần cuối cùng năm học rồi! Cùng cô ôn tổng hợp các kiến thức Khoa học lớp 4 nhé các em!',
    objectives: [
      'Hệ thống kiến thức HK2.',
      'Liên hệ và vận dụng vào đời sống.',
      'Chuẩn bị kiểm tra cuối năm.',
    ],
    theory: [
      { h: 'Sự sống — thực vật & động vật' },
      { ul: [
        'Cây cần: nước, ánh sáng, không khí, đất, nhiệt độ.',
        'Quang hợp: nước + CO₂ + ánh sáng → đường + O₂.',
        'Động vật cần: thức ăn, nước, không khí, nơi ở.',
        'Chuỗi thức ăn: Cỏ → Bò → Người.',
      ] },
      { h: 'Cơ thể người' },
      { ul: [
        '4 nhóm dinh dưỡng: bột đường, đạm, béo, vitamin-khoáng.',
        'Tiêu hoá: miệng → thực quản → dạ dày → ruột non → ruột già.',
        'Hô hấp: mũi → khí quản → phổi.',
        'Tuần hoàn: tim bơm máu đi khắp cơ thể.',
      ] },
      { h: 'Môi trường' },
      { ul: [
        '3R: Reduce — Reuse — Recycle.',
        'Tiết kiệm điện - nước.',
        'Bảo vệ động - thực vật quý.',
      ] },
      { note: 'Học Khoa học để hiểu và yêu thiên nhiên hơn — chúc các em hè vui và lên lớp 5 vững vàng!' },
    ],
    examples: [
      { q: 'Cây xanh trong quá trình quang hợp thải ra khí gì?', a: 'Khí Ô-XY (O₂) — chất con người và động vật cần để hít thở.' },
      { q: 'Liệt kê 3 việc em làm hằng ngày để bảo vệ môi trường:', a: 'Ví dụ: tắt đèn khi ra khỏi phòng; khoá vòi khi đánh răng; bỏ rác đúng nơi; dùng túi vải; trồng cây.' },
    ],
  },

  'P4KH-w36-quiz': {
    topic: 'Kết thúc Lớp 4 — Hành trang Khoa học vào Lớp 5',
    intro: 'Chúc mừng các em đã hoàn thành năm học Khoa học Lớp 4! Cô cùng trò ôn lại những khám phá thú vị trong năm và nhìn về thế giới khoa học rộng lớn chờ đón ở Lớp 5 nhé!',
    objectives: [
      'Hệ thống ba mảng Khoa học Lớp 4: vật chất, năng lượng, sinh vật – con người.',
      'Nắm chắc các khái niệm và hiện tượng tự nhiên đã học.',
      'Chuẩn bị tư duy tìm hiểu khoa học cho Lớp 5.',
    ],
    theory: [
      { h: 'Ba mảng lớn Khoa học Lớp 4' },
      { ul: [
        'Vật chất và vật liệu: nước (3 thể, vòng tuần hoàn, làm sạch nước); không khí (thành phần, tính chất, gió); âm thanh (nguồn âm, lan truyền, ứng dụng); ánh sáng (nguồn sáng, truyền thẳng, bóng tối); nhiệt (dẫn nhiệt, cách nhiệt, ứng dụng).',
        'Năng lượng và môi trường: các nguồn năng lượng (điện, gió, nước, Mặt Trời, nhiên liệu); tiết kiệm năng lượng; 3R (Reduce-Reuse-Recycle); bảo tồn thiên nhiên.',
        'Sinh vật và sức khoẻ: thực vật (quang hợp, sinh sản có hạt và không có hạt); động vật (phân loại theo xương sống, chuỗi thức ăn); cơ thể người (dinh dưỡng, tiêu hoá, hô hấp, tuần hoàn); phòng bệnh truyền nhiễm.',
      ] },
      { h: 'Khoa học Lớp 5 sẽ học gì?' },
      { ul: [
        'Hệ Mặt Trời và Trái Đất: Mặt Trăng, ngày đêm, mùa, nguyệt thực - nhật thực.',
        'Sự sinh sản của thực vật và động vật.',
        'Môi trường và tài nguyên thiên nhiên: đất, rừng, biển.',
        'Biến đổi khí hậu và bảo vệ môi trường toàn cầu.',
      ] },
      { h: 'Kế hoạch hè khoa học' },
      { ul: [
        'Quan sát thiên nhiên xung quanh: ghi nhật ký khám phá (thời tiết, cây cối, côn trùng).',
        'Thực hiện 1–2 thí nghiệm khoa học đơn giản tại nhà (trồng hạt đậu, làm pin chanh).',
        'Tìm hiểu câu hỏi: "Tại sao trời có sấm sét?" / "Vì sao mặt trời mọc đằng Đông?"',
      ] },
      { note: 'Khoa học là hành trình tìm kiếm "tại sao?" không bao giờ ngừng — hãy luôn tò mò!' },
    ],
    examples: [
      { q: 'Vòng tuần hoàn của nước gồm các giai đoạn nào?', a: 'Bay hơi (nước → hơi nước) → Ngưng tụ (hơi → mây) → Mưa (nước rơi xuống) → chảy vào sông/thấm vào đất → lại bay hơi.' },
      { q: 'Âm thanh không truyền được qua môi trường nào?', a: 'Chân không (không có không khí). Trong không gian vũ trụ không có âm thanh vì không có môi trường vật chất để truyền.' },
    ],
  },
};
