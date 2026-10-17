// ============================================================
// Lớp 12 · HOÁ HỌC — Lý thuyết tuần (35 tuần · THPT năm 3)
// Bám CTGD 2018 (Hoá học 12) + định hướng ôn thi tốt nghiệp THPT.
// Key trùng id quiz: "H12HOA-wNN-quiz".
// Công thức/phương trình viết text thường (CnH2nO2, RCOOH + R'OH -> ...).
// ============================================================

export const H12HOA_LESSONS = {
  'H12HOA-w01-quiz': {
    topic: 'Ester — Cấu tạo và danh pháp',
    intro: 'Chào các em! Mở đầu chương trình Hoá 12 là ester — hợp chất tạo nên mùi thơm của hoa quả. Tuần này thầy giúp các em nắm cấu tạo, công thức tổng quát và cách gọi tên ester.',
    objectives: [
      'Nêu được khái niệm và công thức tổng quát của ester no, đơn chức, mạch hở.',
      'Viết và gọi tên được các ester thường gặp theo danh pháp.',
      'Nhận biết được tính chất vật lí và mùi đặc trưng của ester.',
    ],
    theory: [
      { h: 'Ester là gì?' },
      { p: 'Khi thay nhóm -OH trong nhóm -COOH của acid carboxylic bằng nhóm -OR\' ta được ester. Ester đơn chức có dạng RCOOR\' với R\' là gốc hydrocarbon (R có thể là H).' },
      { p: 'Ester được tạo ra từ phản ứng ester hoá giữa acid và alcohol: RCOOH + R\'OH thuận nghịch RCOOR\' + H2O (xúc tác H2SO4 đặc, đun nóng).' },
      { h: 'Công thức tổng quát' },
      { ul: [
        'Ester no, đơn chức, mạch hở: CnH2nO2 (n ≥ 2). Ví dụ C2H4O2 là HCOOCH3.',
        'Đồng phân: cùng công thức phân tử có thể là ester hoặc acid (vd C3H6O2 có 2 ester HCOOC2H5, CH3COOCH3 và 1 acid C2H5COOH).',
      ] },
      { h: 'Cách gọi tên' },
      { p: 'Tên ester = tên gốc alcohol (R\') + tên gốc acid (đổi đuôi -ic thành -at). Ví dụ CH3COOC2H5 đọc là ethyl acetate (gốc ethyl + acetate từ acid acetic).' },
      { h: 'Tính chất vật lí' },
      { ul: [
        'Ester nhẹ hơn nước, ít tan hoặc không tan trong nước.',
        'Nhiệt độ sôi thấp hơn acid và alcohol có cùng số C (không tạo liên kết hydrogen giữa các phân tử ester).',
        'Nhiều ester có mùi thơm dễ chịu: isoamyl acetate mùi chuối, ethyl butyrate mùi dứa, benzyl acetate mùi hoa nhài.',
      ] },
      { note: 'Mẹo nhớ: nhóm -COO- là dấu hiệu của ester. Gốc đứng trước O liên kết với C=O là gốc acid, gốc đứng sau O là gốc alcohol.' },
    ],
    examples: [
      { q: 'Viết công thức và gọi tên 2 ester có công thức phân tử C3H6O2.', a: 'C3H6O2 (CnH2nO2, n=3) có 2 ester: HCOOC2H5 là ethyl formate; CH3COOCH3 là methyl acetate.' },
      { q: 'Gọi tên ester CH3CH2COOCH3.', a: 'Gốc acid là CH3CH2COO- (từ acid propionic -> propionate), gốc alcohol là CH3 (methyl). Tên: methyl propionate.' },
    ],
  },

  'H12HOA-w02-quiz': {
    topic: 'Ester — Phản ứng thuỷ phân và điều chế',
    intro: 'Các em ơi, ester có thể bị "tách ra" trở lại thành acid và alcohol khi gặp nước. Tuần này thầy trò ta học phản ứng thuỷ phân trong môi trường acid và base, và cách tính toán theo phương trình.',
    objectives: [
      'Viết được phương trình thuỷ phân ester trong môi trường acid và base.',
      'Phân biệt được phản ứng ester hoá (thuận nghịch) và xà phòng hoá (một chiều).',
      'Tính được khối lượng chất trong bài toán thuỷ phân ester.',
    ],
    theory: [
      { h: 'Thuỷ phân trong môi trường acid' },
      { p: 'Phản ứng thuận nghịch, là phản ứng nghịch của ester hoá: RCOOR\' + H2O thuận nghịch RCOOH + R\'OH (xúc tác H2SO4, đun nóng). Thu lại acid và alcohol ban đầu.' },
      { h: 'Thuỷ phân trong môi trường base (xà phòng hoá)' },
      { p: 'Phản ứng một chiều, không thuận nghịch: RCOOR\' + NaOH -> RCOONa + R\'OH. Vì sản phẩm muối RCOONa không phản ứng ngược với alcohol nên phản ứng xảy ra hoàn toàn.' },
      { p: 'Ví dụ: CH3COOC2H5 + NaOH -> CH3COONa + C2H5OH.' },
      { h: 'Phương pháp tính toán' },
      { ul: [
        'Ester đơn chức + NaOH theo tỉ lệ mol 1:1, sinh ra 1 muối + 1 alcohol.',
        'Bảo toàn khối lượng: m(ester) + m(NaOH) = m(muối) + m(alcohol).',
        'Nếu thuỷ phân cho muối + alcohol bậc 2 -> gốc alcohol là -CH(CH3)2 hoặc tương tự.',
      ] },
      { note: 'Phản ứng ester hoá thuận nghịch nên muốn tăng hiệu suất cần dùng H2SO4 đặc hút nước và lấy bớt sản phẩm ra khỏi hệ.' },
    ],
    examples: [
      { q: 'Cần bao nhiêu gam CH3COOC2H5 để thuỷ phân thu được 8,2 g CH3COONa?', a: 'n(CH3COONa) = 8,2/82 = 0,1 mol. Theo CH3COOC2H5 + NaOH -> CH3COONa + C2H5OH, n(ester) = 0,1 mol -> m = 0,1 . 88 = 8,8 g.' },
      { q: 'Thuỷ phân ester X bằng NaOH thu được muối và isopropanol. Xác định X.', a: 'Isopropanol là (CH3)2CHOH (alcohol bậc 2). Ester X = CH3COOCH(CH3)2 (isopropyl acetate), thuỷ phân cho CH3COONa + (CH3)2CHOH.' },
    ],
  },

  'H12HOA-w03-quiz': {
    topic: 'Lipid — Chất béo và xà phòng',
    intro: 'Các em thân mến, chất béo trong dầu ăn, mỡ động vật chính là một loại ester đặc biệt. Tuần này thầy giúp các em hiểu cấu tạo chất béo, phản ứng xà phòng hoá và vì sao xà phòng giặt sạch vết bẩn.',
    objectives: [
      'Nêu được khái niệm chất béo là triester của glycerol và acid béo.',
      'Phân biệt được acid béo no và không no, viết phương trình xà phòng hoá.',
      'Giải thích được cơ chế tẩy rửa của xà phòng.',
    ],
    theory: [
      { h: 'Chất béo là gì?' },
      { p: 'Chất béo (triglyceride) là triester của glycerol C3H5(OH)3 với ba acid béo. Acid béo là acid carboxylic mạch dài (12-24 C), không phân nhánh.' },
      { ul: [
        'Acid béo no: palmitic C15H31COOH, stearic C17H35COOH -> chất béo no, rắn (mỡ).',
        'Acid béo không no: oleic C17H33COOH (1 nối đôi), linoleic (2 nối đôi) -> chất béo lỏng (dầu).',
      ] },
      { h: 'Phản ứng xà phòng hoá' },
      { p: 'Đun chất béo với dung dịch NaOH (hoặc KOH): (RCOO)3C3H5 + 3NaOH -> 3RCOONa + C3H5(OH)3. Sản phẩm là muối acid béo (xà phòng) và glycerol.' },
      { h: 'Vì sao xà phòng giặt sạch?' },
      { p: 'Phân tử xà phòng RCOONa có hai đầu: gốc R kị nước (hướng vào dầu mỡ) và đầu COO- ưa nước (hướng ra nước). Nó bao quanh giọt dầu mỡ tạo thành hạt nhỏ phân tán vào nước rồi bị cuốn trôi.' },
      { note: 'Nhược điểm xà phòng: kết tủa với ion Ca2+, Mg2+ trong nước cứng nên giảm tác dụng. Chất giặt rửa tổng hợp (RC6H4SO3Na) khắc phục được điều này.' },
    ],
    examples: [
      { q: 'Viết phương trình xà phòng hoá tristearin (C17H35COO)3C3H5 bằng NaOH.', a: '(C17H35COO)3C3H5 + 3NaOH -> 3C17H35COONa + C3H5(OH)3. Sản phẩm là natri stearate (xà phòng) và glycerol.' },
      { q: 'Cần bao nhiêu mol NaOH để xà phòng hoá hoàn toàn 1 mol chất béo?', a: 'Chất béo là triester (3 nhóm -COO-) nên cần 3 mol NaOH cho mỗi mol chất béo.' },
    ],
  },

  'H12HOA-w04-quiz': {
    topic: 'Carbohydrate — Glucose và fructose',
    intro: 'Các em ơi, glucose là nguồn năng lượng trực tiếp cho cơ thể, có trong quả nho chín. Tuần này thầy trò ta tìm hiểu cấu tạo và các phản ứng đặc trưng của glucose và fructose.',
    objectives: [
      'Nêu được công thức phân tử và đặc điểm cấu tạo của glucose.',
      'Viết được các phản ứng đặc trưng: tráng bạc, với Cu(OH)2, lên men.',
      'So sánh được glucose và fructose.',
    ],
    theory: [
      { h: 'Glucose là gì?' },
      { p: 'Glucose có công thức phân tử C6H12O6 (M = 180), là monosaccharide. Dạng mạch hở có 5 nhóm -OH và 1 nhóm -CHO (aldehyde): CH2OH-(CHOH)4-CHO.' },
      { h: 'Tính chất hoá học của glucose' },
      { ul: [
        'Tính chất của nhóm -CHO: phản ứng tráng bạc với AgNO3/NH3 tạo Ag; làm mất màu nước bromine; bị khử thành sorbitol.',
        'Tính chất của nhiều nhóm -OH liền kề: hoà tan Cu(OH)2 ở nhiệt độ thường tạo phức xanh lam.',
        'Lên men rượu: C6H12O6 -> 2C2H5OH + 2CO2 (men, 30-35 độ C).',
      ] },
      { h: 'Fructose' },
      { p: 'Fructose cũng là C6H12O6 nhưng có nhóm xeton C=O thay vì aldehyde. Trong môi trường base, fructose chuyển hoá thành glucose nên cũng có phản ứng tráng bạc.' },
      { note: 'Glucose và fructose là đồng phân của nhau (cùng C6H12O6). Glucose có trong máu (đường huyết), fructose có trong mật ong và quả ngọt.' },
    ],
    examples: [
      { q: 'Cho 18 g glucose lên men hoàn toàn. Tính thể tích CO2 (đktc) thu được.', a: 'n(glucose) = 18/180 = 0,1 mol. C6H12O6 -> 2C2H5OH + 2CO2 nên n(CO2) = 0,2 mol -> V = 0,2 . 22,4 = 4,48 lít.' },
      { q: 'Vì sao fructose không có nhóm -CHO mà vẫn tráng bạc được?', a: 'Trong môi trường base (NH3) của thuốc thử Tollens, fructose chuyển hoá thành glucose có nhóm -CHO, nên tham gia phản ứng tráng bạc tạo Ag.' },
    ],
  },

  'H12HOA-w05-quiz': {
    topic: 'Saccharose, tinh bột và cellulose',
    intro: 'Các em thân mến, đường mía, gạo, bông vải đều là carbohydrate phức tạp. Tuần này thầy giúp các em phân biệt disaccharide và polysaccharide qua saccharose, tinh bột và cellulose.',
    objectives: [
      'Nêu được cấu tạo và phản ứng thuỷ phân của saccharose.',
      'Phân biệt được tinh bột (alpha-glucose) và cellulose (beta-glucose).',
      'Biết phản ứng nhận biết tinh bột bằng iodine.',
    ],
    theory: [
      { h: 'Saccharose (đường mía)' },
      { p: 'Saccharose C12H22O11 là disaccharide gồm 1 gốc alpha-glucose và 1 gốc beta-fructose. Vì cả hai gốc đã đóng vòng tại nhóm C=O nên saccharose KHÔNG có phản ứng tráng bạc.' },
      { p: 'Thuỷ phân: C12H22O11 + H2O -> C6H12O6 (glucose) + C6H12O6 (fructose).' },
      { h: 'Tinh bột' },
      { ul: [
        'Công thức (C6H10O5)n, gồm các mắt xích alpha-glucose.',
        'Hai thành phần: amylose (mạch không phân nhánh) và amylopectin (mạch phân nhánh).',
        'Thuỷ phân hoàn toàn: (C6H10O5)n + nH2O -> nC6H12O6 (glucose).',
      ] },
      { h: 'Cellulose' },
      { p: 'Cellulose (C6H10O5)n gồm các mắt xích beta-glucose, mạch thẳng không phân nhánh. Là thành phần chính của thành tế bào thực vật, bông, gỗ. Mỗi mắt xích có 3 nhóm -OH tự do.' },
      { note: 'Phản ứng nhận biết tinh bột: tinh bột + I2 -> màu xanh tím (do cấu trúc xoắn của amylose giữ phân tử iodine). Đun nóng mất màu, để nguội màu trở lại.' },
    ],
    examples: [
      { q: 'Thuỷ phân hoàn toàn 1 mol tinh bột (C6H10O5)n thu được tối đa bao nhiêu mol glucose?', a: '(C6H10O5)n + nH2O -> nC6H12O6. Một mol tinh bột có n mắt xích nên cho tối đa n mol glucose.' },
      { q: 'Vì sao tinh bột và cellulose đều có công thức (C6H10O5)n nhưng tính chất khác nhau?', a: 'Tinh bột gồm mắt xích alpha-glucose (mạch xoắn, phân nhánh), cellulose gồm mắt xích beta-glucose (mạch thẳng dài). Cách liên kết khác nhau dẫn đến tính chất vật lí và vai trò khác nhau.' },
    ],
  },

  'H12HOA-w06-quiz': {
    topic: 'Amine — Cấu tạo và tính base',
    intro: 'Các em ơi, amine là hợp chất chứa nitrogen, có mùi tanh đặc trưng của cá. Tuần này thầy giúp các em hiểu cấu tạo, bậc của amine và vì sao amine có tính base.',
    objectives: [
      'Nêu được khái niệm amine là dẫn xuất của NH3 và phân biệt bậc của amine.',
      'Giải thích được tính base của amine và so sánh độ mạnh.',
      'Viết được phản ứng của amine với acid.',
    ],
    theory: [
      { h: 'Amine là gì?' },
      { p: 'Amine là hợp chất tạo thành khi thay một hoặc nhiều nguyên tử H trong NH3 bằng gốc hydrocarbon. Phân loại theo bậc: amine bậc 1 (R-NH2), bậc 2 (R-NH-R\'), bậc 3 (R-N(R\')-R\'\').' },
      { p: 'Bậc của amine bằng số nguyên tử H trong NH3 bị thay thế. Ví dụ CH3-NH-CH3 (dimethylamine) là amine bậc 2.' },
      { h: 'Tính base của amine' },
      { p: 'Nguyên tử N còn cặp electron tự do nên amine nhận được proton H+ -> thể hiện tính base. Phản ứng với acid tạo muối: R-NH2 + HCl -> R-NH3Cl.' },
      { h: 'So sánh tính base' },
      { ul: [
        'Gốc đẩy electron (alkyl) làm tăng mật độ electron trên N -> tăng tính base.',
        'Gốc hút electron (vòng benzene) làm giảm tính base.',
        'Thứ tự: amine béo (CH3NH2) > NH3 > aniline (C6H5NH2).',
      ] },
      { note: 'Aniline C6H5NH2 không làm đổi màu quỳ tím (tính base rất yếu) nhưng vẫn tạo muối với HCl: C6H5NH2 + HCl -> C6H5NH3Cl.' },
    ],
    examples: [
      { q: 'Sắp xếp tính base tăng dần: C6H5NH2, NH3, CH3NH2.', a: 'Vòng benzene hút electron làm aniline yếu nhất; gốc methyl đẩy electron làm CH3NH2 mạnh nhất. Thứ tự tăng dần: C6H5NH2 < NH3 < CH3NH2.' },
      { q: 'Viết phương trình aniline phản ứng với dung dịch HCl.', a: 'C6H5NH2 + HCl -> C6H5NH3Cl (phenylammonium chloride, kết tinh màu trắng). Đây là phản ứng thể hiện tính base của aniline.' },
    ],
  },

  'H12HOA-w07-quiz': {
    topic: 'Amino acid',
    intro: 'Các em thân mến, amino acid là "viên gạch" tạo nên protein của mọi cơ thể sống. Tuần này thầy giúp các em hiểu cấu tạo lưỡng tính đặc biệt của amino acid.',
    objectives: [
      'Nêu được khái niệm amino acid có cả nhóm -NH2 và -COOH.',
      'Giải thích được tính lưỡng tính và dạng ion lưỡng cực.',
      'Viết được công thức một số amino acid thường gặp.',
    ],
    theory: [
      { h: 'Amino acid là gì?' },
      { p: 'Amino acid là hợp chất hữu cơ tạp chức, trong phân tử chứa đồng thời nhóm amino -NH2 (tính base) và nhóm carboxyl -COOH (tính acid).' },
      { ul: [
        'Glycine: H2N-CH2-COOH (M = 75) — đơn giản nhất, không có C bất đối.',
        'Alanine: CH3-CH(NH2)-COOH.',
        'Glutamic acid: HOOC-(CH2)2-CH(NH2)-COOH (2 nhóm COOH).',
        'Lysine: H2N-(CH2)4-CH(NH2)-COOH (2 nhóm NH2).',
      ] },
      { h: 'Tính lưỡng tính' },
      { p: 'Vì có cả nhóm acid và nhóm base, amino acid phản ứng được với cả acid và base. Trong dung dịch nước, nhóm -COOH nhường H+ cho nhóm -NH2 tạo dạng ion lưỡng cực: H3N+-R-COO-.' },
      { h: 'pH đẳng điện (pI)' },
      { p: 'pI là giá trị pH mà tại đó amino acid tồn tại chủ yếu ở dạng ion lưỡng cực, có điện tích tổng bằng 0 nên không di chuyển trong điện trường.' },
      { note: 'Vì có dạng ion lưỡng cực, amino acid là chất rắn kết tinh, có nhiệt độ nóng chảy cao, tan tốt trong nước (giống muối).' },
    ],
    examples: [
      { q: 'Viết phản ứng của glycine với HCl và với NaOH.', a: 'Với HCl (nhóm NH2 phản ứng): H2N-CH2-COOH + HCl -> ClH3N-CH2-COOH. Với NaOH (nhóm COOH phản ứng): H2N-CH2-COOH + NaOH -> H2N-CH2-COONa + H2O.' },
      { q: 'Cho 0,1 mol amino acid X phản ứng vừa đủ với 0,1 mol NaOH. X có mấy nhóm -COOH?', a: 'Tỉ lệ mol X : NaOH = 0,1 : 0,1 = 1 : 1. Mỗi nhóm -COOH phản ứng với 1 NaOH nên X có 1 nhóm -COOH.' },
    ],
  },

  'H12HOA-w08-quiz': {
    topic: 'Peptide và protein',
    intro: 'Các em ơi, nối các amino acid lại với nhau ta được peptide và protein — chất nền tảng của sự sống. Tuần này thầy giúp các em hiểu liên kết peptide và phản ứng nhận biết protein.',
    objectives: [
      'Nêu được khái niệm peptide, liên kết peptide và protein.',
      'Biết phản ứng màu biuret để nhận biết protein.',
      'Hiểu được hiện tượng đông tụ (biến tính) của protein.',
    ],
    theory: [
      { h: 'Peptide và liên kết peptide' },
      { p: 'Peptide là hợp chất chứa từ 2 đến 50 gốc alpha-amino acid liên kết với nhau qua liên kết peptide. Liên kết peptide là liên kết -CO-NH- hình thành khi nhóm -COOH của amino acid này phản ứng với nhóm -NH2 của amino acid kia, tách ra 1 phân tử H2O.' },
      { h: 'Protein' },
      { p: 'Protein là polypeptide có phân tử khối rất lớn (vài chục nghìn đến hàng triệu), gồm nhiều gốc alpha-amino acid. Protein đảm nhận nhiều vai trò: cấu trúc, enzyme, hormone, kháng thể, vận chuyển.' },
      { h: 'Tính chất hoá học' },
      { ul: [
        'Thuỷ phân hoàn toàn (acid, base hoặc enzyme): protein -> các alpha-amino acid.',
        'Phản ứng màu biuret: peptide có từ 2 liên kết peptide trở lên (tripeptide trở lên) + Cu(OH)2 trong môi trường base -> màu tím.',
        'Đông tụ (biến tính): khi đun nóng hoặc gặp acid, base, muối kim loại nặng -> protein kết tủa, mất hoạt tính.',
      ] },
      { note: 'Ví dụ đời sống: luộc trứng làm lòng trắng trứng (protein albumin) đông tụ; sữa gặp acid (chua) thì kết tủa.' },
    ],
    examples: [
      { q: 'Mô tả phản ứng hình thành liên kết peptide giữa 2 phân tử glycine.', a: 'H2N-CH2-COOH + H2N-CH2-COOH -> H2N-CH2-CO-NH-CH2-COOH + H2O. Nhóm -COOH của phân tử thứ nhất nối với nhóm -NH2 của phân tử thứ hai qua liên kết -CO-NH-, tách 1 H2O.' },
      { q: 'Làm thế nào để nhận biết lòng trắng trứng (protein) bằng phản ứng hoá học?', a: 'Cho dung dịch protein tác dụng với Cu(OH)2 trong môi trường kiềm -> xuất hiện màu tím (phản ứng biuret). Hoặc đun nóng thấy protein đông tụ.' },
    ],
  },

  'H12HOA-w09-quiz': {
    topic: 'Polymer — Khái niệm và điều chế',
    intro: 'Các em thân mến, từ tuần này ta bước sang thế giới polymer — những phân tử khổng lồ làm nên nhựa, cao su, tơ sợi. Tuần này thầy giúp các em hiểu hai phương pháp điều chế polymer.',
    objectives: [
      'Nêu được khái niệm polymer, monome, mắt xích.',
      'Phân biệt được phản ứng trùng hợp và trùng ngưng.',
      'Viết được phương trình điều chế một số polymer thường gặp.',
    ],
    theory: [
      { h: 'Polymer là gì?' },
      { p: 'Polymer là hợp chất có phân tử khối rất lớn, được tạo nên từ nhiều đơn vị nhỏ (mắt xích) lặp lại nhiều lần. Mỗi mắt xích bắt nguồn từ một phân tử nhỏ gọi là monome. Số mắt xích n gọi là hệ số polymer hoá.' },
      { h: 'Phản ứng trùng hợp' },
      { p: 'Là quá trình kết hợp nhiều monome giống nhau (có liên kết bội C=C hoặc vòng kém bền) tạo thành polymer, KHÔNG tách ra phân tử nhỏ. Ví dụ: nCH2=CH2 -> (-CH2-CH2-)n (polyethylene).' },
      { h: 'Phản ứng trùng ngưng' },
      { p: 'Là quá trình kết hợp nhiều monome (mỗi monome có ít nhất 2 nhóm chức như -OH, -COOH, -NH2) tạo thành polymer, đồng thời tách ra các phân tử nhỏ (thường là H2O).' },
      { ul: [
        'Trùng hợp: monome cần có liên kết bội. Vd cao su buna từ buta-1,3-diene.',
        'Trùng ngưng: monome cần có 2 nhóm chức. Vd nylon-6,6 từ hexamethylenediamine + adipic acid.',
      ] },
      { note: 'Phân biệt nhanh: trùng hợp giữ nguyên khối lượng (không tách gì); trùng ngưng có giải phóng phân tử nhỏ nên khối lượng polymer nhỏ hơn tổng khối lượng monome.' },
    ],
    examples: [
      { q: 'Viết phương trình điều chế PVC từ vinyl chloride.', a: 'nCH2=CHCl -> (-CH2-CHCl-)n. Đây là phản ứng trùng hợp vinyl chloride tạo poly(vinyl chloride) — PVC.' },
      { q: 'Vì sao điều chế nylon-6,6 là phản ứng trùng ngưng?', a: 'Monome là hexamethylenediamine H2N-(CH2)6-NH2 và adipic acid HOOC-(CH2)4-COOH, mỗi chất có 2 nhóm chức. Khi nối với nhau chúng tách ra H2O nên là trùng ngưng.' },
    ],
  },

  'H12HOA-w10-quiz': {
    topic: 'Vật liệu polymer — Chất dẻo, tơ, cao su',
    intro: 'Các em ơi, polymer được ứng dụng để làm ra nhựa, tơ vải, cao su quanh ta. Tuần này thầy giúp các em phân loại vật liệu polymer và biết nguồn gốc của chúng.',
    objectives: [
      'Nhận biết được một số chất dẻo thông dụng (PE, PVC, PS).',
      'Phân loại được tơ: thiên nhiên, bán tổng hợp, tổng hợp.',
      'Nêu được cao su thiên nhiên và cao su tổng hợp.',
    ],
    theory: [
      { h: 'Chất dẻo' },
      { ul: [
        'PE (polyethylene): từ CH2=CH2 -> túi nylon, màng bọc, chai nhựa.',
        'PVC (poly(vinyl chloride)): từ CH2=CHCl -> ống nước, áo mưa, vỏ dây điện.',
        'PS (polystyrene): từ CH2=CH-C6H5 -> hộp xốp, đồ chơi.',
        'PMMA (thuỷ tinh hữu cơ plexiglas): từ methyl methacrylate.',
      ] },
      { h: 'Tơ' },
      { ul: [
        'Tơ thiên nhiên: bông, len, tơ tằm (protein).',
        'Tơ bán tổng hợp (nhân tạo): tơ visco, tơ acetate — chế biến từ cellulose.',
        'Tơ tổng hợp: nylon-6,6 (poliamide), tơ capron, tơ nitron (poliacrilonitrile).',
      ] },
      { h: 'Cao su' },
      { p: 'Cao su thiên nhiên là polyisoprene, mắt xích từ isoprene (2-methylbuta-1,3-diene), cấu hình cis. Cao su tổng hợp: cao su buna (từ buta-1,3-diene), cao su buna-S, buna-N.' },
      { note: 'Lưu hoá cao su: trộn cao su với lưu huỳnh và đun nóng tạo cầu nối -S-S- giữa các mạch -> cao su bền, đàn hồi và chịu nhiệt tốt hơn.' },
    ],
    examples: [
      { q: 'Phân loại các tơ sau: tơ tằm, nylon-6,6, tơ visco.', a: 'Tơ tằm là tơ thiên nhiên (protein). Nylon-6,6 là tơ tổng hợp (poliamide). Tơ visco là tơ bán tổng hợp (chế từ cellulose).' },
      { q: 'Polymer nào dùng làm ống nước, áo mưa? Viết công thức mắt xích.', a: 'Đó là PVC. Mắt xích: (-CH2-CHCl-)n. PVC bền, cách điện, chịu hoá chất nên dùng làm ống nước và vỏ dây điện.' },
    ],
  },

  'H12HOA-w11-quiz': {
    topic: 'Đại cương kim loại — Cấu tạo và tính chất',
    intro: 'Các em thân mến, kim loại chiếm phần lớn bảng tuần hoàn và có vai trò to lớn trong đời sống. Tuần này thầy giúp các em hiểu vì sao kim loại có tính khử và dãy điện hoá kim loại.',
    objectives: [
      'Nêu được đặc điểm cấu tạo và tính chất vật lí chung của kim loại.',
      'Giải thích được tính chất hoá học đặc trưng: tính khử.',
      'Sử dụng được dãy điện hoá để dự đoán phản ứng.',
    ],
    theory: [
      { h: 'Cấu tạo và tính chất vật lí' },
      { p: 'Nguyên tử kim loại thường có 1-3 electron ở lớp ngoài cùng, dễ nhường electron. Trong tinh thể kim loại có các electron tự do nên kim loại có tính dẻo, dẫn điện, dẫn nhiệt tốt và có ánh kim.' },
      { h: 'Tính chất hoá học: tính khử' },
      { p: 'Tính chất hoá học đặc trưng của kim loại là tính khử: M -> M(n+) + ne. Kim loại tác dụng với phi kim, với acid, với nước, với dung dịch muối.' },
      { h: 'Dãy điện hoá kim loại' },
      { ul: [
        'Sắp xếp theo chiều tăng dần tính oxi hoá của ion và giảm dần tính khử của kim loại.',
        'Kim loại đứng trước có tính khử mạnh hơn, ion của nó có tính oxi hoá yếu hơn.',
        'Quy tắc alpha: kim loại mạnh hơn khử được ion của kim loại yếu hơn ra khỏi dung dịch muối.',
      ] },
      { note: 'Một phần dãy điện hoá cần nhớ (tính khử giảm dần): K, Na, Mg, Al, Zn, Fe, Ni, Sn, Pb, H, Cu, Ag, Au.' },
    ],
    examples: [
      { q: 'Vì sao Fe phản ứng được với dung dịch CuSO4 còn Cu thì không phản ứng với dung dịch FeSO4?', a: 'Fe đứng trước Cu trong dãy điện hoá (Fe khử mạnh hơn) nên Fe khử được Cu2+: Fe + CuSO4 -> FeSO4 + Cu. Ngược lại Cu đứng sau Fe nên không khử được Fe2+, không phản ứng.' },
      { q: 'Sắp xếp tính khử tăng dần: Ag, Cu, Fe, Zn.', a: 'Theo dãy điện hoá Zn > Fe > Cu > Ag (tính khử giảm dần), nên tính khử tăng dần là: Ag < Cu < Fe < Zn.' },
    ],
  },

  'H12HOA-w12-quiz': {
    topic: 'Ăn mòn kim loại và điện phân',
    intro: 'Các em ơi, sắt để lâu bị gỉ, đó là sự ăn mòn. Tuần này thầy giúp các em phân biệt các kiểu ăn mòn, cách chống ăn mòn và học về điện phân.',
    objectives: [
      'Phân biệt được ăn mòn hoá học và ăn mòn điện hoá.',
      'Nêu được các phương pháp chống ăn mòn.',
      'Viết được quá trình điện phân và áp dụng định luật Faraday.',
    ],
    theory: [
      { h: 'Sự ăn mòn kim loại' },
      { p: 'Ăn mòn kim loại là sự phá huỷ kim loại do tác dụng của môi trường, trong đó kim loại bị oxi hoá: M -> M(n+) + ne.' },
      { ul: [
        'Ăn mòn hoá học: kim loại phản ứng trực tiếp với chất trong môi trường, không phát sinh dòng điện.',
        'Ăn mòn điện hoá: hình thành cặp điện cực (pin), có dòng electron di chuyển, xảy ra nhanh và phổ biến hơn (vd gỉ sắt trong không khí ẩm).',
      ] },
      { h: 'Chống ăn mòn' },
      { p: 'Các phương pháp: phủ bề mặt (sơn, mạ, tráng men, bôi dầu mỡ); chế tạo hợp kim không gỉ (inox); dùng phương pháp điện hoá (anode hi sinh — gắn kim loại mạnh hơn như Zn để bảo vệ Fe).' },
      { h: 'Điện phân' },
      { p: 'Điện phân là quá trình oxi hoá - khử xảy ra dưới tác dụng dòng điện một chiều. Tại cathode (-) xảy ra khử, tại anode (+) xảy ra oxi hoá. Ví dụ điện phân nóng chảy NaCl: cathode Na+ + e -> Na; anode 2Cl- -> Cl2 + 2e.' },
      { note: 'Định luật Faraday: m = (A . I . t) / (n . F), với F = 96500 C/mol, A là khối lượng mol, n là số electron trao đổi, I là cường độ dòng (A), t là thời gian (giây).' },
    ],
    examples: [
      { q: 'Tính khối lượng Cu bám vào cathode khi điện phân dung dịch CuSO4 với I = 5A trong 1930 giây.', a: 'Cu2+ + 2e -> Cu nên n = 2, A = 64. m = (64 . 5 . 1930)/(2 . 96500) = 617600/193000 ≈ 3,2 g.' },
      { q: 'Vì sao gắn lá kẽm vào vỏ tàu biển bằng thép giúp chống gỉ?', a: 'Zn có tính khử mạnh hơn Fe nên trong môi trường nước biển, Zn bị oxi hoá (ăn mòn) thay cho Fe. Đây là phương pháp anode hi sinh bảo vệ vỏ tàu.' },
    ],
  },

  'H12HOA-w13-quiz': {
    topic: 'Điều chế kim loại',
    intro: 'Các em thân mến, kim loại tồn tại trong tự nhiên chủ yếu dưới dạng hợp chất. Tuần này thầy giúp các em hiểu ba phương pháp tách kim loại ra khỏi hợp chất.',
    objectives: [
      'Nêu được nguyên tắc chung của điều chế kim loại.',
      'Phân biệt được ba phương pháp: thuỷ luyện, nhiệt luyện, điện phân.',
      'Lựa chọn được phương pháp phù hợp với mỗi kim loại.',
    ],
    theory: [
      { h: 'Nguyên tắc' },
      { p: 'Điều chế kim loại là khử ion kim loại thành kim loại tự do: M(n+) + ne -> M. Tuỳ độ hoạt động của kim loại mà chọn phương pháp khác nhau.' },
      { h: 'Ba phương pháp' },
      { ul: [
        'Thuỷ luyện: dùng kim loại mạnh hơn đẩy kim loại yếu ra khỏi dung dịch muối. Áp dụng cho kim loại yếu (sau Mg). Vd Fe + CuSO4 -> FeSO4 + Cu.',
        'Nhiệt luyện: dùng chất khử (C, CO, H2, Al) khử oxide kim loại ở nhiệt độ cao. Áp dụng cho kim loại trung bình (Zn, Fe, Sn, Pb...). Vd Fe2O3 + 3CO -> 2Fe + 3CO2.',
        'Điện phân: điện phân nóng chảy hợp chất để điều chế kim loại hoạt động mạnh (K, Na, Ca, Mg, Al); điện phân dung dịch cho kim loại trung bình, yếu.',
      ] },
      { h: 'Sản xuất nhôm' },
      { p: 'Nhôm được sản xuất bằng điện phân Al2O3 nóng chảy, có thêm cryolite Na3AlF6 để hạ nhiệt độ nóng chảy và tăng độ dẫn điện: 2Al2O3 -> 4Al + 3O2.' },
      { note: 'Kim loại càng mạnh càng khó khử nên phải dùng điện phân nóng chảy; kim loại trung bình dùng nhiệt luyện; kim loại yếu có thể thuỷ luyện.' },
    ],
    examples: [
      { q: 'Tính khối lượng Al thu được khi điện phân 102 g Al2O3 (hiệu suất 100%).', a: 'n(Al2O3) = 102/102 = 1 mol. 2Al2O3 -> 4Al + 3O2 nên n(Al) = 2 mol -> m(Al) = 2 . 27 = 54 g.' },
      { q: 'Nên dùng phương pháp nào để điều chế Na, Fe, Cu?', a: 'Na (kim loại mạnh) -> điện phân nóng chảy NaCl. Fe (trung bình) -> nhiệt luyện (CO khử Fe2O3). Cu (yếu) -> thuỷ luyện hoặc nhiệt luyện đều được.' },
    ],
  },

  'H12HOA-w14-quiz': {
    topic: 'Kim loại kiềm — Natri, Kali',
    intro: 'Các em ơi, kim loại kiềm như Na, K hoạt động cực mạnh, có thể bốc cháy khi gặp nước. Tuần này thầy giúp các em hiểu tính chất và cách bảo quản chúng.',
    objectives: [
      'Nêu được cấu hình electron và tính chất của kim loại kiềm (nhóm IA).',
      'Viết được phản ứng của Na với nước, oxygen.',
      'Biết ứng dụng và cách sản xuất NaOH.',
    ],
    theory: [
      { h: 'Đặc điểm nhóm IA' },
      { p: 'Kim loại kiềm gồm Li, Na, K, Rb, Cs, có 1 electron ở lớp ngoài cùng (cấu hình ns1). Rất dễ nhường 1 electron nên có tính khử rất mạnh — mạnh nhất trong các kim loại.' },
      { h: 'Tính chất hoá học' },
      { ul: [
        'Tác dụng với nước: 2Na + 2H2O -> 2NaOH + H2 (phản ứng mãnh liệt, toả nhiệt).',
        'Tác dụng với oxygen: 4Na + O2 -> 2Na2O (hoặc tạo peroxide Na2O2 khi dư O2).',
        'Tác dụng với phi kim khác (Cl2, S...).',
      ] },
      { h: 'Bảo quản và ứng dụng' },
      { p: 'Vì rất hoạt động (dễ phản ứng với O2, hơi nước trong không khí) nên kim loại kiềm được bảo quản bằng cách ngâm trong dầu hoả. NaOH (xút ăn da) dùng trong công nghiệp xà phòng, giấy, dệt, xử lí dầu mỡ.' },
      { note: 'Sản xuất NaOH: điện phân dung dịch NaCl có màng ngăn: 2NaCl + 2H2O -> 2NaOH + H2 + Cl2.' },
    ],
    examples: [
      { q: 'Cho 4,6 g Na vào nước dư. Tính thể tích H2 (đktc) thu được.', a: 'n(Na) = 4,6/23 = 0,2 mol. 2Na + 2H2O -> 2NaOH + H2 nên n(H2) = 0,1 mol -> V = 0,1 . 22,4 = 2,24 lít.' },
      { q: 'Vì sao phải bảo quản kim loại Na trong dầu hoả?', a: 'Na rất hoạt động, dễ phản ứng với O2 và hơi nước trong không khí (có thể tự bốc cháy). Ngâm trong dầu hoả ngăn Na tiếp xúc không khí ẩm nên bảo quản an toàn.' },
    ],
  },

  'H12HOA-w15-quiz': {
    topic: 'Kim loại kiềm thổ — Calcium, Magnesium',
    intro: 'Các em thân mến, calcium có trong xương, đá vôi, magnesium trong pháo sáng. Tuần này thầy giúp các em hiểu kim loại kiềm thổ và vấn đề nước cứng.',
    objectives: [
      'Nêu được cấu hình và tính chất của kim loại kiềm thổ (nhóm IIA).',
      'Giải thích được nước cứng và cách làm mềm nước.',
      'Biết ứng dụng của CaO, CaCO3, Ca(OH)2.',
    ],
    theory: [
      { h: 'Đặc điểm nhóm IIA' },
      { p: 'Kim loại kiềm thổ gồm Be, Mg, Ca, Sr, Ba, có 2 electron lớp ngoài cùng (cấu hình ns2). Tính khử mạnh (yếu hơn kim loại kiềm cùng chu kì). Ví dụ: Ca + 2H2O -> Ca(OH)2 + H2.' },
      { h: 'Hợp chất quan trọng của calcium' },
      { ul: [
        'CaO (vôi sống): CaO + H2O -> Ca(OH)2 (toả nhiệt mạnh, gọi là tôi vôi).',
        'Ca(OH)2 (vôi tôi): base mạnh, dùng trong xây dựng, xử lí nước.',
        'CaCO3 (đá vôi): nguyên liệu sản xuất xi măng, vôi sống; nung tạo CaO + CO2.',
      ] },
      { h: 'Nước cứng' },
      { p: 'Nước cứng chứa nhiều ion Ca2+ và Mg2+. Tác hại: tạo cặn trong ấm đun, đường ống; làm giảm tác dụng của xà phòng.' },
      { ul: [
        'Nước cứng tạm thời (chứa HCO3-): đun sôi để loại bỏ — Ca(HCO3)2 -> CaCO3 + CO2 + H2O.',
        'Nước cứng vĩnh cửu (chứa Cl-, SO4 2-): dùng Na2CO3 hoặc Na3PO4 để kết tủa Ca2+, Mg2+.',
      ] },
      { note: 'Mẹo nhớ: nước cứng tạm thời "tạm" loại được bằng đun sôi; nước cứng vĩnh cửu phải dùng hoá chất kết tủa.' },
    ],
    examples: [
      { q: 'Viết phương trình làm mềm nước cứng tạm thời bằng cách đun sôi.', a: 'Ca(HCO3)2 -> CaCO3 (kết tủa) + CO2 + H2O. Khi đun sôi, ion HCO3- phân huỷ làm Ca2+ kết tủa dưới dạng CaCO3, nước trở nên mềm.' },
      { q: 'Viết phản ứng nung đá vôi và tôi vôi.', a: 'Nung đá vôi: CaCO3 -> CaO + CO2. Tôi vôi: CaO + H2O -> Ca(OH)2 (toả nhiệt mạnh).' },
    ],
  },

  'H12HOA-w16-quiz': {
    topic: 'Nhôm (Al) và hợp kim',
    intro: 'Các em ơi, nhôm là kim loại nhẹ, bền, được dùng làm máy bay, nồi, khung cửa. Tuần này thầy giúp các em hiểu vì sao nhôm vừa phản ứng với acid vừa phản ứng với base.',
    objectives: [
      'Nêu được vị trí, cấu hình và tính chất của nhôm.',
      'Giải thích được tính lưỡng tính (phản ứng với acid và base).',
      'Viết được phản ứng nhiệt nhôm và biết phèn chua.',
    ],
    theory: [
      { h: 'Vị trí và cấu tạo' },
      { p: 'Nhôm Al có Z = 13, thuộc nhóm IIIA, chu kì 3, cấu hình [Ne]3s2 3p1. Nhôm có tính khử mạnh (chỉ sau kim loại kiềm và kiềm thổ).' },
      { h: 'Tính chất hoá học' },
      { ul: [
        'Tác dụng với acid: 2Al + 6HCl -> 2AlCl3 + 3H2.',
        'Tác dụng với dung dịch base: 2Al + 2NaOH + 2H2O -> 2NaAlO2 + 3H2.',
        'Phản ứng nhiệt nhôm: 2Al + Fe2O3 -> Al2O3 + 2Fe (toả nhiệt rất mạnh, dùng hàn đường ray).',
      ] },
      { h: 'Lớp oxide bảo vệ' },
      { p: 'Nhôm bền trong không khí vì có lớp màng Al2O3 mỏng, đặc khít, bền, bao bọc ngăn nhôm bị oxi hoá tiếp. Nhờ vậy đồ nhôm khó bị gỉ.' },
      { note: 'Phèn chua KAl(SO4)2.12H2O dùng làm trong nước (Al3+ thuỷ phân tạo keo Al(OH)3 kéo cặn bẩn lắng xuống) và trong thuộc da, nhuộm vải.' },
    ],
    examples: [
      { q: 'Để hoà tan hoàn toàn 2,7 g Al cần bao nhiêu mol HCl?', a: 'n(Al) = 2,7/27 = 0,1 mol. 2Al + 6HCl -> 2AlCl3 + 3H2 nên n(HCl) = 3 . 0,1 = 0,3 mol.' },
      { q: 'Vì sao nhôm vừa tan trong dung dịch HCl vừa tan trong dung dịch NaOH?', a: 'Nhôm là kim loại có tính khử, tác dụng với HCl giải phóng H2. Đồng thời lớp Al2O3 và Al(OH)3 lưỡng tính nên nhôm cũng phản ứng với NaOH tạo NaAlO2 và H2.' },
    ],
  },

  'H12HOA-w17-quiz': {
    topic: 'Hợp chất của nhôm',
    intro: 'Các em thân mến, tuần này ta tìm hiểu sâu về Al2O3 và Al(OH)3 — hai hợp chất lưỡng tính tiêu biểu của nhôm, cùng quặng bauxite để sản xuất nhôm.',
    objectives: [
      'Nêu được tính lưỡng tính của Al2O3 và Al(OH)3.',
      'Viết được phản ứng của hợp chất nhôm với acid và base.',
      'Biết quặng bauxite và ứng dụng của nhôm.',
    ],
    theory: [
      { h: 'Aluminium oxide Al2O3' },
      { p: 'Al2O3 là oxide lưỡng tính, tan trong cả acid và base mạnh.' },
      { ul: [
        'Với acid: Al2O3 + 6HCl -> 2AlCl3 + 3H2O.',
        'Với base: Al2O3 + 2NaOH -> 2NaAlO2 + H2O.',
      ] },
      { h: 'Aluminium hydroxide Al(OH)3' },
      { p: 'Al(OH)3 là hydroxide lưỡng tính, kết tủa keo màu trắng.' },
      { ul: [
        'Thể hiện tính base: Al(OH)3 + 3HCl -> AlCl3 + 3H2O.',
        'Thể hiện tính acid: Al(OH)3 + NaOH -> NaAlO2 + 2H2O.',
      ] },
      { h: 'Quặng và ứng dụng' },
      { p: 'Quặng bauxite Al2O3.nH2O là nguyên liệu chính sản xuất nhôm. Nhôm nhẹ, dẫn điện, dẫn nhiệt tốt, bền nên dùng làm vật liệu xây dựng, đồ gia dụng, dây dẫn điện, chế tạo máy bay (hợp kim duralumin).' },
      { note: 'Cả Al2O3 và Al(OH)3 đều lưỡng tính nên là dấu hiệu đặc trưng để phân biệt nhôm với nhiều kim loại khác.' },
    ],
    examples: [
      { q: 'Viết hai phương trình chứng minh Al(OH)3 có tính lưỡng tính.', a: 'Tính base: Al(OH)3 + 3HCl -> AlCl3 + 3H2O. Tính acid: Al(OH)3 + NaOH -> NaAlO2 + 2H2O. Tan được trong cả acid và base nên Al(OH)3 lưỡng tính.' },
      { q: 'Cho từ từ NaOH đến dư vào dung dịch AlCl3 thì có hiện tượng gì?', a: 'Ban đầu xuất hiện kết tủa keo trắng Al(OH)3: AlCl3 + 3NaOH -> Al(OH)3 + 3NaCl. Khi NaOH dư, kết tủa tan dần: Al(OH)3 + NaOH -> NaAlO2 + 2H2O.' },
    ],
  },

  'H12HOA-w18-quiz': {
    topic: 'Ôn tập học kì 1 — Kiểm tra giữa kì',
    intro: 'Các em ơi, ta đã đi hết nửa chương trình. Tuần này thầy hệ thống lại các chủ đề ester - lipid, carbohydrate, hợp chất nitrogen, polymer và kim loại để các em ôn tập.',
    objectives: [
      'Hệ thống được kiến thức hữu cơ: ester, carbohydrate, amine, amino acid, protein, polymer.',
      'Hệ thống được đại cương kim loại và nhôm.',
      'Vận dụng giải các bài tập tổng hợp học kì 1.',
    ],
    theory: [
      { h: 'Hợp chất hữu cơ trọng tâm' },
      { ul: [
        'Ester RCOOR\': thuỷ phân acid (thuận nghịch), xà phòng hoá (một chiều).',
        'Chất béo: triester của glycerol; xà phòng hoá tạo muối acid béo + glycerol.',
        'Glucose: tráng bạc, hoà tan Cu(OH)2, lên men rượu.',
        'Saccharose không tráng bạc; tinh bột nhận biết bằng I2.',
      ] },
      { h: 'Hợp chất chứa nitrogen' },
      { p: 'Amine có tính base (amine béo > NH3 > aniline). Amino acid lưỡng tính. Protein nhận biết bằng phản ứng biuret (màu tím).' },
      { h: 'Kim loại' },
      { ul: [
        'Tính chất chung: tính khử; dùng dãy điện hoá dự đoán phản ứng.',
        'Điều chế: thuỷ luyện, nhiệt luyện, điện phân.',
        'Nhôm và hợp chất nhôm lưỡng tính.',
      ] },
      { note: 'Khi ôn nên lập bảng so sánh tính chất các chất và nhớ phương trình quan trọng để làm nhanh bài tập trắc nghiệm.' },
    ],
    examples: [
      { q: 'Sản xuất Al được thực hiện bằng phương pháp nào? Viết phương trình.', a: 'Điện phân Al2O3 nóng chảy (có cryolite): 2Al2O3 -> 4Al + 3O2. Không dùng nhiệt luyện hay thuỷ luyện vì Al là kim loại hoạt động mạnh.' },
      { q: 'So sánh phản ứng thuỷ phân ester trong môi trường acid và base.', a: 'Trong acid: thuận nghịch, tạo lại acid + alcohol (RCOOR\' + H2O thuận nghịch RCOOH + R\'OH). Trong base: một chiều (xà phòng hoá), tạo muối + alcohol (RCOOR\' + NaOH -> RCOONa + R\'OH).' },
    ],
  },

  'H12HOA-w19-quiz': {
    topic: 'Sắt (Fe) — Tính chất và hợp chất',
    intro: 'Chào các em học kì 2! Sắt là kim loại quan trọng nhất trong công nghiệp. Tuần này thầy giúp các em hiểu vì sao sắt có hai hoá trị và các hợp chất đặc trưng của nó.',
    objectives: [
      'Nêu được cấu hình electron và tính chất của sắt.',
      'Viết được phản ứng của Fe với acid, phân biệt Fe2+ và Fe3+.',
      'Biết hiện tượng thụ động hoá của sắt.',
    ],
    theory: [
      { h: 'Cấu tạo của sắt' },
      { p: 'Fe có Z = 26, cấu hình [Ar]3d6 4s2. Khi phản ứng, Fe có thể nhường 2 electron tạo Fe2+ hoặc nhường 3 electron tạo Fe3+ tuỳ chất oxi hoá.' },
      { h: 'Tính chất hoá học' },
      { ul: [
        'Với acid loãng (HCl, H2SO4 loãng) tạo Fe2+: Fe + 2HCl -> FeCl2 + H2.',
        'Với chất oxi hoá mạnh (HNO3, H2SO4 đặc nóng) tạo Fe3+: Fe + 6HNO3 đặc nóng -> Fe(NO3)3 + 3NO2 + 3H2O.',
        'Thụ động hoá: Fe không phản ứng với HNO3 đặc nguội và H2SO4 đặc nguội (tạo lớp oxide bảo vệ).',
      ] },
      { h: 'Hợp chất của sắt' },
      { ul: [
        'Hợp chất Fe2+ (FeO đen, FeCl2 lục nhạt): vừa có tính khử vừa có tính oxi hoá.',
        'Hợp chất Fe3+ (Fe2O3 đỏ, Fe(OH)3 nâu đỏ): có tính oxi hoá.',
      ] },
      { note: 'Vì có thể thụ động hoá nên có thể dùng bình bằng sắt (thép) để đựng và chuyên chở HNO3 đặc nguội, H2SO4 đặc nguội.' },
    ],
    examples: [
      { q: 'Cho 5,6 g Fe vào dung dịch HCl dư. Tính khối lượng muối thu được.', a: 'n(Fe) = 5,6/56 = 0,1 mol. Fe + 2HCl -> FeCl2 + H2 nên n(FeCl2) = 0,1 mol -> m = 0,1 . 127 = 12,7 g.' },
      { q: 'Vì sao Fe tác dụng HCl loãng tạo Fe2+ nhưng tác dụng HNO3 đặc nóng lại tạo Fe3+?', a: 'HCl loãng là acid yếu về oxi hoá, chỉ oxi hoá Fe lên Fe2+. HNO3 đặc nóng có tính oxi hoá mạnh nên oxi hoá Fe lên mức cao nhất Fe3+.' },
    ],
  },

  'H12HOA-w20-quiz': {
    topic: 'Sắt — Sản xuất gang, thép',
    intro: 'Các em thân mến, gang và thép là vật liệu xương sống của ngành xây dựng. Tuần này thầy giúp các em hiểu cách luyện gang trong lò cao và luyện thép.',
    objectives: [
      'Phân biệt được gang và thép theo hàm lượng carbon.',
      'Nêu được nguyên liệu và phản ứng chính trong lò cao.',
      'Biết các quặng sắt thường gặp.',
    ],
    theory: [
      { h: 'Gang và thép' },
      { ul: [
        'Gang: hợp kim Fe-C với hàm lượng C từ 2% đến 5%. Cứng, giòn, dùng đúc.',
        'Thép: hợp kim Fe-C với hàm lượng C từ 0,01% đến 2%. Dẻo, bền, dùng làm kết cấu, dụng cụ.',
      ] },
      { h: 'Quặng sắt' },
      { ul: [
        'Hematite Fe2O3 (đỏ) khoảng 70% Fe.',
        'Magnetite Fe3O4 (đen) khoảng 72% Fe — giàu nhất.',
        'Siderite FeCO3, pyrite FeS2.',
      ] },
      { h: 'Sản xuất gang trong lò cao' },
      { p: 'Nguyên liệu: quặng sắt + than cốc + đá vôi (chất chảy). Than cốc cháy tạo CO, CO khử oxide sắt: Fe2O3 + 3CO -> 2Fe + 3CO2. Đá vôi loại tạp chất tạo xỉ.' },
      { h: 'Luyện thép' },
      { p: 'Thổi khí O2 vào gang nóng chảy để oxi hoá bớt C, Si, S, P -> giảm hàm lượng carbon -> thu được thép.' },
      { note: 'Mẹo nhớ: gang nhiều carbon hơn thép nên giòn; thép ít carbon hơn nên dẻo và bền.' },
    ],
    examples: [
      { q: 'Viết phản ứng chính khử oxide sắt trong lò cao.', a: 'Fe2O3 + 3CO -> 2Fe + 3CO2. CO sinh ra từ quá trình cháy than cốc khử Fe2O3 thành Fe lỏng. Đây là phản ứng chính tạo gang.' },
      { q: 'Quặng nào giàu sắt nhất trong các quặng thường gặp?', a: 'Magnetite Fe3O4 giàu sắt nhất (khoảng 72%), tiếp đến là hematite Fe2O3 (khoảng 70%).' },
    ],
  },

  'H12HOA-w21-quiz': {
    topic: 'Chromium (Cr) và hợp chất',
    intro: 'Các em ơi, chromium tạo nên lớp mạ sáng bóng và thép không gỉ inox. Tuần này thầy giúp các em hiểu các trạng thái oxi hoá và hợp chất màu sắc của chromium.',
    objectives: [
      'Nêu được cấu hình bất thường của chromium.',
      'Phân biệt được màu sắc và tính chất của hợp chất Cr(VI).',
      'Biết tính lưỡng tính của Cr(OH)3 và ứng dụng inox.',
    ],
    theory: [
      { h: 'Cấu tạo chromium' },
      { p: 'Cr có Z = 24, cấu hình [Ar]3d5 4s1 (bất thường — cấu hình bán bão hoà 3d5 bền hơn). Chromium có nhiều số oxi hoá, phổ biến là +2, +3, +6.' },
      { h: 'Hợp chất Cr(VI)' },
      { ul: [
        'K2CrO4 (chromate) màu vàng; K2Cr2O7 (dichromate) màu da cam.',
        'Cân bằng chuyển hoá: 2CrO4(2-) + 2H+ thuận nghịch Cr2O7(2-) + H2O. Môi trường acid chuyển sang dichromate (da cam), môi trường base chuyển sang chromate (vàng).',
        'Hợp chất Cr(VI) có tính oxi hoá mạnh.',
      ] },
      { h: 'Hợp chất Cr(III)' },
      { p: 'Cr(OH)3 là hydroxide lưỡng tính, tan trong cả acid và base mạnh (giống Al(OH)3). Cr2O3 cũng lưỡng tính.' },
      { h: 'Ứng dụng' },
      { p: 'Thép không gỉ (inox) chứa Fe + khoảng 18% Cr + 8% Ni. Lớp Cr2O3 mỏng bảo vệ thép khỏi ăn mòn.' },
      { note: 'Nhớ màu: chromate vàng (môi trường base), dichromate da cam (môi trường acid). K2Cr2O7 là chất oxi hoá mạnh thường gặp.' },
    ],
    examples: [
      { q: 'Khi thêm acid vào dung dịch K2CrO4 màu vàng thì có hiện tượng gì?', a: 'Dung dịch chuyển sang màu da cam: 2CrO4(2-) + 2H+ -> Cr2O7(2-) + H2O. Acid làm cân bằng chuyển sang dichromate (Cr2O7 2-) màu da cam.' },
      { q: 'Vì sao thép không gỉ inox bền với môi trường?', a: 'Inox chứa khoảng 18% Cr; chromium tạo lớp oxide Cr2O3 mỏng, đặc khít, bám chắc trên bề mặt, ngăn không khí và hơi ẩm tiếp xúc nên chống ăn mòn.' },
    ],
  },

  'H12HOA-w22-quiz': {
    topic: 'Copper (Cu) và hợp chất',
    intro: 'Các em thân mến, đồng là kim loại dẫn điện tốt, làm dây điện, đồ mỹ nghệ. Tuần này thầy giúp các em hiểu tính chất của đồng và màu sắc đặc trưng của hợp chất đồng.',
    objectives: [
      'Nêu được cấu hình bất thường và tính chất của đồng.',
      'Viết được phản ứng của Cu với HNO3.',
      'Biết màu sắc CuSO4 khan/ngậm nước và phức của Cu.',
    ],
    theory: [
      { h: 'Cấu tạo đồng' },
      { p: 'Cu có Z = 29, cấu hình [Ar]3d10 4s1 (bất thường — cấu hình d10 bão hoà bền hơn). Đồng là kim loại hoạt động yếu, đứng sau H trong dãy điện hoá.' },
      { h: 'Tính chất hoá học' },
      { ul: [
        'Không phản ứng với HCl, H2SO4 loãng (đứng sau H).',
        'Phản ứng với acid có tính oxi hoá mạnh: 3Cu + 8HNO3 loãng -> 3Cu(NO3)2 + 2NO + 4H2O; Cu + 4HNO3 đặc -> Cu(NO3)2 + 2NO2 + 2H2O.',
      ] },
      { h: 'Hợp chất của đồng' },
      { ul: [
        'CuSO4 khan màu trắng; CuSO4.5H2O màu xanh lam (dùng nhận biết nước, hút ẩm).',
        'Cu(OH)2 màu xanh, tan trong dung dịch NH3 tạo phức xanh thẫm [Cu(NH3)4](OH)2.',
        'CuO màu đen, Cu2O màu đỏ gạch.',
      ] },
      { h: 'Hợp kim và ứng dụng' },
      { p: 'Đồng dẫn điện rất tốt (chỉ sau bạc) nên dùng làm dây điện. Hợp kim: đồng + thiếc = bronze (đồng đỏ); đồng + kẽm = brass (đồng thau).' },
      { note: 'Dùng CuSO4 khan màu trắng để nhận biết nước: gặp nước chuyển sang xanh lam (tạo CuSO4.5H2O).' },
    ],
    examples: [
      { q: 'Cho 6,4 g Cu vào HNO3 đặc, nóng, dư. Tính thể tích NO2 (đktc).', a: 'n(Cu) = 6,4/64 = 0,1 mol. Cu + 4HNO3 đặc -> Cu(NO3)2 + 2NO2 + 2H2O nên n(NO2) = 0,2 mol -> V = 0,2 . 22,4 = 4,48 lít.' },
      { q: 'Vì sao CuSO4 khan dùng để phát hiện nước trong ethanol?', a: 'CuSO4 khan màu trắng, khi gặp nước tạo CuSO4.5H2O màu xanh lam. Nếu cho CuSO4 khan vào ethanol mà chuyển xanh thì chứng tỏ ethanol có lẫn nước.' },
    ],
  },

  'H12HOA-w23-quiz': {
    topic: 'Nhận biết một số chất vô cơ',
    intro: 'Các em ơi, làm thí nghiệm hoá học cần biết "đọc tên" các chất qua dấu hiệu đặc trưng. Tuần này thầy giúp các em nắm các thuốc thử nhận biết ion và khí vô cơ.',
    objectives: [
      'Nhận biết được các anion Cl-, SO4 2- bằng thuốc thử.',
      'Nhận biết được các khí CO2, NH3.',
      'Nhận biết được các cation Fe2+, Fe3+.',
    ],
    theory: [
      { h: 'Nhận biết anion' },
      { ul: [
        'Cl-: dùng AgNO3 -> kết tủa trắng AgCl, không tan trong HNO3.',
        'SO4(2-): dùng BaCl2 -> kết tủa trắng BaSO4, không tan trong acid.',
      ] },
      { h: 'Nhận biết khí' },
      { ul: [
        'CO2: dẫn qua nước vôi trong Ca(OH)2 -> vẩn đục (CaCO3).',
        'NH3: có mùi khai, làm quỳ tím ẩm hoá xanh.',
      ] },
      { h: 'Nhận biết cation sắt' },
      { ul: [
        'Fe2+: dùng NaOH -> kết tủa Fe(OH)2 trắng xanh, để ngoài không khí hoá nâu đỏ: 4Fe(OH)2 + O2 + 2H2O -> 4Fe(OH)3.',
        'Fe3+: dùng NaOH -> kết tủa Fe(OH)3 nâu đỏ; hoặc dùng KSCN -> dung dịch màu đỏ máu (nhạy hơn).',
      ] },
      { note: 'Ghi nhớ: AgCl, BaSO4 đều là kết tủa trắng không tan trong acid — dùng phân biệt ion halide và sulfate.' },
    ],
    examples: [
      { q: 'Trình bày cách nhận biết hai dung dịch NaCl và Na2SO4.', a: 'Cho dung dịch BaCl2 vào hai mẫu: mẫu tạo kết tủa trắng BaSO4 (không tan trong HCl) là Na2SO4; mẫu không hiện tượng là NaCl. Hoặc dùng AgNO3: NaCl tạo AgCl trắng.' },
      { q: 'Nêu hiện tượng khi nhỏ NaOH vào dung dịch FeCl2 rồi để trong không khí.', a: 'Ban đầu tạo kết tủa trắng xanh Fe(OH)2: FeCl2 + 2NaOH -> Fe(OH)2 + 2NaCl. Để ngoài không khí, kết tủa hoá nâu đỏ: 4Fe(OH)2 + O2 + 2H2O -> 4Fe(OH)3.' },
    ],
  },

  'H12HOA-w24-quiz': {
    topic: 'Nhận biết một số chất hữu cơ',
    intro: 'Các em thân mến, tiếp nối tuần trước, hôm nay ta học cách nhận biết các chất hữu cơ thường gặp như glucose, tinh bột, aniline, protein.',
    objectives: [
      'Nhận biết được glucose, tinh bột bằng thuốc thử đặc trưng.',
      'Nhận biết được aniline và protein.',
      'Phân biệt được các chất hữu cơ có nhóm chức khác nhau.',
    ],
    theory: [
      { h: 'Nhận biết carbohydrate' },
      { ul: [
        'Glucose: phản ứng tráng bạc (AgNO3/NH3 -> Ag); hoặc hoà tan Cu(OH)2 ở nhiệt độ thường tạo dung dịch xanh lam.',
        'Tinh bột: dùng dung dịch I2 -> màu xanh tím.',
      ] },
      { h: 'Nhận biết hợp chất nitrogen' },
      { ul: [
        'Aniline C6H5NH2: dùng nước bromine -> kết tủa trắng 2,4,6-tribromoaniline.',
        'Protein (có nhiều liên kết peptide): phản ứng biuret với Cu(OH)2 -> màu tím; hoặc đun nóng -> đông tụ.',
      ] },
      { h: 'Phân biệt một số chất quen thuộc' },
      { ul: [
        'Phenol và ethanol: phenol + nước bromine -> kết tủa trắng; ethanol không phản ứng.',
        'Acid acetic và ethanol: acid acetic làm quỳ tím hoá đỏ; ethanol không đổi màu quỳ.',
      ] },
      { note: 'Mẹo: nước bromine vừa nhận biết aniline (kết tủa trắng tribromoaniline) vừa nhận biết phenol (kết tủa trắng tribromophenol).' },
    ],
    examples: [
      { q: 'Trình bày cách phân biệt glucose và saccharose.', a: 'Dùng thuốc thử tráng bạc AgNO3/NH3: glucose có nhóm -CHO nên tạo kết tủa Ag; saccharose không có nhóm -CHO tự do nên không tráng bạc. Vậy mẫu tạo Ag là glucose.' },
      { q: 'Nhận biết aniline bằng phản ứng hoá học.', a: 'Cho aniline tác dụng với nước bromine: C6H5NH2 + 3Br2 -> C6H2Br3NH2 (kết tủa trắng) + 3HBr. Xuất hiện kết tủa trắng là dấu hiệu của aniline.' },
    ],
  },

  'H12HOA-w25-quiz': {
    topic: 'Hoá học và môi trường',
    intro: 'Các em ơi, hoá học không chỉ tạo ra vật chất mà còn liên quan tới sức khoẻ Trái Đất. Tuần này thầy giúp các em hiểu các vấn đề môi trường: hiệu ứng nhà kính, mưa acid, tầng ozone.',
    objectives: [
      'Nêu được nguyên nhân hiệu ứng nhà kính và mưa acid.',
      'Hiểu được vai trò tầng ozone và nguyên nhân suy giảm.',
      'Đề xuất được biện pháp giảm ô nhiễm môi trường.',
    ],
    theory: [
      { h: 'Hiệu ứng nhà kính' },
      { p: 'Các khí nhà kính (chủ yếu CO2, ngoài ra CH4, N2O, hơi nước) giữ nhiệt từ mặt đất bức xạ ra, làm Trái Đất ấm lên. Đốt nhiên liệu hoá thạch làm tăng CO2 -> biến đổi khí hậu.' },
      { h: 'Mưa acid' },
      { p: 'Khí thải SO2 và NOx (NO, NO2) từ đốt than, xăng dầu phản ứng với hơi nước tạo H2SO4, HNO3: SO2 + H2O -> H2SO3; 2SO2 + O2 -> 2SO3; SO3 + H2O -> H2SO4. Mưa acid phá hoại cây cối, công trình.' },
      { h: 'Tầng ozone' },
      { p: 'Tầng ozone (O3) ở tầng bình lưu hấp thụ tia tử ngoại UV nguy hiểm, bảo vệ sự sống. Khí CFC (chlorofluorocarbon) phá huỷ O3: dưới UV, CFC giải phóng Cl tự do, Cl + O3 -> ClO + O2.' },
      { note: 'Biện pháp bảo vệ môi trường: dùng năng lượng tái tạo, xử lí khí thải và nước thải, phân loại rác, hạn chế CFC, trồng cây xanh.' },
    ],
    examples: [
      { q: 'Viết phương trình giải thích sự hình thành mưa acid từ SO2.', a: 'SO2 + H2O -> H2SO3; hoặc 2SO2 + O2 -> 2SO3 rồi SO3 + H2O -> H2SO4. Acid sulfurous/sulfuric tan vào nước mưa tạo mưa acid.' },
      { q: 'Vì sao khí CFC gây thủng tầng ozone?', a: 'Dưới tia UV, CFC phân huỷ giải phóng nguyên tử Cl tự do. Cl phản ứng dây chuyền phá huỷ O3: Cl + O3 -> ClO + O2; ClO + O -> Cl + O2. Một nguyên tử Cl phá huỷ nhiều phân tử O3.' },
    ],
  },

  'H12HOA-w26-quiz': {
    topic: 'Ôn tập ester - lipid - carbohydrate',
    intro: 'Các em thân mến, ta bắt đầu chuỗi ôn tập để chuẩn bị thi tốt nghiệp. Tuần này thầy hệ thống lại ester, chất béo và carbohydrate cùng các dạng bài tập.',
    objectives: [
      'Hệ thống lại tính chất và phản ứng của ester, chất béo.',
      'Hệ thống lại carbohydrate: glucose, saccharose, tinh bột, cellulose.',
      'Vận dụng giải bài tập tính toán theo phương trình.',
    ],
    theory: [
      { h: 'Ester và chất béo' },
      { ul: [
        'Ester đơn chức + NaOH theo tỉ lệ 1:1, tạo muối + alcohol.',
        'Chất béo (triester) + 3NaOH -> 3 muối acid béo + glycerol; 1 mol chất béo cần 3 mol H2O khi thuỷ phân.',
        'Ester có gốc HCOO- (formate) khi thuỷ phân tạo HCOOH có nhóm -CHO -> tráng bạc.',
      ] },
      { h: 'Carbohydrate' },
      { ul: [
        'Glucose tráng bạc tạo 2 mol Ag từ 1 mol glucose; lên men tạo 2 mol C2H5OH + 2 mol CO2.',
        'Saccharose C12H22O11 (M = 342) không tráng bạc, thuỷ phân tạo glucose + fructose.',
        'Tinh bột (C6H10O5)n thuỷ phân tạo n mol glucose; nhận biết bằng I2.',
      ] },
      { h: 'Một số khối lượng mol cần nhớ' },
      { p: 'Glucose/fructose C6H12O6 (M = 180); saccharose C12H22O11 (M = 342); CH3COOC2H5 (M = 88); CH3COONa (M = 82); glycerol C3H5(OH)3 (M = 92). Nhớ M giúp tính nhanh.' },
      { note: 'Dạng bài hay gặp: tính khối lượng muối, glycerol khi xà phòng hoá; tính lượng Ag, CO2 từ glucose. Nhớ M của các chất quan trọng.' },
    ],
    examples: [
      { q: 'Xà phòng hoá hoàn toàn 1 mol triglyceride cần bao nhiêu mol NaOH và tạo bao nhiêu mol glycerol?', a: 'Triglyceride có 3 nhóm ester nên cần 3 mol NaOH, tạo ra 3 mol muối acid béo và 1 mol glycerol C3H5(OH)3.' },
      { q: 'Từ 1 mol glucose tráng bạc thu được bao nhiêu mol Ag?', a: 'Glucose có 1 nhóm -CHO, tham gia tráng bạc: 1 mol glucose -> 2 mol Ag. Phương trình rút gọn: CH2OH(CHOH)4CHO + 2[Ag(NH3)2]OH -> sản phẩm + 2Ag + ...' },
    ],
  },

  'H12HOA-w27-quiz': {
    topic: 'Ôn tập amine - amino acid - protein',
    intro: 'Các em ơi, tuần này thầy hệ thống lại hợp chất chứa nitrogen — chủ đề thường xuất hiện trong đề thi tốt nghiệp.',
    objectives: [
      'Hệ thống lại tính base của amine và so sánh độ mạnh.',
      'Hệ thống lại tính lưỡng tính của amino acid.',
      'Hệ thống lại tính chất và vai trò của protein.',
    ],
    theory: [
      { h: 'Amine' },
      { p: 'Tính base phụ thuộc gốc gắn vào N: gốc đẩy electron tăng tính base, gốc hút electron (vòng thơm) giảm. Thứ tự: amine béo > NH3 > aniline > diphenylamine. Amine + acid -> muối.' },
      { h: 'Amino acid' },
      { ul: [
        'Lưỡng tính: phản ứng với cả acid và base. Trong nước tồn tại dạng ion lưỡng cực.',
        'Số nhóm -COOH = số mol NaOH phản ứng / số mol amino acid; số nhóm -NH2 = số mol HCl / số mol amino acid.',
        'Có 20 amino acid chính, trong đó 9 amino acid thiết yếu phải lấy từ thức ăn.',
      ] },
      { h: 'Protein' },
      { p: 'Protein là polypeptide phân tử khối lớn. Thuỷ phân hoàn toàn tạo các amino acid. Nhận biết bằng phản ứng biuret (màu tím). Bị đông tụ khi đun nóng hoặc gặp acid, base, kim loại nặng.' },
      { note: 'Dạng bài: xác định số nhóm chức của amino acid qua phản ứng với HCl, NaOH; so sánh tính base; đếm số đồng phân amine.' },
    ],
    examples: [
      { q: 'Cho amino acid X phản ứng vừa đủ: 0,1 mol X cần 0,2 mol HCl và 0,1 mol NaOH. Xác định số nhóm NH2 và COOH.', a: 'Số nhóm NH2 = 0,2/0,1 = 2; số nhóm COOH = 0,1/0,1 = 1. Vậy X có 2 nhóm -NH2 và 1 nhóm -COOH (ví dụ lysine có công thức tương ứng).' },
      { q: 'Sắp xếp tính base tăng dần: (C6H5)2NH, C6H5NH2, NH3, CH3NH2.', a: 'Càng nhiều vòng benzene hút electron thì tính base càng yếu. Thứ tự tăng dần: (C6H5)2NH < C6H5NH2 < NH3 < CH3NH2.' },
    ],
  },

  'H12HOA-w28-quiz': {
    topic: 'Ôn tập polymer - vật liệu',
    intro: 'Các em thân mến, tuần này ta ôn tập polymer và vật liệu polymer — phân biệt rõ phương pháp điều chế và phân loại.',
    objectives: [
      'Hệ thống lại phương pháp trùng hợp và trùng ngưng.',
      'Phân loại được chất dẻo, tơ, cao su.',
      'Tính toán được bài tập về polymer.',
    ],
    theory: [
      { h: 'Phương pháp điều chế' },
      { ul: [
        'Trùng hợp (monome có liên kết bội): PE, PVC, PS, cao su buna, PMMA.',
        'Trùng ngưng (monome có >= 2 nhóm chức, tách phân tử nhỏ): nylon-6,6, tơ lapsan (PET), nhựa phenol-formaldehyde.',
      ] },
      { h: 'Phân loại vật liệu' },
      { ul: [
        'Chất dẻo: PE (túi, chai), PVC (ống nước), PS (xốp).',
        'Tơ thiên nhiên (tơ tằm, bông), bán tổng hợp (visco, acetate), tổng hợp (nylon, capron, nitron).',
        'Cao su thiên nhiên (polyisoprene), cao su tổng hợp (buna, buna-S, buna-N); lưu hoá tạo cầu nối -S-S-.',
      ] },
      { h: 'Tính toán' },
      { p: 'Trong trùng hợp, khối lượng được bảo toàn (m polymer = m monome khi hiệu suất 100%). Khối lượng mắt xích bằng khối lượng monome.' },
      { note: 'Phân biệt nhanh: nylon-6,6 và tơ lapsan là trùng ngưng; PE, PVC, PS, cao su buna là trùng hợp.' },
    ],
    examples: [
      { q: 'Trùng hợp hoàn toàn 280 g ethylene tạo bao nhiêu gam PE (hiệu suất 100%)?', a: 'Phản ứng trùng hợp không tách ra phân tử nhỏ nên khối lượng được bảo toàn: m(PE) = m(ethylene) = 280 g.' },
      { q: 'Trong các polymer: PE, PVC, nylon-6,6, cao su buna, chất nào điều chế bằng trùng ngưng?', a: 'Chỉ có nylon-6,6 điều chế bằng trùng ngưng (từ hexamethylenediamine + adipic acid, tách H2O). PE, PVC, cao su buna đều là trùng hợp.' },
    ],
  },

  'H12HOA-w29-quiz': {
    topic: 'Ôn tập kim loại — Đại cương và dãy điện hoá',
    intro: 'Các em ơi, tuần này ta ôn tập đại cương kim loại, đặc biệt là dãy điện hoá — công cụ quan trọng để dự đoán phản ứng và làm bài điện phân.',
    objectives: [
      'Sử dụng thành thạo dãy điện hoá dự đoán phản ứng.',
      'Áp dụng định luật Faraday trong điện phân.',
      'Giải bài tập kim loại tác dụng với dung dịch muối.',
    ],
    theory: [
      { h: 'Dãy điện hoá và quy tắc alpha' },
      { p: 'Dãy điện hoá: tính khử kim loại giảm dần, tính oxi hoá ion tăng dần. Quy tắc alpha: chất khử mạnh (kim loại đứng trước) phản ứng với chất oxi hoá mạnh (ion đứng sau) tạo chất khử yếu + chất oxi hoá yếu.' },
      { ul: [
        'Một phần dãy: K, Na, Mg, Al, Zn, Fe, Ni, Sn, Pb, H, Cu, Ag, Au.',
        'Kim loại trước đẩy được kim loại sau ra khỏi dung dịch muối: Fe + 2AgNO3 -> Fe(NO3)2 + 2Ag.',
        'Cu đứng sau Fe nên không khử được Fe2+.',
      ] },
      { h: 'Điện phân và định luật Faraday' },
      { p: 'm = (A . I . t)/(n . F) với F = 96500. Tại cathode khử (ion kim loại nhận electron), tại anode oxi hoá.' },
      { h: 'Chống ăn mòn' },
      { p: 'Anode hi sinh: dùng kim loại có tính khử mạnh hơn (Zn) gắn vào kim loại cần bảo vệ (Fe) để Zn bị oxi hoá thay.' },
      { note: 'Khi cho hỗn hợp kim loại vào dung dịch nhiều muối, kim loại mạnh nhất phản ứng với ion có tính oxi hoá mạnh nhất trước.' },
    ],
    examples: [
      { q: 'Điện phân dung dịch CuSO4 với điện cực trơ, I = 5A trong 1930 giây. Tính khối lượng Cu bám cathode.', a: 'Cu2+ + 2e -> Cu (n = 2, A = 64). m = (64 . 5 . 1930)/(2 . 96500) = 617600/193000 ≈ 3,2 g.' },
      { q: 'Cho Cu vào dung dịch Fe(NO3)2 có xảy ra phản ứng không? Giải thích.', a: 'Không. Cu đứng sau Fe trong dãy điện hoá nên Cu không khử được ion Fe2+. Do đó không có phản ứng xảy ra.' },
    ],
  },

  'H12HOA-w30-quiz': {
    topic: 'Ôn tập kim loại Na, Ca, Al, Fe',
    intro: 'Các em thân mến, tuần này ta ôn tập các kim loại điển hình Na, Ca, Al, Fe — luyện các dạng bài tính toán và nhận biết kim loại.',
    objectives: [
      'Hệ thống lại tính chất các kim loại Na, Ca, Al, Fe.',
      'Giải bài tập kim loại tác dụng với nước, acid, base.',
      'Nhận biết được hỗn hợp kim loại.',
    ],
    theory: [
      { h: 'Phản ứng với nước, acid, base' },
      { ul: [
        'Na, Ca tác dụng nước: 2Na + 2H2O -> 2NaOH + H2; Ca + 2H2O -> Ca(OH)2 + H2.',
        'Al, Fe tác dụng acid: 2Al + 6HCl -> 2AlCl3 + 3H2; Fe + 2HCl -> FeCl2 + H2.',
        'Al tan trong NaOH: 2Al + 2NaOH + 2H2O -> 2NaAlO2 + 3H2; Fe không tan trong NaOH.',
      ] },
      { h: 'Nhận biết kim loại' },
      { p: 'Dùng NaOH phân biệt Al (tan, sủi bọt H2) với Fe và Cu (không tan). Sau đó dùng HCl phân biệt Fe (tan, sủi bọt) với Cu (không tan).' },
      { h: 'Lưu ý tính toán' },
      { p: 'Tỉ lệ mol kim loại - khí H2: Na cho 1 H2 từ 2 Na; Al cho 3 H2 từ 2 Al; Fe cho 1 H2 từ 1 Fe. Tính theo phương trình hoặc bảo toàn electron.' },
      { note: 'Bảo toàn electron rất hữu ích: số mol electron kim loại nhường = số mol electron H+ (hoặc chất oxi hoá) nhận.' },
    ],
    examples: [
      { q: 'Cho 2,7 g Al vào dung dịch NaOH dư. Tính thể tích H2 (đktc).', a: 'n(Al) = 2,7/27 = 0,1 mol. 2Al + 2NaOH + 2H2O -> 2NaAlO2 + 3H2 nên n(H2) = 0,15 mol -> V = 0,15 . 22,4 = 3,36 lít.' },
      { q: 'Có 3 chất bột Al, Fe, Cu. Trình bày cách nhận biết.', a: 'Cho NaOH: Al tan và sủi bọt H2 (nhận ra Al), Fe và Cu không tan. Cho HCl vào 2 chất còn lại: Fe tan, sủi bọt H2; Cu không tan -> phân biệt Fe và Cu.' },
    ],
  },

  'H12HOA-w31-quiz': {
    topic: 'Đề luyện thi — Tổng hợp 1',
    intro: 'Các em ơi, từ tuần này ta bước vào luyện đề. Thầy chọn các dạng bài tổng hợp cả hữu cơ và vô cơ giống cấu trúc đề thi tốt nghiệp.',
    objectives: [
      'Vận dụng kiến thức tổng hợp giải nhanh các câu trắc nghiệm.',
      'Rèn kĩ năng tính toán theo phương trình và bảo toàn.',
      'Phân biệt phản ứng oxi hoá - khử với phản ứng trao đổi.',
    ],
    theory: [
      { h: 'Các công thức tính nhanh' },
      { ul: [
        'Khí ở đktc: n = V/22,4.',
        'Số mol chất: n = m/M.',
        'Phản ứng đốt cháy hợp chất hữu cơ: tính C qua CO2, H qua H2O.',
      ] },
      { h: 'Phản ứng oxi hoá - khử' },
      { p: 'Phản ứng oxi hoá - khử có sự thay đổi số oxi hoá (có cho - nhận electron). Ví dụ Fe + CuSO4 -> FeSO4 + Cu (Fe nhường e, Cu2+ nhận e). Phản ứng trao đổi như NaCl + AgNO3 -> AgCl + NaNO3 không phải oxi hoá - khử.' },
      { h: 'Lưu ý làm đề' },
      { p: 'Đọc kĩ câu hỏi, gạch chân dữ kiện. Câu lý thuyết làm trước, câu tính toán phức tạp để sau. Kiểm tra đơn vị và cân bằng phương trình.' },
      { note: 'Với câu đốt cháy ester đơn chức, nhớ ester có ít nhất 2 C (đơn giản nhất là HCOOCH3, có 2 C).' },
    ],
    examples: [
      { q: 'Đốt cháy hoàn toàn 0,1 mol ester đơn chức X thu được 4,48 lít CO2 (đktc). Xác định số C của X.', a: 'n(CO2) = 4,48/22,4 = 0,2 mol. Số C = n(CO2)/n(X) = 0,2/0,1 = 2. Ester có ít nhất 2 C nên X là HCOOCH3 (methyl formate).' },
      { q: 'Phản ứng nào sau đây là oxi hoá - khử: (a) HCl + NaOH; (b) CaCO3 -> CaO + CO2; (c) Fe + CuSO4 -> FeSO4 + Cu?', a: 'Câu (c) là oxi hoá - khử: Fe nhường electron (Fe -> Fe2+), Cu2+ nhận electron (Cu2+ -> Cu). Câu (a) là trung hoà, (b) là phân huỷ không đổi số oxi hoá.' },
    ],
  },

  'H12HOA-w32-quiz': {
    topic: 'Đề luyện thi — Tổng hợp 2',
    intro: 'Các em thân mến, tuần này tiếp tục luyện đề tổng hợp, chú trọng các bài tính toán hỗn hợp kim loại và đếm đồng phân ester.',
    objectives: [
      'Giải được bài toán hỗn hợp kim loại với acid.',
      'Đếm được số đồng phân ester.',
      'Củng cố nhận biết ion và tính chất nhôm.',
    ],
    theory: [
      { h: 'Bài toán hỗn hợp kim loại' },
      { p: 'Lập hệ phương trình theo số mol và khối lượng, kết hợp số mol khí H2 sinh ra. Kim loại không phản ứng (như Cu với HCl) được tách riêng.' },
      { h: 'Đếm đồng phân ester' },
      { ul: [
        'C4H8O2 có 4 đồng phân ester: HCOOCH2CH2CH3, HCOOCH(CH3)2, CH3COOC2H5, C2H5COOCH3.',
        'Khi đếm, lần lượt thay đổi gốc acid và gốc alcohol sao cho tổng số C đúng.',
      ] },
      { h: 'Tính chất nhôm' },
      { p: 'Al, Al2O3, Al(OH)3 đều tan trong NaOH (tính lưỡng tính/khử). Fe không tan trong NaOH.' },
      { note: 'Khi gặp hỗn hợp Cu và Al tác dụng HCl, chỉ Al phản ứng (Cu đứng sau H). Dùng dữ kiện H2 để tính Al rồi suy ra Cu.' },
    ],
    examples: [
      { q: 'Cho 3 g hỗn hợp Cu, Al vào HCl dư thu được 2,24 lít H2 (đktc). Tính %Cu theo khối lượng.', a: 'Cu không phản ứng. n(H2) = 0,1 mol. 2Al + 6HCl -> 2AlCl3 + 3H2 nên n(Al) = (2/3).0,1 ≈ 0,0667 mol -> m(Al) ≈ 1,8 g. m(Cu) = 3 - 1,8 = 1,2 g -> %Cu = 1,2/3 . 100% = 40%.' },
      { q: 'Số đồng phân ester của C4H8O2 là bao nhiêu?', a: 'C4H8O2 có 4 đồng phân ester: HCOOCH2CH2CH3, HCOOCH(CH3)2, CH3COOC2H5, C2H5COOCH3.' },
    ],
  },

  'H12HOA-w33-quiz': {
    topic: 'Đề luyện thi — Tổng hợp 3',
    intro: 'Các em ơi, tuần này luyện các bài về amino acid, polymer và hỗn hợp kim loại, đồng thời ôn lại bảo toàn khối lượng và bảo toàn electron.',
    objectives: [
      'Xác định số nhóm chức của amino acid qua phản ứng.',
      'Tính toán bảo toàn khối lượng trong trùng hợp.',
      'Giải bài hỗn hợp kim loại bằng hệ phương trình.',
    ],
    theory: [
      { h: 'Amino acid và phản ứng với base' },
      { p: 'Số nhóm -COOH = n(NaOH)/n(amino acid). Nếu tỉ lệ 1:1 thì có 1 nhóm COOH.' },
      { h: 'Bảo toàn khối lượng trong polymer' },
      { p: 'Trùng hợp không tách phân tử nhỏ nên m(polymer) = m(monome) (hiệu suất 100%). Trùng ngưng có tách H2O nên m(polymer) < tổng m(monome).' },
      { h: 'Hỗn hợp kim loại với acid' },
      { p: 'Lập hệ: tổng số mol, tổng khối lượng, và số mol H2 (mỗi kim loại cho lượng H2 theo hoá trị). Giải tìm số mol từng kim loại.' },
      { note: 'Cách an toàn khi gặp đề mơ hồ: dựa vào dữ kiện chắc chắn (số mol khí, khối lượng) để loại đáp án; ưu tiên đáp án thoả mãn đầy đủ phương trình.' },
    ],
    examples: [
      { q: 'Cho 8 g hỗn hợp Mg, Fe vào HCl dư thu được 4,48 lít H2 (đktc). Tính %Mg theo khối lượng.', a: 'n(H2) = 0,2 mol. Gọi n(Mg) = x, n(Fe) = y. Mg và Fe đều cho 1 H2 từ 1 mol nên x + y = 0,2; khối lượng: 24x + 56y = 8. Giải: x = 0,1; y = 0,1. m(Mg) = 2,4 g -> %Mg = 2,4/8 . 100% = 30%.' },
      { q: 'Cho 0,1 mol amino acid X phản ứng vừa đủ với 100 mL NaOH 1M. X có mấy nhóm -COOH?', a: 'n(NaOH) = 0,1 . 1 = 0,1 mol. Tỉ lệ X : NaOH = 0,1 : 0,1 = 1 : 1 -> X có 1 nhóm -COOH.' },
    ],
  },

  'H12HOA-w34-quiz': {
    topic: 'Đề luyện thi — Tổng hợp 4',
    intro: 'Các em thân mến, tuần luyện đề cuối tập trung phản ứng kim loại với dung dịch muối, điện phân và ứng dụng thực tế (chất tẩy rửa, chống ăn mòn).',
    objectives: [
      'Giải bài kim loại tác dụng với dung dịch muối nhiều ion.',
      'Củng cố điện phân nóng chảy và điện phân dung dịch.',
      'Liên hệ kiến thức với thực tế đời sống.',
    ],
    theory: [
      { h: 'Kim loại với dung dịch nhiều muối' },
      { p: 'Kim loại khử ion có tính oxi hoá mạnh trước. Ví dụ Cu dư trong dung dịch chứa Ag+ và Fe3+: Cu khử Ag+ (mạnh nhất) thành Ag, rồi khử Fe3+ thành Fe2+, sản phẩm cuối có Cu2+, Ag, Fe2+.' },
      { h: 'Điện phân' },
      { ul: [
        'Điện phân nóng chảy NaCl: cathode Na+ + e -> Na; anode 2Cl- -> Cl2 + 2e.',
        'Điện phân dung dịch CuSO4 (điện cực trơ): cathode Cu2+ + 2e -> Cu; anode 2H2O -> O2 + 4H+ + 4e.',
      ] },
      { h: 'Liên hệ thực tế' },
      { ul: [
        'Chất tẩy rửa: xà phòng (RCOONa) và chất giặt rửa tổng hợp (RC6H4SO3Na).',
        'Anode hi sinh: gắn Zn vào vỏ tàu thép để bảo vệ Fe.',
      ] },
      { note: 'Ghi nhớ thứ tự ưu tiên: ion có tính oxi hoá mạnh hơn (đứng sau trong dãy điện hoá) bị khử trước khi cho kim loại vào.' },
    ],
    examples: [
      { q: 'Cho 100 mL dung dịch CuSO4 1M phản ứng với Zn dư. Tính khối lượng Cu thu được.', a: 'n(CuSO4) = 0,1 . 1 = 0,1 mol. Zn + CuSO4 -> ZnSO4 + Cu nên n(Cu) = 0,1 mol -> m = 0,1 . 64 = 6,4 g.' },
      { q: 'Cho Cu dư vào dung dịch chứa AgNO3 và Fe(NO3)3. Sản phẩm cuối gồm những gì?', a: 'Cu khử Ag+ thành Ag (Cu + 2AgNO3 -> Cu(NO3)2 + 2Ag) và khử Fe3+ thành Fe2+ (Cu + 2Fe(NO3)3 -> Cu(NO3)2 + 2Fe(NO3)2). Sản phẩm: Ag, Cu(NO3)2, Fe(NO3)2.' },
    ],
  },

  'H12HOA-w35-quiz': {
    topic: 'Tổng kết — Chuẩn bị thi tốt nghiệp',
    intro: 'Các em thân mến, đây là tuần cuối! Thầy chia sẻ với các em chiến lược làm bài, các phương pháp giải nhanh và những lưu ý để đạt điểm cao trong kì thi tốt nghiệp THPT.',
    objectives: [
      'Nắm được cấu trúc đề thi tốt nghiệp THPT môn Hoá học.',
      'Sử dụng các phương pháp bảo toàn để giải nhanh.',
      'Biết cách phân bổ thời gian và tránh lỗi thường gặp.',
    ],
    theory: [
      { h: 'Cấu trúc đề thi' },
      { p: 'Đề thi tốt nghiệp THPT môn Hoá học gồm các câu trắc nghiệm, thời gian 50 phút, phân theo 4 mức độ: nhận biết, thông hiểu, vận dụng, vận dụng cao.' },
      { h: 'Các phương pháp giải nhanh' },
      { ul: [
        'Bảo toàn nguyên tố: tổng số nguyên tử mỗi nguyên tố trước và sau phản ứng bằng nhau.',
        'Bảo toàn khối lượng: tổng khối lượng chất tham gia = tổng khối lượng sản phẩm.',
        'Bảo toàn electron: tổng electron chất khử nhường = tổng electron chất oxi hoá nhận.',
        'Bảo toàn điện tích và tăng giảm khối lượng.',
      ] },
      { h: 'Chiến lược làm bài' },
      { ul: [
        'Làm câu dễ (nhận biết, thông hiểu) trước, câu khó để sau.',
        'Phân bổ thời gian hợp lí, câu lý thuyết dưới 30 giây.',
        'Dành 5 phút cuối soát lại và tô đúng phiếu trả lời.',
      ] },
      { note: 'Lỗi cần tránh: nhầm hoá trị, sai hệ số cân bằng, sai đơn vị (mol, g, lít, M). Đọc kĩ đề và cẩn thận từng bước.' },
    ],
    examples: [
      { q: 'Áp dụng bảo toàn khối lượng: đốt cháy m gam chất hữu cơ thu được 4,4 g CO2 và 1,8 g H2O, biết cần 0,1 mol O2. Tính m.', a: 'Bảo toàn khối lượng: m + m(O2) = m(CO2) + m(H2O). m(O2) = 0,1 . 32 = 3,2 g. m = 4,4 + 1,8 - 3,2 = 3 g.' },
      { q: 'Vì sao nên dùng phương pháp bảo toàn electron cho bài kim loại tác dụng HNO3?', a: 'Vì phản ứng kim loại với HNO3 là oxi hoá - khử phức tạp. Dùng bảo toàn electron (số mol e kim loại nhường = số mol e mà N+5 nhận để tạo NO, NO2...) giúp giải nhanh không cần cân bằng đầy đủ phương trình.' },
    ],
  },

  'H12HOA-w36-quiz': {
    topic: 'Kết thúc Hoá Học THPT — Phân tử xây dựng thế giới',
    intro: 'Tuần cuối năm học — hãy cùng bước ra ngoài các phương trình hoá học và nhìn xem Hoá Học đang hiện diện ở đâu trong thế giới quanh ta: từ nhựa dẻo trong tay đến thuốc chữa bệnh, từ phân bón nuôi lớn loài người đến pin lưu trữ năng lượng.',
    objectives: [
      'Hệ thống hoá chương trình Hoá Học 3 năm THPT theo các mảng kiến thức lớn.',
      'Nhận ra ứng dụng thực tế của Hoá Học trong y dược, vật liệu, năng lượng và môi trường.',
      'Xây dựng định hướng học tập tiếp theo cho những ai yêu thích Hoá Học.',
    ],
    theory: [
      { h: 'Bản đồ Hoá Học 3 năm THPT' },
      { ul: [
        'Lớp 10: Nguyên tử, bảng tuần hoàn, liên kết hoá học, phản ứng oxi hoá–khử, halogens và nhóm VIA.',
        'Lớp 11: Nitơ–photpho–cacbon–silic, đại cương hữu cơ, hydrocarbon (alkane, alkene, alkyne, arene), dẫn xuất halogen.',
        'Lớp 12: Ancol–phenol–ether, aldehyde–ketone–acid carboxylic, ester–lipid, carbohydrate, amine–amino acid–protein–polymer, điện hoá học–pin–ăn mòn.',
      ] },
      { h: 'Hoá Học tạo ra thế giới hiện đại' },
      { ul: [
        'Dược phẩm: Aspirin (RCOOH), kháng sinh (vòng thơm, amide bond), vaccine — tất cả là hoá học hữu cơ.',
        'Vật liệu: Nhựa (polymer), sợi tổng hợp (polyester, nylon), sơn, keo dán — tổng hợp từ hoá hữu cơ.',
        'Năng lượng: Pin Lithium-ion (điện hoá học), pin nhiên liệu hydrogen, biofuel từ tinh bột (carbohydrate).',
        'Nông nghiệp: Phân bón N-P-K (tổng hợp từ N2 khí quyển bằng Haber-Bosch), thuốc trừ sâu.',
        'Môi trường: Xử lý nước thải, hấp thụ CO2, xúc tác xanh — Hoá học là chìa khoá giải quyết ô nhiễm.',
      ] },
      { h: 'Hoá Học ở đại học — những ngành liên quan' },
      { ul: [
        'Dược học: 5 năm nghiên cứu sâu phân tử sinh học, tổng hợp thuốc, kiểm nghiệm.',
        'Công nghệ hoá học: thiết kế quy trình sản xuất, tối ưu phản ứng công nghiệp.',
        'Hoá phân tích: kiểm định chất lượng thực phẩm, môi trường, vật liệu.',
        'Công nghệ thực phẩm, Nông nghiệp: ứng dụng Hoá vào sản xuất và bảo quản.',
      ] },
      { h: 'Lời khuyên cho kì thi tốt nghiệp THPT môn Hoá' },
      { ul: [
        'Nhớ quy tắc điện hoá: dãy hoạt động kim loại, pin Galvanic, điện phân.',
        'Hữu cơ: nhận diện nhóm chức → gọi tên → viết phương trình đặc trưng.',
        'Bài toán hỗn hợp: quy đổi mol, bảo toàn electron và khối lượng.',
        'Công thức phân tử: dùng C, H, O, N và bảo toàn khối lượng/electron để tìm nhanh.',
      ] },
      { note: 'Hoá Học không chỉ là công thức — đó là cách hiểu tại sao sắt gỉ, tại sao mật ong ngọt, tại sao thuốc chữa bệnh, tại sao nhựa không phân huỷ. Người hiểu Hoá là người đọc được ngôn ngữ của vật chất.' },
    ],
    examples: [
      { q: 'Polymer nào được sử dụng phổ biến nhất trong đời sống và tác hại môi trường của nó là gì?', a: 'Polyethylene (PE) và polypropylene (PP) chiếm hơn 50% nhựa toàn cầu — dùng trong túi nilon, chai lọ, bao bì. Tác hại: không phân huỷ sinh học trong hàng trăm năm; vỡ thành vi nhựa (microplastics) xâm nhập chuỗi thực phẩm và cơ thể con người. Giải pháp đang nghiên cứu: bioplastic (PLA từ tinh bột ngô), enzyme phân huỷ nhựa (PETase), thu gom và tái chế bằng phản ứng nhiệt phân.' },
      { q: 'Tại sao điện hoá học quan trọng trong kỉ nguyên năng lượng tái tạo?', a: 'Pin và điện phân là cốt lõi của cách mạng năng lượng: Pin Lithium-ion lưu trữ điện từ mặt trời và gió; Pin Lithium-iron-phosphate (LFP) trong xe điện; Pin nhiên liệu hydrogen (H2 + O2 → H2O + điện) không phát thải; Điện phân nước sản xuất hydrogen xanh từ điện tái tạo. Mọi thứ đều là phản ứng oxi hoá–khử ở điện cực — kiến thức Hoá lớp 12 đang thay đổi thế giới.' },
      { q: 'Em thấy phần nào của Hoá Học THPT thú vị và có ứng dụng thực tế nhất? Vì sao?', a: 'Câu hỏi mở để em suy nghĩ. Gợi ý: Hoá hữu cơ (vì mọi sinh vật đều là hoá hữu cơ — ADN, protein, carbohydrate); Điện hoá (vì pin và ắc quy trong mọi thiết bị điện tử); Hoá phân tích (vì kiểm tra chất lượng thực phẩm và môi trường là bảo vệ sức khoẻ). Không có đáp án sai — tò mò là điểm khởi đầu của khoa học.' },
    ],
  },
};
