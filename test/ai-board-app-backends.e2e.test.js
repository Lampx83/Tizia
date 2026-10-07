// Boots the real app on a fresh PostgreSQL schema and drives requester, worker (key auth) and admin through HTTP.
import test from 'node:test';
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { randomBytes } from 'node:crypto';
import pg from 'pg';
import { PG_URL } from './support/ai-board-db.js';

const WORKER_KEY = 'e2e-worker-key-0123456789abcdef';

function client(base) {
  let cookies = {};
  let csrf = null;
  const call = async (method, url, body, extra = {}) => {
    const headers = { 'content-type': 'application/json', cookie: Object.entries(cookies).map(([k, v]) => `${k}=${v}`).join('; '), ...extra };
    if (csrf) headers['x-csrf-token'] = csrf;
    const res = await fetch(`${base}${url}`, { method, headers, body: body === undefined ? undefined : JSON.stringify(body) });
    for (const line of res.headers.getSetCookie?.() ?? []) {
      const [pair] = line.split(';');
      const i = pair.indexOf('=');
      cookies[pair.slice(0, i)] = pair.slice(i + 1);
    }
    const text = await res.text();
    let json = null;
    try { json = JSON.parse(text); } catch { /* not json */ }
    return { status: res.status, json, text };
  };
  return Object.assign(call, { async refreshCsrf() { csrf = (await call('GET', '/api/csrf')).json?.token ?? null; return csrf; } });
}

