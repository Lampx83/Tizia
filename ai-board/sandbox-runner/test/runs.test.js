import test from 'node:test';
import assert from 'node:assert/strict';
import { gzipSync } from 'node:zlib';

import { createRuns } from '../src/runs.js';
import { loadPolicy } from '../src/policy.js';
import { fakeBackend, memoryStore } from './fake-backend.js';

const POLICY = loadPolicy(`
version: 1
vm: { cpus: 1, memory_mib: 2048, disk_mib: 10240, ttl_s: 1200, lease_s: 120 }
concurrency: 1
guest_image: alpine@sha256:d9e853e87e55526f6b2917df91a2115c36dd7c696a35be12163d44e6e2a4b6bc
egress: [ { host: registry.npmjs.org, port: 443 } ]
guest_env: { CI: "1" }
archive: { max_bytes: 100000, max_expanded_bytes: 100000, max_files: 100 }
exec: { timeout_s: 600, max_stdout_bytes: 1000, max_stderr_bytes: 1000, workdir: /workspace }
artifacts: { max_file_bytes: 10, max_total_bytes: 15 }
`);
const MANIFEST = [{ name: 'a', path: 'out/a.txt' }, { name: 'b', path: 'out/b.txt' }];
const TAR = gzipSync(Buffer.alloc(1024)); // empty but valid archive

function setup(over = {}) {
  const backend = fakeBackend();
  const store = memoryStore();
  const alerts = [];
  const clock = { t: 1_000_000 };
  const runs = createRuns({
    policy: POLICY, backend, store, now: () => clock.t, alert: (event) => alerts.push(event), runnerId: 'r1', ...over,
  });
  return { runs, backend, store, alerts, clock };
}
const code = (promise) => promise.then(() => null, (error) => error.code);

test('create boots one sandbox with policy-owned settings and is idempotent per run id', async () => {
  const { runs, backend } = setup();
  const first = await runs.create({ run_id: 'run-0001', manifest: MANIFEST });
  const again = await runs.create({ run_id: 'run-0001', manifest: MANIFEST });
  assert.deepEqual(first, again);
  assert.equal(backend.calls.filter((c) => c.op === 'create').length, 1);
  const { spec } = backend.calls[0];
  assert.deepEqual([spec.vm.cpus, spec.vm.memory_mib, spec.vm.disk_mib], [1, 2048, 10240]);
  assert.equal(spec.image, POLICY.guest_image);
  assert.deepEqual(spec.egress, POLICY.egress);
  assert.deepEqual(spec.env, POLICY.guest_env, 'only policy-declared variables reach the guest');
  assert.equal(spec.labels.run_id, 'run-0001');
  assert.equal(spec.labels.runner_id, 'r1');
});

test('worker-supplied policy and bad ids are refused', async () => {
  const { runs } = setup();
  assert.equal(await code(runs.create({ run_id: 'x' })), 'invalid_run_id');
  assert.equal(await code(runs.create({ run_id: '../escape' })), 'invalid_run_id');
  assert.equal(await code(runs.create({ run_id: 'run-0002', manifest: [{ name: 'a', path: '../etc/passwd' }] })), 'invalid_manifest');
  assert.equal(await code(runs.create({ run_id: 'run-0002', manifest: MANIFEST, vm: { cpus: 8 } })), 'invalid_request', 'extra policy keys');
});

test('a second run is busy while one is active, and a destroyed id is never reused', async () => {
  const { runs } = setup();
  await runs.create({ run_id: 'run-0001', manifest: MANIFEST });
  assert.equal(await code(runs.create({ run_id: 'run-0002', manifest: MANIFEST })), 'busy');
  await runs.destroy('run-0001');
  await runs.create({ run_id: 'run-0002', manifest: MANIFEST });
  assert.equal(await code(runs.create({ run_id: 'run-0001', manifest: MANIFEST })), 'run_id_reused');
});

test('operations on unknown runs are not found; destroy is idempotent and terminal', async () => {
  const { runs, backend } = setup();
  assert.equal(await code(runs.exec('run-9999', { argv: ['true'] })), 'run_not_found');
  await runs.create({ run_id: 'run-0001', manifest: MANIFEST });
  assert.deepEqual(await runs.destroy('run-0001'), { run_id: 'run-0001', state: 'destroyed' });
  assert.deepEqual(await runs.destroy('run-0001'), { run_id: 'run-0001', state: 'destroyed' });
  assert.equal(backend.vms.size, 0);
  assert.equal(await code(runs.exec('run-0001', { argv: ['true'] })), 'run_closed');
  assert.equal(await code(runs.renew('run-0001')), 'run_closed');
});

