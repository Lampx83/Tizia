// DATA seed — biển báo giao thông (QCVN 41:2019). Chỉ seed-content.mjs import.
// 21 biển × 4 nhóm (cam / nguyhiem / hieulenh / chidan). Mỗi phần tử = 1 item =
// 1 row content_datasets(collection='traffic-signs'). SVG đã được nội suy sẵn
// thành chuỗi (JSON không giữ được function) — trang fetch runtime và render y hệt.

const svgCam = (inner) => `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="45" fill="white" stroke="#dc2626" stroke-width="7"/>
      ${inner}</svg>`;
const svgNguyHiem = (inner) => `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <polygon points="50,8 92,86 8,86" fill="#fbbf24" stroke="#dc2626" stroke-width="6" stroke-linejoin="round"/>
      ${inner}</svg>`;
const svgHieuLenh = (inner) => `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="45" fill="#2563eb" stroke="white" stroke-width="2"/>
      ${inner}</svg>`;
const svgChiDan = (inner) => `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <rect x="8" y="20" width="84" height="60" rx="4" fill="#2563eb" stroke="white" stroke-width="2"/>
      ${inner}</svg>`;

export const TRAFFIC_SIGNS = [
  // ─── CẤM ───
  { id:'P101', group:'cam', name:'Đường cấm',
    meaning:'Cấm mọi phương tiện (cơ giới và thô sơ) đi vào, trừ xe ưu tiên đang làm nhiệm vụ.',
    svg: svgCam('<line x1="22" y1="50" x2="78" y2="50" stroke="#dc2626" stroke-width="8"/>') },
  { id:'P102', group:'cam', name:'Cấm đi ngược chiều',
    meaning:'Cấm các loại xe (cơ giới và thô sơ) đi vào đoạn đường đặt biển — trừ xe ưu tiên.',
    svg: svgCam('<rect x="22" y="44" width="56" height="12" fill="white" stroke="#dc2626" stroke-width="0"/>') },
  { id:'P103', group:'cam', name:'Cấm ô tô',
    meaning:'Cấm xe ô tô (kể cả mô-tô 3 bánh có thùng).',
    svg: svgCam('<text x="50" y="58" font-family="sans-serif" font-size="36" font-weight="800" text-anchor="middle" fill="#1f2937">🚗</text><line x1="20" y1="80" x2="80" y2="20" stroke="#dc2626" stroke-width="6"/>') },
  { id:'P124', group:'cam', name:'Cấm rẽ trái',
    meaning:'Cấm các phương tiện rẽ trái tại nơi đặt biển. Quay đầu cũng bị cấm theo.',
    svg: svgCam('<path d="M65 35 L40 35 L40 25 L25 50 L40 75 L40 65 L65 65 Z" fill="#1f2937"/><line x1="20" y1="80" x2="80" y2="20" stroke="#dc2626" stroke-width="6"/>') },
  { id:'P127', group:'cam', name:'Cấm vượt',
    meaning:'Cấm các loại xe cơ giới vượt nhau. Được vượt xe máy chuyên dùng và xe thô sơ.',
    svg: svgCam('<text x="35" y="62" font-size="26" fill="#1f2937">🚙</text><text x="65" y="58" font-size="22" fill="#dc2626">🚗</text>') },
  { id:'P130', group:'cam', name:'Cấm dừng và đỗ xe',
    meaning:'Cấm DỪNG và cấm ĐỖ. Hai gạch chéo X.',
    svg: svgCam('<line x1="20" y1="20" x2="80" y2="80" stroke="#dc2626" stroke-width="8"/><line x1="80" y1="20" x2="20" y2="80" stroke="#dc2626" stroke-width="8"/>') },

  // ─── NGUY HIỂM ───
  { id:'W201a', group:'nguyhiem', name:'Chỗ ngoặt nguy hiểm (trái)',
    meaning:'Báo phía trước có khúc cua nguy hiểm về bên trái — phải giảm tốc.',
    svg: svgNguyHiem('<path d="M50 70 L50 55 Q50 45 40 45 L30 45" fill="none" stroke="#1f2937" stroke-width="6" stroke-linecap="round"/><polygon points="25,38 18,45 25,52" fill="#1f2937"/>') },
  { id:'W202', group:'nguyhiem', name:'Đường nhiều chỗ ngoặt',
    meaning:'Đoạn đường có liên tiếp 2 chỗ ngoặt trở lên — phải đi chậm.',
    svg: svgNguyHiem('<path d="M30 70 Q40 60 50 65 Q60 70 70 60 Q80 50 70 40" fill="none" stroke="#1f2937" stroke-width="5" stroke-linecap="round"/>') },
  { id:'W207', group:'nguyhiem', name:'Giao nhau với đường ưu tiên',
    meaning:'Phía trước có ngã tư giao với đường ưu tiên — phải nhường đường cho xe trên đường ưu tiên.',
    svg: svgNguyHiem('<polygon points="50,35 65,55 50,75 35,55" fill="white" stroke="#1f2937" stroke-width="3"/>') },
  { id:'W210', group:'nguyhiem', name:'Đường sắt cắt qua',
    meaning:'Phía trước có đường sắt cắt ngang KHÔNG có rào chắn — phải dừng quan sát.',
    svg: svgNguyHiem('<line x1="32" y1="45" x2="68" y2="65" stroke="#1f2937" stroke-width="4"/><line x1="68" y1="45" x2="32" y2="65" stroke="#1f2937" stroke-width="4"/><circle cx="50" cy="55" r="3" fill="#1f2937"/>') },
  { id:'W219', group:'nguyhiem', name:'Đường có dốc xuống nguy hiểm',
    meaning:'Đoạn đường dốc xuống — số phần trăm chỉ độ dốc. Giảm tốc, đi số thấp.',
    svg: svgNguyHiem('<polygon points="25,55 70,75 70,55" fill="#1f2937"/><text x="40" y="50" font-size="14" font-weight="700" fill="#1f2937">10%</text>') },
  { id:'W224', group:'nguyhiem', name:'Người đi bộ cắt ngang',
    meaning:'Có vạch sang đường cho người đi bộ phía trước — phải giảm tốc, nhường đường.',
    svg: svgNguyHiem('<text x="50" y="68" font-size="34" text-anchor="middle">🚶</text>') },

  // ─── HIỆU LỆNH ───
  { id:'R301a', group:'hieulenh', name:'Hướng đi phải theo: thẳng',
    meaning:'Các xe chỉ được đi thẳng — không được rẽ.',
    svg: svgHieuLenh('<polygon points="50,25 60,40 53,40 53,75 47,75 47,40 40,40" fill="white"/>') },
  { id:'R302', group:'hieulenh', name:'Hướng phải đi vòng chướng ngại vật',
    meaning:'Phương tiện phải vòng qua chướng ngại vật theo hướng mũi tên.',
    svg: svgHieuLenh('<path d="M35 50 Q50 30 65 50" fill="none" stroke="white" stroke-width="5"/><polygon points="65,55 75,50 65,45" fill="white"/>') },
  { id:'R303', group:'hieulenh', name:'Nơi giao nhau chạy theo vòng xuyến',
    meaning:'Xe phải đi vòng theo chiều mũi tên (đảo tròn) — nhường xe đã trong vòng xuyến.',
    svg: svgHieuLenh('<circle cx="50" cy="50" r="20" fill="none" stroke="white" stroke-width="4" stroke-dasharray="10 5"/><polygon points="70,38 78,42 70,46" fill="white"/>') },
  { id:'R304', group:'hieulenh', name:'Đường dành cho xe thô sơ',
    meaning:'Đường chỉ dành cho xe đạp + xe thô sơ.',
    svg: svgHieuLenh('<text x="50" y="68" font-size="40" text-anchor="middle">🚲</text>') },
  { id:'R305', group:'hieulenh', name:'Đường dành cho người đi bộ',
    meaning:'Đường chỉ dành cho người đi bộ — cấm xe.',
    svg: svgHieuLenh('<text x="50" y="68" font-size="40" text-anchor="middle">🚶</text>') },

  // ─── CHỈ DẪN ───
  { id:'I401', group:'chidan', name:'Bắt đầu đường ưu tiên',
    meaning:'Báo bắt đầu đoạn đường có quyền ưu tiên — xe trên đường khác phải nhường.',
    svg: svgChiDan('<polygon points="50,32 65,50 50,68 35,50" fill="#fbbf24" stroke="white" stroke-width="2"/>') },
  { id:'I423a', group:'chidan', name:'Đường cho người đi bộ sang ngang',
    meaning:'Báo có vạch kẻ đường cho người đi bộ — phương tiện phải nhường.',
    svg: svgChiDan('<text x="50" y="62" font-size="30" text-anchor="middle">🚶</text>') },
  { id:'I425', group:'chidan', name:'Bệnh viện',
    meaning:'Báo có bệnh viện gần đó — xe phải đi chậm, không bóp còi.',
    svg: svgChiDan('<rect x="38" y="32" width="24" height="36" fill="white"/><rect x="44" y="44" width="12" height="4" fill="#dc2626"/><rect x="48" y="40" width="4" height="12" fill="#dc2626"/>') },
  { id:'I431', group:'chidan', name:'Chỗ đỗ xe',
    meaning:'Bãi đỗ xe được phép. Có thể có thêm biển phụ ghi thời gian/loại xe.',
    svg: svgChiDan('<text x="50" y="68" font-size="42" font-weight="900" text-anchor="middle" fill="white">P</text>') },
];
