// ============================================================
// Lớp 1 · GDTC — Lý thuyết + Ví dụ cho 35 tuần (GDPT 2018)
// Key TRÙNG id quiz: "P1GDTC-wNN-quiz".
// Nội dung ngắn gọn, giọng cô giáo lớp 1 ấm áp, gọi "các em".
// ============================================================

export const P1GDTC_LESSONS = {
  // ──────────────── HK1 ────────────────
  'P1GDTC-w01-quiz': {
    topic: 'Làm quen môn GDTC',
    intro: 'Chào các em đến với giờ thể dục đầu tiên! Cô sẽ chỉ các em cách chuẩn bị và giữ an toàn khi tập nhé.',
    objectives: [
      'Biết trang phục phù hợp khi tập thể dục.',
      'Biết khởi động trước khi tập và uống nước đúng cách.',
    ],
    theory: [
      { h: 'Trang phục' },
      { ul: ['Đồng phục thể thao gọn gàng.', 'Giày thể thao có dây buộc.', 'Không đi dép lê, không đeo trang sức.'] },
      { h: 'Trước và sau khi tập' },
      { ul: ['Trước khi tập: khởi động làm nóng.', 'Sau khi tập: uống nước từng ngụm nhỏ.', 'Không tắm nước lạnh ngay sau tập.'] },
      { note: 'Khi cô/thầy ra hiệu lệnh, em phải lắng nghe và làm đúng nhé!' },
    ],
    examples: [
      { q: 'Em quên mang giày thể thao, làm sao?', a: 'Em báo cô để cô hướng dẫn. Cô có thể cho em tập nhẹ tại chỗ, không chạy nhảy mạnh. Lần sau em nhớ mang giày.' },
      { q: 'Sau khi chạy mệt, em làm gì?', a: 'Em đi bộ chậm vài bước cho hết hổn hển. Uống nước từng ngụm nhỏ. Không nằm phịch ra sân, không tắm lạnh ngay.' },
    ],
  },

  'P1GDTC-w02-quiz': {
    topic: 'Tư thế đứng nghiêm – đứng nghỉ',
    intro: 'Khẩu lệnh "Nghiêm!" và "Nghỉ!" rất quen thuộc. Cùng cô tập đúng tư thế nhé các em.',
    objectives: [
      'Đứng nghiêm đúng tư thế.',
      'Đứng nghỉ thoải mái, đúng cách.',
    ],
    theory: [
      { h: 'Đứng nghiêm' },
      { ul: ['Thân thẳng, ngực ưỡn nhẹ.', 'Hai tay áp sát thân.', 'Hai gót khép, mũi mở chữ V.', 'Mắt nhìn thẳng phía trước.'] },
      { h: 'Đứng nghỉ' },
      { p: 'Khi nghe "Nghỉ!", em chùng nhẹ chân trái, hai tay vẫn áp sát thân, người thư giãn.' },
      { note: 'Đứng đúng tư thế giúp em có dáng đẹp và khoẻ mạnh.' },
    ],
    examples: [
      { q: 'Khi đứng nghiêm, em hay nghiêng đầu, sửa thế nào?', a: 'Em giữ đầu thẳng, mắt nhìn về phía trước (chọn một điểm cố định). Tưởng tượng có sợi dây kéo đỉnh đầu lên — người sẽ thẳng tự nhiên.' },
      { q: 'Đứng nghiêm lâu mỏi, em làm sao?', a: 'Em đợi khẩu lệnh "Nghỉ!" rồi chùng chân nhẹ. Nếu chóng mặt em báo cô để được nghỉ ngồi.' },
    ],
  },

  'P1GDTC-w03-quiz': {
    topic: 'Quay phải – quay trái',
    intro: 'Khẩu lệnh "Bên phải, quay!" — em xoay sang phía nào? Cùng cô tập nhé!',
    objectives: [
      'Phân biệt khẩu lệnh quay phải, quay trái.',
      'Quay đúng kĩ thuật, lấy gót làm trụ.',
    ],
    theory: [
      { h: 'Hai khẩu lệnh' },
      { ul: ['"Bên phải, quay!" → xoay sang phải.', '"Bên trái, quay!" → xoay sang trái.'] },
      { h: 'Cách quay' },
      { p: 'Em lấy gót chân cùng bên với hướng quay làm trụ, mũi chân kia đẩy nhẹ. Quay xong trở lại tư thế nghiêm.' },
      { note: 'Quay gọn gàng, không nhảy lên, không quay bằng đầu gối.' },
    ],
    examples: [
      { q: 'Em hay nhầm trái – phải, làm sao nhớ?', a: 'Em nhớ tay thuận cầm bút (thường là tay phải) là bên phải. Trước khi quay, nhẩm thầm "phải" hay "trái" rồi mới quay.' },
      { q: 'Quay xong em phải làm gì?', a: 'Trở lại tư thế đứng nghiêm: thân thẳng, hai tay áp sát thân, mắt nhìn thẳng, chờ hiệu lệnh tiếp theo.' },
    ],
  },

  'P1GDTC-w04-quiz': {
    topic: 'Đi đều theo hàng',
    intro: 'Cả lớp đi đều rất đẹp mắt và kỉ luật. Cùng cô tập đi đều nhé các em!',
    objectives: [
      'Đi đều cùng nhịp với cả lớp.',
      'Giữ khoảng cách an toàn với bạn.',
    ],
    theory: [
      { h: 'Đi đều' },
      { ul: ['Bước cùng chân với cả hàng, đều nhịp.', 'Tay vung tự nhiên ngược chiều với chân.', 'Lưng thẳng, mắt nhìn phía trước.'] },
      { h: 'Khoảng cách' },
      { p: 'Giữ khoảng cách vừa đủ với bạn phía trước — không đạp gót bạn, cũng không tụt lại quá xa.' },
      { note: 'Đi đều rèn cho em nề nếp và kỉ luật.' },
    ],
    examples: [
      { q: 'Em nhầm chân khi đi đều, làm sao?', a: 'Em vẫn tiếp tục bước. Đến nhịp tiếp theo em điều chỉnh, bước hụt một chân để vào lại nhịp chung. Không dừng lại giữa hàng.' },
      { q: 'Bạn trước em đi chậm, em phải làm gì?', a: 'Em cũng đi chậm theo bạn, giữ khoảng cách. Không vượt qua bạn, không đẩy bạn. Sau giờ học có thể nhờ cô nhắc bạn.' },
    ],
  },

  'P1GDTC-w05-quiz': {
    topic: 'Đi thường, đi nhanh',
    intro: 'Có lúc em đi thong thả, có lúc đi nhanh để kịp giờ. Cùng cô tập hai kiểu đi nhé!',
    objectives: [
      'Phân biệt đi thường và đi nhanh.',
      'Giữ tư thế đúng khi đi.',
    ],
    theory: [
      { h: 'Đi thường' },
      { p: 'Nhịp bước chậm, thong thả. Tay vung nhẹ tự nhiên.' },
      { h: 'Đi nhanh' },
      { p: 'Nhịp bước nhanh hơn. Tay vung mạnh hơn theo nhịp để giữ thăng bằng.' },
      { ul: ['Lưng luôn giữ thẳng.', 'Mắt nhìn phía trước.', 'Trước khi tăng tốc, khởi động chân tay.'] },
    ],
    examples: [
      { q: 'Đi nhanh thế nào để không bị mệt?', a: 'Em hít thở đều bằng mũi, tay vung nhịp nhàng. Bước vừa sức, không cố lao quá nhanh. Khi mệt thì giảm tốc về đi thường.' },
      { q: 'Lưng em hay cúi khi đi nhanh, sửa thế nào?', a: 'Em tưởng tượng có sợi dây kéo đỉnh đầu lên trần. Mắt nhìn xa, ngực hơi ưỡn. Lưng sẽ thẳng tự nhiên.' },
    ],
  },

  'P1GDTC-w06-quiz': {
    topic: 'Chạy nhanh ngắn',
    intro: 'Chạy nhanh giúp em khoẻ và nhanh nhẹn. Cùng cô tập chạy đúng cách nhé!',
    objectives: [
      'Biết tư thế xuất phát và về đích.',
      'Báo cô khi mệt, không cố sức.',
    ],
    theory: [
      { h: 'Khi chạy' },
      { ul: ['Mắt nhìn thẳng phía trước.', 'Hơi khom người khi xuất phát, dồn lực.', 'Tay vung trước – sau theo nhịp.'] },
      { h: 'Về đích' },
      { p: 'Khi về đích, em giảm tốc từ từ. Không dừng phắt — dễ ngã hoặc đau chân.' },
      { note: 'Mệt thì báo cô để được nghỉ, không cố sức nguy hiểm.' },
    ],
    examples: [
      { q: 'Em hay vấp khi chạy, sửa thế nào?', a: 'Em nhìn thẳng phía trước (không nhìn xuống chân). Bước vừa sức, không cố nhảy quá xa. Khởi động kĩ trước khi chạy.' },
      { q: 'Đang chạy mà hết hơi?', a: 'Em giảm tốc dần thành đi bộ chậm. Hít thở sâu. Nếu chóng mặt thì báo cô để ngồi nghỉ.' },
    ],
  },

  'P1GDTC-w07-quiz': {
    topic: 'Bài thể dục buổi sáng – tay',
    intro: 'Buổi sáng em vươn vai cho khoẻ vai và tay. Cùng cô tập động tác tay nhé!',
    objectives: [
      'Thực hiện đúng động tác tay.',
      'Phối hợp hít thở khi tập.',
    ],
    theory: [
      { h: 'Động tác tay' },
      { p: 'Hai tay đưa từ thấp lên cao (vươn lên trời) rồi hạ xuống. Giữ lưng thẳng.' },
      { ul: ['Tay vươn cao → hít vào.', 'Tay hạ xuống → thở ra.', 'Lặp lại 4–8 nhịp.'] },
      { note: 'Tập thể dục buổi sáng giúp em tỉnh táo cả ngày!' },
    ],
    examples: [
      { q: 'Em vươn tay mà lưng cong, sửa thế nào?', a: 'Em chú ý giữ ngực ưỡn nhẹ, bụng hóp. Khi vươn cao, mắt nhìn theo tay nhưng đầu không ngửa quá. Lưng thẳng tự nhiên.' },
      { q: 'Em quên hít – thở, làm sao?', a: 'Em nhẩm trong đầu: vươn lên — "hít"; hạ xuống — "thở". Tập vài lần sẽ thành phản xạ.' },
    ],
  },

  'P1GDTC-w08-quiz': {
    topic: 'Bài TD buổi sáng – chân',
    intro: 'Chân khoẻ giúp em đi đứng vững vàng. Cùng cô tập động tác chân nào các em!',
    objectives: [
      'Thực hiện đúng động tác chân.',
      'Giữ thăng bằng khi đứng một chân.',
    ],
    theory: [
      { h: 'Động tác chân' },
      { ul: ['Nhún gối: chùng – đứng – chùng – đứng.', 'Co một chân lên, đứng bằng chân kia giữ thăng bằng.', 'Đổi chân và lặp lại.'] },
      { h: 'Giữ thăng bằng' },
      { p: 'Mắt nhìn một điểm cố định phía trước. Nếu mất thăng bằng, hạ chân kia xuống, đứng vững lại.' },
      { note: 'Tập đều giúp chân khoẻ, đi đứng vững vàng.' },
    ],
    examples: [
      { q: 'Em hay ngã khi đứng một chân, làm sao?', a: 'Em chọn một điểm trên tường để nhìn (không nhìn xuống chân). Dang hai tay nhẹ để giữ thăng bằng. Tập dần sẽ vững.' },
      { q: 'Gối kêu cộp cộp khi nhún, có sao không?', a: 'Em báo cô. Có thể em nhún quá nhanh hoặc tư thế chưa đúng. Nhún chậm, gối hướng cùng mũi chân là an toàn.' },
    ],
  },

  'P1GDTC-w09-quiz': {
    topic: 'Bài TD buổi sáng – lườn, bụng',
    intro: 'Eo dẻo, bụng khoẻ giúp em đứng đẹp, ngồi học không mỏi. Cùng cô tập nhé!',
    objectives: [
      'Tập đúng động tác lườn và bụng.',
      'Biết báo cô khi chóng mặt.',
    ],
    theory: [
      { h: 'Động tác lườn' },
      { p: 'Hai tay chống hông, nghiêng người sang bên trái – phải. Giữ lưng dài, không gập về trước.' },
      { h: 'Động tác bụng' },
      { p: 'Cúi nhẹ chạm tay xuống mũi chân, rồi đứng thẳng. Không cúi quá đột ngột.' },
      { note: 'Nếu chóng mặt, em báo cô và ngồi nghỉ ngay.' },
    ],
    examples: [
      { q: 'Em nghiêng lườn mà bị mất thăng bằng?', a: 'Em đứng hai chân rộng bằng vai cho vững. Tay chống hông, chỉ nghiêng phần thân trên sang bên. Không di chuyển chân.' },
      { q: 'Cúi gập bụng thấy chóng mặt?', a: 'Em đứng thẳng dậy từ từ, hít sâu. Báo cô để được ngồi nghỉ. Lần sau cúi chậm hơn.' },
    ],
  },

  'P1GDTC-w10-quiz': {
    topic: 'Nhảy bước nhỏ tại chỗ',
    intro: 'Nhảy bước nhỏ vui như con chim sẻ. Cùng cô nhảy nhé các em!',
    objectives: [
      'Tiếp đất bằng mũi chân, gối chùng.',
      'Giữ thăng bằng khi nhảy.',
    ],
    theory: [
      { h: 'Kĩ thuật nhảy' },
      { ul: ['Tiếp đất bằng mũi bàn chân.', 'Gối hơi chùng để hấp thụ lực.', 'Tay vung tự nhiên giữ thăng bằng.'] },
      { note: 'Trước khi nhảy nhiều, khởi động chân tránh đau cơ.' },
    ],
    examples: [
      { q: 'Em nhảy mà gót chân đập mạnh xuống đất?', a: 'Em phải tiếp đất bằng mũi chân trước, gối chùng nhẹ. Như vậy mới êm chân, không đau gót.' },
      { q: 'Nhảy bị nghiêng sang bên?', a: 'Em vung hai tay nhẹ để thăng bằng. Nhìn thẳng phía trước (không nhìn xuống). Bật và tiếp đất ngay tại chỗ.' },
    ],
  },

  'P1GDTC-w11-quiz': {
    topic: 'Bật xa tại chỗ',
    intro: 'Bật xa giúp chân em mạnh hơn. Cùng cô tập bật xa nhé các em!',
    objectives: [
      'Biết lấy đà và bật xa đúng kĩ thuật.',
      'Tiếp đất an toàn bằng hai chân.',
    ],
    theory: [
      { h: 'Kĩ thuật bật xa' },
      { ul: ['Khuỵu gối, hai tay đưa ra sau lấy đà.', 'Vung tay mạnh ra trước, đồng thời bật chân.', 'Tiếp đất bằng hai chân, gối chùng để êm.'] },
      { note: 'Khởi động kĩ trước khi bật để tránh đau cơ.' },
    ],
    examples: [
      { q: 'Em bật mà tiếp đất bằng một chân, dễ ngã?', a: 'Em phải tiếp đất bằng hai chân cùng lúc, gối chùng. Bật cả hai chân lên cùng nhau, không bật một chân.' },
      { q: 'Bật xa nhưng vẫn ngắn?', a: 'Em chú ý: khuỵu gối sâu hơn, vung tay mạnh hơn ra trước. Phối hợp tay – chân nhịp nhàng sẽ bật xa hơn.' },
    ],
  },

  'P1GDTC-w12-quiz': {
    topic: 'Ném bóng – tay không thuận',
    intro: 'Em đã biết ném bóng bằng tay thuận, hôm nay cô tập ném bằng tay kia cho cân nhé!',
    objectives: [
      'Đứng đúng tư thế khi ném.',
      'Nhắm và ném vào đích.',
    ],
    theory: [
      { h: 'Tư thế ném' },
      { ul: ['Chân trước chân sau, đứng vững.', 'Mắt nhìn đích.', 'Tay đưa bóng ra sau lấy đà, rồi vung ra trước.'] },
      { h: 'Sau khi ném' },
      { p: 'Để tay tiếp tục đi theo bóng cho lực mượt.' },
      { note: 'Khi nhặt bóng phải nhìn xung quanh tránh va chạm với bạn.' },
    ],
    examples: [
      { q: 'Em ném mà bóng đi lệch hướng?', a: 'Em chú ý: mắt nhìn thẳng vào đích, tay vung thẳng về phía đích. Đừng xoắn người khi ném.' },
      { q: 'Ném bằng tay yếu thấy khó?', a: 'Bình thường thôi, vì tay này chưa quen. Em tập nhiều lần, ném gần trước rồi xa dần. Dần dần tay sẽ khoẻ.' },
    ],
  },

  'P1GDTC-w13-quiz': {
    topic: 'Bắt bóng bằng hai tay',
    intro: 'Bắt được bóng bay đến rất vui. Cùng cô tập bắt bóng bằng hai tay nhé!',
    objectives: [
      'Khum tay đúng cách để bắt bóng.',
      'Nhìn theo bóng để bắt chính xác.',
    ],
    theory: [
      { h: 'Tư thế bắt bóng' },
      { ul: ['Hai bàn tay khum, mở trước ngực.', 'Mắt nhìn theo bóng.', 'Khi bóng chạm tay, hơi rút tay về cho êm.'] },
      { note: 'Trượt bóng thì nhặt lại, tập tiếp — không nản chí.' },
    ],
    examples: [
      { q: 'Bóng đến nhanh quá em không kịp bắt?', a: 'Em nhờ bạn ném nhẹ hơn lúc đầu. Khi quen rồi mới tăng tốc. Hai tay luôn sẵn sàng trước ngực để phản ứng nhanh.' },
      { q: 'Bóng chạm tay rồi rơi mất?', a: 'Em rút tay về phía ngực khi bóng chạm — như "ôm" bóng vào người. Đừng để tay cứng đờ, dễ bóng bật ra.' },
    ],
  },

  'P1GDTC-w14-quiz': {
    topic: 'Đi trên vạch kẻ thẳng',
    intro: 'Đi đúng vạch giúp em rèn thăng bằng và sự khéo léo. Cùng cô tập nhé!',
    objectives: [
      'Đi đúng theo vạch kẻ.',
      'Dang tay nhẹ giữ thăng bằng.',
    ],
    theory: [
      { h: 'Cách đi' },
      { ul: ['Mắt nhìn phía trước, hơi xuống vạch.', 'Hai tay dang ngang nhẹ giúp thăng bằng.', 'Đặt bàn chân thẳng trên vạch.'] },
      { note: 'Bước lệch ra ngoài thì đứng lại, bước trở về vạch — không cố nhảy.' },
    ],
    examples: [
      { q: 'Em hay bước lệch khỏi vạch?', a: 'Em bước chậm hơn, đặt từng bàn chân chính xác trên vạch. Mắt nhìn vạch phía trước, dang tay giữ thăng bằng.' },
      { q: 'Bạn em đi nhanh quá, em sợ?', a: 'Em đi theo tốc độ của mình, không vội. Đi chậm mà đúng vạch còn hơn nhanh mà bước lệch.' },
    ],
  },

  'P1GDTC-w15-quiz': {
    topic: 'Đi trên ván hẹp',
    intro: 'Đi trên ván cần khéo léo và bình tĩnh. Cùng cô tập an toàn nhé các em!',
    objectives: [
      'Kiểm tra ván trước khi đi.',
      'Đi chậm, chắc, không vội.',
    ],
    theory: [
      { h: 'Trước khi đi' },
      { p: 'Kiểm tra ván chắc chắn, không trơn, không nứt. Có cô/thầy giám sát.' },
      { h: 'Khi đi' },
      { ul: ['Đi chậm, từng bước chắc.', 'Hai tay dang ngang giữ thăng bằng.', 'Mắt nhìn phía trước, không nhìn xuống.'] },
      { note: 'Mất thăng bằng → hạ chân xuống đất, dừng lại an toàn.' },
    ],
    examples: [
      { q: 'Em sợ ngã khi đi ván cao?', a: 'Lúc mới tập, ván chỉ đặt trên đất, cao chừng 5–10cm. Em đi chậm, dang tay. Khi quen mới đi ván cao hơn.' },
      { q: 'Đi đến giữa thấy run chân?', a: 'Em đứng yên một chút, hít thở sâu. Mắt nhìn về đích, dang tay vững. Sau đó đi tiếp từng bước nhỏ. Không hoảng.' },
    ],
  },

  'P1GDTC-w16-quiz': {
    topic: 'Trò chơi: Mèo đuổi chuột',
    intro: 'Trò Mèo đuổi chuột rất vui! Cô và các em ôn lại luật chơi nhé.',
    objectives: [
      'Nhớ luật trò Mèo đuổi chuột.',
      'Chơi an toàn, không xô đẩy.',
    ],
    theory: [
      { h: 'Cách chơi' },
      { ul: ['Cả lớp nắm tay tạo vòng tròn (hang chuột).', 'Một bạn làm "chuột", một bạn làm "mèo".', 'Mèo đuổi bắt chuột; chuột chạy luồn qua các "hang".'] },
      { h: 'An toàn' },
      { p: 'Không xô đẩy, không đánh bạn. Bạn ngoài vòng cổ vũ vui vẻ.' },
      { note: 'Mục đích trò chơi: vận động và đoàn kết, không phải để thắng bằng mọi giá.' },
    ],
    examples: [
      { q: 'Em làm chuột nhưng chạy không kịp?', a: 'Em chạy zíc-zắc, đổi hướng đột ngột để mèo khó bắt. Luồn qua các "hang" (giữa hai bạn nắm tay). Vui là chính, thắng thua không quan trọng.' },
      { q: 'Bạn chạy quá đà va vào em?', a: 'Em vẫn vui vẻ, không cáu giận. Nhắc bạn nhẹ nhàng: "Bạn nhẹ chân hơn nhé". Báo cô nếu thấy đau.' },
    ],
  },

  'P1GDTC-w17-quiz': {
    topic: 'Trò chơi: Bịt mắt bắt dê',
    intro: 'Bịt mắt mà vẫn bắt được bạn — rèn thính giác và phản xạ đấy các em!',
    objectives: [
      'Chơi đúng luật, không hé mắt.',
      'Chơi an toàn trên sân bằng phẳng.',
    ],
    theory: [
      { h: 'Cách chơi' },
      { ul: ['Một bạn bịt kín mắt làm "người tìm".', 'Các bạn khác (làm "dê") di chuyển nhẹ, vỗ tay tạo âm thanh.', 'Người tìm nghe tiếng để bắt "dê".'] },
      { h: 'An toàn' },
      { p: 'Sân phải bằng phẳng, không có vật cản. Người bịt mắt không được hé nhìn trộm.' },
      { note: 'Trò chơi rèn phản xạ, thính giác và sự vui vẻ.' },
    ],
    examples: [
      { q: 'Em bịt mắt mà sợ vấp ngã?', a: 'Em đi chậm, hai tay đưa ra phía trước dò đường. Các bạn dắt em đến giữa sân để chơi. Sân phải sạch, không vật cản.' },
      { q: 'Bị bắt em phải làm gì?', a: 'Em vào thay làm người bịt mắt. Vui vẻ chấp nhận, không cãi. Đó là luật chơi.' },
    ],
  },

  'P1GDTC-w18-quiz': {
    topic: 'Đánh giá HK1',
    intro: 'Kết thúc HK1, cô và các em cùng kiểm tra lại những điều đã học nhé. Em hãy tự tin!',
    objectives: [
      'Tự tin thể hiện kĩ năng đã học.',
      'Biết cảm ơn cô và dọn dụng cụ sau giờ học.',
    ],
    theory: [
      { h: 'Đã học trong HK1' },
      { ul: ['Đứng nghiêm, đứng nghỉ; quay trái – phải.', 'Đi đều, đi nhanh, chạy.', 'Bài thể dục buổi sáng (tay, chân, lườn, bụng).', 'Nhảy, bật xa, ném – bắt bóng.', 'Đi vạch, đi ván; trò chơi vận động.'] },
      { h: 'Khi kiểm tra' },
      { p: 'Em bình tĩnh, làm đúng kĩ thuật đã học. Nếu chưa tốt, em sẽ tập thêm — không bỏ cuộc.' },
      { note: 'Sau kiểm tra, cảm ơn cô và dọn gọn dụng cụ.' },
    ],
    examples: [
      { q: 'Em hồi hộp khi đến lượt mình?', a: 'Em hít thở sâu vài lần. Nhớ lại các bước đã tập. Cô không chấm để chê, mà để giúp em tiến bộ. Cứ tự tin thể hiện!' },
      { q: 'Lỡ làm sai một động tác?', a: 'Em bình tĩnh, xin cô làm lại. Sai một lần không sao, sửa lại cho đúng là được. Quan trọng là tinh thần cố gắng.' },
    ],
  },

  // ──────────────── HK2 ────────────────
  'P1GDTC-w19-quiz': {
    topic: 'Khởi động đầu giờ',
    intro: 'Khởi động giống như "khởi động máy" trước khi chạy. Cùng cô tập khởi động nhé!',
    objectives: [
      'Khởi động đúng thứ tự từ trên xuống.',
      'Khởi động nhẹ nhàng, tăng dần.',
    ],
    theory: [
      { h: 'Thứ tự khởi động' },
      { p: 'Từ trên xuống: cổ → vai → cánh tay → eo → hông → chân.' },
      { ul: ['Mỗi vùng 4–8 nhịp xoay nhẹ.', 'Nhẹ nhàng trước, tăng dần.', 'Không lao vào động tác mạnh ngay.'] },
      { note: 'Sau khởi động, người ấm lên, sẵn sàng tập.' },
    ],
    examples: [
      { q: 'Em quên khởi động chân?', a: 'Em quay lại làm xoay khớp gối, cổ chân vài nhịp. Quan trọng là khởi động đủ trước khi chạy, nhảy. Đừng bỏ qua.' },
      { q: 'Cô bảo khởi động mà em mệt rồi?', a: 'Khởi động là động tác nhẹ, không phải bài tập chính. Em làm chậm rãi, hít thở đều. Khởi động xong em sẽ thấy người ấm lên, đỡ mệt.' },
    ],
  },

  'P1GDTC-w20-quiz': {
    topic: 'Đi vượt chướng ngại vật thấp',
    intro: 'Đi qua chướng ngại như nhảy qua dây thấp — vui và rèn khéo léo. Cùng tập nhé!',
    objectives: [
      'Quan sát chướng ngại trước khi đi.',
      'Nâng cao đầu gối qua vật.',
    ],
    theory: [
      { h: 'Cách đi' },
      { ul: ['Quan sát chướng ngại trước.', 'Nâng cao đầu gối qua vật.', 'Mắt nhìn phía trước, giữ thăng bằng.'] },
      { h: 'Nếu vướng chân' },
      { p: 'Dừng lại, đi lại từ đầu cho đúng. Không cố lao tiếp dễ ngã.' },
      { note: 'Bài tập rèn khéo léo và phản xạ.' },
    ],
    examples: [
      { q: 'Em sợ vấp khi đi qua chướng ngại cao?', a: 'Em đi chậm, nâng cao đầu gối hơn bình thường. Có thể đặt tay xuống vật để giữ thăng bằng. Khi quen mới đi nhanh.' },
      { q: 'Đá phải chướng ngại làm nó đổ?', a: 'Em dừng lại, đặt lại chướng ngại ngay ngắn. Xin lỗi cô và bạn. Lần sau bước cao hơn.' },
    ],
  },

  'P1GDTC-w21-quiz': {
    topic: 'Chạy theo vạch kẻ thẳng',
    intro: 'Chạy thẳng theo vạch giúp em không lệch hướng. Cùng cô tập chạy đúng kĩ thuật nhé!',
    objectives: [
      'Chạy thẳng theo vạch, không lệch.',
      'Hít thở đều khi chạy.',
    ],
    theory: [
      { h: 'Khi chạy' },
      { ul: ['Tay vung trước – sau tự nhiên theo nhịp.', 'Hít vào bằng mũi, thở ra bằng miệng, đều đặn.', 'Mắt nhìn phía trước, theo vạch.'] },
      { note: 'Hết hơi thì đi bộ chậm rồi nghỉ — không cố chạy thêm.' },
    ],
    examples: [
      { q: 'Em chạy hay lệch sang một bên?', a: 'Em nhìn vạch ở xa (không nhìn dưới chân). Tay vung thẳng trước-sau, không xoắn người. Lưng thẳng.' },
      { q: 'Chạy được nửa đường thì hụt hơi?', a: 'Em giảm tốc thành đi bộ, hít thở sâu vài lần. Khi đỡ hơn mới chạy tiếp. Lần sau em tập chạy quãng ngắn trước.' },
    ],
  },

  'P1GDTC-w22-quiz': {
    topic: 'Nghỉ Tết – Trò chơi dân gian: Kéo co',
    intro: 'Tết đến vui rồi! Kéo co là trò chơi dân gian rất ngày Tết. Cùng cô tập nhé!',
    objectives: [
      'Biết luật và cách chơi kéo co.',
      'Chơi tinh thần thể thao, không cay cú.',
    ],
    theory: [
      { h: 'Cách chơi' },
      { ul: ['Hai đội cân sức, cùng nắm một sợi dây dài.', 'Giữa dây có khăn buộc làm dấu.', 'Khi có hiệu lệnh, hai đội cùng kéo dây về phía mình.'] },
      { h: 'Tư thế kéo' },
      { p: 'Chùng gối, ngả người ra sau, hai tay nắm chắc dây. Kéo đều, không giật.' },
      { note: 'Chơi xong bắt tay đội bạn, không cay cú. Vui là chính!' },
    ],
    examples: [
      { q: 'Tay em yếu, sợ tuột dây?', a: 'Em nắm dây bằng cả hai tay, ngón cái chồng lên ngón trỏ. Ngả người ra sau dùng cả trọng lượng cơ thể, không chỉ dùng tay.' },
      { q: 'Đội em thua, có nên buồn không?', a: 'Không. Em vui vẻ bắt tay đội bạn. Trò chơi để vận động và đoàn kết, không phải để thắng thua. Lần sau lại chơi tiếp.' },
    ],
  },

  'P1GDTC-w23-quiz': {
    topic: 'Trò chơi dân gian: Rồng rắn lên mây',
    intro: 'Trò Rồng rắn lên mây có vần điệu rất vui. Cùng cô chơi nhé các em!',
    objectives: [
      'Biết cách chơi Rồng rắn lên mây.',
      'Chơi đoàn kết, không xô đẩy.',
    ],
    theory: [
      { h: 'Cách chơi' },
      { ul: ['Các bạn nắm áo bạn trước, xếp thành hàng dài (rồng rắn).', 'Một bạn làm "thầy thuốc" đứng đối diện.', 'Cả hàng hát vần "Rồng rắn lên mây…".', 'Sau đối thoại, "thầy thuốc" đuổi bắt bạn cuối hàng (đuôi rắn).'] },
      { note: 'Không xô đẩy mạnh, không buông tay đột ngột.' },
    ],
    examples: [
      { q: 'Em ở cuối hàng (đuôi rắn) hay bị bắt?', a: 'Em chạy theo nhịp đầu hàng, đầu hàng phải lắt léo bảo vệ đuôi. Cả đoàn phối hợp, không tách rời thành mới khó bắt.' },
      { q: 'Bạn nắm áo em mạnh quá làm rách?', a: 'Em nhắc bạn nắm nhẹ thôi. Có thể nắm vai/eo thay vì áo. Báo cô nếu áo rách.' },
    ],
  },

  'P1GDTC-w24-quiz': {
    topic: 'Ném vòng vào cọc',
    intro: 'Ném vòng vào cọc rất vui và khéo léo. Cùng cô tập ném đúng đích nhé!',
    objectives: [
      'Đứng đúng tư thế ném vòng.',
      'Tập đi tập lại khi trượt, không nản.',
    ],
    theory: [
      { h: 'Tư thế ném' },
      { ul: ['Chân trước chân sau, đứng vững.', 'Tay cầm vòng, xuôi theo thân.', 'Mắt nhắm vào cọc đích.', 'Đưa vòng từ sau ra trước rồi nhẹ tay.'] },
      { note: 'Trượt thì tập lại — không nản chí.' },
    ],
    examples: [
      { q: 'Em ném mà vòng bay quá cọc?', a: 'Em ném nhẹ tay hơn, vòng bay vòng cung nhẹ chứ không thẳng băng. Tập gần trước, xa dần khi quen.' },
      { q: 'Tay em vẫn cầm vòng thì đến lượt nhặt?', a: 'Em đợi đến lượt mình, không tranh giành. Khi đến lượt mới ra nhặt. Trật tự là quan trọng.' },
    ],
  },

  'P1GDTC-w25-quiz': {
    topic: 'Đá bóng – tâng bóng đơn giản',
    intro: 'Đá bóng rất vui nhưng phải đúng cách. Cùng cô tập đá bóng an toàn nhé!',
    objectives: [
      'Đặt chân trụ đúng cách khi đá.',
      'Đá bóng an toàn, không sút vào người.',
    ],
    theory: [
      { h: 'Tư thế đá bóng' },
      { ul: ['Chân trụ đặt cạnh bóng, mũi chỉ hướng đá.', 'Chân kia đá vào bóng.', 'Mắt vừa nhìn bóng vừa nhắm đích.'] },
      { h: 'An toàn' },
      { p: 'Không sút vào người bạn, không sút vào cửa kính. Cất bóng đúng chỗ sau khi tập.' },
      { note: 'Đá bóng mạnh không bằng đá chính xác.' },
    ],
    examples: [
      { q: 'Em đá mà cứ trúng đất, không trúng bóng?', a: 'Em chú ý: mắt nhìn vào bóng khi đá. Chân trụ cách bóng khoảng một bàn chân. Đá bằng mu bàn chân (chỗ buộc dây giày).' },
      { q: 'Bóng văng vào bạn?', a: 'Em xin lỗi bạn ngay. Lần sau quan sát xung quanh trước khi đá. Không sút mạnh khi có bạn đứng gần.' },
    ],
  },

  'P1GDTC-w26-quiz': {
    topic: 'Tâng bóng bằng tay',
    intro: 'Tâng bóng rèn sự khéo léo tay-mắt. Cùng cô tập nhé các em!',
    objectives: [
      'Tâng bóng bằng lòng bàn tay.',
      'Đứng vững, nhìn theo bóng.',
    ],
    theory: [
      { h: 'Tâng bóng' },
      { ul: ['Đứng hai chân rộng bằng vai.', 'Đẩy bóng nhẹ bằng lòng bàn tay.', 'Mắt nhìn theo bóng.', 'Tâng bóng cao vừa phải, không quá đầu.'] },
      { note: 'Bóng rơi thì nhặt lại, tập tiếp.' },
    ],
    examples: [
      { q: 'Em tâng được vài cái là rơi?', a: 'Bình thường thôi. Em tập tâng nhẹ, đều tay. Đẩy bóng thẳng lên trên (không xiên). Tập nhiều lần sẽ tâng được lâu hơn.' },
      { q: 'Bóng rơi xa, làm sao?', a: 'Em chạy nhẹ ra nhặt, không vội. Tâng bóng cần đẩy thẳng lên, không xiên sang bên — bóng sẽ rơi ngay tại chỗ.' },
    ],
  },

  'P1GDTC-w27-quiz': {
    topic: 'Bài thể dục đồng diễn (ôn)',
    intro: 'Cả lớp cùng nhịp tập rất đẹp! Hôm nay cô và các em ôn bài đồng diễn nhé.',
    objectives: [
      'Tập đồng diễn cùng nhịp với cả lớp.',
      'Đứng thẳng hàng, không chen lấn.',
    ],
    theory: [
      { h: 'Đồng diễn' },
      { p: 'Cả lớp cùng tập một bài, cùng nhịp, cùng động tác.' },
      { ul: ['Hàng ngũ thẳng và đều.', 'Khoảng cách bằng nhau giữa các bạn.', 'Quên động tác thì nhìn bạn theo kịp.'] },
      { note: 'Đồng diễn rèn tinh thần tập thể.' },
    ],
    examples: [
      { q: 'Em quên động tác giữa chừng?', a: 'Em liếc nhìn bạn bên cạnh và làm theo. Không đứng yên giữa hàng — sẽ làm lệch đội hình. Tập về sẽ thuộc.' },
      { q: 'Em đứng lệch hàng?', a: 'Em quan sát hàng phía trước và bên cạnh. Bước nhẹ về vị trí đúng. Khoảng cách một cánh tay là chuẩn.' },
    ],
  },

  'P1GDTC-w28-quiz': {
    topic: 'Đi nhanh chuyển sang chạy',
    intro: 'Từ đi nhanh chuyển sang chạy cần kĩ thuật để không vấp. Cùng cô tập nhé!',
    objectives: [
      'Chuyển từ đi sang chạy mượt mà.',
      'Giữ hàng và khoảng cách an toàn.',
    ],
    theory: [
      { h: 'Chuyển nhịp' },
      { p: 'Tăng nhịp dần dần, không lao vọt lên ngay. Tay vung mạnh dần theo chân.' },
      { ul: ['Hít thở: hít sâu bằng mũi, thở đều.', 'Giữ hàng và khoảng cách với bạn.', 'Về đích: đi bộ chậm rồi nghỉ, không ngồi phịch.'] },
      { note: 'Khoảng cách an toàn giúp không va vào nhau.' },
    ],
    examples: [
      { q: 'Em chuyển nhanh quá nên vấp?', a: 'Em tăng nhịp dần, không đột ngột. Chân vẫn bước vững từng bước, chỉ là nhanh hơn. Tay vung mạnh hơn theo.' },
      { q: 'Vừa chạy về đích đã ngồi phịch?', a: 'Không nên. Em đi bộ chậm vài bước, hít thở sâu vài lần. Sau đó mới ngồi xuống nghỉ. Tránh chóng mặt.' },
    ],
  },

  'P1GDTC-w29-quiz': {
    topic: 'Trò chơi: Cướp cờ',
    intro: 'Cướp cờ là trò chơi đồng đội rất hấp dẫn. Cùng cô ôn luật chơi nhé!',
    objectives: [
      'Nắm luật cướp cờ.',
      'Chơi đoàn kết, tuân thủ luật.',
    ],
    theory: [
      { h: 'Cách chơi' },
      { ul: ['Hai đội đứng đối diện, có vạch xuất phát.', 'Cờ đặt giữa sân.', 'Khi gọi số, người mang số đó từ hai đội chạy ra cướp cờ.', 'Cầm cờ chạy về đội nhà mà không bị bạn đối phương chạm là thắng.'] },
      { note: 'Tuân thủ luật, không xô đẩy mạnh.' },
    ],
    examples: [
      { q: 'Em cầm cờ chạy bị bạn chạm?', a: 'Em mất lượt cướp, vui vẻ trả cờ lại vị trí. Đó là luật. Lần sau em chạy nhanh hơn, đánh lừa bạn.' },
      { q: 'Em không cầm cờ nhưng bị chạm thì sao?', a: 'Không sao cả. Chỉ người cầm cờ mới có giá trị. Em quay về vạch chờ lượt sau.' },
    ],
  },

  'P1GDTC-w30-quiz': {
    topic: 'Trò chơi: Nhảy bao bố',
    intro: 'Nhảy bao bố vừa vui vừa rèn chân khoẻ. Cùng cô chơi nhé các em!',
    objectives: [
      'Đứng trong bao đúng cách.',
      'Nhảy hai chân nhịp đều.',
    ],
    theory: [
      { h: 'Cách chơi' },
      { ul: ['Đứng vào trong bao, hai tay giữ miệng bao.', 'Nhảy hai chân cùng lúc, nhịp đều.', 'Ai về đích trước là thắng.'] },
      { h: 'Khi ngã' },
      { p: 'Đứng dậy nhảy tiếp, không bỏ cuộc. Cuối trò gập bao gọn gàng.' },
      { note: 'Tinh thần thể thao là quan trọng nhất.' },
    ],
    examples: [
      { q: 'Em ngã hoài không nhảy được?', a: 'Em nhảy bước nhỏ thôi, không cố nhảy xa. Hai tay giữ chặt miệng bao. Tập vài lần sẽ quen nhịp.' },
      { q: 'Bao bị tuột xuống?', a: 'Em đứng yên, kéo bao lên, hai tay nắm chặt miệng bao hơn. Sau đó tiếp tục nhảy.' },
    ],
  },

  'P1GDTC-w31-quiz': {
    topic: 'An toàn khi tập luyện',
    intro: 'An toàn là điều quan trọng nhất khi tập thể dục. Cùng cô nhớ các quy tắc nhé!',
    objectives: [
      'Biết kiểm tra sân tập và trang phục an toàn.',
      'Biết báo cô khi bị đau.',
    ],
    theory: [
      { h: 'Trước khi tập' },
      { ul: ['Sân tập sạch, không vật sắc nhọn.', 'Buộc dây giày gọn.', 'Không đeo trang sức gây vướng.'] },
      { h: 'Khi bị đau' },
      { p: 'Báo ngay cho cô/thầy, không cố tập tiếp. Không giấu đau.' },
      { note: 'Sau khi tập: không tắm nước lạnh ngay, uống nước từng ngụm.' },
    ],
    examples: [
      { q: 'Em vấp một viên đá nhỏ ngã trầy đầu gối?', a: 'Em báo cô ngay. Cô sẽ rửa sạch vết thương và băng nếu cần. Không nên cố tập tiếp khi bị thương.' },
      { q: 'Dây giày em tuột giữa giờ tập?', a: 'Em ra vị trí an toàn (bên ngoài hàng), ngồi xuống buộc lại chắc chắn. Sau đó trở lại tập tiếp.' },
    ],
  },

  'P1GDTC-w32-quiz': {
    topic: 'Tập hợp – dóng hàng',
    intro: 'Cả lớp xếp hàng ngay ngắn nhìn rất đẹp! Cùng cô tập hợp đúng cách nhé.',
    objectives: [
      'Tập hợp nhanh khi nghe khẩu lệnh.',
      'Dóng hàng dọc và hàng ngang thẳng.',
    ],
    theory: [
      { h: 'Khi "Tập hợp!"' },
      { p: 'Em chạy nhanh đến vị trí của mình, đứng hàng ngay ngắn.' },
      { h: 'Dóng hàng' },
      { ul: ['Hàng dọc: nhìn gáy bạn phía trước để thẳng.', 'Hàng ngang: nhìn bạn bên cạnh để thẳng.', 'Khoảng cách: một cánh tay.'] },
      { note: 'Hàng thẳng giúp cả lớp đẹp mắt và kỉ luật.' },
    ],
    examples: [
      { q: 'Em quên vị trí của mình?', a: 'Em hỏi bạn cùng hàng hoặc tổ trưởng. Hôm nay nhớ vị trí để hôm sau không quên. Có thể đánh dấu mốc nhớ.' },
      { q: 'Hàng em hay bị cong?', a: 'Bạn đầu hàng phải đứng đúng vạch. Các bạn sau dóng theo bằng cách nhìn gáy bạn trước. Nếu thấy lệch, bước nhẹ về vị trí đúng.' },
    ],
  },

  'P1GDTC-w33-quiz': {
    topic: 'Ôn tập – Đi, chạy, nhảy, bóng',
    intro: 'Cô và các em ôn lại các kĩ năng đã học cả năm nhé. Em hãy cố gắng nhé!',
    objectives: [
      'Ôn đầy đủ và đúng kĩ thuật các bài đã học.',
      'Khen ngợi và học hỏi từ bạn.',
    ],
    theory: [
      { h: 'Các nội dung ôn' },
      { ul: ['Đi đều, đi nhanh, chạy, nhảy.', 'Bật xa, đi ván, đi vạch.', 'Ném – bắt bóng, tâng bóng, đá bóng.', 'Trò chơi vận động.'] },
      { h: 'Khi bạn làm tốt' },
      { p: 'Khen ngợi và học hỏi từ bạn. Không ghen tị hay trêu chọc.' },
      { note: 'Có động tác chưa tốt thì hỏi cô và tập thêm.' },
    ],
    examples: [
      { q: 'Em nhớ động tác này nhưng quên động tác kia?', a: 'Em hỏi cô để được nhắc lại. Tập thêm phần chưa thuộc. Bạn nhớ tốt có thể chỉ em — học hỏi từ bạn là rất đáng quý.' },
      { q: 'Bạn em bật xa hơn em?', a: 'Em khen bạn và hỏi bí quyết. Có thể bạn vung tay mạnh hơn, khuỵu gối sâu hơn. Em học và tập theo.' },
    ],
  },

  'P1GDTC-w34-quiz': {
    topic: 'Kiểm tra cuối năm',
    intro: 'Đến lúc kiểm tra cuối năm rồi! Em bình tĩnh, tự tin nhé. Cô tin các em làm tốt.',
    objectives: [
      'Bình tĩnh thực hiện theo hiệu lệnh.',
      'Làm lại nếu sai, không nản.',
    ],
    theory: [
      { h: 'Khi tới lượt' },
      { ul: ['Bình tĩnh, hít thở sâu.', 'Nghe kĩ hiệu lệnh, làm đúng theo.', 'Nếu sai, xin cô làm lại — không nản.'] },
      { note: 'Sau khi xong: cảm ơn cô và dọn dụng cụ gọn gàng.' },
    ],
    examples: [
      { q: 'Em run khi đến lượt mình?', a: 'Em hít thở sâu 3 lần. Nhớ lại các bước đã tập. Cô và bạn ủng hộ em. Cứ làm theo những gì em đã quen.' },
      { q: 'Lỡ làm sai một động tác?', a: 'Em bình tĩnh, xin cô làm lại lần nữa. Cô luôn cho cơ hội. Không có gì phải buồn — sai là để học.' },
    ],
  },

  'P1GDTC-w35-quiz': {
    topic: 'Tổng kết – Trò chơi dân gian tổng hợp',
    intro: 'Một năm GDTC đã qua, các em khoẻ hơn rất nhiều! Hôm nay cùng chơi vui vẻ nhé.',
    objectives: [
      'Tham gia trò chơi với tinh thần đoàn kết.',
      'Giữ thói quen tập thể dục đều đặn.',
    ],
    theory: [
      { h: 'Tổng kết năm' },
      { p: 'Lớp tổ chức trò chơi vận động tổng hợp: kéo co, mèo đuổi chuột, nhảy bao bố, cướp cờ…' },
      { h: 'Tinh thần chơi' },
      { ul: ['Vui là chính, đề cao đoàn kết.', 'Không hơn thua, không trêu chọc.', 'Một năm qua em đã khoẻ hơn, nhanh nhẹn hơn.'] },
      { note: 'Hãy tiếp tục tập thể dục đều đặn để khoẻ mạnh nhé!' },
    ],
    examples: [
      { q: 'Em muốn tập thể dục ở nhà thế nào?', a: 'Buổi sáng em làm bài thể dục buổi sáng (tay, chân, lườn, bụng). Cuối ngày có thể chơi vận động ngoài sân với bạn. Đều đặn mỗi ngày.' },
      { q: 'Đội em thua trong trò chơi cuối năm?', a: 'Em vẫn vui vẻ chúc mừng đội bạn. Cả năm chơi rất nhiều rồi, hôm nay chỉ là một ngày vui chung. Cảm ơn cô và các bạn.' },
    ],
  },

  'P1GDTC-w36-quiz': {
    topic: 'Kết thúc Lớp 1 — Một năm chăm vận động',
    intro: 'Năm học sắp kết thúc. Em đã lớn hơn và khoẻ hơn rất nhiều! Cô cùng em nhìn lại hành trình nhé.',
    objectives: [
      'Nhớ lại các kĩ năng vận động đã học.',
      'Lập kế hoạch vận động trong kì hè.',
    ],
    theory: [
      { h: 'Em đã học được gì?' },
      { ul: [
        'Đi thẳng người, chạy đúng tư thế, nhảy hai chân.',
        'Tung và bắt bóng, ném bóng vào đích.',
        'Trò chơi đồng đội: bịt mắt bắt dê, kéo co, rồng rắn.',
        'Bài thể dục tay không 8 động tác cơ bản.',
        'Tinh thần đoàn kết, chơi fair-play, không trêu bạn.',
      ] },
      { h: 'Kế hoạch hè khoẻ mạnh' },
      { ul: [
        'Vận động ít nhất 30 phút mỗi ngày: chạy, nhảy dây, đá cầu.',
        'Uống đủ nước, ăn nhiều rau quả.',
        'Ngủ sớm để có năng lượng cho ngày mới.',
      ] },
      { note: 'Cô chúc em một mùa hè vui và khoẻ! Hẹn gặp lại khi vào Lớp 2!' },
    ],
    examples: [
      { q: 'Bài thể dục buổi sáng giúp ích gì?', a: 'Giúp cơ thể tỉnh táo, dẻo dai, tập trung học tốt hơn.' },
      { q: 'Hè em muốn học môn thể thao nào?', a: 'Ví dụ: bơi lội, cầu lông, đá bóng, nhảy dây — tuỳ em thích và điều kiện gia đình.' },
    ],
  },
};
