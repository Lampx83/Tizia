// Chặn dò mật khẩu theo TỪNG TÀI KHOẢN: giới hạn theo IP không đủ vì đổi IP là dò tiếp được.
// Sai quá MAX_FAILS lần trong WINDOW_MS thì khoá tài khoản đó tới hết cửa sổ. Bộ đếm nằm trong bộ nhớ tiến trình
// (chỉ có 1 container API); khởi động lại thì đếm lại từ đầu, chấp nhận được cho mục đích này.
const MAX_FAILS = 10;
const WINDOW_MS = 15 * 60 * 1000;

export function createLoginGuard({ maxFails = MAX_FAILS, windowMs = WINDOW_MS } = {}) {
  const fails = new Map(); // key -> { count, resetAt }
  const keyOf = (username) => String(username || '').trim().toLowerCase();
  const live = (key, now) => {
    const rec = fails.get(key);
    if (rec && rec.resetAt <= now) { fails.delete(key); return null; }
    return rec || null;
  };
  return {
    /** Số giây còn phải chờ nếu tài khoản đang bị khoá, 0 nếu được thử. */
    retryAfter(username, now = Date.now()) {
      const rec = live(keyOf(username), now);
      return rec && rec.count >= maxFails ? Math.ceil((rec.resetAt - now) / 1000) : 0;
    },
    fail(username, now = Date.now()) {
      const key = keyOf(username);
      if (!key) return;
      const rec = live(key, now) || { count: 0, resetAt: now + windowMs };
      rec.count += 1;
      fails.set(key, rec);
    },
    success(username) { fails.delete(keyOf(username)); },
    prune(now = Date.now()) { for (const [k, v] of fails) if (v.resetAt <= now) fails.delete(k); },
  };
}

export const loginGuard = createLoginGuard();
setInterval(() => loginGuard.prune(), 10 * 60 * 1000).unref();
export const LOGIN_LOCKED_MESSAGE = 'Bạn đã nhập sai quá nhiều lần. Vui lòng thử lại sau ít phút.';
