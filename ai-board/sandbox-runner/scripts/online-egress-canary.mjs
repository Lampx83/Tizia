// Egress canary for the online profile: real microsandbox microVMs, host-side HTTP/UDP canaries.
// Control (policy allowing only the canary IP) must reach the canaries; the online profile (network:'none') must not.
// Exit 0 only when the control arrived (the path exists) AND online arrivals are 0 AND every probe failed closed.
// Run on the host that will serve production, inside the runner image with /dev/kvm:
//   docker run --rm --user node --device /dev/kvm --group-add <kvm gid> --cap-drop ALL --security-opt no-new-privileges:true \
//     -v t24-canary-state:/home/node/.microsandbox -v "$PWD/ai-board/sandbox-runner/scripts:/app/scripts:ro" \
//     -v "$PWD/out:/out" -w /app --entrypoint node tizia-sandbox-runner:dev scripts/online-egress-canary.mjs /out/canary.json
import http from 'node:http';
import dgram from 'node:dgram';
import os from 'node:os';
import { randomBytes } from 'node:crypto';
import { writeFileSync } from 'node:fs';
import { Sandbox } from 'microsandbox';
import { createMicrosandboxBackend } from '../src/backend.js';

const IMAGE = 'alpine@sha256:d9e853e87e55526f6b2917df91a2115c36dd7c696a35be12163d44e6e2a4b6bc';
const ip = Object.values(os.networkInterfaces()).flat().find((a) => a.family === 'IPv4' && !a.internal).address;
const arrivals = { http: [], udp: [] };
const httpServer = http.createServer((req, res) => { arrivals.http.push(`${req.socket.remoteAddress} ${req.url}`); res.end('canary'); });
await new Promise((r) => httpServer.listen(0, '0.0.0.0', r));
const HTTP_PORT = httpServer.address().port;
const udp = dgram.createSocket('udp4');
udp.on('message', (m, rinfo) => arrivals.udp.push(`${rinfo.address}:${m.length}`));
await new Promise((r) => udp.bind(0, '0.0.0.0', r));
// Upstream-DNS canary: container runs with --dns 127.0.0.1, so any query the sandbox gateway forwards upstream lands here
const dnsUp = dgram.createSocket('udp4');
const dnsQueries = [];
dnsUp.on('message', (m) => dnsQueries.push(m.subarray(13, m.length - 5).toString('latin1').replace(/[^ -~]/g, '.')));
await new Promise((r) => { dnsUp.once('error', r); dnsUp.bind(53, '127.0.0.1', r); }); // port 53 needs privilege on Linux; the upstream-DNS canary is then simply silent
const UDP_PORT = udp.address().port;
for (const stale of (await Sandbox.list()).sandboxes) if (/^(ctl24|online24|dnsctl24)-/.test(stale.name)) await Sandbox.remove(stale.name).catch(() => {});

const sh = async (box, cmd, secs = 12) => {
  const out = await Promise.race([box.exec('sh', ['-c', cmd]), new Promise((_, rej) => setTimeout(() => rej(new Error('timeout')), secs * 1000).unref())])
    .catch(() => ({ code: -1, stdout: () => '', stderr: () => 'timeout' }));
  return { code: out.code, stdout: out.stdout().trim().slice(0, 300), stderr: out.stderr().trim().slice(0, 300) };
};
const result = { image: IMAGE, canary_ip: ip, http_port: HTTP_PORT, udp_port: UDP_PORT, control: {}, online: {}, cleanup: {} };

// ---- positive control: same canaries, policy that allows exactly the canary IP ----
const allow = { defaultEgress: 'deny', defaultIngress: 'deny', rules: [
  { direction: 'egress', destination: { kind: 'cidr', cidr: `${ip}/32` }, protocols: [], ports: [], action: 'allow' }] };
const ctl = await Sandbox.builder(`ctl24-${randomBytes(3).toString('hex')}`).image(IMAGE).cpus(1).memory(256).maxDuration(120)
  .network((n) => n.policy(allow)).create();
try {
  result.control.http = await sh(ctl, `wget -q -T5 -O- http://${ip}:${HTTP_PORT}/ctl`);
  result.control.udp = await sh(ctl, `echo ctl | nc -u -w2 ${ip} ${UDP_PORT}`);
  result.control.dns_to_canary = await sh(ctl, `nslookup ctl.canary.invalid ${ip}`, 8);
  await new Promise((r) => setTimeout(r, 500));
  result.control.http_arrivals = arrivals.http.length;
  result.control.udp_arrivals = arrivals.udp.length;
} finally { await ctl.stop().catch(() => {}); await Sandbox.remove(ctl.name).catch(() => {}); }
// DNS control: policy that allows host DNS + example.com, so a real name resolves; online must NOT resolve the same real name
const { egressPolicy } = await import('../src/backend.js');
const dctl = await Sandbox.builder(`dnsctl24-${randomBytes(3).toString('hex')}`).image(IMAGE).cpus(1).memory(256).maxDuration(120)
  .network((n) => n.policy(egressPolicy([{ host: 'example.com', port: 80 }])).tls((t) => t)).create();
