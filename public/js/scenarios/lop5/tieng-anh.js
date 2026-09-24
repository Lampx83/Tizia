// ============================================================
// Lớp 5 · TIẾNG ANH — 35 tuần (HK1: 1–18 · HK2: 19–35 · T22 nghỉ Tết)
// Bám SGK GDPT 2018 / chương trình 10 năm.
// ID prefix: "P5TA-wNN-quiz".
// ============================================================
import { Q, W, indexBy } from './_helper.js';

const M = (n, title, qs, opts) => W('P5TA', 'tieng-anh', n, title, qs, opts);

export const P5TA_WEEKS = [
  // ──────────────── HK1 ────────────────
  M(1, 'Hello — Back to school', [
    Q('"Hello" có nghĩa là?', ['Cảm ơn', 'Xin chào', 'Tạm biệt', 'Xin lỗi'], 1, 'Hello = Xin chào.', ['Sai — "Cảm ơn" là "Thank you".', 'Đúng — Hello = Xin chào, lời chào khi gặp nhau.', 'Sai — "Tạm biệt" là "Goodbye".', 'Sai — "Xin lỗi" là "Sorry".']),
    Q('"How are you?" trả lời?', ['I am fine, thank you.', 'I am 10.', 'Yes, I do.', 'My name is Lan.'], 0, '"How are you?" hỏi sức khỏe.', ['Đúng — "How are you?" hỏi sức khỏe, trả lời "I am fine, thank you".', 'Sai — đây là câu trả lời cho "How old are you?" (hỏi tuổi).', 'Sai — "Yes, I do" trả lời câu hỏi với "Do you…?".', 'Sai — đây là câu trả lời cho "What is your name?".']),
    Q('"Nice to meet you." nghĩa là?', ['Xin lỗi', 'Rất vui được gặp bạn', 'Hẹn gặp lại', 'Tạm biệt'], 1, 'Nice to meet you = rất vui được gặp bạn.', ['Sai — "Xin lỗi" là "Sorry".', 'Đúng — Nice to meet you = rất vui được gặp bạn.', 'Sai — "Hẹn gặp lại" là "See you again".', 'Sai — "Tạm biệt" là "Goodbye".']),
    Q('"What is your name?" trả lời?', ['Hello, nice to meet you.', 'I am fine.', 'I am 10.', 'My name is Mai.'], 3, 'Hỏi tên → trả lời "My name is …".', ['Sai — đây là lời chào, không trả lời tên.', 'Sai — đây trả lời cho "How are you?".', 'Sai — đây trả lời cho "How old are you?".', 'Đúng — hỏi tên thì trả lời "My name is …".']),
    Q('"How old are you?" trả lời?', ['My name is Lan.', 'My name is Nam.', 'I am fine.', 'I am 10 years old.'], 3, 'Hỏi tuổi → "I am … years old."', ['Sai — đây trả lời cho câu hỏi tên.', 'Sai — đây trả lời cho câu hỏi tên.', 'Sai — đây trả lời cho "How are you?".', 'Đúng — hỏi tuổi thì trả lời "I am … years old".']),
    Q('"Goodbye" nghĩa là?', ['Cảm ơn', 'Xin chào', 'Xin lỗi', 'Tạm biệt'], 3, 'Goodbye = tạm biệt.', ['Sai — "Cảm ơn" là "Thank you".', 'Sai — "Xin chào" là "Hello".', 'Sai — "Xin lỗi" là "Sorry".', 'Đúng — Goodbye = tạm biệt, lời chào khi chia tay.']),
  ]),

  M(2, 'Where are you from?', [
    Q('"Where are you from?" hỏi về?', ['Sở thích cá nhân', 'Địa chỉ nhà cụ thể', 'Quê quán/Quốc tịch', 'Nghề nghiệp'], 2, 'Hỏi đến từ đâu.', ['Sai — sở thích hỏi bằng "What is your hobby?".', 'Sai — câu này hỏi đến từ đâu, không hỏi địa chỉ chi tiết.', 'Đúng — "Where are you from?" hỏi quê quán/quốc tịch (đến từ đâu).', 'Sai — nghề nghiệp hỏi bằng "What do you do?".']),
    Q('"I am from Vietnam." nghĩa là?', ['Tôi ở Anh', 'Tôi đến từ Việt Nam', 'Tôi là người Mỹ', 'Tôi 10 tuổi'], 1, 'Trả lời quê quán.', ['Sai — "ở Anh" là "from England".', 'Đúng — "from Vietnam" = đến từ Việt Nam.', 'Sai — "người Mỹ" là "American".', 'Sai — câu này nói quê quán, không nói tuổi.']),
    Q('Người Anh là?', ['French', 'Vietnamese', 'American', 'English'], 3, 'English = người Anh.', ['Sai — French = người Pháp.', 'Sai — Vietnamese = người Việt.', 'Sai — American = người Mỹ.', 'Đúng — English = người Anh.']),
    Q('Người Nhật là?', ['Japanese', 'Korean', 'Chinese', 'Vietnamese (người Việt)'], 0, 'Japanese = người Nhật.', ['Đúng — Japanese = người Nhật.', 'Sai — Korean = người Hàn.', 'Sai — Chinese = người Trung Quốc.', 'Sai — Vietnamese = người Việt.']),
    Q('Quốc gia Australia tiếng Anh là?', ['Africa', 'Austria', 'Australia', 'America'], 2, 'Australia = nước Úc.', ['Sai — Africa là châu Phi.', 'Sai — Austria là nước Áo, dễ nhầm với Australia.', 'Đúng — Australia = nước Úc.', 'Sai — America là nước Mỹ.']),
    Q('"Where" có nghĩa?', ['Khi nào', 'Ở đâu', 'Cái gì', 'Tại sao'], 1, 'Where = ở đâu.', ['Sai — "Khi nào" là "When".', 'Đúng — Where = ở đâu (hỏi nơi chốn).', 'Sai — "Cái gì" là "What".', 'Sai — "Tại sao" là "Why".']),
  ]),

  M(3, 'Daily routine', [
    Q('"I get up at 6 a.m." — "get up" nghĩa là?', ['Đi học', 'Ăn cơm', 'Đi ngủ', 'Thức dậy'], 3, 'Get up = thức dậy.', ['Sai — "đi học" là "go to school".', 'Sai — "ăn cơm" là "have a meal".', 'Sai — "đi ngủ" là "go to bed".', 'Đúng — get up = thức dậy.']),
    Q('"Brush teeth" nghĩa là?', ['Chải tóc', 'Đánh răng', 'Đi học', 'Rửa mặt'], 1, 'Brush teeth = đánh răng.', ['Sai — "chải tóc" là "brush/comb hair".', 'Đúng — brush teeth = đánh răng (teeth = răng).', 'Sai — "đi học" là "go to school".', 'Sai — "rửa mặt" là "wash face".']),
    Q('"Have breakfast" nghĩa là?', ['Ăn sáng', 'Ăn tối', 'Uống nước', 'Ăn trưa'], 0, 'Breakfast = bữa sáng.', ['Đúng — breakfast = bữa sáng.', 'Sai — "ăn tối" là "have dinner".', 'Sai — "uống nước" là "drink water".', 'Sai — "ăn trưa" là "have lunch".']),
    Q('"What time do you go to school?" trả lời?', ['I go to school at 7 a.m.', 'I like school very much.', 'I am 10.', 'I am fine.'], 0, 'Hỏi giờ đi học.', ['Đúng — "What time…?" hỏi giờ, trả lời "at 7 a.m.".', 'Sai — câu này nói thích trường, không trả lời giờ.', 'Sai — đây trả lời cho câu hỏi tuổi.', 'Sai — đây trả lời cho "How are you?".']),
    Q('"Go to bed" nghĩa là?', ['Thức dậy', 'Đi ngủ', 'Ăn sáng', 'Đi học'], 1, 'Go to bed = đi ngủ.', ['Sai — "thức dậy" là "get up".', 'Đúng — go to bed = đi ngủ.', 'Sai — "ăn sáng" là "have breakfast".', 'Sai — "đi học" là "go to school".']),
    Q('Câu nào ở present simple đúng?', ['I get up at 6.', 'I got up at 6.', 'I getting up at 6.', 'I gets up at 6.'], 0, 'Chủ ngữ "I" → động từ nguyên mẫu.', ['Đúng — chủ ngữ "I" dùng động từ nguyên mẫu "get up".', 'Sai — "got up" là thì quá khứ, không phải hiện tại đơn.', 'Sai — thiếu "am"; "getting" là dạng V-ing.', 'Sai — chỉ thêm "s" với he/she/it, "I" không thêm "s".']),
  ]),

  M(4, 'School subjects', [
    Q('"Math" có nghĩa là?', ['Ngữ văn', 'Toán', 'Tiếng Anh', 'Vật lý'], 1, 'Math (Maths) = Toán.', ['Sai — "Ngữ văn" là "Literature".', 'Đúng — Math (Maths) = môn Toán.', 'Sai — "Tiếng Anh" là "English".', 'Sai — "Vật lý" là "Physics".']),
    Q('"English" là môn?', ['Tiếng Anh', 'Tiếng Nhật', 'Tiếng Pháp', 'Tiếng Trung'], 0, 'English = Tiếng Anh.', ['Đúng — English = môn Tiếng Anh.', 'Sai — "Tiếng Nhật" là "Japanese".', 'Sai — "Tiếng Pháp" là "French".', 'Sai — "Tiếng Trung" là "Chinese".']),
    Q('"Science" có nghĩa?', ['Tin học', 'Địa lý', 'Khoa học', 'Lịch sử'], 2, 'Science = khoa học.', ['Sai — "Tin học" là "IT".', 'Sai — "Địa lý" là "Geography".', 'Đúng — Science = môn Khoa học.', 'Sai — "Lịch sử" là "History".']),
    Q('"What is your favourite subject?" trả lời?', ['Goodbye.', 'I am fine.', 'I am 10.', 'My favourite subject is Math.'], 3, 'Hỏi môn yêu thích.', ['Sai — "Goodbye" là lời tạm biệt, không trả lời môn học.', 'Sai — đây trả lời cho "How are you?".', 'Sai — đây trả lời cho câu hỏi tuổi.', 'Đúng — hỏi môn yêu thích thì trả lời "My favourite subject is …".']),
    Q('"Music" có nghĩa?', ['Khoa học', 'Âm nhạc', 'Mỹ thuật', 'Thể thao'], 1, 'Music = âm nhạc.', ['Sai — "Khoa học" là "Science".', 'Đúng — Music = môn Âm nhạc.', 'Sai — "Mỹ thuật" là "Art".', 'Sai — "Thể thao" là "P.E./Sport".']),
    Q('"Information Technology / IT" là môn?', ['Công nghệ', 'Tin học', 'Khoa học tự nhiên', 'Mỹ thuật'], 1, 'IT = tin học.', ['Sai — "Công nghệ" là "Technology" nói chung.', 'Đúng — IT (Information Technology) = môn Tin học.', 'Sai — "Khoa học tự nhiên" là "Natural Science".', 'Sai — "Mỹ thuật" là "Art".']),
  ]),

  M(5, 'Hobbies — Like + V-ing', [
    Q('"I like reading books." nghĩa là?', ['Tôi thích đọc sách', 'Tôi không đọc', 'Tôi ghét sách', 'Tôi mua sách'], 0, 'Like + V-ing = thích làm gì.', ['Đúng — "like reading books" = thích đọc sách.', 'Sai — "like" là thích, không phải phủ định.', 'Sai — "ghét" là "hate".', 'Sai — "mua" là "buy".']),
    Q('Sau "like" thường dùng?', ['V-ing', 'V nguyên mẫu', 'V quá khứ', 'Danh từ riêng'], 0, 'Like + V-ing (hoặc to-V) → thường dùng V-ing.', ['Đúng — sau "like" thường dùng V-ing (like reading, like swimming).', 'Sai — không nói "like read", phải thêm -ing hoặc "to".', 'Sai — không dùng động từ quá khứ sau "like".', 'Sai — sau "like" dùng động từ chỉ hành động, không phải tên riêng.']),
    Q('"What is your hobby?" trả lời?', ['I am fine.', 'I am 10.', 'I have a hobby.', 'My hobby is dancing.'], 3, 'Hỏi sở thích.', ['Sai — đây trả lời cho "How are you?".', 'Sai — đây trả lời cho câu hỏi tuổi.', 'Sai — câu này chưa nói rõ sở thích là gì.', 'Đúng — hỏi sở thích thì trả lời "My hobby is …".']),
    Q('"Swimming" nghĩa là?', ['Đọc sách', 'Bơi lội', 'Vẽ tranh', 'Chạy bộ'], 1, 'Swimming = bơi.', ['Sai — "đọc sách" là "reading".', 'Đúng — swimming = bơi lội.', 'Sai — "vẽ tranh" là "painting".', 'Sai — "chạy bộ" là "running".']),
    Q('"Painting" nghĩa là?', ['Vẽ tranh', 'Chụp ảnh', 'Ca hát', 'Đọc sách'], 0, 'Painting = vẽ tranh.', ['Đúng — painting = vẽ tranh.', 'Sai — "chụp ảnh" là "taking photos".', 'Sai — "ca hát" là "singing".', 'Sai — "đọc sách" là "reading".']),
    Q('"I don\'t like ___ cartoons." điền?', ['watches', 'to watch', 'watching', 'watched'], 2, 'Like + V-ing.', ['Sai — "watches" là dạng thêm -s cho he/she/it, không hợp ở đây.', 'Sai — sau "like" trong bài này dùng V-ing, không dùng "to watch".', 'Đúng — like + V-ing → watching.', 'Sai — "watched" là quá khứ, không đi sau "like".']),
  ]),

  M(6, 'Sports', [
    Q('"Football" là?', ['Bóng chuyền', 'Bóng bàn', 'Bóng đá', 'Bóng rổ'], 2, 'Football = bóng đá.', ['Sai — "bóng chuyền" là "volleyball".', 'Sai — "bóng bàn" là "table tennis".', 'Đúng — football = bóng đá.', 'Sai — "bóng rổ" là "basketball".']),
    Q('"Basketball" nghĩa là?', ['Cầu lông', 'Bóng đá', 'Bóng bàn', 'Bóng rổ'], 3, 'Basketball = bóng rổ.', ['Sai — "cầu lông" là "badminton".', 'Sai — "bóng đá" là "football".', 'Sai — "bóng bàn" là "table tennis".', 'Đúng — basketball = bóng rổ.']),
    Q('"Badminton" nghĩa là?', ['Bóng đá', 'Tennis', 'Cầu lông', 'Bóng rổ'], 2, 'Badminton = cầu lông.', ['Sai — "bóng đá" là "football".', 'Sai — tennis là quần vợt.', 'Đúng — badminton = cầu lông.', 'Sai — "bóng rổ" là "basketball".']),
    Q('"Do you like swimming?" trả lời (có)?', ['No, I do.', 'Yes, I do.', 'Yes, I am.', 'Yes, I likes.'], 1, 'Câu hỏi với do → Yes, I do.', ['Sai — "No" mâu thuẫn với "I do"; muốn trả lời "có".', 'Đúng — câu hỏi với "Do" → "Yes, I do".', 'Sai — hỏi với "Do" không trả lời "I am".', 'Sai — sau "I" không thêm "s", phải là "I do".']),
    Q('"Can you play the piano?" trả lời (không)?', ['No, I can not.', 'No, I do not.', 'Yes, I can.', 'No, I am not.'], 0, 'Hỏi với can → trả lời với can/cannot.', ['Đúng — hỏi với "Can" → trả lời "No, I can not (cannot)".', 'Sai — hỏi với "Can" không trả lời bằng "do".', 'Sai — "Yes" là có, nhưng câu hỏi muốn trả lời "không".', 'Sai — hỏi với "Can" không trả lời bằng "am".']),
    Q('"Table tennis" là?', ['Bóng bàn', 'Quần vợt', 'Cầu lông', 'Bóng chuyền'], 0, 'Table tennis = bóng bàn.', ['Đúng — table tennis = bóng bàn.', 'Sai — "quần vợt" là "tennis".', 'Sai — "cầu lông" là "badminton".', 'Sai — "bóng chuyền" là "volleyball".']),
  ]),

  M(7, 'Can / Can\'t', [
    Q('"Can" diễn tả?', ['Quá khứ', 'Mệnh lệnh', 'Khả năng', 'Tương lai'], 2, 'Can → khả năng / có thể.', ['Sai — "can" không nói về quá khứ.', 'Sai — "can" không phải dùng để ra lệnh.', 'Đúng — "can" diễn tả khả năng / có thể làm gì.', 'Sai — tương lai dùng "will".']),
    Q('Sau "can" là?', ['V + s/es', 'V nguyên mẫu', 'V quá khứ', 'V + ed'], 1, 'Can + V nguyên mẫu.', ['Sai — sau "can" không thêm "s" (không nói "can swims").', 'Đúng — can + V nguyên mẫu (can swim, can play).', 'Sai — sau "can" không dùng động từ quá khứ.', 'Sai — sau "can" không thêm "-ed".']),
    Q('"I can swim." nghĩa là?', ['Tôi không biết bơi', 'Tôi biết bơi', 'Tôi đã bơi', 'Tôi sẽ bơi'], 1, 'Can swim = biết/có thể bơi.', ['Sai — đây là câu khẳng định, không phải phủ định.', 'Đúng — "I can swim" = tôi biết/có thể bơi.', 'Sai — "đã bơi" là quá khứ "swam".', 'Sai — "sẽ bơi" dùng "will swim".']),
    Q('Phủ định của "can" là?', ['will not', 'do not', 'is not', 'can not / cannot / can\'t'], 3, 'Can\'t = cannot.', ['Sai — "will not" là phủ định của "will".', 'Sai — "do not" là phủ định của động từ thường.', 'Sai — "is not" là phủ định của "is".', 'Đúng — phủ định của "can" là can not / cannot / can\'t.']),
    Q('"Can you sing?" → trả lời (có thể)?', ['Yes, I will.', 'Yes, I do.', 'Yes, I am.', 'Yes, I can.'], 3, 'Hỏi với can → trả lời với can.', ['Sai — "will" dùng cho câu hỏi với "Will".', 'Sai — "do" dùng cho câu hỏi với "Do".', 'Sai — "am" dùng cho câu hỏi với "Are/Am".', 'Đúng — hỏi với "Can" → trả lời "Yes, I can".']),
    Q('"I ___ play the guitar but I can sing." điền?', ['don\'t (không phù hợp ngữ pháp)', 'can (mâu thuẫn với but)', 'can\'t', 'didn\'t (sai thì)'], 2, 'Mâu thuẫn với "but I can sing" → can\'t.', ['Sai — chỗ này nói về khả năng nên dùng can\'t, không dùng "don\'t".', 'Sai — nếu "can" thì mâu thuẫn với "but" (nhưng).', 'Đúng — "but I can sing" cho thấy vế trước là không thể → can\'t.', 'Sai — "didn\'t" là quá khứ, sai thì ở đây.']),
  ]),

  M(8, 'Past simple — was / were', [
    Q('"Was" dùng với chủ ngữ?', ['I, he, she, it', 'I, you', 'We, you, they', 'You, we, they'], 0, 'Was → I, he, she, it.', ['Đúng — was đi với I, he, she, it.', 'Sai — "you" dùng "were", không dùng "was".', 'Sai — we, you, they dùng "were".', 'Sai — đây là nhóm dùng "were".']),
    Q('"Were" dùng với?', ['It, she', 'You, we, they', 'Một mình it', 'He, she, it'], 1, 'Were → you, we, they.', ['Sai — it, she dùng "was".', 'Đúng — were đi với you, we, they.', 'Sai — "it" dùng "was".', 'Sai — he, she, it dùng "was".']),
    Q('"I ___ at school yesterday." điền?', ['am (sai thì hiện tại)', 'are (sai chủ ngữ)', 'was', 'were (sai chủ ngữ)'], 2, 'I + was.', ['Sai — "am" là hiện tại, mà "yesterday" là quá khứ.', 'Sai — "are" không đi với "I".', 'Đúng — I + was (quá khứ của am).', 'Sai — "I" dùng "was", không dùng "were".']),
    Q('"They ___ happy yesterday." điền?', ['are (sai thì)', 'were', 'was (sai số)', 'have (không phải tobe)'], 1, 'They + were.', ['Sai — "are" là hiện tại, mà "yesterday" là quá khứ.', 'Đúng — They + were (quá khứ).', 'Sai — "they" số nhiều, dùng "were" không dùng "was".', 'Sai — "have" không phải động từ to be.']),
    Q('Phủ định "was" là?', ['weren\'t', 'didn\'t', 'aren\'t', 'wasn\'t'], 3, 'Was not → wasn\'t.', ['Sai — "weren\'t" là phủ định của "were".', 'Sai — "didn\'t" là phủ định của động từ thường ở quá khứ.', 'Sai — "aren\'t" là phủ định của "are" (hiện tại).', 'Đúng — was not → wasn\'t.']),
    Q('"Were you at home last night?" trả lời (có)?', ['Yes, I was.', 'Yes, I did.', 'Yes, I am.', 'Yes, I were.'], 0, 'Were → trả lời với was/were.', ['Đúng — hỏi với "Were you…?" → "Yes, I was".', 'Sai — "did" dùng cho động từ thường.', 'Sai — "am" là hiện tại, câu hỏi ở quá khứ.', 'Sai — với "I" dùng "was", không dùng "were".']),
  ]),

  M(9, 'Past simple — V-ed regular', [
    Q('Quá khứ của "play" là?', ['plaied', 'playing', 'played', 'playd'], 2, 'Play → played (regular).', ['Sai — "play" có nguyên âm trước "y" nên giữ "y": played, không phải "plaied".', 'Sai — "playing" là dạng V-ing, không phải quá khứ.', 'Đúng — play → played (động từ có quy tắc, thêm -ed).', 'Sai — phải thêm "-ed" đầy đủ: played.']),
    Q('Quá khứ của "study" là?', ['studyed', 'studyd', 'studied', 'studyied'], 2, 'y → i + ed → studied.', ['Sai — "study" có phụ âm trước "y" nên đổi y → i: studied.', 'Sai — thiếu "e", phải là studied.', 'Đúng — phụ âm + y → đổi y thành i + ed → studied.', 'Sai — không thêm cả "ied" sau "y", phải đổi y → i.']),
    Q('Quá khứ của "stop" là?', ['stopped', 'stops', 'stopping', 'stoped'], 0, 'Stop → stopped (gấp đôi p).', ['Đúng — stop tận cùng phụ-nguyên-phụ → gấp đôi "p": stopped.', 'Sai — "stops" là dạng hiện tại thêm -s.', 'Sai — "stopping" là V-ing, không phải quá khứ.', 'Sai — phải gấp đôi "p": stopped, không phải "stoped".']),
    Q('"I ___ football yesterday." điền (play)?', ['played', 'will play', 'plaied', 'playing'], 0, 'Yesterday → quá khứ.', ['Đúng — "yesterday" báo hiệu quá khứ → played.', 'Sai — "will play" là tương lai, mà câu nói về hôm qua.', 'Sai — viết sai chính tả; đúng là played.', 'Sai — "playing" là V-ing, không phải quá khứ.']),
    Q('"She ___ TV last night." điền (watch)?', ['watched', 'watching', 'will watch', 'watches'], 0, 'Watched (V-ed).', ['Đúng — "last night" là quá khứ → watched.', 'Sai — "watching" là V-ing, không đứng một mình.', 'Sai — "will watch" là tương lai, sai thì.', 'Sai — "watches" là hiện tại đơn, không hợp với "last night".']),
    Q('Từ tín hiệu của quá khứ đơn?', ['next week', 'yesterday, last night, ago', 'tomorrow', 'every day, always'], 1, 'Yesterday, last night, ago → quá khứ.', ['Sai — "next week" báo hiệu tương lai.', 'Đúng — yesterday, last night, ago đều báo hiệu quá khứ.', 'Sai — "tomorrow" báo hiệu tương lai.', 'Sai — "every day, always" báo hiệu hiện tại đơn.']),
  ]),

  M(10, 'Past simple — irregular verbs', [
    Q('Quá khứ của "go" là?', ['gone', 'went', 'goes', 'wented'], 1, 'Go → went (bất quy tắc).', ['Sai — "gone" là quá khứ phân từ (V3), không phải quá khứ đơn.', 'Đúng — go → went (động từ bất quy tắc).', 'Sai — "goes" là hiện tại đơn thêm -es.', 'Sai — "go" bất quy tắc, không thêm "-ed".']),
    Q('Quá khứ của "have" là?', ['hadded', 'having', 'has', 'had'], 3, 'Have → had.', ['Sai — "have" bất quy tắc, không thêm "-ed".', 'Sai — "having" là V-ing, không phải quá khứ.', 'Sai — "has" là hiện tại đơn cho he/she/it.', 'Đúng — have → had (bất quy tắc).']),
    Q('Quá khứ của "eat" là?', ['eaten', 'eating', 'eats', 'ate'], 3, 'Eat → ate.', ['Sai — "eaten" là quá khứ phân từ (V3).', 'Sai — "eating" là V-ing.', 'Sai — "eats" là hiện tại đơn thêm -s.', 'Đúng — eat → ate (bất quy tắc).']),
    Q('Quá khứ của "see" là?', ['sawed', 'saw', 'seeing', 'sees'], 1, 'See → saw.', ['Sai — "see" bất quy tắc, không thêm "-ed".', 'Đúng — see → saw (bất quy tắc).', 'Sai — "seeing" là V-ing.', 'Sai — "sees" là hiện tại đơn thêm -s.']),
    Q('"I ___ to the zoo last Sunday." điền?', ['goed', 'will go', 'goes', 'went'], 3, 'Last Sunday → went.', ['Sai — "go" bất quy tắc, không có dạng "goed".', 'Sai — "will go" là tương lai, mà câu nói về Chủ nhật trước.', 'Sai — "goes" là hiện tại đơn.', 'Đúng — "last Sunday" là quá khứ → went.']),
    Q('"She ___ a new dress yesterday." điền (have)?', ['had', 'has', 'having', 'haves'], 0, 'Yesterday → had.', ['Đúng — "yesterday" là quá khứ → had.', 'Sai — "has" là hiện tại đơn, không hợp với "yesterday".', 'Sai — "having" là V-ing, không đứng một mình.', 'Sai — không có dạng "haves".']),
  ]),

  M(11, 'Past simple — Wh-questions', [
    Q('"What did you do yesterday?" hỏi về?', ['Ngày mai', 'Sở thích', 'Hoạt động hôm qua', 'Hôm nay'], 2, 'Hỏi về hành động đã làm hôm qua.', ['Sai — "did" và "yesterday" là quá khứ, không hỏi ngày mai.', 'Sai — câu này hỏi hành động đã làm, không hỏi sở thích.', 'Đúng — "did … yesterday" hỏi hoạt động đã làm hôm qua.', 'Sai — "yesterday" là hôm qua, không phải hôm nay.']),
    Q('Cấu trúc câu hỏi quá khứ đơn?', ['Does + S + V?', 'Do + S + V?', 'Did + S + V?', 'Was + S + V?'], 2, 'Did + S + V (nguyên mẫu)?', ['Sai — "Does" dùng cho hiện tại đơn (he/she/it).', 'Sai — "Do" dùng cho hiện tại đơn.', 'Đúng — câu hỏi quá khứ đơn với động từ thường: Did + S + V.', 'Sai — "Was" dùng cho động từ to be, không dùng với động từ thường.']),
    Q('"Where ___ you go last weekend?" điền?', ['will (sai thì tương lai)', 'do (sai thì hiện tại)', 'did', 'was (sai dạng trợ động từ)'], 2, 'Last weekend → did.', ['Sai — "will" là tương lai, mà "last weekend" là quá khứ.', 'Sai — "do" là hiện tại, sai thì.', 'Đúng — "last weekend" là quá khứ → did.', 'Sai — "was" không đi với động từ thường "go".']),
    Q('"I ___ go to school yesterday." (phủ định) điền?', ['weren\'t', 'didn\'t', 'wasn\'t', 'doesn\'t'], 1, 'Didn\'t + V.', ['Sai — "weren\'t" là phủ định của "were", không đi với động từ thường.', 'Đúng — phủ định quá khứ động từ thường: didn\'t + V (go).', 'Sai — "wasn\'t" đi với động từ to be, không đi với "go".', 'Sai — "doesn\'t" là hiện tại, sai thì.']),
    Q('"Did you watch TV?" trả lời (có)?', ['Yes, I did.', 'Yes, I was.', 'Yes, I do.', 'Yes, I am.'], 0, 'Did → Yes, I did.', ['Đúng — hỏi với "Did" → "Yes, I did".', 'Sai — "was" dùng cho câu hỏi với "Were/Was".', 'Sai — "do" là hiện tại, câu hỏi ở quá khứ.', 'Sai — "am" dùng cho câu hỏi với "Are/Am".']),
    Q('"How was your trip?" hỏi?', ['Sức khỏe', 'Phương tiện đi', 'Chuyến đi như thế nào', 'Bạn đi cùng ai'], 2, 'How was = … thế nào.', ['Sai — sức khỏe hỏi bằng "How are you?".', 'Sai — phương tiện hỏi bằng "How did you go?".', 'Đúng — "How was your trip?" hỏi chuyến đi như thế nào.', 'Sai — đi cùng ai hỏi bằng "Who did you go with?".']),
  ]),

  M(12, 'Future — will / be going to', [
    Q('"Will" diễn tả?', ['Mệnh lệnh', 'Tương lai', 'Hiện tại', 'Quá khứ'], 1, 'Will → tương lai.', ['Sai — "will" không phải để ra lệnh.', 'Đúng — "will" diễn tả tương lai (sẽ làm gì).', 'Sai — hiện tại dùng động từ thường hoặc to be.', 'Sai — quá khứ dùng động từ V-ed/cột 2.']),
    Q('Sau "will" là?', ['V + s/es', 'V + ed', 'V quá khứ', 'V nguyên mẫu'], 3, 'Will + V nguyên mẫu.', ['Sai — sau "will" không thêm "s" (không nói "will goes").', 'Sai — sau "will" không thêm "-ed".', 'Sai — sau "will" không dùng động từ quá khứ.', 'Đúng — will + V nguyên mẫu (will go, will visit).']),
    Q('"Tomorrow, I ___ visit my grandma." điền?', ['am (sai thì tương lai)', 'will', 'went (sai thì quá khứ)', 'was (sai thì quá khứ)'], 1, 'Tomorrow → will.', ['Sai — "am" không tạo thì tương lai cho động từ "visit" như vậy.', 'Đúng — "tomorrow" là tương lai → will visit.', 'Sai — "went" là quá khứ, mà câu nói về ngày mai.', 'Sai — "was" là quá khứ, sai thì.']),
    Q('"Be going to" dùng diễn tả?', ['Quá khứ tiếp diễn', 'Kế hoạch / dự định', 'Quá khứ', 'Hiện tại đơn'], 1, 'Be going to → dự định.', ['Sai — đây không phải thì quá khứ tiếp diễn.', 'Đúng — "be going to" diễn tả kế hoạch/dự định sẽ làm.', 'Sai — "be going to" nói về tương lai, không phải quá khứ.', 'Sai — đây không phải hiện tại đơn.']),
    Q('"I am going to ___ a doctor." điền?', ['being (sai cấu trúc)', 'am (đã có am ở trước)', 'to be (thừa to)', 'be'], 3, 'Going to + V nguyên mẫu.', ['Sai — sau "going to" dùng V nguyên mẫu, không dùng "being".', 'Sai — đã có "am" ở trước, không lặp lại.', 'Sai — "going to" đã có "to" rồi, thêm "to be" là thừa.', 'Đúng — going to + V nguyên mẫu → be.']),
    Q('Phủ định của "will" là?', ['do not', 'is not', 'did not', 'will not / won\'t'], 3, 'Won\'t = will not.', ['Sai — "do not" là phủ định của động từ thường hiện tại.', 'Sai — "is not" là phủ định của "is".', 'Sai — "did not" là phủ định ở quá khứ.', 'Đúng — phủ định của "will" là will not / won\'t.']),
  ]),

  M(13, 'Comparative — adjectives', [
    Q('So sánh hơn của "tall" là?', ['more tall', 'most tall', 'tallest', 'taller'], 3, 'Tall → taller (1 âm tiết + er).', ['Sai — "tall" ngắn nên thêm "-er", không dùng "more".', 'Sai — "most" dùng cho so sánh nhất.', 'Sai — "tallest" là so sánh nhất, không phải so sánh hơn.', 'Đúng — tall (1 âm tiết) → taller.']),
    Q('So sánh hơn của "big" là?', ['bigger', 'more big', 'biggest', 'more bigger'], 0, 'Big → bigger (gấp đôi g + er).', ['Đúng — "big" tận cùng phụ-nguyên-phụ → gấp đôi g + er → bigger.', 'Sai — "big" ngắn nên thêm "-er", không dùng "more".', 'Sai — "biggest" là so sánh nhất.', 'Sai — không dùng cả "more" lẫn "-er".']),
    Q('So sánh hơn của "beautiful" là?', ['beautifuler', 'more beautiful', 'beautifulest', 'most beautiful'], 1, 'Tính từ dài → more + adj.', ['Sai — tính từ dài không thêm "-er".', 'Đúng — tính từ dài (beautiful) → more + adj.', 'Sai — tính từ dài không thêm "-est".', 'Sai — "most beautiful" là so sánh nhất.']),
    Q('"Mai is ___ than Lan." (tall) điền?', ['the tallest', 'tallest', 'more tall', 'taller'], 3, 'So sánh hơn: taller.', ['Sai — "the tallest" là so sánh nhất.', 'Sai — "tallest" là so sánh nhất, mà câu có "than".', 'Sai — "tall" ngắn nên dùng "taller", không dùng "more".', 'Đúng — có "than" → so sánh hơn taller.']),
    Q('Sau so sánh hơn dùng?', ['as (dùng cho bằng nhau)', 'from (sai giới từ)', 'than', 'that (sai loại từ)'], 2, '… er + than …', ['Sai — "as … as" dùng cho so sánh bằng.', 'Sai — "from" không dùng trong so sánh hơn.', 'Đúng — sau so sánh hơn dùng "than" (taller than).', 'Sai — "that" không phải từ nối trong so sánh.']),
    Q('"Good" so sánh hơn là?', ['best', 'better', 'more good', 'gooder'], 1, 'Bất quy tắc: good → better.', ['Sai — "best" là so sánh nhất.', 'Đúng — good là bất quy tắc → better.', 'Sai — "good" bất quy tắc, không dùng "more good".', 'Sai — không có dạng "gooder".']),
  ]),

  M(14, 'Superlative — adjectives', [
    Q('So sánh nhất của "tall"?', ['taller', 'tallest', 'most tall', 'more tall'], 1, 'Tall → tallest (1 âm tiết + est).', ['Sai — "taller" là so sánh hơn.', 'Đúng — tall (1 âm tiết) → tallest.', 'Sai — "tall" ngắn nên thêm "-est", không dùng "most".', 'Sai — "more tall" là dạng sai của so sánh hơn.']),
    Q('So sánh nhất của "big"?', ['most biggest', 'biggest', 'most big', 'bigest'], 1, 'Big → biggest.', ['Sai — không dùng cả "most" lẫn "-est".', 'Đúng — big gấp đôi g + est → biggest.', 'Sai — "big" ngắn nên thêm "-est", không dùng "most".', 'Sai — phải gấp đôi "g": biggest.']),
    Q('So sánh nhất của "beautiful"?', ['more beautiful', 'beautifulest', 'beautifuler', 'most beautiful'], 3, 'Tính từ dài → most + adj.', ['Sai — "more beautiful" là so sánh hơn.', 'Sai — tính từ dài không thêm "-est".', 'Sai — tính từ dài không thêm "-er".', 'Đúng — tính từ dài → most + adj → most beautiful.']),
    Q('Trước so sánh nhất thường có?', ['a (mạo từ không xác định)', 'the', 'an (mạo từ không xác định)', 'this (đại từ chỉ định)'], 1, 'The + superlative.', ['Sai — so sánh nhất là duy nhất nên dùng "the", không dùng "a".', 'Đúng — the + so sánh nhất (the tallest, the best).', 'Sai — không dùng "an" với so sánh nhất.', 'Sai — "this" là đại từ chỉ định, không phải mạo từ của so sánh nhất.']),
    Q('"Phan Xi Păng is the ___ mountain in Vietnam." (high) điền?', ['higher', 'more high', 'highest', 'most high'], 2, 'Núi cao nhất → highest.', ['Sai — "higher" là so sánh hơn, mà có "the".', 'Sai — "high" ngắn nên thêm "-est", không dùng "more".', 'Đúng — cao nhất Việt Nam → the highest.', 'Sai — "high" ngắn nên dùng "highest", không dùng "most".']),
    Q('"Good" so sánh nhất là?', ['most good', 'goodest', 'better', 'best'], 3, 'Bất quy tắc: good → best.', ['Sai — "good" bất quy tắc, không dùng "most good".', 'Sai — không có dạng "goodest".', 'Sai — "better" là so sánh hơn.', 'Đúng — good là bất quy tắc → best.']),
  ]),

  M(15, 'Should / Shouldn\'t', [
    Q('"Should" dùng để?', ['Quá khứ', 'Mệnh lệnh quân sự', 'Cho lời khuyên', 'Hỏi tuổi'], 2, 'Should → lời khuyên.', ['Sai — "should" không nói về quá khứ.', 'Sai — "should" là khuyên nhẹ nhàng, không phải ra lệnh.', 'Đúng — "should" dùng để cho lời khuyên (nên làm gì).', 'Sai — hỏi tuổi dùng "How old…?".']),
    Q('Sau "should" là?', ['V + s/es', 'V nguyên mẫu', 'V quá khứ', 'V + ed'], 1, 'Should + V nguyên mẫu.', ['Sai — sau "should" không thêm "s".', 'Đúng — should + V nguyên mẫu (should go, should eat).', 'Sai — sau "should" không dùng động từ quá khứ.', 'Sai — sau "should" không thêm "-ed".']),
    Q('"You should ___ enough water." điền?', ['drink', 'to drink', 'drinking', 'drinks'], 0, 'Drink (nguyên mẫu).', ['Đúng — should + V nguyên mẫu → drink.', 'Sai — sau "should" không có "to".', 'Sai — sau "should" không dùng V-ing.', 'Sai — sau "should" không thêm "s".']),
    Q('"You shouldn\'t eat too much sugar." nghĩa?', ['Bạn nên ăn đường', 'Bạn phải ăn', 'Bạn không nên ăn quá nhiều đường', 'Bạn cấm ăn'], 2, 'Shouldn\'t → không nên.', ['Sai — "shouldn\'t" là không nên, không phải "nên".', 'Sai — "shouldn\'t" là lời khuyên, không phải bắt buộc.', 'Đúng — shouldn\'t = không nên (ăn quá nhiều đường).', 'Sai — "cấm" mạnh hơn; "shouldn\'t" chỉ là lời khuyên không nên.']),
    Q('Bạn bị nhức đầu — lời khuyên hợp lý?', ['You should run.', 'You should rest.', 'You should eat candy.', 'You should swim.'], 1, 'Nhức đầu → nên nghỉ ngơi.', ['Sai — chạy bộ không phù hợp khi nhức đầu.', 'Đúng — nhức đầu thì nên nghỉ ngơi (rest).', 'Sai — ăn kẹo không giúp hết nhức đầu.', 'Sai — bơi không phải lời khuyên hợp lý khi nhức đầu.']),
    Q('"Should I take an umbrella?" trả lời?', ['Yes, I do.', 'Yes, I was.', 'Yes, you should.', 'Yes, I am.'], 2, 'Hỏi với should → trả lời với should.', ['Sai — "do" không dùng để trả lời câu hỏi với "should".', 'Sai — "was" là quá khứ to be, không hợp.', 'Đúng — hỏi với "Should" → "Yes, you should".', 'Sai — "am" không dùng để trả lời câu hỏi với "should".']),
  ]),

  M(16, 'Illnesses — At the doctor', [
    Q('"Headache" nghĩa là?', ['Đau bụng', 'Nhức đầu', 'Ho khan', 'Đau răng'], 1, 'Headache = nhức đầu.', ['Sai — "đau bụng" là "stomachache".', 'Đúng — headache = nhức đầu (head = đầu).', 'Sai — "ho" là "cough".', 'Sai — "đau răng" là "toothache".']),
    Q('"Fever" nghĩa là?', ['Sổ mũi', 'Đau họng', 'Đau tai', 'Sốt'], 3, 'Fever = sốt.', ['Sai — "sổ mũi" là "runny nose".', 'Sai — "đau họng" là "sore throat".', 'Sai — "đau tai" là "earache".', 'Đúng — fever = sốt.']),
    Q('"Toothache" nghĩa là?', ['Nhức đầu', 'Đau lưng', 'Đau răng', 'Đau bụng'], 2, 'Toothache = đau răng.', ['Sai — "nhức đầu" là "headache".', 'Sai — "đau lưng" là "backache".', 'Đúng — toothache = đau răng (tooth = răng).', 'Sai — "đau bụng" là "stomachache".']),
    Q('"Stomachache" nghĩa là?', ['Đau tay', 'Đau đầu', 'Đau chân', 'Đau bụng'], 3, 'Stomachache = đau bụng.', ['Sai — "đau tay" không phải nghĩa này.', 'Sai — "đau đầu" là "headache".', 'Sai — "đau chân" không phải nghĩa này.', 'Đúng — stomachache = đau bụng (stomach = dạ dày).']),
    Q('"What\'s the matter with you?" hỏi?', ['Quê quán', 'Tên bạn', 'Tuổi bạn', 'Bạn bị làm sao'], 3, 'Hỏi về bệnh / vấn đề.', ['Sai — quê quán hỏi "Where are you from?".', 'Sai — tên hỏi "What is your name?".', 'Sai — tuổi hỏi "How old are you?".', 'Đúng — "What\'s the matter?" hỏi bạn bị làm sao / có vấn đề gì.']),
    Q('"I have a ___." (sốt) điền?', ['sore throat', 'fever', 'headache', 'toothache'], 1, 'Có sốt → fever.', ['Sai — "sore throat" là đau họng.', 'Đúng — sốt → fever.', 'Sai — "headache" là nhức đầu.', 'Sai — "toothache" là đau răng.']),
  ]),

  M(17, 'Giving directions', [
    Q('"Turn left" nghĩa là?', ['Rẽ trái', 'Đi thẳng', 'Rẽ phải', 'Quay đầu'], 0, 'Turn left = rẽ trái.', ['Đúng — turn left = rẽ trái (left = trái).', 'Sai — "đi thẳng" là "go straight".', 'Sai — "rẽ phải" là "turn right".', 'Sai — "quay đầu" là "turn around".']),
    Q('"Turn right" nghĩa là?', ['Đi thẳng', 'Rẽ trái', 'Đứng yên', 'Rẽ phải'], 3, 'Turn right = rẽ phải.', ['Sai — "đi thẳng" là "go straight".', 'Sai — "rẽ trái" là "turn left".', 'Sai — "đứng yên" là "stop/stand still".', 'Đúng — turn right = rẽ phải (right = phải).']),
    Q('"Go straight" nghĩa là?', ['Đi thẳng', 'Rẽ phải', 'Rẽ trái', 'Quay đầu'], 0, 'Go straight = đi thẳng.', ['Đúng — go straight = đi thẳng.', 'Sai — "rẽ phải" là "turn right".', 'Sai — "rẽ trái" là "turn left".', 'Sai — "quay đầu" là "turn around".']),
    Q('"How can I get to the post office?" hỏi?', ['Giá tiền', 'Tên bưu điện', 'Cách đến bưu điện', 'Giờ mở cửa'], 2, 'How can I get to … = đường đến đâu.', ['Sai — giá tiền hỏi "How much…?".', 'Sai — câu này hỏi đường đi, không hỏi tên.', 'Đúng — "How can I get to…?" hỏi cách/đường đến bưu điện.', 'Sai — giờ mở cửa hỏi "What time does it open?".']),
    Q('"Opposite" nghĩa là?', ['Đằng sau', 'Đối diện', 'Phía trước', 'Bên cạnh'], 1, 'Opposite = đối diện.', ['Sai — "đằng sau" là "behind".', 'Đúng — opposite = đối diện.', 'Sai — "phía trước" là "in front of".', 'Sai — "bên cạnh" là "next to".']),
    Q('"Next to" nghĩa là?', ['Đằng sau', 'Bên cạnh', 'Phía trước', 'Đối diện'], 1, 'Next to = bên cạnh.', ['Sai — "đằng sau" là "behind".', 'Đúng — next to = bên cạnh.', 'Sai — "phía trước" là "in front of".', 'Sai — "đối diện" là "opposite".']),
  ]),

  M(18, 'Ôn tập học kỳ I', [
    Q('"My name is Lan. ___ am 10." điền?', ['My (sai loại đại từ)', 'It (sai ngôi)', 'We (sai số)', 'I'], 3, 'Tự giới thiệu → I.', ['Sai — "My" là tính từ sở hữu, không làm chủ ngữ.', 'Sai — "It" chỉ vật, không nói tuổi mình.', 'Sai — "We" là chúng tôi (số nhiều), đang nói về một người.', 'Đúng — chủ ngữ chỉ bản thân → I am 10.']),
    Q('"I ___ to school yesterday." điền?', ['will go', 'went', 'go', 'go (sai thì)'], 1, 'Yesterday → went.', ['Sai — "will go" là tương lai, mà "yesterday" là quá khứ.', 'Đúng — "yesterday" là quá khứ → went.', 'Sai — "go" là hiện tại, sai thì.', 'Sai — "go" là hiện tại, phải dùng quá khứ "went".']),
    Q('"What is your favourite ___?" điền (môn học)?', ['animal', 'subject', 'sport', 'colour'], 1, 'Subject = môn học.', ['Sai — "animal" là con vật.', 'Đúng — subject = môn học.', 'Sai — "sport" là môn thể thao.', 'Sai — "colour" là màu sắc.']),
    Q('"She is ___ than me." điền (tall)?', ['tall', 'more tall', 'taller', 'tallest'], 2, 'So sánh hơn → taller.', ['Sai — "tall" là dạng gốc, mà có "than" nên cần so sánh hơn.', 'Sai — "tall" ngắn nên dùng "taller", không dùng "more".', 'Đúng — có "than" → so sánh hơn taller.', 'Sai — "tallest" là so sánh nhất, không đi với "than".']),
    Q('"You should ___ to bed early." điền?', ['go', 'to go', 'gone', 'will go'], 0, 'Should + V nguyên mẫu.', ['Đúng — should + V nguyên mẫu → go.', 'Sai — sau "should" không có "to".', 'Sai — "gone" là V3, không đi sau "should".', 'Sai — không dùng "will" sau "should".']),
    Q('"I am from ___." (Việt Nam) điền?', ['Vietnamese', 'Vietnames', 'Viet Nam city', 'Vietnam'], 3, 'Tên nước: Vietnam.', ['Sai — "Vietnamese" là người/tiếng Việt, không phải tên nước.', 'Sai — viết sai chính tả.', 'Sai — không có cách gọi "Viet Nam city".', 'Đúng — tên nước viết là Vietnam.']),
  ]),

  // ──────────────── HK2 ────────────────
  M(19, 'Ordinal numbers — Dates', [
    Q('"First" là số?', ['3rd', '1st', '4th', '2nd'], 1, 'First = thứ nhất = 1st.', ['Sai — "3rd" là "third" (thứ ba).', 'Đúng — first = thứ nhất = 1st.', 'Sai — "4th" là "fourth" (thứ tư).', 'Sai — "2nd" là "second" (thứ hai).']),
    Q('"Second" là số?', ['2nd', '3rd', '1st', '4th'], 0, 'Second = thứ hai = 2nd.', ['Đúng — second = thứ hai = 2nd.', 'Sai — "3rd" là "third".', 'Sai — "1st" là "first".', 'Sai — "4th" là "fourth".']),
    Q('"Third" là số?', ['4th', '3rd', '5th', '2nd'], 1, 'Third = thứ ba = 3rd.', ['Sai — "4th" là "fourth".', 'Đúng — third = thứ ba = 3rd.', 'Sai — "5th" là "fifth".', 'Sai — "2nd" là "second".']),
    Q('"5th" đọc là?', ['five', 'fifth', 'fiveth', 'fiveth'], 1, '5th = fifth.', ['Sai — "five" là số đếm (năm), không phải số thứ tự.', 'Đúng — 5th = fifth (đổi "ve" thành "f").', 'Sai — không có dạng "fiveth".', 'Sai — không có dạng "fiveth".']),
    Q('"What\'s the date today?" trả lời?', ['It is sunny.', 'I am 10.', 'I am fine.', 'It\'s September 2nd.'], 3, 'Hỏi ngày tháng.', ['Sai — đây trả lời cho câu hỏi thời tiết.', 'Sai — đây trả lời cho câu hỏi tuổi.', 'Sai — đây trả lời cho "How are you?".', 'Đúng — hỏi ngày tháng thì trả lời "It\'s September 2nd".']),
    Q('"Twelfth" là số?', ['12th', '11th', '10th', '20th'], 0, '12th = twelfth.', ['Đúng — twelfth = 12th (thứ mười hai).', 'Sai — "11th" là "eleventh".', 'Sai — "10th" là "tenth".', 'Sai — "20th" là "twentieth".']),
  ]),

  M(20, 'Jobs', [
    Q('"Teacher" là?', ['Bác sĩ', 'Cảnh sát', 'Đầu bếp', 'Giáo viên'], 3, 'Teacher = giáo viên.', ['Sai — "bác sĩ" là "doctor".', 'Sai — "cảnh sát" là "police officer".', 'Sai — "đầu bếp" là "cook/chef".', 'Đúng — teacher = giáo viên.']),
    Q('"Doctor" là?', ['Bác sĩ', 'Lái xe', 'Giáo viên', 'Công nhân'], 0, 'Doctor = bác sĩ.', ['Đúng — doctor = bác sĩ.', 'Sai — "lái xe" là "driver".', 'Sai — "giáo viên" là "teacher".', 'Sai — "công nhân" là "worker".']),
    Q('"Farmer" là?', ['Công nhân', 'Nông dân', 'Lái xe', 'Ngư dân'], 1, 'Farmer = nông dân.', ['Sai — "công nhân" là "worker".', 'Đúng — farmer = nông dân.', 'Sai — "lái xe" là "driver".', 'Sai — "ngư dân" là "fisherman".']),
    Q('"What does your father do?" hỏi?', ['Bố bạn ở đâu', 'Bố bạn tên gì', 'Bố bạn làm nghề gì', 'Bố bạn bao nhiêu tuổi'], 2, 'What … do? hỏi nghề.', ['Sai — "ở đâu" hỏi bằng "Where…?".', 'Sai — "tên gì" hỏi bằng "What is his name?".', 'Đúng — "What does … do?" hỏi nghề nghiệp.', 'Sai — "bao nhiêu tuổi" hỏi bằng "How old…?".']),
    Q('"My mother is a ___." (y tá) điền?', ['doctor', 'farmer', 'teacher', 'nurse'], 3, 'Nurse = y tá.', ['Sai — "doctor" là bác sĩ.', 'Sai — "farmer" là nông dân.', 'Sai — "teacher" là giáo viên.', 'Đúng — y tá → nurse.']),
    Q('"Worker" là?', ['Họa sĩ', 'Diễn viên', 'Công nhân', 'Bác sĩ'], 2, 'Worker = công nhân.', ['Sai — "họa sĩ" là "painter/artist".', 'Sai — "diễn viên" là "actor/actress".', 'Đúng — worker = công nhân.', 'Sai — "bác sĩ" là "doctor".']),
  ]),

  M(21, 'Animals at the zoo', [
    Q('"Lion" là?', ['Báo đốm', 'Gấu nâu', 'Cá sấu', 'Sư tử'], 3, 'Lion = sư tử.', ['Sai — "báo đốm" là "leopard".', 'Sai — "gấu nâu" là "brown bear".', 'Sai — "cá sấu" là "crocodile".', 'Đúng — lion = sư tử.']),
    Q('"Tiger" là?', ['Sói rừng', 'Báo đốm', 'Gấu nâu', 'Hổ'], 3, 'Tiger = hổ.', ['Sai — "sói" là "wolf".', 'Sai — "báo đốm" là "leopard".', 'Sai — "gấu nâu" là "brown bear".', 'Đúng — tiger = hổ.']),
    Q('"Elephant" là?', ['Tê giác', 'Hà mã', 'Hươu cao cổ', 'Voi'], 3, 'Elephant = voi.', ['Sai — "tê giác" là "rhino".', 'Sai — "hà mã" là "hippo".', 'Sai — "hươu cao cổ" là "giraffe".', 'Đúng — elephant = voi.']),
    Q('"Monkey" là?', ['Tinh tinh', 'Gấu nâu', 'Khỉ', 'Chuột túi'], 2, 'Monkey = khỉ.', ['Sai — "tinh tinh" là "chimpanzee".', 'Sai — "gấu nâu" là "brown bear".', 'Đúng — monkey = khỉ.', 'Sai — "chuột túi" là "kangaroo".']),
    Q('"Giraffe" là?', ['Ngựa vằn', 'Lạc đà', 'Hươu cao cổ', 'Tê giác'], 2, 'Giraffe = hươu cao cổ.', ['Sai — "ngựa vằn" là "zebra".', 'Sai — "lạc đà" là "camel".', 'Đúng — giraffe = hươu cao cổ.', 'Sai — "tê giác" là "rhino".']),
    Q('"Where is the lion?" trả lời?', ['I am 10.', 'It is a tiger.', 'It is in the cage.', 'I am fine.'], 2, 'Where → vị trí.', ['Sai — đây trả lời cho câu hỏi tuổi.', 'Sai — câu này nói con gì, không nói ở đâu.', 'Đúng — "Where…?" hỏi vị trí → "It is in the cage" (trong chuồng).', 'Sai — đây trả lời cho "How are you?".']),
  ]),

  M(22, 'Ôn nhẹ sau Tết — Tet holiday', [
    Q('"Tet holiday" là?', ['Tết Nguyên Đán', 'Giáng sinh', 'Quốc khánh', 'Trung Thu'], 0, 'Tet = Tết Nguyên Đán.', ['Đúng — Tet holiday = Tết Nguyên Đán.', 'Sai — "Giáng sinh" là "Christmas".', 'Sai — "Quốc khánh" là "National Day".', 'Sai — "Trung Thu" là "Mid-Autumn Festival".']),
    Q('"Banh chung" là?', ['Bánh tét', 'Bánh mì', 'Bánh chưng', 'Bánh dày'], 2, 'Banh chung = bánh chưng.', ['Sai — "bánh tét" là "banh tet".', 'Sai — "bánh mì" là "bread".', 'Đúng — banh chung = bánh chưng.', 'Sai — "bánh dày" là "banh day".']),
    Q('"Happy New Year" nghĩa là?', ['Chúc ngủ ngon', 'Chúc mừng năm mới', 'Chúc sinh nhật', 'Chúc thi tốt'], 1, 'Happy New Year = chúc mừng năm mới.', ['Sai — "chúc ngủ ngon" là "Good night".', 'Đúng — Happy New Year = chúc mừng năm mới.', 'Sai — "chúc sinh nhật" là "Happy Birthday".', 'Sai — "chúc thi tốt" là "Good luck".']),
    Q('"What do you do at Tet?" trả lời?', ['I visit my grandparents.', 'I am 10.', 'I am fine.', 'My name is Lan.'], 0, 'Hỏi hoạt động dịp Tết.', ['Đúng — hỏi việc làm dịp Tết → "I visit my grandparents".', 'Sai — đây trả lời cho câu hỏi tuổi.', 'Sai — đây trả lời cho "How are you?".', 'Sai — đây trả lời cho câu hỏi tên.']),
    Q('"Lucky money" là?', ['Tiền lương', 'Tiền lì xì', 'Tiền vay', 'Tiền thưởng'], 1, 'Lucky money = tiền lì xì.', ['Sai — "tiền lương" là "salary".', 'Đúng — lucky money = tiền lì xì.', 'Sai — "tiền vay" là "loan".', 'Sai — "tiền thưởng" là "bonus".']),
    Q('"Spring" là?', ['Mùa đông', 'Mùa hè', 'Mùa thu', 'Mùa xuân'], 3, 'Spring = mùa xuân.', ['Sai — "mùa đông" là "winter".', 'Sai — "mùa hè" là "summer".', 'Sai — "mùa thu" là "autumn/fall".', 'Đúng — spring = mùa xuân.']),
  ]),

  M(23, 'Weather — Seasons', [
    Q('"Sunny" nghĩa là?', ['Có mưa', 'Nắng', 'Lạnh giá', 'Có mây'], 1, 'Sunny = có nắng.', ['Sai — "có mưa" là "rainy".', 'Đúng — sunny = có nắng (sun = mặt trời).', 'Sai — "lạnh giá" là "cold".', 'Sai — "có mây" là "cloudy".']),
    Q('"Rainy" nghĩa là?', ['Có nắng', 'Mưa', 'Có gió', 'Có sấm'], 1, 'Rainy = có mưa.', ['Sai — "có nắng" là "sunny".', 'Đúng — rainy = có mưa (rain = mưa).', 'Sai — "có gió" là "windy".', 'Sai — "có sấm" là "stormy/thundery".']),
    Q('"Hot" nghĩa là?', ['Mát mẻ', 'Ấm áp', 'Nóng', 'Lạnh giá'], 2, 'Hot = nóng.', ['Sai — "mát mẻ" là "cool".', 'Sai — "ấm áp" là "warm".', 'Đúng — hot = nóng.', 'Sai — "lạnh giá" là "cold".']),
    Q('"Summer" là mùa?', ['Mùa thu', 'Hè', 'Mùa xuân', 'Mùa đông'], 1, 'Summer = mùa hè.', ['Sai — "mùa thu" là "autumn/fall".', 'Đúng — summer = mùa hè.', 'Sai — "mùa xuân" là "spring".', 'Sai — "mùa đông" là "winter".']),
    Q('"Winter" là mùa?', ['Mùa thu', 'Mùa hè', 'Mùa xuân', 'Đông'], 3, 'Winter = mùa đông.', ['Sai — "mùa thu" là "autumn/fall".', 'Sai — "mùa hè" là "summer".', 'Sai — "mùa xuân" là "spring".', 'Đúng — winter = mùa đông.']),
    Q('"What\'s the weather like today?" trả lời?', ['It is Monday.', 'My name is Lan.', 'I am 10.', 'It is sunny.'], 3, 'Hỏi thời tiết.', ['Sai — đây trả lời về thứ trong tuần, không phải thời tiết.', 'Sai — đây trả lời cho câu hỏi tên.', 'Sai — đây trả lời cho câu hỏi tuổi.', 'Đúng — hỏi thời tiết → "It is sunny" (trời nắng).']),
  ]),

  M(24, 'Hobbies — extended', [
    Q('"Reading" là sở thích?', ['Vẽ tranh', 'Đọc sách', 'Đá bóng', 'Xem TV'], 1, 'Reading = đọc.', ['Sai — "vẽ tranh" là "painting/drawing".', 'Đúng — reading = đọc sách.', 'Sai — "đá bóng" là "playing football".', 'Sai — "xem TV" là "watching TV".']),
    Q('"Dancing" nghĩa là?', ['Hát hò', 'Khiêu vũ', 'Bơi lội', 'Vẽ tranh'], 1, 'Dancing = khiêu vũ.', ['Sai — "hát hò" là "singing".', 'Đúng — dancing = khiêu vũ/nhảy múa.', 'Sai — "bơi lội" là "swimming".', 'Sai — "vẽ tranh" là "painting".']),
    Q('"Cooking" nghĩa là?', ['Lái xe', 'Nấu ăn', 'Đọc sách', 'Quét nhà'], 1, 'Cooking = nấu ăn.', ['Sai — "lái xe" là "driving".', 'Đúng — cooking = nấu ăn.', 'Sai — "đọc sách" là "reading".', 'Sai — "quét nhà" là "sweeping the floor".']),
    Q('"What do you like doing?" trả lời?', ['I like ___ing.', 'I am fine.', 'I do my homework.', 'I am 10.'], 0, 'Hỏi sở thích bằng "doing".', ['Đúng — hỏi với "like doing" → trả lời "I like …ing".', 'Sai — đây trả lời cho "How are you?".', 'Sai — câu này nói thói quen, chưa nói sở thích thích gì.', 'Sai — đây trả lời cho câu hỏi tuổi.']),
    Q('"Photography" nghĩa là?', ['Vẽ tranh', 'Chụp ảnh', 'Quay phim', 'Sưu tầm tem'], 1, 'Photography = nhiếp ảnh.', ['Sai — "vẽ tranh" là "painting".', 'Đúng — photography = chụp ảnh/nhiếp ảnh.', 'Sai — "quay phim" là "filming".', 'Sai — "sưu tầm tem" là "stamp collecting".']),
    Q('Câu nào đúng?', ['I likes swim.', 'I like swims.', 'I like to swimming.', 'I like swimming.'], 3, 'Like + V-ing.', ['Sai — "I" không thêm "s"; và sau "like" cần V-ing.', 'Sai — sau "like" dùng V-ing, không thêm "s" vào "swim".', 'Sai — không dùng cả "to" lẫn "-ing".', 'Đúng — like + V-ing → I like swimming.']),
  ]),

  M(25, 'My birthday — Months', [
    Q('"January" là tháng?', ['12', '2', '3', '1'], 3, 'January = tháng 1.', ['Sai — tháng 12 là "December".', 'Sai — tháng 2 là "February".', 'Sai — tháng 3 là "March".', 'Đúng — January = tháng 1.']),
    Q('"December" là tháng?', ['12', '10', '9', '11'], 0, 'December = tháng 12.', ['Đúng — December = tháng 12 (tháng cuối năm).', 'Sai — tháng 10 là "October".', 'Sai — tháng 9 là "September".', 'Sai — tháng 11 là "November".']),
    Q('"When is your birthday?" trả lời?', ['I am 10.', 'It is on the table.', 'My birthday is on May 5th.', 'I am fine.'], 2, 'Hỏi ngày sinh.', ['Sai — đây trả lời cho câu hỏi tuổi.', 'Sai — đây nói về vị trí đồ vật.', 'Đúng — "When…?" hỏi thời gian → "My birthday is on May 5th".', 'Sai — đây trả lời cho "How are you?".']),
    Q('"April" là tháng?', ['5', '3', '4', '6'], 2, 'April = tháng 4.', ['Sai — tháng 5 là "May".', 'Sai — tháng 3 là "March".', 'Đúng — April = tháng 4.', 'Sai — tháng 6 là "June".']),
    Q('Tháng 9 tiếng Anh là?', ['October', 'August', 'September', 'November'], 2, 'September = tháng 9.', ['Sai — October là tháng 10.', 'Sai — August là tháng 8.', 'Đúng — September = tháng 9.', 'Sai — November là tháng 11.']),
    Q('"What present do you want?" hỏi?', ['Tên bạn', 'Bạn bao nhiêu tuổi', 'Quà gì bạn muốn', 'Bữa tiệc khi nào'], 2, 'Present = quà.', ['Sai — tên hỏi "What is your name?".', 'Sai — tuổi hỏi "How old…?".', 'Đúng — "present" là quà → hỏi quà gì bạn muốn.', 'Sai — bữa tiệc khi nào hỏi "When is the party?".']),
  ]),

  M(26, 'Comparing animals — superlative', [
    Q('"Big" so sánh nhất là?', ['biggest', 'bigest', 'more bigger', 'more big'], 0, 'Big → biggest.', ['Đúng — big gấp đôi g + est → biggest.', 'Sai — phải gấp đôi "g": biggest.', 'Sai — không dùng cả "more" lẫn "-er/-est".', 'Sai — "big" ngắn nên dùng "biggest", không dùng "most".']),
    Q('"Small" so sánh hơn?', ['most small', 'smallest', 'more small', 'smaller'], 3, 'Small → smaller.', ['Sai — "most small" là dạng sai của so sánh nhất.', 'Sai — "smallest" là so sánh nhất.', 'Sai — "small" ngắn nên thêm "-er", không dùng "more".', 'Đúng — small (ngắn) → smaller.']),
    Q('"The elephant is the ___ animal at the zoo." (big) điền?', ['biggest', 'bigger', 'more big', 'the most big'], 0, 'The biggest.', ['Đúng — có "the" → so sánh nhất: biggest.', 'Sai — "bigger" là so sánh hơn.', 'Sai — "big" ngắn nên dùng "-est", không dùng "more".', 'Sai — "big" ngắn nên dùng "biggest", không dùng "most".']),
    Q('"Fast" so sánh nhất?', ['fastest', 'more fast', 'faster', 'most fast'], 0, 'Fast → fastest.', ['Đúng — fast (ngắn) → fastest.', 'Sai — "fast" ngắn nên thêm "-est", không dùng "more".', 'Sai — "faster" là so sánh hơn.', 'Sai — "fast" ngắn nên dùng "fastest", không dùng "most".']),
    Q('"The cheetah is the ___ animal." (fast) điền?', ['faster', 'the faster', 'fastest', 'most fast'], 2, 'The fastest.', ['Sai — "faster" là so sánh hơn, mà có "the".', 'Sai — "the faster" không đúng, dùng "the fastest".', 'Đúng — có "the" → so sánh nhất: fastest.', 'Sai — "fast" ngắn nên dùng "fastest", không dùng "most".']),
    Q('Cấu trúc so sánh nhất?', ['adj-er + than', 'as + adj + as', 'more + adj', 'The + adj-est / most + adj'], 3, 'The + adj-est hoặc the most + adj.', ['Sai — "adj-er + than" là so sánh hơn.', 'Sai — "as + adj + as" là so sánh bằng.', 'Sai — "more + adj" là so sánh hơn của tính từ dài.', 'Đúng — so sánh nhất: the + adj-est hoặc the most + adj.']),
  ]),

  M(27, 'My future job — going to', [
    Q('"I am going to be a ___." (giáo viên) điền?', ['classroom', 'teacher', 'student', 'school'], 1, 'Teacher = giáo viên.', ['Sai — "classroom" là lớp học (phòng học).', 'Đúng — giáo viên → teacher.', 'Sai — "student" là học sinh.', 'Sai — "school" là trường học.']),
    Q('"Be going to" diễn tả?', ['Kế hoạch tương lai', 'Hiện tại đơn', 'Mệnh lệnh', 'Quá khứ'], 0, 'Be going to → dự định.', ['Đúng — "be going to" diễn tả kế hoạch/dự định trong tương lai.', 'Sai — đây không phải hiện tại đơn.', 'Sai — đây không phải câu mệnh lệnh.', 'Sai — "be going to" nói về tương lai, không phải quá khứ.']),
    Q('"What are you going to be?" hỏi?', ['Sở thích hiện tại', 'Họ tên đầy đủ', 'Nghề tương lai', 'Quê quán'], 2, 'Hỏi nghề muốn làm.', ['Sai — sở thích hỏi "What is your hobby?".', 'Sai — họ tên hỏi "What is your name?".', 'Đúng — "going to be" hỏi nghề muốn làm trong tương lai.', 'Sai — quê quán hỏi "Where are you from?".']),
    Q('"She ___ going to be a nurse." điền?', ['are (sai ngôi)', 'were (sai thì)', 'is', 'am (sai ngôi)'], 2, 'She + is.', ['Sai — "are" đi với you/we/they, không đi với "she".', 'Sai — "were" là quá khứ, sai thì.', 'Đúng — She + is going to be.', 'Sai — "am" chỉ đi với "I".']),
    Q('"Pilot" là?', ['Phi công', 'Giáo viên', 'Nông dân', 'Bác sĩ'], 0, 'Pilot = phi công.', ['Đúng — pilot = phi công.', 'Sai — "giáo viên" là "teacher".', 'Sai — "nông dân" là "farmer".', 'Sai — "bác sĩ" là "doctor".']),
    Q('"Engineer" là?', ['Kỹ sư', 'Lái xe', 'Đầu bếp', 'Bác sĩ'], 0, 'Engineer = kỹ sư.', ['Đúng — engineer = kỹ sư.', 'Sai — "lái xe" là "driver".', 'Sai — "đầu bếp" là "cook/chef".', 'Sai — "bác sĩ" là "doctor".']),
  ]),

  M(28, 'My free time', [
    Q('"Free time" nghĩa là?', ['Giờ học', 'Giờ ngủ', 'Giờ ăn', 'Thời gian rảnh'], 3, 'Free time = thời gian rảnh.', ['Sai — "giờ học" là "study time".', 'Sai — "giờ ngủ" là "bedtime".', 'Sai — "giờ ăn" là "mealtime".', 'Đúng — free time = thời gian rảnh.']),
    Q('"In my free time, I like ___." điền?', ['to read', 'will read', 'read books', 'reading'], 3, 'Like + V-ing.', ['Sai — bài này dùng V-ing sau "like", không dùng "to read".', 'Sai — "will read" là tương lai, không đi sau "like".', 'Sai — sau "like" dùng V-ing, không dùng "read books" nguyên mẫu.', 'Đúng — like + V-ing → reading.']),
    Q('"Watch TV" nghĩa?', ['Đi dạo', 'Chơi game', 'Xem TV', 'Đọc sách'], 2, 'Watch TV = xem TV.', ['Sai — "đi dạo" là "go for a walk".', 'Sai — "chơi game" là "play games".', 'Đúng — watch TV = xem TV.', 'Sai — "đọc sách" là "read books".']),
    Q('"Play games" nghĩa?', ['Chơi nhạc', 'Đọc sách', 'Chơi game', 'Chơi đá bóng'], 2, 'Play games = chơi trò chơi.', ['Sai — "chơi nhạc" là "play music".', 'Sai — "đọc sách" là "read books".', 'Đúng — play games = chơi trò chơi.', 'Sai — "đá bóng" là "play football".']),
    Q('"How often do you read books?" hỏi?', ['Loại sách yêu thích', 'Thời gian đọc', 'Nơi đọc sách', 'Mức độ thường xuyên'], 3, 'How often → tần suất.', ['Sai — loại sách hỏi "What books…?".', 'Sai — thời gian hỏi "When…?".', 'Sai — nơi chốn hỏi "Where…?".', 'Đúng — "How often…?" hỏi mức độ thường xuyên (tần suất).']),
    Q('"Once a week" nghĩa?', ['Một lần/tháng', 'Một lần/ngày', 'Một lần/tuần', 'Không bao giờ'], 2, 'Once a week = mỗi tuần 1 lần.', ['Sai — "một lần/tháng" là "once a month".', 'Sai — "một lần/ngày" là "once a day".', 'Đúng — once a week = mỗi tuần 1 lần.', 'Sai — "không bao giờ" là "never".']),
  ]),

  M(29, 'Reading — A trip', [
    Q('"Trip" nghĩa?', ['Trường', 'Chuyến đi', 'Vali hành lý', 'Bản đồ'], 1, 'Trip = chuyến đi.', ['Sai — "trường" là "school".', 'Đúng — trip = chuyến đi.', 'Sai — "vali" là "suitcase".', 'Sai — "bản đồ" là "map".']),
    Q('"Where did you go?" trả lời?', ['I went to Hue.', 'I went by bus.', 'I am 10.', 'I am fine.'], 0, 'Hỏi điểm đến.', ['Đúng — "Where…?" hỏi nơi → "I went to Hue".', 'Sai — đây trả lời cho "How did you go?" (phương tiện).', 'Sai — đây trả lời cho câu hỏi tuổi.', 'Sai — đây trả lời cho "How are you?".']),
    Q('"What did you do there?" hỏi?', ['Bạn làm gì ở đó', 'Bạn bao nhiêu tuổi', 'Bạn đi với ai', 'Tên bạn'], 0, 'What did you do = đã làm gì.', ['Đúng — "What did you do there?" hỏi bạn đã làm gì ở đó.', 'Sai — tuổi hỏi "How old…?".', 'Sai — đi với ai hỏi "Who…with?".', 'Sai — tên hỏi "What is your name?".']),
    Q('"Holiday" nghĩa?', ['Ngày lễ', 'Kỳ nghỉ', 'Trường', 'Giờ học'], 1, 'Holiday = kỳ nghỉ.', ['Sai — một "ngày lễ" cụ thể thường là "festival/public day"; holiday là cả kỳ nghỉ.', 'Đúng — holiday = kỳ nghỉ.', 'Sai — "trường" là "school".', 'Sai — "giờ học" là "study time".']),
    Q('"By plane" nghĩa?', ['Bằng máy bay', 'Bằng xe', 'Bằng tàu', 'Bằng xe đạp'], 0, 'By plane = đi máy bay.', ['Đúng — by plane = đi bằng máy bay.', 'Sai — "bằng xe (ô tô)" là "by car".', 'Sai — "bằng tàu" là "by train".', 'Sai — "bằng xe đạp" là "by bike".']),
    Q('"Souvenir" nghĩa?', ['Thức ăn', 'Bản đồ du lịch', 'Hành lý', 'Quà lưu niệm'], 3, 'Souvenir = quà lưu niệm.', ['Sai — "thức ăn" là "food".', 'Sai — "bản đồ" là "map".', 'Sai — "hành lý" là "luggage".', 'Đúng — souvenir = quà lưu niệm.']),
  ]),

  M(30, 'Daily routine — review', [
    Q('"I usually ___ at 6 a.m." điền (get up)?', ['get up', 'gets up', 'got up', 'getting up'], 0, 'Hiện tại đơn → get up.', ['Đúng — "I" + hiện tại đơn → get up.', 'Sai — chỉ thêm "s" với he/she/it, "I" không thêm "s".', 'Sai — "got up" là quá khứ, mà "usually" là thói quen hiện tại.', 'Sai — "getting up" là V-ing, không đứng một mình.']),
    Q('"Always, usually, often, sometimes, never" là?', ['Trạng từ tần suất', 'Quan hệ từ', 'Danh từ', 'Đại từ'], 0, 'Trạng từ tần suất.', ['Đúng — đây là các trạng từ chỉ tần suất (mức độ thường xuyên).', 'Sai — quan hệ từ là "and, but, or…".', 'Sai — đây không phải danh từ.', 'Sai — đại từ là "I, you, he…".']),
    Q('"I ___ go to bed late." điền (không bao giờ)?', ['never', 'usually', 'sometimes', 'always'], 0, 'Never = không bao giờ.', ['Đúng — "không bao giờ" → never.', 'Sai — "usually" là thường thường.', 'Sai — "sometimes" là thỉnh thoảng.', 'Sai — "always" là luôn luôn.']),
    Q('Vị trí của trạng từ tần suất với động từ thường?', ['Trước động từ', 'Đầu câu', 'Cuối câu', 'Sau động từ'], 0, 'Trước động từ thường.', ['Đúng — trạng từ tần suất đứng trước động từ thường (I always go).', 'Sai — thường không đặt ở đầu câu trong mẫu cơ bản.', 'Sai — không đặt ở cuối câu.', 'Sai — đứng trước, không phải sau động từ thường.']),
    Q('"How often do you exercise?" trả lời?', ['Twice a week.', 'Hello.', 'I am 10.', 'I like sports.'], 0, 'Trả lời tần suất.', ['Đúng — "How often…?" hỏi tần suất → "Twice a week" (2 lần/tuần).', 'Sai — "Hello" là lời chào, không trả lời tần suất.', 'Sai — đây trả lời cho câu hỏi tuổi.', 'Sai — câu này nói sở thích, không nói tần suất.']),
    Q('"Have dinner" nghĩa?', ['Ăn trưa', 'Ăn vặt', 'Ăn sáng', 'Ăn tối'], 3, 'Dinner = bữa tối.', ['Sai — "ăn trưa" là "have lunch".', 'Sai — "ăn vặt" là "have a snack".', 'Sai — "ăn sáng" là "have breakfast".', 'Đúng — have dinner = ăn tối (dinner = bữa tối).']),
  ]),

  M(31, 'My family — describing people', [
    Q('"Mother" là?', ['Chị gái', 'Mẹ', 'Bố đẻ', 'Em gái'], 1, 'Mother = mẹ.', ['Sai — "chị gái" là "older sister".', 'Đúng — mother = mẹ.', 'Sai — "bố" là "father".', 'Sai — "em gái" là "younger sister".']),
    Q('"Brother" là?', ['Chị/em gái', 'Anh họ', 'Anh/em trai', 'Chú/cậu'], 2, 'Brother = anh/em trai.', ['Sai — "chị/em gái" là "sister".', 'Sai — "anh họ" là "cousin".', 'Đúng — brother = anh/em trai.', 'Sai — "chú/cậu" là "uncle".']),
    Q('"My father is ___." (cao) điền?', ['thin (gầy)', 'young (trẻ)', 'old (già)', 'tall'], 3, 'Tall = cao.', ['Sai — "thin" là gầy, không phải cao.', 'Sai — "young" là trẻ, không phải cao.', 'Sai — "old" là già, không phải cao.', 'Đúng — cao → tall.']),
    Q('"My sister has ___ hair." (đen) điền?', ['long (dài)', 'big (lớn)', 'black', 'new (mới)'], 2, 'Black hair = tóc đen.', ['Sai — "long" là dài, không phải màu đen.', 'Sai — "big" là lớn, không tả màu tóc.', 'Đúng — đen → black hair.', 'Sai — "new" là mới, không tả màu tóc.']),
    Q('"Grandfather" là?', ['Ông', 'Bà nội', 'Cô/dì', 'Bác trai'], 0, 'Grandfather = ông.', ['Đúng — grandfather = ông.', 'Sai — "bà" là "grandmother".', 'Sai — "cô/dì" là "aunt".', 'Sai — "bác/chú" là "uncle".']),
    Q('"How many people are there in your family?" hỏi?', ['Bạn bao nhiêu tuổi', 'Gia đình có mấy người', 'Bố mẹ làm nghề gì', 'Tên anh chị em'], 1, 'How many people = bao nhiêu người.', ['Sai — tuổi hỏi "How old…?".', 'Đúng — "How many people…?" hỏi gia đình có mấy người.', 'Sai — nghề hỏi "What do they do?".', 'Sai — tên hỏi "What is his/her name?".']),
  ]),

  M(32, 'Food and drinks', [
    Q('"Rice" nghĩa?', ['Cá tươi', 'Cơm/gạo', 'Trứng gà', 'Bánh mì'], 1, 'Rice = cơm/gạo.', ['Sai — "cá" là "fish".', 'Đúng — rice = cơm/gạo.', 'Sai — "trứng" là "egg".', 'Sai — "bánh mì" là "bread".']),
    Q('"Milk" là?', ['Nước ngọt', 'Cà phê', 'Sữa', 'Nước cam'], 2, 'Milk = sữa.', ['Sai — "nước ngọt" là "soft drink".', 'Sai — "cà phê" là "coffee".', 'Đúng — milk = sữa.', 'Sai — "nước cam" là "orange juice".']),
    Q('"Would you like some juice?" trả lời (có)?', ['Yes, I do.', 'Yes, I am.', 'Yes, please.', 'Yes, I can.'], 2, 'Would like → Yes, please.', ['Sai — không trả lời lời mời bằng "I do".', 'Sai — không trả lời lời mời bằng "I am".', 'Đúng — lời mời "Would you like…?" → "Yes, please".', 'Sai — không trả lời lời mời bằng "I can".']),
    Q('"Apple" là?', ['Táo', 'Xoài chín', 'Dưa hấu', 'Quả lê'], 0, 'Apple = táo.', ['Đúng — apple = táo.', 'Sai — "xoài" là "mango".', 'Sai — "dưa hấu" là "watermelon".', 'Sai — "quả lê" là "pear".']),
    Q('"Bread" là?', ['Bún bò', 'Phở bò', 'Bánh mì', 'Bơ thực vật'], 2, 'Bread = bánh mì.', ['Sai — "bún bò" là tên món Việt, không phải bread.', 'Sai — "phở" là tên món Việt.', 'Đúng — bread = bánh mì.', 'Sai — "bơ" là "butter".']),
    Q('Câu mời đúng?', ['Did you like some water?', 'Would you like some water?', 'Will you like some water?', 'Do you like some water?'], 1, 'Would like → câu mời.', ['Sai — "Did" là quá khứ, không dùng để mời.', 'Đúng — câu mời lịch sự: "Would you like…?".', 'Sai — "Will you like…?" không phải mẫu câu mời.', 'Sai — "Do you like…?" hỏi sở thích, không phải mời.']),
  ]),

  M(33, 'Reading — School activities', [
    Q('"Sport day" là?', ['Ngày hội thể thao', 'Ngày sinh nhật', 'Ngày khai giảng', 'Ngày lễ'], 0, 'Sport day = ngày hội thể thao.', ['Đúng — sport day = ngày hội thể thao.', 'Sai — "sinh nhật" là "birthday".', 'Sai — "khai giảng" là "opening ceremony".', 'Sai — "ngày lễ" là "holiday".']),
    Q('"Open Day" là?', ['Bế giảng', 'Ngày hội mở cửa', 'Khai giảng', 'Tốt nghiệp'], 1, 'Open Day = ngày mở cửa.', ['Sai — "bế giảng" là "closing ceremony".', 'Đúng — Open Day = ngày hội mở cửa (đón khách tham quan trường).', 'Sai — "khai giảng" là "opening ceremony".', 'Sai — "tốt nghiệp" là "graduation".']),
    Q('"Field trip" là?', ['Tan trường', 'Đi tham quan / dã ngoại', 'Học bù', 'Học trên lớp'], 1, 'Field trip = đi dã ngoại.', ['Sai — "tan trường" là "after school".', 'Đúng — field trip = đi tham quan/dã ngoại.', 'Sai — "học bù" là "make-up class".', 'Sai — "học trên lớp" là "classroom learning".']),
    Q('"Library" là?', ['Văn phòng', 'Phòng tin', 'Sân thể thao', 'Thư viện'], 3, 'Library = thư viện.', ['Sai — "văn phòng" là "office".', 'Sai — "phòng tin" là "computer room".', 'Sai — "sân thể thao" là "sports ground".', 'Đúng — library = thư viện.']),
    Q('"Classroom" là?', ['Lớp học', 'Sân chơi', 'Văn phòng', 'Thư viện'], 0, 'Classroom = lớp học.', ['Đúng — classroom = lớp học (phòng học).', 'Sai — "sân chơi" là "playground".', 'Sai — "văn phòng" là "office".', 'Sai — "thư viện" là "library".']),
    Q('"What do you do at break time?" hỏi?', ['Bạn làm gì giờ ra chơi', 'Số tiết học', 'Đường tới trường', 'Tên bạn'], 0, 'Break time = giờ ra chơi.', ['Đúng — "break time" là giờ ra chơi → hỏi bạn làm gì giờ ra chơi.', 'Sai — số tiết hỏi "How many lessons…?".', 'Sai — đường đi hỏi "How do you get to…?".', 'Sai — tên hỏi "What is your name?".']),
  ]),

  M(34, 'Ôn cuối cấp — Grammar review', [
    Q('"He ___ a teacher." điền?', ['be (thiếu chia)', 'are (sai ngôi)', 'is', 'was (sai thì)'], 2, 'He + is.', ['Sai — "be" chưa chia, phải dùng "is".', 'Sai — "are" đi với you/we/they, không đi với "he".', 'Đúng — He + is.', 'Sai — "was" là quá khứ; câu này ở hiện tại.']),
    Q('"They ___ at home now." điền?', ['are', 'am (sai ngôi)', 'be (thiếu chia)', 'was (sai thì)'], 0, 'They + are.', ['Đúng — They + are; "now" là hiện tại.', 'Sai — "am" chỉ đi với "I".', 'Sai — "be" chưa chia.', 'Sai — "was" là quá khứ; "now" là hiện tại.']),
    Q('"I ___ a book yesterday." (read) điền?', ['read', 'will read', 'reading', 'readed'], 0, 'Read là động từ bất quy tắc — quá khứ vẫn viết "read" (phát âm /red/).', ['Đúng — "read" bất quy tắc: quá khứ vẫn viết "read" (đọc là /red/).', 'Sai — "will read" là tương lai, mà "yesterday" là quá khứ.', 'Sai — "reading" là V-ing, không đứng một mình.', 'Sai — "read" bất quy tắc, không có dạng "readed".']),
    Q('"She can ___ English well." điền?', ['speak', 'speaks', 'to speak', 'speaking'], 0, 'Can + V nguyên mẫu.', ['Đúng — can + V nguyên mẫu → speak.', 'Sai — sau "can" không thêm "s".', 'Sai — sau "can" không có "to".', 'Sai — sau "can" không dùng V-ing.']),
    Q('"My brother is ___ than me." (tall) điền?', ['more tall', 'most tall', 'tallest', 'taller'], 3, 'So sánh hơn.', ['Sai — "tall" ngắn nên dùng "taller", không dùng "more".', 'Sai — "most tall" là dạng sai của so sánh nhất.', 'Sai — "tallest" là so sánh nhất, không đi với "than".', 'Đúng — có "than" → so sánh hơn: taller.']),
    Q('"You should ___ healthy food." điền?', ['to eat', 'eat', 'eats', 'eating'], 1, 'Should + V nguyên mẫu.', ['Sai — sau "should" không có "to".', 'Đúng — should + V nguyên mẫu → eat.', 'Sai — sau "should" không thêm "s".', 'Sai — sau "should" không dùng V-ing.']),
  ]),

  M(35, 'Ôn cuối cấp — Tổng hợp', [
    Q('"Hello! My name ___ Lan." điền?', ['are (sai ngôi)', 'is', 'am (sai ngôi)', 'be (thiếu chia)'], 1, 'My name + is.', ['Sai — "name" số ít, không dùng "are".', 'Đúng — "My name" số ít → is.', 'Sai — "am" chỉ đi với "I".', 'Sai — "be" chưa chia.']),
    Q('"How ___ are you?" điền?', ['many (sai cấu trúc)', 'much (sai cấu trúc)', 'high (sai nghĩa)', 'old'], 3, 'How old = bao nhiêu tuổi.', ['Sai — "How many" hỏi số lượng danh từ đếm được.', 'Sai — "How much" hỏi giá/số lượng không đếm được.', 'Sai — "high" hỏi độ cao của vật, không hỏi tuổi người.', 'Đúng — How old = bao nhiêu tuổi.']),
    Q('"Where ___ you from?" điền?', ['do (sai trợ động từ)', 'were (sai thì)', 'have (sai loại từ)', 'are'], 3, 'Where are you from?', ['Sai — "from" đi với to be, không dùng "do".', 'Sai — "were" là quá khứ; câu này ở hiện tại.', 'Sai — "have" không phải động từ to be.', 'Đúng — Where are you from?']),
    Q('"___ is your favourite colour?" điền?', ['Which', 'What', 'How', 'Why'], 1, 'What = cái gì.', ['Sai — "Which" dùng khi chọn trong số đã biết.', 'Đúng — "What is your favourite colour?" hỏi màu gì.', 'Sai — "How" hỏi cách thức/như thế nào.', 'Sai — "Why" hỏi lý do.']),
    Q('"I have ___ apple." điền?', ['a (trước phụ âm)', 'any (dùng phủ định)', 'an', 'some (dùng số nhiều)'], 2, 'Trước nguyên âm "a" → an apple.', ['Sai — "a" dùng trước phụ âm; "apple" bắt đầu bằng nguyên âm.', 'Sai — "any" thường dùng trong câu phủ định/nghi vấn.', 'Đúng — "apple" bắt đầu bằng nguyên âm → an apple.', 'Sai — "some" dùng với số nhiều/không đếm được.']),
    Q('"There ___ many books on the desk." điền?', ['are', 'has', 'have', 'were'], 0, 'Books (số nhiều) → are.', ['Đúng — "books" số nhiều ở hiện tại → There are.', 'Sai — "has" không dùng trong cấu trúc "There…".', 'Sai — "have" không dùng trong cấu trúc "There…".', 'Sai — "were" là quá khứ; câu này ở hiện tại.']),
  ]),

  M(36, 'End of Primary — Ready for Grade 6 English!', [
    Q('Câu nào ở thì QUÁ KHỨ ĐƠN (simple past)?', ['I go to school.', 'I went to school yesterday.', 'I will go to school.', 'I am going to school.'], 1, 'Quá khứ đơn dùng động từ dạng V2: go → went.', ['Sai — đó là thì hiện tại đơn.', 'Đúng — "went" là dạng quá khứ của "go".', 'Sai — "will go" là thì tương lai đơn.', 'Sai — "am going" là hiện tại tiếp diễn.']),
    Q('"Where were you last Sunday?" — câu trả lời đúng là?', ['I am at home.', 'I will be at home.', 'I was at the zoo.', 'I go to the zoo.'], 2, 'Câu hỏi ở quá khứ nên câu trả lời cũng ở quá khứ.', ['Sai — "am" là hiện tại, không hợp với "last Sunday".', 'Sai — "will be" là tương lai.', 'Đúng — "was" là dạng quá khứ, hợp với "last Sunday".', 'Sai — "go" là hiện tại đơn.']),
    Q('Which WH-word asks about a REASON?', ['Where', 'When', 'Who', 'Why'], 3, 'Why = tại sao, hỏi về lí do.', ['Sai — Where hỏi về nơi chốn.', 'Sai — When hỏi về thời gian.', 'Sai — Who hỏi về người.', 'Đúng — Why hỏi về lí do.']),
    Q('Câu nào dùng "going to" để nói về dự định?', ['I am going to visit my grandma next week.', 'I visited my grandma.', 'I visit my grandma every Sunday.', 'I can visit my grandma.'], 0, 'be going to + V = dự định sắp làm.', ['Đúng — "am going to visit" diễn tả dự định sắp tới.', 'Sai — đó là thì quá khứ đơn.', 'Sai — đó là thì hiện tại đơn, nói về thói quen.', 'Sai — "can" nói về khả năng, không phải dự định.']),
    Q('"My brother is taller than me." dùng cấu trúc nào?', ['So sánh nhất', 'So sánh hơn', 'Câu hỏi', 'Câu phủ định'], 1, 'tall → taller + than = so sánh hơn.', ['Sai — so sánh nhất dùng "the tallest".', 'Đúng — "taller than" là cấu trúc so sánh hơn.', 'Sai — câu này không phải câu hỏi.', 'Sai — câu này không có từ phủ định.']),
    Q('In Grade 6 you will learn a new tense called:', ['Simple present', 'Simple past', 'Present perfect', 'Imperative'], 2, 'Lớp 6 học thêm present continuous và present perfect.', ['Sai — hiện tại đơn em đã học ở tiểu học.', 'Sai — quá khứ đơn em đã học ở Lớp 5.', 'Đúng — thì hiện tại hoàn thành (present perfect) là nội dung mới ở Lớp 6.', 'Sai — câu mệnh lệnh không phải một thì.']),
  ]),
];

export const P5TA_SCENARIOS = indexBy(P5TA_WEEKS);
