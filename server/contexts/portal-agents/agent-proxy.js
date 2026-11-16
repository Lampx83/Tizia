/* PORTAL AGENTS — lớp gọi Agent bên ngoài theo hợp đồng AI Portal.
 * Tách riêng (không đụng DB/Express-registry) để unit-test được với echo server.
 *
 * Hợp đồng Agent (giống AI Portal):
 *   • GET  <base>/metadata → AgentMetadata { name, description, supported_models, ... }
 *   • POST <base>/ask  (fallback <base>/v1/ask) → chat; SSE khi { stream:true } + Accept: text/event-stream
 *     Danh tính user nằm trong BODY (`user`), KHÔNG phải header (khác proxy tool).
 *     Tizia gửi kèm cả X-User-* cho chắc, nhưng nguồn chuẩn là body.user.
 */
import { isSafeProxyTarget } from '../portal-apps/embed.js';

export function normalizeBase(url) {
  return String(url || '').trim().replace(/\/+$/, '');
}

/** Chuẩn hoá + kiểm tra tối thiểu AgentMetadata; trả null nếu không hợp lệ. */
export function validateAgentMetadata(d) {
  if (!d || typeof d !== 'object' || Array.isArray(d)) return null;
  if (typeof d.name !== 'string' || !d.name.trim()) return null;
  return {
    name: d.name.trim().slice(0, 120),
    description: typeof d.description === 'string' ? d.description.slice(0, 500) : '',
    version: typeof d.version === 'string' ? d.version : undefined,
    developer: typeof d.developer === 'string' ? d.developer : undefined,
    capabilities: Array.isArray(d.capabilities) ? d.capabilities.filter((x) => typeof x === 'string') : [],
    supported_models: Array.isArray(d.supported_models)
      ? d.supported_models.filter((m) => m && typeof m.model_id === 'string')
      : [],
    sample_prompts: Array.isArray(d.sample_prompts) ? d.sample_prompts.filter((x) => typeof x === 'string') : [],
    status: d.status === 'inactive' ? 'inactive' : 'active',
  };
}

const _metaCache = new Map(); // base → { d, t }

/** Fetch + cache /metadata (5 phút). Trả null nếu không reachable / không hợp lệ / target không an toàn. */
export async function fetchAgentMetadata(baseUrl, { timeoutMs = 10_000, cacheMs = 5 * 60_000 } = {}) {
  const base = normalizeBase(baseUrl);
  if (!base || !isSafeProxyTarget(base)) return null;
  const cached = _metaCache.get(base);
  if (cached && Date.now() - cached.t < cacheMs) return cached.d;
  const ctrl = new AbortController();
  const id = setTimeout(() => ctrl.abort(), timeoutMs);
  try {
    const res = await fetch(`${base}/metadata`, { headers: { 'Content-Type': 'application/json' }, signal: ctrl.signal });
    if (!res.ok) return null;
    const data = await res.json();
    const meta = validateAgentMetadata(data);
    if (meta) _metaCache.set(base, { d: meta, t: Date.now() });
    return meta;
  } catch {
    return null;
  } finally {
    clearTimeout(id);
  }
}

export function clearAgentMetadataCache(baseUrl) {
  if (baseUrl) _metaCache.delete(normalizeBase(baseUrl));
  else _metaCache.clear();
}

/**
 * Chat-proxy tới Agent và STREAM kết quả về `res` (SSE passthrough). Nếu agent trả JSON
 * (không stream) thì forward nguyên khối. Thử /ask, 404 → thử /v1/ask (đúng AI Portal).
 * @param {{ baseUrl:string, payload:object, res:import('express').Response,
 *           identity?:{id?:any,email?:string,name?:string,user?:string}, timeoutMs?:number }} o
 */
export async function proxyAgentAsk({ baseUrl, payload, res, identity, timeoutMs = 120_000 }) {
  const base = normalizeBase(baseUrl);
  if (!base || !isSafeProxyTarget(base)) {
    if (!res.headersSent) res.status(502).json({ error: 'unsafe_target', message: 'base_url agent bị chặn (nội bộ/không http).' });
    return;
  }
  const body = { ...(payload || {}), stream: true };
  if (identity && identity.user != null && body.user == null) body.user = identity.user;
  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'text/event-stream',
  };
  if (identity) {
    headers['X-User-Id'] = String(identity.id ?? '');
    headers['X-User-Email'] = identity.email ?? '';
    headers['X-User-Name'] = identity.name ?? '';
  }

  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), timeoutMs);
  const bodyStr = JSON.stringify(body);
  const doPost = (p) => fetch(`${base}${p}`, { method: 'POST', headers, body: bodyStr, signal: ctrl.signal });

  try {
    let up = await doPost('/ask');
    if (up.status === 404) up = await doPost('/v1/ask');
    const ct = up.headers.get('content-type') || '';

    if (ct.includes('text/event-stream') && up.body) {
      res.status(up.status);
      res.setHeader('Content-Type', 'text/event-stream; charset=utf-8');
      res.setHeader('Cache-Control', 'no-cache, no-transform');
      res.setHeader('Connection', 'keep-alive');
      res.setHeader('X-Accel-Buffering', 'no'); // tắt buffering của nginx để stream ngay
      if (typeof res.flushHeaders === 'function') res.flushHeaders();
      const reader = up.body.getReader();
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        if (value) res.write(Buffer.from(value));
      }
      res.end();
      return;
    }

    // Agent trả JSON/khối (không stream) → forward nguyên khối.
    const txt = await up.text();
    const status = up.ok ? 200 : (up.status >= 400 && up.status < 600 ? up.status : 502);
    res.status(status);
    res.setHeader('Content-Type', ct.includes('json') ? 'application/json; charset=utf-8' : 'text/plain; charset=utf-8');
    res.send(txt);
  } catch (e) {
    const timedOut = e && e.name === 'AbortError';
    if (!res.headersSent) {
      res.status(timedOut ? 504 : 502).json({ error: timedOut ? 'agent_timeout' : 'agent_failed', message: String(e?.message || e) });
    } else {
      try { res.end(); } catch { /* ignore */ }
    }
  } finally {
    clearTimeout(timer);
  }
}
