// ============================================================
// Lớp 9 · Công nghệ — Lý thuyết 35 tuần (chuẩn bị thi vào 10).
// Mạch nội dung: điện dân dụng → nông nghiệp → sửa xe đạp → nấu ăn → hướng nghiệp.
// Bám SGK Công nghệ 9 GDPT 2018 (KNTT/CTST/Cánh Diều) — các mô-đun:
//   Lắp đặt mạng điện trong nhà · Trồng cây ăn quả · Chế biến thực phẩm ·
//   Cắt may · Định hướng nghề nghiệp.
// Key trùng id quiz: "S9CN-wNN-quiz".
// ============================================================

const L = (topic, intro, objectives, theory, examples) => ({ topic, intro, objectives, theory, examples });

export const S9CN_LESSONS = {
  'S9CN-w01-quiz': L(
    'Giới thiệu nghề điện dân dụng',
    'Lớp 9 mở đầu với mô-đun "Lắp đặt mạng điện trong nhà" — kĩ năng nền tảng cho mọi gia đình hiện đại và là một hướng nghề nghiệp thiết thực mà chương trình Công nghệ 9 muốn các em được trải nghiệm.',
    ['Trình bày được vai trò, vị trí của nghề điện dân dụng trong sản xuất và đời sống.', 'Nêu được đặc điểm và yêu cầu của nghề.', 'Đánh giá được triển vọng nghề và liên hệ với bản thân.', 'Hình thành ý thức an toàn khi tiếp xúc với điện.'],
    [
      { h: 'Vị trí, vai trò của nghề điện dân dụng' },
      { p: 'Nghề điện dân dụng làm những công việc gắn liền với việc sử dụng điện năng phục vụ đời sống và sinh hoạt: lắp đặt mạng điện sản xuất nhỏ và mạng điện sinh hoạt, lắp đặt và bảo dưỡng các thiết bị, đồ dùng điện. Đây là một bộ phận quan trọng của ngành điện, gắn bó trực tiếp với từng gia đình, trường học, cơ quan.' },
      { h: 'Đối tượng và nội dung lao động' },
      { ul: ['Đối tượng: nguồn điện một chiều và xoay chiều điện áp thấp (dưới 380V); thiết bị bảo vệ, đóng cắt, lấy điện; vật liệu và dụng cụ làm việc của nghề; các đồ dùng điện trong gia đình.', 'Nội dung: lắp đặt mạng điện trong nhà; lắp đặt thiết bị và đồ dùng điện; vận hành, bảo dưỡng, sửa chữa mạng điện và thiết bị điện.'] },
      { h: 'Điều kiện làm việc' },
      { p: 'Người làm nghề điện dân dụng thường làm việc cả trong nhà lẫn ngoài trời, có khi phải đi lưu động, làm trên cao hoặc gần khu vực có điện áp nguy hiểm. Vì vậy nghề đòi hỏi tác phong cẩn thận, kỉ luật và tuân thủ nghiêm ngặt quy trình an toàn.' },
      { h: 'Yêu cầu của nghề đối với người lao động' },
      { ul: ['Về kiến thức: hiểu biết cơ bản về kĩ thuật điện, biết đọc sơ đồ mạng điện và an toàn điện.', 'Về kĩ năng: sử dụng thành thạo dụng cụ, lắp đặt và sửa chữa được những hư hỏng thông thường.', 'Về sức khoẻ: đủ sức khoẻ, không mắc bệnh tim mạch, huyết áp, thấp khớp nặng; mắt phân biệt màu tốt; không sợ độ cao.', 'Về thái độ: yêu nghề, cẩn thận, tỉ mỉ, kiên trì và có ý thức bảo vệ môi trường.'] },
      { h: 'Triển vọng của nghề' },
      { p: 'Nghề điện dân dụng luôn cần cho mọi gia đình. Cùng với điện khí hoá nông thôn, sự phát triển của nhà thông minh, điều hoà - điện lạnh và năng lượng mặt trời áp mái, nhu cầu thợ điện có tay nghề ngày càng tăng và thu nhập khá ổn định.' },
      { h: 'Nơi đào tạo và làm việc' },
      { ul: ['Đào tạo: các trường nghề, trung cấp - cao đẳng kĩ thuật, trung tâm dạy nghề, hoặc học việc tại các cơ sở.', 'Làm việc: công ty điện lực, doanh nghiệp lắp đặt điện, xưởng sửa chữa thiết bị điện, hoặc tự mở dịch vụ điện gia đình.'] },
      { note: 'An toàn điện luôn đặt lên trên hết — một sai sót nhỏ có thể nguy hiểm đến tính mạng. Người thợ điện giỏi trước hết phải là người làm việc an toàn.' },
    ],
    [
      { q: 'Vì sao thợ điện cần có sức khoẻ tốt và không sợ độ cao?', a: 'Vì công việc thường phải leo cột điện, thao tác trên thang, trên mái, kéo dây dài, mang vác vật liệu nặng. Người sợ độ cao dễ chóng mặt, mất tập trung — rất nguy hiểm khi đang làm việc gần điện.' },
      { q: 'Em đánh giá triển vọng nghề điện dân dụng hiện nay như thế nào?', a: 'Rất tốt. Nhà ở ngày càng nhiều thiết bị điện, điện mặt trời và nhà thông minh phát triển, nông thôn được điện khí hoá rộng khắp — nhu cầu thợ điện có tay nghề luôn cao, công việc ổn định và có thể tự khởi nghiệp dịch vụ.' },
      { q: 'Một bạn nói "nghề điện chỉ cần khoẻ tay là làm được". Em có đồng ý không?', a: 'Không đồng ý. Ngoài sức khoẻ, nghề điện đòi hỏi kiến thức về kĩ thuật điện, biết đọc sơ đồ, hiểu an toàn điện, tính cẩn thận và kỉ luật. Thiếu kiến thức và sự cẩn thận thì rất dễ gây tai nạn cho mình và người khác.' },
    ]
  ),

  'S9CN-w02-quiz': L(
    'Vật liệu điện dùng trong lắp đặt mạng điện trong nhà',
    'Tuần này các em làm quen với hai nhóm vật liệu cốt lõi của mạng điện trong nhà: dây dẫn điện và vật liệu cách điện — hiểu rõ chúng trước khi cầm tay vào lắp đặt.',
    ['Phân biệt được vật liệu dẫn điện, cách điện và dẫn từ.', 'Nhận biết cấu tạo và phân loại dây dẫn, dây cáp điện.', 'Biết đọc kí hiệu trên dây và chọn dây theo công suất phụ tải.'],
    [
      { h: 'Phân loại vật liệu điện' },
      { ul: ['Vật liệu dẫn điện: đồng, nhôm — làm lõi dây dẫn vì điện trở suất nhỏ.', 'Vật liệu cách điện: nhựa PVC, cao su, sứ, thuỷ tinh, mica — không cho dòng điện đi qua, dùng làm vỏ dây và phụ kiện.', 'Vật liệu dẫn từ: thép kĩ thuật điện — dùng làm lõi của máy biến áp, động cơ.'] },
      { h: 'Dây dẫn điện' },
      { p: 'Dây dẫn điện gồm phần lõi (đồng hoặc nhôm) dẫn điện và phần vỏ cách điện bảo vệ. Có nhiều cách phân loại: theo lớp vỏ (dây trần, dây có vỏ bọc cách điện); theo số lõi (một lõi, nhiều lõi); theo độ mềm (lõi cứng một sợi, lõi mềm nhiều sợi).' },
      { h: 'Dây cáp điện' },
      { p: 'Dây cáp điện gồm nhiều dây dẫn được bọc cách điện riêng và chung trong một lớp vỏ bảo vệ chắc chắn. Cáp thường dùng để dẫn điện từ mạng điện chung tới mạng điện trong nhà, hoặc cho những đoạn chịu tải lớn.' },
      { h: 'Vật liệu cách điện' },
      { ul: ['Phải có độ cách điện cao, chịu nhiệt tốt, chống ẩm và bền cơ học.', 'Dùng làm: vỏ dây, vỏ công tắc, ổ cắm, đui đèn, ống luồn dây, sứ cách điện trên cột.'] },
      { h: 'Chọn dây theo dòng điện và công suất' },
      { ul: ['Tiết diện lõi càng lớn thì khả năng chịu dòng càng cao.', 'Chọn dây nhỏ hơn yêu cầu → dây nóng, lão hoá nhanh, dễ chập cháy.', 'Mạng điện sinh hoạt thường dùng dây đồng 1,5–2,5 mm² cho mạch đèn và ổ cắm thường; mạch công suất lớn (điều hoà, bình nóng lạnh) dùng tiết diện lớn hơn.'] },
      { h: 'Đọc kí hiệu trên dây' },
      { p: 'Trên vỏ dây thường ghi rõ thông số kĩ thuật. Ví dụ "Cu/PVC 2×2,5mm²" nghĩa là: lõi đồng (Cu), vỏ cách điện PVC, gồm 2 lõi, mỗi lõi có tiết diện 2,5mm². Đọc đúng kí hiệu giúp chọn dây phù hợp và lắp đúng kĩ thuật.' },
      { note: 'Hãy luôn đọc thông số ghi trên dây trước khi mua và lắp đặt — chọn sai tiết diện là nguyên nhân hàng đầu của các vụ chập cháy điện trong nhà.' },
    ],
    [
      { q: 'Vì sao mạng điện trong nhà thường dùng dây lõi đồng mà ít dùng nhôm, dù nhôm rẻ hơn?', a: 'Đồng dẫn điện tốt hơn nhôm, dẻo và bền hơn khi uốn nhiều lần. Nhôm dễ gãy ở mối nối, lâu ngày bị oxi hoá làm mối nối phát nhiệt, dễ gây chập cháy. Vì vậy đồng an toàn và bền hơn cho mạng điện sinh hoạt.' },
      { q: 'Một bếp từ công suất 2000W dùng điện 220V. Em chọn dây tiết diện bao nhiêu?', a: 'Dòng điện I = P/U = 2000/220 ≈ 9A. Nên dùng dây đồng tiết diện 2,5mm² trở lên để đảm bảo dây không nóng và có dự phòng khi dùng lâu, an toàn cho mạch điện.' },
      { q: 'Phân biệt dây dẫn điện và dây cáp điện?', a: 'Dây dẫn điện thường gồm một hoặc vài lõi bọc cách điện, dùng đi trong mạng điện sinh hoạt. Dây cáp điện gồm nhiều dây dẫn bọc cách điện riêng rồi bọc chung lớp vỏ bảo vệ chắc chắn, dùng dẫn điện cho đoạn chịu tải lớn hoặc từ ngoài vào nhà.' },
    ]
  ),

  'S9CN-w03-quiz': L(
    'Dụng cụ dùng trong lắp đặt mạng điện',
    'Trước khi thực hành, các em cần nhận biết và sử dụng đúng dụng cụ cơ khí và dụng cụ đo lường — đây cũng là nội dung lý thuyết hay xuất hiện trong đề kiểm tra.',
    ['Phân loại được dụng cụ cơ khí và dụng cụ đo lường của nghề điện.', 'Nêu được công dụng từng dụng cụ.', 'Có ý thức sử dụng đúng cách và bảo quản dụng cụ.'],
    [
      { h: 'Vai trò của dụng cụ trong nghề điện' },
      { p: 'Dụng cụ là "đôi tay nối dài" của người thợ. Dùng đúng dụng cụ giúp thao tác nhanh, chính xác, an toàn; dùng sai hoặc dùng dụng cụ hỏng dễ gây tai nạn và làm hỏng thiết bị.' },
      { h: 'Dụng cụ cơ khí' },
      { ul: ['Kìm: kìm cắt dây, kìm tuốt dây, kìm mỏ nhọn, kìm điện (tay cầm bọc cách điện).', 'Tua vít: loại cạnh (dẹt), loại bake (4 cánh), loại có cách điện.', 'Búa, khoan, cưa sắt, dao tách vỏ, máy bắt vít.'] },
      { h: 'Dụng cụ đo lường và kiểm tra' },
      { ul: ['Bút thử điện: kiểm tra nhanh nơi có điện hay không.', 'Đồng hồ vạn năng (VOM): đo điện áp U, dòng điện I, điện trở R.', 'Ampe kìm: đo dòng điện mà không cần ngắt mạch.', 'Mê-gôm-mét: đo điện trở cách điện của dây và thiết bị.', 'Công tơ điện: đo điện năng tiêu thụ.'] },
      { h: 'Dụng cụ hỗ trợ và đo cơ khí' },
      { ul: ['Thước cuộn, thước kẹp: đo kích thước, tiết diện.', 'Mỏ hàn, thiếc hàn, nhựa thông: làm chắc mối nối quan trọng.', 'Băng cách điện, ống gen co nhiệt: bọc cách điện mối nối.'] },
      { h: 'Sử dụng dụng cụ đúng cách' },
      { ul: ['Dùng đúng loại cho đúng việc, không dùng tua vít thay đục, kìm thay búa.', 'Tay cầm dụng cụ phải khô và nguyên lớp cách điện.', 'Kiểm tra dụng cụ trước khi dùng, hỏng thì sửa hoặc thay.'] },
      { h: 'Bảo quản dụng cụ' },
      { p: 'Cất dụng cụ nơi khô ráo, sạch sẽ, có hộp riêng; lau sạch sau khi dùng; tra dầu chống gỉ cho phần kim loại; định kì kiểm tra lớp cách điện của kìm, tua vít, bút thử điện.' },
      { note: 'Tua vít hay kìm ghi "1000V" chỉ nói lớp cách điện chịu được áp đó — em vẫn phải cắt aptomat trước khi thao tác, tuyệt đối không tin tưởng tuyệt đối vào lớp cách điện.' },
    ],
    [
      { q: 'Bút thử điện sáng khi chạm vào vỏ kim loại của bếp điện. Điều đó có ý nghĩa gì và em phải làm gì?', a: 'Vỏ bếp đang bị rò điện — rất nguy hiểm. Em phải cắt aptomat ngay, không chạm vào bếp, rồi báo người lớn kiểm tra dây nối đất và cách điện của bếp trước khi sử dụng lại.' },
      { q: 'Vì sao không nên dùng kìm thường thay cho kìm điện khi thao tác với dây có điện?', a: 'Kìm thường không có lớp cách điện ở tay cầm. Khi chạm dây có điện rất dễ bị giật, nguy hiểm tính mạng. Kìm điện có tay cầm bọc cách điện nên an toàn hơn.' },
      { q: 'Hãy phân biệt nhóm dụng cụ cơ khí và nhóm dụng cụ đo lường, mỗi nhóm kể 3 dụng cụ.', a: 'Dụng cụ cơ khí dùng để gia công, lắp ráp: kìm, tua vít, búa. Dụng cụ đo lường dùng để kiểm tra, đo đại lượng điện: bút thử điện, đồng hồ vạn năng, ampe kìm.' },
    ]
  ),

  'S9CN-w04-quiz': L(
    'Đồng hồ vạn năng (VOM) — Sử dụng',
    'VOM là dụng cụ đo quan trọng nhất của người thợ điện. Tuần này các em học cách chọn thang đo và đo đúng từng đại lượng điện.',
    ['Nhận biết cấu tạo và các thang đo trên VOM.', 'Biết quy tắc đo điện áp, dòng điện, điện trở.', 'Tránh được các lỗi đo gây hỏng VOM hoặc gây nguy hiểm.'],
    [
      { h: 'Công dụng của VOM' },
      { p: 'Đồng hồ vạn năng (Volt-Ohm-Milliammeter) là dụng cụ đo nhiều đại lượng trong một thiết bị: điện áp, dòng điện, điện trở. Nhờ VOM, người thợ kiểm tra được nguồn điện, thông mạch, sự cố đứt - chập của mạng điện và thiết bị.' },
      { h: 'Cấu tạo cơ bản' },
      { p: 'VOM gồm núm xoay chọn thang đo, hai que đo (que đỏ cắm cực dương "+", que đen cắm cực âm "−" hoặc "COM") và mặt hiển thị. VOM số (digital) hiển thị trị số trực tiếp; VOM kim (analog) đọc theo vạch và phải nhân hệ số thang đo.' },
      { h: 'Các thang đo chính' },
      { ul: ['DCV / VDC: đo điện áp một chiều (pin, ắc-quy).', 'ACV / VAC: đo điện áp xoay chiều (ổ cắm 220V).', 'DCA / mA: đo dòng điện một chiều.', 'Ω: đo điện trở — phải ngắt nguồn của mạch cần đo.'] },
      { h: 'Quy tắc đo điện áp' },
      { ul: ['Mắc VOM song song với đoạn mạch cần đo.', 'Chọn thang đo lớn hơn giá trị dự đoán rồi giảm dần để đọc chính xác.', 'Đo điện áp xoay chiều phải để ở thang ACV.'] },
      { h: 'Quy tắc đo dòng điện' },
      { ul: ['Mắc VOM nối tiếp với phụ tải.', 'Chọn đúng thang đo dòng, nếu chưa biết thì chọn thang lớn nhất.', 'Cắm que đo đúng cổng dành cho đo dòng (thường có cổng riêng cho dòng lớn).'] },
      { h: 'Quy tắc đo điện trở' },
      { ul: ['Ngắt hoàn toàn nguồn điện của mạch cần đo.', 'Với VOM kim phải chập hai que, chỉnh kim về 0Ω trước khi đo.', 'Không chạm tay đồng thời vào hai que đo vì điện trở cơ thể làm sai số.'] },
      { h: 'Các lỗi thường gặp' },
      { p: 'Lỗi nguy hiểm nhất: để thang đo dòng hoặc thang đo điện trở mà lại cắm que vào nguồn điện áp → có thể cháy cầu chì hoặc hỏng VOM ngay lập tức. Vì vậy luôn kiểm tra thang đo trước khi chạm que.' },
      { note: 'Quy tắc nhớ: "Đo gì để thang đó, đo áp mắc song song, đo dòng mắc nối tiếp, đo trở phải ngắt nguồn".' },
    ],
    [
      { q: 'Em đo điện áp ổ cắm gia đình thì chọn thang đo nào và mắc que đo ra sao?', a: 'Chọn thang ACV ở mức 250V hoặc 500V (lớn hơn 220V). Mắc hai que đo song song, cắm vào hai lỗ của ổ cắm để đọc giá trị điện áp.' },
      { q: 'Vì sao khi đo điện trở phải ngắt nguồn của mạch?', a: 'Khi đo R, VOM tự cấp một nguồn nhỏ từ pin bên trong máy. Nếu mạch vẫn còn điện, điện áp ngoài sẽ làm kết quả sai và có thể làm hỏng VOM.' },
      { q: 'Bạn để VOM ở thang đo dòng rồi cắm thẳng vào ổ cắm 220V để "đo cho nhanh". Điều gì xảy ra?', a: 'Rất nguy hiểm. Ở thang đo dòng, điện trở trong của VOM rất nhỏ nên dòng qua máy tăng vọt, gây cháy cầu chì bảo vệ hoặc hỏng đồng hồ ngay, có thể phát tia lửa. Phải để thang ACV mới đo được điện áp.' },
    ]
  ),

  'S9CN-w05-quiz': L(
    'Nối dây dẫn điện',
    'Mối nối dây tưởng nhỏ nhưng quyết định an toàn của cả mạng điện. Tuần này các em học yêu cầu và các kiểu nối cơ bản trước khi thực hành.',
    ['Nêu được yêu cầu của một mối nối tốt.', 'Nhận biết các kiểu nối: nối thẳng, nối phân nhánh, nối dùng phụ kiện.', 'Biết quy trình nối và cách bọc cách điện mối nối.'],
    [
      { h: 'Vì sao mối nối quan trọng?' },
      { p: 'Mạng điện trong nhà có rất nhiều mối nối: nối dây với công tắc, ổ cắm, đui đèn, nối các đoạn dây với nhau. Mối nối kém là nguyên nhân chính gây phát nhiệt, sụt áp, chập cháy. Một mạng điện tốt bắt đầu từ những mối nối tốt.' },
      { h: 'Yêu cầu của mối nối' },
      { ul: ['Dẫn điện tốt: điện trở mối nối nhỏ, tiếp xúc chắc.', 'Có độ bền cơ học: không bị tuột khi kéo nhẹ.', 'An toàn điện: được cách điện kín, không lộ kim loại.', 'Mỹ thuật: gọn gàng, các vòng xoắn đều.'] },
      { h: 'Phân loại mối nối theo cấu trúc' },
      { ul: ['Nối thẳng (nối tiếp): hai đầu dây cùng phương nối với nhau.', 'Nối phân nhánh (nối rẽ T): từ một dây chính rẽ thêm một nhánh.', 'Nối ở hộp nối, đầu thiết bị: nối dây vào cọc đấu của công tắc, ổ cắm.'] },
      { h: 'Phân loại theo cách thực hiện' },
      { ul: ['Nối xoắn: xoắn các lõi dây vào nhau.', 'Nối hàn: xoắn rồi hàn thiếc cho chắc và dẫn điện tốt.', 'Nối bằng phụ kiện: dùng đầu cosse, ốc nối, domino (terminal).'] },
      { h: 'Quy trình nối xoắn (nối thẳng)' },
      { ul: ['Bước 1: bóc vỏ cách điện khoảng 3–5cm mỗi đầu.', 'Bước 2: làm sạch lõi, cạo lớp oxit nếu có.', 'Bước 3: xoắn hai đầu dây vào nhau ít nhất 5–6 vòng đều.', 'Bước 4: cắt phần thừa, ép sát; hàn thiếc nếu yêu cầu cao.', 'Bước 5: bọc băng cách điện trùm kín mối xoắn.'] },
      { h: 'Cách điện mối nối' },
      { p: 'Quấn băng cách điện theo kiểu lợp mái, vòng sau đè lên 1/2 vòng trước, kéo dài hơn phần kim loại ít nhất 1cm mỗi bên. Với mối nối quan trọng có thể dùng thêm ống gen co nhiệt cho kín và chắc.' },
      { note: 'Mối nối không bọc cách điện là một "quả bom hẹn giờ" — chạm vỏ, chập cháy có thể xảy ra bất cứ lúc nào.' },
    ],
    [
      { q: 'Em nối hai dây nhưng quên bọc băng cách điện. Hệ quả là gì?', a: 'Mối nối hở dễ chạm vào vỏ ổ cắm, chạm với dây khác gây chập cháy, và có thể làm người chạm vào bị điện giật. Phải bọc cách điện kín mọi mối nối.' },
      { q: 'Vì sao mối nối kém làm bóng đèn sáng yếu đi và mối nối bị nóng?', a: 'Mối nối kém có điện trở lớn, gây sụt áp và toả nhiệt ngay tại mối nối. Đèn nhận điện áp thấp hơn nên sáng yếu, đồng thời mối nối nóng lên có thể gây cháy.' },
      { q: 'Khi nào nên dùng nối hàn thay cho nối xoắn thường?', a: 'Với những mối nối quan trọng, chịu dòng lớn hoặc nơi ẩm ướt, ta xoắn rồi hàn thiếc để mối nối dẫn điện tốt, chống oxi hoá và bền cơ học hơn so với chỉ xoắn.' },
    ]
  ),

  'S9CN-w06-quiz': L(
    'Thực hành: Nối dây dẫn — Nối thẳng',
    'Tuần thực hành đầu tiên — các em luyện kĩ năng nối thẳng hai đoạn dây, vừa đảm bảo dẫn điện vừa đảm bảo mỹ thuật.',
    ['Thực hiện đúng quy trình nối thẳng.', 'Đạt yêu cầu kĩ thuật và mỹ thuật của mối nối.', 'Rèn tính cẩn thận, tỉ mỉ và an toàn lao động.'],
    [
      { h: 'Mục tiêu bài thực hành' },
      { p: 'Nối thẳng là kiểu nối cơ bản nhất, dùng khi cần nối dài hai đoạn dây cùng phương. Làm tốt bài này, em sẽ có nền tảng cho các kiểu nối phức tạp hơn.' },
      { h: 'Chuẩn bị dụng cụ và vật liệu' },
      { ul: ['Hai đoạn dây đồng cùng cỡ (lõi một sợi để dễ tập).', 'Kìm tuốt dây, kìm điện, kìm cắt.', 'Băng cách điện; thiếc hàn và mỏ hàn nếu có.', 'Giấy ráp để làm sạch lõi.'] },
      { h: 'Quy trình nối thẳng lõi một sợi' },
      { ul: ['Bước 1: cắt và bóc vỏ mỗi đầu khoảng 3–5cm.', 'Bước 2: làm sạch lõi, cạo lớp oxit cho sáng.', 'Bước 3: bẻ cong lõi vuông góc thành hình chữ L, móc hai đầu vào nhau.', 'Bước 4: dùng kìm xoắn đều mỗi đầu quanh dây kia 5–7 vòng sát nhau.', 'Bước 5: cắt phần thừa, ép sát thân dây.', 'Bước 6: bọc băng cách điện phủ kín, dài hơn phần kim loại 1cm mỗi bên.'] },
      { h: 'Nối thẳng lõi nhiều sợi' },
      { p: 'Với dây lõi nhiều sợi, sau khi bóc vỏ ta xoè đều các sợi của hai đầu, lồng xen kẽ vào nhau rồi xoắn chặt từng nửa về hai phía. Mối nối lõi nhiều sợi mềm nên thường được hàn thiếc để chắc chắn.' },
      { h: 'Tiêu chí đánh giá mối nối' },
      { ul: ['Chắc: kéo nhẹ không tuột, không lung lay.', 'Đẹp: các vòng xoắn đều, sát, gọn.', 'An toàn: không lộ kim loại, băng quấn phẳng, không phồng rộp.'] },
      { h: 'An toàn khi thực hành' },
      { ul: ['Chỉ thực hành trên dây đã ngắt điện hoàn toàn.', 'Cẩn thận với đầu dây sắc và mỏ hàn nóng.', 'Giữ chỗ làm việc gọn gàng, đủ ánh sáng.'] },
      { note: 'Quan sát kĩ đôi tay của thầy cô khi làm mẫu — kĩ năng nghề được hình thành nhờ lặp đi lặp lại nhiều lần và rút kinh nghiệm.' },
    ],
    [
      { q: 'Em xoắn 2 vòng rồi nghĩ "thế là đủ". Đánh giá thao tác này?', a: 'Chưa đạt. Mối nối phải xoắn tối thiểu 5–6 vòng đều và sát thì mới đủ độ bền cơ học và tiếp xúc điện ổn định. Xoắn quá ít, mối nối dễ tuột và phát nhiệt.' },
      { q: 'Băng cách điện bọc ngắn hơn phần lõi đồng. Hậu quả là gì?', a: 'Một phần kim loại lộ ra ngoài, có thể chạm với dây khác hoặc vỏ thiết bị gây điện giật và chập cháy. Băng phải dài hơn phần kim loại ít nhất 1cm mỗi bên.' },
      { q: 'Vì sao mối nối dây lõi nhiều sợi thường được hàn thiếc, còn lõi một sợi thì không bắt buộc?', a: 'Lõi nhiều sợi mềm, các sợi dễ xoè ra, tiếp xúc kém và dễ đứt từng sợi nên cần hàn thiếc để gắn kết và chống oxi hoá. Lõi một sợi cứng, xoắn chặt đã đủ chắc nên hàn chỉ cần với mối nối quan trọng.' },
    ]
  ),

  'S9CN-w07-quiz': L(
    'Thực hành: Nối dây phân nhánh + dùng phụ kiện',
    'Tiếp tục mạch thực hành, các em học nối rẽ T và sử dụng đầu cosse — kĩ năng thường dùng khi đấu dây vào ổ cắm, công tắc, aptomat.',
    ['Thực hiện được nối phân nhánh kiểu chữ T.', 'Bấm và lắp được đầu cosse đúng kĩ thuật.', 'Rèn ý thức an toàn lao động khi đấu dây.'],
    [
      { h: 'Khi nào dùng nối phân nhánh?' },
      { p: 'Nối phân nhánh (rẽ T) dùng khi từ một dây chính đang chạy cần lấy thêm một nhánh đi tới điểm khác, ví dụ từ dây nguồn rẽ một nhánh tới ổ cắm phụ. Đây là kiểu nối rất phổ biến trong mạng điện sinh hoạt.' },
      { h: 'Quy trình nối phân nhánh chữ T (lõi một sợi)' },
      { ul: ['Bóc vỏ dây chính khoảng 4–5cm ở vị trí cần rẽ; bóc vỏ dây nhánh khoảng 6–7cm.', 'Đặt dây nhánh vuông góc, áp vào dây chính.', 'Quấn dây nhánh quanh dây chính 5–6 vòng đều, sát nhau.', 'Cắt phần thừa, ép sát rồi bọc băng cách điện kín.'] },
      { h: 'Nối phân nhánh lõi nhiều sợi' },
      { p: 'Tách đôi các sợi của dây nhánh, đặt ôm lấy dây chính rồi quấn mỗi nửa về một phía. Sau khi quấn chặt, nên hàn thiếc để mối rẽ chắc chắn và dẫn điện tốt.' },
      { h: 'Sử dụng đầu cosse' },
      { ul: ['Cosse là phụ kiện kim loại bọc đầu dây để bắt vít chắc vào ổ cắm, aptomat, cọc đấu.', 'Bóc vỏ dây khoảng 8–10mm.', 'Luồn lõi vào ống cosse, dùng kìm bấm cosse ép thật chặt.', 'Chọn cosse đúng cỡ tiết diện dây; cosse vòng (chữ O) hay cosse càng (chữ U) tuỳ kiểu cọc đấu.'] },
      { h: 'Dùng domino (terminal) nối dây' },
      { p: 'Domino là cầu nối có các ốc vít, dùng để nối nhiều dây mà không cần xoắn - hàn. Đưa đầu dây trần vào lỗ, vặn ốc kẹp chặt. Domino tiện cho nơi cần tháo lắp lại nhiều lần.' },
      { h: 'An toàn khi đấu dây' },
      { ul: ['Luôn cắt aptomat trước khi đấu dây.', 'Đầu dây trần phải ngắn, không thò ra ngoài vít kẹp.', 'Kiểm tra bằng bút thử điện trước khi đóng nguồn lại.'] },
      { note: 'Đầu cosse hoặc vít kẹp lỏng là nguyên nhân hàng đầu gây cháy ổ cắm — phải bấm và vặn thật chặt.' },
    ],
    [
      { q: 'Vì sao đấu trực tiếp dây mềm (nhiều sợi) vào vít kẹp ổ cắm dễ gây tiếp xúc kém?', a: 'Dây mềm có nhiều sợi nhỏ, khi bắt vít trực tiếp dễ bị tuột vài sợi ra ngoài, gãy sợi và tiếp xúc kém, lâu ngày phát nhiệt. Nên bấm đầu cosse rồi mới bắt vít qua cosse.' },
      { q: 'Sau khi nối nhánh xong, em quên kiểm tra bằng bút thử điện rồi đóng nguồn. Rủi ro là gì?', a: 'Mối nối có thể còn lỏng, chạm vỏ, hoặc đấu nhầm dây pha với trung tính. Đóng nguồn ngay có thể gây chập cháy hoặc điện giật. Luôn kiểm tra trước khi cấp điện.' },
      { q: 'So sánh nối bằng domino và nối xoắn-hàn về ưu, nhược điểm?', a: 'Nối xoắn-hàn chắc chắn, gọn, dẫn điện tốt nhưng cố định, khó tháo. Nối bằng domino dễ tháo lắp, đấu nhiều dây thuận tiện nhưng cồng kềnh hơn và phải vặn vít thật chặt để tránh lỏng.' },
    ]
  ),

  'S9CN-w08-quiz': L(
    'Lắp đặt mạch điện bảng điện',
    'Bảng điện là trung tâm điều khiển của mỗi phòng. Hiểu sơ đồ và cách lắp giúp em vừa thực hành tốt vừa nắm chắc kiến thức kiểm tra.',
    ['Đọc được sơ đồ nguyên lí và sơ đồ lắp đặt.', 'Nêu được chức năng các thiết bị trên bảng điện.', 'Tuân thủ quy tắc an toàn khi lắp bảng điện.'],
    [
      { h: 'Khái niệm bảng điện' },
      { p: 'Bảng điện là nơi lắp đặt tập trung các thiết bị đóng cắt, bảo vệ và lấy điện để cung cấp cho phụ tải (đèn, quạt, ổ cắm...). Bảng điện chính đặt sau công tơ; bảng điện nhánh đặt ở từng phòng.' },
      { h: 'Các thiết bị cơ bản trên bảng điện' },
      { ul: ['Cầu chì / aptomat: bảo vệ mạch khi quá tải, ngắn mạch.', 'Công tắc: đóng - cắt mạch điều khiển đèn, quạt.', 'Ổ cắm: lấy điện cho thiết bị di động.', 'Đui đèn: kết nối với bóng đèn.', 'Cọc đấu, hộp nối: nơi đấu dây an toàn.'] },
      { h: 'Sơ đồ nguyên lí' },
      { p: 'Sơ đồ nguyên lí thể hiện mối liên hệ về điện giữa các phần tử trong mạch, không quan tâm tới vị trí thực của thiết bị. Sơ đồ này giúp ta hiểu mạch hoạt động ra sao.' },
      { h: 'Sơ đồ lắp đặt' },
      { p: 'Sơ đồ lắp đặt thể hiện vị trí thực của thiết bị trên bảng điện và đường đi của dây. Sơ đồ này giúp người thợ biết bố trí và đi dây thế nào. Quy tắc: vẽ sơ đồ nguyên lí trước, sơ đồ lắp đặt sau.' },
      { h: 'Quy trình lắp bảng điện' },
      { ul: ['Vạch dấu vị trí thiết bị trên bảng.', 'Khoan lỗ bắt vít và lỗ luồn dây.', 'Lắp thiết bị điện vào bảng.', 'Đi dây và nối dây theo sơ đồ.', 'Kiểm tra rồi mới cấp nguồn.'] },
      { h: 'Quy tắc đấu dây an toàn' },
      { ul: ['Aptomat (hoặc cầu chì) đặt ở đầu mạch, trước các thiết bị.', 'Dây pha (L) đi qua cầu chì và công tắc.', 'Dây trung tính (N) nối thẳng tới đèn, không qua công tắc.'] },
      { note: 'Aptomat luôn đặt đầu mạch; công tắc đặt trên dây pha — đây là hai quy tắc bắt buộc để mạng điện an toàn.' },
    ],
    [
      { q: 'Vì sao công tắc phải đặt trên dây pha (L), không phải dây trung tính (N)?', a: 'Khi tắt công tắc đặt trên dây pha, đèn hoàn toàn không còn điện áp nguy hiểm — an toàn khi thay bóng. Nếu đặt công tắc trên dây N, đèn tắt nhưng vẫn còn pha tới đui, chạm vào dễ bị giật.' },
      { q: 'Aptomat thay cho cầu chì có ưu điểm gì?', a: 'Aptomat ngắt nhanh khi quá tải, ngắn mạch và có thể bật lại sau khi xử lí sự cố mà không cần thay như cầu chì. Một số loại còn có chức năng chống dòng rò (chống giật), an toàn hơn nhiều.' },
      { q: 'Vì sao phải vẽ sơ đồ nguyên lí trước, sơ đồ lắp đặt sau?', a: 'Sơ đồ nguyên lí cho ta hiểu rõ mạch hoạt động và cách nối điện đúng. Khi đã hiểu nguyên lí mới chuyển sang bố trí thiết bị và đi dây thực tế trên sơ đồ lắp đặt, tránh đấu sai.' },
    ]
  ),

  'S9CN-w09-quiz': L(
    'Thực hành: Lắp bảng điện 1 cầu chì + 1 ổ cắm + 1 công tắc + 1 bóng đèn',
    'Bài thực hành tổng hợp — lắp một bảng điện đầy đủ chức năng. Đây là kĩ năng thực tế các em có thể dùng ngay tại nhà.',
    ['Lắp đúng theo sơ đồ nguyên lí và sơ đồ lắp đặt.', 'Đấu dây gọn gàng, chắc chắn, an toàn.', 'Vận hành thử mạch đúng kĩ thuật.'],
    [
      { h: 'Sơ đồ nguyên lí của mạch' },
      { p: 'Nguồn 220V → cầu chì → tách thành 2 nhánh: nhánh 1 qua công tắc rồi tới đui đèn; nhánh 2 tới ổ cắm. Dây trung tính nối thẳng từ nguồn tới đèn và ổ cắm. Công tắc và cầu chì đều nằm trên dây pha.' },
      { h: 'Chuẩn bị' },
      { ul: ['Bảng nhựa, cầu chì, công tắc, ổ cắm, đui đèn, bóng đèn.', 'Dây dẫn, băng cách điện, vít.', 'Kìm, tua vít, khoan, bút thử điện, VOM.'] },
      { h: 'Quy trình lắp đặt' },
      { ul: ['Bước 1: vẽ và kiểm tra lại sơ đồ.', 'Bước 2: vạch dấu, bố trí thiết bị trên bảng.', 'Bước 3: khoan, bắt vít cố định thiết bị.', 'Bước 4: đi dây và đấu vào các cọc đấu theo sơ đồ.', 'Bước 5: kiểm tra mối nối, đo thông mạch bằng VOM.', 'Bước 6: cấp nguồn thử và quan sát hoạt động.'] },
      { h: 'Kiểm tra trước khi cấp nguồn' },
      { ul: ['Không có ngắn mạch giữa L và N (đo R thấy giá trị rất lớn khi công tắc tắt).', 'Vít chặt, dây không lỏng.', 'Vỏ thiết bị không chạm dây trần.', 'Lắp cầu chì đúng dòng định mức.'] },
      { h: 'Vận hành thử' },
      { p: 'Đóng aptomat tổng, bật công tắc — đèn phải sáng; tắt công tắc — đèn tắt. Cắm thử thiết bị vào ổ cắm xem hoạt động bình thường không. Dùng bút thử điện kiểm tra vỏ thiết bị không bị rò.' },
      { note: 'Mọi cuộc đấu dây phải kết thúc bằng việc kiểm tra thông mạch — đừng tin vào "cảm giác làm đúng".' },
    ],
    [
      { q: 'Khi bật công tắc, đèn không sáng. Em kiểm tra theo thứ tự nào?', a: 'Lần lượt: (1) cầu chì còn nguyên không; (2) bóng đèn có cháy không; (3) công tắc có đóng mạch không (dùng bút thử / VOM); (4) đui đèn tiếp xúc tốt không; (5) dây có bị đứt ở đâu không.' },
      { q: 'Ổ cắm hoạt động bình thường nhưng đèn không sáng. Sự cố có thể ở đâu?', a: 'Ổ cắm hoạt động chứng tỏ nguồn và cầu chì đều tốt. Sự cố nằm trong nhánh đèn: công tắc hỏng, bóng cháy, đui đèn lỏng hoặc dây từ công tắc tới đui bị đứt.' },
      { q: 'Vì sao trước khi cấp nguồn phải đo điện trở giữa dây pha và dây trung tính?', a: 'Để phát hiện ngắn mạch. Khi công tắc tắt và chưa cắm tải, điện trở giữa L và N phải rất lớn (gần như hở mạch). Nếu đo thấy điện trở nhỏ tức là có chạm chập, không được cấp nguồn.' },
    ]
  ),

  'S9CN-w10-quiz': L(
    'Lắp đặt mạch điện đèn ống huỳnh quang',
    'Đèn ống huỳnh quang vẫn rất phổ biến ở trường học, văn phòng. Hiểu nguyên lí giúp các em tự sửa chữa thay vì vứt bỏ.',
    ['Trình bày được cấu tạo và nguyên lí của đèn huỳnh quang.', 'Lắp được mạch đèn dùng chấn lưu và tắc te.', 'Nhận biết và xử lí các hư hỏng thường gặp.'],
    [
      { h: 'Cấu tạo bộ đèn huỳnh quang' },
      { ul: ['Ống đèn: ống thuỷ tinh tráng bột huỳnh quang bên trong, có hơi thuỷ ngân và khí trơ; hai đầu có sợi đốt.', 'Chấn lưu (ballast): cuộn cảm tạo điện áp cao mồi đèn và hạn chế dòng khi đèn sáng.', 'Tắc te (starter): bộ phận tự động đóng - mở để mồi phóng điện.', 'Máng đèn, đui đèn, dây nối.'] },
      { h: 'Nguyên lí hoạt động' },
      { p: 'Khi bật công tắc, tắc te phóng điện làm nóng, đóng tiếp điểm cho dòng đốt nóng hai sợi đốt; sau đó tắc te nguội, tiếp điểm mở đột ngột làm chấn lưu sinh điện áp cao mồi đèn. Tia điện trong ống phát ra tia tử ngoại, kích thích bột huỳnh quang phát ra ánh sáng nhìn thấy.' },
      { h: 'Vai trò của chấn lưu' },
      { p: 'Chấn lưu vừa giúp mồi đèn (tạo xung điện áp cao), vừa hạn chế dòng điện qua đèn khi đèn đã sáng. Không có chấn lưu, dòng qua đèn tăng vô hạn và làm hỏng đèn ngay.' },
      { h: 'Sơ đồ mạch đèn' },
      { p: 'Dây pha → cầu chì → công tắc → chấn lưu → một đầu ống đèn; tắc te mắc song song với ống đèn (nối hai đầu ống); đầu còn lại của ống nối về dây trung tính.' },
      { h: 'Các hư hỏng thường gặp' },
      { ul: ['Đèn chớp liên tục: hỏng tắc te → thay tắc te mới.', 'Hai đầu ống đỏ nhưng đèn không sáng: hỏng tắc te hoặc bóng yếu.', 'Đèn không lên, không có hiện tượng gì: kiểm tra chấn lưu, công tắc, cầu chì, dây nối.', 'Đèn sáng mờ, có tiếng ù: chấn lưu kém.'] },
      { h: 'Đèn LED thay thế' },
      { p: 'Hiện nay đèn LED dạng ống (LED tuýp) thay thế trực tiếp đèn huỳnh quang ngày càng phổ biến vì tiết kiệm điện, sáng ngay, bền và không cần tắc te. Khi thay LED tuýp thường phải bỏ hoặc đấu lại tắc te và chấn lưu theo hướng dẫn.' },
      { note: 'Bột huỳnh quang và hơi thuỷ ngân trong ống đèn độc hại — khi đèn vỡ phải dọn cẩn thận và bỏ vào nơi thu gom rác thải nguy hại.' },
    ],
    [
      { q: 'Đèn huỳnh quang nháy liên tục mà không sáng hẳn. Em nghĩ tới linh kiện nào trước?', a: 'Tắc te (starter) — đây là bộ phận dễ hỏng nhất sau thời gian dài. Thay tắc te mới thường khắc phục được ngay hiện tượng nháy.' },
      { q: 'Vì sao đèn LED tiết kiệm điện hơn đèn huỳnh quang?', a: 'LED biến đổi điện trực tiếp thành ánh sáng với hiệu suất cao (80–90%), không cần chấn lưu và không có tổn hao nhiệt lớn như huỳnh quang. Vì vậy cùng độ sáng, LED tiêu thụ ít điện hơn nhiều.' },
      { q: 'Vai trò của chấn lưu trong mạch đèn huỳnh quang là gì? Nếu chập tắt chấn lưu thì sao?', a: 'Chấn lưu mồi đèn và hạn chế dòng khi đèn sáng. Nếu nối tắt (bỏ) chấn lưu, dòng điện qua đèn không bị hạn chế sẽ tăng rất lớn, làm cháy sợi đốt và hỏng đèn ngay lập tức.' },
    ]
  ),

  'S9CN-w11-quiz': L(
    'Mạch điện đèn 2 công tắc — Đèn cầu thang',
    'Mạch đèn 2 công tắc rất quen thuộc ở cầu thang, hành lang dài. Đây là sơ đồ kinh điển và thường xuất hiện trong đề kiểm tra.',
    ['Hiểu nguyên lí mạch đèn điều khiển bằng 2 công tắc.', 'Vẽ được sơ đồ nguyên lí của mạch.', 'Lắp được mạch trong thực tế và liên hệ ứng dụng.'],
    [
      { h: 'Đặc điểm mạch' },
      { p: 'Mạch đèn cầu thang là mạch một bóng đèn được điều khiển bởi hai công tắc đặt ở hai vị trí khác nhau. Có thể bật hoặc tắt đèn từ bất kì công tắc nào — rất tiện cho cầu thang, hành lang, phòng ngủ.' },
      { h: 'Linh kiện sử dụng' },
      { ul: ['2 công tắc 3 cực (công tắc chuyển hướng).', '1 bóng đèn.', 'Dây dẫn nhiều đoạn nối giữa hai công tắc.'] },
      { h: 'Công tắc 3 cực là gì?' },
      { p: 'Công tắc 3 cực có một cực chung (kí hiệu C hoặc L) và hai cực ra (1 và 2). Khi gạt, cực chung được nối luân phiên với cực 1 hoặc cực 2, tức là nó chuyển hướng dòng điện thay vì chỉ đóng - cắt như công tắc 2 cực.' },
      { h: 'Nguyên lí hoạt động' },
      { p: 'Dây pha vào cực chung C của công tắc 1. Hai cực 1 và 2 của công tắc 1 nối tới hai cực 1 và 2 của công tắc 2. Cực chung C của công tắc 2 nối tới đèn rồi về dây trung tính. Khi hai công tắc cùng "thông mạch" theo một đường thì đèn sáng; gạt một công tắc làm đổi đường → mạch hở → đèn tắt.' },
      { h: 'Sơ đồ và cách vẽ' },
      { ul: ['Vẽ nguồn, dây pha vào C của công tắc 1.', 'Nối chéo: 1↔1 và 2↔2 (hoặc 1↔2 và 2↔1) giữa hai công tắc.', 'Nối C của công tắc 2 qua đèn về trung tính.'] },
      { h: 'Ứng dụng thực tế' },
      { ul: ['Cầu thang nhiều tầng: bật ở tầng dưới, tắt ở tầng trên.', 'Hành lang dài: bật ở đầu này, tắt ở đầu kia.', 'Phòng ngủ: bật từ cửa, tắt tại giường.'] },
      { note: 'Công tắc 3 cực có thể ghi "C – 1 – 2" hoặc "L1 – L2 – L3" tuỳ hãng — cần đọc kĩ kí hiệu cọc đấu trước khi lắp để không nối nhầm.' },
    ],
    [
      { q: 'Vì sao mạch đèn cầu thang phải dùng công tắc 3 cực mà không dùng công tắc 2 cực thường?', a: 'Công tắc 2 cực chỉ đóng hoặc cắt một đường dây. Mạch cầu thang cần chuyển hướng dòng điện qua hai đường để bật - tắt được từ cả hai vị trí, nên phải dùng công tắc 3 cực (chuyển hướng).' },
      { q: 'Mạch đã lắp xong nhưng chỉ một công tắc điều khiển được đèn, công tắc kia không tác dụng. Em kiểm tra gì?', a: 'Có thể cực chung C của một trong hai công tắc bị đấu nhầm vào cực 1 hoặc 2; hoặc hai dây nối giữa hai công tắc bị đấu sai vị trí. Cần kiểm tra lại đúng cực chung và đường nối chéo.' },
      { q: 'Hãy mô tả cách bố trí mạch để bật đèn cầu thang ở tầng 1 và tắt ở tầng 2.', a: 'Đặt công tắc 1 ở tầng 1, công tắc 2 ở tầng 2, cùng điều khiển một bóng. Dây pha vào C công tắc 1, nối hai cực 1-2 sang hai cực 1-2 của công tắc 2, C công tắc 2 ra đèn. Người lên cầu thang bật đèn ở tầng 1, lên đến tầng 2 gạt công tắc 2 để tắt.' },
    ]
  ),

  'S9CN-w12-quiz': L(
    'Lắp đặt dây dẫn của mạng điện trong nhà',
    'Đi dây trong nhà có 2 phương pháp chính: đi dây nổi và đi dây ngầm. Hiểu rõ hai phương pháp giúp em lựa chọn đúng cho từng công trình.',
    ['So sánh được phương pháp đi dây nổi và đi dây ngầm.', 'Nắm quy tắc kĩ thuật khi đi dây.', 'Nhận biết và tránh được các sai lầm phổ biến.'],
    [
      { h: 'Hai phương pháp đi dây' },
      { p: 'Mạng điện trong nhà có thể lắp đặt theo kiểu đi dây nổi (đặt nổi trên bề mặt tường, trần) hoặc đi dây ngầm (luồn trong tường, trần, sàn). Mỗi cách có ưu, nhược điểm và phù hợp với điều kiện khác nhau.' },
      { h: 'Đi dây nổi' },
      { p: 'Dây được đặt trong ống nhựa, máng cáp hoặc ghim nẹp dọc theo tường, trần. Ưu điểm: dễ lắp đặt, dễ kiểm tra và sửa chữa, chi phí thấp. Nhược điểm: kém mỹ thuật, dễ bị va chạm, hư hại.' },
      { h: 'Đi dây ngầm' },
      { p: 'Dây được luồn trong ống đặt âm trong tường, trần, sàn. Ưu điểm: gọn, đẹp, an toàn, không vướng víu. Nhược điểm: thi công khó, khó sửa chữa, phải đặt ống ngay khi xây dựng.' },
      { h: 'Quy tắc kĩ thuật khi đi dây' },
      { ul: ['Luôn dùng ống dẫn (PVC) bảo vệ dây, không để dây trần.', 'Chỉ nối dây ở hộp nối, không nối trong ống và trong tường.', 'Không bẻ gập dây quá gấp làm hỏng lõi và vỏ.', 'Đường dây đi thẳng, ngang - dọc rõ ràng để dễ kiểm tra về sau.'] },
      { h: 'Phụ kiện đi dây' },
      { ul: ['Ống luồn dây, ống ruột gà, máng cáp.', 'Hộp nối, hộp công tắc - ổ cắm âm tường.', 'Kẹp, nẹp, vít nở để cố định.'] },
      { h: 'Sai lầm hay gặp' },
      { ul: ['Đi dây trần không có ống bảo vệ.', 'Nối dây tuỳ tiện trong tường, không qua hộp nối.', 'Chọn tiết diện dây không đủ cho công suất phụ tải.', 'Đi dây điện chung máng với dây tín hiệu yếu gây nhiễu.'] },
      { note: 'Bản vẽ điện sau khi lắp đặt phải được lưu lại — sau này sửa chữa, cải tạo mới biết dây chạy ở đâu, tránh khoan trúng dây.' },
    ],
    [
      { q: 'Nhà mới xây em chọn đi dây nổi hay đi dây ngầm? Vì sao?', a: 'Nên đi dây ngầm vì nhà mới xây có cơ hội đặt ống trước khi tô tường, đảm bảo mỹ thuật, gọn gàng và an toàn lâu dài. Đi dây nổi phù hợp hơn với nhà đã hoàn thiện cần lắp thêm.' },
      { q: 'Vì sao tuyệt đối không được nối dây ngầm trong tường?', a: 'Mối nối ngầm có thể oxi hoá, lỏng dần theo thời gian, dễ phát nhiệt và chập cháy mà không phát hiện được. Khi sửa lại phải đục tường rất khó. Quy chuẩn yêu cầu mọi mối nối phải nằm trong hộp nối có nắp đậy.' },
      { q: 'So sánh ưu - nhược điểm của đi dây nổi và đi dây ngầm về mặt sửa chữa?', a: 'Đi dây nổi dễ kiểm tra và sửa chữa vì dây nằm lộ trong ống, máng; chỉ cần mở nắp là thấy. Đi dây ngầm khó sửa hơn vì dây nằm trong tường, muốn thay phải luồn lại trong ống hoặc đục tường.' },
    ]
  ),

  'S9CN-w13-quiz': L(
    'Kiểm tra an toàn mạng điện trong nhà',
    'Định kì kiểm tra mạng điện giúp phát hiện sớm rủi ro cháy nổ, điện giật. Đây là kĩ năng quan trọng cho mọi gia đình.',
    ['Nêu được các hạng mục cần kiểm tra của mạng điện.', 'Sử dụng được bút thử điện, VOM để kiểm tra.', 'Phát hiện và xử lí được các nguy cơ phổ biến.'],
    [
      { h: 'Vì sao phải kiểm tra an toàn mạng điện?' },
      { p: 'Mạng điện hoạt động lâu ngày sẽ lão hoá: vỏ dây nứt, mối nối lỏng, thiết bị mòn tiếp điểm. Kiểm tra định kì giúp phát hiện sớm các nguy cơ và xử lí trước khi xảy ra chập cháy, điện giật.' },
      { h: 'Kiểm tra dây dẫn điện' },
      { ul: ['Quan sát vỏ dây: nứt, lão hoá, bị chuột cắn, cháy xém.', 'Kiểm tra mối nối: chắc, được bọc cách điện, không phát nhiệt.', 'Dây không bị căng quá hay đè vật nặng lên.'] },
      { h: 'Kiểm tra cách điện' },
      { p: 'Dùng mê-gôm-mét đo điện trở cách điện giữa dây dẫn với nhau và giữa dây với vỏ thiết bị. Điện trở cách điện thấp chứng tỏ cách điện đã hỏng, có nguy cơ rò điện.' },
      { h: 'Kiểm tra thiết bị đóng cắt, bảo vệ' },
      { ul: ['Aptomat, cầu dao đóng - cắt dứt khoát, không kẹt.', 'Cầu chì đúng dòng định mức, dây chảy không nối tạm bằng dây đồng.', 'Công tắc, ổ cắm chắc chắn, không lỏng, không cháy đen.'] },
      { h: 'Kiểm tra hệ thống tiếp đất' },
      { p: 'Thiết bị có vỏ kim loại (máy giặt, bình nóng lạnh, tủ lạnh) cần có dây tiếp đất. Kiểm tra dây tiếp đất còn nối chắc và còn dẫn tốt — đây là biện pháp chống điện giật khi vỏ bị rò.' },
      { h: 'Các dấu hiệu cảnh báo nguy hiểm' },
      { ul: ['Ổ cắm nóng khi cắm thiết bị → tải quá lớn hoặc tiếp xúc lỏng.', 'Aptomat ngắt liên tục → có rò rỉ hoặc ngắn mạch.', 'Có mùi khét, nghe tiếng nổ tách → dừng ngay và kiểm tra tổng thể.'] },
      { note: 'Nên kiểm tra mạng điện trong nhà 6–12 tháng một lần, đặc biệt trước mùa mưa (dễ rò điện) và mùa nắng nóng cao điểm (tải lớn).' },
    ],
    [
      { q: 'Em chạm tay vào vỏ máy giặt thấy "tê tê". Em nên làm gì ngay?', a: 'Lập tức cắt aptomat cấp điện cho máy, không chạm vào máy nữa. Vỏ máy đang rò điện — cần báo người lớn gọi thợ kiểm tra dây tiếp đất và cách điện của máy trước khi dùng tiếp.' },
      { q: 'Aptomat cứ tự nhảy mỗi khi bật bình nóng lạnh. Nguyên nhân có thể là gì?', a: 'Có thể do: (1) bình bị rò điện làm aptomat chống giật ngắt; (2) công suất bình lớn vượt định mức aptomat; (3) dây dẫn không đủ tiết diện gây quá tải. Cần kiểm tra cả ba nguyên nhân này.' },
      { q: 'Tại sao cầu chì bị đứt không được nối tạm bằng dây đồng to?', a: 'Dây đồng chịu dòng lớn hơn nhiều nên khi quá tải hoặc ngắn mạch nó không đứt để bảo vệ, làm mạch tiếp tục có dòng lớn gây cháy dây và thiết bị. Phải thay đúng dây chảy có dòng định mức phù hợp.' },
    ]
  ),

  'S9CN-w14-quiz': L(
    'Ôn tập + Kiểm tra giữa HK1',
    'Tuần 14 các em hệ thống lại mô-đun điện dân dụng và chuẩn bị cho bài kiểm tra giữa kì — một dịp tổng duyệt năng lực.',
    ['Hệ thống lại các nội dung của mô-đun điện đã học.', 'Vận dụng kiến thức vào tình huống thực tế.', 'Tự đánh giá được năng lực của bản thân.'],
    [
      { h: 'Mục đích của tuần ôn tập' },
      { p: 'Ôn tập giúp em xâu chuỗi các bài đã học thành một hệ thống, nhận ra phần nào còn yếu để bổ sung, và làm quen với dạng đề trước khi kiểm tra giữa kì.' },
      { h: 'Nội dung trọng tâm — Vật liệu và dụng cụ' },
      { ul: ['Vật liệu dẫn điện, cách điện, dẫn từ.', 'Cách chọn dây theo công suất.', 'Dụng cụ cơ khí và dụng cụ đo (đặc biệt là VOM).'] },
      { h: 'Nội dung trọng tâm — Mối nối và đi dây' },
      { ul: ['Yêu cầu của mối nối, các kiểu nối.', 'Quy trình nối thẳng, nối phân nhánh.', 'Đi dây nổi và đi dây ngầm.'] },
      { h: 'Nội dung trọng tâm — Mạch điện' },
      { ul: ['Sơ đồ nguyên lí và sơ đồ lắp đặt.', 'Mạch bảng điện cơ bản.', 'Mạch đèn huỳnh quang, mạch đèn 2 công tắc.'] },
      { h: 'Nội dung trọng tâm — An toàn điện' },
      { ul: ['Quy tắc an toàn khi lắp đặt và sử dụng điện.', 'Kiểm tra an toàn mạng điện trong nhà.', 'Xử lí tình huống rò điện, quá tải.'] },
      { h: 'Dạng câu hỏi thường gặp' },
      { ul: ['Lí thuyết: định nghĩa, phân loại, công dụng.', 'Vẽ sơ đồ nguyên lí mạch điện đơn giản.', 'Tính chọn dây theo công suất.', 'Xử lí tình huống an toàn điện.'] },
      { h: 'Mẹo làm bài' },
      { ul: ['Đọc kĩ đề, gạch chân từ khoá.', 'Phần vẽ sơ đồ: dùng thước và kí hiệu chuẩn.', 'Câu tình huống: nêu rõ nguyên nhân và cách khắc phục.'] },
      { note: 'Đừng học vẹt — hãy hình dung lại từng buổi thực hành để câu trả lời sinh động và đúng thực tế.' },
    ],
    [
      { q: 'Đề bài yêu cầu vẽ sơ đồ mạch điện gồm 1 cầu chì, 1 công tắc, 1 đèn. Em làm theo trình tự nào?', a: 'Xác định mạch: nguồn 220V → cầu chì → công tắc → đèn → về trung tính (cầu chì và công tắc trên dây pha). Vẽ kí hiệu chuẩn của từng thiết bị, nối theo thứ tự, ghi rõ dây pha L và dây trung tính N.' },
      { q: 'Câu tình huống: bếp gia đình hay bị "nhảy aptomat". Em trả lời thế nào?', a: 'Nguyên nhân: tổng tải vượt định mức aptomat, hoặc thiết bị (bếp, lò vi sóng) bị rò điện làm aptomat chống giật ngắt. Khắc phục: phân chia thiết bị sang nhánh khác, kiểm tra cách điện thiết bị, chọn aptomat đúng tiêu chuẩn nếu tải thực sự lớn.' },
      { q: 'Một mạch điện đo điện trở giữa L và N (chưa cắm tải, công tắc tắt) thấy bằng 0Ω. Điều đó nói lên điều gì?', a: 'Mạch đang bị ngắn mạch (chạm chập) giữa dây pha và dây trung tính. Tuyệt đối không cấp nguồn, phải tìm và sửa điểm chạm chập trước, nếu không sẽ gây cháy dây và nhảy aptomat ngay khi đóng điện.' },
    ]
  ),

  'S9CN-w15-quiz': L(
    'Trồng cây ăn quả — Giá trị + đặc điểm',
    'Sang mô-đun "Trồng cây ăn quả", các em làm quen với nhóm cây kinh tế quan trọng của Việt Nam và đặc điểm sinh học của chúng.',
    ['Trình bày được giá trị kinh tế, dinh dưỡng và môi trường của cây ăn quả.', 'Nêu được đặc điểm sinh học chung của nhóm cây ăn quả.', 'Kể được một số cây ăn quả tiêu biểu theo vùng miền.'],
    [
      { h: 'Khái quát về cây ăn quả ở Việt Nam' },
      { p: 'Việt Nam có khí hậu nhiệt đới gió mùa, đất đai đa dạng nên trồng được rất nhiều loại cây ăn quả. Đây là nhóm cây trồng lâu năm, cho thu hoạch nhiều năm và có giá trị kinh tế cao, gắn với nhiều vùng chuyên canh nổi tiếng.' },
      { h: 'Giá trị kinh tế' },
      { ul: ['Là nguồn thu nhập lớn cho nhà vườn, nhiều loại xuất khẩu (thanh long, vải, xoài, sầu riêng).', 'Cung cấp nguyên liệu cho công nghiệp chế biến: nước ép, mứt, đồ hộp, sấy khô.', 'Tạo việc làm cho nhiều lao động nông thôn.'] },
      { h: 'Giá trị dinh dưỡng' },
      { p: 'Quả tươi cung cấp nhiều vitamin (đặc biệt vitamin C), khoáng chất, đường, chất xơ, giúp tăng đề kháng, hỗ trợ tiêu hoá và cân bằng dinh dưỡng cho con người.' },
      { h: 'Giá trị môi trường và văn hoá' },
      { ul: ['Che phủ đất, chống xói mòn, điều hoà khí hậu, tạo bóng mát.', 'Lá rụng làm tăng mùn, cải tạo đất.', 'Tạo cảnh quan đẹp, gắn với phong tục, lễ Tết của người Việt.'] },
      { h: 'Đặc điểm sinh học chung' },
      { ul: ['Cây lâu năm, thân gỗ, có nhiều cành.', 'Bộ rễ ăn sâu và lan rộng để hút nước, dinh dưỡng.', 'Ra hoa, kết quả theo mùa.', 'Cần chăm sóc thường xuyên: tưới, bón phân, tỉa cành, phòng sâu bệnh.'] },
      { h: 'Một số cây ăn quả tiêu biểu theo vùng' },
      { ul: ['Miền Bắc: vải, nhãn, na, cam, bưởi, hồng.', 'Miền Trung: xoài, nhãn, nho, thanh long.', 'Miền Nam: sầu riêng, măng cụt, chôm chôm, thanh long, dừa.'] },
      { note: 'Thanh long, sầu riêng, xoài, vải... của Việt Nam đang được xuất khẩu chính ngạch sang Trung Quốc, Mỹ, châu Âu — cây ăn quả thực sự là thế mạnh nông nghiệp nước ta.' },
    ],
    [
      { q: 'Vì sao trồng cây ăn quả góp phần bảo vệ đất, nhất là ở vùng đồi núi?', a: 'Tán lá che chắn khi mưa làm giảm lực nước đập xuống đất, bộ rễ giữ đất khỏi bị trôi, lá rụng phân huỷ thành mùn làm tăng độ phì. Nhờ đó cây ăn quả giảm xói mòn và cải tạo đất ở vùng đồi núi.' },
      { q: 'Gia đình em ở miền Bắc, muốn trồng một cây ăn quả lâu năm trong sân vườn. Em chọn cây nào và vì sao?', a: 'Có thể chọn bưởi Diễn hoặc nhãn lồng — đều phù hợp khí hậu miền Bắc, dễ chăm sóc, cho quả ngon có giá trị kinh tế, đồng thời tán cây tạo bóng mát và cảnh quan đẹp cho sân vườn.' },
      { q: 'Hãy nêu ba giá trị của cây ăn quả ngoài giá trị kinh tế.', a: 'Giá trị dinh dưỡng (cung cấp vitamin, khoáng, chất xơ); giá trị môi trường (che phủ, chống xói mòn, điều hoà khí hậu); giá trị văn hoá - cảnh quan (làm đẹp, gắn với phong tục, lễ Tết của người Việt).' },
    ]
  ),

  'S9CN-w16-quiz': L(
    'Kỹ thuật trồng và chăm sóc cây ăn quả',
    'Trồng đúng kĩ thuật quyết định phần lớn thành công của vườn cây. Tuần này các em tìm hiểu quy trình trồng và chăm sóc chuẩn.',
    ['Nắm được quy trình chuẩn bị đất và trồng cây ăn quả.', 'Biết các kĩ thuật chăm sóc cơ bản theo từng giai đoạn.', 'Có ý thức chọn cây và kĩ thuật phù hợp điều kiện địa phương.'],
    [
      { h: 'Chọn thời vụ và giống' },
      { p: 'Cây ăn quả thường trồng vào đầu mùa mưa (miền Nam) hoặc vụ xuân, vụ thu (miền Bắc) để cây dễ bén rễ. Chọn giống tốt, sạch bệnh, đúng đặc tính từ vườn ươm uy tín.' },
      { h: 'Chuẩn bị đất và đào hố' },
      { ul: ['Đào hố trước khi trồng 15–30 ngày, kích thước phổ biến 60×60×60cm.', 'Bón lót mỗi hố: phân chuồng hoai 10–20kg + lân 0,3–0,5kg + vôi bột.', 'Trộn đều đất mặt với phân, lấp hố hơi cao hơn mặt đất để khi đất lún không bị úng.'] },
      { h: 'Kĩ thuật trồng cây' },
      { ul: ['Trồng vào lúc trời mát (sáng sớm hoặc chiều).', 'Moi hố vừa bầu, đặt cây ngay ngắn, mặt bầu ngang mặt đất.', 'Lấp đất quanh gốc, nén nhẹ cho chặt gốc.', 'Cắm cọc chống đổ, tưới đẫm nước ngay sau trồng.'] },
      { h: 'Tưới nước và giữ ẩm' },
      { p: 'Cây mới trồng cần tưới đều, giữ ẩm nhưng không để úng. Có thể phủ rơm rạ, cỏ khô quanh gốc để giữ ẩm và hạn chế cỏ dại.' },
      { h: 'Bón phân thúc theo giai đoạn' },
      { ul: ['Giai đoạn sinh trưởng (kiến thiết cơ bản): bón đạm nhiều để phát triển thân, cành, lá.', 'Giai đoạn ra hoa: bón lân, kali để hoa khoẻ, đậu quả tốt.', 'Giai đoạn nuôi quả: bón kali để quả ngọt, chắc; hạn chế đạm.'] },
      { h: 'Tỉa cành, tạo tán và phòng trừ sâu bệnh' },
      { ul: ['Tỉa bỏ cành tăm, cành sâu bệnh, cành mọc chen để tán thông thoáng.', 'Tạo tán cân đối giúp cây nhận đủ ánh sáng, dễ thu hoạch.', 'Phòng trừ sâu bệnh, ưu tiên biện pháp sinh học, dùng thuốc đúng cách và đảm bảo thời gian cách li.'] },
      { note: 'Trồng cây ăn quả cần kiên nhẫn — nhiều loài 3–5 năm mới cho thu hoạch, nhưng có thể cho quả liên tục trong 20–30 năm nếu chăm sóc tốt.' },
    ],
    [
      { q: 'Vì sao phải đào hố và bón lót trước khi trồng 15–30 ngày, chứ không đào rồi trồng ngay?', a: 'Để phân hữu cơ phân huỷ một phần, đất trong hố tơi xốp hơn và vi sinh vật có ích phát triển. Khi đó cây non sẽ nhanh bén rễ, ít bị "xót" phân và phát triển tốt hơn.' },
      { q: 'Cây mới trồng bị héo lá. Em xử lí thế nào?', a: 'Tưới đẫm gốc, che nắng tạm thời cho cây, kiểm tra cọc chống và độ chặt của gốc. Nếu cây quá yếu có thể trồng lại nhưng phải cẩn thận không làm dập, đứt rễ; tránh để gốc bị úng nước.' },
      { q: 'Ở giai đoạn nuôi quả, vì sao nên bón nhiều kali và hạn chế đạm?', a: 'Kali giúp quả tích luỹ đường, chắc thịt, ngọt và bảo quản tốt hơn. Nếu bón nhiều đạm lúc nuôi quả, cây sẽ phát triển thân lá mạnh, quả nhạt, lâu chín và dễ rụng.' },
    ]
  ),

  'S9CN-w17-quiz': L(
    'Kỹ thuật ghép cây',
    'Ghép cây là kĩ thuật nhân giống quan trọng — vừa giữ được đặc tính tốt của giống, vừa rút ngắn thời gian cho thu hoạch.',
    ['Trình bày được mục đích và ý nghĩa của ghép cây.', 'Phân biệt các phương pháp ghép phổ biến.', 'Nêu được điều kiện để ghép thành công.'],
    [
      { h: 'Ghép cây là gì?' },
      { p: 'Ghép cây là phương pháp nhân giống vô tính, gắn một bộ phận (mắt ghép hoặc cành ghép) của cây mẹ có đặc tính tốt lên một cây khác (gốc ghép) để hai bộ phận liền lại thành một cây hoàn chỉnh.' },
      { h: 'Mục đích, ý nghĩa của ghép cây' },
      { ul: ['Giữ nguyên đặc tính tốt của giống (không bị biến đổi như khi gieo hạt).', 'Rút ngắn thời gian cho quả so với trồng bằng hạt.', 'Tăng sức chống chịu sâu bệnh, hạn úng nhờ chọn gốc ghép khoẻ.', 'Phục tráng, cải tạo những cây già hoặc giống kém.'] },
      { h: 'Phương pháp ghép mắt' },
      { p: 'Lấy mắt (chồi) từ cành bánh tẻ của cây mẹ, ghép vào vết rạch trên gốc ghép (kiểu chữ T hoặc cửa sổ), buộc chặt lại. Ghép mắt thường dùng cho cam, bưởi, hồng, hoa hồng.' },
      { h: 'Phương pháp ghép cành' },
      { p: 'Cắt một đoạn cành có mắt từ cây mẹ, vát nhọn rồi ghép vào gốc ghép (ghép nêm, ghép áp, ghép chẻ bên). Ghép cành thường dùng cho xoài, sầu riêng, nhãn.' },
      { h: 'Phương pháp ghép áp' },
      { p: 'Áp hai cành (của hai cây đang sống) đã được cạo vỏ vào nhau, buộc chặt cho liền tầng sinh gỗ; khi liền thì cắt rời khỏi cây mẹ. Ghép áp dễ sống nhưng tốn công.' },
      { h: 'Điều kiện ghép thành công' },
      { ul: ['Gốc ghép và cành/mắt ghép cùng họ, tốt nhất cùng loài.', 'Tầng sinh gỗ (tượng tầng) hai bên phải áp khít nhau.', 'Thao tác nhanh, dao sắc, vết cắt sạch, buộc chặt vừa phải.', 'Thời tiết khô ráo, mát mẻ; che nắng và giữ ẩm sau ghép.'] },
      { note: 'Sau ghép 2–3 tuần mở dây kiểm tra: nếu mắt/cành ghép còn xanh tươi và bắt đầu liền là dấu hiệu ghép thành công.' },
    ],
    [
      { q: 'Vì sao nhân giống bằng ghép giữ được đặc tính của giống tốt hơn gieo hạt?', a: 'Khi gieo hạt, cây con là kết quả thụ phấn nên mang tính trạng của cả bố lẫn mẹ, dễ bị lai tạp, không giống cây mẹ. Ghép lấy trực tiếp mô của cây mẹ nên cây ghép giữ nguyên đặc tính của giống mẹ.' },
      { q: 'Cây xoài ghép bị chết sau khoảng một tháng. Nguyên nhân có thể là gì?', a: 'Có thể do: (1) gốc và cành ghép không tương hợp; (2) tầng sinh gỗ hai bên không áp khít; (3) buộc quá chặt làm thắt mạch dẫn; (4) gặp mưa nhiều làm nhiễm khuẩn vết ghép; (5) dao bẩn, thao tác chậm làm vết cắt khô.' },
      { q: 'Tại sao ghép mắt và ghép cành cần áp khít tầng sinh gỗ của hai phần?', a: 'Vì tầng sinh gỗ (tượng tầng) là nơi tế bào phân chia, sinh mô mới để gốc ghép và cành ghép liền lại với nhau và thông mạch dẫn. Nếu không áp khít, mô mới không nối được, mắt/cành ghép sẽ không sống.' },
    ]
  ),

  'S9CN-w18-quiz': L(
    'Ôn tập học kì I',
    'Tuần 18 — tổng kết toàn bộ kiến thức HK1, gồm mô-đun điện dân dụng và phần đầu mô-đun trồng cây ăn quả. Đây là kì kiểm tra quan trọng.',
    ['Hệ thống lại kiến thức và kĩ năng của học kì I.', 'Luyện đề tổng hợp nhiều dạng.', 'Định hướng phương pháp ôn thi hợp lí.'],
    [
      { h: 'Cấu trúc kiến thức học kì I' },
      { p: 'Học kì I gồm hai mạch lớn: mô-đun "Lắp đặt mạng điện trong nhà" và phần mở đầu mô-đun "Trồng cây ăn quả". Ôn tập là dịp xâu chuỗi hai mạch này và rà soát phần còn yếu.' },
      { h: 'Trọng tâm — Mô-đun điện' },
      { ul: ['Vật liệu, dụng cụ, đặc biệt là VOM.', 'Mối nối và bọc cách điện.', 'Mạch bảng điện, đèn huỳnh quang, đèn 2 công tắc.', 'An toàn và kiểm tra mạng điện.'] },
      { h: 'Trọng tâm — Mô-đun cây ăn quả' },
      { ul: ['Giá trị và đặc điểm cây ăn quả.', 'Kĩ thuật trồng và chăm sóc.', 'Kĩ thuật ghép cây.'] },
      { h: 'Kĩ năng cần thành thạo' },
      { ul: ['Đọc và vẽ sơ đồ điện.', 'Chọn dây và thiết bị bảo vệ.', 'Mô tả quy trình kĩ thuật (nối dây, lắp mạch, trồng, ghép cây).', 'Phân tích và xử lí tình huống thực tế.'] },
      { h: 'Phương pháp ôn tập' },
      { ul: ['Tự lập sơ đồ tư duy theo từng mô-đun.', 'Làm đề thử có giới hạn thời gian.', 'Học theo cặp để kiểm tra chéo.', 'Hỏi thầy cô những điểm còn mơ hồ.'] },
      { h: 'Lưu ý khi làm bài kiểm tra' },
      { ul: ['Phân bố thời gian hợp lí, làm câu dễ trước.', 'Phần vẽ sơ đồ dùng kí hiệu chuẩn, có thước.', 'Câu tình huống viết đủ: nguyên nhân + cách khắc phục + bài học.'] },
      { note: 'Lớp 9 là năm bản lề thi vào 10 — mỗi điểm số đều có ý nghĩa cho học bạ, hãy ôn tập nghiêm túc và đều đặn.' },
    ],
    [
      { q: 'Em chưa nắm chắc phần vẽ sơ đồ. Em nên ôn như thế nào?', a: 'Vẽ lại 4–5 sơ đồ kinh điển: đèn 1 công tắc, đèn 2 công tắc, bảng điện cơ bản, mạch đèn huỳnh quang. Tự đối chiếu với đáp án và lặp lại đến khi vẽ đúng, thành thạo trong khoảng 5 phút mỗi sơ đồ.' },
      { q: 'Đề có câu mở: "Em sẽ làm gì để đảm bảo an toàn điện cho gia đình?". Em trả lời thế nào?', a: 'Liệt kê các biện pháp: kiểm tra dây và thiết bị định kì, lắp aptomat chống giật, dùng ổ cắm có nắp che, không cắm quá tải vào một ổ, nối đất cho thiết bị có vỏ kim loại, dạy trẻ nhỏ không sờ ổ cắm.' },
      { q: 'Đề yêu cầu so sánh nhân giống bằng hạt và bằng ghép cây. Em nêu những ý chính nào?', a: 'Gieo hạt: dễ làm, hệ số nhân cao nhưng cây con dễ biến dị, lâu cho quả. Ghép cây: giữ nguyên đặc tính giống tốt, nhanh cho quả, tăng sức chống chịu nhờ gốc ghép, nhưng đòi hỏi kĩ thuật cao hơn.' },
    ]
  ),

  'S9CN-w19-quiz': L(
    'Sửa xe đạp — Cấu tạo xe đạp',
    'Học kì 2 mở đầu với mô-đun thực dụng: sửa xe đạp. Là phương tiện thân quen của học sinh — biết sửa giúp tiết kiệm thời gian và tiền bạc.',
    ['Nêu được cấu tạo các bộ phận chính của xe đạp.', 'Hiểu chức năng của từng bộ phận.', 'Nhận biết các dụng cụ sửa xe cơ bản.'],
    [
      { h: 'Tổng quan về xe đạp' },
      { p: 'Xe đạp là phương tiện dùng sức người, hoạt động dựa trên việc truyền lực từ chân đạp qua hệ thống xích - đĩa - líp tới bánh xe. Hiểu cấu tạo giúp em biết bộ phận nào hỏng để sửa đúng chỗ.' },
      { h: 'Khung và bộ phận chịu lực' },
      { ul: ['Khung xe: bộ phận chính chịu lực và liên kết các bộ phận khác.', 'Phuộc (càng) trước: giữ bánh trước, gắn với ghi-đông.', 'Cổ phốt: nối khung với phuộc, cho phép xoay lái.'] },
      { h: 'Bánh xe' },
      { ul: ['Vành (niềng), nan hoa (đũa), moay-ơ (trục giữa bánh).', 'Lốp (vỏ) tiếp xúc mặt đường, có gai tạo độ bám.', 'Săm (ruột) chứa hơi, có van để bơm.'] },
      { h: 'Hệ thống truyền lực' },
      { p: 'Gồm bàn đạp, trục giữa, đĩa (bánh răng trước), xích và líp (bánh răng sau). Người đạp tác động vào bàn đạp làm quay đĩa, kéo xích quay líp và làm bánh sau lăn. Xe nhiều líp có thể thay đổi tỉ số truyền cho phù hợp địa hình.' },
      { h: 'Hệ thống lái và phanh' },
      { ul: ['Ghi-đông, cổ lái: điều khiển hướng đi.', 'Phanh trước, phanh sau, dây phanh, tay phanh: giảm tốc và dừng xe.'] },
      { h: 'Phụ kiện' },
      { ul: ['Yên xe, cọc yên: chỗ ngồi, điều chỉnh độ cao.', 'Chuông, đèn, baga, chắn bùn, chân chống.'] },
      { note: 'Bảo dưỡng định kì khoảng 6 tháng một lần: bơm hơi đúng áp, tra dầu xích, kiểm tra phanh và ốc — xe sẽ bền và an toàn hơn nhiều năm.' },
    ],
    [
      { q: 'Xe đạp đạp ngày càng nặng dù không hỏng gì rõ rệt. Lí do có thể là gì?', a: 'Thường do xích khô dầu, ổ trục bánh hoặc trục giữa bị bẩn - khô mỡ, và lốp non hơi. Tra dầu xích, vệ sinh - bảo dưỡng ổ trục và bơm hơi đúng áp suất là xe sẽ nhẹ trở lại.' },
      { q: 'Vì sao khi xuống dốc cần dùng phanh trước một cách cẩn thận?', a: 'Phanh trước hãm mạnh khi xuống dốc dễ làm bánh trước bị "khoá", quán tính đẩy người và xe lật về phía trước. Nên dùng phanh sau làm chính, phanh trước bóp nhẹ nhàng kết hợp cùng lúc.' },
      { q: 'Hệ thống truyền lực của xe đạp gồm những bộ phận nào và truyền lực ra sao?', a: 'Gồm bàn đạp, trục giữa, đĩa, xích và líp. Chân đạp vào bàn đạp làm quay đĩa, đĩa kéo xích, xích quay líp gắn ở bánh sau, nhờ đó bánh sau lăn và xe chuyển động.' },
    ]
  ),

  'S9CN-w20-quiz': L(
    'Sửa xe đạp — Tháo lắp bánh xe',
    'Tháo bánh là kĩ năng nền tảng để vá săm, thay lốp, sửa moay-ơ. Tuần này các em thực hành thao tác chuẩn.',
    ['Thực hiện được quy trình tháo và lắp bánh xe.', 'Sử dụng đúng dụng cụ tháo lắp.', 'Đảm bảo an toàn và kiểm tra phanh sau khi lắp.'],
    [
      { h: 'Vì sao cần biết tháo lắp bánh xe?' },
      { p: 'Hầu hết các sửa chữa thường gặp — vá săm, thay lốp, chỉnh nan hoa, bảo dưỡng moay-ơ — đều bắt đầu bằng việc tháo bánh ra. Tháo lắp đúng cách giúp không làm hỏng các bộ phận khác.' },
      { h: 'Chuẩn bị dụng cụ' },
      { ul: ['Mỏ lết hoặc cờ-lê đúng cỡ ốc trục (thường cỡ 15).', 'Khay đựng ốc, vít để không thất lạc.', 'Bộ que tháo lốp (2 que dẹt nhựa hoặc kim loại).', 'Giẻ lau, bơm.'] },
      { h: 'Quy trình tháo bánh sau' },
      { ul: ['Dựng xe ngược (bánh hướng lên) hoặc đặt lên giá.', 'Chuyển líp về nhông nhỏ nhất cho dễ tháo xích.', 'Nới lỏng ốc trục bánh ở cả hai bên.', 'Gỡ xích ra khỏi líp.', 'Rút bánh ra khỏi càng sau.'] },
      { h: 'Quy trình tháo bánh trước' },
      { ul: ['Mở má phanh hoặc nhả cần phanh nhanh (nếu có).', 'Nới lỏng ốc trục hai bên.', 'Rút bánh xuống khỏi càng trước.'] },
      { h: 'Quy trình lắp lại bánh' },
      { ul: ['Lắp ngược trình tự: đặt bánh vào càng, đưa xích vào đúng nhông líp.', 'Vặn ốc trục đều hai bên, căn bánh nằm chính giữa càng.', 'Quay thử bánh kiểm tra không đảo, không cọ vào càng/phanh.', 'Đóng lại phanh, bóp thử trước khi đi.'] },
      { h: 'An toàn khi tháo lắp' },
      { ul: ['Vặn ốc chặt đối xứng, không để lỏng một bên.', 'Cẩn thận với nan hoa và răng líp sắc.', 'Không quên gắn lại các chi tiết (long đen, chắn bùn).'] },
      { note: 'Luôn kiểm tra phanh sau khi lắp lại bánh — quên kiểm tra phanh là sai lầm phổ biến và rất dễ gây tai nạn.' },
    ],
    [
      { q: 'Tháo bánh sau khó hơn bánh trước ở điểm nào?', a: 'Bánh sau có xích và líp, nên phải gỡ xích cẩn thận, và khi lắp lại phải đưa xích vào đúng răng líp rồi căn xích vừa độ căng. Bánh trước không vướng xích nên đơn giản hơn.' },
      { q: 'Lắp bánh xong nhưng bánh quay bị đảo, lệch sang một bên. Em xử lí thế nào?', a: 'Ốc hai bên trục có thể chưa vặn đều, làm bánh lệch khỏi tâm càng. Nới ra, căn cho bánh nằm chính giữa rồi vặn chặt đối xứng. Nếu vẫn đảo, có thể nan hoa bị lệch (cong vành) thì cần chỉnh căng nan.' },
      { q: 'Vì sao trước khi tháo bánh sau nên chuyển líp về nhông nhỏ nhất?', a: 'Khi xích nằm ở nhông nhỏ nhất, xích chùng và xa khung nhất nên dễ gỡ ra và dễ đưa bánh ra - vào càng mà không bị vướng, lúc lắp lại cũng thuận hơn.' },
    ]
  ),

  'S9CN-w21-quiz': L(
    'Sửa xe đạp — Vá săm + thay lốp',
    'Săm bị thủng là sự cố phổ biến nhất khi đi xe đạp. Biết vá săm, các em sẽ không bị "đứng đường".',
    ['Thực hiện được quy trình vá săm đúng kĩ thuật.', 'Biết khi nào cần thay săm, thay lốp.', 'Hình thành kĩ năng xử lí sự cố cơ bản.'],
    [
      { h: 'Dụng cụ vá săm' },
      { ul: ['Bộ vá: keo, miếng vá, giấy nhám (ráp).', 'Que tháo lốp, bơm.', 'Chậu nước để tìm lỗ thủng.'] },
      { h: 'Quy trình vá săm' },
      { ul: ['Tháo bánh, dùng que nạy lốp, lấy săm ra.', 'Bơm căng săm, nhúng từng đoạn vào nước để tìm lỗ (xuất hiện bọt khí).', 'Đánh dấu lỗ thủng, lau khô, đánh giấy nhám quanh lỗ cho nhám.', 'Quét lớp keo mỏng quanh lỗ, đợi se mặt 30–60 giây.', 'Dán miếng vá lên, ép thật chặt và đợi vài phút cho keo bám.', 'Bơm thử lại trong nước để kiểm tra kín.', 'Lắp săm vào lốp, lắp lốp vào vành, bơm đủ hơi.'] },
      { h: 'Lưu ý quan trọng trước khi lắp lại' },
      { p: 'Phải kiểm tra bên trong lốp xem còn mảnh thuỷ tinh, đinh, gai nhọn không và lau sạch; kiểm tra cả vành xe (đầu nan hoa nhô ra). Nếu bỏ qua, vật nhọn còn lại sẽ tiếp tục đâm thủng săm mới.' },
      { h: 'Khi nào nên thay săm' },
      { ul: ['Săm có nhiều lỗ chồng chéo, vá nhiều lần.', 'Săm nứt dài, rạn vỏ, hỏng ở chân van.', 'Van bơm hỏng không thay được phần van.'] },
      { h: 'Khi nào nên thay lốp' },
      { ul: ['Lốp mòn hết gai, trơn nhẵn.', 'Lốp nứt sâu, rách, lòi lớp bố.', 'Lốp phồng rộp bất thường (dễ nổ).'] },
      { h: 'Bơm hơi đúng áp suất' },
      { p: 'Bơm theo áp suất ghi trên thành lốp. Lốp non quá làm săm dễ bị "cắn" thủng và xe nặng; lốp căng quá dễ nổ, nhất là khi trời nắng nóng.' },
      { note: 'Một bộ vá săm nhỏ và chiếc bơm mini mang theo người sẽ giúp em chủ động xử lí mọi sự cố thủng săm trên đường.' },
    ],
    [
      { q: 'Vá xong nhưng săm vẫn xì hơi. Lỗi có thể ở đâu?', a: 'Có thể còn một lỗ thủng thứ hai chưa tìm thấy; hoặc miếng vá chưa kín do bụi bẩn, keo chưa khô khi dán; hoặc rò ở chân van. Cần bơm và nhúng nước kiểm tra lại toàn bộ săm.' },
      { q: 'Vì sao phải kiểm tra bên trong lốp trước khi lắp săm mới vào?', a: 'Vì mảnh thuỷ tinh, đinh hay gai nhọn còn dính trong lốp sẽ tiếp tục đâm thủng săm mới ngay khi bơm căng. Phải lau và kiểm tra kĩ lòng lốp, lấy hết vật nhọn ra trước khi lắp.' },
      { q: 'Khi nào nên thay săm thay vì cố vá lại?', a: 'Khi săm có quá nhiều lỗ vá chồng chéo, bị nứt dài, rạn vỏ hoặc hỏng ở chân van. Lúc đó miếng vá không còn đảm bảo kín và bền, nên thay săm mới sẽ an toàn và tiết kiệm thời gian hơn.' },
    ]
  ),

  'S9CN-w22-quiz': L(
    'Sửa xe đạp — Hiệu chỉnh phanh, xích',
    'Phanh ăn và xích chuẩn quyết định độ an toàn và sự mượt mà của xe. Tuần này các em học cách tự chỉnh phanh và xích.',
    ['Hiệu chỉnh được phanh: căng dây, thay má phanh.', 'Hiệu chỉnh được xích: căng xích, tra dầu.', 'Hiểu nguyên tắc an toàn khi sửa và bảo dưỡng xe.'],
    [
      { h: 'Vì sao phải hiệu chỉnh phanh và xích?' },
      { p: 'Sau thời gian sử dụng, dây phanh giãn ra, má phanh mòn làm phanh kém ăn; xích bị chùng, khô dầu làm xe đạp nặng và dễ tuột xích. Hiệu chỉnh định kì giúp xe an toàn và vận hành êm.' },
      { h: 'Hiệu chỉnh phanh' },
      { ul: ['Kiểm tra má phanh: còn dày, không chai cứng, bề mặt không dính dầu.', 'Căng dây phanh bằng cách vặn ốc điều chỉnh ở tay phanh hoặc ở cụm phanh.', 'Chỉnh khoảng cách má phanh tới vành khoảng 2–3mm, đều hai bên.', 'Bóp thử: phanh phải ăn, khi nhả tay má phải tự tách ra, không kẹt.'] },
      { h: 'Thay má phanh' },
      { p: 'Khi má phanh mòn gần hết rãnh hoặc chai cứng, cần thay má mới. Tháo ốc giữ má, lắp má mới đúng chiều, canh sao cho má áp đều vào vành, không cọ vào lốp.' },
      { h: 'Hiệu chỉnh độ căng xích' },
      { ul: ['Xích chuẩn: nhấn đoạn xích giữa đĩa và líp, độ võng khoảng 10–15mm.', 'Căng xích: nới ốc trục bánh sau, kéo bánh về phía sau cho xích căng vừa, rồi vặn chặt lại.', 'Xích quá chùng dễ tuột; xích quá căng làm mòn nhanh đĩa, líp và nặng xe.'] },
      { h: 'Tra dầu, bảo dưỡng xích' },
      { ul: ['Làm sạch xích (lau bụi, đất bám) trước khi tra dầu.', 'Dùng dầu xích chuyên dụng, không dùng mỡ đặc.', 'Nhỏ dầu lên từng mắt xích, quay bàn đạp ngược cho dầu ngấm đều.', 'Lau bớt dầu thừa bên ngoài để không bám bụi.'] },
      { h: 'An toàn khi sửa xe' },
      { ul: ['Đặt xe vững trên giá hoặc dựng ngược chắc chắn.', 'Cẩn thận với răng đĩa, líp và nan hoa sắc.', 'Sau khi chỉnh, đạp thử và bóp phanh ở nơi an toàn trước khi đi đường.'] },
      { note: 'Nên bảo dưỡng xe đạp mỗi tháng một lần: làm sạch và tra dầu xích, chỉnh phanh, kiểm tra ốc — xe sẽ luôn vận hành tốt và an toàn.' },
    ],
    [
      { q: 'Em bóp phanh thấy lỏng và xe vẫn lao đi. Cách xử lí?', a: 'Trước hết vặn ốc điều chỉnh ở tay phanh (hoặc cụm phanh) để rút ngắn dây phanh cho má áp sát vành hơn. Nếu vẫn lỏng và phanh kém, có thể má phanh đã mòn hoặc chai cứng — cần thay má mới.' },
      { q: 'Xích bị đứt giữa đường. Em làm gì?', a: 'Dắt xe vào lề đường an toàn. Nếu có dụng cụ tháo - nối xích (cây tán chốt) và mắt nối thì nối lại; nếu không, dắt xe đến tiệm gần nhất hoặc nhờ người trợ giúp. Không cố đạp khi xích đã hỏng.' },
      { q: 'Vì sao xích quá căng lại có hại, dù nghe có vẻ "chắc chắn" hơn?', a: 'Xích quá căng làm tăng ma sát và lực kéo lên đĩa, líp, trục giữa, khiến các bộ phận này mòn nhanh, xe đạp nặng và dễ kêu. Xích cần độ võng khoảng 10–15mm để vận hành êm và bền.' },
    ]
  ),

  'S9CN-w23-quiz': L(
    'Nấu ăn — Vệ sinh an toàn thực phẩm',
    'Mô-đun "Chế biến thực phẩm" — kĩ năng sống cần thiết. Nguyên tắc số 1 luôn là vệ sinh an toàn thực phẩm.',
    ['Hiểu khái niệm vệ sinh an toàn thực phẩm.', 'Nắm được 5 nguyên tắc bảo đảm an toàn thực phẩm (WHO).', 'Biết nguyên nhân và cách phòng tránh ngộ độc thực phẩm.'],
    [
      { h: 'Vệ sinh an toàn thực phẩm là gì?' },
      { p: 'Là toàn bộ các điều kiện và biện pháp nhằm bảo đảm thực phẩm không gây hại cho sức khoẻ người dùng — từ khâu chọn nguyên liệu, sơ chế, chế biến, bảo quản đến khi sử dụng.' },
      { h: 'Vì sao thực phẩm có thể gây bệnh?' },
      { p: 'Thực phẩm có thể nhiễm vi khuẩn, virus, kí sinh trùng, hoá chất bảo vệ thực vật hoặc bị ôi thiu. Khi ăn phải, các tác nhân này gây tiêu chảy, nôn, đau bụng, gọi chung là ngộ độc thực phẩm.' },
      { h: '5 nguyên tắc của WHO' },
      { ul: ['Giữ sạch: rửa tay, dụng cụ, bề mặt chế biến.', 'Tách riêng thực phẩm sống và chín, dùng dao - thớt riêng.', 'Nấu kĩ: đủ nhiệt độ để tiêu diệt vi khuẩn.', 'Giữ thực phẩm ở nhiệt độ an toàn: nóng trên 60°C hoặc lạnh dưới 5°C.', 'Dùng nước sạch và nguyên liệu an toàn, rõ nguồn gốc.'] },
      { h: 'Nguyên nhân ngộ độc thực phẩm' },
      { ul: ['Vi sinh vật: vi khuẩn, virus, kí sinh trùng (Salmonella, E.coli...).', 'Độc tố tự nhiên: nấm độc, cá nóc, măng, sắn chế biến sai.', 'Hoá chất: thuốc trừ sâu, chất tẩy rửa, phụ gia cấm.', 'Thực phẩm ôi thiu, hư hỏng, quá hạn.'] },
      { h: 'Dấu hiệu thực phẩm hỏng' },
      { ul: ['Mùi lạ: chua, hôi, tanh khác thường.', 'Đổi màu bất thường, có lớp nhớt.', 'Mọc nấm mốc xanh, trắng.', 'Đồ hộp phồng nắp, móp méo; thực phẩm quá hạn.'] },
      { h: 'Xử lí khi bị ngộ độc' },
      { p: 'Nhẹ: nghỉ ngơi, uống nhiều nước/oresol bù điện giải, báo người lớn. Nặng (nôn liên tục, sốt cao, đau bụng dữ dội, đi ngoài ra máu): đưa ngay tới cơ sở y tế; giữ lại mẫu thức ăn nghi ngờ để bác sĩ xác định nguyên nhân.' },
      { note: 'Nguyên tắc vàng: nếu nghi ngờ thực phẩm không an toàn — không ăn. Sức khoẻ quý hơn việc tiếc một món ăn.' },
    ],
    [
      { q: 'Em chế biến gà sống xong rồi dùng luôn con dao đó cắt rau ăn sống. Có an toàn không?', a: 'Không. Vi khuẩn từ thịt gà sống (như Salmonella) sẽ lây sang rau sống và đi vào cơ thể. Phải rửa dao, thớt bằng nước nóng và xà phòng giữa hai công đoạn, hoặc tốt nhất dùng dao - thớt riêng cho đồ sống và đồ chín.' },
      { q: 'Cá để ngoài bàn cả ngày trời nóng. Có nên ăn không?', a: 'Không. Ở nhiệt độ phòng nóng (trên 5°C), vi khuẩn nhân lên rất nhanh; để quá vài giờ là nguy hiểm. Cá đã có thể ôi và sinh độc tố, phải bỏ đi.' },
      { q: 'Hãy nêu 5 nguyên tắc bảo đảm an toàn thực phẩm của WHO theo cách dễ nhớ.', a: 'Giữ sạch — Tách riêng sống/chín — Nấu kĩ — Giữ nhiệt độ an toàn (nóng trên 60°C, lạnh dưới 5°C) — Dùng nước và nguyên liệu sạch. Năm nguyên tắc này bao quát từ tay người nấu đến nguyên liệu và cách bảo quản.' },
    ]
  ),

  'S9CN-w24-quiz': L(
    'Nấu ăn — Phương pháp chế biến',
    'Hiểu các phương pháp chế biến giúp em chọn cách nấu phù hợp với từng nguyên liệu, vừa ngon vừa giữ được dinh dưỡng.',
    ['Phân loại được các phương pháp chế biến thực phẩm.', 'Nêu được ưu, nhược điểm của từng phương pháp.', 'Chọn được phương pháp phù hợp với từng loại nguyên liệu.'],
    [
      { h: 'Phân nhóm các phương pháp chế biến' },
      { p: 'Có hai nhóm lớn: chế biến có sử dụng nhiệt (làm chín bằng nước, hơi, dầu mỡ, nhiệt trực tiếp) và chế biến không sử dụng nhiệt (trộn, muối chua, lên men). Mỗi nhóm cho ra món ăn với hương vị và giá trị dinh dưỡng khác nhau.' },
      { h: 'Chế biến dùng nhiệt — bằng nước và hơi' },
      { ul: ['Luộc, nấu, ninh, hầm: làm chín bằng nước sôi.', 'Hấp: làm chín bằng hơi nước nóng, giữ được nhiều dinh dưỡng.', 'Kho: nấu trong nước sốt mặn ngọt, lửa nhỏ, lâu để thấm vị.'] },
      { h: 'Chế biến dùng nhiệt — bằng dầu mỡ và nhiệt trực tiếp' },
      { ul: ['Xào: đảo nhanh với ít dầu, lửa to.', 'Rán (chiên): ngập hoặc nhiều dầu, tạo lớp vỏ giòn.', 'Nướng, quay: làm chín bằng nhiệt trực tiếp từ than, lò.'] },
      { h: 'Chế biến không dùng nhiệt' },
      { ul: ['Trộn: gỏi, nộm, salad — giữ độ tươi và vitamin.', 'Muối, ngâm chua: dưa cải, dưa món.', 'Lên men: nem chua, sữa chua, mắm.'] },
      { h: 'Ưu, nhược điểm các phương pháp' },
      { ul: ['Luộc, hấp: giữ chất dinh dưỡng, ít dầu mỡ — tốt cho sức khoẻ.', 'Xào, rán: nhanh, ngon, hấp dẫn nhưng nhiều dầu, ăn nhiều không tốt.', 'Nướng: thơm đặc trưng nhưng nếu cháy đen có thể tạo chất gây hại.', 'Trộn: tươi, mát nhưng dễ nhiễm khuẩn nếu không bảo đảm vệ sinh.'] },
      { h: 'Chọn phương pháp phù hợp nguyên liệu' },
      { p: 'Rau xanh: luộc nhanh hoặc hấp để giữ vitamin. Thịt nạc, thịt già: nấu, hầm cho mềm. Thịt bò mềm: xào nhanh lửa to. Cá: hấp hoặc kho. Khoai, củ: luộc, nướng.' },
      { note: 'Người Việt có truyền thống "ăn nhiều rau, đủ thịt, đa dạng phương pháp" — đây là cách ăn cân đối và khoa học, nên giữ gìn.' },
    ],
    [
      { q: 'Em muốn nấu rau giữ được nhiều vitamin C nhất. Chọn cách nào?', a: 'Hấp, hoặc luộc nhanh trong nước đang sôi (1–3 phút) rồi vớt ra ngâm nước đá. Nên hạn chế cắt rau quá nhỏ trước khi nấu và không luộc quá lâu vì vitamin C dễ tan trong nước và bị phá huỷ bởi nhiệt.' },
      { q: 'Ăn nhiều đồ rán có tác hại gì?', a: 'Đồ rán nhiều dầu làm tăng năng lượng, dễ gây thừa cân, béo phì; dầu rán đi rán lại nhiều lần sinh ra chất độc; ăn nhiều đồ chiên rán làm tăng nguy cơ bệnh tim mạch và rối loạn mỡ máu.' },
      { q: 'Vì sao hấp thường giữ được nhiều dinh dưỡng hơn luộc?', a: 'Khi luộc, một phần vitamin và khoáng chất tan ra nước rồi bị đổ đi. Khi hấp, thực phẩm chỉ tiếp xúc với hơi nước nóng, ít chất dinh dưỡng bị hoà tan và thất thoát hơn, đồng thời giữ được vị ngọt tự nhiên.' },
    ]
  ),

  'S9CN-w25-quiz': L(
    'Nấu ăn — Xây dựng thực đơn gia đình',
    'Thực đơn hợp lí giúp gia đình ăn ngon, đủ chất và không lãng phí. Đây là kĩ năng nội trợ quan trọng.',
    ['Nắm được các nguyên tắc xây dựng thực đơn.', 'Biết cân đối dinh dưỡng theo tháp dinh dưỡng.', 'Lập được thực đơn một ngày cho gia đình.'],
    [
      { h: 'Thực đơn là gì?' },
      { p: 'Thực đơn là bảng ghi các món ăn dự định dùng trong một bữa hoặc trong ngày. Xây dựng thực đơn tốt giúp gia đình ăn đủ chất, đa dạng, ngon miệng và tiết kiệm chi phí.' },
      { h: 'Nguyên tắc xây dựng thực đơn' },
      { ul: ['Đủ chất: có tinh bột, đạm, béo, vitamin và khoáng.', 'Cân đối: tỉ lệ các nhóm chất phù hợp.', 'Đa dạng: thay đổi món, không lặp lại liên tục.', 'Phù hợp lứa tuổi, tình trạng sức khoẻ của các thành viên.', 'Hợp khẩu vị và hợp túi tiền của gia đình.', 'Hợp mùa, tận dụng thực phẩm theo mùa rẻ và tươi.'] },
      { h: 'Tháp dinh dưỡng' },
      { ul: ['Đỉnh tháp (ăn ít nhất): muối, đường, dầu mỡ.', 'Tiếp theo: sữa và chế phẩm từ sữa (vừa phải).', 'Nhóm đạm: thịt, cá, trứng, đậu (vừa phải).', 'Rau và trái cây (ăn nhiều).', 'Đáy tháp (ăn nhiều nhất): ngũ cốc, tinh bột.'] },
      { h: 'Cấu trúc bữa ăn truyền thống Việt' },
      { p: 'Bữa cơm Việt cân đối thường gồm: cơm (tinh bột) + món mặn kho/rán/xào (đạm, béo) + món rau luộc hoặc xào (vitamin, khoáng, chất xơ) + canh + tráng miệng bằng trái cây. Cách kết hợp này vừa ngon vừa cân đối.' },
      { h: 'Lập thực đơn một ngày' },
      { ul: ['Bữa sáng: bánh mì + trứng + sữa, hoặc xôi + giò, hoặc phở/bún.', 'Bữa trưa: cơm + canh + một món mặn + một món rau + tráng miệng.', 'Bữa tối: nhẹ hơn trưa, ưu tiên rau và đạm dễ tiêu.'] },
      { h: 'Sai lầm thường gặp' },
      { ul: ['Lặp một vài món suốt nhiều ngày.', 'Thiếu rau xanh, ít trái cây.', 'Lạm dụng đồ chiên rán, đồ ăn nhanh.', 'Không tính đến khẩu phần riêng cho trẻ em, người già, người bệnh.'] },
      { note: 'Học sinh đang lớn cần đủ đạm để phát triển và nhiều canxi cho xương — đừng bỏ bữa sáng và đừng ăn lệch.' },
    ],
    [
      { q: 'Em lập thực đơn bữa trưa cho gia đình 4 người (bố mẹ và 2 con). Em đề xuất gì?', a: 'Cơm trắng + canh chua cá lóc + thịt heo kho trứng + rau muống luộc + dưa hấu tráng miệng. Thực đơn này đủ tinh bột, đạm, vitamin và chất xơ, dễ ăn và phù hợp khẩu vị gia đình Việt.' },
      { q: 'Một gia đình ăn cơm với thịt rán và đậu rán mỗi bữa, rất ít rau. Em nhận xét và điều chỉnh thế nào?', a: 'Bữa ăn quá nhiều dầu mỡ và đạm, thiếu rau nên thiếu vitamin, chất xơ, dễ gây táo bón và rối loạn mỡ máu. Nên giảm món rán, thêm món luộc/hấp, bổ sung rau xanh và canh, có trái cây tráng miệng để cân đối hơn.' },
      { q: 'Khi xây dựng thực đơn, vì sao nên ưu tiên thực phẩm theo mùa?', a: 'Thực phẩm theo mùa thường tươi ngon hơn, giá rẻ hơn và ít phải dùng chất bảo quản. Nhờ đó vừa tiết kiệm chi phí cho gia đình, vừa an toàn và giàu dinh dưỡng.' },
    ]
  ),

  'S9CN-w26-quiz': L(
    'Nấu ăn — Thực hành: Món luộc + xào đơn giản',
    'Hai phương pháp căn bản nhất — luộc và xào — phù hợp cho người mới bắt đầu học nấu ăn.',
    ['Thực hiện đúng quy trình luộc rau.', 'Thực hiện đúng quy trình xào rau hoặc xào thịt.', 'Trình bày món ăn đẹp mắt và bảo đảm vệ sinh.'],
    [
      { h: 'Chuẩn bị chung trước khi nấu' },
      { ul: ['Rửa tay sạch, buộc gọn tóc, đeo tạp dề.', 'Chuẩn bị bếp, nồi, chảo, dao, thớt sạch.', 'Sơ chế nguyên liệu: rửa, nhặt, thái sẵn.'] },
      { h: 'Quy trình luộc rau xanh' },
      { ul: ['Rửa rau sạch, để ráo nước.', 'Đun nước thật sôi, cho thêm chút muối (hoặc vài giọt dầu).', 'Cho rau vào, đảo đều, đậy nắp hờ 1–3 phút tuỳ loại rau.', 'Vớt rau ra ngay; có thể ngâm nước đá 30 giây để giữ màu xanh.', 'Bày đĩa, ăn nóng.'] },
      { h: 'Quy trình xào rau hoặc xào thịt' },
      { ul: ['Sơ chế: thịt thái mỏng, ướp gia vị 5 phút; rau cắt vừa ăn.', 'Phi thơm tỏi với dầu nóng.', 'Cho thịt vào xào nhanh tay, chín tái thì xúc ra.', 'Xào rau riêng đến gần chín rồi đổ thịt vào đảo đều.', 'Nêm nếm vừa miệng, tắt bếp, bày đĩa.'] },
      { h: 'Mẹo nấu ngon' },
      { ul: ['Xào phải để lửa to, không xào lửa nhỏ kẻo rau ra nước.', 'Không xào hay luộc quá lâu khiến rau nhũn, thịt khô.', 'Nêm muối ở cuối để giữ độ giòn và màu của rau.'] },
      { h: 'Trình bày và vệ sinh sau nấu' },
      { p: 'Bày món lên đĩa sạch, gọn gàng, có thể trang trí thêm rau thơm. Sau khi nấu, rửa dụng cụ, lau bếp, đổ rác đúng nơi và rửa tay sạch.' },
      { h: 'An toàn khi nấu' },
      { ul: ['Cẩn thận với dao sắc, dầu nóng và bếp lửa.', 'Quay cán chảo vào trong để không vướng làm đổ.', 'Có người lớn giám sát khi mới tập nấu.'] },
      { note: 'Nấu ăn là sự rèn luyện — món đầu chưa ngon cũng không sao, rút kinh nghiệm thì lần sau sẽ tốt hơn.' },
    ],
    [
      { q: 'Em luộc rau muống nhưng rau bị vàng úa, không xanh. Em sai ở khâu nào?', a: 'Có thể do luộc quá lâu, không cho muối/dầu, hoặc đậy kín nắp làm rau "ngả màu". Lần sau: đun nước sôi to, cho ít muối, luộc 1–2 phút, không đậy kín, vớt ra và ngâm nhanh nước đá để giữ màu xanh.' },
      { q: 'Thịt bò xào bị dai. Cách khắc phục?', a: 'Thái thịt mỏng và cắt ngang thớ, ướp chút dầu ăn và bột bắp; để chảo thật nóng già rồi mới cho thịt vào, xào lửa to, đảo nhanh tay khoảng 1–2 phút là xúc ra. Xào lâu hoặc lửa nhỏ sẽ làm thịt bò ra nước và dai.' },
      { q: 'Vì sao khi luộc rau nên cho vào khi nước đã sôi mạnh, không cho từ lúc nước còn nguội?', a: 'Cho rau vào nước đang sôi mạnh giúp rau chín nhanh, giữ màu xanh và độ giòn, hạn chế vitamin bị hoà tan và phá huỷ. Nếu cho rau từ lúc nước nguội, thời gian rau ngâm trong nước nóng kéo dài làm rau nhũn và mất chất hơn.' },
    ]
  ),

  'S9CN-w27-quiz': L(
    'May mặc cơ bản — Đường khâu cơ bản',
    'Biết khâu vài đường cơ bản giúp các em tự đính lại cúc áo bị bung, vá quần áo rách — kĩ năng sống thiết thực và thân thiện môi trường.',
    ['Nhận biết các đường khâu cơ bản.', 'Thực hiện được khâu thường, khâu vắt.', 'Biết đính cúc và vá rách đơn giản.'],
    [
      { h: 'Vì sao nên biết khâu vá?' },
      { p: 'Quần áo dùng lâu sẽ bung cúc, sờn rách. Biết khâu vá đơn giản giúp em tự xử lí, tiết kiệm tiền và giảm rác thải dệt may — phù hợp với lối sống xanh, tiêu dùng bền vững.' },
      { h: 'Dụng cụ may cơ bản' },
      { ul: ['Kim khâu các cỡ.', 'Chỉ may nhiều màu (đỏ, đen, trắng, màu vải).', 'Kéo nhỏ.', 'Đê (vòng bảo vệ ngón tay khi đẩy kim).', 'Thước, phấn/bút sáp đánh dấu.'] },
      { h: 'Khâu thường (khâu tới)' },
      { p: 'Là đường khâu cơ bản nhất: đưa kim lên xuống đều tay tạo các mũi cách đều nhau. Dùng để lược tạm, khâu nối hai mảnh vải trước khi may máy hoặc may những đường ít chịu lực.' },
      { h: 'Khâu đột (đột mau, đột thưa)' },
      { p: 'Mũi đột chắc hơn khâu thường vì mỗi mũi đều lùi lại một đoạn rồi tiến lên. Đột mau cho đường chỉ kín, chắc; dùng cho đường may chịu lực như đũng quần, vai áo.' },
      { h: 'Khâu vắt' },
      { p: 'Là đường khâu giấu mép vải, mũi chỉ ở mặt phải rất nhỏ và kín. Dùng để khâu gấu áo, gấu quần, ống tay cho gọn và đẹp.' },
      { h: 'Đính cúc (khuy)' },
      { ul: ['Luồn chỉ đôi qua kim, thắt nút ở đuôi chỉ.', 'Đặt cúc đúng vị trí, châm kim từ mặt trong vải ra.', 'Khâu qua các lỗ cúc 5–7 lần (cúc 2 lỗ hoặc 4 lỗ).', 'Quấn chỉ quanh "cổ cúc" 2–3 vòng để cúc đứng vững.', 'Đâm kim sang mặt trong, thắt nút giấu mối.'] },
      { note: 'Kĩ năng khâu vá đơn giản giúp tiết kiệm quần áo và giảm rác thải dệt may — một việc nhỏ nhưng góp phần bảo vệ môi trường.' },
    ],
    [
      { q: 'Áo bị bung cúc giữa buổi học. Em xử lí thế nào?', a: 'Mượn (hoặc dùng) bộ kim chỉ nhỏ. Đính tạm cúc bằng vài mũi khâu qua hai lỗ cúc 5–6 lần, thắt nút chắc. Đính tạm này giữ được tới khi về nhà khâu lại cẩn thận hơn.' },
      { q: 'Vì sao khi đính cúc cần quấn chỉ quanh chân cúc tạo "cổ cúc"?', a: 'Quấn chỉ tạo một khoảng "cổ cúc" giúp cúc đứng cao hơn mặt vải một chút, nhờ đó dễ luồn cúc qua lỗ khuyết và đường chỉ bền hơn, cúc không bị giật bung khi cài.' },
      { q: 'Em cần vá một chỗ sờn ở đầu gối quần. Nên chọn đường khâu nào và vì sao?', a: 'Nên dùng khâu đột (đột mau) hoặc đặt một miếng vá rồi khâu đột vòng quanh, vì đầu gối là nơi chịu lực và cọ xát nhiều. Khâu đột chắc hơn khâu thường nên miếng vá bền, không bị bung khi cử động.' },
    ]
  ),

  'S9CN-w28-quiz': L(
    'Định hướng nghề nghiệp sau lớp 9',
    'Lớp 9 là ngã rẽ quan trọng — vào THPT, học nghề, hay học trường chuyên. Tuần này các em làm quen với hướng nghiệp một cách có hệ thống.',
    ['Hiểu vai trò và ý nghĩa của hướng nghiệp.', 'Nắm được các con đường học tập sau lớp 9.', 'Biết các yếu tố cần cân nhắc khi chọn hướng đi.'],
    [
      { h: 'Hướng nghiệp là gì và vì sao cần?' },
      { p: 'Hướng nghiệp là quá trình giúp em hiểu bản thân, hiểu thế giới nghề nghiệp để chọn được hướng học - nghề phù hợp với năng lực, sở thích và điều kiện của mình. Chọn đúng hướng ảnh hưởng lớn tới chất lượng cuộc sống lâu dài.' },
      { h: 'Các con đường sau lớp 9' },
      { ul: ['THPT công lập/tư thục: học tiếp 3 năm rồi thi đại học, cao đẳng.', 'Giáo dục thường xuyên (GDTX): vừa học vừa làm để lấy bằng THPT.', 'Trung cấp nghề: vừa học văn hoá vừa học nghề (3–4 năm).', 'Sơ cấp nghề: học nghề ngắn hạn rồi đi làm sớm.', 'Du học (nếu có điều kiện).'] },
      { h: 'Đặc điểm từng hướng' },
      { p: 'Học THPT rồi lên đại học mở rộng cơ hội nhưng kéo dài thời gian học. Học nghề giúp đi làm và có thu nhập sớm, phù hợp với người muốn học gắn với thực hành. Mỗi con đường đều có thể dẫn tới thành công nếu phù hợp và nỗ lực.' },
      { h: 'Yếu tố cần cân nhắc khi chọn' },
      { ul: ['Năng lực học tập của bản thân.', 'Sở thích, đam mê.', 'Điều kiện kinh tế gia đình.', 'Nhu cầu của xã hội với ngành nghề đó.', 'Tính cách có hợp với công việc tương lai không.'] },
      { h: 'Các bước tự định hướng' },
      { ul: ['Tự đánh giá điểm mạnh - yếu.', 'Tìm hiểu các nghề: nội dung, môi trường, thu nhập, triển vọng.', 'Tham vấn cha mẹ, thầy cô, người đang làm nghề.', 'Trải nghiệm: tham quan, làm thử, hoạt động trải nghiệm.', 'Đặt mục tiêu trung hạn (3–5 năm) và phương án dự phòng.'] },
      { note: 'Không có nghề "tốt nhất" cho tất cả mọi người — chỉ có nghề "phù hợp nhất" với từng người. Hãy chọn dựa trên hiểu biết về bản thân, không chạy theo phong trào.' },
    ],
    [
      { q: 'Bạn em học khá nhưng gia đình khó khăn. Em tư vấn hướng đi nào?', a: 'Vẫn nên thi vào THPT công lập vì chi phí thấp; đồng thời tìm học bổng, lớp học miễn phí để hỗ trợ. Nếu thực sự không đủ điều kiện theo lâu dài, học trung cấp nghề là lựa chọn tốt vì sớm có nghề và thu nhập, sau này vẫn có thể học liên thông.' },
      { q: 'Em yêu thích vẽ và muốn theo nghề mỹ thuật. Em nên chuẩn bị từ đâu?', a: 'Tự đánh giá năng lực qua các bài vẽ; tham gia câu lạc bộ mỹ thuật; tìm hiểu các trường mỹ thuật, kiến trúc, thiết kế; bắt đầu xây dựng bộ tranh (portfolio) cá nhân để phục vụ thi tuyển sau này.' },
      { q: 'Có bạn cho rằng "học nghề là kém hơn học THPT". Em nghĩ sao?', a: 'Không hẳn vậy. Học nghề và học THPT là hai con đường khác nhau, không có con đường nào "kém" hơn. Quan trọng là chọn đúng với năng lực, sở thích và hoàn cảnh. Người thợ giỏi tay nghề vẫn rất được trọng dụng và có thu nhập tốt.' },
    ]
  ),

  'S9CN-w29-quiz': L(
    'Một số ngành nghề phổ biến hiện nay',
    'Hiểu bức tranh nghề nghiệp hiện đại giúp các em không bị "đóng khung" theo những hình dung cũ về nghề.',
    ['Nắm được các nhóm nghề chính trong xã hội.', 'Biết một số xu hướng nghề của tương lai.', 'Có thông tin cơ bản về một số nghề tiêu biểu.'],
    [
      { h: 'Vì sao cần hiểu các nhóm nghề?' },
      { p: 'Xã hội có hàng nghìn nghề khác nhau và luôn xuất hiện nghề mới. Biết phân nhóm nghề giúp em định vị được nghề mình quan tâm và hình dung con đường học tập phù hợp.' },
      { h: 'Phân nhóm nghề' },
      { ul: ['Khoa học - công nghệ: kĩ sư, lập trình viên, nhà nghiên cứu.', 'Kinh tế - kinh doanh: kế toán, marketing, ngân hàng.', 'Y tế - chăm sóc sức khoẻ: bác sĩ, điều dưỡng, dinh dưỡng.', 'Giáo dục: giáo viên, nhà nghiên cứu giáo dục.', 'Nghệ thuật - truyền thông: thiết kế, đạo diễn, dẫn chương trình.', 'Dịch vụ: du lịch, nhà hàng, bán lẻ.', 'Lao động kĩ thuật: thợ điện, thợ cơ khí, thợ xây, đầu bếp.'] },
      { h: 'Xu hướng nghề của tương lai' },
      { ul: ['Công nghệ thông tin: trí tuệ nhân tạo, dữ liệu lớn, an ninh mạng.', 'Năng lượng tái tạo: điện mặt trời, điện gió.', 'Y tế và chăm sóc người cao tuổi.', 'Sáng tạo nội dung số.', 'Tâm lí học, công tác xã hội.'] },
      { h: 'Nghề "truyền thống" vẫn quan trọng' },
      { p: 'Nông nghiệp công nghệ cao, thợ thủ công lành nghề, đầu bếp giỏi, giáo viên, nhân viên y tế... luôn cần thiết và không lỗi thời, dù xã hội thay đổi.' },
      { h: 'Cách tìm hiểu một nghề' },
      { ul: ['Nội dung công việc hằng ngày.', 'Môi trường và điều kiện làm việc.', 'Yêu cầu trình độ và kĩ năng.', 'Mức thu nhập và cơ hội thăng tiến.'] },
      { note: 'Không có nghề "thấp kém" — chỉ có người làm nghề chưa phát huy hết khả năng. Mọi nghề lương thiện đều đáng quý.' },
    ],
    [
      { q: 'AI sẽ thay thế những nghề nào? Em nên chọn nghề ra sao để "an toàn"?', a: 'AI dễ thay thế các công việc lặp lại, theo quy tắc (nhập liệu, một phần kế toán cơ bản). Những nghề cần sáng tạo, đồng cảm, ra quyết định phức tạp hay kĩ năng tay nghề cao thì khó thay thế: giáo viên, bác sĩ, nghệ sĩ, thợ thủ công, kĩ sư đầu ngành. Quan trọng là rèn năng lực số để làm việc cùng AI.' },
      { q: 'Bạn em muốn theo nghề "sáng tạo nội dung số" (YouTuber). Em nghĩ thế nào?', a: 'Đó là một nghề thật sự nhưng đòi hỏi nhiều kĩ năng: lên ý tưởng, viết kịch bản, quay - dựng phim, marketing, kiên trì. Nên học song song với chương trình văn hoá để có nền tảng vững. Những người làm nội dung thành công đều tự học rất nhiều.' },
      { q: 'Vì sao nói "nghề truyền thống vẫn quan trọng" trong thời đại công nghệ?', a: 'Vì dù công nghệ phát triển, con người vẫn cần ăn uống, chăm sóc sức khoẻ, học hành, nhà ở... Các nghề như nông nghiệp, đầu bếp, y tá, thợ kĩ thuật, giáo viên vẫn thiết yếu. Hơn nữa, công nghệ chỉ hỗ trợ chứ không thay thế hoàn toàn tay nghề và sự tận tâm của con người.' },
    ]
  ),

  'S9CN-w30-quiz': L(
    'Năng lực số trong thời đại mới',
    'Năng lực số là yêu cầu gần như bắt buộc của mọi nghề trong thế kỉ 21. Hiểu rõ giúp em chủ động rèn luyện.',
    ['Hiểu khái niệm năng lực số.', 'Biết các thành phần của năng lực số.', 'Có ý thức rèn luyện năng lực số liên tục.'],
    [
      { h: 'Năng lực số là gì?' },
      { p: 'Năng lực số là khả năng sử dụng công nghệ số một cách tự tin, an toàn, sáng tạo và có trách nhiệm để học tập, làm việc và tham gia đời sống xã hội. Đây là một năng lực quan trọng mà chương trình GDPT 2018 hướng tới.' },
      { h: 'Vì sao năng lực số quan trọng?' },
      { p: 'Hầu hết công việc hiện nay đều cần dùng máy tính, internet, phần mềm. Người có năng lực số làm việc hiệu quả hơn, học nhanh hơn và tự bảo vệ được mình trên không gian mạng.' },
      { h: 'Các thành phần của năng lực số' },
      { ul: ['Khai thác thông tin và dữ liệu: tìm, đánh giá, lưu trữ thông tin.', 'Giao tiếp và hợp tác qua môi trường số.', 'Sáng tạo nội dung số: soạn thảo, làm hình ảnh, video, lập trình.', 'An toàn số: bảo vệ thiết bị, dữ liệu, sức khoẻ và bản thân trên mạng.', 'Giải quyết vấn đề bằng công cụ số.'] },
      { h: 'Cách rèn luyện năng lực số' },
      { ul: ['Học gõ phím 10 ngón thành thạo.', 'Sử dụng tốt Word, Excel, PowerPoint.', 'Biết tìm kiếm và chọn lọc thông tin đáng tin cậy.', 'Học cách dùng công cụ AI như một trợ lí học tập.', 'Tìm hiểu kiến thức cơ bản về lập trình.', 'Biết bảo vệ tài khoản, mật khẩu và dữ liệu cá nhân.'] },
      { h: 'An toàn và đạo đức trên không gian số' },
      { ul: ['Không chia sẻ thông tin cá nhân bừa bãi.', 'Kiểm chứng thông tin trước khi tin và lan truyền.', 'Tôn trọng bản quyền, không sao chép trái phép.', 'Ứng xử văn minh, không bắt nạt trên mạng.'] },
      { note: 'Năng lực số không phải là "biết lướt TikTok" — đó là biết tạo ra giá trị và học tập hiệu quả bằng công nghệ, đồng thời tự bảo vệ mình trên mạng.' },
    ],
    [
      { q: 'Em dùng mạng xã hội nhiều giờ mỗi ngày nhưng học chưa tốt. Em đã có năng lực số cao chưa?', a: 'Chưa hẳn. Dùng nhiều không đồng nghĩa với năng lực số cao. Năng lực số thể hiện ở việc tìm được thông tin học tập hữu ích, tạo ra nội dung, hợp tác qua công cụ số và biết bảo vệ thông tin cá nhân — chứ không phải ở thời gian giải trí.' },
      { q: 'AI có thể làm bài hộ em. Vậy em có cần học nữa không?', a: 'Vẫn cần học rất nhiều. AI là công cụ, không thay được kiến thức nền và tư duy phản biện của em. Phải có hiểu biết thì mới dùng AI hiệu quả, kiểm tra được AI đúng hay sai, và không bị lệ thuộc hay bị AI dẫn dắt nhầm.' },
      { q: 'Một thông tin "giật gân" được chia sẻ nhiều trên mạng. Em nên làm gì trước khi tin và chia sẻ lại?', a: 'Em nên kiểm chứng: xem nguồn có đáng tin không, đối chiếu với báo chí chính thống, kiểm tra ngày đăng và bằng chứng. Chỉ tin và chia sẻ khi đã xác minh, tránh lan truyền tin giả gây hoang mang — đó là biểu hiện của năng lực số có trách nhiệm.' },
    ]
  ),

  'S9CN-w31-quiz': L(
    'Khởi nghiệp và tinh thần doanh nhân',
    'Tinh thần doanh nhân không chỉ là mở công ty — đó là tư duy chủ động, sáng tạo và dám chịu trách nhiệm trong mọi công việc.',
    ['Hiểu khái niệm khởi nghiệp.', 'Nắm được các đặc điểm của tinh thần doanh nhân.', 'Có ý thức rèn luyện tinh thần doanh nhân ngay từ khi còn đi học.'],
    [
      { h: 'Khởi nghiệp là gì?' },
      { p: 'Khởi nghiệp (startup) là quá trình tạo ra một sản phẩm, dịch vụ mới để giải quyết một vấn đề trong xã hội, thường gắn với đổi mới sáng tạo và chấp nhận rủi ro. Khởi nghiệp có thể bắt đầu từ một ý tưởng rất nhỏ.' },
      { h: 'Tinh thần doanh nhân' },
      { ul: ['Chủ động, không chờ được giao việc.', 'Sáng tạo, dám thử cái mới.', 'Chịu trách nhiệm về kết quả công việc.', 'Học hỏi không ngừng.', 'Biết hợp tác và làm việc nhóm.', 'Không sợ thất bại — coi thất bại là bài học.'] },
      { h: 'Vì sao học sinh nên có tinh thần doanh nhân?' },
      { p: 'Không phải ai cũng sẽ mở công ty, nhưng tinh thần chủ động, sáng tạo, dám chịu trách nhiệm giúp em làm tốt bất kì công việc nào và thích nghi với một thế giới thay đổi nhanh.' },
      { h: 'Học sinh rèn tinh thần doanh nhân từ đâu?' },
      { ul: ['Tự lên kế hoạch và phân công trong hoạt động lớp.', 'Tham gia dự án nhỏ: gian hàng ngày hội, bán hàng gây quỹ từ thiện.', 'Tham gia câu lạc bộ sáng tạo, khởi nghiệp học đường.', 'Đọc sách, xem câu chuyện về doanh nhân.'] },
      { h: 'Một số doanh nhân Việt tiêu biểu' },
      { ul: ['Phạm Nhật Vượng (Vingroup).', 'Trương Gia Bình (FPT).', 'Nguyễn Hà Đông (tác giả Flappy Bird).'] },
      { note: 'Không phải ai cũng cần khởi nghiệp, nhưng ai cũng cần tinh thần doanh nhân ngay trong công việc và học tập thường ngày.' },
    ],
    [
      { q: 'Em không có vốn, có thể khởi nghiệp được không?', a: 'Được. Khởi nghiệp của học sinh có thể bắt đầu từ ý tưởng và sức lao động: dạy kèm em nhỏ, làm đồ thủ công bán, làm bánh bán cho lớp, viết nội dung phụ giúp việc kinh doanh của gia đình. Vốn ban đầu chính là thời gian, công sức và sự sáng tạo.' },
      { q: 'Khởi nghiệp khác làm thuê ở những điểm nào?', a: 'Làm thuê: được trả lương ổn định, rủi ro thấp, có người hướng dẫn. Khởi nghiệp: tự quyết định, lợi nhuận có thể cao nhưng rủi ro lớn, phải tự học mọi thứ. Không hướng nào hơn tuyệt đối — tuỳ tính cách và hoàn cảnh mỗi người.' },
      { q: 'Vì sao "không sợ thất bại" lại là một phẩm chất của tinh thần doanh nhân?', a: 'Vì khởi nghiệp và mọi việc mới đều có thể thất bại. Người có tinh thần doanh nhân coi thất bại là bài học để điều chỉnh và làm tốt hơn, thay vì bỏ cuộc. Nhờ dám thử và rút kinh nghiệm, họ mới tiến bộ và thành công.' },
    ]
  ),

  'S9CN-w32-quiz': L(
    'An toàn lao động — Trong nhà và sản xuất',
    'Tuần này các em học các nguyên tắc an toàn lao động — kĩ năng giữ tính mạng, sức khoẻ cho bản thân và những người xung quanh.',
    ['Hiểu khái niệm an toàn lao động.', 'Biết các nguyên tắc an toàn tại nhà và nơi làm việc.', 'Biết một số cách sơ cứu cơ bản.'],
    [
      { h: 'An toàn lao động là gì?' },
      { p: 'An toàn lao động là tổng thể các biện pháp bảo vệ người lao động khỏi tai nạn và bệnh nghề nghiệp trong quá trình làm việc — từ phương tiện bảo hộ, quy trình kĩ thuật tới ý thức tuân thủ.' },
      { h: 'Vì sao phải quan tâm an toàn lao động?' },
      { p: 'Tai nạn lao động và tai nạn sinh hoạt có thể để lại hậu quả nặng nề: thương tật, mất sức lao động, thậm chí tử vong. Phòng ngừa luôn rẻ và tốt hơn nhiều so với khắc phục hậu quả.' },
      { h: 'An toàn tại nhà' },
      { ul: ['An toàn điện: không dùng tay ướt cắm - rút phích.', 'An toàn bếp: tắt gas khi không dùng, có bình chữa cháy.', 'An toàn dụng cụ: dao, kéo cất đúng chỗ, xa tầm trẻ em.', 'An toàn hoá chất: không trộn lẫn các chất tẩy rửa, để xa thực phẩm.'] },
      { h: 'An toàn nơi làm việc' },
      { ul: ['Đeo đầy đủ bảo hộ lao động (mũ, kính, găng, giày).', 'Tuân thủ đúng quy trình kĩ thuật.', 'Không làm việc khi mệt mỏi, buồn ngủ, sử dụng rượu bia.', 'Báo ngay sự cố cho người quản lí.'] },
      { h: 'Sơ cứu cơ bản' },
      { ul: ['Điện giật: cắt nguồn rồi mới tách nạn nhân ra bằng vật cách điện.', 'Bỏng: ngâm chỗ bỏng vào nước mát 15–20 phút, không bôi mẹo dân gian.', 'Chảy máu: ép giữ vết thương, băng lại.', 'Gãy xương: cố định tạm, không nắn, gọi 115.'] },
      { h: 'Quyền và nghĩa vụ về an toàn lao động' },
      { p: 'Theo quy định, người sử dụng lao động phải đào tạo an toàn và cung cấp phương tiện bảo hộ; người lao động phải tuân thủ quy trình an toàn. An toàn là quyền và cũng là trách nhiệm của mỗi người.' },
      { note: 'Khẩu lệnh nhớ khi gặp người bị điện giật: "Cắt nguồn trước, cứu người sau" — lao vào cứu khi còn điện thì người cứu cũng bị giật theo.' },
    ],
    [
      { q: 'Em thấy bạn bị điện giật. Phản ứng đúng là gì?', a: 'Tuyệt đối không chạm trực tiếp vào bạn vì sẽ bị giật theo. Trước hết cắt aptomat hoặc rút phích cắm. Nếu chưa cắt được nguồn, dùng vật cách điện (cán chổi gỗ khô, dây thừng) gạt bạn ra khỏi nguồn điện, rồi gọi cấp cứu 115.' },
      { q: 'Bị bỏng nhẹ ngón tay khi nấu ăn. Em xử lí thế nào?', a: 'Đưa ngay ngón tay vào dưới vòi nước mát chảy trong 15–20 phút để hạ nhiệt. Không bôi kem đánh răng, nước mắm hay các "mẹo dân gian" vì dễ làm nhiễm trùng. Sau đó có thể bôi gel bỏng hoặc băng nhẹ; nếu bỏng nặng thì tới cơ sở y tế.' },
      { q: 'Vì sao trước khi làm việc trong xưởng cơ khí hay công trình, người lao động phải được đào tạo an toàn?', a: 'Vì mỗi môi trường lao động có nguy cơ riêng (máy móc, điện, vật rơi, hoá chất). Được đào tạo giúp người lao động biết cách phòng tránh, dùng đúng bảo hộ và xử lí sự cố, nhờ đó giảm tai nạn và bảo vệ tính mạng cho mình và đồng nghiệp.' },
    ]
  ),

  'S9CN-w33-quiz': L(
    'Ôn tập HK2 — Thực hành tổng hợp',
    'Tuần ôn HK2 — tổng kết các mô-đun sửa xe đạp, chế biến thực phẩm, may mặc và định hướng nghề nghiệp.',
    ['Hệ thống lại các nội dung của học kì II.', 'Vận dụng kiến thức vào tình huống thực tế.', 'Sẵn sàng cho kì thi cuối cấp.'],
    [
      { h: 'Mục đích ôn tập' },
      { p: 'Học kì II gồm nhiều mô-đun gắn với cuộc sống. Tuần ôn tập giúp em xâu chuỗi các kĩ năng, củng cố phần còn yếu và làm quen với dạng đề tổng hợp.' },
      { h: 'Trọng tâm — Sửa xe đạp' },
      { ul: ['Cấu tạo và chức năng các bộ phận.', 'Tháo lắp bánh xe.', 'Vá săm, thay lốp.', 'Hiệu chỉnh phanh và xích.'] },
      { h: 'Trọng tâm — Chế biến thực phẩm' },
      { ul: ['Vệ sinh an toàn thực phẩm (5 nguyên tắc WHO).', 'Các phương pháp chế biến và ưu, nhược điểm.', 'Xây dựng thực đơn cân đối.', 'Thực hành món luộc, xào.'] },
      { h: 'Trọng tâm — May mặc và hướng nghiệp' },
      { ul: ['Các đường khâu cơ bản, đính cúc.', 'Con đường sau lớp 9, các nhóm nghề, xu hướng nghề.', 'Năng lực số, tinh thần doanh nhân.', 'An toàn lao động và sơ cứu.'] },
      { h: 'Dạng đề thường gặp' },
      { ul: ['Lí thuyết: nêu khái niệm, phân loại, quy trình.', 'Tình huống: xử lí sự cố thực tế.', 'Sáng tạo: lập thực đơn, lập kế hoạch hướng nghiệp.', 'Mô tả quy trình thực hành.'] },
      { h: 'Mẹo ôn thi' },
      { ul: ['Học theo sơ đồ tư duy từng mô-đun.', 'Tự diễn lại các quy trình thực hành đã làm.', 'Liên hệ kiến thức với việc thường ngày trong gia đình.'] },
      { note: 'Môn Công nghệ rất "thật" — kiến thức đã học sẽ dùng được ngay trong cuộc sống, nên ôn tập bằng cách thực hành lại sẽ nhớ lâu nhất.' },
    ],
    [
      { q: 'Đề: "Em hãy lập thực đơn một ngày cho gia đình với chi phí dưới 200.000đ". Em tiếp cận thế nào?', a: 'Liệt kê 3 bữa: sáng đơn giản (xôi/bánh mì + sữa), trưa cơm + canh + một mặn + một rau, tối nhẹ hơn. Ước tính chi phí từng nguyên liệu theo giá chợ và cộng lại cho dưới 200.000đ. Bảo đảm đủ 4 nhóm chất và đa dạng món.' },
      { q: 'Đề: "Phân tích con đường sau lớp 9 phù hợp với em". Em trả lời ra sao?', a: 'Tự đánh giá điểm mạnh, điểm yếu, sở thích; nêu con đường định chọn (THPT hoặc trung cấp nghề) kèm lí do; trình bày kế hoạch cho 3 năm tới; và nêu phương án dự phòng nếu không đỗ trường đầu tiên.' },
      { q: 'Đề tình huống: "Đang đạp xe đi học thì săm bị thủng giữa đường". Em trình bày cách xử lí.', a: 'Dắt xe vào lề an toàn. Nếu mang theo bộ vá và bơm thì tháo bánh, tìm lỗ, vá săm theo đúng quy trình, kiểm tra lòng lốp rồi lắp lại bơm hơi. Nếu không có dụng cụ, dắt xe tới tiệm gần nhất hoặc nhờ trợ giúp; lần sau nên mang theo bộ vá nhỏ và bơm mini.' },
    ]
  ),

  'S9CN-w34-quiz': L(
    'Đánh giá năng lực bản thân và lập kế hoạch nghề nghiệp',
    'Kết tinh của môn Công nghệ lớp 9 — biết mình, biết nghề và lập được một kế hoạch nghề nghiệp khả thi.',
    ['Tự đánh giá được điểm mạnh - điểm yếu của bản thân.', 'Lập được kế hoạch nghề nghiệp ngắn hạn và trung hạn.', 'Có thái độ chủ động, tích cực với tương lai.'],
    [
      { h: 'Vì sao phải tự đánh giá bản thân?' },
      { p: 'Chọn nghề trước hết phải hiểu chính mình. Tự đánh giá đúng điểm mạnh, điểm yếu, sở thích và giá trị giúp em chọn được hướng đi phù hợp, tránh chạy theo người khác rồi hối tiếc.' },
      { h: 'Các khía cạnh cần tự đánh giá' },
      { ul: ['Sở thích: làm việc gì em thấy hứng thú, không biết chán?', 'Năng lực: môn nào em học tốt? Em mạnh về tay nghề hay tư duy?', 'Tính cách: hướng nội hay hướng ngoại, thích làm một mình hay theo nhóm?', 'Giá trị: điều gì quan trọng nhất với em — thu nhập, sáng tạo, ổn định, giúp người?'] },
      { h: 'Tìm hiểu nghề một cách đầy đủ' },
      { ul: ['Nội dung công việc thực tế hằng ngày.', 'Môi trường và điều kiện làm việc.', 'Thu nhập trung bình.', 'Yêu cầu về học vấn, kĩ năng.', 'Triển vọng phát triển của nghề.'] },
      { h: 'Lập kế hoạch nghề nghiệp' },
      { ul: ['Mục tiêu dài hạn: nghề mơ ước trong khoảng 10 năm tới.', 'Mục tiêu trung hạn: 3–5 năm — học xong THPT hay học nghề gì?', 'Mục tiêu ngắn hạn: 6–12 tháng — thi đỗ trường nào, học gì?', 'Hành động cụ thể từng tháng để tiến tới mục tiêu.'] },
      { h: 'Tính linh hoạt của kế hoạch' },
      { p: 'Kế hoạch nghề nghiệp có thể điều chỉnh khi em trưởng thành và hiểu mình hơn. Quan trọng là có kế hoạch để bắt đầu và hành động, chứ không phải để gò bó mình một cách cứng nhắc.' },
      { note: 'Đừng ngại chọn sai — sai lầm khi định hướng nghề ở tuổi 14–15 vẫn còn dễ sửa hơn nhiều so với ở tuổi 24–25.' },
    ],
    [
      { q: 'Em chưa biết mình thích nghề gì. Em nên làm gì?', a: 'Bắt đầu bằng cách loại trừ những nghề chắc chắn không thích. Trải nghiệm nhiều hoạt động (câu lạc bộ, tình nguyện, công việc nhỏ), đọc thông tin về các nghề và trò chuyện với người đang làm nghề. Qua thời gian, sở thích và thế mạnh của em sẽ rõ dần.' },
      { q: 'Bố mẹ muốn em làm bác sĩ, nhưng em lại thích vẽ. Em xử lí thế nào?', a: 'Tôn trọng mong muốn của bố mẹ nhưng thẳng thắn chia sẻ sở thích và thế mạnh của mình. Có thể tìm điểm chung như thiết kế y khoa, minh hoạ khoa học. Quan trọng là chứng minh em nghiêm túc với lựa chọn của mình bằng kết quả học tập và sự chuẩn bị cụ thể.' },
      { q: 'Vì sao kế hoạch nghề nghiệp nên có cả mục tiêu ngắn hạn lẫn dài hạn?', a: 'Mục tiêu dài hạn cho em một hướng đi và động lực; mục tiêu ngắn hạn chia nhỏ con đường thành những bước cụ thể, dễ thực hiện và dễ kiểm tra. Có cả hai, em vừa biết mình đi đâu vừa biết phải làm gì ngay bây giờ.' },
    ]
  ),

  'S9CN-w35-quiz': L(
    'Tổng kết môn — Liên hệ thực tế',
    'Tuần cuối cùng — nhìn lại hành trình một năm và mang kiến thức Công nghệ vào cuộc sống hằng ngày của bản thân.',
    ['Tổng kết các kiến thức và kĩ năng đã học cả năm.', 'Vận dụng vào tình huống trong gia đình.', 'Hình thành ý thức học tập và rèn luyện suốt đời.'],
    [
      { h: 'Nhìn lại các mạch kiến thức cả năm' },
      { ul: ['Điện dân dụng: vật liệu, dụng cụ, mối nối, mạch điện, an toàn và kiểm tra.', 'Trồng cây ăn quả: giá trị, kĩ thuật trồng - chăm sóc, ghép cây.', 'Sửa xe đạp: cấu tạo, tháo lắp bánh, vá săm, chỉnh phanh - xích.', 'Chế biến thực phẩm: vệ sinh, phương pháp chế biến, thực đơn.', 'May mặc: các đường khâu, đính cúc.', 'Hướng nghiệp: định hướng, ngành nghề, năng lực số, kế hoạch nghề.'] },
      { h: 'Giá trị của môn Công nghệ' },
      { p: 'Khác với nhiều môn học, kiến thức Công nghệ 9 có thể áp dụng ngay trong cuộc sống: tự sửa điện, chăm cây, bảo dưỡng xe, nấu ăn, khâu vá và định hướng nghề. Đây là những kĩ năng sống thiết thực.' },
      { h: 'Vận dụng vào gia đình' },
      { ul: ['Thay bóng đèn, kiểm tra ổ cắm an toàn giúp gia đình.', 'Chăm cây trong vườn cùng bố mẹ.', 'Tự bảo dưỡng chiếc xe đạp đi học.', 'Nấu giúp gia đình 1–2 bữa mỗi tuần.', 'Khâu lại nút áo, vá đồ cho em.', 'Trao đổi với cha mẹ về định hướng nghề của mình.'] },
      { h: 'Học tập suốt đời' },
      { p: 'Công nghệ thay đổi không ngừng — kĩ năng hôm nay có thể cần cập nhật ngày mai. Điều quan trọng nhất em mang theo không chỉ là kiến thức cụ thể, mà là thói quen tự học, dám thử cái mới và làm việc an toàn.' },
      { h: 'Lời chia tay' },
      { p: 'Môn Công nghệ lớp 9 khép lại, nhưng các kĩ năng đã học sẽ theo các em suốt cuộc đời. Chúc các em vững vàng bước vào kì thi và chặng đường học tập, nghề nghiệp phía trước.' },
      { note: '"Học một biết mười" — kiến thức công nghệ là nền tảng để các em tự học mọi kĩ năng mới sau này.' },
    ],
    [
      { q: 'Em đã học sửa xe đạp. Em sẽ áp dụng kiến thức đó thế nào trong cuộc sống?', a: 'Tự bảo dưỡng xe đi học mỗi tháng (tra dầu xích, chỉnh phanh, bơm hơi); giúp bạn bè, em nhỏ khi xe hỏng; hướng dẫn lại cho em ruột. Đây cũng có thể trở thành một việc tay trái hữu ích khi cần.' },
      { q: 'Em sẽ tiếp tục rèn năng lực nghề nghiệp như thế nào sau lớp 9?', a: 'Tham gia câu lạc bộ chuyên môn; tự học qua sách và các khoá học trực tuyến; tìm người hướng dẫn (mentor); xin trải nghiệm thực tế qua làm thêm, hoạt động trải nghiệm; cập nhật xu hướng nghề và rèn năng lực số đều đặn.' },
      { q: 'Theo em, điều quý giá nhất mà môn Công nghệ 9 để lại là gì?', a: 'Không chỉ là các kĩ năng cụ thể như sửa điện, nấu ăn hay sửa xe, mà còn là thái độ chủ động, cẩn thận, an toàn và thói quen tự học. Những điều này giúp em tự tin xoay xở trong cuộc sống và sẵn sàng học những kĩ năng mới sau này.' },
    ]
  ),

  'S9CN-w36-quiz': L(
    'Kết thúc Công nghệ THCS — Đôi tay tạo nên tương lai',
    'Tuần cuối của năm học — cô muốn cùng các em nhìn lại hành trình Công nghệ THCS và khám phá xem những kĩ năng thực hành này sẽ dẫn chúng ta đến đâu.',
    [
      'Hệ thống hoá các mạch kĩ năng thực hành đã học trong chương trình THCS.',
      'Nhận ra giá trị của kĩ năng nghề và tư duy kĩ thuật trong cuộc sống hiện đại.',
      'Định hướng học tập và nghề nghiệp liên quan đến công nghệ ở THPT và sau này.',
    ],
    [
      { h: 'Bốn năm Công nghệ THCS — Bản đồ kĩ năng' },
      { ul: [
        'Lớp 6: Nông nghiệp, nuôi trồng — hiểu nguồn gốc lương thực và tư duy bền vững.',
        'Lớp 7: Trồng trọt, chăn nuôi, thuỷ sản — nền tảng kinh tế nông nghiệp.',
        'Lớp 8: Điện kĩ thuật, mạch điện, an toàn — kĩ năng thiết yếu trong gia đình.',
        'Lớp 9: Sửa xe, bảo dưỡng thiết bị, nấu ăn — kĩ năng tự lập thực tế.',
      ] },
      { h: 'Nghề nghiệp tương lai và kĩ năng công nghệ' },
      { p: 'Thế giới đang thiếu thợ lành nghề — thợ điện, kĩ thuật viên cơ khí, đầu bếp chuyên nghiệp đều có thu nhập tốt và nhiều cơ hội việc làm. Không phải con đường nào cũng phải qua đại học mới thành công.' },
      { ul: [
        'Kĩ thuật điện/điện tử: THPT kĩ thuật hoặc trường cao đẳng nghề (3 năm học nghề).',
        'Ẩm thực và nhà hàng: trường dạy nấu ăn, thực tập nhà hàng khách sạn.',
        'Nông nghiệp công nghệ cao: kết hợp kĩ thuật nông nghiệp với công nghệ số.',
        'Cơ khí và ô tô: cơ hội lớn trong bối cảnh công nghiệp hoá và xe điện.',
      ] },
      { h: 'Kĩ năng thực hành và tư duy kĩ thuật' },
      { p: 'Điều Công nghệ dạy không chỉ là "làm được" — mà là "làm an toàn", "làm đúng quy trình" và "biết tại sao phải làm vậy". Đây là tư duy kĩ thuật, thứ mà mọi kĩ sư, thợ lành nghề và nhà quản lí đều cần.' },
      { note: 'Xã hội cần những người biết làm — không chỉ những người biết nói. Đừng coi thường kĩ năng thực hành. Đôi tay khéo léo và khối óc tư duy cùng nhau tạo nên những người thực sự tài năng.' },
    ],
    [
      { q: 'Kĩ năng thực hành học ở Công nghệ 9 nào em thấy hữu ích nhất trong cuộc sống hàng ngày?', a: 'Kĩ năng sửa điện cơ bản (thay bóng đèn, kiểm tra cầu chì, đấu nối thiết bị điện) — vì nhà nào cũng cần, tiết kiệm chi phí và quan trọng hơn là an toàn tính mạng. Biết sơ cứu tai nạn điện cũng là kĩ năng cứu người trong tình huống khẩn cấp.' },
      { q: 'Tại sao học Công nghệ trong trường phổ thông lại quan trọng, dù không phải ai cũng theo nghề kĩ thuật?', a: 'Vì cuộc sống hàng ngày luôn đòi hỏi kĩ năng thực hành nhất định: tự sửa đồ dùng đơn giản, nấu ăn, trồng rau, tiết kiệm điện. Hơn nữa, tư duy kĩ thuật (đọc quy trình, làm theo từng bước, kiểm tra kết quả) là kĩ năng mềm quý giá áp dụng cho mọi công việc. Người biết "tự lo" sẽ tự tin và độc lập hơn trong cuộc sống.' },
      { q: 'Nếu em muốn theo nghề kĩ thuật sau này, em cần chuẩn bị gì từ bây giờ?', a: 'Tìm hiểu cụ thể về nghề em quan tâm (thợ điện, cơ khí, điện tử, ẩm thực...): yêu cầu gì, học ở đâu, thu nhập ra sao. Tìm cơ hội thực hành: tham gia sửa đồ ở nhà, phụ giúp người thân trong công việc kĩ thuật. Ở THPT theo ban C hoặc D kĩ thuật nếu muốn học nghề. Đặc biệt: rèn kĩ năng đọc tài liệu kĩ thuật bằng tiếng Anh — vì thiết bị hiện đại đều có hướng dẫn tiếng Anh.' },
    ]
  ),
};
