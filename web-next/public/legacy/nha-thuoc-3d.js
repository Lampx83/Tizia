// Wrap-mount cho trang Next /nha-thuoc-3d.
// Tái sử dụng NGUYÊN VĂN nội dung 2 khối inline <script type="module"> của
// public/nha-thuoc-3d.html — KHÔNG viết lại engine (Three.js nhà thuốc GPP 3D:
// buildScene, drug-placement, POS, nhãn HDSD/bao bì, đơn thuốc TT26, chấm điểm
// SEGUE, catalog 165 thuốc fetch /api/content/drug-catalog). Giữ text tiếng Việt.
//
// Khác biệt DUY NHẤT so với bản gốc:
//  - importmap (map bare specifier `three` / `three/addons/` sang CDN unpkg) VẪN
//    cần; được inject bởi Mount ('use client') TRƯỚC khi nạp file này.
//  - Đường dẫn tương đối `./js/pharmacy/simulation.js` đổi thành root-absolute
//    `/js/pharmacy/simulation.js` vì file này serve ở /legacy/ (proxy Next
//    fallback sang Express giữ nguyên asset). simulation.js lại import các sibling
//    bằng `./…` — vẫn resolve đúng vì nó nằm ở /js/pharmacy/. KHÔNG copy asset.
// ?v= phải BUMP mỗi lần sửa js/pharmacy/* — trình duyệt cache module theo URL này;
// để nguyên version cũ thì máy đã ghé sẽ chạy JS cũ mãi. Giữ khớp với
// public/nha-thuoc-3d.html (bản Express).
import { startSimulation } from '/js/pharmacy/simulation.js?v=ph0801';
import { showIntro } from '/js/pharmacy/intro.js?v=ph0801';
import { SCENARIOS } from '/js/pharmacy/scenarios.js?v=ph0801';
const params = new URLSearchParams(location.search);
const moduleId = params.get('module') || 'otc01';
// CBS 20/07 #1: màn giới thiệu Pharmacomm + chọn tình huống TRƯỚC khi vào scene.
showIntro({ moduleId, onPick: (id) => {
  // Trước đây in thẳng moduleId ("otc01", "otc02") — nay lấy tên thật của tình huống.
  document.getElementById('scenario-subtitle').textContent = SCENARIOS[id]?.title || id;
  startSimulation({ moduleId: id });
}});

// Wire độ sáng slider — chờ sim sẵn sàng (buildScene chạy trong startSimulation)
const wireExposure = () => {
  const sim = window.__sim;
  if (!sim?.setExposure) { setTimeout(wireExposure, 100); return; }
  const slider = document.getElementById('exposure-slider');
  const valueLbl = document.getElementById('exposure-value');
  const cur = sim.getExposure();
  slider.value = cur;
  valueLbl.textContent = cur.toFixed(2);
  slider.addEventListener('input', () => {
    const v = parseFloat(slider.value);
    sim.setExposure(v);
    valueLbl.textContent = v.toFixed(2);
  });
};
wireExposure();

// Sidebar collapse — bấm ⇆ để thu/mở panel bên phải; trigger resize cho renderer
const sideToggle = document.getElementById('side-toggle');
const app = document.querySelector('.app');
// Đổi icon/tooltip theo trạng thái: thu gọn → nút nổi rìa phải hiện "‹ Bảng"
// (gợi ý mở lại); mở → "⇆".
const syncSideToggle = () => {
  const collapsed = app.classList.contains('sidebar-collapsed');
  if (sideToggle) {
    sideToggle.textContent = collapsed ? '‹ Bảng' : '⇆';
    sideToggle.title = collapsed ? 'Mở lại panel bên phải' : 'Thu gọn panel bên phải';
  }
};
sideToggle?.addEventListener('click', () => {
  app.classList.toggle('sidebar-collapsed');
  syncSideToggle();
  setTimeout(() => window.dispatchEvent(new Event('resize')), 260);
});
syncSideToggle();

// Proxy buttons trong header thay cho 2 FAB gốc (sgf-fab + tts-toggle).
// FAB gốc bị ẩn bằng CSS; proxy click → click FAB gốc để mở modal/toggle.
// Header auth có thể re-render → MO không disconnect, luôn re-inject proxies.
const ensureProxiesInHeader = () => {
  // 29/07: bản Next dùng header React (header.sticky…) chứ không phải header.ev-header
  // của Express → trước đây selector trượt, proxy không được tạo, mà FAB gốc thì đã bị
  // CSS ẩn ⇒ trang KHÔNG còn lối gửi yêu cầu nào. Nhận cả hai loại header.
  const header = document.querySelector('header.ev-header') || document.querySelector('header');
  if (!header) return;
  let slot = header.querySelector('.ev-pharm-fabs');
  if (!slot) {
    slot = document.createElement('span');
    slot.className = 'ev-pharm-fabs';
    // Express có mốc #ev-eng-slot/#ev-user-wrap. Header Next thì không — append thẳng
    // vào <header> làm nút rơi xuống HÀNG THỨ HAI, đội cả app xuống; nên chèn vào đầu
    // cụm nút bên phải (.ml-auto) cho nằm cùng hàng với nút đăng nhập.
    const anchor = header.querySelector('#ev-eng-slot') || header.querySelector('#ev-user-wrap');
    const right = header.querySelector('.ml-auto');
    if (anchor) header.insertBefore(slot, anchor);
    else if (right) right.insertBefore(slot, right.firstChild);
    else header.appendChild(slot);
  }
  if (!slot.querySelector('.pf-sgf')) {
    const b = document.createElement('button');
    b.type = 'button'; b.className = 'pf-sgf'; b.title = 'Gửi đề nghị cho Ban điều hành AI';
    b.textContent = '🏛️';
    b.addEventListener('click', () => document.getElementById('sgf-fab')?.click());
    slot.appendChild(b);
  }
  if (!slot.querySelector('.pf-tts')) {
    const b = document.createElement('button');
    b.type = 'button'; b.className = 'pf-tts'; b.title = 'Bật/tắt đọc to (TTS)';
    b.textContent = '🔊';
    b.addEventListener('click', () => {
      const tts = document.querySelector('.tz-tts-toggle');
      tts?.click();
      // Sync .on class theo trạng thái tts
      setTimeout(() => b.classList.toggle('on', tts?.classList.contains('on')), 50);
    });
    slot.appendChild(b);
  }
};
ensureProxiesInHeader();
const fabMO = new MutationObserver(ensureProxiesInHeader);
fabMO.observe(document.body, { childList: true, subtree: true });
