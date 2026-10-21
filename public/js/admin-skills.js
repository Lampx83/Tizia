const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[c]));
const TYPE = { backend:'Backend', frontend:'Giao diện', database:'Cơ sở dữ liệu', review:'Review', test:'Kiểm thử', all:'Chung' };
const STATUS = { draft:'Bản nháp', approved:'Đã duyệt', disabled:'Đã tắt' };
const lineDiff = (a, b) => {
  const x = a.split('\n'), y = b.split('\n'), t = Array.from({ length:x.length + 1 }, () => new Array(y.length + 1).fill(0));
  for (let i = x.length - 1; i >= 0; i--) for (let j = y.length - 1; j >= 0; j--) t[i][j] = x[i] === y[j] ? t[i+1][j+1] + 1 : Math.max(t[i+1][j], t[i][j+1]);
  const rows = []; let i = 0, j = 0;
  while (i < x.length || j < y.length) {
    if (i < x.length && j < y.length && x[i] === y[j]) { rows.push(['same', x[i]]); i++; j++; }
    else if (j < y.length && (i === x.length || t[i][j+1] >= t[i+1][j])) rows.push(['add', y[j++]]);
    else rows.push(['del', x[i++]]);
  }
  return rows;
};
const diffHtml = (a, b) => `<pre class="skill-diff" aria-label="So sánh bản gốc và bản viết lại">${lineDiff(a, b).map(([kind, line]) =>
  `<span class="diff-${kind}">${kind === 'add' ? '+ ' : kind === 'del' ? '- ' : '  '}${esc(line)}</span>`).join('\n')}</pre>`;
const REWRITE = { queued:'Đang xếp hàng, chờ worker rảnh', running:'Đang viết lại', succeeded:'Đã viết lại', failed:'Viết lại không thành công' };
const versionState = (version, active) => version.rejected_at ? 'Đã từ chối' : version.id === active ? 'Đang được chọn' : version.approved_by ? 'Đã duyệt' : version.rewrite ? REWRITE[version.rewrite.status] : 'Bản nháp';
const evalHtml = version => !version.evaluation?.kinds ? '' : `<p>Smoke test nhỏ: ${version.evaluation.passed}/${version.evaluation.total} loại tác vụ qua. ${version.evaluation.kinds.map(kind =>
  `${esc(TYPE[kind.kind] || kind.kind)} ${kind.ok ? 'qua' : `chưa qua (${esc(kind.reason || 'không rõ')})`}`).join('; ')}. Đây chỉ là kiểm tra dạng đầu ra, không đo chất lượng.</p>`;
const sample = name => `---\nname: ${name}\ndescription: Hướng dẫn cho giao diện hiện có\ntask_type: frontend\nsource: admin\nversion: 1\nmax_tokens: 1500\n---\n1. Giữ nhãn nút rõ ràng.\n2. Kiểm tra thao tác bằng bàn phím.\n`;

