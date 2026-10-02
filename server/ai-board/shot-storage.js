// ============================================================
// Kho ảnh bản nháp (drafts.js): backend local | S3-compatible (MinIO) + retention
// ============================================================
// Backend {kind, put(key, buf), get(key) → Buffer|null, remove(key)}; key = "<ngày>/<ts>-<hex12>.png".
// Chỉ stdlib: SigV4 viết tay (PUT/GET/DELETE object, path-style). URL attachment luôn là
// /uploads/requests/<key>, S3 được phục vụ qua shotProxy (index.js mount trước express.static).
// ============================================================
import fs from 'node:fs/promises';
import path from 'node:path';
import { createHash, createHmac } from 'node:crypto';

const KEY_RE = /^\d{4}-\d{2}-\d{2}\/\d+-[0-9a-f]{12}\.png$/; // đúng tên saveDraftScreenshots sinh; FAB upload (base36) không khớp
const URL_PREFIX = '/uploads/requests/';
const DAY_MS = 24 * 3600 * 1000;
const SWEEP_MS = 6 * 3600 * 1000;

/** URL attachment → key, hoặc null nếu không phải ảnh nháp hợp lệ (traversal, đuôi lạ). */
export function shotKey(url) {
  if (typeof url !== 'string' || !url.startsWith(URL_PREFIX)) return null;
  const key = url.slice(URL_PREFIX.length);
  return KEY_RE.test(key) ? key : null;
}

export function createLocalBackend(dir) {
  const root = path.resolve(dir);
  const file = (key) => {
    const p = path.resolve(root, key);
    return KEY_RE.test(key) && p.startsWith(root + path.sep) ? p : null;
  };
  return {
    kind: 'local',
    async put(key, buf) {
      const p = file(key);
      if (!p) throw new Error('invalid screenshot key');
      await fs.mkdir(path.dirname(p), { recursive: true });
      await fs.writeFile(p, buf);
    },
    async get(key) {
      const p = file(key);
      return p ? fs.readFile(p).catch((e) => (e.code === 'ENOENT' ? null : Promise.reject(e))) : null;
    },
    async remove(key) {
      const p = file(key);
      if (!p) return;
      await fs.rm(p, { force: true });
      await fs.rmdir(path.dirname(p)).catch(() => {}); // thư mục ngày rỗng thì dọn, còn file thì thôi
    },
  };
}

const sha256 = (data) => createHash('sha256').update(data).digest('hex');
const hmac = (key, data) => createHmac('sha256', key).update(data).digest();

/** S3-compatible qua fetch + SigV4. `local` (tuỳ chọn): remove xoá luôn bản local cũ từ trước khi bật S3. */
export function createS3Backend({ endpoint, bucket, accessKey, secretKey, region = 'us-east-1', fetchImpl = fetch, local = null }) {
  const base = endpoint.replace(/\/+$/, '');
  async function call(method, pathname, body = Buffer.alloc(0), contentType = null) {
    const url = new URL(base + pathname);
    const amzDate = new Date().toISOString().replace(/[:-]|\.\d{3}/g, ''); // 20260630T120000Z
    const day = amzDate.slice(0, 8);
    const payloadHash = sha256(body);
    const headers = { host: url.host, 'x-amz-content-sha256': payloadHash, 'x-amz-date': amzDate };
    if (contentType) headers['content-type'] = contentType;
    const names = Object.keys(headers).sort();
    const canonical = [method, url.pathname, '', names.map((n) => `${n}:${headers[n]}\n`).join(''), names.join(';'), payloadHash].join('\n');
    const scope = `${day}/${region}/s3/aws4_request`;
    const toSign = ['AWS4-HMAC-SHA256', amzDate, scope, sha256(canonical)].join('\n');
    const signingKey = [day, region, 's3', 'aws4_request'].reduce((k, part) => hmac(k, part), `AWS4${secretKey}`);
    const { host, ...send } = headers; // fetch tự đặt Host
    send.authorization = `AWS4-HMAC-SHA256 Credential=${accessKey}/${scope}, SignedHeaders=${names.join(';')}, Signature=${hmac(signingKey, toSign).toString('hex')}`;
    return fetchImpl(url, { method, headers: send, body: method === 'PUT' ? body : undefined, signal: AbortSignal.timeout(15000) });
  }
  const objectPath = (key) => `/${bucket}/${key}`;
  const fail = async (op, res) => { throw new Error(`s3 ${op} ${res.status}: ${(await res.text()).slice(0, 200)}`); };
  return {
    kind: 's3',
    async put(key, buf) {
      if (!KEY_RE.test(key)) throw new Error('invalid screenshot key');
      let res = await call('PUT', objectPath(key), buf, 'image/png');
      if (res.status === 404) { // bucket chưa có → tạo (idempotent) rồi thử lại 1 lần
        const made = await call('PUT', `/${bucket}`);
        if (!made.ok && made.status !== 409) await fail('create bucket', made);
        res = await call('PUT', objectPath(key), buf, 'image/png');
      }
      if (!res.ok) await fail('put', res);
    },
    async get(key) {
      if (!KEY_RE.test(key)) return null;
      const res = await call('GET', objectPath(key));
      if (res.status === 404) return null;
      if (!res.ok) await fail('get', res);
      return Buffer.from(await res.arrayBuffer());
    },
    async remove(key) {
      if (!KEY_RE.test(key)) return;
      await local?.remove(key);
      const res = await call('DELETE', objectPath(key));
      if (!res.ok && res.status !== 404) await fail('delete', res);
    },
  };
}

