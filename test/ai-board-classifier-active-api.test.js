// Danger classifier end to end: real classifyRequest + intake route + PostgreSQL, fake model transport only.
// Config ships danger 'active' (escalate-only, reject_min null) and clarity 'shadow'; a model failure must
// leave the request exactly as before activation.
import test from 'node:test';
import assert from 'node:assert/strict';
import http from 'node:http';
import express from 'express';

import { createAsyncAiBoardStore } from '../server/ai-board/store-async.js';
import { openBoard } from './support/ai-board-db.js';
import { attachAiBoardRequestRoutes } from '../server/ai-board/routes.js';
import { CLASSIFIER, classifyRequest } from '../server/ai-board/classifier.js';

const ENV = { OLLAMA_URL: 'http://model.invalid', AI_BOARD_CLASSIFIER_MODEL: 'fake-model' };
const DANGER_QUESTION = CLASSIFIER.tasks.danger.question;
const RISKY = [['B', -0.05], ['A', -3.2], ['C', -6], ['D', -7], ['E', -7.5], ['F', -8], ['G', -9], ['H', -9.5]];
const BENIGN = [['A', -0.05], ['B', -3.2], ['C', -6], ['D', -7], ['E', -7.5], ['F', -8], ['G', -9], ['H', -9.5]];
const CLARITY = [['A', -0.05], ['B', -4], ['C', -5]];

// Ollama /api/generate body: first token + its top alternatives.
const reply = (top) => ({
  response: top[0][0],
  logprobs: [{ token: top[0][0], logprob: top[0][1], top_logprobs: top.map(([token, logprob]) => ({ token, logprob })) }],
});
const ok = (body) => new Response(JSON.stringify(body), { status: 200, headers: { 'content-type': 'application/json' } });

// Routes the danger task to `dangerTop` and the clarity task to `CLARITY`; the model is the only fake part.
function fakeFetch(calls, dangerTop = RISKY) {
  return async (_url, init) => {
    const { prompt } = JSON.parse(init.body);
    const danger = prompt.includes(DANGER_QUESTION);
    calls.push(danger ? 'danger' : 'clarity');
    return ok(reply(danger ? dangerTop : CLARITY));
  };
}

const USER = { id: 1, username: 'lan', display_name: 'Lan', role: 'student', enrolled_domain: 'pharmacy' };
const REQUEST = { title: 'Đổi màu nút Gửi', detail: 'trang giới thiệu, nút xanh hơn' };

async function serve(db, { modes, fetchImpl, classifier = null } = {}) {
  const app = express();
  app.use(express.json());
  app.use((req, _res, next) => { req.user = USER; next(); });
  const pass = (_req, _res, next) => next();
  attachAiBoardRequestRoutes(app, {
    store: createAsyncAiBoardStore(db.d), db: db.d,
    classifyRequest: classifier ?? ((title, detail) => classifyRequest(title, detail, { env: ENV, fetchImpl, modes })),
    requireAuth: pass, requireEnrolled: pass, requireAdmin: pass, requireStrictCsrf: pass,
  });
  const server = http.createServer(app);
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  const post = (key) => fetch(`http://127.0.0.1:${server.address().port}/api/requests`, {
    method: 'POST',
    headers: { 'content-type': 'application/json', 'idempotency-key': key, 'x-ai-board-features': 'onboarding,clarify' },
    body: JSON.stringify(REQUEST),
  }).then(async (res) => ({ status: res.status, json: await res.json() }));
  return { post, close: () => new Promise((resolve) => server.close(resolve)) };
}

const tags = async (db) => (await db.prepare('SELECT tag FROM ai_ticket_tags ORDER BY tag').all()).map((r) => r.tag);
const trace = async (db) => (await db.prepare("SELECT internal_detail FROM ai_events WHERE event_type='request_classified'").all())
  .map((r) => JSON.parse(r.internal_detail));

test('danger ships active escalate-only: a risky request lands on human_review, never rejected', async () => {
  const db = await openBoard({ users: [[1, 'lan', 'Lan', 'student', 'pharmacy']] });
  const calls = [];
  const app = await serve(db, { fetchImpl: fakeFetch(calls) });
  try {
    assert.equal(CLASSIFIER.tasks.danger.mode, 'active');
    assert.equal(CLASSIFIER.tasks.danger.scoring.reject_min, null);
    assert.equal(CLASSIFIER.tasks.clarity.mode, 'shadow');
    const res = await app.post('active-api-001');
    assert.equal(res.status, 200);
    assert.equal(res.json.ok, true);
    assert.deepEqual(calls, ['clarity', 'danger']);
    const [event] = await trace(db);
    assert.equal(event.danger.shadow, false);
    assert.equal(event.danger.escalate, true);
    assert.equal(event.danger.reject, false);
    assert.equal(event.danger.coverage.status, 'complete');
    assert.ok(event.danger.score > CLASSIFIER.tasks.danger.scoring.review_min);
    assert.deepEqual(event.danger.labels, ['system_attack']);
    assert.deepEqual((await tags(db)).filter((tag) => tag.startsWith('guard:')), ['guard:human_review', 'guard:model_system_attack']);
  } finally {
    await app.close();
  }
});

