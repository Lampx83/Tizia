import test from 'node:test';
import assert from 'node:assert/strict';

import { loadPolicy } from '../src/policy.js';

const GOOD = `
version: 1
vm: { cpus: 1, memory_mib: 2048, disk_mib: 10240, ttl_s: 1200, lease_s: 120 }
concurrency: 1
guest_image: alpine@sha256:d9e853e87e55526f6b2917df91a2115c36dd7c696a35be12163d44e6e2a4b6bc
egress:
  - { host: registry.npmjs.org, port: 443 }
guest_env: { CI: "1" }
archive: { max_bytes: 52428800, max_expanded_bytes: 262144000, max_files: 20000 }
exec: { timeout_s: 600, max_stdout_bytes: 1048576, max_stderr_bytes: 1048576, workdir: /workspace }
artifacts: { max_file_bytes: 5242880, max_total_bytes: 26214400 }
`;
const mutate = (fn) => fn(GOOD);

test('a complete policy loads, with a stable hash', () => {
  const a = loadPolicy(GOOD);
  assert.equal(a.vm.memory_mib, 2048);
  assert.equal(a.egress[0].host, 'registry.npmjs.org');
  assert.match(a.hash, /^[0-9a-f]{64}$/);
  assert.equal(loadPolicy(GOOD).hash, a.hash);
  assert.notEqual(loadPolicy(GOOD.replace('ttl_s: 1200', 'ttl_s: 600')).hash, a.hash);
});

const rejects = {
  'unknown top-level key': (t) => `${t}\nextra: 1`,
  'unknown nested key': (t) => t.replace('cpus: 1,', 'cpus: 1, gpus: 1,'),
  'wrong version': (t) => t.replace('version: 1', 'version: 2'),
  'value above the hard cap': (t) => t.replace('ttl_s: 1200', 'ttl_s: 99999'),
  'non-integer': (t) => t.replace('cpus: 1,', 'cpus: 1.5,'),
  'unpinned guest image': (t) => t.replace(/guest_image: .*/, 'guest_image: alpine:3.20'),
  'wildcard egress host': (t) => t.replace('registry.npmjs.org', '*.npmjs.org'),
  'ip egress host': (t) => t.replace('registry.npmjs.org', '10.0.0.5'),
  'egress port out of range': (t) => t.replace('port: 443', 'port: 70000'),
  'secret-looking guest env': (t) => t.replace('CI: "1"', 'API_TOKEN: "x"'),
  'relative workdir': (t) => t.replace('workdir: /workspace', 'workdir: workspace'),
  'custom yaml tag': (t) => t.replace('concurrency: 1', 'concurrency: !!js/function "x"'),
  'duplicate key': (t) => `${t}\nconcurrency: 1`,
  'env interpolation': (t) => t.replace('CI: "1"', 'CI: "${HOME}"'),
  'concurrency above one': (t) => t.replace('concurrency: 1', 'concurrency: 2'),
};
for (const [name, edit] of Object.entries(rejects)) {
  test(`policy rejects ${name}`, () => {
    assert.throws(() => loadPolicy(mutate(edit)), { code: 'invalid_policy' });
  });
}
