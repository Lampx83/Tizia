// Ticket graph renders from the admin trace route: nodes and edges come from the server contract, not the page.
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import http from 'node:http';
import express from 'express';

import { createAsyncAiBoardStore } from '../server/ai-board/store-async.js';
import { openBoard } from './support/ai-board-db.js';
import { attachAiBoardRequestRoutes } from '../server/ai-board/routes.js';
import { renderTicketGraph } from '../public/js/ai-board-graph.js';

const ADMIN = { id: 9, username: 'admin', display_name: 'Admin', role: 'admin', enrolled_domain: null };
const contract = JSON.parse(fs.readFileSync(new URL('../server/ai-board/contract.json', import.meta.url), 'utf8'));

test('admin trace route feeds the ticket graph its contract nodes and edges', async () => {
  const db = await openBoard({ users: [[1, 'lan', 'Lan', 'student', 'pharmacy'], [9, 'admin', 'Admin', 'admin', null]] });
  try {
    const store = createAsyncAiBoardStore(db.d);
    const { request_id: id, root_ticket_id: rootId } = await store.createRequestWithRoot({
      ownerUserId: 1, ownerDomain: 'pharmacy', ownerDisplayName: 'Lan',
      idempotencyKey: 'graph-http-001', title: 'Thêm bộ thẻ thuốc', detail: 'fixture',
    });
    await db.d.run(`INSERT INTO ai_runs (ticket_id, attempt, trigger, gate, worker_id, idempotency_key, evidence_json, created_at, updated_at)
      VALUES (?, 1, 'execute', 5, 'w1', 'run-graph-1', '{}', 1, 2)`, [rootId]);
    const runId = Number((await db.d.get('SELECT id FROM ai_runs WHERE ticket_id=?', [rootId])).id);
    // Not queued: the projection draws the stage that actually ran, not the queue placeholder.
    await db.d.run("UPDATE ai_tickets SET status='done', phase='pre_pr_ready' WHERE id=?", [rootId]);
    for (const [gate, status] of [[3, 'passed'], [4, 'passed'], [5, 'passed']]) {
      await db.d.run(`INSERT INTO ai_gate_traces (run_id, gate, status, public_reason, internal_reason, evidence_json, created_at)
        VALUES (?, ?, ?, NULL, NULL, NULL, ?)`, [runId, gate, status, gate]);
    }
    const app = express();
    app.use(express.json());
    app.use((req, _res, next) => { req.user = req.headers['x-test-user'] === '9' ? ADMIN : null; next(); });
    const pass = (_req, _res, next) => next();
    attachAiBoardRequestRoutes(app, { store, requireAuth: (req, res, next) => req.user ? next() : res.status(401).end(),
      requireEnrolled: pass, requireAdmin: pass, requireStrictCsrf: pass });
    const server = http.createServer(app);
    await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
    try {
      const base = `http://127.0.0.1:${server.address().port}`;
      const res = await fetch(`${base}/api/admin/ai-board/requests/${id}/trace`, { headers: { 'x-test-user': '9' } });
      assert.equal(res.status, 200);
      const trace = await res.json();
      assert.deepEqual(trace.graph.nodes, contract.execution_graph.nodes);
      assert.deepEqual(trace.graph.edges, contract.execution_graph.edges);
      const html = renderTicketGraph(trace, null, Number(trace.root.lease_expires_at) || 0);
      assert.match(html, /<section class="ticket-graph"[ >]/);
      assert.match(html, /<div class="g-frame"><svg class="g-svg" viewBox=/);
      assert.match(html, /data-edge="gate_1>gate_2"/);
      assert.match(html, /aria-label="Run app: Done"/);
      assert.equal((html.match(/role="button" tabindex="0"/g) || []).length, contract.execution_graph.nodes.length);
      // The header figures are the server's, not a page-side guess.
      assert.match(html, /class="g-strip" role="group" aria-label="Budget"/);
    } finally { await new Promise((resolve) => server.close(resolve)); }
  } finally { db.close(); }
});
