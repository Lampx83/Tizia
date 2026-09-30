// Feature-folders ticket 09: ảnh bản nháp vào thread, chuông sau verdict, "Thử cách khác" (≤ 2 lượt hỏng).
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import http from 'node:http';
import express from 'express';
import Database from 'better-sqlite3';

import { applyAiBoardMigrations, createAiBoardStore, LIMITS } from '../server/ai-board/store.js';
import { attachAiBoardRequestRoutes, attachAiBoardWorkerRoutes } from '../server/ai-board/routes.js';
import { DRAFT_AUTHOR, draftNotifier, MAX_SHOT_BYTES, SHOTS_TYPE } from '../server/ai-board/drafts.js';

const KEY = 'fixture-worker-key-32-characters-long';
const PNG = Buffer.concat([Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]), Buffer.from('IHDR fixture')]);
const SHA_A = 'a'.repeat(40);
const SHA_B = 'b'.repeat(40);
const G = {
  3: { gate: 3, blocked: false, reason: null },
  4: { gate: 4, blocked: false, reason: null, issues: [] },
  5: { gate: 5, blocked: false, reason: null, smoke_passed: true, http_observed: true, functional: { probe_id: 'queue-worker-availability-v1', passed: true, coverage: { requester_api: true, mounted_ui: true, recovery: true } }, runner: 'docker', retried: false },
  55: { gate: 5.5, blocked: false, reason: null, risk_level: 'medium', risk_signals: [] },
};
const PASSING = {
  outcome: 'ready_for_pr', gate_reached: 5.5, reason: null, budget_used: 10, failure_class: null, repairs: [],
  candidate: { branch: 'ai-board/2026-09-26-ticket-1', base_sha: SHA_A, head_sha: SHA_B,
    commits: [{ sha: SHA_B, title: 'ai-board(ticket-1): 1/1 x', files: ['public/gioi-thieu.html'] }] },
  gates: [G[3], G[4], G[5], G[55]],
};
const BLOCKED = {
  outcome: 'blocked', gate_reached: 4, reason: 'lint', budget_used: 10, failure_class: 'ordinary', repairs: [],
  candidate: null, gates: [G[3], { gate: 4, blocked: true, reason: 'lint', issues: [] }],
};

