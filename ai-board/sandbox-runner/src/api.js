import { timingSafeEqual } from 'node:crypto';
import { RunnerError } from './runs.js';

export const PROTOCOL = 1;

const ROUTES = [
  ['POST', /^\/v1\/runs$/, 'create'],
  ['GET', /^\/v1\/runs\/([\w-]+)$/, 'status'],
  ['DELETE', /^\/v1\/runs\/([\w-]+)$/, 'destroy'],
  ['PUT', /^\/v1\/runs\/([\w-]+)\/workspace$/, 'upload'],
  ['POST', /^\/v1\/runs\/([\w-]+)\/exec$/, 'exec'],
  ['POST', /^\/v1\/runs\/([\w-]+)\/renew$/, 'renew'],
  ['GET', /^\/v1\/runs\/([\w-]+)\/artifacts\/([\w.-]+)$/, 'download'],
];
const JSON_LIMIT = 64 * 1024;

const sameToken = (given, expected) => {
  const a = Buffer.from(given);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
};

async function readBody(req, limit) {
  const chunks = [];
  let size = 0;
  for await (const chunk of req) {
    size += chunk.length;
    if (size > limit) throw new RunnerError(413, 'body_too_large', 'upload');
    chunks.push(chunk);
  }
  return Buffer.concat(chunks);
}

/** HTTP handler for the private runner API. `token` is the shared secret read from the mounted file. */
export function createApi({ runs, readiness, policy, token }) {
  const send = (res, status, body, headers = {}) => {
    const payload = Buffer.isBuffer(body) ? body : Buffer.from(JSON.stringify(body));
    res.writeHead(status, { 'content-type': Buffer.isBuffer(body) ? 'application/octet-stream' : 'application/json', ...headers }).end(payload);
  };

  const handlers = {
    create: async (req) => runs.create(JSON.parse((await readBody(req, JSON_LIMIT)).toString() || '{}')),
    status: async (_req, id) => runs.status(id),
    destroy: async (_req, id) => runs.destroy(id),
    renew: async (_req, id) => runs.renew(id),
    exec: async (req, id) => runs.exec(id, JSON.parse((await readBody(req, JSON_LIMIT)).toString() || '{}')),
    upload: async (req, id) => runs.upload(id, await readBody(req, policy.archive.max_bytes)),
    download: (_req, id, name) => runs.download(id, name),
  };

  return async function handle(req, res) {
    const path = (req.url || '').split('?')[0];
    if (req.method === 'GET' && path === '/healthz') {
      const status = readiness.status();
      const health = runs.health();
      const ready = status.ready && health.healthy;
      return send(res, ready ? 200 : 503, { ...status, ready, protocol: PROTOCOL, ...(health.healthy ? {} : { code: 'runner_unhealthy' }), policy_hash: policy.hash });
    }
    const route = ROUTES.map(([method, pattern, name]) => (req.method === method ? [pattern.exec(path), name] : [null])).find(([m]) => m);
    if (!route) return send(res, 404, { error: 'not_found' });
    const phase = route[1];
    try {
      if (!sameToken(String(req.headers.authorization || ''), `Bearer ${token}`)) throw new RunnerError(401, 'unauthorized', phase);
      if (req.headers['x-sandbox-protocol'] !== String(PROTOCOL)) throw new RunnerError(426, 'protocol_mismatch', phase);
      const [match] = route;
      const result = await handlers[phase](req, decodeURIComponent(match[1] ?? ''), match[2]);
      if (phase === 'download') return send(res, 200, result.bytes, { 'x-sha256': result.sha256 });
      return send(res, 200, result);
    } catch (error) {
      if (error instanceof SyntaxError) return send(res, 400, { error: 'invalid_request', phase });
      if (error instanceof RunnerError) {
        const runId = /^\/v1\/runs\/([\w-]+)/.exec(path)?.[1];
        return send(res, error.status, { error: error.code, phase: error.phase, ...(runId ? { run_id: runId } : {}) });
      }
      return send(res, 500, { error: 'internal', phase });
    }
  };
}
