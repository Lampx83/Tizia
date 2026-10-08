// Gallery toàn màn hình cho ảnh đính kèm: bấm ảnh → xem lớn; ←/→ (nút, vuốt) chuyển ảnh; +/−/0, nút, cuộn chuột hoặc bấm đúp để
// phóng to (kéo để di chuyển khi đã phóng); Esc/nền/✕ đóng. Một nhóm = mọi thẻ a[data-gallery] trong cùng .atts.
// Gắn 1 lần ở document nên sống qua mỗi lần vẽ lại trang.
// Usage: import { installLightbox } from './lightbox.js'; installLightbox();

export const ZOOM_MIN = 1;
export const ZOOM_MAX = 6;
const ZOOM_STEP = 1.5;
const ZOOM_DOUBLE_TAP = 2.5;

/** Mức phóng sau `direction` (+1 phóng, −1 thu) bước; luôn trong [ZOOM_MIN, ZOOM_MAX]. */
export function zoomStep(scale, direction) {
  const next = direction > 0 ? scale * ZOOM_STEP : scale / ZOOM_STEP;
  return Math.min(ZOOM_MAX, Math.max(ZOOM_MIN, Math.round(next * 100) / 100));
}

const CSS = `
.lb, .lb * { user-select:none; -webkit-user-select:none; }
.lb { position:fixed; inset:0; z-index:9999; display:flex; align-items:center; justify-content:center; background:rgba(0,0,0,.92); }
.lb-stage { position:absolute; inset:64px 76px; display:flex; align-items:center; justify-content:center; overflow:hidden; }
.lb-stage img { max-width:100%; max-height:100%; object-fit:contain; -webkit-user-drag:none; transform-origin:center; transition:transform .12s ease-out; }
.lb-stage.zoomed { cursor:grab; touch-action:none; }
.lb-stage.zoomed.drag { cursor:grabbing; }
.lb-stage.drag img { transition:none; }
.lb button { display:grid; place-items:center; padding:0; border:0; border-radius:999px; background:#f4f5f7; color:#15171c; font:inherit; font-size:14px; font-weight:600; line-height:1; width:44px; height:44px; cursor:pointer; box-shadow:0 2px 10px rgba(0,0,0,.5); }
.lb button:hover:not(:disabled) { background:#fff; }
.lb button:focus-visible { outline:3px solid #7cc4ff; outline-offset:2px; }
.lb button:disabled { opacity:.45; cursor:default; }
.lb button svg { display:block; width:22px; height:22px; fill:none; stroke:currentColor; stroke-width:2.6; stroke-linecap:round; stroke-linejoin:round; pointer-events:none; }
.lb-bar { position:absolute; top:10px; right:12px; display:flex; gap:8px; align-items:center; }
.lb-bar .lb-pct { width:auto; padding:0 14px; font-variant-numeric:tabular-nums; min-width:64px; }
.lb-prev, .lb-next { position:absolute; top:50%; width:52px !important; height:52px !important; transform:translateY(-50%); }
.lb-prev svg, .lb-next svg { width:28px; height:28px; }
.lb-prev { left:12px; }
.lb-next { right:12px; }
.lb-cap { position:absolute; left:0; right:0; bottom:12px; text-align:center; color:#fff; font-size:13px; padding:0 76px; }
@media (max-width:600px) { .lb-stage { inset:64px 8px 48px; } .lb-cap { padding:0 8px; } .lb-prev, .lb-next { top:auto; bottom:44px; transform:none; } }
`;

// Biểu tượng SVG (không dùng ký tự chữ để căn chính giữa nút). Mỗi path đối xứng quanh tâm viewBox 24x24.
const ICON = {
  out: '<path d="M5 12h14"/>',
  in: '<path d="M12 5v14M5 12h14"/>',
  close: '<path d="M6 6l12 12M18 6L6 18"/>',
  prev: '<path d="M15.5 5l-7 7 7 7"/>',
  next: '<path d="M8.5 5l7 7-7 7"/>',
};
const icon = (name) => `<svg viewBox="0 0 24 24" aria-hidden="true">${ICON[name]}</svg>`;

/** Ảnh chụp bản nháp: mỗi cỡ màn hình một cặp, "Trước" (trái) rồi "Sau" (phải). Tin cũ lưu Sau trước Trước nên sắp lại khi hiển thị.
 *  Chỉ đụng danh sách toàn ảnh chụp (name = "Trước|Sau · <rộng> · <trang>"); danh sách khác giữ nguyên. */
export function pairBeforeAfter(list) {
  const items = Array.isArray(list) ? list : [];
  if (!items.length || !items.every((a) => a?.kind === 'screenshot')) return items;
  const rest = (a) => String(a.name || '').split(' · ').slice(1).join(' · ');
  const rank = (a) => (String(a.name || '').startsWith('Trước') ? 0 : 1);
  return [...new Set(items.map(rest))].flatMap((key) => items.filter((a) => rest(a) === key).sort((x, y) => rank(x) - rank(y)));
}

