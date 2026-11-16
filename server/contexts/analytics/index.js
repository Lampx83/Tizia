// ============================================================
// Analytics context — event pipeline + funnel (nền cho #5 lợi nhuận, #6 big data)
// ============================================================
// Không đo được thì không tối ưu được. Đây là pipeline sự kiện nội bộ:
//   app/client → track() → bảng analytics_events → funnel/overview query.
//
// Ở scale lớn (Phase 2+), bảng này được CDC/stream sang ClickHouse/PostHog (WARM
// tier) + archive Parquet (COLD); pipeline hiện tại là điểm THU + truy vấn nhanh.
//
// Funnel mặc định (đo chuyển đổi lợi nhuận):
//   welcome_view → register → school_enter → module_start → subscribe → payment_success
// ============================================================

import { db } from '../../db.js';

const insertEventStmt = db.prepare(`
  INSERT INTO analytics_events (user_id, anon_id, name, props, session_id, path, ts)
  VALUES (@user_id, @anon_id, @name, @props, @session_id, @path, @ts)
`);

const EVENT_NAME_RE = /^[a-z0-9_.:-]{2,48}$/i;

/** Ghi 1 sự kiện. Trả false nếu name không hợp lệ (không throw — tracking không được làm vỡ request). */
export async function track({ user_id = null, anon_id = null, name, props = null, session_id = null, path = null } = {}) {
  if (!name || !EVENT_NAME_RE.test(String(name))) return false;
  try {
    await insertEventStmt.run({
      user_id: user_id ? Number(user_id) : null,
      anon_id: anon_id ? String(anon_id).slice(0, 64) : null,
      name: String(name),
      props: props != null ? JSON.stringify(props).slice(0, 2000) : null,
      session_id: session_id ? String(session_id).slice(0, 64) : null,
      path: path ? String(path).slice(0, 200) : null,
      ts: Date.now(),
    });
    return true;
  } catch { return false; }
}

// ── Funnel: đếm số "đối tượng" (user_id, fallback anon_id) đạt từng bước theo thứ tự ──
const DEFAULT_FUNNEL = ['welcome_view', 'register', 'school_enter', 'module_start', 'subscribe', 'payment_success'];

const stepReachStmt = db.prepare(`
  SELECT COUNT(*) AS n FROM (
    SELECT COALESCE(CAST(user_id AS TEXT), anon_id) AS subj
    FROM analytics_events
    WHERE name = @name AND ts >= @since
      AND COALESCE(CAST(user_id AS TEXT), anon_id) IS NOT NULL
    GROUP BY subj
  )
`);

export async function getFunnel(steps = DEFAULT_FUNNEL, sinceMs = 30 * 24 * 3600 * 1000) {
  const since = Date.now() - sinceMs;
  const out = [];
  let prev = null;
  for (const name of steps) {
    const n = (await stepReachStmt.get({ name, since }))?.n || 0;
    out.push({
      step: name, count: n,
      conversion_from_prev: prev == null ? 1 : (prev > 0 ? +(n / prev).toFixed(3) : 0),
    });
    prev = n;
  }
  const top = out[0]?.count || 0;
  const bottom = out[out.length - 1]?.count || 0;
  return { steps: out, overall_conversion: top > 0 ? +(bottom / top).toFixed(3) : 0, since };
}

const overviewStmt = db.prepare(`
  SELECT name, COUNT(*) AS events,
    COUNT(DISTINCT COALESCE(CAST(user_id AS TEXT), anon_id)) AS subjects
  FROM analytics_events
  WHERE ts >= @since
  GROUP BY name ORDER BY events DESC LIMIT 50
`);
const totalsStmt = db.prepare(`
  SELECT COUNT(*) AS total_events,
    COUNT(DISTINCT user_id) AS users,
    COUNT(DISTINCT COALESCE(CAST(user_id AS TEXT), anon_id)) AS subjects
  FROM analytics_events WHERE ts >= @since
`);

export async function getOverview(sinceMs = 7 * 24 * 3600 * 1000) {
  const since = Date.now() - sinceMs;
  return {
    totals: await totalsStmt.get({ since }),
    by_event: await overviewStmt.all({ since }),
    since,
  };
}

