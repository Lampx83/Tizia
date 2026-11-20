// Staging label and label receipts of one skill, under its version list; production moves through approve/restore.
import { fmt } from './ai-board-clock.js';
import { evalEvidenceHtml } from './admin-skills-state.js?v=skills-ux3';

const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const ERRORS = {
  skill_label_stale: 'Nhãn staging đã đổi từ lúc bạn xem diff. Đọc lại rồi duyệt lại.',
  skill_label_no_previous: 'Chưa có phiên bản staging trước để quay về.',
  version_rejected: 'Phiên bản đã bị từ chối.',
};
const textOf = v => v?.rewritten_text ?? v?.original_text ?? '';

export async function mountSkillLabels(host, { api, toast, item, versions, refresh, lineDiff }) {
  const res = await api(`/api/admin/ai-board/skills/${item.id}/labels`);
  if (!res.ok) { host.innerHTML = ''; return; }
  const { labels, receipts, eval_receipts, refusals } = res.data;
  const byId = new Map(versions.map(v => [v.id, v]));
  const tag = id => id ? `v${esc(byId.get(id)?.version ?? '?')}` : '(chưa đặt)';
  const candidates = versions.filter(v => !v.rejected_at && v.id !== labels.staging);
  host.innerHTML = `<section class="skill-labels"><h4>Nhãn phiên bản</h4>
    <p class="meta">production: <strong>${tag(labels.production)}</strong> · staging: <strong>${tag(labels.staging)}</strong>. Worker chỉ nhận production; staging để thử trước. Production đổi qua “Duyệt” (cần receipt eval đạt) hoặc “Khôi phục”, mỗi lần ghi receipt.</p>
    <div class="toolbar"><select data-label-pick aria-label="Phiên bản đặt nhãn staging">${candidates.map(v => `<option value="${v.id}">v${esc(v.version)}</option>`).join('')}</select>
      <button type="button" class="btn" data-label-diff${candidates.length ? '' : ' disabled'}>Xem diff</button>
      <button type="button" class="btn" data-label-rollback${labels.staging ? '' : ' disabled'}>Quay lại staging trước</button></div>
    <div data-label-out></div>
    ${receipts.length ? `<details><summary>Receipt nhãn (${receipts.length})</summary><ul>${receipts.map(r =>
      `<li>${esc(fmt(r.created_at))} · ${esc(r.label)}: ${tag(r.from_version_id)} → ${tag(r.to_version_id)} (${r.kind === 'rollback' ? 'quay lại' : 'đặt'}, quản trị viên #${Number(r.actor)})${r.reason ? ' · ' + esc(r.reason) : ''}</li>`).join('')}</ul></details>` : ''}
    ${evalEvidenceHtml({ eval_receipts, refusals }, fmt)}
  </section>`;
  const out = host.querySelector('[data-label-out]');
  const post = async (suffix, body) => {
    const done = await api(`/api/admin/ai-board/skills/${item.id}/labels/staging/${suffix}`, { method: 'POST', body: JSON.stringify({ confirmed: true, ...body }) });
    if (!done.ok) { toast('Lỗi: ' + (ERRORS[done.data?.error] || done.data?.error || done.status), 'err'); return false; }
    return true;
  };
  host.querySelector('[data-label-diff]').addEventListener('click', () => {
    const to = Number(host.querySelector('[data-label-pick]').value);
    const rows = lineDiff(textOf(byId.get(labels.staging)), textOf(byId.get(to)));
    out.innerHTML = `<pre class="skill-diff" aria-label="So sánh staging hiện tại và phiên bản được chọn">${rows.map(([kind, line]) =>
      `<span class="diff-${kind}">${kind === 'add' ? '+ ' : kind === 'del' ? '- ' : '  '}${esc(line)}</span>`).join('')}</pre>
      <button type="button" class="btn primary" data-label-approve>Duyệt và đặt staging</button>`;
    out.querySelector('[data-label-approve]').addEventListener('click', async event => {
      event.currentTarget.disabled = true;
      if (await post('set', { from: labels.staging, version_id: to })) { toast('Đã đặt nhãn staging'); await refresh(item.id); } else event.currentTarget.disabled = false;
    });
  });
  host.querySelector('[data-label-rollback]').addEventListener('click', async event => {
    event.currentTarget.disabled = true;
    if (await post('rollback', {})) { toast('Đã quay lại staging trước'); await refresh(item.id); } else event.currentTarget.disabled = false;
  });
}
