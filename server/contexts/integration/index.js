// ============================================================
// Integration context — Outbox pattern + webhook dispatcher (#3 nhiều API)
// ============================================================
// Để tích hợp NHIỀU API bên ngoài một cách tin cậy: thay vì gọi HTTP trực tiếp
// trong request (dễ mất event khi vendor lỗi), ta GHI event vào outbox (cùng
// transaction nghiệp vụ) rồi 1 dispatcher nền gửi đi với retry + backoff + chữ ký.
//   enqueueEvent(type, payload) → fan-out tới webhook_endpoints
//   dispatcher: poll pending → POST (HMAC-SHA256) → delivered | retry | dead
//
// Đây là chiều OUT (Tizia → vendor). Chiều IN (vendor → Tizia) đã có
// webhook_inbox ở payment context (idempotency). Hai chiều tạo Integration Hub.
// ============================================================

import { createHmac, randomBytes } from 'node:crypto';
import { db } from '../../db.js';

const listEndpointsStmt = db.prepare(`SELECT * FROM webhook_endpoints WHERE active = 1`);
const listEndpointsAllStmt = db.prepare(`SELECT id, url, event_types, active, created_at FROM webhook_endpoints ORDER BY created_at DESC`);
const insertEndpointStmt = db.prepare(`
  INSERT INTO webhook_endpoints (url, secret, event_types, active, created_at)
  VALUES (@url, @secret, @event_types, 1, @t) RETURNING id
`);
const insertOutboxStmt = db.prepare(`
  INSERT INTO outbox_events (event_type, payload, endpoint_url, endpoint_secret, max_attempts, next_attempt_at, created_at, updated_at)
  VALUES (@event_type, @payload, @endpoint_url, @endpoint_secret, @max_attempts, @t, @t, @t)
`);
const dueStmt = db.prepare(`
  SELECT * FROM outbox_events WHERE status = 'pending' AND next_attempt_at <= @now
  ORDER BY next_attempt_at LIMIT @limit
`);
const markDeliveredStmt = db.prepare(`UPDATE outbox_events SET status='delivered', attempts=attempts+1, updated_at=@t WHERE id=@id`);
const markRetryStmt = db.prepare(`UPDATE outbox_events SET attempts=attempts+1, next_attempt_at=@next, last_error=@err, updated_at=@t WHERE id=@id`);
const markDeadStmt = db.prepare(`UPDATE outbox_events SET status='dead', attempts=attempts+1, last_error=@err, updated_at=@t WHERE id=@id`);
const recentOutboxStmt = db.prepare(`
  SELECT id, event_type, endpoint_url, status, attempts, max_attempts, next_attempt_at, last_error, created_at
  FROM outbox_events ORDER BY created_at DESC LIMIT @limit
`);

function sign(payload, secret) {
  return createHmac('sha256', secret).update(payload, 'utf8').digest('hex');
}

/** Đăng ký 1 webhook endpoint. Trả secret để vendor xác minh chữ ký. */
export async function registerEndpoint({ url, event_types = null }) {
  const secret = 'whsec_' + randomBytes(24).toString('hex');
  const info = await insertEndpointStmt.run({
    url: String(url), secret,
    event_types: event_types ? String(event_types) : null, t: Date.now(),
  });
  return { id: info.lastInsertRowid, secret };
}

/** Phát 1 event tới MỌI endpoint đang active (fan-out vào outbox). */
export async function enqueueEvent(event_type, payloadObj) {
  const endpoints = await listEndpointsStmt.all();
  const payload = JSON.stringify({ type: event_type, data: payloadObj, ts: Date.now() });
  let queued = 0;
  for (const ep of endpoints) {
    if (ep.event_types && !ep.event_types.split(',').map((s) => s.trim()).includes(event_type)) continue;
    await insertOutboxStmt.run({
      event_type, payload,
      endpoint_url: ep.url, endpoint_secret: ep.secret, max_attempts: 6, t: Date.now(),
    });
    queued++;
  }
  return { queued };
}

