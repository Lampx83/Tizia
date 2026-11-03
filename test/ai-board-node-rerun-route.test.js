// Node re-run route: admin only, node → gate mapping, refusals pass through from the store.
import test from 'node:test';
import assert from 'node:assert/strict';
import http from 'node:http';
import express from 'express';
import { attachAiBoardRequestRoutes } from '../server/ai-board/api/routes.js';
import { WorkerContractError } from '../server/ai-board/repositories/store-contract.js';

async function serve(role, rerunGate) {
  const calls = [];
  const store = { db: null, rerunGate: async (...args) => { calls.push(args); return rerunGate(...args); } };
  const app = express();
  app.use(express.json());
  app.use((req, _res, next) => { req.user = { id: 9, role }; next(); });
  const pass = (_req, _res, next) => next();
  const admin = (req, res, next) => (req.user.role === 'admin' ? next() : res.sendStatus(403));
  attachAiBoardRequestRoutes(app, { store, requireAuth: pass, requireEnrolled: pass, requireAdmin: admin, requireStrictCsrf: pass, classifyRequest: async () => null });
  const server = http.createServer(app);
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const base = `http://127.0.0.1:${server.address().port}`;
  const post = (node) => fetch(`${base}/api/admin/ai-board/requests/7/nodes/${node}/rerun`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: '{}' });
  return { calls, post, close: () => new Promise(resolve => server.close(resolve)) };
}

test('node rerun is admin only; the owner gets 403 and the store is never called', async () => {
  const srv = await serve('student', async () => ({ ok: true }));
  try {
    const response = await srv.post('gate_2');
    assert.equal(response.status, 403);
    assert.equal(srv.calls.length, 0);
  } finally { await srv.close(); }
});

test('node rerun maps each node to its gate: 1-2.5 re-plan, 3-5.5 redo execution', async () => {
  const srv = await serve('admin', async (_id, gate) => ({ ok: true, from_gate: gate, resumed_from: null }));
  try {
    const map = { gate_1: 1, gate_2: 2, gate_2_5: 2.5, gate_3: 3, gate_4: 4, gate_5: 5, gate_5_5: 5.5 };
    for (const [node, gate] of Object.entries(map)) {
      const response = await srv.post(node);
      assert.equal(response.status, 200, node);
      const body = await response.json();
      assert.equal(body.node, node);
      assert.equal(body.resumed_from, null); // no checkpoint in this stub: the store answers with the plan
      assert.match(body.note, /stage runs again from step 3/);
    }
    assert.deepEqual(srv.calls.map(c => c[1]), Object.values(map));
    assert.deepEqual(srv.calls[0], ['7', 1, 9, 'gate_1']);
  } finally { await srv.close(); }
});

test('node rerun reports the checkpoint it resumed from', async () => {
  const srv = await serve('admin', async () => ({ ok: true, resumed_from: 'gate_5' }));
  try {
    const body = await (await srv.post('gate_5')).json();
    assert.equal(body.resumed_from, 'gate_5');
    assert.match(body.note, /saved checkpoint at gate_5/);
  } finally { await srv.close(); }
});

test('node rerun refuses unknown nodes before the store', async () => {
  const srv = await serve('admin', async () => ({ ok: true }));
  try {
    const response = await srv.post('plan_ready');
    assert.equal(response.status, 400);
    assert.equal((await response.json()).error, 'invalid_node');
    assert.equal(srv.calls.length, 0);
  } finally { await srv.close(); }
});

test('node rerun passes the store refusal through: live lease or wrong stage is 409 with the reason', async () => {
  const srv = await serve('admin', async () => {
    throw new WorkerContractError('A worker is running this request now. Wait until it stops.', 409, 'not_rerunnable');
  });
  try {
    const response = await srv.post('gate_3');
    assert.equal(response.status, 409);
    const body = await response.json();
    assert.equal(body.error, 'not_rerunnable');
    assert.match(body.message, /A worker is running this request now/);
  } finally { await srv.close(); }
});
