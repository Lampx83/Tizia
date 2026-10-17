// ============================================================
// Lớp 11 · ĐỊA LÍ — Lý thuyết tuần (35 tuần)
// Bám CT GDPT 2018 (Địa lí 11) — bộ Kết nối tri thức.
//   Phần 1: Một số vấn đề kinh tế – xã hội thế giới (tuần 1–5)
//   Phần 2: Địa lí khu vực và quốc gia (tuần 6–35)
// Key trùng id quiz: "H11DIA-wNN-quiz".
// ============================================================

export const H11DIA_LESSONS = {
  // ──────────────── HK1 ────────────────
  'H11DIA-w01-quiz': {
    topic: 'Sự khác biệt về trình độ phát triển kinh tế – xã hội',
    intro: 'Chào các em! Bước vào chương trình Địa lí 11, chúng ta nhìn ra thế giới và đặt câu hỏi đầu tiên: vì sao các quốc gia lại giàu nghèo khác nhau đến vậy? Bài học hôm nay giúp các em phân nhóm các nước và hiểu thước đo dùng để so sánh trình độ phát triển.',
    objectives: [
      'Phân biệt được nhóm nước phát triển và nhóm nước đang phát triển.',
      'Nêu được các tiêu chí so sánh: GNI/người, cơ cấu kinh tế, chỉ số HDI.',
      'Giải thích được nguyên nhân và xu hướng của khoảng cách phát triển.',
    ],
    theory: [
      { h: 'Hai nhóm nước trên thế giới' },
      { p: 'Dựa vào trình độ phát triển kinh tế – xã hội, các nước được chia thành hai nhóm: nhóm nước phát triển và nhóm nước đang phát triển. Đây là cách phân chia phổ biến để có chính sách hợp tác, hỗ trợ phù hợp, không phải để phân biệt đối xử.' },
      { h: 'Các tiêu chí phân biệt' },
      { ul: ['GNI bình quân đầu người (thu nhập quốc dân/người): nước phát triển ở mức cao, thường trên 13.000 USD/người (phân loại của Ngân hàng Thế giới).', 'Cơ cấu kinh tế: nước phát triển có khu vực dịch vụ chiếm tỉ trọng lớn trong GDP; nước đang phát triển còn tỉ trọng nông nghiệp cao.', 'Chỉ số phát triển con người HDI: tổng hợp tuổi thọ, giáo dục và thu nhập, dao động từ 0 đến 1.'] },
      { note: 'Diện tích lãnh thổ hay dân số KHÔNG phải tiêu chí phân loại. Ấn Độ rất rộng và đông dân nhưng vẫn là nước đang phát triển; Xin-ga-po nhỏ bé lại là nước phát triển.' },
      { h: 'Đặc điểm mỗi nhóm' },
      { ul: ['Nước phát triển: GNI/người cao, HDI rất cao, dịch vụ và công nghiệp công nghệ cao chiếm ưu thế, tuổi thọ cao, đô thị hoá cao.', 'Nước đang phát triển: GNI/người thấp – trung bình, HDI trung bình hoặc thấp, còn phụ thuộc nông nghiệp và khai thác tài nguyên.'] },
      { h: 'Xu hướng khoảng cách phát triển' },
      { p: 'Khoảng cách giữa hai nhóm vẫn còn rất lớn, nhưng đang được rút ngắn ở một số khía cạnh nhờ toàn cầu hoá, chuyển giao công nghệ và sự vươn lên của các nền kinh tế mới nổi như Trung Quốc, Ấn Độ.' },
      { note: 'HDI từ 0,800 trở lên được xếp loại rất cao; dưới 0,550 là thấp. Việt Nam hiện thuộc nhóm phát triển con người cao (khoảng 0,72).' },
    ],
    examples: [
      { q: 'Vì sao một nước giàu tài nguyên vẫn có thể là nước đang phát triển?', a: 'Phân tích: Tài nguyên chỉ là điều kiện, không quyết định trình độ phát triển. Nếu chủ yếu xuất khẩu nguyên liệu thô, ít công nghiệp chế biến, HDI và GNI/người thấp thì vẫn là nước đang phát triển — như nhiều nước Mỹ La-tinh, Tây Nam Á.' },
      { q: 'So sánh nhanh: vì sao dịch vụ chiếm tỉ trọng cao lại là dấu hiệu của nước phát triển?', a: 'Phân tích: Khi kinh tế phát triển, lao động chuyển từ nông nghiệp sang công nghiệp rồi sang dịch vụ (tài chính, công nghệ, y tế, giáo dục). Tỉ trọng dịch vụ trên 65–75% GDP phản ánh năng suất cao và nhu cầu xã hội phức tạp.' },
    ],
  },

  'H11DIA-w02-quiz': {
    topic: 'Toàn cầu hoá và khu vực hoá kinh tế',
    intro: 'Chào các em! Vì sao một chiếc điện thoại có thể được thiết kế ở Mỹ, sản xuất linh kiện ở Hàn Quốc, lắp ráp ở Việt Nam rồi bán đi khắp thế giới? Câu trả lời nằm ở hai xu thế lớn của thời đại: toàn cầu hoá và khu vực hoá kinh tế.',
    objectives: [
      'Trình bày được khái niệm và biểu hiện của toàn cầu hoá kinh tế.',
      'Phân biệt toàn cầu hoá với khu vực hoá kinh tế.',
      'Đánh giá được hệ quả hai mặt của toàn cầu hoá.',
    ],
    theory: [
      { h: 'Toàn cầu hoá kinh tế là gì?' },
      { p: 'Toàn cầu hoá kinh tế là quá trình liên kết các nền kinh tế trên thế giới ngày càng chặt chẽ, phụ thuộc lẫn nhau, vượt qua biên giới quốc gia. Đây là xu thế khách quan, không thể đảo ngược.' },
      { h: 'Biểu hiện của toàn cầu hoá' },
      { ul: ['Thương mại quốc tế phát triển nhanh, hàng rào thuế quan giảm dần.', 'Đầu tư nước ngoài (FDI) tăng mạnh.', 'Vai trò của các công ty xuyên quốc gia (TNCs) ngày càng lớn.', 'Hình thành các tổ chức kinh tế toàn cầu, đứng đầu là Tổ chức Thương mại Thế giới (WTO).'] },
      { note: 'Tự cấp tự túc, đóng cửa biên giới là điều NGƯỢC với toàn cầu hoá — đừng nhầm.' },
      { h: 'Khu vực hoá kinh tế' },
      { p: 'Khu vực hoá là sự liên kết kinh tế giữa các nước trong cùng một khu vực địa lí, có nét tương đồng về lợi ích. Ví dụ: EU (châu Âu), ASEAN (Đông Nam Á), APEC (vành đai Thái Bình Dương).' },
      { h: 'Hệ quả của toàn cầu hoá' },
      { ul: ['Tích cực: thúc đẩy tăng trưởng, chuyển dịch cơ cấu; nước đang phát triển tiếp cận được vốn, công nghệ, thị trường.', 'Tiêu cực: gia tăng cạnh tranh, nguy cơ phụ thuộc bên ngoài, làm sâu sắc khoảng cách giàu nghèo.'] },
      { note: 'WTO thành lập năm 1995, kế tục Hiệp định chung về thuế quan và thương mại (GATT). Việt Nam gia nhập WTO năm 2007.' },
    ],
    examples: [
      { q: 'Vì sao toàn cầu hoá vừa là cơ hội vừa là thách thức với nước đang phát triển?', a: 'Phân tích: Cơ hội ở chỗ thu hút được FDI, công nghệ, mở rộng thị trường xuất khẩu. Thách thức ở chỗ hàng hoá trong nước phải cạnh tranh với hàng ngoại, doanh nghiệp yếu dễ bị thâu tóm, kinh tế dễ bị tổn thương trước biến động toàn cầu.' },
      { q: 'Phân biệt toàn cầu hoá và khu vực hoá qua ví dụ ASEAN.', a: 'Phân tích: ASEAN là biểu hiện của khu vực hoá — chỉ 11 nước Đông Nam Á liên kết với nhau. Còn việc Việt Nam vào WTO, ký hiệp định với EU, Hoa Kỳ là biểu hiện của toàn cầu hoá — vươn ra phạm vi toàn thế giới.' },
    ],
  },

  'H11DIA-w03-quiz': {
    topic: 'Thực hành — Cơ hội và thách thức của toàn cầu hoá',
    intro: 'Chào các em! Tiết thực hành này giúp các em rèn kỹ năng viết báo cáo: gom số liệu, lập luận hai chiều và rút ra kết luận về cơ hội – thách thức của toàn cầu hoá với một nước đang phát triển như Việt Nam.',
    objectives: [
      'Lập được bảng cơ hội và thách thức của toàn cầu hoá.',
      'Nêu được vai trò của các tổ chức tài chính quốc tế (WB, IMF).',
      'Rút ra giải pháp để nước đang phát triển tận dụng cơ hội.',
    ],
    theory: [
      { h: 'Cơ hội từ toàn cầu hoá' },
      { ul: ['Tiếp cận vốn đầu tư trực tiếp nước ngoài (FDI).', 'Tiếp nhận công nghệ và kinh nghiệm quản lí tiên tiến.', 'Mở rộng thị trường xuất khẩu, tham gia chuỗi giá trị toàn cầu.'] },
      { h: 'Thách thức từ toàn cầu hoá' },
      { ul: ['Cạnh tranh khốc liệt với hàng hoá, doanh nghiệp nước ngoài.', 'Nguy cơ tụt hậu công nghệ, phụ thuộc kinh tế bên ngoài.', 'Áp lực về môi trường và giữ gìn bản sắc văn hoá.'] },
      { h: 'Các tổ chức tài chính quốc tế' },
      { p: 'Ngân hàng Thế giới (WB) cho vay vốn phát triển; Quỹ Tiền tệ Quốc tế (IMF) hỗ trợ ổn định tiền tệ và cán cân thanh toán. Cả hai hỗ trợ tài chính cho nước đang phát triển.' },
      { h: 'Giải pháp cho nước đang phát triển' },
      { ul: ['Nâng cao chất lượng nguồn nhân lực.', 'Đổi mới công nghệ, đẩy mạnh chuyển đổi số.', 'Hoàn thiện thể chế, cải thiện môi trường đầu tư.'] },
      { note: 'Việt Nam gia nhập WTO tháng 1/2007, đánh dấu bước hội nhập kinh tế quốc tế sâu rộng: mở rộng thị trường, thu hút đầu tư, thúc đẩy đổi mới thể chế.' },
    ],
    examples: [
      { q: 'Để tận dụng toàn cầu hoá, vì sao nâng cao chất lượng nhân lực là quan trọng nhất?', a: 'Phân tích: Vốn và công nghệ có thể nhập khẩu, nhưng nếu lao động không đủ trình độ vận hành thì không hấp thụ được. Nhân lực chất lượng cao giúp nước ta tiến lên các khâu giá trị gia tăng cao (thiết kế, R&D) thay vì mãi gia công, lắp ráp giá rẻ.' },
      { q: 'Phân biệt vai trò của WB và IMF.', a: 'Phân tích: WB (Ngân hàng Thế giới) cho vay dài hạn để xây dựng hạ tầng, giảm nghèo. IMF (Quỹ Tiền tệ Quốc tế) tập trung ổn định tỉ giá, hỗ trợ khi quốc gia gặp khủng hoảng cán cân thanh toán. Một bên là phát triển, một bên là ổn định tiền tệ.' },
    ],
  },

  'H11DIA-w04-quiz': {
    topic: 'Một số tổ chức quốc tế, khu vực và an ninh toàn cầu',
    intro: 'Chào các em! Thế giới ngày nay vận hành dựa trên các luật chơi chung do nhiều tổ chức quốc tế đặt ra. Bài học giúp các em nhận diện các tổ chức lớn và hiểu vì sao những vấn đề an ninh toàn cầu cần được giải quyết bằng hợp tác.',
    objectives: [
      'Nêu được vai trò của Liên hợp quốc, WTO, IMF.',
      'Liệt kê được các vấn đề an ninh toàn cầu.',
      'Giải thích vì sao cần hợp tác đa phương để giải quyết.',
    ],
    theory: [
      { h: 'Liên hợp quốc (UN)' },
      { p: 'Liên hợp quốc thành lập ngày 24/10/1945, trụ sở chính tại New York (Hoa Kỳ). Nhiệm vụ: duy trì hoà bình và an ninh quốc tế, thúc đẩy hợp tác phát triển. Việt Nam gia nhập năm 1977.' },
      { h: 'Các tổ chức kinh tế – tài chính' },
      { ul: ['WTO (Tổ chức Thương mại Thế giới) — thành lập 1995, điều phối thương mại toàn cầu.', 'IMF (Quỹ Tiền tệ Quốc tế) — hỗ trợ ổn định tiền tệ và cán cân thanh toán.', 'WB (Ngân hàng Thế giới) — cho vay vốn phát triển.'] },
      { h: 'Các tổ chức khu vực' },
      { p: 'Bên cạnh tổ chức toàn cầu, có các tổ chức khu vực như EU, ASEAN, APEC, Mercosur, AU (Liên minh châu Phi)... tăng cường liên kết giữa các nước cùng khu vực.' },
      { h: 'An ninh toàn cầu' },
      { ul: ['An ninh lương thực — bảo đảm đủ lương thực cho mọi người.', 'An ninh năng lượng — nguồn cung ổn định, giá hợp lí.', 'An ninh nguồn nước.', 'An ninh mạng — bảo vệ hệ thống thông tin.'] },
      { note: 'Các vấn đề an ninh toàn cầu mang tính xuyên biên giới, không quốc gia nào tự giải quyết được; cần hợp tác đa phương trên cơ sở luật pháp quốc tế.' },
    ],
    examples: [
      { q: 'Vì sao biến đổi khí hậu được coi là vấn đề an ninh toàn cầu?', a: 'Phân tích: Khí thải từ một nước làm Trái Đất nóng lên, ảnh hưởng tới mọi quốc gia — nước biển dâng, thiên tai, mất mùa. Không nước nào tự ngăn được, nên phải hợp tác như Hiệp định Paris 2015 để cùng giảm phát thải.' },
      { q: 'Liên hợp quốc khác WTO ở điểm nào?', a: 'Phân tích: Liên hợp quốc là tổ chức chính trị – an ninh toàn diện, lo hoà bình và phát triển chung. WTO chuyên về thương mại — đặt luật chơi cho mua bán hàng hoá, dịch vụ giữa các nước. Phạm vi và chức năng khác nhau.' },
    ],
  },

  'H11DIA-w05-quiz': {
    topic: 'Thực hành — Báo cáo về nền kinh tế tri thức',
    intro: 'Chào các em! Tài nguyên rồi sẽ cạn, nhưng tri thức thì càng dùng càng nhân lên. Tiết này các em tìm hiểu kinh tế tri thức — mô hình mà mọi quốc gia đều hướng tới, và cơ hội của Việt Nam trong cuộc đua này.',
    objectives: [
      'Nêu được khái niệm và đặc trưng của kinh tế tri thức.',
      'Xác định yếu tố cốt lõi của kinh tế tri thức.',
      'Đánh giá cơ hội và thách thức của Việt Nam.',
    ],
    theory: [
      { h: 'Kinh tế tri thức là gì?' },
      { p: 'Kinh tế tri thức (knowledge economy) là nền kinh tế dựa chủ yếu vào tri thức, thông tin và công nghệ cao, trong đó việc sản xuất, phân phối và sử dụng tri thức trở thành động lực chính của tăng trưởng.' },
      { h: 'Đặc trưng' },
      { ul: ['Dịch vụ và các ngành công nghệ cao chiếm tỉ trọng lớn trong GDP.', 'Đầu tư mạnh cho nghiên cứu – phát triển (R&D) và giáo dục.', 'Lao động trí óc, đổi mới sáng tạo giữ vai trò quyết định.'] },
      { h: 'Yếu tố cốt lõi' },
      { p: 'Cốt lõi không phải tài nguyên hay tiền vốn, mà là nguồn nhân lực chất lượng cao và năng lực đổi mới sáng tạo. Quốc gia tiêu biểu: Hoa Kỳ, Nhật Bản, Hàn Quốc, một số nước EU.' },
      { h: 'Cơ hội và thách thức của Việt Nam' },
      { ul: ['Cơ hội: dân số trẻ, tiếp cận nhanh công nghệ mới, hạ tầng internet phát triển.', 'Thách thức: chất lượng nguồn nhân lực và hạ tầng công nghệ còn hạn chế, đầu tư R&D thấp.'] },
      { note: 'Trong kinh tế tri thức, một sáng chế hay phần mềm có thể tạo giá trị khổng lồ mà gần như không tiêu hao tài nguyên vật chất — khác hẳn kinh tế công nghiệp truyền thống.' },
    ],
    examples: [
      { q: 'Vì sao kinh tế tri thức lại bền vững hơn kinh tế dựa vào tài nguyên?', a: 'Phân tích: Tài nguyên hữu hạn, khai thác mãi sẽ cạn và gây ô nhiễm. Tri thức là vô hạn, càng chia sẻ càng phát triển, ít tiêu hao môi trường. Nước dựa vào tri thức ít bị tổn thương khi giá nguyên liệu biến động.' },
      { q: 'Việt Nam cần làm gì để phát triển kinh tế tri thức?', a: 'Phân tích: Tận dụng lợi thế dân số trẻ bằng cách đầu tư mạnh cho giáo dục STEM, đào tạo nhân lực công nghệ thông tin, tăng chi cho R&D, xây dựng hạ tầng số và hệ sinh thái khởi nghiệp đổi mới sáng tạo.' },
    ],
  },

  'H11DIA-w06-quiz': {
    topic: 'Mỹ La-tinh — Vị trí, tự nhiên và dân cư',
    intro: 'Chào các em! Chúng ta bắt đầu hành trình tìm hiểu các khu vực trên thế giới với Mỹ La-tinh — vùng đất của rừng A-ma-dôn, vũ điệu Samba và những đô thị khổng lồ. Một khu vực giàu tài nguyên nhưng cũng nhiều bất công.',
    objectives: [
      'Xác định được phạm vi và đặc điểm tự nhiên của Mỹ La-tinh.',
      'Nêu được đặc điểm dân cư – xã hội.',
      'Giải thích được các vấn đề xã hội nổi cộm.',
    ],
    theory: [
      { h: 'Phạm vi khu vực' },
      { p: 'Mỹ La-tinh gồm các quốc gia ở Trung Mỹ, Nam Mỹ và vùng biển Ca-ri-bê. Tên gọi "La-tinh" do phần lớn dân cư nói tiếng Tây Ban Nha và Bồ Đào Nha — hai ngôn ngữ gốc La-tinh, hệ quả của thời kỳ thuộc địa.' },
      { h: 'Điều kiện tự nhiên' },
      { ul: ['Khí hậu nóng ẩm, phân hoá đa dạng theo vĩ độ và độ cao.', 'Rừng A-ma-dôn — rừng nhiệt đới lớn nhất thế giới, "lá phổi xanh" của Trái Đất.', 'Tài nguyên phong phú: dầu mỏ, đồng, sắt, bạc; đồng bằng phù sa màu mỡ.'] },
      { h: 'Đặc điểm dân cư' },
      { ul: ['Thành phần dân cư đa dạng: người bản địa, người gốc Âu, gốc Phi và người lai.', 'Tỉ lệ đô thị hoá cao — vào loại cao nhất trong các khu vực đang phát triển.', 'Nhiều siêu đô thị: Xao Pao-lô, Mê-hi-cô Xi-ti, Bu-ê-nốt Ai-rét.'] },
      { h: 'Vấn đề xã hội' },
      { note: 'Bất bình đẳng thu nhập rất sâu sắc và đô thị hoá tự phát (dân nông thôn ồ ạt ra thành phố) là hai vấn đề xã hội nổi cộm, sinh ra các khu nhà ổ chuột (favela) rộng lớn quanh đô thị.' },
    ],
    examples: [
      { q: 'Vì sao Mỹ La-tinh có tỉ lệ đô thị hoá cao nhưng vẫn nhiều khu ổ chuột?', a: 'Phân tích: Đây là đô thị hoá tự phát — dân nông thôn ra thành phố nhanh hơn khả năng tạo việc làm và nhà ở. Hệ quả là nhiều người sống trong khu favela thiếu điện nước, dịch vụ, dù về số liệu thì tỉ lệ dân thành thị rất cao.' },
      { q: 'Tại sao phần lớn dân Mỹ La-tinh nói tiếng Tây Ban Nha, Bồ Đào Nha?', a: 'Phân tích: Từ thế kỷ XVI, Tây Ban Nha chiếm hầu hết khu vực, Bồ Đào Nha chiếm Bra-xin. Ngôn ngữ, tôn giáo (Công giáo) của mẫu quốc được áp đặt và duy trì tới nay — dấu ấn lịch sử thuộc địa.' },
    ],
  },

  'H11DIA-w07-quiz': {
    topic: 'Tình hình kinh tế Mỹ La-tinh',
    intro: 'Chào các em! Mỹ La-tinh giàu tài nguyên bậc nhất thế giới, vậy vì sao nhiều nước nơi đây vẫn loay hoay với nợ nần và bất ổn? Bài học giúp các em hiểu bức tranh kinh tế nhiều màu sắc của khu vực này.',
    objectives: [
      'Nêu được đặc điểm chung của kinh tế Mỹ La-tinh.',
      'Xác định các nền kinh tế lớn và cơ cấu ngành.',
      'Phân tích nguyên nhân và triển vọng phát triển.',
    ],
    theory: [
      { h: 'Đặc điểm chung' },
      { p: 'Kinh tế Mỹ La-tinh phát triển không đều: một số nước đạt mức thu nhập trung bình – cao, nhiều nước còn khó khăn. Bra-xin là nền kinh tế lớn nhất khu vực, tiếp đến là Mê-hi-cô, Ác-hen-ti-na.' },
      { h: 'Cơ cấu ngành' },
      { ul: ['Dịch vụ chiếm tỉ trọng lớn trong GDP của hầu hết các nước.', 'Công nghiệp khai khoáng và chế biến nông sản giữ vai trò quan trọng.', 'Nông nghiệp nhiệt đới phát triển: cà phê, mía đường, đậu nành, chăn nuôi bò.'] },
      { h: 'Khó khăn' },
      { ul: ['Nợ nước ngoài cao.', 'Lệ thuộc vào xuất khẩu nguyên liệu, nông sản thô — dễ tổn thương khi giá thế giới giảm.', 'Lạm phát và bất ổn chính trị ở một số nước.'] },
      { h: 'Liên kết và triển vọng' },
      { p: 'Khối Thị trường chung Nam Mỹ (Mercosur, thành lập 1991) thúc đẩy liên kết khu vực. Triển vọng phụ thuộc vào đa dạng hoá cơ cấu kinh tế, giảm phụ thuộc nguyên liệu và hội nhập sâu hơn.' },
      { note: 'Hiện tượng phụ thuộc một vài mặt hàng xuất khẩu khiến nền kinh tế dễ "lên voi xuống chó" theo giá hàng hoá thế giới — một bài học về sự cần thiết của đa dạng hoá.' },
    ],
    examples: [
      { q: 'Vì sao xuất khẩu nguyên liệu thô khiến kinh tế Mỹ La-tinh dễ tổn thương?', a: 'Phân tích: Giá nguyên liệu (dầu, đồng, cà phê) biến động mạnh trên thị trường thế giới. Khi giá giảm, thu ngân sách và kim ngạch xuất khẩu sụt theo, kéo theo nợ và lạm phát. Đa dạng hoá sang công nghiệp chế biến, dịch vụ giúp giảm rủi ro này.' },
      { q: 'Bra-xin có vai trò gì trong kinh tế khu vực?', a: 'Phân tích: Bra-xin là nền kinh tế lớn nhất Mỹ La-tinh, cường quốc nông sản (cà phê, đậu nành, mía), có công nghiệp đa dạng và là thành viên BRICS. Quy mô của Bra-xin ảnh hưởng lớn tới toàn khu vực.' },
    ],
  },

  'H11DIA-w08-quiz': {
    topic: 'Thực hành — Báo cáo về kinh tế Mỹ La-tinh',
    intro: 'Chào các em! Tiết thực hành này giúp các em hệ thống các thế mạnh kinh tế đặc trưng của từng nước Mỹ La-tinh — mỗi quốc gia một "đặc sản" riêng — và nhận diện những thách thức chung của khu vực.',
    objectives: [
      'Liệt kê được thế mạnh kinh tế tiêu biểu của các nước.',
      'Lập bảng so sánh sản phẩm xuất khẩu chủ lực.',
      'Nêu được thách thức chung của khu vực.',
    ],
    theory: [
      { h: 'Thế mạnh nông nghiệp tiêu biểu' },
      { ul: ['Bra-xin: cà phê, đậu nành (đậu tương), mía đường — xuất khẩu hàng đầu thế giới.', 'Ác-hen-ti-na: đồng cỏ Pam-pa rộng lớn — chăn nuôi bò và trồng lúa mì.', 'Cuba: truyền thống mía đường.'] },
      { h: 'Thế mạnh khoáng sản và năng lượng' },
      { ul: ['Chi-lê: sản xuất đồng lớn nhất thế giới.', 'Vê-nê-xu-ê-la: trữ lượng dầu mỏ lớn.', 'Pê-ru, Bô-li-vi-a: bạc, kẽm, thiếc.'] },
      { h: 'Thách thức chung' },
      { p: 'Dù mỗi nước có thế mạnh riêng, khu vực đối mặt với những vấn đề chung: lạm phát cao, bất ổn chính trị, bất bình đẳng thu nhập và phụ thuộc xuất khẩu nguyên liệu.' },
      { note: 'Hãy ghi nhớ kiểu "mỗi nước một thế mạnh": Chi-lê – đồng, Vê-nê-xu-ê-la – dầu, Ác-hen-ti-na – bò và lúa mì, Bra-xin – cà phê và đậu nành.' },
      { h: 'Định hướng phát triển' },
      { p: 'Để vượt qua thách thức, các nước cần đa dạng hoá kinh tế, đầu tư chế biến sâu thay vì xuất khẩu thô, ổn định chính trị – tài chính và tăng cường liên kết khu vực.' },
    ],
    examples: [
      { q: 'Vì sao Chi-lê được gọi là "cường quốc đồng"?', a: 'Phân tích: Chi-lê có trữ lượng đồng lớn nhất và sản lượng khai thác đồng đứng đầu thế giới, chiếm khoảng một phần tư sản lượng toàn cầu. Đồng là mặt hàng xuất khẩu chủ lực, đóng góp lớn cho ngân sách nước này.' },
      { q: 'Vê-nê-xu-ê-la giàu dầu mỏ nhưng kinh tế lại khủng hoảng — bài học gì?', a: 'Phân tích: Quá phụ thuộc dầu mỏ khiến khi giá dầu giảm và quản lí yếu kém, nền kinh tế Vê-nê-xu-ê-la rơi vào lạm phát phi mã, thiếu hàng hoá. Đây là minh chứng cho việc giàu tài nguyên không bảo đảm thịnh vượng nếu thiếu đa dạng hoá và thể chế tốt.' },
    ],
  },

  'H11DIA-w09-quiz': {
    topic: 'Liên minh châu Âu (EU) — Vị thế và mục tiêu',
    intro: 'Chào các em! Từ một khối than – thép sau chiến tranh, EU đã trở thành liên minh kinh tế – chính trị sâu sắc nhất hành tinh. Bài học giúp các em hiểu EU hình thành thế nào và hướng tới mục tiêu gì.',
    objectives: [
      'Nêu được quá trình hình thành và mở rộng của EU.',
      'Trình bày mục tiêu và thể chế cơ bản của EU.',
      'Đánh giá vị thế của EU trên thế giới.',
    ],
    theory: [
      { h: 'Quá trình hình thành' },
      { ul: ['Tiền thân là Cộng đồng Than – Thép châu Âu (ECSC, 1951).', 'Hiệp ước Ma-xtrích ký năm 1992, có hiệu lực năm 1993 — chính thức lập Liên minh châu Âu (EU).', 'EU liên tục mở rộng; sau khi Anh rời đi (Brexit), hiện có 27 thành viên.'] },
      { h: 'Mục tiêu của EU' },
      { p: 'EU hướng tới xây dựng một liên minh toàn diện về kinh tế, tiền tệ, chính trị, an ninh và xã hội — bảo đảm hoà bình, tự do và thịnh vượng chung cho người dân.' },
      { h: 'Đồng tiền chung' },
      { p: 'Đồng Euro ra đời năm 1999 (tiền giấy lưu hành 2002), là đồng tiền chung của khu vực đồng Euro (Eurozone) — không phải tất cả 27 nước đều dùng Euro.' },
      { h: 'Vị thế của EU' },
      { ul: ['Là một trung tâm kinh tế – tài chính hàng đầu thế giới (cùng Hoa Kỳ, Trung Quốc).', 'Là bạn hàng thương mại lớn của nhiều quốc gia, trong đó có Việt Nam.', 'Dẫn đầu thế giới về năng lượng tái tạo và bảo vệ môi trường.'] },
      { note: 'EU là mô hình liên kết khu vực thành công và sâu sắc nhất: hàng hoá, dịch vụ, vốn và con người được tự do lưu thông giữa các nước thành viên.' },
    ],
    examples: [
      { q: 'Vì sao nói EU là liên kết khu vực ở mức cao nhất hiện nay?', a: 'Phân tích: EU không chỉ là khu vực mậu dịch tự do mà còn có đồng tiền chung (Euro), ngân hàng trung ương chung, nghị viện chung, công dân được tự do đi lại, làm việc giữa các nước. Mức độ hội nhập này vượt xa các khối như ASEAN hay Mercosur.' },
      { q: 'Brexit ảnh hưởng gì tới EU?', a: 'Phân tích: Anh rời EU làm số thành viên giảm còn 27, EU mất một nền kinh tế lớn và trung tâm tài chính London. Đây cũng là lời nhắc rằng liên kết sâu vẫn phải dung hoà với lợi ích, chủ quyền của từng quốc gia thành viên.' },
    ],
  },

  'H11DIA-w10-quiz': {
    topic: 'Kinh tế của EU',
    intro: 'Chào các em! EU là một trong những nền kinh tế lớn nhất thế giới với thị trường chung độc đáo. Bài học giúp các em hiểu "bốn quyền tự do" và sức mạnh kinh tế của khối này.',
    objectives: [
      'Trình bày được đặc điểm thị trường chung EU.',
      'Nêu cơ cấu kinh tế và các chính sách trọng yếu.',
      'Phân tích khó khăn của kinh tế EU.',
    ],
    theory: [
      { h: 'Thị trường chung châu Âu' },
      { p: 'EU thiết lập thị trường chung với "bốn quyền tự do": tự do lưu thông hàng hoá, dịch vụ, vốn và lao động giữa các nước thành viên. Đây là nền tảng cho sức mạnh kinh tế của khối.' },
      { h: 'Cơ cấu kinh tế' },
      { ul: ['Dịch vụ và công nghiệp công nghệ cao chiếm tỉ trọng lớn.', 'EU là một trong những bạn hàng thương mại lớn nhất thế giới.', 'Nông nghiệp hiện đại, năng suất cao.'] },
      { h: 'Các chính sách trọng yếu' },
      { ul: ['Chính sách nông nghiệp chung (CAP) — bảo đảm an ninh lương thực và thu nhập cho nông dân.', 'Dẫn đầu thế giới về năng lượng tái tạo và bảo vệ môi trường.', 'Đẩy mạnh chuyển đổi xanh và chuyển đổi số.'] },
      { h: 'Khó khăn' },
      { note: 'EU đối mặt với già hoá dân số, chênh lệch phát triển giữa các thành viên (Tây – Đông, Bắc – Nam) và những tác động sau Brexit.' },
    ],
    examples: [
      { q: '"Bốn quyền tự do" mang lại lợi ích gì cho doanh nghiệp EU?', a: 'Phân tích: Một doanh nghiệp Đức có thể bán hàng, mở chi nhánh, huy động vốn và tuyển lao động ở bất kỳ nước EU nào như trong nước mình, không vướng thuế quan hay rào cản. Thị trường mở rộng tới hơn 440 triệu người tiêu dùng, giúp doanh nghiệp đạt quy mô lớn.' },
      { q: 'Vì sao già hoá dân số là thách thức với kinh tế EU?', a: 'Phân tích: Dân số già khiến lực lượng lao động giảm, gánh nặng lương hưu và y tế tăng, thiếu hụt lao động cho sản xuất. EU phải dựa vào nhập cư và tự động hoá để bù đắp, nhưng cả hai đều kéo theo các vấn đề xã hội phức tạp.' },
    ],
  },

  'H11DIA-w11-quiz': {
    topic: 'Thực hành — Công nghiệp của EU',
    intro: 'Chào các em! Airbus, Mercedes, các nhà máy hoá chất và điện tử — công nghiệp EU là biểu tượng của công nghệ cao. Tiết thực hành này giúp các em viết báo cáo về sức mạnh và định hướng công nghiệp của khối.',
    objectives: [
      'Liệt kê được các ngành công nghiệp mũi nhọn của EU.',
      'Nêu được lợi thế phát triển công nghiệp công nghệ cao.',
      'Phân tích thách thức và định hướng công nghiệp EU.',
    ],
    theory: [
      { h: 'Các ngành công nghiệp mũi nhọn' },
      { ul: ['Công nghiệp ô tô — mạnh ở Đức, Pháp, I-ta-li-a (Mercedes, BMW, Volkswagen, Renault, Fiat).', 'Hàng không vũ trụ — tập đoàn Airbus (liên doanh nhiều nước EU).', 'Hoá chất, dược phẩm và điện tử công nghệ cao.'] },
      { h: 'Lợi thế phát triển' },
      { ul: ['Nguồn nhân lực chất lượng cao, trình độ chuyên môn giỏi.', 'Vốn đầu tư lớn, thị trường rộng.', 'Khoa học – công nghệ tiên tiến, truyền thống công nghiệp lâu đời.'] },
      { h: 'Thách thức' },
      { ul: ['Cạnh tranh gay gắt từ các nền kinh tế châu Á.', 'Chi phí lao động và năng lượng cao.', 'Lao động già hoá.'] },
      { h: 'Định hướng' },
      { note: 'EU định hướng công nghiệp theo hai trục: chuyển đổi xanh (giảm phát thải, năng lượng sạch) và chuyển đổi số (tự động hoá, trí tuệ nhân tạo) để giữ vị thế cạnh tranh.' },
    ],
    examples: [
      { q: 'Vì sao Airbus là biểu tượng cho cách EU phát triển công nghiệp?', a: 'Phân tích: Airbus là liên doanh của nhiều nước EU (Pháp, Đức, Tây Ban Nha, Anh trước Brexit) — thân máy bay, cánh, động cơ sản xuất ở các nước khác nhau rồi lắp ráp chung. Nó thể hiện sức mạnh của hợp tác liên quốc gia, đủ sức cạnh tranh với Boeing của Mỹ.' },
      { q: 'Công nghiệp EU vì sao phải chuyển sang công nghệ cao thay vì hàng giá rẻ?', a: 'Phân tích: Chi phí lao động ở EU rất cao nên không thể cạnh tranh với hàng giá rẻ từ châu Á. EU chọn đi vào sản phẩm giá trị cao, hàm lượng công nghệ lớn (ô tô sang, máy bay, dược phẩm) — nơi chất xám và thương hiệu mới là lợi thế.' },
    ],
  },

  'H11DIA-w12-quiz': {
    topic: 'Đông Nam Á — Vị trí, tự nhiên và dân cư',
    intro: 'Chào các em! Đông Nam Á là ngôi nhà của chúng ta — khu vực cầu nối giữa các đại dương và châu lục, giàu tài nguyên và đa dạng văn hoá. Bài học giúp các em hiểu vị trí chiến lược và đặc điểm tự nhiên, dân cư của khu vực.',
    objectives: [
      'Xác định được vị trí và phạm vi của Đông Nam Á.',
      'Nêu đặc điểm tự nhiên và tài nguyên.',
      'Trình bày đặc điểm dân cư – xã hội.',
    ],
    theory: [
      { h: 'Phạm vi và vị trí' },
      { ul: ['Đông Nam Á gồm 11 quốc gia (kể cả Đông Ti-mo).', 'Chia thành hai bộ phận: Đông Nam Á lục địa (bán đảo Trung Ấn) và Đông Nam Á hải đảo (quần đảo Mã Lai).', 'Là cầu nối giữa châu Á và châu Đại Dương, giữa Thái Bình Dương và Ấn Độ Dương.'] },
      { h: 'Điều kiện tự nhiên' },
      { ul: ['Khí hậu nhiệt đới gió mùa (lục địa) và xích đạo (hải đảo) — nóng ẩm, mưa nhiều.', 'Tài nguyên đa dạng: khoáng sản (thiếc, dầu khí), rừng, biển, đất phù sa màu mỡ.', 'Nhiều sông lớn (Mê Công), biển rộng giàu hải sản.'] },
      { h: 'Dân cư – xã hội' },
      { ul: ['Dân số đông và trẻ — nguồn lao động dồi dào, thị trường lớn.', 'Đa dân tộc, đa tôn giáo, văn hoá phong phú.', 'Dân cư tập trung ở đồng bằng, ven biển và các đô thị lớn.'] },
      { note: 'Vị trí cầu nối khiến Đông Nam Á có vai trò chiến lược về giao thông hàng hải — eo biển Ma-lắc-ca là một trong những tuyến vận tải biển nhộn nhịp nhất thế giới.' },
    ],
    examples: [
      { q: 'Vì sao vị trí Đông Nam Á có ý nghĩa chiến lược?', a: 'Phân tích: Khu vực nằm trên tuyến hàng hải nối Thái Bình Dương và Ấn Độ Dương, qua eo biển Ma-lắc-ca — nơi vận chuyển phần lớn dầu mỏ và hàng hoá giữa Đông Á với Trung Đông, châu Âu. Ai kiểm soát tuyến này có ảnh hưởng kinh tế và an ninh lớn.' },
      { q: 'Khí hậu nhiệt đới gió mùa đem lại thuận lợi gì cho nông nghiệp ĐNA?', a: 'Phân tích: Nhiệt ẩm dồi dào quanh năm cho phép trồng cây nhiệt đới (lúa nước, cao su, cà phê, dầu cọ), thâm canh nhiều vụ. Tuy nhiên cũng tiềm ẩn thiên tai như bão, lũ, hạn hán cần phòng tránh.' },
    ],
  },

  'H11DIA-w13-quiz': {
    topic: 'Kinh tế Đông Nam Á',
    intro: 'Chào các em! Đông Nam Á đang là một trong những khu vực phát triển năng động nhất thế giới. Bài học giúp các em thấy nền kinh tế khu vực đang chuyển mình ra sao và đâu là động lực tăng trưởng.',
    objectives: [
      'Nêu được xu hướng chuyển dịch cơ cấu kinh tế ĐNA.',
      'Trình bày đặc điểm các ngành nông – công nghiệp – dịch vụ.',
      'Đánh giá triển vọng phát triển của khu vực.',
    ],
    theory: [
      { h: 'Chuyển dịch cơ cấu kinh tế' },
      { p: 'Các nước ĐNA đang đẩy mạnh công nghiệp hoá – hiện đại hoá: tăng tỉ trọng công nghiệp và dịch vụ, giảm dần tỉ trọng nông nghiệp trong GDP.' },
      { h: 'Nông nghiệp' },
      { ul: ['Lúa nước là cây lương thực chính.', 'Cây công nghiệp nhiệt đới: cao su, cà phê, dầu cọ, hồ tiêu.', 'Việt Nam và Thái Lan là những nước xuất khẩu gạo lớn của thế giới.'] },
      { h: 'Công nghiệp và dịch vụ' },
      { ul: ['Công nghiệp: lắp ráp điện tử, dệt may, chế biến thực phẩm — thu hút nhiều FDI.', 'Dịch vụ tăng nhanh: du lịch, tài chính – ngân hàng, vận tải biển.', 'Xin-ga-po là trung tâm tài chính và cảng biển hàng đầu.'] },
      { h: 'Triển vọng' },
      { note: 'Triển vọng kinh tế ĐNA gắn với hội nhập sâu rộng (qua ASEAN, các hiệp định thương mại) và chuyển đổi số. Khu vực được xem là điểm sáng tăng trưởng của thế giới.' },
    ],
    examples: [
      { q: 'Vì sao ĐNA thu hút nhiều đầu tư vào công nghiệp lắp ráp điện tử?', a: 'Phân tích: Khu vực có lao động trẻ, dồi dào, chi phí cạnh tranh, vị trí thuận lợi cho xuất nhập khẩu và chính sách mở cửa. Các tập đoàn lớn đặt nhà máy lắp ráp ở Việt Nam, Thái Lan, Ma-lai-xi-a để tận dụng các lợi thế này.' },
      { q: 'Việt Nam và Thái Lan có vai trò gì trên thị trường gạo thế giới?', a: 'Phân tích: Cả hai đều nằm trong nhóm nước xuất khẩu gạo lớn nhất thế giới, nhờ đồng bằng phù sa rộng (sông Cửu Long, sông Mê Nam), khí hậu nhiệt đới và truyền thống canh tác lúa nước lâu đời. Gạo là mặt hàng nông sản chủ lực của hai nước.' },
    ],
  },

  'H11DIA-w14-quiz': {
    topic: 'Thực hành — Kinh tế đối ngoại của ĐNA và ASEAN',
    intro: 'Chào các em! ASEAN là mái nhà chung gắn kết các nước Đông Nam Á. Tiết thực hành này giúp các em hiểu vai trò của ASEAN và hoạt động kinh tế đối ngoại của khu vực — nơi Việt Nam là thành viên tích cực.',
    objectives: [
      'Nêu được sự ra đời, mục tiêu và trụ cột của ASEAN.',
      'Trình bày các cơ chế hợp tác kinh tế của ASEAN.',
      'Xác định các đối tác lớn của khu vực.',
    ],
    theory: [
      { h: 'Sự ra đời và mục tiêu của ASEAN' },
      { ul: ['ASEAN (Hiệp hội các quốc gia Đông Nam Á) thành lập ngày 8/8/1967 tại Băng-cốc.', 'Mục tiêu: thúc đẩy hoà bình, ổn định, hợp tác và phát triển trong khu vực.', 'Việt Nam gia nhập ngày 28/7/1995.'] },
      { h: 'Ba trụ cột của Cộng đồng ASEAN' },
      { ul: ['Cộng đồng Chính trị – An ninh.', 'Cộng đồng Kinh tế (AEC).', 'Cộng đồng Văn hoá – Xã hội.'] },
      { h: 'Hợp tác kinh tế' },
      { p: 'Khu vực Mậu dịch Tự do ASEAN (AFTA, 1992) cắt giảm thuế quan nội khối; Cộng đồng Kinh tế ASEAN (AEC, 2015) hướng tới thị trường và cơ sở sản xuất thống nhất.' },
      { h: 'Đối tác lớn' },
      { note: 'ASEAN có quan hệ đối ngoại đa dạng với Trung Quốc, Hoa Kỳ, Nhật Bản, EU, Hàn Quốc, Ấn Độ; ký nhiều hiệp định, trong đó có Hiệp định Đối tác Kinh tế Toàn diện Khu vực (RCEP).' },
    ],
    examples: [
      { q: 'Vì sao AEC quan trọng với doanh nghiệp Việt Nam?', a: 'Phân tích: AEC tạo ra thị trường chung hơn 650 triệu dân, hàng hoá Việt Nam được hưởng thuế thấp khi vào các nước ASEAN, lao động và vốn lưu thông dễ hơn. Đây là cơ hội mở rộng thị trường nhưng cũng buộc doanh nghiệp phải nâng sức cạnh tranh.' },
      { q: 'Ba trụ cột của Cộng đồng ASEAN thể hiện điều gì?', a: 'Phân tích: ASEAN không chỉ hợp tác kinh tế mà còn về an ninh – chính trị và văn hoá – xã hội. Ba trụ cột cho thấy mục tiêu xây dựng một cộng đồng toàn diện, gắn kết, vì hoà bình và phát triển bền vững của khu vực.' },
    ],
  },

  'H11DIA-w15-quiz': {
    topic: 'Tây Nam Á — Vị trí, tự nhiên và dân cư',
    intro: 'Chào các em! Tây Nam Á là ngã ba của ba châu lục, cái nôi của nhiều nền văn minh và tôn giáo, đồng thời là kho dầu mỏ của thế giới. Bài học giúp các em hiểu vị trí, tự nhiên và những vấn đề phức tạp của khu vực này.',
    objectives: [
      'Xác định vị trí và tầm quan trọng chiến lược của Tây Nam Á.',
      'Nêu đặc điểm khí hậu và tài nguyên.',
      'Trình bày đặc điểm dân cư và vấn đề xã hội.',
    ],
    theory: [
      { h: 'Vị trí địa lí' },
      { p: 'Tây Nam Á tiếp giáp ba châu lục: châu Á, châu Phi và châu Âu, án ngữ tuyến hàng hải từ châu Á sang châu Âu qua kênh đào Xuy-ê và Biển Đỏ — vị trí chiến lược bậc nhất thế giới.' },
      { h: 'Điều kiện tự nhiên' },
      { ul: ['Khí hậu khô hạn, nhiệt đới sa mạc chiếm phần lớn diện tích.', 'Tài nguyên nổi bật: dầu mỏ và khí tự nhiên — chiếm khoảng một nửa trữ lượng dầu mỏ thế giới.', 'Thiếu nước ngọt nghiêm trọng.'] },
      { h: 'Dân cư – xã hội' },
      { ul: ['Phần lớn dân cư theo đạo Hồi (Islam) — khu vực có vai trò trung tâm của thế giới Hồi giáo.', 'Tỉ lệ đô thị hoá khá cao ở các nước vùng Vịnh.', 'Đây là nơi ra đời của nhiều tôn giáo lớn (Do Thái giáo, Cơ Đốc giáo, Hồi giáo).'] },
      { h: 'Vấn đề nổi cộm' },
      { note: 'Tây Nam Á là khu vực bất ổn: xung đột sắc tộc, tôn giáo, tranh chấp lãnh thổ và nguồn nước kéo dài, ảnh hưởng tới hoà bình và phát triển.' },
    ],
    examples: [
      { q: 'Vì sao vị trí Tây Nam Á vừa là lợi thế vừa là nguyên nhân bất ổn?', a: 'Phân tích: Nằm ở ngã ba ba châu lục, trên tuyến hàng hải và kho dầu lớn nhất, khu vực có giá trị kinh tế – chiến lược cao. Chính vì thế nó trở thành nơi tranh giành ảnh hưởng của các cường quốc, cộng với mâu thuẫn sắc tộc – tôn giáo nội tại, dẫn tới xung đột triền miên.' },
      { q: 'Khí hậu khô hạn ảnh hưởng thế nào tới đời sống Tây Nam Á?', a: 'Phân tích: Sa mạc rộng, thiếu nước ngọt khiến nông nghiệp hạn chế, dân cư tập trung quanh các ốc đảo và đô thị có nước. Tranh chấp nguồn nước trở thành một nguyên nhân căng thẳng, các nước giàu dầu phải khử mặn nước biển để có nước dùng.' },
    ],
  },

  'H11DIA-w16-quiz': {
    topic: 'Kinh tế Tây Nam Á',
    intro: 'Chào các em! "Vàng đen" — dầu mỏ — đã biến nhiều quốc gia sa mạc Tây Nam Á thành những nước giàu có. Nhưng phụ thuộc vào một thứ tài nguyên cũng tiềm ẩn rủi ro. Bài học giúp các em hiểu nền kinh tế dầu khí của khu vực.',
    objectives: [
      'Nêu được đặc trưng kinh tế dầu khí của Tây Nam Á.',
      'Trình bày vai trò của OPEC và các nước xuất khẩu dầu.',
      'Phân tích định hướng đa dạng hoá kinh tế.',
    ],
    theory: [
      { h: 'Đặc trưng kinh tế' },
      { p: 'Khai thác và xuất khẩu dầu mỏ, khí tự nhiên là ngành kinh tế chủ đạo, mang lại nguồn thu khổng lồ cho nhiều nước Tây Nam Á.' },
      { h: 'OPEC và các nước xuất khẩu dầu' },
      { ul: ['Nhiều nước tham gia Tổ chức các nước xuất khẩu dầu mỏ (OPEC), có ảnh hưởng tới giá dầu thế giới.', 'Các nước trữ lượng lớn: Ả-rập Xê-út, I-ran, I-rắc, UAE, Cô-oét — quanh vịnh Péc-xích.'] },
      { h: 'Hai mặt của nền kinh tế dầu' },
      { p: 'Dầu khí đem lại thu nhập lớn nhưng khiến kinh tế phụ thuộc vào giá dầu thế giới — dễ tổn thương khi giá biến động mạnh.' },
      { h: 'Định hướng đa dạng hoá' },
      { note: 'Các nước như UAE, Ả-rập Xê-út đang đa dạng hoá: phát triển du lịch, tài chính, công nghệ, năng lượng tái tạo (ví dụ "Tầm nhìn 2030" của Ả-rập Xê-út) để giảm phụ thuộc dầu mỏ và chuẩn bị cho thời kỳ "hậu dầu mỏ".' },
    ],
    examples: [
      { q: 'Vì sao các nước Tây Nam Á phải đa dạng hoá kinh tế dù đang giàu nhờ dầu?', a: 'Phân tích: Dầu mỏ là tài nguyên hữu hạn, sẽ cạn dần; giá dầu lại biến động mạnh và thế giới đang chuyển sang năng lượng sạch. Để bảo đảm thịnh vượng lâu dài, các nước đầu tư vào du lịch, tài chính, công nghệ — như Đu-bai (UAE) trở thành trung tâm thương mại, du lịch quốc tế.' },
      { q: 'OPEC ảnh hưởng tới kinh tế thế giới như thế nào?', a: 'Phân tích: OPEC nắm phần lớn trữ lượng dầu, có thể điều chỉnh sản lượng để tác động tới giá dầu toàn cầu. Khi OPEC giảm khai thác, giá dầu tăng, ảnh hưởng tới chi phí sản xuất, vận tải và lạm phát ở khắp các nước.' },
    ],
  },

  'H11DIA-w17-quiz': {
    topic: 'Thực hành — Vấn đề dầu khí của Tây Nam Á',
    intro: 'Chào các em! Tiết thực hành này giúp các em viết báo cáo chuyên sâu về dầu khí Tây Nam Á — từ trữ lượng, các tuyến vận chuyển chiến lược đến tác động kinh tế và trách nhiệm môi trường.',
    objectives: [
      'Phân tích vị thế dầu mỏ của Tây Nam Á trên thế giới.',
      'Nêu vai trò các tuyến hàng hải dầu khí trọng yếu.',
      'Đánh giá tác động và định hướng phát triển bền vững.',
    ],
    theory: [
      { h: 'Vị thế dầu mỏ' },
      { p: 'Tây Nam Á chiếm khoảng một nửa trữ lượng dầu mỏ của thế giới, là nguồn cung dầu lớn nhất cho thị trường toàn cầu, đặc biệt là khu vực vịnh Péc-xích.' },
      { h: 'Các tuyến vận chuyển chiến lược' },
      { ul: ['Eo biển Hooc-mu-zơ — cửa ngõ xuất khẩu dầu khí từ vịnh Péc-xích ra thế giới.', 'Kênh đào Xuy-ê (Suez, thuộc Ai Cập) — nối Tây Nam Á với châu Âu, rút ngắn hành trình hàng hải.'] },
      { h: 'Tác động kinh tế' },
      { ul: ['Thu nhập lớn từ xuất khẩu dầu khí.', 'Một số nước lập Quỹ đầu tư quốc gia (SWF) khổng lồ: UAE, Ả-rập Xê-út, Cô-oét.', 'Nhưng kinh tế dễ tổn thương khi giá dầu biến động.'] },
      { h: 'Phát triển bền vững' },
      { note: 'Các nước cần cân bằng giữa khai thác dầu khí với chuyển đổi năng lượng sạch, vừa tận dụng nguồn lợi hiện có vừa chuẩn bị cho tương lai ít carbon.' },
    ],
    examples: [
      { q: 'Vì sao eo biển Hooc-mu-zơ được coi là "yết hầu dầu mỏ" của thế giới?', a: 'Phân tích: Phần lớn dầu xuất khẩu từ các nước vùng Vịnh đi qua eo biển hẹp này để ra Ấn Độ Dương. Nếu Hooc-mu-zơ bị phong toả, nguồn cung dầu thế giới gián đoạn ngay lập tức, giá dầu tăng vọt — nên nó cực kỳ nhạy cảm về địa chính trị.' },
      { q: 'Quỹ đầu tư quốc gia (SWF) giúp ích gì cho các nước dầu mỏ?', a: 'Phân tích: SWF dùng tiền dư từ bán dầu để đầu tư vào bất động sản, cổ phiếu, doanh nghiệp khắp thế giới. Nhờ đó nước dầu mỏ tạo nguồn thu nhập mới ngoài dầu, để dành cho tương lai khi dầu cạn — một cách chuyển "của trời cho" thành tài sản lâu dài.' },
    ],
  },

  'H11DIA-w18-quiz': {
    topic: 'Ôn tập học kỳ I',
    intro: 'Chào các em! Tiết ôn tập này hệ thống lại toàn bộ kiến thức học kỳ I: từ các vấn đề kinh tế – xã hội thế giới đến địa lí các khu vực Mỹ La-tinh, EU, Đông Nam Á và Tây Nam Á.',
    objectives: [
      'Hệ thống hoá các vấn đề toàn cầu và liên kết khu vực.',
      'So sánh đặc điểm kinh tế các khu vực đã học.',
      'Vận dụng kiến thức để giải các câu hỏi tổng hợp.',
    ],
    theory: [
      { h: 'Phần 1 — Vấn đề kinh tế – xã hội thế giới' },
      { ul: ['Toàn cầu hoá: thương mại và đầu tư xuyên quốc gia tăng mạnh, WTO là tổ chức trung tâm.', 'Hai nhóm nước (phát triển – đang phát triển), khoảng cách đang được thu hẹp.', 'An ninh toàn cầu cần hợp tác đa phương.'] },
      { h: 'Phần 2 — Các khu vực' },
      { ul: ['Mỹ La-tinh: tài nguyên dồi dào nhưng kinh tế không đều, nhiều bất bình đẳng.', 'EU: liên minh sâu nhất, 27 thành viên sau Brexit, trung tâm kinh tế thế giới.', 'Đông Nam Á: cầu nối hai đại dương và hai châu lục, kinh tế năng động.', 'Tây Nam Á: kho dầu mỏ thế giới, nhưng nhiều xung đột.'] },
      { h: 'Sơ đồ ghi nhớ khu vực' },
      { note: 'Mẹo nhớ "đặc sản" khu vực: Mỹ La-tinh – tài nguyên + đô thị hoá; EU – liên kết sâu + công nghệ cao; ĐNA – cầu nối + lao động trẻ; Tây Nam Á – dầu mỏ + bất ổn.' },
      { h: 'Định hướng ôn thi' },
      { p: 'Chú ý các con số dễ ra đề: WTO 1995, EU 27 thành viên, ASEAN 1967, Việt Nam vào ASEAN 1995 và WTO 2007, Tây Nam Á chiếm nửa trữ lượng dầu thế giới.' },
    ],
    examples: [
      { q: 'So sánh nhanh vai trò kinh tế của EU và Tây Nam Á trong thế giới.', a: 'Phân tích: EU là trung tâm kinh tế – tài chính – công nghệ cao, xuất khẩu sản phẩm giá trị cao. Tây Nam Á là nhà cung cấp năng lượng (dầu khí) chủ chốt. Một bên mạnh về "chất xám", một bên mạnh về "tài nguyên" — bổ sung cho nhau trong nền kinh tế toàn cầu.' },
      { q: 'Vì sao châu Âu có nhiều tổ chức quốc tế nhất?', a: 'Phân tích: Châu Âu có trình độ phát triển cao, lịch sử liên kết lâu đời và nhu cầu hợp tác sau hai cuộc thế chiến. Nơi đây tập trung EU, OECD, nhiều cơ quan của Liên hợp quốc (Geneva, Vienna) — phản ánh vai trò trung tâm trong quan hệ quốc tế.' },
    ],
  },

  // ──────────────── HK2 ────────────────
  'H11DIA-w19-quiz': {
    topic: 'Hoa Kỳ — Vị trí, tự nhiên và dân cư',
    intro: 'Chào các em! Học kỳ II mở đầu với Hoa Kỳ — siêu cường số một thế giới. Bài học giúp các em hiểu vị trí, điều kiện tự nhiên và dân cư đã tạo nền tảng cho sức mạnh của quốc gia này.',
    objectives: [
      'Xác định vị trí và phạm vi lãnh thổ Hoa Kỳ.',
      'Nêu đặc điểm tự nhiên và tài nguyên.',
      'Trình bày đặc điểm dân cư – đô thị hoá.',
    ],
    theory: [
      { h: 'Vị trí và lãnh thổ' },
      { ul: ['Hoa Kỳ có diện tích khoảng 9,8 triệu km² — lớn thứ ba thế giới.', 'Phần lãnh thổ trung tâm tiếp giáp hai đại dương: Đại Tây Dương và Thái Bình Dương.', 'Gồm cả bang A-la-xca và quần đảo Ha-oai tách rời.'] },
      { h: 'Điều kiện tự nhiên' },
      { ul: ['Khí hậu phân hoá đa dạng: từ ôn đới đến nhiệt đới, có vùng hàn đới (A-la-xca) và sa mạc.', 'Đồng bằng trung tâm rộng lớn, đất nông nghiệp màu mỡ.', 'Tài nguyên phong phú: khoáng sản, năng lượng (than, dầu, khí), rừng.'] },
      { h: 'Dân cư và đô thị hoá' },
      { ul: ['Dân số đông, đa sắc tộc; nhập cư là nguồn bổ sung dân số quan trọng.', 'Tỉ lệ đô thị hoá rất cao (trên 80%).', 'Nguồn nhân lực chất lượng cao, thu hút nhân tài toàn cầu.'] },
      { note: 'Nhập cư là một bí quyết tạo nên sức mạnh Hoa Kỳ — dòng người giỏi từ khắp thế giới đổ về làm việc, nghiên cứu, khởi nghiệp, bổ sung lao động trẻ và chất xám.' },
    ],
    examples: [
      { q: 'Vì sao điều kiện tự nhiên giúp Hoa Kỳ trở thành cường quốc nông nghiệp?', a: 'Phân tích: Đồng bằng trung tâm rộng lớn, đất phù sa màu mỡ, khí hậu đa dạng cho phép trồng nhiều loại cây và chăn nuôi quy mô lớn. Cùng với cơ giới hoá cao, Hoa Kỳ dẫn đầu thế giới về ngô, đậu nành, thịt bò.' },
      { q: 'Nhập cư đóng vai trò gì với dân số và kinh tế Hoa Kỳ?', a: 'Phân tích: Nhập cư bổ sung lao động trẻ, giảm áp lực già hoá, và đặc biệt thu hút nhân tài (kỹ sư, nhà khoa học). Nhiều tập đoàn công nghệ lớn ở Thung lũng Silicon do người nhập cư sáng lập — minh chứng nhập cư là động lực đổi mới sáng tạo.' },
    ],
  },

  'H11DIA-w20-quiz': {
    topic: 'Kinh tế Hoa Kỳ',
    intro: 'Chào các em! Hoa Kỳ là nền kinh tế lớn nhất hành tinh, dẫn đầu về công nghệ, tài chính và đồng tiền dự trữ thế giới. Bài học giúp các em hiểu sức mạnh và cơ cấu kinh tế của siêu cường này.',
    objectives: [
      'Nêu được quy mô và vai trò kinh tế Hoa Kỳ.',
      'Trình bày cơ cấu các ngành kinh tế.',
      'Giải thích vai trò của đồng đô la Mỹ.',
    ],
    theory: [
      { h: 'Quy mô kinh tế' },
      { p: 'Hoa Kỳ là nền kinh tế hàng đầu thế giới về quy mô GDP danh nghĩa, là trung tâm tài chính, công nghệ và thị trường tiêu dùng lớn nhất toàn cầu.' },
      { h: 'Cơ cấu kinh tế' },
      { ul: ['Dịch vụ chiếm tỉ trọng rất cao (trên 75% GDP): tài chính, công nghệ thông tin, y tế, giáo dục.', 'Công nghiệp công nghệ cao: hàng không vũ trụ, dược phẩm, điện tử, phần mềm.', 'Nông nghiệp hàng đầu thế giới: ngô, đậu nành, thịt bò.'] },
      { h: 'Đồng đô la Mỹ' },
      { p: 'Đô la Mỹ (USD) là đồng tiền dự trữ chủ yếu của thế giới, được dùng rộng rãi trong thương mại và dự trữ quốc tế — mang lại cho Hoa Kỳ lợi thế tài chính đặc biệt.' },
      { h: 'Vai trò toàn cầu' },
      { note: 'Hoa Kỳ vừa là công xưởng công nghệ cao, vừa là thị trường tiêu dùng và trung tâm tài chính lớn nhất, nên mọi biến động kinh tế Mỹ đều tác động tới cả thế giới.' },
    ],
    examples: [
      { q: 'Vì sao đồng đô la Mỹ là tiền dự trữ của thế giới đem lại lợi thế cho Hoa Kỳ?', a: 'Phân tích: Khi USD được dùng làm tiền dự trữ và thanh toán quốc tế, các nước phải nắm giữ USD, Hoa Kỳ có thể vay vốn dễ và rẻ, in tiền ít gây áp lực hơn. Đây là "đặc quyền" tài chính giúp Mỹ tài trợ thâm hụt mà không khủng hoảng tiền tệ.' },
      { q: 'Dịch vụ chiếm trên 75% GDP phản ánh điều gì về kinh tế Hoa Kỳ?', a: 'Phân tích: Đó là dấu hiệu của nền kinh tế phát triển bậc cao, chuyển từ sản xuất vật chất sang các ngành giá trị cao như tài chính, công nghệ, phần mềm. Sản xuất giản đơn được chuyển ra nước ngoài, trong nước giữ lại khâu giá trị gia tăng lớn nhất.' },
    ],
  },

  'H11DIA-w21-quiz': {
    topic: 'Thực hành — Tìm hiểu kinh tế Hoa Kỳ',
    intro: 'Chào các em! Tiết thực hành này đưa các em đi qua những "địa chỉ" kinh tế nổi tiếng của Hoa Kỳ: Phố Wall, Thung lũng Silicon, thành phố ô tô Detroit — để hiểu sự phân bố và thế mạnh ngành.',
    objectives: [
      'Xác định các trung tâm kinh tế tiêu biểu của Hoa Kỳ.',
      'Nêu các sản phẩm và đối tác xuất khẩu chủ lực.',
      'Phân tích khó khăn của kinh tế Hoa Kỳ.',
    ],
    theory: [
      { h: 'Các trung tâm kinh tế tiêu biểu' },
      { ul: ['New York — trung tâm tài chính (Phố Wall, sàn chứng khoán NYSE).', 'Thung lũng Silicon (bang Ca-li-pho-ni-a) — trung tâm công nghệ thông tin.', 'Vùng Hồ Lớn (Detroit) — công nghiệp ô tô.'] },
      { h: 'Sản phẩm xuất khẩu chủ lực' },
      { ul: ['Máy bay, thiết bị hàng không vũ trụ.', 'Phần mềm, dịch vụ công nghệ.', 'Dược phẩm và nông sản.'] },
      { h: 'Đối tác thương mại lớn' },
      { p: 'Các đối tác thương mại hàng đầu của Hoa Kỳ gồm Trung Quốc, EU, Mê-hi-cô và Ca-na-đa (qua hiệp định USMCA).' },
      { h: 'Khó khăn' },
      { note: 'Kinh tế Hoa Kỳ đối mặt với chênh lệch giàu nghèo gia tăng, thâm hụt thương mại và cạnh tranh ngày càng mạnh từ Trung Quốc.' },
    ],
    examples: [
      { q: 'Vì sao Thung lũng Silicon trở thành biểu tượng công nghệ thế giới?', a: 'Phân tích: Nơi đây hội tụ các đại học hàng đầu (Stanford), nguồn vốn đầu tư mạo hiểm dồi dào, nhân tài toàn cầu và văn hoá khởi nghiệp. Hệ sinh thái đó sinh ra các tập đoàn công nghệ khổng lồ, dẫn dắt xu hướng công nghệ thế giới.' },
      { q: 'Thâm hụt thương mại là gì và vì sao là vấn đề với Hoa Kỳ?', a: 'Phân tích: Thâm hụt thương mại xảy ra khi Hoa Kỳ nhập khẩu nhiều hơn xuất khẩu, đặc biệt với Trung Quốc. Tiền chảy ra ngoài nhiều, gây lo ngại về việc làm trong nước và phụ thuộc hàng nhập, dẫn tới các căng thẳng và chính sách thuế quan thương mại.' },
    ],
  },

  'H11DIA-w22-quiz': {
    topic: 'Liên bang Nga — Vị trí, tự nhiên và dân cư',
    intro: 'Chào các em! Liên bang Nga là quốc gia rộng lớn nhất hành tinh, trải dài qua hai châu lục với kho tài nguyên khổng lồ. Bài học giúp các em hiểu vị trí, tự nhiên và đặc điểm dân cư của nước Nga.',
    objectives: [
      'Nêu được vị trí và phạm vi lãnh thổ Liên bang Nga.',
      'Trình bày đặc điểm tự nhiên và tài nguyên.',
      'Phân tích đặc điểm dân cư – xã hội.',
    ],
    theory: [
      { h: 'Vị trí và lãnh thổ' },
      { ul: ['Liên bang Nga có diện tích lớn nhất thế giới — khoảng 17 triệu km².', 'Lãnh thổ trải dài từ Đông Âu sang Bắc Á, qua 11 múi giờ.', 'Giáp nhiều biển và đại dương, có đường bờ biển dài.'] },
      { h: 'Điều kiện tự nhiên' },
      { ul: ['Khí hậu chủ yếu ôn đới và cận cực, có vùng hàn đới rất lạnh.', 'Rừng tai-ga (rừng lá kim) rộng lớn nhất thế giới.', 'Tài nguyên dồi dào: dầu khí, than, kim loại — đặc biệt vùng Tây Xi-bia giàu dầu khí nhất.'] },
      { h: 'Dân cư – xã hội' },
      { ul: ['Dân số đông nhưng đang già hoá, tỉ lệ tăng tự nhiên thấp.', 'Dân cư phân bố không đều, tập trung ở phần lãnh thổ châu Âu.', 'Trình độ học vấn và khoa học – kỹ thuật cao.'] },
      { note: 'Lãnh thổ rộng nhưng phần lớn phía Bắc và Đông Xi-bia rất lạnh, dân cư thưa thớt; vùng đồng bằng Đông Âu khí hậu ôn hoà hơn nên tập trung đông dân.' },
    ],
    examples: [
      { q: 'Vì sao dân cư Nga tập trung ở phần lãnh thổ châu Âu?', a: 'Phân tích: Phần châu Âu (đồng bằng Đông Âu) có khí hậu ôn hoà hơn, đất đai thuận lợi, hạ tầng và đô thị phát triển lâu đời (Mát-xcơ-va, Xanh Pê-téc-bua). Vùng Xi-bia tuy giàu tài nguyên nhưng quá lạnh nên dân cư thưa.' },
      { q: 'Tài nguyên dồi dào tạo lợi thế và rủi ro gì cho nước Nga?', a: 'Phân tích: Dầu khí, than, kim loại là nguồn thu lớn, giúp Nga thành cường quốc năng lượng. Nhưng phụ thuộc xuất khẩu tài nguyên khiến kinh tế dễ tổn thương khi giá năng lượng giảm hoặc bị cấm vận — một bài toán đa dạng hoá chưa giải xong.' },
    ],
  },

  'H11DIA-w23-quiz': {
    topic: 'Kinh tế Liên bang Nga',
    intro: 'Chào các em! Nga là cường quốc năng lượng và quốc phòng, đồng thời là đối tác chiến lược toàn diện của Việt Nam. Bài học giúp các em hiểu cơ cấu và thế mạnh của kinh tế Nga.',
    objectives: [
      'Nêu được các ngành kinh tế thế mạnh của Nga.',
      'Trình bày đặc điểm công – nông nghiệp và dịch vụ.',
      'Phân tích quan hệ kinh tế Nga – Việt Nam và khó khăn.',
    ],
    theory: [
      { h: 'Thế mạnh kinh tế' },
      { p: 'Liên bang Nga là cường quốc về năng lượng (dầu khí) và quốc phòng (công nghiệp vũ khí, hàng không – vũ trụ), với nền khoa học – kỹ thuật mạnh.' },
      { h: 'Công nghiệp và nông nghiệp' },
      { ul: ['Công nghiệp truyền thống: khai khoáng, luyện kim, cơ khí, hoá chất.', 'Nông nghiệp: sản xuất nhiều lúa mì, lúa mạch; chăn nuôi phát triển.', 'Dịch vụ đang phát triển nhưng chưa bằng các nước phát triển hàng đầu.'] },
      { h: 'Quan hệ Nga – Việt Nam' },
      { p: 'Nga và Việt Nam là đối tác chiến lược toàn diện, hợp tác sâu trong lĩnh vực năng lượng (dầu khí), quốc phòng và đào tạo.' },
      { h: 'Khó khăn' },
      { note: 'Kinh tế Nga phụ thuộc lớn vào xuất khẩu năng lượng và chịu tác động của các lệnh cấm vận quốc tế, khiến việc đa dạng hoá kinh tế trở nên cấp thiết.' },
    ],
    examples: [
      { q: 'Vì sao năng lượng là "vũ khí kinh tế" của Nga?', a: 'Phân tích: Nga cung cấp lượng lớn dầu và khí đốt cho nhiều nước, đặc biệt châu Âu từng phụ thuộc khí đốt Nga. Việc kiểm soát nguồn cung này tạo cho Nga đòn bẩy chính trị – kinh tế đáng kể trong quan hệ quốc tế.' },
      { q: 'Quan hệ đối tác chiến lược toàn diện Nga – Việt thể hiện ở đâu?', a: 'Phân tích: Hợp tác dầu khí (liên doanh Vietsovpetro), mua sắm và chuyển giao trang bị quốc phòng, đào tạo hàng nghìn chuyên gia, kỹ sư Việt Nam tại Nga. Đây là quan hệ truyền thống, sâu rộng trên nhiều lĩnh vực.' },
    ],
  },

  'H11DIA-w24-quiz': {
    topic: 'Nhật Bản — Vị trí, tự nhiên và dân cư',
    intro: 'Chào các em! Nhật Bản — "đất nước Mặt Trời mọc" — là quốc đảo nghèo tài nguyên nhưng vươn lên thành cường quốc nhờ con người. Bài học giúp các em hiểu điều kiện tự nhiên và dân cư đặc biệt của Nhật.',
    objectives: [
      'Xác định vị trí và đặc điểm địa hình Nhật Bản.',
      'Nêu những khó khăn về tự nhiên.',
      'Trình bày đặc điểm dân cư – xã hội.',
    ],
    theory: [
      { h: 'Vị trí và lãnh thổ' },
      { ul: ['Nhật Bản là quốc đảo ở Đông Á, phía Tây Thái Bình Dương.', 'Gồm 4 đảo lớn: Hôn-su (lớn nhất), Hốc-cai-đô, Kiu-xiu, Si-cô-cư và hàng nghìn đảo nhỏ.', 'Địa hình chủ yếu là núi, đồng bằng ven biển hẹp.'] },
      { h: 'Khó khăn về tự nhiên' },
      { ul: ['Nằm trên "Vành đai lửa Thái Bình Dương" — nhiều động đất, núi lửa, sóng thần.', 'Rất nghèo khoáng sản, phải nhập khẩu hầu hết nguyên – nhiên liệu.', 'Đồng bằng nhỏ hẹp, đất canh tác ít.'] },
      { h: 'Dân cư – xã hội' },
      { ul: ['Dân số đang già hoá nhanh, tỉ lệ sinh thấp.', 'Trình độ dân trí và kỷ luật lao động rất cao.', 'Tinh thần học hỏi, sáng tạo và ý chí vươn lên.'] },
      { note: 'Nghịch lí thú vị: Nhật Bản nghèo tài nguyên và thiên tai nhiều, nhưng chính hoàn cảnh khắc nghiệt đã rèn nên tinh thần kỷ luật, tiết kiệm và sáng tạo — nền tảng cho sự phát triển thần kỳ.' },
    ],
    examples: [
      { q: 'Vì sao Nhật Bản nghèo tài nguyên vẫn thành cường quốc kinh tế?', a: 'Phân tích: Nhật bù đắp tài nguyên bằng "tài nguyên con người" — lao động trình độ cao, kỷ luật, sáng tạo. Họ nhập nguyên liệu thô, dùng công nghệ chế tạo ra sản phẩm tinh xảo giá trị cao (ô tô, điện tử) rồi xuất khẩu, thu lợi lớn.' },
      { q: 'Già hoá dân số đặt ra thách thức gì cho Nhật Bản?', a: 'Phân tích: Lực lượng lao động giảm, thiếu nhân lực, gánh nặng chi phí y tế và lương hưu tăng, tiêu dùng nội địa chững lại. Nhật phải dựa vào robot, tự động hoá và xem xét thu hút lao động nước ngoài để bù đắp.' },
    ],
  },

  'H11DIA-w25-quiz': {
    topic: 'Kinh tế Nhật Bản',
    intro: 'Chào các em! Toyota, Sony, robot công nghiệp — Nhật Bản là biểu tượng của công nghệ và chất lượng. Bài học giúp các em hiểu cơ cấu và thế mạnh của nền kinh tế lớn của thế giới này.',
    objectives: [
      'Nêu được quy mô và vị thế kinh tế Nhật Bản.',
      'Trình bày các ngành công nghiệp – nông nghiệp – dịch vụ.',
      'Phân tích khó khăn của kinh tế Nhật.',
    ],
    theory: [
      { h: 'Quy mô kinh tế' },
      { p: 'Nhật Bản là một trong những nền kinh tế lớn của thế giới (nhiều năm đứng thứ ba theo GDP danh nghĩa), nổi tiếng với công nghệ cao và sản phẩm chất lượng.' },
      { h: 'Công nghiệp' },
      { ul: ['Mạnh về ô tô, điện tử, robot, đóng tàu.', 'Các tập đoàn lớn: Toyota, Honda, Sony, Panasonic.', 'Đầu tư mạnh cho nghiên cứu – phát triển (R&D).'] },
      { h: 'Nông nghiệp và dịch vụ' },
      { ul: ['Nông nghiệp thâm canh, năng suất cao nhưng quy mô nhỏ do đất hẹp.', 'Dịch vụ phát triển cao: tài chính, thương mại, du lịch.'] },
      { h: 'Khó khăn' },
      { note: 'Tăng trưởng chậm lại, già hoá dân số và thiếu hụt lao động là những thách thức lớn của kinh tế Nhật Bản hiện nay.' },
    ],
    examples: [
      { q: 'Vì sao Nhật Bản đầu tư mạnh vào robot và tự động hoá?', a: 'Phân tích: Dân số già, thiếu lao động buộc Nhật phải thay thế sức người bằng robot trong sản xuất và cả dịch vụ. Đây vừa là giải pháp cho thiếu nhân lực, vừa biến Nhật thành cường quốc về công nghệ robot, xuất khẩu robot công nghiệp ra thế giới.' },
      { q: 'Nông nghiệp Nhật Bản quy mô nhỏ nhưng vì sao năng suất cao?', a: 'Phân tích: Đất canh tác ít nên Nhật thâm canh: áp dụng giống tốt, kỹ thuật hiện đại, cơ giới hoá phù hợp ruộng nhỏ và đầu tư cao trên mỗi đơn vị diện tích. Sản phẩm nông nghiệp Nhật nổi tiếng chất lượng và an toàn dù sản lượng tổng không lớn.' },
    ],
  },

  'H11DIA-w26-quiz': {
    topic: 'Thực hành — Ngoại thương của Nhật Bản',
    intro: 'Chào các em! Nhật Bản sống nhờ thương mại quốc tế: nhập nguyên liệu, xuất sản phẩm công nghệ cao. Tiết thực hành này giúp các em viết báo cáo về hoạt động ngoại thương đặc trưng của Nhật.',
    objectives: [
      'Nêu được đặc điểm ngoại thương của Nhật Bản.',
      'Xác định các đối tác và cảng biển lớn.',
      'Trình bày quan hệ Nhật Bản – Việt Nam.',
    ],
    theory: [
      { h: 'Đặc điểm ngoại thương' },
      { p: 'Nhật Bản xuất siêu các mặt hàng công nghệ cao (ô tô, điện tử, máy móc) và nhập khẩu nguyên liệu, nhiên liệu, năng lượng — mô hình "nhập thô, xuất tinh".' },
      { h: 'Đối tác và cảng biển' },
      { ul: ['Đối tác thương mại lớn: Trung Quốc, Hoa Kỳ, EU, ASEAN.', 'Các cảng biển lớn: Yô-kô-ha-ma, Cô-bê, Tô-ki-ô, Na-gôi-a.'] },
      { h: 'Quan hệ Nhật Bản – Việt Nam' },
      { ul: ['Hai nước là đối tác chiến lược toàn diện.', 'Nhật là nhà cung cấp vốn ODA lớn, hỗ trợ phát triển hạ tầng và đào tạo nhân lực cho Việt Nam.', 'Đầu tư FDI của Nhật vào Việt Nam đứng hàng đầu.'] },
      { h: 'Triển vọng' },
      { note: 'Nhật Bản hướng tới đổi mới sáng tạo, công nghệ xanh và số hoá để duy trì sức cạnh tranh trong bối cảnh dân số già và cạnh tranh từ các nước châu Á khác.' },
    ],
    examples: [
      { q: 'Vì sao mô hình "nhập thô, xuất tinh" phù hợp với Nhật Bản?', a: 'Phân tích: Nhật nghèo tài nguyên nên phải nhập nguyên liệu, nhiên liệu. Bù lại, nhờ công nghệ và lao động giỏi, Nhật chế biến thành sản phẩm tinh xảo giá trị cao để xuất khẩu. Chênh lệch giá trị giữa hàng nhập và hàng xuất chính là lợi nhuận, tạo nên sự thịnh vượng.' },
      { q: 'ODA của Nhật Bản giúp gì cho Việt Nam?', a: 'Phân tích: Vốn ODA Nhật tài trợ nhiều công trình hạ tầng quan trọng (cầu, đường, cảng, nhà máy điện) và các chương trình đào tạo nhân lực. Đây là nguồn lực quý cho phát triển, đồng thời thắt chặt quan hệ đối tác chiến lược toàn diện hai nước.' },
    ],
  },

  'H11DIA-w27-quiz': {
    topic: 'Trung Quốc — Vị trí, tự nhiên và dân cư',
    intro: 'Chào các em! Trung Quốc là nước láng giềng khổng lồ — đông dân và rộng lớn bậc nhất thế giới. Bài học giúp các em hiểu vị trí, sự phân hoá địa hình Đông – Tây và đặc điểm dân cư của quốc gia này.',
    objectives: [
      'Nêu được vị trí và phạm vi lãnh thổ Trung Quốc.',
      'Phân biệt địa hình miền Đông và miền Tây.',
      'Trình bày đặc điểm dân cư – dân tộc.',
    ],
    theory: [
      { h: 'Vị trí và lãnh thổ' },
      { ul: ['Trung Quốc có diện tích khoảng 9,6 triệu km² — lớn thứ tư thế giới.', 'Tiếp giáp 14 quốc gia trên đất liền (nhiều nhất thế giới).', 'Phía Đông giáp biển, thuận lợi giao thương.'] },
      { h: 'Phân hoá địa hình Đông – Tây' },
      { ul: ['Miền Tây: núi và cao nguyên đồ sộ (dãy Hi-ma-lay-a, cao nguyên Tây Tạng), khí hậu khắc nghiệt, dân thưa.', 'Miền Đông: đồng bằng châu thổ rộng (Hoa Bắc, Hoa Trung, Hoa Nam), đất màu mỡ, dân cư đông đúc.'] },
      { h: 'Dân cư – dân tộc' },
      { ul: ['Dân số khoảng 1,4 tỉ — đông nhất hoặc nhì thế giới, nhưng đang già hoá.', 'Có 56 dân tộc, người Hán chiếm khoảng 91%.', 'Dân cư tập trung chủ yếu ở miền Đông.'] },
      { note: 'Sự tương phản Đông – Tây là chìa khoá hiểu Trung Quốc: miền Đông trù phú, đông dân, phát triển; miền Tây rộng lớn, hoang vắng, đang được đầu tư khai phá.' },
    ],
    examples: [
      { q: 'Vì sao dân cư và kinh tế Trung Quốc tập trung ở miền Đông?', a: 'Phân tích: Miền Đông có đồng bằng châu thổ rộng, đất phù sa màu mỡ, khí hậu thuận lợi, giáp biển dễ giao thương. Trong khi miền Tây toàn núi cao, cao nguyên lạnh giá, khô hạn — không thuận cho sản xuất và sinh sống, nên dân thưa.' },
      { q: 'Tiếp giáp 14 nước đem lại lợi thế và thách thức gì cho Trung Quốc?', a: 'Phân tích: Lợi thế là mở rộng giao thương đường bộ với nhiều nước, tăng ảnh hưởng khu vực. Thách thức là phải quản lí đường biên giới dài, dễ phát sinh tranh chấp lãnh thổ và vấn đề an ninh với các nước láng giềng.' },
    ],
  },

  'H11DIA-w28-quiz': {
    topic: 'Kinh tế Trung Quốc',
    intro: 'Chào các em! Từ một nước nghèo, Trung Quốc đã vươn lên thành "công xưởng thế giới" và nền kinh tế lớn thứ hai toàn cầu. Bài học giúp các em hiểu hành trình cải cách và sức mạnh kinh tế của nước này.',
    objectives: [
      'Nêu được quy mô và vị thế kinh tế Trung Quốc.',
      'Trình bày công cuộc cải cách mở cửa.',
      'Phân tích cơ cấu kinh tế và vấn đề tồn tại.',
    ],
    theory: [
      { h: 'Quy mô kinh tế' },
      { p: 'Trung Quốc hiện là nền kinh tế lớn thứ hai thế giới theo GDP danh nghĩa, sau Hoa Kỳ, và là "công xưởng của thế giới".' },
      { h: 'Cải cách mở cửa' },
      { ul: ['Bắt đầu từ cuối năm 1978, dưới sự lãnh đạo của Đặng Tiểu Bình.', 'Thâm Quyến là đặc khu kinh tế đầu tiên, mở cửa thu hút đầu tư nước ngoài.', 'Chuyển từ kinh tế kế hoạch sang kinh tế thị trường định hướng xã hội chủ nghĩa.'] },
      { h: 'Cơ cấu kinh tế' },
      { ul: ['Dịch vụ và công nghiệp đều chiếm tỉ trọng lớn, nông nghiệp đang giảm.', '"Công xưởng thế giới" về điện tử, dệt may, lắp ráp.', 'Đang vươn lên các ngành công nghệ cao.'] },
      { h: 'Vấn đề tồn tại' },
      { note: 'Trung Quốc đối mặt với chênh lệch giàu nghèo (Đông – Tây, thành thị – nông thôn), ô nhiễm môi trường nghiêm trọng và dân số bắt đầu già hoá.' },
    ],
    examples: [
      { q: 'Vì sao Trung Quốc được gọi là "công xưởng của thế giới"?', a: 'Phân tích: Trung Quốc sản xuất khối lượng khổng lồ hàng điện tử, dệt may, đồ gia dụng cho toàn cầu nhờ lao động dồi dào, chi phí cạnh tranh, hạ tầng hoàn chỉnh và quy mô lớn. Rất nhiều sản phẩm tiêu dùng trên thế giới mang nhãn "Made in China".' },
      { q: 'Cải cách mở cửa 1978 có ý nghĩa gì với Trung Quốc?', a: 'Phân tích: Đó là bước ngoặt chuyển từ kinh tế kế hoạch khép kín sang kinh tế thị trường, mở cửa thu hút vốn và công nghệ nước ngoài (bắt đầu từ các đặc khu như Thâm Quyến). Nhờ đó kinh tế Trung Quốc tăng trưởng thần tốc suốt mấy thập kỷ, đưa hàng trăm triệu người thoát nghèo.' },
    ],
  },

  'H11DIA-w29-quiz': {
    topic: 'Thực hành — Sáng kiến Vành đai và Con đường',
    intro: 'Chào các em! "Vành đai và Con đường" (BRI) là sáng kiến đầy tham vọng của Trung Quốc nhằm kết nối thế giới qua hạ tầng. Tiết thực hành này giúp các em phân tích hai mặt của sáng kiến này.',
    objectives: [
      'Nêu được nội dung và mục tiêu của BRI.',
      'Phân tích cơ hội và lo ngại từ BRI.',
      'Liên hệ quan hệ Việt Nam – Trung Quốc.',
    ],
    theory: [
      { h: 'Sáng kiến BRI' },
      { p: 'Sáng kiến "Vành đai và Con đường" (BRI) do Trung Quốc đề xướng năm 2013, dưới thời Chủ tịch Tập Cận Bình, nhằm tăng cường kết nối hạ tầng, thương mại và đầu tư xuyên lục địa.' },
      { h: 'Hai trục chính' },
      { ul: ['"Vành đai kinh tế Con đường tơ lụa" — tuyến trên bộ nối Trung Quốc với Trung Á, châu Âu.', '"Con đường tơ lụa trên biển thế kỷ 21" — tuyến trên biển nối Trung Quốc với ĐNA, Nam Á, châu Phi, châu Âu.'] },
      { h: 'Hai mặt của BRI' },
      { ul: ['Cơ hội: đầu tư hạ tầng (cảng, đường, đường sắt) cho các nước đang phát triển, thúc đẩy thương mại.', 'Lo ngại: nguy cơ "bẫy nợ" và gia tăng ảnh hưởng chính trị của Trung Quốc.'] },
      { h: 'Quan hệ Việt – Trung' },
      { note: 'Việt Nam và Trung Quốc là đối tác hợp tác chiến lược toàn diện. Với BRI, Việt Nam vừa nhìn nhận cơ hội đầu tư hạ tầng vừa thận trọng về bền vững tài chính và độc lập tự chủ.' },
    ],
    examples: [
      { q: '"Bẫy nợ" trong BRI nghĩa là gì?', a: 'Phân tích: Một số nước vay vốn lớn từ Trung Quốc làm hạ tầng, nhưng dự án kém hiệu quả, không trả được nợ, buộc phải nhượng quyền khai thác công trình (như cảng) cho Trung Quốc. Đó là lo ngại về việc nợ nần biến thành công cụ gây ảnh hưởng — gọi là "bẫy nợ".' },
      { q: 'Vì sao Việt Nam cần thận trọng nhưng vẫn xem BRI là cơ hội?', a: 'Phân tích: BRI mang vốn và công nghệ làm hạ tầng — điều Việt Nam cần. Nhưng phải chọn dự án hiệu quả, minh bạch, tránh phụ thuộc tài chính và giữ độc lập tự chủ. Cách tiếp cận "cân bằng, thực chất" giúp tận dụng lợi ích mà hạn chế rủi ro.' },
    ],
  },

  'H11DIA-w30-quiz': {
    topic: 'Australia (Ô-xtrây-li-a)',
    intro: 'Chào các em! Australia là quốc gia – lục địa độc đáo ở Nam bán cầu: rộng lớn, khô hạn nhưng giàu khoáng sản và nông sản. Bài học giúp các em hiểu tự nhiên, kinh tế và dân cư của đất nước này.',
    objectives: [
      'Xác định vị trí và đặc điểm tự nhiên của Australia.',
      'Nêu các thế mạnh kinh tế nổi bật.',
      'Trình bày đặc điểm phân bố dân cư.',
    ],
    theory: [
      { h: 'Vị trí và tự nhiên' },
      { ul: ['Australia nằm ở châu Đại Dương, thuộc Nam bán cầu.', 'Diện tích khoảng 7,7 triệu km² — lớn thứ sáu thế giới.', 'Khí hậu nhiệt đới và cận nhiệt khô; vùng trung tâm là hoang mạc rộng lớn.'] },
      { h: 'Tài nguyên và kinh tế' },
      { ul: ['Tài nguyên nổi bật: quặng sắt, than, dầu khí, đồng cỏ chăn nuôi.', 'Là cường quốc xuất khẩu khoáng sản, nông sản (len, thịt cừu, lúa mì) và dịch vụ giáo dục.', 'Kinh tế phát triển cao, mức sống cao.'] },
      { h: 'Phân bố dân cư' },
      { ul: ['Dân cư tập trung ở dải ven biển phía Đông và Đông Nam.', 'Các thành phố lớn: Xít-ni, Men-bơn, Bri-xbên.', 'Vùng trung tâm hoang mạc hầu như không có người ở.'] },
      { note: 'Australia là minh chứng cho nước giàu nhờ kết hợp khôn ngoan tài nguyên (khoáng sản, đồng cỏ) với trình độ phát triển cao và dịch vụ giáo dục thu hút sinh viên quốc tế.' },
    ],
    examples: [
      { q: 'Vì sao dân cư Australia chỉ tập trung ven biển phía Đông – Đông Nam?', a: 'Phân tích: Vùng ven biển Đông – Đông Nam có khí hậu ôn hoà, mưa đủ, đất tốt và giáp biển thuận lợi giao thương. Trong khi vùng trung tâm là hoang mạc khô cằn, thiếu nước, không thể sinh sống và sản xuất, nên gần như không có dân.' },
      { q: 'Dịch vụ giáo dục đem lại lợi ích kinh tế gì cho Australia?', a: 'Phân tích: Australia thu hút đông đảo sinh viên quốc tế (gồm cả Việt Nam) tới học. Học phí và chi tiêu của du học sinh tạo nguồn thu lớn, trở thành một trong những ngành xuất khẩu dịch vụ hàng đầu, bên cạnh khoáng sản và nông sản.' },
    ],
  },

  'H11DIA-w31-quiz': {
    topic: 'Cộng hoà Nam Phi — Tự nhiên và dân cư',
    intro: 'Chào các em! Cộng hoà Nam Phi nằm ở cực Nam châu Phi, nổi tiếng với vàng, kim cương và một lịch sử đặc biệt — chế độ phân biệt chủng tộc A-pa-thai đã bị xoá bỏ. Bài học giúp các em hiểu tự nhiên và dân cư của nước này.',
    objectives: [
      'Xác định vị trí và đặc điểm tự nhiên của Nam Phi.',
      'Nêu các tài nguyên nổi bật.',
      'Trình bày đặc điểm dân cư và lịch sử A-pa-thai.',
    ],
    theory: [
      { h: 'Vị trí và tự nhiên' },
      { ul: ['Cộng hoà Nam Phi nằm ở cực Nam châu Phi, giáp hai đại dương.', 'Khí hậu cận nhiệt khô và bán hoang mạc, có vùng khí hậu địa trung hải ở mũi cực Nam.'] },
      { h: 'Tài nguyên nổi bật' },
      { p: 'Nam Phi giàu khoáng sản quý: vàng, kim cương, bạch kim, than — là cường quốc khai thác kim loại quý của thế giới.' },
      { h: 'Dân cư và lịch sử A-pa-thai' },
      { ul: ['Dân cư đa sắc tộc: người da đen bản địa, người gốc Âu, người gốc Á và người lai.', 'Từng trải qua chế độ A-pa-thai (phân biệt chủng tộc) — bị xoá bỏ vào đầu thập niên 1990.', 'Nen-xơn Man-đê-la trở thành Tổng thống da đen đầu tiên (1994).'] },
      { note: 'Việc xoá bỏ A-pa-thai và bầu Nen-xơn Man-đê-la là biểu tượng cho thắng lợi của hoà giải dân tộc và bình đẳng, được cả thế giới ngưỡng mộ.' },
    ],
    examples: [
      { q: 'Chế độ A-pa-thai là gì và vì sao việc xoá bỏ nó có ý nghĩa lớn?', a: 'Phân tích: A-pa-thai là chế độ phân biệt chủng tộc, người da đen (chiếm đa số) bị tước nhiều quyền lợi. Xoá bỏ nó năm đầu thập niên 1990 và bầu Man-đê-la làm Tổng thống đánh dấu sự chấm dứt bất công, mở ra một Nam Phi đa sắc tộc bình đẳng.' },
      { q: 'Vì sao Nam Phi được xem là cường quốc khoáng sản?', a: 'Phân tích: Nam Phi có trữ lượng và sản lượng vàng, kim cương, bạch kim hàng đầu thế giới. Khai khoáng là ngành kinh tế trụ cột lâu đời, đưa Nam Phi thành nền kinh tế phát triển bậc nhất châu Phi.' },
    ],
  },

  'H11DIA-w32-quiz': {
    topic: 'Kinh tế Cộng hoà Nam Phi',
    intro: 'Chào các em! Nam Phi là đầu tàu kinh tế của châu Phi và là thành viên nhóm BRICS. Bài học giúp các em hiểu cơ cấu, thế mạnh và thách thức của nền kinh tế này.',
    objectives: [
      'Nêu được vị thế kinh tế của Nam Phi ở châu Phi.',
      'Trình bày các ngành kinh tế quan trọng.',
      'Phân tích thách thức và quan hệ với Việt Nam.',
    ],
    theory: [
      { h: 'Vị thế kinh tế' },
      { p: 'Cộng hoà Nam Phi là một trong những nền kinh tế phát triển nhất châu Phi — đầu tàu của lục địa — và là thành viên nhóm BRICS (từ năm 2010).' },
      { h: 'Các ngành quan trọng' },
      { ul: ['Khai khoáng: vàng, kim cương, bạch kim, than.', 'Công nghiệp chế biến và chế tạo.', 'Dịch vụ: tài chính, du lịch.'] },
      { h: 'Thách thức' },
      { ul: ['Tỉ lệ thất nghiệp cao.', 'Bất bình đẳng thu nhập sâu sắc (di sản của A-pa-thai).', 'Thiếu điện và hạ tầng còn hạn chế.'] },
      { h: 'Định hướng và quan hệ với Việt Nam' },
      { note: 'Nam Phi đang đa dạng hoá kinh tế, đầu tư công nghệ và năng lượng tái tạo. Quan hệ kinh tế Việt Nam – Nam Phi đang được tăng cường về thương mại và giáo dục.' },
    ],
    examples: [
      { q: 'BRICS là gì và vì sao Nam Phi tham gia có ý nghĩa?', a: 'Phân tích: BRICS là nhóm các nền kinh tế mới nổi lớn (Bra-xin, Nga, Ấn Độ, Trung Quốc, Nam Phi). Nam Phi gia nhập năm 2010 với tư cách đại diện châu Phi, giúp nâng cao vị thế lục địa này trên bàn cờ kinh tế thế giới và mở rộng hợp tác.' },
      { q: 'Vì sao bất bình đẳng và thất nghiệp là thách thức dai dẳng của Nam Phi?', a: 'Phân tích: Đây là di sản của nhiều thập kỷ A-pa-thai — người da đen từng bị hạn chế giáo dục, việc làm, tài sản. Dù chế độ đã chấm dứt, khoảng cách giàu nghèo và thất nghiệp cao vẫn cần thời gian dài và chính sách quyết liệt mới khắc phục được.' },
    ],
  },

  'H11DIA-w33-quiz': {
    topic: 'Tổng ôn — Địa lí khu vực và quốc gia',
    intro: 'Chào các em! Tiết tổng ôn này hệ thống lại các quốc gia và khu vực đã học ở Phần 2: Hoa Kỳ, Nga, Nhật Bản, Trung Quốc, Australia, Nam Phi — mỗi nước một thế mạnh đặc trưng.',
    objectives: [
      'So sánh vị thế và thế mạnh kinh tế các quốc gia đã học.',
      'Hệ thống "đặc sản" kinh tế của từng nước.',
      'Vận dụng để giải các câu hỏi tổng hợp.',
    ],
    theory: [
      { h: 'Các cường quốc kinh tế' },
      { ul: ['Hoa Kỳ — nền kinh tế lớn nhất, trung tâm tài chính – công nghệ, USD là tiền dự trữ thế giới.', 'Trung Quốc — lớn thứ hai, "công xưởng thế giới".', 'Nhật Bản — nghèo tài nguyên nhưng công nghệ cao (ô tô, điện tử, robot).'] },
      { h: 'Cường quốc tài nguyên' },
      { ul: ['Liên bang Nga — cường quốc năng lượng và quốc phòng.', 'Australia — xuất khẩu khoáng sản, nông sản (len, thịt cừu) và dịch vụ giáo dục.', 'Nam Phi — khai khoáng quy mô lớn, đầu tàu kinh tế châu Phi.'] },
      { h: 'Sơ đồ ghi nhớ' },
      { note: 'Mẹo nhớ: Hoa Kỳ – tài chính + công nghệ; Trung Quốc – công xưởng; Nhật – công nghệ cao; Nga – năng lượng; Australia – khoáng sản + giáo dục; Nam Phi – kim loại quý.' },
      { h: 'Định hướng ôn tập' },
      { p: 'Chú ý các con số: Hoa Kỳ lớn thứ 3 thế giới về diện tích, Nga lớn nhất, Trung Quốc thứ 4; kinh tế Hoa Kỳ số 1, Trung Quốc số 2, Nhật Bản top 3 (theo GDP danh nghĩa).' },
    ],
    examples: [
      { q: 'So sánh nguồn lực phát triển của Nhật Bản và Australia.', a: 'Phân tích: Nhật nghèo tài nguyên, phát triển nhờ con người và công nghệ ("nhập thô, xuất tinh"). Australia giàu khoáng sản, nông sản, phát triển nhờ xuất khẩu tài nguyên cộng với dịch vụ. Hai con đường khác nhau cùng dẫn tới sự thịnh vượng.' },
      { q: 'Vì sao có thể xếp Hoa Kỳ và Trung Quốc vào nhóm "hai đầu tàu" kinh tế thế giới?', a: 'Phân tích: Hai nước có GDP lớn nhất và nhì thế giới, ảnh hưởng tới thương mại, công nghệ, tài chính toàn cầu. Quan hệ hợp tác và cạnh tranh Mỹ – Trung định hình phần lớn xu hướng kinh tế thế giới hiện nay.' },
    ],
  },

  'H11DIA-w34-quiz': {
    topic: 'Tổng ôn — Vấn đề toàn cầu và liên kết khu vực',
    intro: 'Chào các em! Tiết tổng ôn này quay lại Phần 1 và các tổ chức liên kết: toàn cầu hoá, an ninh toàn cầu, EU, ASEAN — đồng thời liên hệ với đường lối đối ngoại của Việt Nam.',
    objectives: [
      'Hệ thống các vấn đề toàn cầu và liên kết khu vực.',
      'So sánh vai trò các tổ chức quốc tế lớn.',
      'Liên hệ chính sách đối ngoại của Việt Nam.',
    ],
    theory: [
      { h: 'Toàn cầu hoá và cơ hội cho Việt Nam' },
      { p: 'Toàn cầu hoá mở rộng thị trường, thu hút vốn và công nghệ cho Việt Nam. Để tận dụng, cần nâng cao nhân lực, đổi mới công nghệ và hoàn thiện thể chế.' },
      { h: 'Các tổ chức liên kết tiêu biểu' },
      { ul: ['EU — liên minh kinh tế sâu sắc nhất hiện nay (27 thành viên).', 'ASEAN — tăng cường hợp tác, hội nhập khu vực Đông Nam Á.', 'WTO, Liên hợp quốc — điều phối thương mại và hoà bình toàn cầu.'] },
      { h: 'An ninh phi truyền thống' },
      { ul: ['Biến đổi khí hậu.', 'An ninh mạng.', 'Dịch bệnh, an ninh lương thực – năng lượng – nguồn nước.'] },
      { h: 'Đối ngoại của Việt Nam' },
      { note: 'Việt Nam thực hiện đường lối đối ngoại đa phương hoá, đa dạng hoá, chủ động hội nhập sâu rộng, là bạn và đối tác tin cậy của cộng đồng quốc tế.' },
    ],
    examples: [
      { q: 'Vì sao biến đổi khí hậu cần được giải quyết bằng hợp tác quốc tế?', a: 'Phân tích: Khí thải của một nước ảnh hưởng tới toàn cầu, không nước nào tự ngăn được nóng lên. Phải hợp tác giảm phát thải, chuyển sang năng lượng tái tạo, hỗ trợ nước nghèo thích ứng — như cam kết trong Hiệp định Paris 2015.' },
      { q: 'Đường lối "đa phương hoá, đa dạng hoá" của Việt Nam có lợi ích gì?', a: 'Phân tích: Quan hệ với nhiều đối tác giúp Việt Nam mở rộng thị trường, thu hút đầu tư từ nhiều nguồn, không phụ thuộc một nước nào, đồng thời nâng cao vị thế và bảo đảm môi trường hoà bình để phát triển.' },
    ],
  },

  'H11DIA-w35-quiz': {
    topic: 'Thi học kỳ II — Tổng ôn cả năm Địa lí 11',
    intro: 'Chào các em! Đây là tiết tổng ôn cuối cùng, hệ thống toàn bộ chương trình Địa lí 11 — từ các vấn đề kinh tế – xã hội thế giới đến địa lí các khu vực và quốc gia. Cùng ôn lại các kiến thức trọng tâm nhé!',
    objectives: [
      'Hệ thống toàn bộ kiến thức cả năm Địa lí 11.',
      'Ghi nhớ các con số và mốc thời gian quan trọng.',
      'Vận dụng để làm bài thi tổng hợp.',
    ],
    theory: [
      { h: 'Phần 1 — Kinh tế – xã hội thế giới' },
      { ul: ['Hai nhóm nước: phát triển (HDI cao, GNI/người cao, dịch vụ chiếm tỉ trọng lớn) và đang phát triển.', 'Toàn cầu hoá – khu vực hoá; an ninh toàn cầu; kinh tế tri thức.', 'Các tổ chức: WTO (1995), Liên hợp quốc (1945), IMF, WB.'] },
      { h: 'Phần 2 — Khu vực' },
      { ul: ['Mỹ La-tinh — tài nguyên dồi dào, bất bình đẳng.', 'EU — liên minh sâu nhất, 27 thành viên (Hiệp ước Ma-xtrích hiệu lực 1993).', 'Đông Nam Á – ASEAN (1967, VN gia nhập 1995); Tây Nam Á — nửa trữ lượng dầu thế giới.'] },
      { h: 'Phần 2 — Quốc gia' },
      { ul: ['Hoa Kỳ — kinh tế số 1; Trung Quốc — số 2, cải cách mở cửa 1978.', 'Nhật Bản — công nghệ cao; Nga — cường quốc năng lượng.', 'Australia — khoáng sản + nông sản + giáo dục; Nam Phi — kim loại quý, BRICS.'] },
      { note: 'Các mốc dễ ra đề: WTO 1995, EU hiệu lực 1993, ASEAN 1967, VN vào ASEAN 1995 và WTO 2007, Trung Quốc cải cách 1978, Tây Nam Á nửa trữ lượng dầu thế giới.' },
    ],
    examples: [
      { q: 'Tổng hợp: vì sao mỗi quốc gia chọn con đường phát triển khác nhau?', a: 'Phân tích: Mỗi nước dựa vào nguồn lực riêng: Nhật và Hoa Kỳ đi vào công nghệ – tri thức; Nga, Australia, Tây Nam Á khai thác tài nguyên; Trung Quốc tận dụng lao động làm "công xưởng". Hiểu nguồn lực là chìa khoá lí giải con đường phát triển.' },
      { q: 'Liên hệ: bài học gì cho Việt Nam từ kinh nghiệm các nước đã học?', a: 'Phân tích: Tài nguyên không bảo đảm giàu có (Vê-nê-xu-ê-la), con người và công nghệ mới là then chốt (Nhật Bản). Việt Nam nên đầu tư nhân lực, công nghệ, đa dạng hoá kinh tế, hội nhập sâu rộng và phát triển bền vững để vươn lên.' },
    ],
  },

  'H11DIA-w36-quiz': {
    topic: 'Kết thúc Địa Lý 11 — Bản đồ thế giới trong tầm tay',
    intro: 'Địa Lý 11 đã mở ra bức tranh toàn cầu cho chúng ta: từ các khu vực kinh tế sôi động đến những vùng địa lý đặc biệt, từ các tổ chức quốc tế đến vị thế của Việt Nam trong thế giới hội nhập. Hôm nay chúng ta hệ thống lại toàn bộ và chuẩn bị tâm thế cho Địa Lý 12 — môn học về Việt Nam.',
    objectives: [
      'Hệ thống hoá các khu vực và quốc gia đã học trong năm lớp 11 theo vị trí, đặc điểm nổi bật.',
      'Nhận biết những xu hướng toàn cầu hoá, biến đổi khí hậu và an ninh lương thực liên quan đến địa lý.',
      'Chuẩn bị học Địa Lý 12 — chủ yếu về địa lý tự nhiên và kinh tế – xã hội Việt Nam.',
    ],
    theory: [
      { h: 'Thế giới qua bản đồ Địa Lý 11' },
      { ul: [
        'Châu Âu: EU (27 thành viên, đồng euro, tự do đi lại) — mô hình liên kết kinh tế-chính trị sâu nhất thế giới.',
        'Châu Mỹ: Hoa Kỳ (kinh tế số 1, GDP ~25 nghìn tỉ USD), Mỹ La-tinh (tài nguyên giàu, bất bình đẳng cao).',
        'Châu Á: Trung Quốc (công xưởng thế giới, cải cách 1978), Nhật Bản (công nghệ cao, già hoá), Tây Nam Á (dầu mỏ).',
        'Châu Đại Dương: Australia (tài nguyên khoáng sản + nông sản + giáo dục), ASEAN (hội nhập Đông Nam Á).',
        'Châu Phi: Nam Phi (kim loại quý, BRICS), đa phần chậm phát triển — vị trí địa lý không thuận lợi.',
      ] },
      { h: 'Các tổ chức và xu hướng then chốt' },
      { ul: [
        'WTO (1995): thương mại tự do — Việt Nam gia nhập 2007; EU (Maastricht 1993); ASEAN (1967, VN vào 1995).',
        'Toàn cầu hoá: thuận lợi (thị trường mở, chuyển giao công nghệ) và thách thức (mất việc làm, lệ thuộc).',
        'Biến đổi khí hậu: Đồng bằng sông Cửu Long (VN) — vùng dễ bị tổn thương nhất Đông Nam Á.',
        'An ninh lương thực: nông nghiệp châu Phi và châu Á vẫn là trọng tâm phát triển bền vững toàn cầu.',
      ] },
      { h: 'Địa Lý 12 — trở về với Việt Nam' },
      { ul: [
        'Địa lý tự nhiên VN: vị trí địa lý, địa hình, khí hậu, sông ngòi, đất và sinh vật, khoáng sản.',
        'Địa lý dân cư: dân số, lao động, đô thị hoá — cơ cấu dân số "vàng" và thách thức già hoá.',
        'Địa lý kinh tế: các ngành nông–lâm–ngư nghiệp, công nghiệp, dịch vụ và vùng kinh tế trọng điểm.',
        'Địa lý 7 vùng kinh tế: Trung du miền núi Bắc Bộ, Đồng bằng sông Hồng, Bắc Trung Bộ, DH Nam Trung Bộ, Tây Nguyên, ĐNB, ĐBSCL — đặc điểm và thế mạnh từng vùng.',
      ] },
      { note: 'Địa lý là môn học giúp em "đọc" thế giới và đất nước. Mỗi khi đi du lịch, xem tin tức quốc tế, hay nghĩ về tương lai nghề nghiệp — em đang dùng kiến thức địa lý. Đất nước Việt Nam với 3.260 km bờ biển, 54 dân tộc, từ Sa Pa đến Cà Mau là bài học địa lý sống động nhất mà em có thể khám phá suốt cuộc đời.' },
    ],
    examples: [
      { q: 'Tại sao Việt Nam lại được xem là một trong những quốc gia dễ bị tổn thương nhất do biến đổi khí hậu?', a: 'Việt Nam có Đồng bằng sông Cửu Long (ĐBSCL) — vựa lúa lớn nhất cả nước — nằm ở cao độ trung bình chỉ 0,5–1m so với mực nước biển. Nước biển dâng 1m có thể nhấn chìm 40% ĐBSCL, ảnh hưởng đến 17–18 triệu dân và an ninh lương thực toàn quốc. Ngoài ra, đường bờ biển dài 3.260 km khiến nhiều vùng ven biển dễ bị bão, xâm nhập mặn và triều cường. Đây là lý do Việt Nam rất tích cực tham gia các hiệp định khí hậu quốc tế như Paris Agreement (2015).' },
      { q: 'Nếu chỉ được chọn 5 "từ khoá số liệu" để ôn thi Địa lý 11, em sẽ chọn gì?', a: 'Năm từ khoá số liệu quan trọng nhất: (1) ASEAN 1967 – VN vào 1995; (2) WTO 1995 – VN vào 2007; (3) EU Maastricht 1993; (4) Trung Quốc cải cách mở cửa 1978; (5) Tây Nam Á – 1/2 trữ lượng dầu thế giới. Nắm 5 con số này + biết liên hệ ý nghĩa là đã có thể trả lời phần lớn câu hỏi lý thuyết trong đề thi về địa lý thế giới lớp 11.' },
    ],
  },
};
