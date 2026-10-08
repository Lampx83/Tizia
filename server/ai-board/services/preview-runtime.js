import fs from 'node:fs/promises';
import path from 'node:path';
import { createHash } from 'node:crypto';

// Trusted immutable guest's PostgreSQL generator, never candidate Compose/config or serving credentials.
// This fixed published port belongs to a fresh VM, not the serving host's port 8041.
const GUEST_START = new URL('../../../ai-board/harness/verification/preview_guest.py', import.meta.url);

/** Private runner token stays server-side; no runner URL/credential is returned to a user or candidate. */
export function createPreviewRuntime({ url, token, archiveDir, fetchImpl = fetch }) {
  const base = new URL(url);
  if (!['http:', 'https:'].includes(base.protocol) || base.username || base.password || base.search || base.hash) throw new TypeError('invalid runner URL');
  const call = async (method, route, body, timeout = 30_000, binary = false) => {
    const response = await fetchImpl(new URL(route, base), { method, redirect: 'error', signal: AbortSignal.timeout(timeout),
      headers: { Authorization: `Bearer ${token}`, 'X-Sandbox-Protocol': '1', 'Content-Type': binary ? 'application/gzip' : 'application/json' },
      body: body === undefined ? undefined : binary ? body : JSON.stringify(body) });
    if (!response.ok) throw new Error('preview runner unavailable');
    return response.json();
  };
  return {
    async create(p, archive) {
      if (!archiveDir) throw new Error('owned candidate archive directory required');
      await fs.mkdir(archiveDir, { recursive: true, mode: 0o700 });
      await fs.writeFile(path.join(archiveDir, `${p.id}.tgz`), archive, { flag: 'wx', mode: 0o600 });
      const provisioned = await call('POST', '/v1/runs', { run_id: p.runtime_id, manifest: [] }, 600_000);
      const renew = setInterval(() => { call('POST', `/v1/runs/${p.runtime_id}/renew`).catch(() => {}); }, 30_000);
      renew.unref?.();
      try {
        await call('PUT', `/v1/runs/${p.runtime_id}/workspace`, archive, 300_000, true);
        const boot = await call('POST', `/v1/runs/${p.runtime_id}/exec`, { argv: ['guest-boot.sh'] }, 180_000);
        if (boot.code !== 0 || boot.timed_out || boot.truncated) throw new Error('preview daemon startup failed');
        // Host-owned source, not a file uploaded by the candidate. Immutable guest imports enforce PG config.
        const source = await fs.readFile(GUEST_START, 'utf8');
        // Compile the trusted module separately so its __future__ import stays first.
        const script = "import sys; sys.path.insert(0, '/opt/ai-board/ai-board/harness')\nexec(compile(" + JSON.stringify(source) + ", 'preview_guest.py', 'exec'), {'__name__': '__main__'})";
        const result = await call('POST', `/v1/runs/${p.runtime_id}/exec`, { argv: ['python3', '-c', script] }, 900_000);
        if (result.code !== 0 || result.timed_out || result.truncated) throw new Error('preview startup failed');
        const proof = JSON.parse(result.stdout);
        if (proof.state !== 'ready' || !/^[a-f0-9]{64}$/.test(proof.test_session?.token || '')) throw new Error('preview startup unconfirmed');
        return { ...proof, startup_sha: createHash('sha256').update(script).digest('hex'), runner_policy_hash: provisioned.policy_hash };
      } finally { clearInterval(renew); }
    },
    status: (id) => call('GET', `/v1/runs/${id}`),
    destroy: (id) => call('DELETE', `/v1/runs/${id}`),
    async http(id, request) {
      await call('POST', `/v1/runs/${id}/renew`); // browsing keeps lease alive, never extends absolute TTL
      return call('POST', `/v1/runs/${id}/http`, request);
    },
  };
}
