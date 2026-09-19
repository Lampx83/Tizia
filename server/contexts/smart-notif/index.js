// ============================================================
// Smart Notifications — best-time-to-nudge analytics
// ============================================================
// Log mỗi hoạt động user (thông qua /api/engagement/ping hoặc bất kỳ POST
// auth nào — caller phải bắn). Tính giờ tối ưu nhắc dựa lịch sử:
// - Đếm số session theo (day_of_week, hour) trong 30 ngày gần nhất.
// - Top 3 (dow, hour) → best time slots.
// Web Push thật (VAPID): keypair tự sinh lần đầu + persist vào notif_config
// (override được bằng env VAPID_PUBLIC_KEY/VAPID_PRIVATE_KEY). Nudge scheduler
// 15 phút/lần: user có subscription + đang ở best slot + không online → push.
// ============================================================

import webpush from 'web-push';
import { db } from '../../db.js';
import { requireAuth } from '../identity/auth.js';

db.exec(`
  CREATE TABLE IF NOT EXISTS user_activity (
    user_id      INTEGER NOT NULL,
    at           INTEGER NOT NULL,
    kind         TEXT NOT NULL DEFAULT 'visit',
    PRIMARY KEY (user_id, at)
  );
  CREATE INDEX IF NOT EXISTS idx_user_activity_user ON user_activity(user_id, at DESC);

  CREATE TABLE IF NOT EXISTS notif_subscriptions (
    user_id      INTEGER PRIMARY KEY,
    endpoint     TEXT,                         -- web push endpoint
    p256dh       TEXT,
    auth         TEXT,
    enabled      INTEGER NOT NULL DEFAULT 1,
    updated_at   INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS notif_config (
    k  TEXT PRIMARY KEY,
    v  TEXT NOT NULL
  );
`);
try { db.exec(`ALTER TABLE notif_subscriptions ADD COLUMN last_push_at INTEGER`); } catch {}

// ── VAPID setup ──
const VAPID_CONTACT = process.env.VAPID_CONTACT || 'mailto:admin@tizia.vn';
let vapidPublicKey = null;

function initVapid() {
  let pub = process.env.VAPID_PUBLIC_KEY || null;
  let priv = process.env.VAPID_PRIVATE_KEY || null;
  if (!pub || !priv) {
    const getCfg = db.prepare(`SELECT v FROM notif_config WHERE k = ?`);
    pub = getCfg.get('vapid_public')?.v;
    priv = getCfg.get('vapid_private')?.v;
    if (!pub || !priv) {
      const keys = webpush.generateVAPIDKeys();
      const put = db.prepare(`INSERT OR REPLACE INTO notif_config (k, v) VALUES (?, ?)`);
      put.run('vapid_public', keys.publicKey);
      put.run('vapid_private', keys.privateKey);
      pub = keys.publicKey; priv = keys.privateKey;
      console.log('[smart-notif] VAPID keypair mới — đã persist vào notif_config');
    }
  }
  webpush.setVapidDetails(VAPID_CONTACT, pub, priv);
  vapidPublicKey = pub;
}
initVapid();

// Gửi push tới 1 user. Endpoint chết (404/410 — user gỡ permission/đổi browser)
// → disable subscription để scheduler khỏi retry mãi.
export async function sendPushToUser(userId, payload) {
  const sub = db.prepare(`SELECT * FROM notif_subscriptions WHERE user_id = ? AND enabled = 1`).get(userId);
  if (!sub || !sub.endpoint) return { ok: false, reason: 'no_subscription' };
  try {
    await webpush.sendNotification(
      { endpoint: sub.endpoint, keys: { p256dh: sub.p256dh, auth: sub.auth } },
      JSON.stringify(payload),
    );
    db.prepare(`UPDATE notif_subscriptions SET last_push_at = ? WHERE user_id = ?`).run(Date.now(), userId);
    return { ok: true };
  } catch (err) {
    if (err.statusCode === 404 || err.statusCode === 410) {
      db.prepare(`UPDATE notif_subscriptions SET enabled = 0 WHERE user_id = ?`).run(userId);
      return { ok: false, reason: 'endpoint_gone' };
    }
    console.error('[smart-notif] push failed:', err.statusCode || err.message);
    return { ok: false, reason: 'send_failed' };
  }
}

export function logActivity(userId, kind = 'visit') {
  if (!userId) return;
  try {
    db.prepare(`INSERT OR IGNORE INTO user_activity (user_id, at, kind) VALUES (?, ?, ?)`)
      .run(userId, Date.now(), kind);
  } catch {}
}

const TZ = 7 * 3600_000;

