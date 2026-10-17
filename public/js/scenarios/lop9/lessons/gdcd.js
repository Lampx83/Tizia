// ============================================================
// Lớp 9 · GDCD — Lý thuyết 35 tuần (chuẩn bị thi vào 10).
// Mạch: HK1 đạo đức công dân + lý tưởng thanh niên; HK2 pháp luật cơ bản.
// Bám SGK GDCD 9 GDPT 2018 (Kết nối tri thức / Chân trời sáng tạo / Cánh Diều).
// Key trùng id quiz: "S9GDCD-wNN-quiz".
// ============================================================

const L = (topic, intro, objectives, theory, examples) => ({ topic, intro, objectives, theory, examples });

export const S9GDCD_LESSONS = {
  'S9GDCD-w01-quiz': L(
    'Chí công vô tư',
    'Mở đầu lớp 9, các em học về phẩm chất đạo đức cốt lõi — chí công vô tư — nền tảng của người công dân tử tế trong xã hội pháp quyền. Đây là bài đầu mạch đạo đức của cả năm cuối cấp.',
    ['Hiểu khái niệm và biểu hiện của chí công vô tư.', 'Phân biệt chí công vô tư với thiên vị, vụ lợi và sự ba phải.', 'Biết rèn luyện phẩm chất này trong học tập và sinh hoạt hằng ngày.'],
    [
      { h: 'Chí công vô tư là gì?' },
      { p: 'Chí công vô tư là phẩm chất đạo đức của con người, thể hiện ở sự công bằng, không thiên vị, giải quyết công việc theo lẽ phải, xuất phát từ lợi ích chung và đặt lợi ích chung lên trên lợi ích cá nhân.' },
      { h: 'Biểu hiện của chí công vô tư' },
      { ul: ['Công bằng, khách quan khi đánh giá người khác.', 'Không vì tình riêng, vì lợi ích cá nhân mà làm trái lẽ phải.', 'Dám đấu tranh chống thiên vị, vụ lợi, tham nhũng.', 'Không nhận hối lộ, không bao che cho cái sai.', 'Giải quyết công việc xuất phát từ lợi ích chung.'] },
      { h: 'Chí công vô tư KHÁC giả danh chí công vô tư' },
      { p: 'Có người ngoài miệng nói công bằng nhưng hành động lại vụ lợi, hoặc lợi dụng danh "công bằng" để trù dập người mình ghét. Đó là giả danh chí công vô tư — còn nguy hiểm hơn vì khó nhận ra.' },
      { h: 'Phân biệt với sự ba phải' },
      { p: 'Chí công vô tư không phải là "ai cũng đúng", "dĩ hoà vi quý". Người chí công vô tư biết rõ ai đúng ai sai và bảo vệ cái đúng, không né tránh để giữ lòng mọi người.' },
      { h: 'Ý nghĩa' },
      { ul: ['Người chí công vô tư được mọi người tin yêu, kính trọng.', 'Góp phần làm cho xã hội công bằng, dân chủ, văn minh.', 'Là cơ sở của một tập thể đoàn kết, lành mạnh.'] },
      { h: 'Cách rèn luyện' },
      { ul: ['Ủng hộ người làm đúng, phê phán việc sai dù là bạn thân.', 'Đánh giá khách quan dựa trên hành vi thực tế, không vì cảm tính.', 'Học tập tấm gương Bác Hồ và những người liêm khiết.', 'Bắt đầu từ việc nhỏ: chấm điểm thi đua, chia phần việc nhóm cho công bằng.'] },
      { note: 'Bác Hồ dạy: "Phải để việc công, việc nước lên trên việc tư, việc nhà". Chí công vô tư là gốc của người cán bộ, người công dân tốt.' },
    ],
    [
      { q: 'Lớp trưởng bao che cho bạn thân vi phạm nội quy. Hành vi này thể hiện điều gì?', a: 'Trái với chí công vô tư — đặt tình riêng lên trên lẽ phải, vi phạm nguyên tắc công bằng và làm mất uy tín của vị trí lớp trưởng. Lẽ ra phải xử lý như mọi bạn khác, dù là bạn thân.' },
      { q: 'Em rèn chí công vô tư bằng cách nào trong học tập?', a: 'Ủng hộ người làm đúng, phê phán việc sai dù là bạn thân; chấm điểm thi đua, bình bầu khen thưởng dựa trên kết quả thực tế chứ không vì thân quen; không xin xỏ, không nâng đỡ thiên vị.' },
      { q: 'Có bạn nói "Chí công vô tư là chuyện của người lớn, HS không cần". Em phản hồi thế nào?', a: 'Không đúng. Chí công vô tư rèn ngay từ việc nhỏ: chia kẹo công bằng, bình chọn cán bộ lớp khách quan, không bao che bạn quay cóp. Đợi đến khi lớn mới rèn thì đã thành thói quen thiên vị mất rồi.' },
    ]
  ),

  'S9GDCD-w02-quiz': L(
    'Tự chủ',
    'Tuần này các em rèn luyện phẩm chất tự chủ — khả năng làm chủ bản thân trong mọi hoàn cảnh, đặc biệt cần thiết khi bước vào giai đoạn ôn thi căng thẳng cuối cấp.',
    ['Hiểu thế nào là tự chủ.', 'Nhận biết biểu hiện của tự chủ và thiếu tự chủ.', 'Rèn luyện tính tự chủ qua tình huống thực tế.'],
    [
      { h: 'Tự chủ là gì?' },
      { p: 'Tự chủ là làm chủ bản thân — làm chủ được suy nghĩ, tình cảm và hành vi của mình trong mọi hoàn cảnh; biết bình tĩnh, tự tin và điều chỉnh hành vi, không bị lôi kéo trước cám dỗ.' },
      { h: 'Biểu hiện của người tự chủ' },
      { ul: ['Bình tĩnh, tự tin trước khó khăn, thử thách.', 'Không nóng nảy, không hành động vội vã.', 'Biết kiềm chế cảm xúc tiêu cực, không "giận quá mất khôn".', 'Kiên định lập trường đúng, không a dua, không chạy theo đám đông.'] },
      { h: 'Biểu hiện thiếu tự chủ' },
      { ul: ['Dễ nổi nóng, cáu gắt khi gặp việc trái ý.', 'Bị bạn rủ rê là làm theo, không suy nghĩ.', 'Chán nản, buông xuôi khi thất bại.', 'Sa vào game, mạng xã hội không kiểm soát được thời gian.'] },
      { h: 'Ý nghĩa của tự chủ' },
      { ul: ['Giúp con người sống đúng đắn, cư xử có văn hoá.', 'Vượt qua khó khăn, thử thách và cám dỗ trong cuộc sống.', 'Được mọi người tin tưởng, tôn trọng.'] },
      { h: 'Tự chủ trong giai đoạn ôn thi' },
      { p: 'Cuối cấp 9, áp lực thi vào 10 rất lớn. Người tự chủ biết lập kế hoạch ôn tập, giữ bình tĩnh khi gặp bài khó, không hoảng loạn so sánh với bạn, và biết nghỉ ngơi điều độ.' },
      { h: 'Cách rèn luyện tự chủ' },
      { ul: ['Tập suy nghĩ trước khi nói, trước khi hành động.', 'Học cách hít thở sâu, đếm đến 10 khi nổi giận.', 'Không tham gia trào lưu nhất thời, không hùa theo đám đông.', 'Lập kế hoạch và kiên trì bám theo.'] },
      { note: 'Tự chủ KHÁC bảo thủ: người tự chủ vẫn lắng nghe và tiếp thu cái đúng, chỉ kiên định ở những điều thật sự đúng đắn.' },
    ],
    [
      { q: 'Bạn rủ em trốn học đi chơi game. Người tự chủ phản ứng thế nào?', a: 'Kiên quyết từ chối, giải thích cho bạn hiểu việc đó sai và gây hậu quả, có thể khuyên bạn cùng quay lại lớp học. Không vì sợ bạn giận hay "mất mặt" mà làm theo.' },
      { q: 'Khi bị điểm kém, người mất tự chủ thường có biểu hiện gì?', a: 'Nóng nảy, chán nản, đổ lỗi cho người khác, thậm chí bỏ học. Người tự chủ sẽ bình tĩnh tìm nguyên nhân, hỏi thầy cô và xây dựng kế hoạch cải thiện.' },
      { q: 'Một bạn bị bạn khác khiêu khích, chửi tục trên mạng. Bạn ấy nên làm gì để giữ tự chủ?', a: 'Không đáp trả ngay khi đang nóng; bình tĩnh chặn/ẩn, lưu lại bằng chứng, báo thầy cô hoặc cha mẹ nếu nghiêm trọng. Nóng giận đáp trả dễ leo thang thành xô xát, người tự chủ biết dừng đúng lúc.' },
    ]
  ),

  'S9GDCD-w03-quiz': L(
    'Dân chủ và kỉ luật',
    'Dân chủ và kỉ luật là hai mặt không thể tách rời của một xã hội văn minh — đây là nội dung quan trọng trong chương trình GDCD cuối cấp.',
    ['Hiểu khái niệm dân chủ và kỉ luật.', 'Thấy được mối quan hệ giữa hai phạm trù.', 'Vận dụng được dân chủ và kỉ luật trong môi trường lớp học.'],
    [
      { h: 'Dân chủ là gì?' },
      { p: 'Dân chủ là mọi người được làm chủ công việc của tập thể và xã hội; mọi người được biết, được tham gia bàn bạc, góp phần thực hiện, giám sát những công việc chung của tập thể, xã hội có liên quan đến mình.' },
      { h: 'Kỉ luật là gì?' },
      { p: 'Kỉ luật là những quy định chung của một cộng đồng, tổ chức xã hội, yêu cầu mọi người phải tuân theo nhằm tạo ra sự thống nhất hành động để đạt chất lượng, hiệu quả công việc vì mục tiêu chung.' },
      { h: 'Mối quan hệ giữa dân chủ và kỉ luật' },
      { ul: ['Dân chủ là để mọi người thể hiện và phát huy quyền làm chủ, đóng góp cho công việc chung.', 'Kỉ luật là điều kiện đảm bảo cho dân chủ được thực hiện có hiệu quả.', 'Dân chủ và kỉ luật tạo nên sức mạnh của tập thể.'] },
      { h: 'Nếu chỉ có một trong hai' },
      { ul: ['Dân chủ mà không có kỉ luật → hỗn loạn, "trống đánh xuôi kèn thổi ngược".', 'Kỉ luật mà không có dân chủ → áp đặt, mọi người làm cho có, thiếu sáng tạo.'] },
      { h: 'Ý nghĩa' },
      { p: 'Thực hiện tốt dân chủ và kỉ luật sẽ tạo ra sự thống nhất cao về nhận thức, ý chí và hành động; tạo cơ hội cho mọi người phát triển; xây dựng quan hệ xã hội tốt đẹp, nâng cao hiệu quả công việc.' },
      { h: 'Vận dụng trong lớp học' },
      { p: 'Họp lớp để cả lớp bàn kế hoạch là thực hiện dân chủ. Sau khi biểu quyết, mọi người tuân theo quyết định chung là kỉ luật. Hai mặt đi liền nhau mới làm cho lớp đoàn kết, vững mạnh.' },
      { note: 'Dân chủ không phải làm theo ý mình bất chấp; kỉ luật không phải là mất tự do. Cả hai cùng phục vụ lợi ích chung.' },
    ],
    [
      { q: 'Lớp họp bàn kế hoạch tổ chức trại — đây là biểu hiện gì?', a: 'Đây là dân chủ — mọi thành viên được biết, được bàn bạc, đóng góp ý kiến cho công việc chung của tập thể lớp.' },
      { q: 'Sau khi lớp đã biểu quyết, em có quyền tự ý làm khác không?', a: 'Không. Đó là vi phạm kỉ luật. Em có quyền bảo lưu ý kiến của mình, nhưng vẫn phải thực hiện theo quyết định chung mà tập thể đã biểu quyết.' },
      { q: 'Có bạn nói "Cứ kỉ luật chặt là tốt, dân chủ chỉ làm mất thời gian". Em phản hồi?', a: 'Không đúng. Kỉ luật mà thiếu dân chủ thì mọi người làm cho xong, thiếu trách nhiệm và sáng tạo. Dân chủ giúp mọi người tự nguyện tuân thủ kỉ luật vì chính họ đã tham gia quyết định.' },
    ]
  ),

  'S9GDCD-w04-quiz': L(
    'Bảo vệ hoà bình',
    'Trong bối cảnh thế giới còn nhiều xung đột, bảo vệ hoà bình là trách nhiệm của mọi quốc gia và mỗi công dân, không riêng quốc gia nào.',
    ['Hiểu khái niệm hoà bình và bảo vệ hoà bình.', 'Nhận biết biểu hiện của lòng yêu hoà bình.', 'Có thái độ và hành động tích cực bảo vệ hoà bình.'],
    [
      { h: 'Hoà bình là gì?' },
      { p: 'Hoà bình là trạng thái không có chiến tranh hay xung đột vũ trang; là mối quan hệ hiểu biết, tôn trọng, bình đẳng và hợp tác giữa các quốc gia, dân tộc, giữa con người với con người.' },
      { h: 'Bảo vệ hoà bình là gì?' },
      { p: 'Bảo vệ hoà bình là gìn giữ cuộc sống xã hội bình yên; dùng thương lượng, đàm phán để giải quyết mâu thuẫn, xung đột; không để xảy ra chiến tranh hay xung đột vũ trang.' },
      { h: 'Vì sao phải bảo vệ hoà bình?' },
      { ul: ['Hoà bình đem lại cuộc sống ấm no, hạnh phúc.', 'Chiến tranh gây đau thương, chết chóc, đói nghèo, bệnh tật, tàn phá môi trường.', 'Việt Nam đã trải qua nhiều cuộc chiến tranh nên càng thấu hiểu giá trị của hoà bình.'] },
      { h: 'Biểu hiện của lòng yêu hoà bình' },
      { ul: ['Sống hoà thuận, không gây gổ, không dùng bạo lực.', 'Tôn trọng, hiểu biết, không phân biệt các dân tộc, quốc gia khác.', 'Giải quyết mâu thuẫn bằng đối thoại, thương lượng.', 'Lên án, phản đối chiến tranh phi nghĩa.'] },
      { h: 'Trách nhiệm bảo vệ hoà bình' },
      { p: 'Bảo vệ hoà bình là trách nhiệm của tất cả các quốc gia, dân tộc và toàn nhân loại. Ngày nay, lòng yêu chuộng hoà bình của nhân dân thế giới ngày càng được nâng cao.' },
      { h: 'HS bảo vệ hoà bình bằng việc làm gì?' },
      { ul: ['Cư xử thân thiện, không bắt nạt bạn bè.', 'Tham gia mít-tinh, viết thư, vẽ tranh cổ vũ hoà bình.', 'Quyên góp giúp đỡ trẻ em vùng chiến sự, thiên tai.', 'Học hỏi, tôn trọng văn hoá các dân tộc khác.'] },
      { note: 'Liên Hợp Quốc (UN) thành lập năm 1945, là tổ chức quốc tế lớn nhất với sứ mệnh giữ gìn hoà bình và an ninh thế giới.' },
    ],
    [
      { q: 'Em thấy hai bạn xô xát trong lớp. Người yêu hoà bình sẽ làm gì?', a: 'Bình tĩnh can ngăn, gọi thầy cô nếu cần; sau đó giúp hai bạn ngồi lại nói chuyện để hoá giải mâu thuẫn. Không hùa vào cổ vũ hay quay clip đăng mạng.' },
      { q: 'Bạn nước ngoài đến học cùng lớp. Em ứng xử thế nào để thể hiện yêu hoà bình?', a: 'Tôn trọng, lịch sự, chủ động làm quen và tìm hiểu văn hoá của bạn; không kỳ thị màu da, không chế giễu ngôn ngữ hay phong tục của bạn.' },
      { q: 'Có bạn nói "Hoà bình là việc của các nước lớn, HS làm gì được?". Em phản hồi?', a: 'Bảo vệ hoà bình bắt đầu từ những việc nhỏ: sống hoà thuận, không bạo lực học đường, tôn trọng người khác biệt. Một xã hội yêu hoà bình được tạo nên từ từng con người cụ thể, trong đó có HS.' },
    ]
  ),

  'S9GDCD-w05-quiz': L(
    'Tình hữu nghị giữa các dân tộc trên thế giới',
    'Trong thời đại toàn cầu hoá, tình hữu nghị giữa các dân tộc là điều kiện cần thiết để cùng phát triển và giải quyết các vấn đề chung của nhân loại.',
    ['Hiểu khái niệm tình hữu nghị giữa các dân tộc.', 'Thấy được ý nghĩa của hữu nghị quốc tế.', 'Biết thể hiện tình hữu nghị qua hành vi cụ thể.'],
    [
      { h: 'Tình hữu nghị giữa các dân tộc là gì?' },
      { p: 'Tình hữu nghị giữa các dân tộc trên thế giới là quan hệ bạn bè thân thiện giữa nước này với nước khác, giữa dân tộc này với dân tộc khác.' },
      { h: 'Biểu hiện của tình hữu nghị' },
      { ul: ['Các nước hợp tác, giúp đỡ nhau cùng phát triển.', 'Giao lưu văn hoá, thể thao, giáo dục.', 'Tôn trọng độc lập, chủ quyền của nhau.', 'Cùng nhau giải quyết các vấn đề chung.'] },
      { h: 'Ý nghĩa của tình hữu nghị' },
      { ul: ['Tạo cơ hội, điều kiện để các nước cùng hợp tác, phát triển.', 'Tạo sự hiểu biết lẫn nhau, tránh gây mâu thuẫn, căng thẳng dẫn đến nguy cơ chiến tranh.', 'Giúp giải quyết các vấn đề toàn cầu: biến đổi khí hậu, dịch bệnh, đói nghèo, khủng bố.'] },
      { h: 'Chính sách đối ngoại của Việt Nam' },
      { p: 'Việt Nam thực hiện đường lối đối ngoại hoà bình, hữu nghị, hợp tác với tất cả các nước trên cơ sở tôn trọng độc lập, chủ quyền, toàn vẹn lãnh thổ, bình đẳng và cùng có lợi.' },
      { h: 'Việt Nam trong cộng đồng quốc tế' },
      { p: 'Việt Nam có quan hệ ngoại giao với gần 200 quốc gia, là thành viên tích cực của nhiều tổ chức quốc tế lớn: Liên Hợp Quốc, ASEAN, WTO, APEC. Việt Nam là "bạn, đối tác tin cậy" của cộng đồng quốc tế.' },
      { h: 'Trách nhiệm của công dân, học sinh' },
      { ul: ['Thể hiện tình đoàn kết, hữu nghị với bạn bè và người nước ngoài.', 'Có thái độ, cử chỉ, việc làm tôn trọng, thân thiện.', 'Tích cực tham gia các hoạt động giao lưu, đoàn kết quốc tế.'] },
      { note: 'SEA Games, giao lưu sinh viên quốc tế, các chương trình kết nghĩa trường học là biểu hiện cụ thể, gần gũi của tình hữu nghị.' },
    ],
    [
      { q: 'Một bạn châu Phi đến học cùng lớp. Em thể hiện tình hữu nghị thế nào?', a: 'Tôn trọng, chủ động làm quen, giới thiệu văn hoá Việt Nam, tìm hiểu về đất nước của bạn; không kỳ thị màu da hay phong tục, không để bạn bị cô lập.' },
      { q: 'Vì sao Việt Nam coi trọng quan hệ với các nước ASEAN?', a: 'ASEAN là láng giềng gần gũi, có nhiều điểm tương đồng về văn hoá - lịch sử; hợp tác kinh tế lớn; cùng nhau giữ gìn hoà bình, ổn định ở khu vực Đông Nam Á.' },
      { q: 'Có bạn cho rằng "Cứ lo cho nước mình là đủ, hữu nghị với nước khác làm gì?". Em phản hồi?', a: 'Trong thời đại toàn cầu hoá, không quốc gia nào phát triển một mình. Hữu nghị giúp ta tiếp cận vốn, công nghệ, thị trường và cùng giải quyết các vấn đề xuyên biên giới. Khép kín sẽ tụt hậu.' },
    ]
  ),

  'S9GDCD-w06-quiz': L(
    'Hợp tác cùng phát triển',
    'Hợp tác là xu thế tất yếu của thời đại — không một quốc gia hay cá nhân nào có thể đứng riêng lẻ mà thành công.',
    ['Hiểu khái niệm hợp tác cùng phát triển.', 'Biết nguyên tắc và ý nghĩa của hợp tác.', 'Thể hiện tinh thần hợp tác trong học tập và sinh hoạt.'],
    [
      { h: 'Hợp tác cùng phát triển là gì?' },
      { p: 'Hợp tác là cùng chung sức làm việc, giúp đỡ, hỗ trợ lẫn nhau trong công việc, lĩnh vực nào đó vì mục đích chung. Hợp tác cùng phát triển là cùng có lợi, không làm phương hại đến lợi ích của người khác.' },
      { h: 'Nguyên tắc hợp tác của Việt Nam' },
      { ul: ['Tôn trọng độc lập, chủ quyền, toàn vẹn lãnh thổ.', 'Bình đẳng và cùng có lợi.', 'Không can thiệp vào công việc nội bộ của nhau.', 'Không dùng vũ lực hoặc đe doạ dùng vũ lực.', 'Giải quyết bất đồng bằng thương lượng hoà bình.'] },
      { h: 'Ý nghĩa của hợp tác' },
      { ul: ['Cùng nhau giải quyết những vấn đề chung mang tính toàn cầu.', 'Tận dụng được thế mạnh và nguồn lực của mỗi bên.', 'Thúc đẩy sự phát triển nhanh và bền vững hơn.', 'Xây dựng mối quan hệ hữu nghị, hiểu biết lẫn nhau.'] },
      { h: 'Chủ trương của Đảng và Nhà nước' },
      { p: 'Việt Nam coi trọng tăng cường hợp tác với các nước trong khu vực và trên thế giới theo nguyên tắc tôn trọng độc lập, chủ quyền, bình đẳng, cùng có lợi.' },
      { h: 'Việt Nam và hợp tác quốc tế' },
      { p: 'Việt Nam tham gia nhiều tổ chức và hiệp định quốc tế: WTO, APEC, ASEAN, CPTPP, RCEP. Đây là nguồn lực lớn cho phát triển kinh tế và nâng cao vị thế đất nước.' },
      { h: 'Học sinh rèn tinh thần hợp tác' },
      { ul: ['Tích cực, chủ động trong làm việc nhóm.', 'Lắng nghe, tôn trọng ý kiến của bạn.', 'Sẵn sàng chia sẻ, giúp đỡ bạn cùng tiến bộ.', 'Hoàn thành tốt phần việc được giao.'] },
      { note: 'Trong lớp học, hợp tác làm việc nhóm chính là rèn luyện tinh thần hợp tác cùng phát triển ngay từ tuổi học trò.' },
    ],
    [
      { q: 'Trong nhóm thuyết trình, mỗi bạn làm một phần riêng lẻ rồi ghép lại. Có phải hợp tác thật sự không?', a: 'Chưa thật sự hợp tác. Hợp tác đòi hỏi trao đổi, hỗ trợ, kết nối các phần thành một sản phẩm thống nhất. Cần thảo luận, góp ý cho nhau để bài hoàn chỉnh và mọi người cùng hiểu nội dung.' },
      { q: 'Vì sao Việt Nam cần hợp tác quốc tế?', a: 'Để tiếp cận công nghệ, vốn, thị trường; cùng giải quyết các vấn đề xuyên biên giới (khí hậu, an ninh, dịch bệnh); học hỏi kinh nghiệm và nâng cao vị thế quốc gia.' },
      { q: 'Một bạn giỏi nói "Mình làm một mình nhanh hơn, hợp tác chỉ vướng chân". Em góp ý?', a: 'Làm một mình có thể nhanh ở việc nhỏ, nhưng việc lớn cần nhiều người. Hợp tác giúp tận dụng thế mạnh của từng người, học hỏi lẫn nhau và rèn kỹ năng làm việc nhóm — rất cần cho công việc sau này.' },
    ]
  ),

  'S9GDCD-w07-quiz': L(
    'Kế thừa và phát huy truyền thống tốt đẹp của dân tộc',
    'Truyền thống là gốc rễ của dân tộc. Biết kế thừa và phát huy là cách thanh niên thể hiện trách nhiệm với cha ông và tương lai.',
    ['Hiểu khái niệm truyền thống tốt đẹp của dân tộc.', 'Kể được các truyền thống nổi bật của Việt Nam.', 'Biết cách kế thừa và phát huy, biết phê phán hủ tục.'],
    [
      { h: 'Truyền thống tốt đẹp của dân tộc là gì?' },
      { p: 'Truyền thống tốt đẹp của dân tộc là những giá trị tinh thần (tư tưởng, đức tính, lối sống, cách ứng xử tốt đẹp...) được hình thành trong quá trình lịch sử lâu dài, được truyền từ thế hệ này sang thế hệ khác.' },
      { h: 'Truyền thống tiêu biểu của dân tộc Việt Nam' },
      { ul: ['Yêu nước, bất khuất chống ngoại xâm.', 'Đoàn kết, nhân nghĩa, tương thân tương ái.', 'Cần cù, sáng tạo trong lao động.', 'Hiếu học, tôn sư trọng đạo.', 'Hiếu thảo, sống có nghĩa có tình.', 'Các nghề truyền thống, văn hoá: áo dài, ẩm thực, lễ hội, dân ca...'] },
      { h: 'Ý nghĩa của việc kế thừa và phát huy' },
      { ul: ['Là tài sản vô giá, góp phần tích cực vào sự phát triển của dân tộc.', 'Góp phần giữ gìn bản sắc dân tộc trong quá trình hội nhập.', 'Tạo nên sức mạnh tinh thần để vượt qua khó khăn.'] },
      { h: 'Cách kế thừa và phát huy' },
      { ul: ['Tự hào, trân trọng, tìm hiểu về truyền thống.', 'Giữ gìn và bảo vệ truyền thống trước những điều sai trái.', 'Vận dụng, phát triển truyền thống phù hợp với cuộc sống hiện đại.', 'Tích cực giới thiệu, quảng bá truyền thống với bạn bè quốc tế.'] },
      { h: 'Phân biệt truyền thống và hủ tục' },
      { p: 'Truyền thống tốt đẹp khác với hủ tục lạc hậu. Tảo hôn, trọng nam khinh nữ, mê tín dị đoan, cúng bái chữa bệnh... là hủ tục, cần phê phán và loại bỏ.' },
      { h: 'Thái độ cần tránh' },
      { ul: ['Chê bai, coi thường truyền thống dân tộc.', 'Sùng ngoại, chạy theo cái mới mà quên cội nguồn.', 'Bảo thủ, giữ cả những hủ tục lạc hậu.'] },
      { note: '"Uống nước nhớ nguồn" — phát huy truyền thống là cách tri ân cha ông và xây dựng tương lai dân tộc.' },
    ],
    [
      { q: 'Em thấy bạn coi thường áo dài, gọi là "quê". Em phản ứng thế nào?', a: 'Em giải thích áo dài là biểu tượng đẹp của dân tộc, được bạn bè thế giới ngưỡng mộ. Mặc áo dài là tự hào, không phải "quê". Có thể rủ bạn thử mặc trong dịp lễ để cảm nhận nét đẹp ấy.' },
      { q: 'Phong tục tảo hôn ở một số vùng có nên duy trì không?', a: 'Không. Đó là hủ tục lạc hậu, vi phạm Luật Hôn nhân và Gia đình, ảnh hưởng sức khoẻ và tương lai của trẻ em. Cần bài trừ và thay bằng giáo dục, tuyên truyền đúng đắn.' },
      { q: 'Bạn nói "Truyền thống là chuyện cũ, thời nay phải hiện đại mới được". Em góp ý?', a: 'Hiện đại không có nghĩa là bỏ gốc. Nhiều nước phát triển vẫn giữ rất chặt truyền thống của họ. Ta nên kế thừa cái tốt và phát huy phù hợp với thời đại, đồng thời loại bỏ hủ tục — đó mới là phát triển bền vững.' },
    ]
  ),

  'S9GDCD-w08-quiz': L(
    'Năng động, sáng tạo',
    'Trong thế kỉ 21, năng động và sáng tạo là hai phẩm chất sống còn — giúp em thích nghi với thế giới đổi mới không ngừng.',
    ['Hiểu khái niệm năng động, sáng tạo.', 'Phân biệt với hoạt động bừa bãi, hiếu động.', 'Biết cách rèn luyện hai phẩm chất này.'],
    [
      { h: 'Năng động là gì?' },
      { p: 'Năng động là tích cực, chủ động, dám nghĩ, dám làm; không thụ động, không trông chờ, ỷ lại vào người khác hay hoàn cảnh.' },
      { h: 'Sáng tạo là gì?' },
      { p: 'Sáng tạo là say mê nghiên cứu, tìm tòi để tạo ra giá trị mới về vật chất, tinh thần; hoặc tìm ra cái mới, cách giải quyết mới hiệu quả hơn mà không bị gò bó, phụ thuộc vào cái đã có.' },
      { h: 'Mối quan hệ giữa năng động và sáng tạo' },
      { ul: ['Năng động là cơ sở, điều kiện để sáng tạo.', 'Sáng tạo là kết quả của sự năng động.', 'Hai phẩm chất bổ sung, gắn bó chặt chẽ với nhau.'] },
      { h: 'Ý nghĩa' },
      { ul: ['Giúp con người vượt qua khó khăn, rút ngắn thời gian đạt mục đích.', 'Làm nên những kì tích vẻ vang, mang lại niềm vinh dự cho bản thân, gia đình, đất nước.', 'Là phẩm chất cần thiết của người lao động trong xã hội hiện đại.'] },
      { h: 'Biểu hiện trong học tập' },
      { ul: ['Chủ động tìm tài liệu mở rộng kiến thức.', 'Tìm nhiều cách giải khác nhau cho một bài toán.', 'Đặt câu hỏi, không học vẹt, không học đối phó.', 'Vận dụng kiến thức đã học vào thực tế cuộc sống.'] },
      { h: 'Cách rèn luyện' },
      { ul: ['Tập đặt câu hỏi "Tại sao?", "Còn cách nào khác không?".', 'Tham gia câu lạc bộ, dự án, hoạt động trải nghiệm.', 'Đọc sách, học hỏi cái mới, không ngại khó.', 'Không sợ thất bại, dám thử nghiệm và rút kinh nghiệm.'] },
      { note: 'Sáng tạo không phải là "phát minh ra cái chưa ai biết" — đôi khi chỉ là tổ hợp cái cũ thành cách làm mới hiệu quả hơn.' },
    ],
    [
      { q: 'Bạn em nghĩ ra cách dùng ứng dụng học từ vựng để nhớ nhanh hơn. Đó có phải sáng tạo?', a: 'Có. Sáng tạo là tìm cách làm hiệu quả hơn — bạn đã áp dụng công cụ mới vào việc học thay vì chép thủ công. Đây là sự sáng tạo phù hợp và đáng khuyến khích ở HS.' },
      { q: 'Năng động khác hiếu động ở chỗ nào?', a: 'Năng động là chủ động, có mục tiêu, đem lại kết quả tích cực. Hiếu động là hoạt động bừa bãi, thiếu suy nghĩ, thường gây phiền hà. Hai điều khác nhau về mục đích và kết quả.' },
      { q: 'Một bạn nói "Mình cứ làm theo cách thầy dạy là đủ, sáng tạo dễ bị sai". Em góp ý?', a: 'Làm theo hướng dẫn là cần thiết khi mới học, nhưng nếu chỉ rập khuôn thì khó tiến xa. Có thể vừa nắm chắc cách cơ bản, vừa thử tìm cách hay hơn. Sai trong thử nghiệm là bình thường, đó là cách học sâu.' },
    ]
  ),

  'S9GDCD-w09-quiz': L(
    'Làm việc có năng suất, chất lượng, hiệu quả',
    'Làm việc không chỉ là "có làm" — mà phải năng suất, chất lượng và hiệu quả. Đây là yêu cầu của lao động hiện đại.',
    ['Hiểu khái niệm làm việc có năng suất, chất lượng, hiệu quả.', 'Biết các yếu tố quyết định.', 'Rèn luyện thói quen làm việc khoa học.'],
    [
      { h: 'Thế nào là làm việc có năng suất, chất lượng, hiệu quả?' },
      { p: 'Là tạo ra được nhiều sản phẩm có giá trị cao cả về nội dung và hình thức trong một thời gian nhất định.' },
      { h: 'Phân biệt ba yếu tố' },
      { ul: ['Năng suất: số lượng sản phẩm làm ra trong một đơn vị thời gian.', 'Chất lượng: sản phẩm tốt, đáp ứng đúng yêu cầu đặt ra.', 'Hiệu quả: kết quả đạt được so với công sức, chi phí bỏ ra.'] },
      { h: 'Ý nghĩa' },
      { ul: ['Là yêu cầu cần thiết của người lao động trong sự nghiệp công nghiệp hoá, hiện đại hoá.', 'Góp phần nâng cao chất lượng cuộc sống của cá nhân, gia đình và xã hội.', 'Giúp con người thành công và được đánh giá cao trong công việc.'] },
      { h: 'Các yếu tố quyết định' },
      { ul: ['Năng lực, trình độ của người làm việc.', 'Phương pháp, công cụ làm việc.', 'Tinh thần kỉ luật, cách tổ chức công việc khoa học.', 'Sự năng động, sáng tạo và đổi mới.', 'Sức khoẻ thể chất và tinh thần.'] },
      { h: 'Vận dụng trong học tập' },
      { ul: ['Lập kế hoạch trước khi học.', 'Dùng phương pháp phù hợp (sơ đồ tư duy, học theo Pomodoro).', 'Tập trung cao độ trong thời gian học.', 'Tự kiểm tra, đánh giá và điều chỉnh.'] },
      { h: 'Tránh các biểu hiện sai' },
      { ul: ['Làm ẩu, làm nhanh cho xong, chất lượng kém.', 'Cầu toàn quá mức, làm chậm trễ thời gian.', 'Vừa làm vừa lơ là, mất tập trung.'] },
      { note: 'Học 4 tiếng tập trung tốt hơn học 8 tiếng vừa làm vừa lướt điện thoại — đó là sự khác nhau giữa năng suất và lãng phí thời gian.' },
    ],
    [
      { q: 'Em học 3 tiếng thực chất nhưng ngồi 6 tiếng vì hay lướt mạng. Đánh giá thế nào?', a: 'Năng suất thấp, hiệu quả kém. Em nên dùng phương pháp Pomodoro: 25 phút tập trung tuyệt đối + 5 phút nghỉ. Hoàn thành nhanh hơn và đỡ mệt hơn.' },
      { q: 'Bạn làm bài rất nhanh nhưng nhiều lỗi. Đánh giá thế nào?', a: 'Năng suất cao nhưng chất lượng thấp — không hiệu quả. Cần cân bằng: chậm lại để kiểm tra, hoặc giữ tốc độ nhưng tăng độ cẩn thận để giảm lỗi.' },
      { q: 'Một bạn cho rằng "Cứ làm thật cẩn thận, chậm cũng được, miễn đúng". Em góp ý?', a: 'Cẩn thận là tốt nhưng nếu quá chậm thì không hoàn thành kịp công việc, kém hiệu quả. Cần cân bằng cả ba: vừa đúng (chất lượng), vừa đủ (năng suất), vừa tiết kiệm công sức (hiệu quả).' },
    ]
  ),

  'S9GDCD-w10-quiz': L(
    'Lý tưởng sống của thanh niên',
    'Lý tưởng sống là kim chỉ nam cho cuộc đời thanh niên. Có lý tưởng đúng đắn, em sẽ vững vàng trước mọi sóng gió.',
    ['Hiểu khái niệm lý tưởng sống.', 'Biết lý tưởng sống của thanh niên Việt Nam hiện nay.', 'Tự xác định lý tưởng cho bản thân.'],
    [
      { h: 'Lý tưởng sống là gì?' },
      { p: 'Lý tưởng sống (lẽ sống) là cái đích của cuộc sống mà mỗi người khát khao muốn đạt được. Người có lý tưởng sống cao đẹp luôn suy nghĩ, hành động không mệt mỏi để thực hiện lý tưởng đó.' },
      { h: 'Lý tưởng sống của thanh niên Việt Nam' },
      { p: 'Là phấn đấu thực hiện mục tiêu xây dựng nước Việt Nam độc lập, dân giàu, nước mạnh, xã hội dân chủ, công bằng, văn minh; trước mắt là thực hiện thắng lợi nhiệm vụ công nghiệp hoá, hiện đại hoá đất nước.' },
      { h: 'Biểu hiện của người có lý tưởng sống cao đẹp' },
      { ul: ['Học tập tốt, rèn luyện đạo đức tốt.', 'Tích cực tham gia hoạt động chính trị - xã hội.', 'Có ước mơ, hoài bão và kế hoạch thực hiện.', 'Sống có trách nhiệm với gia đình, đất nước.', 'Lao động cần cù, sáng tạo.'] },
      { h: 'Ý nghĩa của lý tưởng sống đúng đắn' },
      { ul: ['Tạo động lực mạnh mẽ để vượt qua khó khăn.', 'Giúp cuộc sống có mục đích, có ý nghĩa.', 'Đóng góp cho sự phát triển của xã hội.', 'Được mọi người tôn trọng, được Nhà nước tạo điều kiện.'] },
      { h: 'Lý tưởng đúng và lý tưởng lệch lạc' },
      { ul: ['Lý tưởng đúng: kết hợp hài hoà lợi ích bản thân với lợi ích chung.', 'Lý tưởng lệch lạc: chỉ vì tiền tài, danh vọng cá nhân bằng mọi giá; sống thực dụng, ích kỉ.'] },
      { h: 'Trách nhiệm của thanh niên, học sinh' },
      { p: 'Mỗi HS cần xác định cho mình lý tưởng đúng đắn và ra sức học tập, rèn luyện ngay từ bây giờ để chuẩn bị hành trang thực hiện lý tưởng đó.' },
      { note: 'Lý tưởng không phải điều xa vời — nó bắt đầu từ việc học tốt mỗi ngày và ước mơ nghề nghiệp mà em theo đuổi.' },
    ],
    [
      { q: 'Lý tưởng "kiếm thật nhiều tiền" có đúng không?', a: 'Chưa đủ. Lý tưởng đúng đắn phải kết hợp lợi ích bản thân với lợi ích xã hội. Em có thể làm giàu nhưng phải bằng con đường lương thiện và biết đóng góp cho cộng đồng.' },
      { q: 'Em chưa có lý tưởng rõ ràng. Em nên làm gì?', a: 'Hãy tự hỏi: việc gì khiến tôi thấy ý nghĩa? Tôi muốn để lại điều gì cho đời? Trải nghiệm nhiều hoạt động, đọc tiểu sử người thành công. Lý tưởng sẽ rõ dần qua thời gian và sự rèn luyện.' },
      { q: 'Bạn em nói "Tuổi này lo gì lý tưởng, cứ chơi đã". Em phản hồi?', a: 'Tuổi trẻ qua rất nhanh. Nếu không sớm xác định hướng đi và rèn luyện, sau này dễ trở thành người sống không mục đích, dễ sa ngã. Chơi và học có thể cân bằng, nhưng không thể buông bỏ lý tưởng.' },
    ]
  ),

  'S9GDCD-w11-quiz': L(
    'Trách nhiệm của thanh niên trong sự nghiệp CNH-HĐH đất nước',
    'Thanh niên là lực lượng quyết định sự nghiệp công nghiệp hoá - hiện đại hoá. Hiểu rõ trách nhiệm là bước đầu để hành động.',
    ['Hiểu khái niệm công nghiệp hoá - hiện đại hoá.', 'Nắm vai trò và trách nhiệm của thanh niên.', 'Có kế hoạch hành động cụ thể cho bản thân.'],
    [
      { h: 'Công nghiệp hoá - hiện đại hoá là gì?' },
      { p: 'Công nghiệp hoá là chuyển nền kinh tế từ lao động thủ công sang lao động bằng máy móc. Hiện đại hoá là ứng dụng những thành tựu khoa học - công nghệ tiên tiến nhất vào sản xuất và đời sống. CNH-HĐH gắn liền với phát triển kinh tế tri thức.' },
      { h: 'Ý nghĩa của CNH-HĐH' },
      { ul: ['Nâng cao năng suất lao động, phát triển kinh tế.', 'Cải thiện đời sống nhân dân.', 'Tạo nền tảng để đất nước phát triển nhanh, bền vững.', 'Nâng cao vị thế của Việt Nam trên trường quốc tế.'] },
      { h: 'Vai trò của thanh niên' },
      { ul: ['Là lực lượng nòng cốt, xung kích.', 'Tiếp thu khoa học - công nghệ nhanh nhạy.', 'Đầy nhiệt huyết, năng động, sáng tạo.', 'Là tương lai và sức mạnh của dân tộc.'] },
      { h: 'Trách nhiệm của thanh niên' },
      { ul: ['Ra sức học tập văn hoá, khoa học - kĩ thuật.', 'Tu dưỡng đạo đức, tư tưởng chính trị.', 'Rèn luyện sức khoẻ, kĩ năng.', 'Tích cực tham gia lao động sản xuất và các hoạt động xã hội.', 'Tham gia bảo vệ Tổ quốc và hội nhập quốc tế.'] },
      { h: 'Nhiệm vụ cụ thể của học sinh' },
      { ul: ['Học tốt các môn, đặc biệt STEM và ngoại ngữ.', 'Phát triển kĩ năng số, kĩ năng tự học.', 'Tham gia hoạt động Đoàn, Đội.', 'Định hướng nghề nghiệp phù hợp với xu hướng phát triển.'] },
      { h: 'Phương hướng phấn đấu của bản thân' },
      { p: 'Mỗi HS xác định lý tưởng sống đúng đắn, lập kế hoạch học tập, rèn luyện để trở thành công dân có ích, đáp ứng yêu cầu của sự nghiệp CNH-HĐH.' },
      { note: 'Mỗi giờ học tốt của em hôm nay là một viên gạch đóng góp cho đất nước hiện đại ngày mai.' },
    ],
    [
      { q: 'Em là HS lớp 9, có thể đóng góp gì cho sự nghiệp CNH-HĐH?', a: 'Học tốt — đặc biệt Toán/Lý/Hoá/Tin/Anh; tự học công nghệ; rèn kĩ năng số; tham gia CLB STEM; chuẩn bị tâm thế và định hướng nghề phù hợp xu thế (CNTT, năng lượng tái tạo, công nghệ y sinh).' },
      { q: 'CNH-HĐH có cần đến các ngành Văn, Sử, Địa không?', a: 'Có. Phát triển hài hoà cần cả khoa học tự nhiên và khoa học xã hội. Văn hoá - lịch sử là nền tảng tinh thần; Văn - Sử - Địa đào tạo nhà giáo dục, truyền thông, ngoại giao — đều quan trọng cho sự phát triển.' },
      { q: 'Một bạn nói "CNH-HĐH là việc của Nhà nước và doanh nghiệp, HS không liên quan". Em phản hồi?', a: 'Không đúng. CNH-HĐH cần nguồn nhân lực chất lượng cao, mà HS hôm nay chính là nhân lực ngày mai. Học tập, rèn luyện tốt từ bây giờ là cách HS góp phần thiết thực nhất vào sự nghiệp chung.' },
    ]
  ),

  'S9GDCD-w12-quiz': L(
    'Ôn tập học kì I — Đạo đức công dân',
    'Tuần 12 hệ thống lại các bài đạo đức của học kì I — chuẩn bị cho bài kiểm tra giữa kì.',
    ['Tổng kết các phẩm chất đạo đức đã học.', 'Hiểu mối liên hệ giữa các phẩm chất.', 'Vận dụng vào tình huống thực tế.'],
    [
      { h: 'Các phẩm chất đã học trong HK1' },
      { ul: ['Chí công vô tư.', 'Tự chủ.', 'Dân chủ và kỉ luật.', 'Bảo vệ hoà bình.', 'Tình hữu nghị giữa các dân tộc; hợp tác cùng phát triển.', 'Kế thừa và phát huy truyền thống dân tộc.', 'Năng động, sáng tạo.', 'Làm việc có năng suất, chất lượng, hiệu quả.', 'Lý tưởng sống của thanh niên.', 'Trách nhiệm của thanh niên trong CNH-HĐH.'] },
      { h: 'Nhóm phẩm chất cá nhân' },
      { ul: ['Tự chủ: làm chủ bản thân.', 'Chí công vô tư: công bằng, vì lợi ích chung.', 'Năng động, sáng tạo: dám nghĩ, dám làm.', 'Làm việc hiệu quả: lao động khoa học.'] },
      { h: 'Nhóm phẩm chất cộng đồng - quốc tế' },
      { ul: ['Dân chủ và kỉ luật.', 'Bảo vệ hoà bình.', 'Hữu nghị và hợp tác.', 'Kế thừa truyền thống dân tộc.'] },
      { h: 'Mối liên hệ giữa các phẩm chất' },
      { ul: ['Có lý tưởng sống → năng động, sáng tạo → làm việc hiệu quả.', 'Tự chủ + chí công vô tư → tạo uy tín cá nhân.', 'Dân chủ + kỉ luật → sức mạnh tập thể.', 'Hợp tác + hữu nghị → đất nước phát triển.'] },
      { h: 'Các dạng đề thường gặp' },
      { ul: ['Trình bày khái niệm, biểu hiện của một phẩm chất.', 'Phân tích tình huống và đề xuất cách giải quyết.', 'Liên hệ bản thân.', 'So sánh, phân biệt các phẩm chất.'] },
      { h: 'Mẹo ôn tập' },
      { ul: ['Lập sơ đồ tư duy hệ thống các phẩm chất.', 'Tự tạo 3-5 tình huống cho mỗi phẩm chất.', 'Học theo cặp, hỏi đáp lẫn nhau.', 'Liên hệ với những việc làm thực tế của bản thân.'] },
      { note: 'Đạo đức không phải để học thuộc — đạo đức được rèn qua hành động hằng ngày, từ những việc nhỏ nhất.' },
    ],
    [
      { q: 'Tình huống: bạn rủ em quay cóp khi kiểm tra. Em vận dụng phẩm chất nào để từ chối?', a: 'Tự chủ (không bị lôi kéo) + chí công vô tư (làm theo lẽ phải, công bằng) + lý tưởng sống (rèn năng lực thật để góp phần xây dựng đất nước). Quay cóp là tự lừa dối mình và bất công với bạn khác.' },
      { q: 'Vì sao chí công vô tư khó áp dụng nhất khi liên quan đến người thân?', a: 'Vì tình cảm dễ làm mờ lí trí. Khi người thân sai, ta dễ bao che. Chí công vô tư đòi hỏi vượt lên tình riêng để giữ lẽ phải — phải rèn từ những việc nhỏ trong gia đình.' },
      { q: 'Bạn nói "Năng động, sáng tạo là của người có tài, mình bình thường thì học làm gì?". Em phản hồi?', a: 'Năng động, sáng tạo không phải đặc quyền của người tài bẩm sinh, mà là phẩm chất rèn luyện được. Ai cũng có thể chủ động hơn, tìm cách làm hay hơn trong việc của mình. Càng luyện càng giỏi.' },
    ]
  ),

  'S9GDCD-w13-quiz': L(
    'Kiểm tra giữa HK1',
    'Bài kiểm tra giữa HK1 — đánh giá năng lực sau 12 tuần học, đồng thời rèn kĩ năng làm bài.',
    ['Vận dụng kiến thức vào đề kiểm tra.', 'Trình bày bài có hệ thống, mạch lạc.', 'Tự đánh giá và rút kinh nghiệm.'],
    [
      { h: 'Cấu trúc đề thường gặp' },
      { ul: ['Trắc nghiệm: câu hỏi khái niệm, nhận biết, thông hiểu.', 'Tự luận ngắn: nêu khái niệm, biểu hiện, ý nghĩa.', 'Tình huống: phân tích đúng/sai và đề xuất cách xử lí.', 'Liên hệ bản thân.'] },
      { h: 'Mức độ câu hỏi' },
      { ul: ['Nhận biết: nhớ khái niệm, định nghĩa.', 'Thông hiểu: giải thích, phân biệt.', 'Vận dụng: xử lí tình huống thực tế.', 'Vận dụng cao: liên hệ, đề xuất giải pháp.'] },
      { h: 'Lưu ý khi làm bài' },
      { ul: ['Đọc kĩ đề, gạch chân từ khoá.', 'Phân bố thời gian: làm câu dễ trước, câu khó sau.', 'Câu tình huống: nêu rõ phẩm chất + lí do + cách giải quyết.', 'Câu liên hệ: viết thật về bản thân và kế hoạch rèn luyện.'] },
      { h: 'Mẫu trả lời câu tình huống' },
      { p: '(1) Xác định tình huống liên quan đến phẩm chất gì. (2) Phân tích đúng/sai của các bên. (3) Đề xuất cách giải quyết phù hợp. (4) Rút ra bài học cho bản thân.' },
      { h: 'Tâm lí làm bài' },
      { ul: ['Ngủ đủ giấc vào tối hôm trước.', 'Đến sớm, hít thở sâu trước khi bắt đầu.', 'Không nhìn bài bạn — đó là mất tự chủ và trái với chí công vô tư.', 'Tin vào sự chuẩn bị của bản thân.'] },
      { h: 'Sau khi làm bài' },
      { ul: ['Dành vài phút cuối kiểm tra lại.', 'Xem lại các câu chưa chắc chắn.', 'Sau khi có điểm, phân tích lỗi sai để lần sau tốt hơn.'] },
      { note: 'Bài kiểm tra GDCD đánh giá cách em hiểu cuộc sống, không chỉ thuộc lòng — hãy viết bằng trải nghiệm thật của mình.' },
    ],
    [
      { q: 'Đề: "Nêu trách nhiệm của HS lớp 9 trong việc kế thừa và phát huy truyền thống dân tộc". Cấu trúc bài?', a: '(1) Khái niệm truyền thống tốt đẹp. (2) Nêu 3-4 truyền thống tiêu biểu của Việt Nam. (3) Trách nhiệm: tìm hiểu, học tập, tự hào, vận dụng, loại bỏ hủ tục. (4) Liên hệ bản thân bằng việc làm cụ thể.' },
      { q: 'Em không kịp làm hết bài. Cách xử lí?', a: 'Câu chưa làm: viết ý chính dạng gạch đầu dòng — giám thị sẽ thấy em hiểu vấn đề và cho điểm ý. Đừng bỏ trống. Câu đã làm: gạch dưới ý chính cho dễ chấm.' },
      { q: 'Em làm bài xong sớm, còn dư thời gian. Nên làm gì?', a: 'Không nên nộp ngay. Đọc lại toàn bộ bài: kiểm tra chính tả, bổ sung dẫn chứng, rà soát câu trắc nghiệm xem có khoanh nhầm không. Nhiều bạn mất điểm oan vì vội nộp.' },
    ]
  ),

  'S9GDCD-w14-quiz': L(
    'Quyền và nghĩa vụ của công dân trong hôn nhân — Nguyên tắc',
    'Học kì II chuyển sang pháp luật — bắt đầu với hôn nhân và gia đình. Kiến thức này theo các em suốt cuộc đời.',
    ['Hiểu khái niệm hôn nhân theo pháp luật.', 'Nắm các nguyên tắc cơ bản của chế độ hôn nhân.', 'Phân biệt hôn nhân hợp pháp và không hợp pháp.'],
    [
      { h: 'Hôn nhân là gì?' },
      { p: 'Hôn nhân là sự liên kết đặc biệt giữa một nam và một nữ trên nguyên tắc bình đẳng, tự nguyện, được Nhà nước thừa nhận, nhằm chung sống lâu dài và xây dựng một gia đình hoà thuận, hạnh phúc.' },
      { h: 'Các nguyên tắc cơ bản của chế độ hôn nhân ở Việt Nam' },
      { ul: ['Hôn nhân tự nguyện, tiến bộ — một vợ một chồng, vợ chồng bình đẳng.', 'Hôn nhân giữa công dân Việt Nam thuộc các dân tộc, tôn giáo, giữa người theo và không theo tôn giáo, giữa công dân Việt Nam với người nước ngoài được tôn trọng và bảo vệ.', 'Vợ chồng có nghĩa vụ thực hiện chính sách dân số và kế hoạch hoá gia đình.'] },
      { h: 'Quyền và nghĩa vụ cơ bản của công dân trong hôn nhân' },
      { ul: ['Nam, nữ có quyền kết hôn, ly hôn theo quy định pháp luật.', 'Vợ chồng bình đẳng, có nghĩa vụ tôn trọng, yêu thương, chung thuỷ.', 'Cùng nhau xây dựng gia đình, nuôi dạy con cái.'] },
      { h: 'Điều kiện kết hôn' },
      { ul: ['Nam từ đủ 20 tuổi trở lên, nữ từ đủ 18 tuổi trở lên.', 'Việc kết hôn do nam, nữ tự nguyện quyết định.', 'Không bị mất năng lực hành vi dân sự.', 'Không thuộc các trường hợp cấm kết hôn.'] },
      { h: 'Các trường hợp cấm kết hôn' },
      { ul: ['Người đang có vợ hoặc chồng.', 'Người mất năng lực hành vi dân sự.', 'Giữa những người cùng dòng máu về trực hệ, trong phạm vi ba đời.', 'Giữa cha mẹ nuôi với con nuôi.'] },
      { h: 'Đăng kí kết hôn' },
      { p: 'Việc kết hôn phải được đăng kí tại Uỷ ban nhân dân xã/phường nơi cư trú. Không đăng kí thì hôn nhân không có giá trị pháp lí, quyền lợi của các bên không được pháp luật bảo vệ.' },
      { note: 'Hôn nhân là quyết định quan trọng cả đời — cần dựa trên tình yêu chân thành, sự hiểu biết và đúng pháp luật, không vội vàng theo cảm xúc.' },
    ],
    [
      { q: 'Anh chị em họ (con của hai anh em ruột) có được kết hôn không?', a: 'Không. Pháp luật cấm kết hôn giữa những người cùng dòng máu về trực hệ và trong phạm vi ba đời. Quy định này nhằm bảo vệ sức khoẻ nòi giống và phù hợp đạo lí truyền thống.' },
      { q: 'Một bạn nữ 17 tuổi muốn kết hôn vì đã có thai. Pháp luật giải quyết thế nào?', a: 'Pháp luật không cho phép kết hôn vì chưa đủ 18 tuổi. Bạn cần giải pháp khác: được hỗ trợ chăm sóc thai sản, tiếp tục học tập; người cha của thai nhi vẫn có trách nhiệm pháp lí dù chưa cưới hỏi.' },
      { q: 'Hai người chung sống với nhau như vợ chồng nhưng không đăng kí kết hôn. Pháp luật công nhận không?', a: 'Không công nhận là vợ chồng hợp pháp. Khi xảy ra tranh chấp tài sản, con cái, quyền lợi của các bên (nhất là phụ nữ và trẻ em) khó được bảo vệ đầy đủ. Vì vậy cần đăng kí kết hôn đúng quy định.' },
    ]
  ),

  'S9GDCD-w15-quiz': L(
    'Quyền tự do kinh doanh và nghĩa vụ đóng thuế',
    'Kinh doanh và thuế là hai mặt của cùng một vấn đề — quyền lợi đi đôi với nghĩa vụ của công dân.',
    ['Hiểu quyền tự do kinh doanh của công dân.', 'Nắm nghĩa vụ đóng thuế và ý nghĩa của thuế.', 'Nhận biết các hành vi vi phạm pháp luật về kinh doanh và thuế.'],
    [
      { h: 'Kinh doanh là gì?' },
      { p: 'Kinh doanh là hoạt động sản xuất, dịch vụ và trao đổi hàng hoá nhằm mục đích thu lợi nhuận.' },
      { h: 'Quyền tự do kinh doanh' },
      { p: 'Quyền tự do kinh doanh là quyền của công dân được lựa chọn hình thức tổ chức kinh tế, ngành nghề và quy mô kinh doanh — trong khuôn khổ pháp luật cho phép.' },
      { h: 'Điều kiện kinh doanh' },
      { ul: ['Phải đăng kí kinh doanh theo quy định.', 'Kinh doanh đúng ngành, nghề đã đăng kí.', 'Đối với ngành nghề có điều kiện: phải có đủ các giấy phép (an toàn thực phẩm, phòng cháy chữa cháy...).', 'Không kinh doanh hàng cấm, hàng giả, hàng kém chất lượng.'] },
      { h: 'Thuế là gì?' },
      { p: 'Thuế là một phần thu nhập mà công dân và tổ chức kinh tế có nghĩa vụ nộp vào ngân sách Nhà nước để chi cho các công việc chung như an ninh, quốc phòng, giáo dục, y tế, xây dựng hạ tầng.' },
      { h: 'Một số loại thuế phổ biến' },
      { ul: ['Thuế thu nhập cá nhân.', 'Thuế giá trị gia tăng (VAT).', 'Thuế thu nhập doanh nghiệp.', 'Thuế tiêu thụ đặc biệt (thuốc lá, rượu, bia...).'] },
      { h: 'Ý nghĩa của thuế' },
      { ul: ['Là nguồn thu chủ yếu của ngân sách Nhà nước.', 'Góp phần ổn định thị trường, điều chỉnh cơ cấu kinh tế.', 'Bảo đảm công bằng xã hội (người thu nhập cao đóng nhiều hơn).'] },
      { h: 'Các hành vi vi phạm' },
      { ul: ['Trốn thuế, gian lận thuế.', 'Kinh doanh không có giấy phép, kinh doanh hàng cấm.', 'Buôn lậu, sản xuất - buôn bán hàng giả.'] },
      { note: 'Đóng thuế là đóng góp xây dựng đất nước, để có trường học, bệnh viện, đường sá — không phải là "mất tiền".' },
    ],
    [
      { q: 'Em muốn mở quán bán bánh tráng trộn online. Cần làm gì cho đúng pháp luật?', a: 'Đăng kí hộ kinh doanh tại UBND xã/phường khi đủ điều kiện; thực hiện nghĩa vụ thuế theo quy định; bảo đảm vệ sinh an toàn thực phẩm. Nếu doanh thu rất nhỏ dưới ngưỡng quy định thì có thể được miễn thuế.' },
      { q: 'Người buôn ma tuý có được coi là "tự do kinh doanh" không?', a: 'Không. Ma tuý là hàng cấm. Quyền tự do kinh doanh chỉ áp dụng cho hàng hoá, dịch vụ mà pháp luật cho phép. Buôn ma tuý là tội phạm hình sự, bị xử lí rất nghiêm khắc.' },
      { q: 'Một chủ cửa hàng bán nhiều nhưng khai doanh thu thấp để nộp ít thuế. Đánh giá hành vi này?', a: 'Đó là hành vi trốn thuế — vi phạm pháp luật. Tuỳ mức độ, người vi phạm bị phạt tiền, truy thu thuế, thậm chí truy cứu trách nhiệm hình sự. Trốn thuế là lấy đi nguồn lực chung của xã hội.' },
    ]
  ),

  'S9GDCD-w16-quiz': L(
    'Quyền và nghĩa vụ lao động của công dân',
    'Lao động vừa là quyền, vừa là nghĩa vụ. Hiểu rõ giúp em biết bảo vệ mình khi đi làm sau này.',
    ['Hiểu khái niệm lao động và vai trò của lao động.', 'Nắm quyền và nghĩa vụ lao động của công dân.', 'Biết quy định về tuổi lao động và lao động trẻ em.'],
    [
      { h: 'Lao động là gì?' },
      { p: 'Lao động là hoạt động có mục đích của con người nhằm tạo ra của cải vật chất và các giá trị tinh thần cho xã hội. Lao động là hoạt động chủ yếu, quan trọng nhất của con người, là nhân tố quyết định sự tồn tại, phát triển của đất nước và nhân loại.' },
      { h: 'Quyền lao động của công dân' },
      { ul: ['Tự do sử dụng sức lao động để học nghề, tìm kiếm việc làm.', 'Lựa chọn nghề nghiệp có ích cho xã hội.', 'Được hưởng lương theo công sức, được nghỉ ngơi.', 'Được bảo hiểm xã hội, bảo hiểm y tế.'] },
      { h: 'Nghĩa vụ lao động của công dân' },
      { ul: ['Lao động để tự nuôi sống bản thân, gia đình.', 'Góp phần tạo ra của cải vật chất và tinh thần cho xã hội.', 'Duy trì và phát triển đất nước.', 'Tuân thủ kỉ luật lao động, bảo vệ tài sản chung.'] },
      { h: 'Vai trò của Nhà nước' },
      { ul: ['Khuyến khích, tạo điều kiện cho tổ chức, cá nhân tạo việc làm.', 'Khuyến khích các hoạt động tạo ra việc làm thu hút lao động.', 'Cấm cưỡng bức, ngược đãi người lao động.'] },
      { h: 'Quy định về tuổi lao động' },
      { ul: ['Người lao động chưa thành niên là người dưới 18 tuổi.', 'Cấm nhận trẻ em chưa đủ 15 tuổi vào làm việc (trừ một số công việc nhẹ theo quy định).', 'Cấm sử dụng người lao động dưới 18 tuổi làm công việc nặng nhọc, độc hại, nguy hiểm.'] },
      { h: 'Lao động trẻ em' },
      { p: 'Việc lạm dụng sức lao động của trẻ em dưới độ tuổi quy định là vi phạm pháp luật và đạo đức, ảnh hưởng nghiêm trọng đến sức khoẻ, học tập và tương lai của trẻ.' },
      { note: 'Quyền và nghĩa vụ lao động luôn gắn liền với nhau — không thể chỉ đòi quyền mà quên nghĩa vụ.' },
    ],
    [
      { q: 'Em 14 tuổi, có thể nhận làm phục vụ quán cà phê không?', a: 'Pháp luật không cho phép vì chưa đủ 15 tuổi. Một số việc rất nhẹ (như biểu diễn nghệ thuật) có thể được làm nhưng phải có sự đồng ý của cha mẹ và cơ quan có thẩm quyền, đồng thời không ảnh hưởng việc học.' },
      { q: 'Anh trai em bị bóc lột — làm 12 tiếng/ngày, không trả đủ lương. Anh nên làm gì?', a: 'Khiếu nại lên phòng Lao động - Thương binh và Xã hội hoặc liên đoàn lao động địa phương. Có thể khởi kiện ra toà nếu công ty vi phạm hợp đồng. Đó là quyền lao động được pháp luật bảo vệ.' },
      { q: 'Có người nói "Lao động chỉ là nghĩa vụ của người nghèo, người giàu không cần lao động". Em phản hồi?', a: 'Không đúng. Lao động là quyền và nghĩa vụ của mọi công dân, không phân biệt giàu nghèo. Lao động tạo ra giá trị, giúp con người trưởng thành và đóng góp cho xã hội. Sống không lao động, chỉ ăn bám là điều đáng phê phán.' },
    ]
  ),

  'S9GDCD-w17-quiz': L(
    'Vi phạm pháp luật và trách nhiệm pháp lí',
    'Pháp luật và đời sống đi liền nhau — biết các loại vi phạm và trách nhiệm pháp lí giúp em tránh sai lầm và biết phản ứng đúng.',
    ['Hiểu khái niệm vi phạm pháp luật.', 'Phân loại được 4 loại vi phạm pháp luật.', 'Biết 4 loại trách nhiệm pháp lí và độ tuổi chịu trách nhiệm.'],
    [
      { h: 'Vi phạm pháp luật là gì?' },
      { p: 'Vi phạm pháp luật là hành vi trái pháp luật, có lỗi, do người có năng lực trách nhiệm pháp lí thực hiện, xâm hại đến các quan hệ xã hội được pháp luật bảo vệ.' },
      { h: 'Các dấu hiệu của vi phạm pháp luật' },
      { ul: ['Là hành vi (hành động hoặc không hành động).', 'Trái pháp luật.', 'Có lỗi (cố ý hoặc vô ý).', 'Do người có năng lực trách nhiệm pháp lí thực hiện.'] },
      { h: 'Bốn loại vi phạm pháp luật' },
      { ul: ['Vi phạm hình sự (tội phạm): nguy hiểm cho xã hội (giết người, cướp tài sản).', 'Vi phạm hành chính: xâm phạm quy tắc quản lí Nhà nước (vượt đèn đỏ, xả rác).', 'Vi phạm dân sự: xâm phạm quan hệ tài sản, quan hệ nhân thân (vi phạm hợp đồng).', 'Vi phạm kỉ luật: xâm phạm quan hệ lao động, công vụ, nội quy (HS đi muộn, công chức bỏ việc).'] },
      { h: 'Trách nhiệm pháp lí là gì?' },
      { p: 'Trách nhiệm pháp lí là nghĩa vụ mà các cá nhân, tổ chức vi phạm pháp luật phải gánh chịu những biện pháp cưỡng chế do Nhà nước quy định.' },
      { h: 'Bốn loại trách nhiệm pháp lí' },
      { ul: ['Trách nhiệm hình sự: phạt tù, cải tạo, tử hình...', 'Trách nhiệm hành chính: phạt tiền, cảnh cáo...', 'Trách nhiệm dân sự: bồi thường thiệt hại, xin lỗi...', 'Trách nhiệm kỉ luật: khiển trách, cảnh cáo, buộc thôi việc...'] },
      { h: 'Ý nghĩa của trách nhiệm pháp lí' },
      { ul: ['Trừng phạt, ngăn ngừa, cải tạo người vi phạm.', 'Giáo dục mọi người ý thức tôn trọng pháp luật.', 'Bảo vệ trật tự xã hội và quyền lợi hợp pháp của công dân.'] },
      { h: 'Tuổi chịu trách nhiệm pháp lí' },
      { ul: ['Người từ đủ 16 tuổi trở lên phải chịu trách nhiệm hình sự về mọi tội phạm.', 'Người từ đủ 14 đến dưới 16 tuổi chịu trách nhiệm hình sự về tội rất nghiêm trọng hoặc đặc biệt nghiêm trọng.', 'Người từ đủ 14 tuổi trở lên chịu trách nhiệm hành chính theo quy định.'] },
      { note: 'Học sinh đã có thể phải chịu trách nhiệm pháp lí — không phải "trẻ con thì làm gì cũng không sao".' },
    ],
    [
      { q: 'Em 15 tuổi đánh người gây thương tích nặng. Có phải chịu trách nhiệm gì?', a: 'Có thể chịu trách nhiệm hình sự về tội cố ý gây thương tích nếu hậu quả ở mức rất nghiêm trọng hoặc đặc biệt nghiêm trọng. Người từ đủ 14 đến dưới 16 tuổi phải chịu trách nhiệm hình sự đối với một số tội nặng theo Bộ luật Hình sự.' },
      { q: 'Bạn em mượn xe đạp rồi đem bán mất. Trách nhiệm gì?', a: 'Trách nhiệm dân sự (phải bồi thường). Nếu cố ý chiếm đoạt và giá trị lớn, có thể thêm trách nhiệm hình sự về tội "lạm dụng tín nhiệm chiếm đoạt tài sản".' },
      { q: 'Một bạn đi học muộn nhiều lần. Đây là loại vi phạm gì và chịu trách nhiệm gì?', a: 'Đây là vi phạm kỉ luật (vi phạm nội quy nhà trường), không phải vi phạm pháp luật hình sự. Bạn chịu trách nhiệm kỉ luật: bị nhắc nhở, khiển trách theo quy định của trường.' },
    ]
  ),

  'S9GDCD-w18-quiz': L(
    'Ôn tập học kì I',
    'Tuần cuối HK1 — ôn tổng hợp toàn bộ phần đạo đức và bước đầu pháp luật.',
    ['Hệ thống toàn bộ kiến thức HK1.', 'Vận dụng vào đa dạng tình huống.', 'Chuẩn bị tốt cho bài thi cuối kì.'],
    [
      { h: 'Nội dung trọng tâm HK1' },
      { ul: ['Đạo đức: các phẩm chất từ chí công vô tư đến trách nhiệm thanh niên.', 'Pháp luật: hôn nhân, kinh doanh - thuế, lao động, vi phạm pháp luật và trách nhiệm pháp lí.'] },
      { h: 'Hệ thống phần đạo đức' },
      { ul: ['Phẩm chất cá nhân: tự chủ, chí công vô tư, năng động sáng tạo.', 'Phẩm chất cộng đồng: dân chủ - kỉ luật, hữu nghị - hợp tác.', 'Phẩm chất với dân tộc: kế thừa truyền thống, lý tưởng sống, trách nhiệm thanh niên.'] },
      { h: 'Hệ thống phần pháp luật' },
      { ul: ['Hôn nhân và gia đình: nguyên tắc, điều kiện kết hôn.', 'Kinh doanh và thuế: quyền tự do kinh doanh, nghĩa vụ đóng thuế.', 'Lao động: quyền, nghĩa vụ, tuổi lao động.', 'Vi phạm pháp luật và trách nhiệm pháp lí: 4 loại.'] },
      { h: 'Mối liên hệ đạo đức - pháp luật' },
      { ul: ['Đạo đức tạo ra ý thức tự giác tuân thủ pháp luật.', 'Pháp luật bảo vệ và củng cố các giá trị đạo đức.', 'Hai mặt bổ sung, hỗ trợ cho nhau.'] },
      { h: 'Các dạng đề thường gặp' },
      { ul: ['Trắc nghiệm khái niệm, phân loại.', 'Tự luận: phân tích nội dung một phẩm chất hoặc một quyền.', 'Tình huống pháp lí.', 'Liên hệ bản thân và đề xuất giải pháp.'] },
      { h: 'Lời khuyên ôn tập' },
      { ul: ['Vẽ sơ đồ tư duy tổng kết toàn bộ.', 'Tự đặt câu hỏi và trả lời.', 'Học chắc các con số cơ bản (tuổi kết hôn, tuổi lao động, tuổi chịu trách nhiệm).', 'Thực hành phân tích nhiều tình huống.'] },
      { note: 'GDCD lớp 9 là môn thi vào 10 ở nhiều tỉnh — đầu tư công sức cho môn này hoàn toàn xứng đáng.' },
    ],
    [
      { q: 'Đề: "Phân tích mối quan hệ giữa quyền và nghĩa vụ lao động". Cấu trúc bài?', a: '(1) Khái niệm lao động. (2) Quyền lao động: liệt kê 4-5 quyền cơ bản. (3) Nghĩa vụ lao động: 4-5 nghĩa vụ. (4) Mối quan hệ: quyền đi đôi với nghĩa vụ, không thể chỉ có một mặt. (5) Liên hệ bản thân.' },
      { q: 'Em chưa nắm chắc 4 loại vi phạm pháp luật. Học thế nào cho dễ nhớ?', a: 'Lập bảng so sánh 4 cột: Tên loại - Đặc điểm - Ví dụ - Trách nhiệm tương ứng. Học thuộc bảng rồi áp dụng vào 10 tình huống thực tế. Sau vài lần luyện sẽ nhớ chắc và phân biệt được.' },
      { q: 'Em hay nhầm giữa "vi phạm hành chính" và "vi phạm hình sự". Phân biệt thế nào?', a: 'Vi phạm hình sự là tội phạm — nguy hiểm cao cho xã hội, do Toà án xử lí, hình phạt nặng (tù, cải tạo). Vi phạm hành chính nhẹ hơn — xâm phạm quy tắc quản lí, do cơ quan hành chính xử lí, chủ yếu phạt tiền, cảnh cáo. Ví dụ: cướp tài sản (hình sự) khác vượt đèn đỏ (hành chính).' },
    ]
  ),

  'S9GDCD-w19-quiz': L(
    'Quyền tham gia quản lí nhà nước, quản lí xã hội của công dân',
    'Đây là quyền chính trị quan trọng của công dân — thể hiện vai trò làm chủ đất nước của nhân dân.',
    ['Hiểu khái niệm và nội dung của quyền.', 'Biết các hình thức tham gia.', 'Có ý thức tham gia phù hợp với lứa tuổi.'],
    [
      { h: 'Quyền tham gia quản lí nhà nước, quản lí xã hội là gì?' },
      { p: 'Là quyền tham gia bàn bạc, tổ chức thực hiện, giám sát và đánh giá các hoạt động, các công việc chung của Nhà nước và xã hội. Đây là quyền chính trị quan trọng nhất của công dân, là cơ sở pháp lí để nhân dân tham gia vào hoạt động của bộ máy Nhà nước.' },
      { h: 'Nội dung của quyền' },
      { ul: ['Tham gia xây dựng bộ máy Nhà nước và các tổ chức xã hội.', 'Tham gia bàn bạc, tổ chức thực hiện công việc chung.', 'Tham gia giám sát, đánh giá hoạt động của Nhà nước.', 'Kiến nghị với cơ quan nhà nước.'] },
      { h: 'Hai phương thức tham gia' },
      { ul: ['Trực tiếp: tự mình tham gia bầu cử, biểu quyết, đóng góp ý kiến.', 'Gián tiếp: thông qua đại biểu của nhân dân (đại biểu Quốc hội, đại biểu Hội đồng nhân dân).'] },
      { h: 'Các hình thức cụ thể' },
      { ul: ['Tham gia bầu cử đại biểu Quốc hội, Hội đồng nhân dân.', 'Đóng góp ý kiến xây dựng văn bản, chính sách.', 'Khiếu nại, tố cáo, kiến nghị.', 'Tham gia tổ chức xã hội: Đoàn Thanh niên, Hội Phụ nữ...'] },
      { h: 'Quy định độ tuổi' },
      { ul: ['Đủ 18 tuổi trở lên: có quyền bầu cử.', 'Đủ 21 tuổi trở lên: có quyền ứng cử đại biểu Quốc hội, Hội đồng nhân dân.'] },
      { h: 'Trách nhiệm của Nhà nước và công dân' },
      { ul: ['Nhà nước tạo điều kiện để công dân thực hiện quyền.', 'Công dân tham gia tích cực, có trách nhiệm.', 'Học sinh tham gia phù hợp với lứa tuổi.'] },
      { h: 'Học sinh lớp 9 tham gia thế nào?' },
      { ul: ['Tham gia hoạt động Đoàn, Đội của trường.', 'Đóng góp ý kiến xây dựng lớp, trường.', 'Tham gia bầu cử cán bộ lớp một cách dân chủ.', 'Tìm hiểu, quan tâm đến các vấn đề chung của xã hội.'] },
      { note: 'Quyền chính trị càng được sử dụng càng vững mạnh — đừng thờ ơ, vô cảm với công việc chung của đất nước.' },
    ],
    [
      { q: 'Em 14 tuổi có quyền tham gia quản lí nhà nước, quản lí xã hội không?', a: 'Có. Không phải đến 18 tuổi mới có quyền — em đã có thể đóng góp ý kiến, kiến nghị, tham gia các tổ chức Đoàn, Đội, các hoạt động chung. Riêng quyền bầu cử mới phải đợi đủ 18 tuổi.' },
      { q: 'Có nên đăng bài chỉ trích một chính sách của Nhà nước không?', a: 'Công dân có quyền góp ý, phản biện nhưng phải tuân thủ pháp luật: có căn cứ, có thái độ xây dựng, không xuyên tạc, không vu khống. Tốt nhất là góp ý qua các kênh chính thức để được xem xét.' },
      { q: 'Bạn nói "Tham gia quản lí là việc của cán bộ, dân thường nói cũng chẳng ai nghe". Em phản hồi?', a: 'Không đúng. Quyền tham gia quản lí là cơ sở để nhân dân làm chủ. Nhiều chính sách được điều chỉnh nhờ ý kiến nhân dân qua lấy ý kiến, tiếp xúc cử tri. Mỗi đóng góp đúng đắn đều có giá trị; thờ ơ mới khiến tiếng nói của mình bị bỏ qua.' },
    ]
  ),

  'S9GDCD-w20-quiz': L(
    'Nghĩa vụ bảo vệ Tổ quốc',
    'Bảo vệ Tổ quốc là nghĩa vụ thiêng liêng và cao quý — gắn liền với truyền thống yêu nước của dân tộc Việt Nam.',
    ['Hiểu khái niệm bảo vệ Tổ quốc.', 'Nắm các nội dung của nghĩa vụ bảo vệ Tổ quốc.', 'Có ý thức và hành động cụ thể phù hợp lứa tuổi.'],
    [
      { h: 'Bảo vệ Tổ quốc là gì?' },
      { p: 'Bảo vệ Tổ quốc là bảo vệ độc lập, chủ quyền, thống nhất và toàn vẹn lãnh thổ của Tổ quốc; bảo vệ chế độ xã hội chủ nghĩa và Nhà nước Cộng hoà xã hội chủ nghĩa Việt Nam.' },
      { h: 'Vì sao phải bảo vệ Tổ quốc?' },
      { ul: ['Non sông đất nước Việt Nam được tạo dựng bằng công sức, máu xương của cha ông.', 'Đất nước đang đứng trước nhiều âm mưu chống phá, xâm phạm.', 'Bảo vệ Tổ quốc là điều kiện để xây dựng và phát triển đất nước.'] },
      { h: 'Nội dung của nghĩa vụ bảo vệ Tổ quốc' },
      { ul: ['Xây dựng lực lượng quốc phòng toàn dân.', 'Thực hiện nghĩa vụ quân sự.', 'Thực hiện chính sách hậu phương quân đội.', 'Bảo vệ trật tự, an ninh xã hội.', 'Bảo vệ chủ quyền biển, đảo.'] },
      { h: 'Nghĩa vụ quân sự' },
      { ul: ['Nam công dân từ đủ 18 đến hết 25 tuổi (đến 27 tuổi nếu được đào tạo trình độ cao).', 'Thời gian tại ngũ là 24 tháng.', 'Một số trường hợp được tạm hoãn, miễn theo quy định của pháp luật.'] },
      { h: 'Trách nhiệm của công dân, học sinh' },
      { ul: ['Ra sức học tập, tu dưỡng đạo đức, rèn luyện sức khoẻ.', 'Tích cực tham gia phong trào bảo vệ trật tự, an ninh.', 'Sẵn sàng làm nghĩa vụ quân sự khi đến tuổi.', 'Vận động người thân thực hiện nghĩa vụ quân sự.'] },
      { h: 'Học sinh lớp 9 thực hiện thế nào?' },
      { ul: ['Học tốt, đặc biệt chuẩn bị cho môn Giáo dục Quốc phòng và An ninh ở cấp 3.', 'Rèn luyện sức khoẻ, kĩ năng sống.', 'Tìm hiểu, khẳng định chủ quyền biển đảo (Hoàng Sa, Trường Sa thuộc Việt Nam).', 'Cảnh giác trước thông tin sai lệch về chủ quyền.'] },
      { note: 'Bảo vệ Tổ quốc không chỉ là cầm súng nơi biên cương — mà còn là mỗi hành động bảo vệ giá trị, danh dự của dân tộc trong đời sống thường ngày.' },
    ],
    [
      { q: 'Em là nữ, có nghĩa vụ quân sự không?', a: 'Nghĩa vụ quân sự bắt buộc đối với nam công dân; nữ trong độ tuổi nếu có chuyên môn phù hợp được đăng kí và sắp xếp dự bị. Pháp luật khuyến khích nữ tự nguyện tham gia; khi cần, nữ có thể được huy động và hoàn toàn có thể chọn quân đội làm nghề nghiệp.' },
      { q: 'Bạn nói "Hoàng Sa thuộc Trung Quốc" theo thông tin trên mạng. Em ứng xử thế nào?', a: 'Bình tĩnh giải thích: Hoàng Sa thuộc chủ quyền Việt Nam theo lịch sử và pháp luật quốc tế. Đây là vấn đề chủ quyền thiêng liêng — cần dùng nguồn chính thống (Cổng thông tin Bộ Ngoại giao) để có thông tin đúng, không tin theo tin sai lệch.' },
      { q: 'Một bạn cho rằng "Hết chiến tranh rồi, bảo vệ Tổ quốc làm gì nữa". Em phản hồi?', a: 'Bảo vệ Tổ quốc không chỉ là chống chiến tranh, mà còn là bảo vệ chủ quyền biển đảo, giữ an ninh trật tự, chống thông tin xuyên tạc, bảo vệ kinh tế và văn hoá dân tộc. Đó là nhiệm vụ thường xuyên, cấp thiết ngay cả trong thời bình.' },
    ]
  ),

  'S9GDCD-w21-quiz': L(
    'Sống có đạo đức và tuân theo pháp luật',
    'Đây là chủ đề tổng kết — kết hợp đạo đức cá nhân và ý thức pháp luật để trở thành công dân tốt, có ích.',
    ['Hiểu thế nào là sống có đạo đức và tuân theo pháp luật.', 'Thấy được mối quan hệ giữa đạo đức và pháp luật.', 'Tự rèn luyện cả hai mặt từ việc nhỏ hằng ngày.'],
    [
      { h: 'Sống có đạo đức là gì?' },
      { p: 'Sống có đạo đức là suy nghĩ và hành động theo những chuẩn mực đạo đức xã hội; biết chăm lo đến mọi người, đến công việc chung; biết giải quyết hợp lí giữa quyền lợi và nghĩa vụ; lấy lợi ích của xã hội, của dân tộc làm mục tiêu sống.' },
      { h: 'Tuân theo pháp luật là gì?' },
      { p: 'Tuân theo pháp luật là luôn sống và hành động theo những quy định của pháp luật, không làm những điều pháp luật cấm và làm tròn nghĩa vụ pháp luật yêu cầu.' },
      { h: 'Mối quan hệ giữa đạo đức và pháp luật' },
      { ul: ['Đạo đức là động lực, nền tảng để con người tự giác tuân thủ pháp luật.', 'Pháp luật bảo vệ và phát huy những giá trị đạo đức tốt đẹp.', 'Hai mặt thống nhất, bổ sung cho nhau.'] },
      { h: 'Người sống có đạo đức và tuân pháp luật' },
      { ul: ['Yêu thương, giúp đỡ mọi người; trung thực, lễ phép.', 'Tích cực tham gia hoạt động cộng đồng.', 'Không xả rác, không vi phạm giao thông.', 'Bảo vệ tài sản công, tài sản của người khác.', 'Dám đấu tranh chống cái sai, cái xấu.'] },
      { h: 'Ý nghĩa' },
      { ul: ['Giúp con người tiến bộ, được mọi người tin yêu, kính trọng.', 'Góp phần làm cho xã hội ổn định, văn minh, phát triển.', 'Bản thân sống thanh thản, có ích.'] },
      { h: 'Trách nhiệm của học sinh' },
      { p: 'Mỗi HS cần thường xuyên tự kiểm tra, đánh giá hành vi của mình trong học tập, lao động và quan hệ với mọi người; rèn luyện đạo đức và ý thức pháp luật ngay từ những việc nhỏ.' },
      { note: '"Tu thân, tề gia, trị quốc, bình thiên hạ" — đạo đức cá nhân là gốc của mọi sự nghiệp lớn.' },
    ],
    [
      { q: 'Một người giàu nhưng trốn thuế và đối xử tệ với nhân viên. Có phải sống có đạo đức và tuân pháp luật không?', a: 'Không. Trốn thuế là vi phạm pháp luật; đối xử tệ với người lao động là thiếu đạo đức. Tiền bạc không tạo nên giá trị con người — cách sống mới là điều quan trọng.' },
      { q: 'Em rèn luyện hai mặt này từ những việc nhỏ nào?', a: 'Về đạo đức: chào hỏi lễ phép, giúp bạn yếu, không nói xấu sau lưng, trung thực. Về pháp luật: đội mũ bảo hiểm, không vượt đèn đỏ, không xả rác, không tham gia tệ nạn.' },
      { q: 'Bạn nói "Cứ tuân pháp luật là đủ rồi, cần gì đạo đức". Em phản hồi?', a: 'Pháp luật không thể quy định hết mọi tình huống của cuộc sống. Có nhiều việc đúng pháp luật nhưng vẫn vô đạo đức (vô cảm trước người gặp nạn). Đạo đức là cái gốc giúp con người tự giác sống tốt, vượt trên mức tối thiểu mà pháp luật yêu cầu.' },
    ]
  ),

  'S9GDCD-w22-quiz': L(
    'Pháp luật và kỉ luật',
    'Pháp luật và kỉ luật cùng điều chỉnh hành vi con người — nhưng có những khác biệt quan trọng cần phân biệt.',
    ['Hiểu khái niệm pháp luật và kỉ luật.', 'So sánh được hai khái niệm.', 'Có ý thức tuân thủ cả pháp luật và kỉ luật.'],
    [
      { h: 'Pháp luật là gì?' },
      { p: 'Pháp luật là các quy tắc xử sự chung, có tính bắt buộc, do Nhà nước ban hành, được Nhà nước bảo đảm thực hiện bằng các biện pháp giáo dục, thuyết phục, cưỡng chế.' },
      { h: 'Kỉ luật là gì?' },
      { p: 'Kỉ luật là những quy định, quy ước của một cộng đồng (một tập thể, cơ quan, tổ chức) về những hành vi cần tuân theo nhằm bảo đảm sự phối hợp hành động thống nhất, chặt chẽ của mọi người.' },
      { h: 'Đặc điểm của pháp luật' },
      { ul: ['Do Nhà nước ban hành.', 'Áp dụng cho toàn xã hội.', 'Bắt buộc chung, có chế tài.', 'Được bảo đảm bằng sức mạnh của Nhà nước.'] },
      { h: 'Đặc điểm của kỉ luật' },
      { ul: ['Do cơ quan, tổ chức ban hành.', 'Áp dụng trong phạm vi cộng đồng đó.', 'Bắt buộc với các thành viên.', 'Được bảo đảm bằng tổ chức nội bộ.'] },
      { h: 'Điểm chung' },
      { ul: ['Đều là những quy tắc xử sự chung.', 'Đều mang tính bắt buộc.', 'Đều nhằm bảo vệ lợi ích chung, tạo trật tự ổn định.'] },
      { h: 'Mối quan hệ giữa pháp luật và kỉ luật' },
      { p: 'Những quy định của một tập thể (kỉ luật) phải tuân theo những quy định của pháp luật, không được trái với pháp luật. Pháp luật là khung lớn, kỉ luật là quy định cụ thể bên trong khung đó.' },
      { h: 'Ý nghĩa với học sinh' },
      { ul: ['Giúp mọi người có chuẩn mực chung để rèn luyện, thống nhất hành động.', 'Tạo điều kiện thuận lợi cho cá nhân và xã hội phát triển.', 'Rèn nề nếp, lối sống có kỉ cương.'] },
      { note: 'Tuân thủ kỉ luật ngay từ tuổi học trò là tập làm quen với việc tuân thủ pháp luật khi trưởng thành.' },
    ],
    [
      { q: 'Nội quy lớp em ghi "Phạt tiền 50.000đ nếu đi muộn". Quy định này có hợp pháp không?', a: 'Không. Kỉ luật của lớp, trường không được phạt tiền HS — chỉ có thể nhắc nhở, khiển trách. Phạt tiền là chế tài hành chính của Nhà nước, lớp không có thẩm quyền. Quy định nội bộ phải phù hợp pháp luật.' },
      { q: 'Em vi phạm kỉ luật trường nhưng không vi phạm pháp luật. Có bị truy tố không?', a: 'Không bị truy tố hình sự. Em chỉ bị xử lí kỉ luật của trường (nhắc nhở, khiển trách, cảnh cáo). Trừ khi hành vi đồng thời vi phạm pháp luật (ví dụ đánh bạn gây thương tích nặng) thì còn phải chịu trách nhiệm pháp lí.' },
      { q: 'Phân biệt giúp em: pháp luật và kỉ luật giống và khác nhau ở điểm nào?', a: 'Giống: đều là quy tắc xử sự chung, bắt buộc, vì lợi ích chung. Khác: pháp luật do Nhà nước ban hành, áp dụng toàn xã hội, có chế tài Nhà nước; kỉ luật do tổ chức ban hành, áp dụng trong tổ chức đó, đảm bảo bằng nội bộ và không được trái pháp luật.' },
    ]
  ),

  'S9GDCD-w23-quiz': L(
    'Trách nhiệm pháp lí — Các loại cụ thể',
    'Hiểu chi tiết hơn về 4 loại trách nhiệm pháp lí — kiến thức quan trọng cho mọi công dân.',
    ['Phân biệt rõ 4 loại trách nhiệm pháp lí.', 'Nắm chế tài cụ thể của từng loại.', 'Liên hệ với các hành vi vi phạm phổ biến trong đời sống.'],
    [
      { h: 'Trách nhiệm pháp lí là gì?' },
      { p: 'Là nghĩa vụ đặc biệt mà cá nhân, tổ chức vi phạm pháp luật phải gánh chịu những hậu quả bất lợi do hành vi của mình gây ra, theo quy định của pháp luật.' },
      { h: 'Trách nhiệm hình sự' },
      { ul: ['Áp dụng với người phạm tội (vi phạm Bộ luật Hình sự).', 'Do Toà án nhân dân xét xử và ra phán quyết.', 'Hình phạt: cảnh cáo, phạt tiền, cải tạo không giam giữ, tù có thời hạn, tù chung thân, tử hình.', 'Ví dụ: trộm cắp, cướp tài sản, cố ý gây thương tích nặng.'] },
      { h: 'Trách nhiệm hành chính' },
      { ul: ['Áp dụng với người vi phạm quy tắc quản lí Nhà nước.', 'Do cơ quan hành chính có thẩm quyền xử lí.', 'Hình thức: cảnh cáo, phạt tiền, tịch thu tang vật, tước giấy phép.', 'Ví dụ: vượt đèn đỏ, xả rác bừa bãi, lấn chiếm vỉa hè.'] },
      { h: 'Trách nhiệm dân sự' },
      { ul: ['Áp dụng với người vi phạm quan hệ dân sự (tài sản, hợp đồng, nhân thân).', 'Do Toà án dân sự giải quyết theo yêu cầu của các bên.', 'Hình thức: bồi thường thiệt hại, xin lỗi, cải chính công khai.', 'Ví dụ: làm hỏng tài sản của người khác, vi phạm hợp đồng.'] },
      { h: 'Trách nhiệm kỉ luật' },
      { ul: ['Áp dụng với người vi phạm kỉ luật lao động, công vụ, nội quy.', 'Do cơ quan, tổ chức, đơn vị có thẩm quyền xử lí.', 'Hình thức: khiển trách, cảnh cáo, hạ bậc lương, buộc thôi việc, đuổi học.', 'Ví dụ: HS đánh nhau, công chức nghỉ việc không lí do.'] },
      { h: 'Một hành vi có thể gánh nhiều trách nhiệm' },
      { p: 'Ví dụ: lái xe khi say rượu gây tai nạn → trách nhiệm hình sự (gây tai nạn) + hành chính (lái xe say rượu) + dân sự (bồi thường) + kỉ luật (nếu là cán bộ, công chức).' },
      { note: 'Vi phạm nhỏ tích tụ dần có thể dẫn đến vi phạm lớn — đừng coi thường bất kì loại luật nào.' },
    ],
    [
      { q: 'Em vô tình làm vỡ điện thoại của bạn. Em phải chịu trách nhiệm gì?', a: 'Trách nhiệm dân sự — bồi thường giá trị điện thoại. Không phải hình sự vì là vô ý và không nghiêm trọng. Em có thể thương lượng, thoả thuận với bạn trước, không nhất thiết phải kiện ra toà.' },
      { q: 'Cảnh sát phạt em vượt đèn đỏ. Em không đồng ý vì "có ai bị tai nạn đâu". Phản hồi đúng là gì?', a: 'Đây là trách nhiệm hành chính — vi phạm Luật Giao thông là bị xử phạt, không cần có hậu quả mới phạt. Nếu cho rằng cảnh sát xử lí sai, em có quyền khiếu nại. Còn nếu thật sự vi phạm thì phải chấp hành nộp phạt.' },
      { q: 'Một học sinh đánh bạn trong trường. Bạn này có thể chịu những trách nhiệm nào?', a: 'Có thể đồng thời chịu: trách nhiệm kỉ luật của trường (khiển trách, cảnh cáo, buộc thôi học); trách nhiệm dân sự (bồi thường tiền thuốc, viện phí); nếu thương tích đủ mức, có thể thêm trách nhiệm hành chính hoặc hình sự. Một hành vi nhưng có thể nhiều trách nhiệm.' },
    ]
  ),

  'S9GDCD-w24-quiz': L(
    'Quyền và nghĩa vụ lao động — Tiếp',
    'Tuần này đào sâu hơn về quyền lao động — hợp đồng lao động, bảo hiểm xã hội và an toàn lao động.',
    ['Hiểu về hợp đồng lao động.', 'Biết về bảo hiểm xã hội và an toàn lao động.', 'Nắm các quyền cơ bản của người lao động tại nơi làm việc.'],
    [
      { h: 'Hợp đồng lao động là gì?' },
      { p: 'Hợp đồng lao động là sự thoả thuận giữa người lao động và người sử dụng lao động về việc làm có trả lương, điều kiện làm việc, quyền và nghĩa vụ của mỗi bên trong quan hệ lao động.' },
      { h: 'Nội dung chủ yếu của hợp đồng lao động' },
      { ul: ['Công việc và địa điểm làm việc.', 'Thời hạn của hợp đồng.', 'Mức lương, hình thức trả lương, thời hạn trả.', 'Thời giờ làm việc, thời giờ nghỉ ngơi.', 'Bảo hiểm xã hội, bảo hiểm y tế.', 'Đào tạo, bồi dưỡng nâng cao trình độ.'] },
      { h: 'Bảo hiểm xã hội' },
      { ul: ['BHXH bắt buộc: cho người làm việc theo hợp đồng lao động.', 'Bảo hiểm y tế: chăm sóc sức khoẻ khi ốm đau.', 'Bảo hiểm thất nghiệp: hỗ trợ khi mất việc.', 'Hưởng trợ cấp khi ốm đau, thai sản, tai nạn, hưu trí.'] },
      { h: 'Quyền cơ bản của người lao động' },
      { ul: ['Không bị phân biệt đối xử về giới tính, dân tộc, tôn giáo.', 'Được trả lương đúng hạn, đầy đủ.', 'Được nghỉ phép có lương hằng năm.', 'Được làm việc trong môi trường an toàn.', 'Được tham gia tổ chức công đoàn.'] },
      { h: 'An toàn, vệ sinh lao động' },
      { p: 'Người sử dụng lao động phải trang bị bảo hộ lao động, tổ chức huấn luyện an toàn, kiểm tra định kì. Khi xảy ra tai nạn lao động, người lao động được hưởng chế độ bồi thường theo quy định.' },
      { h: 'Nghĩa vụ của người lao động' },
      { ul: ['Thực hiện hợp đồng lao động.', 'Chấp hành kỉ luật lao động, nội quy.', 'Tuân thủ quy định về an toàn, vệ sinh lao động.', 'Bảo vệ tài sản của doanh nghiệp.'] },
      { note: 'Trước khi kí hợp đồng lao động, hãy đọc thật kĩ từng điều khoản — đừng kí "cho có" để rồi chịu thiệt thòi.' },
    ],
    [
      { q: 'Chị họ em mới đi làm, công ty đề nghị "không kí hợp đồng để lương cao hơn". Em đánh giá thế nào?', a: 'Rất rủi ro. Không có hợp đồng → không bảo hiểm xã hội, không bảo hiểm thất nghiệp, không được pháp luật bảo vệ khi bị sa thải hay tai nạn. Lương "cao" trước mắt không bù được thiệt hại lâu dài. Phải kí hợp đồng lao động chính thức.' },
      { q: 'Anh em bị tai nạn lao động nhưng không được bồi thường vì "tự gây ra". Có đúng không?', a: 'Tuỳ trường hợp. Nếu tai nạn do thiết bị không an toàn, môi trường nguy hiểm → công ty có lỗi và phải bồi thường. Nếu do người lao động cố ý vi phạm nghiêm trọng quy định an toàn → mức bồi thường có thể giảm. Cần xem xét cụ thể từng tình huống.' },
      { q: 'Một bạn nói "Còn nhỏ thì cứ đi làm thêm thoải mái, luật lao động không liên quan". Em phản hồi?', a: 'Không đúng. Luật lao động quy định rõ tuổi và loại công việc người chưa thành niên được làm, nhằm bảo vệ sức khoẻ và việc học. Hiểu luật giúp bạn từ chối những việc nặng nhọc, nguy hiểm và biết tự bảo vệ quyền lợi khi làm thêm.' },
    ]
  ),

  'S9GDCD-w25-quiz': L(
    'Hôn nhân — Tiếp',
    'Tuần này tìm hiểu sâu hơn về quyền và nghĩa vụ của vợ chồng, ly hôn và bảo vệ trẻ em trong gia đình.',
    ['Nắm quyền và nghĩa vụ của vợ chồng.', 'Hiểu các quy định cơ bản về ly hôn.', 'Biết các quy định bảo vệ trẻ em và phòng chống bạo lực gia đình.'],
    [
      { h: 'Quyền và nghĩa vụ của vợ chồng' },
      { ul: ['Bình đẳng với nhau về mọi mặt trong gia đình.', 'Tôn trọng danh dự, nhân phẩm, nghề nghiệp của nhau.', 'Tôn trọng quyền tự do tín ngưỡng, tôn giáo của nhau.', 'Cùng nhau bàn bạc, quyết định, nuôi dạy con cái.', 'Cùng chia sẻ công việc gia đình.'] },
      { h: 'Tài sản trong hôn nhân' },
      { ul: ['Tài sản chung: do vợ chồng tạo lập trong thời kì hôn nhân.', 'Tài sản riêng: có trước khi kết hôn, được thừa kế hoặc tặng cho riêng.', 'Vợ chồng có quyền và nghĩa vụ ngang nhau với tài sản chung.'] },
      { h: 'Ly hôn' },
      { ul: ['Là việc chấm dứt quan hệ hôn nhân theo bản án, quyết định của Toà án.', 'Có thể thuận tình ly hôn hoặc đơn phương xin ly hôn (có lí do chính đáng).', 'Toà án cân nhắc quyền lợi của con, việc chia tài sản và nghĩa vụ cấp dưỡng.'] },
      { h: 'Bảo vệ con cái sau ly hôn' },
      { ul: ['Cha mẹ vẫn có nghĩa vụ chăm sóc, nuôi dưỡng, giáo dục con.', 'Người không trực tiếp nuôi con phải cấp dưỡng.', 'Con từ đủ 7 tuổi được hỏi nguyện vọng muốn sống với ai.', 'Con vẫn có quyền được gặp gỡ cha hoặc mẹ không trực tiếp nuôi.'] },
      { h: 'Phòng chống bạo lực gia đình' },
      { p: 'Pháp luật nghiêm cấm hành vi bạo lực gia đình. Người bị bạo lực có quyền yêu cầu cơ quan có thẩm quyền áp dụng biện pháp ngăn chặn, bảo vệ. Người chứng kiến có trách nhiệm báo cho cơ quan chức năng.' },
      { h: 'Tác hại của hôn nhân không lành mạnh' },
      { ul: ['Gia đình tan vỡ, con cái thiếu hụt tình cảm.', 'Ảnh hưởng tâm lí, học hành của trẻ.', 'Gây bất ổn cho xã hội.'] },
      { note: 'Một cuộc hôn nhân tốt đẹp cần sự bình đẳng, tôn trọng và chia sẻ — không phải sự áp đặt, thống trị của một bên.' },
    ],
    [
      { q: 'Bố mẹ ly hôn, em 12 tuổi muốn ở với mẹ. Toà có hỏi ý kiến em không?', a: 'Có. Từ đủ 7 tuổi, Toà phải xem xét nguyện vọng của con. Em được trình bày mong muốn, nhưng Toà quyết định dựa trên lợi ích tốt nhất của em (điều kiện chăm sóc, môi trường sống).' },
      { q: 'Bố em thường xuyên đánh mẹ. Em nên làm gì?', a: 'Đây là bạo lực gia đình — vi phạm pháp luật. Em hỗ trợ mẹ báo công an, tổ dân phố hoặc hội phụ nữ. Có đường dây nóng 111 (bảo vệ trẻ em). Tuyệt đối không im lặng vì im lặng là để bạo lực tiếp diễn.' },
      { q: 'Có người nói "Vợ phải nghe chồng, đó là truyền thống". Em nhận xét theo pháp luật?', a: 'Quan niệm này lạc hậu và trái pháp luật. Luật Hôn nhân và Gia đình quy định vợ chồng bình đẳng về mọi mặt. Mọi việc lớn trong gia đình phải được bàn bạc, thống nhất. "Truyền thống" tốt là tôn trọng nhau, không phải một bên áp đặt bên kia.' },
    ]
  ),

  'S9GDCD-w26-quiz': L(
    'Tệ nạn xã hội — Phòng chống',
    'Tệ nạn xã hội phá hoại bản thân, gia đình và xã hội. Hiểu rõ để tránh xa và biết bảo vệ người thân.',
    ['Nắm khái niệm và các loại tệ nạn xã hội.', 'Hiểu nguyên nhân và tác hại.', 'Biết cách phòng tránh và quy định pháp luật liên quan.'],
    [
      { h: 'Tệ nạn xã hội là gì?' },
      { p: 'Tệ nạn xã hội là hiện tượng xã hội bao gồm những hành vi sai lệch chuẩn mực xã hội, vi phạm đạo đức và pháp luật, gây hậu quả xấu về mọi mặt đối với đời sống xã hội.' },
      { h: 'Các tệ nạn xã hội nguy hiểm' },
      { ul: ['Ma tuý: tàn phá sức khoẻ, thần kinh, làm tha hoá con người.', 'Cờ bạc: phá tan tài sản, gia đình.', 'Mại dâm: huỷ hoại nhân phẩm, đạo đức xã hội.', 'Rượu chè, nghiện game quá độ.'] },
      { h: 'Nguyên nhân của tệ nạn xã hội' },
      { ul: ['Lười lao động, ham chơi, đua đòi.', 'Thiếu hiểu biết, ý chí kém, dễ bị lôi kéo.', 'Gia đình thiếu quan tâm, buông lỏng quản lí.', 'Ảnh hưởng của môi trường xã hội xấu, văn hoá phẩm độc hại.'] },
      { h: 'Tác hại của tệ nạn xã hội' },
      { ul: ['Tàn phá sức khoẻ thể chất và tinh thần.', 'Làm tan vỡ hạnh phúc gia đình.', 'Gây rối loạn trật tự an toàn xã hội.', 'Là con đường lây truyền HIV/AIDS.', 'Suy thoái giống nòi, suy thoái đạo đức.'] },
      { h: 'Quy định của pháp luật' },
      { ul: ['Cấm sản xuất, tàng trữ, vận chuyển, mua bán, sử dụng trái phép chất ma tuý.', 'Cấm đánh bạc, tổ chức đánh bạc, dụ dỗ người khác đánh bạc.', 'Cấm hành vi mại dâm, dụ dỗ, dẫn dắt mại dâm.', 'Trẻ em được bảo vệ, không bị lôi kéo vào tệ nạn.'] },
      { h: 'Cách phòng tránh' },
      { ul: ['Sống lành mạnh, có mục tiêu, biết làm chủ bản thân.', 'Chọn bạn tốt, tránh xa môi trường xấu.', 'Học cách từ chối dứt khoát trước cám dỗ.', 'Tham gia hoạt động thể thao, văn nghệ bổ ích.', 'Tâm sự với người thân khi gặp khó khăn.'] },
      { note: 'Một lần "thử cho biết" có thể là khởi đầu cho cả đời nghiện ngập — đừng bao giờ thử dù chỉ một lần.' },
    ],
    [
      { q: 'Bạn rủ em "thử cỏ một lần cho biết, không nghiện đâu". Em phản ứng thế nào?', a: 'Kiên quyết từ chối. Cần sa cũng là ma tuý — sử dụng là vi phạm pháp luật và có thể dẫn đến nghiện. "Một lần" thường kéo theo nhiều lần. Em giải thích cho bạn tác hại và rủ bạn làm việc khác lành mạnh hơn.' },
      { q: 'Anh trai em nghiện game, bỏ học. Gia đình em nên xử lí thế nào?', a: 'Giúp anh nhận thức rõ tác hại; cùng anh tìm hoạt động thay thế (thể thao, sở thích mới); thoả thuận giảm dần thời gian chơi; nếu nặng cần tư vấn tâm lí. Quan trọng là đồng hành, không chỉ trích, đổ lỗi khiến anh càng xa lánh.' },
      { q: 'Em biết một bạn cùng lớp đang bị nhóm bên ngoài rủ rê dùng ma tuý. Em nên làm gì?', a: 'Khuyên bạn tránh xa nhóm đó và nói rõ tác hại, nguy cơ pháp lí. Vì đây là vấn đề nghiêm trọng, em nên báo cho thầy cô hoặc cha mẹ bạn để kịp thời ngăn chặn. Im lặng có thể khiến bạn sa ngã không cứu vãn được.' },
    ]
  ),

  'S9GDCD-w27-quiz': L(
    'Quyền tự do tín ngưỡng, tôn giáo',
    'Việt Nam là quốc gia đa tôn giáo — tôn trọng quyền tự do tín ngưỡng, tôn giáo là một nguyên tắc cốt lõi.',
    ['Hiểu khái niệm tín ngưỡng, tôn giáo.', 'Nắm nội dung quyền tự do tín ngưỡng, tôn giáo.', 'Phân biệt tín ngưỡng, tôn giáo chính tín với mê tín dị đoan.'],
    [
      { h: 'Tín ngưỡng là gì?' },
      { p: 'Tín ngưỡng là niềm tin của con người được thể hiện thông qua những lễ nghi gắn liền với phong tục, tập quán truyền thống để mang lại sự bình an về tinh thần (ví dụ: thờ cúng tổ tiên).' },
      { h: 'Tôn giáo là gì?' },
      { p: 'Tôn giáo là một hình thức tín ngưỡng có hệ thống tổ chức, với những quan niệm, giáo lí, giáo luật và các hình thức lễ nghi thể hiện sự sùng bái (Phật giáo, Công giáo, Tin lành, Hồi giáo, Cao Đài, Hoà Hảo...).' },
      { h: 'Quyền tự do tín ngưỡng, tôn giáo' },
      { ul: ['Công dân có quyền theo hoặc không theo một tín ngưỡng, tôn giáo nào.', 'Người đã theo có quyền thôi không theo, hoặc bỏ để theo tín ngưỡng, tôn giáo khác.', 'Các tôn giáo bình đẳng trước pháp luật.', 'Không ai được ép buộc hay cản trở người khác theo hoặc không theo.'] },
      { h: 'Mê tín dị đoan là gì?' },
      { ul: ['Là tin một cách mù quáng vào những điều nhảm nhí, không phù hợp lẽ tự nhiên (bói toán, lên đồng, chữa bệnh bằng phù phép...).', 'Dẫn đến hậu quả xấu cho sức khoẻ, thời gian, tài sản, thậm chí tính mạng.', 'Pháp luật nghiêm cấm.'] },
      { h: 'Phân biệt tôn giáo chính tín và mê tín dị đoan' },
      { p: 'Tôn giáo chính tín hướng con người đến điều thiện, đến lối sống tốt đẹp. Mê tín dị đoan gieo rắc nỗi sợ hãi, làm hao tổn tiền của, sức khoẻ và có thể gây hậu quả nghiêm trọng.' },
      { h: 'Trách nhiệm của công dân' },
      { ul: ['Tôn trọng quyền tự do tín ngưỡng, tôn giáo của người khác.', 'Không phân biệt đối xử vì lí do tín ngưỡng, tôn giáo.', 'Đấu tranh chống mê tín dị đoan.', 'Cảnh giác trước hành vi lợi dụng tôn giáo để vi phạm pháp luật.'] },
      { note: 'Bạn em theo Công giáo, em theo Phật giáo — các em vẫn có thể là bạn tốt. Tôn giáo không phải là rào cản giữa con người.' },
    ],
    [
      { q: 'Bạn em không theo tôn giáo nào. Em có nên xa lánh bạn không?', a: 'Không. Không theo tôn giáo cũng là một lựa chọn cá nhân hợp pháp, được pháp luật tôn trọng. Tôn trọng sự khác biệt là nguyên tắc cơ bản của quyền tự do tín ngưỡng, tôn giáo.' },
      { q: 'Bà em chữa bệnh bằng cách "uống nước thánh", không chịu đi bệnh viện. Em ứng xử thế nào?', a: 'Đây là biểu hiện mê tín dị đoan, có thể nguy hiểm đến tính mạng. Em nhẹ nhàng giải thích, đưa ra bằng chứng khoa học và cùng cha mẹ thuyết phục bà đi bệnh viện. Tôn giáo chính tín không cấm chữa bệnh bằng y học.' },
      { q: 'Có người lợi dụng danh nghĩa tôn giáo để quyên góp tiền rồi chiếm đoạt. Đây là gì?', a: 'Đây là hành vi lợi dụng tôn giáo để lừa đảo, vi phạm pháp luật — không phải hoạt động tôn giáo chính tín. Cần cảnh giác, không tin theo, và báo cơ quan chức năng. Quyền tự do tôn giáo không bao che cho hành vi phạm pháp.' },
    ]
  ),

  'S9GDCD-w28-quiz': L(
    'Quyền sở hữu tài sản và nghĩa vụ tôn trọng tài sản của người khác',
    'Tài sản là kết quả của lao động. Pháp luật bảo vệ quyền sở hữu giúp xã hội yên ổn và phát triển.',
    ['Hiểu khái niệm quyền sở hữu tài sản.', 'Nắm 3 quyền cụ thể của chủ sở hữu.', 'Biết nghĩa vụ tôn trọng và cách bảo vệ tài sản hợp pháp.'],
    [
      { h: 'Quyền sở hữu tài sản là gì?' },
      { p: 'Quyền sở hữu tài sản là quyền của công dân đối với tài sản thuộc sở hữu của mình, bao gồm: quyền chiếm hữu, quyền sử dụng và quyền định đoạt tài sản.' },
      { h: 'Ba quyền cụ thể của chủ sở hữu' },
      { ul: ['Quyền chiếm hữu: trực tiếp nắm giữ, quản lí tài sản.', 'Quyền sử dụng: khai thác giá trị, hưởng lợi ích từ tài sản.', 'Quyền định đoạt: quyết định đối với tài sản (mua, bán, tặng cho, để lại thừa kế...).'] },
      { h: 'Các loại tài sản' },
      { ul: ['Tư liệu sinh hoạt: nhà ở, xe, đồ dùng.', 'Tư liệu sản xuất, vốn.', 'Tiền, kim loại quý, đá quý.', 'Các quyền tài sản: quyền tác giả, sở hữu trí tuệ.'] },
      { h: 'Nghĩa vụ tôn trọng tài sản của người khác' },
      { ul: ['Không xâm phạm tài sản của cá nhân, tổ chức, tập thể, Nhà nước.', 'Nhặt được của rơi phải trả lại cho chủ hoặc giao cho cơ quan có trách nhiệm.', 'Khi vay, mượn phải trả đầy đủ, đúng hẹn.', 'Gây thiệt hại tài sản người khác phải bồi thường.'] },
      { h: 'Trách nhiệm của Nhà nước' },
      { p: 'Nhà nước công nhận và bảo hộ quyền sở hữu hợp pháp của công dân; ghi nhận trong Hiến pháp và pháp luật; quy định các biện pháp xử lí hành vi xâm phạm quyền sở hữu.' },
      { h: 'Cách bảo vệ tài sản hợp pháp' },
      { ul: ['Đăng kí quyền sở hữu với những tài sản cần đăng kí (nhà, đất, xe).', 'Giữ gìn giấy tờ chứng minh quyền sở hữu.', 'Báo công an khi bị trộm cắp, chiếm đoạt.', 'Khởi kiện ra Toà khi có tranh chấp.'] },
      { note: 'Tài sản của người khác là bất khả xâm phạm — không tự ý lấy, dùng dù chỉ là đùa hay "mượn tạm".' },
    ],
    [
      { q: 'Em nhặt được chiếc ví trên đường. Em có được "sở hữu" nó không?', a: 'Không. Em chỉ đang chiếm hữu tạm thời. Em phải tìm cách trả lại cho chủ hoặc giao cho cơ quan có trách nhiệm. Theo Bộ luật Dân sự, sau thời gian thông báo tìm chủ mà không có người nhận, mới giải quyết theo quy định.' },
      { q: 'Bạn lấy bút của em mà nói "Chỉ mượn thôi". Có vi phạm gì không?', a: 'Lấy mà không xin phép là chiếm hữu không hợp pháp. Nếu trả ngay thì là vi phạm dân sự nhẹ. Nếu cố tình không trả, dùng như của mình → vi phạm dân sự, thậm chí hình sự nếu giá trị lớn và có ý chiếm đoạt.' },
      { q: 'Em mượn xe đạp của bạn rồi để mất. Em phải làm gì?', a: 'Em có nghĩa vụ bồi thường cho bạn vì đã gây thiệt hại tài sản của bạn. Em nên xin lỗi, thương lượng đền bù bằng tiền hoặc xe tương đương. Trốn tránh trách nhiệm là vừa thiếu đạo đức vừa vi phạm pháp luật dân sự.' },
    ]
  ),

  'S9GDCD-w29-quiz': L(
    'Quyền khiếu nại, tố cáo của công dân',
    'Khiếu nại và tố cáo là hai công cụ pháp lí quan trọng để công dân tự bảo vệ mình và bảo vệ lợi ích chung của xã hội.',
    ['Phân biệt quyền khiếu nại và quyền tố cáo.', 'Biết thủ tục cơ bản và trách nhiệm khi thực hiện.', 'Có thái độ trách nhiệm, trung thực khi sử dụng hai quyền này.'],
    [
      { h: 'Quyền khiếu nại là gì?' },
      { p: 'Quyền khiếu nại là quyền của công dân đề nghị cơ quan, tổ chức, cá nhân có thẩm quyền xem xét lại quyết định hành chính, hành vi hành chính khi có căn cứ cho rằng quyết định, hành vi đó trái pháp luật, xâm phạm quyền, lợi ích hợp pháp của mình.' },
      { h: 'Quyền tố cáo là gì?' },
      { p: 'Quyền tố cáo là quyền của công dân báo cho cơ quan, tổ chức, cá nhân có thẩm quyền biết về hành vi vi phạm pháp luật của bất cứ ai gây thiệt hại hoặc đe doạ gây thiệt hại đến lợi ích của Nhà nước, quyền và lợi ích hợp pháp của công dân.' },
      { h: 'Phân biệt khiếu nại và tố cáo' },
      { ul: ['Khiếu nại: bảo vệ quyền, lợi ích hợp pháp của chính bản thân người khiếu nại.', 'Tố cáo: bảo vệ lợi ích của Nhà nước, của tổ chức, của công dân khác.', 'Khiếu nại: với quyết định, hành vi hành chính.', 'Tố cáo: với mọi hành vi vi phạm pháp luật.'] },
      { h: 'Thủ tục cơ bản' },
      { ul: ['Khiếu nại: gửi đơn (hoặc trực tiếp) đến cơ quan có thẩm quyền; nếu không đồng ý kết quả có thể khiếu nại tiếp hoặc khởi kiện ra Toà hành chính.', 'Tố cáo: gửi đến cơ quan, tổ chức có thẩm quyền giải quyết (công an, viện kiểm sát...).'] },
      { h: 'Trách nhiệm khi khiếu nại, tố cáo' },
      { ul: ['Trình bày trung thực, có căn cứ.', 'Không lợi dụng để vu khống, bịa đặt.', 'Tuân thủ đúng trình tự, thủ tục pháp luật.'] },
      { h: 'Người khiếu nại, tố cáo được bảo vệ' },
      { p: 'Nhà nước bảo vệ và khuyến khích công dân thực hiện quyền khiếu nại, tố cáo đúng quy định; giữ bí mật và bảo vệ an toàn cho người tố cáo. Nghiêm cấm trả thù người khiếu nại, tố cáo.' },
      { h: 'Hậu quả của tố cáo sai sự thật' },
      { p: 'Tố cáo bịa đặt nhằm hạ uy tín, vu khống người khác là hành vi vi phạm pháp luật, có thể bị xử lí về tội vu khống.' },
      { note: 'Đừng "tố giác để trả thù" — chỉ khiếu nại, tố cáo khi có căn cứ và bằng chứng thực sự.' },
    ],
    [
      { q: 'Em bị thầy giáo trừ điểm sai. Em nên làm gì?', a: 'Trao đổi thẳng thắn, lễ phép với thầy trước, đưa ra căn cứ. Nếu chưa được giải quyết, có thể gửi đơn khiếu nại lên hiệu trưởng. Đây là khiếu nại — nhằm bảo vệ quyền lợi học tập của chính em.' },
      { q: 'Em chứng kiến người hàng xóm trồng cây cần sa trong nhà. Em nên làm gì?', a: 'Tố cáo với công an phường — đây là hành vi vi phạm pháp luật hình sự. Pháp luật bảo vệ danh tính người tố cáo. Im lặng là tiếp tay cho tệ nạn xã hội.' },
      { q: 'Bạn rủ em viết đơn tố cáo bịa đặt để hạ uy tín một bạn khác mà bạn ghét. Em làm gì?', a: 'Kiên quyết từ chối và khuyên bạn không làm vậy. Tố cáo bịa đặt là vu khống — vi phạm pháp luật, có thể bị xử lí. Quyền tố cáo chỉ được dùng khi có căn cứ thật, không phải công cụ để trả thù cá nhân.' },
    ]
  ),

  'S9GDCD-w30-quiz': L(
    'Quyền tự do ngôn luận',
    'Tự do ngôn luận là một quyền dân chủ cơ bản — nhưng phải thực hiện đúng pháp luật để không gây hại cho người khác và xã hội.',
    ['Hiểu nội dung quyền tự do ngôn luận.', 'Biết các giới hạn theo quy định pháp luật.', 'Sử dụng quyền tự do ngôn luận một cách có trách nhiệm, nhất là trên mạng.'],
    [
      { h: 'Quyền tự do ngôn luận là gì?' },
      { p: 'Quyền tự do ngôn luận là quyền của công dân được tham gia bàn bạc, thảo luận, đóng góp ý kiến vào những vấn đề chung của đất nước, của xã hội.' },
      { h: 'Các hình thức thực hiện' },
      { ul: ['Phát biểu ý kiến trong các cuộc họp.', 'Viết bài đăng báo, kiến nghị với đại biểu Quốc hội.', 'Đóng góp ý kiến qua các kênh chính thức.', 'Bày tỏ quan điểm trên mạng xã hội đúng pháp luật.'] },
      { h: 'Ý nghĩa của quyền tự do ngôn luận' },
      { ul: ['Phát huy quyền làm chủ của nhân dân.', 'Góp phần xây dựng, hoàn thiện chính sách, pháp luật.', 'Là kênh giám sát hoạt động của các cơ quan Nhà nước.'] },
      { h: 'Giới hạn của tự do ngôn luận' },
      { p: 'Tự do ngôn luận không phải là "muốn nói gì thì nói". Công dân thực hiện quyền tự do ngôn luận phải tuân theo quy định của pháp luật, không được xâm phạm lợi ích của Nhà nước, quyền và lợi ích hợp pháp của người khác.' },
      { h: 'Các hành vi bị cấm' },
      { ul: ['Tung tin sai sự thật gây hoang mang.', 'Vu khống, xúc phạm danh dự, nhân phẩm người khác.', 'Xuyên tạc lịch sử, phá hoại khối đoàn kết dân tộc.', 'Kích động bạo lực, chiến tranh.', 'Tiết lộ bí mật Nhà nước.'] },
      { h: 'Trách nhiệm khi dùng mạng xã hội' },
      { ul: ['Suy nghĩ kĩ, kiểm chứng thông tin trước khi đăng, chia sẻ.', 'Không xúc phạm, công kích cá nhân.', 'Không lan truyền tin chưa được xác minh.', 'Chịu trách nhiệm về phát ngôn của mình.'] },
      { note: 'Tự do luôn đi đôi với trách nhiệm. Một câu nói thiếu suy nghĩ có thể làm tổn thương uy tín, danh dự cả đời người.' },
    ],
    [
      { q: 'Em góp ý về một quy định của trường trên Facebook. Có vi phạm không?', a: 'Em có quyền góp ý nhưng phải đúng mực: nêu vấn đề cụ thể, đề xuất giải pháp, không xúc phạm thầy cô. Nếu viết với thái độ xây dựng thì đó là sử dụng quyền tự do ngôn luận đúng đắn.' },
      { q: 'Em đọc tin "Sắp có chiến tranh" trên mạng và chia sẻ lên trang của mình. Hậu quả?', a: 'Có thể vi phạm pháp luật nếu đó là tin sai sự thật, gây hoang mang trong xã hội. Người vi phạm có thể bị xử phạt hành chính, thậm chí truy cứu trách nhiệm hình sự. Nguyên tắc: KHÔNG chia sẻ tin chưa được kiểm chứng.' },
      { q: 'Một bạn lập nhóm chat để nói xấu, bịa chuyện về một bạn khác. Đây có phải tự do ngôn luận không?', a: 'Không. Đó là hành vi xúc phạm danh dự, nhân phẩm người khác — vượt quá giới hạn của tự do ngôn luận và vi phạm pháp luật. Tự do ngôn luận không bao gồm quyền bôi nhọ, vu khống người khác.' },
    ]
  ),

  'S9GDCD-w31-quiz': L(
    'Bảo vệ Tổ quốc — Tiếp',
    'Tuần này đi sâu hơn vào nội dung cụ thể của nghĩa vụ bảo vệ Tổ quốc trong bối cảnh hiện nay.',
    ['Hiểu các hình thức bảo vệ Tổ quốc trong thời bình.', 'Nắm những nội dung cơ bản của Luật Nghĩa vụ Quân sự.', 'Có ý thức cảnh giác và hành động đúng đắn.'],
    [
      { h: 'Bảo vệ Tổ quốc trong thời bình bao gồm' },
      { ul: ['Quân sự: bảo vệ chủ quyền lãnh thổ, biển đảo.', 'Kinh tế: xây dựng nền kinh tế tự chủ, vững mạnh.', 'Văn hoá: giữ gìn bản sắc, giá trị truyền thống.', 'Chính trị: bảo vệ chế độ, Nhà nước.', 'Tư tưởng: cảnh giác trước âm mưu "diễn biến hoà bình".', 'Môi trường: bảo vệ tài nguyên, an ninh phi truyền thống.'] },
      { h: 'Sức mạnh bảo vệ Tổ quốc' },
      { p: 'Bảo vệ Tổ quốc là sự nghiệp của toàn dân, kết hợp sức mạnh dân tộc với sức mạnh thời đại, sức mạnh quốc phòng với an ninh, kinh tế và đối ngoại.' },
      { h: 'Một số nội dung Luật Nghĩa vụ Quân sự' },
      { ul: ['Đối tượng: nam công dân từ đủ 18 đến hết 25 tuổi (đến 27 tuổi nếu được đào tạo trình độ cao).', 'Thời gian phục vụ tại ngũ: 24 tháng.', 'Tạm hoãn gọi nhập ngũ: đang học phổ thông, cao đẳng, đại học...', 'Miễn gọi nhập ngũ: theo quy định (sức khoẻ, hoàn cảnh đặc biệt).'] },
      { h: 'Dân quân tự vệ' },
      { p: 'Là lực lượng vũ trang quần chúng không thoát li sản xuất, công tác; tham gia bảo vệ an ninh, trật tự, phòng chống thiên tai ở địa phương.' },
      { h: 'Đề cao tinh thần cảnh giác' },
      { p: 'Trên mạng có nhiều thông tin xuyên tạc lịch sử và chủ quyền Việt Nam. Mỗi công dân cần biết chọn lọc thông tin, sử dụng nguồn chính thống, không tiếp tay lan truyền tin sai lệch.' },
      { h: 'Học sinh thực hiện nghĩa vụ thế nào?' },
      { ul: ['Học tốt, chuẩn bị kiến thức Giáo dục Quốc phòng và An ninh.', 'Rèn luyện sức khoẻ, kĩ năng sống.', 'Hiểu rõ và khẳng định Hoàng Sa, Trường Sa thuộc chủ quyền Việt Nam.', 'Tham gia hoạt động "Đền ơn đáp nghĩa".'] },
      { note: 'Hoàng Sa và Trường Sa là một phần máu thịt thiêng liêng của Tổ quốc Việt Nam — đừng để ai làm lung lay điều đó.' },
    ],
    [
      { q: 'Em là nam, đang học đại học, có phải đi nghĩa vụ quân sự không?', a: 'Được tạm hoãn gọi nhập ngũ trong thời gian học. Sau khi tốt nghiệp, nếu chưa quá độ tuổi quy định, có thể được gọi nhập ngũ. Một số ngành nghề đặc thù có quy định riêng theo pháp luật.' },
      { q: 'Bạn nói "Hoàng Sa là vùng tranh chấp, không rõ ràng". Em phản hồi thế nào?', a: 'Hoàng Sa thuộc chủ quyền Việt Nam, có đầy đủ bằng chứng lịch sử và pháp lí: bản đồ cổ, thư tịch thời nhà Nguyễn, sự quản lí liên tục. Đây không phải "tranh chấp ngang bằng" — đây là chủ quyền của Việt Nam bị xâm phạm. Cần dùng nguồn chính thống để hiểu đúng.' },
      { q: 'Một người trốn nghĩa vụ quân sự khi đã đến tuổi và đủ điều kiện. Hành vi này bị xử lí thế nào?', a: 'Trốn nghĩa vụ quân sự là vi phạm pháp luật. Tuỳ mức độ, người vi phạm có thể bị xử phạt hành chính hoặc truy cứu trách nhiệm hình sự. Thực hiện nghĩa vụ quân sự là trách nhiệm thiêng liêng của công dân với Tổ quốc.' },
    ]
  ),

  'S9GDCD-w32-quiz': L(
    'Ôn tập pháp luật — Tổng hợp',
    'Tuần ôn tập toàn bộ phần pháp luật của HK2 — chuẩn bị cho phần thi vào 10 ở nhiều tỉnh.',
    ['Hệ thống các luật và quyền đã học.', 'Vận dụng vào đa dạng tình huống pháp lí.', 'Tự đánh giá năng lực vận dụng pháp luật.'],
    [
      { h: 'Các nội dung pháp luật trọng tâm' },
      { ul: ['Hôn nhân và gia đình.', 'Quyền tự do kinh doanh và nghĩa vụ đóng thuế.', 'Quyền và nghĩa vụ lao động.', 'Vi phạm pháp luật và trách nhiệm pháp lí.', 'Quyền tham gia quản lí nhà nước, quản lí xã hội.', 'Nghĩa vụ bảo vệ Tổ quốc.', 'Quyền tự do tín ngưỡng, tôn giáo.', 'Quyền sở hữu tài sản.', 'Quyền khiếu nại, tố cáo; tự do ngôn luận.'] },
      { h: 'Hệ thống thứ bậc văn bản pháp luật' },
      { ul: ['Hiến pháp (cao nhất) → Luật, Bộ luật → Nghị định → Thông tư.', 'Tất cả văn bản phải phù hợp với Hiến pháp.', 'Hiến pháp năm 2013 là Hiến pháp hiện hành.'] },
      { h: 'Phân nhóm quyền của công dân' },
      { ul: ['Quyền dân sự - kinh tế: kinh doanh, lao động, sở hữu tài sản.', 'Quyền chính trị: tham gia quản lí nhà nước, tự do ngôn luận, khiếu nại tố cáo.', 'Quyền tự do cá nhân: tín ngưỡng, tôn giáo.', 'Nghĩa vụ cơ bản: đóng thuế, bảo vệ Tổ quốc, tuân theo pháp luật.'] },
      { h: 'Các dạng đề thường gặp' },
      { ul: ['Nêu khái niệm, nội dung quyền/nghĩa vụ.', 'Phân biệt các loại trách nhiệm, các quyền dễ nhầm lẫn.', 'Phân tích tình huống pháp lí.', 'Đề xuất cách giải quyết đúng pháp luật.', 'Liên hệ bản thân.'] },
      { h: 'Mẹo làm bài tình huống pháp lí' },
      { ul: ['Đọc kĩ tình huống, xác định vấn đề pháp lí.', 'Trả lời theo cấu trúc: căn cứ pháp luật → phân tích → kết luận.', 'Nêu tên luật, quyền/nghĩa vụ liên quan.'] },
      { note: 'Pháp luật bảo vệ em — nhưng em phải hiểu biết về luật thì mới biết cách tự bảo vệ mình.' },
    ],
    [
      { q: 'Đề: "Phân biệt trách nhiệm hình sự và trách nhiệm hành chính". Cấu trúc bài?', a: 'Lập bảng so sánh theo các tiêu chí: (1) Cơ sở pháp lí, (2) Cơ quan xử lí, (3) Hình thức xử lí, (4) Ví dụ. Hình sự: Bộ luật Hình sự, Toà án, hình phạt từ cảnh cáo đến tử hình. Hành chính: cơ quan hành chính, chủ yếu cảnh cáo và phạt tiền, mức độ nhẹ hơn.' },
      { q: 'Em chưa nắm vững các quyền và luật. Phương pháp ôn nào hiệu quả?', a: 'Học theo "tình huống cụ thể": với mỗi quyền/luật, tự nghĩ 2-3 tình huống thực tế và cách giải quyết. Khi nhớ tình huống sẽ nhớ luật. Tránh học thuộc lòng điều luật khô khan, dễ quên và khó vận dụng.' },
      { q: 'Em hay nhầm giữa khiếu nại và tố cáo. Phân biệt nhanh thế nào?', a: 'Mẹo nhớ: KHIẾU NẠI là bảo vệ quyền lợi của CHÍNH MÌNH khi bị quyết định/hành vi hành chính làm thiệt hại. TỐ CÁO là báo về hành vi vi phạm pháp luật của NGƯỜI KHÁC gây hại cho lợi ích chung. Khiếu nại "vì mình", tố cáo "vì lợi ích chung".' },
    ]
  ),

  'S9GDCD-w33-quiz': L(
    'Sống có đạo đức và tuân pháp luật — Vận dụng',
    'Tuần này vận dụng tổng hợp đạo đức và pháp luật vào tình huống thực tế — chuẩn bị cho kì thi vào 10.',
    ['Tổng hợp kiến thức đạo đức và pháp luật.', 'Vận dụng vào đa dạng tình huống đời sống.', 'Hình thành ý thức công dân toàn diện.'],
    [
      { h: 'Người công dân tốt cần có những gì?' },
      { ul: ['Có đạo đức: nhân ái, trung thực, trách nhiệm, công bằng.', 'Tuân theo pháp luật: hiểu và làm theo đúng luật.', 'Có lý tưởng sống: phấn đấu vì bản thân và đất nước.', 'Có kĩ năng: học tập, lao động, giao tiếp, ứng xử.'] },
      { h: 'Vận dụng trong các môi trường' },
      { ul: ['Gia đình: hiếu thảo, chia sẻ, tôn trọng.', 'Trường học: học tập tốt, tuân nội quy, đoàn kết bạn bè.', 'Cộng đồng: tích cực tham gia hoạt động, giúp đỡ người khác.', 'Trên mạng: ứng xử văn minh, không tung tin sai.', 'Trước cám dỗ: tự chủ, kiên quyết không thử tệ nạn.'] },
      { h: 'Khi đạo đức và pháp luật tưởng như mâu thuẫn' },
      { p: 'Đôi khi tưởng có mâu thuẫn (bạn rủ làm việc sai → "tình bạn" muốn giúp, nhưng pháp luật cấm). Lúc đó, tuân theo pháp luật chính là cách bảo vệ bạn thật sự — giúp bạn không lún sâu vào sai lầm.' },
      { h: 'Mối quan hệ thống nhất' },
      { p: 'Trong đa số trường hợp, sống có đạo đức và tuân pháp luật là thống nhất: người có đạo đức thường tự giác tuân pháp luật, người tuân pháp luật nghiêm túc thường là người có đạo đức.' },
      { h: 'Tự đánh giá bản thân' },
      { ul: ['Em đã sống có đạo đức ở mức độ nào?', 'Em đã tuân theo pháp luật ra sao?', 'Còn điểm yếu nào cần khắc phục?', 'Em cam kết điều gì trong thời gian tới?'] },
      { note: 'Người tốt không phải là người không bao giờ sai — mà là người luôn cố gắng sửa sai và sống tốt hơn mỗi ngày.' },
    ],
    [
      { q: 'Đề: "Liên hệ bản thân em đã sống có đạo đức và tuân theo pháp luật như thế nào?". Cách trả lời?', a: '(1) Trong gia đình: cụ thể những việc em đã làm. (2) Trong học tập: kết quả, tham gia hoạt động. (3) Tuân pháp luật: an toàn giao thông, không hút thuốc, không tham gia tệ nạn. (4) Tự nhận điểm còn yếu. (5) Cam kết cải thiện.' },
      { q: 'Em từng vi phạm (vượt đèn đỏ). Có nên kể vào bài kiểm tra không?', a: 'Có thể kể với tinh thần tự nhận lỗi và sửa chữa: từ đó em hiểu hơn tầm quan trọng của pháp luật, đã cam kết và đang thực hiện đúng. Sự trung thực và biết nhận lỗi thường được đánh giá cao.' },
      { q: 'Bạn rủ em "che giấu cho bạn vì đã đánh người, đừng khai với thầy cô". Em xử lí thế nào dựa trên đạo đức và pháp luật?', a: 'Che giấu là vừa thiếu trách nhiệm vừa có thể vi phạm pháp luật. Cách giúp bạn thật sự là khuyên bạn nhận lỗi, xin lỗi và chịu trách nhiệm. Nếu nghiêm trọng, cần báo người lớn. Bao che chỉ khiến bạn sai lầm thêm.' },
    ]
  ),

  'S9GDCD-w34-quiz': L(
    'Định hướng nghề nghiệp và trách nhiệm thanh niên',
    'Tuần áp chót — định hướng nghề nghiệp và xác định trách nhiệm của thanh niên trong giai đoạn mới.',
    ['Nắm các nguyên tắc, yếu tố khi chọn nghề.', 'Hiểu trách nhiệm của thanh niên Việt Nam.', 'Có kế hoạch cụ thể cho bản thân sau lớp 9.'],
    [
      { h: 'Tầm quan trọng của việc chọn nghề' },
      { p: 'Chọn nghề là một quyết định quan trọng — ảnh hưởng đến môi trường sống, thu nhập và hạnh phúc của cả cuộc đời. Cần đầu tư thời gian tìm hiểu và suy nghĩ nghiêm túc.' },
      { h: 'Bốn yếu tố cần cân nhắc khi chọn nghề' },
      { ul: ['Tôi thích gì? (sở thích, đam mê)', 'Tôi giỏi gì? (năng lực, sở trường)', 'Xã hội cần gì? (nhu cầu, xu hướng nghề nghiệp)', 'Tôi có điều kiện gì? (hoàn cảnh gia đình, khả năng tài chính)'] },
      { h: 'Một số nhóm nghề có xu hướng phát triển' },
      { ul: ['Công nghệ thông tin, trí tuệ nhân tạo.', 'Năng lượng tái tạo, môi trường.', 'Y tế, chăm sóc sức khoẻ.', 'Giáo dục, nghệ thuật, truyền thông.', 'Nông nghiệp công nghệ cao.', 'Phân tích dữ liệu, an ninh mạng.'] },
      { h: 'Các con đường sau lớp 9' },
      { ul: ['Học tiếp lên THPT.', 'Học trường nghề, trung cấp (vừa học văn hoá vừa học nghề).', 'Học giáo dục thường xuyên.', 'Mỗi con đường đều có thể dẫn đến thành công nếu nỗ lực.'] },
      { h: 'Trách nhiệm của thanh niên Việt Nam' },
      { ul: ['Học tập, rèn luyện trở thành công dân có ích.', 'Tham gia xây dựng kinh tế, phát triển đất nước.', 'Bảo vệ Tổ quốc.', 'Giữ gìn và phát huy văn hoá dân tộc.', 'Sống có lý tưởng, có đạo đức.'] },
      { h: 'Lập kế hoạch cá nhân' },
      { ul: ['Mục tiêu nghề nghiệp trong 5-10 năm tới.', 'Học gì, ở đâu sau lớp 9?', 'Cần rèn kĩ năng gì (ngoại ngữ, tin học, giao tiếp)?', 'Rèn sức khoẻ, tâm lí ra sao?', 'Tham gia hoạt động xã hội nào?'] },
      { note: 'Tuổi 15 chưa cần quyết định chắc chắn mọi thứ — nhưng cần bắt đầu suy nghĩ, trải nghiệm và định hướng.' },
    ],
    [
      { q: 'Em chưa biết nên chọn nghề gì. Em nên làm gì?', a: 'Bắt đầu từ "loại trừ": xác định nghề nào chắc chắn không phù hợp. Trải nghiệm: tham gia CLB, làm tình nguyện, tìm hiểu về các nghề. Hỏi ý kiến cha mẹ, thầy cô, người làm nghề. Theo thời gian, hướng đi sẽ rõ dần — không cần vội vàng.' },
      { q: 'Bố mẹ muốn em làm bác sĩ, nhưng em thích nghệ thuật. Em xử lí thế nào?', a: 'Tôn trọng mong muốn của bố mẹ nhưng cần thảo luận thẳng thắn, chân thành. Có thể tìm điểm chung (thiết kế y khoa, minh hoạ khoa học). Chứng minh sự nghiêm túc của em qua kết quả học tập và sản phẩm thực tế để bố mẹ tin tưởng.' },
      { q: 'Một bạn học lực trung bình nói "Mình chẳng làm được nghề gì hay đâu". Em động viên thế nào?', a: 'Mỗi người có thế mạnh riêng. Học lực chưa cao không có nghĩa là không thành công. Nhiều nghề cần sự khéo léo, chăm chỉ, sáng tạo hơn là điểm số. Quan trọng là tìm đúng sở trường, kiên trì rèn luyện và chọn con đường phù hợp (trường nghề cũng là lựa chọn tốt).' },
    ]
  ),

  'S9GDCD-w35-quiz': L(
    'Đề ôn thi cuối cấp — Tổng kết',
    'Tuần cuối — luyện đề tổng hợp và tổng kết toàn bộ chương trình GDCD cấp THCS.',
    ['Vận dụng kiến thức cả năm vào đề thi tổng hợp.', 'Tự đánh giá năng lực và kĩ năng làm bài.', 'Sẵn sàng tâm thế cho kì thi cuối cấp.'],
    [
      { h: 'Cấu trúc đề thi vào 10 môn GDCD (tham khảo)' },
      { ul: ['Trắc nghiệm: chiếm khoảng 50-60% (nhận biết, thông hiểu).', 'Tự luận: chiếm khoảng 40-50% (vận dụng, liên hệ).', 'Thời gian: 60-90 phút tuỳ tỉnh.', 'Nội dung: chủ yếu lớp 9, có liên hệ lớp 6-8.'] },
      { h: 'Phân bố thời gian làm bài' },
      { ul: ['Trắc nghiệm: khoảng 1 phút/câu.', 'Tự luận ngắn: 10-15 phút.', 'Tự luận dài (tình huống, liên hệ): 20-25 phút.', 'Dành 5 phút cuối kiểm tra lại toàn bài.'] },
      { h: 'Kĩ năng viết bài tự luận' },
      { ul: ['Mở bài: nêu vấn đề.', 'Thân bài: phân tích theo hệ thống (khái niệm → biểu hiện → ý nghĩa → liên hệ).', 'Kết bài: tóm tắt, rút bài học.', 'Câu văn rõ ràng, có dẫn chứng cụ thể.'] },
      { h: 'Những kiến thức cần nhớ chắc' },
      { ul: ['Các phẩm chất đạo đức và biểu hiện.', 'Các con số: tuổi kết hôn, tuổi lao động, tuổi chịu trách nhiệm pháp lí.', '4 loại vi phạm và 4 loại trách nhiệm pháp lí.', 'Phân biệt khiếu nại - tố cáo, pháp luật - kỉ luật.'] },
      { h: 'Tổng kết toàn cấp THCS' },
      { p: 'Sau 4 năm học GDCD cấp THCS, các em đã được trang bị: hiểu biết về đạo đức và pháp luật cơ bản; kĩ năng tự nhận thức và ứng xử; tinh thần công dân và trách nhiệm với cộng đồng, đất nước. Đây là hành trang quý giá cho cấp 3 và cả cuộc đời.' },
      { h: 'Lời chúc' },
      { p: 'Chúc các em thi vào 10 đạt kết quả tốt, vào được ngôi trường mong ước. Hãy mang theo những giá trị đạo đức và ý thức pháp luật đã học để trở thành công dân có ích cho gia đình, xã hội và Tổ quốc.' },
      { note: '"Thi cử chỉ là một chặng đường — cuộc đời mới là kì thi dài nhất, mà em chính là giám khảo của chính mình".' },
    ],
    [
      { q: 'Đề: "Trách nhiệm của thanh niên Việt Nam trong giai đoạn hiện nay". Cấu trúc bài viết?', a: 'Mở bài: nêu vai trò của thanh niên. Thân bài: (1) Trách nhiệm với bản thân: học tập, rèn luyện. (2) Với gia đình: hiếu thảo, hỗ trợ. (3) Với đất nước: lao động, bảo vệ Tổ quốc, giữ gìn văn hoá. (4) Hội nhập quốc tế. Kết bài: liên hệ bản thân và cam kết.' },
      { q: 'Đêm trước ngày thi em rất lo lắng. Em nên làm gì?', a: 'Ăn nhẹ, không uống cà phê. Nghe nhạc nhẹ thư giãn, đi ngủ sớm. Tin tưởng vào sự chuẩn bị suốt một năm qua. Sáng hôm sau dậy sớm, ăn sáng đầy đủ, đến điểm thi sớm 15-30 phút. Hít thở sâu và tự nhủ: "Tôi đã chuẩn bị tốt, tôi sẽ làm được".' },
      { q: 'Trong phòng thi em quên mất một khái niệm cần dùng. Em xử lí thế nào?', a: 'Bình tĩnh, không hoảng loạn. Bỏ qua tạm thời, làm các câu khác trước để lấy lại tự tin và "kích hoạt" trí nhớ. Thường khi làm câu khác, khái niệm sẽ tự nhớ lại. Nếu vẫn quên, hãy diễn đạt bằng cách hiểu của mình kèm ví dụ — vẫn được điểm ý.' },
    ]
  ),

  'S9GDCD-w36-quiz': L(
    'Kết thúc GDCD THCS — Người công dân tốt bắt đầu từ đây',
    'Tuần khép lại bốn năm GDCD — không phải để ôn thi mà để nhìn lại: những giá trị đạo đức và pháp luật em đã học không phải để thi, mà để sống.',
    [
      'Tổng kết các giá trị cốt lõi đã học trong bốn năm GDCD THCS.',
      'Hiểu mối quan hệ giữa đạo đức cá nhân và trách nhiệm công dân.',
      'Tự nhận thức về điểm mạnh và điểm cần rèn luyện của bản thân.',
    ],
    [
      { h: 'Bốn năm GDCD — Những giá trị cốt lõi' },
      { ul: [
        'Lớp 6: Tự lập, tiết kiệm, trung thực — nền tảng nhân cách.',
        'Lớp 7: Khoan dung, hợp tác, sống có đạo đức trong cộng đồng.',
        'Lớp 8: Pháp luật và kỉ cương, quyền và nghĩa vụ công dân.',
        'Lớp 9: Lí tưởng sống, trách nhiệm công dân, quyền con người, hội nhập quốc tế.',
      ] },
      { h: 'Đạo đức và Pháp luật — Hai trụ cột song hành' },
      { p: 'Đạo đức là "muốn làm điều tốt" — xuất phát từ bên trong, từ giá trị và lương tâm. Pháp luật là "phải làm" — quy định bên ngoài, có chế tài nếu vi phạm. Người tốt không chỉ tuân thủ pháp luật mà còn tự nguyện sống đạo đức ngay cả khi không có ai nhìn.' },
      { h: 'GDCD trong cuộc sống hàng ngày' },
      { ul: [
        'Khi tham gia giao thông: hiểu đúng luật và tự giác chấp hành.',
        'Khi mạng xã hội: biết quyền ngôn luận và giới hạn của nó.',
        'Khi gặp bất công: biết con đường khiếu nại, tố cáo đúng quy trình.',
        'Khi đến tuổi 18: hiểu quyền bầu cử và trách nhiệm công dân đầy đủ.',
      ] },
      { h: 'Lời nhắn gửi từ GDCD' },
      { p: 'Điểm số môn GDCD sẽ phai mờ theo thời gian, nhưng những giá trị em chọn mang theo sẽ định hình cuộc đời. Trung thực, trách nhiệm, yêu thương và ý thức pháp luật — đó không phải là kiến thức để thi, đó là người em muốn trở thành.' },
      { note: '"Điều em biết về đạo đức và pháp luật chỉ có giá trị khi em thực sự sống theo nó" — đó là bài kiểm tra thực sự, không có câu hỏi trắc nghiệm nào đo được.' },
    ],
    [
      { q: 'Sự khác nhau cơ bản giữa vi phạm đạo đức và vi phạm pháp luật là gì?', a: 'Vi phạm đạo đức là hành vi trái với chuẩn mực đạo đức xã hội, bị lương tâm cắn rứt và dư luận xã hội lên án, nhưng không có chế tài pháp lí chính thức. Vi phạm pháp luật là hành vi trái quy định pháp luật, bị Nhà nước xử lí theo trình tự pháp lí với các hình thức như phạt tiền, phạt tù, bồi thường thiệt hại. Nhiều hành vi vừa vi phạm đạo đức vừa vi phạm pháp luật (như lừa đảo, bạo lực); một số chỉ vi phạm đạo đức mà không vi phạm pháp luật (như vô ơn, bội bạc).' },
      { q: 'Em muốn trở thành công dân như thế nào sau khi học xong THCS?', a: 'Câu hỏi này không có đáp án đúng sai — quan trọng là em trả lời thật lòng. Ví dụ: "Tôi muốn là người trung thực trong mọi mối quan hệ, biết tuân thủ pháp luật không phải vì sợ bị phạt mà vì hiểu sự cần thiết của nó, và biết đứng lên bảo vệ lẽ phải khi cần — dù điều đó không dễ dàng".' },
      { q: 'Lớp 9 kết thúc, em nhớ nhất điều gì từ môn GDCD?', a: 'Ví dụ: "Tôi nhớ nhất bài học về quyền con người — rằng mỗi người đều có phẩm giá đáng được tôn trọng, dù nghèo hay giàu, dù thuộc sắc tộc hay tôn giáo nào. Điều này khiến tôi nhìn mọi người xung quanh khác đi — trân trọng hơn và đồng cảm hơn". Câu trả lời của em mới là thứ quan trọng nhất.' },
    ]
  ),
};
