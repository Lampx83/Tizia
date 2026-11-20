import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import YAML from 'yaml';

const ROOT = new URL('../../../', import.meta.url);
const read = (rel) => fs.readFileSync(new URL(rel, ROOT), 'utf8');
const compose = (rel) => YAML.parse(read(rel), { logLevel: 'error' });
const BOOT = (name) => new URL(`../bootstrap/${name}`, import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1');
const hasSh = spawnSync('sh', ['-c', 'exit 0']).status === 0;
const shTest = (name, fn) => test(name, { skip: !hasSh && 'sh not available' }, fn);
// Git for Windows puts /usr/bin ahead of PATH, so command stubs cannot shadow id/stat there.
let stubsShadow = false;
if (hasSh) {
  const probe = fs.mkdtempSync(path.join(os.tmpdir(), 'probe-'));
  fs.writeFileSync(path.join(probe, 'id'), '#!/bin/sh\necho 0\n', { mode: 0o755 });
  const host = { ...process.env };
  const key = Object.keys(host).find((k) => k.toUpperCase() === 'PATH') ?? 'PATH';
  const r = spawnSync('sh', ['-c', 'id -u'], { encoding: 'utf8', env: { ...host, [key]: `${probe}${path.delimiter}${host[key]}` } });
  stubsShadow = r.stdout.trim() === '0';
}
const stubTest = (name, fn) => test(name, { skip: !stubsShadow && 'command stubs cannot shadow system tools here' }, fn);

const FILES = ['docker-compose.yml', 'docker-compose.dev.ai.yml'];
const ai = compose('docker-compose.dev.ai.yml');
const base = compose('docker-compose.yml');
const depends = (svc) => (Array.isArray(svc.depends_on) ? Object.fromEntries(svc.depends_on.map((n) => [n, {}])) : svc.depends_on ?? {});

test('init service creates the token into a shared volume and completes before every reader', () => {
  assert.ok(ai.services['runner-token-init'].extends, 'dev.ai reuses the base init service');
  assert.deepEqual(base.services['runner-token-init'].profiles, ['ai-board']);
  const init = base.services['runner-token-init'];
  assert.deepEqual(init.entrypoint, ['sh', '/usr/local/bin/init-token.sh']);
  assert.deepEqual(init.volumes, ['runner-token:/token']);
  assert.equal(init.network_mode, 'none');
  assert.deepEqual(init.cap_drop, ['ALL']);
  assert.equal(init.restart, 'no');

  const readers = [['aiboard-server'], ['ai-board-worker'], ['sandbox-runner']];
  for (const [name] of readers) {
    const svc = ai.services[name];
    assert.equal(depends(svc)['runner-token-init']?.condition, 'service_completed_successfully', `dev.ai ${name} waits for init`);
  }
  for (const name of ['ai-board-worker', 'sandbox-runner']) {
    assert.equal(depends(base.services[name])['runner-token-init']?.condition, 'service_completed_successfully', `base ${name}`);
  }
  assert.equal(depends(base.services.tizia)['runner-token-init']?.required, false, 'web app does not require the ai-board profile');
});

test('every token reader mounts the volume read-only and none uses a host file', () => {
  for (const [file, doc] of [['base', base], ['dev.ai', ai]]) {
    const names = file === 'base'
      ? ['tizia', 'ai-board-worker', 'ai-board-worker-2', 'ai-board-worker-3', 'sandbox-runner']
      : ['aiboard-server', 'ai-board-worker', 'ai-board-worker-2', 'ai-board-worker-3', 'sandbox-runner'];
    for (const name of names) {
      assert.ok(doc.services[name].volumes.includes('runner-token:/run/secrets:ro'), `${file} ${name}`);
    }
  }
  for (const f of ['docker-compose.yml', 'docker-compose.dev.ai.yml', 'docker-compose.dev.local.yml']) {
    assert.doesNotMatch(read(f), /secrets\/runner-token|sandbox_runner_token|SANDBOX_RUNNER_TOKEN:/, f);
  }
  assert.ok('runner-token' in base.volumes && 'runner-token' in ai.volumes);
  assert.ok(base.services['runner-token-init'].volumes.every((v) => !v.startsWith('.')));
});

test('runner needs no KVM_GID, starts through the dropping entrypoint and keeps only SETUID/SETGID', () => {
  for (const f of ['docker-compose.yml', 'docker-compose.dev.ai.yml', 'docker-compose.dev.local.yml']) {
    assert.doesNotMatch(read(f), /KVM_GID/, f);
  }
  for (const [doc, names] of [[base, ['sandbox-runner']], [ai, ['online-runner']]]) {
    for (const name of names) {
      const svc = doc.services[name];
      assert.equal(svc.user, undefined, `${name} starts as the image user (root) so the entrypoint can read the kvm gid`);
      assert.equal(svc.group_add, undefined, name);
      assert.deepEqual(svc.cap_drop, ['ALL']);
      assert.deepEqual(svc.cap_add, ['SETUID', 'SETGID']);
      assert.ok(svc.security_opt.includes('no-new-privileges:true'));
      assert.deepEqual(svc.devices, ['/dev/kvm']);
    }
  }
  const dockerfile = read('ai-board/sandbox-runner/Dockerfile');
  assert.match(dockerfile, /^ENTRYPOINT \["\/usr\/local\/bin\/runner-entrypoint\.sh"\]$/m);
  assert.doesNotMatch(dockerfile, /^USER /m, 'entrypoint, not the image, drops the user');
  const entry = fs.readFileSync(BOOT('runner-entrypoint.sh'), 'utf8');
  assert.match(entry, /setpriv --reuid=node --regid=node/);
  assert.doesNotMatch(entry, /--reuid=(0|root)/);
});

test('image bakes no secret or host-specific value', () => {
  const dockerfile = read('ai-board/sandbox-runner/Dockerfile');
  assert.doesNotMatch(dockerfile, /^\s*(ENV|ARG)\s+\w*(TOKEN|SECRET|KVM_GID)/im);
  for (const name of ['init-token.sh', 'runner-entrypoint.sh']) {
    assert.doesNotMatch(fs.readFileSync(BOOT(name), 'utf8'), /[0-9a-f]{64}/);
  }
});

test('guest builder runs once before the runner, is the only docker.sock user and the runner reads the generated policy', () => {
  const builder = ai.services['guest-builder'];
  assert.equal(builder.restart, 'no');
  assert.equal(depends(builder)['image-registry']?.condition, 'service_healthy');
  assert.ok(builder.volumes.includes('/var/run/docker.sock:/var/run/docker.sock'));
  assert.ok(builder.volumes.includes('.:/src:ro'), 'repo is read-only for the builder');
  assert.ok(builder.volumes.includes('sandbox-guest-policy:/out'));
  const holders = FILES.flatMap((f) => Object.entries(compose(f).services)
    .filter(([, s]) => (s.volumes ?? []).some((v) => String(v).includes('docker.sock'))).map(([n]) => n));
  assert.deepEqual(holders, ['guest-builder']);

  const runner = ai.services['sandbox-runner'];
  assert.equal(depends(runner)['guest-builder']?.condition, 'service_completed_successfully');
  assert.equal(runner.environment.SANDBOX_POLICY_FILE, '/etc/sandbox/generated/sandbox-policy.yaml');
  assert.ok(runner.volumes.includes('sandbox-guest-policy:/etc/sandbox/generated:ro'), 'runner cannot rewrite its policy');
  assert.ok(!runner.volumes.some((v) => v.startsWith('./ai-board/sandbox-runner/sandbox-policy')), 'tracked policy is not mounted over the generated one');
  assert.ok(Object.values(ai.services).filter((s) => s !== builder).every((s) => !(s.volumes ?? []).some((v) => v.startsWith('sandbox-guest-policy:') && !v.endsWith(':ro'))));
});

test('local stack turns on the new services and keeps container names and volumes', () => {
  const local = compose('docker-compose.dev.local.yml');
  for (const n of ['runner-token-init', 'guest-builder']) assert.ok(n in local.services, n);
  assert.equal(base.services['sandbox-runner'].container_name, 'tizia-sandbox-runner');
  assert.equal(ai.services['sandbox-runner'].container_name, 'aiboard-sandbox-runner');
  assert.equal(ai.services['online-runner'].container_name, 'aiboard-online-runner');
  assert.equal(ai.volumes['sandbox-runner-state'].name, 'tizia_sandbox-runner-state');
  assert.equal(ai.volumes['runner-token'].name, 'tizia_runner-token');
});

test('the tracked policy files stay unedited by the stack: builder only reads them', () => {
  const script = fs.readFileSync(BOOT('guest-builder.sh'), 'utf8');
  assert.doesNotMatch(script, /sed -i|>\s*"?\$policy"?\s*$/m);
  assert.ok(ai.services['guest-builder'].volumes.includes('.:/src:ro'));
});

shTest('shell scripts parse', () => {
  for (const name of ['init-token.sh', 'runner-entrypoint.sh', 'guest-builder.sh']) {
    const r = spawnSync('sh', ['-n', BOOT(name)], { encoding: 'utf8' });
    assert.equal(r.status, 0, `${name}: ${r.stderr}`);
  }
});

shTest('init-token creates 64 hex chars once and keeps a valid token', () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'token-'));
  const run = () => spawnSync('sh', [BOOT('init-token.sh')], { encoding: 'utf8', env: { ...process.env, TOKEN_DIR: dir } });
  assert.equal(run().status, 0);
  const file = path.join(dir, 'sandbox-runner-token');
  const first = fs.readFileSync(file, 'utf8');
  assert.match(first, /^[0-9a-f]{64}$/);
  assert.equal(run().status, 0);
  assert.equal(fs.readFileSync(file, 'utf8'), first, 'second run keeps the token');
  fs.writeFileSync(file, 'short');
  assert.equal(run().status, 0);
  assert.match(fs.readFileSync(file, 'utf8'), /^[0-9a-f]{64}$/, 'a short token is replaced');
  assert.deepEqual(fs.readdirSync(dir), ['sandbox-runner-token'], 'no temp file left behind');
});