if (!PG_URL) throw new Error('PG fixture URL required');
for (const mode of ['postgres']) {
test(`[${mode}] the whole app runs the AI board (requester, worker, admin)`, { timeout: 120_000 }, async (t) => {
  const postgres = mode === 'postgres';
  const schema = `e2e_${randomBytes(5).toString('hex')}`;
  const admin = postgres ? new pg.Client({ connectionString: PG_URL }) : null;
  const url = new URL(PG_URL || 'postgres://unused/unused');
  if (postgres) {
    await admin.connect();
    await admin.query(`CREATE SCHEMA ${schema}`);
    url.searchParams.set('options', `-c search_path=${schema}`);
  }
  const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), 'aib-e2e-'));
  const port = 20000 + Math.floor(Math.random() * 20000);
  const child = spawn(process.execPath, ['server/index.js'], {
    env: { ...process.env, PORT: String(port), HOST: '127.0.0.1', DATA_DIR: dataDir, NODE_ENV: 'development', AI_BOARD_WORKER_KEY: WORKER_KEY,
      DATABASE_URL: url.toString() },
    stdio: ['ignore', 'pipe', 'pipe'],
  });
  let log = '';
  child.stdout.on('data', (c) => { log += c; });
  child.stderr.on('data', (c) => { log += c; });
  t.after(async () => {
    child.kill('SIGKILL');
    if (postgres) {
      await admin.query(`DROP SCHEMA ${schema} CASCADE`).catch(() => {});
      await admin.end();
    }
    fs.rmSync(dataDir, { recursive: true, force: true });
  });
  const base = `http://127.0.0.1:${port}`;
  for (let i = 0; ; i += 1) {
    if (child.exitCode !== null) assert.fail(`app exited early:\n${log.slice(-2000)}`);
    if (i > 100) assert.fail(`app did not start:\n${log.slice(-2000)}`);
    try { if ((await fetch(`${base}/api/health`)).ok) break; } catch { /* not up yet */ }
    await new Promise((r) => setTimeout(r, 300));
  }

  if (postgres) await admin.query(`SET search_path TO ${schema}`);
  const q = async (sql, params = []) => {
    if (postgres) return (await admin.query(sql, params)).rows;
    throw new Error('Only PostgreSQL queries supported');
  };
  const worker = async (route, body) => {
    const res = await fetch(`${base}/api/ai-board/worker/${route}`, { method: 'POST', headers: { 'content-type': 'application/json', 'x-ai-worker-key': WORKER_KEY }, body: JSON.stringify(body) });
    return { status: res.status, json: await res.json() };
  };

  // requester registers, gets enrolled, files a request
  const lan = client(base);
  await lan.refreshCsrf();
  const reg = await lan('POST', '/api/auth/register', { username: 'lan_e2e', password: 'secret-pw-1', displayName: 'Lan', role: 'teacher', age: 30, schoolName: 'THPT' });
  assert.ok(reg.status < 300, `register: ${reg.text}`);
  await lan.refreshCsrf();
  // Cold initialization must provide both the SRS parent table and its card-content child.
  const deck = await lan('POST', '/api/srs/decks', {
    name: 'Cold PostgreSQL fixture', cards: [{ front: 'Câu hỏi', back: 'Đáp án' }],
  });
  assert.equal(deck.status, 200, deck.text);
  const decks = await lan('GET', '/api/srs/decks/mine');
  assert.equal(decks.status, 200, decks.text);
  assert.equal(decks.json.items.find((item) => item.id === deck.json.deck_id)?.card_count, 1);
  const domain = 'pharmacy';
  await admin.query(`UPDATE users SET enrolled_domain = $1, grade = 10, major = 'Dược', cohort = 'K1', school_name = 'THPT', age = 16 WHERE username = 'lan_e2e'`, [domain]);
  const created = await lan('POST', '/api/requests', { title: 'Thêm bộ lọc thuốc', detail: 'Lọc theo nhóm thuốc', type: 'feature' }, { 'idempotency-key': 'e2e-request-0001' });
  assert.equal(created.status, 200, created.text);
  assert.equal(created.json.created, true);
  const requestId = created.json.request_id;
  const again = await lan('POST', '/api/requests', { title: 'Thêm bộ lọc thuốc', detail: 'Lọc theo nhóm thuốc', type: 'feature' }, { 'idempotency-key': 'e2e-request-0001' });
  assert.equal(again.json.created, false);
  const list = await lan('GET', `/api/requests?domain=${domain}`);
  assert.equal(list.status, 200, list.text);
  assert.equal(list.json.items.length, 1);
  assert.equal((await lan('GET', `/api/requests/${requestId}/thread`)).status, 200);
  assert.equal((await lan('POST', `/api/requests/${requestId}/messages`, { body: 'Thêm nhóm kháng sinh' })).status, 200);
  assert.equal((await lan('POST', `/api/requests/${requestId}/vote`, {})).json.ok, true);
  assert.equal((await lan('GET', '/api/ai-board/folders?domain=' + domain)).json.mine.length, 1);

  // the worker claims it, opens a run and submits a plan
  const claim = await worker('claim', { worker_id: 'e2e-worker', version: 'e2e', mode: 'active', intent: 'plan' });
  assert.equal(claim.status, 200, JSON.stringify(claim.json));
  assert.ok(claim.json.ticket, 'a ticket was claimed');
  const lease = { worker_id: 'e2e-worker', lease_token: claim.json.ticket.lease_token };
  const ticketId = claim.json.ticket.id;
  const run = await worker(`tickets/${ticketId}/runs`, { ...lease, trigger: 'plan', idempotency_key: 'e2e-run-0001' });
  assert.equal(run.status, 200, JSON.stringify(run.json));
  const step = { order: 1, title: 'Thêm bộ lọc', description: 'x', allowed_scope: ['public/loc-thuoc.html'], acceptance: ['hiển thị'], tests: ['t'], capability: 'public.ui', risk: 'low', non_goals: ['z'] };
  const plan = await worker(`tickets/${ticketId}/plan`, { ...lease, run_id: run.json.run.id, budget_used: 30, idempotency_key: 'e2e-plan-0001',
    plan: { domain, goal: 'Thêm bộ lọc', allowed_scope: step.allowed_scope, acceptance: step.acceptance, tests: step.tests, capabilities: ['public.ui'], risk: 'low', non_goals: ['z'], steps: [step] } });
  assert.equal(plan.status, 200, JSON.stringify(plan.json));

  // Identity and board use PostgreSQL.
  await admin.query(`UPDATE users SET role = 'admin' WHERE username = 'lan_e2e'`);
  await lan.refreshCsrf();
  const queue = await lan('GET', '/api/admin/ai-board/queue');
  assert.equal(queue.status, 200, queue.text);
  assert.equal(queue.json.tickets.length, 1);
  assert.equal(queue.json.workers[0].worker_id, 'e2e-worker');
  const trace = await lan('GET', `/api/admin/ai-board/requests/${requestId}/trace`);
  assert.equal(trace.status, 200, trace.text);
  assert.ok(trace.json.children.length >= 1);
  assert.equal((await lan('GET', '/api/admin/overview')).json.requests, 1);
  assert.equal((await lan('GET', '/api/admin/requests')).json.requests.length, 1);
  assert.equal((await lan('GET', '/api/admin/ai-board/folders')).status, 200);
  assert.equal((await lan('GET', '/api/admin/ai-board/self-improve')).status, 200);
  assert.equal((await lan('POST', `/api/admin/requests/${requestId}/reply`, { message: 'Đã nhận, đang làm', status: 'reviewing' })).status, 200);

  // a new feature folder waits for the admin: approving it authorises the waiting plan and registers the release flag
  assert.equal((await q(`SELECT status FROM ai_tickets WHERE parent_id IS NULL`))[0].status, 'waiting_authorization');
  const folderId = (await lan('GET', '/api/admin/ai-board/folders')).json.folders[0].id;
  assert.equal((await lan('POST', `/api/admin/ai-board/folders/${folderId}/approve`, {})).status, 200);
  assert.equal((await lan('GET', '/api/ai-board/releases')).status, 200);

  // rows really are in PostgreSQL
  assert.equal(Number((await q('SELECT COUNT(*) n FROM requests'))[0].n), 1);
  assert.equal((await q(`SELECT phase FROM ai_tickets WHERE parent_id IS NULL`))[0].phase, 'authorized');
  assert.equal(Number((await q('SELECT COUNT(*) n FROM ai_feature_releases'))[0].n), 1);
  assert.ok(Number((await q('SELECT COUNT(*) n FROM request_messages'))[0].n) >= 2);
  assert.equal((await q(`SELECT role FROM users WHERE username = 'lan_e2e'`))[0].role, 'admin');
});
}
