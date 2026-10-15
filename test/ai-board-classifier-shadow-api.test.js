// SHADOW danger classifier end to end: real classifyRequest + intake route + PostgreSQL, fake model transport only.
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

// Ollama /api/generate body: letter B (system_attack) dominates the danger task; clarity answers A (clear).
function fakeFetch(calls) {
  return async (_url, init) => {
    const { prompt } = JSON.parse(init.body);
    const danger = prompt.includes(DANGER_QUESTION);
    calls.push(danger ? 'danger' : 'clarity');
    const top = danger
      ? [['B', -0.05], ['A', -3.2], ['C', -6], ['D', -7], ['E', -7.5], ['F', -8], ['G', -9], ['H', -9.5]]
      : [['A', -0.05], ['B', -4], ['C', -5]];
    const logprobs = [{ token: top[0][0], logprob: top[0][1], top_logprobs: top.map(([token, logprob]) => ({ token, logprob })) }];
    return new Response(JSON.stringify({ response: top[0][0], logprobs }), { status: 200, headers: { 'content-type': 'application/json' } });
  };
}

async function serve(db, modes, calls) {
  const app = express();
  app.use(express.json());
  app.use((req, _res, next) => {
    req.user = { id: 1, username: 'lan', display_name: 'Lan', role: 'student', enrolled_domain: 'pharmacy' };
    next();
  });
  const pass = (_req, _res, next) => next();
  attachAiBoardRequestRoutes(app, {
    store: createAsyncAiBoardStore(db.d), db: db.d,
    classifyRequest: (title, detail) => classifyRequest(title, detail, { env: ENV, fetchImpl: fakeFetch(calls), modes }),
    requireAuth: pass, requireEnrolled: pass, requireAdmin: pass, requireStrictCsrf: pass,
  });
  const server = http.createServer(app);
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  const post = (key) => fetch(`http://127.0.0.1:${server.address().port}/api/requests`, {
    method: 'POST', headers: { 'content-type': 'application/json', 'idempotency-key': key, 'x-ai-board-features': 'onboarding,clarify' },
    body: JSON.stringify({ title: 'Đổi màu nút Gửi', detail: 'trang giới thiệu, nút xanh hơn' }),
  }).then(async (res) => ({ status: res.status, json: await res.json() }));
  return { post, close: () => new Promise((resolve) => server.close(resolve)) };
}

const tags = async (db) => (await db.prepare('SELECT tag FROM ai_ticket_tags ORDER BY tag').all()).map((r) => r.tag);
const trace = async (db) => (await db.prepare("SELECT internal_detail FROM ai_events WHERE event_type='request_classified'").all()).map((r) => JSON.parse(r.internal_detail));

test('SHADOW danger: high stacker score is logged with shadow=true and never reviews, rejects or tags', async () => {
  const db = await openBoard({ users: [[1, 'lan', 'Lan', 'student', 'pharmacy']] });
  const calls = [];
  const app = await serve(db, undefined, calls);
  try {
    assert.equal(CLASSIFIER.tasks.danger.mode, 'shadow');
    assert.equal(CLASSIFIER.tasks.danger.scoring.reject_min, null);
    const res = await app.post('shadow-api-001');
    assert.equal(res.status, 200);
    assert.deepEqual(calls, ['clarity', 'danger']);
    const [event] = await trace(db);
    assert.equal(event.danger.shadow, true);
    assert.ok(event.danger.score > CLASSIFIER.tasks.danger.scoring.review_min);
    assert.equal(event.danger.escalate, true);
    assert.equal(event.danger.reject, false);
    assert.equal(event.danger.coverage.status, 'complete');
    assert.ok(!(await tags(db)).some((tag) => tag.startsWith('guard:')));
  } finally {
    await app.close();
  }
});

test('SHADOW danger stays non-enforcing even if reject_min is set; ACTIVE control reviews and rejects', async () => {
  const scoring = CLASSIFIER.tasks.danger.scoring;
  const original = scoring.reject_min;
  scoring.reject_min = 0.7;
  const db = await openBoard({ users: [[1, 'lan', 'Lan', 'student', 'pharmacy']] });
  try {
    const shadow = await serve(db, { danger: 'shadow', clarity: 'off' }, []);
    try {
      const res = await shadow.post('shadow-api-002');
      assert.equal(res.status, 200);
      assert.equal((await trace(db))[0].danger.reject, true);
      assert.ok(!(await tags(db)).some((tag) => tag.startsWith('guard:')));
    } finally {
      await shadow.close();
    }
    const active = await serve(db, { danger: 'active', clarity: 'off' }, []);
    try {
      const res = await active.post('shadow-api-003');
      assert.equal(res.status, 422);
      assert.equal(res.json.error, 'request_rejected');
    } finally {
      await active.close();
    }
    scoring.reject_min = null;
    const review = await serve(db, { danger: 'active', clarity: 'off' }, []);
    try {
      assert.equal((await review.post('shadow-api-004')).status, 200);
      assert.deepEqual((await tags(db)).filter((tag) => tag.startsWith('guard:')), ['guard:human_review', 'guard:model_system_attack']);
    } finally {
      await review.close();
    }
  } finally {
    scoring.reject_min = original;
  }
});