try { result.control.dns_real_name = await sh(dctl, 'nslookup example.com'); }
finally { await dctl.stop().catch(() => {}); await Sandbox.remove(dctl.name).catch(() => {}); }
result.control.dns_upstream_queries = dnsQueries.splice(0);
const baseHttp = arrivals.http.length, baseUdp = arrivals.udp.length;

// ---- online profile through the real backend adapter ----
const backend = createMicrosandboxBackend();
const name = `online24-${randomBytes(3).toString('hex')}`;
await backend.create({ name, image: IMAGE, vm: { cpus: 1, memory_mib: 256, disk_mib: 1024 }, egress: [], network: 'none',
  env: { CI: '1' }, ttl_s: 120, workdir: '/workspace', labels: { run_id: name, runner_id: 'ticket24', runner_version: 'proof' } });
const run = async (cmd) => backend.exec(name, { argv: ['sh', '-c', cmd], cwd: '/workspace', env: {}, timeout_s: 15, max_stdout_bytes: 4096, max_stderr_bytes: 4096 });
const cases = {
  http_canary_numeric_ip: `wget -q -T5 -O- http://${ip}:${HTTP_PORT}/online`,
  tcp_canary_nc: `nc -w3 ${ip} ${HTTP_PORT} </dev/null`,
  udp_canary_nc: `echo online | nc -u -w2 ${ip} ${UDP_PORT}`,
  metadata_169_254: 'wget -q -T4 -O- http://169.254.169.254/latest/meta-data/',
  loopback_host_gateway: 'wget -q -T4 -O- http://192.168.127.1/ ; wget -q -T4 -O- http://10.0.2.2/',
  public_numeric_ip: 'wget -q -T4 -O- http://1.1.1.1/',
  public_dns_name: 'wget -q -T4 -O- http://example.com/',
  dns_unique_name: `nslookup ${randomBytes(6).toString('hex')}.online24-canary.invalid`,
  dns_to_canary_resolver: `nslookup online.canary.invalid ${ip}`,
  dns_direct_resolver: 'nslookup example.com 8.8.8.8',
};
for (const [key, cmd] of Object.entries(cases)) {
  const out = await run(cmd);
  result.online[key] = { code: out.code, timed_out: out.timed_out, stdout: out.stdout.trim().slice(0, 200), stderr: out.stderr.trim().slice(0, 200), failed_closed: key === 'udp_canary_nc' ? 'judged-by-arrivals' : out.code !== 0 || out.timed_out };
}
const env = await run('env');
result.online.env_has_credential_names = /TOKEN|SECRET|PASSWORD|KEY|CRED/i.test(env.stdout);
result.online.dns_upstream_queries = dnsQueries.splice(0);
result.online.arrivals_http = arrivals.http.length - baseHttp;
result.online.arrivals_udp = arrivals.udp.length - baseUdp;
result.online.all_cases_failed_closed = Object.values(result.online).filter((v) => v && v.failed_closed !== undefined).every((v) => v.failed_closed !== false);

result.cleanup.destroyed = await backend.destroy(name);
result.cleanup.remaining = (await backend.list()).filter((s) => /^(ctl24|online24|dnsctl24)-/.test(s.name)).map((s) => s.name);
httpServer.close(); udp.close(); dnsUp.close();
result.verdict = { control_reached: result.control.http_arrivals > 0 && result.control.udp_arrivals > 0,
  online_silent: result.online.arrivals_http === 0 && result.online.arrivals_udp === 0 && result.online.dns_upstream_queries.length === 0,
  all_failed_closed: result.online.all_cases_failed_closed, leftovers: result.cleanup.remaining.length };
result.verdict.pass = result.verdict.control_reached && result.verdict.online_silent && result.verdict.all_failed_closed && !result.verdict.leftovers;
writeFileSync(process.argv[2] || 'online-egress-canary.json', `${JSON.stringify(result, null, 2)}\n`);
console.log(JSON.stringify(result.verdict));
process.exit(result.verdict.pass ? 0 : 1);
