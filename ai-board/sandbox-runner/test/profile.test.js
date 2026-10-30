import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import YAML from 'yaml';

import { assertProfile, loadPolicy } from '../src/policy.js';

const DEV_HASH = 'd51f030e8a4957031e41c5d30bdc986a7682e5b6a8632d50a1b6f4f669914bc7';
const policyFile = (name) => new URL(`../${name}`, import.meta.url);
const readPolicy = (name) => loadPolicy(readFileSync(policyFile(name), 'utf8'));
const compose = (name) => YAML.parse(readFileSync(new URL(`../../../${name}`, import.meta.url), 'utf8'));

test('dev policy keeps its pinned hash after the profile tag', () => {
  const dev = readPolicy('sandbox-policy.dev.yaml');
  assert.equal(dev.profile, 'dev');
  assert.equal(dev.hash, DEV_HASH);
});

test('large policy loads with 8 vCPU and its own hash', () => {
  const large = readPolicy('sandbox-policy.large.yaml');
  assert.equal(large.profile, 'large');
  assert.equal(large.vm.cpus, 8);
  assert.equal(large.concurrency, 1);
  assert.notEqual(large.hash, DEV_HASH);
});

test('policy profile must be dev or large', () => {
  const text = readFileSync(policyFile('sandbox-policy.dev.yaml'), 'utf8');
  assert.throws(() => loadPolicy(text.replace('profile: dev', 'profile: prod')), { code: 'invalid_policy' });
  assert.throws(() => loadPolicy(text.replace('profile: dev', 'profile: [dev]')), { code: 'invalid_policy' });
});

test('vm.cpus accepts up to 16 and rejects 17', () => {
  const text = readFileSync(policyFile('sandbox-policy.large.yaml'), 'utf8');
  assert.equal(loadPolicy(text.replace('cpus: 8', 'cpus: 16')).vm.cpus, 16);
  assert.throws(() => loadPolicy(text.replace('cpus: 8', 'cpus: 17')), { code: 'invalid_policy' });
});

test('assertProfile refuses a mismatched runner profile', () => {
  const dev = readPolicy('sandbox-policy.dev.yaml');
  const large = readPolicy('sandbox-policy.large.yaml');
  assert.doesNotThrow(() => assertProfile(dev, 'dev'));
  assert.doesNotThrow(() => assertProfile(large, 'large'));
  assert.throws(() => assertProfile(dev, 'large'), { code: 'invalid_policy' });
  assert.throws(() => assertProfile(large, 'dev'), { code: 'invalid_policy' });
  assert.doesNotThrow(() => assertProfile(dev, undefined));
  assert.doesNotThrow(() => assertProfile(large, ''));
});

// Effective service config: compose override replaces base keys and volumes with the same target.
function effective(base, overlay = {}, name) {
  const svc = { ...base.services[name] };
  const over = overlay.services?.[name] ?? {};
  Object.assign(svc, over, { environment: { ...svc.environment, ...over.environment } });
  const byTarget = new Map((svc.volumes ?? []).map((v) => [v.split(':')[1], v]));
  for (const v of over.volumes ?? []) byTarget.set(v.split(':')[1], v);
  svc.volumes = [...byTarget.values()];
  return svc;
}

const POLICY_TARGET = '/etc/sandbox/sandbox-policy.yaml';
const policyOf = (svc) => {
  const mount = svc.volumes.find((v) => v.split(':')[1] === POLICY_TARGET);
  return readPolicy(mount.split(':')[0].replace(/^\.\/ai-board\/sandbox-runner\//, ''));
};

test('default compose is the large profile: policy file and runner env agree', () => {
  const base = compose('docker-compose.yml');
  const runner = effective(base, {}, 'sandbox-runner');
  assert.equal(runner.environment.RESOURCE_PROFILE, 'large');
  assert.equal(policyOf(runner).profile, 'large');
  assert.equal(base.services['ai-board-worker'].cpus, 8);
});

test('DEV overlay is the dev profile: policy file and runner env agree', () => {
  const base = compose('docker-compose.yml');
  const overlay = compose('docker-compose.dev-profile.yml');
  const runner = effective(base, overlay, 'sandbox-runner');
  assert.equal(runner.environment.RESOURCE_PROFILE, 'dev');
  assert.equal(policyOf(runner).profile, 'dev');
  assert.equal(runner.cpus, 6);
  assert.equal(effective(base, overlay, 'ai-board-worker').cpus, 2);
});

test('runner container covers the VM vCPU in both profiles', () => {
  const base = compose('docker-compose.yml');
  const overlay = compose('docker-compose.dev-profile.yml');
  for (const [name, runner] of [['large', effective(base, {}, 'sandbox-runner')], ['dev', effective(base, overlay, 'sandbox-runner')]]) {
    assert.ok(runner.cpus > policyOf(runner).vm.cpus, `${name}: runner cpus must exceed vm.cpus`);
  }
});
