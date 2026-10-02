// Ảnh bản nháp: backend local/S3 (SigV4), retention, proxy GET.
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import http from 'node:http';
import express from 'express';
import Database from 'better-sqlite3';

import {
  createLocalBackend, createS3Backend, shotBackendFromEnv, purgeExpiredScreenshots, shotProxy, shotKey,
} from '../server/ai-board/shot-storage.js';

const PNG = Buffer.concat([Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]), Buffer.from('x')]);
const DAY = 24 * 3600 * 1000;
const tmp = () => fs.mkdtempSync(path.join(os.tmpdir(), 'shots-'));

test('shotKey: chỉ nhận URL ảnh nháp hợp lệ, chặn traversal', () => {
  assert.equal(shotKey('/uploads/requests/2026-01-02/123-abcdef012345.png'), '2026-01-02/123-abcdef012345.png');
  for (const bad of ['/uploads/requests/../x.png', '/uploads/requests/2026-01-02/../../x.png',
    '/uploads/requests/2026-01-02/123-abcdef012345.svg', '/uploads/requests/2026-01-02/shot.png', '/etc/passwd', null, 5]) {
    assert.equal(shotKey(bad), null, String(bad));
  }
});

test('local backend: put/get/remove, remove thiếu file không lỗi, key lạ bị từ chối', async () => {
  const dir = tmp();
  const b = createLocalBackend(dir);
  const key = '2026-01-02/1-abcdef012345.png';
  await b.put(key, PNG);
  assert.deepEqual(await b.get(key), PNG);
  assert.equal(fs.existsSync(path.join(dir, key)), true);
  await b.remove(key);
  await b.remove(key);
  assert.equal(await b.get(key), null);
  assert.equal(fs.existsSync(path.join(dir, '2026-01-02')), false); // dọn thư mục ngày rỗng
  await assert.rejects(b.put('../evil.png', PNG));
  assert.equal(await b.get('../evil.png'), null);
  await b.remove('../evil.png');
});

async function fakeS3({ missingBucket = false } = {}) {
  const seen = []; const objects = new Map(); let bucketMade = !missingBucket;
  const server = http.createServer((req, res) => {
    const chunks = [];
    req.on('data', (c) => chunks.push(c));
    req.on('end', () => {
      const body = Buffer.concat(chunks);
      seen.push({ method: req.method, url: req.url, headers: req.headers, body });
      const isBucket = req.url.split('/').filter(Boolean).length === 1;
      if (req.method === 'PUT' && isBucket) { bucketMade = true; return res.writeHead(200).end(); }
      if (!bucketMade) return res.writeHead(404, { 'content-type': 'application/xml' }).end('<Error><Code>NoSuchBucket</Code></Error>');
      if (req.method === 'PUT') { objects.set(req.url, body); return res.writeHead(200).end(); }
      if (req.method === 'GET') {
        return objects.has(req.url) ? res.writeHead(200, { 'content-type': 'image/png' }).end(objects.get(req.url)) : res.writeHead(404).end();
      }
      if (req.method === 'DELETE') { objects.delete(req.url); return res.writeHead(204).end(); }
      res.writeHead(405).end();
    });
  });
  await new Promise((r) => server.listen(0, '127.0.0.1', r));
  return { server, seen, objects, endpoint: `http://127.0.0.1:${server.address().port}` };
}
const s3conf = (endpoint) => ({ endpoint, bucket: 'shots', accessKey: 'AKDEV', secretKey: 'SKDEV' });
const AUTH = /^AWS4-HMAC-SHA256 Credential=AKDEV\/\d{8}\/us-east-1\/s3\/aws4_request, SignedHeaders=[a-z0-9;-]+, Signature=[0-9a-f]{64}$/;

test('S3 backend: PUT/GET/DELETE path-style, Authorization dạng SigV4', async () => {
  const s = await fakeS3();
  try {
    const b = createS3Backend(s3conf(s.endpoint));
    const key = '2026-01-02/1-abcdef012345.png';
    await b.put(key, PNG);
    assert.deepEqual(await b.get(key), PNG);
    assert.equal(await b.get('2026-01-02/2-abcdef012345.png'), null);
    await b.remove(key);
    assert.deepEqual(s.seen.filter((x) => !x.url.includes('/2-')).map((x) => [x.method, x.url]),
      [['PUT', `/shots/${key}`], ['GET', `/shots/${key}`], ['DELETE', `/shots/${key}`]]);
    for (const x of s.seen) {
      assert.match(x.headers.authorization, AUTH);
      assert.match(x.headers['x-amz-date'], /^\d{8}T\d{6}Z$/);
      assert.match(x.headers['x-amz-content-sha256'], /^[0-9a-f]{64}$/);
    }
    assert.equal(s.seen[0].headers['x-amz-content-sha256'],
      (await import('node:crypto')).createHash('sha256').update(PNG).digest('hex'));
    assert.equal(s.seen[0].headers['content-type'], 'image/png');
  } finally { s.server.close(); }
});

