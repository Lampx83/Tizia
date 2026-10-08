// Opt-in real microVM check of the runner API (needs /dev/kvm). Run inside the runner image:
//   node scripts/real-e2e.mjs
// Spawns the real server with scripts/policy.real.yaml on its own state, drives it over HTTP.
import assert from 'node:assert/strict';
import { execFileSync, spawn } from 'node:child_process';
import { mkdtempSync, readdirSync, writeFileSync } from 'node:fs';
import { networkInterfaces, tmpdir } from 'node:os';
import { join } from 'node:path';
import { Sandbox } from 'microsandbox';

const PORT = 8091;
const BASE = `http://127.0.0.1:${PORT}`;
const dir = mkdtempSync(join(tmpdir(), 'real-'));
const tokenFile = join(dir, 'token');
const TOKEN = 'e'.repeat(48);
writeFileSync(tokenFile, TOKEN);

const env = {
  ...process.env, PORT: String(PORT), SANDBOX_POLICY_FILE: new URL('./policy.real.yaml', import.meta.url).pathname,
  SANDBOX_TOKEN_FILE: tokenFile, SANDBOX_STATE_FILE: join(dir, 'state.json'), SANDBOX_RUNNER_ID: 'real-test', SANDBOX_RECHECK_MS: '3600000',
  RUNNER_SECRET_FOR_LEAK_CHECK: 'leak-me-if-inherited',
};
let server;
const start = () => new Promise((resolve) => {
  server = spawn('node', ['src/server.js'], { env, stdio: ['ignore', 'pipe', 'inherit'] });
  server.stdout.on('data', (chunk) => {
    const text = String(chunk);
    if (text.includes('"listening"')) resolve();
    if (!text.includes('"event":"request"')) console.log('[server]', text.trim().slice(0, 1500));
  });
});
const call = async (method, path, { body, raw } = {}) => {
  const res = await fetch(BASE + path, {
    method, headers: { authorization: `Bearer ${TOKEN}`, 'x-sandbox-protocol': '1', ...(raw ? {} : { 'content-type': 'application/json' }) },
    body: raw ?? (body === undefined ? undefined : JSON.stringify(body)),
  });
  const buf = Buffer.from(await res.arrayBuffer());
  let json = null;
  try { json = JSON.parse(buf.toString()); } catch { /* binary */ }
  return { status: res.status, json, buf, headers: res.headers };
};
const step = (name) => console.log(`\n== ${name}`);
const exec = async (id, argv) => (await call('POST', `/v1/runs/${id}/exec`, { body: { argv } })).json;
const sandboxesLeft = async () => (await Sandbox.list()).sandboxes.filter((h) => h.name.startsWith('sandbox-real')).length;

// workspace archive built with the system tar, as the worker would
const ws = join(dir, 'ws');
execFileSync('sh', ['-c', `mkdir -p ${ws}/dir && echo alpha > ${ws}/a.txt && echo beta > ${ws}/dir/b.txt && tar -czf ${dir}/ws.tgz -C ${ws} .`]);
const tgz = execFileSync('cat', [`${dir}/ws.tgz`]);

