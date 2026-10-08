import test from 'node:test';
import assert from 'node:assert/strict';
import { createServer, request } from 'node:http';
import { mkdtempSync, readdirSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { corpus } from './development-proposals.mjs';
import { addReview } from './corpus.mjs';
import { makeSeal } from './operator-seal.mjs';
import { candidateIdentity } from './trusted-runtime.mjs';
import { createEvaluationHandler } from './evaluation-handler.mjs';

const token = 'TEST-only-public-credential-0123456789';
const failure = { error: 'Trusted evaluation refused or interrupted; no aggregate released' };
function fixture() {
  let c = structuredClone(corpus); c.version = 'TEST-handler'; c.cases = [c.cases[0]];
  const row = c.cases[0]; row.group = 'TEST-handler-family'; row.request = 'TEST-only HTTP handler request';
  for (const role of ['coding-agent', 'project-owner']) {
    c = addReview(c, row.id, { actor: `TEST-${role}`, role, at: '2026-10-07T00:00:00Z', source: 'TEST only synthetic approval',
      labels: { permission: 'allowed', content: 'benign' }, reasons: { permission: 'TEST grant', content: 'TEST benign' }, reason: 'TEST only' });
  }
  c.cases[0].split = 'test'; return c;
}
const listen = server => new Promise(resolve => server.listen(0, '127.0.0.1', () => resolve(`http://127.0.0.1:${server.address().port}`)));
const close = async server => { server.closeAllConnections(); await new Promise(resolve => server.close(resolve)); };
function call(origin, { method = 'POST', path = '/evaluate', authorization = `Bearer ${token}`, body, chunked = false } = {}) {
  return new Promise((resolve, reject) => {
    const headers = {}; if (authorization !== null) headers.authorization = authorization;
    if (body !== undefined) headers['content-length'] = Buffer.byteLength(body);
    if (chunked) headers['transfer-encoding'] = 'chunked';
    const req = request(`${origin}${path}`, { method, headers }, res => {
      const chunks = []; res.on('data', chunk => chunks.push(chunk));
      res.on('end', () => resolve({ status: res.statusCode, headers: res.headers, body: JSON.parse(Buffer.concat(chunks)) }));
    });
    req.on('error', reject); req.end(body);
  });
}

test('operator HTTP boundary pins inputs, authenticates callers and redacts failures (PUBLIC TEST only)', async t => {
  const dir = mkdtempSync(join(tmpdir(), 'guard-handler-test-'));
  const model = 'TEST-handler-model', modelDigest = 'e'.repeat(64);
  let modelRequests = 0, payload, mode = 'valid';
  const modelServer = createServer((req, res) => {
    modelRequests++; if (mode === 'hang') return;
    if (mode === 'http-error') { res.writeHead(500); res.end('TEST PRIVATE exception/config/path'); return; }
    if (req.url === '/api/tags') return res.end(JSON.stringify({ models: [{ name: model, digest: modelDigest }] }));
    const chunks = []; req.on('data', chunk => chunks.push(chunk)); req.on('end', () => {
      payload = JSON.parse(Buffer.concat(chunks));
      res.end(JSON.stringify({ model, done: true, message: { content: '{"permission":"allowed","content":"benign"}' } }));
    });
  });
  const endpoint = await listen(modelServer), c = fixture(), development = structuredClone(corpus);
  const options = { corpus: c, development, seal: makeSeal(c, development, 'TEST-operator'), endpoint, model, modelDigest, ledgerDirectory: dir, deadlineMs: 1000 };
  const server = createServer(createEvaluationHandler({ token, ...options }));
  const origin = await listen(server);
  try {
    await t.test('auth, method, route and body failures cause no spend or inference', async () => {
      for (const input of [{ authorization: null }, { authorization: 'Bearer TEST-wrong' }, { authorization: `Bearer ${token}x` }, { authorization: 'x'.repeat(1025) },
        { method: 'GET' }, { path: '/evaluate?reset=true' }, { path: '/other' },
        { body: JSON.stringify({ endpoint: 'TEST-other', maxCases: 1, corpus: 'TEST-override' }) }, { chunked: true }]) {
        const result = await call(origin, input);
        assert.ok([400, 401].includes(result.status)); assert.deepEqual(result.body, failure);
        assert.equal(result.headers['cache-control'], 'no-store');
      }
      assert.equal(modelRequests, 0); assert.deepEqual(readdirSync(dir), []);
    });
    await t.test('snapshot, credential omission, concurrency and one final release', async () => {
      options.corpus.cases[0].request = 'TEST caller mutation'; options.endpoint = 'TEST-invalid'; options.model = 'TEST-other';
      const results = await Promise.all([call(origin), call(origin)]);
      assert.deepEqual(results.map(row => row.status).sort(), [200, 503]);
      const result = results.find(row => row.status === 200);
      assert.equal(result.body.sample_count, 1); assert.equal(result.body.candidate_digest, candidateIdentity(model, modelDigest));
      assert.equal(JSON.parse(payload.messages[1].content).request, 'TEST-only HTTP handler request');
      assert.equal(JSON.stringify(payload).includes(token), false);
      assert.equal(JSON.stringify(result.body).includes('TEST-only'), false);
      const before = modelRequests; assert.deepEqual((await call(origin)).body, failure); assert.equal(modelRequests, before);
      const ledger = readFileSync(join(dir, readdirSync(dir)[0]), 'utf8');
      assert.equal(ledger.includes(token), false); assert.equal(ledger.includes('TEST-only HTTP'), false);
    });
    await t.test('bounded HTTP failure and invalid internal path/config release only generic errors', async () => {
      for (const kind of ['hang', 'http-error', 'invalid-path', 'invalid-budget']) {
        const ownDir = mkdtempSync(join(dir, 'failure-'));
        const config = { ...options, corpus: fixture(), endpoint, model, ledgerDirectory: kind === 'invalid-path' ? join(ownDir, 'TEST-INTERNAL-PRIVATE-PATH') : ownDir,
          deadlineMs: kind === 'hang' ? 100 : 1000, ...(kind === 'invalid-budget' ? { maxCases: 0 } : {}) };
        mode = kind;
        const failing = createServer(createEvaluationHandler({ token, ...config })), url = await listen(failing), before = modelRequests;
        try {
          const result = await call(url); assert.equal(result.status, 503); assert.deepEqual(result.body, failure);
          assert.equal(JSON.stringify(result.body).includes('TEST-INTERNAL'), false);
          if (kind === 'hang' || kind === 'http-error') { assert.ok(modelRequests > before); assert.equal(readdirSync(ownDir).length, 1); }
          else { assert.equal(modelRequests, before); assert.deepEqual(readdirSync(ownDir), []); }
        } finally { await close(failing); }
      }
    });
  } finally { await close(server); await close(modelServer); rmSync(dir, { recursive: true, force: true }); }
});

test('handler initialization redacts unreadable trusted configuration (PUBLIC TEST only)', () => {
  for (const input of [{ token: 'short' }, { token, get corpus() { throw new Error('TEST PRIVATE configuration path'); } }]) {
    assert.throws(() => createEvaluationHandler(input), error => error.message === failure.error);
  }
});
