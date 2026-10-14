import test from 'node:test';
import assert from 'node:assert/strict';
import { createRunnerClient } from '../server/ai-board/online/runner-client.js';

const reply = (status, body) => ({ ok: status < 400, status, json: async () => body });
const client = (handler) => createRunnerClient({ url: 'http://runner:8090', token: 't', fetchImpl: async (u, init) => handler(init.method, new URL(u).pathname) });

test('runner busy -> backend_busy even though the rejected run has nothing to delete', async () => {
  const c = client((m) => (m === 'POST' ? reply(429, { error: 'busy' }) : reply(404, { error: 'run_not_found' })));
  await assert.rejects(c.exec(['true']), { code: 'backend_busy' });
});

test('teardown that cannot be confirmed fails closed and hides output', async () => {
  const c = client((m, p) => (m === 'DELETE' ? reply(500, {}) : p.endsWith('/exec') ? reply(200, { code: 0, stdout: 'secret' }) : reply(200, {})));
  await assert.rejects(c.exec(['true']), { code: 'backend_cleanup_unconfirmed' });
});

test('clean run returns stdout', async () => {
  const c = client((m, p) => (m === 'DELETE' ? reply(200, { state: 'destroyed' }) : p.endsWith('/exec') ? reply(200, { code: 0, stdout: 'ok' }) : reply(200, {})));
  assert.equal(await c.exec(['true']), 'ok');
});