// ── Dispatcher: gửi event đang đến hạn, retry backoff luỹ thừa ──
const BACKOFF_MS = [0, 5_000, 30_000, 120_000, 600_000, 3_600_000]; // 0s,5s,30s,2m,10m,1h
let _dispatching = false;

export async function dispatchOutboxOnce(limit = 20, fetchImpl = fetch) {
  if (_dispatching) return { skipped: true };
  _dispatching = true;
  let delivered = 0, retried = 0, dead = 0;
  try {
    const due = await dueStmt.all({ now: Date.now(), limit });
    for (const ev of due) {
      const sig = sign(ev.payload, ev.endpoint_secret);
      try {
        const ctrl = new AbortController();
        const tid = setTimeout(() => ctrl.abort(), 10_000);
        const res = await fetchImpl(ev.endpoint_url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Tizia-Event': ev.event_type,
            'X-Tizia-Signature': `sha256=${sig}`,
            'X-Tizia-Delivery': String(ev.id),
          },
          body: ev.payload, signal: ctrl.signal,
        }).finally(() => clearTimeout(tid));
        if (res.ok) { await markDeliveredStmt.run({ id: ev.id, t: Date.now() }); delivered++; }
        else throw new Error(`HTTP ${res.status}`);
      } catch (e) {
        const nextAttempt = ev.attempts + 1;
        if (nextAttempt >= ev.max_attempts) {
          await markDeadStmt.run({ id: ev.id, err: String(e.message).slice(0, 300), t: Date.now() });
          dead++;
        } else {
          const backoff = BACKOFF_MS[Math.min(nextAttempt, BACKOFF_MS.length - 1)];
          await markRetryStmt.run({ id: ev.id, next: Date.now() + backoff, err: String(e.message).slice(0, 300), t: Date.now() });
          retried++;
        }
      }
    }
  } finally { _dispatching = false; }
  return { delivered, retried, dead };
}

let _timer = null;
export function startDispatcher(intervalMs = Number(process.env.OUTBOX_DISPATCH_MS) || 15_000) {
  if (_timer) return;
  _timer = setInterval(() => { dispatchOutboxOnce().catch(() => {}); }, intervalMs);
  _timer.unref?.();
  console.log('[integration] outbox dispatcher started');
}

// ── Routes ──
export function attachIntegration(r) {
  // Đăng ký webhook endpoint (chỉ admin). Trả secret 1 lần.
  r.post('/api/integrations/endpoints', async (req, res) => {
    if (req.user?.role !== 'admin') return res.status(403).json({ error: 'forbidden' });
    const url = String(req.body?.url || '').trim();
    if (!/^https?:\/\//.test(url)) return res.status(400).json({ error: 'invalid_url' });
    const { id, secret } = await registerEndpoint({ url, event_types: req.body?.eventTypes || null });
    res.json({ ok: true, id, secret, note: 'Lưu secret để xác minh X-Tizia-Signature (HMAC-SHA256).' });
  });
  r.get('/api/integrations/endpoints', async (_req, res) => {
    res.json({ endpoints: await listEndpointsAllStmt.all() });
  });
  r.get('/api/integrations/outbox', async (req, res) => {
    const limit = Math.min(Math.max(Number(req.query.limit) || 50, 1), 200);
    res.json({ events: await recentOutboxStmt.all({ limit }) });
  });
  // Phát thử 1 event (demo/test tích hợp).
  r.post('/api/integrations/emit', async (req, res) => {
    if (req.user?.role !== 'admin') return res.status(403).json({ error: 'forbidden' });
    const type = String(req.body?.type || 'test.ping').trim();
    const r2 = await enqueueEvent(type, req.body?.data ?? { hello: 'world' });
    res.json({ ok: true, ...r2 });
  });

  startDispatcher();
  console.log('[integration] routes mounted: /api/integrations/{endpoints,outbox,emit}');
}
