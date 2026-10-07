const STATES = { creating: 'Đang chuẩn bị bản xem', ready: 'Bản xem riêng đã sẵn sàng', failed: 'Chưa tạo được bản xem',
  expired: 'Bản xem đã hết hạn', unavailable: 'Tạm thời không kết nối được bản xem', cleanup_unconfirmed: 'Bản xem đang chờ dọn an toàn',
  closing: 'Đang đóng bản xem', closed: 'Bản xem đã đóng', access_revoked: 'Đã thu hồi truy cập vì yêu cầu bị hủy hoặc từ chối' };
const rendered = new WeakMap();

/** One entry shared by owner thread/admin detail; never renders candidate HTML on the serving origin. */
export async function mountPrivatePreview(host, requestId) {
  if (!host) return;
  host.classList.add('private-preview');
  if (!document.querySelector('style[data-private-preview]')) {
    const style=document.createElement('style');style.dataset.privatePreview='';
    style.textContent='.private-preview:empty{display:none}.private-preview a{display:inline-flex;align-items:center;min-height:44px;text-underline-offset:.2em}.private-preview button:focus-visible,.private-preview a:focus-visible{outline:2px solid currentColor;outline-offset:3px}';
    document.head.append(style);
  }
  let preview;
  try {
    const response = await fetch(`/api/requests/${Number(requestId)}/preview`, { credentials: 'same-origin' });
    if (response.status === 404) { host.replaceChildren(); return; } // deployment has not enabled isolated preview
    if (!response.ok) throw new Error();
    preview = (await response.json()).preview;
    if (!preview) { host.replaceChildren(); return; }
  } catch { host.textContent = 'Chưa tải được trạng thái bản xem. Tải lại trang để thử lại.'; return; }
  const signature = JSON.stringify([preview.id, preview.state, preview.expires_at, preview.oracle_scope]);
  if (rendered.get(host) === signature && host.hasChildNodes()) return;
  rendered.set(host, signature);
  host.replaceChildren();
  const title = document.createElement('strong'); title.textContent = STATES[preview.state] || 'Bản xem chưa khả dụng';
  const note = document.createElement('p'); note.textContent = preview.message;
  const expires = document.createElement('p'); expires.textContent = `Chỉ chủ yêu cầu và quản trị viên truy cập. Đóng sau 2 phút không hoạt động, muộn nhất ${new Date(preview.expires_at).toLocaleTimeString('vi-VN')}.`;
  expires.className = 'meta'; host.append(title, note, expires);
  if (preview.state !== 'ready') return;
  const button = document.createElement('button'); button.type = 'button'; button.className = 'rt-send'; button.textContent = 'Chuẩn bị đường dẫn xem riêng';
  const status = document.createElement('p'); status.setAttribute('role', 'status'); status.setAttribute('aria-live', 'polite');
  host.append(button, status);
  button.addEventListener('click', async () => {
    button.disabled = true; status.textContent = 'Đang kiểm tra quyền truy cập…';
    try {
      const csrf = await fetch('/api/csrf', { credentials: 'same-origin' }).then((r) => r.json());
      const response = await fetch(`/api/requests/${Number(requestId)}/runs/${Number(preview.run_id)}/preview/open`, {
        method: 'POST', credentials: 'same-origin', headers: { 'Content-Type': 'application/json', 'X-CSRF-Token': csrf.token }, body: '{}' });
      if (!response.ok) throw new Error();
      const data = await response.json();
      const url = new URL(data.url);
      if (url.protocol !== 'http:' || !/^p[a-f0-9]{48}\.localhost$/.test(url.hostname) || url.pathname !== '/__preview_boot') throw new Error();
      const link = document.createElement('a'); link.href = url.href; link.target = '_blank'; link.rel = 'noopener noreferrer';
      link.textContent = 'Mở bản xem riêng trong tab mới'; status.replaceChildren(link);
      const expiry = setTimeout(() => { link.removeAttribute('href'); status.textContent = 'Đường dẫn đã hết hạn. Chuẩn bị đường dẫn mới để mở.'; }, 30_000);
      link.addEventListener('click', () => {
        clearTimeout(expiry);
        setTimeout(() => { status.textContent = 'Đã mở bản xem. Chuẩn bị đường dẫn mới nếu cần mở lại.'; }, 0);
      }, { once: true });
    } catch { status.textContent = 'Chưa mở được bản xem. Kiểm tra đăng nhập rồi thử lại.'; }
    finally { button.disabled = false; }
  });
}