test('active danger leaves a benign request alone; clarity stays log-only', async () => {
  const db = await openBoard({ users: [[1, 'lan', 'Lan', 'student', 'pharmacy']] });
  const app = await serve(db, { fetchImpl: fakeFetch([], BENIGN) });
  try {
    const res = await app.post('active-api-002');
    assert.equal(res.status, 200);
    const [event] = await trace(db);
    assert.equal(event.danger.escalate, false);
    assert.equal(event.danger.reject, false);
    assert.equal(event.danger.labels.length, 0);
    assert.ok(event.danger.score < CLASSIFIER.tasks.danger.scoring.review_min);
    assert.equal(event.clarity.shadow, true); // clarity decisions are still only logged
    assert.ok(!(await tags(db)).some((tag) => tag.startsWith('guard:')));
  } finally {
    await app.close();
  }
});

test('active danger is fail-open: outage, unparsable logprobs and a missing model change nothing', async () => {
  const cases = [
    ['outage', { fetchImpl: async () => { throw new Error('connect ECONNREFUSED'); } }, 'call_failure'],
    ['parser', { fetchImpl: async () => ok(reply([['not-a-label', 0]])) }, 'parser_failure'],
    ['unconfigured', { classifier: async () => null }, null],
  ];
  for (const [name, options, status] of cases) {
    const db = await openBoard({ users: [[1, 'lan', 'Lan', 'student', 'pharmacy']] });
    const app = await serve(db, options);
    try {
      const res = await app.post(`active-api-${name}`);
      assert.equal(res.status, 200, name);
      assert.equal(res.json.ok, true, name);
      assert.equal((await db.prepare('SELECT COUNT(*) AS n FROM ai_tickets').get()).n, 1, name);
      assert.ok(!(await tags(db)).some((tag) => tag.startsWith('guard:')), name);
      const events = await trace(db);
      assert.equal(events.length, status ? 1 : 0, name);
      if (status) {
        assert.equal(events[0].danger ?? null, null, name);
        assert.equal(events[0].failures.danger.status, status, name);
      }
    } finally {
      await app.close();
    }
  }
});

test('shadow override still only logs a high score; it never reviews, rejects or tags', async () => {
  const db = await openBoard({ users: [[1, 'lan', 'Lan', 'student', 'pharmacy']] });
  const app = await serve(db, { fetchImpl: fakeFetch([]), modes: { danger: 'shadow', clarity: 'off' } });
  try {
    const res = await app.post('active-api-002-shadow');
    assert.equal(res.status, 200);
    const [event] = await trace(db);
    assert.equal(event.danger.shadow, true);
    assert.equal(event.danger.escalate, true);
    assert.equal(event.danger.reject, false);
    assert.ok(!(await tags(db)).some((tag) => tag.startsWith('guard:')));
  } finally {
    await app.close();
  }
});

test('shadow stays non-enforcing even if reject_min is set; active rejects only when it is set', async () => {
  const scoring = CLASSIFIER.tasks.danger.scoring;
  const original = scoring.reject_min;
  scoring.reject_min = 0.7;
  const db = await openBoard({ users: [[1, 'lan', 'Lan', 'student', 'pharmacy']] });
  try {
    const shadow = await serve(db, { fetchImpl: fakeFetch([]), modes: { danger: 'shadow', clarity: 'off' } });
    try {
      assert.equal((await shadow.post('active-api-003')).status, 200);
      assert.equal((await trace(db))[0].danger.reject, true);
      assert.ok(!(await tags(db)).some((tag) => tag.startsWith('guard:')));
    } finally {
      await shadow.close();
    }
    const active = await serve(db, { fetchImpl: fakeFetch([]), modes: { danger: 'active', clarity: 'off' } });
    try {
      const res = await active.post('active-api-004');
      assert.equal(res.status, 422);
      assert.equal(res.json.error, 'request_rejected');
    } finally {
      await active.close();
    }
    scoring.reject_min = null;
    const review = await serve(db, { fetchImpl: fakeFetch([]), modes: { danger: 'active', clarity: 'off' } });
    try {
      assert.equal((await review.post('active-api-005')).status, 200);
      assert.deepEqual((await tags(db)).filter((tag) => tag.startsWith('guard:')), ['guard:human_review', 'guard:model_system_attack']);
    } finally {
      await review.close();
    }
  } finally {
    scoring.reject_min = original;
  }
});
