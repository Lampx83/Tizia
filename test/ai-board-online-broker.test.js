import test from 'node:test';
import assert from 'node:assert/strict';
import http from 'node:http';
import { validateUiSchema, SchemaError } from '../server/ai-board/online/schema.js';
import { createBroker, BrokerError } from '../server/ai-board/online/broker.js';
import { createHttpAdapter } from '../server/ai-board/online/adapter.js';
import { ScopedCrudError } from '../server/ai-board/repositories/scoped-crud.js';

const ui = (blocks) => ({ version: 1, title: 'Demo', blocks });
const GOOD = ui([
  { type: 'heading', text: 'Ghi chu' },
  { type: 'record_list', title: 'Danh sach', resource_id: 1, fields: [{ name: 'text', label: 'Noi dung' }], row_actions: [{ label: 'Gui', operation: 'send_note' }] },
  { type: 'form', title: 'Them', resource_id: 1, fields: [{ name: 'text', label: 'Noi dung', kind: 'text' }], submit_label: 'Luu' },
]);

test('ui schema: valid data-only schema passes, attack shapes fail', () => {
  assert.equal(validateUiSchema(GOOD, { approvedOperations: ['send_note'] }).blocks.length, 3);
  const bad = (block, ops = ['send_note']) => assert.throws(() => validateUiSchema(ui([block]), { approvedOperations: ops }), SchemaError);
  bad({ type: 'script', text: 'x' });
  bad({ type: 'text', text: '<img src=x onerror=alert(1)>' });
  bad({ type: 'text', text: 'see https://evil.example/x' });
  bad({ type: 'text', text: 'go //evil.example' });
  bad({ type: 'text', text: 'javascript:alert(1)' });
  bad({ type: 'text', text: 'ok', href: 'https://evil.example' });
  bad({ type: 'text', text: 'ok', onclick: 'x()' });
  bad({ type: 'text', text: 'ok', html: '<b>' });
  bad({ type: 'text', text: 'ok', extra: 1 });
  bad({ ...GOOD.blocks[1], row_actions: [{ label: 'Gui', operation: 'other_op' }] });
  bad({ ...GOOD.blocks[1], row_actions: [{ label: 'Gui', operation: 'send_note', url: 'http://x' }] });
  bad({ ...GOOD.blocks[2], fields: [{ name: 'text', label: 'x', kind: 'file' }] });
  assert.throws(() => validateUiSchema({ ...GOOD, version: 2 }), SchemaError);
  assert.throws(() => validateUiSchema({ ...GOOD, script: 'x' }), SchemaError);
  assert.throws(() => validateUiSchema(ui(Array(31).fill({ type: 'text', text: 'a' }))), SchemaError);
});

const id = { id: 9, sessionToken: 's' };
const MANIFEST = { 7: { send_note: { adapter: 'fixture', resource_id: 3, fields: ['text'], response_fields: ['status', 'ref'] } } };
function rig() {
  const calls = { send: [], read: [], audit: [] };
  const adapter = { send: async (p) => { calls.send.push(p); return { status: 'queued', ref: 'r1', secret_echo: 'LEAK' }; } };
  const record = { id: 5, deleted: false, data: { text: 'hello', private_note: 'nope' } };
  const crud = { read: async (identity, f, r, rid) => { calls.read.push({ identity, f, r, rid }); return record; } };
  const broker = createBroker({ crud, adapters: { fixture: adapter }, audit: (e) => calls.audit.push(e), manifest: MANIFEST });
  return { broker, calls };
}

test('broker: approved op sends only approved fields and returns only approved response fields', async () => {
  const { broker, calls } = rig();
  const out = await broker.invoke(id, 7, { operation: 'send_note', record_id: 5 });
  assert.deepEqual(out, { result: { status: 'queued', ref: 'r1' } });
  assert.deepEqual(calls.send, [{ text: 'hello' }]);
  assert.equal(calls.read.length, 2, 'rights re-read before and after the adapter');
  assert.equal(calls.read[0].r, 3, 'resource comes from the manifest, not the caller');
  assert.equal(calls.audit.at(-1).outcome, 'ok');
  assert.ok(!JSON.stringify(calls.audit).includes('hello'), 'audit carries no payload');
});

test('broker: every attack is denied before the adapter is called', async () => {
  const attacks = [
    [7, { operation: 'send_note', record_id: 5, url: 'http://canary.invalid/' }, 'invalid_input'],
    [7, { operation: 'send_note', record_id: 5, host: 'x', method: 'GET', headers: {}, credential: 'k' }, 'invalid_input'],
    [7, { operation: 'send_note', record_id: 5, actor_user_id: 1 }, 'invalid_input'],
    [7, { operation: 'send_note', record_id: 5, payload: { text: 'x', extra: 1 } }, 'invalid_input'],
    [7, { operation: 'send_note', resource_id: 99, record_id: 5 }, 'invalid_input'],
    [7, { operation: 'send_note', record_id: '5' }, 'invalid_input'],
    [7, { operation: 'send_note', record_id: -1 }, 'invalid_input'],
    [7, { operation: 'Send Note', record_id: 5 }, 'invalid_input'],
    [7, { operation: 'http://evil/x', record_id: 5 }, 'invalid_input'],
    [7, { operation: 'unlisted_op', record_id: 5 }, 'operation_not_approved'],
    [7, { operation: '__proto__', record_id: 5 }, 'invalid_input'],
    [7, { operation: 'constructor', record_id: 5 }, 'operation_not_approved'],
    [8, { operation: 'send_note', record_id: 5 }, 'operation_not_approved'],
    ['__proto__', { operation: 'send_note', record_id: 5 }, 'operation_not_approved'],
    [7, null, 'invalid_input'], [7, [], 'invalid_input'],
  ];
  for (const [feature, body, code] of attacks) {
    const { broker, calls } = rig();
    await assert.rejects(() => broker.invoke(id, feature, body), (e) => e instanceof BrokerError && e.code === code, JSON.stringify(body));
    assert.equal(calls.send.length, 0, `adapter reached for ${JSON.stringify(body)}`);
    assert.equal(calls.read.length, 0, 'no record read for malformed or unapproved requests');
    assert.equal(calls.audit.length, 1);
  }
});

