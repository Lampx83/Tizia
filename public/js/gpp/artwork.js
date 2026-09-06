// =====================================================================
// PHARMA CRUSH — bộ vẽ hình thuốc (SVG). Tách riêng để phần game gọn.
// Mục tiêu: hộp thuốc / vỉ thuốc / viên nang trông GIỐNG THẬT, sắc nét ở mọi
// kích thước, có khối 3D và ánh sáng nhất quán (nguồn sáng từ trên–trái).
// =====================================================================

/** Làm sáng/tối hex. */
export function shade(hex, pct) {
  const n = parseInt(hex.slice(1), 16);
  const f = (v) => Math.max(0, Math.min(255, Math.round(v + (pct > 0 ? (255 - v) * pct : v * pct))));
  return '#' + [f(n >> 16), f((n >> 8) & 255), f(n & 255)].map(v => v.toString(16).padStart(2, '0')).join('');
}

/* ---------------------------------------------------------------
   VỈ THUỐC (blister) — nền nhôm dập nổi, các viên nằm trong ô lồi.
   Dùng cho viên nén / viên bao phim.
----------------------------------------------------------------*/
function blister(hex, id) {
  const dark = shade(hex, -0.30), light = shade(hex, 0.42);
  const pill = (cx) => `
    <g>
      <ellipse cx="${cx}" cy="15.6" rx="7.4" ry="6.4" fill="rgba(0,0,0,.28)"/>
      <circle cx="${cx}" cy="14.4" r="7.2" fill="url(#pf${id})"/>
      <path d="M${cx - 5.4} 14.4 h10.8" stroke="${dark}" stroke-width="1.5" stroke-linecap="round" opacity=".55"/>
      <ellipse cx="${cx - 2.3}" cy="11.4" rx="3.1" ry="2" fill="#fff" opacity=".78"/>
    </g>`;
  return `
  <defs>
    <linearGradient id="al${id}" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#fdfefe"/><stop offset=".42" stop-color="#d8dfe8"/>
      <stop offset=".58" stop-color="#eef2f6"/><stop offset="1" stop-color="#c3ccd8"/>
    </linearGradient>
    <radialGradient id="pf${id}" cx="34%" cy="28%" r="78%">
      <stop offset="0" stop-color="${light}"/><stop offset=".62" stop-color="${hex}"/><stop offset="1" stop-color="${dark}"/>
    </radialGradient>
  </defs>
  <rect x="1.5" y="3" width="61" height="23" rx="4" fill="url(#al${id})" stroke="#aab6c4" stroke-width="1"/>
  <g stroke="#b8c3d0" stroke-width=".7" opacity=".75">
    <line x1="1.5" y1="7" x2="62.5" y2="7"/><line x1="1.5" y1="22" x2="62.5" y2="22"/>
  </g>
  ${pill(14)}${pill(32)}${pill(50)}
  <rect x="1.5" y="3" width="61" height="9" rx="4" fill="#fff" opacity=".28"/>`;
}

/* ---------------------------------------------------------------
   VIÊN NANG (capsule) — hai nửa lồng nhau, bóng gloss chạy dọc.
----------------------------------------------------------------*/
function capsule(hex, id) {
  const dark = shade(hex, -0.34), light = shade(hex, 0.40);
  return `
  <defs>
    <linearGradient id="cb${id}" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${light}"/><stop offset=".5" stop-color="${hex}"/><stop offset="1" stop-color="${dark}"/>
    </linearGradient>
    <linearGradient id="cw${id}" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#ffffff"/><stop offset=".55" stop-color="#f3f6fa"/><stop offset="1" stop-color="#d5dde7"/>
    </linearGradient>
  </defs>
  <g>
    <rect x="5" y="9.5" width="54" height="15" rx="7.5" fill="rgba(0,0,0,.30)"/>
    <rect x="4" y="7.5" width="54" height="15" rx="7.5" fill="url(#cw${id})" stroke="#b9c4d1" stroke-width=".8"/>
    <path d="M4 15 a7.5 7.5 0 0 1 7.5-7.5 h20 v15 h-20 A7.5 7.5 0 0 1 4 15z" fill="url(#cb${id})"/>
    <path d="M31.5 7.5 h1.6 v15 h-1.6z" fill="${dark}" opacity=".45"/>
    <rect x="8" y="10" width="44" height="3.4" rx="1.7" fill="#fff" opacity=".55"/>
  </g>`;
}

