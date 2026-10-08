// ============================================================
// Lớp 7 · GIÁO DỤC CÔNG DÂN — 35 tuần (HK1: 1–18 · HK2: 19–35)
// Bám CT GDPT 2018 môn GDCD Lớp 7 (10 chủ đề).
// 4–5 câu/tuần · ID prefix: "S7GDCD-wNN-quiz".
// ============================================================
import { Q, W, indexBy } from './_helper.js';

const M = (n, title, qs, opts) => W('S7GDCD', 'gdcd', n, title, qs, opts);

// ============================================================
// 📚 LÝ THUYẾT — mini-bài giảng bám SGK GDCD 7 (GDPT 2018)
// (Kết nối tri thức · Chân trời sáng tạo · Cánh Diều)
// Dùng chung cho các câu cùng chủ đề/cụm tuần.
// ============================================================

// ── Chủ đề 1: Tự hào về truyền thống quê hương (T1–4) ──
const TT_TRADITION_DEF = [
  '<b>Truyền thống quê hương</b> là <i>những giá trị tốt đẹp về vật chất và tinh thần</i> (văn hoá, phong tục, nghề nghiệp, đạo đức, lối sống) được <code>hình thành và lưu truyền qua nhiều thế hệ</code> ở một địa phương.',
  'Một số truyền thống tiêu biểu:',
  '<ul><li><b>Yêu nước</b> — đoàn kết chống giặc, bảo vệ quê hương.</li><li><b>Cần cù lao động</b> — nghề thủ công gia truyền (gốm, lụa, đúc đồng…).</li><li><b>Hiếu học</b>, <b>tôn sư trọng đạo</b>, <b>đoàn kết, tương thân tương ái</b>.</li><li>Lễ hội, làn điệu dân ca, ẩm thực đặc sản, di tích lịch sử.</li></ul>',
  '⚠️ Phân biệt: <b>tảo hôn, mê tín dị đoan, đốt vàng mã quá mức</b> là <i>hủ tục</i> cần bài trừ — KHÔNG phải truyền thống tốt đẹp.',
  '💡 Đạo lí <i>"Uống nước nhớ nguồn"</i> nhắc ta biết ơn cội nguồn và có trách nhiệm giữ gìn, phát huy truyền thống.',
];

const TT_TRADITION_PROUD = [
  '<b>Tự hào về truyền thống quê hương</b> là <i>trân trọng, hãnh diện</i> và giữ gìn, phát huy những giá trị tốt đẹp của quê hương mình.',
  'Biểu hiện của lòng tự hào:',
  '<ul><li>Tự tin <b>giới thiệu</b> nét đẹp văn hoá, lịch sử quê mình với người khác.</li><li>Tham gia <b>lễ hội, hội làng</b>, học nghề và hát dân ca truyền thống.</li><li>Sống tử tế để <code>làm rạng danh</code> quê hương.</li></ul>',
  '⚠️ Phân biệt <b>TỰ HÀO</b> và <b>TỰ CAO</b>: tự hào là trân trọng giá trị thật và khiêm tốn; tự cao là phô trương, coi thường nơi khác.',
  '💡 Chê bai quê mình, giấu giếm gốc gác, bịa thông tin cho "oách"… đều <i>trái với lòng tự hào</i> quê hương.',
];

const TT_TRADITION_MEANING = [
  '<b>Ý nghĩa</b> của tự hào truyền thống quê hương:',
  '<ul><li>Tạo <b>động lực</b> sống tốt, sống có trách nhiệm với cộng đồng.</li><li>Hình thành <b>bản sắc</b> riêng, giúp ta không hoà tan, không tự ti.</li><li>Gắn kết tình yêu quê hương — khi quê gặp thiên tai, biết <code>chung tay giúp đỡ</code>.</li></ul>',
  'Người tự hào quê hương thật sự sẽ <b>đóng góp xây dựng quê hương</b> khi có điều kiện, dù đi xa vẫn giới thiệu quê mình một cách trung thực, lịch sự.',
  '💡 Mỗi quê hương đều đáng tự hào — tôn trọng quê người khác cũng là tôn trọng truyền thống của họ.',
];

const TT_TRADITION_KEEP = [
  '<b>Trách nhiệm</b> của học sinh với truyền thống quê hương: <i>không đợi lớn, hành động ngay trong khả năng của mình</i>.',
  'Việc làm cụ thể:',
  '<ul><li><b>Học tập, rèn luyện</b> tốt; tham gia tìm hiểu di tích, lễ hội ở địa phương.</li><li><b>Quảng bá</b> đặc sản, nghề truyền thống qua mạng xã hội — cách phát huy hiệu quả thời đại số.</li><li>Ngăn chặn và báo người có thẩm quyền khi thấy ai <code>phá hoại di tích</code>.</li></ul>',
  '💡 Cách phát huy hiệu quả: <b>kết hợp giữ gìn cốt lõi cái cũ với đổi mới, sáng tạo</b> — không bỏ hết cũng không giữ nguyên cứng nhắc.',
];

// ── Chủ đề 2: Quan tâm, cảm thông và chia sẻ (T5–7) ──
const TT_CARE_DEF = [
  '<b>Quan tâm</b> là thường xuyên để ý, hỏi han đến người khác. <b>Cảm thông</b> là <i>đặt mình vào vị trí người khác</i> để hiểu và rung cảm với cảm xúc của họ. <b>Chia sẻ</b> là san sẻ, giúp đỡ cả về vật chất và tinh thần.',
  'Biểu hiện với người thân:',
  '<ul><li>Hỏi thăm sức khoẻ, <code>lắng nghe</code> khi người thân gặp khó.</li><li>Giúp việc nhà, chăm sóc ông bà khi ốm đau.</li><li>An ủi, động viên khi anh chị em buồn.</li></ul>',
  '⚠️ Quan tâm KHÁC <b>soi mói, tò mò</b> chuyện riêng tư — soi mói là xâm phạm, không phải quan tâm chân thành.',
];

const TT_CARE_MEANING = [
  '<b>Ý nghĩa</b> của quan tâm, cảm thông, chia sẻ:',
  '<ul><li>Giúp con người <b>gắn kết, gần gũi</b>; tạo nên gia đình hạnh phúc, ấm áp.</li><li>Người biết chia sẻ được mọi người <b>yêu quý, tin cậy</b>.</li><li>Người được quan tâm thấy <code>được yêu thương</code>, tự tin và biết yêu thương lại.</li></ul>',
  'Ca dao về tình thân: <i>"Anh em như thể tay chân"</i>, <i>"Một giọt máu đào hơn ao nước lã"</i>.',
  '💡 Khi gia đình gặp khó khăn, biết <b>đồng cam cộng khổ</b> (tiết kiệm, động viên nhau) là biểu hiện chia sẻ đẹp nhất.',
];

const TT_CARE_PRACTICE = [
  '<b>Rèn luyện</b> quan tâm, chia sẻ cần bắt đầu từ <i>những việc nhỏ, làm thường xuyên, chân thành</i> — không đợi dịp đặc biệt, không vì phần thưởng.',
  'Cách làm trong gia đình:',
  '<ul><li>Tập <b>thói quen hỏi thăm, giúp đỡ</b> người thân hằng ngày.</li><li>Khi bố mẹ bận: tự lo việc cá nhân, làm việc nhà phù hợp.</li><li>Khi làm sai khiến người thân buồn: <code>xin lỗi và sửa sai</code>.</li><li>Khi anh chị em mâu thuẫn: bình tĩnh nói chuyện, lắng nghe, dung hoà.</li></ul>',
  '💡 Sự chân thành và kiên trì mới giúp quan tâm, chia sẻ trở thành đức tính bền vững.',
];

// ── Chủ đề 3: Học tập tự giác, tích cực (T8–10) ──
const TT_STUDY_DEF = [
  '<b>Học tập tự giác, tích cực</b> là <i>chủ động, nỗ lực học tập</i> mà không cần ai nhắc nhở, thúc ép.',
  'Phân biệt hai khía cạnh:',
  '<ul><li><b>Tự giác</b>: tự mình thực hiện việc học, tự lập kế hoạch và làm theo.</li><li><b>Tích cực</b>: chủ động tìm hiểu, <code>đặt câu hỏi</code>, phát biểu, hợp tác nhóm, vận dụng kiến thức vào thực tế.</li></ul>',
  'Tục ngữ — danh ngôn: <i>"Học, học nữa, học mãi"</i> (Lê-nin) đề cao tinh thần tự học suốt đời.',
  '⚠️ Trái với tự giác, tích cực là: <b>lười học, học đối phó, chống đối, chỉ học khi bị ép hoặc khi có thưởng</b>.',
];

const TT_STUDY_BIEUHIEN = [
  '<b>Biểu hiện</b> của học tập tự giác, tích cực:',
  '<ul><li>Tự lập <b>thời gian biểu</b> và làm theo; tự ôn bài, tự kiểm tra bài tập.</li><li>Trong lớp: <code>giơ tay phát biểu</code>, đặt câu hỏi, trao đổi nhóm sôi nổi.</li><li>Khi không hiểu bài: hỏi thầy cô, bạn bè, tự tìm hiểu thêm.</li><li>Gặp bài khó: suy nghĩ nhiều cách, tìm tài liệu, không đầu hàng.</li></ul>',
  '⚠️ Biểu hiện <b>thiếu tự giác</b>: phải bị giục mới học, học dồn trước thi, đợi nhắc nhở, chép bài bạn.',
  '💡 Cách rèn: <b>đặt mục tiêu cụ thể, lập kế hoạch và theo dõi</b> tiến độ của mình.',
];

const TT_STUDY_MEANING = [
  '<b>Ý nghĩa</b> của học tập tự giác, tích cực:',
  '<ul><li>Giúp <b>tiếp thu nhanh, nhớ lâu</b>, tư duy tốt, đạt kết quả cao.</li><li>Hình thành <code>thói quen tự học suốt đời</code> — chìa khoá của thành công.</li><li>Giảm gánh nặng cho cha mẹ, đóng góp nguồn nhân lực có tri thức cho xã hội.</li></ul>',
  '⚠️ Người học thụ động, đối phó thường <b>khó tiến bộ, dễ chán nản</b>, kết quả thấp.',
  '💡 Với bạn chỉ học dồn khi sắp thi, nên khuyên bạn <b>lập kế hoạch học đều</b>, tránh học gấp gáp.',
];

// ── Chủ đề 4: Giữ chữ tín (T11–13) ──
const TT_TRUST_DEF = [
  '<b>Chữ tín</b> là <i>niềm tin của con người với nhau</i>. <b>Giữ chữ tín</b> là <i>coi trọng lòng tin, biết giữ lời hứa và làm đúng cam kết</i>.',
  'Biểu hiện của giữ chữ tín:',
  '<ul><li>Đúng giờ hẹn, làm đúng lời hứa, hoàn thành công việc <code>đúng hạn</code>.</li><li>Nói thật, không hứa hão, không hứa cho qua chuyện.</li><li>Trước khi hứa biết <b>cân nhắc khả năng</b> — chỉ hứa khi chắc chắn làm được.</li></ul>',
  '⚠️ Giữ chữ tín KHÁC <b>cứng nhắc, máy móc</b>: khi có sự cố ngoài ý muốn, người giữ chữ tín biết <i>báo trước và sắp xếp lại</i>.',
  '💡 Ca dao: <i>"Nói lời phải giữ lấy lời / Đừng như con bướm đậu rồi lại bay"</i>.',
];

const TT_TRUST_LIFE = [
  '<b>Giữ chữ tín trong các lĩnh vực</b> của cuộc sống:',
  '<ul><li><b>Học tập</b>: nộp bài đúng hạn, hoàn thành nhiệm vụ được giao, làm tròn phần việc trong nhóm.</li><li><b>Giao tiếp</b>: nói thật, không hứa hão, không nói dối để được lợi.</li><li><b>Quan hệ vay mượn</b>: trả đúng hẹn dù chỉ là khoản nhỏ; làm mất đồ mượn thì <code>báo, xin lỗi và đền/khắc phục</code>.</li></ul>',
  'Khi không thể giữ đúng hẹn vì lí do chính đáng: <b>báo sớm và sắp xếp thời gian khác</b> — đó là giữ chữ tín linh hoạt.',
  '⚠️ Thất hứa mà không báo, đùn việc, bỏ giữa chừng… đều là <i>thiếu chữ tín</i>.',
];

const TT_TRUST_MEANING = [
  '<b>Ý nghĩa</b> của giữ chữ tín:',
  '<ul><li>Người giữ chữ tín được <b>tin cậy, tôn trọng</b>, dễ thành công và có nhiều cơ hội hợp tác.</li><li>Trong kinh doanh, chữ tín là <code>yếu tố sống còn</code> để giữ khách và phát triển bền vững.</li></ul>',
  '⚠️ Người không giữ chữ tín dễ <b>mất lòng tin, mất cơ hội, bị xa lánh</b>.',
  '💡 Chữ tín cần cho <b>mọi người, mọi lứa tuổi, trong mọi lĩnh vực</b> — không riêng người lớn hay doanh nhân.',
];

// ── Chủ đề 5: Bảo tồn di sản văn hoá (T14–15) ──
const TT_HERITAGE_DEF = [
  '<b>Di sản văn hoá</b> là <i>sản phẩm vật chất và tinh thần có giá trị lịch sử, văn hoá, khoa học</i>, được lưu truyền qua các thế hệ.',
  'Di sản văn hoá gồm <b>2 loại</b>:',
  '<ul><li><b>Vật thể</b>: di tích, đình chùa, cổ vật, bảo vật, danh lam — vd <code>Cố đô Huế</code>.</li><li><b>Phi vật thể</b>: lễ hội, làn điệu, phong tục, tri thức dân gian — vd <code>Nhã nhạc cung đình Huế</code>, <code>Đờn ca tài tử Nam Bộ</code>.</li></ul>',
  '⚠️ Phân biệt với <b>di sản thiên nhiên</b> (cảnh quan tự nhiên) — vd <i>Vịnh Hạ Long</i> là di sản thiên nhiên thế giới, không phải di sản văn hoá.',
  '💡 Vai trò: di sản là tài sản tinh thần vô giá, thể hiện <b>bản sắc dân tộc</b>, có giá trị giáo dục và kinh tế (du lịch).',
];

const TT_HERITAGE_KEEP = [
  '<b>Bảo tồn và phát huy di sản</b> là trách nhiệm của mọi người. Học sinh có thể:',
  '<ul><li><b>Tôn trọng, giữ gìn, quảng bá</b> di sản; tìm hiểu và giới thiệu di sản quê mình.</li><li>Khi tham quan: <code>tuân thủ nội quy</code>, không xả rác, không vẽ bậy, không bẻ cây, không trèo tường.</li><li>Tham gia dọn vệ sinh di tích, làm hướng dẫn viên nhỏ dịp lễ hội.</li></ul>',
  '⚠️ <b>Luật Di sản văn hoá</b> nghiêm cấm: lấn chiếm, phá hoại, mua bán, vận chuyển trái phép cổ vật; khắc tên, vẽ bậy lên di tích.',
  '💡 Bảo tồn di sản để <b>giữ gìn bản sắc dân tộc</b> và truyền lại cho thế hệ sau.',
];

// ── Chủ đề 6: Ứng phó với tâm lí căng thẳng (T16–17) ──
const TT_STRESS_DEF = [
  '<b>Căng thẳng</b> (stress) là <i>trạng thái lo lắng, áp lực về tâm lí</i> ảnh hưởng đến thể chất và tinh thần.',
  '<b>Nguyên nhân</b> gây căng thẳng cho học sinh: áp lực học tập, kì vọng quá cao, mâu thuẫn với gia đình, bạn bè.',
  '<b>Biểu hiện</b>: mệt mỏi, cáu gắt, mất ngủ, khó tập trung; nặng hơn là mất hứng thú kéo dài, nghĩ tiêu cực về bản thân.',
  '⚠️ Căng thẳng <b>kéo dài</b> làm giảm sức khoẻ, hiệu quả học tập, dễ dẫn đến trầm cảm. Nhưng căng thẳng <b>nhẹ, ngắn hạn</b> có thể tạo động lực, giúp tập trung.',
];

const TT_STRESS_COPE = [
  '<b>Cách ứng phó</b> tích cực với căng thẳng:',
  '<ul><li><b>Thư giãn</b>: nghe nhạc, tập thể dục, hít thở sâu (kĩ thuật thở 4-7-8 làm dịu nhanh).</li><li><b>Chia sẻ</b> với người tin cậy; khi quá tải thì tạm dừng, nghỉ ngơi, lập kế hoạch lại.</li><li><b>Phòng tránh</b>: cân bằng học — chơi — nghỉ, ngủ đủ giấc, ăn uống lành mạnh.</li></ul>',
  '⚠️ KHÔNG nên: đập phá, gây gổ, ăn vô độ, thức khuya chơi game, cô lập bản thân, uống thuốc bừa bãi.',
  '💡 Khi căng thẳng <b>nặng, kéo dài</b>: cần gặp <code>chuyên gia tâm lí</code> hoặc người lớn tin cậy — không tự xử lí một mình. Bạn bè có dấu hiệu căng thẳng cũng cần được lắng nghe và khuyên tìm trợ giúp.',
];

// ── Chủ đề 7: Phòng, chống bạo lực học đường (T19–22) ──
const TT_SCHOOLV_DEF = [
  '<b>Bạo lực học đường</b> là <i>hành vi hành hạ, ngược đãi, đánh đập; xâm hại thân thể, sức khoẻ; lăng mạ, xúc phạm danh dự, nhân phẩm</i>… đối với người học, xảy ra trong cơ sở giáo dục.',
  'Các hình thức phổ biến:',
  '<ul><li><b>Thể chất</b>: đánh đập, xô đẩy.</li><li><b>Tinh thần</b>: lăng mạ, đe doạ, <code>tẩy chay, cô lập</code> (bạo lực tinh thần, gây tổn thương nghiêm trọng).</li><li><b>Bạo lực mạng</b>: lăng mạ, đe doạ qua mạng xã hội, tin nhắn.</li></ul>',
  '⚠️ <b>Nguyên nhân</b>: thiếu kĩ năng kiểm soát cảm xúc, ảnh hưởng tiêu cực từ môi trường, thiếu giáo dục đạo đức.',
];

const TT_SCHOOLV_RESULT = [
  '<b>Hậu quả</b> của bạo lực học đường:',
  '<ul><li><b>Nạn nhân</b>: tổn hại thể chất, sang chấn tâm lí, học tập giảm sút; nặng có thể <code>trầm cảm, tự tử</code>.</li><li><b>Người gây bạo lực</b>: bị kỉ luật, vi phạm pháp luật, hỏng tương lai.</li><li><b>Gia đình, nhà trường</b>: ảnh hưởng danh dự và môi trường học tập.</li></ul>',
  '⚠️ Người đứng xem, <b>quay clip đăng mạng</b> cũng gián tiếp tiếp tay cho bạo lực và có thể bị xử lí.',
  '💡 Bạo lực học đường KHÔNG phải "chuyện trẻ con", "trò đùa" — đó là vấn đề nghiêm trọng cần ngăn chặn.',
];

const TT_SCHOOLV_PREVENT = [
  '<b>Cách ứng phó và phòng tránh</b> bạo lực học đường:',
  '<ul><li>Khi bị bắt nạt: bình tĩnh tránh đi, <b>báo thầy cô và người thân ngay</b>, không đánh trả, không im lặng chịu đựng.</li><li>Khi chứng kiến: bênh vực và báo người lớn — không quay clip, không cổ vũ, không tham gia.</li><li>Khi bị đe doạ trên mạng: <code>lưu bằng chứng</code>, chặn người đe doạ, báo người lớn.</li><li>Khi tức giận: hít sâu, đi ra ngoài, không hành động vội.</li></ul>',
  '💡 Phòng tránh: kết bạn lành mạnh, rèn kĩ năng giao tiếp và kiểm soát cảm xúc, dám lên tiếng chống bạo lực.',
];

const TT_SCHOOLV_DUTY = [
  '<b>Trách nhiệm</b> chống bạo lực học đường là của mọi người:',
  '<ul><li><b>Học sinh</b>: không tham gia, không cổ vũ, dám lên tiếng; vô tình tham gia thì dừng ngay, xin lỗi, sửa sai.</li><li><b>Nhà trường</b>: giáo dục, phát hiện và xử lí các vụ việc.</li><li><b>Gia đình</b>: quan tâm, lắng nghe, giáo dục con và phối hợp với nhà trường.</li></ul>',
  '📞 Số điện thoại cần nhớ: <b>111</b> — Tổng đài quốc gia bảo vệ trẻ em; <code>113</code> — cảnh sát, <code>114</code> — cứu hoả, <code>115</code> — cấp cứu y tế.',
];

// ── Chủ đề 8: Quản lí tiền (T23–25) ──
const TT_MONEY_DEF = [
  '<b>Quản lí tiền</b> là <i>biết sử dụng tiền một cách hợp lí, có kế hoạch</i> nhằm đạt được mục tiêu của bản thân.',
  '<b>Nguyên tắc quản lí tiền</b> cơ bản:',
  '<ul><li>Phân biệt <code>CẦN</code> (thiết yếu để sống/học) và <code>MUỐN</code> (sở thích thêm) — không phân biệt theo giá tiền.</li><li>Ghi chép thu — chi; chi tiêu có kế hoạch, tiết kiệm.</li></ul>',
  '💡 Học sinh cần học quản lí tiền để biết tiết kiệm, dùng tiền hợp lí, không lãng phí. Tiền tiêu vặt của học sinh chủ yếu từ <b>bố mẹ cho, tiền thưởng, tiết kiệm lì xì</b>.',
];

const TT_MONEY_HOWTO = [
  '<b>Cách quản lí tiền hiệu quả</b>:',
  '<ul><li>Khi nhận tiền: <b>chia thành các phần</b> — tiết kiệm, chi tiêu cần thiết, dự phòng.</li><li>Một quy tắc đơn giản: <code>50% chi cần — 30% tiết kiệm — 20% chia sẻ/dự phòng</code>.</li><li>Trước khi mua: tự hỏi <i>"thật sự cần không? có giá tốt hơn không?"</i>.</li><li>Tiết kiệm bằng ống tiết kiệm, ghi chép, đặt mục tiêu cụ thể.</li></ul>',
  'Khi nhận khoản tiền lớn (mừng tuổi): nên <b>bàn với bố mẹ</b> để dùng đúng (mua sách, tiết kiệm).',
  '💡 Học sinh có thể kiếm thêm bằng việc phù hợp tuổi: giúp việc nhà, làm sản phẩm thủ công nhỏ — KHÔNG bỏ học đi làm, vay nợ hay đánh bạc.',
];

const TT_MONEY_MEANING = [
  '<b>Ý nghĩa</b> của quản lí tiền:',
  '<ul><li>Giúp <b>chủ động trong cuộc sống</b>, dễ đạt được mục tiêu, có khoản dự phòng khi cần.</li><li>Rèn tính tự lập, biết quý trọng sức lao động.</li></ul>',
  '⚠️ Người không biết quản lí tiền thường <b>hay thiếu hụt, mắc nợ</b>. Quản lí tiền KHÁC <i>keo kiệt, ki bo</i> — khi cần (mua sách, giúp người khó) vẫn chi hợp lí.',
  '💡 Để rèn luyện: bắt đầu từ việc <b>ghi chép thu — chi tiền tiêu vặt</b> ngay từ bây giờ, không đợi lớn.',
];

