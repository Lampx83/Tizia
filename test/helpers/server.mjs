// Khung test tích hợp: dựng DB Postgres RỖNG riêng cho mỗi file test, chạy
// server/index.js thật trên cổng ngẫu nhiên, gọi HTTP như trình duyệt.
//
// Cần một Postgres để TẠO/XOÁ database tạm (KHÔNG BAO GIỜ trỏ vào production):
//   TEST_PG_ADMIN_URL=postgres://tizia@127.0.0.1:55432/postgres npm test
// Thiếu biến → các test tự bỏ qua (skip) chứ không chạy nhầm vào DB nào khác.
import { spawn, execFileSync } from 'node:child_process';
import { randomBytes } from 'node:crypto';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import pg from 'pg';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
export const ADMIN_URL = process.env.TEST_PG_ADMIN_URL || '';
export const SKIP = ADMIN_URL ? false : 'đặt TEST_PG_ADMIN_URL để chạy test tích hợp';

function dbUrl(name) {
  const u = new URL(ADMIN_URL);
  u.pathname = '/' + name;
  return u.toString();
}

async function adminQuery(sql) {
  const c = new pg.Client({ connectionString: ADMIN_URL });
  await c.connect();
  try { return await c.query(sql); } finally { await c.end(); }
}

// Môi trường tối thiểu: KHÔNG kế thừa process.env (tránh mang theo .env/secret,
// DATABASE_URL thật, khoá LLM…) — chỉ PATH/HOME + những gì test truyền vào.
function cleanEnv(extra) {
  return { PATH: process.env.PATH, HOME: process.env.HOME, NODE_ENV: 'test', ...extra };
}

export async function startServer(extraEnv = {}) {
  const name = 'tizia_test_' + randomBytes(5).toString('hex');
  await adminQuery(`CREATE DATABASE ${name}`);
  const DATABASE_URL = dbUrl(name);
  const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), 'tizia-test-'));
  // Chạy schema TRƯỚC khi boot để các attach* lúc khởi động không gặp bảng thiếu.
  execFileSync(process.execPath, ['--input-type=module', '-e',
    "const m = await import('./server/pg.js'); await m.initSchema(); await m.pool.end();"],
  { cwd: ROOT, env: cleanEnv({ DATABASE_URL, DATA_DIR: dataDir }), stdio: 'pipe' });

  const port = 20000 + Math.floor(Math.random() * 20000);
  const logs = [];
  const child = spawn(process.execPath, ['server/index.js'], {
    cwd: ROOT,
    env: cleanEnv({ DATABASE_URL, DATA_DIR: dataDir, PORT: String(port), HOST: '127.0.0.1', ...extraEnv }),
    stdio: ['ignore', 'pipe', 'pipe'],
  });
  child.stdout.on('data', (d) => logs.push(String(d)));
  child.stderr.on('data', (d) => logs.push(String(d)));
  const base = `http://127.0.0.1:${port}`;
  const deadline = Date.now() + 30000;
  for (;;) {
    if (child.exitCode != null) throw new Error('server thoát sớm:\n' + logs.join(''));
    try { const r = await fetch(base + '/api/health'); if (r.ok) break; } catch {}
    if (Date.now() > deadline) throw new Error('server không lên:\n' + logs.join(''));
    await new Promise((r) => setTimeout(r, 200));
  }
  const pool = new pg.Pool({ connectionString: DATABASE_URL, max: 2 });
  return {
    base, logs, pool,
    sql: (text, params) => pool.query(text, params),
    client: () => makeClient(base),
    async stop() {
      child.kill('SIGTERM');
      await new Promise((r) => (child.exitCode != null ? r() : child.once('exit', r)));
      await pool.end();
      await adminQuery(`DROP DATABASE IF EXISTS ${name} WITH (FORCE)`);
      fs.rmSync(dataDir, { recursive: true, force: true });
    },
  };
}

// Client giữ cookie như trình duyệt (1 cookie jar / client).
function makeClient(base) {
  const jar = new Map();
  async function req(method, url, body, headers = {}) {
    const h = { ...headers };
    if (jar.size) h.cookie = [...jar].map(([k, v]) => `${k}=${v}`).join('; ');
    if (body !== undefined) h['content-type'] = 'application/json';
    const r = await fetch(base + url, {
      method, headers: h, redirect: 'manual',
      body: body === undefined ? undefined : JSON.stringify(body),
    });
    for (const c of r.headers.getSetCookie?.() || []) {
      const [kv] = c.split(';');
      const i = kv.indexOf('=');
      const k = kv.slice(0, i).trim(); const v = kv.slice(i + 1).trim();
      if (v === '' || /max-age=0/i.test(c)) jar.delete(k); else jar.set(k, v);
    }
    const text = await r.text();
    let json = null; try { json = JSON.parse(text); } catch {}
    return { status: r.status, json, text, headers: r.headers };
  }
  return {
    jar,
    get: (u, h) => req('GET', u, undefined, h),
    post: (u, b = {}, h) => req('POST', u, b, h),
    // Đăng ký tài khoản (mặc định: sinh viên ngành Dược, 20 tuổi).
    async register(username, opts = {}) {
      const body = { username, password: 'matkhau123', displayName: username, role: 'student', age: 20, major: 'pharmacy', ...opts };
      const r = await req('POST', '/api/auth/register', body);
      return r;
    },
  };
}

// Tạo user đã đăng nhập; role 'admin' được nâng quyền bằng SQL trực tiếp trên DB tạm.
export async function loginAs(srv, username, opts = {}) {
  const c = srv.client();
  const { role, ...rest } = opts;
  const regRole = role === 'admin' ? 'teacher' : role;
  const r = await c.register(username, regRole ? { role: regRole, ...rest } : rest);
  if (r.status !== 200) throw new Error(`register ${username} lỗi ${r.status}: ${r.text}`);
  c.user = r.json.user;
  if (role === 'admin') await srv.sql(`UPDATE users SET role='admin' WHERE id=$1`, [c.user.id]);
  return c;
}
