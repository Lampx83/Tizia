#!/usr/bin/env node
// Audit object S3/SeaweedFS của ảnh bản nháp: liệt kê bucket, đối chiếu key mà DB tham chiếu, ghi báo cáo JSON.
//   node scripts/audit-s3-objects.mjs OUT.json              (env: AI_BOARD_SHOTS_S3_{ENDPOINT,BUCKET,ACCESS_KEY,SECRET_KEY}[,_REGION], DATABASE_URL)
//   node scripts/audit-s3-objects.mjs compare BEFORE.json AFTER.json   (exit 1 nếu object mất/đổi)
// Chỉ đọc (GET); không in endpoint/khoá/DSN.
import fs from 'node:fs';
import { createHash } from 'node:crypto';
import { pathToFileURL } from 'node:url';
import { createS3Backend, shotKey } from '../server/ai-board/repositories/shot-storage.js';

const tag = (xml, name) => [...xml.matchAll(new RegExp(`<${name}>([\\s\\S]*?)</${name}>`, 'g'))].map((m) => m[1]);
const first = (xml, name) => tag(xml, name)[0];
const unesc = (s) => s.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&apos;/g, "'").replace(/&amp;/g, '&');
const q = encodeURIComponent;

async function getXml(s3, bucket, query) {
  const res = await s3.request('GET', `/${bucket}?${query}`);
  return { status: res.status, xml: await res.text() };
}

