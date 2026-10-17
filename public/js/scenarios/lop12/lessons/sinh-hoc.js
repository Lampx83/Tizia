// ============================================================
// Lớp 12 · SINH HỌC — Lý thuyết 35 tuần (CTGD 2018 — THPT).
// Di truyền học · Tiến hoá · Sinh thái học — định hướng ôn thi
// tốt nghiệp THPT. Key trùng id quiz: "H12SINH-wNN-quiz".
// Văn phong nghiêm túc cấp THPT, gọi học sinh là 'các em'.
// ============================================================

export const H12SINH_LESSONS = {
  'H12SINH-w01-quiz': {
    topic: 'DNA và quá trình tái bản DNA',
    intro: 'Các em mở đầu chương trình Sinh học 12 với phân tử mang sự sống: DNA. Bài này giúp các em hiểu cấu trúc xoắn kép của DNA và cơ chế tái bản - cách thông tin di truyền được sao chép trung thực qua các thế hệ tế bào.',
    objectives: [
      'Mô tả được cấu trúc xoắn kép của phân tử DNA theo mô hình Watson - Crick.',
      'Trình bày được nguyên tắc bổ sung và bán bảo tồn trong tái bản DNA.',
      'Nêu được vai trò của các enzyme chính tham gia tái bản.',
    ],
    theory: [
      { h: 'Cấu trúc phân tử DNA' },
      { p: 'DNA là chuỗi xoắn kép gồm hai mạch polynucleotide chạy ngược chiều nhau (5\'-3\' và 3\'-5\'). Mỗi nucleotide gồm đường deoxyribose, nhóm phosphate và một base nitơ (A, T, G, C). Hai mạch liên kết với nhau bằng liên kết hydrogen giữa các base.' },
      { h: 'Nguyên tắc bổ sung' },
      { ul: ['A liên kết với T bằng 2 liên kết hydrogen', 'G liên kết với C bằng 3 liên kết hydrogen', 'Vì vậy A = T, G = C và tổng A + G = T + C (quy tắc Chargaff)'] },
      { h: 'Tái bản DNA' },
      { p: 'Tái bản (nhân đôi) diễn ra trước khi tế bào phân chia, theo nguyên tắc bổ sung và nguyên tắc bán bảo tồn: mỗi DNA con giữ lại một mạch của DNA mẹ và tổng hợp mới một mạch. Nhờ đó hai phân tử con giống hệt phân tử mẹ.' },
      { h: 'Các enzyme tham gia' },
      { ul: ['Helicase: tháo xoắn, tách hai mạch tạo chạc tái bản', 'DNA polymerase: tổng hợp mạch mới theo chiều 5\'-3\'', 'Ligase: nối các đoạn Okazaki trên mạch tổng hợp gián đoạn'] },
      { h: 'Mạch liên tục và gián đoạn' },
      { p: 'Do DNA polymerase chỉ tổng hợp theo chiều 5\'-3\' nên một mạch được tổng hợp liên tục, mạch kia tổng hợp gián đoạn thành các đoạn Okazaki rồi được ligase nối lại.' },
      { note: 'Công thức cơ bản: số liên kết hydrogen H = 2A + 3G. Tổng nucleotide N = 2(A + G). Sau k lần tái bản từ 1 DNA mẹ tạo ra 2^k DNA con.' },
    ],
    examples: [
      { q: 'Một gene có 3000 nucleotide, trong đó A = 600. Tính số liên kết hydrogen của gene.', a: 'N = 3000 nên A + G = 1500. A = 600 suy ra G = 900. Số liên kết hydrogen H = 2A + 3G = 2(600) + 3(900) = 1200 + 2700 = 3900 liên kết.' },
      { q: 'Vì sao tái bản DNA được gọi là bán bảo tồn và điều đó có ý nghĩa gì?', a: 'Vì mỗi phân tử con chứa một mạch cũ (của mẹ) và một mạch mới tổng hợp. Cơ chế này đảm bảo thông tin di truyền được sao chép chính xác, hạn chế sai sót và giúp truyền đạt ổn định qua các thế hệ.' },
    ],
  },

  'H12SINH-w02-quiz': {
    topic: 'Gene và quá trình truyền đạt thông tin di truyền',
    intro: 'Các em đã biết DNA mang thông tin, nhưng thông tin đó được phiên dịch thành protein bằng cách nào? Bài này dẫn các em qua mã di truyền, phiên mã và dịch mã - dòng chảy của thông tin từ gene đến tính trạng.',
    objectives: [
      'Nêu được khái niệm gene và các đặc điểm của mã di truyền.',
      'Trình bày được cơ chế phiên mã tạo mRNA.',
      'Mô tả được quá trình dịch mã tổng hợp chuỗi polypeptide.',
    ],
    theory: [
      { h: 'Gene và mã di truyền' },
      { p: 'Gene là đoạn DNA mang thông tin mã hoá cho một sản phẩm (chuỗi polypeptide hoặc RNA). Thông tin được mã hoá bằng các bộ ba (codon) - cứ ba nucleotide kế tiếp mã hoá một amino acid.' },
      { h: 'Đặc điểm mã di truyền' },
      { ul: ['Mã bộ ba: 3 nucleotide quy định 1 amino acid (64 bộ ba)', 'Tính đặc hiệu: một bộ ba chỉ mã cho một amino acid', 'Tính thoái hoá: nhiều bộ ba cùng mã cho một amino acid', 'Tính phổ biến: hầu hết các loài dùng chung bộ mã', 'Codon mở đầu AUG, codon kết thúc UAA, UAG, UGA'] },
      { h: 'Phiên mã' },
      { p: 'Phiên mã là quá trình tổng hợp mRNA từ mạch khuôn của gene nhờ enzyme RNA polymerase, theo nguyên tắc bổ sung (A-U, T-A, G-C, C-G). mRNA mang thông tin từ nhân ra tế bào chất.' },
      { h: 'Dịch mã' },
      { p: 'Dịch mã diễn ra ở ribosome: tRNA mang amino acid khớp anticodon với codon trên mRNA theo nguyên tắc bổ sung, lần lượt lắp các amino acid thành chuỗi polypeptide cho đến khi gặp codon kết thúc.' },
      { note: 'Sơ đồ trung tâm: DNA -> (phiên mã) -> mRNA -> (dịch mã) -> Protein -> Tính trạng. Một mRNA có thể được nhiều ribosome cùng dịch (polysome) để tăng năng suất.' },
    ],
    examples: [
      { q: 'Một gene có vùng mã hoá 600 nucleotide. Chuỗi polypeptide do gene tổng hợp có bao nhiêu amino acid?', a: 'Số bộ ba mã = 600 / 3 = 200 bộ ba. Trừ 1 bộ ba kết thúc không mã amino acid, còn 199 bộ ba mã. Sau khi cắt amino acid mở đầu (methionine), chuỗi hoàn chỉnh có 198 amino acid.' },
      { q: 'Tính thoái hoá của mã di truyền có lợi gì cho sinh vật?', a: 'Nhiều bộ ba cùng mã cho một amino acid nên một số đột biến thay nucleotide ở vị trí thứ ba của codon vẫn cho ra amino acid cũ. Nhờ đó hạn chế tác hại của đột biến, bảo vệ tính ổn định của protein.' },
    ],
  },

  'H12SINH-w03-quiz': {
    topic: 'Điều hoà biểu hiện gene',
    intro: 'Mọi tế bào trong cơ thể có cùng bộ gene, vậy vì sao tế bào gan khác tế bào thần kinh? Câu trả lời nằm ở điều hoà biểu hiện gene - gene nào được bật, gene nào tắt và khi nào.',
    objectives: [
      'Nêu được khái niệm và ý nghĩa của điều hoà biểu hiện gene.',
      'Trình bày được cơ chế điều hoà của operon Lac ở vi khuẩn.',
      'Phân biệt được điều hoà ở sinh vật nhân sơ và nhân thực.',
    ],
    theory: [
      { h: 'Vì sao cần điều hoà' },
      { p: 'Điều hoà biểu hiện gene là kiểm soát lượng sản phẩm của gene (mRNA, protein) cho phù hợp nhu cầu của tế bào. Nhờ đó tế bào tiết kiệm năng lượng và biệt hoá thành các loại mô khác nhau.' },
      { h: 'Operon Lac' },
      { p: 'Ở vi khuẩn E. coli, operon Lac gồm vùng khởi động (promoter), vùng vận hành (operator) và nhóm gene cấu trúc Z, Y, A mã hoá enzyme phân giải lactose. Gene điều hoà nằm ngoài operon tạo protein ức chế.' },
      { h: 'Cơ chế bật - tắt' },
      { ul: ['Khi không có lactose: protein ức chế bám operator, ngăn phiên mã -> operon tắt', 'Khi có lactose: lactose gắn và làm biến đổi protein ức chế, nó rời operator -> operon bật, enzyme được tổng hợp'] },
      { h: 'Điều hoà ở nhân thực' },
      { p: 'Ở sinh vật nhân thực, điều hoà phức tạp hơn, diễn ra ở nhiều mức: cấu trúc nhiễm sắc thể, phiên mã (yếu tố phiên mã, vùng tăng cường), sau phiên mã, dịch mã và sau dịch mã.' },
      { note: 'Operon là đơn vị điều hoà đặc trưng của sinh vật nhân sơ. Sinh vật nhân thực hầu như không có operon nhưng có nhiều tầng điều hoà tinh vi hơn.' },
    ],
    examples: [
      { q: 'Khi môi trường nuôi vi khuẩn E. coli hết lactose, operon Lac hoạt động ra sao?', a: 'Hết lactose, protein ức chế trở lại trạng thái bám được operator nên gắn vào và ngăn RNA polymerase phiên mã. Các gene Z, Y, A ngừng hoạt động, vi khuẩn không lãng phí năng lượng tổng hợp enzyme không cần thiết.' },
      { q: 'Vì sao các tế bào cùng cơ thể có cùng DNA nhưng hình thái và chức năng lại khác nhau?', a: 'Do điều hoà biểu hiện gene: ở mỗi loại tế bào, chỉ một nhóm gene đặc trưng được bật còn các gene khác bị tắt. Sự bật - tắt khác nhau này tạo nên các protein đặc thù, dẫn đến biệt hoá thành nhiều loại tế bào.' },
    ],
  },

  'H12SINH-w04-quiz': {
    topic: 'Đột biến gene',
    intro: 'Thông tin di truyền không phải lúc nào cũng được sao chép hoàn hảo. Sai sót trong trình tự nucleotide gây nên đột biến gene - nguồn nguyên liệu sơ cấp cho tiến hoá nhưng cũng là nguyên nhân của nhiều bệnh di truyền.',
    objectives: [
      'Nêu được khái niệm và các dạng đột biến gene.',
      'Trình bày được nguyên nhân và cơ chế phát sinh đột biến gene.',
      'Phân tích được hậu quả và vai trò của đột biến gene.',
    ],
    theory: [
      { h: 'Khái niệm' },
      { p: 'Đột biến gene là những biến đổi trong cấu trúc của gene, liên quan tới một hoặc một số cặp nucleotide. Đột biến điểm chỉ liên quan tới một cặp nucleotide.' },
      { h: 'Các dạng đột biến điểm' },
      { ul: ['Thay thế một cặp nucleotide', 'Thêm một cặp nucleotide', 'Mất một cặp nucleotide'] },
      { h: 'Nguyên nhân và cơ chế' },
      { p: 'Đột biến phát sinh do tác nhân vật lý (tia UV, tia phóng xạ), hoá học (5-bromouracil, chất gây dịch chuyển khung) hoặc sai sót trong tái bản. Tác nhân làm bắt cặp sai trong nhân đôi, qua các lần tái bản tạo thành đột biến.' },
      { h: 'Hậu quả' },
      { p: 'Thêm hoặc mất một cặp nucleotide gây dịch khung đọc, làm thay đổi toàn bộ các bộ ba từ vị trí đột biến, hậu quả thường nặng. Thay thế có thể là đột biến đồng nghĩa, sai nghĩa hoặc vô nghĩa.' },
      { note: 'Đột biến gene đa số có hại hoặc trung tính, một số ít có lợi. Tần số đột biến từng gene rất thấp nhưng số lượng gene lớn nên nó là nguồn biến dị di truyền chủ yếu cho tiến hoá và chọn giống.' },
    ],
    examples: [
      { q: 'Một gene bị thay thế một cặp A-T bằng G-C tại bộ ba thứ năm. Số liên kết hydrogen thay đổi thế nào?', a: 'Cặp A-T có 2 liên kết hydrogen, cặp G-C có 3 liên kết hydrogen. Thay A-T bằng G-C làm tăng thêm 1 liên kết hydrogen so với gene ban đầu.' },
      { q: 'Vì sao đột biến mất một cặp nucleotide thường gây hậu quả nghiêm trọng hơn thay thế một cặp?', a: 'Mất một cặp nucleotide làm dịch khung đọc từ điểm đột biến trở đi, khiến toàn bộ các bộ ba phía sau bị đọc sai, chuỗi polypeptide thay đổi hoàn toàn. Thay thế một cặp thường chỉ ảnh hưởng một bộ ba nên hậu quả nhẹ hơn.' },
    ],
  },

  'H12SINH-w05-quiz': {
    topic: 'Công nghệ di truyền',
    intro: 'Con người không chỉ giải mã được DNA mà còn cắt, ghép và chuyển gene giữa các loài. Bài này giới thiệu các em những công cụ và ứng dụng của công nghệ di truyền hiện đại.',
    objectives: [
      'Nêu được khái niệm công nghệ DNA tái tổ hợp.',
      'Trình bày được các bước tạo sinh vật biến đổi gene.',
      'Nêu được một số thành tựu và vấn đề đạo đức của công nghệ di truyền.',
    ],
    theory: [
      { h: 'Công nghệ DNA tái tổ hợp' },
      { p: 'Là kỹ thuật ghép gene của loài này vào DNA của loài khác để tạo phân tử DNA tái tổ hợp, rồi đưa vào tế bào nhận để sản xuất sản phẩm mong muốn.' },
      { h: 'Các công cụ chính' },
      { ul: ['Enzyme cắt giới hạn (restriction enzyme): cắt DNA tại trình tự đặc hiệu', 'Enzyme ligase: nối các đoạn DNA lại với nhau', 'Thể truyền (vector): plasmid hoặc virus mang gene vào tế bào nhận'] },
      { h: 'Các bước tạo DNA tái tổ hợp' },
      { ul: ['Tách gene cần chuyển và mở vòng thể truyền bằng cùng một enzyme cắt', 'Nối gene vào thể truyền nhờ ligase tạo DNA tái tổ hợp', 'Chuyển DNA tái tổ hợp vào tế bào nhận', 'Phân lập và nhân dòng tế bào mang gene'] },
      { h: 'Thành tựu' },
      { p: 'Sản xuất insulin, hormone sinh trưởng, vaccine; tạo cây trồng kháng sâu, kháng thuốc cỏ; vi khuẩn xử lý ô nhiễm. Các sinh vật được tạo ra gọi là sinh vật biến đổi gene (GMO).' },
      { note: 'Công nghệ di truyền mang lại lợi ích lớn nhưng đặt ra vấn đề an toàn sinh học và đạo đức, cần được kiểm soát và đánh giá nghiêm ngặt.' },
    ],
    examples: [
      { q: 'Vì sao khi tạo DNA tái tổ hợp phải dùng cùng một loại enzyme cắt giới hạn cho cả gene và thể truyền?', a: 'Vì enzyme cắt giới hạn tạo ra các đầu dính có trình tự bổ sung. Dùng cùng một enzyme, đầu của gene và đầu của thể truyền sẽ bổ sung nhau, nhờ đó ligase mới nối được chúng thành DNA tái tổ hợp.' },
      { q: 'Sản xuất insulin bằng vi khuẩn có ưu điểm gì so với chiết từ tuỵ động vật?', a: 'Vi khuẩn mang gene insulin người nên tạo ra insulin giống hệt của người, ít gây dị ứng. Nuôi vi khuẩn nhanh, rẻ, sản lượng lớn và ổn định, không phụ thuộc nguồn tuỵ động vật khan hiếm.' },
    ],
  },

  'H12SINH-w06-quiz': {
    topic: 'Thực hành — Tách chiết DNA',
    intro: 'Lý thuyết về DNA sẽ sống động hơn khi các em tự tay nhìn thấy nó. Bài thực hành này hướng dẫn các em tách chiết DNA từ tế bào thực vật bằng dụng cụ đơn giản.',
    objectives: [
      'Trình bày được nguyên tắc của các bước tách chiết DNA.',
      'Giải thích được vai trò của từng hoá chất sử dụng.',
      'Thực hiện được quy trình tách DNA và quan sát kết quả.',
    ],
    theory: [
      { h: 'Nguyên tắc chung' },
      { p: 'Tách chiết DNA gồm ba bước cốt lõi: phá vỡ tế bào và nhân để giải phóng DNA, loại bỏ protein và tạp chất, kết tủa DNA bằng cồn để thu nhận.' },
      { h: 'Phá màng tế bào' },
      { ul: ['Nghiền mẫu để phá vỡ cơ học thành tế bào', 'Dùng nước rửa chén (chất tẩy) hoà tan lớp lipid của màng tế bào và màng nhân', 'Thêm muối giúp DNA kết tụ lại và trung hoà điện tích'] },
      { h: 'Loại protein' },
      { p: 'Có thể dùng nước cốt dứa hoặc đu đủ chứa enzyme protease để phân giải protein liên kết với DNA, giúp tách DNA tinh khiết hơn.' },
      { h: 'Kết tủa DNA' },
      { p: 'Rót nhẹ cồn lạnh (ethanol) lên trên dung dịch. DNA không tan trong cồn nên kết tủa thành các sợi trắng đục nổi ở mặt phân cách, có thể vớt bằng que.' },
      { note: 'Cồn phải lạnh và rót nhẹ theo thành ống để tạo lớp tách rõ. Muối và nhiệt độ thấp giúp DNA kết tủa hiệu quả hơn.' },
    ],
    examples: [
      { q: 'Vai trò của nước rửa chén trong thí nghiệm tách DNA là gì?', a: 'Nước rửa chén là chất tẩy, có khả năng hoà tan các phân tử lipid cấu tạo nên màng tế bào và màng nhân. Khi màng bị phá vỡ, DNA được giải phóng ra dung dịch để các bước sau thu nhận.' },
      { q: 'Vì sao phải dùng cồn lạnh khi kết tủa DNA?', a: 'DNA không tan trong cồn nên khi gặp cồn nó kết tủa. Cồn lạnh làm giảm độ tan của DNA mạnh hơn và hạn chế enzyme phân huỷ DNA hoạt động, nhờ đó thu được nhiều sợi DNA hơn và rõ hơn.' },
    ],
  },

  'H12SINH-w07-quiz': {
    topic: 'Nhiễm sắc thể và sự nhân đôi - phân li',
    intro: 'DNA trong tế bào không nằm tự do mà được đóng gói thành nhiễm sắc thể. Các em sẽ tìm hiểu cấu trúc nhiễm sắc thể và cách chúng nhân đôi, phân li trong nguyên phân và giảm phân.',
    objectives: [
      'Mô tả được cấu trúc siêu hiển vi của nhiễm sắc thể.',
      'Trình bày được sự nhân đôi và phân li nhiễm sắc thể trong nguyên phân.',
      'Phân biệt được nguyên phân và giảm phân về kết quả.',
    ],
    theory: [
      { h: 'Cấu trúc nhiễm sắc thể' },
      { p: 'Nhiễm sắc thể (NST) gồm DNA quấn quanh protein histone tạo nucleosome, các nucleosome xếp xoắn nhiều cấp tạo sợi cromatin rồi đóng xoắn thành NST. Cách đóng gói này thu gọn DNA dài hàng mét vào nhân tế bào nhỏ.' },
      { h: 'Bộ nhiễm sắc thể' },
      { ul: ['Tế bào sinh dưỡng (lưỡng bội 2n) chứa NST thành từng cặp tương đồng', 'Giao tử (đơn bội n) chứa mỗi cặp một chiếc', 'Ở người 2n = 46, gồm 44 NST thường và 2 NST giới tính'] },
      { h: 'Nguyên phân' },
      { p: 'Là quá trình phân bào tạo hai tế bào con có bộ NST giống hệt tế bào mẹ (2n). NST nhân đôi ở kì trung gian, các nhiễm sắc tử chị em phân li về hai cực ở kì sau, đảm bảo ổn định bộ NST.' },
      { h: 'Giảm phân' },
      { p: 'Gồm hai lần phân bào liên tiếp nhưng NST chỉ nhân đôi một lần, tạo bốn giao tử đơn bội (n). Giảm phân kèm trao đổi chéo và phân li độc lập, tạo nhiều loại giao tử khác nhau.' },
      { note: 'Nguyên phân ổn định bộ NST 2n qua các thế hệ tế bào; giảm phân kết hợp với thụ tinh duy trì 2n qua các thế hệ cơ thể và tạo biến dị tổ hợp.' },
    ],
    examples: [
      { q: 'Một loài có 2n = 8. Một tế bào sinh dục chín giảm phân bình thường tạo ra bao nhiêu giao tử và mỗi giao tử có bao nhiêu NST?', a: 'Một tế bào sinh dục chín (lưỡng bội) qua giảm phân tạo ra 4 giao tử. Vì giao tử là đơn bội nên mỗi giao tử có n = 8 / 2 = 4 NST.' },
      { q: 'Vì sao nhờ giảm phân và thụ tinh mà bộ NST của loài được giữ ổn định qua các thế hệ?', a: 'Giảm phân giảm bộ NST từ 2n xuống n ở giao tử. Khi thụ tinh, hai giao tử đơn bội (n + n) kết hợp khôi phục bộ 2n ở hợp tử. Nhờ vậy bộ NST đặc trưng của loài được duy trì ổn định qua các thế hệ.' },
    ],
  },

  'H12SINH-w08-quiz': {
    topic: 'Quy luật Mendel - Phân li và phân li độc lập',
    intro: 'Từ những thí nghiệm trồng đậu Hà Lan, Mendel đã khám phá ra quy luật của di truyền trước cả khi loài người biết đến gene. Các em sẽ nắm hai quy luật nền tảng và cách giải bài tập lai.',
    objectives: [
      'Phát biểu được nội dung quy luật phân li và phân li độc lập.',
      'Giải thích được cơ sở tế bào học của hai quy luật.',
      'Vận dụng giải các bài tập lai một và hai cặp tính trạng.',
    ],
    theory: [
      { h: 'Một số khái niệm' },
      { ul: ['Allele: các trạng thái khác nhau của một gene', 'Kiểu gene: tổ hợp các allele; kiểu hình: biểu hiện ra ngoài', 'Đồng hợp (AA, aa) và dị hợp (Aa)', 'Allele trội (A) lấn át allele lặn (a) trong dị hợp'] },
      { h: 'Quy luật phân li' },
      { p: 'Mỗi tính trạng do một cặp allele quy định. Khi giảm phân, hai allele của cặp phân li đồng đều về các giao tử, nên mỗi giao tử chỉ chứa một allele. Lai Aa x Aa cho tỉ lệ kiểu hình 3 trội : 1 lặn.' },
      { h: 'Quy luật phân li độc lập' },
      { p: 'Các cặp allele quy định các tính trạng khác nhau phân li độc lập trong giảm phân. Lai hai cặp tính trạng dị hợp (AaBb x AaBb) cho tỉ lệ kiểu hình 9 : 3 : 3 : 1.' },
      { h: 'Cơ sở tế bào học' },
      { p: 'Sự phân li của các allele tương ứng với sự phân li của cặp NST tương đồng trong giảm phân. Phân li độc lập tương ứng với sự tổ hợp tự do của các cặp NST khác nhau.' },
      { note: 'Số loại giao tử của cơ thể dị hợp n cặp gene là 2^n. Lai n cặp dị hợp cho 3^n loại kiểu gene và 2^n loại kiểu hình (trội lặn hoàn toàn).' },
    ],
    examples: [
      { q: 'Cho lai hai cây đậu dị hợp về một cặp gene (Aa x Aa). Xác định tỉ lệ kiểu gene và kiểu hình đời con.', a: 'Mỗi cây cho giao tử A và a tỉ lệ 1 : 1. Kẻ khung Punnett được tỉ lệ kiểu gene 1 AA : 2 Aa : 1 aa. Vì A trội hoàn toàn, kiểu hình là 3 trội : 1 lặn.' },
      { q: 'Lai AaBb x AaBb, hai cặp gene phân li độc lập, mỗi gene trội hoàn toàn. Tỉ lệ kiểu hình mang cả hai tính trạng trội là bao nhiêu?', a: 'Xét riêng mỗi cặp cho 3/4 trội. Vì phân li độc lập nên tỉ lệ hai tính trạng trội = 3/4 x 3/4 = 9/16. Đây chính là nhóm lớn nhất trong tỉ lệ 9 : 3 : 3 : 1.' },
    ],
  },

  'H12SINH-w09-quiz': {
    topic: 'Mở rộng học thuyết Mendel - Tương tác gene và tính đa hiệu',
    intro: 'Không phải tính trạng nào cũng tuân theo tỉ lệ Mendel kinh điển. Bài này giúp các em hiểu các trường hợp mở rộng: nhiều gene cùng quy định một tính trạng và một gene chi phối nhiều tính trạng.',
    objectives: [
      'Phân biệt được các kiểu tương tác gene.',
      'Giải thích được hiện tượng tác động đa hiệu của gene.',
      'Nhận biết các tỉ lệ biến đổi từ tỉ lệ 9 : 3 : 3 : 1.',
    ],
    theory: [
      { h: 'Tương tác gene' },
      { p: 'Tương tác gene là hiện tượng nhiều gene không allele cùng tác động quy định một tính trạng. Tỉ lệ kiểu hình thường là biến dạng của tỉ lệ 9 : 3 : 3 : 1.' },
      { h: 'Các kiểu tương tác' },
      { ul: ['Tương tác bổ sung: hai gene cùng có mặt mới biểu hiện kiểu hình mới (9 : 7, 9 : 6 : 1, 9 : 3 : 3 : 1)', 'Tương tác át chế: một gene át biểu hiện của gene khác (12 : 3 : 1, 13 : 3, 9 : 3 : 4)', 'Tương tác cộng gộp: mỗi allele trội đóng góp ngang nhau, tạo dãy biến dị liên tục'] },
      { h: 'Tác động đa hiệu' },
      { p: 'Một gene có thể ảnh hưởng đến nhiều tính trạng khác nhau, gọi là gene đa hiệu. Ví dụ gene gây bệnh hồng cầu hình liềm vừa làm thay đổi hồng cầu vừa ảnh hưởng nhiều cơ quan.' },
      { h: 'Ý nghĩa' },
      { p: 'Tương tác gene và đa hiệu cho thấy mối quan hệ giữa kiểu gene và kiểu hình rất phức tạp, không phải một gene - một tính trạng đơn giản. Nhiều tính trạng số lượng là kết quả của tương tác cộng gộp.' },
      { note: 'Khi gặp tỉ lệ kiểu hình ở F2 là biến dạng của tổng 16 (như 9 : 7, 12 : 3 : 1, 13 : 3) các em nên nghĩ ngay đến tương tác gene.' },
    ],
    examples: [
      { q: 'F2 phân li theo tỉ lệ 9 : 7 về màu hoa. Hãy giải thích bằng tương tác gene.', a: 'Tỉ lệ 9 : 7 (tổng 16) cho thấy có hai cặp gene tương tác bổ sung. Chỉ khi có đồng thời cả hai allele trội (A-B-, chiếm 9/16) hoa mới có màu; các tổ hợp thiếu một trong hai (7/16) cho hoa trắng.' },
      { q: 'Vì sao tương tác cộng gộp lại tạo ra các tính trạng biến đổi liên tục như chiều cao, màu da?', a: 'Vì tính trạng do nhiều cặp gene cùng quy định, mỗi allele trội đóng góp một phần nhỏ ngang nhau vào kiểu hình. Khi số allele trội tăng dần, kiểu hình biến đổi dần đều tạo thành dãy liên tục thay vì các nhóm rạch ròi.' },
    ],
  },

  'H12SINH-w10-quiz': {
    topic: 'Di truyền liên kết với giới tính',
    intro: 'Vì sao bệnh mù màu và máu khó đông hay gặp ở nam giới hơn nữ giới? Câu trả lời nằm ở những gene nằm trên nhiễm sắc thể giới tính. Bài này giúp các em hiểu quy luật di truyền liên kết giới tính.',
    objectives: [
      'Trình bày được cơ chế xác định giới tính ở người.',
      'Giải thích được di truyền của gene trên NST X không có allele trên Y.',
      'Vận dụng giải bài tập di truyền liên kết giới tính.',
    ],
    theory: [
      { h: 'Nhiễm sắc thể giới tính' },
      { p: 'Ở người, cặp NST giới tính XX là nữ, XY là nam. Bố cho con giao tử X hoặc Y, mẹ luôn cho X. Giới tính của con do giao tử của bố quyết định.' },
      { h: 'Gene trên NST X' },
      { p: 'Nhiều gene nằm trên vùng không tương đồng của NST X, không có allele trên Y. Allele lặn trên X biểu hiện ngay ở nam (XY) vì chỉ có một allele, nhưng ở nữ (XX) phải đồng hợp lặn mới biểu hiện.' },
      { h: 'Đặc điểm di truyền chéo' },
      { ul: ['Gene lặn trên X: bệnh thường gặp ở nam nhiều hơn nữ', 'Di truyền chéo: bố truyền cho con gái, mẹ truyền cho con trai', 'Mẹ mang gene bệnh (dị hợp) thì 1/2 con trai biểu hiện bệnh'] },
      { h: 'Ý nghĩa' },
      { p: 'Dựa vào quy luật di truyền liên kết giới tính có thể dự đoán giới tính, phân biệt giới tính sớm ở vật nuôi và tư vấn di truyền cho người.' },
      { note: 'Bệnh mù màu và máu khó đông do gene lặn trên X gây ra, là ví dụ kinh điển của di truyền liên kết giới tính, giải thích vì sao nam mắc nhiều hơn nữ.' },
    ],
    examples: [
      { q: 'Mẹ bình thường mang gene mù màu (X^A X^a), bố bình thường (X^A Y). Tính tỉ lệ con trai bị mù màu.', a: 'Con nhận X^a từ mẹ và Y từ bố sẽ là X^a Y - mù màu. Mẹ cho X^A và X^a tỉ lệ bằng nhau, bố cho X^A và Y bằng nhau. Trong số con trai (nhận Y của bố), 1/2 nhận X^a nên bị mù màu, tức 1/4 tổng số con.' },
      { q: 'Vì sao bệnh máu khó đông gặp ở nam giới nhiều hơn nữ giới?', a: 'Gene gây bệnh là allele lặn nằm trên NST X. Nam chỉ có một X nên chỉ cần một allele lặn là biểu hiện bệnh. Nữ có hai X nên phải nhận đồng thời hai allele lặn mới mắc bệnh, xác suất thấp hơn nhiều.' },
    ],
  },

  'H12SINH-w11-quiz': {
    topic: 'Liên kết gene và hoán vị gene',
    intro: 'Mendel cho rằng các gene phân li độc lập, nhưng các gene trên cùng một NST lại di truyền cùng nhau. Bài này giúp các em hiểu liên kết gene, hoán vị gene và cách tính tần số hoán vị.',
    objectives: [
      'Phân biệt được liên kết gene hoàn toàn và hoán vị gene.',
      'Giải thích được cơ sở tế bào học của hoán vị gene.',
      'Tính được tần số hoán vị gene và lập bản đồ di truyền.',
    ],
    theory: [
      { h: 'Liên kết gene' },
      { p: 'Các gene nằm trên cùng một NST có xu hướng di truyền cùng nhau, gọi là một nhóm liên kết. Số nhóm liên kết của loài bằng số NST đơn bội n.' },
      { h: 'Hoán vị gene' },
      { p: 'Trong giảm phân, các NST tương đồng có thể trao đổi đoạn (trao đổi chéo) làm các allele đổi vị trí, tạo giao tử hoán vị. Hiện tượng này gọi là hoán vị gene, tạo biến dị tổ hợp.' },
      { h: 'Tần số hoán vị gene' },
      { ul: ['Tần số hoán vị f = (số giao tử hoán vị / tổng số giao tử) x 100%', 'f dao động từ 0% đến 50%, các gene càng xa nhau f càng lớn', 'f phản ánh khoảng cách giữa hai gene trên NST (1% = 1 cM)'] },
      { h: 'Ý nghĩa' },
      { p: 'Liên kết gene duy trì sự ổn định của nhóm tính trạng tốt; hoán vị gene tạo nguồn biến dị tổ hợp phong phú và cho phép lập bản đồ di truyền các gene.' },
      { note: 'Nếu f = 0% là liên kết hoàn toàn; f tối đa 50% bằng với phân li độc lập. Dựa vào f có thể xác định trật tự và khoảng cách các gene trên NST.' },
    ],
    examples: [
      { q: 'Lai phân tích cây dị hợp hai cặp gene liên kết, thu 4 nhóm kiểu hình với 2 nhóm chiếm 18% và 82%. Tính tần số hoán vị.', a: 'Hai loại kiểu hình chiếm tỉ lệ nhỏ (18% tổng) là giao tử hoán vị. Tần số hoán vị f = 18%. Hai loại lớn (82%) là giao tử liên kết. Khoảng cách hai gene là 18 cM.' },
      { q: 'Vì sao tần số hoán vị gene không bao giờ vượt quá 50%?', a: 'Trao đổi chéo chỉ xảy ra giữa hai trong bốn nhiễm sắc tử, nên dù mọi tế bào đều trao đổi chéo thì tối đa cũng chỉ tạo 50% giao tử hoán vị. Khi f đạt 50%, kết quả giống như hai gene phân li độc lập.' },
    ],
  },

  'H12SINH-w12-quiz': {
    topic: 'Đột biến nhiễm sắc thể - Di truyền y học',
    intro: 'Bên cạnh đột biến gene, những thay đổi về cấu trúc và số lượng nhiễm sắc thể gây hậu quả lớn hơn nhiều. Bài này liên hệ đột biến NST với các bệnh và hội chứng di truyền ở người.',
    objectives: [
      'Phân biệt được đột biến cấu trúc và đột biến số lượng NST.',
      'Nêu được cơ chế phát sinh và hậu quả của các dạng đột biến NST.',
      'Liên hệ một số bệnh, hội chứng di truyền ở người.',
    ],
    theory: [
      { h: 'Đột biến cấu trúc NST' },
      { ul: ['Mất đoạn: làm mất một đoạn NST, thường gây chết hoặc giảm sức sống', 'Lặp đoạn: một đoạn được lặp lại', 'Đảo đoạn: một đoạn quay ngược 180 độ', 'Chuyển đoạn: trao đổi đoạn giữa các NST không tương đồng'] },
      { h: 'Đột biến số lượng NST' },
      { p: 'Gồm lệch bội (thừa hoặc thiếu một vài NST, như 2n+1, 2n-1) và đa bội (bộ NST tăng lên bội số của n, như 3n, 4n). Lệch bội thường do rối loạn phân li một cặp NST trong giảm phân.' },
      { h: 'Một số hội chứng ở người' },
      { ul: ['Hội chứng Down: thừa một NST số 21 (ba NST 21)', 'Hội chứng Turner: nữ chỉ có một NST X (XO)', 'Hội chứng Klinefelter: nam có thừa NST X (XXY)'] },
      { h: 'Di truyền y học' },
      { p: 'Di truyền y học nghiên cứu bệnh di truyền để chẩn đoán, phòng và tư vấn. Phương pháp gồm lập phả hệ, xét nghiệm NST, sàng lọc trước sinh và tư vấn di truyền cho cặp vợ chồng có nguy cơ.' },
      { note: 'Đa bội phổ biến ở thực vật, làm cây to khoẻ, được ứng dụng trong chọn giống. Ở động vật và người, đa bội và lệch bội thường gây hậu quả nghiêm trọng.' },
    ],
    examples: [
      { q: 'Một người mắc hội chứng Down có bộ NST như thế nào và nguyên nhân do đâu?', a: 'Người mắc Down có 47 NST, thừa một NST số 21 (ba chiếc NST 21). Nguyên nhân do rối loạn phân li cặp NST 21 trong giảm phân tạo giao tử thừa NST 21, khi thụ tinh với giao tử bình thường tạo hợp tử 2n+1.' },
      { q: 'Vì sao đột biến đa bội thường gặp và có ích ở thực vật nhưng hiếm và có hại ở động vật?', a: 'Thực vật có khả năng sinh sản vô tính và tự thụ nên cây đa bội vẫn duy trì được, đa bội còn làm cơ quan to, năng suất cao. Động vật có cơ chế xác định giới tính và phát triển phức tạp nên đa bội gây mất cân bằng gene, thường gây chết hoặc bất thụ.' },
    ],
  },

  'H12SINH-w13-quiz': {
    topic: 'Di truyền ngoài nhân (di truyền tế bào chất)',
    intro: 'Không phải mọi gene đều nằm trong nhân. Ti thể và lục lạp cũng có DNA riêng, tạo nên kiểu di truyền đặc biệt theo dòng mẹ. Bài này giúp các em phân biệt di truyền trong nhân và ngoài nhân.',
    objectives: [
      'Nêu được khái niệm di truyền ngoài nhân.',
      'Giải thích được đặc điểm di truyền theo dòng mẹ.',
      'Phân biệt được di truyền trong nhân và ngoài nhân.',
    ],
    theory: [
      { h: 'Gene ngoài nhân' },
      { p: 'Ngoài DNA trong nhân, tế bào còn có DNA trong ti thể và lục lạp. Các gene này nằm ngoài nhân, di truyền không theo quy luật Mendel.' },
      { h: 'Di truyền theo dòng mẹ' },
      { p: 'Khi thụ tinh, hầu như chỉ tế bào chất của trứng (chứa ti thể, lục lạp) truyền cho hợp tử, tinh trùng gần như không góp tế bào chất. Vì vậy tính trạng do gene ngoài nhân quy định luôn giống mẹ - gọi là di truyền theo dòng mẹ.' },
      { h: 'Đặc điểm nhận biết' },
      { ul: ['Kết quả lai thuận và lai nghịch khác nhau', 'Đời con luôn mang kiểu hình của mẹ', 'Tính trạng không phân li theo tỉ lệ Mendel'] },
      { h: 'Phân biệt với di truyền trong nhân' },
      { p: 'Di truyền trong nhân: gene phân chia đều cho các tế bào con, lai thuận nghịch cho kết quả giống nhau. Di truyền ngoài nhân: gene phân chia không đều, kết quả phụ thuộc vào mẹ.' },
      { note: 'Khi phép lai thuận và lai nghịch cho kết quả khác nhau và con luôn giống mẹ, các em nên nghĩ đến di truyền ngoài nhân (tế bào chất).' },
    ],
    examples: [
      { q: 'Lai thuận và lai nghịch một tính trạng cho kết quả khác nhau, con luôn giống mẹ. Tính trạng này do gene ở đâu quy định?', a: 'Kết quả con luôn giống mẹ và lai thuận nghịch khác nhau là dấu hiệu của di truyền ngoài nhân. Tính trạng do gene nằm trong tế bào chất (ti thể hoặc lục lạp) quy định, truyền theo dòng mẹ.' },
      { q: 'Vì sao gene trong ti thể chỉ di truyền theo dòng mẹ?', a: 'Khi thụ tinh, trứng đóng góp gần như toàn bộ tế bào chất cho hợp tử, trong đó có ti thể; tinh trùng hầu như chỉ góp nhân, không góp ti thể. Do đó ti thể của thế hệ sau đều có nguồn gốc từ mẹ.' },
    ],
  },

  'H12SINH-w14-quiz': {
    topic: 'Mối quan hệ giữa kiểu gene, môi trường và kiểu hình',
    intro: 'Cùng một kiểu gene, vì sao cây trồng ở điều kiện khác nhau lại cho kiểu hình khác nhau? Bài này giúp các em hiểu vai trò của môi trường và khái niệm mức phản ứng.',
    objectives: [
      'Nêu được mối quan hệ giữa kiểu gene, môi trường và kiểu hình.',
      'Trình bày được khái niệm thường biến và mức phản ứng.',
      'Phân biệt được thường biến với đột biến.',
    ],
    theory: [
      { h: 'Kiểu hình là kết quả tương tác' },
      { p: 'Kiểu hình là kết quả tương tác giữa kiểu gene và môi trường. Kiểu gene quy định khả năng phản ứng, môi trường quyết định kiểu hình cụ thể trong giới hạn đó.' },
      { h: 'Thường biến' },
      { p: 'Thường biến là những biến đổi kiểu hình của cùng một kiểu gene phát sinh khi điều kiện môi trường thay đổi. Thường biến không liên quan đến biến đổi vật chất di truyền nên không di truyền.' },
      { h: 'Mức phản ứng' },
      { ul: ['Mức phản ứng là tập hợp các kiểu hình của một kiểu gene trong các môi trường khác nhau', 'Tính trạng số lượng (năng suất) có mức phản ứng rộng', 'Tính trạng chất lượng (màu sắc) có mức phản ứng hẹp', 'Mức phản ứng do kiểu gene quy định nên di truyền được'] },
      { h: 'Phân biệt thường biến và đột biến' },
      { p: 'Thường biến biến đổi đồng loạt, có hướng, không di truyền, giúp sinh vật thích nghi. Đột biến phát sinh ngẫu nhiên, riêng lẻ, di truyền được và là nguyên liệu cho tiến hoá.' },
      { note: 'Công thức ghi nhớ: Kiểu gene + Môi trường -> Kiểu hình. Muốn năng suất cao cần cả giống tốt (kiểu gene) lẫn kỹ thuật chăm sóc tốt (môi trường).' },
    ],
    examples: [
      { q: 'Hai cây cùng giống trồng ở đồng bằng và miền núi cho năng suất khác nhau. Hiện tượng này gọi là gì và có di truyền không?', a: 'Đó là thường biến - biến đổi kiểu hình của cùng một kiểu gene do môi trường khác nhau. Thường biến không làm thay đổi vật chất di truyền nên không di truyền cho thế hệ sau.' },
      { q: 'Vì sao muốn tăng năng suất vật nuôi, cây trồng phải kết hợp cả chọn giống và cải thiện điều kiện nuôi trồng?', a: 'Vì kiểu hình là kết quả tương tác giữa kiểu gene và môi trường. Giống tốt quy định mức phản ứng (tiềm năng năng suất), còn điều kiện chăm sóc tốt giúp đạt kiểu hình cao trong mức đó. Thiếu một trong hai đều không phát huy hết năng suất.' },
    ],
  },

  'H12SINH-w15-quiz': {
    topic: 'Thực hành về tương tác kiểu gene và môi trường',
    intro: 'Bài thực hành này giúp các em quan sát và chứng minh ảnh hưởng của môi trường lên sự biểu hiện của kiểu gene qua các thí nghiệm đơn giản.',
    objectives: [
      'Bố trí được thí nghiệm chứng minh ảnh hưởng của môi trường lên kiểu hình.',
      'Thu thập và xử lí được số liệu thường biến.',
      'Rút ra được kết luận về mức phản ứng của kiểu gene.',
    ],
    theory: [
      { h: 'Mục tiêu thực hành' },
      { p: 'Thí nghiệm nhằm chứng minh cùng một kiểu gene cho kiểu hình khác nhau ở các điều kiện môi trường khác nhau, từ đó xác định mức phản ứng.' },
      { h: 'Bố trí thí nghiệm' },
      { ul: ['Dùng cùng một giống (cùng kiểu gene), nhân giống vô tính nếu có thể', 'Chia thành các lô trồng ở điều kiện khác nhau (ánh sáng, phân bón, nước)', 'Chỉ thay đổi một yếu tố, giữ các yếu tố khác như nhau'] },
      { h: 'Thu số liệu' },
      { p: 'Đo các chỉ tiêu kiểu hình (chiều cao, số lá, năng suất) ở từng lô. Tính giá trị trung bình của mỗi lô để so sánh.' },
      { h: 'Xử lí và kết luận' },
      { p: 'So sánh trung bình các lô để thấy môi trường ảnh hưởng đến kiểu hình. Khoảng dao động của kiểu hình chính là biểu hiện của mức phản ứng của kiểu gene đó.' },
      { note: 'Để kết luận chính xác, phải dùng cùng một kiểu gene và chỉ thay đổi một yếu tố môi trường mỗi lần. Đây là nguyên tắc đối chứng trong thí nghiệm sinh học.' },
    ],
    examples: [
      { q: 'Vì sao trong thí nghiệm chứng minh thường biến phải dùng cây cùng một giống và nhân giống vô tính?', a: 'Để đảm bảo các cây có cùng kiểu gene. Khi đó mọi khác biệt kiểu hình giữa các lô chỉ do môi trường gây ra, không lẫn ảnh hưởng của sự khác nhau về gene, giúp kết luận về thường biến chính xác.' },
      { q: 'Nếu mỗi lô thí nghiệm thay đổi đồng thời nhiều yếu tố (cả ánh sáng và phân bón) thì có vấn đề gì?', a: 'Khi thay đổi nhiều yếu tố cùng lúc, không thể biết khác biệt kiểu hình do yếu tố nào gây ra. Vì vậy mỗi lần chỉ nên thay đổi một yếu tố và giữ các yếu tố còn lại như nhau để xác định đúng nguyên nhân.' },
    ],
  },

  'H12SINH-w16-quiz': {
    topic: 'Di truyền học quần thể',
    intro: 'Đến đây, các em chuyển từ cá thể sang quần thể - tập hợp các cá thể cùng loài. Bài này giúp các em hiểu cấu trúc di truyền của quần thể và định luật Hardy - Weinberg.',
    objectives: [
      'Nêu được khái niệm vốn gene, tần số allele và tần số kiểu gene.',
      'Phát biểu được nội dung và điều kiện của định luật Hardy - Weinberg.',
      'Vận dụng tính tần số allele và kiểu gene trong quần thể.',
    ],
    theory: [
      { h: 'Đặc trưng di truyền của quần thể' },
      { p: 'Vốn gene là tập hợp tất cả các allele của mọi gene trong quần thể. Quần thể được đặc trưng bởi tần số allele và tần số kiểu gene.' },
      { h: 'Quần thể tự thụ và ngẫu phối' },
      { ul: ['Tự thụ phấn, giao phối gần: tỉ lệ dị hợp giảm dần, đồng hợp tăng dần qua các thế hệ', 'Ngẫu phối: duy trì tần số allele và kiểu gene ổn định, tạo nhiều biến dị tổ hợp'] },
      { h: 'Định luật Hardy - Weinberg' },
      { p: 'Trong quần thể ngẫu phối lớn, không có chọn lọc, đột biến, di nhập gene, tần số allele và kiểu gene được duy trì không đổi qua các thế hệ. Nếu tần số allele A = p, a = q thì cấu trúc cân bằng là p^2 AA : 2pq Aa : q^2 aa, với p + q = 1.' },
      { h: 'Ý nghĩa' },
      { p: 'Định luật phản ánh trạng thái cân bằng di truyền lí tưởng, làm chuẩn để phát hiện các nhân tố tiến hoá khi quần thể lệch khỏi cân bằng. Cho phép ước tính tần số allele lặn gây bệnh trong cộng đồng.' },
      { note: 'Công thức then chốt: p + q = 1 và p^2 + 2pq + q^2 = 1. Từ tỉ lệ kiểu hình lặn (q^2) có thể tính q rồi suy ra p và các tần số kiểu gene.' },
    ],
    examples: [
      { q: 'Một quần thể cân bằng có 16% cá thể mang kiểu hình lặn (aa). Tính tần số allele a và A.', a: 'Tần số kiểu gene aa = q^2 = 0,16 nên q = 0,4. Suy ra p = 1 - q = 0,6. Vậy tần số allele a = 0,4 và A = 0,6.' },
      { q: 'Vì sao quần thể tự thụ phấn lâu đời thường bị thoái hoá giống?', a: 'Tự thụ phấn làm tỉ lệ thể dị hợp giảm dần, thể đồng hợp tăng dần. Các allele lặn có hại vốn ẩn ở thể dị hợp dần được đưa về đồng hợp lặn và biểu hiện ra kiểu hình, làm sức sống, năng suất giảm sút - gọi là thoái hoá giống.' },
    ],
  },

  'H12SINH-w17-quiz': {
    topic: 'Ôn tập học kì 1',
    intro: 'Các em đã đi qua toàn bộ phần Di truyền học. Bài ôn tập này hệ thống lại các mạch kiến thức và phương pháp giải bài tập, chuẩn bị cho kiểm tra học kì.',
    objectives: [
      'Hệ thống hoá kiến thức di truyền phân tử, di truyền NST và quy luật di truyền.',
      'Nắm vững các công thức di truyền cơ bản.',
      'Rèn kĩ năng giải các dạng bài tập tổng hợp.',
    ],
    theory: [
      { h: 'Mạch di truyền phân tử' },
      { p: 'DNA -> nhân đôi -> gene -> phiên mã -> mRNA -> dịch mã -> protein -> tính trạng. Đột biến gene là nguồn biến dị sơ cấp. Điều hoà biểu hiện gene quyết định gene nào hoạt động.' },
      { h: 'Mạch di truyền nhiễm sắc thể' },
      { ul: ['Cấu trúc và hoạt động NST trong nguyên phân, giảm phân', 'Đột biến cấu trúc và số lượng NST', 'Liên hệ bệnh, hội chứng di truyền ở người'] },
      { h: 'Các quy luật di truyền' },
      { ul: ['Quy luật Mendel: phân li và phân li độc lập', 'Tương tác gene, gene đa hiệu', 'Liên kết gene, hoán vị gene', 'Di truyền liên kết giới tính, di truyền ngoài nhân'] },
      { h: 'Di truyền quần thể' },
      { p: 'Tần số allele, tần số kiểu gene; quần thể tự thụ và ngẫu phối; định luật Hardy - Weinberg và cách tính tần số allele.' },
      { note: 'Các em ghi nhớ nhóm công thức: H = 2A + 3G; số giao tử 2^n; tỉ lệ 9:3:3:1 và biến dạng; tần số hoán vị f; p + q = 1 và p^2 + 2pq + q^2 = 1.' },
    ],
    examples: [
      { q: 'Hãy nối từng tỉ lệ kiểu hình với quy luật di truyền tương ứng: 3:1, 9:3:3:1, 9:7, 1:1:1:1.', a: 'Tỉ lệ 3:1 ứng với quy luật phân li (lai một cặp dị hợp). 9:3:3:1 ứng với phân li độc lập hai cặp tính trạng. 9:7 ứng với tương tác bổ sung. 1:1:1:1 ứng với lai phân tích hai cặp gene phân li độc lập.' },
      { q: 'Một gene dài 5100 Angstrom, có A = 30% tổng nucleotide. Tính số nucleotide từng loại.', a: 'Mỗi nucleotide dài 3,4 Angstrom nên tổng N = 5100 / 3,4 x 2 = 3000. A = T = 30% x 3000 = 900. G = C = (50% - 30%) x 3000 = 600. Vậy A = T = 900, G = C = 600.' },
    ],
  },

  'H12SINH-w18-quiz': {
    topic: 'Kiểm tra học kì 1',
    intro: 'Bài tổng kết học kì 1 giúp các em tự đánh giá mức độ nắm vững phần Di truyền học và rèn cách trình bày, phân bổ thời gian khi làm bài.',
    objectives: [
      'Tự đánh giá kiến thức và kĩ năng phần Di truyền học.',
      'Rèn kĩ năng làm bài trắc nghiệm và bài tập tổng hợp.',
      'Xác định những phần kiến thức còn yếu để bổ sung.',
    ],
    theory: [
      { h: 'Phạm vi kiểm tra' },
      { ul: ['Di truyền phân tử: DNA, gene, mã di truyền, phiên mã, dịch mã, điều hoà, đột biến gene', 'Di truyền NST: cấu trúc, phân bào, đột biến NST', 'Quy luật di truyền và di truyền quần thể'] },
      { h: 'Lưu ý khi làm bài' },
      { p: 'Đọc kĩ đề, gạch chân dữ kiện. Với bài tập di truyền, xác định quy luật trước rồi mới đặt kiểu gene. Với câu lí thuyết, loại trừ phương án sai.' },
      { h: 'Phân bổ thời gian' },
      { ul: ['Làm câu dễ và lí thuyết trước', 'Dành thời gian cho bài tập tính toán phía sau', 'Kiểm tra lại đáp án nếu còn thời gian'] },
      { h: 'Sai lầm thường gặp' },
      { p: 'Nhầm số liên kết hydrogen, quên trừ bộ ba kết thúc khi tính amino acid, nhầm tỉ lệ giới tính, áp dụng nhầm công thức Hardy - Weinberg khi quần thể chưa cân bằng.' },
      { note: 'Các em nên ghi lại những câu làm sai để xem lại sau kiểm tra. Sửa được lỗi sai chính là cách ôn thi tốt nghiệp hiệu quả nhất.' },
    ],
    examples: [
      { q: 'Khi tính số amino acid của chuỗi polypeptide hoàn chỉnh từ số nucleotide của gene, cần lưu ý điều gì?', a: 'Cần chia số nucleotide vùng mã hoá cho 6 (vì hai mạch, mỗi bộ ba 3 nucleotide) để ra số bộ ba, trừ 1 bộ ba kết thúc, rồi trừ thêm amino acid mở đầu bị cắt. Quên các bước trừ này là lỗi rất hay gặp.' },
      { q: 'Trước khi áp dụng công thức Hardy - Weinberg, cần kiểm tra điều gì?', a: 'Cần kiểm tra quần thể đã cân bằng di truyền chưa, tức tần số kiểu gene có thoả mãn p^2 : 2pq : q^2 hay không. Nếu quần thể chưa cân bằng, không được dùng trực tiếp công thức mà phải tính từ tần số allele của các cá thể.' },
    ],
  },

  'H12SINH-w19-quiz': {
    topic: 'Bằng chứng tiến hoá',
    intro: 'Các em bước sang phần Tiến hoá với câu hỏi lớn: làm sao biết các loài có chung nguồn gốc? Bài này giới thiệu các loại bằng chứng chứng minh sinh giới tiến hoá.',
    objectives: [
      'Nêu được các loại bằng chứng tiến hoá.',
      'Phân biệt được cơ quan tương đồng và cơ quan tương tự.',
      'Giải thích được ý nghĩa của các bằng chứng phân tử.',
    ],
    theory: [
      { h: 'Bằng chứng giải phẫu so sánh' },
      { ul: ['Cơ quan tương đồng: cùng nguồn gốc, khác chức năng (tay người, cánh dơi, vây cá voi)', 'Cơ quan tương tự: khác nguồn gốc, cùng chức năng (cánh chim và cánh bướm)', 'Cơ quan thoái hoá: vết tích cơ quan từng phát triển ở tổ tiên'] },
      { h: 'Bằng chứng phôi sinh học' },
      { p: 'Phôi của nhiều loài động vật có xương sống ở giai đoạn sớm rất giống nhau (đều có khe mang, đuôi), chứng tỏ chúng có chung nguồn gốc.' },
      { h: 'Bằng chứng tế bào học và sinh học phân tử' },
      { p: 'Mọi sinh vật đều cấu tạo từ tế bào, dùng chung mã di truyền và các đại phân tử DNA, protein. Trình tự DNA và protein càng giống nhau thì các loài có quan hệ họ hàng càng gần.' },
      { h: 'Bằng chứng cổ sinh vật học' },
      { p: 'Hoá thạch là di tích sinh vật xưa, cho thấy sự thay đổi của sinh giới qua các thời kì địa chất và là bằng chứng trực tiếp về tiến hoá.' },
      { note: 'Cơ quan tương đồng phản ánh tiến hoá phân li (cùng nguồn gốc, thích nghi khác hướng); cơ quan tương tự phản ánh tiến hoá đồng quy (khác nguồn gốc, thích nghi giống nhau). Bằng chứng phân tử thuyết phục nhất hiện nay.' },
    ],
    examples: [
      { q: 'Tay người, cánh dơi và vây cá voi có cùng cấu trúc xương nhưng chức năng khác nhau. Đây là bằng chứng gì và nói lên điều gì?', a: 'Đó là các cơ quan tương đồng - cùng nguồn gốc từ chi trước của tổ tiên chung nhưng biến đổi để thích nghi với cầm nắm, bay và bơi. Chúng chứng tỏ các loài này tiến hoá phân li từ một tổ tiên chung.' },
      { q: 'Vì sao so sánh trình tự DNA được coi là bằng chứng tiến hoá thuyết phục?', a: 'Vì DNA mang thông tin di truyền truyền qua các thế hệ. Hai loài có quan hệ họ hàng gần sẽ có trình tự DNA giống nhau nhiều hơn. Mức độ giống nhau định lượng được, cho phép xác định chính xác quan hệ tiến hoá giữa các loài.' },
    ],
  },

  'H12SINH-w20-quiz': {
    topic: 'Học thuyết tiến hoá Lamarck và Darwin',
    intro: 'Trước khi có di truyền học, các nhà khoa học đã cố giải thích vì sao sinh vật đa dạng và thích nghi. Bài này so sánh hai học thuyết tiến hoá đầu tiên của Lamarck và Darwin.',
    objectives: [
      'Trình bày được nội dung cơ bản học thuyết Lamarck.',
      'Trình bày được nội dung học thuyết Darwin về chọn lọc tự nhiên.',
      'So sánh và đánh giá hai học thuyết.',
    ],
    theory: [
      { h: 'Học thuyết Lamarck' },
      { p: 'Lamarck cho rằng sinh vật biến đổi do tác động trực tiếp của ngoại cảnh và do tập quán hoạt động (cơ quan dùng nhiều phát triển, ít dùng tiêu biến), những biến đổi này di truyền cho đời sau.' },
      { h: 'Hạn chế của Lamarck' },
      { p: 'Lamarck cho rằng mọi biến đổi do ngoại cảnh đều di truyền, điều này không đúng vì thường biến không di truyền. Ông cũng cho rằng sinh vật luôn thích nghi kịp, không có loài bị đào thải.' },
      { h: 'Học thuyết Darwin' },
      { ul: ['Biến dị cá thể phát sinh ngẫu nhiên, là nguyên liệu của chọn lọc', 'Đấu tranh sinh tồn diễn ra do sinh vật sinh ra nhiều hơn số sống sót', 'Chọn lọc tự nhiên: cá thể có biến dị có lợi sống sót và sinh sản nhiều hơn'] },
      { h: 'Kết quả chọn lọc tự nhiên' },
      { p: 'Qua nhiều thế hệ, các đặc điểm thích nghi được tích luỹ, đặc điểm kém thích nghi bị đào thải, dẫn đến hình thành loài mới. Đây là cơ chế chính của tiến hoá theo Darwin.' },
      { note: 'Hạn chế của Darwin là chưa hiểu được nguyên nhân và cơ chế di truyền của biến dị vì thời đó chưa có di truyền học. Tuy vậy ý tưởng chọn lọc tự nhiên vẫn là nền tảng của tiến hoá hiện đại.' },
    ],
    examples: [
      { q: 'Hươu cao cổ có cổ dài. Hãy giải thích theo Lamarck và theo Darwin, chỉ ra điểm khác nhau cơ bản.', a: 'Theo Lamarck: hươu vươn cổ ăn lá cao, cổ dài ra do dùng nhiều và đặc điểm này di truyền. Theo Darwin: trong quần thể vốn có biến dị về độ dài cổ, con cổ dài hơn ăn được nhiều lá hơn nên sống sót và sinh sản nhiều, qua chọn lọc tự nhiên cổ dài được tích luỹ. Khác biệt cốt lõi: Lamarck cho biến đổi do tập quán rồi di truyền, Darwin cho biến dị có sẵn được chọn lọc.' },
      { q: 'Vì sao học thuyết Darwin được đánh giá cao hơn học thuyết Lamarck?', a: 'Vì Darwin đưa ra cơ chế chọn lọc tự nhiên dựa trên biến dị có sẵn và đấu tranh sinh tồn, giải thích đúng sự hình thành đặc điểm thích nghi và loài mới. Lamarck dựa trên giả thuyết sai rằng mọi biến đổi do ngoại cảnh đều di truyền và sinh vật luôn thích nghi kịp.' },
    ],
  },

  'H12SINH-w21-quiz': {
    topic: 'Học thuyết tiến hoá tổng hợp hiện đại',
    intro: 'Khi di truyền học ra đời, học thuyết Darwin được bổ sung và hoàn thiện thành thuyết tiến hoá tổng hợp hiện đại. Bài này giúp các em hiểu các nhân tố tiến hoá làm thay đổi vốn gene quần thể.',
    objectives: [
      'Nêu được khái niệm tiến hoá nhỏ và tiến hoá lớn.',
      'Trình bày được vai trò của các nhân tố tiến hoá.',
      'Giải thích được vai trò của chọn lọc tự nhiên đối với tiến hoá.',
    ],
    theory: [
      { h: 'Tiến hoá nhỏ và đơn vị tiến hoá' },
      { p: 'Tiến hoá nhỏ là quá trình biến đổi tần số allele và thành phần kiểu gene của quần thể, dẫn đến hình thành loài mới. Quần thể là đơn vị tiến hoá cơ sở.' },
      { h: 'Các nhân tố tiến hoá' },
      { ul: ['Đột biến: tạo allele mới, là nguồn nguyên liệu sơ cấp', 'Di nhập gene: làm thay đổi tần số allele giữa các quần thể', 'Giao phối không ngẫu nhiên: thay đổi thành phần kiểu gene, không đổi tần số allele', 'Các yếu tố ngẫu nhiên (phiêu bạt di truyền): làm biến đổi tần số allele bất kì', 'Chọn lọc tự nhiên: nhân tố định hướng tiến hoá'] },
      { h: 'Vai trò của chọn lọc tự nhiên' },
      { p: 'Chọn lọc tự nhiên tác động trực tiếp lên kiểu hình, qua đó làm thay đổi tần số allele theo một hướng xác định. Đây là nhân tố tiến hoá duy nhất có hướng, quyết định chiều hướng và nhịp điệu tiến hoá.' },
      { h: 'Nguồn biến dị di truyền' },
      { p: 'Biến dị di truyền của quần thể gồm biến dị sơ cấp (đột biến) và biến dị thứ cấp (biến dị tổ hợp từ giao phối). Chúng cung cấp nguyên liệu cho chọn lọc tự nhiên.' },
      { note: 'Phân biệt: đột biến và biến dị tổ hợp tạo nguyên liệu (vô hướng), chọn lọc tự nhiên sàng lọc và định hướng (có hướng). Phiêu bạt di truyền mạnh ở quần thể nhỏ.' },
    ],
    examples: [
      { q: 'Vì sao đột biến được coi là nguồn nguyên liệu sơ cấp còn biến dị tổ hợp là nguyên liệu thứ cấp cho tiến hoá?', a: 'Đột biến tạo ra allele mới, là biến dị di truyền đầu tiên xuất hiện nên là nguyên liệu sơ cấp. Qua giao phối, các allele tổ hợp lại theo nhiều cách tạo biến dị tổ hợp phong phú từ vốn allele có sẵn, nên gọi là nguyên liệu thứ cấp.' },
      { q: 'Trong các nhân tố tiến hoá, vì sao chỉ chọn lọc tự nhiên là nhân tố có hướng?', a: 'Đột biến, di nhập gene và phiêu bạt di truyền làm thay đổi tần số allele một cách ngẫu nhiên, không theo hướng xác định. Chọn lọc tự nhiên giữ lại kiểu hình thích nghi và đào thải kiểu hình kém thích nghi, làm tần số allele biến đổi theo hướng tăng thích nghi nên là nhân tố có hướng.' },
    ],
  },

  'H12SINH-w22-quiz': {
    topic: 'Quá trình hình thành loài và tiến hoá lớn',
    intro: 'Tiến hoá nhỏ tích luỹ dần dẫn tới hình thành loài mới và những biến đổi lớn của sinh giới. Bài này giúp các em hiểu cơ chế cách li và các con đường hình thành loài.',
    objectives: [
      'Nêu được khái niệm loài và các cơ chế cách li.',
      'Trình bày được các con đường hình thành loài.',
      'Phân biệt được tiến hoá nhỏ và tiến hoá lớn.',
    ],
    theory: [
      { h: 'Khái niệm loài và cách li' },
      { p: 'Loài là nhóm quần thể có thể giao phối với nhau sinh con hữu thụ và cách li sinh sản với các nhóm khác. Cách li sinh sản gồm cách li trước hợp tử (ngăn giao phối) và sau hợp tử (con lai bất thụ).' },
      { h: 'Vai trò của cách li' },
      { p: 'Cách li sinh sản ngăn trao đổi gene giữa các quần thể, giúp các quần thể tích luỹ khác biệt di truyền độc lập, từ đó hình thành loài mới.' },
      { h: 'Các con đường hình thành loài' },
      { ul: ['Hình thành loài khác khu vực địa lí: cách li địa lí ngăn giao phối, các quần thể tiến hoá theo hướng khác nhau', 'Hình thành loài cùng khu vực: cách li tập tính, cách li sinh thái', 'Hình thành loài bằng lai xa và đa bội hoá (phổ biến ở thực vật)'] },
      { h: 'Tiến hoá lớn' },
      { p: 'Tiến hoá lớn là quá trình hình thành các nhóm phân loại trên loài (chi, họ, bộ...) trong thời gian dài. Nó là kết quả tích luỹ của nhiều quá trình tiến hoá nhỏ.' },
      { note: 'Lai xa và đa bội hoá tạo loài mới chỉ trong một vài thế hệ, là con đường hình thành loài nhanh, đặc biệt phổ biến ở thực vật. Cách li địa lí là con đường phổ biến nhất ở động vật.' },
    ],
    examples: [
      { q: 'Hai quần thể của một loài bị một dãy núi chia cắt, sau thời gian dài không còn giao phối được với nhau. Đây là con đường hình thành loài nào?', a: 'Đó là hình thành loài khác khu vực địa lí. Dãy núi là cách li địa lí ngăn trao đổi gene, hai quần thể tích luỹ biến dị và chịu chọn lọc theo hướng khác nhau, dần xuất hiện cách li sinh sản và trở thành hai loài.' },
      { q: 'Vì sao lai xa kèm đa bội hoá có thể nhanh chóng tạo ra loài mới ở thực vật?', a: 'Con lai xa thường bất thụ do bộ NST không tương đồng không bắt cặp được. Khi đa bội hoá, mỗi NST có NST tương đồng nên giảm phân bình thường, con lai trở nên hữu thụ và cách li sinh sản với loài bố mẹ, trở thành loài mới chỉ sau một vài thế hệ.' },
    ],
  },

  'H12SINH-w23-quiz': {
    topic: 'Môi trường sống và các nhân tố sinh thái',
    intro: 'Các em chuyển sang phần Sinh thái học, bắt đầu từ mối quan hệ giữa sinh vật và môi trường. Bài này giới thiệu các nhân tố sinh thái và quy luật giới hạn sinh thái.',
    objectives: [
      'Nêu được khái niệm môi trường sống và các nhân tố sinh thái.',
      'Trình bày được giới hạn sinh thái và ổ sinh thái.',
      'Giải thích được sự thích nghi của sinh vật với môi trường.',
    ],
    theory: [
      { h: 'Môi trường và nhân tố sinh thái' },
      { p: 'Môi trường sống là nơi sinh vật sinh sống, gồm tất cả những gì bao quanh nó. Nhân tố sinh thái là những yếu tố môi trường tác động lên sinh vật, gồm nhân tố vô sinh (ánh sáng, nhiệt độ, độ ẩm) và hữu sinh (các sinh vật khác, con người).' },
      { h: 'Giới hạn sinh thái' },
      { p: 'Giới hạn sinh thái là khoảng giá trị của một nhân tố mà sinh vật tồn tại và phát triển được. Trong giới hạn có khoảng thuận lợi (sinh vật phát triển tốt nhất) và khoảng chống chịu.' },
      { h: 'Ổ sinh thái' },
      { ul: ['Ổ sinh thái là không gian sinh thái mà ở đó các nhân tố sinh thái nằm trong giới hạn cho phép loài tồn tại', 'Nơi ở là địa điểm cư trú, ổ sinh thái là cách sống của loài', 'Phân hoá ổ sinh thái giúp giảm cạnh tranh giữa các loài'] },
      { h: 'Thích nghi với môi trường' },
      { p: 'Sinh vật hình thành các đặc điểm thích nghi với nhân tố sinh thái: cây ưa sáng và ưa bóng, động vật biến nhiệt và đẳng nhiệt, thích nghi với nhiệt độ và độ ẩm khác nhau.' },
      { note: 'Loài có giới hạn sinh thái rộng với nhiều nhân tố thường phân bố rộng; loài giới hạn hẹp phân bố hẹp. Hiểu giới hạn sinh thái giúp bố trí cây trồng, vật nuôi phù hợp vùng miền.' },
    ],
    examples: [
      { q: 'Cá rô phi ở Việt Nam sống được trong khoảng 5,6 đến 42 độ C, phát triển tốt nhất ở 30 độ C. Hãy chỉ ra giới hạn sinh thái và khoảng thuận lợi về nhiệt độ.', a: 'Giới hạn sinh thái về nhiệt độ là khoảng từ 5,6 đến 42 độ C - ngoài khoảng này cá chết. Khoảng thuận lợi là quanh 30 độ C, nơi cá sinh trưởng và sinh sản tốt nhất. Hai đầu giới hạn là các khoảng chống chịu.' },
      { q: 'Vì sao trong một ao, các loài cá khác nhau có thể cùng tồn tại mà ít cạnh tranh gay gắt?', a: 'Vì các loài cá phân hoá ổ sinh thái: chúng kiếm ăn ở tầng nước khác nhau, ăn loại thức ăn khác nhau, hoạt động vào thời điểm khác nhau. Sự phân hoá này làm giảm trùng lặp về nguồn sống nên giảm cạnh tranh, giúp nhiều loài cùng tồn tại.' },
    ],
  },

  'H12SINH-w24-quiz': {
    topic: 'Quần thể sinh vật và các đặc trưng',
    intro: 'Từ cá thể, các em lên cấp tổ chức quần thể - tập hợp các cá thể cùng loài. Bài này giúp các em hiểu các mối quan hệ và đặc trưng cơ bản của quần thể.',
    objectives: [
      'Nêu được khái niệm quần thể và các quan hệ trong quần thể.',
      'Trình bày được các đặc trưng cơ bản của quần thể.',
      'Giải thích được ý nghĩa của các đặc trưng đối với quần thể.',
    ],
    theory: [
      { h: 'Khái niệm và quan hệ' },
      { p: 'Quần thể là tập hợp cá thể cùng loài, cùng sống trong một khoảng không gian và thời gian, có khả năng sinh sản tạo thế hệ mới. Trong quần thể có quan hệ hỗ trợ và quan hệ cạnh tranh.' },
      { h: 'Quan hệ hỗ trợ và cạnh tranh' },
      { ul: ['Hỗ trợ: cá thể sống quần tụ giúp nhau kiếm ăn, chống kẻ thù (hiệu quả nhóm)', 'Cạnh tranh: khi mật độ quá cao, thiếu thức ăn, nơi ở, các cá thể cạnh tranh nhau'] },
      { h: 'Các đặc trưng cơ bản' },
      { ul: ['Tỉ lệ giới tính', 'Cấu trúc tuổi (nhóm tuổi trước sinh sản, sinh sản, sau sinh sản)', 'Mật độ cá thể - đặc trưng cơ bản nhất', 'Kích thước quần thể và sự phân bố cá thể'] },
      { h: 'Tăng trưởng quần thể' },
      { p: 'Quần thể tăng trưởng theo tiềm năng sinh học (hình chữ J) khi nguồn sống dồi dào, hoặc tăng trưởng trong môi trường có giới hạn (hình chữ S) khi nguồn sống hạn chế.' },
      { note: 'Mật độ là đặc trưng quan trọng nhất vì ảnh hưởng tới mức sử dụng nguồn sống, sinh sản và tử vong. Quần thể tự điều chỉnh số lượng quanh mức cân bằng phù hợp với môi trường.' },
    ],
    examples: [
      { q: 'Vì sao khi mật độ quần thể tăng quá cao thì tỉ lệ sinh giảm và tỉ lệ tử tăng?', a: 'Mật độ quá cao khiến nguồn thức ăn, nơi ở trở nên khan hiếm, cạnh tranh gay gắt. Thiếu nguồn sống làm sinh sản giảm, đồng thời stress và bệnh tật làm tử vong tăng. Nhờ cơ chế này quần thể tự điều chỉnh số lượng về mức cân bằng.' },
      { q: 'Một quần thể có nhóm tuổi trước sinh sản chiếm tỉ lệ rất lớn. Dự đoán xu hướng phát triển của quần thể.', a: 'Nhóm trước sinh sản lớn cho thấy quần thể có nhiều cá thể sắp bước vào tuổi sinh sản. Đây là quần thể đang phát triển, số lượng cá thể trong tương lai sẽ tăng lên.' },
    ],
  },

  'H12SINH-w25-quiz': {
    topic: 'Biến động số lượng cá thể quần thể',
    intro: 'Số lượng cá thể của quần thể không cố định mà thay đổi theo thời gian. Bài này giúp các em hiểu các kiểu biến động và cơ chế điều chỉnh số lượng của quần thể.',
    objectives: [
      'Phân biệt được các kiểu biến động số lượng cá thể.',
      'Nêu được nguyên nhân gây biến động số lượng.',
      'Giải thích được cơ chế điều chỉnh số lượng của quần thể.',
    ],
    theory: [
      { h: 'Các kiểu biến động' },
      { ul: ['Biến động theo chu kì: theo mùa, theo năm, theo nhiều năm', 'Biến động không theo chu kì: do thiên tai, dịch bệnh bất thường'] },
      { h: 'Nguyên nhân biến động' },
      { p: 'Biến động do nhân tố vô sinh (khí hậu, nhiệt độ, độ ẩm) tác động không phụ thuộc mật độ, và nhân tố hữu sinh (cạnh tranh, thức ăn, kẻ thù, dịch bệnh) tác động phụ thuộc mật độ.' },
      { h: 'Cơ chế điều chỉnh' },
      { p: 'Quần thể điều chỉnh số lượng thông qua thay đổi tỉ lệ sinh, tử, xuất cư và nhập cư. Khi số lượng vượt sức chứa của môi trường, sinh giảm tử tăng đưa số lượng về mức cân bằng và ngược lại.' },
      { h: 'Trạng thái cân bằng' },
      { p: 'Trạng thái cân bằng là khi số lượng cá thể ổn định, phù hợp với khả năng cung cấp nguồn sống của môi trường. Đây là kết quả của quá trình tự điều chỉnh.' },
      { note: 'Nhân tố vô sinh tác động không phụ thuộc mật độ; nhân tố hữu sinh tác động phụ thuộc mật độ. Hiểu biến động số lượng giúp khai thác hợp lí và bảo vệ các loài sinh vật.' },
    ],
    examples: [
      { q: 'Số lượng muỗi tăng mạnh vào mùa mưa và giảm vào mùa khô. Đây là kiểu biến động gì và do nhân tố nào chi phối?', a: 'Đó là biến động theo chu kì mùa. Nhân tố chi phối chủ yếu là nhân tố vô sinh - độ ẩm và lượng nước (mùa mưa nhiều nơi đẻ trứng và phát triển ấu trùng), tác động không phụ thuộc mật độ quần thể.' },
      { q: 'Vì sao cơ chế tự điều chỉnh số lượng có ý nghĩa quan trọng đối với quần thể?', a: 'Cơ chế tự điều chỉnh giúp số lượng cá thể luôn phù hợp với khả năng cung cấp nguồn sống của môi trường, tránh tình trạng quá đông gây cạn kiệt nguồn sống hoặc quá ít dẫn đến nguy cơ tuyệt chủng. Nhờ đó quần thể tồn tại ổn định lâu dài.' },
    ],
  },

  'H12SINH-w26-quiz': {
    topic: 'Quần xã sinh vật và các đặc trưng',
    intro: 'Nhiều quần thể khác loài cùng sống trong một khu vực tạo thành quần xã. Bài này giúp các em hiểu các đặc trưng của quần xã và hiện tượng khống chế sinh học.',
    objectives: [
      'Nêu được khái niệm quần xã sinh vật.',
      'Trình bày được các đặc trưng cơ bản của quần xã.',
      'Giải thích được hiện tượng khống chế sinh học.',
    ],
    theory: [
      { h: 'Khái niệm quần xã' },
      { p: 'Quần xã là tập hợp các quần thể sinh vật thuộc nhiều loài khác nhau, cùng sống trong một không gian và thời gian nhất định, có quan hệ gắn bó như một thể thống nhất.' },
      { h: 'Đặc trưng về thành phần loài' },
      { ul: ['Độ đa dạng loài: số loài và số cá thể của mỗi loài', 'Loài ưu thế: loài có vai trò quan trọng, số lượng nhiều', 'Loài đặc trưng: chỉ có ở một quần xã nhất định'] },
      { h: 'Đặc trưng về phân bố' },
      { p: 'Các cá thể trong quần xã phân bố theo chiều thẳng đứng (phân tầng) và chiều ngang. Sự phân tầng giúp tận dụng nguồn sống và giảm cạnh tranh giữa các loài.' },
      { h: 'Khống chế sinh học' },
      { p: 'Khống chế sinh học là hiện tượng số lượng cá thể của một loài bị khống chế ở mức nhất định bởi loài khác (vật ăn thịt, vật kí sinh). Hiện tượng này được ứng dụng trong phòng trừ sinh học.' },
      { note: 'Quần xã càng đa dạng loài thì cấu trúc càng phức tạp và càng ổn định. Khống chế sinh học giúp giảm thuốc trừ sâu, bảo vệ môi trường trong nông nghiệp.' },
    ],
    examples: [
      { q: 'Trong một khu rừng, thực vật phân thành tầng vượt tán, tầng tán, tầng cây bụi và tầng thảm. Sự phân tầng này có ý nghĩa gì?', a: 'Phân tầng giúp các loài cây tận dụng ánh sáng và không gian ở các độ cao khác nhau, giảm cạnh tranh về ánh sáng và nguồn sống. Nhờ đó nhiều loài cùng tồn tại, làm tăng độ đa dạng và sự ổn định của quần xã.' },
      { q: 'Người ta thả ong mắt đỏ để diệt sâu hại lúa. Biện pháp này dựa trên hiện tượng sinh thái nào?', a: 'Dựa trên hiện tượng khống chế sinh học. Ong mắt đỏ kí sinh diệt trứng sâu hại, làm số lượng sâu bị khống chế ở mức thấp. Đây là biện pháp đấu tranh sinh học, hạn chế dùng thuốc hoá học, bảo vệ môi trường.' },
    ],
  },

  'H12SINH-w27-quiz': {
    topic: 'Quan hệ giữa các loài trong quần xã',
    intro: 'Các loài trong quần xã không sống tách biệt mà liên hệ chặt chẽ với nhau. Bài này giúp các em phân biệt các mối quan hệ hỗ trợ và đối kháng giữa các loài.',
    objectives: [
      'Phân biệt được các quan hệ hỗ trợ giữa các loài.',
      'Phân biệt được các quan hệ đối kháng giữa các loài.',
      'Nêu được ý nghĩa của các quan hệ trong quần xã.',
    ],
    theory: [
      { h: 'Quan hệ hỗ trợ' },
      { ul: ['Cộng sinh: hai loài cùng có lợi và phụ thuộc nhau (vi khuẩn nốt sần và cây họ Đậu)', 'Hợp tác: hai loài cùng có lợi nhưng không bắt buộc', 'Hội sinh: một loài có lợi, loài kia không lợi không hại'] },
      { h: 'Quan hệ đối kháng' },
      { ul: ['Cạnh tranh: các loài tranh giành nguồn sống, cả hai cùng bị hại', 'Kí sinh: một loài sống nhờ và gây hại cho vật chủ', 'Ức chế - cảm nhiễm: một loài tiết chất gây hại cho loài khác', 'Sinh vật này ăn sinh vật khác: vật ăn thịt - con mồi, thực vật ăn sâu bọ'] },
      { h: 'Ý nghĩa quan hệ con mồi - vật ăn thịt' },
      { p: 'Quan hệ vật ăn thịt - con mồi giúp khống chế số lượng các loài, tạo cân bằng sinh học và là động lực chọn lọc tự nhiên giúp cả hai loài tiến hoá.' },
      { h: 'Phân biệt cộng sinh và hội sinh' },
      { p: 'Cộng sinh thì cả hai loài đều có lợi và không thể thiếu nhau; hội sinh chỉ một loài có lợi, loài kia trung tính (không lợi không hại).' },
      { note: 'Quy ước dấu: cộng sinh, hợp tác (+ +), hội sinh (+ 0), cạnh tranh (- -), kí sinh và vật ăn thịt (+ -). Nhớ dấu giúp các em phân loại nhanh các mối quan hệ.' },
    ],
    examples: [
      { q: 'Vi khuẩn Rhizobium sống trong nốt sần rễ cây họ Đậu, cung cấp đạm cho cây và nhận chất hữu cơ từ cây. Đây là quan hệ gì?', a: 'Đó là quan hệ cộng sinh. Cả hai loài đều có lợi và phụ thuộc chặt chẽ vào nhau: vi khuẩn cố định đạm cung cấp cho cây, cây cung cấp chất hữu cơ và nơi ở cho vi khuẩn. Quy ước dấu là (+ +).' },
      { q: 'Vì sao quan hệ cạnh tranh giữa các loài lại được xem là động lực thúc đẩy tiến hoá?', a: 'Cạnh tranh làm các loài có nguồn sống trùng nhau bị thiệt hại. Để tồn tại, mỗi loài có xu hướng phân hoá ổ sinh thái, thích nghi theo hướng khác nhau để giảm cạnh tranh. Quá trình chọn lọc này thúc đẩy sự phân li và tiến hoá của các loài.' },
    ],
  },

  'H12SINH-w28-quiz': {
    topic: 'Hệ sinh thái',
    intro: 'Quần xã sinh vật cùng môi trường vô sinh của nó tạo thành hệ sinh thái - đơn vị hoàn chỉnh của sinh thái học. Bài này giúp các em hiểu cấu trúc và các thành phần của hệ sinh thái.',
    objectives: [
      'Nêu được khái niệm và cấu trúc của hệ sinh thái.',
      'Phân biệt được các thành phần của hệ sinh thái.',
      'Phân loại được các kiểu hệ sinh thái chủ yếu.',
    ],
    theory: [
      { h: 'Khái niệm hệ sinh thái' },
      { p: 'Hệ sinh thái gồm quần xã sinh vật và sinh cảnh (môi trường vô sinh), trong đó các sinh vật tương tác với nhau và với môi trường tạo thành một hệ thống hoàn chỉnh, tự điều chỉnh.' },
      { h: 'Các thành phần cấu trúc' },
      { ul: ['Thành phần vô sinh (sinh cảnh): khí hậu, đất, nước, chất vô cơ và hữu cơ', 'Sinh vật sản xuất: thực vật, tảo - tự tổng hợp chất hữu cơ', 'Sinh vật tiêu thụ: động vật ăn thực vật và động vật', 'Sinh vật phân giải: vi khuẩn, nấm - phân huỷ chất hữu cơ'] },
      { h: 'Các kiểu hệ sinh thái' },
      { p: 'Có hệ sinh thái tự nhiên (trên cạn như rừng, savan; dưới nước như ao, biển) và hệ sinh thái nhân tạo (đồng ruộng, hồ nuôi, thành phố) do con người tạo ra và duy trì.' },
      { h: 'Khả năng tự điều chỉnh' },
      { p: 'Hệ sinh thái có khả năng tự điều chỉnh để duy trì trạng thái cân bằng. Hệ càng đa dạng, nhiều mối quan hệ thì khả năng tự điều chỉnh và ổn định càng cao.' },
      { note: 'Hệ sinh thái nhân tạo thường kém đa dạng, kém ổn định, phụ thuộc nhiều vào sự chăm sóc và bổ sung năng lượng của con người so với hệ sinh thái tự nhiên.' },
    ],
    examples: [
      { q: 'Phân biệt vai trò của sinh vật sản xuất, sinh vật tiêu thụ và sinh vật phân giải trong hệ sinh thái.', a: 'Sinh vật sản xuất (thực vật) tự tổng hợp chất hữu cơ từ chất vô cơ nhờ quang hợp, mở đầu chuỗi thức ăn. Sinh vật tiêu thụ (động vật) sử dụng chất hữu cơ có sẵn. Sinh vật phân giải (vi khuẩn, nấm) phân huỷ xác chết và chất thải thành chất vô cơ, trả lại cho môi trường.' },
      { q: 'Vì sao hệ sinh thái đồng ruộng kém ổn định hơn hệ sinh thái rừng tự nhiên?', a: 'Đồng ruộng thường chỉ trồng một vài loài, độ đa dạng thấp nên ít mối quan hệ và khả năng tự điều chỉnh kém. Khi gặp sâu bệnh hay biến động, hệ dễ mất cân bằng và phải nhờ con người can thiệp. Rừng tự nhiên đa dạng loài nên ổn định và tự điều chỉnh tốt hơn.' },
    ],
  },

  'H12SINH-w29-quiz': {
    topic: 'Trao đổi vật chất trong hệ sinh thái',
    intro: 'Trong hệ sinh thái, vật chất và năng lượng được luân chuyển qua các sinh vật theo chuỗi và lưới thức ăn. Bài này giúp các em hiểu các khái niệm này và bậc dinh dưỡng.',
    objectives: [
      'Nêu được khái niệm chuỗi và lưới thức ăn.',
      'Phân biệt được các bậc dinh dưỡng.',
      'Đọc và phân tích được tháp sinh thái.',
    ],
    theory: [
      { h: 'Chuỗi thức ăn' },
      { p: 'Chuỗi thức ăn là một dãy các loài có quan hệ dinh dưỡng, loài đứng trước là thức ăn cho loài đứng sau. Có chuỗi mở đầu bằng sinh vật sản xuất và chuỗi mở đầu bằng mùn bã hữu cơ.' },
      { h: 'Lưới thức ăn' },
      { p: 'Trong quần xã, một loài thường tham gia nhiều chuỗi thức ăn, các chuỗi liên kết với nhau tạo thành lưới thức ăn. Lưới càng phức tạp thì quần xã càng ổn định.' },
      { h: 'Bậc dinh dưỡng' },
      { ul: ['Bậc dinh dưỡng cấp 1: sinh vật sản xuất', 'Bậc dinh dưỡng cấp 2: sinh vật tiêu thụ bậc 1 (ăn thực vật)', 'Bậc dinh dưỡng cấp 3 trở lên: các sinh vật ăn thịt'] },
      { h: 'Tháp sinh thái' },
      { p: 'Tháp sinh thái biểu diễn số lượng cá thể, sinh khối hoặc năng lượng ở mỗi bậc dinh dưỡng. Tháp năng lượng luôn có đáy lớn đỉnh nhỏ vì năng lượng giảm dần qua các bậc.' },
      { note: 'Lưới thức ăn càng phức tạp, nhiều mắt xích thay thế thì quần xã càng ổn định. Khi một mắt xích biến mất, các loài có thể chuyển sang nguồn thức ăn khác.' },
    ],
    examples: [
      { q: 'Cho chuỗi thức ăn: cỏ -> châu chấu -> ếch -> rắn. Xác định bậc dinh dưỡng của ếch và rắn.', a: 'Cỏ là bậc dinh dưỡng cấp 1 (sinh vật sản xuất), châu chấu cấp 2, ếch cấp 3, rắn cấp 4. Ếch là sinh vật tiêu thụ bậc 2 (bậc dinh dưỡng cấp 3), rắn là sinh vật tiêu thụ bậc 3 (bậc dinh dưỡng cấp 4).' },
      { q: 'Vì sao quần xã có lưới thức ăn phức tạp thường ổn định hơn quần xã có chuỗi thức ăn đơn giản?', a: 'Trong lưới phức tạp, mỗi loài có nhiều nguồn thức ăn và nhiều loài ăn nó. Khi một loài giảm số lượng hoặc biến mất, các loài khác có thể chuyển sang mắt xích thay thế nên hệ ít bị xáo trộn. Chuỗi đơn giản dễ sụp đổ khi một mắt xích mất đi.' },
    ],
  },

  'H12SINH-w30-quiz': {
    topic: 'Chu trình sinh địa hoá',
    intro: 'Các chất như carbon, nitơ, nước luân chuyển không ngừng giữa sinh vật và môi trường. Bài này giúp các em hiểu các chu trình sinh địa hoá chủ yếu và vai trò của chúng.',
    objectives: [
      'Nêu được khái niệm chu trình sinh địa hoá.',
      'Trình bày được chu trình carbon, nitơ và nước.',
      'Liên hệ tác động của con người tới các chu trình.',
    ],
    theory: [
      { h: 'Khái niệm' },
      { p: 'Chu trình sinh địa hoá là sự trao đổi liên tục các chất giữa môi trường và sinh vật, rồi từ sinh vật trở lại môi trường. Nhờ đó các chất được tuần hoàn và tái sử dụng.' },
      { h: 'Chu trình carbon' },
      { p: 'CO2 được thực vật hấp thụ qua quang hợp, biến thành chất hữu cơ, truyền qua chuỗi thức ăn, rồi trả lại khí quyển qua hô hấp, phân giải và đốt cháy nhiên liệu hoá thạch.' },
      { h: 'Chu trình nitơ' },
      { ul: ['Vi khuẩn cố định đạm chuyển N2 khí quyển thành dạng cây hấp thụ được', 'Cây và động vật sử dụng nitơ tạo protein', 'Vi khuẩn phản nitrat trả N2 về khí quyển'] },
      { h: 'Chu trình nước' },
      { p: 'Nước bốc hơi từ mặt đất, đại dương, ngưng tụ thành mưa, một phần được sinh vật sử dụng rồi trả lại qua thoát hơi nước và bài tiết. Nước điều hoà khí hậu và là môi trường sống.' },
      { note: 'Con người đốt nhiên liệu hoá thạch và phá rừng làm tăng CO2 khí quyển, gây hiệu ứng nhà kính. Hiểu chu trình sinh địa hoá giúp giải thích biến đổi khí hậu và đề ra biện pháp bảo vệ môi trường.' },
    ],
    examples: [
      { q: 'Vì sao việc trồng cây gây rừng được coi là biện pháp giảm hiệu ứng nhà kính?', a: 'Cây xanh quang hợp hấp thụ CO2 trong khí quyển để tổng hợp chất hữu cơ, đồng thời tích luỹ carbon trong sinh khối. Trồng rừng làm tăng lượng CO2 được hấp thụ, giảm nồng độ CO2 - khí gây hiệu ứng nhà kính - trong không khí.' },
      { q: 'Vai trò của vi khuẩn cố định đạm trong chu trình nitơ là gì?', a: 'Khí nitơ (N2) chiếm phần lớn khí quyển nhưng cây không hấp thụ trực tiếp được. Vi khuẩn cố định đạm chuyển N2 thành dạng hợp chất nitơ mà cây sử dụng được, nhờ đó cung cấp nguồn đạm cho cây và duy trì chu trình nitơ trong tự nhiên.' },
    ],
  },

  'H12SINH-w31-quiz': {
    topic: 'Dòng năng lượng trong hệ sinh thái',
    intro: 'Khác với vật chất tuần hoàn, năng lượng chỉ đi một chiều và giảm dần qua các bậc dinh dưỡng. Bài này giúp các em hiểu dòng năng lượng và hiệu suất sinh thái.',
    objectives: [
      'Trình bày được dòng năng lượng trong hệ sinh thái.',
      'Giải thích được vì sao năng lượng giảm dần qua các bậc dinh dưỡng.',
      'Tính được hiệu suất sinh thái.',
    ],
    theory: [
      { h: 'Nguồn và dòng năng lượng' },
      { p: 'Năng lượng của hầu hết hệ sinh thái bắt nguồn từ ánh sáng Mặt Trời. Thực vật chuyển năng lượng ánh sáng thành hoá năng, rồi truyền qua các bậc dinh dưỡng và cuối cùng thất thoát dưới dạng nhiệt.' },
      { h: 'Năng lượng đi một chiều' },
      { p: 'Khác với vật chất tuần hoàn, năng lượng chỉ truyền một chiều từ sinh vật sản xuất lên các bậc tiêu thụ và không quay vòng. Phần lớn năng lượng bị mất qua hô hấp và toả nhiệt ở mỗi bậc.' },
      { h: 'Quy luật hình tháp năng lượng' },
      { ul: ['Trung bình chỉ khoảng 10% năng lượng được truyền lên bậc dinh dưỡng kế tiếp', 'Khoảng 90% năng lượng mất qua hô hấp, bài tiết, chất thải', 'Vì vậy chuỗi thức ăn thường chỉ có 4 đến 5 mắt xích'] },
      { h: 'Hiệu suất sinh thái' },
      { p: 'Hiệu suất sinh thái là tỉ lệ phần trăm năng lượng chuyển hoá giữa các bậc dinh dưỡng. Hiệu suất = (năng lượng bậc sau / năng lượng bậc trước) x 100%.' },
      { note: 'Vì năng lượng hao hụt lớn qua mỗi bậc, chuỗi thức ăn không thể dài vô tận. Đây cũng là lí do ăn thực vật (gần nguồn năng lượng) hiệu quả hơn ăn động vật bậc cao.' },
    ],
    examples: [
      { q: 'Bậc dinh dưỡng cấp 1 tích luỹ 10^6 kcal, hiệu suất sinh thái mỗi bậc là 10%. Tính năng lượng ở bậc dinh dưỡng cấp 3.', a: 'Bậc cấp 2 = 10^6 x 10% = 10^5 kcal. Bậc cấp 3 = 10^5 x 10% = 10^4 kcal. Vậy năng lượng ở bậc dinh dưỡng cấp 3 là 10^4 kcal (mười nghìn kcal).' },
      { q: 'Vì sao chuỗi thức ăn trong tự nhiên thường chỉ có 4 đến 5 mắt xích?', a: 'Vì qua mỗi bậc dinh dưỡng chỉ khoảng 10% năng lượng được truyền lên bậc tiếp theo, phần lớn mất qua hô hấp và toả nhiệt. Sau vài bậc, năng lượng còn lại quá ít, không đủ nuôi một bậc dinh dưỡng cao hơn nên chuỗi không thể kéo dài.' },
    ],
  },

  'H12SINH-w32-quiz': {
    topic: 'Diễn thế sinh thái',
    intro: 'Quần xã sinh vật không bất biến mà thay đổi tuần tự theo thời gian. Bài này giúp các em hiểu quá trình diễn thế sinh thái và ý nghĩa của nó.',
    objectives: [
      'Nêu được khái niệm diễn thế sinh thái.',
      'Phân biệt được diễn thế nguyên sinh và thứ sinh.',
      'Nêu được nguyên nhân và ý nghĩa của diễn thế.',
    ],
    theory: [
      { h: 'Khái niệm' },
      { p: 'Diễn thế sinh thái là quá trình biến đổi tuần tự của quần xã qua các giai đoạn, từ một quần xã khởi đầu dần thay thế bằng các quần xã khác, cuối cùng đạt quần xã ổn định (đỉnh cực).' },
      { h: 'Diễn thế nguyên sinh' },
      { p: 'Bắt đầu từ môi trường chưa có sinh vật (đảo mới, đất trống trơ). Các sinh vật tiên phong đến trước, dần cải tạo môi trường, các quần xã thay thế nhau cho đến quần xã đỉnh cực.' },
      { h: 'Diễn thế thứ sinh' },
      { p: 'Xảy ra ở môi trường đã từng có quần xã nhưng bị huỷ hoại (cháy rừng, nương rẫy bỏ hoang). Quần xã mới hình thành lại từ những sinh vật còn sót và xâm nhập.' },
      { h: 'Nguyên nhân và ý nghĩa' },
      { ul: ['Nguyên nhân bên ngoài: thay đổi khí hậu, thiên tai, tác động con người', 'Nguyên nhân bên trong: cạnh tranh giữa các loài làm thay đổi quần xã', 'Ý nghĩa: dự đoán xu hướng phát triển để khai thác và phục hồi hợp lí'] },
      { note: 'Diễn thế thứ sinh do con người gây ra (phá rừng, khai thác cạn kiệt) thường dẫn đến quần xã suy thoái. Hiểu diễn thế giúp con người chủ động bảo vệ và phục hồi hệ sinh thái.' },
    ],
    examples: [
      { q: 'Một vùng đất sau cháy rừng dần được phủ xanh trở lại bằng cỏ, cây bụi rồi cây gỗ. Đây là kiểu diễn thế nào?', a: 'Đó là diễn thế thứ sinh, vì xảy ra trên nền môi trường đã từng có quần xã (rừng) nhưng bị huỷ hoại bởi cháy. Quần xã được phục hồi tuần tự từ cỏ, cây bụi đến cây gỗ, có thể tiến tới quần xã rừng ổn định nếu không bị tác động.' },
      { q: 'Vì sao hiểu biết về diễn thế sinh thái lại có ý nghĩa trong quản lí và bảo vệ tài nguyên?', a: 'Hiểu diễn thế giúp dự đoán hướng biến đổi của quần xã, từ đó con người chủ động khai thác hợp lí, tránh làm gián đoạn diễn thế, đồng thời có thể chủ động phục hồi các hệ sinh thái đã suy thoái và xây dựng kế hoạch sử dụng tài nguyên bền vững.' },
    ],
  },

  'H12SINH-w33-quiz': {
    topic: 'Sinh thái phục hồi, bảo tồn và phát triển bền vững',
    intro: 'Khép lại phần Sinh thái học, bài này giúp các em nhìn vào trách nhiệm của con người: phục hồi hệ sinh thái, bảo tồn đa dạng sinh học và phát triển bền vững.',
    objectives: [
      'Nêu được khái niệm sinh thái phục hồi và bảo tồn.',
      'Trình bày được các biện pháp sử dụng bền vững tài nguyên.',
      'Nêu được trách nhiệm của bản thân trong bảo vệ môi trường.',
    ],
    theory: [
      { h: 'Sinh quyển và đa dạng sinh học' },
      { p: 'Sinh quyển là toàn bộ sinh vật và môi trường sống của chúng trên Trái Đất. Đa dạng sinh học là sự phong phú về loài, gene và hệ sinh thái, là nguồn tài nguyên quý cần được bảo vệ.' },
      { h: 'Sinh thái phục hồi và bảo tồn' },
      { ul: ['Sinh thái phục hồi: tái tạo các hệ sinh thái đã bị suy thoái', 'Bảo tồn tại chỗ: bảo vệ loài trong môi trường tự nhiên (vườn quốc gia, khu bảo tồn)', 'Bảo tồn chuyển chỗ: nuôi giữ loài ở vườn thú, ngân hàng gene'] },
      { h: 'Sử dụng bền vững tài nguyên' },
      { p: 'Phát triển bền vững là phát triển đáp ứng nhu cầu hiện tại mà không làm tổn hại đến thế hệ tương lai. Cần sử dụng hợp lí tài nguyên tái sinh, tiết kiệm tài nguyên không tái sinh, giảm ô nhiễm.' },
      { h: 'Trách nhiệm bảo vệ môi trường' },
      { p: 'Mỗi cá nhân cần tiết kiệm năng lượng, hạn chế rác thải nhựa, trồng cây, bảo vệ động vật hoang dã và tuyên truyền nâng cao ý thức cộng đồng.' },
      { note: 'Bảo vệ đa dạng sinh học và phát triển bền vững là điều kiện sống còn của loài người. Các em hãy bắt đầu từ những hành động nhỏ trong đời sống hằng ngày.' },
    ],
    examples: [
      { q: 'Phân biệt bảo tồn tại chỗ và bảo tồn chuyển chỗ, cho ví dụ.', a: 'Bảo tồn tại chỗ là bảo vệ loài ngay trong môi trường sống tự nhiên, ví dụ lập vườn quốc gia Cúc Phương để bảo vệ rừng và các loài. Bảo tồn chuyển chỗ là di chuyển loài tới nơi khác để chăm sóc, ví dụ nuôi giữ trong vườn thú hoặc lưu trữ hạt giống, tinh trùng trong ngân hàng gene.' },
      { q: 'Vì sao mất đa dạng sinh học lại đe doạ sự phát triển bền vững của con người?', a: 'Đa dạng sinh học cung cấp lương thực, dược liệu, nguyên liệu và các dịch vụ sinh thái như điều hoà khí hậu, làm sạch nước. Khi đa dạng sinh học suy giảm, các hệ sinh thái mất ổn định, nguồn tài nguyên cạn kiệt, ảnh hưởng trực tiếp đến đời sống và sự phát triển lâu dài của con người.' },
    ],
  },

  'H12SINH-w34-quiz': {
    topic: 'Ôn tập tổng hợp cả năm',
    intro: 'Các em đã hoàn thành toàn bộ chương trình Sinh học 12. Bài ôn tập này hệ thống lại ba mạch lớn: Di truyền học, Tiến hoá và Sinh thái học để chuẩn bị thi tốt nghiệp.',
    objectives: [
      'Hệ thống hoá kiến thức Di truyền, Tiến hoá, Sinh thái.',
      'Nắm vững mối liên hệ giữa ba phần kiến thức.',
      'Rèn kĩ năng giải đề tổng hợp.',
    ],
    theory: [
      { h: 'Mạch Di truyền học' },
      { p: 'Từ di truyền phân tử (DNA, gene, phiên mã, dịch mã, đột biến) đến di truyền NST, các quy luật di truyền và di truyền quần thể. Đây là phần có nhiều dạng bài tập tính toán.' },
      { h: 'Mạch Tiến hoá' },
      { ul: ['Bằng chứng tiến hoá', 'Học thuyết Lamarck, Darwin và thuyết tiến hoá hiện đại', 'Các nhân tố tiến hoá và chọn lọc tự nhiên', 'Hình thành loài và tiến hoá lớn'] },
      { h: 'Mạch Sinh thái học' },
      { ul: ['Cá thể và môi trường, giới hạn sinh thái', 'Quần thể, quần xã và các đặc trưng', 'Hệ sinh thái, chu trình vật chất và dòng năng lượng', 'Bảo vệ môi trường, phát triển bền vững'] },
      { h: 'Liên hệ giữa ba phần' },
      { p: 'Di truyền cung cấp biến dị làm nguyên liệu cho tiến hoá; tiến hoá tạo ra sự đa dạng các loài; các loài tương tác trong hệ sinh thái. Ba mạch gắn bó tạo nên bức tranh sinh học hoàn chỉnh.' },
      { note: 'Khi ôn thi tốt nghiệp, các em nắm chắc công thức di truyền, phân biệt các nhân tố tiến hoá và các mối quan hệ sinh thái. Đây là ba nhóm câu hỏi xuất hiện nhiều nhất.' },
    ],
    examples: [
      { q: 'Hãy chỉ ra mối liên hệ giữa đột biến gene (di truyền) và quá trình tiến hoá.', a: 'Đột biến gene tạo ra các allele mới, làm tăng tính đa dạng di truyền của quần thể. Đây là nguồn nguyên liệu sơ cấp để chọn lọc tự nhiên sàng lọc. Như vậy kiến thức di truyền giải thích nguồn gốc của biến dị - cơ sở cho mọi quá trình tiến hoá.' },
      { q: 'Một quần thể cân bằng Hardy - Weinberg có tần số allele lặn gây bệnh là 0,1. Tỉ lệ người mang gene bệnh ở thể dị hợp là bao nhiêu?', a: 'Tần số allele a = q = 0,1 nên p = 0,9. Tỉ lệ thể dị hợp (mang gene bệnh nhưng không biểu hiện) = 2pq = 2 x 0,9 x 0,1 = 0,18, tức 18% dân số.' },
    ],
  },

  'H12SINH-w35-quiz': {
    topic: 'Tổng ôn - chuẩn bị thi tốt nghiệp THPT',
    intro: 'Tuần cuối cùng, các em cùng tổng ôn các dạng bài trọng tâm và rèn kĩ năng làm bài để bước vào kì thi tốt nghiệp THPT một cách tự tin.',
    objectives: [
      'Củng cố các dạng bài tập và câu hỏi trọng tâm thi tốt nghiệp.',
      'Rèn chiến lược làm bài và phân bổ thời gian.',
      'Tự tin và giữ tâm lí ổn định khi thi.',
    ],
    theory: [
      { h: 'Các dạng bài tập trọng tâm' },
      { ul: ['Bài tập DNA, gene: tính nucleotide, liên kết hydrogen, số amino acid', 'Bài tập quy luật di truyền: Mendel, tương tác, liên kết và hoán vị', 'Bài tập di truyền quần thể: Hardy - Weinberg', 'Bài tập sinh thái: chuỗi thức ăn, hiệu suất sinh thái'] },
      { h: 'Câu hỏi lí thuyết hay gặp' },
      { p: 'Cơ chế di truyền phân tử, các nhân tố tiến hoá, đặc điểm quần thể - quần xã, mối quan hệ sinh thái. Câu lí thuyết thường yêu cầu phân biệt khái niệm, nên các em ôn theo cặp dễ nhầm.' },
      { h: 'Chiến lược làm bài' },
      { ul: ['Làm câu lí thuyết và câu dễ trước để lấy điểm chắc', 'Đánh dấu câu khó, quay lại sau', 'Bài tập tính toán: viết rõ công thức rồi thay số', 'Không bỏ trống câu nào, loại trừ để chọn phương án hợp lí nhất'] },
      { h: 'Chuẩn bị tâm lí và sức khoẻ' },
      { p: 'Ngủ đủ giấc, ăn uống điều độ, mang đầy đủ dụng cụ. Giữ bình tĩnh, đọc kĩ đề và phân bổ thời gian hợp lí để hoàn thành toàn bộ bài thi.' },
      { note: 'Sai lầm hay gặp: quên trừ bộ ba kết thúc và amino acid mở đầu, nhầm tỉ lệ giới tính, áp dụng Hardy - Weinberg khi quần thể chưa cân bằng, nhầm chiều dòng năng lượng và vật chất. Các em rà soát kĩ những điểm này.' },
    ],
    examples: [
      { q: 'Khi gặp bài tập di truyền chưa rõ quy luật, em nên làm gì đầu tiên?', a: 'Trước hết xác định quy luật di truyền chi phối bằng cách phân tích tỉ lệ kiểu hình đời con (3:1, 9:3:3:1, 9:7, 1:2:1...) và đặc điểm đề bài (gene trên NST thường hay giới tính, có hoán vị không). Xác định đúng quy luật rồi mới đặt kiểu gene và tính toán, tránh áp dụng nhầm công thức.' },
      { q: 'Trong phòng thi, gặp một câu bài tập khó và mất nhiều thời gian, em nên xử lí thế nào?', a: 'Nên đánh dấu câu đó và tạm bỏ qua để làm các câu khác dễ hơn trước, đảm bảo lấy trọn điểm những câu vừa sức. Khi đã hoàn thành phần còn lại và còn thời gian thì quay lại câu khó. Cách này tránh mất điểm oan vì sa lầy vào một câu.' },
    ],
  },

  'H12SINH-w36-quiz': {
    topic: 'Kết thúc Sinh Học THPT — Sự sống kỳ diệu và trách nhiệm của chúng ta',
    intro: 'Tuần cuối năm học Sinh Học — hãy bước ra khỏi các bài tập di truyền và nhìn ngắm điều kỳ diệu nhất trong vũ trụ: sự sống. Từ ADN trong mỗi tế bào đến hệ sinh thái toàn cầu, Sinh Học đặt ra câu hỏi sâu nhất về bản thể con người và trách nhiệm với Trái đất.',
    objectives: [
      'Hệ thống hoá chương trình Sinh Học 3 năm THPT theo các cấp độ tổ chức sự sống.',
      'Nhận ra ý nghĩa của Sinh Học đối với y học, nông nghiệp, môi trường và đạo đức.',
      'Xây dựng nhận thức về trách nhiệm của con người với đa dạng sinh học và hành tinh.',
    ],
    theory: [
      { h: 'Bản đồ Sinh Học 3 năm THPT — Từ gen đến sinh quyển' },
      { ul: [
        'Lớp 10: Tế bào (cấu trúc, chuyển hoá năng lượng, sinh sản tế bào), cơ thể thực vật và động vật.',
        'Lớp 11: Chuyển hoá vật chất và năng lượng ở thực vật/động vật, sinh sản, cảm ứng và điều hoà.',
        'Lớp 12: Di truyền học (Mendel, liên kết, hoán vị, ĐB gen/NST), tiến hoá (Darwin, học thuyết hiện đại), sinh thái học (quần thể, quần xã, hệ sinh thái, sinh quyển).',
      ] },
      { h: 'Sinh Học thay đổi y học và nông nghiệp' },
      { ul: [
        'Y học: Kỹ thuật CRISPR chỉnh sửa gen chữa bệnh di truyền; liệu pháp tế bào gốc tái tạo mô; vaccine mRNA (COVID-19) — tổng hợp từ ADN phiên mã ngược.',
        'Nông nghiệp: Cây GMO kháng sâu bệnh (Bt toxin từ gen vi khuẩn); giống lúa IR64 kháng lụt; thuỷ sản nuôi cấy mô.',
        'Môi trường: Vi khuẩn phân huỷ dầu tràn; nấm mốc xử lý rác thải nhựa; bảo tồn gen loài quý hiếm.',
      ] },
      { h: 'Câu hỏi sinh học đang được khoa học giải quyết' },
      { ul: [
        'Tuổi già: Tại sao tế bào lão hoá? Có thể đảo ngược không?',
        'Ung thư: Biến đổi gen nào khiến tế bào phân chia mất kiểm soát?',
        'Trí nhớ: Ký ức được mã hoá thế nào trong hệ thần kinh?',
        'Khởi nguồn sự sống: ADN hay protein xuất hiện trước — "con gà hay quả trứng" của sinh học?',
      ] },
      { h: 'Trách nhiệm của chúng ta với đa dạng sinh học' },
      { p: 'Trái đất đang trải qua đợt tuyệt chủng hàng loạt lần thứ 6 — và lần này do con người gây ra. Mỗi loài biến mất là mất đi hàng triệu năm tiến hoá, mất đi những gen có thể là chìa khoá chữa bệnh chưa biết. Sinh Học cho chúng ta biết tại sao điều đó quan trọng và phải làm gì.' },
      { note: 'Em đã học về sự sống từ trong ra ngoài: từ nucleotide trong ADN đến chuỗi thức ăn toàn cầu. Điều kỳ diệu nhất là tất cả sự đa dạng đó — cây dương xỉ, cá voi xanh, con người — đều dùng cùng một bộ mã di truyền. Chúng ta thực sự là anh em với mọi sinh vật trên Trái đất.' },
    ],
    examples: [
      { q: 'Kỹ thuật CRISPR-Cas9 là gì và tại sao nó được coi là cách mạng trong y học?', a: 'CRISPR-Cas9 là hệ thống "kéo cắt phân tử" lấy từ vi khuẩn: RNA hướng dẫn (guide RNA) dẫn protein Cas9 đến đúng vị trí trên ADN, sau đó Cas9 cắt đứt chuỗi ADN tại đó để vô hiệu hoá hoặc thay thế gen. Ứng dụng đang phát triển: chữa bệnh hồng cầu hình liềm (thalassemia), ung thư máu, mù di truyền. Lý do cách mạng: chính xác đến từng nucleotide, chi phí thấp hơn các kỹ thuật cũ 1000 lần, có thể ứng dụng trên bất kì sinh vật nào.' },
      { q: 'Giải thích tại sao mất đi một loài trong hệ sinh thái có thể gây ra hiệu ứng domino ảnh hưởng đến toàn bộ hệ sinh thái.', a: 'Ví dụ kinh điển: tuyệt chủng sói xám ở Yellowstone → hươu nai sinh sản không kiểm soát → ăn hết cỏ ven suối → bờ suối sói lở → cá giảm → chim thay đổi → toàn bộ hệ sinh thái thay đổi. Khi đưa sói trở lại (1995), chuỗi này đảo ngược trong vài thập kỉ. Đây là "trophic cascade" — loài đỉnh chuỗi thức ăn là "kỹ sư sinh thái" điều phối toàn bộ hệ thống. Suy rộng: mỗi loài biến mất đều có thể kéo theo hàng chục loài khác.' },
      { q: 'Di truyền học và tiến hoá học có mâu thuẫn với nhau không? Chúng bổ sung cho nhau như thế nào?', a: 'Không mâu thuẫn — ngược lại, di truyền học cung cấp CƠ CHẾ cho tiến hoá: đột biến gen tạo ra biến dị di truyền; chọn lọc tự nhiên giữ lại biến dị có lợi; gene flow, genetic drift và cách li sinh sản tạo ra loài mới. Thuyết tiến hoá tổng hợp hiện đại (Modern Synthesis) kết hợp Darwin (chọn lọc tự nhiên) với Mendel (di truyền) và di truyền quần thể (Hardy-Weinberg). ADN là "bằng chứng phân tử" của tiến hoá — ta có thể đọc lịch sử tiến hoá từ trình tự ADN.' },
    ],
  },
};
