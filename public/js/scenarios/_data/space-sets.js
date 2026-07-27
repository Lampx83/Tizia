// DATA seed — cấu hình 8 trường (space + quiz nhúng). Chỉ seed-content.mjs import.
const SPACES_PHARMACY = {
  admin:{emoji:'⚙️',name:'Hành chính – Hiệu bộ',accent:'#94a3b8',intro:'Trung tâm điều hành & thông tin của Trường Dược: theo dõi tiến độ, tiếp nhận yêu cầu cải tiến, tìm hiểu về trường.',
    rooms:[{ic:'📊',name:'Bảng điều khiển',rd:'Thống kê tiến độ học tập, phổ điểm, huy hiệu.',href:'/dashboard.html'},
      {ic:'🏛️',name:'Ban điều hành AI',rd:'Gửi đề xuất để trường (AI) cải tiến & bình chọn.',board:true},
      {ic:'📜',name:'Sảnh giới thiệu',rd:'Cơ cấu & chương trình đào tạo Dược.',panel:[
        {h:'Chương trình đào tạo Dược sĩ đại học'},
        {p:'Đào tạo 5 năm theo Dược điển Việt Nam (Bộ Y tế ban hành).'},
        {h:'Hành trình học tập'},
        {timeline:[{t:'Khoa học cơ bản & Hoá',d:'Hoá hữu cơ, hoá phân tích, sinh học.'},
          {t:'Bào chế & Kiểm nghiệm',d:'Pha chế dạng thuốc, kiểm tra chất lượng.'},
          {t:'Dược lý & Lâm sàng',d:'Cơ chế thuốc, dùng thuốc hợp lý.'},
          {t:'Thực hành & OSCE',d:'Kỹ năng tại nhà thuốc/bệnh viện, thi trạm OSCE.'}]}]},
      {ic:'⚖️',name:'Pháp luật dược',rd:'Luật Dược & hành nghề.',panel:[
        {h:'Pháp luật & hành nghề dược'},
        {ul:['Luật Dược 2016 điều chỉnh sản xuất, kinh doanh, sử dụng thuốc','Chứng chỉ hành nghề dược bắt buộc với người phụ trách chuyên môn','Phân loại thuốc kê đơn (Rx) & không kê đơn (OTC)','Thuốc gây nghiện / hướng thần quản lý đặc biệt']},
        {note:'Bán thuốc kê đơn khi không có đơn là vi phạm; kháng sinh phải theo đơn.'}]},
      {ic:'📑',name:'Đăng ký thuốc (CTD)',rd:'Hồ sơ 5 module ICH.',panel:[
        {h:'Hồ sơ đăng ký thuốc (CTD)'},
        {ol:['Module 1 – Hành chính & thông tin kê toa','Module 2 – Tóm tắt tổng quan','Module 3 – Chất lượng (CMC)','Module 4 – Báo cáo tiền lâm sàng','Module 5 – Báo cáo lâm sàng']},
        {note:'CTD = Common Technical Document (chuẩn ICH); nộp Cục Quản lý Dược (DAV).'}]},
      {ic:'🏷️',name:'Đấu thầu thuốc BV',rd:'Quy trình mua sắm.',panel:[
        {h:'Đấu thầu thuốc bệnh viện'},
        {ul:['Lập danh mục & dự trù số lượng theo nhu cầu điều trị','Xây dựng hồ sơ mời thầu theo quy định','Đánh giá kỹ thuật (chất lượng) + tài chính (giá)','Tham chiếu kinh tế dược để cân bằng chi phí – chất lượng']},
        {note:'Mục tiêu: đủ thuốc, chất lượng đạt, giá hợp lý, minh bạch.'}]},
      {ic:'⚠️',name:'Cảnh giác dược (ADR)',rd:'Báo cáo phản ứng có hại.',panel:[
        {h:'Cảnh giác dược (Pharmacovigilance)'},
        {p:'Phát hiện, đánh giá & phòng tránh phản ứng có hại của thuốc (ADR).'},
        {mcq:[{q:'Gặp một ADR nghiêm trọng, dược sĩ cần làm gì?',o:['Báo cáo về Trung tâm DI & ADR Quốc gia','Giấu đi để tránh phiền','Chỉ ghi sổ cá nhân','Bỏ qua nếu BN đã ổn'],a:0,fb:'Báo cáo ADR (kể cả nghi ngờ) giúp phát hiện tín hiệu an toàn — gửi Trung tâm DI & ADR Quốc gia.'}]},
        {note:'Thang WHO-UMC đánh giá mối liên quan thuốc–ADR (chắc chắn → có thể → không chắc).'}]},
      // Trải nghiệm cá nhân — Cây Tri Thức + Bảng Phong Thần cho SV Dược
      {ic:'🌳',name:'Cây Tri Thức của em',rd:'Trực quan hoá tiến độ học 5 năm Dược — mỗi module hoàn thành = 1 chiếc lá.',href:'/cay-tri-thuc.html'},
      {ic:'🏆',name:'Bảng Phong Thần Tizia',rd:'Xếp hạng SV Dược theo điểm tổng — cao thủ Dược điển!',href:'/bang-phong-than.html'}],
    skills:['Hiểu cơ cấu trường','Pháp chế & đăng ký thuốc','Cảnh giác dược'],
    quiz:[{q:'Dược sĩ đại học ở Việt Nam đào tạo mấy năm?',o:['3 năm','4 năm','5 năm','6 năm'],a:2},
      {q:'Cơ quan ban hành Dược điển Việt Nam?',o:['Bộ Y tế','Bộ Giáo dục','WHO','FDA'],a:0},
      {q:'Tốt nghiệp Dược sĩ ĐH có thể làm ở?',o:['Nhà thuốc, bệnh viện, công ty dược, kiểm nghiệm','Chỉ bán lẻ','Chỉ giảng dạy','Không nơi nào'],a:0}]},

  lecture:{emoji:'🏛️',name:'Giảng đường',accent:'#c2703d',intro:'Không gian học lý thuyết nền tảng ngành Dược: bài giảng và kiểm tra nhanh.',
    rooms:[{ic:'🧠',name:'Quiz lý thuyết',rd:'10 câu MCQ, 15s/câu, phản hồi tức thì.',href:'/quiz.html'},
      {ic:'📽️',name:'Bài giảng',rd:'Các môn nền tảng ngành Dược.',panel:[
        {h:'Các môn nền tảng'},
        {cards:[{ic:'⚗️',t:'Hoá dược',d:'Cấu trúc – tác dụng của hoạt chất.'},
          {ic:'💉',t:'Dược lý',d:'Cơ chế & tác dụng của thuốc.'},
          {ic:'🧴',t:'Bào chế',d:'Dạng thuốc & kỹ thuật pha chế.'},
          {ic:'🌿',t:'Dược liệu',d:'Cây thuốc & hoạt chất tự nhiên.'},
          {ic:'🩺',t:'Dược lâm sàng',d:'Dùng thuốc hợp lý trên người bệnh.'},
          {ic:'⚖️',t:'Pháp chế dược',d:'Luật & quy định hành nghề.'}]},
        {note:'Slide/video đang được biên soạn — trước mắt luyện Quiz lý thuyết để nắm cốt lõi.'}]},
      {ic:'🔤',name:'Tiếng Anh dược',rd:'Lật thẻ thuật ngữ Anh – Việt.',panel:[
        {p:'Lật thẻ để ôn thuật ngữ tiếng Anh chuyên ngành Dược.'},
        {flash:[{e:'💊',f:'Tablet',b:'Viên nén'},{e:'🔵',f:'Capsule',b:'Viên nang'},
          {e:'🥄',f:'Dose',b:'Liều dùng'},{e:'⚠️',f:'Side effect',b:'Tác dụng phụ'},
          {e:'📝',f:'Prescription (Rx)',b:'Đơn thuốc'},{e:'🆓',f:'OTC',b:'Thuốc không kê đơn'}]}]},
      {ic:'⚖️',name:'Đạo đức nghề Dược',rd:'Tình huống đạo đức.',panel:[
        {h:'Tình huống đạo đức nghề nghiệp'},
        {mcq:[{q:'Khách quen xin mua kháng sinh (thuốc kê đơn) không có đơn. Nên?',o:['Từ chối lịch sự, giải thích & khuyên đi khám','Bán vì là khách quen','Bán nửa liều','Bán nhưng dặn giữ bí mật'],a:0,fb:'Đạo đức + pháp luật: không bán thuốc kê đơn khi không có đơn, kể cả người quen.'},
          {q:'Thông tin sức khoẻ người bệnh, dược sĩ phải?',o:['Bảo mật, chỉ chia sẻ khi cần & được phép','Kể cho người khác','Đăng mạng xã hội','Dùng để quảng cáo'],a:0,fb:'Bảo mật thông tin người bệnh là nguyên tắc đạo đức cốt lõi của nghề.'}]}]}],
    skills:['Nắm lý thuyết cốt lõi','Thuật ngữ Anh dược','Đạo đức nghề nghiệp'],
    quiz:[{q:'"Dược động học" (Pharmacokinetics) nghiên cứu điều gì?',o:['Số phận thuốc trong cơ thể (ADME)','Cách trồng dược liệu','Giá thuốc','Quảng cáo thuốc'],a:0},
      {q:'ADME gồm: Hấp thu, Phân bố, Chuyển hoá và…?',o:['Thải trừ','Đóng gói','Bảo quản','Nhập kho'],a:0},
      {q:'Sinh khả dụng (bioavailability) là?',o:['Tỉ lệ thuốc vào tuần hoàn chung ở dạng còn hoạt tính','Giá thuốc','Màu viên','Hạn dùng'],a:0}]},

  library:{emoji:'📖',name:'Thư viện',accent:'#b59b6a',intro:'Tra cứu thông tin thuốc và ôn tập củng cố kiến thức.',
    rooms:[{ic:'🔎',name:'Tra cứu thuốc',rd:'Nguồn tin cậy & kỹ năng tra cứu.',panel:[
        {h:'Nguồn tra cứu đáng tin'},
        {ul:['Dược thư Quốc gia Việt Nam','Dược điển Việt Nam (tiêu chuẩn chất lượng)','Tờ Hướng dẫn sử dụng (HDSD) trong hộp thuốc','CSDL tương tác: Micromedex, Drugs.com']},
        {h:'Quy trình tra cứu'},
        {ol:['Xác định hoạt chất (tên gốc), không chỉ tên thương mại','Tra phân loại ATC: Giải phẫu – Điều trị – Hoá học','Đối chiếu chỉ định, liều, chống chỉ định, tương tác','Ghi lại nguồn & ngày tra cứu']},
        {note:'Tránh nguồn không chính thống (mạng xã hội, quảng cáo). CSDL nội bộ Tizia: 81 thuốc, 30 dược liệu.'}]},
      {ic:'🧠',name:'Quiz ôn tập',rd:'Củng cố kiến thức đã học.',href:'/quiz.html'},
      {ic:'📊',name:'Thống kê y học',rd:'p-value, CI, chọn test.',panel:[
        {h:'Thống kê y học cơ bản'},
        {ul:['p < 0.05: khác biệt có ý nghĩa thống kê (theo quy ước)','Khoảng tin cậy 95% (CI): độ chính xác của ước lượng','Biến định lượng → t-test/ANOVA; định tính → Chi-square','Tương quan KHÔNG đồng nghĩa nhân quả']},
        {note:'Ý nghĩa thống kê (statistical) khác ý nghĩa lâm sàng (clinical) — cần xét cả hai.'}]},
      {ic:'🧭',name:'Y học chứng cứ (EBM)',rd:'PICO & tháp chứng cứ.',panel:[
        {h:'Đặt câu hỏi lâm sàng theo PICO'},
        {cards:[{ic:'🧍',t:'P – Patient',d:'Người bệnh / vấn đề'},{ic:'💊',t:'I – Intervention',d:'Can thiệp / thuốc'},
          {ic:'⚖️',t:'C – Comparison',d:'So sánh / đối chứng'},{ic:'🎯',t:'O – Outcome',d:'Kết cục quan tâm'}]},
        {mcq:[{q:'Thiết kế nghiên cứu cho chứng cứ MẠNH nhất về hiệu quả điều trị?',o:['Tổng quan hệ thống / RCT','Báo cáo ca','Ý kiến chuyên gia','Nghiên cứu trên động vật'],a:0,fb:'Tháp chứng cứ: Systematic review/Meta-analysis của RCT ở đỉnh; ý kiến chuyên gia ở đáy.'}]}]},
      {ic:'📚',name:'Tổng quan hệ thống',rd:'Systematic review & meta-analysis.',panel:[
        {h:'Tổng quan hệ thống & Meta-analysis'},
        {ul:['Câu hỏi rõ + tiêu chí chọn/loại minh bạch','Tìm kiếm toàn diện nhiều cơ sở dữ liệu','Đánh giá nguy cơ sai lệch (risk of bias)','Meta-analysis: gộp định lượng kết quả (forest plot)']},
        {note:'Tuân theo hướng dẫn PRISMA để minh bạch & có thể lặp lại.'}]},
      {ic:'✍️',name:'Viết khoá luận',rd:'Cấu trúc IMRaD.',panel:[
        {h:'Cấu trúc khoá luận (IMRaD)'},
        {ol:['Introduction – Đặt vấn đề & mục tiêu','Methods – Đối tượng & phương pháp','Results – Kết quả','and Discussion – Bàn luận & kết luận']},
        {note:'Trích dẫn trung thực, tránh đạo văn; quản lý tài liệu bằng Zotero/EndNote.'}]},
      {ic:'💰',name:'Kinh tế dược',rd:'CEA, CUA, ICER.',panel:[
        {h:'Kinh tế dược (Pharmacoeconomics)'},
        {ul:['CMA – tối thiểu hoá chi phí (khi hiệu quả tương đương)','CEA – chi phí / hiệu quả','CUA – chi phí / QALY (chất lượng sống)','ICER – chi phí tăng thêm cho mỗi đơn vị hiệu quả tăng thêm']},
        {note:'ICER hỗ trợ quyết định chi trả & đấu thầu — cân bằng chi phí và lợi ích sức khoẻ.'}]},
      {ic:'🤖',name:'AI/ML trong Dược',rd:'Ứng dụng & giới hạn.',panel:[
        {h:'AI/ML trong ngành Dược'},
        {ul:['Sàng lọc & thiết kế thuốc (drug discovery)','Dự đoán tương tác & độc tính','Cá thể hoá liều (precision dosing)','Cảnh giác dược: phát hiện tín hiệu ADR từ dữ liệu lớn']},
        {note:'AI hỗ trợ quyết định — dược sĩ vẫn chịu trách nhiệm chuyên môn cuối cùng.'}]}],
    skills:['Tra cứu & EBM','Thống kê & nghiên cứu','Viết học thuật'],
    quiz:[{q:'Phân loại ATC dựa trên?',o:['Giải phẫu – Điều trị – Hoá học','Màu sắc viên thuốc','Giá bán','Hãng sản xuất'],a:0},
      {q:'Nguồn tra cứu tương tác thuốc đáng tin?',o:['Dược thư Quốc gia / Micromedex','Mạng xã hội','Quảng cáo','Tin đồn'],a:0},
      {q:'Tờ HDSD thuốc KHÔNG bắt buộc mục nào?',o:['Giá khuyến mãi','Chỉ định','Liều dùng','Chống chỉ định'],a:0}]},

  hall:{emoji:'🎤',name:'Hội trường',accent:'#8b5cf6',intro:'Sự kiện, hội thảo và học tập đa người trong không gian Metaverse.',
    rooms:[{ic:'🌐',name:'Metaverse',rd:'Phòng đa người real-time (Quest/Vision Pro).',href:'/metaverse.html'},
      {ic:'🎓',name:'Hội thảo chuyên đề',rd:'SOAP Writer Studio — viết báo cáo ca thật, AI giảng viên chấm theo rubric.',href:'/duoc-soap.html'},
      {ic:'🪧',name:'Hội nghị khoa học SV',rd:'Làm & thuyết minh poster.',panel:[
        {h:'Báo cáo & poster khoa học'},
        {ul:['Poster gồm: tiêu đề – mục tiêu – phương pháp – kết quả – kết luận','Một thông điệp chính; hình/biểu đồ rõ ràng','Tập "thuyết minh poster" gọn trong 2–3 phút','Chuẩn bị trả lời câu hỏi của hội đồng']},
        {note:'Hội nghị khoa học SV là nơi tập trình bày nghiên cứu trước khi bảo vệ khoá luận.'}]}],
    skills:['Thuyết trình','Làm việc nhóm','Báo cáo khoa học'],
    quiz:[{q:'Cấu trúc trình bày ca lâm sàng phổ biến?',o:['SOAP (Subjective–Objective–Assessment–Plan)','FIFO','ABCD','PDCA'],a:0},
      {q:'Để khai thác thông tin người bệnh nên dùng?',o:['Câu hỏi mở','Câu hỏi đóng có/không','Im lặng hoàn toàn','Câu hỏi đánh đố'],a:0},
      {q:'Lắng nghe tích cực thể hiện rõ nhất qua?',o:['Tóm tắt lại ý người bệnh','Ngắt lời','Nhìn điện thoại','Nói liên tục'],a:0}]},

  lab_org:{emoji:'🧪',name:'PTN Hoá hữu cơ',accent:'#4fc3c7',intro:'Thí nghiệm hoá học: định lượng bằng chuẩn độ, an toàn phòng thí nghiệm.',
    rooms:[{ic:'⚗️',name:'Chuẩn độ acid–base',rd:'Mô phỏng buret, đường cong chuẩn độ.',href:'/L2-1-titration.html'},
      {ic:'🥽',name:'An toàn PTN',rd:'Tự kiểm PPE & quy tắc trước khi vào.',panel:[
        {h:'Checklist trước khi vào phòng thí nghiệm'},
        {check:['Đeo kính bảo hộ','Mặc áo blouse cài kín','Đeo găng tay phù hợp hoá chất','Buộc gọn tóc, bỏ trang sức lủng lẳng','Xác định vị trí vòi rửa mắt & vòi sen khẩn cấp','Đọc SDS (phiếu an toàn) của hoá chất sẽ dùng']},
        {h:'Tuyệt đối tránh'},
        {ul:['KHÔNG hút pipet bằng miệng — dùng quả bóp/propipette','KHÔNG ăn uống trong phòng thí nghiệm','KHÔNG đổ hoá chất thừa trở lại chai gốc']},
        {note:'Hoá chất bắn vào mắt → rửa ngay ≥15 phút dưới vòi rửa mắt rồi báo người phụ trách.'}]},
      {ic:'⚗️',name:'Dụng cụ cơ bản',rd:'Lật thẻ nhận biết dụng cụ.',panel:[
        {p:'Lật thẻ để nhận biết dụng cụ thí nghiệm & công dụng.'},
        {flash:[{e:'🧪',f:'Ống nghiệm',b:'Đựng & phản ứng lượng nhỏ'},
          {e:'🥃',f:'Becher (cốc có mỏ)',b:'Đong gần đúng, khuấy trộn'},
          {e:'⚗️',f:'Bình tam giác (Erlen)',b:'Chuẩn độ, lắc không bắn ra'},
          {e:'📏',f:'Bình định mức',b:'Pha dung dịch nồng độ CHÍNH XÁC'},
          {e:'💧',f:'Pipet',b:'Hút thể tích chính xác'},
          {e:'📉',f:'Buret',b:'Nhỏ giọt định lượng khi chuẩn độ'}]}]},
      {ic:'🧫',name:'Phản ứng hữu cơ',rd:'Nhóm chức & SAR.',panel:[
        {h:'Hoá hữu cơ cho dược'},
        {ul:['Nhóm chức quyết định tính chất & tác dụng của phân tử thuốc','Hay gặp: -OH (hydroxyl), -COOH (carboxyl), -NH₂ (amin)','Đồng phân quang học có thể khác hẳn tác dụng dược lý']},
        {mcq:[{q:'Vì sao cấu trúc hoá học quan trọng với thuốc?',o:['Quyết định gắn đích tác dụng & dược tính (SAR)','Chỉ để đặt tên','Không liên quan tác dụng','Chỉ ảnh hưởng màu sắc'],a:0,fb:'Quan hệ cấu trúc–tác dụng (SAR): thay đổi nhỏ cấu trúc → thay đổi tác dụng/độc tính.'}]}]},
      // Lab Hoá ảo — sandbox phản ứng đơn giản, bổ trợ ôn cơ sở
      {ic:'🧪',name:'Lab Hoá ảo (sandbox)',rd:'15 cặp phản ứng kéo thả (kết tủa, sủi khí, đổi màu, toả nhiệt) — ôn cơ sở hoá vô cơ.',href:'/lab-hoa-ao.html'}],
    skills:['Kỹ năng chuẩn độ','An toàn phòng thí nghiệm','Nhận biết dụng cụ'],
    quiz:[{q:'pH tại điểm tương đương khi chuẩn độ acid mạnh – base mạnh ≈?',o:['7','2','12','4'],a:0},
      {q:'Chỉ thị phenolphtalein chuyển màu hồng ở khoảng pH?',o:['8–10','0–1','2–4','13–14'],a:0},
      {q:'Dụng cụ đong & nhỏ chính xác thể tích khi chuẩn độ?',o:['Buret','Cốc có mỏ','Ống nghiệm','Phễu'],a:0}]},

  lab_qc:{emoji:'⚗️',name:'PTN Kiểm nghiệm',accent:'#0ea5e9',intro:'Kiểm nghiệm chất lượng thuốc: sắc ký lớp mỏng (TLC), định tính & độ tinh khiết.',
    rooms:[{ic:'🧫',name:'Sắc ký TLC 3D',rd:'6 bước chấm – chạy – soi UV – đo Rf.',href:'/sac-ky-3d.html'},
      {ic:'🖼️',name:'Sắc ký 2D',rd:'Phiên bản nhẹ trên mọi máy.',href:'/sac-ky-2d.html'},
      {ic:'🥽',name:'Sắc ký VR/XR',rd:'Vào kính Quest chạy TLC bằng tay.',href:'/sac-ky-vr-web.html'},
      {ic:'🌐',name:'Lab Metaverse',rd:'Phòng lab 3D nhiều người.',href:'/sac-ky-meta.html'},
      {ic:'🧠',name:'Quiz sắc ký',rd:'Củng cố lý thuyết TLC.',href:'/sac-ky-quiz.html'},
      {ic:'🔬',name:'Phương pháp định lượng',rd:'HPLC · UV-Vis · GC · IR.',panel:[
        {h:'Các phương pháp kiểm nghiệm hiện đại'},
        {cards:[{ic:'💧',t:'HPLC',d:'Sắc ký lỏng hiệu năng cao — định lượng hoạt chất.'},
          {ic:'🌈',t:'UV-Vis',d:'Quang phổ hấp thụ — định lượng theo độ hấp thụ.'},
          {ic:'💨',t:'GC',d:'Sắc ký khí — chất bay hơi, dung môi tồn dư.'},
          {ic:'〰️',t:'IR',d:'Hồng ngoại — định danh nhóm chức / cấu trúc.'}]},
        {note:'Mỗi phương pháp định danh/định lượng theo Dược điển; chọn theo bản chất chất phân tích.'}]},
      {ic:'✅',name:'Kiểm tra chất lượng (QC)',rd:'Checklist xuất xưởng.',panel:[
        {h:'Checklist kiểm nghiệm một lô thuốc'},
        {check:['Lấy mẫu đại diện đúng quy trình','Kiểm cảm quan (màu, mùi, hình thức)','Định tính – đúng hoạt chất','Định lượng – hàm lượng trong giới hạn','Thử độ hoà tan / độ rã','Kiểm tạp chất & giới hạn vi sinh']},
        {note:'Đạt tất cả chỉ tiêu Dược điển → lô thuốc mới được phép xuất xưởng.'}]},
      {ic:'📋',name:'Đảm bảo chất lượng (QA)',rd:'SOP & hồ sơ lô.',panel:[
        {h:'QA – Đảm bảo chất lượng'},
        {ul:['QA = hệ thống phòng ngừa lỗi (toàn quy trình); QC = kiểm tra sản phẩm','SOP – quy trình thao tác chuẩn cho từng việc','Hồ sơ lô (batch record) giúp truy xuất nguồn gốc','Đào tạo & audit định kỳ']},
        {note:'GMP nhấn mạnh: "chất lượng được thiết kế vào quy trình", không chỉ kiểm ở khâu cuối.'}]},
      {ic:'🧪',name:'Pha loãng dung dịch (tương tác)',rd:'C₁V₁=C₂V₂ — tính V₁ & dung môi, có becher minh hoạ.',href:'/dilution.html'},
      {ic:'📈',name:'Đường chuẩn UV-Vis (tương tác)',rd:'Hồi quy A–C, R², suy nồng độ mẫu thử.',href:'/calibration-curve.html'}],
    skills:['Chạy & đọc TLC','Phương pháp định lượng','QC/QA theo Dược điển'],
    quiz:[{q:'Hệ số Rf được tính bằng?',o:['Quãng đường chất / quãng đường dung môi','Quãng dung môi / quãng chất','Khối lượng / thể tích','Thời gian chạy'],a:0},
      {q:'TLC chủ yếu dùng để?',o:['Định tính & kiểm tra độ tinh khiết','Đo huyết áp','Trồng dược liệu','Tính giá thuốc'],a:0},
      {q:'Trong TLC, "pha động" là?',o:['Dung môi di chuyển kéo theo chất phân tích','Bản mỏng silica','Đèn UV','Mao quản chấm mẫu'],a:0}]},

  lab_micro:{emoji:'🦠',name:'PTN Vi sinh',accent:'#22c55e',intro:'Vi sinh – ký sinh: kỹ thuật vô khuẩn và thử kháng sinh đồ.',
    rooms:[{ic:'🧫',name:'Kháng sinh đồ (tương tác)',rd:'Đặt khoanh → ủ → đo vòng → phân loại S/I/R.',href:'/antibiogram-2d.html'},
      {ic:'🧠',name:'Quiz vi sinh',rd:'Vô khuẩn, tiệt khuẩn.',href:'/quiz.html'},
      {ic:'🧤',name:'Kỹ thuật vô khuẩn',rd:'Checklist thao tác sạch.',panel:[
        {h:'Checklist kỹ thuật vô khuẩn'},
        {check:['Rửa tay & sát khuẩn trước thao tác','Làm việc trong tủ cấy / gần ngọn lửa đèn cồn','Khử trùng que cấy trước & sau khi dùng','Mở nắp ống nghiệm gần ngọn lửa, không đặt nắp xuống bàn','Hấp tiệt trùng dụng cụ trước khi dùng (autoclave)']},
        {note:'Kỹ thuật vô khuẩn ngăn nhiễm tạp — sống còn trong nuôi cấy & pha chế vô khuẩn (thuốc tiêm).'}]}],
    skills:['Kỹ thuật vô khuẩn','Đọc kháng sinh đồ'],
    quiz:[{q:'Tiệt khuẩn bằng hơi nước bão hoà áp suất cao dùng thiết bị?',o:['Nồi hấp (autoclave)','Tủ sấy','Màng lọc','Đèn UV'],a:0},
      {q:'Vòng vô khuẩn LỚN quanh khoanh kháng sinh nghĩa là?',o:['Vi khuẩn nhạy cảm','Vi khuẩn đề kháng','Không có ý nghĩa','Đĩa bị nhiễm'],a:0},
      {q:'Môi trường rắn nuôi cấy vi khuẩn phổ biến?',o:['Thạch (agar)','Nước cất','Cồn 90°','Dầu ăn'],a:0}]},

  gmp:{emoji:'🏭',name:'Xưởng Bào chế – GMP',accent:'#9aa6b2',intro:'Bào chế thuốc và tham quan dây chuyền sản xuất đạt GMP.',
    rooms:[{ic:'🧴',name:'Hub Bào chế',rd:'Danh mục bài bào chế (cao, cồn, viên…).',href:'/bao-che-hub.html'},
      {ic:'🫙',name:'Bào chế: Cao gừng ngâm',rd:'Quy trình chiết – cô đặc.',href:'/compounding-lab.html?recipe=cao-gung-ngam'},
      {ic:'🏭',name:'Tour nhà máy GMP',rd:'Tham quan 4 phòng ISO 5/7/8/9.',href:'/PS15-gmp-factory.html'},
      {ic:'💊',name:'8 dạng bào chế',rd:'Lật thẻ nhận diện dạng thuốc.',panel:[
        {p:'Lật thẻ để ôn đặc điểm 8 dạng bào chế thường gặp.'},
        {flash:[{e:'⚪',f:'Viên nén',b:'Bột nén — phổ biến, liều chính xác, dễ bảo quản'},
          {e:'💊',f:'Viên nang',b:'Bột/lỏng trong vỏ gelatin — che vị, rã nhanh'},
          {e:'🧴',f:'Dung dịch',b:'Hoạt chất tan hoàn toàn — hấp thu nhanh'},
          {e:'🥛',f:'Hỗn dịch',b:'Hạt rắn lơ lửng — lắc kỹ trước khi dùng'},
          {e:'🧈',f:'Nhũ tương',b:'2 pha dầu/nước không trộn + chất nhũ hoá'},
          {e:'🧯',f:'Thuốc mỡ/kem',b:'Dùng ngoài da — tá dược thân dầu/nước'},
          {e:'💉',f:'Thuốc tiêm',b:'Vô khuẩn, không chí nhiệt tố — tác dụng nhanh'},
          {e:'🔵',f:'Thuốc đặt',b:'Đặt trực tràng/âm đạo — tan ở thân nhiệt'}]}]},
      {ic:'🧬',name:'Sinh dược học',rd:'Dạng bào chế ↔ sinh khả dụng.',panel:[
        {h:'Sinh dược học (Biopharmaceutics)'},
        {ul:['Nghiên cứu ảnh hưởng của dạng bào chế tới hấp thu & sinh khả dụng','Tốc độ rã & hoà tan ảnh hưởng tốc độ hấp thu','Tương đương sinh học (bioequivalence) giữa thuốc gốc & generic','Hệ phân loại BCS theo độ tan & tính thấm']},
        {note:'Cùng hoạt chất nhưng khác dạng/tá dược có thể khác sinh khả dụng → khác hiệu quả điều trị.'}]}],
    skills:['Quy trình bào chế','Phân biệt 8 dạng thuốc','5 nguyên tắc GMP'],
    quiz:[{q:'GMP là viết tắt của?',o:['Good Manufacturing Practice','Global Medicine Plan','General Medical Product','Good Marketing Plan'],a:0},
      {q:'"Cao thuốc" là dạng bào chế?',o:['Cô đặc dịch chiết dược liệu','Viên nén','Dung dịch tiêm','Thuốc khí dung'],a:0},
      {q:'Phòng sạch ISO 5 so với ISO 8 thì?',o:['Sạch hơn (ít hạt bụi hơn)','Bẩn hơn','Như nhau','Không liên quan'],a:0}]},

  clinpharm:{emoji:'💉',name:'Dược lý – Lâm sàng',accent:'#ec4899',intro:'Cơ chế tác dụng thuốc, tương tác thuốc và tư duy ca lâm sàng.',
    rooms:[{ic:'⚠️',name:'Tương tác thuốc',rd:'Phát hiện & xử trí tương tác.',href:'/L3-3-tuong-tac.html'},
      {ic:'🩺',name:'Ca lâm sàng',rd:'Phân tích bệnh án theo SOAP.',panel:[
        {h:'Khung phân tích SOAP'},
        {ul:['S (Subjective): triệu chứng & lời kể người bệnh','O (Objective): dấu hiệu, xét nghiệm, thuốc đang dùng','A (Assessment): xác định vấn đề liên quan dùng thuốc (DRP)','P (Plan): đề xuất can thiệp & theo dõi']},
        {h:'Ca mẫu — phân tích thử'},
        {cards:[{ic:'🗣️',t:'S',d:'Nam 60t, ĐTĐ type 2, than mệt, hay quên uống thuốc.'},
          {ic:'📋',t:'O',d:'HbA1c 9%; metformin 850mg×2; mới thêm thuốc cảm chứa pseudoephedrine.'},
          {ic:'🔎',t:'A',d:'Kiểm soát đường huyết kém + nguy cơ tăng HA/đường do pseudoephedrine.'},
          {ic:'✅',t:'P',d:'Tư vấn tuân thủ, cân nhắc đổi thuốc cảm, hẹn tái khám & theo dõi HbA1c.'}]},
        {note:'DRP = Drug-Related Problem: vấn đề liên quan đến thuốc mà dược sĩ cần phát hiện & giải quyết.'}]},
      {ic:'🧬',name:'Cơ chế tác dụng',rd:'Lật thẻ nhóm thuốc → cơ chế.',panel:[
        {p:'Lật thẻ để ôn cơ chế tác dụng các nhóm thuốc thường gặp.'},
        {flash:[{e:'🅱️',f:'Chẹn beta (-olol)',b:'Chặn thụ thể β → giảm nhịp tim, hạ HA'},
          {e:'💧',f:'Lợi tiểu thiazid',b:'Giảm tái hấp thu Na⁺ ống lượn xa → lợi tiểu, hạ HA'},
          {e:'🧊',f:'Ức chế bơm proton (-prazol)',b:'Ức chế H⁺/K⁺-ATPase → giảm tiết acid dạ dày'},
          {e:'🩸',f:'Ức chế men chuyển (-pril)',b:'Giảm Angiotensin II → giãn mạch, hạ HA'},
          {e:'🦠',f:'Beta-lactam',b:'Ức chế tổng hợp vách tế bào vi khuẩn'},
          {e:'🧠',f:'SSRI',b:'Ức chế tái hấp thu serotonin → chống trầm cảm'}]}]},
      {ic:'🔎',name:'Đọc đơn & phát hiện DRP',rd:'Soi đơn tìm vấn đề dùng thuốc.',panel:[
        {h:'Phát hiện vấn đề trên đơn'},
        {mcq:[{q:'Đơn kê amoxicillin cho BN ghi rõ "dị ứng penicillin". DRP loại gì?',o:['Chống chỉ định / dị ứng — can thiệp NGAY','Liều quá thấp','Trùng thuốc','Không có vấn đề'],a:0,fb:'Amoxicillin là penicillin → chống chỉ định ở BN dị ứng penicillin. Dược sĩ phải báo bác sĩ đổi thuốc.'},
          {q:'Đơn có 2 NSAID cùng lúc (ibuprofen + diclofenac). DRP?',o:['Trùng nhóm → tăng nguy cơ loét dạ dày, độc thận','Tốt, tăng hiệu quả','Không sao','Thiếu thuốc'],a:0,fb:'Phối 2 NSAID chỉ tăng độc tính (dạ dày, thận), không tăng lợi ích → nên dùng 1.'}]}]},
      {ic:'📈',name:'TDM – Theo dõi nồng độ',rd:'Thuốc khoảng điều trị hẹp.',panel:[
        {h:'TDM – Theo dõi nồng độ thuốc trong máu'},
        {ul:['Áp dụng cho thuốc "khoảng điều trị hẹp": vancomycin, digoxin, phenytoin, lithium, aminoglycosid','Lấy mẫu đúng thời điểm (nồng độ đáy/đỉnh)','Hiệu chỉnh liều theo nồng độ + đáp ứng lâm sàng']},
        {note:'Ví dụ: vancomycin theo dõi nồng độ đáy để vừa đủ hiệu quả vừa tránh độc thận.'}]},
      {ic:'🔬',name:'Dược động học (PK)',rd:'ADME & các thông số.',panel:[
        {h:'Dược động học – ADME'},
        {cards:[{ic:'🟢',t:'A – Hấp thu',d:'Thuốc vào tuần hoàn (sinh khả dụng F).'},
          {ic:'🔵',t:'D – Phân bố',d:'Tới mô đích (thể tích phân bố Vd).'},
          {ic:'🟠',t:'M – Chuyển hoá',d:'Chủ yếu ở gan (enzyme CYP450).'},
          {ic:'🔴',t:'E – Thải trừ',d:'Qua thận/mật (độ thanh thải Cl, t½).'}]},
        {note:'t½ (bán thải) quyết định khoảng cách liều; suy gan/thận → cần chỉnh liều.'}]},
      {ic:'📈',name:'Đường cong PK/TDM (tương tác)',rd:'Chỉnh liều/khoảng cách → xem nồng độ & cửa sổ điều trị.',href:'/pk-curve.html'}],
    skills:['Phát hiện tương tác & DRP','Tư duy lâm sàng (SOAP)','Hiểu PK & TDM'],
    quiz:[{q:'Phối hợp Warfarin + Aspirin làm tăng nguy cơ?',o:['Chảy máu','Tăng huyết áp','Táo bón','Buồn ngủ'],a:0},
      {q:'Tương tác làm GIẢM tác dụng của nhau gọi là?',o:['Đối kháng','Hiệp đồng','Cộng tính','Dung nạp'],a:0},
      {q:'Thuốc "khoảng điều trị hẹp" (vd warfarin) đòi hỏi?',o:['Theo dõi nồng độ/đáp ứng chặt chẽ','Dùng tuỳ ý','Không cần theo dõi','Tăng liều liên tục'],a:0}]},

  garden:{emoji:'🌿',name:'Vườn dược liệu',accent:'#5bbd7c',intro:'Nhận diện cây thuốc, bộ phận dùng và công dụng.',
    rooms:[{ic:'🌳',name:'Vườn 3D (đi dạo & khám phá)',rd:'Bấm vào cây xem bộ phận dùng & công dụng · có đố vui.',href:'/herb-garden-3d.html'},
      {ic:'🌱',name:'Nhận diện dược liệu',rd:'Lật thẻ ôn bộ phận dùng + công dụng.',panel:[
        {p:'Lật từng thẻ để ôn BỘ PHẬN DÙNG & CÔNG DỤNG của 6 dược liệu quen thuộc.'},
        {flash:[{e:'🫚',f:'Gừng',b:'Thân rễ — ấm bụng, chống nôn'},
          {e:'🌿',f:'Bạc hà',b:'Lá — giải cảm, sát khuẩn họng'},
          {e:'🍵',f:'Cam thảo',b:'Rễ — giảm ho, điều vị, giải độc'},
          {e:'🌺',f:'Nhân sâm',b:'Rễ — bồi bổ khí'},
          {e:'🌼',f:'Cúc hoa',b:'Hoa — mát gan, sáng mắt'},
          {e:'🍃',f:'Diếp cá',b:'Lá — kháng khuẩn, lợi tiểu'}]},
        {note:'Nguyên tắc: dùng đúng bộ phận, đúng liều — sai bộ phận có thể giảm hiệu lực hoặc gây độc.'}]},
      {ic:'🧠',name:'Quiz dược liệu',rd:'Công dụng & bộ phận dùng.',href:'/quiz.html'},
      {ic:'🔬',name:'Hoạt chất dược liệu',rd:'Nhóm hoạt chất tự nhiên.',panel:[
        {h:'Các nhóm hoạt chất chính'},
        {cards:[{ic:'💊',t:'Alkaloid',d:'VD morphin, quinin — tác dụng mạnh, độc tính cao.'},
          {ic:'❤️',t:'Glycosid tim',d:'VD digoxin (digitalis) — trợ tim, khoảng điều trị hẹp.'},
          {ic:'🌼',t:'Flavonoid',d:'Chống oxy hoá, bền thành mạch (rutin).'},
          {ic:'🌿',t:'Tinh dầu',d:'Bay hơi, kháng khuẩn (bạc hà, tràm).'}]},
        {note:'Cùng một cây có thể chứa nhiều nhóm hoạt chất — chiết tách & định lượng theo Dược điển.'}]},
      {ic:'☯️',name:'Y học cổ truyền',rd:'Tứ khí – ngũ vị, phối ngũ.',panel:[
        {h:'Y học cổ truyền & Đông dược'},
        {ul:['Tứ khí: hàn – lương – ôn – nhiệt (tính của vị thuốc)','Ngũ vị: toan – khổ – cam – tân – hàm','Phối ngũ: quân – thần – tá – sứ trong một bài thuốc','Kết hợp Đông – Tây y cần thận trọng tương tác']},
        {note:'Đông dược vẫn cần kiểm soát chất lượng & cảnh giác tương tác với tân dược.'}]}],
    skills:['Nhận diện dược liệu','Biết hoạt chất & nhóm','Hiểu YHCT cơ bản'],
    quiz:[{q:'Gừng (Zingiber officinale) thường dùng để?',o:['Chống nôn, ấm bụng','Hạ sốt mạnh','Gây mê','Lợi tiểu mạnh'],a:0},
      {q:'Bộ phận dùng chính của Nhân sâm?',o:['Rễ','Lá','Hoa','Vỏ thân'],a:0},
      {q:'Cam thảo thường được dùng để?',o:['Giảm ho, điều vị, giải độc','Gây mê','Hạ sốt mạnh','Lợi tiểu mạnh'],a:0}]},

  clinic:{emoji:'🏥',name:'BV Thực hành',accent:'#6aa0d6',intro:'Bệnh viện thực hành — đi vào từng khoa, phân tích ca thật và ra quyết định dùng thuốc.',
    rooms:[{ic:'🚑',name:'Cấp cứu (ER)',rd:'Mô phỏng 3D sốc phản vệ — ADRENALIN, BYT 51/2017.',href:'/PS01-er.html'},
      {ic:'🫀',name:'ICU – Hồi sức',rd:'Vận mạch & truyền tĩnh mạch an toàn.',panel:[
        {h:'Tình huống ICU'},{p:'Bệnh nhân nặng, nhiều thuốc truyền đồng thời — ra quyết định:'},
        {mcq:[{q:'Sốc nhiễm khuẩn, tụt HA dù đã bù đủ dịch. Vận mạch đầu tay?',o:['Noradrenalin (norepinephrine)','Dopamin liều thấp','Dobutamin đơn độc','Adrenalin khí dung'],a:0,fb:'Noradrenalin là vận mạch đầu tay trong sốc nhiễm khuẩn (Surviving Sepsis).'},
          {q:'Truyền kali (KCl) tĩnh mạch sao cho an toàn?',o:['Pha loãng, truyền chậm qua bơm tiêm điện, theo dõi tim','Tiêm bolus nhanh tĩnh mạch','Không cần theo dõi','Trộn chung mọi dịch'],a:0,fb:'KCl bolus nhanh có thể gây ngừng tim — luôn pha loãng & truyền chậm có kiểm soát.'}]},
        {note:'Dược sĩ ICU rà tương kỵ khi pha truyền & chỉnh liều theo chức năng gan/thận.'}]},
      {ic:'🩺',name:'Khoa Nội – Tim mạch',rd:'Warfarin/INR, statin, thuốc tim mạch.',panel:[
        {h:'Ca nội – tim mạch'},
        {mcq:[{q:'BN dùng warfarin, INR = 5.0 nhưng KHÔNG chảy máu. Xử trí hợp lý?',o:['Tạm ngừng warfarin, theo dõi, cân nhắc vitamin K liều thấp','Tăng liều warfarin','Tiêm heparin liều cao','Bỏ qua — INR 5 là bình thường'],a:0,fb:'INR đích thường 2–3. INR cao + chưa chảy máu: tạm ngừng & theo dõi, vitamin K liều thấp nếu cần.'},
          {q:'Simvastatin (tác dụng ngắn) uống thời điểm nào tối ưu?',o:['Buổi tối','Sáng sớm lúc đói','Trước khi tập thể dục','Bất kỳ, không ảnh hưởng'],a:0,fb:'Tổng hợp cholesterol nội sinh tăng về đêm → statin tác dụng ngắn uống tối hiệu quả hơn.'}]},
        {note:'Theo dõi INR định kỳ; cảnh giác tương tác warfarin với kháng sinh, NSAID.'}]},
      {ic:'🧸',name:'Khoa Nhi',rd:'Tính liều theo cân nặng (mg/kg).',panel:[
        {h:'Ca nhi khoa'},
        {mcq:[{q:'Trẻ 15 kg, paracetamol 15 mg/kg/lần. Liều mỗi lần?',o:['225 mg','15 mg','1500 mg','75 mg'],a:0,fb:'15 mg/kg × 15 kg = 225 mg/lần; cách ≥4–6 giờ, tối đa 4 lần/ngày.'},
          {q:'Vì sao đặc biệt thận trọng khi dùng thuốc cho trẻ?',o:['Gan/thận chưa trưởng thành, liều theo cân nặng/tuổi','Trẻ là người lớn thu nhỏ','Trẻ không hấp thu thuốc','Không cần chỉnh liều'],a:0,fb:'Dược động học ở trẻ khác người lớn — luôn tính liều theo cân nặng/tuổi & chọn dạng phù hợp.'}]},
        {note:'Ưu tiên dạng lỏng/giọt cho trẻ nhỏ; kiểm tra nồng độ chế phẩm trước khi tính thể tích.'}]},
      {ic:'🤰',name:'Khoa Sản – Phụ khoa',rd:'Thuốc & thai kỳ, chống chỉ định.',panel:[
        {h:'Ca sản – phụ khoa'},
        {mcq:[{q:'Thuốc nào CHỐNG CHỈ ĐỊNH ở phụ nữ có thai (gây quái thai)?',o:['Isotretinoin','Paracetamol','Insulin','Amoxicillin'],a:0,fb:'Isotretinoin (trị mụn) gây quái thai nặng — tuyệt đối tránh khi mang thai.'},
          {q:'Thai phụ bị cảm, đòi mua kháng sinh. Tư vấn đúng?',o:['Khai thác triệu chứng, khuyên khám, tránh thuốc chưa rõ an toàn','Bán ngay kháng sinh mạnh','Bán thuốc bất kỳ không kê đơn','Từ chối, không tư vấn'],a:0,fb:'Cảm thường do virus — kháng sinh không cần thiết; ưu tiên an toàn thai kỳ & hướng dẫn khám.'}]},
        {note:'Khi cấp phát cho thai phụ/cho con bú: luôn tra phân loại an toàn & ưu tiên thuốc đã có dữ liệu.'}]},
      {ic:'🧪',name:'Khoa Ung bướu – Hoá trị',rd:'An toàn pha & xử lý thuốc độc tế bào.',panel:[
        {h:'An toàn hoá trị'},
        {mcq:[{q:'Pha thuốc độc tế bào (hoá trị) cần bảo hộ gì?',o:['Tủ an toàn sinh học (BSC) + găng đôi + áo chống thấm','Chỉ khẩu trang vải','Pha trên bàn thường','Không cần bảo hộ'],a:0,fb:'Thuốc gây độc tế bào phải pha trong tủ an toàn sinh học với PPE đầy đủ để tránh phơi nhiễm.'},
          {q:'Thuốc hoá trị đổ ra ngoài (spill), xử trí?',o:['Dùng bộ xử lý spill chuyên dụng theo quy trình','Lau khăn giấy, vứt sọt thường','Để bay hơi tự nhiên','Rửa bằng thật nhiều nước'],a:0,fb:'Phải dùng spill kit & quy trình chất độc tế bào; chất thải bỏ thùng nguy hại.'}]},
        {note:'Thải bỏ vật tư hoá trị theo chất thải nguy hại; liều thường theo diện tích da (BSA).'}]},
      {ic:'🦟',name:'Khoa Truyền nhiễm',rd:'HIV/lao — phác đồ & tuân thủ.',panel:[
        {h:'Ca truyền nhiễm'},
        {mcq:[{q:'Nguyên tắc cốt lõi điều trị lao để tránh kháng thuốc?',o:['Phối hợp nhiều thuốc, đủ liều, đủ thời gian, tuân thủ (DOTS)','Một thuốc, ngắn ngày','Ngừng khi hết triệu chứng','Đổi thuốc liên tục'],a:0,fb:'Lao cần phác đồ phối hợp đủ liều/thời gian; DOTS giúp tuân thủ, tránh lao kháng thuốc.'},
          {q:'Thuốc ARV trong HIV cần dùng thế nào?',o:['Đều đặn suốt đời, tuân thủ cao giữ tải lượng dưới ngưỡng','Khi nào nhớ thì uống','Ngừng khi thấy khoẻ','Chỉ uống lúc ốm'],a:0,fb:'Tuân thủ ARV cao giữ tải lượng virus thấp (U=U) — giảm kháng thuốc & lây truyền.'}]},
        {note:'Dược sĩ tư vấn tuân thủ & sàng lọc tương tác (vd rifampicin cảm ứng CYP mạnh).'}]},
      {ic:'🧮',name:'Máy tính liều Nhi (tương tác)',rd:'Theo cân nặng → liều & thể tích siro; có tự kiểm tra.',href:'/pediatric-dose.html'},
      {ic:'💧',name:'Tốc độ truyền dịch (tương tác)',rd:'Tính mL/h & giọt/phút; buồng đếm giọt động.',href:'/iv-infusion.html'}],
    skills:['Xử trí cấp cứu','Dược lâm sàng theo khoa','An toàn thuốc & liều đặc biệt'],
    quiz:[{q:'Thuốc ĐẦU TAY trong sốc phản vệ?',o:['Adrenalin (epinephrine) tiêm bắp','Paracetamol','Vitamin C','Kháng sinh'],a:0},
      {q:'Liều Adrenalin người lớn tiêm bắp (BYT 51/2017)?',o:['0,5 mg (½ ống 1mg/1ml)','5 mg','50 mg','0,01 mg'],a:0},
      {q:'Sau tiêm Adrenalin xử trí phản vệ, cần?',o:['Theo dõi sát, có thể nhắc lại sau 5–15 phút','Cho về ngay','Ngừng theo dõi','Cho ăn uống'],a:0}]},

  gpp:{emoji:'💊',name:'Nhà thuốc GPP',accent:'#16a34a',intro:'Quầy thuốc đạt chuẩn GPP — sắp xếp, cấp phát đúng, tư vấn OTC và sàng lọc cờ đỏ.',
    rooms:[{ic:'🏪',name:'Nhà thuốc 3D đầy đủ (Pharmacy-AI port)',rd:'Vào quầy ảo: 180 thuốc, 4 tủ Rx/OTC + tủ kiểm soát đặc biệt, POS, dán nhãn HDSD, tư vấn AI theo SEGUE.',href:'/nha-thuoc-3d.html'},
      {ic:'🧪',name:'Thực hành nghiệp vụ GPP (2D)',rd:'Mô phỏng 2D 4 nghiệp vụ chuẩn GPP: nhận biết & phân loại, kiểm nhập, bảo quản – sắp xếp, kiểm kê & thu hồi. Chấm theo bảng kiểm, trò chơi ôn dược lý, tình huống AI. Đề tài NCKH CĐ Y tế HN.',href:'/gpp.html'},
      {ic:'🗂️',name:'Sắp xếp thuốc ATC',rd:'Phân loại & xếp kệ.',href:'/sap-xep-hub.html'},
      {ic:'🕹️',name:'Arcade 2D',rd:'Luyện tốc độ phân loại.',href:'/2d-arcade.html'},
      {ic:'🧊',name:'Kệ thuốc 3D',rd:'Sắp xếp trong không gian 3D.',href:'/3d-shelf.html'},
      {ic:'💬',name:'Tư vấn OTC',rd:'Bán thuốc không kê đơn an toàn.',panel:[
        {h:'Quầy tư vấn OTC'},{p:'Khách tới hỏi mua thuốc — bạn tư vấn:'},
        {mcq:[{q:'Khách ho khan 2 ngày, không sốt. Tư vấn hợp lý?',o:['Thuốc giảm ho + theo dõi, khám nếu kéo dài >1 tuần/khó thở','Bán kháng sinh ngay','Corticoid liều cao','Không tư vấn gì'],a:0,fb:'Ho cấp thường tự khỏi; OTC giảm triệu chứng + dặn cờ đỏ. Kháng sinh không trị ho do virus.'},
          {q:'Khách đòi kháng sinh trị tiêu chảy thường (không sốt, không máu)?',o:['Bù nước–điện giải (ORS), theo dõi, không cần kháng sinh','Bán kháng sinh ngay','Thuốc cầm tiêu chảy liều cao cho trẻ nhỏ','Nhịn ăn uống hoàn toàn'],a:0,fb:'Tiêu chảy cấp thường do virus → ORS là chính; kháng sinh chỉ khi có chỉ định.'},
          {q:'Dấu hiệu CỜ ĐỎ cần chuyển khám ngay?',o:['Đau ngực, khó thở, sốt cao kéo dài, triệu chứng thần kinh','Hắt hơi nhẹ','Ngứa mũi thoáng qua','Mệt nhẹ sau thức khuya'],a:0,fb:'Cờ đỏ (red flags) → ngừng tự điều trị, chuyển khám bác sĩ.'}]}]},
      {ic:'📝',name:'Cấp phát thuốc kê đơn (Rx)',rd:'Quy trình 6 bước an toàn.',panel:[
        {h:'Checklist cấp phát đơn thuốc'},
        {check:['Kiểm tra đơn hợp lệ (tên, tuổi BN, chữ ký bác sĩ)','Đối chiếu thuốc – hàm lượng – số lượng','Rà tương tác & chống chỉ định','Dán nhãn & ghi rõ cách dùng','Tư vấn bảo quản & tác dụng phụ thường gặp','Ghi sổ thuốc kê đơn theo quy định']},
        {note:'Thuốc kê đơn (Rx) chỉ bán khi có đơn hợp lệ; kháng sinh không bán tự do.'}]},
      {ic:'🩸',name:'Đo HA & đường huyết',rd:'Dịch vụ sàng lọc tại nhà thuốc.',panel:[
        {h:'Quy trình đo huyết áp đúng'},
        {ol:['Cho khách nghỉ 5 phút, ngồi tựa lưng, chân chạm đất','Quấn băng đo ngang tim, không nói chuyện khi đo','Đo 2 lần cách 1–2 phút rồi lấy trung bình','Ghi lại kết quả & so với ngưỡng']},
        {note:'HA ≥140/90 mmHg nhiều lần → khuyên khám. Đường huyết đói ≥126 mg/dL (7.0 mmol/L) gợi ý đái tháo đường, cần xác nhận y tế.'}]},
      {ic:'🚭',name:'Tư vấn cai thuốc lá',rd:'Mô hình 5A.',panel:[
        {h:'Mô hình 5A cai thuốc lá'},
        {ul:['Ask – Hỏi về thói quen hút thuốc','Advise – Khuyên bỏ thuốc rõ ràng','Assess – Đánh giá mức sẵn sàng bỏ','Assist – Hỗ trợ (NRT, tư vấn hành vi)','Arrange – Hẹn theo dõi']},
        {note:'Liệu pháp thay thế nicotine (NRT) + tư vấn hành vi tăng rõ tỉ lệ cai thành công.'}]},
      {ic:'🩺',name:'Đo huyết áp (tương tác)',rd:'Bơm – xả – nghe Korotkoff – đọc & phân loại HA.',href:'/bp-measure.html'},
      {ic:'💊',name:'Cấp phát thuốc (tương tác)',rd:'Đếm đúng số viên + kiểm 5 Đúng, bắt lỗi nhãn.',href:'/dispense.html'}],
    skills:['Sắp xếp thuốc theo ATC','Cấp phát & tư vấn GPP','Sàng lọc cờ đỏ → chuyển khám'],
    quiz:[{q:'GPP là viết tắt của?',o:['Good Pharmacy Practice','Global Product Plan','General Pharma Price','Good People Project'],a:0},
      {q:'Bán thuốc kê đơn (Rx) bắt buộc phải có?',o:['Đơn thuốc hợp lệ','Chỉ cần tiền','Quảng cáo','Lời giới thiệu'],a:0},
      {q:'Thuốc cần bảo quản lạnh 2–8°C, ví dụ?',o:['Vaccine, insulin','Paracetamol viên','Than hoạt','Oresol gói'],a:0}]},

  sim:{emoji:'🎭',name:'TT Mô phỏng – OSCE',accent:'#f59e0b',intro:'Mô phỏng kỹ năng lâm sàng & giao tiếp dược – bệnh nhân: thi OSCE, đóng vai, sơ cấp cứu.',
    rooms:[{ic:'🏆',name:'OSCE Championship',rd:'10 trạm, timer, chứng chỉ.',href:'/GC07-osce-championship.html'},
      {ic:'🌐',name:'Phòng học chung (Metaverse)',rd:'Tình huống đa người real-time.',href:'/metaverse.html'},
      {ic:'🗣️',name:'Khung giao tiếp SEGUE',rd:'5 bước hội thoại dược – bệnh nhân.',panel:[
        {h:'Khung SEGUE đánh giá giao tiếp'},
        {cards:[{ic:'🎬',t:'S – Set the stage',d:'Chào hỏi, tạo bối cảnh, đảm bảo riêng tư.'},
          {ic:'❓',t:'E – Elicit',d:'Khai thác thông tin bằng câu hỏi mở.'},
          {ic:'💬',t:'G – Give',d:'Cung cấp thông tin rõ ràng, dễ hiểu.'},
          {ic:'🤝',t:'U – Understand',d:'Thấu hiểu góc nhìn & lo lắng người bệnh.'},
          {ic:'✅',t:'E – End',d:'Tóm tắt, kiểm tra hiểu, hẹn theo dõi.'}]},
        {note:'Bản mô phỏng hội thoại AI NPC (SEGUE AI Sim) đang được triển khai — sẽ chấm điểm tự động thang 100đ.'}]},
      {ic:'🧑‍⚕️',name:'Đóng vai AI Patient',rd:'Luyện hội thoại tư vấn.',panel:[
        {h:'Tình huống đóng vai'},
        {mcq:[{q:'Người bệnh lo lắng tác dụng phụ của statin. Câu mở đầu tốt nhất?',o:['"Anh/chị đang lo lắng điều gì về thuốc ạ?" (câu hỏi mở)','"Thuốc này không sao đâu."','"Cứ uống đi, đừng hỏi nhiều."','Im lặng đưa thuốc'],a:0,fb:'Câu hỏi mở + lắng nghe giúp khai thác mối lo thật sự (bước Elicit của SEGUE).'},
          {q:'Khi hướng dẫn cách dùng thuốc, nên?',o:['Dùng từ đơn giản, kiểm tra lại bằng teach-back','Dùng nhiều thuật ngữ y khoa','Nói thật nhanh cho xong','Chỉ đưa tờ HDSD, không nói'],a:0,fb:'Teach-back (yêu cầu người bệnh nhắc lại) xác nhận họ hiểu đúng cách dùng.'}]}]},
      {ic:'❤️',name:'Sơ cấp cứu CPR / AED',rd:'Hồi sinh tim phổi cơ bản.',panel:[
        {h:'Các bước CPR người lớn'},
        {ol:['Kiểm tra an toàn hiện trường & đáp ứng nạn nhân','Gọi 115 & lấy AED','Ép tim 30 lần (giữa ngực, sâu 5–6 cm)','Thổi ngạt 2 lần','Gắn AED & làm theo hướng dẫn, tiếp tục CPR']},
        {mcq:[{q:'Tần số ép tim CPR người lớn khuyến cáo?',o:['100–120 lần/phút','40–60 lần/phút','150–180 lần/phút','Càng nhanh càng tốt'],a:0,fb:'Hướng dẫn AHA: ép 100–120 lần/phút, sâu 5–6 cm, để ngực nảy hoàn toàn.'}]}]}],
    skills:['Giao tiếp dược – bệnh nhân (SEGUE)','Kỹ năng OSCE','Sơ cấp cứu CPR/AED'],
    quiz:[{q:'Khung SEGUE dùng để đánh giá?',o:['Kỹ năng giao tiếp y khoa','Phản ứng hoá học','Sổ sách kế toán','Kỹ thuật trồng trọt'],a:0},
      {q:'Chữ "S" đầu của SEGUE nghĩa là?',o:['Set the stage – chuẩn bị bối cảnh','Stop','Sample','Sell'],a:0},
      {q:'OSCE đánh giá điều gì?',o:['Kỹ năng thực hành lâm sàng theo trạm','Chỉ lý thuyết','Ngoại hình','Tốc độ gõ phím'],a:0}]},

  canteen:{emoji:'🍜',name:'Căng tin',accent:'#fb7185',intro:'Nghỉ ngơi, nạp năng lượng và thư giãn giữa các giờ học.',
    rooms:[{ic:'⏱️',name:'Time Attack',rd:'Mini-game ôn nhanh, giải trí.',href:'/time-attack.html'},
      {ic:'☕',name:'Góc thư giãn',rd:'Mẹo học hiệu quả & giữ sức.',panel:[
        {h:'Mẹo học hiệu quả'},
        {ul:['Lặp lại ngắt quãng (spaced repetition) để nhớ lâu','Pomodoro: 25\' học – 5\' nghỉ','Ngủ đủ 7–8 giờ để củng cố trí nhớ','Uống đủ nước, vận động nhẹ giữa giờ']},
        {note:'Học đều mỗi ngày hiệu quả hơn nhiều so với học dồn sát ngày thi.'}]},
      {ic:'🥗',name:'Dinh dưỡng & sức khoẻ',rd:'Tự chăm sóc mùa thi.',panel:[
        {h:'Giữ sức khoẻ mùa thi'},
        {ul:['Ăn đủ bữa; hạn chế lạm dụng caffeine / nước tăng lực','Uống đủ nước, ngủ đủ giấc','Nghỉ mắt theo quy tắc 20–20–20 khi học màn hình','Vận động nhẹ giữa giờ để tỉnh táo']},
        {mcq:[{q:'Lạm dụng nước tăng lực để thức học khuya có thể gây?',o:['Mất ngủ, tim đập nhanh, lo âu','Tăng trí nhớ vĩnh viễn','Hoàn toàn không hại','Chữa được bệnh'],a:0,fb:'Caffeine liều cao gây mất ngủ, hồi hộp; nên ngủ đủ thay vì lạm dụng chất kích thích.'}]},
        {note:'Dược sĩ tương lai cũng cần biết tự chăm sóc & tư vấn lối sống lành mạnh cho người bệnh.'}]}],
    skills:['Cân bằng học tập – nghỉ ngơi','Tự chăm sóc sức khoẻ'],
    quiz:[{q:'Phương pháp học giúp nhớ lâu nhất?',o:['Lặp lại ngắt quãng (spaced repetition)','Học dồn 1 đêm','Đọc lướt 1 lần','Chép phạt'],a:0},
      {q:'Kỹ thuật Pomodoro chia thời gian?',o:['25 phút học – 5 phút nghỉ','3 giờ học liền','Không nghỉ','Ngủ 25 phút'],a:0},
      {q:'Ngủ đủ giấc giúp?',o:['Củng cố trí nhớ dài hạn','Quên nhanh hơn','Giảm tập trung','Không ảnh hưởng'],a:0}]},

  dorm:{emoji:'🛏️',name:'Ký túc xá',accent:'#e7b98f',intro:'Không gian cá nhân: theo dõi hồ sơ, tiến độ, huy hiệu và đặt mục tiêu.',
    rooms:[{ic:'🏅',name:'Hồ sơ & huy hiệu',rd:'Sao, coin, streak, huy hiệu.',content:'Xem thành tích cá nhân: số sao mỗi module, coin, chuỗi ngày học (streak) và huy hiệu đạt được. Mở trang chủ để xem đầy đủ.',href:'/'},
      {ic:'🎯',name:'Mục tiêu học tập',rd:'Đặt & lưu mục tiêu tuần.',panel:[
        {h:'Đặt mục tiêu theo nguyên tắc SMART'},
        {p:'Cụ thể – Đo được – Khả thi – Liên quan – Có thời hạn. Ví dụ: "Hoàn thành 3 module bào chế trong tuần này".'},
        {goal:true},
        {note:'Duy trì streak (chuỗi ngày học) để nhận thưởng coin & huy hiệu.'}]},
      {ic:'🧭',name:'Hướng nghiệp ngành Dược',rd:'Các con đường sự nghiệp.',panel:[
        {h:'Một bằng Dược — nhiều hướng đi'},
        {cards:[{ic:'🏥',t:'Dược lâm sàng BV',d:'Tư vấn dùng thuốc tại bệnh viện.'},
          {ic:'🏪',t:'Nhà thuốc cộng đồng',d:'Quản lý & tư vấn tại nhà thuốc.'},
          {ic:'🏭',t:'Công nghiệp dược',d:'Sản xuất, R&D, đảm bảo chất lượng.'},
          {ic:'🎓',t:'Học thuật – Giảng viên',d:'Giảng dạy & nghiên cứu.'},
          {ic:'📋',t:'Quản lý / Đăng ký (RA)',d:'Pháp chế, đăng ký thuốc tại DAV.'},
          {ic:'🌿',t:'Y học cổ truyền',d:'Đông dược & kết hợp Đông–Tây y.'}]},
        {note:'Chọn hướng theo thế mạnh & sở thích của bạn — và đặt mục tiêu học phù hợp.'}]}],
    skills:['Tự quản lý học tập','Duy trì động lực','Định hướng nghề nghiệp'],
    quiz:[{q:'Cách học hiệu quả & bền vững?',o:['Đều đặn mỗi ngày + nghỉ hợp lý','Thức trắng ôn thi','Bỏ bữa để học','Chỉ học sát ngày thi'],a:0},
      {q:'Chuỗi ngày học (streak) khuyến khích thói quen?',o:['Học đều mỗi ngày','Học 1 lần/tháng','Bỏ học','Học ngẫu nhiên'],a:0},
      {q:'Đặt mục tiêu hiệu quả theo nguyên tắc?',o:['SMART (cụ thể, đo được, khả thi, liên quan, có hạn)','Càng mơ hồ càng tốt','Càng nhiều càng tốt','Không cần đo lường'],a:0}]},

  museum:{emoji:'🏺',name:'Bảo tàng Dược',accent:'#d97706',intro:'Lịch sử ngành Dược và những danh nhân dược học Việt Nam.',
    rooms:[{ic:'🏛️',name:'Lịch sử ngành Dược',rd:'Dòng thời gian & cột mốc.',panel:[
        {h:'Dòng thời gian ngành Dược Việt Nam'},
        {timeline:[{t:'Y học cổ truyền',d:'Tuệ Tĩnh nêu tư tưởng "Nam dược trị Nam nhân"; Hải Thượng Lãn Ông để lại "Hải Thượng Y tông tâm lĩnh".'},
          {t:'Cận đại',d:'Hình thành hệ thống đào tạo Dược chính quy.'},
          {t:'GS. Đỗ Tất Lợi',d:'Công trình "Những cây thuốc và vị thuốc Việt Nam" — nền tảng dược liệu học nước nhà.'},
          {t:'Dược điển Việt Nam',d:'Bộ Y tế chuẩn hoá tiêu chuẩn chất lượng thuốc & dược liệu.'},
          {t:'Ngày nay',d:'Kết hợp dược hiện đại + y học cổ truyền, vận hành theo chuẩn GMP/GPP.'}]}]},
      {ic:'👤',name:'Danh nhân dược học',rd:'Đóng góp tiêu biểu.',panel:[
        {h:'Những tên tuổi đặt nền móng'},
        {cards:[{ic:'🌿',t:'Tuệ Tĩnh',d:'Ông tổ thuốc Nam — "Nam dược trị Nam nhân".'},
          {ic:'📜',t:'Hải Thượng Lãn Ông',d:'Đại danh y, tác giả "Y tông tâm lĩnh".'},
          {ic:'📖',t:'GS. Đỗ Tất Lợi',d:'Nhà dược liệu học hàng đầu, công trình cây thuốc VN.'}]},
        {p:'Cùng nhiều thầy thuốc, dược sĩ đã đặt nền móng cho đào tạo Dược Việt Nam.'}]},
      {ic:'⚗️',name:'Dụng cụ bào chế xưa',rd:'Hiện vật cổ truyền.',panel:[
        {h:'Dụng cụ bào chế cổ truyền'},
        {cards:[{ic:'🧉',t:'Cối & chày',d:'Giã, tán dược liệu thành bột.'},
          {ic:'🛶',t:'Thuyền tán',d:'Nghiền dược liệu bằng bánh lăn.'},
          {ic:'⚖️',t:'Cân tiểu ly',d:'Cân lượng nhỏ dược liệu chính xác.'},
          {ic:'🗄️',t:'Tủ thuốc bắc',d:'Nhiều ngăn kéo đựng vị thuốc.'}]},
        {note:'Đây là tiền thân của thiết bị bào chế & cân phân tích hiện đại.'}]}],
    skills:['Hiểu lịch sử & truyền thống ngành','Nhận biết hiện vật ngành Dược'],
    quiz:[{q:'Tác giả "Những cây thuốc và vị thuốc Việt Nam"?',o:['Đỗ Tất Lợi','Isaac Newton','Louis Pasteur','Tuệ Tĩnh'],a:0},
      {q:'Dược điển Việt Nam dùng để?',o:['Quy định tiêu chuẩn chất lượng thuốc','Định giá thuốc','Quảng cáo thuốc','Phân phối thuốc'],a:0},
      {q:'Đại danh y Tuệ Tĩnh nổi tiếng với tư tưởng?',o:['"Nam dược trị Nam nhân"','"Tây dược là nhất"','Không dùng dược liệu','Chỉ châm cứu'],a:0}]},
};

// ============================================================
// TRƯỜNG THCS (Lớp 6–9) — nội dung theo Chương trình GDPT 2018
// Khối lớp = "homeroom" (Toán/Văn nối lộ trình thật); phòng bộ môn dùng panel.
// ============================================================
const SPACES_SECONDARY = {
  grade6:{emoji:'6️⃣',name:'Khối lớp 6',accent:'#38bdf8',intro:'Năm đầu cấp THCS — 12 môn × 36 tuần theo Chương trình GDPT 2018. Mỗi tuần: lý thuyết + ví dụ + quiz có thưởng.',
    rooms:[
      {ic:'📐',name:'Toán 6',rd:'36 tuần: số tự nhiên, lũy thừa, ƯCLN-BCNN, số nguyên, phân số, tỉ số %, hình học cơ bản.',href:'/module.html?domain=secondary&module=S6TOAN'},
      {ic:'📖',name:'Ngữ văn 6',rd:'36 tuần: truyện đồng thoại, cổ tích, truyền thuyết, thơ lục bát, biện pháp tu từ, từ Hán Việt.',href:'/module.html?domain=secondary&module=S6NV'},
      {ic:'🇬🇧',name:'Tiếng Anh 6',rd:'36 tuần CEFR A1-A2: school, family, neighbourhood, modal verbs, past simple, future, sports, cities.',href:'/module.html?domain=secondary&module=S6TA'},
      {ic:'🔬',name:'Khoa học tự nhiên 6',rd:'36 tuần tích hợp Vật lý-Hoá-Sinh: dụng cụ đo, chất, tế bào, lực, năng lượng, Trái Đất-Mặt Trời.',href:'/module.html?domain=secondary&module=S6KHTN'},
      // Lab Hoá ảo — mô phỏng 15 phản ứng hoá học bằng kéo thả, bổ trợ KHTN
      {ic:'🧪',name:'Lab Hoá học ảo',rd:'Kéo thả 10 hoá chất (HCl, NaOH, AgNO₃, CuSO₄…) để khám phá 15 phản ứng — có kết tủa, sủi khí, đổi màu.',href:'/lab-hoa-ao.html'},
      {ic:'🗺️',name:'Lịch sử & Địa lí 6',rd:'36 tuần (HK1 Lịch sử nguyên thuỷ→Bắc thuộc; HK2 Địa lí bản đồ, Trái Đất, địa hình, khí hậu).',href:'/module.html?domain=secondary&module=S6LSDL'},
      {ic:'⚖️',name:'GDCD 6',rd:'36 tuần · 12 chủ đề: truyền thống, yêu thương, tự lập, quyền-nghĩa vụ công dân, quyền trẻ em.',href:'/module.html?domain=secondary&module=S6GDCD'},
      {ic:'⚙️',name:'Công nghệ 6',rd:'36 tuần · 4 chương: Nhà ở · Bảo quản-chế biến thực phẩm · Trang phục · Đồ dùng điện gia đình.',href:'/module.html?domain=secondary&module=S6CN'},
      {ic:'💻',name:'Tin học 6',rd:'36 tuần · 6 chủ đề A-F: máy tính, Internet, file, đạo đức số, Word-PowerPoint, thuật toán.',href:'/module.html?domain=secondary&module=S6TH'},
      {ic:'⚽',name:'Giáo dục thể chất 6',rd:'36 tuần: đội hình, TD liên hoàn, chạy ngắn-bền, nhảy xa, ném bóng, bóng đá-rổ-cầu lông, sơ cứu.',href:'/module.html?domain=secondary&module=S6GDTC'},
      {ic:'🎨',name:'Nghệ thuật 6',rd:'36 tuần (HK1 Âm nhạc nốt-nhịp-dân ca; HK2 Mỹ thuật yếu tố tạo hình, màu, tranh Đông Hồ).',href:'/module.html?domain=secondary&module=S6NT'},
      {ic:'🧭',name:'Trải nghiệm — hướng nghiệp',rd:'36 tuần · 4 mạch: Bản thân · Xã hội · Tự nhiên · Hướng nghiệp.',href:'/module.html?domain=secondary&module=S6HDTN'},
      {ic:'🏯',name:'GD địa phương Hà Nội',rd:'36 tuần: Thăng Long-Hà Nội từ Lý Thái Tổ đến đô thị thông minh; phố cổ, làng nghề, danh nhân.',href:'/module.html?domain=secondary&module=S6GDDP'},
      // Bản đồ VN — bổ trợ LSDL Lớp 6 (Bão Số Học đã bỏ vì Lớp 6 không luyện nhẩm cơ bản nữa)
      {ic:'🗺️',name:'Bản đồ Tri thức 34 tỉnh',rd:'Khám phá 34 tỉnh thành VN (sau sáp nhập 2025) — đặc sản, danh lam, sự kiện lịch sử + quiz.',href:'/ban-do-vn.html'}],
    skills:['Làm quen cấp THCS','Tự học có kế hoạch'],
    quiz:[{q:'Số đối của 7 là?',o:['-7','7','0','1/7'],a:0},
      {q:'Thơ lục bát có cặp câu gồm?',o:['Một câu 6 chữ & một câu 8 chữ','Hai câu 7 chữ','Câu 5 chữ','Câu tự do'],a:0},
      {q:'1 thế kỉ bằng bao nhiêu năm?',o:['100 năm','10 năm','1000 năm','50 năm'],a:0}]},

  grade7:{emoji:'7️⃣',name:'Khối lớp 7',accent:'#34d399',intro:'Lớp 7 — nâng cao tư duy. Học Toán, Ngữ văn cùng các môn và luyện đề có phản hồi tức thì.',
    rooms:[{ic:'📐',name:'Toán 7 — Luyện tập',rd:'Số hữu tỉ, tỉ lệ thức, tam giác, thống kê.',href:'/module.html?domain=secondary&module=S7'},
      // KHTN 7 — 35 tuần bài học đã có trong DB (module S7KHTN) nhưng trước đây
      // không phòng nào trỏ tới nên SV không tìm thấy (req #111 Enderboy).
      {ic:'🔬',name:'Khoa học tự nhiên 7',rd:'35 tuần tích hợp Lí – Hoá – Sinh: nguyên tử, bảng tuần hoàn, phân tử, tốc độ, âm thanh, ánh sáng, từ, trao đổi chất, cảm ứng, sinh sản.',href:'/module.html?domain=secondary&module=S7KHTN'},
      {ic:'📖',name:'Ngữ văn 7 — Luyện tập',rd:'Ca dao, tục ngữ, từ Hán Việt, điệp ngữ.',href:'/module.html?domain=secondary&module=SV7'},
      {ic:'🇬🇧',name:'Tiếng Anh 7',rd:'Ngữ pháp các thì cơ bản.',panel:[
        {h:'Các thì thường gặp lớp 7'},
        {cards:[{ic:'⏱️',t:'Present simple',d:'Thói quen, sự thật: I go / She goes.'},
          {ic:'🔄',t:'Present continuous',d:'Đang xảy ra: I am going.'},
          {ic:'⏮️',t:'Past simple',d:'Đã xảy ra & kết thúc: I went.'},
          {ic:'⏭️',t:'Future (will)',d:'Dự định/tương lai: I will go.'}]},
        {note:'Ngôi thứ 3 số ít ở thì hiện tại đơn thêm -s/-es cho động từ.'}]},
      {ic:'🗺️',name:'Lịch sử & Địa lí 7',rd:'Trung đại & các châu lục.',panel:[
        {h:'Kiến thức trọng tâm'},
        {ul:['Xã hội phong kiến phương Đông & phương Tây','Đại Việt thời Lý – Trần – Lê sơ: dựng nước & giữ nước','Đặc điểm tự nhiên các châu lục: châu Âu, châu Á, châu Phi']},
        {note:'Chiến thắng tiêu biểu: ba lần kháng chiến chống quân Mông – Nguyên thời Trần.'}]},
      {ic:'⚖️',name:'GDCD 7',rd:'Quản lí cảm xúc & ứng phó căng thẳng.',panel:[
        {mcq:[{q:'Khi căng thẳng trước kì kiểm tra, cách ứng phó tích cực là?',o:['Lập kế hoạch ôn tập, nghỉ ngơi, hít thở sâu','Thức trắng đêm lo lắng','Bỏ thi','Giấu cảm xúc và chịu đựng một mình'],a:0,fb:'Ứng phó tích cực: chia nhỏ việc học, ngủ đủ, vận động, chia sẻ với người tin cậy.'}]}]}],
    skills:['Tư duy logic','Tự luyện đề có phản hồi'],
    quiz:[{q:'Số nào sau đây là số hữu tỉ?',o:['Mọi đáp án trên (3, -0,5 và 2/7 đều là số hữu tỉ)','Chỉ 3','Chỉ 2/7','Không số nào'],a:0},
      {q:'Tổng ba góc trong một tam giác bằng?',o:['180°','90°','360°','100°'],a:0},
      {q:'"Ăn quả nhớ kẻ trồng cây" là?',o:['Tục ngữ','Truyện cổ tích','Thơ Đường','Tiểu thuyết'],a:0}]},

  grade8:{emoji:'8️⃣',name:'Khối lớp 8',accent:'#a78bfa',intro:'Lớp 8 — củng cố nền tảng vững trước năm cuối cấp. Toán, Ngữ văn và các môn bộ môn.',
    rooms:[{ic:'📐',name:'Toán 8 — Luyện tập',rd:'Hằng đẳng thức, phương trình, Pythagore.',href:'/module.html?domain=secondary&module=S8'},
      {ic:'📖',name:'Ngữ văn 8 — Luyện tập',rd:'Truyện hiện thực, thơ Đường luật, câu ghép.',href:'/module.html?domain=secondary&module=SV8'},
      {ic:'🔬',name:'KHTN 8 — Ghi nhớ nhanh',rd:'Lật thẻ Lí – Hoá – Sinh.',panel:[
        {p:'Lật thẻ ôn nhanh kiến thức Khoa học tự nhiên lớp 8.'},
        {flash:[{e:'⚖️',f:'Định luật bảo toàn khối lượng',b:'Tổng khối lượng chất phản ứng = tổng khối lượng sản phẩm'},
          {e:'💪',f:'Áp suất',b:'p = F/S (lực ép trên một đơn vị diện tích)'},
          {e:'🫁',f:'Hệ hô hấp',b:'Trao đổi khí O₂ và CO₂ giữa cơ thể & môi trường'},
          {e:'⚗️',f:'Acid',b:'Dung dịch làm quỳ tím hoá đỏ'}]}]},
      {ic:'🇬🇧',name:'Tiếng Anh 8',rd:'So sánh hơn – so sánh nhất.',panel:[
        {h:'So sánh tính từ'},
        {ul:['So sánh hơn: tall → taller than; good → better than','So sánh nhất: tall → the tallest; good → the best','Tính từ dài dùng more / the most: more beautiful, the most beautiful']},
        {mcq:[{q:'Câu nào đúng?',o:['She is taller than me.','She is more tall than me.','She is tallest than me.','She is the taller.'],a:0,fb:'Tính từ ngắn "tall" → "taller than" trong so sánh hơn.'}]}]}],
    skills:['Biến đổi đại số','Đọc – hiểu văn bản'],
    quiz:[{q:'(a + b)² bằng?',o:['a² + 2ab + b²','a² + b²','a² - b²','2a + 2b'],a:0},
      {q:'Định lí Pythagore áp dụng cho tam giác?',o:['Tam giác vuông','Mọi tam giác','Tam giác đều','Tam giác tù'],a:0},
      {q:'Định luật bảo toàn khối lượng do ai phát biểu?',o:['Lavoisier','Newton','Darwin','Mendel'],a:0}]},

  grade9:{emoji:'9️⃣',name:'Khối lớp 9',accent:'#fb7185',intro:'Lớp 9 — năm cuối cấp, tăng tốc ôn thi vào lớp 10. Học chắc Toán, Ngữ văn & lập kế hoạch ôn tập.',
    rooms:[{ic:'📐',name:'Toán 9 — Luyện tập',rd:'Căn bậc hai, hệ phương trình, đường tròn.',href:'/module.html?domain=secondary&module=S9'},
      {ic:'📈',name:'Đồ thị hàm số bậc nhất (tương tác)',rd:'Vẽ y=ax+b: kéo hệ số góc, xem đồng biến/nghịch biến & giao trục.',href:'/grapher.html?domain=secondary&type=linear'},
      {ic:'📖',name:'Ngữ văn 9 — Luyện tập',rd:'Truyện Kiều, thơ hiện đại, nghĩa hàm ý.',href:'/module.html?domain=secondary&module=SV9'},
      {ic:'🎯',name:'Kế hoạch ôn thi vào 10',rd:'Tự lập lộ trình ôn tập.',panel:[
        {h:'Lộ trình ôn thi tuyển sinh lớp 10'},
        {check:['Lập thời khoá biểu ôn theo 3 môn thi (Toán, Văn, Anh)','Hệ thống lại kiến thức trọng tâm từng môn','Luyện đề theo cấu trúc đề thi của tỉnh/thành','Bấm giờ làm đề & soát lỗi sai','Giữ sức khoẻ: ngủ đủ, ăn uống điều độ']},
        {goal:true},
        {note:'Học đều mỗi ngày + luyện đề có soát lỗi hiệu quả hơn nhiều so với học dồn.'}]},
      {ic:'🧭',name:'Hướng nghiệp sau THCS',rd:'Các con đường sau lớp 9.',panel:[
        {h:'Sau khi tốt nghiệp THCS'},
        {cards:[{ic:'🏫',t:'THPT',d:'Học tiếp lớp 10–12 theo định hướng KHTN/KHXH.'},
          {ic:'🛠️',t:'Trường nghề',d:'Trung cấp nghề + văn hoá: học nghề sớm.'},
          {ic:'🎓',t:'GDTX',d:'Giáo dục thường xuyên: vừa học vừa làm.'}]},
        {note:'Chọn hướng theo năng lực, sở thích & điều kiện gia đình — không có con đường nào là duy nhất.'}]}],
    skills:['Tổng hợp kiến thức','Lập kế hoạch ôn thi'],
    quiz:[{q:'√16 bằng?',o:['4','8','16','256'],a:0},
      {q:'Tác giả "Truyện Kiều"?',o:['Nguyễn Du','Nguyễn Trãi','Hồ Xuân Hương','Tố Hữu'],a:0},
      {q:'Phương trình bậc hai có dạng tổng quát?',o:['ax² + bx + c = 0 (a ≠ 0)','ax + b = 0','ax³ + b = 0','a/x = b'],a:0}]},

  lab:{emoji:'🔬',name:'Phòng thí nghiệm KHTN',accent:'#14b8a6',intro:'Phòng học bộ môn Khoa học tự nhiên (Lí – Hoá – Sinh). Đọc lý thuyết ở nhóm phòng 📖 trước, rồi mới vào thí nghiệm và luyện tập.',
    rooms:[
      // ── Lý thuyết đọc-trước KHTN 7 (req #111 Enderboy) ────────────────────
      // SV xin "sách giáo khoa điện tử để có kiến thức trước khi làm bài".
      // Bài học đầy đủ 35 tuần đã có sẵn trong DB (module S7KHTN) nhưng trước
      // đây không phòng nào trỏ tới → thêm lối vào + 4 phòng tóm tắt theo 4 mạch
      // nội dung CT GDPT 2018 để đọc ngay tại lab: lý thuyết → nhầm lẫn thường
      // gặp → tự kiểm bằng câu hỏi.
      {ic:'📚',name:'Sách giáo khoa điện tử KHTN 7 — 35 tuần',rd:'Toàn bộ bài học KHTN lớp 7 theo tuần: lý thuyết → ví dụ giải mẫu → quiz có phản hồi. Học sâu từng chủ đề.',href:'/module.html?domain=secondary&module=S7KHTN'},

      {ic:'🧭',name:'📖 KHTN 7 — Mở đầu: học KHTN thế nào?',rd:'Tuần 1 · Phương pháp tìm hiểu tự nhiên 5 bước, kĩ năng tiến trình và dụng cụ hay dùng.',panel:[
        {h:'Phương pháp tìm hiểu tự nhiên — 5 bước'},
        {p:'Học Khoa học tự nhiên không phải là học thuộc kết luận, mà là tập làm như nhà khoa học: thấy một hiện tượng thì đặt câu hỏi, dự đoán, rồi kiểm tra dự đoán bằng thực nghiệm trước khi kết luận.'},
        {ol:['Đề xuất vấn đề cần tìm hiểu: quan sát hiện tượng và đặt câu hỏi.','Đưa ra dự đoán khoa học (giả thuyết) để trả lời câu hỏi đó.','Lập kế hoạch kiểm tra dự đoán: chọn dụng cụ, mẫu vật và cách làm.','Thực hiện kế hoạch: làm thí nghiệm, quan sát và ghi lại số liệu.','Viết báo cáo, thảo luận và trình bày kết quả.']},
        {h:'Kĩ năng tiến trình cần rèn'},
        {ul:['Quan sát: dùng giác quan và dụng cụ để thu thập thông tin.','Phân loại: nhóm các đối tượng theo dấu hiệu chung.','Liên kết: nối thông tin mới với điều đã biết để giải thích.','Dự báo: từ quy luật đã thấy, đoán trước điều sẽ xảy ra.','Viết báo cáo & thuyết trình sao cho người khác hiểu được kết quả của em.']},
        {h:'Dụng cụ hay dùng ở lớp 7'},
        {cards:[{ic:'⏱️',t:'Cổng quang điện + đồng hồ đo thời gian hiện số',d:'Chính xác tới 0,001 s — dùng khi tính tốc độ, thay cho bấm giây bằng tay.'},
          {ic:'📈',t:'Dao động kí',d:'Biến âm thanh thành đồ thị: nhìn thấy được biên độ (to – nhỏ) và tần số (cao – thấp).'},
          {ic:'🔍',t:'Kính lúp & kính hiển vi quang học',d:'Quan sát vật nhỏ và tiêu bản tế bào thực vật – động vật.'}]},
        {note:'Mẹo học: trước mỗi buổi thực hành, đọc phần lý thuyết tương ứng ở đây rồi mới vào lab — em sẽ biết mình đang đi tìm điều gì thay vì làm theo quán tính.'},
        {mcq:[{q:'Bước ĐẦU TIÊN của phương pháp tìm hiểu tự nhiên là gì?',o:['Đề xuất vấn đề cần tìm hiểu','Viết báo cáo kết quả','Làm thí nghiệm ngay cho nhanh','Rút ra kết luận'],a:0,fb:'Phải có câu hỏi/vấn đề trước, sau đó mới dự đoán và kiểm tra dự đoán.'},
          {q:'Muốn "nhìn thấy" độ to và độ cao của một âm thanh, em dùng dụng cụ nào?',o:['Dao động kí','Nhiệt kế','Lực kế','Kính hiển vi'],a:0,fb:'Dao động kí hiển thị đồ thị dao động: biên độ ứng với độ to, tần số ứng với độ cao.'}]}]},

      {ic:'⚛️',name:'📖 KHTN 7 — Chất và sự biến đổi chất',rd:'Tuần 2–9 · Nguyên tử · Nguyên tố hoá học · Bảng tuần hoàn · Phân tử, liên kết & hoá trị.',panel:[
        {h:'1. Nguyên tử (Tuần 2–3)'},
        {p:'Nguyên tử là hạt vô cùng nhỏ, trung hoà về điện, tạo nên mọi chất. Theo mô hình Rutherford – Bohr, nguyên tử gồm hạt nhân ở giữa (chứa proton mang điện tích dương và neutron không mang điện) và lớp vỏ gồm các electron mang điện tích âm chuyển động xung quanh theo từng lớp.'},
        {ul:['Nguyên tử trung hoà về điện vì số proton bằng số electron.','Lớp electron thứ nhất chứa tối đa 2 electron; lớp thứ hai và thứ ba chứa tối đa 8 electron.','Electron ở lớp ngoài cùng quyết định tính chất hoá học của nguyên tử.','Khối lượng nguyên tử tính bằng amu; electron rất nhẹ nên khối lượng tập trung gần như hoàn toàn ở hạt nhân.']},
        {note:'Nhầm lẫn thường gặp: coi số hiệu nguyên tử là khối lượng. Số hiệu nguyên tử = số proton (cũng bằng số electron); còn khối lượng nguyên tử ≈ số proton + số neutron.'},
        {h:'2. Nguyên tố hoá học & bảng tuần hoàn (Tuần 4–5)'},
        {p:'Nguyên tố hoá học là tập hợp những nguyên tử có cùng số proton trong hạt nhân. Mỗi nguyên tố có một kí hiệu hoá học gồm một hoặc hai chữ cái, chữ cái đầu luôn viết hoa: H, O, Na, Ca, Fe.'},
        {ul:['Bảng tuần hoàn sắp xếp các nguyên tố theo chiều tăng dần điện tích hạt nhân, tức là tăng dần số proton.','Số thứ tự chu kì (hàng ngang) bằng số lớp electron của nguyên tử.','Số thứ tự nhóm A (cột dọc) bằng số electron ở lớp ngoài cùng.','Kim loại nằm ở phía bên trái và giữa bảng, phi kim ở phía trên bên phải, khí hiếm ở nhóm VIIIA ngoài cùng bên phải.']},
        {note:'SGK Chương trình GDPT 2018 dùng tên nguyên tố theo IUPAC: sodium (Na) thay cho natri, potassium (K) thay cho kali, iron (Fe) thay cho sắt.'},
        {h:'3. Phân tử — đơn chất và hợp chất (Tuần 6)'},
        {p:'Phân tử là hạt đại diện cho chất, gồm một số nguyên tử liên kết với nhau và thể hiện đầy đủ tính chất hoá học của chất. Đơn chất do một nguyên tố tạo nên (O₂, Fe); hợp chất do từ hai nguyên tố trở lên tạo nên (H₂O, NaCl, CO₂).'},
        {p:'Khối lượng phân tử bằng tổng khối lượng các nguyên tử có trong phân tử. Ví dụ H₂O = 2 × 1 + 16 = 18 amu; CO₂ = 12 + 2 × 16 = 44 amu.'},
        {h:'4. Liên kết hoá học & hoá trị (Tuần 7–8)'},
        {ul:['Quy tắc octet: nguyên tử có xu hướng đạt 8 electron ở lớp ngoài cùng (riêng helium là 2) giống khí hiếm để trở nên bền vững.','Liên kết ion: kim loại nhường electron thành ion dương, phi kim nhận electron thành ion âm, hai ion trái dấu hút nhau — ví dụ NaCl.','Liên kết cộng hoá trị: hai nguyên tử phi kim góp chung electron — ví dụ H₂, O₂, H₂O, CO₂.','Quy tắc hoá trị: trong công thức AxBy thì x × hoá trị của A = y × hoá trị của B.']},
        {note:'Nhầm lẫn kinh điển: lẫn chỉ số với hệ số. Trong 2H₂O, số 2 phía trước là hệ số (có 2 phân tử nước), còn số 2 nhỏ bên dưới là chỉ số (mỗi phân tử có 2 nguyên tử H).'},
        {match:{title:'Nối công thức hoá học với khối lượng phân tử (amu)',pairs:[['H₂O','18'],['CO₂','44'],['O₂','32'],['NaCl','58,5'],['H₂','2']]}},
        {mcq:[{q:'Số hiệu nguyên tử của một nguyên tố cho biết điều gì?',o:['Số proton trong hạt nhân (cũng bằng số electron)','Số neutron trong hạt nhân','Khối lượng của nguyên tử','Số lớp electron'],a:0,fb:'Số hiệu nguyên tử = số proton, là dấu hiệu đặc trưng của nguyên tố; nguyên tử trung hoà nên cũng bằng số electron.'},
          {q:'Nguyên tử X có 2 lớp electron, lớp ngoài cùng có 6 electron. X nằm ở đâu trong bảng tuần hoàn?',o:['Chu kì 2, nhóm VIA','Chu kì 6, nhóm IIA','Chu kì 2, nhóm IIA','Chu kì 8, nhóm VIA'],a:0,fb:'Số lớp electron cho số thứ tự chu kì (2); số electron lớp ngoài cùng cho số thứ tự nhóm A (VI).'},
          {q:'Liên kết trong phân tử NaCl thuộc loại nào?',o:['Liên kết ion','Liên kết cộng hoá trị','Không có liên kết','Liên kết kim loại'],a:0,fb:'Na nhường 1 electron thành Na⁺, Cl nhận 1 electron thành Cl⁻; hai ion trái dấu hút nhau nên là liên kết ion.'}]}]},

      {ic:'⚡',name:'📖 KHTN 7 — Năng lượng và sự biến đổi',rd:'Tuần 10–17 · Tốc độ · Âm thanh · Ánh sáng · Từ và nam châm điện.',panel:[
        {h:'1. Tốc độ (Tuần 10–11)'},
        {p:'Tốc độ cho biết vật chuyển động nhanh hay chậm, tính bằng quãng đường chia cho thời gian: v = s / t. Đơn vị thường dùng là m/s và km/h.'},
        {ul:['Đổi đơn vị: nhân 3,6 để chuyển từ m/s sang km/h; chia 3,6 để chuyển ngược lại từ km/h sang m/s.','Trên đồ thị quãng đường – thời gian, chuyển động thẳng đều là một đường thẳng xiên; đường càng dốc thì vật càng nhanh.','Đoạn đồ thị nằm ngang nghĩa là quãng đường không đổi — vật đang đứng yên.','Tốc độ càng lớn thì quãng đường phanh dừng càng dài, vì vậy khi tham gia giao thông phải giữ khoảng cách an toàn.']},
        {note:'Ví dụ: xe khách đi 90 km hết 1,5 giờ → v = 90 : 1,5 = 60 km/h, tức khoảng 16,7 m/s.'},
        {h:'2. Âm thanh (Tuần 12–13)'},
        {p:'Nguồn âm là vật đang dao động. Sóng âm truyền được trong chất rắn, chất lỏng và chất khí, nhưng không truyền được trong chân không. Trong không khí, âm truyền với tốc độ khoảng 340 m/s.'},
        {ul:['Biên độ dao động càng lớn thì âm càng TO; độ to của âm có đơn vị decibel (dB).','Tần số là số dao động trong một giây, đơn vị hertz (Hz); tần số càng lớn thì âm càng CAO (bổng).','Âm gặp vật cản sẽ dội lại — đó là phản xạ âm; ta nghe thấy tiếng vang khi âm phản xạ tới tai chậm hơn âm trực tiếp ít nhất 1/15 giây.','Vật cứng, bề mặt nhẵn phản xạ âm tốt; vật mềm, xốp, gồ ghề như rèm vải, thảm, tấm xốp hấp thụ âm tốt nên được dùng để chống ồn.']},
        {note:'Nhầm lẫn kinh điển: "âm to" không phải "âm cao". To – nhỏ do biên độ, còn cao – thấp do tần số. Một tiếng trống trầm vẫn có thể rất to.'},
        {h:'3. Ánh sáng (Tuần 14–15)'},
        {p:'Ánh sáng là một dạng năng lượng: nó làm pin mặt trời phát điện và làm nóng vật được chiếu vào. Trong môi trường trong suốt và đồng tính, ánh sáng truyền theo đường thẳng — vì thế mới có bóng tối và bóng nửa tối.'},
        {ul:['Định luật phản xạ ánh sáng: tia phản xạ nằm trong mặt phẳng chứa tia tới và pháp tuyến tại điểm tới; góc phản xạ bằng góc tới.','Góc tới là góc giữa tia tới và pháp tuyến (đường vuông góc với mặt gương), không phải góc giữa tia tới và mặt gương.','Ảnh của một vật qua gương phẳng là ảnh ảo, không hứng được trên màn chắn.','Ảnh qua gương phẳng lớn bằng vật, và cách gương một khoảng đúng bằng khoảng cách từ vật tới gương.']},
        {h:'4. Từ (Tuần 16–17)'},
        {ul:['Nam châm hút được sắt, thép, nickel, cobalt; không hút nhôm, đồng, thuỷ tinh hay nhựa.','Mỗi nam châm có hai cực: cực Bắc (N) và cực Nam (S); hai cực cùng tên đẩy nhau, khác tên hút nhau.','Xung quanh nam châm và xung quanh dây dẫn có dòng điện đều tồn tại từ trường; có thể phát hiện từ trường bằng kim nam châm nhỏ hoặc mạt sắt.','Đường sức từ đi ra ở cực Bắc và đi vào ở cực Nam của nam châm; chỗ nào đường sức mau thì từ trường ở đó mạnh.','Kim la bàn luôn nằm theo hướng Bắc – Nam vì Trái Đất cũng là một nam châm khổng lồ.','Nam châm điện là ống dây có dòng điện chạy qua, thường có lõi sắt non; ngắt dòng điện thì mất từ tính, nên được dùng làm cần cẩu điện, chuông điện, rơ le.']},
        {mcq:[{q:'Một xe máy đi được 15 km trong 30 phút. Tốc độ của xe là?',o:['30 km/h','15 km/h','45 km/h','7,5 km/h'],a:0,fb:'30 phút = 0,5 giờ → v = 15 : 0,5 = 30 km/h.'},
          {q:'Vì sao trên Mặt Trăng, các nhà du hành phải nói chuyện với nhau qua bộ đàm?',o:['Vì quanh Mặt Trăng gần như là chân không, âm không truyền được','Vì trên Mặt Trăng quá lạnh','Vì tai họ bị mũ bảo hộ bịt kín','Vì âm truyền quá nhanh nên nghe không kịp'],a:0,fb:'Sóng âm cần môi trường vật chất (rắn, lỏng, khí) để truyền; trong chân không thì không truyền được âm.'},
          {q:'Chiếu một tia sáng tới gương phẳng với góc tới bằng 30°. Góc phản xạ bằng bao nhiêu?',o:['30°','60°','15°','90°'],a:0,fb:'Theo định luật phản xạ ánh sáng, góc phản xạ luôn bằng góc tới.'},
          {q:'Vật nào sau đây KHÔNG bị nam châm hút?',o:['Thanh nhôm','Đinh sắt','Kẹp giấy bằng thép','Đồng xu bằng nickel'],a:0,fb:'Nam châm chỉ hút vật liệu từ như sắt, thép, nickel, cobalt — nhôm không bị hút.'}]}]},

      {ic:'🌱',name:'📖 KHTN 7 — Vật sống',rd:'Tuần 21–33 · Trao đổi chất & chuyển hoá năng lượng · Cảm ứng · Sinh trưởng – phát triển · Sinh sản.',panel:[
        {h:'1. Trao đổi chất và chuyển hoá năng lượng (Tuần 21–27)'},
        {p:'Trao đổi chất là tập hợp các biến đổi hoá học trong tế bào cùng với sự trao đổi chất giữa cơ thể và môi trường; đi kèm với nó là sự chuyển hoá năng lượng từ dạng này sang dạng khác. Đây là điều kiện để cơ thể sống tồn tại và lớn lên.'},
        {ul:['Quang hợp diễn ra ở lục lạp, chủ yếu trong lá: nước và carbon dioxide, nhờ ánh sáng cùng diệp lục, tạo ra glucose và oxygen — năng lượng ánh sáng chuyển thành hoá năng trong chất hữu cơ.','Hô hấp tế bào diễn ra ở ti thể, cả ngày lẫn đêm: glucose và oxygen tạo ra carbon dioxide, nước và giải phóng năng lượng cho mọi hoạt động sống.','Ở thực vật, khí được trao đổi qua khí khổng ở biểu bì lá; ở người, khí được trao đổi tại phế nang của phổi.','Mạch gỗ vận chuyển nước và muối khoáng từ rễ lên lá; mạch rây vận chuyển chất hữu cơ từ lá tới các cơ quan khác.','Thoát hơi nước qua khí khổng tạo lực kéo giúp nước đi lên, đồng thời làm mát cây và mở đường cho carbon dioxide vào lá.']},
        {note:'Nhầm lẫn thường gặp: nghĩ rằng ban ngày cây chỉ quang hợp còn ban đêm chỉ hô hấp. Thực ra cây hô hấp suốt ngày đêm; ban ngày có thêm quang hợp và quang hợp mạnh hơn hô hấp.'},
        {h:'2. Cảm ứng ở sinh vật (Tuần 28–29)'},
        {p:'Cảm ứng là khả năng tiếp nhận kích thích và phản ứng lại kích thích từ môi trường, giúp sinh vật thích nghi và tồn tại.'},
        {ul:['Ở thực vật, cảm ứng biểu hiện thành tính hướng: hướng sáng của ngọn cây, hướng nước và hướng chất dinh dưỡng của rễ, hướng tiếp xúc của tua cuốn cây mướp.','Phản ứng của thực vật diễn ra chậm, trong khi phản ứng của động vật nhanh hơn nhiều nhờ có hệ thần kinh.','Động vật có tập tính bẩm sinh (nhện giăng tơ, chim di cư) và tập tính học được (chó nghe hiệu lệnh, trâu tự về chuồng đúng giờ).','Ứng dụng trong đời sống: làm giàn cho cây leo, chiếu sáng bổ sung trong nhà kính, huấn luyện vật nuôi.']},
        {h:'3. Sinh trưởng và phát triển (Tuần 30)'},
        {ul:['Sinh trưởng là sự tăng lên về kích thước và khối lượng cơ thể; phát triển là những biến đổi về cấu tạo, hình thái và chức năng như nảy mầm, ra hoa, phát dục.','Thực vật lớn lên nhờ mô phân sinh: mô phân sinh đỉnh giúp thân và rễ dài ra, mô phân sinh bên giúp thân to ra.','Động vật có thể phát triển qua biến thái hoàn toàn (bướm: trứng → sâu → nhộng → bướm trưởng thành) hoặc biến thái không hoàn toàn (châu chấu: trứng → ấu trùng → con trưởng thành).','Nhiệt độ, ánh sáng, nước và chất dinh dưỡng đều ảnh hưởng tới sinh trưởng và phát triển.']},
        {h:'4. Sinh sản ở sinh vật (Tuần 31–32)'},
        {ul:['Sinh sản vô tính không có sự kết hợp giao tử đực và giao tử cái, cơ thể con giống hệt cơ thể mẹ — thuỷ tức nảy chồi, giâm cành, chiết cành, ghép cây, nuôi cấy mô.','Sinh sản hữu tính có sự kết hợp giao tử đực với giao tử cái tạo thành hợp tử, cơ thể con mang đặc điểm của cả bố và mẹ nên đa dạng hơn.','Ở thực vật có hoa: hạt phấn rơi lên đầu nhuỵ gọi là thụ phấn, sau đó thụ tinh tạo thành hợp tử; bầu nhuỵ phát triển thành quả, noãn phát triển thành hạt.','Nhiệt độ, độ ẩm, thức ăn và hormone điều hoà sinh sản — con người dựa vào đó để điều khiển cây ra hoa trái vụ hay tăng số con ở vật nuôi.']},
        {h:'5. Cơ thể sinh vật là một thể thống nhất (Tuần 33)'},
        {p:'Bốn hoạt động sống — trao đổi chất và chuyển hoá năng lượng, sinh trưởng và phát triển, cảm ứng, sinh sản — không tách rời nhau mà tác động qua lại. Tế bào là đơn vị cơ sở; tế bào hợp thành mô, mô thành cơ quan, cơ quan thành hệ cơ quan rồi thành cơ thể, tất cả phối hợp trong một thể thống nhất.'},
        {match:{title:'Nối quá trình với nơi diễn ra',pairs:[['Quang hợp','Lục lạp trong tế bào lá'],['Hô hấp tế bào','Ti thể'],['Trao đổi khí ở lá','Khí khổng'],['Vận chuyển nước và muối khoáng','Mạch gỗ'],['Vận chuyển chất hữu cơ từ lá','Mạch rây']]}},
        {mcq:[{q:'Nguyên liệu của quá trình quang hợp là gì?',o:['Nước và carbon dioxide','Glucose và oxygen','Nước và oxygen','Chỉ cần ánh sáng'],a:0,fb:'Quang hợp: nước + carbon dioxide, nhờ ánh sáng và diệp lục, tạo ra glucose + oxygen.'},
          {q:'Ngọn cây trồng trong phòng nghiêng dần về phía cửa sổ. Đó là hiện tượng gì?',o:['Tính hướng sáng','Tính hướng nước','Tập tính học được','Sinh sản vô tính'],a:0,fb:'Hướng sáng: thực vật phản ứng với kích thích ánh sáng bằng cách sinh trưởng hướng về nguồn sáng.'},
          {q:'Giâm cành là hình thức sinh sản nào?',o:['Sinh sản vô tính','Sinh sản hữu tính','Thụ phấn','Biến thái hoàn toàn'],a:0,fb:'Giâm cành không có sự kết hợp giao tử nên là sinh sản vô tính; cây con giống hệt cây mẹ.'}]}]},

      // ── Thực hành & ôn tập ────────────────────────────────────────────────
      {ic:'🥽',name:'An toàn phòng thí nghiệm',rd:'Tự kiểm trước khi làm thí nghiệm.',panel:[
        {h:'Quy tắc an toàn trong phòng thực hành'},
        {check:['Đeo kính bảo hộ khi làm với hoá chất/đun nóng','Không tự ý nếm, ngửi trực tiếp hoá chất','Đun ống nghiệm: hơ đều, miệng ống hướng ra chỗ không có người','Dùng xong tắt đèn cồn bằng nắp, không thổi','Rửa tay sau khi thực hành']},
        {note:'Hoá chất bắn vào mắt → rửa ngay bằng nhiều nước sạch và báo giáo viên.'}]},
      {ic:'🧲',name:'Vật lí — ôn nhanh',rd:'Lực, năng lượng, điện cơ bản. Đọc phòng 📖 Năng lượng và sự biến đổi trước cho chắc.',panel:[
        {h:'Hiện tượng vật lí quen thuộc'},
        {ul:['Lực làm thay đổi tốc độ hoặc hình dạng vật','Trọng lực kéo mọi vật về phía Trái Đất','Mạch điện kín mới có dòng điện chạy qua','Năng lượng không tự sinh ra hay mất đi, chỉ chuyển hoá']},
        {mcq:[{q:'Bóng đèn sáng được là nhờ dòng điện chuyển hoá điện năng thành?',o:['Quang năng và nhiệt năng','Chỉ âm thanh','Hoá năng','Cơ năng'],a:0,fb:'Đèn sợi đốt: điện năng → quang năng (ánh sáng) + nhiệt năng (toả nhiệt).'}]}]},
      {ic:'⚗️',name:'Hoá học — ôn nhanh',rd:'Chất, phản ứng, quỳ tím. Đọc phòng 📖 Chất và sự biến đổi chất trước cho chắc.',panel:[
        {p:'Lật thẻ ôn dấu hiệu nhận biết trong Hoá học THCS.'},
        {flash:[{e:'🔴',f:'Acid + quỳ tím',b:'Quỳ tím hoá đỏ'},{e:'🔵',f:'Base + quỳ tím',b:'Quỳ tím hoá xanh'},
          {e:'💨',f:'Dấu hiệu phản ứng',b:'Sủi bọt khí, đổi màu, kết tủa, toả/thu nhiệt'},
          {e:'⚖️',f:'Bảo toàn khối lượng',b:'Khối lượng được bảo toàn trong phản ứng hoá học'}]}]},
      {ic:'🌿',name:'Sinh học — ôn nhanh',rd:'Tế bào, cơ thể sống. Đọc phòng 📖 Vật sống trước cho chắc.',panel:[
        {h:'Cơ sở của sự sống'},
        {ul:['Tế bào là đơn vị cấu tạo & chức năng cơ bản của cơ thể sống','Thực vật quang hợp tạo chất hữu cơ + nhả khí O₂','Cơ thể người gồm nhiều hệ cơ quan phối hợp hoạt động']},
        {note:'Quang hợp cần ánh sáng, nước, khí carbonic — tạo glucose và oxygen.'}]}],
    skills:['Thao tác thí nghiệm an toàn','Quan sát & giải thích hiện tượng'],
    quiz:[{q:'Dụng cụ đo nhiệt độ chất lỏng?',o:['Nhiệt kế','Cân','Thước','Ống nghiệm'],a:0},
      {q:'Khí thực vật thải ra khi quang hợp?',o:['Khí oxygen (O₂)','Khí carbonic','Khí nitơ','Hơi nước'],a:0},
      {q:'Acid làm quỳ tím chuyển sang màu?',o:['Đỏ','Xanh','Vàng','Không đổi'],a:0}]},

  computer:{emoji:'💻',name:'Phòng Tin học',accent:'#8b5cf6',intro:'Phòng bộ môn Tin học: an toàn trên mạng, soạn thảo – trình chiếu và tư duy thuật toán.',
    rooms:[{ic:'🛡️',name:'An toàn trên không gian mạng',rd:'Ứng xử & bảo vệ bản thân online.',panel:[
        {h:'Quy tắc an toàn khi dùng Internet'},
        {mcq:[{q:'Người lạ trên mạng xin số điện thoại & địa chỉ nhà em. Nên?',o:['Không cung cấp & báo cho người lớn tin cậy','Gửi ngay vì họ thân thiện','Cho địa chỉ nhưng giấu số điện thoại','Hẹn gặp để hỏi cho rõ'],a:0,fb:'Không chia sẻ thông tin cá nhân với người lạ trên mạng; gặp tình huống nghi ngờ hãy báo người lớn.'},
          {q:'Mật khẩu mạnh nên?',o:['Dài, kết hợp chữ hoa, chữ thường, số & kí tự đặc biệt','Là ngày sinh của mình','Là "123456"','Dùng chung cho mọi tài khoản'],a:0,fb:'Mật khẩu mạnh: đủ dài, đa dạng kí tự, không dễ đoán & không dùng chung.'}]}]},
      {ic:'📄',name:'Soạn thảo & trình chiếu',rd:'Word & PowerPoint cơ bản.',panel:[
        {h:'Kĩ năng tin học văn phòng'},
        {ul:['Định dạng văn bản: phông chữ, cỡ chữ, căn lề, in đậm/nghiêng','Chèn hình ảnh, bảng biểu vào văn bản','Bài trình chiếu: mỗi slide một ý chính, chữ to, ít chữ','Lưu file thường xuyên (Ctrl + S) để tránh mất dữ liệu']},
        {note:'Trình bày đẹp giúp truyền đạt ý tưởng rõ ràng — nhưng nội dung mới là quan trọng nhất.'}]},
      {ic:'🧩',name:'Thuật toán & Scratch',rd:'Tư duy giải quyết vấn đề.',panel:[
        {h:'Thuật toán là gì?'},
        {ol:['Xác định bài toán: đầu vào – đầu ra','Liệt kê các bước thực hiện theo thứ tự','Dùng cấu trúc tuần tự, rẽ nhánh (nếu…thì), lặp','Kiểm thử & sửa lỗi (debug)']},
        {order:{title:'Sắp xếp 4 bước xây dựng thuật toán',items:['Xác định bài toán: đầu vào – đầu ra','Liệt kê các bước thực hiện theo thứ tự','Dùng cấu trúc tuần tự, rẽ nhánh (nếu…thì), lặp','Kiểm thử & sửa lỗi (debug)']}},
        {mcq:[{q:'"Nếu trời mưa thì mang ô" là cấu trúc?',o:['Rẽ nhánh (điều kiện)','Lặp','Tuần tự thuần tuý','Không phải thuật toán'],a:0,fb:'Cấu trúc rẽ nhánh: thực hiện hành động dựa trên một điều kiện đúng/sai.'}]}]},
      {ic:'🌐',name:'Tư duy số',rd:'Thông tin đáng tin & bản quyền.',panel:[
        {ul:['Kiểm chứng thông tin từ nhiều nguồn trước khi tin & chia sẻ','Tôn trọng bản quyền: ghi nguồn, không sao chép trái phép','Cân bằng thời gian dùng thiết bị, bảo vệ mắt & sức khoẻ']},
        {note:'Là công dân số có trách nhiệm: lịch sự, trung thực và an toàn khi lên mạng.'}]},
      // Code Quest — sandbox block-based programming kiểu Scratch
      {ic:'🤖',name:'Code Quest — Lập trình kéo thả',rd:'10 level từ "Đi 3 ô tới đích" → mê cung có if-else. Luyện tư duy thuật toán.',href:'/code-quest.html'}],
    skills:['An toàn số','Tư duy thuật toán'],
    quiz:[{q:'Tổ hợp phím lưu văn bản nhanh?',o:['Ctrl + S','Ctrl + P','Ctrl + C','Alt + F4'],a:0},
      {q:'Khi gặp nội dung xấu/độc trên mạng, em nên?',o:['Không tương tác & báo người lớn/giáo viên','Chia sẻ cho nhiều bạn','Bình luận tranh cãi','Lưu lại để xem tiếp'],a:0},
      {q:'Cấu trúc "lặp lại 10 lần" trong thuật toán gọi là?',o:['Vòng lặp','Rẽ nhánh','Tuần tự','Biến'],a:0}]},

  english:{emoji:'🗣️',name:'Phòng Ngoại ngữ',accent:'#60a5fa',intro:'Phòng học Tiếng Anh: luyện 4 kĩ năng nghe – nói – đọc – viết qua từ vựng, ngữ pháp và hội thoại.',
    rooms:[{ic:'🔤',name:'Từ vựng theo chủ đề',rd:'Lật thẻ Anh – Việt.',panel:[
        {p:'Lật thẻ ôn từ vựng chủ đề đời sống.'},
        {flash:[{e:'🌦️',f:'weather',b:'thời tiết'},{e:'🏖️',f:'holiday',b:'kì nghỉ'},{e:'⚽',f:'hobby',b:'sở thích'},
          {e:'🍲',f:'food',b:'thức ăn'},{e:'🚌',f:'transport',b:'phương tiện giao thông'},{e:'🌳',f:'environment',b:'môi trường'}]}]},
      {ic:'📘',name:'Ngữ pháp trọng tâm',rd:'Thì, câu điều kiện, bị động.',panel:[
        {h:'Điểm ngữ pháp THCS hay gặp'},
        {ul:['Các thì: hiện tại đơn/tiếp diễn, quá khứ đơn, tương lai','Câu bị động: be + V3 (The book is read by her.)','Câu điều kiện loại 1: If + hiện tại đơn, will + V','Mệnh đề quan hệ: who, which, that']},
        {note:'Học ngữ pháp gắn với câu ví dụ cụ thể sẽ nhớ lâu hơn học công thức suông.'}]},
      {ic:'💬',name:'Hội thoại',rd:'Phản xạ giao tiếp.',panel:[
        {mcq:[{q:'Đáp lại lịch sự cho "Thank you very much!" là?',o:['You are welcome.','Yes, I do.','Me too.','Good night.'],a:0,fb:'"You are welcome" (Không có gì) là cách đáp lại lời cảm ơn phổ biến.'},
          {q:'Hỏi đường: "Excuse me, how can I get to the library?" — đây là câu?',o:['Hỏi chỉ đường','Chào hỏi','Đặt món ăn','Xin lỗi vì đến muộn'],a:0,fb:'"How can I get to…?" là mẫu câu hỏi đường tới một địa điểm.'}]}]},
      {ic:'🎧',name:'Phát âm & trọng âm',rd:'Nói rõ, đúng trọng âm.',panel:[
        {ul:['Chú ý âm cuối: -s, -es, -ed thường bị bỏ quên khi nói','Mỗi từ nhiều âm tiết có một trọng âm chính','Luyện nghe – nhại lại (shadowing) để cải thiện phản xạ']},
        {note:'Tự tin nói, sai thì sửa — giao tiếp được quan trọng hơn sợ sai.'}]}],
    skills:['Mở rộng vốn từ','Phản xạ giao tiếp'],
    quiz:[{q:'Dạng quá khứ của "go" là?',o:['went','goed','gone','going'],a:0},
      {q:'Chọn câu bị động đúng của "She writes a letter."',o:['A letter is written by her.','A letter writes by her.','A letter is write by her.','She is written a letter.'],a:0},
      {q:'"environment" nghĩa là?',o:['môi trường','phương tiện','sở thích','kì nghỉ'],a:0}]},

  artmusic:{emoji:'🎨',name:'Phòng Nghệ thuật',accent:'#f472b6',intro:'Phòng Âm nhạc & Mỹ thuật: học nhạc lí qua đàn phím & nhịp gõ, thực hành pha màu và vẽ tự do.',
    rooms:[{ic:'🎵',name:'Âm nhạc',rd:'Chơi đàn, gõ nhịp & nhạc lí.',panel:[
        {h:'Kiến thức âm nhạc nền tảng'},
        {ul:['7 nốt cơ bản: Đồ – Rê – Mi – Fa – Son – La – Si – Đố','Khuông nhạc có 5 dòng kẻ song song và 4 khe','Số nhịp 2/4, 3/4, 4/4 cho biết số phách trong một ô nhịp']},
        {piano:true},
        {rhythm:true},
        {match:{title:'Nối tên nốt tiếng Việt với kí hiệu quốc tế',pairs:[['Đồ','C'],['Rê','D'],['Mi','E'],['Fa','F'],['Son','G'],['La','A'],['Si','B']]}},
        {mcq:[{q:'Khuông nhạc có mấy dòng kẻ chính?',o:['5 dòng','4 dòng','7 dòng','3 dòng'],a:0,fb:'Khuông nhạc gồm 5 dòng kẻ song song và 4 khe để ghi nốt.'}]}]},
      {ic:'🖌️',name:'Mỹ thuật',rd:'Pha màu & vẽ tự do.',panel:[
        {h:'Nguyên lí màu sắc'},
        {ul:['3 màu cơ bản: Đỏ – Vàng – Lam (không pha từ màu khác)','Pha 2 màu cơ bản tạo ra màu thứ cấp: Cam, Lục, Tím','Đậm – nhạt tạo khối và chiều sâu cho tác phẩm']},
        {mixer:true},
        {draw:true}]},
      {ic:'👀',name:'Cảm thụ nghệ thuật',rd:'Quan sát & cảm nhận tác phẩm.',panel:[
        {h:'Cách quan sát một tác phẩm'},
        {order:{title:'Sắp xếp 4 bước quan sát một tác phẩm nghệ thuật',items:['Quan sát tổng thể: chủ đề, bố cục, không khí chung','Phân tích chi tiết: màu sắc, đường nét, sắc độ','Cảm nhận cảm xúc tác phẩm gợi lên trong em','Diễn đạt cảm nhận bằng lời của chính em']}},
        {note:'Không có cảm nhận "sai" — quan trọng là biết quan sát kĩ và diễn đạt được suy nghĩ riêng.'}]},
      // Pixel Art Studio — sáng tạo digital art cho HS THCS
      {ic:'🎨',name:'Pixel Art Studio',rd:'Studio vẽ pixel art 16×16/32×32 với 16 màu, undo/redo, flood-fill, share PNG.',href:'/pixel-art-studio.html'}],
    skills:['Chơi đàn cơ bản','Cảm thụ thẩm mỹ','Pha màu & vẽ tự do'],
    quiz:[{q:'Ba màu cơ bản là?',o:['Đỏ, vàng, lam','Đỏ, lục, lam','Cam, tím, lục','Đen, trắng, xám'],a:0},
      {q:'Nhịp 4/4 có mấy phách trong một ô nhịp?',o:['4 phách','2 phách','3 phách','1 phách'],a:0},
      {q:'Pha màu vàng với lam được màu?',o:['Lục (xanh lá)','Cam','Tím','Nâu'],a:0}]},

  admin:{emoji:'🏫',name:'Phòng Hiệu bộ',accent:'#64748b',intro:'Khu điều hành nhà trường: nội quy, bảng tin, sơ đồ trường và nơi gửi ý kiến đề xuất.',
    rooms:[{ic:'📊',name:'Bảng điều khiển học tập',rd:'Theo dõi tiến độ & thành tích.',href:'/dashboard.html'},
      {ic:'📜',name:'Nội quy học sinh',rd:'Tự kiểm việc thực hiện nội quy.',panel:[
        {h:'Nội quy cơ bản của học sinh THCS'},
        {check:['Đi học đúng giờ, mặc đồng phục đúng quy định','Lễ phép với thầy cô, hoà nhã với bạn bè','Giữ gìn vệ sinh trường lớp, bảo vệ của công','Học bài & làm bài đầy đủ trước khi đến lớp','Không sử dụng điện thoại sai quy định trong giờ học']},
        {note:'Thực hiện tốt nội quy giúp lớp học kỉ luật, thân thiện và an toàn.'}]},
      {ic:'🏛️',name:'Ban điều hành AI',rd:'Đề xuất cải tiến cho nhà trường & bình chọn.',board:true},
      {ic:'🗺️',name:'Sơ đồ trường',rd:'Các khu trong khuôn viên.',panel:[
        {h:'Khuôn viên Trường THCS'},
        {ul:['Dãy phòng học theo khối lớp 6 – 7 – 8 – 9','Phòng học bộ môn: KHTN, Tin học, Ngoại ngữ, Nghệ thuật, Công nghệ','Khu hỗ trợ: Thư viện, Phòng Y tế, Phòng Đoàn – Đội, Phòng truyền thống','Khu thể chất: Nhà đa năng, sân bóng đá, sân bóng rổ','Sân chào cờ, vườn trường, căng tin & bãi xe đạp']},
        {note:'Bấm từng toà nhà trên bản đồ khuôn viên để vào không gian học tương ứng.'}]},
      // Cây Tri Thức — dashboard cá nhân của HS THCS, đặt ở Hiệu bộ là entry chính
      {ic:'🌳',name:'Cây Tri Thức của em',rd:'Trực quan hoá tiến độ học: mỗi tuần hoàn thành = 1 lá xanh. Lá đầy đủ → cây xum xuê!',href:'/cay-tri-thuc.html'},
      {ic:'🏆',name:'Bảng Phong Thần Tizia',rd:'Xếp hạng học tập theo tuần / tháng / mọi thời điểm — đặt mục tiêu lên top!',href:'/bang-phong-than.html'}],
    skills:['Hiểu nội quy nhà trường','Tham gia xây dựng trường lớp'],
    quiz:[{q:'Khi đến lớp, học sinh nên?',o:['Đi học đúng giờ, chuẩn bị bài đầy đủ','Đến muộn cũng được','Bỏ đồng phục','Không cần soạn bài'],a:0},
      {q:'Của công trong trường (bàn ghế, thiết bị) cần được?',o:['Giữ gìn & bảo vệ','Vẽ bậy lên','Dùng tuỳ tiện rồi bỏ','Mang về nhà'],a:0},
      {q:'Muốn đề xuất hoạt động cho trường, em gửi qua?',o:['Hộp thư góp ý / Ban điều hành','Không thể đề xuất','Tự ý tổ chức','Chỉ than phiền với bạn'],a:0}]},

  library:{emoji:'📚',name:'Thư viện',accent:'#b59b6a',intro:'Không gian đọc và tự học: tra cứu sách, rèn văn hoá đọc và phương pháp học hiệu quả.',
    rooms:[{ic:'🔎',name:'Kĩ năng đọc sách',rd:'Đọc hiểu & ghi chép.',panel:[
        {h:'Đọc sách hiệu quả'},
        {ol:['Đọc lướt tên chương, mục lục để nắm tổng thể','Đọc kĩ, gạch chân ý chính & từ khoá','Ghi chú ngắn theo cách hiểu của mình','Tự đặt câu hỏi & tóm tắt lại sau khi đọc']},
        {note:'Sơ đồ tư duy (mind map) giúp hệ thống kiến thức một chương chỉ trong một trang.'}]},
      {ic:'📖',name:'Góc đọc gợi ý',rd:'Sách hay cho tuổi THCS.',panel:[
        {h:'Một số thể loại nên đọc'},
        {cards:[{ic:'📕',t:'Văn học',d:'Truyện, thơ trong & ngoài chương trình.'},
          {ic:'🔬',t:'Khoa học – khám phá',d:'Sách kiến thức tự nhiên, vũ trụ.'},
          {ic:'🌏',t:'Lịch sử – địa lí',d:'Hiểu thêm về đất nước & thế giới.'},
          {ic:'🧠',t:'Kĩ năng sống',d:'Giao tiếp, quản lí thời gian, cảm xúc.'}]},
        {note:'Đọc mỗi ngày 15–20 phút giúp mở rộng vốn từ và vốn sống.'}]},
      {ic:'🧠',name:'Phương pháp học',rd:'Học ít mà nhớ lâu.',panel:[
        {h:'Mẹo học hiệu quả'},
        {ul:['Lặp lại ngắt quãng: ôn lại sau 1 ngày, 1 tuần','Pomodoro: 25 phút học – 5 phút nghỉ','Tự kiểm tra (làm bài) thay vì chỉ đọc lại','Dạy lại cho bạn là cách hiểu sâu nhất']},
        {note:'Tự kiểm tra (retrieval practice) giúp nhớ lâu hơn đọc đi đọc lại.'}]}],
    skills:['Đọc – hiểu & ghi chép','Phương pháp tự học'],
    quiz:[{q:'Công cụ hệ thống kiến thức bằng sơ đồ nhánh gọi là?',o:['Sơ đồ tư duy (mind map)','Bảng cửu chương','Thời khoá biểu','Từ điển'],a:0},
      {q:'Cách ghi nhớ lâu nhất là?',o:['Tự kiểm tra & ôn ngắt quãng','Đọc lướt một lần','Học dồn trước khi thi','Chép lại thật nhiều'],a:0},
      {q:'Trong thư viện, học sinh cần?',o:['Giữ trật tự & bảo quản sách','Nói chuyện to','Gấp mép, viết bậy vào sách','Mang sách về không trả'],a:0}]},

  tradition:{emoji:'🏆',name:'Phòng truyền thống',accent:'#d97706',intro:'Nơi lưu giữ lịch sử, thành tích và những tấm gương sáng của nhà trường.',
    rooms:[{ic:'🏛️',name:'Lịch sử nhà trường',rd:'Dòng thời gian phát triển.',panel:[
        {h:'Chặng đường nhà trường'},
        {timeline:[{t:'Thành lập',d:'Trường ra đời, những lớp học sinh đầu tiên.'},
          {t:'Xây dựng & phát triển',d:'Mở rộng phòng học bộ môn, sân chơi, thư viện.'},
          {t:'Phong trào thi đua',d:'Học tốt – dạy tốt, các câu lạc bộ và hoạt động Đội.'},
          {t:'Hôm nay',d:'Trường học thân thiện, học sinh tích cực, chuyển đổi số.'}]}]},
      {ic:'🥇',name:'Thành tích nổi bật',rd:'Giải thưởng & danh hiệu.',panel:[
        {cards:[{ic:'🏅',t:'Học sinh giỏi',d:'Giải các kì thi cấp huyện, tỉnh.'},
          {ic:'⚽',t:'Thể thao',d:'Giải bóng đá, điền kinh học đường.'},
          {ic:'🎭',t:'Văn nghệ',d:'Hội diễn, các hoạt động phong trào.'},
          {ic:'🌱',t:'Vì cộng đồng',d:'Kế hoạch nhỏ, bảo vệ môi trường.'}]},
        {note:'Mỗi tấm huy chương là công sức của thầy trò qua nhiều thế hệ.'}]},
      {ic:'🌟',name:'Gương sáng',rd:'Học sinh & thầy cô tiêu biểu.',panel:[
        {ul:['Học sinh vượt khó học giỏi, gương người tốt việc tốt','Thầy cô tận tâm với nghề, hết lòng vì học sinh','Cựu học sinh thành đạt quay về đóng góp cho trường']},
        {note:'Noi gương người tốt là cách rèn luyện bản thân mỗi ngày.'}]},
      // Bảng Phong Thần — đặt ở Phòng truyền thống vì là nơi ghi danh học sinh giỏi
      {ic:'🏆',name:'Bảng Phong Thần Tizia',rd:'Xếp hạng học tập theo tuần / tháng / mọi thời kỳ. Trở thành cao thủ luyện thi!',href:'/bang-phong-than.html'}],
    skills:['Tự hào truyền thống','Noi gương người tốt'],
    quiz:[{q:'Phòng truyền thống dùng để?',o:['Lưu giữ lịch sử & thành tích nhà trường','Học thể dục','Ăn trưa','Để xe đạp'],a:0},
      {q:'"Kế hoạch nhỏ" là phong trào?',o:['Thu gom giấy vụn/phế liệu gây quỹ Đội','Thi chạy','Thi hát','Thi vẽ'],a:0},
      {q:'Thái độ đúng với truyền thống nhà trường?',o:['Tự hào & giữ gìn, phát huy','Thờ ơ','Chê bai','Quên lãng'],a:0}]},

  youthunion:{emoji:'🚩',name:'Phòng Đoàn – Đội',accent:'#ef4444',intro:'Đội Thiếu niên Tiền phong Hồ Chí Minh: rèn luyện, sinh hoạt tập thể và kĩ năng sống.',
    rooms:[{ic:'⭐',name:'5 điều Bác Hồ dạy',rd:'Kim chỉ nam của thiếu nhi.',panel:[
        {h:'5 điều Bác Hồ dạy thiếu niên, nhi đồng'},
        {ol:['Yêu Tổ quốc, yêu đồng bào','Học tập tốt, lao động tốt','Đoàn kết tốt, kỉ luật tốt','Giữ gìn vệ sinh thật tốt','Khiêm tốn, thật thà, dũng cảm']},
        {note:'Đây là lời dạy của Bác Hồ dành cho thiếu nhi Việt Nam — đội viên luôn ghi nhớ và làm theo.'}]},
      {ic:'🎒',name:'Hoạt động Đội',rd:'Phong trào & sinh hoạt.',panel:[
        {cards:[{ic:'🧹',t:'Kế hoạch nhỏ',d:'Thu gom phế liệu gây quỹ giúp bạn.'},
          {ic:'🤝',t:'Đôi bạn cùng tiến',d:'Giúp nhau học tập tiến bộ.'},
          {ic:'🌳',t:'Vì môi trường',d:'Trồng cây, giữ trường xanh – sạch – đẹp.'},
          {ic:'🏕️',t:'Sinh hoạt tập thể',d:'Trò chơi, cắm trại, văn nghệ.'}]},
        {note:'Hoạt động Đội rèn tinh thần đoàn kết, trách nhiệm và kĩ năng làm việc nhóm.'}]},
      {ic:'💪',name:'Kĩ năng sống',rd:'Ứng xử & tự bảo vệ.',panel:[
        {mcq:[{q:'Thấy bạn bị bắt nạt ở trường, em nên?',o:['Can ngăn nếu an toàn & báo thầy cô','Quay video đăng mạng','Hùa theo trêu chọc','Mặc kệ, không liên quan'],a:0,fb:'Không thờ ơ với bạo lực học đường: hỗ trợ bạn & báo người lớn để được giúp đỡ.'},
          {q:'Để làm việc nhóm hiệu quả, cần?',o:['Lắng nghe, phân công & tôn trọng ý kiến','Tự làm hết một mình','Ai nói to thì nghe','Tranh cãi cho thắng'],a:0,fb:'Làm việc nhóm tốt: phân công rõ, lắng nghe và tôn trọng lẫn nhau.'}]}]},
      // Pet Tri Thức — linh vật Đội. THCS thì pet đã ở stage "teen"
      {ic:'🐉',name:'Tiziamon — linh vật của em',rd:'Pet Tri Thức tiến hoá theo XP. Sinh hoạt Đội đều đặn → Pet thành dragon!',href:'/pet-tri-thuc.html?grade=thcs'}],
    skills:['Tinh thần đồng đội','Kĩ năng sống tích cực'],
    quiz:[{q:'Điều thứ hai trong 5 điều Bác Hồ dạy?',o:['Học tập tốt, lao động tốt','Yêu Tổ quốc, yêu đồng bào','Khiêm tốn, thật thà, dũng cảm','Giữ gìn vệ sinh thật tốt'],a:0},
      {q:'Tên đầy đủ của Đội?',o:['Đội Thiếu niên Tiền phong Hồ Chí Minh','Đoàn Thanh niên','Hội Sinh viên','Hội Chữ thập đỏ'],a:0},
      {q:'Khi gặp bạn gặp khó khăn trong học tập, đội viên nên?',o:['Giúp đỡ bạn cùng tiến bộ','Chê bai bạn','Lờ đi','Cười nhạo'],a:0}]},

  gym:{emoji:'🤸',name:'Nhà đa năng',accent:'#f59e0b',intro:'Khu giáo dục thể chất: vận động an toàn, rèn sức khoẻ và tinh thần thể thao.',
    rooms:[{ic:'🏃',name:'Giáo dục thể chất',rd:'Vận động & rèn luyện.',panel:[
        {h:'Vì sao cần vận động?'},
        {ul:['Tập thể dục đều giúp khoẻ mạnh, tăng chiều cao, dẻo dai','Rèn sự nhanh nhẹn, khéo léo và tinh thần kỉ luật','Thể thao đồng đội rèn sự đoàn kết & fair-play']},
        {note:'Tổ chức Y tế khuyến nghị trẻ vận động ít nhất 60 phút mỗi ngày.'}]},
      {ic:'🤸',name:'Khởi động an toàn',rd:'Tránh chấn thương khi tập.',panel:[
        {h:'Trình tự một buổi tập an toàn'},
        {check:['Khởi động làm nóng 5–10 phút trước khi tập','Uống đủ nước, mặc trang phục thể thao phù hợp','Tập đúng kĩ thuật, tăng cường độ từ từ','Thả lỏng (giãn cơ) sau khi tập','Dừng ngay nếu thấy đau hoặc chóng mặt']},
        {note:'Bỏ qua khởi động dễ gây căng cơ, bong gân — luôn làm nóng trước khi vận động mạnh.'}]},
      {ic:'⛑️',name:'Xử lí chấn thương',rd:'Sơ cứu khi tập luyện.',panel:[
        {mcq:[{q:'Bạn bị bong gân cổ chân khi chơi bóng. Sơ cứu đúng?',o:['Nghỉ, chườm lạnh, băng ép & kê cao chân (R.I.C.E)','Xoa dầu nóng & tập tiếp','Bẻ khớp cho "vào"','Chườm nóng ngay'],a:0,fb:'Nguyên tắc R.I.C.E: Rest – Ice – Compression – Elevation; tránh chườm nóng giai đoạn đầu.'}]}]}],
    skills:['Vận động an toàn','Tinh thần thể thao'],
    quiz:[{q:'Trước khi vận động mạnh cần?',o:['Khởi động làm nóng cơ thể','Ăn thật no','Nhịn nước','Tập ngay hết sức'],a:0},
      {q:'R.I.C.E khi bong gân gồm: Nghỉ, Chườm lạnh, Băng ép và?',o:['Kê cao vùng bị thương','Chườm nóng','Xoa bóp mạnh','Vận động tiếp'],a:0},
      {q:'Tinh thần "fair-play" nghĩa là?',o:['Chơi đẹp, trung thực, tôn trọng luật & đối thủ','Thắng bằng mọi giá','Chơi xấu','Bỏ cuộc giữa chừng'],a:0}]},

  tech:{emoji:'🔧',name:'Phòng Công nghệ – STEM',accent:'#0891b2',intro:'Môn Công nghệ & hoạt động STEM: kĩ thuật đời sống, an toàn điện và làm dự án sáng tạo.',
    rooms:[{ic:'🏠',name:'Công nghệ đời sống',rd:'Trồng trọt, gia đình, kĩ thuật.',panel:[
        {h:'Công nghệ THCS gồm những gì?'},
        {ul:['Lớp 6–7: trồng trọt, chăn nuôi, nhà ở & đồ dùng gia đình','Lớp 8: vẽ kĩ thuật, cơ khí, vật liệu','Lớp 9: kĩ thuật điện & định hướng nghề nghiệp']},
        {note:'Công nghệ giúp vận dụng kiến thức vào việc thật trong cuộc sống.'}]},
      {ic:'⚡',name:'An toàn điện',rd:'Phòng tránh tai nạn điện.',panel:[
        {mcq:[{q:'Thấy dây điện đứt rơi xuống đường ngập nước, em nên?',o:['Tránh xa & báo người lớn/điện lực, không lại gần','Nhặt dây lên','Lội qua cho nhanh','Lấy tay kéo dây ra'],a:0,fb:'Nước dẫn điện — tuyệt đối tránh xa dây điện đứt và báo ngay người lớn/cơ quan điện lực.'},
          {q:'Trước khi sửa/chạm thiết bị điện trong nhà cần?',o:['Ngắt nguồn điện (cầu dao/aptomat)','Cứ chạm vì điện yếu','Đi chân trần cho mát','Dùng tay ướt'],a:0,fb:'Luôn ngắt nguồn điện trước khi thao tác; không dùng tay ướt chạm thiết bị điện.'}]}]},
      {ic:'🛠️',name:'Dự án STEM',rd:'Học qua làm sản phẩm.',panel:[
        {h:'Quy trình làm dự án STEM'},
        {order:{title:'Sắp xếp 5 bước quy trình làm dự án STEM',items:['Xác định vấn đề thực tế cần giải quyết','Lên ý tưởng & phác thảo giải pháp','Chế tạo mô hình/sản phẩm thử','Thử nghiệm, đánh giá & cải tiến','Trình bày & chia sẻ kết quả']}},
        {note:'STEM = Science, Technology, Engineering, Math — học gắn với giải quyết vấn đề thật.'}]},
      {ic:'🌾',name:'Trồng cây ở vườn trường',rd:'Vận dụng kiến thức trồng trọt.',panel:[
        {ul:['Chọn cây phù hợp khí hậu & mùa vụ','Làm đất, gieo trồng, tưới nước & chăm sóc','Theo dõi sự sinh trưởng, ghi nhật kí cây trồng']},
        {note:'Vườn trường là nơi thực hành trồng trọt & quan sát thực vật ngoài giờ học.'}]}],
    skills:['Kĩ thuật đời sống','Tư duy làm dự án (STEM)'],
    quiz:[{q:'STEM là viết tắt của các lĩnh vực?',o:['Khoa học, Công nghệ, Kĩ thuật, Toán học','Thể thao & Nghệ thuật','Sử & Địa','Văn & Anh'],a:0},
      {q:'Khi sửa thiết bị điện, việc đầu tiên là?',o:['Ngắt nguồn điện','Dùng tay ướt thử','Bật to công suất','Gọi bạn đến xem'],a:0},
      {q:'Bước cuối của một dự án STEM thường là?',o:['Trình bày & chia sẻ kết quả','Bỏ dở','Giấu sản phẩm','Không kiểm tra'],a:0}]},

  medical:{emoji:'⛑️',name:'Phòng Y tế',accent:'#e23b3b',intro:'Chăm sóc sức khoẻ học đường: sơ cứu cơ bản, vệ sinh phòng bệnh và dinh dưỡng tuổi học trò.',
    rooms:[{ic:'🩹',name:'Sơ cứu cơ bản',rd:'Xử lí tình huống thường gặp.',panel:[
        {h:'Sơ cứu vết thương nhỏ'},
        {ol:['Rửa tay sạch trước khi sơ cứu','Rửa vết thương dưới vòi nước sạch','Sát khuẩn nhẹ quanh vết thương','Băng lại bằng gạc/băng cá nhân','Vết thương sâu/chảy nhiều máu → báo người lớn, tới cơ sở y tế']},
        {order:{title:'Sắp xếp 5 bước sơ cứu vết thương nhỏ',items:['Rửa tay sạch trước khi sơ cứu','Rửa vết thương dưới vòi nước sạch','Sát khuẩn nhẹ quanh vết thương','Băng lại bằng gạc/băng cá nhân','Vết thương sâu/chảy nhiều máu → báo người lớn, tới cơ sở y tế']}},
        {mcq:[{q:'Bạn bị chảy máu cam (máu mũi). Xử lí đúng?',o:['Ngồi cúi nhẹ đầu về trước, bóp cánh mũi 5–10 phút','Ngửa cổ ra sau','Nhét giấy thật sâu vào mũi','Nằm ngửa ngay'],a:0,fb:'Chảy máu cam: cúi nhẹ về trước & bóp cánh mũi; ngửa cổ khiến máu chảy xuống họng.'}]}]},
      {ic:'🧼',name:'Vệ sinh & phòng bệnh',rd:'Thói quen giữ sức khoẻ.',panel:[
        {h:'Thói quen tốt mỗi ngày'},
        {check:['Rửa tay bằng xà phòng trước khi ăn & sau khi đi vệ sinh','Ăn chín, uống sôi, ăn đủ chất','Ngủ đủ 8–10 tiếng mỗi đêm','Vận động & nghỉ mắt khi học lâu','Đeo khẩu trang khi bị ho/sốt để tránh lây cho bạn']},
        {note:'Rửa tay đúng cách là biện pháp đơn giản mà hiệu quả nhất để phòng nhiều bệnh.'}]},
      {ic:'🥗',name:'Dinh dưỡng tuổi học trò',rd:'Ăn đúng để học tốt.',panel:[
        {ul:['Ăn đủ 4 nhóm: bột đường, đạm, béo, vitamin & khoáng','Ăn sáng đầy đủ giúp tập trung học buổi sáng','Hạn chế đồ ngọt, nước có ga & đồ ăn nhanh','Uống đủ nước (khoảng 1,5–2 lít/ngày)']},
        {note:'Bỏ bữa sáng khiến mệt mỏi, khó tập trung — đây là bữa quan trọng với học sinh.'}]},
      {ic:'🧠',name:'Sức khoẻ tâm lí',rd:'Khi thấy buồn, lo lắng.',panel:[
        {mcq:[{q:'Khi gặp chuyện buồn/áp lực kéo dài, em nên?',o:['Chia sẻ với bố mẹ, thầy cô hoặc người tin cậy','Giữ kín & một mình chịu đựng','Bỏ học','Trút giận lên người khác'],a:0,fb:'Chia sẻ cảm xúc với người tin cậy giúp giải toả và tìm được hướng giải quyết.'}]}]}],
    skills:['Sơ cứu & tự chăm sóc','Lối sống lành mạnh'],
    quiz:[{q:'Khi chảy máu cam, tư thế đúng là?',o:['Cúi nhẹ đầu về phía trước','Ngửa cổ ra sau','Nằm ngửa','Nhảy lên xuống'],a:0},
      {q:'Bữa ăn quan trọng giúp tập trung buổi sáng?',o:['Bữa sáng','Bữa khuya','Ăn vặt','Không cần ăn'],a:0},
      {q:'Cách phòng bệnh đơn giản & hiệu quả nhất?',o:['Rửa tay bằng xà phòng','Nhịn ăn','Thức khuya','Ít vận động'],a:0}]},

  canteen:{emoji:'🍜',name:'Căng tin',accent:'#fb7185',intro:'Nơi nghỉ ngơi, ăn uống giữa giờ và rèn nếp sống văn minh, lành mạnh.',
    rooms:[{ic:'⏱️',name:'Mini-game ôn nhanh',rd:'Giải trí & ôn bài.',href:'/time-attack.html'},
      {ic:'🥪',name:'Ăn uống lành mạnh',rd:'Chọn món tốt cho sức khoẻ.',panel:[
        {h:'Ăn vặt thông minh'},
        {ul:['Ưu tiên trái cây, sữa, bánh mì thay vì đồ chiên/ngọt nhiều','Hạn chế nước ngọt có ga, đồ ăn nhanh','Không bỏ bữa chính để ăn quà vặt','Giữ vệ sinh: rửa tay trước khi ăn']},
        {note:'Ăn uống cân bằng giúp đủ năng lượng học cả ngày mà không mệt mỏi.'}]},
      {ic:'☕',name:'Góc thư giãn',rd:'Nghỉ ngơi & mẹo học.',panel:[
        {h:'Nghỉ giải lao đúng cách'},
        {ul:['Đứng dậy vận động nhẹ, nhìn xa cho đỡ mỏi mắt (quy tắc 20–20–20)','Trò chuyện vui vẻ với bạn bè','Uống nước, hít thở sâu để thư giãn']},
        {note:'Nghỉ ngơi hợp lí giữa giờ giúp tiết học sau tiếp thu tốt hơn.'}]},
      {ic:'🤝',name:'Văn minh nơi công cộng',rd:'Ứng xử nơi đông người.',panel:[
        {mcq:[{q:'Ở căng tin đông người, hành vi văn minh là?',o:['Xếp hàng, giữ trật tự & bỏ rác đúng nơi','Chen lấn cho nhanh','Vứt rác xuống sàn','Nói to, đùa giỡn quá mức'],a:0,fb:'Xếp hàng, giữ vệ sinh và tôn trọng người khác là nếp sống văn minh nơi công cộng.'}]}]}],
    skills:['Ăn uống lành mạnh','Ứng xử văn minh'],
    quiz:[{q:'Đồ ăn vặt nên ưu tiên?',o:['Trái cây, sữa','Nước ngọt có ga','Đồ chiên rán','Kẹo ngọt'],a:0},
      {q:'Quy tắc nghỉ mắt khi học/nhìn màn hình lâu?',o:['20–20–20 (mỗi 20 phút nhìn xa 20 feet trong 20 giây)','Nhìn liên tục không nghỉ','Nhắm mắt cả buổi','Dụi mắt thật mạnh'],a:0},
      {q:'Sau khi ăn ở căng tin, em nên?',o:['Dọn & bỏ rác đúng nơi quy định','Để rác lại trên bàn','Vứt xuống sàn','Đổ thức ăn thừa bừa bãi'],a:0}]},
};

// ============================================================
// TRƯỜNG CÔNG NGHỆ THÔNG TIN — không gian bên trong mỗi toà nhà
// (keyed theo building.id của campus IT trong b-iso-canvas.html)
// ============================================================
const SPACES_IT = {
  admin:{emoji:'⚙️',name:'Hành chính – Hiệu bộ',accent:'#94a3b8',intro:'Trung tâm điều hành Trường CNTT: theo dõi tiến độ, chương trình đào tạo 4 năm, hướng nghiệp và tiếp nhận yêu cầu cải tiến.',
    rooms:[{ic:'📊',name:'Bảng điều khiển',rd:'Tiến độ, điểm, huy hiệu.',href:'/dashboard.html'},
      {ic:'🏛️',name:'Ban điều hành AI',rd:'Gửi đề xuất cải tiến môn học/lab & bình chọn.',board:true},
      {ic:'🧭',name:'Hướng nghiệp CNTT',rd:'Các vị trí nghề nghiệp.',panel:[
        {h:'Một tấm bằng CNTT — nhiều hướng đi'},
        {cards:[{ic:'👨‍💻',t:'Software Engineer',d:'Phát triển phần mềm, web, hệ thống.'},
          {ic:'📊',t:'Data Scientist',d:'Phân tích dữ liệu, mô hình ML.'},
          {ic:'☁️',t:'DevOps / SRE',d:'CI/CD, hạ tầng, vận hành cloud.'},
          {ic:'🔒',t:'Security Engineer',d:'Bảo mật, pentest, ứng cứu sự cố.'},
          {ic:'📱',t:'Mobile Developer',d:'Ứng dụng Android/iOS.'},
          {ic:'🤖',t:'AI/ML Engineer',d:'Huấn luyện & triển khai mô hình AI.'}]},
        {note:'Chọn hướng theo thế mạnh — đặt mục tiêu học phù hợp ở Ký túc xá.'}]},
      // Cây Tri Thức + Bảng Phong Thần — SV CNTT cũng cần dashboard cá nhân
      {ic:'🌳',name:'Cây Tri Thức của em',rd:'Trực quan hoá tiến độ 4 năm CNTT — mỗi môn hoàn thành = 1 lá.',href:'/cay-tri-thuc.html'},
      {ic:'🏆',name:'Bảng Phong Thần',rd:'Xếp hạng SV CNTT theo điểm tổng + thành tích hackathon.',href:'/bang-phong-than.html'}],
    skills:['Hiểu chương trình đào tạo','Định hướng nghề nghiệp CNTT'],
    quiz:[{q:'Cử nhân CNTT ở Việt Nam thường đào tạo mấy năm?',o:['3 năm','4 năm','5 năm','6 năm'],a:1},
      {q:'Môn lập trình nhập môn phổ biến hiện nay hay dùng ngôn ngữ?',o:['Python','COBOL','Assembly','Fortran'],a:0},
      {q:'Khoá luận tốt nghiệp thường nằm ở năm nào?',o:['Năm 1','Năm 2','Năm 4','Không có'],a:2}]},

  lecture:{emoji:'🏛️',name:'Giảng đường',accent:'#c2703d',intro:'Học lý thuyết nền tảng ngành CNTT: bài giảng, thuật ngữ tiếng Anh và kiểm tra nhanh.',
    rooms:[
      // Chương trình đào tạo Cử nhân CNTT 4 năm (req #107) — chuyển từ Hành chính về
      // Giảng Đường theo đề xuất SV; trang riêng dạng bậc thang tiến trình.
      {ic:'🎓',name:'Chương trình đào tạo Cử nhân CNTT',rd:'Lộ trình 4 năm dạng bậc thang: mỗi môn có lý thuyết + ví dụ code + nguồn tự học.',href:'/it-curriculum.html?domain=it'},
      {ic:'🐍',name:'Thực hành Python',rd:'Đọc code & đoán kết quả.',panel:[{h:'Đọc hiểu code Python'},{p:'Chọn kết quả đúng cho từng đoạn code.'},{mcq:[{q:'print(2 ** 3) in ra gì?',o:['8','6','9','23'],a:0,fb:'** là phép luỹ thừa: 2^3 = 8.'},{q:'len("Tizia") trả về?',o:['8','7','9','Báo lỗi'],a:0,fb:'Chuỗi "Tizia" có 8 ký tự.'},{q:'[1,2,3][-1] trả về?',o:['3','1','-1','Báo lỗi'],a:0,fb:'Chỉ số âm đếm từ cuối: [-1] là phần tử cuối = 3.'}]}]},
      {ic:'📽️',name:'Bài giảng nền tảng',rd:'Các môn cốt lõi năm 1–2.',panel:[
        {h:'Các môn nền tảng'},
        {cards:[{ic:'🐍',t:'Lập trình (Python)',d:'Biến, vòng lặp, hàm, cấu trúc cơ bản.'},
          {ic:'🔢',t:'Toán rời rạc',d:'Logic, tập hợp, đồ thị, tổ hợp.'},
          {ic:'🖥️',t:'Kiến trúc máy tính',d:'CPU, bộ nhớ, nhị phân, hợp ngữ.'},
          {ic:'🐧',t:'Hệ điều hành',d:'Tiến trình, luồng, bộ nhớ, file system.'},
          {ic:'🌳',t:'CTDL & Giải thuật',d:'Mảng, danh sách, cây, sắp xếp, tìm kiếm.'},
          {ic:'🧩',t:'OOP',d:'Lớp, đối tượng, kế thừa, đa hình.'}]},
        {note:'Luyện các câu hỏi ở mục "Củng cố kiến thức" cuối trang để nắm cốt lõi trước khi vào lab.'}]},
      {ic:'🔤',name:'Tiếng Anh CNTT',rd:'Lật thẻ thuật ngữ Anh–Việt.',panel:[
        {p:'Lật thẻ ôn thuật ngữ tiếng Anh chuyên ngành.'},
        {flash:[{e:'🐞',f:'Bug',b:'Lỗi phần mềm'},{e:'🔁',f:'Loop',b:'Vòng lặp'},
          {e:'🧮',f:'Algorithm',b:'Thuật toán'},{e:'🗃️',f:'Database',b:'Cơ sở dữ liệu'},
          {e:'🔌',f:'API',b:'Giao diện lập trình ứng dụng'},{e:'☁️',f:'Deploy',b:'Triển khai (đưa lên chạy)'}]}]},
      {ic:'📖',name:'Đọc hiểu tiếng Anh chuyên ngành',rd:'Đọc đoạn văn theo chủ đề, chọn đáp án, nộp bài rồi xem đáp án + giải thích (req #82).',href:'/doc-hieu-tieng-anh.html?domain=it'},
      {ic:'⚖️',name:'Đạo đức nghề CNTT',rd:'Tình huống đạo đức số.',panel:[
        {h:'Đạo đức nghề nghiệp'},
        {mcq:[{q:'Khi debug, bạn vô tình truy cập được dữ liệu cá nhân người dùng. Nên?',o:['Không xem/sao chép, báo nhóm & xử lý theo quy định','Lưu lại để dùng sau','Đăng lên mạng cho vui','Bán cho bên thứ ba'],a:0,fb:'Tôn trọng quyền riêng tư & bảo mật dữ liệu là nguyên tắc cốt lõi (Nghị định 13/2023, GDPR).'},
          {q:'Bạn dùng đoạn mã nguồn mở giấy phép GPL trong sản phẩm. Cần?',o:['Tuân thủ điều khoản giấy phép (ghi nguồn, chia sẻ mã theo yêu cầu)','Xoá hết chú thích bản quyền','Coi như code của mình','Bỏ qua giấy phép'],a:0,fb:'Vi phạm giấy phép nguồn mở là vi phạm pháp lý — luôn đọc & tuân thủ LICENSE.'}]}]}],
    skills:['Nắm lý thuyết cốt lõi','Thuật ngữ tiếng Anh CNTT','Đạo đức nghề nghiệp'],
    quiz:[{q:'Trong Python, kiểu dữ liệu nào lưu cặp khoá–giá trị?',o:['list','dict','tuple','set'],a:1},
      {q:'Độ phức tạp của tìm kiếm nhị phân trên mảng đã sắp xếp?',o:['O(n)','O(log n)','O(n²)','O(1)'],a:1},
      {q:'Trình biên dịch (compiler) làm gì?',o:['Dịch mã nguồn sang mã máy/bytecode','Vẽ giao diện','Quản lý cơ sở dữ liệu','Gửi email'],a:0}]},

  library:{emoji:'📚',name:'Thư viện số',accent:'#93c5fd',intro:'Tra cứu tài liệu, đọc paper khoa học, học mã nguồn mở và rèn kỹ năng viết khoá luận CNTT.',
    rooms:[{ic:'🧭',name:'Lộ trình tự học',rd:'Roadmap kỹ năng CNTT.',panel:[{h:'Tự học CNTT hiệu quả'},{ul:['Chọn một hướng (web / AI / mobile / security) và bám lộ trình (vd roadmap.sh)','Học theo dự án: làm sản phẩm nhỏ thay vì chỉ xem video','Ghi chú & dạy lại (Feynman) để nhớ lâu','Tham gia cộng đồng: GitHub, diễn đàn, nhóm học']},{note:'Kiên trì đều đặn quan trọng hơn học dồn — mỗi ngày một chút.'}]},
      {ic:'🔎',name:'Kỹ năng tra cứu',rd:'Nguồn tin cậy cho dân lập trình.',panel:[
        {h:'Nguồn tra cứu đáng tin'},
        {ul:['Tài liệu chính thức (docs) của ngôn ngữ/framework','MDN Web Docs cho web; man pages cho Linux','Stack Overflow — đọc kỹ, kiểm chứng lại','Paper: Google Scholar, arXiv, IEEE Xplore, ACM DL']},
        {note:'Luôn kiểm chứng code chép từ mạng; ưu tiên tài liệu chính thức & đúng phiên bản.'}]},
      {ic:'📄',name:'Đọc paper khoa học',rd:'Cấu trúc & cách đọc nhanh.',panel:[
        {h:'Đọc một bài báo khoa học CNTT'},
        {ol:['Đọc Abstract + Kết luận để nắm ý chính','Xem Hình/Bảng & phần Kết quả','Đọc Phương pháp nếu cần tái lập','Ghi lại đóng góp chính & hạn chế']},
        {note:'Mẹo 3 lượt đọc: lướt → kỹ ý chính → chi tiết khi cần triển khai.'}]},
      {ic:'🐙',name:'Open Source Lab',rd:'Đóng góp mã nguồn mở.',panel:[
        {h:'Bắt đầu đóng góp open source'},
        {check:['Đọc README & CONTRIBUTING','Tìm issue gắn nhãn "good first issue"','Fork → tạo nhánh → commit nhỏ, rõ','Mở Pull Request kèm mô tả & test','Phản hồi review lịch sự, sửa theo góp ý']},
        {note:'Đóng góp open source là cách xây portfolio thật & học làm việc nhóm phân tán.'}]},
      {ic:'✍️',name:'Viết khoá luận',rd:'Cấu trúc IMRaD cho đề tài CNTT.',panel:[
        {h:'Cấu trúc khoá luận (IMRaD)'},
        {ol:['Introduction — bài toán & mục tiêu','Methods — kiến trúc hệ thống / thuật toán / thực nghiệm','Results — kết quả, benchmark, đánh giá','and Discussion — bàn luận, hạn chế, hướng phát triển']},
        {note:'Trích dẫn trung thực, tránh đạo văn (kể cả đạo code); quản lý tài liệu bằng Zotero/BibTeX.'}]}],
    skills:['Tra cứu & đọc tài liệu','Đóng góp open source','Viết học thuật'],
    quiz:[{q:'Hệ thống quản lý phiên bản phân tán phổ biến nhất?',o:['Git','SVN','FTP','Zip'],a:0},
      {q:'Pull Request dùng để?',o:['Đề xuất thay đổi mã để được review & hợp nhất','Tải dữ liệu về máy','Xoá nhánh','Khởi động server'],a:0},
      {q:'Nguồn nào đáng tin nhất khi học một thư viện mới?',o:['Tài liệu chính thức (official docs)','Bình luận ngẫu nhiên','Quảng cáo','Tin đồn'],a:0}]},

  hall:{emoji:'🎤',name:'Hội trường',accent:'#8b5cf6',intro:'Sự kiện, seminar công nghệ, kick-off hackathon và kết nối cộng đồng công nghệ.',
    rooms:[{ic:'🎙️',name:'Tech Talk & cộng đồng',rd:'Hội thảo, meetup, hội nghị.',panel:[{h:'Tham gia cộng đồng công nghệ'},{ul:['Tech talk & webinar: học từ kỹ sư đi trước','Meetup / Hackathon: kết nối & thực chiến','Hội nghị lớn: Google I/O, WWDC, GitHub Universe…','Đóng góp lại: viết blog, thuyết trình, mentor']},{mcq:[{q:'Lợi ích lớn nhất khi tham gia cộng đồng lập trình?',o:['Học hỏi, kết nối & cơ hội nghề nghiệp','Chỉ để cho vui','Không có lợi ích gì','Chỉ tốn thời gian'],a:0,fb:'Cộng đồng giúp cập nhật xu hướng, mở rộng quan hệ và tìm việc/mentor.'}]}]},
      {ic:'⚡',name:'Hackathon 48h',rd:'Quy trình một cuộc thi lập trình.',panel:[
        {h:'Sống sót qua một hackathon'},
        {timeline:[{t:'Hình thành ý tưởng',d:'Chọn bài toán nhỏ, có demo được trong 48h.'},
          {t:'Phân vai',d:'Frontend / backend / thuyết trình — chia rõ.'},
          {t:'MVP trước, đẹp sau',d:'Ưu tiên chạy được luồng chính.'},
          {t:'Pitch 3 phút',d:'Vấn đề → giải pháp → demo → tác động.'}]},
        {note:'Đừng ôm đồm: một tính năng chạy mượt hơn mười tính năng dở dang.'}]},
      {ic:'🎓',name:'Seminar công nghệ',rd:'Kỹ năng thuyết trình kỹ thuật.',panel:[
        {h:'Thuyết trình kỹ thuật hiệu quả'},
        {ul:['Mở đầu bằng vấn đề & vì sao quan trọng','Một slide một ý; sơ đồ hơn chữ','Demo trực tiếp nếu được (có phương án dự phòng)','Chuẩn bị trả lời câu hỏi phản biện']},
        {mcq:[{q:'Demo live có rủi ro hỏng. Cách phòng ngừa tốt nhất?',o:['Quay sẵn video demo dự phòng','Không demo gì cả','Đổ lỗi cho mạng','Bỏ qua phần hỏi đáp'],a:0,fb:'Luôn có video/screenshot dự phòng — sự cố mạng/máy chiếu là chuyện thường gặp.'}]}]}],
    skills:['Thuyết trình kỹ thuật','Làm việc nhóm','Tinh thần hackathon'],
    quiz:[{q:'MVP trong khởi nghiệp/hackathon nghĩa là?',o:['Minimum Viable Product — sản phẩm khả dụng tối thiểu','Most Valuable Player','Maximum Value Plan','Multi Version Product'],a:0},
      {q:'Khi pitch 3 phút, nên ưu tiên trình bày?',o:['Vấn đề → giải pháp → demo → tác động','Lịch sử công ty','Đọc toàn bộ code','Liệt kê mọi tính năng'],a:0},
      {q:'Yếu tố quan trọng nhất của một demo hackathon?',o:['Luồng chính chạy được & rõ ràng','Giao diện cực kỳ cầu kỳ','Nhiều màu sắc','Nhạc nền'],a:0}]},

  codelab:{emoji:'💻',name:'Lab Lập trình',accent:'#38bdf8',intro:'Phòng thực hành lập trình: viết code, debug, dùng Git và rèn thói quen clean code.',
    rooms:[
      // Lý thuyết nền tảng kiểu w3schools (req #106 Chu Thi Hue): mỗi module = Lý thuyết →
      // Ví dụ code → Lỗi thường gặp → Bài tập, ĐỌC TRƯỚC khi vào phòng thực hành bên dưới.
      {ic:'📖',name:'Python nhập môn — Lý thuyết (đọc trước khi code)',rd:'9 module w3schools: lý thuyết + ví dụ + lỗi thường gặp + bài tập.',panel:[
        {h:'Module 1 — Nền tảng: biến, kiểu dữ liệu, I/O'},
        {p:'Biến là "nơi giữ" dữ liệu trong bộ nhớ. Python dùng kiểu động: tự suy kiểu theo giá trị gán. 4 kiểu cơ bản: int, float, str, bool. input() luôn trả về CHUỖI — muốn tính toán phải ép kiểu bằng int() / float().'},
        {code:'ten = input("Nhập tên: ")\ntuoi = int(input("Nhập tuổi: "))  # ép chuỗi → số\nnam_sinh = 2026 - tuoi\nprint(f"Chào {ten}, có lẽ bạn sinh {nam_sinh}.")'},
        {note:'Lỗi thường gặp: quên ép kiểu input() → TypeError; nhầm = (gán) với == (so sánh); đặt tên biến trùng từ khoá (list, str).'},
        {ul:['Nhập chiều cao & cân nặng, tính BMI = cân nặng / (chiều cao)²','Nhập 2 số, in tổng/hiệu/tích/thương','Nhập giá tiền, tính giá sau giảm 15%']},
        {h:'Module 2 — Luồng điều khiển: if/elif/else, for/while'},
        {p:'Rẽ nhánh if/elif/else cho chương trình "ra quyết định" theo điều kiện. Vòng lặp for duyệt dãy có sẵn; while lặp tới khi điều kiện sai. Thụt lề (4 dấu cách) xác định khối lệnh.'},
        {code:'for i in range(1, 6):\n    if i % 2 == 0:\n        print(i, "chẵn")\n    else:\n        print(i, "lẻ")'},
        {note:'Lỗi thường gặp: quên cập nhật biến điều kiện trong while → vòng lặp vô hạn; sai thụt lề → IndentationError.'},
        {ul:['In bảng cửu chương của một số nhập vào','Đếm số chẵn từ 1 đến n','Tính tổng các số chia hết cho 3 nhỏ hơn 100']},
        {h:'Module 3 — Cấu trúc dữ liệu: list, tuple, dict, set'},
        {p:'list [] có thứ tự, sửa được; tuple () bất biến; dict {khoá: giá trị} tra cứu nhanh theo khoá; set {} tập hợp không trùng. Chọn đúng cấu trúc giúp code gọn và nhanh.'},
        {code:'sv = {"ten": "An", "diem": [8, 9, 7]}\nsv["diem"].append(10)\nprint(sum(sv["diem"]) / len(sv["diem"]))  # điểm trung bình'},
        {note:'Lỗi thường gặp: sửa tuple (bất biến) → TypeError; truy cập khoá dict không tồn tại → KeyError (dùng .get()).'},
        {ul:['Đếm số lần xuất hiện mỗi từ trong câu (dùng dict)','Loại phần tử trùng khỏi list (dùng set)','Sắp xếp danh sách sinh viên theo điểm']},
        {h:'Module 4 — Hàm & phạm vi biến'},
        {p:'Hàm gói một khối lệnh làm một việc, nhận tham số và trả về kết quả (return). Biến khai báo trong hàm là biến cục bộ (local), không thấy được bên ngoài.'},
        {code:'def dien_tich_hcn(dai, rong):\n    return dai * rong\n\nprint(dien_tich_hcn(5, 3))  # 15'},
        {note:'Lỗi thường gặp: quên return → hàm trả None; nhầm biến cục bộ với toàn cục.'},
        {ul:['Viết hàm đệ quy tính tổng 1..n','Viết 2 hàm chuyển Celsius↔Fahrenheit','Viết hàm kiểm tra số nguyên tố']},
        {h:'Module 5 — Chuỗi & xử lý văn bản'},
        {p:'Chuỗi là dãy ký tự bất biến. Các thao tác hay dùng: cắt lát s[a:b], .split(), .strip(), .lower()/.upper(), .replace(), nối bằng "+".'},
        {code:'cau = "  Xin chao Tizia  "\nprint(cau.strip().lower())        # "xin chao tizia"\nprint(cau.strip().split(" "))     # [\'Xin\', \'chao\', \'Tizia\']'},
        {note:'Lỗi thường gặp: chuỗi bất biến — s[0]="x" gây lỗi; quên .strip() làm so sánh sai vì khoảng trắng thừa.'},
        {ul:['Kiểm tra một chuỗi có phải palindrome','Đếm số nguyên âm trong chuỗi','Viết hoa chữ cái đầu mỗi từ']},
        {h:'Module 6 — Xử lý file & exception'},
        {p:'Dùng with open(...) để đọc/ghi file an toàn (tự đóng file). Bọc đoạn dễ lỗi trong try/except để chương trình không "chết" khi gặp dữ liệu sai.'},
        {code:'try:\n    with open("data.txt", "r", encoding="utf-8") as f:\n        for dong in f:\n            print(dong.strip())\nexcept FileNotFoundError:\n    print("Chưa có file dữ liệu.")'},
        {note:'Lỗi thường gặp: quên đóng file (nên dùng with); bắt except quá rộng che mất lỗi thật.'},
        {ul:['Ghi danh sách việc cần làm ra file, đọc lại khi mở lại','Đếm số dòng của một file văn bản','Nhập số an toàn: lặp lại tới khi người dùng nhập đúng']},
        {h:'Module 7 — Lập trình hướng đối tượng (class)'},
        {p:'class là "khuôn" mô tả một loại đối tượng: gộp dữ liệu (thuộc tính) và hành vi (phương thức). __init__ khởi tạo đối tượng; self trỏ tới chính đối tượng đó.'},
        {code:'class KhoanChi:\n    def __init__(self, ten, so_tien):\n        self.ten = ten\n        self.so_tien = so_tien\n    def mo_ta(self):\n        return f"{self.ten}: {self.so_tien}đ"\n\nc = KhoanChi("Ăn trưa", 35000)\nprint(c.mo_ta())'},
        {note:'Lỗi thường gặp: quên self trong phương thức; quên __init__ nên đối tượng thiếu thuộc tính.'},
        {ul:['Tạo class HinhChuNhat có phương thức tính diện tích/chu vi','Tạo class TaiKhoan có nạp/rút tiền','Tạo class SinhVien lưu tên + danh sách điểm']},
        {h:'Module 8 — Thư viện chuẩn thường dùng'},
        {p:'Python đi kèm nhiều thư viện sẵn: math (toán), random (ngẫu nhiên), datetime (ngày giờ), json (đọc/ghi JSON). Dùng import để nạp.'},
        {code:'import random, math\nprint(random.randint(1, 6))     # xúc xắc\nprint(math.sqrt(144))           # 12.0\nprint(math.gcd(48, 36))         # 12'},
        {note:'Lỗi thường gặp: đặt tên file trùng tên thư viện (vd random.py) làm import lỗi.'},
        {ul:['Viết trò tung xúc xắc 2 viên, thống kê tổng điểm','Tính khoảng cách 2 điểm bằng math','In ngày hôm nay theo định dạng dd/mm/yyyy']},
        {h:'Module 9 — Dự án tổng hợp: Quản lý chi tiêu'},
        {p:'Kết hợp toàn bộ kỹ năng: dùng list/dict lưu khoản chi, hàm tách chức năng (thêm/tổng/hiển thị theo danh mục), try/except nhập liệu an toàn, file lưu dữ liệu, class KhoanChi. Tiêu chí chấm: chạy không lỗi, code tổ chức rõ ràng, xử lý input sai.'},
        {note:'Đây là bài tổng hợp — hãy chia nhỏ thành các hàm, mỗi hàm một nhiệm vụ; kiểm thử từng phần trước khi ghép.'}]},
      {ic:'💻',name:'Code Lab — Python nhập môn (thực hành)',rd:'Đọc lý thuyết ở trên xong thì vào đây code: bài Python cơ bản, chấm trên NEU Codelab.',href:'/it-code-lab.html?domain=it&contest=325049'},
      {ic:'⚡',name:'Thử thách giải thuật',rd:'Giải nhanh bài nhỏ.',panel:[{h:'Khởi động tư duy lập trình'},{mcq:[{q:'Đảo ngược chuỗi "abc" được?',o:['"cba"','"abc"','"bca"','Báo lỗi'],a:0,fb:'Đảo ngược thứ tự: c-b-a.'},{q:'Tổng 1+2+…+100 bằng?',o:['5050','100','1000','5000'],a:0,fb:'Công thức n(n+1)/2 = 100×101/2 = 5050.'},{q:'Kiểm tra một số là chẵn dùng phép?',o:['n % 2 == 0','n / 2','n * 2','n + 2'],a:0,fb:'Số dư khi chia 2 bằng 0 ⇒ số chẵn.'}]}]},
      {ic:'🐞',name:'Quy trình debug',rd:'4 kỹ thuật cốt lõi + 5 đoạn code lỗi thật để luyện.',panel:[
        {h:'4 kỹ thuật debug cốt lõi'},
        {ul:['Đọc traceback TỪ DƯỚI LÊN — dòng lỗi cuối cùng mới là lỗi gốc','Print debugging — chèn print() ở điểm nghi ngờ để xem giá trị biến thực tế','Chia nhỏ để cô lập — tách đoạn nghi lỗi ra chạy riêng','Rubber duck — giải thích từng dòng cho "vịt nhựa", thường tự phát hiện lỗi logic']},
        {h:'Bài 1 — Lỗi cú pháp (SyntaxError)'},
        {code:'def tinh_tong(a, b)\n    return a + b'},
        {note:'Gợi ý: thiếu dấu ":" sau khai báo hàm → def tinh_tong(a, b):'},
        {h:'Bài 2 — Lỗi kiểu dữ liệu (TypeError)'},
        {code:'tuoi = input("Nhập tuổi: ")\ntuoi_sau_5_nam = tuoi + 5'},
        {note:'Gợi ý: input() trả về chuỗi — cần int(tuoi) trước khi cộng.'},
        {h:'Bài 3 — Lỗi logic (chạy được nhưng sai kết quả)'},
        {code:'def tinh_trung_binh(diem_list):\n    tong = 0\n    for d in diem_list:\n        tong = d      # sai: phải là tong += d\n    return tong / len(diem_list)'},
        {note:'Gợi ý: không có lỗi runtime nên traceback vô dụng — hãy print(tong) từng vòng để thấy nó bị GHI ĐÈ thay vì cộng dồn.'},
        {h:'Bài 4 — Lỗi chỉ số (IndexError)'},
        {code:'danh_sach = [1, 2, 3]\nprint(danh_sach[3])'},
        {note:'Gợi ý: chỉ số hợp lệ là 0, 1, 2 — chỉ số 3 vượt giới hạn.'},
        {h:'Bài 5 — Vòng lặp vô hạn'},
        {code:'i = 0\nwhile i < 10:\n    print(i)'},
        {note:'Gợi ý: thiếu i += 1 bên trong vòng lặp nên i luôn = 0.'}]},
      {ic:'🌿',name:'Git căn bản',rd:'Lật thẻ lệnh Git thường dùng.',panel:[
        {p:'Lật thẻ ôn các lệnh Git cốt lõi.'},
        {flash:[{e:'📥',f:'git clone',b:'Sao chép repo về máy'},{e:'➕',f:'git add',b:'Đưa thay đổi vào staging'},
          {e:'💾',f:'git commit',b:'Ghi lại một mốc thay đổi'},{e:'🌱',f:'git branch',b:'Tạo/xem nhánh'},
          {e:'🔀',f:'git merge',b:'Hợp nhất nhánh'},{e:'☁️',f:'git push',b:'Đẩy commit lên remote'}]}]},
      {ic:'✨',name:'Clean code',rd:'5 nguyên tắc so sánh "trước/sau" + bài refactor.',panel:[
        {h:'1. Đặt tên rõ nghĩa'},
        {code:'# Xấu\ndef f(x, y): return x * y * 0.1\n\n# Sạch\ndef tinh_hoa_hong(doanh_so, so_luong):\n    TY_LE = 0.1\n    return doanh_so * so_luong * TY_LE'},
        {h:'2. Hàm ngắn, làm MỘT việc'},
        {code:'# Xấu: một hàm ôm quá nhiều việc\ndef xu_ly_don_hang(dh): ... tính tiền ... kiểm kho ... gửi mail ...\n\n# Sạch: tách mỗi việc một hàm\ndef tinh_tong_tien(dh): ...\ndef kiem_tra_ton_kho(dh): ...\ndef gui_email_xac_nhan(dh): ...'},
        {h:'3. Tránh lặp code (DRY — Don\'t Repeat Yourself)'},
        {code:'# Xấu\ndt1 = 5 * 3\ndt2 = 8 * 4\n\n# Sạch\ndef dien_tich(dai, rong): return dai * rong\ndt1 = dien_tich(5, 3)\ndt2 = dien_tich(8, 4)'},
        {h:'4. Format nhất quán (PEP8)'},
        {ul:['Thụt lề 4 dấu cách, KHÔNG trộn tab với space','Hàm/biến snake_case, class PascalCase','Giới hạn độ dài dòng ~79–99 ký tự']},
        {h:'5. Comment giải thích "TẠI SAO", không phải "làm gì"'},
        {code:'# Xấu (thừa — code đã tự nói)\ni += 1  # tăng i lên 1\n\n# Sạch (nói điều code không tự nói được)\ni += 1  # bỏ qua dòng tiêu đề của file CSV'},
        {h:'🛠️ Bài tập refactor'},
        {code:'def calc(a, b, c):\n    if c == 1: return a + b\n    if c == 2: return a - b\n    if c == 3: return a * b\n    if c == 4: return a / b'},
        {note:'Yêu cầu: đổi tên hàm/biến rõ nghĩa, thay số magic (1,2,3,4) bằng hằng số/chuỗi có nghĩa ("cong","tru"…), và xử lý trường hợp chia cho 0.'}]}],
    skills:['Viết & debug code','Dùng Git','Thói quen clean code'],
    quiz:[{q:'Lệnh nào ghi lại một mốc thay đổi trong Git?',o:['git commit','git status','git log','git diff'],a:0},
      {q:'Nguyên tắc DRY nghĩa là?',o:['Do not Repeat Yourself — tránh lặp code','Delete Run Yearly','Data Read Yield','Debug Right Yet'],a:0},
      {q:'Cách tốt để lỗi đã sửa không tái phát?',o:['Viết test tự động cho trường hợp đó','Xoá file','Ẩn thông báo lỗi','Khởi động lại máy'],a:0}]},

  algolab:{emoji:'🌳',name:'Lab Giải thuật & CTDL',accent:'#4ade80',intro:'Cấu trúc dữ liệu và giải thuật: chọn đúng cấu trúc, phân tích độ phức tạp, luyện tư duy giải bài.',
    rooms:[{ic:'📊',name:'Trực quan giải thuật — xem từng bước',rd:'Bubble/Selection/Insertion/Merge/Quick chạy động: so sánh, hoán đổi, Big-O + củng cố.',href:'/it-algo-viz.html?domain=it'},
      {ic:'🧮',name:'Code Lab — CTDL & Giải thuật',rd:'6 bài Python (đệ quy, sắp xếp, hai con trỏ, GCD) — chấm trên NEU Codelab.',href:'/it-code-lab.html?domain=it&contest=255760'},
      // Code Quest — game block-based dành cho SV CNTT khởi động tư duy thuật toán
      {ic:'🤖',name:'Code Quest — sandbox tư duy',rd:'Block-based puzzle 10 level — luyện tư duy phân tích bài + cấu trúc lặp/rẽ nhánh.',href:'/code-quest.html'},
      {ic:'🧗',name:'Luyện giải bài',rd:'Chọn thuật toán & cấu trúc đúng.',panel:[{h:'Chọn đúng công cụ cho bài toán'},{mcq:[{q:'Tìm một phần tử trong MẢNG ĐÃ SẮP XẾP nhanh nhất bằng?',o:['Tìm kiếm nhị phân O(log n)','Duyệt tuyến tính O(n)','Sắp xếp lại rồi duyệt','Chọn ngẫu nhiên'],a:0,fb:'Mảng đã sắp xếp ⇒ binary search O(log n).'},{q:'Hàng đợi công việc xử lý theo thứ tự đến nên dùng?',o:['Queue (FIFO)','Stack (LIFO)','Mảng ngẫu nhiên','Cây nhị phân'],a:0,fb:'Đến trước xử lý trước ⇒ Queue.'},{q:'Liên tục lấy phần tử NHỎ NHẤT nên dùng?',o:['Min-heap (priority queue)','Mảng thường','Stack','Hash map'],a:0,fb:'Heap cho lấy min/max ở O(log n).'}]}]},
      {ic:'🧱',name:'Cấu trúc dữ liệu',rd:'Lật thẻ đặc điểm & ứng dụng.',panel:[
        {p:'Lật thẻ ôn các cấu trúc dữ liệu nền tảng.'},
        {flash:[{e:'📚',f:'Stack',b:'LIFO — vào sau ra trước (undo, đệ quy)'},{e:'🚶',f:'Queue',b:'FIFO — vào trước ra trước (hàng đợi)'},
          {e:'🗺️',f:'Hash map',b:'Tra cứu khoá trung bình O(1)'},{e:'🌲',f:'Binary tree',b:'Cây nhị phân — tìm kiếm/sắp xếp'},
          {e:'🕸️',f:'Graph',b:'Đồ thị — quan hệ, đường đi (BFS/DFS)'},{e:'🪵',f:'Heap',b:'Lấy min/max nhanh (priority queue)'}]}]},
      {ic:'⏱️',name:'Độ phức tạp (Big-O)',rd:'Ước lượng chi phí thuật toán.',panel:[
        {h:'Big-O thường gặp (nhanh → chậm)'},
        {cards:[{ic:'🟢',t:'O(1)',d:'Hằng số — truy cập mảng, hash.'},
          {ic:'🔵',t:'O(log n)',d:'Tìm kiếm nhị phân, cây cân bằng.'},
          {ic:'🟡',t:'O(n)',d:'Duyệt tuyến tính một lần.'},
          {ic:'🟠',t:'O(n log n)',d:'Sắp xếp tốt (merge/quick).'},
          {ic:'🔴',t:'O(n²)',d:'Hai vòng lặp lồng — tránh khi n lớn.'}]},
        {mcq:[{q:'Sắp xếp n phần tử nhanh thường đạt độ phức tạp?',o:['O(n log n)','O(n²)','O(2^n)','O(1)'],a:0,fb:'Merge sort / quicksort trung bình O(n log n) — tốt hơn nhiều so với O(n²).'}]}]}],
    skills:['Chọn đúng cấu trúc dữ liệu','Phân tích Big-O','Tư duy giải thuật'],
    quiz:[{q:'Cấu trúc nào hoạt động theo LIFO?',o:['Stack','Queue','Array','Hash map'],a:0},
      {q:'Tra cứu theo khoá trong hash map trung bình có độ phức tạp?',o:['O(1)','O(n)','O(log n)','O(n²)'],a:0},
      {q:'Duyệt đồ thị theo chiều rộng (BFS) dùng cấu trúc?',o:['Queue','Stack','Heap','Cây nhị phân'],a:0}]},

  dblab:{emoji:'🗄️',name:'Trung tâm CSDL',accent:'#60a5fa',intro:'Cơ sở dữ liệu quan hệ: thiết kế bảng, viết SQL, chuẩn hoá và phòng tránh SQL injection.',
    rooms:[{ic:'⌨️',name:'SQL Playground — viết & chạy truy vấn',rd:'Bảng thật trong bộ nhớ: viết SELECT/WHERE/JOIN/GROUP BY, 5 thử thách chấm tự động.',href:'/it-sql-playground.html?domain=it'},
      {ic:'🔎',name:'SQL căn bản',rd:'Các câu lệnh truy vấn cốt lõi.',panel:[
        {h:'Bộ lệnh SQL thường dùng'},
        {cards:[{ic:'📤',t:'SELECT',d:'Lấy dữ liệu từ bảng.'},{ic:'🔗',t:'JOIN',d:'Nối nhiều bảng theo khoá.'},
          {ic:'🧮',t:'GROUP BY',d:'Gom nhóm & tổng hợp (COUNT, SUM).'},{ic:'🎯',t:'WHERE',d:'Lọc theo điều kiện.'},
          {ic:'➕',t:'INSERT',d:'Thêm bản ghi mới.'},{ic:'♻️',t:'UPDATE',d:'Cập nhật bản ghi.'}]},
        {note:'Khoá chính (primary key) định danh duy nhất; khoá ngoại (foreign key) liên kết bảng.'}]},
      {ic:'📐',name:'Thiết kế & chuẩn hoá',rd:'ER & dạng chuẩn (1NF–3NF).',panel:[
        {h:'Chuẩn hoá dữ liệu'},
        {ol:['1NF — mỗi ô một giá trị nguyên tử','2NF — bỏ phụ thuộc một phần vào khoá','3NF — bỏ phụ thuộc bắc cầu']},
        {note:'Chuẩn hoá giảm trùng lặp & bất nhất; đôi khi denormalize có chủ đích để tăng tốc đọc.'}]},
      {ic:'🛡️',name:'Phòng SQL injection',rd:'Bảo mật truy vấn.',panel:[
        {h:'Chống SQL injection'},
        {mcq:[{q:'Cách hiệu quả nhất để chống SQL injection?',o:['Dùng prepared statement / tham số hoá truy vấn','Nối chuỗi trực tiếp dữ liệu người dùng','Tin tưởng mọi input','Ẩn thông báo lỗi'],a:0,fb:'Prepared statement tách dữ liệu khỏi câu lệnh — input không thể đổi cấu trúc truy vấn.'},
          {q:'Có nên lưu mật khẩu dạng văn bản thường (plaintext)?',o:['Không — phải băm bằng bcrypt/argon2 + salt','Có, cho tiện','Mã hoá base64 là đủ','Lưu trong cookie'],a:0,fb:'Mật khẩu phải được băm (hash) có salt; base64 KHÔNG phải mã hoá.'}]}]}],
    skills:['Viết SQL truy vấn','Thiết kế & chuẩn hoá CSDL','Bảo mật dữ liệu'],
    quiz:[{q:'Lệnh SQL nào dùng để LẤY dữ liệu?',o:['SELECT','DELETE','DROP','CREATE'],a:0},
      {q:'Khoá chính (primary key) có đặc điểm?',o:['Định danh duy nhất mỗi bản ghi','Có thể trùng lặp','Luôn là kiểu chuỗi','Không bắt buộc duy nhất'],a:0},
      {q:'Phòng SQL injection tốt nhất bằng?',o:['Truy vấn tham số hoá (prepared statement)','Nối chuỗi input','Tắt log','Dùng tài khoản admin'],a:0}]},

  netlab:{emoji:'🌐',name:'Lab Mạng máy tính',accent:'#22d3ee',intro:'Mạng máy tính: mô hình OSI/TCP-IP, giao thức, địa chỉ IP và nền tảng bảo mật mạng.',
    rooms:[{ic:'🧅',name:'Mô hình OSI',rd:'7 tầng & vai trò.',panel:[
        {h:'7 tầng OSI (trên → dưới)'},
        {ul:['7 Application — HTTP, DNS, SMTP','6 Presentation — mã hoá, nén','5 Session — phiên làm việc','4 Transport — TCP/UDP, cổng','3 Network — IP, định tuyến','2 Data Link — MAC, switch','1 Physical — tín hiệu, cáp']},
        {note:'TCP đảm bảo thứ tự & tin cậy; UDP nhanh nhưng không đảm bảo (dùng cho streaming, game).'}]},
      {ic:'🔌',name:'Giao thức & cổng',rd:'Lật thẻ giao thức ↔ cổng.',panel:[
        {p:'Lật thẻ ôn giao thức và số cổng mặc định.'},
        {flash:[{e:'🌍',f:'HTTP',b:'Cổng 80 — web'},{e:'🔒',f:'HTTPS',b:'Cổng 443 — web mã hoá TLS'},
          {e:'📛',f:'DNS',b:'Cổng 53 — phân giải tên miền'},{e:'📁',f:'SSH',b:'Cổng 22 — truy cập từ xa an toàn'},
          {e:'📧',f:'SMTP',b:'Cổng 25 — gửi email'},{e:'🖧',f:'DHCP',b:'Cấp IP động cho thiết bị'}]}]},
      {ic:'🧮',name:'Địa chỉ IP & subnet',rd:'IPv4, mặt nạ mạng.',panel:[
        {h:'Cơ bản về IP'},
        {mcq:[{q:'Địa chỉ IPv4 192.168.1.10 thuộc loại?',o:['IP riêng (private) — dùng trong mạng nội bộ','IP công cộng toàn cầu','Địa chỉ MAC','Tên miền'],a:0,fb:'Dải 192.168.x.x là IP riêng (RFC 1918), không định tuyến trực tiếp ra Internet.'},
          {q:'Giao thức nào đảm bảo truyền tin cậy, đúng thứ tự?',o:['TCP','UDP','ICMP','ARP'],a:0,fb:'TCP có bắt tay 3 bước, đánh số & truyền lại gói mất — đảm bảo tin cậy.'}]}]}],
    skills:['Hiểu mô hình OSI/TCP-IP','Giao thức & cổng','Cơ bản địa chỉ IP'],
    quiz:[{q:'HTTPS dùng cổng mặc định nào?',o:['443','80','21','25'],a:0},
      {q:'Giao thức nào phân giải tên miền thành IP?',o:['DNS','FTP','SMTP','SSH'],a:0},
      {q:'TCP khác UDP ở điểm chính?',o:['TCP tin cậy, có thứ tự; UDP nhanh, không đảm bảo','UDP an toàn hơn','TCP không cần kết nối','Giống hệt nhau'],a:0}]},

  seclab:{emoji:'🔒',name:'TT An toàn thông tin – CTF',accent:'#ef4444',intro:'An toàn thông tin theo hướng phòng thủ: OWASP Top 10, mật mã cơ bản và sân chơi Capture The Flag có đạo đức.',
    rooms:[{ic:'🔓',name:'Mật mã & CTF — giải cờ tương tác',rd:'Bàn làm việc Caesar, phân tích tần suất & 3 thử thách bắt cờ (mã cổ điển).',href:'/it-cipher-ctf.html?domain=it'},
      {ic:'🚩',name:'Các dạng đề CTF',rd:'Làm quen sân chơi CTF.',panel:[
        {h:'Các thể loại Capture The Flag'},
        {cards:[{ic:'🌐',t:'Web',d:'Lỗ hổng ứng dụng web (XSS, SQLi…).'},
          {ic:'🔐',t:'Crypto',d:'Phá/hiểu sơ đồ mã hoá yếu.'},
          {ic:'🧬',t:'Reverse',d:'Dịch ngược nhị phân để hiểu logic.'},
          {ic:'🕵️',t:'Forensics',d:'Phân tích file, gói tin, ảnh đĩa.'},
          {ic:'💥',t:'Pwn',d:'Khai thác lỗi bộ nhớ (buffer overflow).'},
          {ic:'🔎',t:'OSINT',d:'Thu thập thông tin công khai.'}]},
        {note:'CTF là môi trường HỢP PHÁP để luyện tấn công–phòng thủ. Chỉ thử nghiệm trên hệ thống được phép.'}]},
      {ic:'🛡️',name:'OWASP Top 10',rd:'Lỗ hổng web phổ biến.',panel:[
        {h:'Một số rủi ro OWASP hàng đầu'},
        {ul:['Broken Access Control — phân quyền sai','Injection — SQL/command injection','Cryptographic Failures — mã hoá yếu/lộ dữ liệu','Security Misconfiguration — cấu hình lỏng','Vulnerable Components — thư viện lỗi thời']},
        {mcq:[{q:'Phòng tấn công XSS (chèn script) hiệu quả bằng?',o:['Escape/encode output & dùng Content-Security-Policy','Tin tưởng input người dùng','Tắt HTTPS','Lưu mật khẩu plaintext'],a:0,fb:'XSS được chặn bằng cách mã hoá dữ liệu khi render + CSP giới hạn script được phép chạy.'}]}]},
      {ic:'🔑',name:'Mật mã căn bản',rd:'Hash, mã hoá, chữ ký số.',panel:[
        {h:'Khái niệm cốt lõi'},
        {ul:['Hash (SHA-256) một chiều — kiểm tra toàn vẹn, lưu mật khẩu (có salt)','Đối xứng (AES) — một khoá chung','Bất đối xứng (RSA/ECC) — khoá công khai + khoá bí mật','Chữ ký số — xác thực & chống chối bỏ']},
        {note:'Đừng tự chế thuật toán mã hoá — dùng thư viện chuẩn đã được kiểm định.'}]},
      {ic:'⚖️',name:'Hacking có đạo đức',rd:'Ranh giới pháp lý.',panel:[
        {h:'Ethical hacking'},
        {mcq:[{q:'Bạn phát hiện lỗ hổng trên website một công ty. Nên?',o:['Báo cho họ một cách có trách nhiệm (responsible disclosure)','Khai thác để lấy dữ liệu','Bán lỗ hổng','Đăng công khai cách khai thác ngay'],a:0,fb:'Chỉ kiểm thử khi được phép; báo lỗ hổng có trách nhiệm. Tấn công trái phép là vi phạm pháp luật.'}]}]}],
    skills:['Tư duy phòng thủ (OWASP)','Mật mã căn bản','Đạo đức an ninh mạng'],
    quiz:[{q:'Hàm băm (hash) như SHA-256 có tính chất?',o:['Một chiều — khó tìm ngược đầu vào','Hai chiều, giải mã dễ','Là thuật toán nén ảnh','Luôn rút ngắn dữ liệu một nửa'],a:0},
      {q:'Lưu mật khẩu người dùng đúng cách?',o:['Băm bằng bcrypt/argon2 + salt','Lưu plaintext','Mã hoá base64','Ghi vào log'],a:0},
      {q:'Chỉ được kiểm thử xâm nhập (pentest) khi?',o:['Có sự cho phép/hợp đồng rõ ràng','Bất cứ lúc nào','Khi tò mò','Khi không ai biết'],a:0}]},

  ailab:{emoji:'🤖',name:'Lab AI & Machine Learning',accent:'#a78bfa',intro:'Trí tuệ nhân tạo và học máy: quy trình ML, học có giám sát/không giám sát, overfitting và mạng nơ-ron.',
    rooms:[{ic:'🔁',name:'Quy trình ML',rd:'Các bước xây dựng mô hình.',panel:[
        {h:'Pipeline học máy điển hình'},
        {timeline:[{t:'Thu thập & làm sạch dữ liệu',d:'Xử lý thiếu/nhiễu, chuẩn hoá đặc trưng.'},
          {t:'Chia tập',d:'Train / validation / test.'},
          {t:'Huấn luyện',d:'Chọn mô hình & tối ưu tham số.'},
          {t:'Đánh giá',d:'Accuracy, precision/recall, F1, AUC.'},
          {t:'Triển khai & theo dõi',d:'Đưa vào sản phẩm, giám sát trôi dữ liệu.'}]}]},
      {ic:'🧩',name:'Các kiểu học',rd:'Giám sát vs không giám sát.',panel:[
        {h:'Phân loại bài toán ML'},
        {cards:[{ic:'🏷️',t:'Có giám sát',d:'Dữ liệu có nhãn — phân loại, hồi quy.'},
          {ic:'🔍',t:'Không giám sát',d:'Không nhãn — phân cụm, giảm chiều.'},
          {ic:'🎮',t:'Tăng cường',d:'Học qua thưởng/phạt (agent).'},
          {ic:'🧠',t:'Học sâu',d:'Mạng nơ-ron nhiều lớp (ảnh, NLP).'}]},
        {mcq:[{q:'Dự đoán giá nhà (số liên tục) là bài toán?',o:['Hồi quy (regression)','Phân loại','Phân cụm','Giảm chiều'],a:0,fb:'Đầu ra liên tục → hồi quy; đầu ra nhãn rời rạc → phân loại.'}]}]},
      {ic:'⚠️',name:'Overfitting',rd:'Khi mô hình học vẹt.',panel:[
        {h:'Quá khớp (overfitting)'},
        {ul:['Dấu hiệu: rất tốt trên train nhưng kém trên test','Khắc phục: thêm dữ liệu, regularization (L1/L2), dropout','Dùng cross-validation để đánh giá khách quan','Đơn giản hoá mô hình nếu cần']},
        {note:'Mục tiêu là TỔNG QUÁT HOÁ — đoán tốt trên dữ liệu CHƯA TỪNG thấy.'}]},
      {ic:'🧠',name:'Mạng nơ-ron',rd:'Lật thẻ khái niệm.',panel:[
        {p:'Lật thẻ ôn khái niệm mạng nơ-ron.'},
        {flash:[{e:'⚖️',f:'Trọng số (weight)',b:'Tham số mô hình học được'},{e:'📈',f:'Hàm kích hoạt',b:'ReLU, sigmoid — thêm phi tuyến'},
          {e:'📉',f:'Hàm mất mát',b:'Đo sai số dự đoán so với thực tế'},{e:'🔙',f:'Backpropagation',b:'Lan truyền ngược để cập nhật trọng số'},
          {e:'🎚️',f:'Learning rate',b:'Tốc độ cập nhật trọng số'},{e:'🧱',f:'Epoch',b:'Một lượt duyệt toàn bộ dữ liệu train'}]}]}],
    skills:['Hiểu quy trình ML','Phân biệt kiểu học','Tránh overfitting'],
    quiz:[{q:'Học có giám sát (supervised) cần?',o:['Dữ liệu có nhãn','Không cần dữ liệu','Chỉ phần thưởng','Không nhãn'],a:0},
      {q:'Overfitting là khi mô hình?',o:['Tốt trên train nhưng kém trên dữ liệu mới','Kém trên cả train lẫn test','Luôn hoàn hảo','Không học được gì'],a:0},
      {q:'Phân cụm khách hàng thành nhóm (không nhãn) là?',o:['Học không giám sát','Học có giám sát','Hồi quy','Phân loại nhị phân'],a:0}]},

  webstudio:{emoji:'🎨',name:'Studio Web & Mobile',accent:'#f472b6',intro:'Phát triển web và mobile: HTML/CSS/JS, responsive, REST API, khả năng truy cập và ứng dụng di động.',
    rooms:[{ic:'🎨',name:'Web Playground — code & xem ngay',rd:'Viết HTML/CSS/JS, xem trước trực tiếp.',href:'/it-web-playground.html?domain=it'},
      {ic:'🧱',name:'Bộ ba nền tảng web',rd:'HTML · CSS · JavaScript.',panel:[
        {h:'Ba lớp của một trang web'},
        {cards:[{ic:'📄',t:'HTML',d:'Cấu trúc & nội dung.'},{ic:'🎨',t:'CSS',d:'Trình bày, bố cục, màu.'},
          {ic:'⚙️',t:'JavaScript',d:'Tương tác & logic phía client.'},{ic:'🔌',t:'REST API',d:'Giao tiếp với server qua HTTP.'}]},
        {note:'Tách biệt nội dung (HTML), hình thức (CSS) và hành vi (JS) giúp dễ bảo trì.'}]},
      {ic:'📱',name:'Responsive design',rd:'Giao diện mọi kích thước màn hình.',panel:[
        {h:'Thiết kế đáp ứng'},
        {check:['Dùng viewport meta & đơn vị tương đối (%, rem)','Media query cho breakpoint','Layout linh hoạt: Flexbox / Grid','Ảnh co giãn, không tràn','Kiểm thử trên mobile thật']},
        {note:'Mobile-first: thiết kế cho màn nhỏ trước rồi mở rộng lên desktop.'}]},
      {ic:'♿',name:'Khả năng truy cập (a11y)',rd:'Web cho tất cả mọi người.',panel:[
        {h:'Accessibility cơ bản'},
        {ul:['Văn bản thay thế (alt) cho ảnh','Đủ tương phản màu chữ/nền','Điều hướng được bằng bàn phím','Dùng thẻ ngữ nghĩa (header, nav, main)']},
        {mcq:[{q:'Vì sao cần thuộc tính alt cho ảnh?',o:['Trình đọc màn hình & SEO; hiển thị khi ảnh lỗi','Để ảnh đẹp hơn','Tăng tốc mạng','Không cần thiết'],a:0,fb:'alt giúp người khiếm thị hiểu nội dung ảnh và là dự phòng khi ảnh không tải được.'}]}]},
      {ic:'📲',name:'Mobile dev',rd:'Native vs cross-platform.',panel:[
        {h:'Phát triển ứng dụng di động'},
        {cards:[{ic:'🤖',t:'Android',d:'Kotlin/Java, Android Studio.'},{ic:'🍎',t:'iOS',d:'Swift, Xcode.'},
          {ic:'🦋',t:'Flutter',d:'Một codebase, đa nền tảng (Dart).'},{ic:'⚛️',t:'React Native',d:'JS/TS, đa nền tảng.'}]},
        {note:'Cross-platform tiết kiệm công sức; native tối ưu hiệu năng & tính năng đặc thù.'}]},
      // Pixel Art Studio — UI/UX cho dev: thiết kế icon, sprite game, ảnh placeholder
      {ic:'🎨',name:'Pixel Art Studio',rd:'Tool vẽ pixel cho dev — design icon app, sprite game, asset PNG retro.',href:'/pixel-art-studio.html'}],
    skills:['Làm chủ HTML/CSS/JS','Responsive & a11y','Hiểu mobile dev'],
    quiz:[{q:'CSS chịu trách nhiệm gì trên trang web?',o:['Trình bày & bố cục','Lưu cơ sở dữ liệu','Định tuyến mạng','Biên dịch mã'],a:0},
      {q:'Kỹ thuật bố cục linh hoạt hiện đại của CSS?',o:['Flexbox / Grid','Bảng (table) lồng nhau','Thẻ font','iframe'],a:0},
      {q:'Thuộc tính nào giúp ảnh truy cập được với trình đọc màn hình?',o:['alt','color','href','id'],a:0}]},

  startuphub:{emoji:'🚀',name:'Vườn ươm Khởi nghiệp',accent:'#fca5a5',intro:'Biến ý tưởng công nghệ thành sản phẩm: Lean Canvas, MVP, pitching và công nghệ mới như blockchain/Web3.',
    rooms:[{ic:'🧩',name:'Lean Canvas',rd:'Phác mô hình kinh doanh 1 trang.',panel:[
        {h:'Các ô của Lean Canvas'},
        {ul:['Vấn đề & Phân khúc khách hàng','Giải pháp & Lợi thế độc nhất','Kênh tiếp cận & Dòng doanh thu','Cấu trúc chi phí & Chỉ số then chốt','Lợi thế khó sao chép']},
        {note:'Khởi nghiệp = tìm mô hình kinh doanh lặp lại & mở rộng được, không chỉ là viết code.'}]},
      {ic:'🛠️',name:'MVP & vòng lặp',rd:'Build–Measure–Learn.',panel:[
        {h:'Xây MVP rồi học'},
        {timeline:[{t:'Build',d:'Làm sản phẩm khả dụng tối thiểu.'},
          {t:'Measure',d:'Đo hành vi người dùng thật.'},
          {t:'Learn',d:'Rút ra bài học, xoay trục (pivot) nếu cần.'}]},
        {mcq:[{q:'Mục đích chính của MVP?',o:['Kiểm chứng giả định với ít công sức nhất','Có sản phẩm hoàn hảo ngay','Gọi vốn thật nhiều','Làm cho vui'],a:0,fb:'MVP để HỌC nhanh từ người dùng thật với chi phí thấp nhất, trước khi đầu tư lớn.'}]}]},
      {ic:'⛓️',name:'Blockchain & Web3',rd:'Sổ cái phân tán, hợp đồng thông minh.',panel:[
        {h:'Khái niệm Web3'},
        {ul:['Blockchain: sổ cái phân tán, bất biến','Hợp đồng thông minh (smart contract) tự thực thi','Phi tập trung — không bên trung gian duy nhất','Cẩn trọng: nhiều rủi ro bảo mật & pháp lý']},
        {note:'Không phải bài toán nào cũng cần blockchain — đa số trường hợp CSDL truyền thống là đủ.'}]},
      {ic:'🎯',name:'Mục tiêu khởi nghiệp',rd:'Đặt & lưu mục tiêu.',panel:[
        {h:'Đặt mục tiêu SMART'},
        {p:'Cụ thể – Đo được – Khả thi – Liên quan – Có thời hạn. Ví dụ: ra mắt landing page & thu 50 email đăng ký trong 2 tuần.'},
        {goal:true}]}],
    skills:['Tư duy mô hình kinh doanh','Xây MVP & học nhanh','Hiểu công nghệ mới'],
    quiz:[{q:'MVP trong khởi nghiệp tinh gọn nghĩa là?',o:['Minimum Viable Product','Most Valuable Player','Maximum Value Plan','Minimal Visual Page'],a:0},
      {q:'Vòng lặp khởi nghiệp tinh gọn (Lean Startup)?',o:['Build – Measure – Learn','Plan – Sell – Stop','Code – Ship – Forget','Hire – Fire – Repeat'],a:0},
      {q:'Hợp đồng thông minh (smart contract) là?',o:['Đoạn mã tự thực thi trên blockchain','Hợp đồng giấy','Email cam kết','Tệp PDF có chữ ký'],a:0}]},

  cloudcenter:{emoji:'☁️',name:'TT Dữ liệu & Cloud',accent:'#7dd3fc',intro:'Hạ tầng hiện đại: mô hình điện toán đám mây, container, CI/CD và khả năng mở rộng hệ thống.',
    rooms:[{ic:'🏗️',name:'Mô hình dịch vụ cloud',rd:'IaaS · PaaS · SaaS.',panel:[
        {h:'Ba tầng dịch vụ đám mây'},
        {cards:[{ic:'🧱',t:'IaaS',d:'Thuê hạ tầng (máy ảo, mạng). VD: EC2.'},
          {ic:'🛠️',t:'PaaS',d:'Nền tảng chạy app, lo hạ tầng giúp bạn.'},
          {ic:'📦',t:'SaaS',d:'Phần mềm dùng ngay qua trình duyệt.'}]},
        {note:'Càng lên cao (SaaS) bạn càng ít phải quản lý hạ tầng — đổi lại ít kiểm soát hơn.'}]},
      {ic:'🐳',name:'Container & Docker',rd:'Đóng gói app chạy mọi nơi.',panel:[
        {h:'Vì sao dùng container'},
        {ul:['Đóng gói app + phụ thuộc thành một image','Chạy nhất quán: máy dev = staging = production','Nhẹ hơn máy ảo; khởi động nhanh','Kubernetes điều phối nhiều container']},
        {mcq:[{q:'Lợi ích chính của Docker container?',o:['Chạy nhất quán ở mọi môi trường (hết cảnh "máy tôi chạy được")','Tăng dung lượng ổ cứng','Thay thế ngôn ngữ lập trình','Vẽ giao diện đẹp hơn'],a:0,fb:'Container đóng gói cả môi trường nên loại bỏ lỗi "máy tôi chạy được" khi triển khai.'}]}]},
      {ic:'🔄',name:'CI/CD',rd:'Tích hợp & triển khai liên tục.',panel:[
        {h:'Đường ống CI/CD'},
        {ol:['Commit kích hoạt pipeline tự động','CI: build + chạy test','Đóng gói artifact/image','CD: triển khai tự động lên môi trường','Theo dõi & rollback nếu lỗi']},
        {note:'CI/CD giúp giao hàng nhanh, ít lỗi nhờ tự động hoá kiểm thử & triển khai.'}]},
      {ic:'📈',name:'Khả năng mở rộng',rd:'Scale up vs scale out.',panel:[
        {h:'Mở rộng hệ thống'},
        {ul:['Scale up (dọc): tăng sức mạnh một máy','Scale out (ngang): thêm nhiều máy + load balancer','Cache để giảm tải CSDL','Thiết kế stateless để dễ nhân bản']},
        {note:'Scale out + load balancer là cách phổ biến để phục vụ lượng lớn người dùng.'}]}],
    skills:['Hiểu mô hình cloud','Container hoá ứng dụng','Tư duy CI/CD & mở rộng'],
    quiz:[{q:'SaaS là gì?',o:['Phần mềm dùng ngay qua mạng (vd Gmail)','Thuê máy ảo trống','Ngôn ngữ lập trình','Thiết bị mạng'],a:0},
      {q:'Docker container giúp ích chính ở chỗ?',o:['Chạy nhất quán trên mọi môi trường','Tăng RAM vật lý','Thay thế Git','Vẽ biểu đồ'],a:0},
      {q:'CD trong CI/CD thường nghĩa là?',o:['Continuous Delivery/Deployment','Compact Disc','Code Debug','Central Database'],a:0}]},

  canteen:{emoji:'🍜',name:'Căng tin',accent:'#fb7185',intro:'Nghỉ ngơi, nạp năng lượng và giữ sức khoẻ giữa các giờ code.',
    rooms:[{ic:'🧩',name:'Đố vui công nghệ',rd:'Giải lao với câu đố IT.',panel:[{h:'Đố vui giờ giải lao'},{mcq:[{q:'Mã lỗi "HTTP 404" nghĩa là?',o:['Không tìm thấy trang','Thành công','Lỗi máy chủ','Bị cấm truy cập'],a:0,fb:'404 Not Found — không tìm thấy tài nguyên.'},{q:'1 byte bằng bao nhiêu bit?',o:['8','4','16','1024'],a:0,fb:'1 byte = 8 bit.'},{q:'Phím tắt Copy trên hầu hết hệ điều hành?',o:['Ctrl/Cmd + C','Ctrl + V','Ctrl + X','Ctrl + Z'],a:0,fb:'C = copy, V = paste, X = cut, Z = undo.'}]}]},
      {ic:'☕',name:'Góc thư giãn',rd:'Mẹo học & code hiệu quả.',panel:[
        {h:'Mẹo học lập trình hiệu quả'},
        {ul:['Học bằng cách LÀM — gõ lại code, tự sửa lỗi','Pomodoro: 25 phút tập trung – 5 phút nghỉ','Đọc code của người khác (open source)','Ghi chú & sơ đồ hoá kiến thức']},
        {note:'Lập trình là kỹ năng — luyện đều mỗi ngày hơn là dồn sát ngày thi.'}]},
      {ic:'🪑',name:'Sức khoẻ dân code',rd:'Tránh chấn thương khi ngồi lâu.',panel:[
        {h:'Giữ sức khoẻ khi ngồi máy'},
        {ul:['Quy tắc 20–20–20: mỗi 20 phút nhìn xa 20 feet trong 20 giây','Tư thế ngồi đúng, màn hình ngang tầm mắt','Đứng dậy vận động mỗi 30–60 phút','Cổ tay thẳng để tránh hội chứng ống cổ tay']},
        {mcq:[{q:'Quy tắc 20–20–20 giúp ích gì?',o:['Giảm mỏi mắt khi nhìn màn hình lâu','Tăng tốc CPU','Sửa bug nhanh hơn','Tiết kiệm điện'],a:0,fb:'Nhìn xa định kỳ giúp mắt thư giãn, giảm khô & mỏi mắt khi làm việc với màn hình.'}]}]}],
    skills:['Cân bằng học – nghỉ','Tự chăm sóc sức khoẻ'],
    quiz:[{q:'Kỹ thuật Pomodoro chia thời gian thế nào?',o:['25 phút làm – 5 phút nghỉ','3 giờ liền không nghỉ','Ngủ 25 phút','Không nghỉ'],a:0},
      {q:'Cách học lập trình hiệu quả nhất?',o:['Thực hành gõ & sửa code','Chỉ đọc, không gõ','Học thuộc lòng','Xem lướt video'],a:0},
      {q:'Quy tắc 20–20–20 liên quan đến?',o:['Bảo vệ mắt','Tốc độ mạng','Dung lượng ổ cứng','Pin laptop'],a:0}]},

  dorm:{emoji:'🛏️',name:'Ký túc xá',accent:'#fbbf24',intro:'Không gian cá nhân: theo dõi hồ sơ, đặt mục tiêu học tập và xây lộ trình nghề nghiệp.',
    rooms:[{ic:'🏅',name:'Hồ sơ & huy hiệu',rd:'Sao, coin, streak, huy hiệu.',href:'/'},
      {ic:'🎯',name:'Mục tiêu học tập',rd:'Đặt & lưu mục tiêu tuần.',panel:[
        {h:'Đặt mục tiêu SMART'},
        {p:'Cụ thể – Đo được – Khả thi – Liên quan – Có thời hạn. Ví dụ: hoàn thành 3 bài Cấu trúc dữ liệu & 1 đề CTF trong tuần này.'},
        {goal:true},
        {note:'Duy trì streak (chuỗi ngày học) để nhận thưởng coin & huy hiệu.'}]},
      {ic:'🗺️',name:'Lộ trình nghề nghiệp',rd:'Xây portfolio từ năm 1.',panel:[
        {h:'Chuẩn bị nghề nghiệp sớm'},
        {check:['Tạo tài khoản GitHub & đẩy code đều','Làm 2–3 dự án cá nhân có demo','Viết CV/LinkedIn nêu rõ kỹ năng & dự án','Luyện phỏng vấn: giải thuật + system design','Tham gia CTF/hackathon/open source']},
        {note:'Portfolio thực tế (GitHub, dự án) thuyết phục nhà tuyển dụng hơn điểm số.'}]}],
    skills:['Tự quản lý học tập','Đặt mục tiêu SMART','Xây portfolio nghề nghiệp'],
    quiz:[{q:'Điều gì thuyết phục nhà tuyển dụng CNTT nhất?',o:['Dự án/portfolio thực tế trên GitHub','Chỉ điểm số','Số giờ ngồi máy','Số tài khoản mạng xã hội'],a:0},
      {q:'Mục tiêu hiệu quả nên theo nguyên tắc?',o:['SMART','Càng mơ hồ càng tốt','Càng nhiều càng tốt','Không cần đo'],a:0},
      {q:'Chuỗi ngày học (streak) khuyến khích thói quen?',o:['Học/code đều mỗi ngày','Học 1 lần/tháng','Bỏ học','Học ngẫu nhiên'],a:0}]},

  museum:{emoji:'🖥️',name:'Bảo tàng Công nghệ',accent:'#9aa6b2',intro:'Lịch sử ngành máy tính và những con người đặt nền móng cho công nghệ thông tin.',
    rooms:[{ic:'🚀',name:'Khám phá Bảo tàng đầy đủ',rd:'Trục tiến trình phát triển · thành tựu đột phá · thuật ngữ mới · case study thực tế (req #92/#93).',href:'/bao-tang-cong-nghe.html?domain=it'},
      {ic:'🏛️',name:'Lịch sử máy tính',rd:'Dòng thời gian các cột mốc.',panel:[
        {h:'Dòng thời gian máy tính'},
        {timeline:[{t:'1843 — Ada Lovelace',d:'Thuật toán đầu tiên cho máy của Babbage.'},
          {t:'1936 — Alan Turing',d:'Máy Turing — nền tảng lý thuyết tính toán.'},
          {t:'1969 — ARPANET',d:'Tiền thân của Internet.'},
          {t:'1991 — World Wide Web',d:'Tim Berners-Lee công bố WWW.'},
          {t:'Ngày nay — AI & Cloud',d:'Học sâu, điện toán đám mây, di động khắp nơi.'}]}]},
      {ic:'👤',name:'Danh nhân máy tính',rd:'Những người đặt nền móng.',panel:[
        {h:'Một số tên tuổi lớn'},
        {cards:[{ic:'👩‍💻',t:'Ada Lovelace',d:'Lập trình viên đầu tiên trong lịch sử.'},
          {ic:'🧮',t:'Alan Turing',d:'Cha đẻ khoa học máy tính & AI.'},
          {ic:'🌐',t:'Tim Berners-Lee',d:'Phát minh World Wide Web.'},
          {ic:'🐧',t:'Linus Torvalds',d:'Tạo ra Linux & Git.'}]},
        {p:'Cùng nhiều nhà khoa học, kỹ sư đã định hình ngành công nghệ thông tin hiện đại.'}]},
      {ic:'💾',name:'Phần cứng qua các thời kỳ',rd:'Từ đèn điện tử tới chip.',panel:[
        {h:'Tiến hoá phần cứng'},
        {flash:[{e:'💡',f:'Đèn điện tử (vacuum tube)',b:'Máy tính thế hệ đầu, to & nóng'},{e:'🔲',f:'Transistor',b:'Nhỏ, bền, ít điện hơn'},
          {e:'🔳',f:'Mạch tích hợp (IC)',b:'Nhiều transistor trên một chip'},{e:'🧠',f:'Vi xử lý (CPU)',b:'Cả bộ xử lý trên một chip'},
          {e:'💽',f:'Lưu trữ',b:'Băng từ → đĩa cứng → SSD'},{e:'☁️',f:'Đám mây',b:'Tính toán & lưu trữ qua mạng'}]}]}],
    skills:['Hiểu lịch sử ngành','Biết danh nhân máy tính'],
    quiz:[{q:'Ai được xem là lập trình viên đầu tiên?',o:['Ada Lovelace','Bill Gates','Steve Jobs','Mark Zuckerberg'],a:0},
      {q:'World Wide Web (WWW) do ai phát minh?',o:['Tim Berners-Lee','Alan Turing','Linus Torvalds','Elon Musk'],a:0},
      {q:'Linus Torvalds nổi tiếng vì tạo ra?',o:['Linux & Git','Windows','iOS','Photoshop'],a:0}]},
};

// ====== TRƯỜNG TIỂU HỌC — không gian bên trong từng toà (lớp 1–5 + phòng chức năng) ======
const SPACES_PRIMARY = {
  g1:{emoji:'1️⃣',name:'Lớp 1',accent:'#ef4444',intro:'Lớp 1 — những bước đầu tiên: tập đếm, tập đọc và làm quen trường lớp. Học mà chơi, chơi mà học!',
    rooms:[{ic:'➗',name:'Toán lớp 1',rd:'Đếm & so sánh số trong 100, cộng trừ không nhớ, hình cơ bản. Có mini-game Bão Số Học bên trong.',href:'/module.html?domain=primary&module=P1'},
      {ic:'📖',name:'Tiếng Việt 1 — Học vần',rd:'Học âm, vần và tập đọc trơn.',panel:[
        {h:'Bắt đầu biết đọc'},
        {ul:['Học các âm và vần, ghép lại thành tiếng','Đánh vần rồi đọc trơn cả tiếng','Đọc to, rõ ràng từng câu ngắn','Tập viết chữ thường và chữ hoa']},
        {note:'Mỗi tối đọc vài câu cùng bố mẹ, em sẽ mau biết đọc!'}]},
      // Đố Chữ Ghép Vần — luyện ghép chữ tiếng Việt, phù hợp lớp 1-3
      {ic:'🔤',name:'Đố Chữ Ghép Vần',rd:'Kéo thả các chữ để ghép thành từ — 60 từ chia 3 cấp từ dễ đến khó.',href:'/do-chu-ghep-van.html'},
      {ic:'🔤',name:'Tiếng Anh 1 — Lật thẻ',rd:'Chào hỏi, màu sắc và con vật.',panel:[
        {p:'Bấm vào thẻ để học những từ tiếng Anh đầu tiên.'},
        {flash:[{e:'👋',f:'Hello',b:'Xin chào'},{e:'🔴',f:'Red',b:'Màu đỏ'},{e:'🔵',f:'Blue',b:'Màu xanh'},{e:'1️⃣',f:'One',b:'Số một'},{e:'🐱',f:'Cat',b:'Con mèo'},{e:'🐶',f:'Dog',b:'Con chó'}]}]},
      {ic:'🏫',name:'TN&XH — Trường lớp & gia đình',rd:'Em và những người xung quanh.',panel:[
        {h:'Em khám phá xung quanh'},
        {ul:['Các thành viên trong gia đình em','Trường lớp: thầy cô, bạn bè, đồ dùng học tập','Giữ vệ sinh: rửa tay, đánh răng, mặc ấm khi trời lạnh']},
        {mcq:[{q:'Trước khi ăn và sau khi đi vệ sinh, em cần làm gì?',o:['Rửa tay bằng xà phòng','Lau tay vào áo','Không cần làm gì','Chỉ thổi cho sạch'],a:0,fb:'Rửa tay với xà phòng giúp phòng bệnh — nhớ rửa đủ các bước nhé!'}]}]},
      // Bản đồ VN — game khám phá 34 tỉnh/thành, phù hợp HS lớp 1 khám phá quê hương
      {ic:'🗺️',name:'Bản đồ Việt Nam Tri thức',rd:'34 tỉnh thành — 34 câu chuyện. Click vào tỉnh để xem đặc sản + làm quiz.',href:'/ban-do-vn.html'}],
    skills:['Đếm & cộng trừ trong 100','Bắt đầu biết đọc'],
    quiz:[{q:'Số liền sau của 9 là số nào?',o:['10','8','11','0'],a:0},
      {q:'5 + 3 = ?',o:['8','7','9','6'],a:0},
      {q:'Hình nào có 3 cạnh?',o:['Hình tam giác','Hình tròn','Hình vuông','Hình chữ nhật'],a:0}]},

  g2:{emoji:'2️⃣',name:'Lớp 2',accent:'#f59e0b',intro:'Lớp 2 — Đầy đủ 9 môn theo GDPT 2018 (mỗi môn 36 tuần) · Mỗi môn BÊN TRONG có 1 mini-game riêng phù hợp: Bão Số Học, Ghép Vần, Memory Match, Phản Xạ Cầu Thủ, Đô-Rê-Mi Bay, Pixel Art, Phân Loại Rác, Bản đồ 34 tỉnh, Đúng hay Sai.',
    rooms:[
      // Mỗi môn lớp 2 chứa SẴN 1 mini-game riêng bên trong (xem MODULE_GAMES ở module.html).
      {ic:'➗',name:'Toán lớp 2',rd:'HK1: Cộng trừ có nhớ, bảng nhân 2-5. HK2: Bảng chia, đơn vị đo, số đến 1000, tiền VN, chu vi. ⛈️ Mini-game bên trong: Bão Số Học.',href:'/module.html?domain=primary&module=P2'},
      {ic:'📖',name:'Tiếng Việt lớp 2',rd:'HK1: Đọc-hiểu, từ chỉ sự vật/hoạt động/đặc điểm, mẫu câu Ai là gì?. HK2: Dấu câu, mở rộng vốn từ, viết đoạn 3-5 câu. 🔤 Mini-game bên trong: Ghép Vần.',href:'/module.html?domain=primary&module=P2TV'},
      {ic:'🇬🇧',name:'Tiếng Anh lớp 2',rd:'HK1: Greetings, numbers 1-10, colors, body, family. HK2: Animals, food, classroom, weekdays, weather. 🎴 Mini-game bên trong: Memory Match.',href:'/module.html?domain=primary&module=P2TA'},
      {ic:'⚽',name:'Giáo dục thể chất lớp 2',rd:'HK1: Đội hình đội ngũ, bài thể dục phát triển chung, đi-chạy-nhảy. HK2: Ném-bắt bóng, tâng cầu, trò chơi dân gian. 🏃 Mini-game bên trong: Phản Xạ Cầu Thủ.',href:'/module.html?domain=primary&module=P2GDTC'},
      {ic:'🎵',name:'Âm nhạc lớp 2',rd:'HK1: Bài hát thiếu nhi, cao độ-trường độ, tiết tấu. HK2: Đọc nhạc Đô-Rê-Mi, vận động theo nhạc, trống-mõ-thanh phách. 🎶 Mini-game bên trong: Đô-Rê-Mi Bay.',href:'/module.html?domain=primary&module=P2AN'},
      {ic:'🎨',name:'Mĩ thuật lớp 2',rd:'HK1: Màu cơ bản, trang trí, vẽ gia đình-trường học, nặn đất. HK2: Xé dán, tranh dân gian Đông Hồ, đề tài lễ hội. 🖌️ Mini-game bên trong: Pixel Art Studio.',href:'/module.html?domain=primary&module=P2MT'},
      {ic:'🎪',name:'Hoạt động trải nghiệm lớp 2',rd:'HK1: Tự phục vụ, vệ sinh cá nhân, ứng xử trong gia đình-nhà trường. HK2: An toàn giao thông, môi trường, làm việc nhà, định hướng nghề. ♻️ Mini-game bên trong: Phân Loại Rác.',href:'/module.html?domain=primary&module=P2HDTN'},
      {ic:'🌍',name:'Tự nhiên & Xã hội lớp 2',rd:'HK1: Gia đình (thế hệ, nghề người thân), trường học, cộng đồng địa phương. HK2: Thực-động vật, cơ thể người, Mặt Trời-Mặt Trăng. 🗺️ Mini-game bên trong: Bản đồ 34 tỉnh.',href:'/module.html?domain=primary&module=P2TNXH'},
      {ic:'🤝',name:'Đạo đức lớp 2',rd:'HK1: Yêu lao động, kính trọng thầy cô, yêu ông bà cha mẹ, giúp bạn. HK2: Trung thực, bảo vệ của công, yêu quê hương, vệ sinh công cộng. ✅ Mini-game bên trong: Đúng hay Sai.',href:'/module.html?domain=primary&module=P2DD'}],
    skills:['9 môn GDPT 2018 đầy đủ','Mỗi môn 36 tuần (HK1+HK2)','~1700 câu hỏi cả năm học'],
    quiz:[{q:'2 × 4 = ?',o:['8','6','10','24'],a:0},
      {q:'27 + 5 = ?',o:['32','22','31','37'],a:0},
      {q:'Từ nào chỉ con vật?',o:['Con gà','Cái bàn','Chạy','Xanh'],a:0}]},

  g3:{emoji:'3️⃣',name:'Lớp 3',accent:'#22c55e',intro:'Lớp 3 — đầy đủ 9 môn × 35 tuần theo GDPT 2018. Thành thạo bảng nhân chia, tính chu vi và viết đoạn văn ngắn.',
    rooms:[{ic:'➗',name:'Toán lớp 3',rd:'Bảng nhân/chia 6–9, chu vi, số đến 100 000, kg-g, ml-lít, tiền VN, hình hộp. Có mini-game Bão Số Học bên trong.',href:'/module.html?domain=primary&module=P3'},
      {ic:'📖',name:'Tiếng Việt lớp 3',rd:'Đọc hiểu, từ loại, kiểu câu Ai-làm gì/thế nào, MRVT, viết thư - biên bản.',href:'/module.html?domain=primary&module=P3TV'},
      {ic:'🇬🇧',name:'Tiếng Anh lớp 3',rd:'Greetings, family, friends, body, toys, school subjects, food, animals.',href:'/module.html?domain=primary&module=P3TA'},
      {ic:'🌏',name:'TN-XH lớp 3',rd:'Họ hàng, cộng đồng, ATGT, phòng chống xâm hại, thực-động vật, hệ tuần hoàn.',href:'/module.html?domain=primary&module=P3TNXH'},
      {ic:'💝',name:'Đạo đức lớp 3',rd:'Yêu Tổ quốc, kính thầy cô, tự lập, trung thực, an toàn mạng.',href:'/module.html?domain=primary&module=P3DD'},
      {ic:'🎵',name:'Âm nhạc lớp 3',rd:'Nhịp 3/4, móc đơn, recorder, gõ đệm, dân ca 3 miền.',href:'/module.html?domain=primary&module=P3AN'},
      {ic:'🎨',name:'Mĩ thuật lớp 3',rd:'Màu nóng-lạnh, in mộc bản, phong cảnh, Origami, tranh Tết.',href:'/module.html?domain=primary&module=P3MT'},
      {ic:'⚽',name:'GDTC lớp 3',rd:'Bài thể dục liên hoàn, chạy 30m, bật xa, nhảy dây, đá cầu, trò chơi dân gian.',href:'/module.html?domain=primary&module=P3GDTC'},
      {ic:'🌟',name:'HĐ trải nghiệm lớp 3',rd:'Kế hoạch tuần, sinh nhật, an toàn xe đạp, Đội Thiếu niên, dã ngoại.',href:'/module.html?domain=primary&module=P3HDTN'},
      {ic:'📖',name:'Tiếng Việt 3 — Từ & câu',rd:'Từ chỉ sự vật, hoạt động, đặc điểm.',panel:[
        {h:'Luyện từ và câu'},
        {cards:[{ic:'🍎',t:'Từ chỉ sự vật',d:'bàn, cây, mẹ, con mèo…'},{ic:'🏃',t:'Từ chỉ hoạt động',d:'chạy, đọc, hát…'},{ic:'🌈',t:'Từ chỉ đặc điểm',d:'cao, xanh, ngoan…'}]},
        {note:'Mẫu câu: "Ai là gì?", "Ai làm gì?", "Ai thế nào?".'}]},
      // Đố Chữ Ghép Vần — cấp medium phù hợp lớp 3 (từ 5-7 chữ cái)
      {ic:'🔤',name:'Đố Chữ Ghép Vần (Medium)',rd:'Ghép từ 5-7 chữ cái: trường học, biển xanh, mặt trời… có gợi ý.',href:'/do-chu-ghep-van.html'},
      {ic:'🔤',name:'Tiếng Anh 3 — Lật thẻ',rd:'Gia đình và cơ thể.',panel:[
        {flash:[{e:'👩',f:'Mother',b:'Mẹ'},{e:'👨',f:'Father',b:'Bố'},{e:'✋',f:'Hand',b:'Bàn tay'},{e:'👀',f:'Eyes',b:'Đôi mắt'},{e:'😀',f:'Happy',b:'Vui'},{e:'🟢',f:'Green',b:'Màu xanh lá'}]}]},
      {ic:'🌏',name:'TN&XH — Cơ thể & họ hàng',rd:'Giữ gìn sức khoẻ.',panel:[
        {ul:['Các cơ quan: tiêu hoá, hô hấp, tuần hoàn (mức đơn giản)','Họ hàng nội – ngoại','Ăn chín, uống sôi, ngủ đủ giấc để khoẻ mạnh']},
        {mcq:[{q:'Để răng chắc khoẻ, em nên?',o:['Đánh răng sáng và tối, hạn chế ăn nhiều kẹo','Chỉ súc miệng','Ăn thật nhiều kẹo','Không cần đánh răng'],a:0,fb:'Đánh răng 2 lần/ngày và hạn chế đồ ngọt giúp răng chắc khoẻ.'}]}]}],
    skills:['Nhân chia thành thạo','Viết đoạn văn ngắn'],
    quiz:[{q:'7 × 8 = ?',o:['56','54','64','49'],a:0},
      {q:'Chu vi hình vuông cạnh 5cm là?',o:['20cm','10cm','25cm','15cm'],a:0},
      {q:'Từ "ngoan" là từ chỉ?',o:['Đặc điểm','Sự vật','Hoạt động','Số lượng'],a:0}]},

  g4:{emoji:'4️⃣',name:'Lớp 4',accent:'#0ea5e9',intro:'Lớp 4 — đầy đủ 11 môn × 35 tuần theo GDPT 2018. Phân số, dấu hiệu chia hết và bắt đầu môn Khoa học, Lịch sử & Địa lí, Công nghệ.',
    rooms:[{ic:'➗',name:'Toán lớp 4',rd:'Số đến lớp triệu, phân số (4 phép), dấu hiệu chia hết, góc, hình bình hành.',href:'/module.html?domain=primary&module=P4'},
      {ic:'📖',name:'Tiếng Việt lớp 4',rd:'Danh-động-tính từ, kiểu câu, MRVT, văn miêu tả đồ vật-cây cối-con vật.',href:'/module.html?domain=primary&module=P4TV'},
      {ic:'🇬🇧',name:'Tiếng Anh lớp 4',rd:'Present simple/continuous, can/can\'t, past simple, future will/going to.',href:'/module.html?domain=primary&module=P4TA'},
      {ic:'🔬',name:'Khoa học lớp 4',rd:'Nước, không khí, ánh sáng, nhiệt, âm thanh, thực-động vật, dinh dưỡng.',href:'/module.html?domain=primary&module=P4KH'},
      {ic:'🗺️',name:'Lịch sử & Địa lý 4',rd:'Bản đồ, các vùng VN, Văn Lang-Âu Lạc, Lý-Trần, Lê Lợi, Quang Trung.',href:'/module.html?domain=primary&module=P4LSDL'},
      {ic:'💝',name:'Đạo đức lớp 4',rd:'Yêu thương, kính thầy cô, biết ơn người lao động, trung thực, tiết kiệm.',href:'/module.html?domain=primary&module=P4DD'},
      {ic:'🎵',name:'Âm nhạc lớp 4',rd:'Nhịp 2/4 - 3/4, recorder, dân ca vùng, Em yêu hòa bình, Bàn tay mẹ.',href:'/module.html?domain=primary&module=P4AN'},
      {ic:'🎨',name:'Mĩ thuật lớp 4',rd:'Bố cục cân đối, tĩnh vật, chân dung, in mộc bản, thiết kế logo.',href:'/module.html?domain=primary&module=P4MT'},
      {ic:'⚽',name:'GDTC lớp 4',rd:'Bài thể dục 8 động tác, chạy 60m, bật xa, nhảy dây tập thể, đá cầu.',href:'/module.html?domain=primary&module=P4GDTC'},
      {ic:'🌟',name:'HĐ trải nghiệm lớp 4',rd:'Kỹ năng học tập, làm việc nhóm, dã ngoại, các nghề, ngày lễ lớn.',href:'/module.html?domain=primary&module=P4HDTN'},
      {ic:'🔧',name:'Công nghệ lớp 4',rd:'Hoa cây cảnh, chậu cây tự chế, an toàn lao động, lắp ghép, máy tính cá nhân.',href:'/module.html?domain=primary&module=P4CN'},
      {ic:'📖',name:'Tiếng Việt 4 — Câu & văn',rd:'Câu kể, câu hỏi, câu cảm; viết bài văn.',panel:[
        {h:'Các kiểu câu'},
        {ul:['Câu kể: thuật lại sự việc, kết thúc bằng dấu chấm','Câu hỏi: hỏi điều chưa biết, kết thúc bằng dấu chấm hỏi','Câu cảm: bộc lộ cảm xúc, thường có "ôi, chao, biết bao!"']},
        {note:'Bài văn có 3 phần: mở bài – thân bài – kết bài.'}]},
      {ic:'🔬',name:'Khoa học 4',rd:'Nước, không khí và dinh dưỡng.',panel:[
        {h:'Khám phá khoa học'},
        {cards:[{ic:'💧',t:'Nước',d:'Có 3 thể: rắn – lỏng – khí.'},{ic:'🌬️',t:'Không khí',d:'Cần cho sự sống & sự cháy.'},{ic:'🥗',t:'Dinh dưỡng',d:'Ăn đủ 4 nhóm chất để khoẻ.'}]},
        {mcq:[{q:'Nước đóng băng (thể rắn) khi nào?',o:['Khi gặp lạnh (0°C trở xuống)','Khi đun sôi','Khi để ngoài nắng','Khi pha đường'],a:0,fb:'Gặp lạnh, nước chuyển từ thể lỏng sang thể rắn (đóng băng) ở 0°C.'}]}]},
      {ic:'🗺️',name:'Lịch sử & Địa lí 4',rd:'Buổi đầu dựng nước & bản đồ Việt Nam.',panel:[
        {ul:['Nhà nước Văn Lang – Âu Lạc: buổi đầu dựng nước','Truyền thuyết Con Rồng cháu Tiên, Sơn Tinh – Thuỷ Tinh','Việt Nam hình chữ S, có đồng bằng, núi và biển']},
        {note:'Bản đồ giúp em biết phương hướng và vị trí các vùng miền.'}]},
      // Bản đồ VN game — bổ trợ LSDL lớp 4 (vùng miền + đặc sản)
      {ic:'🗺️',name:'Bản đồ Tri thức 34 tỉnh',rd:'Khám phá đặc sản, danh lam và làm quiz về 34 tỉnh thành Việt Nam (sau sáp nhập 2025).',href:'/ban-do-vn.html'}],
    skills:['Phân số & hình học','Bắt đầu Khoa học – Sử – Địa'],
    quiz:[{q:'Phân số nào bằng một nửa?',o:['1/2','1/3','2/3','3/4'],a:0},
      {q:'Số nào chia hết cho 5?',o:['25','22','13','9'],a:0},
      {q:'Nước sôi và bốc hơi khi nào?',o:['Khi bị đun nóng (100°C)','Khi gặp lạnh','Khi để trong tủ đá','Khi trộn muối'],a:0}]},

  g5:{emoji:'5️⃣',name:'Lớp 5',accent:'#8b5cf6',intro:'Lớp 5 — đầy đủ 11 môn × 35 tuần. Số thập phân, tỉ số phần trăm, hình học; chuẩn bị hành trang lên THCS.',
    rooms:[{ic:'➗',name:'Toán lớp 5',rd:'Phân số, số thập phân (4 phép), thể tích, tam giác/thang/tròn, %, vận tốc. Có mini-game Bão Số Học bên trong.',href:'/module.html?domain=primary&module=P5'},
      {ic:'📖',name:'Tiếng Việt lớp 5',rd:'Đại từ, quan hệ từ, câu ghép, liên kết câu, tả người-cảnh, viết đơn-báo cáo.',href:'/module.html?domain=primary&module=P5TV'},
      {ic:'🇬🇧',name:'Tiếng Anh lớp 5',rd:'Past simple full, will/going to, so sánh, can/should, daily routine, jobs.',href:'/module.html?domain=primary&module=P5TA'},
      {ic:'🔬',name:'Khoa học lớp 5',rd:'Sự sinh sản, dậy thì, an toàn dùng thuốc, năng lượng, hỗn hợp, môi trường.',href:'/module.html?domain=primary&module=P5KH'},
      {ic:'🗺️',name:'Lịch sử & Địa lý 5',rd:'Pháp xâm lược, Đảng CSVN, CMT8, 2/9/1945, ĐBP, 30/4/1975, đổi mới.',href:'/module.html?domain=primary&module=P5LSDL'},
      {ic:'💝',name:'Đạo đức lớp 5',rd:'Biết ơn tổ tiên, tự lập, có trách nhiệm, tôn trọng phụ nữ, yêu hoà bình.',href:'/module.html?domain=primary&module=P5DD'},
      {ic:'🎵',name:'Âm nhạc lớp 5',rd:'Recorder nâng cao, hợp xướng, nhạc cụ dân tộc, nhịp 4/4, Reo vang bình minh.',href:'/module.html?domain=primary&module=P5AN'},
      {ic:'🎨',name:'Mĩ thuật lớp 5',rd:'Phối cảnh, tĩnh vật nâng cao, chân dung tự hoạ, in tranh khắc gỗ, thiệp 3D.',href:'/module.html?domain=primary&module=P5MT'},
      {ic:'⚽',name:'GDTC lớp 5',rd:'Thể dục 10 động tác, chạy 80m, đá cầu 3 người, cầu lông, bơi sải, kéo co.',href:'/module.html?domain=primary&module=P5GDTC'},
      {ic:'🌟',name:'HĐ trải nghiệm lớp 5',rd:'Chuẩn bị lên cấp 2, tự lập, dã ngoại, ngày lễ lớn, tổng kết cấp 1.',href:'/module.html?domain=primary&module=P5HDTN'},
      {ic:'🔧',name:'Công nghệ lớp 5',rd:'Trồng rau, chăm gà-cá cảnh, an toàn điện, máy vi tính, làm bếp đơn giản.',href:'/module.html?domain=primary&module=P5CN'},
      {ic:'📖',name:'Tiếng Việt 5 — Viết văn',rd:'Liên kết câu; văn tả & kể.',panel:[
        {h:'Viết bài văn hay'},
        {ul:['Liên kết câu bằng từ nối, lặp từ, thay thế từ','Văn tả: tả người, tả cảnh có quan sát & cảm xúc','Văn kể: kể lại sự việc theo trình tự']},
        {note:'Lập dàn ý trước khi viết để bài mạch lạc, không thiếu ý.'}]},
      {ic:'🔬',name:'Khoa học 5',rd:'Cây cối, con vật và môi trường.',panel:[
        {h:'Sự sống & môi trường'},
        {ul:['Cây ra hoa, kết quả rồi sinh ra cây con','Mỗi loài vật có cách sinh sản và lớn lên riêng','Bảo vệ môi trường: trồng cây, tiết kiệm nước, phân loại rác']},
        {mcq:[{q:'Việc nào giúp bảo vệ môi trường?',o:['Bỏ rác đúng nơi & phân loại rác','Vứt rác xuống sông','Để vòi nước chảy lãng phí','Bẻ cành, hái lá cây'],a:0,fb:'Giảm – Tái sử dụng – Tái chế (3R) và bỏ rác đúng nơi giúp môi trường sạch đẹp.'}]}]},
      {ic:'🗺️',name:'Lịch sử & Địa lí 5',rd:'Các mốc lịch sử & địa lí Việt Nam.',panel:[
        {timeline:[{t:'Dựng nước',d:'Văn Lang – Âu Lạc.'},{t:'Đấu tranh giữ nước',d:'Các cuộc kháng chiến chống ngoại xâm.'},{t:'1945',d:'Bác Hồ đọc Tuyên ngôn Độc lập.'},{t:'1975',d:'Đất nước thống nhất.'}]},
        {note:'Việt Nam nằm ở Đông Nam Á, có nhiều dân tộc cùng chung sống.'}]},
      // Bản đồ VN — ôn LS-ĐL lớp 5
      {ic:'🗺️',name:'Bản đồ Tri thức 34 tỉnh',rd:'34 tỉnh thành — đặc sản, danh lam, quiz địa lý. Ôn lại trước khi lên cấp 2.',href:'/ban-do-vn.html'}],
    skills:['Số thập phân & phần trăm','Sẵn sàng lên lớp 6'],
    quiz:[{q:'Số thập phân 0,5 bằng phân số nào?',o:['1/2','1/5','5','1/50'],a:0},
      {q:'25% của 100 là?',o:['25','50','75','10'],a:0},
      {q:'Bác Hồ đọc Tuyên ngôn Độc lập năm nào?',o:['1945','1930','1954','1975'],a:0}]},

  library:{emoji:'📚',name:'Thư viện',accent:'#3b82f6',intro:'Thư viện trường — nơi đọc sách, nghe kể chuyện và nuôi dưỡng tình yêu đọc sách.',
    rooms:[{ic:'📚',name:'Góc đọc sách',rd:'Văn hoá đọc & giữ gìn sách.',panel:[
        {h:'Em yêu đọc sách'},
        {ul:['Chọn sách phù hợp lứa tuổi: truyện tranh, truyện cổ tích, sách khoa học vui','Giữ sách sạch: không vẽ bậy, không gấp trang, bọc bìa cẩn thận','Mượn sách phải trả đúng hẹn cho bạn khác cùng đọc']},
        {note:'Đọc mỗi ngày 15 phút giúp em giỏi tiếng Việt và biết nhiều điều hay.'}]},
      {ic:'🦊',name:'Kể chuyện — Bài học hay',rd:'Truyện ngụ ngôn & bài học.',panel:[
        {h:'Rùa và Thỏ'},
        {p:'Thỏ chủ quan ngủ quên, Rùa chậm mà chăm chỉ nên về đích trước.'},
        {note:'Bài học: kiên trì, chăm chỉ và không kiêu căng thì sẽ thành công.'}]},
      {ic:'🧠',name:'Đố vui ôn tập',rd:'Câu đố nhanh giữa các môn.',panel:[
        {mcq:[{q:'Con gì kêu "gâu gâu" và trông nhà giúp người?',o:['Con chó','Con mèo','Con gà','Con cá'],a:0,fb:'Chó là vật nuôi trung thành, biết trông nhà.'},
          {q:'Một tuần có mấy ngày?',o:['7 ngày','5 ngày','10 ngày','12 ngày'],a:0,fb:'Một tuần có 7 ngày, từ thứ Hai đến Chủ nhật.'}]}]}],
    skills:['Văn hoá đọc','Yêu sách & tự học'],
    quiz:[{q:'Khi mượn sách thư viện, em cần?',o:['Giữ gìn và trả đúng hẹn','Vẽ vào sách','Xé trang mình thích','Giữ luôn không trả'],a:0},
      {q:'Đọc sách mỗi ngày giúp em?',o:['Giỏi đọc & biết nhiều điều','Mỏi mắt nên đừng đọc','Không có ích gì','Quên hết chữ'],a:0},
      {q:'Truyện "Rùa và Thỏ" khuyên em điều gì?',o:['Kiên trì, chăm chỉ, không kiêu căng','Nên ngủ nhiều','Chạy thật nhanh','Coi thường bạn bè'],a:0}]},

  english:{emoji:'🔤',name:'Phòng Tiếng Anh',accent:'#60a5fa',intro:'Phòng Tiếng Anh — học từ vựng và mẫu câu đơn giản qua hình ảnh, trò chơi lật thẻ.',
    rooms:[{ic:'🃏',name:'Lật thẻ từ vựng',rd:'Con vật, màu sắc, số đếm.',panel:[
        {p:'Bấm vào thẻ để xem nghĩa tiếng Việt.'},
        {flash:[{e:'🐘',f:'Elephant',b:'Con voi'},{e:'🦁',f:'Lion',b:'Con sư tử'},{e:'🟡',f:'Yellow',b:'Màu vàng'},{e:'🟠',f:'Orange',b:'Màu cam'},{e:'3️⃣',f:'Three',b:'Số ba'},{e:'🔟',f:'Ten',b:'Số mười'}]}]},
      {ic:'💬',name:'Mẫu câu chào hỏi',rd:'Nói câu tiếng Anh đầu tiên.',panel:[
        {h:'Chào hỏi & giới thiệu'},
        {ul:['Hello! / Hi! — Xin chào!','What is your name? — Bạn tên là gì?','My name is Nam. — Mình tên là Nam.','How are you? — I am fine, thank you!']},
        {mcq:[{q:'"Goodbye" nghĩa là gì?',o:['Tạm biệt','Xin chào','Cảm ơn','Xin lỗi'],a:0,fb:'"Goodbye" (hoặc "Bye") nghĩa là Tạm biệt.'}]}]}],
    skills:['Từ vựng cơ bản','Mẫu câu chào hỏi'],
    quiz:[{q:'"Hello" nghĩa là gì?',o:['Xin chào','Tạm biệt','Cảm ơn','Con mèo'],a:0},
      {q:'"Red" là màu gì?',o:['Màu đỏ','Màu xanh','Màu vàng','Màu đen'],a:0},
      {q:'"Cat" nghĩa là con gì?',o:['Con mèo','Con chó','Con voi','Con cá'],a:0}]},

  computer:{emoji:'💻',name:'Phòng Tin học',accent:'#8b5cf6',intro:'Phòng Tin học — làm quen máy tính, gõ phím, vẽ trên máy và học cách dùng internet an toàn.',
    rooms:[{ic:'🛡️',name:'An toàn trên mạng',rd:'Quy tắc an toàn cho học sinh.',panel:[
        {h:'Em dùng internet an toàn'},
        {ul:['Không cho người lạ trên mạng biết tên thật, địa chỉ, trường lớp','Không nhấn vào đường link hay quảng cáo lạ','Gặp điều khó chịu trên mạng → kể ngay cho bố mẹ, thầy cô','Hỏi người lớn trước khi tải hay cài đặt gì đó']},
        {mcq:[{q:'Một người lạ trên mạng hỏi địa chỉ nhà em. Em nên?',o:['Không nói và kể cho bố mẹ biết','Nói luôn cho họ','Cho số điện thoại','Hẹn gặp riêng'],a:0,fb:'Tuyệt đối không chia sẻ thông tin cá nhân với người lạ và hãy báo người lớn.'}]}]},
      {ic:'🖥️',name:'Các bộ phận máy tính',rd:'Nhận biết phần cứng quen thuộc.',panel:[
        {cards:[{ic:'🖥️',t:'Màn hình',d:'Hiển thị hình ảnh.'},{ic:'⌨️',t:'Bàn phím',d:'Gõ chữ và số.'},{ic:'🖱️',t:'Chuột',d:'Di chuyển & chọn.'},{ic:'🔊',t:'Loa',d:'Phát âm thanh.'}]},
        {note:'Ngồi thẳng lưng, mắt cách màn hình một sải tay và nghỉ mắt sau 20 phút.'}]},
      // Code Quest — lập trình kéo thả như Scratch, làm quen tư duy thuật toán
      {ic:'🤖',name:'Code Quest — Lập trình vui',rd:'Kéo thả khối lệnh để điều khiển robot 🤖 giải puzzle. 10 level từ dễ đến khó.',href:'/code-quest.html'}],
    skills:['Dùng internet an toàn','Biết các bộ phận máy tính'],
    quiz:[{q:'Bộ phận nào dùng để gõ chữ?',o:['Bàn phím','Màn hình','Loa','Chuột'],a:0},
      {q:'Người lạ trên mạng xin ảnh và địa chỉ, em nên?',o:['Từ chối và báo người lớn','Gửi ngay','Gửi cho vui','Đăng công khai'],a:0},
      {q:'Ngồi học máy tính đúng cách là?',o:['Thẳng lưng, nghỉ mắt thường xuyên','Nằm dùng máy','Ngồi sát màn hình','Dùng liên tục vài giờ'],a:0}]},

  admin:{emoji:'🏫',name:'Ban giám hiệu',accent:'#f59e0b',intro:'Khu điều hành nhà trường: nội quy, bảng tin và nơi em gửi ý kiến, mong muốn của mình.',
    rooms:[{ic:'📜',name:'Nội quy trường em',rd:'Những điều nên làm ở trường.',panel:[
        {h:'Nội quy học sinh'},
        {check:['Đi học đúng giờ, mặc đồng phục gọn gàng','Lễ phép với thầy cô, hoà nhã với bạn bè','Giữ gìn vệ sinh chung, không vứt rác bừa bãi','Học bài và làm bài đầy đủ']},
        {note:'Thực hiện tốt nội quy giúp lớp em đoàn kết và trường thêm đẹp.'}]},
      {ic:'⭐',name:'5 điều Bác Hồ dạy',rd:'Sắp xếp lại đúng thứ tự 5 điều.',panel:[
        {ol:['Yêu Tổ quốc, yêu đồng bào','Học tập tốt, lao động tốt','Đoàn kết tốt, kỷ luật tốt','Giữ gìn vệ sinh thật tốt','Khiêm tốn, thật thà, dũng cảm']},
        {order:{title:'Sắp xếp đúng thứ tự 5 điều Bác Hồ dạy',items:['Yêu Tổ quốc, yêu đồng bào','Học tập tốt, lao động tốt','Đoàn kết tốt, kỷ luật tốt','Giữ gìn vệ sinh thật tốt','Khiêm tốn, thật thà, dũng cảm']}},
        {note:'Em hãy chọn một điều để cố gắng thực hiện trong tuần này nhé!'}]},
      {ic:'🏛️',name:'Ban điều hành AI',rd:'Nói điều em mong muốn ở trường & bình chọn.',board:true},
      // Cây Tri Thức + Bảng Phong Thần — dashboard cá nhân + xếp hạng, đặt ở Ban giám hiệu
      {ic:'🌳',name:'Cây Tri Thức của em',rd:'Mỗi tuần em hoàn thành = 1 chiếc lá lên cây. Lá đầy đủ → cây xum xuê!',href:'/cay-tri-thuc.html'},
      {ic:'🏆',name:'Bảng Phong Thần',rd:'Xem em đứng thứ mấy theo tuần / tháng / mọi thời điểm. Cố lên!',href:'/bang-phong-than.html'}],
    skills:['Hiểu nội quy trường','Ghi nhớ 5 điều Bác Hồ dạy'],
    quiz:[{q:'5 điều Bác Hồ dạy, điều đầu tiên là?',o:['Yêu Tổ quốc, yêu đồng bào','Giữ gìn vệ sinh','Khiêm tốn, thật thà','Học tập tốt'],a:0},
      {q:'Đến trường, em nên?',o:['Đi học đúng giờ, lễ phép','Đi muộn cũng được','Nói chuyện riêng trong giờ','Vứt rác ra sân'],a:0},
      {q:'Gặp thầy cô giáo, em cần?',o:['Chào hỏi lễ phép','Làm ngơ đi qua','Trêu đùa','Chạy thật nhanh'],a:0}]},

  doi:{emoji:'🧣',name:'Phòng Đội & Sao Nhi đồng',accent:'#ef4444',intro:'Đội Thiếu niên Tiền phong Hồ Chí Minh và Sao Nhi đồng — nơi sinh hoạt tập thể và rèn kĩ năng.',
    rooms:[{ic:'⭐',name:'Sao Nhi đồng',rd:'Sinh hoạt Sao của lớp nhỏ.',panel:[
        {h:'Nhi đồng & Sao'},
        {ul:['Học sinh lớp 1–3 sinh hoạt theo Sao Nhi đồng','Mỗi Sao có tên đẹp: Sao Chăm ngoan, Sao Đoàn kết…','Lời hứa nhi đồng: vâng lời Bác Hồ dạy']},
        {note:'Lên lớp 4–5, em phấn đấu để được kết nạp vào Đội.'}]},
      {ic:'🧣',name:'Khăn quàng đỏ',rd:'Ý nghĩa & cách thắt khăn.',panel:[
        {h:'Người Đội viên'},
        {ul:['Khăn quàng đỏ là một phần của lá cờ Tổ quốc','Đội viên đeo khăn quàng khi đến trường và sinh hoạt','Chào kiểu Đội: bàn tay phải giơ cao trên đầu']},
        {note:'Đeo khăn quàng ngay ngắn thể hiện em là Đội viên gương mẫu.'}]},
      {ic:'🤝',name:'Kĩ năng & hoạt động',rd:'Làm việc tốt mỗi ngày.',panel:[
        {mcq:[{q:'"Làm nghìn việc tốt" — việc nào là việc tốt?',o:['Giúp bạn, nhặt được của rơi trả lại','Nói dối thầy cô','Bắt nạt bạn nhỏ','Bỏ học đi chơi'],a:0,fb:'Việc tốt là giúp đỡ mọi người, thật thà và trung thực.'}]}]},
      // Pet Tri Thức — Tiziamon là "linh vật Đội" của em
      {ic:'🐉',name:'Tiziamon — linh vật của em',rd:'Nuôi Tiziamon — sinh vật ảo tiến hoá theo XP. Trả lời quiz để cho Pet ăn!',href:'/pet-tri-thuc.html?grade=tieu-hoc'}],
    skills:['Sinh hoạt tập thể','Tinh thần Đội viên'],
    quiz:[{q:'Khăn quàng đỏ tượng trưng cho?',o:['Một phần lá cờ Tổ quốc','Một chiếc khăn bình thường','Đồng phục thể thao','Khăn lau bảng'],a:0},
      {q:'Tên đầy đủ của Đội là?',o:['Đội Thiếu niên Tiền phong Hồ Chí Minh','Đội bóng đá','Đội văn nghệ','Đội trực nhật'],a:0},
      {q:'Nhặt được của rơi, em nên?',o:['Trả lại người mất hoặc nhờ thầy cô','Giữ làm của mình','Giấu đi','Vứt bỏ'],a:0}]},

  health:{emoji:'⛑️',name:'Phòng Y tế',accent:'#e23b3b',intro:'Chăm sóc sức khoẻ học đường: rửa tay, ăn uống lành mạnh và sơ cứu vết thương nhỏ.',
    rooms:[{ic:'🧼',name:'Rửa tay đúng cách',rd:'Tập sắp xếp 6 bước rửa tay.',panel:[
        {h:'Em rửa tay sạch'},
        {ol:['Làm ướt tay, xoa xà phòng','Chà lòng bàn tay vào nhau','Chà mu bàn tay & kẽ ngón','Chà ngón tay & móng tay','Rửa sạch dưới vòi nước','Lau khô bằng khăn sạch']},
        {order:{title:'Sắp xếp 6 bước rửa tay đúng cách',items:['Làm ướt tay, xoa xà phòng','Chà lòng bàn tay vào nhau','Chà mu bàn tay & kẽ ngón','Chà ngón tay & móng tay','Rửa sạch dưới vòi nước','Lau khô bằng khăn sạch']}},
        {note:'Rửa tay trước khi ăn, sau khi đi vệ sinh và sau khi chơi ngoài sân.'}]},
      {ic:'🥗',name:'Ăn uống lành mạnh',rd:'Tháp dinh dưỡng cho em.',panel:[
        {cards:[{ic:'🍚',t:'Tinh bột',d:'Cơm, bánh mì — ăn đủ.'},{ic:'🥦',t:'Rau & quả',d:'Ăn nhiều mỗi ngày.'},{ic:'🍗',t:'Đạm',d:'Thịt, cá, trứng, đậu.'},{ic:'🍬',t:'Đồ ngọt',d:'Hạn chế bánh kẹo.'}]},
        {note:'Uống đủ nước và ăn đa dạng để cơ thể khoẻ mạnh, học tốt.'}]},
      {ic:'🩹',name:'Sơ cứu vết thương nhỏ',rd:'Khi bị trầy xước.',panel:[
        {mcq:[{q:'Khi bị trầy xước nhẹ ở đầu gối, em nên?',o:['Rửa sạch vết thương & báo cô y tế','Bôi đất cho cầm máu','Mặc kệ và tiếp tục chơi','Gãi cho đỡ ngứa'],a:0,fb:'Rửa sạch bằng nước, sát trùng và báo người lớn/cô y tế để được dán băng.'}]}]}],
    skills:['Vệ sinh cá nhân','Ăn uống lành mạnh'],
    quiz:[{q:'Em nên rửa tay khi nào?',o:['Trước khi ăn & sau khi đi vệ sinh','Chỉ khi tay bẩn nhìn thấy','Một tuần một lần','Không cần rửa'],a:0},
      {q:'Nhóm thức ăn nào nên hạn chế?',o:['Bánh kẹo, nước ngọt','Rau xanh','Cơm','Cá'],a:0},
      {q:'Để khoẻ mạnh, mỗi ngày em cần?',o:['Ngủ đủ giấc & vận động','Thức khuya xem tivi','Bỏ bữa sáng','Ăn thật nhiều kẹo'],a:0}]},

  art:{emoji:'🎨',name:'Phòng Mĩ thuật',accent:'#f472b6',intro:'Phòng Mĩ thuật — pha màu, vẽ tự do và thoả sức sáng tạo.',
    rooms:[{ic:'🌈',name:'Màu sắc & pha màu',rd:'Pha 3 màu cơ bản thành màu mới.',panel:[
        {h:'Thế giới màu sắc'},
        {cards:[{ic:'🔴',t:'Đỏ',d:'Màu cơ bản.'},{ic:'🟡',t:'Vàng',d:'Màu cơ bản.'},{ic:'🔵',t:'Lam',d:'Màu cơ bản.'}]},
        {ul:['Đỏ + Vàng = Cam','Vàng + Lam = Lục (xanh lá)','Đỏ + Lam = Tím']},
        {mixer:true},
        {note:'Từ 3 màu cơ bản, em pha ra rất nhiều màu mới!'}]},
      {ic:'🖍️',name:'Tập vẽ & nặn',rd:'Vẽ tranh trên máy.',panel:[
        {ul:['Vẽ những gì em yêu thích: gia đình, trường lớp, thiên nhiên','Tô màu gọn trong nét, không lem ra ngoài','Nặn đất tạo hình con vật, đồ vật ngộ nghĩnh']},
        {draw:true},
        {note:'Không có bức tranh nào là sai — quan trọng là em sáng tạo và vui!'}]},
      // Pixel Art Studio — vẽ pixel sáng tạo
      {ic:'🎨',name:'Pixel Art Studio',rd:'Vẽ pixel art 16×16 với 16 màu, lưu PNG và share cho bạn.',href:'/pixel-art-studio.html'}],
    skills:['Nhận biết & pha màu','Sáng tạo nghệ thuật'],
    quiz:[{q:'Đỏ pha với Vàng ra màu gì?',o:['Cam','Tím','Xanh lá','Đen'],a:0},
      {q:'Đâu là ba màu cơ bản?',o:['Đỏ, Vàng, Lam','Cam, Lục, Tím','Đen, Trắng, Xám','Hồng, Nâu, Be'],a:0},
      {q:'Vàng pha với Lam (xanh dương) ra màu gì?',o:['Xanh lá','Cam','Tím','Đỏ'],a:0}]},

  music:{emoji:'🎵',name:'Phòng Âm nhạc',accent:'#a855f7',intro:'Phòng Âm nhạc — chơi đàn, gõ nhịp và hát theo bài hát em yêu thích.',
    rooms:[{ic:'🎼',name:'Bảy nốt nhạc',rd:'Bấm phím để nghe Đồ Rê Mi...',panel:[
        {h:'7 nốt nhạc cơ bản'},
        {p:'Đồ – Rê – Mi – Fa – Sol – La – Si, rồi lại trở về Đố (Đồ cao).'},
        {piano:true},
        {note:'Hát đúng cao độ và rõ lời giúp bài hát hay hơn.'}]},
      {ic:'🥁',name:'Hát & gõ nhịp',rd:'Tập gõ phách 2/4, 3/4, 4/4.',panel:[
        {ul:['Vỗ tay hoặc gõ thanh phách theo phách mạnh – nhẹ','Hát rõ lời, lấy hơi đúng chỗ','Biểu diễn tự tin, vui tươi']},
        {rhythm:true},
        {mcq:[{q:'Có bao nhiêu nốt nhạc cơ bản?',o:['7 nốt','5 nốt','10 nốt','3 nốt'],a:0,fb:'Có 7 nốt: Đồ, Rê, Mi, Fa, Sol, La, Si.'}]}]}],
    skills:['Biết 7 nốt nhạc','Hát & giữ nhịp'],
    quiz:[{q:'Nốt nhạc đầu tiên là?',o:['Đồ','Sol','La','Si'],a:0},
      {q:'Có mấy nốt nhạc cơ bản?',o:['7','5','8','3'],a:0},
      {q:'Khi hát, em nên?',o:['Hát rõ lời, đúng nhịp','Hát thật to át bạn','Hát sai cũng được','Không cần lấy hơi'],a:0}]},

  science:{emoji:'🔬',name:'Phòng Khoa học & TN-XH',accent:'#14b8a6',intro:'Phòng Khoa học — làm thí nghiệm vui, khám phá cây cối, con vật và bảo vệ môi trường.',
    rooms:[{ic:'💧',name:'Ba thể của nước',rd:'Rắn – lỏng – khí.',panel:[
        {h:'Nước kì diệu'},
        {cards:[{ic:'🧊',t:'Thể rắn',d:'Nước đá (gặp lạnh, 0°C).'},{ic:'💧',t:'Thể lỏng',d:'Nước ta thường thấy.'},{ic:'☁️',t:'Thể khí',d:'Hơi nước (đun nóng bốc hơi).'}]},
        {note:'Nước có thể chuyển qua lại giữa 3 thể khi nóng lên hoặc lạnh đi.'}]},
      {ic:'🌱',name:'Cây cần gì để sống?',rd:'Điều kiện cho cây lớn.',panel:[
        {ul:['Cây cần: nước, ánh sáng, không khí và đất','Lá cây quang hợp dưới ánh nắng để tạo thức ăn','Tưới cây vừa đủ, đặt cây nơi có nắng']},
        {mcq:[{q:'Cây xanh KHÔNG cần điều gì để sống?',o:['Bóng tối hoàn toàn','Nước','Ánh sáng','Không khí'],a:0,fb:'Cây cần ánh sáng để quang hợp — để trong bóng tối lâu cây sẽ héo.'}]}]},
      {ic:'♻️',name:'Bảo vệ môi trường',rd:'Việc nhỏ ý nghĩa lớn.',panel:[
        {ul:['Phân loại rác: rác tái chế và rác bỏ đi','Tiết kiệm nước và điện','Trồng và chăm sóc cây xanh']},
        {note:'3R: Reduce – Reuse – Recycle (Giảm – Tái sử dụng – Tái chế).'}]}],
    skills:['Hiểu hiện tượng tự nhiên','Ý thức bảo vệ môi trường'],
    quiz:[{q:'Nước đá là nước ở thể nào?',o:['Thể rắn','Thể lỏng','Thể khí','Không phải nước'],a:0},
      {q:'Cây xanh cần gì để sống?',o:['Nước, ánh sáng, không khí','Chỉ cần bóng tối','Chỉ cần kẹo','Không cần gì'],a:0},
      {q:'Việc nào bảo vệ môi trường?',o:['Trồng cây & tiết kiệm nước','Xả rác bừa bãi','Phí điện nước','Bẻ cây'],a:0}]},

  canteen:{emoji:'🍱',name:'Nhà ăn bán trú',accent:'#f59e0b',intro:'Nhà ăn bán trú — ăn trưa đủ chất, giữ vệ sinh và rèn nếp ăn uống văn minh.',
    rooms:[{ic:'🍽️',name:'Bữa ăn đủ chất',rd:'Ăn đa dạng để khoẻ.',panel:[
        {h:'Bữa trưa khoẻ mạnh'},
        {ul:['Có đủ cơm, món mặn (đạm), canh và rau','Ăn thêm trái cây tráng miệng','Nhai kĩ, ăn vừa đủ no, không bỏ phí thức ăn']},
        {note:'Ăn đủ bữa và đa dạng giúp em có sức học cả buổi chiều.'}]},
      {ic:'🧼',name:'Vệ sinh ăn uống',rd:'Nếp ăn sạch sẽ.',panel:[
        {check:['Rửa tay trước khi ăn','Ăn chín, uống nước đun sôi để nguội','Không nói chuyện lúc miệng đầy thức ăn','Dọn bát đĩa gọn gàng sau khi ăn']},
        {mcq:[{q:'Trước khi ăn cơm, em phải?',o:['Rửa tay sạch','Chơi cho mệt đã','Ăn ngay không cần rửa','Uống thật nhiều nước ngọt'],a:0,fb:'Rửa tay trước khi ăn để vi khuẩn không theo thức ăn vào bụng.'}]}]}],
    skills:['Ăn uống đủ chất','Giữ vệ sinh ăn uống'],
    quiz:[{q:'Một bữa ăn cân đối nên có?',o:['Cơm, đạm, rau và canh','Chỉ toàn bánh kẹo','Chỉ nước ngọt','Chỉ cơm trắng'],a:0},
      {q:'Trước khi ăn, em cần?',o:['Rửa tay sạch','Xem tivi','Chạy nhảy','Không làm gì'],a:0},
      {q:'Với thức ăn còn thừa, em nên?',o:['Lấy vừa đủ, không bỏ phí','Bỏ thật nhiều đi','Vứt xuống đất','Ném cho bạn'],a:0}]},

  gym:{emoji:'🤸',name:'Nhà đa năng (Thể chất)',accent:'#0ea5e9',intro:'Nhà đa năng — vận động, chơi trò chơi và rèn sức khoẻ một cách an toàn, vui vẻ.',
    rooms:[{ic:'🤸',name:'Khởi động trước khi chơi',rd:'Làm nóng cơ thể.',panel:[
        {h:'Khởi động đúng cách'},
        {ol:['Xoay cổ tay, cổ chân nhẹ nhàng','Xoay khớp vai, khớp gối','Chạy bước nhỏ tại chỗ','Hít thở sâu vài lần']},
        {order:{title:'Sắp xếp 4 bước khởi động đúng',items:['Xoay cổ tay, cổ chân nhẹ nhàng','Xoay khớp vai, khớp gối','Chạy bước nhỏ tại chỗ','Hít thở sâu vài lần']}},
        {note:'Khởi động giúp em tránh bị đau cơ hay trẹo chân khi vận động.'}]},
      {ic:'🪀',name:'Trò chơi vận động',rd:'Vận động vui & đoàn kết.',panel:[
        {cards:[{ic:'🤾',t:'Nhảy dây',d:'Khoẻ chân, bền bỉ.'},{ic:'🏸',t:'Đá cầu',d:'Khéo léo, nhanh nhẹn.'},{ic:'🪢',t:'Kéo co',d:'Đoàn kết cả đội.'}]},
        {note:'Chơi cùng nhau giúp em vui, khoẻ và thêm gắn bó với bạn bè.'}]},
      {ic:'⚠️',name:'An toàn khi vận động',rd:'Chơi vui nhưng an toàn.',panel:[
        {mcq:[{q:'Khi chơi đùa ngoài sân, em nên?',o:['Chơi nhẹ nhàng, không xô đẩy bạn','Xô đẩy cho vui','Chạy nhắm mắt','Leo trèo nơi nguy hiểm'],a:0,fb:'Chơi an toàn: không xô đẩy, không leo trèo nơi nguy hiểm để tránh té ngã.'}]}]}],
    skills:['Vận động đúng cách','Chơi an toàn & đoàn kết'],
    quiz:[{q:'Trước khi chơi thể thao, em nên?',o:['Khởi động làm nóng cơ thể','Ăn thật no','Chạy hết sức ngay','Ngồi yên'],a:0},
      {q:'Khi chơi cùng bạn, em nên?',o:['Nhường nhịn, không xô đẩy','Tranh giành','Chơi xấu','Bắt nạt bạn nhỏ'],a:0},
      {q:'Vận động mỗi ngày giúp em?',o:['Khoẻ mạnh & nhanh nhẹn','Mệt nên đừng chơi','Học kém đi','Hay ốm hơn'],a:0}]},
};

// ============================================================
// TRƯỜNG MẦM NON · 3 lớp tuổi (Mầm/Chồi/Lá) + Nhà ăn Bán trú
// ============================================================
// Hoạt động cho bé 3–5 tuổi: học mà chơi qua hình ảnh, bài hát, trò vận động,
// lật thẻ. Mỗi lớp link MODULE THẬT của domain preschool (N1/N2/N3 — quiz +
// ghép cặp đếm/màu/hình). Câu chữ ngắn, dễ thương, xưng "bé" — không học thuật.
const SPACES_PRESCHOOL = {
  mam:{emoji:'🐣',name:'Lớp Mầm · 3 tuổi',accent:'#fb7185',
    intro:'Lớp Mầm — các bé 3 tuổi mới đến trường. Cô và các bạn cùng học qua hình ảnh, bài hát và những trò ngộ nghĩnh.',
    rooms:[
      {ic:'🔢',name:'Làm quen Toán · Đếm & Màu',rd:'Đếm 1–5 và nhận biết màu sắc qua đồ vật.',
        href:'/module.html?domain=preschool&module=N1'},
      // 4 lĩnh vực phát triển còn lại (TT 51/2020) — mỗi thẻ mở module đầy đủ.
      {ic:'🤸',name:'Phát triển thể chất',rd:'Vận động, ăn ngủ vệ sinh, giữ an toàn.',
        href:'/module.html?domain=preschool&module=N1TC'},
      {ic:'🗣️',name:'Phát triển ngôn ngữ',rd:'Chào hỏi, gọi tên đồ vật, nghe kể chuyện.',
        href:'/module.html?domain=preschool&module=N1NN'},
      {ic:'😊',name:'Tình cảm – Xã hội',rd:'Nhận biết cảm xúc, lễ phép, chơi cùng bạn.',
        href:'/module.html?domain=preschool&module=N1TX'},
      {ic:'🎨',name:'Phát triển thẩm mỹ',rd:'Hát, tô màu, tập tạo hình cùng cô.',
        href:'/module.html?domain=preschool&module=N1TM'},
      {ic:'🃏',name:'Lật thẻ con vật',rd:'Bé bấm thẻ để gọi tên con vật.',panel:[
        {p:'Bấm vào thẻ để xem tên con vật và bé bắt chước tiếng kêu của chúng nhé!'},
        {flash:[{e:'🐶',f:'Con chó',b:'Kêu "gâu gâu"'},{e:'🐱',f:'Con mèo',b:'Kêu "meo meo"'},{e:'🐤',f:'Gà con',b:'Kêu "chiếp chiếp"'},{e:'🦆',f:'Con vịt',b:'Kêu "cạp cạp"'},{e:'🐰',f:'Con thỏ',b:'Có hai tai dài'},{e:'🐢',f:'Con rùa',b:'Bò chậm rãi'}]}]},
      {ic:'🌈',name:'Màu sắc quanh bé',rd:'Nhận biết các màu cơ bản.',panel:[
        {h:'Bé học màu'},
        {flash:[{e:'🍎',f:'Đỏ',b:'Quả táo, lá cờ'},{e:'🍌',f:'Vàng',b:'Quả chuối, mặt trời'},{e:'🍃',f:'Xanh lá',b:'Lá cây'},{e:'🟦',f:'Xanh dương',b:'Bầu trời, biển'},{e:'🍇',f:'Tím',b:'Chùm nho'},{e:'🥕',f:'Cam',b:'Củ cà rốt'}]},
        {note:'Bé chỉ tay quanh lớp tìm thêm đồ vật cùng màu nhé!'}]},
      {ic:'🎵',name:'Hát & vận động',rd:'Bài hát kèm động tác cho bé.',panel:[
        {h:'Cùng cô hát'},
        {ul:['🐤 "Một con vịt" — vẫy hai tay làm cánh vịt','🌟 "Sao chiếu sáng" — giơ hai tay lấp lánh','🐰 "Chú thỏ con" — nhảy lò cò tại chỗ','✋ "Năm ngón tay ngoan" — đếm từng ngón cùng cô']},
        {note:'Hát to, vỗ tay theo nhịp và làm động tác cô làm mẫu.'}]},
      {ic:'✅',name:'Bé ngoan mỗi ngày',rd:'Việc nhỏ bé tự làm được.',panel:[
        {check:['Chào cô khi đến lớp','Rửa tay trước khi ăn','Cất giày dép gọn gàng','Đi vệ sinh đúng nơi','Ngủ trưa không nói chuyện']},
        {note:'Mỗi việc tốt cô sẽ tặng bé một bông hoa bé ngoan!'}]},
      // Pet Tri Thức — Tiziamon là "thú cưng" của bé, dễ tương tác đầu đời
      {ic:'🐉',name:'Bé nuôi Tiziamon',rd:'Sinh vật ảo của bé — bé trả lời câu hỏi để cho Tiziamon ăn và lớn lên.',href:'/pet-tri-thuc.html?grade=mam-non'}],
    skills:['Đếm 1–5','Nhận biết màu sắc'],
    // 18 câu cho lớp Mầm — đếm 1-5, màu, ngón tay, con vật quen. id ổn định
    // cho spaced-quiz.js (KHÔNG đổi id cũ — đổi sẽ mất state SRS của bé).
    quiz:[
      {id:'mam-c01',q:'🍎🍎🍎 — Có mấy quả táo?',o:['2','3','4','5'],a:1},
      {id:'mam-c02',q:'Quả chuối 🍌 có màu gì?',o:['Đỏ','Vàng','Xanh dương','Đen'],a:1},
      {id:'mam-c03',q:'Một bàn tay ✋ có mấy ngón?',o:['3','4','5','6'],a:2},
      {id:'mam-c04',q:'⭐⭐ — Có mấy ngôi sao?',o:['1','2','3','4'],a:1},
      {id:'mam-c05',q:'🐤🐤🐤🐤 — Có mấy chú gà con?',o:['2','3','4','5'],a:2},
      {id:'mam-c06',q:'Quả cà chua 🍅 thường có màu gì?',o:['Đỏ','Xanh dương','Tím','Đen'],a:0},
      {id:'mam-c07',q:'Lá cây 🍃 có màu gì?',o:['Xanh lá','Đỏ','Tím','Hồng'],a:0},
      {id:'mam-c08',q:'Bầu trời ban ngày có màu gì?',o:['Đen','Xanh dương','Vàng','Đỏ'],a:1},
      {id:'mam-c09',q:'Con mèo 🐱 kêu thế nào?',o:['Gâu gâu','Meo meo','Cạp cạp','Ò ó o'],a:1},
      {id:'mam-c10',q:'Con chó 🐶 kêu thế nào?',o:['Gâu gâu','Meo meo','Chiếp chiếp','Ụt ịt'],a:0},
      {id:'mam-c11',q:'🍓 — Đây là quả gì?',o:['Dâu tây','Nho','Táo','Chuối'],a:0},
      {id:'mam-c12',q:'Sau số 1 là số mấy?',o:['0','2','3','5'],a:1},
      {id:'mam-c13',q:'Sau số 4 là số mấy?',o:['3','5','6','0'],a:1},
      {id:'mam-c14',q:'🐰 — Con thỏ có mấy tai?',o:['1','2','3','4'],a:1},
      {id:'mam-c15',q:'Một bé có mấy mắt? 👀',o:['1','2','3','4'],a:1},
      {id:'mam-c16',q:'Mặt trời ☀️ thường có màu gì?',o:['Xanh','Vàng / Cam','Tím','Đen'],a:1},
      {id:'mam-c17',q:'Củ cà rốt 🥕 có màu gì?',o:['Cam','Xanh dương','Đen','Hồng'],a:0},
      {id:'mam-c18',q:'Con vịt 🦆 kêu thế nào?',o:['Cạp cạp','Meo meo','Gâu gâu','Ò ó o'],a:0}]},

  choi:{emoji:'🐤',name:'Lớp Chồi · 4 tuổi',accent:'#f59e0b',
    intro:'Lớp Chồi — các bé 4 tuổi đã đếm được tới 10, nhận biết hình tròn–vuông–tam giác và bắt đầu kể chuyện cùng cô.',
    rooms:[
      {ic:'🔟',name:'Đếm tới 10 & Hình khối',rd:'Đếm tới 10 và nhận biết các hình cơ bản.',
        href:'/module.html?domain=preschool&module=N2'},
      // 4 lĩnh vực phát triển còn lại (TT 51/2020) — mỗi thẻ mở module đầy đủ.
      {ic:'🤾',name:'Phát triển thể chất',rd:'Khéo tay, thăng bằng, dinh dưỡng, an toàn.',
        href:'/module.html?domain=preschool&module=N2TC'},
      {ic:'📖',name:'Phát triển ngôn ngữ',rd:'Kể chuyện theo tranh, làm quen âm chữ cái.',
        href:'/module.html?domain=preschool&module=N2NN'},
      {ic:'🤝',name:'Tình cảm – Xã hội',rd:'Chia sẻ, hợp tác nhóm, yêu gia đình.',
        href:'/module.html?domain=preschool&module=N2TX'},
      {ic:'🖌️',name:'Phát triển thẩm mỹ',rd:'Vẽ, pha màu, nhận biết nhạc cụ, nhịp điệu.',
        href:'/module.html?domain=preschool&module=N2TM'},
      {ic:'⭕',name:'Lật thẻ hình khối',rd:'Bé bấm để gọi tên hình.',panel:[
        {flash:[{e:'⭕',f:'Hình tròn',b:'Quả bóng, ông mặt trời'},{e:'⬛',f:'Hình vuông',b:'Quân xúc xắc, bánh chưng'},{e:'🔺',f:'Hình tam giác',b:'Cái nón, miếng dưa hấu'},{e:'⭐',f:'Ngôi sao',b:'Trên lá cờ Tổ quốc'},{e:'❤️',f:'Trái tim',b:'Yêu thương cô và bạn'}]},
        {note:'Bé tìm thử quanh lớp xem có đồ vật nào giống các hình này không.'}]},
      {ic:'🦊',name:'Kể chuyện · Rùa và Thỏ',rd:'Câu chuyện ngắn và bài học.',panel:[
        {h:'Rùa và Thỏ chạy thi'},
        {p:'Thỏ chạy nhanh nên chủ quan ngủ quên giữa đường. Rùa tuy chậm nhưng chăm chỉ bước đều, cuối cùng về đích trước Thỏ.'},
        {note:'Bài học: chăm chỉ và kiên trì sẽ thành công nhé bé!'},
        {mcq:[{q:'Ai về đích trước trong câu chuyện?',o:['Thỏ','Rùa','Cả hai cùng về'],a:1,fb:'Rùa chăm chỉ về đích trước. Bé cũng cố gắng mỗi ngày như Rùa nhé!'}]}]},
      {ic:'🎨',name:'Tô màu & nặn đất',rd:'Tạo hình cùng cô.',panel:[
        {h:'Cùng bé sáng tạo'},
        {ul:['Tô màu đồ vật quen thuộc, không để màu lem ra ngoài','Nặn đất tạo hình quả táo, ông mặt trời, con vật ngộ nghĩnh','Trang trí thêm cho bức tranh thật vui']},
        {note:'Mọi bức tranh của bé đều đẹp — quan trọng là bé sáng tạo và vui!'}]},
      {ic:'🤸',name:'Trò chơi vận động',rd:'Vận động vui cùng các bạn.',panel:[
        {cards:[{ic:'🦘',t:'Nhảy lò cò',d:'Một chân nhảy theo ô.'},{ic:'🐰',t:'Bắt chước thỏ',d:'Hai tay làm tai, nhún nhảy.'},{ic:'🚂',t:'Đoàn tàu chạy',d:'Xếp hàng nối đuôi nhau.'},{ic:'🎵',t:'Đi vòng tròn',d:'Nắm tay đi theo nhạc.'}]},
        {note:'Chơi vui nhưng không xô đẩy bạn nhé!'}]}],
    skills:['Đếm tới 10','Nhận biết hình tròn–vuông–tam giác'],
    quiz:[
      {id:'choi-c01',q:'🚗🚗🚗🚗 — Có mấy chiếc ô tô?',o:['3','4','5','6'],a:1},
      {id:'choi-c02',q:'Quả bóng ⚽ có dạng hình gì?',o:['Hình vuông','Hình tròn','Hình tam giác','Ngôi sao'],a:1},
      {id:'choi-c03',q:'Hình tam giác 🔺 có mấy cạnh?',o:['2','3','4','5'],a:1},
      {id:'choi-c04',q:'Hình vuông ⬛ có mấy cạnh?',o:['3','4','5','6'],a:1},
      {id:'choi-c05',q:'🍪🍪🍪🍪🍪 — Có mấy chiếc bánh?',o:['4','5','6','7'],a:1},
      {id:'choi-c06',q:'Sau số 5 là số mấy?',o:['4','6','7','9'],a:1},
      {id:'choi-c07',q:'Sau số 9 là số mấy?',o:['8','10','11','12'],a:1},
      {id:'choi-c08',q:'Cái nón 🧢 — đỉnh nón giống hình gì?',o:['Hình tròn','Hình tam giác','Hình vuông','Trái tim'],a:1},
      {id:'choi-c09',q:'Đếm tới 10, số nào ĐỨNG GIỮA (số thứ 5)?',o:['3','5','6','7'],a:1},
      {id:'choi-c10',q:'Trong câu chuyện Rùa và Thỏ, ai về đích trước?',o:['Thỏ','Rùa','Cả hai cùng về','Sư tử'],a:1},
      {id:'choi-c11',q:'Bài học từ chuyện Rùa và Thỏ là?',o:['Chăm chỉ, kiên trì sẽ thành công','Chạy nhanh là quan trọng','Ngủ nhiều là tốt','Không cần cố gắng'],a:0},
      {id:'choi-c12',q:'Hai cộng một là mấy? 2 + 1 = ?',o:['2','3','4','5'],a:1},
      {id:'choi-c13',q:'Ba cộng hai là mấy? 3 + 2 = ?',o:['4','5','6','7'],a:1},
      {id:'choi-c14',q:'Ngôi sao ⭐ có mấy cánh?',o:['3','4','5','6'],a:2},
      {id:'choi-c15',q:'Hình tròn ⭕ có mấy cạnh thẳng?',o:['0 (không có cạnh thẳng)','1','3','4'],a:0},
      {id:'choi-c16',q:'Bé chơi cùng bạn cần?',o:['Vui vẻ, không xô đẩy','Tranh đồ chơi','Đẩy bạn ngã','Cãi nhau'],a:0},
      {id:'choi-c17',q:'🐻🐻 và 🐻🐻🐻 — bên nào nhiều gấu hơn?',o:['Bên 2 con','Bên 3 con','Bằng nhau','Không biết'],a:1}]},

  la:{emoji:'🦋',name:'Lớp Lá · 5 tuổi',accent:'#22c55e',
    intro:'Lớp Lá — các bé 5 tuổi đã lớn, sẵn sàng vào lớp 1! So sánh nhiều–ít, tập tô chữ-số và biết tự lập những việc nhỏ.',
    rooms:[
      {ic:'🎒',name:'Sẵn sàng vào lớp 1 · Toán',rd:'So sánh nhiều/ít, đếm tới 20, ghép số với số lượng.',
        href:'/module.html?domain=preschool&module=N3'},
      // 4 lĩnh vực phát triển còn lại (TT 51/2020) — mỗi thẻ mở module đầy đủ.
      {ic:'🚦',name:'Phát triển thể chất',rd:'Vận động phối hợp, cầm bút, an toàn giao thông.',
        href:'/module.html?domain=preschool&module=N3TC'},
      {ic:'📚',name:'Phát triển ngôn ngữ',rd:'29 chữ cái, ghép vần, đọc thơ, kể chuyện.',
        href:'/module.html?domain=preschool&module=N3NN'},
      {ic:'🇻🇳',name:'Tình cảm – Xã hội',rd:'Giải quyết xung đột, tự hào Việt Nam, vào lớp 1.',
        href:'/module.html?domain=preschool&module=N3TX'},
      {ic:'🎭',name:'Phát triển thẩm mỹ',rd:'Biểu diễn tự tin, cảm nhận dân ca Việt Nam.',
        href:'/module.html?domain=preschool&module=N3TM'},
      {ic:'✏️',name:'Tập tô chữ & số',rd:'Bé tập cầm bút và tô theo nét.',panel:[
        {h:'Bé cầm bút đúng cách'},
        {ol:['Cầm bút bằng 3 ngón tay (cái – trỏ – giữa)','Đặt tay nhẹ trên bàn, lưng thẳng','Tô từ trên xuống, từ trái sang phải','Tô chậm theo nét đứt rồi đậm dần']},
        {note:'Mỗi ngày bé tô 5–10 phút là tay sẽ khéo léo và quen với bút.'}]},
      {ic:'⚖️',name:'So sánh nhiều/ít',rd:'Bé tập so sánh số lượng đồ vật.',panel:[
        {h:'Nhiều hơn hay ít hơn?'},
        {mcq:[
          {q:'🍬🍬🍬 và 🍬🍬 — bên nào NHIỀU kẹo hơn?',o:['Bên 3 kẹo','Bên 2 kẹo','Bằng nhau'],a:0,fb:'3 nhiều hơn 2. Bé đếm để chắc nhé!'},
          {q:'🖐️🖐️ — Hai bàn tay có tất cả mấy ngón?',o:['5','8','10','15'],a:2,fb:'5 + 5 = 10 ngón. Bé thử đếm theo cô!'},
          {q:'Sau số 9 là số mấy?',o:['8','10','11','19'],a:1,fb:'Sau 9 là 10. Bé giỏi quá!'}]}]},
      {ic:'🧣',name:'Tự lập việc nhỏ',rd:'Việc bé tự làm được rồi.',panel:[
        {check:['Tự xếp dép vào đúng vị trí','Tự cài cúc áo, kéo khoá','Tự cất chén bát sau khi ăn','Tự gấp khăn, gấp chiếu ngủ','Tự cất đồ chơi vào hộp']},
        {note:'Bé tự làm được những việc này → sẵn sàng vào lớp 1 rồi đó!'}]},
      {ic:'💭',name:'Ước mơ của bé',rd:'Lớn lên bé muốn làm gì?',panel:[
        {p:'Lớn lên bé muốn làm nghề gì? Bé hãy kể cho cô và bố mẹ nghe nhé!'},
        {goal:true},
        {note:'Cô sẽ nhớ ước mơ của bé và động viên bé học giỏi mỗi ngày.'}]},
      // 3 mini-game chuẩn bị vào lớp 1
      {ic:'⛈️',name:'Bão Số Học (Easy)',rd:'Phép tính trong 10 rơi nhẹ — bé chọn đáp án đúng để né bão.',href:'/bao-so-hoc.html'},
      {ic:'🔤',name:'Đố Chữ Ghép Vần',rd:'Bé kéo các chữ để ghép thành từ — chuẩn bị đọc trôi chảy ở lớp 1.',href:'/do-chu-ghep-van.html'},
      {ic:'🌳',name:'Cây Tri Thức của bé',rd:'Mỗi tuần học = 1 chiếc lá lên cây. Cây xanh tốt → bé sẵn sàng vào lớp 1!',href:'/cay-tri-thuc.html'}],
    skills:['Đếm tới 20 · So sánh nhiều/ít','Sẵn sàng vào lớp 1'],
    quiz:[
      {id:'la-c01',q:'Sau số 9 là số mấy?',o:['8','10','11','19'],a:1},
      {id:'la-c02',q:'🖐️🖐️ — Hai bàn tay có tất cả mấy ngón?',o:['5','8','10','15'],a:2},
      {id:'la-c03',q:'Số 0 có nghĩa là gì?',o:['Rất nhiều','Một','Không có gì','Mười'],a:2},
      {id:'la-c04',q:'🍬🍬🍬 và 🍬🍬 — bên nào NHIỀU kẹo hơn?',o:['Bên 3 kẹo','Bên 2 kẹo','Bằng nhau','Không có'],a:0},
      {id:'la-c05',q:'5 + 3 = ?',o:['7','8','9','10'],a:1},
      {id:'la-c06',q:'10 − 2 = ?',o:['6','7','8','12'],a:2},
      {id:'la-c07',q:'Số nào LỚN HƠN: 7 hay 4?',o:['7','4','Bằng nhau','Không so sánh được'],a:0},
      {id:'la-c08',q:'Số nào BÉ HƠN: 12 hay 18?',o:['12','18','Bằng nhau','Không biết'],a:0},
      {id:'la-c09',q:'Đếm tới 20, sau số 15 là số mấy?',o:['14','16','17','20'],a:1},
      {id:'la-c10',q:'Cầm bút đúng cách dùng mấy ngón tay?',o:['1 ngón','2 ngón','3 ngón','5 ngón'],a:2},
      {id:'la-c11',q:'Khi tô chữ, bé tô từ đâu sang đâu?',o:['Trái sang phải','Phải sang trái','Dưới lên trên','Lộn xộn'],a:0},
      {id:'la-c12',q:'Trước khi ngủ trưa, bé nên?',o:['Đánh răng, vệ sinh','Ăn thật no kẹo','Xem điện thoại','Chạy nhảy ầm ĩ'],a:0},
      {id:'la-c13',q:'Bé tự làm được việc nào? (sẵn sàng vào lớp 1)',o:['Tự xếp dép, cài cúc áo','Để cô làm hết','Khóc nhè','Chạy ra ngoài'],a:0},
      {id:'la-c14',q:'Đến lớp 1, bé cần chuẩn bị gì?',o:['Sách, vở, bút và đi học đúng giờ','Đồ chơi để chơi cả ngày','Không cần gì','TV và bánh kẹo'],a:0},
      {id:'la-c15',q:'4 + 4 = ?',o:['6','7','8','9'],a:2},
      {id:'la-c16',q:'10 − 5 = ?',o:['3','4','5','6'],a:2},
      {id:'la-c17',q:'Số 10 có mấy chữ số?',o:['1','2','3','10'],a:1},
      {id:'la-c18',q:'🐔 và 🐔🐔🐔 — bên nào ÍT gà hơn?',o:['Bên 1 con','Bên 3 con','Bằng nhau','Không biết'],a:0}]},

  canteen:{emoji:'🍱',name:'Nhà ăn & Bán trú',accent:'#f97316',
    intro:'Nhà ăn bán trú — bé ăn trưa đủ chất, rửa tay sạch và ngủ trưa ngoan để chiều có sức học và chơi.',
    rooms:[
      {ic:'🍚',name:'Bữa ăn ngon',rd:'Bé ăn đủ 4 nhóm chất.',panel:[
        {h:'Bé ăn gì cho khoẻ?'},
        {cards:[{ic:'🍚',t:'Cơm',d:'Cho bé năng lượng cả ngày.'},{ic:'🍗',t:'Đạm',d:'Thịt, cá, trứng, đậu.'},{ic:'🥦',t:'Rau – Canh',d:'Nhiều rau xanh và canh.'},{ic:'🍎',t:'Trái cây',d:'Tráng miệng, nhiều vitamin.'}]},
        {note:'Ăn đủ và đa dạng để bé cao lớn, khoẻ mạnh nhé!'}]},
      {ic:'🧼',name:'Rửa tay sạch (6 bước)',rd:'Bé rửa tay trước khi ăn.',panel:[
        {h:'6 bước rửa tay của bé'},
        {ol:['Làm ướt tay, xoa xà phòng','Chà hai lòng bàn tay vào nhau','Chà mu bàn tay và kẽ các ngón','Chà ngón tay và móng tay','Rửa sạch dưới vòi nước','Lau khô bằng khăn sạch']},
        {note:'Bé nhớ rửa tay TRƯỚC khi ăn và SAU khi đi vệ sinh.'}]},
      {ic:'😴',name:'Giờ ngủ trưa',rd:'Bé ngủ ngoan để chiều khoẻ.',panel:[
        {h:'Bé ngủ trưa ngoan'},
        {ul:['Nằm ngay ngắn trên chiếu hoặc giường','Không nói chuyện làm ồn bạn','Nhắm mắt, thở đều và thật nhẹ','Ngủ một giấc thật ngon']},
        {note:'Ngủ trưa 60–90 phút giúp bé tỉnh táo và vui chơi cả buổi chiều.'}]},
      {ic:'🙏',name:'Lễ phép với cô bác',rd:'Cảm ơn người nấu cơm cho bé.',panel:[
        {mcq:[{q:'Khi nhận cơm từ cô bác cấp dưỡng, bé nên nói gì?',o:['"Cháu cảm ơn cô (bác) ạ"','Không cần nói gì','"Đưa nhanh lên"','Chạy đi luôn'],a:0,fb:'Bé lễ phép cảm ơn cô bác đã chuẩn bị bữa ăn ngon cho mình nhé!'}]},
        {note:'Cảm ơn người lớn là một thói quen rất đẹp của bé ngoan.'}]},
      // Bảng Phong Thần phiên bản "Bé ngoan của tuần" — Mầm non cũng cần được xếp hạng vui
      {ic:'🏆',name:'Bảng Bé Ngoan',rd:'Bé ngoan của tuần / tháng — cô ghi nhận bé nào chăm chỉ, lễ phép, đoàn kết nhất.',href:'/bang-phong-than.html'}],
    skills:['Ăn uống đủ chất','Vệ sinh & nề nếp'],
    quiz:[
      {id:'canteen-c01',q:'Trước khi ăn cơm, bé cần làm gì?',o:['Rửa tay sạch','Ăn ngay không cần rửa','Xem tivi','Chạy nhảy'],a:0},
      {id:'canteen-c02',q:'Một bữa ăn cân đối nên có?',o:['Chỉ toàn bánh kẹo','Cơm, đạm, rau và canh','Chỉ nước ngọt','Chỉ cơm trắng'],a:1},
      {id:'canteen-c03',q:'Khi nhận cơm từ cô bác, bé nên?',o:['"Cháu cảm ơn cô ạ"','Không nói gì','"Đưa nhanh"','Chạy đi'],a:0},
      {id:'canteen-c04',q:'Rửa tay đúng cách có mấy bước?',o:['3 bước','4 bước','6 bước','10 bước'],a:2},
      {id:'canteen-c05',q:'Sau khi đi vệ sinh, bé phải làm gì?',o:['Rửa tay sạch bằng xà phòng','Đi luôn','Ăn cơm liền','Lau tay vào áo'],a:0},
      {id:'canteen-c06',q:'Trong giờ ngủ trưa, bé nên?',o:['Nằm yên, không nói chuyện','Chơi đùa với bạn','Hát to','Chạy nhảy quanh phòng'],a:0},
      {id:'canteen-c07',q:'Loại đồ uống tốt nhất cho bé?',o:['Nước lọc, sữa','Nước ngọt có ga','Nước đá có siro','Cà phê'],a:0},
      {id:'canteen-c08',q:'Bé thấy thức ăn rơi xuống sàn thì?',o:['Bỏ vào thùng rác, lấy phần mới','Vẫn ăn tiếp','Đá ra xa','Khóc ầm lên'],a:0},
      {id:'canteen-c09',q:'Khi ăn, bé KHÔNG nên?',o:['Vừa ăn vừa chạy nhảy','Nhai kỹ','Ngồi ngay ngắn','Cảm ơn cô'],a:0},
      {id:'canteen-c10',q:'Bé bị no rồi nhưng cô múc thêm cơm, bé nên?',o:['Lễ phép thưa "Cháu xin đủ rồi ạ"','Đẩy bát ra','Đổ cơm xuống đất','Khóc'],a:0},
      {id:'canteen-c11',q:'Trước khi đi ngủ trưa, bé nên?',o:['Đi vệ sinh, đánh răng','Ăn thêm kẹo','Xem TV','Chạy nhảy'],a:0},
      {id:'canteen-c12',q:'Bé thấy bạn không có thìa, bé nên?',o:['Báo cô giáo / chia sẻ với bạn','Mặc kệ bạn','Cười bạn','Lấy thêm cho mình'],a:0},
      {id:'canteen-c13',q:'Trong nhóm "đạm" (chất giúp bé lớn) gồm?',o:['Thịt, cá, trứng, đậu','Kẹo, bánh','Nước ngọt','Khoai tây chiên'],a:0},
      {id:'canteen-c14',q:'Rau xanh giúp bé?',o:['Tốt cho tiêu hoá, nhiều vitamin','Béo phì','Sâu răng','Mệt mỏi'],a:0},
      {id:'canteen-c15',q:'Khi ăn cơm xong, bé nên?',o:['Cảm ơn cô, lau miệng, cất bát','Bỏ chạy ngay','Quăng bát','Ngủ luôn tại bàn'],a:0}]},
};

// ─────────────────────────────────────────────────────────────────────────────
// TRƯỜNG NGOẠI NGỮ — 9 toà nhà chuyên ngôn ngữ. Mỗi toà có 2-4 phòng/hoạt
// động trỏ tới portal-app cụ thể của trường (tu-vung, phat-am, flashcards…).
// ─────────────────────────────────────────────────────────────────────────────
const SPACES_LANGUAGE = {
  'main-hall':{emoji:'🏛️',name:'Sảnh chính · Lễ tân',accent:'#0ea5e9',
    intro:'Cổng giới thiệu vào Trường Ngoại ngữ: lộ trình học, kỳ thi quốc tế, mẹo học từ vựng theo CEFR.',
    rooms:[
      {ic:'🎓',name:'Học Ngoại ngữ thông minh',rd:'Landing chọn nhanh: từ vựng / phát âm / flashcards. Trỏ tới app phù hợp ngay.',href:'/hoc-thong-minh.html?subject=language'},
      {ic:'📚',name:'2000 từ vựng tiếng Anh',rd:'5 chủ đề (cơ bản → IELTS) — spaced repetition + phát âm.',href:'/tu-vung-tieng-anh.html'},
    ],
    skills:['Tự đặt mục tiêu CEFR','Quản lý lộ trình học từ vựng','Hiểu cấu trúc các kỳ thi quốc tế'],
    quiz:[
      {q:'CEFR có bao nhiêu cấp độ?',o:['4 (A1, A2, B1, B2)','6 (A1, A2, B1, B2, C1, C2)','3 (Beginner, Intermediate, Advanced)','Không cố định'],a:1},
      {q:'IELTS thang điểm tối đa?',o:['9.0','10.0','100','990'],a:0},
    ]},

  'library-lang':{emoji:'📚',name:'Thư viện đa ngữ',accent:'#3b82f6',
    intro:'Kho từ vựng theo chủ đề: cơ bản, du lịch, kinh doanh, học thuật, IELTS. Spaced repetition + flashcards.',
    rooms:[
      {ic:'📚',name:'Từ vựng Tiếng Anh (2000 từ)',rd:'5 chủ đề: cơ bản, du lịch, kinh doanh, học thuật, IELTS. Phát âm tự động + spaced repetition.',href:'/tu-vung-tieng-anh.html'},
      {ic:'🃏',name:'Flashcards đa ngôn ngữ',rd:'Tự nhập bộ thẻ riêng (Anh/Nhật/Hàn/Trung). Lưu localStorage, lật thẻ 3D.',href:'/portal-apps/u/4/flashcards/'},
    ],
    skills:['Học từ vựng theo chủ đề','Spaced repetition','Quản lý bộ thẻ cá nhân'],
    quiz:[
      {q:'Spaced repetition là gì?',o:['Học liên tục 1 từ','Lặp lại với khoảng cách tăng dần','Học theo bảng chữ cái','Học ngẫu nhiên'],a:1},
    ]},

  'test-center':{emoji:'🏆',name:'Trung tâm Thi quốc tế',accent:'#f59e0b',
    intro:'Mô phỏng đề thi IELTS / TOEFL / HSK. Bấm giờ, chấm tự động, phân tích kỹ năng yếu.',
    rooms:[
      {ic:'🧠',name:'AI sinh đề IELTS Reading',rd:'AI tạo đoạn văn + câu hỏi theo dạng IELTS Reading Part 1-3.',href:'/ai-quiz-gen.html?topic=ielts-reading'},
      {ic:'🧠',name:'AI sinh đề TOEFL Listening',rd:'AI tạo đoạn nghe ngắn + 4 câu hỏi như TOEFL section 2.',href:'/ai-quiz-gen.html?topic=toefl-listening'},
    ],
    skills:['Quản lý thời gian thi','Đọc hiểu IELTS Reading','Phân tích sai lầm'],
    quiz:[
      {q:'IELTS Reading có bao nhiêu phần?',o:['2','3','4','5'],a:1},
      {q:'TOEFL iBT thang điểm tối đa?',o:['100','120','9.0','990'],a:1},
    ]},

  'listening-lab':{emoji:'🎧',name:'Phòng nghe (headset lab)',accent:'#8b5cf6',
    intro:'Luyện nghe với phụ đề + tốc độ điều chỉnh. Phát âm tự động giúp tai quen accent chuẩn.',
    rooms:[
      {ic:'📚',name:'Từ vựng nghe (audio)',rd:'Mọi thẻ từ vựng đều có nút 🔊 phát âm Mỹ/Anh. Nghe trước, nhớ sau.',href:'/tu-vung-tieng-anh.html'},
      {ic:'🎓',name:'Học Ngoại ngữ thông minh',rd:'Chọn nhanh hoạt động nghe — từ vựng audio, phát âm chuẩn.',href:'/hoc-thong-minh.html?subject=language'},
    ],
    skills:['Phân biệt accent UK/US','Nghe chậm/nhanh','Đoán nghĩa qua ngữ cảnh'],
    quiz:[
      {q:'Tốc độ chuẩn IELTS Listening?',o:['Khoảng 130 từ/phút','Khoảng 200 từ/phút','Khoảng 50 từ/phút','Không cố định'],a:0},
    ]},

  'speaking-room':{emoji:'💬',name:'Phòng hội thoại',accent:'#ec4899',
    intro:'Phòng thực hành giao tiếp 1-1 với AI. Đặt tình huống (du lịch, phỏng vấn, IELTS Speaking) rồi luyện.',
    rooms:[
      {ic:'🎤',name:'Luyện phát âm AI',rd:'Đọc câu mẫu — AI chấm phát âm bằng Speech Recognition, score 0-100% theo từng từ.',href:'/luyen-phat-am.html'},
      {ic:'📚',name:'Từ vựng giao tiếp',rd:'Chủ đề du lịch + kinh doanh — câu thông dụng có ví dụ tình huống.',href:'/tu-vung-tieng-anh.html'},
    ],
    skills:['Phát âm chuẩn','Giữ luồng hội thoại','Đáp ứng tình huống bất ngờ'],
    quiz:[
      {q:'IELTS Speaking gồm mấy phần?',o:['2','3','4','5'],a:1},
    ]},

  'pronunciation':{emoji:'🎤',name:'Studio Phát âm',accent:'#a855f7',
    intro:'Phòng thu hiện đại để luyện từng âm IPA, intonation, stress. AI chấm chi tiết từng từ.',
    rooms:[
      {ic:'🎤',name:'Luyện phát âm AI (chi tiết)',rd:'3 cấp độ: dễ (câu ngắn), vừa (thông dụng), khó (câu phức). AI diff theo token.',href:'/luyen-phat-am.html'},
      {ic:'📚',name:'Từ vựng + phát âm',rd:'Mỗi từ có IPA + nút phát âm — luyện từ trước khi luyện câu.',href:'/tu-vung-tieng-anh.html'},
    ],
    skills:['Phát âm IPA','Stress trong từ đa âm tiết','Intonation câu hỏi/khẳng định'],
    quiz:[
      {q:'IPA là viết tắt của?',o:['International Pronunciation Alphabet','International Phonetic Alphabet','Intensive Phonetic Audio','Intermediate Pronunciation Assist'],a:1},
    ]},

  'film-room':{emoji:'📺',name:'Phòng phim phụ đề',accent:'#0891b2',
    intro:'Xem clip ngắn có phụ đề Anh-Việt song song. Luyện nghe + mở rộng từ vựng đời thực qua phim.',
    rooms:[
      {ic:'🃏',name:'Flashcards trích từ phim',rd:'Tự nhập câu thoại từ phim yêu thích, lưu thành bộ thẻ học.',href:'/portal-apps/u/4/flashcards/'},
      {ic:'🧠',name:'AI sinh quiz từ vựng phim',rd:'Dán đoạn hội thoại, AI sinh quiz từ vựng + slang + giải nghĩa.',href:'/ai-quiz-gen.html?topic=movie-vocab'},
    ],
    skills:['Nghe slang & idiom','Hiểu ngữ cảnh văn hoá','Bắt chước intonation tự nhiên'],
    quiz:[]},

  'drama':{emoji:'🎭',name:'Sân khấu kịch',accent:'#ec4899',
    intro:'Đóng kịch tiếng Anh: học sinh đọc kịch bản, ghi âm vai diễn, cùng nhau diễn 1 cảnh.',
    rooms:[
      {ic:'🎤',name:'Luyện đọc kịch bản (phát âm AI)',rd:'Chọn câu kịch bản, đọc theo, AI chấm phát âm + biểu cảm.',href:'/luyen-phat-am.html?level=hard'},
      {ic:'📚',name:'Từ vựng học thuật + IELTS',rd:'Vốn từ phong phú cho monologue và dialogue dài.',href:'/tu-vung-tieng-anh.html'},
    ],
    skills:['Trình diễn ngôn ngữ','Biểu cảm khi nói','Phối hợp nhóm'],
    quiz:[]},

  'intl-cafe':{emoji:'🌍',name:'Cafe Quốc tế',accent:'#10b981',
    intro:'Quán cà phê ảo nơi học viên gặp gỡ AI native từ nhiều nước. Thử giọng Anh/Mỹ/Úc/Sing/Ấn.',
    rooms:[
      {ic:'🎓',name:'Học Ngoại ngữ thông minh',rd:'Vào cổng hoạt động — chat AI sẽ về sau (đang biên soạn).',href:'/hoc-thong-minh.html?subject=language'},
      {ic:'🃏',name:'Flashcards chủ đề "đi du lịch"',rd:'Tự nhập câu thoại du lịch, lưu bộ thẻ cá nhân để học nhanh.',href:'/portal-apps/u/4/flashcards/'},
    ],
    skills:['Giao tiếp tự nhiên','Quản lý cảm xúc khi nói sai','Mở rộng vốn từ qua trò chuyện'],
    quiz:[]},
};

// ─────────────────────────────────────────────────────────────────────────────
// TRƯỜNG LÁI XE — 7 toà nhà cho bằng B1/B2. Mỗi toà 2-3 phòng trỏ tới
// 600 câu lý thuyết, biển báo, mô phỏng cabin, sa hình…
// ─────────────────────────────────────────────────────────────────────────────
const SPACES_DRIVING = {
  'theory-center':{emoji:'📖',name:'Trung tâm Lý thuyết',accent:'#dc2626',
    intro:'Nơi học 600 câu lý thuyết Luật giao thông đường bộ theo Bộ GTVT. Có chế độ luyện + thi thử.',
    rooms:[
      {ic:'📖',name:'600 câu lý thuyết B1/B2',rd:'Luyện theo chương: khái niệm, văn hoá, kỹ thuật, biển báo, sa hình, cấu tạo. Đánh dấu CÂU LIỆT.',href:'/luat-giao-thong-600.html'},
      {ic:'🎓',name:'Học Lái xe thông minh',rd:'Cổng vào nhanh các hoạt động học lý thuyết + biển báo + tình huống.',href:'/hoc-thong-minh.html?subject=driving'},
    ],
    skills:['Hiểu khái niệm cơ bản','Quy tắc nhường đường','Văn hoá lái xe an toàn'],
    quiz:[
      {q:'Bằng B1 cho phép lái loại xe nào?',o:['Ô tô chở người đến 9 chỗ (không kinh doanh)','Ô tô tải','Xe khách trên 30 chỗ','Container'],a:0},
      {q:'Nồng độ cồn cho phép khi lái ô tô tại VN?',o:['Dưới 50 mg/100ml máu','Dưới 80 mg/100ml máu','Bất kỳ nồng độ nào (cấm tuyệt đối)','Dưới 30 mg/100ml máu'],a:2},
      {q:'Khi gặp đèn vàng nhấp nháy, người lái phải?',o:['Phanh gấp','Giảm tốc, chú ý quan sát, được phép đi','Bóp còi liên tục','Dừng lại trước vạch'],a:1},
    ]},

  'signs-room':{emoji:'🚸',name:'Phòng Biển báo',accent:'#f97316',
    intro:'Học 4 nhóm biển báo QCVN 41:2019: cấm (đỏ), nguy hiểm (vàng tam giác), hiệu lệnh (xanh), chỉ dẫn (chữ nhật).',
    rooms:[
      {ic:'🚸',name:'Học biển báo (4 nhóm)',rd:'SVG vẽ tay, bấm vào biển để xem ý nghĩa chi tiết. Filter theo nhóm.',href:'/bien-bao-giao-thong.html'},
      {ic:'🎯',name:'Đố vui biển báo',rd:'Random biển + 4 đáp án, đếm streak đúng liên tiếp.',href:'/bien-bao-giao-thong.html?mode=quiz'},
    ],
    skills:['Phân biệt 4 nhóm biển QCVN','Đọc biển nhanh khi đang lái','Hiểu cấu trúc biển báo'],
    quiz:[
      {q:'Biển báo HÌNH TRÒN viền đỏ thuộc nhóm nào?',o:['Cấm','Nguy hiểm','Hiệu lệnh','Chỉ dẫn'],a:0},
      {q:'Biển báo HÌNH TAM GIÁC vàng thuộc nhóm nào?',o:['Cấm','Nguy hiểm','Hiệu lệnh','Chỉ dẫn'],a:1},
      {q:'Biển báo HÌNH TRÒN xanh dương thuộc nhóm nào?',o:['Cấm','Nguy hiểm','Hiệu lệnh (bắt buộc)','Chỉ dẫn'],a:2},
    ]},

  'exam-theory':{emoji:'📝',name:'Phòng Thi Lý thuyết',accent:'#f59e0b',
    intro:'Mô phỏng kỳ thi sát hạch theo hạng GPLX (B, C1, C, D1, D2, D…). Mỗi hạng có 15 đề ngẫu nhiên cố định. Sai 1 câu LIỆT là trượt dù tổng điểm đủ.',
    rooms:[
      {ic:'📝',name:'Thi sát hạch theo hạng — 15 đề',rd:'Chọn hạng bằng (B/C1/C/D…) rồi chọn 1 trong 15 đề ngẫu nhiên cố định: số câu & thời gian đúng theo hạng, có câu điểm liệt, đồng hồ đếm ngược.',href:'/luat-giao-thong-600.html?mode=exam'},
      {ic:'⚠️',name:'Chỉ luyện câu LIỆT',rd:'Tập trung vào những câu có thể khiến trượt: nồng độ cồn, sương mù, lùi xe, làn buýt.',href:'/luat-giao-thong-600.html?mode=critical'},
    ],
    skills:['Quản lý thời gian thi','Tránh câu LIỆT','Đọc câu hỏi cẩn thận'],
    quiz:[
      {q:'Đề thi B1 lý thuyết cần đúng tối thiểu bao nhiêu câu?',o:['18/25','21/25','25/25','20/30'],a:1},
      {q:'Thời gian làm bài B1?',o:['15 phút','22 phút','30 phút','60 phút'],a:1},
    ]},

  'sim-room':{emoji:'🎮',name:'Phòng Mô phỏng (cabin lái)',accent:'#8b5cf6',
    intro:'Cabin ảo mô phỏng tình huống lái: đường mưa, đường sắt, ngã tư, dốc xuống nguy hiểm. Phản ứng đúng = điểm.',
    rooms:[
      {ic:'🧠',name:'AI Quiz tình huống động',rd:'Tình huống động trên đường — AI tạo case study từ camera hành trình, học cách xử lý.',href:'/ai-quiz-gen.html?topic=driving-situation'},
      {ic:'🚸',name:'Ôn biển báo trước khi mô phỏng',rd:'Nhớ ý nghĩa biển báo giúp phản ứng đúng tình huống.',href:'/bien-bao-giao-thong.html'},
    ],
    skills:['Phản xạ trong tình huống nguy hiểm','Phán đoán khoảng cách','Quan sát qua kính chiếu hậu'],
    quiz:[
      {q:'Khi đang đi gặp sương mù dày, phải làm gì?',o:['Tắt đèn để khỏi loá','Bật đèn sương mù vàng + giảm tốc + tăng khoảng cách','Tăng tốc thoát khu vực','Dừng giữa làn đường'],a:1},
    ]},

  'first-aid':{emoji:'🏥',name:'Trạm Sơ cứu',accent:'#ef4444',
    intro:'Học sơ cứu tai nạn giao thông cơ bản: cầm máu, kê chân, hô hấp nhân tạo. Bắt buộc trong giáo trình B2+.',
    rooms:[
      {ic:'🧠',name:'AI Quiz sơ cứu giao thông',rd:'AI sinh tình huống tai nạn — chọn hành động đúng theo thứ tự ưu tiên.',href:'/ai-quiz-gen.html?topic=first-aid'},
      {ic:'📖',name:'Lý thuyết liên quan',rd:'Chương Văn hoá & đạo đức trong 600 câu — nghĩa vụ khi gặp tai nạn.',href:'/luat-giao-thong-600.html'},
    ],
    skills:['Phản ứng đúng tai nạn','Cầm máu','Hô hấp nhân tạo cơ bản'],
    quiz:[
      {q:'Khi gặp tai nạn giao thông, TRƯỚC TIÊN phải làm gì?',o:['Bỏ chạy','Báo công an rồi mới sơ cứu','Dừng xe, giữ hiện trường, sơ cứu, báo công an','Chỉ báo bảo hiểm'],a:2},
    ]},

  'admin-drive':{emoji:'📋',name:'Văn phòng cấp giấy phép',accent:'#94a3b8',
    intro:'Thông tin hành chính: hồ sơ đăng ký thi, lịch thi, thủ tục cấp đổi GPLX, gia hạn.',
    rooms:[
      {ic:'🎓',name:'AI tư vấn thủ tục',rd:'Hỏi AI về quy trình đăng ký thi, đóng lệ phí, cấp đổi GPLX cũ.',href:'/hoc-thong-minh.html?subject=driving-admin'},
      {ic:'📖',name:'600 câu lý thuyết',rd:'Phải đạt mới được nộp hồ sơ thi. Học luôn trước khi xin lịch.',href:'/luat-giao-thong-600.html'},
    ],
    skills:['Hiểu quy trình hành chính','Chuẩn bị hồ sơ thi','Kiểm tra hạn GPLX'],
    quiz:[
      {q:'GPLX hạng B1 không có thời hạn?',o:['Đúng — không thời hạn','Có hạn 10 năm','Có hạn 5 năm','Có hạn tới 60 tuổi'],a:0},
    ]},

  'canteen-drive':{emoji:'☕',name:'Căng tin học viên',accent:'#10b981',
    intro:'Nghỉ giữa buổi học. Ôn nhẹ + xem lại các chương đã học.',
    rooms:[
      {ic:'🚸',name:'Ôn nhanh biển báo',rd:'Random 1 biển + 4 đáp án — luyện giữa giờ giải lao.',href:'/bien-bao-giao-thong.html?mode=quiz'},
      {ic:'🧠',name:'AI Quiz tình huống ngắn',rd:'AI sinh 1 tình huống — chọn đáp án + xem giải thích chi tiết.',href:'/ai-quiz-gen.html?topic=driving'},
    ],
    skills:['Học cùng cộng đồng','Giải toả căng thẳng','Chia sẻ kinh nghiệm thi'],
    quiz:[]},
};

const SPACES_HIGHSCHOOL = {
  admin:{emoji:'🏫',name:'Nhà Hiệu bộ – BGH',accent:'#6366f1',intro:'Trung tâm điều hành Trường THPT: theo dõi học tập, nội quy, tư vấn phân ban – hướng nghiệp và thông tin tuyển sinh.',
    rooms:[{ic:'📊',name:'Bảng điều khiển học tập',rd:'Theo dõi tiến độ & điểm các môn.',href:'/dashboard.html'},
      {ic:'📜',name:'Nội quy nhà trường',rd:'Quy định & văn hoá học đường.',panel:[
        {h:'Nội quy học sinh THPT'},
        {ul:['Đi học đúng giờ, mặc đồng phục đúng quy định','Lễ phép, trung thực, giữ gìn vệ sinh chung','Không gian lận trong kiểm tra – thi cử','Sử dụng điện thoại theo hướng dẫn của giáo viên','Tham gia đầy đủ hoạt động tập thể & sinh hoạt dưới cờ']},
        {note:'Văn hoá học đường: tôn trọng thầy cô, bạn bè; nói lời hay – làm việc tốt.'}]},
      {ic:'🧭',name:'Tư vấn phân ban & hướng nghiệp',rd:'Chọn tổ hợp KHTN/KHXH.',panel:[
        {h:'Chọn tổ hợp môn theo định hướng nghề'},
        {cards:[{ic:'🔬',t:'Ban KHTN',d:'Lí – Hoá – Sinh: kĩ thuật, y dược, CNTT.'},
          {ic:'🗺️',t:'Ban KHXH',d:'Sử – Địa – GDKT&PL: luật, kinh tế, sư phạm.'},
          {ic:'💻',t:'Công nghệ – Tin',d:'Tin học, công nghệ: lập trình, kĩ thuật.'},
          {ic:'🎨',t:'Nghệ thuật',d:'Âm nhạc, Mĩ thuật: thiết kế, truyền thông.'}]},
        {mcq:[{q:'Em thích Toán – Lí và muốn học kĩ thuật/CNTT. Tổ hợp phù hợp?',o:['Ban KHTN (Lí, Hoá/Tin)','Ban KHXH (Sử, Địa)','Chỉ học Văn','Không cần chọn'],a:0,fb:'Định hướng kĩ thuật/CNTT nên chọn tổ hợp có Toán – Lí (ban KHTN hoặc tổ hợp Công nghệ – Tin).'}]}]},
      {ic:'🎓',name:'Thông tin tuyển sinh ĐH',rd:'Các phương thức xét tuyển.',panel:[
        {h:'Các phương thức xét tuyển đại học'},
        {ul:['Xét điểm thi tốt nghiệp THPT','Xét học bạ THPT','Thi đánh giá năng lực / tư duy','Xét tuyển kết hợp (chứng chỉ ngoại ngữ…)','Tuyển thẳng theo quy chế']},
        {note:'Theo dõi đề án tuyển sinh của từng trường để biết tổ hợp & điểm chuẩn các năm.'}]},
      {ic:'🏛️',name:'Ban điều hành AI',rd:'Đề xuất cải tiến cho nhà trường & bình chọn.',board:true},
      // Cây Tri Thức + Bảng Phong Thần — dashboard cá nhân + xếp hạng cho HS THPT
      {ic:'🌳',name:'Cây Tri Thức của em',rd:'Trực quan hoá tiến độ 3 năm THPT — mỗi tuần học = 1 lá. Lớp 12 cây vào mùa hoa quả.',href:'/cay-tri-thuc.html'},
      {ic:'🏆',name:'Bảng Phong Thần Tizia',rd:'Xếp hạng HS THPT theo điểm tổng + thành tích thi cấp tỉnh/quốc gia.',href:'/bang-phong-than.html'}],
    skills:['Hiểu cơ cấu trường','Chọn phân ban phù hợp','Định hướng nghề nghiệp'],
    quiz:[{q:'Cấp THPT ở Việt Nam gồm những lớp nào?',o:['Lớp 10, 11, 12','Lớp 6–9','Lớp 1–5','Lớp 10–13'],a:0},
      {q:'Theo GDPT 2018, từ lớp 10 học sinh bắt đầu?',o:['Chọn môn theo định hướng nghề (phân ban)','Học tất cả mọi môn như nhau','Chỉ học 3 môn','Nghỉ học các môn xã hội'],a:0},
      {q:'Kết quả thi tốt nghiệp THPT dùng để?',o:['Xét tốt nghiệp & xét tuyển đại học','Chỉ để biết điểm','Thay cho học bạ cả cấp','Không dùng làm gì'],a:0}]},

  grade10:{emoji:'🔟',name:'Khối lớp 10',accent:'#f59e0b',intro:'Phòng học khối 10 — bước chuyển vào THPT: làm quen phương pháp học chủ động và định hướng phân ban.',
    rooms:[{ic:'📚',name:'Chương trình lớp 10',rd:'Môn bắt buộc & môn lựa chọn.',panel:[
        {h:'Chương trình lớp 10 (GDPT 2018)'},
        {p:'Các môn & hoạt động bắt buộc:'},
        {ul:['Toán, Ngữ văn, Ngoại ngữ 1','Lịch sử','Giáo dục thể chất, Giáo dục QP-AN','Hoạt động trải nghiệm – hướng nghiệp','Nội dung giáo dục địa phương']},
        {p:'Chọn thêm 4 môn trong: Vật lí, Hoá học, Sinh học, Địa lí, GDKT&PL, Tin học, Công nghệ, Âm nhạc, Mĩ thuật.'}]},
      {ic:'🧠',name:'Phương pháp học chủ động',rd:'Tự học hiệu quả.',panel:[
        {h:'Bộ kĩ năng tự học'},
        {cards:[{ic:'📝',t:'Ghi chú Cornell',d:'Chia trang: ý chính – chi tiết – tóm tắt.'},
          {ic:'🕸️',t:'Sơ đồ tư duy',d:'Hệ thống hoá kiến thức bằng nhánh.'},
          {ic:'🍅',t:'Pomodoro',d:'Học 25 phút – nghỉ 5 phút.'},
          {ic:'🗣️',t:'Feynman',d:'Giảng lại bằng lời của mình để hiểu sâu.'}]},
        {check:['Lập thời gian biểu mỗi tuần','Học bài ngay sau buổi học','Tự đặt câu hỏi khi đọc','Ôn lại trước khi ngủ']}]},
      {ic:'🎯',name:'Đặt mục tiêu học kì',rd:'Ghi mục tiêu của bạn.',panel:[
        {h:'Mục tiêu học kì của em'},{p:'Mục tiêu rõ ràng giúp em học có động lực hơn.'},{goal:true}]},
      {ic:'📈',name:'Vẽ đồ thị hàm số (tương tác)',rd:'Hàm bậc nhất & bậc hai: kéo hệ số, xem đỉnh – nghiệm – tính đơn điệu ngay.',href:'/grapher.html?domain=highschool&type=quad'},
      // ── 11 môn Lớp 10 (link tới module curriculum) ──
      {ic:'➗',name:'Toán 10',         rd:'Mệnh đề, tập hợp, BPT bậc nhất 2 ẩn, hàm số bậc 2, vectơ, thống kê & xác suất.',href:'/module.html?domain=highschool&module=H10TOAN'},
      {ic:'📖',name:'Ngữ văn 10',      rd:'Thần thoại, sử thi, thơ Đường luật, Nguyễn Trãi, Truyện Kiều, nghị luận.',href:'/module.html?domain=highschool&module=H10NV'},
      {ic:'🇬🇧',name:'Tiếng Anh 10',   rd:'Global Success: 10 units. Tenses + passive + conditional 1-3 + modals.',href:'/module.html?domain=highschool&module=H10TA'},
      {ic:'⚛️',name:'Vật lí 10',       rd:'Động học, 3 định luật Newton, công - năng lượng, va chạm, chất khí.',href:'/module.html?domain=highschool&module=H10LY'},
      {ic:'🧪',name:'Hoá học 10',      rd:'Cấu tạo nguyên tử, BTH, liên kết hoá học, oxi hoá - khử, halogen.',href:'/module.html?domain=highschool&module=H10HOA'},
      {ic:'🧬',name:'Sinh học 10',     rd:'Thành phần hoá học của tế bào, cấu trúc tế bào, phân bào, công nghệ vi sinh.',href:'/module.html?domain=highschool&module=H10SINH'},
      {ic:'🏛️',name:'Lịch sử 10',     rd:'Sử học là gì, văn minh thế giới cổ-trung đại, VN cổ đại → Tây Sơn.',href:'/module.html?domain=highschool&module=H10SU'},
      {ic:'🌐',name:'Địa lí 10',       rd:'Trái Đất, khí hậu, dân cư, nông-công-dịch vụ, môi trường - tài nguyên.',href:'/module.html?domain=highschool&module=H10DIA'},
      {ic:'⚖️',name:'GDKT & Pháp luật 10',rd:'Nền kinh tế, thị trường, ngân sách-thuế, Hiến pháp & pháp luật VN.',href:'/module.html?domain=highschool&module=H10GDCD'},
      {ic:'💻',name:'Tin học 10',      rd:'Máy tính & xã hội, mạng - Internet an toàn, lập trình Python cơ bản.',href:'/module.html?domain=highschool&module=H10TIN'},
      {ic:'⚔️',name:'GDQP-AN 10',      rd:'Lịch sử QĐND VN, truyền thống binh chủng, kỹ thuật cơ bản, an ninh QG.',href:'/module.html?domain=highschool&module=H10GDQP'}],
    skills:['Học chủ động','Định hướng phân ban','Học đủ 11 môn lớp 10'],
    quiz:[{q:'Mệnh đề "Mọi số tự nhiên đều lớn hơn 0" là?',o:['Mệnh đề sai (vì 0 không lớn hơn 0)','Mệnh đề đúng','Không phải mệnh đề','Câu hỏi'],a:0},
      {q:'Tập hợp A = {1;2;3}. Số tập con của A là?',o:['8','3','6','9'],a:0},
      {q:'Lớp 10 trong GDPT 2018 còn gọi là lớp?',o:['Định hướng nghề nghiệp','Cuối cấp','Đầu cấp tiểu học','Dự bị đại học'],a:0}]},

  grade11:{emoji:'📗',name:'Khối lớp 11',accent:'#10b981',intro:'Phòng học khối 11 — học chuyên sâu theo tổ hợp đã chọn, đẩy mạnh học qua dự án và trải nghiệm.',
    rooms:[{ic:'📈',name:'Học chuyên sâu lớp 11',rd:'Nâng cao theo tổ hợp.',panel:[
        {h:'Trọng tâm lớp 11'},
        {p:'Lớp 11 đào sâu kiến thức theo tổ hợp đã chọn, tạo nền cho lớp 12 và kì thi.'},
        {ul:['Toán: lượng giác, dãy số, giới hạn, đạo hàm','Vật lí: dao động, sóng, điện trường – dòng điện','Hoá học: hữu cơ (hydrocarbon, alcohol…)','Ngữ văn: nghị luận xã hội & nghị luận văn học']}]},
      {ic:'🗂️',name:'Kĩ năng làm dự án (HĐTN)',rd:'Học qua dự án & trải nghiệm.',panel:[
        {h:'Quy trình thực hiện dự án học tập'},
        {ol:['Xác định vấn đề / chủ đề','Lập kế hoạch & phân công','Thực hiện, thu thập dữ liệu','Tạo sản phẩm & báo cáo','Đánh giá – rút kinh nghiệm']},
        {order:{title:'Sắp xếp 5 bước làm dự án học tập (HĐTN)',items:['Xác định vấn đề / chủ đề','Lập kế hoạch & phân công','Thực hiện, thu thập dữ liệu','Tạo sản phẩm & báo cáo','Đánh giá – rút kinh nghiệm']}},
        {note:'Hoạt động trải nghiệm – hướng nghiệp giúp em rèn kĩ năng làm việc nhóm & giải quyết vấn đề.'}]},
      {ic:'📈',name:'Đồ thị lượng giác (tương tác)',rd:'Hàm y=a·sin(bx+c): biên độ, chu kì, dịch pha — kéo hệ số xem ngay.',href:'/grapher.html?domain=highschool&type=sin'},
      // ── 9 môn Lớp 11 (chuyên sâu) ──
      {ic:'➗',name:'Toán 11',        rd:'Lượng giác, dãy số - cấp số, giới hạn, đạo hàm, hình học không gian.',href:'/module.html?domain=highschool&module=H11TOAN'},
      {ic:'📖',name:'Ngữ văn 11',     rd:'Hai đứa trẻ, Chí Phèo, Vội vàng, Tràng giang, Đây thôn Vĩ Dạ + nghị luận.',href:'/module.html?domain=highschool&module=H11NV'},
      {ic:'🇬🇧',name:'Tiếng Anh 11',  rd:'Generation Gap, Caring, ASEAN, Global Warming + inversion, cleft.',href:'/module.html?domain=highschool&module=H11TA'},
      {ic:'⚛️',name:'Vật lí 11',      rd:'Dao động cơ điều hoà, sóng, điện trường, dòng điện, cảm ứng điện từ.',href:'/module.html?domain=highschool&module=H11LY'},
      {ic:'🧪',name:'Hoá học 11',     rd:'Cân bằng hoá học, pH, hữu cơ: hidrocarbon, ancol-phenol, andehit-axit.',href:'/module.html?domain=highschool&module=H11HOA'},
      {ic:'🧬',name:'Sinh học 11',    rd:'Trao đổi chất, cảm ứng, sinh trưởng - phát triển, sinh sản TV/ĐV.',href:'/module.html?domain=highschool&module=H11SINH'},
      {ic:'🏛️',name:'Lịch sử 11',    rd:'CMTS, CNXH 1917, ĐNA giành độc lập, cải cách & bảo vệ Tổ quốc.',href:'/module.html?domain=highschool&module=H11SU'},
      {ic:'🌐',name:'Địa lí 11',      rd:'Toàn cầu hoá, địa lí Hoa Kỳ - TQ - Nhật Bản - EU - ASEAN.',href:'/module.html?domain=highschool&module=H11DIA'},
      {ic:'⚖️',name:'GDKT & Pháp luật 11',rd:'Cạnh tranh - cung cầu, lạm phát, đạo đức kinh doanh, quyền bình đẳng.',href:'/module.html?domain=highschool&module=H11GDCD'},
      {ic:'💻',name:'Tin học 11',     rd:'CSDL & hệ quản trị, kỹ thuật lập trình, thiết kế web hoặc CTDL & thuật toán.',href:'/module.html?domain=highschool&module=H11TIN'}],
    skills:['Học chuyên sâu','Làm dự án & làm việc nhóm','Học đủ 10 môn lớp 11'],
    quiz:[{q:'Đạo hàm của hàm số y = x² là?',o:['2x','x','x²/2','2'],a:0},
      {q:'Giá trị của sin90° bằng?',o:['1','0','0,5','-1'],a:0},
      {q:'Nghị luận xã hội thường bàn về?',o:['Một tư tưởng/hiện tượng đời sống','Chỉ tác phẩm văn học','Công thức toán','Bảng tuần hoàn'],a:0}]},

  grade12:{emoji:'📕',name:'Khối lớp 12',accent:'#ef4444',intro:'Phòng học khối 12 — năm cuối cấp: ôn thi tốt nghiệp THPT và chuẩn bị đăng kí xét tuyển đại học.',
    rooms:[{ic:'🎯',name:'Ôn thi tốt nghiệp THPT',rd:'Cấu trúc đề & chiến lược.',panel:[
        {h:'Kì thi tốt nghiệp THPT'},
        {ul:['Thi các môn theo quy chế hiện hành (Toán, Ngữ văn + môn lựa chọn)','Ôn theo ma trận/đề minh hoạ của Bộ GD&ĐT','Luyện đề & bấm giờ để quen áp lực','Phân bổ thời gian: câu dễ trước, câu khó sau']},
        {note:'Kết quả vừa để xét tốt nghiệp, vừa là một phương thức xét tuyển đại học.'}]},
      {ic:'📝',name:'Đăng kí nguyện vọng ĐH',rd:'Quy trình & cách sắp xếp NV.',panel:[
        {h:'Đăng kí xét tuyển đại học'},
        {ol:['Tìm hiểu ngành – trường phù hợp năng lực & sở thích','Đối chiếu điểm chuẩn các năm gần đây','Sắp xếp nguyện vọng yêu thích nhất lên trên','Đăng kí trên hệ thống tuyển sinh của Bộ GD&ĐT','Nộp lệ phí & xác nhận nhập học']},
        {order:{title:'Sắp xếp 5 bước đăng kí xét tuyển đại học',items:['Tìm hiểu ngành – trường phù hợp năng lực & sở thích','Đối chiếu điểm chuẩn các năm gần đây','Sắp xếp nguyện vọng yêu thích nhất lên trên','Đăng kí trên hệ thống tuyển sinh của Bộ GD&ĐT','Nộp lệ phí & xác nhận nhập học']}},
        {note:'Không giới hạn số nguyện vọng — nên có NV "cao", "vừa sức" và "an toàn".'}]},
      {ic:'⏱️',name:'Luyện đề bấm giờ',rd:'Rèn tốc độ & tâm lí phòng thi.',href:'/time-attack.html'},
      {ic:'🎯',name:'Đặt mục tiêu thi',rd:'Ghi mục tiêu điểm số.',panel:[{h:'Mục tiêu kì thi của em'},{goal:true}]},
      // ── 9 môn Lớp 12 (năm cuối — ôn thi tốt nghiệp THPT) ──
      {ic:'➗',name:'Toán 12 (ôn thi)',  rd:'Khảo sát đồ thị, mũ-logarit, tích phân, số phức, toạ độ không gian.',href:'/module.html?domain=highschool&module=H12TOAN'},
      {ic:'📖',name:'Ngữ văn 12 (ôn thi)',rd:'Tây Tiến, Việt Bắc, Đất Nước, Sóng, Vợ chồng A Phủ, Rừng xà nu, Chiếc thuyền.',href:'/module.html?domain=highschool&module=H12NV'},
      {ic:'🇬🇧',name:'Tiếng Anh 12 (ôn thi)',rd:'Life Stories, AI, Career - reported speech, mixed conditionals, phrasal verbs.',href:'/module.html?domain=highschool&module=H12TA'},
      {ic:'⚛️',name:'Vật lí 12 (ôn thi)',rd:'Dao động & giao thoa, DĐ xoay chiều RLC, sóng ánh sáng, lượng tử, hạt nhân.',href:'/module.html?domain=highschool&module=H12LY'},
      {ic:'🧪',name:'Hoá học 12 (ôn thi)',rd:'Ester-lipid, carbohydrate, amine-protein, polymer, kim loại.',href:'/module.html?domain=highschool&module=H12HOA'},
      {ic:'🧬',name:'Sinh học 12 (ôn thi)',rd:'ADN-gen-NST, quy luật di truyền Mendel, tiến hoá, sinh thái học.',href:'/module.html?domain=highschool&module=H12SINH'},
      {ic:'🏛️',name:'Lịch sử 12 (ôn thi)',rd:'Trật tự thế giới 1945, ASEAN, CMVN 1930-1975, Đổi mới, hội nhập.',href:'/module.html?domain=highschool&module=H12SU'},
      {ic:'🌐',name:'Địa lí 12 (ôn thi)',rd:'Địa lý tự nhiên & dân cư VN, các vùng kinh tế, biển đảo.',href:'/module.html?domain=highschool&module=H12DIA'},
      {ic:'⚖️',name:'GDKT & Pháp luật 12',rd:'Tăng trưởng & phát triển, hội nhập kinh tế, pháp luật lao động & quyền con người.',href:'/module.html?domain=highschool&module=H12GDCD'}],
    skills:['Chiến lược ôn thi','Đăng kí xét tuyển','Ôn 9 môn thi tốt nghiệp'],
    quiz:[{q:'Nguyên hàm của f(x) = 2x là?',o:['x² + C','2 + C','x + C','2x² + C'],a:0},
      {q:'Khi sắp xếp nguyện vọng xét tuyển, nên đặt ngành yêu thích nhất ở?',o:['Nguyện vọng 1 (trên cùng)','Nguyện vọng cuối','Không quan trọng thứ tự','Bỏ trống'],a:0},
      {q:'Kì thi tốt nghiệp THPT do cơ quan nào tổ chức?',o:['Bộ Giáo dục & Đào tạo','Bộ Y tế','Trường đại học','Sở Văn hoá'],a:0}]},

  lab_phys:{emoji:'🧲',name:'Phòng bộ môn Vật lí',accent:'#6366f1',intro:'Phòng thí nghiệm Vật lí: thực hành đo lường, an toàn điện và củng cố các định luật cốt lõi.',
    rooms:[{ic:'🧪',name:'Bài thí nghiệm tiêu biểu',rd:'Thực hành Vật lí 10–12.',panel:[
        {h:'Một số bài thực hành'},
        {ul:['Đo gia tốc rơi tự do g','Khảo sát dao động con lắc đơn','Đo suất điện động & điện trở trong của nguồn','Khảo sát đoạn mạch (định luật Ohm)','Giao thoa ánh sáng – đo bước sóng']},
        {note:'Quy trình: đo số liệu → xử lí sai số → vẽ đồ thị → rút ra kết luận.'}]},
      {ic:'⚡',name:'An toàn điện trong PTN',rd:'Checklist trước khi cắm điện.',panel:[
        {check:['Kiểm tra dây & phích cắm không hở','Lắp xong mạch mới đóng nguồn','Không chạm tay ướt vào thiết bị điện','Chọn đúng thang đo của đồng hồ đo điện','Ngắt nguồn & báo giáo viên khi có sự cố']},
        {note:'Dòng điện qua người nguy hiểm — luôn ngắt nguồn trước khi thay đổi mạch.'}]},
      {ic:'🔢',name:'Công thức cốt lõi',rd:'Lật thẻ ôn công thức.',panel:[
        {flash:[{e:'🏃',f:'Định luật II Newton',b:'F = m·a'},{e:'⚡',f:'Định luật Ohm',b:'I = U / R'},
          {e:'🌊',f:'Tần số dao động',b:'f = 1 / T'},{e:'🔋',f:'Công suất điện',b:'P = U·I'},
          {e:'💡',f:'Điện năng tiêu thụ',b:'A = P·t'}]}]},
      {ic:'🕰️',name:'Dao động & con lắc đơn',rd:'Chu kì T phụ thuộc gì?',panel:[
        {h:'Con lắc đơn — dao động điều hoà nhỏ'},
        {ul:['Chu kì T = 2π·√(ℓ/g) — chỉ phụ thuộc chiều dài ℓ và gia tốc trọng trường g','Không phụ thuộc khối lượng vật nặng','Không phụ thuộc biên độ (khi góc nhỏ < 10°)','Dùng để đo g bằng cách đếm chu kì']},
        {mcq:[{q:'Tăng chiều dài dây con lắc đơn lên 4 lần (giữ nguyên g) thì chu kì T sẽ?',o:['Tăng 2 lần','Tăng 4 lần','Giảm 2 lần','Không đổi'],a:0,fb:'T tỉ lệ √ℓ → ℓ tăng 4 lần ⇒ T tăng √4 = 2 lần.'}]},
        {note:'Thí nghiệm kinh điển: đo g bằng con lắc đơn — đếm 20 chu kì rồi chia trung bình để giảm sai số.'}]},
      {ic:'🔄',name:'Định luật bảo toàn năng lượng',rd:'Năng lượng chuyển hoá nhưng không mất.',panel:[
        {h:'Bảo toàn cơ năng (hệ kín, bỏ qua ma sát)'},
        {ul:['Cơ năng W = Wđ + Wt = ½mv² + mgh','Vật rơi tự do: Wt giảm — Wđ tăng (W không đổi)','Có ma sát → cơ năng chuyển một phần thành nhiệt','Năng lượng KHÔNG mất đi, chỉ chuyển hoá giữa các dạng']},
        {mcq:[{q:'Thả vật rơi tự do từ độ cao h. Tại điểm chạm đất, vận tốc v = ?',o:['√(2gh)','gh','2gh','g·h²'],a:0,fb:'Bảo toàn cơ năng: mgh = ½mv² ⇒ v = √(2gh).'}]}]},
      {ic:'💡',name:'Hiện tượng quang điện',rd:'Ánh sáng "đánh bật" electron khỏi kim loại.',panel:[
        {h:'Thuyết lượng tử của Einstein'},
        {ul:['Ánh sáng gồm các hạt photon, năng lượng ε = h·f','Quang điện xảy ra khi f ≥ f₀ (tần số ngưỡng của kim loại)','Cường độ ánh sáng KHÔNG quyết định có quang điện hay không — chỉ tần số mới quyết định','Ứng dụng: pin mặt trời, cảm biến ánh sáng, đèn LED']},
        {mcq:[{q:'Chiếu ánh sáng đỏ (f thấp) rất mạnh vào tấm kẽm — không có quang điện. Vì sao?',o:['f < f₀ của kẽm','Đèn không đủ sáng','Kẽm bị oxi hoá','Thiếu nguồn điện'],a:0,fb:'Quang điện chỉ phụ thuộc TẦN SỐ, không phụ thuộc cường độ — đỏ có f thấp hơn ngưỡng f₀ của kẽm.'}]}]}],
    skills:['Kĩ năng thí nghiệm','An toàn điện','Xử lí số liệu & sai số'],
    quiz:[{q:'Theo định luật II Newton, gia tốc a của vật?',o:['Tỉ lệ thuận với lực F, tỉ lệ nghịch với khối lượng m','Tỉ lệ nghịch với F','Không phụ thuộc F','Bằng F·m'],a:0},
      {q:'Đơn vị đo cường độ dòng điện là?',o:['Ampe (A)','Vôn (V)','Oát (W)','Ôm (Ω)'],a:0},
      {q:'Lắp xong mạch điện trong PTN, việc bắt buộc khi kết thúc là?',o:['Ngắt nguồn điện','Để nguyên có điện','Chạm tay kiểm tra nóng','Tháo đồng hồ đo'],a:0}]},

  lab_chem:{emoji:'⚗️',name:'Phòng bộ môn Hoá học',accent:'#14b8a6',intro:'Phòng thí nghiệm Hoá học: thực hành phản ứng, an toàn hoá chất và đọc bảng tuần hoàn.',
    rooms:[{ic:'🧪',name:'Thí nghiệm Hoá học',rd:'Thực hành Hoá 10–12.',panel:[
        {h:'Một số thí nghiệm'},
        {ul:['Phản ứng oxi hoá – khử','Ảnh hưởng của nhiệt độ/xúc tác đến tốc độ phản ứng','Nhận biết một số ion trong dung dịch','Điều chế & thử tính chất ester','Chuẩn độ acid – base xác định nồng độ']}]},
      {ic:'🥽',name:'An toàn hoá chất',rd:'Checklist PPE & quy tắc.',panel:[
        {check:['Đeo kính bảo hộ & găng tay','Mặc áo blouse cài kín','Làm trong tủ hút khi có khí độc/mùi','Không nếm, không ngửi trực tiếp hoá chất','Biết vị trí vòi rửa mắt & bình chữa cháy']},
        {note:'Pha loãng acid đặc: rót TỪ TỪ acid vào nước, KHÔNG đổ nước vào acid (toả nhiệt mạnh, bắn).'}]},
      {ic:'🔬',name:'Bảng tuần hoàn',rd:'Lật thẻ nguyên tố.',panel:[
        {flash:[{e:'🧂',f:'Na (Z = 11)',b:'Kim loại kiềm, hoá trị I'},{e:'💨',f:'O (Z = 8)',b:'Phi kim, hoá trị II'},
          {e:'🟢',f:'Cl (Z = 17)',b:'Halogen, hoá trị I'},{e:'🧲',f:'Fe (Z = 26)',b:'Kim loại, hoá trị II/III'},
          {e:'💎',f:'C (Z = 6)',b:'Phi kim, nền của hoá hữu cơ'}]}]},
      {ic:'⚖️',name:'Cân bằng phương trình',rd:'Định luật bảo toàn khối lượng.',panel:[
        {ol:['Viết đúng công thức các chất','Cân bằng số nguyên tử mỗi nguyên tố hai vế','Kiểm tra lại điện tích (nếu là ion)','Tối giản hệ số']},
        {order:{title:'Sắp xếp 4 bước cân bằng phương trình hoá học',items:['Viết đúng công thức các chất','Cân bằng số nguyên tử mỗi nguyên tố hai vế','Kiểm tra lại điện tích (nếu là ion)','Tối giản hệ số']}},
        {mcq:[{q:'Cân bằng: H₂ + O₂ → H₂O. Hệ số đúng lần lượt là?',o:['2 ; 1 ; 2','1 ; 1 ; 1','2 ; 2 ; 2','1 ; 2 ; 1'],a:0,fb:'2H₂ + O₂ → 2H₂O — số nguyên tử H và O cân bằng hai vế.'}]}]},
      // Lab Hoá ảo — 15 phản ứng kéo thả, ôn nhanh cho HS THPT
      {ic:'🧪',name:'Lab Hoá ảo (15 phản ứng)',rd:'Kéo thả 10 hoá chất khám phá 15 phản ứng — kết tủa, sủi khí, đổi màu, toả nhiệt.',href:'/lab-hoa-ao.html'}],
    skills:['Thí nghiệm hoá học','An toàn hoá chất','Đọc bảng tuần hoàn'],
    quiz:[{q:'Trong phản ứng oxi hoá – khử, chất khử là chất?',o:['Nhường electron','Nhận electron','Không thay đổi','Luôn là kim loại quý'],a:0},
      {q:'Số hiệu nguyên tử Z cho biết?',o:['Số proton trong hạt nhân','Số neutron','Khối lượng mol','Số phân tử'],a:0},
      {q:'Khi pha loãng acid sunfuric đặc, ta phải?',o:['Rót acid vào nước','Rót nước vào acid','Đun nóng acid','Trộn nhanh tuỳ ý'],a:0}]},

  lab_bio:{emoji:'🧬',name:'Phòng bộ môn Sinh học',accent:'#22c55e',intro:'Phòng thí nghiệm Sinh học: dùng kính hiển vi, tìm hiểu tế bào, di truyền và sinh thái.',
    rooms:[{ic:'🔬',name:'Thực hành kính hiển vi',rd:'Quan sát tế bào & mô.',panel:[
        {h:'Các bước dùng kính hiển vi'},
        {ol:['Đặt tiêu bản lên bàn kính, cố định','Chọn vật kính nhỏ (×10) trước','Điều chỉnh ốc thô để thấy ảnh, rồi ốc tinh cho rõ','Chuyển sang vật kính lớn khi cần','Vẽ và chú thích hình quan sát được']},
        {order:{title:'Sắp xếp 5 bước dùng kính hiển vi',items:['Đặt tiêu bản lên bàn kính, cố định','Chọn vật kính nhỏ (×10) trước','Điều chỉnh ốc thô để thấy ảnh, rồi ốc tinh cho rõ','Chuyển sang vật kính lớn khi cần','Vẽ và chú thích hình quan sát được']}}]},
      {ic:'🧫',name:'Tế bào & cơ thể',rd:'Cấu trúc tế bào nhân thực.',panel:[
        {cards:[{ic:'🧱',t:'Màng sinh chất',d:'Bao bọc, kiểm soát ra vào.'},{ic:'🧠',t:'Nhân',d:'Chứa ADN, điều khiển tế bào.'},
          {ic:'🔥',t:'Ti thể',d:'Hô hấp tế bào, tạo năng lượng (ATP).'},{ic:'🌿',t:'Lục lạp',d:'Quang hợp ở tế bào thực vật.'}]},
        {match:{title:'Nối bào quan với chức năng',pairs:[['Màng sinh chất','Bao bọc, kiểm soát ra vào tế bào'],['Nhân','Chứa ADN, điều khiển hoạt động tế bào'],['Ti thể','Hô hấp tế bào, tạo năng lượng ATP'],['Lục lạp','Quang hợp ở tế bào thực vật'],['Ribosome','Tổng hợp protein']]}},
        {p:'Tế bào là đơn vị cấu trúc & chức năng cơ bản của mọi cơ thể sống.'}]},
      {ic:'🧬',name:'Di truyền học',rd:'ADN, gen và quy luật Mendel.',panel:[
        {h:'Cơ sở di truyền'},
        {ul:['Trung tâm: ADN → ARN → Protein','Gen là đoạn ADN quy định tính trạng','Quy luật phân li & phân li độc lập (Mendel)','Đột biến gen / đột biến nhiễm sắc thể']},
        {mcq:[{q:'Bố mẹ kiểu gen Aa × Aa, tỉ lệ kiểu hình ở đời con (1 cặp tính trạng)?',o:['3 trội : 1 lặn','1 : 1','toàn trội','9 : 3 : 3 : 1'],a:0,fb:'Lai một cặp tính trạng dị hợp Aa × Aa cho tỉ lệ kiểu hình 3 trội : 1 lặn.'}]}]},
      {ic:'🌿',name:'Sinh thái & môi trường',rd:'Hệ sinh thái, bảo vệ môi trường.',panel:[
        {ul:['Hệ sinh thái = quần xã sinh vật + môi trường sống','Chuỗi & lưới thức ăn truyền năng lượng','Cân bằng sinh thái dễ bị phá vỡ bởi con người','Bảo vệ đa dạng sinh học & ứng phó biến đổi khí hậu']}]}],
    skills:['Dùng kính hiển vi','Hiểu di truyền cơ bản','Tư duy sinh thái'],
    quiz:[{q:'Bào quan thực hiện quang hợp ở tế bào thực vật là?',o:['Lục lạp','Ti thể','Nhân','Ribosome'],a:0},
      {q:'Vật chất mang thông tin di truyền là?',o:['ADN','Lipid','Tinh bột','Nước'],a:0},
      {q:'Lai Aa × aa cho tỉ lệ kiểu gen đời con?',o:['1 Aa : 1 aa','toàn Aa','3 : 1','1 AA : 1 aa'],a:0}]},

  computer:{emoji:'💻',name:'Phòng Tin học',accent:'#8b5cf6',intro:'Phòng máy tính: học lập trình Python, tư duy thuật toán và an toàn không gian mạng.',
    rooms:[{ic:'🐍',name:'Lập trình Python',rd:'Cú pháp & tư duy.',panel:[
        {h:'Nhập môn Python'},
        {ol:['Biến & kiểu dữ liệu (int, float, str)','Câu lệnh rẽ nhánh if – elif – else','Vòng lặp for / while','Hàm với def','Danh sách (list) & vòng lặp duyệt']},
        {note:'Tin học THPT có 2 định hướng: Tin học ứng dụng (ICT) và Khoa học máy tính (CS).'}]},
      {ic:'🔐',name:'An toàn không gian mạng',rd:'Bảo mật & ứng xử số.',panel:[
        {check:['Đặt mật khẩu mạnh, không dùng lại nhiều nơi','Bật xác thực 2 lớp (2FA)','Không bấm link lạ, không tải file không rõ nguồn','Không chia sẻ thông tin cá nhân tuỳ tiện','Tôn trọng bản quyền & văn hoá ứng xử trên mạng']},
        {mcq:[{q:'Nhận email lạ báo trúng thưởng, yêu cầu nhập mật khẩu. Em nên?',o:['Không bấm, xoá và báo cáo lừa đảo','Nhập thử xem sao','Gửi cho bạn cùng nhập','Trả lời xin thêm thông tin'],a:0,fb:'Đây là lừa đảo (phishing) — tuyệt đối không cung cấp mật khẩu/thông tin.'}]}]},
      {ic:'🧮',name:'Tư duy thuật toán',rd:'Nối thuật toán với cách làm.',panel:[
        {cards:[{ic:'🔎',t:'Tìm kiếm tuần tự',d:'Duyệt lần lượt đến khi gặp.'},{ic:'⚡',t:'Tìm kiếm nhị phân',d:'Chia đôi dãy đã sắp xếp.'},
          {ic:'🫧',t:'Sắp xếp nổi bọt',d:'Đổi chỗ cặp kề nhau nhiều lượt.'},{ic:'📌',t:'Sắp xếp chọn',d:'Chọn phần tử nhỏ nhất mỗi lượt.'}]},
        {match:{title:'Nối tên thuật toán với cách làm',pairs:[['Tìm kiếm tuần tự','Duyệt lần lượt đến khi gặp phần tử cần tìm'],['Tìm kiếm nhị phân','Chia đôi dãy đã sắp xếp để thu hẹp vùng tìm'],['Sắp xếp nổi bọt','Đổi chỗ cặp kề nhau nhiều lượt cho tới khi xong'],['Sắp xếp chọn','Mỗi lượt chọn phần tử nhỏ nhất đưa về đầu']]}}]},
      // Code Quest — luyện tư duy lập trình bằng block-based
      {ic:'🤖',name:'Code Quest — Lập trình kéo thả',rd:'10 level Scratch-style: lặp, rẽ nhánh, biến — luyện tư duy thuật toán trước khi viết Python.',href:'/code-quest.html'}],
    skills:['Lập trình Python cơ bản','An toàn mạng','Tư duy thuật toán'],
    quiz:[{q:'Số nhị phân 1010 bằng số thập phân nào?',o:['10','8','12','5'],a:0},
      {q:'Trong Python, lệnh in ra màn hình là?',o:['print()','echo()','printf()','write()'],a:0},
      {q:'Tìm kiếm nhị phân yêu cầu dãy phải?',o:['Đã được sắp xếp','Toàn số chẵn','Có 10 phần tử','Không trùng nhau'],a:0}]},

  library:{emoji:'📚',name:'Thư viện',accent:'#b59b6a',intro:'Thư viện trường: rèn kĩ năng tra cứu, đọc hiểu và làm quen các tác phẩm văn học tiêu biểu.',
    rooms:[{ic:'🔎',name:'Kĩ năng tra cứu',rd:'Tìm & đánh giá nguồn tin.',panel:[
        {h:'Tra cứu thông tin đáng tin'},
        {ol:['Xác định từ khoá chính','Tìm ở sách giáo khoa, từ điển, nguồn chính thống','Đối chiếu nhiều nguồn','Ghi lại nguồn & tác giả khi trích dẫn']},
        {note:'Đánh giá độ tin cậy: tác giả là ai? cơ quan nào? cập nhật khi nào? có trích dẫn không?'}]},
      {ic:'📖',name:'Văn học Việt Nam',rd:'Tác giả – tác phẩm tiêu biểu.',panel:[
        {cards:[{ic:'📜',t:'Truyện Kiều',d:'Nguyễn Du — kiệt tác thơ Nôm.'},{ic:'🌾',t:'Chí Phèo',d:'Nam Cao — hiện thực phê phán.'},
          {ic:'🍚',t:'Vợ nhặt',d:'Kim Lân — tình người trong nạn đói.'},{ic:'🛶',t:'Người lái đò Sông Đà',d:'Nguyễn Tuân — tuỳ bút tài hoa.'}]}]},
      {ic:'✍️',name:'Phương pháp đọc – ghi chú',rd:'Đọc hiểu hiệu quả (SQ3R).',panel:[
        {h:'Phương pháp đọc SQ3R'},
        {ol:['Survey – khảo sát tổng quan','Question – đặt câu hỏi','Read – đọc kĩ','Recite – thuật lại bằng lời mình','Review – ôn lại']},
        {order:{title:'Sắp xếp 5 bước phương pháp đọc SQ3R',items:['Survey – khảo sát tổng quan','Question – đặt câu hỏi','Read – đọc kĩ','Recite – thuật lại bằng lời mình','Review – ôn lại']}}]},
      {ic:'📖',name:'Luyện đọc hiểu',rd:'Rèn ý chính, suy luận & đoán nghĩa qua ngữ cảnh.',panel:[
        {h:'Rèn kĩ năng đọc hiểu văn bản'},
        {p:'Khi đọc một đoạn trích, hãy xác định: ý chính, các chi tiết hỗ trợ, và thông điệp tác giả gửi gắm (có thể không nói thẳng).'},
        {mcq:[{q:'"Ý chính" của một đoạn văn là gì?',o:['Nội dung bao trùm, quan trọng nhất của đoạn','Câu dài nhất trong đoạn','Câu cuối cùng của đoạn','Từ được lặp lại nhiều nhất'],a:0,fb:'Ý chính là thông tin cốt lõi mà cả đoạn hướng tới — không phụ thuộc độ dài câu.'},
          {q:'Gặp một từ chưa biết khi đang đọc, cách xử lí tốt nhất?',o:['Đoán nghĩa qua ngữ cảnh rồi tra từ điển để xác nhận','Bỏ qua hoàn toàn','Dừng đọc ngay','Thay đại bằng một từ bất kì'],a:0,fb:'Suy luận theo ngữ cảnh rồi tra cứu giúp vừa hiểu bài, vừa mở rộng vốn từ.'},
          {q:'"Đọc suy luận" (inference) nghĩa là?',o:['Rút ra điều tác giả ngụ ý dù không nói thẳng','Đọc thật to thành tiếng','Chỉ đọc mỗi tiêu đề','Học thuộc lòng cả đoạn'],a:0,fb:'Suy luận là "đọc giữa những dòng chữ" để hiểu hàm ý, thái độ của tác giả.'}]}]}],
    skills:['Tra cứu & đánh giá nguồn','Đọc hiểu hiệu quả'],
    quiz:[{q:'Tác giả của Truyện Kiều là?',o:['Nguyễn Du','Nguyễn Trãi','Hồ Xuân Hương','Nam Cao'],a:0},
      {q:'Bước đầu tiên trong phương pháp SQ3R là?',o:['Survey (khảo sát)','Review','Read','Recite'],a:0},
      {q:'Khi trích dẫn thông tin, em cần?',o:['Ghi rõ nguồn & tác giả','Giấu nguồn','Chép y nguyên không ghi gì','Tự nhận là của mình'],a:0}]},

  hall:{emoji:'🎭',name:'Hội trường – Nhà đa năng',accent:'#8b5cf6',intro:'Nơi sinh hoạt dưới cờ, sự kiện, văn nghệ và rèn kĩ năng thuyết trình – hoạt động câu lạc bộ.',
    rooms:[{ic:'🌐',name:'Sự kiện Metaverse',rd:'Phòng đa người real-time.',href:'/metaverse.html'},
      {ic:'🎤',name:'Kĩ năng thuyết trình',rd:'Nói trước đám đông.',panel:[
        {h:'Thuyết trình tự tin'},
        {ul:['Mở đầu nêu rõ thông điệp chính','Mỗi slide một ý, hình ảnh rõ ràng','Giao tiếp bằng mắt, nói chậm – rõ','Luyện tập trước & chuẩn bị trả lời câu hỏi']},
        {note:'Ngôn ngữ cơ thể (đứng thẳng, tay mở) tạo thiện cảm với người nghe.'}]},
      {ic:'🎭',name:'Câu lạc bộ & văn nghệ',rd:'Hoạt động ngoại khoá.',panel:[
        {cards:[{ic:'🗣️',t:'CLB Tiếng Anh',d:'Giao tiếp, hùng biện.'},{ic:'🔬',t:'CLB STEM',d:'Khoa học – kĩ thuật – sáng tạo.'},
          {ic:'📰',t:'CLB Văn – Báo',d:'Viết, làm nội dung trường.'},{ic:'🎶',t:'Văn nghệ – Thể thao',d:'Phong trào, hội diễn.'}]}]}],
    skills:['Thuyết trình','Hoạt động tập thể'],
    quiz:[{q:'Khi thuyết trình, điều nên làm là?',o:['Giao tiếp bằng mắt với người nghe','Đọc nguyên văn slide','Nói thật nhanh','Quay lưng về khán giả'],a:0},
      {q:'Một slide thuyết trình tốt nên?',o:['Tập trung một ý chính','Chứa thật nhiều chữ','Không có tiêu đề','Toàn hiệu ứng'],a:0},
      {q:'Tham gia câu lạc bộ giúp học sinh?',o:['Phát triển kĩ năng & kết nối bạn bè','Giảm điểm số','Không có lợi ích','Bị phạt'],a:0}]},

  youth:{emoji:'🚩',name:'Đoàn TN – Phòng truyền thống',accent:'#e23b3b',intro:'Tìm hiểu tổ chức Đoàn Thanh niên, truyền thống nhà trường và ý thức công dân.',
    rooms:[{ic:'🚩',name:'Đoàn TNCS Hồ Chí Minh',rd:'Tổ chức & hoạt động Đoàn.',panel:[
        {h:'Đoàn Thanh niên Cộng sản Hồ Chí Minh'},
        {ul:['Thành lập ngày 26/3/1931','Học sinh đủ 16 tuổi, đủ điều kiện có thể được kết nạp Đoàn','Phong trào tiêu biểu: Thanh niên tình nguyện, Học sinh 3 tốt','Bồi dưỡng lí tưởng, đạo đức, lối sống cho thanh niên']},
        {note:'Mùa hè xanh, Tiếp sức mùa thi… là các hoạt động tình nguyện quen thuộc của Đoàn.'}]},
      {ic:'🏆',name:'Phòng truyền thống',rd:'Chặng đường nhà trường.',panel:[
        {h:'Truyền thống nhà trường'},
        {timeline:[{t:'Thành lập',d:'Những ngày đầu xây dựng trường.'},{t:'Phát triển',d:'Mở rộng cơ sở vật chất & đội ngũ.'},
          {t:'Thành tích',d:'Học sinh giỏi, đỗ đại học, giải phong trào.'},{t:'Hôm nay',d:'Tiếp nối truyền thống, hội nhập số.'}]}]},
      {ic:'🤝',name:'Công dân & kĩ năng sống',rd:'Quyền & nghĩa vụ công dân.',panel:[
        {mcq:[{q:'Công dân Việt Nam đủ bao nhiêu tuổi có quyền bầu cử đại biểu Quốc hội?',o:['Đủ 18 tuổi','Đủ 15 tuổi','Đủ 16 tuổi','Đủ 21 tuổi'],a:0,fb:'Đủ 18 tuổi có quyền bầu cử; đủ 21 tuổi có quyền ứng cử đại biểu Quốc hội & HĐND.'}]}]},
      {ic:'🗳️',name:'Đại hội Đoàn',rd:'Cơ chế dân chủ trong tổ chức Đoàn.',panel:[
        {h:'Đại hội Đoàn các cấp'},
        {ul:['Đại hội chi đoàn lớp: bầu Ban Chấp hành chi đoàn (Bí thư, Phó Bí thư)','Đại hội Đoàn trường: bầu BCH Đoàn trường, nhiệm kì 1 năm','Đại hội Đoàn quận/huyện, tỉnh, toàn quốc — tổ chức theo nhiệm kì','Đại hội cao nhất: Đại hội Đại biểu toàn quốc Đoàn TNCS Hồ Chí Minh']},
        {note:'Đại hội Đoàn là dịp tổng kết, đề ra phương hướng & bầu ra người đại diện — rèn ý thức dân chủ ngay từ trường học.'}]},
      {ic:'💚',name:'Tình nguyện & "Tuổi trẻ sáng tạo"',rd:'Các phong trào tiêu biểu.',panel:[
        {cards:[{ic:'🌞',t:'Mùa hè xanh',d:'Sinh viên tình nguyện về vùng sâu vùng xa.'},{ic:'📝',t:'Tiếp sức mùa thi',d:'Hỗ trợ sĩ tử thi tốt nghiệp / ĐH.'},
          {ic:'💡',t:'Tuổi trẻ sáng tạo',d:'Khuyến khích ý tưởng KHKT, khởi nghiệp.'},{ic:'🏆',t:'Học sinh 3 tốt',d:'Đạo đức tốt – Học tập tốt – Thể lực tốt.'}]},
        {p:'Tham gia phong trào tình nguyện giúp HS rèn kĩ năng tổ chức, giao tiếp, làm việc nhóm — rất có lợi cho hồ sơ xét tuyển ĐH & du học.'}]},
      {ic:'⚖️',name:'Quyền & nghĩa vụ thanh niên',rd:'Luật Thanh niên 2020.',panel:[
        {h:'Theo Luật Thanh niên 2020 (công dân 16–30 tuổi)'},
        {ul:['Quyền: học tập, lao động, được tham gia xây dựng & bảo vệ Tổ quốc','Nghĩa vụ: gương mẫu chấp hành Hiến pháp & pháp luật','Trách nhiệm với gia đình – xã hội – Tổ quốc','Nam đủ 18 tuổi có nghĩa vụ đăng kí nghĩa vụ quân sự']},
        {mcq:[{q:'Theo Luật Thanh niên 2020, thanh niên là công dân Việt Nam trong độ tuổi?',o:['Từ đủ 16 đến 30 tuổi','Từ 18 đến 35 tuổi','Từ 15 đến 25 tuổi','Từ 12 đến 18 tuổi'],a:0,fb:'Luật Thanh niên 2020 quy định thanh niên là công dân Việt Nam từ đủ 16 tuổi đến 30 tuổi.'}]}]}],
    skills:['Hiểu tổ chức Đoàn','Ý thức công dân'],
    quiz:[{q:'Đoàn TNCS Hồ Chí Minh được thành lập ngày nào?',o:['26/3/1931','2/9/1945','20/11/1982','19/5/1890'],a:0},
      {q:'Công dân đủ 18 tuổi có quyền?',o:['Bầu cử','Không có quyền nào','Miễn mọi nghĩa vụ','Tự đặt ra luật'],a:0},
      {q:'Hoạt động "Tiếp sức mùa thi" gắn với tổ chức nào?',o:['Đoàn Thanh niên','Hội Phụ huynh','Công đoàn giáo viên','Hội Chữ thập đỏ quốc tế'],a:0}]},

  arts:{emoji:'🎨',name:'Phòng Nghệ thuật',accent:'#f472b6',intro:'Môn Âm nhạc & Mĩ thuật ở THPT (GDPT 2018): chơi đàn, gõ nhịp, pha màu và vẽ tự do.',
    rooms:[{ic:'🎵',name:'Âm nhạc',rd:'Chơi đàn, gõ nhịp & nhạc lí.',panel:[
        {h:'Kiến thức âm nhạc cơ bản'},
        {ul:['Cao độ – trường độ của âm thanh','Các loại nhịp: 2/4, 3/4, 4/4','Dân ca ba miền Bắc – Trung – Nam','Nhạc cụ dân tộc: đàn bầu, đàn tranh, sáo trúc']},
        {piano:true},
        {rhythm:true}]},
      {ic:'🖼️',name:'Mĩ thuật',rd:'Pha màu & vẽ tự do.',panel:[
        {cards:[{ic:'🌈',t:'Màu nóng – lạnh',d:'Tạo cảm xúc & chiều sâu.'},{ic:'🧩',t:'Bố cục',d:'Sắp xếp mảng chính – phụ.'},
          {ic:'📐',t:'Phối cảnh',d:'Diễn tả không gian xa – gần.'},{ic:'✏️',t:'Thiết kế',d:'Mĩ thuật ứng dụng, đồ hoạ.'}]},
        {mixer:true},
        {draw:true}]},
      {ic:'💡',name:'Sáng tạo & thẩm mĩ',rd:'Quy trình thiết kế sáng tạo.',panel:[
        {p:'Nghệ thuật giúp em thể hiện ý tưởng, cảm xúc và nhìn cái đẹp quanh mình — nền tảng cho thiết kế, truyền thông, kiến trúc.'},
        {order:{title:'Sắp xếp 5 bước quy trình thiết kế sáng tạo',items:['Thấu hiểu vấn đề & người dùng','Lên ý tưởng đa dạng (brainstorm)','Phác thảo & chọn phương án','Làm mẫu thử (prototype) & thử nghiệm','Hoàn thiện & chia sẻ tác phẩm']}}]},
      // Pixel Art Studio — sáng tạo digital art kiểu retro
      {ic:'🎨',name:'Pixel Art Studio',rd:'Studio vẽ pixel — luyện bố cục, phối màu, sáng tạo ý tưởng kiểu retro game.',href:'/pixel-art-studio.html'}],
    skills:['Cảm thụ nghệ thuật','Tư duy thẩm mĩ'],
    quiz:[{q:'Nhịp 2/4 có mấy phách trong một ô nhịp?',o:['2 phách','4 phách','3 phách','1 phách'],a:0},
      {q:'Đàn bầu là nhạc cụ?',o:['Dân tộc Việt Nam','Phương Tây','Điện tử hiện đại','Của Ấn Độ'],a:0},
      {q:'Màu đỏ, cam, vàng được xếp vào nhóm màu?',o:['Màu nóng','Màu lạnh','Màu trung tính','Không màu'],a:0}]},

  canteen:{emoji:'🍜',name:'Căng tin',accent:'#f59e0b',intro:'Góc dinh dưỡng học đường: ăn uống cân bằng và giữ vệ sinh an toàn thực phẩm.',
    rooms:[{ic:'🥗',name:'Dinh dưỡng học đường',rd:'Bữa ăn hợp lí.',panel:[
        {h:'Ăn uống cân bằng'},
        {ul:['Đủ 4 nhóm chất: bột đường, đạm, béo, vitamin – khoáng','Ăn sáng đầy đủ để học tập tốt','Uống đủ nước mỗi ngày','Hạn chế đồ ngọt, nước có ga, đồ chiên rán']},
        {note:'Bữa ăn đa dạng giúp cơ thể tuổi dậy thì phát triển toàn diện.'}]},
      {ic:'🧼',name:'An toàn thực phẩm',rd:'Vệ sinh ăn uống.',panel:[
        {check:['Rửa tay sạch trước khi ăn','Ăn chín, uống sôi','Kiểm tra hạn sử dụng thực phẩm','Không dùng đồ ăn ôi thiu, nghi ngờ hỏng']}]},
      {ic:'🌱',name:'Dinh dưỡng tuổi vị thành niên',rd:'Ăn gì để phát triển toàn diện?',panel:[
        {h:'Đặc thù dinh dưỡng tuổi 15–18'},
        {ul:['Nhu cầu năng lượng cao: nam ~2.500–2.800 kcal/ngày, nữ ~2.100–2.400 kcal/ngày','Cần đủ canxi (sữa, cá nhỏ, đậu) cho chiều cao & xương','Sắt + vitamin C giúp tránh thiếu máu (đặc biệt nữ tuổi dậy thì)','Protein chất lượng: trứng, cá, thịt nạc, đậu — giúp phát triển cơ bắp','Hạn chế đồ ăn nhanh, nước ngọt, đồ uống tăng lực']},
        {mcq:[{q:'Bạn nữ 16 tuổi hay chóng mặt, mệt mỏi, da xanh. Có thể thiếu chất gì?',o:['Sắt (thiếu máu thiếu sắt)','Đường','Chất béo','Muối'],a:0,fb:'Nữ tuổi dậy thì dễ thiếu sắt do mất máu kinh nguyệt — cần ăn thịt đỏ, gan, rau lá xanh đậm + vitamin C.'}]}]},
      {ic:'🤝',name:'Văn minh nơi công cộng',rd:'Ứng xử ở căng tin & nơi đông người.',panel:[
        {cards:[{ic:'🪑',t:'Xếp hàng',d:'Đứng đúng thứ tự, không chen lấn.'},{ic:'🤫',t:'Nói vừa đủ nghe',d:'Không gây ồn ào ảnh hưởng người khác.'},
          {ic:'🗑️',t:'Phân loại rác',d:'Bỏ rác đúng thùng tái chế / hữu cơ / vô cơ.'},{ic:'🙏',t:'Cảm ơn cô bác',d:'Nói "cảm ơn" với cô chú phục vụ.'}]},
        {check:['Xếp hàng mua đồ ăn, không chen ngang','Dùng xong dọn khay về vị trí quy định','Không vừa ăn vừa xem điện thoại lớn tiếng','Không lãng phí thức ăn — lấy vừa đủ ăn','Tôn trọng người phục vụ — xưng hô lịch sự']},
        {note:'Văn minh nơi công cộng là biểu hiện cụ thể của giáo dục công dân — bắt đầu từ những việc nhỏ ngay trong căng tin.'}]}],
    skills:['Dinh dưỡng hợp lí','Vệ sinh an toàn thực phẩm','Văn minh ứng xử'],
    quiz:[{q:'Bữa ăn cân bằng cần đủ mấy nhóm chất chính?',o:['4 nhóm','2 nhóm','1 nhóm','7 nhóm'],a:0},
      {q:'Thói quen tốt trước khi ăn là?',o:['Rửa tay sạch','Bỏ bữa','Ăn thật nhanh','Vừa ăn vừa chơi điện thoại'],a:0},
      {q:'Để phòng ngộ độc thực phẩm, nên?',o:['Ăn chín uống sôi, kiểm tra hạn dùng','Ăn đồ để lâu ngoài trời','Uống nước lã','Dùng đồ hết hạn'],a:0}]},

  medical:{emoji:'🩹',name:'Phòng Y tế',accent:'#16a34a',intro:'Phòng y tế học đường: sơ cấp cứu cơ bản và chăm sóc sức khoẻ thể chất – tinh thần tuổi học trò.',
    rooms:[{ic:'⛑️',name:'Sơ cấp cứu',rd:'Xử trí tình huống thường gặp.',panel:[
        {h:'Một số kĩ năng sơ cứu'},
        {ul:['Chảy máu: ép cầm máu, nâng cao vùng bị thương','Bỏng nhẹ: làm mát dưới vòi nước sạch 10–20 phút','Bong gân: RICE (Nghỉ – Chườm đá – Băng ép – Kê cao)','Ngất xỉu: đặt nằm nơi thoáng, kê chân cao, gọi hỗ trợ']},
        {mcq:[{q:'Bị bỏng nước sôi ở tay, việc ĐẦU TIÊN nên làm là?',o:['Làm mát vùng bỏng dưới vòi nước sạch','Bôi kem đánh răng','Chọc vỡ nốt phồng','Bôi nước mắm'],a:0,fb:'Làm mát bằng nước sạch 10–20 phút giúp giảm tổn thương; không bôi kem đánh răng/nước mắm.'}]}]},
      {ic:'🧠',name:'Sức khoẻ tâm lí tuổi học trò',rd:'Quản lí cảm xúc & stress.',panel:[
        {ul:['Ngủ đủ giấc, vận động đều đặn','Chia sẻ với người tin cậy khi căng thẳng','Hít thở sâu, nghỉ ngơi hợp lí khi áp lực thi cử','Tìm đến thầy cô / phòng tham vấn khi cần']},
        {note:'Căng thẳng kéo dài cần được lắng nghe & hỗ trợ — đừng ngại tìm giúp đỡ.'}]},
      {ic:'💭',name:'Sức khoẻ tâm thần học sinh',rd:'Nhận biết dấu hiệu sớm & tìm hỗ trợ.',panel:[
        {h:'Dấu hiệu cảnh báo căng thẳng / trầm cảm tuổi học trò'},
        {ul:['Mất ngủ kéo dài hoặc ngủ quá nhiều','Mất hứng thú với các hoạt động từng yêu thích','Thay đổi khẩu vị, sụt cân hoặc tăng cân nhanh','Hay cáu gắt, khóc lóc không rõ lí do','Có ý nghĩ tự làm đau / tự tử — DẤU HIỆU KHẨN CẤP']},
        {mcq:[{q:'Bạn thân tâm sự "tớ không muốn sống nữa". Em nên?',o:['Lắng nghe nghiêm túc, không phán xét, báo ngay người lớn tin cậy','Cười cho qua, nghĩ bạn nói đùa','Hứa giữ bí mật tuyệt đối','Tránh xa bạn'],a:0,fb:'Mọi lời nói về tự tử PHẢI được coi là nghiêm túc. Nhiệm vụ của em: lắng nghe + báo người lớn (cô giáo, phụ huynh, đường dây nóng 1800-1567).'}]},
        {note:'Đường dây tư vấn miễn phí: Tổng đài 111 (Bảo vệ trẻ em) hoặc 1800-1567 (Tâm lý). Đừng cô đơn — luôn có người sẵn sàng nghe.'}]},
      {ic:'🚫',name:'Phòng tránh tệ nạn xã hội',rd:'Ma tuý, thuốc lá điện tử, bạo lực học đường.',panel:[
        {cards:[{ic:'💨',t:'Thuốc lá điện tử (vape)',d:'Chứa nicotine + hoá chất độc — gây nghiện rất nhanh.'},{ic:'💊',t:'Ma tuý "núp bóng"',d:'Bánh, kẹo, nước trái cây tẩm ma tuý — cẩn thận đồ lạ.'},
          {ic:'👊',t:'Bạo lực học đường',d:'Im lặng là tiếp tay — báo ngay thầy cô / phụ huynh.'},{ic:'📱',t:'Bắt nạt mạng',d:'Lưu bằng chứng, không trả đũa, báo người lớn.'}]},
        {check:['Không nhận đồ ăn / nước uống từ người lạ','Không thử dù chỉ một lần — nghiện chỉ cần lần đầu','Nói KHÔNG với bạn rủ rê — tình bạn thật không ép em làm điều xấu','Báo cáo bạo lực học đường qua hộp thư trường, đường dây 111','Tuyệt đối tránh các nhóm chat/group lạ trên MXH']},
        {mcq:[{q:'Bạn rủ "thử một hơi vape cho biết, không nghiện đâu". Câu trả lời tốt nhất?',o:['"Không, tớ không thử. Bạn cũng nên dừng đi"','"Ừ, một hơi chắc không sao"','"Tớ thử nhưng đừng nói với ai"','"Để mai tớ thử khi rảnh"'],a:0,fb:'Vape chứa nicotine gây nghiện rất nhanh chỉ sau vài lần. Bạn thật sự sẽ tôn trọng khi em từ chối thẳng thắn.'}]}]}],
    skills:['Sơ cấp cứu cơ bản','Chăm sóc sức khoẻ tinh thần','Phòng tránh tệ nạn'],
    quiz:[{q:'Sơ cứu bỏng nhẹ đúng cách là?',o:['Làm mát bằng nước sạch','Bôi kem đánh răng','Chườm nước đá trực tiếp lâu','Băng kín thật chặt'],a:0},
      {q:'RICE trong sơ cứu bong gân KHÔNG gồm bước nào?',o:['Bôi dầu nóng ngay','Nghỉ ngơi','Chườm đá','Kê cao'],a:0},
      {q:'Khi căng thẳng kéo dài, nên?',o:['Chia sẻ & tìm hỗ trợ','Giữ kín một mình','Bỏ ăn bỏ ngủ','Tự cô lập'],a:0}]},

  gym:{emoji:'🏀',name:'Nhà thể chất',accent:'#0891b2',intro:'Giáo dục thể chất & Giáo dục Quốc phòng – An ninh: rèn luyện sức khoẻ, ý chí và kĩ năng.',
    rooms:[{ic:'🏃',name:'Giáo dục thể chất',rd:'Các môn thể thao trường học.',panel:[
        {cards:[{ic:'🏃',t:'Điền kinh',d:'Chạy, nhảy, ném.'},{ic:'⚽',t:'Bóng đá',d:'Phối hợp đồng đội.'},
          {ic:'🏀',t:'Bóng rổ',d:'Phản xạ & chiến thuật.'},{ic:'🏸',t:'Cầu lông',d:'Nhanh tay, nhanh mắt.'}]},
        {note:'Tập thể dục đều đặn giúp tăng sức khoẻ, giảm căng thẳng và học tập tốt hơn.'}]},
      {ic:'🪖',name:'Giáo dục QP – AN',rd:'Kiến thức quốc phòng – an ninh.',panel:[
        {ul:['Đội ngũ từng người không có súng','Hiểu biết chung về quốc phòng toàn dân','Kĩ thuật bắn súng tiểu liên AK (lí thuyết & an toàn)','Phòng tránh tai nạn bom mìn, vật liệu nổ','Trách nhiệm bảo vệ Tổ quốc của công dân']}]},
      {ic:'⚡',name:'Phản xạ & thể lực',rd:'Phản Xạ Cầu Thủ — mini-game thể thao.',href:'/lop2-the-thao.html'}],
    skills:['Rèn luyện thể chất','Kiến thức QP – AN'],
    quiz:[{q:'Lợi ích của tập thể dục đều đặn?',o:['Tăng sức khoẻ & tinh thần','Gây mệt mỏi kéo dài','Giảm trí nhớ','Không có lợi ích'],a:0},
      {q:'Môn Giáo dục QP – AN ở THPT giúp học sinh?',o:['Hiểu trách nhiệm bảo vệ Tổ quốc','Trở thành quân nhân chuyên nghiệp','Được miễn học các môn khác','Không học gì hữu ích'],a:0},
      {q:'Khi gặp vật nghi là bom mìn/vật liệu nổ, em nên?',o:['Tránh xa & báo người lớn/cơ quan chức năng','Cầm lên xem','Đập thử','Mang về nhà'],a:0}]},

  bike:{emoji:'🚲',name:'Nhà xe học sinh',accent:'#64748b',intro:'Khu để xe & góc an toàn giao thông: đi lại an toàn, văn minh và đúng luật.',
    rooms:[{ic:'🚦',name:'An toàn giao thông',rd:'Luật & văn hoá giao thông.',panel:[
        {h:'An toàn giao thông cho học sinh'},
        {ul:['Đội mũ bảo hiểm khi đi xe đạp điện / xe máy điện','Đi đúng phần đường, làn đường','Không dàn hàng ngang, không lạng lách','Không dùng điện thoại khi đang điều khiển xe','Tuân thủ đèn tín hiệu & biển báo']},
        {mcq:[{q:'Học sinh đi xe đạp điện đến trường BẮT BUỘC phải?',o:['Đội mũ bảo hiểm cài quai đúng cách','Đi thật nhanh cho kịp giờ','Chở ba bạn','Vượt đèn đỏ khi đường vắng'],a:0,fb:'Người đi xe đạp điện/xe máy điện bắt buộc đội mũ bảo hiểm; vi phạm sẽ bị xử lí theo luật.'}]}]},
      {ic:'🅿️',name:'Văn hoá để xe',rd:'Sắp xếp gọn gàng.',panel:[
        {check:['Để xe đúng nơi quy định','Khoá xe cẩn thận','Xếp xe ngay ngắn theo hàng','Tắt máy/khoá điện trước khi rời xe']}]},
      {ic:'⚡',name:'An toàn xe đạp điện – xe máy điện',rd:'Đặc thù kĩ thuật cần biết.',panel:[
        {h:'Khác biệt giữa xe đạp điện & xe máy điện'},
        {ul:['Xe đạp điện: tốc độ ≤ 25 km/h, công suất ≤ 250W — không cần GPLX, không cần đăng kí biển số (đa số mẫu)','Xe máy điện: tốc độ > 25 km/h hoặc công suất > 250W — PHẢI đăng kí biển số, đủ 16 tuổi mới được điều khiển','Cả hai đều BẮT BUỘC đội mũ bảo hiểm cài quai đúng cách','Pin Li-ion: tránh sạc qua đêm, không sạc ngay sau đi mưa, không dùng sạc không chính hãng','Kiểm tra phanh + lốp + đèn trước khi đi mỗi ngày']},
        {mcq:[{q:'Học sinh 15 tuổi điều khiển xe máy điện đến trường — có vi phạm không?',o:['Có — phải đủ 16 tuổi mới được lái xe máy điện','Không, vì là xe điện','Chỉ vi phạm nếu không đội mũ','Tuỳ địa phương quy định'],a:0,fb:'Theo Luật Giao thông đường bộ, người đủ 16 tuổi trở lên mới được lái xe gắn máy & xe máy điện (xe có vận tốc > 25 km/h hoặc công suất > 250W).'}]},
        {note:'Pin xe điện cháy nổ rất nguy hiểm — KHÔNG sạc trong nhà ở qua đêm, không che đậy khi đang sạc.'}]},
      {ic:'🛣️',name:'Văn hoá giao thông & kĩ năng đi đường',rd:'Quan sát, nhường nhịn, dự đoán.',panel:[
        {h:'Kĩ năng đi đường an toàn'},
        {ol:['Quan sát kĩ trước khi sang đường — nhìn trái, nhìn phải, lại nhìn trái','Báo hiệu rõ ràng khi rẽ — bật xi-nhan / giơ tay sớm','Giữ khoảng cách an toàn với xe phía trước','Không phóng nhanh, vượt ẩu, lạng lách','Tuân thủ đèn tín hiệu — dừng hẳn khi đèn đỏ, không vượt lên vạch']},
        {cards:[{ic:'👀',t:'Quan sát',d:'Luôn dự đoán tình huống bất ngờ.'},{ic:'🤲',t:'Nhường nhịn',d:'Người đi bộ, người già, trẻ em được ưu tiên.'},
          {ic:'🚫',t:'Không dùng điện thoại',d:'Nghe gọi/nhắn tin khi lái = nguy hiểm chết người.'},{ic:'🍺',t:'Không cồn',d:'Đã uống rượu bia — tuyệt đối không lái xe.'}]},
        {mcq:[{q:'Gặp đèn vàng đang chớp tại ngã tư, em nên?',o:['Giảm tốc độ, quan sát kĩ rồi mới qua','Tăng tốc vượt qua thật nhanh','Dừng giữa ngã tư','Bóp còi liên tục'],a:0,fb:'Đèn vàng chớp = cảnh báo nguy hiểm, các phương tiện được phép đi nhưng PHẢI giảm tốc & nhường đường cho người đi bộ + xe ưu tiên.'}]}]}],
    skills:['An toàn giao thông','Ý thức kỉ luật','Văn hoá giao thông'],
    quiz:[{q:'Khi đi xe đạp điện, học sinh bắt buộc phải?',o:['Đội mũ bảo hiểm','Chở 3','Đi vào làn ô tô','Bấm còi liên tục'],a:0},
      {q:'Đèn tín hiệu màu đỏ nghĩa là?',o:['Dừng lại','Đi nhanh','Rẽ trái tự do','Tăng tốc'],a:0},
      {q:'Hành vi nào an toàn khi tham gia giao thông?',o:['Đi đúng phần đường, chú ý quan sát','Dùng điện thoại khi lái','Dàn hàng ngang','Lạng lách'],a:0}]},
};

export const SPACE_SETS_ITEMS = [
  { domain: 'pharmacy', spaces: SPACES_PHARMACY },
  { domain: 'secondary', spaces: SPACES_SECONDARY },
  { domain: 'it', spaces: SPACES_IT },
  { domain: 'primary', spaces: SPACES_PRIMARY },
  { domain: 'preschool', spaces: SPACES_PRESCHOOL },
  { domain: 'language', spaces: SPACES_LANGUAGE },
  { domain: 'driving', spaces: SPACES_DRIVING },
  { domain: 'highschool', spaces: SPACES_HIGHSCHOOL },
];
