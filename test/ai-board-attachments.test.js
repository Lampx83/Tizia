// Request attachments: MIME whitelist, magic-byte check, size cap and download-safe headers, shared by web and board.
import test from 'node:test';
import assert from 'node:assert/strict';
import http from 'node:http';
import { mkdtempSync, readdirSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import express from 'express';

import { attachRequestUpload, attachRequestUploadStatic } from '../server/ai-board/api/attachments.js';

const PNG = Buffer.concat([Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]), Buffer.alloc(64, 1)]);
const PDF = Buffer.concat([Buffer.from('%PDF-1.4\n'), Buffer.alloc(64, 0x20)]);

const dir = mkdtempSync(path.join(tmpdir(), 'tizia-attachments-'));
const pass = (_req, _res, next) => next();
const requireAuth = (req, res, next) => (req.headers['x-test-user'] ? next() : res.status(401).json({ error: 'unauthorized' }));

async function serve() {
  const app = express();
  attachRequestUpload(app, { dir, requireAuth, requireEnrolled: pass });
  attachRequestUploadStatic(app, { dir, shotBackend: { kind: 'local' } });
  app.use(globalErrorHandler);
  const server = http.createServer(app);
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  return { base: `http://127.0.0.1:${server.address().port}`, close: () => new Promise((resolve) => { server.close(resolve); server.closeAllConnections(); }) };
}

// Mirrors the board entry's final error handler: any error that escapes a route becomes internal_error.
const globalErrorHandler = (error, _req, res, _next) => res.status(Number(error?.status) || 500).json({ error: 'internal_error' });

const upload = (base, body, headers = {}) => fetch(`${base}/api/requests/attachments`, {
  method: 'POST', body, headers: { 'x-test-user': '1', ...headers },
});

test('a PNG screenshot is stored under the upload dir and served back with download-safe headers', async () => {
  const app = await serve();
  try {
    const saved = await upload(app.base, PNG, { 'content-type': 'image/png', 'x-filename': 'shot.png', 'x-kind': 'screenshot' });
    assert.equal(saved.status, 200);
    const body = await saved.json();
    assert.equal(body.ok, true);
    assert.equal(body.kind, 'screenshot');
    assert.equal(body.size, PNG.length);
    assert.match(body.url, /^\/uploads\/requests\/\d{4}-\d{2}-\d{2}\/\d+-[a-z0-9]+\.png$/);
    const day = body.url.split('/')[3];
    assert.equal(readdirSync(path.join(dir, day)).length, 1);

    const file = await fetch(`${app.base}${body.url}`);
    assert.equal(file.status, 200);
    assert.equal(file.headers.get('x-content-type-options'), 'nosniff');
    assert.equal(file.headers.get('content-disposition'), null, 'raster images render inline');
    assert.equal(Buffer.from(await file.arrayBuffer()).equals(PNG), true);
  } finally { await app.close(); }
});

test('a PDF is forced to download and sandboxed when served', async () => {
  const app = await serve();
  try {
    const saved = await upload(app.base, PDF, { 'content-type': 'application/pdf', 'x-filename': 'de.pdf' });
    const body = await saved.json();
    assert.equal(saved.status, 200);
    const file = await fetch(`${app.base}${body.url}`);
    assert.equal(file.headers.get('content-disposition'), 'attachment');
    assert.equal(file.headers.get('content-security-policy'), "default-src 'none'; sandbox");
  } finally { await app.close(); }
});

test('MIME outside the whitelist and a body that does not match its MIME are refused', async () => {
  const app = await serve();
  try {
    const svg = await upload(app.base, '<svg onload="x()"/>', { 'content-type': 'image/svg+xml', 'x-filename': 'a.svg' });
    assert.equal(svg.status, 415);
    assert.equal((await svg.json()).error, 'unsupported_media_type');
    const spoofed = await upload(app.base, 'not a png at all', { 'content-type': 'image/png', 'x-filename': 'fake.png' });
    assert.equal(spoofed.status, 415);
    assert.equal((await spoofed.json()).error, 'content_mismatch');
    const empty = await upload(app.base, Buffer.alloc(0), { 'content-type': 'image/png', 'x-filename': 'e.png' });
    assert.equal(empty.status, 400);
  } finally { await app.close(); }
});

test('bodies above 50MB are refused before they reach the disk', async () => {
  const app = await serve();
  try {
    const tooBig = Buffer.alloc(50 * 1024 * 1024 + 1, 1);
    const reply = await upload(app.base, tooBig, { 'content-type': 'application/pdf', 'x-filename': 'big.pdf' });
    assert.equal(reply.status, 413);
  } finally { await app.close(); }
});

test('unauthenticated uploads never reach the handler', async () => {
  const app = await serve();
  try {
    const reply = await fetch(`${app.base}/api/requests/attachments`, { method: 'POST', body: PNG, headers: { 'content-type': 'image/png' } });
    assert.equal(reply.status, 401);
  } finally { await app.close(); }
});

test('a missing upload is a plain 404 and the next request still succeeds', async () => {
  const app = await serve();
  try {
    const saved = await upload(app.base, PNG, { 'content-type': 'image/png', 'x-filename': 'k.png' });
    const { url } = await saved.json();
    const gone = await fetch(`${app.base}/uploads/requests/2000-01-01/missing-file.png`);
    assert.equal(gone.status, 404);
    assert.equal(await gone.text(), 'Not found');
    assert.equal((await fetch(`${app.base}${url}`)).status, 200);
  } finally { await app.close(); }
});

test('static mount over a nonexistent uploads dir answers 404 instead of crashing', async () => {
  const app = express();
  attachRequestUploadStatic(app, { dir: path.join(dir, 'does-not-exist'), shotBackend: { kind: 'local' } });
  app.use(globalErrorHandler);
  const server = http.createServer(app);
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  try {
    const reply = await fetch(`http://127.0.0.1:${server.address().port}/uploads/requests/2026-01-01/a.png`);
    assert.equal(reply.status, 404);
    assert.equal(await reply.text(), 'Not found');
  } finally { await new Promise((resolve) => server.close(resolve)); }
});

test.after(() => { rmSync(dir, { recursive: true, force: true }); });
