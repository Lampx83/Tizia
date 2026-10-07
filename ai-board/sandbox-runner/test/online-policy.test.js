import test from 'node:test';
import assert from 'node:assert/strict';
import { loadPolicy, PolicyError } from '../src/policy.js';

const BASE = (extra = '', egress = 'egress: []') => `
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

test('network: none marks the policy online and changes its hash', () => {
  const plain = loadPolicy(BASE());
  const online = loadPolicy(BASE('network: none'));
  assert.equal(plain.network, undefined, 'existing policies keep their shape and hash');
  assert.equal(online.network, 'none');
  assert.notEqual(online.hash, plain.hash);
});

test('network: none rejects any egress rule or other value', () => {
  assert.throws(() => loadPolicy(BASE('network: none', 'egress: [{ host: registry.npmjs.org, port: 443 }]')), PolicyError);
  assert.throws(() => loadPolicy(BASE('network: allow')), PolicyError);
});

test('online egress policy denies every destination and has no DNS exception', async () => {
  const { onlineEgressPolicy } = await import('../src/backend.js');
  const p = onlineEgressPolicy();
  assert.equal(p.defaultEgress, 'deny');
  assert.equal(p.defaultIngress, 'deny');
  assert.ok(p.rules.length > 0 && p.rules.every((r) => r.action === 'deny'), 'no allow rule at all');
  assert.ok(p.rules.some((r) => r.destination.kind === 'any' && r.direction === 'any'));
  assert.ok(!p.rules.some((r) => r.ports.some((x) => x.start === 53)), 'DNS is not special-cased');
});
