// LF/109 slice 3: web signs the caller identity when proxying AI board calls; worker paths stay direct.
import test from 'node:test';
import assert from 'node:assert/strict';
import http from 'node:http';
import express from 'express';

import { attachAiBoardProxy } from '../server/ai-board/web-proxy.js';
import { HEADERS, verifyInternalHeaders } from '../server/ai-board/internal-auth.js';

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

test('requester paths and attachments go to the board, including the decision audit', async () => {
  const up = await upstream();
  const app = express();
  app.use((req, _res, next) => { req.user = { id: 5, role: 'pupil', display_name: 'Lan', enrolled_domain: 'primary' }; next(); });
  attachAiBoardProxy(app, { target: up.base, secret: SECRET });
  app.use(express.json());
  app.post('/api/requests', (req, res) => res.json({ local: true, body: req.body }));
  app.get('/api/requests/:id/progress', (_req, res) => res.json({ local: true }));
  app.post('/api/requests/:id/thread', (_req, res) => res.json({ local: true }));
  app.post('/api/requests/attachments', (_req, res) => res.json({ local: true }));
  const server = await serve(app);
  try {
    for (const [method, url] of [['POST', '/api/requests'], ['GET', '/api/requests'],
      ['GET', '/api/requests/7/progress'], ['POST', '/api/requests/7/continue'],
      ['POST', '/api/requests/7/cancel'], ['POST', '/api/requests/7/retry'],
      ['GET', '/api/requests/7/thread'], ['POST', '/api/requests/7/messages'], ['POST', '/api/requests/7/vote'],
      ['POST', '/api/requests/7/edit'], ['POST', '/api/requests/attachments'],
      ['GET', '/api/requests/7/decisions'], ['GET', '/api/ai-decisions']]) {
      const reply = await fetch(`${server.base}${url}`, { method, headers: { 'content-type': 'application/json' }, body: method === 'GET' ? undefined : '{"body":"x"}' });
      assert.equal(reply.status, 200, `${method} ${url}`);
      assert.deepEqual(await reply.json(), { ok: true }, `${method} ${url} must come from the board`);
    }
    assert.equal(up.seen.length, 13);
    assert.equal(verifyInternalHeaders(up.seen[0].headers, SECRET).user.id, 5);
  } finally { await server.close(); await up.close(); }
});

test('uploaded files are read through the proxy without a session, unsigned', async () => {
  const up = await upstream();
  const app = express();
  attachAiBoardProxy(app, { target: up.base, secret: SECRET });
  app.get('/uploads/requests/*', (_req, res) => res.json({ local: true }));
  const server = await serve(app);
  try {
    const reply = await fetch(`${server.base}/uploads/requests/2026-11-14/1-abc.png`);
    assert.deepEqual(await reply.json(), { ok: true });
    assert.equal(up.seen.length, 1);
    assert.equal(up.seen[0].url, '/uploads/requests/2026-11-14/1-abc.png');
    assert.equal(up.seen[0].headers[HEADERS.signature], undefined);
  } finally { await server.close(); await up.close(); }
});

test('board learns a strict CSRF pass only from the proxy check, never from the browser', async () => {
  const { csrf } = await import('../server/contexts/security/index.js');
  const up = await upstream();
  const app = web(up.base);
  app.use(csrf);
  app.get('/api/csrf', (req, res) => res.json({ token: req.csrfToken }));
  const server = await serve(app);
  const admin = (headers) => fetch(`${server.base}/api/admin/ai-board/plans/1/approve`, {
    method: 'POST', headers: { 'content-type': 'application/json', ...headers }, body: '{}' });
  try {
    const issued = await fetch(`${server.base}/api/csrf`);
    const { token } = await issued.json();
    const cookie = `tizia_csrf=${token}`;
    await admin({ [HEADERS.csrf]: '1' });
    assert.equal(up.seen.at(-1).headers[HEADERS.csrf], undefined);
    await admin({ cookie, 'x-csrf-token': `${token.split('.')[0]}.0000000000000000` });
    assert.equal(up.seen.at(-1).headers[HEADERS.csrf], undefined);
    await admin({ cookie, 'x-csrf-token': token });
    assert.equal(up.seen.at(-1).headers[HEADERS.csrf], '1');
  } finally { await server.close(); await up.close(); }
});
