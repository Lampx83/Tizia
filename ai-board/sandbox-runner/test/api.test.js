import test from 'node:test';
import assert from 'node:assert/strict';
import http from 'node:http';
import { gzipSync } from 'node:zlib';

import { createApi, PROTOCOL } from '../src/api.js';
import { createRuns } from '../src/runs.js';
import { createReadiness } from '../src/readiness.js';
import { loadPolicy } from '../src/policy.js';
import { fakeBackend, memoryStore } from './fake-backend.js';

const TOKEN = 'a'.repeat(48);
const POLICY = loadPolicy(`
version: 1
vm: { cpus: 1, memory_mib: 2048, disk_mib: 10240, ttl_s: 1200, lease_s: 120 }
concurrency: 1
guest_image: alpine@sha256:d9e853e87e55526f6b2917df91a2115c36dd7c696a35be12163d44e6e2a4b6bc
egress: []
guest_env: {}
archive: { max_bytes: 2000, max_expanded_bytes: 100000, max_files: 100 }
exec: { timeout_s: 600, max_stdout_bytes: 1000, max_stderr_bytes: 1000, workdir: /workspace }
artifacts: { max_file_bytes: 100, max_total_bytes: 200 }
`);

async function serve() {
  const backend = fakeBackend();
  const runs = createRuns({ policy: POLICY, backend, store: memoryStore(), alert: () => {}, runnerId: 'r1' });
  const readiness = createReadiness({ checkKvm: () => {}, bootProbe: async () => ({ runtime: 'x', image: 'y' }) });
  await readiness.check();
  const server = http.createServer(createApi({ runs, readiness, policy: POLICY, token: TOKEN }));
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  const base = `http://127.0.0.1:${server.address().port}`;
  const call = (method, path, { body, token = TOKEN, protocol = String(PROTOCOL), raw } = {}) => fetch(base + path, {
    method,
    headers: { ...(token ? { authorization: `Bearer ${token}` } : {}), 'x-sandbox-protocol': protocol, ...(raw ? {} : { 'content-type': 'application/json' }) },
    body: raw ?? (body === undefined ? undefined : JSON.stringify(body)),
  });
  return { call, backend, runs, close: () => new Promise((resolve) => server.close(resolve)) };
}

test('healthz is open, reports protocol and policy hash, and goes red when the runner is unhealthy', async () => {
  const { call, runs, backend, close } = await serve();
  try {
    const ok = await (await call('GET', '/healthz', { token: null })).json();
    assert.deepEqual([ok.ready, ok.protocol, ok.policy_hash], [true, PROTOCOL, POLICY.hash]);
    await call('POST', '/v1/runs', { body: { run_id: 'run-0001', manifest: [] } });
    backend.fail.destroy = true;
    assert.equal((await call('DELETE', '/v1/runs/run-0001')).status, 502);
    const down = await call('GET', '/healthz');
    assert.deepEqual([down.status, (await down.json()).code], [503, 'runner_unhealthy']);
    assert.equal(runs.health().healthy, false);
  } finally { await close(); }
});

test('every /v1 call needs the bearer token and the matching protocol version', async () => {
  const { call, close } = await serve();
  try {
    assert.equal((await call('POST', '/v1/runs', { body: { run_id: 'run-0001' }, token: null })).status, 401);
    assert.equal((await call('POST', '/v1/runs', { body: { run_id: 'run-0001' }, token: 'b'.repeat(48) })).status, 401);
    assert.equal((await call('POST', '/v1/runs', { body: { run_id: 'run-0001' }, protocol: '2' })).status, 426);
    assert.equal((await call('POST', '/v1/runs', { body: { run_id: 'run-0001' } })).status, 200);
  } finally { await close(); }
});

test('full lifecycle over HTTP with sanitized errors that carry code, phase and run id', async () => {
  const { call, backend, close } = await serve();
  try {
    const created = await (await call('POST', '/v1/runs', { body: { run_id: 'run-0001', manifest: [{ name: 'a', path: 'o.txt' }] } })).json();
    assert.equal(created.state, 'ready');
    const bad = await call('PUT', '/v1/runs/run-0001/workspace', { raw: Buffer.from('junk') });
    assert.deepEqual([bad.status, await bad.json()], [400, { error: 'archive_rejected', phase: 'upload', run_id: 'run-0001' }]);
    assert.equal((await call('PUT', '/v1/runs/run-0001/workspace', { raw: gzipSync(Buffer.alloc(1024)) })).status, 200);
    assert.equal((await call('PUT', '/v1/runs/run-0001/workspace', { raw: Buffer.alloc(2001) })).status, 413);
    const run = await (await call('POST', '/v1/runs/run-0001/exec', { body: { argv: ['true'] } })).json();
    assert.equal(run.code, 0);
    backend.vms.get('sandbox-run-0001').files['/workspace/o.txt'] = Buffer.from('hello');
    const art = await call('GET', '/v1/runs/run-0001/artifacts/a');
    assert.equal(Buffer.from(await art.arrayBuffer()).toString(), 'hello');
    assert.match(art.headers.get('x-sha256'), /^[0-9a-f]{64}$/);
    assert.equal((await call('POST', '/v1/runs/run-0001/renew')).status, 200);
    assert.equal((await (await call('DELETE', '/v1/runs/run-0001')).json()).state, 'destroyed');
    const closed = await call('POST', '/v1/runs/run-0001/exec', { body: { argv: ['true'] } });
    assert.deepEqual([closed.status, await closed.json()], [409, { error: 'run_closed', phase: 'exec', run_id: 'run-0001' }]);
  } finally { await close(); }
});

test('malformed JSON and unknown routes never reach the lifecycle', async () => {
  const { call, close } = await serve();
  try {
    assert.equal((await call('POST', '/v1/runs', { raw: '{nope' })).status, 400);
    assert.equal((await call('GET', '/v1/other')).status, 404);
  } finally { await close(); }
});
