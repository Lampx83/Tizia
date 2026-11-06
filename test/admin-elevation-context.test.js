// Elevation approval context: what the worker asks, whether the request justifies it, and the cached risk
// assessment. Runs on the throwaway PostgreSQL fixture (TEST_PG_URL); the model is always a fake.
import test from 'node:test';
import assert from 'node:assert/strict';
import http from 'node:http';
import express from 'express';
import { openBoard } from './support/ai-board-db.js';
import { createAsyncAiBoardStore } from '../server/ai-board/store-async.js';
import { attachAiBoardRequestRoutes } from '../server/ai-board/api/routes.js';
import { assessElevationRisk, applyRiskFloor, parseElevationRisk } from '../server/ai-board/services/elevation-risk.js';
import { buildElevationContext, namedInText, normalizePlanSummary } from '../server/ai-board/elevation-context.js';

const USERS = [[1, 'lan', 'Lan', 'student', 'pharmacy'], [9, 'admin', 'Admin', 'admin', null]];
const CONTENT = 'server/contexts/content/x.js';
const PAGE = 'public/gioi-thieu.html';

async function fixture() {
  const db = await openBoard({ users: USERS });
  return { db, store: createAsyncAiBoardStore(db.d) };
}

let serial = 0;
const newRequest = async (store, { title = 'Đổi dịch vụ nội dung', detail = 'Sửa nội dung trang giới thiệu.' } = {}) =>
  await store.createRequestWithRoot({
    ownerUserId: 1, ownerDomain: 'pharmacy', ownerDisplayName: 'Lan',
    idempotencyKey: `ctx-${++serial}-001`, title, detail,
  });

const PLAN = (paths, capability) => ({
  goal: 'Cập nhật nội dung dùng chung',
  steps: [{ order: 1, title: 'Sửa dịch vụ nội dung', capability, allowed_scope: paths }],
});

async function serve(store, { user = { id: 9, role: 'admin' }, assessElevation } = {}) {
  const app = express();
  app.use(express.json());
  app.use((req, _res, next) => { req.user = user; next(); });
  attachAiBoardRequestRoutes(app, {
    store,
    requireAuth: (req, res, next) => (req.user ? next() : res.status(401).json({ error: 'unauthorized' })),
    requireEnrolled: (_req, _res, next) => next(),
    requireAdmin: (req, res, next) => (req.user.role === 'admin' ? next() : res.status(403).json({ error: 'forbidden' })),
    requireStrictCsrf: (_req, _res, next) => next(),
    classifyRequest: async () => null,
    ...(assessElevation ? { assessElevation } : {}),
  });
  const server = http.createServer(app);
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  const base = `http://127.0.0.1:${server.address().port}`;
  return { get: (path) => fetch(`${base}${path}`), close: () => new Promise((resolve) => server.close(resolve)) };
}

const fakeRisk = (level = 'medium') => async () => ({ level, reasons: ['mô phỏng'], recommendation: 'review',
  questions: ['vì sao cần mức này?'], source: 'model', cached: false });

