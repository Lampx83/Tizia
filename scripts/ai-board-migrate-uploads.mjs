#!/usr/bin/env node
// Copy web request uploads (<web DATA_DIR>/uploads/requests) to the board uploads dir. Dry-run unless --apply. Never deletes source.
// Usage: node scripts/ai-board-migrate-uploads.mjs --from <web DATA_DIR> [--to <dir>] [--apply]
// S3 shots: node scripts/ai-board-migrate-uploads.mjs --s3 [--apply]  (src AI_BOARD_SHOTS_SRC_S3_*, dst AI_BOARD_SHOTS_S3_*; DATABASE_URL = web DB → only referenced keys, else whole source bucket)
import fs from 'node:fs/promises';
import { createHash } from 'node:crypto';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { createS3Backend, shotKey } from '../server/ai-board/repositories/shot-storage.js';
import { listObjects, referencedKeys } from './audit-s3-objects.mjs';

const sha256 = async (file) => createHash('sha256').update(await fs.readFile(file)).digest('hex');

async function listFiles(root, rel = '') {
  const out = [];
  for (const name of await fs.readdir(path.join(root, rel))) {
    const entry = path.join(rel, name);
    const st = await fs.lstat(path.join(root, entry));
    if (st.isDirectory()) out.push(...await listFiles(root, entry));
    else if (st.isFile()) out.push({ rel: entry, size: st.size });
  }
  return out;
}

const overlaps = (a, b) => a === b || a.startsWith(b + path.sep) || b.startsWith(a + path.sep);

/** Copy missing files src→dst; same size+sha256 skipped, differing files reported as conflicts, never overwritten. */
export async function migrateUploads({ from, to, apply = false }) {
  const src = path.resolve(from);
  const dst = path.resolve(to);
  if (overlaps(src, dst)) throw new Error(`source and destination overlap: ${src} / ${dst}`);
  const files = await listFiles(src).catch((e) => {
    if (e.code === 'ENOENT') throw new Error(`source not found: ${src}`);
    throw e;
  });
  const out = { apply, scanned: files.length, pending: 0, copied: 0, skipped: 0, bytes: 0, conflicts: [], errors: [] };
  for (const { rel, size } of files) {
    const target = path.join(dst, rel);
    const existing = await fs.stat(target).catch((e) => (e.code === 'ENOENT' ? null : Promise.reject(e)));
    if (existing) {
      const same = existing.size === size && await sha256(path.join(src, rel)) === await sha256(target);
      if (same) out.skipped++;
      else out.conflicts.push(rel);
      continue;
    }
    if (!apply) {
      out.pending++;
      continue;
    }
    try {
      await fs.mkdir(path.dirname(target), { recursive: true });
      const part = `${target}.part`;
      await fs.copyFile(path.join(src, rel), part);
      await fs.rename(part, target);
      out.copied++;
      out.bytes += size;
    } catch (e) {
      out.errors.push({ rel, message: e.message });
    }
  }
  return out;
}

/** Copy shot objects src→dst backend by key; identical skipped, differing = conflict (never overwritten), absent in src = missing. Never deletes. */
export async function migrateShots({ src, dst, keys, apply = false }) {
  const out = { apply, scanned: keys.length, pending: 0, copied: 0, skipped: 0, bytes: 0, conflicts: [], missing: [], errors: [] };
  for (const key of keys) {
    try {
      const body = await src.get(key);
      if (!body) { out.missing.push(key); continue; }
      const existing = await dst.get(key);
      if (existing) {
        if (existing.equals(body)) out.skipped++;
        else out.conflicts.push(key);
        continue;
      }
      if (!apply) { out.pending++; continue; }
      await dst.put(key, body);
      out.copied++;
      out.bytes += body.length;
    } catch (e) {
      out.errors.push({ key, message: e.message });
    }
  }
  return out;
}

