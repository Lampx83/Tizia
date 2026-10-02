// POST /api/admin/requests/:id/reply on a request with no AI Board root ticket answers 404, side-effect free.
import test from 'node:test';
import assert from 'node:assert/strict';
import { createHmac } from 'node:crypto';
import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import http from 'node:http';
import express from 'express';

const dir = mkdtempSync(path.join(tmpdir(), 'tizia-admin-reply-'));
process.env.DATA_DIR = dir;
delete process.env.CSRF_SECRET;
const { db } = await import('../server/db.js');
const { attachAdmin } = await import('../server/contexts/admin/index.js');
const { createAiBoardStore } = await import('../server/ai-board/store.js');

// Owned by the ai-agent context, not mounted here.
db.exec(`CREATE TABLE IF NOT EXISTS ai_decisions (id INTEGER PRIMARY KEY AUTOINCREMENT, request_id INTEGER, decided_by TEXT,
  action TEXT, status_applied TEXT, reason TEXT, public_note TEXT, priority_score REAL, confidence REAL, created_at INTEGER)`);

const raw = 'a'.repeat(40);
const CSRF = `${raw}.${createHmac('sha256', 'dev-csrf-secret-change-me').update(raw).digest('hex').slice(0, 16)}`;

async function serve() {
  const app = express();
  app.use(express.json());
  app.use((req, _res, next) => {
    req.user = { id: 9, username: 'admin', display_name: 'Admin', role: 'admin' };
    req.csrfToken = CSRF;
    next();
  });
  const router = express.Router();
  attachAdmin(router);
  app.use(router);
  const server = http.createServer(app);
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  const base = `http://127.0.0.1:${server.address().port}`;
  return {
    reply: (id, body) => fetch(`${base}/api/admin/requests/${id}/reply`, {
      method: 'POST', headers: { 'content-type': 'application/json', 'x-csrf-token': CSRF }, body: JSON.stringify(body),
    }),
    close: () => new Promise((resolve) => { server.close(resolve); server.closeAllConnections(); }),
  };
}

const count = (table, id) => db.prepare(`SELECT COUNT(*) n FROM ${table} WHERE request_id=?`).get(id).n;

test('admin reply: no root ticket is 404 with no decision, thread message or notification', async () => {
  const api = await serve();
  try {
    const legacy = Number(db.prepare(`INSERT INTO requests (domain, title, student, created_at, updated_at)
      VALUES ('pharmacy', 'Yêu cầu cũ', 'Lan', 1, 1)`).run().lastInsertRowid);
    const res = await api.reply(legacy, { status: 'rejected', message: 'Không phù hợp.' });
    assert.equal(res.status, 404);
    assert.equal((await res.json()).error, 'request_not_found');
    assert.equal((await api.reply(999_999, { status: 'done', message: 'Xong rồi.' })).status, 404);
    for (const table of ['ai_decisions', 'request_messages', 'notifications']) assert.equal(count(table, legacy), 0, table);
    assert.equal(db.prepare('SELECT status FROM requests WHERE id=?').get(legacy).status, 'pending');

    // With a root the same call still succeeds.
    const owner = Number(db.prepare(`INSERT INTO users (username, display_name, password_hash, created_at)
      VALUES ('lan', 'Lan', 'x', 1)`).run().lastInsertRowid);
    const store = createAiBoardStore(db);
    const { request_id: id } = store.createRequestWithRoot({
      ownerUserId: owner, ownerDomain: 'pharmacy', ownerDisplayName: 'Lan',
      idempotencyKey: 'admin-reply-root-001', title: 'Thêm bộ thẻ thuốc', detail: 'Nội dung fixture',
    });
    const ok = await api.reply(id, { status: 'rejected', message: 'Không phù hợp.' });
    assert.equal(ok.status, 200);
    assert.equal((await ok.json()).status, 'rejected');
    assert.equal(count('ai_decisions', id), 1);
  } finally {
    await api.close();
  }
});

test.after(() => {
  db.close();
  rmSync(dir, { recursive: true, force: true });
  // Importing the admin/analytics modules starts non-unref'd timers; without this the file never exits.
  setTimeout(() => process.exit(0), 200).unref();
});
