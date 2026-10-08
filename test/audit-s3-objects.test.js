// audit-s3-objects: fake S3 HTTP (list v2 phân trang, versions, versioning) + client DB giả; không mạng ngoài.
import test from 'node:test';
import assert from 'node:assert/strict';
import http from 'node:http';
import { createS3Backend } from '../server/ai-board/repositories/shot-storage.js';
import { buildReport, compareReports } from '../scripts/audit-s3-objects.mjs';

const K1 = '2026-01-02/1-aaaaaaaaaaaa.png'; const K2 = '2026-01-02/2-bbbbbbbbbbbb.png'; const K3 = '2026-01-03/3-cccccccccccc.png';
const objs = [[K1, 10, 'e1'], [K2, 20, 'e2'], [K3, 30, 'e3']];

function fakeS3({ versions = true } = {}) {
  const queries = [];
  const server = http.createServer((req, res) => {
    const u = new URL(req.url, 'http://x'); queries.push(u.search);
    if (!req.headers.authorization?.startsWith('AWS4-HMAC-SHA256')) { res.statusCode = 403; return res.end(); }
    if (u.searchParams.has('versioning')) return res.end('<VersioningConfiguration><Status>Enabled</Status></VersioningConfiguration>');
    if (u.searchParams.has('versions')) {
      if (!versions) { res.statusCode = 501; return res.end(); }
      return res.end(`<ListVersionsResult><IsTruncated>false</IsTruncated><Version><Key>${K1}</Key><IsLatest>true</IsLatest></Version><Version><Key>${K1}</Key><IsLatest>false</IsLatest></Version><DeleteMarker><Key>${K2}</Key></DeleteMarker></ListVersionsResult>`);
    }
    const page2 = u.searchParams.get('continuation-token') === 'tok/+=';
    const rows = page2 ? objs.slice(2) : objs.slice(0, 2);
    res.end(`<ListBucketResult><IsTruncated>${page2 ? 'false' : 'true'}</IsTruncated>${page2 ? '' : '<NextContinuationToken>tok/+=</NextContinuationToken>'}${rows.map(([k, s, e]) => `<Contents><Key>${k}</Key><Size>${s}</Size><ETag>&quot;${e}&quot;</ETag></Contents>`).join('')}</ListBucketResult>`);
  });
  return new Promise((r) => server.listen(0, '127.0.0.1', () => r({ server, queries, url: `http://127.0.0.1:${server.address().port}` })));
}
const db = (keys, extra = []) => ({ query: async () => ({ rows: [{ attachments: JSON.stringify(keys.map((k) => ({ kind: 'screenshot', url: `/uploads/requests/${k}` })).concat(extra)) }] }) });
const s3for = (url) => createS3Backend({ endpoint: url, bucket: 'b', accessKey: 'ak', secretKey: 'sk' });

test('report: counts, missing, orphaned, versioning, pagination + signed query; compare flags loss', async () => {
  const s = await fakeS3();
  try {
    const before = await buildReport(s3for(s.url), 'b', db([K1, K2, '2026-01-09/9-ffffffffffff.png'], [{ kind: 'screenshot', url: '/x.png' }]));
    assert.deepEqual(before.counts, { objects: 3, bytes: 60, referenced: 3, unparsableRows: 0, nonKeyScreenshots: 1 });
    assert.deepEqual(before.missingInBucket, ['2026-01-09/9-ffffffffffff.png']);
    assert.deepEqual(before.orphanedInBucket, [K3]);
    assert.deepEqual(before.versions, { versioning: 'Enabled', listVersionsSupported: true, versions: 2, nonCurrent: 1, deleteMarkers: 1 });
    assert.ok(s.queries.some((x) => x.includes('continuation-token=tok%2F%2B%3D')));
    assert.equal(compareReports(before, before).ok, true);
    const after = { ...before, objects: before.objects.filter((o) => o.key !== K2).map((o) => (o.key === K3 ? { ...o, etag: 'zz' } : o)) };
    const c = compareReports(before, after);
    assert.deepEqual([c.ok, c.lost, c.changed], [false, [K2], [K3]]);
  } finally { s.server.close(); }
});

test('endpoint without ListObjectVersions: reported unsupported, no throw', async () => {
  const s = await fakeS3({ versions: false });
  try {
    const r = await buildReport(s3for(s.url), 'b', db([]));
    assert.equal(r.versions.listVersionsSupported, false);
  } finally { s.server.close(); }
});
