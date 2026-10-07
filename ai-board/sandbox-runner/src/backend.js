import { Sandbox } from 'microsandbox';
import { PREVIEW_HTTP_SCRIPT, PREVIEW_BODY_LIMIT } from './preview-http.js';

const GROUPS_DENIED = ['loopback', 'private', 'link-local', 'metadata', 'multicast', 'host'];
const stripNul = (text) => text.split('\0').join('');

/** Default-deny egress; private/metadata destinations are denied first, then exact host:port allows. */
export function egressPolicy(egress) {
  const rule = (destination, ports, action) => ({
    direction: 'egress', destination, protocols: ['tcp'], ports: ports.map((port) => ({ start: port, end: port })), action,
  });
  return {
    defaultEgress: 'deny',
    defaultIngress: 'deny',
    rules: [
      // DNS is answered by the host gateway, which applies the domain rules below; no other host service is reachable
      { direction: 'egress', destination: { kind: 'group', group: 'host' }, protocols: ['udp', 'tcp'], ports: [{ start: 53, end: 53 }], action: 'allow' },
      ...GROUPS_DENIED.map((group) => ({ direction: 'egress', destination: { kind: 'group', group }, protocols: [], ports: [], action: 'deny' })),
      ...egress.map(({ host, port }) => rule({ kind: 'domain', domain: host }, [port], 'allow')),
    ],
  };
}

/**
 * Online-feature policy: zero egress. Every group, every destination, TCP/UDP/ICMP, DNS included.
 * No host-DNS exception (unlike egressPolicy): the guest cannot resolve names or reach host/gateway services.
 */
export function onlineEgressPolicy() {
  return {
    defaultEgress: 'deny',
    defaultIngress: 'deny',
    rules: [
      ...GROUPS_DENIED.map((group) => ({ direction: 'any', destination: { kind: 'group', group }, protocols: [], ports: [], action: 'deny' })),
      { direction: 'any', destination: { kind: 'any' }, protocols: [], ports: [], action: 'deny' },
    ],
  };
}

/** Real microsandbox adapter. Only src/server.js wires this in; tests use a fake with the same shape. */
export function createMicrosandboxBackend() {
  const live = new Map();
  const get = (name) => {
    const sandbox = live.get(name);
    if (!sandbox) throw Object.assign(new Error('unknown sandbox'), { code: 'not_found' });
    return sandbox;
  };

  async function exec(name, { argv, cwd, env, timeout_s, max_stdout_bytes, max_stderr_bytes }) {
    const sandbox = get(name);
    const [cmd, ...args] = argv;
    const handle = await sandbox.execStreamWith(cmd, (b) => b.args(args).cwd(cwd).envs(env).stdinNull());
    const out = { stdout: [], stderr: [] };
    const sizes = { stdout: 0, stderr: 0 };
    const caps = { stdout: max_stdout_bytes, stderr: max_stderr_bytes };
    let code = null;
    let truncated = false;
    let timedOut = false;
    // the SDK's own timeout proved unreliable (a 5 s limit returned after ~19 s), so enforce it here
    const timer = setTimeout(() => { timedOut = true; handle.kill().catch(() => {}); }, timeout_s * 1000);
    const giveUp = new Promise((resolve) => { setTimeout(resolve, (timeout_s + 5) * 1000, null).unref(); }); // kill never confirmed
    for (;;) {
      const event = await Promise.race([handle.recv(), giveUp]);
      if (!event) break;
      if (event.kind === 'exited') { code = event.code; break; }
      if (event.kind !== 'stdout' && event.kind !== 'stderr') continue;
      const room = caps[event.kind] - sizes[event.kind];
      if (event.data.length > room) {
        out[event.kind].push(event.data.subarray(0, Math.max(room, 0)));
        sizes[event.kind] = caps[event.kind];
        truncated = true;
        await handle.kill();
        break;
      }
      out[event.kind].push(event.data);
      sizes[event.kind] += event.data.length;
    }
    clearTimeout(timer);
    const text = (parts) => stripNul(Buffer.concat(parts).toString('utf8'));
    return { code: truncated || timedOut ? null : code, stdout: text(out.stdout), stderr: text(out.stderr), timed_out: timedOut, truncated };
  }

  return {
    async create({ name, image, vm, egress, network, env, ttl_s, workdir, labels }) {
      const sandbox = await Sandbox.builder(name).image(image).cpus(vm.cpus).memory(vm.memory_mib).rootDisk(vm.disk_mib)
        .maxDuration(ttl_s).envs(env).labels(labels)
        .registry((r) => (/^image-registry[:/]/.test(image) ? r.insecure() : r)) // the in-compose registry speaks plain http
        // tls(): host-enforced domain rules need the TLS-aware path; without it every HTTPS handshake to an allowed host is reset
        .network((n) => (network === 'none' ? n.policy(onlineEgressPolicy()) : n.policy(egressPolicy(egress)).tls((t) => t))).create();
      live.set(name, sandbox);
      await sandbox.exec('mkdir', ['-p', workdir]);
    },

    async putArchive(name, bytes, workdir) {
      const sandbox = get(name);
      await sandbox.fs().write('/tmp/workspace.tgz', bytes);
      const out = await sandbox.exec('tar', ['-xzf', '/tmp/workspace.tgz', '-C', workdir, '--no-same-owner']);
      await sandbox.exec('rm', ['-f', '/tmp/workspace.tgz']);
      if (!out.success) throw new Error(`extract exited ${out.code}`);
    },

    exec,

    async http(name, request) {
      const result = await exec(name, {
        argv: ['python3', '-c', PREVIEW_HTTP_SCRIPT, JSON.stringify(request)], cwd: '/workspace', env: {},
        timeout_s: 12, max_stdout_bytes: PREVIEW_BODY_LIMIT * 2, max_stderr_bytes: 1024,
      });
      if (result.code !== 0 || result.timed_out || result.truncated) throw new Error('preview transport failed');
      return JSON.parse(result.stdout);
    },

    async readFile(name, path, maxBytes, root) {
      const sandbox = get(name);
      const real = await sandbox.exec('readlink', ['-f', path]);
      const resolved = real.success ? real.stdout().trim() : '';
      if (!resolved || !resolved.startsWith(`${root}/`)) throw Object.assign(new Error('outside workspace'), { code: 'not_found' });
      const meta = await sandbox.fs().stat(resolved);
      if (meta.kind !== 'file') throw Object.assign(new Error('not a regular file'), { code: 'not_found' });
      if (meta.size > maxBytes) throw Object.assign(new Error('too large'), { code: 'too_large' });
      return Buffer.from(await sandbox.fs().read(resolved));
    },

    /** True only when the sandbox is stopped, removed and no longer listed. */
    async destroy(name) {
      const sandbox = live.get(name);
      try { if (sandbox) await sandbox.stop(); } catch { /* may already be stopped */ }
      try { await Sandbox.remove(name); } catch { /* may already be gone */ }
      live.delete(name);
      const { sandboxes } = await Sandbox.list();
      return !sandboxes.some((handle) => handle.name === name);
    },

    async list() {
      const { sandboxes } = await Sandbox.list();
      // the SDK camelCases label keys (runner_id -> runnerId); undo it so callers see the keys they set
      const snake = (key) => key.replace(/[A-Z]/g, (c) => `_${c.toLowerCase()}`);
      return sandboxes.map((handle) => ({
        name: handle.name,
        labels: Object.fromEntries(Object.entries(handle.config().labels ?? {}).map(([key, value]) => [snake(key), value])),
      }));
    },
  };
}
