// ============================================================
// Lớp 3 · TIẾNG ANH — 35 tuần (HK1: 1–18 · HK2: 19–35)
// Bám SGK GDPT 2018 (bắt buộc từ lớp 3): Global Success / Family & Friends 3
// / iLearn Smart Start 3. Mở rộng vốn từ và mẫu câu so với lớp 2.
// ID prefix: "P3TA-wNN-quiz".
// ============================================================
import { Q, W, indexBy } from './_helper.js';

const M = (n, title, qs, opts) => W('P3TA', 'tieng-anh', n, title, qs, opts);

export const P3TA_WEEKS = [
  // ──────────────── HK1 ────────────────
  M(1, 'Greetings & Introductions', [
    Q('Câu chào buổi sáng: "Good ___"', ['evening (buổi tối)', 'afternoon (buổi chiều)', 'morning', 'day (ngày)'], 2, 'Good morning = Chào buổi sáng.', ['Sai — evening là buổi tối, không phải buổi sáng.', 'Sai — afternoon là buổi chiều.', 'Đúng — Good morning = Chào buổi sáng.', 'Sai — Good day ít dùng để chào buổi sáng.']),
    Q('"Nice to meet you." nghĩa là?', ['Cảm ơn bạn', 'Tạm biệt', 'Hẹn gặp lại', 'Rất vui được gặp bạn'], 3, 'Nice to meet you = Rất vui được gặp bạn (lần đầu gặp).', ['Sai — cảm ơn là Thank you.', 'Sai — tạm biệt là Goodbye.', 'Sai — hẹn gặp lại là See you.', 'Đúng — Nice to meet you = Rất vui được gặp bạn.']),
    Q('Đáp lại "Nice to meet you." em nói?', ['Nice to meet you, too', 'Goodbye', 'You are welcome', 'Hello, how are you?'], 0, 'Đáp lại bằng "Nice to meet you, too." = Tôi cũng vậy.', ['Đúng — đáp lại bằng Nice to meet you, too (Tôi cũng vậy).', 'Sai — Goodbye là tạm biệt, không hợp khi mới gặp.', 'Sai — You are welcome là đáp lại lời cảm ơn.', 'Sai — đây là câu hỏi thăm, không phải lời đáp.']),
    Q('Chào buổi chiều dùng câu?', ['Good night', 'Good morning', 'Good evening', 'Good afternoon'], 3, 'Good afternoon = Chào buổi chiều (khoảng 12h–18h).', ['Sai — Good night là chúc ngủ ngon (buổi tối đi ngủ).', 'Sai — Good morning là chào buổi sáng.', 'Sai — Good evening là chào buổi tối.', 'Đúng — Good afternoon = Chào buổi chiều.']),
    Q('Buổi tối khi gặp nhau em chào?', ['Good morning', 'Good evening', 'Good night', 'Good afternoon'], 1, 'Good evening = chào buổi tối (khi mới gặp).', ['Sai — Good morning là chào buổi sáng.', 'Đúng — Good evening = chào buổi tối khi mới gặp.', 'Sai — Good night chỉ dùng khi tạm biệt/đi ngủ.', 'Sai — Good afternoon là chào buổi chiều.']),
    Q('"See you tomorrow!" nghĩa là?', ['Xin chào', 'Tạm biệt mãi mãi', 'Hẹn gặp lại ngày mai', 'Hôm nay gặp nhé'], 2, 'See you tomorrow = Hẹn gặp lại ngày mai.', ['Sai — xin chào là Hello.', 'Sai — câu này không có ý chia tay mãi mãi.', 'Đúng — tomorrow là ngày mai nên là hẹn gặp lại ngày mai.', 'Sai — tomorrow là ngày mai, không phải hôm nay.']),
  ]),

  M(2, "What's your name? – How old are you?", [
    Q('"What is your name?" hỏi điều gì?', ['Bạn ở đâu?', 'Bạn khoẻ không?', 'Tên bạn là gì?', 'Bạn bao nhiêu tuổi?'], 2, 'What is your name? = Tên bạn là gì?', ['Sai — hỏi ở đâu là Where are you from?', 'Sai — hỏi khoẻ không là How are you?', 'Đúng — What is your name? = Tên bạn là gì?', 'Sai — hỏi tuổi là How old are you?']),
    Q('Trả lời "What is your name?" – "___ Nam."', ['My name', 'I am name', 'I have', 'My name is'], 3, 'Trả lời đầy đủ: My name is Nam.', ['Sai — thiếu động từ is, chưa đủ câu.', 'Sai — không nói "I am name" mà nói My name is.', 'Sai — I have là tôi có, không hợp.', 'Đúng — My name is Nam là câu trả lời đầy đủ.']),
    Q('"How old are you?" hỏi gì?', ['Bạn học lớp mấy?', 'Bạn tên gì?', 'Bạn ở đâu?', 'Bạn bao nhiêu tuổi?'], 3, 'How old are you? = Bạn bao nhiêu tuổi?', ['Sai — hỏi lớp là What grade/class.', 'Sai — hỏi tên là What is your name?', 'Sai — hỏi ở đâu là Where are you from?', 'Đúng — How old = bao nhiêu tuổi.']),
    Q('Em 8 tuổi: "I am ___ years old."', ['eight', 'eighth', 'eighty', 'eighteen'], 0, 'eight = 8; eighteen = 18; eighty = 80.', ['Đúng — eight = 8 tuổi.', 'Sai — eighth là thứ tám (thứ tự), không phải số tuổi.', 'Sai — eighty = 80.', 'Sai — eighteen = 18.']),
    Q('Cách viết tắt của "I am" là?', ['I\'am', 'Iam', 'I,m', 'I\'m'], 3, "I am = I'm.", ['Sai — dấu nháy đặt sai chỗ.', 'Sai — phải có dấu nháy ngăn cách.', 'Sai — dùng dấu phẩy là sai, phải dùng nháy đơn.', 'Đúng — I am viết tắt là I\'m.']),
    Q('"How do you spell your name?" nghĩa là?', ['Tên bạn viết thế nào?', 'Bạn thích gì?', 'Bạn bao nhiêu tuổi?', 'Bạn ở đâu?'], 0, 'Spell = đánh vần / viết. Hỏi cách viết tên.', ['Đúng — spell là đánh vần, hỏi cách viết tên.', 'Sai — hỏi thích gì là What do you like?', 'Sai — hỏi tuổi là How old are you?', 'Sai — hỏi ở đâu là Where are you from?']),
  ]),

  M(3, 'Where are you from?', [
    Q('"Where are you from?" hỏi gì?', ['Bạn từ đâu đến?', 'Bạn mấy tuổi?', 'Bạn tên gì?', 'Bạn khoẻ không?'], 0, 'Where are you from? = Bạn đến từ đâu?', ['Đúng — Where from = bạn đến từ đâu.', 'Sai — hỏi tuổi là How old are you?', 'Sai — hỏi tên là What is your name?', 'Sai — hỏi khoẻ không là How are you?']),
    Q('Trả lời: "I am from ___."', ['Japan (Nhật Bản)', 'America (Mỹ)', 'England (Anh)', 'Vietnam'], 3, 'Sau "from" là tên quốc gia / địa phương.', ['Sai — đúng ngữ pháp nhưng đây không phải nước của em.', 'Sai — đúng ngữ pháp nhưng không phải nước của em.', 'Sai — đúng ngữ pháp nhưng không phải nước của em.', 'Đúng — I am from Vietnam (em đến từ Việt Nam).']),
    Q('"I am Vietnamese." nghĩa là?', ['Tôi đến Việt Nam', 'Tôi thích Việt Nam', 'Tôi là người Việt Nam', 'Tôi ở Hà Nội'], 2, 'Vietnamese = (người) Việt Nam.', ['Sai — đến Việt Nam phải có động từ come/go.', 'Sai — thích là like.', 'Đúng — Vietnamese = (là người) Việt Nam.', 'Sai — ở Hà Nội phải nói in Hanoi.']),
    Q('Thủ đô của Việt Nam tiếng Anh là?', ['Ho Chi Minh', 'Hanoi', 'Da Nang', 'Hai Phong'], 1, 'Hanoi = Hà Nội — thủ đô.', ['Sai — TP Hồ Chí Minh không phải thủ đô.', 'Đúng — Hanoi (Hà Nội) là thủ đô.', 'Sai — Đà Nẵng không phải thủ đô.', 'Sai — Hải Phòng không phải thủ đô.']),
    Q('Người Anh là?', ['Japanese', 'American', 'Vietnamese', 'English / British'], 3, 'English / British = người Anh.', ['Sai — Japanese là người Nhật.', 'Sai — American là người Mỹ.', 'Sai — Vietnamese là người Việt.', 'Đúng — English / British = người Anh.']),
    Q('"England" có nghĩa là?', ['Nước Anh', 'Nước Nhật', 'Nước Pháp', 'Nước Mỹ'], 0, 'England = nước Anh.', ['Đúng — England = nước Anh.', 'Sai — nước Nhật là Japan.', 'Sai — nước Pháp là France.', 'Sai — nước Mỹ là America.']),
  ]),

  M(4, 'My family (members)', [
    Q('"Father" có nghĩa là?', ['Em gái', 'Bố', 'Chú ruột', 'Anh trai'], 1, 'Father = bố / cha.', ['Sai — em gái là sister.', 'Đúng — Father = bố / cha.', 'Sai — chú là uncle.', 'Sai — anh trai là brother.']),
    Q('"Mother" có nghĩa là?', ['Mẹ', 'Chị gái', 'Cô giáo', 'Dì ruột'], 0, 'Mother = mẹ.', ['Đúng — Mother = mẹ.', 'Sai — chị gái là sister.', 'Sai — cô giáo là teacher.', 'Sai — dì là aunt.']),
    Q('"Brother" có nghĩa là?', ['Bạn thân', 'Anh/em trai', 'Chú ruột', 'Chị/em gái'], 1, 'Brother = anh / em trai.', ['Sai — bạn thân là best friend.', 'Đúng — Brother = anh / em trai.', 'Sai — chú là uncle.', 'Sai — chị/em gái là sister.']),
    Q('"Sister" có nghĩa là?', ['Dì ruột', 'Anh/em trai', 'Mẹ ruột', 'Chị/em gái'], 3, 'Sister = chị / em gái.', ['Sai — dì là aunt.', 'Sai — anh/em trai là brother.', 'Sai — mẹ là mother.', 'Đúng — Sister = chị / em gái.']),
    Q('"Grandparents" là?', ['Cô chú', 'Anh chị', 'Ông bà', 'Cha mẹ (parents)'], 2, 'Grandparents = ông bà.', ['Sai — cô chú là aunt and uncle.', 'Sai — anh chị là brothers and sisters.', 'Đúng — Grandparents = ông bà.', 'Sai — cha mẹ là parents.']),
    Q('"This is my family." nghĩa là?', ['Kia là gia đình tôi', 'Tôi yêu gia đình', 'Gia đình tôi đông', 'Đây là gia đình tôi'], 3, 'This is my family = Đây là gia đình tôi.', ['Sai — "kia" (ở xa) phải dùng That, không phải This.', 'Sai — yêu là love.', 'Sai — đông là big, không có trong câu.', 'Đúng — This is = Đây là (ở gần).']),
  ]),

  M(5, 'My friends', [
    Q('"Friend" có nghĩa là?', ['Bạn (bè)', 'Anh em', 'Cô giáo', 'Hàng xóm'], 0, 'Friend = bạn.', ['Đúng — Friend = bạn (bè).', 'Sai — anh em là brothers.', 'Sai — cô giáo là teacher.', 'Sai — hàng xóm là neighbour.']),
    Q('"This is my friend, Linh." nghĩa là?', ['Linh tạm biệt', 'Linh là cô tôi', 'Linh là chị tôi', 'Đây là bạn tôi, Linh'], 3, 'This is my friend = Đây là bạn của tôi.', ['Sai — tạm biệt là goodbye.', 'Sai — cô là aunt.', 'Sai — chị là sister.', 'Đúng — This is my friend = Đây là bạn của tôi.']),
    Q('"Best friend" là?', ['Bạn cùng tuổi', 'Bạn thân nhất', 'Bạn mới', 'Bạn xấu'], 1, 'Best friend = bạn thân nhất.', ['Sai — cùng tuổi không phải nghĩa của best.', 'Đúng — best = nhất, nên best friend là bạn thân nhất.', 'Sai — bạn mới là new friend.', 'Sai — best là tốt nhất, không phải xấu.']),
    Q('Hỏi tên bạn: "What is ___ name?"', ['his/her', 'their (của họ)', 'its (của nó)', 'a (một)'], 0, 'Hỏi tên người thứ ba (anh ấy/cô ấy) → his / her.', ['Đúng — anh ấy/cô ấy dùng his / her.', 'Sai — their dùng cho nhiều người (của họ).', 'Sai — its dùng cho đồ vật/con vật.', 'Sai — "a" là mạo từ, không phải từ sở hữu.']),
    Q('"Her name is Mai." nghĩa là?', ['Bạn tên Mai', 'Tên cô ấy là Mai', 'Tên anh ấy là Mai', 'Tên tôi là Mai'], 1, 'Her = của cô ấy.', ['Sai — bạn (you) phải dùng your.', 'Đúng — Her = của cô ấy.', 'Sai — của anh ấy là his.', 'Sai — của tôi là my.']),
    Q('"His name is Nam." nghĩa là?', ['Bạn tên Nam', 'Tên anh ấy là Nam', 'Tên cô ấy là Nam', 'Tôi tên Nam'], 1, 'His = của anh ấy.', ['Sai — bạn (you) phải dùng your.', 'Đúng — His = của anh ấy.', 'Sai — của cô ấy là her.', 'Sai — của tôi là my.']),
  ]),

  M(6, 'Numbers 1-20 review', [
    Q('"Eleven" là số?', ['10', '11', '20', '12'], 1, 'Eleven = 11.', ['Sai — 10 là ten.', 'Đúng — Eleven = 11.', 'Sai — 20 là twenty.', 'Sai — 12 là twelve.']),
    Q('Số 13 tiếng Anh là?', ['Thirteen', 'Thirteenth', 'Thirty', 'Thirtieth'], 0, 'Thirteen = 13.', ['Đúng — Thirteen = 13.', 'Sai — thirteenth là thứ 13 (thứ tự).', 'Sai — thirty = 30.', 'Sai — thirtieth là thứ 30.']),
    Q('"Fifteen" là số?', ['15', '14', '5', '50'], 0, 'Fifteen = 15.', ['Đúng — Fifteen = 15.', 'Sai — 14 là fourteen.', 'Sai — 5 là five.', 'Sai — 50 là fifty.']),
    Q('Số 18 tiếng Anh là?', ['Eighty', 'Eighteen', 'Eighteenth', 'Eighty-eight'], 1, 'Eighteen = 18.', ['Sai — eighty = 80.', 'Đúng — Eighteen = 18.', 'Sai — eighteenth là thứ 18 (thứ tự).', 'Sai — eighty-eight = 88.']),
    Q('"Twenty" là số?', ['12', '2', '20', '22'], 2, 'Twenty = 20.', ['Sai — 12 là twelve.', 'Sai — 2 là two.', 'Đúng — Twenty = 20.', 'Sai — 22 là twenty-two.']),
    Q('Đếm: sixteen, ___, eighteen', ['nineteen', 'fifteen', 'seventeen', 'fourteen'], 2, '16 – 17 – 18 → seventeen.', ['Sai — nineteen = 19, sau 18.', 'Sai — fifteen = 15, trước 16.', 'Đúng — 16, 17, 18 nên ô trống là seventeen.', 'Sai — fourteen = 14.']),
  ]),

  M(7, 'My body parts', [
    Q('"Head" có nghĩa là?', ['Chân (leg)', 'Mắt (eye)', 'Đầu', 'Tay (hand)'], 2, 'Head = đầu.', ['Sai — chân là leg.', 'Sai — mắt là eye.', 'Đúng — Head = đầu.', 'Sai — tay là hand.']),
    Q('"Eyes" có nghĩa là?', ['Tai (ear)', 'Miệng (mouth)', 'Mũi (nose)', 'Mắt'], 3, 'Eyes = (đôi) mắt.', ['Sai — tai là ear.', 'Sai — miệng là mouth.', 'Sai — mũi là nose.', 'Đúng — Eyes = (đôi) mắt (số nhiều).']),
    Q('"Ears" có nghĩa là?', ['Mắt (eye)', 'Tai', 'Mũi (nose)', 'Tay (hand)'], 1, 'Ears = (đôi) tai.', ['Sai — mắt là eye.', 'Đúng — Ears = (đôi) tai (số nhiều).', 'Sai — mũi là nose.', 'Sai — tay là hand.']),
    Q('"Hands" có nghĩa là?', ['Đôi bàn tay', 'Đôi vai (shoulders)', 'Đôi chân (feet)', 'Cánh tay'], 0, 'Hands = đôi bàn tay (số nhiều).', ['Đúng — Hands = đôi bàn tay (có "s" nên số nhiều).', 'Sai — đôi vai là shoulders.', 'Sai — đôi chân là feet.', 'Sai — cánh tay là arm.']),
    Q('Em nghe bằng?', ['Nose (mũi - để ngửi)', 'Mouth (miệng - để nói)', 'Ears', 'Eyes (mắt - để nhìn)'], 2, 'Nghe bằng tai = ears.', ['Sai — mũi để ngửi, không phải để nghe.', 'Sai — miệng để nói/ăn.', 'Đúng — nghe bằng tai = ears.', 'Sai — mắt để nhìn.']),
    Q('"Touch your nose!" nghĩa là?', ['Cười lên!', 'Chạm vào mũi của bạn!', 'Ngửi đi!', 'Bịt mũi lại!'], 1, 'Touch = chạm; nose = mũi.', ['Sai — cười là smile.', 'Đúng — Touch = chạm, nose = mũi.', 'Sai — ngửi là smell.', 'Sai — bịt mũi là cover your nose.']),
  ]),

  M(8, 'My toys (đồ chơi)', [
    Q('"Ball" có nghĩa là?', ['Quả bóng', 'Búp bê', 'Con diều (kite)', 'Người máy (robot)'], 0, 'Ball = quả bóng.', ['Đúng — Ball = quả bóng.', 'Sai — búp bê là doll.', 'Sai — con diều là kite.', 'Sai — người máy là robot.']),
    Q('"Doll" có nghĩa là?', ['Búp bê', 'Ô tô đồ chơi (car)', 'Tàu hỏa (train)', 'Quả bóng'], 0, 'Doll = búp bê.', ['Đúng — Doll = búp bê.', 'Sai — ô tô là car.', 'Sai — tàu hoả là train.', 'Sai — quả bóng là ball.']),
    Q('"Car" (đồ chơi) có nghĩa là?', ['Máy bay', 'Ô tô', 'Tàu hoả', 'Búp bê'], 1, 'Car = ô tô (đồ chơi).', ['Sai — máy bay là plane.', 'Đúng — Car = ô tô.', 'Sai — tàu hoả là train.', 'Sai — búp bê là doll.']),
    Q('"Kite" có nghĩa là?', ['Bóng bay', 'Xe đạp', 'Diều', 'Tàu thuyền'], 2, 'Kite = con diều.', ['Sai — bóng bay là balloon.', 'Sai — xe đạp là bike.', 'Đúng — Kite = con diều.', 'Sai — tàu thuyền là boat.']),
    Q('"Teddy bear" là?', ['Búp bê', 'Người máy', 'Quả bóng', 'Gấu bông'], 3, 'Teddy bear = gấu bông.', ['Sai — búp bê là doll.', 'Sai — người máy là robot.', 'Sai — quả bóng là ball.', 'Đúng — Teddy bear = gấu bông.']),
    Q('"Robot" có nghĩa là?', ['Xe đạp', 'Người máy', 'Con thú', 'Quả bóng'], 1, 'Robot = người máy.', ['Sai — xe đạp là bike.', 'Đúng — Robot = người máy.', 'Sai — con thú là animal.', 'Sai — quả bóng là ball.']),
  ]),

  M(9, 'My pets (thú cưng)', [
    Q('"Pet" có nghĩa là?', ['Thức ăn cho vật nuôi', 'Thú nuôi trong nhà', 'Đồ chơi', 'Cây cảnh'], 1, 'Pet = thú cưng (mèo, chó, cá cảnh...).', ['Sai — thức ăn cho thú là pet food.', 'Đúng — Pet = thú cưng nuôi trong nhà.', 'Sai — đồ chơi là toy.', 'Sai — cây cảnh là plant.']),
    Q('"Cat" có nghĩa là?', ['Cá (fish)', 'Chim (bird)', 'Mèo', 'Chó (dog)'], 2, 'Cat = con mèo.', ['Sai — cá là fish.', 'Sai — chim là bird.', 'Đúng — Cat = con mèo.', 'Sai — chó là dog.']),
    Q('"Dog" có nghĩa là?', ['Chó', 'Mèo (cat)', 'Thỏ (rabbit)', 'Cá (fish)'], 0, 'Dog = con chó.', ['Đúng — Dog = con chó.', 'Sai — mèo là cat.', 'Sai — thỏ là rabbit.', 'Sai — cá là fish.']),
    Q('"Rabbit" có nghĩa là?', ['Gấu (bear)', 'Thỏ', 'Chuột (mouse)', 'Hổ (tiger)'], 1, 'Rabbit = con thỏ.', ['Sai — gấu là bear.', 'Đúng — Rabbit = con thỏ.', 'Sai — chuột là mouse.', 'Sai — hổ là tiger.']),
    Q('"Parrot" có nghĩa là?', ['Vẹt', 'Vịt (duck)', 'Gà (chicken)', 'Quạ (crow)'], 0, 'Parrot = con vẹt (biết nói).', ['Đúng — Parrot = con vẹt.', 'Sai — vịt là duck.', 'Sai — gà là chicken.', 'Sai — quạ là crow.']),
    Q('"I have a pet dog." nghĩa là?', ['Tôi muốn nuôi chó', 'Chó của tôi to', 'Tôi yêu chó', 'Tôi có một con chó nuôi'], 3, 'I have a pet dog = Tôi có một chú chó cưng.', ['Sai — muốn là want, không phải have.', 'Sai — to là big, không có trong câu.', 'Sai — yêu là love.', 'Đúng — I have = tôi có; pet dog = chó cưng.']),
  ]),

  M(10, 'In the classroom', [
    Q('"Classroom" có nghĩa là?', ['Phòng ngủ', 'Phòng học', 'Nhà vệ sinh', 'Sân chơi'], 1, 'Classroom = phòng học (lớp học).', ['Sai — phòng ngủ là bedroom.', 'Đúng — Classroom = phòng học.', 'Sai — nhà vệ sinh là toilet.', 'Sai — sân chơi là playground.']),
    Q('"Book" có nghĩa là?', ['Bảng (board)', 'Bút (pen)', 'Vở (notebook)', 'Sách'], 3, 'Book = sách.', ['Sai — bảng là board.', 'Sai — bút là pen.', 'Sai — vở là notebook.', 'Đúng — Book = sách.']),
    Q('"Desk" có nghĩa là?', ['Cái cặp', 'Cái bảng', 'Cái ghế', 'Cái bàn (học)'], 3, 'Desk = bàn học.', ['Sai — cặp là bag.', 'Sai — bảng là board.', 'Sai — ghế là chair.', 'Đúng — Desk = cái bàn học.']),
    Q('"Chair" có nghĩa là?', ['Cặp sách (bag)', 'Bảng (board)', 'Bàn (table)', 'Ghế'], 3, 'Chair = ghế.', ['Sai — cặp sách là bag.', 'Sai — bảng là board.', 'Sai — bàn là table.', 'Đúng — Chair = ghế.']),
    Q('"Pencil case" có nghĩa là?', ['Bút mực', 'Cái cặp sách', 'Cục tẩy', 'Hộp bút'], 3, 'Pencil case = hộp bút (đựng bút chì, gôm...).', ['Sai — bút mực là pen.', 'Sai — cặp sách là bag.', 'Sai — cục tẩy là eraser.', 'Đúng — Pencil case = hộp đựng bút.']),
    Q('"Open your book, please." nghĩa là?', ['Vui lòng mở sách ra', 'Đóng sách lại', 'Đọc sách to lên', 'Cất sách đi'], 0, 'Open = mở; please = làm ơn / vui lòng.', ['Đúng — Open = mở; please = vui lòng.', 'Sai — đóng lại là close.', 'Sai — đọc là read.', 'Sai — cất đi là put away.']),
  ]),

  M(11, 'My school', [
    Q('"School" có nghĩa là?', ['Công viên', 'Trường học', 'Bệnh viện', 'Cửa hàng'], 1, 'School = trường học.', ['Sai — công viên là park.', 'Đúng — School = trường học.', 'Sai — bệnh viện là hospital.', 'Sai — cửa hàng là shop.']),
    Q('"Teacher" có nghĩa là?', ['Cha mẹ', 'Bác sĩ', 'Giáo viên', 'Học sinh'], 2, 'Teacher = giáo viên / thầy cô.', ['Sai — cha mẹ là parents.', 'Sai — bác sĩ là doctor.', 'Đúng — Teacher = giáo viên.', 'Sai — học sinh là student.']),
    Q('"Student" / "pupil" có nghĩa là?', ['Học sinh', 'Giáo viên', 'Hiệu trưởng', 'Bảo vệ'], 0, 'Student / pupil = học sinh.', ['Đúng — Student / pupil = học sinh.', 'Sai — giáo viên là teacher.', 'Sai — hiệu trưởng là principal.', 'Sai — bảo vệ là guard.']),
    Q('"Library" có nghĩa là?', ['Thư viện', 'Sân bóng', 'Nhà ăn', 'Phòng y tế'], 0, 'Library = thư viện.', ['Đúng — Library = thư viện.', 'Sai — sân bóng là field.', 'Sai — nhà ăn là canteen.', 'Sai — phòng y tế là medical room.']),
    Q('"Playground" có nghĩa là?', ['Sân chơi', 'Thư viện', 'Nhà vệ sinh', 'Phòng học'], 0, 'Playground = sân chơi.', ['Đúng — Playground = sân chơi.', 'Sai — thư viện là library.', 'Sai — nhà vệ sinh là toilet.', 'Sai — phòng học là classroom.']),
    Q('"I go to school every day." nghĩa là?', ['Trường tôi to', 'Tôi đến trường mỗi ngày', 'Tôi yêu trường', 'Tôi đi học cuối tuần'], 1, 'Every day = mỗi ngày.', ['Sai — to là big, không có trong câu.', 'Đúng — go to school every day = đến trường mỗi ngày.', 'Sai — yêu là love.', 'Sai — every day là mỗi ngày, không phải cuối tuần.']),
  ]),

  M(12, 'This is / These are (demonstratives)', [
    Q('"This is my book." nghĩa là?', ['Kia là sách tôi', 'Tôi đọc sách', 'Sách tôi đẹp', 'Đây là sách của tôi'], 3, 'This is = Đây là (chỉ vật ở gần, số ít).', ['Sai — "kia" (ở xa) phải dùng That, không phải This.', 'Sai — đọc là read.', 'Sai — đẹp là nice, không có trong câu.', 'Đúng — This is = Đây là (vật ở gần).']),
    Q('"These are my pens." nghĩa là?', ['Tôi có bút', 'Đây là những cây bút của tôi', 'Kia là bút', 'Đây là cây bút'], 1, 'These are = Đây là (số nhiều, ở gần).', ['Sai — có là have.', 'Đúng — These are = Đây là (nhiều vật ở gần), pens số nhiều.', 'Sai — "kia" (ở xa) phải dùng Those.', 'Sai — pens là số nhiều, không phải một cây.']),
    Q('"That is a cat." nghĩa là?', ['Mèo tôi', 'Đây là mèo', 'Tôi có mèo', 'Kia là một con mèo'], 3, 'That is = Kia / Đó là (số ít, ở xa).', ['Sai — mèo của tôi là my cat.', 'Sai — "đây" (ở gần) phải dùng This.', 'Sai — có là have.', 'Đúng — That is = Kia / Đó là (vật ở xa).']),
    Q('"Those are dogs." nghĩa là?', ['Kia là một con chó', 'Tôi có chó', 'Đây là chó', 'Kia là những con chó'], 3, 'Those are = Kia là (số nhiều, ở xa).', ['Sai — dogs là số nhiều, không phải một con.', 'Sai — có là have.', 'Sai — "đây" (ở gần) phải dùng These.', 'Đúng — Those are = Kia là (nhiều vật ở xa).']),
    Q('"___ is a pencil." (1 vật ở gần)', ['Those (nhiều vật ở xa)', 'They (chúng)', 'This', 'These (nhiều vật ở gần)'], 2, 'Một vật ở gần dùng "This".', ['Sai — Those dùng cho nhiều vật ở xa.', 'Sai — They là chủ ngữ "chúng", không hợp.', 'Đúng — một vật ở gần dùng This.', 'Sai — These dùng cho nhiều vật ở gần.']),
    Q('"___ are erasers." (nhiều vật ở xa)', ['These (nhiều vật ở gần)', 'This (1 vật ở gần)', 'That (1 vật ở xa)', 'Those'], 3, 'Số nhiều ở xa dùng "Those".', ['Sai — These là nhiều vật ở gần.', 'Sai — This là một vật ở gần.', 'Sai — That là một vật ở xa (số ít).', 'Đúng — nhiều vật ở xa dùng Those.']),
  ]),

  M(13, 'How many...? + numbers', [
    Q('"How many books?" hỏi gì?', ['Có bao nhiêu quyển sách?', 'Sách của ai?', 'Sách màu gì?', 'Sách ở đâu?'], 0, 'How many ...? = Có bao nhiêu ... ?', ['Đúng — How many = Có bao nhiêu.', 'Sai — hỏi của ai là Whose.', 'Sai — hỏi màu là What color.', 'Sai — hỏi ở đâu là Where.']),
    Q('"How many" dùng với danh từ?', ['Số ít đếm được', 'Số nhiều đếm được', 'Tên riêng', 'Không đếm được'], 1, 'How many + danh từ số nhiều đếm được.', ['Sai — How many đi với số nhiều, không phải số ít.', 'Đúng — How many + danh từ số nhiều đếm được.', 'Sai — không dùng với tên riêng.', 'Sai — danh từ không đếm được dùng How much.']),
    Q('Có 3 quyển sách: "I have ___ books."', ['three', 'threes', 'thirty', 'a three'], 0, 'three = 3 (số đếm).', ['Đúng — three = 3.', 'Sai — số đếm không thêm "s".', 'Sai — thirty = 30.', 'Sai — số đếm không đi với mạo từ "a".']),
    Q('"How many pencils are there?" trả lời:', ['There is one', 'It is red', 'There are five', 'They are big'], 2, 'There are + số nhiều (số lượng > 1).', ['Sai — câu hỏi pencils số nhiều nên cần There are.', 'Sai — hỏi số lượng chứ không hỏi màu.', 'Đúng — There are + số nhiều trả lời cho How many.', 'Sai — câu này nói kích cỡ, không trả lời số lượng.']),
    Q('"There is one cat." nghĩa là?', ['Có nhiều con mèo', 'Không có mèo', 'Mèo to', 'Có một con mèo'], 3, 'There is = có (số ít).', ['Sai — one là một, không phải nhiều.', 'Sai — There is nghĩa là có, không phải không có.', 'Sai — to là big, không có trong câu.', 'Đúng — There is one = có một (số ít).']),
    Q('"There are two dogs." nghĩa là?', ['Không có chó', 'Có 12 con chó', 'Có 2 con chó', 'Có 1 con chó'], 2, 'There are + số nhiều: 2 dogs.', ['Sai — There are nghĩa là có.', 'Sai — two là 2, twelve mới là 12.', 'Đúng — two = 2, There are là có (số nhiều).', 'Sai — two là 2, không phải 1.']),
  ]),

  M(14, 'Colors & shapes', [
    Q('"Red" là màu gì?', ['Tím (purple)', 'Đỏ', 'Vàng (yellow)', 'Xanh (blue)'], 1, 'Red = màu đỏ.', ['Sai — tím là purple.', 'Đúng — Red = màu đỏ.', 'Sai — vàng là yellow.', 'Sai — xanh là blue.']),
    Q('"Yellow" là màu gì?', ['Xanh dương (blue)', 'Tím (purple)', 'Hồng (pink)', 'Vàng'], 3, 'Yellow = màu vàng.', ['Sai — xanh dương là blue.', 'Sai — tím là purple.', 'Sai — hồng là pink.', 'Đúng — Yellow = màu vàng.']),
    Q('"Circle" là hình gì?', ['Hình chữ nhật', 'Hình tam giác', 'Hình tròn', 'Hình vuông'], 2, 'Circle = hình tròn.', ['Sai — hình chữ nhật là rectangle.', 'Sai — hình tam giác là triangle.', 'Đúng — Circle = hình tròn.', 'Sai — hình vuông là square.']),
    Q('"Square" là hình gì?', ['Hình sao', 'Hình vuông', 'Hình tam giác', 'Hình tròn'], 1, 'Square = hình vuông.', ['Sai — hình sao là star.', 'Đúng — Square = hình vuông.', 'Sai — hình tam giác là triangle.', 'Sai — hình tròn là circle.']),
    Q('"Triangle" là hình gì?', ['Hình vuông (square)', 'Trái tim', 'Hình tròn (circle)', 'Tam giác'], 3, 'Triangle = hình tam giác.', ['Sai — hình vuông là square.', 'Sai — trái tim là heart.', 'Sai — hình tròn là circle.', 'Đúng — Triangle = hình tam giác.']),
    Q('"What color is it?" hỏi gì?', ['Nó màu gì?', 'Nó là hình gì?', 'Nó của ai?', 'Nó ở đâu?'], 0, 'What color is it? = Nó (có) màu gì?', ['Đúng — color = màu, hỏi nó màu gì.', 'Sai — hỏi hình là What shape.', 'Sai — hỏi của ai là Whose.', 'Sai — hỏi ở đâu là Where.']),
  ]),

  M(15, 'I have / He has (have/has got)', [
    Q('"I have a pen." nghĩa là?', ['Tôi không có bút', 'Bạn có bút', 'Tôi có một cây bút', 'Cho tôi bút'], 2, 'I have = Tôi có.', ['Sai — "không có" phải có don\'t (I don\'t have).', 'Sai — "bạn" là you, không phải I.', 'Đúng — I have = Tôi có một cây bút.', 'Sai — "cho tôi" là Give me.']),
    Q('"She has a doll." nghĩa là?', ['Tôi có búp bê', 'Cô ấy thích búp bê', 'Cô ấy có búp bê', 'Búp bê đẹp'], 2, 'She / he / it dùng "has".', ['Sai — She là cô ấy, không phải tôi.', 'Sai — thích là like, has là có.', 'Đúng — She has = cô ấy có (ngôi 3 dùng has).', 'Sai — đẹp là nice, không có trong câu.']),
    Q('Điền: "He ___ a dog."', ['has', 'have (dùng cho I/you/we/they)', 'is (động từ to be)', 'are (to be số nhiều)'], 0, 'He / She / It → has.', ['Đúng — He là ngôi 3 số ít → has.', 'Sai — have dùng cho I/you/we/they.', 'Sai — is là to be, không có nghĩa "có".', 'Sai — are là to be số nhiều.']),
    Q('Điền: "We ___ many books."', ['have', 'am (to be cho I)', 'has (dùng cho he/she/it)', 'is (to be số ít)'], 0, 'I / you / we / they → have.', ['Đúng — We → have.', 'Sai — am là to be dùng cho I.', 'Sai — has dùng cho he/she/it.', 'Sai — is là to be số ít.']),
    Q('"Do you have a pencil?" nghĩa là?', ['Tôi có bút chì', 'Bạn có bút chì không?', 'Cho tôi bút chì', 'Bút chì đâu?'], 1, 'Do you have ...? = Bạn có ... không?', ['Sai — câu này là câu hỏi, không phải câu kể.', 'Đúng — Do you have ...? = Bạn có ... không?', 'Sai — cho tôi là Give me.', 'Sai — ở đâu là Where.']),
    Q('Trả lời CÓ: "Do you have a pen?" – ___', ['Yes, I do', 'No, I do', 'No, I am', 'Yes, I am'], 0, "Trả lời ngắn: Yes, I do. / No, I don't.", ['Đúng — câu hỏi với Do thì trả lời Yes, I do.', 'Sai — No phải đi với don\'t (No, I don\'t).', 'Sai — câu hỏi Do thì không dùng am.', 'Sai — câu hỏi Do thì trả lời do, không phải am.']),
  ]),

  M(16, 'Can / Can\'t (khả năng)', [
    Q('"I can swim." nghĩa là?', ['Tôi không biết bơi', 'Tôi thích bơi', 'Tôi có thể bơi', 'Tôi đi bơi'], 2, 'I can + V = Tôi có thể ...', ['Sai — "không biết" phải có can\'t.', 'Sai — thích là like.', 'Đúng — I can = Tôi có thể (biết bơi).', 'Sai — đi bơi là go swimming.']),
    Q('"She can\'t sing." nghĩa là?', ['Cô ấy đang hát', 'Cô ấy biết hát', 'Cô ấy không biết hát', 'Cô ấy thích hát'], 2, "can't = không thể.", ['Sai — đang hát là is singing.', 'Sai — can\'t là không thể, không phải biết.', 'Đúng — can\'t = không thể / không biết.', 'Sai — thích là like.']),
    Q('"Can you ride a bike?" nghĩa là?', ['Bạn có biết đi xe đạp không?', 'Cho tôi xe đạp', 'Bạn đang đi xe đạp', 'Xe đạp đâu?'], 0, 'Can you ...? = Bạn có thể / có biết ... không?', ['Đúng — Can you ...? = Bạn có biết ... không?', 'Sai — cho tôi là Give me.', 'Sai — đang đi là are riding.', 'Sai — ở đâu là Where.']),
    Q('Trả lời CÓ thể: "Can you swim?" – ___', ['Yes, I can', 'No, I can', 'Yes, I do', 'Yes, I am'], 0, "Trả lời ngắn: Yes, I can. / No, I can't.", ['Đúng — câu hỏi Can thì trả lời Yes, I can.', 'Sai — No phải đi với can\'t (No, I can\'t).', 'Sai — câu hỏi Can thì không trả lời do.', 'Sai — câu hỏi Can thì không trả lời am.']),
    Q('Điền: "Birds ___ fly."', ['are (to be số nhiều)', 'can\'t (không thể)', 'is (to be số ít)', 'can'], 3, 'Chim có thể bay → can.', ['Sai — are là to be, không có nghĩa "có thể".', 'Sai — chim bay được nên không dùng can\'t.', 'Sai — is là to be số ít.', 'Đúng — chim biết bay → can.']),
    Q('"Fish can swim but they can\'t walk." nghĩa là?', ['Cá biết đi', 'Cá biết bơi nhưng không biết đi', 'Cá không bơi được', 'Cá biết bay'], 1, 'But = nhưng; can\'t = không thể.', ['Sai — can\'t walk là không biết đi.', 'Đúng — can swim = biết bơi; can\'t walk = không biết đi.', 'Sai — can swim là bơi được.', 'Sai — câu không nói về bay.']),
  ]),

  M(17, 'Days of the week', [
    Q('"Monday" là thứ?', ['Thứ hai', 'Thứ tư', 'Thứ ba', 'Chủ nhật'], 0, 'Monday = thứ hai.', ['Đúng — Monday = thứ hai.', 'Sai — thứ tư là Wednesday.', 'Sai — thứ ba là Tuesday.', 'Sai — chủ nhật là Sunday.']),
    Q('"Friday" là thứ?', ['Chủ nhật', 'Thứ bảy', 'Thứ sáu', 'Thứ năm'], 2, 'Friday = thứ sáu.', ['Sai — chủ nhật là Sunday.', 'Sai — thứ bảy là Saturday.', 'Đúng — Friday = thứ sáu.', 'Sai — thứ năm là Thursday.']),
    Q('"Sunday" là?', ['Chủ nhật', 'Thứ sáu', 'Thứ bảy', 'Thứ hai'], 0, 'Sunday = chủ nhật.', ['Đúng — Sunday = chủ nhật.', 'Sai — thứ sáu là Friday.', 'Sai — thứ bảy là Saturday.', 'Sai — thứ hai là Monday.']),
    Q('Một tuần có bao nhiêu ngày?', ['8', '6', '7', '5'], 2, 'Một tuần = 7 days.', ['Sai — một tuần không có 8 ngày.', 'Sai — một tuần không có 6 ngày.', 'Đúng — một tuần có 7 ngày.', 'Sai — một tuần không có 5 ngày.']),
    Q('Hai ngày cuối tuần là?', ['Mon & Tue', 'Wed & Thu', 'Fri & Sat', 'Sat & Sun'], 3, 'Weekend = Saturday & Sunday.', ['Sai — thứ hai, ba là ngày trong tuần.', 'Sai — thứ tư, năm là ngày giữa tuần.', 'Sai — thứ sáu là ngày làm việc.', 'Đúng — cuối tuần là thứ bảy & chủ nhật.']),
    Q('"What day is it today?" hỏi gì?', ['Hôm nay thời tiết thế nào?', 'Hôm nay là ngày bao nhiêu?', 'Bạn đi đâu hôm nay?', 'Hôm nay là thứ mấy?'], 3, 'What day = thứ mấy?', ['Sai — hỏi thời tiết là How is the weather.', 'Sai — hỏi ngày là What date.', 'Sai — hỏi đi đâu là Where.', 'Đúng — What day = hôm nay thứ mấy.']),
  ]),

  M(18, 'Review HK1', [
    Q('"Hello, my name is Lan." nghĩa là?', ['Lan khoẻ không', 'Lan đâu rồi', 'Tạm biệt Lan', 'Xin chào, tôi tên Lan'], 3, 'My name is ... = Tôi tên là ...', ['Sai — hỏi khoẻ không là How are you.', 'Sai — đâu rồi là Where.', 'Sai — tạm biệt là Goodbye.', 'Đúng — Hello + my name is = Xin chào, tôi tên Lan.']),
    Q('"How old are you?" – "I am 8 ___ old."', ['yearly', 'year (số ít, dùng khi 1 tuổi)', 'years', 'olds'], 2, '"years old" — từ 2 tuổi trở lên dùng số nhiều "years".', ['Sai — yearly là "hằng năm", không hợp.', 'Sai — 8 tuổi (nhiều hơn 1) phải dùng years.', 'Đúng — từ 2 tuổi trở lên dùng years old.', 'Sai — old không thêm "s".']),
    Q('"Where are you from?" – "I am from ___."', ['Vietnam', 'happy (vui — tính từ)', 'big (to lớn — tính từ)', 'red (đỏ — màu sắc)'], 0, 'Sau "from" là tên nước/địa danh.', ['Đúng — sau from là tên nước: Vietnam.', 'Sai — happy là tính từ, không phải nơi chốn.', 'Sai — big là tính từ.', 'Sai — red là màu sắc.']),
    Q('"She has a cat." nghĩa là?', ['Cô ấy thích mèo', 'Tôi có mèo', 'Cô ấy có một con mèo', 'Mèo của cô ấy'], 2, 'She has = cô ấy có.', ['Sai — thích là like, has là có.', 'Sai — She là cô ấy, không phải tôi.', 'Đúng — She has = cô ấy có.', 'Sai — "mèo của cô ấy" là her cat.']),
    Q('"How many books?" – "There ___ five books."', ['be (dạng nguyên thể)', 'is (dùng cho số ít)', 'am (dùng cho I)', 'are'], 3, 'There are + số nhiều.', ['Sai — không dùng "be" nguyên thể ở đây.', 'Sai — five books là số nhiều, không dùng is.', 'Sai — am chỉ dùng cho I.', 'Đúng — five books số nhiều → There are.']),
    Q('"Can you sing?" – Trả lời CÓ:', ['Yes, I do', 'Yes, I am', 'Yes, I can', 'No, I can'], 2, "Yes, I can / No, I can't.", ['Sai — câu hỏi Can thì không trả lời do.', 'Sai — câu hỏi Can thì không trả lời am.', 'Đúng — câu hỏi Can trả lời Yes, I can.', 'Sai — No phải đi với can\'t.']),
    Q('Hôm nay là Monday, ngày mai là?', ['Wednesday', 'Sunday', 'Tuesday', 'Friday'], 2, 'Sau Monday là Tuesday.', ['Sai — Wednesday là thứ tư, cách 1 ngày.', 'Sai — Sunday là chủ nhật.', 'Đúng — sau Monday (thứ hai) là Tuesday (thứ ba).', 'Sai — Friday là thứ sáu.']),
    Q('"Touch your nose!" nghĩa là?', ['Ngửi đi', 'Hắt hơi', 'Bịt mũi lại', 'Chạm vào mũi của bạn'], 3, 'Touch = chạm; nose = mũi.', ['Sai — ngửi là smell.', 'Sai — hắt hơi là sneeze.', 'Sai — bịt mũi là cover your nose.', 'Đúng — Touch = chạm; nose = mũi.']),
    Q('"This is my pet dog." nghĩa là?', ['Tôi không có chó', 'Tôi yêu chó', 'Kia là con chó của tôi', 'Đây là chú chó cưng của tôi'], 3, 'This is my pet dog = Đây là con chó cưng của tôi.', ['Sai — câu không phủ định, không có don\'t.', 'Sai — yêu là love.', 'Sai — "kia" (ở xa) phải dùng That.', 'Đúng — This is my pet dog = Đây là chú chó cưng của tôi.']),
    Q('"Good evening!" dùng khi nào?', ['Chào buổi sáng', 'Tạm biệt', 'Chào buổi chiều', 'Chào buổi tối'], 3, 'Good evening = chào buổi tối (mới gặp).', ['Sai — chào buổi sáng là Good morning.', 'Sai — tạm biệt là Goodbye.', 'Sai — chào buổi chiều là Good afternoon.', 'Đúng — Good evening = chào buổi tối khi mới gặp.']),
  ], { difficulty: 2 }),

  // ──────────────── HK2 ────────────────
  M(19, 'My house (1) — rooms', [
    Q('"House" có nghĩa là?', ['Trường', 'Công viên', 'Cửa hàng', 'Ngôi nhà'], 3, 'House = ngôi nhà.', ['Sai — trường là school.', 'Sai — công viên là park.', 'Sai — cửa hàng là shop.', 'Đúng — House = ngôi nhà.']),
    Q('"Bedroom" là phòng?', ['Phòng tắm', 'Phòng ngủ', 'Phòng khách', 'Phòng bếp'], 1, 'Bedroom = phòng ngủ.', ['Sai — phòng tắm là bathroom.', 'Đúng — bed (giường) → bedroom là phòng ngủ.', 'Sai — phòng khách là living room.', 'Sai — phòng bếp là kitchen.']),
    Q('"Kitchen" là phòng?', ['Phòng khách', 'Phòng ngủ', 'Phòng tắm', 'Phòng bếp'], 3, 'Kitchen = phòng bếp.', ['Sai — phòng khách là living room.', 'Sai — phòng ngủ là bedroom.', 'Sai — phòng tắm là bathroom.', 'Đúng — Kitchen = phòng bếp.']),
    Q('"Bathroom" là phòng?', ['Phòng tắm', 'Phòng bếp', 'Phòng ăn', 'Phòng ngủ'], 0, 'Bathroom = phòng tắm.', ['Đúng — bath (tắm) → bathroom là phòng tắm.', 'Sai — phòng bếp là kitchen.', 'Sai — phòng ăn là dining room.', 'Sai — phòng ngủ là bedroom.']),
    Q('"Living room" là phòng?', ['Phòng tắm', 'Phòng khách', 'Phòng bếp', 'Phòng ngủ'], 1, 'Living room = phòng khách (nơi sinh hoạt chung).', ['Sai — phòng tắm là bathroom.', 'Đúng — Living room = phòng khách.', 'Sai — phòng bếp là kitchen.', 'Sai — phòng ngủ là bedroom.']),
    Q('Em ngủ ở?', ['Garden', 'Bedroom', 'Bathroom', 'Kitchen'], 1, 'Ngủ ở phòng ngủ = bedroom.', ['Sai — garden là khu vườn, không ngủ ở đó.', 'Đúng — ngủ ở phòng ngủ = bedroom.', 'Sai — bathroom là phòng tắm.', 'Sai — kitchen là phòng bếp.']),
  ]),

  M(20, 'My house (2) — furniture & prepositions of place', [
    Q('"Table" có nghĩa là?', ['Giường', 'Tủ (wardrobe)', 'Bàn', 'Ghế (chair)'], 2, 'Table = cái bàn.', ['Sai — giường là bed.', 'Sai — tủ là wardrobe.', 'Đúng — Table = cái bàn.', 'Sai — ghế là chair.']),
    Q('"Bed" có nghĩa là?', ['Bàn (table)', 'Tủ quần áo', 'Ghế sofa', 'Giường'], 3, 'Bed = cái giường.', ['Sai — bàn là table.', 'Sai — tủ quần áo là wardrobe.', 'Sai — ghế sofa là sofa.', 'Đúng — Bed = cái giường.']),
    Q('"In" có nghĩa là?', ['Dưới (under)', 'Cạnh (next to)', 'Trong', 'Trên (on)'], 2, 'In = ở trong.', ['Sai — dưới là under.', 'Sai — cạnh là next to.', 'Đúng — In = ở trong.', 'Sai — trên là on.']),
    Q('"On" có nghĩa là?', ['Trong (in)', 'Dưới (under)', 'Trên (bề mặt)', 'Cạnh (next to)'], 2, 'On = ở trên (bề mặt).', ['Sai — trong là in.', 'Sai — dưới là under.', 'Đúng — On = ở trên (bề mặt).', 'Sai — cạnh là next to.']),
    Q('"Under" có nghĩa là?', ['Trong (in)', 'Dưới', 'Trên (on)', 'Cạnh (next to)'], 1, 'Under = ở dưới.', ['Sai — trong là in.', 'Đúng — Under = ở dưới.', 'Sai — trên là on.', 'Sai — cạnh là next to.']),
    Q('"Next to" có nghĩa là?', ['Trước (in front of)', 'Cạnh / kế bên', 'Trong (in)', 'Sau (behind)'], 1, 'Next to = ngay cạnh.', ['Sai — trước là in front of.', 'Đúng — Next to = cạnh / kế bên.', 'Sai — trong là in.', 'Sai — sau là behind.']),
  ]),

  M(21, 'Where is...?: in/on/under/next to', [
    Q('"Where is my book?" có nghĩa là?', ['Sách tôi đẹp', 'Cho tôi sách', 'Sách của ai?', 'Sách tôi đâu rồi?'], 3, 'Where is ...? = ... ở đâu?', ['Sai — đẹp là nice.', 'Sai — cho tôi là Give me.', 'Sai — của ai là Whose.', 'Đúng — Where is ...? = ... ở đâu?']),
    Q('"The cat is under the table." nghĩa là?', ['Mèo trên bàn', 'Mèo cạnh bàn', 'Mèo trong bàn', 'Mèo dưới gầm bàn'], 3, 'Under the table = dưới gầm bàn.', ['Sai — trên là on, không phải under.', 'Sai — cạnh là next to.', 'Sai — trong là in.', 'Đúng — under = dưới gầm bàn.']),
    Q('"The book is on the desk." nghĩa là?', ['Sách dưới bàn', 'Sách trên (mặt) bàn', 'Sách trong bàn', 'Sách cạnh bàn'], 1, 'On the desk = trên mặt bàn.', ['Sai — dưới là under.', 'Đúng — on = trên mặt bàn.', 'Sai — trong là in.', 'Sai — cạnh là next to.']),
    Q('"The ball is in the box." nghĩa là?', ['Bóng dưới hộp', 'Bóng trong hộp', 'Bóng cạnh hộp', 'Bóng trên hộp'], 1, 'In the box = ở trong hộp.', ['Sai — dưới là under.', 'Đúng — in = ở trong hộp.', 'Sai — cạnh là next to.', 'Sai — trên là on.']),
    Q('"The chair is next to the desk." nghĩa là?', ['Ghế trên bàn', 'Ghế kế bên bàn', 'Ghế trong bàn', 'Ghế xa bàn'], 1, 'Next to = ngay cạnh.', ['Sai — trên là on.', 'Đúng — next to = kế bên bàn.', 'Sai — trong là in.', 'Sai — next to là gần, không phải xa.']),
    Q('Em ngồi trên ghế: "I sit ___ the chair."', ['next (kế bên — cần "to")', 'on', 'in (ở trong)', 'under (ở dưới)'], 1, 'Ngồi trên ghế = on the chair.', ['Sai — next phải đi với "to", và nghĩa là kế bên.', 'Đúng — ngồi trên ghế = sit on the chair.', 'Sai — in là ở trong.', 'Sai — under là ở dưới.']),
  ]),

  M(22, 'Food (1) — rice, noodles, bread, meat', [
    Q('"Rice" có nghĩa là?', ['Bánh mì', 'Mì / phở (noodles)', 'Cơm / gạo', 'Cá (fish)'], 2, 'Rice = cơm / gạo.', ['Sai — bánh mì là bread.', 'Sai — mì/phở là noodles.', 'Đúng — Rice = cơm / gạo.', 'Sai — cá là fish.']),
    Q('"Noodles" có nghĩa là?', ['Bánh mì', 'Cơm (rice)', 'Mì / bún / phở', 'Trứng (egg)'], 2, 'Noodles = mì / phở / bún (sợi).', ['Sai — bánh mì là bread.', 'Sai — cơm là rice.', 'Đúng — Noodles = mì / phở / bún.', 'Sai — trứng là egg.']),
    Q('"Bread" có nghĩa là?', ['Cơm (rice)', 'Bánh mì', 'Bánh ngọt', 'Mì (noodles)'], 1, 'Bread = bánh mì.', ['Sai — cơm là rice.', 'Đúng — Bread = bánh mì.', 'Sai — bánh ngọt là cake.', 'Sai — mì là noodles.']),
    Q('"Meat" có nghĩa là?', ['Rau (vegetables)', 'Cá (fish)', 'Trứng (egg)', 'Thịt'], 3, 'Meat = thịt (chung).', ['Sai — rau là vegetables.', 'Sai — cá là fish.', 'Sai — trứng là egg.', 'Đúng — Meat = thịt.']),
    Q('"Chicken" có nghĩa là?', ['Thịt bò', 'Thịt gà', 'Thịt heo', 'Cá (fish)'], 1, 'Chicken = gà / thịt gà.', ['Sai — thịt bò là beef.', 'Đúng — Chicken = (thịt) gà.', 'Sai — thịt heo là pork.', 'Sai — cá là fish.']),
    Q('"I eat rice for lunch." nghĩa là?', ['Tôi ăn bánh mì sáng', 'Tôi nấu cơm', 'Tôi ăn cơm trưa', 'Tôi thích cơm'], 2, 'Lunch = bữa trưa.', ['Sai — rice là cơm, không phải bánh mì.', 'Sai — nấu là cook, eat là ăn.', 'Đúng — eat rice for lunch = ăn cơm bữa trưa.', 'Sai — thích là like.']),
  ]),

  M(23, 'Food (2) — fruits & vegetables', [
    Q('"Apple" có nghĩa là?', ['Xoài (mango)', 'Cam (orange)', 'Táo', 'Chuối (banana)'], 2, 'Apple = quả táo.', ['Sai — xoài là mango.', 'Sai — cam là orange.', 'Đúng — Apple = quả táo.', 'Sai — chuối là banana.']),
    Q('"Banana" có nghĩa là?', ['Chuối', 'Nho (grape)', 'Lê (pear)', 'Táo (apple)'], 0, 'Banana = quả chuối.', ['Đúng — Banana = quả chuối.', 'Sai — nho là grape.', 'Sai — lê là pear.', 'Sai — táo là apple.']),
    Q('"Orange" (trái cây) có nghĩa là?', ['Bưởi (pomelo)', 'Cam', 'Chanh (lemon)', 'Quýt (mandarin)'], 1, 'Orange = quả cam.', ['Sai — bưởi là pomelo.', 'Đúng — Orange = quả cam.', 'Sai — chanh là lemon.', 'Sai — quýt là mandarin.']),
    Q('"Vegetables" có nghĩa là?', ['Nước ngọt', 'Rau củ', 'Trái cây', 'Thịt cá'], 1, 'Vegetables = rau củ.', ['Sai — nước ngọt là soft drink.', 'Đúng — Vegetables = rau củ.', 'Sai — trái cây là fruits.', 'Sai — thịt cá là meat and fish.']),
    Q('"Carrot" có nghĩa là?', ['Cải bắp', 'Cà rốt', 'Cà chua', 'Cà tím'], 1, 'Carrot = củ cà rốt.', ['Sai — cải bắp là cabbage.', 'Đúng — Carrot = củ cà rốt.', 'Sai — cà chua là tomato.', 'Sai — cà tím là eggplant.']),
    Q('"Tomato" có nghĩa là?', ['Khoai tây (potato)', 'Cà chua', 'Dưa chuột (cucumber)', 'Cà rốt'], 1, 'Tomato = cà chua.', ['Sai — khoai tây là potato.', 'Đúng — Tomato = cà chua.', 'Sai — dưa chuột là cucumber.', 'Sai — cà rốt là carrot.']),
  ]),

  M(24, 'Drinks & I like / I don\'t like', [
    Q('"Water" có nghĩa là?', ['Nước ép', 'Sữa (milk)', 'Nước', 'Trà (tea)'], 2, 'Water = nước (lọc).', ['Sai — nước ép là juice.', 'Sai — sữa là milk.', 'Đúng — Water = nước (lọc).', 'Sai — trà là tea.']),
    Q('"Milk" có nghĩa là?', ['Cà phê', 'Trà (tea)', 'Sữa', 'Nước lọc (water)'], 2, 'Milk = sữa.', ['Sai — cà phê là coffee.', 'Sai — trà là tea.', 'Đúng — Milk = sữa.', 'Sai — nước lọc là water.']),
    Q('"Juice" có nghĩa là?', ['Nước ép trái cây', 'Sữa (milk)', 'Trà (tea)', 'Cà phê (coffee)'], 0, 'Juice = nước ép.', ['Đúng — Juice = nước ép trái cây.', 'Sai — sữa là milk.', 'Sai — trà là tea.', 'Sai — cà phê là coffee.']),
    Q('"I like apples." nghĩa là?', ['Tôi không thích táo', 'Tôi có táo', 'Tôi thích táo', 'Tôi ghét táo'], 2, 'I like = Tôi thích.', ['Sai — "không thích" phải có don\'t.', 'Sai — có là have, like là thích.', 'Đúng — I like = Tôi thích (táo).', 'Sai — ghét là hate.']),
    Q('"I don\'t like fish." nghĩa là?', ['Tôi có cá', 'Tôi không thích cá', 'Tôi ăn cá', 'Tôi thích cá'], 1, "I don't like = Tôi không thích.", ['Sai — có là have.', 'Đúng — don\'t like = không thích.', 'Sai — ăn là eat.', 'Sai — có don\'t nên là "không thích", không phải "thích".']),
    Q('"She likes milk." nghĩa là?', ['Cô ấy có sữa', 'Cô ấy ghét sữa', 'Cô ấy thích sữa', 'Cô ấy uống sữa'], 2, 'She likes (ngôi 3 thêm s).', ['Sai — có là have.', 'Sai — ghét là hate.', 'Đúng — likes (ngôi 3 thêm s) = thích.', 'Sai — uống là drink.']),
  ]),

  M(25, 'Animals (1) — pets & farm animals', [
    Q('"Dog" có nghĩa là?', ['Mèo (cat)', 'Bò (cow)', 'Vịt (duck)', 'Chó'], 3, 'Dog = con chó.', ['Sai — mèo là cat.', 'Sai — bò là cow.', 'Sai — vịt là duck.', 'Đúng — Dog = con chó.']),
    Q('"Cow" có nghĩa là?', ['Con bò', 'Con heo', 'Con gà', 'Con vịt'], 0, 'Cow = con bò.', ['Đúng — Cow = con bò.', 'Sai — heo là pig.', 'Sai — gà là chicken.', 'Sai — vịt là duck.']),
    Q('"Pig" có nghĩa là?', ['Con gà', 'Con vịt', 'Con bò', 'Con heo / lợn'], 3, 'Pig = con heo / lợn.', ['Sai — gà là chicken.', 'Sai — vịt là duck.', 'Sai — bò là cow.', 'Đúng — Pig = con heo / lợn.']),
    Q('"Duck" có nghĩa là?', ['Con thỏ', 'Con ngỗng', 'Con vịt', 'Con gà'], 2, 'Duck = con vịt.', ['Sai — thỏ là rabbit.', 'Sai — ngỗng là goose.', 'Đúng — Duck = con vịt.', 'Sai — gà là chicken.']),
    Q('"Chicken" (con vật) có nghĩa là?', ['Con vịt', 'Con heo', 'Con bò', 'Con gà'], 3, 'Chicken = con gà.', ['Sai — vịt là duck.', 'Sai — heo là pig.', 'Sai — bò là cow.', 'Đúng — Chicken = con gà.']),
    Q('Con vật cho ta sữa là?', ['Pig (lợn)', 'Dog (chó)', 'Cow', 'Hen (gà mái)'], 2, 'Cow (bò) cho ta sữa.', ['Sai — lợn không cho sữa.', 'Sai — chó không cho sữa.', 'Đúng — bò (cow) cho ta sữa.', 'Sai — gà mái đẻ trứng, không cho sữa.']),
  ]),

  M(26, 'Animals (2) — wild animals & zoo', [
    Q('"Lion" có nghĩa là?', ['Hổ (tiger)', 'Gấu (bear)', 'Voi (elephant)', 'Sư tử'], 3, 'Lion = sư tử.', ['Sai — hổ là tiger.', 'Sai — gấu là bear.', 'Sai — voi là elephant.', 'Đúng — Lion = sư tử.']),
    Q('"Tiger" có nghĩa là?', ['Báo (leopard)', 'Sư tử (lion)', 'Hổ', 'Gấu (bear)'], 2, 'Tiger = con hổ.', ['Sai — báo là leopard.', 'Sai — sư tử là lion.', 'Đúng — Tiger = con hổ.', 'Sai — gấu là bear.']),
    Q('"Elephant" có nghĩa là?', ['Con hươu', 'Con ngựa', 'Con voi', 'Con khỉ'], 2, 'Elephant = con voi.', ['Sai — hươu là deer.', 'Sai — ngựa là horse.', 'Đúng — Elephant = con voi.', 'Sai — khỉ là monkey.']),
    Q('"Monkey" có nghĩa là?', ['Con cọp', 'Con gấu', 'Con khỉ', 'Con ngựa'], 2, 'Monkey = con khỉ.', ['Sai — cọp (hổ) là tiger.', 'Sai — gấu là bear.', 'Đúng — Monkey = con khỉ.', 'Sai — ngựa là horse.']),
    Q('"Bear" có nghĩa là?', ['Gấu', 'Hươu (deer)', 'Hươu cao cổ', 'Báo (leopard)'], 0, 'Bear = con gấu.', ['Đúng — Bear = con gấu.', 'Sai — hươu là deer.', 'Sai — hươu cao cổ là giraffe.', 'Sai — báo là leopard.']),
    Q('"Zoo" có nghĩa là?', ['Bệnh viện', 'Sở thú', 'Cửa hàng', 'Sân bay'], 1, 'Zoo = vườn bách thú (sở thú).', ['Sai — bệnh viện là hospital.', 'Đúng — Zoo = sở thú (vườn bách thú).', 'Sai — cửa hàng là shop.', 'Sai — sân bay là airport.']),
  ]),

  M(27, 'Weather & seasons', [
    Q('"Sunny" có nghĩa là?', ['Có gió', 'Có mưa', 'Có nắng', 'Có mây'], 2, 'Sunny = trời nắng.', ['Sai — có gió là windy.', 'Sai — có mưa là rainy.', 'Đúng — sun (mặt trời) → sunny là có nắng.', 'Sai — có mây là cloudy.']),
    Q('"Rainy" có nghĩa là?', ['Có gió', 'Có tuyết', 'Có nắng', 'Có mưa'], 3, 'Rainy = trời mưa.', ['Sai — có gió là windy.', 'Sai — có tuyết là snowy.', 'Sai — có nắng là sunny.', 'Đúng — rain (mưa) → rainy là trời mưa.']),
    Q('"Hot" có nghĩa là?', ['Lạnh (cold)', 'Mát (cool)', 'Ấm (warm)', 'Nóng'], 3, 'Hot = nóng.', ['Sai — lạnh là cold.', 'Sai — mát là cool.', 'Sai — ấm là warm.', 'Đúng — Hot = nóng.']),
    Q('"Cold" có nghĩa là?', ['Ấm (warm)', 'Mát (cool)', 'Nóng (hot)', 'Lạnh'], 3, 'Cold = lạnh.', ['Sai — ấm là warm.', 'Sai — mát là cool.', 'Sai — nóng là hot.', 'Đúng — Cold = lạnh.']),
    Q('"Summer" là mùa?', ['Đông (winter)', 'Xuân (spring)', 'Hạ', 'Thu (autumn)'], 2, 'Summer = mùa hạ (hè).', ['Sai — đông là winter.', 'Sai — xuân là spring.', 'Đúng — Summer = mùa hạ (hè).', 'Sai — thu là autumn.']),
    Q('"How is the weather today?" hỏi gì?', ['Bạn khoẻ không?', 'Thời tiết hôm nay thế nào?', 'Hôm nay thứ mấy?', 'Bạn ở đâu?'], 1, 'How is the weather? = Thời tiết thế nào?', ['Sai — hỏi khoẻ không là How are you.', 'Đúng — weather = thời tiết, hỏi thời tiết thế nào.', 'Sai — hỏi thứ là What day.', 'Sai — hỏi ở đâu là Where.']),
  ]),

  M(28, 'Hobbies & free time', [
    Q('"Hobby" có nghĩa là?', ['Nghề nghiệp', 'Bài tập', 'Lịch trình', 'Sở thích'], 3, 'Hobby = sở thích.', ['Sai — nghề nghiệp là job.', 'Sai — bài tập là homework.', 'Sai — lịch trình là schedule.', 'Đúng — Hobby = sở thích.']),
    Q('"I like reading." nghĩa là?', ['Tôi mua sách', 'Tôi thích đọc sách', 'Tôi đọc nhanh', 'Tôi thích viết'], 1, 'Reading = (việc) đọc.', ['Sai — mua là buy.', 'Đúng — like reading = thích đọc sách.', 'Sai — câu không nói nhanh (fast).', 'Sai — viết là writing, không phải reading.']),
    Q('"Drawing" có nghĩa là?', ['Hát (singing)', 'Nhảy múa (dancing)', 'Vẽ', 'Bơi (swimming)'], 2, 'Drawing = vẽ.', ['Sai — hát là singing.', 'Sai — nhảy múa là dancing.', 'Đúng — Drawing = vẽ.', 'Sai — bơi là swimming.']),
    Q('"Singing" có nghĩa là?', ['Nói (speaking)', 'Hát', 'Đọc (reading)', 'Múa (dancing)'], 1, 'Singing = (việc) hát.', ['Sai — nói là speaking.', 'Đúng — Singing = (việc) hát.', 'Sai — đọc là reading.', 'Sai — múa là dancing.']),
    Q('"Playing football" có nghĩa là?', ['Cất bóng', 'Mua bóng', 'Xem bóng đá', 'Chơi đá bóng'], 3, 'Play football = chơi bóng đá.', ['Sai — cất là put away.', 'Sai — mua là buy.', 'Sai — xem là watch.', 'Đúng — play football = chơi đá bóng.']),
    Q('"What is your hobby?" hỏi gì?', ['Sở thích của bạn là gì?', 'Bạn tên gì?', 'Bạn từ đâu?', 'Bạn mấy tuổi?'], 0, 'What is your hobby? = Sở thích của bạn là gì?', ['Đúng — hobby = sở thích, hỏi sở thích là gì.', 'Sai — hỏi tên là What is your name.', 'Sai — hỏi từ đâu là Where from.', 'Sai — hỏi tuổi là How old.']),
  ]),

  M(29, 'Daily routine (Present Simple)', [
    Q('"I get up at six o\'clock." nghĩa là?', ['Tôi đi ngủ lúc 6 giờ', 'Tôi ăn sáng lúc 6 giờ', 'Tôi thức dậy lúc 6 giờ', 'Tôi đi học lúc 6 giờ'], 2, 'Get up = thức dậy.', ['Sai — đi ngủ là go to bed.', 'Sai — ăn sáng là have breakfast.', 'Đúng — get up = thức dậy.', 'Sai — đi học là go to school.']),
    Q('"I brush my teeth." nghĩa là?', ['Tôi chải tóc', 'Tôi tắm', 'Tôi rửa mặt', 'Tôi đánh răng'], 3, 'Brush my teeth = đánh răng.', ['Sai — chải tóc là brush my hair.', 'Sai — tắm là take a bath.', 'Sai — rửa mặt là wash my face.', 'Đúng — brush my teeth = đánh răng.']),
    Q('"I go to school." nghĩa là?', ['Tôi đi ngủ', 'Tôi đi đến trường', 'Tôi về nhà', 'Tôi đi chơi'], 1, 'Go to school = đi học.', ['Sai — đi ngủ là go to bed.', 'Đúng — go to school = đi đến trường.', 'Sai — về nhà là go home.', 'Sai — đi chơi là go out.']),
    Q('"I have breakfast." nghĩa là?', ['Tôi ăn trưa', 'Tôi ăn sáng', 'Tôi ăn tối', 'Tôi đi ngủ'], 1, 'Have breakfast = ăn sáng.', ['Sai — ăn trưa là have lunch.', 'Đúng — breakfast = bữa sáng.', 'Sai — ăn tối là have dinner.', 'Sai — đi ngủ là go to bed.']),
    Q('"She goes to school every day." — chú ý động từ:', ['gone (đã đi - quá khứ phân từ)', 'go (nguyên thể - dùng cho I/you/we/they)', 'going (V-ing - dạng tiếp diễn)', 'goes'], 3, 'Ngôi 3 số ít (she) thêm "s/es": goes.', ['Sai — gone là quá khứ phân từ, không hợp.', 'Sai — go dùng cho I/you/we/they.', 'Sai — going là dạng tiếp diễn.', 'Đúng — she (ngôi 3 số ít) → goes.']),
    Q('"He gets up early." nghĩa là?', ['Anh ấy thức dậy sớm', 'Anh ấy đi học', 'Anh ấy ngủ muộn', 'Anh ấy mệt'], 0, 'Get up early = thức dậy sớm.', ['Đúng — get up early = thức dậy sớm.', 'Sai — đi học là go to school.', 'Sai — ngủ muộn là sleep late.', 'Sai — mệt là tired.']),
  ]),

  M(30, 'Time — What time is it?', [
    Q('"What time is it?" hỏi gì?', ['Bạn mấy tuổi?', 'Bao nhiêu cái?', 'Hôm nay là thứ mấy?', 'Bây giờ là mấy giờ?'], 3, 'What time is it? = Bây giờ là mấy giờ?', ['Sai — hỏi tuổi là How old.', 'Sai — hỏi bao nhiêu là How many.', 'Sai — hỏi thứ là What day.', 'Đúng — What time = mấy giờ.']),
    Q('"It is seven o\'clock." nghĩa là?', ['Bây giờ là 7 phút', 'Bây giờ là 17 giờ', 'Bây giờ là 7 giờ', 'Bây giờ là 7 giờ 30'], 2, 'o\'clock = giờ chẵn.', ['Sai — phút là minute, không phải o\'clock.', 'Sai — seven là 7, không phải 17.', 'Đúng — seven o\'clock = 7 giờ (giờ chẵn).', 'Sai — 7 giờ 30 là half past seven.']),
    Q('"Half past six" là?', ['6 giờ 30 phút', '5 giờ 30', '6 giờ', '7 giờ 30'], 0, 'Half past 6 = 6 giờ rưỡi = 6:30.', ['Đúng — half past six = 6 giờ rưỡi (6:30).', 'Sai — past six là sau 6 giờ, không phải 5 giờ.', 'Sai — half là rưỡi, không phải đúng giờ.', 'Sai — past six là 6 giờ hơn, không phải 7 giờ.']),
    Q('Sáng dậy lúc 6 giờ: "I get up at 6 ___."', ['hour (giờ - danh từ chỉ thời lượng)', 'o\'clock', 'half (rưỡi - dùng cho giờ rưỡi)', 'minute'], 1, "at 6 o'clock = lúc 6 giờ.", ['Sai — hour chỉ thời lượng, không nói "at 6 hour".', 'Đúng — at 6 o\'clock = lúc 6 giờ.', 'Sai — half dùng cho giờ rưỡi.', 'Sai — minute là phút.']),
    Q('"AM" thường chỉ?', ['Buổi sáng', 'Đêm khuya', 'Buổi tối', 'Cả ngày'], 0, 'AM = từ nửa đêm đến 12h trưa (sáng).', ['Đúng — AM = buổi sáng (nửa đêm đến 12h trưa).', 'Sai — đêm khuya thuộc AM nhưng AM rộng hơn (cả sáng).', 'Sai — buổi tối là PM.', 'Sai — AM chỉ nửa ngày, không phải cả ngày.']),
    Q('"PM" thường chỉ?', ['Không có nghĩa', 'Cả ngày', 'Buổi sáng', 'Từ trưa đến nửa đêm'], 3, 'PM = từ 12h trưa đến nửa đêm.', ['Sai — PM có nghĩa rõ ràng.', 'Sai — PM chỉ nửa ngày, không phải cả ngày.', 'Sai — buổi sáng là AM.', 'Đúng — PM = từ trưa đến nửa đêm.']),
  ]),

  M(31, 'Months & birthday', [
    Q('"January" là tháng?', ['Tháng 1', 'Tháng 6', 'Tháng 7', 'Tháng 12'], 0, 'January = tháng 1.', ['Đúng — January = tháng 1.', 'Sai — tháng 6 là June.', 'Sai — tháng 7 là July.', 'Sai — tháng 12 là December.']),
    Q('"December" là tháng?', ['Tháng 9', 'Tháng 12', 'Tháng 11', 'Tháng 10'], 1, 'December = tháng 12.', ['Sai — tháng 9 là September.', 'Đúng — December = tháng 12 (tháng cuối).', 'Sai — tháng 11 là November.', 'Sai — tháng 10 là October.']),
    Q('Một năm có bao nhiêu tháng?', ['10', '11', '12', '14'], 2, '1 year = 12 months.', ['Sai — một năm không có 10 tháng.', 'Sai — một năm không có 11 tháng.', 'Đúng — một năm có 12 tháng.', 'Sai — một năm không có 14 tháng.']),
    Q('"Birthday" có nghĩa là?', ['Ngày Tết', 'Quốc khánh', 'Năm mới', 'Ngày sinh nhật'], 3, 'Birthday = sinh nhật.', ['Sai — Tết là New Year (Tet).', 'Sai — quốc khánh là National Day.', 'Sai — năm mới là New Year.', 'Đúng — birth (sinh) + day → ngày sinh nhật.']),
    Q('"Happy birthday!" nghĩa là?', ['Chúc mừng năm mới', 'Chào buổi sáng', 'Tạm biệt', 'Chúc mừng sinh nhật'], 3, 'Happy birthday = Chúc mừng sinh nhật.', ['Sai — chúc mừng năm mới là Happy New Year.', 'Sai — chào buổi sáng là Good morning.', 'Sai — tạm biệt là Goodbye.', 'Đúng — Happy birthday = Chúc mừng sinh nhật.']),
    Q('"My birthday is in May." nghĩa là?', ['Sinh nhật tôi vào tháng 5', 'Sinh nhật tôi vào tháng 3', 'Sinh nhật tôi vào tháng 8', 'Tôi sinh năm 5'], 0, 'May = tháng 5.', ['Đúng — May = tháng 5.', 'Sai — tháng 3 là March.', 'Sai — tháng 8 là August.', 'Sai — May là tháng 5, không phải năm 5.']),
  ]),

  M(32, 'Clothes', [
    Q('"Shirt" có nghĩa là?', ['Giày (shoes)', 'Váy (skirt)', 'Áo sơ mi', 'Mũ (hat)'], 2, 'Shirt = áo sơ mi.', ['Sai — giày là shoes.', 'Sai — váy là skirt.', 'Đúng — Shirt = áo sơ mi.', 'Sai — mũ là hat.']),
    Q('"T-shirt" có nghĩa là?', ['Quần (trousers)', 'Áo khoác', 'Áo thun', 'Váy (skirt)'], 2, 'T-shirt = áo thun / áo phông.', ['Sai — quần là trousers.', 'Sai — áo khoác là coat.', 'Đúng — T-shirt = áo thun / áo phông.', 'Sai — váy là skirt.']),
    Q('"Trousers" có nghĩa là?', ['Đôi tất (socks)', 'Áo (shirt)', 'Quần dài', 'Mũ (hat)'], 2, 'Trousers = quần dài.', ['Sai — đôi tất là socks.', 'Sai — áo là shirt.', 'Đúng — Trousers = quần dài.', 'Sai — mũ là hat.']),
    Q('"Shoes" có nghĩa là?', ['Đôi giày', 'Đôi tất (socks)', 'Áo (shirt)', 'Mũ (hat)'], 0, 'Shoes = đôi giày.', ['Đúng — Shoes = đôi giày.', 'Sai — đôi tất là socks.', 'Sai — áo là shirt.', 'Sai — mũ là hat.']),
    Q('"I wear a hat." nghĩa là?', ['Tôi giặt mũ', 'Tôi thích mũ', 'Tôi đội mũ', 'Tôi mua mũ'], 2, 'Wear = mặc / đội / mang.', ['Sai — giặt là wash.', 'Sai — thích là like.', 'Đúng — wear a hat = đội mũ.', 'Sai — mua là buy.']),
    Q('"She is wearing a red dress." nghĩa là?', ['Cô ấy đang mặc váy đỏ', 'Cô ấy có váy đỏ', 'Váy đỏ rất đẹp', 'Cô ấy thích váy đỏ'], 0, 'is wearing = đang mặc.', ['Đúng — is wearing = đang mặc (váy đỏ).', 'Sai — có là have.', 'Sai — câu nói về cô ấy, không khen váy.', 'Sai — thích là like.']),
  ]),

  M(33, 'Action verbs — run, jump, swim, dance', [
    Q('"Run" có nghĩa là?', ['Chạy', 'Đi (walk)', 'Bơi (swim)', 'Nhảy (jump)'], 0, 'Run = chạy.', ['Đúng — Run = chạy.', 'Sai — đi là walk.', 'Sai — bơi là swim.', 'Sai — nhảy là jump.']),
    Q('"Jump" có nghĩa là?', ['Hát (sing)', 'Chạy (run)', 'Bơi (swim)', 'Nhảy (cao/xa)'], 3, 'Jump = nhảy.', ['Sai — hát là sing.', 'Sai — chạy là run.', 'Sai — bơi là swim.', 'Đúng — Jump = nhảy (cao/xa).']),
    Q('"Swim" có nghĩa là?', ['Bơi', 'Chạy (run)', 'Hát (sing)', 'Đọc (read)'], 0, 'Swim = bơi.', ['Đúng — Swim = bơi.', 'Sai — chạy là run.', 'Sai — hát là sing.', 'Sai — đọc là read.']),
    Q('"Dance" có nghĩa là?', ['Nhảy múa', 'Bơi (swim)', 'Chạy (run)', 'Hát (sing)'], 0, 'Dance = nhảy múa.', ['Đúng — Dance = nhảy múa.', 'Sai — bơi là swim.', 'Sai — chạy là run.', 'Sai — hát là sing.']),
    Q('"Look!" nghĩa là?', ['Đi đi!', 'Nghe đi!', 'Nhìn kìa!', 'Ngồi xuống!'], 2, 'Look! = Nhìn kìa!', ['Sai — đi đi là Go!', 'Sai — nghe là Listen!', 'Đúng — Look! = Nhìn kìa!', 'Sai — ngồi xuống là Sit down!']),
    Q('"He is running." nghĩa là?', ['Anh ấy biết chạy', 'Anh ấy đang chạy', 'Anh ấy không chạy', 'Anh ấy chạy nhanh'], 1, 'is running = đang chạy (hiện tại tiếp diễn).', ['Sai — biết chạy là can run.', 'Đúng — is running = đang chạy.', 'Sai — không chạy phải có not.', 'Sai — câu không nói nhanh (fast).']),
  ]),

  M(34, 'Present simple — he/she/it (s/es)', [
    Q('"She ___ to school every day." (đi)', ['goes', 'go (nguyên thể, dùng cho I/you/we/they)', 'going (V-ing, dạng tiếp diễn)', 'gone (quá khứ phân từ)'], 0, 'Ngôi 3 số ít → goes.', ['Đúng — She (ngôi 3 số ít) → goes.', 'Sai — go dùng cho I/you/we/they.', 'Sai — going là dạng tiếp diễn.', 'Sai — gone là quá khứ phân từ.']),
    Q('"He ___ TV in the evening." (xem)', ['watches', 'watch (nguyên thể, dùng cho I/you/we/they)', 'watched', 'watching'], 0, 'watch + es → watches.', ['Đúng — He → watch thêm es → watches.', 'Sai — watch dùng cho I/you/we/they.', 'Sai — watched là quá khứ.', 'Sai — watching là dạng tiếp diễn.']),
    Q('"My brother ___ football on Sunday." (chơi)', ['plays', 'play (nguyên thể, dùng cho I/you/we/they)', 'played', 'playing'], 0, 'Ngôi 3 số ít → plays.', ['Đúng — my brother = he (ngôi 3 số ít) → plays.', 'Sai — play dùng cho I/you/we/they.', 'Sai — played là quá khứ.', 'Sai — playing là dạng tiếp diễn.']),
    Q('"I ___ rice for lunch." (ăn)', ['eat', 'ate (quá khứ của eat)', 'eats (chỉ dùng cho he/she/it)', 'eating'], 0, 'I → động từ nguyên thể: eat.', ['Đúng — I → động từ nguyên thể: eat.', 'Sai — ate là quá khứ.', 'Sai — eats chỉ dùng cho he/she/it.', 'Sai — eating là dạng tiếp diễn.']),
    Q('"My cat ___ fish." (thích)', ['like (nguyên thể, dùng cho I/you/we/they)', 'liking', 'liked (quá khứ của like)', 'likes'], 3, 'My cat = it (ngôi 3 số ít) → likes.', ['Sai — like dùng cho I/you/we/they.', 'Sai — liking là dạng tiếp diễn.', 'Sai — liked là quá khứ.', 'Đúng — my cat = it (ngôi 3 số ít) → likes.']),
    Q('"They ___ in Hanoi." (sống)', ['lives (chỉ dùng cho he/she/it)', 'lived (quá khứ của live)', 'live', 'living'], 2, 'They → động từ nguyên thể: live.', ['Sai — lives chỉ dùng cho he/she/it.', 'Sai — lived là quá khứ.', 'Đúng — They → động từ nguyên thể: live.', 'Sai — living là dạng tiếp diễn.']),
  ]),

  M(35, 'Review whole year', [
    Q('"Hello! How are you?" Đáp lại:', ['My name is Lan', 'I\'m fine, thank you', 'I have a pen', 'Goodbye'], 1, "I'm fine, thank you = Tôi khoẻ, cảm ơn.", ['Sai — đây là trả lời cho câu hỏi tên.', 'Đúng — How are you? → I\'m fine, thank you.', 'Sai — đây nói về việc có bút.', 'Sai — Goodbye là tạm biệt, không hợp.']),
    Q('"How old are you?" – "I am ___ years old."', ['an eight', 'eighty year', 'eighth', 'eight'], 3, 'I am eight years old.', ['Sai — số đếm không đi với "an".', 'Sai — eighty là 80, và year phải có "s".', 'Sai — eighth là thứ tám (thứ tự).', 'Đúng — I am eight years old (8 tuổi).']),
    Q('Số 17 tiếng Anh là?', ['Seven (số 7)', 'Sixteen', 'Seventeen', 'Seventy'], 2, 'Seventeen = 17.', ['Sai — seven = 7.', 'Sai — sixteen = 16.', 'Đúng — Seventeen = 17.', 'Sai — seventy = 70.']),
    Q('"Where are you from?" – "I am ___ Vietnam."', ['in (ở trong - chỉ vị trí)', 'at (ở tại - chỉ điểm)', 'on (ở trên - chỉ bề mặt)', 'from'], 3, 'I am from Vietnam.', ['Sai — câu trả lời "đến từ" dùng from.', 'Sai — at chỉ một điểm cụ thể.', 'Sai — on chỉ bề mặt.', 'Đúng — I am from Vietnam (đến từ Việt Nam).']),
    Q('"This is my friend, Mai." nghĩa là?', ['Đây là bạn tôi, Mai', 'Mai là cô tôi', 'Tạm biệt Mai', 'Đây là chị tôi'], 0, 'My friend = bạn của tôi.', ['Đúng — This is my friend = Đây là bạn của tôi.', 'Sai — cô là aunt.', 'Sai — tạm biệt là goodbye.', 'Sai — chị là sister.']),
    Q('"She ___ a cat." (có)', ['is (to be — không có nghĩa "có")', 'are (to be số nhiều)', 'have (dùng cho I/you/we/they)', 'has'], 3, 'She / he / it → has.', ['Sai — is là to be, không có nghĩa "có".', 'Sai — are là to be số nhiều.', 'Sai — have dùng cho I/you/we/they.', 'Đúng — She (ngôi 3 số ít) → has.']),
    Q('"Can you swim?" – Trả lời CÓ:', ['Yes, I am', 'No, I can', 'Yes, I do', 'Yes, I can'], 3, "Yes, I can / No, I can't.", ['Sai — câu hỏi Can thì không trả lời am.', 'Sai — No phải đi với can\'t.', 'Sai — câu hỏi Can thì không trả lời do.', 'Đúng — câu hỏi Can trả lời Yes, I can.']),
    Q('"The book is ___ the table." (mặt bàn)', ['on', 'at (tại — dùng cho địa điểm)', 'under (ở dưới)', 'in (ở trong)'], 0, 'On the table = trên (mặt) bàn.', ['Đúng — on the table = trên mặt bàn.', 'Sai — at dùng cho địa điểm.', 'Sai — under là ở dưới.', 'Sai — in là ở trong.']),
    Q('"What time is it?" – "It is 7 ___."', ['hour (giờ — danh từ thời lượng)', 'o\'clock', 'minute', 'half (rưỡi — dùng cho giờ rưỡi)'], 1, "It is 7 o'clock.", ['Sai — hour chỉ thời lượng, không dùng để nói giờ chẵn.', 'Đúng — It is 7 o\'clock (7 giờ).', 'Sai — minute là phút.', 'Sai — half dùng cho giờ rưỡi.']),
    Q('"My birthday is in ___." (tháng 9)', ['October', 'August', 'September', 'November'], 2, 'September = tháng 9.', ['Sai — October = tháng 10.', 'Sai — August = tháng 8.', 'Đúng — September = tháng 9.', 'Sai — November = tháng 11.']),
  ], { difficulty: 3 }),

  M(36, 'End of Grade 3 — Ready for Grade 4!', [
    Q('Câu nào giới thiệu tên mình ĐÚNG?', ['My name is An.', 'I name An.', 'My name An.', 'Name is me An.'], 0, 'Cấu trúc đúng: My name is + tên.', ['Đúng — "My name is An." là cách giới thiệu tên chuẩn.', 'Sai — thiếu động từ, phải là "My name is…".', 'Sai — thiếu động từ "is".', 'Sai — trật tự từ không đúng.']),
    Q('"How old are you?" — câu trả lời đúng là?', ['I am from Hanoi.', 'I am nine years old.', 'My name is Nam.', 'I like rice.'], 1, 'How old…? hỏi về tuổi.', ['Sai — đó là câu trả lời cho "Where are you from?".', 'Đúng — câu hỏi về tuổi, trả lời "I am … years old."', 'Sai — đó là câu trả lời cho "What is your name?".', 'Sai — đó là câu nói về sở thích.']),
    Q('Which word is a COLOUR?', ['ruler', 'desk', 'green', 'bread'], 2, 'Green = màu xanh lá.', ['Sai — ruler là cái thước (school things).', 'Sai — desk là cái bàn học (school things).', 'Đúng — green là màu xanh lá.', 'Sai — bread là bánh mì (food).']),
    Q('"Where are you from?" nghĩa là gì?', ['Bạn bao nhiêu tuổi?', 'Bạn tên là gì?', 'Bạn thích gì?', 'Bạn đến từ đâu?'], 3, 'Where…from? hỏi về quê quán, nơi ở.', ['Sai — hỏi tuổi là "How old are you?".', 'Sai — hỏi tên là "What is your name?".', 'Sai — hỏi sở thích là "What do you like?".', 'Đúng — "Where are you from?" là hỏi bạn đến từ đâu.']),
    Q('Câu nào nói rằng em KHÔNG thích sữa?', ['I like milk.', 'I don\'t like milk.', 'I am milk.', 'Milk is I.'], 1, 'Phủ định: I don\'t like + danh từ.', ['Sai — câu này nghĩa là em THÍCH sữa.', 'Đúng — "I don\'t like milk." là em không thích sữa.', 'Sai — câu này sai nghĩa hoàn toàn.', 'Sai — trật tự từ không đúng.']),
    Q('Ở Lớp 4 em sẽ học thì hiện tại tiếp diễn, ví dụ:', ['I play football.', 'I played football.', 'I am playing football.', 'I will football.'], 2, 'Hiện tại tiếp diễn: am/is/are + V-ing.', ['Sai — đó là thì hiện tại đơn.', 'Sai — đó là thì quá khứ đơn.', 'Đúng — "I am playing football." là hiện tại tiếp diễn.', 'Sai — câu này thiếu động từ chính.']),
  ]),
];

export const P3TA_SCENARIOS = indexBy(P3TA_WEEKS);