function stubDir(files) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'stub-'));
  for (const [name, body] of Object.entries(files)) fs.writeFileSync(path.join(dir, name), `#!/bin/sh\n${body}\n`, { mode: 0o755 });
  return dir;
}
const withPath = (dir) => {
  const host = { ...process.env };
  const key = Object.keys(host).find((k) => k.toUpperCase() === 'PATH') ?? 'PATH';
  return { ...host, [key]: `${dir}${path.delimiter}${host[key]}` };
};

stubTest('entrypoint as root drops to node with the kvm gid only, and never keeps root', () => {
  const kvm = path.join(fs.mkdtempSync(path.join(os.tmpdir(), 'kvm-')), 'kvm');
  fs.writeFileSync(kvm, '');
  const stubs = stubDir({ id: 'echo 0', stat: 'echo 109', setpriv: 'echo "setpriv $*"' });
  const r = spawnSync('sh', [BOOT('runner-entrypoint.sh'), 'node', 'src/server.js'], { encoding: 'utf8', env: { ...withPath(stubs), RUNNER_KVM_DEVICE: kvm } });
  assert.equal(r.status, 0, r.stderr);
  assert.match(r.stdout, /setpriv --reuid=node --regid=node --groups=109 .* -- node src\/server\.js/);
  assert.doesNotMatch(r.stdout, /--reuid=0|--reuid=root/);
});

