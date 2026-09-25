// ============================================================
// Lớp 8 · GDCD — 35 tuần (HK1: 1–18 · HK2: 19–35)
// Đạo đức, pháp luật, kỹ năng sống theo CTGD 2018 môn GDCD 8.
// ID prefix: "S8GDCD-wNN-quiz".
// ============================================================
import { Q, W, indexBy } from './_helper.js';

const M = (n, title, qs, opts) => W('S8GDCD', 'gdcd', n, title, qs, opts);

export const S8GDCD_WEEKS = [
  // ──────────────── HK1 ────────────────
  M(1, 'Tôn trọng lẽ phải', [
    Q('Tôn trọng lẽ phải là gì?', ['Làm theo ý kiến số đông', 'Công nhận, ủng hộ, làm theo điều đúng đắn, đạo lý', 'Chỉ nghe theo người lớn', 'Im lặng trước cái sai'], 1, 'Tôn trọng lẽ phải = công nhận, ủng hộ và làm theo điều đúng đắn, phù hợp đạo lý và lợi ích chung.', [
      '<b>Lẽ phải</b> là <i>những điều được coi là đúng đắn, phù hợp với đạo lý và lợi ích chung</i> của xã hội.',
      '<b>Tôn trọng lẽ phải</b> là công nhận, ủng hộ, tuân theo và bảo vệ những điều đúng đắn; biết điều chỉnh suy nghĩ, hành vi của mình theo hướng tích cực.',
      '⚠️ Lưu ý: lẽ phải dựa vào <code>tính đúng đắn</code> của sự việc, KHÔNG dựa vào việc số đông hay người có quyền nói ra. Số đông có thể sai, người lớn cũng có thể sai.',
    ], ['Sai — số đông chưa chắc đúng; chạy theo đám đông không phải tôn trọng lẽ phải.', 'Đúng — tôn trọng lẽ phải là công nhận, ủng hộ và làm theo điều đúng đắn, hợp đạo lý.', 'Sai — người lớn cũng có thể sai; lẽ phải dựa trên điều đúng chứ không dựa vào ai nói.', 'Sai — im lặng trước cái sai là dung túng, trái với tôn trọng lẽ phải.']),
    Q('Hành vi nào sau đây thể hiện tôn trọng lẽ phải?', ['Im lặng khi thấy bạn nói sai', 'Bao che bạn quay cóp', 'Phê bình bạn vi phạm dù sợ bạn giận', 'Theo nhóm bạn xấu cho an toàn'], 2, 'Người tôn trọng lẽ phải dám lên tiếng, phê bình cái sai dù phải đối mặt khó khăn.', [
      '<b>Biểu hiện của tôn trọng lẽ phải</b>: chấp hành nội quy, ủng hộ ý kiến đúng, <i>dám phê bình cái sai</i>, không a dua theo đám đông làm điều trái.',
      'Người tôn trọng lẽ phải có <code>bản lĩnh</code>: sẵn sàng bảo vệ điều đúng dù phải chịu thiệt thòi hay mất lòng người khác.',
      '⚠️ Im lặng, bao che, a dua theo bạn xấu đều là <b>biểu hiện trái</b> với tôn trọng lẽ phải.',
    ], ['Sai — im lặng để mặc cái sai là né tránh, không bảo vệ lẽ phải.', 'Sai — bao che gian lận là tiếp tay cho cái sai.', 'Đúng — dám phê bình cái sai dù sợ mất lòng mới là tôn trọng lẽ phải.', 'Sai — theo nhóm bạn xấu vì \'an toàn\' là thoả hiệp với cái sai.']),
    Q('Ý nghĩa của tôn trọng lẽ phải?', ['Giúp xã hội ổn định, lành mạnh', 'Làm mọi người ghét mình', 'Mất bạn bè', 'Không có ý nghĩa gì'], 0, 'Tôn trọng lẽ phải giúp con người ứng xử phù hợp, làm xã hội ổn định, văn minh.', [
      '<b>Ý nghĩa của tôn trọng lẽ phải</b>:',
      '<ul><li>Giúp mỗi người có <code>cách ứng xử phù hợp</code>, hoàn thiện nhân cách.</li><li>Góp phần làm cho quan hệ xã hội <i>lành mạnh, tốt đẹp</i> hơn.</li><li>Thúc đẩy xã hội ổn định, công bằng, văn minh, phát triển.</li></ul>',
      '💡 Người chính trực, biết bảo vệ lẽ phải thường được mọi người tin tưởng và kính trọng.',
    ], ['Đúng — bảo vệ điều đúng giúp quan hệ và xã hội ổn định, văn minh.', 'Sai — người chính trực được kính trọng, không phải bị ghét.', 'Sai — bạn tốt sẽ quý người ngay thẳng; chỉ bạn xấu mới xa lánh.', 'Sai — tôn trọng lẽ phải có ý nghĩa lớn cho cá nhân và cộng đồng.']),
    Q('Trái với tôn trọng lẽ phải là?', ['Xuyên tạc, bóp méo sự thật', 'Trung thực', 'Thẳng thắn', 'Dũng cảm'], 0, 'Hành vi xuyên tạc, vu khống, bao che cái sai là trái với tôn trọng lẽ phải.', [
      '<b>Hành vi trái với tôn trọng lẽ phải</b>: xuyên tạc, bóp méo sự thật, vu khống, bao che cái sai, a dua, ba phải, gió chiều nào theo chiều ấy.',
      'Ngược lại, <code>trung thực, thẳng thắn, dũng cảm</code> là những phẩm chất <i>gắn liền</i> với tôn trọng lẽ phải — chúng cùng giúp con người bảo vệ điều đúng.',
    ], ['Đúng — xuyên tạc, bóp méo sự thật chính là phủ nhận lẽ phải.', 'Sai — trung thực là biểu hiện của tôn trọng lẽ phải.', 'Sai — thẳng thắn giúp bảo vệ điều đúng, không trái lẽ phải.', 'Sai — dũng cảm bảo vệ cái đúng là phẩm chất gắn với tôn trọng lẽ phải.']),
    Q('Tình huống: bạn em chép bài kiểm tra. Em nên?', ['Khuyên bạn dừng và báo thầy cô nếu bạn không nghe', 'Mặc kệ', 'Cùng chép cho vui', 'Khen bạn thông minh'], 0, 'Khuyên bạn và nhắc nhở là cách thể hiện tôn trọng lẽ phải, đồng thời giữ tình bạn.', [
      'Khi gặp tình huống bạn làm sai, người tôn trọng lẽ phải <b>không im lặng</b> nhưng cũng không vội tố cáo gay gắt.',
      'Cách ứng xử khéo léo: <i>khuyên bạn nhận ra cái sai</i>, cho bạn cơ hội sửa; nếu bạn không nghe và việc sai nghiêm trọng thì <code>báo thầy cô</code> để giúp bạn.',
      '💡 Đây vừa là cách bảo vệ lẽ phải, vừa giữ được tình bạn chân thành.',
    ], ['Đúng — khuyên bạn dừng, báo thầy cô nếu cần là vừa giúp bạn vừa giữ lẽ phải.', 'Sai — mặc kệ là làm ngơ trước gian lận.', 'Sai — cùng chép là cùng vi phạm, không bảo vệ lẽ phải.', 'Sai — khen hành vi gian lận là cổ vũ cái sai.']),
    Q('Tôn trọng lẽ phải khác với "ba phải" ở chỗ?', ['Cùng nghĩa', 'Tôn trọng lẽ phải kiên định với điều đúng; ba phải gió chiều nào theo chiều đó', 'Đều tốt', 'Đều xấu'], 1, 'Người tôn trọng lẽ phải kiên định, không như ba phải.', [
      'Cần phân biệt rõ hai khái niệm:',
      '<ul><li><b>Tôn trọng lẽ phải</b>: kiên định bảo vệ điều đúng, có <code>chính kiến</code> rõ ràng.</li><li><b>Ba phải</b>: thiếu chính kiến, ai nói cũng cho là đúng, "gió chiều nào theo chiều ấy".</li></ul>',
      '⚠️ Người ba phải tưởng là dễ tính, hoà nhã nhưng thực ra <i>không dám bảo vệ cái đúng</i>, dễ bị lợi dụng.',
    ], ['Sai — hai khái niệm hoàn toàn khác nhau, không đồng nghĩa.', 'Đúng — tôn trọng lẽ phải kiên định với cái đúng, còn ba phải thì gió chiều nào theo chiều đó.', 'Sai — \'ba phải\' không phải là tốt, đó là thiếu chính kiến.', 'Sai — tôn trọng lẽ phải là phẩm chất tốt, không xấu.']),
  ]),

  M(2, 'Liêm khiết', [
    Q('Liêm khiết có nghĩa là?', ['Sống tiết kiệm', 'Sống giàu có', 'Sống cô độc', 'Sống trong sạch, không hám lợi, không nhỏ nhen'], 3, 'Liêm khiết = phẩm chất sống trong sạch, không vì tư lợi mà làm điều sai.', [
      '<b>Liêm khiết</b> là phẩm chất đạo đức thể hiện lối sống <i>trong sạch, không hám danh, hám lợi</i>, không bận tâm toan tính nhỏ nhen, ích kỷ.',
      'Người liêm khiết luôn <code>tự trọng</code>, không tham của cải, địa vị, tiền bạc không phải của mình.',
      '⚠️ Đừng nhầm: tiết kiệm, giàu có hay sống cô độc là chuyện khác — liêm khiết nói về sự <b>trong sạch trước lợi ích vật chất</b>.',
    ], ['Sai — tiết kiệm là một đức tính khác, không phải định nghĩa liêm khiết.', 'Sai — liêm khiết không liên quan đến giàu hay nghèo.', 'Sai — sống cô độc không phải là liêm khiết.', 'Đúng — liêm khiết là sống trong sạch, không hám lợi, không nhỏ nhen.']),
    Q('Người liêm khiết thường?', ['Tham ô của công', 'Không tham của không phải của mình', 'Lợi dụng chức vụ', 'Nhận hối lộ'], 1, 'Người liêm khiết không tham lam tài sản công và của người khác.', [
      '<b>Biểu hiện của liêm khiết</b>: làm việc ngay thẳng, không nhận hối lộ, không tham ô, không lợi dụng chức vụ quyền hạn để trục lợi.',
      'Người liêm khiết <i>không tham của không phải của mình</i>, sống thanh thản, không bị lương tâm cắn rứt.',
      '⚠️ Tham ô, nhận hối lộ, lợi dụng chức vụ đều là <code>biểu hiện trái</code> với liêm khiết và bị pháp luật xử lý.',
    ], ['Sai — tham ô của công trái ngược hoàn toàn với liêm khiết.', 'Đúng — người liêm khiết không tham của không phải của mình.', 'Sai — lợi dụng chức vụ để trục lợi là biểu hiện thiếu liêm khiết.', 'Sai — nhận hối lộ là hành vi tham nhũng, ngược với liêm khiết.']),
    Q('Câu tục ngữ nào nói về liêm khiết?', ['Đói cho sạch, rách cho thơm', 'Ăn quả nhớ kẻ trồng cây', 'Lá lành đùm lá rách', 'Một con ngựa đau cả tàu bỏ cỏ'], 0, '"Đói cho sạch, rách cho thơm" đề cao liêm khiết dù khó khăn.', [
      'Tục ngữ <i>"Đói cho sạch, rách cho thơm"</i> khuyên con người dù <b>nghèo khó</b> vẫn phải giữ phẩm giá trong sạch, không vì túng thiếu mà làm điều xấu.',
      'Đây chính là tinh thần <code>liêm khiết</code> của dân tộc Việt Nam.',
      'Phân biệt với các câu khác: "Ăn quả nhớ kẻ trồng cây" (biết ơn), "Lá lành đùm lá rách" (tương thân tương ái), "Một con ngựa đau cả tàu bỏ cỏ" (đoàn kết).',
    ], ['Đúng — \'Đói cho sạch, rách cho thơm\' đề cao giữ phẩm giá trong sạch dù nghèo khó.', 'Sai — câu này nói về lòng biết ơn, không phải liêm khiết.', 'Sai — câu này nói về tinh thần tương thân tương ái.', 'Sai — câu này nói về sự đoàn kết, sẻ chia.']),
    Q('Ý nghĩa của liêm khiết với xã hội?', ['Không có ý nghĩa', 'Làm xã hội nghèo đi', 'Tạo bất công', 'Giúp xã hội trong sạch, văn minh'], 3, 'Liêm khiết là nền tảng đạo đức, giúp xã hội phát triển bền vững và công bằng.', [
      '<b>Ý nghĩa của liêm khiết</b>:',
      '<ul><li>Giúp con người sống <i>thanh thản</i>, được mọi người quý trọng, tin cậy.</li><li>Góp phần <code>chống tham nhũng</code>, làm trong sạch bộ máy nhà nước.</li><li>Làm cho xã hội công bằng, văn minh, phát triển bền vững.</li></ul>',
      '💡 Liêm khiết là một trong những giá trị nền tảng để xây dựng đất nước phồn vinh.',
    ], ['Sai — liêm khiết là nền tảng đạo đức rất quan trọng.', 'Sai — liêm khiết chống tham nhũng, giúp xã hội phát triển chứ không nghèo đi.', 'Sai — liêm khiết tạo công bằng, không phải bất công.', 'Đúng — liêm khiết giúp xã hội trong sạch, công bằng, văn minh.']),
    Q('Tình huống: nhặt được ví có 5 triệu. Em sẽ?', ['Mua đồ chơi', 'Lấy luôn vì không ai biết', 'Chia cho bạn bè', 'Tìm cách trả lại chủ'], 3, 'Hành vi liêm khiết là trả lại, dù không ai biết.', [
      'Tài sản nhặt được <b>không phải của mình</b> — chiếm giữ nó là xâm phạm quyền sở hữu của người khác.',
      'Hành vi liêm khiết là <i>tìm cách trả lại chủ</i> (báo công an, nhà trường, thông báo tìm chủ), dù <code>không ai biết</code> nếu mình giữ.',
      '💡 Liêm khiết được thử thách rõ nhất khi không có ai giám sát — đó là lúc lương tâm lên tiếng.',
    ], ['Sai — dùng tiền nhặt được để mua sắm là chiếm đoạt của người khác.', 'Sai — \'không ai biết\' không làm cho việc lấy của rơi thành đúng.', 'Sai — chia tiền của người khác cho bạn bè vẫn là chiếm đoạt.', 'Đúng — tìm cách trả lại chủ là hành vi liêm khiết, dù không ai biết.']),
    Q('Người liêm khiết được mọi người?', ['Coi thường', 'Xa lánh', 'Tin tưởng, kính trọng, tin cậy giao việc', 'Cười nhạo'], 2, 'Liêm khiết tạo uy tín và lòng tin.', [
      'Sống liêm khiết tạo nên <code>uy tín</code> và lòng tin nơi mọi người.',
      'Người liêm khiết được <i>tin tưởng, kính trọng</i>, thường được giao những công việc quan trọng vì mọi người yên tâm về sự trong sạch của họ.',
      '💡 "Cây ngay không sợ chết đứng" — sống trong sạch thì không sợ ai dèm pha, được xã hội tôn trọng.',
    ], ['Sai — người liêm khiết được kính trọng, không bị coi thường.', 'Sai — sự trong sạch khiến người khác muốn gần, không xa lánh.', 'Đúng — liêm khiết tạo uy tín nên được tin tưởng, kính trọng, tin cậy giao việc.', 'Sai — không ai cười nhạo người sống trong sạch, ngay thẳng.']),
  ]),

  M(3, 'Tôn trọng người khác', [
    Q('Tôn trọng người khác là?', ['Chỉ tôn trọng người giàu', 'Sợ hãi họ', 'Đánh giá đúng mực, coi trọng phẩm giá và quyền lợi của họ', 'Nhường nhịn vô điều kiện'], 2, 'Tôn trọng người khác = đánh giá đúng mực và coi trọng họ trong mọi hoàn cảnh.', [
      '<b>Tôn trọng người khác</b> là <i>đánh giá đúng mực, coi trọng danh dự, phẩm giá và lợi ích</i> của người khác; thể hiện lối sống có văn hoá.',
      'Tôn trọng dành cho <code>mọi người</code> — không phân biệt giàu nghèo, sang hèn, người thân hay người lạ.',
      '⚠️ Tôn trọng KHÁC sợ hãi và cũng KHÁC nhường nhịn vô điều kiện (kể cả khi họ sai).',
    ], ['Sai — tôn trọng dành cho mọi người, không phân biệt giàu nghèo.', 'Sai — tôn trọng khác với sợ hãi.', 'Đúng — tôn trọng là đánh giá đúng mực, coi trọng phẩm giá và quyền lợi của họ.', 'Sai — tôn trọng không có nghĩa là nhường nhịn vô điều kiện, kể cả khi họ sai.']),
    Q('Biểu hiện tôn trọng người khác?', ['Lắng nghe, không ngắt lời', 'Cười nhạo khi bạn nói sai', 'Nói xấu sau lưng', 'Bắt nạt người yếu'], 0, 'Lắng nghe, không cười nhạo, không ngắt lời là biểu hiện cơ bản của tôn trọng.', [
      '<b>Biểu hiện của tôn trọng người khác</b>: lắng nghe ý kiến, không ngắt lời, không cười nhạo; cư xử lễ phép, đúng mực; tôn trọng sở thích, thói quen, bí mật riêng tư của người khác.',
      '⚠️ Cười nhạo, nói xấu sau lưng, bắt nạt người yếu là những <code>hành vi thiếu tôn trọng</code>, xúc phạm phẩm giá người khác.',
    ], ['Đúng — lắng nghe, không ngắt lời là biểu hiện cơ bản của tôn trọng.', 'Sai — cười nhạo người khác là xúc phạm, thiếu tôn trọng.', 'Sai — nói xấu sau lưng là hành vi thiếu tôn trọng.', 'Sai — bắt nạt người yếu là xâm phạm phẩm giá người khác.']),
    Q('Hành vi nào KHÔNG tôn trọng người khác?', ['Chế giễu khuyết tật của người khác', 'Chào hỏi lễ phép', 'Lắng nghe ý kiến', 'Giúp đỡ người già'], 0, 'Chế giễu khuyết tật là vi phạm phẩm giá người khác.', [
      '<b>Chế giễu khuyết tật</b> của người khác là hành vi <i>xúc phạm phẩm giá</i>, gây tổn thương sâu sắc — đây là biểu hiện rõ của sự thiếu tôn trọng.',
      'Ngược lại, <code>chào hỏi lễ phép, lắng nghe ý kiến, giúp đỡ người già</code> đều là việc làm thể hiện sự tôn trọng và lòng nhân ái.',
    ], ['Đúng — chế giễu khuyết tật là xúc phạm phẩm giá, thiếu tôn trọng.', 'Sai — chào hỏi lễ phép là biểu hiện tôn trọng.', 'Sai — lắng nghe ý kiến thể hiện sự tôn trọng.', 'Sai — giúp đỡ người già là việc làm thể hiện tôn trọng.']),
    Q('Vì sao phải tôn trọng người khác?', ['Để được người khác tôn trọng lại', 'Vì pháp luật bắt buộc tất cả', 'Để được khen', 'Để có quà'], 0, 'Mình tôn trọng người khác thì mới được người khác tôn trọng lại — quan hệ hai chiều.', [
      'Tôn trọng là một <code>quan hệ hai chiều</code>: <i>"Muốn người khác tôn trọng mình thì trước hết mình phải tôn trọng người khác"</i>.',
      'Khi mọi người tôn trọng lẫn nhau, quan hệ xã hội trở nên <b>lành mạnh, trong sáng, tốt đẹp</b>.',
      '⚠️ Tôn trọng là <b>chuẩn mực đạo đức</b> tự nguyện từ bên trong, không phải vì bị pháp luật ép buộc hay để đổi lấy lời khen, quà cáp.',
    ], ['Đúng — tôn trọng là quan hệ hai chiều: mình tôn trọng người thì mới được tôn trọng lại.', 'Sai — tôn trọng là chuẩn mực đạo đức, không phải vì pháp luật ép buộc.', 'Sai — tôn trọng người khác không phải để được khen.', 'Sai — tôn trọng không nhằm đổi lấy quà hay lợi ích vật chất.']),
    Q('Tôn trọng người khác thể hiện qua?', ['Chỉ lời nói', 'Chỉ hành vi', 'Lời nói, hành vi, thái độ', 'Chỉ trang phục'], 2, 'Tôn trọng thể hiện qua tổng hoà lời nói, hành vi và thái độ ứng xử.', [
      'Tôn trọng người khác được thể hiện <b>ở mọi nơi, mọi lúc</b>, qua sự tổng hoà của:',
      '<ul><li><b>Lời nói</b>: nói năng lễ phép, không xúc phạm.</li><li><b>Hành vi</b>: cử chỉ, việc làm đúng mực.</li><li><b>Thái độ</b>: chân thành, thiện chí khi giao tiếp.</li></ul>',
      '💡 Chỉ một yếu tố thôi (lời nói hay trang phục) chưa đủ — cần cả ba mới là tôn trọng thực sự.',
    ], ['Sai — chỉ lời nói thôi là chưa đủ.', 'Sai — chỉ hành vi thôi là chưa đầy đủ.', 'Đúng — tôn trọng thể hiện qua cả lời nói, hành vi và thái độ.', 'Sai — trang phục chỉ là một phần nhỏ, không phải toàn bộ.']),
    Q('Tôn trọng người khác KHÔNG đồng nghĩa với?', ['Bình đẳng', 'Lễ phép', 'Đồng ý với mọi quan điểm dù sai', 'Lắng nghe'], 2, 'Tôn trọng khác với đồng tình mọi quan điểm sai.', [
      'Tôn trọng người khác gắn liền với <code>bình đẳng, lễ phép, biết lắng nghe</code>.',
      '⚠️ Tuy nhiên, tôn trọng <b>KHÔNG đồng nghĩa</b> với việc đồng ý với mọi quan điểm — kể cả khi quan điểm đó sai. Ta có thể tôn trọng người mà vẫn <i>thẳng thắn phản biện</i> điều họ nói chưa đúng.',
      '💡 Tôn trọng người nói nhưng vẫn bảo vệ lẽ phải — đó mới là cách ứng xử văn minh.',
    ], ['Sai — bình đẳng là một phần của tôn trọng người khác.', 'Sai — lễ phép là biểu hiện của tôn trọng.', 'Đúng — tôn trọng không có nghĩa là đồng ý với mọi quan điểm, kể cả khi sai.', 'Sai — lắng nghe là biểu hiện của tôn trọng.']),
  ]),

  M(4, 'Giữ chữ tín', [
    Q('Giữ chữ tín là?', ['Nói nhiều', 'Coi trọng lòng tin, giữ đúng lời hứa', 'Im lặng', 'Khoe khoang'], 1, 'Giữ chữ tín = coi trọng lòng tin của mọi người, giữ đúng lời hứa và cam kết.', [
      '<b>Chữ tín</b> là niềm tin của con người đối với nhau. <b>Giữ chữ tín</b> là <i>coi trọng lòng tin của mọi người</i>, biết trọng lời hứa và tin tưởng nhau.',
      'Người giữ chữ tín luôn <code>giữ đúng lời hứa, cam kết</code>; làm tròn trách nhiệm, đúng hẹn trong quan hệ và công việc.',
    ], ['Sai — nói nhiều không liên quan đến giữ chữ tín.', 'Đúng — giữ chữ tín là coi trọng lòng tin, giữ đúng lời hứa và cam kết.', 'Sai — im lặng không phải là biểu hiện của giữ chữ tín.', 'Sai — khoe khoang không liên quan đến chữ tín.']),
    Q('Người giữ chữ tín thường?', ['Nói dối quanh', 'Làm đúng những gì đã hứa', 'Hứa cho qua chuyện', 'Hứa rồi quên'], 1, 'Người giữ chữ tín luôn cố gắng thực hiện đúng lời hứa.', [
      '<b>Biểu hiện của giữ chữ tín</b>: giữ đúng lời hứa, đúng hẹn; hoàn thành công việc được giao; chịu trách nhiệm về lời nói và việc làm của mình.',
      'Người giữ chữ tín <i>nói được làm được</i>, không hứa suông, không hứa cho qua chuyện.',
      '⚠️ Nói dối quanh, hứa rồi quên, hứa cho có là biểu hiện của <code>người thất tín</code>.',
    ], ['Sai — nói dối quanh là biểu hiện của người không giữ chữ tín.', 'Đúng — người giữ chữ tín luôn cố gắng làm đúng những gì đã hứa.', 'Sai — hứa cho qua chuyện là thất tín.', 'Sai — hứa rồi quên là không giữ lời.']),
    Q('Ý nghĩa của giữ chữ tín?', ['Được mọi người tin cậy, hợp tác', 'Không có ý nghĩa', 'Mất bạn bè', 'Bị mọi người xa lánh'], 0, 'Giữ chữ tín giúp xây dựng uy tín, được mọi người tin cậy trong công việc và đời sống.', [
      '<b>Ý nghĩa của giữ chữ tín</b>:',
      '<ul><li>Giúp xây dựng <code>uy tín</code> cá nhân, được mọi người tin cậy.</li><li>Tạo nền tảng cho sự <i>hợp tác, đoàn kết</i> trong công việc và đời sống.</li><li>Làm cho quan hệ xã hội tốt đẹp, bền vững hơn.</li></ul>',
      '💡 Trong kinh doanh và đời sống, chữ tín là "tài sản" quý giá nhất, mất rất khó lấy lại.',
    ], ['Đúng — giữ chữ tín xây dựng uy tín, được mọi người tin cậy và hợp tác.', 'Sai — giữ chữ tín có ý nghĩa rất lớn trong đời sống.', 'Sai — giữ chữ tín giúp gắn kết bạn bè, không làm mất bạn.', 'Sai — người giữ chữ tín được quý mến, không bị xa lánh.']),
    Q('Câu tục ngữ về chữ tín?', ['Nói lời phải giữ lấy lời / Đừng như con bướm đậu rồi lại bay', 'Tay làm hàm nhai', 'Ăn cây nào rào cây nấy', 'Đèn nhà ai nấy rạng'], 0, '"Nói lời phải giữ lấy lời" trực tiếp nói về chữ tín.', [
      'Ca dao <i>"Nói lời phải giữ lấy lời / Đừng như con bướm đậu rồi lại bay"</i> khuyên con người <b>đã hứa thì phải giữ lời</b>, không thay đổi tuỳ tiện như con bướm.',
      'Đây là lời răn dạy về <code>giữ chữ tín</code> trong văn hoá Việt Nam.',
      'Phân biệt: "Tay làm hàm nhai" (lao động), "Ăn cây nào rào cây nấy" (trách nhiệm với nơi gắn bó), "Đèn nhà ai nấy rạng" (mạnh ai nấy lo).',
    ], ['Đúng — \'Nói lời phải giữ lấy lời\' trực tiếp đề cao giữ chữ tín.', 'Sai — câu này nói về lao động và hưởng thụ.', 'Sai — câu này nói về trách nhiệm với nơi mình gắn bó.', 'Sai — câu này nói về sự độc lập, mạnh ai nấy lo.']),
    Q('Khi không thể giữ lời hứa, nên?', ['Im lặng coi như chưa hứa', 'Đổ lỗi cho người khác', 'Bỏ trốn', 'Báo trước và xin lỗi, đề nghị bù đắp'], 3, 'Báo trước, xin lỗi chân thành và đề nghị cách bù đắp là cách giữ chữ tín ngay cả khi không hoàn thành.', [
      'Đôi khi vì lý do khách quan ta <b>không thể giữ trọn lời hứa</b>. Cách ứng xử có chữ tín là:',
      '<ul><li><b>Báo trước</b> cho người liên quan biết.</li><li><b>Xin lỗi chân thành</b> và giải thích lý do.</li><li><b>Đề nghị cách bù đắp</b>, sửa chữa.</li></ul>',
      '⚠️ Im lặng coi như chưa hứa, đổ lỗi hay bỏ trốn đều làm <code>mất lòng tin</code> nghiêm trọng.',
    ], ['Sai — im lặng coi như chưa hứa là trốn tránh trách nhiệm.', 'Sai — đổ lỗi cho người khác càng làm mất lòng tin.', 'Sai — bỏ trốn là cách hành xử vô trách nhiệm nhất.', 'Đúng — báo trước, xin lỗi và đề nghị bù đắp là giữ chữ tín ngay cả khi lỡ hẹn.']),
  ]),

  M(5, 'Pháp luật và kỷ luật', [
    Q('Pháp luật là?', ['Lời khuyên của người lớn', 'Quy tắc xử sự chung, do Nhà nước ban hành, có tính bắt buộc chung', 'Quy ước trong gia đình', 'Quy định nội bộ trường học'], 1, 'Pháp luật do Nhà nước ban hành, có tính bắt buộc chung với mọi công dân.', [
      '<b>Pháp luật</b> là <i>các quy tắc xử sự chung</i>, có tính bắt buộc, do <code>Nhà nước ban hành</code> và bảo đảm thực hiện bằng các biện pháp giáo dục, thuyết phục, cưỡng chế.',
      'Pháp luật áp dụng với <b>mọi công dân</b> trên cả nước, không loại trừ ai.',
      '⚠️ Lời khuyên, quy ước gia đình, nội quy trường học không phải pháp luật — chúng không do Nhà nước ban hành.',
    ], ['Sai — lời khuyên không có tính bắt buộc như pháp luật.', 'Đúng — pháp luật là quy tắc xử sự chung do Nhà nước ban hành, bắt buộc chung.', 'Sai — quy ước gia đình chỉ áp dụng trong nhà, không phải pháp luật.', 'Sai — quy định trường học là kỷ luật của tổ chức, không phải pháp luật.']),
    Q('Kỷ luật là?', ['Phong tục', 'Quy định của một tổ chức, tập thể (trường, cơ quan)', 'Lễ giáo', 'Pháp luật'], 1, 'Kỷ luật = quy định của tổ chức, tập thể, chỉ áp dụng với thành viên tổ chức đó.', [
      '<b>Kỷ luật</b> là <i>những quy định, quy ước</i> của một cộng đồng, tổ chức, tập thể (lớp học, trường, cơ quan…) yêu cầu mọi người phải tuân theo.',
      'Kỷ luật chỉ áp dụng với <code>thành viên</code> của tổ chức đó, nhằm tạo sự thống nhất hành động.',
      '⚠️ Khác với pháp luật (do Nhà nước ban hành, áp dụng toàn xã hội), kỷ luật do tổ chức tự đặt ra.',
    ], ['Sai — phong tục là tập quán truyền thống, không phải kỷ luật.', 'Đúng — kỷ luật là quy định của một tổ chức, tập thể như trường, cơ quan.', 'Sai — lễ giáo là quy tắc ứng xử đạo đức, không phải kỷ luật.', 'Sai — pháp luật do Nhà nước ban hành, khác với kỷ luật của tổ chức.']),
    Q('Mối quan hệ pháp luật và kỷ luật?', ['Không liên quan', 'Kỷ luật cao hơn pháp luật', 'Đối lập nhau', 'Kỷ luật của tổ chức phải tuân theo pháp luật'], 3, 'Kỷ luật của tổ chức phải phù hợp, không trái pháp luật.', [
      '<b>Pháp luật và kỷ luật có mối quan hệ chặt chẽ</b>: cùng giúp con người có chuẩn mực để rèn luyện, sống lành mạnh.',
      'Tuy nhiên, pháp luật có <code>hiệu lực cao hơn</code>: những quy định của một tổ chức (kỷ luật) <i>không được trái với pháp luật</i> của Nhà nước.',
      '💡 Tuân theo kỷ luật tốt cũng góp phần giúp con người biết tôn trọng và thực hiện pháp luật.',
    ], ['Sai — pháp luật và kỷ luật có quan hệ chặt chẽ.', 'Sai — pháp luật có hiệu lực cao hơn, kỷ luật phải tuân theo.', 'Sai — hai cái không đối lập mà thống nhất với nhau.', 'Đúng — kỷ luật của tổ chức phải phù hợp, không được trái pháp luật.']),
    Q('Vai trò của pháp luật?', ['Trừng phạt mọi người', 'Phân biệt giàu nghèo', 'Hạn chế tự do', 'Quản lý xã hội, bảo vệ quyền công dân'], 3, 'Pháp luật là công cụ quản lý xã hội và bảo vệ quyền, lợi ích hợp pháp của công dân.', [
      '<b>Vai trò của pháp luật</b>:',
      '<ul><li>Là công cụ để Nhà nước <code>quản lý xã hội</code>, giữ gìn trật tự.</li><li>Bảo vệ <i>quyền và lợi ích hợp pháp</i> của công dân.</li><li>Bảo đảm công bằng, dân chủ, văn minh.</li></ul>',
      '⚠️ Pháp luật không nhằm trừng phạt mọi người hay hạn chế tự do — nó bảo vệ tự do trong khuôn khổ, đối xử bình đẳng không phân biệt giàu nghèo.',
    ], ['Sai — pháp luật để quản lý và bảo vệ, không phải để trừng phạt mọi người.', 'Sai — pháp luật bảo đảm bình đẳng, không phân biệt giàu nghèo.', 'Sai — pháp luật bảo vệ tự do trong khuôn khổ, không phải hạn chế tự do.', 'Đúng — pháp luật quản lý xã hội và bảo vệ quyền, lợi ích hợp pháp của công dân.']),
    Q('HS chấp hành nội quy trường thể hiện?', ['Tinh thần kỷ luật', 'Sợ thầy cô', 'Lười biếng', 'Khoe khoang'], 0, 'Chấp hành nội quy = thực hiện kỷ luật của nhà trường.', [
      'Nội quy trường học là một dạng <b>kỷ luật</b> của tập thể.',
      'Học sinh tự giác <i>chấp hành nội quy</i> (đi học đúng giờ, mặc đồng phục, giữ trật tự…) thể hiện <code>tinh thần kỷ luật</code> và ý thức tự giác.',
      '💡 Người có tính kỷ luật sẽ dễ thành công và được tập thể tin tưởng.',
    ], ['Đúng — chấp hành nội quy là thể hiện tinh thần kỷ luật của HS.', 'Sai — chấp hành nội quy là ý thức tự giác, không phải vì sợ.', 'Sai — chấp hành nội quy ngược với lười biếng.', 'Sai — đây là việc nên làm, không phải để khoe khoang.']),
  ]),

  M(6, 'Xây dựng tình bạn trong sáng, lành mạnh', [
    Q('Tình bạn trong sáng, lành mạnh có đặc điểm?', ['Ganh đua, đố kỵ', 'Bao che cái sai', 'Bình đẳng, tôn trọng, tin cậy, chân thành', 'Lợi dụng nhau'], 2, 'Tình bạn lành mạnh dựa trên bình đẳng, tôn trọng, chân thành và tin cậy lẫn nhau.', [
      '<b>Tình bạn</b> là tình cảm gắn bó giữa hai hoặc nhiều người trên cơ sở hợp nhau về tính tình, sở thích, lý tưởng.',
      '<b>Đặc điểm của tình bạn trong sáng, lành mạnh</b>: <i>phù hợp về quan niệm sống; bình đẳng và tôn trọng lẫn nhau; chân thành, tin cậy, có trách nhiệm; thông cảm, đồng cảm sâu sắc</i>.',
      '⚠️ Ganh đua, đố kỵ, bao che cái sai, lợi dụng nhau là <code>biểu hiện trái</code> với tình bạn đẹp.',
    ], ['Sai — ganh đua, đố kỵ phá hỏng tình bạn.', 'Sai — bao che cái sai là tình bạn không lành mạnh.', 'Đúng — tình bạn lành mạnh dựa trên bình đẳng, tôn trọng, tin cậy, chân thành.', 'Sai — lợi dụng nhau là tình bạn vụ lợi, không trong sáng.']),
    Q('Biểu hiện của tình bạn KHÔNG lành mạnh?', ['Giúp nhau khi khó khăn', 'Cùng học tập tiến bộ', 'Chia sẻ buồn vui', 'Rủ rê chơi điện tử quên học'], 3, 'Rủ nhau làm điều xấu, ảnh hưởng học tập là biểu hiện tình bạn không lành mạnh.', [
      '<b>Tình bạn lành mạnh</b> giúp nhau cùng tiến bộ: giúp đỡ khi khó khăn, cùng học tập, chia sẻ buồn vui.',
      '⚠️ <b>Tình bạn không lành mạnh</b> kéo nhau đi xuống: rủ rê bỏ học chơi game, làm điều xấu, bao che khuyết điểm cho nhau.',
      '💡 Một người bạn tốt là người giúp ta <code>trở nên tốt hơn</code>, không phải kéo ta sa ngã.',
    ], ['Sai — giúp nhau khi khó khăn là tình bạn đẹp.', 'Sai — cùng học tập tiến bộ là biểu hiện tình bạn lành mạnh.', 'Sai — chia sẻ buồn vui là điều tốt trong tình bạn.', 'Đúng — rủ nhau bỏ học chơi game là tình bạn không lành mạnh, gây hại.']),
    Q('Ý nghĩa của tình bạn đẹp?', ['Giúp ta hoàn thiện nhân cách, tự tin', 'Tốn tiền', 'Mất thời gian', 'Không có ý nghĩa'], 0, 'Tình bạn đẹp giúp ta tiến bộ, hoàn thiện nhân cách và vượt qua khó khăn.', [
      '<b>Ý nghĩa của tình bạn trong sáng, lành mạnh</b>:',
      '<ul><li>Giúp con người cảm thấy <i>ấm áp, tự tin, yêu cuộc sống</i> hơn.</li><li>Giúp nhau <code>tự hoàn thiện nhân cách</code>, cùng tiến bộ.</li><li>Là chỗ dựa tinh thần để vượt qua khó khăn.</li></ul>',
      '💡 "Học thầy không tày học bạn" — bạn tốt là một người thầy của cuộc đời.',
    ], ['Đúng — tình bạn đẹp giúp ta hoàn thiện nhân cách, tự tin và tiến bộ.', 'Sai — tình bạn đẹp không phải là gánh nặng tiền bạc.', 'Sai — thời gian bên bạn tốt là đầu tư đáng giá, không phí.', 'Sai — tình bạn đẹp có ý nghĩa rất lớn với mỗi người.']),
    Q('Để có tình bạn đẹp, cần?', ['Ganh ghét', 'Chân thành, tin cậy, sẵn sàng giúp đỡ', 'Khoe khoang', 'Chỉ chơi khi có lợi cho mình'], 1, 'Chân thành, tin cậy, biết chia sẻ và sẵn lòng giúp đỡ là nền tảng tình bạn đẹp.', [
      'Để xây dựng tình bạn đẹp, mỗi người cần biết <code>chân thành, tin cậy, tôn trọng</code> và <i>sẵn sàng giúp đỡ</i> bạn.',
      'Tình bạn cần được <b>vun đắp từ cả hai phía</b>, dựa trên sự bình đẳng và thiện chí.',
      '⚠️ Ganh ghét, khoe khoang, chỉ chơi khi có lợi đều là thái độ làm <b>hỏng tình bạn</b>.',
    ], ['Sai — ganh ghét phá hỏng tình bạn.', 'Đúng — chân thành, tin cậy, sẵn sàng giúp đỡ là nền tảng tình bạn đẹp.', 'Sai — khoe khoang không tạo nên tình bạn chân thành.', 'Sai — chỉ chơi khi có lợi là tình bạn vụ lợi.']),
    Q('Khi bạn mắc sai lầm, người bạn tốt nên?', ['Khuyên bảo chân thành, giúp bạn sửa sai', 'Bao che', 'Tố cáo công khai để bạn xấu hổ', 'Tránh xa'], 0, 'Người bạn tốt khuyên bảo chân thành để bạn nhận ra và sửa sai.', [
      'Khi bạn mắc lỗi, người bạn tốt thể hiện sự <b>chân thành và có trách nhiệm</b>: nhẹ nhàng <i>khuyên bảo</i>, giúp bạn nhận ra và sửa sai.',
      '⚠️ <code>Bao che</code> chỉ làm bạn lún sâu vào sai lầm; <code>bêu xấu</code> làm bạn tổn thương; <code>tránh xa</code> là bỏ rơi bạn lúc cần.',
      '💡 "Bạn tốt là người dám nói thật điều ta không muốn nghe, vì điều tốt cho ta".',
    ], ['Đúng — người bạn tốt khuyên bảo chân thành, giúp bạn nhận ra và sửa sai.', 'Sai — bao che chỉ làm bạn lún sâu vào sai lầm.', 'Sai — bêu xấu bạn là làm tổn thương, không giúp bạn tiến bộ.', 'Sai — tránh xa khi bạn lầm lỗi là bỏ rơi bạn.']),
  ]),

  M(7, 'Tôn trọng, học hỏi các dân tộc khác', [
    Q('Tôn trọng các dân tộc khác là?', ['Coi trọng giá trị văn hoá, truyền thống của các dân tộc, các nước', 'Không quan tâm', 'Khinh thường các nước nhỏ', 'Chỉ tôn trọng nước giàu'], 0, 'Tôn trọng dân tộc khác là coi trọng nền văn hoá, truyền thống của mọi quốc gia.', [
      '<b>Tôn trọng các dân tộc khác</b> là <i>tôn trọng chủ quyền, lợi ích và nền văn hoá</i> của các dân tộc; luôn tìm hiểu, tiếp thu những điều tốt đẹp trong nền kinh tế, văn hoá, xã hội của họ.',
      'Tôn trọng phải dành cho <code>mọi dân tộc</code>, không phân biệt nước lớn hay nhỏ, giàu hay nghèo.',
      '⚠️ Khinh thường nước nhỏ, chỉ trọng nước giàu là thái độ <b>kì thị</b>, thiếu tôn trọng.',
    ], ['Đúng — tôn trọng dân tộc khác là coi trọng văn hoá, truyền thống của mọi dân tộc, mọi nước.', 'Sai — thờ ơ không phải là tôn trọng.', 'Sai — khinh thường nước nhỏ là thái độ kì thị, thiếu tôn trọng.', 'Sai — tôn trọng dành cho mọi dân tộc, không chỉ nước giàu.']),
    Q('Học hỏi dân tộc khác có ý nghĩa?', ['Phụ thuộc nước ngoài', 'Giúp phát triển đất nước, không lạc hậu', 'Chỉ học hỏi về vật chất, bỏ qua tinh thần', 'Mất bản sắc dân tộc'], 1, 'Học hỏi tinh hoa các dân tộc giúp Việt Nam tiến bộ, hội nhập.', [
      '<b>Ý nghĩa của việc học hỏi các dân tộc khác</b>: tạo điều kiện để nước ta <i>tiến nhanh trên con đường xây dựng đất nước</i> giàu mạnh và phát triển bản sắc dân tộc.',
      'Tiếp thu tinh hoa nhân loại giúp ta <code>không bị lạc hậu</code>, hội nhập với thế giới.',
      '⚠️ Học hỏi để tiến bộ, KHÔNG phải để lệ thuộc hay đánh mất bản sắc.',
    ], ['Sai — học hỏi để tiến bộ, không phải để lệ thuộc.', 'Đúng — học hỏi tinh hoa giúp đất nước phát triển, không bị lạc hậu.', 'Sai — học hỏi cả tinh hoa vật chất lẫn tinh thần.', 'Sai — học hỏi có chọn lọc thì không làm mất bản sắc.']),
    Q('Khi học hỏi dân tộc khác, cần?', ['Chọn lọc, phù hợp với điều kiện VN', 'Sao chép máy móc', 'Chỉ học cái xấu', 'Từ chối hoàn toàn'], 0, 'Phải có chọn lọc, tiếp thu tinh hoa phù hợp văn hoá và điều kiện Việt Nam.', [
      'Học hỏi các dân tộc khác phải có <code>chọn lọc</code>: tiếp thu những <i>tinh hoa, tiến bộ</i> phù hợp với điều kiện và truyền thống của dân tộc ta.',
      '⚠️ Cần tránh: <b>sao chép máy móc, rập khuôn</b>, hoặc học theo cái xấu, cái lạc hậu.',
      '💡 "Hoà nhập nhưng không hoà tan" — tiếp thu cái hay của thế giới mà vẫn giữ được bản sắc Việt Nam.',
    ], ['Đúng — phải tiếp thu có chọn lọc, phù hợp với văn hoá và điều kiện Việt Nam.', 'Sai — sao chép máy móc dễ gây phản tác dụng, mất bản sắc.', 'Sai — chỉ học cái xấu là tiếp thu sai lệch.', 'Sai — từ chối hoàn toàn khiến đất nước lạc hậu.']),
    Q('Việt Nam đã tiếp thu được điều gì từ thế giới?', ['Không có gì', 'Khoa học công nghệ, quản lý hiện đại', 'Chỉ ngôn ngữ', 'Chỉ phong tục lạc hậu'], 1, 'VN tiếp thu khoa học, công nghệ, quản lý hiện đại để xây dựng đất nước.', [
      'Trong quá trình hội nhập, Việt Nam đã tiếp thu nhiều thành tựu của nhân loại: <code>khoa học, công nghệ</code>, cách thức <i>quản lý kinh tế hiện đại</i>, tiến bộ y học, giáo dục…',
      'Việc tiếp thu này giúp đất nước <b>phát triển nhanh và bền vững</b> hơn.',
      '⚠️ Học hỏi luôn là chọn cái tiến bộ, không phải tiếp thu phong tục lạc hậu.',
    ], ['Sai — VN đã tiếp thu nhiều thành tựu từ thế giới.', 'Đúng — VN tiếp thu khoa học, công nghệ, cách quản lý hiện đại để phát triển.', 'Sai — không chỉ ngôn ngữ mà còn nhiều lĩnh vực khác.', 'Sai — tiếp thu là chọn cái tiến bộ, không phải phong tục lạc hậu.']),
    Q('Hành vi sai lầm khi tiếp xúc văn hoá nước ngoài?', ['Giữ bản sắc dân tộc', 'Sùng ngoại, bài nội', 'Học ngoại ngữ', 'Chọn lọc tiếp thu'], 1, 'Sùng ngoại tuyệt đối, coi thường dân tộc mình là thái độ sai lầm.', [
      '<b>Sùng ngoại, bài nội</b> nghĩa là <i>tôn sùng tuyệt đối mọi thứ của nước ngoài</i> và coi thường, chê bai văn hoá dân tộc mình — đây là thái độ <code>sai lầm</code>.',
      'Ngược lại, <b>giữ bản sắc dân tộc, học ngoại ngữ, chọn lọc tiếp thu</b> là những cách ứng xử văn hoá đúng đắn.',
      '💡 Tự hào về văn hoá dân tộc song song với học hỏi thế giới mới là thái độ cân bằng.',
    ], ['Sai — giữ bản sắc dân tộc là việc làm đúng đắn.', 'Đúng — sùng ngoại, coi thường dân tộc mình là thái độ sai lầm.', 'Sai — học ngoại ngữ là điều tích cực, có ích.', 'Sai — chọn lọc tiếp thu là cách học hỏi đúng đắn.']),
  ]),

  M(8, 'Quyền sở hữu tài sản và nghĩa vụ tôn trọng tài sản của người khác', [
    Q('Quyền sở hữu tài sản gồm?', ['Chỉ sử dụng', 'Chỉ chiếm hữu', 'Chỉ định đoạt', 'Chiếm hữu, sử dụng, định đoạt'], 3, 'Quyền sở hữu gồm 3 quyền năng: chiếm hữu, sử dụng và định đoạt.', [
      '<b>Quyền sở hữu tài sản</b> là quyền của công dân đối với tài sản thuộc sở hữu của mình, bao gồm <b>3 quyền năng</b>:',
      '<ul><li><b>Quyền chiếm hữu</b>: nắm giữ, quản lý tài sản.</li><li><b>Quyền sử dụng</b>: khai thác công dụng, hưởng lợi từ tài sản.</li><li><b>Quyền định đoạt</b>: quyết định số phận tài sản (bán, tặng, phá huỷ…).</li></ul>',
      '💡 Ba quyền này hợp thành quyền sở hữu đầy đủ; chủ sở hữu mới có cả ba quyền.',
    ], ['Sai — sử dụng chỉ là một trong ba quyền năng.', 'Sai — chiếm hữu chỉ là một quyền năng, chưa đủ.', 'Sai — định đoạt chỉ là một quyền năng, chưa đầy đủ.', 'Đúng — quyền sở hữu gồm đủ ba quyền: chiếm hữu, sử dụng và định đoạt.']),
    Q('Quyền sử dụng là?', ['Khai thác công dụng, hưởng lợi từ tài sản', 'Bán tài sản', 'Cho thuê', 'Phá huỷ tài sản'], 0, 'Sử dụng = khai thác công dụng, hưởng lợi (vd: ở nhà, đi xe).', [
      '<b>Quyền sử dụng</b> là quyền <i>khai thác công dụng và hưởng hoa lợi, lợi tức</i> từ tài sản.',
      'Ví dụ: <code>ở trong ngôi nhà của mình, đi chiếc xe của mình, đọc cuốn sách của mình</code>.',
      '⚠️ Bán, tặng cho, phá huỷ tài sản thuộc về <b>quyền định đoạt</b>, không phải quyền sử dụng.',
    ], ['Đúng — quyền sử dụng là khai thác công dụng, hưởng lợi từ tài sản.', 'Sai — bán tài sản thuộc quyền định đoạt.', 'Sai — cho thuê là một hình thức định đoạt, không phải quyền sử dụng cốt lõi.', 'Sai — phá huỷ tài sản thuộc quyền định đoạt.']),
    Q('Quyền định đoạt là?', ['Chỉ thừa kế', 'Quyết định số phận tài sản (bán, tặng, phá huỷ)', 'Chỉ sử dụng', 'Chỉ trông giữ'], 1, 'Định đoạt = quyết định số phận pháp lý của tài sản: bán, tặng cho, phá huỷ…', [
      '<b>Quyền định đoạt</b> là quyền <i>quyết định số phận của tài sản</i>: bán, trao đổi, tặng cho, cho vay, để thừa kế, từ bỏ hoặc tiêu dùng, phá huỷ.',
      'Đây là <code>quyền năng quan trọng nhất</code> của chủ sở hữu.',
      '⚠️ Thừa kế chỉ là một trường hợp; trông giữ thuộc quyền chiếm hữu — cả hai chưa bao quát hết quyền định đoạt.',
    ], ['Sai — thừa kế chỉ là một trường hợp, không phải toàn bộ quyền định đoạt.', 'Đúng — định đoạt là quyết định số phận tài sản: bán, tặng cho, phá huỷ…', 'Sai — sử dụng là quyền năng khác.', 'Sai — trông giữ thuộc quyền chiếm hữu, không phải định đoạt.']),
    Q('Nghĩa vụ của công dân?', ['Phá hoại tài sản công', 'Trộm cắp khi có cơ hội', 'Tôn trọng tài sản của người khác', 'Lấy tài sản người khác làm của mình'], 2, 'Mỗi công dân có nghĩa vụ tôn trọng quyền sở hữu của người khác.', [
      'Đi đôi với quyền sở hữu, mỗi công dân có <b>nghĩa vụ tôn trọng tài sản của người khác</b>:',
      '<ul><li>Không xâm phạm tài sản của cá nhân, tổ chức, tập thể, Nhà nước.</li><li>Nhặt được của rơi phải <code>trả lại</code> chủ sở hữu.</li><li>Mượn tài sản phải giữ gìn, làm hỏng phải bồi thường.</li></ul>',
      '⚠️ Trộm cắp, phá hoại, chiếm đoạt tài sản người khác đều vi phạm pháp luật.',
    ], ['Sai — phá hoại tài sản công là vi phạm pháp luật.', 'Sai — trộm cắp là hành vi xâm phạm quyền sở hữu.', 'Đúng — công dân có nghĩa vụ tôn trọng quyền sở hữu tài sản của người khác.', 'Sai — chiếm đoạt tài sản người khác là phạm pháp.']),
    Q('Hành vi xâm phạm quyền sở hữu?', ['Trộm cắp, cướp giật, lừa đảo', 'Cho mượn', 'Tặng quà', 'Mua bán hợp pháp'], 0, 'Trộm cắp, cướp giật, lừa đảo… đều vi phạm quyền sở hữu, bị pháp luật xử lý.', [
      '<b>Hành vi xâm phạm quyền sở hữu</b>: trộm cắp, cướp giật, lừa đảo, chiếm đoạt, huỷ hoại tài sản của người khác — đều bị <code>pháp luật xử lý</code> (hành chính hoặc hình sự).',
      'Ngược lại, <i>cho mượn, tặng quà, mua bán hợp pháp</i> là các giao dịch dân sự bình thường, tự nguyện và đúng pháp luật.',
    ], ['Đúng — trộm cắp, cướp giật, lừa đảo đều xâm phạm quyền sở hữu, bị pháp luật xử lý.', 'Sai — cho mượn là giao dịch hợp pháp, tự nguyện.', 'Sai — tặng quà là chuyển quyền sở hữu hợp pháp.', 'Sai — mua bán hợp pháp không xâm phạm quyền sở hữu.']),
  ]),

  M(9, 'Nghĩa vụ tôn trọng, bảo vệ tài sản nhà nước và lợi ích công cộng', [
    Q('Tài sản nhà nước gồm?', ['Tài sản tư nhân', 'Chỉ tiền', 'Chỉ đất đai', 'Đất đai, tài nguyên, ngân sách, doanh nghiệp nhà nước…'], 3, 'Tài sản NN gồm đất đai, rừng, khoáng sản, ngân sách, doanh nghiệp NN, công trình công…', [
      '<b>Tài sản Nhà nước</b> bao gồm: <i>đất đai, rừng núi, sông hồ, nguồn nước, tài nguyên trong lòng đất, nguồn lợi vùng biển, thềm lục địa, vùng trời, ngân sách nhà nước, doanh nghiệp nhà nước</i>…',
      'Tài sản Nhà nước thuộc <code>sở hữu toàn dân</code>, do Nhà nước đại diện quản lý.',
      '⚠️ Tài sản tư nhân thuộc sở hữu cá nhân, không phải tài sản Nhà nước.',
    ], ['Sai — tài sản tư nhân thuộc sở hữu cá nhân, không phải của Nhà nước.', 'Sai — không chỉ tiền mà còn nhiều loại tài sản khác.', 'Sai — không chỉ đất đai mà còn rừng, khoáng sản, ngân sách…', 'Đúng — tài sản Nhà nước gồm đất đai, tài nguyên, ngân sách, doanh nghiệp Nhà nước…']),
    Q('Lợi ích công cộng là?', ['Lợi ích cá nhân', 'Lợi ích chung của xã hội', 'Lợi ích của một nhóm', 'Lợi ích gia đình'], 1, 'Lợi ích công cộng = lợi ích chung phục vụ toàn xã hội (đường sá, công viên, trường công…).', [
      '<b>Lợi ích công cộng</b> là những <i>lợi ích chung</i> dành cho mọi người và xã hội.',
      'Ví dụ: <code>đường sá, cầu cống, công viên, bệnh viện công, trường học công, hệ thống điện nước công cộng</code>.',
      '💡 Tài sản nhà nước và lợi ích công cộng là cơ sở vật chất để phát triển đất nước, nâng cao đời sống nhân dân.',
    ], ['Sai — lợi ích cá nhân chỉ phục vụ một người.', 'Đúng — lợi ích công cộng là lợi ích chung phục vụ toàn xã hội.', 'Sai — lợi ích nhóm chỉ phục vụ một số người, không phải toàn xã hội.', 'Sai — lợi ích gia đình giới hạn trong phạm vi một nhà.']),
    Q('Hành vi bảo vệ tài sản công?', ['Giữ gìn bàn ghế trường học, tiết kiệm điện nước', 'Xả rác bừa bãi', 'Vẽ bậy lên tường', 'Phá hoại biển báo'], 0, 'Giữ gìn bàn ghế, tiết kiệm điện nước trường học là bảo vệ tài sản công.', [
      '<b>Bảo vệ tài sản công</b> là nghĩa vụ của mọi công dân: <i>giữ gìn, sử dụng tiết kiệm và đúng mục đích</i>.',
      'Với học sinh: <code>giữ gìn bàn ghế, đồ dùng, tiết kiệm điện nước trường học</code>, không vẽ bậy, không phá hoại.',
      '⚠️ Xả rác, vẽ bậy, phá biển báo là hành vi <b>phá hoại</b> tài sản và lợi ích công cộng.',
    ], ['Đúng — giữ gìn bàn ghế, tiết kiệm điện nước là bảo vệ tài sản công.', 'Sai — xả rác bừa bãi làm hỏng môi trường công cộng.', 'Sai — vẽ bậy lên tường là phá hoại tài sản công.', 'Sai — phá hoại biển báo gây hại cho lợi ích công cộng.']),
    Q('Vi phạm bị xử lý thế nào?', ['Tuỳ mức độ: bồi thường, kỷ luật, hình sự', 'Chỉ phạt tiền', 'Chỉ nhắc nhở', 'Không bị gì'], 0, 'Tuỳ mức độ vi phạm có thể bị bồi thường, kỷ luật hành chính hoặc xử lý hình sự.', [
      'Người vi phạm nghĩa vụ tôn trọng, bảo vệ tài sản Nhà nước và lợi ích công cộng sẽ bị <b>xử lý tuỳ theo mức độ</b>:',
      '<ul><li>Nhẹ: nhắc nhở, <code>bồi thường</code> thiệt hại.</li><li>Vừa: xử lý <i>kỷ luật, hành chính</i>.</li><li>Nặng: truy cứu trách nhiệm <i>hình sự</i>.</li></ul>',
      '💡 Mức xử lý tăng dần theo tính chất, hậu quả của hành vi vi phạm.',
    ], ['Đúng — tuỳ mức độ, người vi phạm có thể bị bồi thường, kỷ luật hoặc xử lý hình sự.', 'Sai — không chỉ phạt tiền, còn nhiều hình thức xử lý khác.', 'Sai — vi phạm nghiêm trọng không chỉ dừng ở nhắc nhở.', 'Sai — vi phạm tài sản công bị xử lý theo pháp luật.']),
    Q('Học sinh có thể bảo vệ tài sản công bằng cách?', ['Vẽ bậy', 'Tham gia vệ sinh trường lớp, tố giác hành vi phá hoại', 'Bẻ cành cây', 'Phá ổ khoá'], 1, 'HS tham gia giữ vệ sinh, sửa chữa nhỏ, tố giác hành vi phá hoại là bảo vệ tài sản công.', [
      'Học sinh góp phần bảo vệ tài sản công bằng những việc cụ thể: <i>tham gia vệ sinh trường lớp, giữ gìn cây xanh, đồ dùng chung, tiết kiệm điện nước</i>, và <code>tố giác hành vi phá hoại</code>.',
      '⚠️ Vẽ bậy, bẻ cành cây, phá ổ khoá là những hành vi <b>phá hoại</b>, đi ngược lại nghĩa vụ bảo vệ tài sản công.',
    ], ['Sai — vẽ bậy là phá hoại, không phải bảo vệ.', 'Đúng — tham gia vệ sinh trường lớp, tố giác hành vi phá hoại là bảo vệ tài sản công.', 'Sai — bẻ cành cây là phá hoại cây xanh công cộng.', 'Sai — phá ổ khoá là hành vi phá hoại tài sản.']),
  ]),

  M(10, 'Quyền khiếu nại, tố cáo của công dân', [
    Q('Khiếu nại là?', ['Đề xuất ý kiến', 'Khen thưởng cán bộ', 'Đề nghị xem xét lại quyết định/hành vi xâm phạm quyền, lợi ích của MÌNH', 'Tố cáo người vi phạm pháp luật'], 2, 'Khiếu nại = đề nghị xem xét quyết định/hành vi xâm phạm quyền lợi của BẢN THÂN người khiếu nại.', [
      '<b>Quyền khiếu nại</b> là quyền của công dân <i>đề nghị cơ quan, tổ chức, cá nhân có thẩm quyền xem xét lại</i> các quyết định, hành vi hành chính khi cho rằng quyết định, hành vi đó <code>xâm phạm quyền, lợi ích hợp pháp của chính mình</code>.',
      '💡 Điểm mấu chốt: khiếu nại nhằm bảo vệ <b>quyền lợi của bản thân</b> người khiếu nại.',
      '⚠️ Báo về hành vi vi phạm của người khác là tố cáo, không phải khiếu nại.',
    ], ['Sai — đề xuất ý kiến chung không phải là khiếu nại.', 'Sai — khen thưởng không liên quan đến khiếu nại.', 'Đúng — khiếu nại là đề nghị xem xét lại quyết định/hành vi xâm phạm quyền lợi của chính mình.', 'Sai — báo về hành vi vi phạm của người khác là tố cáo, không phải khiếu nại.']),
    Q('Tố cáo là?', ['Báo cho cơ quan có thẩm quyền về hành vi vi phạm pháp luật của bất kì ai gây thiệt hại nhà nước/công dân', 'Phê bình', 'Khiếu nại quyết định cá nhân mình', 'Khen thưởng'], 0, 'Tố cáo = báo cáo về hành vi vi phạm pháp luật của bất kì cá nhân/tổ chức nào.', [
      '<b>Quyền tố cáo</b> là quyền của công dân <i>báo cho cơ quan, tổ chức, cá nhân có thẩm quyền</i> biết về một hành vi vi phạm pháp luật của <code>bất kì ai</code>, gây thiệt hại đến lợi ích của Nhà nước, cơ quan, tổ chức hoặc công dân.',
      '💡 Tố cáo nhằm bảo vệ <b>lợi ích chung</b>, không nhất thiết liên quan trực tiếp đến quyền lợi người tố cáo.',
    ], ['Đúng — tố cáo là báo cho cơ quan có thẩm quyền về hành vi vi phạm pháp luật của bất kì ai.', 'Sai — phê bình là góp ý, không phải tố cáo theo pháp luật.', 'Sai — đề nghị xem xét quyết định liên quan quyền lợi mình là khiếu nại.', 'Sai — khen thưởng không phải là tố cáo.']),
    Q('Sự khác biệt giữa khiếu nại và tố cáo?', ['Không khác', 'Khiếu nại bảo vệ quyền lợi mình; tố cáo bảo vệ lợi ích chung', 'Khiếu nại chỉ dành cho cán bộ', 'Tố cáo chỉ dành cho người lớn'], 1, 'Khiếu nại để bảo vệ quyền lợi của chính người khiếu nại; tố cáo bảo vệ lợi ích chung hoặc người khác.', [
      'Phân biệt <b>khiếu nại</b> và <b>tố cáo</b>:',
      '<ul><li><b>Khiếu nại</b>: người khiếu nại là người <i>trực tiếp bị xâm phạm</i> quyền lợi → mục đích là khôi phục quyền lợi của <code>chính mình</code>.</li><li><b>Tố cáo</b>: người tố cáo có thể là <i>bất kì công dân nào</i> → mục đích là ngăn chặn vi phạm, bảo vệ <code>lợi ích chung</code>.</li></ul>',
    ], ['Sai — hai khái niệm có mục đích khác nhau.', 'Đúng — khiếu nại bảo vệ quyền lợi của chính mình; tố cáo bảo vệ lợi ích chung/người khác.', 'Sai — mọi công dân đều có quyền khiếu nại, không chỉ cán bộ.', 'Sai — tố cáo là quyền của mọi công dân, không giới hạn độ tuổi như vậy.']),
    Q('Ai có quyền khiếu nại, tố cáo?', ['Chỉ người lớn', 'Mọi công dân', 'Chỉ luật sư', 'Chỉ cán bộ'], 1, 'Mọi công dân đều có quyền khiếu nại, tố cáo theo Hiến pháp.', [
      'Theo Hiến pháp 2013 và Luật Khiếu nại, Luật Tố cáo, <b>mọi công dân</b> đều có quyền khiếu nại, tố cáo.',
      'Đây là một trong những <code>quyền dân chủ</code> cơ bản, là công cụ để công dân tham gia <i>giám sát hoạt động</i> của cơ quan nhà nước và bảo vệ quyền lợi hợp pháp.',
    ], ['Sai — quyền này không giới hạn ở người lớn theo cách hiểu này.', 'Đúng — mọi công dân đều có quyền khiếu nại, tố cáo theo Hiến pháp.', 'Sai — không chỉ luật sư mới có quyền này.', 'Sai — không chỉ cán bộ, mọi công dân đều có quyền.']),
    Q('Khi khiếu nại, tố cáo cần?', ['Giấu tên', 'Vu khống', 'Bịa đặt', 'Trung thực, đúng sự thật, đúng quy định pháp luật'], 3, 'Người khiếu nại, tố cáo phải trung thực, đúng sự thật, chịu trách nhiệm về nội dung.', [
      'Khi thực hiện quyền khiếu nại, tố cáo, công dân phải <b>trung thực, khách quan</b>, trình bày đúng sự thật và <i>chịu trách nhiệm</i> về nội dung mình nêu.',
      '⚠️ <code>Vu khống, bịa đặt</code> để hãm hại người khác là hành vi vi phạm pháp luật, bị xử lý.',
      '💡 Quyền đi đôi với trách nhiệm — dùng đúng quyền mới bảo vệ được lẽ phải.',
    ], ['Sai — khiếu nại, tố cáo cần rõ ràng, trung thực, chịu trách nhiệm về nội dung.', 'Sai — vu khống người khác là vi phạm pháp luật.', 'Sai — bịa đặt thông tin là hành vi sai trái.', 'Đúng — phải trung thực, đúng sự thật, đúng quy định pháp luật.']),
  ]),

  M(11, 'Quyền tự do ngôn luận', [
    Q('Tự do ngôn luận là?', ['Quyền tham gia bàn bạc, thảo luận, đóng góp ý kiến vào vấn đề chung', 'Bịa đặt thông tin', 'Vu khống người khác', 'Nói gì cũng được'], 0, 'Tự do ngôn luận = quyền tham gia bàn bạc, đóng góp ý kiến vào vấn đề chung trong khuôn khổ pháp luật.', [
      '<b>Quyền tự do ngôn luận</b> là quyền của công dân được <i>tham gia bàn bạc, thảo luận, đóng góp ý kiến</i> vào những vấn đề chung của đất nước, của xã hội.',
      'Đây là một <code>quyền dân chủ</code> cơ bản được Hiến pháp ghi nhận.',
      '⚠️ Tự do ngôn luận luôn nằm <b>trong khuôn khổ pháp luật</b>, không phải "nói gì cũng được".',
    ], ['Đúng — tự do ngôn luận là quyền tham gia bàn bạc, đóng góp ý kiến vào vấn đề chung.', 'Sai — bịa đặt thông tin là vi phạm pháp luật.', 'Sai — vu khống người khác không phải là tự do ngôn luận.', 'Sai — tự do ngôn luận vẫn trong khuôn khổ pháp luật, không phải nói gì cũng được.']),
    Q('Tự do ngôn luận có giới hạn?', ['Có — phải tuân theo pháp luật, không xâm phạm quyền người khác', 'Không có giới hạn', 'Chỉ giới hạn với người lớn', 'Chỉ giới hạn với người nghèo'], 0, 'Tự do ngôn luận trong khuôn khổ pháp luật, không được xâm phạm quyền và lợi ích của người khác.', [
      'Không có quyền tự do nào là <b>tuyệt đối</b>. Tự do ngôn luận phải:',
      '<ul><li><code>Tuân theo quy định của pháp luật</code>.</li><li>Không xâm phạm <i>quyền, lợi ích hợp pháp</i> của người khác.</li><li>Không gây hại cho lợi ích của Nhà nước, xã hội.</li></ul>',
      '💡 Giới hạn này áp dụng cho mọi người, không phân biệt tuổi tác, giàu nghèo.',
    ], ['Đúng — tự do ngôn luận có giới hạn: phải theo pháp luật, không xâm phạm quyền người khác.', 'Sai — không có quyền tự do nào là tuyệt đối, vô giới hạn.', 'Sai — giới hạn áp dụng cho mọi người, không riêng người lớn.', 'Sai — giới hạn không phân biệt giàu nghèo.']),
    Q('Biểu hiện đúng của tự do ngôn luận?', ['Vu khống bạn', 'Tung tin sai trên mạng xã hội', 'Bịa đặt thầy cô', 'Phát biểu ý kiến trong cuộc họp lớp'], 3, 'Phát biểu ý kiến trong cuộc họp, đóng góp xây dựng là biểu hiện đúng.', [
      '<b>Biểu hiện đúng của tự do ngôn luận</b>: phát biểu ý kiến trong các cuộc họp, đóng góp ý kiến xây dựng tập thể, viết bài kiến nghị, góp ý qua hòm thư góp ý, phản ánh trên báo chí một cách <code>trung thực, có căn cứ</code>.',
      '⚠️ Vu khống, bịa đặt, tung tin sai sự thật KHÔNG phải tự do ngôn luận mà là <b>vi phạm pháp luật</b>.',
    ], ['Sai — vu khống bạn là vi phạm pháp luật.', 'Sai — tung tin sai trên mạng là hành vi bị nghiêm cấm.', 'Sai — bịa đặt về thầy cô là xúc phạm danh dự.', 'Đúng — phát biểu ý kiến, đóng góp xây dựng trong cuộc họp lớp là biểu hiện đúng.']),
    Q('Vi phạm khi sử dụng tự do ngôn luận?', ['Bịa đặt, vu khống, xúc phạm danh dự người khác', 'Đề xuất ý kiến', 'Phản biện có căn cứ', 'Phát biểu xây dựng'], 0, 'Bịa đặt, vu khống, xúc phạm là vi phạm pháp luật, sẽ bị xử lý.', [
      '<b>Lợi dụng tự do ngôn luận để vi phạm pháp luật</b>: bịa đặt, vu khống, xúc phạm danh dự, nhân phẩm người khác; xuyên tạc, chống phá Nhà nước; tung tin gây hoang mang dư luận.',
      '⚠️ Những hành vi này bị <code>pháp luật xử lý</code> (hành chính hoặc hình sự).',
      '💡 Đề xuất ý kiến, phản biện có căn cứ, phát biểu xây dựng mới là cách dùng quyền đúng đắn.',
    ], ['Đúng — bịa đặt, vu khống, xúc phạm danh dự người khác là vi phạm pháp luật.', 'Sai — đề xuất ý kiến là sử dụng quyền đúng đắn.', 'Sai — phản biện có căn cứ là điều tích cực.', 'Sai — phát biểu xây dựng là biểu hiện đúng của tự do ngôn luận.']),
    Q('Khi đăng bài trên mạng xã hội?', ['Đăng gì cũng được', 'Cần kiểm chứng thông tin, không vu khống', 'Sao chép không cần ghi nguồn', 'Tự do tuyệt đối'], 1, 'Mạng xã hội vẫn nằm trong khuôn khổ pháp luật — cần kiểm chứng thông tin, tôn trọng người khác.', [
      'Mạng xã hội là không gian công cộng, vẫn <b>nằm trong khuôn khổ pháp luật</b> (Luật An ninh mạng).',
      'Khi đăng bài, cần: <i>kiểm chứng thông tin trước khi chia sẻ</i>, không vu khống, không xúc phạm người khác, <code>ghi rõ nguồn</code> khi trích dẫn.',
      '⚠️ "Đăng gì cũng được" hay "tự do tuyệt đối" là quan niệm sai — phát ngôn trên mạng vẫn phải chịu trách nhiệm.',
    ], ['Sai — mạng xã hội vẫn trong khuôn khổ pháp luật, không phải đăng gì cũng được.', 'Đúng — cần kiểm chứng thông tin, không vu khống, tôn trọng người khác.', 'Sai — sao chép không ghi nguồn là vi phạm bản quyền.', 'Sai — không có tự do tuyệt đối trên mạng xã hội.']),
  ]),

  M(12, 'Hiến pháp nước CHXHCN Việt Nam', [
    Q('Hiến pháp là?', ['Luật cơ bản, có hiệu lực pháp lý cao nhất của Nhà nước', 'Quy định nhà trường', 'Luật giao thông', 'Luật dân sự'], 0, 'Hiến pháp = luật cơ bản, có hiệu lực pháp lý cao nhất, mọi luật khác phải phù hợp Hiến pháp.', [
      '<b>Hiến pháp</b> là <i>luật cơ bản của Nhà nước</i>, có <code>hiệu lực pháp lý cao nhất</code> trong hệ thống pháp luật Việt Nam.',
      'Mọi văn bản pháp luật khác (luật, bộ luật, nghị định…) đều phải <b>phù hợp với Hiến pháp</b>, không được trái Hiến pháp.',
      '💡 Hiến pháp được ví như "luật mẹ" — gốc của toàn bộ hệ thống pháp luật.',
    ], ['Đúng — Hiến pháp là luật cơ bản, có hiệu lực pháp lý cao nhất của Nhà nước.', 'Sai — quy định nhà trường là nội quy, không phải Hiến pháp.', 'Sai — luật giao thông là luật chuyên ngành, phải phù hợp Hiến pháp.', 'Sai — luật dân sự là một bộ luật riêng, dưới Hiến pháp.']),
    Q('Hiến pháp đầu tiên của Việt Nam ban hành năm?', ['1946', '1945', '1959', '1980'], 0, 'Hiến pháp đầu tiên năm 1946, sau Cách mạng tháng Tám.', [
      'Việt Nam đã có <b>5 bản Hiến pháp</b>: <code>1946, 1959, 1980, 1992, 2013</code>.',
      'Bản <b>Hiến pháp 1946</b> là Hiến pháp đầu tiên, ra đời ngay sau <i>Cách mạng tháng Tám 1945</i> thành công, khai sinh nền dân chủ cộng hoà.',
      '⚠️ Lưu ý: 1945 là năm thành lập nước (chưa có Hiến pháp); 1959, 1980 là các bản Hiến pháp tiếp theo.',
    ], ['Đúng — Hiến pháp đầu tiên ban hành năm 1946, sau Cách mạng tháng Tám.', 'Sai — 1945 là năm thành lập nước, chưa có Hiến pháp.', 'Sai — 1959 là bản Hiến pháp thứ hai.', 'Sai — 1980 là bản Hiến pháp thứ ba.']),
    Q('Hiến pháp hiện hành của VN là?', ['Hiến pháp 2013', 'Hiến pháp 1992', 'Hiến pháp 1980', 'Hiến pháp 1959'], 0, 'Hiến pháp 2013 là Hiến pháp đang có hiệu lực hiện nay.', [
      '<b>Hiến pháp 2013</b> là bản Hiến pháp <i>đang có hiệu lực hiện nay</i>, được Quốc hội khoá XIII thông qua ngày 28/11/2013.',
      'Hiến pháp 2013 thay thế <code>Hiến pháp 1992</code>, với nhiều nội dung tiến bộ về quyền con người, quyền công dân.',
    ], ['Đúng — Hiến pháp 2013 là bản đang có hiệu lực hiện nay.', 'Sai — Hiến pháp 1992 đã được thay thế bởi bản 2013.', 'Sai — Hiến pháp 1980 không còn hiệu lực.', 'Sai — Hiến pháp 1959 đã được thay thế từ lâu.']),
    Q('Cơ quan có quyền sửa đổi Hiến pháp?', ['Chính phủ', 'Chủ tịch nước', 'Toà án', 'Quốc hội'], 3, 'Chỉ Quốc hội mới có quyền làm và sửa đổi Hiến pháp.', [
      'Theo Hiến pháp, <b>chỉ Quốc hội</b> mới có quyền <i>làm Hiến pháp và sửa đổi Hiến pháp</i> (quyền lập hiến).',
      'Việc sửa đổi Hiến pháp phải được ít nhất <code>hai phần ba tổng số đại biểu Quốc hội</code> biểu quyết tán thành.',
      '⚠️ Chính phủ (hành pháp), Toà án (tư pháp), Chủ tịch nước đều không có quyền sửa Hiến pháp.',
    ], ['Sai — Chính phủ là cơ quan hành chính, không sửa Hiến pháp.', 'Sai — Chủ tịch nước không có quyền sửa đổi Hiến pháp.', 'Sai — Toà án xét xử, không sửa Hiến pháp.', 'Đúng — chỉ Quốc hội mới có quyền làm và sửa đổi Hiến pháp.']),
    Q('Nội dung cơ bản của Hiến pháp?', ['Quy định trường học', 'Quy định kinh doanh', 'Quy định giao thông', 'Chế độ chính trị, quyền nghĩa vụ công dân, tổ chức bộ máy nhà nước'], 3, 'Hiến pháp quy định chế độ chính trị, quyền và nghĩa vụ công dân, tổ chức bộ máy nhà nước.', [
      '<b>Nội dung cơ bản của Hiến pháp</b> quy định những vấn đề nền tảng, quan trọng nhất của đất nước:',
      '<ul><li><i>Chế độ chính trị</i>, chế độ kinh tế.</li><li><i>Quyền và nghĩa vụ cơ bản</i> của công dân.</li><li><i>Tổ chức bộ máy nhà nước</i> (Quốc hội, Chính phủ, Toà án…).</li></ul>',
      '💡 Quy định về trường học, kinh doanh, giao thông thuộc các luật chuyên ngành cụ thể.',
    ], ['Sai — quy định trường học không phải nội dung Hiến pháp.', 'Sai — quy định kinh doanh thuộc luật chuyên ngành.', 'Sai — quy định giao thông thuộc luật chuyên ngành.', 'Đúng — Hiến pháp quy định chế độ chính trị, quyền nghĩa vụ công dân, tổ chức bộ máy nhà nước.']),
  ]),

  M(13, 'Pháp luật nước CHXHCN Việt Nam', [
    Q('Pháp luật do ai ban hành?', ['Doanh nghiệp', 'Cá nhân', 'Nhà nước', 'Tổ chức xã hội'], 2, 'Pháp luật do Nhà nước (Quốc hội, cơ quan có thẩm quyền) ban hành.', [
      '<b>Pháp luật do Nhà nước ban hành</b> (Quốc hội ban hành luật, bộ luật; các cơ quan có thẩm quyền ban hành văn bản dưới luật) và được bảo đảm thực hiện bằng <code>quyền lực nhà nước</code>.',
      '⚠️ Doanh nghiệp, cá nhân, tổ chức xã hội chỉ ban hành <i>nội quy, điều lệ</i> nội bộ — không phải pháp luật.',
    ], ['Sai — doanh nghiệp không có quyền ban hành pháp luật.', 'Sai — cá nhân không thể ban hành pháp luật.', 'Đúng — pháp luật do Nhà nước (Quốc hội, cơ quan có thẩm quyền) ban hành.', 'Sai — tổ chức xã hội chỉ ban hành điều lệ nội bộ, không phải pháp luật.']),
    Q('Đặc điểm của pháp luật?', ['Tính quy phạm phổ biến, tính bắt buộc chung, tính xác định chặt chẽ', 'Không có hình thức', 'Tính tự nguyện', 'Áp dụng tuỳ ý'], 0, 'Pháp luật có 3 đặc điểm: phổ biến, bắt buộc chung, xác định chặt chẽ về hình thức.', [
      '<b>Ba đặc điểm của pháp luật</b>:',
      '<ul><li><b>Tính quy phạm phổ biến</b>: là khuôn mẫu chung, áp dụng nhiều lần, ở nhiều nơi.</li><li><b>Tính bắt buộc chung</b>: mọi người đều phải tuân theo, ai vi phạm bị xử lý.</li><li><b>Tính xác định chặt chẽ</b>: nội dung rõ ràng, được thể hiện bằng <code>văn bản</code>.</li></ul>',
    ], ['Đúng — pháp luật có tính quy phạm phổ biến, bắt buộc chung, xác định chặt chẽ về hình thức.', 'Sai — pháp luật có hình thức xác định chặt chẽ bằng văn bản.', 'Sai — pháp luật mang tính bắt buộc chung, không phải tự nguyện.', 'Sai — pháp luật áp dụng thống nhất, không tuỳ ý.']),
    Q('Vai trò của pháp luật?', ['Phương tiện quản lý nhà nước, bảo vệ quyền công dân', 'Chỉ áp dụng cho cán bộ nhà nước', 'Trừng phạt', 'Phân biệt giàu nghèo'], 0, 'Pháp luật là phương tiện quản lý xã hội, bảo vệ quyền và lợi ích hợp pháp của công dân.', [
      '<b>Vai trò của pháp luật</b>: là <i>công cụ để Nhà nước quản lý</i> kinh tế, xã hội; giữ vững an ninh chính trị, trật tự an toàn xã hội.',
      'Pháp luật còn là <code>phương tiện bảo vệ quyền và lợi ích hợp pháp</code> của công dân, bảo đảm công bằng xã hội.',
      '⚠️ Pháp luật áp dụng bình đẳng với mọi người, không riêng cán bộ, không phân biệt giàu nghèo.',
    ], ['Đúng — pháp luật là phương tiện quản lý nhà nước, bảo vệ quyền công dân.', 'Sai — pháp luật áp dụng cho mọi người, không riêng cán bộ.', 'Sai — vai trò chính là quản lý và bảo vệ, không phải trừng phạt.', 'Sai — pháp luật bảo đảm bình đẳng, không phân biệt giàu nghèo.']),
    Q('Sống và làm việc theo Hiến pháp, pháp luật là?', ['Chỉ người lớn', 'Chỉ cán bộ', 'Trách nhiệm của mọi công dân', 'Tự nguyện không bắt buộc'], 2, 'Mọi công dân có nghĩa vụ sống và làm việc theo Hiến pháp và pháp luật.', [
      '<b>Sống và làm việc theo Hiến pháp, pháp luật</b> là <i>nghĩa vụ và trách nhiệm</i> của mọi công dân, không phân biệt tuổi tác, nghề nghiệp.',
      'Đây là điều kiện để xây dựng <code>Nhà nước pháp quyền</code>, giữ gìn trật tự, kỷ cương xã hội.',
      '💡 Mỗi người tự giác tuân thủ pháp luật góp phần làm cho xã hội văn minh, an toàn.',
    ], ['Sai — không chỉ người lớn mà mọi công dân đều có trách nhiệm.', 'Sai — không chỉ cán bộ mà tất cả công dân.', 'Đúng — sống và làm việc theo Hiến pháp, pháp luật là trách nhiệm của mọi công dân.', 'Sai — đây là nghĩa vụ bắt buộc, không phải tự nguyện.']),
    Q('Học sinh thực hiện pháp luật bằng cách?', ['Chấp hành nội quy, luật giao thông, không vi phạm', 'Tự do làm điều mình thích', 'Vi phạm khi không ai biết', 'Chỉ học không cần thực hành'], 0, 'HS thực hiện pháp luật qua việc chấp hành nội quy trường, luật GT, không vi phạm pháp luật.', [
      'Học sinh thực hiện pháp luật bằng những việc <b>cụ thể, hằng ngày</b>: chấp hành nội quy trường, thực hiện đúng luật giao thông, không vi phạm pháp luật.',
      'Đồng thời, HS cần <i>tìm hiểu, học tập pháp luật</i> và tuyên truyền cho người thân, bạn bè.',
      '⚠️ "Vi phạm khi không ai biết" là quan niệm sai — ý thức pháp luật phải xuất phát từ sự <code>tự giác</code>.',
    ], ['Đúng — HS chấp hành nội quy, luật giao thông, không vi phạm là thực hiện pháp luật.', 'Sai — tự do làm điều mình thích bất chấp luật là vi phạm.', 'Sai — \'không ai biết\' không làm cho việc vi phạm thành đúng.', 'Sai — học pháp luật phải đi đôi với thực hành trong đời sống.']),
  ]),

  M(14, 'Phòng chống tệ nạn xã hội', [
    Q('Tệ nạn xã hội là?', ['Hoạt động văn hoá', 'Hoạt động thể thao', 'Hành vi sai lệch chuẩn mực đạo đức, gây hậu quả xấu cho xã hội', 'Học tập'], 2, 'Tệ nạn XH = hành vi sai lệch chuẩn mực đạo đức, vi phạm pháp luật, gây hậu quả xấu.', [
      '<b>Tệ nạn xã hội</b> là <i>hiện tượng xã hội bao gồm những hành vi sai lệch chuẩn mực đạo đức, vi phạm pháp luật</i>, gây hậu quả xấu về mọi mặt đối với đời sống xã hội.',
      'Tệ nạn xã hội có tính chất <code>phổ biến, lan truyền</code>, ảnh hưởng tiêu cực đến nhiều người.',
      '⚠️ Hoạt động văn hoá, thể thao, học tập lành mạnh hoàn toàn ngược lại với tệ nạn.',
    ], ['Sai — hoạt động văn hoá lành mạnh không phải tệ nạn.', 'Sai — hoạt động thể thao là tích cực, không phải tệ nạn.', 'Đúng — tệ nạn xã hội là hành vi sai lệch chuẩn mực đạo đức, gây hậu quả xấu cho xã hội.', 'Sai — học tập là việc tốt, hoàn toàn ngược với tệ nạn.']),
    Q('Tệ nạn xã hội phổ biến gồm?', ['Học tập', 'Thể thao', 'Lao động', 'Cờ bạc, ma tuý, mại dâm'], 3, '3 tệ nạn nguy hiểm nhất: cờ bạc, ma tuý, mại dâm.', [
      'Trong các tệ nạn xã hội, <b>cờ bạc, ma tuý, mại dâm</b> là ba tệ nạn <i>nguy hiểm nhất</i>.',
      'Chúng có mối <code>quan hệ chặt chẽ</code> với nhau: ma tuý, mại dâm trực tiếp dẫn đến lây truyền HIV/AIDS, đe doạ tính mạng và tương lai con người.',
      '💡 Ba tệ nạn này là "bạn đồng hành" của nhau, một khi vướng vào rất khó thoát ra.',
    ], ['Sai — học tập là hoạt động tích cực.', 'Sai — thể thao là hoạt động lành mạnh.', 'Sai — lao động là việc tốt, đáng quý.', 'Đúng — cờ bạc, ma tuý, mại dâm là ba tệ nạn xã hội nguy hiểm nhất.']),
    Q('Tác hại của tệ nạn xã hội?', ['Không có hại', 'Chỉ ảnh hưởng cá nhân', 'Huỷ hoại sức khoẻ, đạo đức, kinh tế cá nhân và XH', 'Có lợi cho xã hội'], 2, 'Tệ nạn XH huỷ hoại sức khoẻ, đạo đức, kinh tế, gia đình và trật tự xã hội.', [
      '<b>Tác hại của tệ nạn xã hội</b>:',
      '<ul><li>Với cá nhân: <i>huỷ hoại sức khoẻ, suy thoái đạo đức, nhân cách</i>, mất tương lai.</li><li>Với gia đình: kinh tế cạn kiệt, <code>tan vỡ hạnh phúc</code>.</li><li>Với xã hội: suy giảm kinh tế, mất trật tự an ninh, lây lan bệnh tật.</li></ul>',
    ], ['Sai — tệ nạn xã hội gây rất nhiều tác hại.', 'Sai — tệ nạn ảnh hưởng cả gia đình và xã hội, không chỉ cá nhân.', 'Đúng — tệ nạn huỷ hoại sức khoẻ, đạo đức, kinh tế của cá nhân và xã hội.', 'Sai — tệ nạn gây hại, không có lợi cho xã hội.']),
    Q('HS cần làm gì để phòng tránh?', ['Bỏ học theo bạn xấu', 'Chơi cờ bạc giải trí', 'Không chơi với bạn xấu, không thử ma tuý, không cờ bạc', 'Tò mò thử cho biết'], 2, 'Cách phòng tránh: chọn bạn tốt, không tò mò thử, tham gia hoạt động lành mạnh.', [
      '<b>Cách phòng tránh tệ nạn xã hội</b> cho học sinh:',
      '<ul><li>Sống <i>giản dị, lành mạnh</i>, chăm chỉ học tập.</li><li><code>Không tò mò, thử</code> dù chỉ một lần với ma tuý, cờ bạc.</li><li>Chọn bạn tốt, tránh xa bạn xấu và các nhóm rủ rê.</li><li>Tuân thủ pháp luật, tham gia hoạt động lành mạnh.</li></ul>',
      '⚠️ "Thử cho biết" là con đường ngắn nhất dẫn đến nghiện ngập.',
    ], ['Sai — bỏ học theo bạn xấu dễ sa vào tệ nạn.', 'Sai — cờ bạc dù để \'giải trí\' cũng là tệ nạn.', 'Đúng — không chơi với bạn xấu, không thử ma tuý, không cờ bạc là cách phòng tránh.', 'Sai — tò mò thử là con đường dẫn đến nghiện ngập.']),
    Q('Khi phát hiện bạn vướng tệ nạn, nên?', ['Mặc kệ', 'Cô lập bạn', 'Cùng tham gia', 'Báo gia đình, thầy cô để giúp bạn'], 3, 'Báo người lớn để có biện pháp giúp bạn thoát khỏi tệ nạn kịp thời.', [
      'Khi phát hiện bạn vướng tệ nạn, cách ứng xử đúng là <b>báo cho gia đình, thầy cô, người lớn</b> để có biện pháp giúp bạn <i>kịp thời</i>.',
      '⚠️ <code>Mặc kệ</code> là bỏ rơi bạn; <code>cô lập</code> làm bạn lún sâu hơn; <code>cùng tham gia</code> là tự đưa mình vào tệ nạn.',
      '💡 Giúp bạn thoát khỏi tệ nạn là việc làm có trách nhiệm và đầy tình bạn.',
    ], ['Sai — mặc kệ là bỏ rơi bạn lúc khó khăn.', 'Sai — cô lập làm bạn càng lún sâu vào tệ nạn.', 'Sai — cùng tham gia là tự đưa mình vào tệ nạn.', 'Đúng — báo gia đình, thầy cô để có biện pháp giúp bạn thoát khỏi tệ nạn kịp thời.']),
  ]),

  M(15, 'Phòng chống nhiễm HIV/AIDS', [
    Q('HIV/AIDS lây qua đường?', ['Hắt hơi', 'Ăn chung', 'Máu, tình dục không an toàn, mẹ truyền con', 'Bắt tay'], 2, 'HIV chỉ lây qua máu, quan hệ tình dục không an toàn và mẹ sang con.', [
      '<b>HIV</b> là tên một loại vi rút gây suy giảm miễn dịch ở người. <b>AIDS</b> là giai đoạn cuối của quá trình nhiễm HIV.',
      'HIV lây qua <b>3 con đường</b>: <code>đường máu</code> (dùng chung kim tiêm, truyền máu nhiễm), <code>đường tình dục không an toàn</code>, và <code>từ mẹ sang con</code> khi mang thai, sinh nở, cho con bú.',
      '⚠️ HIV KHÔNG lây qua tiếp xúc thông thường như bắt tay, hắt hơi, ăn chung.',
    ], ['Sai — hắt hơi không lây HIV.', 'Sai — ăn chung không làm lây HIV.', 'Đúng — HIV lây qua máu, quan hệ tình dục không an toàn và mẹ truyền sang con.', 'Sai — bắt tay là tiếp xúc thông thường, không lây HIV.']),
    Q('HIV/AIDS KHÔNG lây qua?', ['Truyền máu nhiễm', 'Quan hệ TD không an toàn', 'Dùng chung kim tiêm', 'Bắt tay, ôm, ăn uống chung'], 3, 'HIV không lây qua tiếp xúc thông thường: bắt tay, ôm, ăn chung, hắt hơi.', [
      'HIV <b>KHÔNG lây qua tiếp xúc thông thường</b> trong sinh hoạt hằng ngày: <i>bắt tay, ôm hôn xã giao, ăn uống chung, dùng chung nhà vệ sinh, muỗi đốt, ho, hắt hơi</i>.',
      '💡 Hiểu đúng điều này giúp ta <code>không kỳ thị, xa lánh</code> người nhiễm HIV.',
      '⚠️ Truyền máu nhiễm, quan hệ không an toàn, dùng chung kim tiêm mới là các đường lây.',
    ], ['Sai — truyền máu nhiễm là một đường lây HIV.', 'Sai — quan hệ tình dục không an toàn làm lây HIV.', 'Sai — dùng chung kim tiêm là đường lây HIV phổ biến.', 'Đúng — HIV không lây qua bắt tay, ôm, ăn uống chung.']),
    Q('Phòng tránh HIV/AIDS?', ['Chỉ ăn chay', 'Tránh xa người nhiễm hoàn toàn', 'Không dùng chung kim tiêm, sống lành mạnh', 'Không cần phòng'], 2, 'Không dùng chung kim tiêm, sống lành mạnh, tình dục an toàn là biện pháp chính.', [
      '<b>Biện pháp phòng tránh HIV/AIDS</b>:',
      '<ul><li>Sống <i>lành mạnh</i>, tránh xa ma tuý, mại dâm.</li><li><code>Không dùng chung kim tiêm</code>, dụng cụ xuyên chích da.</li><li>Quan hệ tình dục an toàn; tránh tiếp xúc trực tiếp với máu người khác.</li></ul>',
      '⚠️ Không cần "tránh xa người nhiễm hoàn toàn" vì tiếp xúc thông thường không lây.',
    ], ['Sai — ăn chay không liên quan đến phòng tránh HIV.', 'Sai — không cần tránh xa người nhiễm vì tiếp xúc thông thường không lây.', 'Đúng — không dùng chung kim tiêm, sống lành mạnh là biện pháp phòng tránh chính.', 'Sai — HIV/AIDS nguy hiểm, cần chủ động phòng tránh.']),
    Q('Thái độ đúng với người nhiễm HIV?', ['Cô lập', 'Thông cảm, không kỳ thị, giúp đỡ', 'Chế giễu', 'Xa lánh'], 1, 'Người nhiễm HIV không có lỗi — cần thông cảm, không kỳ thị, giúp đỡ họ.', [
      'Người nhiễm HIV vẫn là <b>thành viên của cộng đồng</b>, có quyền được sống, học tập, làm việc và không bị phân biệt đối xử.',
      'Thái độ đúng là <i>thông cảm, chia sẻ, không kỳ thị, giúp đỡ</i> để họ có nghị lực sống và phòng tránh lây cho người khác.',
      '⚠️ <code>Cô lập, chế giễu, xa lánh</code> là hành vi kỳ thị, vừa vô nhân đạo vừa vi phạm pháp luật.',
    ], ['Sai — cô lập người nhiễm là kỳ thị, gây tổn thương.', 'Đúng — cần thông cảm, không kỳ thị, giúp đỡ người nhiễm HIV.', 'Sai — chế giễu là hành vi vô nhân đạo.', 'Sai — xa lánh người nhiễm là thái độ kỳ thị.']),
    Q('Pháp luật VN quy định?', ['Chỉ ngành y tế lo', 'Không có quy định', 'Phòng chống HIV là trách nhiệm của mọi người', 'Người nhiễm phải cách ly'], 2, 'Luật Phòng chống HIV/AIDS (2006) quy định mọi người có trách nhiệm phòng chống.', [
      'Việt Nam có <b>Luật Phòng, chống nhiễm vi rút gây ra hội chứng suy giảm miễn dịch mắc phải ở người (HIV/AIDS) năm 2006</b>.',
      'Luật quy định phòng chống HIV/AIDS là <i>trách nhiệm của mọi cơ quan, tổ chức, cá nhân</i>; đồng thời <code>nghiêm cấm mọi hành vi kỳ thị, phân biệt đối xử</code> với người nhiễm.',
      '⚠️ Pháp luật KHÔNG buộc người nhiễm cách ly — đây là quan niệm sai lầm.',
    ], ['Sai — phòng chống HIV không chỉ là việc của ngành y tế.', 'Sai — VN có Luật Phòng chống HIV/AIDS năm 2006.', 'Đúng — pháp luật quy định phòng chống HIV là trách nhiệm của mọi người.', 'Sai — pháp luật cấm kỳ thị, không buộc người nhiễm cách ly.']),
  ]),

  M(16, 'Phòng ngừa tai nạn vũ khí, cháy nổ và các chất độc hại', [
    Q('Vũ khí, vật liệu nổ thuộc loại?', ['Không có quy định', 'Đồ chơi', 'Hàng tự do mua bán', 'Hàng cấm hoặc hạn chế lưu hành'], 3, 'Vũ khí, vật liệu nổ là hàng đặc biệt — bị cấm hoặc hạn chế nghiêm ngặt.', [
      '<b>Vũ khí, vật liệu nổ và các chất độc hại</b> là những thứ <i>cực kỳ nguy hiểm</i>, có thể gây tổn thất lớn về người và tài sản.',
      'Pháp luật xếp chúng vào loại <code>hàng cấm hoặc hạn chế lưu hành</code>, quản lý nghiêm ngặt qua Luật Quản lý, sử dụng vũ khí, vật liệu nổ và công cụ hỗ trợ.',
      '⚠️ Đây không phải đồ chơi, không phải hàng tự do mua bán.',
    ], ['Sai — vũ khí, vật liệu nổ được pháp luật quản lý rất chặt.', 'Sai — vũ khí, vật liệu nổ không phải đồ chơi, cực kỳ nguy hiểm.', 'Sai — đây không phải hàng tự do mua bán.', 'Đúng — vũ khí, vật liệu nổ là hàng cấm hoặc hạn chế lưu hành nghiêm ngặt.']),
    Q('Hành vi nào bị cấm?', ['Tránh xa khu vực nguy hiểm', 'Báo công an', 'Tự chế pháo nổ, mua bán vũ khí trái phép', 'Khai báo pháo lậu'], 2, 'Tự chế pháo, tàng trữ vũ khí trái phép là hành vi bị pháp luật nghiêm cấm.', [
      '<b>Những hành vi bị nghiêm cấm</b>: <i>chế tạo, tàng trữ, vận chuyển, mua bán, sử dụng trái phép</i> vũ khí, vật liệu nổ, chất cháy, chất độc hại; tự chế pháo nổ.',
      '⚠️ Tự chế pháo là nguyên nhân nhiều vụ tai nạn thương tâm dịp Tết.',
      '💡 Tránh xa khu vực nguy hiểm, báo công an, khai báo pháo lậu là những hành vi <code>đúng đắn, được khuyến khích</code>.',
    ], ['Sai — tránh xa khu vực nguy hiểm là hành vi an toàn, đúng.', 'Sai — báo công an là việc làm đúng, được khuyến khích.', 'Đúng — tự chế pháo nổ, mua bán vũ khí trái phép bị pháp luật nghiêm cấm.', 'Sai — khai báo pháo lậu là hành vi tích cực, đáng khen.']),
    Q('Chất độc hại trong nhà gồm?', ['Thuốc trừ sâu, axit, gas', 'Đường, muối', 'Gạo, mì', 'Quần áo'], 0, 'Thuốc trừ sâu, axit, gas… là chất độc hại, cần bảo quản cẩn thận.', [
      '<b>Chất độc hại</b> thường có trong nhà: <i>thuốc trừ sâu, thuốc diệt chuột, axit, hoá chất tẩy rửa mạnh, khí gas, thuỷ ngân</i>…',
      'Cần <code>bảo quản cẩn thận</code>, để xa tầm tay trẻ em, có nhãn rõ ràng, không đựng vào chai lọ thực phẩm.',
      '💡 Đường, muối, gạo, mì, quần áo là vật dụng sinh hoạt thông thường, không độc hại.',
    ], ['Đúng — thuốc trừ sâu, axit, gas là chất độc hại, cần bảo quản cẩn thận.', 'Sai — đường, muối là gia vị thông thường, không độc hại.', 'Sai — gạo, mì là thực phẩm, không phải chất độc hại.', 'Sai — quần áo không phải chất độc hại.']),
    Q('Phòng cháy ở nhà cần?', ['Tắt bếp ga sau khi nấu, không để vật cháy gần lửa', 'Đốt rác trong nhà', 'Nghịch lửa', 'Để bếp ga mở'], 0, 'Tắt bếp khi không dùng, không để vật dễ cháy gần lửa là biện pháp phòng cháy cơ bản.', [
      '<b>Biện pháp phòng cháy tại nhà</b>:',
      '<ul><li><code>Tắt bếp ga, thiết bị điện</code> sau khi sử dụng.</li><li>Không để vật dễ cháy (giấy, vải, xăng dầu) gần nguồn lửa.</li><li>Kiểm tra hệ thống điện, gas định kỳ; trang bị bình chữa cháy.</li></ul>',
      '⚠️ Đốt rác trong nhà, nghịch lửa, để bếp ga mở đều <i>rất dễ gây hoả hoạn</i>.',
    ], ['Đúng — tắt bếp sau khi nấu, không để vật cháy gần lửa là phòng cháy cơ bản.', 'Sai — đốt rác trong nhà rất dễ gây cháy.', 'Sai — nghịch lửa là hành vi nguy hiểm, dễ gây hoả hoạn.', 'Sai — để bếp ga mở dễ gây rò rỉ và cháy nổ.']),
    Q('Khi phát hiện cháy, gọi?', ['113', '115', '112', '114'], 3, '114 là số điện thoại cứu hoả ở Việt Nam.', [
      'Cần nhớ các <b>số điện thoại khẩn cấp</b> tại Việt Nam:',
      '<ul><li><code>114</code> — báo cháy, cứu hoả, cứu nạn cứu hộ.</li><li><code>113</code> — cảnh sát phản ứng nhanh.</li><li><code>115</code> — cấp cứu y tế.</li><li><code>111</code> — tổng đài bảo vệ trẻ em.</li></ul>',
      '💡 Khi phát hiện cháy: bình tĩnh gọi <b>114</b>, báo người xung quanh và thoát nạn an toàn.',
    ], ['Sai — 113 là số gọi cảnh sát phản ứng nhanh.', 'Sai — 115 là số gọi cấp cứu y tế.', 'Sai — 112 là số yêu cầu cứu nạn, cứu hộ chung.', 'Đúng — 114 là số điện thoại báo cháy, cứu hoả ở Việt Nam.']),
  ]),

  M(17, 'Quyền và nghĩa vụ học tập', [
    Q('Quyền học tập của công dân?', ['Chỉ trẻ em', 'Chỉ nam giới', 'Chỉ con nhà giàu', 'Mọi công dân có quyền học không hạn chế, học suốt đời'], 3, 'Hiến pháp quy định mọi công dân có quyền học tập không hạn chế.', [
      '<b>Quyền học tập</b> là một trong những quyền cơ bản của công dân được Hiến pháp ghi nhận.',
      'Mọi công dân có quyền <i>học không hạn chế</i>: học mọi cấp, mọi ngành nghề, học bằng nhiều hình thức và <code>học suốt đời</code>.',
      '⚠️ Quyền học tập <b>không phân biệt</b> giới tính, dân tộc, tôn giáo, giàu nghèo, độ tuổi.',
    ], ['Sai — không chỉ trẻ em, mọi công dân đều có quyền học.', 'Sai — cả nam và nữ đều có quyền học tập bình đẳng.', 'Sai — quyền học tập không phân biệt giàu nghèo.', 'Đúng — mọi công dân có quyền học không hạn chế, học suốt đời.']),
    Q('Nghĩa vụ học tập của trẻ em VN?', ['Không có nghĩa vụ', 'Chỉ học khi muốn', 'Hoàn thành GD phổ cập từ tiểu học đến THCS', 'Tự do bỏ học'], 2, 'Trẻ em từ 6–14 tuổi có nghĩa vụ hoàn thành GD phổ cập (tiểu học và THCS).', [
      'Học tập không chỉ là quyền mà còn là <b>nghĩa vụ</b>. Trẻ em trong độ tuổi quy định có nghĩa vụ <i>hoàn thành giáo dục phổ cập</i> — bậc tiểu học và trung học cơ sở (THCS).',
      'Đây là quy định nhằm bảo đảm <code>mặt bằng dân trí</code> tối thiểu cho mọi công dân.',
      '⚠️ Bỏ học là vi phạm nghĩa vụ học tập; gia đình cũng có trách nhiệm cho con đi học.',
    ], ['Sai — trẻ em có nghĩa vụ hoàn thành giáo dục phổ cập.', 'Sai — học tập là nghĩa vụ, không phải chỉ học khi thích.', 'Đúng — trẻ em có nghĩa vụ hoàn thành giáo dục phổ cập từ tiểu học đến THCS.', 'Sai — bỏ học là vi phạm nghĩa vụ học tập.']),
    Q('Vai trò của học tập?', ['Không có vai trò', 'Mất thời gian', 'Để khoe khoang', 'Trang bị kiến thức, kỹ năng để phát triển bản thân và xã hội'], 3, 'Học tập giúp con người có tri thức, kỹ năng để sống tốt và đóng góp cho xã hội.', [
      '<b>Vai trò của học tập</b>: giúp con người <i>có kiến thức, hiểu biết, phát triển toàn diện</i>, trở thành người có ích.',
      'Học tập là chìa khoá để mỗi người <code>phát triển bản thân</code> và đóng góp xây dựng đất nước.',
      '💡 "Học để biết, học để làm, học để chung sống, học để khẳng định mình" (UNESCO).',
    ], ['Sai — học tập có vai trò vô cùng quan trọng.', 'Sai — học tập là đầu tư cho tương lai, không phí thời gian.', 'Sai — học tập là để phát triển, không phải để khoe khoang.', 'Đúng — học tập trang bị kiến thức, kỹ năng để phát triển bản thân và xã hội.']),
    Q('Nhà nước có trách nhiệm?', ['Chỉ lo bậc tiểu học', 'Không có trách nhiệm', 'Chỉ lo cho con cán bộ', 'Đảm bảo điều kiện học tập cho mọi công dân'], 3, 'NN xây dựng trường, cấp học bổng, miễn giảm học phí… để mọi công dân được học.', [
      '<b>Trách nhiệm của Nhà nước</b> với giáo dục: <i>thực hiện công bằng xã hội trong giáo dục</i>, tạo điều kiện để mọi công dân được học hành.',
      'Cụ thể: <code>xây dựng trường lớp, miễn giảm học phí, cấp học bổng, hỗ trợ vùng khó khăn, người nghèo, người khuyết tật</code>.',
      '⚠️ Nhà nước lo cho mọi bậc học, mọi đối tượng, không phân biệt.',
    ], ['Sai — Nhà nước lo cho mọi bậc học, không chỉ tiểu học.', 'Sai — Nhà nước có trách nhiệm lớn với giáo dục.', 'Sai — Nhà nước đảm bảo học tập cho mọi công dân, không phân biệt.', 'Đúng — Nhà nước đảm bảo điều kiện học tập cho mọi công dân.']),
    Q('HS thực hiện quyền học tập tốt nhất là?', ['Chỉ học khi bị ép', 'Lười biếng', 'Chăm chỉ, sáng tạo, học suốt đời', 'Học để đối phó'], 2, 'Chăm chỉ, sáng tạo và có ý thức học suốt đời là cách thực hiện tốt quyền học tập.', [
      'Để thực hiện tốt quyền và nghĩa vụ học tập, học sinh cần: <i>chăm chỉ, tự giác, sáng tạo</i> trong học tập; có <code>phương pháp học tốt</code>; nuôi dưỡng tinh thần học suốt đời.',
      '⚠️ Học khi bị ép, lười biếng, học đối phó đều khiến việc học <b>không hiệu quả</b>, lãng phí cơ hội.',
    ], ['Sai — học khi bị ép không phải là thực hiện tốt quyền học tập.', 'Sai — lười biếng là lãng phí quyền học tập.', 'Đúng — chăm chỉ, sáng tạo, học suốt đời là cách thực hiện tốt quyền học tập.', 'Sai — học đối phó không đem lại kiến thức thực sự.']),
  ]),

  M(18, 'Ôn tập học kì I', [
    Q('Liêm khiết là?', ['Sống tiết kiệm', 'Sống giàu', 'Sống trong sạch, không hám lợi', 'Sống cô độc'], 2, 'Định nghĩa liêm khiết.', [
      'Ôn lại: <b>Liêm khiết</b> là sống <i>trong sạch, không hám danh hám lợi</i>, không nhỏ nhen ích kỷ.',
      '💡 Câu tục ngữ tiêu biểu: <code>"Đói cho sạch, rách cho thơm"</code>.',
    ], ['Sai — tiết kiệm là đức tính khác.', 'Sai — liêm khiết không liên quan giàu nghèo.', 'Đúng — liêm khiết là sống trong sạch, không hám lợi.', 'Sai — sống cô độc không phải là liêm khiết.']),
    Q('Pháp luật do ai ban hành?', ['Tổ chức XH', 'Nhà nước', 'Doanh nghiệp', 'Cá nhân'], 1, 'Pháp luật là sản phẩm của Nhà nước.', [
      'Ôn lại: <b>Pháp luật do Nhà nước ban hành</b> và bảo đảm thực hiện bằng quyền lực nhà nước.',
      'Pháp luật có 3 đặc điểm: <code>tính quy phạm phổ biến, tính bắt buộc chung, tính xác định chặt chẽ</code> về hình thức.',
    ], ['Sai — tổ chức xã hội chỉ ban hành điều lệ nội bộ.', 'Đúng — pháp luật do Nhà nước ban hành.', 'Sai — doanh nghiệp không ban hành pháp luật.', 'Sai — cá nhân không có quyền ban hành pháp luật.']),
    Q('Tình bạn lành mạnh dựa trên?', ['Bình đẳng, chân thành', 'Quan hệ giữa người cho và người nhận', 'Lợi dụng', 'Bao che'], 0, 'Nguyên tắc tình bạn lành mạnh.', [
      'Ôn lại: <b>Tình bạn trong sáng, lành mạnh</b> dựa trên sự <i>bình đẳng, tôn trọng, chân thành, tin cậy</i> và biết chia sẻ.',
      '⚠️ Lợi dụng nhau, bao che cái sai là biểu hiện của tình bạn <code>không lành mạnh</code>.',
    ], ['Đúng — tình bạn lành mạnh dựa trên bình đẳng, chân thành.', 'Sai — tình bạn không phải quan hệ cho – nhận một chiều.', 'Sai — lợi dụng là tình bạn vụ lợi.', 'Sai — bao che cái sai là tình bạn không lành mạnh.']),
    Q('Tôn trọng lẽ phải là?', ['Công nhận, ủng hộ, làm theo điều đúng', 'Sợ hãi', 'Im lặng', 'Theo số đông'], 0, 'Định nghĩa tôn trọng lẽ phải.', [
      'Ôn lại: <b>Tôn trọng lẽ phải</b> là công nhận, ủng hộ, tuân theo và bảo vệ những điều <i>đúng đắn</i>.',
      '💡 Người tôn trọng lẽ phải <code>kiên định với cái đúng</code>, khác hẳn người "ba phải" gió chiều nào theo chiều ấy.',
    ], ['Đúng — tôn trọng lẽ phải là công nhận, ủng hộ, làm theo điều đúng.', 'Sai — sợ hãi không phải là tôn trọng lẽ phải.', 'Sai — im lặng trước cái sai là dung túng.', 'Sai — chạy theo số đông không phải tôn trọng lẽ phải.']),
    Q('Hiến pháp đầu tiên của VN năm?', ['1959', '1945', '1946', '1980'], 2, 'Hiến pháp 1946.', [
      'Ôn lại: Việt Nam có <b>5 bản Hiến pháp</b> (1946, 1959, 1980, 1992, 2013).',
      'Bản <code>Hiến pháp 1946</code> là đầu tiên (sau Cách mạng tháng Tám); <code>Hiến pháp 2013</code> là bản đang có hiệu lực.',
    ], ['Sai — 1959 là bản Hiến pháp thứ hai.', 'Sai — 1945 là năm thành lập nước, chưa có Hiến pháp.', 'Đúng — Hiến pháp đầu tiên của VN ban hành năm 1946.', 'Sai — 1980 là bản Hiến pháp thứ ba.']),
  ]),

  // ──────────────── HK2 ────────────────
  M(19, 'Quyền tự do tín ngưỡng, tôn giáo', [
    Q('Tín ngưỡng là?', ['Phong tục', 'Niềm tin vào điều thiêng liêng', 'Mê tín', 'Sự sợ hãi'], 1, 'Tín ngưỡng = niềm tin của con người vào điều thiêng liêng, siêu nhiên.', [
      '<b>Tín ngưỡng</b> là <i>niềm tin của con người vào một điều gì đó thần bí, hư ảo, vô hình</i> như thần linh, thượng đế, tổ tiên.',
      'Ví dụ: thờ cúng tổ tiên, thờ Thành hoàng làng, tín ngưỡng thờ Mẫu… là những <code>tín ngưỡng truyền thống</code> lành mạnh của người Việt.',
      '⚠️ Tín ngưỡng khác phong tục, khác mê tín và khác sự sợ hãi.',
    ], ['Sai — phong tục là tập quán, khác với tín ngưỡng.', 'Đúng — tín ngưỡng là niềm tin của con người vào điều thiêng liêng, siêu nhiên.', 'Sai — mê tín là niềm tin mù quáng, khác với tín ngưỡng lành mạnh.', 'Sai — tín ngưỡng là niềm tin, không phải sự sợ hãi.']),
    Q('Tôn giáo là?', ['Mê tín', 'Tập quán', 'Hình thức tín ngưỡng có hệ thống tổ chức, giáo lý, nghi lễ', 'Phong tục'], 2, 'Tôn giáo có hệ thống giáo lý, tổ chức, nghi lễ (Phật giáo, Công giáo, Tin Lành…).', [
      '<b>Tôn giáo</b> là một <i>hình thức tín ngưỡng có hệ thống tổ chức</i>, với những <code>quan niệm, giáo lý, nghi lễ</code> thể hiện sự sùng bái.',
      'Ở Việt Nam có nhiều tôn giáo: <i>Phật giáo, Công giáo, Tin Lành, Cao Đài, Hoà Hảo, Hồi giáo</i>…',
      '⚠️ Tôn giáo chân chính khác hẳn mê tín dị đoan, tập quán hay phong tục.',
    ], ['Sai — mê tín dị đoan khác với tôn giáo chân chính.', 'Sai — tập quán là thói quen, không phải tôn giáo.', 'Đúng — tôn giáo là hình thức tín ngưỡng có hệ thống tổ chức, giáo lý, nghi lễ.', 'Sai — phong tục không phải là tôn giáo.']),
    Q('Mê tín dị đoan là?', ['Tín ngưỡng truyền thống', 'Tôn giáo chân chính', 'Khoa học', 'Tin nhảm, không có cơ sở, gây hậu quả xấu'], 3, 'Mê tín dị đoan là niềm tin mù quáng, vô căn cứ, gây hậu quả tiêu cực.', [
      '<b>Mê tín dị đoan</b> là <i>tin vào những điều mơ hồ, nhảm nhí, không phù hợp với lẽ tự nhiên</i> (bói toán, chữa bệnh bằng phù phép, xem ngày giờ một cách mù quáng…).',
      'Mê tín dị đoan dẫn đến <code>hậu quả xấu</code>: tốn kém tiền của, thời gian, thậm chí nguy hại tính mạng.',
      '⚠️ Cần phân biệt rõ với tín ngưỡng, tôn giáo chân chính được pháp luật bảo hộ — mê tín dị đoan bị bài trừ.',
    ], ['Sai — tín ngưỡng truyền thống lành mạnh khác mê tín dị đoan.', 'Sai — tôn giáo chân chính không phải mê tín.', 'Sai — mê tín ngược với khoa học.', 'Đúng — mê tín dị đoan là tin nhảm, không có cơ sở, gây hậu quả xấu.']),
    Q('Công dân có quyền?', ['Phải theo tôn giáo của bố mẹ', 'Theo hoặc không theo tôn giáo nào', 'Chỉ theo một tôn giáo', 'Bị ép buộc theo tôn giáo'], 1, 'Hiến pháp: tự do tín ngưỡng, tôn giáo, theo hoặc không theo bất kì tôn giáo nào.', [
      '<b>Quyền tự do tín ngưỡng, tôn giáo</b>: công dân có quyền <i>theo hoặc không theo</i> một tín ngưỡng, tôn giáo nào; người đã theo có quyền thôi không theo hoặc chuyển sang tôn giáo khác.',
      'Mọi tôn giáo đều <code>bình đẳng trước pháp luật</code>.',
      '⚠️ Không ai được ép buộc người khác theo hoặc bỏ một tôn giáo.',
    ], ['Sai — không ai bị bắt theo tôn giáo của bố mẹ.', 'Đúng — công dân có quyền theo hoặc không theo bất kì tôn giáo nào.', 'Sai — công dân không bị giới hạn phải theo một tôn giáo.', 'Sai — ép buộc theo tôn giáo là vi phạm quyền tự do tín ngưỡng.']),
    Q('Hành vi nào bị cấm?', ['Cầu nguyện', 'Đi lễ chùa', 'Lợi dụng tôn giáo để vi phạm pháp luật', 'Đi lễ nhà thờ'], 2, 'Lợi dụng tôn giáo, tín ngưỡng để vi phạm pháp luật, gây mất trật tự bị nghiêm cấm.', [
      'Pháp luật <b>nghiêm cấm lợi dụng tín ngưỡng, tôn giáo</b> để <i>vi phạm pháp luật, gây mất trật tự an toàn xã hội, chia rẽ khối đại đoàn kết dân tộc, hành nghề mê tín</i>.',
      '💡 Cầu nguyện, đi lễ chùa, đi lễ nhà thờ là các <code>sinh hoạt tôn giáo hợp pháp</code>, được Nhà nước tôn trọng và bảo hộ.',
    ], ['Sai — cầu nguyện là hoạt động tôn giáo hợp pháp.', 'Sai — đi lễ chùa là thực hành tín ngưỡng được phép.', 'Đúng — lợi dụng tôn giáo để vi phạm pháp luật bị nghiêm cấm.', 'Sai — đi lễ nhà thờ là sinh hoạt tôn giáo hợp pháp.']),
  ]),

  M(20, 'Nhà nước Cộng hoà Xã hội Chủ nghĩa Việt Nam', [
    Q('Nhà nước CHXHCN Việt Nam thành lập ngày?', ['7/5/1954', '2/9/1945', '30/4/1975', '19/8/1945'], 1, 'Bác Hồ đọc Tuyên ngôn độc lập ngày 2/9/1945, khai sinh nước VN dân chủ cộng hoà.', [
      'Ngày <b>2/9/1945</b>, tại Quảng trường Ba Đình, <i>Chủ tịch Hồ Chí Minh đọc Tuyên ngôn Độc lập</i>, khai sinh nước Việt Nam Dân chủ Cộng hoà (nay là nước CHXHCN Việt Nam).',
      '💡 Phân biệt các mốc lịch sử: <code>19/8/1945</code> (Cách mạng tháng Tám), <code>7/5/1954</code> (chiến thắng Điện Biên Phủ), <code>30/4/1975</code> (giải phóng miền Nam, thống nhất đất nước).',
    ], ['Sai — 7/5/1954 là chiến thắng Điện Biên Phủ.', 'Đúng — 2/9/1945 Bác Hồ đọc Tuyên ngôn độc lập, khai sinh nước Việt Nam.', 'Sai — 30/4/1975 là ngày giải phóng miền Nam, thống nhất đất nước.', 'Sai — 19/8/1945 là ngày Cách mạng tháng Tám thành công.']),
    Q('Bản chất nhà nước ta?', ['Tư sản', 'Nhà nước pháp quyền XHCN của dân, do dân, vì dân', 'Thuộc địa', 'Phong kiến'], 1, 'Nhà nước pháp quyền XHCN của Nhân dân, do Nhân dân, vì Nhân dân.', [
      '<b>Bản chất Nhà nước ta</b>: là <i>Nhà nước pháp quyền xã hội chủ nghĩa của Nhân dân, do Nhân dân, vì Nhân dân</i>.',
      'Tất cả quyền lực nhà nước thuộc về <code>Nhân dân</code>, mà nền tảng là liên minh giữa giai cấp công nhân với nông dân và đội ngũ trí thức.',
      '⚠️ Nhà nước ta không phải nhà nước tư sản, phong kiến hay thuộc địa.',
    ], ['Sai — nhà nước ta không phải nhà nước tư sản.', 'Đúng — nhà nước pháp quyền XHCN của Nhân dân, do Nhân dân, vì Nhân dân.', 'Sai — VN đã giành độc lập, không còn là thuộc địa.', 'Sai — chế độ phong kiến đã bị xoá bỏ.']),
    Q('Bộ máy nhà nước gồm 4 cấp?', ['Chỉ 1 cấp', 'Chỉ TƯ và địa phương', 'TƯ, miền, vùng, xã', 'TƯ, tỉnh, huyện, xã'], 3, 'Bộ máy NN VN có 4 cấp: Trung ương, tỉnh, huyện, xã.', [
      '<b>Bộ máy Nhà nước</b> được phân chia thành <b>4 cấp</b>:',
      '<ul><li><code>Trung ương</code> (Quốc hội, Chính phủ…).</li><li><code>Cấp tỉnh</code> (tỉnh, thành phố trực thuộc TƯ).</li><li><code>Cấp huyện</code> (huyện, quận, thị xã).</li><li><code>Cấp xã</code> (xã, phường, thị trấn) — cấp cơ sở gần dân nhất.</li></ul>',
    ], ['Sai — bộ máy nhà nước có nhiều cấp, không chỉ một.', 'Sai — phân chia này chưa đầy đủ và chính xác.', 'Sai — không có cấp \'miền, vùng\' trong bộ máy nhà nước.', 'Đúng — bộ máy nhà nước có 4 cấp: Trung ương, tỉnh, huyện, xã.']),
    Q('Cơ quan quyền lực cao nhất?', ['Toà án', 'Chính phủ', 'Viện kiểm sát', 'Quốc hội'], 3, 'Quốc hội là cơ quan đại biểu cao nhất của Nhân dân, có quyền lập hiến lập pháp.', [
      '<b>Quốc hội</b> là <i>cơ quan đại biểu cao nhất của Nhân dân, cơ quan quyền lực nhà nước cao nhất</i> của nước CHXHCN Việt Nam.',
      'Quốc hội có quyền <code>lập hiến, lập pháp</code>, quyết định những vấn đề quan trọng của đất nước và giám sát tối cao.',
      '⚠️ Toà án (xét xử), Viện kiểm sát (công tố), Chính phủ (hành chính) đều có chức năng riêng, không phải cơ quan quyền lực cao nhất.',
    ], ['Sai — toà án là cơ quan xét xử.', 'Sai — Chính phủ là cơ quan hành chính cao nhất.', 'Sai — Viện kiểm sát thực hành quyền công tố và kiểm sát.', 'Đúng — Quốc hội là cơ quan quyền lực nhà nước cao nhất, có quyền lập hiến, lập pháp.']),
    Q('Cơ quan hành chính cao nhất?', ['Chính phủ', 'Toà án', 'Chủ tịch nước', 'Quốc hội'], 0, 'Chính phủ là cơ quan hành chính nhà nước cao nhất.', [
      '<b>Chính phủ</b> là <i>cơ quan hành chính nhà nước cao nhất</i>, cơ quan chấp hành của Quốc hội.',
      'Chính phủ <code>thống nhất quản lý</code> việc thực hiện các nhiệm vụ chính trị, kinh tế, văn hoá, xã hội, quốc phòng, an ninh và đối ngoại của Nhà nước.',
      '💡 Đứng đầu Chính phủ là Thủ tướng; Chủ tịch nước là nguyên thủ quốc gia (chức danh riêng).',
    ], ['Đúng — Chính phủ là cơ quan hành chính nhà nước cao nhất.', 'Sai — toà án là cơ quan xét xử.', 'Sai — Chủ tịch nước là nguyên thủ quốc gia.', 'Sai — Quốc hội là cơ quan quyền lực, không phải cơ quan hành chính.']),
  ]),

  M(21, 'Bộ máy Nhà nước cấp cơ sở (xã/phường/thị trấn)', [
    Q('Cấp cơ sở gồm?', ['Trung ương và các bộ ngành', 'Vùng kinh tế trọng điểm', 'Tỉnh, huyện', 'Xã, phường, thị trấn'], 3, 'Cấp cơ sở là cấp gần dân nhất, gồm xã, phường, thị trấn.', [
      '<b>Bộ máy nhà nước cấp cơ sở</b> gồm <code>xã, phường, thị trấn</code> — là cấp <i>thấp nhất và gần dân nhất</i> trong bộ máy nhà nước.',
      'Cấp cơ sở gồm hai cơ quan: <b>Hội đồng nhân dân (HĐND)</b> và <b>Uỷ ban nhân dân (UBND)</b> xã/phường/thị trấn.',
      '💡 Đây là nơi trực tiếp giải quyết các công việc hằng ngày của người dân.',
    ], ['Sai — trung ương và bộ ngành là cấp cao nhất, không phải cơ sở.', 'Sai — vùng kinh tế không phải cấp cơ sở.', 'Sai — tỉnh, huyện là cấp trên cấp cơ sở.', 'Đúng — cấp cơ sở gần dân nhất gồm xã, phường, thị trấn.']),
    Q('HĐND xã/phường do ai bầu?', ['Nhân dân địa phương', 'Quốc hội', 'Chính phủ', 'Chủ tịch UBND'], 0, 'HĐND do nhân dân địa phương bầu trực tiếp.', [
      '<b>Hội đồng nhân dân (HĐND)</b> cấp xã do <i>nhân dân địa phương bầu ra</i> trực tiếp.',
      'HĐND là <code>cơ quan quyền lực nhà nước ở địa phương</code>, đại diện cho ý chí, nguyện vọng của nhân dân và chịu trách nhiệm trước nhân dân.',
      '💡 HĐND bầu ra UBND — cơ quan chấp hành của mình.',
    ], ['Đúng — HĐND do nhân dân địa phương bầu trực tiếp.', 'Sai — Quốc hội không bầu HĐND cấp xã.', 'Sai — Chính phủ không bầu HĐND.', 'Sai — Chủ tịch UBND không có quyền bầu HĐND.']),
    Q('UBND xã/phường có nhiệm vụ?', ['Kiểm sát', 'Xét xử', 'Lập pháp', 'Quản lý hành chính, giải quyết công việc địa phương'], 3, 'UBND là cơ quan chấp hành của HĐND, quản lý hành chính địa phương.', [
      '<b>Uỷ ban nhân dân (UBND)</b> cấp xã là <i>cơ quan chấp hành của HĐND</i>, là cơ quan <code>hành chính nhà nước</code> ở địa phương.',
      'UBND <b>quản lý hành chính</b>, tổ chức thực hiện và giải quyết các công việc của địa phương (an ninh, kinh tế, văn hoá, xã hội…).',
      '⚠️ Xét xử là việc của toà án, kiểm sát là của Viện kiểm sát, lập pháp là của Quốc hội.',
    ], ['Sai — kiểm sát là nhiệm vụ của Viện kiểm sát.', 'Sai — xét xử là nhiệm vụ của toà án.', 'Sai — lập pháp là nhiệm vụ của Quốc hội.', 'Đúng — UBND quản lý hành chính, giải quyết công việc của địa phương.']),
    Q('Công dân làm khai sinh ở đâu?', ['Chính phủ', 'Quốc hội', 'UBND xã/phường', 'Toà án'], 2, 'Khai sinh, khai tử, kết hôn… đăng ký tại UBND xã/phường nơi cư trú.', [
      'Các thủ tục hành chính hộ tịch như <b>đăng ký khai sinh, khai tử, kết hôn</b>, xác nhận thường trú… được thực hiện tại <code>UBND xã/phường/thị trấn</code> nơi cư trú.',
      '💡 Hiểu rõ điều này giúp công dân biết "đến đâu, gặp ai" khi cần giải quyết công việc, tiết kiệm thời gian.',
    ], ['Sai — Chính phủ không trực tiếp làm khai sinh.', 'Sai — Quốc hội là cơ quan lập pháp, không làm khai sinh.', 'Đúng — khai sinh được đăng ký tại UBND xã/phường nơi cư trú.', 'Sai — toà án là cơ quan xét xử, không làm khai sinh.']),
    Q('Trách nhiệm công dân với chính quyền cơ sở?', ['Né tránh', 'Phản đối tất cả', 'Phớt lờ', 'Tôn trọng, chấp hành quy định, đóng góp xây dựng'], 3, 'Công dân cần tôn trọng, chấp hành và tham gia đóng góp ý kiến cho chính quyền địa phương.', [
      '<b>Trách nhiệm của công dân</b> với chính quyền cơ sở:',
      '<ul><li><i>Tôn trọng và bảo vệ</i> các cơ quan nhà nước.</li><li><code>Chấp hành nghiêm chỉnh</code> các quy định của pháp luật, của chính quyền địa phương.</li><li>Tích cực <i>đóng góp ý kiến, giám sát, xây dựng</i> chính quyền.</li></ul>',
      '⚠️ Né tránh, phớt lờ hay phản đối cực đoan đều là thái độ thiếu trách nhiệm công dân.',
    ], ['Sai — né tránh là thiếu trách nhiệm công dân.', 'Sai — phản đối tất cả một cách cực đoan là không đúng.', 'Sai — phớt lờ chính quyền là thiếu trách nhiệm.', 'Đúng — công dân cần tôn trọng, chấp hành quy định và đóng góp xây dựng.']),
  ]),

  M(22, 'Quyền và nghĩa vụ của công dân trong gia đình', [
    Q('Gia đình là?', ['Tế bào của xã hội, cái nôi nuôi dưỡng nhân cách', 'Một câu lạc bộ', 'Một nhóm bạn', 'Một tổ chức kinh tế'], 0, 'Gia đình = tế bào của xã hội, môi trường giáo dục đầu tiên.', [
      '<b>Gia đình</b> là <i>tập hợp những người gắn bó với nhau do hôn nhân, quan hệ huyết thống hoặc quan hệ nuôi dưỡng</i>.',
      'Gia đình được coi là <code>tế bào của xã hội</code>, là <i>cái nôi nuôi dưỡng con người</i>, môi trường giáo dục đầu tiên và quan trọng nhất hình thành nhân cách.',
      '💡 Gia đình hoà thuận, hạnh phúc thì xã hội mới ổn định, phát triển.',
    ], ['Đúng — gia đình là tế bào của xã hội, cái nôi nuôi dưỡng nhân cách.', 'Sai — gia đình không phải là một câu lạc bộ.', 'Sai — gia đình gắn bằng huyết thống, hôn nhân, khác nhóm bạn.', 'Sai — gia đình không phải là một tổ chức kinh tế thuần tuý.']),
    Q('Bổn phận của con cháu?', ['Yêu quý, kính trọng, hiếu thảo với ông bà cha mẹ', 'Lảng tránh', 'Chỉ vâng lời khi được cho quà', 'Phản kháng'], 0, 'Con cháu phải hiếu thảo, kính trọng, chăm sóc ông bà cha mẹ.', [
      '<b>Bổn phận của con, cháu</b>: <i>yêu quý, kính trọng, biết ơn, hiếu thảo</i> với ông bà, cha mẹ; chăm sóc, phụng dưỡng ông bà, cha mẹ.',
      'Con cháu <code>không được ngược đãi, xúc phạm</code> ông bà, cha mẹ.',
      '💡 Truyền thống dân tộc: "Công cha như núi Thái Sơn / Nghĩa mẹ như nước trong nguồn chảy ra".',
    ], ['Đúng — con cháu phải yêu quý, kính trọng, hiếu thảo với ông bà cha mẹ.', 'Sai — lảng tránh là thiếu hiếu thảo.', 'Sai — hiếu thảo không phải đổi lấy quà.', 'Sai — phản kháng, hỗn láo là trái với bổn phận con cháu.']),
    Q('Cha mẹ có nghĩa vụ?', ['Bóc lột con', 'Bỏ rơi con', 'Nuôi dưỡng, giáo dục con', 'Bạo hành con'], 2, 'Cha mẹ phải nuôi dưỡng, chăm sóc, giáo dục con cái.', [
      '<b>Nghĩa vụ và quyền của cha mẹ</b>: <i>thương yêu, nuôi dưỡng, chăm sóc, bảo vệ quyền và lợi ích hợp pháp, giáo dục con</i>; tôn trọng ý kiến của con.',
      'Cha mẹ <code>không được phân biệt đối xử</code>, ngược đãi, hành hạ, ép buộc con làm điều trái pháp luật.',
      '⚠️ Bóc lột, bỏ rơi, bạo hành con đều là hành vi vi phạm pháp luật.',
    ], ['Sai — bóc lột con là vi phạm pháp luật.', 'Sai — bỏ rơi con là vi phạm nghĩa vụ làm cha mẹ.', 'Đúng — cha mẹ có nghĩa vụ nuôi dưỡng, chăm sóc, giáo dục con.', 'Sai — bạo hành con bị pháp luật nghiêm cấm.']),
    Q('Anh chị em trong nhà nên?', ['Tranh giành', 'Yêu thương, đùm bọc, giúp đỡ nhau', 'Ganh ghét', 'Ai lo việc người nấy, không can thiệp'], 1, '"Anh em như thể tay chân" — yêu thương đùm bọc lẫn nhau.', [
      'Anh, chị, em trong gia đình có bổn phận <b>thương yêu, chăm sóc, giúp đỡ nhau</b>; nương tựa nhau khi không còn cha mẹ.',
      '💡 Ca dao: <i>"Anh em như thể tay chân / Rách lành đùm bọc, dở hay đỡ đần"</i>.',
      '⚠️ Tranh giành, ganh ghét, thờ ơ với nhau làm <code>rạn nứt tình cảm gia đình</code>.',
    ], ['Sai — tranh giành phá vỡ tình anh em.', 'Đúng — anh chị em nên yêu thương, đùm bọc, giúp đỡ nhau.', 'Sai — ganh ghét gây mất đoàn kết trong gia đình.', 'Sai — anh em cần quan tâm nhau, không thờ ơ.']),
    Q('Hành vi vi phạm pháp luật gia đình?', ['Dạy dỗ con', 'Chăm sóc cha mẹ', 'Bạo lực gia đình', 'Yêu thương con cái'], 2, 'Bạo lực gia đình bị Luật Phòng chống bạo lực gia đình nghiêm cấm.', [
      '<b>Bạo lực gia đình</b> là hành vi <i>cố ý gây tổn hại về thể chất, tinh thần, kinh tế</i> đối với thành viên gia đình.',
      'Hành vi này bị <code>Luật Phòng, chống bạo lực gia đình</code> nghiêm cấm và xử lý.',
      '💡 Dạy dỗ con đúng cách, chăm sóc cha mẹ, yêu thương con cái là những việc làm <b>đúng đắn, tốt đẹp</b>.',
    ], ['Sai — dạy dỗ con đúng cách là trách nhiệm của cha mẹ.', 'Sai — chăm sóc cha mẹ là bổn phận tốt đẹp.', 'Đúng — bạo lực gia đình bị Luật Phòng chống bạo lực gia đình nghiêm cấm.', 'Sai — yêu thương con cái là điều tốt đẹp.']),
  ]),

  M(23, 'Bình đẳng giới và bạo lực gia đình', [
    Q('Bình đẳng giới là?', ['Nam và nữ có quyền và nghĩa vụ ngang nhau trong mọi lĩnh vực', 'Nam được ưu tiên', 'Nữ được ưu tiên', 'Nam giới quyết định mọi việc'], 0, 'Bình đẳng giới = nam nữ có quyền, nghĩa vụ và cơ hội ngang nhau.', [
      '<b>Bình đẳng giới</b> là việc <i>nam, nữ có vị trí, vai trò ngang nhau</i>, được tạo điều kiện và cơ hội phát huy năng lực, được hưởng thụ như nhau trong mọi lĩnh vực của đời sống.',
      'Đây là nội dung của <code>Luật Bình đẳng giới</code> năm 2006.',
      '⚠️ Ưu tiên một giới (nam hoặc nữ) một cách bất hợp lý đều là <b>bất bình đẳng</b>.',
    ], ['Đúng — bình đẳng giới là nam nữ có quyền, nghĩa vụ ngang nhau trong mọi lĩnh vực.', 'Sai — ưu tiên nam giới là bất bình đẳng.', 'Sai — ưu tiên nữ giới một chiều cũng không phải bình đẳng.', 'Sai — nam quyết định mọi việc là tư tưởng trọng nam khinh nữ.']),
    Q('Bạo lực gia đình gồm?', ['Không có khái niệm này', 'Bạo lực thể xác, tinh thần, kinh tế, tình dục', 'Chỉ lời nói', 'Chỉ thể xác'], 1, '4 dạng: thể xác, tinh thần, kinh tế và tình dục theo Luật PCBLGD.', [
      '<b>Bạo lực gia đình</b> có nhiều dạng:',
      '<ul><li><b>Thể xác</b>: đánh đập, hành hạ.</li><li><b>Tinh thần</b>: lăng mạ, xúc phạm, cô lập, đe doạ.</li><li><b>Kinh tế</b>: kiểm soát, chiếm đoạt thu nhập, ép lao động quá sức.</li><li><b>Tình dục</b>: cưỡng ép quan hệ trái ý muốn.</li></ul>',
      '⚠️ Bạo lực gia đình không chỉ là đòn roi — tổn thương tinh thần cũng rất nghiêm trọng.',
    ], ['Sai — bạo lực gia đình là khái niệm được luật quy định rõ.', 'Đúng — bạo lực gia đình gồm thể xác, tinh thần, kinh tế và tình dục.', 'Sai — bạo lực gia đình không chỉ là lời nói.', 'Sai — không chỉ thể xác mà còn nhiều dạng khác.']),
    Q('Khi bị bạo lực gia đình, cần?', ['Bỏ trốn', 'Báo công an, người thân, tổng đài 111', 'Tự giải quyết bằng cách trả đũa lại', 'Im lặng chịu đựng'], 1, 'Báo công an, người thân, gọi 111 (tổng đài bảo vệ trẻ em) để được giúp đỡ.', [
      'Khi bị bạo lực gia đình, cần <b>tìm kiếm sự giúp đỡ</b>: báo cho <i>người thân tin cậy, hàng xóm, công an, chính quyền địa phương</i> hoặc gọi <code>Tổng đài quốc gia bảo vệ trẻ em 111</code>.',
      '⚠️ <code>Im lặng chịu đựng</code> khiến bạo lực tiếp diễn; <code>trả đũa bằng bạo lực</code> làm tình hình tệ hơn và có thể vi phạm pháp luật.',
      '💡 Nạn nhân bạo lực gia đình được pháp luật bảo vệ.',
    ], ['Sai — bỏ trốn không giải quyết tận gốc và có thể gặp nguy hiểm.', 'Đúng — báo công an, người thân, gọi 111 để được giúp đỡ kịp thời.', 'Sai — trả đũa bạo lực bằng bạo lực càng làm tình hình tệ hơn.', 'Sai — im lặng chịu đựng khiến bạo lực tiếp diễn.']),
    Q('Trẻ em bị bạo hành có thể gọi?', ['115', '114', '111', '113'], 2, '111 = tổng đài quốc gia bảo vệ trẻ em.', [
      '<b>111</b> là số <i>Tổng đài điện thoại quốc gia bảo vệ trẻ em</i> — miễn phí, hoạt động 24/24 giờ, tiếp nhận thông tin về trẻ em bị xâm hại, bạo hành.',
      '💡 Ghi nhớ các số khẩn cấp: <code>111</code> (bảo vệ trẻ em), <code>113</code> (công an), <code>114</code> (cứu hoả), <code>115</code> (cấp cứu y tế).',
    ], ['Sai — 115 là số cấp cứu y tế.', 'Sai — 114 là số báo cháy, cứu hoả.', 'Đúng — 111 là tổng đài quốc gia bảo vệ trẻ em.', 'Sai — 113 là số cảnh sát phản ứng nhanh.']),
    Q('Vai trò của bình đẳng giới?', ['Phát triển xã hội bền vững, hạnh phúc gia đình', 'Gây mâu thuẫn', 'Không có vai trò', 'Lãng phí'], 0, 'Bình đẳng giới góp phần phát triển XH bền vững và hạnh phúc gia đình.', [
      '<b>Ý nghĩa của bình đẳng giới</b>:',
      '<ul><li>Giúp <i>phát huy đầy đủ năng lực</i> của cả nam và nữ.</li><li>Tạo nên <code>gia đình hoà thuận, hạnh phúc</code>.</li><li>Góp phần xây dựng xã hội <i>công bằng, dân chủ, văn minh, phát triển bền vững</i>.</li></ul>',
      '⚠️ Bình đẳng giới tạo hoà thuận, là tiến bộ — không gây mâu thuẫn hay lãng phí.',
    ], ['Đúng — bình đẳng giới góp phần phát triển xã hội bền vững và hạnh phúc gia đình.', 'Sai — bình đẳng giới tạo hoà thuận, không gây mâu thuẫn.', 'Sai — bình đẳng giới có vai trò rất quan trọng.', 'Sai — bình đẳng giới là tiến bộ, không phải lãng phí.']),
  ]),

  M(24, 'Phòng chống bạo lực học đường', [
    Q('Bạo lực học đường gồm?', ['Đánh nhau, bắt nạt, lăng mạ, cô lập trong trường học', 'Học tập', 'Hoạt động ngoại khoá', 'Vui chơi'], 0, 'BLHĐ = hành vi xâm phạm thể chất, tinh thần xảy ra trong/quanh trường học.', [
      '<b>Bạo lực học đường</b> là những hành vi <i>hành hạ, ngược đãi, đánh đập, xâm hại thân thể, sức khoẻ; lăng mạ, xúc phạm danh dự, nhân phẩm; cô lập, xua đuổi</i> và các hành vi cố ý khác gây tổn hại cho người học.',
      'Bạo lực học đường gồm cả <code>bạo lực thể chất và bạo lực tinh thần</code>.',
      '⚠️ Học tập, ngoại khoá, vui chơi lành mạnh hoàn toàn khác với bạo lực.',
    ], ['Đúng — bạo lực học đường gồm đánh nhau, bắt nạt, lăng mạ, cô lập trong trường học.', 'Sai — học tập là hoạt động tích cực.', 'Sai — hoạt động ngoại khoá lành mạnh không phải bạo lực.', 'Sai — vui chơi là hoạt động bình thường, không phải bạo lực.']),
    Q('Cyber bullying là?', ['Học nhóm', 'Học online', 'Bắt nạt qua mạng (lập group nói xấu, đăng ảnh xấu hổ)', 'Chơi game'], 2, 'Cyber bullying = bắt nạt qua mạng XH, tin nhắn.', [
      '<b>Cyber bullying (bắt nạt trực tuyến)</b> là hình thức bạo lực qua <i>mạng xã hội, tin nhắn, internet</i>: lập nhóm nói xấu, tung tin đồn, đăng ảnh/video bôi nhọ, đe doạ, quấy rối.',
      '⚠️ Bắt nạt qua mạng <code>lan truyền nhanh và để lại "dấu vết số"</code>, gây tổn thương tâm lý nặng nề và lâu dài cho nạn nhân.',
      '💡 Đây là dạng bạo lực học đường ngày càng phổ biến trong thời đại số.',
    ], ['Sai — học nhóm là hoạt động học tập tích cực.', 'Sai — học online là hình thức học, không phải bắt nạt.', 'Đúng — cyber bullying là bắt nạt qua mạng: lập group nói xấu, đăng ảnh xấu hổ.', 'Sai — chơi game đơn thuần không phải là cyber bullying.']),
    Q('Khi bị bắt nạt, em nên?', ['Báo thầy cô, cha mẹ, không im lặng chịu đựng', 'Bỏ học', 'Im lặng chấp nhận', 'Tìm cách trả thù'], 0, 'Báo người lớn ngay để được giúp đỡ kịp thời, không tự xử lý.', [
      'Khi bị bắt nạt, cách ứng xử đúng là <b>tìm kiếm sự giúp đỡ</b>: nói với <i>thầy cô, cha mẹ, người lớn tin cậy</i>; lưu lại bằng chứng (với bắt nạt qua mạng).',
      '⚠️ <code>Im lặng chịu đựng</code> khiến việc bắt nạt tiếp diễn; <code>bỏ học</code> là né tránh; <code>trả thù</code> bằng bạo lực làm tình hình tồi tệ hơn.',
      '💡 Lên tiếng không phải là yếu đuối — đó là cách bảo vệ bản thân thông minh nhất.',
    ], ['Đúng — báo thầy cô, cha mẹ để được giúp đỡ, không im lặng chịu đựng.', 'Sai — bỏ học là né tránh, không giải quyết vấn đề.', 'Sai — im lặng chấp nhận khiến việc bắt nạt tiếp diễn.', 'Sai — trả thù bằng bạo lực càng làm tình hình tồi tệ hơn.']),
    Q('Khi thấy bạn bị bắt nạt?', ['Mặc kệ', 'Quay clip phát tán', 'Cùng tham gia bắt nạt', 'Báo thầy cô, ủng hộ bạn'], 3, 'Báo thầy cô và đứng về phía nạn nhân là cách ứng xử đúng.', [
      'Khi chứng kiến bạn bị bắt nạt, người có trách nhiệm sẽ <b>không thờ ơ</b>: <i>báo thầy cô, người lớn</i>; an ủi, đứng về phía nạn nhân; can ngăn nếu an toàn.',
      '⚠️ <code>Mặc kệ</code> là tiếp tay cho cái xấu; <code>quay clip phát tán</code> hay <code>cùng tham gia</code> làm nạn nhân tổn thương thêm.',
      '💡 Sự lên tiếng của người chứng kiến có thể chấm dứt hành vi bắt nạt.',
    ], ['Sai — mặc kệ là thờ ơ, để mặc bạn bị tổn thương.', 'Sai — quay clip phát tán làm nạn nhân tổn thương thêm.', 'Sai — cùng bắt nạt là tiếp tay cho cái xấu.', 'Đúng — báo thầy cô và ủng hộ, đứng về phía nạn nhân là ứng xử đúng.']),
    Q('Hậu quả BLHĐ?', ['Rèn bản lĩnh', 'Không hậu quả', 'Tốt cho học sinh', 'Tổn thương tâm lý, học sa sút, có thể tự tử'], 3, 'BLHĐ gây tổn thương lâu dài về tâm lý, ảnh hưởng học tập và sức khoẻ.', [
      '<b>Hậu quả của bạo lực học đường</b>:',
      '<ul><li>Với nạn nhân: <i>tổn thương thể chất, sang chấn tâm lý</i>, sợ hãi, học hành sa sút, thậm chí trầm cảm, <code>tự tử</code>.</li><li>Với người gây bạo lực: bị kỷ luật, xử lý pháp luật, méo mó nhân cách.</li><li>Với nhà trường, xã hội: môi trường học tập bất an.</li></ul>',
      '⚠️ Bạo lực không phải cách rèn bản lĩnh — đó là hành vi gây hại nghiêm trọng.',
    ], ['Sai — bạo lực không phải cách rèn bản lĩnh.', 'Sai — bạo lực học đường để lại nhiều hậu quả nặng nề.', 'Sai — bạo lực gây hại, không tốt cho học sinh.', 'Đúng — BLHĐ gây tổn thương tâm lý, học sa sút, thậm chí dẫn đến tự tử.']),
  ]),

  M(25, 'An toàn giao thông và trách nhiệm công dân', [
    Q('Luật Giao thông đường bộ áp dụng?', ['Mọi người tham gia giao thông', 'Chỉ người lớn', 'Chỉ ô tô', 'Chỉ tài xế'], 0, 'Luật GTĐB áp dụng với mọi người tham gia giao thông, gồm cả HS đi bộ.', [
      '<b>Luật Giao thông đường bộ</b> áp dụng với <i>mọi người và phương tiện tham gia giao thông</i> trên lãnh thổ Việt Nam.',
      'Điều này gồm cả <code>người đi bộ, đi xe đạp, học sinh</code> chứ không riêng tài xế hay ô tô.',
      '💡 Mỗi người đều có trách nhiệm hiểu và tuân thủ luật để bảo đảm an toàn cho mình và người khác.',
    ], ['Đúng — Luật Giao thông áp dụng với mọi người tham gia giao thông, kể cả HS đi bộ.', 'Sai — luật áp dụng cho mọi lứa tuổi, không chỉ người lớn.', 'Sai — luật áp dụng cho mọi phương tiện, không chỉ ô tô.', 'Sai — không chỉ tài xế mà cả người đi bộ, đi xe đạp đều phải tuân thủ.']),
    Q('HS THCS chưa đủ tuổi đi xe?', ['Xe đạp', 'Xe đạp gấp loại nhỏ', 'Xe đạp điện <50cc', 'Xe máy'], 3, 'HS THCS không được điều khiển xe máy (cần đủ 18 tuổi và có bằng lái).', [
      'Theo Luật Giao thông đường bộ, người điều khiển <b>xe mô tô, xe máy</b> phải đủ tuổi và có giấy phép lái xe phù hợp.',
      '<ul><li>Đủ 16 tuổi: được lái xe gắn máy dưới 50cc.</li><li>Đủ 18 tuổi và có bằng lái: được lái xe mô tô từ 50cc trở lên.</li></ul>',
      '⚠️ Học sinh THCS (thường 11-15 tuổi) <code>chưa đủ tuổi đi xe máy</code>; được đi xe đạp, xe đạp điện.',
    ], ['Sai — HS THCS được đi xe đạp.', 'Sai — xe đạp gấp loại nhỏ HS vẫn được đi.', 'Sai — xe đạp điện HS THCS vẫn có thể đi.', 'Đúng — HS THCS chưa đủ tuổi đi xe máy (cần đủ 18 tuổi và có bằng lái).']),
    Q('Đội mũ bảo hiểm bắt buộc khi?', ['Đi xe scooter trẻ em trong sân nhà', 'Đi xe đạp thường', 'Đi xe máy, xe đạp điện', 'Ngồi trong ô tô'], 2, 'Bắt buộc đội mũ BH khi đi xe máy, xe đạp điện (cả người lái và ngồi sau).', [
      'Pháp luật <b>bắt buộc đội mũ bảo hiểm</b> đạt chuẩn khi đi <i>xe mô tô, xe gắn máy, xe đạp điện, xe máy điện</i> — với cả người lái và người ngồi sau.',
      '💡 Mũ bảo hiểm giúp giảm đáng kể chấn thương sọ não khi xảy ra tai nạn.',
      '⚠️ Ngồi ô tô thì thắt dây an toàn (không phải đội mũ); xe đạp thường không bắt buộc đội mũ theo luật.',
    ], ['Sai — chơi scooter trong sân nhà không bắt buộc đội mũ bảo hiểm.', 'Sai — xe đạp thường không bắt buộc đội mũ bảo hiểm theo luật.', 'Đúng — bắt buộc đội mũ bảo hiểm khi đi xe máy, xe đạp điện.', 'Sai — ngồi trong ô tô không đội mũ bảo hiểm mà thắt dây an toàn.']),
    Q('Vượt đèn đỏ là?', ['Quyền của người lái', 'Không sao', 'Vi phạm luật, có thể gây tai nạn', 'Cách đi nhanh'], 2, 'Vượt đèn đỏ là vi phạm Luật GT, dễ gây tai nạn nghiêm trọng.', [
      '<b>Vượt đèn đỏ</b> là <i>hành vi vi phạm Luật Giao thông đường bộ</i>, bị xử phạt hành chính.',
      'Đèn đỏ là tín hiệu dừng lại; vượt đèn đỏ rất <code>dễ gây tai nạn nghiêm trọng</code> tại các giao lộ.',
      '⚠️ Tuân thủ tín hiệu đèn là nguyên tắc cơ bản để giao thông an toàn, không phải "cách đi nhanh".',
    ], ['Sai — vượt đèn đỏ không phải là quyền mà là vi phạm.', 'Sai — vượt đèn đỏ rất nguy hiểm và bị xử phạt.', 'Đúng — vượt đèn đỏ là vi phạm luật, có thể gây tai nạn nghiêm trọng.', 'Sai — đi nhanh bất chấp luật là gây nguy hiểm.']),
    Q('Khi xảy ra tai nạn, cần?', ['Báo công an, cứu giúp người bị nạn', 'Bỏ chạy', 'Mặc kệ', 'Quay clip'], 0, 'Cấp cứu nạn nhân, báo công an, không bỏ chạy (tội bỏ trốn sau tai nạn).', [
      'Khi xảy ra tai nạn giao thông, cần <b>cứu giúp người bị nạn</b>: sơ cứu, gọi cấp cứu 115, báo công an; bảo vệ hiện trường.',
      '⚠️ <code>Bỏ chạy sau tai nạn</code> (đặc biệt khi mình gây ra) là hành vi vi phạm pháp luật; <code>mặc kệ người bị nạn</code> là vô nhân đạo.',
      '💡 Cứu người bị nạn là trách nhiệm pháp lý và đạo đức của mọi người.',
    ], ['Đúng — cần báo công an và cứu giúp người bị nạn.', 'Sai — bỏ chạy sau tai nạn là vi phạm pháp luật.', 'Sai — mặc kệ người bị nạn là vô trách nhiệm, vô nhân đạo.', 'Sai — quay clip thay vì cứu người là sai trái.']),
  ]),

  M(26, 'Quyền tham gia quản lý nhà nước, quản lý xã hội', [
    Q('Quyền tham gia quản lý NN của công dân?', ['Không có quyền', 'Chỉ người lớn', 'Bầu cử, ứng cử, đóng góp ý kiến, giám sát', 'Chỉ cán bộ mới có'], 2, 'Mọi công dân đều có quyền tham gia quản lý NN qua nhiều hình thức.', [
      '<b>Quyền tham gia quản lý nhà nước, quản lý xã hội</b> là quyền của công dân tham gia <i>bàn bạc, tổ chức thực hiện, giám sát và đánh giá</i> các hoạt động, công việc chung của Nhà nước, xã hội.',
      'Thể hiện qua: <code>bầu cử, ứng cử, đóng góp ý kiến, khiếu nại, tố cáo, giám sát</code>.',
      '💡 Đây là quyền chính trị quan trọng nhất, thể hiện địa vị làm chủ của Nhân dân.',
    ], ['Sai — công dân có quyền tham gia quản lý nhà nước.', 'Sai — quyền này không chỉ dành cho người lớn theo cách hiểu hạn chế.', 'Đúng — công dân tham gia qua bầu cử, ứng cử, đóng góp ý kiến, giám sát.', 'Sai — không chỉ cán bộ mà mọi công dân đều có quyền.']),
    Q('Hình thức tham gia trực tiếp?', ['Không tham gia', 'Im lặng', 'Bầu cử, ứng cử, biểu quyết các vấn đề trọng đại', 'Qua người đại diện'], 2, 'Tham gia trực tiếp: bầu cử, biểu quyết, đóng góp ý kiến, giám sát.', [
      '<b>Tham gia trực tiếp</b>: công dân <i>tự mình</i> tham gia các công việc của Nhà nước — bầu cử, ứng cử, biểu quyết khi Nhà nước trưng cầu ý dân, trực tiếp đóng góp ý kiến, giám sát.',
      '💡 Ngược lại, <code>tham gia gián tiếp</code> là thông qua người đại diện (đại biểu Quốc hội, HĐND) mà mình bầu ra.',
    ], ['Sai — không tham gia là từ bỏ quyền của mình.', 'Sai — im lặng không phải là tham gia.', 'Đúng — tham gia trực tiếp là bầu cử, ứng cử, biểu quyết các vấn đề trọng đại.', 'Sai — qua người đại diện là tham gia gián tiếp.']),
    Q('Hình thức tham gia gián tiếp?', ['Tự quyết định', 'Không cần ai', 'Bỏ trống', 'Qua đại biểu Quốc hội, HĐND'], 3, 'Tham gia gián tiếp qua người đại diện được bầu (đại biểu QH, HĐND).', [
      '<b>Tham gia gián tiếp</b>: công dân thực hiện quyền của mình <i>thông qua người đại diện</i> mà mình đã bầu ra — đó là <code>đại biểu Quốc hội, đại biểu Hội đồng nhân dân</code> các cấp.',
      '💡 Người đại diện thay mặt nhân dân quyết định các vấn đề quan trọng, đồng thời phải báo cáo và chịu sự giám sát của nhân dân.',
    ], ['Sai — tự quyết định là tham gia trực tiếp.', 'Sai — \'không cần ai\' không phải hình thức tham gia gián tiếp.', 'Sai — bỏ trống là không tham gia.', 'Đúng — tham gia gián tiếp qua đại biểu Quốc hội, HĐND được bầu.']),
    Q('Tuổi đi bầu cử ở VN?', ['18 tuổi', '16 tuổi', '14 tuổi', '21 tuổi'], 0, 'Công dân đủ 18 tuổi trở lên có quyền bầu cử (Hiến pháp).', [
      'Theo Hiến pháp 2013: công dân <b>đủ 18 tuổi trở lên</b> có quyền <i>bầu cử</i> đại biểu Quốc hội và đại biểu Hội đồng nhân dân.',
      '💡 Ghi nhớ cặp đôi: <code>đủ 18 tuổi — bầu cử</code>; <code>đủ 21 tuổi — ứng cử</code>.',
    ], ['Đúng — công dân đủ 18 tuổi trở lên có quyền bầu cử.', 'Sai — 16 tuổi chưa đủ tuổi bầu cử.', 'Sai — 14 tuổi chưa đủ tuổi bầu cử.', 'Sai — 21 tuổi là tuổi ứng cử, không phải tuổi bầu cử.']),
    Q('Tuổi ứng cử đại biểu QH/HĐND?', ['21 tuổi', '18 tuổi', '30 tuổi', '25 tuổi'], 0, 'Công dân đủ 21 tuổi có quyền ứng cử (Hiến pháp).', [
      'Theo Hiến pháp 2013: công dân <b>đủ 21 tuổi trở lên</b> có quyền <i>ứng cử</i> vào Quốc hội, Hội đồng nhân dân.',
      '💡 So sánh: tuổi <code>bầu cử là 18</code>, tuổi <code>ứng cử là 21</code> — ứng cử đòi hỏi sự trưởng thành hơn để gánh vác trọng trách đại biểu nhân dân.',
    ], ['Đúng — công dân đủ 21 tuổi có quyền ứng cử đại biểu QH, HĐND.', 'Sai — 18 tuổi là tuổi bầu cử, không phải ứng cử.', 'Sai — 30 tuổi cao hơn quy định.', 'Sai — 25 tuổi không phải mốc tuổi ứng cử theo luật.']),
  ]),

  M(27, 'Nghĩa vụ bảo vệ Tổ quốc', [
    Q('Bảo vệ Tổ quốc là?', ['Không cần thiết', 'Trách nhiệm của quân đội', 'Tự nguyện', 'Nghĩa vụ thiêng liêng, quyền cao quý của công dân'], 3, 'Hiến pháp: Bảo vệ Tổ quốc là nghĩa vụ thiêng liêng và quyền cao quý của công dân.', [
      'Theo Hiến pháp 2013: <b>Bảo vệ Tổ quốc</b> là <i>nghĩa vụ thiêng liêng và quyền cao quý</i> của công dân.',
      'Bảo vệ Tổ quốc bao gồm bảo vệ <code>độc lập, chủ quyền, thống nhất, toàn vẹn lãnh thổ</code>, bảo vệ chế độ và Nhà nước.',
      '⚠️ Đây là trách nhiệm của <b>mọi công dân</b>, không riêng quân đội; vừa là nghĩa vụ vừa là quyền.',
    ], ['Sai — bảo vệ Tổ quốc là việc vô cùng cần thiết.', 'Sai — không chỉ quân đội mà mọi công dân đều có trách nhiệm.', 'Sai — đây là nghĩa vụ, không hoàn toàn là tự nguyện.', 'Đúng — bảo vệ Tổ quốc là nghĩa vụ thiêng liêng, quyền cao quý của công dân.']),
    Q('Nghĩa vụ quân sự với nam thanh niên?', ['Phải đăng ký từ 17 tuổi, gọi nhập ngũ 18–25 tuổi', 'Bắt buộc cả nữ', 'Không bắt buộc', 'Tự nguyện hoàn toàn'], 0, 'Luật NVQS: nam đăng ký từ 17 tuổi, gọi nhập ngũ 18–25 tuổi (đến 27 với HS/SV được hoãn).', [
      'Theo <b>Luật Nghĩa vụ quân sự</b>: công dân nam <i>đăng ký nghĩa vụ quân sự từ đủ 17 tuổi</i>; độ tuổi gọi nhập ngũ là <code>từ đủ 18 đến hết 25 tuổi</code> (đến hết 27 tuổi với người được tạm hoãn để học tập).',
      '💡 Công dân nữ trong độ tuổi có ngành nghề chuyên môn phù hợp được đăng ký, nhưng không bắt buộc nhập ngũ như nam.',
    ], ['Đúng — nam phải đăng ký từ 17 tuổi, gọi nhập ngũ 18–25 tuổi.', 'Sai — với nữ, nghĩa vụ quân sự không bắt buộc nhập ngũ như nam.', 'Sai — nghĩa vụ quân sự là bắt buộc với nam trong độ tuổi.', 'Sai — đây là nghĩa vụ bắt buộc, không hoàn toàn tự nguyện.']),
    Q('Bảo vệ Tổ quốc gồm?', ['Chỉ quân sự', 'Chỉ chính trị', 'Quân sự, kinh tế, văn hoá, an ninh', 'Chỉ kinh tế'], 2, 'Bảo vệ TQ toàn diện: quân sự, kinh tế, văn hoá, an ninh chính trị.', [
      '<b>Bảo vệ Tổ quốc là sự nghiệp toàn diện</b>, không chỉ về quân sự mà trên mọi lĩnh vực:',
      '<ul><li><i>Quân sự, quốc phòng</i>: sẵn sàng chiến đấu bảo vệ lãnh thổ.</li><li><i>Kinh tế</i>: xây dựng đất nước giàu mạnh.</li><li><i>Văn hoá</i>: giữ gìn bản sắc dân tộc.</li><li><i>An ninh chính trị, trật tự an toàn xã hội</i>.</li></ul>',
      '💡 "Dựng nước đi đôi với giữ nước" là quy luật tồn tại của dân tộc Việt Nam.',
    ], ['Sai — bảo vệ Tổ quốc không chỉ về quân sự.', 'Sai — không chỉ chính trị mà nhiều mặt khác.', 'Đúng — bảo vệ Tổ quốc toàn diện: quân sự, kinh tế, văn hoá, an ninh.', 'Sai — không chỉ kinh tế mà toàn diện nhiều lĩnh vực.']),
    Q('HS thực hiện nghĩa vụ này bằng?', ['Không cần làm gì', 'Học tập tốt, rèn luyện sức khoẻ, yêu nước', 'Trốn tránh', 'Chờ lớn'], 1, 'HS chuẩn bị thể chất, tri thức, lòng yêu nước để bảo vệ TQ.', [
      'Học sinh thực hiện nghĩa vụ bảo vệ Tổ quốc bằng những việc <b>phù hợp lứa tuổi</b>:',
      '<ul><li><i>Học tập tốt</i>, trau dồi tri thức, kỹ năng.</li><li><code>Rèn luyện sức khoẻ</code>, thể chất.</li><li>Nuôi dưỡng <i>lòng yêu nước</i>, tự hào dân tộc; tham gia hoạt động Đội, Đoàn.</li></ul>',
      '💡 Chuẩn bị từ hôm nay để sau này góp sức xây dựng và bảo vệ đất nước.',
    ], ['Sai — HS có thể đóng góp ngay từ bây giờ.', 'Đúng — HS học tập tốt, rèn luyện sức khoẻ, nuôi dưỡng lòng yêu nước.', 'Sai — trốn tránh là thiếu trách nhiệm với Tổ quốc.', 'Sai — không nên thụ động chờ lớn mà cần chuẩn bị từ sớm.']),
    Q('Trốn nghĩa vụ quân sự?', ['Không sao', 'Vi phạm pháp luật, bị xử lý', 'Khôn ngoan', 'Quyền tự do'], 1, 'Trốn nghĩa vụ quân sự là vi phạm pháp luật, bị xử lý hành chính hoặc hình sự.', [
      '<b>Trốn tránh nghĩa vụ quân sự</b> (không đăng ký, không khám tuyển, không chấp hành lệnh gọi nhập ngũ) là <i>hành vi vi phạm pháp luật</i>.',
      'Tuỳ mức độ, người vi phạm bị <code>xử phạt hành chính hoặc truy cứu trách nhiệm hình sự</code>.',
      '⚠️ Đây không phải "khôn ngoan" hay "quyền tự do" — nghĩa vụ quân sự là bắt buộc với công dân trong độ tuổi.',
    ], ['Sai — trốn nghĩa vụ quân sự là hành vi vi phạm.', 'Đúng — trốn nghĩa vụ quân sự vi phạm pháp luật, bị xử lý hành chính hoặc hình sự.', 'Sai — đây là hành vi sai trái, không phải khôn ngoan.', 'Sai — nghĩa vụ quân sự là bắt buộc, không phải quyền tự do từ chối.']),
  ]),

  M(28, 'Sống có đạo đức và tuân theo pháp luật', [
    Q('Sống có đạo đức là?', ['Sống theo chuẩn mực đạo đức xã hội, biết yêu thương, tự giác', 'Sống ích kỷ', 'Sống nguyên tắc cứng nhắc', 'Sống thờ ơ'], 0, 'Sống có đạo đức = tuân theo chuẩn mực đạo đức XH, tự giác hành động vì cái đúng.', [
      '<b>Sống có đạo đức</b> là <i>suy nghĩ, hành động theo những chuẩn mực đạo đức xã hội</i>: biết chăm lo cho mọi người, cho công việc chung; biết giải quyết hợp lý giữa quyền lợi và nghĩa vụ; lấy lợi ích xã hội, dân tộc làm mục tiêu.',
      'Người sống có đạo đức biết <code>yêu thương, tự nguyện, tự giác</code> làm điều thiện.',
      '⚠️ Ích kỷ, thờ ơ là trái với đạo đức.',
    ], ['Đúng — sống có đạo đức là sống theo chuẩn mực xã hội, biết yêu thương, tự giác.', 'Sai — ích kỷ là trái với đạo đức.', 'Sai — đạo đức là tự giác vì cái đúng, không phải cứng nhắc.', 'Sai — thờ ơ là thiếu trách nhiệm với người khác.']),
    Q('Sống có pháp luật là?', ['Chỉ tuân khi bị giám sát', 'Vi phạm khi có lợi', 'Né tránh pháp luật', 'Tôn trọng, tuân theo Hiến pháp và pháp luật'], 3, 'Sống có pháp luật = tôn trọng, chấp hành nghiêm túc Hiến pháp và pháp luật.', [
      '<b>Tuân theo pháp luật</b> là <i>luôn sống và hành động theo những quy định của Hiến pháp và pháp luật</i>.',
      'Người sống có pháp luật tự giác chấp hành nghiêm chỉnh các quy định, <code>không vì lợi ích riêng mà vi phạm</code>.',
      '⚠️ Chỉ tuân khi bị giám sát, vi phạm khi có lợi, né tránh pháp luật đều không phải sống có pháp luật.',
    ], ['Sai — tuân pháp luật phải tự giác, không chỉ khi bị giám sát.', 'Sai — vi phạm khi có lợi là sống không có pháp luật.', 'Sai — né tránh pháp luật là sai trái.', 'Đúng — sống có pháp luật là tôn trọng, tuân theo Hiến pháp và pháp luật.']),
    Q('Mối quan hệ đạo đức và pháp luật?', ['Bổ sung, hỗ trợ nhau', 'Loại trừ nhau', 'Đối lập', 'Không liên quan'], 0, 'Đạo đức và pháp luật bổ sung, hỗ trợ — đạo đức nội tâm, pháp luật ngoại tại.', [
      '<b>Đạo đức và pháp luật có quan hệ chặt chẽ, bổ sung cho nhau</b>:',
      '<ul><li><b>Đạo đức</b>: điều chỉnh hành vi bằng <i>lương tâm, dư luận xã hội</i> (tự giác bên trong).</li><li><b>Pháp luật</b>: điều chỉnh hành vi bằng <code>quy định bắt buộc</code> của Nhà nước.</li></ul>',
      '💡 Người sống có đạo đức thì tự nguyện tuân theo pháp luật; pháp luật cũng giúp duy trì, bảo vệ các giá trị đạo đức.',
    ], ['Đúng — đạo đức và pháp luật bổ sung, hỗ trợ nhau.', 'Sai — hai cái không loại trừ mà thống nhất.', 'Sai — đạo đức và pháp luật không đối lập.', 'Sai — đạo đức và pháp luật có quan hệ chặt chẽ.']),
    Q('Người sống có đạo đức và pháp luật?', ['Không có lợi ích', 'Được xã hội tôn trọng, sống hạnh phúc', 'Khó khăn trong cuộc sống', 'Bị xa lánh'], 1, 'Người sống đúng đạo đức và pháp luật được tôn trọng, có cuộc sống ý nghĩa.', [
      '<b>Ý nghĩa của sống có đạo đức và tuân theo pháp luật</b>: giúp con người <i>tiến bộ không ngừng</i>, làm được nhiều việc có ích, được mọi người <code>yêu quý, kính trọng</code>.',
      'Đây là điều kiện để mỗi cá nhân và xã hội <b>phát triển ổn định, hạnh phúc, văn minh</b>.',
      '💡 Đạo đức và pháp luật là hai "trụ cột" của một nhân cách hoàn thiện.',
    ], ['Sai — sống đúng đạo đức, pháp luật mang lại nhiều lợi ích.', 'Đúng — người sống có đạo đức và pháp luật được xã hội tôn trọng, sống hạnh phúc.', 'Sai — sống đúng đắn giúp cuộc sống thuận lợi hơn.', 'Sai — người sống đúng đắn được quý mến, không bị xa lánh.']),
    Q('HS rèn luyện bằng cách?', ['Tu dưỡng đạo đức, học và làm theo pháp luật', 'Vi phạm khi có lợi', 'Sống bản năng', 'Chỉ học lý thuyết'], 0, 'HS tu dưỡng đạo đức qua hành vi hằng ngày và tự giác tuân thủ pháp luật.', [
      'Học sinh rèn luyện để sống có đạo đức và tuân theo pháp luật bằng cách:',
      '<ul><li><i>Tu dưỡng đạo đức</i> qua hành vi hằng ngày (lễ phép, trung thực, giúp đỡ người khác).</li><li><code>Học tập, tìm hiểu pháp luật</code> và tự giác chấp hành.</li><li>Phê phán cái sai, ủng hộ cái đúng.</li></ul>',
      '⚠️ Học lý thuyết phải đi đôi với <b>thực hành</b> trong đời sống mới có ý nghĩa.',
    ], ['Đúng — HS tu dưỡng đạo đức, học và làm theo pháp luật mỗi ngày.', 'Sai — vi phạm khi có lợi là sống thiếu đạo đức, pháp luật.', 'Sai — sống bản năng không có rèn luyện là thiếu tự chủ.', 'Sai — học lý thuyết phải đi đôi với thực hành trong đời sống.']),
  ]),

  M(29, 'Lao động và hướng nghiệp', [
    Q('Lao động có vai trò?', ['Lãng phí thời gian', 'Không cần thiết', 'Chỉ vất vả', 'Tạo ra của cải vật chất, tinh thần, là điều kiện tồn tại của xã hội'], 3, 'Lao động là hoạt động cốt lõi tạo ra của cải, là điều kiện tồn tại của xã hội loài người.', [
      '<b>Lao động</b> là hoạt động có mục đích của con người nhằm <i>tạo ra của cải vật chất và các giá trị tinh thần</i> cho xã hội.',
      'Lao động là <code>hoạt động chủ yếu, quan trọng nhất</code> của con người, là <i>nhân tố quyết định sự tồn tại và phát triển</i> của đất nước, nhân loại.',
      '💡 Chính lao động đã giúp con người tách khỏi thế giới động vật và làm nên văn minh.',
    ], ['Sai — lao động là hoạt động có ý nghĩa, không phí thời gian.', 'Sai — lao động vô cùng cần thiết cho con người và xã hội.', 'Sai — lao động không chỉ vất vả mà còn tạo ra giá trị.', 'Đúng — lao động tạo ra của cải vật chất, tinh thần, là điều kiện tồn tại của xã hội.']),
    Q('Quyền và nghĩa vụ lao động của công dân?', ['Có quyền làm việc, có nghĩa vụ lao động', 'Chỉ có quyền', 'Không bắt buộc', 'Chỉ có nghĩa vụ'], 0, 'Lao động vừa là quyền vừa là nghĩa vụ của mọi công dân theo Hiến pháp.', [
      'Lao động <b>vừa là quyền vừa là nghĩa vụ</b> của công dân:',
      '<ul><li><b>Quyền</b>: công dân có quyền <i>tự do sử dụng sức lao động</i> để học nghề, tìm kiếm việc làm, lựa chọn nghề nghiệp có ích.</li><li><b>Nghĩa vụ</b>: mỗi người phải <code>lao động để tự nuôi sống bản thân, gia đình</code> và góp phần xây dựng xã hội.</li></ul>',
    ], ['Đúng — lao động vừa là quyền làm việc vừa là nghĩa vụ của công dân.', 'Sai — lao động không chỉ là quyền mà còn là nghĩa vụ.', 'Sai — lao động vừa là quyền vừa là nghĩa vụ theo Hiến pháp.', 'Sai — lao động không chỉ là nghĩa vụ mà còn là quyền.']),
    Q('Tuổi tối thiểu được lao động?', ['12 tuổi', '18 tuổi', '21 tuổi', '15 tuổi (đối với một số công việc)'], 3, 'Bộ luật LĐ: tối thiểu 15 tuổi cho một số việc, có hạn chế giờ làm và loại việc.', [
      'Theo <b>Bộ luật Lao động</b>, độ tuổi lao động tối thiểu của người lao động là <i>đủ 15 tuổi</i>.',
      'Người từ đủ 13 đến dưới 15 tuổi chỉ được làm <code>công việc nhẹ</code> theo danh mục quy định; dưới 13 tuổi chỉ làm một số công việc nghệ thuật, thể thao đặc thù.',
      '⚠️ Người chưa thành niên có giới hạn về <i>giờ làm và loại công việc</i> để bảo vệ sức khoẻ, việc học.',
    ], ['Sai — 12 tuổi chưa đủ tuổi lao động theo luật.', 'Sai — 18 tuổi không phải tuổi tối thiểu chung.', 'Sai — 21 tuổi cao hơn quy định tuổi tối thiểu.', 'Đúng — tối thiểu 15 tuổi cho một số công việc, có hạn chế giờ làm và loại việc.']),
    Q('Hành vi cấm với người dưới 18?', ['Thực tập', 'Làm công việc nặng nhọc, độc hại', 'Học nghề', 'Đi học'], 1, 'Cấm sử dụng lao động dưới 18 tuổi làm công việc nặng nhọc, độc hại, nguy hiểm.', [
      'Pháp luật <b>nghiêm cấm sử dụng lao động chưa thành niên</b> (dưới 18 tuổi) làm những công việc <i>nặng nhọc, độc hại, nguy hiểm</i> hoặc ở những nơi ảnh hưởng xấu đến nhân cách.',
      '💡 Quy định này nhằm <code>bảo vệ sức khoẻ và sự phát triển</code> của người chưa thành niên.',
      '⚠️ Thực tập, học nghề, đi học là những hoạt động phù hợp, được khuyến khích.',
    ], ['Sai — thực tập phù hợp được phép.', 'Đúng — cấm dùng lao động dưới 18 tuổi làm công việc nặng nhọc, độc hại.', 'Sai — học nghề là hoạt động được khuyến khích.', 'Sai — đi học là quyền và nghĩa vụ, không bị cấm.']),
    Q('Hướng nghiệp giúp HS?', ['Chọn nghề phù hợp năng lực, sở thích, nhu cầu XH', 'Chỉ chọn theo bố mẹ', 'Bị ép chọn nghề', 'Không cần'], 0, 'Hướng nghiệp giúp HS hiểu mình, hiểu nghề và xã hội để chọn nghề phù hợp.', [
      '<b>Hướng nghiệp</b> giúp học sinh <i>hiểu mình</i> (năng lực, sở thích, tính cách), <i>hiểu nghề</i> và <i>hiểu nhu cầu của xã hội</i> để chọn được nghề phù hợp.',
      'Chọn nghề đúng giúp mỗi người <code>phát huy năng lực</code>, làm việc hiệu quả và hạnh phúc với nghề.',
      '⚠️ Hướng nghiệp là định hướng, gợi mở — không phải ép buộc hay chỉ chọn theo ý bố mẹ.',
    ], ['Đúng — hướng nghiệp giúp HS chọn nghề phù hợp năng lực, sở thích, nhu cầu xã hội.', 'Sai — chọn nghề cần cân nhắc bản thân, không chỉ theo bố mẹ.', 'Sai — hướng nghiệp là định hướng, không phải ép buộc.', 'Sai — hướng nghiệp rất cần thiết cho tương lai HS.']),
  ]),

  M(30, 'Hôn nhân và gia đình', [
    Q('Tuổi kết hôn theo Luật?', ['Nam ≥18, nữ ≥16', 'Cả hai ≥18', 'Nam ≥22, nữ ≥20', 'Nam ≥20, nữ ≥18'], 3, 'Luật HN&GĐ 2014: nam đủ 20, nữ đủ 18.', [
      'Theo <b>Luật Hôn nhân và Gia đình 2014</b>, tuổi kết hôn là: <i>nam từ đủ 20 tuổi trở lên, nữ từ đủ 18 tuổi trở lên</i>.',
      '💡 Đủ tuổi kết hôn còn phải bảo đảm <code>tự nguyện</code> và không thuộc các trường hợp bị cấm.',
      '⚠️ Kết hôn khi chưa đủ tuổi luật định gọi là <b>tảo hôn</b> — bị nghiêm cấm.',
    ], ['Sai — quy định này thấp hơn luật, không đúng.', 'Sai — nam phải đủ 20, không phải 18.', 'Sai — quy định này cao hơn luật định.', 'Đúng — Luật HN&GĐ 2014: nam đủ 20, nữ đủ 18.']),
    Q('Nguyên tắc hôn nhân ở VN?', ['Tự nguyện, một vợ một chồng, bình đẳng', 'Cha mẹ đặt đâu con ngồi đấy', 'Bị ép buộc', 'Đa thê'], 0, 'Nguyên tắc: tự nguyện, tiến bộ, một vợ một chồng, bình đẳng vợ chồng.', [
      '<b>Nguyên tắc cơ bản của chế độ hôn nhân ở Việt Nam</b>: <i>tự nguyện, tiến bộ, một vợ một chồng, vợ chồng bình đẳng</i>.',
      'Hôn nhân phải dựa trên <code>tình yêu chân chính, sự tự nguyện</code> của hai bên, không bị ép buộc hay vụ lợi.',
      '⚠️ "Cha mẹ đặt đâu con ngồi đấy", ép buộc, đa thê đều trái với nguyên tắc hôn nhân tiến bộ.',
    ], ['Đúng — nguyên tắc hôn nhân là tự nguyện, một vợ một chồng, bình đẳng.', 'Sai — cha mẹ áp đặt là trái với nguyên tắc tự nguyện.', 'Sai — ép buộc kết hôn bị pháp luật nghiêm cấm.', 'Sai — đa thê trái với nguyên tắc một vợ một chồng.']),
    Q('Tảo hôn là?', ['Kết hôn đúng tuổi', 'Kết hôn muộn', 'Sống thử', 'Kết hôn khi chưa đủ tuổi luật định'], 3, 'Tảo hôn = kết hôn khi chưa đủ tuổi theo luật, bị nghiêm cấm.', [
      '<b>Tảo hôn</b> là việc <i>lấy vợ, lấy chồng khi một bên hoặc cả hai bên chưa đủ tuổi kết hôn</i> theo quy định pháp luật.',
      'Tảo hôn bị <code>nghiêm cấm</code> vì gây nhiều hệ luỵ: ảnh hưởng sức khoẻ (đặc biệt với nữ), gián đoạn học hành, đói nghèo, bất ổn gia đình.',
      '💡 Tảo hôn vẫn còn tồn tại ở một số vùng — cần tuyên truyền để xoá bỏ.',
    ], ['Sai — kết hôn đúng tuổi là hợp pháp, không phải tảo hôn.', 'Sai — kết hôn muộn không phải là tảo hôn.', 'Sai — sống thử là khái niệm khác, không phải tảo hôn.', 'Đúng — tảo hôn là kết hôn khi chưa đủ tuổi luật định, bị nghiêm cấm.']),
    Q('Quan hệ vợ chồng dựa trên?', ['Lợi ích kinh tế', 'Tình yêu, sự tôn trọng, bình đẳng', 'Sợ hãi', 'Bạo lực'], 1, 'Quan hệ vợ chồng lành mạnh xây trên tình yêu, tôn trọng, bình đẳng.', [
      '<b>Quan hệ vợ chồng</b> lành mạnh được xây dựng trên nền tảng <i>tình yêu thương, sự tôn trọng, chung thuỷ và bình đẳng</i>.',
      'Vợ chồng có <code>quyền và nghĩa vụ ngang nhau</code> về mọi mặt trong gia đình; cùng nhau chia sẻ, gánh vác công việc.',
      '⚠️ Quan hệ vợ chồng dựa trên vụ lợi, sợ hãi hay bạo lực đều không bền vững và bị pháp luật điều chỉnh.',
    ], ['Sai — quan hệ chỉ vì lợi ích kinh tế là vụ lợi.', 'Đúng — quan hệ vợ chồng lành mạnh dựa trên tình yêu, tôn trọng, bình đẳng.', 'Sai — sợ hãi không phải nền tảng của hôn nhân hạnh phúc.', 'Sai — bạo lực phá hỏng hôn nhân, bị pháp luật cấm.']),
    Q('Hôn nhân cận huyết bị?', ['Tuỳ chọn', 'Cho phép', 'Cấm tuyệt đối', 'Khuyến khích'], 2, 'Luật cấm kết hôn trong phạm vi 3 đời (gây dị tật di truyền cho con).', [
      'Pháp luật <b>cấm kết hôn giữa những người có cùng dòng máu về trực hệ</b>; giữa những người có họ trong phạm vi <i>ba đời</i>.',
      'Lý do: hôn nhân cận huyết làm <code>tăng nguy cơ bệnh tật, dị tật di truyền</code> cho con cái, suy giảm chất lượng giống nòi.',
      '💡 Đây là một trong những điều kiện bắt buộc để kết hôn hợp pháp.',
    ], ['Sai — hôn nhân cận huyết không phải là việc tuỳ chọn.', 'Sai — pháp luật không cho phép hôn nhân cận huyết.', 'Đúng — hôn nhân cận huyết (trong phạm vi 3 đời) bị cấm tuyệt đối.', 'Sai — hôn nhân cận huyết bị cấm, không được khuyến khích.']),
  ]),

  M(31, 'Tôn trọng và học hỏi văn hoá các dân tộc Việt Nam', [
    Q('Việt Nam có bao nhiêu dân tộc?', ['55', '50', '53', '54 dân tộc'], 3, 'VN có 54 dân tộc anh em, Kinh là đa số (~85%).', [
      'Việt Nam là quốc gia <b>đa dân tộc</b> với <i>54 dân tộc anh em</i> cùng chung sống.',
      'Dân tộc <code>Kinh</code> chiếm đa số (khoảng 85% dân số); 53 dân tộc còn lại là các dân tộc thiểu số (Tày, Thái, Mường, Khmer, H’Mông, Dao…).',
      '💡 Khối đại đoàn kết các dân tộc là nguồn sức mạnh to lớn của đất nước.',
    ], ['Sai — VN có 54 dân tộc, không phải 55.', 'Sai — con số chính xác là 54 dân tộc.', 'Sai — VN có 54 dân tộc, không phải 53.', 'Đúng — Việt Nam có 54 dân tộc anh em, Kinh là đa số.']),
    Q('Văn hoá các dân tộc VN có đặc điểm?', ['Đa dạng, thống nhất trong sự khác biệt', 'Đồng nhất', 'Chỉ do dân tộc Kinh tạo nên', 'Đối lập nhau'], 0, 'Văn hoá VN đa dạng (54 dân tộc) nhưng thống nhất trong cộng đồng VN.', [
      'Nền văn hoá Việt Nam có đặc điểm <b>thống nhất trong đa dạng</b>: mỗi dân tộc có bản sắc, phong tục, trang phục, lễ hội, ngôn ngữ riêng, nhưng cùng hoà chung trong nền văn hoá dân tộc Việt Nam.',
      '💡 Văn hoá Việt Nam là <code>thành quả chung của cả 54 dân tộc</code>, bổ sung và làm phong phú lẫn nhau.',
      '⚠️ Các nền văn hoá dân tộc không đối lập mà hoà hợp, làm giàu cho nhau.',
    ], ['Đúng — văn hoá VN đa dạng nhưng thống nhất trong cộng đồng các dân tộc.', 'Sai — văn hoá VN đa dạng, không đồng nhất.', 'Sai — văn hoá VN do cả 54 dân tộc tạo nên.', 'Sai — văn hoá các dân tộc bổ sung nhau, không đối lập.']),
    Q('Tôn trọng văn hoá dân tộc thiểu số thể hiện qua?', ['Kỳ thị', 'Bắt theo văn hoá Kinh', 'Học tiếng, hiểu phong tục, không kỳ thị', 'Phớt lờ'], 2, 'Tôn trọng = học hỏi, hiểu phong tục, không kỳ thị, hỗ trợ bảo tồn.', [
      '<b>Tôn trọng văn hoá các dân tộc thiểu số</b> thể hiện qua: <i>tìm hiểu, học hỏi ngôn ngữ, phong tục, lễ hội</i>; trân trọng giá trị văn hoá của họ; <code>không kỳ thị, không phân biệt đối xử</code>; góp phần bảo tồn, phát huy.',
      '⚠️ Kỳ thị, ép theo văn hoá khác, hay phớt lờ đều là biểu hiện <b>thiếu tôn trọng</b>.',
      '💡 Mỗi nền văn hoá đều có giá trị riêng đáng quý.',
    ], ['Sai — kỳ thị là trái với tôn trọng.', 'Sai — ép theo văn hoá Kinh là xoá bỏ bản sắc dân tộc khác.', 'Đúng — học tiếng, hiểu phong tục, không kỳ thị là tôn trọng văn hoá dân tộc thiểu số.', 'Sai — phớt lờ là thờ ơ, không phải tôn trọng.']),
    Q('Ngày Văn hoá các dân tộc VN?', ['2/9', '20/11', '19/4', '30/4'], 2, '19/4 là Ngày Văn hoá các dân tộc Việt Nam.', [
      'Ngày <b>19/4</b> hằng năm là <i>Ngày Văn hoá các dân tộc Việt Nam</i>, nhằm tôn vinh và phát huy giá trị văn hoá của 54 dân tộc anh em.',
      '💡 Phân biệt với các ngày kỷ niệm khác: <code>2/9</code> (Quốc khánh), <code>20/11</code> (Nhà giáo Việt Nam), <code>30/4</code> (Giải phóng miền Nam).',
    ], ['Sai — 2/9 là Quốc khánh.', 'Sai — 20/11 là Ngày Nhà giáo Việt Nam.', 'Đúng — 19/4 là Ngày Văn hoá các dân tộc Việt Nam.', 'Sai — 30/4 là Ngày Giải phóng miền Nam.']),
    Q('Hành vi vi phạm?', ['Bảo tồn ngôn ngữ', 'Kỳ thị, miệt thị dân tộc thiểu số', 'Giúp đỡ vùng cao', 'Học hỏi văn hoá khác'], 1, 'Kỳ thị, gây chia rẽ dân tộc bị Hiến pháp và pháp luật nghiêm cấm.', [
      'Hiến pháp và pháp luật <b>nghiêm cấm mọi hành vi kỳ thị, chia rẽ dân tộc</b>: miệt thị, phân biệt đối xử, gây hằn thù giữa các dân tộc.',
      'Các dân tộc Việt Nam <i>bình đẳng, đoàn kết, tôn trọng và giúp đỡ nhau</i> cùng phát triển.',
      '💡 Bảo tồn ngôn ngữ, giúp đỡ vùng cao, học hỏi văn hoá khác là những việc làm <code>đúng đắn, đáng quý</code>.',
    ], ['Sai — bảo tồn ngôn ngữ dân tộc là việc làm tốt.', 'Đúng — kỳ thị, miệt thị dân tộc thiểu số bị pháp luật nghiêm cấm.', 'Sai — giúp đỡ vùng cao là hành động đáng quý.', 'Sai — học hỏi văn hoá khác là điều tích cực.']),
  ]),

  M(32, 'Trách nhiệm với cộng đồng và xã hội', [
    Q('Trách nhiệm với cộng đồng là?', ['Tránh né', 'Chỉ lo bản thân', 'Sống ích kỷ', 'Sống có ích, đóng góp xây dựng cộng đồng'], 3, 'Trách nhiệm cộng đồng = sống có ích, đóng góp xây dựng cộng đồng/xã hội.', [
      '<b>Cộng đồng</b> là toàn thể những người cùng sống, có những điểm giống nhau, gắn bó thành một khối trong sinh hoạt xã hội.',
      '<b>Trách nhiệm với cộng đồng</b> là sống <i>có ích, quan tâm, đóng góp công sức</i> xây dựng cộng đồng, xã hội ngày càng tốt đẹp.',
      '⚠️ Tránh né, chỉ lo bản thân, sống ích kỷ là <code>thiếu trách nhiệm cộng đồng</code>.',
    ], ['Sai — tránh né là thiếu trách nhiệm với cộng đồng.', 'Sai — chỉ lo bản thân là ích kỷ.', 'Sai — sống ích kỷ là trái với trách nhiệm cộng đồng.', 'Đúng — trách nhiệm cộng đồng là sống có ích, đóng góp xây dựng cộng đồng.']),
    Q('HS có thể đóng góp bằng?', ['Chỉ quyên góp tiền khi có thiên tai', 'Im lặng', 'Tham gia thiện nguyện, bảo vệ môi trường, tuyên truyền', 'Không quan tâm'], 2, 'HS đóng góp qua hoạt động tình nguyện, bảo vệ MT, tuyên truyền văn minh.', [
      'Học sinh có thể đóng góp cho cộng đồng bằng nhiều việc <b>phù hợp lứa tuổi</b>:',
      '<ul><li>Tham gia <i>hoạt động thiện nguyện</i>, giúp đỡ người khó khăn.</li><li><code>Bảo vệ môi trường</code> (dọn vệ sinh, trồng cây).</li><li><i>Tuyên truyền</i> nếp sống văn minh, an toàn giao thông, phòng chống tệ nạn.</li></ul>',
      '💡 Đóng góp không chỉ là tiền bạc, mà còn là công sức, thời gian, ý tưởng.',
    ], ['Sai — đóng góp không chỉ là quyên tiền khi có thiên tai.', 'Sai — im lặng không phải là cách đóng góp.', 'Đúng — HS đóng góp qua thiện nguyện, bảo vệ môi trường, tuyên truyền.', 'Sai — thờ ơ là thiếu trách nhiệm với cộng đồng.']),
    Q('Tình nguyện viên là?', ['Người bị ép', 'Cán bộ nhà nước', 'Người được trả lương', 'Người tự nguyện làm việc vì cộng đồng, không vì lợi ích cá nhân'], 3, 'TNV tự nguyện, không vì lợi ích vật chất, làm việc vì cộng đồng.', [
      '<b>Tình nguyện viên</b> là người <i>tự nguyện</i> tham gia các hoạt động vì lợi ích cộng đồng, xã hội mà <code>không vì lợi ích vật chất</code> cho bản thân.',
      'Tinh thần tình nguyện thể hiện <i>lòng nhân ái, trách nhiệm xã hội</i> và sự sẻ chia.',
      '💡 Làm tình nguyện cũng giúp bản thân trưởng thành, mở rộng hiểu biết và quan hệ.',
    ], ['Sai — tình nguyện là tự nguyện, không bị ép.', 'Sai — tình nguyện viên không nhất thiết là cán bộ nhà nước.', 'Sai — tình nguyện không vì tiền lương.', 'Đúng — tình nguyện viên tự nguyện làm việc vì cộng đồng, không vì lợi ích cá nhân.']),
    Q('Mùa hè xanh, tiếp sức mùa thi là?', ['Khoá học', 'Cuộc thi', 'Hoạt động kinh doanh', 'Hoạt động TN của sinh viên'], 3, 'Đây là phong trào tình nguyện do Đoàn TN tổ chức hằng năm.', [
      '<b>Mùa hè xanh, Tiếp sức mùa thi</b> là những <i>phong trào, hoạt động tình nguyện</i> tiêu biểu của thanh niên, sinh viên do <code>Đoàn Thanh niên</code> tổ chức hằng năm.',
      'Các hoạt động này giúp đỡ cộng đồng (xây cầu đường, dạy học vùng khó khăn, hỗ trợ thí sinh đi thi…) và lan toả tinh thần xung kích, tình nguyện.',
      '💡 Đây là biểu hiện sinh động của trách nhiệm với cộng đồng.',
    ], ['Sai — đây không phải là khoá học.', 'Sai — đây không phải là cuộc thi.', 'Sai — đây không phải hoạt động kinh doanh.', 'Đúng — Mùa hè xanh, Tiếp sức mùa thi là hoạt động tình nguyện của sinh viên.']),
    Q('Ý nghĩa hoạt động cộng đồng với HS?', ['Rèn kỹ năng, lòng nhân ái, có ích cho xã hội', 'Chỉ để cộng điểm thi đua, không có ý nghĩa khác', 'Tốn tiền', 'Mất thời gian'], 0, 'Hoạt động cộng đồng giúp HS trưởng thành, rèn kỹ năng và tinh thần nhân ái.', [
      '<b>Ý nghĩa của hoạt động cộng đồng</b> với học sinh:',
      '<ul><li><i>Rèn luyện kỹ năng sống</i>: giao tiếp, làm việc nhóm, giải quyết vấn đề.</li><li>Bồi dưỡng <code>lòng nhân ái, tinh thần trách nhiệm</code>.</li><li>Trở thành người <i>có ích cho gia đình và xã hội</i>.</li></ul>',
      '💡 Giá trị của hoạt động cộng đồng lớn hơn nhiều việc "cộng điểm thi đua".',
    ], ['Đúng — hoạt động cộng đồng giúp HS rèn kỹ năng, lòng nhân ái, có ích cho xã hội.', 'Sai — ý nghĩa lớn hơn nhiều việc cộng điểm thi đua.', 'Sai — hoạt động cộng đồng là đầu tư ý nghĩa, không phí tiền.', 'Sai — thời gian dành cho cộng đồng là rất đáng giá.']),
  ]),

  M(33, 'Bảo vệ môi trường và tài nguyên thiên nhiên', [
    Q('Môi trường gồm?', ['Chỉ không khí', 'Chỉ tự nhiên', 'Chỉ nhân tạo', 'Yếu tố tự nhiên và nhân tạo bao quanh con người'], 3, 'Môi trường = tổng thể yếu tố tự nhiên (đất, nước, không khí…) và nhân tạo (nhà, đường…).', [
      '<b>Môi trường</b> là <i>toàn bộ các điều kiện tự nhiên và nhân tạo bao quanh con người</i>, có tác động đến đời sống, sự tồn tại và phát triển của con người, thiên nhiên.',
      '<ul><li>Yếu tố <b>tự nhiên</b>: đất, nước, không khí, rừng, động thực vật…</li><li>Yếu tố <b>nhân tạo</b>: nhà cửa, đường sá, công trình do con người tạo ra.</li></ul>',
    ], ['Sai — môi trường không chỉ là không khí.', 'Sai — môi trường gồm cả yếu tố tự nhiên lẫn nhân tạo.', 'Sai — môi trường không chỉ là yếu tố nhân tạo.', 'Đúng — môi trường gồm yếu tố tự nhiên và nhân tạo bao quanh con người.']),
    Q('Tài nguyên không tái tạo gồm?', ['Gió, mặt trời', 'Nước, rừng', 'Dầu mỏ, than, khoáng sản', 'Nước ngầm và không khí sạch'], 2, 'TN không tái tạo cạn kiệt khi sử dụng: dầu mỏ, than, khoáng sản.', [
      '<b>Tài nguyên thiên nhiên</b> chia thành hai loại:',
      '<ul><li><b>Tài nguyên tái tạo</b>: có thể phục hồi (gió, ánh sáng mặt trời, nước, rừng nếu khai thác hợp lý).</li><li><b>Tài nguyên không tái tạo</b>: <i>cạn kiệt khi sử dụng</i>, không phục hồi được — <code>dầu mỏ, than đá, khoáng sản</code>.</li></ul>',
      '💡 Vì vậy phải khai thác, sử dụng tài nguyên một cách <b>tiết kiệm, hợp lý</b>.',
    ], ['Sai — gió, mặt trời là tài nguyên tái tạo, vô tận.', 'Sai — nước, rừng có thể tái tạo nếu khai thác hợp lý.', 'Đúng — dầu mỏ, than, khoáng sản là tài nguyên không tái tạo, cạn kiệt khi dùng.', 'Sai — không khí sạch có thể phục hồi, không thuộc nhóm không tái tạo điển hình.']),
    Q('Bảo vệ MT là trách nhiệm của?', ['Mọi người', 'Chỉ ngành môi trường', 'Doanh nghiệp', 'Chỉ chính phủ'], 0, 'Bảo vệ MT là trách nhiệm chung của toàn xã hội theo Luật BVMT.', [
      'Theo <b>Luật Bảo vệ môi trường</b>, bảo vệ môi trường là <i>trách nhiệm và nghĩa vụ của mọi cơ quan, tổ chức, hộ gia đình và cá nhân</i>.',
      '💡 Môi trường là "ngôi nhà chung", nên <code>mọi người đều có trách nhiệm</code> gìn giữ — không riêng ngành môi trường, doanh nghiệp hay chính phủ.',
    ], ['Đúng — bảo vệ môi trường là trách nhiệm chung của mọi người.', 'Sai — không chỉ ngành môi trường mà tất cả đều có trách nhiệm.', 'Sai — không chỉ doanh nghiệp mà toàn xã hội.', 'Sai — không chỉ chính phủ mà mọi công dân đều phải tham gia.']),
    Q('HS có thể bảo vệ MT bằng?', ['Trồng cây, không xả rác, tiết kiệm điện nước', 'Phá rừng', 'Xả nước thừa', 'Đốt rác bừa bãi'], 0, 'HS đóng góp qua hành động nhỏ: phân loại rác, tiết kiệm điện nước, trồng cây.', [
      'Học sinh bảo vệ môi trường bằng những <b>hành động nhỏ hằng ngày</b>:',
      '<ul><li><code>Trồng và chăm sóc cây xanh</code>.</li><li>Bỏ rác đúng nơi, <i>phân loại rác</i>, không xả rác bừa bãi.</li><li><code>Tiết kiệm điện, nước</code>; hạn chế dùng đồ nhựa một lần.</li></ul>',
      '⚠️ Phá rừng, xả nước thừa, đốt rác bừa bãi là những hành vi gây hại môi trường.',
    ], ['Đúng — HS bảo vệ môi trường bằng trồng cây, không xả rác, tiết kiệm điện nước.', 'Sai — phá rừng là phá hoại môi trường.', 'Sai — xả nước thừa là lãng phí tài nguyên.', 'Sai — đốt rác bừa bãi gây ô nhiễm không khí.']),
    Q('Ngày Môi trường thế giới?', ['22/4', '5/6', '8/3', '21/3'], 1, '5/6 là Ngày Môi trường thế giới.', [
      'Ngày <b>5/6</b> hằng năm là <i>Ngày Môi trường thế giới</i> (World Environment Day), do Liên Hợp Quốc phát động nhằm nâng cao nhận thức và hành động bảo vệ môi trường.',
      '💡 Phân biệt với các ngày khác: <code>22/4</code> (Ngày Trái Đất), <code>21/3</code> (Ngày Quốc tế về rừng), <code>8/3</code> (Quốc tế Phụ nữ).',
    ], ['Sai — 22/4 là Ngày Trái Đất.', 'Đúng — 5/6 là Ngày Môi trường thế giới.', 'Sai — 8/3 là Ngày Quốc tế Phụ nữ.', 'Sai — 21/3 là Ngày Quốc tế về rừng.']),
  ]),

  M(34, 'Phòng chống tội phạm vị thành niên', [
    Q('Người chưa thành niên là?', ['Dưới 14', 'Dưới 21', 'Dưới 18 tuổi', 'Dưới 16'], 2, 'Theo luật VN: người chưa thành niên là người dưới 18 tuổi.', [
      'Theo pháp luật Việt Nam, <b>người chưa thành niên</b> là người <i>chưa đủ 18 tuổi</i>.',
      'Người chưa thành niên được pháp luật <code>bảo vệ đặc biệt</code> và cũng chịu trách nhiệm pháp lý theo những quy định riêng, phù hợp với lứa tuổi.',
    ], ['Sai — mốc chưa thành niên là dưới 18, không phải 14.', 'Sai — mốc là dưới 18 tuổi, không phải 21.', 'Đúng — theo luật VN, người chưa thành niên là người dưới 18 tuổi.', 'Sai — mốc chưa thành niên là dưới 18, không phải 16.']),
    Q('Tuổi chịu trách nhiệm hình sự?', ['12 tuổi', '21 tuổi', '18 tuổi', 'Từ 14 tuổi (với tội rất nghiêm trọng), 16 tuổi (mọi tội)'], 3, 'BLHS: từ 14 phải chịu TNHS với tội rất nghiêm trọng/đặc biệt nghiêm trọng; từ 16 với mọi tội.', [
      'Theo <b>Bộ luật Hình sự</b>:',
      '<ul><li>Người từ đủ <code>14 đến dưới 16 tuổi</code> phải chịu trách nhiệm hình sự về <i>tội rất nghiêm trọng, đặc biệt nghiêm trọng</i> (một số tội danh).</li><li>Người từ đủ <code>16 tuổi trở lên</code> phải chịu trách nhiệm hình sự về <i>mọi tội phạm</i>.</li></ul>',
      '⚠️ "Trẻ con không bị xử lý" là quan niệm sai — pháp luật vẫn có chế tài với người chưa thành niên phạm tội.',
    ], ['Sai — 12 tuổi chưa phải chịu trách nhiệm hình sự.', 'Sai — 21 tuổi không phải mốc tuổi này.', 'Sai — 18 tuổi không phải mốc bắt đầu chịu trách nhiệm hình sự.', 'Đúng — từ 14 tuổi chịu TNHS với tội rất nghiêm trọng, từ 16 tuổi với mọi tội.']),
    Q('Nguyên nhân tội phạm vị thành niên?', ['Do số phận', 'Do tài năng', 'Thiếu giáo dục, bạn xấu, thiếu hiểu biết pháp luật', 'Do may mắn'], 2, 'Nguyên nhân chính: gia đình thiếu quan tâm, bạn bè xấu, thiếu giáo dục PL, tệ nạn XH.', [
      '<b>Nguyên nhân dẫn đến tội phạm vị thành niên</b>:',
      '<ul><li>Gia đình <i>thiếu quan tâm, giáo dục</i> hoặc nuông chiều, bạo lực.</li><li>Bị <code>bạn xấu lôi kéo</code>, sa vào tệ nạn xã hội.</li><li><i>Thiếu hiểu biết pháp luật</i>, thiếu kỹ năng từ chối.</li></ul>',
      '💡 Hiểu nguyên nhân giúp ta biết cách phòng tránh từ sớm.',
    ], ['Sai — không phải do số phận mà do nhiều yếu tố giáo dục, môi trường.', 'Sai — tài năng không phải nguyên nhân dẫn đến phạm tội.', 'Đúng — nguyên nhân chính là thiếu giáo dục, bạn xấu, thiếu hiểu biết pháp luật.', 'Sai — may mắn không liên quan đến nguyên nhân phạm tội.']),
    Q('HS phòng tránh bằng cách?', ['Không cần đề phòng', 'Thử cho biết', 'Theo bạn xấu', 'Chọn bạn tốt, học pháp luật, tránh xa tệ nạn'], 3, 'Chọn bạn tốt, hiểu pháp luật, tham gia hoạt động lành mạnh để phòng tránh.', [
      '<b>Cách phòng tránh tội phạm vị thành niên</b>:',
      '<ul><li><i>Chọn bạn tốt</i>, tránh xa bạn xấu và các nhóm rủ rê.</li><li><code>Học tập, tìm hiểu pháp luật</code> để biết điều nên và không nên làm.</li><li>Tránh xa tệ nạn xã hội; tham gia hoạt động lành mạnh.</li><li>Khi gặp khó khăn, biết tìm đến người lớn tin cậy.</li></ul>',
      '⚠️ "Thử cho biết", theo bạn xấu là con đường dẫn đến vi phạm.',
    ], ['Sai — chủ quan không đề phòng dễ sa ngã.', 'Sai — \'thử cho biết\' là con đường dẫn đến vi phạm.', 'Sai — theo bạn xấu dễ bị lôi kéo phạm tội.', 'Đúng — chọn bạn tốt, học pháp luật, tránh xa tệ nạn là cách phòng tránh.']),
    Q('Khi bạn rủ vi phạm pháp luật, em sẽ?', ['Sợ bị bạn ghét nên đồng ý', 'Tham gia cho vui', 'Từ chối, khuyên bạn dừng lại', 'Im lặng'], 2, 'Kiên quyết từ chối và khuyên bạn — bảo vệ chính mình và giúp bạn.', [
      'Khi bị bạn rủ rê làm điều vi phạm pháp luật, người có bản lĩnh sẽ <b>kiên quyết từ chối</b> và <i>khuyên bạn dừng lại</i>.',
      'Cần thiết thì <code>báo cho người lớn tin cậy</code> để ngăn bạn và bảo vệ chính mình.',
      '⚠️ Đồng ý vì sợ mất lòng bạn, tham gia "cho vui" hay im lặng đều khiến mình bị cuốn vào vi phạm.',
    ], ['Sai — đồng ý vì sợ mất lòng bạn là thiếu bản lĩnh.', 'Sai — tham gia \'cho vui\' là tự đưa mình vào vi phạm.', 'Đúng — kiên quyết từ chối và khuyên bạn dừng lại để bảo vệ cả hai.', 'Sai — im lặng là gián tiếp đồng tình với cái sai.']),
  ]),

  M(35, 'Ôn tập cuối năm', [
    Q('Quyền sở hữu tài sản gồm?', ['2 quyền', 'Chỉ sử dụng', 'Chiếm hữu, sử dụng, định đoạt', 'Chỉ định đoạt'], 2, '3 quyền năng của sở hữu.', [
      'Ôn lại: <b>Quyền sở hữu tài sản</b> gồm <b>3 quyền năng</b> — <code>chiếm hữu</code> (nắm giữ), <code>sử dụng</code> (khai thác công dụng), <code>định đoạt</code> (quyết định số phận tài sản).',
      '💡 Đi đôi với quyền là nghĩa vụ <i>tôn trọng tài sản của người khác</i>.',
    ], ['Sai — quyền sở hữu gồm 3 quyền năng, không phải 2.', 'Sai — sử dụng chỉ là một trong ba quyền năng.', 'Đúng — quyền sở hữu gồm chiếm hữu, sử dụng và định đoạt.', 'Sai — định đoạt chỉ là một quyền năng, chưa đủ.']),
    Q('Tuổi bầu cử ở VN?', ['18', '25', '21', '16'], 0, 'Hiến pháp 2013.', [
      'Ôn lại: Theo Hiến pháp 2013, công dân <b>đủ 18 tuổi</b> trở lên có quyền <i>bầu cử</i>; <b>đủ 21 tuổi</b> trở lên có quyền <i>ứng cử</i>.',
      '💡 Ghi nhớ cặp số: <code>18 — bầu cử</code>, <code>21 — ứng cử</code>.',
    ], ['Đúng — công dân đủ 18 tuổi có quyền bầu cử.', 'Sai — 25 tuổi không phải mốc bầu cử.', 'Sai — 21 tuổi là tuổi ứng cử, không phải bầu cử.', 'Sai — 16 tuổi chưa đủ tuổi bầu cử.']),
    Q('Nhà nước VN có bao nhiêu cấp?', ['5', '4', '3', '2'], 1, 'TƯ, tỉnh, huyện, xã.', [
      'Ôn lại: Bộ máy Nhà nước Việt Nam có <b>4 cấp</b> — <code>Trung ương, tỉnh, huyện, xã</code>.',
      '💡 Cấp <i>xã/phường/thị trấn</i> là cấp cơ sở, gần dân nhất, gồm HĐND và UBND.',
    ], ['Sai — bộ máy nhà nước có 4 cấp, không phải 5.', 'Đúng — nhà nước có 4 cấp: Trung ương, tỉnh, huyện, xã.', 'Sai — không phải 3 cấp.', 'Sai — không phải 2 cấp.']),
    Q('Tuổi kết hôn của nữ?', ['20', 'Đủ 18', '16', '21'], 1, 'Luật HN&GĐ.', [
      'Ôn lại: Theo Luật Hôn nhân và Gia đình 2014, tuổi kết hôn là <i>nam từ đủ 20</i>, <b>nữ từ đủ 18</b>.',
      '⚠️ Kết hôn khi chưa đủ tuổi là <code>tảo hôn</code> — bị pháp luật nghiêm cấm.',
    ], ['Sai — 20 tuổi là tuổi kết hôn của nam.', 'Đúng — nữ đủ 18 tuổi mới được kết hôn theo Luật HN&GĐ.', 'Sai — 16 tuổi chưa đủ tuổi kết hôn, là tảo hôn.', 'Sai — 21 tuổi cao hơn quy định với nữ.']),
    Q('Khi nhặt được của rơi, em nên?', ['Chia bạn bè', 'Vứt đi', 'Giữ làm của riêng', 'Trả lại chủ hoặc giao công an'], 3, 'Thể hiện liêm khiết và tôn trọng sở hữu của người khác.', [
      'Ôn lại: Nhặt được của rơi phải <b>tìm cách trả lại chủ hoặc giao cho công an, chính quyền</b>.',
      'Hành vi này thể hiện cả phẩm chất <code>liêm khiết</code> lẫn nghĩa vụ <i>tôn trọng quyền sở hữu</i> tài sản của người khác.',
      '💡 "Đói cho sạch, rách cho thơm" — giữ phẩm giá ngay cả khi không ai biết.',
    ], ['Sai — chia tài sản của người khác cho bạn bè vẫn là chiếm đoạt.', 'Sai — vứt đi gây thiệt hại cho người mất.', 'Sai — giữ làm của riêng là chiếm đoạt tài sản người khác.', 'Đúng — trả lại chủ hoặc giao công an thể hiện liêm khiết, tôn trọng sở hữu.']),
  ]),

  M(36, 'Kết thúc GDCD 8 — Công dân trẻ với đạo đức và pháp luật', [
    Q('Văn bản pháp lí CAO NHẤT của nước Cộng hoà xã hội chủ nghĩa Việt Nam là gì?',
      ['Bộ luật Hình sự', 'Nghị định của Chính phủ', 'Hiến pháp', 'Luật Giáo dục'],
      2,
      'Hiến pháp là văn bản pháp lí cao nhất; mọi luật và văn bản khác phải phù hợp Hiến pháp.',
      ['Hệ thống pháp luật Việt Nam có <b>thứ bậc</b>, và <b>Hiến pháp</b> đứng ở đỉnh.',
       'Thứ bậc từ cao xuống thấp:<ul><li><b>Hiến pháp</b> — văn bản pháp lí cao nhất</li><li>các <b>bộ luật, luật</b> do Quốc hội ban hành (Hình sự, Dân sự, Giáo dục…)</li><li><b>nghị định</b> của Chính phủ, thông tư của các bộ</li></ul>',
       'Nguyên tắc: <b>mọi văn bản dưới đều phải phù hợp với Hiến pháp</b>; văn bản nào trái Hiến pháp thì không có hiệu lực.'],
      ['Sai — Bộ luật Hình sự là một luật, vẫn dưới Hiến pháp.',
       'Sai — nghị định do Chính phủ ban hành, thấp hơn luật.',
       'Đúng — Hiến pháp là văn bản pháp lí cao nhất.',
       'Sai — Luật Giáo dục cũng phải phù hợp Hiến pháp.']),
    Q('Cơ quan nào thực hiện quyền LẬP PHÁP ở nước ta?',
      ['Quốc hội', 'Chính phủ', 'Toà án nhân dân', 'Viện kiểm sát'],
      0,
      'Quốc hội là cơ quan lập pháp; Chính phủ hành pháp; Toà án tư pháp.',
      ['Bộ máy nhà nước được tổ chức theo <b>ba nhóm quyền</b>, mỗi nhóm có cơ quan riêng.',
       '<ul><li><b>Lập pháp</b> — <b>Quốc hội</b>: làm ra Hiến pháp và luật</li><li><b>Hành pháp</b> — <b>Chính phủ</b>: tổ chức thực hiện pháp luật</li><li><b>Tư pháp</b> — <b>Toà án nhân dân</b>: xét xử</li></ul>',
       'Ngoài ra còn <b>bộ máy cấp cơ sở</b> (xã, phường, thị trấn) — nơi người dân tiếp xúc trực tiếp nhất khi làm giấy tờ, khai báo hay khiếu nại.'],
      ['Đúng — Quốc hội là cơ quan lập pháp.',
       'Sai — Chính phủ thực hiện quyền hành pháp.',
       'Sai — Toà án thực hiện quyền tư pháp (xét xử).',
       'Sai — Viện kiểm sát thực hành quyền công tố và kiểm sát hoạt động tư pháp.']),
    Q('Điểm khác nhau căn bản giữa vi phạm ĐẠO ĐỨC và vi phạm PHÁP LUẬT là gì?',
      ['Vi phạm đạo đức nặng hơn vi phạm pháp luật', 'Vi phạm pháp luật bị xử lí bằng chế tài (phạt tiền, giam giữ); vi phạm đạo đức chỉ bị dư luận lên án', 'Cả hai đều bị xử phạt như nhau', 'Vi phạm đạo đức chỉ xảy ra ở trẻ em'],
      1,
      'Vi phạm pháp luật có chế tài cưỡng chế của nhà nước; vi phạm đạo đức chỉ bị dư luận lên án.',
      ['Đạo đức và pháp luật là hai hệ thống <b>song hành</b> nhưng khác nhau ở <i>cách xử lí khi bị vi phạm</i>.',
       '<ul><li><b>Vi phạm đạo đức</b> — trái chuẩn mực xã hội nhưng <b>không có chế tài pháp lí</b>, chỉ bị dư luận lên án. Ví dụ: không nhường ghế cho người già trên xe buýt.</li><li><b>Vi phạm pháp luật</b> — trái quy định pháp luật, bị <b>xử lí bằng chế tài</b> (phạt tiền, giam giữ). Ví dụ: vượt đèn đỏ, trộm cắp.</li></ul>',
       'Lưu ý: một hành vi có thể <b>vừa vi phạm đạo đức vừa vi phạm pháp luật</b> — ví dụ bạo lực học đường.'],
      ['Sai — không so được "nặng hơn"; hai loại vi phạm khác nhau về bản chất xử lí.',
       'Đúng — khác nhau ở chỗ có chế tài cưỡng chế của nhà nước hay không.',
       'Sai — chỉ vi phạm pháp luật mới bị chế tài xử phạt.',
       'Sai — người ở mọi lứa tuổi đều có thể vi phạm đạo đức.']),
    Q('Bạn T. được một người bạn đưa cho đề thi trước ngày thi. Theo GDCD 8, T. nên làm gì?',
      ['Dùng đề đó vì không phải T. tự đi lấy', 'Im lặng, không dùng nhưng cũng không nói với ai', 'Chia cho vài bạn thân cùng ôn', 'Không sử dụng và báo với thầy cô về việc đề bị lộ'],
      3,
      'Không dùng đề lộ và báo thầy cô — đó là tôn trọng lẽ phải và liêm khiết.',
      ['Tình huống này chạm vào ba giá trị của GDCD 8: <b>liêm khiết</b>, <b>tôn trọng lẽ phải</b> và <b>giữ chữ tín</b>.',
       'Phân tích:<ul><li>dùng đề thi lộ là <b>gian lận</b>, vi phạm quy chế thi — dù không phải T. tự đi lấy</li><li>im lặng thì đề vẫn lộ với người khác, kì thi vẫn không công bằng</li><li>chia cho bạn bè là <b>lan rộng</b> hành vi sai</li><li>báo thầy cô là hành động <b>dũng cảm và đúng đắn</b>, giúp nhà trường xử lí kịp thời</li></ul>',
       'Thành tích không đến từ nỗ lực thật thì <i>không mang lại giá trị thật</i> — và sẽ sụp đổ ở kì thi tiếp theo.'],
      ['Sai — sử dụng đề lộ vẫn là gian lận, dù ai lấy.',
       'Sai — im lặng khiến kì thi tiếp tục không công bằng.',
       'Sai — chia cho bạn là lan rộng hành vi sai.',
       'Đúng — không sử dụng và báo thầy cô để xử lí kịp thời.']),
    Q('Theo pháp luật Việt Nam, từ bao nhiêu tuổi một người có thể phải chịu trách nhiệm HÌNH SỰ?',
      ['Từ 18 tuổi', 'Từ 16 tuổi', 'Từ 14 tuổi', 'Không có giới hạn tuổi'],
      2,
      'Từ đủ 14 tuổi, người vị thành niên có thể phải chịu trách nhiệm hình sự với một số tội nghiêm trọng.',
      ['Một hiểu sai phổ biến ở tuổi THCS là <i>"chưa 18 tuổi thì làm gì cũng không bị gì"</i>. Pháp luật <b>không</b> quy định như vậy.',
       'Về tội phạm vị thành niên:<ul><li>từ <b>đủ 14 tuổi</b> — có thể phải chịu <b>trách nhiệm hình sự</b> với một số tội rất nghiêm trọng và đặc biệt nghiêm trọng</li><li>từ <b>đủ 16 tuổi</b> — chịu trách nhiệm hình sự với các tội theo quy định chung</li><li>người chưa thành niên được áp dụng chính sách xử lí <i>nhân đạo hơn</i>, nhưng <b>không phải miễn trừ</b></li></ul>',
       'Đó là lí do GDCD 8 dạy phòng chống <b>tệ nạn xã hội</b> (cờ bạc, ma tuý), bạo lực học đường và bạo lực gia đình — hậu quả có thể là <i>pháp lí</i>, không chỉ là bị phê bình.'],
      ['Sai — không phải chờ đủ 18 tuổi mới chịu trách nhiệm hình sự.',
       'Sai — 16 tuổi là mốc chịu trách nhiệm theo quy định chung, nhưng mốc bắt đầu là 14.',
       'Đúng — từ đủ 14 tuổi với một số tội nghiêm trọng.',
       'Sai — pháp luật có quy định rõ về độ tuổi.']),
    Q('Quyền công dân luôn đi kèm với nghĩa vụ. Đâu là NGHĨA VỤ của công dân?',
      ['Nộp thuế, bảo vệ Tổ quốc, tuân thủ pháp luật', 'Khiếu nại và tố cáo', 'Tự do tín ngưỡng', 'Sở hữu tài sản'],
      0,
      'Nộp thuế, bảo vệ Tổ quốc và tuân thủ pháp luật là nghĩa vụ; các phương án còn lại là quyền.',
      ['GDCD 8 nhấn mạnh: <b>quyền và nghĩa vụ không thể tách rời</b>.',
       '<b>Quyền công dân cơ bản</b>:<ul><li>sở hữu tài sản</li><li><b>khiếu nại và tố cáo</b></li><li>tự do ngôn luận, <b>tự do tín ngưỡng</b></li><li>tham gia quản lí nhà nước</li></ul><b>Nghĩa vụ song hành</b>:<ul><li><b>nộp thuế</b></li><li><b>bảo vệ Tổ quốc</b></li><li><b>tuân thủ pháp luật</b></li></ul>',
       'Ở lớp 9, em sẽ học sâu hơn về <i>vi phạm pháp luật và trách nhiệm pháp lí</i> (hình sự, dân sự, hành chính, kỉ luật), quyền trẻ em theo Công ước Liên Hợp Quốc, quyền tự do kinh doanh, quyền lao động và quyền học tập.'],
      ['Đúng — đó là ba nghĩa vụ cơ bản của công dân.',
       'Sai — khiếu nại, tố cáo là quyền của công dân.',
       'Sai — tự do tín ngưỡng là quyền.',
       'Sai — sở hữu tài sản là quyền.']),
  ]),
];

export const S8GDCD_SCENARIOS = indexBy(S8GDCD_WEEKS);
