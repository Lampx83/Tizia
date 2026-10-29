import { NOTE_MAX, POLL_MS, REWRITE, hasActiveRewrite, liveVersion, rewriteStatus, rowPill, shouldPoll, tokenLabel } from './admin-skills-state.js?v=skills-tok1';

const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[c]));
// Native dialogs are suppressed in the in-app browser; an in-page <dialog> works everywhere.
const confirmDialog = message => new Promise(resolve => {
  const dialog = document.createElement('dialog');
  dialog.className = 'skill-confirm';
  dialog.innerHTML = `<p>${esc(message)}</p><div class="toolbar"><button class="btn" type="button" value="cancel">Hủy</button><button class="btn" type="button" value="ok">Tiếp tục</button></div>`;
  dialog.addEventListener('close', () => { resolve(dialog.returnValue === 'ok'); dialog.remove(); });
  dialog.querySelector('[value=ok]').onclick = () => dialog.close('ok');
  dialog.querySelector('[value=cancel]').onclick = () => dialog.close('cancel');
  document.body.append(dialog);
  dialog.showModal();
});
const rewriteDialog = () => new Promise(resolve => {
  const dialog = document.createElement('dialog');
  dialog.className = 'skill-confirm';
  dialog.innerHTML = `<h4 class="skill-confirm-title">Viết lại cho model nội bộ</h4>
    <p>Model chạy khi worker rảnh. Ghi chú bên dưới đi qua cùng bộ lọc an toàn như yêu cầu gửi vào hệ thống và không đổi được tên, loại tác vụ hay giới hạn token. Mỗi phiên bản viết lại tối đa 5 lần mỗi giờ.</p>
    <label for="rewrite-note">Ghi chú thêm cho model (không bắt buộc)</label>
    <textarea id="rewrite-note" rows="4" maxlength="${NOTE_MAX}" spellcheck="false" placeholder="Ví dụ: giữ đủ 6 bước, ngắn hơn 900 ký tự"></textarea>
    <p class="meta"><span data-note-count>0</span>/${NOTE_MAX} ký tự</p>
    <div class="toolbar"><button class="btn" type="button" value="cancel">Hủy</button><button class="btn" type="button" value="ok">Viết lại</button></div>`;
  const note = dialog.querySelector('textarea');
  note.addEventListener('input', () => { dialog.querySelector('[data-note-count]').textContent = String(note.value.length); });
  dialog.addEventListener('close', () => { resolve(dialog.returnValue === 'ok' ? { instructions:note.value.trim() } : null); dialog.remove(); });
  dialog.querySelector('[value=ok]').onclick = () => dialog.close('ok');
  dialog.querySelector('[value=cancel]').onclick = () => dialog.close('cancel');
  document.body.append(dialog);
  dialog.showModal();
});
const rewriteBody = picked => (picked.instructions ? { confirmed:true, instructions:picked.instructions } : { confirmed:true });
const rewriteError = done => done.data?.error === 'rate_limited'
  ? `Đã quá giới hạn viết lại. Thử lại sau ${Math.max(1, Math.ceil(Number(done.data.retry_after_s || 60) / 60))} phút.`
  : (done.data?.message || 'Chưa xếp hàng viết lại.');
