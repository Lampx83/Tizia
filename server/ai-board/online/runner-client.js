import { randomBytes } from 'node:crypto';
import { BrokerError } from './adapter.js';

/**
 * Client for the private sandbox runner started with a `network: none` policy. One short-lived VM per invocation.
 * The token stays server-side. Fails closed on timeout, truncation, non-zero exit or unconfirmed teardown.
 */
export function createRunnerClient({ url, token, timeoutS = 20, fetchImpl = fetch }) {
  const base = new URL(url);
  if (!['http:', 'https:'].includes(base.protocol) || base.username || base.password || base.search || base.hash) throw new TypeError('invalid runner URL');
  const call = async (method, route, body, ms = 60_000) => {
    const res = await fetchImpl(new URL(route, base), { method, redirect: 'error', signal: AbortSignal.timeout(ms),
      headers: { Authorization: `Bearer ${token}`, 'X-Sandbox-Protocol': '1', 'Content-Type': 'application/json' },
      body: body === undefined ? undefined : JSON.stringify(body) });
    const json = await res.json().catch(() => ({}));
    if (!res.ok) throw Object.assign(new Error(json.error || 'runner_error'), { status: res.status });
    return json;
  };
  return {
    async exec(argv) {
      const runId = `ob${randomBytes(8).toString('hex')}`;
      let out; let failure = null;
      try {
        await call('POST', '/v1/runs', { run_id: runId, manifest: [] }, 600_000);
        out = await call('POST', `/v1/runs/${runId}/exec`, { argv, timeout_s: timeoutS }, (timeoutS + 30) * 1000);
      } catch (error) { failure = error.status === 429 ? new BrokerError('backend_busy', 503) : new BrokerError('backend_failed', 502); }
      let destroyed = false;
      try { destroyed = (await call('DELETE', `/v1/runs/${runId}`, undefined, 120_000)).state === 'destroyed'; } catch { /* unconfirmed */ }
      if (!destroyed) throw new BrokerError('backend_cleanup_unconfirmed', 503); // never expose output of a VM that may still be alive
      if (failure) throw failure;
      if (out.code !== 0 || out.timed_out || out.truncated) throw new BrokerError('backend_failed', 502);
      return out.stdout;
    },
  };
}
