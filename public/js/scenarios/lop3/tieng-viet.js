// ============================================================
// Lớp 3 · TIẾNG VIỆT — 35 tuần (HK1: 1–18 · HK2: 19–35)
// Bám SGK GDPT 2018 (Cánh Diều / Kết nối / Chân trời).
// 7 tiết/tuần.
// ============================================================
import { Q, W, indexBy } from './_helper.js';

const M = (n, title, qs, opts) => W('P3TV', 'tieng-viet', n, title, qs, opts);

export const P3TV_WEEKS = [
  // ──────────────── HK1 ────────────────
  M(1, 'Ôn tập âm – vần đã học (Lớp 2)', [
    Q('Tiếng "trường" có cấu tạo gồm?', ['Chỉ 1 âm', 'Âm đầu "t" + vần "rường"', 'Âm đầu "tr" + vần "ường"', 'Âm đầu "tr" + vần "ương"'], 2, 'Âm đầu "tr" + vần "ường" + thanh huyền.', [
      'Sai — tiếng này có cả âm đầu và vần, không phải chỉ 1 âm.',
      'Sai — âm đầu là "tr" (hai chữ), không phải chỉ "t".',
      'Đúng — âm đầu "tr" ghép với vần "ường", thêm thanh huyền.',
      'Sai — vần là "ường" (có dấu huyền), không phải "ương".',
    ]),
    Q('Tiếng "khoẻ" có vần gì?', ['oẻ', 'vần oè', 'vần oe', 'vần oẹ'], 0, 'Vần "oẻ" có thanh hỏi.', [
      'Đúng — bỏ âm đầu "kh" còn lại vần "oẻ", mang dấu hỏi.',
      'Sai — "oè" mang dấu huyền, không phải dấu hỏi.',
      'Sai — "oe" không có dấu, còn "khoẻ" có dấu hỏi.',
      'Sai — "oẹ" mang dấu nặng, không phải dấu hỏi.',
    ]),
    Q('Chọn cách viết HOA đúng: hà nội', ['Hà nội', 'hà Nội', 'hà nội', 'Hà Nội'], 3, 'Tên riêng địa danh: viết hoa cả 2 chữ.', [
      'Sai — chữ "nội" cũng phải viết hoa vì là tên riêng.',
      'Sai — chữ "hà" đứng đầu tên riêng cũng phải viết hoa.',
      'Sai — tên riêng phải viết hoa, không để thường hết.',
      'Đúng — tên địa danh viết hoa cả "Hà" và "Nội".',
    ]),
    Q('Sắp xếp đúng bảng chữ cái: c, b, đ, a', ['b, a, c, đ', 'a, c, b, đ', 'a, b, c, đ', 'đ, c, b, a'], 2, 'Bảng chữ cái: a, ă, â, b, c, d, đ...', [
      'Sai — chữ "a" phải đứng trước "b".',
      'Sai — "b" phải đứng trước "c", không phải sau.',
      'Đúng — đúng thứ tự bảng chữ cái: a, b, c, đ.',
      'Sai — đây là thứ tự ngược lại của bảng chữ cái.',
    ]),
    Q('Tiếng nào có chứa vần "ươu"?', ['hươu', 'rượu', 'trừu', 'cừu'], 0, '"Hươu" = h + ươu.', [
      'Đúng — "hươu" gồm âm đầu "h" và vần "ươu".',
      'Sai — "rượu" có vần "ươu" nhưng mang dấu nặng nên là "ượu".',
      'Sai — "trừu" có vần "ưu", không phải "ươu".',
      'Sai — "cừu" có vần "ưu", không phải "ươu".',
    ]),
    Q('Câu nào viết đúng chính tả?', ['em Yêu trường em', 'EM yêu trường em.', 'Em yêu trường em', 'Em yêu trường em.'], 3, 'Đầu câu viết hoa, cuối câu có dấu chấm.', [
      'Sai — đầu câu phải viết hoa "Em" và thiếu dấu chấm cuối.',
      'Sai — không viết hoa cả chữ "EM"; chỉ hoa chữ cái đầu.',
      'Sai — đầu câu đã hoa nhưng còn thiếu dấu chấm cuối.',
      'Đúng — đầu câu hoa "Em", cuối câu có dấu chấm.',
    ]),
  ]),

  M(2, 'Tập đọc: "Cậu bé thông minh"', [
    Q('Truyện "Cậu bé thông minh" ca ngợi điều gì ở nhân vật chính?', ['Sức khoẻ', 'Sự thông minh, nhanh trí', 'Vẻ đẹp', 'Sự giàu có'], 1, 'Cậu bé dùng trí khôn để đối đáp với nhà vua.', [
      'Sai — truyện ca ngợi trí khôn, không nói về sức khoẻ.',
      'Đúng — cậu bé dùng sự nhanh trí để đối đáp với vua.',
      'Sai — truyện không nói về vẻ đẹp của cậu bé.',
      'Sai — truyện không nói cậu bé giàu có.',
    ]),
    Q('Nhà vua thử tài cậu bé bằng cách?', ['Ra câu đố / mệnh lệnh khó', 'Tặng vàng', 'Bắt giam', 'Đuổi đi'], 0, 'Vua ra những đề bài khó để thử trí thông minh.', [
      'Đúng — vua ra những câu đố, mệnh lệnh khó để thử tài.',
      'Sai — vua không tặng vàng để thử tài cậu bé.',
      'Sai — vua không bắt giam cậu bé.',
      'Sai — vua không đuổi cậu bé đi.',
    ]),
    Q('Bài học từ truyện?', ['Trí thông minh có thể giúp ta vượt khó', 'Của cải quan trọng nhất', 'Không cần học', 'Sức mạnh là quan trọng nhất'], 0, 'Trí khôn giúp giải quyết tình huống khó.', [
      'Đúng — trí khôn giúp ta vượt qua những việc khó.',
      'Sai — truyện không nói của cải là quan trọng nhất.',
      'Sai — trái lại, ta cần học để có trí khôn.',
      'Sai — truyện đề cao trí khôn hơn sức mạnh.',
    ]),
    Q('"Thông minh" trái nghĩa với?', ['Khôn ngoan', 'Dại, ngốc', 'Lanh lợi', 'Vui vẻ'], 1, 'Trái nghĩa của thông minh là dại, ngốc.', [
      'Sai — "khôn ngoan" gần nghĩa với thông minh, không trái nghĩa.',
      'Đúng — "dại, ngốc" trái nghĩa với "thông minh".',
      'Sai — "lanh lợi" gần nghĩa với thông minh.',
      'Sai — "vui vẻ" nói về cảm xúc, không trái nghĩa với thông minh.',
    ]),
    Q('Câu "Cậu bé rất thông minh." là kiểu câu gì?', ['Ai làm gì?', 'Ai thế nào?', 'Ai là gì?', 'Cầu khiến'], 1, 'Kiểu "Ai thế nào?" — nói về đặc điểm/tính cách.', [
      'Sai — "thông minh" là đặc điểm, không phải hoạt động.',
      'Đúng — câu tả tính cách nên thuộc kiểu "Ai thế nào?".',
      'Sai — câu không có từ "là" nên không phải "Ai là gì?".',
      'Sai — câu này là câu kể, không phải câu cầu khiến.',
    ]),
    Q('Khi gặp việc khó, em nên?', ['Bỏ chạy', 'Đổ lỗi cho người khác', 'Làm liều mà không suy nghĩ', 'Bình tĩnh suy nghĩ tìm cách giải quyết'], 3, 'Bình tĩnh + suy nghĩ là cách của người thông minh.', [
      'Sai — bỏ chạy thì việc khó vẫn còn đó.',
      'Sai — đổ lỗi không giúp giải quyết việc.',
      'Sai — làm liều dễ sai, cần suy nghĩ trước.',
      'Đúng — bình tĩnh suy nghĩ giúp tìm ra cách giải quyết.',
    ]),
  ]),

  M(3, 'Từ chỉ sự vật – Ôn các kiểu câu (Ai – là gì?)', [
    Q('Từ nào CHỈ SỰ VẬT?', ['cô giáo', 'vui vẻ', 'xanh', 'chạy nhảy'], 0, '"Cô giáo" là sự vật (người).', [
      'Đúng — "cô giáo" chỉ người nên là từ chỉ sự vật.',
      'Sai — "vui vẻ" chỉ đặc điểm, không phải sự vật.',
      'Sai — "xanh" chỉ màu sắc (đặc điểm), không phải sự vật.',
      'Sai — "chạy nhảy" chỉ hoạt động, không phải sự vật.',
    ]),
    Q('Trong câu "Bố em là bác sĩ.", từ chỉ sự vật là?', ['bố em, bác sĩ', 'là, bác sĩ', 'chỉ có bác sĩ', 'chỉ có bố em'], 0, '"Bố em" và "bác sĩ" đều là sự vật.', [
      'Đúng — cả "bố em" và "bác sĩ" đều chỉ người (sự vật).',
      'Sai — "là" là từ nối, không phải từ chỉ sự vật.',
      'Sai — còn thiếu "bố em" cũng là từ chỉ sự vật.',
      'Sai — còn thiếu "bác sĩ" cũng là từ chỉ sự vật.',
    ]),
    Q('Câu "Mẹ em là cô giáo." thuộc kiểu?', ['Ai thế nào?', 'Ai là gì?', 'Cầu khiến', 'Ai làm gì?'], 1, 'Có từ "là" → kiểu "Ai là gì?".', [
      'Sai — câu không tả đặc điểm nên không phải "Ai thế nào?".',
      'Đúng — có từ "là" nên thuộc kiểu "Ai là gì?".',
      'Sai — đây là câu kể, không phải câu cầu khiến.',
      'Sai — "cô giáo" không phải hoạt động nên không phải "Ai làm gì?".',
    ]),
    Q('Trong "Hà Nội là thủ đô của Việt Nam.", bộ phận "Hà Nội" trả lời cho câu hỏi?', ['Thế nào?', 'Ai (cái gì)?', 'Làm gì?', 'Là gì?'], 1, '"Hà Nội" trả lời cho "Cái gì?".', [
      'Sai — "Hà Nội" không tả đặc điểm nên không trả lời "Thế nào?".',
      'Đúng — "Hà Nội" là chủ ngữ, trả lời cho "Cái gì?".',
      'Sai — "Hà Nội" không phải hoạt động nên không trả lời "Làm gì?".',
      'Sai — "là thủ đô..." mới trả lời "Là gì?", không phải "Hà Nội".',
    ]),
    Q('Đặt câu kiểu "Ai là gì?" với "em":', ['Em là học sinh lớp 3.', 'Em chạy nhanh.', 'Em đi học.', 'Em rất ngoan.'], 0, 'Có "là" + danh từ chỉ chức vụ/loại → đúng kiểu.', [
      'Đúng — có từ "là" + "học sinh" nên đúng kiểu "Ai là gì?".',
      'Sai — "chạy nhanh" là hoạt động, thuộc kiểu "Ai làm gì?".',
      'Sai — "đi học" là hoạt động, không phải "Ai là gì?".',
      'Sai — "ngoan" là đặc điểm, thuộc kiểu "Ai thế nào?".',
    ]),
    Q('Từ nào KHÔNG chỉ sự vật?', ['chăm chỉ', 'ngôi trường', 'quyển sách', 'con mèo'], 0, '"Chăm chỉ" là từ chỉ đặc điểm.', [
      'Đúng — "chăm chỉ" chỉ đặc điểm, không phải sự vật.',
      'Sai — "ngôi trường" là một sự vật.',
      'Sai — "quyển sách" là một sự vật.',
      'Sai — "con mèo" là một sự vật (con vật).',
    ]),
  ]),

  M(4, 'Tập đọc: "Hai bàn tay em"', [
    Q('Bài thơ "Hai bàn tay em" ca ngợi?', ['Mái tóc', 'Đôi mắt', 'Đôi bàn tay đáng yêu, có ích của em bé', 'Đôi chân'], 2, 'Hai bàn tay vừa đẹp vừa làm được nhiều việc.', [
      'Sai — bài thơ nói về đôi bàn tay, không phải mái tóc.',
      'Sai — bài thơ nói về đôi bàn tay, không phải đôi mắt.',
      'Đúng — bài ca ngợi đôi bàn tay vừa đẹp vừa có ích.',
      'Sai — bài thơ nói về đôi bàn tay, không phải đôi chân.',
    ]),
    Q('Trong bài, hai bàn tay được so sánh với?', ['Con chim', 'Mặt trời', 'Quả bóng', 'Hoa, nụ, cánh sen'], 3, 'So sánh với hoa, nụ — gợi sự xinh xắn.', [
      'Sai — bài thơ không so sánh bàn tay với con chim.',
      'Sai — bài thơ không so sánh bàn tay với mặt trời.',
      'Sai — bài thơ không so sánh bàn tay với quả bóng.',
      'Đúng — bàn tay được so sánh với hoa, nụ, cánh sen cho xinh xắn.',
    ]),
    Q('Hai bàn tay giúp em làm gì?', ['Chỉ để chơi', 'Đánh răng, chải đầu, học bài...', 'Đẩy bạn', 'Chỉ để vẫy chào'], 1, 'Bài thơ liệt kê những việc đôi tay làm hằng ngày.', [
      'Sai — bàn tay làm nhiều việc có ích, không chỉ để chơi.',
      'Đúng — bài liệt kê những việc hằng ngày như đánh răng, học bài.',
      'Sai — đẩy bạn là việc không tốt, không phải ý của bài.',
      'Sai — bàn tay làm nhiều việc, không chỉ để vẫy chào.',
    ]),
    Q('Bài thơ thể hiện tình cảm gì?', ['Ghét đôi tay', 'Tức giận', 'Buồn bã', 'Yêu quý bản thân, biết giữ gìn cơ thể'], 3, 'Yêu quý đôi tay → yêu quý chính mình.', [
      'Sai — bài thơ yêu quý đôi tay, không phải ghét.',
      'Sai — bài thơ không thể hiện sự tức giận.',
      'Sai — bài thơ vui tươi, không buồn bã.',
      'Đúng — yêu quý đôi tay là yêu quý và giữ gìn bản thân.',
    ]),
    Q('"Hồng hào" là từ chỉ?', ['Hoạt động', 'Đặc điểm (màu da)', 'Sự vật', 'Số lượng'], 1, '"Hồng hào" tả màu sắc, là đặc điểm.', [
      'Sai — "hồng hào" không phải việc làm nên không phải hoạt động.',
      'Đúng — "hồng hào" tả màu da nên là từ chỉ đặc điểm.',
      'Sai — "hồng hào" không gọi tên một vật nên không phải sự vật.',
      'Sai — "hồng hào" không chỉ số lượng.',
    ]),
    Q('Em nên làm gì để giữ gìn đôi tay?', ['Rửa tay sạch, cắt móng tay', 'Để bẩn', 'Cắn móng tay', 'Không rửa'], 0, 'Vệ sinh tay thường xuyên.', [
      'Đúng — rửa tay sạch và cắt móng giúp giữ gìn đôi tay.',
      'Sai — để tay bẩn là mất vệ sinh, dễ bệnh.',
      'Sai — cắn móng tay là thói quen không tốt.',
      'Sai — không rửa tay sẽ làm tay bẩn, hại sức khoẻ.',
    ]),
  ]),

  M(5, 'Mở rộng vốn từ: Gia đình', [
    Q('Từ nào chỉ NGƯỜI THÂN trong gia đình?', ['bác bảo vệ', 'bạn cùng lớp', 'ông, bà, bố, mẹ', 'cô giáo'], 2, 'Ông bà bố mẹ là người thân trong gia đình.', [
      'Sai — bác bảo vệ không phải người thân trong gia đình.',
      'Sai — bạn cùng lớp là bạn, không phải người thân.',
      'Đúng — ông, bà, bố, mẹ là người thân trong gia đình.',
      'Sai — cô giáo là người dạy em, không phải người thân.',
    ]),
    Q('"Anh em như thể tay chân" muốn nói?', ['Anh em không cần nhau', 'Anh em đánh nhau', 'Anh em phải đoàn kết, yêu thương', 'Anh em xa cách'], 2, 'Câu tục ngữ về tình anh em ruột thịt.', [
      'Sai — câu này khuyên anh em gắn bó, cần có nhau.',
      'Sai — câu này khuyên yêu thương, không phải đánh nhau.',
      'Đúng — anh em như tay chân nên phải đoàn kết, yêu thương.',
      'Sai — câu này nói anh em gần gũi, không xa cách.',
    ]),
    Q('Người sinh ra bố em gọi là?', ['Ông bà ngoại', 'Bác (anh của bố)', 'Ông bà nội', 'Cụ (bố mẹ của ông)'], 2, 'Bố mẹ của bố = ông bà nội.', [
      'Sai — ông bà ngoại là bố mẹ của mẹ, không phải của bố.',
      'Sai — bác là anh của bố, không phải người sinh ra bố.',
      'Đúng — bố mẹ của bố gọi là ông bà nội.',
      'Sai — cụ là bố mẹ của ông bà, không phải người sinh ra bố.',
    ]),
    Q('Em gái của mẹ em gọi là?', ['Mợ (vợ của cậu)', 'Dì', 'Cô (em gái của bố)', 'Thím (vợ của chú)'], 1, 'Em/chị gái của mẹ gọi là dì.', [
      'Sai — mợ là vợ của cậu, không phải em gái của mẹ.',
      'Đúng — em gái (hoặc chị gái) của mẹ gọi là dì.',
      'Sai — cô là em gái của bố, không phải của mẹ.',
      'Sai — thím là vợ của chú, không phải em gái của mẹ.',
    ]),
    Q('Câu "Cả nhà em rất yêu thương nhau." thuộc kiểu?', ['Ai làm gì?', 'Ai thế nào?', 'Hỏi', 'Ai là gì?'], 1, 'Tả tình cảm → "Ai thế nào?".', [
      'Sai — "yêu thương" là tình cảm (đặc điểm), không phải hoạt động.',
      'Đúng — câu tả tình cảm nên thuộc kiểu "Ai thế nào?".',
      'Sai — câu này là câu kể, cuối câu là dấu chấm, không phải câu hỏi.',
      'Sai — câu không có từ "là" nên không phải "Ai là gì?".',
    ]),
    Q('Em nên làm gì để gia đình hạnh phúc?', ['Vâng lời, giúp đỡ bố mẹ', 'Không học', 'Trốn việc', 'Cãi lời'], 0, 'Vâng lời và giúp đỡ là việc con ngoan nên làm.', [
      'Đúng — vâng lời và giúp đỡ bố mẹ làm gia đình vui.',
      'Sai — không học khiến bố mẹ buồn lòng.',
      'Sai — trốn việc là thói quen không tốt.',
      'Sai — cãi lời bố mẹ làm gia đình không vui.',
    ]),
  ]),

  M(6, 'Tập đọc: "Ai có lỗi?"', [
    Q('Truyện "Ai có lỗi?" nói về?', ['Hai bạn cãi nhau rồi làm hoà', 'Đi du lịch', 'Cuộc thi', 'Bạn học giỏi'], 0, 'Hai bạn giận nhau rồi nhận ra lỗi và làm hoà.', [
      'Đúng — truyện kể hai bạn giận nhau rồi nhận lỗi, làm hoà.',
      'Sai — truyện không kể về đi du lịch.',
      'Sai — truyện không kể về một cuộc thi.',
      'Sai — truyện nói về tình bạn, không phải về học giỏi.',
    ]),
    Q('Vì sao hai bạn cãi nhau?', ['Vì điểm số', 'Vì mất tiền', 'Vì giành đồ chơi', 'Vì hiểu lầm nhỏ'], 3, 'Từ một va chạm nhỏ → hiểu lầm.', [
      'Sai — hai bạn không cãi nhau vì điểm số.',
      'Sai — hai bạn không cãi nhau vì mất tiền.',
      'Sai — hai bạn không cãi nhau vì giành đồ chơi.',
      'Đúng — từ một va chạm nhỏ dẫn đến hiểu lầm rồi cãi nhau.',
    ]),
    Q('Sau khi cãi nhau, các bạn đã?', ['Không bao giờ nói chuyện', 'Xin lỗi và làm hoà', 'Đánh nhau', 'Cãi tiếp'], 1, 'Biết nhận lỗi và xin lỗi nhau.', [
      'Sai — các bạn đã làm hoà chứ không nghỉ chơi nhau.',
      'Đúng — các bạn biết nhận lỗi, xin lỗi và làm hoà.',
      'Sai — các bạn làm hoà, không đánh nhau.',
      'Sai — các bạn đã làm hoà, không cãi tiếp.',
    ]),
    Q('Bài học từ câu chuyện?', ['Phải thắng bạn', 'Bạn bè cần độ lượng, biết nhận lỗi', 'Không nên chơi với ai', 'Lờ đi mọi việc'], 1, 'Tình bạn cần sự tha thứ và nhận lỗi.', [
      'Sai — tình bạn không phải để thắng thua nhau.',
      'Đúng — bạn bè cần độ lượng, biết nhận lỗi và tha thứ.',
      'Sai — ta vẫn nên chơi và yêu thương bạn bè.',
      'Sai — lờ đi mọi việc không giúp tình bạn tốt hơn.',
    ]),
    Q('"Làm hoà" có nghĩa?', ['Đánh nhau', 'Hoà giải, lại thân thiết', 'Im lặng giận nhau lâu hơn', 'Giả vờ không có chuyện gì'], 1, '"Làm hoà" = trở lại thân thiết sau khi giận.', [
      'Sai — "làm hoà" là hết giận, không phải đánh nhau.',
      'Đúng — "làm hoà" là hoà giải, lại thân thiết với nhau.',
      'Sai — "làm hoà" là hết giận, không phải giận lâu hơn.',
      'Sai — "làm hoà" là thật lòng hết giận, không phải giả vờ.',
    ]),
    Q('Khi mình có lỗi với bạn, em nên?', ['Đổ lỗi', 'Bỏ chạy', 'Xin lỗi chân thành', 'Không nói gì'], 2, 'Người tốt biết nhận lỗi và xin lỗi.', [
      'Sai — đổ lỗi cho bạn là sai, càng làm bạn buồn.',
      'Sai — bỏ chạy không giúp giải quyết lỗi của mình.',
      'Đúng — biết nhận lỗi và xin lỗi chân thành là điều nên làm.',
      'Sai — im lặng không nhận lỗi sẽ làm bạn buồn lâu hơn.',
    ]),
  ]),

  M(7, 'Từ chỉ hoạt động – trạng thái', [
    Q('Từ nào CHỈ HOẠT ĐỘNG?', ['tròn', 'thấp', 'xanh', 'đọc'], 3, '"Đọc" là hoạt động.', [
      'Sai — "tròn" tả hình dáng nên là đặc điểm.',
      'Sai — "thấp" tả chiều cao nên là đặc điểm.',
      'Sai — "xanh" tả màu sắc nên là đặc điểm.',
      'Đúng — "đọc" là một việc làm nên là từ chỉ hoạt động.',
    ]),
    Q('Trong câu "Em đang học bài.", từ chỉ hoạt động là?', ['em (chủ thể của câu)', 'học', 'bài (sự vật được học)', 'đang (chỉ thời gian)'], 1, '"Học" là hoạt động.', [
      'Sai — "em" chỉ người (sự vật), không phải hoạt động.',
      'Đúng — "học" là việc làm nên là từ chỉ hoạt động.',
      'Sai — "bài" là sự vật, không phải hoạt động.',
      'Sai — "đang" chỉ thời gian, không phải hoạt động.',
    ]),
    Q('Từ nào CHỈ TRẠNG THÁI?', ['nhanh', 'buồn', 'chạy', 'cái bàn'], 1, '"Buồn" chỉ trạng thái cảm xúc.', [
      'Sai — "nhanh" tả tốc độ nên là đặc điểm.',
      'Đúng — "buồn" là cảm xúc nên là từ chỉ trạng thái.',
      'Sai — "chạy" là việc làm nên là hoạt động.',
      'Sai — "cái bàn" là sự vật.',
    ]),
    Q('Trong "Mẹ vui khi em được điểm 10.", từ chỉ trạng thái là?', ['điểm (sự vật)', '10', 'mẹ (sự vật)', 'vui'], 3, '"Vui" là trạng thái cảm xúc.', [
      'Sai — "điểm" là sự vật, không phải trạng thái.',
      'Sai — "10" là con số, không phải trạng thái.',
      'Sai — "mẹ" chỉ người (sự vật), không phải trạng thái.',
      'Đúng — "vui" là cảm xúc nên là từ chỉ trạng thái.',
    ]),
    Q('Câu "Học sinh đang viết bài." thuộc kiểu?', ['Ai làm gì?', 'Ai ở đâu?', 'Ai là gì?', 'Ai thế nào?'], 0, '"Học sinh" + "viết bài" (hoạt động) → "Ai làm gì?".', [
      'Đúng — "viết bài" là hoạt động nên thuộc kiểu "Ai làm gì?".',
      'Sai — câu không nói nơi chốn nên không phải "Ai ở đâu?".',
      'Sai — câu không có từ "là" nên không phải "Ai là gì?".',
      'Sai — câu không tả đặc điểm nên không phải "Ai thế nào?".',
    ]),
    Q('Đặt câu có từ chỉ hoạt động "nhảy":', ['Nhảy là gì?', 'Em là nhảy.', 'Em nhảy dây trong giờ ra chơi.', 'Em rất nhảy.'], 2, '"Nhảy dây" — hoạt động hợp ngữ cảnh.', [
      'Sai — đây là câu hỏi, không phải câu dùng "nhảy" làm hoạt động.',
      'Sai — "Em là nhảy" không đúng ngữ pháp tiếng Việt.',
      'Đúng — "nhảy dây" là hoạt động, câu đúng và hợp lí.',
      'Sai — "rất nhảy" không đúng vì "nhảy" không phải đặc điểm.',
    ]),
  ]),

  M(8, 'Tập đọc: "Người mẹ"', [
    Q('Truyện "Người mẹ" ca ngợi?', ['Tình thương yêu vô bờ của người mẹ', 'Vẻ đẹp', 'Sự giàu có', 'Sức khoẻ'], 0, 'Mẹ sẵn sàng hi sinh để cứu con.', [
      'Đúng — truyện ca ngợi tình thương yêu vô bờ của người mẹ.',
      'Sai — truyện không nói về vẻ đẹp.',
      'Sai — truyện không nói về sự giàu có.',
      'Sai — truyện ca ngợi tình mẹ, không phải sức khoẻ.',
    ]),
    Q('Vì con, người mẹ đã làm gì?', ['Vượt mọi khó khăn, hi sinh bản thân', 'Cười nhạo', 'Quên mất', 'Bỏ con đi'], 0, 'Mẹ vượt qua nhiều thử thách để tìm con.', [
      'Đúng — mẹ vượt mọi khó khăn, sẵn sàng hi sinh để tìm con.',
      'Sai — mẹ thương con, không cười nhạo.',
      'Sai — mẹ luôn nhớ con, không quên.',
      'Sai — mẹ đi tìm con, không bỏ con.',
    ]),
    Q('Bài học từ câu chuyện?', ['Không cần mẹ', 'Biết ơn và yêu thương mẹ', 'Chỉ cần tiền', 'Coi thường mẹ'], 1, 'Yêu thương và biết ơn mẹ là điều quan trọng.', [
      'Sai — mẹ rất quan trọng, ta luôn cần mẹ.',
      'Đúng — ta cần biết ơn và yêu thương mẹ.',
      'Sai — tình mẹ quý hơn tiền bạc.',
      'Sai — ta phải kính trọng mẹ, không coi thường.',
    ]),
    Q('"Hi sinh" có nghĩa?', ['Vui vẻ', 'Lười biếng', 'Chịu mất mát vì người khác', 'Tự ý làm theo ý mình'], 2, '"Hi sinh" = chịu thiệt vì người khác.', [
      'Sai — "hi sinh" không có nghĩa là vui vẻ.',
      'Sai — "hi sinh" trái với lười biếng.',
      'Đúng — "hi sinh" là chịu mất mát, thiệt thòi vì người khác.',
      'Sai — "hi sinh" là vì người khác, không phải vì ý mình.',
    ]),
    Q('Em làm gì để mẹ vui?', ['Bỏ học', 'Chỉ chơi', 'Cãi mẹ', 'Học giỏi, ngoan, giúp việc nhà'], 3, 'Con ngoan = niềm vui lớn nhất của mẹ.', [
      'Sai — bỏ học khiến mẹ buồn lòng.',
      'Sai — chỉ chơi mà không học khiến mẹ lo.',
      'Sai — cãi mẹ làm mẹ buồn.',
      'Đúng — học giỏi, ngoan và giúp việc nhà làm mẹ vui.',
    ]),
    Q('Câu "Mẹ là người em yêu nhất." thuộc kiểu?', ['Ai thế nào?', 'Ai là gì?', 'Ai làm gì?', 'Cảm thán'], 1, 'Có "là" + cụm danh từ → "Ai là gì?".', [
      'Sai — câu không tả đặc điểm nên không phải "Ai thế nào?".',
      'Đúng — có từ "là" nên thuộc kiểu "Ai là gì?".',
      'Sai — câu không có hoạt động nên không phải "Ai làm gì?".',
      'Sai — câu kết bằng dấu chấm nên không phải câu cảm thán.',
    ]),
  ]),

  M(9, 'Ôn tập giữa học kì 1', [
    Q('Câu nào dùng dấu chấm đúng?', ['em đi học', 'Em đi học.', 'Em đi học?', 'em Đi học!'], 1, 'Đầu câu hoa, cuối câu kể dùng dấu chấm.', [
      'Sai — đầu câu chưa viết hoa và thiếu dấu chấm cuối.',
      'Đúng — đầu câu hoa "Em", cuối câu kể có dấu chấm.',
      'Sai — đây là câu kể nên dùng dấu chấm, không dùng dấu hỏi.',
      'Sai — đầu câu chưa hoa, lại viết hoa sai chữ "Đi".',
    ]),
    Q('Bộ phận in đậm trong "Bố em LÀ KỸ SƯ." trả lời cho câu hỏi?', ['Câu hỏi Ai?', 'Làm gì?', 'Là gì?', 'Thế nào?'], 2, 'Cụm "là kỹ sư" trả lời cho "Là gì?".', [
      'Sai — "Bố em" mới trả lời "Ai?", không phải phần in đậm.',
      'Sai — "là kỹ sư" không phải hoạt động nên không trả lời "Làm gì?".',
      'Đúng — cụm "là kỹ sư" trả lời cho câu hỏi "Là gì?".',
      'Sai — câu không tả đặc điểm nên không trả lời "Thế nào?".',
    ]),
    Q('Từ nào chỉ đặc điểm?', ['sách (sự vật)', 'hát (hoạt động)', 'cao', 'mẹ (sự vật)'], 2, '"Cao" tả chiều cao → đặc điểm.', [
      'Sai — "sách" là sự vật, không phải đặc điểm.',
      'Sai — "hát" là việc làm nên là hoạt động.',
      'Đúng — "cao" tả chiều cao nên là từ chỉ đặc điểm.',
      'Sai — "mẹ" chỉ người (sự vật), không phải đặc điểm.',
    ]),
    Q('Câu "Lan học rất chăm." thuộc kiểu?', ['Ai là gì?', 'Ai làm gì?', 'Ai thế nào?', 'Cầu khiến'], 2, 'Tả mức độ học → "Ai thế nào?".', [
      'Sai — câu không có từ "là" nên không phải "Ai là gì?".',
      'Sai — câu tả mức độ "rất chăm" nên không phải "Ai làm gì?".',
      'Đúng — câu tả đặc điểm "rất chăm" nên thuộc "Ai thế nào?".',
      'Sai — đây là câu kể, không phải câu cầu khiến.',
    ]),
    Q('Chính tả: chọn từ đúng', ['xinh sắn', 'xinh xắn', 'sinh sắn', 'sinh xắn'], 1, '"Xinh xắn" là cách viết đúng.', [
      'Sai — phải viết "xắn" với "x", không phải "sắn".',
      'Đúng — "xinh xắn" là cách viết đúng chính tả.',
      'Sai — phải viết "xinh" với "x", không phải "sinh".',
      'Sai — cả hai tiếng đều viết sai phụ âm đầu.',
    ]),
    Q('Khi viết tên người, em phải?', ['Viết hoa chữ cái đầu mỗi tiếng', 'Viết tắt', 'Viết in', 'Viết thường'], 0, 'Tên riêng viết hoa chữ cái đầu mỗi tiếng.', [
      'Đúng — tên người viết hoa chữ cái đầu của mỗi tiếng.',
      'Sai — không viết tắt tên người.',
      'Sai — không cần viết in cả chữ.',
      'Sai — tên riêng phải viết hoa, không viết thường.',
    ]),
  ]),

  M(10, 'Tập đọc: "Giọng quê hương"', [
    Q('Bài "Giọng quê hương" ca ngợi?', ['Học giỏi', 'Đi chơi xa', 'Có nhiều tiền', 'Tình cảm với quê hương qua giọng nói'], 3, 'Giọng nói gợi nhớ quê hương.', [
      'Sai — bài nói về tình quê, không phải học giỏi.',
      'Sai — bài không ca ngợi việc đi chơi xa.',
      'Sai — bài không nói về tiền bạc.',
      'Đúng — bài ca ngợi tình cảm quê hương qua giọng nói.',
    ]),
    Q('Giọng quê hương khiến nhân vật?', ['Xúc động, nhớ về quê', 'Sợ hãi', 'Tức giận', 'Buồn ngủ'], 0, 'Giọng quê làm con người xúc động, gần gũi.', [
      'Đúng — giọng quê khiến nhân vật xúc động, nhớ về quê.',
      'Sai — giọng quê gợi thân thương, không gây sợ hãi.',
      'Sai — giọng quê không khiến nhân vật tức giận.',
      'Sai — giọng quê làm xúc động, không phải buồn ngủ.',
    ]),
    Q('Bài học?', ['Yêu quê hương dù đi đâu', 'Quên quê', 'Không cần quê', 'Chê quê'], 0, 'Quê hương là cội nguồn, luôn nhớ về.', [
      'Đúng — dù đi đâu cũng luôn yêu và nhớ về quê hương.',
      'Sai — bài khuyên nhớ quê, không phải quên quê.',
      'Sai — quê hương là cội nguồn, ta luôn cần nhớ.',
      'Sai — bài dạy yêu quê, không phải chê quê.',
    ]),
    Q('"Quê hương" trong câu là?', ['Đặc điểm', 'Hoạt động', 'Từ chỉ sự vật (nơi chốn)', 'Trạng thái'], 2, '"Quê hương" là danh từ chỉ địa điểm.', [
      'Sai — "quê hương" không tả tính chất nên không phải đặc điểm.',
      'Sai — "quê hương" không phải việc làm.',
      'Đúng — "quê hương" chỉ nơi chốn nên là từ chỉ sự vật.',
      'Sai — "quê hương" không phải cảm xúc nên không phải trạng thái.',
    ]),
    Q('Đặt câu so sánh: "Giọng quê hương ngọt ngào như ...":', ['... đá lạnh.', '... mật ong.', '... cay đắng.', '... gai nhọn.'], 1, 'So sánh ngọt với mật ong — hợp lý.', [
      'Sai — đá lạnh không gợi sự ngọt ngào.',
      'Đúng — so sánh "ngọt ngào" với "mật ong" rất hợp lí.',
      'Sai — "cay đắng" trái với "ngọt ngào".',
      'Sai — gai nhọn không gợi sự ngọt ngào.',
    ]),
    Q('Em làm gì để bày tỏ tình yêu quê hương?', ['Vứt rác', 'Giữ gìn vệ sinh, học tốt, kể về quê', 'Chê bai', 'Không quan tâm'], 1, 'Yêu quê hương qua hành động cụ thể.', [
      'Sai — vứt rác làm quê hương bẩn, không phải yêu quê.',
      'Đúng — giữ vệ sinh, học tốt, kể về quê là cách yêu quê.',
      'Sai — chê bai không phải là yêu quê hương.',
      'Sai — thờ ơ không phải là yêu quê hương.',
    ]),
  ]),

  M(11, 'Mở rộng vốn từ: Quê hương · So sánh', [
    Q('Từ nào chỉ cảnh đẹp quê hương?', ['nhà cao tầng', 'xe ô tô', 'điện thoại', 'cánh đồng, dòng sông'], 3, 'Cánh đồng, dòng sông là cảnh đẹp quê.', [
      'Sai — nhà cao tầng là cảnh thành phố, không gợi cảnh quê.',
      'Sai — xe ô tô là phương tiện, không phải cảnh đẹp quê.',
      'Sai — điện thoại là đồ vật, không phải cảnh đẹp quê.',
      'Đúng — cánh đồng, dòng sông là cảnh đẹp của quê hương.',
    ]),
    Q('Trong câu "Trẻ em như búp trên cành.", từ so sánh là?', ['như', 'cành (sự vật được so sánh tới)', 'búp (hình ảnh so sánh)', 'trẻ em'], 0, '"Như" là từ chỉ sự so sánh.', [
      'Đúng — "như" là từ dùng để so sánh hai hình ảnh.',
      'Sai — "cành" là sự vật, không phải từ so sánh.',
      'Sai — "búp" là hình ảnh được đem so sánh, không phải từ so sánh.',
      'Sai — "trẻ em" là sự vật được so sánh, không phải từ so sánh.',
    ]),
    Q('Câu nào CÓ phép so sánh?', ['Trời mưa.', 'Mẹ ăn cơm.', 'Em đi học.', 'Mặt trời đỏ rực như lửa.'], 3, 'Có từ "như" → có phép so sánh.', [
      'Sai — "Trời mưa" không có từ so sánh.',
      'Sai — "Mẹ ăn cơm" chỉ kể việc, không so sánh.',
      'Sai — "Em đi học" chỉ kể việc, không so sánh.',
      'Đúng — có từ "như" so sánh mặt trời với lửa.',
    ]),
    Q('Hoàn thành: "Dòng sông quê em xanh như ..."', ['mực đen', 'than', 'ngọc', 'máu'], 2, 'Xanh ngọc — hợp với dòng sông.', [
      'Sai — mực đen có màu đen, không hợp với "xanh".',
      'Sai — than có màu đen, không hợp với "xanh".',
      'Đúng — "xanh như ngọc" hợp và đẹp với dòng sông.',
      'Sai — máu có màu đỏ, không hợp với "xanh".',
    ]),
    Q('Quê hương em có thể là?', ['Nước Mỹ', 'Sao Hoả', 'Đáy biển', 'Làng, phố, thành phố nơi em sinh ra/lớn lên'], 3, 'Quê là nơi sinh ra, lớn lên.', [
      'Sai — nước Mỹ là nước ngoài, không phải quê em.',
      'Sai — Sao Hoả là hành tinh, con người chưa ở đó.',
      'Sai — đáy biển không phải nơi con người sinh sống.',
      'Đúng — quê hương là làng, phố nơi em sinh ra và lớn lên.',
    ]),
    Q('"Quê hương" và "đất nước" có quan hệ?', ['Không liên quan', 'Trái nghĩa', 'Đồng nghĩa gần (đều chỉ nơi gắn bó)', 'Đối lập'], 2, 'Đều chỉ nơi chôn rau cắt rốn, gắn bó.', [
      'Sai — hai từ này có liên quan, cùng chỉ nơi ta gắn bó.',
      'Sai — hai từ này không trái nghĩa.',
      'Đúng — hai từ gần nghĩa, đều chỉ nơi ta gắn bó.',
      'Sai — hai từ không đối lập mà gần nghĩa nhau.',
    ]),
    Q('Nhân hoá là cách viết như thế nào?', ['Gọi hoặc tả con vật, cây cối, đồ vật... bằng những từ vốn dùng cho con người', 'So sánh hai sự vật bằng từ "như"', 'Kể lại một câu chuyện có thật', 'Liệt kê nhiều sự vật trong một câu'], 0, 'Nhân hoá là biến vật thành "người": gọi, tả vật như gọi, tả người.', [
      'Đúng — nhân hoá là gọi, tả vật như gọi, tả con người.',
      'Sai — dùng từ "như" để ví hai vật là phép so sánh, không phải nhân hoá.',
      'Sai — kể chuyện có thật không phải là biện pháp nhân hoá.',
      'Sai — kể ra nhiều sự vật là phép liệt kê, không phải nhân hoá.',
    ]),
    Q('Câu nào CÓ phép nhân hoá?', ['Ông mặt trời thức dậy, mỉm cười với em.', 'Mặt trời mọc ở phía đông.', 'Trời hôm nay rất nóng.', 'Em nhìn thấy mặt trời.'], 0, 'Gọi mặt trời là "ông" và tả nó "thức dậy", "mỉm cười" như người.', [
      'Đúng — gọi "ông mặt trời", tả nó "thức dậy", "mỉm cười" như người.',
      'Sai — câu chỉ kể mặt trời mọc, không coi nó như người.',
      'Sai — câu chỉ nói trời nóng, không có hình ảnh nhân hoá.',
      'Sai — câu chỉ kể việc em nhìn, vật không được tả như người.',
    ]),
    Q('Câu nào dùng phép NHÂN HOÁ (chứ không phải so sánh)?', ['Chú gà trống gọi mọi người thức dậy.', 'Tiếng gà trống vang như tiếng kèn.', 'Gà trống to như cái mũ.', 'Lông gà mượt như tơ.'], 0, 'Nhân hoá: gà "gọi" người như một con người; ba câu kia có "như" nên là so sánh.', [
      'Đúng — gà trống "gọi" mọi người, được tả hành động như người.',
      'Sai — câu có từ "như" nên là phép so sánh, không phải nhân hoá.',
      'Sai — câu có từ "như" nên là phép so sánh, không phải nhân hoá.',
      'Sai — câu có từ "như" nên là phép so sánh, không phải nhân hoá.',
    ]),
    Q('Trong câu "Chị gió đùa nghịch trên cành lá.", vật được nhân hoá bằng cách nào?', ['Gọi vật bằng từ chỉ người ("chị") và tả vật bằng hoạt động của người ("đùa nghịch")', 'So sánh gió với cành lá', 'Liệt kê các loại gió', 'Đặt câu hỏi về gió'], 0, 'Vừa gọi gió là "chị", vừa cho gió "đùa nghịch" như một bạn nhỏ.', [
      'Đúng — gọi gió là "chị" và cho gió "đùa nghịch" như con người.',
      'Sai — câu không có từ "như" nên không phải so sánh.',
      'Sai — câu chỉ nói về một cơn gió, không liệt kê nhiều loại.',
      'Sai — câu là câu kể, không phải câu hỏi.',
    ]),
    Q('Cách nhân hoá nào được dùng trong câu "Bác nông dân ơi, mây hỏi: trời sắp mưa rồi phải không?"', ['Trò chuyện, xưng hô với vật như nói với người', 'Đếm số đám mây', 'So sánh mây với mưa', 'Tả màu sắc của mây'], 0, 'Để mây "hỏi" và trò chuyện với người — đó là cách nhân hoá bằng trò chuyện.', [
      'Đúng — cho mây "hỏi" và trò chuyện với người là một cách nhân hoá.',
      'Sai — câu không đếm số đám mây.',
      'Sai — câu không có từ "như" để so sánh mây với mưa.',
      'Sai — câu không tả màu sắc mà cho mây nói chuyện.',
    ]),
    Q('Từ nào trong câu "Những bông hoa cười tươi trong nắng." cho thấy phép nhân hoá?', ['cười', 'những', 'trong', 'nắng'], 0, 'Hoa không biết cười; gán hành động "cười" của người cho hoa là nhân hoá.', [
      'Đúng — "cười" là hoạt động của người, gán cho hoa nên là nhân hoá.',
      'Sai — "những" chỉ số nhiều, không tạo nên nhân hoá.',
      'Sai — "trong" là từ chỉ nơi chốn, không phải dấu hiệu nhân hoá.',
      'Sai — "nắng" là sự vật, không phải từ làm nên nhân hoá.',
    ]),
  ]),

  M(12, 'Tập đọc: "Nắng phương Nam"', [
    Q('Bài "Nắng phương Nam" nói về?', ['Trận bóng', 'Cuộc thi học sinh giỏi', 'Tình bạn của các bạn nhỏ Bắc – Nam', 'Đi du lịch'], 2, 'Các bạn miền Nam gửi nhánh mai tặng bạn miền Bắc.', [
      'Sai — bài không kể về trận bóng.',
      'Sai — bài không kể về cuộc thi học sinh giỏi.',
      'Đúng — bài kể tình bạn của các bạn nhỏ hai miền Bắc – Nam.',
      'Sai — bài không kể về chuyến du lịch.',
    ]),
    Q('Vì sao các bạn gửi nhánh mai cho bạn miền Bắc?', ['Để bạn cảm nhận Tết phương Nam', 'Vì hết hoa đào', 'Vì bị bắt buộc', 'Vì muốn khoe'], 0, 'Để chia sẻ không khí Tết miền Nam.', [
      'Đúng — gửi mai để bạn miền Bắc cảm nhận Tết phương Nam.',
      'Sai — không phải vì hết hoa đào.',
      'Sai — các bạn tự nguyện tặng, không bị bắt buộc.',
      'Sai — các bạn tặng vì tình bạn, không phải để khoe.',
    ]),
    Q('Bài học?', ['Chỉ chơi với bạn cùng phố', 'Phải sống một mình', 'Không cần bạn xa', 'Tình bạn đẹp vượt khoảng cách địa lý'], 3, 'Tình bạn không phân biệt vùng miền.', [
      'Sai — ta có thể kết bạn với bạn ở mọi nơi.',
      'Sai — ai cũng cần có bạn bè.',
      'Sai — bạn ở xa vẫn là bạn quý.',
      'Đúng — tình bạn đẹp có thể vượt mọi khoảng cách địa lí.',
    ]),
    Q('Hoa mai thường nở vào dịp?', ['Mùa hè', 'Tết Nguyên Đán', 'Tết Trung Thu', 'Giáng sinh'], 1, 'Mai vàng nở dịp Tết, đặc trưng miền Nam.', [
      'Sai — mai nở vào mùa xuân (Tết), không phải mùa hè.',
      'Đúng — mai vàng nở vào dịp Tết Nguyên Đán ở miền Nam.',
      'Sai — Trung Thu vào mùa thu, không phải mùa mai nở.',
      'Sai — Giáng sinh không phải dịp mai nở ở Việt Nam.',
    ]),
    Q('Hoa đào thường có ở miền nào dịp Tết?', ['Miền Trung', 'Cả ba miền', 'Miền Nam', 'Miền Bắc'], 3, 'Đào hồng/đỏ là đặc trưng miền Bắc.', [
      'Sai — đào là đặc trưng miền Bắc, không phải miền Trung.',
      'Sai — đào chủ yếu ở miền Bắc, không phải cả ba miền.',
      'Sai — miền Nam đặc trưng là hoa mai, không phải đào.',
      'Đúng — hoa đào là đặc trưng ngày Tết của miền Bắc.',
    ]),
    Q('Câu "Cành mai vàng rực như nắng." là?', ['Câu kể có hình ảnh so sánh', 'Câu hỏi', 'Câu cầu khiến', 'Câu cảm'], 0, 'Có "như" → so sánh.', [
      'Đúng — câu kể có từ "như" so sánh cành mai với nắng.',
      'Sai — câu không hỏi nên không phải câu hỏi.',
      'Sai — câu không yêu cầu ai làm gì nên không phải câu cầu khiến.',
      'Sai — câu kết bằng dấu chấm nên không phải câu cảm.',
    ]),
  ]),

  M(13, 'Dấu chấm – dấu phẩy · Đặt câu hỏi cho bộ phận in đậm', [
    Q('Đặt dấu phẩy đúng: "Trong vườn có hoa hồng hoa cúc hoa lan."', ['Trong vườn, có hoa hồng hoa cúc hoa lan.', 'Trong vườn có, hoa hồng hoa cúc, hoa lan.', 'Trong, vườn có hoa, hồng hoa cúc hoa lan.', 'Trong vườn có hoa hồng, hoa cúc, hoa lan.'], 3, 'Dấu phẩy ngăn cách các thành phần liệt kê.', [
      'Sai — chưa tách các loài hoa được liệt kê bằng dấu phẩy.',
      'Sai — đặt dấu phẩy sai chỗ, không tách đúng các loài hoa.',
      'Sai — tách "Trong, vườn" và "hoa, hồng" là sai chỗ.',
      'Đúng — dấu phẩy ngăn cách hoa hồng, hoa cúc, hoa lan.',
    ]),
    Q('Dấu chấm dùng để?', ['Kết thúc câu kể', 'Cảm thán', 'Kết thúc câu hỏi', 'Mở đầu câu'], 0, 'Cuối câu kể thường có dấu chấm.', [
      'Đúng — dấu chấm đặt ở cuối câu kể.',
      'Sai — câu cảm thán dùng dấu chấm than (!).',
      'Sai — câu hỏi dùng dấu chấm hỏi (?).',
      'Sai — dấu chấm đặt cuối câu, không phải mở đầu.',
    ]),
    Q('Đặt câu hỏi cho bộ phận in đậm: "EM LÀ HỌC SINH lớp 3."', ['Em là gì?', 'Em làm gì?', 'Em khi nào?', 'Em ở đâu?'], 0, '"Là học sinh" → câu hỏi "là gì?".', [
      'Đúng — phần "là học sinh" trả lời cho câu hỏi "là gì?".',
      'Sai — "là học sinh" không phải hoạt động nên không hỏi "làm gì?".',
      'Sai — phần in đậm không chỉ thời gian nên không hỏi "khi nào?".',
      'Sai — phần in đậm không chỉ nơi chốn nên không hỏi "ở đâu?".',
    ]),
    Q('Đặt câu hỏi cho "Mẹ ĐANG NẤU CƠM."', ['Mẹ thế nào?', 'Mẹ là gì?', 'Mẹ ở đâu?', 'Mẹ làm gì?'], 3, '"Nấu cơm" là hoạt động → "làm gì?".', [
      'Sai — "nấu cơm" là hoạt động, không phải đặc điểm.',
      'Sai — câu không có từ "là" nên không hỏi "là gì?".',
      'Sai — phần in đậm không chỉ nơi chốn nên không hỏi "ở đâu?".',
      'Đúng — "nấu cơm" là hoạt động nên hỏi "làm gì?".',
    ]),
    Q('Câu "Hôm nay, em đi học sớm." có dấu phẩy để?', ['Kết thúc câu', 'Báo hiệu câu hỏi', 'Trang trí', 'Tách trạng ngữ "hôm nay"'], 3, 'Dấu phẩy tách trạng ngữ thời gian.', [
      'Sai — dấu kết thúc câu là dấu chấm, không phải dấu phẩy.',
      'Sai — dấu phẩy không báo hiệu câu hỏi.',
      'Sai — dấu phẩy có nhiệm vụ rõ ràng, không phải để trang trí.',
      'Đúng — dấu phẩy tách trạng ngữ thời gian "hôm nay".',
    ]),
    Q('Câu nào dùng dấu phẩy SAI?', ['Buổi sáng, em ăn sáng.', 'Hôm qua, em đi chơi.', 'Trong lớp, em ngồi bàn đầu.', 'Em, đi học.'], 3, '"Em đi học" không cần dấu phẩy giữa CN và VN.', [
      'Sai — câu này đặt phẩy đúng, tách trạng ngữ "buổi sáng".',
      'Sai — câu này đặt phẩy đúng, tách trạng ngữ "hôm qua".',
      'Sai — câu này đặt phẩy đúng, tách trạng ngữ "trong lớp".',
      'Đúng — không đặt dấu phẩy giữa "Em" và "đi học".',
    ]),
  ]),

  M(14, 'Tập đọc: "Cửa Tùng"', [
    Q('Bài "Cửa Tùng" miêu tả?', ['Sa mạc', 'Núi cao', 'Một khu rừng', 'Vẻ đẹp một vùng biển'], 3, 'Cửa Tùng — bãi biển nổi tiếng ở Quảng Trị.', [
      'Sai — bài tả vùng biển, không phải sa mạc.',
      'Sai — bài tả vùng biển, không phải núi cao.',
      'Sai — bài tả vùng biển, không phải khu rừng.',
      'Đúng — Cửa Tùng là bãi biển đẹp ở Quảng Trị.',
    ]),
    Q('Vẻ đẹp Cửa Tùng được tả qua?', ['Màu nước thay đổi trong ngày', 'Tiếng nhạc', 'Số khách', 'Vị mặn'], 0, 'Bài tả nước biển đổi màu sớm – trưa – chiều.', [
      'Đúng — nước biển đổi màu theo sớm, trưa, chiều.',
      'Sai — bài không tả qua tiếng nhạc.',
      'Sai — bài không tả qua số lượng khách.',
      'Sai — bài tả màu nước, không tả vị mặn.',
    ]),
    Q('Bài giúp em hiểu?', ['Biển nguy hiểm', 'Không nên đi biển', 'Biển ở nước ngoài đẹp hơn', 'Đất nước Việt Nam có nhiều cảnh đẹp'], 3, 'Tự hào về cảnh đẹp quê hương.', [
      'Sai — bài ca ngợi vẻ đẹp, không nói biển nguy hiểm.',
      'Sai — bài không khuyên tránh đi biển.',
      'Sai — bài tự hào về cảnh đẹp Việt Nam.',
      'Đúng — đất nước Việt Nam có nhiều cảnh đẹp đáng tự hào.',
    ]),
    Q('"Cửa Tùng" thuộc tỉnh nào?', ['Quảng Trị', 'Hà Nội', 'Lào Cai', 'Cần Thơ'], 0, 'Cửa Tùng thuộc Quảng Trị, miền Trung.', [
      'Đúng — Cửa Tùng thuộc tỉnh Quảng Trị, miền Trung.',
      'Sai — Hà Nội không có biển Cửa Tùng.',
      'Sai — Lào Cai là tỉnh miền núi, không có Cửa Tùng.',
      'Sai — Cần Thơ ở miền Tây, không có Cửa Tùng.',
    ]),
    Q('Câu "Mặt trời lặn xuống biển đỏ rực như quả bóng lửa." có phép?', ['Liệt kê', 'So sánh', 'Đối lập', 'Lặp lại'], 1, 'Có "như" → so sánh.', [
      'Sai — câu không kể nhiều thứ nối tiếp nên không phải liệt kê.',
      'Đúng — có từ "như" so sánh mặt trời với quả bóng lửa.',
      'Sai — câu không nêu hai điều trái ngược.',
      'Sai — câu không lặp lại từ ngữ.',
    ]),
    Q('Em làm gì khi đi biển để bảo vệ môi trường?', ['Vứt rác xuống biển', 'Đánh bắt cá nhỏ', 'Không vứt rác bừa bãi', 'Phá san hô'], 2, 'Bảo vệ môi trường biển.', [
      'Sai — vứt rác xuống biển làm ô nhiễm môi trường.',
      'Sai — bắt cá nhỏ làm hại nguồn sống của biển.',
      'Đúng — không vứt rác bừa bãi giúp bảo vệ biển.',
      'Sai — phá san hô làm hại môi trường biển.',
    ]),
  ]),

  M(15, 'Mở rộng vốn từ: Từ địa phương · Dấu chấm hỏi – chấm than', [
    Q('Dấu chấm hỏi (?) dùng cuối câu?', ['Hỏi', 'Kể (câu trần thuật)', 'Cầu khiến', 'Cảm thán'], 0, 'Cuối câu hỏi dùng dấu ?.', [
      'Đúng — dấu chấm hỏi đặt cuối câu hỏi.',
      'Sai — câu kể dùng dấu chấm, không phải dấu hỏi.',
      'Sai — câu cầu khiến thường dùng dấu chấm than.',
      'Sai — câu cảm thán dùng dấu chấm than.',
    ]),
    Q('Dấu chấm than (!) dùng cuối câu?', ['Cảm thán hoặc cầu khiến', 'Kể chuyện bình thường', 'Liệt kê', 'Câu hỏi'], 0, 'Dấu ! dùng cho câu cảm và câu khiến.', [
      'Đúng — dấu chấm than dùng cho câu cảm thán hoặc cầu khiến.',
      'Sai — câu kể bình thường dùng dấu chấm.',
      'Sai — liệt kê dùng dấu phẩy, không phải dấu chấm than.',
      'Sai — câu hỏi dùng dấu chấm hỏi.',
    ]),
    Q('Đặt dấu đúng: "Em đi đâu đấy ___"', ['! (câu cảm thán)', '.', '?', ','], 2, '"Đi đâu" → câu hỏi → dùng ?.', [
      'Sai — đây là câu hỏi, không phải câu cảm thán.',
      'Sai — đây là câu hỏi nên dùng dấu hỏi, không phải dấu chấm.',
      'Đúng — "đi đâu" là câu hỏi nên dùng dấu chấm hỏi.',
      'Sai — dấu phẩy không dùng để kết thúc câu hỏi.',
    ]),
    Q('Đặt dấu đúng: "Ôi, đẹp quá ___"', ['? (câu hỏi)', '!', '.', ','], 1, 'Câu cảm thán → dùng !.', [
      'Sai — đây là câu cảm thán, không phải câu hỏi.',
      'Đúng — "Ôi, đẹp quá" là câu cảm thán nên dùng dấu chấm than.',
      'Sai — câu cảm thán dùng dấu chấm than, không phải dấu chấm.',
      'Sai — dấu phẩy không dùng để kết thúc câu cảm thán.',
    ]),
    Q('Từ "ba" (miền Nam) đồng nghĩa với?', ['ông (bố của bố)', 'chú (em trai của bố)', 'bố (miền Bắc)', 'mẹ (người sinh ra mình)'], 2, '"Ba" (Nam) = "bố" (Bắc).', [
      'Sai — "ba" không có nghĩa là ông.',
      'Sai — "ba" không có nghĩa là chú.',
      'Đúng — "ba" (miền Nam) cùng nghĩa với "bố" (miền Bắc).',
      'Sai — "ba" chỉ người cha, không phải mẹ.',
    ]),
    Q('Từ "má" (miền Nam) tương đương?', ['dì (em gái của mẹ)', 'cha (tức bố)', 'mẹ', 'cô (em gái của bố)'], 2, '"Má" (Nam) = "mẹ" (Bắc).', [
      'Sai — "má" không có nghĩa là dì.',
      'Sai — "má" chỉ người mẹ, không phải cha.',
      'Đúng — "má" (miền Nam) cùng nghĩa với "mẹ".',
      'Sai — "má" không có nghĩa là cô.',
    ]),
  ]),

  M(16, 'Tập đọc: "Người liên lạc nhỏ"', [
    Q('"Người liên lạc nhỏ" kể về?', ['Kim Đồng — đội viên dũng cảm', 'Một bác sĩ', 'Một học sinh', 'Một cô giáo'], 0, 'Anh Kim Đồng làm liên lạc cho cách mạng.', [
      'Đúng — bài kể về anh Kim Đồng, đội viên liên lạc dũng cảm.',
      'Sai — bài không kể về một bác sĩ.',
      'Sai — Kim Đồng là liên lạc viên, không phải học sinh trong bài.',
      'Sai — bài không kể về một cô giáo.',
    ]),
    Q('Đức tính nổi bật của Kim Đồng?', ['Lười biếng', 'Nhanh nhẹn, gan dạ, mưu trí', 'Tham lam', 'Sợ hãi'], 1, 'Kim Đồng dũng cảm, nhanh trí khi bị địch nghi.', [
      'Sai — Kim Đồng nhanh nhẹn, không lười biếng.',
      'Đúng — Kim Đồng nhanh nhẹn, gan dạ và mưu trí.',
      'Sai — Kim Đồng không tham lam.',
      'Sai — Kim Đồng gan dạ, không sợ hãi.',
    ]),
    Q('Bài học từ tấm gương Kim Đồng?', ['Chỉ ham chơi', 'Không cần học', 'Yêu nước, dũng cảm từ khi còn nhỏ', 'Bỏ học sớm'], 2, 'Anh hùng nhỏ tuổi — tấm gương yêu nước.', [
      'Sai — Kim Đồng chăm làm việc nước, không ham chơi.',
      'Sai — bài không khuyên bỏ học.',
      'Đúng — yêu nước và dũng cảm ngay từ khi còn nhỏ.',
      'Sai — bài không khuyên bỏ học sớm.',
    ]),
    Q('"Liên lạc" trong bài có nghĩa?', ['Người nấu cơm', 'Người đưa tin', 'Diễn viên', 'Học sinh'], 1, 'Liên lạc viên = người đưa tin tức.', [
      'Sai — liên lạc không phải người nấu cơm.',
      'Đúng — liên lạc viên là người đưa tin tức.',
      'Sai — liên lạc không phải diễn viên.',
      'Sai — ở đây "liên lạc" chỉ công việc đưa tin, không phải học sinh.',
    ]),
    Q('Kim Đồng là người dân tộc?', ['Nùng', 'Tày', 'Kinh', 'H\'Mông'], 0, 'Kim Đồng người dân tộc Nùng, quê Cao Bằng.', [
      'Đúng — Kim Đồng là người dân tộc Nùng, quê Cao Bằng.',
      'Sai — Kim Đồng là người Nùng, không phải Tày.',
      'Sai — Kim Đồng là người Nùng, không phải Kinh.',
      'Sai — Kim Đồng là người Nùng, không phải H\'Mông.',
    ]),
    Q('Em học được gì từ Kim Đồng?', ['Tính ích kỷ', 'Sự nhút nhát', 'Lòng yêu nước, dũng cảm', 'Sự lười nhác'], 2, 'Lòng yêu nước và sự dũng cảm.', [
      'Sai — Kim Đồng vì nước vì dân, không ích kỉ.',
      'Sai — Kim Đồng gan dạ, không nhút nhát.',
      'Đúng — ta học được lòng yêu nước và sự dũng cảm.',
      'Sai — Kim Đồng chăm chỉ, không lười nhác.',
    ]),
  ]),

  M(17, 'Viết đoạn văn 3 – 5 câu kể về gia đình', [
    Q('Một đoạn văn kể về gia đình thường gồm?', ['1 câu duy nhất', '20 câu', 'Chỉ có dấu chấm', '3–5 câu giới thiệu các thành viên và tình cảm'], 3, '3–5 câu là dung lượng phù hợp lớp 3.', [
      'Sai — một câu thì quá ngắn để kể về gia đình.',
      'Sai — 20 câu quá dài so với yêu cầu đoạn văn lớp 3.',
      'Sai — đoạn văn cần có nội dung, không chỉ có dấu chấm.',
      'Đúng — 3–5 câu giới thiệu thành viên và tình cảm là vừa đủ.',
    ]),
    Q('Câu mở đoạn nên?', ['Để trống', 'Kể về thú cưng', 'Giới thiệu chung về gia đình', 'Kể về món ăn'], 2, 'Câu mở đoạn giới thiệu chung.', [
      'Sai — không nên để trống câu mở đoạn.',
      'Sai — đoạn văn về gia đình không nên mở bằng thú cưng.',
      'Đúng — câu mở đoạn nên giới thiệu chung về gia đình.',
      'Sai — đoạn văn về gia đình không nên mở bằng món ăn.',
    ]),
    Q('Câu nào thích hợp mở đoạn?', ['Gia đình em có bốn người: bố, mẹ, anh và em.', 'Trời mưa to.', 'Em ăn cơm.', 'Đi học vui lắm.'], 0, 'Câu giới thiệu thành viên — đúng mở đoạn.', [
      'Đúng — câu giới thiệu các thành viên gia đình, hợp mở đoạn.',
      'Sai — "Trời mưa to" không liên quan đến gia đình.',
      'Sai — "Em ăn cơm" không giới thiệu chung về gia đình.',
      'Sai — "Đi học vui lắm" không liên quan chủ đề gia đình.',
    ]),
    Q('Câu kết đoạn nên?', ['Bày tỏ tình cảm với gia đình', 'Hỏi bạn ăn gì', 'Bỏ trống', 'Kể chuyện cười'], 0, 'Câu kết thể hiện tình cảm.', [
      'Đúng — câu kết nên bày tỏ tình cảm với gia đình.',
      'Sai — hỏi bạn ăn gì không liên quan đến gia đình.',
      'Sai — không nên bỏ trống câu kết.',
      'Sai — kể chuyện cười không phù hợp câu kết về gia đình.',
    ]),
    Q('Trong đoạn văn, các câu cần?', ['Đầu câu viết hoa, cuối câu có dấu', 'Viết thường tất cả', 'Không cần dấu', 'Viết tắt'], 0, 'Quy tắc chính tả cơ bản.', [
      'Đúng — đầu câu viết hoa, cuối câu có dấu chấm.',
      'Sai — đầu câu phải viết hoa, không viết thường hết.',
      'Sai — câu phải có dấu kết thúc.',
      'Sai — không nên viết tắt trong đoạn văn.',
    ]),
    Q('Câu nào KHÔNG nên dùng trong đoạn về gia đình?', ['Trận đấu hôm qua rất hay.', 'Mẹ em nấu ăn ngon.', 'Em rất yêu gia đình mình.', 'Bố em làm bác sĩ.'], 0, 'Trận đấu không liên quan chủ đề gia đình.', [
      'Đúng — "Trận đấu hôm qua" lạc đề so với chủ đề gia đình.',
      'Sai — "Mẹ em nấu ăn ngon" đúng chủ đề gia đình.',
      'Sai — "Em rất yêu gia đình" đúng chủ đề gia đình.',
      'Sai — "Bố em làm bác sĩ" đúng chủ đề gia đình.',
    ]),
  ]),

  M(18, 'Ôn tập cuối học kì 1', [
    Q('Câu "Ngôi trường của em rất đẹp." thuộc kiểu?', ['Ai là gì?', 'Ai làm gì?', 'Ai thế nào?', 'Cầu khiến'], 2, 'Tả đặc điểm → "Ai thế nào?".', [
      'Sai — câu không có từ "là" nên không phải "Ai là gì?".',
      'Sai — câu không có hoạt động nên không phải "Ai làm gì?".',
      'Đúng — câu tả đặc điểm "rất đẹp" nên thuộc "Ai thế nào?".',
      'Sai — đây là câu kể, không phải câu cầu khiến.',
    ]),
    Q('Từ nào chỉ HOẠT ĐỘNG?', ['xinh', 'đỏ (đặc điểm)', 'sách (sự vật)', 'vẽ'], 3, '"Vẽ" là hoạt động.', [
      'Sai — "xinh" tả vẻ đẹp nên là đặc điểm.',
      'Sai — "đỏ" tả màu sắc nên là đặc điểm.',
      'Sai — "sách" là sự vật, không phải hoạt động.',
      'Đúng — "vẽ" là việc làm nên là từ chỉ hoạt động.',
    ]),
    Q('Tìm từ chỉ ĐẶC ĐIỂM trong "Bầu trời cao và xanh ngắt."', ['cao, xanh ngắt', 'và (từ nối)', 'bầu trời (sự vật)', 'bầu trời'], 0, '"Cao", "xanh ngắt" là đặc điểm.', [
      'Đúng — "cao" và "xanh ngắt" đều là từ chỉ đặc điểm.',
      'Sai — "và" là từ nối, không phải đặc điểm.',
      'Sai — "bầu trời" là sự vật, không phải đặc điểm.',
      'Sai — "bầu trời" là sự vật, không phải đặc điểm.',
    ]),
    Q('Câu nào có phép so sánh?', ['Em học bài.', 'Mặt trăng tròn như chiếc đĩa.', 'Trời mưa to.', 'Mẹ đi chợ.'], 1, 'Có "như" → so sánh.', [
      'Sai — "Em học bài" chỉ kể việc, không so sánh.',
      'Đúng — có từ "như" so sánh mặt trăng với chiếc đĩa.',
      'Sai — "Trời mưa to" không có từ so sánh.',
      'Sai — "Mẹ đi chợ" chỉ kể việc, không so sánh.',
    ]),
    Q('Dấu phẩy trong "Buổi sáng, em đi học." dùng để?', ['Tách trạng ngữ', 'Kết thúc câu', 'Báo hiệu câu hỏi', 'Cảm thán'], 0, 'Tách trạng ngữ thời gian.', [
      'Đúng — dấu phẩy tách trạng ngữ thời gian "buổi sáng".',
      'Sai — dấu kết thúc câu là dấu chấm, không phải dấu phẩy.',
      'Sai — dấu phẩy không báo hiệu câu hỏi.',
      'Sai — dấu phẩy không dùng cho câu cảm thán.',
    ]),
    Q('Chính tả: chọn đúng', ['xum suê', 'sum xuê', 'sum suê', 'xum xuê'], 2, '"Sum suê" là cách viết đúng.', [
      'Sai — phải viết "sum" với "s", không phải "xum".',
      'Sai — phải viết "suê" với "s", không phải "xuê".',
      'Đúng — "sum suê" là cách viết đúng chính tả.',
      'Sai — cả hai tiếng đều viết sai phụ âm đầu.',
    ]),
  ]),

  // ──────────────── HK2 ────────────────
  M(19, 'Tập đọc: "Hai Bà Trưng"', [
    Q('Hai Bà Trưng là ai?', ['Hai cô giáo', 'Hai bạn học', 'Hai mẹ con', 'Hai nữ anh hùng dân tộc thời Bắc thuộc'], 3, 'Trưng Trắc và Trưng Nhị — anh hùng dân tộc.', [
      'Sai — Hai Bà Trưng là anh hùng dân tộc, không phải cô giáo.',
      'Sai — Hai Bà là hai chị em anh hùng, không phải hai bạn học.',
      'Sai — Hai Bà là hai chị em, không phải hai mẹ con.',
      'Đúng — Trưng Trắc và Trưng Nhị là hai nữ anh hùng dân tộc.',
    ]),
    Q('Hai Bà Trưng nổi tiếng vì?', ['Khởi nghĩa chống quân Đông Hán', 'Đi du học', 'Làm thơ', 'Buôn bán giỏi'], 0, 'Khởi nghĩa năm 40 chống ách đô hộ phương Bắc.', [
      'Đúng — Hai Bà khởi nghĩa chống quân Đông Hán năm 40.',
      'Sai — Hai Bà nổi tiếng vì khởi nghĩa, không phải đi du học.',
      'Sai — Hai Bà nổi tiếng vì đánh giặc, không phải làm thơ.',
      'Sai — Hai Bà nổi tiếng vì khởi nghĩa, không phải buôn bán.',
    ]),
    Q('Tinh thần nổi bật của Hai Bà?', ['Sợ hãi', 'Lười biếng', 'Tham lam', 'Yêu nước, dũng cảm'], 3, 'Tấm gương yêu nước, dũng cảm vì dân.', [
      'Sai — Hai Bà dũng cảm, không sợ hãi.',
      'Sai — Hai Bà xông pha đánh giặc, không lười biếng.',
      'Sai — Hai Bà vì dân vì nước, không tham lam.',
      'Đúng — Hai Bà yêu nước, dũng cảm vì dân.',
    ]),
    Q('Bài học từ Hai Bà Trưng?', ['Phụ nữ Việt Nam anh hùng', 'Không nên đấu tranh', 'Phụ nữ yếu đuối', 'Sống cam chịu'], 0, 'Truyền thống phụ nữ Việt Nam: anh hùng, kiên cường.', [
      'Đúng — phụ nữ Việt Nam anh hùng, kiên cường.',
      'Sai — Hai Bà dạy ta dám đấu tranh vì nghĩa lớn.',
      'Sai — Hai Bà chứng minh phụ nữ rất mạnh mẽ, không yếu đuối.',
      'Sai — Hai Bà không cam chịu mà đứng lên đánh giặc.',
    ]),
    Q('Hai Bà Trưng quê ở?', ['Phong Châu (Phú Thọ)', 'Sài Gòn', 'Mê Linh (Hà Nội ngày nay)', 'Đà Nẵng'], 2, 'Quê hai Bà ở Mê Linh, nay thuộc Hà Nội.', [
      'Sai — quê Hai Bà ở Mê Linh, không phải Phong Châu.',
      'Sai — Hai Bà không quê ở Sài Gòn.',
      'Đúng — quê Hai Bà ở Mê Linh, nay thuộc Hà Nội.',
      'Sai — Hai Bà không quê ở Đà Nẵng.',
    ]),
    Q('Em học được gì từ Hai Bà?', ['Tinh thần yêu nước, không khuất phục', 'Sự bỏ cuộc', 'Lười biếng', 'Sự ích kỷ'], 0, 'Yêu nước và kiên cường.', [
      'Đúng — ta học tinh thần yêu nước, không khuất phục.',
      'Sai — Hai Bà không bỏ cuộc mà kiên cường chiến đấu.',
      'Sai — Hai Bà chăm lo việc nước, không lười biếng.',
      'Sai — Hai Bà vì dân vì nước, không ích kỉ.',
    ]),
  ]),

  M(20, 'Mở rộng vốn từ: Tổ quốc · Dấu phẩy', [
    Q('"Tổ quốc" có nghĩa?', ['Một lớp học', 'Một ngôi nhà', 'Một con đường', 'Đất nước, quê hương chung'], 3, 'Tổ quốc = đất nước, quê hương.', [
      'Sai — "tổ quốc" rộng lớn hơn một lớp học.',
      'Sai — "tổ quốc" rộng lớn hơn một ngôi nhà.',
      'Sai — "tổ quốc" không phải một con đường.',
      'Đúng — "tổ quốc" là đất nước, quê hương chung.',
    ]),
    Q('Từ nào ĐỒNG NGHĨA với "Tổ quốc"?', ['Trường học', 'Bài tập', 'Lớp học', 'Đất nước, non sông'], 3, 'Tổ quốc ≈ đất nước, non sông, giang sơn.', [
      'Sai — "trường học" không cùng nghĩa với "tổ quốc".',
      'Sai — "bài tập" không cùng nghĩa với "tổ quốc".',
      'Sai — "lớp học" không cùng nghĩa với "tổ quốc".',
      'Đúng — "đất nước, non sông" cùng nghĩa với "tổ quốc".',
    ]),
    Q('Đặt dấu phẩy đúng: "Nước Việt Nam có núi sông biển đảo rừng vàng."', ['Nước Việt Nam có núi, sông, biển đảo, rừng vàng.', 'Nước, Việt Nam có núi sông biển đảo, rừng vàng.', 'Nước Việt Nam, có núi sông biển đảo rừng vàng.', 'Nước Việt, Nam có núi sông biển đảo rừng vàng.'], 0, 'Dấu phẩy ngăn cách các từ liệt kê.', [
      'Đúng — dấu phẩy ngăn cách núi, sông, biển đảo, rừng vàng.',
      'Sai — tách "Nước, Việt Nam" là sai chỗ.',
      'Sai — đặt một dấu phẩy chưa ngăn cách hết các từ liệt kê.',
      'Sai — tách "Việt, Nam" làm sai tên nước.',
    ]),
    Q('"Yêu Tổ quốc" thể hiện qua?', ['Vứt rác', 'Trốn học', 'Học giỏi, làm việc tốt, bảo vệ môi trường', 'Lười biếng'], 2, 'Hành động cụ thể thể hiện lòng yêu Tổ quốc.', [
      'Sai — vứt rác làm hại đất nước, không phải yêu Tổ quốc.',
      'Sai — trốn học không phải yêu Tổ quốc.',
      'Đúng — học giỏi, làm việc tốt, bảo vệ môi trường là yêu Tổ quốc.',
      'Sai — lười biếng không phải yêu Tổ quốc.',
    ]),
    Q('Quốc kì Việt Nam có?', ['Nền xanh, sao trắng', 'Nền trắng, sao xanh', 'Nền vàng, sao đỏ', 'Nền đỏ, sao vàng năm cánh'], 3, 'Cờ đỏ sao vàng — quốc kì Việt Nam.', [
      'Sai — quốc kì nền đỏ, không phải nền xanh.',
      'Sai — quốc kì nền đỏ sao vàng, không phải nền trắng.',
      'Sai — nền là đỏ và sao là vàng, không ngược lại.',
      'Đúng — quốc kì Việt Nam nền đỏ, sao vàng năm cánh.',
    ]),
    Q('Quốc ca Việt Nam tên là?', ['Tiếng hát con tàu', 'Lên đàng', 'Người Hà Nội', 'Tiến quân ca'], 3, '"Tiến quân ca" — Văn Cao sáng tác.', [
      'Sai — "Tiếng hát con tàu" không phải quốc ca.',
      'Sai — "Lên đàng" không phải quốc ca.',
      'Sai — "Người Hà Nội" không phải quốc ca.',
      'Đúng — quốc ca Việt Nam là "Tiến quân ca" của Văn Cao.',
    ]),
  ]),

  M(21, 'Tập đọc: "Ông tổ nghề thêu"', [
    Q('"Ông tổ nghề thêu" kể về ai?', ['Một nông dân', 'Một học sinh', 'Trần Quốc Khái — học nghề thêu khi đi sứ', 'Một bác sĩ'], 2, 'Trần Quốc Khái học nghề thêu mang về truyền cho dân.', [
      'Sai — bài kể về Trần Quốc Khái, không phải một nông dân.',
      'Sai — bài kể về Trần Quốc Khái, không phải một học sinh.',
      'Đúng — Trần Quốc Khái học nghề thêu khi đi sứ rồi truyền cho dân.',
      'Sai — bài kể về Trần Quốc Khái, không phải một bác sĩ.',
    ]),
    Q('Đức tính nổi bật của ông?', ['Sợ hãi', 'Ham học, thông minh', 'Lười biếng', 'Hay khóc'], 1, 'Ham học hỏi, kiên trì, thông minh.', [
      'Sai — ông gan dạ, không sợ hãi.',
      'Đúng — ông ham học hỏi, kiên trì và thông minh.',
      'Sai — ông chăm học hỏi, không lười biếng.',
      'Sai — bài không nói ông hay khóc.',
    ]),
    Q('Bài học từ câu chuyện?', ['Học một mình', 'Học hỏi sẽ mang lại lợi ích cho cộng đồng', 'Không cần học', 'Học rồi giấu'], 1, 'Học để truyền lại tri thức cho cộng đồng.', [
      'Sai — ông học rồi truyền cho dân, không giữ một mình.',
      'Đúng — học hỏi rồi sẻ chia sẽ mang lợi ích cho cộng đồng.',
      'Sai — bài đề cao việc ham học hỏi.',
      'Sai — ông truyền lại nghề, không giấu giếm.',
    ]),
    Q('"Đi sứ" có nghĩa?', ['Đi học', 'Đi chơi', 'Đi buôn', 'Đại diện vua đi gặp nước khác'], 3, 'Đi sứ = sứ thần đại diện quốc gia.', [
      'Sai — "đi sứ" không có nghĩa là đi học.',
      'Sai — "đi sứ" không phải đi chơi.',
      'Sai — "đi sứ" không phải đi buôn bán.',
      'Đúng — "đi sứ" là thay vua đi gặp, làm việc với nước khác.',
    ]),
    Q('Em học được điều gì từ ông?', ['Sự ích kỷ', 'Tính giấu giếm', 'Sự lười nhác', 'Ham học, sẻ chia tri thức'], 3, 'Ham học và sẻ chia.', [
      'Sai — ông truyền nghề cho dân, không ích kỉ.',
      'Sai — ông sẻ chia nghề, không giấu giếm.',
      'Sai — ông ham học hỏi, không lười nhác.',
      'Đúng — ta học sự ham học và biết sẻ chia tri thức.',
    ]),
    Q('Nghề thêu cần đức tính?', ['Kiên nhẫn, khéo tay', 'Cẩu thả', 'Bừa bộn', 'Vội vàng'], 0, 'Thêu cần sự kiên nhẫn, tỉ mỉ.', [
      'Đúng — nghề thêu cần sự kiên nhẫn và khéo tay.',
      'Sai — thêu cần tỉ mỉ, cẩu thả sẽ hỏng.',
      'Sai — thêu cần gọn gàng, không bừa bộn.',
      'Sai — thêu cần từ tốn, không vội vàng.',
    ]),
  ]),

  M(22, 'Câu "Ai làm gì?" – "Ai thế nào?" – "Ai là gì?"', [
    Q('"Bố em là kỹ sư." thuộc kiểu?', ['Ai là gì?', 'Ai làm gì?', 'Ai thế nào?', 'Cảm thán'], 0, 'Có "là" + danh từ → "Ai là gì?".', [
      'Đúng — có từ "là" + "kỹ sư" nên thuộc kiểu "Ai là gì?".',
      'Sai — câu không có hoạt động nên không phải "Ai làm gì?".',
      'Sai — câu không tả đặc điểm nên không phải "Ai thế nào?".',
      'Sai — câu kết bằng dấu chấm nên không phải câu cảm thán.',
    ]),
    Q('"Mẹ đang nấu cơm." thuộc kiểu?', ['Ai thế nào?', 'Ai là gì?', 'Ai làm gì?', 'Cầu khiến'], 2, '"Nấu cơm" là hoạt động → "Ai làm gì?".', [
      'Sai — câu không tả đặc điểm nên không phải "Ai thế nào?".',
      'Sai — câu không có từ "là" nên không phải "Ai là gì?".',
      'Đúng — "nấu cơm" là hoạt động nên thuộc "Ai làm gì?".',
      'Sai — đây là câu kể, không phải câu cầu khiến.',
    ]),
    Q('"Cây bàng cao lớn." thuộc kiểu?', ['Ai thế nào?', 'Ai là gì?', 'Ai làm gì?', 'Cảm thán'], 0, 'Tả đặc điểm → "Ai thế nào?".', [
      'Đúng — câu tả đặc điểm "cao lớn" nên thuộc "Ai thế nào?".',
      'Sai — câu không có từ "là" nên không phải "Ai là gì?".',
      'Sai — câu không có hoạt động nên không phải "Ai làm gì?".',
      'Sai — câu kết bằng dấu chấm nên không phải câu cảm thán.',
    ]),
    Q('Câu nào thuộc kiểu "Ai làm gì?"', ['Hoa hồng rất thơm.', 'Trời xanh.', 'Lan quét nhà.', 'Em là học sinh.'], 2, '"Quét nhà" là hoạt động → "Ai làm gì?".', [
      'Sai — "rất thơm" là đặc điểm nên thuộc "Ai thế nào?".',
      'Sai — "xanh" là đặc điểm nên thuộc "Ai thế nào?".',
      'Đúng — "quét nhà" là hoạt động nên thuộc "Ai làm gì?".',
      'Sai — có từ "là" nên thuộc kiểu "Ai là gì?".',
    ]),
    Q('Câu nào thuộc kiểu "Ai thế nào?"', ['Em đang học.', 'Lan rất hiền.', 'Bố em làm thợ.', 'Cô là giáo viên.'], 1, '"Hiền" là đặc điểm tính cách.', [
      'Sai — "đang học" là hoạt động nên thuộc "Ai làm gì?".',
      'Đúng — "rất hiền" là đặc điểm nên thuộc "Ai thế nào?".',
      'Sai — "làm thợ" là hoạt động nên thuộc "Ai làm gì?".',
      'Sai — có từ "là" nên thuộc kiểu "Ai là gì?".',
    ]),
    Q('Đặt câu "Ai là gì?" với "Hà Nội":', ['Hà Nội mưa.', 'Hà Nội là thủ đô nước ta.', 'Hà Nội đẹp lắm.', 'Hà Nội đâu?'], 1, 'Có "là" + danh từ → đúng kiểu.', [
      'Sai — "mưa" không có từ "là" nên không phải "Ai là gì?".',
      'Đúng — có từ "là" + "thủ đô" nên đúng kiểu "Ai là gì?".',
      'Sai — "đẹp lắm" là đặc điểm nên thuộc "Ai thế nào?".',
      'Sai — đây là câu hỏi, không phải kiểu "Ai là gì?".',
    ]),
  ]),

  M(23, 'Tập đọc: "Cái cầu"', [
    Q('Bài thơ "Cái cầu" của ai?', ['Phạm Tiến Duật', 'Trần Đăng Khoa', 'Định Hải', 'Xuân Quỳnh'], 0, 'Bài thơ của Phạm Tiến Duật.', [
      'Đúng — bài thơ "Cái cầu" là của Phạm Tiến Duật.',
      'Sai — Trần Đăng Khoa không phải tác giả bài này.',
      'Sai — Định Hải không phải tác giả bài này.',
      'Sai — Xuân Quỳnh không phải tác giả bài này.',
    ]),
    Q('Bài thơ tả ai làm gì?', ['Em đi học', 'Bạn chơi đùa', 'Mẹ nấu cơm', 'Bố đi làm xa, xây cầu'], 3, 'Bố làm cầu xa nhà, em nhớ bố.', [
      'Sai — bài thơ tả bố xây cầu, không phải em đi học.',
      'Sai — bài thơ tả bố xây cầu, không phải bạn chơi đùa.',
      'Sai — bài thơ tả bố xây cầu, không phải mẹ nấu cơm.',
      'Đúng — bài tả bố đi làm xa để xây cầu, em nhớ bố.',
    ]),
    Q('Tình cảm trong bài thơ?', ['Buồn bực', 'Tức giận', 'Yêu thương, tự hào về bố', 'Sợ hãi'], 2, 'Yêu bố, tự hào nghề của bố.', [
      'Sai — bài thơ thể hiện yêu thương, không buồn bực.',
      'Sai — bài thơ không thể hiện sự tức giận.',
      'Đúng — bài thể hiện tình yêu thương và tự hào về bố.',
      'Sai — bài thơ thể hiện yêu thương, không sợ hãi.',
    ]),
    Q('Bài học từ bài thơ?', ['Không cần làm việc', 'Bỏ qua tình cảm', 'Yêu thương người thân, trân trọng lao động', 'Coi thường nghề'], 2, 'Trân trọng lao động và tình thân.', [
      'Sai — bài thơ trân trọng lao động, không khuyên lười.',
      'Sai — bài thơ đề cao tình cảm gia đình.',
      'Đúng — ta yêu thương người thân và trân trọng lao động.',
      'Sai — bài thơ tôn trọng mọi nghề lao động.',
    ]),
    Q('"Cầu" trong bài là?', ['Cầu thủ', 'Cầu hôn', 'Cái cầu lông', 'Cây cầu bắc qua sông'], 3, 'Cây cầu bắc qua sông để đi lại.', [
      'Sai — "cầu thủ" là người đá bóng, không đúng nghĩa.',
      'Sai — "cầu hôn" không đúng nghĩa trong bài.',
      'Sai — "cầu lông" là môn thể thao, không đúng nghĩa.',
      'Đúng — "cầu" trong bài là cây cầu bắc qua sông.',
    ]),
    Q('Em sẽ làm gì khi bố/mẹ đi làm xa?', ['Khóc cả ngày', 'Không học', 'Nghịch ngợm', 'Vâng lời mẹ, học giỏi để bố/mẹ vui'], 3, 'Học giỏi, ngoan là niềm vui của bố mẹ.', [
      'Sai — khóc cả ngày làm bố mẹ thêm lo lắng.',
      'Sai — không học khiến bố mẹ buồn lòng.',
      'Sai — nghịch ngợm làm bố mẹ ở xa thêm lo.',
      'Đúng — vâng lời, học giỏi là cách làm bố mẹ vui.',
    ]),
  ]),

  M(24, 'Mở rộng vốn từ: Nghệ thuật · Sáng tạo · Trí thức', [
    Q('Từ chỉ NGƯỜI HOẠT ĐỘNG NGHỆ THUẬT?', ['thợ điện', 'ca sĩ, hoạ sĩ, nhạc sĩ', 'lái xe', 'bác sĩ'], 1, 'Nghệ sĩ: ca sĩ, hoạ sĩ, nhạc sĩ...', [
      'Sai — thợ điện làm về điện, không phải nghệ thuật.',
      'Đúng — ca sĩ, hoạ sĩ, nhạc sĩ là người làm nghệ thuật.',
      'Sai — lái xe là nghề lái xe, không phải nghệ thuật.',
      'Sai — bác sĩ làm về y học, không phải nghệ thuật.',
    ]),
    Q('Từ chỉ HOẠT ĐỘNG NGHỆ THUẬT?', ['may vá', 'hát, vẽ, đàn', 'cấy lúa', 'sửa xe'], 1, 'Các hoạt động nghệ thuật: ca, múa, hội hoạ...', [
      'Sai — may vá là nghề thủ công, không phải nghệ thuật.',
      'Đúng — hát, vẽ, đàn là các hoạt động nghệ thuật.',
      'Sai — cấy lúa là việc đồng áng, không phải nghệ thuật.',
      'Sai — sửa xe là việc kĩ thuật, không phải nghệ thuật.',
    ]),
    Q('"Trí thức" là người?', ['Có học vấn, am hiểu nhiều', 'Không biết chữ', 'Chỉ làm thợ thủ công', 'Lười học'], 0, 'Trí thức = người có học vấn cao.', [
      'Đúng — trí thức là người có học vấn cao, hiểu biết nhiều.',
      'Sai — trí thức là người biết chữ và có học.',
      'Sai — trí thức làm việc bằng trí tuệ, không chỉ là thợ thủ công.',
      'Sai — trí thức là người ham học, không lười học.',
    ]),
    Q('Nhà bác học nổi tiếng Việt Nam?', ['Lê Lợi', 'Lê Quý Đôn', 'Hai Bà Trưng', 'Trần Quốc Tuấn'], 1, 'Lê Quý Đôn — nhà bác học thời Lê.', [
      'Sai — Lê Lợi là vị vua đánh giặc, không phải nhà bác học.',
      'Đúng — Lê Quý Đôn là nhà bác học nổi tiếng thời Lê.',
      'Sai — Hai Bà Trưng là anh hùng dân tộc, không phải nhà bác học.',
      'Sai — Trần Quốc Tuấn là danh tướng, không phải nhà bác học.',
    ]),
    Q('Người vẽ tranh gọi là?', ['Hoạ sĩ', 'Nghệ sĩ (nói chung)', 'Nhạc sĩ', 'Diễn viên'], 0, 'Hoạ sĩ = người vẽ tranh.', [
      'Đúng — người vẽ tranh gọi là hoạ sĩ.',
      'Sai — "nghệ sĩ" là tên gọi chung, chưa chỉ rõ người vẽ tranh.',
      'Sai — nhạc sĩ là người sáng tác nhạc, không vẽ tranh.',
      'Sai — diễn viên là người đóng phim, kịch, không vẽ tranh.',
    ]),
    Q('Người sáng tác nhạc gọi là?', ['Nhạc sĩ', 'Hoạ sĩ', 'Nhà văn', 'Nhà thơ'], 0, 'Nhạc sĩ = người sáng tác âm nhạc.', [
      'Đúng — người sáng tác nhạc gọi là nhạc sĩ.',
      'Sai — hoạ sĩ là người vẽ tranh, không sáng tác nhạc.',
      'Sai — nhà văn viết truyện, văn, không sáng tác nhạc.',
      'Sai — nhà thơ làm thơ, không sáng tác nhạc.',
    ]),
  ]),

  M(25, 'Tập đọc: "Hội vật"', [
    Q('"Hội vật" tả cảnh?', ['Trận bóng đá', 'Đấu vật trong lễ hội cổ truyền', 'Cuộc thi vẽ', 'Cuộc thi học sinh'], 1, 'Đấu vật là môn thể thao trong lễ hội.', [
      'Sai — bài tả đấu vật, không phải trận bóng đá.',
      'Đúng — bài tả cảnh đấu vật trong lễ hội cổ truyền.',
      'Sai — bài tả đấu vật, không phải cuộc thi vẽ.',
      'Sai — bài tả đấu vật, không phải cuộc thi học sinh.',
    ]),
    Q('Hai đô vật trong bài tên gì?', ['Tý và Tèo', 'Quắm Đen và Cản Ngũ', 'An và Bình', 'Lan và Mai'], 1, 'Hai đô vật nổi tiếng: Quắm Đen và Cản Ngũ.', [
      'Sai — không phải Tý và Tèo.',
      'Đúng — hai đô vật là Quắm Đen và Cản Ngũ.',
      'Sai — không phải An và Bình.',
      'Sai — không phải Lan và Mai.',
    ]),
    Q('Ai là người chiến thắng?', ['Không ai', 'Cản Ngũ — bằng kinh nghiệm và sức bền', 'Cả hai đô vật cùng thua', 'Quắm Đen'], 1, 'Cản Ngũ thắng nhờ sự điềm tĩnh và kinh nghiệm.', [
      'Sai — có người thắng là ông Cản Ngũ.',
      'Đúng — Cản Ngũ thắng nhờ kinh nghiệm và sức bền.',
      'Sai — không phải cả hai cùng thua, Cản Ngũ đã thắng.',
      'Sai — Quắm Đen là người thua, không phải thắng.',
    ]),
    Q('Bài học từ "Hội vật"?', ['Đánh nhanh thắng nhanh', 'Kinh nghiệm + bình tĩnh thắng sức trẻ', 'Đừng tham gia', 'Sức mạnh là tất cả'], 1, 'Kinh nghiệm và sự điềm tĩnh quan trọng.', [
      'Sai — Cản Ngũ thắng nhờ điềm tĩnh, không phải đánh nhanh.',
      'Đúng — kinh nghiệm và sự bình tĩnh thắng được sức trẻ.',
      'Sai — bài không khuyên tránh tham gia.',
      'Sai — bài cho thấy kinh nghiệm quan trọng hơn sức mạnh.',
    ]),
    Q('"Lễ hội" thường diễn ra vào?', ['Đêm khuya', 'Ngày thường', 'Dịp Tết, ngày lễ', 'Khi học bài'], 2, 'Lễ hội thường vào mùa xuân, dịp Tết.', [
      'Sai — lễ hội thường vào ban ngày dịp Tết, không phải đêm khuya.',
      'Sai — lễ hội thường vào dịp lễ, không phải ngày thường.',
      'Đúng — lễ hội thường diễn ra vào dịp Tết, ngày lễ.',
      'Sai — "khi học bài" không phải dịp diễn ra lễ hội.',
    ]),
    Q('Hội vật là môn thể thao?', ['Không tồn tại', 'Mới phát minh', 'Của nước ngoài', 'Truyền thống dân tộc Việt Nam'], 3, 'Vật là môn truyền thống Việt Nam.', [
      'Sai — hội vật có thật trong các lễ hội Việt Nam.',
      'Sai — vật là môn có từ lâu đời, không phải mới phát minh.',
      'Sai — vật là môn của Việt Nam, không phải nước ngoài.',
      'Đúng — vật là môn thể thao truyền thống của dân tộc Việt Nam.',
    ]),
  ]),

  M(26, 'Mở rộng vốn từ: Lễ hội · Đặt và trả lời câu hỏi "Vì sao?"', [
    Q('Lễ hội nổi tiếng dịp Tết miền Bắc?', ['Hội đua thuyền', 'Hội pháo', 'Hội Lim, hội Gióng, hội chùa Hương', 'Hội té nước'], 2, 'Hội Lim (Bắc Ninh), hội Gióng (Hà Nội), hội chùa Hương (Hà Nội).', [
      'Sai — đua thuyền không phải lễ hội đặc trưng dịp Tết miền Bắc.',
      'Sai — "hội pháo" không phải nhóm lễ hội nói tới ở đây.',
      'Đúng — hội Lim, hội Gióng, hội chùa Hương nổi tiếng dịp Tết miền Bắc.',
      'Sai — hội té nước là lễ hội của một số nước khác.',
    ]),
    Q('Câu hỏi "Vì sao?" dùng để hỏi?', ['Thời gian', 'Nguyên nhân, lí do', 'Địa điểm', 'Số lượng'], 1, '"Vì sao?" hỏi về nguyên nhân.', [
      'Sai — hỏi thời gian dùng "khi nào?".',
      'Đúng — "vì sao?" dùng để hỏi nguyên nhân, lí do.',
      'Sai — hỏi địa điểm dùng "ở đâu?".',
      'Sai — hỏi số lượng dùng "bao nhiêu?".',
    ]),
    Q('Trả lời cho "Vì sao em đi học sớm?":', ['Em đi với bạn.', 'Em đi xe đạp.', 'Vì em sợ trễ giờ.', 'Trường gần nhà.'], 2, 'Bắt đầu bằng "Vì..." chỉ lí do.', [
      'Sai — "đi với bạn" trả lời "với ai?", không phải lí do.',
      'Sai — "đi xe đạp" trả lời "bằng gì?", không phải lí do.',
      'Đúng — "Vì em sợ trễ giờ" nêu rõ lí do.',
      'Sai — "trường gần nhà" trả lời về vị trí, không phải lí do đi sớm.',
    ]),
    Q('Hội Gióng tưởng nhớ ai?', ['Thánh Gióng — anh hùng đánh giặc Ân', 'Hai Bà Trưng', 'Quang Trung', 'Trần Hưng Đạo'], 0, 'Hội Gióng (Sóc Sơn) tưởng nhớ Thánh Gióng.', [
      'Đúng — hội Gióng tưởng nhớ Thánh Gióng đánh giặc Ân.',
      'Sai — hội Gióng không tưởng nhớ Hai Bà Trưng.',
      'Sai — hội Gióng không tưởng nhớ vua Quang Trung.',
      'Sai — hội Gióng không tưởng nhớ Trần Hưng Đạo.',
    ]),
    Q('Đi lễ hội cần?', ['Vứt rác', 'Chen lấn', 'Ăn mặc lịch sự, giữ trật tự', 'La hét'], 2, 'Văn hoá tham gia lễ hội.', [
      'Sai — vứt rác làm bẩn lễ hội, là việc không nên.',
      'Sai — chen lấn gây mất trật tự, không nên.',
      'Đúng — ăn mặc lịch sự, giữ trật tự là cư xử đẹp.',
      'Sai — la hét gây ồn ào, mất trật tự.',
    ]),
    Q('"Vì sao?" còn có thể thay bằng?', ['Bao nhiêu?', 'Ở đâu?', 'Tại sao?', 'Khi nào?'], 2, '"Tại sao?" đồng nghĩa với "Vì sao?".', [
      'Sai — "bao nhiêu?" hỏi số lượng, khác nghĩa.',
      'Sai — "ở đâu?" hỏi nơi chốn, khác nghĩa.',
      'Đúng — "tại sao?" cùng nghĩa với "vì sao?".',
      'Sai — "khi nào?" hỏi thời gian, khác nghĩa.',
    ]),
  ]),

  M(27, 'Tập đọc: "Rước đèn ông sao"', [
    Q('"Rước đèn ông sao" tả không khí?', ['Tết Nguyên Đán', 'Tết Trung Thu của trẻ em', 'Ngày khai giảng', 'Mùa hè'], 1, 'Rước đèn là hoạt động đặc trưng Trung Thu.', [
      'Sai — bài tả Trung Thu, không phải Tết Nguyên Đán.',
      'Đúng — bài tả không khí Tết Trung Thu của trẻ em.',
      'Sai — bài tả Trung Thu, không phải ngày khai giảng.',
      'Sai — bài tả Trung Thu (mùa thu), không phải mùa hè.',
    ]),
    Q('Đèn ông sao có hình?', ['Hình tròn', 'Ngôi sao 5 cánh', 'Hình tam giác', 'Hình vuông'], 1, 'Đèn ông sao 5 cánh, mỗi cánh giấy bóng kính.', [
      'Sai — đèn ông sao hình ngôi sao, không phải hình tròn.',
      'Đúng — đèn ông sao có hình ngôi sao 5 cánh.',
      'Sai — đèn ông sao có 5 cánh, không phải tam giác.',
      'Sai — đèn ông sao hình ngôi sao, không phải hình vuông.',
    ]),
    Q('Trung Thu vào ngày?', ['Rằm tháng Giêng', 'Rằm tháng Tám âm lịch', 'Cuối tháng 12', 'Mùng 1 tháng 1'], 1, '15/8 âm lịch là Tết Trung Thu.', [
      'Sai — rằm tháng Giêng là Tết Nguyên tiêu, không phải Trung Thu.',
      'Đúng — Trung Thu vào rằm (15) tháng Tám âm lịch.',
      'Sai — Trung Thu vào tháng Tám âm lịch, không phải cuối tháng 12.',
      'Sai — mùng 1 tháng 1 là Tết Nguyên Đán, không phải Trung Thu.',
    ]),
    Q('Cảm xúc của các em nhỏ trong bài?', ['Buồn bã', 'Tức giận', 'Sợ hãi', 'Vui tươi, háo hức'], 3, 'Trẻ em rất vui khi rước đèn.', [
      'Sai — các em rất vui, không buồn bã.',
      'Sai — các em vui tươi, không tức giận.',
      'Sai — các em háo hức, không sợ hãi.',
      'Đúng — các em vui tươi, háo hức khi rước đèn.',
    ]),
    Q('Trung Thu thường có?', ['Cây thông', 'Bánh chưng, bánh tét', 'Bánh nướng, bánh dẻo, đèn, múa lân', 'Pháo hoa'], 2, 'Đặc trưng Trung Thu Việt Nam.', [
      'Sai — cây thông là của Giáng sinh, không phải Trung Thu.',
      'Sai — bánh chưng, bánh tét là của Tết Nguyên Đán.',
      'Đúng — Trung Thu có bánh nướng, bánh dẻo, đèn, múa lân.',
      'Sai — pháo hoa không phải đặc trưng của Trung Thu.',
    ]),
    Q('Câu "Đèn ông sao rực rỡ như những vì sao trên trời." có?', ['Liệt kê', 'Nhân hoá', 'Phép so sánh', 'Đối lập'], 2, 'Có "như" → so sánh.', [
      'Sai — câu không kể nhiều thứ nối tiếp nên không phải liệt kê.',
      'Sai — câu không làm vật giống người nên không phải nhân hoá.',
      'Đúng — có từ "như" so sánh đèn ông sao với vì sao.',
      'Sai — câu không nêu hai điều trái ngược.',
    ]),
  ]),

  M(28, 'Tập đọc: "Cuộc chạy đua trong rừng"', [
    Q('Bài "Cuộc chạy đua trong rừng" có nhân vật chính?', ['Thỏ con — chạy nhanh nhất rừng', 'Hươu sao — đối thủ chính', 'Ngựa con — chủ quan, không chuẩn bị kĩ', 'Voi con — to khoẻ nhất'], 2, 'Ngựa con chuẩn bị qua loa nên thất bại.', [
      'Sai — nhân vật chính là Ngựa con, không phải Thỏ con.',
      'Sai — nhân vật chính là Ngựa con, không phải Hươu sao.',
      'Đúng — Ngựa con chủ quan, chuẩn bị qua loa nên thất bại.',
      'Sai — nhân vật chính là Ngựa con, không phải Voi con.',
    ]),
    Q('Bài học từ truyện?', ['Phải chuẩn bị chu đáo trước khi làm việc lớn', 'Sức mạnh là tất cả', 'Khoe khoang là tốt', 'Không cần luyện tập'], 0, 'Chuẩn bị chu đáo là yếu tố thành công.', [
      'Đúng — phải chuẩn bị chu đáo trước khi làm việc lớn.',
      'Sai — Ngựa con khoẻ nhưng vẫn thua vì chuẩn bị kém.',
      'Sai — khoe khoang dẫn đến chủ quan và thất bại.',
      'Sai — cần luyện tập và chuẩn bị kĩ mới thành công.',
    ]),
    Q('Ngựa cha khuyên ngựa con?', ['Bỏ thi', 'Cứ chạy đi', 'Khoe sức mạnh', 'Phải xem lại móng chân, chuẩn bị kĩ'], 3, 'Người lớn khuyên chuẩn bị kỹ trước cuộc thi.', [
      'Sai — ngựa cha không khuyên bỏ thi.',
      'Sai — ngựa cha khuyên chuẩn bị kĩ, không phải cứ chạy.',
      'Sai — ngựa cha khuyên cẩn thận, không khuyên khoe.',
      'Đúng — ngựa cha khuyên xem lại móng chân, chuẩn bị kĩ.',
    ]),
    Q('Vì sao ngựa con thua?', ['Bị thỏ vượt qua ở phút cuối', 'Móng bị long, ngã giữa đường', 'Bị bắt', 'Lạc đường'], 1, 'Móng chưa được kiểm tra → bị long.', [
      'Sai — ngựa con thua vì móng bị long, không phải bị thỏ vượt.',
      'Đúng — móng chưa kiểm tra nên bị long, ngã giữa đường.',
      'Sai — ngựa con không bị bắt.',
      'Sai — ngựa con không lạc đường mà bị long móng.',
    ]),
    Q('"Chủ quan" có nghĩa?', ['Buồn bã', 'Khiêm tốn', 'Tự tin quá mức, không cẩn thận', 'Lo lắng'], 2, 'Chủ quan = không cẩn thận, coi thường.', [
      'Sai — "chủ quan" không có nghĩa là buồn bã.',
      'Sai — "chủ quan" trái với khiêm tốn.',
      'Đúng — "chủ quan" là tự tin quá mức, thiếu cẩn thận.',
      'Sai — "chủ quan" khác với lo lắng.',
    ]),
    Q('Em rút ra điều gì?', ['Khoe khoang', 'Cẩn thận, chuẩn bị tốt trước khi làm', 'Làm liều', 'Bỏ cuộc'], 1, 'Cẩn thận và chuẩn bị kĩ.', [
      'Sai — khoe khoang dẫn đến chủ quan, thất bại.',
      'Đúng — cần cẩn thận, chuẩn bị tốt trước khi làm việc.',
      'Sai — làm liều, không chuẩn bị dễ thất bại.',
      'Sai — bỏ cuộc không phải bài học của truyện.',
    ]),
  ]),

  M(29, 'Mở rộng vốn từ: Thể thao · Dấu hai chấm', [
    Q('Môn thể thao nào dưới đây?', ['Đọc sách', 'Nấu cơm', 'Học toán', 'Bóng đá, bơi lội, cầu lông'], 3, 'Các môn thể thao.', [
      'Sai — đọc sách không phải môn thể thao.',
      'Sai — nấu cơm không phải môn thể thao.',
      'Sai — học toán không phải môn thể thao.',
      'Đúng — bóng đá, bơi lội, cầu lông là các môn thể thao.',
    ]),
    Q('Người chơi bóng đá gọi là?', ['Cầu thủ', 'Bác sĩ', 'Diễn viên', 'Hoạ sĩ'], 0, 'Cầu thủ = người chơi bóng đá.', [
      'Đúng — người chơi bóng đá gọi là cầu thủ.',
      'Sai — bác sĩ làm về y học, không phải người chơi bóng.',
      'Sai — diễn viên đóng phim, kịch, không phải người chơi bóng.',
      'Sai — hoạ sĩ vẽ tranh, không phải người chơi bóng.',
    ]),
    Q('Dấu hai chấm (:) thường dùng để?', ['Báo trước lời nói/liệt kê', 'Cảm thán', 'Kết thúc câu', 'Báo hiệu câu hỏi'], 0, 'Dấu : báo hiệu lời nói, lời giải thích hoặc liệt kê.', [
      'Đúng — dấu hai chấm báo trước lời nói hoặc phần liệt kê.',
      'Sai — câu cảm thán dùng dấu chấm than.',
      'Sai — kết thúc câu dùng dấu chấm.',
      'Sai — câu hỏi dùng dấu chấm hỏi.',
    ]),
    Q('Dùng đúng dấu: "Mẹ nói ___ Con phải ngoan."', ['? (báo hiệu câu hỏi)', '.', ',', ':'], 3, 'Sau "nói" + lời nói trực tiếp → dùng :.', [
      'Sai — đây không phải câu hỏi nên không dùng dấu hỏi.',
      'Sai — dấu chấm không báo trước lời nói trực tiếp.',
      'Sai — dấu phẩy không đủ để báo trước lời nói trực tiếp.',
      'Đúng — sau "nói" rồi đến lời nói trực tiếp nên dùng dấu hai chấm.',
    ]),
    Q('Dùng đúng dấu: "Trong cặp có ___ sách, vở, bút."', ['.', ':', '? (báo hiệu câu hỏi)', '; (ngăn các vế dài)'], 1, 'Trước liệt kê → dùng :.', [
      'Sai — dấu chấm không dùng để báo trước phần liệt kê.',
      'Đúng — trước phần liệt kê (sách, vở, bút) dùng dấu hai chấm.',
      'Sai — đây không phải câu hỏi nên không dùng dấu hỏi.',
      'Sai — dấu chấm phẩy không hợp để báo trước liệt kê ngắn này.',
    ]),
    Q('Tập thể thao giúp em?', ['Khoẻ mạnh, nhanh nhẹn', 'Buồn ngủ', 'Ốm yếu', 'Mệt mỏi suốt cả ngày'], 0, 'Tập thể thao giúp cơ thể khoẻ mạnh.', [
      'Đúng — tập thể thao giúp cơ thể khoẻ mạnh, nhanh nhẹn.',
      'Sai — tập thể thao làm tỉnh táo, không buồn ngủ.',
      'Sai — tập thể thao giúp khoẻ, không gây ốm yếu.',
      'Sai — tập thể thao vừa sức giúp khoẻ, không mệt cả ngày.',
    ]),
  ]),

  M(30, 'Tập đọc: "Bác sĩ Y-éc-xanh"', [
    Q('Bác sĩ Y-éc-xanh là người nước nào?', ['Người Nhật', 'Người Mỹ', 'Người Anh', 'Người Pháp gắn bó với Việt Nam'], 3, 'Y-éc-xanh — bác sĩ Pháp, sống và làm việc ở Nha Trang.', [
      'Sai — Y-éc-xanh là người Pháp, không phải người Nhật.',
      'Sai — Y-éc-xanh là người Pháp, không phải người Mỹ.',
      'Sai — Y-éc-xanh là người Pháp, không phải người Anh.',
      'Đúng — Y-éc-xanh là bác sĩ người Pháp gắn bó với Việt Nam.',
    ]),
    Q('Ông đến Việt Nam để?', ['Du lịch', 'Đánh cá', 'Nghiên cứu khoa học, chữa bệnh', 'Buôn bán'], 2, 'Nghiên cứu vắc-xin và chữa bệnh cho người Việt.', [
      'Sai — ông đến để nghiên cứu và chữa bệnh, không phải du lịch.',
      'Sai — ông là bác sĩ, không phải đến để đánh cá.',
      'Đúng — ông đến để nghiên cứu khoa học và chữa bệnh.',
      'Sai — ông đến để chữa bệnh, không phải buôn bán.',
    ]),
    Q('Đức tính của bác sĩ?', ['Lười nhác', 'Tham lam', 'Nhân hậu, yêu thương con người', 'Ích kỷ'], 2, 'Tận tâm vì người bệnh.', [
      'Sai — ông tận tâm với người bệnh, không lười nhác.',
      'Sai — ông vì người bệnh, không tham lam.',
      'Đúng — ông nhân hậu, yêu thương con người.',
      'Sai — ông sống vì người khác, không ích kỉ.',
    ]),
    Q('Bài học từ tấm gương ông?', ['Coi nhẹ y học', 'Chỉ giúp người cùng nước', 'Yêu thương con người không phân biệt quốc tịch', 'Bỏ nghề'], 2, 'Tình yêu thương vượt biên giới.', [
      'Sai — ông tận tụy với y học, không coi nhẹ.',
      'Sai — ông giúp cả người Việt, không chỉ người cùng nước.',
      'Đúng — yêu thương con người không phân biệt quốc tịch.',
      'Sai — ông gắn bó với nghề, không bỏ nghề.',
    ]),
    Q('Y-éc-xanh sống nhiều năm ở?', ['Cần Thơ', 'Nha Trang (Khánh Hoà)', 'Đà Lạt', 'Hà Nội'], 1, 'Ông sống và làm việc ở Nha Trang.', [
      'Sai — ông sống ở Nha Trang, không phải Cần Thơ.',
      'Đúng — ông sống và làm việc nhiều năm ở Nha Trang.',
      'Sai — ông sống ở Nha Trang, không phải Đà Lạt.',
      'Sai — ông sống ở Nha Trang, không phải Hà Nội.',
    ]),
    Q('Em học được gì từ ông?', ['Sống cho riêng mình', 'Trốn việc', 'Lười học', 'Sống có ích, yêu thương mọi người'], 3, 'Sống có ích cho cộng đồng.', [
      'Sai — ông sống vì mọi người, không chỉ vì riêng mình.',
      'Sai — ông tận tụy với công việc, không trốn việc.',
      'Sai — ông ham nghiên cứu, không lười học.',
      'Đúng — ta học cách sống có ích, yêu thương mọi người.',
    ]),
  ]),

  M(31, 'Viết thư · Viết thư cảm ơn', [
    Q('Một bức thư thường có?', ['Chỉ tên người gửi', 'Chỉ nội dung', 'Đầu thư, nội dung, cuối thư', 'Chỉ ngày tháng'], 2, 'Đầu thư (ngày tháng, lời chào) — nội dung — kết (lời chúc, kí tên).', [
      'Sai — bức thư cần nhiều phần, không chỉ tên người gửi.',
      'Sai — bức thư còn cần đầu thư và phần cuối, không chỉ nội dung.',
      'Đúng — bức thư có đầu thư, nội dung và cuối thư.',
      'Sai — bức thư cần nhiều phần, không chỉ ngày tháng.',
    ]),
    Q('Phần đầu thư có?', ['Chữ kí', 'Địa điểm, ngày tháng, lời chào người nhận', 'Bài thơ', 'Lời chúc'], 1, 'Đầu thư: ngày tháng + lời chào.', [
      'Sai — chữ kí nằm ở cuối thư, không phải đầu thư.',
      'Đúng — đầu thư ghi địa điểm, ngày tháng và lời chào.',
      'Sai — bài thơ không phải phần bắt buộc của đầu thư.',
      'Sai — lời chúc thường ở cuối thư, không phải đầu thư.',
    ]),
    Q('Lời chào đầu thư cho bạn?', ['"Kính gửi…"', '"Bạn… thân mến!"', '"Tạm biệt!"', '"Trân trọng,"'], 1, 'Bạn bè dùng "Thân mến!".', [
      'Sai — "Kính gửi…" dùng cho người trên, không phải cho bạn.',
      'Đúng — viết cho bạn dùng lời chào "Bạn… thân mến!".',
      'Sai — "Tạm biệt!" là lời chia tay, không phải lời chào đầu thư.',
      'Sai — "Trân trọng," thường đặt ở cuối thư trang trọng.',
    ]),
    Q('Lời chào đầu thư cho ông bà, thầy cô?', ['"Chào bạn"', '"Mày nhé"', '"Cậu ơi"', '"Kính gửi…"'], 3, 'Người trên dùng "Kính gửi…".', [
      'Sai — "Chào bạn" dùng cho bạn bè, không phải người trên.',
      'Sai — "Mày nhé" thiếu lễ phép với người trên.',
      'Sai — "Cậu ơi" dùng cho bạn bè, không phải người trên.',
      'Đúng — viết cho người trên dùng "Kính gửi…" cho lễ phép.',
    ]),
    Q('Cuối thư cần?', ['Tên cha mẹ', 'Để trống', 'Lời chúc + chữ kí', 'Số điện thoại'], 2, 'Cuối thư có lời chúc và kí tên.', [
      'Sai — cuối thư ghi tên người viết, không phải tên cha mẹ.',
      'Sai — không nên để trống phần cuối thư.',
      'Đúng — cuối thư có lời chúc và chữ kí của người viết.',
      'Sai — số điện thoại không phải phần bắt buộc của cuối thư.',
    ]),
    Q('Viết thư cảm ơn gửi ai?', ['Người đã giúp đỡ mình', 'Người lạ', 'Người chưa quen', 'Không ai'], 0, 'Thư cảm ơn gửi người đã giúp đỡ.', [
      'Đúng — thư cảm ơn gửi người đã giúp đỡ mình.',
      'Sai — thư cảm ơn gửi người đã giúp, không phải người lạ.',
      'Sai — thư cảm ơn gửi người đã giúp, không phải người chưa quen.',
      'Sai — thư cảm ơn luôn có người nhận cụ thể.',
    ]),
  ]),

  M(32, 'Tập đọc: "Người đi săn và con vượn"', [
    Q('"Người đi săn và con vượn" có nội dung?', ['Cuộc thi săn bắn', 'Đua xe', 'Đi câu cá', 'Bài học bảo vệ động vật, tình mẫu tử'], 3, 'Vượn mẹ hi sinh vì con → người thợ săn từ bỏ nghề.', [
      'Sai — truyện không nói về cuộc thi săn bắn.',
      'Sai — truyện không nói về đua xe.',
      'Sai — truyện không nói về đi câu cá.',
      'Đúng — truyện dạy bảo vệ động vật và ca ngợi tình mẫu tử.',
    ]),
    Q('Vượn mẹ làm gì trước khi chết?', ['Trốn vào hốc cây sâu', 'Cho con bú lần cuối', 'Bỏ con đi', 'Tấn công người'], 1, 'Vượn mẹ vẫn cho con bú dù trúng tên.', [
      'Sai — vượn mẹ không trốn mà lo cho con.',
      'Đúng — vượn mẹ vẫn cho con bú lần cuối dù trúng tên.',
      'Sai — vượn mẹ không bỏ con mà chăm con đến cùng.',
      'Sai — vượn mẹ không tấn công người mà lo cho con.',
    ]),
    Q('Người đi săn sau đó?', ['Tiếp tục săn', 'Mang vượn con về nuôi', 'Hối hận, bỏ nghề săn', 'Bỏ con vượn'], 2, 'Người đi săn hối hận, bẻ gãy nỏ.', [
      'Sai — người đi săn không tiếp tục săn nữa.',
      'Sai — truyện kể người đi săn hối hận và bỏ nghề.',
      'Đúng — người đi săn hối hận, bẻ gãy nỏ và bỏ nghề săn.',
      'Sai — truyện kể người đi săn hối hận, không bỏ mặc con vượn.',
    ]),
    Q('Bài học từ truyện?', ['Tham lam', 'Săn bắn nhiều', 'Lạnh lùng', 'Bảo vệ động vật, không tàn sát'], 3, 'Yêu thương và bảo vệ động vật.', [
      'Sai — truyện dạy yêu thương, không dạy tham lam.',
      'Sai — truyện khuyên không tàn sát động vật.',
      'Sai — truyện dạy yêu thương, không dạy lạnh lùng.',
      'Đúng — ta cần bảo vệ động vật, không tàn sát.',
    ]),
    Q('Tình cảm vượn mẹ thể hiện?', ['Sự sợ hãi', 'Tình mẫu tử thiêng liêng', 'Sự thờ ơ', 'Sự ích kỷ'], 1, 'Tình mẹ con thiêng liêng cả ở loài vật.', [
      'Sai — vượn mẹ thể hiện tình thương, không phải sợ hãi.',
      'Đúng — vượn mẹ thể hiện tình mẫu tử thiêng liêng.',
      'Sai — vượn mẹ lo cho con đến cùng, không thờ ơ.',
      'Sai — vượn mẹ hi sinh vì con, không ích kỉ.',
    ]),
    Q('Em làm gì để bảo vệ động vật?', ['Bẫy chim', 'Không săn bắt, không mua sản phẩm từ động vật quý', 'Đốt rừng', 'Đánh chó'], 1, 'Bảo vệ động vật qua hành động.', [
      'Sai — bẫy chim làm hại động vật.',
      'Đúng — không săn bắt, không mua sản phẩm từ động vật quý.',
      'Sai — đốt rừng phá nơi ở của động vật.',
      'Sai — đánh chó là hành vi tàn nhẫn với động vật.',
    ]),
  ]),

  M(33, 'Mở rộng vốn từ: Thiên nhiên · Viết quảng cáo ngắn', [
    Q('Từ chỉ THIÊN NHIÊN?', ['điện thoại', 'núi, sông, biển, rừng', 'máy tính', 'ô tô du lịch'], 1, 'Núi sông biển rừng — yếu tố thiên nhiên.', [
      'Sai — điện thoại do con người làm ra, không phải thiên nhiên.',
      'Đúng — núi, sông, biển, rừng là các yếu tố thiên nhiên.',
      'Sai — máy tính do con người làm ra, không phải thiên nhiên.',
      'Sai — ô tô do con người làm ra, không phải thiên nhiên.',
    ]),
    Q('Thiên nhiên cho ta?', ['Tiền bạc', 'Điện thoại', 'Đồ chơi', 'Không khí, nước, lương thực'], 3, 'Thiên nhiên cho ta sự sống.', [
      'Sai — tiền bạc do con người tạo ra, không phải thiên nhiên cho.',
      'Sai — điện thoại do con người làm, không phải thiên nhiên cho.',
      'Sai — đồ chơi do con người làm, không phải thiên nhiên cho.',
      'Đúng — thiên nhiên cho ta không khí, nước, lương thực.',
    ]),
    Q('Em làm gì để bảo vệ thiên nhiên?', ['Không xả rác, trồng cây', 'Chặt cây', 'Vứt rác', 'Đốt rừng'], 0, 'Bảo vệ thiên nhiên qua hành động.', [
      'Đúng — không xả rác và trồng cây giúp bảo vệ thiên nhiên.',
      'Sai — chặt cây làm hại thiên nhiên.',
      'Sai — vứt rác làm ô nhiễm thiên nhiên.',
      'Sai — đốt rừng phá hoại thiên nhiên.',
    ]),
    Q('Quảng cáo (ngắn) nhằm?', ['Đi du lịch', 'Giới thiệu sản phẩm/sự kiện cho mọi người biết', 'Nấu ăn', 'Học bài'], 1, 'Quảng cáo = giới thiệu để mọi người chú ý.', [
      'Sai — quảng cáo không phải để đi du lịch.',
      'Đúng — quảng cáo giới thiệu sản phẩm hoặc sự kiện cho mọi người biết.',
      'Sai — quảng cáo không phải để nấu ăn.',
      'Sai — quảng cáo không phải để học bài.',
    ]),
    Q('Quảng cáo tốt cần?', ['Dài dòng', 'Sai sự thật', 'Ngắn gọn, hấp dẫn, đúng sự thật', 'Lẫn lộn'], 2, 'Ngắn, hấp dẫn, trung thực.', [
      'Sai — quảng cáo tốt nên ngắn gọn, không dài dòng.',
      'Sai — quảng cáo phải đúng sự thật, không được sai.',
      'Đúng — quảng cáo tốt cần ngắn gọn, hấp dẫn, đúng sự thật.',
      'Sai — quảng cáo cần rõ ràng, không lẫn lộn.',
    ]),
    Q('"Rừng vàng biển bạc" ý nói?', ['Biển có bạc', 'Không có gì', 'Thiên nhiên Việt Nam giàu có', 'Rừng có vàng'], 2, 'Câu thành ngữ ca ngợi sự giàu có của thiên nhiên VN.', [
      'Sai — đây là cách nói ví von, không phải biển có bạc thật.',
      'Sai — câu này ca ngợi sự giàu có, không phải không có gì.',
      'Đúng — câu thành ngữ ca ngợi thiên nhiên Việt Nam giàu có.',
      'Sai — đây là cách nói ví von, không phải rừng có vàng thật.',
    ]),
  ]),

  M(34, 'Tập đọc: "Mặt trời xanh của tôi"', [
    Q('"Mặt trời xanh của tôi" là cách nói chỉ?', ['Quả bóng', 'Lá cây bàng', 'Tán lá cọ xoè rộng như mặt trời xanh', 'Mặt trời thật'], 2, 'Hình ảnh tán cọ được ví như mặt trời màu xanh.', [
      'Sai — "mặt trời xanh" chỉ tán lá cọ, không phải quả bóng.',
      'Sai — "mặt trời xanh" chỉ tán lá cọ, không phải lá bàng.',
      'Đúng — tán lá cọ xoè rộng được ví như mặt trời xanh.',
      'Sai — đây là cách nói ví von, không phải mặt trời thật.',
    ]),
    Q('Tác giả bài thơ?', ['Định Hải', 'Phạm Tiến Duật', 'Nguyễn Viết Bình', 'Trần Đăng Khoa'], 2, 'Bài thơ của Nguyễn Viết Bình.', [
      'Sai — Định Hải không phải tác giả bài này.',
      'Sai — Phạm Tiến Duật không phải tác giả bài này.',
      'Đúng — bài thơ là của Nguyễn Viết Bình.',
      'Sai — Trần Đăng Khoa không phải tác giả bài này.',
    ]),
    Q('Cảm xúc trong bài thơ?', ['Tức giận', 'Yêu thiên nhiên, yêu quê hương', 'Cô đơn, lạc lõng', 'Sợ hãi'], 1, 'Tình yêu thiên nhiên và quê.', [
      'Sai — bài thơ thể hiện yêu thương, không tức giận.',
      'Đúng — bài thơ thể hiện tình yêu thiên nhiên và quê hương.',
      'Sai — bài thơ ấm áp, không cô đơn lạc lõng.',
      'Sai — bài thơ yêu thiên nhiên, không sợ hãi.',
    ]),
    Q('"Mặt trời xanh" là phép?', ['Liệt kê', 'Lặp', 'So sánh – ẩn dụ', 'Đối lập'], 2, 'Ẩn dụ: lá cọ ≈ mặt trời nhưng màu xanh.', [
      'Sai — đây không phải kể nhiều thứ nối tiếp nên không phải liệt kê.',
      'Sai — đây không phải lặp lại từ ngữ.',
      'Đúng — lá cọ được ví như mặt trời xanh nên là so sánh – ẩn dụ.',
      'Sai — đây không nêu hai điều trái ngược.',
    ]),
    Q('Bài thơ giúp em?', ['Chán ghét cảnh vật quê hương', 'Bỏ qua thiên nhiên', 'Sợ thiên nhiên', 'Yêu thiên nhiên, biết quan sát'], 3, 'Yêu và biết ngắm nhìn thiên nhiên.', [
      'Sai — bài thơ giúp ta yêu, không chán ghét quê hương.',
      'Sai — bài thơ giúp ta để ý đến thiên nhiên.',
      'Sai — bài thơ giúp ta yêu, không sợ thiên nhiên.',
      'Đúng — bài thơ giúp ta yêu thiên nhiên và biết quan sát.',
    ]),
    Q('Cây cọ thường mọc nhiều ở vùng?', ['Trung du Bắc Bộ (Phú Thọ)', 'Vùng ven biển miền Trung', 'Cực Bắc', 'Sa mạc'], 0, 'Cọ là cây đặc trưng vùng trung du.', [
      'Đúng — cọ mọc nhiều ở vùng trung du Bắc Bộ như Phú Thọ.',
      'Sai — cọ là cây trung du, không đặc trưng ven biển miền Trung.',
      'Sai — cọ mọc ở trung du, không phải cực Bắc.',
      'Sai — cọ không mọc ở sa mạc.',
    ]),
  ]),

  M(35, 'Ôn tập cuối năm', [
    Q('Câu "Lan đang quét nhà." thuộc kiểu?', ['Ai làm gì?', 'Ai là gì?', 'Cảm thán', 'Ai thế nào?'], 0, '"Quét nhà" là hoạt động.', [
      'Đúng — "quét nhà" là hoạt động nên thuộc kiểu "Ai làm gì?".',
      'Sai — câu không có từ "là" nên không phải "Ai là gì?".',
      'Sai — câu kết bằng dấu chấm nên không phải câu cảm thán.',
      'Sai — câu không tả đặc điểm nên không phải "Ai thế nào?".',
    ]),
    Q('Câu "Mặt biển xanh như tấm thảm." có phép gì?', ['Lặp lại', 'So sánh', 'Đối lập', 'Liệt kê'], 1, 'Có "như" → so sánh.', [
      'Sai — câu không lặp lại từ ngữ.',
      'Đúng — có từ "như" so sánh mặt biển với tấm thảm.',
      'Sai — câu không nêu hai điều trái ngược.',
      'Sai — câu không kể nhiều thứ nối tiếp nên không phải liệt kê.',
    ]),
    Q('Dấu hai chấm thường dùng?', ['Báo trước lời nói / liệt kê', 'Tạm dừng nhẹ', 'Cảm thán', 'Kết thúc câu hỏi'], 0, 'Dấu : báo hiệu lời nói hoặc liệt kê.', [
      'Đúng — dấu hai chấm báo trước lời nói hoặc phần liệt kê.',
      'Sai — "tạm dừng nhẹ" là việc của dấu phẩy.',
      'Sai — câu cảm thán dùng dấu chấm than.',
      'Sai — câu hỏi dùng dấu chấm hỏi.',
    ]),
    Q('Từ "yêu thương" là từ chỉ?', ['Địa điểm', 'Trạng thái / tình cảm', 'Sự vật', 'Số đếm'], 1, '"Yêu thương" là tình cảm/trạng thái.', [
      'Sai — "yêu thương" không chỉ nơi chốn.',
      'Đúng — "yêu thương" là tình cảm nên là từ chỉ trạng thái.',
      'Sai — "yêu thương" không gọi tên một vật nên không phải sự vật.',
      'Sai — "yêu thương" không chỉ số lượng.',
    ]),
    Q('Đoạn văn 3–5 câu kể về một việc tốt em đã làm cần?', ['Viết hoa toàn bộ', 'Có mở – thân – kết, dùng dấu câu đúng', 'Không cần chấm phẩy', 'Chỉ 1 câu'], 1, 'Yêu cầu đoạn văn ngắn lớp 3.', [
      'Sai — chỉ viết hoa chữ cái đầu câu, không hoa toàn bộ.',
      'Đúng — đoạn văn cần có mở – thân – kết và dùng dấu câu đúng.',
      'Sai — đoạn văn phải dùng dấu chấm, dấu phẩy đúng chỗ.',
      'Sai — một câu thì quá ngắn để kể một việc tốt.',
    ]),
    Q('Câu "Ôi, quê hương em đẹp quá!" là?', ['Câu hỏi', 'Câu khiến', 'Câu cảm thán', 'Câu kể'], 2, 'Có "Ôi" + dấu ! → câu cảm.', [
      'Sai — câu kết bằng dấu chấm than, không phải câu hỏi.',
      'Sai — câu không yêu cầu ai làm gì nên không phải câu khiến.',
      'Đúng — có "Ôi" và dấu chấm than nên là câu cảm thán.',
      'Sai — câu bộc lộ cảm xúc nên không phải câu kể bình thường.',
    ]),
  ]),

  M(36, 'Kết thúc Lớp 3 — Hành trang Tiếng Việt vào Lớp 4', [
    Q('Câu "Bạn Lan chạy nhanh như cơn gió." dùng biện pháp tu từ nào?', ['Nhân hoá', 'So sánh', 'Điệp từ', 'Không dùng biện pháp nào'], 1, 'Từ "như" là dấu hiệu của phép so sánh.', ['Sai — nhân hoá là gán đặc điểm của người cho vật.', 'Đúng — từ "như" cho thấy đây là phép so sánh.', 'Sai — điệp từ là lặp lại một từ nhiều lần.', 'Sai — câu này có hình ảnh so sánh rõ ràng.']),
    Q('Câu "Ông Mặt Trời thức dậy sau rặng tre." dùng biện pháp tu từ nào?', ['Nhân hoá', 'So sánh', 'Liệt kê', 'Không dùng biện pháp nào'], 0, 'Gọi Mặt Trời là "ông" và cho "thức dậy" — đó là nhân hoá.', ['Đúng — gọi vật bằng từ xưng hô của người và tả vật như người là nhân hoá.', 'Sai — câu này không có từ so sánh (như, tựa, giống).', 'Sai — liệt kê là kể ra nhiều sự vật nối tiếp.', 'Sai — câu này rõ ràng đang nhân hoá Mặt Trời.']),
    Q('Câu "Bạn Nam là học sinh giỏi." thuộc mẫu câu nào?', ['Ai làm gì?', 'Ai thế nào?', 'Ai là gì?', 'Câu hỏi'], 2, 'Có từ "là" nối chủ ngữ với vị ngữ → mẫu Ai – là gì?', ['Sai — mẫu Ai làm gì? có vị ngữ chỉ hoạt động.', 'Sai — mẫu Ai thế nào? có vị ngữ chỉ đặc điểm, trạng thái.', 'Đúng — có từ "là" nên đây là mẫu Ai – là gì?', 'Sai — câu này kết thúc bằng dấu chấm, không phải câu hỏi.']),
    Q('Từ nào viết ĐÚNG chính tả?', ['suất sắc', 'xuất xắc', 'suất xắc', 'xuất sắc'], 3, 'Viết đúng là "xuất sắc".', ['Sai — sai âm đầu ở tiếng thứ nhất.', 'Sai — sai âm đầu ở tiếng thứ hai.', 'Sai — sai âm đầu ở cả hai tiếng.', 'Đúng — "xuất sắc" là cách viết đúng.']),
    Q('Từ "chăm chỉ" thuộc từ loại nào?', ['Danh từ', 'Động từ', 'Tính từ', 'Quan hệ từ'], 2, '"Chăm chỉ" chỉ đặc điểm, tính chất → tính từ.', ['Sai — danh từ chỉ người, vật, hiện tượng.', 'Sai — động từ chỉ hoạt động, trạng thái.', 'Đúng — "chăm chỉ" chỉ đặc điểm nên là tính từ.', 'Sai — quan hệ từ là các từ nối như "và", "vì", "nên".']),
    Q('Lên Lớp 4 em sẽ viết bài văn hoàn chỉnh gồm những phần nào?', ['Chỉ có mở bài và kết bài', 'Chỉ có thân bài', 'Chỉ một đoạn duy nhất', 'Mở bài, thân bài, kết bài'], 3, 'Bài văn hoàn chỉnh có 3 phần: mở bài – thân bài – kết bài.', ['Sai — thiếu thân bài thì bài văn không có nội dung chính.', 'Sai — thiếu mở bài và kết bài thì bài văn chưa hoàn chỉnh.', 'Sai — bài văn Lớp 4 gồm nhiều đoạn, chia theo ba phần.', 'Đúng — bài văn hoàn chỉnh gồm mở bài, thân bài và kết bài.']),
  ]),
];

export const P3TV_SCENARIOS = indexBy(P3TV_WEEKS);