test('context carries the request, scope, plan steps and flags', async () => {
  const { db, store } = await fixture();
  const srv = await serve(store, { assessElevation: fakeRisk('low') });
  try {
    const { request_id: id } = await newRequest(store, {
      title: `Cập nhật ${CONTENT}`, detail: 'Đổi lời chào trong dịch vụ nội dung; không đổi schema.',
    });
    await store.requestElevation(id, {
      paths: [CONTENT], levels: ['protected'], reason: 'Cần sửa dịch vụ nội dung dùng chung.',
      plan_hash: 'hash-a', plan: PLAN([CONTENT], 'content.write'),
    });
    const response = await srv.get(`/api/admin/ai-board/requests/${id}/elevation-context`);
    assert.equal(response.status, 200);
    const { context } = await response.json();
    assert.equal(context.request.id, id);
    assert.match(context.request.title, /server\/contexts\/content\/x\.js/);
    assert.equal(context.request.excerpt, 'Đổi lời chào trong dịch vụ nội dung; không đổi schema.');
    assert.equal(context.elevation.reason, 'Cần sửa dịch vụ nội dung dùng chung.');
    assert.equal(context.elevation.requested_by.type, 'worker');
    assert.deepEqual(context.elevation.scope.map((row) => row.path), [CONTENT]);
    const row = context.elevation.scope[0];
    assert.equal(row.named_in_request, true);
    assert.equal(row.in_plan, true);
    assert.equal(row.plan_tier, 'protected');
    assert.equal(row.level_above_plan, false);
    assert.equal(row.outside_request, false);
    assert.deepEqual(context.flags, { outside_request: false, scope_changed_since_request: false, self_scope: false,
      plan_missing: false, level_above_plan: false });
    assert.equal(context.plan.available, true);
    assert.equal(context.plan.source, 'request_time');
    assert.equal(context.plan.steps[0].capability, 'content.write');
    assert.equal(context.plan.steps[0].tier, 'protected');
    assert.equal(context.evidence.plan_hash_request, 'hash-a');
    assert.equal(context.evidence.request_url, `/admin-request.html?id=${id}`);
    assert.equal(context.risk.level, 'low');
  } finally { await srv.close(); db.close(); }
});

test('a path outside the request and the plan is flagged, as is a stricter level than the plan needs', async () => {
  const { db, store } = await fixture();
  const srv = await serve(store, { assessElevation: fakeRisk('low') });
  try {
    const { request_id: id } = await newRequest(store, { title: 'Đổi màu tiêu đề trang chủ', detail: 'Chỉ đổi CSS.' });
    await store.requestElevation(id, {
      paths: [CONTENT, PAGE], levels: ['core', 'surface'], reason: 'Cần chạm phần lõi.',
      plan_hash: 'hash-b', plan: PLAN([PAGE], 'public.ui'),
    });
    const { context } = await (await srv.get(`/api/admin/ai-board/requests/${id}/elevation-context`)).json();
    const byPath = Object.fromEntries(context.elevation.scope.map((row) => [row.path, row]));
    assert.equal(byPath[CONTENT].named_in_request, false);
    assert.equal(byPath[CONTENT].in_plan, false);
    assert.equal(byPath[CONTENT].outside_request, true);
    assert.equal(byPath[PAGE].in_plan, true);
    assert.equal(byPath[PAGE].plan_tier, 'surface');
    assert.equal(byPath[PAGE].level_above_plan, false);
    assert.equal(context.flags.outside_request, true);
    assert.equal(context.flags.self_scope, false);
    assert.equal(context.risk.level, 'medium', 'the floor raises a low model verdict when a path is outside the request');
    assert.equal(context.risk.recommendation, 'review');
  } finally { await srv.close(); db.close(); }
});

test('a scope or plan hash that moved after the request is flagged', async () => {
  const { db, store } = await fixture();
  const srv = await serve(store, { assessElevation: fakeRisk('low') });
  try {
    const { request_id: id, root_ticket_id: rootId } = await newRequest(store, { title: `Sửa ${CONTENT}` });
    await store.requestElevation(id, { paths: [CONTENT], levels: ['protected'], reason: 'Sửa nội dung.', plan_hash: 'hash-c' });
    const before = (await (await srv.get(`/api/admin/ai-board/requests/${id}/elevation-context`)).json()).context;
    assert.equal(before.flags.scope_changed_since_request, false);

    await db.d.run(`UPDATE ai_tickets SET elevation_scope=? WHERE id=?`,
      [JSON.stringify([{ path: CONTENT, level: 'protected' }, { path: 'server/db.js', level: 'core' }]), rootId]);
    const widened = (await (await srv.get(`/api/admin/ai-board/requests/${id}/elevation-context`)).json()).context;
    assert.equal(widened.flags.scope_changed_since_request, true);
    assert.equal(widened.elevation.scope.length, 2);
    assert.deepEqual(widened.evidence.plan_hash_request, 'hash-c');

    await db.d.run(`UPDATE ai_tickets SET elevation_scope=?, plan_hash=? WHERE id=?`,
      [JSON.stringify([{ path: CONTENT, level: 'protected' }]), 'hash-z', rootId]);
    const replanned = (await (await srv.get(`/api/admin/ai-board/requests/${id}/elevation-context`)).json()).context;
    assert.equal(replanned.flags.scope_changed_since_request, true, 'same scope, different plan hash');
    assert.equal(replanned.evidence.plan_hash_current, 'hash-z');
  } finally { await srv.close(); db.close(); }
});