test('S3 backend: chữ ký khớp botocore S3SigV4Auth (known-answer, giờ cố định)', async () => {
  const RealDate = Date;
  globalThis.Date = class extends RealDate { constructor(...a) { super(...(a.length ? a : [RealDate.UTC(2026, 5, 30, 12)])); } };
  const sigs = [];
  try {
    const b = createS3Backend({ ...s3conf('http://127.0.0.1:9000'),
      fetchImpl: async (_u, o) => { sigs.push(o.headers.authorization.split('Signature=')[1]); return new Response('x', { status: 200 }); } });
    const key = '2026-01-02/1-abcdef012345.png';
    await b.put(key, Buffer.from('\x89PNGdata', 'latin1')); await b.get(key); await b.remove(key);
  } finally { globalThis.Date = RealDate; }
  assert.deepEqual(sigs, ['7dca3c29290e7a59265f44db89424e5c472b26df62e79e7e1537ff1ce16706d8',
    '3ac804e23a206cd318891c2372f274347dde2c112a0a2003cd7b536671855b1b',
    '0632ae2ccd5cd05fa80d815c86d7685df4de9f94f71db75d1ab3c5360d30cc8b']);
});

test('S3 backend: bucket chưa có → tạo rồi thử lại 1 lần', async () => {
  const s = await fakeS3({ missingBucket: true });
  try {
    await createS3Backend(s3conf(s.endpoint)).put('2026-01-02/1-abcdef012345.png', PNG);
    assert.deepEqual(s.seen.map((x) => [x.method, x.url]),
      [['PUT', '/shots/2026-01-02/1-abcdef012345.png'], ['PUT', '/shots'], ['PUT', '/shots/2026-01-02/1-abcdef012345.png']]);
  } finally { s.server.close(); }
});

test('S3 backend: lỗi 5xx khi xoá → ném (để retention giữ attachment, thử lại sau)', async () => {
  const b = createS3Backend({ ...s3conf('http://x.invalid'), fetchImpl: async () => new Response('boom', { status: 500 }) });
  await assert.rejects(b.remove('2026-01-02/1-abcdef012345.png'));
});

test('S3 backend: remove cũng xoá bản local cũ (đổi backend giữa chừng)', async () => {
  const dir = tmp(); const local = createLocalBackend(dir);
  const key = '2026-01-02/1-abcdef012345.png';
  await local.put(key, PNG);
  const s = await fakeS3();
  try {
    await createS3Backend({ ...s3conf(s.endpoint), local }).remove(key);
    assert.equal(await local.get(key), null);
  } finally { s.server.close(); }
});

test('shotBackendFromEnv: S3 chỉ bật khi đủ 4 biến', () => {
  const dir = tmp();
  const full = { AI_BOARD_SHOTS_S3_ENDPOINT: 'http://m:9000', AI_BOARD_SHOTS_S3_BUCKET: 'b',
    AI_BOARD_SHOTS_S3_ACCESS_KEY: 'a', AI_BOARD_SHOTS_S3_SECRET_KEY: 's' };
  assert.equal(shotBackendFromEnv({}, dir).kind, 'local');
  for (const k of Object.keys(full)) assert.equal(shotBackendFromEnv({ ...full, [k]: '' }, dir).kind, 'local', k);
  assert.equal(shotBackendFromEnv(full, dir).kind, 's3');
});

// --- retention ---
function retentionFixture() {
  const db = new Database(':memory:');
  db.exec(`CREATE TABLE request_messages (id INTEGER PRIMARY KEY AUTOINCREMENT, request_id INTEGER NOT NULL, role TEXT NOT NULL,
    author_name TEXT, body TEXT NOT NULL, attachments TEXT, created_at INTEGER NOT NULL)`);
  const dir = tmp(); const backend = createLocalBackend(dir);
  const now = Date.UTC(2026, 5, 30);
  const add = async (role, ageDays, atts, extraFile) => {
    for (const a of atts) { const k = shotKey(a.url); if (k) await backend.put(k, PNG); }
    return db.prepare(`INSERT INTO request_messages(request_id, role, author_name, body, attachments, created_at) VALUES (1, ?, 'x', 'b', ?, ?)`)
      .run(role, JSON.stringify(atts), now - ageDays * DAY).lastInsertRowid;
  };
  const shot = (n) => ({ url: `/uploads/requests/2026-05-01/${n}-abcdef012345.png`, name: 'n', mime: 'image/png', size: 1, kind: 'screenshot' });
  const row = (id) => db.prepare('SELECT * FROM request_messages WHERE id=?').get(id);
  return { db, dir, backend, now, add, shot, row };
}
const exists = (dir, url) => fs.existsSync(path.join(dir, shotKey(url)));