/* ---------------------------------------------------------------
   LỌ TIÊM (vial) — thân thuỷ tinh trong, nút nhôm, nhãn màu.
----------------------------------------------------------------*/
function vial(hex, id) {
  const dark = shade(hex, -0.32);
  return `
  <defs>
    <linearGradient id="vg${id}" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#ffffff" stop-opacity=".92"/><stop offset=".45" stop-color="#dfe9f2" stop-opacity=".75"/>
      <stop offset="1" stop-color="#b7c6d6" stop-opacity=".85"/>
    </linearGradient>
  </defs>
  <g transform="translate(20,0)">
    <rect x="5" y="1.5" width="14" height="4.5" rx="1.6" fill="#c6ced8" stroke="#a7b2bf" stroke-width=".7"/>
    <rect x="7.5" y="5.5" width="9" height="2.5" fill="#aab5c2"/>
    <path d="M4 8 h16 v13.5 a3.5 3.5 0 0 1-3.5 3.5 h-9 A3.5 3.5 0 0 1 4 21.5z" fill="url(#vg${id})" stroke="#9fb0c0" stroke-width=".8"/>
    <path d="M4 15 h16 v6.5 a3.5 3.5 0 0 1-3.5 3.5 h-9 A3.5 3.5 0 0 1 4 21.5z" fill="${hex}" opacity=".85"/>
    <rect x="4" y="15" width="16" height="1.2" fill="${dark}" opacity=".6"/>
    <rect x="6.4" y="9" width="2.6" height="14" rx="1.3" fill="#fff" opacity=".6"/>
  </g>`;
}

/* ---------------------------------------------------------------
   GÓI BỘT (sachet) — mép răng cưa, nhãn màu, hạt bột.
----------------------------------------------------------------*/
function sachet(hex, id) {
  const dark = shade(hex, -0.30);
  let zig = 'M4 4 ';
  for (let x = 4; x < 60; x += 4) zig += `L${x + 2} 6 L${x + 4} 4 `;
  return `
  <g>
    <rect x="4" y="4" width="56" height="21" rx="2" fill="#f4f7fa" stroke="#b9c4d1" stroke-width=".9"/>
    <rect x="4" y="4" width="56" height="9" fill="${hex}"/>
    <rect x="4" y="12" width="56" height="1.4" fill="${dark}" opacity=".7"/>
    <path d="${zig}" fill="none" stroke="#b9c4d1" stroke-width=".9"/>
    <g fill="${hex}" opacity=".45">
      <circle cx="18" cy="19" r="2"/><circle cx="27" cy="20.5" r="1.6"/><circle cx="36" cy="18.6" r="2.1"/><circle cx="45" cy="20.2" r="1.7"/>
    </g>
    <rect x="4" y="4" width="56" height="4" fill="#fff" opacity=".25"/>
  </g>`;
}

/* ---------------------------------------------------------------
   ỐNG VIÊN SỦI (tube) — ống nhựa nắp màu, viên sủi tròn.
----------------------------------------------------------------*/
function tube(hex, id) {
  const dark = shade(hex, -0.30), light = shade(hex, 0.35);
  return `
  <defs><linearGradient id="tb${id}" x1="0" y1="0" x2="1" y2="0">
    <stop offset="0" stop-color="#ffffff"/><stop offset=".4" stop-color="#eef2f7"/><stop offset="1" stop-color="#c9d3de"/>
  </linearGradient></defs>
  <g transform="translate(18,0)">
    <rect x="4" y="1.5" width="20" height="6" rx="2.2" fill="${hex}" stroke="${dark}" stroke-width=".7"/>
    <rect x="4" y="7" width="20" height="18" rx="2.4" fill="url(#tb${id})" stroke="#adb9c6" stroke-width=".8"/>
    <circle cx="14" cy="16" r="5.4" fill="${light}" stroke="${hex}" stroke-width="1.1"/>
    <path d="M11 16 h6 M14 13 v6" stroke="#fff" stroke-width="1.3" stroke-linecap="round" opacity=".85"/>
    <rect x="6" y="9" width="2.6" height="13" rx="1.3" fill="#fff" opacity=".65"/>
  </g>`;
}

let uid = 0;
/**
 * Vẽ hình thuốc theo dạng bào chế.
 * @param {object} drug  bản ghi thuốc (cần .dang)
 * @param {string} hex   màu nhóm dược lý
 * @param {number} w     bề rộng mong muốn (px)
 */