test('a self-scope request is flagged and the model verdict cannot lower it', async () => {
  const { db, store } = await fixture();
  const srv = await serve(store, { assessElevation: fakeRisk('low') });
  try {
    const { request_id: id } = await newRequest(store, { title: 'Sửa cổng duyệt' });
    await store.requestElevation(id, { paths: ['server/ai-board/api/routes.js'], levels: ['core'], reason: 'Tự sửa cổng.' });
    const { context } = await (await srv.get(`/api/admin/ai-board/requests/${id}/elevation-context`)).json();
    assert.equal(context.flags.self_scope, true);
    assert.equal(context.risk.level, 'high');
    assert.equal(context.risk.recommendation, 'reject');
  } finally { await srv.close(); db.close(); }
});

test('the batch context returns cheap contexts and the single one needs an admin', async () => {
  const { db, store } = await fixture();
  const srv = await serve(store, { assessElevation: fakeRisk('low') });
  const student = await serve(store, { user: { id: 1, role: 'student' }, assessElevation: fakeRisk('low') });
  try {
    const one = await newRequest(store, { title: `Sửa ${CONTENT}` });
    const two = await newRequest(store, { title: `Sửa ${PAGE}` });
    for (const { request_id: id } of [one, two]) {
      await store.requestElevation(id, { paths: [CONTENT], levels: ['protected'], reason: 'Sửa nội dung.' });
    }
    const batch = await (await srv.get(`/api/admin/ai-board/elevation-context?ids=${one.request_id},${two.request_id},4242`)).json();
    assert.deepEqual(Object.keys(batch.contexts).map(Number).sort(), [one.request_id, two.request_id]);
    assert.equal('risk' in batch.contexts[one.request_id], false, 'batch payload stays small: no model call');
    assert.equal((await srv.get('/api/admin/ai-board/requests/4242/elevation-context')).status, 404);
    assert.equal((await student.get(`/api/admin/ai-board/requests/${one.request_id}/elevation-context`)).status, 403);
  } finally { await srv.close(); await student.close(); db.close(); }
});

const MODEL_ENV = { AI_BOARD_MODEL_ROUTING: 'true', VLLM_URL: 'http://model.invalid', VLLM_SECKEY: 'secret' };
const RISK_BODY = JSON.stringify({ level: 'medium', reasons: ['path ngoài yêu cầu'], recommendation: 'approve',
  questions: ['vì sao cần core?'] });
const llmReply = (content) => ({ ok: true, status: 200, json: async () => ({ choices: [{ message: { content } }] }) });

test('one model call per plan_hash + scope, then the cached verdict', async () => {
  const { db } = await fixture();
  try {
    const context = { plan: { plan_hash: 'hash-m', steps: [{ order: 1, title: 'x', paths: [CONTENT], capability: null }] },
      elevation: { scope: [{ path: CONTENT, level: 'protected' }] },
      flags: { outside_request: false, scope_changed_since_request: false, self_scope: false, plan_missing: false, level_above_plan: false } };
    const calls = [];
    const fetchImpl = async (url, options) => {
      calls.push({ url, body: JSON.parse(options.body) });
      return llmReply(RISK_BODY);
    };
    const first = await assessElevationRisk({ db: db.d, context, env: MODEL_ENV, fetchImpl });
    assert.equal(first.level, 'medium');
    assert.equal(first.source, 'model');
    assert.equal(first.model, 'qwen3.5-35b-a3b-int4');
    assert.equal(first.recommendation, 'approve', 'the model advice is kept verbatim; nothing acts on it');
    assert.equal(calls.length, 1);
    assert.match(calls[0].url, /\/v1\/chat\/completions$/);
    assert.equal(calls[0].body.messages[0].role, 'system');
    assert.match(calls[0].body.messages[1].content, /CONTEXT:/);

    const second = await assessElevationRisk({ db: db.d, context, env: MODEL_ENV, fetchImpl });
    assert.equal(second.source, 'cached');
    assert.equal(second.cached, true);
    assert.equal(calls.length, 1, 'the second read is served from ai_elevation_risks');
    const stored = await db.d.get('SELECT level, model FROM ai_elevation_risks');
    assert.deepEqual({ level: stored.level, model: stored.model }, { level: 'medium', model: 'qwen3.5-35b-a3b-int4' });
  } finally { db.close(); }
});