function bestSlots(userId) {
  const since = Date.now() - 30 * 86400_000;
  const rows = db.prepare(`SELECT at FROM user_activity WHERE user_id = ? AND at >= ?`)
    .all(userId, since);
  const counts = new Map();   // key 'dow:hour' → count
  for (const r of rows) {
    const d = new Date(r.at + TZ);
    const key = `${d.getUTCDay()}:${d.getUTCHours()}`;
    counts.set(key, (counts.get(key) || 0) + 1);
  }
  const sorted = [...counts.entries()].sort((a, b) => b[1] - a[1]);
  return sorted.slice(0, 5).map(([k, c]) => {
    const [dow, h] = k.split(':').map(Number);
    return { day_of_week: dow, hour: h, count: c };
  });
}

export function attachSmartNotif(router) {
  router.get('/api/notif/best-slots', requireAuth, (req, res) => {
    const slots = bestSlots(req.user.id);
    const next_reminder = slots[0]
      ? `${['CN','T2','T3','T4','T5','T6','T7'][slots[0].day_of_week]} ${slots[0].hour}:00`
      : null;
    res.json({ ok: true, slots, next_reminder });
  });

  // Heartbeat — caller (FE) gửi mỗi phiên session start
  router.post('/api/notif/heartbeat', requireAuth, (req, res) => {
    logActivity(req.user.id, String(req.body?.kind || 'visit').slice(0, 20));
    res.json({ ok: true });
  });

  // Public key để FE gọi pushManager.subscribe(applicationServerKey)
  router.get('/api/notif/vapid-key', requireAuth, (_req, res) => {
    res.json({ ok: true, key: vapidPublicKey });
  });

  // Subscribe Web Push
  router.post('/api/notif/subscribe', requireAuth, (req, res) => {
    const b = req.body || {};
    if (!b.endpoint) return res.status(400).json({ error: 'no_endpoint' });
    db.prepare(`
      INSERT INTO notif_subscriptions (user_id, endpoint, p256dh, auth, enabled, updated_at)
      VALUES (?, ?, ?, ?, 1, ?)
      ON CONFLICT(user_id) DO UPDATE SET
        endpoint = excluded.endpoint, p256dh = excluded.p256dh,
        auth = excluded.auth, enabled = 1, updated_at = excluded.updated_at
    `).run(req.user.id, String(b.endpoint || '').slice(0, 500),
           String(b.p256dh || '').slice(0, 200),
           String(b.auth || '').slice(0, 200), Date.now());
    res.json({ ok: true });
  });

  router.post('/api/notif/unsubscribe', requireAuth, (req, res) => {
    db.prepare(`UPDATE notif_subscriptions SET enabled = 0, updated_at = ? WHERE user_id = ?`)
      .run(Date.now(), req.user.id);
    res.json({ ok: true });
  });

  // Tự test push tới chính mình (verify chuông hoạt động sau khi bật)
  router.post('/api/notif/test', requireAuth, async (req, res) => {
    const r = await sendPushToUser(req.user.id, {
      title: '🔔 Tizia',
      body: 'Thông báo nhắc học đã bật thành công!',
      url: '/index.html',
    });
    res.json(r);
  });
}

// ── Nudge scheduler ──
// 15 phút/lần: user có subscription enabled + giờ hiện tại (VN) trúng top-3
// best slot + không hoạt động 3h qua + chưa push trong 20h → nhắc học.
const NUDGE_EVERY_MS = 15 * 60_000;
const IDLE_MS = 3 * 3600_000;
const PUSH_COOLDOWN_MS = 20 * 3600_000;

async function runNudgeSweep() {
  const now = Date.now();
  const d = new Date(now + TZ);
  const dow = d.getUTCDay(), hour = d.getUTCHours();
  const subs = db.prepare(`
    SELECT s.user_id FROM notif_subscriptions s
     WHERE s.enabled = 1 AND s.endpoint != ''
       AND COALESCE(s.last_push_at, 0) < ?
  `).all(now - PUSH_COOLDOWN_MS);
  for (const { user_id } of subs) {
    const lastActive = db.prepare(`SELECT MAX(at) AS at FROM user_activity WHERE user_id = ?`)
      .get(user_id)?.at || 0;
    if (now - lastActive < IDLE_MS) continue;        // đang/vừa online → khỏi nhắc
    const slots = bestSlots(user_id).slice(0, 3);
    if (!slots.some(s => s.day_of_week === dow && s.hour === hour)) continue;
    await sendPushToUser(user_id, {
      title: '📚 Đến giờ học rồi!',
      body: 'Đây là khung giờ bạn học tốt nhất — vào giữ streak 10 phút thôi!',
      url: '/index.html',
    });
  }
}

export function scheduleSmartNudges() {
  setInterval(() => { runNudgeSweep().catch(e => console.error('[smart-notif] sweep:', e.message)); },
    NUDGE_EVERY_MS).unref?.();
  console.log('[smart-notif] nudge scheduler bật (15 phút/lần)');
}

export const plugin = {
  name: 'smart-notif',
  mount(router) {
    attachSmartNotif(router);
    scheduleSmartNudges();
  },
};
