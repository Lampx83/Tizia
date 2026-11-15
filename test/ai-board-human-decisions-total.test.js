// Board decision list also reports the full count (web admin overview reads it in the split stack).
import test from 'node:test';
import assert from 'node:assert/strict';
import http from 'node:http';
import express from 'express';
import { createBoardSchema } from './support/ai-board-db.js';
import { attachHumanDecisions } from '../server/ai-board/api/human-decisions.js';

const db = await createBoardSchema();
const app = express();
app.use(express.json());
const router = express.Router();
const pass = (req, _res, next) => { req.user = { id: 1, role: 'admin' }; next(); };
attachHumanDecisions(router, { db: db.d, requireAuth: pass, requireAdmin: pass });
app.use(router);
const server = http.createServer(app);
await new Promise((r) => server.listen(0, '127.0.0.1', r));
const base = `http://127.0.0.1:${server.address().port}`;

test('total counts all decisions, not just the page', async () => {
  const now = Date.now();
  for (let i = 0; i < 3; i++) {
    await db.d.run(`INSERT INTO ai_decisions(request_id, decided_by, action, created_at) VALUES (1, 'human', 'approve', ?)`, [now + i]);
  }
  const body = await (await fetch(`${base}/api/admin/ai-board/decisions?limit=1`)).json();
  assert.equal(body.decisions.length, 1);
  assert.equal(body.total, 3);
});

test.after(async () => { server.close(); server.closeAllConnections(); await db.dispose(); });
