import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { gzipSync } from 'node:zlib';
import { loadPolicy, PolicyError } from '../src/policy.js';
import { createRuns } from '../src/runs.js';
import { fakeBackend, memoryStore } from './fake-backend.js';

const BASE = (extra = 'network: mirror\nmirror: { host: npm-mirror.runner.internal.example, port: 4873 }', egress = 'egress: []') => `
version: 1
vm: { cpus: 1, memory_mib: 512, disk_mib: 2048, ttl_s: 300, lease_s: 60 }
concurrency: 1
guest_image: alpine@sha256:d9e853e87e55526f6b2917df91a2115c36dd7c696a35be12163d44e6e2a4b6bc
${egress}
guest_env: { CI: "1" }
archive: { max_bytes: 1048576, max_expanded_bytes: 4194304, max_files: 100 }
exec: { timeout_s: 10, max_stdout_bytes: 65536, max_stderr_bytes: 65536, workdir: /workspace }
artifacts: { max_file_bytes: 65536, max_total_bytes: 262144 }
${extra}`;

test('network: none stays valid and mirror is a distinct mode with its own hash', () => {
  const none = loadPolicy(BASE('network: none'));
  const mirror = loadPolicy(BASE());
  assert.equal(none.network, 'none');
  assert.equal(mirror.network, 'mirror');
  assert.deepEqual(mirror.mirror, { host: 'npm-mirror.runner.internal.example', port: 4873 });
  assert.notEqual(mirror.hash, none.hash);
});

const rejects = {
  'mirror mode without a destination': BASE('network: mirror'),
  'mirror destination without mirror mode': BASE('mirror: { host: a.example.com, port: 80 }'),
  'mirror destination under none': BASE('network: none\nmirror: { host: a.example.com, port: 80 }'),
  'a list of destinations': BASE('network: mirror\nmirror: [{ host: a.example.com, port: 80 }, { host: b.example.com, port: 80 }]'),
  'an ip destination': BASE('network: mirror\nmirror: { host: 10.0.0.5, port: 80 }'),
  'a wildcard destination': BASE('network: mirror\nmirror: { host: "*.example.com", port: 80 }'),
  'a port out of range': BASE('network: mirror\nmirror: { host: a.example.com, port: 0 }'),
  'an extra mirror key': BASE('network: mirror\nmirror: { host: a.example.com, port: 80, path: /x }'),
  'extra egress rules': BASE(undefined, 'egress: [{ host: registry.npmjs.org, port: 443 }]'),
  'an unknown network value': BASE('network: allow'),
};
for (const [name, text] of Object.entries(rejects)) {
  test(`policy rejects ${name}`, () => assert.throws(() => loadPolicy(text), PolicyError));
}

test('mirror egress policy allows only the mirror and DNS, with private groups denied', async () => {
  const { mirrorEgressPolicy } = await import('../src/backend.js');
  const p = mirrorEgressPolicy({ host: 'npm-mirror.runner.internal.example', port: 4873 });
  assert.equal(p.defaultEgress, 'deny');
  const allows = p.rules.filter((r) => r.action === 'allow');
  assert.equal(allows.length, 2);
  assert.ok(allows.some((r) => r.destination.domain === 'npm-mirror.runner.internal.example' && r.ports[0].start === 4873));
  for (const group of ['loopback', 'private', 'link-local', 'metadata', 'multicast']) {
    assert.ok(p.rules.some((r) => r.action === 'deny' && r.destination.group === group), group);
  }
});

test('shipped policies keep their current network mode', () => {
  for (const file of ['sandbox-policy.dev.yaml', 'sandbox-policy.online.yaml']) {
    const p = loadPolicy(readFileSync(new URL(`../${file}`, import.meta.url), 'utf8'));
    assert.notEqual(p.network, 'mirror', file);
    assert.equal(p.mirror, undefined, file);
  }
});

const POLICY = loadPolicy(BASE());
const TAR = gzipSync(Buffer.alloc(1024));
function setup() {
  const backend = fakeBackend();
  const sealed = [];
  backend.sealNetwork = async (name) => { sealed.push(name); };
  const runs = createRuns({ policy: POLICY, backend, store: memoryStore(), runnerId: 'r1' });
  return { runs, backend, sealed };
}
const code = (p) => p.then(() => null, (e) => e.code);

test('create passes the mirror as the only destination and reports the mode', async () => {
  const { runs, backend } = setup();
  const receipt = await runs.create({ run_id: 'mirror-run-001' });
  assert.equal(receipt.network, 'mirror');
  const spec = backend.calls.find((c) => c.op === 'create').spec;
  assert.equal(spec.network, 'mirror');
  assert.deepEqual(spec.mirror, POLICY.mirror);
  assert.deepEqual(spec.egress, []);
});

test('build exec keeps the network, first run exec seals it, build after that is refused', async () => {
  const { runs, sealed } = setup();
  await runs.create({ run_id: 'mirror-run-002' });
  await runs.exec('mirror-run-002', { argv: ['npm', 'ci', '--ignore-scripts'], phase: 'build' });
  assert.equal(sealed.length, 0);
  await runs.exec('mirror-run-002', { argv: ['node', 'app.js'], phase: 'run' });
  await runs.exec('mirror-run-002', { argv: ['node', 'check.js'], phase: 'run' });
  assert.equal(sealed.length, 1, 'sealed once');
  assert.equal(await code(runs.exec('mirror-run-002', { argv: ['npm', 'ci'], phase: 'build' })), 'network_sealed');
});

test('mirror mode requires a valid phase; other modes refuse one', async () => {
  const { runs } = setup();
  await runs.create({ run_id: 'mirror-run-003' });
  assert.equal(await code(runs.exec('mirror-run-003', { argv: ['ls'] })), 'invalid_request');
  assert.equal(await code(runs.exec('mirror-run-003', { argv: ['ls'], phase: 'x' })), 'invalid_request');
  const plain = fakeBackend();
  const r = createRuns({ policy: loadPolicy(BASE('network: none')), backend: plain, store: memoryStore(), runnerId: 'r1' });
  await r.create({ run_id: 'none-run-0001' });
  assert.equal(await code(r.exec('none-run-0001', { argv: ['ls'], phase: 'build' })), 'invalid_request');
});

test('a failed seal ends the run and the command never runs', async () => {
  const { runs, backend } = setup();
  backend.sealNetwork = async () => { throw new Error('boom'); };
  await runs.create({ run_id: 'mirror-run-004' });
  assert.equal(await code(runs.exec('mirror-run-004', { argv: ['ls'], phase: 'run' })), 'network_seal_failed');
  assert.equal(backend.calls.filter((c) => c.op === 'exec').length, 0);
  assert.equal(await code(runs.exec('mirror-run-004', { argv: ['ls'], phase: 'run' })), 'run_closed');
});