stubTest('entrypoint refuses to hand over the root group and tolerates a missing device', () => {
  const kvm = path.join(fs.mkdtempSync(path.join(os.tmpdir(), 'kvm-')), 'kvm');
  fs.writeFileSync(kvm, '');
  const stubs = stubDir({ id: 'echo 0', stat: 'echo 0', setpriv: 'echo "setpriv $*"' });
  let r = spawnSync('sh', [BOOT('runner-entrypoint.sh'), 'node'], { encoding: 'utf8', env: { ...withPath(stubs), RUNNER_KVM_DEVICE: kvm } });
  assert.match(r.stdout, /--clear-groups/);
  assert.doesNotMatch(r.stdout, /--groups=0/);
  r = spawnSync('sh', [BOOT('runner-entrypoint.sh'), 'node'], { encoding: 'utf8', env: { ...withPath(stubs), RUNNER_KVM_DEVICE: `${kvm}.absent` } });
  assert.equal(r.status, 0);
  assert.match(r.stdout, /--clear-groups/);
});

stubTest('entrypoint as non-root runs the command directly', () => {
  const stubs = stubDir({ id: 'echo 1000', setpriv: 'echo SHOULD-NOT-RUN' });
  const r = spawnSync('sh', [BOOT('runner-entrypoint.sh'), 'echo', 'direct'], { encoding: 'utf8', env: withPath(stubs) });
  assert.equal(r.stdout.trim(), 'direct');
});

