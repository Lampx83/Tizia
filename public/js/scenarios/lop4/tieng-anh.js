// ============================================================
// Lớp 4 · TIẾNG ANH — 35 tuần (HK1: 1–18 · HK2: 19–35)
// Bám SGK GDPT 2018: Global Success / Family and Friends / iLearn 4.
// ID prefix: "P4TA-wNN-quiz".
// ============================================================
import { Q, W, indexBy } from './_helper.js';

const M = (n, title, qs, opts) => W('P4TA', 'tieng-anh', n, title, qs, opts);

export const P4TA_WEEKS = [
  // ──────────────── HK1 ────────────────
  M(1, 'My family and friends', [
    Q('"Brother" tiếng Việt là?', ['Chị gái', 'Em gái', 'Anh/Em trai', 'Ông nội (Grandfather)'], 2, 'Brother = anh trai hoặc em trai.', ['Sai — chị gái là sister.', 'Sai — em gái là sister.', 'Đúng — brother là anh trai hoặc em trai.', 'Sai — ông nội là grandfather.']),
    Q('"Sister" có nghĩa là?', ['Mẹ (Mother)', 'Anh trai', 'Chị/Em gái', 'Cô/Dì (Aunt)'], 2, 'Sister = chị gái hoặc em gái.', ['Sai — mẹ là mother.', 'Sai — anh trai là brother.', 'Đúng — sister là chị gái hoặc em gái.', 'Sai — cô/dì là aunt.']),
    Q('"This is my ___." Bố em — chọn từ?', ['friend', 'father', 'mother', 'sister'], 1, 'Father = bố/cha.', ['Sai — friend là bạn, không phải bố.', 'Đúng — father là bố/cha.', 'Sai — mother là mẹ.', 'Sai — sister là chị/em gái.']),
    Q('"My friend" có nghĩa là?', ['Hàng xóm', 'Em họ (Cousin)', 'Bạn của tôi', 'Anh trai'], 2, 'My friend = bạn của tôi.', ['Sai — hàng xóm là neighbour.', 'Sai — em họ là cousin.', 'Đúng — my friend là bạn của tôi.', 'Sai — anh trai là brother.']),
    Q('Hỏi: "Who is she?" — đáp:', ['He is my dad', 'She is my sister', 'I am Lan', 'It is a book'], 1, 'Chủ ngữ "she" → "She is my sister".', ['Sai — hỏi về she thì đáp bằng she, không phải he.', 'Đúng — she hỏi thì đáp She is my sister.', 'Sai — câu hỏi về she, không phải về I.', 'Sai — she là người, không dùng it.']),
    Q('Số nhiều của "friend" là?', ['friend', 'friends', 'friendes', 'frienz'], 1, 'Danh từ đếm được thêm -s: friends.', ['Sai — đây là số ít, chưa thêm -s.', 'Đúng — thêm -s thành friends.', 'Sai — không thêm -es vào friend.', 'Sai — không có dạng viết frienz.']),
  ]),

  M(2, 'Days of the week', [
    Q('"Monday" là thứ mấy?', ['Thứ hai', 'Chủ nhật', 'Thứ ba', 'Thứ tư'], 0, 'Monday = thứ hai.', ['Đúng — Monday là thứ hai.', 'Sai — chủ nhật là Sunday.', 'Sai — thứ ba là Tuesday.', 'Sai — thứ tư là Wednesday.']),
    Q('"Friday" là thứ mấy?', ['Chủ nhật', 'Thứ bảy', 'Thứ năm', 'Thứ sáu'], 3, 'Friday = thứ sáu.', ['Sai — chủ nhật là Sunday.', 'Sai — thứ bảy là Saturday.', 'Sai — thứ năm là Thursday.', 'Đúng — Friday là thứ sáu.']),
    Q('Cuối tuần (weekend) gồm những ngày nào?', ['Wed & Thu', 'Fri & Mon', 'Sat & Sun', 'Mon & Tue'], 2, 'Weekend = Saturday + Sunday.', ['Sai — đây là giữa tuần.', 'Sai — Monday là đầu tuần, không phải cuối tuần.', 'Đúng — weekend là thứ bảy và chủ nhật.', 'Sai — đây là đầu tuần.']),
    Q('Sắp đúng: Tuesday, ___, Thursday', ['Friday', 'Wednesday', 'Sunday', 'Monday'], 1, 'Thứ 3 – thứ 4 – thứ 5: Tue – Wed – Thu.', ['Sai — Friday đứng sau Thursday.', 'Đúng — giữa Tuesday và Thursday là Wednesday.', 'Sai — Sunday không nằm giữa hai ngày này.', 'Sai — Monday đứng trước Tuesday.']),
    Q('"What day is it today?" hỏi gì?', ['Mấy giờ rồi', 'Hôm nay thứ mấy', 'Hôm nay ngày bao nhiêu', 'Thời tiết thế nào'], 1, 'What day is it today? = Hôm nay (là) thứ mấy?', ['Sai — hỏi giờ là What time is it?', 'Đúng — What day hỏi hôm nay thứ mấy.', 'Sai — hỏi ngày là What date.', 'Sai — hỏi thời tiết là What is the weather like?']),
    Q('Trả lời: "It\'s ___ today." (thứ bảy)', ['saturday', 'a Saturday', 'the Saturday', 'Saturday'], 3, 'Thứ trong tuần luôn viết hoa chữ đầu: Saturday.', ['Sai — thứ phải viết hoa chữ đầu.', 'Sai — không thêm mạo từ a trước thứ.', 'Sai — không thêm the trước thứ.', 'Đúng — viết hoa Saturday, không có mạo từ.']),
  ]),

  M(3, 'What do you do on...?', [
    Q('"What do you do on Sunday?" hỏi gì?', ['Bạn tên gì?', 'Bạn ở đâu?', 'Chủ nhật bạn làm gì?', 'Bạn bao nhiêu tuổi?'], 2, 'Hỏi hoạt động thường làm vào ngày đó.', ['Sai — hỏi tên là What is your name?', 'Sai — hỏi nơi chốn là Where.', 'Đúng — What do you do hỏi làm gì vào chủ nhật.', 'Sai — hỏi tuổi là How old are you?']),
    Q('"I go to school" có nghĩa là?', ['Tôi ở nhà', 'Tôi ngủ', 'Tôi đi học', 'Tôi đi chơi'], 2, 'Go to school = đi học.', ['Sai — ở nhà là stay at home.', 'Sai — ngủ là sleep.', 'Đúng — go to school là đi học.', 'Sai — đi chơi là go out/play.']),
    Q('Chia động từ: "She ___ TV in the evening."', ['watch (sai vì She cần thêm -es)', 'watched', 'watching', 'watches'], 3, 'Ngôi thứ 3 số ít, hiện tại đơn: watches.', ['Sai — She là ngôi 3 số ít, phải thêm -es.', 'Sai — watched là quá khứ, không hợp thói quen.', 'Sai — watching thiếu trợ động từ to be.', 'Đúng — She + watches (thêm -es).']),
    Q('"On Monday, I have ___" (môn Toán):', ['Music (Âm nhạc)', 'Art (Mỹ thuật)', 'English', 'Maths'], 3, 'Maths = Toán.', ['Sai — Music là Âm nhạc.', 'Sai — Art là Mỹ thuật.', 'Sai — English là Tiếng Anh.', 'Đúng — Maths là môn Toán.']),
    Q('"Play football" có nghĩa là?', ['Nấu ăn', 'Bơi lội (swim)', 'Đá bóng', 'Đọc sách'], 2, 'Play football = chơi/đá bóng.', ['Sai — nấu ăn là cook.', 'Sai — bơi lội là swim.', 'Đúng — play football là đá bóng.', 'Sai — đọc sách là read.']),
    Q('Trả lời "What do you do on Saturday?":', ['I play with my friends', 'It is hot', 'Yes, I do', 'I am Lan'], 0, 'Hỏi hoạt động → trả lời bằng động từ chỉ hoạt động.', ['Đúng — kể một hoạt động: I play with my friends.', 'Sai — đây là câu nói về thời tiết.', 'Sai — câu hỏi What do không trả lời Yes/No.', 'Sai — đây là câu giới thiệu tên.']),
  ]),

  M(4, "When's your birthday?", [
    Q('"When\'s your birthday?" hỏi gì?', ['Bạn bao nhiêu tuổi?', 'Sinh nhật bạn khi nào?', 'Bạn tên gì?', 'Bạn ở đâu?'], 1, "When's = When is — hỏi thời gian sinh nhật.", ['Sai — hỏi tuổi là How old are you?', 'Đúng — When hỏi sinh nhật khi nào.', 'Sai — hỏi tên là What is your name?', 'Sai — hỏi nơi chốn là Where.']),
    Q('Tháng 1 tiếng Anh là?', ['January', 'June (tháng 6)', 'March (tháng 3)', 'July (tháng 7)'], 0, 'January = tháng 1.', ['Đúng — January là tháng 1.', 'Sai — June là tháng 6.', 'Sai — March là tháng 3.', 'Sai — July là tháng 7.']),
    Q('"My birthday is ___ May." (vào tháng 5)', ['in', 'at (chỉ dùng với giờ)', 'on (chỉ dùng với thứ/ngày)', 'to (chỉ hướng, không dùng cho tháng)'], 0, 'Với THÁNG dùng "in": in May.', ['Đúng — với tháng dùng in: in May.', 'Sai — at dùng cho giờ.', 'Sai — on dùng cho thứ/ngày.', 'Sai — to chỉ hướng, không dùng cho tháng.']),
    Q('"December" là tháng?', ['Tháng 9', 'Tháng 12', 'Tháng 10', 'Tháng 11'], 1, 'December = tháng 12.', ['Sai — tháng 9 là September.', 'Đúng — December là tháng 12.', 'Sai — tháng 10 là October.', 'Sai — tháng 11 là November.']),
    Q('"It\'s on the 2nd of September" — sinh nhật vào?', ['1/9', '20/9', '2/9', '2/10'], 2, '2nd of September = ngày 2 tháng 9.', ['Sai — đây là ngày 1, không phải ngày 2.', 'Sai — 2nd là ngày 2, không phải 20.', 'Đúng — 2nd of September là ngày 2 tháng 9.', 'Sai — September là tháng 9, không phải tháng 10.']),
    Q('Trả lời "How old are you?" (9 tuổi):', ['My age is 9 (dịch từng chữ từ tiếng Việt)', 'I have 9', 'I am 9 years old', 'I am 9 year'], 2, 'Cấu trúc: I am + số + years old.', ['Sai — đây là dịch từng chữ, không tự nhiên.', 'Sai — không dùng have để nói tuổi.', 'Đúng — I am 9 years old.', 'Sai — phải là years old (số nhiều).']),
  ]),

  M(5, 'Can you swim?', [
    Q('"Can you swim?" hỏi gì?', ['Bạn có biết bơi không?', 'Bạn ở đâu?', 'Bạn có đói không?', 'Bạn bao nhiêu tuổi?'], 0, 'Can = có thể (khả năng).', ['Đúng — Can you swim? hỏi có biết bơi không.', 'Sai — hỏi nơi chốn là Where.', 'Sai — hỏi đói là Are you hungry?', 'Sai — hỏi tuổi là How old are you?']),
    Q('Trả lời khẳng định "Can you sing?"', ['Yes, I can', 'No, I am', 'I sing', 'Yes, I do'], 0, 'Yes, I can / No, I can\'t.', ['Đúng — câu hỏi Can thì đáp Yes, I can.', 'Sai — phải đáp bằng can, không phải am.', 'Sai — câu hỏi Yes/No không trả lời như vậy.', 'Sai — Can hỏi thì đáp can, không phải do.']),
    Q('"I can\'t ride a bike" có nghĩa là?', ['Tôi không biết đi xe đạp', 'Tôi biết đi xe đạp', 'Tôi thích xe đạp', 'Tôi có xe đạp'], 0, "can't = cannot = không thể.", ['Đúng — can\'t là không thể, tức không biết đi xe đạp.', 'Sai — can\'t nghĩa là không thể, không phải biết.', 'Sai — thích là like, không phải can\'t.', 'Sai — có là have, không phải can\'t.']),
    Q('"Dance" có nghĩa là?', ['Hát (sing)', 'Nhảy múa', 'Đọc sách (read)', 'Vẽ tranh (draw)'], 1, 'Dance = nhảy múa.', ['Sai — hát là sing.', 'Đúng — dance là nhảy múa.', 'Sai — đọc sách là read.', 'Sai — vẽ tranh là draw.']),
    Q('Sau "can" động từ ở dạng?', ['V-ed (quá khứ)', 'nguyên thể (V)', 'V-ing (tiếp diễn)', 'V-s (ngôi 3 số ít)'], 1, 'Can + V (nguyên thể, không to).', ['Sai — sau can không dùng V-ed.', 'Đúng — can + động từ nguyên thể.', 'Sai — sau can không dùng V-ing.', 'Sai — sau can không thêm -s.']),
    Q('Chọn câu đúng:', ['She can swim', 'She can swims', 'She cans swim', 'She is can swim'], 0, 'Can + V nguyên thể, không thêm -s.', ['Đúng — can + swim (nguyên thể).', 'Sai — sau can không thêm -s vào swim.', 'Sai — can không thêm -s.', 'Sai — không dùng is đứng cùng can.']),
  ]),

  M(6, "Where's your school?", [
    Q('"Where\'s your school?" hỏi gì?', ['Trường bạn ở đâu?', 'Bạn học lớp mấy?', 'Trường bạn lớn không?', 'Trường bạn tên gì?'], 0, "Where = ở đâu.", ['Đúng — Where hỏi trường ở đâu.', 'Sai — hỏi lớp mấy là What class.', 'Sai — hỏi to/nhỏ là Is your school big?', 'Sai — hỏi tên là What is the name?']),
    Q('"My school is on ___ Street."', ['in (chỉ dùng với thành phố/nước)', 'at (chỉ dùng với địa chỉ số nhà)', 'on', 'to (chỉ hướng đến)'], 2, 'Với tên đường dùng "on": on Le Loi Street.', ['Sai — in dùng cho thành phố/nước.', 'Sai — at dùng cho địa chỉ số nhà.', 'Đúng — với tên đường dùng on.', 'Sai — to chỉ hướng đến.']),
    Q('"It\'s in the city" có nghĩa là?', ['Ở biển', 'Ở nông thôn', 'Ở trên núi', 'Ở trong thành phố'], 3, 'City = thành phố.', ['Sai — biển là sea/beach.', 'Sai — nông thôn là countryside.', 'Sai — núi là mountain.', 'Đúng — city là thành phố.']),
    Q('Trả lời "What\'s the name of your school?":', ['It\'s big', 'I go to school', 'Yes, I do', 'It\'s Le Loi Primary School'], 3, 'Hỏi TÊN → trả lời bằng danh từ riêng.', ['Sai — đây là nói về kích cỡ, không phải tên.', 'Sai — đây không phải tên trường.', 'Sai — câu hỏi tên không trả lời Yes/No.', 'Đúng — trả lời bằng tên trường.']),
    Q('"Class 4A" có nghĩa là?', ['Tuần 4', 'Tầng 4', 'Lớp 4A', 'Trường 4A'], 2, 'Class 4A = lớp 4A.', ['Sai — tuần là week.', 'Sai — tầng là floor.', 'Đúng — class 4A là lớp 4A.', 'Sai — trường là school.']),
    Q('"My classroom is on the ___ floor." (tầng 2)', ['one (số đếm, không dùng cho tầng)', 'two (số đếm, không dùng cho tầng)', 'second', 'first (tầng 1, không phải tầng 2)'], 2, 'Tầng dùng số thứ tự: second floor.', ['Sai — one là số đếm, không dùng cho tầng.', 'Sai — two là số đếm, không dùng cho tầng.', 'Đúng — tầng 2 là second floor.', 'Sai — first là tầng 1, không phải tầng 2.']),
  ]),

  M(7, 'What do you like doing?', [
    Q('"What do you like doing?" hỏi gì?', ['Bạn đang làm gì?', 'Bạn tên gì?', 'Bạn có khoẻ không?', 'Bạn thích làm gì?'], 3, 'Hỏi sở thích về hoạt động.', ['Sai — hỏi đang làm gì là What are you doing?', 'Sai — hỏi tên là What is your name?', 'Sai — hỏi sức khoẻ là How are you?', 'Đúng — like doing hỏi thích làm gì.']),
    Q('Sau "like" động từ ở dạng?', ['V-s (ngôi 3 số ít)', 'V-ing', 'V-ed (quá khứ)', 'V (nguyên thể)'], 1, 'Like + V-ing (sở thích): I like reading.', ['Sai — sau like không thêm -s.', 'Đúng — like + V-ing: I like reading.', 'Sai — sau like không dùng V-ed.', 'Sai — ở lớp 4, sở thích dùng like + V-ing.']),
    Q('"I like reading books." có nghĩa là?', ['Tôi đang đọc sách', 'Tôi mua sách', 'Tôi có sách', 'Tôi thích đọc sách'], 3, 'Like reading = thích đọc.', ['Sai — đang đọc là I am reading.', 'Sai — mua là buy.', 'Sai — có là have.', 'Đúng — like reading là thích đọc sách.']),
    Q('"Cooking" có nghĩa là?', ['Đọc sách (reading)', 'Hát (singing)', 'Nấu ăn', 'Vẽ tranh (drawing)'], 2, 'Cook = nấu, cooking = (việc) nấu ăn.', ['Sai — đọc sách là reading.', 'Sai — hát là singing.', 'Đúng — cooking là (việc) nấu ăn.', 'Sai — vẽ tranh là drawing.']),
    Q('Chọn câu đúng:', ['I likes swim', 'I like swim', 'I like swimming', 'I like to swims'], 2, 'Like + V-ing: swimming.', ['Sai — I không thêm -s vào like.', 'Sai — sau like phải dùng V-ing.', 'Đúng — like + swimming (V-ing).', 'Sai — to swims là sai, không thêm -s.']),
    Q('"Drawing" có nghĩa là?', ['Hát (singing)', 'Vẽ', 'Nhảy múa (dancing)', 'Đọc sách'], 1, 'Draw = vẽ → drawing.', ['Sai — hát là singing.', 'Đúng — drawing là vẽ.', 'Sai — nhảy múa là dancing.', 'Sai — đọc sách là reading.']),
  ]),

  M(8, "What's your favourite food?", [
    Q('"Favourite" có nghĩa là?', ['Yêu thích nhất', 'Ghét nhất', 'Khó nhất (most difficult)', 'Bình thường'], 0, 'Favourite = (ưa) thích nhất.', ['Đúng — favourite là yêu thích nhất.', 'Sai — ghét nhất là trái nghĩa.', 'Sai — khó nhất là most difficult.', 'Sai — bình thường là normal.']),
    Q('"Rice" có nghĩa là?', ['Cháo (porridge)', 'Bánh mì', 'Mì (noodles)', 'Cơm/Gạo'], 3, 'Rice = cơm/gạo.', ['Sai — cháo là porridge.', 'Sai — bánh mì là bread.', 'Sai — mì là noodles.', 'Đúng — rice là cơm/gạo.']),
    Q('"Bread" có nghĩa là?', ['Bún (rice noodles)', 'Bánh mì', 'Cơm (rice)', 'Phở (pho/beef noodle soup)'], 1, 'Bread = bánh mì.', ['Sai — bún là rice noodles.', 'Đúng — bread là bánh mì.', 'Sai — cơm là rice.', 'Sai — phở là pho.']),
    Q('Trả lời "What\'s your favourite food?":', ['I like', 'I am hungry', 'It\'s big', 'It\'s chicken'], 3, 'Hỏi món ăn ưa thích → tên món: chicken.', ['Sai — I like còn thiếu tên món ăn.', 'Sai — đây là nói đói, không phải món ăn.', 'Sai — đây là nói kích cỡ.', 'Đúng — trả lời bằng tên món: It\'s chicken.']),
    Q('"I\'d like ___ apple." (một quả táo)', ['an', 'some (chỉ dùng với số nhiều/không đếm)', 'a (chỉ dùng trước phụ âm)', 'the (chỉ vật xác định)'], 0, 'apple bắt đầu bằng nguyên âm → an apple.', ['Đúng — apple bắt đầu nguyên âm nên dùng an.', 'Sai — some dùng cho số nhiều/không đếm.', 'Sai — a dùng trước phụ âm.', 'Sai — the chỉ vật đã xác định.']),
    Q('"Noodles" có nghĩa là?', ['Chè (sweet soup/tea)', 'Cơm (rice)', 'Bánh ngọt (cake)', 'Mì'], 3, 'Noodles = mì/bún.', ['Sai — chè là sweet soup.', 'Sai — cơm là rice.', 'Sai — bánh ngọt là cake.', 'Đúng — noodles là mì/bún.']),
  ]),

  M(9, 'At the zoo', [
    Q('"Zoo" có nghĩa là?', ['Sân bay', 'Công viên', 'Bệnh viện', 'Sở thú'], 3, 'Zoo = sở thú/vườn thú.', ['Sai — sân bay là airport.', 'Sai — công viên là park.', 'Sai — bệnh viện là hospital.', 'Đúng — zoo là sở thú.']),
    Q('"Elephant" là con gì?', ['Hổ (tiger)', 'Khỉ (monkey)', 'Sư tử (lion)', 'Voi'], 3, 'Elephant = voi.', ['Sai — hổ là tiger.', 'Sai — khỉ là monkey.', 'Sai — sư tử là lion.', 'Đúng — elephant là voi.']),
    Q('"Monkey" là con gì?', ['Báo (leopard)', 'Hươu cao cổ (giraffe)', 'Khỉ', 'Gấu (bear)'], 2, 'Monkey = khỉ.', ['Sai — báo là leopard.', 'Sai — hươu cao cổ là giraffe.', 'Đúng — monkey là khỉ.', 'Sai — gấu là bear.']),
    Q('"The tiger can ___ very fast." (chạy)', ['run', 'fly (bay, dành cho chim)', 'swim (bơi, dành cho cá)', 'sing (hát, dành cho chim)'], 0, 'Tiger (hổ) chạy nhanh: run.', ['Đúng — hổ chạy nhanh là run.', 'Sai — fly là bay, dành cho chim.', 'Sai — swim là bơi, dành cho cá.', 'Sai — sing là hát, dành cho chim.']),
    Q('"Look at the ___!" — con vật trong tranh là sư tử:', ['fish (cá)', 'lion', 'duck (vịt)', 'cow (bò)'], 1, 'Lion = sư tử.', ['Sai — fish là cá.', 'Đúng — lion là sư tử.', 'Sai — duck là vịt.', 'Sai — cow là bò.']),
    Q('Số nhiều "elephant" là?', ['elephant', 'elephanties', 'elephants', 'elephantes'], 2, 'Thêm -s: elephants.', ['Sai — đây là số ít, chưa thêm -s.', 'Sai — không đổi đuôi thành -ies.', 'Đúng — thêm -s thành elephants.', 'Sai — không thêm -es vào elephant.']),
  ]),

  M(10, "What's the weather like?", [
    Q('"What\'s the weather like?" hỏi gì?', ['Bạn thích gì?', 'Hôm nay thứ mấy?', 'Thời tiết thế nào?', 'Bạn mấy tuổi?'], 2, 'Weather = thời tiết.', ['Sai — hỏi thích gì là What do you like?', 'Sai — hỏi thứ là What day is it?', 'Đúng — hỏi thời tiết thế nào.', 'Sai — hỏi tuổi là How old are you?']),
    Q('"It\'s sunny" có nghĩa là?', ['Trời mưa', 'Trời lạnh', 'Trời gió', 'Trời nắng'], 3, 'Sunny = có nắng.', ['Sai — trời mưa là rainy.', 'Sai — trời lạnh là cold.', 'Sai — trời gió là windy.', 'Đúng — sunny là trời nắng.']),
    Q('"Rainy" có nghĩa là?', ['Có mưa', 'Nóng (hot/nắng nóng)', 'Có gió', 'Có tuyết'], 0, 'Rain = mưa → rainy = có mưa.', ['Đúng — rainy là có mưa.', 'Sai — nóng là hot.', 'Sai — có gió là windy.', 'Sai — có tuyết là snowy.']),
    Q('"It\'s ___ in winter." (lạnh)', ['cool (mát, dùng cho mùa thu)', 'cold', 'warm (ấm, dùng cho mùa xuân)', 'hot (nóng, dùng cho mùa hè)'], 1, 'Mùa đông lạnh: cold.', ['Sai — cool là mát, hợp mùa thu.', 'Đúng — mùa đông lạnh là cold.', 'Sai — warm là ấm, hợp mùa xuân.', 'Sai — hot là nóng, hợp mùa hè.']),
    Q('"Windy" có nghĩa là?', ['Có mây', 'Có nắng (sunny)', 'Có gió', 'Sương mù'], 2, 'Wind = gió → windy.', ['Sai — có mây là cloudy.', 'Sai — có nắng là sunny.', 'Đúng — windy là có gió.', 'Sai — sương mù là foggy.']),
    Q('Mùa hè ở Việt Nam thường?', ['cold and snowy', 'cool and windy', 'foggy (có sương mù, dành cho mùa đông)', 'hot and sunny'], 3, 'Hè VN nóng và nắng.', ['Sai — lạnh và tuyết hợp mùa đông.', 'Sai — mát và gió không hợp mùa hè VN.', 'Sai — sương mù hợp mùa đông.', 'Đúng — hè VN nóng và nắng.']),
  ]),

  M(11, 'How much is it?', [
    Q('"How much is it?" hỏi gì?', ['Cái này bao nhiêu tiền?', 'Bạn có gì?', 'Cái này của ai?', 'Cái này là gì?'], 0, 'How much = bao nhiêu (giá).', ['Đúng — How much hỏi giá bao nhiêu tiền.', 'Sai — hỏi có gì là What do you have?', 'Sai — hỏi của ai là Whose.', 'Sai — hỏi là gì là What is it?']),
    Q('"It\'s 20,000 dong" có nghĩa là?', ['200.000 đồng', '20.000 đồng', '20 đồng', '2.000 đồng'], 1, '20,000 dong = 20.000 đồng.', ['Sai — đây là 200.000, dư một số 0.', 'Đúng — 20,000 dong là 20.000 đồng.', 'Sai — 20 đồng thiếu các số 0.', 'Sai — 2.000 thiếu một số 0.']),
    Q('"I\'d like a ___ of milk." (một cốc)', ['glass', 'piece (miếng, dùng cho bánh)', 'bottle', 'kilo (cân, dùng cho thịt/gạo)'], 0, 'A glass of milk = một cốc/ly sữa.', ['Đúng — a glass of milk là một cốc sữa.', 'Sai — piece là miếng, dùng cho bánh.', 'Sai — bottle là chai, không phải cốc.', 'Sai — kilo là cân, dùng cho thịt/gạo.']),
    Q('"A kilo of beef" có nghĩa là?', ['Một hộp bò', 'Một cân thịt bò', 'Một con bò', 'Một lát thịt'], 1, 'Kilo = ki-lô-gam.', ['Sai — hộp là box/can.', 'Đúng — a kilo of beef là một cân thịt bò.', 'Sai — một con bò là a cow.', 'Sai — một lát là a slice.']),
    Q('Hỏi giá lịch sự:', ['How much is it?', 'What is it?', 'Who is it?', 'Where is it?'], 0, 'How much is it? = Giá bao nhiêu?', ['Đúng — How much is it? hỏi giá.', 'Sai — What is it? hỏi vật gì.', 'Sai — Who is it? hỏi ai.', 'Sai — Where is it? hỏi ở đâu.']),
    Q('Đáp: "How much are these apples?"', ['I like apples', 'Yes, I do', 'They are 30,000 dong', 'It is red'], 2, 'Chủ ngữ số nhiều → "They are".', ['Sai — đây là nói thích, không phải giá.', 'Sai — câu hỏi giá không trả lời Yes/No.', 'Đúng — apples số nhiều nên dùng They are.', 'Sai — đây là nói màu sắc.']),
  ]),

  M(12, 'What time is it?', [
    Q('"What time is it?" hỏi gì?', ['Hôm nay thứ mấy?', 'Bạn ở đâu?', 'Mấy giờ rồi?', 'Bạn tên gì?'], 2, 'Hỏi giờ.', ['Sai — hỏi thứ là What day is it?', 'Sai — hỏi nơi chốn là Where.', 'Đúng — What time hỏi mấy giờ.', 'Sai — hỏi tên là What is your name?']),
    Q('"It\'s seven o\'clock" có nghĩa là?', ['7 giờ rưỡi', '7 phút', '7 giờ đúng', '17 giờ'], 2, "o'clock = giờ đúng.", ['Sai — 7 giờ rưỡi là half past seven.', 'Sai — o\'clock là giờ, không phải phút.', 'Đúng — o\'clock là giờ đúng, tức 7 giờ.', 'Sai — seven là 7, không phải 17.']),
    Q('"Half past six" là?', ['6:45', '6:30', '6:00', '6:15'], 1, 'Half past = qua nửa giờ → 6:30.', ['Sai — 6:45 là a quarter to seven.', 'Đúng — half past six là 6:30.', 'Sai — 6:00 là six o\'clock.', 'Sai — 6:15 là a quarter past six.']),
    Q('"A quarter past nine" là?', ['9:00', '9:30', '9:15', '9:45'], 2, 'A quarter past = qua 15 phút → 9:15.', ['Sai — 9:00 là nine o\'clock.', 'Sai — 9:30 là half past nine.', 'Đúng — a quarter past nine là 9:15.', 'Sai — 9:45 là a quarter to ten.']),
    Q('"I get up at 6 ___" (vào lúc 6 giờ)', ['in (chỉ dùng với tháng/năm)', 'on (chỉ dùng với thứ/ngày)', 'to (chỉ hướng, không dùng cho giờ)', 'at'], 3, 'Với giờ dùng "at": at 6.', ['Sai — in dùng cho tháng/năm.', 'Sai — on dùng cho thứ/ngày.', 'Sai — to chỉ hướng, không dùng cho giờ.', 'Đúng — với giờ dùng at: at 6.']),
    Q('"It\'s twelve o\'clock" — buổi trưa em ăn?', ['lunch', 'snack (bữa phụ buổi xế chiều)', 'dinner', 'breakfast'], 0, '12h trưa → lunch.', ['Đúng — 12h trưa ăn lunch.', 'Sai — snack là bữa phụ xế chiều.', 'Sai — dinner là bữa tối.', 'Sai — breakfast là bữa sáng.']),
  ]),

  M(13, 'Free time activities', [
    Q('"Free time" có nghĩa là?', ['Giờ học', 'Giờ ngủ', 'Giờ ăn', 'Thời gian rảnh'], 3, 'Free time = thời gian rảnh rỗi.', ['Sai — giờ học là school time/lesson.', 'Sai — giờ ngủ là bedtime.', 'Sai — giờ ăn là mealtime.', 'Đúng — free time là thời gian rảnh.']),
    Q('"What do you do in your free time?" trả lời:', ['I read books', 'Yes, I do', 'It is hot', 'I sleep all day'], 0, 'Kể hoạt động yêu thích.', ['Đúng — kể hoạt động: I read books.', 'Sai — câu hỏi What do không trả lời Yes/No.', 'Sai — đây là nói thời tiết.', 'Sai — ngủ cả ngày không phải hoạt động giải trí.']),
    Q('"Listen to music" có nghĩa là?', ['Đọc sách', 'Xem TV', 'Nghe nhạc', 'Vẽ tranh'], 2, 'Listen to music = nghe nhạc.', ['Sai — đọc sách là read books.', 'Sai — xem TV là watch TV.', 'Đúng — listen to music là nghe nhạc.', 'Sai — vẽ tranh là draw.']),
    Q('"Watch cartoons" có nghĩa là?', ['Đi bơi', 'Xem bóng đá', 'Đọc truyện', 'Xem phim hoạt hình'], 3, 'Cartoons = phim hoạt hình.', ['Sai — đi bơi là swim.', 'Sai — xem bóng đá là watch football.', 'Sai — đọc truyện là read a story.', 'Đúng — watch cartoons là xem phim hoạt hình.']),
    Q('Chia: "He ___ to music every day."', ['listens', 'listen', 'listened', 'listening'], 0, 'He + V-s: listens.', ['Đúng — He là ngôi 3 số ít nên thêm -s: listens.', 'Sai — He cần thêm -s vào listen.', 'Sai — listened là quá khứ, không hợp every day.', 'Sai — listening thiếu trợ động từ to be.']),
    Q('"Play chess" có nghĩa là?', ['Bơi (swim)', 'Đá bóng', 'Đánh cờ', 'Hát (sing)'], 2, 'Chess = (môn) cờ.', ['Sai — bơi là swim.', 'Sai — đá bóng là play football.', 'Đúng — play chess là đánh cờ.', 'Sai — hát là sing.']),
  ]),

  M(14, 'Hobbies', [
    Q('"Hobby" có nghĩa là?', ['Sở thích', 'Lớp học', 'Nghề nghiệp', 'Trường học'], 0, 'Hobby = sở thích.', ['Đúng — hobby là sở thích.', 'Sai — lớp học là class.', 'Sai — nghề nghiệp là job.', 'Sai — trường học là school.']),
    Q('"My hobby is ___ stamps." (sưu tầm)', ['collecting', 'collects', 'collected', 'collect'], 0, 'Sau "is" trong cấu trúc hobby thường dùng V-ing.', ['Đúng — sau is dùng V-ing: collecting.', 'Sai — collects là ngôi 3 số ít, không hợp ở đây.', 'Sai — collected là quá khứ.', 'Sai — sau is không dùng nguyên thể collect.']),
    Q('"Painting" có nghĩa là?', ['Hát (singing)', 'Nấu ăn', 'Vẽ tranh/Sơn', 'Bơi (swimming)'], 2, 'Paint = vẽ tranh / sơn.', ['Sai — hát là singing.', 'Sai — nấu ăn là cooking.', 'Đúng — painting là vẽ tranh/sơn.', 'Sai — bơi là swimming.']),
    Q('"What\'s your hobby?" trả lời:', ['My hobby is reading', 'I am 9', 'On Monday', 'Yes, I do'], 0, 'Trả lời hobby bằng V-ing.', ['Đúng — My hobby is reading (V-ing).', 'Sai — đây là nói tuổi.', 'Sai — đây là nói thời gian, không phải sở thích.', 'Sai — câu hỏi hobby không trả lời Yes/No.']),
    Q('"Gardening" có nghĩa là?', ['Câu cá', 'Nấu ăn', 'Đi bộ (walking)', 'Làm vườn'], 3, 'Garden = vườn → gardening = làm vườn.', ['Sai — câu cá là fishing.', 'Sai — nấu ăn là cooking.', 'Sai — đi bộ là walking.', 'Đúng — gardening là làm vườn.']),
    Q('Cùng hỏi sở thích: "Do you like ___?"', ['cook (sai vì sau like phải V-ing)', 'cooking', 'cooks (dạng ngôi 3 số ít, không dùng sau like)', 'to cooks'], 1, 'Like + V-ing.', ['Sai — sau like phải dùng V-ing.', 'Đúng — like + cooking (V-ing).', 'Sai — cooks là ngôi 3 số ít, không dùng sau like.', 'Sai — to cooks là sai cấu trúc.']),
  ]),

  M(15, 'In the town', [
    Q('"Bookshop" có nghĩa là?', ['Nhà ga', 'Bưu điện', 'Bệnh viện', 'Tiệm sách'], 3, 'Book + shop = tiệm sách.', ['Sai — nhà ga là station.', 'Sai — bưu điện là post office.', 'Sai — bệnh viện là hospital.', 'Đúng — bookshop là tiệm sách.']),
    Q('"Post office" có nghĩa là?', ['Sân bay', 'Bưu điện', 'Nhà hàng', 'Trường học'], 1, 'Post office = bưu điện.', ['Sai — sân bay là airport.', 'Đúng — post office là bưu điện.', 'Sai — nhà hàng là restaurant.', 'Sai — trường học là school.']),
    Q('"Hospital" có nghĩa là?', ['Bệnh viện', 'Khách sạn', 'Nhà thờ', 'Sở thú'], 0, 'Hospital = bệnh viện.', ['Đúng — hospital là bệnh viện.', 'Sai — khách sạn là hotel.', 'Sai — nhà thờ là church.', 'Sai — sở thú là zoo.']),
    Q('"The bank is ___ the post office." (kế bên)', ['in (trong, không phù hợp giữa 2 toà nhà)', 'under (bên dưới, sai logic)', 'on (trên, không phù hợp)', 'next to'], 3, 'Next to = ngay cạnh.', ['Sai — in là trong, không hợp giữa 2 toà nhà.', 'Sai — under là bên dưới, sai logic.', 'Sai — on là trên, không phù hợp.', 'Đúng — next to là ngay cạnh.']),
    Q('Hỏi đường: "How can I ___ to the museum?"', ['arrive', 'get', 'come (sai cấu trúc, đúng phải là come to)', 'go to (lặp giới từ, sai cấu trúc với how)'], 1, 'How can I get to ...? = Làm sao tới...?', ['Sai — arrive không đi với to theo cách này.', 'Đúng — How can I get to ...? là cách hỏi đường.', 'Sai — come dùng cấu trúc khác.', 'Sai — go to lặp giới từ, sai cấu trúc.']),
    Q('"Turn left" có nghĩa là?', ['Quay lại', 'Rẽ phải', 'Rẽ trái', 'Đi thẳng'], 2, 'Turn left = rẽ trái.', ['Sai — quay lại là turn around/go back.', 'Sai — rẽ phải là turn right.', 'Đúng — turn left là rẽ trái.', 'Sai — đi thẳng là go straight.']),
  ]),

  M(16, 'Jobs', [
    Q('"Teacher" là nghề?', ['Giáo viên', 'Bác sĩ', 'Đầu bếp', 'Nông dân'], 0, 'Teacher = giáo viên.', ['Đúng — teacher là giáo viên.', 'Sai — bác sĩ là doctor.', 'Sai — đầu bếp là cook/chef.', 'Sai — nông dân là farmer.']),
    Q('"Doctor" là nghề?', ['Bác sĩ', 'Y tá (nurse)', 'Ca sĩ (singer)', 'Họa sĩ'], 0, 'Doctor = bác sĩ.', ['Đúng — doctor là bác sĩ.', 'Sai — y tá là nurse.', 'Sai — ca sĩ là singer.', 'Sai — họa sĩ là painter/artist.']),
    Q('"Farmer" có nghĩa là?', ['Phi công', 'Lính cứu hoả', 'Công nhân', 'Nông dân'], 3, 'Farm = nông trại → farmer.', ['Sai — phi công là pilot.', 'Sai — lính cứu hoả là firefighter.', 'Sai — công nhân là worker.', 'Đúng — farmer là nông dân.']),
    Q('"My mother is ___ nurse."', ['∅ (không mạo từ, sai vì nghề số ít cần a/an)', 'a', 'an (chỉ dùng trước nguyên âm)', 'the (chỉ vật xác định, không dùng cho nghề chung)'], 1, 'Nghề nghiệp ở số ít → mạo từ a/an. Nurse bắt đầu phụ âm → "a nurse".', ['Sai — nghề số ít cần mạo từ a/an.', 'Đúng — nurse bắt đầu phụ âm nên dùng a.', 'Sai — an chỉ dùng trước nguyên âm.', 'Sai — the không dùng cho nghề chung chung.']),
    Q('"What does your father do?" hỏi gì?', ['Bố bạn tên gì?', 'Bố bạn đang làm gì?', 'Bố bạn ở đâu?', 'Bố bạn làm nghề gì?'], 3, 'What does X do? = X làm nghề gì?', ['Sai — hỏi tên là What is his name?', 'Sai — đang làm gì là What is he doing?', 'Sai — hỏi ở đâu là Where.', 'Đúng — What does ... do? hỏi làm nghề gì.']),
    Q('"Engineer" là nghề?', ['Kỹ sư', 'Đầu bếp', 'Cảnh sát', 'Bác sĩ'], 0, 'Engineer = kỹ sư.', ['Đúng — engineer là kỹ sư.', 'Sai — đầu bếp là cook/chef.', 'Sai — cảnh sát là police officer.', 'Sai — bác sĩ là doctor.']),
  ]),

  M(17, 'Review HK1 — Vocabulary', [
    Q('Chọn từ KHÁC nhóm:', ['green (xanh lá, là màu)', 'apple', 'red (đỏ, là màu)', 'blue (xanh dương, là màu)'], 1, 'Ba từ đầu là màu; apple là quả.', ['Sai — green là màu, cùng nhóm.', 'Đúng — apple là quả, khác nhóm với các màu.', 'Sai — red là màu, cùng nhóm.', 'Sai — blue là màu, cùng nhóm.']),
    Q('"My birthday is ___ April."', ['on (dùng với thứ/ngày, không dùng cho tháng)', 'in', 'at (dùng với giờ, không dùng cho tháng)', 'to (chỉ hướng, không dùng cho tháng)'], 1, 'Tháng dùng "in": in April.', ['Sai — on dùng cho thứ/ngày.', 'Đúng — tháng dùng in: in April.', 'Sai — at dùng cho giờ.', 'Sai — to chỉ hướng, không dùng cho tháng.']),
    Q('"She ___ play the piano." (có thể)', ['cans (sai, can không thêm s)', 'are (dùng cho they/you, không dùng cho she)', 'is (động từ to be, không phải động từ khuyết thiếu)', 'can'], 3, 'Can + V nguyên thể.', ['Sai — can không thêm -s.', 'Sai — are dùng cho they/you.', 'Sai — is là to be, không phải can.', 'Đúng — can + play (nguyên thể).']),
    Q('"What time ___ it?"', ['be (dạng nguyên thể, không chia ngôi)', 'is', 'are (dùng với you/we/they)', 'am (chỉ dùng với I)'], 1, 'It → is.', ['Sai — be là nguyên thể, phải chia ngôi.', 'Đúng — it đi với is.', 'Sai — are dùng với you/we/they.', 'Sai — am chỉ dùng với I.']),
    Q('Số nhiều của "child":', ['childies', 'childs', 'children', 'childes'], 2, 'Child → children (bất quy tắc).', ['Sai — không có dạng childies.', 'Sai — child không thêm -s.', 'Đúng — số nhiều bất quy tắc là children.', 'Sai — không thêm -es vào child.']),
    Q('Đáp: "How are you?"', ['I\'m nine', 'I\'m Lan', 'I\'m at home', 'I\'m fine, thank you'], 3, 'How are you? hỏi sức khoẻ.', ['Sai — đây là nói tuổi.', 'Sai — đây là nói tên.', 'Sai — đây là nói nơi chốn.', 'Đúng — How are you? đáp I\'m fine, thank you.']),
  ]),

  M(18, 'Review HK1 — Grammar', [
    Q('Chọn dạng đúng: "He ___ football every day."', ['plays', 'play (sai, He cần V-s)', 'played', 'playing'], 0, 'He + V-s (hiện tại đơn).', ['Đúng — He + plays (thêm -s).', 'Sai — He cần thêm -s vào play.', 'Sai — played là quá khứ, không hợp every day.', 'Sai — playing thiếu trợ động từ to be.']),
    Q('"I ___ a student."', ['are (dùng với you/we/they)', 'am', 'is (dùng với he/she/it)', 'be (dạng nguyên thể, không chia ngôi)'], 1, 'I + am.', ['Sai — are dùng với you/we/they.', 'Đúng — I đi với am.', 'Sai — is dùng với he/she/it.', 'Sai — be là nguyên thể, phải chia ngôi.']),
    Q('"They ___ in the park now." (đang chơi)', ['play (sai, có now nên phải tiếp diễn)', 'are playing', 'is playing', 'plays (sai, they không thêm s)'], 1, 'Hiện tại tiếp diễn: they are V-ing.', ['Sai — có now nên phải dùng tiếp diễn.', 'Đúng — they are playing (tiếp diễn).', 'Sai — they đi với are, không phải is.', 'Sai — they không thêm -s.']),
    Q('"___ you have a pen?"', ['Are (dùng với danh từ số nhiều, không dùng have)', 'Does (dùng với he/she/it)', 'Do', 'Is (dùng với danh từ số ít/he/she/it)'], 2, 'I/You/We/They → Do.', ['Sai — Are không đi với have theo cách này.', 'Sai — Does dùng với he/she/it.', 'Đúng — you đi với Do.', 'Sai — Is dùng với số ít/he/she/it.']),
    Q('"There ___ two books on the desk."', ['is (chỉ dùng với số ít)', 'be (dạng nguyên thể, không chia ngôi)', 'are', 'am (chỉ dùng với I)'], 2, 'Số nhiều → there are.', ['Sai — is chỉ dùng với số ít.', 'Sai — be là nguyên thể, phải chia ngôi.', 'Đúng — two books số nhiều nên there are.', 'Sai — am chỉ dùng với I.']),
    Q('Chọn câu đúng:', ['I don\'t like fish', 'I doesn\'t like fish', 'I not like fish', 'I don\'t likes fish'], 0, 'I + don\'t + V nguyên thể.', ['Đúng — I + don\'t + like (nguyên thể).', 'Sai — I dùng don\'t, không phải doesn\'t.', 'Sai — phải có trợ động từ don\'t.', 'Sai — sau don\'t dùng nguyên thể, không thêm -s.']),
  ]),

  // ──────────────── HK2 ────────────────
  M(19, 'My new clothes', [
    Q('"Shirt" có nghĩa là?', ['Áo sơ mi', 'Quần (trousers/pants)', 'Giày (shoes)', 'Mũ (hat)'], 0, 'Shirt = áo sơ mi.', ['Đúng — shirt là áo sơ mi.', 'Sai — quần là trousers.', 'Sai — giày là shoes.', 'Sai — mũ là hat.']),
    Q('"Trousers" có nghĩa là?', ['Áo (shirt)', 'Váy (skirt/dress)', 'Tất (socks)', 'Quần dài'], 3, 'Trousers = quần dài (luôn số nhiều).', ['Sai — áo là shirt.', 'Sai — váy là skirt/dress.', 'Sai — tất là socks.', 'Đúng — trousers là quần dài.']),
    Q('"She is wearing a ___ dress." (váy đỏ)', ['red', 'a red (thừa mạo từ, đã có a dress)', 'reds (tính từ không thêm s)', 'reding'], 0, 'Tính từ đứng trước danh từ.', ['Đúng — tính từ red đứng trước danh từ dress.', 'Sai — thừa mạo từ a vì đã có a dress.', 'Sai — tính từ không thêm -s.', 'Sai — không có dạng reding.']),
    Q('"Shoes" có nghĩa là?', ['Tất (socks)', 'Mũ (hat)', 'Giày', 'Găng tay'], 2, 'Shoes = (đôi) giày.', ['Sai — tất là socks.', 'Sai — mũ là hat.', 'Đúng — shoes là (đôi) giày.', 'Sai — găng tay là gloves.']),
    Q('"Wear" có nghĩa là?', ['Mặc/Đội/Đi (trang phục)', 'Cởi (take off)', 'Bán (sell)', 'Mua (buy)'], 0, 'Wear = mặc.', ['Đúng — wear là mặc/đội/đi trang phục.', 'Sai — cởi là take off.', 'Sai — bán là sell.', 'Sai — mua là buy.']),
    Q('"How much are these jeans?" — đáp:', ['Yes, I do', 'They are 200,000 dong', 'It is 100,000 dong', 'I like jeans'], 1, 'Jeans số nhiều → they are.', ['Sai — câu hỏi giá không trả lời Yes/No.', 'Đúng — jeans số nhiều nên They are.', 'Sai — jeans số nhiều, phải dùng They are.', 'Sai — đây là nói thích, không phải giá.']),
  ]),

  M(20, 'My house and rooms', [
    Q('"Kitchen" có nghĩa là?', ['Phòng khách', 'Bếp', 'Phòng tắm', 'Phòng ngủ'], 1, 'Kitchen = (phòng) bếp.', ['Sai — phòng khách là living room.', 'Đúng — kitchen là (phòng) bếp.', 'Sai — phòng tắm là bathroom.', 'Sai — phòng ngủ là bedroom.']),
    Q('"Bedroom" có nghĩa là?', ['Phòng học', 'Phòng tắm', 'Phòng ngủ', 'Phòng khách'], 2, 'Bed + room = phòng ngủ.', ['Sai — phòng học là study room.', 'Sai — phòng tắm là bathroom.', 'Đúng — bedroom là phòng ngủ.', 'Sai — phòng khách là living room.']),
    Q('"There is a sofa ___ the living room." (trong)', ['on (trên bề mặt, không phù hợp với phòng)', 'under (bên dưới, không phù hợp)', 'in', 'at (chỉ dùng với địa điểm điểm cụ thể)'], 2, 'Trong phòng dùng "in".', ['Sai — on là trên bề mặt, không hợp với phòng.', 'Sai — under là bên dưới, không phù hợp.', 'Đúng — trong phòng dùng in.', 'Sai — at dùng cho địa điểm cụ thể.']),
    Q('"Bathroom" có nghĩa là?', ['Phòng tắm', 'Ga ra (garage)', 'Sân vườn', 'Bếp/Nhà bếp (kitchen)'], 0, 'Bath + room = phòng tắm.', ['Đúng — bathroom là phòng tắm.', 'Sai — ga ra là garage.', 'Sai — sân vườn là garden/yard.', 'Sai — bếp là kitchen.']),
    Q('"My house has ___ rooms." (4 phòng)', ['a four', 'four', 'fourth', 'fours (số đếm không thêm s)'], 1, 'Số đếm + danh từ số nhiều: four rooms.', ['Sai — không thêm mạo từ a trước số đếm.', 'Đúng — four rooms (số đếm + danh từ số nhiều).', 'Sai — fourth là số thứ tự, không đếm.', 'Sai — số đếm không thêm -s.']),
    Q('"Garden" có nghĩa là?', ['Mái nhà', 'Tầng hầm', 'Ga ra (garage)', 'Vườn'], 3, 'Garden = vườn.', ['Sai — mái nhà là roof.', 'Sai — tầng hầm là basement.', 'Sai — ga ra là garage.', 'Đúng — garden là vườn.']),
  ]),

  M(21, 'My day — Daily routines', [
    Q('"I get up at 6 a.m." có nghĩa là?', ['Tôi học lúc 6 giờ', 'Tôi thức dậy lúc 6 giờ sáng', 'Tôi ăn lúc 6 giờ', 'Tôi đi ngủ lúc 6 giờ sáng'], 1, 'Get up = thức dậy.', ['Sai — học là study, không phải get up.', 'Đúng — get up là thức dậy lúc 6 giờ sáng.', 'Sai — ăn là eat/have, không phải get up.', 'Sai — đi ngủ là go to bed.']),
    Q('"Have breakfast" có nghĩa là?', ['Ăn trưa', 'Ăn tối', 'Uống nước', 'Ăn sáng'], 3, 'Breakfast = bữa sáng.', ['Sai — ăn trưa là have lunch.', 'Sai — ăn tối là have dinner.', 'Sai — uống nước là drink water.', 'Đúng — have breakfast là ăn sáng.']),
    Q('Chia: "She ___ to school at 7."', ['goes', 'going (cần thêm to be)', 'went (quá khứ, không hợp với at 7 thói quen)', 'go (sai vì She cần thêm -es)'], 0, 'She + goes.', ['Đúng — She + goes (thêm -es).', 'Sai — going thiếu trợ động từ to be.', 'Sai — went là quá khứ, không hợp thói quen.', 'Sai — She cần thêm -es vào go.']),
    Q('"Go to bed" có nghĩa là?', ['Đi ngủ', 'Đi chơi', 'Đi học', 'Đi ăn (go to eat)'], 0, 'Go to bed = đi ngủ.', ['Đúng — go to bed là đi ngủ.', 'Sai — đi chơi là go out/play.', 'Sai — đi học là go to school.', 'Sai — đi ăn là go to eat.']),
    Q('Sắp xếp đúng trong ngày:', ['get up – go to bed – have lunch', 'get up – have breakfast – go to school', 'go to bed – get up – have breakfast', 'have dinner – get up – go to school'], 1, 'Sáng: dậy → ăn sáng → đi học.', ['Sai — go to bed là buổi tối, không nằm giữa.', 'Đúng — dậy → ăn sáng → đi học.', 'Sai — phải dậy trước rồi mới đi ngủ.', 'Sai — ăn tối không đứng đầu buổi sáng.']),
    Q('"What time do you go to school?" — đáp:', ['Yes, I do', 'It is far', 'I go to school by bike', 'At 7 o\'clock'], 3, 'Hỏi giờ → at + giờ.', ['Sai — câu hỏi giờ không trả lời Yes/No.', 'Sai — đây là nói khoảng cách.', 'Sai — đây là nói phương tiện, không phải giờ.', 'Đúng — hỏi giờ thì đáp At 7 o\'clock.']),
  ]),

  M(22, 'School subjects', [
    Q('"Maths" có nghĩa là?', ['Tiếng Anh', 'Văn/Tiếng Việt (Vietnamese)', 'Mỹ thuật', 'Toán'], 3, 'Maths = Toán.', ['Sai — Tiếng Anh là English.', 'Sai — Tiếng Việt là Vietnamese.', 'Sai — Mỹ thuật là Art.', 'Đúng — Maths là môn Toán.']),
    Q('"Vietnamese" trong lớp học là?', ['Tiếng Việt', 'Lịch sử', 'Thể dục', 'Âm nhạc'], 0, 'Môn Tiếng Việt.', ['Đúng — Vietnamese là môn Tiếng Việt.', 'Sai — Lịch sử là History.', 'Sai — Thể dục là P.E.', 'Sai — Âm nhạc là Music.']),
    Q('"P.E." là viết tắt của?', ['Public Event', 'Personal English', 'Play English', 'Physical Education'], 3, 'P.E. = Physical Education = Thể dục.', ['Sai — đây không phải nghĩa của P.E.', 'Sai — P.E. không phải Personal English.', 'Sai — P.E. không phải Play English.', 'Đúng — P.E. là Physical Education (Thể dục).']),
    Q('"What\'s your favourite subject?" trả lời:', ['I\'m fine', 'Yes, I do', 'It\'s English', 'It\'s red'], 2, 'Subject = môn học; trả lời tên môn.', ['Sai — đây là trả lời How are you?', 'Sai — câu hỏi môn học không trả lời Yes/No.', 'Đúng — trả lời bằng tên môn: It\'s English.', 'Sai — đây là nói màu sắc.']),
    Q('"I have Music ___ Tuesday."', ['at (dùng với giờ)', 'in (dùng với tháng/năm)', 'on', 'to (chỉ hướng, không dùng cho thứ)'], 2, 'Thứ trong tuần dùng "on": on Tuesday.', ['Sai — at dùng với giờ.', 'Sai — in dùng với tháng/năm.', 'Đúng — thứ trong tuần dùng on: on Tuesday.', 'Sai — to chỉ hướng, không dùng cho thứ.']),
    Q('"Art" là môn?', ['Toán (Maths)', 'Khoa học', 'Lịch sử', 'Mỹ thuật'], 3, 'Art = (mỹ) thuật.', ['Sai — Toán là Maths.', 'Sai — Khoa học là Science.', 'Sai — Lịch sử là History.', 'Đúng — Art là môn Mỹ thuật.']),
  ]),

  M(23, 'School activities', [
    Q('"Have a music lesson" có nghĩa là?', ['Nghe nhạc', 'Mua nhạc', 'Có giờ âm nhạc', 'Đi chơi nhạc'], 2, 'Have a lesson = có giờ học.', ['Sai — nghe nhạc là listen to music.', 'Sai — mua nhạc không phải nghĩa này.', 'Đúng — have a music lesson là có giờ âm nhạc.', 'Sai — không có nghĩa đi chơi nhạc.']),
    Q('"Recess" / "break time" có nghĩa là?', ['Giờ ngủ', 'Giờ về', 'Giờ ra chơi', 'Giờ ăn tối'], 2, 'Recess = giờ ra chơi.', ['Sai — giờ ngủ là bedtime.', 'Sai — giờ về là home time.', 'Đúng — recess/break time là giờ ra chơi.', 'Sai — giờ ăn tối là dinner time.']),
    Q('"Do exercises" có nghĩa là?', ['Tập thể dục/làm bài tập', 'Đi học', 'Đi ngủ', 'Đi chơi'], 0, 'Do exercises = làm bài tập hoặc tập thể dục.', ['Đúng — do exercises là làm bài tập/tập thể dục.', 'Sai — đi học là go to school.', 'Sai — đi ngủ là go to bed.', 'Sai — đi chơi là go out/play.']),
    Q('"Read a story" có nghĩa là?', ['Đọc truyện', 'Viết truyện', 'Hát truyện', 'Vẽ truyện'], 0, 'Read a story = đọc truyện.', ['Đúng — read a story là đọc truyện.', 'Sai — viết là write.', 'Sai — hát là sing.', 'Sai — vẽ là draw.']),
    Q('Chia: "We ___ English on Mondays."', ['had (quá khứ, không hợp với on Mondays)', 'has (dùng cho he/she/it, không dùng với we)', 'have', 'having'], 2, 'We + have.', ['Sai — had là quá khứ, không hợp thói quen.', 'Sai — has dùng cho he/she/it, không dùng với we.', 'Đúng — We + have.', 'Sai — having thiếu trợ động từ to be.']),
    Q('"Sing a song" có nghĩa là?', ['Đọc thơ', 'Vẽ tranh', 'Hát một bài', 'Nhảy múa'], 2, 'Sing a song = hát một bài hát.', ['Sai — đọc thơ là read a poem.', 'Sai — vẽ tranh là draw.', 'Đúng — sing a song là hát một bài.', 'Sai — nhảy múa là dance.']),
  ]),

  M(24, 'My favourite subject', [
    Q('"Why do you like English?" hỏi gì?', ['Bạn thích Tiếng Anh khi nào?', 'Vì sao bạn thích Tiếng Anh?', 'Bạn học Tiếng Anh ở đâu?', 'Ai dạy bạn Tiếng Anh?'], 1, 'Why = tại sao.', ['Sai — hỏi khi nào là When.', 'Đúng — Why hỏi vì sao bạn thích.', 'Sai — hỏi ở đâu là Where.', 'Sai — hỏi ai là Who.']),
    Q('Trả lời "Why": dùng từ?', ['Where (hỏi ở đâu)', 'Because', 'When (hỏi khi nào)', 'Who (hỏi ai)'], 1, 'Because = bởi vì.', ['Sai — Where hỏi ở đâu.', 'Đúng — trả lời Why dùng Because.', 'Sai — When hỏi khi nào.', 'Sai — Who hỏi ai.']),
    Q('"It\'s ___" — môn dễ:', ['hard (khó, trái nghĩa với dễ)', 'boring', 'difficult', 'easy'], 3, 'Easy = dễ.', ['Sai — hard là khó, trái nghĩa với dễ.', 'Sai — boring là chán, không phải dễ.', 'Sai — difficult là khó.', 'Đúng — easy là dễ.']),
    Q('"Interesting" có nghĩa là?', ['Dễ (easy)', 'Khó (difficult)', 'Chán (boring)', 'Thú vị'], 3, 'Interesting = thú vị.', ['Sai — dễ là easy.', 'Sai — khó là difficult.', 'Sai — chán là boring.', 'Đúng — interesting là thú vị.']),
    Q('"Difficult" có nghĩa là?', ['Dễ (easy)', 'Khó', 'Buồn (sad)', 'Vui (happy)'], 1, 'Difficult = khó.', ['Sai — dễ là easy.', 'Đúng — difficult là khó.', 'Sai — buồn là sad.', 'Sai — vui là happy.']),
    Q('"How many subjects do you have?" hỏi gì?', ['Bao nhiêu môn?', 'Mấy giờ học?', 'Môn gì?', 'Học ở đâu?'], 0, 'How many = bao nhiêu (đếm được).', ['Đúng — How many hỏi bao nhiêu môn.', 'Sai — hỏi giờ là What time.', 'Sai — hỏi môn gì là What subject.', 'Sai — hỏi ở đâu là Where.']),
  ]),

  M(25, 'Where were you yesterday?', [
    Q('"Yesterday" có nghĩa là?', ['Tuần trước', 'Hôm qua', 'Hôm nay', 'Ngày mai'], 1, 'Yesterday = hôm qua.', ['Sai — tuần trước là last week.', 'Đúng — yesterday là hôm qua.', 'Sai — hôm nay là today.', 'Sai — ngày mai là tomorrow.']),
    Q('"Where were you yesterday?" — đáp:', ['I was at the zoo', 'I am at home', 'I go to school', 'I will be home'], 0, 'Quá khứ của "am/is" là "was".', ['Đúng — yesterday cần quá khứ: I was at the zoo.', 'Sai — am là hiện tại, không hợp yesterday.', 'Sai — go là hiện tại, không hợp yesterday.', 'Sai — will be là tương lai, không hợp yesterday.']),
    Q('"They ___ at school yesterday."', ['is (hiện tại, số ít)', 'was (quá khứ số ít)', 'were', 'are (hiện tại số nhiều)'], 2, 'They → were.', ['Sai — is là hiện tại số ít.', 'Sai — was là quá khứ số ít, không dùng với they.', 'Đúng — they đi với were (quá khứ).', 'Sai — are là hiện tại, không hợp yesterday.']),
    Q('"Last week" có nghĩa là?', ['Tuần trước', 'Tuần này', 'Hôm qua', 'Tuần sau'], 0, 'Last week = tuần trước.', ['Đúng — last week là tuần trước.', 'Sai — tuần này là this week.', 'Sai — hôm qua là yesterday.', 'Sai — tuần sau là next week.']),
    Q('Chia: "She ___ tired yesterday."', ['were (dùng với you/we/they)', 'was', 'are (hiện tại, không dùng với yesterday)', 'is (hiện tại, không dùng với yesterday)'], 1, 'She + was (quá khứ).', ['Sai — were dùng với you/we/they.', 'Đúng — She + was (quá khứ số ít).', 'Sai — are là hiện tại, không hợp yesterday.', 'Sai — is là hiện tại, không hợp yesterday.']),
    Q('Câu hỏi đúng:', ['You were where yesterday?', 'Where was you yesterday?', 'Where were you yesterday?', 'Where you were yesterday?'], 2, 'Cấu trúc: Wh- + was/were + chủ ngữ?', ['Sai — từ để hỏi where phải đứng đầu.', 'Sai — you đi với were, không phải was.', 'Đúng — Where were you yesterday? đúng cấu trúc.', 'Sai — were phải đứng trước chủ ngữ you.']),
  ]),

  M(26, 'What did you do? — Past simple (1)', [
    Q('"What did you do yesterday?" hỏi gì?', ['Hôm nay bạn làm gì?', 'Ngày mai bạn làm gì?', 'Bạn đang làm gì?', 'Hôm qua bạn làm gì?'], 3, 'Did + V → quá khứ.', ['Sai — hôm nay là today, không phải yesterday.', 'Sai — ngày mai là tomorrow.', 'Sai — đang làm gì là tiếp diễn, không phải did.', 'Đúng — did + V hỏi hôm qua bạn làm gì.']),
    Q('Quá khứ của "play" là?', ['plays (hiện tại ngôi 3 số ít)', 'played', 'playing', 'play (nguyên thể, không phải quá khứ)'], 1, 'Động từ thường thêm -ed: played.', ['Sai — plays là hiện tại ngôi 3 số ít.', 'Đúng — quá khứ thêm -ed: played.', 'Sai — playing là V-ing.', 'Sai — play là nguyên thể, không phải quá khứ.']),
    Q('Quá khứ của "go" là?', ['went', 'going (V-ing, không phải quá khứ)', 'gone (quá khứ phân từ, không phải V2)', 'goed (sai vì go bất quy tắc)'], 0, 'Go → went (bất quy tắc).', ['Đúng — go → went (bất quy tắc).', 'Sai — going là V-ing.', 'Sai — gone là quá khứ phân từ, không phải V2.', 'Sai — go bất quy tắc nên không thêm -ed.']),
    Q('"I ___ football yesterday."', ['playing', 'plays (hiện tại ngôi 3 số ít)', 'play (nguyên thể, không hợp yesterday)', 'played'], 3, 'Yesterday → quá khứ → played.', ['Sai — playing thiếu trợ động từ to be.', 'Sai — plays là hiện tại ngôi 3 số ít.', 'Sai — play là nguyên thể, không hợp yesterday.', 'Đúng — yesterday cần quá khứ: played.']),
    Q('Sau "did" + chủ ngữ, động từ ở dạng?', ['quá khứ', 'nguyên thể', 'V-s (ngôi 3 số ít)', 'V-ing (tiếp diễn)'], 1, 'Did + V nguyên thể: Did you play?', ['Sai — đã có did nên động từ về nguyên thể.', 'Đúng — did + V nguyên thể: Did you play?', 'Sai — sau did không thêm -s.', 'Sai — sau did không dùng V-ing.']),
    Q('"Did you watch TV?" — đáp khẳng định:', ['Yes, I do', 'Yes, I did', 'Yes, I am', 'Yes, I was'], 1, 'Yes, I did / No, I didn\'t.', ['Sai — câu hỏi Did thì đáp did, không phải do.', 'Đúng — Did hỏi thì đáp Yes, I did.', 'Sai — không đáp bằng am cho câu hỏi Did.', 'Sai — không đáp bằng was cho câu hỏi Did.']),
  ]),

  M(27, 'Past simple (2) — Irregular verbs', [
    Q('Quá khứ của "have" là?', ['has (hiện tại ngôi 3 số ít)', 'having', 'haved (sai vì have bất quy tắc)', 'had'], 3, 'Have → had.', ['Sai — has là hiện tại ngôi 3 số ít.', 'Sai — having là V-ing.', 'Sai — have bất quy tắc nên không thêm -ed.', 'Đúng — have → had.']),
    Q('Quá khứ của "eat" là?', ['ate', 'eated (sai vì eat bất quy tắc)', 'eaten (quá khứ phân từ, không phải V2)', 'eat (nguyên thể)'], 0, 'Eat → ate.', ['Đúng — eat → ate.', 'Sai — eat bất quy tắc nên không thêm -ed.', 'Sai — eaten là quá khứ phân từ, không phải V2.', 'Sai — eat là nguyên thể.']),
    Q('Quá khứ của "see" là?', ['sees (hiện tại ngôi 3 số ít)', 'seen (quá khứ phân từ, không phải V2)', 'seed (sai vì see bất quy tắc)', 'saw'], 3, 'See → saw.', ['Sai — sees là hiện tại ngôi 3 số ít.', 'Sai — seen là quá khứ phân từ, không phải V2.', 'Sai — see bất quy tắc nên không thêm -ed.', 'Đúng — see → saw.']),
    Q('"He ___ to Hanoi last summer."', ['go (nguyên thể, không hợp last summer)', 'went', 'goes (hiện tại ngôi 3 số ít)', 'gone (quá khứ phân từ, không phải V2)'], 1, 'Last summer → went.', ['Sai — go là nguyên thể, không hợp last summer.', 'Đúng — last summer cần quá khứ: went.', 'Sai — goes là hiện tại ngôi 3 số ít.', 'Sai — gone là quá khứ phân từ, không phải V2.']),
    Q('"I ___ a new book yesterday." (đọc)', ['reads (hiện tại ngôi 3 số ít)', 'reading', 'readed', 'read'], 3, 'Read quá khứ giữ nguyên hình thức (phát âm khác).', ['Sai — reads là hiện tại ngôi 3 số ít.', 'Sai — reading là V-ing.', 'Sai — read bất quy tắc nên không thêm -ed.', 'Đúng — quá khứ của read viết giữ nguyên (đọc khác).']),
    Q('Câu phủ định: "She ___ go to school."', ['wasn\'t', 'didn\'t', 'don\'t (hiện tại, không dùng cho she/quá khứ)', 'doesn\'t'], 1, 'Quá khứ phủ định: didn\'t + V.', ['Sai — wasn\'t đi với tính từ/danh từ, không đi với động từ thường.', 'Đúng — quá khứ phủ định: didn\'t + V.', 'Sai — don\'t là hiện tại, không dùng cho she.', 'Sai — doesn\'t là hiện tại, không phải quá khứ.']),
  ]),

  M(28, 'My summer holiday', [
    Q('"Summer holiday" có nghĩa là?', ['Nghỉ đông', 'Kì nghỉ hè', 'Nghỉ Tết', 'Nghỉ cuối tuần'], 1, 'Summer = hè; holiday = kì nghỉ.', ['Sai — nghỉ đông là winter holiday.', 'Đúng — summer holiday là kì nghỉ hè.', 'Sai — nghỉ Tết là Tet holiday.', 'Sai — nghỉ cuối tuần là weekend.']),
    Q('"I went to the ___." (bãi biển)', ['beech (cây sồi, không phải bãi biển)', 'beach', 'bean (hạt đậu)', 'bench (ghế dài)'], 1, 'Beach = bãi biển.', ['Sai — beech là cây sồi, không phải bãi biển.', 'Đúng — beach là bãi biển.', 'Sai — bean là hạt đậu.', 'Sai — bench là ghế dài.']),
    Q('"Visit my grandparents" có nghĩa là?', ['Tặng quà ông bà', 'Thăm ông bà', 'Gọi điện ông bà', 'Tạm biệt ông bà'], 1, 'Visit = thăm.', ['Sai — tặng quà là give a present.', 'Đúng — visit là thăm ông bà.', 'Sai — gọi điện là call/phone.', 'Sai — tạm biệt là say goodbye.']),
    Q('Quá khứ của "swim":', ['swimmed', 'swam', 'swims (hiện tại ngôi 3 số ít)', 'swum (quá khứ phân từ, không phải V2)'], 1, 'Swim → swam.', ['Sai — swim bất quy tắc nên không thêm -ed.', 'Đúng — swim → swam.', 'Sai — swims là hiện tại ngôi 3 số ít.', 'Sai — swum là quá khứ phân từ, không phải V2.']),
    Q('"Where did you go last summer?" — đáp:', ['I go now', 'I went to Da Nang', 'I am at home', 'I will go'], 1, 'Quá khứ: went.', ['Sai — go là hiện tại, không hợp last summer.', 'Đúng — last summer cần quá khứ: I went to Da Nang.', 'Sai — am là hiện tại, không hợp quá khứ.', 'Sai — will go là tương lai, không hợp last summer.']),
    Q('"It was great fun!" có nghĩa là?', ['Thật vui', 'Rất chán', 'Bình thường', 'Hơi mệt'], 0, 'Great fun = rất vui.', ['Đúng — great fun là rất vui.', 'Sai — rất chán là very boring.', 'Sai — bình thường là normal.', 'Sai — hơi mệt là a bit tired.']),
  ]),

  M(29, 'Future plans — be going to', [
    Q('"I am going to ___ Da Lat next week." (đi/đi thăm)', ['visits', 'visited', 'visiting', 'visit'], 3, 'Be going to + V nguyên thể.', ['Sai — sau going to không thêm -s.', 'Sai — visited là quá khứ, không hợp dự định.', 'Sai — sau going to dùng nguyên thể, không V-ing.', 'Đúng — be going to + visit (nguyên thể).']),
    Q('"Tomorrow" có nghĩa là?', ['Ngày mai', 'Tuần sau', 'Hôm nay', 'Hôm qua'], 0, 'Tomorrow = ngày mai.', ['Đúng — tomorrow là ngày mai.', 'Sai — tuần sau là next week.', 'Sai — hôm nay là today.', 'Sai — hôm qua là yesterday.']),
    Q('"What are you going to do tomorrow?" hỏi gì?', ['Hôm nay làm gì?', 'Bạn thích gì?', 'Hôm qua làm gì?', 'Mai bạn dự định làm gì?'], 3, 'Be going to V = dự định.', ['Sai — câu này hỏi tomorrow, không phải today.', 'Sai — hỏi thích là What do you like?', 'Sai — hỏi quá khứ là What did you do?', 'Đúng — going to hỏi mai bạn dự định làm gì.']),
    Q('"Next weekend" có nghĩa là?', ['Đầu tuần', 'Cuối tuần trước', 'Hằng tuần', 'Cuối tuần này (tới)'], 3, 'Next weekend = cuối tuần tới.', ['Sai — đầu tuần là beginning of the week.', 'Sai — cuối tuần trước là last weekend.', 'Sai — hằng tuần là every weekend.', 'Đúng — next weekend là cuối tuần tới.']),
    Q('Chọn câu đúng:', ['She is go to swim', 'She is going to swim', 'She is going to swims', 'She going to swim'], 1, 'Be + going to + V nguyên thể.', ['Sai — phải là going to, không phải go to.', 'Đúng — She is going to swim.', 'Sai — sau going to không thêm -s.', 'Sai — thiếu động từ to be is.']),
    Q('"I\'m going to be a teacher" có nghĩa là?', ['Tôi từng là giáo viên', 'Tôi không thích giáo viên', 'Tôi sẽ trở thành giáo viên', 'Tôi đang là giáo viên'], 2, 'Be going to = dự định/tương lai.', ['Sai — từng là là quá khứ, không phải going to.', 'Sai — đây không phải nghĩa không thích.', 'Đúng — going to be là sẽ trở thành.', 'Sai — đang là là hiện tại, không phải going to.']),
  ]),

  M(30, 'Means of transport', [
    Q('"By bike" có nghĩa là?', ['Bằng máy bay', 'Bằng xe đạp', 'Bằng tàu', 'Đi bộ (on foot/walking)'], 1, 'By bike = bằng xe đạp.', ['Sai — bằng máy bay là by plane.', 'Đúng — by bike là bằng xe đạp.', 'Sai — bằng tàu là by train.', 'Sai — đi bộ là on foot.']),
    Q('"How do you go to school?" — đáp:', ['Yes, I do', 'I go to school by bus', 'I am at school', 'I go to school'], 1, 'How → phương tiện: by bus.', ['Sai — câu hỏi How không trả lời Yes/No.', 'Đúng — How hỏi phương tiện: by bus.', 'Sai — đây là nói nơi chốn, không phải phương tiện.', 'Sai — còn thiếu phương tiện.']),
    Q('"On foot" có nghĩa là?', ['Đi máy bay', 'Đi tàu', 'Bằng xe', 'Đi bộ'], 3, 'On foot = đi bộ (không dùng by foot).', ['Sai — đi máy bay là by plane.', 'Sai — đi tàu là by train.', 'Sai — bằng xe là by car.', 'Đúng — on foot là đi bộ.']),
    Q('"Plane" có nghĩa là?', ['Tàu hoả', 'Tàu thuỷ', 'Xe buýt', 'Máy bay'], 3, 'Plane = máy bay.', ['Sai — tàu hoả là train.', 'Sai — tàu thuỷ là ship/boat.', 'Sai — xe buýt là bus.', 'Đúng — plane là máy bay.']),
    Q('"Train" có nghĩa là?', ['Xe đạp', 'Xe máy', 'Ô tô (car)', 'Tàu hoả'], 3, 'Train = tàu hoả.', ['Sai — xe đạp là bike.', 'Sai — xe máy là motorbike.', 'Sai — ô tô là car.', 'Đúng — train là tàu hoả.']),
    Q('Chọn câu đúng:', ['I go to school by bus', 'I go to school with bus', 'I go to school on bus', 'I go to school in bus'], 0, 'Phương tiện: by + bus.', ['Đúng — phương tiện dùng by: by bus.', 'Sai — không dùng with cho phương tiện.', 'Sai — không dùng on bus theo cách này.', 'Sai — không dùng in bus theo cách này.']),
  ]),

  M(31, 'Articles a / an / the', [
    Q('"___ apple a day…" — chỗ trống là?', ['An', 'The (chỉ dùng cho vật xác định)', '∅ (không mạo từ, sai vì apple đếm được số ít)', 'A (chỉ dùng trước phụ âm)'], 0, 'Apple bắt đầu nguyên âm → an.', ['Đúng — apple bắt đầu nguyên âm nên dùng An.', 'Sai — The chỉ dùng cho vật xác định.', 'Sai — apple đếm được số ít, cần mạo từ.', 'Sai — A dùng trước phụ âm.']),
    Q('"I have ___ dog. ___ dog is white."', ['a / A (lần nhắc lại phải dùng The)', 'a / The', 'an / A', 'the / A'], 1, 'Lần đầu: a; nhắc lại: the.', ['Sai — lần nhắc lại phải dùng The, không phải A.', 'Đúng — lần đầu a, nhắc lại The.', 'Sai — dog bắt đầu phụ âm, dùng a không phải an.', 'Sai — lần đầu nhắc đến dùng a, không phải the.']),
    Q('Khi nào dùng "the"?', ['Bất kỳ danh từ số nhiều', 'Vật xác định/đã nhắc rồi', 'Tên người', 'Lần đầu nhắc đến'], 1, 'The dùng cho danh từ xác định.', ['Sai — không phải mọi danh từ số nhiều đều cần the.', 'Đúng — the dùng cho vật xác định/đã nhắc rồi.', 'Sai — tên người thường không dùng the.', 'Sai — lần đầu nhắc đến thường dùng a/an.']),
    Q('"He is ___ honest boy."', ['the (chỉ dùng cho vật xác định)', '∅ (không mạo từ, sai vì boy đếm được số ít)', 'an', 'a (chỉ dùng trước phụ âm phát âm)'], 2, 'Honest đọc /ˈɒn.ɪst/ — âm /o/ → an honest.', ['Sai — the chỉ dùng cho vật xác định.', 'Sai — boy đếm được số ít, cần mạo từ.', 'Đúng — honest đọc bắt đầu âm /o/ nên dùng an.', 'Sai — honest có chữ h câm, đọc như nguyên âm.']),
    Q('"I play ___ piano every day."', ['the', '∅ (không mạo từ, sai vì nhạc cụ cần the)', 'an (chỉ dùng trước nguyên âm)', 'a (chỉ dùng cho lần đầu nhắc đến)'], 0, 'Nhạc cụ chơi: the + nhạc cụ.', ['Đúng — chơi nhạc cụ dùng the: the piano.', 'Sai — nhạc cụ cần the, không bỏ trống.', 'Sai — an dùng trước nguyên âm.', 'Sai — với nhạc cụ dùng the, không phải a.']),
    Q('"I have ___ orange juice."', ['a (chỉ dùng với danh từ đếm được)', 'an (chỉ dùng với danh từ đếm được số ít)', '∅', 'the (chỉ vật xác định)'], 2, 'Danh từ không đếm được, không xác định → không mạo từ (hoặc some).', ['Sai — a dùng với danh từ đếm được.', 'Sai — an dùng với danh từ đếm được số ít.', 'Đúng — juice không đếm được, không xác định nên bỏ trống.', 'Sai — the chỉ dùng cho vật xác định.']),
  ]),

  M(32, 'Present continuous', [
    Q('Cấu trúc hiện tại tiếp diễn:', ['S + V-s', 'S + am/is/are + V-ing', 'S + will + V', 'S + V-ed'], 1, 'S + be + V-ing.', ['Sai — S + V-s là hiện tại đơn.', 'Đúng — S + am/is/are + V-ing là tiếp diễn.', 'Sai — S + will + V là tương lai.', 'Sai — S + V-ed là quá khứ.']),
    Q('"She ___ a book now."', ['read (nguyên thể, không phù hợp now)', 'is reading', 'reading', 'reads (hiện tại ngôi 3 số ít, không hợp now)'], 1, 'Now → tiếp diễn → is reading.', ['Sai — nguyên thể không hợp với now.', 'Đúng — now nên dùng tiếp diễn: is reading.', 'Sai — reading thiếu trợ động từ to be.', 'Sai — reads là hiện tại đơn, không hợp now.']),
    Q('Dấu hiệu tiếp diễn:', ['now / at the moment', 'every day', 'last week', 'yesterday'], 0, 'Now, at the moment, look! ...', ['Đúng — now/at the moment là dấu hiệu tiếp diễn.', 'Sai — every day là dấu hiệu hiện tại đơn.', 'Sai — last week là dấu hiệu quá khứ.', 'Sai — yesterday là dấu hiệu quá khứ.']),
    Q('"They ___ football in the yard."', ['play (thiếu trợ động từ to be)', 'plays (dùng cho he/she/it)', 'played', 'are playing'], 3, 'They + are + V-ing.', ['Sai — thiếu trợ động từ to be.', 'Sai — plays dùng cho he/she/it.', 'Sai — played là quá khứ.', 'Đúng — They + are playing (tiếp diễn).']),
    Q('Chọn câu SAI:', ['We are studying', 'I am eating lunch', 'She are running', 'He is sleeping'], 2, 'She + IS, không phải are.', ['Sai — We are studying đúng ngữ pháp.', 'Sai — I am eating lunch đúng ngữ pháp.', 'Đúng — đây là câu SAI vì She phải đi với is.', 'Sai — He is sleeping đúng ngữ pháp.']),
    Q('Phủ định: "He ___ watching TV now."', ['don\'t (dùng cho hiện tại đơn, không có V-ing)', 'aren\'t', 'doesn\'t', 'isn\'t'], 3, 'He + isn\'t + V-ing.', ['Sai — don\'t là hiện tại đơn, không đi với V-ing.', 'Sai — aren\'t dùng với you/we/they.', 'Sai — doesn\'t là hiện tại đơn, không có V-ing.', 'Đúng — He + isn\'t + V-ing.']),
  ]),

  M(33, 'Comparing present simple vs continuous', [
    Q('"I ___ to school every day."', ['went (quá khứ, không hợp every day)', 'goes (dùng cho he/she/it, không dùng với I)', 'am going', 'go'], 3, 'Every day → hiện tại đơn → go.', ['Sai — went là quá khứ, không hợp every day.', 'Sai — goes dùng cho he/she/it, không dùng với I.', 'Sai — am going là tiếp diễn, không hợp every day.', 'Đúng — every day là thói quen nên dùng go.']),
    Q('"Look! The baby ___."', ['cries (hiện tại đơn, không hợp Look!)', 'cried (quá khứ, không hợp Look!)', 'cry (nguyên thể, không hợp Look!)', 'is crying'], 3, 'Look! → đang diễn ra → is crying.', ['Sai — cries là hiện tại đơn, không hợp Look!', 'Sai — cried là quá khứ, không hợp Look!', 'Sai — cry là nguyên thể, không hợp Look!', 'Đúng — Look! báo đang diễn ra: is crying.']),
    Q('"She always ___ early."', ['got up', 'getting up', 'is getting up', 'gets up'], 3, 'Always → hiện tại đơn.', ['Sai — got up là quá khứ, không hợp always.', 'Sai — getting up thiếu trợ động từ to be.', 'Sai — is getting up là tiếp diễn, không hợp always.', 'Đúng — always là thói quen: gets up.']),
    Q('"They ___ in the park now."', ['run (nguyên thể, không hợp now)', 'ran (quá khứ, không hợp now)', 'are running', 'runs (hiện tại đơn, không hợp now)'], 2, 'Now → tiếp diễn.', ['Sai — run nguyên thể không hợp now.', 'Sai — ran là quá khứ, không hợp now.', 'Đúng — now nên dùng tiếp diễn: are running.', 'Sai — runs là hiện tại đơn, không hợp now.']),
    Q('"He ___ English on Mondays."', ['learns', 'is learning', 'learn (sai vì He cần thêm -s)', 'learning'], 0, 'On Mondays → thói quen → learns.', ['Đúng — on Mondays là thói quen: He learns.', 'Sai — is learning là tiếp diễn, không hợp thói quen.', 'Sai — He cần thêm -s vào learn.', 'Sai — learning thiếu trợ động từ to be.']),
    Q('"Listen! She ___ a song."', ['sing (nguyên thể, không hợp Listen!)', 'is singing', 'sings (hiện tại đơn, không hợp Listen!)', 'sang (quá khứ, không hợp Listen!)'], 1, 'Listen! → đang diễn ra → is singing.', ['Sai — sing nguyên thể không hợp Listen!', 'Đúng — Listen! báo đang diễn ra: is singing.', 'Sai — sings là hiện tại đơn, không hợp Listen!', 'Sai — sang là quá khứ, không hợp Listen!']),
  ]),

  M(34, 'Review HK2 — Vocabulary & Reading', [
    Q('Chọn từ KHÁC nhóm:', ['summer', 'spring', 'Monday', 'winter'], 2, 'Ba từ đầu là mùa; Monday là thứ.', ['Sai — summer là mùa, cùng nhóm.', 'Sai — spring là mùa, cùng nhóm.', 'Đúng — Monday là thứ, khác nhóm với các mùa.', 'Sai — winter là mùa, cùng nhóm.']),
    Q('"I went to the beach ___ summer." (vào)', ['on (dùng với thứ/ngày)', 'at (dùng với giờ)', 'in', 'to (chỉ hướng, không dùng cho mùa)'], 2, 'Mùa dùng "in": in summer.', ['Sai — on dùng với thứ/ngày.', 'Sai — at dùng với giờ.', 'Đúng — mùa dùng in: in summer.', 'Sai — to chỉ hướng, không dùng cho mùa.']),
    Q('Đọc: "Nam is going to visit Hue next week." Nam sẽ?', ['Không đi Huế', 'Đã đi Huế', 'Đang ở Huế', 'Sẽ đi Huế'], 3, 'Be going to → dự định tương lai.', ['Sai — going to nghĩa là sẽ đi, không phải không đi.', 'Sai — đã đi là quá khứ, đây là dự định.', 'Sai — đang ở là tiếp diễn, đây là dự định.', 'Đúng — going to là dự định: Nam sẽ đi Huế.']),
    Q('"Travel" có nghĩa là?', ['Ăn uống', 'Du lịch/Đi lại', 'Học (study)', 'Ngủ (sleep)'], 1, 'Travel = du lịch.', ['Sai — ăn uống là eat and drink.', 'Đúng — travel là du lịch/đi lại.', 'Sai — học là study.', 'Sai — ngủ là sleep.']),
    Q('Đối lập với "hot" là?', ['sunny (có nắng, gần nghĩa hot)', 'cold', 'cool (mát, không phải đối lập hot)', 'warm (ấm, gần nghĩa hot)'], 1, 'Hot ↔ cold.', ['Sai — sunny gần nghĩa hot, không đối lập.', 'Đúng — hot trái nghĩa với cold.', 'Sai — cool là mát, không hẳn đối lập hot.', 'Sai — warm là ấm, gần nghĩa hot.']),
    Q('"My favourite season is ___" — câu đúng:', ['a spring', 'the spring', 'on spring', 'spring'], 3, 'Trả lời ngắn gọn bằng tên mùa.', ['Sai — không thêm mạo từ a trước mùa.', 'Sai — không thêm the trước tên mùa ở đây.', 'Sai — không thêm on trước mùa.', 'Đúng — trả lời ngắn gọn bằng tên mùa: spring.']),
  ]),

  M(35, 'Review HK2 — Grammar mix', [
    Q('"They ___ to the zoo last Sunday."', ['go (nguyên thể, không hợp last Sunday)', 'goes (hiện tại ngôi 3 số ít)', 'are going', 'went'], 3, 'Last Sunday → went.', ['Sai — go nguyên thể không hợp last Sunday.', 'Sai — goes là hiện tại ngôi 3 số ít.', 'Sai — are going là tiếp diễn/dự định, không hợp last Sunday.', 'Đúng — last Sunday cần quá khứ: went.']),
    Q('"What ___ you do tomorrow?" (dự định)', ['are going to', 'do (hiện tại đơn, không chỉ dự định)', 'did (quá khứ, không hợp tomorrow)', 'were (quá khứ, không hợp tomorrow)'], 0, 'Tomorrow + dự định → are going to.', ['Đúng — tomorrow + dự định dùng are going to.', 'Sai — do là hiện tại đơn, không chỉ dự định.', 'Sai — did là quá khứ, không hợp tomorrow.', 'Sai — were là quá khứ, không hợp tomorrow.']),
    Q('"She ___ piano very well."', ['can plays', 'cans play', 'is can play', 'can play'], 3, 'Can + V nguyên thể.', ['Sai — sau can không thêm -s vào play.', 'Sai — can không thêm -s.', 'Sai — không dùng is đứng cùng can.', 'Đúng — can + play (nguyên thể).']),
    Q('"I ___ a sandwich now."', ['ate (quá khứ, không hợp now)', 'eats (hiện tại ngôi 3 số ít)', 'am eating', 'eat (nguyên thể, không hợp now)'], 2, 'Now → tiếp diễn → am eating.', ['Sai — ate là quá khứ, không hợp now.', 'Sai — eats là ngôi 3 số ít, không dùng với I.', 'Đúng — now nên dùng tiếp diễn: am eating.', 'Sai — eat nguyên thể không hợp now.']),
    Q('Đáp: "Did you go out yesterday?"', ['Yes, I did', 'Yes, I do', 'Yes, I was', 'Yes, I am'], 0, 'Did → Yes, I did / No, I didn\'t.', ['Đúng — Did hỏi thì đáp Yes, I did.', 'Sai — câu hỏi Did không đáp bằng do.', 'Sai — câu hỏi Did không đáp bằng was.', 'Sai — câu hỏi Did không đáp bằng am.']),
    Q('"There ___ many students in my class."', ['is (dùng với danh từ số ít)', 'are', 'be (dạng nguyên thể, không chia ngôi)', 'am (chỉ dùng với I)'], 1, 'Students số nhiều → are.', ['Sai — is dùng với danh từ số ít.', 'Đúng — students số nhiều nên there are.', 'Sai — be là nguyên thể, phải chia ngôi.', 'Sai — am chỉ dùng với I.']),
  ]),

  M(36, 'End of Grade 4 — Review and Grade 5 Preview', [
    Q('Chọn câu ĐÚNG diễn tả dự định: (she / visit / grandma / next week)', ['She going to visit her grandma next week.', 'She is going to visit her grandma next week.', 'She is go to visit her grandma next week.', 'She will going to visit her grandma next week.'], 1, 'Cấu trúc dự định: be + going to + V nguyên thể.', ['Sai — thiếu động từ be (is) trước going to.', 'Đúng — is going to + visit (nguyên thể).', 'Sai — sau going to phải là to + V, không phải is go to.', 'Sai — không dùng will cùng going to.']),
    Q('"Mount Everest is ___ mountain in the world."', ['the highest', 'higher', 'high', 'more high'], 0, 'So sánh nhất của tính từ ngắn: the + adj-est.', ['Đúng — so sánh nhất của high là the highest.', 'Sai — higher là so sánh hơn, cần thêm than.', 'Sai — high là dạng nguyên, không so sánh.', 'Sai — high là tính từ ngắn nên dùng highest, không dùng more high.']),
    Q('Dạng quá khứ (V2) của "go" là?', ['goed', 'gone', 'went', 'going'], 2, 'go — went — gone; V2 là went.', ['Sai — go là động từ bất quy tắc, không thêm -ed.', 'Sai — gone là V3 (quá khứ phân từ), dùng với have/has.', 'Đúng — quá khứ đơn của go là went.', 'Sai — going là dạng V-ing.']),
    Q('Modal verb nào diễn tả KHẢ NĂNG (ability)?', ['must', 'can', 'should', 'may'], 1, 'Can diễn tả khả năng: I can swim.', ['Sai — must chỉ sự bắt buộc.', 'Đúng — can diễn tả khả năng làm được việc gì.', 'Sai — should là lời khuyên.', 'Sai — may xin phép hoặc chỉ khả năng có thể xảy ra.']),
    Q('"___ books do you have?" — điền từ hỏi đúng.', ['How much', 'How long', 'How many', 'How often'], 2, 'Books là danh từ đếm được số nhiều nên dùng How many.', ['Sai — How much dùng cho danh từ không đếm được (water, money).', 'Sai — How long hỏi độ dài hoặc thời gian.', 'Đúng — books đếm được số nhiều nên dùng How many.', 'Sai — How often hỏi mức độ thường xuyên.']),
    Q('Ở Lớp 5 em sẽ học thì mới nào?', ['Present perfect (have/has + V3)', 'Simple present', 'Simple past', 'Present continuous'], 0, 'Lớp 5 giới thiệu present perfect và future simple.', ['Đúng — present perfect (have/has + V3) là thì mới của Lớp 5.', 'Sai — simple present em đã học ở Lớp 4.', 'Sai — simple past em đã học ở Lớp 4.', 'Sai — present continuous em đã học ở Lớp 4.']),
  ], { difficulty: 3, description: 'Review Grade 4 vocabulary and grammar, then preview what comes in Grade 5.' }),
];

export const P4TA_SCENARIOS = indexBy(P4TA_WEEKS);