test('upload validates the archive before the guest sees it', async () => {
  const { runs, backend } = setup();
  await runs.create({ run_id: 'run-0001', manifest: MANIFEST });
  assert.equal(await code(runs.upload('run-0001', Buffer.from('junk'))), 'archive_rejected');
  assert.equal(backend.calls.some((c) => c.op === 'putArchive'), false);
  await runs.upload('run-0001', TAR);
  assert.equal(backend.calls.filter((c) => c.op === 'putArchive').length, 1);
});

test('exec takes argv only with fixed cwd/env and limits from policy', async () => {
  const { runs, backend } = setup();
  await runs.create({ run_id: 'run-0001', manifest: MANIFEST });
  assert.equal(await code(runs.exec('run-0001', { argv: 'rm -rf /' })), 'invalid_request');
  assert.equal(await code(runs.exec('run-0001', { argv: [] })), 'invalid_request');
  assert.equal(await code(runs.exec('run-0001', { argv: ['ls'], cwd: '/', env: { X: '1' } })), 'invalid_request');
  const result = await runs.exec('run-0001', { argv: ['npm', 'test'] });
  assert.deepEqual(result, { code: 0, stdout: 'ok', stderr: '', timed_out: false, truncated: false });
  assert.deepEqual(backend.calls.at(-1).request, {
    argv: ['npm', 'test'], cwd: '/workspace', env: POLICY.guest_env, timeout_s: 600, max_stdout_bytes: 1000, max_stderr_bytes: 1000,
  });
});

test('a timed-out command is reported and the run stays usable', async () => {
  const { runs, backend } = setup();
  await runs.create({ run_id: 'run-0001', manifest: MANIFEST });
  backend.fail.timeout = true;
  assert.equal((await runs.exec('run-0001', { argv: ['sleep', '9'] })).timed_out, true);
  backend.fail.timeout = false;
  assert.equal((await runs.exec('run-0001', { argv: ['true'] })).code, 0);
});

test('an ambiguous exec ends the run: no replay, VM destroyed', async () => {
  const { runs, backend } = setup();
  await runs.create({ run_id: 'run-0001', manifest: MANIFEST });
  backend.fail.exec = true;
  assert.equal(await code(runs.exec('run-0001', { argv: ['npm', 'test'] })), 'exec_ambiguous');
  backend.fail.exec = false;
  assert.equal(await code(runs.exec('run-0001', { argv: ['npm', 'test'] })), 'run_closed');
  assert.equal(backend.calls.filter((c) => c.op === 'exec').length, 1, 'never replayed');
  assert.equal(backend.vms.size, 0);
});

test('concurrent exec on one run is refused', async () => {
  const { runs, backend } = setup();
  await runs.create({ run_id: 'run-0001', manifest: MANIFEST });
  const slow = backend.exec;
  backend.exec = async (...args) => { await new Promise((r) => setTimeout(r, 20)); return slow(...args); };
  const first = runs.exec('run-0001', { argv: ['a'] });
  assert.equal(await code(runs.exec('run-0001', { argv: ['b'] })), 'exec_in_progress');
  await first;
});

test('download serves only manifest names, within per-file and total limits, with hashes', async () => {
  const { runs, backend } = setup();
  await runs.create({ run_id: 'run-0001', manifest: MANIFEST });
  backend.vms.get('sandbox-run-0001').files = { '/workspace/out/a.txt': Buffer.from('12345678'), '/workspace/out/b.txt': Buffer.from('1234567890') };
  assert.equal(await code(runs.download('run-0001', 'other')), 'artifact_not_registered');
  const a = await runs.download('run-0001', 'a');
  assert.equal(a.bytes.toString(), '12345678');
  assert.match(a.sha256, /^[0-9a-f]{64}$/);
  assert.equal(await code(runs.download('run-0001', 'b')), 'artifact_total_too_large', '8 + 10 > 15');
  backend.vms.get('sandbox-run-0001').files['/workspace/out/b.txt'] = Buffer.from('x'.repeat(11));
  assert.equal(await code(runs.download('run-0001', 'b')), 'artifact_too_large');
});