// ── Chủ đề 9: Phòng, chống tệ nạn xã hội (T26–29) ──
const TT_SOCEVIL_DEF = [
  '<b>Tệ nạn xã hội</b> là <i>hành vi sai lệch chuẩn mực xã hội, vi phạm đạo đức và pháp luật</i>, gây hậu quả xấu cho cá nhân, gia đình và xã hội.',
  'Một số tệ nạn nguy hiểm: <b>ma tuý, cờ bạc, mại dâm, mê tín dị đoan</b>, game/mạng bệnh lí, bạo lực.',
  '<b>Nguyên nhân</b> học sinh sa vào tệ nạn: thiếu hiểu biết, đua đòi, bạn bè rủ rê, thiếu sự quan tâm của gia đình.',
  '⚠️ Phân biệt: <b>mê tín dị đoan</b> (tin nhảm vào điều phi lí, gây hậu quả xấu) là tệ nạn cần bài trừ — KHÁC tín ngưỡng, tôn giáo lành mạnh.',
];

const TT_SOCEVIL_HARM = [
  '<b>Tác hại</b> của tệ nạn xã hội:',
  '<ul><li><b>Cá nhân</b>: huỷ hoại sức khoẻ, đạo đức, học tập, tương lai.</li><li><b>Gia đình</b>: tan vỡ, kinh tế kiệt quệ, danh dự bị tổn hại.</li><li><b>Xã hội</b>: mất trật tự, gia tăng tội phạm, kìm hãm phát triển.</li></ul>',
  '⚠️ <b>Ma tuý</b> đặc biệt nguy hiểm: gây nghiện, huỷ hoại thần kinh, lây HIV/AIDS qua dùng chung kim tiêm.',
  '💡 Với học sinh, tác hại lớn nhất là <b>huỷ hoại tương lai, sa sút học tập và đạo đức</b>.',
];

const TT_SOCEVIL_PREVENT = [
  '<b>Cách phòng, chống</b> tệ nạn xã hội:',
  '<ul><li>Bị rủ thử ma tuý "cho biết": <b>từ chối dứt khoát và rời đi ngay</b> — không thử dù một lần.</li><li>Chọn bạn tốt, dùng thời gian rảnh có ích, lắng nghe gia đình.</li><li>Tránh nghiện game/mạng: <code>đặt giới hạn thời gian</code>, có sở thích lành mạnh khác.</li><li>Gặp người lạ rủ "việc dễ tiền nhiều": cảnh giác, hỏi ý kiến gia đình.</li></ul>',
  '💡 <b>Kĩ năng từ chối khéo</b>: nói thẳng "không", đưa ra lí do, rút khỏi tình huống và đi. Phát hiện bạn dùng ma tuý thì báo gia đình, thầy cô để có biện pháp giúp.',
];

const TT_SOCEVIL_LAW = [
  '<b>Pháp luật về phòng, chống tệ nạn xã hội</b>:',
  '<ul><li><b>Sử dụng, mua bán ma tuý</b> là vi phạm pháp luật, có thể bị xử lí hình sự.</li><li><b>Đánh bạc</b> dưới mọi hình thức là vi phạm pháp luật.</li><li>Người <b>chưa đủ 18 tuổi</b> vi phạm vẫn bị xử lí theo Luật Trẻ em và pháp luật liên quan (phù hợp lứa tuổi).</li></ul>',
  '<b>Trách nhiệm công dân</b>: tự giác chấp hành, tố giác hành vi vi phạm — không tham gia, không bao che.',
  '📞 Khi cần: <code>111</code> (Tổng đài bảo vệ trẻ em), <code>113</code> (an ninh, tội phạm).',
];

// ── Chủ đề 10: Quyền và nghĩa vụ của trẻ em (T30–34) ──
const TT_KID_RIGHTS = [
  'Theo <b>Luật Trẻ em 2016</b>, <i>trẻ em là người dưới 16 tuổi</i>.',
  'Theo <b>Công ước Liên hợp quốc về quyền trẻ em</b>, trẻ em có <b>4 nhóm quyền</b>:',
  '<ul><li><b>Quyền sống còn</b>: khai sinh, được sống, chăm sóc sức khoẻ, dinh dưỡng.</li><li><b>Quyền được bảo vệ</b>: khỏi bạo lực, xâm hại, bóc lột, ma tuý.</li><li><b>Quyền được phát triển</b>: học tập, vui chơi, hoạt động văn hoá, thể thao.</li><li><b>Quyền được tham gia</b>: <code>nêu ý kiến</code> về các vấn đề liên quan đến mình.</li></ul>',
  '💡 Việt Nam là nước thứ 2 trên thế giới phê chuẩn Công ước về quyền trẻ em (năm 1990).',
];

const TT_KID_DUTY = [
  '<b>Bổn phận (nghĩa vụ) của trẻ em</b> — gắn liền với quyền:',
  '<ul><li><b>Với gia đình</b>: kính trọng, lễ phép, hiếu thảo, giúp đỡ ông bà cha mẹ.</li><li><b>Với nhà trường</b>: chăm chỉ học tập, tuân thủ nội quy, kính trọng thầy cô.</li><li><b>Với cộng đồng</b>: tôn trọng pháp luật, bảo vệ môi trường, giúp đỡ người khác.</li><li><b>Với bản thân</b>: rèn luyện đạo đức, sức khoẻ, học tập.</li></ul>',
  '💡 <b>Quyền và nghĩa vụ</b> là hai mặt thống nhất, gắn liền nhau — hưởng quyền đi đôi với làm tròn bổn phận.',
];

const TT_KID_PROTECT = [
  '<b>Bảo vệ quyền trẻ em</b> là trách nhiệm của gia đình, nhà trường, xã hội và Nhà nước.',
  'Khi bị xâm hại hoặc thấy bạn bị bạo hành: <b>báo người tin cậy</b> (thầy cô, người thân), gọi <code>Tổng đài 111</code> — KHÔNG im lặng, không bỏ nhà đi, không trả thù.',
  '⚠️ Hành vi <b>vi phạm quyền trẻ em</b>: bắt trẻ làm việc nặng, ép bỏ học, đánh đập (kể cả bố mẹ đánh con để "dạy dỗ" cũng bị <b>Luật Trẻ em 2016 nghiêm cấm</b>).',
  '💡 <b>Luật Trẻ em 2016</b> là cơ sở pháp lí quy định quyền, bảo vệ và chăm sóc trẻ em ở Việt Nam.',
];

const TT_KID_SELF = [
  '<b>Trách nhiệm của học sinh</b> với quyền của mình và của người khác:',
  '<ul><li><b>Thực hiện đúng quyền</b> và tôn trọng quyền của bạn — không lạm dụng quyền, không đòi hỏi quá mức.</li><li>Khi quyền bị vi phạm: bày tỏ ý kiến với người tin cậy, nhờ giúp đỡ — không bạo lực, không trả thù.</li><li>Em có <b>quyền tham gia ý kiến</b> trong gia đình, lớp học (cả nam và nữ).</li></ul>',
  '⚠️ <b>An toàn trên mạng</b>: bảo vệ thông tin cá nhân, không đăng địa chỉ nhà, không kết bạn/gặp riêng người lạ, nói với bố mẹ khi bị người lạ rủ gặp.',
  '💡 Lời khuyên: học kĩ năng sống, không giấu giếm khi gặp khó, tin cậy người thân.',
];

// ── Ôn tập (T18, T34, T35) ──
const TT_REVIEW = [
  '<b>Ôn tập tổng hợp</b> — hệ thống lại các phẩm chất và kĩ năng đã học của môn GDCD 7:',
  '<ul><li><b>Truyền thống quê hương</b>, <b>quan tâm — chia sẻ</b>, <b>học tập tự giác</b>, <b>giữ chữ tín</b>.</li><li><b>Bảo tồn di sản</b>, <b>ứng phó căng thẳng</b>, <b>phòng chống bạo lực học đường</b>.</li><li><b>Quản lí tiền</b>, <b>phòng chống tệ nạn xã hội</b>, <b>quyền và nghĩa vụ của trẻ em</b>.</li></ul>',
  '📞 Số cần nhớ: <b>111</b> (bảo vệ trẻ em), <code>113</code> (an ninh), <code>114</code> (cứu hoả), <code>115</code> (cấp cứu).',
  '💡 Mục tiêu chung của môn GDCD: trở thành <b>công dân tốt</b> — yêu nước, tự giác, có chữ tín, biết quản lí bản thân và tôn trọng pháp luật.',
];