// ── Bootstrap: trả cấu hình GA4 + user info cho client init gtag.js ──
// Public (kể cả guest) — measurementId không phải bí mật, đã lộ trong source HTML.
// User info chỉ trả về nếu đã đăng nhập (req.user). Guest → isGuest: true.
const GA_MEASUREMENT_ID = process.env.GA_MEASUREMENT_ID || '';
export function getAnalyticsBootstrap(req) {
  const u = req.user || null;
  return {
    measurementId: GA_MEASUREMENT_ID || null,
    userId: u?.id || null,
    role: u?.role || null,
    plan: u?.plan || (u ? 'free' : null),
    isGuest: !u,
  };
}

// ── Pageview-specific helpers ──
// Public pageview endpoint cần đếm cả khách (chiếm phần lớn top-of-funnel).
// /api/events đang gate bằng auth nên không nhận được lượt khách → ta mở riêng
// /api/track/pageview chỉ chấp nhận name='page_view', rate-limit theo IP để
// chống spam (1 client thật chỉ bắn vài view/giây ngay cả khi click nhanh).
const PV_BUCKET = new Map(); // ip → { count, resetAt }
const PV_LIMIT_PER_MIN = 120;
function pvRateLimitOk(ip) {
  const now = Date.now();
  const b = PV_BUCKET.get(ip);
  if (!b || now > b.resetAt) {
    PV_BUCKET.set(ip, { count: 1, resetAt: now + 60_000 });
    return true;
  }
  if (b.count >= PV_LIMIT_PER_MIN) return false;
  b.count += 1;
  return true;
}
// Dọn bucket định kỳ để không leak khi nhiều IP một-lần-rồi-thôi (chỉ giữ entry
// còn hiệu lực + giới hạn cứng 5000 entries).
setInterval(() => {
  const now = Date.now();
  for (const [k, v] of PV_BUCKET) if (v.resetAt < now) PV_BUCKET.delete(k);
  if (PV_BUCKET.size > 5000) {
    const keys = Array.from(PV_BUCKET.keys()).slice(0, PV_BUCKET.size - 5000);
    for (const k of keys) PV_BUCKET.delete(k);
  }
}, 5 * 60_000).unref?.();

// Truy vấn cho admin dashboard (`/api/admin/pageviews`).
// Tách ở đây vì module này sở hữu bảng + index — tránh admin context phải biết schema.
const pvTotalSinceStmt = db.prepare(`
  SELECT COUNT(*) AS n
  FROM analytics_events
  WHERE name = 'page_view' AND ts >= ?
`);
const pvUniqueSinceStmt = db.prepare(`
  SELECT COUNT(*) AS n FROM (
    SELECT COALESCE(CAST(user_id AS TEXT), anon_id) AS subj
    FROM analytics_events
    WHERE name = 'page_view' AND ts >= ?
      AND COALESCE(CAST(user_id AS TEXT), anon_id) IS NOT NULL
    GROUP BY subj
  )
`);
const pvByDayStmt = db.prepare(`
  SELECT to_char(to_timestamp(ts/1000.0) AT TIME ZONE 'Asia/Ho_Chi_Minh', 'YYYY-MM-DD') AS d,
         COUNT(*) AS pageviews,
         COUNT(DISTINCT COALESCE(CAST(user_id AS TEXT), anon_id)) AS uniques
  FROM analytics_events
  WHERE name = 'page_view' AND ts >= ?
  GROUP BY d
`);
const pvTopPathsStmt = db.prepare(`
  SELECT COALESCE(NULLIF(path,''), '(không xác định)') AS path,
         COUNT(*) AS count,
         COUNT(DISTINCT COALESCE(CAST(user_id AS TEXT), anon_id)) AS uniques
  FROM analytics_events
  WHERE name = 'page_view' AND ts >= ?
  GROUP BY path ORDER BY count DESC LIMIT ?
`);
const pvByRoleStmt = db.prepare(`
  SELECT CASE
           WHEN ae.user_id IS NULL THEN 'guest'
           ELSE COALESCE(u.role, 'unknown')
         END AS role,
         COUNT(*) AS count
  FROM analytics_events ae
  LEFT JOIN users u ON u.id = ae.user_id
  WHERE ae.name = 'page_view' AND ae.ts >= ?
  GROUP BY CASE WHEN ae.user_id IS NULL THEN 'guest' ELSE COALESCE(u.role, 'unknown') END
  ORDER BY count DESC
`);

