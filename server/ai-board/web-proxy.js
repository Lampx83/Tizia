// Web -> aiboard-server proxy (LF/109, LF/122): stream the call and sign the caller identity with the shared HMAC secret.
import http from 'node:http';
import { signInternalHeaders } from './internal-auth.js';

const PATHS = ['/api/ai-board', '/api/admin/ai-board', '/api/requests'];
// Worker endpoints keep the worker key and must talk to aiboard-server directly, never through a user session.
const PUBLIC_OR_WORKER = [/^\/api\/ai-board\/worker\//];
// Requester paths the board owns once the stacks split: the request row, its workflow actions and its thread/votes.
const BOARD_REQUESTER = [
  /^\/api\/requests\/?(\?.*)?$/,
  /^\/api\/requests\/\d+\/(progress|continue|cancel|retry|status|edit|thread|messages|vote)(\?.*)?$/,
];
// Attachments (files live on the web volume) and the AI-decision audit stay on the web.
const WEB_ONLY_REQUESTER = /^\/api\/requests\/(attachments|\d+\/decisions)(\?.*)?$/;

function requesterProxied(url) {
  if (!url.startsWith('/api/requests')) return true; // /api/ai-board and /api/admin/ai-board
  if (WEB_ONLY_REQUESTER.test(url)) return false;
  return BOARD_REQUESTER.some((pattern) => pattern.test(url));
}

export function attachAiBoardProxy(app, { target, secret, timeoutMs = 30_000 }) {
  if (!target || !secret) throw new Error('AI_BOARD_SERVER_URL and AI_BOARD_INTERNAL_SECRET are required for the proxy');
  const upstream = new URL(target);
  app.use(PATHS, (req, res, next) => {
    if (PUBLIC_OR_WORKER.some((pattern) => pattern.test(req.originalUrl))) return next();
    if (!requesterProxied(req.originalUrl)) return next();
    if (!req.user || !req.user.id) return res.status(401).json({ error: 'unauthorized' });
    const headers = { ...req.headers, host: upstream.host, 'content-type': req.headers['content-type'] || 'application/json',
      ...signInternalHeaders({ ...req.user, domain: req.user.enrolled_domain }, secret) };
    const proxied = http.request({ host: upstream.hostname, port: upstream.port || 80, method: req.method,
      path: req.originalUrl, headers }, (reply) => {
      res.writeHead(reply.statusCode || 502, reply.headers);
      reply.pipe(res);
    });
    proxied.setTimeout(timeoutMs, () => proxied.destroy(new Error('aiboard timeout')));
    proxied.on('error', (error) => {
      if (res.headersSent) return res.destroy();
      res.status(502).json({ error: 'aiboard_unavailable', message: 'Ban điều hành tạm không phản hồi, thử lại sau.' });
    });
    req.pipe(proxied);
  });
}
