// Host-side adapter for ONE fixed endpoint. Generated code never sees the URL, method, headers or credential.
export class BrokerError extends Error {
  constructor(code, status = 403) { super(code); this.code = code; this.status = status; }
}

export function createHttpAdapter({ url, credential, header = 'authorization', timeoutMs = 5000,
  maxRequestBytes = 16384, maxResponseBytes = 65536, fetchImpl = fetch }) {
  const target = new URL(url);
  if (!['http:', 'https:'].includes(target.protocol) || target.username || target.password) throw new Error('invalid adapter endpoint');
  return {
    async send(payload) {
      const body = JSON.stringify(payload);
      if (Buffer.byteLength(body) > maxRequestBytes) throw new BrokerError('request_too_large', 413);
      let res;
      try {
        res = await fetchImpl(target, {
          method: 'POST', redirect: 'manual', signal: AbortSignal.timeout(timeoutMs),
          headers: { 'content-type': 'application/json', ...(credential ? { [header]: credential } : {}) }, body,
        });
      } catch { throw new BrokerError('adapter_unreachable', 502); }
      // credential and payload were already sent to the fixed endpoint only; a redirect is never followed
      if (res.status >= 300 && res.status < 400) { await res.body?.cancel().catch(() => {}); throw new BrokerError('redirect_denied', 502); }
      if (!res.ok) { await res.body?.cancel().catch(() => {}); throw new BrokerError('adapter_rejected', 502); }
      const chunks = [];
      let size = 0;
      try {
        for await (const chunk of res.body ?? []) {
          size += chunk.length;
          if (size > maxResponseBytes) { await res.body.cancel().catch(() => {}); throw new BrokerError('response_too_large', 502); }
          chunks.push(chunk);
        }
        return JSON.parse(Buffer.concat(chunks).toString('utf8'));
      } catch (error) {
        throw error instanceof BrokerError ? error : new BrokerError('adapter_bad_response', 502);
      }
    },
  };
}