export function drugArt(drug, hex, w) {
  const id = 'a' + (uid++);
  const f = (drug.dang || '').toLowerCase();
  let body;
  if (f.includes('nang')) body = capsule(hex, id);
  else if (f.includes('tiêm')) body = vial(hex, id);
  else if (f.includes('bột') || f.includes('gói')) body = sachet(hex, id);
  else if (f.includes('sủi')) body = tube(hex, id);
  else body = blister(hex, id);
  const h = Math.round(w * 0.44);
  return `<svg width="${w}" height="${h}" viewBox="0 0 64 28" xmlns="http://www.w3.org/2000/svg"
    style="display:block;filter:drop-shadow(0 2px 3px rgba(10,30,60,.38))">${body}</svg>`;
}

/* =====================================================================
   ICON NHÓM DƯỢC LÝ — kiểu sticker nhiều màu: mỗi icon có gradient 2 tông,
   viền trắng dày, điểm nhấn sáng và màu phụ tương phản. Nhìn rõ ở cỡ nhỏ.
   ===================================================================== */
let iid = 0;

/** Sinh cặp gradient (sáng→đậm) + viền trắng dùng chung cho các icon. */
function gdefs(id, c) {
  const L = shade(c, 0.42), D = shade(c, -0.30), DD = shade(c, -0.5);
  return {
    L, D, DD,
    defs: `<defs>
      <linearGradient id="g${id}" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="${L}"/><stop offset=".52" stop-color="${c}"/><stop offset="1" stop-color="${D}"/>
      </linearGradient>
      <radialGradient id="h${id}" cx="34%" cy="26%" r="62%">
        <stop offset="0" stop-color="#fff" stop-opacity=".85"/><stop offset="1" stop-color="#fff" stop-opacity="0"/>
      </radialGradient>
    </defs>`,
  };
}
const W = 'stroke="#fff" stroke-width="2.6" stroke-linejoin="round" stroke-linecap="round"';

