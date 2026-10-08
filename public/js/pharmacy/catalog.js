// Drug catalog ported từ "Danh_muc_150_thuoc_nha_thuoc_ao_GPP.xlsx" (180 thuốc).
// Layout match screenshot upstream Pharmacy-AI: 4 tủ back chi tiết theo nhóm, banner trắng bo tròn.

export const CABINETS = [
  // 4 tủ lưng quầy: 2 Rx + 2 OTC, mỗi tủ 7 ngăn. `shelfLabels` đánh dấu nhóm
  // dược lý từng ngăn (theo sơ đồ thầy Lâm gửi). Ngăn rỗng → string "".
  // ĐẢO vị trí: tủ rx_2 (phụ khoa/tim mạch…) sang TRÁI, rx_1 (thần kinh…) sang PHẢI
  // để khớp sơ đồ thầy. Giữ id rx_1/rx_2 để placement thuốc không vỡ; chỉ đổi thứ tự
  // trong mảng (scene định vị tủ theo thứ tự mảng) + slot + shortLabel.
  {
    "id": "rx_2",
    "label": "THUỐC KÊ ĐƠN Rx",
    "shortLabel": "Kê đơn 1",
    "accent": "#0d9488",
    "zone": "back",
    "slot": 0,
    "isRx": true,
    "shelves": 7,
    "shelfLabels": [
      "Thuốc tiêm & dịch truyền Rx",
      "Thuốc chống viêm Rx · Thuốc cơ, xương khớp Rx",
      "Thuốc điều trị loét dạ dày Rx",
      "Thuốc tiểu đường Rx",
      "Thuốc tim mạch Rx",
      "Thuốc tim mạch Rx",
      "Thuốc phụ khoa Rx · Thuốc tiêu hóa Rx"
    ]
  },
  {
    "id": "rx_1",
    "label": "THUỐC KÊ ĐƠN Rx",
    "shortLabel": "Kê đơn 2",
    "accent": "#0d9488",
    "zone": "back",
    "slot": 1,
    "isRx": true,
    "shelves": 7,
    "shelfLabels": [
      "Thuốc nhỏ mắt, mũi, tai Rx",
      "Thuốc kháng virus Rx · Thuốc hô hấp Rx · Vitamin & khoáng chất Rx",
      "Kháng sinh Rx",
      "Kháng sinh Rx",
      "Hormon và nội tiết Rx",
      "Hormon và nội tiết Rx",
      "Thuốc thần kinh Rx"
    ]
  },
  {
    "id": "otc_1",
    "label": "THUỐC KHÔNG KÊ ĐƠN OTC",
    "shortLabel": "OTC 1",
    "accent": "#0d9488",
    "zone": "back",
    "slot": 2,
    "isRx": false,
    "shelves": 7,
    "shelfLabels": [
      "Thuốc nhỏ mắt, mũi, tai OTC",
      "Thuốc kháng histamin OTC",
      "Thuốc hô hấp OTC",
      "Thuốc hô hấp OTC",
      "Thuốc hạ sốt giảm đau OTC",
      "Vitamin và khoáng chất OTC",
      "Vitamin và khoáng chất OTC"
    ]
  },
  {
    "id": "otc_2",
    "label": "THUỐC KHÔNG KÊ ĐƠN OTC",
    "shortLabel": "OTC 2",
    "accent": "#0d9488",
    "zone": "back",
    "slot": 3,
    "isRx": false,
    "shelves": 7,
    "shelfLabels": [
      "Thuốc có nguồn gốc dược liệu OTC",
      "Thuốc có nguồn gốc dược liệu OTC",
      "Thuốc có nguồn gốc dược liệu OTC",
      "Thuốc điều trị loét dạ dày OTC",
      "Thuốc tiêu hóa OTC",
      "Thuốc tiêu hóa OTC",
      "Thuốc phụ khoa OTC · Tránh thai OTC · Giun sán OTC"
    ]
  },
  // 3 tủ bên phải quầy: 1 tủ kiểm soát đặc biệt (thấp, cửa kính, 4 ngăn) +
  // 2 tủ "Sản phẩm này không phải là thuốc". Giữ id cũ để không vỡ
  // mapping thuốc; TODO remap drugs sang ngăn đúng.
  {
    "id": "side_herbal",
    "label": "THUỐC KIỂM SOÁT ĐẶC BIỆT",
    "shortLabel": "Kiểm soát đặc biệt",
    "accent": "#b91c1c",
    "zone": "side",
    "slot": 0,
    "isRx": true,
    "shelves": 4,
    "lowProfile": true,
    "glassDoor": true,
    "shelfLabels": [
      "",
      "Thuốc thuộc danh mục chất bị cấm và hạn chế sử dụng trong một số ngành, lĩnh vực",
      "",
      "Thuốc dạng phối hợp chứa dược chất gây nghiện, hướng thần, tiền chất"
    ]
  },
  {
    "id": "side_supp",
    "label": "SẢN PHẨM NÀY KHÔNG PHẢI LÀ THUỐC",
    "shortLabel": "Không phải thuốc 1",
    "accent": "#f59e0b",
    "zone": "side",
    "slot": 1,
    "isRx": false,
    "shelves": 7,
    "shelfLabels": [
      "Mỹ phẩm",
      "",
      "",
      "",
      "",
      "",
      "Thực phẩm chức năng"
    ]
  },
  {
    "id": "side_cosmetic",
    "label": "SẢN PHẨM NÀY KHÔNG PHẢI LÀ THUỐC",
    "shortLabel": "Không phải thuốc 2",
    "accent": "#f59e0b",
    "zone": "side",
    "slot": 2,
    "isRx": false,
    "shelves": 7,
    "shelfLabels": [
      "Mỹ phẩm",
      "",
      "",
      "",
      "",
      "",
      "Dụng cụ y tế"
    ]
  },
  {
    "id": "front_eye",
    "label": "NHỎ MẮT",
    "shortLabel": "Nhỏ mắt",
    "accent": "#14b8a6",
    "zone": "front",
    "slot": 0,
    "isRx": false,
    "shelves": 1
  },
  {
    "id": "front_nose",
    "label": "NHỎ MŨI",
    "shortLabel": "Nhỏ mũi",
    "accent": "#0ea5e9",
    "zone": "front",
    "slot": 1,
    "isRx": false,
    "shelves": 1
  },
  {
    "id": "front_topical",
    "label": "DÙNG NGOÀI",
    "shortLabel": "Dùng ngoài",
    "accent": "#7c3aed",
    "zone": "front",
    "slot": 2,
    "isRx": false,
    "shelves": 1
  }
];

