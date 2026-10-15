// ============================================================
// Lớp 10 · ĐỊA LÝ — Lý thuyết 35 tuần (CTGD 2018 — THPT).
// Key trùng id quiz: "H10DIA-wNN-quiz".
// Bám CT Địa lý 10: Địa lý tự nhiên đại cương (Trái Đất, thạch quyển, khí quyển,
// thuỷ quyển, sinh quyển, các quy luật địa lý) — Địa lý kinh tế - xã hội đại cương
// (dân cư, các ngành kinh tế, môi trường và phát triển bền vững).
// Văn phong gọi học sinh là "các em".
// ============================================================

export const H10DIA_LESSONS = {
  'H10DIA-w01-quiz': {
    topic: 'Môn Địa lý và định hướng nghề',
    intro: 'Chào các em đến với Địa lý 10. Bài mở đầu giúp các em hiểu Địa lý nghiên cứu cái gì, dùng những công cụ nào và mở ra những nghề nghiệp nào trong đời sống hiện đại.',
    objectives: [
      'Nêu được đối tượng và vai trò của môn Địa lý.',
      'Phân biệt hai nhánh: địa lý tự nhiên và địa lý kinh tế - xã hội.',
      'Kể được một số phương pháp nghiên cứu và nghề nghiệp liên quan đến Địa lý.',
    ],
    theory: [
      { h: 'Địa lý nghiên cứu cái gì?' },
      { p: 'Địa lý là khoa học nghiên cứu Trái Đất với tư cách là môi trường sống của con người: các thành phần tự nhiên, hoạt động kinh tế - xã hội và mối quan hệ giữa con người với tự nhiên. Điểm cốt lõi của tư duy địa lý là gắn mọi hiện tượng với không gian — nó xảy ra ở đâu, vì sao ở đó, và lan toả ra sao.' },
      { p: 'Môn học chia thành hai nhánh lớn nhưng luôn liên hệ với nhau: địa lý tự nhiên (thạch quyển, khí quyển, thuỷ quyển, sinh quyển) và địa lý kinh tế - xã hội (dân cư, các ngành kinh tế, đô thị). Tự nhiên là nền tảng, còn hoạt động của con người vừa chịu chi phối vừa tác động ngược trở lại tự nhiên.' },
      { h: 'Công cụ của nhà địa lý' },
      { ul: [
        'Bản đồ và Atlat: phương tiện đặc trưng nhất để thể hiện và phân tích không gian.',
        'Khảo sát thực địa: trực tiếp quan sát, đo đạc, thu mẫu tại địa bàn.',
        'GIS (Hệ thông tin địa lý) và viễn thám: quản lý, phân tích dữ liệu không gian từ vệ tinh, máy bay, drone.',
      ] },
      { h: 'Tỉ lệ bản đồ' },
      { p: 'Tỉ lệ bản đồ cho biết mức độ thu nhỏ so với thực địa. Ví dụ tỉ lệ 1:1.000.000 nghĩa là 1 cm trên bản đồ ứng với 1.000.000 cm = 10 km ngoài thực địa. Tỉ lệ càng lớn (mẫu số càng nhỏ) thì bản đồ càng chi tiết nhưng phạm vi thể hiện càng hẹp.' },
      { h: 'Học Địa lý để làm gì?' },
      { p: 'Kiến thức địa lý mở ra nhiều nghề: bản đồ học, quy hoạch đô thị và vùng, khí tượng - thuỷ văn, quản lý môi trường, du lịch, logistics, và đặc biệt là các ngành dữ liệu không gian (GIS, viễn thám) đang phát triển mạnh.' },
      { note: 'Tư duy địa lý luôn đặt ba câu hỏi: Ở đâu? Vì sao ở đó? Có quan hệ gì với nơi khác?' },
    ],
    examples: [
      { q: 'Một bản đồ ghi tỉ lệ 1:250.000. Hai địa điểm cách nhau 4 cm trên bản đồ thì ngoài thực địa cách nhau bao nhiêu km?', a: '4 cm × 250.000 = 1.000.000 cm = 10 km. Nhân khoảng cách trên bản đồ với mẫu số tỉ lệ rồi đổi đơn vị là tính được khoảng cách thực.' },
      { q: 'Vì sao việc nghiên cứu một trận lũ lại cần cả hai nhánh tự nhiên và kinh tế - xã hội?', a: 'Nhánh tự nhiên giải thích nguyên nhân lũ (mưa lớn, địa hình dốc, mất rừng); nhánh kinh tế - xã hội giải thích thiệt hại và cách ứng phó (dân cư đông, quy hoạch, đê điều). Hiện tượng địa lý luôn là sự đan xen của tự nhiên và con người.' },
    ],
  },

  'H10DIA-w02-quiz': {
    topic: 'Trái Đất trong vũ trụ',
    intro: 'Các em hãy phóng tầm nhìn ra ngoài hành tinh của mình: Trái Đất là một phần rất nhỏ trong Hệ Mặt Trời, vốn nằm trong thiên hà Ngân Hà rộng lớn.',
    objectives: [
      'Mô tả được vị trí của Trái Đất trong Hệ Mặt Trời và Ngân Hà.',
      'Nêu được khoảng cách Trái Đất - Mặt Trời và hình dạng Trái Đất.',
      'Hiểu vai trò của vị trí và hình dạng đối với sự sống.',
    ],
    theory: [
      { h: 'Vũ trụ, thiên hà và Hệ Mặt Trời' },
      { p: 'Vũ trụ là khoảng không gian vô tận chứa các thiên hà. Hệ Mặt Trời của chúng ta nằm trong thiên hà Ngân Hà (Milky Way). Hệ Mặt Trời gồm Mặt Trời ở trung tâm và 8 hành tinh quay quanh, cùng các vệ tinh, tiểu hành tinh và sao chổi.' },
      { h: 'Vị trí của Trái Đất' },
      { ul: [
        'Thứ tự từ Mặt Trời ra: Thuỷ - Kim - Trái Đất - Hoả - Mộc - Thổ - Thiên Vương - Hải Vương.',
        'Trái Đất là hành tinh thứ ba, cách Mặt Trời trung bình khoảng 149,6 triệu km (1 đơn vị thiên văn, viết tắt AU).',
        'Mặt Trăng là vệ tinh tự nhiên duy nhất của Trái Đất.',
      ] },
      { h: 'Hình dạng và kích thước' },
      { p: 'Trái Đất có dạng gần cầu nhưng hơi dẹt ở hai cực và phình ra ở Xích đạo — dạng này gọi là geoid. Bán kính Xích đạo (khoảng 6.378 km) lớn hơn bán kính cực một chút. Hình cầu khiến tia Mặt Trời chiếu tới các vĩ độ với góc khác nhau, là nguyên nhân gốc của sự phân bố nhiệt theo vĩ độ.' },
      { h: 'Vị trí "vừa vặn" cho sự sống' },
      { p: 'Khoảng cách Trái Đất - Mặt Trời không quá gần để bốc hơi hết nước, không quá xa để đóng băng toàn bộ. Nhờ đó nước tồn tại ở cả ba thể, tạo điều kiện cho sự sống — vùng khoảng cách lý tưởng này thường được gọi là "vùng ở được".' },
      { note: 'Ghi nhớ: Trái Đất là hành tinh thứ 3, cách Mặt Trời ~150 triệu km, dạng geoid gần cầu hơi dẹt ở cực.' },
    ],
    examples: [
      { q: 'Vì sao nói hình dạng cầu của Trái Đất là nguyên nhân khiến Xích đạo nóng hơn hai cực?', a: 'Vì bề mặt cong nên ở Xích đạo tia Mặt Trời chiếu gần vuông góc, năng lượng tập trung trên diện tích nhỏ; ở vùng cực tia chiếu rất xiên, cùng một lượng năng lượng trải trên diện tích lớn nên sưởi ấm yếu hơn.' },
      { q: 'Pluto từng được coi là hành tinh thứ 9. Vì sao nay Hệ Mặt Trời chỉ còn 8 hành tinh?', a: 'Năm 2006, Hiệp hội Thiên văn Quốc tế xếp lại Pluto thành "hành tinh lùn" vì nó không dọn sạch được vùng quỹ đạo của mình. Từ đó Hệ Mặt Trời còn 8 hành tinh chính thức.' },
    ],
  },

  'H10DIA-w03-quiz': {
    topic: 'Vận động tự quay quanh trục',
    intro: 'Các em hãy quan sát mỗi ngày: Mặt Trời mọc đằng Đông, lặn đằng Tây. Hiện tượng quen thuộc ấy bắt nguồn từ chuyển động tự quay quanh trục của Trái Đất.',
    objectives: [
      'Nêu được hướng và chu kỳ tự quay quanh trục của Trái Đất.',
      'Giải thích được hiện tượng ngày đêm, giờ địa phương và múi giờ.',
      'Hiểu lực Coriolis làm lệch hướng chuyển động.',
    ],
    theory: [
      { h: 'Hướng và chu kỳ tự quay' },
      { p: 'Trái Đất tự quay quanh trục theo hướng từ Tây sang Đông, hoàn thành một vòng trong khoảng 24 giờ (một ngày đêm). Chính chiều quay này khiến ta thấy Mặt Trời và các thiên thể "mọc" ở phía Đông và "lặn" ở phía Tây — đó là chuyển động biểu kiến.' },
      { h: 'Hệ quả: ngày và đêm' },
      { p: 'Vì Trái Đất hình cầu nên cùng một lúc chỉ một nửa được Mặt Trời chiếu sáng (ban ngày), nửa kia tối (ban đêm). Sự tự quay khiến ranh giới sáng - tối di chuyển liên tục, sinh ra nhịp ngày đêm kế tiếp nhau ở mọi nơi.' },
      { h: 'Giờ địa phương và múi giờ' },
      { ul: [
        'Mỗi kinh tuyến có giờ riêng (giờ địa phương), nơi nào ở phía Đông thì giờ sớm hơn.',
        'Để thống nhất, người ta chia Trái Đất thành 24 múi giờ, mỗi múi rộng 15 độ kinh tuyến.',
        'Việt Nam dùng giờ Đông Dương, thuộc múi giờ +7 (GMT+7).',
      ] },
      { h: 'Lực Coriolis' },
      { p: 'Do Trái Đất tự quay, mọi vật chuyển động trên bề mặt đều bị lệch hướng: ở Bắc bán cầu lệch về bên phải, ở Nam bán cầu lệch về bên trái so với hướng chuyển động. Lực này chi phối hướng gió và hướng các dòng biển.' },
      { note: 'Tự quay sinh ra ba hệ quả lớn: ngày - đêm, giờ khác nhau theo kinh độ, và sự lệch hướng Coriolis.' },
    ],
    examples: [
      { q: 'Khi Hà Nội (GMT+7) là 12 giờ trưa thì Luân Đôn (GMT+0) là mấy giờ?', a: 'Hà Nội ở phía Đông nên sớm hơn Luân Đôn 7 giờ. Vậy khi Hà Nội 12 giờ trưa thì Luân Đôn là 12 − 7 = 5 giờ sáng cùng ngày.' },
      { q: 'Một dòng không khí chuyển động về phía Bắc ở Bắc bán cầu sẽ bị lệch về hướng nào?', a: 'Ở Bắc bán cầu mọi chuyển động lệch về bên phải, nên dòng đang đi về phía Bắc sẽ bị bẻ dần sang phía Đông. Đây là cơ chế tạo nên hướng nghiêng của gió Tín phong và gió Tây.' },
    ],
  },

  'H10DIA-w04-quiz': {
    topic: 'Vận động quanh Mặt Trời và các mùa',
    intro: 'Vì sao có xuân, hạ, thu, đông? Các em sẽ thấy lời giải nằm ở chuyển động của Trái Đất quanh Mặt Trời kết hợp với trục nghiêng cố định.',
    objectives: [
      'Nêu được chu kỳ và hình dạng quỹ đạo Trái Đất quanh Mặt Trời.',
      'Giải thích nguyên nhân các mùa từ độ nghiêng của trục.',
      'Xác định được vị trí Mặt Trời chiếu thẳng đứng vào các ngày chí, phân.',
    ],
    theory: [
      { h: 'Chuyển động tịnh tiến quanh Mặt Trời' },
      { p: 'Trái Đất chuyển động quanh Mặt Trời theo một quỹ đạo hình elip, với Mặt Trời ở một tiêu điểm. Chu kỳ một vòng là khoảng 365 ngày 6 giờ (vì vậy cứ 4 năm lại có một năm nhuận 366 ngày). Trong khi chuyển động, trục Trái Đất luôn nghiêng và hướng không đổi.' },
      { h: 'Độ nghiêng của trục — nguyên nhân các mùa' },
      { p: 'Trục Trái Đất nghiêng 66 độ 33 phút so với mặt phẳng quỹ đạo (tương đương nghiêng 23 độ 27 phút so với pháp tuyến). Chính vì trục nghiêng mà trong năm, mỗi bán cầu lần lượt ngả về phía Mặt Trời rồi ngả ra xa — sinh ra mùa nóng và mùa lạnh. Lưu ý: mùa KHÔNG do khoảng cách xa gần Mặt Trời quyết định.' },
      { h: 'Các ngày đặc biệt trong năm' },
      { ul: [
        'Hạ chí (21-22/6): Mặt Trời chiếu thẳng đứng tại chí tuyến Bắc (23 độ 27 phút B), Bắc bán cầu là mùa hè.',
        'Đông chí (21-22/12): Mặt Trời chiếu thẳng đứng tại chí tuyến Nam, Bắc bán cầu là mùa đông.',
        'Xuân phân (21/3) và Thu phân (23/9): Mặt Trời chiếu thẳng đứng tại Xích đạo, ngày đêm dài bằng nhau khắp nơi.',
      ] },
      { h: 'Mùa ở hai bán cầu ngược nhau' },
      { p: 'Khi Bắc bán cầu là mùa hè thì Nam bán cầu là mùa đông và ngược lại, vì hai bán cầu không bao giờ cùng ngả về phía Mặt Trời. Đó là lý do tháng 6 ở Việt Nam nắng nóng còn ở Australia lại lạnh.' },
      { note: 'Trục nghiêng + chuyển động quanh Mặt Trời = các mùa. Khoảng cách không phải nguyên nhân chính.' },
    ],
    examples: [
      { q: 'Vào ngày 22/6, học sinh ở Australia (Nam bán cầu) đang ở mùa nào? Vì sao?', a: 'Đang là mùa đông. Ngày 22/6 (hạ chí) Bắc bán cầu ngả về Mặt Trời nên là mùa hè; Nam bán cầu khi đó ngả ra xa, nhận ít bức xạ nên là mùa đông.' },
      { q: 'Vì sao vào hai ngày phân (21/3 và 23/9), độ dài ngày và đêm ở mọi nơi đều bằng nhau?', a: 'Vào hai ngày này Mặt Trời chiếu thẳng đứng tại Xích đạo, ranh giới sáng - tối đi qua đúng hai cực, nên mọi vĩ độ đều có nửa thời gian được chiếu sáng — ngày bằng đêm (12 giờ).' },
    ],
  },

  'H10DIA-w05-quiz': {
    topic: 'Cấu trúc Trái Đất và thạch quyển',
    intro: 'Các em hãy hình dung Trái Đất như một quả trứng: có vỏ mỏng bên ngoài và phần dày, nóng bên trong. Bài học này khám phá cấu trúc ấy và lý thuyết kiến tạo mảng.',
    objectives: [
      'Mô tả được cấu trúc ba lớp của Trái Đất và khái niệm thạch quyển.',
      'Phân biệt vỏ lục địa và vỏ đại dương.',
      'Trình bày được nội dung cơ bản của thuyết kiến tạo mảng.',
    ],
    theory: [
      { h: 'Cấu trúc ba lớp' },
      { p: 'Từ ngoài vào trong, Trái Đất gồm ba lớp: vỏ (mỏng nhất), manti (lớp giữa dày, chiếm phần lớn thể tích) và nhân (lõi, nóng nhất). Càng vào sâu, nhiệt độ và áp suất càng tăng.' },
      { h: 'Vỏ Trái Đất và thạch quyển' },
      { ul: [
        'Vỏ lục địa dày khoảng 30-70 km, cấu tạo chủ yếu từ đá granit, nhẹ.',
        'Vỏ đại dương mỏng hơn nhiều, chỉ khoảng 5-10 km, cấu tạo chủ yếu từ đá bazan, nặng hơn.',
        'Thạch quyển gồm vỏ Trái Đất và phần cứng phía trên của manti, "nổi" trên lớp manti mềm bên dưới.',
      ] },
      { h: 'Thuyết kiến tạo mảng' },
      { p: 'Thạch quyển không liền một khối mà bị tách thành các mảng kiến tạo lớn nhỏ. Các mảng này dịch chuyển rất chậm trên lớp manti mềm, do dòng đối lưu vật chất nóng trong manti cung cấp năng lượng. Khi các mảng tách xa, xô vào nhau hoặc trượt ngang, chúng tạo ra các dạng địa hình và hiện tượng khác nhau.' },
      { h: 'Động đất, núi lửa và "Vành đai lửa"' },
      { p: 'Động đất và núi lửa tập trung ở ranh giới các mảng kiến tạo, nơi vỏ Trái Đất chịu lực mạnh nhất. Tiêu biểu là "Vành đai lửa Thái Bình Dương" bao quanh đại dương này, nơi tập trung phần lớn núi lửa và động đất của thế giới.' },
      { note: 'Thạch quyển = vỏ + phần cứng manti trên; nó bị chia thành các mảng di chuyển.' },
    ],
    examples: [
      { q: 'Vì sao Nhật Bản và Indonesia thường xuyên có động đất, núi lửa?', a: 'Vì hai nước nằm trên "Vành đai lửa Thái Bình Dương" — vùng ranh giới nơi nhiều mảng kiến tạo xô vào nhau. Lực tương tác giữa các mảng tích tụ rồi giải phóng, gây động đất và làm magma trào lên thành núi lửa.' },
      { q: 'Tại sao vỏ đại dương "nằm thấp" tạo nên các đại dương còn vỏ lục địa nhô cao tạo lục địa?', a: 'Vỏ đại dương cấu tạo từ bazan nặng và mỏng nên "chìm" thấp, là nơi tích tụ nước biển; vỏ lục địa từ granit nhẹ và dày hơn nên nổi cao hơn, tạo thành các khối lục địa.' },
    ],
  },

  'H10DIA-w06-quiz': {
    topic: 'Khí quyển — cấu trúc và thành phần',
    intro: 'Lớp không khí bao quanh Trái Đất tuy mỏng manh nhưng là tấm "áo giáp" che chở sự sống. Các em sẽ tìm hiểu khí quyển gồm những gì và chia thành mấy tầng.',
    objectives: [
      'Kể được các tầng của khí quyển và đặc điểm tầng đối lưu.',
      'Nêu thành phần chính của không khí và vai trò tầng ozone.',
      'Hiểu khí nhà kính và nguyên nhân ô nhiễm không khí.',
    ],
    theory: [
      { h: 'Các tầng khí quyển' },
      { p: 'Theo độ cao, khí quyển chia thành 5 tầng: tầng đối lưu, tầng bình lưu, tầng giữa (trung lưu), tầng nhiệt (nhiệt lưu) và tầng ngoài (ngoại lưu). Mỗi tầng có đặc điểm nhiệt độ và mật độ không khí khác nhau.' },
      { h: 'Tầng đối lưu và tầng bình lưu' },
      { ul: [
        'Tầng đối lưu (sát mặt đất, dày khoảng 0-12 km) chứa phần lớn không khí và hơi nước, là nơi diễn ra hầu hết hiện tượng thời tiết: mây, mưa, gió, bão.',
        'Tầng bình lưu nằm trên tầng đối lưu, chứa tầng ozone (O3) hấp thụ phần lớn tia tử ngoại (UV) gây hại, bảo vệ sinh vật.',
      ] },
      { h: 'Thành phần không khí' },
      { p: 'Không khí khô gồm khoảng 78% khí nitơ (N2), 21% khí oxy (O2) và khoảng 1% các khí khác như argon, carbon dioxide (CO2). Ngoài ra trong không khí còn có hơi nước với tỉ lệ thay đổi, đóng vai trò then chốt trong các hiện tượng thời tiết.' },
      { h: 'Khí nhà kính và ô nhiễm không khí' },
      { p: 'Một số khí như CO2, methane (CH4) và hơi nước có khả năng giữ nhiệt, tạo "hiệu ứng nhà kính" giúp Trái Đất đủ ấm. Tuy nhiên việc đốt nhiên liệu hoá thạch trong công nghiệp và giao thông làm tăng các khí này quá mức, gây ô nhiễm không khí và biến đổi khí hậu.' },
      { note: 'Tầng đối lưu là "nhà của thời tiết"; tầng ozone ở bình lưu chắn tia UV.' },
    ],
    examples: [
      { q: 'Vì sao "lỗ thủng tầng ozone" lại nguy hiểm với con người và sinh vật?', a: 'Tầng ozone hấp thụ tia tử ngoại UV. Khi tầng này bị suy giảm, lượng tia UV chiếu xuống mặt đất tăng, gây ung thư da, hại mắt và làm tổn thương nhiều loài sinh vật, nhất là sinh vật phù du trong biển.' },
      { q: 'Vì sao gần như mọi hiện tượng thời tiết các em quan sát hằng ngày đều diễn ra ở tầng đối lưu?', a: 'Vì tầng đối lưu sát mặt đất, tập trung phần lớn không khí và toàn bộ hơi nước. Hơi nước bốc lên, ngưng tụ tạo mây, mưa; chênh lệch nhiệt và áp ở tầng này sinh gió, bão. Các tầng trên hầu như không có hơi nước nên không có thời tiết.' },
    ],
  },

  'H10DIA-w07-quiz': {
    topic: 'Bức xạ và nhiệt độ không khí',
    intro: 'Năng lượng làm Trái Đất ấm lên đến từ đâu, và vì sao cùng một lúc nơi này nóng nơi kia lạnh? Các em sẽ tìm câu trả lời trong bài về bức xạ Mặt Trời.',
    objectives: [
      'Xác định nguồn nhiệt chính của Trái Đất là bức xạ Mặt Trời.',
      'Giải thích sự phân bố nhiệt theo vĩ độ.',
      'Nêu các nhân tố ảnh hưởng đến nhiệt độ không khí.',
    ],
    theory: [
      { h: 'Nguồn nhiệt của Trái Đất' },
      { p: 'Nguồn cung cấp nhiệt chủ yếu cho bề mặt Trái Đất là bức xạ Mặt Trời. Khi tia bức xạ chiếu xuống, mặt đất hấp thụ và nóng lên, rồi toả nhiệt làm nóng lớp không khí ngay trên đó. Vì vậy không khí được sưởi ấm "từ dưới lên", giải thích vì sao càng lên cao càng lạnh.' },
      { h: 'Phân bố nhiệt theo vĩ độ' },
      { ul: [
        'Vùng Xích đạo nhận nhiều bức xạ nhất vì tia chiếu gần vuông góc, năng lượng tập trung.',
        'Vùng cực nhận ít bức xạ nhất vì tia chiếu rất xiên và thời gian chiếu sáng trong năm ngắn.',
        'Lượng bức xạ tới một nơi phụ thuộc góc tới (do vĩ độ) và thời điểm trong năm.',
      ] },
      { h: 'Các nhân tố ảnh hưởng nhiệt độ không khí' },
      { p: 'Nhiệt độ không khí thay đổi theo nhiều nhân tố: vĩ độ (gần Xích đạo nóng hơn), độ cao địa hình (lên cao 100 m, nhiệt độ giảm trung bình khoảng 0,6 độ C trong tầng đối lưu), vị trí gần hay xa biển (ven biển điều hoà hơn lục địa), và lớp phủ bề mặt.' },
      { h: 'Vì sao vùng cực lạnh?' },
      { p: 'Ở vùng cực, tia Mặt Trời chiếu rất xiên nên năng lượng trải mỏng trên diện tích lớn; lại có những tháng đêm cực kéo dài, hầu như không nhận bức xạ. Cộng thêm băng tuyết phản xạ lại phần lớn bức xạ, khiến nơi đây lạnh giá quanh năm.' },
      { note: 'Lên cao 100 m nhiệt độ giảm khoảng 0,6 độ C; Xích đạo nóng, hai cực lạnh.' },
    ],
    examples: [
      { q: 'Một ngọn núi cao 2.000 m so với chân núi. Nếu chân núi 25 độ C thì đỉnh núi khoảng bao nhiêu độ?', a: 'Lên cao 100 m giảm 0,6 độ C, nên lên 2.000 m giảm 2.000/100 × 0,6 = 12 độ C. Nhiệt độ đỉnh núi xấp xỉ 25 − 12 = 13 độ C. Đây là lý do vùng núi cao mát mẻ như Sa Pa, Đà Lạt.' },
      { q: 'Vì sao mùa hè ở thành phố ven biển thường mát hơn thành phố sâu trong lục địa cùng vĩ độ?', a: 'Nước biển nóng lên và nguội đi chậm hơn đất liền, nên biển điều hoà nhiệt độ vùng ven bờ: mùa hè biển hút bớt nhiệt làm ven biển mát hơn, còn lục địa nóng lên nhanh nên gay gắt hơn.' },
    ],
  },

  'H10DIA-w08-quiz': {
    topic: 'Khí áp và gió',
    intro: 'Gió là không khí đang chuyển động. Các em sẽ thấy mọi loại gió, từ làn gió mát đến cơn bão, đều bắt nguồn từ sự chênh lệch khí áp.',
    objectives: [
      'Nêu được khái niệm khí áp và sự thay đổi khí áp theo độ cao.',
      'Giải thích nguyên nhân sinh ra gió và các loại gió chính.',
      'Trình bày cơ chế hình thành gió mùa.',
    ],
    theory: [
      { h: 'Khí áp là gì?' },
      { p: 'Khí áp là sức ép của không khí lên một đơn vị diện tích bề mặt Trái Đất. Khi lên cao, mật độ không khí giảm nên khí áp giảm dần. Khí áp cũng thay đổi theo nhiệt độ: không khí nóng nở ra, nhẹ và bốc lên tạo vùng áp thấp; không khí lạnh co lại, nặng và chìm xuống tạo vùng áp cao.' },
      { h: 'Gió hình thành như thế nào?' },
      { p: 'Gió là chuyển động của không khí từ vùng áp cao về vùng áp thấp. Chênh lệch khí áp càng lớn thì gió thổi càng mạnh. Trên đường đi, gió bị lực Coriolis làm lệch hướng, nên không thổi thẳng mà bị bẻ cong.' },
      { h: 'Các loại gió thường xuyên' },
      { ul: [
        'Gió Tín phong (mậu dịch): thổi từ áp cao chí tuyến về áp thấp Xích đạo, khá ổn định.',
        'Gió Tây ôn đới: thổi từ áp cao chí tuyến về áp thấp ôn đới, ở vĩ độ khoảng 30-60 độ hai bán cầu.',
        'Gió Đông cực: thổi từ áp cao cực về vĩ độ ôn đới.',
      ] },
      { h: 'Gió mùa' },
      { p: 'Gió mùa hình thành do chênh lệch nhiệt độ và khí áp giữa lục địa và đại dương theo mùa. Mùa hè, lục địa nóng tạo áp thấp hút gió ẩm từ biển vào gây mưa; mùa đông, lục địa lạnh tạo áp cao đẩy gió khô ra biển. Việt Nam chịu tác động mạnh của gió mùa: gió mùa Đông Bắc lạnh khô và gió mùa Tây Nam (mùa hạ) nóng ẩm.' },
      { note: 'Gió luôn thổi từ áp cao về áp thấp; gió mùa do tương phản nhiệt lục địa - đại dương.' },
    ],
    examples: [
      { q: 'Vì sao ở miền Bắc Việt Nam, mùa đông thường có những đợt lạnh khô, còn mùa hè lại nóng ẩm, mưa nhiều?', a: 'Mùa đông gió mùa Đông Bắc từ áp cao lục địa châu Á (lạnh, khô) tràn xuống. Mùa hè gió mùa Tây Nam mang hơi ẩm từ biển vào, gặp địa hình nâng lên gây mưa. Sự luân phiên của hai mùa gió tạo nên khí hậu nhiệt đới ẩm gió mùa.' },
      { q: 'Vì sao trên các bản đồ khí áp, vùng áp thấp thường đi kèm thời tiết xấu (mưa, bão)?', a: 'Ở vùng áp thấp, không khí nóng bốc lên cao, gặp lạnh ngưng tụ tạo mây và mưa; gió từ xung quanh hội tụ về càng đẩy không khí lên mạnh. Vì vậy áp thấp gắn với thời tiết nhiều mây, mưa, thậm chí bão.' },
    ],
  },

  'H10DIA-w09-quiz': {
    topic: 'Lượng mưa và sự phân bố mưa',
    intro: 'Vì sao có nơi mưa quanh năm, có nơi quanh năm khô hạn? Bài học này giúp các em hiểu mưa hình thành ra sao và phân bố theo quy luật nào.',
    objectives: [
      'Giải thích quá trình hình thành mưa.',
      'Trình bày sự phân bố mưa theo vĩ độ và địa hình.',
      'Nêu các kiểu mưa: mưa địa hình, mưa front, hiệu ứng phơn.',
    ],
    theory: [
      { h: 'Mưa hình thành như thế nào?' },
      { p: 'Hơi nước bốc lên cao, gặp nhiệt độ thấp thì ngưng tụ thành các hạt nước nhỏ tạo mây. Khi các hạt nước kết hợp đủ lớn và nặng, chúng rơi xuống thành mưa. Như vậy điều kiện để có mưa là phải có hơi nước và có sự bốc lên - làm lạnh không khí.' },
      { h: 'Phân bố mưa theo vĩ độ' },
      { ul: [
        'Vùng Xích đạo mưa nhiều nhất do không khí nóng ẩm bốc lên mạnh và gió hội tụ.',
        'Vùng chí tuyến (khoảng 30 độ) thường khô hạn do áp cao, không khí đi xuống — đây là nơi tập trung nhiều sa mạc lớn như Sahara, Atacama.',
        'Vùng ôn đới mưa khá nhiều nhờ hoạt động của gió Tây và các khối khí gặp nhau.',
      ] },
      { h: 'Ảnh hưởng của địa hình' },
      { p: 'Khi gió ẩm gặp dãy núi, nó buộc phải bốc lên cao, lạnh đi và gây mưa nhiều ở sườn đón gió. Vượt qua đỉnh, không khí đã mất hơi nước, đi xuống sườn bên kia trở nên khô và nóng — gọi là hiệu ứng phơn (foehn). Ở Việt Nam, gió phơn Tây Nam (gió Lào) gây khô nóng cho vùng Bắc Trung Bộ.' },
      { h: 'Mưa front (mưa do khối khí gặp nhau)' },
      { p: 'Khi một khối khí nóng và một khối khí lạnh gặp nhau, khối khí nóng nhẹ hơn bị đẩy bốc lên trên, ngưng tụ và gây mưa dọc theo mặt tiếp xúc gọi là front. Đây là kiểu mưa phổ biến ở vùng ôn đới.' },
      { note: 'Sườn đón gió mưa nhiều; sườn khuất gió khô nóng do hiệu ứng phơn.' },
    ],
    examples: [
      { q: 'Vì sao các sa mạc lớn nhất thế giới (Sahara, Arabia) lại nằm gần vĩ độ 30 độ chứ không phải ở hai cực hay Xích đạo?', a: 'Ở vĩ độ chí tuyến (~30 độ) tồn tại các dải áp cao, không khí đi xuống và nén nóng nên rất khô, hơi nước không ngưng tụ được nên hầu như không mưa. Vì vậy đây là vành đai tập trung các sa mạc.' },
      { q: 'Vì sao gió Lào thổi vào Bắc Trung Bộ lại khô và nóng?', a: 'Gió Tây Nam mang hơi ẩm từ vịnh Thái Lan, khi vượt dãy Trường Sơn thì trút hết mưa ở sườn đón gió phía Tây. Sang sườn Đông, không khí đã khô lại đi xuống nén nóng (hiệu ứng phơn), nên thổi tới đồng bằng thành gió khô nóng.' },
    ],
  },

  'H10DIA-w10-quiz': {
    topic: 'Thuỷ quyển và vòng tuần hoàn nước',
    intro: 'Nước che phủ phần lớn bề mặt Trái Đất và không ngừng luân chuyển. Các em sẽ tìm hiểu thuỷ quyển gồm những gì và nước "đi vòng" như thế nào.',
    objectives: [
      'Nêu được thành phần của thuỷ quyển và tỉ lệ nước mặn - nước ngọt.',
      'Mô tả các giai đoạn của vòng tuần hoàn nước.',
      'Hiểu nguồn năng lượng điều khiển vòng tuần hoàn và sự hình thành nước ngầm.',
    ],
    theory: [
      { h: 'Thuỷ quyển gồm những gì?' },
      { p: 'Thuỷ quyển là toàn bộ lớp nước trên Trái Đất: đại dương, biển, sông, hồ, băng tuyết, nước ngầm và hơi nước trong khí quyển. Trong đó đại dương chiếm phần lớn về khối lượng.' },
      { h: 'Nước mặn và nước ngọt' },
      { ul: [
        'Khoảng 97% lượng nước trên Trái Đất là nước mặn (đại dương), chỉ khoảng 3% là nước ngọt.',
        'Trong phần nước ngọt ít ỏi ấy, phần lớn (khoảng 2/3) bị "khoá" trong băng tuyết ở hai cực và núi cao.',
        'Nước ngọt mà con người dễ sử dụng (sông, hồ, nước ngầm nông) chỉ chiếm tỉ lệ rất nhỏ.',
      ] },
      { h: 'Vòng tuần hoàn nước' },
      { p: 'Nước luân chuyển khép kín qua các giai đoạn: bốc hơi từ biển, sông, đất và cây cối lên khí quyển; ngưng tụ thành mây; rơi xuống thành mưa hoặc tuyết; tạo dòng chảy trên mặt và thấm xuống tạo nước ngầm; rồi lại chảy ra biển và bốc hơi. Quá trình này diễn ra liên tục, không có điểm đầu - cuối.' },
      { h: 'Năng lượng và nước ngầm' },
      { p: 'Năng lượng điều khiển toàn bộ vòng tuần hoàn nước chính là bức xạ Mặt Trời — nó làm nước bốc hơi. Khi mưa rơi, một phần nước thấm qua đất, đi vào các tầng đá có khe hở và tích tụ lại thành nước ngầm — nguồn cung cấp nước quan trọng cho giếng và mạch nước.' },
      { note: '97% nước là nước mặn; vòng tuần hoàn nước được Mặt Trời điều khiển.' },
    ],
    examples: [
      { q: 'Người ta nói "nước trên Trái Đất rất nhiều nhưng nước dùng được lại rất ít". Hãy giải thích bằng số liệu.', a: 'Tới 97% là nước mặn không dùng trực tiếp được. Trong 3% nước ngọt còn lại, đa số nằm trong băng tuyết và nước ngầm sâu. Phần nước ngọt dễ khai thác (sông, hồ) chỉ là một phần rất nhỏ — nên dù tổng lượng nước khổng lồ, nước ngọt sạch vẫn khan hiếm.' },
      { q: 'Vì sao việc phá rừng đầu nguồn làm suy giảm nguồn nước ngầm?', a: 'Rừng giúp giữ nước mưa, làm chậm dòng chảy để nước có thời gian thấm xuống đất bổ sung tầng nước ngầm. Khi mất rừng, nước mưa chảy tràn nhanh ra sông biển, ít thấm xuống đất, nên mực nước ngầm hạ thấp và mùa khô dễ thiếu nước.' },
    ],
  },

  'H10DIA-w11-quiz': {
    topic: 'Thổ nhưỡng và sinh quyển',
    intro: 'Lớp đất mỏng dưới chân và muôn loài sinh vật quanh ta hợp thành nền tảng của sự sống trên cạn. Các em sẽ tìm hiểu đất hình thành ra sao và sinh quyển là gì.',
    objectives: [
      'Nêu khái niệm thổ nhưỡng và các nhân tố hình thành đất.',
      'Mô tả đặc điểm đất ferralit ở vùng nhiệt đới ẩm.',
      'Trình bày khái niệm sinh quyển và đa dạng sinh học.',
    ],
    theory: [
      { h: 'Thổ nhưỡng (đất) là gì?' },
      { p: 'Đất là lớp vật chất tơi xốp nằm trên cùng của bề mặt lục địa, nơi cây cối bám rễ và sinh trưởng. Đất là sản phẩm của quá trình phong hoá đá kết hợp với sự tích luỹ chất hữu cơ từ sinh vật.' },
      { h: 'Các nhân tố hình thành đất' },
      { ul: [
        'Đá mẹ: cung cấp chất khoáng cho đất.',
        'Khí hậu: quyết định tốc độ phong hoá (nhiệt, ẩm).',
        'Sinh vật: cung cấp và phân giải chất hữu cơ, tạo mùn.',
        'Địa hình, thời gian và con người cũng góp phần định hình loại đất.',
      ] },
      { h: 'Đất ferralit nhiệt đới' },
      { p: 'Ở vùng nhiệt đới ẩm như Việt Nam, mưa nhiều và nhiệt độ cao khiến quá trình phong hoá diễn ra mạnh, các khoáng chất dễ tan bị rửa trôi, còn lại nhiều sắt và nhôm oxit nên đất có màu đỏ vàng đặc trưng — gọi là đất ferralit. Loại đất này thích hợp trồng cây công nghiệp lâu năm.' },
      { h: 'Sinh quyển và đa dạng sinh học' },
      { p: 'Sinh quyển là toàn bộ sinh vật trên Trái Đất cùng môi trường mà chúng tồn tại — từ đáy đại dương tới các tầng thấp của khí quyển. Sự phong phú của sự sống được gọi là đa dạng sinh học, biểu hiện ở ba cấp: đa dạng về gen, về loài và về hệ sinh thái. Thảm thực vật thay đổi theo khí hậu: nhiệt đới có rừng mưa ẩm và savan, ôn đới có rừng lá kim (taiga) và đồng cỏ, vùng cực có đài nguyên (tundra).' },
      { note: 'Đất nhiệt đới ẩm thường là ferralit đỏ vàng; đa dạng sinh học gồm gen, loài, hệ sinh thái.' },
    ],
    examples: [
      { q: 'Vì sao đất ở vùng nhiệt đới mưa nhiều thường nghèo dinh dưỡng dù cây cối rậm rạp?', a: 'Mưa lớn rửa trôi mạnh các chất khoáng dễ tan ra khỏi đất; chất hữu cơ rơi xuống lại bị phân huỷ rất nhanh trong điều kiện nóng ẩm và cây hút ngay. Vì vậy đất ferralit thường nghèo mùn, và khi mất rừng che phủ thì rất dễ thoái hoá.' },
      { q: 'Vì sao bảo vệ đa dạng sinh học lại quan trọng với con người?', a: 'Đa dạng sinh học cung cấp lương thực, dược liệu, gỗ, điều hoà khí hậu, thụ phấn cây trồng và duy trì cân bằng sinh thái. Mất một loài có thể phá vỡ chuỗi thức ăn và làm suy yếu cả hệ sinh thái mà con người dựa vào.' },
    ],
  },

  'H10DIA-w12-quiz': {
    topic: 'Các đới khí hậu trên Trái Đất',
    intro: 'Khí hậu Trái Đất không giống nhau ở mọi nơi mà phân thành các vành đai lớn. Các em sẽ tìm hiểu cách chia đới khí hậu và đặc điểm từng đới.',
    objectives: [
      'Kể tên và nêu giới hạn 5 đới khí hậu chính.',
      'Mô tả đặc điểm cơ bản của đới nhiệt đới, ôn đới, hàn đới.',
      'Xác định được vị trí khí hậu của Việt Nam.',
    ],
    theory: [
      { h: 'Năm đới khí hậu chính' },
      { p: 'Dựa vào sự phân bố nhiệt theo vĩ độ, Trái Đất được chia thành 5 đới khí hậu (vành đai nhiệt): một đới nhiệt đới ở giữa, hai đới ôn đới ở hai bán cầu và hai đới hàn đới ở gần hai cực.' },
      { h: 'Giới hạn các đới' },
      { ul: [
        'Đới nhiệt đới: nằm giữa hai chí tuyến (từ 23 độ 27 phút Bắc đến 23 độ 27 phút Nam), nóng quanh năm.',
        'Đới ôn đới: từ chí tuyến đến vòng cực (khoảng 23 độ 27 phút đến 66 độ 33 phút) ở mỗi bán cầu, có bốn mùa rõ rệt.',
        'Đới hàn đới: từ vòng cực đến cực, lạnh quanh năm, có băng tuyết.',
      ] },
      { h: 'Đặc điểm và phân hoá' },
      { p: 'Đới nhiệt đới nhận nhiều bức xạ nên nhiệt cao quanh năm. Vùng cận Xích đạo gió mùa (như Đông Nam Á) có hai mùa khô và mưa rõ rệt. Đới ôn đới khí hậu trung gian, bốn mùa phân hoá. Đới hàn đới lạnh giá, mùa hè rất ngắn. Lưu ý đây là cách chia theo nhiệt; trên thực tế còn xét thêm lượng mưa nên có các kiểu khí hậu chi tiết hơn.' },
      { h: 'Khí hậu Việt Nam' },
      { p: 'Việt Nam nằm trong đới nhiệt đới, lại chịu ảnh hưởng mạnh của gió mùa và biển, nên có khí hậu nhiệt đới ẩm gió mùa: nóng, mưa nhiều, độ ẩm cao và phân hoá theo mùa, theo độ cao địa hình (miền Bắc có mùa đông lạnh).' },
      { note: '5 đới: 1 nhiệt đới + 2 ôn đới + 2 hàn đới. Việt Nam thuộc nhiệt đới ẩm gió mùa.' },
    ],
    examples: [
      { q: 'Vì sao cùng nằm trong đới nhiệt đới nhưng miền Bắc Việt Nam vẫn có mùa đông lạnh?', a: 'Tuy thuộc đới nhiệt đới, miền Bắc còn chịu tác động của gió mùa Đông Bắc thổi từ áp cao lục địa lạnh tràn xuống vào mùa đông. Vì vậy khí hậu miền Bắc phân hoá rõ thành mùa đông lạnh và mùa hạ nóng, khác với miền Nam nóng quanh năm.' },
      { q: 'Vì sao đới hàn đới hầu như không có rừng cây thân gỗ lớn?', a: 'Đới hàn đới quá lạnh, mùa hè ngắn và đất thường bị đóng băng vĩnh cửu nên cây thân gỗ khó phát triển. Thảm thực vật chủ yếu là đài nguyên (rêu, địa y, cây bụi thấp) chịu được giá rét.' },
    ],
  },

  'H10DIA-w13-quiz': {
    topic: 'Dân cư và gia tăng dân số',
    intro: 'Từ bài này, các em chuyển sang địa lý kinh tế - xã hội. Trước hết là con người: dân số thế giới tăng ra sao và điều đó đặt ra những vấn đề gì.',
    objectives: [
      'Nêu quy mô dân số thế giới và Việt Nam.',
      'Tính và giải thích tỉ suất gia tăng dân số tự nhiên.',
      'Phân biệt đặc điểm dân số ở nước phát triển và đang phát triển.',
    ],
    theory: [
      { h: 'Quy mô dân số' },
      { p: 'Dân số thế giới đạt mốc 8 tỉ người vào tháng 11 năm 2022 và vẫn đang tăng. Việt Nam có khoảng 100 triệu dân (năm 2023), đứng thứ 15 thế giới về dân số. Tốc độ tăng dân số rất khác nhau giữa các khu vực.' },
      { h: 'Gia tăng dân số tự nhiên' },
      { p: 'Gia tăng dân số tự nhiên được tính bằng hiệu giữa tỉ suất sinh thô và tỉ suất tử thô (thường tính theo phần nghìn). Nếu sinh nhiều hơn tử thì dân số tăng. Ngoài ra, gia tăng cơ học (do di cư đến và đi) cũng làm thay đổi dân số một vùng.' },
      { h: 'Hai nhóm nước, hai bức tranh dân số' },
      { ul: [
        'Nước phát triển: tỉ suất sinh thấp, tỉ suất tử thấp, dân số tăng chậm hoặc đứng yên, xu hướng già hoá.',
        'Nước đang phát triển: tỉ suất sinh còn cao, dân số trẻ và tăng nhanh hơn.',
      ] },
      { h: 'Bùng nổ dân số' },
      { p: 'Bùng nổ dân số xảy ra khi tiến bộ y tế làm tỉ suất tử giảm nhanh trong khi tỉ suất sinh chưa giảm kịp, khiến dân số tăng vọt. Hiện tượng này từng diễn ra mạnh ở các nước đang phát triển vào nửa sau thế kỷ XX, gây sức ép lên lương thực, việc làm, giáo dục và môi trường.' },
      { note: 'Gia tăng tự nhiên = tỉ suất sinh − tỉ suất tử. Dân số thế giới đã vượt 8 tỉ (2022).' },
    ],
    examples: [
      { q: 'Một quốc gia có tỉ suất sinh thô 22 phần nghìn, tỉ suất tử thô 7 phần nghìn. Tỉ suất gia tăng tự nhiên là bao nhiêu và dân số đang tăng hay giảm?', a: 'Gia tăng tự nhiên = 22 − 7 = 15 phần nghìn (tức 1,5%/năm). Vì sinh lớn hơn tử nên dân số đang tăng, với mức 1,5% mỗi năm — đặc trưng của nước đang phát triển.' },
      { q: 'Vì sao tiến bộ y tế lại có thể gây "bùng nổ dân số" ở các nước đang phát triển?', a: 'Y tế phát triển làm giảm mạnh tỉ lệ tử vong, nhất là tử vong trẻ em, trong khi tỉ lệ sinh do tập quán vẫn còn cao và giảm chậm. Khoảng cách lớn giữa sinh và tử khiến dân số tăng rất nhanh trong thời gian ngắn.' },
    ],
  },

  'H10DIA-w14-quiz': {
    topic: 'Cơ cấu dân số',
    intro: 'Không chỉ "có bao nhiêu người" mà "cơ cấu" của dân số cũng rất quan trọng. Các em sẽ tìm hiểu cách phân tích dân số theo tuổi và giới tính qua tháp dân số.',
    objectives: [
      'Phân biệt cơ cấu dân số theo tuổi và theo giới tính.',
      'Đọc được tháp dân số trẻ và dân số già.',
      'Hiểu khái niệm cơ cấu dân số vàng và già hoá của Việt Nam.',
    ],
    theory: [
      { h: 'Cơ cấu dân số theo tuổi' },
      { p: 'Dân số được chia thành ba nhóm tuổi: dưới 15 (trẻ em), từ 15 đến 64 (trong tuổi lao động) và từ 65 trở lên (người già). Tỉ lệ giữa các nhóm cho biết dân số một nước là "trẻ" hay "già".' },
      { ul: [
        'Dân số trẻ: tỉ lệ dưới 15 tuổi cao (thường trên 35%).',
        'Dân số già: tỉ lệ từ 65 tuổi trở lên cao (theo Liên Hợp Quốc, vượt 7% là bắt đầu già hoá).',
      ] },
      { h: 'Tháp dân số' },
      { p: 'Tháp dân số là biểu đồ thể hiện cơ cấu theo tuổi và giới. Tháp dân số trẻ có đáy rộng (nhiều trẻ em) và đỉnh nhọn (ít người già) — đặc trưng nước đang phát triển. Tháp dân số già có đáy thu hẹp lại, dạng gần như chữ nhật hoặc thu nhỏ ở đáy — đặc trưng nước phát triển.' },
      { h: 'Cơ cấu dân số theo giới tính' },
      { p: 'Cơ cấu giới tính được biểu thị qua tỉ số giới tính: số nam tính trên 100 nữ. Tỉ số mất cân bằng (quá nhiều nam) có thể gây hệ luỵ xã hội về hôn nhân và lao động.' },
      { h: 'Việt Nam: dân số vàng đang già hoá' },
      { p: 'Việt Nam đang trong "cơ cấu dân số vàng" — số người trong tuổi lao động chiếm tỉ lệ cao, là lợi thế cho phát triển. Tuy nhiên tỉ lệ người già tăng nhanh, nên nước ta cũng đang bước vào giai đoạn già hoá dân số và cần tận dụng "thời kỳ vàng" trước khi dân số già đi.' },
      { note: 'Tháp dân số trẻ: đáy rộng, đỉnh nhọn. Việt Nam đang ở thời kỳ "dân số vàng" nhưng già hoá nhanh.' },
    ],
    examples: [
      { q: 'Một nước có tháp dân số đáy hẹp, thân và đỉnh phình ra. Nước đó thuộc loại dân số nào và gặp thách thức gì?', a: 'Đó là dân số già: ít trẻ em, nhiều người trong tuổi lao động cao và người già. Thách thức là thiếu hụt lao động trẻ, gánh nặng an sinh xã hội và chăm sóc y tế cho người cao tuổi tăng lên.' },
      { q: 'Vì sao "cơ cấu dân số vàng" được coi là cơ hội nhưng cũng là thách thức với Việt Nam?', a: 'Cơ hội vì lực lượng lao động dồi dào, gánh nặng phụ thuộc thấp, thuận lợi cho tăng trưởng kinh tế. Thách thức vì nếu không tạo đủ việc làm và nâng chất lượng lao động, lợi thế sẽ qua đi; hơn nữa dân số đang già hoá nhanh nên "cửa sổ vàng" không kéo dài.' },
    ],
  },

  'H10DIA-w15-quiz': {
    topic: 'Phân bố dân cư và đô thị hoá',
    intro: 'Con người không phân bố đều khắp Trái Đất. Các em sẽ tìm hiểu vì sao có nơi đông nghịt, có nơi vắng vẻ, và quá trình đô thị hoá đang diễn ra thế nào.',
    objectives: [
      'Nêu khái niệm mật độ dân số và các vùng đông dân.',
      'Phân tích nhân tố ảnh hưởng đến phân bố dân cư.',
      'Hiểu khái niệm đô thị hoá và mặt trái của đô thị hoá quá nhanh.',
    ],
    theory: [
      { h: 'Mật độ dân số và phân bố' },
      { p: 'Mật độ dân số là số dân trên một đơn vị diện tích, thường tính bằng người trên một km vuông. Dân cư phân bố rất không đều: tập trung đông ở Đông Á, Nam Á và Đông Nam Á, ở các đồng bằng và ven biển; thưa thớt ở sa mạc, vùng cực và rừng rậm.' },
      { h: 'Nhân tố ảnh hưởng phân bố dân cư' },
      { ul: [
        'Nhân tố tự nhiên: khí hậu ôn hoà, đất đai màu mỡ, nguồn nước thuận lợi thì đông dân.',
        'Nhân tố kinh tế - xã hội: nơi nhiều việc làm, kinh tế phát triển, lịch sử định cư lâu đời thì thu hút dân cư.',
      ] },
      { h: 'Đô thị hoá' },
      { p: 'Đô thị hoá là quá trình tăng tỉ lệ dân cư sống ở thành thị, mở rộng đô thị và lan toả lối sống đô thị ra các vùng xung quanh. Đô thị hoá gắn liền với công nghiệp hoá và phát triển dịch vụ. Việt Nam có tỉ lệ dân thành thị khoảng 40-42% (2023), thấp hơn mức trung bình thế giới (khoảng 55%).' },
      { h: 'Mặt trái của đô thị hoá quá nhanh' },
      { p: 'Nếu đô thị hoá diễn ra nhanh hơn khả năng đáp ứng của hạ tầng, sẽ gây quá tải: tắc nghẽn giao thông, thiếu nhà ở, ô nhiễm môi trường, hình thành các khu ổ chuột và phân hoá giàu nghèo trong đô thị.' },
      { note: 'Dân cư đông nhất ở Đông Á - Nam Á - Đông Nam Á. Đô thị hoá quá nhanh gây quá tải hạ tầng.' },
    ],
    examples: [
      { q: 'Vì sao Đồng bằng sông Hồng và Đồng bằng sông Cửu Long là những nơi đông dân nhất Việt Nam?', a: 'Đây là các đồng bằng châu thổ rộng, đất phù sa màu mỡ, nguồn nước dồi dào, khí hậu thuận lợi cho trồng lúa, lại có lịch sử định cư và canh tác lâu đời. Điều kiện tự nhiên và kinh tế - xã hội thuận lợi nên thu hút và nuôi sống đông dân cư.' },
      { q: 'Một thành phố dân số tăng vọt khiến giá nhà cao, kẹt xe, ô nhiễm. Hiện tượng này phản ánh điều gì?', a: 'Đây là biểu hiện của đô thị hoá quá nhanh: dân cư đổ về nhanh hơn tốc độ xây dựng hạ tầng (nhà ở, đường, hệ thống xử lý chất thải). Hệ quả là hạ tầng quá tải, môi trường suy thoái và chất lượng sống giảm.' },
    ],
  },

  'H10DIA-w16-quiz': {
    topic: 'Nguồn lao động và việc làm',
    intro: 'Dân số đông sẽ thành thế mạnh nếu trở thành nguồn lao động chất lượng. Các em sẽ tìm hiểu nguồn lao động, việc làm và xu hướng lao động hiện đại.',
    objectives: [
      'Nêu khái niệm nguồn lao động và các yếu tố tạo nên chất lượng lao động.',
      'Hiểu khái niệm thất nghiệp và sự chuyển dịch cơ cấu lao động.',
      'Nhận biết các xu hướng việc làm trong thời đại số.',
    ],
    theory: [
      { h: 'Nguồn lao động' },
      { p: 'Nguồn lao động gồm những người trong độ tuổi lao động (theo quy định pháp luật) có khả năng lao động, cùng một bộ phận ngoài tuổi vẫn tham gia làm việc. Đây là lực lượng tạo ra của cải vật chất cho xã hội.' },
      { h: 'Chất lượng lao động' },
      { p: 'Số lượng lao động đông là cần thiết, nhưng chất lượng mới quyết định năng suất. Chất lượng lao động phụ thuộc trình độ học vấn, kỹ năng nghề, sức khoẻ và tác phong làm việc. Việt Nam có lợi thế lực lượng lao động trẻ, dồi dào, nhưng cần nâng cao tay nghề và kỷ luật lao động.' },
      { h: 'Việc làm và thất nghiệp' },
      { ul: [
        'Thất nghiệp là tình trạng người trong tuổi lao động, có khả năng và nhu cầu làm việc nhưng không có việc làm.',
        'Giải quyết việc làm là một bài toán lớn ở các nước đông dân, dân số trẻ.',
      ] },
      { h: 'Chuyển dịch cơ cấu lao động và xu hướng mới' },
      { p: 'Cùng với phát triển kinh tế, cơ cấu lao động chuyển dịch theo hướng giảm tỉ trọng lao động nông nghiệp, tăng tỉ trọng công nghiệp và dịch vụ. Thời đại số mở ra các xu hướng mới: làm việc từ xa, kinh tế nền tảng, tự động hoá và trí tuệ nhân tạo (AI) làm thay đổi nhiều ngành nghề, đòi hỏi người lao động liên tục học hỏi kỹ năng mới.' },
      { note: 'Chất lượng lao động = học vấn + kỹ năng + sức khoẻ + tác phong. Cơ cấu lao động đang dịch từ nông nghiệp sang công nghiệp - dịch vụ.' },
    ],
    examples: [
      { q: 'Vì sao "dân số đông" chưa chắc đã là lợi thế nếu chất lượng lao động thấp?', a: 'Dân số đông tạo nguồn lao động dồi dào, nhưng nếu thiếu học vấn và kỹ năng thì năng suất thấp, khó tiếp cận công việc giá trị cao, lại tạo sức ép việc làm và an sinh. Lợi thế dân số chỉ phát huy khi lao động được đào tạo tốt.' },
      { q: 'Tự động hoá và AI có thể khiến một số nghề biến mất. Người lao động nên ứng phó thế nào?', a: 'Cần liên tục học hỏi và nâng cao kỹ năng (nhất là kỹ năng số và kỹ năng sáng tạo, giải quyết vấn đề), chuyển sang những công việc mà máy móc khó thay thế. Tư duy "học tập suốt đời" là cách thích nghi với thị trường lao động đang thay đổi nhanh.' },
    ],
  },

  'H10DIA-w17-quiz': {
    topic: 'Các ngành kinh tế — tổng quan',
    intro: 'Toàn bộ hoạt động kinh tế của một quốc gia có thể nhóm thành ba khu vực lớn. Các em sẽ tìm hiểu cơ cấu kinh tế và các chỉ tiêu đo lường như GDP.',
    objectives: [
      'Phân biệt ba khu vực kinh tế: nông nghiệp, công nghiệp, dịch vụ.',
      'Hiểu khái niệm GDP và GDP bình quân đầu người.',
      'Nhận xét cơ cấu kinh tế của nước phát triển và đang phát triển.',
    ],
    theory: [
      { h: 'Ba khu vực kinh tế' },
      { p: 'Nền kinh tế được chia thành ba khu vực: khu vực I là nông - lâm - ngư nghiệp; khu vực II là công nghiệp và xây dựng; khu vực III là dịch vụ. Tỉ trọng đóng góp của ba khu vực vào GDP cho thấy trình độ phát triển của một nước.' },
      { h: 'Cơ cấu kinh tế phản ánh trình độ phát triển' },
      { ul: [
        'Nước phát triển: khu vực dịch vụ chiếm tỉ trọng cao nhất (thường 70-80% GDP), nông nghiệp rất nhỏ.',
        'Nước đang phát triển: nông nghiệp còn chiếm tỉ trọng đáng kể, đang trong quá trình tăng dần công nghiệp và dịch vụ.',
      ] },
      { h: 'GDP và GDP bình quân đầu người' },
      { p: 'GDP (Tổng sản phẩm trong nước) là tổng giá trị hàng hoá và dịch vụ cuối cùng được sản xuất ra trong phạm vi lãnh thổ một nước trong một năm. GDP bình quân đầu người bằng GDP chia cho tổng số dân, phản ánh mức sống trung bình tốt hơn so với GDP tổng.' },
      { h: 'Vị thế kinh tế các nước' },
      { p: 'Hoa Kỳ là nền kinh tế lớn nhất thế giới về GDP, tiếp đến là Trung Quốc. Việt Nam là nước đang phát triển, quy mô GDP nằm trong nhóm khoảng top 35-40 thế giới và đang tăng trưởng nhanh, chuyển dịch theo hướng giảm nông nghiệp, tăng công nghiệp và dịch vụ.' },
      { note: 'Ba khu vực: I nông nghiệp, II công nghiệp, III dịch vụ. GDP bình quân = GDP / dân số.' },
    ],
    examples: [
      { q: 'Nước A có GDP 400 tỉ USD và 40 triệu dân; nước B có GDP 600 tỉ USD và 100 triệu dân. Nước nào có mức sống trung bình cao hơn?', a: 'Tính GDP bình quân đầu người: nước A = 400/40 = 10.000 USD/người; nước B = 600/100 = 6.000 USD/người. Dù GDP tổng của B lớn hơn, mức sống trung bình của A cao hơn. Đây là lý do phải dùng GDP bình quân để so sánh đời sống.' },
      { q: 'Nhìn vào cơ cấu kinh tế "nông nghiệp 5%, công nghiệp 25%, dịch vụ 70%", em đoán đây là nước phát triển hay đang phát triển?', a: 'Đây là cơ cấu của một nước phát triển: dịch vụ chiếm tỉ trọng áp đảo, nông nghiệp rất nhỏ. Ở các nước phát triển, sản xuất chuyển dần sang dịch vụ và công nghiệp công nghệ cao, nông nghiệp tuy quy mô nhỏ nhưng năng suất rất cao.' },
    ],
  },

  'H10DIA-w18-quiz': {
    topic: 'Ôn tập học kỳ 1',
    intro: 'Các em hãy hệ thống lại toàn bộ kiến thức học kỳ 1: từ Trái Đất trong vũ trụ, các quyển tự nhiên cho tới những vấn đề mở đầu về dân cư và kinh tế.',
    objectives: [
      'Hệ thống hoá kiến thức địa lý tự nhiên đại cương.',
      'Củng cố hiểu biết về dân cư và cơ cấu kinh tế.',
      'Rèn kỹ năng liên hệ giữa tự nhiên và kinh tế - xã hội.',
    ],
    theory: [
      { h: 'Trái Đất và các vận động' },
      { ul: [
        'Trái Đất dạng geoid, là hành tinh thứ 3, cách Mặt Trời ~150 triệu km.',
        'Tự quay quanh trục: sinh ra ngày đêm, giờ địa phương và lực Coriolis.',
        'Chuyển động quanh Mặt Trời + trục nghiêng: sinh ra các mùa.',
      ] },
      { h: 'Các quyển tự nhiên' },
      { p: 'Thạch quyển gồm vỏ và phần cứng manti trên, chia thành các mảng kiến tạo. Khí quyển có 5 tầng, tầng đối lưu là nơi diễn ra thời tiết. Thuỷ quyển 97% là nước mặn, luân chuyển qua vòng tuần hoàn nước. Sinh quyển và thổ nhưỡng tạo nền cho sự sống trên cạn.' },
      { h: 'Khí hậu và các đới' },
      { p: 'Bức xạ Mặt Trời phân bố không đều theo vĩ độ tạo ra 5 đới khí hậu. Gió thổi từ áp cao về áp thấp; gió mùa do tương phản lục địa - đại dương. Việt Nam thuộc nhiệt đới ẩm gió mùa.' },
      { h: 'Mở đầu kinh tế - xã hội' },
      { p: 'Dân số thế giới đã vượt 8 tỉ; gia tăng tự nhiên = sinh − tử. Cơ cấu kinh tế chia ba khu vực (nông nghiệp - công nghiệp - dịch vụ); đô thị hoá là quá trình tăng tỉ lệ dân thành thị.' },
      { note: 'Ghi nhớ mạch logic: tự nhiên tạo nền tảng → con người sinh sống → tổ chức kinh tế.' },
    ],
    examples: [
      { q: 'Hãy chỉ ra một chuỗi liên hệ giữa vận động của Trái Đất, khí hậu và hoạt động kinh tế của Việt Nam.', a: 'Trục Trái Đất nghiêng và vị trí nhiệt đới khiến Việt Nam nhận nhiều bức xạ; cộng với gió mùa và biển tạo khí hậu nhiệt đới ẩm gió mùa, mưa nhiều; điều này thuận lợi cho trồng lúa nước và cây công nghiệp — nền tảng của nông nghiệp nước ta.' },
      { q: 'Vì sao khi học địa lý tự nhiên xong, chúng ta lại chuyển sang học về dân cư và kinh tế?', a: 'Vì tự nhiên là môi trường sống và là nguồn tài nguyên cho con người. Hiểu tự nhiên rồi mới hiểu được con người phân bố, sinh sống và tổ chức sản xuất ra sao trên nền tảng đó — đúng theo logic "tự nhiên trước, kinh tế - xã hội sau" của môn học.' },
    ],
  },

  'H10DIA-w19-quiz': {
    topic: 'Địa lý nông nghiệp',
    intro: 'Mở đầu học kỳ 2, các em tìm hiểu ngành sản xuất lâu đời nhất của loài người — nông nghiệp, và những hình thức sản xuất hiện đại của nó.',
    objectives: [
      'Nêu được phạm vi và vai trò của ngành nông nghiệp.',
      'Phân tích các nhân tố ảnh hưởng đến nông nghiệp.',
      'Hiểu xu hướng nông nghiệp hữu cơ và công nghệ cao.',
    ],
    theory: [
      { h: 'Nông nghiệp gồm những gì?' },
      { p: 'Hiểu theo nghĩa rộng, nông nghiệp bao gồm trồng trọt, chăn nuôi, lâm nghiệp và thuỷ sản. Đây là ngành cung cấp lương thực, thực phẩm cho con người và nguyên liệu cho công nghiệp chế biến — đảm bảo an ninh lương thực của mỗi quốc gia.' },
      { h: 'Các nhân tố ảnh hưởng' },
      { ul: [
        'Nhân tố tự nhiên: đất, nước và khí hậu là ba yếu tố cốt lõi quyết định loại cây trồng, vật nuôi.',
        'Nhân tố kinh tế - xã hội: lao động, vốn, khoa học công nghệ, thị trường và chính sách.',
      ] },
      { h: 'Phân bố cây lương thực thế giới' },
      { p: 'Ba cây lương thực chính của thế giới là lúa mì, lúa gạo và ngô. Lúa gạo gắn với vùng nhiệt đới gió mùa châu Á (Trung Quốc, Ấn Độ, Đông Nam Á), nơi nóng ẩm, nhiều nước. Lúa mì phổ biến ở vùng ôn đới.' },
      { h: 'Xu hướng nông nghiệp hiện đại' },
      { p: 'Hai xu hướng nổi bật: nông nghiệp hữu cơ (không dùng hoá chất tổng hợp, hướng đến an toàn và bền vững) và nông nghiệp công nghệ cao (ứng dụng tự động hoá, nhà kính, tưới nhỏ giọt, cảm biến IoT và AI để tăng năng suất, tiết kiệm tài nguyên).' },
      { note: 'Đất - nước - khí hậu là ba yếu tố tự nhiên cốt lõi của nông nghiệp; ba cây lương thực chính: lúa mì, lúa gạo, ngô.' },
    ],
    examples: [
      { q: 'Vì sao châu Á gió mùa lại là vùng trồng lúa gạo lớn nhất thế giới?', a: 'Lúa nước cần nhiều nhiệt và nước. Châu Á gió mùa có khí hậu nóng ẩm, mưa nhiều, các đồng bằng châu thổ rộng đất phù sa màu mỡ và nguồn lao động dồi dào — hội tụ đủ điều kiện tự nhiên và xã hội để thâm canh lúa gạo.' },
      { q: 'Nông nghiệp công nghệ cao giúp giải quyết vấn đề gì khi diện tích đất ngày càng hạn chế?', a: 'Bằng nhà kính, thuỷ canh, tưới nhỏ giọt và cảm biến, nông nghiệp công nghệ cao tăng năng suất trên cùng một diện tích, kiểm soát chính xác nước - phân bón, ít phụ thuộc thời tiết. Nhờ đó vẫn tăng sản lượng dù đất canh tác bị thu hẹp.' },
    ],
  },

  'H10DIA-w20-quiz': {
    topic: 'Ngành trồng trọt',
    intro: 'Trồng trọt là bộ phận quan trọng nhất của nông nghiệp. Các em sẽ tìm hiểu các nhóm cây trồng và thế mạnh trồng trọt của Việt Nam.',
    objectives: [
      'Phân loại các nhóm cây trồng chính.',
      'Nêu vùng phân bố cây công nghiệp và cây ăn quả ở Việt Nam.',
      'Nhận biết các nông sản xuất khẩu chủ lực của nước ta.',
    ],
    theory: [
      { h: 'Các nhóm cây trồng' },
      { ul: [
        'Cây lương thực: lúa gạo (nhiệt đới), lúa mì, lúa mạch, ngô (ôn đới) — cung cấp tinh bột.',
        'Cây công nghiệp: lâu năm (cao su, cà phê, ca cao, chè, hồ tiêu) và hằng năm (mía, bông, đậu tương).',
        'Cây ăn quả và cây dược liệu: cung cấp trái cây, nguyên liệu chế biến và dược phẩm.',
      ] },
      { h: 'Cây công nghiệp ở Việt Nam' },
      { p: 'Việt Nam có thế mạnh lớn về cây công nghiệp lâu năm. Tây Nguyên (Đắk Lắk, Lâm Đồng, Gia Lai) là vùng trồng cà phê lớn nhất nhờ đất badan màu mỡ và khí hậu cận Xích đạo. Nước ta đứng đầu thế giới về xuất khẩu hồ tiêu, đứng thứ hai về cà phê và thuộc nhóm dẫn đầu về xuất khẩu gạo.' },
      { h: 'Cây ăn quả và dược liệu' },
      { p: 'Trái cây nhiệt đới xuất khẩu chủ lực của Việt Nam gồm thanh long, vải, xoài, sầu riêng, nhãn. Về dược liệu, sâm Ngọc Linh (vùng Kon Tum - Quảng Nam) là sản phẩm quý nổi tiếng, có giá trị kinh tế cao.' },
      { h: 'Vai trò của điều kiện tự nhiên' },
      { p: 'Mỗi loại cây đòi hỏi điều kiện riêng: cà phê hợp đất badan và độ cao Tây Nguyên; cây ăn quả nhiệt đới hợp vùng đồng bằng và trung du phía Nam; cây ôn đới như đào, mận trồng được ở vùng núi cao mát mẻ. Hiểu đặc tính sinh thái của cây là cơ sở để bố trí cây trồng hợp lý.' },
      { note: 'Tây Nguyên là vùng cà phê lớn nhất; Việt Nam đứng đầu thế giới về xuất khẩu hồ tiêu.' },
    ],
    examples: [
      { q: 'Vì sao Tây Nguyên trở thành vùng chuyên canh cà phê lớn nhất Việt Nam?', a: 'Tây Nguyên có đất badan dày, tơi xốp, giàu dinh dưỡng; khí hậu cận Xích đạo với mùa khô - mùa mưa rõ rệt rất hợp với cà phê; lại có các cao nguyên rộng thuận lợi lập đồn điền. Nhờ vậy nơi đây hình thành vùng chuyên canh cà phê quy mô lớn.' },
      { q: 'Việc Việt Nam đứng đầu thế giới về xuất khẩu hồ tiêu và thứ hai về cà phê có ý nghĩa gì với nền kinh tế?', a: 'Điều này khẳng định thế mạnh nông sản nhiệt đới của nước ta, mang lại nguồn ngoại tệ lớn, tạo việc làm và thu nhập cho hàng triệu nông dân, đồng thời đặt ra yêu cầu nâng cao chất lượng và chế biến sâu để tăng giá trị thay vì chỉ bán thô.' },
    ],
  },

  'H10DIA-w21-quiz': {
    topic: 'Chăn nuôi và thuỷ sản',
    intro: 'Bên cạnh trồng trọt, chăn nuôi và thuỷ sản cung cấp nguồn đạm quan trọng. Các em sẽ tìm hiểu sự phân bố và vấn đề khai thác bền vững.',
    objectives: [
      'Kể được các vật nuôi chính và vùng chăn nuôi tiêu biểu.',
      'Phân biệt đánh bắt và nuôi trồng thuỷ sản.',
      'Hiểu hậu quả của đánh bắt quá mức.',
    ],
    theory: [
      { h: 'Ngành chăn nuôi' },
      { p: 'Vật nuôi chính trên thế giới gồm bò, trâu, lợn, gà, dê, cừu. Chăn nuôi phụ thuộc vào nguồn thức ăn (đồng cỏ, cây lương thực) và nhu cầu thị trường. Các vùng chăn nuôi bò sữa phát triển mạnh ở châu Âu, Bắc Mỹ và New Zealand, nơi có đồng cỏ ôn đới rộng và công nghệ chăn nuôi hiện đại.' },
      { h: 'Đặc điểm phân bố chăn nuôi' },
      { ul: [
        'Chăn nuôi gia súc lớn (bò, cừu) gắn với vùng đồng cỏ rộng.',
        'Chăn nuôi gia cầm và lợn phát triển ở mọi vùng có nhu cầu thực phẩm và nguồn thức ăn.',
        'Xu hướng hiện đại: chăn nuôi công nghiệp, tập trung, an toàn sinh học.',
      ] },
      { h: 'Ngành thuỷ sản' },
      { p: 'Thuỷ sản gồm hai bộ phận: đánh bắt (khai thác nguồn lợi tự nhiên trên biển, sông, hồ) và nuôi trồng (nuôi cá, tôm trong ao, lồng bè, đầm). Việt Nam với bờ biển dài và mạng lưới sông ngòi dày có thế mạnh lớn; cá tra và tôm là hai mặt hàng thuỷ sản xuất khẩu chủ lực.' },
      { h: 'Đánh bắt quá mức và phát triển bền vững' },
      { p: 'Khai thác quá mức (overfishing) làm cạn kiệt nguồn lợi thuỷ sản, phá vỡ cân bằng sinh thái biển. Vì vậy cần đánh bắt có kiểm soát, cấm khai thác mùa sinh sản, phát triển nuôi trồng để giảm áp lực lên nguồn lợi tự nhiên.' },
      { note: 'Thuỷ sản = đánh bắt + nuôi trồng. Cá tra và tôm là hai mặt hàng xuất khẩu chủ lực của Việt Nam.' },
    ],
    examples: [
      { q: 'Vì sao Việt Nam có lợi thế lớn để phát triển ngành thuỷ sản?', a: 'Nước ta có bờ biển dài hơn 3.260 km, vùng biển rộng giàu hải sản, nhiều cửa sông, đầm phá và hệ thống sông ngòi dày đặc thuận lợi cho cả đánh bắt lẫn nuôi trồng. Cộng thêm lao động đông và thị trường xuất khẩu rộng, thuỷ sản trở thành ngành kinh tế mũi nhọn.' },
      { q: 'Vì sao phát triển nuôi trồng được coi là giải pháp giảm áp lực đánh bắt quá mức?', a: 'Nuôi trồng tạo ra sản lượng thuỷ sản chủ động mà không khai thác từ tự nhiên, nhờ đó giảm cường độ đánh bắt ngoài biển, để nguồn lợi tự nhiên có thời gian phục hồi. Đây là hướng đi bền vững, vừa đảm bảo nguồn cung vừa bảo vệ hệ sinh thái.' },
    ],
  },

  'H10DIA-w22-quiz': {
    topic: 'Địa lý lâm nghiệp',
    intro: 'Rừng được ví như "lá phổi xanh" của Trái Đất. Các em sẽ tìm hiểu vai trò của rừng, hậu quả phá rừng và thế nào là lâm nghiệp bền vững.',
    objectives: [
      'Nêu vai trò nhiều mặt của rừng.',
      'Phân tích hậu quả của việc phá rừng.',
      'Hiểu khái niệm vườn quốc gia và lâm nghiệp bền vững.',
    ],
    theory: [
      { h: 'Vai trò của rừng' },
      { p: 'Rừng giữ vai trò sống còn: điều hoà khí hậu và hấp thụ CO2, giữ và điều tiết nguồn nước, chống xói mòn đất và lũ lụt, cung cấp gỗ và lâm sản, đồng thời là nơi lưu giữ đa dạng sinh học. Mất rừng đồng nghĩa với mất tất cả những chức năng này.' },
      { h: 'Phân bố rừng và phá rừng' },
      { ul: [
        'Rừng nhiệt đới ẩm tập trung ở lưu vực Amazon (Nam Mỹ), Congo (châu Phi) và Đông Nam Á.',
        'Phá rừng gây lũ lụt, xói mòn, sạt lở, mất đa dạng sinh học và làm tăng khí nhà kính.',
      ] },
      { h: 'Lâm nghiệp ở Việt Nam' },
      { p: 'Việt Nam có tỉ lệ che phủ rừng khoảng 42% (năm 2022) và đang tăng dần nhờ chính sách trồng rừng, giao đất giao rừng. Cả nước có nhiều vườn quốc gia (như Cúc Phương, Phong Nha - Kẻ Bàng) là khu bảo tồn đa dạng sinh học, phục vụ nghiên cứu và du lịch sinh thái.' },
      { h: 'Lâm nghiệp bền vững' },
      { p: 'Lâm nghiệp bền vững nghĩa là khai thác đi đôi với trồng mới và bảo vệ, sao cho rừng không bị suy giảm theo thời gian. Nguyên tắc cốt lõi là khai thác có kế hoạch, không vượt quá khả năng tái sinh của rừng.' },
      { note: 'Rừng điều hoà khí hậu, giữ nước, chống xói mòn, lưu giữ đa dạng sinh học. Việt Nam che phủ rừng ~42%.' },
    ],
    examples: [
      { q: 'Vì sao phá rừng đầu nguồn lại làm tăng nguy cơ lũ quét và sạt lở ở vùng hạ lưu?', a: 'Rừng đầu nguồn giữ đất và làm chậm dòng chảy mưa. Khi mất rừng, đất trống không còn rễ cây giữ lại, mưa lớn dội xuống chảy tràn rất nhanh, cuốn theo đất đá gây lũ quét, sạt lở và bồi lấp ở hạ lưu. Vì vậy bảo vệ rừng đầu nguồn là phòng chống thiên tai.' },
      { q: 'Một doanh nghiệp khai thác gỗ rồi trồng lại đúng số cây đã chặt và bảo vệ rừng còn lại. Cách làm này thể hiện nguyên tắc gì?', a: 'Đó là nguyên tắc lâm nghiệp bền vững: khai thác gắn với trồng mới và bảo vệ, đảm bảo diện tích và chất lượng rừng không suy giảm. Nhờ vậy vừa có lợi ích kinh tế từ gỗ, vừa duy trì được rừng cho các thế hệ sau.' },
    ],
  },

  'H10DIA-w23-quiz': {
    topic: 'Công nghiệp — tổng quan',
    intro: 'Công nghiệp là động lực của hiện đại hoá. Các em sẽ tìm hiểu công nghiệp là gì, phân loại ra sao và những nhân tố quyết định nơi đặt nhà máy.',
    objectives: [
      'Nêu khái niệm và phân loại công nghiệp.',
      'Phân tích các nhân tố ảnh hưởng đến phân bố công nghiệp.',
      'Hiểu đặc trưng của cách mạng công nghiệp 4.0.',
    ],
    theory: [
      { h: 'Công nghiệp là gì?' },
      { p: 'Công nghiệp là ngành sản xuất vật chất, chế biến nguyên liệu (từ tự nhiên hoặc nông nghiệp) thành tư liệu sản xuất và sản phẩm tiêu dùng. So với nông nghiệp, công nghiệp ít phụ thuộc tự nhiên hơn, có thể sản xuất hàng loạt và tập trung cao.' },
      { h: 'Phân loại công nghiệp' },
      { ul: [
        'Công nghiệp nặng: khai khoáng, năng lượng (điện, dầu khí, than), luyện kim, hoá chất, cơ khí.',
        'Công nghiệp nhẹ: dệt may, da giày, chế biến lương thực - thực phẩm, hàng tiêu dùng.',
      ] },
      { h: 'Nhân tố ảnh hưởng phân bố công nghiệp' },
      { p: 'Vị trí một nhà máy phụ thuộc nhiều nhân tố: nguồn nguyên liệu, nguồn năng lượng, lao động, vốn, thị trường tiêu thụ, cơ sở hạ tầng và chính sách. Tuỳ loại ngành mà nhân tố nào trội hơn — ví dụ luyện kim cần gần nguyên liệu và năng lượng, còn công nghiệp nhẹ cần gần thị trường và lao động.' },
      { h: 'Cách mạng công nghiệp 4.0' },
      { p: 'Cuộc cách mạng công nghiệp lần thứ tư (4.0) đặc trưng bởi trí tuệ nhân tạo (AI), Internet vạn vật (IoT), dữ liệu lớn (big data), robot và in 3D. Nó làm thay đổi căn bản phương thức sản xuất, tạo ra "nhà máy thông minh" tự động hoá cao.' },
      { note: 'Công nghiệp chia thành công nghiệp nặng và công nghiệp nhẹ; phân bố phụ thuộc nguyên liệu, năng lượng, lao động, thị trường.' },
    ],
    examples: [
      { q: 'Vì sao nhà máy luyện thép thường đặt gần mỏ quặng hoặc cảng biển, còn xưởng may lại đặt gần thành phố đông dân?', a: 'Luyện thép tiêu tốn khối lượng nguyên liệu và năng lượng lớn, vận chuyển nặng nề nên đặt gần nguồn quặng - than hoặc cảng để giảm chi phí. Xưởng may cần nhiều lao động và gần thị trường tiêu thụ, nguyên liệu (vải) nhẹ dễ chuyển, nên đặt gần đô thị đông dân.' },
      { q: 'Cách mạng công nghiệp 4.0 khác các cuộc cách mạng trước (hơi nước, điện) ở điểm cốt lõi nào?', a: 'Các cuộc trước thay sức người bằng máy móc (hơi nước, điện, dây chuyền). Cách mạng 4.0 thay cả một phần "trí tuệ" của con người bằng AI, dữ liệu và máy móc kết nối thông minh, khiến nhà máy tự ra quyết định, tối ưu sản xuất mà ít cần can thiệp trực tiếp.' },
    ],
  },

  'H10DIA-w24-quiz': {
    topic: 'Một số ngành công nghiệp chính',
    intro: 'Các em sẽ tìm hiểu một vài ngành công nghiệp trụ cột của thế giới và thế mạnh công nghiệp của Việt Nam.',
    objectives: [
      'Nêu cơ cấu và phân bố ngành điện lực, dầu khí.',
      'Xác định các trung tâm sản xuất thép và điện tử thế giới.',
      'Nhận biết thế mạnh công nghiệp của Việt Nam.',
    ],
    theory: [
      { h: 'Công nghiệp năng lượng' },
      { ul: [
        'Điện lực gồm nhiệt điện (than, khí), thuỷ điện, điện hạt nhân và năng lượng tái tạo (gió, mặt trời) — là cơ sở cho mọi ngành khác.',
        'Dầu khí tập trung ở Trung Đông (Arab Saudi, UAE), Nga và Bắc Mỹ — những vùng giàu trữ lượng.',
      ] },
      { h: 'Luyện kim — sản xuất thép' },
      { p: 'Thép là "bánh mì của công nghiệp", nguyên liệu cho xây dựng, cơ khí, đóng tàu. Sản xuất thép tập trung ở Trung Quốc (dẫn đầu thế giới), Nhật Bản, Hàn Quốc, EU, Hoa Kỳ và Ấn Độ.' },
      { h: 'Công nghiệp điện tử - tin học' },
      { p: 'Đây là ngành mũi nhọn của thời đại số, tập trung ở Đông Á (Trung Quốc, Hàn Quốc, Nhật Bản, Đài Loan), Hoa Kỳ và EU. Ngành này đòi hỏi trình độ công nghệ cao, lao động kỹ thuật và vốn lớn.' },
      { h: 'Công nghiệp Việt Nam' },
      { p: 'Việt Nam có thế mạnh ở dệt may (thuộc top 3 thế giới về xuất khẩu), da giày, điện tử lắp ráp và chế biến lương thực - thực phẩm. Công nghiệp chế biến phát triển ở khắp nơi có nguyên liệu nông - thuỷ sản, góp phần nâng giá trị nông sản.' },
      { note: 'Trung Quốc dẫn đầu sản xuất thép; Việt Nam thuộc top 3 thế giới về xuất khẩu dệt may.' },
    ],
    examples: [
      { q: 'Vì sao công nghiệp năng lượng được coi là ngành "đi trước một bước" trong phát triển kinh tế?', a: 'Mọi ngành sản xuất và dịch vụ đều cần điện và nhiên liệu để vận hành. Nếu thiếu điện, các nhà máy, đô thị không hoạt động được. Vì vậy năng lượng phải được đầu tư phát triển trước, làm nền tảng cho các ngành khác đi sau.' },
      { q: 'Việt Nam chủ yếu "lắp ráp" điện tử chứ chưa làm chủ công nghệ lõi. Điều này gợi ý hướng phát triển nào?', a: 'Lắp ráp tạo việc làm và xuất khẩu nhưng giá trị gia tăng thấp, phụ thuộc linh kiện nước ngoài. Hướng phát triển là nâng cao trình độ công nghệ, đào tạo nhân lực kỹ thuật cao và đầu tư nghiên cứu để dần làm chủ thiết kế, sản xuất linh kiện cốt lõi, tăng giá trị trong chuỗi cung ứng.' },
    ],
  },

  'H10DIA-w25-quiz': {
    topic: 'Địa lý dịch vụ',
    intro: 'Dịch vụ là khu vực kinh tế ngày càng chiếm vai trò chủ đạo ở các nước phát triển. Các em sẽ tìm hiểu dịch vụ gồm những gì và thế mạnh dịch vụ của Việt Nam.',
    objectives: [
      'Nêu khái niệm và phân loại ngành dịch vụ.',
      'Hiểu vai trò của du lịch, tài chính - ngân hàng.',
      'Nhận biết thế mạnh dịch vụ của Việt Nam.',
    ],
    theory: [
      { h: 'Dịch vụ là gì?' },
      { p: 'Dịch vụ là khu vực kinh tế không trực tiếp tạo ra của cải vật chất mà phục vụ nhu cầu sản xuất và đời sống. Đây là khu vực III, có xu hướng ngày càng chiếm tỉ trọng lớn trong cơ cấu kinh tế hiện đại — ở các nước phát triển chiếm 70-80% GDP.' },
      { h: 'Phân loại dịch vụ' },
      { ul: [
        'Dịch vụ sản xuất: logistics, tài chính - ngân hàng, bảo hiểm, tư vấn — phục vụ hoạt động kinh tế.',
        'Dịch vụ tiêu dùng: thương mại bán lẻ, du lịch, ăn uống — phục vụ cá nhân.',
        'Dịch vụ công cộng: giáo dục, y tế, hành chính — phục vụ xã hội.',
      ] },
      { h: 'Du lịch và tài chính' },
      { p: 'Du lịch là ngành phục vụ nhu cầu tham quan, nghỉ dưỡng, đem lại nguồn thu lớn và tạo nhiều việc làm. Tài chính - ngân hàng là dịch vụ then chốt, tập trung ở các đô thị lớn — những trung tâm tài chính hàng đầu thế giới như New York, London, Tokyo, Singapore, Hồng Kông.' },
      { h: 'Dịch vụ ở Việt Nam' },
      { p: 'Việt Nam có thế mạnh du lịch nổi bật: du lịch biển (vịnh Hạ Long, Phú Quốc, Nha Trang), du lịch văn hoá - di sản (Huế, Hội An, Mỹ Sơn) và du lịch sinh thái (Phong Nha - Kẻ Bàng). Ngành dịch vụ đang tăng tỉ trọng trong cơ cấu kinh tế nước ta.' },
      { note: 'Dịch vụ có ba nhóm: sản xuất, tiêu dùng, công cộng; ở nước phát triển chiếm 70-80% GDP.' },
    ],
    examples: [
      { q: 'Vì sao các trung tâm tài chính lớn của thế giới đều nằm ở những đô thị lớn?', a: 'Đô thị lớn tập trung vốn, doanh nghiệp, nguồn nhân lực chất lượng cao và hạ tầng thông tin hiện đại — những điều kiện thiết yếu cho hoạt động tài chính, ngân hàng, chứng khoán. Vì vậy New York, London, Tokyo, Singapore trở thành các trung tâm tài chính toàn cầu.' },
      { q: 'Vì sao du lịch được coi là ngành "công nghiệp không khói" có ý nghĩa lớn với Việt Nam?', a: 'Du lịch mang lại nguồn thu ngoại tệ và việc làm lớn mà ít gây ô nhiễm như công nghiệp nặng, lại phát huy được tài nguyên thiên nhiên và di sản văn hoá sẵn có của nước ta. Tuy nhiên phải phát triển có quản lý để tránh quá tải và phá hỏng chính tài nguyên du lịch.' },
    ],
  },

  'H10DIA-w26-quiz': {
    topic: 'Giao thông vận tải và thông tin liên lạc',
    intro: 'Giao thông vận tải là "mạch máu" của nền kinh tế, còn thông tin liên lạc là "hệ thần kinh". Các em sẽ tìm hiểu các loại hình và vai trò của chúng.',
    objectives: [
      'Kể được các loại hình giao thông và ưu thế của từng loại.',
      'Nêu các đầu mối giao thông lớn của thế giới và Việt Nam.',
      'Hiểu vai trò của Internet trong đời sống hiện đại.',
    ],
    theory: [
      { h: 'Các loại hình giao thông vận tải' },
      { ul: [
        'Đường bộ: cơ động, linh hoạt, thích hợp cự ly ngắn và trung bình.',
        'Đường sắt: chở khối lượng lớn, ổn định trên các tuyến cố định.',
        'Đường thuỷ (biển, sông): chở hàng nặng, khối lượng lớn, cước phí rẻ nhất cho đường dài.',
        'Hàng không: nhanh nhất, dùng cho hành khách và hàng giá trị cao, nhưng đắt.',
        'Đường ống: chuyên chở dầu, khí.',
      ] },
      { h: 'Lựa chọn phương thức vận tải' },
      { p: 'Tuỳ vào loại hàng, khối lượng, khoảng cách và yêu cầu thời gian mà chọn phương thức phù hợp. Hàng hoá khối lượng lớn, đường dài thường đi đường biển vì rẻ; hàng cần nhanh và giá trị cao thì đi hàng không.' },
      { h: 'Các đầu mối lớn' },
      { p: 'Cảng Thượng Hải (Trung Quốc) là cảng container lớn nhất thế giới. Ở Việt Nam, hai sân bay quốc tế lớn nhất là Tân Sơn Nhất (TP. Hồ Chí Minh) và Nội Bài (Hà Nội); hệ thống cảng biển như Hải Phòng, Cái Mép - Thị Vải đóng vai trò cửa ngõ xuất nhập khẩu.' },
      { h: 'Thông tin liên lạc và Internet' },
      { p: 'Thông tin liên lạc giúp kết nối con người và điều phối kinh tế. Internet đã cách mạng hoá mọi mặt: cách giao tiếp, kinh doanh (thương mại điện tử), học tập (học trực tuyến) và giải trí — tạo nên nền kinh tế số.' },
      { note: 'Đường biển rẻ nhất cho hàng nặng đường dài; hàng không nhanh nhất. Cảng Thượng Hải lớn nhất thế giới.' },
    ],
    examples: [
      { q: 'Một doanh nghiệp cần xuất khẩu 10.000 tấn gạo sang châu Phi với chi phí thấp nhất. Nên chọn phương thức vận tải nào và vì sao?', a: 'Nên chọn đường biển. Với khối lượng rất lớn và quãng đường xa, tàu biển có sức chở lớn và cước phí trên mỗi tấn - km rẻ nhất. Gạo không phải hàng dễ hỏng cần giao gấp, nên thời gian dài của đường biển không phải vấn đề.' },
      { q: 'Vì sao người ta nói "Internet đã xoá nhoà khoảng cách địa lý" trong kinh doanh và học tập?', a: 'Nhờ Internet, một người ở vùng xa vẫn có thể mua bán với khách hàng toàn cầu (thương mại điện tử), học khoá học của trường nước ngoài (học trực tuyến) hay họp với đối tác ở châu lục khác theo thời gian thực. Khoảng cách vật lý không còn là rào cản lớn như trước.' },
    ],
  },

  'H10DIA-w27-quiz': {
    topic: 'Thương mại quốc tế',
    intro: 'Không quốc gia nào tự sản xuất được mọi thứ, nên cần trao đổi với nhau. Các em sẽ tìm hiểu thương mại quốc tế, cán cân thương mại và vai trò của WTO.',
    objectives: [
      'Nêu khái niệm xuất khẩu, nhập khẩu và thương mại quốc tế.',
      'Tính và giải thích cán cân thương mại.',
      'Hiểu vai trò của WTO và quá trình hội nhập của Việt Nam.',
    ],
    theory: [
      { h: 'Thương mại quốc tế là gì?' },
      { p: 'Thương mại quốc tế là hoạt động trao đổi hàng hoá và dịch vụ giữa các quốc gia, gồm xuất khẩu (bán hàng ra nước ngoài) và nhập khẩu (mua hàng từ nước ngoài). Nhờ trao đổi, mỗi nước phát huy được lợi thế của mình và có được những thứ mình không sản xuất.' },
      { h: 'Cán cân thương mại' },
      { p: 'Cán cân thương mại là hiệu giữa giá trị xuất khẩu và giá trị nhập khẩu. Nếu xuất khẩu lớn hơn nhập khẩu thì xuất siêu (cán cân dương); ngược lại là nhập siêu (cán cân âm). Cán cân thương mại phản ánh sức cạnh tranh của hàng hoá một nước.' },
      { ul: [
        'Cán cân thương mại = Xuất khẩu − Nhập khẩu.',
        'Xuất siêu: thường là dấu hiệu hàng hoá có sức cạnh tranh tốt.',
      ] },
      { h: 'WTO và toàn cầu hoá thương mại' },
      { p: 'Tổ chức Thương mại Thế giới (WTO) là tổ chức điều phối thương mại toàn cầu, thúc đẩy giảm hàng rào thuế quan và giải quyết tranh chấp thương mại giữa các nước thành viên.' },
      { h: 'Việt Nam hội nhập thương mại' },
      { p: 'Việt Nam chính thức gia nhập WTO ngày 11/1/2007, mở ra giai đoạn hội nhập sâu rộng. Nhờ đó hàng hoá Việt Nam tiếp cận thị trường thế giới thuận lợi hơn, đồng thời doanh nghiệp trong nước phải cạnh tranh gay gắt hơn.' },
      { note: 'Cán cân thương mại = Xuất khẩu − Nhập khẩu. Việt Nam gia nhập WTO năm 2007.' },
    ],
    examples: [
      { q: 'Năm 2023 một nước xuất khẩu 360 tỉ USD, nhập khẩu 330 tỉ USD. Cán cân thương mại bằng bao nhiêu và nước đó xuất siêu hay nhập siêu?', a: 'Cán cân thương mại = 360 − 330 = +30 tỉ USD. Vì xuất khẩu lớn hơn nhập khẩu nên nước đó xuất siêu 30 tỉ USD — dấu hiệu hàng hoá có sức cạnh tranh và thu được ngoại tệ ròng.' },
      { q: 'Việc gia nhập WTO vừa là cơ hội vừa là thách thức với Việt Nam. Hãy giải thích.', a: 'Cơ hội: hàng Việt Nam dễ vào thị trường thế giới hơn, thu hút đầu tư, học hỏi công nghệ và quản trị. Thách thức: hàng nước ngoài cũng tràn vào, doanh nghiệp trong nước phải cạnh tranh khốc liệt; nếu yếu kém sẽ thua ngay trên sân nhà. Hội nhập buộc nền kinh tế phải nâng cao năng lực cạnh tranh.' },
    ],
  },

  'H10DIA-w28-quiz': {
    topic: 'Toàn cầu hoá và hội nhập quốc tế',
    intro: 'Thế giới ngày càng gắn kết thành một thể thống nhất. Các em sẽ tìm hiểu toàn cầu hoá là gì, mang lại lợi ích và đặt ra thách thức nào.',
    objectives: [
      'Nêu khái niệm toàn cầu hoá.',
      'Phân tích mặt tích cực và tiêu cực của toàn cầu hoá.',
      'Hiểu vai trò của ASEAN và các FTA với Việt Nam.',
    ],
    theory: [
      { h: 'Toàn cầu hoá là gì?' },
      { p: 'Toàn cầu hoá là quá trình gia tăng sự gắn kết, phụ thuộc lẫn nhau giữa các quốc gia trên mọi lĩnh vực: kinh tế, văn hoá, chính trị, khoa học công nghệ. Biểu hiện rõ nhất là dòng chảy hàng hoá, vốn, công nghệ và con người xuyên biên giới ngày càng mạnh.' },
      { h: 'Hai mặt của toàn cầu hoá' },
      { ul: [
        'Tích cực: mở rộng thị trường, thúc đẩy chuyển giao công nghệ, thu hút đầu tư, giao lưu văn hoá.',
        'Tiêu cực: làm gia tăng phân hoá giàu nghèo, nguy cơ mai một bản sắc văn hoá, và dịch bệnh, khủng hoảng dễ lan nhanh toàn cầu.',
      ] },
      { h: 'Hội nhập khu vực: ASEAN' },
      { p: 'ASEAN (Hiệp hội các quốc gia Đông Nam Á) thành lập năm 1967, hiện có 10 thành viên. Việt Nam gia nhập ASEAN ngày 28/7/1995. ASEAN thúc đẩy hợp tác kinh tế, văn hoá và giữ gìn hoà bình, ổn định trong khu vực.' },
      { h: 'Các hiệp định thương mại tự do (FTA)' },
      { p: 'FTA (Free Trade Agreement) là hiệp định mà các bên cam kết cắt giảm thuế quan và rào cản thương mại cho nhau. Tham gia nhiều FTA giúp một nước mở rộng thị trường xuất khẩu, nhưng cũng phải mở cửa thị trường nội địa.' },
      { note: 'Toàn cầu hoá có cả lợi ích lẫn rủi ro. Việt Nam gia nhập ASEAN năm 1995.' },
    ],
    examples: [
      { q: 'Vì sao một dịch bệnh có thể lan ra toàn thế giới rất nhanh trong thời đại toàn cầu hoá?', a: 'Toàn cầu hoá khiến con người di chuyển và giao thương giữa các nước với tần suất rất cao bằng hàng không. Một mầm bệnh có thể theo người mang bệnh đến nhiều châu lục chỉ trong vài ngày. Đây là một mặt trái: sự kết nối chặt chẽ cũng làm rủi ro lan truyền nhanh hơn.' },
      { q: 'Toàn cầu hoá có thể đe doạ bản sắc văn hoá dân tộc như thế nào, và nên ứng xử ra sao?', a: 'Khi văn hoá, lối sống ngoại lai tràn vào ồ ạt, các giá trị truyền thống có thể bị lấn át, mai một. Cách ứng xử là "hoà nhập nhưng không hoà tan": chủ động tiếp thu tinh hoa thế giới, đồng thời gìn giữ, phát huy bản sắc văn hoá dân tộc.' },
    ],
  },

  'H10DIA-w29-quiz': {
    topic: 'Môi trường và tài nguyên',
    intro: 'Phát triển kinh tế không thể tách rời môi trường và tài nguyên. Các em sẽ tìm hiểu phân loại tài nguyên, các dạng ô nhiễm và nguyên nhân biến đổi khí hậu.',
    objectives: [
      'Nêu khái niệm môi trường và phân loại tài nguyên thiên nhiên.',
      'Phân biệt tài nguyên tái tạo và không tái tạo.',
      'Hiểu các dạng ô nhiễm và nguyên nhân biến đổi khí hậu.',
    ],
    theory: [
      { h: 'Môi trường là gì?' },
      { p: 'Môi trường là tổng thể các yếu tố tự nhiên, xã hội và nhân tạo bao quanh con người, ảnh hưởng đến sự tồn tại và phát triển của con người và sinh vật. Môi trường vừa là không gian sống, vừa là nguồn cung cấp tài nguyên và nơi chứa chất thải.' },
      { h: 'Phân loại tài nguyên thiên nhiên' },
      { ul: [
        'Tài nguyên tái tạo: nước, đất, sinh vật, năng lượng mặt trời, gió — có thể phục hồi nếu khai thác hợp lý.',
        'Tài nguyên không tái tạo: khoáng sản, than đá, dầu khí — có hạn, dùng hết sẽ cạn kiệt.',
      ] },
      { h: 'Năng lượng tái tạo' },
      { p: 'Năng lượng tái tạo gồm năng lượng mặt trời, gió, thuỷ điện, sinh khối và địa nhiệt. Đây là nguồn năng lượng sạch, gần như vô tận, ngày càng được ưu tiên phát triển để thay thế nhiên liệu hoá thạch.' },
      { h: 'Ô nhiễm và biến đổi khí hậu' },
      { p: 'Ô nhiễm môi trường gồm ô nhiễm không khí, nước, đất, tiếng ồn... Biến đổi khí hậu chủ yếu do con người thải ra quá nhiều khí nhà kính (CO2, CH4) từ đốt nhiên liệu hoá thạch, làm Trái Đất nóng lên, băng tan, nước biển dâng và thời tiết cực đoan gia tăng.' },
      { note: 'Tài nguyên chia thành tái tạo và không tái tạo. Biến đổi khí hậu do khí nhà kính tăng.' },
    ],
    examples: [
      { q: 'Vì sao dầu mỏ được xếp vào tài nguyên không tái tạo dù vẫn còn được khai thác mỗi ngày?', a: 'Dầu mỏ hình thành qua hàng triệu năm từ xác sinh vật bị vùi lấp, biến đổi địa chất. Tốc độ tiêu thụ của con người nhanh hơn rất nhiều so với tốc độ hình thành, nên trên thực tế nó không thể phục hồi kịp — dùng đến đâu cạn đến đó, vì vậy là tài nguyên không tái tạo.' },
      { q: 'Vì sao chuyển sang năng lượng tái tạo được coi là giải pháp gốc cho biến đổi khí hậu?', a: 'Biến đổi khí hậu chủ yếu do đốt nhiên liệu hoá thạch thải ra khí nhà kính. Năng lượng tái tạo (gió, mặt trời) tạo ra điện mà phát thải rất ít CO2, nên thay thế hoá thạch bằng nguồn này sẽ cắt giảm tận gốc nguyên nhân gây nóng lên toàn cầu.' },
    ],
  },

  'H10DIA-w30-quiz': {
    topic: 'Phát triển bền vững',
    intro: 'Làm sao để phát triển hôm nay mà không "vay mượn" của thế hệ mai sau? Câu trả lời là phát triển bền vững. Các em sẽ tìm hiểu khái niệm và các trụ cột của nó.',
    objectives: [
      'Nêu khái niệm và ba trụ cột của phát triển bền vững.',
      'Biết về 17 Mục tiêu Phát triển Bền vững (SDGs) của Liên Hợp Quốc.',
      'Liên hệ hành động cá nhân vì phát triển bền vững.',
    ],
    theory: [
      { h: 'Phát triển bền vững là gì?' },
      { p: 'Phát triển bền vững là sự phát triển đáp ứng nhu cầu của thế hệ hiện tại mà không làm tổn hại đến khả năng đáp ứng nhu cầu của các thế hệ tương lai (theo Báo cáo Brundtland, 1987). Nói cách khác, không khai thác cạn kiệt tài nguyên và huỷ hoại môi trường để đổi lấy tăng trưởng trước mắt.' },
      { h: 'Ba trụ cột' },
      { ul: [
        'Kinh tế: tăng trưởng ổn định, hiệu quả.',
        'Xã hội: công bằng, tiến bộ, giảm nghèo.',
        'Môi trường: bảo vệ tài nguyên, hệ sinh thái.',
      ] },
      { h: '17 Mục tiêu Phát triển Bền vững (SDGs)' },
      { p: 'Năm 2015, Liên Hợp Quốc thông qua 17 Mục tiêu Phát triển Bền vững (SDGs) với lộ trình đến năm 2030, bao trùm các vấn đề như xoá nghèo, giáo dục, bình đẳng, năng lượng sạch, hành động vì khí hậu. Đây là khung hành động chung cho toàn thế giới.' },
      { h: 'Tăng trưởng xanh và hành động cá nhân' },
      { p: 'Tăng trưởng xanh là phát triển kinh tế gắn với bảo vệ môi trường, sử dụng năng lượng sạch và công nghệ ít phát thải. Ở quy mô cá nhân, mỗi em có thể góp phần bằng việc tiết kiệm điện - nước, phân loại rác, hạn chế nhựa dùng một lần, đi xe đạp hoặc phương tiện công cộng.' },
      { note: 'Phát triển bền vững cân bằng ba trụ cột: Kinh tế - Xã hội - Môi trường. SDGs do Liên Hợp Quốc ban hành năm 2015.' },
    ],
    examples: [
      { q: 'Một nhà máy tăng lợi nhuận bằng cách xả thẳng nước thải ra sông. Vì sao đây không phải là phát triển bền vững?', a: 'Vì nó chỉ chú trọng trụ cột kinh tế (lợi nhuận) mà bỏ qua môi trường (ô nhiễm sông) và xã hội (ảnh hưởng sức khoẻ dân cư). Phát triển bền vững đòi hỏi cân bằng cả ba trụ cột; hy sinh môi trường để có lợi trước mắt sẽ để lại hậu quả cho thế hệ sau.' },
      { q: 'Hãy nêu ba việc làm cụ thể của một học sinh góp phần vào phát triển bền vững.', a: 'Có thể kể: tiết kiệm điện và nước trong sinh hoạt; phân loại và giảm rác thải, mang theo bình nước, túi vải để hạn chế nhựa dùng một lần; đi bộ, xe đạp hoặc xe buýt đến trường. Những hành động nhỏ này giảm phát thải và tiết kiệm tài nguyên.' },
    ],
  },

  'H10DIA-w31-quiz': {
    topic: 'Các tổ chức quốc tế',
    intro: 'Để giải quyết các vấn đề chung, các nước lập ra những tổ chức quốc tế. Các em sẽ tìm hiểu Liên Hợp Quốc và một số tổ chức chuyên môn quan trọng.',
    objectives: [
      'Nêu thời điểm thành lập và cơ cấu cơ bản của Liên Hợp Quốc.',
      'Biết chức năng của một số tổ chức như IMF, WHO.',
      'Nêu thời điểm Việt Nam gia nhập Liên Hợp Quốc.',
    ],
    theory: [
      { h: 'Liên Hợp Quốc (LHQ)' },
      { p: 'Liên Hợp Quốc được thành lập ngày 24/10/1945 sau Chiến tranh thế giới thứ hai, nhằm gìn giữ hoà bình, an ninh và thúc đẩy hợp tác quốc tế. Đến nay LHQ có 193 thành viên — gần như toàn bộ các quốc gia trên thế giới.' },
      { h: 'Cơ cấu của Liên Hợp Quốc' },
      { ul: [
        'Đại hội đồng: gồm tất cả thành viên, mỗi nước một phiếu.',
        'Hội đồng Bảo an: giữ vai trò về hoà bình - an ninh, có 5 thành viên thường trực (Mỹ, Nga, Trung Quốc, Anh, Pháp) với quyền phủ quyết.',
        'Cùng nhiều cơ quan và tổ chức chuyên môn khác.',
      ] },
      { h: 'Một số tổ chức chuyên môn' },
      { p: 'IMF (Quỹ Tiền tệ Quốc tế) hỗ trợ ổn định tài chính - tiền tệ toàn cầu. WHO (Tổ chức Y tế Thế giới) phụ trách các vấn đề y tế, dịch bệnh. UNESCO phụ trách giáo dục, khoa học và văn hoá. Mỗi tổ chức đảm nhận một lĩnh vực chuyên môn của hợp tác quốc tế.' },
      { h: 'Việt Nam và Liên Hợp Quốc' },
      { p: 'Việt Nam gia nhập Liên Hợp Quốc ngày 20/9/1977. Từ đó nước ta tham gia ngày càng tích cực, từng là thành viên không thường trực Hội đồng Bảo an và đóng góp lực lượng gìn giữ hoà bình.' },
      { note: 'Liên Hợp Quốc thành lập năm 1945; 5 nước thường trực Hội đồng Bảo an: Mỹ, Nga, Trung, Anh, Pháp. Việt Nam gia nhập năm 1977.' },
    ],
    examples: [
      { q: 'Vì sao quyền phủ quyết của 5 nước thường trực Hội đồng Bảo an vừa quan trọng vừa gây tranh cãi?', a: 'Quan trọng vì nó buộc các cường quốc phải đồng thuận mới ra được quyết định lớn, tránh xung đột giữa họ. Gây tranh cãi vì chỉ cần một nước thường trực phủ quyết là một nghị quyết bị chặn, dù đa số ủng hộ — khiến nhiều vấn đề bế tắc và bị xem là thiếu công bằng.' },
      { q: 'Khi xảy ra một đại dịch toàn cầu, tổ chức quốc tế nào sẽ giữ vai trò điều phối chính và vì sao?', a: 'Đó là WHO (Tổ chức Y tế Thế giới). Vì WHO là cơ quan chuyên môn của Liên Hợp Quốc về y tế, có chức năng đưa ra khuyến cáo, điều phối chia sẻ thông tin, vaccine và phối hợp ứng phó dịch bệnh giữa các quốc gia.' },
    ],
  },

  'H10DIA-w32-quiz': {
    topic: 'Các liên minh khu vực',
    intro: 'Bên cạnh các tổ chức toàn cầu, nhiều nước trong cùng khu vực liên kết thành các liên minh. Các em sẽ tìm hiểu EU, ASEAN, USMCA và APEC.',
    objectives: [
      'Nêu đặc điểm cơ bản của EU và đồng tiền chung euro.',
      'Biết thành phần của ASEAN, USMCA, APEC.',
      'Hiểu ý nghĩa của Cộng đồng Kinh tế ASEAN (AEC).',
    ],
    theory: [
      { h: 'Liên minh châu Âu (EU)' },
      { p: 'Liên minh châu Âu (EU) là tổ chức liên kết khu vực sâu rộng nhất thế giới, hiện có 27 thành viên (sau khi Anh rời khỏi EU, gọi là Brexit, năm 2020). Phần lớn các nước EU dùng chung đồng tiền euro trong khu vực Eurozone, đi lại tự do và có thị trường chung.' },
      { h: 'ASEAN và AEC' },
      { ul: [
        'ASEAN gồm 10 thành viên: Brunei, Campuchia, Indonesia, Lào, Malaysia, Myanmar, Philippines, Singapore, Thái Lan, Việt Nam.',
        'Cộng đồng Kinh tế ASEAN (AEC) hình thành cuối năm 2015, hướng tới một thị trường và cơ sở sản xuất thống nhất trong khu vực.',
      ] },
      { h: 'Các liên minh khác' },
      { p: 'USMCA (có hiệu lực năm 2020, thay cho NAFTA) là khu vực thương mại tự do gồm Hoa Kỳ, Canada và Mexico. APEC (Diễn đàn Hợp tác Kinh tế châu Á - Thái Bình Dương) gồm 21 nền kinh tế quanh Thái Bình Dương, thúc đẩy tự do thương mại và đầu tư.' },
      { h: 'Ý nghĩa của liên kết khu vực' },
      { p: 'Liên kết khu vực giúp các nước thành viên mở rộng thị trường, phân công lao động, tăng sức cạnh tranh và tiếng nói chung trên trường quốc tế. Tuy nhiên cũng đòi hỏi nhượng bớt một phần chủ quyền kinh tế và đối mặt cạnh tranh nội khối.' },
      { note: 'EU có 27 thành viên, dùng đồng euro; ASEAN có 10 thành viên; AEC hình thành năm 2015.' },
    ],
    examples: [
      { q: 'Việc dùng chung đồng euro mang lại lợi ích và rủi ro gì cho các nước EU?', a: 'Lợi ích: thuận tiện thương mại, du lịch, đầu tư trong khối vì không phải đổi tiền và không lo tỉ giá. Rủi ro: các nước mất công cụ tiền tệ riêng, không thể tự điều chỉnh đồng tiền khi gặp khủng hoảng, nên khó ứng phó khi nền kinh tế gặp khó khăn riêng.' },
      { q: 'Cộng đồng Kinh tế ASEAN (AEC) tạo cơ hội gì cho lao động và doanh nghiệp Việt Nam?', a: 'AEC hướng tới thị trường và sản xuất thống nhất, cho phép hàng hoá, dịch vụ, vốn và lao động có tay nghề di chuyển dễ hơn trong khu vực. Lao động Việt có cơ hội làm việc ở nước ASEAN khác, doanh nghiệp mở rộng thị trường, nhưng cũng phải cạnh tranh với hàng hoá và lao động trong khối.' },
    ],
  },

  'H10DIA-w33-quiz': {
    topic: 'Việt Nam hội nhập quốc tế',
    intro: 'Các em sẽ tổng hợp lại con đường hội nhập của Việt Nam: từ gia nhập các tổ chức lớn đến ký kết những hiệp định thương mại thế hệ mới.',
    objectives: [
      'Kể được các tổ chức quốc tế mà Việt Nam là thành viên.',
      'Nêu các FTA lớn Việt Nam tham gia (EVFTA, CPTPP, RCEP).',
      'Hiểu đường lối đối ngoại của Việt Nam.',
    ],
    theory: [
      { h: 'Việt Nam trong các tổ chức quốc tế' },
      { p: 'Việt Nam là thành viên tích cực của nhiều tổ chức: Liên Hợp Quốc (1977), ASEAN (1995), APEC (1998), WTO (2007), cùng các tổ chức chuyên môn như UNESCO, WHO. Quá trình hội nhập diễn ra từng bước, ngày càng sâu rộng.' },
      { h: 'Các hiệp định thương mại tự do thế hệ mới' },
      { ul: [
        'EVFTA: Hiệp định thương mại tự do Việt Nam - EU, có hiệu lực tháng 8/2020.',
        'CPTPP: hiệp định gồm 11 nền kinh tế quanh Thái Bình Dương (Nhật, Canada, Australia, New Zealand, Việt Nam, Singapore, Malaysia, Brunei, Mexico, Chile, Peru).',
        'RCEP: hiệp định đối tác kinh tế toàn diện khu vực, gắn ASEAN với các đối tác lớn ở châu Á - Thái Bình Dương.',
      ] },
      { h: 'Lợi ích và thách thức hội nhập' },
      { p: 'Hội nhập sâu giúp Việt Nam mở rộng thị trường xuất khẩu, thu hút đầu tư nước ngoài, tiếp nhận công nghệ và kinh nghiệm quản lý. Đổi lại, doanh nghiệp trong nước phải nâng cao năng lực để cạnh tranh với hàng hoá và doanh nghiệp quốc tế ngay tại thị trường nội địa.' },
      { h: 'Đường lối đối ngoại' },
      { p: 'Việt Nam thực hiện đường lối đối ngoại độc lập, tự chủ, hoà bình, hợp tác và phát triển; đa phương hoá, đa dạng hoá quan hệ — là bạn, là đối tác tin cậy của các nước trong cộng đồng quốc tế.' },
      { note: 'Việt Nam tham gia EVFTA, CPTPP, RCEP; đường lối đối ngoại: độc lập, tự chủ, đa phương hoá, đa dạng hoá.' },
    ],
    examples: [
      { q: 'Hiệp định EVFTA giúp ích gì cho hàng nông sản, thuỷ sản xuất khẩu của Việt Nam sang EU?', a: 'EVFTA cắt giảm và xoá bỏ phần lớn thuế nhập khẩu của EU đối với hàng Việt Nam, giúp nông sản, thuỷ sản như cà phê, gạo, tôm, cá tra có giá cạnh tranh hơn ở thị trường EU rộng lớn và khó tính. Đổi lại, hàng Việt phải đáp ứng tiêu chuẩn chất lượng, an toàn cao của EU.' },
      { q: 'Vì sao đường lối "đa phương hoá, đa dạng hoá" lại có lợi cho một nước đang phát triển như Việt Nam?', a: 'Quan hệ với nhiều đối tác giúp Việt Nam không bị phụ thuộc vào một thị trường hay một nước duy nhất, giảm rủi ro khi quan hệ với một đối tác gặp trục trặc. Nó mở rộng cơ hội thương mại, đầu tư và tăng vị thế, tiếng nói của nước ta trên trường quốc tế.' },
    ],
  },

  'H10DIA-w34-quiz': {
    topic: 'Địa lý ứng dụng — GIS và viễn thám',
    intro: 'Công nghệ hiện đại đang biến địa lý thành công cụ mạnh để hiểu và quản lý thế giới. Các em sẽ tìm hiểu GIS, viễn thám, GPS và dữ liệu lớn.',
    objectives: [
      'Phân biệt GIS, viễn thám và GPS.',
      'Nêu các ứng dụng của GIS trong đời sống.',
      'Hiểu vai trò của bản đồ số và dữ liệu lớn trong địa lý.',
    ],
    theory: [
      { h: 'GIS — Hệ thông tin địa lý' },
      { p: 'GIS (Geographic Information System) là hệ thống thu thập, lưu trữ, quản lý, phân tích và hiển thị dữ liệu gắn với vị trí địa lý. GIS chồng xếp nhiều lớp thông tin (địa hình, dân cư, giao thông, môi trường) để phân tích và ra quyết định.' },
      { h: 'Viễn thám và GPS' },
      { ul: [
        'Viễn thám (remote sensing): thu thập thông tin về bề mặt Trái Đất từ xa qua vệ tinh, máy bay, drone — không cần tiếp xúc trực tiếp.',
        'GPS (Global Positioning System): hệ thống định vị toàn cầu qua vệ tinh, xác định vị trí chính xác trên mặt đất.',
      ] },
      { h: 'Ứng dụng trong đời sống' },
      { p: 'GIS và các công nghệ đi kèm được dùng rộng rãi: quy hoạch đô thị và giao thông, quản lý môi trường và thiên tai, dẫn đường (Google Maps), nông nghiệp chính xác, y tế công cộng và kinh doanh (chọn địa điểm mở cửa hàng). Bản đồ số khác bản đồ giấy ở chỗ có thể tương tác, cập nhật liên tục và phân tích được.' },
      { h: 'Dữ liệu lớn trong địa lý' },
      { p: 'Dữ liệu lớn (big data) từ điện thoại, vệ tinh, cảm biến cho phép phân tích xu hướng di chuyển dân cư, giao thông, biến đổi môi trường ở quy mô khổng lồ và thời gian thực — mở ra cách tiếp cận mới cho khoa học địa lý.' },
      { note: 'GIS quản lý - phân tích dữ liệu không gian; viễn thám thu thập từ xa; GPS định vị. Bản đồ số tương tác và cập nhật được.' },
    ],
    examples: [
      { q: 'Một thành phố muốn chọn vị trí xây bệnh viện mới sao cho phục vụ được nhiều dân nhất và tránh vùng ngập. GIS giúp như thế nào?', a: 'GIS chồng các lớp dữ liệu: mật độ dân cư, mạng lưới giao thông, bản đồ ngập lụt, vị trí bệnh viện hiện có. Phân tích chồng lớp sẽ tìm ra khu vực đông dân, đi lại thuận tiện, không bị ngập và còn thiếu cơ sở y tế — đó là vị trí tối ưu để xây bệnh viện.' },
      { q: 'Vì sao viễn thám rất hữu ích trong việc theo dõi nạn phá rừng hoặc lũ lụt trên diện rộng?', a: 'Vệ tinh viễn thám chụp ảnh bề mặt Trái Đất trên phạm vi rộng và lặp lại theo chu kỳ, kể cả những nơi con người khó tiếp cận. So sánh ảnh qua các thời điểm sẽ phát hiện được diện tích rừng mất đi hay vùng bị ngập, giúp giám sát kịp thời mà không cần đi thực địa khắp nơi.' },
    ],
  },

  'H10DIA-w35-quiz': {
    topic: 'Ôn tập cuối năm',
    intro: 'Các em hãy nhìn lại toàn bộ chương trình Địa lý 10: từ Trái Đất và các quyển tự nhiên đến dân cư, kinh tế và phát triển bền vững — một bức tranh hoàn chỉnh về hành tinh và con người.',
    objectives: [
      'Hệ thống hoá kiến thức địa lý tự nhiên và kinh tế - xã hội đại cương.',
      'Liên hệ giữa tự nhiên, con người và phát triển bền vững.',
      'Rèn kỹ năng tổng hợp, đánh giá vấn đề địa lý.',
    ],
    theory: [
      { h: 'Địa lý tự nhiên đại cương' },
      { ul: [
        'Trái Đất và các vận động sinh ra ngày đêm, các mùa, các đới khí hậu.',
        'Bốn quyển: thạch quyển (kiến tạo mảng), khí quyển (thời tiết, khí hậu), thuỷ quyển (vòng tuần hoàn nước), sinh quyển (đa dạng sinh học).',
        '5 đới khí hậu chính; Việt Nam thuộc nhiệt đới ẩm gió mùa.',
      ] },
      { h: 'Địa lý dân cư' },
      { p: 'Dân số thế giới vượt 8 tỉ; gia tăng tự nhiên = sinh − tử. Cơ cấu dân số (tuổi, giới) và phân bố dân cư không đều; đô thị hoá là xu thế lớn nhưng cần tránh quá tải.' },
      { h: 'Các ngành kinh tế' },
      { p: 'Kinh tế chia ba khu vực: nông nghiệp, công nghiệp, dịch vụ. Nước càng phát triển thì tỉ trọng dịch vụ càng cao. Thương mại quốc tế, toàn cầu hoá và các FTA gắn kết các nền kinh tế; Việt Nam hội nhập sâu qua WTO, ASEAN, EVFTA, CPTPP, RCEP.' },
      { h: 'Môi trường và phát triển bền vững' },
      { p: 'Phát triển không được đánh đổi môi trường. Phát triển bền vững cân bằng ba trụ cột Kinh tế - Xã hội - Môi trường, hướng tới 17 Mục tiêu Phát triển Bền vững của Liên Hợp Quốc — trách nhiệm của mọi quốc gia và mỗi cá nhân.' },
      { note: 'Mạch chương trình: Trái Đất → các quyển tự nhiên → dân cư → kinh tế → môi trường và phát triển bền vững.' },
    ],
    examples: [
      { q: 'Hãy chỉ ra mối liên hệ xuyên suốt giữa địa lý tự nhiên và địa lý kinh tế - xã hội qua một ví dụ ở Việt Nam.', a: 'Khí hậu nhiệt đới ẩm gió mùa và đồng bằng phù sa (tự nhiên) tạo điều kiện trồng lúa nước; nông nghiệp phát triển nuôi sống dân cư đông đúc ở đồng bằng (dân cư); lúa gạo trở thành mặt hàng xuất khẩu chủ lực, gắn Việt Nam với thương mại thế giới (kinh tế). Tự nhiên là nền tảng cho mọi hoạt động của con người.' },
      { q: 'Vì sao "phát triển bền vững" được đặt ở phần cuối chương trình như một thông điệp tổng kết?', a: 'Vì sau khi hiểu cả tự nhiên lẫn hoạt động kinh tế - xã hội, các em mới thấy rõ con người vừa dựa vào tự nhiên vừa tác động lên nó. Phát triển bền vững là cách hài hoà mối quan hệ đó: phát triển kinh tế, đảm bảo công bằng xã hội mà vẫn giữ gìn môi trường cho thế hệ sau — đích đến của toàn bộ kiến thức địa lý.' },
    ],
  },

  'H10DIA-w36-quiz': {
    topic: 'Kết thúc Địa Lý 10 — Bản đồ thế giới trong tâm trí',
    intro: 'Địa Lý 10 là năm học đặc biệt: từ Trái Đất trong vũ trụ đến khí quyển, thuỷ quyển, địa quyển — và sau đó là con người trên Trái Đất với các vấn đề dân số, kinh tế và môi trường toàn cầu. Hôm nay chúng ta nhìn lại hành trình đó.',
    objectives: [
      'Hệ thống hoá các chủ đề địa lý tự nhiên và địa lý kinh tế - xã hội của năm học.',
      'Nhận biết mối liên hệ giữa Địa Lý 10 (khái quát thế giới) và Địa Lý 11 (địa lý khu vực cụ thể).',
      'Phát triển thói quen tư duy không gian và đọc bản đồ để học tốt hơn.',
    ],
    theory: [
      { h: 'Bức tranh toàn cảnh Địa Lý 10' },
      { ul: [
        'Vũ trụ và Trái Đất: hệ Mặt Trời, chuyển động Trái Đất, hệ quả địa lý (ngày đêm, mùa, giờ giấc).',
        'Thạch quyển: cấu trúc Trái Đất, kiến tạo mảng, núi lửa, động đất, địa hình.',
        'Khí quyển: các tầng, nhiệt độ, áp suất, gió, mây mưa, các đới khí hậu.',
        'Thuỷ quyển: đại dương, biển, sông, hồ, nước ngầm — phân bố và vòng tuần hoàn nước.',
        'Dân số thế giới: phân bố, tỉ lệ tăng tự nhiên, đô thị hoá, di dân.',
        'Kinh tế toàn cầu: nông nghiệp, công nghiệp, dịch vụ trong bối cảnh toàn cầu hoá.',
      ] },
      { h: 'Hành trang sang Địa Lý 11 (Khu vực)' },
      { ul: [
        'Địa lý tự nhiên → Lớp 11 áp dụng cho từng khu vực: Đông Nam Á, Mỹ La Tinh, châu Phi…',
        'Kinh tế toàn cầu → Kinh tế từng nước/khu vực: Nhật Bản, Hoa Kỳ, EU, ASEAN.',
        'Bản đồ kĩ năng: đọc bản đồ địa hình, bản đồ kinh tế — lớp 11 sẽ dùng rất nhiều.',
        'Biến đổi khí hậu và môi trường → Lớp 11 phân tích tác động theo từng khu vực cụ thể.',
      ] },
      { h: 'Ôn hè cho Địa Lý' },
      { ul: [
        'Xem bản đồ thế giới mỗi tuần: nhận ra vị trí các châu lục, đại dương, biển lớn.',
        'Theo dõi tin tức địa lý: động đất, bão, lũ lụt — liên hệ với kiến thức đã học.',
        'Dùng Google Earth để "bay" qua các địa hình đã học: núi Himalaya, vùng bán khô hạn Sahel, đồng bằng châu thổ.',
      ] },
      { note: 'Địa lý học sống động nhất khi em nhìn ra cửa sổ và hỏi "Đây là địa hình gì? Tại sao?" — mỗi cảnh quan đều có câu chuyện địa lý phía sau.' },
    ],
    examples: [
      { q: 'Kiến thức Địa Lý 10 nào sẽ được dùng nhiều nhất khi học các khu vực cụ thể ở lớp 11?', a: 'Ba khối kiến thức được tái sử dụng liên tục: (1) Các đới khí hậu và hệ quả (nhiệt đới, ôn đới, hàn đới) — giải thích tại sao Nhật Bản có mùa tuyết còn Singapore quanh năm nắng; (2) Kiến tạo mảng và địa hình — giải thích "Vành đai lửa Thái Bình Dương", động đất Nhật Bản; (3) Quá trình đô thị hoá và di dân — giải thích siêu đô thị Tokyo, Mumbai hay Lagos.' },
      { q: 'Làm thế nào để đọc một bản đồ kinh tế chưa thấy bao giờ mà không bị mất phương hướng?', a: 'Trình tự 4 bước: (1) Đọc tên bản đồ — nó cho biết chủ đề (dân số? GDP? nông nghiệp?); (2) Đọc chú giải — màu sắc và ký hiệu tương ứng với ý nghĩa gì; (3) Xác định phạm vi không gian — bản đồ thế giới? châu lục? quốc gia?; (4) Nhận xét xu hướng chung trước khi đi vào chi tiết — vùng nào đậm màu nhất (cao nhất), vùng nào nhạt nhất (thấp nhất), có sự chênh lệch Bắc-Nam hay Đông-Tây không?' },
    ],
  },
};
