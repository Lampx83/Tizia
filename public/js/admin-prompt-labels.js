// Prompts sub-tab of Skills & Tools: set production/staging labels against a shown diff, roll back, read receipts.
import { lineDiff } from './admin-skills.js?v=skills-labels1';
import { fmt } from './ai-board-clock.js';

const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const short = hash => hash ? hash.slice(0, 12) : '(chưa đặt)';
const LABELS = ['production', 'staging'];
const ERRORS = {
  prompt_label_stale: 'Nhãn đã đổi từ lúc bạn xem diff. Đọc lại rồi duyệt lại.',
  prompt_label_no_previous: 'Chưa có phiên bản trước để quay về.',
  prompt_version_unknown: 'Phiên bản này server chưa biết.',
};
const diffHtml = (a, b) => `<pre class="skill-diff" aria-label="So sánh phiên bản đang gắn nhãn và phiên bản được chọn">${lineDiff(a, b).map(([kind, line]) =>
  `<span class="diff-${kind}">${kind === 'add' ? '+ ' : kind === 'del' ? '- ' : '  '}${esc(line)}</span>`).join('')}</pre>`;

export async function mountPromptLabels(host, { api, toast }) {
  const res = await api('/api/admin/ai-board/prompt-labels');
  if (res.status === 404) { host.innerHTML = '<p class="meta">Nhãn prompt chưa được bật (AI_BOARD_PROMPT_LABELS).</p>'; return; }
  if (!res.ok) { host.innerHTML = `<div class="err">Lỗi nhãn prompt: ${esc(res.data?.error || res.status)}</div>`; return; }
  const { labels, versions, receipts } = res.data;
  const names = [...new Set(versions.map(v => v.name))].sort();
  const refresh = () => mountPromptLabels(host, { api, toast });
  const fail = response => toast('Lỗi: ' + (ERRORS[response.data?.error] || response.data?.error || response.status), 'err');

  host.innerHTML = `<section class="prompt-labels">
    <p class="meta">Mỗi phiên bản prompt bất biến theo băm nội dung. Worker chỉ chạy khi file prompt khớp nhãn production (hoặc prompts.lock.json nếu chưa gắn nhãn). Gắn nhãn cần xem diff; quay lại bản trước ghi receipt.</p>
    ${names.length ? `<table><thead><tr><th>Prompt</th><th>production</th><th>staging</th><th>Đổi nhãn</th></tr></thead><tbody>${names.map(name => `
      <tr data-name="${esc(name)}">
        <td>${esc(name)}</td>
        ${LABELS.map(label => `<td><code>${esc(short(labels[name]?.[label]))}</code>
          <button type="button" class="btn" data-rollback="${label}">Quay lại</button></td>`).join('')}
        <td><select data-pick aria-label="Phiên bản của ${esc(name)}">${versions.filter(v => v.name === name).map(v =>
          `<option value="${v.hash}">${esc(short(v.hash))} · ${esc(fmt(v.created_at))}</option>`).join('')}</select>
          <select data-label aria-label="Nhãn">${LABELS.map(l => `<option>${l}</option>`).join('')}</select>
          <button type="button" class="btn" data-diff>Xem diff</button>
          <div data-diff-out></div></td>
      </tr>`).join('')}</tbody></table>` : '<p class="meta">Chưa có worker nào báo phiên bản prompt.</p>'}
    ${receipts.length ? `<details><summary>Receipt gần đây (${receipts.length})</summary><ul>${receipts.map(r =>
      `<li>${esc(fmt(r.created_at))} · ${esc(r.name)}/${esc(r.label)}: ${esc(short(r.from_hash))} → ${esc(short(r.to_hash))} (${r.kind === 'rollback' ? 'quay lại' : 'đặt'}, quản trị viên #${r.actor})${r.reason ? ' · ' + esc(r.reason) : ''}</li>`).join('')}</ul></details>` : ''}
  </section>`;

  for (const row of host.querySelectorAll('tr[data-name]')) {
    const name = row.dataset.name, out = row.querySelector('[data-diff-out]');
    row.querySelectorAll('[data-rollback]').forEach(button => button.addEventListener('click', async () => {
      button.disabled = true;
      const done = await api(`/api/admin/ai-board/prompt-labels/${encodeURIComponent(name)}/${button.dataset.rollback}/rollback`, { method: 'POST', body: '{}' });
      if (!done.ok) { fail(done); button.disabled = false; return; }
      toast('Đã quay lại phiên bản trước'); refresh();
    }));
    row.querySelector('[data-diff]').addEventListener('click', async () => {
      const to = row.querySelector('[data-pick]').value, label = row.querySelector('[data-label]').value, from = labels[name]?.[label] ?? null;
      const [a, b] = await Promise.all([from ? api(`/api/admin/ai-board/prompt-labels/${encodeURIComponent(name)}/${from}`) : { ok: true, data: { content: '' } },
        api(`/api/admin/ai-board/prompt-labels/${encodeURIComponent(name)}/${to}`)]);
      if (!a.ok || !b.ok) return fail(a.ok ? b : a);
      out.innerHTML = `${diffHtml(a.data.content, b.data.content)}<button type="button" class="btn primary" data-approve>Duyệt và đặt nhãn ${esc(label)}</button>`;
      out.querySelector('[data-approve]').addEventListener('click', async event => {
        event.currentTarget.disabled = true;
        const done = await api(`/api/admin/ai-board/prompt-labels/${encodeURIComponent(name)}/${label}/set`, { method: 'POST', body: JSON.stringify({ from, to }) });
        if (!done.ok) { fail(done); event.currentTarget.disabled = false; return; }
        toast('Đã đặt nhãn'); refresh();
      });
    });
  }
}
