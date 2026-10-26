// LF/109 slice: signed identity between web and aiboard-server (ADR 0019).
import test from 'node:test';
import assert from 'node:assert/strict';
import express from 'express';
import http from 'node:http';

import { signInternalHeaders, verifyInternalHeaders, requireInternalUser } from '../server/ai-board/internal-auth.js';

const SECRET = 'internal-secret-for-tests-32chars';
const user = { id: 7, role: 'student', displayName: 'Lan' };

test('a signed identity verifies and round-trips the user', () => {
  const now = 1_700_000_000_000;
  const headers = signInternalHeaders(user, SECRET, now);
  assert.deepEqual(verifyInternalHeaders(headers, SECRET, now + 5_000),
    { ok: true, user: { id: 7, role: 'student', displayName: 'Lan' } });
});

test('tampering with role, user or signature is refused', () => {
  const now = 1_700_000_000_000;
  const headers = signInternalHeaders(user, SECRET, now);
  for (const bad of [{ 'x-ai-user-role': 'admin' }, { 'x-ai-user-id': '1' }, { 'x-ai-signature': 'f'.repeat(64) }]) {
    assert.equal(verifyInternalHeaders({ ...headers, ...bad }, SECRET, now).ok, false, JSON.stringify(bad));
  }
});

test('stale or future timestamps are refused (replay window)', () => {
  const now = 1_700_000_000_000;
  const headers = signInternalHeaders(user, SECRET, now);
  assert.equal(verifyInternalHeaders(headers, SECRET, now + 61_000).ok, false);
  assert.equal(verifyInternalHeaders(headers, SECRET, now - 61_000).ok, false);
  assert.equal(verifyInternalHeaders(headers, SECRET, now + 59_000).ok, true);
});

test('no secret or incomplete headers fail closed', () => {
  assert.equal(verifyInternalHeaders({}, '', 1).ok, false);
  assert.equal(verifyInternalHeaders({}, SECRET, 1).ok, false);
  assert.throws(() => signInternalHeaders(user, ''), /secret/);
  assert.throws(() => signInternalHeaders({}, SECRET), /user id/);
});

test('middleware attaches req.user or answers 401 without reasons', async () => {
  const app = express();
  app.get('/who', requireInternalUser(SECRET, { now: () => 1_700_000_000_000 }), (req, res) => res.json(req.user));
  const server = http.createServer(app);
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  const base = `http://127.0.0.1:${server.address().port}`;
  try {
    const good = await fetch(`${base}/who`, { headers: signInternalHeaders(user, SECRET, 1_700_000_000_000) });
    assert.equal(good.status, 200);
    assert.deepEqual(await good.json(), { id: 7, role: 'student', displayName: 'Lan' });
    const bad = await fetch(`${base}/who`);
    assert.equal(bad.status, 401);
    assert.deepEqual(await bad.json(), { error: 'unauthorized' });
  } finally {
    await new Promise((resolve) => server.close(resolve));
  }
});