/** ListObjectsV2 phân trang → [{key,size,etag}] sắp theo key. */
export async function listObjects(s3, bucket) {
  const out = []; let token = '';
  for (;;) {
    const { status, xml } = await getXml(s3, bucket, `list-type=2${token ? `&continuation-token=${q(token)}` : ''}`);
    if (status !== 200) throw new Error(`list objects HTTP ${status}`);
    for (const c of tag(xml, 'Contents')) {
      out.push({ key: unesc(first(c, 'Key')), size: Number(first(c, 'Size')), etag: unesc(first(c, 'ETag') || '').replace(/"/g, '') });
    }
    if (first(xml, 'IsTruncated') !== 'true') break;
    token = unesc(first(xml, 'NextContinuationToken') || '');
    if (!token) break;
  }
  return out.sort((a, b) => (a.key < b.key ? -1 : a.key > b.key ? 1 : 0));
}

/** Versioning: trạng thái bucket + đếm version/delete marker nếu endpoint hỗ trợ ListObjectVersions. */
export async function inspectVersions(s3, bucket) {
  const cfg = await getXml(s3, bucket, 'versioning');
  const state = cfg.status === 200 ? (first(cfg.xml, 'Status') || 'Unset') : 'Unsupported';
  const info = { versioning: state, listVersionsSupported: false, versions: 0, nonCurrent: 0, deleteMarkers: 0 };
  let keyMarker = ''; let vidMarker = '';
  for (;;) {
    const { status, xml } = await getXml(s3, bucket, `versions${keyMarker ? `&key-marker=${q(keyMarker)}` : ''}${vidMarker ? `&version-id-marker=${q(vidMarker)}` : ''}`);
    if (status !== 200) return info;
    info.listVersionsSupported = true;
    const versions = tag(xml, 'Version');
    info.versions += versions.length;
    info.nonCurrent += versions.filter((v) => first(v, 'IsLatest') === 'false').length;
    info.deleteMarkers += tag(xml, 'DeleteMarker').length;
    if (first(xml, 'IsTruncated') !== 'true') return info;
    keyMarker = unesc(first(xml, 'NextKeyMarker') || ''); vidMarker = unesc(first(xml, 'NextVersionIdMarker') || '');
    if (!keyMarker) return info;
  }
}

/** Key ảnh nháp mà request_messages.attachments tham chiếu (cùng điều kiện purgeExpiredScreenshots). */
export async function referencedKeys(client) {
  const { rows } = await client.query(`SELECT attachments FROM request_messages WHERE attachments LIKE '%"screenshot"%'`);
  const keys = new Set(); let unparsable = 0; let nonKey = 0;
  for (const row of rows) {
    let list;
    try { list = JSON.parse(row.attachments); } catch { unparsable++; continue; }
    for (const att of Array.isArray(list) ? list : []) {
      if (att?.kind !== 'screenshot') continue;
      const key = shotKey(att.url);
      if (key) keys.add(key); else nonKey++;
    }
  }
  return { keys: [...keys].sort(), unparsableRows: unparsable, nonKeyScreenshots: nonKey };
}

export async function buildReport(s3, bucket, client, now = new Date()) {
  const objects = await listObjects(s3, bucket);
  const versions = await inspectVersions(s3, bucket);
  const refs = await referencedKeys(client);
  const inBucket = new Set(objects.map((o) => o.key));
  const referenced = new Set(refs.keys);
  const lines = objects.map((o) => `${o.key}\t${o.size}\t${o.etag}`).join('\n');
  return {
    generatedAt: now.toISOString(),
    counts: { objects: objects.length, bytes: objects.reduce((n, o) => n + o.size, 0), referenced: refs.keys.length,
      unparsableRows: refs.unparsableRows, nonKeyScreenshots: refs.nonKeyScreenshots },
    digest: createHash('sha256').update(lines).digest('hex'),
    versions,
    missingInBucket: refs.keys.filter((k) => !inBucket.has(k)),
    orphanedInBucket: objects.filter((o) => !referenced.has(o.key)).map((o) => o.key),
    objects,
  };
}

/** before/after → {lost, added, changed, ...}; ok=false nếu object cũ mất hoặc đổi size/etag. */
export function compareReports(before, after) {
  const prev = new Map(before.objects.map((o) => [o.key, o])); const next = new Map(after.objects.map((o) => [o.key, o]));
  const lost = [...prev.keys()].filter((k) => !next.has(k));
  const added = [...next.keys()].filter((k) => !prev.has(k));
  const changed = [...prev].filter(([k, o]) => next.has(k) && (next.get(k).size !== o.size || next.get(k).etag !== o.etag)).map(([k]) => k);
  const newlyMissing = after.missingInBucket.filter((k) => !before.missingInBucket.includes(k));
  return { ok: !lost.length && !changed.length && !newlyMissing.length, sameDigest: before.digest === after.digest,
    objects: [before.counts.objects, after.counts.objects], versioning: [before.versions.versioning, after.versions.versioning],
    nonCurrent: [before.versions.nonCurrent, after.versions.nonCurrent], lost, added, changed, newlyMissing };
}

async function main(argv, env) {
  if (argv[0] === 'compare') {
    if (argv.length !== 3) throw new Error('usage: compare BEFORE.json AFTER.json');
    const [before, after] = argv.slice(1).map((f) => JSON.parse(fs.readFileSync(f, 'utf8')));
    const result = compareReports(before, after);
    console.log(JSON.stringify(result, null, 2));
    return result.ok ? 0 : 1;
  }
  if (argv.length !== 1) throw new Error('usage: audit-s3-objects.mjs OUT.json | compare BEFORE.json AFTER.json');
  const [endpoint, bucket, accessKey, secretKey] = ['ENDPOINT', 'BUCKET', 'ACCESS_KEY', 'SECRET_KEY'].map((k) => String(env[`AI_BOARD_SHOTS_S3_${k}`] || '').trim());
  if (!(endpoint && bucket && accessKey && secretKey)) throw new Error('set AI_BOARD_SHOTS_S3_{ENDPOINT,BUCKET,ACCESS_KEY,SECRET_KEY}');
  const s3 = createS3Backend({ endpoint, bucket, accessKey, secretKey, region: env.AI_BOARD_SHOTS_S3_REGION || undefined });
  // No DATABASE_URL: list the bucket only (no reference check; every object then shows as orphaned).
  const noDb = !env.DATABASE_URL;
  const client = noDb ? { query: async () => ({ rows: [] }), end: async () => {} } : new (await import('pg')).default.Client({ connectionString: env.DATABASE_URL });
  if (!noDb) await client.connect();
  try {
    const report = await buildReport(s3, bucket, client);
    fs.writeFileSync(argv[0], JSON.stringify(report, null, 2));
    const { objects: _omit, ...summary } = report;
    console.log(JSON.stringify({ ...summary, missingInBucket: report.missingInBucket.length, orphanedInBucket: report.orphanedInBucket.length, wrote: argv[0] }, null, 2));
  } finally { await client.end(); }
  return 0;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main(process.argv.slice(2), process.env).then((code) => { process.exitCode = code; }, (e) => { console.error(`audit-s3-objects: ${e.message}`); process.exitCode = 2; });
}