export async function mountSkillsTab(host, { api, toast }) {
  const result = await api('/api/admin/ai-board/skills');
  if (!result.ok) throw new Error('Không tải được danh sách skill. Thử làm mới trang.');
  const queue = (await api('/api/admin/ai-board/skills/proposals')).data?.proposals?.filter(item => item.outcome === 'pending') ?? [];
  host.innerHTML = `<section class="skills-panel">
    <div class="toolbar"><h2>Skills</h2><span class="spacer"></span><button type="button" class="btn" id="skill-add">Thêm skill</button></div>
    <p class="meta">Bản nháp chưa được nạp. Bản đã duyệt sẵn sàng cho lượt chạy được bật Skills; tính năng vẫn trong phạm vi thử nghiệm.</p>
    <form id="skill-upload" class="skills-form" hidden>
      <h3>Thêm bản nháp</h3>
      <label for="skill-name">Tên skill</label><input id="skill-name" name="name" required maxlength="64" pattern="[a-z][a-z0-9-]*" value="frontend-guide">
      <label for="skill-file">Đọc từ tệp Markdown (không bắt buộc)</label><input id="skill-file" type="file" accept=".md,.txt,text/plain,text/markdown">
      <fieldset><legend>Loại tác vụ</legend>${Object.entries(TYPE).map(([value,label]) => `<label class="skill-type"><input type="checkbox" name="task_type" value="${value}"${value === 'frontend' ? ' checked' : ''}> ${label}</label>`).join('')}</fieldset>
      <label for="skill-original">Nội dung gốc</label><textarea id="skill-original" rows="12" required spellcheck="false">${esc(sample('frontend-guide'))}</textarea>
      <p class="meta">Dùng đủ các trường trong mẫu, tối đa 7 quy tắc ngắn. Lưu bản nháp chưa gọi model hoặc kích hoạt skill.</p>
      <div class="toolbar"><button class="btn" type="submit">Lưu bản nháp</button><button class="btn" type="button" id="skill-close">Đóng</button></div>
      <p id="skill-upload-status" role="status"></p>
    </form>
    <section class="skill-queue" aria-labelledby="skill-queue-title"><h3 id="skill-queue-title">Hàng chờ đề xuất${queue.length ? ` (${queue.length})` : ''}</h3>
      ${queue.length ? `<p class="meta">Model và retro chỉ đề xuất. Chỉ quản trị viên duyệt mới tạo thay đổi, và phiên bản mới chưa được dùng cho đến khi duyệt.</p>` : '<p class="meta">Chưa có đề xuất đang chờ.</p>'}
      ${queue.map(item => `<details class="skill-version" open><summary>${esc(item.skill_name)} · phiên bản ${esc(item.version)} · ${item.source === 'retro' ? 'Retro sau lượt chạy' : 'Model đề xuất'}</summary>
        <p>Lý do: ${esc(item.reason)}</p>
        ${item.request_ids.length ? `<p class="meta">Từ yêu cầu: ${item.request_ids.map(id => `<a href="/admin-request.html?id=${Number(id)}">#${Number(id)}</a>`).join(', ')}</p>` : ''}
        <p>${item.lint?.ok ? 'Lint đạt' : `Lint chưa đạt: ${esc((item.lint?.errors || []).join('; '))}`}</p>
        ${evalHtml({ evaluation:item.evaluation })}
        ${diffHtml(item.base_text, item.proposed_text)}
        <div class="toolbar"><button class="btn" type="button" data-proposal-accept="${item.skill_id}:${item.version_id}"${item.lint?.ok ? '' : ' disabled'}>Duyệt và chọn phiên bản này</button>
          <button class="btn" type="button" data-proposal-reject="${item.skill_id}:${item.version_id}">Từ chối</button></div></details>`).join('')}
    </section>
    <p class="meta">Số liệu trong 2.000 bước đã ghi gần nhất, gộp các phiên bản. Kết quả thuộc lượt chạy có dùng skill, không chứng minh chất lượng riêng của skill. Qua kiểm tra gồm cả lượt đang chờ người duyệt.</p>
    <div class="request-table-scroll" role="region" aria-label="Danh sách Skills" tabindex="0"><table><thead><tr><th>Skill / nguồn</th><th>Tác vụ</th><th>Phiên bản</th><th>Trạng thái</th><th>Lần gọi</th><th>Qua kiểm tra</th><th>Thao tác</th></tr></thead>
    <tbody>${result.data.skills.map(skill => `<tr>
      <td><b>${esc(skill.name)}</b><div class="trace-sub">${skill.source === 'default' ? 'Mặc định' : 'Quản trị'}</div></td>
      <td>${skill.task_types.map(type => esc(TYPE[type] || type)).join(', ')}</td><td>${esc(skill.version || 1)}</td><td>${esc(STATUS[skill.status] || skill.status)}</td>
      <td>${skill.usage?.calls ?? 0}</td><td>${skill.usage?.judged ? `${skill.usage.passed}/${skill.usage.judged}` : 'Chưa đủ dữ liệu'}</td>
      <td><button class="btn" type="button" data-skill-view="${esc(skill.id ?? skill.name)}">Xem${skill.source === 'admin' ? ' / duyệt' : ''}</button></td></tr>`).join('')}</tbody></table></div>
    <section id="skill-details" aria-live="polite"></section>
  </section>`;
  const form = host.querySelector('#skill-upload');
  host.querySelector('#skill-add').onclick = () => { form.hidden = false; host.querySelector('#skill-name').focus(); };
  host.querySelector('#skill-close').onclick = () => { form.hidden = true; host.querySelector('#skill-add').focus(); };
  host.querySelector('#skill-name').oninput = event => {
    const text = host.querySelector('#skill-original');
    text.value = text.value.replace(/^name:.*$/m, () => `name: ${event.target.value}`);
  };
  for (const input of form.querySelectorAll('[name=task_type]')) input.onchange = () => {
    const types = [...form.querySelectorAll('[name=task_type]:checked')].map(node => node.value);
    const text = host.querySelector('#skill-original');
    text.value = text.value.replace(/^task_type:.*$/m, () => `task_type: ${types.join(',')}`);
  };
  host.querySelector('#skill-file').onchange = async event => {
    const file = event.target.files[0];
    if (!file) return;
    if (file.size > 12000) { toast('Tệp quá dài. Rút gọn nội dung trước khi nạp.', 'err'); return; }
    try {
      const text = (await file.text()).replace(/\r\n/g, '\n');
      host.querySelector('#skill-original').value = text;
      const front = text.startsWith('---\n') ? text.split('---\n')[1] : '';
      const name = /^name:\s*([a-z][a-z0-9-]{0,63})\s*$/m.exec(front)?.[1];
      if (name) host.querySelector('#skill-name').value = name;
      const types = /^task_type:\s*(.+)$/m.exec(front)?.[1]?.replace(/^\[|\]$/g, '').replace(/ /g, '').split(',');
      if (types) for (const input of form.querySelectorAll('[name=task_type]')) input.checked = types.includes(input.value);
    } catch { toast('Không đọc được tệp. Bạn có thể dán nội dung vào ô bên dưới.', 'err'); }
  };
  form.onsubmit = async event => {
    event.preventDefault();
    const status = host.querySelector('#skill-upload-status'), button = form.querySelector('[type=submit]');
    const taskTypes = [...form.querySelectorAll('[name=task_type]:checked')].map(input => input.value);
    if (!taskTypes.length) { status.textContent = 'Chọn ít nhất một loại tác vụ.'; return; }
    button.disabled = true;
    try {
      const saved = await api('/api/admin/ai-board/skills', { method:'POST', body: JSON.stringify({ name:host.querySelector('#skill-name').value,
        task_types:taskTypes, original_text:host.querySelector('#skill-original').value.replace(/\r\n/g, '\n') }) });
      if (!saved.ok) { status.textContent = saved.data.message || 'Không lưu được bản nháp.'; return; }
      toast(saved.data.version.lint.ok ? 'Đã lưu bản nháp. Chưa kích hoạt.' : 'Đã lưu bản nháp; cần sửa lỗi lint trước khi duyệt.');
      await mountSkillsTab(host, { api, toast });
      host.querySelector(`[data-skill-view="${saved.data.skill.id}"]`).click();
    } catch (error) { status.textContent = error.message; }
    finally { button.disabled = false; }
  };
  const decide = (attr, action, body, done, ask) => {
    for (const node of host.querySelectorAll(`[${attr}]`)) node.onclick = async () => {
      const [skillId, versionId] = node.getAttribute(attr).split(':');
      if (ask && !window.confirm(ask)) return;
      node.disabled = true;
      try {
        const result = await api(action(skillId, versionId), { method:'POST', body:JSON.stringify(body(versionId)) });
        if (!result.ok) { toast(result.data.message || 'Thao tác chưa thực hiện được.', 'err'); return; }
        toast(done); await mountSkillsTab(host, { api, toast });
      } catch (error) { toast(error.message || 'Thao tác thất bại.', 'err'); }
      finally { node.disabled = false; }
    };
  };
  decide('data-proposal-accept', skillId => `/api/admin/ai-board/skills/${skillId}/approve`, versionId => ({ version_id:Number(versionId), confirmed:true }), 'Đã duyệt đề xuất và chọn phiên bản.', 'Duyệt đề xuất này và dùng làm phiên bản đang chọn?');
  decide('data-proposal-reject', (skillId, versionId) => `/api/admin/ai-board/skills/${skillId}/versions/${versionId}/reject`, () => ({ confirmed:true }), 'Đã từ chối đề xuất.', 'Từ chối đề xuất này?');
  for (const button of host.querySelectorAll('[data-skill-view]')) button.onclick = async () => {
    button.disabled = true;
    try {
    const item = result.data.skills.find(skill => String(skill.id ?? skill.name) === button.dataset.skillView);
    const details = host.querySelector('#skill-details');
    const data = item.source === 'default' ? { skill:item, versions:[{ version:item.version, original_text:item.original_text, lint:item.lint }] }
      : (await api(`/api/admin/ai-board/skills/${item.id}`)).data;
    if (!data.versions) { details.textContent = 'Không đọc được skill. Thử lại.'; return; }
    details.innerHTML = `<h3>${esc(item.name)}</h3>
      ${item.usage?.steps?.length ? `<p>Đã dùng tại: ${item.usage.steps.map(step => `<a href="/admin-request.html?id=${Number(step.request_id)}">Yêu cầu #${Number(step.request_id)}, lượt ${Number(step.run_id)}, v${esc(step.version ?? '?')}</a>`).join(' · ')}</p>` : '<p class="meta">Chưa ghi nhận lượt dùng trong cửa sổ thống kê.</p>'}
      ${item.source === 'admin' && item.status === 'approved' ? '<button class="btn" type="button" data-skill-disable>Tắt skill</button>' : ''}
      <p class="meta">Hiển thị tối đa 200 phiên bản gần nhất. Các bản cũ vẫn được lưu.</p>
      ${data.versions.map(version => {
        const admin = item.source === 'admin', rewritten = version.rewritten_text != null;
        const lint = rewritten ? version.rewrite_lint : version.lint, canApprove = admin && !version.rejected_at && lint?.ok && !['queued', 'running'].includes(version.rewrite?.status);
        const fresh = admin && !version.rejected_at && !version.approved_by && !version.rewrite && !rewritten;
        return `<details class="skill-version"${version.version === data.versions[0].version ? ' open' : ''}><summary>Phiên bản ${esc(version.version)} · ${esc(admin ? versionState(version, item.active_version_id) : 'Mặc định')}${version.parent_version_id ? ' · sửa từ bản trước' : ''}</summary>
        <p>${lint?.ok ? 'Lint đạt' : `Lint chưa đạt: ${esc((lint?.errors || []).join('; '))}`}${rewritten ? ' (bản viết lại)' : ''}</p>
        ${version.rewrite ? `<p>${esc(REWRITE[version.rewrite.status])}${version.rewrite.error ? `: ${esc(version.rewrite.error)}` : ''}${version.rewrite.usage ? `. ${Number(version.rewrite.usage.model_calls)} lượt gọi, ${Number(version.rewrite.usage.tokens)} token.` : ''}</p>` : ''}
        ${evalHtml(version)}
        ${rewritten ? diffHtml(version.original_text, version.rewritten_text) : `<pre class="skill-source">${esc(version.original_text)}</pre>`}
        ${version.rewrite?.raw_response ? `<details><summary>Phản hồi gốc của model</summary><pre class="skill-source">${esc(version.rewrite.raw_response)}</pre></details>` : ''}
        ${admin ? `<div class="toolbar">
          ${fresh ? `<button class="btn" type="button" data-skill-rewrite="${version.id}">Viết lại cho model nội bộ</button>` : ''}
          <button class="btn" type="button" data-skill-approve="${version.id}"${canApprove && version.id !== item.active_version_id ? '' : ' disabled'}>Duyệt và chọn phiên bản này</button>
          ${!version.rejected_at && version.id !== item.active_version_id && version.rewrite?.status !== 'running' ? `<button class="btn" type="button" data-skill-reject="${version.id}">Từ chối</button>` : ''}
          ${version.approved_by && !version.rejected_at && version.id !== item.active_version_id ? `<button class="btn" type="button" data-skill-rollback="${version.id}">Khôi phục phiên bản này</button>` : ''}
          <button class="btn" type="button" data-skill-edit="${version.id}">Sửa thành phiên bản mới</button></div>
        <form class="skill-edit" data-edit-form="${version.id}" hidden><label>Nội dung sửa<textarea rows="10" spellcheck="false">${esc(version.rewritten_text ?? version.original_text)}</textarea></label>
          <button class="btn" type="submit">Lưu phiên bản mới</button></form>` : ''}
      </details>`; }).join('')}`;
    const act = (selector, path, message, ask) => {
      for (const node of details.querySelectorAll(selector)) node.onclick = async () => {
        if (ask && !window.confirm(ask)) return;
        node.disabled = true;
        try {
          const body = path.body ? path.body(node) : { confirmed:true };
          const done = await api(path.url(node), { method:'POST', body:JSON.stringify(body) });
          if (!done.ok) { toast(done.data.message || 'Thao tác chưa thực hiện được.', 'err'); return; }
          toast(message); await mountSkillsTab(host, { api, toast });
        } catch (error) { toast(error.message || 'Thao tác thất bại.', 'err'); }
        finally { node.disabled = false; }
      };
    };
    const vurl = (key, action) => node => `/api/admin/ai-board/skills/${item.id}/versions/${node.dataset[key]}/${action}`;
    act('[data-skill-rewrite]', { url:vurl('skillRewrite', 'rewrite') }, 'Đã xếp hàng. Model chỉ chạy khi worker rảnh; làm mới để xem kết quả.', 'Model nội bộ sẽ viết lại skill này khi worker rảnh. Tiếp tục?');
    act('[data-skill-reject]', { url:vurl('skillReject', 'reject') }, 'Đã từ chối phiên bản.', 'Từ chối phiên bản này?');
    act('[data-skill-rollback]', { url:() => `/api/admin/ai-board/skills/${item.id}/rollback`, body:node => ({ confirmed:true, version_id:Number(node.dataset.skillRollback) }) }, 'Đã khôi phục phiên bản.', 'Chọn lại phiên bản đã duyệt trước đó?');
    for (const edit of details.querySelectorAll('[data-skill-edit]')) edit.onclick = () => { details.querySelector(`[data-edit-form="${edit.dataset.skillEdit}"]`).hidden = false; };
    for (const formNode of details.querySelectorAll('[data-edit-form]')) formNode.onsubmit = async event => {
      event.preventDefault();
      try {
        const done = await api(`/api/admin/ai-board/skills/${item.id}/versions/${formNode.dataset.editForm}/edit`, { method:'POST', body:JSON.stringify({ text:formNode.querySelector('textarea').value.replace(/\r\n/g, '\n') }) });
        if (!done.ok) { toast(done.data.message || 'Không lưu được bản sửa.', 'err'); return; }
        toast('Đã lưu phiên bản mới. Chưa kích hoạt.'); await mountSkillsTab(host, { api, toast });
      } catch (error) { toast(error.message || 'Không lưu được bản sửa.', 'err'); }
    };
    for (const approve of details.querySelectorAll('[data-skill-approve]')) approve.onclick = async () => {
      approve.disabled = true;
      try {
        const reviewed = await api(`/api/admin/ai-board/skills/${item.id}/approve`, { method:'POST', body:JSON.stringify({ version_id:Number(approve.dataset.skillApprove), confirmed:true }) });
        if (!reviewed.ok) { toast(reviewed.data.message || 'Chưa duyệt được skill.', 'err'); return; }
        toast('Đã duyệt và chọn phiên bản.');
        await mountSkillsTab(host, { api, toast });
      } catch (error) { toast(error.message || 'Không duyệt được skill.', 'err'); }
      finally { approve.disabled = false; }
    };
    const disable = details.querySelector('[data-skill-disable]');
    if (disable) disable.onclick = async () => {
      disable.disabled = true;
      try {
        const off = await api(`/api/admin/ai-board/skills/${item.id}/disable`, { method:'POST', body:JSON.stringify({ confirmed:true }) });
        if (!off.ok) { toast(off.data.message || 'Chưa tắt được skill.', 'err'); return; }
        toast('Đã tắt skill.'); await mountSkillsTab(host, { api, toast });
      } catch (error) { toast(error.message || 'Không tắt được skill.', 'err'); }
      finally { disable.disabled = false; }
    };
    details.scrollIntoView({ block:'start', behavior:'smooth' });
    } catch (error) { toast(error.message || 'Không đọc được skill.', 'err'); }
    finally { button.disabled = false; }
  };
}
