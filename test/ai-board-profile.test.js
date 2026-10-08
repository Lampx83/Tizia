// 3-question onboarding before the first request (admin exempt), stored per user, sent to the worker.
import test from 'node:test';
import assert from 'node:assert/strict';
import http from 'node:http';
import express from 'express';

import { createAsyncAiBoardStore } from '../server/ai-board/store-async.js';
import { openBoard } from './support/ai-board-db.js';
import { attachAiBoardRequestRoutes } from '../server/ai-board/routes.js';
import { attachAiBoardIntake, createAsyncProfileStore } from '../server/contexts/ai-board-intake/index.js';

async function fixtureDb() {
  const db = await openBoard({ users: [
    [1, 'lan', 'Lan', 'student', 'pharmacy'],
    [2, 'thu', 'Thu', 'teacher', 'pharmacy'],
    [9, 'admin', 'Admin', 'admin', null],
  ] });
  return db;
}

async function serve(db, userId) {
  const users = { 1: 'student', 2: 'teacher', 9: 'admin' };
  const app = express();
  app.use(express.json());
  app.use((req, _res, next) => {
    req.user = { id: userId, username: `u${userId}`, display_name: `U${userId}`, role: users[userId],
      enrolled_domain: 'pharmacy' };
    next();
  });
  const pass = (_req, _res, next) => next();
  const profiles = createAsyncProfileStore(db.d);
  attachAiBoardIntake(app, { db: db.d, requireAuth: pass, requireStrictCsrf: pass });
  attachAiBoardRequestRoutes(app, {
    store: createAsyncAiBoardStore(db.d), db: db.d, classifyRequest: async () => null,
    needsProfile: (user) => profiles.needed(user),
    requireAuth: pass, requireEnrolled: pass, requireAdmin: pass, requireStrictCsrf: pass,
  });
  const server = http.createServer(app);
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  const base = `http://127.0.0.1:${server.address().port}`;
  const call = (method, path, body, headers = {}) => fetch(base + path, {
    method, headers: { 'content-type': 'application/json', ...headers }, body: body && JSON.stringify(body),
  }).then(async (res) => ({ status: res.status, json: await res.json() }));
  return { call, close: () => new Promise((resolve) => server.close(resolve)) };
}

const ANSWERS = { role: 'student', domain_expertise: ['pharmacy', 'it'], tech_level: 'some' };

test('a new non-admin user must answer before the first request; the answer sticks across devices', async () => {
  const db = await fixtureDb();
  const app = await serve(db, 1);
  try {
    assert.deepEqual((await app.call('GET', '/api/ai-board/profile')).json, { needed: true, profile: null });
    const refused = await app.call('POST', '/api/requests', { title: 'Đổi màu nút', detail: 'x' },
      { 'idempotency-key': 'profile-req-001', 'x-ai-board-features': 'onboarding,clarify' });
    assert.equal(refused.status, 428);
    assert.equal(refused.json.error, 'profile_required');
    const saved = await app.call('POST', '/api/ai-board/profile', ANSWERS);
    assert.equal(saved.status, 200);
    const again = await app.call('GET', '/api/ai-board/profile'); // another device: same account, no question
    assert.equal(again.json.needed, false);
    assert.deepEqual(again.json.profile.domain_expertise, ['pharmacy', 'it']);
    const sent = await app.call('POST', '/api/requests', { title: 'Đổi màu nút', detail: 'x' },
      { 'idempotency-key': 'profile-req-002', 'x-ai-board-features': 'onboarding,clarify' });
    assert.equal(sent.status, 200);
  } finally {
    await app.close();
  }
});

test('admin never sees onboarding; a teacher still answers', async () => {
  const db = await fixtureDb();
  const admin = await serve(db, 9);
  const teacher = await serve(db, 2);
  try {
    assert.equal((await admin.call('GET', '/api/ai-board/profile')).json.needed, false);
    assert.equal((await teacher.call('GET', '/api/ai-board/profile')).json.needed, true);
  } finally {
    await admin.close();
    await teacher.close();
  }
});

test('answers are validated against the chip sets', async () => {
  const db = await fixtureDb();
  const app = await serve(db, 1);
  try {
    for (const bad of [{ ...ANSWERS, role: 'hacker' }, { ...ANSWERS, tech_level: 'guru' },
      { ...ANSWERS, domain_expertise: [] }, { ...ANSWERS, domain_expertise: ['<script>'] },
      { ...ANSWERS, domain_expertise: Array.from({ length: 30 }, (_, i) => `d${i}`) }]) {
      assert.equal((await app.call('POST', '/api/ai-board/profile', bad)).status, 400, JSON.stringify(bad));
    }
  } finally {
    await app.close();
  }
});

test('the worker snapshot carries the requester tone inputs, not their identity', async () => {
  const db = await fixtureDb();
  await createAsyncProfileStore(db.d).save(1, ANSWERS);
  const store = createAsyncAiBoardStore(db.d);
  await store.createRequestWithRoot({ ownerUserId: 1, ownerDomain: 'pharmacy', ownerDisplayName: 'Lan',
    idempotencyKey: 'profile-req-003', title: 'Đổi màu nút', detail: 'x' });
  const ticket = await store.claimNext({ workerId: 'w1', version: 't', mode: 'shadow', intent: 'precheck' });
  const snapshot = await store.getLeasedSnapshot(ticket.id, 'w1', ticket.lease_token);
  assert.deepEqual(snapshot.requester_profile, { role: 'student', tech_level: 'some', domain_expertise: ['pharmacy', 'it'] });
});

test('a client without the onboarding UI (prod web-next FAB) is not blocked by the unanswered profile', async () => {
  const db = await fixtureDb();
  const app = await serve(db, 1);
  try {
    const legacy = await app.call('POST', '/api/requests', { title: 'Đổi màu nút', detail: 'x' },
      { 'idempotency-key': 'profile-req-004' });
    assert.equal(legacy.status, 200);
  } finally {
    await app.close();
  }
});
