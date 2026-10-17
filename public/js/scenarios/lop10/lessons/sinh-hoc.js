// ============================================================
// Lớp 10 · SINH HỌC — Lý thuyết 35 tuần (CTGD 2018 — THPT).
// Sinh học tế bào + Vi sinh vật & Virus.
// Key trùng id quiz: "H10SINH-wNN-quiz".
// Văn phong nghiêm túc cấp THPT, gọi học sinh là 'các em'.
// ============================================================

export const H10SINH_LESSONS = {
  'H10SINH-w01-quiz': {
    topic: 'Giới thiệu chương trình Sinh học 10',
    intro: 'Các em bước vào chương trình Sinh học THPT với một câu hỏi lớn: sự sống là gì và được nghiên cứu ra sao? Bài học mở đầu này giúp các em định vị đối tượng, phương pháp và các kỹ năng cốt lõi của môn Sinh học.',
    objectives: [
      'Nêu được đối tượng và vai trò của Sinh học.',
      'Trình bày được các đặc trưng cơ bản của thế giới sống.',
      'Nắm được các phương pháp nghiên cứu và quy tắc an toàn phòng thí nghiệm.',
    ],
    theory: [
      { h: 'Sinh học là gì' },
      { p: 'Sinh học (Biology) là khoa học nghiên cứu sự sống và các sinh vật, từ cấp phân tử đến cấp sinh quyển. Sinh học hiện đại liên kết chặt chẽ với y học, nông nghiệp, công nghệ và bảo vệ môi trường.' },
      { h: 'Đặc trưng của thế giới sống' },
      { ul: ['Tổ chức theo cấp bậc, lấy tế bào làm đơn vị cơ bản', 'Trao đổi chất và chuyển hoá năng lượng liên tục', 'Sinh trưởng, phát triển và sinh sản', 'Cảm ứng - phản ứng với kích thích', 'Tự điều chỉnh và tiến hoá thích nghi'] },
      { h: 'Hệ thống phân loại 5 giới' },
      { p: 'Sinh giới được chia thành 5 giới: Khởi sinh (vi khuẩn), Nguyên sinh, Nấm, Thực vật và Động vật. Cách phân loại này dựa trên cấu tạo tế bào, kiểu dinh dưỡng và mức độ tổ chức cơ thể.' },
      { h: 'Phương pháp và an toàn' },
      { p: 'Các phương pháp chính gồm quan sát, làm thí nghiệm và sử dụng dụng cụ (kính hiển vi). Mọi quan sát phải trung thực, ghi chép chính xác. Trong phòng thí nghiệm phải mang bảo hộ, xử lý mẫu và hoá chất đúng quy định.' },
      { note: 'Học Sinh học không chỉ ghi nhớ mà còn rèn tư duy quan sát, đặt câu hỏi và kiểm chứng bằng thực nghiệm.' },
    ],
    examples: [
      { q: 'Vì sao nói tế bào là đơn vị cơ bản của sự sống?', a: 'Vì tế bào là cấp tổ chức nhỏ nhất vẫn thể hiện đầy đủ các đặc trưng sống: trao đổi chất, sinh trưởng, sinh sản, cảm ứng. Một phân tử riêng lẻ không có các đặc trưng đó.' },
      { q: 'Tại sao "nóng chảy ở nhiệt độ cao" không phải đặc trưng của sự sống?', a: 'Đó là tính chất vật lý của vật chất vô sinh, không liên quan đến trao đổi chất hay sinh sản. Sự sống được nhận biết qua các đặc trưng sinh học chứ không phải tính chất vật lý đơn thuần.' },
    ],
  },

  'H10SINH-w02-quiz': {
    topic: 'Các cấp tổ chức của thế giới sống',
    intro: 'Thế giới sống không hỗn loạn mà được tổ chức chặt chẽ theo nhiều cấp bậc, từ nhỏ tới lớn. Các em sẽ thấy mỗi cấp đều có những đặc tính riêng nổi trội mà cấp dưới không có.',
    objectives: [
      'Sắp xếp đúng thứ tự các cấp tổ chức của thế giới sống.',
      'Phân biệt quần thể, quần xã, hệ sinh thái.',
      'Giải thích được khái niệm đặc tính nổi trội.',
    ],
    theory: [
      { h: 'Thang bậc tổ chức sống' },
      { p: 'Sự sống được tổ chức theo thứ tự: tế bào → mô → cơ quan → hệ cơ quan → cơ thể → quần thể → quần xã → hệ sinh thái → sinh quyển. Mỗi cấp là một hệ thống mở, trao đổi vật chất và năng lượng với môi trường.' },
      { h: 'Các cấp trên cơ thể' },
      { ul: ['Quần thể: tập hợp cá thể cùng loài, cùng khu vực sống', 'Quần xã: nhiều quần thể của các loài khác nhau cùng chung sống', 'Hệ sinh thái: quần xã sinh vật cùng môi trường vô sinh (sinh cảnh)', 'Sinh quyển: toàn bộ sinh vật và môi trường sống trên Trái Đất'] },
      { h: 'Đặc tính nổi trội' },
      { p: 'Mỗi cấp tổ chức xuất hiện đặc tính nổi trội mà các thành phần riêng lẻ không có, do sự tương tác giữa chúng tạo nên. Ví dụ một tế bào thần kinh đơn lẻ không suy nghĩ được, nhưng mạng lưới hàng tỷ nơ-ron lại tạo nên ý thức.' },
      { note: '"Tổng thể lớn hơn tổng các phần" - đó là tinh thần của các cấp tổ chức sống.' },
    ],
    examples: [
      { q: 'Một rừng ngập mặn gồm cây đước, cua, cá, vi sinh vật cùng nước và bùn là cấp tổ chức nào?', a: 'Đó là một hệ sinh thái, vì gồm quần xã sinh vật (nhiều loài) cùng tương tác với môi trường vô sinh là nước, bùn, ánh sáng.' },
      { q: 'Vì sao một đàn voi rừng được gọi là quần thể chứ không phải quần xã?', a: 'Vì đàn voi chỉ gồm các cá thể cùng một loài, sống cùng khu vực. Quần xã phải có nhiều loài khác nhau cùng chung sống.' },
    ],
  },

  'H10SINH-w03-quiz': {
    topic: 'Thành phần hoá học của tế bào — Nước',
    intro: 'Cơ thể sống được xây nên từ các nguyên tố hoá học, trong đó nước chiếm tỉ lệ lớn nhất. Các em sẽ hiểu vì sao nước lại là phân tử của sự sống.',
    objectives: [
      'Kể tên các nguyên tố chủ yếu cấu tạo nên tế bào.',
      'Giải thích cấu trúc phân cực của phân tử nước.',
      'Nêu được vai trò của nước đối với tế bào và cơ thể.',
    ],
    theory: [
      { h: 'Các nguyên tố của sự sống' },
      { p: 'Cơ thể sống được cấu tạo chủ yếu từ bốn nguyên tố C, H, O, N, chiếm hơn 96% khối lượng. Cacbon là bộ khung của mọi hợp chất hữu cơ nhờ khả năng tạo bốn liên kết bền vững. Các nguyên tố vi lượng như Fe, Cu, Zn tuy ít nhưng không thể thiếu.' },
      { h: 'Cấu trúc phân tử nước' },
      { p: 'Phân tử nước H₂O gồm một nguyên tử O liên kết cộng hoá trị với hai nguyên tử H. Do O hút electron mạnh hơn nên phân tử nước có tính phân cực: phía O tích điện âm, phía H tích điện dương.' },
      { h: 'Liên kết hydro và đặc tính nước' },
      { ul: ['Các phân tử nước hút nhau bằng liên kết hydro', 'Nước là dung môi tốt cho các chất phân cực và ion', 'Nhiệt dung riêng cao giúp điều hoà nhiệt độ', 'Có lực cố kết và sức căng bề mặt lớn'] },
      { h: 'Vai trò của nước' },
      { p: 'Nước chiếm khoảng 60-70% khối lượng cơ thể người trưởng thành. Nước là dung môi hoà tan và vận chuyển chất, là môi trường và là chất tham gia trực tiếp nhiều phản ứng hoá sinh, đồng thời điều hoà thân nhiệt.' },
      { note: 'Mất khoảng 20% lượng nước cơ thể có thể đe doạ tính mạng - đủ thấy nước quan trọng đến mức nào.' },
    ],
    examples: [
      { q: 'Vì sao nói nước là dung môi của sự sống?', a: 'Vì phân tử nước phân cực nên hoà tan được nhiều chất phân cực và các ion. Nhờ đó các chất dinh dưỡng được vận chuyển, các phản ứng sinh hoá diễn ra trong môi trường nước của tế bào.' },
      { q: 'Tại sao khi sốt cao, cơ thể đổ mồ hôi nhiều?', a: 'Đổ mồ hôi giúp thoát nhiệt: nước bốc hơi mang theo nhiệt lượng lớn nhờ nhiệt dung và nhiệt bay hơi cao, giúp hạ thân nhiệt và điều hoà nhiệt cơ thể.' },
    ],
  },

  'H10SINH-w04-quiz': {
    topic: 'Cacbohydrat và Lipid',
    intro: 'Cacbohydrat và lipid là hai nhóm hợp chất hữu cơ cung cấp và dự trữ năng lượng cho tế bào. Các em sẽ phân biệt cấu tạo và vai trò của chúng.',
    objectives: [
      'Phân loại cacbohydrat theo số đơn phân.',
      'Nêu được đặc điểm kỵ nước và vai trò của lipid.',
      'So sánh chức năng của cacbohydrat và lipid.',
    ],
    theory: [
      { h: 'Cacbohydrat (đường)' },
      { p: 'Cacbohydrat cấu tạo từ C, H, O. Đơn phân là đường đơn (monosaccharide) như glucose, fructose (công thức C₆H₁₂O₆). Hai đường đơn ghép thành đường đôi (saccharose, lactose); nhiều đường đơn ghép thành đường đa (polysaccharide).' },
      { ul: ['Glucose: nguồn năng lượng trực tiếp của tế bào', 'Tinh bột: dạng dự trữ ở thực vật', 'Glycogen: dạng dự trữ ở động vật', 'Cellulose: cấu tạo thành tế bào thực vật'] },
      { h: 'Lipid (chất béo)' },
      { p: 'Lipid là nhóm chất kỵ nước, không tan trong nước nhưng tan trong dung môi hữu cơ. Gồm mỡ, dầu (tạo từ glycerol và axit béo), photpholipid và steroid.' },
      { h: 'Vai trò của lipid' },
      { ul: ['Dự trữ năng lượng đậm đặc (1g mỡ cho gấp đôi năng lượng 1g đường)', 'Photpholipid cấu tạo màng sinh chất', 'Một số steroid là hormone (testosterone, estrogen)', 'Lớp mỡ dưới da cách nhiệt và bảo vệ cơ thể'] },
      { note: 'Đường cho năng lượng nhanh, mỡ cho năng lượng dự trữ lâu dài - mỗi loại có một vai trò riêng.' },
    ],
    examples: [
      { q: 'Vì sao động vật ngủ đông tích nhiều mỡ trước mùa đông?', a: 'Vì lipid dự trữ năng lượng đậm đặc gấp đôi cacbohydrat trên cùng khối lượng, lại cách nhiệt tốt. Lớp mỡ vừa là kho năng lượng dùng dần suốt mùa đông vừa giữ ấm cơ thể.' },
      { q: 'Tại sao photpholipid lại phù hợp để tạo màng tế bào?', a: 'Vì photpholipid có đầu ưa nước và đuôi kỵ nước. Trong môi trường nước, chúng tự sắp xếp thành lớp kép với đuôi quay vào nhau, tạo nên ranh giới linh động bao bọc tế bào.' },
    ],
  },

  'H10SINH-w05-quiz': {
    topic: 'Protein',
    intro: 'Protein là đại phân tử đa năng nhất của tế bào, đảm nhận hầu hết mọi chức năng sống. Các em sẽ tìm hiểu cấu trúc nhiều bậc và sự đa dạng chức năng của protein.',
    objectives: [
      'Xác định đơn phân và liên kết trong protein.',
      'Mô tả bốn bậc cấu trúc của protein.',
      'Nêu được các chức năng chính và hiện tượng biến tính.',
    ],
    theory: [
      { h: 'Cấu tạo protein' },
      { p: 'Protein được cấu tạo từ 20 loại axit amin. Các axit amin nối với nhau bằng liên kết peptide (-CO-NH-) tạo thành chuỗi polypeptide. Trình tự và số lượng axit amin quyết định tính đa dạng của protein.' },
      { h: 'Bốn bậc cấu trúc' },
      { ul: ['Bậc 1: trình tự các axit amin trong chuỗi', 'Bậc 2: xoắn alpha và phiến gấp beta nhờ liên kết hydro', 'Bậc 3: cuộn gập tạo cấu hình không gian ba chiều', 'Bậc 4: nhiều chuỗi polypeptide kết hợp (ví dụ hemoglobin)'] },
      { h: 'Biến tính protein' },
      { p: 'Khi gặp nhiệt độ cao, axit hoặc kim loại nặng, các liên kết yếu bị phá vỡ làm protein mất cấu hình không gian và mất chức năng - gọi là biến tính. Lòng trắng trứng đông lại khi luộc là ví dụ điển hình.' },
      { h: 'Chức năng của protein' },
      { ul: ['Xúc tác phản ứng (enzyme)', 'Cấu trúc (collagen, keratin)', 'Vận chuyển (hemoglobin chở oxy)', 'Bảo vệ (kháng thể), vận động (actin, myosin), điều hoà (hormone)'] },
      { note: 'Cấu trúc quyết định chức năng - thay đổi cấu hình không gian là protein mất tác dụng.' },
    ],
    examples: [
      { q: 'Vì sao khi luộc trứng, lòng trắng từ trong suốt chuyển sang trắng đục và rắn lại?', a: 'Nhiệt độ cao làm protein albumin trong lòng trắng bị biến tính: các liên kết yếu bị phá vỡ, chuỗi polypeptide bung ra rồi kết tụ lại, làm protein mất cấu hình ban đầu và đông đặc.' },
      { q: 'Tại sao protein lại đa dạng đến vậy dù chỉ có 20 loại axit amin?', a: 'Vì với mỗi vị trí trong chuỗi có thể là một trong 20 axit amin, số tổ hợp về trình tự và độ dài là vô cùng lớn. Mỗi trình tự cho một cấu hình và chức năng riêng.' },
    ],
  },

  'H10SINH-w06-quiz': {
    topic: 'Axit nucleic — ADN và ARN',
    intro: 'Axit nucleic là phân tử lưu giữ và truyền đạt thông tin di truyền. Các em sẽ so sánh cấu trúc của ADN và ARN cùng nguyên tắc bổ sung kỳ diệu giữa các bazơ.',
    objectives: [
      'Xác định đơn phân của axit nucleic.',
      'So sánh cấu trúc ADN và ARN.',
      'Vận dụng nguyên tắc bổ sung A-T, G-X.',
    ],
    theory: [
      { h: 'Đơn phân nucleotide' },
      { p: 'Axit nucleic được cấu tạo từ các nucleotide. Mỗi nucleotide gồm ba thành phần: bazơ nitơ, đường 5 cacbon và nhóm phosphate. Các nucleotide nối nhau tạo chuỗi polynucleotide.' },
      { h: 'Cấu trúc ADN' },
      { p: 'ADN là chuỗi xoắn kép (mô hình Watson-Crick), gồm hai mạch đối song song xoắn quanh một trục. Bazơ gồm bốn loại A, T, G, X. Hai mạch liên kết theo nguyên tắc bổ sung: A bắt cặp T bằng 2 liên kết hydro, G bắt cặp X bằng 3 liên kết hydro.' },
      { h: 'Cấu trúc ARN' },
      { ul: ['ARN là chuỗi đơn (một mạch)', 'Dùng bazơ Uracil (U) thay cho Thymine (T)', 'Có ba loại chính: mARN, tARN, rARN', 'Kích thước nhỏ hơn ADN'] },
      { h: 'Chức năng' },
      { p: 'ADN lưu giữ thông tin di truyền và truyền qua các thế hệ. mARN truyền thông tin từ ADN ra ribosome, tARN vận chuyển axit amin, rARN tham gia cấu tạo ribosome.' },
      { note: 'Nguyên tắc bổ sung A-T, G-X là chìa khoá để ADN tự nhân đôi chính xác.' },
    ],
    examples: [
      { q: 'Một đoạn mạch ADN có trình tự A-G-X-T, hãy viết mạch bổ sung.', a: 'Theo nguyên tắc bổ sung A-T, G-X, mạch bổ sung là T-X-G-A. Mỗi A đối diện T, mỗi G đối diện X và ngược lại.' },
      { q: 'Vì sao G-X liên kết bền hơn A-T?', a: 'Vì cặp G-X có 3 liên kết hydro còn cặp A-T chỉ có 2 liên kết hydro. Số liên kết hydro nhiều hơn nên cặp G-X bền hơn; đoạn ADN giàu G-X khó tách mạch hơn khi đun nóng.' },
    ],
  },

  'H10SINH-w07-quiz': {
    topic: 'Tế bào nhân sơ',
    intro: 'Tế bào nhân sơ là dạng tế bào đơn giản và cổ xưa nhất, đại diện là vi khuẩn. Các em sẽ tìm hiểu cấu tạo tối giản nhưng hiệu quả của chúng.',
    objectives: [
      'Nêu được đặc điểm chung của tế bào nhân sơ.',
      'Mô tả các thành phần cấu tạo của vi khuẩn.',
      'Giải thích lợi thế của kích thước nhỏ.',
    ],
    theory: [
      { h: 'Đặc điểm chung' },
      { p: 'Tế bào nhân sơ (prokaryote) chưa có nhân hoàn chỉnh: vật chất di truyền là phân tử ADN dạng vòng nằm trong vùng nhân, không có màng nhân bao bọc. Đại diện điển hình là vi khuẩn, kích thước thường 1-5 micromet.' },
      { h: 'Các thành phần cấu tạo' },
      { ul: ['Thành tế bào bằng peptidoglycan giúp giữ hình dạng', 'Màng sinh chất kiểm soát chất ra vào', 'Tế bào chất chứa ribosome (nơi tổng hợp protein)', 'Vùng nhân chứa ADN vòng', 'Một số có roi để di chuyển, vỏ nhầy bảo vệ'] },
      { h: 'Đặc điểm thiếu vắng' },
      { p: 'Tế bào nhân sơ không có các bào quan có màng như ti thể, lục lạp, bộ Golgi, lưới nội chất hay nhân chính thức. Mọi hoạt động trao đổi chất diễn ra ở màng sinh chất và tế bào chất.' },
      { h: 'Lợi thế kích thước nhỏ' },
      { p: 'Kích thước nhỏ làm tỉ lệ diện tích bề mặt trên thể tích lớn, giúp trao đổi chất nhanh, sinh trưởng và sinh sản nhanh, dễ thích nghi với môi trường.' },
      { note: 'Đơn giản không có nghĩa là kém - vi khuẩn là nhóm sinh vật thành công và phổ biến nhất Trái Đất.' },
    ],
    examples: [
      { q: 'Vì sao vi khuẩn sinh sản rất nhanh, có thể nhân đôi sau 20 phút?', a: 'Vì tế bào nhỏ, cấu tạo đơn giản, tỉ lệ diện tích/thể tích lớn nên trao đổi chất nhanh và đủ vật chất, năng lượng cho phân chia. Mỗi lần phân đôi cần ít thời gian, dân số tăng theo cấp số nhân.' },
      { q: 'Thành peptidoglycan có ý nghĩa gì với vi khuẩn và y học?', a: 'Thành peptidoglycan giữ hình dạng và bảo vệ vi khuẩn khỏi vỡ do áp suất. Nhiều kháng sinh như penicillin tiêu diệt vi khuẩn bằng cách ngăn tổng hợp thành này, khiến vi khuẩn vỡ ra.' },
    ],
  },

  'H10SINH-w08-quiz': {
    topic: 'Tế bào nhân thực — Tổng quan',
    intro: 'Tế bào nhân thực phức tạp hơn nhiều, có nhân hoàn chỉnh và nhiều bào quan chuyên hoá. Các em sẽ có cái nhìn tổng quan trước khi đi sâu vào từng bào quan.',
    objectives: [
      'Phân biệt tế bào nhân thực với nhân sơ.',
      'So sánh tế bào thực vật và động vật.',
      'Kể tên các bào quan chính và chức năng.',
    ],
    theory: [
      { h: 'Đặc điểm tế bào nhân thực' },
      { p: 'Tế bào nhân thực (eukaryote) có nhân hoàn chỉnh được bao bọc bởi màng nhân kép. Tế bào chất được phân chia thành nhiều khu vực nhờ hệ thống màng nội bào, chứa nhiều bào quan có cấu trúc và chức năng riêng. Kích thước thường 10-100 micromet.' },
      { h: 'Tế bào động vật và thực vật' },
      { ul: ['Cả hai đều có nhân, ti thể, ribosome, bộ Golgi, lưới nội chất', 'Tế bào thực vật có thêm thành cellulose, lục lạp, không bào trung tâm lớn', 'Tế bào động vật có trung thể, không bào nhỏ', 'Tế bào động vật không có thành nên hình dạng linh hoạt hơn'] },
      { h: 'Hệ thống màng nội bào' },
      { p: 'Sự phân khoang nhờ màng giúp các phản ứng diễn ra song song mà không cản trở nhau, tăng hiệu quả chuyển hoá. Đây là ưu thế lớn của tế bào nhân thực.' },
      { note: 'Sự phân công lao động giữa các bào quan giúp tế bào nhân thực thực hiện nhiều chức năng phức tạp.' },
    ],
    examples: [
      { q: 'Vì sao tế bào nhân thực có thể lớn hơn nhiều so với tế bào nhân sơ?', a: 'Nhờ hệ thống màng nội bào chia tế bào thành nhiều khoang, làm tăng tổng diện tích màng và giúp tổ chức, vận chuyển nội bào hiệu quả. Nhờ đó tế bào duy trì hoạt động dù thể tích lớn.' },
      { q: 'Quan sát một tế bào dưới kính hiển vi thấy có thành tế bào và lục lạp, đó là tế bào gì?', a: 'Đó là tế bào thực vật, vì thành cellulose và lục lạp là hai đặc điểm chỉ có ở tế bào thực vật (và tảo), không có ở tế bào động vật.' },
    ],
  },

  'H10SINH-w09-quiz': {
    topic: 'Nhân tế bào và Ribosome',
    intro: 'Nhân là trung tâm điều khiển còn ribosome là nhà máy tổng hợp protein. Các em sẽ tìm hiểu hai cấu trúc giữ vai trò then chốt trong việc biểu hiện thông tin di truyền.',
    objectives: [
      'Mô tả cấu trúc và chức năng của nhân tế bào.',
      'Nêu vai trò của nhân con và chất nhiễm sắc.',
      'Trình bày cấu tạo và chức năng của ribosome.',
    ],
    theory: [
      { h: 'Cấu trúc nhân tế bào' },
      { p: 'Nhân được bao bọc bởi màng nhân kép có các lỗ nhân cho vật chất qua lại. Bên trong chứa dịch nhân, chất nhiễm sắc và nhân con. Nhân lưu giữ phần lớn ADN, là trung tâm điều khiển mọi hoạt động sống của tế bào.' },
      { h: 'Chất nhiễm sắc và nhân con' },
      { ul: ['Chất nhiễm sắc = ADN kết hợp với protein histone', 'Khi phân bào, chất nhiễm sắc đóng xoắn thành nhiễm sắc thể', 'Nhân con tổng hợp rARN và lắp ráp tiểu đơn vị ribosome'] },
      { h: 'Ribosome' },
      { p: 'Ribosome là bào quan không có màng, cấu tạo từ rARN và protein, gồm hai tiểu đơn vị lớn và bé. Ribosome là nơi diễn ra quá trình dịch mã - tổng hợp protein theo thông tin từ mARN.' },
      { h: 'Vị trí của ribosome' },
      { p: 'Ribosome có thể tự do trong tế bào chất hoặc bám trên lưới nội chất hạt. Tế bào hoạt động mạnh (như tế bào tuyến) có rất nhiều ribosome.' },
      { note: 'Nhân ra "mệnh lệnh" dưới dạng mARN, ribosome "thi công" tạo ra protein - một dây chuyền hoàn hảo.' },
    ],
    examples: [
      { q: 'Vì sao nói nhân là trung tâm điều khiển của tế bào?', a: 'Vì nhân chứa ADN mang toàn bộ thông tin di truyền. Mọi protein - vốn quyết định cấu trúc và hoạt động của tế bào - đều được tổng hợp dựa trên thông tin xuất phát từ ADN trong nhân.' },
      { q: 'Tế bào tuyến tuỵ tiết nhiều enzyme thường có đặc điểm gì về ribosome?', a: 'Tế bào này có rất nhiều ribosome, đặc biệt là ribosome bám trên lưới nội chất hạt, vì enzyme bản chất là protein. Nhiều ribosome đáp ứng nhu cầu tổng hợp protein lớn.' },
    ],
  },

  'H10SINH-w10-quiz': {
    topic: 'Ti thể và Lục lạp',
    intro: 'Ti thể và lục lạp là hai bào quan chuyển hoá năng lượng quan trọng nhất. Các em sẽ thấy mối liên hệ thú vị giữa chúng và nguồn gốc tiến hoá từ vi khuẩn cổ.',
    objectives: [
      'Mô tả cấu trúc và chức năng của ti thể.',
      'Mô tả cấu trúc và chức năng của lục lạp.',
      'Trình bày giả thuyết nội cộng sinh.',
    ],
    theory: [
      { h: 'Ti thể - nhà máy điện' },
      { p: 'Ti thể có màng kép: màng ngoài trơn, màng trong gấp nếp tạo các mào (crista) làm tăng diện tích, bên trong là chất nền (matrix). Ti thể tiến hành hô hấp tế bào, tạo phần lớn ATP - nguồn năng lượng cho tế bào.' },
      { h: 'Lục lạp - bếp quang hợp' },
      { p: 'Lục lạp chỉ có ở thực vật và tảo, cũng có màng kép. Bên trong chứa các túi dẹt thylakoid xếp chồng thành grana, mang sắc tố diệp lục, và chất nền stroma. Lục lạp là nơi diễn ra quang hợp.' },
      { h: 'Điểm chung của hai bào quan' },
      { ul: ['Đều có màng kép', 'Đều chứa ADN riêng dạng vòng', 'Đều có ribosome riêng', 'Đều có khả năng tự nhân đôi'] },
      { h: 'Giả thuyết nội cộng sinh' },
      { p: 'Theo Lynn Margulis, ti thể và lục lạp vốn là các vi khuẩn cổ được tế bào tổ tiên thực bào nhưng không tiêu hoá mà giữ lại cộng sinh. Bằng chứng là chúng có ADN, ribosome và màng kép giống vi khuẩn.' },
      { note: 'Một tế bào lá vừa có ti thể vừa có lục lạp - vừa đốt vừa tích trữ năng lượng.' },
    ],
    examples: [
      { q: 'Vì sao tế bào cơ tim chứa rất nhiều ti thể?', a: 'Vì cơ tim co bóp liên tục, cần lượng ATP rất lớn. Ti thể là nơi tạo ATP, nên tế bào cần nhiều năng lượng sẽ có nhiều ti thể để đáp ứng nhu cầu hoạt động cao.' },
      { q: 'Những bằng chứng nào ủng hộ giả thuyết nội cộng sinh?', a: 'Ti thể và lục lạp có màng kép, có ADN vòng riêng và ribosome riêng giống vi khuẩn, lại tự nhân đôi độc lập với tế bào. Các đặc điểm này cho thấy chúng từng là sinh vật độc lập.' },
    ],
  },

  'H10SINH-w11-quiz': {
    topic: 'Lưới nội chất, Bộ Golgi và các bào quan khác',
    intro: 'Hệ thống màng nội bào tạo nên một dây chuyền sản xuất, đóng gói và vận chuyển trong tế bào. Các em sẽ theo dõi hành trình của một protein từ khi tổng hợp đến khi xuất ra ngoài.',
    objectives: [
      'Phân biệt lưới nội chất hạt và lưới nội chất trơn.',
      'Nêu vai trò của bộ Golgi và lysosome.',
      'Mô tả dòng vận chuyển của sản phẩm tế bào.',
    ],
    theory: [
      { h: 'Lưới nội chất' },
      { ul: ['Lưới nội chất hạt có ribosome bám, tổng hợp protein', 'Lưới nội chất trơn không có ribosome, tổng hợp lipid và khử độc (ở gan)'] },
      { h: 'Bộ Golgi' },
      { p: 'Bộ Golgi gồm các túi dẹt xếp chồng, nhận sản phẩm từ lưới nội chất, xử lý, hoàn thiện, đóng gói và phân phối tới các đích trong và ngoài tế bào.' },
      { h: 'Dòng vận chuyển nội bào' },
      { p: 'Sản phẩm đi theo dòng: lưới nội chất → túi vận chuyển → bộ Golgi → túi tiết → màng sinh chất, rồi xuất ra ngoài bằng xuất bào. Đây là con đường chế tiết của tế bào.' },
      { h: 'Lysosome và không bào' },
      { ul: ['Lysosome chứa enzyme thuỷ phân, tiêu hoá nội bào và phân giải bào quan cũ', 'Không bào trung tâm ở thực vật duy trì áp suất trương và dự trữ chất'] },
      { note: 'Tế bào vận hành như một nhà máy: nơi sản xuất, nơi đóng gói, nơi vận chuyển và nơi xử lý rác đều có riêng.' },
    ],
    examples: [
      { q: 'Hãy nêu hành trình của một protein được tế bào tiết ra ngoài.', a: 'Protein được tổng hợp ở ribosome trên lưới nội chất hạt, đóng vào túi vận chuyển tới bộ Golgi để hoàn thiện và đóng gói, sau đó túi tiết mang tới màng sinh chất và xuất bào ra ngoài.' },
      { q: 'Vì sao tế bào gan có nhiều lưới nội chất trơn?', a: 'Vì gan đảm nhận chức năng khử độc và chuyển hoá lipid. Lưới nội chất trơn chính là nơi tổng hợp lipid và khử độc các chất, nên tế bào gan phát triển mạnh bào quan này.' },
    ],
  },

  'H10SINH-w12-quiz': {
    topic: 'Màng sinh chất',
    intro: 'Màng sinh chất là ranh giới sống động kiểm soát mọi thứ ra vào tế bào. Các em sẽ tìm hiểu mô hình khảm động và tính thấm chọn lọc của màng.',
    objectives: [
      'Mô tả cấu trúc khảm động của màng sinh chất.',
      'Nêu chức năng của các loại protein màng.',
      'Giải thích tính thấm chọn lọc của màng.',
    ],
    theory: [
      { h: 'Mô hình khảm động' },
      { p: 'Theo mô hình khảm động của Singer-Nicolson, màng sinh chất gồm lớp kép photpholipid với các phân tử protein khảm vào. Các thành phần có thể di chuyển ngang nên màng có tính linh động.' },
      { h: 'Cấu trúc lớp kép photpholipid' },
      { p: 'Mỗi photpholipid có đầu ưa nước (phân cực) hướng ra ngoài và đuôi kỵ nước hướng vào trong. Cholesterol xen vào (ở màng động vật) giúp điều chỉnh độ linh động và ổn định màng.' },
      { h: 'Protein màng' },
      { ul: ['Protein xuyên màng làm kênh, bơm, thụ thể', 'Protein vận chuyển đưa chất qua màng', 'Glycoprotein giúp các tế bào nhận diện nhau'] },
      { h: 'Tính thấm chọn lọc' },
      { p: 'Màng có tính thấm chọn lọc: chỉ cho một số chất nhất định đi qua, kiểm soát thành phần bên trong tế bào. Phân tử nhỏ không phân cực qua dễ, ion và phân tử lớn phải qua protein chuyên biệt.' },
      { note: 'Màng vừa là hàng rào ngăn cách vừa là cửa ngõ giao tiếp - đó là sự sống động của ranh giới sự sống.' },
    ],
    examples: [
      { q: 'Vì sao gọi cấu trúc màng là "khảm động"?', a: '"Khảm" vì các protein gắn khảm vào lớp kép photpholipid như những viên khảm trên nền; "động" vì các phân tử lipid và protein có thể di chuyển ngang trong màng, làm màng linh động chứ không cứng nhắc.' },
      { q: 'Tại sao glucose không tự khuếch tán qua lớp lipid mà cần protein?', a: 'Vì glucose là phân tử phân cực, không tan trong phần đuôi kỵ nước của lớp lipid kép. Do đó glucose phải đi qua các protein mang chuyên biệt trên màng.' },
    ],
  },

  'H10SINH-w13-quiz': {
    topic: 'Vận chuyển thụ động qua màng',
    intro: 'Vận chuyển thụ động giúp các chất qua màng mà không tốn năng lượng. Các em sẽ hiểu khuếch tán, thẩm thấu và tác động của các loại môi trường lên tế bào.',
    objectives: [
      'Phân biệt khuếch tán đơn và khuếch tán dễ.',
      'Giải thích hiện tượng thẩm thấu.',
      'Dự đoán tác động của môi trường ưu trương, nhược trương, đẳng trương.',
    ],
    theory: [
      { h: 'Khuếch tán' },
      { p: 'Khuếch tán là sự di chuyển của các phân tử từ nơi có nồng độ cao đến nơi có nồng độ thấp (xuôi chiều gradient), không tốn ATP. Phân tử nhỏ không phân cực như O₂, CO₂ khuếch tán trực tiếp qua lớp lipid.' },
      { h: 'Khuếch tán dễ và thẩm thấu' },
      { ul: ['Khuếch tán dễ: chất phân cực, ion đi xuôi gradient qua protein kênh/mang', 'Thẩm thấu: khuếch tán của nước qua màng bán thấm'] },
      { h: 'Các loại môi trường' },
      { ul: ['Ưu trương: nồng độ chất tan ngoài cao hơn, nước thoát ra, tế bào co lại', 'Nhược trương: nồng độ chất tan ngoài thấp hơn, nước tràn vào, tế bào trương (hồng cầu có thể vỡ)', 'Đẳng trương: nồng độ cân bằng, nước ra vào cân bằng'] },
      { h: 'Đặc điểm chung' },
      { p: 'Vận chuyển thụ động luôn đi xuôi chiều gradient nồng độ và không tiêu tốn ATP. Tốc độ phụ thuộc vào chênh lệch nồng độ.' },
      { note: 'Cứ xuôi dốc nồng độ thì không tốn sức - đó là bản chất của vận chuyển thụ động.' },
    ],
    examples: [
      { q: 'Vì sao rau héo ngâm vào nước lã lại tươi trở lại?', a: 'Nước lã là môi trường nhược trương so với dịch tế bào rau. Theo thẩm thấu, nước đi vào trong tế bào làm tế bào trương lên, không bào đầy nước, rau trở nên căng và tươi.' },
      { q: 'Khi truyền dịch cho bệnh nhân tại sao phải dùng dung dịch đẳng trương?', a: 'Vì dung dịch đẳng trương có nồng độ cân bằng với tế bào máu, nước ra vào cân bằng nên hồng cầu giữ nguyên hình dạng. Nếu nhược trương hồng cầu trương vỡ, nếu ưu trương hồng cầu teo lại, đều nguy hiểm.' },
    ],
  },

  'H10SINH-w14-quiz': {
    topic: 'Vận chuyển chủ động và xuất nhập bào',
    intro: 'Đôi khi tế bào phải vận chuyển chất ngược chiều gradient hoặc đưa vào những hạt quá lớn. Các em sẽ tìm hiểu các cơ chế vận chuyển tốn năng lượng này.',
    objectives: [
      'Giải thích vận chuyển chủ động và vai trò của ATP.',
      'Phân biệt nhập bào và xuất bào.',
      'Nêu ví dụ thực bào, ẩm bào.',
    ],
    theory: [
      { h: 'Vận chuyển chủ động' },
      { p: 'Vận chuyển chủ động là sự di chuyển của chất ngược chiều gradient nồng độ (từ nơi nồng độ thấp đến nơi nồng độ cao), cần protein bơm và tiêu tốn ATP. Ví dụ điển hình là bơm Na⁺/K⁺ đẩy 3 Na⁺ ra và 2 K⁺ vào, dùng 1 ATP.' },
      { h: 'Nhập bào (endocytosis)' },
      { ul: ['Thực bào (phagocytosis): nuốt các hạt rắn, ví dụ bạch cầu nuốt vi khuẩn', 'Ẩm bào (pinocytosis): uống các giọt dịch lỏng'] },
      { h: 'Xuất bào (exocytosis)' },
      { p: 'Xuất bào là quá trình túi tiết bên trong hoà màng với màng sinh chất để đẩy chất ra ngoài, ví dụ tế bào tuyến tiết hormone hoặc enzyme.' },
      { h: 'So sánh' },
      { p: 'Cả vận chuyển chủ động và xuất nhập bào đều tiêu tốn năng lượng, khác với vận chuyển thụ động. Xuất nhập bào dùng để vận chuyển các phân tử và hạt kích thước lớn không qua được màng.' },
      { note: 'Khi cần đi ngược dốc hoặc mang vác hàng lớn, tế bào phải "trả phí" bằng ATP.' },
    ],
    examples: [
      { q: 'Vì sao rễ cây vẫn hút được khoáng dù nồng độ khoáng trong đất thấp hơn trong rễ?', a: 'Vì rễ dùng vận chuyển chủ động: tế bào rễ bơm ion khoáng ngược chiều gradient, từ nơi nồng độ thấp (đất) vào nơi nồng độ cao (rễ), tiêu tốn ATP do hô hấp cung cấp.' },
      { q: 'Bạch cầu tiêu diệt vi khuẩn bằng hình thức vận chuyển nào?', a: 'Bằng thực bào (nhập bào). Bạch cầu hình thành chân giả bao lấy vi khuẩn, đưa vào trong tạo túi thực bào, rồi lysosome tiết enzyme phân giải vi khuẩn.' },
    ],
  },

  'H10SINH-w15-quiz': {
    topic: 'Trao đổi chất và năng lượng — ATP',
    intro: 'Mọi hoạt động sống đều cần năng lượng và ATP chính là "đồng tiền năng lượng" của tế bào. Các em sẽ hiểu khái niệm chuyển hoá và vai trò trung tâm của ATP.',
    objectives: [
      'Nêu cấu tạo và vai trò của ATP.',
      'Phân biệt đồng hoá và dị hoá.',
      'Giải thích chu trình ATP - ADP.',
    ],
    theory: [
      { h: 'ATP - đồng tiền năng lượng' },
      { p: 'ATP (Adenosine triphosphate) gồm adenine, đường ribose và ba nhóm phosphate. Năng lượng được tích trong các liên kết cao năng giữa các nhóm phosphate. Khi thuỷ phân liên kết cuối, ATP → ADP + Pi và giải phóng năng lượng cho hoạt động sống.' },
      { h: 'Trao đổi chất' },
      { p: 'Trao đổi chất là tập hợp các phản ứng hoá học trong tế bào, gồm hai mặt đối lập và thống nhất: đồng hoá (tổng hợp chất, tích luỹ năng lượng) và dị hoá (phân giải chất, giải phóng năng lượng).' },
      { ul: ['Đồng hoá: tổng hợp các chất phức tạp, cần năng lượng', 'Dị hoá: phân giải chất, giải phóng năng lượng (ví dụ hô hấp)'] },
      { h: 'Chu trình ATP - ADP' },
      { p: 'ATP và ADP chuyển hoá qua lại liên tục: dị hoá tạo ATP từ ADP, các hoạt động sống dùng ATP rồi trả lại ADP. Mỗi phân tử ATP được tái sử dụng hàng nghìn lần mỗi ngày.' },
      { note: 'ATP không phải kho dự trữ lớn mà là đồng tiền lưu thông - tạo ra rồi tiêu ngay, liên tục tái sinh.' },
    ],
    examples: [
      { q: 'Vì sao gọi ATP là đồng tiền năng lượng của tế bào?', a: 'Vì ATP là dạng năng lượng có thể dùng ngay cho mọi hoạt động sống: co cơ, tổng hợp chất, vận chuyển chủ động. Năng lượng từ thức ăn được chuyển thành ATP trước khi tế bào sử dụng, giống tiền dùng để chi tiêu.' },
      { q: 'Phân biệt đồng hoá và dị hoá qua ví dụ cụ thể.', a: 'Tổng hợp protein từ axit amin là đồng hoá - xây chất phức tạp, tốn năng lượng. Phân giải glucose trong hô hấp để tạo ATP là dị hoá - bẻ gãy chất, giải phóng năng lượng. Hai quá trình diễn ra song song.' },
    ],
  },

  'H10SINH-w16-quiz': {
    topic: 'Enzyme',
    intro: 'Enzyme là chất xúc tác sinh học giúp các phản ứng trong tế bào diễn ra với tốc độ phù hợp. Các em sẽ hiểu cơ chế và các yếu tố ảnh hưởng đến hoạt tính enzyme.',
    objectives: [
      'Nêu bản chất và cơ chế tác động của enzyme.',
      'Giải thích tính đặc hiệu của enzyme.',
      'Phân tích các yếu tố ảnh hưởng đến hoạt tính enzyme.',
    ],
    theory: [
      { h: 'Bản chất và cơ chế' },
      { p: 'Enzyme là chất xúc tác sinh học, bản chất đa số là protein (một số là ARN gọi là ribozyme). Enzyme làm tăng tốc phản ứng bằng cách hạ thấp năng lượng hoạt hoá, nhưng không bị tiêu hao sau phản ứng.' },
      { h: 'Tính đặc hiệu' },
      { p: 'Mỗi enzyme có trung tâm hoạt động với cấu hình khớp riêng với một loại cơ chất nhất định, theo mô hình "khoá và chìa". Vì vậy mỗi enzyme thường chỉ xúc tác cho một hoặc một số phản ứng nhất định.' },
      { h: 'Các yếu tố ảnh hưởng' },
      { ul: ['Nhiệt độ: mỗi enzyme có nhiệt độ tối ưu (người khoảng 37°C); quá cao gây biến tính', 'pH: mỗi enzyme có pH thích hợp riêng', 'Nồng độ cơ chất và nồng độ enzyme', 'Chất ức chế: cạnh tranh hoặc không cạnh tranh'] },
      { h: 'Ức chế enzyme' },
      { p: 'Chất ức chế cạnh tranh có cấu trúc giống cơ chất, tranh chiếm trung tâm hoạt động. Chất ức chế không cạnh tranh gắn ở vị trí khác làm biến đổi cấu hình enzyme.' },
      { note: 'Không có enzyme, các phản ứng sống sẽ diễn ra chậm đến mức không duy trì được sự sống.' },
    ],
    examples: [
      { q: 'Vì sao khi sốt cao kéo dài (trên 42°C) lại nguy hiểm cho cơ thể?', a: 'Vì nhiệt độ quá cao làm các enzyme trong cơ thể bị biến tính, mất cấu hình trung tâm hoạt động và mất chức năng xúc tác. Các phản ứng chuyển hoá ngừng trệ, đe doạ hoạt động sống.' },
      { q: 'Một enzyme tiêu hoá protein liệu có phân giải được tinh bột không? Vì sao?', a: 'Không, vì enzyme có tính đặc hiệu. Trung tâm hoạt động của enzyme tiêu protein chỉ khớp với cơ chất protein, không khớp với tinh bột, nên không xúc tác phân giải tinh bột được.' },
    ],
  },

  'H10SINH-w17-quiz': {
    topic: 'Hô hấp tế bào',
    intro: 'Hô hấp tế bào là quá trình phân giải chất hữu cơ để tạo ATP. Các em sẽ theo dõi ba giai đoạn của hô hấp hiếu khí và vị trí diễn ra từng giai đoạn.',
    objectives: [
      'Nêu khái niệm và ý nghĩa của hô hấp tế bào.',
      'Trình bày ba giai đoạn của hô hấp hiếu khí.',
      'Xác định vị trí và sản phẩm của từng giai đoạn.',
    ],
    theory: [
      { h: 'Khái niệm' },
      { p: 'Hô hấp tế bào là quá trình oxy hoá phân giải chất hữu cơ (chủ yếu glucose) thành CO₂ và H₂O, giải phóng năng lượng tích vào ATP. Phương trình tổng quát: C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O + năng lượng.' },
      { h: 'Ba giai đoạn của hô hấp hiếu khí' },
      { ul: ['Đường phân: ở bào tương, phân giải glucose thành axit pyruvic, tạo ít ATP', 'Chu trình Krebs: ở chất nền ti thể, oxy hoá axit pyruvic tạo CO₂ và chất khử', 'Chuỗi vận chuyển electron: ở màng trong ti thể, tạo nhiều ATP nhất'] },
      { h: 'Năng lượng thu được' },
      { p: 'Hô hấp hiếu khí phân giải hoàn toàn 1 phân tử glucose tạo khoảng 30-32 ATP. Giai đoạn chuỗi vận chuyển electron tạo phần lớn ATP nhờ enzyme ATP-synthase.' },
      { h: 'Vai trò của oxy' },
      { p: 'Oxy là chất nhận electron cuối cùng trong chuỗi vận chuyển electron. Thiếu oxy, chuỗi này ngừng và hiệu suất tạo ATP giảm mạnh, tế bào chuyển sang lên men kém hiệu quả.' },
      { note: 'Hít thở đưa oxy vào để hô hấp tế bào, không phải để "nuôi" phổi - phổi chỉ là cửa ngõ.' },
    ],
    examples: [
      { q: 'Vì sao khi vận động mạnh, cơ bắp lại mỏi và đau (sản sinh axit lactic)?', a: 'Khi vận động mạnh, cơ thiếu oxy nên không hô hấp hiếu khí kịp, tế bào cơ chuyển sang lên men lactic để tạo ATP. Axit lactic tích lại làm cơ mỏi và đau.' },
      { q: 'Tế bào nào trong cơ thể có nhiều ti thể nhất và vì sao?', a: 'Các tế bào hoạt động mạnh như tế bào cơ tim, tế bào gan có rất nhiều ti thể, vì chúng cần lượng ATP lớn để duy trì hoạt động liên tục. Ti thể là nơi diễn ra Krebs và chuỗi electron tạo ATP.' },
    ],
  },

  'H10SINH-w18-quiz': {
    topic: 'Ôn tập học kỳ 1',
    intro: 'Các em hãy hệ thống lại toàn bộ kiến thức về thành phần hoá học, cấu trúc tế bào và chuyển hoá năng lượng. Bài ôn tập giúp liên kết các phần thành một bức tranh hoàn chỉnh về tế bào.',
    objectives: [
      'Hệ thống hoá các thành phần hoá học và cấu trúc tế bào.',
      'So sánh tế bào nhân sơ - nhân thực, thực vật - động vật.',
      'Liên hệ cấu trúc với chức năng của các bào quan.',
    ],
    theory: [
      { h: 'Thành phần hoá học' },
      { p: 'Tế bào gồm nước và các đại phân tử hữu cơ. Bốn nguyên tố chính C, H, O, N tạo nên cacbohydrat, lipid, protein và axit nucleic - mỗi nhóm có cấu trúc và chức năng riêng.' },
      { h: 'Cấu trúc tế bào' },
      { ul: ['Tế bào nhân sơ: chưa có nhân và bào quan có màng', 'Tế bào nhân thực: có nhân hoàn chỉnh và nhiều bào quan', 'Tế bào thực vật: thêm thành cellulose, lục lạp, không bào lớn'] },
      { h: 'Cấu trúc gắn với chức năng' },
      { ul: ['Nhân: điều khiển, chứa ADN', 'Ti thể: hô hấp, tạo ATP', 'Lục lạp: quang hợp', 'Ribosome: tổng hợp protein', 'Màng sinh chất: thấm chọn lọc'] },
      { h: 'Vận chuyển và chuyển hoá' },
      { p: 'Chất qua màng bằng vận chuyển thụ động (không tốn ATP) hoặc chủ động (tốn ATP). Enzyme xúc tác các phản ứng; hô hấp tế bào tạo ATP cho mọi hoạt động sống.' },
      { note: 'Nắm vững nguyên tắc "cấu trúc quyết định chức năng" thì học phần tế bào sẽ trở nên dễ nhớ và logic.' },
    ],
    examples: [
      { q: 'Hãy so sánh tế bào nhân sơ và nhân thực qua ba tiêu chí cơ bản.', a: 'Về nhân: nhân sơ chưa có màng nhân, nhân thực có nhân hoàn chỉnh. Về bào quan: nhân sơ không có bào quan có màng, nhân thực có ti thể, lục lạp... Về kích thước: nhân sơ nhỏ (1-5 µm), nhân thực lớn hơn (10-100 µm).' },
      { q: 'Vì sao có thể nói tế bào là một hệ thống thống nhất?', a: 'Vì các bào quan phối hợp chặt chẽ: nhân điều khiển, ribosome tổng hợp protein, ti thể cấp năng lượng, màng kiểm soát ra vào. Mọi bộ phận liên kết và phụ thuộc lẫn nhau tạo nên một thể sống hoàn chỉnh.' },
    ],
  },

  'H10SINH-w19-quiz': {
    topic: 'Quang hợp ở thực vật',
    intro: 'Quang hợp là quá trình biến năng lượng ánh sáng thành năng lượng hoá học, nuôi sống gần như toàn bộ sinh giới. Các em sẽ tìm hiểu hai pha của quang hợp.',
    objectives: [
      'Nêu khái niệm và phương trình quang hợp.',
      'Phân biệt pha sáng và pha tối.',
      'Xác định vị trí và sản phẩm của mỗi pha.',
    ],
    theory: [
      { h: 'Khái niệm quang hợp' },
      { p: 'Quang hợp là quá trình tổng hợp chất hữu cơ (glucose) từ CO₂ và H₂O nhờ năng lượng ánh sáng được diệp lục hấp thu. Phương trình tổng quát: 6CO₂ + 6H₂O + ánh sáng → C₆H₁₂O₆ + 6O₂.' },
      { h: 'Pha sáng' },
      { p: 'Pha sáng diễn ra trên màng thylakoid của lục lạp. Diệp lục hấp thu ánh sáng, phân ly nước (giải phóng O₂) và tạo ra ATP, NADPH để cung cấp cho pha tối.' },
      { h: 'Pha tối (chu trình Calvin)' },
      { p: 'Pha tối diễn ra trong chất nền stroma, không cần ánh sáng trực tiếp. Tại đây CO₂ được cố định và khử thành đường (G3P → glucose) nhờ ATP và NADPH từ pha sáng.' },
      { h: 'Mối liên hệ hai pha' },
      { ul: ['Pha sáng cung cấp ATP, NADPH cho pha tối', 'Pha tối trả lại ADP, NADP⁺ cho pha sáng', 'Sản phẩm cuối là glucose, sản phẩm phụ là O₂'] },
      { note: 'Quang hợp là nguồn cung cấp chất hữu cơ và khí oxy cho toàn bộ sự sống trên Trái Đất.' },
    ],
    examples: [
      { q: 'Vì sao cây xanh được ví như "lá phổi của Trái Đất"?', a: 'Vì trong quang hợp, cây hấp thu CO₂ và thải ra O₂. Lượng O₂ này cung cấp cho hô hấp của hầu hết sinh vật, đồng thời cây hấp thụ bớt CO₂ giúp điều hoà khí quyển.' },
      { q: 'Tại sao pha tối vẫn cần đến năng lượng dù không trực tiếp dùng ánh sáng?', a: 'Vì pha tối dùng ATP và NADPH do pha sáng tạo ra để cố định và khử CO₂ thành đường. Không có ánh sáng thì pha sáng ngừng, không sản xuất được ATP và NADPH, nên pha tối cũng dừng theo.' },
    ],
  },

  'H10SINH-w20-quiz': {
    topic: 'Chu kỳ tế bào — Nguyên phân (phần 1)',
    intro: 'Tế bào sinh sản bằng cách phân chia theo một chu kỳ chặt chẽ. Các em sẽ tìm hiểu chu kỳ tế bào và diễn biến các kỳ của nguyên phân.',
    objectives: [
      'Nêu các pha của chu kỳ tế bào.',
      'Mô tả diễn biến nhiễm sắc thể qua các kỳ nguyên phân.',
      'Nêu kết quả của nguyên phân.',
    ],
    theory: [
      { h: 'Chu kỳ tế bào' },
      { p: 'Chu kỳ tế bào gồm kỳ trung gian và quá trình nguyên phân. Kỳ trung gian chia làm ba pha: G1 (sinh trưởng), S (nhân đôi ADN), G2 (chuẩn bị phân bào). Nguyên phân (pha M) là giai đoạn phân chia.' },
      { h: 'Các kỳ của nguyên phân' },
      { ul: ['Kỳ đầu: NST kép co xoắn, màng nhân tiêu biến, thoi phân bào hình thành', 'Kỳ giữa: NST kép xếp 1 hàng ở mặt phẳng xích đạo', 'Kỳ sau: hai cromatit của mỗi NST tách nhau, đi về 2 cực', 'Kỳ cuối: NST dãn xoắn, màng nhân tái lập, tế bào chất phân chia'] },
      { h: 'Kết quả nguyên phân' },
      { p: 'Từ một tế bào mẹ (2n) tạo ra hai tế bào con có bộ NST giống hệt mẹ (2n). Nguyên phân đảm bảo sự ổn định bộ NST qua các thế hệ tế bào.' },
      { note: 'Pha S nhân đôi ADN là bước chuẩn bị then chốt - nhờ đó hai tế bào con mới nhận đủ vật chất di truyền.' },
    ],
    examples: [
      { q: 'Vì sao trước khi phân chia, tế bào phải trải qua pha S?', a: 'Vì pha S là lúc ADN được nhân đôi, tạo NST kép. Nhờ vậy khi phân chia, mỗi tế bào con nhận đủ một bộ NST đầy đủ giống mẹ. Không có pha S thì tế bào con sẽ thiếu vật chất di truyền.' },
      { q: 'Một tế bào có 2n = 8 NST, sau một lần nguyên phân tạo ra mấy tế bào và mỗi tế bào có bao nhiêu NST?', a: 'Tạo ra 2 tế bào con, mỗi tế bào có 8 NST (2n = 8) giống hệt tế bào mẹ. Nguyên phân duy trì ổn định bộ NST nên số lượng không đổi.' },
    ],
  },

  'H10SINH-w21-quiz': {
    topic: 'Nguyên phân (phần 2) — Ý nghĩa',
    intro: 'Vì sao nguyên phân lại quan trọng với cơ thể đa bào? Các em sẽ tìm hiểu ý nghĩa của nguyên phân và mối liên hệ với hiện tượng ung thư.',
    objectives: [
      'Nêu ý nghĩa của nguyên phân với sinh trưởng và sinh sản.',
      'Giải thích cơ chế kiểm soát chu kỳ tế bào.',
      'Liên hệ rối loạn phân bào với ung thư.',
    ],
    theory: [
      { h: 'Ý nghĩa của nguyên phân' },
      { ul: ['Giúp cơ thể đa bào sinh trưởng (tăng số lượng tế bào)', 'Thay thế tế bào già, chết và hàn gắn vết thương', 'Là cơ sở của sinh sản vô tính ở sinh vật đơn bào và một số đa bào', 'Duy trì ổn định bộ NST 2n qua các thế hệ tế bào'] },
      { h: 'Kiểm soát chu kỳ tế bào' },
      { p: 'Chu kỳ tế bào được kiểm soát chặt chẽ tại các điểm kiểm soát (checkpoint) như G1/S, G2/M. Tại đó tế bào kiểm tra ADN có nguyên vẹn, môi trường có đủ điều kiện hay không trước khi tiếp tục phân chia.' },
      { h: 'Phân chia tế bào chất' },
      { p: 'Ở tế bào động vật, tế bào chất phân chia bằng cách thắt eo nhờ vòng vi sợi actin. Ở tế bào thực vật, hình thành vách ngăn ở giữa do có thành cellulose.' },
      { h: 'Rối loạn và ung thư' },
      { p: 'Khi cơ chế kiểm soát chu kỳ tế bào bị hỏng, tế bào phân chia vô hạn không kiểm soát, hình thành khối u và có thể dẫn đến ung thư.' },
      { note: 'Ung thư về bản chất là sự mất kiểm soát phân bào - cho thấy tầm quan trọng của các điểm kiểm soát.' },
    ],
    examples: [
      { q: 'Vì sao khi bị đứt tay, vết thương lại lành lại sau vài ngày?', a: 'Nhờ nguyên phân: các tế bào quanh vết thương phân chia tạo tế bào mới, lấp đầy chỗ tổn thương. Đây là vai trò tái sinh và hàn gắn của nguyên phân.' },
      { q: 'Mối liên hệ giữa rối loạn chu kỳ tế bào và bệnh ung thư là gì?', a: 'Bình thường chu kỳ tế bào được kiểm soát chặt qua các checkpoint. Khi cơ chế này hỏng (do đột biến gen), tế bào phân chia liên tục không kiểm soát, tạo khối u, chính là cơ chế phát sinh ung thư.' },
    ],
  },

  'H10SINH-w22-quiz': {
    topic: 'Giảm phân (phần 1)',
    intro: 'Giảm phân là kiểu phân bào tạo ra giao tử với bộ NST giảm đi một nửa. Các em sẽ tìm hiểu diễn biến của hai lần phân chia liên tiếp trong giảm phân.',
    objectives: [
      'Nêu nơi xảy ra và đặc điểm của giảm phân.',
      'Phân biệt giảm phân I và giảm phân II.',
      'Nêu hiện tượng trao đổi chéo.',
    ],
    theory: [
      { h: 'Đặc điểm chung' },
      { p: 'Giảm phân xảy ra ở tế bào sinh dục chín, gồm hai lần phân chia liên tiếp (giảm phân I và II) nhưng ADN chỉ nhân đôi một lần trước giảm phân I. Kết quả từ một tế bào 2n tạo ra bốn tế bào con n (đơn bội).' },
      { h: 'Giảm phân I - phân chia giảm nhiễm' },
      { ul: ['Kỳ đầu I: các NST tương đồng bắt cặp, có thể trao đổi chéo', 'Kỳ giữa I: các cặp NST tương đồng xếp 2 hàng ở mặt phẳng xích đạo', 'Kỳ sau I: mỗi NST kép trong cặp đi về một cực', 'Kết quả: 2 tế bào con có bộ NST giảm một nửa (n kép)'] },
      { h: 'Giảm phân II - giống nguyên phân' },
      { p: 'Giảm phân II diễn ra tương tự nguyên phân: hai cromatit của mỗi NST kép tách nhau về hai cực. Từ 2 tế bào n kép tạo ra 4 tế bào n đơn.' },
      { h: 'Trao đổi chéo' },
      { p: 'Tại kỳ đầu I, các NST tương đồng có thể trao đổi đoạn cho nhau (crossing-over), tạo nên tổ hợp gen mới - một nguồn quan trọng của biến dị tổ hợp.' },
      { note: 'Một lần nhân đôi nhưng hai lần phân chia - đó là lý do bộ NST giảm đi một nửa trong giao tử.' },
    ],
    examples: [
      { q: 'Vì sao giảm phân tạo ra tế bào con có bộ NST giảm một nửa so với tế bào mẹ?', a: 'Vì giảm phân có hai lần phân chia nhưng ADN chỉ nhân đôi một lần. Lần phân chia I tách các cặp NST tương đồng (giảm nhiễm), lần II tách cromatit, kết quả mỗi tế bào con chỉ còn n NST.' },
      { q: 'Trao đổi chéo có ý nghĩa gì đối với sinh vật?', a: 'Trao đổi chéo tạo ra các NST mang tổ hợp gen mới chưa từng có. Đây là nguồn biến dị tổ hợp, làm tăng tính đa dạng di truyền, cung cấp nguyên liệu cho chọn lọc và tiến hoá.' },
    ],
  },

  'H10SINH-w23-quiz': {
    topic: 'Giảm phân (phần 2) — Ý nghĩa',
    intro: 'Giảm phân kết hợp với thụ tinh tạo nên sự đa dạng vô tận của thế giới sống. Các em sẽ hiểu vai trò của giảm phân trong di truyền và tiến hoá.',
    objectives: [
      'Giải thích vai trò của giảm phân và thụ tinh.',
      'Nêu các cơ chế tạo biến dị tổ hợp.',
      'Liên hệ rối loạn giảm phân với các hội chứng di truyền.',
    ],
    theory: [
      { h: 'Giảm phân và thụ tinh' },
      { p: 'Giảm phân tạo giao tử đơn bội (n); thụ tinh giữa giao tử đực (n) và giao tử cái (n) tạo hợp tử lưỡng bội (2n), khôi phục bộ NST đặc trưng của loài. Ở người, 2n = 46 NST (23 cặp).' },
      { h: 'Cơ chế tạo đa dạng di truyền' },
      { ul: ['Trao đổi chéo ở kỳ đầu giảm phân I', 'Phân ly độc lập của các cặp NST tương đồng ở kỳ sau I', 'Sự kết hợp ngẫu nhiên của các giao tử khi thụ tinh'] },
      { h: 'Ý nghĩa tiến hoá' },
      { p: 'Sinh sản hữu tính (qua giảm phân và thụ tinh) tạo ra biến dị tổ hợp phong phú, là nguồn nguyên liệu cho chọn lọc tự nhiên, giúp loài thích nghi và tiến hoá.' },
      { h: 'Rối loạn giảm phân' },
      { p: 'Nếu một cặp NST không phân ly khi giảm phân, giao tử tạo ra sẽ thừa hoặc thiếu NST, dẫn đến đột biến số lượng NST như hội chứng Down (thừa NST 21), Turner...' },
      { note: 'Nhờ giảm phân và thụ tinh, không hai anh chị em ruột nào hoàn toàn giống nhau (trừ sinh đôi cùng trứng).' },
    ],
    examples: [
      { q: 'Vì sao các con trong cùng một gia đình lại khác nhau dù chung bố mẹ?', a: 'Vì giảm phân tạo nhiều loại giao tử khác nhau (do trao đổi chéo và phân ly độc lập của NST), thụ tinh kết hợp giao tử lại ngẫu nhiên. Mỗi lần thụ tinh cho một tổ hợp gen riêng, nên các con khác nhau.' },
      { q: 'Hội chứng Down hình thành như thế nào liên quan đến giảm phân?', a: 'Khi giảm phân, cặp NST số 21 không phân ly, tạo giao tử thừa một NST 21. Khi thụ tinh với giao tử bình thường, hợp tử có ba NST 21 (thể ba nhiễm), gây hội chứng Down.' },
    ],
  },

  'H10SINH-w24-quiz': {
    topic: 'Công nghệ tế bào',
    intro: 'Hiểu biết về tế bào được ứng dụng để nhân giống, tạo dòng và chữa bệnh. Các em sẽ tìm hiểu công nghệ tế bào và tiềm năng to lớn của tế bào gốc.',
    objectives: [
      'Nêu khái niệm và ứng dụng của công nghệ tế bào.',
      'Trình bày nguyên lý nuôi cấy mô và nhân bản vô tính.',
      'Giải thích vai trò của tế bào gốc.',
    ],
    theory: [
      { h: 'Công nghệ tế bào' },
      { p: 'Công nghệ tế bào là ngành ứng dụng kỹ thuật nuôi cấy tế bào và mô trong điều kiện vô trùng để tạo ra cơ thể mới hoặc sản phẩm phục vụ con người. Cơ sở là tính toàn năng của tế bào.' },
      { h: 'Nuôi cấy mô và nhân bản' },
      { ul: ['Nuôi cấy mô thực vật: nhân nhanh giống, tạo cây sạch bệnh, bảo tồn nguồn gen', 'Nhân bản vô tính động vật: cừu Dolly (1996) là động vật đầu tiên nhân bản từ tế bào trưởng thành'] },
      { h: 'Tế bào gốc' },
      { p: 'Tế bào gốc (stem cell) có khả năng tự đổi mới và biệt hoá thành nhiều loại tế bào khác nhau. Tế bào gốc phôi có tính toàn năng/đa năng cao, biệt hoá rộng; tế bào gốc trưởng thành biệt hoá hẹp hơn.' },
      { h: 'Ứng dụng y học' },
      { p: 'Tế bào gốc được dùng để điều trị bệnh máu, bệnh thoái hoá thần kinh, ghép mô và tái tạo cơ quan, mở ra triển vọng lớn cho y học hiện đại.' },
      { note: 'Một tế bào có thể tạo nên cả cơ thể - đó là tính toàn năng kỳ diệu mà công nghệ tế bào khai thác.' },
    ],
    examples: [
      { q: 'Vì sao nuôi cấy mô lại tạo được hàng loạt cây giống giống hệt nhau?', a: 'Vì nuôi cấy mô dùng phân bào nguyên phân từ một mô gốc, các cây con đều mang bộ gen giống hệt cây mẹ. Do đó hàng loạt cây giống đồng nhất về tính trạng, lại sạch bệnh.' },
      { q: 'Tại sao tế bào gốc phôi có tiềm năng ứng dụng cao hơn tế bào gốc trưởng thành?', a: 'Vì tế bào gốc phôi có khả năng biệt hoá thành rất nhiều loại tế bào khác nhau (toàn năng/đa năng), trong khi tế bào gốc trưởng thành chỉ biệt hoá hẹp. Nhờ đó tế bào gốc phôi linh hoạt hơn trong điều trị.' },
    ],
  },

  'H10SINH-w25-quiz': {
    topic: 'Vi sinh vật — Khái niệm chung',
    intro: 'Vi sinh vật là nhóm sinh vật nhỏ bé nhưng có mặt khắp nơi và vai trò to lớn. Các em sẽ tìm hiểu đặc điểm và các kiểu dinh dưỡng của chúng.',
    objectives: [
      'Nêu khái niệm và đặc điểm chung của vi sinh vật.',
      'Phân loại các kiểu dinh dưỡng của vi sinh vật.',
      'Nêu phương pháp nghiên cứu vi sinh vật.',
    ],
    theory: [
      { h: 'Khái niệm' },
      { p: 'Vi sinh vật là những sinh vật có kích thước rất nhỏ, thường phải quan sát qua kính hiển vi. Chúng gồm vi khuẩn, một số nấm (nấm men, nấm mốc), tảo đơn bào, nguyên sinh động vật và cả virus.' },
      { h: 'Đặc điểm chung' },
      { ul: ['Kích thước hiển vi, tỉ lệ diện tích/thể tích lớn', 'Trao đổi chất mạnh, sinh trưởng và sinh sản nhanh', 'Phân bố rộng, thích nghi nhiều môi trường', 'Đa dạng về kiểu dinh dưỡng'] },
      { h: 'Các kiểu dinh dưỡng' },
      { ul: ['Quang tự dưỡng: dùng ánh sáng làm năng lượng, CO₂ làm nguồn carbon (vi khuẩn lam)', 'Hoá tự dưỡng: lấy năng lượng từ phản ứng hoá học vô cơ', 'Quang dị dưỡng: dùng ánh sáng, carbon từ chất hữu cơ', 'Hoá dị dưỡng: lấy năng lượng và carbon từ chất hữu cơ'] },
      { h: 'Phương pháp nghiên cứu' },
      { p: 'Vi sinh vật được nghiên cứu bằng cách nuôi cấy trên môi trường vô trùng, kết hợp quan sát qua kính hiển vi và các kỹ thuật sinh học phân tử.' },
      { note: 'Tuy nhỏ bé, vi sinh vật quyết định nhiều chu trình vật chất và ảnh hưởng lớn đến đời sống con người.' },
    ],
    examples: [
      { q: 'Vì sao vi sinh vật có tốc độ chuyển hoá vật chất nhanh hơn nhiều so với sinh vật lớn?', a: 'Vì kích thước nhỏ làm tỉ lệ diện tích bề mặt trên thể tích rất lớn, giúp hấp thu chất và trao đổi với môi trường nhanh. Nhờ đó vi sinh vật chuyển hoá mạnh, sinh trưởng và sinh sản nhanh.' },
      { q: 'Phân biệt vi khuẩn lam (quang tự dưỡng) với vi khuẩn lactic (hoá dị dưỡng).', a: 'Vi khuẩn lam dùng ánh sáng làm năng lượng và CO₂ làm nguồn carbon, tự tổng hợp chất hữu cơ. Vi khuẩn lactic lấy cả năng lượng và carbon từ chất hữu cơ có sẵn, không tự tổng hợp được.' },
    ],
  },

  'H10SINH-w26-quiz': {
    topic: 'Sinh trưởng của vi sinh vật',
    intro: 'Một quần thể vi khuẩn tăng số lượng theo những quy luật rõ ràng. Các em sẽ tìm hiểu đường cong sinh trưởng và sự khác nhau giữa nuôi cấy liên tục và không liên tục.',
    objectives: [
      'Nêu khái niệm sinh trưởng của quần thể vi sinh vật.',
      'Mô tả bốn pha của đường cong sinh trưởng.',
      'Phân biệt nuôi cấy liên tục và không liên tục.',
    ],
    theory: [
      { h: 'Khái niệm sinh trưởng' },
      { p: 'Sinh trưởng của vi sinh vật được hiểu là sự tăng số lượng tế bào của cả quần thể, không phải tăng kích thước cá thể. Thời gian thế hệ là thời gian để số lượng tế bào tăng gấp đôi.' },
      { h: 'Đường cong sinh trưởng (nuôi cấy không liên tục)' },
      { ul: ['Pha tiềm phát (lag): vi khuẩn thích nghi, chưa phân chia nhiều', 'Pha luỹ thừa (log): phân chia nhanh nhất, số lượng tăng theo hàm mũ', 'Pha ổn định: số sinh bằng số chết, do dinh dưỡng cạn và chất độc tích lũy', 'Pha suy vong: số chết vượt số sinh, quần thể giảm dần'] },
      { h: 'Nuôi cấy liên tục' },
      { p: 'Trong nuôi cấy liên tục, người ta bổ sung dinh dưỡng mới và loại bỏ chất thải liên tục, giữ vi sinh vật ở pha luỹ thừa lâu dài, thu sinh khối ổn định - ứng dụng trong công nghiệp.' },
      { note: 'Hiểu đường cong sinh trưởng giúp con người chủ động nuôi và kiểm soát vi sinh vật trong sản xuất.' },
    ],
    examples: [
      { q: 'Vì sao trong nuôi cấy không liên tục lại xuất hiện pha suy vong?', a: 'Vì trong môi trường kín, theo thời gian dinh dưỡng cạn kiệt và chất thải độc hại tích lũy. Khi điều kiện sống xấu đi, số tế bào chết vượt số sinh ra, quần thể bước vào pha suy vong.' },
      { q: 'Vì sao trong sản xuất công nghiệp người ta ưa dùng nuôi cấy liên tục?', a: 'Vì nuôi cấy liên tục giữ vi sinh vật ở pha luỹ thừa lâu dài nhờ bổ sung dinh dưỡng và loại chất thải, nên thu được sinh khối hoặc sản phẩm ổn định, năng suất cao và liên tục.' },
    ],
  },

  'H10SINH-w27-quiz': {
    topic: 'Các yếu tố ảnh hưởng đến sinh trưởng vi sinh vật',
    intro: 'Sinh trưởng của vi sinh vật phụ thuộc vào nhiều yếu tố môi trường. Các em sẽ tìm hiểu cách con người vận dụng các yếu tố này để nuôi hoặc tiêu diệt vi sinh vật.',
    objectives: [
      'Phân loại các yếu tố ảnh hưởng đến sinh trưởng vi sinh vật.',
      'Giải thích tác động của nhiệt độ, pH.',
      'Nêu nguyên lý các biện pháp khử trùng.',
    ],
    theory: [
      { h: 'Yếu tố hoá học' },
      { p: 'Bao gồm các chất dinh dưỡng (nguồn C, N, P, S, các yếu tố sinh trưởng), độ pH và các chất ức chế. Một số chất như cồn, phenol, chất kháng sinh có thể ức chế hoặc tiêu diệt vi sinh vật.' },
      { h: 'Yếu tố vật lý - nhiệt độ' },
      { ul: ['Vi sinh vật ưa lạnh (psychrophile): dưới 15°C', 'Ưa ấm (mesophile): 20-45°C, đa số vi khuẩn gây bệnh', 'Ưa nóng (thermophile): 50-80°C, ở suối nước nóng', 'Ưa siêu nhiệt: trên 80°C'] },
      { h: 'Độ pH và độ ẩm' },
      { p: 'Đa số vi khuẩn ưa pH trung tính (6-8); nấm men, nấm mốc ưa môi trường hơi acid. Độ ẩm cần thiết cho sinh trưởng; phơi khô là cách bảo quản thực phẩm.' },
      { h: 'Biện pháp khử trùng' },
      { ul: ['Nhiệt cao: nồi hấp 121°C tiêu diệt mọi vi sinh vật', 'Hoá chất: cồn 70%, chloramine sát khuẩn', 'Kháng sinh: ức chế tổng hợp thành, protein hoặc ADN của vi khuẩn'] },
      { note: 'Hiểu các yếu tố này giúp ta vừa bảo quản thực phẩm vừa phòng chống bệnh do vi sinh vật.' },
    ],
    examples: [
      { q: 'Vì sao thực phẩm để trong tủ lạnh lại lâu hỏng hơn?', a: 'Vì nhiệt độ thấp trong tủ lạnh làm chậm hoạt động của enzyme và quá trình trao đổi chất của vi sinh vật, khiến chúng sinh trưởng chậm hoặc ngừng. Nhờ đó thực phẩm chậm bị phân huỷ hơn.' },
      { q: 'Tại sao kháng sinh tiêu diệt được vi khuẩn nhưng không diệt được virus?', a: 'Vì kháng sinh tác động lên các cấu trúc đặc trưng của vi khuẩn như thành tế bào, ribosome, quá trình tổng hợp protein/ADN. Virus không có các cấu trúc này (không phải tế bào), nên kháng sinh không có tác dụng.' },
    ],
  },

  'H10SINH-w28-quiz': {
    topic: 'Ứng dụng vi sinh vật trong đời sống',
    intro: 'Vi sinh vật được con người khai thác trong chế biến thực phẩm, sản xuất thuốc và xử lý môi trường. Các em sẽ thấy vi sinh vật là người bạn hữu ích trong đời sống.',
    objectives: [
      'Nêu các ứng dụng của lên men trong chế biến thực phẩm.',
      'Trình bày vai trò vi sinh vật trong y dược và nông nghiệp.',
      'Giải thích vai trò xử lý môi trường của vi sinh vật.',
    ],
    theory: [
      { h: 'Ứng dụng trong thực phẩm' },
      { ul: ['Lên men lactic: vi khuẩn lactic làm sữa chua, dưa muối, nem chua', 'Lên men ethanol: nấm men Saccharomyces làm rượu, bia, bánh mì', 'Sản xuất giấm: vi khuẩn Acetobacter oxy hoá ethanol thành acid acetic'] },
      { h: 'Ứng dụng trong y dược' },
      { p: 'Vi sinh vật được dùng để sản xuất kháng sinh (penicillin từ nấm Penicillium, do Fleming phát hiện 1928), vitamin, vaccine và nhiều hợp chất sinh học khác.' },
      { h: 'Ứng dụng trong nông nghiệp' },
      { p: 'Sản xuất thuốc trừ sâu sinh học từ vi khuẩn Bacillus thuringiensis (Bt) an toàn hơn hoá chất; sản xuất phân vi sinh, chế phẩm cố định đạm cải tạo đất.' },
      { h: 'Xử lý môi trường' },
      { p: 'Vi sinh vật phân giải chất hữu cơ trong nước thải, rác thải thành CO₂ và sinh khối, góp phần làm sạch môi trường và tái tạo chu trình vật chất.' },
      { note: 'Từ hũ dưa muối đến nhà máy kháng sinh, vi sinh vật âm thầm phục vụ đời sống con người mỗi ngày.' },
    ],
    examples: [
      { q: 'Vì sao muối dưa, cà lại bảo quản được lâu và có vị chua?', a: 'Vi khuẩn lactic lên men đường trong rau thành acid lactic, tạo vị chua và làm môi trường acid. Môi trường acid ức chế các vi sinh vật gây thối, nhờ đó dưa cà được bảo quản lâu hơn.' },
      { q: 'Vì sao thuốc trừ sâu sinh học Bt được ưa chuộng hơn thuốc hoá học?', a: 'Vì vi khuẩn Bt tiết độc tố chỉ diệt sâu hại mà an toàn với người, vật nuôi và thiên địch, lại dễ phân huỷ trong tự nhiên. Thuốc hoá học thường độc, tồn dư lâu và gây ô nhiễm môi trường.' },
    ],
  },

  'H10SINH-w29-quiz': {
    topic: 'Virus — Khái niệm và đặc điểm',
    intro: 'Virus là dạng sống ranh giới giữa sống và không sống, vô cùng nhỏ bé nhưng có ảnh hưởng lớn. Các em sẽ tìm hiểu cấu tạo và đặc điểm độc đáo của virus.',
    objectives: [
      'Mô tả cấu tạo của virus.',
      'Nêu đặc điểm sống đặc biệt của virus.',
      'Phân biệt virus có vỏ ngoài và không có vỏ ngoài.',
    ],
    theory: [
      { h: 'Cấu tạo virus' },
      { p: 'Virus có cấu tạo rất đơn giản gồm hai phần: vỏ protein (capsid) và lõi axit nucleic. Lõi chỉ chứa một loại axit nucleic là ADN hoặc ARN, không bao giờ có cả hai. Virus chưa có cấu tạo tế bào.' },
      { h: 'Cấu trúc thêm' },
      { p: 'Một số virus có thêm vỏ ngoài (envelope) là lớp lipid kép lấy từ màng tế bào chủ, trên đó gắn các gai glycoprotein giúp nhận diện và bám vào tế bào.' },
      { h: 'Đặc điểm sống đặc biệt' },
      { ul: ['Không có cấu tạo tế bào, không có bào quan', 'Kí sinh nội bào bắt buộc - chỉ nhân lên trong tế bào sống', 'Ngoài tế bào chủ, virus trơ như vật không sống', 'Kích thước siêu nhỏ, đo bằng nanomet'] },
      { h: 'Lịch sử phát hiện' },
      { p: 'Năm 1892, nhà khoa học Ivanovsky phát hiện tác nhân gây bệnh khảm thuốc lá nhỏ hơn vi khuẩn, lọt qua màng lọc vi khuẩn - mở đầu cho ngành virus học.' },
      { note: 'Virus đứng ở ranh giới giữa sống và không sống: vừa có vật chất di truyền, vừa không tự duy trì sự sống độc lập.' },
    ],
    examples: [
      { q: 'Vì sao nói virus là dạng kí sinh nội bào bắt buộc?', a: 'Vì virus không có cấu tạo tế bào, không có bộ máy chuyển hoá và tổng hợp riêng. Chúng chỉ có thể nhân lên khi xâm nhập vào tế bào sống và sử dụng bộ máy của tế bào chủ; ngoài tế bào, virus không thể tự nhân lên.' },
      { q: 'Tại sao virus được coi là ranh giới giữa vật sống và không sống?', a: 'Vì virus có vật chất di truyền (ADN hoặc ARN) và có thể nhân lên (đặc tính sống), nhưng lại không có cấu tạo tế bào, không tự trao đổi chất, ngoài tế bào chủ thì trơ như tinh thể (đặc tính không sống).' },
    ],
  },

  'H10SINH-w30-quiz': {
    topic: 'Chu trình nhân lên của virus',
    intro: 'Virus nhân lên bằng cách chiếm dụng bộ máy của tế bào chủ. Các em sẽ tìm hiểu các giai đoạn nhân lên và sự khác nhau giữa chu trình tan và tiềm tan.',
    objectives: [
      'Trình bày các giai đoạn nhân lên của virus.',
      'Giải thích tính đặc hiệu của virus với tế bào chủ.',
      'Phân biệt chu trình tan và chu trình tiềm tan.',
    ],
    theory: [
      { h: 'Năm giai đoạn nhân lên' },
      { ul: ['Hấp phụ (bám): gai virus khớp thụ thể đặc hiệu trên màng tế bào chủ', 'Xâm nhập: đưa axit nucleic (hoặc cả virus) vào trong tế bào', 'Tổng hợp: dùng bộ máy tế bào chủ tổng hợp axit nucleic và protein virus', 'Lắp ráp: ghép vỏ protein và lõi tạo virus mới', 'Phóng thích (giải phóng): virus mới thoát ra, có thể làm tan tế bào'] },
      { h: 'Tính đặc hiệu' },
      { p: 'Virus chỉ xâm nhập được tế bào có thụ thể tương khớp với gai của nó. Đây là lý do mỗi loại virus chỉ gây bệnh cho một số loài, thậm chí một số loại tế bào nhất định.' },
      { h: 'Chu trình tan và tiềm tan' },
      { ul: ['Chu trình tan (lytic): virus nhân lên nhanh, phá vỡ và làm tan tế bào chủ', 'Chu trình tiềm tan (lysogenic): hệ gen virus gài vào ADN tế bào chủ, tồn tại tiềm ẩn, nhân lên cùng tế bào'] },
      { h: 'Trường hợp đặc biệt' },
      { p: 'HIV là retrovirus chứa ARN, dùng enzyme phiên mã ngược tạo ADN rồi gài vào hệ gen tế bào người. Bacteriophage là virus kí sinh trên vi khuẩn.' },
      { note: 'Virus không tự nhân lên mà "mượn dây chuyền" của tế bào chủ - đó là chiến lược ký sinh tinh vi.' },
    ],
    examples: [
      { q: 'Vì sao mỗi loại virus chỉ gây bệnh ở một số loài hoặc một số tế bào nhất định?', a: 'Vì virus chỉ bám và xâm nhập được tế bào có thụ thể tương khớp với gai của nó. Tế bào không có thụ thể phù hợp thì virus không bám vào được, nên không bị nhiễm. Đó là tính đặc hiệu của virus.' },
      { q: 'So sánh hậu quả của chu trình tan và chu trình tiềm tan đối với tế bào chủ.', a: 'Chu trình tan làm tế bào chủ bị phá vỡ ngay để giải phóng virus mới, nên gây hại nhanh. Chu trình tiềm tan gài hệ gen virus vào ADN chủ, virus tồn tại tiềm ẩn không phá tế bào ngay, có thể chuyển sang chu trình tan khi gặp điều kiện thuận lợi.' },
    ],
  },

  'H10SINH-w31-quiz': {
    topic: 'Bệnh do virus và phòng chống',
    intro: 'Nhiều bệnh nguy hiểm ở người do virus gây ra. Các em sẽ tìm hiểu các bệnh virus phổ biến và biện pháp phòng chống, đặc biệt là vai trò của vaccine.',
    objectives: [
      'Kể tên các bệnh do virus thường gặp.',
      'Nêu các con đường lây truyền của virus.',
      'Giải thích nguyên lý hoạt động của vaccine.',
    ],
    theory: [
      { h: 'Các bệnh do virus' },
      { p: 'Nhiều bệnh ở người do virus gây ra: cúm (Influenza), sởi, quai bị, viêm gan, HIV/AIDS, COVID-19 (do SARS-CoV-2). Cần phân biệt với bệnh do vi khuẩn như lao (do Mycobacterium tuberculosis).' },
      { h: 'Con đường lây truyền' },
      { ul: ['Đường hô hấp: cúm, sởi, COVID-19', 'Đường tiêu hoá: viêm gan A, bại liệt', 'Đường máu, tình dục, mẹ sang con: HIV, viêm gan B', 'Qua vật trung gian (muỗi): sốt xuất huyết'] },
      { h: 'Vaccine - phòng bệnh chủ động' },
      { p: 'Vaccine chứa kháng nguyên (virus bất hoạt, giảm độc lực hoặc thành phần của virus) giúp hệ miễn dịch "tập dượt" tạo kháng thể và tế bào nhớ. Khi gặp virus thật, cơ thể phản ứng nhanh và mạnh.' },
      { h: 'Phòng chống khác' },
      { p: 'Đeo khẩu trang, rửa tay, giữ khoảng cách, vệ sinh môi trường và nâng cao sức đề kháng giúp hạn chế lây lan virus. Lưu ý kháng sinh không có tác dụng với virus.' },
      { note: 'Phòng bệnh hơn chữa bệnh - với virus thì tiêm vaccine và giữ vệ sinh là tuyến phòng thủ quan trọng nhất.' },
    ],
    examples: [
      { q: 'Vì sao dùng kháng sinh để chữa bệnh cúm là không đúng?', a: 'Vì cúm do virus gây ra, mà kháng sinh chỉ tác động lên vi khuẩn (thành tế bào, ribosome...). Virus không có các cấu trúc đó nên kháng sinh không diệt được. Lạm dụng kháng sinh còn gây kháng thuốc.' },
      { q: 'Vaccine giúp cơ thể chống lại virus như thế nào?', a: 'Vaccine đưa kháng nguyên vào cơ thể để hệ miễn dịch nhận diện và tạo kháng thể cùng tế bào nhớ mà không gây bệnh. Khi virus thật xâm nhập, tế bào nhớ giúp cơ thể đáp ứng nhanh và mạnh, tiêu diệt virus trước khi gây bệnh nặng.' },
    ],
  },

  'H10SINH-w32-quiz': {
    topic: 'Ứng dụng virus và miễn dịch',
    intro: 'Virus không chỉ gây bệnh mà còn được con người khai thác phục vụ y học. Các em sẽ tìm hiểu các ứng dụng của virus và hệ thống miễn dịch bảo vệ cơ thể.',
    objectives: [
      'Nêu các ứng dụng của virus trong khoa học và y học.',
      'Phân biệt miễn dịch không đặc hiệu và đặc hiệu.',
      'Giải thích vai trò của kháng thể và trí nhớ miễn dịch.',
    ],
    theory: [
      { h: 'Ứng dụng của virus' },
      { ul: ['Sản xuất vaccine (virus bất hoạt, giảm độc lực)', 'Liệu pháp gen: dùng virus làm vector chuyển gen lành vào tế bào để chữa bệnh', 'Sản xuất chế phẩm sinh học, kiểm soát côn trùng gây hại', 'Công cụ nghiên cứu sinh học phân tử'] },
      { h: 'Miễn dịch không đặc hiệu' },
      { p: 'Là hàng rào bảo vệ tự nhiên, có sẵn từ khi sinh: da, niêm mạc, dịch tiết và các bạch cầu thực bào. Phản ứng nhanh nhưng không phân biệt loại tác nhân.' },
      { h: 'Miễn dịch đặc hiệu' },
      { p: 'Do tế bào lympho B và T đảm nhận. Lympho B tạo kháng thể (protein đặc hiệu nhận diện và bám kháng nguyên), lympho T tiêu diệt tế bào nhiễm. Phản ứng chậm hơn nhưng đặc hiệu và mạnh.' },
      { h: 'Trí nhớ miễn dịch' },
      { p: 'Sau khi nhiễm hoặc tiêm vaccine, cơ thể giữ lại các tế bào nhớ. Khi gặp lại cùng kháng nguyên, cơ thể đáp ứng nhanh và mạnh hơn - đây là cơ sở khoa học của vaccine.' },
      { note: 'Tác nhân từng gây bệnh lại trở thành công cụ chữa bệnh - đó là sự thông minh trong ứng dụng virus.' },
    ],
    examples: [
      { q: 'Vì sao người đã mắc sởi một lần thường không mắc lại?', a: 'Vì sau khi khỏi bệnh, cơ thể giữ lại tế bào nhớ đặc hiệu với virus sởi. Khi virus sởi xâm nhập lần sau, tế bào nhớ giúp đáp ứng miễn dịch nhanh và mạnh, tiêu diệt virus trước khi gây bệnh.' },
      { q: 'Phân biệt vai trò của miễn dịch không đặc hiệu và đặc hiệu.', a: 'Miễn dịch không đặc hiệu (da, niêm mạc, thực bào) là tuyến đầu, phản ứng nhanh với mọi tác nhân nhưng không chọn lọc. Miễn dịch đặc hiệu (lympho B, T) phản ứng chậm hơn nhưng nhận diện chính xác từng kháng nguyên và tạo trí nhớ miễn dịch.' },
    ],
  },

  'H10SINH-w33-quiz': {
    topic: 'Bệnh truyền nhiễm và an toàn sinh học',
    intro: 'Bệnh truyền nhiễm có thể lây lan thành dịch nếu không phòng chống đúng cách. Các em sẽ tìm hiểu cơ chế lây truyền, biện pháp phòng dịch và nguyên tắc an toàn sinh học.',
    objectives: [
      'Nêu khái niệm và đường lây của bệnh truyền nhiễm.',
      'Trình bày các biện pháp phòng chống dịch bệnh.',
      'Nêu nguyên tắc an toàn sinh học.',
    ],
    theory: [
      { h: 'Bệnh truyền nhiễm' },
      { p: 'Bệnh truyền nhiễm là bệnh do vi sinh vật (vi khuẩn, virus, nấm, ký sinh trùng) gây ra và có khả năng lây lan từ cá thể này sang cá thể khác. Cần phân biệt với bệnh di truyền (qua gen) và bệnh do thiếu dinh dưỡng.' },
      { h: 'Đường lây truyền' },
      { ul: ['Đường hô hấp (qua giọt bắn)', 'Đường tiêu hoá (qua thức ăn, nước uống)', 'Đường tiếp xúc trực tiếp hoặc gián tiếp', 'Qua máu, dịch cơ thể và vật trung gian truyền bệnh'] },
      { h: 'Biện pháp phòng chống' },
      { p: 'Tiêm vaccine, giữ vệ sinh cá nhân và môi trường, cách ly nguồn bệnh, ăn chín uống sôi. Thông điệp 5K (Khẩu trang - Khử khuẩn - Khoảng cách - Không tụ tập - Khai báo y tế) được áp dụng trong dịch COVID-19.' },
      { h: 'An toàn sinh học' },
      { p: 'An toàn sinh học (biosafety) là các biện pháp bảo vệ con người và môi trường khỏi tác nhân sinh học nguy hiểm. Phòng thí nghiệm cần tủ an toàn sinh học, đồ bảo hộ, khử trùng dụng cụ và xử lý mẫu đúng quy định.' },
      { note: 'Mỗi cá nhân giữ vệ sinh và tuân thủ quy tắc phòng dịch chính là góp phần bảo vệ cả cộng đồng.' },
    ],
    examples: [
      { q: 'Vì sao trong dịch bệnh hô hấp, việc đeo khẩu trang và giữ khoảng cách lại hiệu quả?', a: 'Vì bệnh lây qua giọt bắn khi nói, ho, hắt hơi. Khẩu trang ngăn giọt bắn phát tán và hít vào, giữ khoảng cách làm giọt bắn rơi xuống trước khi tới người khác, nhờ đó cắt đứt đường lây truyền.' },
      { q: 'Khi làm đổ mẫu vi sinh vật ra bàn thí nghiệm cần xử lý thế nào và vì sao?', a: 'Cần khử trùng ngay vùng đổ bằng cồn 70% hoặc chloramine để tiêu diệt vi sinh vật, tránh chúng phát tán gây nhiễm. Đây là nguyên tắc an toàn sinh học bảo vệ người làm và môi trường phòng thí nghiệm.' },
    ],
  },

  'H10SINH-w34-quiz': {
    topic: 'Sinh học và xã hội',
    intro: 'Tiến bộ sinh học đem lại nhiều lợi ích nhưng cũng đặt ra các vấn đề đạo đức. Các em sẽ tìm hiểu mối quan hệ giữa sinh học với xã hội và định hướng nghề nghiệp.',
    objectives: [
      'Nêu các vấn đề đạo đức sinh học hiện đại.',
      'Phân tích ưu nhược điểm của sinh vật biến đổi gen (GMO).',
      'Liên hệ sinh học với phát triển bền vững và nghề nghiệp.',
    ],
    theory: [
      { h: 'Đạo đức sinh học' },
      { p: 'Đạo đức sinh học (bioethics) đặt ra các nguyên tắc về tính an toàn, công bằng và tôn trọng con người khi áp dụng công nghệ sinh học như chỉnh sửa gen, nhân bản hay thụ tinh nhân tạo.' },
      { h: 'Sinh vật biến đổi gen (GMO)' },
      { ul: ['Ưu điểm: tăng năng suất, kháng sâu bệnh, chịu hạn, bổ sung dinh dưỡng', 'Lo ngại: an toàn lâu dài cho sức khoẻ, ảnh hưởng đa dạng sinh học, vấn đề bản quyền giống'] },
      { h: 'Phát triển bền vững' },
      { p: 'Sinh học góp phần phát triển bền vững qua bảo tồn đa dạng sinh học, sử dụng hợp lý tài nguyên, cân bằng giữa lợi ích kinh tế và bảo vệ môi trường.' },
      { h: 'Nguyên tắc nghiên cứu và nghề nghiệp' },
      { p: 'Nghiên cứu khoa học đòi hỏi trung thực, khách quan và có đạo đức. Sinh học mở ra nhiều ngành nghề: y dược, nông học, công nghệ sinh học, bảo vệ môi trường, công nghệ thực phẩm.' },
      { note: 'Khoa học mạnh mẽ cần đi cùng đạo đức và trách nhiệm với con người, xã hội và môi trường.' },
    ],
    examples: [
      { q: 'Hãy nêu một ưu điểm và một lo ngại đối với cây trồng biến đổi gen.', a: 'Ưu điểm: cây GMO có thể kháng sâu bệnh, cho năng suất cao, giảm dùng thuốc hoá học. Lo ngại: chưa chắc chắn về an toàn lâu dài cho sức khoẻ và tác động tới đa dạng sinh học, nên cần kiểm soát và đánh giá chặt chẽ.' },
      { q: 'Vì sao kỹ thuật chỉnh sửa gen ở người lại đặt ra nhiều vấn đề đạo đức?', a: 'Vì chỉnh sửa gen có thể thay đổi đặc điểm di truyền và truyền cho thế hệ sau, nếu sai sót gây hậu quả khó lường. Ngoài ra còn lo ngại về sự công bằng, đồng thuận và nguy cơ lạm dụng để "thiết kế" con người.' },
    ],
  },

  'H10SINH-w35-quiz': {
    topic: 'Ôn tập cuối năm',
    intro: 'Các em hãy hệ thống lại toàn bộ chương trình Sinh học 10: từ tế bào, chuyển hoá năng lượng, phân bào đến vi sinh vật và virus. Bài ôn tập giúp khắc sâu các kiến thức trọng tâm cho cả năm học.',
    objectives: [
      'Hệ thống hoá kiến thức về tế bào và chuyển hoá năng lượng.',
      'Củng cố kiến thức về phân bào và sinh sản.',
      'Tổng hợp đặc điểm vi sinh vật và virus.',
    ],
    theory: [
      { h: 'Sinh học tế bào' },
      { p: 'Tế bào là đơn vị cấu trúc và chức năng của sự sống, được cấu tạo từ nước và các đại phân tử hữu cơ. Tế bào nhân thực có nhân hoàn chỉnh và nhiều bào quan chuyên hoá; cấu trúc luôn gắn với chức năng.' },
      { h: 'Chuyển hoá năng lượng' },
      { ul: ['Hô hấp tế bào (ở ti thể): phân giải glucose tạo ATP', 'Quang hợp (ở lục lạp): tổng hợp glucose từ CO₂ và H₂O, thải O₂', 'ATP là đồng tiền năng lượng; enzyme xúc tác các phản ứng'] },
      { h: 'Phân bào và sinh sản' },
      { ul: ['Nguyên phân: duy trì bộ NST 2n, cơ sở sinh trưởng và sinh sản vô tính', 'Giảm phân: tạo giao tử n, kết hợp thụ tinh khôi phục 2n và tạo đa dạng di truyền'] },
      { h: 'Vi sinh vật và virus' },
      { p: 'Vi sinh vật nhỏ bé, sinh trưởng nhanh, có nhiều ứng dụng trong đời sống. Virus chưa có cấu tạo tế bào, kí sinh nội bào bắt buộc, vừa gây bệnh vừa được ứng dụng trong y học.' },
      { note: 'Sợi chỉ xuyên suốt cả năm là nguyên lý "cấu trúc quyết định chức năng" - nắm chắc nguyên lý này, các em sẽ hiểu Sinh học một cách hệ thống.' },
    ],
    examples: [
      { q: 'Hãy nêu mối quan hệ giữa quang hợp và hô hấp tế bào.', a: 'Quang hợp tổng hợp glucose và thải O₂; hô hấp tế bào phân giải glucose, dùng O₂ và thải CO₂. Sản phẩm của quá trình này là nguyên liệu của quá trình kia, tạo nên một vòng tuần hoàn vật chất và năng lượng trong sinh giới.' },
      { q: 'So sánh điểm khác biệt cơ bản giữa virus và vi khuẩn.', a: 'Vi khuẩn là tế bào nhân sơ hoàn chỉnh, tự trao đổi chất và sinh sản độc lập, có thể bị diệt bởi kháng sinh. Virus chưa có cấu tạo tế bào, chỉ là vỏ protein bọc lõi axit nucleic, phải kí sinh nội bào bắt buộc và không chịu tác dụng của kháng sinh.' },
    ],
  },

  'H10SINH-w36-quiz': {
    topic: 'Kết thúc Sinh Học 10 — Tế bào và Vi sinh vật làm nền tảng cho lớp 11',
    intro: 'Sinh Học 10 đưa em vào thế giới tế bào — đơn vị cơ bản của sự sống. Từ cấu trúc phân tử đến trao đổi chất, từ phân bào đến vi sinh vật, mỗi bài học đều góp phần xây dựng nền tảng cho sinh học cơ thể ở lớp 11.',
    objectives: [
      'Hệ thống hoá các khái niệm cốt lõi về tế bào, trao đổi chất và vi sinh vật.',
      'Nhận biết mối liên hệ giữa Sinh 10 (cấp tế bào) và Sinh 11 (cấp cơ thể).',
      'Định hướng cách học Sinh học hiệu quả để không cần học thuộc lòng hàng loạt.',
    ],
    theory: [
      { h: 'Bức tranh toàn cảnh Sinh Học 10' },
      { ul: [
        'Hóa học của sự sống: nước, carbohydrate, lipid, protein, nucleic acid — vật chất xây dựng tế bào.',
        'Cấu trúc tế bào: màng sinh chất, các bào quan, tế bào nhân sơ vs nhân thực.',
        'Chuyển hoá năng lượng: quang hợp (lục lạp) và hô hấp tế bào (ti thể).',
        'Phân bào: nguyên phân và giảm phân — cơ sở của sinh sản và di truyền.',
        'Vi sinh vật: vi khuẩn, virus, ứng dụng vi sinh trong đời sống và y học.',
      ] },
      { h: 'Cầu nối sang Sinh Học 11 (Cơ thể)' },
      { ul: [
        'Tế bào → Mô → Cơ quan → Hệ cơ quan → Cơ thể: lớp 11 mở rộng từ tế bào lên toàn cơ thể.',
        'Trao đổi chất tế bào → Tiêu hoá, hô hấp, tuần hoàn, bài tiết của cơ thể thực vật và động vật.',
        'Enzyme và xúc tác sinh học → Điều tiết hormone, thần kinh — lớp 11 mở rộng cơ chế điều hoà.',
        'Nguyên phân/Giảm phân → Di truyền Mendel và NST — nền tảng của di truyền học lớp 12.',
      ] },
      { h: 'Ôn hè cho Sinh học' },
      { ul: [
        'Vẽ lại sơ đồ cấu trúc tế bào từ trí nhớ — cách ôn hiệu quả nhất cho phần này.',
        'Luyện so sánh: quang hợp vs hô hấp, nguyên phân vs giảm phân, nhân sơ vs nhân thực.',
        'Đọc thêm về ứng dụng vi sinh vật (kháng sinh, vaccine, lên men) — kết nối kiến thức với cuộc sống.',
      ] },
      { note: 'Sinh học không đòi hỏi học thuộc công thức như Toán hay Lý — nhưng đòi hỏi hiểu CƠ CHẾ và mối quan hệ. Em hỏi "Tại sao?", không chỉ "Cái gì?" — đó là cách học Sinh giỏi nhất.' },
    ],
    examples: [
      { q: 'Tại sao học tốt cấu trúc tế bào ở lớp 10 lại giúp học lớp 11 nhẹ nhàng hơn?', a: 'Lớp 11 mô tả cơ thể thực vật và động vật hoạt động như thế nào — nhưng mọi hoạt động đó đều xảy ra ở cấp tế bào. Ví dụ: quang hợp xảy ra trong lục lạp của tế bào lá; tiêu hoá phân giải thức ăn thành phân tử đủ nhỏ để vào tế bào; thần kinh dẫn truyền xung điện qua màng tế bào thần kinh. Không hiểu tế bào → không hiểu cơ quan → khó hiểu cơ thể.' },
      { q: 'Nguyên phân và giảm phân học ở lớp 10 có ứng dụng gì ở các lớp tiếp theo?', a: 'Nguyên phân → Lớp 11: tăng trưởng, tái tạo mô, liền thương. Giảm phân → Lớp 12: di truyền học Mendel (mỗi giao tử mang 1 allele), cơ chế tạo biến dị tổ hợp. Đặc biệt giảm phân II tương tự nguyên phân — học sinh nhớ điểm khác biệt (giảm số NST và tạo giao tử) sẽ dễ hiểu tại sao con không giống cha mẹ 100%.' },
    ],
  },
};