function builderRun(extraEnv, dockerBody) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'builder-'));
  const src = path.join(root, 'src');
  const out = path.join(root, 'out');
  fs.mkdirSync(path.join(src, 'ai-board/sandbox-runner'), { recursive: true });
  const trackedPolicy = 'version: 1\nprofile: dev\nguest_image: image-registry:5000/gate5@sha256:' + '0'.repeat(64) + '\nnetwork: none\n';
  const policyPath = path.join(src, 'ai-board/sandbox-runner/sandbox-policy.dev.yaml');
  fs.writeFileSync(policyPath, trackedPolicy);
  const stubs = stubDir({ docker: dockerBody });
  const r = spawnSync('sh', [BOOT('guest-builder.sh')], {
    encoding: 'utf8', env: { ...withPath(stubs), GUEST_SRC: src, GUEST_POLICY_OUT: out, GUEST_WARM_DIR: path.join(root, 'nowarm'), RESOURCE_PROFILE: 'dev', ...extraEnv },
  });
  return { r, out, trackedPolicy, policyPath, calls: path.join(root, 'calls') };
}

shTest('guest builder pins the pushed digest into a generated policy and leaves the tracked one alone', () => {
  const digest = `sha256:${'a'.repeat(64)}`;
  const { r, out, trackedPolicy, policyPath } = builderRun({}, `case "$1" in push) echo "cold: digest: ${digest} size: 1";; esac`);
  assert.equal(r.status, 0, r.stderr);
  const generated = fs.readFileSync(path.join(out, 'sandbox-policy.yaml'), 'utf8');
  assert.match(generated, new RegExp(`^guest_image: image-registry:5000/gate5@${digest}$`, 'm'));
  assert.match(generated, /^profile: dev$/m);
  assert.equal(fs.readFileSync(policyPath, 'utf8'), trackedPolicy);
});

shTest('guest builder fails closed without a digest and leaves no generated policy', () => {
  const { r, out } = builderRun({}, 'exit 0');
  assert.notEqual(r.status, 0);
  assert.ok(!fs.existsSync(path.join(out, 'sandbox-policy.yaml')));
});

shTest('GUEST_BUILD=pinned copies the tracked policy and never calls docker', () => {
  const { r, out, trackedPolicy } = builderRun({ GUEST_BUILD: 'pinned' }, 'echo called >&2; exit 1');
  assert.equal(r.status, 0, r.stderr);
  assert.equal(fs.readFileSync(path.join(out, 'sandbox-policy.yaml'), 'utf8'), trackedPolicy);
});

shTest('guest builder layers the warm cache only when docker-data.tar.gz exists', () => {
  const digest = `sha256:${'b'.repeat(64)}`;
  const warmDir = fs.mkdtempSync(path.join(os.tmpdir(), 'warm-'));
  fs.writeFileSync(path.join(warmDir, 'docker-data.tar.gz'), '');
  const body = `echo "$*" >> "$CALLS"; case "$1" in push) echo "x: digest: ${digest} size: 1";; esac`;
  const calls = path.join(warmDir, 'calls.txt');
  let res = builderRun({ GUEST_WARM_DIR: warmDir, CALLS: calls }, body);
  assert.equal(res.r.status, 0, res.r.stderr);
  const log = fs.readFileSync(calls, 'utf8');
  assert.match(log, /Dockerfile\.warm/);
  assert.match(log, /push .*gate5:warm/);
  fs.rmSync(calls);
  res = builderRun({ GUEST_WARM_DIR: path.join(warmDir, 'none'), CALLS: calls }, body);
  assert.equal(res.r.status, 0, res.r.stderr);
  const cold = fs.readFileSync(calls, 'utf8');
  assert.doesNotMatch(cold, /Dockerfile\.warm/);
  assert.match(cold, /push .*gate5:cold/);
});
