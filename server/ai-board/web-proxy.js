// Web -> aiboard-server proxy: stream the call and sign the caller identity with the shared HMAC secret.
import http from 'node:http';
import { signInternalHeaders } from './internal-auth.js';

const PATHS = ['/api/ai-board', '/api/admin/ai-board', '/api/requests', '/uploads/requests'];
// Worker endpoints keep the worker key and must talk to aiboard-server directly, never through a user session.
const PUBLIC_OR_WORKER = [/^\/api\/ai-board\/worker\//];
// Requester paths the board owns: the request row, its workflow actions, thread/votes and attachments.
const BOARD_REQUESTER = [
  /^\/api\/requests\/?(\?.*)?$/,
  /^\/api\/requests\/attachments(\?.*)?$/,
  /^\/api\/requests\/\d+\/(progress|continue|cancel|retry|status|edit|thread|messages|vote)(\?.*)?$/,
];
// The AI-decision audit is still written on the web (admin reply, acknowledgements): it stays there.
const WEB_ONLY_REQUESTER = /^\/api\/requests\/\d+\/decisions(\?.*)?$/;
const UPLOADS = /^\/uploads\/requests\//;

function requesterProxied(url) {
  if (!url.startsWith('/api/requests')) return true; // /api/ai-board and /api/admin/ai-board
  if (WEB_ONLY_REQUESTER.test(url)) return false;
  return BOARD_REQUESTER.some((pattern) => pattern.test(url));
}

export function attachAiBoardProxy(app, { target, secret, timeoutMs = 30_000 }) {
  if (!target || !secret) throw new Error('AI_BOARD_SERVER_URL and AI_BOARD_INTERNAL_SECRET are required for the proxy');
  const upstream = new URL(target);
  const forward = (req, res, headers) => {
    const proxied = http.request({ host: upstream.hostname, port: upstream.port || 80, method: req.method,
      path: req.originalUrl, headers: { ...req.headers, host: upstream.host, 'content-type': req.headers['content-type'] || 'application/json', ...headers } }, (reply) => {
      res.writeHead(reply.statusCode || 502, reply.headers);
      reply.pipe(res);
    });
    proxied.setTimeout(timeoutMs, () => proxied.destroy(new Error('aiboard timeout')));
    proxied.on('error', () => {
      if (res.headersSent) return res.destroy();
      res.status(502).json({ error: 'aiboard_unavailable', message: 'Ban điều hành tạm không phản hồi, thử lại sau.' });
    });
    req.pipe(proxied);
  };
  app.use(PATHS, (req, res, next) => {
    if (PUBLIC_OR_WORKER.some((pattern) => pattern.test(req.originalUrl))) return next();
    // Public files: the board serves them with the same download-safe headers as the web did.
    if (UPLOADS.test(req.originalUrl)) return forward(req, res, {});
    if (!requesterProxied(req.originalUrl)) return next();
    if (!req.user || !req.user.id) return res.status(401).json({ error: 'unauthorized' });
    return forward(req, res, signInternalHeaders({ ...req.user, domain: req.user.enrolled_domain }, secret));
  });
}
