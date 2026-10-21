const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[c]));
const TYPE = { backend:'Backend', frontend:'Giao diện', database:'Cơ sở dữ liệu', review:'Review', test:'Kiểm thử', all:'Chung' };
const STATUS = { draft:'Bản nháp', approved:'Đã duyệt', disabled:'Đã tắt' };
const sample = name => `---\nname: ${name}\ndescription: Hướng dẫn cho giao diện hiện có\ntask_type: frontend\nsource: admin\nversion: 1\nmax_tokens: 1500\n---\n1. Giữ nhãn nút rõ ràng.\n2. Kiểm tra thao tác bằng bàn phím.\n`;

export async function mountSkillsTab(host, { api, toast }) {
  const result = await api('/api/admin/ai-board/skills');
  if (!result.ok) throw new Error('Không tải được danh sách skill. Thử làm mới trang.');
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
      ${data.versions.map(version => `<details class="skill-version"${version.version === data.versions[0].version ? ' open' : ''}><summary>Phiên bản ${esc(version.version)}${version.id === item.active_version_id ? ' · Đang được chọn' : ''}${item.source === 'admin' ? version.approved_by ? ' · Đã duyệt' : ' · Bản nháp' : ''}</summary>
        <p>${version.lint?.ok ? 'Lint đạt' : `Lint chưa đạt: ${esc((version.lint?.errors || []).join('; '))}`}</p>
        <pre class="skill-source">${esc(version.rewritten_text ?? version.original_text)}</pre>
        ${item.source === 'admin' ? `<button class="btn" type="button" data-skill-approve="${version.id}"${version.lint?.ok ? '' : ' disabled'}>Duyệt và chọn phiên bản này</button>` : ''}
      </details>`).join('')}`;
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