test('renew slides the lease but never past the absolute ttl; expiry destroys', async () => {
  const { runs, backend, clock } = setup();
  await runs.create({ run_id: 'run-0001', manifest: MANIFEST });
  for (let i = 0; i < 10; i += 1) {
    clock.t += 100_000;
    assert.equal((await runs.renew('run-0001')).lease_expires_at, clock.t + 120_000);
  }
  clock.t += 100_000; // 1100 s since creation: 120 s lease would pass the 1200 s cap
  assert.equal((await runs.renew('run-0001')).lease_expires_at, 1_000_000 + 1_200_000, 'capped at creation + ttl');
  clock.t += 101_000;
  await runs.sweep();
  assert.equal(backend.vms.size, 0);
  assert.equal(await code(runs.renew('run-0001')), 'run_closed');
});

test('a missed lease is swept and the run reports it expired', async () => {
  const { runs, backend, clock } = setup();
  await runs.create({ run_id: 'run-0001', manifest: MANIFEST });
  clock.t += 121_000;
  await runs.sweep();
  assert.equal(backend.vms.size, 0);
  assert.equal((await runs.status('run-0001')).state, 'expired');
});

test('unconfirmed cleanup makes the runner unhealthy, alerts, and blocks admission', async () => {
  const { runs, backend, alerts } = setup();
  await runs.create({ run_id: 'run-0001', manifest: MANIFEST });
  backend.fail.destroy = true;
  assert.equal(await code(runs.destroy('run-0001')), 'cleanup_unconfirmed');
  assert.equal(alerts[0].event, 'cleanup_unconfirmed');
  assert.equal(runs.health().healthy, false);
  assert.equal(await code(runs.create({ run_id: 'run-0002', manifest: MANIFEST })), 'runner_unhealthy');
  backend.fail.destroy = false;
  await runs.destroy('run-0001');
  assert.equal(runs.health().healthy, false, 'never auto re-enabled; needs reconcile on restart');
});

test('a failed create is recorded and cleaned up', async () => {
  const { runs, backend } = setup();
  backend.fail.create = true;
  assert.equal(await code(runs.create({ run_id: 'run-0001', manifest: MANIFEST })), 'create_failed');
  assert.equal(backend.calls.some((c) => c.op === 'destroy'), true, 'uncertain create is cleaned');
  assert.equal(runs.health().healthy, true);
  backend.fail.create = false;
  await runs.create({ run_id: 'run-0002', manifest: MANIFEST });
});

test('restart reconciliation destroys only confirmed runner-owned orphans', async () => {
  const { backend, store } = setup();
  backend.vms.set('sandbox-orphan', { labels: { runner_id: 'r1', run_id: 'run-orphan' }, files: {} });
  backend.vms.set('sandbox-foreign', { labels: { runner_id: 'other' }, files: {} });
  backend.vms.set('sandbox-unlabelled', { labels: {}, files: {} });
  store.save({ runs: { 'run-live': { run_id: 'run-live', state: 'ready', sandbox: 'sandbox-run-live' } } });
  backend.vms.set('sandbox-run-live', { labels: { runner_id: 'r1', run_id: 'run-live' }, files: {} });
  const fresh = createRuns({ policy: POLICY, backend, store, now: () => 2_000_000, alert: () => {}, runnerId: 'r1' });
  await fresh.reconcile();
  assert.deepEqual([...backend.vms.keys()].sort(), ['sandbox-foreign', 'sandbox-unlabelled']);
  assert.equal((await fresh.status('run-live')).state, 'indeterminate');
  assert.equal(fresh.health().healthy, true);
});

test('reconcile leaves the runner unhealthy when an orphan cannot be removed', async () => {
  const { backend, store } = setup();
  backend.vms.set('sandbox-orphan', { labels: { runner_id: 'r1' }, files: {} });
  backend.fail.destroy = true;
  const fresh = createRuns({ policy: POLICY, backend, store, now: () => 1, alert: () => {}, runnerId: 'r1' });
  await fresh.reconcile();
  assert.equal(fresh.health().healthy, false);
});
