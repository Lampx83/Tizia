// LF/109 slice 3: web signs the caller identity when proxying AI board calls; worker paths stay direct.
import test from 'node:test';
import assert from 'node:assert/strict';
import http from 'node:http';
import express from 'express';

import { attachAiBoardProxy } from '../server/ai-board/web-proxy.js';
import { verifyInternalHeaders } from '../server/ai-board/internal-auth.js';

const SECRET = 'web-proxy-secret-32chars-0000000';

async function upstream() {
  const seen = [];
  const server = http.createServer((req, res) => {
    seen.push({ url: req.url, headers: req.headers, body: '' });
    let body = '';
    req.on('data', (chunk) => { body += chunk; });
    req.on('end', () => { seen.at(-1).body = body; res.writeHead(200, { 'content-type': 'application/json' }); res.end(JSON.stringify({ ok: true })); });
  });
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  return { seen, base: `http://127.0.0.1:${server.address().port}`, close: () => new Promise((r) => server.close(r)) };
}

function web(upstreamBase) {
  const app = express();
  app.use((req, _res, next) => { req.user = { id: 5, role: 'pupil', display_name: 'Lan', enrolled_domain: 'primary' }; next(); });
  attachAiBoardProxy(app, { target: upstreamBase, secret: SECRET });
  app.post('/api/ai-board/worker/claim', (_req, res) => res.json({ direct: true }));
  app.get('/api/unrelated', (_req, res) => res.json({ direct: true }));
  return app;
}

async function serve(app) {
  const server = http.createServer(app);
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  return { base: `http://127.0.0.1:${server.address().port}`, close: () => new Promise((r) => server.close(r)) };
}

test('proxied AI board calls carry a valid signed identity and the original body', async () => {
  const up = await upstream();
  const app = await serve(web(up.base));
  try {
    const reply = await fetch(`${app.base}/api/ai-board/inbox`, {
      method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ q: 1 }),
    });
    assert.equal(reply.status, 200);
    const call = up.seen.at(-1);
    assert.equal(call.url, '/api/ai-board/inbox');
    assert.equal(call.body, '{"q":1}');
    const verified = verifyInternalHeaders(call.headers, SECRET);
    assert.equal(verified.ok, true);
    assert.equal(verified.user.id, 5);
    assert.equal(verified.user.enrolled_domain, 'primary');
  } finally { await app.close(); await up.close(); }
});

test('worker and unrelated paths are not proxied; a guest is refused before the upstream', async () => {
  const up = await upstream();
  const app = express();
  attachAiBoardProxy(app, { target: up.base, secret: SECRET });
  app.post('/api/ai-board/worker/claim', (_req, res) => res.json({ direct: true }));
  const server = await serve(app);
  try {
    const worker = await fetch(`${server.base}/api/ai-board/worker/claim`, { method: 'POST' });
    assert.deepEqual(await worker.json(), { direct: true });
    const guest = await fetch(`${server.base}/api/ai-board/inbox`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: '{}' });
    assert.equal(guest.status, 401);
    assert.equal(up.seen.length, 0);
  } finally { await server.close(); await up.close(); }
});
