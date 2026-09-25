// Vá DOM cũ theo bản render mới: chỉ đổi nút khác nhau, không nháy, giữ trạng thái người dùng
// (`open` của <details>, chữ đang gõ trong input, vị trí cuộn).

export function morph(from, to) {
  if (from.nodeType !== to.nodeType || from.nodeName !== to.nodeName) return to;
  if (from.nodeType !== 1) {
    if (from.nodeValue !== to.nodeValue) from.nodeValue = to.nodeValue;
    return from;
  }
  if (from.isEqualNode(to)) return from;
  for (const a of [...from.attributes]) {
    // `open` của <details> là trạng thái người dùng vừa bấm, không phải dữ liệu mới.
    if (!to.hasAttribute(a.name) && !(a.name === 'open' && from.nodeName === 'DETAILS')) from.removeAttribute(a.name);
  }
  for (const a of [...to.attributes]) if (from.getAttribute(a.name) !== a.value) from.setAttribute(a.name, a.value);
  const next = [...to.childNodes];
  const prev = [...from.childNodes];
  next.forEach((child, i) => {
    if (!prev[i]) { from.appendChild(child); return; }
    const kept = morph(prev[i], child);
    if (kept !== prev[i]) prev[i].replaceWith(kept);
  });
  prev.slice(next.length).forEach(n => n.remove());
  return from;
}

// host vừa được render mới; đưa nút cũ trở lại rồi vá theo bản mới — 1 khung hình, không nháy.
export function patchChildren(host, previous) {
  const fresh = document.createElement('div');
  fresh.append(...host.childNodes);
  const old = document.createElement('div');
  old.append(...previous);
  morph(old, fresh);
  host.append(...old.childNodes);
}

// Thay nội dung host bằng html, vá thay vì ghi đè.
export function patchHtml(host, html) {
  const fresh = document.createElement(host.nodeName);
  fresh.innerHTML = html;
  const shell = host.cloneNode(false);
  shell.append(...fresh.childNodes);
  morph(host, shell);
}
