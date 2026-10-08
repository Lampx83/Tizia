// ============================================================
// Lớp 7 · KHOA HỌC TỰ NHIÊN — 35 tuần (HK1: 1–18 · HK2: 19–35 · T22 nghỉ Tết)
// Bám SGK KHTN 7 (KNTT/CTST/Cánh Diều): Hóa — Vật lí — Sinh.
// ID prefix: "S7KHTN-wNN-quiz".
// ============================================================
import { Q, W, indexBy } from './_helper.js';

const M = (n, title, qs, opts) => W('S7KHTN', 'khtn', n, title, qs, opts);

export const S7KHTN_WEEKS = [
  // ──────────────── HK1 ────────────────
  M(1, 'Mở đầu — Phương pháp và kĩ năng học tập KHTN', [
    Q('KHTN nghiên cứu về?', ['Các đối tượng và hiện tượng của thế giới tự nhiên', 'Lịch sử loài người', 'Văn học nghệ thuật', 'Pháp luật'], 0, 'Khoa học tự nhiên.', [
      '<b>Khoa học tự nhiên (KHTN)</b> là ngành khoa học nghiên cứu các <i>sự vật, hiện tượng trong thế giới tự nhiên</i> và tìm ra quy luật chi phối chúng.',
      'Đối tượng rất rộng: <code>nguyên tử, chất, ánh sáng, âm thanh, nam châm, cây cối, con người…</code>',
      '<ul><li>KHTN 7 gồm ba mạch: <b>Chất và sự biến đổi của chất (Hoá)</b>, <b>Năng lượng và sự biến đổi (Vật lí)</b>, <b>Vật sống (Sinh)</b>.</li><li>🚫 Lịch sử, văn học, pháp luật thuộc <i>khoa học xã hội</i>, không phải KHTN.</li></ul>',
    ], ['Đúng — KHTN tìm hiểu các vật, hiện tượng và quy luật của thế giới tự nhiên.', 'Sai — lịch sử loài người là đối tượng của môn Lịch sử, không phải KHTN.', 'Sai — văn học nghệ thuật thuộc lĩnh vực xã hội, nhân văn.', 'Sai — pháp luật thuộc khoa học xã hội, không phải tự nhiên.']),
    Q('Bước đầu tiên trong phương pháp tìm hiểu tự nhiên là?', ['Quan sát, đặt câu hỏi', 'Thí nghiệm', 'Kết luận', 'Báo cáo'], 0, 'Quan sát → đặt vấn đề → giả thuyết → thí nghiệm → kết luận.', [
      '<b>Phương pháp tìm hiểu tự nhiên</b> là một chuỗi bước có thứ tự, mở đầu bằng việc <i>quan sát</i> hiện tượng để nảy sinh thắc mắc.',
      'Năm bước cơ bản: <ul><li><b>1. Quan sát, đặt câu hỏi</b> về hiện tượng.</li><li><b>2. Hình thành giả thuyết</b> (dự đoán có cơ sở).</li><li><b>3. Lập kế hoạch và làm thí nghiệm</b> để kiểm chứng.</li><li><b>4. Rút ra kết luận.</b></li><li><b>5. Báo cáo</b> kết quả.</li></ul>',
      'Không quan sát thì không có vấn đề để giải quyết, nên quan sát luôn là bước khởi đầu.',
    ], ['Đúng — phải quan sát và đặt câu hỏi trước, từ đó mới nảy sinh vấn đề cần tìm hiểu.', 'Sai — thí nghiệm đến sau khi đã có giả thuyết để kiểm chứng.', 'Sai — kết luận là bước cuối, không thể đứng đầu.', 'Sai — báo cáo là khâu cuối cùng để công bố kết quả.']),
    Q('Giả thuyết khoa học là?', ['Câu hỏi tu từ', 'Kết luận chắc chắn', 'Ý kiến vô căn cứ', 'Dự đoán có cơ sở để kiểm chứng'], 3, 'Giả thuyết cần kiểm chứng.', [
      '<b>Giả thuyết khoa học</b> là một <i>dự đoán có cơ sở</i> về câu trả lời cho vấn đề đang nghiên cứu, được đưa ra dựa trên quan sát và hiểu biết đã có.',
      'Đặc điểm: <ul><li>Phải <b>kiểm chứng được</b> bằng thí nghiệm hoặc quan sát.</li><li>Có thể <i>đúng hoặc sai</i> — thí nghiệm sẽ quyết định.</li></ul>',
      'Khác với <b>kết luận</b> (đã được kiểm chứng) và <i>ý kiến vô căn cứ</i> (không dựa trên bằng chứng).',
    ], ['Sai — câu hỏi tu từ không phải dự đoán có thể kiểm chứng bằng thí nghiệm.', 'Sai — giả thuyết chưa chắc đúng, phải qua kiểm chứng mới thành kết luận.', 'Sai — giả thuyết phải có cơ sở khoa học, không phải ý kiến tuỳ tiện.', 'Đúng — giả thuyết là dự đoán có căn cứ, cần thí nghiệm để kiểm chứng đúng/sai.']),
    Q('Thí nghiệm có vai trò?', ['Kiểm chứng giả thuyết', 'Thay sách giáo khoa', 'Trang trí', 'Làm bài tập'], 0, 'Cốt lõi PP khoa học.', [
      '<b>Thí nghiệm</b> là hoạt động <i>thu thập bằng chứng thực nghiệm</i> để kiểm tra giả thuyết đúng hay sai.',
      'Trong phương pháp tìm hiểu tự nhiên, thí nghiệm là khâu <b>kiểm chứng</b>: nếu kết quả phù hợp dự đoán thì giả thuyết được củng cố; nếu trái thì phải điều chỉnh giả thuyết.',
      'Để kết quả tin cậy, thí nghiệm cần <i>lặp lại nhiều lần</i>, đo đạc chính xác và kiểm soát các yếu tố ảnh hưởng.',
    ], ['Đúng — thí nghiệm dùng để kiểm tra giả thuyết đúng hay sai bằng dữ liệu thực.', 'Sai — thí nghiệm bổ trợ chứ không thay thế sách giáo khoa.', 'Sai — thí nghiệm không phải để trang trí mà để thu thập bằng chứng.', 'Sai — đây là vai trò khoa học, không đơn thuần là làm bài tập.']),
    Q('Khi làm thí nghiệm hoá học, cần?', ['Đeo kính bảo hộ, găng tay khi cần', 'Ngửi gần miệng ống', 'Mặc đồ thoải mái không bảo hộ', 'Nếm hoá chất để biết'], 0, 'An toàn là ưu tiên.', [
      '<b>An toàn trong phòng thực hành</b> là nguyên tắc hàng đầu khi học KHTN. Hoá chất có thể gây bỏng, ngộ độc nếu dùng sai cách.',
      'Quy tắc cơ bản: <ul><li><b>Đeo kính bảo hộ, găng tay, áo choàng</b> khi cần.</li><li>Muốn ngửi mùi thì <i>dùng tay phẩy nhẹ</i> hơi về phía mũi, không ghé sát miệng ống.</li><li><b>Tuyệt đối không nếm</b> hoá chất.</li></ul>',
      'Luôn đọc kĩ <i>nhãn cảnh báo</i> và làm theo hướng dẫn của giáo viên.',
    ], ['Đúng — trang bị bảo hộ giúp tránh hoá chất bắn vào mắt, da khi làm thí nghiệm.', 'Sai — ngửi gần miệng ống rất nguy hiểm, phải dùng tay phẩy nhẹ hơi về phía mũi.', 'Sai — thiếu đồ bảo hộ là vi phạm an toàn phòng thí nghiệm.', 'Sai — tuyệt đối không nếm hoá chất vì có thể gây ngộ độc.']),
    Q('Đơn vị đo độ dài trong hệ SI?', ['Mét (m)', 'Centimet (cm)', 'Kilômét (km)', 'Lít (L)'], 0, 'Đơn vị chuẩn của SI.', [
      '<b>Hệ đo lường quốc tế SI</b> quy định các đơn vị chuẩn cho mỗi đại lượng. Đơn vị độ dài cơ bản là <b>mét (m)</b>.',
      'Các đơn vị như <code>cm, mm, km</code> là <i>bội hoặc ước</i> của mét: <ul><li>1 km = 1000 m</li><li>1 m = 100 cm = 1000 mm</li></ul>',
      '🚫 <b>Lít (L)</b> là đơn vị đo <i>thể tích</i>, không đo độ dài.',
    ], ['Đúng — mét (m) là đơn vị độ dài cơ bản trong hệ đo lường quốc tế SI.', 'Sai — centimet là bội/ước của mét, không phải đơn vị cơ bản SI.', 'Sai — kilômét cũng dẫn xuất từ mét, không phải đơn vị cơ bản.', 'Sai — lít là đơn vị đo thể tích, không đo độ dài.']),
  ]),

  M(2, 'Nguyên tử — Cấu tạo', [
    Q('Nguyên tử gồm?', ['Hạt nhân và lớp vỏ electron', 'Chỉ neutron', 'Chỉ electron', 'Chỉ proton'], 0, 'Cấu trúc cơ bản.', [
      '<b>Nguyên tử</b> là hạt vô cùng nhỏ, trung hoà về điện, cấu tạo nên mọi chất.',
      'Mỗi nguyên tử gồm hai phần: <ul><li><b>Hạt nhân</b> ở giữa, chứa <i>proton</i> (điện tích +) và <i>neutron</i> (không điện).</li><li><b>Lớp vỏ</b> gồm các <i>electron</i> (điện tích −) chuyển động rất nhanh xung quanh hạt nhân.</li></ul>',
      'Hạt nhân rất nhỏ nhưng tập trung gần như toàn bộ <b>khối lượng</b> của nguyên tử.',
    ], ['Đúng — nguyên tử gồm hạt nhân ở giữa và các electron chuyển động quanh tạo lớp vỏ.', 'Sai — neutron chỉ là một loại hạt trong hạt nhân, không phải toàn bộ nguyên tử.', 'Sai — thiếu hạt nhân thì không thành nguyên tử.', 'Sai — proton chỉ nằm trong hạt nhân, còn thiếu electron ở lớp vỏ.']),
    Q('Hạt nhân gồm?', ['Chỉ proton', 'Proton và electron', 'Neutron và electron', 'Proton và neutron'], 3, 'Hai loại hạt: p và n.', [
      '<b>Hạt nhân nguyên tử</b> nằm ở tâm, gồm hai loại hạt: <ul><li><b>Proton (p)</b> — mang điện tích dương (+1).</li><li><b>Neutron (n)</b> — không mang điện.</li></ul>',
      '<b>Electron (e)</b> mang điện âm <i>không nằm trong hạt nhân</i> mà chuyển động ở lớp vỏ bên ngoài.',
      'Vì proton mang điện + còn neutron trung hoà nên hạt nhân luôn <b>mang điện dương</b>.',
    ], ['Sai — hạt nhân còn chứa neutron chứ không chỉ có proton.', 'Sai — electron nằm ở lớp vỏ, không nằm trong hạt nhân.', 'Sai — electron chuyển động quanh hạt nhân, không thuộc hạt nhân.', 'Đúng — hạt nhân gồm proton (mang điện +) và neutron (không mang điện).']),
    Q('Electron mang điện tích?', ['Âm', 'Cả âm và dương', 'Không mang điện', 'Dương (+1)'], 0, 'e mang điện tích −1.', [
      '<b>Electron (e)</b> là hạt mang điện tích <b>âm</b>, quy ước điện tích là <code>−1</code>.',
      'So sánh ba loại hạt: <ul><li><b>Proton</b>: điện tích +1.</li><li><b>Neutron</b>: không mang điện (0).</li><li><b>Electron</b>: điện tích −1.</li></ul>',
      'Electron có <i>khối lượng rất nhỏ</i> so với proton và neutron, nên hầu như không tính vào khối lượng nguyên tử.',
    ], ['Đúng — electron mang điện tích âm, quy ước là −1.', 'Sai — electron chỉ mang một loại điện tích âm.', 'Sai — hạt không mang điện là neutron, không phải electron.', 'Sai — điện tích dương +1 là của proton.']),
    Q('Proton mang điện tích?', ['Dương', 'Trung tính', 'Âm (−1)', 'Trung hoà điện'], 0, 'p mang điện tích +1.', [
      '<b>Proton (p)</b> nằm trong hạt nhân và mang điện tích <b>dương</b>, quy ước là <code>+1</code>.',
      'Số proton trong hạt nhân quyết định <i>nguyên tố hoá học</i>: mọi nguyên tử có cùng số proton đều thuộc cùng một nguyên tố.',
      'Nhớ: <b>p = +1</b>, <b>e = −1</b>, <b>n = 0</b>. Đừng nhầm proton với neutron (hạt trung tính).',
    ], ['Đúng — proton mang điện tích dương, quy ước là +1.', 'Sai — hạt trung tính là neutron, không phải proton.', 'Sai — điện tích âm −1 là của electron.', 'Sai — proton có điện tích +1 chứ không trung hoà.']),
    Q('Neutron mang điện tích?', ['Không', 'Âm (−1)', 'Dương (+1)', 'Cả dương và âm'], 0, 'n trung hoà điện.', [
      '<b>Neutron (n)</b> là hạt nằm trong hạt nhân, <b>không mang điện</b> (điện tích bằng 0), nên còn gọi là hạt trung hoà.',
      'Neutron có khối lượng <i>xấp xỉ proton</i>, cùng proton tạo nên gần như toàn bộ khối lượng nguyên tử.',
      'Tóm tắt điện tích: <ul><li>proton +1</li><li>neutron 0</li><li>electron −1</li></ul>',
    ], ['Đúng — neutron không mang điện, là hạt trung hoà về điện.', 'Sai — điện tích âm −1 là của electron.', 'Sai — điện tích dương +1 là của proton.', 'Sai — neutron không mang bất kỳ loại điện tích nào.']),
    Q('Số proton = số electron trong nguyên tử trung hoà về?', ['Năng lượng', 'Thể tích', 'Điện tích', 'Khối lượng'], 2, 'Trung hoà điện ⇒ p = e.', [
      'Nguyên tử luôn <b>trung hoà về điện</b>. Điều này có được vì <i>số proton (+) bằng số electron (−)</i>.',
      'Hai loại điện tích trái dấu cân bằng nhau: <code>(+1)×số p + (−1)×số e = 0 ⇒ số p = số e</code>.',
      'Lưu ý: cân bằng số p và số e liên quan đến <b>điện tích</b>; còn <i>khối lượng</i> nguyên tử lại do proton và neutron quyết định.',
    ], ['Sai — số p = số e liên quan đến điện tích, không phải năng lượng.', 'Sai — thể tích nguyên tử không quyết định số p bằng số e.', 'Đúng — vì điện tích + của proton cân bằng điện tích − của electron nên nguyên tử trung hoà điện.', 'Sai — khối lượng chủ yếu do p và n, không liên quan đến cân bằng p = e.']),
  ]),

  M(3, 'Mô hình nguyên tử — Số khối, kí hiệu', [
    Q('Số khối A của nguyên tử = ?', ['e + n (electron + neutron)', 'p + n', 'p + e (proton + electron)', 'p − n (proton trừ neutron)'], 1, 'A = số proton + số neutron.', [
      '<b>Số khối A</b> bằng tổng số hạt trong hạt nhân, tức là tổng số <i>proton</i> và <i>neutron</i>: <code>A = p + n</code> (hay A = Z + N).',
      'Electron <b>không</b> được tính vào số khối vì khối lượng của nó rất nhỏ, không đáng kể.',
      'Ví dụ: nguyên tử có 6 proton và 6 neutron thì A = 6 + 6 = <b>12</b> (đó là carbon-12).',
    ], ['Sai — electron có khối lượng rất nhỏ, không tính vào số khối.', 'Đúng — số khối A bằng tổng số proton và số neutron trong hạt nhân.', 'Sai — số khối không cộng electron vì khối lượng e không đáng kể.', 'Sai — số khối là tổng p và n, không phải hiệu của chúng.']),
    Q('Số hiệu nguyên tử Z = ?', ['Số khối', 'Số neutron', 'Số electron lớp ngoài', 'Số proton'], 3, 'Z = p (cũng = e khi trung hoà).', [
      '<b>Số hiệu nguyên tử Z</b> chính là <b>số proton</b> trong hạt nhân. Đây là đặc trưng nhận dạng nguyên tố.',
      'Với nguyên tử trung hoà điện, vì số p = số e nên <code>Z = số proton = số electron</code>.',
      'Từ Z và A tính được số neutron: <b>N = A − Z</b>. Đừng nhầm Z (số proton) với A (số khối).',
    ], ['Sai — số khối là A = p + n, khác với số hiệu Z.', 'Sai — số neutron là N = A − Z, không phải Z.', 'Sai — số e lớp ngoài là electron hoá trị, không phải Z.', 'Đúng — số hiệu nguyên tử Z bằng số proton (và bằng số e khi trung hoà điện).']),
    Q('Nguyên tử C có Z = 6. Số electron là?', ['6', '14', '12', '8'], 0, 'Số e = Z = 6.', [
      'Với nguyên tử <i>trung hoà điện</i>, <b>số electron luôn bằng số hiệu nguyên tử Z</b> (vì số e = số p).',
      'Carbon có <code>Z = 6</code> nên có <b>6 electron</b> và 6 proton.',
      'Cẩn thận: 12 hay 14 là <i>số khối A</i> của các đồng vị carbon, không phải số electron.',
    ], ['Đúng — nguyên tử trung hoà có số e = Z = 6.', 'Sai — 14 là số khối của một đồng vị, không phải số electron.', 'Sai — 12 là số khối của carbon-12, không phải số e.', 'Sai — số e bằng Z = 6, không phải 8.']),
    Q('Đồng vị là các nguyên tử cùng?', ['Khác cả A và Z', 'Cùng A, khác Z', 'Cùng Z, khác A', 'Cùng cả A và Z'], 2, 'Đồng vị: cùng số p, khác số n.', [
      '<b>Đồng vị</b> là các nguyên tử của <i>cùng một nguyên tố</i>: có <b>cùng số proton (cùng Z)</b> nhưng <b>khác số neutron</b> nên khác số khối A.',
      'Ví dụ carbon có các đồng vị: <code>¹²C (6p, 6n)</code> và <code>¹⁴C (6p, 8n)</code> — cùng Z = 6, khác A.',
      'Vì cùng số proton nên đồng vị có <i>tính chất hoá học giống nhau</i>, chỉ khác về khối lượng.',
    ], ['Sai — đồng vị phải cùng số proton (cùng Z) mới là cùng nguyên tố.', 'Sai — cùng Z thì cùng nguyên tố; nếu khác Z là nguyên tố khác.', 'Đúng — đồng vị cùng số proton (Z) nhưng khác số neutron nên khác số khối A.', 'Sai — cùng cả A và Z là các nguyên tử giống hệt, không phải đồng vị khác nhau.']),
    Q('Mô hình Bo (Bohr) mô tả electron?', ['Rời khỏi nguyên tử', 'Trộn vào hạt nhân', 'Đứng yên', 'Chuyển động trên các quỹ đạo (lớp) xác định'], 3, 'Quỹ đạo Bo.', [
      'Theo <b>mô hình nguyên tử của Bo (Bohr)</b>, các electron chuyển động quanh hạt nhân theo những <i>quỹ đạo (lớp)</i> xác định, giống các hành tinh quay quanh Mặt Trời.',
      'Các lớp electron được sắp xếp từ trong ra ngoài: lớp 1 chứa tối đa 2e, lớp 2 chứa tối đa 8e…',
      'Electron <b>không đứng yên</b>, không rời khỏi nguyên tử và không trộn vào hạt nhân — chúng luôn chuyển động ở lớp vỏ.',
    ], ['Sai — electron vẫn bị giữ quanh hạt nhân, không rời khỏi nguyên tử.', 'Sai — electron không trộn vào hạt nhân mà chuyển động ở lớp vỏ.', 'Sai — electron luôn chuyển động chứ không đứng yên.', 'Đúng — mô hình Bo mô tả electron quay quanh hạt nhân trên các quỹ đạo (lớp) xác định.']),
    Q('Lớp electron ngoài cùng quyết định?', ['Tính chất hoá học', 'Khối lượng', 'Trạng thái', 'Màu sắc'], 0, 'Liên kết hoá học phụ thuộc lớp ngoài.', [
      '<b>Lớp electron ngoài cùng</b> (electron hoá trị) quyết định <i>khả năng liên kết</i> của nguyên tử, tức quyết định <b>tính chất hoá học</b>.',
      'Các nguyên tử có <i>cùng số electron lớp ngoài</i> thường có tính chất hoá học tương tự nhau (đó là cơ sở của các nhóm trong bảng tuần hoàn).',
      'Ngược lại, <b>khối lượng</b> nguyên tử do hạt nhân (p và n) quyết định, không phải lớp e ngoài.',
    ], ['Đúng — số electron lớp ngoài cùng quyết định khả năng liên kết, tức tính chất hoá học.', 'Sai — khối lượng do hạt nhân (p và n) quyết định.', 'Sai — trạng thái rắn/lỏng/khí phụ thuộc điều kiện, không phải lớp e ngoài.', 'Sai — màu sắc không do số electron lớp ngoài quyết định trực tiếp.']),
  ]),

  M(4, 'Nguyên tố hoá học — Bảng tuần hoàn (giới thiệu)', [
    Q('Nguyên tố hoá học là?', ['Tập hợp các phân tử', 'Tập hợp các hợp chất', 'Tập hợp các nguyên tử cùng số proton', 'Tập hợp các chất khác nhau'], 2, 'Cùng Z = cùng nguyên tố.', [
      '<b>Nguyên tố hoá học</b> là tập hợp những <i>nguyên tử có cùng số proton</i> (cùng số hiệu Z) trong hạt nhân.',
      'Số proton là “chứng minh thư” của nguyên tố: cứ cùng Z là cùng một nguyên tố, dù số neutron có khác (các đồng vị).',
      'Hiện đã biết khoảng <b>118 nguyên tố</b>, mỗi nguyên tố có một <i>tên</i> và một <i>kí hiệu hoá học</i> riêng.',
    ], ['Sai — nguyên tố được định nghĩa theo nguyên tử, không phải phân tử.', 'Sai — hợp chất là chất, không phải định nghĩa của nguyên tố.', 'Đúng — nguyên tố hoá học là tập hợp những nguyên tử có cùng số proton (cùng Z).', 'Sai — tập hợp các chất khác nhau là hỗn hợp, không phải một nguyên tố.']),
    Q('Kí hiệu hoá học của Hydro?', ['H', 'Hy (viết tắt của Hydro)', 'He (kí hiệu của Heli)', 'Hi (viết tắt từ Hydrogen)'], 0, 'Hydrogen → H.', [
      '<b>Kí hiệu hoá học</b> dùng một hoặc hai chữ cái để biểu diễn nguyên tố: chữ cái đầu <i>viết hoa</i>, chữ thứ hai (nếu có) <i>viết thường</i>.',
      'Hydrogen (hydro) có kí hiệu là <b>H</b> — chỉ một chữ cái.',
      'Cần phân biệt với <code>He</code> (heli). Không tồn tại các kí hiệu “Hy” hay “Hi”.',
    ], ['Đúng — hydrogen có kí hiệu hoá học là H, một chữ cái viết hoa.', 'Sai — không có kí hiệu Hy; hydrogen chỉ ghi là H.', 'Sai — He là kí hiệu của nguyên tố heli, không phải hydro.', 'Sai — không có kí hiệu Hi cho hydro.']),
    Q('Kí hiệu của Oxi?', ['Ox (viết tắt của Oxi)', 'O', 'O₂ (công thức khí oxi)', 'Oy (kí hiệu Oxygen)'], 1, 'Oxygen → O.', [
      'Nguyên tố <b>oxygen (oxi)</b> có kí hiệu hoá học là <b>O</b> — một chữ cái viết hoa.',
      'Cần phân biệt rõ: <ul><li><b>O</b> là <i>kí hiệu nguyên tố</i> (một nguyên tử).</li><li><b>O₂</b> là <i>công thức phân tử</i> của khí oxi (hai nguyên tử oxygen liên kết).</li></ul>',
      'Không có kí hiệu “Ox” hay “Oy” cho nguyên tố này.',
    ], ['Sai — không có kí hiệu Ox; oxygen chỉ ghi là O.', 'Đúng — kí hiệu hoá học của nguyên tố oxygen là O.', 'Sai — O₂ là công thức của khí oxi (phân tử), không phải kí hiệu nguyên tố.', 'Sai — không tồn tại kí hiệu Oy.']),
    Q('Hiện nay có khoảng bao nhiêu nguyên tố hoá học đã biết?', ['Khoảng 118', 'Khoảng 200', 'Khoảng 50', 'Khoảng 30'], 0, '~118 nguyên tố trong BTH hiện đại.', [
      'Đến nay con người đã biết khoảng <b>118 nguyên tố hoá học</b>, được sắp xếp trong <i>bảng tuần hoàn</i> hiện đại.',
      'Trong đó có khoảng 90 nguyên tố tồn tại trong tự nhiên, số còn lại do con người <i>tổng hợp nhân tạo</i>.',
      'Mỗi nguyên tố ứng với một số proton (Z) khác nhau, từ Z = 1 (hydrogen) đến Z = 118.',
    ], ['Đúng — bảng tuần hoàn hiện đại có khoảng 118 nguyên tố đã biết.', 'Sai — con số 200 quá lớn so với thực tế.', 'Sai — số nguyên tố nhiều hơn 50.', 'Sai — chỉ riêng các nguyên tố thường gặp đã nhiều hơn 30.']),
    Q('Bảng tuần hoàn do ai đề xuất?', ['Einstein', 'Darwin', 'Newton', 'Mendeleev'], 3, 'Đ.I. Mendeleev (1869).', [
      '<b>Bảng tuần hoàn các nguyên tố hoá học</b> được nhà bác học người Nga <b>D. I. Mendeleev</b> đề xuất năm <i>1869</i>.',
      'Ông sắp xếp các nguyên tố theo chiều tăng dần khối lượng (ngày nay là theo số proton Z) và phát hiện <i>tính tuần hoàn</i> của tính chất.',
      'Các nhà khoa học khác như Einstein (tương đối), Darwin (tiến hoá), Newton (cơ học) nổi tiếng ở lĩnh vực hoàn toàn khác.',
    ], ['Sai — Einstein nổi tiếng về thuyết tương đối, không lập bảng tuần hoàn.', 'Sai — Darwin là nhà sinh học với thuyết tiến hoá.', 'Sai — Newton nổi tiếng về cơ học và định luật vạn vật hấp dẫn.', 'Đúng — D. I. Mendeleev đề xuất bảng tuần hoàn các nguyên tố năm 1869.']),
    Q('Nguyên tố ở cùng một nhóm có?', ['Tính chất hoá học tương tự', 'Cùng số khối', 'Cùng khối lượng riêng', 'Cùng màu sắc'], 0, 'Do cùng số e lớp ngoài.', [
      '<b>Nhóm</b> là cột dọc trong bảng tuần hoàn. Các nguyên tố cùng nhóm có <i>cùng số electron lớp ngoài cùng</i>.',
      'Vì lớp electron ngoài quyết định tính chất hoá học nên các nguyên tố cùng nhóm có <b>tính chất hoá học tương tự nhau</b>.',
      'Ví dụ nhóm IA (Li, Na, K…) đều là kim loại hoạt động mạnh. Tuy nhiên <i>số khối, khối lượng riêng, màu sắc</i> của chúng vẫn khác nhau.',
    ], ['Đúng — cùng nhóm thì cùng số electron lớp ngoài nên có tính chất hoá học tương tự.', 'Sai — các nguyên tố cùng nhóm có số khối khác nhau.', 'Sai — khối lượng riêng của chúng không giống nhau.', 'Sai — màu sắc các nguyên tố cùng nhóm không nhất thiết giống nhau.']),
  ]),

  M(5, 'Bảng tuần hoàn các nguyên tố — Cấu trúc', [
    Q('Bảng tuần hoàn gồm các hàng gọi là?', ['Chu kì', 'Nhóm nguyên tố', 'Lớp electron', 'Phân nhóm chính'], 0, 'Hàng ngang = chu kì.', [
      'Bảng tuần hoàn được sắp xếp thành <b>hàng ngang</b> và <b>cột dọc</b>.',
      '<ul><li>Mỗi <b>hàng ngang</b> gọi là một <b>chu kì</b>.</li><li>Mỗi <b>cột dọc</b> gọi là một <b>nhóm</b>.</li></ul>',
      'Số thứ tự chu kì cho biết <i>số lớp electron</i> của nguyên tử nguyên tố đó.',
    ], ['Đúng — mỗi hàng ngang trong bảng tuần hoàn được gọi là một chu kì.', 'Sai — nhóm là cột dọc, không phải hàng ngang.', 'Sai — lớp electron là cấu trúc của nguyên tử, không phải hàng của bảng.', 'Sai — phân nhóm chính liên quan đến cột, không phải hàng.']),
    Q('Bảng tuần hoàn có các cột gọi là?', ['Nhóm', 'Lớp electron', 'Phân lớp', 'Chu kì'], 0, 'Cột dọc = nhóm.', [
      'Mỗi <b>cột dọc</b> trong bảng tuần hoàn được gọi là một <b>nhóm</b>.',
      'Các nguyên tố trong cùng một nhóm có <i>cùng số electron lớp ngoài cùng</i> nên tính chất hoá học tương tự nhau.',
      'Đừng nhầm: <b>chu kì</b> là hàng ngang, còn <i>lớp/phân lớp electron</i> thuộc cấu tạo nguyên tử chứ không phải cột của bảng.',
    ], ['Đúng — mỗi cột dọc trong bảng tuần hoàn được gọi là một nhóm.', 'Sai — lớp electron thuộc cấu tạo nguyên tử, không phải cột của bảng.', 'Sai — phân lớp là khái niệm cấu tạo electron, không phải cột.', 'Sai — chu kì là hàng ngang, không phải cột dọc.']),
    Q('Số chu kì trong BTH hiện đại?', ['5', '8', '10', '7'], 3, 'Có 7 chu kì.', [
      'Bảng tuần hoàn hiện đại có <b>7 chu kì</b> (7 hàng ngang), đánh số từ 1 đến 7.',
      'Số thứ tự chu kì bằng <i>số lớp electron</i> của nguyên tử: nguyên tố chu kì 1 có 1 lớp e, chu kì 2 có 2 lớp e…',
      'Chu kì 1 ngắn nhất (chỉ có H và He), các chu kì sau dài hơn.',
    ], ['Sai — bảng tuần hoàn hiện đại có nhiều hơn 5 chu kì.', 'Sai — không có 8 chu kì.', 'Sai — số chu kì là 7, không phải 10.', 'Đúng — bảng tuần hoàn hiện đại có 7 chu kì (hàng ngang).']),
    Q('Nguyên tố trong cùng chu kì có cùng?', ['Số electron lớp ngoài cùng', 'Số khối', 'Khối lượng', 'Số lớp electron'], 3, 'Cùng số lớp e.', [
      'Các nguyên tố trong <b>cùng một chu kì</b> (cùng hàng ngang) có <b>cùng số lớp electron</b>.',
      'Ví dụ các nguyên tố chu kì 2 (Li, Be, B, C, N, O, F, Ne) đều có <i>2 lớp electron</i>.',
      'Phân biệt: <ul><li><b>Cùng chu kì</b> → cùng số <i>lớp</i> electron.</li><li><b>Cùng nhóm</b> → cùng số electron <i>lớp ngoài cùng</i>.</li></ul>',
    ], ['Sai — cùng số e lớp ngoài là đặc điểm của các nguyên tố cùng nhóm.', 'Sai — số khối của chúng khác nhau.', 'Sai — khối lượng nguyên tử trong cùng chu kì không giống nhau.', 'Đúng — các nguyên tố cùng chu kì có cùng số lớp electron.']),
    Q('Nguyên tố nhóm IA gồm?', ['Halogen', 'Kim loại chuyển tiếp', 'Khí hiếm', 'Kim loại kiềm'], 3, 'Li, Na, K…', [
      'Nhóm <b>IA</b> là cột đầu tiên bên trái bảng tuần hoàn, gồm các <b>kim loại kiềm</b>: <code>Li, Na, K, Rb, Cs…</code> (trừ hydro).',
      'Chúng đều có <i>1 electron lớp ngoài cùng</i> nên dễ nhường electron, là những kim loại hoạt động rất mạnh.',
      'Đừng nhầm với nhóm VIIA (halogen) hay nhóm VIIIA (khí hiếm).',
    ], ['Sai — halogen thuộc nhóm VIIA, không phải IA.', 'Sai — kim loại chuyển tiếp nằm ở nhóm B, không phải IA.', 'Sai — khí hiếm thuộc nhóm VIIIA.', 'Đúng — nhóm IA là các kim loại kiềm như Li, Na, K…']),
    Q('Nhóm VIIIA là nhóm?', ['Kim loại', 'Khí hiếm', 'Kim loại kiềm', 'Halogen'], 1, 'He, Ne, Ar…', [
      'Nhóm <b>VIIIA</b> là cột cuối cùng bên phải bảng tuần hoàn, gồm các <b>khí hiếm</b>: <code>He, Ne, Ar, Kr…</code>',
      'Chúng có lớp electron ngoài cùng đã <i>bão hoà</i> (8e, riêng He có 2e) nên rất bền và hầu như không tham gia phản ứng hoá học.',
      'Khí hiếm là <i>phi kim</i>, khác hẳn nhóm IA (kim loại kiềm) hay nhóm VIIA (halogen).',
    ], ['Sai — nhóm VIIIA là phi kim khí hiếm, không phải kim loại.', 'Đúng — nhóm VIIIA là các khí hiếm như He, Ne, Ar… có lớp e ngoài bão hoà.', 'Sai — kim loại kiềm thuộc nhóm IA.', 'Sai — halogen thuộc nhóm VIIA.']),
  ]),

  M(6, 'Phân tử — Đơn chất, hợp chất', [
    Q('Phân tử là?', ['Một hạt electron', 'Hạt đại diện cho chất, thể hiện đầy đủ tính chất hoá học của chất', 'Một hạt proton', 'Một nguyên tử'], 1, 'Đơn vị nhỏ nhất mang tính chất hoá học của chất.', [
      '<b>Phân tử</b> là hạt đại diện cho chất, gồm một số nguyên tử liên kết với nhau và <i>thể hiện đầy đủ tính chất hoá học</i> của chất đó.',
      'Ví dụ: phân tử nước <code>H₂O</code> gồm 2 nguyên tử H và 1 nguyên tử O; phân tử khí oxi <code>O₂</code> gồm 2 nguyên tử O.',
      'Phân tử khác hẳn các hạt cấu tạo nguyên tử (proton, electron). Một số ít chất tồn tại ở dạng nguyên tử (như khí hiếm), còn lại đa số ở dạng phân tử.',
    ], ['Sai — electron là hạt mang điện, không phải phân tử.', 'Đúng — phân tử là hạt đại diện cho chất, mang đầy đủ tính chất hoá học của chất đó.', 'Sai — proton là hạt trong hạt nhân, không phải phân tử.', 'Sai — một nguyên tử chưa hẳn là phân tử; phân tử thường gồm nhiều nguyên tử liên kết.']),
    Q('Đơn chất là chất tạo bởi?', ['Một nguyên tố', 'Hai nguyên tố trở lên', 'Tất cả nguyên tố', 'Hai nguyên tố cùng hoá trị'], 0, 'Đơn chất: 1 nguyên tố.', [
      '<b>Đơn chất</b> là chất được tạo nên từ <i>một nguyên tố hoá học</i> duy nhất.',
      'Ví dụ: khí oxi <code>O₂</code>, khí hydrogen <code>H₂</code>, kim loại đồng <code>Cu</code>, than (carbon) <code>C</code>.',
      'Phân biệt: chất tạo từ <b>hai nguyên tố trở lên</b> là <i>hợp chất</i>, không phải đơn chất.',
    ], ['Đúng — đơn chất là chất được tạo nên từ một nguyên tố hoá học.', 'Sai — chất từ hai nguyên tố trở lên là hợp chất.', 'Sai — không có chất nào tạo từ tất cả các nguyên tố.', 'Sai — hai nguyên tố cùng hoá trị vẫn tạo ra hợp chất, không phải đơn chất.']),
    Q('Hợp chất là chất tạo bởi?', ['Một nguyên tố', 'Hai hay nhiều nguyên tố', 'Chỉ kim loại', 'Chỉ phi kim'], 1, 'Hai nguyên tố trở lên kết hợp.', [
      '<b>Hợp chất</b> là chất được tạo nên từ <i>hai hay nhiều nguyên tố hoá học</i> liên kết với nhau.',
      'Ví dụ: nước <code>H₂O</code> (H và O), muối ăn <code>NaCl</code> (Na và Cl), khí carbonic <code>CO₂</code> (C và O).',
      'Hợp chất có thể chứa kim loại, phi kim hoặc cả hai — không bị giới hạn chỉ kim loại hay chỉ phi kim.',
    ], ['Sai — chất từ một nguyên tố là đơn chất.', 'Đúng — hợp chất được tạo nên từ hai hay nhiều nguyên tố hoá học.', 'Sai — hợp chất có thể chứa cả kim loại lẫn phi kim, không chỉ kim loại.', 'Sai — hợp chất không bắt buộc chỉ gồm phi kim.']),
    Q('Nước H₂O là?', ['Đơn chất', 'Hợp chất', 'Hỗn hợp', 'Nguyên tố'], 1, 'Gồm H và O ⇒ hợp chất.', [
      'Công thức của nước là <code>H₂O</code>, gồm <b>hai nguyên tố</b> hydrogen (H) và oxygen (O) liên kết hoá học với nhau.',
      'Vì được tạo từ hai nguyên tố nên nước là một <b>hợp chất</b>, không phải đơn chất.',
      'Nước là <i>chất tinh khiết</i> (mỗi phân tử đều là H₂O), khác với <b>hỗn hợp</b> là trộn lẫn nhiều chất theo kiểu cơ học.',
    ], ['Sai — đơn chất chỉ có một nguyên tố, còn nước có cả H và O.', 'Đúng — nước gồm hai nguyên tố H và O liên kết hoá học nên là hợp chất.', 'Sai — hỗn hợp là trộn cơ học; nước là chất tinh khiết.', 'Sai — nước không phải nguyên tố mà là hợp chất.']),
    Q('Khí O₂ là?', ['Đơn chất', 'Hợp chất', 'Nguyên tố', 'Hỗn hợp'], 0, 'Chỉ gồm O ⇒ đơn chất.', [
      'Khí oxi <code>O₂</code> được tạo nên từ <b>một nguyên tố duy nhất</b> là oxygen, nên là một <b>đơn chất</b>.',
      'Phân biệt rõ: <ul><li><b>O</b> là <i>nguyên tố</i> (kí hiệu của một nguyên tử oxygen).</li><li><b>O₂</b> là <i>chất</i> (phân tử khí oxi).</li></ul>',
      'O₂ là chất tinh khiết, không phải hỗn hợp; và vì chỉ có một nguyên tố nên không phải hợp chất.',
    ], ['Đúng — khí O₂ chỉ gồm một nguyên tố oxygen nên là đơn chất.', 'Sai — hợp chất phải có từ hai nguyên tố trở lên.', 'Sai — O₂ là chất (phân tử), còn O mới là nguyên tố.', 'Sai — O₂ là chất tinh khiết, không phải hỗn hợp.']),
    Q('Trong CO₂, có mấy loại nguyên tố?', ['2', '1', '4', '3'], 0, 'C và O ⇒ 2 nguyên tố.', [
      'Công thức <code>CO₂</code> cho biết phân tử gồm <b>1 nguyên tử C</b> và <b>2 nguyên tử O</b>.',
      'Cần phân biệt <i>số loại nguyên tố</i> với <i>số nguyên tử</i>: <ul><li>Số <b>loại nguyên tố</b>: 2 (carbon và oxygen).</li><li>Tổng số <b>nguyên tử</b>: 3 (1 C + 2 O).</li></ul>',
      'Vì có 2 loại nguyên tố nên CO₂ là một hợp chất.',
    ], ['Đúng — CO₂ gồm hai loại nguyên tố là carbon (C) và oxygen (O).', 'Sai — CO₂ có hai loại nguyên tố, không phải một.', 'Sai — chỉ có C và O, không phải 4 loại.', 'Sai — đếm nhầm; CO₂ chỉ có 2 loại nguyên tố dù có 3 nguyên tử.']),
  ]),

  M(7, 'Liên kết hoá học sơ đẳng', [
    Q('Liên kết ion hình thành giữa?', ['Kim loại điển hình và phi kim điển hình', 'Khí hiếm với khí hiếm', 'Hai phi kim', 'Hai kim loại'], 0, 'Cho — nhận electron.', [
      '<b>Liên kết ion</b> hình thành bằng sự <i>cho – nhận electron</i> giữa <b>kim loại điển hình</b> và <b>phi kim điển hình</b>.',
      'Kim loại nhường electron tạo <b>ion dương (+)</b>, phi kim nhận electron tạo <b>ion âm (−)</b>; hai ion trái dấu hút nhau.',
      'Ví dụ <code>NaCl</code>: Na cho 1e thành Na⁺, Cl nhận 1e thành Cl⁻.',
    ], ['Đúng — liên kết ion hình thành khi kim loại điển hình cho e cho phi kim điển hình nhận e.', 'Sai — khí hiếm đã bão hoà e nên hầu như không tạo liên kết.', 'Sai — hai phi kim thường dùng chung e tạo liên kết cộng hoá trị.', 'Sai — hai kim loại không cho - nhận e theo kiểu ion.']),
    Q('Liên kết cộng hoá trị hình thành giữa?', ['Kim loại và phi kim', 'Khí hiếm', 'Hai kim loại', 'Các phi kim'], 3, 'Dùng chung electron.', [
      '<b>Liên kết cộng hoá trị</b> hình thành khi các nguyên tử <i>dùng chung một hay nhiều cặp electron</i>. Loại liên kết này xảy ra giữa các <b>phi kim</b> với nhau.',
      'Ví dụ phân tử <code>H₂</code>, <code>O₂</code>, <code>H₂O</code>, <code>CO₂</code> đều là liên kết cộng hoá trị.',
      'Phân biệt: kim loại + phi kim điển hình → liên kết ion; phi kim + phi kim → liên kết cộng hoá trị.',
    ], ['Sai — kim loại và phi kim điển hình thường tạo liên kết ion.', 'Sai — khí hiếm hầu như không tạo liên kết.', 'Sai — hai kim loại tạo liên kết kim loại, không phải cộng hoá trị.', 'Đúng — các phi kim dùng chung electron với nhau tạo liên kết cộng hoá trị.']),
    Q('NaCl là hợp chất liên kết?', ['Cộng hoá trị', 'Kim loại', 'Ion', 'Liên kết hiđro'], 2, 'Na cho 1 e, Cl nhận 1 e.', [
      'Muối ăn <code>NaCl</code> được tạo từ <b>kim loại</b> Na và <b>phi kim</b> Cl, nên có <b>liên kết ion</b>.',
      'Cơ chế: <i>Na nhường 1 electron</i> trở thành ion Na⁺, <i>Cl nhận 1 electron</i> trở thành ion Cl⁻; hai ion trái dấu hút nhau.',
      'Đó không phải liên kết cộng hoá trị (dùng chung e) cũng không phải liên kết kim loại (giữa các kim loại).',
    ], ['Sai — cộng hoá trị là dùng chung e; ở NaCl có sự cho - nhận e.', 'Sai — liên kết kim loại chỉ có giữa các kim loại.', 'Đúng — Na cho 1 e cho Cl, tạo ion Na⁺ và Cl⁻ hút nhau bằng liên kết ion.', 'Sai — liên kết hiđro là lực yếu giữa các phân tử, không phải bản chất của NaCl.']),
    Q('H₂O có liên kết?', ['Kim loại', 'Tinh thể', 'Liên kết ion', 'Cộng hoá trị'], 3, 'H và O đều phi kim ⇒ cộng hoá trị.', [
      'Trong phân tử nước <code>H₂O</code>, cả H và O đều là <b>phi kim</b>. Hai loại phi kim này <i>dùng chung cặp electron</i> với nhau.',
      'Vì vậy liên kết trong nước là <b>liên kết cộng hoá trị</b>.',
      'Không thể là liên kết ion (cần kim loại + phi kim) hay liên kết kim loại (giữa các kim loại).',
    ], ['Sai — không có kim loại trong nước nên không có liên kết kim loại.', 'Sai — tinh thể không phải loại liên kết hoá học.', 'Sai — liên kết ion cần kim loại và phi kim; H và O đều là phi kim.', 'Đúng — H và O đều là phi kim, dùng chung electron nên là liên kết cộng hoá trị.']),
    Q('Mục đích của liên kết hoá học?', ['Tăng khối lượng', 'Đạt cấu hình bền giống khí hiếm', 'Phát quang', 'Đổi màu sắc'], 1, 'Quy tắc octet.', [
      'Khi tạo liên kết hoá học, các nguyên tử <i>cho – nhận</i> hoặc <i>dùng chung</i> electron nhằm đạt được <b>lớp electron ngoài cùng bền vững giống khí hiếm</b> (8e, hoặc 2e với lớp đầu).',
      'Đây gọi là <b>quy tắc octet</b> — nguyên tử “muốn” có lớp ngoài bão hoà như nhóm VIIIA.',
      'Tăng khối lượng, phát quang hay đổi màu không phải mục đích của liên kết.',
    ], ['Sai — liên kết không nhằm tăng khối lượng.', 'Đúng — các nguyên tử liên kết để đạt lớp e ngoài bền vững giống khí hiếm (quy tắc octet).', 'Sai — phát quang không phải mục đích của liên kết hoá học.', 'Sai — đổi màu sắc không phải lí do hình thành liên kết.']),
    Q('Khí hiếm khó tạo liên kết vì?', ['Trong suốt', 'Có lớp electron ngoài cùng đã bão hoà', 'Khối lượng quá nhỏ', 'Quá nặng'], 1, '8 e lớp ngoài (trừ He là 2).', [
      '<b>Khí hiếm</b> (nhóm VIIIA: He, Ne, Ar…) có lớp electron ngoài cùng đã <b>bão hoà</b> — đủ 8 electron (riêng He có 2e).',
      'Vì đã đạt cấu hình bền vững theo quy tắc octet nên chúng <i>không cần cho – nhận hay dùng chung electron</i>, do đó rất khó tạo liên kết.',
      'Tính trong suốt hay khối lượng không liên quan đến khả năng liên kết của khí hiếm.',
    ], ['Sai — trong suốt không liên quan đến khả năng tạo liên kết.', 'Đúng — khí hiếm đã có lớp e ngoài bão hoà (8e, riêng He là 2e) nên rất bền, khó liên kết.', 'Sai — khối lượng không quyết định việc khó tạo liên kết.', 'Sai — độ nặng không phải nguyên nhân; lí do là cấu hình e bền.']),
  ]),

  M(8, 'Hoá trị — Công thức hoá học', [
    Q('Hoá trị của H trong các hợp chất thường là?', ['Hoá trị IV', 'I', 'Hoá trị III', 'Hoá trị II'], 1, 'H luôn hoá trị I (trừ hydrua kim loại).', [
      '<b>Hoá trị</b> là con số biểu thị khả năng liên kết của nguyên tử một nguyên tố, được xác định theo hoá trị của H (= I) và O (= II).',
      '<b>Hydrogen (H)</b> được chọn làm đơn vị, luôn có <b>hoá trị I</b> trong hầu hết hợp chất.',
      'Ví dụ trong <code>HCl</code>, <code>H₂O</code>, <code>NH₃</code>, H đều có hoá trị I.',
    ], ['Sai — H không có hoá trị IV trong các hợp chất thông thường.', 'Đúng — hydrogen thường có hoá trị I (trừ vài hydrua kim loại đặc biệt).', 'Sai — H không có hoá trị III.', 'Sai — hoá trị II là của O, không phải H.']),
    Q('Hoá trị của O trong nước là?', ['Hoá trị I', 'Hoá trị IV', 'II', 'Hoá trị III'], 2, 'O hoá trị II trong hầu hết hợp chất.', [
      '<b>Oxygen (O)</b> hầu như luôn có <b>hoá trị II</b> trong các hợp chất.',
      'Trong nước <code>H₂O</code>: O hoá trị II liên kết với 2 nguyên tử H (mỗi H hoá trị I) — đúng quy tắc <code>II×1 = I×2</code>.',
      'O cùng H là hai mốc chuẩn để xác định hoá trị các nguyên tố khác.',
    ], ['Sai — hoá trị I là của H, không phải O.', 'Sai — O không có hoá trị IV trong nước.', 'Đúng — oxygen có hoá trị II trong hầu hết hợp chất, kể cả H₂O.', 'Sai — O không có hoá trị III trong nước.']),
    Q('Công thức hoá học của khí Oxi?', ['O (nguyên tử oxi)', 'OH (gốc hydroxide)', 'O₂', 'O₃ (khí ozon)'], 2, 'Đơn chất khí: O₂.', [
      'Khí oxi tồn tại dưới dạng <i>phân tử hai nguyên tử</i> nên có công thức hoá học là <b>O₂</b>.',
      'Phân biệt: <ul><li><b>O</b>: kí hiệu một nguyên tử oxygen.</li><li><b>O₂</b>: phân tử khí oxi.</li><li><b>O₃</b>: khí ozon (một dạng khác của oxygen).</li></ul>',
      '<code>OH</code> là gốc hydroxide, không phải khí oxi.',
    ], ['Sai — O là kí hiệu nguyên tử, không phải công thức của khí oxi.', 'Sai — OH là gốc hydroxide, không phải khí oxi.', 'Đúng — khí oxi tồn tại dưới dạng phân tử hai nguyên tử, công thức O₂.', 'Sai — O₃ là khí ozon, một chất khác với khí oxi.']),
    Q('Công thức của Cacbon đioxit?', ['CO₂', 'CO (cacbon monooxit)', 'C₂O (công thức sai)', 'CO₃ (gốc cacbonat)'], 0, 'CO₂.', [
      '<b>Cacbon đioxit</b> (khí carbonic) có công thức <b>CO₂</b>, gồm 1 nguyên tử C và 2 nguyên tử O.',
      'Đây là khí sinh ra khi đốt cháy nhiên liệu và là sản phẩm của hô hấp, đồng thời là nguyên liệu cho quang hợp.',
      'Phân biệt: <code>CO</code> là cacbon monooxit (khí độc), <code>CO₃</code> là gốc cacbonat.',
    ], ['Đúng — cacbon đioxit là CO₂, gồm 1 C và 2 O.', 'Sai — CO là cacbon monooxit, một chất khác.', 'Sai — C₂O không phải công thức đúng của hợp chất này.', 'Sai — CO₃ là gốc cacbonat, không phải cacbon đioxit.']),
    Q('Quy tắc hoá trị: a·x = b·y nghĩa là?', ['Tích chỉ số và hoá trị của hai nguyên tố bằng nhau', 'Tổng chỉ số bằng tổng hoá trị', 'Hiệu chỉ số bằng hoá trị', 'Không liên quan'], 0, 'Quy tắc cân bằng hoá trị.', [
      'Với hợp chất hai nguyên tố dạng <code>AₓBᵧ</code> (A hoá trị a, B hoá trị b), <b>quy tắc hoá trị</b> nói rằng: <b>a·x = b·y</b>.',
      'Nghĩa là <i>tích của hoá trị và chỉ số</i> của nguyên tố này bằng tích của nguyên tố kia.',
      'Ví dụ <code>Al₂O₃</code>: Al hoá trị III, O hoá trị II → <code>III×2 = II×3 = 6</code> ✔. Quy tắc dùng phép <i>nhân</i>, không phải cộng hay trừ.',
    ], ['Đúng — quy tắc hoá trị: tích của hoá trị và chỉ số nguyên tố này bằng tích của nguyên tố kia.', 'Sai — quy tắc dùng phép nhân (tích), không phải tổng.', 'Sai — quy tắc không dùng phép hiệu.', 'Sai — a·x = b·y chính là quy tắc hoá trị, có liên quan trực tiếp.']),
    Q('Trong CaCO₃, Ca có hoá trị?', ['II', 'Hoá trị I', 'Hoá trị III', 'Hoá trị IV'], 0, 'Ca thuộc nhóm IIA, hoá trị II.', [
      '<b>Calcium (Ca)</b> thuộc nhóm IIA, có <b>2 electron lớp ngoài cùng</b>, nên thường có <b>hoá trị II</b>.',
      'Trong <code>CaCO₃</code>, Ca (hoá trị II) liên kết với gốc cacbonat <code>CO₃</code> (hoá trị II): <code>II×1 = II×1</code> ✔.',
      'Các kim loại nhóm IIA khác như Mg, Ba cũng thường có hoá trị II.',
    ], ['Đúng — Ca thuộc nhóm IIA nên có hoá trị II trong CaCO₃.', 'Sai — Ca không có hoá trị I.', 'Sai — Ca không có hoá trị III.', 'Sai — Ca không có hoá trị IV.']),
  ]),

  M(9, 'Phản ứng hoá học — Định luật bảo toàn khối lượng', [
    Q('Phản ứng hoá học là?', ['Tan trong nước', 'Biến đổi trạng thái', 'Quá trình biến đổi chất này thành chất khác', 'Biến đổi hình dạng'], 2, 'Bản chất là phá vỡ và tạo liên kết mới.', [
      '<b>Phản ứng hoá học</b> là quá trình <i>biến đổi chất này thành chất khác</i>. Chất ban đầu gọi là <b>chất tham gia (chất phản ứng)</b>, chất tạo thành gọi là <b>sản phẩm</b>.',
      'Bản chất là sự <i>phá vỡ liên kết cũ</i> và <i>hình thành liên kết mới</i> giữa các nguyên tử.',
      'Phân biệt với <b>biến đổi vật lí</b> (tan trong nước, đổi trạng thái, đổi hình dạng) — những biến đổi này <i>không sinh ra chất mới</i>.',
    ], ['Sai — tan trong nước là hiện tượng vật lí, không tạo chất mới.', 'Sai — biến đổi trạng thái (rắn/lỏng/khí) là biến đổi vật lí.', 'Đúng — phản ứng hoá học là quá trình biến đổi chất này thành chất khác.', 'Sai — biến đổi hình dạng không sinh ra chất mới nên không phải phản ứng hoá học.']),
    Q('Trong phản ứng, các nguyên tử được?', ['Đổi loại', 'Bảo toàn (số lượng không đổi)', 'Mất đi', 'Tạo mới'], 1, 'Định luật bảo toàn nguyên tố.', [
      'Trong một phản ứng hoá học, các nguyên tử chỉ <i>sắp xếp lại</i> để tạo liên kết mới — <b>số lượng và loại nguyên tử của mỗi nguyên tố được bảo toàn</b>.',
      'Không có nguyên tử nào tự mất đi, sinh ra mới hay biến thành loại nguyên tử khác.',
      'Chính sự bảo toàn nguyên tử này là cơ sở của <b>định luật bảo toàn khối lượng</b> và việc cân bằng phương trình hoá học.',
    ], ['Sai — nguyên tử không biến thành loại nguyên tử khác trong phản ứng hoá học.', 'Đúng — số lượng nguyên tử mỗi nguyên tố được bảo toàn, chỉ sắp xếp lại liên kết.', 'Sai — nguyên tử không mất đi mà chỉ chuyển sang chất mới.', 'Sai — không có nguyên tử mới được tạo ra.']),
    Q('Định luật bảo toàn khối lượng phát biểu?', ['Khối lượng giảm', 'Khối lượng tăng', 'Khối lượng không liên quan', 'Tổng khối lượng các chất tham gia = tổng khối lượng các chất tạo thành'], 3, 'Lavoisier 1789.', [
      '<b>Định luật bảo toàn khối lượng</b> (do Lavoisier nêu): <i>Trong một phản ứng hoá học, tổng khối lượng các chất tham gia bằng tổng khối lượng các chất tạo thành.</i>',
      'Lí do: số nguyên tử của mỗi nguyên tố <b>không đổi</b>, chỉ liên kết được sắp xếp lại, nên khối lượng được giữ nguyên.',
      'Áp dụng: nếu biết khối lượng của (n−1) chất thì tính được chất còn lại.',
    ], ['Sai — khối lượng không giảm vì nguyên tử được bảo toàn.', 'Sai — khối lượng không tự tăng trong phản ứng kín.', 'Sai — khối lượng được bảo toàn nên rất liên quan.', 'Đúng — tổng khối lượng chất tham gia bằng tổng khối lượng chất tạo thành (Lavoisier).']),
    Q('Cho biết 2H₂ + O₂ → 2H₂O. Tỉ lệ mol giữa H₂ và O₂?', ['1:1', '1:2', '2:2', '2:1'], 3, 'Hệ số 2 và 1 ⇒ 2:1.', [
      'Trong phương trình hoá học đã cân bằng, <b>hệ số</b> trước mỗi chất chính là <i>tỉ lệ số mol</i> giữa các chất.',
      'Với <code>2H₂ + O₂ → 2H₂O</code>: hệ số của H₂ là 2, của O₂ là 1.',
      'Vậy tỉ lệ mol <b>H₂ : O₂ = 2 : 1</b>.',
    ], ['Sai — hệ số của H₂ là 2 còn O₂ là 1 nên không phải 1:1.', 'Sai — tỉ lệ ngược; phải là H₂ nhiều hơn O₂.', 'Sai — hệ số O₂ là 1, không phải 2.', 'Đúng — hệ số 2 (H₂) và 1 (O₂) cho tỉ lệ mol 2:1.']),
    Q('Dấu hiệu của phản ứng hoá học?', ['Có chất mới xuất hiện (đổi màu, kết tủa, khí, nhiệt…)', 'Chỉ thay đổi nhiệt độ', 'Không có dấu hiệu', 'Chỉ đổi mùi'], 0, 'Quan sát chất mới.', [
      'Dấu hiệu nhận biết phản ứng hoá học là sự <b>xuất hiện chất mới</b>, thường biểu hiện qua: <ul><li><i>thay đổi màu sắc</i></li><li><i>tạo chất kết tủa</i></li><li><i>sủi bọt khí</i></li><li><i>toả hoặc thu nhiệt</i> (kèm phát sáng).</li></ul>',
      'Một dấu hiệu đơn lẻ như đổi nhiệt độ hay đổi mùi <i>chưa chắc chắn</i> — cần xác nhận có chất mới sinh ra.',
      'Quan sát kĩ giúp ta phân biệt phản ứng hoá học với biến đổi vật lí.',
    ], ['Đúng — dấu hiệu nhận biết là xuất hiện chất mới: đổi màu, kết tủa, sủi khí, toả/thu nhiệt…', 'Sai — chỉ thay đổi nhiệt độ chưa đủ khẳng định có chất mới.', 'Sai — phản ứng hoá học luôn có dấu hiệu nhận biết.', 'Sai — đổi mùi chỉ là một trong nhiều dấu hiệu, không phải duy nhất.']),
    Q('Nếu m₁ + m₂ → m₃ + m₄, theo định luật bảo toàn khối lượng?', ['m₁ + m₂ = m₃ + m₄', 'm₁ = m₃', 'm₂ = m₄', 'm₁ + m₃ = m₂ + m₄'], 0, 'Tổng = tổng.', [
      'Theo định luật bảo toàn khối lượng: <b>tổng khối lượng chất tham gia bằng tổng khối lượng sản phẩm</b>.',
      'Với phản ứng <code>A + B → C + D</code>, ta có <b>m₁ + m₂ = m₃ + m₄</b>.',
      'Lưu ý: định luật chỉ ràng buộc <i>tổng</i>; từng cặp chất riêng lẻ (như m₁ và m₃) không nhất thiết bằng nhau.',
    ], ['Đúng — tổng khối lượng chất tham gia (m₁ + m₂) bằng tổng khối lượng sản phẩm (m₃ + m₄).', 'Sai — từng chất riêng lẻ không nhất thiết bằng nhau.', 'Sai — m₂ và m₄ là các chất khác nhau, không bắt buộc bằng.', 'Sai — phép ghép này không đúng với định luật bảo toàn khối lượng.']),
  ]),

  M(10, 'Tốc độ — Khái niệm và đơn vị', [
    Q('Tốc độ là đại lượng cho biết?', ['Nhiệt độ', 'Lực tác dụng', 'Mức độ nhanh hay chậm của chuyển động', 'Khối lượng vật'], 2, 'Định nghĩa tốc độ.', [
      '<b>Tốc độ</b> là đại lượng cho biết <i>mức độ nhanh hay chậm</i> của chuyển động.',
      'Tốc độ được tính bằng quãng đường đi được trong một đơn vị thời gian: <code>v = s / t</code>.',
      'Tốc độ càng lớn thì vật chuyển động càng nhanh. Đừng nhầm với nhiệt độ, lực hay khối lượng — đó là các đại lượng khác.',
    ], ['Sai — nhiệt độ đo độ nóng lạnh, không liên quan đến tốc độ.', 'Sai — lực tác dụng là đại lượng khác, đo bằng newton.', 'Đúng — tốc độ cho biết mức độ nhanh hay chậm của chuyển động.', 'Sai — khối lượng đo lượng chất của vật, không phải tốc độ.']),
    Q('Công thức tính tốc độ?', ['v = s + t', 'v = t/s', 'v = s·t', 'v = s/t'], 3, 'Tốc độ = quãng đường / thời gian.', [
      'Công thức tính tốc độ: <b>v = s / t</b> (quãng đường chia cho thời gian).',
      'Trong đó: <ul><li><b>v</b>: tốc độ</li><li><b>s</b>: quãng đường đi được</li><li><b>t</b>: thời gian đi hết quãng đường đó.</li></ul>',
      'Từ đây suy ra hai công thức dẫn xuất: <code>s = v·t</code> và <code>t = s/v</code>.',
    ], ['Sai — không cộng quãng đường với thời gian để ra tốc độ.', 'Sai — công thức bị đảo; phải lấy quãng đường chia thời gian.', 'Sai — nhân s với t cho ra đại lượng khác, không phải tốc độ.', 'Đúng — tốc độ v = quãng đường s chia cho thời gian t.']),
    Q('Đơn vị tốc độ trong SI?', ['m/s', 'm/h (mét/giờ)', 'cm/s (centimet/giây)', 'km/h (kilômét/giờ)'], 0, 'Hệ SI: mét/giây.', [
      'Vì tốc độ <code>v = s/t</code>, đơn vị của tốc độ là (đơn vị độ dài)/(đơn vị thời gian).',
      'Trong hệ SI, độ dài đo bằng mét, thời gian đo bằng giây, nên đơn vị tốc độ chuẩn là <b>m/s</b> (mét trên giây).',
      '<code>km/h</code> rất thông dụng trong đời sống nhưng <i>không phải đơn vị SI</i>; quy đổi: 1 m/s = 3,6 km/h.',
    ], ['Đúng — trong hệ SI, đơn vị tốc độ là mét trên giây (m/s).', 'Sai — m/h không phải đơn vị chuẩn SI của tốc độ.', 'Sai — cm/s dùng centimet, không phải đơn vị SI cơ bản.', 'Sai — km/h là đơn vị thông dụng nhưng không phải đơn vị SI.']),
    Q('Đổi 36 km/h sang m/s?', ['36 m/s', '100 m/s', '10 m/s', '3,6 m/s'], 2, '36 ÷ 3,6 = 10.', [
      'Quy đổi giữa hai đơn vị tốc độ: <b>1 m/s = 3,6 km/h</b>.',
      'Để đổi từ km/h sang m/s ta <i>chia cho 3,6</i>: <code>36 ÷ 3,6 = 10</code>.',
      'Vậy <b>36 km/h = 10 m/s</b>. (Ngược lại, đổi m/s sang km/h thì nhân với 3,6.)',
    ], ['Sai — chưa đổi đơn vị; 36 km/h không bằng 36 m/s.', 'Sai — kết quả 100 m/s là do nhân nhầm thay vì chia 3,6.', 'Đúng — 36 ÷ 3,6 = 10, nên 36 km/h = 10 m/s.', 'Sai — 3,6 m/s là kết quả khi chia thêm một lần nữa, sai phép tính.']),
    Q('Quãng đường s = ?', ['v·t', 't/v (thời gian chia tốc độ)', 'v + t (tốc độ cộng thời gian)', 'v/t (tốc độ chia thời gian)'], 0, 's = v · t.', [
      'Từ công thức tốc độ <code>v = s/t</code>, ta biến đổi để tìm quãng đường.',
      'Nhân cả hai vế với t: <b>s = v · t</b> (quãng đường bằng tốc độ nhân thời gian).',
      'Ví dụ: xe chạy v = 10 m/s trong t = 5 s thì s = 10 × 5 = 50 m.',
    ], ['Đúng — từ v = s/t suy ra quãng đường s = v · t.', 'Sai — t/v cho ra đại lượng khác, không phải quãng đường.', 'Sai — không cộng tốc độ với thời gian.', 'Sai — v/t chính là gia tốc, không phải quãng đường.']),
    Q('Một xe đi 60 km trong 2 giờ, tốc độ trung bình?', ['15 km/h', '30 km/h', '60 km/h', '120 km/h'], 1, 'v = 60/2 = 30.', [
      '<b>Tốc độ trung bình</b> = quãng đường chia thời gian: <code>v = s/t</code>.',
      'Thay số: <code>v = 60 km ÷ 2 h = 30 km/h</code>.',
      'Lưu ý phải <i>chia</i> cho thời gian; nếu quên chia (ra 60) hoặc nhân (ra 120) đều sai.',
    ], ['Sai — 15 km/h là chia nhầm 60 cho 4.', 'Đúng — v = s/t = 60/2 = 30 km/h.', 'Sai — 60 km/h là quên chia cho thời gian.', 'Sai — 120 km/h là nhân thay vì chia.']),
  ]),

  M(11, 'Đồ thị quãng đường — thời gian', [
    Q('Trên đồ thị (s,t), trục hoành thường là?', ['Thời gian t', 'Quãng đường s', 'Khối lượng', 'Tốc độ v'], 0, 'Trục x = t.', [
      '<b>Đồ thị quãng đường – thời gian</b> biểu diễn vị trí của vật theo thời gian, dùng hai trục.',
      'Quy ước: <ul><li><b>Trục hoành (ngang, Ox)</b>: thời gian <i>t</i>.</li><li><b>Trục tung (đứng, Os)</b>: quãng đường <i>s</i>.</li></ul>',
      'Tốc độ không phải một trục mà thể hiện qua <i>độ dốc</i> của đường biểu diễn.',
    ], ['Đúng — trục hoành (trục ngang) thường biểu diễn thời gian t.', 'Sai — quãng đường s đặt ở trục tung, không phải trục hoành.', 'Sai — khối lượng không xuất hiện trên đồ thị quãng đường - thời gian.', 'Sai — tốc độ v thể hiện qua độ dốc, không phải một trục.']),
    Q('Đường biểu diễn s theo t của chuyển động đều có dạng?', ['Đường cong', 'Parabol', 'Đường tròn', 'Đường thẳng đi qua O'], 3, 's = vt là hàm bậc nhất.', [
      'Trong <b>chuyển động đều</b>, tốc độ v không đổi nên <code>s = v·t</code> là một <i>hàm bậc nhất</i> theo t.',
      'Đồ thị của hàm bậc nhất đi qua gốc là một <b>đường thẳng đi qua gốc toạ độ O</b>.',
      'Nếu vật có gia tốc (tốc độ thay đổi) thì đồ thị s–t mới là đường cong (parabol).',
    ], ['Sai — chuyển động đều cho đường thẳng, không phải đường cong.', 'Sai — parabol ứng với chuyển động có gia tốc, không phải đều.', 'Sai — đồ thị s-t không thể là đường tròn.', 'Đúng — vì s = v·t là hàm bậc nhất nên đồ thị là đường thẳng đi qua gốc O.']),
    Q('Độ dốc đồ thị s-t cho biết?', ['Nhiệt độ', 'Khối lượng', 'Tốc độ', 'Quãng đường đi được'], 2, 'Hệ số góc = tốc độ.', [
      'Trên đồ thị s–t, <b>độ dốc</b> (hệ số góc) của đường biểu diễn được tính bằng <code>Δs / Δt</code> — chính là công thức tốc độ.',
      'Vì vậy độ dốc của đồ thị s–t cho biết <b>tốc độ</b> của vật.',
      'Đồ thị càng dốc thì tốc độ càng lớn. Còn quãng đường thì đọc trực tiếp trên trục tung.',
    ], ['Sai — nhiệt độ không liên quan đến độ dốc đồ thị s-t.', 'Sai — khối lượng không đọc được từ độ dốc.', 'Đúng — độ dốc (hệ số góc) của đồ thị s-t chính là tốc độ.', 'Sai — quãng đường đọc trên trục tung, không phải từ độ dốc.']),
    Q('Hai vật chuyển động đều, vật nào có đồ thị dốc hơn thì?', ['Đi chậm hơn', 'Cùng tốc độ', 'Đi nhanh hơn', 'Đứng yên'], 2, 'Dốc hơn ⇒ v lớn hơn.', [
      'Độ dốc của đồ thị s–t đại diện cho tốc độ. <b>Đồ thị càng dốc → tốc độ càng lớn → vật đi càng nhanh.</b>',
      'Khi vẽ hai vật trên cùng hệ trục, vật có đường dốc hơn là vật chuyển động nhanh hơn.',
      'Đường nằm ngang (độ dốc bằng 0) ứng với vật đứng yên.',
    ], ['Sai — dốc hơn nghĩa là tốc độ lớn hơn, không phải chậm hơn.', 'Sai — độ dốc khác nhau thì tốc độ khác nhau.', 'Đúng — đồ thị dốc hơn nghĩa là độ dốc lớn hơn nên tốc độ lớn hơn.', 'Sai — vật đứng yên có đồ thị nằm ngang, không dốc.']),
    Q('Đồ thị nằm ngang (s không đổi theo t) nghĩa là?', ['Vật tăng tốc', 'Vật chuyển động đều', 'Vật giảm tốc', 'Vật đứng yên'], 3, 's không đổi ⇒ không đi.', [
      'Đồ thị s–t <b>nằm ngang</b> nghĩa là quãng đường s <i>không thay đổi</i> dù thời gian t trôi qua.',
      'Vật không tiến thêm được quãng đường nào, tức là <b>vật đứng yên</b> (độ dốc = 0 → tốc độ = 0).',
      'Còn chuyển động đều cho đường thẳng dốc, chuyển động có gia tốc cho đường cong.',
    ], ['Sai — tăng tốc cho đồ thị cong đi lên, không nằm ngang.', 'Sai — chuyển động đều cho đường thẳng dốc, không nằm ngang.', 'Sai — giảm tốc cũng có đồ thị cong, không nằm ngang.', 'Đúng — s không đổi theo t nghĩa là vật không di chuyển, tức đứng yên.']),
    Q('Khi t = 0 và đồ thị đi qua gốc O, lúc đầu vật ở?', ['Đã chuyển động lâu', 'Vị trí gốc (s=0)', 'Không xác định', 'Cách gốc 1 m'], 1, 'Qua O ⇒ s₀ = 0.', [
      'Gốc toạ độ O ứng với <code>t = 0</code> và <code>s = 0</code>.',
      'Nếu đồ thị <b>đi qua gốc O</b>, có nghĩa tại thời điểm bắt đầu (t = 0) thì quãng đường s = 0 — <b>vật ở ngay vị trí gốc</b>.',
      'Nếu vật xuất phát cách gốc một đoạn, đường biểu diễn sẽ cắt trục tung tại điểm khác O.',
    ], ['Sai — đồ thị qua O nghĩa là tại t = 0 thì s = 0, chưa di chuyển.', 'Đúng — đồ thị qua gốc O cho biết tại t = 0 thì s = 0, vật ở vị trí gốc.', 'Sai — đồ thị qua O xác định rõ vị trí ban đầu là gốc.', 'Sai — nếu cách gốc 1 m thì đồ thị không cắt trục tại O.']),
  ]),

  M(12, 'Âm thanh — Nguồn âm và sự truyền âm', [
    Q('Nguồn âm là?', ['Vật phát ra âm thanh', 'Tai người', 'Không khí', 'Vật nghe được âm thanh'], 0, 'Định nghĩa nguồn âm.', [
      '<b>Nguồn âm</b> là <i>vật phát ra âm thanh</i>, ví dụ: dây đàn, mặt trống, dây thanh quản khi nói.',
      'Đặc điểm chung của mọi nguồn âm là <b>đang dao động</b> khi phát âm.',
      'Phân biệt: <i>tai người</i> là cơ quan thu nhận âm; <i>không khí</i> là môi trường truyền âm — cả hai đều không phải nguồn phát.',
    ], ['Đúng — nguồn âm là vật phát ra âm thanh.', 'Sai — tai người là cơ quan thu nhận âm, không phải nguồn phát.', 'Sai — không khí là môi trường truyền âm, không phải nguồn âm.', 'Sai — vật nghe được âm là vật thu âm, không phải nguồn phát.']),
    Q('Nguồn âm chung có đặc điểm?', ['Toả nhiệt', 'Phát ánh sáng', 'Đang dao động', 'Đứng yên'], 2, 'Dao động sinh ra âm.', [
      'Đặc điểm chung của <b>mọi nguồn âm</b> là khi phát ra âm thanh, chúng đều <b>đang dao động</b> (rung).',
      'Ví dụ: gảy đàn → dây rung; gõ trống → mặt trống rung; nói → dây thanh quản rung.',
      'Vật đứng yên không dao động thì <i>không phát ra âm</i>. Toả nhiệt, phát sáng là đặc điểm của vật khác.',
    ], ['Sai — toả nhiệt không phải đặc điểm chung của nguồn âm.', 'Sai — phát ánh sáng là đặc điểm của nguồn sáng, không phải nguồn âm.', 'Đúng — đặc điểm chung của các nguồn âm là đang dao động.', 'Sai — vật đứng yên không phát ra âm.']),
    Q('Âm truyền được trong môi trường?', ['Chân không', 'Chỉ lỏng', 'Rắn, lỏng, khí', 'Chỉ khí'], 2, 'Không truyền trong chân không.', [
      'Âm thanh là <i>sóng cơ học</i>, lan truyền nhờ dao động của các phần tử môi trường. Vì vậy âm truyền được trong cả ba môi trường vật chất: <b>rắn, lỏng và khí</b>.',
      '🚫 Âm <b>không truyền được trong chân không</b> vì ở đó không có phần tử vật chất để dao động.',
      'Đó là lí do trong vũ trụ (chân không), các nhà du hành phải liên lạc bằng sóng vô tuyến chứ không nghe được âm thanh trực tiếp.',
    ], ['Sai — chân không không có vật chất nên âm không truyền được.', 'Sai — âm truyền được trong cả rắn và khí, không chỉ lỏng.', 'Đúng — âm truyền được trong các môi trường vật chất: rắn, lỏng và khí.', 'Sai — âm cũng truyền trong rắn và lỏng, không chỉ khí.']),
    Q('Trong môi trường nào âm truyền nhanh nhất?', ['Rắn', 'Chân không', 'Môi trường lỏng', 'Môi trường khí'], 0, 'v_rắn > v_lỏng > v_khí.', [
      'Tốc độ truyền âm phụ thuộc vào sự <i>liên kết giữa các phần tử</i>: phần tử càng gắn kết chặt thì dao động lan truyền càng nhanh.',
      'Thứ tự tốc độ: <b>rắn &gt; lỏng &gt; khí</b>. Vì vậy âm truyền <b>nhanh nhất trong chất rắn</b>.',
      'Trong chân không không có phần tử nên âm không truyền được (tốc độ = 0).',
    ], ['Đúng — âm truyền nhanh nhất trong chất rắn vì các phần tử liên kết chặt.', 'Sai — chân không không truyền âm.', 'Sai — trong lỏng âm truyền chậm hơn trong rắn.', 'Sai — trong khí âm truyền chậm nhất.']),
    Q('Sóng âm là sóng?', ['Hấp dẫn', 'Ánh sáng', 'Cơ học', 'Điện từ'], 2, 'Truyền nhờ dao động phần tử môi trường.', [
      '<b>Sóng âm là sóng cơ học</b>: nó lan truyền nhờ <i>dao động của các phần tử môi trường</i> (rắn, lỏng, khí).',
      'Vì cần môi trường vật chất để truyền nên âm <i>không truyền được trong chân không</i>.',
      'Khác với <b>ánh sáng</b> là sóng điện từ — sóng điện từ truyền được cả trong chân không.',
    ], ['Sai — sóng hấp dẫn là hiện tượng khác, không phải sóng âm.', 'Sai — ánh sáng là sóng điện từ, không phải sóng âm.', 'Đúng — sóng âm là sóng cơ học, lan truyền nhờ dao động của các phần tử môi trường.', 'Sai — sóng điện từ truyền được trong chân không, còn âm thì không.']),
    Q('Đơn vị của tần số?', ['giây (s)', 'mét (m)', 'Hertz (Hz)', 'Decibel (dB)'], 2, 'Hz = số dao động/giây.', [
      '<b>Tần số</b> là số dao động vật thực hiện trong một giây. Đơn vị của tần số là <b>Hertz (Hz)</b>.',
      '<code>1 Hz = 1 dao động/giây</code>. Tần số càng lớn thì âm nghe càng cao (bổng).',
      'Đừng nhầm: <i>giây, mét</i> đo thời gian và độ dài; <i>decibel (dB)</i> đo độ to của âm.',
    ], ['Sai — giây là đơn vị thời gian, không phải tần số.', 'Sai — mét là đơn vị độ dài.', 'Đúng — tần số đo bằng Hertz (Hz), tức số dao động trong một giây.', 'Sai — decibel đo độ to của âm, không phải tần số.']),
  ]),

  M(13, 'Độ to, độ cao của âm', [
    Q('Độ to của âm phụ thuộc?', ['Tần số', 'Khối lượng nguồn', 'Biên độ dao động', 'Vận tốc truyền'], 2, 'Biên độ lớn ⇒ âm to.', [
      '<b>Độ to của âm</b> phụ thuộc vào <b>biên độ dao động</b> của nguồn âm: biên độ càng lớn thì âm nghe càng to.',
      'Ví dụ gõ trống mạnh → mặt trống rung mạnh (biên độ lớn) → âm to; gõ nhẹ → âm nhỏ.',
      'Phân biệt: <i>tần số</i> quyết định <b>độ cao</b> (bổng/trầm), còn <i>biên độ</i> quyết định <b>độ to</b> (to/nhỏ).',
    ], ['Sai — tần số quyết định độ cao của âm, không phải độ to.', 'Sai — khối lượng nguồn không trực tiếp quyết định độ to.', 'Đúng — biên độ dao động càng lớn thì âm nghe càng to.', 'Sai — vận tốc truyền âm không quyết định độ to.']),
    Q('Độ cao của âm phụ thuộc?', ['Khoảng cách', 'Biên độ', 'Tần số dao động', 'Áp suất'], 2, 'Tần số càng cao, âm càng cao.', [
      '<b>Độ cao của âm</b> (âm bổng hay trầm) phụ thuộc vào <b>tần số dao động</b>.',
      'Tần số càng lớn → âm càng <i>cao (bổng)</i>; tần số càng nhỏ → âm càng <i>thấp (trầm)</i>.',
      'Phân biệt: biên độ quyết định độ to, còn tần số quyết định độ cao.',
    ], ['Sai — khoảng cách ảnh hưởng độ to khi nghe, không phải độ cao.', 'Sai — biên độ quyết định độ to, không phải độ cao.', 'Đúng — tần số dao động càng lớn thì âm nghe càng cao (bổng).', 'Sai — áp suất không quyết định độ cao của âm.']),
    Q('Đơn vị độ to của âm?', ['Decibel (dB)', 'Hertz (Hz)', 'Pascal (Pa)', 'mét/giây (m/s)'], 0, 'Decibel = đơn vị mức cường độ âm.', [
      '<b>Độ to của âm</b> được đo bằng <b>decibel (dB)</b> — đơn vị mức cường độ âm.',
      'Một số mức tham khảo: tiếng thì thầm ~30 dB, trò chuyện ~60 dB, âm trên ~70 dB kéo dài có thể hại tai.',
      'Đừng nhầm với <i>Hertz (Hz)</i> đo tần số (độ cao), <i>Pascal (Pa)</i> đo áp suất, <i>m/s</i> đo tốc độ.',
    ], ['Đúng — độ to của âm đo bằng decibel (dB), đơn vị mức cường độ âm.', 'Sai — Hertz là đơn vị tần số, liên quan đến độ cao.', 'Sai — Pascal là đơn vị áp suất.', 'Sai — m/s là đơn vị tốc độ.']),
    Q('Tai người nghe được tần số trong khoảng?', ['1 – 5 Hz', '100 000 Hz trở lên', '0 – 10 Hz', '16 Hz – 20 000 Hz'], 3, 'Ngưỡng nghe của tai người.', [
      'Tai người chỉ cảm nhận được âm trong một dải tần số nhất định: khoảng <b>16 Hz đến 20 000 Hz</b>.',
      'Ngoài dải này: <ul><li>Âm có tần số <b>dưới 16 Hz</b> gọi là <i>hạ âm</i>.</li><li>Âm có tần số <b>trên 20 000 Hz</b> gọi là <i>siêu âm</i>.</li></ul>',
      'Cả hạ âm và siêu âm tai người đều <i>không nghe được</i>, nhưng một số loài vật (dơi, cá heo…) thì có thể.',
    ], ['Sai — 1 – 5 Hz là hạ âm, tai người không nghe được.', 'Sai — trên 100 000 Hz là siêu âm, vượt ngưỡng nghe.', 'Sai — dưới 16 Hz là hạ âm, tai người không nghe.', 'Đúng — tai người nghe được âm trong khoảng khoảng 16 Hz đến 20 000 Hz.']),
    Q('Siêu âm là âm có tần số?', ['Dưới 16 Hz', 'Trong 100 Hz', 'Trên 20 000 Hz', '500 Hz'], 2, '> 20 kHz.', [
      '<b>Siêu âm</b> là âm có tần số <b>trên 20 000 Hz</b>, vượt quá ngưỡng nghe của tai người.',
      'Siêu âm được ứng dụng nhiều: máy <i>siêu âm thai</i>, đo độ sâu biển (sonar), làm sạch dụng cụ…',
      'Loài dơi, cá heo phát và thu siêu âm để định vị con mồi.',
    ], ['Sai — dưới 16 Hz là hạ âm, không phải siêu âm.', 'Sai — 100 Hz nằm trong vùng nghe được của tai người.', 'Đúng — siêu âm là âm có tần số trên 20 000 Hz, vượt ngưỡng nghe.', 'Sai — 500 Hz vẫn nằm trong vùng nghe được.']),
    Q('Hạ âm là âm có tần số?', ['Dưới 16 Hz', '100 Hz', 'Trên 20 000 Hz', '1 000 Hz'], 0, '< 16 Hz.', [
      '<b>Hạ âm</b> là âm có tần số <b>dưới 16 Hz</b>, thấp hơn ngưỡng nghe nên tai người không cảm nhận được.',
      'Hạ âm sinh ra từ các nguồn dao động chậm như động đất, sóng biển lớn, máy móc nặng.',
      'Đối lập với hạ âm là <i>siêu âm</i> (trên 20 000 Hz). Các giá trị 100 Hz, 1000 Hz đều nằm trong vùng nghe được.',
    ], ['Đúng — hạ âm là âm có tần số dưới 16 Hz, tai người không nghe được.', 'Sai — 100 Hz nằm trong vùng nghe được.', 'Sai — trên 20 000 Hz là siêu âm, không phải hạ âm.', 'Sai — 1 000 Hz nằm trong vùng nghe được của tai người.']),
  ]),

  M(14, 'Ánh sáng — Định luật phản xạ', [
    Q('Ánh sáng truyền theo đường?', ['Thẳng trong môi trường đồng tính, trong suốt', 'Cong khi gặp vật cản', 'Ngẫu nhiên', 'Đường tròn'], 0, 'Định luật truyền thẳng ánh sáng.', [
      '<b>Định luật truyền thẳng của ánh sáng</b>: trong môi trường <i>trong suốt và đồng tính</i>, ánh sáng truyền theo <b>đường thẳng</b>.',
      'Đường truyền của ánh sáng được biểu diễn bằng <i>tia sáng</i> (đường thẳng có mũi tên chỉ hướng).',
      'Hệ quả: khi gặp vật cản, ánh sáng bị chặn lại tạo nên <b>bóng tối</b> phía sau vật, chứ không “lách” cong quanh vật.',
    ], ['Đúng — trong môi trường trong suốt và đồng tính, ánh sáng truyền theo đường thẳng.', 'Sai — gặp vật cản ánh sáng bị chặn, không tự cong quanh vật.', 'Sai — ánh sáng truyền có quy luật, không ngẫu nhiên.', 'Sai — ánh sáng không truyền theo đường tròn trong môi trường đồng tính.']),
    Q('Trong định luật phản xạ, góc tới = ?', ['Góc phản xạ', 'Bằng 90°', 'Góc tới gấp đôi', 'Góc khúc xạ'], 0, 'i = i\'.', [
      '<b>Định luật phản xạ ánh sáng</b> gồm hai nội dung. Nội dung thứ hai: <b>góc phản xạ bằng góc tới</b> (<code>i\' = i</code>).',
      '<i>Góc tới</i> là góc giữa tia tới và pháp tuyến; <i>góc phản xạ</i> là góc giữa tia phản xạ và pháp tuyến.',
      'Đừng nhầm với <b>góc khúc xạ</b> — đó là hiện tượng ánh sáng đổi hướng khi truyền qua hai môi trường khác nhau.',
    ], ['Đúng — định luật phản xạ: góc tới bằng góc phản xạ (i = i\').', 'Sai — góc tới không cố định bằng 90°.', 'Sai — góc tới không gấp đôi chính nó.', 'Sai — góc khúc xạ thuộc hiện tượng khúc xạ, không phải phản xạ.']),
    Q('Tia tới, tia phản xạ và pháp tuyến nằm?', ['Trong cùng một mặt phẳng', 'Trên trục y', 'Trên ba mặt phẳng khác nhau', 'Trên trục x'], 0, 'Định luật phản xạ.', [
      'Nội dung thứ nhất của <b>định luật phản xạ ánh sáng</b>: tia tới, tia phản xạ và pháp tuyến (tại điểm tới) <b>cùng nằm trong một mặt phẳng</b>.',
      'Tia tới và tia phản xạ nằm về <i>hai phía</i> của pháp tuyến.',
      'Kết hợp với nội dung thứ hai (i\' = i), ta xác định được hướng tia phản xạ.',
    ], ['Đúng — tia tới, tia phản xạ và pháp tuyến cùng nằm trong một mặt phẳng.', 'Sai — chúng không bị giới hạn trên một trục toạ độ.', 'Sai — ba đường này nằm trong cùng một mặt phẳng, không phải ba mặt khác nhau.', 'Sai — chúng không nằm trên trục x.']),
    Q('Pháp tuyến tại điểm tới là?', ['Đường nằm ngang', 'Đường thẳng đi qua nguồn sáng', 'Đường tia tới', 'Đường vuông góc với mặt phản xạ tại điểm tới'], 3, 'Định nghĩa pháp tuyến.', [
      '<b>Pháp tuyến</b> tại điểm tới là <i>đường thẳng vuông góc với mặt phản xạ</i> ngay tại điểm mà tia sáng đập vào.',
      'Pháp tuyến là mốc để đo <b>góc tới</b> và <b>góc phản xạ</b> (đều tính từ tia tới/tia phản xạ đến pháp tuyến).',
      'Pháp tuyến không nhất thiết nằm ngang — nó phụ thuộc vào hướng của mặt phản xạ.',
    ], ['Sai — pháp tuyến không nhất thiết nằm ngang, phụ thuộc mặt phản xạ.', 'Sai — pháp tuyến không phải đường nối tới nguồn sáng.', 'Sai — tia tới và pháp tuyến là hai đường khác nhau.', 'Đúng — pháp tuyến là đường vuông góc với mặt phản xạ tại điểm tới.']),
    Q('Bóng tối là vùng?', ['Hoàn toàn không nhận được ánh sáng từ nguồn', 'Sáng yếu', 'Có cả ánh sáng và bóng', 'Phản chiếu ánh sáng'], 0, 'Phía sau vật chắn sáng.', [
      'Do ánh sáng truyền thẳng, khi gặp vật cản sáng sẽ tạo ra vùng tối phía sau vật.',
      '<b>Bóng tối</b> là vùng phía sau vật chắn <b>hoàn toàn không nhận được ánh sáng</b> từ nguồn.',
      'Phân biệt với <i>bóng nửa tối</i> — vùng chỉ nhận được <b>một phần</b> ánh sáng (sáng yếu), xuất hiện khi nguồn sáng có kích thước.',
    ], ['Đúng — bóng tối là vùng phía sau vật chắn, hoàn toàn không nhận được ánh sáng từ nguồn.', 'Sai — vùng sáng yếu là bóng nửa tối, không phải bóng tối.', 'Sai — vùng có cả ánh sáng lẫn bóng là bóng nửa tối.', 'Sai — bóng tối không phản chiếu ánh sáng.']),
    Q('Bóng nửa tối hình thành khi?', ['Vật chắn rất nhỏ', 'Không có vật chắn', 'Nguồn sáng có kích thước (không là điểm)', 'Nguồn sáng là điểm'], 2, 'Một phần ánh sáng vẫn tới được.', [
      '<b>Bóng nửa tối</b> là vùng chỉ nhận được <i>một phần</i> ánh sáng từ nguồn nên sáng yếu.',
      'Nó hình thành khi <b>nguồn sáng có kích thước</b> (không phải nguồn điểm): các điểm khác nhau trên nguồn chiếu sáng được những vùng khác nhau quanh vật chắn.',
      'Nếu nguồn sáng là <i>điểm</i> thì chỉ tạo bóng tối rõ nét, không có bóng nửa tối.',
    ], ['Sai — kích thước vật chắn nhỏ không phải nguyên nhân chính của bóng nửa tối.', 'Sai — không có vật chắn thì không có bóng nào.', 'Đúng — nguồn sáng có kích thước (không là điểm) khiến một phần ánh sáng vẫn tới được, tạo bóng nửa tối.', 'Sai — nguồn sáng điểm chỉ tạo bóng tối rõ nét, không tạo bóng nửa tối.']),
  ]),

  M(15, 'Ảnh của vật qua gương phẳng', [
    Q('Ảnh tạo bởi gương phẳng là?', ['Ảnh ảo, đối xứng, kích thước bằng vật', 'Ảnh ảo, lớn hơn vật', 'Ảnh thật, ngược chiều', 'Ảnh thật, nhỏ hơn vật'], 0, 'Đặc điểm ảnh gương phẳng.', [
      'Ảnh của một vật tạo bởi <b>gương phẳng</b> có các đặc điểm: <ul><li>là <b>ảnh ảo</b> (không hứng được trên màn);</li><li><b>kích thước bằng vật</b>;</li><li><b>đối xứng</b> với vật qua mặt gương.</li></ul>',
      'Khoảng cách từ ảnh đến gương bằng khoảng cách từ vật đến gương.',
      'Ảnh bị <i>đảo trái – phải</i> nên khi giơ tay phải, ảnh “giơ tay trái”.',
    ], ['Đúng — gương phẳng cho ảnh ảo, đối xứng qua gương và có kích thước bằng vật.', 'Sai — ảnh qua gương phẳng bằng vật, không lớn hơn.', 'Sai — gương phẳng cho ảnh ảo, không phải ảnh thật ngược chiều.', 'Sai — ảnh không nhỏ hơn vật và không phải ảnh thật.']),
    Q('Khoảng cách từ ảnh đến gương so với vật?', ['Nhỏ hơn', 'Gấp đôi', 'Bằng nhau', 'Lớn hơn'], 2, 'Đối xứng qua gương.', [
      'Ảnh qua gương phẳng <b>đối xứng với vật qua mặt gương</b>.',
      'Do tính đối xứng, khoảng cách từ ảnh đến gương luôn <b>bằng</b> khoảng cách từ vật đến gương.',
      'Vật càng lùi xa gương thì ảnh càng lùi xa gương đúng bấy nhiêu (cùng tốc độ).',
    ], ['Sai — khoảng cách ảnh đến gương không nhỏ hơn khoảng cách vật đến gương.', 'Sai — không gấp đôi mà bằng nhau.', 'Đúng — ảnh đối xứng qua gương nên cách gương đúng bằng khoảng cách của vật.', 'Sai — khoảng cách bằng nhau, không lớn hơn.']),
    Q('Ảnh trong gương phẳng có thể hứng được trên màn?', ['Có khi sáng', 'Có (ảnh thật)', 'Tuỳ vật', 'Không (ảnh ảo)'], 3, 'Ảnh ảo không hứng được.', [
      'Ảnh qua gương phẳng là <b>ảnh ảo</b>: các tia phản xạ <i>không thực sự gặp nhau</i> mà chỉ có đường kéo dài của chúng gặp nhau ở phía sau gương.',
      'Vì không có ánh sáng thật hội tụ tại đó nên <b>ảnh ảo không hứng được trên màn</b>.',
      'Điều này luôn đúng với gương phẳng, không phụ thuộc vào vật hay độ sáng.',
    ], ['Sai — ảnh ảo không hứng được dù sáng hay tối.', 'Sai — ảnh gương phẳng là ảnh ảo, không phải ảnh thật.', 'Sai — không phụ thuộc vào vật; gương phẳng luôn cho ảnh ảo.', 'Đúng — ảnh gương phẳng là ảnh ảo nên không hứng được trên màn.']),
    Q('Khi đứng trước gương phẳng giơ tay phải, ảnh giơ?', ['Cả hai tay', 'Không thấy tay', 'Tay phải', 'Tay trái (ngược trái-phải)'], 3, 'Đặc trưng ảnh gương.', [
      'Ảnh qua gương phẳng tuy bằng vật và cùng chiều trên–dưới, nhưng bị <b>đảo trái – phải</b>.',
      'Vì vậy khi bạn giơ <i>tay phải</i> thì ảnh trong gương sẽ giơ <b>tay trái</b> (so với người nhìn).',
      'Đây là lí do chữ viết soi gương bị “lộn ngược” trái–phải.',
    ], ['Sai — ảnh chỉ giơ một tay tương ứng, không phải cả hai.', 'Sai — vẫn thấy tay trong ảnh.', 'Sai — ảnh gương bị đảo trái - phải nên không giơ tay phải.', 'Đúng — ảnh gương đảo trái - phải, nên khi bạn giơ tay phải thì ảnh giơ tay trái.']),
    Q('Để vẽ ảnh qua gương phẳng, dùng phép?', ['Tịnh tiến', 'Đối xứng qua gương', 'Co giãn', 'Quay 90°'], 1, 'Phép đối xứng trục.', [
      'Vì ảnh đối xứng với vật qua mặt gương nên để dựng ảnh, ta dùng <b>phép đối xứng trục</b> (lấy mặt gương làm trục đối xứng).',
      'Cách làm: từ mỗi điểm của vật hạ đường <i>vuông góc với gương</i> rồi lấy điểm đối xứng ở phía sau gương với khoảng cách bằng nhau.',
      'Không dùng tịnh tiến, co giãn hay quay vì ảnh luôn <i>bằng vật</i> và đối xứng.',
    ], ['Sai — tịnh tiến không cho ảnh đối xứng qua gương.', 'Đúng — vẽ ảnh qua gương phẳng dùng phép đối xứng trục qua mặt gương.', 'Sai — ảnh bằng vật nên không có co giãn.', 'Sai — không quay 90° mà lấy đối xứng qua gương.']),
    Q('Ứng dụng gương phẳng?', ['Hội tụ ánh sáng mặt trời', 'Khúc xạ', 'Soi gương, kính chiếu hậu, kính tiềm vọng', 'Phân tách màu'], 2, 'Phản xạ ánh sáng.', [
      'Nhờ tính chất <b>phản xạ ánh sáng</b> tạo ảnh ảo bằng vật, gương phẳng có nhiều ứng dụng thực tế.',
      'Ví dụ: <i>gương soi</i> trong nhà, <i>kính chiếu hậu</i> xe, <i>kính tiềm vọng</i> để quan sát qua vật cản.',
      'Phân biệt: hội tụ ánh sáng là của <i>gương cầu lõm</i>; khúc xạ là của <i>thấu kính</i>; phân tách màu là của <i>lăng kính</i>.',
    ], ['Sai — hội tụ ánh sáng là chức năng của gương cầu lõm, không phải gương phẳng.', 'Sai — khúc xạ là hiện tượng của thấu kính, không phải gương phẳng.', 'Đúng — gương phẳng dùng để soi gương, làm kính chiếu hậu, kính tiềm vọng nhờ phản xạ ánh sáng.', 'Sai — phân tách màu là của lăng kính, không phải gương phẳng.']),
  ]),

  M(16, 'Từ trường — Nam châm', [
    Q('Mỗi nam châm có?', ['Hai cực: Bắc (N) và Nam (S)', 'Bốn cực', 'Ba cực', 'Một cực'], 0, 'Lưỡng cực từ.', [
      'Mỗi nam châm luôn có <b>hai cực</b>: cực Bắc (kí hiệu <b>N</b> — North) và cực Nam (kí hiệu <b>S</b> — South).',
      'Tại hai cực, lực từ mạnh nhất; ở giữa nam châm lực từ yếu nhất.',
      'Dù bẻ nhỏ thế nào, mỗi mảnh vẫn là một nam châm <i>có đủ hai cực</i> — không thể tạo nam châm chỉ có một cực.',
    ], ['Đúng — mỗi nam châm luôn có hai cực: cực Bắc (N) và cực Nam (S).', 'Sai — nam châm thông thường chỉ có hai cực, không phải bốn.', 'Sai — không có nam châm ba cực.', 'Sai — không thể tách nam châm để chỉ còn một cực.']),
    Q('Hai cực cùng tên (N-N hoặc S-S) sẽ?', ['Không tương tác', 'Đẩy nhau', 'Tan ra', 'Hút nhau'], 1, 'Cùng dấu đẩy.', [
      'Tương tác giữa các cực nam châm tuân theo quy tắc: <b>cùng tên thì đẩy, khác tên thì hút</b>.',
      'Vì vậy đưa hai cực <b>cùng tên</b> (N–N hoặc S–S) lại gần nhau, chúng sẽ <b>đẩy nhau</b>.',
      'Quy tắc này tương tự như điện tích: cùng dấu thì đẩy, trái dấu thì hút.',
    ], ['Sai — hai cực cùng tên có tương tác đẩy nhau.', 'Đúng — hai cực cùng tên (N-N hoặc S-S) thì đẩy nhau.', 'Sai — nam châm không tan ra khi đặt gần nhau.', 'Sai — hút nhau là khi hai cực khác tên.']),
    Q('Hai cực khác tên (N-S) sẽ?', ['Không tương tác', 'Trộn lẫn', 'Đẩy nhau', 'Hút nhau'], 3, 'Khác dấu hút.', [
      'Theo quy tắc tương tác từ: <b>cùng tên đẩy nhau, khác tên hút nhau</b>.',
      'Hai cực <b>khác tên</b> (N–S) khi đưa lại gần sẽ <b>hút nhau</b>.',
      'Đó là lí do kim la bàn (cực N) bị hút quay về phía cực Nam từ của Trái Đất ở gần Bắc Cực địa lí.',
    ], ['Sai — hai cực khác tên có tương tác hút nhau.', 'Sai — nam châm không trộn lẫn vào nhau.', 'Sai — đẩy nhau là khi hai cực cùng tên.', 'Đúng — hai cực khác tên (N-S) thì hút nhau.']),
    Q('Từ trường là?', ['Vùng có nhiệt độ cao', 'Vùng có ánh sáng', 'Vùng không gian xung quanh nam châm hoặc dòng điện, có lực từ tác dụng lên kim nam châm', 'Vùng tích điện'], 2, 'Định nghĩa từ trường.', [
      '<b>Từ trường</b> là vùng không gian xung quanh <i>nam châm</i> hoặc <i>dòng điện</i>, trong đó có <b>lực từ</b> tác dụng lên kim nam châm đặt vào.',
      'Để phát hiện từ trường, ta dùng <i>kim nam châm nhỏ</i> (la bàn): nơi nào kim bị lệch hướng thì nơi đó có từ trường.',
      'Từ trường được biểu diễn bằng các <i>đường sức từ</i>. Đừng nhầm với điện trường (quanh vật tích điện).',
    ], ['Sai — nhiệt độ cao không phải đặc trưng của từ trường.', 'Sai — ánh sáng không định nghĩa từ trường.', 'Đúng — từ trường là vùng không gian quanh nam châm hoặc dòng điện, có lực từ tác dụng lên kim nam châm.', 'Sai — vùng tích điện liên quan đến điện trường, không phải từ trường.']),
    Q('Trái Đất có từ trường?', ['Không, chỉ có trọng lực', 'Chỉ ở xích đạo', 'Có', 'Chỉ ở Bắc Cực'], 2, 'Từ trường Trái Đất → la bàn hoạt động.', [
      '<b>Trái Đất có từ trường</b> bao quanh toàn bộ hành tinh, giống như một thanh nam châm khổng lồ đặt bên trong.',
      'Nhờ từ trường này mà <i>kim la bàn</i> luôn định hướng được theo phương Bắc – Nam.',
      'Từ trường Trái Đất còn là “lá chắn” bảo vệ sự sống khỏi các hạt mang điện có hại từ Mặt Trời.',
    ], ['Sai — Trái Đất có cả trọng lực lẫn từ trường.', 'Sai — từ trường Trái Đất bao quanh toàn cầu, không chỉ ở xích đạo.', 'Đúng — Trái Đất có từ trường, nhờ đó kim la bàn định hướng được.', 'Sai — từ trường tồn tại khắp Trái Đất, không riêng Bắc Cực.']),
    Q('Cực Bắc địa lí Trái Đất gần?', ['Cực Nam từ', 'Không có cực từ', 'Cả hai cực', 'Cực Bắc từ'], 0, 'Cực Bắc địa lí ≈ cực S từ ⇒ hút cực N kim la bàn.', [
      'Trái Đất như một nam châm, hai <i>cực từ</i> nằm gần (nhưng không trùng) hai cực địa lí.',
      'Gần <b>cực Bắc địa lí</b> là <b>cực Nam từ (S)</b> của Trái Đất.',
      'Vì khác tên thì hút nhau, cực Nam từ này <i>hút cực Bắc (N)</i> của kim la bàn, nên đầu N của kim luôn chỉ về phương Bắc.',
    ], ['Đúng — gần cực Bắc địa lí là cực Nam từ (S), nên nó hút cực Bắc (N) của kim la bàn.', 'Sai — Trái Đất có cực từ gần các cực địa lí.', 'Sai — cực Bắc địa lí chỉ gần một cực từ (cực Nam từ).', 'Sai — gần cực Bắc địa lí là cực Nam từ, không phải cực Bắc từ.']),
  ]),

  M(17, 'Đường sức từ — La bàn', [
    Q('Đường sức từ ở ngoài nam châm có chiều?', ['Không có chiều', 'Hỗn loạn', 'Đi ra từ cực Nam', 'Đi ra từ cực Bắc, đi vào cực Nam'], 3, 'Quy ước.', [
      '<b>Đường sức từ</b> là những đường dùng để biểu diễn từ trường. Người ta quy ước cho chúng một <i>chiều</i> xác định.',
      'Quy ước: bên ngoài nam châm, đường sức từ <b>đi ra từ cực Bắc (N)</b> và <b>đi vào cực Nam (S)</b>.',
      'Các đường sức từ là những đường cong khép kín, không cắt nhau, dày ở gần cực (từ trường mạnh) và thưa ở xa.',
    ], ['Sai — đường sức từ có chiều xác định theo quy ước.', 'Sai — đường sức từ sắp xếp có quy luật, không hỗn loạn.', 'Sai — ở ngoài nam châm, đường sức đi ra từ cực Bắc chứ không phải cực Nam.', 'Đúng — quy ước: bên ngoài nam châm, đường sức từ đi ra từ cực Bắc và đi vào cực Nam.']),
    Q('Tại mỗi điểm trong từ trường, kim nam châm nhỏ đặt cân bằng chỉ hướng?', ['Vuông góc đường sức', 'Bất kì', 'Lên cao', 'Tiếp tuyến đường sức từ'], 3, 'Tiếp tuyến với đường sức.', [
      'Khi đặt một <i>kim nam châm nhỏ</i> vào từ trường, nó sẽ quay đến vị trí cân bằng và nằm <b>theo phương tiếp tuyến của đường sức từ</b> tại điểm đó.',
      'Chiều của kim (đầu N) trùng với <i>chiều của đường sức từ</i>.',
      'Đây chính là cơ sở để dùng nhiều kim nam châm (hoặc mạt sắt) vẽ ra hình ảnh các đường sức.',
    ], ['Sai — kim nam châm nằm dọc theo đường sức, không vuông góc.', 'Sai — kim chỉ hướng xác định theo từ trường, không tuỳ ý.', 'Sai — kim không chỉ thẳng lên cao mà theo phương đường sức.', 'Đúng — kim nam châm đặt cân bằng nằm theo tiếp tuyến của đường sức từ tại điểm đó.']),
    Q('Nam châm điện gồm?', ['Hai miếng sắt', 'Chỉ pin', 'Cuộn dây có dòng điện và lõi sắt non', 'Đồng và nhôm'], 2, 'Cuộn dây + lõi sắt non.', [
      '<b>Nam châm điện</b> gồm một <b>cuộn dây dẫn</b> quấn quanh một <b>lõi sắt non</b>; khi có dòng điện chạy qua cuộn dây, lõi sắt trở thành nam châm.',
      'Ưu điểm: có thể <i>bật/tắt</i> từ tính (ngắt dòng điện thì mất từ) và <i>điều chỉnh độ mạnh</i> dễ dàng.',
      'Ứng dụng: cần cẩu điện nâng sắt thép, chuông điện, rơ-le…',
    ], ['Sai — hai miếng sắt không tạo ra nam châm điện.', 'Sai — chỉ có pin thì chưa thành nam châm điện.', 'Đúng — nam châm điện gồm cuộn dây có dòng điện chạy qua và lõi sắt non.', 'Sai — đồng và nhôm không phải cấu tạo của nam châm điện.']),
    Q('Cách tăng từ trường của nam châm điện?', ['Tăng cường độ dòng điện và số vòng dây', 'Giảm dòng điện', 'Bỏ lõi sắt', 'Hạ nhiệt độ tới 0'], 0, 'B ∝ NI.', [
      'Độ mạnh của nam châm điện phụ thuộc vào <i>cường độ dòng điện</i> và <i>số vòng dây</i> của cuộn dây.',
      'Muốn từ trường mạnh hơn, ta: <ul><li><b>tăng cường độ dòng điện</b> chạy qua cuộn dây;</li><li><b>tăng số vòng dây</b>;</li><li>dùng <i>lõi sắt non</i> bên trong cuộn dây.</li></ul>',
      'Ngược lại, giảm dòng điện hay bỏ lõi sắt sẽ làm từ trường yếu đi.',
    ], ['Đúng — tăng cường độ dòng điện và số vòng dây làm từ trường nam châm điện mạnh lên.', 'Sai — giảm dòng điện làm từ trường yếu đi.', 'Sai — bỏ lõi sắt làm từ trường yếu hơn.', 'Sai — hạ nhiệt độ tới 0 không phải cách tăng từ trường nam châm điện ở cấp THCS.']),
    Q('La bàn dùng để?', ['Đo thời gian', 'Đo khối lượng', 'Đo nhiệt độ', 'Xác định phương hướng'], 3, 'Dụng cụ định hướng.', [
      '<b>La bàn</b> là dụng cụ dùng để <b>xác định phương hướng</b>, bộ phận chính là một <i>kim nam châm</i> quay tự do.',
      'Nhờ từ trường Trái Đất, kim la bàn luôn nằm theo hướng <b>Bắc – Nam</b>, giúp người dùng định hướng.',
      'Đo thời gian dùng đồng hồ, đo khối lượng dùng cân, đo nhiệt độ dùng nhiệt kế — không phải chức năng của la bàn.',
    ], ['Sai — đo thời gian là chức năng của đồng hồ.', 'Sai — đo khối lượng dùng cân.', 'Sai — đo nhiệt độ dùng nhiệt kế.', 'Đúng — la bàn dùng để xác định phương hướng nhờ từ trường Trái Đất.']),
    Q('Kim la bàn luôn chỉ?', ['Hướng Tây', 'Hướng Đông', 'Bất kì', 'Hướng Bắc - Nam địa từ'], 3, 'Do từ trường Trái Đất.', [
      'Khi để tự do, kim la bàn chịu tác dụng của <i>từ trường Trái Đất</i> và quay đến vị trí cân bằng nằm theo hướng <b>Bắc – Nam địa từ</b>.',
      'Đầu kim sơn màu (cực N) chỉ về phương <b>Bắc</b>, đầu còn lại chỉ phương <b>Nam</b>.',
      'Nhờ tính chất này mà la bàn luôn cho biết phương hướng, dù người dùng xoay theo chiều nào.',
    ], ['Sai — kim la bàn không chỉ cố định hướng Tây.', 'Sai — kim la bàn không chỉ cố định hướng Đông.', 'Sai — kim la bàn luôn định hướng theo từ trường, không tuỳ ý.', 'Đúng — kim la bàn luôn nằm theo hướng Bắc - Nam địa từ do từ trường Trái Đất.']),
  ]),

  M(18, 'Ôn tập học kì I', [
    Q('Trong nguyên tử, hạt nhân gồm?', ['Electron', 'Chỉ proton', 'Proton và neutron', 'Chỉ neutron'], 2, 'p + n.', [
      'Ôn lại cấu tạo nguyên tử: hạt nhân ở giữa, lớp vỏ electron bên ngoài.',
      '<b>Hạt nhân gồm proton (+) và neutron (không điện)</b>; còn electron (−) nằm ở lớp vỏ.',
      'Vì proton mang điện dương còn neutron trung hoà nên hạt nhân mang điện dương.',
    ], ['Sai — electron nằm ở lớp vỏ, không thuộc hạt nhân.', 'Sai — hạt nhân còn có neutron, không chỉ proton.', 'Đúng — hạt nhân gồm proton và neutron.', 'Sai — hạt nhân còn có proton, không chỉ neutron.']),
    Q('NaCl được hình thành bởi liên kết?', ['Kim loại', 'Liên kết hiđro', 'Cộng hoá trị', 'Ion'], 3, 'Na cho 1e, Cl nhận 1e.', [
      'Ôn lại: <code>NaCl</code> tạo từ kim loại Na và phi kim Cl nên có <b>liên kết ion</b>.',
      'Na nhường 1e thành Na⁺, Cl nhận 1e thành Cl⁻; hai ion trái dấu hút nhau.',
      'Nhớ quy tắc: kim loại + phi kim → liên kết ion; phi kim + phi kim → cộng hoá trị.',
    ], ['Sai — liên kết kim loại chỉ có giữa các kim loại.', 'Sai — liên kết hiđro là lực yếu giữa phân tử, không phải bản chất NaCl.', 'Sai — cộng hoá trị là dùng chung e; ở NaCl là cho - nhận e.', 'Đúng — Na cho 1e, Cl nhận 1e tạo ion Na⁺ và Cl⁻ liên kết ion.']),
    Q('Định luật bảo toàn khối lượng phát biểu rằng?', ['Khối lượng không liên quan', 'Tổng m chất phản ứng = tổng m chất sản phẩm', 'Khối lượng tăng', 'Khối lượng giảm'], 1, 'Lavoisier.', [
      'Ôn lại định luật của Lavoisier: trong phản ứng hoá học, <b>tổng khối lượng các chất phản ứng bằng tổng khối lượng các chất sản phẩm</b>.',
      'Cơ sở: số nguyên tử mỗi nguyên tố không đổi, chỉ sắp xếp lại liên kết.',
      'Vì vậy khối lượng không tự tăng hay giảm trong phản ứng kín.',
    ], ['Sai — khối lượng được bảo toàn nên rất liên quan.', 'Đúng — tổng khối lượng các chất phản ứng bằng tổng khối lượng các chất sản phẩm.', 'Sai — khối lượng không tự tăng trong phản ứng kín.', 'Sai — khối lượng không giảm vì nguyên tử được bảo toàn.']),
    Q('Tốc độ trung bình của xe đi 100 km trong 2 giờ?', ['100 km/h', '200 km/h', '50 km/h', '25 km/h'], 2, 'v = s/t = 50.', [
      'Áp dụng công thức tốc độ trung bình: <code>v = s/t</code>.',
      'Thay số: <code>v = 100 km ÷ 2 h = 50 km/h</code>.',
      'Phải <i>chia</i> quãng đường cho thời gian; quên chia (ra 100) hoặc nhân (ra 200) đều sai.',
    ], ['Sai — 100 km/h là quên chia cho thời gian.', 'Sai — 200 km/h là nhân thay vì chia.', 'Đúng — v = s/t = 100/2 = 50 km/h.', 'Sai — 25 km/h là chia nhầm 100 cho 4.']),
    Q('Âm truyền được trong?', ['Rắn, lỏng, khí', 'Chỉ rắn', 'Chỉ khí', 'Chỉ chân không'], 0, 'Cần môi trường vật chất.', [
      'Ôn lại: âm là sóng cơ học, truyền được trong các môi trường vật chất <b>rắn, lỏng và khí</b>.',
      'Âm <b>không truyền được trong chân không</b> vì không có phần tử để dao động.',
      'Tốc độ truyền âm: rắn &gt; lỏng &gt; khí.',
    ], ['Đúng — âm truyền được trong cả ba môi trường vật chất: rắn, lỏng và khí.', 'Sai — âm cũng truyền trong lỏng và khí, không chỉ rắn.', 'Sai — âm cũng truyền trong rắn và lỏng, không chỉ khí.', 'Sai — chân không không truyền âm vì không có vật chất.']),
    Q('Ảnh qua gương phẳng là?', ['Ảnh ảo, đối xứng, bằng vật', 'Ảnh thật, ngược chiều', 'Ảnh ảo, nhỏ hơn', 'Ảnh thật, lớn hơn'], 0, 'Đặc trưng gương phẳng.', [
      'Ôn lại đặc điểm ảnh qua gương phẳng: <b>ảnh ảo</b>, <b>bằng vật</b> và <b>đối xứng</b> với vật qua mặt gương.',
      'Ảnh ảo nên <i>không hứng được trên màn</i>, và bị <i>đảo trái – phải</i>.',
      'Khoảng cách từ ảnh đến gương bằng khoảng cách từ vật đến gương.',
    ], ['Đúng — gương phẳng cho ảnh ảo, đối xứng qua gương và bằng vật.', 'Sai — gương phẳng không cho ảnh thật ngược chiều.', 'Sai — ảnh bằng vật, không nhỏ hơn.', 'Sai — ảnh không phải ảnh thật và không lớn hơn vật.']),
  ]),

  // ──────────────── HK2 ────────────────
  M(19, 'Dòng điện và mạch điện đơn giản', [
    Q('Dòng điện là?', ['Dòng nước trong dây', 'Dòng các hạt mang điện chuyển động có hướng', 'Dòng ánh sáng', 'Dòng nhiệt'], 1, 'Định nghĩa cơ bản.', [
      '<b>Dòng điện</b> là <i>dòng các hạt mang điện chuyển động có hướng</i>.',
      'Trong dây kim loại, hạt mang điện là các <b>electron tự do</b> dịch chuyển có hướng dưới tác dụng của nguồn điện.',
      'Dòng điện có thể gây ra nhiều tác dụng: nhiệt, phát sáng, từ, hoá học, sinh lí.',
    ], ['Sai — dây dẫn điện không chứa dòng nước.', 'Đúng — dòng điện là dòng các hạt mang điện chuyển động có hướng.', 'Sai — ánh sáng không phải dòng điện.', 'Sai — dòng nhiệt là sự truyền nhiệt, không phải dòng điện.']),
    Q('Chiều quy ước dòng điện?', ['Từ cực dương qua dây dẫn đến cực âm của nguồn', 'Từ cực âm sang dương bên ngoài nguồn', 'Từ âm sang dương', 'Ngẫu nhiên'], 0, 'Quy ước cổ điển.', [
      '<b>Chiều quy ước của dòng điện</b>: trong mạch ngoài, dòng điện đi <b>từ cực dương (+)</b> qua dây dẫn và các thiết bị <b>đến cực âm (−)</b> của nguồn.',
      'Đây là quy ước có từ trước khi người ta biết về electron, nên ngược chiều chuyển động thực của electron trong dây kim loại.',
      'Cần nhớ chiều quy ước này để xác định chiều dòng điện khi vẽ mạch.',
    ], ['Đúng — chiều quy ước dòng điện đi từ cực dương qua dây dẫn đến cực âm của nguồn.', 'Sai — chiều quy ước đi từ dương sang âm bên ngoài nguồn, không phải ngược lại.', 'Sai — chiều quy ước là từ dương sang âm, không phải từ âm sang dương.', 'Sai — chiều dòng điện có quy ước rõ ràng, không ngẫu nhiên.']),
    Q('Đơn vị cường độ dòng điện?', ['Vôn (V)', 'Ôm (Ω)', 'Oát (W)', 'Ampe (A)'], 3, 'A.', [
      '<b>Cường độ dòng điện</b> (kí hiệu I) cho biết độ mạnh yếu của dòng điện, được đo bằng <b>ampe (A)</b>.',
      'Đơn vị nhỏ hơn: <code>1 A = 1000 mA</code> (miliampe).',
      'Phân biệt các đơn vị: vôn (V) đo hiệu điện thế, ôm (Ω) đo điện trở, oát (W) đo công suất.',
    ], ['Sai — vôn (V) là đơn vị hiệu điện thế.', 'Sai — ôm (Ω) là đơn vị điện trở.', 'Sai — oát (W) là đơn vị công suất.', 'Đúng — cường độ dòng điện đo bằng ampe (A).']),
    Q('Dụng cụ đo cường độ dòng điện?', ['Cân', 'Ôm kế', 'Ampe kế', 'Vôn kế'], 2, 'Mắc nối tiếp trong mạch.', [
      'Dùng <b>ampe kế</b> để đo cường độ dòng điện. Ampe kế phải được <b>mắc nối tiếp</b> vào mạch để dòng điện chạy qua nó.',
      'Khi mắc, chốt <b>(+)</b> của ampe kế nối về phía cực dương của nguồn.',
      'Phân biệt: <i>vôn kế</i> đo hiệu điện thế (mắc song song), <i>ôm kế</i> đo điện trở.',
    ], ['Sai — cân dùng đo khối lượng.', 'Sai — ôm kế dùng đo điện trở.', 'Đúng — ampe kế dùng đo cường độ dòng điện, mắc nối tiếp trong mạch.', 'Sai — vôn kế dùng đo hiệu điện thế.']),
    Q('Đơn vị hiệu điện thế?', ['Vôn (V)', 'Ampe (A)', 'Joule (J)', 'Hertz (Hz)'], 0, 'V.', [
      '<b>Hiệu điện thế</b> (kí hiệu U) đặc trưng cho khả năng sinh dòng điện của nguồn, được đo bằng <b>vôn (V)</b>.',
      'Ví dụ: pin tiểu thường 1,5 V; ổ điện gia đình 220 V.',
      'Đừng nhầm: ampe (A) đo cường độ dòng điện, joule (J) đo năng lượng, hertz (Hz) đo tần số.',
    ], ['Đúng — hiệu điện thế đo bằng vôn (V).', 'Sai — ampe là đơn vị cường độ dòng điện.', 'Sai — joule là đơn vị năng lượng.', 'Sai — hertz là đơn vị tần số.']),
    Q('Vôn kế được mắc?', ['Trong ổ cắm', 'Nối tiếp với nguồn điện', 'Nối tiếp', 'Song song với phần mạch cần đo'], 3, 'Song song với linh kiện.', [
      'Dùng <b>vôn kế</b> để đo hiệu điện thế. Vôn kế phải được <b>mắc song song</b> với phần mạch (linh kiện) cần đo.',
      'Chốt <b>(+)</b> của vôn kế nối về phía cực dương của nguồn.',
      'Ghi nhớ cặp đối lập: <i>ampe kế mắc nối tiếp</i>, còn <i>vôn kế mắc song song</i>.',
    ], ['Sai — vôn kế không cắm vào ổ cắm để đo trong mạch học tập.', 'Sai — mắc nối tiếp là cách mắc của ampe kế.', 'Sai — nối tiếp là cách mắc ampe kế, không phải vôn kế.', 'Đúng — vôn kế mắc song song với phần mạch cần đo hiệu điện thế.']),
  ]),

  M(20, 'Điện trở — Định luật Ôm', [
    Q('Điện trở của vật cản trở?', ['Âm thanh', 'Dòng điện chạy qua', 'Ánh sáng', 'Nhiệt độ'], 1, 'Cản trở dòng điện.', [
      '<b>Điện trở</b> (kí hiệu R) là đại lượng đặc trưng cho mức độ <b>cản trở dòng điện</b> chạy qua một vật dẫn.',
      'Điện trở càng lớn thì dòng điện qua vật càng nhỏ (với cùng hiệu điện thế).',
      'Vật liệu dẫn điện tốt (đồng, nhôm) có điện trở nhỏ; vật cách điện (nhựa, sứ) có điện trở rất lớn.',
    ], ['Sai — điện trở không cản trở âm thanh.', 'Đúng — điện trở là đại lượng đặc trưng cho mức cản trở dòng điện chạy qua vật.', 'Sai — điện trở không cản trở ánh sáng.', 'Sai — điện trở không phải để cản trở nhiệt độ.']),
    Q('Đơn vị điện trở?', ['Watt (W)', 'Ôm (Ω)', 'Ampe (A)', 'Vôn (V)'], 1, 'Ω = V/A.', [
      '<b>Điện trở</b> được đo bằng <b>ôm</b>, kí hiệu <b>Ω</b>.',
      'Theo định nghĩa: <code>1 Ω = 1 V / 1 A</code> — tức điện trở 1 Ω cho dòng 1 A đi qua khi đặt hiệu điện thế 1 V.',
      'Đơn vị lớn hơn: <code>1 kΩ = 1000 Ω</code>. Phân biệt với W (công suất), A (cường độ), V (hiệu điện thế).',
    ], ['Sai — watt là đơn vị công suất.', 'Đúng — điện trở đo bằng ôm (Ω), với 1 Ω = 1 V/A.', 'Sai — ampe là đơn vị cường độ dòng điện.', 'Sai — vôn là đơn vị hiệu điện thế.']),
    Q('Công thức định luật Ôm?', ['U = I/R', 'I = U·R', 'I = U/R', 'R = U·I'], 2, 'I = U/R.', [
      '<b>Định luật Ôm</b>: cường độ dòng điện qua dây dẫn tỉ lệ thuận với hiệu điện thế và tỉ lệ nghịch với điện trở: <b>I = U / R</b>.',
      'Từ đây suy ra: <code>U = I·R</code> và <code>R = U/I</code>.',
      'Trong đó I (A), U (V), R (Ω). Nhớ đúng vị trí: I = U <i>chia</i> R, không phải nhân hay đảo.',
    ], ['Sai — công thức bị đảo; phải là I = U/R.', 'Sai — định luật Ôm dùng phép chia, không phải nhân.', 'Đúng — định luật Ôm: I = U/R (cường độ bằng hiệu điện thế chia điện trở).', 'Sai — R = U/I mới đúng; R = U·I là sai.']),
    Q('Khi U tăng (R không đổi) thì I?', ['Giảm theo tỉ lệ với U', 'Không đổi', 'Bằng 0', 'Tăng'], 3, 'I tỉ lệ thuận với U.', [
      'Theo định luật Ôm <code>I = U/R</code>, khi giữ R không đổi thì I <b>tỉ lệ thuận</b> với U.',
      'Vì vậy khi <b>U tăng</b> (R cố định) thì <b>I tăng</b> theo.',
      'Ví dụ: cùng một bóng đèn, tăng hiệu điện thế thì dòng điện qua đèn lớn hơn, đèn sáng hơn.',
    ], ['Sai — I tỉ lệ thuận với U nên U tăng thì I tăng, không giảm.', 'Sai — U thay đổi mà R cố định thì I phải thay đổi.', 'Sai — I không bằng 0 khi U tăng.', 'Đúng — I tỉ lệ thuận với U nên khi U tăng (R cố định) thì I tăng.']),
    Q('Khi R tăng (U không đổi) thì I?', ['Không đổi', 'Giảm', 'Tăng theo tỉ lệ với R', 'Bằng 0'], 1, 'I tỉ lệ nghịch với R.', [
      'Theo định luật Ôm <code>I = U/R</code>, khi giữ U không đổi thì I <b>tỉ lệ nghịch</b> với R.',
      'Vì vậy khi <b>R tăng</b> (U cố định) thì <b>I giảm</b>.',
      'Điện trở càng lớn càng cản trở dòng điện, nên dòng qua mạch nhỏ đi (nhưng không về 0).',
    ], ['Sai — R thay đổi mà U cố định thì I phải thay đổi.', 'Đúng — I tỉ lệ nghịch với R nên khi R tăng (U cố định) thì I giảm.', 'Sai — I tỉ lệ nghịch chứ không thuận với R.', 'Sai — I giảm chứ không về 0 khi R tăng.']),
    Q('Mạch có U = 12V, R = 4Ω. I = ?', ['4A', '3A', '8A', '6A'], 1, 'I = 12/4 = 3.', [
      'Áp dụng định luật Ôm: <code>I = U / R</code>.',
      'Thay số: <code>I = 12 V ÷ 4 Ω = 3 A</code>.',
      'Nhớ lấy <i>U chia R</i>; nếu chia nhầm 12 cho 2 (ra 6) hay tính sai đều cho kết quả không đúng.',
    ], ['Sai — 4A không phải kết quả của 12/4.', 'Đúng — I = U/R = 12/4 = 3 A.', 'Sai — 8A là tính sai phép chia.', 'Sai — 6A là chia nhầm 12 cho 2.']),
  ]),

  M(21, 'Trao đổi chất ở thực vật — Quang hợp', [
    Q('Quang hợp ở thực vật xảy ra chủ yếu ở?', ['Hoa và quả', 'Rễ cọc', 'Lá', 'Thân non'], 2, 'Tế bào chứa lục lạp ở lá.', [
      '<b>Quang hợp</b> diễn ra chủ yếu ở <b>lá</b> — nơi tập trung nhiều tế bào chứa <i>lục lạp</i> (bào quan chứa chất diệp lục).',
      'Lá có cấu tạo thích nghi cho quang hợp: phiến lá rộng đón ánh sáng, có nhiều khí khổng trao đổi khí, có gân lá dẫn nước và sản phẩm.',
      'Rễ ở dưới đất thiếu ánh sáng; hoa, quả và thân non quang hợp rất ít so với lá.',
    ], ['Sai — hoa và quả không phải nơi quang hợp chính.', 'Sai — rễ nằm dưới đất, không có ánh sáng để quang hợp.', 'Đúng — quang hợp xảy ra chủ yếu ở lá, nơi tập trung tế bào chứa lục lạp.', 'Sai — thân non quang hợp rất ít so với lá.']),
    Q('Nguyên liệu của quang hợp?', ['Đạm và lân', 'Muối khoáng và CO₂', 'Nước và CO₂', 'Glucose và O₂'], 2, 'H₂O + CO₂.', [
      '<b>Nguyên liệu</b> của quang hợp là <b>nước (H₂O)</b> và <b>khí carbonic (CO₂)</b>.',
      'Nước do rễ hút từ đất, CO₂ lấy từ không khí qua khí khổng ở lá.',
      'Còn <i>glucose và O₂</i> là <b>sản phẩm</b> của quang hợp, không phải nguyên liệu.',
    ], ['Sai — đạm và lân là dinh dưỡng khoáng, không phải nguyên liệu trực tiếp của quang hợp.', 'Sai — muối khoáng không phải nguyên liệu của phản ứng quang hợp.', 'Đúng — nguyên liệu của quang hợp là nước (H₂O) và khí CO₂.', 'Sai — glucose và O₂ là sản phẩm, không phải nguyên liệu.']),
    Q('Sản phẩm của quang hợp?', ['CO₂ và H₂O', 'Tinh bột và đạm', 'Glucose và O₂', 'Muối và H₂'], 2, 'C₆H₁₂O₆ + O₂.', [
      '<b>Sản phẩm</b> của quang hợp là <b>glucose (C₆H₁₂O₆)</b> và khí <b>oxygen (O₂)</b>.',
      'Glucose là chất hữu cơ nuôi cây (và là nguồn thức ăn cho sinh vật khác); O₂ thải ra ngoài giúp duy trì sự sống.',
      'Còn <i>CO₂ và H₂O</i> là <b>nguyên liệu</b>, không phải sản phẩm.',
    ], ['Sai — CO₂ và H₂O là nguyên liệu, không phải sản phẩm của quang hợp.', 'Sai — sản phẩm là glucose và O₂, không phải đạm.', 'Đúng — sản phẩm của quang hợp là glucose (C₆H₁₂O₆) và khí O₂.', 'Sai — quang hợp không tạo muối và H₂.']),
    Q('Năng lượng cần cho quang hợp lấy từ?', ['Nhiệt độ thấp', 'Ánh sáng mặt trời', 'Gió và không khí', 'Khoáng chất trong đất'], 1, 'Quang năng → hoá năng.', [
      'Quang hợp cần năng lượng, và nguồn năng lượng đó là <b>ánh sáng mặt trời</b>.',
      'Chất diệp lục hấp thụ năng lượng ánh sáng, biến đổi <i>quang năng</i> thành <i>hoá năng</i> tích trong glucose.',
      'Đây là cách thực vật “bắt” năng lượng Mặt Trời để nuôi sống chính nó và cả các sinh vật khác.',
    ], ['Sai — nhiệt độ thấp không cung cấp năng lượng cho quang hợp.', 'Đúng — quang hợp dùng năng lượng ánh sáng mặt trời, chuyển quang năng thành hoá năng.', 'Sai — gió chỉ cung cấp CO₂, không phải nguồn năng lượng.', 'Sai — khoáng chất là dinh dưỡng, không phải nguồn năng lượng quang hợp.']),
    Q('Chất diệp lục có vai trò?', ['Hô hấp', 'Hấp thụ nước', 'Hấp thụ ánh sáng để quang hợp', 'Vận chuyển'], 2, 'Sắc tố chlorophyll.', [
      '<b>Chất diệp lục (chlorophyll)</b> là sắc tố màu xanh nằm trong lục lạp, có vai trò <b>hấp thụ năng lượng ánh sáng</b> để thực hiện quang hợp.',
      'Chính chất diệp lục làm cho lá cây có màu xanh.',
      'Hấp thụ nước là việc của rễ; vận chuyển là việc của mạch dẫn — không phải chức năng của diệp lục.',
    ], ['Sai — hô hấp không cần chất diệp lục.', 'Sai — hấp thụ nước là việc của rễ, không phải chất diệp lục.', 'Đúng — chất diệp lục (chlorophyll) hấp thụ năng lượng ánh sáng để quang hợp.', 'Sai — vận chuyển là chức năng của mạch dẫn, không phải chất diệp lục.']),
    Q('Phương trình tổng quát của quang hợp?', ['C + O₂ → CO₂', '6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂', '2H₂O → 2H₂ + O₂', '2H₂ + O₂ → 2H₂O'], 1, 'Phương trình quang hợp.', [
      'Phương trình tổng quát của quang hợp: <b>6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂</b> (diễn ra nhờ <i>ánh sáng</i> và <i>chất diệp lục</i>).',
      'Đọc theo: nguyên liệu là CO₂ và H₂O ở vế trái; sản phẩm là glucose và O₂ ở vế phải.',
      'Đừng nhầm với phản ứng cháy của carbon hay phản ứng tạo/phân huỷ nước.',
    ], ['Sai — đây là phản ứng cháy của carbon, không phải quang hợp.', 'Đúng — quang hợp: 6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂ (nhờ ánh sáng và diệp lục).', 'Sai — đây là phản ứng phân huỷ nước, không phải quang hợp.', 'Sai — đây là phản ứng tạo nước, không phải quang hợp.']),
  ]),

  M(22, 'Nghỉ Tết — Đọc thêm về cây cảnh ngày Tết', [
    Q('Cây mai vàng nở vào dịp Tết do?', ['Tuốt lá đúng thời điểm + thời tiết', 'Phơi nắng', 'Tưới nhiều', 'Bón hoá chất'], 0, 'Người trồng tuốt lá để kích hoa.', [
      'Việc cây ra hoa chịu ảnh hưởng của nhiều yếu tố môi trường và sự can thiệp của con người.',
      'Với cây mai, người trồng <b>tuốt (lảy) lá đúng thời điểm</b> kết hợp theo dõi <i>thời tiết</i> để kích thích nụ hoa bung nở đúng dịp Tết.',
      'Chỉ phơi nắng, tưới nhiều hay bón hoá chất đều không phải biện pháp chính để điều khiển thời điểm nở hoa.',
    ], ['Đúng — người trồng tuốt lá đúng thời điểm kết hợp thời tiết để mai nở đúng Tết.', 'Sai — chỉ phơi nắng không quyết định thời điểm nở hoa.', 'Sai — tưới nhiều không phải cách chính để mai nở đúng Tết.', 'Sai — bón hoá chất không phải biện pháp truyền thống để mai nở đúng dịp.']),
    Q('Quang hợp cần ánh sáng nên cây nên đặt?', ['Trong tủ kín', 'Nơi có ánh sáng phù hợp', 'Bóng tối hoàn toàn', 'Dưới nước'], 1, 'Có ánh sáng để quang hợp.', [
      'Quang hợp cần năng lượng ánh sáng, nên cây phải được đặt ở <b>nơi có ánh sáng phù hợp</b>.',
      'Thiếu ánh sáng (tủ kín, bóng tối hoàn toàn), cây không quang hợp được, dần héo úa.',
      'Tuy nhiên cũng cần ánh sáng <i>phù hợp</i> với từng loài: có cây ưa sáng, có cây ưa bóng.',
    ], ['Sai — tủ kín thiếu ánh sáng nên cây không quang hợp tốt.', 'Đúng — đặt cây nơi có ánh sáng phù hợp để cây quang hợp.', 'Sai — bóng tối hoàn toàn khiến cây không quang hợp được.', 'Sai — đa số cây cảnh không sống dưới nước.']),
    Q('Bánh chưng có nguyên liệu chính?', ['Gạo nếp, đậu xanh, thịt lợn, lá dong', 'Gạo tẻ, muối', 'Khoai, nước', 'Bột mì, đường, sữa'], 0, 'Bánh chưng truyền thống.', [
      'Bánh chưng là món ăn truyền thống ngày Tết, làm từ <b>gạo nếp, đậu xanh, thịt lợn</b> và gói bằng <b>lá dong</b>.',
      'Các nguyên liệu này cung cấp <i>tinh bột, chất đạm, chất béo</i> — liên hệ tới kiến thức về chất dinh dưỡng.',
      'Bột mì, đường, sữa là nguyên liệu của bánh ngọt, không phải bánh chưng.',
    ], ['Đúng — bánh chưng truyền thống làm từ gạo nếp, đậu xanh, thịt lợn và gói bằng lá dong.', 'Sai — bánh chưng dùng gạo nếp, không phải gạo tẻ.', 'Sai — khoai và nước không phải nguyên liệu bánh chưng.', 'Sai — bột mì, đường, sữa là nguyên liệu bánh ngọt, không phải bánh chưng.']),
    Q('Nước trong cây vận chuyển theo?', ['Không vận chuyển', 'Mạch gỗ (xylem)', 'Khoang tế bào', 'Mạch rây (phloem)'], 1, 'Xylem dẫn nước.', [
      'Cây có hai loại mạch dẫn: <b>mạch gỗ (xylem)</b> và <b>mạch rây (phloem)</b>.',
      '<b>Nước và muối khoáng</b> được vận chuyển từ rễ lên lá qua <b>mạch gỗ</b>.',
      'Còn mạch rây vận chuyển <i>chất hữu cơ</i> (do lá tạo ra) đi nuôi các bộ phận của cây.',
    ], ['Sai — nước được vận chuyển trong cây, không đứng yên.', 'Đúng — nước và muối khoáng được vận chuyển từ rễ lên lá qua mạch gỗ (xylem).', 'Sai — nước không di chuyển khắp cây qua khoang tế bào.', 'Sai — mạch rây vận chuyển chất hữu cơ, không phải nước từ rễ.']),
    Q('Sản phẩm của hô hấp là?', ['Tinh bột', 'Glucose và O₂', 'O₂ và glucose', 'CO₂ và H₂O'], 3, 'Hô hấp ngược quang hợp.', [
      '<b>Hô hấp tế bào</b> phân giải glucose để giải phóng năng lượng, là quá trình <i>ngược chiều</i> với quang hợp.',
      'Nguyên liệu: glucose và O₂. <b>Sản phẩm: CO₂ và H₂O</b> (kèm năng lượng).',
      'Ghi nhớ đối lập: quang hợp tạo glucose + O₂; hô hấp tạo CO₂ + H₂O.',
    ], ['Sai — tinh bột là chất dự trữ, không phải sản phẩm hô hấp.', 'Sai — glucose và O₂ là nguyên liệu của hô hấp.', 'Sai — O₂ và glucose là nguyên liệu, không phải sản phẩm.', 'Đúng — sản phẩm của hô hấp là CO₂ và H₂O (cùng năng lượng).']),
    Q('Quang hợp xảy ra khi nào?', ['Khi khô', 'Khi có ánh sáng', 'Khi tối', 'Khi lạnh'], 1, 'Cần quang năng.', [
      'Quang hợp cần năng lượng ánh sáng, nên chỉ <b>xảy ra khi có ánh sáng</b> (ban ngày hoặc dưới đèn chiếu).',
      'Khi trời tối, cây <i>không quang hợp</i> nhưng vẫn <b>hô hấp</b> liên tục.',
      'Độ khô hay nhiệt độ lạnh không phải điều kiện quyết định việc cây có quang hợp hay không.',
    ], ['Sai — độ khô không phải điều kiện của quang hợp.', 'Đúng — quang hợp xảy ra khi có ánh sáng cung cấp năng lượng.', 'Sai — khi tối, cây không quang hợp được.', 'Sai — nhiệt độ lạnh không phải điều kiện quyết định quang hợp.']),
  ]),

  M(23, 'Hô hấp tế bào ở thực vật', [
    Q('Hô hấp tế bào là?', ['Quá trình phân giải chất hữu cơ giải phóng năng lượng', 'Tổng hợp chất hữu cơ', 'Vận chuyển nước', 'Hấp thụ ánh sáng'], 0, 'Ngược với quang hợp.', [
      '<b>Hô hấp tế bào</b> là quá trình <b>phân giải chất hữu cơ</b> (glucose) để <b>giải phóng năng lượng</b> cung cấp cho mọi hoạt động sống.',
      'Đây là quá trình <i>ngược chiều</i> với quang hợp (tổng hợp chất hữu cơ).',
      'Hô hấp diễn ra trong tế bào, có thể coi như “đốt” glucose để lấy năng lượng (dạng ATP).',
    ], ['Đúng — hô hấp tế bào là quá trình phân giải chất hữu cơ để giải phóng năng lượng.', 'Sai — tổng hợp chất hữu cơ là quang hợp, ngược với hô hấp.', 'Sai — vận chuyển nước là chức năng của mạch dẫn.', 'Sai — hấp thụ ánh sáng là bước đầu của quang hợp.']),
    Q('Nguyên liệu của hô hấp tế bào?', ['Muối khoáng', 'CO₂ và nước', 'Glucose và O₂', 'CO₂ và H₂O'], 2, 'C₆H₁₂O₆ + O₂.', [
      '<b>Nguyên liệu</b> của hô hấp tế bào là <b>glucose (C₆H₁₂O₆)</b> và khí <b>oxygen (O₂)</b>.',
      'Glucose do quang hợp tạo ra (hoặc từ thức ăn), O₂ lấy từ không khí.',
      'Còn <i>CO₂ và H₂O</i> là <b>sản phẩm</b> của hô hấp, không phải nguyên liệu.',
    ], ['Sai — muối khoáng không phải nguyên liệu trực tiếp của hô hấp.', 'Sai — CO₂ và nước là sản phẩm, không phải nguyên liệu.', 'Đúng — nguyên liệu của hô hấp tế bào là glucose (C₆H₁₂O₆) và O₂.', 'Sai — CO₂ và H₂O là sản phẩm của hô hấp, không phải nguyên liệu.']),
    Q('Sản phẩm của hô hấp tế bào?', ['Tinh bột', 'Đạm và lân', 'Glucose và O₂', 'CO₂, H₂O và năng lượng (ATP)'], 3, 'Ngược quang hợp.', [
      '<b>Sản phẩm</b> của hô hấp tế bào là khí <b>CO₂</b>, <b>H₂O</b> và <b>năng lượng (ATP)</b>.',
      'Năng lượng giải phóng được dùng cho mọi hoạt động sống: vận động, sinh trưởng, tổng hợp chất…',
      'Còn glucose và O₂ là <i>nguyên liệu</i>, không phải sản phẩm.',
    ], ['Sai — tinh bột là chất dự trữ, không phải sản phẩm hô hấp.', 'Sai — đạm và lân là dinh dưỡng khoáng, không phải sản phẩm hô hấp.', 'Sai — glucose và O₂ là nguyên liệu, không phải sản phẩm.', 'Đúng — sản phẩm hô hấp tế bào là CO₂, H₂O và năng lượng (ATP).']),
    Q('Hô hấp xảy ra ở?', ['Chỉ rễ', 'Chỉ lá', 'Mọi tế bào sống', 'Chỉ hoa'], 2, 'Mọi tế bào đều cần năng lượng.', [
      'Khác với quang hợp (chỉ ở tế bào có lục lạp, khi có ánh sáng), <b>hô hấp tế bào xảy ra ở mọi tế bào sống</b>.',
      'Lí do: <i>mọi tế bào đều cần năng lượng</i> để duy trì hoạt động sống.',
      'Hô hấp diễn ra <b>cả ngày lẫn đêm</b>, không phụ thuộc ánh sáng.',
    ], ['Sai — hô hấp không chỉ ở rễ.', 'Sai — hô hấp không chỉ ở lá.', 'Đúng — hô hấp tế bào xảy ra ở mọi tế bào sống vì tế bào nào cũng cần năng lượng.', 'Sai — hô hấp không giới hạn ở hoa.']),
    Q('Quang hợp và hô hấp có quan hệ?', ['Ngược chiều, bổ sung nhau', 'Cùng chiều', 'Không liên quan', 'Loại trừ nhau hoàn toàn'], 0, 'Chu trình carbon - oxy.', [
      'Quang hợp và hô hấp là hai quá trình <b>ngược chiều</b> nhau: <ul><li>Quang hợp: CO₂ + H₂O → glucose + O₂.</li><li>Hô hấp: glucose + O₂ → CO₂ + H₂O + năng lượng.</li></ul>',
      'Tuy ngược chiều nhưng chúng <b>bổ sung cho nhau</b>: sản phẩm của quá trình này là nguyên liệu của quá trình kia.',
      'Sự cân bằng này giúp duy trì <i>chu trình carbon – oxy</i> trong tự nhiên.',
    ], ['Đúng — quang hợp và hô hấp ngược chiều nhau nhưng bổ sung trong chu trình carbon - oxy.', 'Sai — hai quá trình ngược chiều, không cùng chiều.', 'Sai — chúng liên quan chặt chẽ qua chất và khí trao đổi.', 'Sai — chúng bổ sung nhau chứ không loại trừ hoàn toàn.']),
    Q('Phương trình hô hấp tế bào?', ['6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂', 'C + O₂ → CO₂', 'C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O + năng lượng', '2H₂O → 2H₂ + O₂'], 2, 'Tổng quát.', [
      'Phương trình tổng quát của hô hấp tế bào: <b>C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O + năng lượng</b>.',
      'Đọc theo: nguyên liệu (glucose + O₂) ở vế trái, sản phẩm (CO₂ + H₂O + năng lượng) ở vế phải.',
      'Đây đúng là <i>chiều ngược</i> của phương trình quang hợp. Đừng nhầm với phản ứng cháy carbon hay phân huỷ nước.',
    ], ['Sai — đây là phương trình quang hợp, ngược với hô hấp.', 'Sai — đây là phản ứng cháy của carbon, không phải hô hấp tế bào.', 'Đúng — hô hấp tế bào: C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O + năng lượng.', 'Sai — đây là phản ứng phân huỷ nước, không phải hô hấp.']),
  ]),

  M(24, 'Trao đổi nước và muối khoáng ở thực vật', [
    Q('Rễ cây hấp thụ nước và muối khoáng chủ yếu qua?', ['Khí khổng ở lá', 'Cánh hoa', 'Lông hút', 'Vỏ cây'], 2, 'Tế bào lông hút.', [
      'Rễ cây hấp thụ nước và muối khoáng chủ yếu qua các <b>tế bào lông hút</b> ở miền hút của rễ.',
      'Lông hút là phần kéo dài của tế bào biểu bì rễ, giúp <i>tăng diện tích tiếp xúc</i> với đất nên hút được nhiều nước, khoáng.',
      'Khí khổng ở lá làm nhiệm vụ trao đổi khí và thoát hơi nước, không phải hấp thụ nước từ đất.',
    ], ['Sai — khí khổng ở lá làm nhiệm vụ trao đổi khí và thoát hơi nước.', 'Sai — cánh hoa không hấp thụ nước và muối khoáng.', 'Đúng — rễ hấp thụ nước và muối khoáng chủ yếu qua các tế bào lông hút.', 'Sai — vỏ cây không phải nơi hấp thụ chính nước và muối khoáng.']),
    Q('Mạch gỗ (xylem) vận chuyển?', ['Nước và muối khoáng từ rễ lên lá', 'Chất hữu cơ từ lá đi nuôi cây', 'Năng lượng', 'Khí oxy'], 0, 'Vận chuyển một chiều: lên.', [
      '<b>Mạch gỗ (xylem)</b> vận chuyển <b>nước và muối khoáng</b> theo một chiều: <i>từ rễ đi lên lá</i>.',
      'Dòng vận chuyển này được duy trì nhờ lực hút do thoát hơi nước ở lá và lực đẩy của rễ.',
      'Còn vận chuyển chất hữu cơ là nhiệm vụ của mạch rây, không phải mạch gỗ.',
    ], ['Đúng — mạch gỗ vận chuyển nước và muối khoáng từ rễ lên lá.', 'Sai — vận chuyển chất hữu cơ là nhiệm vụ của mạch rây.', 'Sai — mạch gỗ vận chuyển chất, không vận chuyển năng lượng.', 'Sai — mạch gỗ không vận chuyển khí oxy.']),
    Q('Mạch rây (phloem) vận chuyển?', ['Khí CO₂ từ rễ lên lá', 'Chất hữu cơ từ lá đi nuôi các bộ phận', 'Muối khoáng', 'Nước từ rễ'], 1, 'Hai chiều, chủ yếu xuống.', [
      '<b>Mạch rây (phloem)</b> vận chuyển <b>chất hữu cơ</b> (do lá quang hợp tạo ra) đi nuôi các bộ phận của cây.',
      'Hướng vận chuyển chủ yếu từ lá <i>đi xuống</i> thân, rễ và tới các nơi cây dự trữ.',
      'Ghi nhớ cặp đôi: <i>mạch gỗ</i> chở nước + khoáng (lên), <i>mạch rây</i> chở chất hữu cơ (xuống).',
    ], ['Sai — mạch rây không vận chuyển khí CO₂.', 'Đúng — mạch rây vận chuyển chất hữu cơ từ lá đi nuôi các bộ phận của cây.', 'Sai — muối khoáng được vận chuyển bởi mạch gỗ.', 'Sai — nước từ rễ lên do mạch gỗ vận chuyển.']),
    Q('Sự thoát hơi nước qua?', ['Vỏ thân', 'Khí khổng ở lá', 'Lông hút ở rễ', 'Cánh hoa và đài hoa'], 1, 'Khí khổng (lỗ trên biểu bì lá).', [
      '<b>Thoát hơi nước</b> là quá trình nước bay hơi ra khỏi cây, chủ yếu diễn ra qua các <b>khí khổng</b> (lỗ nhỏ) trên biểu bì lá.',
      'Khí khổng có thể đóng/mở để điều tiết lượng nước thoát ra và việc trao đổi khí.',
      'Lông hút ở rễ làm nhiệm vụ <i>hút</i> nước, ngược với thoát hơi nước.',
    ], ['Sai — vỏ thân không phải nơi thoát hơi nước chính.', 'Đúng — thoát hơi nước chủ yếu diễn ra qua khí khổng trên biểu bì lá.', 'Sai — lông hút ở rễ làm nhiệm vụ hút nước, không thoát hơi.', 'Sai — cánh hoa và đài hoa không phải nơi thoát hơi nước chính.']),
    Q('Vai trò của thoát hơi nước?', ['Không có vai trò', 'Hút nước lên, làm mát cây, trao đổi khí', 'Làm cây héo', 'Giúp ra hoa'], 1, 'Quan trọng với sinh lí cây.', [
      'Thoát hơi nước tuy làm cây mất nước nhưng có vai trò rất quan trọng: <ul><li>tạo <b>lực hút</b> kéo nước và muối khoáng từ rễ lên lá;</li><li><b>làm mát</b> cho cây khi trời nóng;</li><li>giúp khí khổng mở để <b>trao đổi khí</b> (lấy CO₂, thải O₂).</li></ul>',
      'Vì vậy thoát hơi nước hợp lí giúp cây sống khoẻ chứ không làm cây héo.',
    ], ['Sai — thoát hơi nước có vai trò quan trọng với cây.', 'Đúng — thoát hơi nước giúp hút nước lên, làm mát cây và hỗ trợ trao đổi khí.', 'Sai — thoát hơi nước hợp lí không làm cây héo mà giúp cây sống.', 'Sai — thoát hơi nước không trực tiếp giúp ra hoa.']),
    Q('Yếu tố ảnh hưởng đến thoát hơi nước?', ['Màu lá', 'Giờ tưới', 'Loại đất', 'Ánh sáng, nhiệt độ, độ ẩm, gió'], 3, 'Điều kiện môi trường.', [
      'Tốc độ thoát hơi nước phụ thuộc vào các <b>điều kiện môi trường</b>: <b>ánh sáng, nhiệt độ, độ ẩm không khí và gió</b>.',
      'Ví dụ: trời nắng nóng, khô, có gió → thoát hơi nước mạnh; trời mát, ẩm, lặng gió → thoát hơi nước chậm.',
      'Màu lá hay giờ tưới không phải yếu tố chính quyết định mức thoát hơi nước.',
    ], ['Sai — màu lá không phải yếu tố chính ảnh hưởng thoát hơi nước.', 'Sai — giờ tưới không quyết định mức thoát hơi nước.', 'Sai — loại đất ảnh hưởng đến hút nước nhiều hơn là thoát hơi nước.', 'Đúng — ánh sáng, nhiệt độ, độ ẩm và gió là các yếu tố môi trường ảnh hưởng đến thoát hơi nước.']),
  ]),

  M(25, 'Trao đổi chất và năng lượng ở động vật — Hệ tiêu hoá', [
    Q('Hệ tiêu hoá ở người gồm?', ['Tim mạch', 'Phổi và đường hô hấp', 'Ống tiêu hoá và các tuyến tiêu hoá', 'Thận và bàng quang'], 2, 'Ống + tuyến.', [
      '<b>Hệ tiêu hoá</b> ở người gồm hai bộ phận: <ul><li><b>Ống tiêu hoá</b>: miệng → thực quản → dạ dày → ruột non → ruột già → hậu môn.</li><li><b>Các tuyến tiêu hoá</b>: tuyến nước bọt, gan, tuỵ, tuyến vị, tuyến ruột.</li></ul>',
      'Hệ tiêu hoá biến thức ăn thành chất dinh dưỡng cho cơ thể hấp thụ.',
      'Tim mạch thuộc hệ tuần hoàn, phổi thuộc hệ hô hấp, thận thuộc hệ bài tiết.',
    ], ['Sai — tim mạch thuộc hệ tuần hoàn.', 'Sai — phổi và đường hô hấp thuộc hệ hô hấp.', 'Đúng — hệ tiêu hoá gồm ống tiêu hoá và các tuyến tiêu hoá.', 'Sai — thận và bàng quang thuộc hệ bài tiết.']),
    Q('Ống tiêu hoá gồm thứ tự?', ['Miệng → thực quản → dạ dày → ruột non → ruột già → hậu môn', 'Dạ dày → miệng → ruột', 'Miệng → ruột → dạ dày', 'Ruột → dạ dày → miệng'], 0, 'Thứ tự cơ bản.', [
      'Thức ăn đi qua <b>ống tiêu hoá</b> theo thứ tự: <b>miệng → thực quản → dạ dày → ruột non → ruột già → hậu môn</b>.',
      'Mỗi bộ phận đảm nhận một khâu: miệng nghiền và trộn enzyme, dạ dày co bóp, ruột non tiêu hoá và hấp thụ, ruột già hấp thụ nước và tạo phân.',
      'Thứ tự này cố định; thức ăn luôn bắt đầu từ miệng và kết thúc ở hậu môn.',
    ], ['Đúng — thức ăn đi theo thứ tự: miệng → thực quản → dạ dày → ruột non → ruột già → hậu môn.', 'Sai — thức ăn bắt đầu từ miệng, không phải dạ dày.', 'Sai — thức ăn qua dạ dày trước khi vào ruột.', 'Sai — thứ tự bị đảo ngược hoàn toàn.']),
    Q('Tiêu hoá hoá học chủ yếu xảy ra ở?', ['Khoang miệng', 'Ruột non', 'Thực quản', 'Hậu môn'], 1, 'Ruột non có nhiều enzyme.', [
      '<b>Tiêu hoá hoá học</b> là quá trình enzyme phân giải thức ăn thành chất dinh dưỡng nhỏ mà cơ thể hấp thụ được.',
      'Quá trình này diễn ra chủ yếu ở <b>ruột non</b>, nơi nhận nhiều enzyme từ tuỵ, gan (mật) và tuyến ruột.',
      'Khoang miệng chỉ tiêu hoá một phần tinh bột; thực quản chỉ dẫn thức ăn xuống dạ dày.',
    ], ['Sai — khoang miệng chỉ tiêu hoá một phần tinh bột.', 'Đúng — ruột non là nơi tiêu hoá hoá học chủ yếu nhờ nhiều enzyme.', 'Sai — thực quản chỉ dẫn thức ăn, không tiêu hoá hoá học.', 'Sai — hậu môn là nơi thải phân, không tiêu hoá.']),
    Q('Hấp thụ chất dinh dưỡng chủ yếu ở?', ['Khoang miệng', 'Ruột già', 'Ruột non', 'Dạ dày'], 2, 'Lông ruột hấp thụ.', [
      'Chất dinh dưỡng được hấp thụ chủ yếu ở <b>ruột non</b> — đây vừa là nơi tiêu hoá hoá học vừa là nơi hấp thụ chính.',
      'Bề mặt ruột non có rất nhiều <i>lông ruột</i> làm tăng diện tích hấp thụ.',
      'Ruột già chủ yếu hấp thụ <i>nước</i>; dạ dày chủ yếu co bóp, nghiền và tiêu hoá nên hấp thụ rất ít.',
    ], ['Sai — khoang miệng không hấp thụ chất dinh dưỡng chính.', 'Sai — ruột già chủ yếu hấp thụ nước, không phải dinh dưỡng chính.', 'Đúng — ruột non hấp thụ chất dinh dưỡng chủ yếu nhờ các lông ruột.', 'Sai — dạ dày chủ yếu nghiền và tiêu hoá, hấp thụ rất ít.']),
    Q('Tuyến tiêu hoá lớn nhất là?', ['Tuyến tụy', 'Gan', 'Tuyến dạ dày', 'Tuyến nước bọt'], 1, 'Gan tiết mật.', [
      '<b>Gan</b> là tuyến tiêu hoá <b>lớn nhất</b> trong cơ thể người.',
      'Gan tiết ra <i>mật</i>, giúp <b>nhũ tương hoá chất béo</b> để dễ tiêu hoá hơn; ngoài ra gan còn khử độc và dự trữ chất.',
      'Tuyến tuỵ tuy lớn nhưng nhỏ hơn gan; tuyến nước bọt và tuyến dạ dày càng nhỏ hơn.',
    ], ['Sai — tuyến tụy là tuyến lớn nhưng không phải lớn nhất.', 'Đúng — gan là tuyến tiêu hoá lớn nhất, tiết mật giúp tiêu hoá chất béo.', 'Sai — tuyến dạ dày nhỏ hơn gan.', 'Sai — tuyến nước bọt nhỏ hơn gan nhiều.']),
    Q('Vai trò của ruột già?', ['Hấp thụ nước và muối khoáng, tạo phân', 'Hấp thụ glucose', 'Tiêu hoá tinh bột', 'Tiết enzyme'], 0, 'Chức năng cuối ống tiêu hoá.', [
      '<b>Ruột già</b> là đoạn cuối của ống tiêu hoá, có vai trò <b>hấp thụ nước, muối khoáng</b> và <b>tạo phân</b> từ phần thức ăn không tiêu hoá được.',
      'Phân được lưu giữ rồi thải ra ngoài qua hậu môn.',
      'Hấp thụ glucose và các chất dinh dưỡng chính diễn ra ở ruột non, không phải ruột già.',
    ], ['Đúng — ruột già hấp thụ nước, muối khoáng và tạo phân.', 'Sai — hấp thụ glucose chủ yếu ở ruột non.', 'Sai — tiêu hoá tinh bột bắt đầu ở miệng và ruột non.', 'Sai — ruột già không tiết enzyme tiêu hoá chính.']),
  ]),

  M(26, 'Hô hấp ở động vật', [
    Q('Hệ hô hấp ở người gồm?', ['Đường dẫn khí và phổi', 'Thận và bàng quang', 'Tim và mạch máu', 'Dạ dày và ruột'], 0, 'Đường khí + phổi.', [
      '<b>Hệ hô hấp</b> ở người gồm <b>đường dẫn khí</b> (mũi, họng, thanh quản, khí quản, phế quản) và <b>hai lá phổi</b>.',
      'Chức năng: đưa O₂ từ không khí vào máu và thải CO₂ ra ngoài.',
      'Tim mạch thuộc hệ tuần hoàn, thận thuộc hệ bài tiết, dạ dày–ruột thuộc hệ tiêu hoá.',
    ], ['Đúng — hệ hô hấp gồm đường dẫn khí và hai lá phổi.', 'Sai — thận và bàng quang thuộc hệ bài tiết.', 'Sai — tim và mạch máu thuộc hệ tuần hoàn.', 'Sai — dạ dày và ruột thuộc hệ tiêu hoá.']),
    Q('Đường dẫn khí gồm?', ['Da → cơ', 'Mũi → họng → thanh quản → khí quản → phế quản', 'Miệng → ruột', 'Tim → phổi'], 1, 'Thứ tự đường khí.', [
      'Không khí đi vào phổi theo <b>đường dẫn khí</b> với thứ tự: <b>mũi → họng → thanh quản → khí quản → phế quản</b> → vào phổi.',
      'Trên đường đi, không khí được <i>làm ấm, làm ẩm và lọc sạch</i> (đặc biệt ở mũi).',
      'Miệng → ruột là đường tiêu hoá; tim → phổi là đường máu trong hệ tuần hoàn.',
    ], ['Sai — da và cơ không thuộc đường dẫn khí.', 'Đúng — đường dẫn khí gồm mũi → họng → thanh quản → khí quản → phế quản.', 'Sai — miệng → ruột là đường tiêu hoá.', 'Sai — tim → phổi là đường tuần hoàn máu, không phải dẫn khí.']),
    Q('Trao đổi khí ở phổi diễn ra ở?', ['Phế quản', 'Thanh quản', 'Phế nang', 'Khí quản'], 2, 'Phế nang nơi O₂ và CO₂ trao đổi.', [
      'Trong phổi có hàng triệu túi khí nhỏ gọi là <b>phế nang</b>. Đây chính là nơi diễn ra <b>trao đổi khí</b>.',
      'Tại phế nang: <i>O₂</i> từ không khí khuếch tán vào máu, còn <i>CO₂</i> từ máu thải ra để đưa ra ngoài.',
      'Phế nang có thành rất mỏng và được bao quanh bởi mao mạch dày đặc, giúp trao đổi khí hiệu quả. Phế quản, khí quản chỉ dẫn khí.',
    ], ['Sai — phế quản chỉ dẫn khí, không phải nơi trao đổi khí.', 'Sai — thanh quản liên quan đến phát âm, không trao đổi khí.', 'Đúng — trao đổi khí O₂ và CO₂ diễn ra ở các phế nang.', 'Sai — khí quản chỉ dẫn khí, không trao đổi khí.']),
    Q('Trong quá trình hít vào, cơ hoành?', ['Hạ xuống', 'Nâng lên', 'Bị xoắn', 'Không thay đổi'], 0, 'Mở rộng thể tích lồng ngực.', [
      'Cử động hô hấp do <b>cơ hoành</b> và các cơ liên sườn phối hợp thực hiện.',
      'Khi <b>hít vào</b>: cơ hoành <b>hạ xuống</b>, lồng ngực nở ra → thể tích lồng ngực tăng → không khí tràn vào phổi.',
      'Khi <i>thở ra</i> thì ngược lại: cơ hoành nâng lên, lồng ngực thu nhỏ, khí bị đẩy ra.',
    ], ['Đúng — khi hít vào, cơ hoành hạ xuống làm tăng thể tích lồng ngực để khí tràn vào.', 'Sai — cơ hoành nâng lên là khi thở ra.', 'Sai — cơ hoành không bị xoắn khi hô hấp.', 'Sai — cơ hoành thay đổi vị trí trong mỗi nhịp thở.']),
    Q('Khí thải ra khi thở chứa nhiều?', ['N₂ (~78%)', 'CO₂', 'O₂ (~21%)', 'Hơi nước duy nhất'], 1, 'Sản phẩm hô hấp.', [
      'So với khí hít vào, <b>khí thở ra chứa nhiều CO₂ hơn</b> và ít O₂ hơn — vì CO₂ là <i>sản phẩm của hô hấp tế bào</i>.',
      'Khí hít vào: ~21% O₂, ~0,04% CO₂. Khí thở ra: O₂ giảm còn ~16%, CO₂ tăng lên ~4%.',
      'N₂ chiếm tỉ lệ lớn nhất nhưng gần như không đổi, không phải khí đặc trưng do hô hấp sinh ra.',
    ], ['Sai — N₂ chiếm tỉ lệ lớn nhưng không phải khí đặc trưng do hô hấp tạo ra.', 'Đúng — khí thở ra chứa nhiều CO₂ hơn so với khí hít vào, vì CO₂ là sản phẩm hô hấp.', 'Sai — O₂ trong khí thở ra giảm so với khí hít vào.', 'Sai — khí thở ra không chỉ có hơi nước.']),
    Q('Khí hít vào chứa nhiều?', ['CO (cacbon monooxit)', 'Khí hiếm', 'O₂ (~21%)', 'CO₂ (~21%)'], 2, 'Không khí ~21% O₂.', [
      'Thành phần không khí hít vào: <i>N₂ chiếm khoảng 78%</i>, <b>O₂ khoảng 21%</b>, CO₂ chỉ khoảng 0,04%, còn lại là hơi nước và khí hiếm.',
      'O₂ là khí mà cơ thể cần để hô hấp, nên trong câu này khí hít vào chứa nhiều <b>O₂ (~21%)</b>.',
      'CO₂ chỉ chiếm ~0,04% (không phải 21%); CO là khí độc, không phải thành phần bình thường của không khí.',
    ], ['Sai — CO là khí độc, không phải thành phần chính của không khí.', 'Sai — khí hiếm chỉ chiếm tỉ lệ rất nhỏ.', 'Đúng — không khí hít vào chứa khoảng 21% O₂.', 'Sai — CO₂ trong không khí chỉ chiếm khoảng 0,04%, không phải 21%.']),
  ]),

  M(27, 'Tuần hoàn ở động vật (giới thiệu)', [
    Q('Hệ tuần hoàn ở người gồm?', ['Phổi và phế quản', 'Tim và hệ mạch máu', 'Dạ dày', 'Thận và bàng quang'], 1, 'Tim + mạch.', [
      '<b>Hệ tuần hoàn</b> gồm <b>tim</b> và <b>hệ mạch máu</b> (động mạch, tĩnh mạch, mao mạch).',
      'Tim như một “máy bơm” đẩy máu lưu thông khắp cơ thể, vận chuyển O₂, chất dinh dưỡng và mang đi CO₂, chất thải.',
      'Phổi thuộc hệ hô hấp, dạ dày thuộc hệ tiêu hoá, thận thuộc hệ bài tiết.',
    ], ['Sai — phổi và phế quản thuộc hệ hô hấp.', 'Đúng — hệ tuần hoàn gồm tim và hệ mạch máu (động mạch, tĩnh mạch, mao mạch).', 'Sai — dạ dày thuộc hệ tiêu hoá.', 'Sai — thận và bàng quang thuộc hệ bài tiết.']),
    Q('Máu vận chuyển từ tim đi qua?', ['Bạch huyết', 'Động mạch', 'Mao mạch chỉ', 'Tĩnh mạch'], 1, 'Động mạch xa tim.', [
      'Có ba loại mạch máu: <b>động mạch, tĩnh mạch, mao mạch</b>.',
      '<b>Động mạch</b> là mạch đưa máu <b>từ tim đi</b> đến các cơ quan.',
      'Còn <i>tĩnh mạch</i> đưa máu về tim; <i>mao mạch</i> là nơi trao đổi chất giữa máu và mô.',
    ], ['Sai — bạch huyết thuộc hệ bạch huyết, không phải mạch dẫn máu từ tim đi.', 'Đúng — máu rời tim đi qua các động mạch.', 'Sai — mao mạch là nơi trao đổi chất, máu chưa tới đó ngay khi rời tim.', 'Sai — tĩnh mạch là mạch đưa máu trở về tim.']),
    Q('Máu về tim qua?', ['Tĩnh mạch', 'Mao mạch', 'Động mạch', 'Bạch huyết'], 0, 'Tĩnh mạch về tim.', [
      'Máu sau khi trao đổi chất ở các cơ quan sẽ trở về tim qua các <b>tĩnh mạch</b>.',
      'Ghi nhớ cặp đối lập: <i>động mạch</i> đưa máu <b>từ tim đi</b>, <i>tĩnh mạch</i> đưa máu <b>về tim</b>.',
      'Mao mạch nối giữa động mạch và tĩnh mạch, là nơi trao đổi chất với mô.',
    ], ['Đúng — máu trở về tim qua các tĩnh mạch.', 'Sai — mao mạch là nơi trao đổi chất, không phải mạch đưa máu về tim.', 'Sai — động mạch đưa máu từ tim đi, không phải về tim.', 'Sai — bạch huyết không phải mạch đưa máu về tim.']),
    Q('Trao đổi chất giữa máu và mô diễn ra ở?', ['Tĩnh mạch lớn', 'Tâm thất trái', 'Mao mạch', 'Động mạch lớn'], 2, 'Mao mạch nhỏ, thành mỏng.', [
      'Sự <b>trao đổi chất giữa máu và tế bào (mô)</b> diễn ra ở các <b>mao mạch</b>.',
      'Mao mạch có đường kính rất nhỏ và <i>thành rất mỏng</i>, lại phân nhánh dày đặc nên O₂ và chất dinh dưỡng dễ dàng đi từ máu vào mô, còn CO₂ và chất thải đi ngược lại.',
      'Động mạch và tĩnh mạch lớn chỉ làm nhiệm vụ dẫn máu, không trao đổi chất với mô.',
    ], ['Sai — tĩnh mạch lớn chỉ dẫn máu về, không trao đổi chất.', 'Sai — tâm thất trái bơm máu, không trao đổi chất với mô.', 'Đúng — trao đổi chất giữa máu và mô diễn ra ở mao mạch vì thành rất mỏng.', 'Sai — động mạch lớn chỉ dẫn máu, không trao đổi chất với mô.']),
    Q('Tim người có bao nhiêu ngăn?', ['5 ngăn', '4 ngăn', '2 ngăn', '3 ngăn'], 1, '2 tâm nhĩ + 2 tâm thất.', [
      'Tim người (và các loài thú, chim) có <b>4 ngăn</b>: 2 <i>tâm nhĩ</i> (trên) và 2 <i>tâm thất</i> (dưới).',
      'Nhờ 4 ngăn ngăn cách rõ, máu giàu O₂ và máu nghèo O₂ <i>không bị pha trộn</i>, giúp cung cấp O₂ hiệu quả.',
      'So sánh: tim cá 2 ngăn, tim lưỡng cư 3 ngăn.',
    ], ['Sai — tim người không có 5 ngăn.', 'Đúng — tim người có 4 ngăn: 2 tâm nhĩ và 2 tâm thất.', 'Sai — 2 ngăn là tim của cá, không phải người.', 'Sai — 3 ngăn là tim của lưỡng cư, không phải người.']),
    Q('Vòng tuần hoàn nhỏ đi qua?', ['Toàn thân', 'Thận và bàng quang', 'Gan và mật', 'Phổi'], 3, 'Tim phải → phổi → tim trái.', [
      'Ở người có hai vòng tuần hoàn: <ul><li><b>Vòng tuần hoàn nhỏ</b>: tim phải → <b>phổi</b> → tim trái (để máu nhận O₂, thải CO₂).</li><li><b>Vòng tuần hoàn lớn</b>: tim trái → toàn thân → tim phải (đưa O₂, dinh dưỡng đi nuôi cơ thể).</li></ul>',
      'Vậy vòng tuần hoàn nhỏ đi qua <b>phổi</b>.',
      'Đi khắp toàn thân là đặc trưng của vòng tuần hoàn lớn.',
    ], ['Sai — đi khắp toàn thân là vòng tuần hoàn lớn.', 'Sai — thận và bàng quang không thuộc vòng tuần hoàn nhỏ.', 'Sai — gan và mật không phải đích của vòng tuần hoàn nhỏ.', 'Đúng — vòng tuần hoàn nhỏ đưa máu từ tim phải lên phổi rồi về tim trái.']),
  ]),

  M(28, 'Cảm ứng ở thực vật', [
    Q('Cảm ứng ở sinh vật là?', ['Hô hấp', 'Phản ứng của sinh vật trước kích thích từ môi trường', 'Quang hợp', 'Sinh sản'], 1, 'Phản ứng thích nghi.', [
      '<b>Cảm ứng</b> là khả năng <b>tiếp nhận và phản ứng</b> của sinh vật trước các <i>kích thích</i> từ môi trường.',
      'Ví dụ: cây hướng về phía ánh sáng, lá cây trinh nữ cụp lại khi chạm, người rụt tay khi chạm vật nóng.',
      'Cảm ứng giúp sinh vật <b>thích nghi</b> để tồn tại. Hô hấp, quang hợp, sinh sản là các quá trình sống khác.',
    ], ['Sai — hô hấp là quá trình giải phóng năng lượng, không phải cảm ứng.', 'Đúng — cảm ứng là phản ứng của sinh vật trước các kích thích từ môi trường.', 'Sai — quang hợp là quá trình tổng hợp chất hữu cơ, không phải cảm ứng.', 'Sai — sinh sản là tạo cá thể mới, không phải cảm ứng.']),
    Q('Hướng sáng (phototropism) là?', ['Không phản ứng', 'Tránh ánh sáng', 'Ngẫu nhiên', 'Sinh trưởng hướng về phía ánh sáng'], 3, 'Ngọn cây cong về phía sáng.', [
      '<b>Hướng sáng</b> là hiện tượng <b>thân (ngọn) cây sinh trưởng hướng về phía nguồn sáng</b>.',
      'Đây là một dạng <i>cảm ứng ở thực vật</i> liên quan đến hooc-môn auxin: phía ít sáng tế bào dài ra nhanh hơn nên thân cong về phía sáng.',
      'Nhờ hướng sáng, lá nhận được nhiều ánh sáng hơn để quang hợp.',
    ], ['Sai — hướng sáng là có phản ứng rõ rệt với ánh sáng.', 'Sai — ngọn cây hướng về phía sáng chứ không tránh.', 'Sai — phản ứng có quy luật theo hướng ánh sáng, không ngẫu nhiên.', 'Đúng — hướng sáng là sự sinh trưởng của cây hướng về phía nguồn sáng.']),
    Q('Hướng đất (gravitropism) ở rễ?', ['Rễ mọc lên trời', 'Rễ mọc ngang theo mặt đất', 'Không xác định', 'Rễ mọc xuống đất'], 3, 'Phản ứng dương với trọng lực.', [
      '<b>Hướng đất (hướng trọng lực)</b> là phản ứng sinh trưởng của cây với trọng lực.',
      'Rễ có tính <b>hướng đất dương</b> nên luôn <b>mọc hướng xuống đất</b> — giúp cây bám chắc và hút nước, khoáng.',
      'Ngược lại, thân có tính hướng đất âm nên mọc hướng lên trên.',
    ], ['Sai — rễ không mọc lên trời mà hướng xuống đất.', 'Sai — rễ chủ yếu mọc xuống theo trọng lực, không ngang.', 'Sai — rễ có hướng rõ rệt theo trọng lực.', 'Đúng — rễ có tính hướng đất dương nên mọc hướng xuống đất theo trọng lực.']),
    Q('Cây nhạy cảm với chạm như cây trinh nữ thuộc?', ['Cảm ứng chậm', 'Cảm ứng nhanh', 'Không cảm ứng', 'Cảm ứng nhiệt'], 1, 'Lá cụp lại khi chạm.', [
      'Cây trinh nữ (cây xấu hổ) <b>cụp lá lại ngay khi bị chạm</b> — đây là một ví dụ về <b>cảm ứng nhanh</b> ở thực vật.',
      'Phản ứng diễn ra trong vài giây nhờ sự thay đổi áp suất nước trong các tế bào ở gốc lá.',
      'Khác với cảm ứng chậm (như hướng sáng, hướng đất) phải mất nhiều giờ hoặc ngày mới thấy rõ.',
    ], ['Sai — cây trinh nữ phản ứng rất nhanh, không chậm.', 'Đúng — cây trinh nữ cụp lá ngay khi chạm, đó là cảm ứng nhanh.', 'Sai — cây trinh nữ rõ ràng có cảm ứng với chạm.', 'Sai — đây là cảm ứng với chạm, không phải với nhiệt.']),
    Q('Hướng tiếp xúc giúp cây?', ['Tránh ánh sáng', 'Leo, bám vào giá thể', 'Rụng lá', 'Ra hoa'], 1, 'Cây leo, dây cuốn.', [
      '<b>Hướng tiếp xúc</b> là phản ứng sinh trưởng của cây khi <i>tiếp xúc với giá thể</i>.',
      'Nhờ tính hướng tiếp xúc, các cây leo (mướp, bầu, bí…) dùng <b>tua cuốn quấn quanh giàn, cọc</b> để <b>leo và bám vững</b>.',
      'Đây không liên quan đến việc tránh ánh sáng, rụng lá hay ra hoa.',
    ], ['Sai — hướng tiếp xúc không liên quan đến tránh ánh sáng.', 'Đúng — hướng tiếp xúc giúp cây leo, dây cuốn bám vào giá thể.', 'Sai — rụng lá không phải do hướng tiếp xúc.', 'Sai — ra hoa không phải kết quả của hướng tiếp xúc.']),
    Q('Vai trò của cảm ứng?', ['Phát quang', 'Đổi màu', 'Tăng khối lượng', 'Giúp sinh vật thích nghi với môi trường'], 3, 'Tồn tại và phát triển.', [
      'Cảm ứng có vai trò quan trọng: <b>giúp sinh vật thích nghi với môi trường</b> để tồn tại và phát triển.',
      'Ví dụ: hướng sáng giúp lá nhận nhiều ánh sáng; rụt tay khỏi vật nóng giúp tránh bị bỏng.',
      'Tăng khối lượng là kết quả của <i>sinh trưởng</i>; phát quang, đổi màu không phải vai trò của cảm ứng.',
    ], ['Sai — phát quang không phải vai trò của cảm ứng.', 'Sai — đổi màu không phải vai trò chính của cảm ứng.', 'Sai — tăng khối lượng là kết quả của sinh trưởng, không phải cảm ứng.', 'Đúng — cảm ứng giúp sinh vật thích nghi với môi trường để tồn tại và phát triển.']),
  ]),

  M(29, 'Cảm ứng ở động vật (giới thiệu)', [
    Q('Hệ thần kinh ở động vật bậc cao gồm?', ['Trung ương (não, tủy sống) và ngoại biên', 'Chỉ dây thần kinh', 'Chỉ não', 'Chỉ tủy sống'], 0, 'Cấu trúc tổng quát.', [
      '<b>Hệ thần kinh</b> ở động vật bậc cao (và người) gồm hai phần: <ul><li><b>Bộ phận trung ương</b>: não bộ và tuỷ sống.</li><li><b>Bộ phận ngoại biên</b>: các dây thần kinh và hạch thần kinh.</li></ul>',
      'Hệ thần kinh điều khiển và điều hoà mọi hoạt động của cơ thể, đảm bảo cơ thể phản ứng nhanh với kích thích.',
      'Não, tuỷ sống hay dây thần kinh chỉ là <i>một phần</i> của hệ thần kinh.',
    ], ['Đúng — hệ thần kinh gồm phần trung ương (não, tủy sống) và phần ngoại biên (dây thần kinh).', 'Sai — dây thần kinh chỉ là phần ngoại biên, còn thiếu trung ương.', 'Sai — não chỉ là một phần của trung ương.', 'Sai — tủy sống chỉ là một phần của trung ương.']),
    Q('Phản xạ là?', ['Hô hấp', 'Phản ứng hoá học', 'Phản ứng của cơ thể qua hệ thần kinh', 'Hành vi học được'], 2, 'Cơ chế thần kinh.', [
      '<b>Phản xạ</b> là <i>phản ứng của cơ thể trả lời các kích thích</i> từ môi trường, thực hiện <b>thông qua hệ thần kinh</b>.',
      'Ví dụ: tay chạm vật nóng thì rụt lại; nhìn thấy ánh sáng mạnh thì nheo mắt.',
      'Phản xạ chia làm hai loại: <i>không điều kiện</i> (bẩm sinh) và <i>có điều kiện</i> (học được).',
    ], ['Sai — hô hấp không phải phản xạ.', 'Sai — phản xạ là phản ứng qua thần kinh, không phải phản ứng hoá học.', 'Đúng — phản xạ là phản ứng của cơ thể với kích thích thông qua hệ thần kinh.', 'Sai — hành vi học được chỉ là một loại phản xạ (có điều kiện), không phải định nghĩa chung.']),
    Q('Phản xạ không điều kiện là?', ['Phản xạ bẩm sinh, di truyền', 'Tự ý thức', 'Học được sau sinh', 'Tự nguyện'], 0, 'Có sẵn từ sinh.', [
      '<b>Phản xạ không điều kiện</b> là phản xạ <b>bẩm sinh</b>, <i>có tính di truyền</i>, sinh ra đã có mà không cần học tập.',
      'Ví dụ: trẻ sơ sinh biết bú, tay rụt lại khi chạm vật nóng, chảy nước bọt khi thức ăn vào miệng.',
      'Khác với <i>phản xạ có điều kiện</i> — loại phải hình thành qua học tập, rèn luyện sau khi sinh.',
    ], ['Đúng — phản xạ không điều kiện là phản xạ bẩm sinh, có tính di truyền.', 'Sai — phản xạ không điều kiện không cần ý thức điều khiển.', 'Sai — học được sau sinh là phản xạ có điều kiện.', 'Sai — phản xạ không điều kiện xảy ra tự động, không phải tự nguyện.']),
    Q('Phản xạ có điều kiện là?', ['Tự nhiên', 'Bẩm sinh', 'Hình thành trong đời sống nhờ học tập', 'Di truyền'], 2, 'Pavlov với chuông và chó.', [
      '<b>Phản xạ có điều kiện</b> là phản xạ được <b>hình thành trong đời sống nhờ học tập, rèn luyện</b>, không có sẵn từ khi sinh.',
      'Thí nghiệm kinh điển của Pavlov: rung chuông mỗi khi cho chó ăn; sau nhiều lần, chỉ cần nghe chuông chó đã tiết nước bọt.',
      'Phản xạ có điều kiện <i>không di truyền</i> và có thể mất đi nếu không được củng cố.',
    ], ['Sai — phản xạ tự nhiên bẩm sinh là phản xạ không điều kiện.', 'Sai — bẩm sinh là đặc điểm của phản xạ không điều kiện.', 'Đúng — phản xạ có điều kiện hình thành trong đời sống nhờ học tập, rèn luyện.', 'Sai — phản xạ có điều kiện không di truyền mà do tập luyện.']),
    Q('Cung phản xạ gồm?', ['Chỉ tủy sống', 'Cơ quan thụ cảm → dây thần kinh hướng tâm → trung ương → ly tâm → cơ quan đáp ứng', 'Chỉ cảm giác', 'Chỉ não bộ'], 1, 'Đường đi của xung thần kinh.', [
      '<b>Cung phản xạ</b> là con đường mà xung thần kinh truyền đi để thực hiện một phản xạ.',
      'Gồm 5 khâu: <b>cơ quan thụ cảm → dây thần kinh hướng tâm → trung ương thần kinh → dây thần kinh ly tâm → cơ quan đáp ứng (cơ, tuyến)</b>.',
      'Thiếu bất kì khâu nào thì phản xạ không thực hiện được. Tuỷ sống hay não bộ chỉ là một phần trung ương.',
    ], ['Sai — cung phản xạ không chỉ có tủy sống.', 'Đúng — cung phản xạ gồm cơ quan thụ cảm → dây hướng tâm → trung ương → dây ly tâm → cơ quan đáp ứng.', 'Sai — cảm giác chỉ là một khâu, chưa đủ cung phản xạ.', 'Sai — não bộ chỉ là một phần của trung ương trong cung phản xạ.']),
    Q('Vai trò của phản xạ?', ['Tăng cân', 'Đổi màu da', 'Tự tổng hợp glucose', 'Giúp cơ thể thích nghi nhanh với môi trường'], 3, 'Phản ứng nhanh.', [
      'Phản xạ giúp cơ thể <b>phản ứng nhanh và phù hợp</b> với các kích thích, nhờ đó <b>thích nghi với môi trường</b> và tránh nguy hiểm.',
      'Ví dụ: rụt tay khỏi vật nóng giúp tránh bỏng; nheo mắt khi gió bụi giúp bảo vệ mắt.',
      'Tăng cân, đổi màu da hay tổng hợp glucose không phải vai trò của phản xạ.',
    ], ['Sai — tăng cân không phải vai trò của phản xạ.', 'Sai — đổi màu da không phải vai trò của phản xạ.', 'Sai — tổng hợp glucose là việc của quang hợp ở thực vật.', 'Đúng — phản xạ giúp cơ thể phản ứng và thích nghi nhanh với môi trường.']),
  ]),

  M(30, 'Sinh trưởng và phát triển ở thực vật', [
    Q('Sinh trưởng là?', ['Sự sinh sản', 'Sự tăng kích thước và khối lượng của cơ thể', 'Sự biến đổi chất', 'Sự hô hấp'], 1, 'Tăng về lượng.', [
      '<b>Sinh trưởng</b> là sự <b>tăng về kích thước và khối lượng</b> của cơ thể (do tăng số lượng và kích thước tế bào). Đây là biến đổi <i>về lượng</i>.',
      'Ví dụ: hạt nảy mầm thành cây con cao lớn dần, thân to ra.',
      'Phân biệt với <b>phát triển</b> — là biến đổi <i>về chất</i> (hình thái, chức năng) như ra hoa, kết quả.',
    ], ['Sai — sinh sản là tạo cá thể mới, không phải sinh trưởng.', 'Đúng — sinh trưởng là sự tăng kích thước và khối lượng của cơ thể.', 'Sai — biến đổi về chất (hình thái, chức năng) là phát triển.', 'Sai — hô hấp là quá trình giải phóng năng lượng.']),
    Q('Phát triển là?', ['Quang hợp', 'Hấp thụ nước', 'Tăng khối lượng', 'Sự biến đổi hình thái và chức năng'], 3, 'Biến đổi về chất.', [
      '<b>Phát triển</b> là sự <b>biến đổi về hình thái và chức năng</b> của cơ thể — đây là biến đổi <i>về chất</i>.',
      'Ví dụ: cây từ giai đoạn sinh dưỡng chuyển sang ra hoa, tạo quả và hạt.',
      'Sinh trưởng (tăng lượng) và phát triển (đổi chất) gắn bó với nhau trong vòng đời của sinh vật.',
    ], ['Sai — quang hợp là quá trình tổng hợp chất, không phải phát triển.', 'Sai — hấp thụ nước là một hoạt động sinh lí, không phải phát triển.', 'Sai — tăng khối lượng là sinh trưởng (về lượng), không phải phát triển.', 'Đúng — phát triển là sự biến đổi về hình thái và chức năng của cơ thể.']),
    Q('Mô phân sinh ở thực vật giúp?', ['Hô hấp', 'Vận chuyển', 'Tăng trưởng (chiều cao, chiều dày)', 'Quang hợp'], 2, 'Tế bào liên tục phân chia.', [
      '<b>Mô phân sinh</b> là nhóm tế bào còn non, <i>phân chia liên tục</i>, là nơi diễn ra sự sinh trưởng của cây.',
      'Nhờ mô phân sinh, cây <b>tăng trưởng về chiều cao và chiều dày</b>.',
      'Vận chuyển là việc của mạch dẫn; quang hợp là việc của tế bào chứa lục lạp ở lá.',
    ], ['Sai — hô hấp không phải chức năng của mô phân sinh.', 'Sai — vận chuyển là chức năng của mạch dẫn.', 'Đúng — mô phân sinh chứa tế bào phân chia liên tục, giúp cây tăng trưởng chiều cao, chiều dày.', 'Sai — quang hợp là chức năng của tế bào chứa lục lạp ở lá.']),
    Q('Mô phân sinh đỉnh ở?', ['Phiến lá trưởng thành', 'Vỏ quả chín', 'Ngọn thân và đầu rễ', 'Cánh hoa'], 2, 'Giúp cây dài ra.', [
      '<b>Mô phân sinh đỉnh</b> nằm ở <b>ngọn thân (chồi đỉnh)</b> và <b>đầu rễ</b>.',
      'Hoạt động của mô phân sinh đỉnh giúp cây <i>dài ra</i> — thân vươn cao, rễ ăn sâu.',
      'Phiến lá trưởng thành, vỏ quả chín hay cánh hoa không phải nơi có mô phân sinh đỉnh.',
    ], ['Sai — phiến lá trưởng thành không còn mô phân sinh đỉnh.', 'Sai — vỏ quả chín không phải vị trí của mô phân sinh đỉnh.', 'Đúng — mô phân sinh đỉnh nằm ở ngọn thân và đầu rễ, giúp cây dài ra.', 'Sai — cánh hoa không phải nơi có mô phân sinh đỉnh.']),
    Q('Yếu tố ảnh hưởng đến sinh trưởng, phát triển ở thực vật?', ['Tuổi cây mẹ', 'Ánh sáng, nhiệt độ, nước, dinh dưỡng', 'Loại chậu', 'Màu sắc đất'], 1, 'Các yếu tố môi trường.', [
      'Sinh trưởng và phát triển của thực vật chịu ảnh hưởng của các <b>yếu tố môi trường</b>: <b>ánh sáng, nhiệt độ, nước và dinh dưỡng (khoáng)</b>.',
      'Ví dụ: thiếu nước cây héo, thiếu ánh sáng cây còi cọc, đủ phân thì cây xanh tốt.',
      'Hiểu các yếu tố này giúp con người tạo điều kiện tốt cho cây trồng phát triển.',
    ], ['Sai — tuổi cây mẹ không phải yếu tố môi trường chính.', 'Đúng — ánh sáng, nhiệt độ, nước và dinh dưỡng là các yếu tố ảnh hưởng đến sinh trưởng, phát triển.', 'Sai — loại chậu không phải yếu tố quyết định.', 'Sai — màu sắc đất không phải yếu tố quyết định.']),
    Q('Hooc-môn thực vật ảnh hưởng đến?', ['Mùi vị', 'Trọng lượng quả duy nhất', 'Màu hoa duy nhất', 'Sự sinh trưởng và phát triển'], 3, 'Auxin, gibberellin, cytokinin…', [
      '<b>Hooc-môn thực vật</b> (auxin, gibberellin, cytokinin…) là những chất do cây tạo ra với lượng nhỏ nhưng có vai trò <b>điều hoà sự sinh trưởng và phát triển</b>.',
      'Ví dụ: auxin kích thích tế bào dài ra (liên quan hướng sáng); gibberellin kích thích hạt nảy mầm.',
      'Con người ứng dụng hooc-môn để giâm chiết cành, kích thích ra rễ, điều khiển ra hoa.',
    ], ['Sai — mùi vị không phải tác động chính của hooc-môn thực vật.', 'Sai — hooc-môn ảnh hưởng nhiều mặt, không chỉ trọng lượng quả.', 'Sai — hooc-môn không chỉ ảnh hưởng riêng màu hoa.', 'Đúng — hooc-môn thực vật (auxin, gibberellin, cytokinin…) điều hoà sự sinh trưởng và phát triển.']),
  ]),

  M(31, 'Sinh sản ở thực vật', [
    Q('Sinh sản ở thực vật có?', ['Chỉ hữu tính', 'Không sinh sản', 'Chỉ vô tính', 'Sinh sản vô tính và hữu tính'], 3, 'Hai hình thức.', [
      'Sinh sản giúp thực vật duy trì nòi giống. Thực vật có <b>hai hình thức sinh sản</b>: <ul><li><b>Sinh sản vô tính</b>: tạo cây mới từ một phần cơ thể (rễ, thân, lá), không cần giao tử.</li><li><b>Sinh sản hữu tính</b>: có sự kết hợp của giao tử đực và giao tử cái.</li></ul>',
      'Ví dụ: khoai lang mọc cây mới từ củ (vô tính); cây ăn quả tạo hạt qua thụ phấn, thụ tinh (hữu tính).',
    ], ['Sai — thực vật còn sinh sản vô tính, không chỉ hữu tính.', 'Sai — thực vật vẫn sinh sản để duy trì nòi giống.', 'Sai — thực vật còn sinh sản hữu tính, không chỉ vô tính.', 'Đúng — thực vật có cả sinh sản vô tính và sinh sản hữu tính.']),
    Q('Sinh sản vô tính ở thực vật KHÔNG có sự tham gia của?', ['Tế bào sinh dưỡng', 'Mô phân sinh', 'Tế bào sinh dục', 'Cơ quan dinh dưỡng'], 2, 'Không cần giao tử.', [
      '<b>Sinh sản vô tính</b> tạo cây mới từ <i>cơ quan dinh dưỡng</i> (rễ, thân, lá) và tế bào sinh dưỡng, <b>không cần tế bào sinh dục (giao tử)</b>.',
      'Vì không có sự kết hợp giao tử nên cây con <i>giống hệt cây mẹ</i> về mặt di truyền.',
      'Mô phân sinh và tế bào sinh dưỡng đều tham gia; chỉ có <b>tế bào sinh dục</b> là không cần đến.',
    ], ['Sai — sinh sản vô tính dựa vào tế bào sinh dưỡng.', 'Sai — mô phân sinh tham gia tạo cây mới trong sinh sản vô tính.', 'Đúng — sinh sản vô tính không cần tế bào sinh dục (giao tử).', 'Sai — cơ quan dinh dưỡng (rễ, thân, lá) tham gia sinh sản vô tính.']),
    Q('Giâm cành là hình thức?', ['Sinh sản vô tính', 'Sinh sản hữu tính', 'Hô hấp', 'Quang hợp'], 0, 'Từ cành mọc thành cây mới.', [
      '<b>Giâm cành</b> là cắm một đoạn cành xuống đất ẩm để nó <i>ra rễ và mọc thành cây mới</i>.',
      'Vì cây mới mọc từ cơ quan dinh dưỡng (cành), không cần giao tử, nên đây là <b>sinh sản vô tính</b>.',
      'Tương tự còn có chiết cành, ghép cây, giâm lá. Hô hấp, quang hợp là quá trình dinh dưỡng, không phải sinh sản.',
    ], ['Đúng — giâm cành là sinh sản vô tính: từ một đoạn cành mọc thành cây mới.', 'Sai — giâm cành không cần giao tử nên không phải hữu tính.', 'Sai — hô hấp không liên quan đến giâm cành.', 'Sai — quang hợp là quá trình dinh dưỡng, không phải hình thức sinh sản.']),
    Q('Sinh sản hữu tính ở thực vật có hoa gồm?', ['Chỉ chiết', 'Chỉ trồng cây', 'Chỉ giâm', 'Thụ phấn → thụ tinh → tạo hạt và quả'], 3, 'Quá trình sinh sản hữu tính.', [
      'Ở thực vật có hoa, sinh sản hữu tính diễn ra qua chuỗi: <b>thụ phấn → thụ tinh → tạo hạt và quả</b>.',
      'Hoa là cơ quan sinh sản: nhị mang giao tử đực (hạt phấn), nhuỵ mang giao tử cái (noãn).',
      'Chiết, giâm là sinh sản vô tính; còn quá trình hình thành hạt mới là sinh sản hữu tính.',
    ], ['Sai — chiết cành là sinh sản vô tính.', 'Sai — trồng cây không phải quá trình sinh sản hữu tính.', 'Sai — giâm là sinh sản vô tính.', 'Đúng — sinh sản hữu tính ở thực vật có hoa diễn ra qua thụ phấn → thụ tinh → tạo hạt và quả.']),
    Q('Thụ phấn là?', ['Nảy mầm', 'Hạt phấn chuyển tới đầu nhuỵ', 'Thụ tinh', 'Hô hấp'], 1, 'Pollination.', [
      '<b>Thụ phấn</b> là quá trình <b>hạt phấn (chứa giao tử đực) được chuyển tới đầu nhuỵ</b>.',
      'Thụ phấn có thể nhờ gió, côn trùng (ong, bướm) hoặc do con người chủ động.',
      'Đây là bước <i>trước</i> thụ tinh; còn nảy mầm là khi hạt đã hình thành phát triển thành cây.',
    ], ['Sai — nảy mầm là giai đoạn hạt phát triển thành cây, không phải thụ phấn.', 'Đúng — thụ phấn là quá trình hạt phấn được chuyển tới đầu nhuỵ.', 'Sai — thụ tinh là bước sau, khi giao tử đực kết hợp giao tử cái.', 'Sai — hô hấp không liên quan đến thụ phấn.']),
    Q('Quả được hình thành từ?', ['Hạt phấn', 'Bầu nhuỵ phát triển sau thụ tinh', 'Rễ phình to sau khi ra hoa', 'Lá đài'], 1, 'Bầu nhuỵ → quả.', [
      'Sau khi <b>thụ tinh</b>, các bộ phận của hoa biến đổi: <ul><li><b>Noãn</b> phát triển thành <b>hạt</b>.</li><li><b>Bầu nhuỵ</b> phát triển thành <b>quả</b> (bao bọc và bảo vệ hạt).</li></ul>',
      'Vậy quả có nguồn gốc từ <b>bầu nhuỵ</b>.',
      'Hạt phấn mang giao tử đực, lá đài bao hoa — đều không phát triển thành quả.',
    ], ['Sai — hạt phấn mang giao tử đực, không phát triển thành quả.', 'Đúng — sau thụ tinh, bầu nhuỵ phát triển thành quả.', 'Sai — rễ phình to là cơ quan dự trữ, không phải nguồn gốc của quả.', 'Sai — lá đài bao bọc hoa, không phát triển thành quả.']),
  ]),

  M(32, 'Sinh sản ở động vật (giới thiệu)', [
    Q('Sinh sản vô tính ở động vật thường gặp ở?', ['Mèo và các loài thú', 'Động vật bậc thấp (thuỷ tức, sao biển…)', 'Người và linh trưởng', 'Chó và các loài thú nuôi'], 1, 'Nảy chồi, phân đôi…', [
      '<b>Sinh sản vô tính</b> ở động vật (tạo cá thể mới từ một cơ thể, không cần giao tử) thường gặp ở các <b>động vật bậc thấp</b> như thuỷ tức, sao biển, giun dẹp.',
      'Hình thức phổ biến: <i>nảy chồi</i> (thuỷ tức), <i>phân đôi</i>, <i>tái sinh</i> (sao biển mọc lại từ mảnh).',
      'Các loài thú (mèo, chó, người…) sinh sản hữu tính, không sinh sản vô tính.',
    ], ['Sai — mèo và các loài thú sinh sản hữu tính.', 'Đúng — sinh sản vô tính thường gặp ở động vật bậc thấp như thuỷ tức, sao biển (nảy chồi, phân đôi…).', 'Sai — người và linh trưởng sinh sản hữu tính.', 'Sai — chó và các loài thú nuôi sinh sản hữu tính.']),
    Q('Sinh sản hữu tính ở động vật cần?', ['Giao tử đực và giao tử cái kết hợp', 'Nảy chồi', 'Không cần giao tử', 'Chỉ một cá thể'], 0, 'Tinh trùng + trứng → hợp tử.', [
      '<b>Sinh sản hữu tính</b> ở động vật cần sự <b>kết hợp của giao tử đực (tinh trùng) và giao tử cái (trứng)</b> để tạo thành <i>hợp tử</i>.',
      'Hợp tử phát triển thành phôi rồi thành cơ thể mới.',
      'Vì có sự tổ hợp gen từ bố và mẹ nên đời con <i>đa dạng di truyền</i>. Nảy chồi là sinh sản vô tính.',
    ], ['Đúng — sinh sản hữu tính cần giao tử đực (tinh trùng) và giao tử cái (trứng) kết hợp tạo hợp tử.', 'Sai — nảy chồi là hình thức sinh sản vô tính.', 'Sai — sinh sản hữu tính bắt buộc phải có giao tử.', 'Sai — sinh sản hữu tính thường cần hai cá thể (đực và cái).']),
    Q('Đẻ trứng gặp ở?', ['Người và các loài thú', 'Chim, bò sát, lưỡng cư, cá', 'Chỉ động vật cạn', 'Thú có vú nói chung'], 1, 'Đẻ trứng phổ biến.', [
      '<b>Đẻ trứng</b> là hình thức con non phát triển trong trứng ở <i>ngoài cơ thể mẹ</i>.',
      'Đẻ trứng phổ biến ở <b>chim, bò sát, lưỡng cư và cá</b> (cả ở cạn lẫn dưới nước).',
      'Còn người và đa số thú có vú thì <i>đẻ con</i>, không đẻ trứng.',
    ], ['Sai — người và đa số thú đẻ con, không đẻ trứng.', 'Đúng — đẻ trứng phổ biến ở chim, bò sát, lưỡng cư và cá.', 'Sai — đẻ trứng không chỉ gặp ở động vật cạn (cá ở nước cũng đẻ trứng).', 'Sai — thú có vú nói chung đẻ con, không đẻ trứng.']),
    Q('Đẻ con gặp ở?', ['Chim và các loài bay', 'Cá và lưỡng cư', 'Bò sát', 'Thú (gồm cả người)'], 3, 'Mang thai trong cơ thể mẹ.', [
      '<b>Đẻ con</b> là hình thức con non phát triển <i>trong cơ thể mẹ</i> (mang thai) rồi mới sinh ra ngoài.',
      'Đẻ con đặc trưng cho lớp <b>Thú (động vật có vú), gồm cả người</b>; con non còn được nuôi bằng sữa mẹ.',
      'Chim, bò sát, cá, lưỡng cư chủ yếu đẻ trứng.',
    ], ['Sai — chim đẻ trứng, không đẻ con.', 'Sai — cá và lưỡng cư chủ yếu đẻ trứng.', 'Sai — đa số bò sát đẻ trứng.', 'Đúng — thú (gồm cả người) đẻ con, con phát triển trong cơ thể mẹ.']),
    Q('Ưu điểm sinh sản hữu tính?', ['Đời con giống hệt mẹ', 'Đa dạng di truyền, thích nghi tốt', 'Nhanh, nhiều', 'Không cần bạn tình'], 1, 'Tổ hợp gen tăng đa dạng.', [
      'Trong sinh sản hữu tính, con nhận gen từ cả bố và mẹ, tạo nên các <i>tổ hợp gen mới</i>.',
      'Vì vậy <b>ưu điểm</b> là tạo ra đời con <b>đa dạng di truyền</b>, có khả năng <b>thích nghi tốt</b> với môi trường thay đổi.',
      'Còn “nhanh, nhiều” và “không cần bạn tình” là ưu điểm của sinh sản vô tính.',
    ], ['Sai — đời con giống hệt mẹ là đặc điểm của sinh sản vô tính.', 'Đúng — sinh sản hữu tính tạo đa dạng di truyền nên đời con thích nghi tốt hơn.', 'Sai — nhanh và nhiều là ưu điểm của sinh sản vô tính.', 'Sai — không cần bạn tình là đặc điểm sinh sản vô tính.']),
    Q('Nhược điểm sinh sản vô tính?', ['Đời con giống hệt mẹ, ít đa dạng', 'Tốn năng lượng', 'Tốc độ chậm', 'Cần hai cá thể'], 0, 'Thiếu đa dạng di truyền.', [
      'Vì sinh sản vô tính không có sự kết hợp gen, đời con <b>giống hệt cây/con mẹ</b> về di truyền.',
      '<b>Nhược điểm</b>: <i>ít đa dạng di truyền</i> nên khi môi trường thay đổi mạnh, cả quần thể dễ bị ảnh hưởng giống nhau.',
      'Ưu điểm của sinh sản vô tính là nhanh, nhiều, ít tốn năng lượng và chỉ cần một cá thể.',
    ], ['Đúng — nhược điểm của sinh sản vô tính là đời con giống hệt mẹ, ít đa dạng di truyền.', 'Sai — sinh sản vô tính thường ít tốn năng lượng hơn.', 'Sai — sinh sản vô tính thường nhanh, không chậm.', 'Sai — sinh sản vô tính chỉ cần một cá thể.']),
  ]),

  M(33, 'Cơ thể sinh vật là một thể thống nhất', [
    Q('Các hệ cơ quan trong cơ thể có mối quan hệ?', ['Phối hợp chặt chẽ, thống nhất', 'Không liên quan', 'Hoạt động độc lập', 'Cạnh tranh nhau'], 0, 'Phối hợp đảm bảo sự sống.', [
      'Cơ thể là một <b>thể thống nhất</b>: các hệ cơ quan (tiêu hoá, hô hấp, tuần hoàn, thần kinh…) <b>phối hợp chặt chẽ</b> với nhau.',
      'Ví dụ: hệ tiêu hoá cung cấp dinh dưỡng, hệ hô hấp cung cấp O₂, hệ tuần hoàn vận chuyển đi nuôi tế bào.',
      'Nhờ sự phối hợp này mà cơ thể hoạt động nhịp nhàng và duy trì sự sống.',
    ], ['Đúng — các hệ cơ quan phối hợp chặt chẽ, thống nhất để đảm bảo sự sống.', 'Sai — các hệ cơ quan có liên quan mật thiết với nhau.', 'Sai — chúng không hoạt động hoàn toàn độc lập mà phối hợp với nhau.', 'Sai — các hệ cơ quan hợp tác chứ không cạnh tranh nhau.']),
    Q('Hệ tuần hoàn vận chuyển?', ['Chất dinh dưỡng, O₂, CO₂, hooc-môn…', 'Chỉ O₂', 'Chỉ máu', 'Chỉ CO₂'], 0, 'Đa chức năng.', [
      '<b>Hệ tuần hoàn</b> dùng máu làm phương tiện để vận chuyển <i>nhiều loại chất</i> đi khắp cơ thể: <b>chất dinh dưỡng, O₂, CO₂, hooc-môn, chất thải…</b>',
      'Nhờ đó hệ tuần hoàn kết nối các hệ cơ quan: nhận O₂ từ phổi, dinh dưỡng từ ruột, mang đi nuôi tế bào và đưa chất thải tới cơ quan bài tiết.',
      'Vì vậy nó vận chuyển nhiều chất chứ không chỉ riêng O₂ hay CO₂.',
    ], ['Đúng — hệ tuần hoàn vận chuyển chất dinh dưỡng, O₂, CO₂, hooc-môn… đi khắp cơ thể.', 'Sai — hệ tuần hoàn vận chuyển nhiều thứ, không chỉ O₂.', 'Sai — máu là phương tiện, còn nội dung vận chuyển gồm nhiều chất.', 'Sai — hệ tuần hoàn vận chuyển nhiều chất, không chỉ CO₂.']),
    Q('Hệ thần kinh và hệ nội tiết phối hợp để?', ['Chỉ thải', 'Chỉ tiêu hoá', 'Chỉ vận động', 'Điều khiển và điều hoà hoạt động cơ thể'], 3, 'Hai hệ điều hoà.', [
      '<b>Hệ thần kinh</b> (qua xung thần kinh) và <b>hệ nội tiết</b> (qua hooc-môn) phối hợp để <b>điều khiển và điều hoà mọi hoạt động</b> của cơ thể.',
      'Hệ thần kinh phản ứng nhanh, tức thời; hệ nội tiết tác động chậm nhưng kéo dài.',
      'Bài thải, tiêu hoá, vận động là chức năng của các hệ cơ quan khác (bài tiết, tiêu hoá, vận động).',
    ], ['Sai — bài thải là việc của hệ bài tiết.', 'Sai — tiêu hoá là việc của hệ tiêu hoá.', 'Sai — vận động là việc của hệ vận động.', 'Đúng — hệ thần kinh và hệ nội tiết phối hợp điều khiển và điều hoà hoạt động cơ thể.']),
    Q('Nếu một hệ cơ quan bị rối loạn, các hệ khác?', ['Bị ảnh hưởng', 'Không quan tâm', 'Tốt hơn', 'Hoạt động bình thường'], 0, 'Tính thống nhất.', [
      'Vì cơ thể là một <b>thể thống nhất</b>, các hệ cơ quan phụ thuộc lẫn nhau.',
      'Do đó khi một hệ cơ quan <b>bị rối loạn</b>, các hệ khác cũng <b>bị ảnh hưởng</b> theo.',
      'Ví dụ: phổi yếu (hô hấp kém) thì máu thiếu O₂, ảnh hưởng tới tim và toàn bộ cơ thể.',
    ], ['Đúng — vì cơ thể là một thể thống nhất, một hệ rối loạn sẽ ảnh hưởng tới các hệ khác.', 'Sai — các hệ cơ quan liên quan chặt chẽ nên không thể không bị ảnh hưởng.', 'Sai — rối loạn ở một hệ không làm các hệ khác tốt hơn.', 'Sai — các hệ khác khó hoạt động bình thường khi một hệ bị rối loạn.']),
    Q('Cơ thể sinh vật là?', ['Hệ kín', 'Hệ tĩnh', 'Một hệ thống mở, thường xuyên trao đổi chất và năng lượng với môi trường', 'Không liên hệ môi trường'], 2, 'Hệ thống mở.', [
      'Cơ thể sinh vật là một <b>hệ thống mở</b>: nó <b>thường xuyên trao đổi chất và năng lượng</b> với môi trường.',
      'Sinh vật lấy từ môi trường: thức ăn, nước, O₂, ánh sáng…; thải ra: CO₂, chất bài tiết, nhiệt…',
      'Nhờ trao đổi liên tục với môi trường, sinh vật mới tồn tại và phát triển — nên cơ thể không phải hệ kín hay hệ tĩnh.',
    ], ['Sai — cơ thể không phải hệ kín mà luôn trao đổi với môi trường.', 'Sai — cơ thể luôn biến đổi, không phải hệ tĩnh.', 'Đúng — cơ thể sinh vật là hệ thống mở, thường xuyên trao đổi chất và năng lượng với môi trường.', 'Sai — cơ thể luôn liên hệ chặt chẽ với môi trường.']),
    Q('Tự điều hoà của cơ thể giúp?', ['Duy trì nội môi ổn định', 'Tăng cân', 'Tăng tuổi thọ vô hạn', 'Chống mọi bệnh'], 0, 'Homeostasis.', [
      '<b>Khả năng tự điều hoà</b> giúp cơ thể <b>duy trì môi trường bên trong (nội môi) ổn định</b>, ví dụ giữ thân nhiệt, đường huyết, độ pH máu ở mức phù hợp.',
      'Cơ chế này do hệ thần kinh và hệ nội tiết phối hợp thực hiện.',
      'Tự điều hoà giúp cơ thể khoẻ mạnh, thích nghi — nhưng không thể giúp tuổi thọ vô hạn hay chống được mọi bệnh.',
    ], ['Đúng — tự điều hoà giúp duy trì môi trường trong cơ thể (nội môi) ổn định.', 'Sai — tự điều hoà không nhằm tăng cân.', 'Sai — không cơ chế nào giúp tuổi thọ vô hạn.', 'Sai — tự điều hoà hỗ trợ sức khoẻ nhưng không chống được mọi bệnh.']),
  ]),

  M(34, 'Ôn tập Hoá — Vật lí HK2', [
    Q('Định luật Ôm: I = ?', ['R/U (điện trở chia hiệu điện thế)', 'U + R (hiệu điện thế cộng điện trở)', 'U·R (hiệu điện thế nhân điện trở)', 'U/R'], 3, 'I = U/R.', [
      'Ôn lại định luật Ôm: cường độ dòng điện <b>I = U / R</b>.',
      'Nhớ: lấy hiệu điện thế <i>chia</i> cho điện trở; không đảo thành R/U, không cộng hay nhân.',
      'Từ đây suy ra <code>U = I·R</code> và <code>R = U/I</code>.',
    ], ['Sai — công thức bị đảo; phải là U/R, không phải R/U.', 'Sai — định luật Ôm không cộng U với R.', 'Sai — định luật Ôm dùng phép chia, không phải nhân.', 'Đúng — định luật Ôm: I = U/R.']),
    Q('U = 6V, R = 2Ω. I = ?', ['3A', '2A', '12A', '6A'], 0, '6/2 = 3.', [
      'Áp dụng định luật Ôm: <code>I = U / R</code>.',
      'Thay số: <code>I = 6 V ÷ 2 Ω = 3 A</code>.',
      'Phải lấy U <i>chia</i> R; nhân (ra 12) hay quên chia (ra 6) đều sai.',
    ], ['Đúng — I = U/R = 6/2 = 3 A.', 'Sai — 2A không phải kết quả của 6/2.', 'Sai — 12A là nhân thay vì chia.', 'Sai — 6A là quên chia cho điện trở.']),
    Q('Tốc độ là gì?', ['Đại lượng đo lực tác dụng', 'Năng lượng', 'Đại lượng đo mức độ nhanh/chậm', 'Khối lượng'], 2, 'v = s/t.', [
      'Ôn lại: <b>tốc độ</b> là đại lượng đo <b>mức độ nhanh hay chậm</b> của chuyển động, tính bằng <code>v = s/t</code>.',
      'Đơn vị SI là m/s; trong đời sống còn dùng km/h (1 m/s = 3,6 km/h).',
      'Lực đo bằng newton, năng lượng bằng joule, khối lượng bằng kilôgam — đều khác tốc độ.',
    ], ['Sai — lực đo bằng newton, không phải tốc độ.', 'Sai — năng lượng là đại lượng khác, đo bằng joule.', 'Đúng — tốc độ là đại lượng đo mức độ nhanh hay chậm của chuyển động, v = s/t.', 'Sai — khối lượng đo lượng chất, không phải tốc độ.']),
    Q('Liên kết trong H₂O là?', ['Kim loại', 'Liên kết kim loại', 'Liên kết ion', 'Cộng hoá trị'], 3, 'Phi kim + phi kim.', [
      'Ôn lại: trong nước <code>H₂O</code>, cả H và O đều là <b>phi kim</b>, dùng chung electron nên có <b>liên kết cộng hoá trị</b>.',
      'Quy tắc: phi kim + phi kim → cộng hoá trị; kim loại + phi kim → ion.',
      'Vì nước không chứa kim loại nên không thể là liên kết ion hay liên kết kim loại.',
    ], ['Sai — nước không có kim loại nên không phải liên kết kim loại.', 'Sai — liên kết kim loại chỉ có giữa các kim loại.', 'Sai — liên kết ion cần kim loại và phi kim; H và O đều là phi kim.', 'Đúng — H và O đều là phi kim, dùng chung electron nên là liên kết cộng hoá trị.']),
    Q('Hai cực cùng tên của nam châm sẽ?', ['Hút nhau mạnh', 'Đẩy nhau', 'Hút nhau', 'Không tương tác'], 1, 'Cùng dấu → đẩy.', [
      'Ôn lại quy tắc tương tác từ: <b>cùng tên thì đẩy, khác tên thì hút</b>.',
      'Hai cực <b>cùng tên</b> (N–N hoặc S–S) sẽ <b>đẩy nhau</b>.',
      'Còn hai cực khác tên (N–S) thì hút nhau.',
    ], ['Sai — hai cực cùng tên đẩy nhau, không hút.', 'Đúng — hai cực cùng tên (N-N hoặc S-S) thì đẩy nhau.', 'Sai — hút nhau là khi hai cực khác tên.', 'Sai — hai cực cùng tên vẫn có tương tác (đẩy nhau).']),
    Q('Phương trình tổng quát quang hợp?', ['6O₂ + glucose → CO₂ + H₂O', '6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂', 'CO₂ → C + O', '2H₂ + O₂ → 2H₂O'], 1, 'Quang hợp.', [
      'Ôn lại phương trình quang hợp: <b>6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂</b> (nhờ ánh sáng và diệp lục).',
      'Nguyên liệu CO₂ + H₂O ở vế trái; sản phẩm glucose + O₂ ở vế phải.',
      'Chiều ngược lại (glucose + O₂ → CO₂ + H₂O) là hô hấp, không phải quang hợp.',
    ], ['Sai — đây là chiều của hô hấp (phân giải glucose), không phải quang hợp.', 'Đúng — quang hợp: 6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂.', 'Sai — CO₂ không tự phân huỷ thành C và O như vậy.', 'Sai — đây là phản ứng tạo nước, không phải quang hợp.']),
  ]),

  M(35, 'Kiểm tra học kì II — Tổng hợp cả năm', [
    Q('Cấu tạo nguyên tử gồm?', ['Chỉ neutron', 'Chỉ proton', 'Hạt nhân và lớp vỏ electron', 'Chỉ electron'], 2, 'Cơ bản.', [
      'Ôn lại cấu tạo nguyên tử: gồm <b>hạt nhân</b> (chứa proton và neutron) và <b>lớp vỏ electron</b> chuyển động xung quanh.',
      'Hạt nhân mang điện dương, lớp vỏ mang điện âm; nguyên tử trung hoà vì số p = số e.',
      'Mỗi đáp án “chỉ một loại hạt” đều thiếu các thành phần còn lại.',
    ], ['Sai — neutron chỉ là một loại hạt trong hạt nhân.', 'Sai — proton chỉ nằm trong hạt nhân, còn thiếu electron.', 'Đúng — nguyên tử gồm hạt nhân (p, n) và lớp vỏ electron.', 'Sai — electron chỉ ở lớp vỏ, thiếu hạt nhân.']),
    Q('Tốc độ trung bình xe đi 90 km trong 1,5 giờ?', ['45 km/h', '90 km/h', '135 km/h', '60 km/h'], 3, 'v = 90/1,5 = 60.', [
      'Áp dụng công thức tốc độ trung bình: <code>v = s / t</code>.',
      'Thay số: <code>v = 90 km ÷ 1,5 h = 60 km/h</code>.',
      'Lưu ý chia cho 1,5 (không phải 2); nhân thay vì chia sẽ ra 135 (sai).',
    ], ['Sai — 45 km/h là chia nhầm 90 cho 2.', 'Sai — 90 km/h là quên chia cho thời gian.', 'Sai — 135 km/h là nhân thay vì chia.', 'Đúng — v = s/t = 90/1,5 = 60 km/h.']),
    Q('Âm KHÔNG truyền qua môi trường nào?', ['Chất lỏng (nước)', 'Chất khí (không khí)', 'Chân không', 'Chất rắn (sắt, gỗ)'], 2, 'Chân không không có vật chất.', [
      'Âm là sóng cơ học, cần phần tử vật chất để dao động và lan truyền.',
      'Âm truyền được trong rắn, lỏng, khí; nhưng <b>KHÔNG truyền qua chân không</b> vì ở đó không có vật chất.',
      'Ghi nhớ: tốc độ truyền âm rắn &gt; lỏng &gt; khí, còn chân không thì âm không truyền được.',
    ], ['Sai — âm truyền tốt trong chất lỏng như nước.', 'Sai — âm truyền được trong chất khí như không khí.', 'Đúng — chân không không có vật chất nên âm không truyền qua được.', 'Sai — âm truyền nhanh nhất trong chất rắn.']),
    Q('Định luật phản xạ ánh sáng: góc tới ?', ['Vuông góc', 'Bằng nửa', 'Gấp đôi', 'Bằng góc phản xạ'], 3, 'i = i\'.', [
      'Ôn lại định luật phản xạ ánh sáng (nội dung thứ hai): <b>góc tới bằng góc phản xạ</b> (<code>i = i\'</code>).',
      'Cả hai góc đều được đo từ tia (tới/phản xạ) đến <i>pháp tuyến</i> tại điểm tới.',
      'Góc tới không cố định vuông góc, không bằng nửa hay gấp đôi góc phản xạ.',
    ], ['Sai — góc tới không cố định vuông góc.', 'Sai — góc tới không bằng nửa góc phản xạ.', 'Sai — góc tới không gấp đôi góc phản xạ.', 'Đúng — định luật phản xạ: góc tới bằng góc phản xạ (i = i\').']),
    Q('Lá cây thực hiện quá trình nào dưới ánh sáng?', ['Quang hợp', 'Thoát hơi nước duy nhất', 'Vận chuyển', 'Hô hấp duy nhất'], 0, 'Khi có ánh sáng.', [
      'Quá trình cần ánh sáng mới diễn ra là <b>quang hợp</b>: khi có ánh sáng, lá cây quang hợp để tạo glucose và O₂.',
      'Còn <i>hô hấp</i> diễn ra liên tục cả ngày lẫn đêm; <i>thoát hơi nước</i> cũng xảy ra cả khi không có ánh sáng.',
      'Vận chuyển là chức năng của mạch dẫn, không phụ thuộc ánh sáng.',
    ], ['Đúng — dưới ánh sáng, lá cây thực hiện quang hợp.', 'Sai — thoát hơi nước xảy ra cả khi không có ánh sáng, không phải đặc trưng dưới ánh sáng.', 'Sai — vận chuyển là chức năng của mạch dẫn, không phụ thuộc ánh sáng.', 'Sai — hô hấp diễn ra liên tục cả ngày lẫn đêm, không chỉ khi có ánh sáng.']),
    Q('Sinh sản hữu tính có ưu điểm?', ['Không cần bạn tình', 'Nhanh và nhiều', 'Đa dạng di truyền', 'Đời con giống hệt mẹ'], 2, 'Đa dạng → thích nghi.', [
      'Ôn lại: sinh sản hữu tính có sự kết hợp gen từ bố và mẹ nên tạo ra <b>đa dạng di truyền</b> ở đời con.',
      'Nhờ đa dạng di truyền, đời con có khả năng <i>thích nghi tốt hơn</i> khi môi trường thay đổi.',
      'Còn “không cần bạn tình”, “nhanh và nhiều”, “đời con giống hệt mẹ” là đặc điểm của sinh sản vô tính.',
    ], ['Sai — không cần bạn tình là đặc điểm sinh sản vô tính.', 'Sai — nhanh và nhiều là ưu điểm của sinh sản vô tính.', 'Đúng — sinh sản hữu tính tạo đa dạng di truyền nên đời con thích nghi tốt hơn.', 'Sai — đời con giống hệt mẹ là đặc điểm sinh sản vô tính.']),
  ]),

  M(36, 'Kết thúc KHTN 7 — Ba khoa học, một hành trình', [
    Q('KHTN lớp 7 gồm ba phân môn nào?',
      ['Vật Lý · Hoá Học · Sinh Học', 'Toán · Lý · Hoá', 'Sinh · Địa · Công nghệ', 'Hoá · Sinh · Tin học'],
      0,
      'KHTN THCS tích hợp ba phân môn: Vật Lý, Hoá Học và Sinh Học.',
      ['KHTN là môn <b>tích hợp</b> của CT GDPT 2018: ba phân môn học trong cùng một môn, cùng một cuốn sách.',
       'Bức tranh KHTN 7:<ul><li><b>Vật Lý</b> — âm thanh, ánh sáng, điện (định luật Ôm)</li><li><b>Hoá Học</b> — nguyên tử, nguyên tố, phân tử, hoá trị, phản ứng hoá học</li><li><b>Sinh Học</b> — tế bào, thực vật, động vật, vi sinh vật</li></ul>',
       'Toán, Địa lí, Tin học, Công nghệ là <i>các môn riêng</i>, không nằm trong KHTN.'],
      ['Đúng — ba phân môn của KHTN là Vật Lý, Hoá Học, Sinh Học.',
       'Sai — Toán là môn riêng, không thuộc KHTN.',
       'Sai — Địa lí thuộc môn Lịch Sử & Địa Lý, Công nghệ là môn riêng.',
       'Sai — Tin học là môn riêng, và thiếu Vật Lý.']),
    Q('Vì sao khi lặn dưới nước, ta nghe tiếng động rõ hơn so với ngoài không khí?',
      ['Vì nước không truyền được âm nên tai đỡ ồn', 'Vì âm truyền trong nước nhanh hơn và ít bị hấp thụ hơn trong không khí', 'Vì tai người hoạt động tốt hơn khi ướt', 'Vì dưới nước không có âm thanh nào khác'],
      1,
      'Tốc độ âm trong nước khoảng 1 500 m/s, trong không khí khoảng 340 m/s nên âm truyền hiệu quả hơn.',
      ['Âm thanh cần <b>môi trường vật chất</b> để truyền. Môi trường càng đặc và liên kết càng chặt thì âm truyền càng nhanh.',
       'So sánh tốc độ truyền âm:<ul><li>chất rắn — nhanh nhất (thép ≈ 5 000 m/s)</li><li><b>chất lỏng</b> — nước ≈ <b>1 500 m/s</b></li><li><b>chất khí</b> — không khí ≈ <b>340 m/s</b></li><li>chân không — <i>không truyền được âm</i></li></ul>',
       'Âm trong nước vừa nhanh hơn vừa ít bị hấp thụ hơn nên truyền xa và rõ hơn — đây là lí do cá voi liên lạc được với nhau qua hàng chục ki-lô-mét.'],
      ['Sai — nước truyền âm tốt hơn không khí.',
       'Đúng — âm trong nước nhanh và ít suy giảm hơn.',
       'Sai — cơ chế nằm ở môi trường truyền âm, không phải ở tai.',
       'Sai — dưới nước vẫn có nhiều nguồn âm.']),
    Q('Công thức hoá học của hợp chất tạo bởi Fe (hoá trị III) và nhóm SO₄ (hoá trị II) là?',
      ['FeSO₄', 'Fe₃(SO₄)₂', 'Fe₂(SO₄)₃', 'Fe(SO₄)₃'],
      2,
      'Quy tắc hoá trị: III × x = II × y, chọn x = 2, y = 3 nên công thức là Fe₂(SO₄)₃.',
      ['<b>Quy tắc hoá trị</b>: trong công thức AₓBᵥ thì <i>hoá trị A × chỉ số x = hoá trị B × chỉ số y</i>.',
       'Áp dụng cho Fe(III) và SO₄(II):<ul><li>III × x = II × y</li><li>chọn cặp số nguyên nhỏ nhất: x = 2, y = 3</li><li>công thức: <b>Fe₂(SO₄)₃</b> — sắt(III) sulfate</li></ul>',
       'Mẹo nhanh: <i>hoá trị của nguyên tố này thành chỉ số của nguyên tố kia</i>, rồi rút gọn nếu được. FeSO₄ là sắt(II) sulfate — đúng công thức nhưng sai hoá trị đề bài.'],
      ['Sai — FeSO₄ ứng với Fe hoá trị II.',
       'Sai — đảo ngược chỉ số, không thoả quy tắc hoá trị.',
       'Đúng — Fe₂(SO₄)₃, sắt(III) sulfate.',
       'Sai — III × 1 ≠ II × 3.']),
    Q('Vì sao quang hợp của thực vật lại quan trọng với TOÀN BỘ sự sống trên Trái Đất?',
      ['Chỉ vì giúp cây xanh tốt hơn', 'Vì tạo ra khí O₂ để thở và tạo chất hữu cơ làm nền của chuỗi thức ăn', 'Vì làm giảm nhiệt độ ban đêm', 'Vì giúp cây nở hoa đúng vụ'],
      1,
      'Quang hợp tạo O₂ cho mọi sinh vật hiếu khí và tạo chất hữu cơ — nền tảng của mọi chuỗi thức ăn.',
      ['Quang hợp chuyển hoá <b>CO₂ + H₂O</b> (nhờ ánh sáng và chất diệp lục) thành <b>glucose + O₂</b>.',
       'Hai vai trò chủ chốt với sự sống:<ul><li><b>Tạo O₂</b> — cung cấp khí thở cho tất cả sinh vật hiếu khí, kể cả con người</li><li><b>Tạo chất hữu cơ</b> — nền tảng của <i>chuỗi thức ăn</i>: động vật ăn cỏ ăn thực vật, động vật ăn thịt ăn động vật ăn cỏ</li></ul>',
       'Vì thế mọi sinh vật đều <b>trực tiếp hoặc gián tiếp</b> sống nhờ chất hữu cơ do thực vật tạo ra. Đây là điểm nối rõ nhất giữa Sinh học và Hoá học.'],
      ['Sai — vai trò của quang hợp vượt xa bản thân cây.',
       'Đúng — vừa tạo O₂, vừa tạo chất hữu cơ nền của chuỗi thức ăn.',
       'Sai — đó không phải vai trò chính của quang hợp.',
       'Sai — ra hoa liên quan đến quang chu kì, không phải vai trò chính của quang hợp.']),
    Q('Ba phân môn của KHTN kết nối với nhau như thế nào?',
      ['Hoàn toàn độc lập, không liên quan gì', 'Hoá học giải thích bản chất nguyên tử của vật chất mà Vật lý nghiên cứu; Sinh học dùng Hoá học để hiểu quang hợp và hô hấp tế bào', 'Chỉ Vật lý và Hoá học liên quan, Sinh học tách riêng', 'Chỉ liên quan ở phần bài tập tính toán'],
      1,
      'Ba phân môn bổ trợ nhau: khoa học tự nhiên là một tổng thể chứ không phải ba môn rời rạc.',
      ['Ba phân môn <i>tưởng</i> riêng biệt nhưng thực ra <b>bổ trợ nhau</b> — đó chính là lí do CT GDPT 2018 tích hợp chúng thành một môn.',
       'Vài mối nối cụ thể:<ul><li><b>Hoá → Vật lý</b>: cấu tạo nguyên tử (hạt nhân + electron) giải thích vì sao vật này dẫn điện, vật kia cách điện</li><li><b>Hoá → Sinh</b>: quang hợp và hô hấp tế bào <i>là những phản ứng hoá học</i> diễn ra trong cơ thể sống</li><li><b>Vật lý → Sinh</b>: ánh sáng là yếu tố đầu vào của quang hợp; âm thanh là cơ sở của thính giác</li></ul>',
       'Khoa học tự nhiên là <b>một tổng thể</b>: hiểu một phân môn giúp em hiểu sâu hai phân môn kia.'],
      ['Sai — ba phân môn liên quan chặt chẽ với nhau.',
       'Đúng — đó chính là các mối nối giữa ba phân môn.',
       'Sai — Sinh học gắn rất chặt với Hoá học.',
       'Sai — mối liên hệ nằm ở bản chất kiến thức, không chỉ ở bài tập.']),
    Q('Phần Sinh học của KHTN lớp 8 sẽ tập trung vào chủ đề nào?',
      ['Cơ thể người — các hệ vận động, tuần hoàn, hô hấp, tiêu hoá, bài tiết, thần kinh, sinh sản', 'Phân loại thực vật có hoa', 'Di truyền và biến dị', 'Hệ sinh thái và bảo vệ môi trường'],
      0,
      'KHTN 8 chuyển trọng tâm Sinh học sang cơ thể người và các hệ cơ quan.',
      ['Sinh học 7 đi qua <i>tế bào → thực vật → động vật → vi sinh vật</i>. Lớp 8 quay về một đối tượng gần gũi nhất: <b>chính cơ thể em</b>.',
       'Nội dung Sinh học lớp 8:<ul><li>hệ vận động, hệ tuần hoàn, hệ hô hấp</li><li>hệ tiêu hoá, hệ bài tiết</li><li>hệ thần kinh, hệ nội tiết, sinh sản</li></ul>',
       'Cùng lúc đó, <b>Vật lý 8</b> học lực và nhiệt học; <b>Hoá học 8</b> học phản ứng oxi hoá, phân huỷ, thế cùng tính chất của oxi, hidro, nước. Gợi ý ôn hè: ôn lại công thức v = s/t, I = U/R và luyện cân bằng phương trình hoá học đơn giản.'],
      ['Đúng — trọng tâm Sinh học lớp 8 là cơ thể người.',
       'Sai — phân loại thực vật đã học ở lớp 6–7.',
       'Sai — di truyền và biến dị là nội dung lớp 9.',
       'Sai — hệ sinh thái học kĩ hơn ở lớp 9 và THPT.']),
  ]),
];

export const S7KHTN_SCENARIOS = indexBy(S7KHTN_WEEKS);
