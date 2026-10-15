// ============================================================
// Lớp 8 · NGHỆ THUẬT (ÂM NHẠC + MĨ THUẬT) — Lý thuyết + Ví dụ 35 tuần
// Bám SGK Nghệ thuật 8 GDPT 2018 (KNTT · CTST · Cánh Diều).
// Key: "S8NT-wNN-quiz".
// ============================================================

const L = (topic, intro, objectives, theory, examples) => ({ topic, intro, objectives, theory, examples });

export const S8NT_LESSONS = {
  'S8NT-w01-quiz': L(
    'Âm nhạc — Ôn tập nhạc lí cơ bản (nốt, nhịp, khoá, dấu hoá)',
    'Mở đầu Âm nhạc 8, cô trò mình cùng "khởi động" lại toàn bộ nền nhạc lí đã học ở lớp 6 – 7: bảy nốt, khuông nhạc, các loại nhịp, khoá Sol và dấu hoá. Đây là "hành trang" để bước vào những kiến thức mới khó và hay hơn.',
    [
      'Đọc và nhớ tên 7 nốt cơ bản cùng tên quốc tế tương ứng.',
      'Hệ thống lại các loại nhịp đã học: 2/4, 3/4, 4/4, 6/8.',
      'Nhắc lại vai trò của khoá Sol và ba loại dấu hoá.',
      'Vận dụng đọc một câu nhạc đơn giản đúng cao độ và trường độ.',
    ],
    [
      { h: 'Bảy nốt nhạc và tên quốc tế' },
      { p: 'Mọi giai điệu đều dệt nên từ 7 nốt cơ bản: Đô – Rê – Mi – Pha – Son – La – Si, tương ứng với cách ghi quốc tế C – D – E – F – G – A – B. Chuỗi này lặp lại ở nhiều quãng tám khác nhau, từ trầm đến bổng.' },
      { h: 'Khuông nhạc và khoá Sol' },
      { p: 'Khuông nhạc gồm 5 dòng kẻ và 4 khe, đếm từ dưới lên. Khoá Sol là ký hiệu xoắn ốc đặt ở đầu khuông; vòng xoắn của nó bao quanh dòng kẻ thứ 2, "đóng dấu" rằng nốt nằm trên dòng 2 chính là Son. Từ mốc đó suy ra mọi nốt còn lại.' },
      { h: 'Các loại nhịp đã học' },
      { ul: [
        'Nhịp 2/4: mỗi ô có 2 phách, mẫu mạnh – nhẹ; hợp với hành khúc.',
        'Nhịp 3/4: 3 phách, mạnh – nhẹ – nhẹ; uyển chuyển như điệu valse.',
        'Nhịp 4/4: 4 phách, mạnh – nhẹ – mạnh vừa – nhẹ; phổ biến nhất.',
        'Nhịp 6/8: nhịp kép, 6 phách dồn thành 2 nhóm; êm dịu, đong đưa.',
      ] },
      { h: 'Dấu hoá — thay đổi cao độ nửa cung' },
      { ul: [
        'Dấu thăng (#): nâng nốt lên nửa cung.',
        'Dấu giáng (♭): hạ nốt xuống nửa cung.',
        'Dấu bình (♮): xoá hiệu lực thăng/giáng, trả nốt về cao độ tự nhiên.',
      ] },
      { p: 'Dấu hoá đặt ngay trước nốt gọi là dấu hoá bất thường, chỉ có giá trị trong ô nhịp đó. Dấu hoá đặt ngay sau khoá (đầu khuông) gọi là hoá biểu, có giá trị suốt cả bài.' },
      { h: 'Trường độ và phách' },
      { p: 'Phách là đơn vị đếm thời gian, thường lấy nốt đen làm chuẩn (= 1 phách). Nốt tròn = 4 phách, nốt trắng = 2 phách, nốt móc đơn = 1/2 phách. Mỗi loại nốt dài gấp đôi loại kế tiếp.' },
      { note: 'Lớp 8 sẽ không dạy lại từ đầu mà xây tiếp trên nền này. Em hãy chắc chắn mình đọc thông khuông nhạc khoá Sol trước khi sang các bài sau.' },
    ],
    [
      { q: 'Nhịp 4/4 có mấy phách, phách nào mạnh?', a: '4 phách trong mỗi ô nhịp. Phách 1 mạnh nhất, phách 3 mạnh vừa, phách 2 và 4 nhẹ. Sơ đồ: mạnh – nhẹ – mạnh vừa – nhẹ.' },
      { q: 'Dấu thăng (#) và dấu giáng (♭) khác nhau thế nào?', a: 'Dấu thăng nâng nốt lên nửa cung (ví dụ Pha → Pha thăng), dấu giáng hạ nốt xuống nửa cung (ví dụ Si → Si giáng). Cả hai cùng làm thay đổi cao độ một lượng nửa cung nhưng ngược chiều nhau.' },
      { q: 'Một dấu hoá đặt ở đầu khuông (sau khoá Sol) có tác dụng đến đâu?', a: 'Đó là hoá biểu, có giá trị với mọi nốt cùng tên trong suốt cả bản nhạc, ở mọi ô nhịp. Khác với dấu hoá bất thường đặt trước một nốt cụ thể, chỉ có hiệu lực trong một ô nhịp.' },
    ]
  ),

  'S8NT-w02-quiz': L(
    'Âm nhạc — Đảo phách (syncopation)',
    'Vì sao có những bài hát khiến đôi vai ta tự nhiên muốn lắc lư, dù không cố ý? Bí mật nằm ở một kĩ thuật tiết tấu rất duyên: đảo phách. Tuần này mình khám phá "gia vị" làm nên cái "groove" hấp dẫn của âm nhạc.',
    [
      'Hiểu khái niệm đảo phách và phách mạnh – phách yếu.',
      'Nhận biết hiện tượng đảo phách khi nghe một bài hát.',
      'Phân biệt đảo phách với nhịp lấy đà (anacrusis).',
      'Tập gõ/vỗ tay tạo đảo phách đơn giản.',
    ],
    [
      { h: 'Phách mạnh – phách yếu' },
      { p: 'Trong mỗi ô nhịp, các phách không "ngang hàng": có phách mạnh và phách yếu. Ví dụ nhịp 4/4 nhấn ở phách 1 và 3. Bình thường, giai điệu rơi vào phách mạnh sẽ nghe vững vàng, đều đặn.' },
      { h: 'Đảo phách là gì?' },
      { p: 'Đảo phách (syncopation) là hiện tượng nhấn vào phách yếu hoặc vào phần yếu của phách (chỗ "lệch nhịp"), thay vì nhấn vào phách mạnh như thông thường. Nó tạo cảm giác bất ngờ, "trượt nhịp" rất thú vị.' },
      { h: 'Tác dụng của đảo phách' },
      { ul: [
        'Tạo cảm giác lắc lư, "đung đưa", gọi là groove.',
        'Khiến tiết tấu khó đoán trước, sinh động hơn nhịp đều.',
        'Là đặc trưng của nhiều thể loại: jazz, blues, funk, R&B, latin, reggae.',
        'Tạo điểm nhấn cảm xúc trong câu hát.',
      ] },
      { h: 'Đảo phách trong bài hát quen thuộc' },
      { p: 'Rất nhiều ca khúc nhạc nhẹ Việt Nam và quốc tế dùng đảo phách. Khi hát, em sẽ thấy có những chữ "rơi" vào giữa hai phách thay vì đúng phách — đó chính là đảo phách. Hãy thử nghe và gõ chân theo phách đều, em sẽ "bắt" được chỗ lời hát đi lệch nhịp gõ.' },
      { h: 'Phân biệt với nhịp lấy đà' },
      { p: 'Nhịp lấy đà (ô nhịp thiếu ở đầu bài) là một hay vài nốt đệm trước phách mạnh đầu tiên, không phải đảo phách. Đảo phách diễn ra liên tục bên trong các ô nhịp đầy đủ, do cách nhấn lệch trọng âm.' },
      { note: 'Cách luyện tốt nhất: vừa giậm chân đều theo phách, vừa vỗ tay xen vào giữa các phách. Khi tay và chân "lệch nhau" mà vẫn khớp, em đã cảm được đảo phách.' },
    ],
    [
      { q: 'Vì sao nhạc jazz, funk khiến người nghe muốn lắc lư?', a: 'Vì các thể loại này dùng đảo phách rất nhiều — nhấn vào phách yếu hoặc giữa phách thay vì phách mạnh. Sự "lệch nhịp" có chủ ý này tạo ra groove khiến cơ thể tự muốn nhún nhảy theo.' },
      { q: 'Trong nhịp 4/4, đảo phách thường rơi vào đâu?', a: 'Thường rơi vào phách yếu (phách 2, 4) hoặc vào phần yếu giữa các phách (các "và" — ví dụ "một-và-hai-và"). Thay vì nhấn ở phách 1 mạnh, người ta nhấn vào những chỗ này để tạo cảm giác lệch.' },
      { q: 'Đảo phách và nhịp lấy đà có phải là một không?', a: 'Không. Nhịp lấy đà chỉ là ô nhịp thiếu ở đầu bài (vài nốt đệm trước phách mạnh đầu tiên). Còn đảo phách là cách nhấn lệch trọng âm xảy ra liên tục bên trong các ô nhịp đầy đủ. Hai khái niệm khác hẳn nhau.' },
    ]
  ),

  'S8NT-w03-quiz': L(
    'Âm nhạc — Gam thứ và hợp âm (mở rộng hợp âm 7)',
    'Vì sao có bài nghe vui tươi, có bài nghe man mác buồn? Một phần câu trả lời nằm ở gam thứ và các hợp âm. Tuần này mình tìm hiểu giọng thứ, hợp âm ba và làm quen với hợp âm 7 đầy màu sắc.',
    [
      'Phân biệt cảm giác của gam trưởng và gam thứ.',
      'Biết cấu tạo hợp âm ba (trưởng, thứ).',
      'Hiểu cấu tạo và màu sắc của hợp âm 7.',
      'Nhận biết một số hợp âm 7 phổ biến qua âm thanh.',
    ],
    [
      { h: 'Gam trưởng và gam thứ' },
      { p: 'Gam (thang âm) là chuỗi các nốt theo một trật tự khoảng cách nhất định. Gam trưởng (như Đô trưởng) cho cảm giác sáng, vui, khoẻ khoắn. Gam thứ (như La thứ) cho cảm giác trầm, buồn, sâu lắng. Cùng một bài, đổi từ trưởng sang thứ sẽ đổi hẳn sắc thái cảm xúc.' },
      { h: 'Hợp âm ba — viên gạch của hoà thanh' },
      { p: 'Hợp âm là tập hợp 3 nốt trở lên vang lên cùng lúc. Hợp âm ba cơ bản gồm 3 nốt chồng quãng ba: nốt gốc, nốt ba và nốt năm. Ví dụ hợp âm Đô trưởng (C) = Đô – Mi – Son.' },
      { ul: [
        'Hợp âm trưởng (C, F, G…): sáng, vui — quãng ba trưởng ở dưới.',
        'Hợp âm thứ (Am, Dm, Em…): trầm, buồn — quãng ba thứ ở dưới.',
      ] },
      { h: 'Hợp âm 7 — thêm chiều sâu' },
      { p: 'Hợp âm 7 là hợp âm ba được thêm một nốt nữa, cách nốt gốc một quãng bảy. Ví dụ Đô trưởng 7 (Cmaj7) = Đô – Mi – Son – Si. Nốt thứ tư này tạo "màu sắc" phong phú, sang trọng hơn hợp âm ba đơn giản.' },
      { h: 'Một số loại hợp âm 7 thường gặp' },
      { ul: [
        'Hợp âm bảy trưởng (Cmaj7): êm dịu, mơ màng, "thư thái".',
        'Hợp âm bảy thứ (Dm7, Am7): buồn nhẹ nhưng mềm mại.',
        'Hợp âm bảy át (G7): có độ căng, "muốn giải" về hợp âm chủ.',
      ] },
      { h: 'Hợp âm 7 dùng ở đâu?' },
      { p: 'Hợp âm 7 rất phổ biến trong jazz, bossa nova, ballad và cả nhạc nhẹ Việt Nam. Chúng làm bản nhạc bớt "phẳng", thêm chiều sâu và cảm xúc tinh tế.' },
      { note: 'Em không cần thuộc lòng từng nốt — quan trọng là cảm được sự khác nhau: hợp âm ba "trơn", hợp âm 7 "đậm đà" hơn. Hãy nghe và so sánh.' },
    ],
    [
      { q: 'Hợp âm Đô trưởng 7 (Cmaj7) gồm những nốt nào?', a: 'Gồm 4 nốt: Đô – Mi – Son – Si. Đó là hợp âm ba Đô trưởng (Đô – Mi – Son) thêm nốt Si cách nốt gốc Đô một quãng bảy trưởng.' },
      { q: 'Vì sao cùng một bài, đổi sang giọng thứ lại nghe buồn hơn?', a: 'Vì gam thứ có cấu trúc khoảng cách giữa các nốt khác gam trưởng, đặc biệt là quãng ba thứ ngay từ nốt gốc, tạo màu âm trầm và da diết hơn. Tai người nghe quen liên hệ màu âm này với cảm xúc buồn, lắng đọng.' },
      { q: 'Hợp âm bảy át (G7) tạo cảm giác gì khi đứng trước hợp âm chủ?', a: 'Tạo cảm giác căng thẳng, "treo lơ lửng" và đòi hỏi được giải quyết. Khi G7 chuyển về hợp âm Đô trưởng (C), tai người nghe cảm thấy "về nhà", thoả mãn và kết thúc trọn vẹn. Đó là quan hệ át – chủ rất quan trọng trong hoà thanh.' },
    ]
  ),

  'S8NT-w04-quiz': L(
    'Âm nhạc — Kĩ thuật hát nâng cao (hơi thở, khẩu hình, đồng đều)',
    'Một giọng hát đẹp không tự nhiên mà có — nó được rèn từ hơi thở, khẩu hình và sự đồng đều. Tuần này mình học những kĩ thuật giúp giọng hát khoẻ, vang, bền và biết hoà với cả tập thể.',
    [
      'Thực hành kĩ thuật lấy hơi bằng bụng (cơ hoành).',
      'Biết mở khẩu hình và phát âm rõ lời.',
      'Hiểu cách điều khiển cường độ to – nhỏ (sắc thái).',
      'Biết hát hoà giọng, đồng đều trong tốp ca/hợp xướng.',
    ],
    [
      { h: 'Hơi thở — gốc rễ của giọng hát' },
      { p: 'Hát hay bắt đầu từ hơi thở đúng. Em hít vào bằng mũi sao cho bụng (vùng cơ hoành) phình ra, không phải nhô vai lên. Khi hát, bụng xẹp dần để đẩy hơi ra đều — nhờ vậy giọng chắc, ngân được lâu mà không hụt hơi.' },
      { h: 'Mở khẩu hình' },
      { ul: [
        'Mở miệng đủ rộng theo chiều dọc (khoảng hai ngón tay).',
        'Hạ lưỡi, nâng vòm miệng như đang chuẩn bị ngáp.',
        'Giữ hàm thả lỏng, không gồng cứng cổ.',
      ] },
      { p: 'Khẩu hình mở đúng giúp âm thanh thoát ra tròn, vang, không bị "nghẹn trong cổ".' },
      { h: 'Phát âm rõ lời' },
      { ul: [
        'Phân biệt rõ phụ âm dễ lẫn: l/n, s/x, tr/ch, d/gi.',
        'Mở rõ nguyên âm a, o, ô, u khi ngân dài.',
        'Nhả gọn phụ âm cuối, không "nuốt chữ".',
      ] },
      { h: 'Sắc thái — to nhỏ có chủ ý' },
      { p: 'Hát hay không phải là hát to suốt bài. Em cần biết hát nhẹ (piano) ở những câu tâm tình, hát mạnh (forte) ở cao trào, và chuyển dần to lên (crescendo) hoặc nhỏ dần (decrescendo). Sắc thái làm bài hát có "hơi thở" và cảm xúc.' },
      { h: 'Hát hoà giọng trong tập thể' },
      { p: 'Khi hát tốp ca hoặc hợp xướng, mục tiêu là sự đồng đều, không phải nổi bật một mình. Em phải lắng nghe các bạn, vào – ra cùng nhịp, không hát to át người khác, lấy hơi cùng chỗ. Một tốp ca hay là khi nhiều giọng hoà thành "một giọng".' },
      { note: 'Hát đúng kĩ thuật giúp giọng bền — em có thể hát hàng giờ mà không khản. Hát sai (gào bằng cổ) sẽ làm hỏng dây thanh.' },
    ],
    [
      { q: 'Khi hát, em nên lấy hơi bằng bộ phận nào và vì sao?', a: 'Nên lấy hơi bằng bụng (cơ hoành), không phải bằng ngực hay vai. Hơi bụng sâu và dài, giúp giọng chắc và ngân được lâu mà không bị hụt hay run. Lấy hơi nông bằng ngực dễ làm giọng đuối và "đứng" giữa câu.' },
      { q: 'Mở khẩu hình đúng giúp ích gì cho giọng hát?', a: 'Giúp âm thanh thoát ra to, tròn, vang, không bị nghẹn lại trong cổ họng. Khi miệng mở đủ rộng và vòm miệng nâng lên, khoang cộng hưởng lớn hơn nên tiếng hát đầy đặn và sáng hơn.' },
      { q: 'Trong hợp xướng, điều quan trọng nhất em cần làm là gì?', a: 'Lắng nghe các bạn để hoà giọng và giữ sự đồng đều: vào – ra đúng nhịp cùng cả nhóm, không hát to át người khác, lấy hơi cùng chỗ, sắc thái thống nhất. Mục tiêu là nhiều giọng hoà thành một giọng chung, không ai "vượt" lên.' },
    ]
  ),

  'S8NT-w05-quiz': L(
    'Âm nhạc — Nhạc cụ tiết tấu và giai điệu (recorder/kèn phím nâng cao)',
    'Sau khi đã quen với nhạc cụ ở lớp dưới, tuần này mình nâng cấp kĩ năng: thổi/đánh được những nốt cao hơn, biết ngắt – luyến và bước đầu chơi bè đôi. Đây là lúc nhạc cụ trở thành "người bạn biểu diễn" của em.',
    [
      'Mở rộng âm vực: chơi được các nốt ở quãng tám cao.',
      'Phân biệt và thực hành hai cách diễn tấu: staccato (ngắt) và legato (luyến).',
      'Hiểu cách phối hợp hai bè trong một bài.',
      'Biết phối hợp nhạc cụ tiết tấu giữ nhịp cho bài hát.',
    ],
    [
      { h: 'Mở rộng âm vực' },
      { p: 'Ở lớp 8, em được chơi cả những nốt cao hơn. Với recorder (sáo dọc), bịt một phần lỗ ngón cái phía sau và thổi nhẹ hơn sẽ tạo được nốt ở quãng tám cao, trong và sáng. Với kèn phím, em chỉ cần bấm các phím ở phía bên phải bàn phím.' },
      { h: 'Staccato — diễn tấu ngắt gọn' },
      { p: 'Staccato là cách chơi các nốt ngắn, tách rời, "nảy". Với nhạc cụ hơi, em dùng đầu lưỡi gõ nhẹ âm "tu" để ngắt từng nốt. Hiệu quả: tiết tấu vui tươi, nhanh nhẹn, giòn giã.' },
      { h: 'Legato — diễn tấu liền tiếng' },
      { p: 'Legato (luyến) là cách chơi các nốt nối liền nhau mượt mà, không ngắt. Với nhạc cụ hơi, em giữ hơi liên tục qua nhiều nốt. Hiệu quả: giai điệu mềm mại, du dương, tha thiết. Staccato và legato là hai "tính cách" trái ngược nhau của câu nhạc.' },
      { h: 'Chơi bè đôi' },
      { ul: [
        'Bè 1 (bè chính): chơi giai điệu — phần dễ nhận nhất.',
        'Bè 2 (bè phụ): chơi bè hoà theo, đỡ và làm dày cho bè 1.',
        'Hai bè phải khớp nhịp và cân bằng âm lượng, không bè nào lấn át.',
      ] },
      { h: 'Phối hợp nhạc cụ tiết tấu' },
      { p: 'Trống con, thanh phách, song loan hay maracas có thể giữ nhịp cho cả nhóm. Người chơi nhạc cụ tiết tấu giống "trái tim" của tốp nhạc — phải gõ thật đều, làm điểm tựa nhịp cho người chơi giai điệu và người hát.' },
      { note: 'Khi tập bè đôi, hãy tập riêng từng bè cho thật chắc rồi mới ghép. Nếu ghép vội khi chưa thuộc, hai bè sẽ "đá nhau" và lệch nhịp.' },
    ],
    [
      { q: 'Làm thế nào để tạo nốt cao trên recorder (sáo dọc)?', a: 'Bịt một phần lỗ ngón cái (lỗ ở mặt sau) và thổi hơi nhẹ hơn bình thường. Cách này làm cột khí dao động ở tần số cao hơn, cho ra nốt ở quãng tám trên, nghe trong và sáng. Thổi quá mạnh sẽ làm âm bị chói, the thé.' },
      { q: 'Staccato và legato khác nhau như thế nào?', a: 'Staccato là chơi các nốt ngắn, tách rời, nảy gọn (với nhạc cụ hơi thì dùng lưỡi gõ "tu" ngắt từng nốt). Legato là chơi các nốt nối liền, mượt mà, không ngắt (giữ hơi liên tục). Một bên giòn giã – vui tươi, một bên du dương – tha thiết.' },
      { q: 'Khi chơi bài hai bè, điều gì dễ làm hỏng bản nhạc nhất?', a: 'Hai bè lệch nhịp hoặc một bè chơi to lấn át bè kia. Để tránh, cần tập riêng từng bè cho thuộc, rồi ghép chậm, giữ nhịp chung và cân bằng âm lượng để hai bè "trò chuyện" hài hoà chứ không "đá nhau".' },
    ]
  ),

  'S8NT-w06-quiz': L(
    'Âm nhạc — Johann Sebastian Bach và âm nhạc Baroque',
    'Có những bản nhạc nghe như một toà nhà được xây dựng tinh xảo, cân đối đến từng chi tiết. Đó là âm nhạc của Johann Sebastian Bach — người được mệnh danh "cha đẻ" của nhạc cổ điển phương Tây. Tuần này mình bước vào thời kì Baroque.',
    [
      'Biết những nét chính về cuộc đời J.S. Bach.',
      'Kể được một số tác phẩm tiêu biểu của Bach.',
      'Hiểu đặc điểm của âm nhạc thời kì Baroque.',
      'Cảm nhận vẻ đẹp của lối viết đối âm (phức điệu).',
    ],
    [
      { h: 'Bach là ai?' },
      { p: 'Johann Sebastian Bach (1685 – 1750) là nhà soạn nhạc, nghệ sĩ đàn organ người Đức, sống vào cuối thời kì Baroque. Ông xuất thân từ một gia đình có truyền thống âm nhạc, mồ côi cha mẹ từ nhỏ, tự học và làm việc cần mẫn suốt đời. Sinh thời ông được biết đến nhiều với tư cách nghệ sĩ organ; mãi về sau, tài năng soạn nhạc của ông mới được tôn vinh đầy đủ.' },
      { h: 'Thời kì Baroque' },
      { p: 'Baroque (khoảng 1600 – 1750) là thời kì âm nhạc châu Âu nổi bật với sự trang trọng, cầu kì và cân đối. Đây là thời của đàn organ, harpsichord (đàn clavico/đại phong cầm phím), và những hình thức như fuga, concerto, suite.' },
      { h: 'Đối âm (phức điệu)' },
      { ul: [
        'Đối âm là lối viết nhiều giai điệu độc lập vang lên cùng lúc, đan bện vào nhau một cách hài hoà.',
        'Mỗi bè đều có "đời sống" riêng, không chỉ là đệm cho bè chính.',
        'Bach là bậc thầy vĩ đại nhất của lối viết này, đặc biệt qua thể loại fuga.',
      ] },
      { h: 'Một số tác phẩm tiêu biểu' },
      { ul: [
        'Bộ Brandenburg Concertos — sáu bản concerto rực rỡ.',
        'Toccata và Fuga giọng Rê thứ — viết cho đàn organ, rất nổi tiếng.',
        'Bình quân luật (The Well-Tempered Clavier) — tập prelude và fuga ở mọi giọng.',
        'Mass giọng Si thứ — tác phẩm thanh nhạc tôn giáo đồ sộ.',
      ] },
      { h: 'Vì sao Bach quan trọng?' },
      { p: 'Bach tổng hợp và đưa lên đỉnh cao gần như mọi kĩ thuật âm nhạc thời ông. Cấu trúc tác phẩm của ông chặt chẽ như toán học mà vẫn đầy cảm xúc. Vì thế, ông được coi là nền móng để các thế hệ sau — Mozart, Beethoven — phát triển tiếp.' },
      { note: 'Khi nghe Bach, em hãy thử "đuổi theo" từng giai điệu riêng trong bản nhạc. Đó là cách thưởng thức cái hay của phức điệu.' },
    ],
    [
      { q: 'Bach sống vào thời kì âm nhạc nào và ông là người nước nào?', a: 'Ông sống vào thời kì Baroque (cuối thời kì này, mất năm 1750), là người Đức. Ông được xem là một trong những đại diện tiêu biểu nhất, đỉnh cao của âm nhạc Baroque.' },
      { q: 'Đối âm (phức điệu) là gì và vì sao Bach nổi tiếng về nó?', a: 'Đối âm là lối viết nhiều giai điệu độc lập vang lên đồng thời mà vẫn hoà hợp; mỗi bè có nét riêng chứ không chỉ làm nền. Bach là bậc thầy vĩ đại nhất của lối viết này, đặc biệt trong thể loại fuga, nơi một chủ đề được các bè lần lượt "đối đáp" nhau.' },
      { q: 'Vì sao Bach được gọi là "cha đẻ" của nhạc cổ điển phương Tây?', a: 'Vì ông tổng hợp và nâng lên đỉnh cao hầu hết kĩ thuật âm nhạc của thời mình, với cấu trúc chặt chẽ như toán học nhưng vẫn giàu cảm xúc. Những thành tựu đó trở thành nền móng để các nhà soạn nhạc sau ông (Mozart, Beethoven…) kế thừa và phát triển.' },
    ]
  ),

  'S8NT-w07-quiz': L(
    'Âm nhạc — Wolfgang Amadeus Mozart và thời kì Cổ điển',
    'Hãy tưởng tượng một cậu bé 5 tuổi đã sáng tác nhạc, 12 tuổi viết opera. Đó là Wolfgang Amadeus Mozart — thần đồng âm nhạc của thời kì Cổ điển. Tuần này mình tìm hiểu cuộc đời ngắn ngủi mà rực rỡ của ông.',
    [
      'Biết những nét chính về cuộc đời Mozart.',
      'Kể được một số tác phẩm tiêu biểu của ông.',
      'Hiểu đặc điểm của âm nhạc thời kì Cổ điển.',
      'Cảm nhận vẻ trong sáng, cân đối trong nhạc Mozart.',
    ],
    [
      { h: 'Thần đồng âm nhạc' },
      { p: 'Wolfgang Amadeus Mozart (1756 – 1791) sinh ở Salzburg (nước Áo). Từ rất nhỏ ông đã bộc lộ tài năng phi thường: 3 tuổi chơi được đàn phím, 5 tuổi sáng tác, được cha đưa đi biểu diễn khắp châu Âu. Dù tài năng kiệt xuất, ông mất rất sớm ở tuổi 35 trong cảnh khó khăn.' },
      { h: 'Thời kì Cổ điển' },
      { p: 'Thời kì Cổ điển (khoảng 1750 – 1820) đề cao sự trong sáng, cân đối, rõ ràng. Khác với Baroque cầu kì nhiều bè, nhạc Cổ điển thường có một giai điệu chính nổi bật với phần đệm hoà thanh rõ ràng (lối viết chủ điệu).' },
      { h: 'Đặc điểm âm nhạc Mozart' },
      { ul: [
        'Giai điệu đẹp, duyên dáng, dễ nhớ.',
        'Cấu trúc cân đối, sáng sủa, hoàn chỉnh.',
        'Cảm xúc tươi sáng, thanh thoát, nhưng cũng có chiều sâu.',
        'Sử dụng nhuần nhuyễn hình thức sonate.',
      ] },
      { h: 'Một số tác phẩm tiêu biểu' },
      { ul: [
        'Giao hưởng số 40 giọng Son thứ — một trong những giao hưởng nổi tiếng nhất.',
        'Eine kleine Nachtmusik (Một bản tiểu dạ khúc) — vui tươi, quen thuộc.',
        'Opera "Cây sáo thần" (The Magic Flute).',
        'Bản Requiem (Lễ cầu hồn) — tác phẩm cuối đời còn dang dở.',
      ] },
      { h: 'Một thiên tài đa thể loại' },
      { p: 'Mozart viết được mọi thể loại của thời ông: giao hưởng, hoà tấu, sonate, opera, nhạc tôn giáo… Ở thể loại nào ông cũng để lại kiệt tác. Dù cuộc đời nhiều khó khăn và ngắn ngủi, âm nhạc của ông luôn toát lên vẻ tươi sáng, lạc quan.' },
      { note: 'Nhạc Mozart thường được dùng cho trẻ nhỏ vì sự trong trẻo, cân đối. Em hãy nghe Eine kleine Nachtmusik để cảm nhận điều đó.' },
    ],
    [
      { q: 'Mozart sinh ở đâu và sống vào thời kì âm nhạc nào?', a: 'Ông sinh ở Salzburg (nước Áo) và sống vào thời kì Cổ điển (khoảng 1750 – 1820). Ông là một trong những đại diện tiêu biểu nhất của thời kì này.' },
      { q: 'Vì sao Mozart được gọi là thần đồng âm nhạc?', a: 'Vì ông bộc lộ tài năng phi thường từ rất sớm: 3 tuổi chơi được đàn phím, 5 tuổi đã sáng tác, được đưa đi biểu diễn khắp châu Âu khi còn nhỏ. Hiếm có ai trong lịch sử lại có tài năng âm nhạc chín muồi sớm như vậy.' },
      { q: 'Âm nhạc thời Cổ điển khác Baroque ở điểm nào?', a: 'Baroque thiên về nhiều bè cầu kì, phức điệu (đối âm); còn Cổ điển đề cao sự trong sáng, cân đối, với một giai điệu chính nổi bật trên phần đệm hoà thanh rõ ràng (chủ điệu). Nhạc Mozart là ví dụ tiêu biểu cho vẻ trong sáng, cân đối ấy.' },
    ]
  ),

  'S8NT-w08-quiz': L(
    'Âm nhạc — Ludwig van Beethoven, người nối Cổ điển và Lãng mạn',
    'Có một nhà soạn nhạc đã viết nên những kiệt tác ngay khi đôi tai không còn nghe được. Đó là Ludwig van Beethoven — biểu tượng của ý chí và lòng kiên cường. Tuần này mình tìm hiểu cuộc đời và âm nhạc đầy nghị lực của ông.',
    [
      'Biết những nét chính về cuộc đời Beethoven.',
      'Kể được một số tác phẩm tiêu biểu của ông.',
      'Hiểu vai trò cầu nối giữa Cổ điển và Lãng mạn.',
      'Rút ra bài học về nghị lực vượt lên nghịch cảnh.',
    ],
    [
      { h: 'Cuộc đời nhiều thử thách' },
      { p: 'Ludwig van Beethoven (1770 – 1827) sinh ở Bonn (nước Đức), tuổi thơ vất vả. Ông sớm thể hiện tài năng và trở thành nhà soạn nhạc, nghệ sĩ piano nổi tiếng. Nhưng từ khoảng tuổi 26, ông bắt đầu bị suy giảm thính lực, đến cuối đời thì điếc hoàn toàn — một bi kịch khủng khiếp với một nhạc sĩ.' },
      { h: 'Sáng tác trong im lặng' },
      { p: 'Điều phi thường là Beethoven vẫn tiếp tục sáng tác ngay cả khi không còn nghe được. Ông "nghe" nhạc trong đầu mình. Nhiều kiệt tác lớn nhất ra đời chính trong giai đoạn ông điếc — minh chứng cho sức mạnh của ý chí và tâm hồn nghệ sĩ.' },
      { h: 'Cầu nối hai thời kì' },
      { p: 'Beethoven khởi đầu theo phong cách Cổ điển (kế thừa Haydn, Mozart) nhưng dần phá vỡ khuôn khổ, đưa vào âm nhạc cảm xúc mãnh liệt, cá nhân và quy mô đồ sộ. Vì thế ông được coi là cầu nối giữa thời kì Cổ điển và thời kì Lãng mạn.' },
      { h: 'Một số tác phẩm tiêu biểu' },
      { ul: [
        'Giao hưởng số 5 — mở đầu bằng "bốn nốt định mệnh" nổi tiếng bậc nhất lịch sử.',
        'Giao hưởng số 9 — với chương cuối "Ode to Joy" (Bài ca Niềm vui).',
        'Bản sonate "Ánh trăng" (Moonlight Sonata) cho piano.',
        'Tiểu phẩm "Für Elise" (Thư gửi Elise) cho piano.',
      ] },
      { h: 'Bài học từ Beethoven' },
      { p: 'Câu chuyện Beethoven dạy chúng ta rằng nghịch cảnh không thể giết chết khát vọng sáng tạo. Khi đối mặt với điều tưởng như tuyệt vọng nhất, con người vẫn có thể vươn lên và để lại di sản bất tử.' },
      { note: '"Ode to Joy" trong Giao hưởng số 9 sau này được chọn làm nhạc hiệu chính thức của Liên minh châu Âu (EU) — một bản nhạc kêu gọi tình anh em giữa các dân tộc.' },
    ],
    [
      { q: 'Điều phi thường nhất trong cuộc đời sáng tác của Beethoven là gì?', a: 'Là việc ông vẫn sáng tác nên nhiều kiệt tác ngay khi đã bị điếc, thậm chí điếc hoàn toàn ở cuối đời. Ông "nghe" nhạc trong đầu và viết ra, biến một bi kịch khủng khiếp thành minh chứng cho sức mạnh ý chí.' },
      { q: 'Vì sao Beethoven được gọi là cầu nối giữa Cổ điển và Lãng mạn?', a: 'Vì ông khởi đầu theo phong cách Cổ điển (cân đối, rõ ràng) nhưng dần phá vỡ khuôn khổ, đưa vào âm nhạc cảm xúc mãnh liệt, cá nhân và quy mô lớn — những đặc điểm của thời Lãng mạn. Ông đứng ở ranh giới và mở đường cho thế hệ Lãng mạn sau này.' },
      { q: 'Tác phẩm nào của Beethoven hiện được dùng làm nhạc hiệu của Liên minh châu Âu?', a: '"Ode to Joy" (Bài ca Niềm vui) — chương cuối của Giao hưởng số 9. Đây là bản nhạc ca ngợi tình anh em và sự đoàn kết giữa các dân tộc, nên được chọn làm nhạc hiệu chính thức của EU.' },
    ]
  ),

  'S8NT-w09-quiz': L(
    'Mĩ thuật — Luật xa gần (phối cảnh) một điểm tụ',
    'Vì sao đường ray xe lửa nhìn về xa thấy chụm lại, dù thực tế hai thanh ray luôn song song? Bí mật nằm ở luật xa gần — nguyên lí giúp ta vẽ được không gian ba chiều trên mặt giấy phẳng. Tuần này mình học cách dựng phối cảnh một điểm tụ.',
    [
      'Hiểu khái niệm luật xa gần (phối cảnh) và các quy luật cơ bản.',
      'Biết đường tầm mắt (đường chân trời) và điểm tụ.',
      'Tập dựng phối cảnh một điểm tụ cho khối lập phương, con đường.',
      'Hiểu vì sao phối cảnh tạo cảm giác chiều sâu cho tranh.',
    ],
    [
      { h: 'Luật xa gần là gì?' },
      { p: 'Luật xa gần (phối cảnh) là cách thể hiện không gian ba chiều trên mặt phẳng hai chiều. Nhờ luật xa gần, bức tranh có chiều sâu, người xem cảm giác như đang đứng nhìn vào một khung cảnh thật có gần, có xa.' },
      { h: 'Các quy luật cơ bản' },
      { ul: [
        'Gần lớn – xa nhỏ: vật ở gần vẽ to, vật ở xa vẽ nhỏ dần dù thực tế cùng kích cỡ.',
        'Gần rõ – xa mờ: vật gần có nét sắc và màu đậm; vật xa mờ, nhạt, ít chi tiết.',
        'Đường song song chạy về xa thì hội tụ lại một điểm.',
      ] },
      { h: 'Đường tầm mắt và điểm tụ' },
      { p: 'Đường tầm mắt (còn gọi đường chân trời) là đường nằm ngang ngang với tầm mắt người vẽ — nơi trời gặp đất ở xa. Điểm tụ là điểm nằm trên đường tầm mắt, nơi các đường song song trong không gian quy về khi vẽ phối cảnh.' },
      { h: 'Phối cảnh một điểm tụ' },
      { p: 'Đây là dạng đơn giản nhất, dùng khi nhìn thẳng vào một mặt phẳng (như cuối hành lang, đường thẳng tắp):' },
      { ul: [
        'Bước 1: vẽ đường tầm mắt nằm ngang.',
        'Bước 2: chọn một điểm tụ trên đường tầm mắt.',
        'Bước 3: vẽ các đường (mép đường, mép tường, dãy cột) hội tụ từ tiền cảnh về điểm tụ.',
        'Bước 4: vật trên đường vẽ to ở gần, nhỏ dần khi tiến về điểm tụ.',
      ] },
      { h: 'Vị trí đường tầm mắt thay đổi điểm nhìn' },
      { p: 'Đường tầm mắt cao (nhìn từ trên xuống) cho cảm giác như đứng trên cao quan sát. Đường tầm mắt thấp (nhìn từ dưới lên) làm cảnh vật trở nên hùng vĩ, vươn cao. Người vẽ chủ động đặt đường tầm mắt để chọn góc nhìn cho tranh.' },
      { note: 'Luật xa gần được các hoạ sĩ – nhà toán học thời Phục hưng Italia (thế kỉ 15) như Brunelleschi, Alberti hoàn thiện. Đó là cuộc cách mạng lớn của hội hoạ.' },
    ],
    [
      { q: 'Vì sao hai thanh ray song song khi nhìn về xa lại thấy chụm vào nhau?', a: 'Vì theo luật xa gần, các đường song song trong không gian khi chạy về xa sẽ hội tụ lại tại một điểm tụ nằm trên đường tầm mắt. Mắt ta nhìn vật càng xa càng nhỏ, nên hai thanh ray "co" dần lại và gặp nhau ở điểm tụ, dù thực tế chúng luôn cách đều.' },
      { q: 'Đường tầm mắt (đường chân trời) nằm ở đâu trong tranh?', a: 'Nằm ngang, ngang với tầm mắt của người vẽ. Trong tranh phong cảnh, đó là nơi trời gặp đất ở phía xa. Điểm tụ luôn nằm trên đường này.' },
      { q: 'Em muốn vẽ một con đường làng chạy thẳng vào xa với hai hàng cột điện. Áp dụng phối cảnh một điểm tụ thế nào?', a: 'Vẽ đường tầm mắt nằm ngang ở khoảng 2/3 chiều cao tranh, chọn một điểm tụ ở giữa. Vẽ hai mép đường hội tụ từ hai góc dưới về điểm tụ. Cột điện gần nhất vẽ cao và to; các cột tiếp theo nhỏ và thấp dần khi tiến về điểm tụ; cột xa nhất chỉ còn là một vạch mảnh. Kết quả: con đường có chiều sâu rõ rệt.' },
    ]
  ),

  'S8NT-w10-quiz': L(
    'Mĩ thuật — Kí hoạ và kí hoạ chân dung',
    'Có những bức vẽ chỉ mất vài phút mà vẫn bắt được cái "thần" của một con người, một dáng đi. Đó là kí hoạ — vẽ nhanh, vẽ sống. Tuần này mình học kí hoạ, đặc biệt là kí hoạ chân dung, để rèn đôi mắt quan sát nhạy bén.',
    [
      'Hiểu khái niệm và đặc điểm của kí hoạ.',
      'Nắm tỉ lệ cơ bản của khuôn mặt người.',
      'Biết cách phác nhanh mắt, mũi, miệng.',
      'Biết "bắt thần thái" qua nét vẽ.',
    ],
    [
      { h: 'Kí hoạ là gì?' },
      { p: 'Kí hoạ là cách vẽ nhanh, ghi lại hình ảnh sự vật, con người, khung cảnh bằng vài nét cơ bản trong thời gian ngắn. Kí hoạ không cần hoàn chỉnh từng chi tiết, mà cốt nắm bắt dáng, hình, đặc điểm và cái "thần" của đối tượng.' },
      { h: 'Vai trò của kí hoạ' },
      { ul: [
        'Rèn khả năng quan sát nhanh và phản xạ tay – mắt.',
        'Ghi lại tư liệu sống để dùng cho tranh sáng tác sau này.',
        'Tập nắm bắt dáng động, biểu cảm trong khoảnh khắc.',
      ] },
      { h: 'Tỉ lệ khuôn mặt (nhìn thẳng)' },
      { ul: [
        'Khuôn mặt chia chiều cao thành ba phần gần bằng nhau: chân tóc – chân mày, chân mày – chân mũi, chân mũi – cằm.',
        'Mắt nằm ở khoảng giữa chiều cao đầu (từ đỉnh đầu đến cằm).',
        'Khoảng cách giữa hai mắt bằng độ rộng một con mắt.',
        'Tai nằm trong khoảng từ ngang chân mày đến ngang chân mũi.',
      ] },
      { h: 'Phác nhanh ngũ quan' },
      { ul: [
        'Mắt: phác hình hạnh nhân, có con ngươi.',
        'Mũi: gợi bằng khối tam giác và hai cánh mũi.',
        'Miệng: một đường ngang chia môi trên – môi dưới, hai khoé hơi cong.',
      ] },
      { h: 'Bắt thần thái' },
      { p: 'Điều khó và quý nhất của kí hoạ chân dung là bắt được thần thái — cái "hồn" của người mẫu. Thần thái nằm nhiều ở ánh mắt, ở hướng nhìn và tư thế đầu. Một bức kí hoạ đúng tỉ lệ nhưng vô hồn vẫn "chết"; ngược lại, vài nét mà trúng thần thái thì rất sống động.' },
      { note: 'Kí hoạ cần luyện thường xuyên: vẽ bạn ngồi cạnh, người trên xe buýt, ông cụ ngoài công viên… Càng vẽ nhiều, tay – mắt càng nhanh và chuẩn.' },
    ],
    [
      { q: 'Kí hoạ khác với vẽ tranh hoàn chỉnh ở điểm nào?', a: 'Kí hoạ là vẽ nhanh trong thời gian ngắn, chỉ bằng vài nét cơ bản, cốt nắm dáng – hình – thần thái chứ không trau chuốt từng chi tiết. Vẽ tranh hoàn chỉnh thì kĩ lưỡng, có bố cục, đậm nhạt, màu sắc và mất nhiều thời gian hơn.' },
      { q: 'Trên khuôn mặt nhìn thẳng, đôi mắt nằm ở vị trí nào?', a: 'Nằm ở khoảng giữa chiều cao của đầu (tính từ đỉnh đầu đến cằm), chứ không phải ở 1/3 trên như nhiều người tưởng. Khoảng cách giữa hai mắt thường bằng độ rộng một con mắt.' },
      { q: 'Vì sao có bức kí hoạ chân dung đúng tỉ lệ mà vẫn bị chê là "khô", thiếu sức sống?', a: 'Vì người vẽ mới chỉ vẽ đúng tỉ lệ mà chưa bắt được thần thái — cái hồn của người mẫu. Thần thái nằm nhiều ở ánh mắt, hướng nhìn và tư thế đầu. Thiếu thần thái, bức vẽ giống một sơ đồ khuôn mặt chứ không phải một con người sống động.' },
    ]
  ),

  'S8NT-w11-quiz': L(
    'Mĩ thuật — Vẽ tranh đề tài tự do (chủ đề học đường)',
    'Vẽ tranh đề tài là dịp để em kể câu chuyện của riêng mình bằng hình ảnh và màu sắc. Tuần này, với chủ đề học đường thân quen, mình học cách chọn nội dung, dựng bố cục và chọn chất liệu để tạo nên một bức tranh có ý tưởng.',
    [
      'Biết cách chọn và khai thác đề tài học đường.',
      'Hiểu nguyên tắc bố cục có trọng tâm, cân đối.',
      'Biết đặc điểm một số chất liệu vẽ thông dụng.',
      'Thực hành phác bố cục cho một bức tranh đề tài.',
    ],
    [
      { h: 'Khai thác đề tài học đường' },
      { p: 'Trường học có vô vàn khoảnh khắc đáng vẽ. Quan trọng là chọn được một khoảnh khắc gắn với cảm xúc và kỉ niệm của chính em — khi đó tranh mới có "hồn".' },
      { ul: [
        'Giờ ra chơi, sân trường rộn ràng.',
        'Tiết học, góc học nhóm.',
        'Thư viện, phòng thí nghiệm.',
        'Sinh hoạt câu lạc bộ, văn nghệ, thể thao.',
        'Ngày khai giảng, lễ tổng kết, chia tay.',
      ] },
      { h: 'Bố cục có trọng tâm' },
      { p: 'Một bức tranh tốt phải có trọng tâm rõ ràng — nơi mắt người xem dừng lại đầu tiên. Tránh để mọi hình ảnh "ngang ngửa" nhau gây rối mắt.' },
      { ul: [
        'Đặt nhân vật/hình chính ở vị trí trọng tâm (theo nguyên tắc một phần ba hoặc gần giữa).',
        'Hình chính vẽ to, rõ; hình phụ nhỏ hơn, hỗ trợ.',
        'Giữ cân bằng giữa mảng đặc (hình) và mảng trống (nền).',
      ] },
      { h: 'Nguyên tắc một phần ba' },
      { p: 'Chia khung tranh thành 3×3 ô bằng hai đường dọc và hai đường ngang. Đặt trọng tâm vào một trong bốn giao điểm sẽ tạo bố cục hài hoà, sinh động hơn là đặt chính giữa.' },
      { h: 'Chọn chất liệu vẽ' },
      { ul: [
        'Bút chì màu: dễ kiểm soát, hợp người mới.',
        'Sáp dầu: màu đậm, rực, dễ chồng màu.',
        'Màu nước: trong trẻo, nhẹ nhàng, đòi hỏi khéo tay.',
        'Màu bột/màu acrylic: che phủ tốt, sửa được, màu tươi.',
      ] },
      { h: 'Quy trình vẽ tranh đề tài' },
      { p: 'Bước 1: chọn nội dung và tìm ý tưởng. Bước 2: phác bố cục mảng chính – phụ. Bước 3: vẽ hình chi tiết. Bước 4: lên màu, chú ý đậm nhạt và hoà sắc. Bước 5: hoàn thiện, nhấn trọng tâm.' },
      { note: 'Tranh đề tài hay không phải ở chỗ "vẽ giống ảnh chụp" mà ở ý tưởng và cảm xúc. Hãy vẽ điều em thật sự rung động.' },
    ],
    [
      { q: 'Nguyên tắc một phần ba trong bố cục tranh là gì?', a: 'Là chia khung tranh thành 3×3 ô bằng hai đường dọc và hai đường ngang, rồi đặt trọng tâm (hình chính) vào một trong bốn giao điểm. Cách này tạo bố cục hài hoà, sinh động hơn so với đặt hình chính ngay chính giữa khung.' },
      { q: 'Vì sao tranh cần có trọng tâm rõ ràng?', a: 'Vì mắt người xem cần một điểm "neo" để bắt đầu thưởng thức tranh. Nếu mọi hình ảnh đều ngang ngửa nhau, mắt sẽ lúng túng không biết nhìn đâu trước. Có trọng tâm rõ, mắt dừng ở hình chính rồi mới khám phá các hình phụ — tranh trở nên dễ đọc và hấp dẫn.' },
      { q: 'Với người mới tập vẽ, chất liệu nào dễ kiểm soát nhất?', a: 'Bút chì màu và sáp dầu là dễ kiểm soát nhất: màu lên ổn định, ít bị loang, sai có thể chồng màu sửa lại. Màu nước tuy đẹp nhưng khó hơn vì dễ loang và khó sửa, phù hợp khi đã quen tay.' },
    ]
  ),

  'S8NT-w12-quiz': L(
    'Mĩ thuật — Thiết kế đồ hoạ: áp phích (poster)',
    'Một tấm áp phích tốt phải "nói" được thông điệp chỉ trong vài giây, từ khoảng cách xa. Tuần này mình bước vào thế giới thiết kế đồ hoạ với áp phích — nơi hình ảnh, chữ và màu sắc cùng truyền tải một ý tưởng thật mạnh.',
    [
      'Hiểu chức năng và đặc điểm của áp phích.',
      'Nắm nguyên tắc thiết kế áp phích hiệu quả.',
      'Biết cách phân cấp thông tin (chữ, hình, logo).',
      'Thực hành phác thảo một áp phích chủ đề học đường.',
    ],
    [
      { h: 'Áp phích để làm gì?' },
      { p: 'Áp phích (poster) là sản phẩm thiết kế đồ hoạ dùng để truyền tải một thông điệp — quảng cáo, tuyên truyền, cổ động — đến nhiều người. Nó được dán ở nơi công cộng, nên phải gây ấn tượng và đọc được từ xa, trong vài giây.' },
      { h: 'Nguyên tắc thiết kế áp phích' },
      { ul: [
        'Một thông điệp chính rõ ràng — không ôm đồm nhiều ý.',
        'Hình ảnh mạnh, bắt mắt ngay từ xa.',
        'Chữ to, ngắn gọn, dễ đọc.',
        'Màu sắc tương phản cao để nổi bật.',
        'Khoảng trống hợp lí để thiết kế "thở", không rối.',
      ] },
      { h: 'Phân cấp thông tin' },
      { p: 'Trên áp phích, các thành phần không "ngang hàng" mà có thứ bậc, dẫn dắt mắt người xem theo trình tự:' },
      { ul: [
        'Tiêu đề (thông điệp chính): to nhất, đập vào mắt trước.',
        'Hình ảnh chính: thu hút và minh hoạ thông điệp.',
        'Nội dung phụ (thời gian, địa điểm…): cỡ vừa, rõ ràng.',
        'Logo, thông tin liên hệ: nhỏ, đặt ở góc.',
      ] },
      { h: 'Lỗi thường gặp' },
      { p: 'Áp phích "thất bại" thường do: quá nhiều chữ, nhiều ý chen chúc, màu sắc rối, chữ nhỏ khó đọc. Khi đó, người đi qua sẽ không kịp đọc và bỏ qua. Hãy nhớ: ít mà rõ thì mạnh hơn nhiều mà rối.' },
      { h: 'Công cụ thực hành' },
      { p: 'Em có thể vẽ tay áp phích, hoặc dùng phần mềm thiết kế miễn phí, dễ dùng như Canva (có mẫu sẵn, kéo – thả). Dù làm cách nào, nguyên tắc bố cục và phân cấp thông tin vẫn như nhau.' },
      { note: 'Thử nghiệm "đọc từ 5 mét": dán bản thiết kế lên tường, lùi ra 5 mét. Nếu vẫn đọc được thông điệp chính, áp phích của em đã đạt yêu cầu cơ bản.' },
    ],
    [
      { q: 'Một áp phích bị xem là "thất bại" thường mắc lỗi gì?', a: 'Thường mắc lỗi: quá nhiều chữ, ôm đồm nhiều ý cùng lúc, màu sắc rối rắm và chữ quá nhỏ. Người đi qua không kịp đọc và bỏ qua. Áp phích tốt cần một thông điệp chính rõ, chữ to, hình mạnh và màu tương phản.' },
      { q: 'Phân cấp thông tin trên áp phích nghĩa là gì?', a: 'Là sắp xếp các thành phần theo thứ bậc để dẫn dắt mắt người xem: tiêu đề/thông điệp chính to nhất và nổi bật nhất, đến hình ảnh chính, rồi nội dung phụ cỡ vừa, cuối cùng là logo và thông tin liên hệ nhỏ ở góc. Nhờ đó người xem nắm ý chính ngay rồi mới đọc chi tiết.' },
      { q: 'Làm sao kiểm tra nhanh một áp phích có hiệu quả không?', a: 'Dùng cách "đọc từ xa": dán áp phích lên tường rồi lùi ra khoảng 5 mét. Nếu vẫn nhìn rõ hình chính và đọc được thông điệp chính trong vài giây thì áp phích đạt yêu cầu; nếu phải lại gần mới đọc được thì chữ còn nhỏ hoặc bố cục còn rối, cần chỉnh lại.' },
    ]
  ),

  'S8NT-w13-quiz': L(
    'Mĩ thuật — Mĩ thuật Việt Nam thời Lý',
    'Chùa Một Cột vươn lên như một đoá sen giữa hồ — đó là tinh thần mĩ thuật thời Lý: thanh thoát, tinh tế và đậm chất Phật giáo. Tuần này mình ngược dòng lịch sử, tìm về một thời kì mĩ thuật rực rỡ của dân tộc.',
    [
      'Biết bối cảnh và đặc điểm mĩ thuật thời Lý.',
      'Kể được một số công trình, tác phẩm tiêu biểu.',
      'Nhận biết đặc trưng hình tượng rồng thời Lý.',
      'Cảm nhận tinh thần thanh thoát, tinh tế của nghệ thuật thời Lý.',
    ],
    [
      { h: 'Bối cảnh thời Lý' },
      { p: 'Nhà Lý (1010 – 1225) dời đô về Thăng Long, mở ra một thời kì ổn định và phát triển. Đạo Phật được tôn sùng, trở thành quốc giáo, ảnh hưởng sâu sắc đến kiến trúc, điêu khắc và trang trí. Đây là một trong những giai đoạn đỉnh cao của mĩ thuật dân tộc.' },
      { h: 'Đặc điểm mĩ thuật thời Lý' },
      { ul: [
        'Ảnh hưởng Phật giáo đậm nét: chùa, tháp, tượng Phật.',
        'Trang trí tinh xảo, mềm mại; hoa văn sen, lá đề rất phổ biến.',
        'Kiến trúc hài hoà với thiên nhiên, thanh tịnh.',
      ] },
      { h: 'Hình tượng rồng thời Lý' },
      { p: 'Rồng thời Lý có hình dáng đặc trưng: thân dài, tròn lẳn, uốn lượn mềm mại thành nhiều khúc đều đặn như hình sin, không có vảy dữ tợn. Đầu rồng ngẩng cao, có mào lửa, dáng thanh thoát. Đây là biểu tượng tiêu biểu để nhận diện mĩ thuật thời Lý.' },
      { h: 'Công trình, tác phẩm tiêu biểu' },
      { ul: [
        'Chùa Một Cột (Diên Hựu, 1049) — kiến trúc hình đoá sen, biểu tượng của Hà Nội.',
        'Tượng Phật A-di-đà chùa Phật Tích — pho tượng đá đẹp bậc nhất thời Lý.',
        'Tháp Báo Thiên, các hoa văn lá đề, sen ở nhiều di tích.',
      ] },
      { h: 'Tinh thần nghệ thuật thời Lý' },
      { p: 'Mĩ thuật thời Lý toát lên vẻ thanh thoát, tinh tế, hài hoà — phản ánh một xã hội ổn định và tâm hồn hướng thiện của đạo Phật. Cái đẹp ở đây là cái đẹp dịu dàng, sâu lắng, không phô trương.' },
      { note: 'Quan sát kĩ hình rồng là cách nhanh nhất để phân biệt mĩ thuật các thời: rồng Lý mềm mại, thanh mảnh; rồng các thời sau dần khoẻ khoắn, dữ dằn hơn.' },
    ],
    [
      { q: 'Hình tượng rồng thời Lý có đặc điểm gì để nhận biết?', a: 'Rồng thời Lý có thân dài, tròn lẳn, uốn lượn mềm mại thành nhiều khúc đều đặn như hình sin, đầu ngẩng cao, có mào lửa, dáng thanh thoát và không dữ tợn. Đây là một trong những dấu hiệu đặc trưng nhất để nhận diện mĩ thuật thời Lý.' },
      { q: 'Công trình kiến trúc nào tiêu biểu nhất của thời Lý và mang ý nghĩa gì?', a: 'Chùa Một Cột (Diên Hựu, xây năm 1049). Công trình dựng trên một cột trụ giữa hồ, tạo hình như một đoá sen vươn lên mặt nước — biểu tượng của sự thanh khiết trong đạo Phật, đồng thời là biểu tượng văn hoá của Hà Nội.' },
      { q: 'Vì sao mĩ thuật thời Lý chịu ảnh hưởng sâu đậm của Phật giáo?', a: 'Vì dưới thời Lý, đạo Phật được tôn sùng và trở thành quốc giáo, được triều đình và nhân dân sùng kính. Nhiều chùa, tháp, tượng Phật được xây dựng, nên tư tưởng và hình tượng Phật giáo (hoa sen, lá đề, sự thanh tịnh, dịu dàng) thấm sâu vào kiến trúc, điêu khắc và trang trí thời kì này.' },
    ]
  ),

  'S8NT-w14-quiz': L(
    'Mĩ thuật — Mĩ thuật Việt Nam thời Trần',
    'Nếu mĩ thuật thời Lý mềm mại như đoá sen, thì mĩ thuật thời Trần mạnh mẽ như khí phách của một dân tộc ba lần đánh thắng quân Nguyên – Mông. Tuần này mình tìm hiểu nét đẹp khoẻ khoắn, gần gũi của nghệ thuật thời Trần.',
    [
      'Biết bối cảnh và đặc điểm mĩ thuật thời Trần.',
      'Kể được một số công trình, tác phẩm tiêu biểu.',
      'So sánh được nét khác biệt giữa mĩ thuật Lý và Trần.',
      'Cảm nhận tinh thần thượng võ, gần dân của nghệ thuật thời Trần.',
    ],
    [
      { h: 'Bối cảnh thời Trần' },
      { p: 'Nhà Trần (1225 – 1400) tiếp nối nhà Lý, là thời kì hào hùng với ba lần kháng chiến chống quân Nguyên – Mông thắng lợi. Bên cạnh Phật giáo, Nho giáo bắt đầu phát triển. Tinh thần thượng võ và đời sống gần dân in dấu rõ trong nghệ thuật.' },
      { h: 'Đặc điểm mĩ thuật thời Trần' },
      { ul: [
        'Khoẻ khoắn, mạnh mẽ, đơn giản và phóng khoáng hơn thời Lý.',
        'Hình tượng rồng to, khoẻ, mập mạp và có phần dữ dằn hơn rồng Lý.',
        'Chịu ảnh hưởng cả Phật giáo và Nho giáo.',
        'Gần gũi với đời sống nhân dân hơn.',
      ] },
      { h: 'Công trình, tác phẩm tiêu biểu' },
      { ul: [
        'Tháp Phổ Minh (Nam Định) — công trình kiến trúc Phật giáo nổi tiếng.',
        'Khu lăng mộ và tượng các vua Trần.',
        'Gốm hoa nâu thời Trần — chắc khoẻ, hoa văn mộc mạc, gần đời sống.',
      ] },
      { h: 'So sánh mĩ thuật Lý và Trần' },
      { ul: [
        'Thời Lý: tinh tế, mềm mại, thanh thoát, thiên về Phật giáo.',
        'Thời Trần: khoẻ khoắn, mạnh mẽ, giản dị, gần dân, đậm tinh thần thượng võ.',
        'Rồng Lý mảnh và uốn đều; rồng Trần mập, khoẻ, uốn mạnh hơn.',
      ] },
      { h: 'Tinh thần nghệ thuật thời Trần' },
      { p: 'Mĩ thuật thời Trần phản ánh khí phách của một thời đại oai hùng. Cái đẹp ở đây không cầu kì mà mạnh mẽ, chắc chắn, gần với cuộc sống và con người lao động.' },
      { note: 'Mĩ thuật mỗi thời là tấm gương phản chiếu xã hội: thời Lý thái bình – nghệ thuật dịu dàng; thời Trần chống ngoại xâm – nghệ thuật khoẻ khoắn, hào hùng.' },
    ],
    [
      { q: 'Nêu hai điểm khác nhau cơ bản giữa mĩ thuật thời Lý và thời Trần.', a: 'Thứ nhất, về phong cách: thời Lý tinh tế, mềm mại, thanh thoát; thời Trần khoẻ khoắn, mạnh mẽ, giản dị, gần dân. Thứ hai, về hình tượng rồng: rồng Lý thân mảnh, uốn lượn đều đặn, mềm mại; rồng Trần thân mập, khoẻ, uốn mạnh và có phần dữ dằn hơn.' },
      { q: 'Tinh thần thời đại nào đã ảnh hưởng đến vẻ khoẻ khoắn của mĩ thuật thời Trần?', a: 'Tinh thần thượng võ của thời đại ba lần kháng chiến chống quân Nguyên – Mông thắng lợi. Khí phách hào hùng, mạnh mẽ ấy của dân tộc đã in dấu vào nghệ thuật, làm cho mĩ thuật thời Trần mang vẻ chắc khoẻ, phóng khoáng và gần gũi đời sống.' },
      { q: 'Kể tên một công trình kiến trúc và một loại sản phẩm thủ công tiêu biểu của thời Trần.', a: 'Công trình kiến trúc tiêu biểu: tháp Phổ Minh ở Nam Định (kiến trúc Phật giáo nổi tiếng). Sản phẩm thủ công tiêu biểu: gốm hoa nâu thời Trần — dáng chắc khoẻ, hoa văn mộc mạc, gần gũi với đời sống nhân dân.' },
    ]
  ),

  'S8NT-w15-quiz': L(
    'Mĩ thuật — Mĩ thuật Việt Nam thời Lê',
    'Thời Lê là thời của những mái đình làng cong vút, của bia tiến sĩ ở Văn Miếu và của dòng tranh dân gian rực rỡ. Tuần này mình tìm hiểu mĩ thuật thời Lê — nơi nghệ thuật cung đình và nghệ thuật dân gian cùng nở rộ.',
    [
      'Biết bối cảnh và đặc điểm mĩ thuật thời Lê.',
      'Kể được một số công trình, tác phẩm tiêu biểu.',
      'Hiểu về tranh dân gian Đông Hồ và Hàng Trống.',
      'Cảm nhận sự phong phú của mĩ thuật cung đình và dân gian.',
    ],
    [
      { h: 'Bối cảnh thời Lê' },
      { p: 'Nhà Lê (đặc biệt từ 1428, sau khởi nghĩa Lam Sơn thắng lợi) đề cao Nho giáo, coi trọng học hành thi cử. Nho giáo trở thành tư tưởng chủ đạo, ảnh hưởng lớn đến kiến trúc và mĩ thuật. Đồng thời, nghệ thuật dân gian, đặc biệt là đình làng và tranh dân gian, phát triển mạnh.' },
      { h: 'Đặc điểm mĩ thuật thời Lê' },
      { ul: [
        'Ảnh hưởng Nho giáo rõ nét trong kiến trúc và trang trí.',
        'Đình làng phát triển rộng khắp, trở thành trung tâm sinh hoạt cộng đồng.',
        'Tranh dân gian phát triển rực rỡ, gần gũi đời sống nhân dân.',
      ] },
      { h: 'Công trình, tác phẩm tiêu biểu' },
      { ul: [
        'Đình Tây Đằng, đình Chu Quyến (Hà Nội) — kiến trúc đình làng tiêu biểu.',
        'Văn Miếu – Quốc Tử Giám với hệ thống bia tiến sĩ đặt trên lưng rùa đá.',
        'Tranh dân gian Đông Hồ (Bắc Ninh) và Hàng Trống (Hà Nội).',
      ] },
      { h: 'Tranh dân gian Đông Hồ và Hàng Trống' },
      { ul: [
        'Đông Hồ (Bắc Ninh): in từ nhiều ván khắc gỗ trên giấy điệp, màu lấy từ thiên nhiên. Tranh chắc khoẻ, mộc mạc, ví dụ "Đám cưới chuột", "Đàn lợn", "Vinh hoa – Phú quý".',
        'Hàng Trống (Hà Nội): in nét đen rồi tô màu bằng tay, nét mảnh và tinh tế hơn. Chủ đề tranh thờ, tranh tứ bình.',
      ] },
      { h: 'Hai dòng nghệ thuật song hành' },
      { p: 'Mĩ thuật thời Lê đặc sắc ở chỗ vừa có nghệ thuật mang dấu ấn Nho giáo, cung đình (Văn Miếu, bia tiến sĩ), vừa có nghệ thuật dân gian sinh động (đình làng, tranh Tết). Hai dòng này cùng làm nên bức tranh phong phú của mĩ thuật thời kì này.' },
      { note: 'Đến nay, tranh Đông Hồ vẫn được làm theo lối cổ ở làng Đông Hồ (Bắc Ninh) và đang được gìn giữ như một di sản văn hoá quý.' },
    ],
    [
      { q: 'Tranh dân gian Đông Hồ được làm bằng kĩ thuật gì?', a: 'Bằng kĩ thuật in từ ván khắc gỗ (mộc bản): mỗi màu một ván, in lần lượt nhiều ván lên giấy điệp. Màu sắc lấy từ nguyên liệu thiên nhiên. Nhờ in nhiều bản nên một mẫu tranh có thể được nhân ra nhiều bản giống nhau, phục vụ dịp Tết.' },
      { q: 'Tranh Đông Hồ và tranh Hàng Trống khác nhau ở điểm nào?', a: 'Tranh Đông Hồ in hoàn toàn bằng nhiều ván khắc trên giấy điệp, màu từ thiên nhiên, nét chắc khoẻ, mộc mạc. Tranh Hàng Trống chỉ in nét đen bằng ván rồi tô màu bằng tay, nên nét mảnh và tinh tế hơn, chủ đề thiên về tranh thờ và tranh tứ bình.' },
      { q: 'Vì sao đình làng phát triển mạnh dưới thời Lê?', a: 'Vì thời Lê đề cao đời sống cộng đồng làng xã và Nho giáo coi trọng nề nếp, lễ nghi. Đình làng trở thành nơi thờ thành hoàng, hội họp, sinh hoạt văn hoá của cả làng. Nhu cầu đó khiến đình làng được xây dựng rộng khắp với kiến trúc và chạm khắc gỗ phong phú.' },
    ]
  ),

  'S8NT-w16-quiz': L(
    'Mĩ thuật — Mĩ thuật Việt Nam thời Nguyễn',
    'Kinh thành Huế với những cung điện, lăng tẩm vàng son là di sản tiêu biểu của mĩ thuật thời Nguyễn. Tuần này mình tìm hiểu thời kì cuối cùng của chế độ phong kiến — nơi mĩ thuật cung đình đạt đến độ tráng lệ, cầu kì.',
    [
      'Biết bối cảnh và đặc điểm mĩ thuật thời Nguyễn.',
      'Kể được một số công trình kiến trúc tiêu biểu ở Huế.',
      'Biết một số nghề thủ công mĩ nghệ cung đình.',
      'Cảm nhận vẻ tráng lệ, tinh xảo của nghệ thuật cung đình Huế.',
    ],
    [
      { h: 'Bối cảnh thời Nguyễn' },
      { p: 'Nhà Nguyễn (1802 – 1945) là triều đại phong kiến cuối cùng của Việt Nam, đóng đô ở Huế. Đây là thời kì mĩ thuật cung đình phát triển mạnh, để lại một quần thể kiến trúc đồ sộ và nhiều nghề thủ công mĩ nghệ tinh xảo.' },
      { h: 'Kiến trúc cung đình Huế' },
      { ul: [
        'Kinh thành Huế với Hoàng thành, Tử Cấm Thành, các cung điện.',
        'Hệ thống lăng tẩm các vua: lăng Minh Mạng, lăng Tự Đức, lăng Khải Định…',
        'Quần thể di tích Cố đô Huế được UNESCO công nhận là Di sản văn hoá thế giới năm 1993.',
      ] },
      { h: 'Đặc điểm trang trí' },
      { ul: [
        'Cầu kì, tráng lệ, nhiều chi tiết vàng son.',
        'Hoa văn cung đình: rồng, phượng, mây, hoa lá cách điệu.',
        'Kĩ thuật khảm sành sứ, pháp lam, sơn son thếp vàng.',
      ] },
      { h: 'Nghề thủ công mĩ nghệ' },
      { ul: [
        'Pháp lam: men màu tráng và nung trên cốt đồng, dùng trang trí cung đình.',
        'Khảm xà cừ, khảm sành sứ trên các công trình, đồ thờ.',
        'Đúc đồng (Cửu Đỉnh, Cửu Vị Thần Công ở Huế).',
      ] },
      { h: 'Giá trị của mĩ thuật thời Nguyễn' },
      { p: 'Dù là thời kì cuối của chế độ phong kiến, mĩ thuật thời Nguyễn để lại một di sản kiến trúc và mĩ nghệ đồ sộ, tinh xảo. Quần thể Cố đô Huế ngày nay là niềm tự hào và là điểm đến văn hoá quan trọng của đất nước.' },
      { note: 'Pháp lam Huế là kĩ thuật trang trí đặc sắc gần như chỉ thấy ở mĩ thuật cung đình Nguyễn — em hãy ghi nhớ thuật ngữ này.' },
    ],
    [
      { q: 'Quần thể di tích Cố đô Huế được UNESCO công nhận là Di sản văn hoá thế giới vào năm nào?', a: 'Năm 1993. Đây là di sản văn hoá thế giới đầu tiên của Việt Nam được UNESCO ghi danh, gồm kinh thành, các cung điện và hệ thống lăng tẩm các vua Nguyễn.' },
      { q: 'Pháp lam là gì và gắn với mĩ thuật thời nào?', a: 'Pháp lam là kĩ thuật trang trí dùng men màu tráng lên cốt kim loại (thường là đồng) rồi nung, tạo các mảng màu bền đẹp. Đây là kĩ thuật đặc trưng của mĩ thuật cung đình thời Nguyễn, dùng để trang trí cung điện, đồ thờ ở Huế.' },
      { q: 'Đặc điểm chung của trang trí cung đình thời Nguyễn là gì?', a: 'Cầu kì, tráng lệ, nhiều chi tiết vàng son; hoa văn thường là rồng, phượng, mây, hoa lá cách điệu; sử dụng các kĩ thuật tinh xảo như khảm sành sứ, pháp lam, sơn son thếp vàng. Tổng thể toát lên vẻ uy nghi, lộng lẫy của nghệ thuật cung đình.' },
    ]
  ),

  'S8NT-w17-quiz': L(
    'Âm nhạc — Dân ca một số nước trên thế giới',
    'Mỗi dân tộc trên thế giới đều có những bài dân ca của riêng mình — tiếng lòng của nhân dân được truyền qua bao thế hệ. Tuần này mình du hành qua các nền dân ca thế giới để thấy âm nhạc là ngôn ngữ chung của loài người.',
    [
      'Hiểu khái niệm dân ca và đặc điểm chung của dân ca thế giới.',
      'Biết một số dòng dân ca tiêu biểu của các nước.',
      'So sánh dân ca với âm nhạc chuyên nghiệp (có tác giả).',
      'Cảm nhận màu sắc văn hoá riêng qua từng bài dân ca.',
    ],
    [
      { h: 'Dân ca là gì?' },
      { p: 'Dân ca là những bài hát ra đời trong dân gian, gắn với lao động và sinh hoạt, được truyền miệng từ đời này sang đời khác — thường không rõ tác giả. Dân ca phản ánh đời sống, tình cảm và bản sắc văn hoá của mỗi dân tộc.' },
      { h: 'Đặc điểm chung của dân ca' },
      { ul: [
        'Giai điệu thường mộc mạc, dễ nhớ, dễ hát.',
        'Lời ca gắn với cuộc sống, lao động, tình yêu, quê hương.',
        'Truyền miệng nên có nhiều dị bản (cùng một bài hát có nhiều biến thể).',
      ] },
      { h: 'Một số dòng dân ca tiêu biểu' },
      { ul: [
        'Nga: "Kalinka", "Kachiusa" (Katyusha) — giai điệu khi rộn ràng, khi man mác.',
        'Nhật Bản: "Sakura" (Hoa anh đào) — gắn với đàn koto, mang màu sắc Á Đông.',
        'Hàn Quốc: "Arirang" — bài dân ca được coi là biểu tượng của dân tộc Hàn.',
        'Italia: các bài hát kiểu "Santa Lucia", giai điệu trữ tình, du dương.',
        'Hoa Kì: dòng nhạc đồng quê (country), blues, gospel có gốc dân gian.',
      ] },
      { h: 'Dân ca và âm nhạc chuyên nghiệp' },
      { p: 'Khác với dân ca (ra đời trong dân gian, truyền miệng, không rõ tác giả), âm nhạc chuyên nghiệp do nhạc sĩ sáng tác, có tác giả và bản nhạc ghi cụ thể. Tuy nhiên, rất nhiều nhạc sĩ đã lấy chất liệu từ dân ca để sáng tác nên tác phẩm mới.' },
      { h: 'Vì sao dân ca thế giới đáng trân trọng?' },
      { p: 'Dân ca là kho báu văn hoá của nhân loại. Nghe dân ca các nước, ta hiểu thêm tâm hồn, đời sống của những dân tộc khác, từ đó biết yêu quý sự đa dạng văn hoá và trân trọng dân ca của chính dân tộc mình.' },
      { note: 'Khi nghe một bài dân ca nước ngoài, em hãy thử đoán: bài này gắn với lao động hay tình yêu? Vui hay buồn? Đó là cách "đọc" văn hoá qua âm nhạc.' },
    ],
    [
      { q: 'Vì sao một bài dân ca thường có nhiều dị bản khác nhau?', a: 'Vì dân ca được truyền miệng, không có bản ghi chính thức. Mỗi người hát lại có thể thêm bớt, thay đổi đôi chút theo vùng miền và cảm hứng. Qua nhiều thế hệ, một bài có thể sinh ra nhiều dị bản. Đó vừa là đặc điểm, vừa là vẻ đẹp sống động của dân ca.' },
      { q: '"Arirang" và "Sakura" là dân ca của những nước nào?', a: '"Arirang" là dân ca của Hàn Quốc, được coi như biểu tượng âm nhạc của dân tộc Hàn. "Sakura" (Hoa anh đào) là dân ca của Nhật Bản, thường gắn với đàn koto và mang màu sắc Á Đông đặc trưng.' },
      { q: 'Dân ca khác với âm nhạc chuyên nghiệp (có tác giả) ở điểm cốt lõi nào?', a: 'Dân ca ra đời trong dân gian, được truyền miệng và thường không rõ tác giả; còn âm nhạc chuyên nghiệp do nhạc sĩ cụ thể sáng tác, có tác giả và bản nhạc ghi rõ ràng. Dù vậy, nhiều nhạc sĩ vẫn lấy chất liệu dân ca để viết nên tác phẩm mới.' },
    ]
  ),

  'S8NT-w18-quiz': L(
    'Ôn tập học kì I',
    'Cả học kì I đã đi qua với bao điều thú vị: từ nhạc lí, các nhà soạn nhạc lớn của thế giới, đến lịch sử mĩ thuật dân tộc qua các thời. Tuần này mình hệ thống lại tất cả để chuẩn bị cho bài kiểm tra cuối kì.',
    [
      'Hệ thống lại kiến thức nhạc lí và kĩ thuật biểu diễn đã học.',
      'Nhớ các nhà soạn nhạc lớn và thời kì âm nhạc của họ.',
      'Hệ thống lại lịch sử mĩ thuật Việt Nam qua các thời.',
      'Tự đánh giá mức độ nắm kiến thức của bản thân.',
    ],
    [
      { h: 'Bản đồ kiến thức học kì I' },
      { p: 'Học kì I gồm hai mảng lớn: Âm nhạc (nhạc lí, kĩ thuật biểu diễn, các nhà soạn nhạc thế giới) và Mĩ thuật (luật xa gần, kí hoạ, thiết kế, lịch sử mĩ thuật Việt Nam qua các thời).' },
      { h: 'Phần Âm nhạc' },
      { ul: [
        'Nhạc lí: ôn nốt – nhịp – dấu hoá, đảo phách, gam thứ và hợp âm 7.',
        'Kĩ thuật: hát nâng cao (hơi thở, khẩu hình, hoà giọng), nhạc cụ (staccato – legato, bè đôi).',
        'Các nhà soạn nhạc: Bach (Baroque), Mozart (Cổ điển), Beethoven (cầu nối Cổ điển – Lãng mạn).',
      ] },
      { h: 'Phần Mĩ thuật' },
      { ul: [
        'Kĩ năng tạo hình: luật xa gần một điểm tụ, kí hoạ chân dung, vẽ tranh đề tài, thiết kế áp phích.',
        'Lịch sử mĩ thuật Việt Nam: thời Lý, Trần, Lê, Nguyễn.',
      ] },
      { h: 'Trục thời gian mĩ thuật Việt Nam' },
      { ul: [
        'Lý (1010 – 1225): tinh tế, mềm mại, Phật giáo; rồng thân mảnh.',
        'Trần (1225 – 1400): khoẻ khoắn, gần dân, thượng võ; rồng to khoẻ.',
        'Lê (từ 1428): Nho giáo, đình làng, tranh dân gian.',
        'Nguyễn (1802 – 1945): cung đình Huế tráng lệ, pháp lam.',
      ] },
      { h: 'Mẹo ôn tập hiệu quả' },
      { p: 'Hãy vẽ một sơ đồ tư duy: ở giữa là "Nghệ thuật 8 – Học kì I", toả ra hai nhánh Âm nhạc và Mĩ thuật, mỗi nhánh lại chia nhỏ. Khi nhìn được toàn cảnh, em sẽ nhớ lâu hơn là học rời rạc từng bài.' },
      { note: 'Đừng học thuộc lòng máy móc. Hãy tự hỏi "vì sao" cho mỗi kiến thức — hiểu bản chất thì nhớ lâu và làm bài tốt hơn.' },
    ],
    [
      { q: 'Hãy sắp xếp bốn thời kì mĩ thuật Việt Nam đã học theo trình tự thời gian.', a: 'Theo thứ tự: thời Lý (1010 – 1225) → thời Trần (1225 – 1400) → thời Lê (từ 1428) → thời Nguyễn (1802 – 1945). Đây cũng chính là trình tự các triều đại phong kiến lớn của Việt Nam.' },
      { q: 'Nêu tên ba nhà soạn nhạc lớn của thế giới đã học và thời kì âm nhạc của mỗi người.', a: 'J.S. Bach — thời kì Baroque; W.A. Mozart — thời kì Cổ điển; L. van Beethoven — cầu nối giữa thời kì Cổ điển và thời kì Lãng mạn. Cả ba đều là những tên tuổi vĩ đại của âm nhạc cổ điển phương Tây.' },
      { q: 'Ba nội dung nhạc lí trọng tâm của học kì I là gì?', a: 'Đảo phách (nhấn lệch vào phách yếu để tạo groove), gam thứ (màu âm trầm – buồn so với gam trưởng) và hợp âm 7 (hợp âm ba thêm nốt bảy, tạo màu sắc phong phú). Đây là ba kiến thức nhạc lí mới và quan trọng nhất của học kì.' },
    ]
  ),

  'S8NT-w19-quiz': L(
    'Âm nhạc — Nhạc thính phòng (chamber music)',
    'Có một loại âm nhạc tinh tế đến mức như cuộc trò chuyện giữa vài người bạn thân — đó là nhạc thính phòng. Tuần này mình tìm hiểu thể loại âm nhạc dành cho nhóm nhỏ, nơi mỗi nhạc cụ đều có tiếng nói riêng.',
    [
      'Hiểu khái niệm nhạc thính phòng.',
      'Biết một số hình thức nhóm nhạc thính phòng phổ biến.',
      'Phân biệt nhạc thính phòng với dàn nhạc giao hưởng.',
      'Cảm nhận tính chất tinh tế, "đối thoại" của nhạc thính phòng.',
    ],
    [
      { h: 'Nhạc thính phòng là gì?' },
      { p: 'Nhạc thính phòng là âm nhạc viết cho một nhóm nhỏ nhạc công (thường từ 2 đến khoảng 9 người), mỗi bè chỉ do một người đảm nhiệm. Tên gọi xuất phát từ việc loại nhạc này vốn được biểu diễn trong những căn phòng (thính phòng), không gian nhỏ và gần gũi.' },
      { h: 'Một số hình thức nhóm phổ biến' },
      { ul: [
        'Song tấu (duo): 2 nhạc cụ, ví dụ violin và piano.',
        'Tam tấu (trio): 3 nhạc cụ, ví dụ piano – violin – cello.',
        'Tứ tấu (quartet): 4 nhạc cụ; nổi tiếng nhất là tứ tấu đàn dây (2 violin – viola – cello).',
        'Ngũ tấu (quintet): 5 nhạc cụ.',
      ] },
      { h: 'Tính chất "đối thoại"' },
      { p: 'Vì mỗi bè chỉ một người chơi nên trong nhạc thính phòng, các nhạc cụ như đang "trò chuyện" với nhau: bè này nêu một câu nhạc, bè kia đáp lại; lúc cùng hoà, lúc nhường nhau. Đây là loại nhạc tinh tế, đòi hỏi người chơi phải lắng nghe nhau rất kĩ.' },
      { h: 'Khác với dàn nhạc giao hưởng' },
      { ul: [
        'Nhạc thính phòng: nhóm nhỏ (2 – 9 người), mỗi bè một người, không gian nhỏ.',
        'Dàn nhạc giao hưởng: rất đông (có thể 50 – 100 người), mỗi bè nhiều người cùng chơi, biểu diễn ở hội trường lớn.',
        'Giao hưởng thường có nhạc trưởng chỉ huy; nhóm thính phòng thường tự phối hợp với nhau.',
      ] },
      { h: 'Vẻ đẹp của sự tinh tế' },
      { p: 'Nhạc thính phòng không hoành tráng như giao hưởng, nhưng lại có vẻ đẹp riêng: thân mật, tinh tế, sâu lắng. Nhiều nhà soạn nhạc lớn (Mozart, Beethoven, Schubert…) đã viết những kiệt tác thính phòng.' },
      { note: 'Khi nghe một bản tứ tấu đàn dây, em hãy thử lắng nghe từng nhạc cụ riêng — sẽ thấy chúng "nói chuyện" với nhau thú vị thế nào.' },
    ],
    [
      { q: 'Một tứ tấu đàn dây (string quartet) gồm những nhạc cụ nào?', a: 'Gồm bốn nhạc cụ đàn dây: 2 đàn violin, 1 đàn viola và 1 đàn cello. Đây là hình thức nhạc thính phòng kinh điển và nổi tiếng nhất, được rất nhiều nhà soạn nhạc lớn ưa chuộng.' },
      { q: 'Nhạc thính phòng khác dàn nhạc giao hưởng ở điểm nào?', a: 'Khác chủ yếu ở quy mô: nhạc thính phòng dành cho nhóm nhỏ (khoảng 2 – 9 người), mỗi bè chỉ một người chơi, biểu diễn ở không gian nhỏ; còn dàn nhạc giao hưởng rất đông (có thể 50 – 100 người), mỗi bè nhiều người cùng chơi, biểu diễn ở hội trường lớn và thường có nhạc trưởng chỉ huy.' },
      { q: 'Vì sao nói nhạc thính phòng giống một cuộc "đối thoại"?', a: 'Vì mỗi bè chỉ do một người đảm nhiệm, nên các nhạc cụ luân phiên "phát biểu": nhạc cụ này nêu một câu nhạc, nhạc cụ kia đáp lại, lúc hoà cùng nhau, lúc nhường nhau. Sự qua lại tinh tế đó nghe như những người bạn đang trò chuyện, đòi hỏi các nhạc công lắng nghe nhau rất kĩ.' },
    ]
  ),

  'S8NT-w20-quiz': L(
    'Âm nhạc — Nhạc kịch (opera)',
    'Hãy tưởng tượng một vở kịch mà từ đầu đến cuối, các nhân vật không nói mà hát — hát cả khi yêu thương, giận dữ, đau khổ. Đó là opera (nhạc kịch). Tuần này mình bước vào loại hình sân khấu tổng hợp tráng lệ này.',
    [
      'Hiểu khái niệm opera (nhạc kịch).',
      'Biết các loại giọng hát trong opera.',
      'Kể được một số vở opera và tác giả tiêu biểu.',
      'Cảm nhận sự kết hợp giữa âm nhạc và sân khấu.',
    ],
    [
      { h: 'Opera là gì?' },
      { p: 'Opera (nhạc kịch) là một loại hình sân khấu tổng hợp, trong đó toàn bộ (hoặc gần như toàn bộ) lời thoại được hát thay vì nói, kết hợp với dàn nhạc, diễn xuất, sân khấu, phục trang và đôi khi cả múa. Opera ra đời ở Italia vào khoảng cuối thế kỉ 16 – đầu thế kỉ 17.' },
      { h: 'Các thành phần của một vở opera' },
      { ul: [
        'Ca sĩ – diễn viên: vừa hát vừa diễn các vai.',
        'Dàn nhạc: đệm và dẫn dắt cảm xúc, do nhạc trưởng chỉ huy.',
        'Aria: đoạn hát solo bộc lộ cảm xúc nhân vật, thường rất hay.',
        'Sân khấu, phục trang, ánh sáng: tạo nên thế giới của vở diễn.',
      ] },
      { h: 'Các loại giọng hát' },
      { ul: [
        'Giọng nữ: soprano (cao), mezzo-soprano (trung), alto/contralto (trầm).',
        'Giọng nam: tenor (cao), baritone (trung), bass (trầm).',
        'Vai chính nữ thường là soprano, vai chính nam thường là tenor.',
      ] },
      { h: 'Một số vở opera và tác giả tiêu biểu' },
      { ul: [
        'Mozart — "Cây sáo thần", "Đám cưới Figaro".',
        'Verdi — "La Traviata", "Aida".',
        'Bizet — "Carmen".',
        'Puccini — "Madama Butterfly", "La Bohème".',
      ] },
      { h: 'Vì sao opera đặc biệt?' },
      { p: 'Opera là sự kết hợp đỉnh cao của nhiều nghệ thuật: âm nhạc, thanh nhạc, kịch, mĩ thuật sân khấu. Một ca sĩ opera phải hát rất khoẻ (thường không dùng micro) để giọng vang khắp khán phòng lớn, đồng thời phải diễn xuất nhập vai. Đó là loại hình đòi hỏi tài năng tổng hợp.' },
      { note: 'Em có thể bắt đầu làm quen với opera qua những aria nổi tiếng (ví dụ aria trong "Carmen") trước, rồi mới nghe trọn vở.' },
    ],
    [
      { q: 'Điểm khác biệt cơ bản nhất của opera so với kịch nói là gì?', a: 'Trong opera, các nhân vật hát hầu hết lời thoại thay vì nói, cùng với phần đệm của dàn nhạc; còn kịch nói thì diễn viên nói lời thoại. Opera là loại hình sân khấu tổng hợp giữa âm nhạc và kịch.' },
      { q: 'Giọng nữ cao nhất và giọng nam cao nhất trong opera gọi là gì?', a: 'Giọng nữ cao nhất là soprano; giọng nam cao nhất là tenor. Trong nhiều vở opera, vai nữ chính thường dành cho giọng soprano và vai nam chính thường dành cho giọng tenor.' },
      { q: 'Vì sao ca sĩ opera phải có kĩ thuật thanh nhạc rất cao?', a: 'Vì họ thường phải hát mà không dùng micro, nhưng vẫn phải để giọng vang khắp khán phòng lớn, vượt qua cả âm thanh của dàn nhạc. Đồng thời họ còn phải diễn xuất nhập vai và giữ hơi cho những đoạn hát dài, khó. Tất cả đòi hỏi kĩ thuật thanh nhạc và sức bền rất cao.' },
    ]
  ),

  'S8NT-w21-quiz': L(
    'Mĩ thuật — Tranh sơn dầu',
    'Sơn dầu là chất liệu đã tạo nên những kiệt tác hội hoạ bất hủ của thế giới. Tuần này mình tìm hiểu đặc điểm, kĩ thuật cơ bản của tranh sơn dầu và làm quen với những hoạ sĩ đã đưa chất liệu này lên đỉnh cao.',
    [
      'Hiểu đặc điểm của chất liệu sơn dầu.',
      'Biết một số kĩ thuật vẽ sơn dầu cơ bản.',
      'Biết cách bảo quản tranh sơn dầu.',
      'Kể tên một số hoạ sĩ sơn dầu nổi tiếng.',
    ],
    [
      { h: 'Sơn dầu là gì?' },
      { p: 'Sơn dầu là chất liệu hội hoạ gồm bột màu trộn với dầu (thường là dầu lanh), vẽ trên vải bố (toan) hoặc gỗ. Sơn dầu khô chậm — từ vài ngày đến vài tuần — nên hoạ sĩ có nhiều thời gian để sửa, chồng lớp và pha trộn màu ngay trên tranh.' },
      { h: 'Ưu điểm của sơn dầu' },
      { ul: [
        'Màu sắc tươi, sâu, có chiều sâu và độ bóng.',
        'Khô chậm nên dễ sửa, chỉnh, hoà màu mịn.',
        'Có thể chồng nhiều lớp tạo độ dày, độ trong khác nhau.',
        'Tranh bền, để được hàng trăm năm.',
      ] },
      { h: 'Một số kĩ thuật cơ bản' },
      { ul: [
        'Vẽ lớp lót (vẽ phác bằng màu loãng để định hình bố cục, đậm nhạt).',
        'Vẽ chồng lớp đậm dần để xây dựng hình khối.',
        'Vẽ lớp màu mỏng trong suốt phủ lên (glazing) để tạo chiều sâu.',
        'Vẽ dày, để lại vệt bút và texture nổi (impasto).',
      ] },
      { h: 'Bảo quản tranh sơn dầu' },
      { ul: [
        'Để tranh khô hoàn toàn (có thể mất nhiều tháng) trước khi đóng khung kín.',
        'Tránh ánh nắng mặt trời chiếu trực tiếp lâu dài.',
        'Tránh nơi ẩm thấp dễ gây mốc, và tránh va chạm làm rạn mặt sơn.',
      ] },
      { h: 'Hoạ sĩ sơn dầu tiêu biểu' },
      { p: 'Trên thế giới có nhiều bậc thầy sơn dầu: Leonardo da Vinci, Rembrandt, Vincent van Gogh, Claude Monet, Pablo Picasso… Ở Việt Nam, nhiều hoạ sĩ Trường Mĩ thuật Đông Dương cũng vẽ sơn dầu rất thành công.' },
      { note: 'So với màu nước hay acrylic (khô nhanh), sơn dầu đòi hỏi kiên nhẫn vì khô chậm — nhưng chính sự khô chậm ấy lại là một lợi thế lớn để hoà màu mịn màng.' },
    ],
    [
      { q: 'Sơn dầu khô nhanh hay chậm, và điều đó có lợi gì cho hoạ sĩ?', a: 'Sơn dầu khô chậm, từ vài ngày đến vài tuần. Sự khô chậm này là một lợi thế: hoạ sĩ có nhiều thời gian để sửa chữa, chỉnh hình, hoà trộn màu mịn màng ngay trên tranh và chồng lớp tạo chiều sâu — điều khó làm với các chất liệu khô nhanh như màu nước hay acrylic.' },
      { q: 'Kĩ thuật glazing trong vẽ sơn dầu là gì?', a: 'Glazing là kĩ thuật phủ một lớp màu rất mỏng, trong suốt lên trên lớp màu đã khô bên dưới. Lớp trong này cho ánh sáng xuyên qua rồi phản chiếu lại, tạo hiệu quả màu sâu, óng và có chiều sâu — như nhìn qua nhiều lớp kính màu.' },
      { q: 'Kể tên hai hoạ sĩ sơn dầu nổi tiếng thế giới.', a: 'Có thể kể: Vincent van Gogh (với "Đêm đầy sao", "Hoa hướng dương") và Leonardo da Vinci (với "Mona Lisa"). Ngoài ra còn nhiều bậc thầy khác như Rembrandt, Claude Monet, Pablo Picasso.' },
    ]
  ),

  'S8NT-w22-quiz': L(
    'Mĩ thuật — Tranh lụa Việt Nam',
    'Trên nền lụa tơ tằm mỏng manh, các hoạ sĩ Việt Nam đã tạo nên những bức tranh trong trẻo, dịu dàng đến nao lòng. Tuần này mình tìm hiểu tranh lụa — một niềm tự hào của mĩ thuật hiện đại Việt Nam.',
    [
      'Hiểu đặc điểm của chất liệu tranh lụa.',
      'Biết kĩ thuật vẽ tranh lụa cơ bản.',
      'Kể tên hoạ sĩ và tác phẩm tranh lụa tiêu biểu.',
      'Cảm nhận vẻ đẹp trong trẻo, Á Đông của tranh lụa.',
    ],
    [
      { h: 'Tranh lụa là gì?' },
      { p: 'Tranh lụa là tranh vẽ trên nền lụa tơ tằm, dùng màu nước hoặc mực. Màu thấm vào sợi lụa tạo nên hiệu quả trong trẻo, mềm mại, nhẹ nhàng rất đặc trưng. Tranh lụa là một trong những thể loại làm nên bản sắc mĩ thuật hiện đại Việt Nam.' },
      { h: 'Đặc điểm của tranh lụa' },
      { ul: [
        'Màu sắc trong, nhẹ, êm dịu, không gắt.',
        'Đường nét mềm mại, mơ màng.',
        'Phong cách thanh tao, đậm chất Á Đông.',
        'Đề tài thường là thiếu nữ, phong cảnh, sinh hoạt đời thường.',
      ] },
      { h: 'Kĩ thuật vẽ tranh lụa' },
      { ul: [
        'Căng lụa lên khung cho phẳng trước khi vẽ.',
        'Vẽ màu thành nhiều lớp mỏng, để màu thấm dần vào lụa.',
        'Thường rửa nhẹ giữa các lớp để màu mịn, êm và "ngấm" vào thớ lụa.',
        'Đòi hỏi sự nhẹ tay, kiên nhẫn vì lụa mỏng manh, khó sửa.',
      ] },
      { h: 'Hoạ sĩ và tác phẩm tiêu biểu' },
      { ul: [
        'Nguyễn Phan Chánh — người đặt nền móng cho tranh lụa hiện đại Việt Nam.',
        'Tác phẩm "Chơi ô ăn quan" của Nguyễn Phan Chánh — bức tranh lụa nổi tiếng bậc nhất.',
        'Nhiều hoạ sĩ Trường Mĩ thuật Đông Dương khác cũng vẽ lụa thành công.',
      ] },
      { h: 'Vẻ đẹp riêng của tranh lụa' },
      { p: 'Tranh lụa không rực rỡ, mạnh mẽ như sơn dầu, mà có vẻ đẹp dịu dàng, trầm lắng, gợi cảm giác thanh bình và hoài niệm. Đó là vẻ đẹp rất Việt Nam, rất Á Đông.' },
      { note: 'Tranh lụa rất khó sửa: một nét sai có thể làm hỏng cả vùng lụa. Vì vậy hoạ sĩ vẽ lụa phải tính toán kĩ và đi màu thật khéo.' },
    ],
    [
      { q: 'Bức tranh lụa "Chơi ô ăn quan" là của hoạ sĩ nào?', a: 'Của hoạ sĩ Nguyễn Phan Chánh — người đặt nền móng cho tranh lụa hiện đại Việt Nam. "Chơi ô ăn quan" là một trong những bức tranh lụa nổi tiếng nhất, khắc hoạ hình ảnh các thiếu nữ chơi trò dân gian với vẻ đẹp dịu dàng, trong trẻo.' },
      { q: 'Tranh lụa được vẽ bằng chất liệu màu gì?', a: 'Bằng màu nước hoặc mực, vẽ trên nền lụa tơ tằm — không phải sơn dầu. Màu được vẽ thành nhiều lớp mỏng để thấm vào thớ lụa, tạo hiệu quả trong trẻo, êm dịu đặc trưng.' },
      { q: 'Vì sao vẽ tranh lụa đòi hỏi sự khéo léo và kiên nhẫn?', a: 'Vì lụa mỏng manh và màu thấm trực tiếp vào thớ lụa nên rất khó sửa — một nét sai có thể làm hỏng cả vùng tranh. Hoạ sĩ phải vẽ màu thành nhiều lớp mỏng, rửa nhẹ giữa các lớp, đi màu thật khéo và tính toán kĩ trước khi đặt bút.' },
    ]
  ),

  'S8NT-w23-quiz': L(
    'Mĩ thuật — Mĩ thuật Việt Nam thời kì Pháp thuộc và Trường Mĩ thuật Đông Dương',
    'Đầu thế kỉ 20, khi phương Tây mang đến những kĩ thuật hội hoạ mới, các hoạ sĩ Việt Nam đã khéo léo kết hợp "kĩ thuật Tây" với "tâm hồn Việt". Tuần này mình tìm hiểu giai đoạn đặt nền móng cho mĩ thuật hiện đại Việt Nam.',
    [
      'Biết bối cảnh mĩ thuật Việt Nam thời kì Pháp thuộc.',
      'Hiểu vai trò của Trường Mĩ thuật Đông Dương.',
      'Kể tên một số hoạ sĩ và tác phẩm tiêu biểu.',
      'Hiểu sự kết hợp Đông – Tây trong mĩ thuật giai đoạn này.',
    ],
    [
      { h: 'Bối cảnh thời kì Pháp thuộc' },
      { p: 'Cuối thế kỉ 19 – đầu thế kỉ 20, khi Việt Nam dưới ách Pháp thuộc, văn hoá phương Tây du nhập mạnh. Trong mĩ thuật, các phương pháp hội hoạ hàn lâm châu Âu (luật xa gần, giải phẫu, vẽ sơn dầu…) được giới thiệu, mở ra một giai đoạn mới cho mĩ thuật Việt Nam.' },
      { h: 'Trường Mĩ thuật Đông Dương' },
      { p: 'Trường Cao đẳng Mĩ thuật Đông Dương được thành lập năm 1925 tại Hà Nội. Đây là cái nôi đào tạo lứa hoạ sĩ Việt Nam đầu tiên theo phương pháp châu Âu, đồng thời khuyến khích họ khai thác chất liệu và đề tài dân tộc. Trường được xem là nơi đặt nền móng cho mĩ thuật hiện đại Việt Nam.' },
      { h: 'Hoạ sĩ và tác phẩm tiêu biểu' },
      { ul: [
        'Tô Ngọc Vân — "Thiếu nữ bên hoa huệ", "Em Thuý".',
        'Nguyễn Phan Chánh — tranh lụa "Chơi ô ăn quan".',
        'Trần Văn Cẩn — "Em bé cho chim ăn".',
        'Nguyễn Gia Trí — bậc thầy tranh sơn mài.',
        'Lê Phổ, Vũ Cao Đàm — sang Pháp và nổi tiếng ở nước ngoài.',
      ] },
      { h: 'Sự kết hợp Đông – Tây' },
      { ul: [
        'Học kĩ thuật phương Tây (sơn dầu, luật xa gần, giải phẫu).',
        'Nhưng giữ tâm hồn, đề tài Việt (thiếu nữ, làng quê, sinh hoạt).',
        'Phát triển các chất liệu dân tộc lên tầm hiện đại: tranh lụa, tranh sơn mài.',
      ] },
      { h: 'Ý nghĩa của giai đoạn này' },
      { p: 'Đây là bước ngoặt đưa mĩ thuật Việt Nam hội nhập với thế giới mà vẫn giữ bản sắc dân tộc. Nhiều tác phẩm thời kì này đã trở thành kiệt tác, đặt nền tảng cho các thế hệ hoạ sĩ sau.' },
      { note: 'Bức "Em Thuý" (Trần Văn Cẩn, 1943) là một trong những chân dung đẹp và nổi tiếng nhất của hội hoạ Việt Nam hiện đại.' },
    ],
    [
      { q: 'Trường Mĩ thuật Đông Dương được thành lập năm nào và ở đâu?', a: 'Thành lập năm 1925 tại Hà Nội. Đây là cơ sở đào tạo lứa hoạ sĩ Việt Nam đầu tiên theo phương pháp hội hoạ châu Âu, đồng thời được xem là cái nôi của mĩ thuật hiện đại Việt Nam.' },
      { q: 'Bức tranh "Thiếu nữ bên hoa huệ" là của hoạ sĩ nào?', a: 'Của hoạ sĩ Tô Ngọc Vân — một trong những tên tuổi tiêu biểu của Trường Mĩ thuật Đông Dương. Ông cũng nổi tiếng với bức "Em Thuý". Tranh của ông thể hiện rõ sự kết hợp giữa kĩ thuật phương Tây và vẻ đẹp dịu dàng của thiếu nữ Việt.' },
      { q: 'Vì sao mĩ thuật thời kì Pháp thuộc được coi là sự kết hợp Đông – Tây?', a: 'Vì các hoạ sĩ Việt Nam được học và sử dụng kĩ thuật hội hoạ phương Tây (vẽ sơn dầu, luật xa gần, giải phẫu) nhưng vẫn giữ tâm hồn và đề tài Việt Nam (thiếu nữ, làng quê, sinh hoạt), đồng thời nâng các chất liệu dân tộc như tranh lụa, sơn mài lên tầm hiện đại. Sự hoà quyện ấy tạo nên bản sắc riêng cho mĩ thuật hiện đại Việt Nam.' },
    ]
  ),

  'S8NT-w24-quiz': L(
    'Âm nhạc — Âm nhạc thời kì Lãng mạn (Chopin, Schubert, Schumann)',
    'Nếu thời Cổ điển đề cao sự cân đối, thì thời Lãng mạn lại say mê cảm xúc và cái tôi cá nhân. Tuần này mình gặp gỡ ba nhà soạn nhạc Lãng mạn — những tâm hồn nhạy cảm đã viết nên âm nhạc đầy thi vị.',
    [
      'Hiểu đặc điểm của âm nhạc thời kì Lãng mạn.',
      'Biết ba nhà soạn nhạc Lãng mạn tiêu biểu và tác phẩm của họ.',
      'Hiểu khái niệm ca khúc nghệ thuật (lied).',
      'Cảm nhận tính cá nhân, giàu cảm xúc của nhạc Lãng mạn.',
    ],
    [
      { h: 'Thời kì Lãng mạn' },
      { p: 'Thời kì Lãng mạn (khoảng 1820 – 1900) là thời âm nhạc đề cao cảm xúc mãnh liệt, trí tưởng tượng và cái tôi cá nhân. So với Cổ điển, nhạc Lãng mạn tự do hơn về hình thức, hoà thanh phong phú hơn, khai thác sâu nội tâm con người và thiên nhiên.' },
      { h: 'Đặc điểm âm nhạc Lãng mạn' },
      { ul: [
        'Cảm xúc mãnh liệt, cá nhân, đôi khi bi kịch.',
        'Hình thức tự do, linh hoạt hơn thời Cổ điển.',
        'Hoà thanh giàu màu sắc, nhiều biến hoá.',
        'Gắn âm nhạc với thơ ca, hội hoạ, văn học.',
      ] },
      { h: 'Frédéric Chopin' },
      { p: 'Chopin (1810 – 1849, người Ba Lan) được mệnh danh "thi sĩ của cây đàn piano". Gần như toàn bộ sáng tác của ông dành cho piano, với những thể loại như nocturne (dạ khúc), mazurka, ballade — tinh tế, đầy chất thơ và nỗi nhớ quê hương.' },
      { h: 'Franz Schubert' },
      { p: 'Schubert (1797 – 1828, người Áo) là bậc thầy của ca khúc nghệ thuật (lied). Ông sáng tác hàng trăm bài lied, trong đó có "Ave Maria", "Serenade" (Dạ khúc) nổi tiếng. Ông mất rất sớm, khi mới 31 tuổi.' },
      { h: 'Robert Schumann và ca khúc nghệ thuật' },
      { p: 'Schumann (1810 – 1856, người Đức) viết nhiều tác phẩm cho piano và ca khúc nghệ thuật. Ca khúc nghệ thuật (lied) là bài hát phổ thơ, kết hợp tinh tế giữa giọng hát và phần đệm piano — phần đệm không chỉ "đỡ" giọng mà còn góp phần kể chuyện, tả cảnh, tả tình.' },
      { note: 'Cuộc đời nhiều bi kịch (Chopin, Schubert mất sớm; Schumann đau ốm cuối đời) đã phần nào in dấu vào nỗi buồn man mác trong âm nhạc của các ông.' },
    ],
    [
      { q: 'Vì sao Chopin được gọi là "thi sĩ của cây đàn piano"?', a: 'Vì gần như toàn bộ sáng tác của ông đều dành cho đàn piano, với những tác phẩm tinh tế, đầy chất thơ và cảm xúc như nocturne, mazurka, ballade. Âm nhạc của ông giàu chất trữ tình và mang nỗi nhớ quê hương Ba Lan da diết, nên ông được ví như một nhà thơ viết bằng tiếng đàn.' },
      { q: 'Ca khúc nghệ thuật (lied) là gì?', a: 'Là thể loại bài hát phổ thơ, kết hợp tinh tế giữa giọng hát và phần đệm piano, trong đó phần đệm không chỉ nâng đỡ giọng mà còn góp phần tả cảnh, tả tình, kể chuyện. Schubert được coi là bậc thầy của thể loại này với hàng trăm bài lied.' },
      { q: 'Âm nhạc thời Lãng mạn khác thời Cổ điển ở điểm nào?', a: 'Nhạc Cổ điển đề cao sự trong sáng, cân đối, hình thức rõ ràng; còn nhạc Lãng mạn đề cao cảm xúc mãnh liệt và cái tôi cá nhân, hình thức tự do hơn, hoà thanh giàu màu sắc hơn, và thường gắn âm nhạc với thơ ca, hội hoạ, thiên nhiên để khai thác sâu nội tâm con người.' },
    ]
  ),

  'S8NT-w25-quiz': L(
    'Âm nhạc — Dân ca Việt Nam theo vùng miền',
    'Đất nước ta trải dài ba miền, mỗi miền có những làn điệu dân ca mang hồn cốt riêng. Tuần này mình về với dân ca Việt Nam — kho báu được truyền từ đời này sang đời khác, nhiều làn điệu đã được UNESCO ghi danh.',
    [
      'Biết các làn điệu dân ca tiêu biểu của ba miền.',
      'Biết những di sản dân ca được UNESCO ghi danh.',
      'Phân biệt sắc thái dân ca Bắc – Trung – Nam.',
      'Có ý thức gìn giữ và yêu quý dân ca dân tộc.',
    ],
    [
      { h: 'Dân ca miền Bắc' },
      { ul: [
        'Quan họ Bắc Ninh: hát đối đáp giữa liền anh – liền chị, mềm mại, tinh tế (UNESCO ghi danh 2009).',
        'Hát Xoan (Phú Thọ): hát thờ ở đình làng (UNESCO ghi danh 2011).',
        'Ca trù: hát thính phòng cổ, đào nương – kép đàn – quan viên (UNESCO ghi danh 2009).',
        'Hát chèo, hát xẩm: sân khấu và hát rong dân gian.',
      ] },
      { h: 'Dân ca miền Trung' },
      { ul: [
        'Hò Huế, ca Huế: ngân nga, da diết, mang chất nhạc cung đình.',
        'Dân ca Ví, Giặm Nghệ Tĩnh: mộc mạc, sâu lắng (UNESCO ghi danh 2014).',
        'Bài chòi Trung Bộ: vừa hát vừa chơi trò chơi (UNESCO ghi danh 2017).',
      ] },
      { h: 'Dân ca miền Nam' },
      { ul: [
        'Các điệu lí: lí cây bông, lí ngựa ô, lí con sáo… vui tươi, hồn nhiên.',
        'Hò Nam Bộ: hò chèo ghe, hò mái dài… gắn với sông nước.',
        'Đờn ca tài tử Nam Bộ (UNESCO ghi danh 2013) và cải lương.',
      ] },
      { h: 'Sắc thái ba miền' },
      { p: 'Mỗi vùng có một "giọng" riêng: dân ca Bắc Bộ tinh tế, nhiều luyến láy; dân ca Trung Bộ da diết, sâu lắng; dân ca Nam Bộ phóng khoáng, chân chất. Sự khác biệt này phản ánh giọng nói, cảnh sắc và tính cách con người mỗi miền.' },
      { h: 'Gìn giữ dân ca' },
      { p: 'Trong nhịp sống hiện đại, dân ca có nguy cơ mai một. Mỗi học sinh có thể góp phần gìn giữ bằng cách học vài làn điệu, tham gia câu lạc bộ dân ca, và lan toả những bản dân ca hay tới bạn bè.' },
      { note: 'Việt Nam là một trong những nước có nhiều di sản âm nhạc được UNESCO ghi danh — một niềm tự hào lớn của dân tộc.' },
    ],
    [
      { q: 'Quan họ Bắc Ninh được UNESCO ghi danh là di sản văn hoá phi vật thể vào năm nào?', a: 'Năm 2009. Quan họ Bắc Ninh là loại hình hát đối đáp giữa liền anh và liền chị, nổi tiếng với cách hát mềm mại, tinh tế, nhiều luyến láy, được UNESCO công nhận là Di sản văn hoá phi vật thể đại diện của nhân loại.' },
      { q: 'Đờn ca tài tử là dân ca đặc trưng của vùng nào và được UNESCO ghi danh năm nào?', a: 'Là dân ca đặc trưng của Nam Bộ (đặc biệt miền Tây Nam Bộ), được UNESCO ghi danh năm 2013. Đờn ca tài tử là sự kết hợp của nhiều nhạc cụ dân tộc với giọng hát, mang phong cách phóng khoáng, trữ tình của người Nam Bộ.' },
      { q: 'Hãy nêu sắc thái khác nhau của dân ca ba miền.', a: 'Dân ca Bắc Bộ tinh tế, nhiều luyến láy (như Quan họ); dân ca Trung Bộ da diết, sâu lắng (như hò Huế, Ví Giặm); dân ca Nam Bộ phóng khoáng, chân chất, vui tươi (như các điệu lí, đờn ca tài tử). Sự khác biệt phản ánh giọng nói, cảnh sắc và tính cách con người mỗi miền.' },
    ]
  ),

  'S8NT-w26-quiz': L(
    'Mĩ thuật — Thiết kế đồ hoạ ứng dụng (graphic design)',
    'Từ logo trên áo em mặc, bao bì hộp sữa, đến giao diện ứng dụng điện thoại — tất cả đều là sản phẩm của thiết kế đồ hoạ. Tuần này mình tìm hiểu graphic design: mĩ thuật phục vụ đời sống và truyền thông.',
    [
      'Hiểu khái niệm thiết kế đồ hoạ (graphic design).',
      'Biết các lĩnh vực ứng dụng của thiết kế đồ hoạ.',
      'Nắm một số nguyên tắc thiết kế cơ bản.',
      'Liên hệ thiết kế đồ hoạ với đời sống hằng ngày.',
    ],
    [
      { h: 'Thiết kế đồ hoạ là gì?' },
      { p: 'Thiết kế đồ hoạ (graphic design) là nghệ thuật kết hợp hình ảnh, chữ và màu sắc để truyền đạt thông điệp, phục vụ truyền thông và đời sống. Đây là một nhánh của mĩ thuật ứng dụng — mĩ thuật gắn liền với công năng và nhu cầu thực tế.' },
      { h: 'Các lĩnh vực ứng dụng' },
      { ul: [
        'Nhận diện thương hiệu: logo, danh thiếp, bộ nhận diện.',
        'Bao bì sản phẩm: hộp, nhãn, túi đựng.',
        'Ấn phẩm: áp phích, tờ rơi, sách, tạp chí.',
        'Giao diện số: ứng dụng, website (thiết kế UI/UX).',
        'Truyền thông số: banner, hình ảnh mạng xã hội.',
      ] },
      { h: 'Một số nguyên tắc thiết kế' },
      { ul: [
        'Cân bằng: phân bố các yếu tố cho hài hoà, không lệch nặng một bên.',
        'Tương phản: tạo điểm nhấn bằng đối lập màu sắc, kích thước, hình khối.',
        'Nhịp điệu: lặp lại có quy luật tạo cảm giác liền mạch.',
        'Phân cấp: sắp xếp thông tin theo thứ bậc để dễ đọc.',
        'Khoảng trống: để thiết kế "thở", tránh rối mắt.',
      ] },
      { h: 'UI và UX' },
      { p: 'Trong thiết kế giao diện số: UI (giao diện người dùng) là phần "nhìn thấy" — màu sắc, nút bấm, bố cục; còn UX (trải nghiệm người dùng) là cảm giác khi sử dụng — có dễ dùng, thuận tiện không. Một sản phẩm tốt cần cả UI đẹp và UX mượt.' },
      { h: 'Thiết kế đồ hoạ quanh ta' },
      { p: 'Hãy thử nhìn quanh: nhãn chai nước, bìa vở, biển hiệu cửa hàng, giao diện ứng dụng học tập… tất cả đều do người thiết kế đồ hoạ tạo ra. Hiểu các nguyên tắc thiết kế giúp em nhìn thế giới xung quanh tinh tế hơn.' },
      { note: 'Khoảng trống (khoảng trắng) không phải là "chỗ thừa" — nó là một thành phần thiết kế quan trọng, giúp bố cục rõ ràng và dễ chịu.' },
    ],
    [
      { q: 'UI và UX trong thiết kế giao diện khác nhau như thế nào?', a: 'UI (giao diện người dùng) là phần nhìn thấy được: màu sắc, hình ảnh, nút bấm, bố cục. UX (trải nghiệm người dùng) là cảm giác khi sử dụng: sản phẩm có dễ dùng, thuận tiện, hợp lí không. UI đẹp mà UX khó dùng thì vẫn chưa tốt — cần cả hai hài hoà.' },
      { q: 'Vì sao khoảng trống (khoảng trắng) lại quan trọng trong thiết kế?', a: 'Vì khoảng trống giúp bố cục "thở", làm nổi bật nội dung chính, tách bạch các thành phần và khiến mắt người xem không bị rối. Một thiết kế nhồi nhét quá nhiều chữ và hình sẽ khó đọc; khoảng trống hợp lí làm thiết kế rõ ràng, sang trọng và dễ chịu hơn.' },
      { q: 'Kể ba lĩnh vực ứng dụng của thiết kế đồ hoạ trong đời sống.', a: 'Có thể kể: thiết kế nhận diện thương hiệu (logo, danh thiếp); thiết kế bao bì sản phẩm (hộp, nhãn); và thiết kế giao diện số (ứng dụng, website). Ngoài ra còn có áp phích, tờ rơi, banner mạng xã hội… Thiết kế đồ hoạ hiện diện ở khắp nơi quanh ta.' },
    ]
  ),

  'S8NT-w27-quiz': L(
    'Mĩ thuật — Vẽ tranh đề tài đời sống',
    'Một người mẹ ru con, một cụ già ngồi bên hiên, một bác lao công sớm tinh mơ — những khoảnh khắc đời thường ấy có thể trở thành tranh đẹp và xúc động. Tuần này mình học vẽ tranh đề tài đời sống, nơi cái đẹp nằm ở sự chân thật.',
    [
      'Biết quan sát và chọn khoảnh khắc đời sống để vẽ.',
      'Hiểu cách dựng bố cục có nhân vật chính và bối cảnh.',
      'Biết dùng ánh sáng, màu sắc để gợi cảm xúc.',
      'Cảm nhận giá trị của sự chân thật trong tranh.',
    ],
    [
      { h: 'Quan sát đời sống' },
      { p: 'Đề tài đời sống lấy chất liệu từ những gì diễn ra quanh ta: sinh hoạt gia đình, lao động, đường phố, chợ búa, trường học. Người vẽ cần tập thói quen quan sát: để ý ánh sáng, biểu cảm, dáng người, và ghi nhớ (hoặc kí hoạ nhanh) những khoảnh khắc đắt giá.' },
      { h: 'Chọn khoảnh khắc "đắt"' },
      { ul: [
        'Khoảnh khắc giàu cảm xúc: mẹ ru con, ông cháu trò chuyện.',
        'Khoảnh khắc lao động: bác nông dân gặt lúa, người công nhân, cô lao công.',
        'Khoảnh khắc đời thường mà ấm áp: bữa cơm, gánh hàng rong, trẻ chơi mưa.',
      ] },
      { h: 'Bố cục tranh đời sống' },
      { ul: [
        'Xác định nhân vật chính làm trọng tâm, vẽ rõ và nổi bật.',
        'Bối cảnh hỗ trợ làm rõ câu chuyện nhưng không lấn át nhân vật.',
        'Sắp xếp nhân vật có tương tác, tránh xếp hàng đơn điệu.',
      ] },
      { h: 'Ánh sáng và màu sắc gợi cảm xúc' },
      { p: 'Ánh sáng và màu sắc quyết định "không khí" của tranh: tông màu ấm (vàng, cam) gợi sự ấm áp, thân thương; tông lạnh (lam, xám) gợi sự trầm buồn, tĩnh lặng. Hướng sáng và bóng đổ cũng tạo cảm xúc — ánh nắng chiều xiên dài luôn gợi sự hoài niệm.' },
      { h: 'Vẻ đẹp của sự chân thật' },
      { p: 'Tranh đời sống không cần "đẹp như tranh quảng cáo" — điều quan trọng là chân thật và có hồn. Một bức vẽ giản dị mà toát lên tình cảm, gợi được câu chuyện, thì đáng giá hơn một bức kĩ thuật điêu luyện nhưng vô cảm.' },
      { note: 'Hoạ sĩ Bùi Xuân Phái nổi tiếng với loạt tranh "Phố Phái" — những con phố cổ Hà Nội đời thường mà đầy chất thơ. Em có thể tìm xem để học cách nhìn cái đẹp trong điều bình dị.' },
    ],
    [
      { q: 'Yếu tố nào quan trọng nhất trong một bức tranh đề tài đời sống?', a: 'Sự chân thật và cảm xúc. Tranh đời sống không cần đẹp lộng lẫy hay kĩ thuật điêu luyện, mà cần gợi được câu chuyện và tình cảm thật. Một bức vẽ giản dị nhưng có hồn sẽ chạm đến người xem hơn một bức bóng bẩy nhưng vô cảm.' },
      { q: 'Hoạ sĩ Việt Nam nào nổi tiếng với tranh vẽ phố cổ Hà Nội đời thường?', a: 'Hoạ sĩ Bùi Xuân Phái, với loạt tranh "Phố Phái" — vẽ những con phố cổ Hà Nội bình dị nhưng đầy chất thơ và hoài niệm. Tên ông gắn liền với hình ảnh phố cổ đến mức người ta gọi luôn dòng tranh ấy là "Phố Phái".' },
      { q: 'Vì sao tông màu lại ảnh hưởng đến cảm xúc của tranh đời sống?', a: 'Vì màu sắc gợi liên tưởng cảm xúc: tông màu ấm (vàng, cam, nâu) gợi sự ấm áp, thân thương; tông màu lạnh (lam, xám) gợi sự trầm buồn, tĩnh lặng. Người vẽ chọn tông màu phù hợp với câu chuyện để dẫn dắt cảm xúc người xem — ví dụ cảnh đoàn tụ thì dùng tông ấm, cảnh chia li thì dùng tông lạnh.' },
    ]
  ),

  'S8NT-w28-quiz': L(
    'Âm nhạc — Nhạc cụ dân tộc Việt Nam',
    'Từ một dây đàn bầu mong manh, một ống sáo trúc, một dàn cồng chiêng giữa đại ngàn — cha ông ta đã tạo nên cả một kho tàng nhạc cụ dân tộc độc đáo. Tuần này mình tìm hiểu và thêm yêu những nhạc cụ truyền thống của đất nước.',
    [
      'Biết cách phân loại nhạc cụ dân tộc theo cách tạo âm.',
      'Kể tên và nhận biết một số nhạc cụ tiêu biểu.',
      'Hiểu nét độc đáo của đàn bầu và cồng chiêng Tây Nguyên.',
      'Có ý thức gìn giữ nhạc cụ dân tộc.',
    ],
    [
      { h: 'Phân loại nhạc cụ dân tộc' },
      { ul: [
        'Bộ dây: đàn tranh, đàn bầu, đàn nhị, đàn nguyệt, đàn tỳ bà…',
        'Bộ hơi: sáo trúc, kèn bầu, tiêu, tù và…',
        'Bộ gõ: trống, cồng, chiêng, mõ, thanh phách, song loan…',
      ] },
      { h: 'Một số nhạc cụ dây tiêu biểu' },
      { ul: [
        'Đàn tranh: 16 dây (hoặc hơn), gảy bằng móng, âm trong trẻo, óng ánh.',
        'Đàn nhị: 2 dây, kéo bằng cung (vĩ), âm ngân nga, da diết.',
        'Đàn nguyệt: thùng đàn tròn như mặt trăng, âm trong, tươi sáng.',
      ] },
      { h: 'Đàn bầu — nhạc cụ độc nhất' },
      { p: 'Đàn bầu (độc huyền cầm) chỉ có duy nhất một dây, nhưng nhờ cần đàn mềm và bầu cộng hưởng, người chơi có thể tạo ra vô số cao độ và sắc thái uốn lượn. Đây là nhạc cụ độc đáo, hầu như chỉ Việt Nam mới có — được coi là "linh hồn" của nhạc Việt.' },
      { h: 'Cồng chiêng Tây Nguyên' },
      { p: 'Cồng chiêng là nhạc cụ gõ bằng đồng của đồng bào Tây Nguyên, gắn với các lễ hội, nghi lễ cộng đồng. Không gian văn hoá Cồng chiêng Tây Nguyên đã được UNESCO ghi danh là Kiệt tác di sản văn hoá phi vật thể của nhân loại năm 2005.' },
      { h: 'Gìn giữ nhạc cụ dân tộc' },
      { p: 'Ngày nay, nhiều nghệ sĩ trẻ kết hợp nhạc cụ dân tộc với nhạc hiện đại để đưa âm nhạc truyền thống đến gần khán giả trẻ. Học viện Âm nhạc, các câu lạc bộ, liên hoan dân ca… cũng góp phần truyền nghề cho thế hệ sau.' },
      { note: 'Nhạc cụ dân tộc không chỉ là công cụ tạo âm — mỗi nhạc cụ mang trong mình hàng nghìn năm văn hoá và tâm hồn Việt.' },
    ],
    [
      { q: 'Nhạc cụ nào được coi là độc đáo nhất, hầu như chỉ Việt Nam mới có?', a: 'Đàn bầu (độc huyền cầm). Đàn chỉ có một dây nhưng nhờ cần đàn mềm và bầu cộng hưởng, người chơi uốn nắn tạo ra vô số cao độ và sắc thái biểu cảm. Đây là nhạc cụ độc đáo gần như chỉ có ở Việt Nam, được xem là "linh hồn" của nhạc Việt.' },
      { q: 'Không gian văn hoá Cồng chiêng Tây Nguyên được UNESCO ghi danh năm nào?', a: 'Năm 2005, được ghi danh là Kiệt tác di sản văn hoá phi vật thể và truyền khẩu của nhân loại. Cồng chiêng là nhạc cụ gõ bằng đồng, gắn bó mật thiết với các lễ hội và đời sống tâm linh của đồng bào Tây Nguyên.' },
      { q: 'Người ta thường phân loại nhạc cụ dân tộc Việt Nam thành những bộ nào?', a: 'Thường phân thành ba bộ theo cách tạo âm: bộ dây (đàn tranh, đàn bầu, đàn nhị, đàn nguyệt…), bộ hơi (sáo trúc, kèn bầu, tiêu, tù và…) và bộ gõ (trống, cồng, chiêng, mõ, thanh phách, song loan…).' },
    ]
  ),

  'S8NT-w29-quiz': L(
    'Âm nhạc — Hình thức và cấu trúc bài hát',
    'Vì sao có những đoạn nhạc cứ lặp đi lặp lại khiến ta thuộc lòng, còn có đoạn chỉ nghe một lần? Đó là nhờ cấu trúc bài hát. Tuần này mình học cách "mổ xẻ" một bài hát để nghe sâu hơn và bước đầu biết sáng tác.',
    [
      'Hiểu cấu trúc phiên khúc – điệp khúc (verse – chorus).',
      'Hiểu cấu trúc ba đoạn A – B – A.',
      'Biết vai trò của đoạn chuyển (bridge).',
      'Tập phân tích cấu trúc một bài hát quen thuộc.',
    ],
    [
      { h: 'Vì sao cần biết cấu trúc bài hát?' },
      { p: 'Mỗi bài hát đều có "kiến trúc" riêng, gồm các đoạn được sắp xếp theo trật tự nhất định. Hiểu cấu trúc giúp em nghe nhạc sâu hơn, hát đúng bố cục bài, và là bước đầu để tự sáng tác.' },
      { h: 'Phiên khúc và điệp khúc' },
      { ul: [
        'Phiên khúc (verse): đoạn kể nội dung, lời thường thay đổi qua các lần, ít gây "nghiện".',
        'Điệp khúc (chorus): đoạn hấp dẫn nhất, dễ nhớ, được lặp lại nhiều lần — là "linh hồn" của bài hát.',
        'Đoạn chuyển (bridge): đoạn khác lạ, thường xuất hiện trước điệp khúc cuối để tạo bất ngờ và cao trào.',
      ] },
      { h: 'Cấu trúc phổ biến của nhạc nhẹ' },
      { p: 'Một bài nhạc nhẹ thường có dạng: phiên khúc → điệp khúc → phiên khúc → điệp khúc → đoạn chuyển → điệp khúc. Điệp khúc lặp lại nhiều lần nên đó là phần khán giả thuộc nhất.' },
      { h: 'Cấu trúc ba đoạn A – B – A' },
      { ul: [
        'A: đoạn chủ đề chính, nêu ý nhạc đầu tiên.',
        'B: đoạn tương phản, mang màu sắc khác để tạo sự đổi mới.',
        'A: trở lại đoạn chủ đề ban đầu (có thể biến tấu), tạo cảm giác trọn vẹn, "về nhà".',
      ] },
      { p: 'Cấu trúc A – B – A rất phổ biến trong nhạc cổ điển, dân ca và nhiều ca khúc thiếu nhi.' },
      { h: 'Tập phân tích' },
      { p: 'Hãy chọn một bài hát em thuộc, nghe lại và đánh dấu: chỗ nào là phiên khúc, chỗ nào là điệp khúc, có đoạn chuyển không? Khi làm quen, em sẽ "nhìn" được khung xương của bài hát.' },
      { note: 'Mẹo: đoạn nào em thuộc nhất và hay lặp lại nhất, gần như chắc chắn đó là điệp khúc.' },
    ],
    [
      { q: 'Điệp khúc (chorus) có vai trò gì trong một bài hát?', a: 'Điệp khúc là đoạn hấp dẫn và dễ nhớ nhất, được lặp lại nhiều lần trong bài, thường mang thông điệp chính. Nó chính là "linh hồn" của bài hát — phần mà khán giả thuộc và hát theo nhiều nhất. Trong khi phiên khúc kể nội dung và thay đổi lời, thì điệp khúc giữ nguyên và lặp lại để gây ấn tượng.' },
      { q: 'Cấu trúc A – B – A gồm những phần nào?', a: 'Gồm: đoạn A (chủ đề chính), đoạn B (tương phản, màu sắc khác để tạo đổi mới), rồi quay lại đoạn A (có thể biến tấu) để tạo cảm giác trọn vẹn. Cấu trúc này phổ biến trong nhạc cổ điển, dân ca và nhiều ca khúc thiếu nhi.' },
      { q: 'Đoạn chuyển (bridge) thường xuất hiện ở đâu và có tác dụng gì?', a: 'Đoạn chuyển thường xuất hiện trước điệp khúc cuối. Nó mang giai điệu và màu sắc khác lạ so với phiên khúc và điệp khúc, nhằm tạo sự bất ngờ, phá đi cảm giác lặp lại nhàm chán và đẩy bài hát lên cao trào trước khi điệp khúc kết thúc vang lên.' },
    ]
  ),

  'S8NT-w30-quiz': L(
    'Mĩ thuật — Thiết kế công thái học (ergonomic design)',
    'Một chiếc bút dễ cầm, một chiếc ghế ngồi lâu không mỏi, một tay nắm cửa vừa tầm — đó là thành quả của thiết kế công thái học. Tuần này mình học rằng thiết kế đẹp phải đi đôi với thoải mái và an toàn cho con người.',
    [
      'Hiểu khái niệm thiết kế công thái học (ergonomic).',
      'Biết một số ví dụ thiết kế công thái học trong đời sống.',
      'Nắm các nguyên tắc cơ bản của thiết kế hướng tới con người.',
      'Liên hệ và nhận xét các đồ vật quanh mình.',
    ],
    [
      { h: 'Công thái học là gì?' },
      { p: 'Thiết kế công thái học (ergonomic design) là cách thiết kế đồ vật, không gian sao cho phù hợp với cơ thể và thói quen của con người, hướng tới sự thoải mái, hiệu quả và an toàn khi sử dụng. Nói cách khác: đồ vật phải "phục vụ con người", chứ không bắt con người gò mình theo đồ vật.' },
      { h: 'Đẹp phải đi đôi với tiện và an toàn' },
      { p: 'Một sản phẩm dù đẹp đến đâu mà dùng khó chịu, gây mỏi, gây đau hay nguy hiểm thì vẫn là thiết kế chưa tốt. Mĩ thuật ứng dụng luôn cân nhắc cả hình thức (đẹp) lẫn công năng (tiện dụng, an toàn).' },
      { h: 'Ví dụ trong đời sống' },
      { ul: [
        'Bút chì thân lục giác: không lăn khỏi bàn, dễ cầm hơn bút tròn.',
        'Ghế công thái học có tựa lưng cong: nâng đỡ cột sống, ngồi lâu đỡ mỏi.',
        'Tay nắm cửa, công tắc đặt vừa tầm với của người dùng.',
        'Bàn phím, chuột định hình theo bàn tay để giảm mỏi cổ tay.',
      ] },
      { h: 'Nguyên tắc thiết kế hướng tới con người' },
      { ul: [
        'Phù hợp với kích thước, cử động của cơ thể.',
        'Dễ hiểu, dễ dùng, không cần học nhiều.',
        'An toàn, không gây hại khi sử dụng.',
        'Bao trùm (inclusive): cố gắng phù hợp với cả người già, trẻ nhỏ, người khuyết tật.',
      ] },
      { h: 'Thiết kế cho mọi người' },
      { p: 'Thiết kế tốt nên nghĩ đến nhiều đối tượng: lối đi có dốc cho xe lăn, biển báo có cả màu và hình cho người mù màu, đồ vật có chữ nổi cho người khiếm thị. Đó là tinh thần "thiết kế bao trùm" — không bỏ ai lại phía sau.' },
      { note: 'Lần tới khi cầm một đồ vật, em hãy tự hỏi: nó có thoải mái, an toàn, dễ dùng không? Đó là em đang tư duy như một nhà thiết kế công thái học.' },
    ],
    [
      { q: 'Vì sao bút chì thường có thân hình lục giác (sáu cạnh) thay vì tròn?', a: 'Vì thân lục giác giúp bút không lăn đi khi đặt trên bàn nghiêng, và các cạnh tạo điểm tựa cho ngón tay nên cầm chắc, đỡ mỏi hơn bút tròn. Đây là một ví dụ điển hình của thiết kế công thái học — hình dáng phục vụ sự tiện dụng cho người dùng.' },
      { q: 'Thiết kế công thái học ưu tiên điều gì bên cạnh vẻ đẹp?', a: 'Ưu tiên sự thoải mái, hiệu quả và an toàn cho người sử dụng. Một sản phẩm đẹp mà dùng khó chịu, gây mỏi hoặc nguy hiểm thì vẫn là thiết kế chưa đạt. Thiết kế công thái học đặt con người làm trung tâm: đồ vật phải phù hợp với cơ thể và thói quen của con người.' },
      { q: '"Thiết kế bao trùm" (inclusive design) nghĩa là gì?', a: 'Là thiết kế cố gắng phù hợp với càng nhiều đối tượng càng tốt, kể cả người già, trẻ nhỏ và người khuyết tật. Ví dụ: lối đi có dốc cho xe lăn, biển báo dùng cả màu lẫn hình cho người mù màu, đồ vật có chữ nổi cho người khiếm thị. Tinh thần là "không bỏ ai lại phía sau".' },
    ]
  ),

  'S8NT-w31-quiz': L(
    'Âm nhạc — Sáng tác và biểu diễn theo nhóm',
    'Tự viết một bài hát của riêng mình và cùng nhóm bạn biểu diễn — nghe có vẻ khó, nhưng hoàn toàn trong tầm tay em. Tuần này mình học quy trình sáng tác đơn giản và cách phối hợp biểu diễn nhóm.',
    [
      'Nắm các bước cơ bản để sáng tác một bài hát đơn giản.',
      'Biết cách phân vai trong một nhóm biểu diễn.',
      'Hiểu vai trò của tập luyện và phối hợp.',
      'Tự tin trình bày sản phẩm trước lớp.',
    ],
    [
      { h: 'Sáng tác có khó như em nghĩ?' },
      { p: 'Sáng tác không phải đặc quyền của thiên tài. Với một chủ đề gần gũi, vài hợp âm cơ bản và một giai điệu dễ nhớ, em hoàn toàn có thể viết một bài hát đơn giản. Quan trọng là dám bắt đầu và thể hiện cảm xúc thật.' },
      { h: 'Quy trình sáng tác đơn giản' },
      { ul: [
        'Bước 1: chọn chủ đề (tình bạn, mái trường, gia đình, ước mơ…).',
        'Bước 2: viết lời, chia thành phiên khúc và điệp khúc.',
        'Bước 3: tìm giai điệu — thường bắt đầu từ điệp khúc cho dễ "bắt tai".',
        'Bước 4: chọn vài hợp âm đệm cơ bản để đỡ giai điệu.',
        'Bước 5: hoàn thiện, hát thử và chỉnh sửa.',
      ] },
      { h: 'Vòng hợp âm "kẹo ngọt"' },
      { p: 'Nhiều ca khúc nhạc nhẹ dùng vòng bốn hợp âm rất dễ nghe: Đô – Son – La thứ – Pha (C – G – Am – F), tương ứng với các bậc I – V – vi – IV. Em có thể lấy vòng này làm "khung" để hát thử giai điệu lên trên.' },
      { h: 'Phân vai trong nhóm' },
      { ul: [
        'Hát chính (lead): người thể hiện giai điệu chính.',
        'Hát bè (backing): đỡ và làm dày cho giọng chính.',
        'Đệm đàn (guitar/piano/kèn phím): giữ hoà thanh.',
        'Gõ tiết tấu (trống cajon, thanh phách…): giữ nhịp cho cả nhóm.',
      ] },
      { h: 'Tập luyện và biểu diễn' },
      { p: 'Một tiết mục hay đến từ tập luyện đều đặn: vào – ra đúng nhịp, hoà giọng, cân bằng âm lượng. Khi biểu diễn, hãy tự tin, giao lưu ánh mắt với khán giả và cùng nhau giữ tinh thần đồng đội — vì sản phẩm là của cả nhóm.' },
      { note: 'Đừng sợ sai khi sáng tác. Bài hát đầu tay có thể vụng về, nhưng đó là bước khởi đầu của mọi nhạc sĩ. Quan trọng là em đã dám sáng tạo.' },
    ],
    [
      { q: 'Khi sáng tác một bài hát, người ta thường bắt đầu từ phần nào và vì sao?', a: 'Thường bắt đầu từ điệp khúc (chorus), vì đây là phần hấp dẫn và dễ nhớ nhất — "hook" của bài hát. Có được một điệp khúc hay rồi thì việc xây dựng các phiên khúc và phần còn lại sẽ thuận lợi hơn, vì cả bài đã có một "trục" cảm xúc rõ ràng.' },
      { q: 'Vòng bốn hợp âm phổ biến trong nhạc nhẹ thường gồm những hợp âm nào?', a: 'Một vòng rất phổ biến là Đô – Son – La thứ – Pha (C – G – Am – F), ứng với các bậc I – V – vi – IV. Vòng này nghe dễ chịu, "bắt tai" và được dùng trong rất nhiều ca khúc, nên hợp để người mới tập sáng tác làm khung đệm.' },
      { q: 'Để một tiết mục biểu diễn nhóm thành công, điều gì là quan trọng nhất?', a: 'Sự tập luyện và phối hợp ăn ý: các thành viên vào – ra đúng nhịp, hoà giọng, cân bằng âm lượng, mỗi người làm tốt vai của mình (hát chính, hát bè, đệm đàn, gõ tiết tấu). Tinh thần đồng đội và sự tự tin khi đứng trước khán giả cũng rất quan trọng, vì sản phẩm là của cả nhóm chứ không của riêng ai.' },
    ]
  ),

  'S8NT-w32-quiz': L(
    'Mĩ thuật — Nghệ thuật sắp đặt (installation art)',
    'Hãy tưởng tượng một tác phẩm nghệ thuật mà em không chỉ "ngắm từ xa" — em có thể bước vào, đi quanh và trải nghiệm. Đó là nghệ thuật sắp đặt. Tuần này mình tìm hiểu một loại hình nghệ thuật đương đại đầy bất ngờ.',
    [
      'Hiểu khái niệm nghệ thuật sắp đặt.',
      'Biết đặc điểm của nghệ thuật sắp đặt.',
      'Phân biệt nghệ thuật sắp đặt với tranh truyền thống.',
      'Liên hệ với một số tác phẩm sắp đặt nổi tiếng.',
    ],
    [
      { h: 'Nghệ thuật sắp đặt là gì?' },
      { p: 'Nghệ thuật sắp đặt (installation art) là loại hình nghệ thuật đương đại, trong đó nghệ sĩ tổ chức, bố trí các vật thể, hình ảnh, ánh sáng, âm thanh… trong một không gian để tạo nên một tác phẩm hoàn chỉnh mà người xem có thể bước vào và trải nghiệm.' },
      { h: 'Đặc điểm của nghệ thuật sắp đặt' },
      { ul: [
        'Chiếm cả một không gian ba chiều, không chỉ là hình phẳng treo tường.',
        'Người xem bước vào, đi quanh, đôi khi tương tác trực tiếp.',
        'Thường kết hợp nhiều chất liệu: vật thật, ánh sáng, âm thanh, video.',
        'Nhiều tác phẩm chỉ tồn tại tạm thời, tháo dỡ sau triển lãm.',
      ] },
      { h: 'Khác với tranh truyền thống' },
      { ul: [
        'Tranh truyền thống: tác phẩm hai chiều, treo trên tường, xem từ một phía.',
        'Nghệ thuật sắp đặt: tác phẩm ba chiều, bao quanh người xem, trải nghiệm từ nhiều phía.',
      ] },
      { h: 'Một số tác phẩm tiêu biểu' },
      { ul: [
        'Olafur Eliasson — "The Weather Project": một "mặt trời" nhân tạo khổng lồ trong bảo tàng.',
        'Yayoi Kusama — những căn phòng gương vô tận với hoạ tiết chấm tròn.',
        'Nhiều nghệ sĩ Việt Nam đương đại cũng thực hiện sắp đặt trong các triển lãm.',
      ] },
      { h: 'Vì sao nghệ thuật sắp đặt hấp dẫn?' },
      { p: 'Nghệ thuật sắp đặt biến người xem từ vai trò "đứng ngoài ngắm" thành "người trong cuộc trải nghiệm". Nó kích thích nhiều giác quan và gợi suy nghĩ, cảm xúc theo cách mà một bức tranh phẳng khó làm được.' },
      { note: 'Khi tham quan triển lãm sắp đặt, em hãy đi quanh, quan sát từ nhiều góc và để ý cả ánh sáng, âm thanh — vì đó đều là một phần của tác phẩm.' },
    ],
    [
      { q: 'Nghệ thuật sắp đặt khác tranh truyền thống ở điểm cốt lõi nào?', a: 'Tranh truyền thống là tác phẩm hai chiều, treo trên tường và xem từ một phía; còn nghệ thuật sắp đặt là tác phẩm ba chiều chiếm cả một không gian, bao quanh người xem và cho phép họ bước vào, đi quanh, thậm chí tương tác. Người xem chuyển từ "ngắm từ xa" sang "trải nghiệm bên trong".' },
      { q: 'Nghệ sĩ Yayoi Kusama nổi tiếng với loại tác phẩm sắp đặt nào?', a: 'Bà nổi tiếng với những căn phòng gương vô tận (infinity rooms) phủ đầy hoạ tiết chấm tròn (polka dots). Khi bước vào, người xem thấy hình ảnh và ánh sáng lặp lại đến vô tận qua các tấm gương, tạo trải nghiệm thị giác kì ảo, choáng ngợp.' },
      { q: 'Kể một đặc điểm cho thấy nghệ thuật sắp đặt thường mang tính tạm thời.', a: 'Nhiều tác phẩm sắp đặt được dựng lên trong một không gian cụ thể cho một triển lãm, kết hợp vật thật, ánh sáng, âm thanh, và sẽ được tháo dỡ sau khi triển lãm kết thúc. Vì gắn với không gian và thời điểm cụ thể nên chúng thường không tồn tại lâu dài như một bức tranh treo cố định.' },
    ]
  ),

  'S8NT-w33-quiz': L(
    'Mĩ thuật — Nhiếp ảnh cơ bản',
    'Trong tay mỗi người ngày nay đều có một chiếc máy ảnh — đó là điện thoại. Nhưng để có một bức ảnh đẹp thì cần hiểu vài nguyên tắc. Tuần này mình học những điều cơ bản của nhiếp ảnh: bố cục, ánh sáng và khung hình.',
    [
      'Hiểu nhiếp ảnh là một loại hình mĩ thuật hiện đại.',
      'Nắm một số nguyên tắc bố cục trong nhiếp ảnh.',
      'Hiểu vai trò của ánh sáng trong chụp ảnh.',
      'Biết chọn khung hình phù hợp với chủ thể.',
    ],
    [
      { h: 'Nhiếp ảnh — vẽ bằng ánh sáng' },
      { p: 'Nhiếp ảnh là nghệ thuật ghi lại hình ảnh bằng ánh sáng qua máy ảnh. Tuy dùng máy móc, một bức ảnh đẹp vẫn cần con mắt thẩm mĩ: biết chọn khoảnh khắc, bố cục, ánh sáng. Vì thế nhiếp ảnh được coi là một loại hình mĩ thuật hiện đại.' },
      { h: 'Nguyên tắc bố cục' },
      { ul: [
        'Quy tắc một phần ba: đặt chủ thể vào giao điểm hoặc đường chia của lưới 3×3.',
        'Đường dẫn: dùng đường (con đường, hàng cây…) dẫn mắt người xem vào chủ thể.',
        'Khung trong khung: dùng cửa sổ, vòm cây… làm "khung" bao quanh chủ thể.',
        'Đối xứng: tạo cảm giác cân bằng, trang trọng.',
      ] },
      { h: 'Ánh sáng — yếu tố quyết định' },
      { ul: [
        '"Giờ vàng": khoảng một giờ sau bình minh hoặc trước hoàng hôn — ánh sáng vàng ấm, dịu, rất đẹp.',
        '"Giờ xanh": chập tối, ánh sáng xanh dịu, huyền ảo.',
        'Tránh nắng trưa gắt vì tạo bóng đậm và ảnh dễ bị "cháy" sáng.',
      ] },
      { h: 'Chọn khung hình' },
      { ul: [
        'Khung ngang: hợp với phong cảnh rộng.',
        'Khung dọc: hợp với chân dung, ảnh đăng mạng xã hội.',
        'Khung vuông: cân đối, thường dùng cho mạng xã hội.',
      ] },
      { h: 'Luyện mắt nhiếp ảnh' },
      { p: 'Em không cần máy đắt tiền — chỉ cần chiếc điện thoại và một con mắt quan sát. Hãy bật lưới (grid) trên máy để canh bố cục, chú ý hướng sáng và thử nhiều góc trước khi bấm máy. Càng chụp nhiều, mắt em càng tinh.' },
      { note: 'Một bức ảnh đẹp không nằm ở máy ảnh xịn mà ở con mắt người chụp. Hãy tập "nhìn thấy" cái đẹp trước khi bấm máy.' },
    ],
    [
      { q: '"Giờ vàng" trong nhiếp ảnh là khoảng thời gian nào và vì sao đẹp?', a: '"Giờ vàng" là khoảng một giờ sau khi mặt trời mọc hoặc một giờ trước khi mặt trời lặn. Lúc này ánh sáng có màu vàng ấm, dịu và xiên ngang, tạo bóng mềm mại và làm cảnh vật trở nên lung linh — nên được coi là thời điểm chụp ảnh đẹp nhất trong ngày.' },
      { q: 'Quy tắc một phần ba trong nhiếp ảnh được áp dụng như thế nào?', a: 'Người chụp tưởng tượng (hoặc bật) một lưới 3×3 chia khung hình bằng hai đường dọc và hai đường ngang, rồi đặt chủ thể vào một trong bốn giao điểm hoặc dọc theo các đường chia. Cách này tạo bố cục cân đối, sinh động hơn so với đặt chủ thể ngay chính giữa khung.' },
      { q: 'Vì sao nhiếp ảnh được coi là một loại hình mĩ thuật dù dùng máy móc?', a: 'Vì dù máy móc ghi lại hình ảnh, người chụp mới là người quyết định cái đẹp: chọn khoảnh khắc, bố cục, ánh sáng, góc máy và chủ thể. Hai người cùng một chiếc máy, cùng một cảnh, vẫn cho ra hai bức ảnh khác nhau tuỳ con mắt thẩm mĩ. Chính yếu tố sáng tạo và thẩm mĩ đó khiến nhiếp ảnh là một loại hình mĩ thuật hiện đại.' },
    ]
  ),

  'S8NT-w34-quiz': L(
    'Tổng kết — Triển lãm và biểu diễn cuối năm',
    'Sau một năm học Nghệ thuật, đã đến lúc cùng nhau tổ chức một buổi triển lãm tranh và biểu diễn âm nhạc để khoe những gì mình đã làm được. Tuần này mình học cách chuẩn bị, trình bày và đánh giá sản phẩm nghệ thuật.',
    [
      'Biết cách chuẩn bị và trưng bày tác phẩm trong triển lãm.',
      'Biết tổ chức một tiết mục biểu diễn nhóm.',
      'Hiểu và thực hành đánh giá đồng đẳng.',
      'Tự tin giới thiệu sản phẩm của mình.',
    ],
    [
      { h: 'Ý nghĩa của buổi tổng kết' },
      { p: 'Triển lãm và biểu diễn cuối năm là dịp để mỗi học sinh nhìn lại hành trình của mình, chia sẻ thành quả với bạn bè và thầy cô. Đây cũng là cơ hội rèn kĩ năng trình bày, tổ chức và làm việc nhóm.' },
      { h: 'Chuẩn bị triển lãm tranh' },
      { ul: [
        'Chọn những tác phẩm tốt nhất, tiêu biểu cho cả năm.',
        'Đặt tên tranh và viết chú thích ngắn (ý tưởng, chất liệu).',
        'Sắp xếp tranh theo chủ đề, hài hoà về kích cỡ và màu sắc.',
        'Trang trí không gian trưng bày gọn gàng, có ánh sáng phù hợp.',
      ] },
      { h: 'Chuẩn bị biểu diễn âm nhạc' },
      { ul: [
        'Chọn tiết mục: hát tập thể, tốp ca, độc tấu/hoà tấu nhạc cụ.',
        'Phân vai rõ ràng, tập luyện đều cho đúng nhịp và hoà giọng.',
        'Chuẩn bị trang phục, đạo cụ, lời dẫn chương trình.',
      ] },
      { h: 'Đánh giá đồng đẳng' },
      { p: 'Đánh giá đồng đẳng là việc các bạn cùng nhận xét, góp ý cho nhau. Khi nhận xét, hãy khách quan: nêu điểm tốt trước, rồi góp ý chân thành điều có thể cải thiện. Học cách nhận xét và đón nhận góp ý là một kĩ năng quan trọng.' },
      { h: 'Trình bày tự tin' },
      { p: 'Khi giới thiệu tác phẩm hay biểu diễn, hãy tự tin, nói rõ ràng, thể hiện được ý tưởng và cảm xúc của mình. Đừng ngại nếu chưa hoàn hảo — điều đáng quý là em đã dám sáng tạo và chia sẻ.' },
      { note: 'Một triển lãm hấp dẫn không chỉ nhờ tác phẩm đẹp mà còn nhờ cách trưng bày, chú thích rõ ràng và không gian được sắp xếp chu đáo.' },
    ],
    [
      { q: 'Để một buổi triển lãm tranh hấp dẫn, cần chuẩn bị những gì?', a: 'Cần: chọn những tác phẩm tốt và tiêu biểu; đặt tên và viết chú thích ngắn cho mỗi tranh (ý tưởng, chất liệu); sắp xếp tranh theo chủ đề, hài hoà về kích cỡ và màu sắc; trang trí không gian gọn gàng với ánh sáng phù hợp. Tác phẩm đẹp cộng với cách trưng bày chu đáo mới tạo nên một triển lãm cuốn hút.' },
      { q: 'Đánh giá đồng đẳng là gì và nên thực hiện thế nào cho hiệu quả?', a: 'Đánh giá đồng đẳng là việc các bạn học cùng nhận xét, góp ý cho tác phẩm của nhau. Để hiệu quả, cần khách quan và chân thành: nêu điểm tốt trước để động viên, sau đó góp ý nhẹ nhàng những điều có thể cải thiện. Qua đó, cả người nhận xét và người được nhận xét đều học được cách nhìn nhận tác phẩm một cách công bằng.' },
      { q: 'Khi giới thiệu tác phẩm hoặc biểu diễn trước lớp, em nên có thái độ thế nào?', a: 'Nên tự tin, nói rõ ràng, thể hiện được ý tưởng và cảm xúc của mình; với biểu diễn nhóm thì giữ tinh thần đồng đội. Không cần quá lo lắng nếu sản phẩm chưa hoàn hảo — điều đáng quý là em đã dám sáng tạo và sẵn sàng chia sẻ thành quả với mọi người.' },
    ]
  ),

  'S8NT-w35-quiz': L(
    'Ôn tập cuối năm',
    'Một năm Nghệ thuật 8 đã khép lại với biết bao điều mới mẻ — từ những hợp âm, các nhà soạn nhạc lớn, đến lịch sử mĩ thuật dân tộc và các loại hình nghệ thuật hiện đại. Tuần cuối, mình hệ thống lại tất cả và cùng nhìn về phía trước.',
    [
      'Hệ thống lại toàn bộ kiến thức âm nhạc cả năm.',
      'Hệ thống lại toàn bộ kiến thức mĩ thuật cả năm.',
      'Tự đánh giá sự tiến bộ của bản thân.',
      'Nuôi dưỡng tình yêu lâu dài với nghệ thuật.',
    ],
    [
      { h: 'Bản đồ kiến thức cả năm' },
      { p: 'Nghệ thuật 8 gồm hai mảng song hành: Âm nhạc và Mĩ thuật. Mỗi mảng vừa có phần lí thuyết – lịch sử, vừa có phần thực hành – sáng tạo. Hệ thống lại theo hai nhánh này sẽ giúp em nắm trọn chương trình.' },
      { h: 'Hệ thống Âm nhạc' },
      { ul: [
        'Nhạc lí: đảo phách, gam thứ, hợp âm và hợp âm 7, cấu trúc bài hát.',
        'Các nhà soạn nhạc thế giới: Bach (Baroque), Mozart (Cổ điển), Beethoven (cầu nối), Chopin – Schubert – Schumann (Lãng mạn).',
        'Thể loại: nhạc thính phòng, opera.',
        'Âm nhạc dân tộc: dân ca ba miền, nhạc cụ dân tộc; dân ca thế giới.',
        'Thực hành: kĩ thuật hát, chơi nhạc cụ, sáng tác và biểu diễn nhóm.',
      ] },
      { h: 'Hệ thống Mĩ thuật' },
      { ul: [
        'Kĩ năng tạo hình: luật xa gần, kí hoạ chân dung, vẽ tranh đề tài, vẽ tranh đời sống.',
        'Chất liệu: tranh sơn dầu, tranh lụa.',
        'Lịch sử mĩ thuật Việt Nam: Lý – Trần – Lê – Nguyễn và thời kì Pháp thuộc (Trường Mĩ thuật Đông Dương).',
        'Mĩ thuật ứng dụng và hiện đại: thiết kế áp phích, thiết kế đồ hoạ, công thái học, nghệ thuật sắp đặt, nhiếp ảnh.',
      ] },
      { h: 'Tự đánh giá sự tiến bộ' },
      { p: 'Hãy tự hỏi: Em đã hiểu đảo phách, hợp âm 7 chưa? Em có thể hát đúng nhịp và hoà giọng không? Em đã vẽ được một bức tranh có luật xa gần và đậm nhạt chưa? Em phân biệt được mĩ thuật các thời Lý – Trần – Lê – Nguyễn không? Mỗi câu trả lời là một dấu mốc trưởng thành của em.' },
      { h: 'Nghệ thuật là hành trình cả đời' },
      { p: 'Học nghệ thuật không phải để thi cho qua, mà để tâm hồn em phong phú hơn, biết rung động trước cái đẹp và biết biểu đạt cảm xúc của mình. Mong em sẽ tiếp tục yêu âm nhạc và hội hoạ trong suốt cuộc đời.' },
      { note: 'Nghệ thuật không có đích đến cuối cùng. Mỗi bài hát em hát, mỗi bức tranh em vẽ đều làm cuộc sống của em đẹp và ý nghĩa hơn.' },
    ],
    [
      { q: 'Kể tên các nhà soạn nhạc thế giới đã học và thời kì âm nhạc của họ.', a: 'J.S. Bach (Baroque), W.A. Mozart (Cổ điển), L. van Beethoven (cầu nối Cổ điển – Lãng mạn), cùng ba nhà soạn nhạc Lãng mạn là Chopin, Schubert và Schumann. Họ trải dài qua các thời kì lớn của âm nhạc cổ điển phương Tây: Baroque → Cổ điển → Lãng mạn.' },
      { q: 'Nêu lại bốn thời kì mĩ thuật phong kiến Việt Nam đã học và thêm giai đoạn nào đặt nền cho mĩ thuật hiện đại?', a: 'Bốn thời kì phong kiến: Lý, Trần, Lê, Nguyễn. Giai đoạn đặt nền cho mĩ thuật hiện đại Việt Nam là thời kì Pháp thuộc, với dấu mốc quan trọng là sự ra đời của Trường Mĩ thuật Đông Dương (1925).' },
      { q: 'Theo em, mục đích sâu xa của việc học môn Nghệ thuật là gì?', a: 'Không phải để học thuộc lòng hay thi cho qua, mà để nuôi dưỡng tâm hồn: biết rung động trước cái đẹp, biết cảm thụ âm nhạc và hội hoạ, và biết biểu đạt cảm xúc, ý tưởng của bản thân. Nghệ thuật là hành trình cả đời, giúp cuộc sống của mỗi người phong phú và ý nghĩa hơn.' },
    ]
  ),

  'S8NT-w36-quiz': L(
    'Kết thúc Nghệ Thuật 8 — Âm nhạc & Mỹ thuật nuôi dưỡng tâm hồn',
    'Năm lớp 8 đã mở ra những cánh cửa nghệ thuật rộng lớn: em biết lắng nghe Bach, Beethoven, Chopin; biết nhìn bức tranh và nhận ra luật xa gần; biết về lịch sử mĩ thuật Việt Nam qua bốn triều đại và Trường Mĩ thuật Đông Dương. Đây là tuần ôn tập, nhưng cũng là lúc để em tự hỏi: Nghệ thuật đã thay đổi mình như thế nào?',
    [
      'Hệ thống lại toàn bộ kiến thức Âm nhạc lớp 8: nhạc lí, âm nhạc cổ điển phương Tây.',
      'Tổng hợp Mĩ thuật lớp 8: kĩ thuật vẽ, lịch sử mĩ thuật Việt Nam và thế giới, mĩ thuật ứng dụng.',
      'Tự đánh giá sự tiến bộ và định hướng giữ gìn tình yêu nghệ thuật suốt đời.',
    ],
    [
      { h: 'Âm nhạc — Nhạc lí và Hát' },
      { ul: [
        'Nhịp phức: 6/8 (2 phách mạnh nhẹ nhẹ, nhẹ nhẹ nhẹ mỗi nhịp), 9/8; cảm nhận trọng âm phức hợp.',
        'Đảo phách (syncope): âm thanh bắt đầu ở phách nhẹ kéo qua phách mạnh — tạo cảm giác "trễ nhịp" đặc trưng trong nhạc jazz và pop.',
        'Hợp âm 7: gồm 4 nốt (nền + quãng 3 + quãng 5 + quãng 7); hợp âm 7 át (dominant 7th) tạo sức căng giải quyết về chủ âm.',
        'Bài hát trong chương trình: các ca khúc dân ca Việt Nam và bài hát nước ngoài lựa chọn; kĩ thuật hát (hơi thở, phát âm, cảm xúc).',
        'Thưởng thức âm nhạc: tập nghe có ý thức — phân biệt nhạc cụ, cấu trúc bài, sắc thái to nhỏ (dynamics).',
      ] },
      { h: 'Âm nhạc — Lịch sử âm nhạc cổ điển phương Tây' },
      { ul: [
        'Thời kì Baroque (1600–1750): J.S. Bach — đỉnh cao đối âm (counterpoint); cấu trúc rõ ràng, tinh xảo; nhạc khí và Thanh nhạc.',
        'Thời kì Cổ điển (1750–1820): W.A. Mozart — giai điệu trong sáng, cân đối hoàn hảo; L. van Beethoven — cầu nối Cổ điển – Lãng mạn, phong cách mãnh liệt, cá nhân.',
        'Thời kì Lãng mạn (1820–1900): Frédéric Chopin — thơ ca của piano, nocturne và ballade; Franz Schubert — ca khúc (Lied) giàu cảm xúc; Robert Schumann — nhạc piano lãng mạn và văn học âm nhạc.',
      ] },
      { h: 'Mĩ thuật — Kĩ năng tạo hình' },
      { ul: [
        'Luật xa gần (phối cảnh): điểm tụ, đường chân trời; vật xa nhỏ và mờ hơn vật gần.',
        'Kí hoạ chân dung: tỉ lệ khuôn mặt (mắt ở giữa chiều cao đầu; các đặc điểm cân đối); diễn tả thần sắc.',
        'Vẽ tranh đề tài: phác thảo bố cục, chọn mảng sáng-tối, lên màu có chủ đích.',
        'Chất liệu: tranh sơn dầu (màu sắc bền, biểu cảm mạnh), tranh lụa (trong sáng, nhẹ nhàng).',
      ] },
      { h: 'Mĩ thuật — Lịch sử mĩ thuật Việt Nam' },
      { ul: [
        'Thời Lý (1010–1225): nghệ thuật Phật giáo — chùa Một Cột, tượng Phật, hoa sen và rồng uốn lượn.',
        'Thời Trần (1225–1400): nghệ thuật hào hùng — điêu khắc khoẻ mạnh; gốm Thiên Trường.',
        'Thời Lê (1428–1788): nghệ thuật dân gian phong phú — tranh Đông Hồ; đình làng với chạm khắc gỗ sống động.',
        'Thời Nguyễn (1802–1945): kiến trúc Huế — Đại Nội, lăng tẩm; ảnh hưởng Trung Hoa và bắt đầu tiếp xúc phương Tây.',
        'Thời kì Pháp thuộc — Trường Mĩ thuật Đông Dương (1925): đặt nền mĩ thuật hiện đại Việt Nam; các danh hoạ Tô Ngọc Vân, Nguyễn Phan Chánh, Nguyễn Gia Trí.',
      ] },
      { h: 'Mĩ thuật ứng dụng và hiện đại' },
      { ul: [
        'Thiết kế áp phích (poster): nguyên tắc bố cục (điểm nhìn, tỉ lệ vàng, cân bằng); vai trò màu sắc và kiểu chữ.',
        'Thiết kế đồ hoạ và công thái học (ergonomics): thiết kế phải phù hợp với người dùng.',
        'Nghệ thuật sắp đặt (installation art) và nhiếp ảnh nghệ thuật.',
      ] },
      { h: 'Cầu nối sang lớp 9' },
      { ul: [
        'Âm nhạc lớp 9: nhạc lí nâng cao; âm nhạc thế giới ngoài truyền thống phương Tây (nhạc jazz, nhạc châu Phi, nhạc châu Á).',
        'Mĩ thuật lớp 9: nghệ thuật hiện đại và đương đại Việt Nam; nghệ thuật kĩ thuật số và phương tiện hỗn hợp (mixed media); dự án nghệ thuật cộng đồng.',
      ] },
      { note: 'Nghệ thuật không bao giờ kết thúc. Mỗi bản nhạc em nghe, mỗi bức tranh em thấy, mỗi bức ảnh em chụp đều là một cuộc đối thoại giữa tâm hồn em và thế giới. Hãy tiếp tục cảm nhận, sáng tạo và yêu cái đẹp!' },
    ],
    [
      { q: 'Phân biệt đảo phách và phách mạnh thông thường trong âm nhạc. Cho ví dụ.', a: 'Phách mạnh thông thường: âm thanh rơi vào đúng phách được nhấn mạnh theo nhịp (ví dụ: phách 1 của nhịp 4/4). Đảo phách (syncope): âm thanh bắt đầu ở phách YẾU hoặc sau phách mạnh rồi kéo qua phách mạnh tiếp theo — tạo cảm giác "lỡ nhịp" hoặc "trễ nhịp" rất đặc trưng. Ví dụ: nốt nhạc bắt đầu ở phách 2 (nhẹ) của nhịp 4/4, được nối (ligature) qua phách 3 (mạnh nhẹ) — âm thanh ngân qua phách mạnh nhưng không bắt đầu từ phách mạnh. Đảo phách thường gặp trong nhạc jazz, funk, và nhiều thể loại nhạc hiện đại.' },
      { q: 'Nêu điểm khác nhau cơ bản giữa phong cách âm nhạc thời Baroque (J.S. Bach) và thời Lãng mạn (Chopin).', a: 'Âm nhạc Baroque (Bach): có cấu trúc đối xứng, chặt chẽ và tinh xảo; kĩ thuật đối âm (nhiều giai điệu song song nhau); cảm xúc được biểu hiện qua hình thức âm nhạc nghiêm ngặt, khách quan; nhạc cụ thời kì này chủ yếu là đàn phím (harpsichord) và ensemble. Âm nhạc Lãng mạn (Chopin): tình cảm cá nhân là trung tâm — âm nhạc tự do, bộc phát, đầy cảm xúc chủ quan; sử dụng rubato (tự do về nhịp độ); khai thác tối đa màu sắc và kĩ thuật piano; nội dung thường gắn với thơ ca, thiên nhiên và cảm xúc nội tâm.' },
      { q: 'Trường Mĩ thuật Đông Dương (1925) có ý nghĩa gì đối với nền mĩ thuật Việt Nam?', a: 'Trường Mĩ thuật Đông Dương (École des Beaux-Arts de l\'Indochine) thành lập năm 1925 là dấu mốc quan trọng nhất trong lịch sử mĩ thuật Việt Nam hiện đại. Nhà trường đã đưa các kĩ thuật và phong cách phương Tây (sơn dầu, phối cảnh, tỉ lệ giải phẫu) vào Việt Nam, kết hợp với chất liệu và chủ đề truyền thống (tranh lụa, sơn mài). Từ đây xuất hiện thế hệ danh hoạ đầu tiên: Tô Ngọc Vân, Nguyễn Phan Chánh (tranh lụa), Nguyễn Gia Trí (tranh sơn mài). Họ đặt nền móng cho một nền mĩ thuật dân tộc hiện đại, độc đáo, có bản sắc riêng — vừa mang giá trị truyền thống vừa đạt chuẩn mực quốc tế.' },
    ]
  ),
};


