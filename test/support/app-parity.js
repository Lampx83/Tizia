// Boots the real server (server/index.js) on SQLite and on PostgreSQL and replays one scripted HTTP scenario against
// both, so a behaviour change between the two backends shows up as a diff. Volatile values (timestamps, tokens, random
// codes) are normalised before comparing. PostgreSQL needs TEST_PG_URL (throwaway container); each run gets its own schema.
import { spawn } from 'node:child_process';
import { randomBytes } from 'node:crypto';
import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import net from 'node:net';
import { fileURLToPath } from 'node:url';
import pg from 'pg';
import Database from 'better-sqlite3';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');

const freePort = () => new Promise((resolve, reject) => {
  const s = net.createServer();
  s.listen(0, '127.0.0.1', () => { const { port } = s.address(); s.close(() => resolve(port)); });
  s.on('error', reject);
});

async function waitHealthy(base, child, log) {
  for (let i = 0; i < 120; i++) {
    if (child.exitCode != null) throw new Error(`server exited early:\n${log().slice(-3000)}`);
    try { const r = await fetch(`${base}/api/health`); if (r.ok) return; } catch { /* not up yet */ }
    await new Promise((r) => setTimeout(r, 250));
  }
  throw new Error(`server did not start:\n${log().slice(-3000)}`);
}

/** backend: 'sqlite' | 'postgres'. Returns { base, backend, logs, stop, promoteAdmin } */
export async function startApp(backend, extraEnv = {}) {
  const dataDir = mkdtempSync(path.join(tmpdir(), `tizia-parity-${backend}-`));
  const port = await freePort();
  const env = { ...process.env, PORT: String(port), HOST: '127.0.0.1', DATA_DIR: dataDir, NODE_ENV: 'test', ...extraEnv };
  delete env.DATABASE_URL;
  let schema = null;
  let admin = null;
  if (backend === 'postgres') {
    schema = `p_${randomBytes(6).toString('hex')}`;
    admin = new pg.Client({ connectionString: process.env.TEST_PG_URL });
    await admin.connect();
    await admin.query(`CREATE SCHEMA ${schema}`);
    const url = new URL(process.env.TEST_PG_URL);
    url.searchParams.set('options', `-c search_path=${schema}`);
    env.DATABASE_URL = url.toString();
  }
  let out = '';
  const child = spawn(process.execPath, ['server/index.js'], { cwd: ROOT, env, stdio: ['ignore', 'pipe', 'pipe'] });
  child.stdout.on('data', (d) => { out += d; });
  child.stderr.on('data', (d) => { out += d; });
  const base = `http://127.0.0.1:${port}`;
  await waitHealthy(base, child, () => out);
  return {
    base, backend, logs: () => out,
    async stop() {
      child.kill('SIGTERM');
      await new Promise((r) => { child.once('exit', r); setTimeout(r, 3000); });
      if (admin) { await admin.query(`DROP SCHEMA ${schema} CASCADE`).catch(() => {}); await admin.end(); }
      rmSync(dataDir, { recursive: true, force: true });
    },
    async promoteAdmin(username) {
      if (backend === 'postgres') { await admin.query(`UPDATE ${schema}.users SET role='admin' WHERE username=$1`, [username]); return; }
      const raw = new Database(path.join(dataDir, 'tizia.db'));
      try { raw.prepare(`UPDATE users SET role='admin' WHERE username=?`).run(username); } finally { raw.close(); }
    },
  };
}

/** One logged-in browser: cookie jar + csrf header. */
export function makeClient(base) {
  const jar = new Map();
  let csrf = null;
  return async function call(method, url, body, { raw = false } = {}) {
    const headers = { 'content-type': 'application/json' };
    if (jar.size) headers.cookie = [...jar].map(([k, v]) => `${k}=${v}`).join('; ');
    if (csrf) headers['x-csrf-token'] = csrf;
    const res = await fetch(base + url, { method, headers, body: body === undefined ? undefined : JSON.stringify(body), redirect: 'manual' });
    for (const c of res.headers.getSetCookie?.() ?? []) {
      const [pair] = c.split(';');
      const i = pair.indexOf('=');
      const k = pair.slice(0, i); const v = pair.slice(i + 1);
      if (k === 'tizia_csrf') csrf = v;
      if (/Max-Age=0|Expires=Thu, 01 Jan 1970/i.test(c) || v === '') jar.delete(k); else jar.set(k, v);
    }
    const text = await res.text();
    let json = null;
    try { json = JSON.parse(text); } catch { /* not json */ }
    return { status: res.status, json: raw ? undefined : json, text: json === null ? text.slice(0, 300) : undefined };
  };
}

const VOLATILE_KEY = /(^|_)(at|ts|time|token|expires|uptime|rss|heap|now|date|day|since|until|nonce|salt|hash|code|pin|ref|key_id)$|created|updated|^t$|^time$|uptime|_ms$|^iat$|^exp$|^ts$|rss_mb|heap_used_mb|dayKey|today/i;

/** Replace values that legitimately differ between two runs. */
export function normalize(value, key = '') {
  if (Array.isArray(value)) return value.map((v) => normalize(v, key));
  if (value && typeof value === 'object') {
    const out = {};
    for (const k of Object.keys(value).sort()) out[k] = normalize(value[k], k);
    return out;
  }
  if (typeof value === 'number' && (value > 1.5e12 || value > 1e9 && /(^|_)(at|ts|time)$/.test(key))) return '<ts>';
  if (typeof value === 'number' && VOLATILE_KEY.test(key) && value > 1e9) return '<ts>';
  if (typeof value === 'string') {
    if (/^[0-9a-f]{32,}$/i.test(value)) return '<hex>';
    if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/.test(value)) return '<iso>';
    if (VOLATILE_KEY.test(key) && /token|salt|hash|nonce|pin|code/i.test(key)) return '<volatile>';
  }
  return value;
}

/** steps: [{ as, method, path, body, note }]. clients: { name: call }. Runs the same steps on every app; returns per-step results. */
export async function runScenario(apps, steps, mkClients) {
  const clients = new Map(apps.map((a) => [a.backend, mkClients(a)]));
  const results = [];
  for (const step of steps) {
    const entry = { step, byBackend: {} };
    for (const a of apps) {
      const cl = clients.get(a.backend)[step.as || 'anon'];
      const path_ = typeof step.path === 'function' ? step.path(entry, a.backend) : step.path;
      const body = typeof step.body === 'function' ? step.body(entry, a.backend) : step.body;
      entry.byBackend[a.backend] = await cl(step.method || 'GET', path_, body);
      if (step.after) await step.after(entry.byBackend[a.backend], a, entry);
    }
    results.push(entry);
  }
  return results;
}
