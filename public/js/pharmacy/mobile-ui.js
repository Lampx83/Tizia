// Vỏ giao diện MOBILE cho nhà thuốc 3D — chỉ bật ở ≤820px.
//
// VÌ SAO CẦN: đo thực tế trên màn 375px (canvas còn 349×453) → mỗi hộp thuốc chỉ
// rộng ~6.6px (nhỏ nhất 2px), trong khi vùng chạm tối thiểu là 44px. Chọn góc nhìn
// tủ cũng chỉ lên ~7.3px vì vẫn hiện cả tủ 19 hộp ngang. Đầu ngón tay phủ ~44px =
// trùm ~7 hộp → KHÔNG thể chạm trúng hộp mong muốn. Đây là giới hạn vật lý (358
// thuốc trên canvas 349px), layout/zoom không cứu được. Cách duy nhất là ĐỪNG bắt
// người dùng chạm hộp nhỏ:
//   • Ngăn kéo "Chọn thuốc" — tìm/duyệt danh sách (dòng 48px) → chạm 1 dòng là
//     camera bay tới (focusDrug đưa hộp 6.6px → ~37px) + mở thẳng cửa sổ thuốc.
//   • Panel hội thoại thu về bottom sheet mở bằng tab → canvas 3D chiếm gần hết màn.
//
// ĐỂ Ở JS (tự chèn <style>) chứ không nhét CSS vào trang, vì trang này được phục vụ
// ở HAI nơi: Express public/nha-thuoc-3d.html và Next web-next/app/nha-thuoc-3d/
// page.tsx (bản người dùng thật). Để ở đây thì sửa 1 lần chạy cả hai, khỏi lệch.

const MQ = '(max-width: 820px)';
const TABS_H = 56;