async function fixture() {
  const db = new Database(':memory:');
  db.pragma('foreign_keys = ON');
  db.exec(`
    CREATE TABLE users (id INTEGER PRIMARY KEY, username TEXT, display_name TEXT, role TEXT, enrolled_domain TEXT);
    CREATE TABLE requests (
      id INTEGER PRIMARY KEY AUTOINCREMENT, domain TEXT NOT NULL, type TEXT NOT NULL DEFAULT 'other',
      title TEXT NOT NULL, detail TEXT, student TEXT NOT NULL DEFAULT 'x',
      status TEXT NOT NULL DEFAULT 'pending', votes INTEGER NOT NULL DEFAULT 1,
      admin_note TEXT, created_at INTEGER NOT NULL, updated_at INTEGER NOT NULL, attachments TEXT
    );
    CREATE TABLE request_messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT, request_id INTEGER NOT NULL, role TEXT NOT NULL,
      author_name TEXT, body TEXT NOT NULL, attachments TEXT, created_at INTEGER NOT NULL
    );
    INSERT INTO users VALUES (1, 'lan', 'Lan', 'student', 'pharmacy'), (2, 'minh', 'Minh', 'student', 'pharmacy');
  `);
  applyAiBoardMigrations(db);
  const store = createAiBoardStore(db);
  store.createRequestWithRoot({ ownerUserId: 1, ownerDomain: 'pharmacy', ownerDisplayName: 'Lan',
    idempotencyKey: 'draft-request-001', title: 'Sửa trang giới thiệu', detail: 'fixture' });
  const uploadsDir = fs.mkdtempSync(path.join(os.tmpdir(), 'ai-board-shots-'));
  const notices = [];
  const app = express();
  app.use(express.json({ limit: '64kb' })); // như app thật: body lớn phải đi content-type riêng
  app.use((req, _res, next) => {
    const id = Number(req.headers['x-test-user']);
    if (id) req.user = { id, display_name: id === 1 ? 'Lan' : 'Minh', role: 'student', enrolled_domain: 'pharmacy' };
    next();
  });
  const pass = (_req, _res, next) => next();
  attachAiBoardRequestRoutes(app, {
    store, requireAuth: (req, res, next) => (req.user ? next() : res.status(401).end()), requireEnrolled: pass,
    requireAdmin: (_req, res) => res.status(403).end(), requireStrictCsrf: pass,
  });
  attachAiBoardWorkerRoutes(app, { store, env: { AI_BOARD_WORKER_KEY: KEY }, uploadsDir,
    onVerdict: draftNotifier((n) => notices.push(n)) });
  const server = http.createServer(app);
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  const base = `http://127.0.0.1:${server.address().port}`;
  const post = (url, body, headers = {}) => fetch(base + url, { method: 'POST',
    headers: { 'content-type': 'application/json', ...headers }, body: JSON.stringify(body) });
  const worker = (url, body, type = 'application/json') => post(url, body, { 'x-ai-worker-key': KEY, 'content-type': type });

  /** 1 lượt: claim → run → plan → verdict (qua HTTP để chạy hook). Trả lease/run để gọi tiếp. */
  async function cycle(verdict, n) {
    const ticket = store.claimNext({ workerId: 'w1', version: 't', mode: 'active', intent: 'plan' });
    const lease = { workerId: 'w1', leaseToken: ticket.lease_token };
    const run = store.createRun(ticket.id, { ...lease, trigger: 'plan', idempotencyKey: `draft-run-00${n}` });
    const step = { order: 1, title: `Sửa lần ${n}`, description: 'x', allowed_scope: ['public/gioi-thieu.html'],
      acceptance: ['đổi'], tests: ['node --test'], capability: 'public.ui', risk: 'low', non_goals: ['x'] };
    store.submitPlan(ticket.id, { ...lease, runId: run.id, budgetUsed: 1, idempotencyKey: `draft-plan-00${n}`,
      plan: { domain: 'pharmacy', goal: `Sửa lần ${n}.`, allowed_scope: step.allowed_scope, acceptance: step.acceptance,
        tests: step.tests, capabilities: ['public.ui'], risk: 'low', non_goals: ['x'], steps: [step] } });
    const body = { worker_id: 'w1', lease_token: ticket.lease_token, run_id: run.id };
    let response = { ok: true };
    if (verdict) {
      response = await worker(`/api/ai-board/worker/tickets/${ticket.id}/verdict`,
        { ...body, verdict, idempotency_key: `draft-verdict-00${n}` });
    }
    const release = () => store.releaseLease(ticket.id, { ...lease, outcome: 'planned', idempotencyKey: `draft-release-00${n}` });
    return { ticket, body, response, release };
  }
  const requests = async (user) => (await (await fetch(`${base}/api/requests?domain=pharmacy`,
    { headers: { 'x-test-user': String(user) } })).json()).items;
  return { db, store, uploadsDir, notices, post, worker, cycle, requests, close: () => server.close() };
}

const shot = (extra = {}) => ({ phase: 'after', page: '/gioi-thieu.html', width: 1280, png_base64: PNG.toString('base64'), ...extra });

test('screenshot route: worker key + live lease, PNG only, per-image cap', async () => {
  const f = await fixture();
  try {
    const { ticket, body } = await f.cycle(null, 1);
    const url = `/api/ai-board/worker/tickets/${ticket.id}/screenshots`;
    const payload = { ...body, images: [shot()] };
    assert.equal((await f.post(url, payload, { 'content-type': SHOTS_TYPE })).status, 401); // thiếu worker key
    assert.equal((await f.worker(url, { ...payload, lease_token: 'stale' }, SHOTS_TYPE)).status, 409);
    const notPng = await f.worker(url, { ...body, images: [shot({ png_base64: Buffer.from('GIF89a....').toString('base64') })] }, SHOTS_TYPE);
    assert.equal(notPng.status, 415);
    assert.equal((await notPng.json()).error, 'not_png');
    const big = Buffer.concat([PNG, Buffer.alloc(MAX_SHOT_BYTES)]);
    const tooBig = await f.worker(url, { ...body, images: [shot({ png_base64: big.toString('base64') })] }, SHOTS_TYPE);
    assert.equal(tooBig.status, 413);
    assert.equal((await f.worker(url, { ...body, images: Array(9).fill(shot()) }, SHOTS_TYPE)).status, 400);
    assert.equal((await f.worker(url, payload)).status, 415); // application/json: sai loại, không nhận
    assert.equal(fs.readdirSync(f.uploadsDir).length, 0, 'không ghi file nào khi bị từ chối');
    assert.equal(f.db.prepare('SELECT COUNT(*) AS n FROM request_messages').get().n, 0);
  } finally { f.close(); }
});

