// Gallery toàn màn hình cho ảnh đính kèm: bấm ảnh → xem lớn; ←/→ (hoặc nút, vuốt) chuyển ảnh; Esc/nền/✕ đóng.
// Một nhóm = mọi thẻ a[data-gallery] trong cùng .atts. Gắn 1 lần ở document nên sống qua mỗi lần vẽ lại trang.
// Usage: import { installLightbox } from './lightbox.js'; installLightbox();

const CSS = `
.lb { position:fixed; inset:0; z-index:9999; display:flex; align-items:center; justify-content:center; background:rgba(0,0,0,.92); }
.lb img { max-width:100%; max-height:100%; object-fit:contain; }
.lb-stage { position:absolute; inset:48px 64px; display:flex; align-items:center; justify-content:center; }
.lb button { position:absolute; border:0; border-radius:999px; background:rgba(255,255,255,.14); color:#fff; font:inherit; font-size:26px; line-height:1; width:44px; height:44px; cursor:pointer; }
.lb button:hover, .lb button:focus-visible { background:rgba(255,255,255,.3); outline:2px solid #fff; }
.lb-close { top:12px; right:12px; }
.lb-prev { left:10px; top:50%; transform:translateY(-50%); }
.lb-next { right:10px; top:50%; transform:translateY(-50%); }
.lb-cap { position:absolute; left:0; right:0; bottom:10px; text-align:center; color:#fff; font-size:13px; padding:0 64px; }
@media (max-width:600px) { .lb-stage { inset:48px 8px; } .lb-cap { padding:0 8px; } }
`;

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

  const show = () => {
    const a = items[index];
    const img = box.querySelector('img');
    img.src = a.href;
    img.alt = a.dataset.name || '';
    box.querySelector('.lb-cap').textContent = `${a.dataset.name || ''}${items.length > 1 ? `  ·  ${index + 1} / ${items.length}` : ''}`;
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
    if (e.key === 'Escape') close();
    else if (e.key === 'ArrowLeft' && items.length > 1) step(-1);
    else if (e.key === 'ArrowRight' && items.length > 1) step(1);
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
    box.innerHTML = `<div class="lb-stage"><img alt=""></div>
      <button type="button" class="lb-close" aria-label="Đóng">✕</button>
      ${many ? '<button type="button" class="lb-prev" aria-label="Ảnh trước">‹</button><button type="button" class="lb-next" aria-label="Ảnh sau">›</button>' : ''}
      <div class="lb-cap"></div>`;
    box.addEventListener('click', (ev) => {
      if (ev.target.closest('.lb-close') || ev.target === box || ev.target.classList.contains('lb-stage')) close();
      else if (ev.target.closest('.lb-prev')) step(-1);
      else if (ev.target.closest('.lb-next')) step(1);
    });
    let startX = null;
    box.addEventListener('touchstart', (ev) => { startX = ev.touches[0].clientX; }, { passive: true });
    box.addEventListener('touchend', (ev) => {
      if (startX == null || !many) return;
      const dx = ev.changedTouches[0].clientX - startX;
      startX = null;
      if (Math.abs(dx) > 50) step(dx > 0 ? -1 : 1);
    });
    document.body.append(box);
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onKey, true);
    show();
    box.querySelector('.lb-close').focus();
  });
}
