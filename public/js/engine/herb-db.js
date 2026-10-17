// ============================================================
// HerbDB — Catalog dược liệu Việt Nam (Năm 2–3)
// ============================================================
// Schema xem types.js (typedef Herb).
// Mục tiêu: 100+ cây thuốc VN phổ biến nhất.
// Hiện chứa 8 cây mẫu thể hiện đầy đủ schema — bổ sung dần.
// ============================================================

/** @type {import('./types.js').Herb[]} */
export const HERBS = [
  {
    id: 'kim-tien-thao',
    nameVN: 'Kim tiền thảo',
    scientificName: 'Desmodium styracifolium',
    family: 'Fabaceae',
    synonyms: ['Đồng tiền lông', 'Mắt trâu'],
    partUsed: 'Toàn cây trên mặt đất (phơi khô)',
    activeCompounds: ['Flavonoid (desmodin)', 'Saponin triterpenoid', 'Polysaccharid'],
    indications: ['Sỏi thận, sỏi tiết niệu', 'Viêm đường tiết niệu', 'Lợi tiểu', 'Phù'],
    preparation: 'Sắc 30–50g/ngày, uống thay nước',
    habitat: 'Mọc hoang khắp VN, ưa ẩm và bóng',
    imageUrls: [],
    keyPoints: ['Hoạt chất chính là flavonoid', 'Đặc trị sỏi tiết niệu', 'An toàn khi dùng dài ngày'],
  },
  {
    id: 'ich-mau',
    nameVN: 'Ích mẫu',
    scientificName: 'Leonurus japonicus',
    family: 'Lamiaceae',
    partUsed: 'Phần trên mặt đất',
    activeCompounds: ['Alkaloid (leonurin, stachydrin)', 'Flavonoid', 'Tinh dầu'],
    indications: ['Rối loạn kinh nguyệt', 'Đau bụng kinh', 'Sau sinh ứ huyết', 'Cao huyết áp nhẹ'],
    preparation: 'Sắc 6–12g/ngày, hoặc dạng cao lỏng',
    contraindications: ['Phụ nữ có thai (gây co tử cung)'],
    habitat: 'Mọc khắp VN ở nơi ẩm',
    imageUrls: [],
    keyPoints: ['Chống chỉ định khi có thai', 'Có tác dụng trên tử cung', 'Leonurin là hoạt chất chính'],
  },
  {
    id: 'dinh-lang',
    nameVN: 'Đinh lăng',
    scientificName: 'Polyscias fruticosa',
    family: 'Araliaceae',
    synonyms: ['Sâm Nam', 'Cây gỏi cá'],
    partUsed: 'Rễ (chính), lá (phụ)',
    activeCompounds: ['Saponin triterpenoid (giống nhân sâm)', 'Acid amin (20 loại)', 'Vitamin B1, B2, C'],
    indications: ['Bồi bổ cơ thể', 'Mệt mỏi', 'Suy nhược thần kinh', 'Lợi sữa'],
    preparation: 'Rễ phơi khô sắc 8–16g/ngày; lá tươi 50–100g',
    habitat: 'Trồng làm cảnh + làm thuốc',
    imageUrls: [],
    keyPoints: ['Được gọi là "sâm của người nghèo"', 'Rễ chứa saponin giống ginseng', 'Dùng cho phụ nữ sau sinh để lợi sữa'],
  },
  {
    id: 'xuyen-tam-lien',
    nameVN: 'Xuyên tâm liên',
    scientificName: 'Andrographis paniculata',
    family: 'Acanthaceae',
    partUsed: 'Phần trên mặt đất',
    activeCompounds: ['Andrographolide (chính)', 'Neoandrographolide', 'Diterpen lacton'],
    indications: ['Cảm sốt, viêm họng', 'Tiêu chảy do nhiễm khuẩn', 'Viêm gan', 'Hỗ trợ điều trị COVID-19 (đã có nghiên cứu)'],
    preparation: 'Sắc 6–12g/ngày, hoặc viên nén chuẩn hoá theo % andrographolide',
    contraindications: ['Có thai (D)', 'Suy gan nặng'],
    habitat: 'Trồng + mọc hoang ở ĐB Bắc Bộ',
    imageUrls: [],
    keyPoints: ['Vị đắng cực mạnh, đặc trưng', 'Andrographolide có hoạt tính kháng virus', 'Chống chỉ định ở phụ nữ có thai'],
  },
  {
    id: 'cam-thao',
    nameVN: 'Cam thảo',
    scientificName: 'Glycyrrhiza uralensis',
    family: 'Fabaceae',
    partUsed: 'Rễ và thân rễ',
    activeCompounds: ['Glycyrrhizin (tạo vị ngọt 50× đường)', 'Flavonoid', 'Liquiritin'],
    indications: ['Long đờm, giảm ho', 'Loét dạ dày', 'Giảm độc thuốc khác', 'Tá dược tạo ngọt cho thuốc'],
    preparation: 'Sắc 3–10g/ngày; rất hay phối hợp với thuốc khác',
    contraindications: ['Cao huyết áp', 'Phù do mineralocorticoid'],
    habitat: 'Nhập khẩu chủ yếu từ TQ',
    imageUrls: [],
    keyPoints: ['Dùng dài hạn → giữ Na, mất K, phù, tăng HA', 'Trong 9/10 bài thuốc cổ truyền', 'Glycyrrhizin có tác dụng giống cortisol'],
  },
  {
    id: 'hoan-ngoc',
    nameVN: 'Hoàn ngọc',
    scientificName: 'Pseuderanthemum palatiferum',
    family: 'Acanthaceae',
    partUsed: 'Lá tươi',
    activeCompounds: ['Flavonoid', 'Saponin', 'Acid hữu cơ'],
    indications: ['Viêm loét dạ dày tá tràng', 'Tiêu chảy', 'Vết thương ngoài da'],
    preparation: 'Nhai 5–10 lá tươi/ngày trước ăn, hoặc xay nhuyễn đắp ngoài',
    habitat: 'Trồng làm cảnh, dễ nhân giống',
    imageUrls: [],
    keyPoints: ['Dùng lá TƯƠI mới có tác dụng', 'Dân gian gọi là "cây thần kỳ"', 'An toàn cao'],
  },
  {
    id: 'diep-ca',
    nameVN: 'Diếp cá',
    scientificName: 'Houttuynia cordata',
    family: 'Saururaceae',
    synonyms: ['Ngư tinh thảo'],
    partUsed: 'Toàn cây tươi/khô',
    activeCompounds: ['Tinh dầu (methylnonylketon)', 'Quercitrin', 'Polysaccharid'],
    indications: ['Viêm phổi', 'Áp xe phổi', 'Sốt, viêm họng', 'Trĩ'],
    preparation: 'Tươi 60–120g/ngày, hoặc khô 15–30g; có thể giã đắp ngoài',
    habitat: 'Mọc nơi ẩm, thường trồng làm rau',
    imageUrls: [],
    keyPoints: ['Mùi tanh đặc trưng', 'Vừa làm rau vừa làm thuốc', 'Hoạt tính kháng khuẩn'],
  },
  {
    id: 'nghe-vang',
    nameVN: 'Nghệ vàng',
    scientificName: 'Curcuma longa',
    family: 'Zingiberaceae',
    partUsed: 'Thân rễ',
    activeCompounds: ['Curcumin (chính, 3–5%)', 'Tinh dầu', 'Demethoxycurcumin'],
    indications: ['Loét dạ dày tá tràng', 'Chống viêm', 'Vàng da', 'Vết thương ngoài da', 'Mụn nám'],
    preparation: 'Bột nghệ 1–3g/ngày + mật ong; hoặc viên nang nano-curcumin',
    contraindications: ['Đang dùng chống đông (warfarin): tăng nguy cơ chảy máu'],
    habitat: 'Trồng khắp VN, miền Trung là chính',
    imageUrls: [],
    keyPoints: [
      'Curcumin sinh khả dụng kém → nên dùng dạng nano hoặc kèm piperin',
      'Tương tác với warfarin',
      'Hoạt tính chống oxy hoá + chống viêm mạnh',
    ],
  },

  // ─── ADDITIONAL CURRICULUM-ALIGNED ENTRIES (Agent #13, 2026-05-27) ───
  { id: 'bac-ha', nameVN: 'Bạc hà', scientificName: 'Mentha arvensis', family: 'Lamiaceae', synonyms: ['Bạc hà nam'], partUsed: 'Lá và phần trên mặt đất', activeCompounds: ['Tinh dầu (menthol 60–80%)', 'Menthon', 'Flavonoid'], indications: ['Cảm cúm, nhức đầu', 'Đầy hơi, khó tiêu', 'Sát khuẩn miệng họng', 'Hỗ trợ giảm ngứa ngoài da'], preparation: 'Sắc 4–8g/ngày; tinh dầu nhỏ 1–2 giọt vào nước nóng xông', habitat: 'Trồng khắp VN, ưa khí hậu mát', imageUrls: [], keyPoints: ['Menthol là hoạt chất chính tạo cảm giác mát', 'Thận trọng với trẻ <2 tuổi (gây co thắt thanh quản)', 'Có trong Dược điển VN V'] },
    { id: 'gung', nameVN: 'Gừng', scientificName: 'Zingiber officinale', family: 'Zingiberaceae', synonyms: ['Sinh khương (tươi)', 'Can khương (khô)'], partUsed: 'Thân rễ', activeCompounds: ['Tinh dầu (zingiberen)', 'Gingerol', 'Shogaol'], indications: ['Cảm lạnh', 'Buồn nôn, say tàu xe', 'Đầy hơi, khó tiêu', 'Đau bụng kinh'], preparation: 'Tươi 4–8g sắc uống; bột khô 1–4g; cao chuẩn hoá 250mg × 4/ngày cho buồn nôn thai kỳ', contraindications: ['Sỏi mật (gừng tăng tiết mật)', 'Đang dùng warfarin liều cao (lý thuyết tăng chảy máu)'], habitat: 'Trồng khắp VN', imageUrls: [], keyPoints: ['Hiệu quả buồn nôn thai kỳ và sau hoá trị (bằng chứng RCT)', 'Gingerol khi nấu chín → shogaol mạnh hơn', 'Có thể tương tác với chống đông'] },
    { id: 'hoa-hoe', nameVN: 'Hoa hòe', scientificName: 'Styphnolobium japonicum', family: 'Fabaceae', synonyms: ['Hoè mễ', 'Sophora japonica (tên cũ)'], partUsed: 'Nụ hoa', activeCompounds: ['Rutin (20–28%)', 'Quercetin', 'Sophoradiol'], indications: ['Bảo vệ thành mạch, giảm xuất huyết', 'Trĩ', 'Tăng huyết áp nhẹ', 'Hỗ trợ tĩnh mạch'], preparation: 'Sắc 8–16g/ngày; rutin tinh chế 50–100mg × 3/ngày', habitat: 'Trồng làm cảnh + dược liệu ở miền Bắc', imageUrls: [], keyPoints: ['Rutin là nguồn nguyên liệu sản xuất thuốc rutin C', 'Tăng sức bền thành mao mạch', 'Có trong Dược điển VN V'] },
    { id: 'kim-ngan', nameVN: 'Kim ngân', scientificName: 'Lonicera japonica', family: 'Caprifoliaceae', synonyms: ['Nhẫn đông'], partUsed: 'Hoa và dây', activeCompounds: ['Acid chlorogenic', 'Luteolin', 'Tinh dầu', 'Iridoid'], indications: ['Sốt do nhiễm khuẩn', 'Viêm họng, viêm amidan', 'Nhọt, mụn ngoài da', 'Lỵ trực khuẩn'], preparation: 'Hoa sắc 12–20g/ngày; dây 8–16g; bôi ngoài hoặc súc miệng', habitat: 'Mọc tự nhiên + trồng ở vùng núi miền Bắc', imageUrls: [], keyPoints: ['"Kháng sinh thực vật": kháng khuẩn phổ rộng', 'Thường phối hợp với liên kiều trong Ngân kiều giải độc', 'Có trong Dược điển VN V'] },
    { id: 'sai-ho', nameVN: 'Sài hồ', scientificName: 'Bupleurum chinense', family: 'Apiaceae', partUsed: 'Rễ', activeCompounds: ['Saponin triterpenoid (saikosaponin)', 'Phytosterol', 'Tinh dầu'], indications: ['Sốt do ngoại cảm', 'Sốt rét', 'Đau hông sườn do can khí uất kết', 'Bảo vệ gan'], preparation: 'Sắc 4–12g/ngày', contraindications: ['Suy gan nặng (liều cao có thể tăng men gan)'], habitat: 'Nhập khẩu từ TQ; có loài Bupleurum sinensis ở VN', imageUrls: [], keyPoints: ['Vị thuốc giải biểu cổ điển', 'Saikosaponin có tác dụng kháng viêm + bảo vệ gan', 'Trong bài Tiểu sài hồ thang nổi tiếng'] },
    { id: 'atiso', nameVN: 'Atisô', scientificName: 'Cynara scolymus', family: 'Asteraceae', partUsed: 'Lá, hoa, rễ', activeCompounds: ['Cynarin', 'Acid chlorogenic', 'Flavonoid', 'Sesquiterpen lacton'], indications: ['Hỗ trợ chức năng gan, lợi mật', 'Khó tiêu', 'Mỡ máu cao (hỗ trợ)', 'Lợi tiểu nhẹ'], preparation: 'Cao đặc lá 1–4g/ngày; trà túi lọc 2–3 túi/ngày; nước sắc lá tươi', habitat: 'Trồng nhiều ở Đà Lạt', imageUrls: [], keyPoints: ['Cynarin là hoạt chất chính bảo vệ gan', 'Sản phẩm Atisô Việt Nam (Lâm Đồng) là thương hiệu lớn', 'Hỗ trợ: không thay thế thuốc hạ mỡ máu chuẩn'] },
    { id: 'ma-de', nameVN: 'Mã đề', scientificName: 'Plantago major', family: 'Plantaginaceae', synonyms: ['Xa tiền tử (hạt)', 'Xa tiền thảo (cây)'], partUsed: 'Toàn cây và hạt', activeCompounds: ['Polysaccharid nhầy', 'Aucubin (iridoid)', 'Flavonoid', 'Tannin'], indications: ['Lợi tiểu, sỏi tiết niệu', 'Ho, viêm phế quản', 'Tiêu chảy (hạt)', 'Vết thương ngoài da'], preparation: 'Cây 12–20g/ngày sắc uống; hạt 8–16g; tươi giã đắp ngoài', habitat: 'Mọc hoang khắp VN', imageUrls: [], keyPoints: ['Hạt và cây có công dụng khác nhau', 'An toàn, dùng được cho trẻ em', 'Có trong Dược điển VN V'] },
    { id: 'rau-meo', nameVN: 'Râu mèo', scientificName: 'Orthosiphon stamineus', family: 'Lamiaceae', synonyms: ['Cây bông bạc'], partUsed: 'Phần trên mặt đất', activeCompounds: ['Flavonoid (sinensetin)', 'Acid rosmarinic', 'Diterpen', 'Kali'], indications: ['Sỏi tiết niệu', 'Viêm thận, viêm bàng quang', 'Phù', 'Bệnh gout (hỗ trợ)'], preparation: 'Sắc 6–12g/ngày uống thay nước', contraindications: ['Suy tim, suy thận giai đoạn cuối (giàu K)'], habitat: 'Trồng + mọc hoang ở miền Nam', imageUrls: [], keyPoints: ['Lợi tiểu mạnh hơn nhiều dược liệu khác', 'Hàm lượng K cao → thận trọng ở BN suy thận', 'Có trong Dược điển VN V'] },
    { id: 'sa', nameVN: 'Sả', scientificName: 'Cymbopogon citratus', family: 'Poaceae', synonyms: ['Sả chanh'], partUsed: 'Thân và lá', activeCompounds: ['Tinh dầu (citral 75–85%)', 'Geraniol', 'Myrcen'], indications: ['Cảm cúm, sốt', 'Đầy hơi, khó tiêu', 'Đuổi muỗi (tinh dầu)', 'Sát khuẩn nhẹ'], preparation: 'Sắc 8–16g; xông hơi cảm cúm; tinh dầu thoa pha loãng', habitat: 'Trồng khắp VN', imageUrls: [], keyPoints: ['Tinh dầu citral có hoạt tính kháng khuẩn, kháng nấm', 'Phổ biến làm gia vị và xông', 'Phun tinh dầu pha loãng xua muỗi tự nhiên'] },
    { id: 'la-lot', nameVN: 'Lá lốt', scientificName: 'Piper lolot', family: 'Piperaceae', partUsed: 'Lá và toàn cây', activeCompounds: ['Tinh dầu (β-caryophyllen)', 'Alkaloid (piperin, piperidin)', 'Flavonoid'], indications: ['Đau lưng, đau khớp', 'Ra mồ hôi tay chân', 'Đầy bụng', 'Phong hàn'], preparation: 'Sắc 8–12g/ngày; lá tươi đắp ngoài; ngâm chân tay với nước sắc nóng', habitat: 'Trồng phổ biến khắp VN làm gia vị + thuốc', imageUrls: [], keyPoints: ['Dân gian dùng nhiều cho đau khớp do lạnh', 'Vừa làm rau gia vị vừa làm thuốc', 'Ngâm chân tay là cách dùng truyền thống'] },
    { id: 'trinh-nu-hoang-cung', nameVN: 'Trinh nữ hoàng cung', scientificName: 'Crinum latifolium', family: 'Amaryllidaceae', partUsed: 'Lá', activeCompounds: ['Alkaloid (crinafolin, crinafolidin, lycorin)', 'Glucan'], indications: ['Phì đại tiền liệt tuyến lành tính', 'U xơ tử cung', 'Hỗ trợ điều trị ung thư (đang nghiên cứu)'], preparation: 'Lá khô sắc 3 lá (~12g)/ngày × 7 ngày, nghỉ 7 ngày', contraindications: ['Có thai', 'Suy thận nặng'], habitat: 'Trồng làm cảnh + dược liệu khắp VN', imageUrls: [], keyPoints: ['Hoạt tính chống tăng sinh trên u xơ và phì đại tiền liệt tuyến', 'Cần phân biệt với cây náng hoa trắng cùng họ (KHÔNG có tác dụng tương tự, dễ nhầm)', 'Có nghiên cứu lâm sàng tại VN'] },
    { id: 'sam-ngoc-linh', nameVN: 'Sâm Ngọc Linh', scientificName: 'Panax vietnamensis', family: 'Araliaceae', synonyms: ['Sâm Việt Nam', 'Sâm K5'], partUsed: 'Thân rễ và rễ củ', activeCompounds: ['Saponin triterpenoid (52 loại trong đó majonosid R2 đặc trưng riêng)', 'Polysaccharid', 'Acid amin'], indications: ['Tăng cường thể lực', 'Suy nhược thần kinh', 'Phục hồi sau bệnh nặng', 'Hỗ trợ điều trị ung thư (nghiên cứu)'], preparation: 'Ngậm 1–3g/ngày; ngâm rượu 50g với 1L rượu trắng; sắc 1–4g', habitat: 'Núi Ngọc Linh (Quảng Nam – Kon Tum), >1500m', imageUrls: [], keyPoints: ['Quốc bảo VN: saponin majonosid R2 đặc trưng không có ở sâm khác', 'Giá rất cao do hiếm', 'Có nhiều nghiên cứu khoa học của VN'] },
    { id: 'ha-thu-o', nameVN: 'Hà thủ ô đỏ', scientificName: 'Fallopia multiflora', family: 'Polygonaceae', synonyms: ['Polygonum multiflorum (tên cũ)'], partUsed: 'Củ rễ', activeCompounds: ['Anthraquinon (emodin)', 'Stilbene (2,3,5,4-tetrahydroxystilbene)', 'Lecithin'], indications: ['Bồi bổ huyết, hỗ trợ tóc bạc sớm', 'Suy nhược', 'Mỡ máu cao', 'Mất ngủ'], preparation: 'Phải CHẾ với đỗ đen (giảm độc), 6–12g/ngày sắc', contraindications: ['Đang dùng warfarin', 'Bệnh gan'], habitat: 'Mọc hoang vùng núi miền Bắc', imageUrls: [], keyPoints: ['BẮT BUỘC chế biến đúng cách (cửu chưng cửu sái) trước khi dùng', 'Hà thủ ô SỐNG có thể gây tiêu chảy + độc gan', 'Có cảnh báo độc gan của FDA Hoa Kỳ với sản phẩm chưa chế'] },
    { id: 'dau-tam', nameVN: 'Dâu tằm', scientificName: 'Morus alba', family: 'Moraceae', partUsed: 'Lá (tang diệp), vỏ rễ (tang bạch bì), quả (tang thầm)', activeCompounds: ['Flavonoid (rutin)', '1-deoxynojirimycin (DNJ: ức chế α-glucosidase)', 'Phytosterol'], indications: ['Hỗ trợ đái tháo đường (lá)', 'Ho khan, hen (vỏ rễ)', 'Bồi bổ huyết (quả)', 'Hạ huyết áp nhẹ'], preparation: 'Lá khô 6–12g sắc; vỏ rễ 8–16g; quả 10–15g', habitat: 'Trồng khắp VN, đặc biệt vùng trồng dâu nuôi tằm', imageUrls: [], keyPoints: ['DNJ trong lá dâu có tác dụng giảm hấp thu carbohydrate, hỗ trợ ĐTĐ', 'Phần khác nhau công dụng khác nhau', 'Trồng phổ biến: dễ thu hái'] },
    { id: 'cuc-hoa', nameVN: 'Cúc hoa vàng', scientificName: 'Chrysanthemum indicum', family: 'Asteraceae', synonyms: ['Kim cúc'], partUsed: 'Hoa', activeCompounds: ['Tinh dầu', 'Flavonoid (luteolin, apigenin)', 'Sesquiterpen'], indications: ['Cảm phong nhiệt, sốt nhẹ', 'Đau đầu, chóng mặt', 'Mắt đỏ, mờ mắt', 'Cao huyết áp nhẹ'], preparation: 'Sắc 8–16g/ngày; pha trà uống thay nước', habitat: 'Trồng làm thuốc + cảnh khắp VN', imageUrls: [], keyPoints: ['Cúc hoa vàng (Chrysanthemum indicum) khác cúc hoa trắng (C. morifolium): công dụng tương tự', 'Trà cúc phổ biến giải nhiệt mùa hè', 'Có trong Dược điển VN V'] },
    { id: 'bo-cong-anh', nameVN: 'Bồ công anh', scientificName: 'Lactuca indica', family: 'Asteraceae', synonyms: ['Diếp dại VN: khác với Taraxacum officinale của phương Tây'], partUsed: 'Toàn cây', activeCompounds: ['Lactucin', 'Acid chlorogenic', 'Flavonoid', 'Inulin'], indications: ['Viêm tuyến vú, tắc tia sữa', 'Nhọt độc, đinh râu', 'Viêm gan vàng da', 'Đau dạ dày'], preparation: 'Tươi 30–60g hoặc khô 10–20g sắc uống; tươi giã đắp ngoài', habitat: 'Mọc hoang khắp VN', imageUrls: [], keyPoints: ['Bồ công anh VN (Lactuca indica) ≠ Bồ công anh Tây (Taraxacum)', 'Phổ biến trong bài thuốc trị viêm tuyến vú', 'Có vị đắng đặc trưng'] },
    { id: 'ngai-cuu', nameVN: 'Ngải cứu', scientificName: 'Artemisia vulgaris', family: 'Asteraceae', synonyms: ['Thuốc cứu'], partUsed: 'Lá và phần trên mặt đất', activeCompounds: ['Tinh dầu (cineol, thujon)', 'Flavonoid', 'Sesquiterpen lacton'], indications: ['Điều hoà kinh nguyệt', 'Đau bụng kinh, hành kinh không đều', 'Cầm máu (chế thán)', 'An thai (theo Đông y)'], preparation: 'Sắc 4–8g khô hoặc 12–20g tươi; ngải cứu trứng (món ăn-thuốc); dùng để ngải cứu (moxibustion)', contraindications: ['Có thai 3 tháng đầu (theo Tây y: gây co tử cung)', 'Suy gan'], habitat: 'Trồng khắp VN', imageUrls: [], keyPoints: ['Dùng nhiều trong y học cổ truyền cho phụ nữ', 'Tinh dầu chứa thujon độc thần kinh (uống quá liều/lâu)', 'Lá ngải khô đốt làm ngải cứu (moxibustion)'] },
    { id: 'sen', nameVN: 'Sen', scientificName: 'Nelumbo nucifera', family: 'Nelumbonaceae', partUsed: 'Hạt (liên nhục), tâm sen (liên tâm), lá (hà diệp), củ (liên ngẫu), nhị (liên tu)', activeCompounds: ['Alkaloid (neferin trong tâm sen, lotusin trong lá)', 'Flavonoid', 'Tinh bột (hạt)'], indications: ['Mất ngủ, hồi hộp (tâm sen)', 'Tiêu chảy, kiết lỵ (hạt)', 'Bồi bổ (hạt sen với chè)', 'Cầm máu (lá, củ)'], preparation: 'Tâm sen 1.5–3g pha trà; hạt 6–15g; lá 8–12g', habitat: 'Trồng ở ao hồ khắp VN, đặc biệt Đồng Tháp, Huế', imageUrls: [], keyPoints: ['Quốc hoa Việt Nam, toàn bộ cây có tác dụng', 'Tâm sen có vị đắng đặc trưng, an thần', 'Hạt sen là vị thuốc + thực phẩm phổ biến'] },
    { id: 'tia-to', nameVN: 'Tía tô', scientificName: 'Perilla frutescens', family: 'Lamiaceae', synonyms: ['Tử tô (lá), Tô tử (hạt), Tô diệp (lá khô)'], partUsed: 'Lá, hạt và thân', activeCompounds: ['Tinh dầu (perillaldehyd)', 'Flavonoid (luteolin)', 'Acid rosmarinic', 'Acid α-linolenic (hạt)'], indications: ['Cảm phong hàn, sốt', 'An thai (lá)', 'Ho, hen suyễn (hạt)', 'Giải độc cua cá ngộ độc'], preparation: 'Sắc 4–12g lá tươi hoặc 4–8g khô; hạt 4–12g; ăn sống làm rau', habitat: 'Trồng khắp VN', imageUrls: [], keyPoints: ['Vừa rau gia vị vừa thuốc, cách dùng phổ biến nhất', 'Lá an thai (Đông y): phối hợp trong bài Tô diệp + Trần bì', 'Tinh dầu kháng khuẩn nhẹ'] },
    { id: 'hung-que', nameVN: 'Húng quế', scientificName: 'Ocimum basilicum', family: 'Lamiaceae', synonyms: ['Rau quế'], partUsed: 'Lá và hạt', activeCompounds: ['Tinh dầu (eugenol, linalool)', 'Flavonoid'], indications: ['Cảm cúm, đầy bụng', 'Ho, hen', 'Sát khuẩn họng', 'Đuổi muỗi'], preparation: 'Sắc 6–12g; tươi ăn sống làm rau; xông cảm cúm', habitat: 'Trồng khắp VN', imageUrls: [], keyPoints: ['Phổ biến làm rau gia vị', 'Eugenol có hoạt tính kháng khuẩn nhẹ', 'Hạt húng quế trương nở trong nước, dùng làm thức uống giải nhiệt'] },
    { id: 'la-voi', nameVN: 'Lá vối', scientificName: 'Cleistocalyx operculatus', family: 'Myrtaceae', partUsed: 'Lá tươi hoặc khô, nụ vối', activeCompounds: ['Tinh dầu', 'Tannin', 'Flavonoid (2′,4′-dihydroxy-6′-methoxy-3′,5′-dimethylchalcone: DMC)'], indications: ['Hỗ trợ ĐTĐ type 2 (giảm đường máu)', 'Khó tiêu, đầy bụng', 'Tiêu chảy nhẹ', 'Lợi tiểu'], preparation: 'Lá/nụ khô 15–20g hãm như trà, uống thay nước', habitat: 'Mọc hoang + trồng ở miền Bắc, ven sông', imageUrls: [], keyPoints: ['DMC trong nụ vối có hoạt tính ức chế α-glucosidase, hỗ trợ ĐTĐ', 'Nước vối là đồ uống truyền thống miền Bắc', 'An toàn dài hạn'] },
    { id: 'nha-dam', nameVN: 'Nha đam (Lô hội)', scientificName: 'Aloe vera', family: 'Asphodelaceae', synonyms: ['Lô hội', 'Lưỡi hổ (sai)'], partUsed: 'Lá (gel và nhựa)', activeCompounds: ['Polysaccharid (acemannan trong gel)', 'Anthraquinon (aloin trong nhựa vàng)', 'Vitamin, khoáng chất'], indications: ['Bỏng nhẹ, vết thương ngoài da (gel)', 'Táo bón (nhựa, ít dùng do tác dụng phụ)', 'Loét miệng', 'Mỹ phẩm dưỡng da'], preparation: 'Gel tươi bôi ngoài; uống 1–2 thìa gel pha nước; tránh uống lâu dài', contraindications: ['Có thai (nhựa gây co tử cung)', 'Trẻ <12 tuổi', 'Tiêu chảy, viêm ruột'], habitat: 'Trồng làm cảnh + dược liệu khắp VN', imageUrls: [], keyPoints: ['Phân biệt GEL (trong, an toàn) vs NHỰA VÀNG (chứa aloin, nhuận tràng mạnh có thể gây tiêu chảy)', 'Bôi gel cho bỏng nhẹ và vết cháy nắng', 'Tránh uống nhựa lâu dài'] },
];

/** @param {string} id @returns {import('./types.js').Herb|undefined} */
export function getHerb(id) { return HERBS.find(h => h.id === id); }

/** @param {string} indication @returns {import('./types.js').Herb[]} */
export function getHerbsByIndication(indication) {
  const lower = indication.toLowerCase();
  return HERBS.filter(h => h.indications.some(i => i.toLowerCase().includes(lower)));
}

/** @param {string} family */
export function getHerbsByFamily(family) {
  return HERBS.filter(h => h.family === family);
}
