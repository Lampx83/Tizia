// server/observability.js
// Quan sát & bắt lỗi TẬP TRUNG cho Tizia — KHÔNG thêm dependency bắt buộc.
//
// Gồm 4 phần:
//   1) log                         — structured logger (JSON 1 dòng/entry ở prod,
//                                     dễ đọc ở dev). warn/error → stderr.
//   2) captureException + init     — đẩy lỗi lên Sentry NẾU đặt SENTRY_DSN
//                                     (dynamic import, không cài thì vẫn chạy).
//   3) installProcessGuards        — lưới an toàn cho unhandledRejection /
//                                     uncaughtException (tránh crash
//                                     âm thầm, không log).
//   4) requestContext / requestLogger / expressErrorHandler
//                                   — req.id để nối log, log request opt-in, và
//                                     error-handler 4 tham số đặt sau mọi route.
//
// Triết lý: chạy tốt NGAY không cần cấu hình (log ra stdout, Docker thu lại qua
// `docker logs`). Sentry chỉ là lớp tuỳ chọn: set SENTRY_DSN + `npm i @sentry/node`
// là tự bật, không sửa code.

import { randomUUID } from 'node:crypto';

const LEVELS = { debug: 10, info: 20, warn: 30, error: 40 };
const ENV = process.env.NODE_ENV || 'development';
const IS_PROD = ENV === 'production';
const MIN_LEVEL = LEVELS[(process.env.LOG_LEVEL || (IS_PROD ? 'info' : 'debug')).toLowerCase()]
  ?? LEVELS.info;

// Rút gọn Error thành {name,message,stack} cho JSON gọn; bỏ field undefined.
function sanitize(ctx) {
  if (!ctx) return {};
  const out = {};
  for (const [k, v] of Object.entries(ctx)) {
    if (v === undefined) continue;
    out[k] = v instanceof Error ? { name: v.name, message: v.message, stack: v.stack } : v;
  }
  return out;
}

function pretty(rec) {
  const { t, level, msg, ...rest } = rec;
  const tag = level.toUpperCase().padEnd(5);
  const extra = Object.keys(rest).length ? ' ' + JSON.stringify(rest) : '';
  return `${t} ${tag} ${msg}${extra}`;
}

function emit(level, msg, ctx) {
  if (LEVELS[level] < MIN_LEVEL) return;
  const rec = { t: new Date().toISOString(), level, msg, ...sanitize(ctx) };
  const line = IS_PROD ? JSON.stringify(rec) : pretty(rec);
  // warn/error → stderr để tách luồng giám sát; info/debug → stdout.
  (level === 'error' || level === 'warn' ? process.stderr : process.stdout).write(line + '\n');
}

export const log = {
  debug: (msg, ctx) => emit('debug', msg, ctx),
  info: (msg, ctx) => emit('info', msg, ctx),
  warn: (msg, ctx) => emit('warn', msg, ctx),
  error: (msg, ctx) => emit('error', msg, ctx),
};

// ── Sentry (tuỳ chọn) ────────────────────────────────────────────────
let sentry = null; // handle @sentry/node nếu bật thành công

export async function initErrorTracking() {
  const dsn = process.env.SENTRY_DSN;
  if (!dsn) {
    log.info('[obs] error tracking: chỉ log stdout (SENTRY_DSN trống)');
    return false;
  }
  try {
    const Sentry = await import('@sentry/node');
    Sentry.init({
      dsn,
      environment: ENV,
      release: process.env.SENTRY_RELEASE || undefined,
      tracesSampleRate: Number(process.env.SENTRY_TRACES_SAMPLE_RATE) || 0,
    });
    sentry = Sentry;
    log.info('[obs] Sentry đã bật', { environment: ENV });
    return true;
  } catch (e) {
    // Có DSN nhưng chưa cài @sentry/node → đừng làm sập app, chỉ cảnh báo.
    log.warn('[obs] SENTRY_DSN có nhưng không nạp được @sentry/node — chạy `npm i @sentry/node`', {
      err: e?.message,
    });
    return false;
  }
}