test('screenshots are stored and appended as one AI thread message, once per run', async () => {
  const f = await fixture();
  try {
    const { ticket, body } = await f.cycle(null, 1);
    const url = `/api/ai-board/worker/tickets/${ticket.id}/screenshots`;
    const images = [shot({ width: 375 }), shot(), shot({ phase: 'before', width: 375 }), shot({ phase: 'before' })];
    const first = await f.worker(url, { ...body, images }, SHOTS_TYPE);
    assert.equal(first.status, 200);
    assert.equal((await first.json()).stored, 4);
    assert.equal((await (await f.worker(url, { ...body, images }, SHOTS_TYPE)).json()).duplicate, true);
    const messages = f.db.prepare('SELECT * FROM request_messages').all();
    assert.equal(messages.length, 1);
    assert.equal(messages[0].role, 'ai');
    assert.equal(messages[0].author_name, DRAFT_AUTHOR);
    assert.match(messages[0].body, /^Bản nháp sau lượt này/);
    const atts = JSON.parse(messages[0].attachments);
    assert.deepEqual(atts.map((a) => a.name), ['Sau · 375px · /gioi-thieu.html', 'Sau · 1280px · /gioi-thieu.html',
      'Trước · 375px · /gioi-thieu.html', 'Trước · 1280px · /gioi-thieu.html']);
    for (const a of atts) {
      assert.equal(a.mime, 'image/png');
      assert.equal(a.kind, 'screenshot');
      assert.match(a.url, /^\/uploads\/requests\/\d{4}-\d{2}-\d{2}\/[\w-]+\.png$/);
      const file = path.join(f.uploadsDir, ...a.url.split('/').slice(3));
      assert.deepEqual(fs.readFileSync(file), PNG);
    }
  } finally { f.close(); }
});

test('passing verdict rings the requester with a link to the request thread', async () => {
  const f = await fixture();
  try {
    const { response } = await f.cycle(PASSING, 1);
    assert.equal(response.status, 200);
    assert.equal(f.notices.length, 1);
    const [n] = f.notices;
    assert.equal(n.user_display_name, 'Lan');
    assert.equal(n.body, 'Ban vừa làm xong bản nháp của «Sửa trang giới thiệu» — xem ảnh');
    assert.equal(n.url, '/school.html?domain=pharmacy#sgf-thread-1');
  } finally { f.close(); }
});

test('"Thử cách khác" requeues only the caller\'s own failed root, and stops after 2 failed runs', async () => {
  const f = await fixture();
  try {
    const first = await f.cycle(BLOCKED, 1);
    assert.equal(f.notices.at(-1).body.includes('Thử cách khác'), true);
    // Lease còn sống (worker chưa trả): chưa cho thử lại.
    assert.equal((await f.post('/api/requests/1/retry', {}, { 'x-test-user': '1' })).status, 409);
    first.release();
    // Hỏng không tính vào trần yêu cầu đang chờ.
    assert.equal(f.store.countPendingRoots(1), 0);
    assert.equal((await f.post('/api/requests/1/retry', {}, { 'x-test-user': '2' })).status, 404); // không phải của mình
    const mine = await f.post('/api/requests/1/retry', {}, { 'x-test-user': '1' });
    assert.equal(mine.status, 200);
    const root = f.db.prepare("SELECT status, phase FROM ai_tickets WHERE kind='root'").get();
    assert.deepEqual({ ...root }, { status: 'queued', phase: 'needs_replan' });
    assert.equal((await f.post('/api/requests/1/retry', {}, { 'x-test-user': '1' })).status, 409); // đang chờ, không hỏng

    const second = await f.cycle(BLOCKED, 2);
    second.release();
    assert.match(f.notices.at(-1).body, /chuyển quản trị viên/);
    const handed = f.db.prepare("SELECT status, public_note FROM ai_tickets WHERE kind='root'").get();
    assert.equal(handed.status, 'waiting_admin');
    const refused = await f.post('/api/requests/1/retry', {}, { 'x-test-user': '1' });
    assert.equal(refused.status, 409);
    assert.equal((await refused.json()).error, 'admin_handoff');
    assert.equal((await f.requests(1))[0].retry, 'admin');
  } finally { f.close(); }
});

test('the request list offers "Thử cách khác" after one failed run; the pending cap still applies', async () => {
  const f = await fixture();
  try {
    (await f.cycle(BLOCKED, 1)).release();
    assert.equal((await f.requests(1))[0].retry, 'retry');
    for (let i = 0; i < LIMITS.pending_roots_per_user.value; i += 1) {
      f.store.createRequestWithRoot({ ownerUserId: 1, ownerDomain: 'pharmacy', ownerDisplayName: 'Lan',
        idempotencyKey: `draft-request-cap-${i}`, title: `Yêu cầu khác ${i}` });
    }
    const capped = await f.post('/api/requests/1/retry', {}, { 'x-test-user': '1' });
    assert.equal(capped.status, 429);
  } finally { f.close(); }
});