test('broker: current-rights denial stops before adapter', async () => {
  for (const code of ['scope_denied', 'authentication_required', 'record_not_found', 'feature_unavailable']) {
    const sent = [];
    const crud = { read: async () => { throw new ScopedCrudError(code, 403); } };
    const broker = createBroker({ crud, adapters: { fixture: { send: async (p) => sent.push(p) } }, manifest: MANIFEST });
    await assert.rejects(() => broker.invoke(id, 7, { operation: 'send_note', record_id: 1 }), (e) => e.code === code);
    assert.equal(sent.length, 0);
  }
  const sent = [];
  const mk = (extra) => createBroker({ adapters: { fixture: { send: async () => sent.push(1) } }, manifest: MANIFEST, ...extra });
  const deleted = mk({ crud: { read: async () => ({ deleted: true, data: {} }) } });
  await assert.rejects(() => deleted.invoke(id, 7, { operation: 'send_note', record_id: 5 }), (e) => e.code === 'record_deleted');
  const gated = mk({ crud: { read: async () => ({ data: {} }) }, releaseAllowed: async () => false });
  await assert.rejects(() => gated.invoke(id, 7, { operation: 'send_note', record_id: 5 }), (e) => e.code === 'feature_unavailable');
  assert.equal(sent.length, 0);
});

test('broker: revocation while the external call is pending withholds the result', async () => {
  let reads = 0;
  const crud = { read: async () => { reads += 1; if (reads > 1) throw new ScopedCrudError('scope_denied'); return { deleted: false, data: { text: 'x' } }; } };
  const sent = [];
  const broker = createBroker({ crud, manifest: MANIFEST, adapters: { fixture: { send: async (p) => { sent.push(p); return { status: 'ok' }; } } } });
  await assert.rejects(() => broker.invoke(id, 7, { operation: 'send_note', record_id: 1 }), (e) => e.code === 'scope_denied');
  assert.equal(sent.length, 1);
});

const listen = (handler) => new Promise((resolve) => { const s = http.createServer(handler); s.listen(0, '127.0.0.1', () => resolve(s)); });
const urlOf = (s, p = '/') => `http://127.0.0.1:${s.address().port}${p}`;

test('adapter: credential only to the fixed endpoint; redirect, oversize, timeout, failures fail closed', async () => {
  const canary = [];
  const evil = await listen((req, res) => { canary.push({ url: req.url, auth: req.headers.authorization }); res.end('{}'); });
  const seen = [];
  const target = await listen((req, res) => {
    let body = '';
    req.on('data', (c) => { body += c; }).on('end', () => {
      seen.push({ url: req.url, auth: req.headers.authorization, body });
      if (req.url === '/redir') { res.writeHead(302, { location: urlOf(evil, '/stolen') }).end(); return; }
      if (req.url === '/big') { res.end(JSON.stringify({ pad: 'x'.repeat(100000) })); return; }
      if (req.url === '/slow') { setTimeout(() => res.end('{}'), 1500); return; }
      if (req.url === '/bad') { res.end('not json'); return; }
      if (req.url === '/500') { res.writeHead(500).end(); return; }
      res.end(JSON.stringify({ status: 'queued' }));
    });
  });
  try {
    const mk = (p, extra = {}) => createHttpAdapter({ url: urlOf(target, p), credential: 'Bearer FIXTURE-CRED', timeoutMs: 400, ...extra });
    assert.deepEqual(await mk('/ok').send({ text: 'a' }), { status: 'queued' });
    assert.equal(seen[0].auth, 'Bearer FIXTURE-CRED');
    for (const [p, code] of [['/redir', 'redirect_denied'], ['/big', 'response_too_large'], ['/slow', 'adapter_unreachable'], ['/bad', 'adapter_bad_response'], ['/500', 'adapter_rejected']]) {
      await assert.rejects(() => mk(p).send({}), (e) => e.code === code, p);
    }
    await assert.rejects(() => mk('/ok', { maxRequestBytes: 10 }).send({ text: 'x'.repeat(50) }), (e) => e.code === 'request_too_large');
    assert.equal(canary.length, 0, 'redirect target received nothing: no credential, no payload');
    assert.throws(() => createHttpAdapter({ url: 'file:///etc/passwd' }));
    assert.throws(() => createHttpAdapter({ url: 'http://u:p@127.0.0.1/' }));
  } finally { evil.close(); target.close(); }
});
