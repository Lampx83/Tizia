// Span ingest (worker, lease-bound, content keys refused) and the admin request trace carrying spans per run.
import test from 'node:test';
import assert from 'node:assert/strict';
import http from 'node:http';
import express from 'express';

import { createAsyncAiBoardStore } from '../server/ai-board/store-async.js';
import { openBoard } from './support/ai-board-db.js';
import { attachAiBoardRequestRoutes, attachAiBoardWorkerRoutes } from '../server/ai-board/routes.js';

const KEY = 'fixture-worker-key-32-characters-long';
const ADMIN = { id: 9, username: 'admin', display_name: 'Admin', role: 'admin', enrolled_domain: null };
const TRACE = 'a'.repeat(32);
const RUN_SPAN = '1'.repeat(16), GATE_SPAN = '2'.repeat(16), CHAT_SPAN = '3'.repeat(16), TOOL_SPAN = '4'.repeat(16);

async function setup() {
  const db = await openBoard({ users: [[1, 'lan', 'Lan', 'student', 'pharmacy'], [9, 'admin', 'Admin', 'admin', null]] });
  const store = createAsyncAiBoardStore(db.d);
  const request = await store.createRequestWithRoot({ ownerUserId: 1, ownerDomain: 'pharmacy', ownerDisplayName: 'Lan',
    idempotencyKey: 'span-request-001', title: 'Thêm bộ thẻ thuốc', detail: 'fixture' });
  const ticket = await store.claimNext({ workerId: 'span-worker', version: 'test', mode: 'shadow', intent: 'plan' });
  const lease = { worker_id: 'span-worker', lease_token: ticket.lease_token };
  const run = await store.createRun(ticket.id, { workerId: 'span-worker', leaseToken: ticket.lease_token, trigger: 'plan', idempotencyKey: 'span-run-001' });
  const app = express();
  app.use(express.json());
  app.use((req, _res, next) => { req.user = req.headers['x-test-user'] === '9' ? ADMIN : null; next(); });
  const pass = (_req, _res, next) => next();
  attachAiBoardRequestRoutes(app, { store, requireAuth: (req, res, next) => req.user ? next() : res.status(401).end(),
    requireEnrolled: pass, requireAdmin: pass, requireStrictCsrf: pass });
  attachAiBoardWorkerRoutes(app, { store, env: { AI_BOARD_WORKER_KEY: KEY }, leaseMs: 120_000 });
  const server = http.createServer(app);
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  const base = `http://127.0.0.1:${server.address().port}`;
  const post = async (body) => {
    const r = await fetch(`${base}/api/ai-board/worker/tickets/${ticket.id}/spans`, { method: 'POST',
      headers: { 'content-type': 'application/json', 'x-ai-worker-key': KEY }, body: JSON.stringify({ ...lease, run_id: run.id, ...body }) });
    return { status: r.status, body: await r.json() };
  };
  const trace = async () => (await fetch(`${base}/api/admin/ai-board/requests/${request.request_id ?? request.id}/trace`, { headers: { 'x-test-user': '9' } })).json();
  return { db, post, trace, run, close: () => new Promise((resolve) => server.close(resolve)) };
}

const span = (span_id, parent, name, over = {}) => ({ trace_id: TRACE, span_id, parent_span_id: parent, name, kind: 'internal',
  start_ms: 1_790_000_000_000, end_ms: 1_790_000_001_000, status: 'ok', attributes: {}, events: [], ...over });

test('worker spans land once per span id and the admin trace returns them per run in start order', async () => {
  const t = await setup();
  try {
    const spans = [
      span(CHAT_SPAN, GATE_SPAN, 'chat qwen3.5', { kind: 'client', start_ms: 1_790_000_000_200, attributes: {
        'gen_ai.operation.name': 'chat', 'gen_ai.provider.name': 'vllm', 'gen_ai.request.model': 'qwen3.5',
        'gen_ai.usage.input_tokens': 1200, 'gen_ai.usage.output_tokens': 80, 'gen_ai.response.finish_reasons': ['stop'], 'tizia.thinking': false } }),
      span(TOOL_SPAN, GATE_SPAN, 'execute_tool grep', { start_ms: 1_790_000_000_500, attributes: { 'gen_ai.tool.name': 'grep', 'tizia.step': 0 } }),
      span(GATE_SPAN, RUN_SPAN, 'invoke_agent gate 3', { start_ms: 1_790_000_000_100, attributes: { 'tizia.gate.id': 3, 'tizia.gate.status': 'passed' } }),
      span(RUN_SPAN, null, 'invoke_agent ai-board', { attributes: { 'gen_ai.operation.name': 'invoke_agent', 'gen_ai.agent.name': 'ai-board' } }),
    ];
    assert.deepEqual((await t.post({ spans })).body, { stored: 4, duplicates: 0 });
    assert.deepEqual((await t.post({ spans: spans.slice(0, 1) })).body, { stored: 0, duplicates: 1 });

    const body = await t.trace();
    const got = body.runs.find((r) => r.id === t.run.id).spans;
    assert.deepEqual(got.map((s) => s.name), ['invoke_agent ai-board', 'invoke_agent gate 3', 'chat qwen3.5', 'execute_tool grep']);
    const chat = got[2];
    assert.equal(chat.parent_span_id, GATE_SPAN);
    assert.equal(chat.attributes['gen_ai.usage.input_tokens'], 1200);
    assert.deepEqual(chat.attributes['gen_ai.response.finish_reasons'], ['stop']);
    assert.equal(chat.end_ms, 1_790_000_001_000);
  } finally { await t.close(); }
});

test('content keys, foreign prefixes, another trace id and a stale lease are refused', async () => {
  const t = await setup();
  try {
    let r = await t.post({ spans: [span(CHAT_SPAN, null, 'chat x', { attributes: { 'gen_ai.input.messages': 'hi' } })] });
    assert.equal(r.status, 400);
    assert.equal(r.body.error, 'span_content_refused');
    r = await t.post({ spans: [span(CHAT_SPAN, null, 'chat x', { attributes: { 'tizia.prompt': 'hi' } })] });
    assert.equal(r.body.error, 'span_content_refused');
    r = await t.post({ spans: [span(CHAT_SPAN, null, 'chat x', { attributes: { prompt: 'hi' } })] });
    assert.equal(r.status, 400);
    assert.equal((await t.post({ spans: [span(RUN_SPAN, null, 'run')] })).status, 200);
    r = await t.post({ spans: [span(GATE_SPAN, null, 'gate', { trace_id: 'b'.repeat(32) })] });
    assert.equal(r.status, 409);
    r = await t.post({ lease_token: 'stale', spans: [span(GATE_SPAN, null, 'gate')] });
    assert.equal(r.status, 409);
    assert.equal(Number((await t.db.d.get('SELECT COUNT(*) AS n FROM ai_spans')).n), 1);
  } finally { await t.close(); }
});