/** Source: AI_BOARD_SHOTS_SRC_S3_* (web storage); destination: AI_BOARD_SHOTS_S3_* (board storage). */
export function shotBackendsFromEnv(env) {
  const read = (prefix) => ['ENDPOINT', 'BUCKET', 'ACCESS_KEY', 'SECRET_KEY'].map((k) => String(env[`${prefix}${k}`] || '').trim());
  const make = (prefix) => {
    const [endpoint, bucket, accessKey, secretKey] = read(prefix);
    if (!(endpoint && bucket && accessKey && secretKey)) throw new Error(`set ${prefix}{ENDPOINT,BUCKET,ACCESS_KEY,SECRET_KEY}`);
    return createS3Backend({ endpoint, bucket, accessKey, secretKey, region: env[`${prefix}REGION`] || undefined });
  };
  const [sEndpoint, sBucket] = read('AI_BOARD_SHOTS_SRC_S3_');
  const [dEndpoint, dBucket] = read('AI_BOARD_SHOTS_S3_');
  const src = make('AI_BOARD_SHOTS_SRC_S3_');
  const dst = make('AI_BOARD_SHOTS_S3_');
  if (sEndpoint.replace(/\/+$/, '') === dEndpoint.replace(/\/+$/, '') && sBucket === dBucket) throw new Error('source and destination share the same endpoint and bucket');
  return { src, dst };
}

/** Keys the web DB references (SRC DATABASE_URL set), else every valid shot key in the source bucket. */
async function discoverKeys(env, srcBackend) {
  if (env.DATABASE_URL) {
    const client = new (await import('pg')).default.Client({ connectionString: env.DATABASE_URL });
    await client.connect();
    try { return (await referencedKeys(client)).keys; } finally { await client.end(); }
  }
  return (await listObjects(srcBackend, String(env.AI_BOARD_SHOTS_SRC_S3_BUCKET).trim())).map((o) => o.key).filter((k) => shotKey(`/uploads/requests/${k}`));
}

function parseArgs(argv) {
  const args = { from: '', to: '', apply: false, s3: false };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--apply') args.apply = true;
    else if (a === '--s3') args.s3 = true;
    else if (a === '--from') args.from = argv[++i] || '';
    else if (a === '--to') args.to = argv[++i] || '';
    else throw new Error(`unknown argument: ${a}`);
  }
  return args;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.s3) {
    const { src, dst } = shotBackendsFromEnv(process.env);
    const keys = await discoverKeys(process.env, src);
    const out = await migrateShots({ src, dst, keys, apply: args.apply });
    for (const key of out.conflicts) console.log(`conflict: ${key} (destination differs, not overwritten)`);
    for (const key of out.missing) console.log(`missing: ${key} (not in source)`);
    for (const e of out.errors) console.log(`error: ${e.key}: ${e.message}`);
    console.log(`${args.apply ? 'apply' : 'dry-run'} s3 scanned=${out.scanned} copied=${out.copied} pending=${out.pending} `
      + `skipped=${out.skipped} conflicts=${out.conflicts.length} missing=${out.missing.length} errors=${out.errors.length} bytes=${out.bytes}`);
    if (!args.apply) console.log('dry-run: nothing copied; rerun with --apply');
    process.exitCode = out.conflicts.length || out.errors.length ? 1 : 0;
    return;
  }
  if (!args.from) throw new Error('--from <web DATA_DIR> is required');
  const env = process.env;
  const to = args.to || env.AI_BOARD_UPLOADS_DIR || path.join(env.DATA_DIR || '/data', 'uploads', 'requests');
  const out = await migrateUploads({ from: path.join(args.from, 'uploads', 'requests'), to, apply: args.apply });
  for (const rel of out.conflicts) console.log(`conflict: ${rel} (destination differs, not overwritten)`);
  for (const e of out.errors) console.log(`error: ${e.rel}: ${e.message}`);
  console.log(`${args.apply ? 'apply' : 'dry-run'} scanned=${out.scanned} copied=${out.copied} pending=${out.pending} `
    + `skipped=${out.skipped} conflicts=${out.conflicts.length} errors=${out.errors.length} bytes=${out.bytes}`);
  if (!args.apply) console.log('dry-run: nothing copied; rerun with --apply');
  process.exitCode = out.conflicts.length || out.errors.length ? 1 : 0;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch((e) => {
    console.error(`ai-board-migrate-uploads: ${e.message}`);
    process.exitCode = 1;
  });
}