export function getCabinet(id) { return CABINETS.find(c => c.id === id); }

// ALL_DRUGS — 180 thuốc giờ lưu trong DB (content_datasets collection
// 'drug-catalog'). Mảng RỖNG lúc đầu, loadDrugs() fill bằng push (KHÔNG
// reassign) để alias DRUGS + getDrug/getDrugsByCabinet/scene.js (đã import
// ALL_DRUGS) vẫn trỏ đúng tham chiếu. Gọi await loadDrugs() 1 lần trước khi
// dựng scene (xem simulation.startSimulation).
export const ALL_DRUGS = [];
let _drugsLoaded = false;
export async function loadDrugs() {
  if (_drugsLoaded) return ALL_DRUGS;
  try {
    const r = await fetch('/api/content/drug-catalog', { credentials: 'same-origin' });
    if (r.ok) {
      const items = (await r.json()).items || [];
      ALL_DRUGS.length = 0;
      ALL_DRUGS.push(...items);
      _drugsLoaded = true;
    }
  } catch { /* offline → ALL_DRUGS rỗng, scene tự xử lý */ }
  return ALL_DRUGS;
}
export const DRUGS = ALL_DRUGS;

export function getDrug(id) { return ALL_DRUGS.find(d => d.id === id); }
export function getDrugsByCabinet(cabinetId) { return ALL_DRUGS.filter(d => d.cabinetId === cabinetId); }

export const PHARMACY_INFO = {
  name: 'Nhà thuốc Thực Hành',
  address: '35 Đoàn Thị Điểm, Đống Đa, Hà Nội',
  phone: '0972560XXX',
  taxCode: '0101010101',
  gpp: 'GPP-HN-2024-0001'
};
export const VAT_RATE = 0.08;