export function installLightbox() {
  let items = [];
  let index = 0;
  let box = null;
  let scale = 1;
  let tx = 0;
  let ty = 0;
  let dragged = false;

  const stage = () => box.querySelector('.lb-stage');
  const paint = () => {
    stage().classList.toggle('zoomed', scale > 1);
    box.querySelector('img').style.transform = `translate(${tx}px, ${ty}px) scale(${scale})`;
    box.querySelector('.lb-pct').textContent = `${Math.round(scale * 100)}%`;
    box.querySelector('.lb-out').disabled = scale <= ZOOM_MIN;
    box.querySelector('.lb-in').disabled = scale >= ZOOM_MAX;
  };
  const zoomTo = (next) => {
    scale = next;
    if (scale === 1) { tx = 0; ty = 0; }
    paint();
  };
  const show = () => {
    const a = items[index];
    const img = box.querySelector('img');
    img.src = a.href;
    img.alt = a.dataset.name || '';
    box.querySelector('.lb-cap').textContent = `${a.dataset.name || ''}${items.length > 1 ? `  ·  ${index + 1} / ${items.length}` : ''}`;
    tx = 0; ty = 0; scale = 1;
    paint();
  };
  const step = (d) => { index = (index + d + items.length) % items.length; show(); };
  const close = () => {
    if (!box) return;
    box.remove();
    box = null;
    document.removeEventListener('keydown', onKey, true);
    document.body.style.overflow = '';
  };
  function onKey(e) {
    if ((e.ctrlKey || e.metaKey) && String(e.key).toLowerCase() === 'a') { e.preventDefault(); return; } // không bôi đen trang phía sau
    if (e.key === 'Escape') close();
    else if (e.key === 'ArrowLeft' && items.length > 1) step(-1);
    else if (e.key === 'ArrowRight' && items.length > 1) step(1);
    else if (e.key === '+' || e.key === '=') zoomTo(zoomStep(scale, 1));
    else if (e.key === '-' || e.key === '_') zoomTo(zoomStep(scale, -1));
    else if (e.key === '0') zoomTo(1);
    else return;
    e.preventDefault();
    e.stopPropagation();
  }

  const style = document.createElement('style');
  style.textContent = CSS;
  document.head.append(style);

  document.addEventListener('click', (e) => {
    const link = e.target.closest?.('a[data-gallery]');
    if (!link || e.metaKey || e.ctrlKey || e.shiftKey) return;
    e.preventDefault();
    items = [...(link.closest('.atts') || document).querySelectorAll('a[data-gallery]')];
    index = Math.max(0, items.indexOf(link));
    close();
    const many = items.length > 1;
    box = document.createElement('div');
    box.className = 'lb';
    box.setAttribute('role', 'dialog');
    box.setAttribute('aria-modal', 'true');
    box.setAttribute('aria-label', 'Xem ảnh');
    box.innerHTML = `<div class="lb-stage"><img alt="" draggable="false"></div>
      <div class="lb-bar">
        <button type="button" class="lb-out" aria-label="Thu nhỏ">${icon('out')}</button>
        <button type="button" class="lb-pct" aria-label="Về kích thước vừa khung">100%</button>
        <button type="button" class="lb-in" aria-label="Phóng to">${icon('in')}</button>
        <button type="button" class="lb-close" aria-label="Đóng">${icon('close')}</button>
      </div>
      ${many ? `<button type="button" class="lb-prev" aria-label="Ảnh trước">${icon('prev')}</button><button type="button" class="lb-next" aria-label="Ảnh sau">${icon('next')}</button>` : ''}
      <div class="lb-cap"></div>`;
    box.addEventListener('click', (ev) => {
      if (dragged) { dragged = false; return; } // kéo ảnh rồi nhả trên nền không được tính là bấm nền
      const t = ev.target;
      if (t.closest('.lb-close') || t === box || t.classList.contains('lb-stage')) close();
      else if (t.closest('.lb-prev')) step(-1);
      else if (t.closest('.lb-next')) step(1);
      else if (t.closest('.lb-in')) zoomTo(zoomStep(scale, 1));
      else if (t.closest('.lb-out')) zoomTo(zoomStep(scale, -1));
      else if (t.closest('.lb-pct')) zoomTo(1);
    });
    box.addEventListener('dragstart', (ev) => ev.preventDefault());
    box.addEventListener('selectstart', (ev) => ev.preventDefault());
    box.addEventListener('dblclick', (ev) => { if (ev.target.tagName === 'IMG') zoomTo(scale > 1 ? 1 : ZOOM_DOUBLE_TAP); });
    box.addEventListener('wheel', (ev) => {
      if (!ev.target.closest('.lb-stage')) return;
      ev.preventDefault();
      zoomTo(zoomStep(scale, ev.deltaY < 0 ? 1 : -1));
    }, { passive: false });

    let pan = null;
    stage().addEventListener('pointerdown', (ev) => {
      if (scale <= 1 || ev.button > 0) return;
      ev.preventDefault();
      dragged = false;
      pan = { x: ev.clientX, y: ev.clientY, tx, ty, moved: false };
      stage().setPointerCapture(ev.pointerId);
      stage().classList.add('drag');
    });
    stage().addEventListener('pointermove', (ev) => {
      if (!pan) return;
      const dx = ev.clientX - pan.x;
      const dy = ev.clientY - pan.y;
      if (Math.abs(dx) + Math.abs(dy) > 3) pan.moved = true;
      tx = pan.tx + dx;
      ty = pan.ty + dy;
      paint();
    });
    const endPan = () => {
      if (!pan) return;
      dragged = pan.moved;
      pan = null;
      stage().classList.remove('drag');
    };
    stage().addEventListener('pointerup', endPan);
    stage().addEventListener('pointercancel', endPan);

    let startX = null;
    box.addEventListener('touchstart', (ev) => { startX = ev.touches[0].clientX; }, { passive: true });
    box.addEventListener('touchend', (ev) => {
      if (startX == null || !many || scale > 1) { startX = null; return; }
      const dx = ev.changedTouches[0].clientX - startX;
      startX = null;
      if (Math.abs(dx) > 50) step(dx > 0 ? -1 : 1);
    });
    document.body.append(box);
    document.body.style.overflow = 'hidden';
    getSelection()?.removeAllRanges();
    document.addEventListener('keydown', onKey, true);
    show();
    box.querySelector('.lb-close').focus();
  });
}
