// Web -> board S3 shot migration against a fake in-memory S3 (no network): dry-run, apply, idempotent, never deletes.
import test from 'node:test';
import assert from 'node:assert/strict';
import { createS3Backend } from '../server/ai-board/repositories/shot-storage.js';
import { migrateShots, shotBackendsFromEnv } from '../scripts/ai-board-migrate-uploads.mjs';

/** Minimal S3: PUT/GET/DELETE object + ListObjectsV2, path-style. Records every method. */
function fakeS3() {
  const objects = new Map(); const methods = [];
  const fetchImpl = async (url, init = {}) => {
    const u = new URL(url); const method = init.method || 'GET'; methods.push(method);
    const [, bucket, ...rest] = u.pathname.split('/'); const key = rest.join('/');
    if (method === 'GET' && !key && u.searchParams.get('list-type') === '2') {
      const items = [...objects].map(([k, v]) => `<Contents><Key>${k}</Key><Size>${v.length}</Size><ETag>"x"</ETag></Contents>`).join('');
      return new Response(`<ListBucketResult><IsTruncated>false</IsTruncated>${items}</ListBucketResult>`, { status: 200 });
    }
    if (method === 'PUT') { objects.set(key, Buffer.from(init.body)); return new Response('', { status: 200 }); }
    if (method === 'GET') return objects.has(key) ? new Response(objects.get(key), { status: 200 }) : new Response('', { status: 404 });
    if (method === 'DELETE') { objects.delete(key); return new Response('', { status: 204 }); }
    return new Response('', { status: 400 });
  };
  return { objects, methods, backend: createS3Backend({ endpoint: 'http://s3.test', bucket: 'shots', accessKey: 'a', secretKey: 's', fetchImpl }) };
}

const K1 = '2026-10-01/111-aaaaaaaaaaaa.png';
const K2 = '2026-10-02/222-bbbbbbbbbbbb.png';
const K3 = '2026-10-02/333-cccccccccccc.png';

function seeded() {
  const src = fakeS3(); const dst = fakeS3();
  src.objects.set(K1, Buffer.from('png-1')); src.objects.set(K2, Buffer.from('png-2'));
  return { src, dst };
}

test('dry-run reports pending and writes nothing', async () => {
  const { src, dst } = seeded();
  const out = await migrateShots({ src: src.backend, dst: dst.backend, keys: [K1, K2], apply: false });
  assert.deepEqual([out.scanned, out.pending, out.copied, out.skipped], [2, 2, 0, 0]);
  assert.equal(dst.objects.size, 0);
  assert.equal(dst.methods.includes('PUT'), false);
});

test('apply copies, rerun is idempotent, source is never deleted', async () => {
  const { src, dst } = seeded();
  const out = await migrateShots({ src: src.backend, dst: dst.backend, keys: [K1, K2], apply: true });
  assert.deepEqual([out.copied, out.errors.length, out.bytes], [2, 0, 10]);
  assert.deepEqual(dst.objects.get(K1), Buffer.from('png-1'));
  const putsBefore = dst.methods.filter((m) => m === 'PUT').length;
  const again = await migrateShots({ src: src.backend, dst: dst.backend, keys: [K1, K2], apply: true });
  assert.deepEqual([again.copied, again.skipped], [0, 2]);
  assert.equal(dst.methods.filter((m) => m === 'PUT').length, putsBefore);
  assert.equal(src.objects.size, 2);
  for (const side of [src, dst]) assert.equal(side.methods.includes('DELETE'), false);
});

test('differing destination object is a conflict and is not overwritten; missing source is reported', async () => {
  const { src, dst } = seeded();
  dst.objects.set(K1, Buffer.from('different'));
  const out = await migrateShots({ src: src.backend, dst: dst.backend, keys: [K1, K2, K3], apply: true });
  assert.deepEqual(out.conflicts, [K1]);
  assert.deepEqual(out.missing, [K3]);
  assert.deepEqual(out.copied, 1);
  assert.deepEqual(dst.objects.get(K1), Buffer.from('different'));
});

test('destination failure on one key is an error, others still copy', async () => {
  const { src, dst } = seeded();
  const put = dst.backend.put;
  dst.backend.put = async (key, buf) => { if (key === K1) throw new Error('s3 put 503'); return put(key, buf); };
  const out = await migrateShots({ src: src.backend, dst: dst.backend, keys: [K1, K2], apply: true });
  assert.deepEqual([out.copied, out.errors.map((e) => e.key)], [1, [K1]]);
});

test('backends come from env: source has its own prefix, destination uses the board config', () => {
  assert.throws(() => shotBackendsFromEnv({}), /AI_BOARD_SHOTS_SRC_S3_/);
  const env = {};
  for (const k of ['ENDPOINT', 'BUCKET', 'ACCESS_KEY', 'SECRET_KEY']) { env[`AI_BOARD_SHOTS_SRC_S3_${k}`] = 'src'; env[`AI_BOARD_SHOTS_S3_${k}`] = 'dst'; }
  env.AI_BOARD_SHOTS_SRC_S3_ENDPOINT = 'http://a.test'; env.AI_BOARD_SHOTS_S3_ENDPOINT = 'http://a.test';
  env.AI_BOARD_SHOTS_SRC_S3_BUCKET = 'same'; env.AI_BOARD_SHOTS_S3_BUCKET = 'same';
  assert.throws(() => shotBackendsFromEnv(env), /same endpoint and bucket/);
  env.AI_BOARD_SHOTS_S3_BUCKET = 'other';
  const { src, dst } = shotBackendsFromEnv(env);
  assert.deepEqual([src.kind, dst.kind], ['s3', 's3']);
});
