import { PreviewError } from '../services/previews.js';

/** Serving API issues tickets only after its existing session and strict CSRF gates. */
export function attachPreviewRoutes(router, { previews, requireAuth, requireStrictCsrf }) {
  const handle = (fn) => async (req, res, next) => {
    res.setHeader('Cache-Control', 'no-store');
    try { res.json(await fn(req)); } catch (error) {
      if (error instanceof PreviewError) return res.status(error.status).json({ error: error.code });
      next(error);
    }
  };
  router.get('/api/requests/:id/preview', requireAuth,
    handle(async (req) => ({ preview: await previews.latest(Number(req.params.id), req.user) })));
  router.get('/api/requests/:id/runs/:runId/preview', requireAuth,
    handle((req) => previews.metadata(Number(req.params.id), Number(req.params.runId), req.user)));
  router.post('/api/requests/:id/runs/:runId/preview/open', requireAuth, requireStrictCsrf,
    handle((req) => previews.ticket(Number(req.params.id), Number(req.params.runId), req.user, req.get('Origin'))));
}

/** This listener is mounted on a dedicated preview domain, never on the serving app/router. */
export function previewGateway(previews) {
  return async (req, res) => {
    const fail = (status, code) => { res.writeHead(status, { 'Content-Type': 'application/json' }); res.end(JSON.stringify({ error: code })); };
    res.setHeader('Cache-Control', 'no-store');
    res.setHeader('Referrer-Policy', 'no-referrer');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
    res.setHeader('Content-Security-Policy', "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; connect-src 'self'; form-action 'self'; frame-ancestors 'none'; base-uri 'self'; object-src 'none'");
    try {
      const match = /^p([a-f0-9]{48})\./.exec(req.headers.host || '');
      if (!match) throw new PreviewError(404, 'preview_not_found');
      const id = match[1];
      const origin = previews.originFor(id);
      if (req.headers.host !== new URL(origin).host) throw new PreviewError(404, 'preview_not_found');
      if (!req.url.startsWith('/') || req.url.startsWith('//') || /[\\\x00-\x20\x7f#]/.test(req.url)) throw new PreviewError(400, 'invalid_path');
      const url = new URL(req.url, origin);
      if (url.pathname === '/__preview_boot') {
        if (req.method !== 'GET' || req.headers.origin && req.headers.origin !== previews.servingOrigin
            || ['same-origin', 'same-site'].includes(req.headers['sec-fetch-site'])) throw new PreviewError(403, 'invalid_origin');
        const grant = await previews.boot(id, url.searchParams.get('ticket'));
        const secure = origin.startsWith('https:') ? '; Secure' : '';
        // Lax permits the owner’s cross-site boot redirect; writes still require exact preview Origin.
        res.setHeader('Set-Cookie', `preview_access=${grant.token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${Math.max(0, Math.floor((grant.expires_at - Date.now()) / 1000))}${secure}`);
        const entry=grant.entry_path||'/';
        if(!/^(?:\/|\/(?:[A-Za-z0-9_-]+\/)*[A-Za-z0-9_-]+\.html)$/.test(entry)) throw new PreviewError(502,'preview_redirect_blocked');
        res.writeHead(303, { Location: entry }); return res.end();
      }
      if (!['GET', 'HEAD'].includes(req.method) && req.headers.origin !== origin) throw new PreviewError(403, 'invalid_origin');
      if (req.headers.origin && req.headers.origin !== origin) throw new PreviewError(403, 'invalid_origin');
      const tokens = String(req.headers.cookie || '').split(';').map((c) => c.trim()).filter((c) => c.startsWith('preview_access='));
      if (tokens.length !== 1) throw new PreviewError(404, 'preview_not_found');
      const chunks = []; let bytes = 0;
      for await (const chunk of req) {
        bytes += chunk.length;
        if (bytes > 32 * 1024) throw new PreviewError(413, 'preview_body_too_large');
        chunks.push(chunk);
      }
      const headers = {};
      for (const name of ['accept', 'content-type', 'x-csrf-token']) if (typeof req.headers[name] === 'string') headers[name] = req.headers[name];
      const reply = await previews.http(id, tokens[0].slice('preview_access='.length),
        { method: req.method, path: req.url, headers, body: Buffer.concat(chunks).toString('base64') });
      if (!Number.isInteger(reply.status) || reply.status < 200 || reply.status > 599) throw new PreviewError(502, 'preview_unavailable');
      for (const [name, value] of reply.headers) {
        if (name === 'location') {
          const landed = new URL(value, origin);
          if (landed.origin !== origin || landed.pathname === '/__preview_boot') throw new PreviewError(502, 'preview_redirect_blocked');
          res.setHeader('Location', landed.pathname + landed.search + landed.hash);
        } else if (name === 'content-type') res.setHeader(name, value);
      }
      res.writeHead(reply.status); res.end(Buffer.from(reply.body, 'base64'));
    } catch (error) { fail(error instanceof PreviewError ? error.status : 503, error instanceof PreviewError ? error.code : 'preview_unavailable'); }
  };
}
