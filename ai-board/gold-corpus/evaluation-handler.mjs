/** Mount only inside an operator-protected HTTP service; this does not provision isolation. */
import { createHash, timingSafeEqual } from 'node:crypto';
import { runTrustedEvaluation } from './trusted-runtime.mjs';

const FAILURE = 'Trusted evaluation refused or interrupted; no aggregate released';
const hash = value => createHash('sha256').update(value).digest();

export function createEvaluationHandler(config) {
  let pinned, credential;
  try {
    const { token, ...options } = config;
    if (typeof token !== 'string' || token.length < 32 || token.length > 256) throw new Error();
    credential = hash(`Bearer ${token}`);
    pinned = structuredClone(options);
  } catch { throw new Error(FAILURE); }
  return async (request, response) => {
    const send = (status, body) => {
      response.writeHead(status, { 'content-type': 'application/json', 'cache-control': 'no-store', connection: 'close' });
      response.end(JSON.stringify(body));
    };
    try {
      const authorization = request.headers.authorization;
      if (typeof authorization !== 'string' || authorization.length > 1024
        || !timingSafeEqual(hash(authorization), credential)) return send(401, { error: FAILURE });
      // No caller-selected corpus, candidate, origin, ledger, budgets or reset controls.
      if (request.method !== 'POST' || request.url !== '/evaluate'
        || request.headers['transfer-encoding'] !== undefined
        || (request.headers['content-length'] !== undefined && request.headers['content-length'] !== '0')) {
        return send(400, { error: FAILURE });
      }
      send(200, await runTrustedEvaluation(pinned));
    } catch {
      if (!response.headersSent) send(503, { error: FAILURE });
      else response.destroy();
    }
  };
}
