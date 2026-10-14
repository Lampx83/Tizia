const base = '/api/ai-board/lessons';
const status = document.querySelector('#status');
let admin = false;
const states = { proposed:'Đề xuất chưa xác minh', legacy:'Bản cũ chưa review', verified:'Đã xác minh', curated:'Giữ dài hạn', rejected:'Đã từ chối', expired:'Đã hết hạn', deleted:'Đã xóa' };
const reasons = { ...states, revalidation_due:'Đến hạn kiểm lại', source_expired:'Nguồn hết hạn', evidence_changed:'Evidence nguồn thiếu hoặc đã thay đổi', dependency_changed:'Kế hoạch hoặc file nguồn đã thay đổi', dependency_unavailable:'Không kiểm tra được file nguồn', scope_changed:'Phạm vi nguồn đã thay đổi', scope_denied:'Quyền đối với nguồn đã bị thu hồi' };
const date = value => value ? new Date(Number(value)).toLocaleString('vi-VN') : '—';
function el(tag, text, className) {
  const node = document.createElement(tag);
  if (text !== undefined) node.textContent = text;
  if (className) node.className = className;
  return node;
}
async function api(path, body) {
  const options = { credentials:'same-origin', headers:{} };
  if (body !== undefined) {
    const csrf = await api('/api/csrf');
    options.method = 'POST';
    options.headers = { 'Content-Type':'application/json', 'X-CSRF-Token':csrf.token };
    options.body = JSON.stringify(body);
  }
  const response = await fetch(path, options);
  const data = await response.json().catch(() => ({}));
  if (response.status === 401) { location.assign('/login.html'); throw new Error('Phiên đăng nhập đã hết hạn.'); }
  if (!response.ok) throw new Error(response.status === 403 ? 'Bạn không còn quyền thực hiện thao tác này.' : `Không hoàn tất thao tác: ${data.error || response.status}. Tải lại để kiểm tra phiên bản hiện tại.`);
  return data;
}
async function action(button, fn, output = status) {
  button.disabled = true;
  output.textContent = 'Đang xử lý…'; output.classList.remove('error');
  try { await fn(); }
  catch (error) { output.textContent = error.message; output.classList.add('error'); }
  finally { button.disabled = false; }
}
function button(text, fn) {
  const node = el('button', text); node.type = 'button';
  node.addEventListener('click', () => action(node, fn));
  return node;
}
function field(form, title, type, required = true) {
  const label = el('label', title), input = el(type === 'textarea' ? 'textarea' : 'input');
  if (type !== 'textarea') input.type = type;
  input.required = required; label.append(input); form.append(label);
  return input;
}
function details(title, content) { const node = el('details'); node.append(el('summary', title), content); return node; }
function renderLesson(lesson) {
  const node = el('article', undefined, 'lesson');
  node.append(el('h2', `Bài học ${lesson.id} · ${states[lesson.state] || lesson.state}`));
  node.append(el('p', lesson.text || 'Nội dung đã được xóa theo thời hạn lưu trữ.', 'lesson-text'));
  node.append(el('p', `Phiên bản ${lesson.version} · ${lesson.visibility === 'repository' ? 'Dùng chung trong repository' : 'Phạm vi riêng'} · ${lesson.kind}`, 'meta'));
  node.append(el('p', lesson.eligibility_reason ? `Chưa được dùng lại: ${reasons[lesson.eligibility_reason] || lesson.eligibility_reason}` : 'Đủ điều kiện dùng lại theo kiểm tra hiện tại.', lesson.eligibility_reason ? 'ineligible' : 'eligible'));
  node.append(el('p', `Tạo: ${date(lesson.created_at)} · Kiểm lại/hết hạn: ${date(lesson.review_due_at)} · Kết thúc: ${date(lesson.ended_at)}`, 'meta'));
  const source = el('p', `Ticket ${lesson.ticket_id} · Run ${lesson.run_id} · Evidence ${lesson.evidence_trace_id} · Cổng ${lesson.gate ?? '—'} · Files: ${(lesson.files || []).join(', ') || '—'}`, 'meta');
  node.append(details('Nguồn và bằng chứng', source));
  async function review(operation, extra = {}) { await api(`${base}/${lesson.id}/review`, {version:lesson.version, operation, ...extra}); await load(); }
  if (!['rejected','deleted','expired'].includes(lesson.state)) {
    const actions = el('div', undefined, 'actions');
    if (['proposed','legacy'].includes(lesson.state)) actions.append(button('Xác minh từ evidence', () => review('verify')));
    actions.append(button('Từ chối', () => review('reject')), button('Xóa bài học', () => review('delete')));
    if (admin && !lesson.eligibility_reason) {
      if (lesson.visibility !== 'repository') actions.append(button('Chia sẻ trong repository', () => review('promote')));
      if (lesson.state !== 'curated') actions.append(button('Giữ dài hạn', () => review('curate')));
    }
    node.append(actions);
    const correction = el('form'), text = field(correction, 'Nội dung sửa (tối đa 300 ký tự)', 'textarea');
    text.maxLength = 300; text.value = lesson.text || '';
    const save = el('button', 'Lưu bản sửa để xác minh lại'); save.type = 'submit'; correction.append(save);
    correction.addEventListener('submit', event => { event.preventDefault(); action(save, () => review('correct', {text:text.value})); });
    node.append(details('Sửa bài học', correction));
    if (['verified','curated','proposed','legacy'].includes(lesson.state)) {
      const form = el('form'), run = field(form, 'Run mới có bằng chứng đã được chấp nhận', 'number'), gate = field(form, 'Cổng có evidence đạt', 'number');
      run.min = '1'; gate.min = '1';
      const submit = el('button', 'Kiểm lại bằng evidence mới'); submit.type = 'submit'; form.append(submit);
      form.addEventListener('submit', event => { event.preventDefault(); action(submit, () => review(['proposed','legacy'].includes(lesson.state) ? 'verify' : 'revalidate', {run_id:Number(run.value), gate:Number(gate.value)})); });
      node.append(details('Kiểm lại tính hợp lệ', form));
    }
  }
  const history = el('div'), historyDetails = details('Lịch sử review', history);
  historyDetails.addEventListener('toggle', async () => {
    if (!historyDetails.open) return;
    history.textContent = 'Đang tải…';
    try { const data = await api(`${base}/${lesson.id}/history`); history.replaceChildren(...data.history.map(item => el('p', `v${item.version} · ${item.operation} · Người thực hiện ${item.actor_user_id ?? 'server'} · ${date(item.created_at)}`, 'meta'))); }
    catch (error) { history.textContent = error.message; }
  });
  node.append(historyDetails); return node;
}
async function load() {
  const list = document.querySelector('#lessons');
  list.replaceChildren(); status.textContent = 'Đang tải…'; status.classList.remove('error');
  try {
    const data = await api(base);
    list.replaceChildren(...data.lessons.map(renderLesson));
    status.textContent = data.lessons.length ? `${data.lessons.length} bài học có quyền xem (tối đa 100 bản mới nhất).` : 'Chưa có bài học có quyền xem.';
  } catch (error) { status.textContent = error.message; status.classList.add('error'); }
}
document.querySelector('#reload').addEventListener('click', () => load());
document.querySelector('#sweep').addEventListener('click', event => action(event.currentTarget, async () => { await api(`${base}/maintenance`, {}); await load(); }));
const importStatus = document.querySelector('#import-status');
document.querySelector('#import-form').addEventListener('submit', event => {
  event.preventDefault();
  action(event.submitter, async () => {
    const file = document.querySelector('#legacy-file').files[0];
    if (!file || file.size > 5 * 1024 * 1024) throw new Error('Chọn file JSONL không quá 5 MB.');
    const raw = await file.text();
    const hash = [...new Uint8Array(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(raw)))].map(b => b.toString(16).padStart(2,'0')).join('');
    const entries = raw.split(/\r?\n/).filter(line => line.trim()).map((line, index) => {
      let item; try { item = JSON.parse(line); } catch { throw new Error(`JSON không hợp lệ ở bản ${index + 1}. Chưa gửi file lên server.`); }
      if (!item || typeof item !== 'object' || typeof (item.text ?? item.reason) !== 'string' || !(item.text ?? item.reason).trim() || (item.text ?? item.reason).length > 300) throw new Error(`Nội dung bản ${index + 1} không hợp lệ (1–300 ký tự).`);
      return {entry_key:String(index + 1), ticket_id:item.ticket_id ?? item.ticket, run_id:item.run_id, gate:item.gate, text:item.text ?? item.reason, files:item.files ?? []};
    });
    if (!entries.length) throw new Error('File không có bài học.');
    const report = {source_sha256:hash, source_name:file.name, batches:[]};
    const result = document.querySelector('#import-results'); result.replaceChildren();
    for (let offset = 0; offset < entries.length; offset += 100) {
      const batch_key = `jsonl:${hash}:${offset / 100}`;
      const data = await api(`${base}/import`, {batch_key, entries:entries.slice(offset, offset + 100)});
      report.batches.push({batch_key, entries:data.entries});
      result.append(el('p', `Lô ${batch_key}: ${data.entries.filter(entry => entry.disposition === 'legacy').length} bản nhập; ${data.entries.filter(entry => entry.disposition === 'quarantine').length} bản cách ly.`, 'meta'));
      // Each successful chunk gets a report even if a later chunk fails; retry uses the same identities.
      const old = result.querySelector('a'); if (old) { URL.revokeObjectURL(old.href); old.remove(); }
      const link = el('a', 'Tải báo cáo đối chiếu và mã lô'); link.download = `tizia-lessons-import-${hash.slice(0,12)}.json`;
      link.href = URL.createObjectURL(new Blob([JSON.stringify(report, null, 2)], {type:'application/json'})); result.append(link);
    }
    importStatus.textContent = 'Đã đối chiếu. File gốc không thay đổi; các bản nhập vẫn cần review.'; await load();
  }, importStatus);
});
document.querySelector('#rollback-form').addEventListener('submit', event => {
  event.preventDefault();
  action(event.submitter, async () => {
    const key = document.querySelector('#batch-key').value.trim();
    const data = await api(`${base}/import/${encodeURIComponent(key)}/rollback`, {});
    importStatus.textContent = `Đã hoàn tác ${data.rolled_back} bản; giữ ${data.preserved} bản đã thay đổi.`; await load();
  }, importStatus);
});
try {
  const me = await api('/api/auth/me'); admin = me.user?.role === 'admin';
  document.querySelector('#migration').hidden = false;
  document.querySelector('#maintenance').hidden = !admin;
  await load();
} catch (error) { status.textContent = error.message; status.classList.add('error'); }