try {
  await start();
  const health = await (await fetch(`${BASE}/healthz`)).json();
  step(`healthz ${JSON.stringify({ ready: health.ready, protocol: health.protocol })}`);
  assert.equal(health.ready, true);

  step('create (timed) + idempotent retry + busy');
  const MANIFEST = [{ name: 'out', path: 'out.txt' }, { name: 'link', path: 'link' }, { name: 'viadir', path: 'rootlink/etc/hostname' }, { name: 'big', path: 'big.txt' }];
  let t = Date.now();
  const created = await call('POST', '/v1/runs', { body: { run_id: 'real-run-0001', manifest: MANIFEST } });
  console.log('create ms', Date.now() - t, created.json);
  assert.equal(created.json.state, 'ready');
  assert.deepEqual((await call('POST', '/v1/runs', { body: { run_id: 'real-run-0001', manifest: MANIFEST } })).json, created.json);
  assert.equal(await sandboxesLeft(), 1, 'idempotent create must not boot a second VM');
  assert.equal((await call('POST', '/v1/runs', { body: { run_id: 'real-run-0002' } })).json.error, 'busy');

  step('upload + exec (fixed cwd, no inherited env)');
  assert.equal((await call('PUT', '/v1/runs/real-run-0001/workspace', { raw: tgz })).status, 200);
  const ls = await exec('real-run-0001', ['sh', '-c', 'pwd; cat a.txt dir/b.txt']);
  console.log(ls);
  assert.equal(ls.stdout, '/workspace\nalpha\nbeta\n');
  const guestEnv = (await exec('real-run-0001', ['env'])).stdout;
  assert.match(guestEnv, /CI=1/);
  assert.doesNotMatch(guestEnv, /leak-me|RUNNER_SECRET|SANDBOX_|TOKEN/, 'runner env must not reach the guest');

  step('timeout and output limits stop the guest command, run stays usable');
  t = Date.now();
  const slow = await exec('real-run-0001', ['sleep', '30']);
  console.log('sleep 30 ->', slow, `${Date.now() - t}ms`);
  assert.equal(slow.timed_out, true);
  assert.ok(Date.now() - t < 15000);
  const flood = await exec('real-run-0001', ['yes']);
  console.log('yes -> truncated', flood.truncated, flood.stdout.length);
  assert.equal(flood.truncated, true);
  assert.ok(flood.stdout.length <= 2000);
  assert.equal((await exec('real-run-0001', ['echo', 'still-alive'])).stdout, 'still-alive\n');

  step('egress: exact allow, everything else denied');
  const reach = async (host, port) => (await exec('real-run-0001', ['nc', '-z', '-w', '4', host, String(port)])).code === 0;
  const own = Object.values(networkInterfaces()).flat().find((i) => i.family === 'IPv4' && !i.internal)?.address;
  const results = {
    'registry.npmjs.org:443 (allowed)': await reach('registry.npmjs.org', 443),
    'example.com:443 (not allowed)': await reach('example.com', 443),
    '1.1.1.1:443 (raw ip)': await reach('1.1.1.1', 443),
    '169.254.169.254:80 (metadata)': await reach('169.254.169.254', 80),
    [`${own}:${PORT} (runner API)`]: await reach(own, PORT),
    '127.0.0.1:22 (guest loopback)': await reach('127.0.0.1', 22),
  };
  const dns = async (name) => (await exec('real-run-0001', ['nslookup', name])).stdout.replace(/\s+/g, ' ').slice(0, 200);
  console.log('nslookup registry.npmjs.org ->', await dns('registry.npmjs.org'));
  console.log('nslookup example.com ->', await dns('example.com'));
  console.log(results);
  assert.equal(results['registry.npmjs.org:443 (allowed)'], true);
  for (const [name, ok] of Object.entries(results)) if (!name.includes('(allowed)')) assert.equal(ok, false, `${name} must be blocked`);

  step('download: manifest only, no symlink or traversal, hashed, size limited');
  await exec('real-run-0001', ['sh', '-c', 'echo hi > out.txt; ln -s /etc/passwd link; ln -s / rootlink; head -c 100 /dev/zero > big.txt']);
  const out = await call('GET', '/v1/runs/real-run-0001/artifacts/out');
  assert.equal(out.buf.toString(), 'hi\n');
  assert.match(out.headers.get('x-sha256'), /^[0-9a-f]{64}$/);
  assert.equal((await call('GET', '/v1/runs/real-run-0001/artifacts/link')).status, 404, 'symlink refused');
  assert.equal((await call('GET', '/v1/runs/real-run-0001/artifacts/viadir')).status, 404, 'symlinked directory refused');
  assert.equal((await call('GET', '/v1/runs/real-run-0001/artifacts/etc-passwd')).json.error, 'artifact_not_registered');
  assert.equal((await call('GET', '/v1/runs/real-run-0001/artifacts/big')).json.error, 'artifact_too_large');

  step('destroy confirms removal and is idempotent; id never reused');
  assert.equal((await call('DELETE', '/v1/runs/real-run-0001')).json.state, 'destroyed');
  assert.equal((await call('DELETE', '/v1/runs/real-run-0001')).json.state, 'destroyed');
  assert.equal(await sandboxesLeft(), 0);
  assert.equal((await call('POST', '/v1/runs', { body: { run_id: 'real-run-0001' } })).json.error, 'run_id_reused');

  step('lease expiry (10s lease, swept) destroys the VM');
  await call('POST', '/v1/runs', { body: { run_id: 'real-run-0003' } });
  assert.equal(await sandboxesLeft(), 1);
  await new Promise((r) => setTimeout(r, 24_000));
  assert.equal((await call('GET', '/v1/runs/real-run-0003')).json.state, 'expired');
  assert.equal(await sandboxesLeft(), 0);

  step('runner crash leaves an orphan; restart reconciles it before readiness');
  await call('POST', '/v1/runs', { body: { run_id: 'real-run-0004' } });
  assert.equal(await sandboxesLeft(), 1);
  server.kill('SIGKILL');
  await new Promise((r) => setTimeout(r, 1500));
  assert.equal(await sandboxesLeft(), 1, 'orphan survives the crash');
  await start();
  assert.equal(await sandboxesLeft(), 0, 'reconcile removed the orphan');
  assert.equal((await call('GET', '/v1/runs/real-run-0004')).json.state, 'indeterminate');
  console.log('\nALL REAL CHECKS PASSED');
} finally {
  server?.kill('SIGKILL');
  console.log('leftover sandboxes:', readdirSync(`${process.env.HOME}/.microsandbox`).join(','));
}
