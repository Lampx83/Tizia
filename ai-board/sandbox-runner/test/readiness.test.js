import test from 'node:test';
import assert from 'node:assert/strict';

import { createReadiness } from '../src/readiness.js';

const VERSIONS = { runtime: 'microsandbox@0.7.5', image: 'alpine@sha256:x' };
const make = (over = {}) => {
  const calls = [];
  const readiness = createReadiness({
    checkKvm: () => { calls.push('kvm'); },
    bootProbe: async () => { calls.push('boot'); return VERSIONS; },
    now: () => 1000,
    ...over,
  });
  return { readiness, calls };
};

test('not ready until the first check passes', () => {
  const { readiness } = make();
  assert.deepEqual(readiness.status(), { ready: false, code: 'not_checked' });
});

test('ready only after kvm access and a real microVM boot, recording versions', async () => {
  const { readiness, calls } = make();
  assert.equal((await readiness.check()).ready, true);
  assert.deepEqual(calls, ['kvm', 'boot']);
  assert.deepEqual(readiness.status(), { ready: true, checked_at: 1000, versions: VERSIONS });
});

test('missing kvm fails closed without attempting a boot', async () => {
  const { readiness, calls } = make({ checkKvm: () => { throw Object.assign(new Error('EACCES /dev/kvm'), { code: 'EACCES' }); } });
  assert.deepEqual(await readiness.check(), { ready: false, code: 'kvm_unavailable', checked_at: 1000 });
  assert.deepEqual(calls, [], 'no host-execution or other fallback path');
});

test('boot failure fails closed and never leaks the raw error', async () => {
  const { readiness } = make({ bootProbe: async () => { throw new Error('secret /host/path boom'); } });
  const status = await readiness.check();
  assert.deepEqual(status, { ready: false, code: 'boot_failed', checked_at: 1000 });
  assert.doesNotMatch(JSON.stringify(readiness.status()), /secret|host/);
});

test('a later passing check restores readiness, a later failing one revokes it', async () => {
  let kvmOk = false;
  const { readiness } = make({ checkKvm: () => { if (!kvmOk) throw new Error('no kvm'); } });
  assert.equal((await readiness.check()).ready, false);
  kvmOk = true;
  assert.equal((await readiness.check()).ready, true);
  kvmOk = false;
  assert.equal((await readiness.check()).ready, false);
});

test('concurrent checks share one boot', async () => {
  let boots = 0;
  const { readiness } = make({ bootProbe: async () => { boots += 1; await new Promise((r) => setTimeout(r, 10)); return VERSIONS; } });
  await Promise.all([readiness.check(), readiness.check()]);
  assert.equal(boots, 1);
});