test('retention: ảnh quá hạn bị xoá + gỡ khỏi attachments, tin nhắn giữ, ảnh mới giữ', async () => {
  const f = retentionFixture();
  const old = await f.add('ai', 40, [f.shot(1), f.shot(2)]);
  const fresh = await f.add('ai', 5, [f.shot(3)]);
  const out = await purgeExpiredScreenshots(f.db, f.backend, { days: 30, now: f.now });
  assert.deepEqual(out, { messages: 1, files: 2 });
  assert.equal(f.row(old).body, 'b');
  assert.deepEqual(JSON.parse(f.row(old).attachments), []);
  assert.equal(exists(f.dir, f.shot(1).url), false);
  assert.equal(exists(f.dir, f.shot(2).url), false);
  assert.equal(JSON.parse(f.row(fresh).attachments).length, 1);
  assert.equal(exists(f.dir, f.shot(3).url), true);
  assert.deepEqual(await purgeExpiredScreenshots(f.db, f.backend, { days: 30, now: f.now }), { messages: 0, files: 0 }); // idempotent
});

test('retention: chỉ đụng kind=screenshot của tin role=ai; file khác giữ', async () => {
  const f = retentionFixture();
  const student = await f.add('student', 60, [f.shot(1)]);
  const mixed = await f.add('ai', 60, [f.shot(2), { url: '/uploads/requests/2026-05-01/9-abc.pdf', name: 'a.pdf', mime: 'application/pdf', size: 1, kind: 'file' }]);
  await purgeExpiredScreenshots(f.db, f.backend, { days: 30, now: f.now });
  assert.equal(JSON.parse(f.row(student).attachments).length, 1);
  assert.equal(exists(f.dir, f.shot(1).url), true);
  assert.deepEqual(JSON.parse(f.row(mixed).attachments).map((a) => a.kind), ['file']);
  assert.equal(exists(f.dir, f.shot(2).url), false);
});

test('retention: đường dẫn traversal bị bỏ qua, file ngoài uploads còn nguyên', async () => {
  const f = retentionFixture();
  const outside = path.join(path.dirname(f.dir), `victim-${Date.now()}.png`);
  fs.writeFileSync(outside, PNG);
  try {
    const evil = { url: `/uploads/requests/../${path.basename(outside)}`, name: 'e', mime: 'image/png', size: 1, kind: 'screenshot' };
    const id = await f.add('ai', 60, [evil, { ...evil, url: '/uploads/requests/2026-05-01/../../x.png' }]);
    await purgeExpiredScreenshots(f.db, f.backend, { days: 30, now: f.now });
    assert.equal(fs.existsSync(outside), true);
    assert.equal(JSON.parse(f.row(id).attachments).length, 2);
  } finally { fs.rmSync(outside, { force: true }); }
});

test('retention: file đã mất vẫn gỡ attachment; days=0 tắt; backend lỗi → giữ attachment', async () => {
  const f = retentionFixture();
  const id = await f.add('ai', 60, [f.shot(1)]);
  fs.rmSync(path.join(f.dir, shotKey(f.shot(1).url)));
  assert.equal(await purgeExpiredScreenshots(f.db, f.backend, { days: 0, now: f.now }), null);
  assert.equal(JSON.parse(f.row(id).attachments).length, 1);
  const failing = { ...f.backend, remove: async () => { throw new Error('s3 down'); } };
  assert.deepEqual(await purgeExpiredScreenshots(f.db, failing, { days: 30, now: f.now }), { messages: 0, files: 0 });
  assert.equal(JSON.parse(f.row(id).attachments).length, 1);
  assert.deepEqual(await purgeExpiredScreenshots(f.db, f.backend, { days: 30, now: f.now }), { messages: 1, files: 1 });
  assert.deepEqual(JSON.parse(f.row(id).attachments), []);
});

// --- proxy ---
test('proxy GET: image/png + header như static, miss → next, không liệt kê thư mục', async () => {
  const s = await fakeS3();
  const b = createS3Backend(s3conf(s.endpoint));
  await b.put('2026-01-02/1-abcdef012345.png', PNG);
  const app = express();
  app.use('/uploads/requests', shotProxy(b, (res) => res.setHeader('X-Test', 'same')));
  app.use('/uploads/requests', (_req, res) => res.status(404).send('static-fallthrough'));
  const server = http.createServer(app);
  await new Promise((r) => server.listen(0, '127.0.0.1', r));
  const base = `http://127.0.0.1:${server.address().port}/uploads/requests`;
  try {
    const hit = await fetch(`${base}/2026-01-02/1-abcdef012345.png`);
    assert.equal(hit.status, 200);
    assert.equal(hit.headers.get('content-type'), 'image/png');
    assert.equal(hit.headers.get('x-test'), 'same');
    assert.deepEqual(Buffer.from(await hit.arrayBuffer()), PNG);
    for (const miss of ['/2026-01-02/9-abcdef012345.png', '/2026-01-02/', '/', '/2026-01-02/1-abcdef012345.png/../..%2f']) {
      const r = await fetch(base + miss);
      assert.equal(await r.text(), 'static-fallthrough', miss);
    }
    const post = await fetch(`${base}/2026-01-02/1-abcdef012345.png`, { method: 'POST' });
    assert.equal(await post.text(), 'static-fallthrough');
  } finally { server.close(); s.server.close(); }
});