const bindTokenCount = (textarea, node) => {
  const paint = () => { const t = tokenLabel(textarea.value); node.textContent = t.text; node.dataset.over = String(t.over); node.title = t.over ? 'Vượt giới hạn token của skill: không lưu được' : 'Ước lượng theo độ dài UTF-8 (cận trên); bộ đếm Qwen thật chưa có'; };
  textarea.addEventListener('input', paint);
  paint();
};
const TYPE = { backend:'Backend', frontend:'Giao diện', database:'Cơ sở dữ liệu', review:'Review', test:'Kiểm thử', merge:'Hợp nhất', all:'Chung' };
const STATUS = { draft:'Bản nháp', approved:'Đã duyệt', disabled:'Đã tắt' };
const lineDiff = (a, b) => {
  const x = a.replace(/\n$/, '').split('\n'), y = b.replace(/\n$/, '').split('\n'), t = Array.from({ length:x.length + 1 }, () => new Array(y.length + 1).fill(0));
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
  `<span class="diff-${kind}">${kind === 'add' ? '+ ' : kind === 'del' ? '- ' : '  '}${esc(line)}</span>`).join('')}</pre>`;
const versionState = (version, active) => version.rejected_at ? 'Đã từ chối' : version.id === active ? 'Đang được chọn' : version.approved_by ? 'Đã duyệt' : version.rewrite ? REWRITE[version.rewrite.status] : 'Bản nháp';
const when = ms => Number.isFinite(Number(ms)) ? new Date(Number(ms)).toLocaleString('vi-VN', { dateStyle:'short', timeStyle:'short' }) : '';
const evalHtml = version => !version.evaluation?.kinds ? '' : `<p class="meta">Smoke test nhỏ: ${version.evaluation.passed}/${version.evaluation.total} loại tác vụ qua. ${version.evaluation.kinds.map(kind =>
  `${esc(TYPE[kind.kind] || kind.kind)} ${kind.ok ? 'qua' : `chưa qua (${esc(kind.reason || 'không rõ')})`}`).join('; ')}. Đây chỉ là kiểm tra dạng đầu ra, không đo chất lượng.</p>`;
const sample = name => `---\nname: ${name}\ndescription: Hướng dẫn cho giao diện hiện có\ntask_type: frontend\nsource: admin\nversion: 1\nmax_tokens: 1500\n---\n1. Giữ nhãn nút rõ ràng.\n2. Kiểm tra thao tác bằng bàn phím.\n`;

let teardown = null;

export async function mountSkillsTab(host, { api, toast, openId } = {}) {
  teardown?.();
  teardown = null;
  const result = await api('/api/admin/ai-board/skills');
  if (!result.ok) throw new Error('Không tải được danh sách skill. Thử làm mới trang.');
  const skills = result.data.skills;

  host.innerHTML = `<section class="skills-panel">
    <div class="toolbar"><p class="meta skills-lead">Bản nháp chưa được nạp. Bản đã duyệt sẵn sàng cho lượt chạy được bật Skills; tính năng vẫn trong phạm vi thử nghiệm.</p><span class="spacer"></span><button type="button" class="btn" id="skill-add">Thêm skill</button></div>
    <form id="skill-upload" class="skills-form" hidden>
      <h3>Thêm skill</h3>
      <label for="skill-name">Tên skill</label><input id="skill-name" name="name" required maxlength="64" pattern="[a-z][a-z0-9-]*" value="frontend-guide">
      <label for="skill-file">Đọc từ tệp Markdown (không bắt buộc)</label><input id="skill-file" type="file" accept=".md,.txt,text/plain,text/markdown">
      <fieldset><legend>Loại tác vụ</legend>${Object.entries(TYPE).map(([value,label]) =>
        `<label class="skill-type"><input type="checkbox" name="task_type" value="${value}"${value === 'frontend' ? ' checked' : ''}> ${label}</label>`).join('')}</fieldset>
      <div class="tok-head"><label for="skill-original">Nội dung gốc</label><span class="tok-count" data-token-count></span></div><textarea id="skill-original" rows="12" required spellcheck="false">${esc(sample('frontend-guide'))}</textarea>
      <p class="meta">Dùng đủ các trường trong mẫu, tối đa 7 quy tắc ngắn. Lưu bản nháp chưa gọi model hoặc kích hoạt skill.</p>
      <div class="toolbar skill-form-actions">
        <button class="btn" type="button" data-skill-act="rewrite">Viết lại cho model nội bộ</button>
        <button class="btn" type="button" data-skill-act="approve">Duyệt và chọn phiên bản này</button>
        <button class="btn primary" type="submit">Lưu bản nháp</button>
        <button class="btn" type="button" data-skill-act="close">Đóng</button>
      </div>
      <p id="skill-upload-status" role="status"></p>
    </form>
    <div class="skill-grid">
      <div class="skill-list" role="listbox" aria-label="Danh sách Skills">
        ${skills.map(skill => `<button type="button" class="skill-row" role="option" aria-current="false" data-skill-view="${esc(skill.id ?? skill.name)}">
          <span class="skill-name">${esc(skill.name)}</span>
          <span class="skill-tags"><span class="pill">${esc(STATUS[skill.status] || skill.status)}</span><span class="skill-state" data-skill-state="${esc(skill.id ?? skill.name)}"></span></span>
          <span class="skill-sub">${skill.source === 'default' ? 'Mặc định' : 'Quản trị'} · ${skill.task_types.map(type => esc(TYPE[type] || type)).join(', ')} · v${esc(skill.version || 1)} · ${skill.usage?.calls ?? 0} lượt</span>
        </button>`).join('')}
      </div>
      <section id="skill-details" class="skill-detail" aria-live="polite"></section>
    </div>
    <p class="meta">Cách đọc số liệu: "Đã dùng" đếm các bước có dùng skill này trong 2.000 bước ghi gần nhất, cộng dồn mọi phiên bản. "Lượt chạy không bị chặn" là các lượt chạy đã tới bước tạo PR hoặc đang chờ người duyệt; đây là kết quả của cả lượt chạy, không phải điểm riêng của skill.</p>
  </section>`;

  const refresh = nextId => mountSkillsTab(host, { api, toast, openId: nextId });

  const loadDetail = async item => item.source === 'default'
    ? { versions: [{ version: item.version, original_text: item.original_text, lint: item.lint }] }
    : (await api(`/api/admin/ai-board/skills/${item.id}`)).data;
  const paintLive = (node, versions) => {
    const version = liveVersion(versions);
    const status = version && rewriteStatus(version.rewrite, Date.now());
    node.hidden = !status;
    if (!status) return;
    node.dataset.tone = status.tone;
    node.textContent = status.hint ? `${status.text}. ${status.hint}` : status.text;
  };
  const paintRow = (key, versions) => {
    const node = host.querySelector(`[data-skill-state="${CSS.escape(String(key))}"]`);
    const pill = rowPill(versions?.[0]?.rewrite);
    if (node) node.innerHTML = pill ? `<span class="pill skill-pill" data-tone="${pill.tone}">${esc(pill.label)}</span>` : '';
  };
  const renderDetail = (item, data) => {
    const details = host.querySelector('#skill-details');
    for (const row of host.querySelectorAll('[data-skill-view]'))
      row.setAttribute('aria-current', row.dataset.skillView === String(item.id ?? item.name) ? 'true' : 'false');
    if (!data?.versions) { details.textContent = 'Không đọc được skill. Thử lại.'; return; }
    const activeId = item.status === 'approved' ? item.active_version_id : null;
    const admin = item.source === 'admin';
    details.innerHTML = `<h3 class="skill-detail-title">${esc(item.name)} <span class="pill">${esc(STATUS[item.status] || item.status)}</span></h3>
      <p class="rewrite-live" data-live-status role="status" hidden></p>
      <p class="meta">${esc(item.task_types.map(type => TYPE[type] || type).join(', '))} · ${item.usage?.calls ? `Đã dùng ${esc(String(item.usage.calls))} lần gần đây` : 'Chưa được dùng trong lượt chạy nào gần đây'} · ${item.usage?.judged ? `${item.usage.passed}/${item.usage.judged} lượt chạy không bị chặn` : 'chưa có lượt chạy nào được chấm kết quả'}</p>
      ${item.usage?.steps?.length ? `<p class="meta">Đã dùng tại: ${item.usage.steps.map(step => `<a href="/admin-request.html?id=${Number(step.request_id)}">Yêu cầu #${Number(step.request_id)}, lượt ${Number(step.run_id)}, v${esc(step.version ?? '?')}</a>`).join(' · ')}</p>` : ''}
      <div class="toolbar">${admin && item.status === 'approved' ? '<button class="btn" type="button" data-skill-disable>Tắt skill</button>' : ''}
        <span class="meta">Lịch sử tối đa 200 phiên bản gần nhất; bản cũ vẫn được lưu.${data.versions[0]?.lint?.max_tokens ? ` Giới hạn ${esc(String(data.versions[0].lint.max_tokens))} token cho skill này.` : ''}</span></div>
      <ol class="ver-list">${data.versions.map((version, index) => {
        const rewritten = version.rewritten_text != null;
        const lint = rewritten ? version.rewrite_lint : version.lint;
        const canApprove = admin && !version.rejected_at && lint?.ok && !['queued', 'running'].includes(version.rewrite?.status);
        const canRewrite = admin && !version.rejected_at && !version.approved_by && !['queued', 'running'].includes(version.rewrite?.status);
        const isActive = version.id === activeId;
        return `<li class="ver-row${isActive ? ' active' : ''}">
          <button type="button" class="ver-sum" aria-expanded="${index === 0}" data-ver-toggle>
            <span class="ver-no">v${esc(version.version)}</span>
            <span class="ver-state">${esc(admin ? versionState(version, activeId) : 'Mặc định')}${version.parent_version_id ? ' · sửa từ bản trước' : ''}</span>
            <span class="ver-flags">${lint?.ok ? 'lint đạt' : `<span title="${esc((lint?.errors || []).join('; '))}">lint lỗi</span>`}${version.created_at ? ' · ' + esc(when(version.created_at)) : ''}${rewritten ? ' · bản viết lại' : ''}</span>
          </button>
          <div class="ver-body"${index === 0 ? '' : ' hidden'}>
            ${version.rewrite ? `<p class="meta">${esc(REWRITE[version.rewrite.status])}${version.rewrite.error ? `: ${esc(version.rewrite.error)}` : ''}${version.rewrite.usage ? `. ${Number(version.rewrite.usage.model_calls)} lượt gọi, ${Number(version.rewrite.usage.tokens)} token.` : ''}</p>` : ''}
            ${evalHtml(version)}
            ${rewritten ? diffHtml(version.original_text, version.rewritten_text) : `<pre class="skill-source">${esc(version.original_text)}</pre>`}
            ${version.rewrite?.raw_response ? `<details><summary>Phản hồi gốc của model</summary><pre class="skill-source">${esc(version.rewrite.raw_response)}</pre></details>` : ''}
            ${admin ? `<div class="toolbar ver-actions">
              ${canRewrite ? `<button class="btn" type="button" data-skill-rewrite="${version.id}">${version.rewrite ? 'Viết lại lần nữa' : 'Viết lại cho model nội bộ'}</button>` : ''}
              <button class="btn" type="button" data-skill-approve="${version.id}"${canApprove && !isActive ? '' : ' disabled'}>Duyệt và chọn phiên bản này</button>
              ${!version.rejected_at && !isActive && version.rewrite?.status !== 'running' ? `<button class="btn" type="button" data-skill-reject="${version.id}">Từ chối</button>` : ''}
              ${version.approved_by && !version.rejected_at && !isActive ? `<button class="btn" type="button" data-skill-rollback="${version.id}">Khôi phục phiên bản này</button>` : ''}
              <button class="btn" type="button" data-skill-edit="${version.id}">Sửa tay thành phiên bản mới</button></div>
            <form class="skill-edit" data-edit-form="${version.id}" hidden><div class="tok-head"><label for="edit-text-${version.id}">Nội dung sửa</label><span class="tok-count" data-token-count></span></div><textarea id="edit-text-${version.id}" rows="10" spellcheck="false">${esc(version.rewritten_text ?? version.original_text)}</textarea>
              <div class="toolbar"><button class="btn primary" type="submit">Lưu phiên bản mới</button><button class="btn" type="button" data-edit-cancel>Đóng</button></div></form>` : ''}
          </div>
        </li>`;
      }).join('')}</ol>`;
    paintLive(details.querySelector('[data-live-status]'), data.versions);
    paintRow(item.id ?? item.name, data.versions);

    const fail = error => toast(error?.message || 'Thao tác thất bại.', 'err');
    const act = (selector, path, message, ask) => {
      for (const node of details.querySelectorAll(selector)) node.onclick = async () => {
        if (ask && !(await confirmDialog(ask))) return;
        node.disabled = true;
        try {
          const body = path.body ? path.body(node) : { confirmed:true };
          const done = await api(path.url(node), { method:'POST', body:JSON.stringify(body) });
          if (!done.ok) { toast(done.data.message || 'Thao tác chưa thực hiện được.', 'err'); return; }
          toast(message); await refresh(item.id);
        } catch (error) { fail(error); }
        finally { node.disabled = false; }
      };
    };
    const vurl = (key, action) => node => `/api/admin/ai-board/skills/${item.id}/versions/${node.dataset[key]}/${action}`;
    for (const node of details.querySelectorAll('[data-skill-rewrite]')) node.onclick = async () => {
      const picked = await rewriteDialog();
      if (!picked) return;
      node.disabled = true;
      try {
        const done = await api(vurl('skillRewrite', 'rewrite')(node), { method:'POST', body:JSON.stringify(rewriteBody(picked)) });
        if (!done.ok) { toast(rewriteError(done), 'err'); return; }
        toast('Đã xếp hàng. Model chỉ chạy khi worker rảnh.'); await refresh(item.id);
      } catch (error) { fail(error); }
      finally { node.disabled = false; }
    };
    act('[data-skill-reject]', { url:vurl('skillReject', 'reject') }, 'Đã từ chối phiên bản.', 'Từ chối phiên bản này?');
    act('[data-skill-rollback]', { url:() => `/api/admin/ai-board/skills/${item.id}/rollback`, body:node => ({ confirmed:true, version_id:Number(node.dataset.skillRollback) }) }, 'Đã khôi phục phiên bản.', 'Chọn lại phiên bản đã duyệt trước đó?');
    for (const toggle of details.querySelectorAll('[data-ver-toggle]')) toggle.onclick = () => {
      const body = toggle.closest('.ver-row').querySelector('.ver-body');
      body.hidden = !body.hidden;
      toggle.setAttribute('aria-expanded', String(!body.hidden));
    };
    for (const edit of details.querySelectorAll('[data-skill-edit]')) edit.onclick = () => {
      details.querySelector(`[data-edit-form="${edit.dataset.skillEdit}"]`).hidden = false;
    };
    for (const cancel of details.querySelectorAll('[data-edit-cancel]')) cancel.onclick = () => {
      cancel.closest('form').hidden = true;
    };
    for (const formNode of details.querySelectorAll('[data-edit-form]')) bindTokenCount(formNode.querySelector('textarea'), formNode.querySelector('[data-token-count]'));
    for (const formNode of details.querySelectorAll('[data-edit-form]')) formNode.onsubmit = async event => {
      event.preventDefault();
      try {
        const done = await api(`/api/admin/ai-board/skills/${item.id}/versions/${formNode.dataset.editForm}/edit`, { method:'POST', body:JSON.stringify({ text:formNode.querySelector('textarea').value.replace(/\r\n/g, '\n') }) });
        if (!done.ok) { toast(done.data.message || 'Không lưu được bản sửa.', 'err'); return; }
        toast('Đã lưu phiên bản mới. Chưa kích hoạt.'); await refresh(item.id);
      } catch (error) { fail(error); }
    };
    for (const approve of details.querySelectorAll('[data-skill-approve]')) approve.onclick = async () => {
      if (!(await confirmDialog('Duyệt phiên bản này và dùng nó cho các lượt chạy sau?'))) return;
      approve.disabled = true;
      try {
        const reviewed = await api(`/api/admin/ai-board/skills/${item.id}/approve`, { method:'POST', body:JSON.stringify({ version_id:Number(approve.dataset.skillApprove), confirmed:true }) });
        if (!reviewed.ok) { toast(reviewed.data.message || 'Chưa duyệt được skill.', 'err'); return; }
        toast('Đã duyệt và chọn phiên bản.'); await refresh(item.id);
      } catch (error) { fail(error); }
      finally { approve.disabled = false; }
    };
    const disable = details.querySelector('[data-skill-disable]');
    if (disable) disable.onclick = async () => {
      disable.disabled = true;
      try {
        const off = await api(`/api/admin/ai-board/skills/${item.id}/disable`, { method:'POST', body:JSON.stringify({ confirmed:true }) });
        if (!off.ok) { toast(off.data.message || 'Chưa tắt được skill.', 'err'); return; }
        toast('Đã tắt skill.'); await refresh(item.id);
      } catch (error) { fail(error); }
      finally { disable.disabled = false; }
    };
  };

  // Poll the open skill while a rewrite is queued/running. One timer, no overlap; stops when
  // hidden, detached (tab changed) or no active job. Re-render only when versions changed.
  let current = null, pollTimer = null, polling = false, seq = 0;
  const onVisibility = () => { if (document.hidden) schedule(); else poll(); };
  const armed = () => shouldPoll({ visible: !document.hidden, connected: host.isConnected, versions: current?.data?.versions });
  const schedule = () => {
    clearTimeout(pollTimer); pollTimer = null;
    if (!polling && armed()) pollTimer = setTimeout(poll, POLL_MS);
  };
  const poll = async () => {
    clearTimeout(pollTimer); pollTimer = null;
    if (polling || !armed()) return;
    polling = true;
    const { item, data: before } = current, mark = seq;
    try {
      const fresh = await loadDetail(item);
      if (mark === seq && fresh?.versions) {
        if (JSON.stringify(fresh.versions) !== JSON.stringify(before.versions)) {
          current.data = fresh;
          renderDetail(item, fresh);
        } else paintLive(host.querySelector('[data-live-status]'), before.versions);
      }
    } catch { /* transient; next tick retries */ }
    finally { polling = false; }
    schedule();
  };
  document.addEventListener('visibilitychange', onVisibility);
  teardown = () => { clearTimeout(pollTimer); document.removeEventListener('visibilitychange', onVisibility); };

  const select = async id => {
    const item = skills.find(skill => String(skill.id ?? skill.name) === String(id));
    if (!item) return;
    const mark = ++seq;
    try {
      const data = await loadDetail(item);
      if (mark !== seq) return;
      current = { item, data };
      renderDetail(item, data);
      schedule();
    } catch (error) { toast(error.message || 'Không đọc được skill.', 'err'); }
  };
  for (const button of host.querySelectorAll('[data-skill-view]')) button.onclick = () => select(button.dataset.skillView);
  for (const skill of skills.filter(item => item.source === 'admin')) {
    api(`/api/admin/ai-board/skills/${skill.id}`).then(result => {
      if (result.ok && result.data?.versions) paintRow(skill.id, result.data.versions);
    }).catch(() => {});
  }

  // Vào tab là thấy lịch sử: chọn sẵn skill quản trị mới nhất (hoặc openId/đầu danh sách).
  const adminSkills = skills.filter(skill => skill.source === 'admin').sort((a, b) => Number(b.updated_at ?? 0) - Number(a.updated_at ?? 0));
  const initial = openId ?? (adminSkills[0]?.id ?? skills[0]?.id ?? skills[0]?.name);
  if (initial != null) await select(initial);

  const form = host.querySelector('#skill-upload');
  const addButton = host.querySelector('#skill-add');
  const status = host.querySelector('#skill-upload-status');
  let saved = null, dirty = false;
  const setDirty = () => { dirty = true; };
  form.addEventListener('input', setDirty);
  form.addEventListener('change', setDirty);

  addButton.onclick = () => {
    form.hidden = false; saved = null; dirty = false; status.textContent = '';
    host.querySelector('#skill-name').focus();
    form.scrollIntoView({ block:'nearest', behavior:'smooth' });
  };
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
      setDirty();
    } catch { toast('Không đọc được tệp. Bạn có thể dán nội dung vào ô bên dưới.', 'err'); }
  };

  // Tạo bản nháp từ nội dung panel; trả null nếu chưa hợp lệ hoặc lỗi API.
  const createDraft = async () => {
    if (saved) return saved;
    const taskTypes = [...form.querySelectorAll('[name=task_type]:checked')].map(input => input.value);
    if (!taskTypes.length) { status.textContent = 'Chọn ít nhất một loại tác vụ.'; return null; }
    try {
      const response = await api('/api/admin/ai-board/skills', { method:'POST', body: JSON.stringify({
        name: host.querySelector('#skill-name').value, task_types: taskTypes,
        original_text: host.querySelector('#skill-original').value.replace(/\r\n/g, '\n') }) });
      if (!response.ok) { status.textContent = response.data.message || 'Không lưu được bản nháp.'; return null; }
      saved = response.data; dirty = false;
      status.textContent = '';
      return saved;
    } catch (error) { status.textContent = error.message; return null; }
  };

  const saveDraft = async () => {
    const draft = await createDraft();
    if (!draft) return null;
    toast(draft.version.lint.ok ? 'Đã lưu bản nháp. Chưa kích hoạt.' : 'Đã lưu bản nháp; cần sửa lỗi lint trước khi duyệt.');
    return draft;
  };

  bindTokenCount(form.querySelector('#skill-original'), form.querySelector('[data-token-count]'));
  form.onsubmit = async event => {
    event.preventDefault();
    const button = form.querySelector('[type=submit]');
    button.disabled = true;
    try {
      const draft = await createDraft();
      if (draft) { form.hidden = true; await refresh(draft.skill.id); }
    } finally { button.disabled = false; }
  };
  form.querySelector('[data-skill-act="rewrite"]').onclick = async () => {
    const picked = await rewriteDialog();
    if (!picked) return;
    const draft = await saveDraft();
    if (!draft) return;
    const result = await api(`/api/admin/ai-board/skills/${draft.skill.id}/versions/${draft.version.id}/rewrite`, { method:'POST', body: JSON.stringify(rewriteBody(picked)) });
    if (!result.ok) { toast(rewriteError(result), 'err'); return; }
    toast('Đã xếp hàng viết lại. Model chạy khi worker rảnh.');
    form.hidden = true; await refresh(draft.skill.id);
  };
  form.querySelector('[data-skill-act="approve"]').onclick = async () => {
    if (!(await confirmDialog('Duyệt bản nháp này và dùng nó cho các lượt chạy sau?'))) return;
    const draft = await saveDraft();
    if (!draft) return;
    const result = await api(`/api/admin/ai-board/skills/${draft.skill.id}/approve`, { method:'POST', body: JSON.stringify({ version_id: Number(draft.version.id), confirmed:true }) });
    if (!result.ok) { toast(result.data.message || 'Chưa duyệt được skill.', 'err'); return; }
    toast('Đã duyệt và chọn phiên bản.');
    form.hidden = true; await refresh(draft.skill.id);
  };
  form.querySelector('[data-skill-act="close"]').onclick = async () => {
    if (dirty) {
      const draft = await createDraft();
      if (draft) toast('Đã tự lưu bản nháp trước khi đóng.');
      form.hidden = true;
      await refresh(draft?.skill.id);
    } else {
      form.hidden = true;
      addButton.focus();
    }
  };
}
