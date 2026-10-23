// Ảnh nháp đã lưu, gom theo yêu cầu (admin). Ảnh qua proxy /uploads/requests; mọi chữ từ học sinh/model qua esc().
import { fmt } from './ai-board-clock.js';

const $ = (s) => document.querySelector(s);
const esc = (s) => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

let page = Number(new URLSearchParams(location.search).get('page')) || 1;

async function load() {
  const app = $('#app');
  app.innerHTML = '<p class="meta" role="status">Đang tải ảnh…</p>';
  const r = await fetch(`/api/admin/ai-board/shots?page=${page}`, { credentials: 'same-origin', signal: AbortSignal.timeout(10000) });
  if (r.status === 401) {
    location.href = '/login.html?return=' + encodeURIComponent(location.pathname + location.search);
    return;
  }
  if (!r.ok) {
    app.innerHTML = `<p class="meta" role="alert">Không tải được ảnh (mã ${r.status}).</p>`;
    return;
  }
  render(await r.json());
}

function render({ page: current, pages, total, groups }) {
  page = current;
  history.replaceState(null, '', `?page=${current}`);
  const nav = `<nav class="pager" aria-label="Chuyển trang">
    <button type="button" data-page="${current - 1}" ${current <= 1 ? 'disabled' : ''}>← Trang trước</button>
    <span class="meta">Trang ${current} / ${pages} · ${total} yêu cầu có ảnh</span>
    <button type="button" data-page="${current + 1}" ${current >= pages ? 'disabled' : ''}>Trang sau →</button>
  </nav>`;
  const body = groups.length
    ? groups.map(g => `<section class="req">
        <h2><a href="/admin-request.html?id=${Number(g.request_id)}">${esc(g.title)}</a></h2>
        <p class="meta">Yêu cầu #${Number(g.request_id)} · ${g.shots.length} ảnh</p>
        <div class="shots">${g.shots.map(s => `<figure>
          <a href="${esc(s.url)}" target="_blank" rel="noopener"><img loading="lazy" src="${esc(s.url)}" alt="${esc(s.name)}"></a>
          <figcaption>${esc(s.name)} · ${esc(fmt(s.created_at))}</figcaption>
        </figure>`).join('')}</div>
      </section>`).join('')
    : '<p class="meta">Chưa có ảnh nháp nào.</p>';
  $('#app').innerHTML = nav + body + nav;
}

$('#app').addEventListener('click', (e) => {
  const btn = e.target.closest('button[data-page]');
  if (!btn || btn.disabled) return;
  page = Number(btn.dataset.page);
  load();
});

load();
