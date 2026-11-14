// =====================================================================
// PHARMA SORT — chế độ PHÂN LOẠI KÉO–THẢ: kéo thuốc vào đúng cột nhóm
// dược lý. Khác chế độ ghép 3 ở chỗ người chơi phải biết CHÍNH XÁC nhóm của
// từng thuốc, không thể đoán theo màu → giá trị học cao hơn.
// Dùng chung danh mục thuốc đã kiểm định của module GPP.
// =====================================================================
import { buildGroups, shortName, groupDesc } from './crush.js?v=gpp0906a';

export { shortName, groupDesc };

/** Bộ 5 nhóm cho mỗi màn — càng lên càng chuyển sang nhóm khó nhớ hơn. */
export function laneSetFor(level) {
  const all = buildGroups();
  const by = (n) => all.find(g => g.name === n);
  const SETS = [
    ['Giảm đau – hạ sốt – NSAID', 'Kháng sinh', 'Kháng histamin H1', 'Tim mạch', 'Tiêu hoá'],
    ['Kháng sinh', 'Tim mạch', 'Đái tháo đường', 'Hormon và kháng hormon', 'Tiêu hoá'],
    ['Kháng histamin H1', 'Hô hấp', 'Rối loạn lipid máu', 'Kháng sinh', 'Tim mạch'],
    ['Điều trị lao', 'Kháng virus', 'Thần kinh trung ương', 'Đái tháo đường', 'Hormon và kháng hormon'],
  ];
  const set = SETS[(level - 1) % SETS.length];
  return set.map(by).filter(Boolean);
}

export function sortLevelConfig(level) {
  const lanes = laneSetFor(level);
  // Chỉ tiêu tăng dần nhưng số lượt LUÔN dư hơn chỉ tiêu, để màn nào cũng
  // thắng được nếu nhớ đúng nhóm (trước đây màn ≥7 chỉ tiêu vượt số lượt →
  // không thể hoàn thành). Người chơi đúng 75% thắng ~92% ở mọi màn.
  const target = Math.min(30, 8 + Math.floor((level - 1) * 1.5));
  const moves  = target + Math.max(8, Math.round(target * 0.5));
  return {
    lanes,
    target,
    moves,
    // Gỡ dần gợi ý: màn đầu thẻ có màu nhóm, về sau thẻ trung tính
    showColor: level <= 3,
    // Mốc sao suy từ điểm "chơi hoàn hảo" đo bằng bot: par ≈ target×(500+30×màn)
    starAt: (par => [Math.round(par * .45), Math.round(par * .68), Math.round(par * .88)])
            (target * (500 + 30 * level)),
    // ---- Lượt gọi nhóm: mỗi lúc chỉ MỘT cột sáng, người chơi phải rà cả
    // lưới tìm thuốc thuộc nhóm đó (thay vì chỉ xử lý hàng thẻ đầu tiên).
    spotMs: Math.max(7000, 19000 - level * 1000),   // màn 1: 18s → sàn 7s
    // Mỗi lượt gọi có CHỈ TIÊU riêng: gom đủ thì được thưởng và chuyển ngay
    // sang nhóm khác — bảo đảm người chơi phải luân phiên khắp 5 nhóm.
    needPerCall: Math.min(4, 2 + Math.floor((level - 1) / 4)),
    callBonus: 250 + (level - 1) * 50,
  };
}

/** Sinh thẻ thuốc thuộc ĐÚNG một nhóm cho trước (dùng để bảo đảm lưới luôn
 *  có ít nhất một thuốc của nhóm đang được gọi). */
export function cardOfGroup(group) {
  const d = group.drugs[Math.floor(Math.random() * group.drugs.length)];
  return { group: group.name, hex: group.hex, drug: d, id: Math.random().toString(36).slice(2, 9) };
}

/** Sinh 1 thẻ thuốc ngẫu nhiên thuộc một trong các nhóm đang chơi. */
export function randomCard(lanes) {
  const g = lanes[Math.floor(Math.random() * lanes.length)];
  const d = g.drugs[Math.floor(Math.random() * g.drugs.length)];
  return { group: g.name, hex: g.hex, drug: d, id: Math.random().toString(36).slice(2, 9) };
}
