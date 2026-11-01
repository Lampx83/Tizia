// GET /api/admin/requests/count: admin only; requests_pending = rows with status 'pending' (badge số tab Góp ý).
import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import http from 'node:http';
import express from 'express';
import { createBoardSchema } from './support/ai-board-db.js';
const appFixture = await createBoardSchema({ migrate: false });
process['env'].DATABASE_URL = appFixture.url;

const dir = mkdtempSync(path.join(tmpdir(), 'tizia-admin-count-'));
process.env.DATA_DIR = dir;
delete process.env.CSRF_SECRET;
const { db } = await import('../server/db.js');
const { attachAdmin } = await import('../server/contexts/admin/index.js');
const { applyMigrations } = await import('../server/ai-board/db/index.js');
await applyMigrations(db.d);

async function serve(role) {
  const app = express();
  app.use((req, _res, next) => {
    req.user = { id: 9, username: 'u', display_name: 'U', role };
    next();
  });
  const router = express.Router();
  await attachAdmin(router);
  app.use(router);
  const server = http.createServer(app);
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  const base = `http://127.0.0.1:${server.address().port}`;
  return {
    count: () => fetch(`${base}/api/admin/requests/count`),
    close: () => new Promise((resolve) => { server.close(resolve); server.closeAllConnections(); }),
  };
}

const insert = (status, n) => db.prepare(`INSERT INTO requests (domain, title, student, status, created_at, updated_at)
  VALUES ('pharmacy', ?, 'Lan', ?, 1, 1)`).run(`Yêu cầu ${n}`, status);

test('admin count: requests_pending counts only status=pending, matches DB after status change', async () => {
  const api = await serve('admin');
  try {
    await insert('done', 0);
    const first = Number((await insert('pending', 1)).lastInsertRowid);
    await insert('pending', 2);

    let res = await api.count();
    assert.equal(res.status, 200);
    assert.equal((await res.json()).requests_pending, 2);

    await db.prepare(`UPDATE requests SET status='rejected' WHERE id=?`).run(first);
    const body = await (await api.count()).json();
    assert.equal(body.requests_pending, 1);
  } finally {
    await api.close();
  }
});

test('admin count: non-admin gets 403', async () => {
  const api = await serve('student');
  try {
    assert.equal((await api.count()).status, 403);
  } finally {
    await api.close();
  }
});

test.after(() => { rmSync(dir, { recursive: true, force: true }); });