export const S7GDCD_WEEKS = [
  // ===== Chủ đề 1: Tự hào về truyền thống quê hương (T1–4) =====
  M(1, 'Truyền thống quê hương là gì?', [
    Q('Truyền thống quê hương là?', ['Những đặc sản mới', 'Đường phố hiện đại', 'Những toà nhà mới xây', 'Những giá trị tốt đẹp về vật chất và tinh thần được hình thành, lưu truyền qua nhiều thế hệ ở một địa phương'], 3, 'Truyền thống quê hương là di sản vật chất — tinh thần lưu truyền nhiều đời.', TT_TRADITION_DEF, ['Sai — đặc sản mới chưa qua nhiều thế hệ thì chưa thành truyền thống.', 'Sai — đường phố hiện đại là cơ sở hạ tầng, không phải giá trị lưu truyền.', 'Sai — toà nhà mới xây không mang giá trị được hình thành qua nhiều đời.', 'Đúng — truyền thống là giá trị vật chất và tinh thần tốt đẹp lưu truyền qua nhiều thế hệ.']),
    Q('Đâu là truyền thống quê hương tốt đẹp?', ['Ăn nhậu say xỉn', 'Đốt vàng mã quá mức', 'Yêu nước, lao động cần cù, hiếu học, đoàn kết', 'Mê tín dị đoan'], 2, 'Yêu nước, hiếu học, cần cù... là truyền thống tốt đẹp.', TT_TRADITION_DEF, ['Sai — ăn nhậu say xỉn là thói xấu, không phải truyền thống tốt đẹp.', 'Sai — đốt vàng mã quá mức là hủ tục lãng phí cần bài trừ.', 'Đúng — yêu nước, cần cù, hiếu học, đoàn kết là truyền thống tốt đẹp.', 'Sai — mê tín dị đoan là hủ tục, không phải giá trị tốt đẹp.']),
    Q('Đâu KHÔNG phải truyền thống quê hương tốt đẹp?', ['Hủ tục tảo hôn, mê tín', 'Lễ hội đình làng', 'Nghề thủ công truyền thống', 'Đạo lí uống nước nhớ nguồn'], 0, 'Tảo hôn, mê tín là hủ tục cần xoá bỏ.', TT_TRADITION_DEF, ['Đúng — tảo hôn, mê tín là hủ tục lạc hậu cần xoá bỏ, không phải truyền thống tốt đẹp.', 'Sai — lễ hội đình làng là nét đẹp văn hoá truyền thống.', 'Sai — nghề thủ công truyền thống là di sản đáng giữ gìn.', 'Sai — uống nước nhớ nguồn là đạo lí truyền thống tốt đẹp.']),
    Q('Câu tục ngữ nào nói về truyền thống quê hương?', ['Mỗi cây mỗi hoa', 'Đèn nhà ai nấy rạng', 'Cha chung không ai khóc', 'Uống nước nhớ nguồn'], 3, '"Uống nước nhớ nguồn" thể hiện đạo lí truyền thống.', TT_TRADITION_DEF, ['Sai — "Mỗi cây mỗi hoa" nói về sự khác biệt, không phải truyền thống quê hương.', 'Sai — "Đèn nhà ai nấy rạng" nói về sự ai lo phận nấy.', 'Sai — "Cha chung không ai khóc" phê phán thói vô trách nhiệm chung.', 'Đúng — "Uống nước nhớ nguồn" thể hiện đạo lí biết ơn cội nguồn.']),
    Q('Vì sao cần tìm hiểu truyền thống quê hương?', ['Để có quà', 'Để đi du lịch', 'Để hiểu cội nguồn, có trách nhiệm giữ gìn và phát huy', 'Để khoe khoang'], 2, 'Hiểu cội nguồn để giữ gìn và phát huy.', TT_TRADITION_DEF, ['Sai — tìm hiểu truyền thống không phải để có quà.', 'Sai — du lịch chỉ là lợi ích phụ, không phải mục đích chính.', 'Đúng — hiểu cội nguồn giúp ta có trách nhiệm giữ gìn và phát huy.', 'Sai — khoe khoang là động cơ lệch lạc, không phải mục đích đúng.']),
    Q('Lễ hội Đền Hùng (Phú Thọ) là biểu hiện truyền thống nào?', ['Trọng thương', 'Cờ bạc', 'Uống nước nhớ nguồn, hướng về cội nguồn dân tộc', 'Đua đòi'], 2, 'Lễ hội Đền Hùng thể hiện đạo lí uống nước nhớ nguồn.', TT_TRADITION_DEF, ['Sai — lễ hội Đền Hùng không liên quan đến trọng thương.', 'Sai — cờ bạc là tệ nạn, không phải ý nghĩa của lễ hội.', 'Đúng — lễ hội Đền Hùng thể hiện đạo lí uống nước nhớ nguồn, hướng về cội nguồn.', 'Sai — đua đòi là thói xấu, không phải biểu hiện truyền thống.']),
    Q('Truyền thống quê hương có thể được lưu giữ qua?', ['Đốt phá hết tài liệu cũ', 'Câu chuyện, ca dao, lễ hội, nghề thủ công, di tích', 'Cấm nói về quá khứ', 'Sao chép văn hoá nước khác'], 1, 'Truyền thống được lưu giữ qua nhiều hình thức văn hoá vật thể và phi vật thể.', TT_TRADITION_DEF, ['Sai — đốt phá tài liệu cũ là phá hoại, làm mất truyền thống.', 'Đúng — câu chuyện, ca dao, lễ hội, nghề thủ công, di tích đều lưu giữ truyền thống.', 'Sai — cấm nói về quá khứ làm truyền thống bị quên lãng.', 'Sai — sao chép văn hoá nước khác không phải cách lưu giữ truyền thống quê mình.']),
  ]),

  M(2, 'Biểu hiện của tự hào truyền thống quê hương', [
    Q('Bạn nào THỂ HIỆN tự hào quê hương?', ['Lan giới thiệu lễ hội quê mình với bạn nước ngoài', 'Bình không bao giờ về quê', 'Tú chê quê mình nghèo', 'An cấm bạn nhắc đến quê'], 0, 'Giới thiệu lễ hội quê là tự hào quê hương.', TT_TRADITION_PROUD, ['Đúng — Lan giới thiệu lễ hội quê mình là biểu hiện tự hào quê hương.', 'Sai — không bao giờ về quê là biểu hiện thờ ơ với quê hương.', 'Sai — chê quê mình nghèo là thiếu lòng tự hào quê hương.', 'Sai — cấm nhắc đến quê là thái độ tự ti, ngược với tự hào.']),
    Q('Hành vi nào giữ gìn truyền thống quê?', ['Phá đình làng', 'Đốt phá lễ hội', 'Tham gia hội làng, học nghề truyền thống', 'Vứt rác di tích'], 2, 'Tham gia hội làng và học nghề là giữ gìn truyền thống.', TT_TRADITION_PROUD, ['Sai — phá đình làng là phá hoại di sản truyền thống.', 'Sai — đốt phá lễ hội là hành vi phá hoại văn hoá.', 'Đúng — tham gia hội làng, học nghề truyền thống là giữ gìn truyền thống.', 'Sai — vứt rác di tích là làm bẩn, xâm hại nơi lưu giữ truyền thống.']),
    Q('Hành vi nào LÀM XẤU truyền thống quê?', ['Sống đạo đức', 'Giúp đỡ hàng xóm', 'Buôn lậu, gian dối làm xấu danh quê', 'Học giỏi'], 2, 'Hành vi xấu của một người ảnh hưởng danh dự quê hương.', TT_TRADITION_PROUD, ['Sai — sống đạo đức làm rạng danh quê hương.', 'Sai — giúp đỡ hàng xóm là nét đẹp, không làm xấu quê.', 'Đúng — buôn lậu, gian dối làm xấu danh dự quê hương.', 'Sai — học giỏi là điều đáng tự hào cho quê.']),
    Q('Em là HS lớp 7, em có thể làm gì cho quê hương?', ['Học giỏi, tham gia hoạt động cộng đồng phù hợp tuổi', 'Đợi lớn mới làm', 'Mặc kệ vì còn nhỏ', 'Chỉ lo bản thân'], 0, 'HS có thể đóng góp bằng học tập và hoạt động cộng đồng.', TT_TRADITION_PROUD, ['Đúng — học giỏi và tham gia hoạt động cộng đồng phù hợp tuổi là đóng góp cho quê.', 'Sai — đợi lớn mới làm là thoái thác trách nhiệm có thể làm ngay.', 'Sai — mặc kệ vì còn nhỏ là thái độ vô trách nhiệm.', 'Sai — chỉ lo bản thân là ích kỉ, không đóng góp cho quê hương.']),
    Q('Quê em có nghề gốm. Em nên?', ['Bỏ quê đi', 'Tìm hiểu lịch sử, công nghệ và quảng bá', 'Coi thường nghề gốm', 'Cấm bạn nói về gốm'], 1, 'Tìm hiểu và quảng bá nghề quê là cách phát huy.', TT_TRADITION_PROUD, ['Sai — bỏ quê đi không phải cách giữ gìn nghề truyền thống.', 'Đúng — tìm hiểu lịch sử, công nghệ và quảng bá là cách phát huy nghề quê.', 'Sai — coi thường nghề gốm là thiếu tự hào với nghề quê.', 'Sai — cấm bạn nói về gốm là thái độ tự ti, ngược với phát huy.']),
    Q('Bạn nước ngoài hỏi về quê em, em nên?', ['Né tránh', 'Bịa thông tin cho "oách"', 'Tự tin giới thiệu nét đẹp văn hoá, lịch sử quê mình', 'Chê quê mình kém'], 2, 'Giới thiệu trung thực và tự hào là biểu hiện tốt.', TT_TRADITION_PROUD, ['Sai — né tránh thể hiện sự tự ti, thiếu tự hào.', 'Sai — bịa thông tin là gian dối, không trung thực.', 'Đúng — tự tin giới thiệu nét đẹp văn hoá, lịch sử quê mình là biểu hiện tự hào.', 'Sai — chê quê mình kém là thiếu lòng tự hào quê hương.']),
    Q('Hành vi nào KHÔNG phải biểu hiện tự hào truyền thống quê?', ['Mặc áo dài truyền thống dịp lễ', 'Học hát dân ca', 'Chê bai đặc sản quê khi đi xa', 'Tham gia hội làng'], 2, 'Chê bai quê hương trái ngược với tự hào truyền thống.', TT_TRADITION_PROUD, ['Sai — mặc áo dài truyền thống dịp lễ là biểu hiện tự hào.', 'Sai — học hát dân ca là giữ gìn truyền thống.', 'Đúng — chê bai đặc sản quê khi đi xa trái ngược với tự hào truyền thống.', 'Sai — tham gia hội làng là biểu hiện tự hào quê hương.']),
  ]),

  M(3, 'Ý nghĩa của tự hào truyền thống quê hương', [
    Q('Tự hào truyền thống quê hương giúp em?', ['Trở nên kiêu ngạo', 'Coi thường nơi khác', 'Sống xa rời quê', 'Có động lực sống tốt, có trách nhiệm và bản sắc'], 3, 'Tự hào đúng cách giúp ta có bản sắc và trách nhiệm.', TT_TRADITION_MEANING, ['Sai — kiêu ngạo là tự cao, khác với tự hào đúng cách.', 'Sai — coi thường nơi khác là biểu hiện của tự cao, không phải tự hào.', 'Sai — tự hào quê hương không khiến ta xa rời quê.', 'Đúng — tự hào đúng cách giúp ta có động lực sống tốt, có trách nhiệm và bản sắc.']),
    Q('Người tự hào quê hương sẽ?', ['Phá hoại quê hương', 'Chê quê mình kém', 'Bỏ quê đi mãi', 'Đóng góp xây dựng quê hương khi có điều kiện'], 3, 'Đóng góp xây dựng quê là biểu hiện tự hào thật sự.', TT_TRADITION_MEANING, ['Sai — phá hoại quê hương trái ngược hoàn toàn với tự hào.', 'Sai — chê quê mình kém là thiếu lòng tự hào.', 'Sai — bỏ quê đi mãi không phải biểu hiện của người tự hào quê.', 'Đúng — đóng góp xây dựng quê hương khi có điều kiện là biểu hiện tự hào thật sự.']),
    Q('Khi đi xa, người tự hào quê hương sẽ?', ['Giới thiệu quê mình một cách trung thực, lịch sự', 'Giấu giếm gốc gác', 'Nói xấu quê', 'Chê bai quê'], 0, 'Giới thiệu quê hương đầy tự hào là biểu hiện đẹp.', TT_TRADITION_MEANING, ['Đúng — giới thiệu quê mình trung thực, lịch sự là biểu hiện tự hào đẹp.', 'Sai — giấu giếm gốc gác thể hiện sự tự ti.', 'Sai — nói xấu quê là thiếu lòng tự hào quê hương.', 'Sai — chê bai quê trái ngược với tự hào.']),
    Q('Khi quê hương gặp thiên tai, em nên?', ['Vận động ủng hộ, giúp đỡ trong khả năng', 'Đăng tin xấu', 'Vui mừng', 'Mặc kệ'], 0, 'Đoàn kết khi quê gặp khó là tình yêu quê hương.', TT_TRADITION_MEANING, ['Đúng — vận động ủng hộ, giúp đỡ trong khả năng là tình yêu quê hương.', 'Sai — đăng tin xấu làm tổn hại quê khi quê đang khó khăn.', 'Sai — vui mừng trước tai ương quê là vô cảm, đáng trách.', 'Sai — mặc kệ là thờ ơ, thiếu tình yêu quê hương.']),
    Q('Tự hào truyền thống quê hương khác với tự cao ở điểm?', ['Cùng nghĩa', 'Tự hào trân trọng giá trị thật; tự cao là phô trương, coi thường nơi khác', 'Không khác', 'Cả hai đều xấu'], 1, 'Tự hào đi với khiêm tốn, khác với tự cao tự đại.', TT_TRADITION_MEANING, ['Sai — tự hào và tự cao không cùng nghĩa.', 'Đúng — tự hào trân trọng giá trị thật, còn tự cao là phô trương và coi thường nơi khác.', 'Sai — hai khái niệm này khác nhau rõ rệt.', 'Sai — tự hào là phẩm chất tốt, không phải xấu như tự cao.']),
    Q('Bạn từ quê nghèo lên thành phố học. Em nên?', ['Trêu chọc giọng quê', 'Cô lập bạn', 'Chế giễu nơi bạn ở', 'Tôn trọng, lắng nghe và kết bạn'], 3, 'Mỗi quê hương đều đáng tự hào; tôn trọng bạn là tôn trọng truyền thống của bạn.', TT_TRADITION_MEANING, ['Sai — trêu chọc giọng quê là thiếu tôn trọng, gây tổn thương.', 'Sai — cô lập bạn là hành vi bạo lực tinh thần.', 'Sai — chế giễu nơi bạn ở là thiếu tôn trọng quê hương của bạn.', 'Đúng — tôn trọng, lắng nghe và kết bạn vì mỗi quê hương đều đáng tự hào.']),
  ]),

  M(4, 'Trách nhiệm gìn giữ truyền thống quê hương', [
    Q('Trách nhiệm chính của HS với truyền thống quê?', ['Đợi tuổi 18', 'Học tập, rèn luyện và tham gia hoạt động phù hợp', 'Mặc kệ người lớn', 'Chỉ chờ thưởng'], 1, 'HS có thể đóng góp ngay từ bây giờ.', TT_TRADITION_KEEP, ['Sai — đợi tuổi 18 là thoái thác trách nhiệm có thể làm ngay.', 'Đúng — học tập, rèn luyện và tham gia hoạt động phù hợp là trách nhiệm của HS.', 'Sai — mặc kệ người lớn là thái độ vô trách nhiệm.', 'Sai — chỉ chờ thưởng là động cơ lệch lạc, không phải trách nhiệm.']),
    Q('Trường tổ chức tìm hiểu di tích quê, em nên?', ['Quậy phá', 'Trốn không đi', 'Tích cực tham gia, ghi chép, chia sẻ', 'Đi cho có'], 2, 'Tham gia tích cực là cách rèn lòng tự hào.', TT_TRADITION_KEEP, ['Sai — quậy phá làm ảnh hưởng hoạt động chung.', 'Sai — trốn không đi là thoái thác cơ hội tìm hiểu truyền thống.', 'Đúng — tích cực tham gia, ghi chép, chia sẻ là cách rèn lòng tự hào.', 'Sai — đi cho có là thái độ đối phó, thiếu nghiêm túc.']),
    Q('Em phát hiện bạn vẽ bậy lên di tích, em nên?', ['Mặc kệ', 'Ngăn lại, báo người có thẩm quyền', 'Cùng vẽ', 'Đăng lên mạng cười cợt'], 1, 'Bảo vệ di tích là trách nhiệm của mỗi người.', TT_TRADITION_KEEP, ['Sai — mặc kệ là gián tiếp dung túng cho việc phá hoại di tích.', 'Đúng — ngăn lại và báo người có thẩm quyền là bảo vệ di tích.', 'Sai — cùng vẽ là tham gia phá hoại di tích.', 'Sai — đăng lên mạng cười cợt là cổ vũ hành vi xấu.']),
    Q('Cách phát huy truyền thống quê hương hiệu quả là?', ['Kết hợp giữ gìn cái cũ và đổi mới sáng tạo', 'Bỏ hết cái cũ', 'Giữ nguyên không đổi', 'Sao chép quê khác'], 0, 'Giữ gìn cốt lõi + đổi mới sáng tạo là cách phát huy.', TT_TRADITION_KEEP, ['Đúng — kết hợp giữ gìn cái cũ và đổi mới sáng tạo là cách phát huy hiệu quả.', 'Sai — bỏ hết cái cũ là đánh mất cốt lõi truyền thống.', 'Sai — giữ nguyên không đổi khiến truyền thống khó thích nghi thời đại.', 'Sai — sao chép quê khác làm mất bản sắc quê mình.']),
    Q('Quảng bá đặc sản quê hương trên mạng xã hội là?', ['Khoe khoang', 'Lãng phí', 'Cách tốt để phát huy truyền thống trong thời đại số', 'Vi phạm pháp luật'], 2, 'Sử dụng mạng xã hội để quảng bá là cách hiệu quả thời đại số.', TT_TRADITION_KEEP, ['Sai — quảng bá đặc sản quê không phải khoe khoang.', 'Sai — đây là việc có ích, không phải lãng phí.', 'Đúng — quảng bá đặc sản trên mạng xã hội là cách phát huy truyền thống thời đại số.', 'Sai — quảng bá hợp pháp không vi phạm pháp luật.']),
    Q('Trách nhiệm với truyền thống quê hương đòi hỏi HS?', ['Đợi người lớn làm', 'Trốn tránh', 'Hành động thực tế trong khả năng và hiểu biết của mình', 'Chỉ học thuộc lý thuyết'], 2, 'Trách nhiệm thể hiện qua hành động cụ thể phù hợp tuổi.', TT_TRADITION_KEEP, ['Sai — đợi người lớn làm là né tránh trách nhiệm của mình.', 'Sai — trốn tránh là thiếu trách nhiệm.', 'Đúng — hành động thực tế trong khả năng và hiểu biết của mình là trách nhiệm đúng.', 'Sai — chỉ học thuộc lý thuyết mà không hành động là chưa đủ.']),
  ]),

  // ===== Chủ đề 2: Quan tâm — chăm sóc người thân (T5–7) =====
  M(5, 'Quan tâm, cảm thông, chia sẻ với người thân', [
    Q('Quan tâm, cảm thông là?', ['Soi mói', 'Tò mò chuyện riêng', 'Để ý, hỏi han, đặt mình vào vị trí người khác để hiểu cảm xúc', 'Bao biện'], 2, 'Quan tâm và cảm thông là hiểu và sẻ chia.', TT_CARE_DEF, ['Sai — soi mói là xâm phạm riêng tư, khác với quan tâm.', 'Sai — tò mò chuyện riêng không phải quan tâm chân thành.', 'Đúng — để ý, hỏi han, đặt mình vào vị trí người khác để hiểu cảm xúc là quan tâm, cảm thông.', 'Sai — bao biện là che giấu lỗi, không liên quan đến quan tâm.']),
    Q('Biểu hiện quan tâm người thân?', ['Hỏi thăm sức khoẻ, giúp việc nhà, lắng nghe', 'Đòi hỏi bố mẹ', 'Cãi lại ông bà', 'Chỉ ngồi xem điện thoại'], 0, 'Hỏi thăm, giúp việc, lắng nghe là quan tâm.', TT_CARE_DEF, ['Đúng — hỏi thăm sức khoẻ, giúp việc nhà, lắng nghe là biểu hiện quan tâm.', 'Sai — đòi hỏi bố mẹ là ích kỉ, không phải quan tâm.', 'Sai — cãi lại ông bà là thiếu lễ phép, ngược với quan tâm.', 'Sai — chỉ ngồi xem điện thoại là thờ ơ với người thân.']),
    Q('Em thấy mẹ về mệt, em nên?', ['Mặc kệ', 'Hỏi thăm, lấy nước, đỡ đần việc nhà', 'Đòi tiền tiêu vặt', 'Bật nhạc to'], 1, 'Hỏi thăm và đỡ đần là quan tâm mẹ.', TT_CARE_DEF, ['Sai — mặc kệ là thờ ơ khi mẹ đang mệt.', 'Đúng — hỏi thăm, lấy nước, đỡ đần việc nhà là quan tâm mẹ.', 'Sai — đòi tiền tiêu vặt khi mẹ mệt là ích kỉ.', 'Sai — bật nhạc to làm mẹ khó nghỉ ngơi, thiếu ý tứ.']),
    Q('Ông bà ốm, em nên?', ['Mặc kệ', 'Đòi ăn', 'Cãi lại', 'Thăm hỏi, chăm sóc, làm việc nhà giúp'], 3, 'Chăm sóc ông bà là biểu hiện hiếu thảo.', TT_CARE_DEF, ['Sai — mặc kệ ông bà ốm là vô tâm, bất hiếu.', 'Sai — đòi ăn khi ông bà ốm là ích kỉ.', 'Sai — cãi lại là thiếu lễ phép, ngược với hiếu thảo.', 'Đúng — thăm hỏi, chăm sóc, làm việc nhà giúp là biểu hiện hiếu thảo.']),
    Q('Quan tâm chia sẻ KHÔNG bao gồm?', ['Hỏi thăm sức khoẻ', 'Soi mói chuyện riêng tư', 'Lắng nghe khi gặp khó', 'Giúp đỡ việc nhà'], 1, 'Soi mói khác với quan tâm.', TT_CARE_DEF, ['Sai — hỏi thăm sức khoẻ là biểu hiện quan tâm.', 'Đúng — soi mói chuyện riêng tư là xâm phạm, không phải quan tâm chia sẻ.', 'Sai — lắng nghe khi gặp khó là quan tâm chia sẻ.', 'Sai — giúp đỡ việc nhà là biểu hiện quan tâm.']),
    Q('Em chứng kiến em nhỏ trong nhà khóc, em nên?', ['Quát mắng', 'Mặc kệ', 'Hỏi nhẹ nhàng, an ủi và tìm hiểu lý do', 'Đổ lỗi'], 2, 'An ủi và lắng nghe là biểu hiện quan tâm.', TT_CARE_DEF, ['Sai — quát mắng làm em nhỏ sợ hãi thêm.', 'Sai — mặc kệ là thờ ơ với em nhỏ.', 'Đúng — hỏi nhẹ nhàng, an ủi và tìm hiểu lý do là biểu hiện quan tâm.', 'Sai — đổ lỗi không giúp giải quyết và làm em tổn thương.']),
    Q('Khi bố mẹ cãi nhau, em nên?', ['Đứng về một bên để tấn công bên kia', 'Bỏ nhà đi', 'Khóc và tự đổ lỗi cho mình', 'Bình tĩnh, đợi không khí dịu, bày tỏ mong gia đình hoà thuận'], 3, 'Bình tĩnh và chia sẻ mong muốn là cách quan tâm chín chắn.', TT_CARE_DEF, ['Sai — đứng về một bên tấn công làm mâu thuẫn căng thẳng hơn.', 'Sai — bỏ nhà đi là phản ứng tiêu cực, nguy hiểm.', 'Sai — tự đổ lỗi cho mình là cách nghĩ tiêu cực, không giúp ích.', 'Đúng — bình tĩnh, đợi không khí dịu, bày tỏ mong gia đình hoà thuận là cách quan tâm chín chắn.']),
  ]),

  M(6, 'Ý nghĩa của quan tâm — chia sẻ', [
    Q('Người biết quan tâm chia sẻ sẽ?', ['Mất bạn', 'Cô đơn', 'Bị xa lánh', 'Được mọi người yêu quý, tạo gia đình hạnh phúc'], 3, 'Quan tâm chia sẻ tạo nên gia đình hạnh phúc.', TT_CARE_MEANING, ['Sai — quan tâm chia sẻ giúp gắn kết, không làm mất bạn.', 'Sai — người biết chia sẻ không cô đơn mà được yêu quý.', 'Sai — bị xa lánh là hậu quả của vô tâm, không phải của quan tâm.', 'Đúng — người biết quan tâm chia sẻ được mọi người yêu quý và tạo gia đình hạnh phúc.']),
    Q('Quan tâm chia sẻ trong gia đình giúp?', ['Gia đình xa cách', 'Tạo căng thẳng', 'Không có ý nghĩa', 'Gắn kết tình thân, ai cũng cảm thấy ấm áp'], 3, 'Quan tâm là sợi dây gắn kết gia đình.', TT_CARE_MEANING, ['Sai — quan tâm gắn kết chứ không làm gia đình xa cách.', 'Sai — quan tâm giảm căng thẳng, không tạo căng thẳng.', 'Sai — quan tâm chia sẻ rất có ý nghĩa với gia đình.', 'Đúng — quan tâm chia sẻ gắn kết tình thân, ai cũng cảm thấy ấm áp.']),
    Q('Khi anh chị buồn, em nên?', ['Lắng nghe, an ủi và động viên', 'Mặc kệ', 'Cãi nhau', 'Trêu thêm'], 0, 'An ủi anh chị là quan tâm chia sẻ.', TT_CARE_MEANING, ['Đúng — lắng nghe, an ủi và động viên là quan tâm chia sẻ với anh chị.', 'Sai — mặc kệ là thờ ơ khi anh chị buồn.', 'Sai — cãi nhau làm anh chị buồn thêm.', 'Sai — trêu thêm khiến anh chị tổn thương hơn.']),
    Q('Câu ca dao nào nói về tình cảm gia đình?', ['Đèn nhà ai nấy rạng', 'Bán anh em xa', 'Có công mài sắt', 'Anh em như thể tay chân'], 3, '"Anh em như thể tay chân" nói về tình anh em.', TT_CARE_MEANING, ['Sai — "Đèn nhà ai nấy rạng" nói về ai lo phận nấy.', 'Sai — "Bán anh em xa" chỉ là vế đầu, dễ gây hiểu nhầm tách khỏi câu trọn vẹn.', 'Sai — "Có công mài sắt" nói về sự kiên trì.', 'Đúng — "Anh em như thể tay chân" nói về tình anh em gắn bó.']),
    Q('Người được quan tâm, chia sẻ thường?', ['Trở nên ích kỉ', 'Cảm thấy được yêu thương, tự tin và biết yêu thương lại', 'Khó chịu', 'Xa lánh người thân'], 1, 'Được yêu thương sẽ biết yêu thương người khác.', TT_CARE_MEANING, ['Sai — được quan tâm thường khiến người ta biết sống vì người khác, không ích kỉ.', 'Đúng — người được quan tâm cảm thấy được yêu thương, tự tin và biết yêu thương lại.', 'Sai — được quan tâm tạo cảm giác ấm áp, không khó chịu.', 'Sai — được quan tâm giúp gắn kết, không xa lánh người thân.']),
    Q('Khi gia đình gặp khó khăn kinh tế, em nên?', ['Đòi hỏi nhiều hơn', 'Trách móc bố mẹ', 'Bỏ học đi làm ngay', 'Tiết kiệm chi tiêu, động viên gia đình cùng vượt qua'], 3, 'Đồng cam cộng khổ là biểu hiện chia sẻ với gia đình.', TT_CARE_MEANING, ['Sai — đòi hỏi nhiều hơn làm gia đình thêm gánh nặng.', 'Sai — trách móc bố mẹ là thiếu cảm thông khi gia đình khó khăn.', 'Sai — bỏ học đi làm ngay là quyết định vội vàng, ảnh hưởng tương lai.', 'Đúng — tiết kiệm chi tiêu, động viên gia đình cùng vượt qua là chia sẻ với gia đình.']),
  ]),

  M(7, 'Rèn luyện quan tâm chia sẻ trong gia đình', [
    Q('Để rèn quan tâm chia sẻ, em nên?', ['Đợi có dịp đặc biệt', 'Tập thói quen hỏi thăm, giúp đỡ người thân hàng ngày', 'Chỉ làm khi có thưởng', 'Mặc kệ'], 1, 'Thói quen hàng ngày tạo nên đức tính tốt.', TT_CARE_PRACTICE, ['Sai — quan tâm cần làm thường xuyên, không đợi dịp đặc biệt.', 'Đúng — tập thói quen hỏi thăm, giúp đỡ người thân hàng ngày tạo nên đức tính tốt.', 'Sai — chỉ làm khi có thưởng là động cơ lệch lạc.', 'Sai — mặc kệ là thờ ơ, không rèn được quan tâm chia sẻ.']),
    Q('Khi bố mẹ bận, em nên?', ['Quậy phá để được chú ý', 'Đòi bố mẹ quan tâm', 'Tự lo việc cá nhân, giúp việc nhà phù hợp', 'Bỏ học'], 2, 'Tự lo và giúp đỡ là cách quan tâm bố mẹ.', TT_CARE_PRACTICE, ['Sai — quậy phá để được chú ý làm bố mẹ thêm vất vả.', 'Sai — đòi bố mẹ quan tâm khi họ bận là ích kỉ.', 'Đúng — tự lo việc cá nhân, giúp việc nhà phù hợp là cách quan tâm bố mẹ.', 'Sai — bỏ học là phản ứng tiêu cực, ảnh hưởng bản thân.']),
    Q('Hành vi nào THIẾU quan tâm gia đình?', ['Hỏi thăm ông bà', 'Ngồi điện thoại cả ngày, không nói chuyện với ai', 'Giúp mẹ nấu cơm', 'Cùng ăn tối với gia đình'], 1, 'Cách ly với gia đình là thiếu quan tâm.', TT_CARE_PRACTICE, ['Sai — hỏi thăm ông bà là biểu hiện quan tâm.', 'Đúng — ngồi điện thoại cả ngày, không nói chuyện với ai là thiếu quan tâm gia đình.', 'Sai — giúp mẹ nấu cơm là biểu hiện quan tâm.', 'Sai — cùng ăn tối với gia đình là gắn kết, quan tâm.']),
    Q('Em làm sai khiến mẹ buồn, em nên?', ['Đổ lỗi', 'Xin lỗi và sửa sai', 'Trốn tránh', 'Cãi lại'], 1, 'Xin lỗi và sửa sai là quan tâm cảm xúc của mẹ.', TT_CARE_PRACTICE, ['Sai — đổ lỗi làm mẹ buồn thêm và không sửa được sai.', 'Đúng — xin lỗi và sửa sai là quan tâm đến cảm xúc của mẹ.', 'Sai — trốn tránh không giải quyết được vấn đề.', 'Sai — cãi lại làm mẹ tổn thương hơn.']),
    Q('Để rèn quan tâm chia sẻ bền vững, cần?', ['Làm khi có thưởng', 'Đợi người khác chủ động trước', 'Bắt đầu từ việc nhỏ hằng ngày, kiên trì và chân thành', 'Theo phong trào'], 2, 'Kiên trì với việc nhỏ giúp hình thành thói quen tốt.', TT_CARE_PRACTICE, ['Sai — làm khi có thưởng là động cơ lệch lạc, không bền vững.', 'Sai — đợi người khác chủ động trước là thụ động.', 'Đúng — bắt đầu từ việc nhỏ hằng ngày, kiên trì và chân thành mới bền vững.', 'Sai — làm theo phong trào thì thiếu sự chân thành, không bền.']),
    Q('Khi anh chị em xảy ra mâu thuẫn nhỏ, em nên?', ['Đập đồ', 'Mách lớn để đối phương bị phạt', 'Im lặng nuôi hận', 'Bình tĩnh nói chuyện, lắng nghe và tìm cách dung hoà'], 3, 'Nói chuyện và lắng nghe giải quyết mâu thuẫn nhỏ.', TT_CARE_PRACTICE, ['Sai — đập đồ là phản ứng bạo lực, làm mâu thuẫn nặng hơn.', 'Sai — mách lớn để đối phương bị phạt là thiếu thiện chí hoà giải.', 'Sai — im lặng nuôi hận làm rạn nứt tình anh em.', 'Đúng — bình tĩnh nói chuyện, lắng nghe và tìm cách dung hoà giải quyết mâu thuẫn nhỏ.']),
  ]),

  // ===== Chủ đề 3: Học tập tự giác, tích cực (T8–10) =====
  M(8, 'Học tập tự giác, tích cực là gì?', [
    Q('Học tập tự giác là?', ['Học khi có quà', 'Chỉ học khi bị thúc ép', 'Tự mình thực hiện việc học mà không cần ai nhắc', 'Học khi cô đứng cạnh'], 2, 'Tự giác là chủ động trong học tập.', TT_STUDY_DEF, ['Sai — học khi có quà là học vì phần thưởng, không phải tự giác.', 'Sai — chỉ học khi bị thúc ép là thụ động, ngược với tự giác.', 'Đúng — tự mình thực hiện việc học mà không cần ai nhắc là học tự giác.', 'Sai — học khi cô đứng cạnh là bị động, không phải tự giác.']),
    Q('Học tập tích cực là?', ['Chỉ chép bài thụ động', 'Chỉ học thuộc', 'Chủ động tìm hiểu, đặt câu hỏi, vận dụng kiến thức', 'Đợi cô giảng lại'], 2, 'Tích cực là chủ động khám phá kiến thức.', TT_STUDY_DEF, ['Sai — chỉ chép bài thụ động là cách học thụ động, không tích cực.', 'Sai — chỉ học thuộc là học vẹt, không vận dụng được.', 'Đúng — chủ động tìm hiểu, đặt câu hỏi, vận dụng kiến thức là học tích cực.', 'Sai — đợi cô giảng lại là thụ động, không tích cực.']),
    Q('Bạn nào học tự giác, tích cực?', ['Tú chép bài bạn', 'Lan tự lập kế hoạch, đọc thêm sách, hỏi cô khi không hiểu', 'Bình chỉ học khi sắp thi', 'An đợi mẹ dạy mới làm'], 1, 'Lan có thái độ tự giác và tích cực.', TT_STUDY_DEF, ['Sai — chép bài bạn là thiếu trung thực và không tự giác.', 'Đúng — Lan tự lập kế hoạch, đọc thêm sách, hỏi cô khi không hiểu là học tự giác, tích cực.', 'Sai — chỉ học khi sắp thi là học dồn, thiếu tự giác.', 'Sai — đợi mẹ dạy mới làm là thụ động, không tự giác.']),
    Q('Câu tục ngữ nào về học tự giác?', ['Đèn nhà ai nấy rạng', 'Học, học nữa, học mãi', 'Trâu chậm uống nước đục', 'Lá lành đùm lá rách'], 1, '"Học, học nữa, học mãi" — Lê-nin về tinh thần tự học.', TT_STUDY_DEF, ['Sai — "Đèn nhà ai nấy rạng" nói về ai lo phận nấy.', 'Đúng — "Học, học nữa, học mãi" thể hiện tinh thần tự học suốt đời.', 'Sai — "Trâu chậm uống nước đục" nói về sự chậm trễ, không phải tự học.', 'Sai — "Lá lành đùm lá rách" nói về tình tương thân tương ái.']),
    Q('Học tự giác và tích cực giống nhau ở?', ['Đều thụ động', 'Đều chờ đợi', 'Đều thể hiện thái độ chủ động trong học tập', 'Đều miễn cưỡng'], 2, 'Hai phẩm chất này đều thể hiện tinh thần chủ động.', TT_STUDY_DEF, ['Sai — cả hai đều chủ động, không thụ động.', 'Sai — chờ đợi là thụ động, ngược với cả hai phẩm chất.', 'Đúng — học tự giác và tích cực đều thể hiện thái độ chủ động trong học tập.', 'Sai — miễn cưỡng là gượng ép, ngược với tự giác và tích cực.']),
    Q('Trái với học tự giác, tích cực là?', ['Chủ động', 'Sáng tạo', 'Lười học, chống đối, học đối phó', 'Hợp tác nhóm'], 2, 'Học đối phó, lười biếng là trái với tự giác tích cực.', TT_STUDY_DEF, ['Sai — chủ động chính là biểu hiện của tự giác, tích cực.', 'Sai — sáng tạo là phẩm chất tốt đi cùng học tích cực.', 'Đúng — lười học, chống đối, học đối phó là trái với tự giác, tích cực.', 'Sai — hợp tác nhóm là biểu hiện của học tích cực.']),
  ]),

  M(9, 'Biểu hiện học tập tự giác — tích cực', [
    Q('Biểu hiện học tự giác?', ['Chỉ học trước thi', 'Đợi có thưởng', 'Tự lập thời gian biểu và làm theo', 'Đợi nhắc nhở'], 2, 'Tự lập kế hoạch và làm theo là tự giác.', TT_STUDY_BIEUHIEN, ['Sai — chỉ học trước thi là học dồn, thiếu tự giác.', 'Sai — đợi có thưởng là học vì phần thưởng, không tự giác.', 'Đúng — tự lập thời gian biểu và làm theo là biểu hiện tự giác.', 'Sai — đợi nhắc nhở là thụ động, không tự giác.']),
    Q('Biểu hiện học tích cực trong lớp?', ['Ngủ trong lớp', 'Tham gia phát biểu, đặt câu hỏi, hợp tác nhóm', 'Làm việc riêng', 'Im lặng cả buổi'], 1, 'Tích cực là tham gia chủ động vào bài học.', TT_STUDY_BIEUHIEN, ['Sai — ngủ trong lớp là thụ động, không tích cực.', 'Đúng — tham gia phát biểu, đặt câu hỏi, hợp tác nhóm là học tích cực.', 'Sai — làm việc riêng là không tập trung, thiếu tích cực.', 'Sai — im lặng cả buổi là thụ động, không tham gia bài học.']),
    Q('Hành vi nào THIẾU tự giác?', ['Phải bị mẹ giục mới ngồi học', 'Tự ôn trước thi', 'Tự kiểm tra bài tập', 'Tự đặt thời gian học'], 0, 'Phải giục mới học là thiếu tự giác.', TT_STUDY_BIEUHIEN, ['Đúng — phải bị mẹ giục mới ngồi học là thiếu tự giác.', 'Sai — tự ôn trước thi là biểu hiện tự giác.', 'Sai — tự kiểm tra bài tập là chủ động, có tự giác.', 'Sai — tự đặt thời gian học là biểu hiện tự giác.']),
    Q('Em không hiểu bài, em nên?', ['Bỏ qua', 'Mặc kệ không hiểu', 'Giấu đi', 'Hỏi thầy cô, bạn bè, tự tìm hiểu thêm'], 3, 'Tìm cách hiểu bài là học tích cực.', TT_STUDY_BIEUHIEN, ['Sai — bỏ qua khiến kiến thức bị hổng.', 'Sai — mặc kệ không hiểu là thái độ thụ động.', 'Sai — giấu đi không giúp giải quyết chỗ chưa hiểu.', 'Đúng — hỏi thầy cô, bạn bè, tự tìm hiểu thêm là học tích cực.']),
    Q('Cách rèn học tự giác hiệu quả?', ['Đặt mục tiêu cụ thể, lập kế hoạch và theo dõi', 'Học theo cảm xúc', 'Theo phong trào', 'Đợi hứng'], 0, 'Mục tiêu và kế hoạch là cốt lõi rèn tự giác.', TT_STUDY_BIEUHIEN, ['Đúng — đặt mục tiêu cụ thể, lập kế hoạch và theo dõi là cách rèn tự giác hiệu quả.', 'Sai — học theo cảm xúc thì thất thường, không bền.', 'Sai — theo phong trào thiếu mục tiêu riêng, không hiệu quả.', 'Sai — đợi hứng là thụ động, không rèn được tự giác.']),
    Q('Bạn nào THỂ HIỆN học tích cực trong giờ?', ['Lan ngủ gật', 'Tú nói chuyện riêng', 'Bình giơ tay phát biểu và trao đổi nhóm sôi nổi', 'An làm việc riêng'], 2, 'Tham gia phát biểu và trao đổi nhóm là tích cực.', TT_STUDY_BIEUHIEN, ['Sai — ngủ gật là thụ động, không tích cực.', 'Sai — nói chuyện riêng là mất tập trung, thiếu tích cực.', 'Đúng — Bình giơ tay phát biểu và trao đổi nhóm sôi nổi là học tích cực.', 'Sai — làm việc riêng là không tham gia bài học, thiếu tích cực.']),
    Q('Khi gặp bài khó, người học tích cực sẽ?', ['Bỏ qua', 'Chép bài bạn', 'Đầu hàng ngay', 'Suy nghĩ nhiều cách, hỏi thầy cô, tìm tài liệu thêm'], 3, 'Kiên trì tìm cách giải là biểu hiện học tích cực.', TT_STUDY_BIEUHIEN, ['Sai — bỏ qua bài khó là né tránh, không tích cực.', 'Sai — chép bài bạn là thiếu trung thực, không học được.', 'Sai — đầu hàng ngay là thiếu kiên trì.', 'Đúng — suy nghĩ nhiều cách, hỏi thầy cô, tìm tài liệu thêm là học tích cực.']),
  ]),

  M(10, 'Ý nghĩa của học tập tự giác — tích cực', [
    Q('Học tự giác, tích cực giúp em?', ['Bị mệt', 'Tiếp thu nhanh, nhớ lâu, đạt kết quả cao', 'Không hiệu quả', 'Mất bạn'], 1, 'Học tự giác giúp tiếp thu hiệu quả, đạt kết quả tốt.', TT_STUDY_MEANING, ['Sai — học tự giác giúp hiệu quả hơn chứ không gây mệt mỏi vô ích.', 'Đúng — học tự giác, tích cực giúp tiếp thu nhanh, nhớ lâu, đạt kết quả cao.', 'Sai — học tự giác rất hiệu quả.', 'Sai — học giỏi không làm mất bạn.']),
    Q('Người học thụ động sẽ?', ['Hạnh phúc', 'Luôn giỏi nhất', 'Khó tiến bộ, dễ chán nản', 'Được khen'], 2, 'Học thụ động khó tiến bộ.', TT_STUDY_MEANING, ['Sai — học thụ động khó đạt kết quả nên khó hạnh phúc với việc học.', 'Sai — học thụ động khó giỏi nhất.', 'Đúng — người học thụ động khó tiến bộ, dễ chán nản.', 'Sai — học thụ động khó được khen vì kết quả thấp.']),
    Q('Học tự giác giúp ích cho tương lai?', ['Tạo thói quen tự học suốt đời, dễ thành công', 'Chỉ ích lợi ngắn hạn', 'Khiến mệt mỏi cả đời', 'Không có ích'], 0, 'Tự học suốt đời là chìa khoá thành công.', TT_STUDY_MEANING, ['Đúng — học tự giác tạo thói quen tự học suốt đời, dễ thành công.', 'Sai — lợi ích của tự học là lâu dài, không chỉ ngắn hạn.', 'Sai — tự học là thói quen tốt, không khiến mệt mỏi cả đời.', 'Sai — học tự giác rất có ích cho tương lai.']),
    Q('Lời khuyên cho HS muốn học tích cực?', ['Đợi cô giảng', 'Học vẹt', 'Đặt câu hỏi "tại sao", đọc trước bài, vận dụng vào thực tế', 'Chép tài liệu'], 2, 'Đặt câu hỏi và vận dụng là cách học tích cực.', TT_STUDY_MEANING, ['Sai — đợi cô giảng là thụ động, không tích cực.', 'Sai — học vẹt không hiểu bản chất, không vận dụng được.', 'Đúng — đặt câu hỏi "tại sao", đọc trước bài, vận dụng vào thực tế là học tích cực.', 'Sai — chép tài liệu là thụ động, không phải học tích cực.']),
    Q('Học tự giác giúp gia đình và xã hội?', ['Tốn kém hơn', 'Không ảnh hưởng', 'Giảm gánh nặng cho cha mẹ, đóng góp nhân lực có tri thức cho XH', 'Gây phiền'], 2, 'Học tự giác giúp gia đình bớt lo và tạo nguồn nhân lực tốt.', TT_STUDY_MEANING, ['Sai — học tự giác không gây tốn kém mà còn giảm lo lắng cho gia đình.', 'Sai — học tự giác có ảnh hưởng tích cực đến gia đình và xã hội.', 'Đúng — học tự giác giảm gánh nặng cho cha mẹ và đóng góp nhân lực có tri thức cho xã hội.', 'Sai — học tự giác không gây phiền mà mang lại lợi ích chung.']),
    Q('Bạn em chỉ học khi sắp thi, em nên?', ['Khuyên bạn lập kế hoạch học đều, không học dồn', 'Khen bạn thông minh', 'Học theo bạn', 'Mặc kệ'], 0, 'Khuyên bạn học đều là tốt cho cả hai.', TT_STUDY_MEANING, ['Đúng — khuyên bạn lập kế hoạch học đều, không học dồn là cách giúp bạn tốt.', 'Sai — khen bạn thông minh là cổ vũ thói quen học dồn không tốt.', 'Sai — học theo bạn là bắt chước thói quen học dồn không hiệu quả.', 'Sai — mặc kệ là thờ ơ, không giúp bạn tiến bộ.']),
  ]),

  // ===== Chủ đề 4: Giữ chữ tín (T11–13) =====
  M(11, 'Giữ chữ tín là gì?', [
    Q('Giữ chữ tín là?', ['Hứa cho qua chuyện', 'Nói một đằng làm một nẻo', 'Coi trọng lòng tin, biết giữ lời hứa và làm đúng cam kết', 'Quên lời hứa'], 2, 'Giữ chữ tín là làm đúng cam kết.', TT_TRUST_DEF, ['Sai — hứa cho qua chuyện là thiếu trách nhiệm, không giữ chữ tín.', 'Sai — nói một đằng làm một nẻo là thất tín.', 'Đúng — coi trọng lòng tin, biết giữ lời hứa và làm đúng cam kết là giữ chữ tín.', 'Sai — quên lời hứa là thất tín.']),
    Q('Biểu hiện giữ chữ tín?', ['Đổi ý liên tục', 'Hay trễ hẹn', 'Đúng giờ hẹn, làm đúng lời hứa, hoàn thành công việc đúng hạn', 'Bỏ giữa chừng'], 2, 'Đúng hẹn và hoàn thành đúng hạn là giữ chữ tín.', TT_TRUST_DEF, ['Sai — đổi ý liên tục làm mất lòng tin, không giữ chữ tín.', 'Sai — hay trễ hẹn là biểu hiện thiếu chữ tín.', 'Đúng — đúng giờ hẹn, làm đúng lời hứa, hoàn thành công việc đúng hạn là giữ chữ tín.', 'Sai — bỏ giữa chừng là thất tín với cam kết.']),
    Q('Câu tục ngữ nào về chữ tín?', ['Đèn nhà ai nấy rạng', 'Có công mài sắt', 'Lá lành đùm lá rách', 'Nói lời phải giữ lấy lời / Đừng như con bướm đậu rồi lại bay'], 3, 'Câu ca dao đề cao việc giữ lời hứa.', TT_TRUST_DEF, ['Sai — "Đèn nhà ai nấy rạng" nói về ai lo phận nấy.', 'Sai — "Có công mài sắt" nói về sự kiên trì.', 'Sai — "Lá lành đùm lá rách" nói về lòng tương thân.', 'Đúng — "Nói lời phải giữ lấy lời..." đề cao việc giữ lời hứa.']),
    Q('Bạn nào GIỮ CHỮ TÍN?', ['Lan hứa hôm sau rồi bặt vô âm tín', 'Tú hứa rồi quên', 'Bình hứa nhưng lười không làm', 'An hứa trả sách cho bạn vào thứ Hai và đã trả đúng hẹn'], 3, 'Làm đúng lời hứa là giữ chữ tín.', TT_TRUST_DEF, ['Sai — hứa rồi bặt vô âm tín là thất tín.', 'Sai — hứa rồi quên là thiếu chữ tín.', 'Sai — hứa nhưng lười không làm là thất tín.', 'Đúng — An hứa trả sách thứ Hai và trả đúng hẹn là giữ chữ tín.']),
    Q('Giữ chữ tín có giống "cứng nhắc, máy móc" không?', ['Có, giống hệt nhau', 'Không — giữ chữ tín linh hoạt, biết báo trước khi có sự cố ngoài ý muốn', 'Cùng nghĩa', 'Đối lập hoàn toàn'], 1, 'Giữ chữ tín linh hoạt — biết báo trước khi gặp tình huống bất khả kháng.', TT_TRUST_DEF, ['Sai — giữ chữ tín không phải cứng nhắc máy móc.', 'Đúng — giữ chữ tín linh hoạt, biết báo trước khi có sự cố ngoài ý muốn.', 'Sai — hai khái niệm này không cùng nghĩa.', 'Sai — giữ chữ tín không đối lập hoàn toàn với linh hoạt.']),
    Q('Trước khi hứa với ai, em nên?', ['Hứa cho qua', 'Hứa cho người ta vui', 'Cân nhắc khả năng thực hiện, chỉ hứa khi chắc chắn làm được', 'Hứa thật nhiều'], 2, 'Cân nhắc trước khi hứa là biểu hiện trách nhiệm.', TT_TRUST_DEF, ['Sai — hứa cho qua dễ dẫn đến thất hứa.', 'Sai — hứa cho người ta vui nhưng không làm được là hứa hão.', 'Đúng — cân nhắc khả năng thực hiện, chỉ hứa khi chắc chắn làm được là trách nhiệm.', 'Sai — hứa thật nhiều mà không làm được là thất tín.']),
  ]),

  M(12, 'Biểu hiện giữ chữ tín trong cuộc sống', [
    Q('Trong học tập, giữ chữ tín là?', ['Bỏ bài tập', 'Đùn việc cho bạn', 'Nộp bài đúng hạn, hoàn thành nhiệm vụ được giao', 'Nộp bài trễ'], 2, 'Đúng hạn và hoàn thành là giữ chữ tín học tập.', TT_TRUST_LIFE, ['Sai — bỏ bài tập là không hoàn thành nhiệm vụ.', 'Sai — đùn việc cho bạn là thiếu trách nhiệm.', 'Đúng — nộp bài đúng hạn, hoàn thành nhiệm vụ được giao là giữ chữ tín trong học tập.', 'Sai — nộp bài trễ là không giữ đúng hạn cam kết.']),
    Q('Trong giao tiếp, giữ chữ tín là?', ['Hứa cho qua', 'Nói dối để được lợi', 'Nói thật, không hứa hão', 'Đổ lỗi'], 2, 'Nói thật và không hứa hão là chữ tín.', TT_TRUST_LIFE, ['Sai — hứa cho qua dễ dẫn đến thất hứa.', 'Sai — nói dối để được lợi là gian dối, mất chữ tín.', 'Đúng — nói thật, không hứa hão là giữ chữ tín trong giao tiếp.', 'Sai — đổ lỗi là né tránh trách nhiệm, không giữ chữ tín.']),
    Q('Em vay bạn 50.000đ, em nên?', ['Đợi bạn đòi mới trả', 'Trả một nửa rồi xin khất phần còn lại', 'Trả khi nào nhớ', 'Trả đúng hẹn dù chỉ là khoản nhỏ'], 3, 'Trả đúng hẹn dù nhỏ là giữ chữ tín.', TT_TRUST_LIFE, ['Sai — đợi bạn đòi mới trả là thiếu trách nhiệm.', 'Sai — trả một nửa rồi xin khất là không giữ đúng cam kết.', 'Sai — trả khi nào nhớ là tuỳ tiện, dễ quên.', 'Đúng — trả đúng hẹn dù chỉ là khoản nhỏ là giữ chữ tín.']),
    Q('Em hứa giúp bạn ôn bài chiều thứ Bảy, đột nhiên có việc?', ['Đến rồi bỏ về', 'Im lặng không đến', 'Báo bạn sớm và sắp xếp thời gian khác', 'Hủy bỏ luôn'], 2, 'Báo sớm và sắp xếp lại là giữ chữ tín linh hoạt.', TT_TRUST_LIFE, ['Sai — đến rồi bỏ về làm bạn hụt hẫng, không giúp được.', 'Sai — im lặng không đến là thất hứa.', 'Đúng — báo bạn sớm và sắp xếp thời gian khác là giữ chữ tín linh hoạt.', 'Sai — hủy bỏ luôn mà không sắp xếp lại là không giữ lời.']),
    Q('Hành vi nào THIẾU chữ tín?', ['Trả nợ đúng hạn', 'Hoàn thành nhiệm vụ', 'Hứa đến chơi nhưng không đến mà không báo', 'Đúng giờ hẹn'], 2, 'Thất hứa mà không báo là thiếu chữ tín.', TT_TRUST_LIFE, ['Sai — trả nợ đúng hạn là giữ chữ tín.', 'Sai — hoàn thành nhiệm vụ là giữ chữ tín.', 'Đúng — hứa đến chơi nhưng không đến mà không báo là thất hứa, thiếu chữ tín.', 'Sai — đúng giờ hẹn là biểu hiện giữ chữ tín.']),
    Q('Em mượn bút bạn rồi làm mất, em nên?', ['Im lặng trả lại bút khác', 'Nói dối là chưa mượn', 'Báo bạn biết, xin lỗi và đền/khắc phục', 'Đổ lỗi cho người khác'], 2, 'Trung thực và khắc phục là biểu hiện giữ chữ tín.', TT_TRUST_LIFE, ['Sai — im lặng trả bút khác mà không nói rõ là thiếu trung thực.', 'Sai — nói dối là chưa mượn là gian dối, mất chữ tín.', 'Đúng — báo bạn biết, xin lỗi và đền/khắc phục là trung thực, giữ chữ tín.', 'Sai — đổ lỗi cho người khác là né tránh trách nhiệm.']),
    Q('Giữ chữ tín trong nhóm học tập?', ['Bỏ phần việc cho bạn', 'Im lặng cho qua', 'Đùn việc khó', 'Làm đúng phần được giao, đúng hạn, đảm bảo chất lượng'], 3, 'Hoàn thành phần việc nhóm là giữ chữ tín với cả tập thể.', TT_TRUST_LIFE, ['Sai — bỏ phần việc cho bạn là thiếu trách nhiệm với nhóm.', 'Sai — im lặng cho qua là né tránh phần việc của mình.', 'Sai — đùn việc khó cho người khác là thiếu chữ tín với nhóm.', 'Đúng — làm đúng phần được giao, đúng hạn, đảm bảo chất lượng là giữ chữ tín với nhóm.']),
  ]),

  M(13, 'Ý nghĩa của giữ chữ tín', [
    Q('Người giữ chữ tín sẽ?', ['Được tin cậy, tôn trọng, dễ thành công', 'Bị xa lánh', 'Bị coi thường', 'Mất bạn'], 0, 'Giữ chữ tín tạo lòng tin và cơ hội thành công.', TT_TRUST_MEANING, ['Đúng — người giữ chữ tín được tin cậy, tôn trọng và dễ thành công.', 'Sai — người giữ chữ tín được quý mến, không bị xa lánh.', 'Sai — giữ chữ tín mang lại sự tôn trọng, không bị coi thường.', 'Sai — giữ chữ tín giúp giữ bạn, không làm mất bạn.']),
    Q('Người KHÔNG giữ chữ tín thường?', ['Mất lòng tin, mất cơ hội, bị xa lánh', 'Được mọi người yêu', 'Luôn thành công', 'Có nhiều bạn'], 0, 'Thất tín dẫn đến mất lòng tin và cơ hội.', TT_TRUST_MEANING, ['Đúng — người không giữ chữ tín mất lòng tin, mất cơ hội, bị xa lánh.', 'Sai — thất tín khiến người ta xa lánh, không được yêu quý.', 'Sai — thất tín dẫn đến mất cơ hội, khó thành công.', 'Sai — thất tín khiến mất bạn, không có nhiều bạn.']),
    Q('Trong kinh doanh, chữ tín có vai trò gì?', ['Chỉ cần khi mới mở', 'Chỉ là khẩu hiệu', 'Chỉ cần khi gặp khách hàng lớn', 'Là yếu tố sống còn để giữ khách và phát triển'], 3, 'Chữ tín là nền tảng kinh doanh bền vững.', TT_TRUST_MEANING, ['Sai — chữ tín cần thiết suốt quá trình, không chỉ khi mới mở.', 'Sai — chữ tín không phải khẩu hiệu mà là hành động thật.', 'Sai — chữ tín cần với mọi khách hàng, không chỉ khách lớn.', 'Đúng — chữ tín là yếu tố sống còn để giữ khách và phát triển kinh doanh.']),
    Q('Cách rèn giữ chữ tín?', ['Hứa rồi quên', 'Đổ lỗi', 'Chỉ hứa khi chắc chắn làm được, luôn nỗ lực giữ lời', 'Hứa hẹn nhiều cho vui'], 2, 'Cân nhắc trước khi hứa và nỗ lực giữ lời.', TT_TRUST_MEANING, ['Sai — hứa rồi quên là thất tín.', 'Sai — đổ lỗi là né tránh trách nhiệm.', 'Đúng — chỉ hứa khi chắc chắn làm được, luôn nỗ lực giữ lời là cách rèn chữ tín.', 'Sai — hứa hẹn nhiều cho vui dễ dẫn đến thất hứa.']),
    Q('Câu nào ĐÚNG về chữ tín?', ['Chữ tín chỉ cần thiết với người lớn', 'Chỉ doanh nhân cần chữ tín', 'Trẻ con không cần chữ tín', 'Chữ tín cần cho mọi người, ở mọi lứa tuổi, trong mọi lĩnh vực'], 3, 'Giữ chữ tín là phẩm chất cần thiết cho ai.', TT_TRUST_MEANING, ['Sai — chữ tín cần cho cả trẻ em, không riêng người lớn.', 'Sai — chữ tín cần cho mọi người, không riêng doanh nhân.', 'Sai — trẻ con cũng cần giữ chữ tín.', 'Đúng — chữ tín cần cho mọi người, ở mọi lứa tuổi, trong mọi lĩnh vực.']),
    Q('Người không giữ chữ tín dễ?', ['Trở nên nổi tiếng', 'Giàu nhanh', 'Có nhiều bạn', 'Bị xa lánh, mất cơ hội hợp tác và thành công'], 3, 'Mất chữ tín dẫn đến mất cơ hội trong cuộc sống.', TT_TRUST_MEANING, ['Sai — thất tín không mang lại danh tiếng tốt.', 'Sai — thất tín không giúp giàu nhanh mà còn mất cơ hội.', 'Sai — thất tín khiến mất bạn, không có nhiều bạn.', 'Đúng — người không giữ chữ tín dễ bị xa lánh, mất cơ hội hợp tác và thành công.']),
  ]),

  // ===== Chủ đề 5: Bảo tồn di sản văn hoá (T14–15) =====
  M(14, 'Di sản văn hoá là gì?', [
    Q('Di sản văn hoá là?', ['Sách báo hiện đại', 'Đồ điện tử', 'Đồ dùng cũ', 'Sản phẩm vật chất, tinh thần có giá trị lịch sử, văn hoá, khoa học được truyền qua các thế hệ'], 3, 'Di sản văn hoá là tài sản có giá trị truyền đời.', TT_HERITAGE_DEF, ['Sai — sách báo hiện đại chưa qua nhiều thế hệ thì chưa thành di sản.', 'Sai — đồ điện tử là sản phẩm tiêu dùng, không phải di sản văn hoá.', 'Sai — đồ dùng cũ chưa hẳn có giá trị lịch sử, văn hoá để thành di sản.', 'Đúng — di sản văn hoá là sản phẩm vật chất, tinh thần có giá trị lịch sử, văn hoá, khoa học truyền qua các thế hệ.']),
    Q('Có mấy loại di sản văn hoá?', ['5 loại', '1 loại', '2 (vật thể và phi vật thể)', '10 loại'], 2, 'Có 2 loại: vật thể (đình, chùa, hiện vật) và phi vật thể (lễ hội, làn điệu...).', TT_HERITAGE_DEF, ['Sai — di sản văn hoá không chia thành 5 loại.', 'Sai — di sản văn hoá có 2 loại chứ không phải 1.', 'Đúng — di sản văn hoá có 2 loại: vật thể và phi vật thể.', 'Sai — không có 10 loại di sản văn hoá.']),
    Q('Cố đô Huế là?', ['Di sản văn hoá vật thể', 'Không phải di sản', 'Di sản phi vật thể', 'Di sản thiên nhiên'], 0, 'Cố đô Huế là di sản văn hoá vật thể được UNESCO công nhận.', TT_HERITAGE_DEF, ['Đúng — cố đô Huế là di sản văn hoá vật thể được UNESCO công nhận.', 'Sai — cố đô Huế là di sản, không phải không phải di sản.', 'Sai — cố đô Huế có hình hài kiến trúc nên là vật thể, không phải phi vật thể.', 'Sai — cố đô Huế là di sản văn hoá, không phải di sản thiên nhiên.']),
    Q('Nhã nhạc cung đình Huế là?', ['Di sản vật thể', 'Di sản thiên nhiên', 'Di sản văn hoá phi vật thể', 'Không phải di sản'], 2, 'Nhã nhạc cung đình Huế là di sản phi vật thể của nhân loại.', TT_HERITAGE_DEF, ['Sai — nhã nhạc không có hình hài cụ thể nên không phải vật thể.', 'Sai — nhã nhạc là di sản văn hoá, không phải thiên nhiên.', 'Đúng — nhã nhạc cung đình Huế là di sản văn hoá phi vật thể của nhân loại.', 'Sai — nhã nhạc cung đình Huế chính là một di sản.']),
    Q('Vịnh Hạ Long là?', ['Di sản văn hoá', 'Không phải di sản', 'Di sản thiên nhiên thế giới', 'Di sản phi vật thể'], 2, 'Vịnh Hạ Long là di sản thiên nhiên thế giới.', TT_HERITAGE_DEF, ['Sai — Vịnh Hạ Long là di sản thiên nhiên, không phải di sản văn hoá.', 'Sai — Vịnh Hạ Long là di sản được UNESCO công nhận.', 'Đúng — Vịnh Hạ Long là di sản thiên nhiên thế giới.', 'Sai — Vịnh Hạ Long là cảnh quan tự nhiên, không phải phi vật thể.']),
    Q('Đờn ca tài tử Nam Bộ là?', ['Di sản văn hoá vật thể', 'Di sản thiên nhiên', 'Không phải di sản', 'Di sản văn hoá phi vật thể được UNESCO công nhận'], 3, 'Đờn ca tài tử Nam Bộ là di sản phi vật thể của nhân loại.', TT_HERITAGE_DEF, ['Sai — đờn ca tài tử không có hình hài cụ thể nên không phải vật thể.', 'Sai — đờn ca tài tử là di sản văn hoá, không phải thiên nhiên.', 'Sai — đờn ca tài tử Nam Bộ chính là một di sản.', 'Đúng — đờn ca tài tử Nam Bộ là di sản văn hoá phi vật thể được UNESCO công nhận.']),
    Q('Vai trò của di sản văn hoá là?', ['Lãng phí ngân sách', 'Không có vai trò', 'Cản trở phát triển', 'Là tài sản tinh thần vô giá, thể hiện bản sắc dân tộc, có giá trị giáo dục, kinh tế'], 3, 'Di sản đóng nhiều vai trò: bản sắc, giáo dục, kinh tế (du lịch)...', TT_HERITAGE_DEF, ['Sai — di sản mang lại giá trị chứ không lãng phí ngân sách.', 'Sai — di sản có nhiều vai trò quan trọng.', 'Sai — di sản hỗ trợ phát triển du lịch, không cản trở phát triển.', 'Đúng — di sản là tài sản tinh thần vô giá, thể hiện bản sắc dân tộc, có giá trị giáo dục, kinh tế.']),
  ]),

  M(15, 'Bảo tồn và phát huy di sản văn hoá', [
    Q('Hành vi nào bảo tồn di sản?', ['Vẽ bậy lên di tích', 'Khắc tên mình lên tường di tích làm kỷ niệm', 'Đào bới di tích trái phép', 'Tôn trọng, giữ gìn, quảng bá di sản'], 3, 'Tôn trọng và quảng bá là bảo tồn di sản.', TT_HERITAGE_KEEP, ['Sai — vẽ bậy lên di tích là phá hoại di sản.', 'Sai — khắc tên lên tường di tích là làm hư hại di sản.', 'Sai — đào bới di tích trái phép là vi phạm pháp luật.', 'Đúng — tôn trọng, giữ gìn, quảng bá di sản là bảo tồn di sản.']),
    Q('Hành vi nào VI PHẠM bảo vệ di sản?', ['Tham gia lễ hội', 'Tham quan có ý thức', 'Quảng bá lễ hội', 'Bẻ cành cây cảnh ở khu di tích'], 3, 'Bẻ cành, vẽ bậy là vi phạm bảo vệ di sản.', TT_HERITAGE_KEEP, ['Sai — tham gia lễ hội là giữ gìn di sản.', 'Sai — tham quan có ý thức là tôn trọng di sản.', 'Sai — quảng bá lễ hội là phát huy di sản.', 'Đúng — bẻ cành cây cảnh ở khu di tích là vi phạm bảo vệ di sản.']),
    Q('HS có thể bảo tồn di sản bằng cách?', ['Đăng tin xấu về di sản', 'Chụp ảnh đăng mạng kèm bình luận chê bai di sản', 'Mặc kệ', 'Tìm hiểu, giới thiệu, tham gia hoạt động bảo vệ di sản'], 3, 'HS có thể tìm hiểu và quảng bá di sản.', TT_HERITAGE_KEEP, ['Sai — đăng tin xấu làm tổn hại hình ảnh di sản.', 'Sai — bình luận chê bai di sản là thái độ thiếu tôn trọng.', 'Sai — mặc kệ là thờ ơ, không bảo tồn được di sản.', 'Đúng — tìm hiểu, giới thiệu, tham gia hoạt động bảo vệ di sản là cách HS bảo tồn di sản.']),
    Q('Vì sao phải bảo tồn di sản văn hoá?', ['Chỉ để khoe', 'Để bán cho nước ngoài', 'Giữ gìn bản sắc dân tộc và truyền cho thế hệ sau', 'Không cần thiết'], 2, 'Di sản là bản sắc cần giữ và truyền lại.', TT_HERITAGE_KEEP, ['Sai — bảo tồn di sản không phải để khoe.', 'Sai — bán di sản cho nước ngoài là đánh mất bản sắc.', 'Đúng — bảo tồn di sản để giữ gìn bản sắc dân tộc và truyền cho thế hệ sau.', 'Sai — bảo tồn di sản rất cần thiết.']),
    Q('Khi đi tham quan di tích, em nên?', ['Vẽ tên kỉ niệm', 'Trèo lên tường', 'Tuân thủ nội quy, không xả rác, không vẽ bậy', 'Bẻ hoa'], 2, 'Tuân thủ nội quy là bảo vệ di sản.', TT_HERITAGE_KEEP, ['Sai — vẽ tên kỉ niệm là làm hư hại di tích.', 'Sai — trèo lên tường là gây hư hại và nguy hiểm.', 'Đúng — tuân thủ nội quy, không xả rác, không vẽ bậy là bảo vệ di sản.', 'Sai — bẻ hoa là phá hoại cảnh quan di tích.']),
    Q('Hành vi nào BỊ pháp luật nghiêm cấm với di sản?', ['Tham quan có ý thức', 'Quay phim chụp ảnh đúng quy định', 'Lan toả thông tin di sản', 'Lấn chiếm, phá hoại, mua bán, vận chuyển trái phép cổ vật'], 3, 'Luật Di sản văn hoá nghiêm cấm các hành vi xâm phạm di sản.', TT_HERITAGE_KEEP, ['Sai — tham quan có ý thức được pháp luật cho phép.', 'Sai — quay phim chụp ảnh đúng quy định không bị cấm.', 'Sai — lan toả thông tin di sản là việc tích cực.', 'Đúng — lấn chiếm, phá hoại, mua bán, vận chuyển trái phép cổ vật bị pháp luật nghiêm cấm.']),
    Q('HS có thể tham gia bảo tồn di sản tại địa phương bằng?', ['Phá hoại đình', 'Mặc kệ', 'Tham gia dọn vệ sinh di tích, làm hướng dẫn viên nhỏ trong dịp lễ hội', 'Vẽ bậy'], 2, 'HS có thể tham gia hoạt động bảo tồn phù hợp tuổi.', TT_HERITAGE_KEEP, ['Sai — phá hoại đình là làm hư hại di sản.', 'Sai — mặc kệ là thờ ơ, không bảo tồn được di sản.', 'Đúng — tham gia dọn vệ sinh di tích, làm hướng dẫn viên nhỏ trong dịp lễ hội là hoạt động bảo tồn phù hợp tuổi.', 'Sai — vẽ bậy là phá hoại di sản.']),
  ]),

  // ===== Chủ đề 6: Ứng phó tâm lý căng thẳng (T16–17) =====
  M(16, 'Tâm lý căng thẳng là gì?', [
    Q('Tâm lý căng thẳng là?', ['Trạng thái lo lắng, áp lực ảnh hưởng đến thể chất và tinh thần', 'Đói bụng', 'Niềm vui', 'Buồn ngủ'], 0, 'Căng thẳng (stress) là trạng thái áp lực tâm lý.', TT_STRESS_DEF, ['Đúng — tâm lý căng thẳng là trạng thái lo lắng, áp lực ảnh hưởng đến thể chất và tinh thần.', 'Sai — đói bụng là nhu cầu sinh lý, không phải căng thẳng tâm lý.', 'Sai — niềm vui là cảm xúc tích cực, ngược với căng thẳng.', 'Sai — buồn ngủ là trạng thái sinh lý, không phải căng thẳng tâm lý.']),
    Q('Nguyên nhân gây căng thẳng cho HS?', ['Áp lực học tập, gia đình, bạn bè, kỳ vọng quá cao', 'Ngủ đủ', 'Đi chơi', 'Ăn ngon'], 0, 'Áp lực học tập và quan hệ là nguyên nhân phổ biến.', TT_STRESS_DEF, ['Đúng — áp lực học tập, gia đình, bạn bè, kỳ vọng quá cao gây căng thẳng cho HS.', 'Sai — ngủ đủ giúp giảm căng thẳng, không gây căng thẳng.', 'Sai — đi chơi giúp thư giãn, không gây căng thẳng.', 'Sai — ăn ngon không phải nguyên nhân gây căng thẳng.']),
    Q('Biểu hiện của căng thẳng?', ['Khoẻ mạnh', 'Tự tin', 'Mệt mỏi, cáu gắt, mất ngủ, khó tập trung', 'Vui vẻ'], 2, 'Mệt mỏi, mất ngủ, cáu gắt là biểu hiện căng thẳng.', TT_STRESS_DEF, ['Sai — khoẻ mạnh là trạng thái tốt, không phải biểu hiện căng thẳng.', 'Sai — tự tin là biểu hiện tích cực, không phải căng thẳng.', 'Đúng — mệt mỏi, cáu gắt, mất ngủ, khó tập trung là biểu hiện căng thẳng.', 'Sai — vui vẻ là cảm xúc tích cực, ngược với căng thẳng.']),
    Q('Căng thẳng kéo dài có hại?', ['Không có hại', 'Tốt cho não', 'Giúp khoẻ hơn', 'Giảm sức khoẻ, hiệu quả học tập, dễ trầm cảm'], 3, 'Căng thẳng kéo dài rất hại sức khoẻ thể chất và tinh thần.', TT_STRESS_DEF, ['Sai — căng thẳng kéo dài rất có hại.', 'Sai — căng thẳng kéo dài hại cho não và tinh thần.', 'Sai — căng thẳng kéo dài làm giảm sức khoẻ, không giúp khoẻ hơn.', 'Đúng — căng thẳng kéo dài giảm sức khoẻ, hiệu quả học tập, dễ trầm cảm.']),
    Q('Căng thẳng nhẹ, ngắn hạn?', ['Luôn có hại', 'Cần loại bỏ ngay', 'Có thể có tác động tích cực — tạo động lực, giúp tập trung', 'Là bệnh'], 2, 'Stress ngắn hạn vừa phải có thể giúp tập trung và tạo động lực.', TT_STRESS_DEF, ['Sai — căng thẳng nhẹ ngắn hạn không phải luôn có hại.', 'Sai — căng thẳng nhẹ vừa phải không nhất thiết phải loại bỏ ngay.', 'Đúng — căng thẳng nhẹ, ngắn hạn có thể có tác động tích cực — tạo động lực, giúp tập trung.', 'Sai — căng thẳng nhẹ ngắn hạn không phải là bệnh.']),
    Q('Dấu hiệu cảnh báo căng thẳng nghiêm trọng?', ['Học giỏi hơn', 'Vui vẻ tăng', 'Mất hứng thú kéo dài, nghĩ tiêu cực về bản thân, mất ngủ', 'Năng động hơn'], 2, 'Đây là dấu hiệu cần tìm sự giúp đỡ chuyên môn.', TT_STRESS_DEF, ['Sai — học giỏi hơn không phải dấu hiệu căng thẳng nghiêm trọng.', 'Sai — vui vẻ tăng là biểu hiện tích cực, không phải cảnh báo.', 'Đúng — mất hứng thú kéo dài, nghĩ tiêu cực về bản thân, mất ngủ là dấu hiệu căng thẳng nghiêm trọng.', 'Sai — năng động hơn là biểu hiện tốt, không phải cảnh báo.']),
  ]),

  M(17, 'Ứng phó với tâm lý căng thẳng', [
    Q('Cách ứng phó với căng thẳng?', ['Thư giãn, tập thể dục, chia sẻ với người tin cậy', 'Ăn vô độ', 'Bỏ học', 'Cô lập'], 0, 'Thư giãn, vận động, chia sẻ là cách ứng phó tốt.', TT_STRESS_COPE, ['Đúng — thư giãn, tập thể dục, chia sẻ với người tin cậy là cách ứng phó tốt.', 'Sai — ăn vô độ là cách giải toả sai lầm, hại sức khoẻ.', 'Sai — bỏ học là phản ứng tiêu cực, làm tình hình tệ hơn.', 'Sai — cô lập làm căng thẳng nặng thêm.']),
    Q('Khi cảm thấy quá tải, em nên?', ['Bỏ cuộc', 'Tạm dừng, nghỉ ngơi, lập kế hoạch lại', 'Cố ép bản thân', 'Giấu giếm'], 1, 'Tạm dừng và lập kế hoạch hợp lý hơn.', TT_STRESS_COPE, ['Sai — bỏ cuộc là phản ứng tiêu cực, không giải quyết được.', 'Đúng — tạm dừng, nghỉ ngơi, lập kế hoạch lại giúp giảm quá tải.', 'Sai — cố ép bản thân làm căng thẳng nặng hơn.', 'Sai — giấu giếm khiến không nhận được hỗ trợ kịp thời.']),
    Q('Khi căng thẳng nặng kéo dài, em nên?', ['Gặp chuyên gia tâm lý hoặc người tin cậy', 'Tự xử lý một mình', 'Uống thuốc bừa bãi', 'Cố gắng học nhiều hơn để quên đi'], 0, 'Cần sự hỗ trợ chuyên môn khi căng thẳng nặng.', TT_STRESS_COPE, ['Đúng — gặp chuyên gia tâm lý hoặc người tin cậy khi căng thẳng nặng kéo dài.', 'Sai — tự xử lý một mình khi căng thẳng nặng là không nên.', 'Sai — uống thuốc bừa bãi rất nguy hiểm.', 'Sai — cố học nhiều hơn để quên đi làm căng thẳng nặng thêm.']),
    Q('Cách phòng tránh căng thẳng?', ['Học liên tục', 'Ăn vặt nhiều', 'Thức khuya', 'Cân bằng học — chơi — nghỉ, ngủ đủ giấc, ăn uống lành mạnh'], 3, 'Cân bằng cuộc sống là cách phòng căng thẳng.', TT_STRESS_COPE, ['Sai — học liên tục không nghỉ dễ gây căng thẳng.', 'Sai — ăn vặt nhiều hại sức khoẻ, không phòng căng thẳng.', 'Sai — thức khuya làm cơ thể mệt mỏi, dễ căng thẳng.', 'Đúng — cân bằng học — chơi — nghỉ, ngủ đủ giấc, ăn uống lành mạnh là cách phòng căng thẳng.']),
    Q('Hành vi nào KHÔNG nên khi căng thẳng?', ['Thức khuya chơi game để giải toả', 'Nghe nhạc', 'Đập phá đồ, gây gổ với người khác', 'Tâm sự với mẹ'], 2, 'Bạo lực là cách phản ứng sai lầm.', TT_STRESS_COPE, ['Sai — thức khuya chơi game cũng không tốt nhưng câu hỏi tìm hành vi tệ nhất.', 'Sai — nghe nhạc là cách thư giãn lành mạnh.', 'Đúng — đập phá đồ, gây gổ với người khác là phản ứng bạo lực sai lầm.', 'Sai — tâm sự với mẹ là cách chia sẻ tích cực.']),
    Q('Kĩ thuật thở 4-7-8 giúp ích khi?', ['Đói bụng', 'Vui vẻ', 'Đi học', 'Lo lắng, căng thẳng cần làm dịu nhanh'], 3, 'Thở chậm sâu là kĩ thuật điều hoà nhanh tâm trạng.', TT_STRESS_COPE, ['Sai — kĩ thuật thở không giải quyết cơn đói.', 'Sai — khi vui vẻ không cần kĩ thuật làm dịu.', 'Sai — đi học không phải tình huống cần làm dịu khẩn cấp.', 'Đúng — kĩ thuật thở 4-7-8 giúp ích khi lo lắng, căng thẳng cần làm dịu nhanh.']),
    Q('Bạn em có dấu hiệu căng thẳng kéo dài, em nên?', ['Trêu cho cười', 'Mặc kệ', 'Bỏ chơi với bạn', 'Lắng nghe, khuyên bạn nói với người lớn tin cậy hoặc chuyên gia tâm lý'], 3, 'Bạn cần sự lắng nghe và hỗ trợ tìm trợ giúp đúng.', TT_STRESS_COPE, ['Sai — trêu cho cười không giải quyết được căng thẳng của bạn.', 'Sai — mặc kệ là thờ ơ khi bạn cần giúp đỡ.', 'Sai — bỏ chơi với bạn làm bạn cô đơn hơn.', 'Đúng — lắng nghe, khuyên bạn nói với người lớn tin cậy hoặc chuyên gia tâm lý là cách giúp đúng.']),
  ]),

  // ===== T18: Ôn tập HK1 =====
  M(18, 'Ôn tập học kì 1', [
    Q('Truyền thống quê hương KHÔNG bao gồm?', ['Lao động cần cù', 'Hủ tục mê tín', 'Yêu nước', 'Hiếu học'], 1, 'Hủ tục không phải truyền thống tốt đẹp.', TT_REVIEW, ['Sai — lao động cần cù là truyền thống tốt đẹp.', 'Đúng — hủ tục mê tín không phải truyền thống tốt đẹp.', 'Sai — yêu nước là truyền thống tốt đẹp.', 'Sai — hiếu học là truyền thống tốt đẹp.']),
    Q('Quan tâm chia sẻ trong gia đình giúp?', ['Không có tác dụng', 'Xa cách', 'Gắn kết tình thân, gia đình hạnh phúc', 'Mâu thuẫn'], 2, 'Quan tâm chia sẻ là sợi dây gắn kết.', TT_REVIEW, ['Sai — quan tâm chia sẻ rất có tác dụng với gia đình.', 'Sai — quan tâm gắn kết chứ không làm xa cách.', 'Đúng — quan tâm chia sẻ giúp gắn kết tình thân, gia đình hạnh phúc.', 'Sai — quan tâm làm giảm mâu thuẫn, không gây mâu thuẫn.']),
    Q('Học tự giác là?', ['Học khi có thưởng', 'Tự thực hiện học tập không cần nhắc nhở', 'Học theo cảm hứng', 'Học khi bị ép'], 1, 'Tự giác là chủ động học.', TT_REVIEW, ['Sai — học khi có thưởng là học vì phần thưởng, không tự giác.', 'Đúng — tự thực hiện học tập không cần nhắc nhở là học tự giác.', 'Sai — học theo cảm hứng thì thất thường, không tự giác.', 'Sai — học khi bị ép là thụ động, ngược với tự giác.']),
    Q('Giữ chữ tín là?', ['Quên lời hứa', 'Làm đúng lời hứa, đúng hẹn', 'Hứa cho qua', 'Đổi ý liên tục'], 1, 'Giữ chữ tín là làm đúng cam kết.', TT_REVIEW, ['Sai — quên lời hứa là thất tín.', 'Đúng — làm đúng lời hứa, đúng hẹn là giữ chữ tín.', 'Sai — hứa cho qua dễ dẫn đến thất hứa.', 'Sai — đổi ý liên tục làm mất lòng tin.']),
    Q('Cách ứng phó căng thẳng đúng?', ['Bạo lực', 'Cô lập bản thân', 'Thư giãn, tập thể dục, chia sẻ với người tin cậy', 'Bỏ học'], 2, 'Thư giãn và chia sẻ là cách lành mạnh.', TT_REVIEW, ['Sai — bạo lực là phản ứng sai lầm.', 'Sai — cô lập làm căng thẳng nặng thêm.', 'Đúng — thư giãn, tập thể dục, chia sẻ với người tin cậy là cách ứng phó đúng.', 'Sai — bỏ học là phản ứng tiêu cực.']),
    Q('Di sản phi vật thể là?', ['Di tích, đền chùa', 'Cổ vật, bảo vật', 'Toà nhà cổ', 'Lễ hội, làn điệu, phong tục, tri thức dân gian'], 3, 'Phi vật thể là di sản không có hình dạng cụ thể.', TT_REVIEW, ['Sai — di tích, đền chùa là di sản vật thể.', 'Sai — cổ vật, bảo vật là di sản vật thể.', 'Sai — toà nhà cổ là di sản vật thể.', 'Đúng — lễ hội, làn điệu, phong tục, tri thức dân gian là di sản phi vật thể.']),
    Q('Học tích cực giúp em?', ['Mệt mỏi vô ích', 'Tốn thời gian vô ích', 'Mất bạn vì học giỏi quá', 'Nhớ lâu, tư duy tốt và vận dụng được vào thực tế'], 3, 'Học tích cực giúp ghi nhớ và vận dụng tốt.', TT_REVIEW, ['Sai — học tích cực mang lại lợi ích, không mệt mỏi vô ích.', 'Sai — học tích cực dùng thời gian hiệu quả, không vô ích.', 'Sai — học giỏi không làm mất bạn.', 'Đúng — học tích cực giúp nhớ lâu, tư duy tốt và vận dụng được vào thực tế.']),
  ]),

  // ===== HK2 — Chủ đề 7: Phòng chống bạo lực học đường (T19–22) =====
  M(19, 'Bạo lực học đường là gì?', [
    Q('Bạo lực học đường là?', ['Cãi nhau bình thường', 'Hành vi gây tổn hại thể chất, tinh thần với HS trong và liên quan trường học', 'Tranh luận trong lớp', 'Thi đấu thể thao'], 1, 'BLHĐ là hành vi gây tổn hại trong môi trường học đường.', TT_SCHOOLV_DEF, ['Sai — cãi nhau bình thường chưa hẳn là bạo lực học đường.', 'Đúng — bạo lực học đường là hành vi gây tổn hại thể chất, tinh thần với HS trong và liên quan trường học.', 'Sai — tranh luận trong lớp là hoạt động học tập lành mạnh.', 'Sai — thi đấu thể thao là hoạt động lành mạnh, không phải bạo lực.']),
    Q('Hình thức BLHĐ phổ biến?', ['Giúp đỡ nhau', 'Đánh đập, lăng mạ, đe doạ, bạo lực mạng', 'Học nhóm', 'Khen nhau'], 1, 'Đánh, lăng mạ, đe doạ, bắt nạt mạng đều là BLHĐ.', TT_SCHOOLV_DEF, ['Sai — giúp đỡ nhau là hành vi tốt, không phải bạo lực.', 'Đúng — đánh đập, lăng mạ, đe doạ, bạo lực mạng là các hình thức BLHĐ phổ biến.', 'Sai — học nhóm là hoạt động học tập lành mạnh.', 'Sai — khen nhau là hành vi tích cực, không phải bạo lực.']),
    Q('Bạo lực mạng là?', ['Lăng mạ, đe doạ qua mạng xã hội, tin nhắn', 'Họp nhóm online', 'Học online', 'Chia sẻ bài giảng'], 0, 'Bạo lực mạng = lăng mạ, đe doạ qua kênh số.', TT_SCHOOLV_DEF, ['Đúng — bạo lực mạng là lăng mạ, đe doạ qua mạng xã hội, tin nhắn.', 'Sai — họp nhóm online là hoạt động bình thường.', 'Sai — học online là hoạt động học tập lành mạnh.', 'Sai — chia sẻ bài giảng là việc tích cực.']),
    Q('Nguyên nhân BLHĐ?', ['Học giỏi quá', 'Đi học đều', 'Ngoan ngoãn', 'Thiếu kĩ năng kiểm soát cảm xúc, ảnh hưởng tiêu cực, thiếu giáo dục đạo đức'], 3, 'BLHĐ thường do thiếu kĩ năng và ảnh hưởng tiêu cực.', TT_SCHOOLV_DEF, ['Sai — học giỏi không phải nguyên nhân gây bạo lực.', 'Sai — đi học đều là hành vi tốt, không gây bạo lực.', 'Sai — ngoan ngoãn không dẫn đến bạo lực.', 'Đúng — thiếu kĩ năng kiểm soát cảm xúc, ảnh hưởng tiêu cực, thiếu giáo dục đạo đức là nguyên nhân BLHĐ.']),
    Q('Tẩy chay, cô lập một bạn trong lớp có phải BLHĐ?', ['Không, đó là quyền tự do', 'Có — đây là bạo lực tinh thần, gây tổn thương nghiêm trọng', 'Chỉ là trò đùa', 'Bình thường'], 1, 'Cô lập là dạng bạo lực tinh thần thường bị xem nhẹ nhưng rất nghiêm trọng.', TT_SCHOOLV_DEF, ['Sai — tẩy chay không phải quyền tự do mà là làm tổn thương người khác.', 'Đúng — tẩy chay, cô lập là bạo lực tinh thần, gây tổn thương nghiêm trọng.', 'Sai — đây không phải trò đùa mà gây tổn thương thật.', 'Sai — đây không bình thường mà là một dạng bạo lực.']),
  ]),

  M(20, 'Hậu quả bạo lực học đường', [
    Q('Hậu quả với nạn nhân BLHĐ?', ['Khoẻ mạnh hơn', 'Tổn hại thể chất, sang chấn tâm lý, học tập giảm sút', 'Vui vẻ hơn', 'Không có ảnh hưởng'], 1, 'Nạn nhân BLHĐ bị tổn hại nặng nề.', TT_SCHOOLV_RESULT, ['Sai — nạn nhân bị tổn hại chứ không khoẻ mạnh hơn.', 'Đúng — nạn nhân BLHĐ bị tổn hại thể chất, sang chấn tâm lý, học tập giảm sút.', 'Sai — nạn nhân bị tổn thương, không vui vẻ hơn.', 'Sai — BLHĐ ảnh hưởng nặng nề đến nạn nhân.']),
    Q('Hậu quả với người gây bạo lực?', ['Bị kỉ luật, vi phạm pháp luật, hỏng tương lai', 'Học giỏi hơn', 'Có nhiều bạn', 'Được tôn trọng'], 0, 'Người gây bạo lực bị kỉ luật và ảnh hưởng tương lai.', TT_SCHOOLV_RESULT, ['Đúng — người gây bạo lực bị kỉ luật, vi phạm pháp luật, hỏng tương lai.', 'Sai — gây bạo lực không giúp học giỏi hơn.', 'Sai — gây bạo lực khiến bị xa lánh, không có nhiều bạn.', 'Sai — gây bạo lực bị lên án, không được tôn trọng.']),
    Q('Hậu quả với gia đình, nhà trường?', ['Tăng uy tín', 'Ảnh hưởng danh dự, môi trường học tập', 'Không ảnh hưởng', 'Tốt hơn'], 1, 'BLHĐ ảnh hưởng nhiều đến gia đình và nhà trường.', TT_SCHOOLV_RESULT, ['Sai — BLHĐ làm giảm uy tín, không tăng.', 'Đúng — BLHĐ ảnh hưởng danh dự gia đình, nhà trường và môi trường học tập.', 'Sai — BLHĐ có ảnh hưởng tiêu cực rõ rệt.', 'Sai — BLHĐ làm xấu đi, không tốt hơn.']),
    Q('Hậu quả lâu dài của BLHĐ?', ['Có thể gây trầm cảm, tự tử ở nạn nhân', 'Không có gì nghiêm trọng', 'Tự khỏi sau vài ngày', 'Chỉ là chuyện vặt'], 0, 'BLHĐ có thể dẫn đến hậu quả nghiêm trọng lâu dài.', TT_SCHOOLV_RESULT, ['Đúng — BLHĐ có thể gây trầm cảm, tự tử ở nạn nhân.', 'Sai — BLHĐ có hậu quả rất nghiêm trọng.', 'Sai — sang chấn tâm lý không tự khỏi sau vài ngày.', 'Sai — BLHĐ không phải chuyện vặt mà rất nghiêm trọng.']),
    Q('Người ngoài cuộc đứng xem, quay clip BLHĐ?', ['Vô tội', 'Đúng', 'Có lợi', 'Cũng gián tiếp tiếp tay cho bạo lực, có thể bị xử lý'], 3, 'Người chứng kiến mà không can thiệp hay đăng clip cũng có trách nhiệm.', TT_SCHOOLV_RESULT, ['Sai — đứng xem, quay clip không phải vô tội.', 'Sai — đây là hành vi sai, không đúng.', 'Sai — việc này gây hại cho nạn nhân, không có lợi.', 'Đúng — người đứng xem, quay clip cũng gián tiếp tiếp tay cho bạo lực, có thể bị xử lý.']),
  ]),

  M(21, 'Phòng tránh bạo lực học đường', [
    Q('Khi bị bạn bắt nạt, em nên?', ['Trốn học', 'Im lặng chịu đựng', 'Đánh trả', 'Bình tĩnh tránh đi, báo thầy cô và người thân ngay'], 3, 'Báo thầy cô và người thân để được giúp đỡ.', TT_SCHOOLV_PREVENT, ['Sai — trốn học là né tránh, không giải quyết được vấn đề.', 'Sai — im lặng chịu đựng khiến bị bắt nạt kéo dài.', 'Sai — đánh trả làm bạo lực leo thang.', 'Đúng — bình tĩnh tránh đi, báo thầy cô và người thân ngay để được giúp đỡ.']),
    Q('Khi chứng kiến bạn bị bắt nạt, em nên?', ['Mặc kệ', 'Bênh vực và báo người lớn', 'Cùng tham gia', 'Quay clip đăng mạng'], 1, 'Bênh vực và báo thầy cô là đúng.', TT_SCHOOLV_PREVENT, ['Sai — mặc kệ là gián tiếp dung túng cho bạo lực.', 'Đúng — bênh vực và báo người lớn là cách giúp bạn đúng đắn.', 'Sai — cùng tham gia là tiếp tay cho bạo lực.', 'Sai — quay clip đăng mạng làm tổn thương nạn nhân thêm.']),
    Q('Để phòng BLHĐ, HS nên?', ['Tránh đến trường', 'Lập băng nhóm', 'Thủ vũ khí', 'Kết bạn lành mạnh, học kĩ năng giao tiếp, kiểm soát cảm xúc'], 3, 'Rèn kĩ năng và kết bạn lành mạnh là phòng tránh.', TT_SCHOOLV_PREVENT, ['Sai — tránh đến trường là né tránh, không phòng được BLHĐ.', 'Sai — lập băng nhóm dễ dẫn đến bạo lực.', 'Sai — thủ vũ khí là vi phạm pháp luật và nguy hiểm.', 'Đúng — kết bạn lành mạnh, học kĩ năng giao tiếp, kiểm soát cảm xúc là cách phòng BLHĐ.']),
    Q('Khi giận, em nên?', ['Đánh người', 'Đập phá', 'La hét', 'Hít sâu, đi ra ngoài, không hành động vội'], 3, 'Kiểm soát cơn giận để tránh hậu quả đáng tiếc.', TT_SCHOOLV_PREVENT, ['Sai — đánh người là bạo lực, gây hậu quả nghiêm trọng.', 'Sai — đập phá là phản ứng bạo lực, gây thiệt hại.', 'Sai — la hét không kiểm soát được cơn giận.', 'Đúng — hít sâu, đi ra ngoài, không hành động vội giúp kiểm soát cơn giận.']),
    Q('Khi bị đe doạ trên mạng, em nên?', ['Trả đũa lại', 'Lưu bằng chứng, chặn người đe doạ, báo người lớn', 'Im lặng chịu', 'Xoá tài khoản mạng xã hội rồi giữ kín, không cho ai biết'], 1, 'Lưu bằng chứng và báo người lớn là cách xử lý đúng.', TT_SCHOOLV_PREVENT, ['Sai — trả đũa làm xung đột leo thang.', 'Đúng — lưu bằng chứng, chặn người đe doạ, báo người lớn là cách xử lý đúng.', 'Sai — im lặng chịu khiến việc đe doạ tiếp diễn.', 'Sai — xoá tài khoản rồi giữ kín làm mất bằng chứng và không được hỗ trợ.']),
    Q('Để xây dựng môi trường lớp học không bạo lực, mỗi HS nên?', ['Ích kỉ', 'Cô lập bạn yếu', 'Im lặng trước cái sai', 'Tôn trọng khác biệt, hoà thuận, dám lên tiếng chống bạo lực'], 3, 'Mỗi HS đều có vai trò trong xây dựng môi trường an toàn.', TT_SCHOOLV_PREVENT, ['Sai — ích kỉ làm rạn nứt tình đoàn kết lớp.', 'Sai — cô lập bạn yếu là một dạng bạo lực tinh thần.', 'Sai — im lặng trước cái sai là dung túng cho bạo lực.', 'Đúng — tôn trọng khác biệt, hoà thuận, dám lên tiếng chống bạo lực giúp xây môi trường an toàn.']),
  ]),

  M(22, 'Trách nhiệm chống BLHĐ', [
    Q('Trách nhiệm chính của HS?', ['Không tham gia, không cổ vũ, dám lên tiếng', 'Quay clip để đăng mạng', 'Mặc kệ', 'Đứng xem cho vui và chia sẻ lại trên nhóm lớp'], 0, 'HS có trách nhiệm chống lại BLHĐ.', TT_SCHOOLV_DUTY, ['Đúng — không tham gia, không cổ vũ, dám lên tiếng là trách nhiệm của HS.', 'Sai — quay clip đăng mạng làm tổn thương nạn nhân thêm.', 'Sai — mặc kệ là thờ ơ, dung túng cho bạo lực.', 'Sai — đứng xem cho vui và chia sẻ lại là tiếp tay cho bạo lực.']),
    Q('Số điện thoại Tổng đài bảo vệ trẻ em?', ['113', '114', '115', '111'], 3, '111 là Tổng đài quốc gia bảo vệ trẻ em.', TT_SCHOOLV_DUTY, ['Sai — 113 là số cảnh sát phản ứng nhanh.', 'Sai — 114 là số cứu hoả.', 'Sai — 115 là số cấp cứu y tế.', 'Đúng — 111 là Tổng đài quốc gia bảo vệ trẻ em.']),
    Q('Khi vô tình tham gia bạo lực, em nên?', ['Đổ lỗi cho bạn', 'Dừng ngay, xin lỗi và sửa sai', 'Tiếp tục', 'Bỏ học'], 1, 'Nhận sai và sửa là việc đúng.', TT_SCHOOLV_DUTY, ['Sai — đổ lỗi cho bạn là né tránh trách nhiệm.', 'Đúng — dừng ngay, xin lỗi và sửa sai là việc đúng cần làm.', 'Sai — tiếp tục là tiếp tay cho bạo lực.', 'Sai — bỏ học là né tránh, không sửa được sai.']),
    Q('Nhà trường có vai trò gì trong chống BLHĐ?', ['Im lặng', 'Bao che', 'Đổ lỗi cho HS', 'Giáo dục, phát hiện và xử lý các vụ việc'], 3, 'Nhà trường có trách nhiệm chính trong phòng và xử lý BLHĐ.', TT_SCHOOLV_DUTY, ['Sai — im lặng là né tránh trách nhiệm của nhà trường.', 'Sai — bao che làm bạo lực tiếp diễn.', 'Sai — đổ lỗi cho HS là thiếu trách nhiệm.', 'Đúng — nhà trường có vai trò giáo dục, phát hiện và xử lý các vụ việc.']),
    Q('Gia đình có vai trò gì?', ['Mặc kệ con', 'Đổ lỗi cho con', 'Bao che mọi sai phạm của con', 'Quan tâm, lắng nghe, giáo dục con và phối hợp với nhà trường'], 3, 'Gia đình là tuyến đầu phòng ngừa và xử lý BLHĐ.', TT_SCHOOLV_DUTY, ['Sai — mặc kệ con là thiếu trách nhiệm của gia đình.', 'Sai — đổ lỗi cho con không giúp giải quyết vấn đề.', 'Sai — bao che mọi sai phạm làm con không sửa được lỗi.', 'Đúng — quan tâm, lắng nghe, giáo dục con và phối hợp với nhà trường là vai trò của gia đình.']),
  ]),

  // ===== Chủ đề 8: Quản lý tiền (T23–25) =====
  M(23, 'Quản lý tiền là gì?', [
    Q('Quản lý tiền là?', ['Tiêu hết tiền có', 'Cho người khác giữ hết', 'Giấu tiền không tiêu', 'Biết sử dụng tiền một cách hợp lý, có kế hoạch'], 3, 'Quản lý tiền là dùng tiền có kế hoạch, hợp lý.', TT_MONEY_DEF, ['Sai — tiêu hết tiền có là không biết quản lý.', 'Sai — cho người khác giữ hết không phải tự quản lý tiền.', 'Sai — giấu tiền không tiêu là cực đoan, không phải quản lý hợp lý.', 'Đúng — quản lý tiền là biết sử dụng tiền một cách hợp lý, có kế hoạch.']),
    Q('Vì sao HS cần học quản lý tiền?', ['Để biết tiết kiệm, dùng tiền hợp lý, không lãng phí', 'Để giàu nhanh', 'Để khoe với bạn', 'Để đầu cơ'], 0, 'Học quản lý tiền giúp dùng tiền có ích.', TT_MONEY_DEF, ['Đúng — học quản lý tiền giúp biết tiết kiệm, dùng tiền hợp lý, không lãng phí.', 'Sai — quản lý tiền không phải để giàu nhanh.', 'Sai — quản lý tiền không phải để khoe với bạn.', 'Sai — đầu cơ không phải mục đích học quản lý tiền của HS.']),
    Q('Nguyên tắc quản lý tiền cơ bản?', ['Tiêu thoả thích', 'Vay mượn nhiều', 'Mua mọi thứ thấy hay', 'Phân biệt cần và muốn, ghi chép thu chi, tiết kiệm'], 3, 'Cần/muốn + ghi chép + tiết kiệm là cơ bản.', TT_MONEY_DEF, ['Sai — tiêu thoả thích là không có kế hoạch, dễ thiếu hụt.', 'Sai — vay mượn nhiều dễ dẫn đến nợ nần.', 'Sai — mua mọi thứ thấy hay là tiêu xài thiếu kiểm soát.', 'Đúng — phân biệt cần và muốn, ghi chép thu chi, tiết kiệm là nguyên tắc cơ bản.']),
    Q('Phân biệt cần và muốn?', ['"Cần" là thứ đắt tiền, "muốn" là thứ rẻ tiền', 'Cần là muốn', 'Như nhau', '"Cần" là thiết yếu để sống/học; "muốn" là sở thích thêm'], 3, 'Cần và muốn khác nhau cơ bản về sự cần thiết.', TT_MONEY_DEF, ['Sai — cần/muốn phân biệt theo mức cần thiết, không theo giá tiền.', 'Sai — cần và muốn là hai khái niệm khác nhau.', 'Sai — cần và muốn không như nhau.', 'Đúng — "cần" là thiết yếu để sống/học, còn "muốn" là sở thích thêm.']),
    Q('Tiền tiêu vặt của HS thường đến từ?', ['Đi làm thêm full time', 'Trộm cắp', 'Cờ bạc', 'Bố mẹ cho, tiền thưởng, tiết kiệm lì xì'], 3, 'Nguồn tiền của HS chủ yếu từ bố mẹ và quà lì xì.', TT_MONEY_DEF, ['Sai — HS lớp 7 không đi làm thêm toàn thời gian.', 'Sai — trộm cắp là hành vi vi phạm pháp luật.', 'Sai — cờ bạc là tệ nạn xã hội.', 'Đúng — tiền tiêu vặt của HS chủ yếu từ bố mẹ cho, tiền thưởng, tiết kiệm lì xì.']),
  ]),

  M(24, 'Cách quản lý tiền hiệu quả', [
    Q('Khi nhận tiền tiêu vặt, em nên?', ['Chia thành: tiết kiệm, chi tiêu cần thiết, dự phòng', 'Giấu hết', 'Tiêu hết', 'Cho hết bạn'], 0, 'Chia tiền thành các phần với mục đích rõ ràng.', TT_MONEY_HOWTO, ['Đúng — chia thành tiết kiệm, chi tiêu cần thiết, dự phòng là cách quản lý tiền hiệu quả.', 'Sai — giấu hết là cực đoan, không phải quản lý hợp lý.', 'Sai — tiêu hết là không có kế hoạch, dễ thiếu hụt.', 'Sai — cho hết bạn là không quản lý được tiền của mình.']),
    Q('Em muốn mua đồ chơi đắt tiền không cần thiết, em nên?', ['Vay tiền mua', 'Đòi bố mẹ mua', 'Cân nhắc lại, để dành cho việc cần hơn', 'Mua ngay'], 2, 'Cân nhắc giữa cần và muốn trước khi mua.', TT_MONEY_HOWTO, ['Sai — vay tiền mua đồ không cần thiết dễ dẫn đến nợ nần.', 'Sai — đòi bố mẹ mua làm gia đình thêm gánh nặng.', 'Đúng — cân nhắc lại, để dành cho việc cần hơn là quyết định hợp lý.', 'Sai — mua ngay là tiêu xài thiếu cân nhắc.']),
    Q('Cách tiết kiệm tiền hiệu quả?', ['Giấu trong tủ rồi quên', 'Cho bạn vay', 'Tiêu ngay', 'Ống tiết kiệm, ghi chép, đặt mục tiêu cụ thể'], 3, 'Ghi chép và đặt mục tiêu giúp tiết kiệm hiệu quả.', TT_MONEY_HOWTO, ['Sai — giấu rồi quên không phải cách tiết kiệm có kế hoạch.', 'Sai — cho bạn vay không giúp mình tiết kiệm.', 'Sai — tiêu ngay là ngược với tiết kiệm.', 'Đúng — ống tiết kiệm, ghi chép, đặt mục tiêu cụ thể giúp tiết kiệm hiệu quả.']),
    Q('Em nhận tiền mừng tuổi 2 triệu, em nên?', ['Bàn với bố mẹ để dùng đúng (mua sách, tiết kiệm)', 'Tiêu hết trong ngày', 'Mời bạn đi chơi xa xỉ', 'Mua đồ chơi đắt'], 0, 'Bàn với bố mẹ và dùng đúng mục đích.', TT_MONEY_HOWTO, ['Đúng — bàn với bố mẹ để dùng đúng (mua sách, tiết kiệm) là cách hợp lý.', 'Sai — tiêu hết trong ngày là lãng phí, thiếu kế hoạch.', 'Sai — mời bạn đi chơi xa xỉ là tiêu xài phung phí.', 'Sai — mua đồ chơi đắt không cần thiết là lãng phí.']),
    Q('Cách kiếm thêm tiền phù hợp với HS lớp 7?', ['Làm việc nhà giúp, làm sản phẩm thủ công nhỏ phù hợp', 'Bỏ học đi làm', 'Vay nợ', 'Đánh bạc'], 0, 'HS có thể kiếm thêm bằng các việc phù hợp tuổi.', TT_MONEY_HOWTO, ['Đúng — làm việc nhà giúp, làm sản phẩm thủ công nhỏ là cách kiếm thêm phù hợp tuổi.', 'Sai — bỏ học đi làm ảnh hưởng nghiêm trọng đến tương lai.', 'Sai — vay nợ không phải cách kiếm tiền mà còn gây gánh nặng.', 'Sai — đánh bạc là tệ nạn vi phạm pháp luật.']),
    Q('Một quy tắc đơn giản chia tiền tiêu vặt?', ['100% tiêu', 'Tỷ lệ 50% tiêu cần - 30% tiết kiệm - 20% chia sẻ/dự phòng', '100% tiết kiệm', 'Cho hết bạn bè'], 1, 'Quy tắc 50-30-20 đơn giản giúp HS tập quản lý tiền.', TT_MONEY_HOWTO, ['Sai — tiêu 100% là không tiết kiệm, dễ thiếu hụt.', 'Đúng — tỷ lệ 50% tiêu cần - 30% tiết kiệm - 20% chia sẻ/dự phòng giúp tập quản lý tiền.', 'Sai — tiết kiệm 100% là cực đoan, không cân đối nhu cầu.', 'Sai — cho hết bạn bè là không quản lý được tiền của mình.']),
  ]),

  M(25, 'Ý nghĩa và rèn luyện quản lý tiền', [
    Q('Người biết quản lý tiền sẽ?', ['Trở nên keo kiệt', 'Chủ động trong cuộc sống, dễ đạt mục tiêu', 'Mất bạn', 'Khổ sở'], 1, 'Quản lý tiền tốt giúp chủ động cuộc sống.', TT_MONEY_MEANING, ['Sai — quản lý tiền khác với keo kiệt.', 'Đúng — người biết quản lý tiền chủ động trong cuộc sống, dễ đạt mục tiêu.', 'Sai — quản lý tiền hợp lý không làm mất bạn.', 'Sai — quản lý tiền giúp cuộc sống thoải mái hơn, không khổ sở.']),
    Q('Người KHÔNG biết quản lý tiền thường?', ['Hạnh phúc', 'Tự tin', 'Hay thiếu hụt, mắc nợ', 'Giàu nhanh'], 2, 'Không quản lý tiền dễ dẫn đến thiếu hụt, nợ nần.', TT_MONEY_MEANING, ['Sai — thiếu hụt tiền bạc khó mang lại hạnh phúc lâu dài.', 'Sai — thiếu hụt tiền khiến lo lắng, không tự tin.', 'Đúng — người không biết quản lý tiền thường hay thiếu hụt, mắc nợ.', 'Sai — không quản lý tiền khó giàu mà còn dễ nợ nần.']),
    Q('Để rèn quản lý tiền, em nên?', ['Bắt đầu từ ghi chép thu chi tiền tiêu vặt', 'Đợi lớn mới học', 'Không cần thiết', 'Mặc kệ'], 0, 'Bắt đầu từ ghi chép thu chi đơn giản.', TT_MONEY_MEANING, ['Đúng — bắt đầu từ ghi chép thu chi tiền tiêu vặt là cách rèn quản lý tiền.', 'Sai — đợi lớn mới học là bỏ lỡ cơ hội rèn luyện sớm.', 'Sai — rèn quản lý tiền rất cần thiết.', 'Sai — mặc kệ là thờ ơ, không rèn được kĩ năng quản lý tiền.']),
    Q('Trước khi mua đồ, em nên?', ['Mua ngay', 'Hỏi: thật sự cần không? có giá tốt hơn không?', 'Không suy nghĩ', 'Theo bạn'], 1, 'Cân nhắc trước khi mua giúp tiêu tiền hợp lý.', TT_MONEY_MEANING, ['Sai — mua ngay là tiêu xài thiếu cân nhắc.', 'Đúng — hỏi "thật sự cần không? có giá tốt hơn không?" giúp tiêu tiền hợp lý.', 'Sai — không suy nghĩ dễ dẫn đến lãng phí.', 'Sai — mua theo bạn là thiếu chính kiến, dễ lãng phí.']),
    Q('Quản lý tiền không có nghĩa là?', ['Có kế hoạch chi tiêu', 'Phân biệt cần/muốn', 'Tiết kiệm hợp lý', 'Keo kiệt, ki bo, không bao giờ chi tiêu cho ai'], 3, 'Quản lý tiền khác với keo kiệt — vẫn biết chi cho việc đáng.', TT_MONEY_MEANING, ['Sai — có kế hoạch chi tiêu chính là quản lý tiền.', 'Sai — phân biệt cần/muốn là một phần của quản lý tiền.', 'Sai — tiết kiệm hợp lý là biểu hiện của quản lý tiền.', 'Đúng — quản lý tiền không có nghĩa là keo kiệt, ki bo, không bao giờ chi tiêu cho ai.']),
  ]),

  // ===== Chủ đề 9: Phòng chống tệ nạn xã hội (T26–29) =====
  M(26, 'Tệ nạn xã hội là gì?', [
    Q('Tệ nạn xã hội là?', ['Hành vi sai lệch chuẩn mực xã hội, vi phạm pháp luật, đạo đức', 'Phong tục tốt đẹp', 'Lễ hội truyền thống', 'Hoạt động giải trí'], 0, 'Tệ nạn là hành vi xấu vi phạm đạo đức, pháp luật.', TT_SOCEVIL_DEF, ['Đúng — tệ nạn xã hội là hành vi sai lệch chuẩn mực xã hội, vi phạm pháp luật, đạo đức.', 'Sai — phong tục tốt đẹp là giá trị văn hoá, không phải tệ nạn.', 'Sai — lễ hội truyền thống là nét đẹp văn hoá.', 'Sai — hoạt động giải trí lành mạnh không phải tệ nạn.']),
    Q('Tệ nạn xã hội nguy hiểm nhất với HS?', ['Học nhóm', 'Ma tuý, cờ bạc, mại dâm, bạo lực, game bệnh lý', 'Đọc sách', 'Tập thể dục'], 1, 'Ma tuý, cờ bạc, mại dâm là tệ nạn nguy hiểm.', TT_SOCEVIL_DEF, ['Sai — học nhóm là hoạt động học tập lành mạnh.', 'Đúng — ma tuý, cờ bạc, mại dâm, bạo lực, game bệnh lý là tệ nạn nguy hiểm với HS.', 'Sai — đọc sách là hoạt động bổ ích.', 'Sai — tập thể dục là hoạt động tốt cho sức khoẻ.']),
    Q('Nguyên nhân HS sa vào tệ nạn?', ['Gia đình hạnh phúc', 'Tự tin', 'Thiếu hiểu biết, đua đòi, bạn bè rủ rê, thiếu sự quan tâm', 'Học giỏi'], 2, 'Thiếu hiểu biết và môi trường xấu dẫn đến tệ nạn.', TT_SOCEVIL_DEF, ['Sai — gia đình hạnh phúc giúp phòng tránh tệ nạn.', 'Sai — tự tin lành mạnh không dẫn đến tệ nạn.', 'Đúng — thiếu hiểu biết, đua đòi, bạn bè rủ rê, thiếu sự quan tâm dẫn HS sa vào tệ nạn.', 'Sai — học giỏi không phải nguyên nhân sa vào tệ nạn.']),
    Q('Câu nào KHÔNG phải tệ nạn?', ['Đánh bạc', 'Hút ma tuý', 'Đi học đều', 'Xem clip 18+'], 2, 'Đi học đều là hành vi tốt.', TT_SOCEVIL_DEF, ['Sai — đánh bạc là tệ nạn xã hội.', 'Sai — hút ma tuý là tệ nạn nguy hiểm.', 'Đúng — đi học đều là hành vi tốt, không phải tệ nạn.', 'Sai — xem clip 18+ là hành vi xấu, không phù hợp.']),
    Q('Mê tín dị đoan có phải tệ nạn xã hội?', ['Không', 'Có — tin nhảm vào điều phi lý gây hậu quả xấu', 'Là tín ngưỡng', 'Là tôn giáo'], 1, 'Mê tín dị đoan là tệ nạn xã hội cần bài trừ.', TT_SOCEVIL_DEF, ['Sai — mê tín dị đoan là tệ nạn cần bài trừ.', 'Đúng — mê tín dị đoan là tệ nạn, tin nhảm vào điều phi lý gây hậu quả xấu.', 'Sai — mê tín dị đoan khác với tín ngưỡng lành mạnh.', 'Sai — mê tín dị đoan không phải tôn giáo chính thống.']),
  ]),

  M(27, 'Tác hại của tệ nạn xã hội', [
    Q('Tác hại của tệ nạn với cá nhân?', ['Cải thiện sức khoẻ', 'Học giỏi hơn', 'Huỷ hoại sức khoẻ, đạo đức, học tập, tương lai', 'Có nhiều tiền'], 2, 'Tệ nạn huỷ hoại sức khoẻ và tương lai cá nhân.', TT_SOCEVIL_HARM, ['Sai — tệ nạn huỷ hoại sức khoẻ chứ không cải thiện.', 'Sai — tệ nạn làm sa sút học tập, không giúp học giỏi.', 'Đúng — tệ nạn huỷ hoại sức khoẻ, đạo đức, học tập, tương lai cá nhân.', 'Sai — tệ nạn làm kiệt quệ kinh tế, không mang lại nhiều tiền.']),
    Q('Tác hại của tệ nạn với gia đình?', ['Giàu lên', 'Tan vỡ, kinh tế kiệt quệ, danh dự bị tổn hại', 'Đoàn kết', 'Hạnh phúc'], 1, 'Tệ nạn làm tan vỡ gia đình.', TT_SOCEVIL_HARM, ['Sai — tệ nạn làm kiệt quệ kinh tế, không giàu lên.', 'Đúng — tệ nạn làm gia đình tan vỡ, kinh tế kiệt quệ, danh dự bị tổn hại.', 'Sai — tệ nạn gây rạn nứt, không đoàn kết.', 'Sai — tệ nạn phá vỡ hạnh phúc gia đình.']),
    Q('Tác hại của tệ nạn với xã hội?', ['Mất trật tự, gia tăng tội phạm, kìm hãm phát triển', 'Phát triển nhanh', 'Không ảnh hưởng', 'Văn minh hơn'], 0, 'Tệ nạn cản trở sự phát triển xã hội.', TT_SOCEVIL_HARM, ['Đúng — tệ nạn gây mất trật tự, gia tăng tội phạm, kìm hãm phát triển.', 'Sai — tệ nạn kìm hãm phát triển, không giúp phát triển nhanh.', 'Sai — tệ nạn có ảnh hưởng tiêu cực rõ rệt đến xã hội.', 'Sai — tệ nạn làm xã hội suy thoái, không văn minh hơn.']),
    Q('Ma tuý đặc biệt nguy hiểm vì?', ['Gây nghiện, huỷ hoại thần kinh, lây HIV/AIDS', 'Tăng IQ', 'Tốt cho sức khoẻ', 'Không gây nghiện'], 0, 'Ma tuý gây nghiện và nhiều hệ luỵ nguy hiểm.', TT_SOCEVIL_HARM, ['Đúng — ma tuý gây nghiện, huỷ hoại thần kinh, lây HIV/AIDS qua dùng chung kim tiêm.', 'Sai — ma tuý huỷ hoại não, không tăng IQ.', 'Sai — ma tuý cực kỳ hại cho sức khoẻ.', 'Sai — ma tuý gây nghiện rất mạnh.']),
    Q('Tác hại lớn nhất của tệ nạn với HS là?', ['Bị ốm nhẹ', 'Không đáng kể', 'Tốn tiền vặt', 'Huỷ hoại tương lai, sa sút học tập, đạo đức'], 3, 'Tệ nạn cướp đi tương lai và sự nghiệp học tập của HS.', TT_SOCEVIL_HARM, ['Sai — tệ nạn gây hậu quả nặng hơn nhiều so với ốm nhẹ.', 'Sai — tác hại của tệ nạn rất đáng kể.', 'Sai — tệ nạn gây hậu quả nghiêm trọng hơn việc tốn tiền vặt.', 'Đúng — tệ nạn huỷ hoại tương lai, sa sút học tập, đạo đức của HS.']),
  ]),

  M(28, 'Phòng tránh tệ nạn xã hội', [
    Q('Khi bạn rủ thử ma tuý "cho biết", em nên?', ['Từ chối dứt khoát và rời đi ngay', 'Thử cho biết', 'Im lặng đồng ý', 'Đắn đo'], 0, 'Tuyệt đối không thử dù chỉ một lần.', TT_SOCEVIL_PREVENT, ['Đúng — từ chối dứt khoát và rời đi ngay là cách đúng, không thử dù một lần.', 'Sai — thử cho biết dễ dẫn đến nghiện ngay từ lần đầu.', 'Sai — im lặng đồng ý là chấp nhận sa vào tệ nạn.', 'Sai — đắn đo dễ bị lôi kéo, cần từ chối dứt khoát.']),
    Q('Để phòng tệ nạn, em nên?', ['Đi đêm khuya', 'Vào quán net thâu đêm', 'Chơi với người xấu cho biết', 'Chọn bạn tốt, sử dụng thời gian rảnh có ích, lắng nghe gia đình'], 3, 'Chọn bạn tốt và môi trường lành mạnh.', TT_SOCEVIL_PREVENT, ['Sai — đi đêm khuya dễ gặp môi trường xấu, nguy hiểm.', 'Sai — vào quán net thâu đêm dễ sa vào game bệnh lý.', 'Sai — chơi với người xấu dễ bị lôi kéo vào tệ nạn.', 'Đúng — chọn bạn tốt, sử dụng thời gian rảnh có ích, lắng nghe gia đình giúp phòng tệ nạn.']),
    Q('Khi phát hiện bạn dùng ma tuý, em nên?', ['Trêu chọc', 'Im lặng', 'Báo gia đình bạn, thầy cô để có biện pháp giúp', 'Cùng dùng'], 2, 'Báo người lớn để giúp bạn cai nghiện.', TT_SOCEVIL_PREVENT, ['Sai — trêu chọc làm bạn tổn thương, không giúp được.', 'Sai — im lặng làm bạn sa sâu hơn vào nghiện.', 'Đúng — báo gia đình bạn, thầy cô để có biện pháp giúp bạn cai nghiện.', 'Sai — cùng dùng là sa vào tệ nạn cùng bạn.']),
    Q('Để tránh nghiện game/mạng xã hội, em nên?', ['Chơi cả đêm', 'Bỏ học chơi game', 'Vay tiền nạp game', 'Đặt giới hạn thời gian, có sở thích lành mạnh khác'], 3, 'Đặt giới hạn và có sở thích khác để cân bằng.', TT_SOCEVIL_PREVENT, ['Sai — chơi cả đêm dễ dẫn đến nghiện game.', 'Sai — bỏ học chơi game ảnh hưởng nghiêm trọng tương lai.', 'Sai — vay tiền nạp game dễ dẫn đến nợ nần và nghiện nặng.', 'Đúng — đặt giới hạn thời gian, có sở thích lành mạnh khác giúp tránh nghiện.']),
    Q('Khi gặp người lạ rủ làm việc kiếm tiền dễ, em nên?', ['Đi ngay', 'Mặc kệ luật pháp', 'Tự quyết định', 'Cảnh giác, hỏi ý kiến gia đình'], 3, 'Cảnh giác với "việc dễ tiền nhiều" của người lạ.', TT_SOCEVIL_PREVENT, ['Sai — đi ngay với người lạ rất nguy hiểm.', 'Sai — mặc kệ luật pháp dễ vướng vào việc phạm pháp.', 'Sai — tự quyết định mà không hỏi ai dễ bị lừa.', 'Đúng — cảnh giác, hỏi ý kiến gia đình giúp tránh bẫy của người lạ.']),
    Q('Cách từ chối khéo khi bị bạn rủ vào tệ nạn?', ['Đồng ý cho qua', 'Nói thẳng "không", đưa ra lý do, rút khỏi tình huống và đi', 'Im lặng', 'Đắn đo'], 1, 'Kĩ năng từ chối dứt khoát giúp tránh tệ nạn.', TT_SOCEVIL_PREVENT, ['Sai — đồng ý cho qua là sa vào tệ nạn.', 'Đúng — nói thẳng "không", đưa ra lý do, rút khỏi tình huống và đi là cách từ chối khéo.', 'Sai — im lặng dễ bị hiểu là đồng ý.', 'Sai — đắn đo dễ bị lôi kéo, cần dứt khoát.']),
  ]),

  M(29, 'Pháp luật về phòng chống tệ nạn', [
    Q('Sử dụng ma tuý ở Việt Nam là?', ['Khuyến khích', 'Tự do cá nhân', 'Vi phạm pháp luật, có thể bị xử lý hình sự', 'Hợp pháp'], 2, 'Pháp luật cấm sử dụng và buôn bán ma tuý.', TT_SOCEVIL_LAW, ['Sai — pháp luật cấm chứ không khuyến khích dùng ma tuý.', 'Sai — dùng ma tuý không phải tự do cá nhân mà là vi phạm pháp luật.', 'Đúng — sử dụng ma tuý là vi phạm pháp luật, có thể bị xử lý hình sự.', 'Sai — sử dụng ma tuý là bất hợp pháp.']),
    Q('Đánh bạc dưới mọi hình thức là?', ['Hành vi vi phạm pháp luật', 'Trò chơi giải trí', 'Hợp pháp', 'Khuyến khích'], 0, 'Đánh bạc trái phép là vi phạm pháp luật.', TT_SOCEVIL_LAW, ['Đúng — đánh bạc dưới mọi hình thức là hành vi vi phạm pháp luật.', 'Sai — đánh bạc là tệ nạn, không phải trò chơi giải trí lành mạnh.', 'Sai — đánh bạc trái phép là bất hợp pháp.', 'Sai — pháp luật cấm chứ không khuyến khích đánh bạc.']),
    Q('HS chưa đủ 18 tuổi vi phạm pháp luật về tệ nạn sẽ?', ['Được khen', 'Bị xử lý theo Luật Trẻ em và pháp luật liên quan', 'Được giải thoát', 'Không bị gì'], 1, 'Trẻ em vi phạm vẫn bị xử lý theo pháp luật phù hợp.', TT_SOCEVIL_LAW, ['Sai — vi phạm pháp luật không được khen.', 'Đúng — HS chưa đủ 18 tuổi vi phạm bị xử lý theo Luật Trẻ em và pháp luật liên quan.', 'Sai — vi phạm không được giải thoát khỏi trách nhiệm.', 'Sai — vi phạm vẫn bị xử lý theo pháp luật phù hợp tuổi.']),
    Q('Trách nhiệm của công dân trong phòng tệ nạn?', ['Tham gia', 'Tự giác chấp hành, tố giác hành vi vi phạm', 'Bao che', 'Mặc kệ'], 1, 'Công dân có trách nhiệm phòng và tố giác tệ nạn.', TT_SOCEVIL_LAW, ['Sai — tham gia tệ nạn là vi phạm, không phải trách nhiệm.', 'Đúng — tự giác chấp hành, tố giác hành vi vi phạm là trách nhiệm công dân.', 'Sai — bao che là tiếp tay cho tệ nạn.', 'Sai — mặc kệ là thờ ơ, thiếu trách nhiệm.']),
    Q('Số điện thoại đường dây nóng phòng chống ma tuý quốc gia?', ['111', '1800.1567', '113', '114'], 2, '113 là đường dây an ninh; có thể gọi 113 hoặc 1800.1567 (tổng đài bảo vệ trẻ em).', TT_SOCEVIL_LAW, ['Sai — 111 là Tổng đài quốc gia bảo vệ trẻ em.', 'Sai — 1800.1567 là tổng đài bảo vệ trẻ em, không phải an ninh.', 'Đúng — 113 là đường dây an ninh có thể gọi khi liên quan ma tuý, tội phạm.', 'Sai — 114 là số cứu hoả.']),
  ]),

  // ===== Chủ đề 10: Quyền và nghĩa vụ của trẻ em (T30–34) =====
  M(30, 'Quyền cơ bản của trẻ em', [
    Q('Trẻ em theo Luật Việt Nam là người?', ['Dưới 18 tuổi', 'Dưới 16 tuổi', 'Dưới 12 tuổi', 'Dưới 20 tuổi'], 1, 'Theo Luật Trẻ em 2016, trẻ em là người dưới 16 tuổi.', TT_KID_RIGHTS, ['Sai — dưới 18 tuổi là người chưa thành niên, không phải định nghĩa trẻ em ở VN.', 'Đúng — theo Luật Trẻ em 2016, trẻ em là người dưới 16 tuổi.', 'Sai — Luật Trẻ em quy định dưới 16 tuổi, không phải dưới 12.', 'Sai — không phải dưới 20 tuổi.']),
    Q('Bốn nhóm quyền cơ bản của trẻ em theo Công ước LHQ?', ['Ăn — uống — ngủ — chơi', 'Sống còn, được bảo vệ, được phát triển, được tham gia', 'Học — chơi — ngủ — ăn', 'Không có nhóm'], 1, 'Công ước LHQ về quyền trẻ em chia 4 nhóm quyền cơ bản.', TT_KID_RIGHTS, ['Sai — đây là các nhu cầu sinh hoạt, không phải nhóm quyền.', 'Đúng — bốn nhóm quyền là sống còn, được bảo vệ, được phát triển, được tham gia.', 'Sai — đây là hoạt động hàng ngày, không phải nhóm quyền.', 'Sai — Công ước LHQ có 4 nhóm quyền rõ ràng.']),
    Q('Trẻ em có quyền được bảo vệ khỏi?', ['Bạo lực, xâm hại, bóc lột, ma tuý', 'Học tập', 'Vui chơi', 'Yêu thương'], 0, 'Trẻ em có quyền được bảo vệ khỏi mọi hình thức xâm hại.', TT_KID_RIGHTS, ['Đúng — trẻ em có quyền được bảo vệ khỏi bạo lực, xâm hại, bóc lột, ma tuý.', 'Sai — học tập là quyền của trẻ, không cần bảo vệ khỏi nó.', 'Sai — vui chơi là quyền của trẻ.', 'Sai — yêu thương là điều trẻ cần, không phải thứ cần bảo vệ khỏi.']),
    Q('Quyền được phát triển bao gồm?', ['Kết hôn sớm', 'Đi làm', 'Bỏ học', 'Học tập, vui chơi, hoạt động văn hoá, thể thao'], 3, 'Quyền phát triển bao gồm học tập, vui chơi.', TT_KID_RIGHTS, ['Sai — kết hôn sớm là tảo hôn, vi phạm pháp luật.', 'Sai — đi làm sớm bỏ học không phải quyền phát triển.', 'Sai — bỏ học là cản trở phát triển của trẻ.', 'Đúng — quyền phát triển bao gồm học tập, vui chơi, hoạt động văn hoá, thể thao.']),
    Q('Trẻ em có quyền tham gia có nghĩa là?', ['Không cần nghe ai', 'Tham gia mọi việc của người lớn', 'Được nêu ý kiến về các vấn đề liên quan đến mình', 'Quyết định mọi việc'], 2, 'Quyền tham gia = có tiếng nói về các vấn đề liên quan mình.', TT_KID_RIGHTS, ['Sai — quyền tham gia không có nghĩa là không cần nghe ai.', 'Sai — trẻ em không tham gia mọi việc của người lớn.', 'Đúng — quyền tham gia là được nêu ý kiến về các vấn đề liên quan đến mình.', 'Sai — trẻ em không quyết định mọi việc mà chỉ nêu ý kiến phù hợp.']),
    Q('Quyền sống còn của trẻ em bao gồm?', ['Được khai sinh, được sống, được chăm sóc sức khoẻ, dinh dưỡng', 'Bị bỏ rơi', 'Bị bỏ đói', 'Không có quyền nào'], 0, 'Quyền sống còn là quyền cơ bản nhất, gồm sống, khai sinh, dinh dưỡng.', TT_KID_RIGHTS, ['Đúng — quyền sống còn gồm được khai sinh, được sống, được chăm sóc sức khoẻ, dinh dưỡng.', 'Sai — bị bỏ rơi là vi phạm quyền, không phải quyền sống còn.', 'Sai — bị bỏ đói là xâm hại trẻ, không phải quyền.', 'Sai — trẻ em có quyền sống còn rõ ràng.']),
  ]),

  M(31, 'Nghĩa vụ của trẻ em', [
    Q('Nghĩa vụ của trẻ em với gia đình?', ['Ra lệnh', 'Không cần làm gì', 'Kính trọng, lễ phép, giúp đỡ ông bà cha mẹ', 'Đòi hỏi'], 2, 'Trẻ em có nghĩa vụ kính trọng, giúp đỡ gia đình.', TT_KID_DUTY, ['Sai — ra lệnh là thiếu lễ phép, không phải nghĩa vụ.', 'Sai — trẻ em có nghĩa vụ với gia đình, không phải không cần làm gì.', 'Đúng — kính trọng, lễ phép, giúp đỡ ông bà cha mẹ là nghĩa vụ với gia đình.', 'Sai — đòi hỏi là ích kỉ, không phải nghĩa vụ.']),
    Q('Nghĩa vụ của trẻ em với nhà trường?', ['Bỏ học', 'Quậy phá', 'Chống đối', 'Chăm chỉ học tập, tuân thủ nội quy, kính trọng thầy cô'], 3, 'Học sinh có nghĩa vụ học tập và tuân thủ nội quy.', TT_KID_DUTY, ['Sai — bỏ học là không thực hiện nghĩa vụ học tập.', 'Sai — quậy phá là vi phạm nội quy nhà trường.', 'Sai — chống đối là thiếu tôn trọng nhà trường.', 'Đúng — chăm chỉ học tập, tuân thủ nội quy, kính trọng thầy cô là nghĩa vụ với nhà trường.']),
    Q('Nghĩa vụ của trẻ em với cộng đồng?', ['Mặc kệ', 'Chỉ tham gia khi được thưởng hoặc được khen', 'Tôn trọng pháp luật, bảo vệ môi trường, giúp đỡ người khác', 'Vi phạm'], 2, 'Trẻ em có trách nhiệm với cộng đồng phù hợp tuổi.', TT_KID_DUTY, ['Sai — mặc kệ là thờ ơ với cộng đồng.', 'Sai — chỉ tham gia khi được thưởng là động cơ lệch lạc.', 'Đúng — tôn trọng pháp luật, bảo vệ môi trường, giúp đỡ người khác là nghĩa vụ với cộng đồng.', 'Sai — vi phạm là trái với nghĩa vụ công dân.']),
    Q('Nghĩa vụ với bản thân?', ['Ăn vô độ', 'Lười biếng', 'Rèn luyện đạo đức, sức khoẻ, học tập', 'Bỏ học'], 2, 'Rèn luyện bản thân là nghĩa vụ với chính mình.', TT_KID_DUTY, ['Sai — ăn vô độ hại sức khoẻ, không phải nghĩa vụ.', 'Sai — lười biếng là thói xấu, không phải nghĩa vụ.', 'Đúng — rèn luyện đạo đức, sức khoẻ, học tập là nghĩa vụ với bản thân.', 'Sai — bỏ học là không thực hiện nghĩa vụ học tập.']),
    Q('Trẻ em có cả quyền và nghĩa vụ vì?', ['Để bị phạt', 'Quyền và nghĩa vụ là hai mặt thống nhất, gắn liền nhau', 'Vô lý', 'Để khoe'], 1, 'Hưởng quyền đi đôi với thực hiện nghĩa vụ.', TT_KID_DUTY, ['Sai — quyền và nghĩa vụ không phải để bị phạt.', 'Đúng — quyền và nghĩa vụ là hai mặt thống nhất, gắn liền nhau.', 'Sai — việc có cả quyền và nghĩa vụ là hợp lý, không vô lý.', 'Sai — quyền và nghĩa vụ không phải để khoe.']),
  ]),

  M(32, 'Bảo vệ quyền trẻ em', [
    Q('Khi bị xâm hại, trẻ em nên?', ['Im lặng', 'Bỏ nhà đi', 'Trả thù', 'Báo người tin cậy, gọi 111 (Tổng đài bảo vệ trẻ em)'], 3, 'Gọi 111 hoặc báo người lớn tin cậy ngay lập tức.', TT_KID_PROTECT, ['Sai — im lặng khiến việc xâm hại tiếp diễn.', 'Sai — bỏ nhà đi rất nguy hiểm và không giải quyết được vấn đề.', 'Sai — trả thù là phản ứng tiêu cực, có thể vi phạm pháp luật.', 'Đúng — báo người tin cậy, gọi 111 (Tổng đài bảo vệ trẻ em) ngay lập tức.']),
    Q('Số điện thoại Tổng đài bảo vệ trẻ em là?', ['115', '114', '111', '113'], 2, '111 là Tổng đài quốc gia bảo vệ trẻ em.', TT_KID_PROTECT, ['Sai — 115 là số cấp cứu y tế.', 'Sai — 114 là số cứu hoả.', 'Đúng — 111 là Tổng đài quốc gia bảo vệ trẻ em.', 'Sai — 113 là số cảnh sát phản ứng nhanh.']),
    Q('Khi thấy bạn bị bạo hành gia đình, em nên?', ['Mặc kệ', 'Quay clip đăng mạng', 'Báo người lớn, cô giáo, hoặc gọi 111', 'Khuyên bạn nhịn'], 2, 'Báo người có trách nhiệm để bảo vệ bạn.', TT_KID_PROTECT, ['Sai — mặc kệ là thờ ơ khi bạn cần được bảo vệ.', 'Sai — quay clip đăng mạng làm tổn thương bạn thêm.', 'Đúng — báo người lớn, cô giáo, hoặc gọi 111 để bảo vệ bạn.', 'Sai — khuyên bạn nhịn khiến bạo hành tiếp diễn.']),
    Q('Trường hợp nào người lớn vi phạm quyền trẻ em?', ['Chăm sóc sức khoẻ', 'Cho trẻ đi học', 'Bắt trẻ em làm việc nặng, bỏ học', 'Yêu thương trẻ'], 2, 'Bắt trẻ làm việc nặng, bỏ học là vi phạm quyền.', TT_KID_PROTECT, ['Sai — chăm sóc sức khoẻ là thực hiện quyền của trẻ.', 'Sai — cho trẻ đi học là bảo đảm quyền học tập.', 'Đúng — bắt trẻ em làm việc nặng, bỏ học là vi phạm quyền trẻ em.', 'Sai — yêu thương trẻ là điều trẻ cần, không vi phạm quyền.']),
    Q('Vai trò của Luật Trẻ em 2016?', ['Quy định quyền, bảo vệ và chăm sóc trẻ em ở VN', 'Cấm trẻ em', 'Không có vai trò', 'Hạn chế quyền trẻ'], 0, 'Luật Trẻ em 2016 là cơ sở pháp lý bảo vệ trẻ em.', TT_KID_PROTECT, ['Đúng — Luật Trẻ em 2016 quy định quyền, bảo vệ và chăm sóc trẻ em ở VN.', 'Sai — Luật Trẻ em bảo vệ chứ không cấm trẻ em.', 'Sai — Luật Trẻ em có vai trò pháp lý quan trọng.', 'Sai — Luật Trẻ em bảo đảm chứ không hạn chế quyền trẻ.']),
    Q('Bố mẹ đánh con để dạy dỗ là?', ['Quyền hợp pháp của cha mẹ', 'Truyền thống tốt', 'Cần thiết', 'Vi phạm quyền trẻ em — bị Luật nghiêm cấm'], 3, 'Mọi hình thức bạo hành trẻ đều bị Luật Trẻ em 2016 cấm.', TT_KID_PROTECT, ['Sai — đánh con không phải quyền hợp pháp của cha mẹ.', 'Sai — bạo hành trẻ không phải truyền thống tốt.', 'Sai — đánh con không cần thiết và gây tổn thương.', 'Đúng — bố mẹ đánh con là vi phạm quyền trẻ em, bị Luật Trẻ em 2016 nghiêm cấm.']),
  ]),

  M(33, 'Trách nhiệm của HS với quyền trẻ em', [
    Q('Em hiểu quyền của mình, em nên?', ['Đòi hỏi quá mức', 'Coi thường người khác', 'Lạm dụng quyền', 'Thực hiện đúng quyền và tôn trọng quyền của bạn'], 3, 'Thực hiện đúng quyền và tôn trọng người khác.', TT_KID_SELF, ['Sai — đòi hỏi quá mức là lạm dụng quyền.', 'Sai — coi thường người khác là thiếu tôn trọng quyền của họ.', 'Sai — lạm dụng quyền là sai trái.', 'Đúng — thực hiện đúng quyền và tôn trọng quyền của bạn là cách hành xử đúng.']),
    Q('Khi quyền của em bị vi phạm, em nên?', ['Bày tỏ ý kiến với người tin cậy, nhờ giúp đỡ', 'Bạo lực', 'Trả thù', 'Im lặng chịu đựng'], 0, 'Bày tỏ và nhờ giúp đỡ là cách đúng.', TT_KID_SELF, ['Đúng — bày tỏ ý kiến với người tin cậy, nhờ giúp đỡ là cách đúng.', 'Sai — bạo lực là phản ứng sai, có thể vi phạm pháp luật.', 'Sai — trả thù là phản ứng tiêu cực, làm tình hình tệ hơn.', 'Sai — im lặng chịu đựng khiến vi phạm tiếp diễn.']),
    Q('Em là trẻ em, em có quyền tham gia ý kiến?', ['Không, phải đợi 18 tuổi', 'Đúng, em được phát biểu ý kiến trong gia đình, lớp', 'Chỉ con trai có quyền', 'Không cần ai nghe'], 1, 'Trẻ em có quyền tham gia ý kiến phù hợp tuổi.', TT_KID_SELF, ['Sai — trẻ em có quyền tham gia ý kiến, không phải đợi 18 tuổi.', 'Đúng — em có quyền phát biểu ý kiến trong gia đình, lớp.', 'Sai — quyền tham gia áp dụng cho cả con trai và con gái.', 'Sai — ý kiến của trẻ em cần được lắng nghe.']),
    Q('Khi tham gia mạng xã hội, em nên?', ['Đăng địa chỉ nhà', 'Cung cấp đủ thông tin', 'Bảo vệ thông tin cá nhân, không kết bạn người lạ', 'Hẹn gặp người lạ'], 2, 'Bảo vệ thông tin cá nhân khi online.', TT_KID_SELF, ['Sai — đăng địa chỉ nhà rất nguy hiểm.', 'Sai — cung cấp đủ thông tin cá nhân dễ bị lợi dụng.', 'Đúng — bảo vệ thông tin cá nhân, không kết bạn người lạ giúp an toàn online.', 'Sai — hẹn gặp người lạ trên mạng rất nguy hiểm.']),
    Q('Lời khuyên cho HS để bảo vệ mình?', ['Tự xử lý mọi việc', 'Học kĩ năng sống, không giấu giếm khi gặp khó, tin cậy người thân', 'Mặc kệ', 'Cô lập'], 1, 'Học kĩ năng và chia sẻ với người tin cậy.', TT_KID_SELF, ['Sai — tự xử lý mọi việc một mình dễ gặp nguy hiểm.', 'Đúng — học kĩ năng sống, không giấu giếm khi gặp khó, tin cậy người thân giúp bảo vệ mình.', 'Sai — mặc kệ là thờ ơ với chính sự an toàn của mình.', 'Sai — cô lập khiến không nhận được hỗ trợ khi cần.']),
    Q('Khi gặp người lạ trên mạng rủ gặp mặt, em nên?', ['Đi gặp ngay', 'Cho địa chỉ nhà', 'Cảnh giác, không gặp riêng người lạ, nói với bố mẹ', 'Tự đi một mình'], 2, 'Cảnh giác trước người lạ trên mạng là bảo vệ chính mình.', TT_KID_SELF, ['Sai — đi gặp ngay người lạ trên mạng rất nguy hiểm.', 'Sai — cho địa chỉ nhà cho người lạ là nguy hiểm.', 'Đúng — cảnh giác, không gặp riêng người lạ, nói với bố mẹ là bảo vệ chính mình.', 'Sai — tự đi một mình gặp người lạ rất nguy hiểm.']),
  ]),

  M(34, 'Ôn tập học kì 2 — Tổng kết', [
    Q('Khi bị bắt nạt ở trường, em nên?', ['Báo thầy cô và gia đình ngay', 'Đánh trả', 'Trốn học', 'Im lặng'], 0, 'Báo thầy cô và gia đình là cách giải quyết đúng.', TT_REVIEW, ['Đúng — báo thầy cô và gia đình ngay là cách giải quyết đúng.', 'Sai — đánh trả làm bạo lực leo thang.', 'Sai — trốn học là né tránh, không giải quyết được.', 'Sai — im lặng khiến bị bắt nạt kéo dài.']),
    Q('Quản lý tiền hiệu quả cần?', ['Giấu tiền', 'Vay nợ', 'Ghi chép, phân biệt cần/muốn, tiết kiệm', 'Tiêu thoả thích'], 2, 'Ghi chép và tiết kiệm là cơ bản.', TT_REVIEW, ['Sai — giấu tiền là cực đoan, không phải quản lý hợp lý.', 'Sai — vay nợ dễ dẫn đến gánh nặng tài chính.', 'Đúng — ghi chép, phân biệt cần/muốn, tiết kiệm là quản lý tiền hiệu quả.', 'Sai — tiêu thoả thích là không có kế hoạch, dễ thiếu hụt.']),
    Q('Tệ nạn nguy hiểm nhất với HS?', ['Đọc sách', 'Ma tuý, cờ bạc, game bệnh lý', 'Học giỏi', 'Tập thể dục'], 1, 'Ma tuý, cờ bạc, game bệnh lý rất nguy hiểm.', TT_REVIEW, ['Sai — đọc sách là hoạt động bổ ích.', 'Đúng — ma tuý, cờ bạc, game bệnh lý là tệ nạn nguy hiểm nhất với HS.', 'Sai — học giỏi là điều tốt, không phải tệ nạn.', 'Sai — tập thể dục là hoạt động tốt cho sức khoẻ.']),
    Q('Bốn nhóm quyền trẻ em?', ['Ăn — ngủ — chơi — học', 'Sống còn, bảo vệ, phát triển, tham gia', 'Học — chơi', '1 nhóm chung'], 1, '4 nhóm theo Công ước LHQ về quyền trẻ em.', TT_REVIEW, ['Sai — đây là hoạt động hàng ngày, không phải nhóm quyền.', 'Đúng — bốn nhóm quyền là sống còn, bảo vệ, phát triển, tham gia.', 'Sai — đây không phải đủ bốn nhóm quyền.', 'Sai — quyền trẻ em chia thành 4 nhóm, không phải 1.']),
    Q('Khi bị xâm hại, gọi số nào?', ['111', '113', '115', '114'], 0, '111 — Tổng đài quốc gia bảo vệ trẻ em.', TT_REVIEW, ['Đúng — 111 là Tổng đài quốc gia bảo vệ trẻ em.', 'Sai — 113 là số cảnh sát phản ứng nhanh.', 'Sai — 115 là số cấp cứu y tế.', 'Sai — 114 là số cứu hoả.']),
    Q('Bài học lớn nhất em rút ra cả năm GDCD 7?', ['Sống cô lập', 'Trở thành công dân tốt: yêu nước, tự giác, có chữ tín, biết quản lý bản thân và tôn trọng pháp luật', 'Chỉ học cho thi', 'Không cần đạo đức'], 1, 'Mục tiêu chung của môn GDCD là rèn công dân toàn diện.', TT_REVIEW, ['Sai — sống cô lập trái với mục tiêu giáo dục công dân.', 'Đúng — trở thành công dân tốt: yêu nước, tự giác, có chữ tín, biết quản lý bản thân và tôn trọng pháp luật.', 'Sai — học chỉ để thi là động cơ lệch lạc.', 'Sai — đạo đức là cốt lõi của môn GDCD.']),
  ]),

  // ===== T35: Tổng ôn cuối năm =====
  M(35, 'Tổng ôn cuối năm', [
    Q('Truyền thống quê hương cần được?', ['Giữ gìn và phát huy', 'Sao chép nơi khác', 'Chỉ lưu giữ trong bảo tàng, không dạy lại cho trẻ', 'Bỏ hết'], 0, 'Giữ gìn và phát huy là trách nhiệm chung.', TT_REVIEW, ['Đúng — truyền thống quê hương cần được giữ gìn và phát huy.', 'Sai — sao chép nơi khác làm mất bản sắc quê mình.', 'Sai — chỉ lưu giữ trong bảo tàng mà không dạy lại thì truyền thống dễ mai một.', 'Sai — bỏ hết là đánh mất truyền thống.']),
    Q('Học tập tự giác là?', ['Học khi bị ép', 'Tự chủ động học mà không cần nhắc', 'Học vì thưởng', 'Học theo phong trào'], 1, 'Tự giác là chủ động.', TT_REVIEW, ['Sai — học khi bị ép là thụ động, ngược với tự giác.', 'Đúng — tự chủ động học mà không cần nhắc là học tự giác.', 'Sai — học vì thưởng là động cơ lệch lạc, không tự giác.', 'Sai — học theo phong trào thiếu chủ động riêng.']),
    Q('Giữ chữ tín giúp?', ['Được tin cậy và thành công', 'Bị xa lánh', 'Mất bạn', 'Khổ sở'], 0, 'Chữ tín tạo nên uy tín và thành công.', TT_REVIEW, ['Đúng — giữ chữ tín giúp được tin cậy và thành công.', 'Sai — giữ chữ tín được quý mến, không bị xa lánh.', 'Sai — giữ chữ tín giúp giữ bạn, không làm mất bạn.', 'Sai — giữ chữ tín mang lại uy tín, không khổ sở.']),
    Q('Bảo tồn di sản văn hoá là?', ['Mặc kệ', 'Tôn trọng, giữ gìn, quảng bá', 'Bán đi', 'Cải biên hiện vật cho hợp thị hiếu hiện đại'], 1, 'Tôn trọng và giữ gìn là bảo tồn di sản.', TT_REVIEW, ['Sai — mặc kệ là thờ ơ, không bảo tồn được di sản.', 'Đúng — tôn trọng, giữ gìn, quảng bá là bảo tồn di sản.', 'Sai — bán đi là đánh mất di sản.', 'Sai — tự ý cải biên hiện vật làm sai lệch giá trị gốc của di sản.']),
    Q('Ứng phó căng thẳng đúng cách?', ['Cô lập', 'Bỏ học', 'Thư giãn, chia sẻ, tập thể dục', 'Bạo lực'], 2, 'Thư giãn và chia sẻ là cách lành mạnh.', TT_REVIEW, ['Sai — cô lập làm căng thẳng nặng thêm.', 'Sai — bỏ học là phản ứng tiêu cực.', 'Đúng — thư giãn, chia sẻ, tập thể dục là cách ứng phó căng thẳng lành mạnh.', 'Sai — bạo lực là phản ứng sai lầm.']),
    Q('Số 111 là tổng đài?', ['Cứu hoả', 'An ninh', 'Cấp cứu', 'Quốc gia bảo vệ trẻ em'], 3, '111 là Tổng đài quốc gia bảo vệ trẻ em.', TT_REVIEW, ['Sai — cứu hoả là số 114.', 'Sai — an ninh phản ứng nhanh là số 113.', 'Sai — cấp cứu y tế là số 115.', 'Đúng — 111 là Tổng đài quốc gia bảo vệ trẻ em.']),
  ]),

  M(36, 'Kết thúc GDCD 7 — Công dân trẻ vững bước vào lớp 8', [
    Q('Thông điệp "Quyền đi kèm với trách nhiệm" của GDCD 7 nghĩa là gì?',
      ['Có quyền thì không cần làm gì cả', 'Chỉ người lớn mới có trách nhiệm', 'Em có quyền học tập, vui chơi, được bảo vệ — đồng thời có trách nhiệm với gia đình, bạn bè, cộng đồng', 'Trách nhiệm chỉ thuộc về nhà trường'],
      2,
      'Quyền và trách nhiệm luôn đi cùng nhau: được hưởng quyền thì phải làm tròn bổn phận.',
      ['Ba thông điệp xuyên suốt GDCD 7 là: <i>"Mỗi hành động nhỏ đều có ý nghĩa"</i>, <i>"Quyền đi kèm với trách nhiệm"</i> và <i>"Sống tốt là một hành trình"</i>.',
       'Trẻ em có <b>quyền</b> được học tập, vui chơi, được bảo vệ, được bày tỏ ý kiến. Nhưng đi cùng đó là <b>bổn phận</b>:<ul><li>với gia đình — kính trọng ông bà cha mẹ, chia sẻ việc nhà</li><li>với nhà trường — học tập nghiêm túc, tôn trọng thầy cô và bạn bè</li><li>với cộng đồng — giữ gìn môi trường, tuân thủ pháp luật</li></ul>',
       'Trách nhiệm không chỉ của người lớn hay nhà trường: học sinh cũng là một <b>công dân</b> đang lớn lên.'],
      ['Sai — có quyền không có nghĩa là miễn trừ trách nhiệm.',
       'Sai — học sinh cũng có bổn phận của mình.',
       'Đúng — quyền và bổn phận luôn đi cùng nhau.',
       'Sai — gia đình, học sinh và cộng đồng đều có phần trách nhiệm.']),
    Q('Bạn cùng bàn bị bạn lớp khác bắt nạt lấy tiền nhưng sợ không dám nói. Cách ứng xử ĐÚNG nhất là?',
      ['Im lặng vì đó là việc riêng của bạn', 'Lắng nghe bạn, giải thích rằng im lặng không giải quyết được, rồi cùng bạn báo thầy cô', 'Tự đi đánh lại nhóm bạn kia', 'Kể cho cả lớp biết để mọi người cùng bàn tán'],
      1,
      'Lắng nghe, động viên và cùng bạn báo người lớn tin cậy — đó là bảo vệ bạn, không phải "mách lẻo".',
      ['Bạo lực học đường là chủ đề GDCD 7 dành nhiều thời lượng, vì <b>im lặng cũng là một dạng đồng thuận</b>.',
       'Các bước ứng xử đúng:<ul><li>Hỏi thăm, <b>lắng nghe</b> để bạn thấy có chỗ dựa</li><li>Giải thích rằng im lặng khiến tình huống <i>tệ hơn</i></li><li><b>Cùng bạn</b> đến gặp thầy cô hoặc ban giám hiệu — đồng hành để bạn bớt sợ</li><li>Nếu bạn vẫn không dám, em <i>tự</i> báo người lớn tin cậy vì đây là việc liên quan đến an toàn</li></ul>',
       'Báo cáo để bảo vệ bạn là <b>trách nhiệm đạo đức</b>. Tự đánh trả là vi phạm pháp luật; đem đi bàn tán là xâm phạm bí mật riêng tư của bạn.'],
      ['Sai — im lặng khiến bạn tiếp tục bị hại.',
       'Đúng — vừa lắng nghe, vừa đưa việc ra người có thẩm quyền.',
       'Sai — dùng bạo lực đáp lại bạo lực là vi phạm pháp luật.',
       'Sai — bàn tán làm bạn thêm tổn thương, không giải quyết được gì.']),
    Q('Bình đẳng giới nghĩa là gì?',
      ['Nam và nữ phải giống nhau hoàn toàn về thể chất', 'Nữ luôn được ưu tiên hơn nam', 'Nam và nữ có cơ hội, quyền lợi và sự tôn trọng như nhau', 'Mỗi giới chỉ được làm một số nghề nhất định'],
      2,
      'Bình đẳng giới là bình đẳng về cơ hội, quyền lợi và sự tôn trọng, không phải giống nhau về thể chất.',
      ['Đây là một điểm rất dễ hiểu sai. <b>Bình đẳng</b> không đồng nghĩa với <b>giống nhau</b>.',
       'Bình đẳng giới nghĩa là:<ul><li>cơ hội học tập, việc làm, phát triển <b>như nhau</b></li><li>quyền lợi và sự tôn trọng <b>như nhau</b></li><li>không ai bị <i>giới hạn cơ hội</i> hay <i>áp đặt vai trò cứng nhắc</i> chỉ vì giới tính</li></ul>',
       'Nam và nữ có thể khác nhau về đặc điểm và sở trường — điều đó bình thường và đáng trân trọng. Vấn đề chỉ phát sinh khi sự khác biệt bị dùng để <b>phân biệt đối xử</b>.'],
      ['Sai — bình đẳng không có nghĩa là giống nhau về thể chất.',
       'Sai — ưu tiên một chiều cũng là một dạng bất bình đẳng.',
       'Đúng — bình đẳng về cơ hội, quyền lợi và sự tôn trọng.',
       'Sai — giới hạn nghề theo giới tính chính là phân biệt đối xử.']),
    Q('Số điện thoại Tổng đài quốc gia bảo vệ trẻ em là?',
      ['113', '111', '114', '115'],
      1,
      'Tổng đài quốc gia bảo vệ trẻ em là 111, miễn phí và hoạt động 24/7.',
      ['Biết số gọi khẩn cấp là một <b>kỹ năng sống</b> bắt buộc, không phải kiến thức để thi.',
       'Bốn số cần nhớ:<ul><li><b>111</b> — Tổng đài quốc gia bảo vệ trẻ em (miễn phí, 24/7)</li><li><b>113</b> — Công an, an ninh phản ứng nhanh</li><li><b>114</b> — Cảnh sát phòng cháy chữa cháy, cứu hộ</li><li><b>115</b> — Cấp cứu y tế</li></ul>',
       'Khi bị xâm hại, bị bạo lực hoặc thấy bạn mình gặp nguy hiểm mà không biết nói với ai, em có thể gọi <b>111</b>.'],
      ['Sai — 113 là an ninh phản ứng nhanh.',
       'Đúng — 111 là Tổng đài quốc gia bảo vệ trẻ em.',
       'Sai — 114 là cứu hoả, cứu hộ.',
       'Sai — 115 là cấp cứu y tế.']),
    Q('Một "cam kết cá nhân" tốt cho năm học lớp 8 cần có đặc điểm nào?',
      ['Cụ thể, đo lường được và thực tế với cuộc sống của em', 'Càng to lớn, càng khó thực hiện càng tốt', 'Chỉ cần nói cho hay, không cần làm', 'Giống hệt cam kết của bạn cùng bàn'],
      0,
      'Cam kết tốt thì cụ thể, đo được và khả thi — ví dụ "mỗi tối dành 15 phút trò chuyện với gia đình".',
      ['GDCD học để <b>làm</b>, không chỉ để nhớ. Cách chuyển bài học thành hành động là đặt <i>cam kết cá nhân</i>.',
       'Một cam kết tốt cần:<ul><li><b>Cụ thể</b> — "giúp một bạn mới chưa hoà nhập với lớp", không phải "sống tốt hơn"</li><li><b>Đo lường được</b> — "mỗi tối 15 phút trò chuyện cùng gia đình"</li><li><b>Thực tế</b> — phù hợp với thời gian và hoàn cảnh của chính em</li></ul>',
       'Cam kết quá to và mơ hồ thường bị bỏ giữa đường; cam kết sao chép của người khác thì không gắn với điều em thực sự muốn thay đổi.'],
      ['Đúng — cụ thể, đo được và khả thi mới thực hiện được.',
       'Sai — cam kết quá lớn thường bị bỏ giữa đường.',
       'Sai — cam kết không đi cùng hành động thì vô nghĩa.',
       'Sai — cam kết phải gắn với điều chính em cần thay đổi.']),
    Q('Ở lớp 8, môn GDCD sẽ mở rộng sang nội dung nào?',
      ['Chỉ ôn lại y nguyên nội dung lớp 7', 'Vi phạm pháp luật và trách nhiệm pháp lý, pháp luật dân sự cơ bản, kinh tế gia đình và tiêu dùng thông minh', 'Toán tài chính và kế toán doanh nghiệp', 'Không còn học GDCD nữa'],
      1,
      'Lớp 8 mở rộng sang quyền và nghĩa vụ công dân, trách nhiệm pháp lý, pháp luật dân sự và tiêu dùng thông minh.',
      ['GDCD 7 đặt nền về <b>đạo đức</b> và <b>kỹ năng sống</b>. Lớp 8 nâng lên phần <b>pháp luật</b> rõ nét hơn.',
       'Nội dung chờ em ở lớp 8:<ul><li>Quyền và nghĩa vụ công dân</li><li><b>Vi phạm pháp luật</b> và <b>trách nhiệm pháp lý</b></li><li>Pháp luật dân sự cơ bản</li><li>Kinh tế gia đình và <b>tiêu dùng thông minh</b></li></ul>',
       'Kỹ năng mới: giải quyết xung đột, <i>tư duy phản biện</i>, và bảo vệ quyền lợi bản thân đúng pháp luật.'],
      ['Sai — lớp 8 có nội dung mới, không chỉ ôn lại.',
       'Đúng — đó là mạch nội dung GDCD lớp 8.',
       'Sai — kế toán doanh nghiệp không thuộc GDCD THCS.',
       'Sai — GDCD học liên tục tới hết THPT.']),
  ]),
];

export const S7GDCD_SCENARIOS = indexBy(S7GDCD_WEEKS);
