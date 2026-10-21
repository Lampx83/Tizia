import http from 'node:http';
import express from 'express';
import { openBoard } from './ai-board-db.js';
import { createAsyncAiBoardStore } from '../../server/ai-board/store-async.js';
import { attachAiBoardRequestRoutes, attachAiBoardWorkerRoutes } from '../../server/ai-board/routes.js';

export const KEY = 'fixture-worker-key-32-characters-long';
export const text = (name = 'frontend-example', body = '1. Keep labels clear.') => `---\nname: ${name}\ndescription: UI guidance\ntask_type: frontend\nsource: admin\nversion: 1\nmax_tokens: 1500\n---\n${body}\n`;
export async function setup() {
  const db = await openBoard({ users: [[1, 'lan', 'Lan', 'student', 'it'], [9, 'admin', 'Admin', 'admin', null]] });
  await db.d.exec('CREATE TABLE sessions(token TEXT PRIMARY KEY,user_id BIGINT REFERENCES users(id),expires_at BIGINT NOT NULL)');
  await db.d.run('INSERT INTO sessions(token,user_id,expires_at) VALUES (?,?,?)', ['skill-admin-session',9,Date.now()+86400000]);
  const store = createAsyncAiBoardStore(db.d);
  const made = await store.createRequestWithRoot({ ownerUserId: 1, ownerDomain: 'it', ownerDisplayName: 'Lan',
    idempotencyKey: 'skill-request', title: 'Edit label', detail: 'Existing page label' });
  const ticket = await store.claimNext({ workerId: 'fixture-worker', version: 'test', mode: 'shadow' });
  const lease = { worker_id: 'fixture-worker', lease_token: ticket.lease_token };
  const app = express();
  app.use(express.json());
  app.use((req, res, next) => { const id = Number(req.get('x-user')); req.user = id ? { id, token:'skill-admin-session', role: id === 9 ? 'admin' : 'student' } : null; next(); });
  const auth = (req, res, next) => req.user ? next() : res.sendStatus(401);
  const admin = (req, res, next) => req.user?.role === 'admin' ? next() : res.sendStatus(403);
  const csrf = (req, res, next) => req.get('x-csrf-fixture') === 'yes' ? next() : res.sendStatus(403);
  attachAiBoardRequestRoutes(app, { store, requireAuth: auth, requireAdmin: admin, requireEnrolled: auth, requireStrictCsrf: csrf });
  attachAiBoardWorkerRoutes(app, { store, env: { AI_BOARD_WORKER_KEY: KEY } });
  const server = http.createServer(app);
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const origin = `http://127.0.0.1:${server.address().port}`;
  const api = async (path, body, over = {}) => {
    const r = await fetch(origin + path, { method: body == null ? 'GET' : 'POST',
      headers: { 'content-type': 'application/json', 'x-user': '9', 'x-csrf-fixture': 'yes', ...over },
      ...(body == null ? {} : { body: JSON.stringify(body) }) });
    return { status: r.status, body: await r.json().catch(() => ({})) };
  };
  const active = () => api(`/api/ai-board/worker/tickets/${ticket.id}/skills`, { ...lease, task_type: 'frontend', role: 'gate3_heavy' }, { 'x-ai-worker-key': KEY });
  return { db, store, ticket, lease, requestId:made.request_id, api, active, close: async () => { await new Promise(resolve => server.close(resolve)); db.close(); } };
}