export async function getPageviewStats(days = 30, topPathsLimit = 15) {
  const now = Date.now();
  const since30 = now - days * 86400_000;
  const since1 = now - 86400_000;
  const since7 = now - 7 * 86400_000;
  const total = async (sql) => (await sql.get(since30))?.n || 0;
  const totals = {
    last_24h: (await pvTotalSinceStmt.get(since1))?.n || 0,
    last_7d: (await pvTotalSinceStmt.get(since7))?.n || 0,
    last_30d: await total(pvTotalSinceStmt),
    unique_30d: await total(pvUniqueSinceStmt),
    unique_24h: (await pvUniqueSinceStmt.get(since1))?.n || 0,
    unique_7d: (await pvUniqueSinceStmt.get(since7))?.n || 0,
  };
  // Lấp ngày trống = 0 để chart không răng-cưa.
  const rows = new Map((await pvByDayStmt.all(since30)).map(r => [r.d, r]));
  const by_day = [];
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(now - i * 86400_000);
    d.setUTCHours(d.getUTCHours() + 7);
    const key = d.toISOString().slice(0, 10);
    const row = rows.get(key);
    by_day.push({ date: key, pageviews: row?.pageviews || 0, uniques: row?.uniques || 0 });
  }
  return {
    days,
    totals,
    by_day,
    top_paths: await pvTopPathsStmt.all(since30, topPathsLimit),
    by_role: await pvByRoleStmt.all(since30),
  };
}

// ── Routes ──
export function attachAnalytics(r) {
  // GET /api/analytics/bootstrap — public, dùng req.user nếu có.
  r.get('/api/analytics/bootstrap', (req, res) => {
    res.set('Cache-Control', 'no-store');
    res.json(getAnalyticsBootstrap(req));
  });

  // Thu sự kiện từ client (đã đăng nhập — gate /api/* yêu cầu login).
  // user_id lấy từ server, client KHÔNG tự khai (chống giả mạo).
  r.post('/api/events', async (req, res) => {
    const b = req.body ?? {};
    const ok = await track({
      user_id: req.user?.id || null,
      anon_id: b.anonId || null, name: b.name,
      props: b.props ?? null, session_id: b.sessionId || null, path: b.path || null,
    });
    res.json({ ok });
  });

  // Public pageview tracker — KHÔNG yêu cầu login. Whitelisted ở
  // PUBLIC_PATH_PREFIXES trong identity/auth.js để guest cũng bắn được. Chỉ
  // chấp nhận page_view, rate-limit theo IP để chống spam.
  r.post('/api/track/pageview', async (req, res) => {
    const ip = (req.headers['x-forwarded-for']?.split(',')[0] || req.ip || req.socket?.remoteAddress || 'unknown').trim();
    if (!pvRateLimitOk(ip)) { res.status(429).json({ ok: false, error: 'rate_limited' }); return; }
    const b = req.body ?? {};
    const ok = await track({
      user_id: req.user?.id || null,
      anon_id: b.anonId || null,
      name: 'page_view',
      props: {
        ref: typeof b.referrer === 'string' ? b.referrer.slice(0, 200) : null,
        title: typeof b.title === 'string' ? b.title.slice(0, 120) : null,
        lang: typeof b.lang === 'string' ? b.lang.slice(0, 12) : null,
      },
      session_id: b.sessionId || null,
      path: b.path || null,
    });
    res.json({ ok });
  });

  // Funnel + overview cho dashboard (chỉ teacher/admin). Phase sau gate role.
  r.get('/api/analytics/funnel', async (req, res) => {
    const steps = typeof req.query.steps === 'string' && req.query.steps.trim()
      ? req.query.steps.split(',').map((s) => s.trim()).filter(Boolean) : undefined;
    const days = Math.min(Math.max(Number(req.query.days) || 30, 1), 365);
    res.json(await getFunnel(steps, days * 24 * 3600 * 1000));
  });
  r.get('/api/analytics/overview', async (req, res) => {
    const days = Math.min(Math.max(Number(req.query.days) || 7, 1), 365);
    res.json(await getOverview(days * 24 * 3600 * 1000));
  });

  console.log('[analytics] routes mounted: /api/events, /api/analytics/{funnel,overview}');
}