test('a missing or failing model degrades to unknown and is not cached', async () => {
  const { db } = await fixture();
  try {
    const context = { plan: { plan_hash: 'hash-u' }, elevation: { scope: [{ path: CONTENT, level: 'protected' }] }, flags: {} };
    const offline = await assessElevationRisk({ db: db.d, context, env: {}, fetchImpl: async () => { throw new Error('must not call'); } });
    assert.equal(offline.level, 'unknown');
    assert.equal(offline.source, 'unknown');
    assert.equal(offline.recommendation, 'review');
    assert.match(offline.reasons[0], /Chưa cấu hình/);
    const failing = await assessElevationRisk({ db: db.d, context, env: MODEL_ENV,
      fetchImpl: async () => { throw new Error('timeout'); } });
    assert.equal(failing.level, 'unknown');
    assert.match(failing.reasons[0], /Không gọi được model/);
    const badBody = await assessElevationRisk({ db: db.d, context, env: MODEL_ENV,
      fetchImpl: async () => llmReply('không phải JSON') });
    assert.equal(badBody.level, 'unknown');
    assert.equal(await db.d.get('SELECT 1 FROM ai_elevation_risks'), undefined);
  } finally { db.close(); }
});

test('strict parsing accepts fenced JSON and rejects a missing level or reasons', () => {
  assert.deepEqual(parseElevationRisk('```json\n{"level":"low","reasons":["ok"],"recommendation":"approve","questions":[]}\n```'),
    { level: 'low', reasons: ['ok'], recommendation: 'approve', questions: [] });
  assert.equal(parseElevationRisk('{"level":"nope","reasons":["x"]}'), null);
  assert.equal(parseElevationRisk('{"level":"low","reasons":[]}'), null);
  assert.equal(parseElevationRisk('chỉ là chữ'), null);
  assert.deepEqual(parseElevationRisk('{"level":"high","reasons":["x"]}'),
    { level: 'high', reasons: ['x'], recommendation: 'review', questions: [] });
  assert.deepEqual(applyRiskFloor({ level: 'low', reasons: ['x'], recommendation: 'approve' }, { outside_request: true }).level, 'medium');
});

test('the context builder names paths from the request text and keeps plan steps compact', () => {
  assert.equal(namedInText('sửa public/gioi-thieu.html', 'public/gioi-thieu.html'), true);
  assert.equal(namedInText('sửa trang giới thiệu', 'server/db.js'), false);
  assert.equal(namedInText('đổi gioi-thieu', 'public/gioi-thieu.html'), true);
  const plan = normalizePlanSummary({ goal: 'g', steps: [{ order: 1, title: 't', file: PAGE, capability: 'public.ui' }] });
  assert.deepEqual(plan.steps[0].paths, [PAGE]);
  assert.equal(normalizePlanSummary({ goal: 'g', steps: [] }), null);
  const context = buildElevationContext({
    request: { id: 1, title: 'Sửa public/khac.html', detail: '' },
    root: { elevation: 'requested', elevation_scope: JSON.stringify([{ path: PAGE, level: 'protected' }]) },
    asked: { detail: { scope: [{ path: PAGE, level: 'protected' }], plan_hash: 'h' } },
    scope: [{ path: PAGE, level: 'protected' }],
    plan: plan && { ...plan, source: 'request_time', plan_hash: 'h' },
  });
  assert.equal(context.flags.outside_request, false, 'in-plan is enough even when the title names another page');
  assert.equal(context.elevation.scope[0].in_plan, true);
});