const esc = (s) => String(s ?? '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
// Bỏ dấu để gõ "amoxi" vẫn ra "Amoxicillin", "khang sinh" ra "kháng sinh".
const norm = (s) => String(s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/g, 'd');

function injectStyle() {
  if (document.getElementById('mb-ui-style')) return;
  const st = document.createElement('style');
  st.id = 'mb-ui-style';
  st.textContent = `
  @media ${MQ} {
    /* Canvas 3D chiếm gần hết màn: .side rời khỏi luồng grid (thành sheet) nên
       grid chỉ còn 1 hàng = khung cảnh. Chiều cao .app do JS set (fitApp) vì
       chiều cao header khác nhau giữa bản Express và bản Next. */
    .app { grid-template-rows: 1fr !important; overflow: hidden !important; padding-bottom: 0 !important; }

    /* ── Thanh tab dưới ── */
    .mb-tabs {
      position: fixed; left: 0; right: 0; bottom: 0; z-index: 200;
      height: ${TABS_H}px; display: flex; align-items: stretch;
      background: rgba(15,23,42,0.97); border-top: 1px solid #334155;
      padding-bottom: env(safe-area-inset-bottom, 0px);
      backdrop-filter: blur(8px);
    }
    .mb-tab {
      flex: 1 1 0; display: flex; align-items: center; justify-content: center; gap: 7px;
      background: none; border: 0; color: #cbd5e1; font: inherit; font-size: 13px; font-weight: 600;
      cursor: pointer; position: relative; min-height: 44px;
    }
    .mb-tab .mb-tab-ico { font-size: 17px; }
    .mb-tab.is-on { color: #38bdf8; }
    .mb-tab + .mb-tab { border-left: 1px solid #1e293b; }
    /* Chấm báo khách hàng vừa nhắn khi đang đóng panel */
    .mb-dot {
      position: absolute; top: 8px; left: 50%; margin-left: 26px;
      width: 9px; height: 9px; border-radius: 50%; background: #f43f5e;
      box-shadow: 0 0 0 2px rgba(15,23,42,0.97);
    }

    /* ── Bottom sheet dùng chung (ngăn kéo thuốc + panel hội thoại) ── */
    .mb-sheet {
      position: fixed !important; left: 0 !important; right: 0 !important;
      bottom: ${TABS_H}px !important; top: auto !important;
      height: 74vh !important; max-height: 74vh; z-index: 190;
      margin: 0 !important; border-radius: 16px 16px 0 0 !important;
      border: 1px solid #334155 !important; border-bottom: 0 !important;
      background: var(--card, #111827); box-shadow: 0 -12px 40px rgba(0,0,0,0.55);
      transform: translateY(112%); transition: transform 0.28s ease;
      overflow: hidden !important; display: flex !important; flex-direction: column !important;
    }
    .mb-sheet.is-open { transform: translateY(0); }
    /* Panel hội thoại gốc (.side) vốn tự cuộn — giữ, chỉ chừa chỗ cho tay nắm */
    .mb-sheet-side { padding-top: 20px !important; overflow-y: auto !important; }
    /* Tay nắm kéo */
    .mb-sheet::before {
      content: ''; position: absolute; top: 7px; left: 50%; transform: translateX(-50%);
      width: 40px; height: 4px; border-radius: 999px; background: #475569;
    }

    /* ── Ngăn kéo chọn thuốc ── */
    .mb-drug-head { flex: 0 0 auto; padding: 18px 14px 10px; border-bottom: 1px solid #1e293b; }
    .mb-drug-search {
      width: 100%; padding: 11px 12px; font-size: 16px; /* ≥16px: iOS không auto-zoom */
      background: rgba(255,255,255,0.06); color: #f1f5f9;
      border: 1px solid #334155; border-radius: 10px; outline: none; font-family: inherit;
    }
    .mb-drug-search:focus { border-color: #38bdf8; }
    .mb-drug-count { font-size: 11.5px; color: #94a3b8; padding: 7px 2px 0; }
    .mb-drug-list { flex: 1 1 auto; overflow-y: auto; -webkit-overflow-scrolling: touch; }
    .mb-grp {
      position: sticky; top: 0; z-index: 1; padding: 7px 14px;
      background: #0b1220; color: #7dd3fc; font-size: 11.5px; font-weight: 700;
      border-bottom: 1px solid #1e293b;
    }
    .mb-row {
      display: flex; align-items: center; gap: 10px; width: 100%;
      min-height: 48px; padding: 9px 14px; text-align: left;
      background: none; border: 0; border-bottom: 1px solid #1e293b;
      color: #e2e8f0; font: inherit; cursor: pointer;
    }
    .mb-row:active { background: rgba(56,189,248,0.14); }
    .mb-row-acc { flex: 0 0 auto; display: block; width: 4px; height: 30px; border-radius: 3px; background: #334155; }
    /* display:block + min-width:0 BẮT BUỘC: <span> inline thì overflow/ellipsis
       KHÔNG có tác dụng → tên thuốc dài đẩy hàng rộng ra (đo được 657px trong
       khung 373px) và ngăn kéo cuộn ngang. */
    .mb-row-main { flex: 1 1 auto; min-width: 0; display: flex; flex-direction: column; gap: 2px; }
    .mb-row-name { display: block; min-width: 0; font-size: 14px; font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .mb-row-sub { display: block; min-width: 0; font-size: 11.5px; color: #94a3b8; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .mb-row-rx {
      flex: 0 0 auto; font-size: 10px; font-weight: 800; padding: 2px 5px; border-radius: 4px;
      background: #b91c1c; color: #fef2f2;
    }
    .mb-row-stock { flex: 0 0 auto; font-size: 11px; color: #64748b; text-align: right; }
    .mb-empty { padding: 26px 14px; text-align: center; color: #94a3b8; font-size: 13px; }

    /* ── Bảng "thuốc quanh chỗ chạm" ── cao theo nội dung, thấp hơn ngăn kéo */
    .mb-near-sheet { height: auto !important; max-height: 56vh !important; }
    .mb-near-head {
      flex: 0 0 auto; display: flex; align-items: center; gap: 8px;
      padding: 18px 12px 9px 14px; border-bottom: 1px solid #1e293b;
      font-size: 13px; font-weight: 700; color: #e2e8f0;
    }
    .mb-near-head small { font-weight: 400; color: #94a3b8; font-size: 11.5px; }
    .mb-near-close {
      margin-left: auto; flex: 0 0 auto; width: 34px; height: 34px; border-radius: 8px;
      background: rgba(255,255,255,0.06); border: 1px solid #334155; color: #cbd5e1;
      font-size: 14px; cursor: pointer; font-family: inherit;
    }
    .mb-near-list { flex: 1 1 auto; overflow-y: auto; }

    /* ── Chế độ NHÌN QUANH (magic window) ── */
    .mb-vr-btn {
      position: fixed; top: 10px; left: 10px; z-index: 160;
      display: flex; align-items: center; gap: 6px;
      padding: 9px 13px; min-height: 40px; border-radius: 999px;
      background: rgba(139,92,246,0.92); color: #faf5ff; border: 1px solid #8b5cf6;
      font: inherit; font-size: 12.5px; font-weight: 700; cursor: pointer;
      box-shadow: 0 4px 14px rgba(0,0,0,0.35);
    }
    .mb-vr {
      position: fixed; left: 0; right: 0; top: 0; bottom: ${TABS_H}px; z-index: 170;
      /* trong suốt để thấy cảnh 3D; chỉ bắt chạm để chọn thuốc đang ngắm */
    }
    .mb-vr-reticle {
      position: absolute; left: 50%; top: 50%; width: 46px; height: 46px;
      transform: translate(-50%, -50%); border-radius: 50%;
      border: 2px solid rgba(56,189,248,0.9); box-shadow: 0 0 0 2px rgba(0,0,0,0.35);
      pointer-events: none;
    }
    .mb-vr-reticle::after {
      content: ''; position: absolute; left: 50%; top: 50%; width: 5px; height: 5px;
      transform: translate(-50%, -50%); border-radius: 50%; background: #38bdf8;
    }
    .mb-vr-exit {
      position: absolute; top: 10px; right: 10px; z-index: 2;
      padding: 9px 14px; min-height: 40px; border-radius: 999px;
      background: rgba(15,23,42,0.9); color: #e2e8f0; border: 1px solid #475569;
      font: inherit; font-size: 13px; font-weight: 700; cursor: pointer;
    }
    .mb-vr-hint {
      position: absolute; left: 50%; bottom: 16px; transform: translateX(-50%);
      max-width: 88%; text-align: center; padding: 8px 14px; border-radius: 999px;
      background: rgba(15,23,42,0.82); color: #cbd5e1; border: 1px solid rgba(148,163,184,0.3);
      font-size: 12.5px; pointer-events: none; transition: color .2s;
    }
    .mb-vr-hint.is-warn { color: #fbbf24; }

    /* Thanh điều khiển nổi phải nhường chỗ cho tab bar */
    .cam-bar { bottom: ${TABS_H + 8}px !important; }
    /* Ô tìm nổi trên canvas thành thừa (đã có ngăn kéo tìm tốt hơn) */
    .drug-search { display: none !important; }
    .light-bar { top: 8px !important; }
  }`;
  document.head.appendChild(st);
}

// Chiều cao .app = phần màn còn lại dưới header, trừ tab bar. Tính bằng JS vì
// header bản Express (78px) và bản Next (--pharm-header-h) khác nhau.
function fitApp() {
  const app = document.querySelector('.app');
  if (!app || !window.matchMedia(MQ).matches) return;
  const top = app.getBoundingClientRect().top;
  const h = Math.max(280, window.innerHeight - top - TABS_H - 4);
  app.style.height = h + 'px';
  window.dispatchEvent(new Event('resize'));   // renderer three.js đọc lại kích thước
}

// Dòng thuốc dùng chung cho ngăn kéo "Chọn thuốc" và bảng "quanh chỗ chạm".
function rowHTML({ drug, meta }) {
  const sub = [drug.strength, drug.sku].filter(Boolean).join(' · ');
  return `<button class="mb-row" type="button" data-id="${esc(drug.id)}">
    <span class="mb-row-acc" style="background:${esc(drug.groupAccent || '#334155')}"></span>
    <span class="mb-row-main">
      <span class="mb-row-name">${esc(drug.brand || drug.name)}</span>
      <span class="mb-row-sub">${esc(sub)}</span>
    </span>
    ${drug.isRx ? '<span class="mb-row-rx">Rx</span>' : ''}
    <span class="mb-row-stock">Tồn ${esc(meta?.stock ?? '—')}<br>HD ${esc(meta?.expiry ?? '—')}</span>
  </button>`;
}

function buildDrugSheet(sim, onPick) {
  const sheet = document.createElement('div');
  sheet.className = 'mb-sheet mb-drug-sheet';
  sheet.id = 'mb-drug-sheet';
  sheet.innerHTML = `
    <div class="mb-drug-head">
      <input class="mb-drug-search" type="search" placeholder="🔎 Tìm tên thuốc, hoạt chất, SKU…" autocomplete="off"/>
      <div class="mb-drug-count"></div>
    </div>
    <div class="mb-drug-list"></div>`;
  const input = sheet.querySelector('.mb-drug-search');
  const list = sheet.querySelector('.mb-drug-list');
  const count = sheet.querySelector('.mb-drug-count');

  const catalog = (sim.getCatalog?.() || []).slice().sort((a, b) =>
    String(a.drug.groupLabel || '').localeCompare(String(b.drug.groupLabel || ''), 'vi') ||
    String(a.drug.brand || a.drug.name).localeCompare(String(b.drug.brand || b.drug.name), 'vi'));

  function render(q) {
    const qn = norm(q).trim();
    const hits = qn
      ? catalog.filter(({ drug }) => norm(`${drug.brand} ${drug.name} ${drug.generic} ${drug.sku} ${drug.strength}`).includes(qn))
      : catalog;
    count.textContent = qn ? `${hits.length} kết quả` : `${hits.length} thuốc · cuộn hoặc gõ để tìm`;
    if (!hits.length) { list.innerHTML = '<div class="mb-empty">Không tìm thấy thuốc nào.</div>'; return; }
    let html = '', grp = null;
    for (const it of hits) {
      const g = it.drug.groupLabel || it.drug.category || 'Khác';
      if (g !== grp) { grp = g; html += `<div class="mb-grp">${esc(g)}</div>`; }
      html += rowHTML(it);
    }
    list.innerHTML = html;
  }
  render('');

  let t;
  input.addEventListener('input', () => { clearTimeout(t); t = setTimeout(() => render(input.value), 120); });
  list.addEventListener('click', (e) => {
    const row = e.target.closest('.mb-row');
    if (!row) return;
    onPick(row.dataset.id);
  });
  return sheet;
}

export function initMobileUI({ sim, openDrug }) {
  if (!window.matchMedia(MQ).matches) return null;
  const app = document.querySelector('.app');
  const side = document.querySelector('.side');
  if (!app) return null;

  injectStyle();
  // .side đang HIỆN (transform:none) → gắn .mb-sheet mà để transition chạy thì nó
  // "kẹt" giữa chừng ở translateY(0). Tắt transition 1 nhịp để áp thẳng trạng thái
  // ẩn (translateY 112%), rồi bật lại cho các lần mở/đóng sau mượt.
  if (side) {
    side.style.transition = 'none';
    side.classList.add('mb-sheet', 'mb-sheet-side');
    side.getBoundingClientRect();                 // ép reflow
    requestAnimationFrame(() => { side.style.transition = ''; });
  }

  const tabs = document.createElement('nav');
  tabs.className = 'mb-tabs';
  tabs.innerHTML = `
    <button class="mb-tab" data-sheet="drug" type="button"><span class="mb-tab-ico">📋</span>Chọn thuốc</button>
    <button class="mb-tab" data-sheet="side" type="button"><span class="mb-tab-ico">💬</span>Hội thoại<i class="mb-dot" hidden></i></button>`;
  document.body.appendChild(tabs);

  // Chạm 1 dòng ở bất kỳ bảng nào → đóng bảng, bay camera tới, mở cửa sổ thuốc.
  const pick = (id) => {
    close();                       // đóng bảng để thấy camera bay + cửa sổ thuốc
    // Trong chế độ nhìn quanh, camera do CẢM BIẾN điều khiển → KHÔNG focusDrug (lệnh
    // bay camera bị treo rồi áp sau khi thoát VR, làm camera nhảy về hộp vừa chọn).
    if (!sim.isLookAround?.()) sim.focusDrug?.(id);
    openDrug?.(id);                // mở thẳng cửa sổ thuốc — không phải chạm hộp 3D lần nào
  };

  const drugSheet = buildDrugSheet(sim, pick);
  document.body.appendChild(drugSheet);

  // Bảng "thuốc quanh chỗ bạn chạm" — chạm đại lên kệ, không phải chạm trúng hộp 6px.
  const nearSheet = document.createElement('div');
  nearSheet.className = 'mb-sheet mb-near-sheet';
  nearSheet.id = 'mb-near-sheet';
  nearSheet.innerHTML = `
    <div class="mb-near-head">👆 Thuốc quanh chỗ bạn chạm <small class="mb-near-n"></small>
      <button class="mb-near-close" type="button" aria-label="Đóng">✕</button>
    </div>
    <div class="mb-drug-list mb-near-list"></div>`;
  document.body.appendChild(nearSheet);
  nearSheet.querySelector('.mb-near-close').addEventListener('click', () => close());
  nearSheet.querySelector('.mb-near-list').addEventListener('click', (e) => {
    const row = e.target.closest('.mb-row');
    if (row) pick(row.dataset.id);
  });

  const sheets = { drug: drugSheet, side, near: nearSheet };
  let open = null;
  function close() {
    if (!open) return;
    sheets[open]?.classList.remove('is-open');
    tabs.querySelectorAll('.mb-tab').forEach(b => b.classList.remove('is-on'));
    open = null;
  }
  function show(key) {
    if (open === key) { close(); return; }
    close();
    const el = sheets[key];
    if (!el) return;
    el.classList.add('is-open');
    tabs.querySelector(`.mb-tab[data-sheet="${key}"]`)?.classList.add('is-on');
    open = key;
    if (key === 'side') dot.hidden = true;             // đã xem → tắt báo
  }
  tabs.addEventListener('click', (e) => {
    const b = e.target.closest('.mb-tab');
    if (b) show(b.dataset.sheet);
  });

  // Chấm báo: khách hàng nhắn khi panel đang đóng thì phải biết (panel không còn
  // nhìn thấy thường trực nữa).
  const dot = tabs.querySelector('.mb-dot');
  const chat = document.getElementById('chat');
  if (chat) {
    new MutationObserver((muts) => {
      const added = muts.some(m => [...m.addedNodes].some(n => n.classList?.contains('npc')));
      if (added && open !== 'side') dot.hidden = false;
    }).observe(chat, { childList: true });
  }

  // scene.js gọi khi ngón tay chạm vào vùng kệ: đưa danh sách ứng viên quanh đó
  // thay vì đoán bừa 1 hộp trong ~7 hộp mà ngón tay đang trùm lên.
  function showNear(list) {
    if (!list?.length) return;
    nearSheet.querySelector('.mb-near-n').textContent = `(${list.length} thuốc)`;
    nearSheet.querySelector('.mb-near-list').innerHTML = list.map(rowHTML).join('');
    show('near');
  }

  // ── Chế độ NHÌN QUANH (magic window) ──────────────────────────────────────
  // Chỉ dựng khi scene có hỗ trợ (enterLookAround). Xin quyền cảm biến (iOS 13+
  // bắt buộc gọi trong cử chỉ chạm) rồi bật; chạm giữa màn (reticle) → liệt kê
  // thuốc đang ngắm; kiểm tra 1.4s nếu không có dữ liệu cảm biến → báo & thoát.
  let vrActive = false;
  if (typeof sim.enterLookAround === 'function' && window.DeviceOrientationEvent) {
    const vrBtn = document.createElement('button');
    vrBtn.className = 'mb-vr-btn'; vrBtn.type = 'button';
    vrBtn.innerHTML = '🥽 Nhìn quanh';
    document.body.appendChild(vrBtn);

    const vr = document.createElement('div');
    vr.className = 'mb-vr'; vr.hidden = true;
    vr.innerHTML = `
      <button class="mb-vr-exit" type="button">✕ Thoát</button>
      <div class="mb-vr-reticle"></div>
      <div class="mb-vr-hint">Quay điện thoại để nhìn quanh · chạm để chọn thuốc đang ngắm</div>`;
    document.body.appendChild(vr);
    const hint = vr.querySelector('.mb-vr-hint');

    const exitVR = () => {
      vrActive = false; vr.hidden = true; vrBtn.hidden = false;
      sim.exitLookAround?.();
    };
    const enterVR = async () => {
      try {
        const DOE = window.DeviceOrientationEvent;
        if (DOE && typeof DOE.requestPermission === 'function') {
          const res = await DOE.requestPermission();      // iOS: phải trong cử chỉ chạm
          if (res !== 'granted') { alert('Cần cho phép truy cập cảm biến chuyển động để dùng chế độ nhìn quanh.'); return; }
        }
      } catch (e) { /* Android/desktop không có requestPermission → bỏ qua, thử tiếp */ }
      close();                                            // đóng sheet đang mở
      hint.classList.remove('is-warn');
      hint.textContent = 'Quay điện thoại để nhìn quanh · chạm để chọn thuốc đang ngắm';
      sim.enterLookAround?.();
      vrActive = true; vr.hidden = false; vrBtn.hidden = true;
      setTimeout(() => {
        if (vrActive && !sim.lookHasData?.()) {           // không nhận được dữ liệu cảm biến
          exitVR();
          alert('Thiết bị này không có cảm biến xoay (gyroscope) hoặc trình duyệt không cấp quyền. Bạn vẫn dùng được "Chọn thuốc" và chạm vào kệ.');
        }
      }, 1400);
    };

    vrBtn.addEventListener('click', enterVR);
    vr.querySelector('.mb-vr-exit').addEventListener('click', (e) => { e.stopPropagation(); exitVR(); });
    // Chạm overlay (trừ nút thoát) → chọn thuốc ở TÂM màn (nơi reticle ngắm).
    vr.addEventListener('click', (e) => {
      if (e.target.closest('.mb-vr-exit')) return;
      const c = document.getElementById('scene-canvas')?.getBoundingClientRect();
      if (!c) return;
      // Bán kính RỘNG (90px) cho reticle: người dùng "ngắm" cả vùng kệ trước mặt,
      // reticle hay rơi vào khe giữa hộp → 48px hụt. 90px tóm ~vùng ngón tay ngắm.
      const near = sim.getDrugsNear?.(c.left + c.width / 2, c.top + c.height / 2, 90, 10) || [];
      if (near.length) { showNear(near); }
      else {
        hint.classList.add('is-warn');
        hint.textContent = 'Không có thuốc ở hướng đang ngắm — quay máy về phía kệ thuốc.';
        setTimeout(() => { hint.classList.remove('is-warn'); hint.textContent = 'Quay điện thoại để nhìn quanh · chạm để chọn thuốc đang ngắm'; }, 2200);
      }
    });
  }

  fitApp();
  window.addEventListener('resize', fitApp);
  window.addEventListener('orientationchange', () => setTimeout(fitApp, 250));
  return { show, close, showNear };
}
