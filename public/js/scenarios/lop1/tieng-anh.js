// ============================================================
// Lớp 1 · TIẾNG ANH (TỰ CHỌN) — 35 tuần (HK1: 1–18 · HK2: 19–35)
// Bám SGK tự chọn: i-Learn Smart Start / Family and Friends / KNTT.
// Trình độ rất cơ bản: nhận diện từ vựng quen thuộc, mẫu câu chào hỏi
// đơn giản, số đếm 1-10, màu sắc, gia đình, lớp học, con vật, đồ chơi…
// ID prefix: "P1TA-wNN-quiz".
// ============================================================
import { Q, W, indexBy } from './_helper.js';

const M = (n, title, qs, opts) => W('P1TA', 'tieng-anh', n, title, qs, opts);

export const P1TA_WEEKS = [
  // ──────────────── HK1 ────────────────
  M(1, 'Hello / Hi — Chào hỏi', [
    Q('"Hello" có nghĩa là?', ['Xin lỗi', 'Xin chào', 'Tạm biệt', 'Cảm ơn'], 1, 'Hello = Xin chào.', ['Sai — Xin lỗi là Sorry.', 'Đúng — Hello nghĩa là Xin chào.', 'Sai — Tạm biệt là Goodbye.', 'Sai — Cảm ơn là Thank you.']),
    Q('"Hi" có nghĩa là?', ['Vâng ạ (Yes)', 'Cảm ơn', 'Tạm biệt', 'Xin chào (thân mật)'], 3, 'Hi = chào (cách nói thân mật).', ['Sai — Vâng là Yes, không phải Hi.', 'Sai — Cảm ơn là Thank you.', 'Sai — Tạm biệt là Goodbye.', 'Đúng — Hi là cách chào thân mật.']),
    Q('Khi gặp bạn buổi sáng, em nói?', ['Sorry (Xin lỗi)', 'Good night (Chúc ngủ ngon)', 'Hi', 'Thank you (Cảm ơn)'], 2, 'Hi / Hello dùng để chào khi gặp nhau.', ['Sai — Sorry là xin lỗi.', 'Sai — Good night dùng khi đi ngủ.', 'Đúng — Gặp bạn thì nói Hi.', 'Sai — Thank you là cảm ơn.']),
    Q('"Hello, Lan!" nghĩa là?', ['Xin chào Lan', 'Tạm biệt Lan', 'Lan đâu', 'Lan ơi'], 0, 'Hello + tên = Xin chào (ai đó).', ['Đúng — Hello, Lan là Xin chào Lan.', 'Sai — Tạm biệt là Goodbye.', 'Sai — Hello không phải hỏi Lan đâu.', 'Sai — Hello là lời chào, không chỉ gọi tên.']),
    Q('Chọn từ chào hỏi:', ['Goodbye (Tạm biệt)', 'Sorry (Xin lỗi)', 'Hello', 'Thanks (Cảm ơn)'], 2, 'Hello là lời chào.', ['Sai — Goodbye là tạm biệt.', 'Sai — Sorry là xin lỗi.', 'Đúng — Hello là từ chào hỏi.', 'Sai — Thanks là cảm ơn.']),
    Q('Khi cô giáo vào lớp, em nói:', ['Hello, teacher!', 'Goodbye, teacher!', 'Sorry, teacher!', 'No, teacher!'], 0, 'Chào cô khi gặp.', ['Đúng — Gặp cô thì chào Hello.', 'Sai — Goodbye là tạm biệt, không phải lúc gặp.', 'Sai — Sorry là xin lỗi.', 'Sai — No là không, không phải lời chào.']),
  ]),

  M(2, 'Goodbye / Bye — Tạm biệt', [
    Q('"Goodbye" có nghĩa là?', ['Xin lỗi', 'Xin chào', 'Cảm ơn', 'Tạm biệt'], 3, 'Goodbye = Tạm biệt.', ['Sai — Xin lỗi là Sorry.', 'Sai — Xin chào là Hello.', 'Sai — Cảm ơn là Thank you.', 'Đúng — Goodbye nghĩa là Tạm biệt.']),
    Q('"Bye" là cách nói ngắn của?', ['Hi (Xin chào thân mật)', 'Good night (Chúc ngủ ngon)', 'Goodbye', 'Thanks'], 2, 'Bye = cách rút gọn của Goodbye.', ['Sai — Hi là lời chào khi gặp.', 'Sai — Good night dùng khi đi ngủ.', 'Đúng — Bye là cách nói ngắn của Goodbye.', 'Sai — Thanks là cảm ơn.']),
    Q('Khi tan học ra về, em nói với cô?', ['Goodbye', 'Good morning (Chào buổi sáng)', 'Hi (Xin chào)', 'Thank you (Cảm ơn)'], 0, 'Goodbye khi chia tay.', ['Đúng — Ra về thì chào Goodbye.', 'Sai — Good morning là chào buổi sáng khi gặp.', 'Sai — Hi dùng khi gặp, không phải khi về.', 'Sai — Thank you là cảm ơn.']),
    Q('"Bye bye!" nghĩa là?', ['Không sao', 'Cảm ơn', 'Xin chào', 'Tạm biệt nhé'], 3, 'Bye bye = tạm biệt (thân mật).', ['Sai — Không sao là Never mind.', 'Sai — Cảm ơn là Thank you.', 'Sai — Xin chào là Hello.', 'Đúng — Bye bye là Tạm biệt nhé.']),
    Q('"See you!" nghĩa là?', ['Cảm ơn', 'Xin chào', 'Xin lỗi', 'Hẹn gặp lại'], 3, 'See you = hẹn gặp lại.', ['Sai — Cảm ơn là Thank you.', 'Sai — Xin chào là Hello.', 'Sai — Xin lỗi là Sorry.', 'Đúng — See you là Hẹn gặp lại.']),
    Q('Đáp lại "Goodbye!" em có thể nói:', ['Goodbye! (Tạm biệt!)', 'Sorry!', 'Bye!', 'Hello!'], 2, 'Tạm biệt đáp tạm biệt.', ['Sai — Goodbye cũng được nhưng đây chọn cách thân mật hơn.', 'Sai — Sorry là xin lỗi.', 'Đúng — Đáp tạm biệt bằng Bye.', 'Sai — Hello dùng khi gặp, không phải khi chia tay.']),
  ]),

  M(3, 'Good morning / Good night', [
    Q('"Good morning" nghĩa là?', ['Chào buổi sáng', 'Chào buổi tối', 'Chúc ngủ ngon', 'Tạm biệt'], 0, 'Good morning = Chào buổi sáng.', ['Đúng — Good morning là Chào buổi sáng.', 'Sai — Chào buổi tối là Good evening.', 'Sai — Chúc ngủ ngon là Good night.', 'Sai — Tạm biệt là Goodbye.']),
    Q('"Good night" nghĩa là?', ['Xin chào', 'Chúc ngủ ngon', 'Chào buổi chiều', 'Chào buổi sáng'], 1, 'Good night = chúc ngủ ngon.', ['Sai — Xin chào là Hello.', 'Đúng — Good night là Chúc ngủ ngon.', 'Sai — Chào buổi chiều là Good afternoon.', 'Sai — Chào buổi sáng là Good morning.']),
    Q('"Good afternoon" nghĩa là?', ['Tạm biệt', 'Chào buổi chiều', 'Chào buổi sáng', 'Chúc ngon miệng'], 1, 'Good afternoon = chào buổi chiều.', ['Sai — Tạm biệt là Goodbye.', 'Đúng — Good afternoon là Chào buổi chiều.', 'Sai — Chào buổi sáng là Good morning.', 'Sai — Chúc ngon miệng là Enjoy your meal.']),
    Q('Buổi tối trước khi ngủ em nói với mẹ:', ['Good morning (Chào buổi sáng)', 'Good night', 'Good morning', 'Good afternoon (Chào buổi chiều)'], 1, 'Trước khi ngủ chúc good night.', ['Sai — Good morning là buổi sáng.', 'Đúng — Trước khi ngủ nói Good night.', 'Sai — Good morning là buổi sáng.', 'Sai — Good afternoon là buổi chiều.']),
    Q('Sáng đến lớp em nói với cô:', ['Goodbye', 'Good morning', 'Good afternoon (Chào buổi chiều)', 'Good night'], 1, 'Buổi sáng chào good morning.', ['Sai — Goodbye là tạm biệt.', 'Đúng — Buổi sáng chào Good morning.', 'Sai — Good afternoon là buổi chiều.', 'Sai — Good night dùng khi đi ngủ.']),
    Q('Buổi tối ăn cơm xong, em nói:', ['Hello morning', 'Night good', 'Good evening', 'Good morning'], 2, 'Good evening = chào buổi tối.', ['Sai — Hello morning không đúng.', 'Sai — Night good viết sai thứ tự.', 'Đúng — Good evening là Chào buổi tối.', 'Sai — Good morning là buổi sáng.']),
  ]),

  M(4, "What's your name? – I'm…", [
    Q('"What is your name?" hỏi điều gì?', ['Tên bạn là gì?', 'Bạn ở đâu?', 'Bạn khoẻ không?', 'Bạn mấy tuổi?'], 0, 'What is your name? = Tên bạn là gì?', ['Đúng — Câu này hỏi Tên bạn là gì.', 'Sai — Bạn ở đâu là Where are you?', 'Sai — Bạn khoẻ không là How are you?', 'Sai — Bạn mấy tuổi là How old are you?']),
    Q('Trả lời tên: "I ___ Nam."', ['is (là)', 'have (có)', 'am', 'are (là)'], 2, 'I am Nam = Tôi (tên) là Nam.', ['Sai — is đi với he/she/it, không đi với I.', 'Sai — have nghĩa là có, không hợp ở đây.', 'Đúng — I luôn đi với am.', 'Sai — are đi với you/we/they, không đi với I.']),
    Q('"My name is Lan." nghĩa là?', ['Tên tôi là Lan', 'Chào Lan', 'Lan ơi', 'Tôi là Lan'], 0, 'My name is = Tên tôi là.', ['Đúng — My name is Lan là Tên tôi là Lan.', 'Sai — Chào Lan là Hello Lan.', 'Sai — Câu này không phải gọi Lan ơi.', 'Sai — Tôi là Lan dịch hơi thiếu chữ "tên".']),
    Q('Cách viết tắt của "I am" là?', ['I am\'', 'I\'m', 'I\'am', 'Im (không dấu)'], 1, "I am = I'm.", ['Sai — không có dạng I am\'.', 'Đúng — I am viết tắt là I\'m.', 'Sai — không có dạng I\'am.', 'Sai — phải có dấu nháy: I\'m.']),
    Q('Bạn tên Bin, em viết: "My name is ___"', ['Bin', 'bin (không viết hoa)', 'BIN (viết hoa hết)', 'is Bin'], 0, 'Tên riêng viết hoa chữ đầu.', ['Đúng — Tên riêng viết hoa chữ đầu: Bin.', 'Sai — tên riêng phải viết hoa chữ đầu.', 'Sai — không viết hoa tất cả các chữ.', 'Sai — đã có "is" rồi, không viết lại.']),
    Q('"I\'m Lan." nghĩa là?', ['Bạn là Lan', 'Lan đâu', 'Lan ơi', 'Tôi là Lan'], 3, "I'm Lan = Tôi là Lan.", ['Sai — Bạn là Lan là You are Lan.', 'Sai — Lan đâu là Where is Lan?', 'Sai — Câu này không phải gọi Lan ơi.', 'Đúng — I\'m Lan là Tôi là Lan.']),
  ]),

  M(5, 'Numbers 1-5 — Số đếm 1 đến 5', [
    Q('"One" là số?', ['1', '2', '4', '3'], 0, 'One = 1.', ['Đúng — One là số 1.', 'Sai — 2 là two.', 'Sai — 4 là four.', 'Sai — 3 là three.']),
    Q('"Two" là số?', ['3', '1', '2', '5'], 2, 'Two = 2.', ['Sai — 3 là three.', 'Sai — 1 là one.', 'Đúng — Two là số 2.', 'Sai — 5 là five.']),
    Q('"Three" là số?', ['1', '4', '2', '3'], 3, 'Three = 3.', ['Sai — 1 là one.', 'Sai — 4 là four.', 'Sai — 2 là two.', 'Đúng — Three là số 3.']),
    Q('Số 4 tiếng Anh là?', ['Three (3)', 'Four', 'Five (5)', 'Forty (40)'], 1, 'Four = 4.', ['Sai — Three là số 3.', 'Đúng — Four là số 4.', 'Sai — Five là số 5.', 'Sai — Forty là 40, không phải 4.']),
    Q('Số 5 tiếng Anh là?', ['Four (4)', 'Five', 'Fifteen (15)', 'Fifty (50)'], 1, 'Five = 5.', ['Sai — Four là số 4.', 'Đúng — Five là số 5.', 'Sai — Fifteen là 15, không phải 5.', 'Sai — Fifty là 50, không phải 5.']),
    Q('Sắp đúng thứ tự: one – ___ – three', ['second (thứ hai)', 'twelve (12)', 'two', 'too (cũng)'], 2, '1 – 2 – 3 = one – two – three.', ['Sai — second là thứ hai, không phải số đếm 2.', 'Sai — twelve là 12.', 'Đúng — Giữa one và three là two.', 'Sai — too nghĩa là cũng, không phải số.']),
  ]),

  M(6, 'Numbers 6-10 — Số đếm 6 đến 10', [
    Q('"Six" là số?', ['6', '7', '5', '8'], 0, 'Six = 6.', ['Đúng — Six là số 6.', 'Sai — 7 là seven.', 'Sai — 5 là five.', 'Sai — 8 là eight.']),
    Q('"Seven" là số?', ['8', '7', '9', '6'], 1, 'Seven = 7.', ['Sai — 8 là eight.', 'Đúng — Seven là số 7.', 'Sai — 9 là nine.', 'Sai — 6 là six.']),
    Q('Số 8 tiếng Anh là?', ['Eight', 'Seven (7)', 'Eighteen (18)', 'Eighty (80)'], 0, 'Eight = 8.', ['Đúng — Eight là số 8.', 'Sai — Seven là số 7.', 'Sai — Eighteen là 18, không phải 8.', 'Sai — Eighty là 80, không phải 8.']),
    Q('"Nine" là số?', ['7', '10', '8', '9'], 3, 'Nine = 9.', ['Sai — 7 là seven.', 'Sai — 10 là ten.', 'Sai — 8 là eight.', 'Đúng — Nine là số 9.']),
    Q('Số 10 tiếng Anh là?', ['Tan (không phải số)', 'Twelve (12)', 'Tenth (thứ 10)', 'Ten'], 3, 'Ten = 10.', ['Sai — Tan không phải là số.', 'Sai — Twelve là 12, không phải 10.', 'Sai — Tenth là thứ 10, không phải số đếm.', 'Đúng — Ten là số 10.']),
    Q('Đếm: six, seven, ___, nine', ['ate (đã ăn)', 'eighty (80)', 'eighteen (18)', 'eight'], 3, '6 – 7 – 8 – 9 → eight.', ['Sai — ate nghĩa là đã ăn, không phải số.', 'Sai — eighty là 80.', 'Sai — eighteen là 18.', 'Đúng — Giữa seven và nine là eight (8).']),
  ]),

  M(7, 'How many? — Hỏi số lượng', [
    Q('"How many?" hỏi điều gì?', ['Bao nhiêu?', 'Ở đâu?', 'Cái gì?', 'Khi nào? (When?)'], 0, 'How many = bao nhiêu (đếm).', ['Đúng — How many hỏi số lượng: Bao nhiêu.', 'Sai — Ở đâu là Where.', 'Sai — Cái gì là What.', 'Sai — Khi nào là When.']),
    Q('"How many books?" nghĩa là?', ['Bao nhiêu quyển sách?', 'Sách của ai?', 'Sách ở đâu?', 'Sách màu gì?'], 0, 'How many books = Bao nhiêu sách.', ['Đúng — Hỏi số lượng sách: Bao nhiêu quyển sách.', 'Sai — Sách của ai là Whose books.', 'Sai — Sách ở đâu là Where are the books.', 'Sai — Sách màu gì là What color.']),
    Q('Có 3 quả bóng → "___ balls"', ['Tree (Cây)', 'Third (Thứ ba)', 'Threes (sai số nhiều)', 'Three'], 3, '3 = three.', ['Sai — Tree là cây, không phải số 3.', 'Sai — Third là thứ ba, không phải số đếm.', 'Sai — số three không thêm "s".', 'Đúng — 3 là three.']),
    Q('Trả lời số lượng "How many cats?" – có 2 con:', ['Two', 'Twos (sai số nhiều)', 'Too (cũng)', 'To (đến)'], 0, '2 cats = two.', ['Đúng — 2 con là two.', 'Sai — số two không thêm "s".', 'Sai — Too nghĩa là cũng.', 'Sai — To nghĩa là đến/tới.']),
    Q('Có 5 cây bút chì → "Five ___"', ['a pencil', 'pencil\'s (sở hữu)', 'pencil', 'pencils'], 3, 'Nhiều hơn 1 → thêm "s".', ['Sai — không dùng "a" khi có nhiều cái.', 'Sai — pencil\'s là sở hữu, không phải số nhiều.', 'Sai — nhiều bút phải thêm "s".', 'Đúng — 5 bút thì thêm "s": pencils.']),
    Q('Một quả táo viết là?', ['An apple', 'An apples', 'A apple', 'Apples'], 0, 'Apple bắt đầu bằng nguyên âm → an.', ['Đúng — Apple bắt đầu bằng nguyên âm nên dùng "an".', 'Sai — "an" đi với một cái, không thêm "s".', 'Sai — trước nguyên âm dùng "an", không dùng "a".', 'Sai — apples là nhiều quả, không phải một quả.']),
  ]),

  M(8, 'Colors (1) — Đỏ, xanh, vàng', [
    Q('"Red" là màu gì?', ['Màu hồng', 'Đỏ', 'Xanh dương', 'Màu cam'], 1, 'Red = màu đỏ.', ['Sai — Màu hồng là pink.', 'Đúng — Red là màu đỏ.', 'Sai — Xanh dương là blue.', 'Sai — Màu cam là orange.']),
    Q('"Blue" là màu gì?', ['Xanh dương', 'Xanh lá', 'Màu đen', 'Màu tím'], 0, 'Blue = xanh dương.', ['Đúng — Blue là màu xanh dương.', 'Sai — Xanh lá là green.', 'Sai — Màu đen là black.', 'Sai — Màu tím là purple.']),
    Q('"Yellow" là màu gì?', ['Vàng', 'Màu cam', 'Màu nâu', 'Màu xanh lá'], 0, 'Yellow = màu vàng.', ['Đúng — Yellow là màu vàng.', 'Sai — Màu cam là orange.', 'Sai — Màu nâu là brown.', 'Sai — Màu xanh lá là green.']),
    Q('Mặt trời thường có màu?', ['White (Trắng)', 'Green (Xanh lá)', 'Red (Đỏ)', 'Yellow'], 3, 'Mặt trời = yellow.', ['Sai — White là trắng, không phải màu mặt trời.', 'Sai — Green là xanh lá.', 'Sai — Red là đỏ.', 'Đúng — Mặt trời màu vàng (yellow).']),
    Q('Quả cà chua chín có màu?', ['Orange (Cam)', 'Red', 'Yellow', 'Pink (Hồng)'], 1, 'Cà chua chín = red.', ['Sai — Orange là cam.', 'Đúng — Cà chua chín màu đỏ (red).', 'Sai — Yellow là vàng.', 'Sai — Pink là hồng.']),
    Q('Bầu trời ban ngày có màu?', ['White (Trắng)', 'Yellow', 'Blue', 'Green (Xanh lá)'], 2, 'Bầu trời = blue.', ['Sai — White là trắng.', 'Sai — Yellow là vàng.', 'Đúng — Bầu trời màu xanh dương (blue).', 'Sai — Green là xanh lá.']),
  ]),

  M(9, 'Colors (2) — Xanh lá, đen, trắng, hồng', [
    Q('"Green" là màu gì?', ['Xanh dương', 'Màu cam', 'Xanh lá', 'Màu nâu'], 2, 'Green = xanh lá cây.', ['Sai — Xanh dương là blue.', 'Sai — Màu cam là orange.', 'Đúng — Green là màu xanh lá.', 'Sai — Màu nâu là brown.']),
    Q('"Black" là màu gì?', ['Màu hồng', 'Màu tím', 'Đen', 'Màu cam'], 2, 'Black = màu đen.', ['Sai — Màu hồng là pink.', 'Sai — Màu tím là purple.', 'Đúng — Black là màu đen.', 'Sai — Màu cam là orange.']),
    Q('"White" là màu gì?', ['Màu hồng', 'Trắng', 'Màu xám', 'Màu xanh lá'], 1, 'White = màu trắng.', ['Sai — Màu hồng là pink.', 'Đúng — White là màu trắng.', 'Sai — Màu xám là grey.', 'Sai — Màu xanh lá là green.']),
    Q('"Pink" là màu gì?', ['Màu trắng', 'Màu vàng', 'Màu xanh lá', 'Hồng'], 3, 'Pink = màu hồng.', ['Sai — Màu trắng là white.', 'Sai — Màu vàng là yellow.', 'Sai — Màu xanh lá là green.', 'Đúng — Pink là màu hồng.']),
    Q('Lá cây thường có màu?', ['Purple', 'Yellow (Vàng)', 'Green', 'Brown (Nâu)'], 2, 'Lá cây = green.', ['Sai — Purple là tím.', 'Sai — Yellow là vàng.', 'Đúng — Lá cây màu xanh lá (green).', 'Sai — Brown là nâu.']),
    Q('"What color is it?" hỏi gì?', ['Nó màu gì?', 'Ở đâu?', 'Cái gì đây?', 'Bao nhiêu?'], 0, 'What color = màu gì.', ['Đúng — What color hỏi Nó màu gì.', 'Sai — Ở đâu là Where.', 'Sai — Cái gì đây là What is this.', 'Sai — Bao nhiêu là How many.']),
  ]),

  M(10, 'Family (1) — Mum / Dad', [
    Q('"Mum" (Mom) có nghĩa là?', ['Bố (Dad)', 'Cô giáo (Teacher)', 'Mẹ', 'Em gái (Sister)'], 2, 'Mum / Mom = mẹ.', ['Sai — Bố là Dad.', 'Sai — Cô giáo là teacher.', 'Đúng — Mum / Mom là mẹ.', 'Sai — Em gái là sister.']),
    Q('"Dad" có nghĩa là?', ['Em trai (Brother)', 'Anh trai (Brother)', 'Chú (Uncle)', 'Bố'], 3, 'Dad = bố / cha.', ['Sai — Em trai là brother.', 'Sai — Anh trai là brother.', 'Sai — Chú là uncle.', 'Đúng — Dad là bố / cha.']),
    Q('"Mother" có nghĩa là?', ['Bà (Grandma)', 'Chị gái (Sister)', 'Em gái (Sister)', 'Mẹ'], 3, 'Mother = mẹ (trang trọng).', ['Sai — Bà là grandma.', 'Sai — Chị gái là sister.', 'Sai — Em gái là sister.', 'Đúng — Mother là mẹ (cách nói trang trọng).']),
    Q('"Father" có nghĩa là?', ['Ông (Grandpa)', 'Bố', 'Anh trai (Brother)', 'Em trai (Brother)'], 1, 'Father = bố (trang trọng).', ['Sai — Ông là grandpa.', 'Đúng — Father là bố (cách nói trang trọng).', 'Sai — Anh trai là brother.', 'Sai — Em trai là brother.']),
    Q('"This is my mum." nghĩa là?', ['Đây là mẹ tôi', 'Tôi yêu mẹ', 'Đây là bố tôi', 'Đây là cô tôi'], 0, 'This is my mum = Đây là mẹ tôi.', ['Đúng — This is my mum là Đây là mẹ tôi.', 'Sai — Tôi yêu mẹ là I love my mum.', 'Sai — mum là mẹ, không phải bố.', 'Sai — mum là mẹ, không phải cô.']),
    Q('Cách gọi thân mật bố là?', ['Dad / Daddy', 'Mum / Mummy', 'Grandpa', 'Brother'], 0, 'Dad / Daddy = bố (thân mật).', ['Đúng — Dad / Daddy là cách gọi bố thân mật.', 'Sai — Mum / Mummy là mẹ.', 'Sai — Grandpa là ông.', 'Sai — Brother là anh / em trai.']),
  ]),

  M(11, 'Family (2) — Brother / Sister / Baby', [
    Q('"Brother" có nghĩa là?', ['Em bé (Baby)', 'Anh/em trai', 'Chị/em gái', 'Bạn cùng lớp'], 1, 'Brother = anh / em trai.', ['Sai — Em bé là baby.', 'Đúng — Brother là anh / em trai.', 'Sai — Chị / em gái là sister.', 'Sai — Bạn cùng lớp là classmate.']),
    Q('"Sister" có nghĩa là?', ['Em trai (Brother)', 'Em bé (Baby)', 'Anh/em trai', 'Chị/em gái'], 3, 'Sister = chị / em gái.', ['Sai — Em trai là brother.', 'Sai — Em bé là baby.', 'Sai — Anh / em trai là brother.', 'Đúng — Sister là chị / em gái.']),
    Q('"Baby" có nghĩa là?', ['Mẹ (Mother)', 'Anh trai', 'Em bé', 'Bạn (Friend)'], 2, 'Baby = em bé.', ['Sai — Mẹ là mother.', 'Sai — Anh trai là brother.', 'Đúng — Baby là em bé.', 'Sai — Bạn là friend.']),
    Q('"Grandma" có nghĩa là?', ['Mẹ (Mother)', 'Chị gái (Sister)', 'Em gái (Sister)', 'Bà'], 3, 'Grandma = bà.', ['Sai — Mẹ là mother.', 'Sai — Chị gái là sister.', 'Sai — Em gái là sister.', 'Đúng — Grandma là bà.']),
    Q('"Grandpa" có nghĩa là?', ['Ông', 'Bà (Grandma)', 'Anh trai (Brother)', 'Em trai (Brother)'], 0, 'Grandpa = ông.', ['Đúng — Grandpa là ông.', 'Sai — Bà là grandma.', 'Sai — Anh trai là brother.', 'Sai — Em trai là brother.']),
    Q('"My family" nghĩa là?', ['Bạn tôi', 'Trường tôi', 'Lớp tôi', 'Gia đình tôi'], 3, 'Family = gia đình.', ['Sai — Bạn tôi là my friend.', 'Sai — Trường tôi là my school.', 'Sai — Lớp tôi là my class.', 'Đúng — My family là gia đình tôi.']),
  ]),

  M(12, 'Classroom things (1) — Book, pen, pencil', [
    Q('"Book" có nghĩa là?', ['Sách', 'Vở viết', 'Bút mực', 'Cặp sách'], 0, 'Book = sách.', ['Đúng — Book là sách.', 'Sai — Vở viết là notebook.', 'Sai — Bút mực là pen.', 'Sai — Cặp sách là bag.']),
    Q('"Pen" có nghĩa là?', ['Quyển vở', 'Cái cặp', 'Bút chì', 'Bút mực / bút bi'], 3, 'Pen = bút mực / bút bi.', ['Sai — Quyển vở là notebook.', 'Sai — Cái cặp là bag.', 'Sai — Bút chì là pencil.', 'Đúng — Pen là bút mực / bút bi.']),
    Q('"Pencil" có nghĩa là?', ['Bút mực', 'Cái cặp', 'Quyển vở', 'Bút chì'], 3, 'Pencil = bút chì.', ['Sai — Bút mực là pen.', 'Sai — Cái cặp là bag.', 'Sai — Quyển vở là notebook.', 'Đúng — Pencil là bút chì.']),
    Q('Em đọc bằng?', ['Book', 'Cặp sách', 'Pencil', 'Bút mực'], 0, 'Em đọc sách = book.', ['Đúng — Em đọc sách (book).', 'Sai — Cặp sách để đựng đồ, không phải để đọc.', 'Sai — Pencil là bút chì, dùng để viết.', 'Sai — Bút mực dùng để viết, không phải để đọc.']),
    Q('"A red pen" nghĩa là?', ['Một bút chì đỏ', 'Một cây bút đỏ', 'Một cái cặp đỏ', 'Một quyển sách đỏ'], 1, 'A red pen = một cây bút đỏ.', ['Sai — bút chì là pencil, không phải pen.', 'Đúng — A red pen là một cây bút đỏ.', 'Sai — cái cặp là bag.', 'Sai — quyển sách là book.']),
    Q('"Two books" nghĩa là?', ['Một quyển sách', 'Hai cục tẩy', 'Hai quyển sách', 'Hai cây bút'], 2, 'Two books = hai quyển sách.', ['Sai — two là hai, không phải một.', 'Sai — cục tẩy là eraser, không phải book.', 'Đúng — Two books là hai quyển sách.', 'Sai — cây bút là pen, không phải book.']),
  ]),

  M(13, 'Classroom things (2) — Bag, chair, desk', [
    Q('"Bag" có nghĩa là?', ['Cái ghế', 'Cái bảng', 'Cái cặp', 'Cái bàn'], 2, 'Bag = cái cặp / túi.', ['Sai — Cái ghế là chair.', 'Sai — Cái bảng là board.', 'Đúng — Bag là cái cặp / túi.', 'Sai — Cái bàn là desk.']),
    Q('"Chair" có nghĩa là?', ['Cái bàn', 'Cái ghế', 'Cái bảng', 'Cái tủ'], 1, 'Chair = cái ghế.', ['Sai — Cái bàn là desk.', 'Đúng — Chair là cái ghế.', 'Sai — Cái bảng là board.', 'Sai — Cái tủ là cupboard.']),
    Q('"Desk" có nghĩa là?', ['Cái ghế', 'Cái bàn (học)', 'Cái bảng', 'Cái cặp'], 1, 'Desk = cái bàn học.', ['Sai — Cái ghế là chair.', 'Đúng — Desk là cái bàn học.', 'Sai — Cái bảng là board.', 'Sai — Cái cặp là bag.']),
    Q('Em ngồi trên?', ['Book (Cặp)', 'Chair', 'Desk (Bàn học)', 'Board (Bảng)'], 1, 'Ngồi trên ghế = chair.', ['Sai — Book là sách, không phải để ngồi.', 'Đúng — Em ngồi trên ghế (chair).', 'Sai — Desk là bàn học, không phải để ngồi.', 'Sai — Board là bảng.']),
    Q('"Schoolbag" là gì?', ['Cái cặp', 'Cái bảng', 'Quyển sách', 'Cái bàn'], 0, 'Schoolbag = cặp đi học.', ['Đúng — Schoolbag là cái cặp đi học.', 'Sai — Cái bảng là board.', 'Sai — Quyển sách là book.', 'Sai — Cái bàn là desk.']),
    Q('"Open your book." nghĩa là?', ['Đóng sách lại', 'Cất sách', 'Mở sách ra', 'Đọc to'], 2, 'Open = mở.', ['Sai — Đóng sách là close your book.', 'Sai — Cất sách là put away your book.', 'Đúng — Open là mở: Mở sách ra.', 'Sai — Đọc to là read aloud.']),
  ]),

  M(14, 'My body (1) — Head, eyes, nose, mouth', [
    Q('"Head" có nghĩa là?', ['Cái tai', 'Vai (Shoulder)', 'Đầu', 'Cổ (Neck)'], 2, 'Head = đầu.', ['Sai — Cái tai là ear.', 'Sai — Vai là shoulder.', 'Đúng — Head là đầu.', 'Sai — Cổ là neck.']),
    Q('"Eyes" có nghĩa là?', ['Lông mày', 'Lông mi', 'Trán (Forehead)', 'Mắt'], 3, 'Eyes = (đôi) mắt.', ['Sai — Lông mày là eyebrows.', 'Sai — Lông mi là eyelashes.', 'Sai — Trán là forehead.', 'Đúng — Eyes là (đôi) mắt.']),
    Q('"Nose" có nghĩa là?', ['Cằm (Chin)', 'Má (Cheek)', 'Trán (Forehead)', 'Mũi'], 3, 'Nose = mũi.', ['Sai — Cằm là chin.', 'Sai — Má là cheek.', 'Sai — Trán là forehead.', 'Đúng — Nose là mũi.']),
    Q('"Mouth" có nghĩa là?', ['Miệng', 'Môi (Lips)', 'Má (Cheek)', 'Cằm (Chin)'], 0, 'Mouth = miệng.', ['Đúng — Mouth là miệng.', 'Sai — Môi là lips.', 'Sai — Má là cheek.', 'Sai — Cằm là chin.']),
    Q('Em ngửi bằng?', ['Mouth (Miệng)', 'Hand (Tay)', 'Nose', 'Ears (Tai)'], 2, 'Ngửi bằng mũi = nose.', ['Sai — Mouth là miệng, dùng để ăn nói.', 'Sai — Hand là tay.', 'Đúng — Em ngửi bằng mũi (nose).', 'Sai — Ears là tai, dùng để nghe.']),
    Q('Em nhìn bằng?', ['Mouth (Miệng)', 'Nose (Mũi)', 'Hands (Tay)', 'Eyes'], 3, 'Nhìn bằng mắt = eyes.', ['Sai — Mouth là miệng.', 'Sai — Nose là mũi, dùng để ngửi.', 'Sai — Hands là tay.', 'Đúng — Em nhìn bằng mắt (eyes).']),
  ]),

  M(15, 'My body (2) — Hand, foot, ears', [
    Q('"Hand" có nghĩa là?', ['Ngón tay', 'Cánh tay', 'Bàn tay', 'Cổ tay'], 2, 'Hand = bàn tay.', ['Sai — Ngón tay là finger.', 'Sai — Cánh tay là arm.', 'Đúng — Hand là bàn tay.', 'Sai — Cổ tay là wrist.']),
    Q('"Foot" có nghĩa là?', ['Bàn tay', 'Đầu gối', 'Cánh tay', 'Bàn chân'], 3, 'Foot = bàn chân.', ['Sai — Bàn tay là hand.', 'Sai — Đầu gối là knee.', 'Sai — Cánh tay là arm.', 'Đúng — Foot là bàn chân.']),
    Q('"Ears" có nghĩa là?', ['Cổ (Neck)', 'Má (Cheek)', 'Tai', 'Tóc (Hair)'], 2, 'Ears = (đôi) tai.', ['Sai — Cổ là neck.', 'Sai — Má là cheek.', 'Đúng — Ears là (đôi) tai.', 'Sai — Tóc là hair.']),
    Q('Em viết bằng?', ['Eyes (Mắt)', 'Mouth (Miệng)', 'Nose (Mũi)', 'Hand'], 3, 'Viết bằng tay = hand.', ['Sai — Eyes là mắt, dùng để nhìn.', 'Sai — Mouth là miệng.', 'Sai — Nose là mũi.', 'Đúng — Em viết bằng tay (hand).']),
    Q('Em nghe bằng?', ['Hands (Tay)', 'Feet (Chân)', 'Head (Đầu)', 'Ears'], 3, 'Nghe bằng tai = ears.', ['Sai — Hands là tay, dùng để viết.', 'Sai — Feet là chân, dùng để đi.', 'Sai — Head là đầu.', 'Đúng — Em nghe bằng tai (ears).']),
    Q('Em đi bằng?', ['Ears (Tai)', 'Mouth (Miệng)', 'Nose (Mũi)', 'Feet'], 3, 'Đi bằng chân = feet (số nhiều của foot).', ['Sai — Ears là tai, dùng để nghe.', 'Sai — Mouth là miệng.', 'Sai — Nose là mũi.', 'Đúng — Em đi bằng chân (feet).']),
  ]),

  M(16, 'Toys (1) — Ball, doll, car', [
    Q('"Ball" có nghĩa là?', ['Búp bê', 'Quả bóng', 'Xe đạp', 'Máy bay'], 1, 'Ball = quả bóng.', ['Sai — Búp bê là doll.', 'Đúng — Ball là quả bóng.', 'Sai — Xe đạp là bike.', 'Sai — Máy bay là plane.']),
    Q('"Doll" có nghĩa là?', ['Gấu bông', 'Diều (Kite)', 'Robot', 'Búp bê'], 3, 'Doll = búp bê.', ['Sai — Gấu bông là teddy bear.', 'Sai — Diều là kite.', 'Sai — Robot là rô-bốt.', 'Đúng — Doll là búp bê.']),
    Q('"Car" (đồ chơi) có nghĩa là?', ['Xe đạp', 'Ô tô', 'Búp bê', 'Máy bay'], 1, 'Car = ô tô.', ['Sai — Xe đạp là bike.', 'Đúng — Car là ô tô.', 'Sai — Búp bê là doll.', 'Sai — Máy bay là plane.']),
    Q('"Teddy bear" là?', ['Búp bê', 'Gấu bông', 'Quả bóng', 'Con rô-bốt'], 1, 'Teddy bear = gấu bông.', ['Sai — Búp bê là doll.', 'Đúng — Teddy bear là gấu bông.', 'Sai — Quả bóng là ball.', 'Sai — Con rô-bốt là robot.']),
    Q('"My toy" nghĩa là?', ['Sách của tôi', 'Bạn của tôi', 'Đồ chơi của tôi', 'Mèo của tôi'], 2, 'My toy = đồ chơi của tôi.', ['Sai — Sách của tôi là my book.', 'Sai — Bạn của tôi là my friend.', 'Đúng — My toy là đồ chơi của tôi.', 'Sai — Mèo của tôi là my cat.']),
    Q('"I have a doll." nghĩa là?', ['Búp bê của tôi đẹp', 'Cho tôi búp bê', 'Tôi có một búp bê', 'Tôi thích búp bê'], 2, 'I have = Tôi có.', ['Sai — câu này nói "có", không khen đẹp.', 'Sai — Cho tôi là give me.', 'Đúng — I have là Tôi có một búp bê.', 'Sai — Tôi thích là I like.']),
  ]),

  M(17, 'Toys (2) — Kite, plane, train', [
    Q('"Kite" có nghĩa là?', ['Quả bóng', 'Cái diều', 'Búp bê', 'Cái bóng'], 1, 'Kite = con diều.', ['Sai — Quả bóng là ball.', 'Đúng — Kite là con diều.', 'Sai — Búp bê là doll.', 'Sai — Cái bóng (in trên đất) là shadow.']),
    Q('"Plane" có nghĩa là?', ['Thuyền', 'Máy bay', 'Tàu hoả', 'Thuyền (Boat)'], 1, 'Plane = máy bay.', ['Sai — Thuyền là boat.', 'Đúng — Plane là máy bay.', 'Sai — Tàu hoả là train.', 'Sai — Thuyền là boat.']),
    Q('"Train" có nghĩa là?', ['Máy bay', 'Tàu hoả', 'Xe đạp', 'Tàu thuỷ'], 1, 'Train = tàu hoả.', ['Sai — Máy bay là plane.', 'Đúng — Train là tàu hoả.', 'Sai — Xe đạp là bike.', 'Sai — Tàu thuỷ là ship.']),
    Q('"Boat" có nghĩa là?', ['Cái diều', 'Máy bay', 'Tàu hoả', 'Thuyền'], 3, 'Boat = thuyền.', ['Sai — Cái diều là kite.', 'Sai — Máy bay là plane.', 'Sai — Tàu hoả là train.', 'Đúng — Boat là thuyền.']),
    Q('Đồ chơi bay được trên trời:', ['Doll (Búp bê)', 'Car (Ô tô)', 'Ball (Bóng)', 'Kite'], 3, 'Diều bay trên trời.', ['Sai — Doll là búp bê, không bay được.', 'Sai — Car là ô tô, chạy dưới đất.', 'Sai — Ball là bóng, lăn dưới đất.', 'Đúng — Kite (diều) bay trên trời.']),
    Q('"Look! A red kite!" nghĩa là?', ['Một con diều bay', 'Bóng đỏ', 'Mèo đỏ', 'Nhìn kìa! Một cái diều đỏ!'], 3, 'Look = nhìn kìa.', ['Sai — câu này có chữ "Look" (nhìn kìa) và màu đỏ.', 'Sai — kite là diều, không phải bóng.', 'Sai — kite là diều, không phải mèo.', 'Đúng — Look! A red kite! là Nhìn kìa! Một cái diều đỏ!']),
  ]),

  M(18, 'Review HK1 — Ôn tập học kỳ 1', [
    Q('"Hello, my name is Bin." nghĩa là?', ['Tạm biệt Bin', 'Xin chào, tôi tên Bin', 'Bin đâu rồi', 'Bin khoẻ không'], 1, 'Hello + My name is = Xin chào, tôi tên là...', ['Sai — Tạm biệt là Goodbye, không phải Hello.', 'Đúng — Hello + My name is Bin là Xin chào, tôi tên Bin.', 'Sai — Bin đâu rồi là Where is Bin.', 'Sai — Bin khoẻ không là How are you.']),
    Q('Số 7 tiếng Anh là?', ['Six (6)', 'Seven', 'Eleven (11)', 'Seventy (70)'], 1, 'Seven = 7.', ['Sai — Six là số 6.', 'Đúng — Seven là số 7.', 'Sai — Eleven là 11.', 'Sai — Seventy là 70.']),
    Q('"Red" là màu?', ['Đỏ', 'Màu xanh dương', 'Màu tím', 'Màu vàng'], 0, 'Red = đỏ.', ['Đúng — Red là màu đỏ.', 'Sai — Màu xanh dương là blue.', 'Sai — Màu tím là purple.', 'Sai — Màu vàng là yellow.']),
    Q('"Mum" có nghĩa là?', ['Bố (Dad)', 'Anh trai (Brother)', 'Mẹ', 'Bà (Grandma)'], 2, 'Mum = mẹ.', ['Sai — Bố là Dad.', 'Sai — Anh trai là brother.', 'Đúng — Mum là mẹ.', 'Sai — Bà là grandma.']),
    Q('Em viết bằng?', ['Nose (Mũi)', 'Foot (Bàn chân)', 'Hand', 'Eye (Mắt)'], 2, 'Viết bằng tay = hand.', ['Sai — Nose là mũi, dùng để ngửi.', 'Sai — Foot là chân, dùng để đi.', 'Đúng — Em viết bằng tay (hand).', 'Sai — Eye là mắt, dùng để nhìn.']),
    Q('"This is my ball." nghĩa là?', ['Kia là bóng', 'Bóng đâu', 'Tôi chơi bóng', 'Đây là quả bóng của tôi'], 3, 'This is my ball = Đây là quả bóng của tôi.', ['Sai — This là "đây" (gần), không phải "kia".', 'Sai — Bóng đâu là Where is the ball.', 'Sai — Tôi chơi bóng là I play ball.', 'Đúng — This is my ball là Đây là quả bóng của tôi.']),
    Q('"Goodbye!" nghĩa là?', ['Cảm ơn', 'Tạm biệt', 'Xin lỗi', 'Xin chào'], 1, 'Goodbye = tạm biệt.', ['Sai — Cảm ơn là Thank you.', 'Đúng — Goodbye là tạm biệt.', 'Sai — Xin lỗi là Sorry.', 'Sai — Xin chào là Hello.']),
    Q('Số 10 tiếng Anh là?', ['Ten', 'Eleven (11)', 'Twelve', 'Twenty (20)'], 0, 'Ten = 10.', ['Đúng — Ten là số 10.', 'Sai — Eleven là 11.', 'Sai — Twelve là 12.', 'Sai — Twenty là 20.']),
  ], { difficulty: 2 }),

  // ──────────────── HK2 ────────────────
  M(19, 'Animals (1) — Cat, dog, fish, bird', [
    Q('"Cat" có nghĩa là?', ['Con chim', 'Con chó', 'Con cá', 'Con mèo'], 3, 'Cat = con mèo.', ['Sai — Con chim là bird.', 'Sai — Con chó là dog.', 'Sai — Con cá là fish.', 'Đúng — Cat là con mèo.']),
    Q('"Dog" có nghĩa là?', ['Con mèo', 'Con chó', 'Con cá', 'Con voi'], 1, 'Dog = con chó.', ['Sai — Con mèo là cat.', 'Đúng — Dog là con chó.', 'Sai — Con cá là fish.', 'Sai — Con voi là elephant.']),
    Q('"Fish" có nghĩa là?', ['Con mèo', 'Con cua', 'Con cá', 'Con chim'], 2, 'Fish = con cá.', ['Sai — Con mèo là cat.', 'Sai — Con cua là crab.', 'Đúng — Fish là con cá.', 'Sai — Con chim là bird.']),
    Q('"Bird" có nghĩa là?', ['Con chim', 'Con cá', 'Con chó', 'Con bò'], 0, 'Bird = con chim.', ['Đúng — Bird là con chim.', 'Sai — Con cá là fish.', 'Sai — Con chó là dog.', 'Sai — Con bò là cow.']),
    Q('Con vật nào biết bay?', ['Cat (Mèo)', 'Fish (Cá)', 'Dog (Chó)', 'Bird'], 3, 'Bird (chim) biết bay.', ['Sai — Mèo không biết bay.', 'Sai — Cá bơi dưới nước, không bay.', 'Sai — Chó không biết bay.', 'Đúng — Bird (chim) biết bay.']),
    Q('"I have a cat." nghĩa là?', ['Tôi thích mèo', 'Mèo đẹp', 'Tôi có một con mèo', 'Tôi nuôi mèo'], 2, 'I have = Tôi có.', ['Sai — Tôi thích là I like.', 'Sai — câu này nói "có", không khen đẹp.', 'Đúng — I have a cat là Tôi có một con mèo.', 'Sai — have ở đây là "có", không phải "nuôi".']),
  ]),

  M(20, 'Animals (2) — Cow, pig, hen, duck', [
    Q('"Cow" có nghĩa là?', ['Con vịt', 'Con bò', 'Con heo', 'Con gà'], 1, 'Cow = con bò.', ['Sai — Con vịt là duck.', 'Đúng — Cow là con bò.', 'Sai — Con heo là pig.', 'Sai — Con gà là hen.']),
    Q('"Pig" có nghĩa là?', ['Con vịt', 'Con gà', 'Con heo', 'Con bò'], 2, 'Pig = con heo / lợn.', ['Sai — Con vịt là duck.', 'Sai — Con gà là hen.', 'Đúng — Pig là con heo / lợn.', 'Sai — Con bò là cow.']),
    Q('"Hen" có nghĩa là?', ['Con bò', 'Con gà mái', 'Con vịt', 'Con thỏ'], 1, 'Hen = con gà mái.', ['Sai — Con bò là cow.', 'Đúng — Hen là con gà mái.', 'Sai — Con vịt là duck.', 'Sai — Con thỏ là rabbit.']),
    Q('"Duck" có nghĩa là?', ['Con ngỗng', 'Con gà', 'Con vịt', 'Con heo'], 2, 'Duck = con vịt.', ['Sai — Con ngỗng là goose.', 'Sai — Con gà là hen.', 'Đúng — Duck là con vịt.', 'Sai — Con heo là pig.']),
    Q('Con vật cho ta sữa?', ['Duck (Vịt)', 'Hen (Gà mái)', 'Cow', 'Pig (Lợn)'], 2, 'Cow (bò) cho sữa.', ['Sai — Vịt không cho sữa.', 'Sai — Gà mái đẻ trứng, không cho sữa.', 'Đúng — Cow (bò) cho sữa.', 'Sai — Lợn không cho sữa.']),
    Q('Con vật đẻ trứng:', ['Hen', 'Cow (Bò)', 'Dog (Chó)', 'Pig (Lợn)'], 0, 'Hen (gà mái) đẻ trứng.', ['Đúng — Hen (gà mái) đẻ trứng.', 'Sai — Bò cho sữa, không đẻ trứng.', 'Sai — Chó không đẻ trứng.', 'Sai — Lợn không đẻ trứng.']),
  ]),

  M(21, 'Big animals — Elephant, tiger, monkey', [
    Q('"Elephant" có nghĩa là?', ['Con khỉ', 'Con voi', 'Con ngựa', 'Con hươu'], 1, 'Elephant = con voi.', ['Sai — Con khỉ là monkey.', 'Đúng — Elephant là con voi.', 'Sai — Con ngựa là horse.', 'Sai — Con hươu là deer.']),
    Q('"Tiger" có nghĩa là?', ['Con hổ', 'Con sư tử', 'Con báo', 'Con gấu'], 0, 'Tiger = con hổ.', ['Đúng — Tiger là con hổ.', 'Sai — Con sư tử là lion.', 'Sai — Con báo là leopard.', 'Sai — Con gấu là bear.']),
    Q('"Monkey" có nghĩa là?', ['Con khỉ', 'Con voi', 'Con gấu', 'Con cọp'], 0, 'Monkey = con khỉ.', ['Đúng — Monkey là con khỉ.', 'Sai — Con voi là elephant.', 'Sai — Con gấu là bear.', 'Sai — Con cọp (hổ) là tiger.']),
    Q('"Lion" có nghĩa là?', ['Con gấu', 'Sư tử', 'Con hổ', 'Con voi'], 1, 'Lion = con sư tử.', ['Sai — Con gấu là bear.', 'Đúng — Lion là con sư tử.', 'Sai — Con hổ là tiger.', 'Sai — Con voi là elephant.']),
    Q('Con vật to nhất trong các con:', ['Cat (Mèo)', 'Bird (Chim)', 'Elephant', 'Monkey'], 2, 'Voi (elephant) to nhất.', ['Sai — Mèo nhỏ.', 'Sai — Chim nhỏ.', 'Đúng — Voi (elephant) to nhất.', 'Sai — Khỉ nhỏ hơn voi nhiều.']),
    Q('"Look at the monkey!" nghĩa là?', ['Cho tôi khỉ', 'Nhìn con khỉ kìa!', 'Khỉ đâu', 'Khỉ của tôi'], 1, 'Look at = nhìn ... kìa.', ['Sai — Cho tôi là give me.', 'Đúng — Look at the monkey là Nhìn con khỉ kìa!', 'Sai — Khỉ đâu là Where is the monkey.', 'Sai — Khỉ của tôi là my monkey.']),
  ]),

  M(22, 'Lunar New Year — Happy New Year!', [
    Q('"Happy New Year!" nghĩa là?', ['Chúc mừng sinh nhật', 'Chúc ngủ ngon', 'Tạm biệt', 'Chúc mừng năm mới'], 3, 'Happy New Year = Chúc mừng năm mới.', ['Sai — Chúc mừng sinh nhật là Happy Birthday.', 'Sai — Chúc ngủ ngon là Good night.', 'Sai — Tạm biệt là Goodbye.', 'Đúng — Happy New Year là Chúc mừng năm mới.']),
    Q('"Tet" trong tiếng Anh dùng để chỉ?', ['Quốc khánh', 'Lễ Giáng sinh', 'Tết Nguyên Đán', 'Trung Thu'], 2, 'Tet = Tết Nguyên Đán Việt Nam.', ['Sai — Quốc khánh là National Day.', 'Sai — Lễ Giáng sinh là Christmas.', 'Đúng — Tet là Tết Nguyên Đán của Việt Nam.', 'Sai — Trung Thu là Mid-Autumn Festival.']),
    Q('"Lucky money" là?', ['Tiền lì xì', 'Tiền học', 'Tiền tiết kiệm', 'Tiền tiêu vặt'], 0, 'Lucky money = tiền lì xì.', ['Đúng — Lucky money là tiền lì xì.', 'Sai — Tiền học là tuition.', 'Sai — Tiền tiết kiệm là savings.', 'Sai — Tiền tiêu vặt là pocket money.']),
    Q('"Peach blossom" có nghĩa là?', ['Hoa cúc', 'Hoa mai', 'Hoa đào', 'Hoa hồng'], 2, 'Peach blossom = hoa đào (Tết miền Bắc).', ['Sai — Hoa cúc là chrysanthemum.', 'Sai — Hoa mai là apricot blossom.', 'Đúng — Peach blossom là hoa đào (Tết miền Bắc).', 'Sai — Hoa hồng là rose.']),
    Q('"Apricot blossom" có nghĩa là?', ['Hoa hồng', 'Hoa đào', 'Hoa lan', 'Hoa mai'], 3, 'Apricot blossom = hoa mai (Tết miền Nam).', ['Sai — Hoa hồng là rose.', 'Sai — Hoa đào là peach blossom.', 'Sai — Hoa lan là orchid.', 'Đúng — Apricot blossom là hoa mai (Tết miền Nam).']),
    Q('Em chúc ông bà: "Happy ___ Year!"', ['Long (Dài)', 'Big (Lớn)', 'Old (Cũ)', 'New'], 3, 'Happy New Year.', ['Sai — Long là dài, không hợp.', 'Sai — Big là lớn, không hợp.', 'Sai — Old là cũ, ngược nghĩa.', 'Đúng — Happy New Year (năm mới).']),
  ]),

  M(23, 'Food (1) — Rice, fish, meat', [
    Q('"Rice" có nghĩa là?', ['Cơm / gạo', 'Con cá', 'Bánh mì', 'Sợi mì'], 0, 'Rice = cơm / gạo.', ['Đúng — Rice là cơm / gạo.', 'Sai — Con cá là fish.', 'Sai — Bánh mì là bread.', 'Sai — Sợi mì là noodles.']),
    Q('"Fish" (món ăn) có nghĩa là?', ['Thịt heo', 'Cá', 'Quả trứng', 'Cơm trắng'], 1, 'Fish vừa là con cá, vừa là món cá.', ['Sai — Thịt heo là pork.', 'Đúng — Fish là cá (món ăn).', 'Sai — Quả trứng là egg.', 'Sai — Cơm trắng là rice.']),
    Q('"Meat" có nghĩa là?', ['Thịt', 'Quả trứng', 'Con cá', 'Rau xanh'], 0, 'Meat = thịt.', ['Đúng — Meat là thịt.', 'Sai — Quả trứng là egg.', 'Sai — Con cá là fish.', 'Sai — Rau xanh là vegetables.']),
    Q('"Egg" có nghĩa là?', ['Miếng thịt', 'Rau xanh', 'Trứng', 'Con cá'], 2, 'Egg = quả trứng.', ['Sai — Miếng thịt là meat.', 'Sai — Rau xanh là vegetables.', 'Đúng — Egg là quả trứng.', 'Sai — Con cá là fish.']),
    Q('"I eat rice." nghĩa là?', ['Cơm ngon', 'Tôi nấu cơm', 'Tôi thích cơm', 'Tôi ăn cơm'], 3, 'I eat rice = Tôi ăn cơm.', ['Sai — Cơm ngon là Rice is yummy.', 'Sai — Tôi nấu cơm là I cook rice.', 'Sai — Tôi thích cơm là I like rice.', 'Đúng — I eat rice là Tôi ăn cơm.']),
    Q('"Bread" có nghĩa là?', ['Sợi mì', 'Con cá', 'Bánh mì', 'Cơm trắng'], 2, 'Bread = bánh mì.', ['Sai — Sợi mì là noodles.', 'Sai — Con cá là fish.', 'Đúng — Bread là bánh mì.', 'Sai — Cơm trắng là rice.']),
  ]),

  M(24, 'Food (2) — Cake, candy, ice cream', [
    Q('"Cake" có nghĩa là?', ['Bánh ngọt / bánh kem', 'Cơm trắng', 'Viên kẹo', 'Con cá'], 0, 'Cake = bánh ngọt.', ['Đúng — Cake là bánh ngọt / bánh kem.', 'Sai — Cơm trắng là rice.', 'Sai — Viên kẹo là candy.', 'Sai — Con cá là fish.']),
    Q('"Candy" có nghĩa là?', ['Quả trứng', 'Bánh ngọt', 'Con cá', 'Kẹo'], 3, 'Candy = kẹo.', ['Sai — Quả trứng là egg.', 'Sai — Bánh ngọt là cake.', 'Sai — Con cá là fish.', 'Đúng — Candy là kẹo.']),
    Q('"Ice cream" có nghĩa là?', ['Sữa nóng', 'Bánh ngọt', 'Kem (lạnh)', 'Cơm trắng'], 2, 'Ice cream = kem.', ['Sai — Sữa nóng là hot milk.', 'Sai — Bánh ngọt là cake.', 'Đúng — Ice cream là kem (lạnh).', 'Sai — Cơm trắng là rice.']),
    Q('"Yummy!" nghĩa là?', ['Đắng quá!', 'Dở quá!', 'Cay quá!', 'Ngon quá!'], 3, 'Yummy = ngon (cách trẻ con khen).', ['Sai — Đắng là bitter.', 'Sai — Dở là yucky.', 'Sai — Cay là spicy.', 'Đúng — Yummy là ngon quá!']),
    Q('"I like cake." nghĩa là?', ['Tôi thích bánh', 'Tôi ăn bánh', 'Tôi không thích bánh', 'Bánh to'], 0, 'I like = Tôi thích.', ['Đúng — I like cake là Tôi thích bánh.', 'Sai — Tôi ăn bánh là I eat cake.', 'Sai — câu này không có "không" (don\'t).', 'Sai — Bánh to là big cake.']),
    Q('Đồ ăn KHÔNG nên ăn quá nhiều:', ['Fish (Cá)', 'Vegetables', 'Candy', 'Rice (Cơm)'], 2, 'Ăn nhiều kẹo bị sâu răng.', ['Sai — Cá tốt cho sức khoẻ.', 'Sai — Rau (vegetables) rất tốt, nên ăn nhiều.', 'Đúng — Ăn nhiều kẹo (candy) bị sâu răng.', 'Sai — Cơm là thức ăn chính, ăn được.']),
  ]),

  M(25, 'Drinks — Water, milk, juice', [
    Q('"Water" có nghĩa là?', ['Nước trà', 'Nước ép', 'Sữa tươi', 'Nước'], 3, 'Water = nước (lọc).', ['Sai — Nước trà là tea.', 'Sai — Nước ép là juice.', 'Sai — Sữa tươi là milk.', 'Đúng — Water là nước (lọc).']),
    Q('"Milk" có nghĩa là?', ['Cà phê', 'Nước trà', 'Sữa', 'Nước lọc'], 2, 'Milk = sữa.', ['Sai — Cà phê là coffee.', 'Sai — Nước trà là tea.', 'Đúng — Milk là sữa.', 'Sai — Nước lọc là water.']),
    Q('"Juice" có nghĩa là?', ['Nước ép trái cây', 'Sữa tươi', 'Cà phê', 'Nước trà'], 0, 'Juice = nước ép.', ['Đúng — Juice là nước ép trái cây.', 'Sai — Sữa tươi là milk.', 'Sai — Cà phê là coffee.', 'Sai — Nước trà là tea.']),
    Q('"Orange juice" có nghĩa là?', ['Nước cam ép', 'Trà cam', 'Cam quả', 'Sữa cam'], 0, 'Orange juice = nước cam.', ['Đúng — Orange juice là nước cam ép.', 'Sai — Trà cam là orange tea.', 'Sai — Cam quả (trái cam) là orange.', 'Sai — không có "sữa cam" ở đây.']),
    Q('"I drink milk." nghĩa là?', ['Tôi thích sữa', 'Tôi uống sữa', 'Sữa ngon', 'Tôi ăn sữa'], 1, 'I drink = Tôi uống.', ['Sai — Tôi thích là I like.', 'Đúng — I drink milk là Tôi uống sữa.', 'Sai — Sữa ngon là Milk is yummy.', 'Sai — drink là "uống", không phải "ăn".']),
    Q('Khi khát em uống?', ['Rice (Cơm)', 'Cake (Bánh)', 'Water', 'Meat (Thịt)'], 2, 'Khát → uống nước (water).', ['Sai — Cơm là đồ ăn, không uống.', 'Sai — Bánh là đồ ăn, không uống.', 'Đúng — Khát thì uống nước (water).', 'Sai — Thịt là đồ ăn, không uống.']),
  ]),

  M(26, 'Fruits — Apple, banana, orange', [
    Q('"Apple" có nghĩa là?', ['Quả xoài', 'Quả táo', 'Quả cam', 'Quả chuối'], 1, 'Apple = quả táo.', ['Sai — Quả xoài là mango.', 'Đúng — Apple là quả táo.', 'Sai — Quả cam là orange.', 'Sai — Quả chuối là banana.']),
    Q('"Banana" có nghĩa là?', ['Quả chuối', 'Quả nho', 'Quả táo', 'Quả lê'], 0, 'Banana = quả chuối.', ['Đúng — Banana là quả chuối.', 'Sai — Quả nho là grape.', 'Sai — Quả táo là apple.', 'Sai — Quả lê là pear.']),
    Q('"Orange" có nghĩa là?', ['Quả chanh', 'Quả cam', 'Quả bưởi', 'Quả quýt'], 1, 'Orange = quả cam.', ['Sai — Quả chanh là lemon.', 'Đúng — Orange là quả cam.', 'Sai — Quả bưởi là pomelo.', 'Sai — Quả quýt là mandarin.']),
    Q('"Mango" có nghĩa là?', ['Quả đu đủ', 'Quả mít', 'Quả xoài', 'Quả ổi'], 2, 'Mango = quả xoài.', ['Sai — Quả đu đủ là papaya.', 'Sai — Quả mít là jackfruit.', 'Đúng — Mango là quả xoài.', 'Sai — Quả ổi là guava.']),
    Q('"I like apples." nghĩa là?', ['Tôi thích táo', 'Tôi ăn táo', 'Táo ngon', 'Tôi không thích táo'], 0, 'I like = Tôi thích.', ['Đúng — I like apples là Tôi thích táo.', 'Sai — Tôi ăn táo là I eat apples.', 'Sai — Táo ngon là Apples are yummy.', 'Sai — câu này không có "không" (don\'t).']),
    Q('Quả nào màu vàng dài cong:', ['Apple (Táo)', 'Banana', 'Grape (Nho)', 'Orange'], 1, 'Chuối (banana) màu vàng cong.', ['Sai — Táo tròn, màu đỏ hoặc xanh.', 'Đúng — Chuối (banana) màu vàng dài cong.', 'Sai — Nho nhỏ và tròn.', 'Sai — Cam tròn, màu cam.']),
  ]),

  M(27, 'Weather — Sunny, rainy, hot, cold', [
    Q('"Sunny" có nghĩa là?', ['Có nắng', 'Có gió', 'Có mây', 'Có mưa'], 0, 'Sunny = có nắng.', ['Đúng — Sunny là có nắng.', 'Sai — Có gió là windy.', 'Sai — Có mây là cloudy.', 'Sai — Có mưa là rainy.']),
    Q('"Rainy" có nghĩa là?', ['Có mây', 'Có tuyết', 'Có mưa', 'Có nắng'], 2, 'Rainy = có mưa.', ['Sai — Có mây là cloudy.', 'Sai — Có tuyết là snowy.', 'Đúng — Rainy là có mưa.', 'Sai — Có nắng là sunny.']),
    Q('"Hot" có nghĩa là?', ['Ấm áp', 'Mát mẻ', 'Nóng', 'Lạnh giá'], 2, 'Hot = nóng.', ['Sai — Ấm áp là warm.', 'Sai — Mát mẻ là cool.', 'Đúng — Hot là nóng.', 'Sai — Lạnh giá là cold.']),
    Q('"Cold" có nghĩa là?', ['Ấm áp', 'Nóng bức', 'Mát mẻ', 'Lạnh'], 3, 'Cold = lạnh.', ['Sai — Ấm áp là warm.', 'Sai — Nóng bức là hot.', 'Sai — Mát mẻ là cool.', 'Đúng — Cold là lạnh.']),
    Q('Mùa hè ở Việt Nam thì?', ['Hot', 'Cool (Mát)', 'Cold (Lạnh)', 'Snowy (Có tuyết)'], 0, 'Mùa hè = hot.', ['Đúng — Mùa hè ở Việt Nam thì nóng (hot).', 'Sai — Cool là mát, không phải mùa hè.', 'Sai — Cold là lạnh, là mùa đông.', 'Sai — Việt Nam mùa hè không có tuyết.']),
    Q('"It is sunny today." nghĩa là?', ['Hôm nay nắng', 'Hôm nay mưa', 'Hôm nay lạnh', 'Hôm nay tuyết'], 0, 'It is sunny = trời nắng.', ['Đúng — It is sunny today là Hôm nay nắng.', 'Sai — mưa là rainy.', 'Sai — lạnh là cold.', 'Sai — tuyết là snowy.']),
  ]),

  M(28, 'Can / Can\'t — Có thể / Không thể', [
    Q('"I can run." nghĩa là?', ['Tôi đang chạy', 'Tôi không chạy được', 'Tôi có thể chạy', 'Tôi thích chạy'], 2, 'I can = Tôi có thể.', ['Sai — Tôi đang chạy là I am running.', 'Sai — câu này không có "không" (can\'t).', 'Đúng — I can run là Tôi có thể chạy.', 'Sai — Tôi thích chạy là I like running.']),
    Q('"I can\'t swim." nghĩa là?', ['Tôi không thể bơi', 'Tôi thích bơi', 'Tôi biết bơi', 'Tôi đi bơi'], 0, "Can't = không thể.", ['Đúng — I can\'t swim là Tôi không thể bơi.', 'Sai — Tôi thích bơi là I like swimming.', 'Sai — câu này có "can\'t" nghĩa là KHÔNG bơi được.', 'Sai — Tôi đi bơi là I go swimming.']),
    Q('"Can you sing?" nghĩa là?', ['Bạn có thể hát không?', 'Bạn thích hát không?', 'Bạn hát đâu?', 'Bạn hát gì?'], 0, 'Can you...? = Bạn có thể... không?', ['Đúng — Can you sing? là Bạn có thể hát không?', 'Sai — Bạn thích hát không là Do you like singing?', 'Sai — Bạn hát đâu là Where do you sing?', 'Sai — Bạn hát gì là What do you sing?']),
    Q('Trả lời CÓ: "Can you jump?" – ___', ['No, I can', 'Yes, I can', 'No, I do', 'Yes, I do'], 1, 'Yes, I can = Vâng, tôi có thể.', ['Sai — No nghĩa là không, không phải trả lời CÓ.', 'Đúng — Yes, I can là Vâng, tôi có thể.', 'Sai — No là không; với can phải dùng can.', 'Sai — câu hỏi dùng can thì trả lời bằng can, không dùng do.']),
    Q('"A bird can ___."', ['fly', 'read (đọc)', 'cook (nấu ăn)', 'swim (bơi)'], 0, 'Chim biết bay (fly).', ['Đúng — Chim biết bay (fly).', 'Sai — Chim không biết đọc (read).', 'Sai — Chim không biết nấu ăn (cook).', 'Sai — Chim không bơi, nó bay.']),
    Q('"A fish can ___."', ['fly (bay)', 'jump (nhảy)', 'swim', 'run (chạy)'], 2, 'Cá biết bơi (swim).', ['Sai — Cá không bay.', 'Sai — Cá không nhảy như người.', 'Đúng — Cá biết bơi (swim).', 'Sai — Cá không chạy, nó bơi.']),
  ]),

  M(29, 'Action verbs — Run, jump, sing, dance', [
    Q('"Run" có nghĩa là?', ['Chạy', 'Bơi lội', 'Đi bộ', 'Nhảy lên'], 0, 'Run = chạy.', ['Đúng — Run là chạy.', 'Sai — Bơi lội là swim.', 'Sai — Đi bộ là walk.', 'Sai — Nhảy lên là jump.']),
    Q('"Jump" có nghĩa là?', ['Chạy nhanh', 'Hát hay', 'Bơi lội', 'Nhảy'], 3, 'Jump = nhảy.', ['Sai — Chạy là run.', 'Sai — Hát là sing.', 'Sai — Bơi lội là swim.', 'Đúng — Jump là nhảy (lên).']),
    Q('"Sing" có nghĩa là?', ['Nói chuyện', 'Cười tươi', 'Nhảy múa', 'Hát'], 3, 'Sing = hát.', ['Sai — Nói chuyện là talk.', 'Sai — Cười là smile.', 'Sai — Nhảy múa là dance.', 'Đúng — Sing là hát.']),
    Q('"Dance" có nghĩa là?', ['Chạy nhanh', 'Bơi lội', 'Hát hay', 'Nhảy múa'], 3, 'Dance = nhảy múa.', ['Sai — Chạy là run.', 'Sai — Bơi lội là swim.', 'Sai — Hát là sing.', 'Đúng — Dance là nhảy múa.']),
    Q('"Swim" có nghĩa là?', ['Chạy nhanh', 'Hát hay', 'Bơi', 'Đọc sách'], 2, 'Swim = bơi.', ['Sai — Chạy là run.', 'Sai — Hát là sing.', 'Đúng — Swim là bơi.', 'Sai — Đọc sách là read.']),
    Q('"Let\'s sing!" nghĩa là?', ['Hãy chạy nào!', 'Tạm biệt', 'Hãy hát nào!', 'Hãy ngủ nào!'], 2, "Let's sing = chúng ta cùng hát nào.", ['Sai — Hãy chạy nào là Let\'s run.', 'Sai — Tạm biệt là Goodbye.', 'Đúng — Let\'s sing là Hãy hát nào!', 'Sai — Hãy ngủ nào là Let\'s sleep.']),
  ]),

  M(30, 'This / That — Đây / Kia', [
    Q('"This is my book." nghĩa là?', ['Đây là sách của tôi', 'Kia là sách', 'Tôi đọc sách', 'Sách đâu'], 0, 'This = đây (gần).', ['Đúng — This is my book là Đây là sách của tôi.', 'Sai — "Kia" là that, không phải this.', 'Sai — Tôi đọc sách là I read a book.', 'Sai — Sách đâu là Where is the book.']),
    Q('"That is a cat." nghĩa là?', ['Kia là một con mèo', 'Mèo của tôi', 'Đây là con mèo', 'Tôi có mèo'], 0, 'That = kia (xa).', ['Đúng — That is a cat là Kia là một con mèo.', 'Sai — Mèo của tôi là my cat.', 'Sai — "Đây" là this, không phải that.', 'Sai — Tôi có mèo là I have a cat.']),
    Q('Chỉ vật ở gần em dùng?', ['That (Kia)', 'Those (Những cái kia)', 'These (Những cái này)', 'This'], 3, 'Vật ở gần → this.', ['Sai — That dùng cho vật ở xa.', 'Sai — Those dùng cho nhiều vật ở xa.', 'Sai — These dùng cho nhiều vật ở gần.', 'Đúng — Vật ở gần dùng this.']),
    Q('Chỉ vật ở xa em dùng?', ['This (Này)', 'That', 'There (Ở đó)', 'These (Những cái này)'], 1, 'Vật ở xa → that.', ['Sai — This dùng cho vật ở gần.', 'Đúng — Vật ở xa dùng that.', 'Sai — There là "ở đó", không dùng để chỉ vật.', 'Sai — These dùng cho nhiều vật ở gần.']),
    Q('"This is a pen." nghĩa là?', ['Bút của tôi', 'Cho tôi bút', 'Đây là cây bút', 'Kia là cây bút'], 2, 'This is a pen = Đây là cây bút.', ['Sai — Bút của tôi là my pen.', 'Sai — Cho tôi bút là Give me a pen.', 'Đúng — This is a pen là Đây là cây bút.', 'Sai — "Kia" là that, this là "đây".']),
    Q('"What is this?" nghĩa là?', ['Ở đâu?', 'Ai đây?', 'Cái gì đây?', 'Cái gì kia?'], 2, 'What is this? = Cái này là gì?', ['Sai — Ở đâu là Where.', 'Sai — Ai đây là Who is this.', 'Đúng — What is this? là Cái gì đây? (cái này là gì).', 'Sai — Cái gì kia là What is that (vật ở xa).']),
  ]),

  M(31, 'Where? — In / On / Under', [
    Q('"Where is my book?" nghĩa là?', ['Sách của ai?', 'Sách màu gì?', 'Sách tôi đâu rồi?', 'Sách tôi đẹp'], 2, 'Where is...? = ... ở đâu?', ['Sai — Sách của ai là Whose book.', 'Sai — Sách màu gì là What color.', 'Đúng — Where is my book? là Sách tôi đâu rồi?', 'Sai — câu này hỏi "ở đâu", không khen đẹp.']),
    Q('"In" có nghĩa là?', ['Ở trên', 'Ở dưới', 'Trong', 'Cạnh / kế bên'], 2, 'In = ở trong.', ['Sai — Ở trên là on.', 'Sai — Ở dưới là under.', 'Đúng — In là ở trong.', 'Sai — Cạnh / kế bên là next to.']),
    Q('"On" có nghĩa là?', ['Ở trong', 'Trên (bề mặt)', 'Ở dưới', 'Cạnh / kế bên'], 1, 'On = ở trên (bề mặt).', ['Sai — Ở trong là in.', 'Đúng — On là ở trên (bề mặt).', 'Sai — Ở dưới là under.', 'Sai — Cạnh / kế bên là next to.']),
    Q('"Under" có nghĩa là?', ['Ở trong', 'Phía trước', 'Ở trên', 'Dưới'], 3, 'Under = ở dưới (gầm).', ['Sai — Ở trong là in.', 'Sai — Phía trước là in front of.', 'Sai — Ở trên là on.', 'Đúng — Under là ở dưới (gầm).']),
    Q('"The cat is under the chair." nghĩa là?', ['Mèo cạnh ghế', 'Mèo trên ghế', 'Mèo trong ghế', 'Mèo dưới ghế'], 3, 'Under the chair = dưới ghế.', ['Sai — cạnh là next to, không phải under.', 'Sai — trên là on, không phải under.', 'Sai — trong là in, không phải under.', 'Đúng — Under the chair là dưới ghế.']),
    Q('"The book is on the desk." nghĩa là?', ['Sách dưới bàn', 'Sách cạnh bàn', 'Sách trong bàn', 'Sách trên bàn'], 3, 'On the desk = trên (mặt) bàn.', ['Sai — dưới là under, không phải on.', 'Sai — cạnh là next to, không phải on.', 'Sai — trong là in, không phải on.', 'Đúng — On the desk là trên (mặt) bàn.']),
  ]),

  M(32, 'Clothes — Shirt, hat, shoes', [
    Q('"Shirt" có nghĩa là?', ['Đôi giày', 'Cái váy', 'Áo sơ mi', 'Cái mũ'], 2, 'Shirt = áo sơ mi.', ['Sai — Đôi giày là shoes.', 'Sai — Cái váy là skirt / dress.', 'Đúng — Shirt là áo sơ mi.', 'Sai — Cái mũ là hat.']),
    Q('"Hat" có nghĩa là?', ['Mũ/nón', 'Áo sơ mi', 'Cái quần', 'Đôi giày'], 0, 'Hat = mũ/nón.', ['Đúng — Hat là mũ / nón.', 'Sai — Áo sơ mi là shirt.', 'Sai — Cái quần là trousers / pants.', 'Sai — Đôi giày là shoes.']),
    Q('"Shoes" có nghĩa là?', ['Đôi tất', 'Đôi giày', 'Áo sơ mi', 'Cái mũ'], 1, 'Shoes = đôi giày.', ['Sai — Đôi tất là socks.', 'Đúng — Shoes là đôi giày.', 'Sai — Áo sơ mi là shirt.', 'Sai — Cái mũ là hat.']),
    Q('"T-shirt" có nghĩa là?', ['Cái váy', 'Áo thun', 'Áo khoác', 'Cái quần'], 1, 'T-shirt = áo phông.', ['Sai — Cái váy là skirt / dress.', 'Đúng — T-shirt là áo thun / áo phông.', 'Sai — Áo khoác là coat / jacket.', 'Sai — Cái quần là trousers / pants.']),
    Q('"I wear a hat." nghĩa là?', ['Tôi mua mũ', 'Tôi đội mũ', 'Tôi thích mũ', 'Tôi có mũ'], 1, 'Wear = mặc / đội.', ['Sai — Tôi mua mũ là I buy a hat.', 'Đúng — Wear là đội: Tôi đội mũ.', 'Sai — Tôi thích mũ là I like a hat.', 'Sai — Tôi có mũ là I have a hat.']),
    Q('"Put on your shoes." nghĩa là?', ['Cất giày', 'Mua giày', 'Mang giày vào', 'Bỏ giày ra'], 2, 'Put on = mang / mặc vào.', ['Sai — Cất giày là put away your shoes.', 'Sai — Mua giày là buy shoes.', 'Đúng — Put on là mang giày vào.', 'Sai — Bỏ giày ra là take off your shoes.']),
  ]),

  M(33, 'Days & playtime — Today, play, school', [
    Q('"Today" có nghĩa là?', ['Hôm qua', 'Hôm nay', 'Đêm nay', 'Ngày mai'], 1, 'Today = hôm nay.', ['Sai — Hôm qua là yesterday.', 'Đúng — Today là hôm nay.', 'Sai — Đêm nay là tonight.', 'Sai — Ngày mai là tomorrow.']),
    Q('"Play" có nghĩa là?', ['Chơi', 'Học bài', 'Ngủ trưa', 'Ăn cơm'], 0, 'Play = chơi.', ['Đúng — Play là chơi.', 'Sai — Học bài là study.', 'Sai — Ngủ là sleep.', 'Sai — Ăn cơm là eat.']),
    Q('"School" có nghĩa là?', ['Bệnh viện', 'Ngôi nhà', 'Công viên', 'Trường học'], 3, 'School = trường học.', ['Sai — Bệnh viện là hospital.', 'Sai — Ngôi nhà là house.', 'Sai — Công viên là park.', 'Đúng — School là trường học.']),
    Q('"Let\'s play!" nghĩa là?', ['Hãy ăn nào', 'Hãy ngủ nào', 'Hãy chơi nào', 'Hãy đi'], 2, "Let's play = cùng chơi nào.", ['Sai — Hãy ăn nào là Let\'s eat.', 'Sai — Hãy ngủ nào là Let\'s sleep.', 'Đúng — Let\'s play là Hãy chơi nào!', 'Sai — Hãy đi là Let\'s go.']),
    Q('"I go to school." nghĩa là?', ['Tôi đi ngủ', 'Tôi đi chơi', 'Tôi đi học', 'Tôi ở nhà'], 2, 'Go to school = đi học.', ['Sai — Tôi đi ngủ là I go to bed.', 'Sai — Tôi đi chơi là I go out to play.', 'Đúng — Go to school là đi học.', 'Sai — Tôi ở nhà là I stay home.']),
    Q('"Friend" có nghĩa là?', ['Anh trai (Brother)', 'Bạn', 'Cô giáo', 'Mẹ (Mother)'], 1, 'Friend = bạn bè.', ['Sai — Anh trai là brother.', 'Đúng — Friend là bạn bè.', 'Sai — Cô giáo là teacher.', 'Sai — Mẹ là mother.']),
  ]),

  M(34, 'Polite words — Please, thank you, sorry', [
    Q('"Please" có nghĩa là?', ['Tạm biệt', 'Cảm ơn', 'Xin lỗi', 'Làm ơn / vui lòng'], 3, 'Please = làm ơn / vui lòng.', ['Sai — Tạm biệt là Goodbye.', 'Sai — Cảm ơn là Thank you.', 'Sai — Xin lỗi là Sorry.', 'Đúng — Please là làm ơn / vui lòng.']),
    Q('"Thank you" có nghĩa là?', ['Tạm biệt', 'Xin chào', 'Cảm ơn', 'Xin lỗi'], 2, 'Thank you = Cảm ơn.', ['Sai — Tạm biệt là Goodbye.', 'Sai — Xin chào là Hello.', 'Đúng — Thank you là Cảm ơn.', 'Sai — Xin lỗi là Sorry.']),
    Q('"Sorry" có nghĩa là?', ['Tạm biệt', 'Xin chào', 'Xin lỗi', 'Cảm ơn'], 2, 'Sorry = Xin lỗi.', ['Sai — Tạm biệt là Goodbye.', 'Sai — Xin chào là Hello.', 'Đúng — Sorry là Xin lỗi.', 'Sai — Cảm ơn là Thank you.']),
    Q('Đáp "Thank you" lịch sự:', ['Sorry (Xin lỗi)', 'You\'re welcome', 'Hello (Xin chào)', 'Goodbye (Tạm biệt)'], 1, "You're welcome = Không có chi.", ['Sai — Sorry là xin lỗi, không hợp.', 'Đúng — You\'re welcome là Không có chi.', 'Sai — Hello là xin chào.', 'Sai — Goodbye là tạm biệt.']),
    Q('Khi nhờ bạn lấy giúp sách, em nói:', ['Sorry book.', 'Give me book!', 'Book please!', 'Please give me the book.'], 3, 'Dùng Please cho lịch sự.', ['Sai — Sorry book không có nghĩa rõ.', 'Sai — Give me book! nghe ra lệnh, thiếu lịch sự.', 'Sai — Book please! còn thiếu, chưa thành câu.', 'Đúng — Please give me the book là cách nói lịch sự.']),
    Q('Lỡ làm rơi đồ của bạn, em nói:', ['Goodbye (Tạm biệt)', 'Hello (Xin chào)', 'Thank you', 'Sorry'], 3, 'Xin lỗi = sorry.', ['Sai — Goodbye là tạm biệt.', 'Sai — Hello là xin chào.', 'Sai — Thank you là cảm ơn.', 'Đúng — Lỡ làm rơi đồ thì nói Sorry (xin lỗi).']),
  ]),

  M(35, 'Review whole year — Ôn tập cuối năm', [
    Q('"Hello! What is your name?" Trả lời:', ['My name red.', 'Yes I do', 'Goodbye', 'I\'m Lan.'], 3, "I'm + tên = giới thiệu tên.", ['Sai — My name red không có nghĩa (red là màu đỏ).', 'Sai — Yes I do không trả lời tên.', 'Sai — Goodbye là tạm biệt, không phải nói tên.', 'Đúng — I\'m + tên dùng để giới thiệu tên.']),
    Q('Số 5 tiếng Anh là?', ['Four (4)', 'Three (3)', 'Five', 'Six (6)'], 2, 'Five = 5.', ['Sai — Four là số 4.', 'Sai — Three là số 3.', 'Đúng — Five là số 5.', 'Sai — Six là số 6.']),
    Q('"Mum and dad" là?', ['Anh chị', 'Bạn bè', 'Bố mẹ', 'Ông bà'], 2, 'Mum & dad = bố mẹ.', ['Sai — Anh chị là brother and sister.', 'Sai — Bạn bè là friends.', 'Đúng — Mum and dad là bố mẹ.', 'Sai — Ông bà là grandpa and grandma.']),
    Q('"Apple, banana, orange" là?', ['Trái cây', 'Con vật', 'Đồ uống', 'Đồ chơi'], 0, 'Đây là fruits (trái cây).', ['Đúng — Táo, chuối, cam là trái cây (fruits).', 'Sai — Con vật là animals.', 'Sai — Đồ uống là drinks.', 'Sai — Đồ chơi là toys.']),
    Q('"I can swim." nghĩa là?', ['Tôi không biết bơi', 'Tôi đi bơi', 'Tôi thích bơi', 'Tôi có thể bơi'], 3, 'I can = Tôi có thể.', ['Sai — câu này không có "không" (can\'t).', 'Sai — Tôi đi bơi là I go swimming.', 'Sai — Tôi thích bơi là I like swimming.', 'Đúng — I can swim là Tôi có thể bơi.']),
    Q('"The cat is ___ the box." (mèo ở trong hộp)', ['at (tại)', 'on (trên)', 'in', 'under (dưới)'], 2, 'In = ở trong.', ['Sai — at là "tại", không hợp với "trong hộp".', 'Sai — on là "trên", không phải "trong".', 'Đúng — in là ở trong (hộp).', 'Sai — under là "dưới", không phải "trong".']),
    Q('"It is sunny and hot." nghĩa là?', ['Trời ấm mát', 'Trời lạnh và mưa', 'Trời nắng và nóng', 'Trời mây gió'], 2, 'Sunny = nắng; hot = nóng.', ['Sai — sunny là nắng, hot là nóng, không phải ấm mát.', 'Sai — lạnh là cold, mưa là rainy.', 'Đúng — Sunny là nắng, hot là nóng.', 'Sai — mây là cloudy, gió là windy.']),
    Q('"Goodbye! See you!" nghĩa là?', ['Cảm ơn nhé', 'Xin chào, gặp lại', 'Tạm biệt, hẹn gặp lại', 'Xin lỗi nhé'], 2, 'Goodbye + See you = Tạm biệt, hẹn gặp lại.', ['Sai — Cảm ơn là Thank you.', 'Sai — Goodbye là tạm biệt, không phải xin chào.', 'Đúng — Goodbye! See you! là Tạm biệt, hẹn gặp lại.', 'Sai — Xin lỗi là Sorry.']),
  ], { difficulty: 2 }),

  M(36, 'End of Grade 1 — Ready for Grade 2!', [
    Q('"Good morning!" nghĩa là gì?', ['Chào buổi sáng', 'Chúc ngủ ngon', 'Tạm biệt', 'Cảm ơn'], 0, 'Good morning = Chào buổi sáng.', ['Đúng — Good morning là lời chào buổi sáng.', 'Sai — Chúc ngủ ngon là Good night.', 'Sai — Tạm biệt là Goodbye.', 'Sai — Cảm ơn là Thank you.']),
    Q('Số 10 trong tiếng Anh là?', ['nine', 'eight', 'ten', 'seven'], 2, 'Ten = 10.', ['Sai — nine là số 9.', 'Sai — eight là số 8.', 'Đúng — ten là số 10.', 'Sai — seven là số 7.']),
    Q('"The sky is ___." (Bầu trời màu xanh da trời)', ['red', 'blue', 'green', 'black'], 1, 'Blue = xanh da trời.', ['Sai — red là màu đỏ.', 'Đúng — blue là màu xanh da trời.', 'Sai — green là màu xanh lá.', 'Sai — black là màu đen.']),
    Q('"My name is Lan. I am six years old." — câu này nói về gì?', ['Màu sắc', 'Con vật', 'Tên và tuổi', 'Đồ ăn'], 2, 'My name is… + I am… years old = giới thiệu tên và tuổi.', ['Sai — câu này không nhắc tới màu nào.', 'Sai — câu này không nhắc tới con vật nào.', 'Đúng — câu này giới thiệu tên và tuổi của mình.', 'Sai — câu này không nhắc tới món ăn nào.']),
    Q('Từ nào là món ăn (food)?', ['cat', 'hand', 'blue', 'rice'], 3, 'Rice = cơm/gạo, là food.', ['Sai — cat là con mèo (animal).', 'Sai — hand là bàn tay (body).', 'Sai — blue là màu xanh (colour).', 'Đúng — rice là cơm/gạo, thuộc nhóm food.']),
    Q('Lên Lớp 2 em sẽ học thêm nhóm từ chỉ vị trí nào?', ['one, two, three', 'mum, dad', 'in, on, under', 'red, blue'], 2, 'Lớp 2 học giới từ chỉ vị trí: in, on, under, next to.', ['Sai — đó là các số đếm em đã học ở Lớp 1.', 'Sai — đó là từ chỉ gia đình em đã học ở Lớp 1.', 'Đúng — in, on, under, next to là các từ chỉ vị trí học ở Lớp 2.', 'Sai — đó là màu sắc em đã học ở Lớp 1.']),
  ], { difficulty: 2 }),
];

export const P1TA_SCENARIOS = indexBy(P1TA_WEEKS);
