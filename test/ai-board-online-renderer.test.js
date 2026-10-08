import test from 'node:test';
import assert from 'node:assert/strict';
import { renderSchema, browserApi } from '../public/js/online-ui.js';
import { validateUiSchema } from '../server/ai-board/online/schema.js';

// Minimal DOM that traps every HTML-injection path: any use of innerHTML/outerHTML/insertAdjacentHTML/src/href throws.
const TRAPPED = ['innerHTML', 'outerHTML', 'insertAdjacentHTML', 'src', 'href', 'srcdoc', 'action', 'formAction'];
function node(tag) {
  const n = { tag, children: [], listeners: {}, attrs: {}, textContent: '', className: '' };
  n.append = (...c) => { n.children.push(...c); };
  n.replaceChildren = (...c) => { n.children = c; };
  n.setAttribute = (k, v) => { n.attrs[k] = v; };
  n.addEventListener = (t, f) => { n.listeners[t] = f; };
  return new Proxy(n, { set(t, k, v) { if (TRAPPED.includes(k)) throw new Error(`forbidden DOM sink ${k}`); t[k] = v; return true; },
    get(t, k) { if (TRAPPED.includes(k)) throw new Error(`forbidden DOM sink ${k}`); return t[k]; } });
}
const doc = { createElement: node };
const walk = (n, out = []) => { out.push(n); n.children.forEach((c) => walk(c, out)); return out; };
const flush = () => new Promise((r) => setTimeout(r, 5));

const schema = validateUiSchema({ version: 1, title: 'Ghi chú', blocks: [
  { type: 'record_list', title: 'Danh sách', resource_id: 4, fields: [{ name: 'text', label: 'Nội dung' }], row_actions: [{ label: 'Gửi', operation: 'send_note' }] },
  { type: 'form', title: 'Thêm', resource_id: 4, fields: [{ name: 'text', label: 'Nội dung', kind: 'text' }], submit_label: 'Lưu' },
] }, { approvedOperations: ['send_note'] });

test('renderer draws record data as text only, even for hostile record values', async () => {
  const hostile = '<img src=x onerror=alert(1)> https://evil.example/x javascript:alert(1)';
  const calls = [];
  const api = { list: async () => [{ id: 7, data: { text: hostile } }], create: async (r, d) => calls.push(['create', r, d]),
    invoke: async (op, id) => calls.push(['invoke', op, id]) };
  const root = renderSchema(schema, { doc, api });
  await flush();
  const nodes = walk(root);
  assert.ok(nodes.some((n) => n.tag === 'dd' && n.textContent === hostile), 'hostile value shown as literal text');
  assert.ok(!nodes.some((n) => ['a', 'img', 'iframe', 'script', 'link', 'style', 'object', 'embed'].includes(n.tag)), 'no link/media/script elements');
  const button = nodes.find((n) => n.tag === 'button' && n.textContent === 'Gửi');
  await button.listeners.click(); assert.deepEqual(calls[0], ['invoke', 'send_note', 7]);
  const form = nodes.find((n) => n.tag === 'form');
  const input = nodes.find((n) => n.tag === 'input'); input.value = 'xin chào';
  await form.listeners.submit({ preventDefault() {} }); assert.deepEqual(calls[1], ['create', 4, { text: 'xin chào' }]);
});

test('renderer shows Vietnamese errors and never raw server text', async () => {
  const api = { list: async () => { throw Object.assign(new Error('boom: SELECT * FROM secrets'), { code: 'scope_denied' }); }, invoke: async () => {}, create: async () => {} };
  const root = renderSchema(schema, { doc, api });
  await flush();
  const text = walk(root).map((n) => n.textContent).join('|');
  assert.match(text, /không có quyền/);
  assert.ok(!text.includes('SELECT'));
});

test('browser api: session cookie + CSRF header on writes, never on reads; session token not in body', async () => {
  const seen = [];
  const fetchImpl = async (url, init = {}) => { seen.push({ url, init }); return { ok: true, json: async () => (url === '/api/csrf' ? { token: 'CSRF1' } : { result: {} }) }; };
  const api = browserApi(12, fetchImpl);
  await api.list(4); await api.invoke('send_note', 7);
  const read = seen[0], write = seen.at(-1);
  assert.equal(read.init.method, 'GET'); assert.equal(read.init.headers['X-CSRF-Token'], undefined);
  assert.equal(write.url, '/api/ai-board/features/12/online/invoke'); assert.equal(write.init.headers['X-CSRF-Token'], 'CSRF1');
  assert.equal(write.init.credentials, 'same-origin');
  assert.deepEqual(JSON.parse(write.init.body), { operation: 'send_note', record_id: 7 });
});
