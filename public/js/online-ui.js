// Host renderer for the platform's data-only UI schema (server/ai-board/online/schema.js).
// Draws ONLY via createElement + textContent. No innerHTML, no attributes taken from the schema except
// plain input names/types from a fixed allow-list, no URLs, no handlers supplied by generated code.
const el = (doc, tag, text, cls) => {
  const node = doc.createElement(tag);
  if (text !== undefined) node.textContent = String(text);
  if (cls) node.className = cls;
  return node;
};
const show = (v) => (v === null || v === undefined ? '' : typeof v === 'boolean' ? (v ? 'Có' : 'Không') : String(v));
const ERRORS = {
  authentication_required: 'Phiên đăng nhập đã hết hạn. Hãy đăng nhập lại.',
  scope_denied: 'Bạn không có quyền với dữ liệu này.',
  feature_unavailable: 'Chức năng này hiện chưa được phát hành.',
  operation_not_approved: 'Thao tác này chưa được duyệt.',
  record_not_found: 'Không tìm thấy bản ghi.',
  redirect_denied: 'Dịch vụ đích phản hồi không hợp lệ.',
  adapter_unreachable: 'Không kết nối được dịch vụ đích. Thử lại sau.',
};
const message = (code) => ERRORS[code] || 'Có lỗi xảy ra. Thử lại sau.';

/**
 * api = { list(resourceId) -> records[], create(resourceId, data), invoke(operation, recordId) -> {result} }
 * Each throws Error with .code on failure. Returns the root node.
 */
export function renderSchema(schema, { doc = document, api }) {
  const reloads = []; // lists refresh after a form saves
  const reloadAll = () => reloads.forEach((fn) => fn());
  const root = el(doc, 'main', undefined, 'ou-root');
  root.append(el(doc, 'h1', schema.title));
  for (const block of schema.blocks) {
    const section = el(doc, 'section', undefined, 'ou-block');
    if (block.type === 'heading') section.append(el(doc, 'h2', block.text));
    else if (block.type === 'text') section.append(el(doc, 'p', block.text));
    else if (block.type === 'record_list') section.append(...recordList(doc, block, api, reloads));
    else if (block.type === 'form') section.append(...form(doc, block, api, reloadAll));
    root.append(section);
  }
  return root;
}

function status(doc) {
  const s = el(doc, 'p', '', 'ou-status');
  s.setAttribute('role', 'status');
  return s;
}

function recordList(doc, block, api, reloads) {
  const title = el(doc, 'h2', block.title);
  const note = status(doc);
  const body = el(doc, 'div', undefined, 'ou-list');
  const load = async () => {
    body.replaceChildren();
    note.textContent = 'Đang tải…';
    try {
      const rows = await api.list(block.resource_id);
      note.textContent = rows.length ? '' : 'Chưa có bản ghi nào.';
      for (const row of rows) {
        const item = el(doc, 'article', undefined, 'ou-row');
        const dl = el(doc, 'dl');
        for (const f of block.fields) { dl.append(el(doc, 'dt', f.label), el(doc, 'dd', show(row.data?.[f.name]))); }
        item.append(dl);
        for (const a of block.row_actions) {
          const b = el(doc, 'button', a.label, 'ou-btn');
          b.type = 'button';
          b.addEventListener('click', async () => {
            b.disabled = true;
            note.textContent = 'Đang gửi…';
            try { await api.invoke(a.operation, row.id); note.textContent = 'Đã gửi thành công.'; }
            catch (error) { note.textContent = message(error.code); }
            finally { b.disabled = false; b.focus?.(); } // a disabled control drops keyboard focus
          });
          item.append(b);
        }
        body.append(item);
      }
    } catch (error) { note.textContent = message(error.code); }
  };
  reloads.push(load);
  load();
  return [title, note, body];
}

function form(doc, block, api, reloadAll) {
  const title = el(doc, 'h2', block.title);
  const f = el(doc, 'form', undefined, 'ou-form');
  const note = status(doc);
  const inputs = block.fields.map((field, i) => {
    const label = el(doc, 'label', field.label);
    const input = doc.createElement('input');
    input.type = field.kind; // 'text' | 'number' | 'checkbox' only; validated by the platform schema
    input.name = field.name;
    input.id = `ou-${block.resource_id}-${i}-${field.name}`;
    label.htmlFor = input.id;
    f.append(label, input);
    return [field, input];
  });
  const submit = el(doc, 'button', block.submit_label, 'ou-btn ou-primary');
  submit.type = 'submit';
  f.append(submit);
  f.addEventListener('submit', async (event) => {
    event.preventDefault();
    const data = {};
    for (const [field, input] of inputs) {
      data[field.name] = field.kind === 'checkbox' ? !!input.checked : field.kind === 'number' ? Number(input.value) : input.value;
    }
    submit.disabled = true;
    try { await api.create(block.resource_id, data); note.textContent = 'Đã lưu.'; f.reset?.(); reloadAll(); }
    catch (error) { note.textContent = message(error.code); }
    finally { submit.disabled = false; submit.focus?.(); }
  });
  return [title, f, note];
}

/** Browser wiring: same-origin session cookie + CSRF token from /api/csrf. */
export function browserApi(featureId, fetchImpl = fetch) {
  const base = `/api/ai-board/features/${encodeURIComponent(featureId)}`;
  let csrf;
  const call = async (path, body) => {
    const headers = { 'Content-Type': 'application/json' };
    if (body !== undefined) {
      csrf ??= (await (await fetchImpl('/api/csrf', { credentials: 'same-origin' })).json()).token;
      headers['X-CSRF-Token'] = csrf;
    }
    const res = await fetchImpl(base + path, { method: body === undefined ? 'GET' : 'POST', credentials: 'same-origin', headers,
      body: body === undefined ? undefined : JSON.stringify(body) });
    const json = await res.json().catch(() => ({}));
    if (!res.ok) throw Object.assign(new Error(json.error || 'error'), { code: json.error });
    return json;
  };
  return {
    schema: () => call('/online/ui'),
    list: (r) => call(`/resources/${r}/records`),
    create: (r, data) => call(`/resources/${r}/records`, { data }),
    invoke: (operation, recordId) => call('/online/invoke', { operation, record_id: recordId }),
  };
}

export async function mount(container, featureId) {
  const api = browserApi(featureId);
  try { container.replaceChildren(renderSchema(await api.schema(), { api })); }
  catch (error) {
    const p = el(document, 'p', message(error.code), 'ou-status');
    p.setAttribute('role', 'alert');
    container.replaceChildren(p);
  }
}
