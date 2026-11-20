import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import YAML from 'yaml';

import { assertProfile, loadPolicy } from '../src/policy.js';

const DEV_HASH = '500ae1700dca648318019254229c45c8d6e1c549a6f7833d41097d97a042fc26';
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

test('dev stack compose defaults to the dev profile when no env is set', () => {
  const text = readFileSync(new URL('../../../docker-compose.dev.ai.yml', import.meta.url), 'utf8');
  for (const want of [
    'cpus: ${WORKER_CPUS:-2}', 'mem_limit: ${WORKER_MEM:-4g}',
    'cpus: ${RUNNER_CPUS:-6}', 'mem_limit: ${RUNNER_MEM:-3g}',
    'RESOURCE_PROFILE: ${RESOURCE_PROFILE:-dev}', 'SANDBOX_POLICY_FILE: /etc/sandbox/generated/sandbox-policy.yaml',
  ]) assert.ok(text.includes(want), `missing default: ${want}`);
  assert.doesNotMatch(text, /:-(large|8|16g|10|6g)\}/);
});

test('bootstrap profile: only DEV=0 selects large, unset or other values select dev', () => {
  const script = readFileSync(new URL('../../../scripts/ai-board-bootstrap.sh', import.meta.url), 'utf8');
  const fn = script.match(/^profile_for\(\) \{[\s\S]*?^\}/m)?.[0];
  assert.ok(fn, 'profile_for function not found');
  const run = (dev) => spawnSync('bash', ['-c', `${fn}\nprofile_for "$1"`, 'x', dev], { encoding: 'utf8' }).stdout.trim();
  const dev = 'dev WORKER_CPUS=2 WORKER_MEM=4g RUNNER_CPUS=6 RUNNER_MEM=3g';
  assert.equal(run(''), dev);
  assert.equal(run('1'), dev);
  assert.equal(run('yes'), dev);
  assert.equal(run('0'), 'large WORKER_CPUS=8 WORKER_MEM=16g RUNNER_CPUS=10 RUNNER_MEM=6g');
});