const ICONS = {
  // Bia ngắm — vòng đỏ, vành trắng, tâm đậm, tia sáng vàng
  'Giảm đau – hạ sốt – NSAID': (c, id, g) => `
    <circle cx="20" cy="21" r="15" fill="${g.DD}" opacity=".22"/>
    <circle cx="20" cy="20" r="14.5" fill="url(#g${id})" ${W}/>
    <circle cx="20" cy="20" r="9.6" fill="#fff"/>
    <circle cx="20" cy="20" r="6.4" fill="url(#g${id})"/>
    <circle cx="20" cy="20" r="2.9" fill="#fff"/>
    <path d="M31 9l-8.4 8.4" stroke="#ffd44d" stroke-width="3.4" stroke-linecap="round"/>
    <path d="M28.4 6.2l1.2 3.6 3.6 1.2-3.6 1.2-1.2 3.6-1.2-3.6L23.6 11l3.6-1.2z" fill="#ffd44d" stroke="#fff" stroke-width="1.1"/>
    <ellipse cx="15" cy="13" rx="5" ry="3.4" fill="url(#h${id})"/>`,

  // Khiên + chữ thập cứu thương
  'Kháng sinh': (c, id, g) => `
    <path d="M20 4.5l12.5 4.6v10.4c0 8.2-5.6 13.3-12.5 16-6.9-2.7-12.5-7.8-12.5-16V9.1z" fill="url(#g${id})" ${W}/>
    <path d="M17.6 12.6h4.8v4.9h4.9v4.8h-4.9v4.9h-4.8v-4.9h-4.9v-4.8h4.9z" fill="#fff"/>
    <path d="M20 4.5l12.5 4.6v10.4c0 8.2-5.6 13.3-12.5 16" fill="#000" opacity=".10"/>
    <ellipse cx="14.6" cy="11.6" rx="4.4" ry="3" fill="url(#h${id})"/>`,

  // Bông hoa dị ứng — cánh tím, nhuỵ vàng
  'Kháng histamin H1': (c, id, g) => {
    const petals = [0, 60, 120, 180, 240, 300].map(a =>
      `<ellipse cx="20" cy="9.6" rx="4.9" ry="7.4" fill="url(#g${id})" ${W} transform="rotate(${a} 20 20)"/>`).join('');
    return `${petals}
      <circle cx="20" cy="20" r="5.6" fill="#ffd44d" stroke="#fff" stroke-width="2.2"/>
      <circle cx="18.4" cy="18.4" r="1.7" fill="#fff" opacity=".9"/>`;
  },

  // Dạ dày
  'Tiêu hoá': (c, id, g) => `
    <path d="M15.5 5.5v5.2c0 3.4 2.3 4.2 4.9 5.2 4.2 1.6 7.6 4 7.6 8.6 0 5.2-4.2 9-9.4 9-4.6 0-8.4-2.8-9.1-6.6"
      fill="none" stroke="#fff" stroke-width="7.4" stroke-linecap="round"/>
    <path d="M15.5 5.5v5.2c0 3.4 2.3 4.2 4.9 5.2 4.2 1.6 7.6 4 7.6 8.6 0 5.2-4.2 9-9.4 9-4.6 0-8.4-2.8-9.1-6.6"
      fill="none" stroke="url(#g${id})" stroke-width="4.6" stroke-linecap="round"/>
    <circle cx="28.5" cy="9" r="3.6" fill="#ffd44d" stroke="#fff" stroke-width="2"/>
    <circle cx="27.4" cy="8" r="1.2" fill="#fff" opacity=".9"/>`,

  // Trái tim + nhịp
  'Tim mạch': (c, id, g) => `
    <path d="M20 34.5S6.5 26 6.5 16.6A7.4 7.4 0 0 1 20 12.4 7.4 7.4 0 0 1 33.5 16.6C33.5 26 20 34.5 20 34.5z"
      fill="url(#g${id})" ${W}/>
    <path d="M8.5 20.4h5.1l2.4-4.4 3.7 8.8 3-5.6 2 3.4h6.8" fill="none" stroke="#fff" stroke-width="2.7"
      stroke-linecap="round" stroke-linejoin="round"/>
    <ellipse cx="14" cy="16.4" rx="4.6" ry="3" fill="url(#h${id})"/>`,

  // Giọt máu + que thử đường huyết
  'Đái tháo đường': (c, id, g) => `
    <path d="M20 4.5c6.6 8.6 11 13 11 18.4A11 11 0 0 1 9 22.9C9 17.5 13.4 13.1 20 4.5z" fill="url(#g${id})" ${W}/>
    <path d="M15.6 23.2h8.8M20 18.8v8.8" stroke="#fff" stroke-width="3.1" stroke-linecap="round"/>
    <circle cx="29.5" cy="10.5" r="3.4" fill="#ffd44d" stroke="#fff" stroke-width="1.9"/>
    <ellipse cx="15.6" cy="14.6" rx="3.6" ry="2.6" fill="url(#h${id})"/>`,

  // Bình nón hormon
  'Hormon và kháng hormon': (c, id, g) => `
    <path d="M15.4 5h9.2v7.6l7 14.2a5 5 0 0 1-4.5 7.2H12.9a5 5 0 0 1-4.5-7.2l7-14.2z" fill="url(#g${id})" ${W}/>
    <path d="M12.6 5h14.8" stroke="#fff" stroke-width="3.4" stroke-linecap="round"/>
    <circle cx="17" cy="26.6" r="2.7" fill="#ffd44d" stroke="#fff" stroke-width="1.5"/>
    <circle cx="23.4" cy="29.4" r="2" fill="#fff" opacity=".92"/>
    <circle cx="22" cy="23.4" r="1.5" fill="#fff" opacity=".7"/>`,

  // Giọt mỡ máu trong mạch
  'Rối loạn lipid máu': (c, id, g) => `
    <circle cx="20" cy="20" r="14.6" fill="url(#g${id})" ${W}/>
    <circle cx="16.4" cy="17.2" r="4.4" fill="#ffe27a" stroke="#fff" stroke-width="1.7"/>
    <circle cx="24.4" cy="22.6" r="5.4" fill="#ffd44d" stroke="#fff" stroke-width="1.7"/>
    <circle cx="16.8" cy="26.4" r="3" fill="#fff" opacity=".85"/>
    <ellipse cx="14.4" cy="12.6" rx="4.6" ry="3" fill="url(#h${id})"/>`,

  // Hai lá phổi
  'Hô hấp': (c, id, g) => `
    <path d="M20 6v13" stroke="#fff" stroke-width="4.4" stroke-linecap="round"/>
    <path d="M20 6v13" stroke="${g.D}" stroke-width="2.2" stroke-linecap="round"/>
    <path d="M19 19.4c0-5.4-4.6-8.6-8-8.6-3.2 0-5.4 3.2-5.4 9.6 0 5.6 2.4 11.6 6.6 11.6 3.4 0 6.8-3.4 6.8-8.6z"
      fill="url(#g${id})" ${W}/>
    <path d="M21 19.4c0-5.4 4.6-8.6 8-8.6 3.2 0 5.4 3.2 5.4 9.6 0 5.6-2.4 11.6-6.6 11.6-3.4 0-6.8-3.4-6.8-8.6z"
      fill="url(#g${id})" ${W}/>
    <circle cx="12.6" cy="21.6" r="2.2" fill="#fff" opacity=".8"/>
    <circle cx="27.4" cy="21.6" r="2.2" fill="#fff" opacity=".8"/>`,

  // Vi khuẩn lao hình que
  'Điều trị lao': (c, id, g) => `
    <rect x="6.6" y="24" width="17" height="8.4" rx="4.2" fill="url(#g${id})" ${W} transform="rotate(-32 15 28)"/>
    <rect x="17.6" y="7" width="17" height="8.4" rx="4.2" fill="url(#g${id})" ${W} transform="rotate(-32 26 11)"/>
    <circle cx="12.6" cy="27.6" r="1.7" fill="#ffd44d"/><circle cx="17.4" cy="24.6" r="1.4" fill="#fff" opacity=".85"/>
    <circle cx="23.6" cy="13.6" r="1.7" fill="#ffd44d"/><circle cx="28.4" cy="10.4" r="1.4" fill="#fff" opacity=".85"/>`,

  // Virus có gai
  'Kháng virus': (c, id, g) => `
    <g stroke="#fff" stroke-width="4.6" stroke-linecap="round">
      <path d="M20 7.4V3M20 37v-4.4M7.4 20H3M37 20h-4.4M11.2 11.2 8.1 8.1M31.9 31.9l-3.1-3.1M28.8 11.2l3.1-3.1M11.2 28.8l-3.1 3.1"/></g>
    <g stroke="${g.D}" stroke-width="2.4" stroke-linecap="round">
      <path d="M20 7.4V3.6M20 36.4v-3.8M7.4 20H3.6M36.4 20h-3.8M11.2 11.2 8.6 8.6M31.4 31.4l-2.6-2.6M28.8 11.2l2.6-2.6M11.2 28.8l-2.6 2.6"/></g>
    <circle cx="20" cy="20" r="11" fill="url(#g${id})" ${W}/>
    <circle cx="16.4" cy="18" r="2.5" fill="#ffd44d"/><circle cx="23.4" cy="23" r="2.1" fill="#fff" opacity=".9"/>
    <circle cx="23" cy="16.4" r="1.5" fill="#fff" opacity=".7"/>`,

  // Bộ não
  'Thần kinh trung ương': (c, id, g) => `
    <path d="M18.6 6.2a6.6 6.6 0 0 0-6.6 6 5.4 5.4 0 0 0-1.2 9.9c-.2 4.4 3 7.6 7.4 7.6h.4z" fill="url(#g${id})" ${W}/>
    <path d="M21.4 6.2a6.6 6.6 0 0 1 6.6 6 5.4 5.4 0 0 1 1.2 9.9c.2 4.4-3 7.6-7.4 7.6h-.4z" fill="url(#g${id})" ${W}/>
    <path d="M20 6v24" stroke="#fff" stroke-width="2.4" stroke-linecap="round"/>
    <path d="M14.6 13.4c2 .6 3 2 3 3.8M25.4 13.4c-2 .6-3 2-3 3.8M14.6 23.4c2-.6 3.4-1.4 3.4-3.4M25.4 23.4c-2-.6-3.4-1.4-3.4-3.4"
      fill="none" stroke="#fff" stroke-width="1.9" stroke-linecap="round" opacity=".9"/>
    <circle cx="20" cy="32.6" r="3" fill="#ffd44d" stroke="#fff" stroke-width="1.8"/>`,
};

/** SVG icon của một nhóm dược lý (kích thước px). */
export function groupIcon(groupName, color, size) {
  const id = 'i' + (iid++);
  const g = gdefs(id, color);
  const f = ICONS[groupName];
  const body = f ? f(color, id, g)
    : `<circle cx="20" cy="20" r="13" fill="url(#g${id})" ${W}/>`;
  return `<svg width="${size}" height="${size}" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"
    style="display:block;overflow:visible;filter:drop-shadow(0 1.5px 1.5px rgba(20,40,80,.28))">${g.defs}${body}</svg>`;
}