// Ghi lỗi 1 chỗ: vừa log structured (kèm stack), vừa đẩy Sentry nếu bật.
export function captureException(err, ctx = {}) {
  const { msg, ...rest } = ctx;
  log.error(msg || err?.message || 'unhandled error', {
    ...rest,
    err: err instanceof Error ? err : new Error(String(err)),
  });
  if (sentry) {
    try {
      sentry.captureException(err instanceof Error ? err : new Error(String(err)), { extra: rest });
    } catch {
      /* không để việc report làm phát sinh lỗi mới */
    }
  }
}

// ── Process guards ───────────────────────────────────────────────────
// unhandledRejection: log + report, KHÔNG thoát (1 promise hỏng không nên giết
//   cả server đang phục vụ user khác).
// uncaughtException: trạng thái process không còn tin được → report, flush Sentry,
//   rồi thoát để Docker (restart: unless-stopped) khởi động lại SẠCH. Đặt
//   EXIT_ON_UNCAUGHT=0 nếu muốn cố sống (không khuyến nghị).
export function installProcessGuards() {
  process.on('unhandledRejection', (reason) => {
    captureException(reason, { kind: 'unhandledRejection' });
  });
  process.on('uncaughtException', (err) => {
    captureException(err, { kind: 'uncaughtException' });
    if (process.env.EXIT_ON_UNCAUGHT === '0') return;
    flushAndExit(1);
  });
}

function flushAndExit(code) {
  const done = () => process.exit(code);
  if (sentry?.close) {
    sentry.close(2000).then(done, done); // cho Sentry 2s gửi nốt event đang chờ
  } else {
    setTimeout(done, 50).unref?.(); // cho stdout xả nốt rồi thoát
  }
}

// ── Express ──────────────────────────────────────────────────────────
// Gắn req.id ngắn để nối các dòng log của cùng 1 request. Nhẹ, đặt SỚM nhất.
export function requestContext(req, res, next) {
  req.id = String(req.headers['x-request-id'] || randomUUID().slice(0, 8));
  res.setHeader('X-Request-Id', req.id);
  next();
}

// Log request HTTP — opt-in qua LOG_REQUESTS=1 để tránh ồn. Chỉ log khi response
// xong, kèm status + thời gian. Mặc định chỉ /api/* (bỏ asset tĩnh ồn ào).
export function requestLogger({ onlyApi = true } = {}) {
  return (req, res, next) => {
    if (onlyApi && !req.path.startsWith('/api/')) return next();
    const start = process.hrtime.bigint();
    res.on('finish', () => {
      const ms = Number(process.hrtime.bigint() - start) / 1e6;
      const level = res.statusCode >= 500 ? 'warn' : 'info';
      emit(level, `${req.method} ${req.originalUrl} ${res.statusCode}`, {
        rid: req.id,
        ms: Math.round(ms),
        uid: req.user?.id,
      });
    });
    next();
  };
}

// Error handler TẬP TRUNG — middleware 4 tham số, PHẢI đặt sau mọi route.
// Lỗi rơi ra (throw đồng bộ hoặc next(err)) sẽ tới đây: report + trả JSON gọn,
// KHÔNG lộ stack ở prod. Trả kèm rid để user báo lỗi đối chiếu được trong log.
export function expressErrorHandler(err, req, res, next) {
  if (res.headersSent) return next(err);
  captureException(err, {
    kind: 'request',
    rid: req.id,
    method: req.method,
    path: req.originalUrl,
    uid: req.user?.id,
  });
  let status = Number(err?.status || err?.statusCode) || 500;
  if (status < 400 || status > 599) status = 500;
  res.status(status).json({
    error: 'internal_error',
    rid: req.id,
    ...(IS_PROD ? {} : { message: err?.message }),
  });
}