/** S3 khi đủ 4 biến AI_BOARD_SHOTS_S3_{ENDPOINT,BUCKET,ACCESS_KEY,SECRET_KEY}; không thì local. */
export function shotBackendFromEnv(env, uploadsDir) {
  const local = createLocalBackend(uploadsDir);
  const [endpoint, bucket, accessKey, secretKey] = ['ENDPOINT', 'BUCKET', 'ACCESS_KEY', 'SECRET_KEY']
    .map((k) => String(env[`AI_BOARD_SHOTS_S3_${k}`] || '').trim());
  if (!(endpoint && bucket && accessKey && secretKey)) return local;
  return createS3Backend({ endpoint, bucket, accessKey, secretKey, region: env.AI_BOARD_SHOTS_S3_REGION || undefined, local });
}

/** Xoá ảnh nháp quá `days` ngày + gỡ khỏi attachments (tin nhắn giữ). days<=0 → null (tắt). Lỗi backend → giữ attachment, lần sau thử lại. */
export async function purgeExpiredScreenshots(db, backend, { days, now = Date.now() }) {
  if (!(days > 0)) return null;
  const rows = db.prepare(`SELECT id, attachments FROM request_messages
    WHERE role='ai' AND created_at < ? AND attachments LIKE '%"screenshot"%'`).all(now - days * DAY_MS);
  const update = db.prepare('UPDATE request_messages SET attachments=? WHERE id=?');
  let messages = 0; let files = 0;
  for (const row of rows) {
    let list;
    try { list = JSON.parse(row.attachments); } catch { continue; }
    if (!Array.isArray(list)) continue;
    const keep = []; let removed = 0;
    for (const att of list) {
      const key = att?.kind === 'screenshot' ? shotKey(att.url) : null;
      if (key) {
        try { await backend.remove(key); removed++; continue; } catch { /* giữ lại, thử lại lần sau */ }
      }
      keep.push(att);
    }
    if (removed) { update.run(JSON.stringify(keep), row.id); messages++; files += removed; }
  }
  return { messages, files };
}

/** Chạy lúc khởi động rồi mỗi 6 h. AI_BOARD_SHOT_RETENTION_DAYS: số ngày giữ ảnh; chưa đặt hoặc 0 = tắt (xoá file là không hoàn tác nên phải chủ động bật). Trả timer hoặc null. */
export function startShotRetention({ db, backend, env = process.env, log = console }) {
  const days = Number(env.AI_BOARD_SHOT_RETENTION_DAYS);
  if (!(days > 0)) return null;
  const sweep = () => purgeExpiredScreenshots(db, backend, { days })
    .then((out) => { if (out?.files) log.info?.(`[ai-board] shot retention: ${out.files} files, ${out.messages} messages`); })
    .catch((e) => log.warn?.(`[ai-board] shot retention error: ${e.message}`));
  sweep();
  return setInterval(sweep, SWEEP_MS).unref?.() ?? null;
}

/** Router handler: GET/HEAD ảnh nháp từ backend (S3). Không khớp/không có → next() cho express.static. */
export function shotProxy(backend, setHeaders) {
  return async (req, res, next) => {
    const key = req.path.slice(1);
    if ((req.method !== 'GET' && req.method !== 'HEAD') || !KEY_RE.test(key)) return next();
    try {
      const buf = await backend.get(key);
      if (!buf) return next();
      setHeaders(res, '.png');
      res.type('image/png').send(buf);
    } catch (e) {
      res.status(502).json({ error: 'storage_unavailable' });
    }
  };
}
