// ============================================================
// state-sync.js — Đồng bộ localStorage ↔ server cho các state
// không có table riêng (mini-game stars, code drafts, tutor history…).
// ============================================================
// Mục tiêu: đổi máy / clear cache / dùng máy khác → KHÔNG mất data.
// Wallet, scenario-runs, SRS đã có sync riêng (có monotonic guard) và
// KHÔNG nằm trong whitelist ở đây để tránh sync 2 lần.
//
// Cơ chế:
//   1. Hydrate: sau khi auth.js xác nhận user, fetch /api/user-state, ghi
//      vào localStorage cho từng key trong WHITELIST. Nếu local đã có giá
//      trị KHÁC remote: lấy max (cho stat dạng số) hoặc remote (cho text).
//   2. Push: ghi nhận snapshot sau hydrate. Khi tab ẩn (visibilitychange)
//      hoặc trước unload: so sánh các key whitelist hiện tại với snapshot,
//      PUT các key đã đổi lên server.
//   3. Periodic flush mỗi 30s để đề phòng user đóng máy đột ngột.
//
// Không monkey-patch localStorage để tránh va với code khác. State mini-game
// thay đổi tần suất thấp (vài lần/phút) nên poll/flush đủ.
// ============================================================

// Pattern các key được phép sync — string hoặc RegExp. Cố tình HẸP:
// - Chỉ data học tập có giá trị cross-device.
// - KHÔNG bao gồm: tizia:wallet:v1, tizia:scn-runs, tizia:srs:v1 (đã có sync riêng),
//   tizia:me (identity), class.code (orchestrate session-only).
const WHITELIST = [
  // Mini-game math2 / math6 — stars + counters per user.
  /^math2\.(stars|correct)$/,
  /^math2\.topic\./,
  /^math6\.(gold|xp|maxStreak)$/,
  /^math6\.topic\./,
  // Space quest progress map ({algolab: n, cipher: n, ...}).
  /^tizia:space:done$/,
  // Code-lab solved set + per-problem drafts (cache; codelab service có riêng nhưng draft thì không).
  /^tizia:it:codelab:solved$/,
  /^tizia:it:codelab:code:/,
  // Web playground draft (1 key duy nhất).
  /^tizia:it:webplay$/,
  // Đồ chơi ghép vần — best score.
  /^do-chu-ghep-van\./,
  // Tutor floating chat history (mỗi user 1 lịch sử).
  /^tizia\.tutor\.history\.v1$/,
  // Welcome cards (đánh dấu đã đóng) — UX nhẹ.
  /^tizia:welcome:/,
  // Difficulty + level preference.
  /^tizia:(difficulty|level)$/,
  // Onboarding 60s — đã hoàn thành/bỏ qua. Sync để không hỏi lại trên máy khác.
  /^tizia:onboarding:v1:done$/,
  // Daily-login popup — đã xem hôm nay. Sync để không bật lại ở máy khác cùng ngày.
  /^tizia:daily:shown$/,
];

const PUSH_DEBOUNCE_MS = 1500;
const PERIODIC_FLUSH_MS = 30_000;

let _booted = false;
let _snapshot = new Map();      // key → value sau lần hydrate/flush gần nhất
let _pushTimer = null;
let _tabOwnerUid = null;        // chốt user của tab này (đồng bộ với wallet.js)

function isWhitelisted(key) {
  for (const p of WHITELIST) {
    if (typeof p === 'string' && p === key) return true;
    if (p instanceof RegExp && p.test(key)) return true;
  }
  return false;
}

function currentUid() {
  try {
    const me = JSON.parse(localStorage.getItem('tizia:me') || 'null');
    return me?.id ?? null;
  } catch { return null; }
}

function isStaleTab() {
  return _tabOwnerUid != null && currentUid() !== _tabOwnerUid;
}

function snapshotLocalWhitelist() {
  const snap = new Map();
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (!k || !isWhitelisted(k)) continue;
      snap.set(k, localStorage.getItem(k) || '');
    }
  } catch {}
  return snap;
}

/**
 * Pull server state và hydrate localStorage. Gọi 1 lần sau khi login/bootstrap.
 * Merge rule:
 *   - Nếu local key chưa có → ghi từ server.
 *   - Nếu local đã có:
 *       value là số (parseFloat OK) → max(local, server)
 *       còn lại → server thắng nếu server.updatedAt > local-no-time (server thắng mặc định
 *                 cho text/history vì local thường là cache phiên cũ của user khác đã clear).
 *
 * Sau khi merge, snapshot = state hiện tại để push delta về sau.
 */
export async function hydrateFromServer() {
  if (_booted) return;
  const uid = currentUid();
  if (uid == null) return;            // chưa biết user → bỏ qua, lần sau gọi lại
  _tabOwnerUid = uid;

  let remote = null;
  try {
    const r = await fetch('/api/user-state', { credentials: 'same-origin' });
    if (r.ok) remote = await r.json();
  } catch {}
  // Lỗi mạng → không hydrate, KHÔNG push (sợ overwrite server bằng local rỗng).
  // Lần sau auto-retry khi user vào lại trang.
  if (!remote) return;

  for (const [k, entry] of Object.entries(remote)) {
    if (!isWhitelisted(k)) continue;       // server có key không trong whitelist (cũ?) → skip
    const remoteVal = entry?.value ?? '';
    const localVal = (() => {
      try { return localStorage.getItem(k); } catch { return null; }
    })();
    if (localVal == null) {
      try { localStorage.setItem(k, remoteVal); } catch {}
      continue;
    }
    // Trùng → bỏ qua.
    if (localVal === remoteVal) continue;
    // Cùng là số → lấy max (cho stat tích luỹ: stars, gold, xp…).
    const ln = Number(localVal), rn = Number(remoteVal);
    if (!Number.isNaN(ln) && !Number.isNaN(rn) && String(ln) === localVal && String(rn) === remoteVal) {
      const max = Math.max(ln, rn);
      if (max !== ln) {
        try { localStorage.setItem(k, String(max)); } catch {}
      }
      // Nếu local cao hơn → push lên server lần flush kế.
      continue;
    }
    // JSON map (vd tizia:space:done = {algolab:5,…}) → merge max per-field.
    if ((localVal.startsWith('{') && remoteVal.startsWith('{')) ||
        (localVal.startsWith('[') && remoteVal.startsWith('['))) {
      try {
        const lo = JSON.parse(localVal), ro = JSON.parse(remoteVal);
        if (Array.isArray(lo) && Array.isArray(ro)) {
          // Array of strings (vd codelab solved) → union.
          const merged = [...new Set([...lo, ...ro])];
          try { localStorage.setItem(k, JSON.stringify(merged)); } catch {}
        } else if (lo && ro && typeof lo === 'object' && typeof ro === 'object') {
          const merged = { ...ro };
          for (const [kk, vv] of Object.entries(lo)) {
            const rv = merged[kk];
            if (typeof vv === 'number' && typeof rv === 'number') merged[kk] = Math.max(vv, rv);
            else if (rv === undefined) merged[kk] = vv;
          }
          try { localStorage.setItem(k, JSON.stringify(merged)); } catch {}
        } else {
          // Khác loại → ưu tiên remote (text history kiểu mới).
          try { localStorage.setItem(k, remoteVal); } catch {}
        }
      } catch {
        // Parse fail → giữ remote.
        try { localStorage.setItem(k, remoteVal); } catch {}
      }
      continue;
    }
    // Text khác → remote thắng (history/draft là tài liệu, server có timestamp mới hơn).
    if ((entry?.updatedAt || 0) > 0) {
      try { localStorage.setItem(k, remoteVal); } catch {}
    }
  }

  // Snapshot phải là TRẠNG THÁI SERVER (remote), không phải state đã merge local.
  // Nếu snapshot = merged-local thì diffSnapshot() ngay sau sẽ = {} → push 0,
  // local-greater delta (vd math6.gold local=500 vs server=200) không bao giờ
  // tới server. Lưu remote value làm baseline để flush kế phát hiện delta.
  _snapshot = new Map();
  for (const [k, entry] of Object.entries(remote)) {
    if (!isWhitelisted(k)) continue;
    _snapshot.set(k, entry?.value ?? '');
  }
  _booted = true;

  // Lập tức push lên server nếu merge ra giá trị khác remote (local lớn hơn).
  // Không await — best-effort.
  schedulePush();

  // Đăng ký các listener flush.
  _installFlushHooks();
}

/** Tính delta giữa snapshot trước đó và localStorage hiện tại, trả object để PUT. */
function diffSnapshot() {
  const cur = snapshotLocalWhitelist();
  const diff = {};
  // Key đổi giá trị hoặc mới.
  for (const [k, v] of cur) {
    if (_snapshot.get(k) !== v) diff[k] = v;
  }
  // Key bị xoá → gửi empty string để server delete row.
  for (const k of _snapshot.keys()) {
    if (!cur.has(k)) diff[k] = '';
  }
  return { diff, cur };
}

function schedulePush() {
  clearTimeout(_pushTimer);
  _pushTimer = setTimeout(flushNow, PUSH_DEBOUNCE_MS);
}

/** Push delta lên server. Sau khi thành công, cập nhật snapshot = current. */
export async function flushNow() {
  if (!_booted) return;
  if (isStaleTab()) {
    console.warn('[state-sync] stale tab → bỏ qua flush');
    return;
  }
  const { diff, cur } = diffSnapshot();
  const keys = Object.keys(diff);
  if (!keys.length) return;
  try {
    const r = await fetch('/api/user-state', {
      method: 'PUT',
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(diff),
    });
    if (r.ok) _snapshot = cur;
    // Lỗi → giữ snapshot cũ để lần flush sau retry cùng diff.
  } catch {
    // offline → giữ snapshot cũ, retry lần sau
  }
}

let _hooksInstalled = false;
function _installFlushHooks() {
  if (_hooksInstalled) return;
  _hooksInstalled = true;

  // Tab khác đổi `tizia:me` → đánh dấu stale, không push tiếp.
  try {
    window.addEventListener('storage', (e) => {
      if (e.key === 'tizia:me' && isStaleTab()) {
        console.warn('[state-sync] tài khoản đã đổi ở tab khác, tab này khoá sync');
        _booted = false;
      } else if (e.key && isWhitelisted(e.key)) {
        // Tab khác cập nhật key whitelist → cập nhật snapshot để tab này
        // không push lại đè giá trị mới của tab kia.
        _snapshot.set(e.key, e.newValue || '');
      }
    });
  } catch {}

  // Tab ẩn (chuyển sang tab khác / minimize) → flush ngay; user có thể đóng
  // máy bất cứ lúc nào sau đó.
  try {
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') flushNow();
    });
  } catch {}

  // Đóng tab / reload — flush dùng sendBeacon để chắc chắn gửi được kể cả khi
  // page đang unload. fetch() trong beforeunload thường bị browser huỷ.
  try {
    window.addEventListener('pagehide', () => {
      if (isStaleTab()) return;
      const { diff } = diffSnapshot();
      if (!Object.keys(diff).length) return;
      try {
        const blob = new Blob([JSON.stringify(diff)], { type: 'application/json' });
        navigator.sendBeacon?.('/api/user-state', blob);
      } catch {}
    });
  } catch {}

  // Periodic flush — phòng case không có visibilitychange (kiosk mode).
  try { setInterval(flushNow, PERIODIC_FLUSH_MS); } catch {}
}

// Reset snapshot khi logout (auth.js gọi tay thông qua module này nếu cần);
// thực tế clearAccountScopedKeys() đã xoá whitelist keys → lần hydrate sau
// sẽ tự warm lại từ server cho user mới.
export function resetSync() {
  _booted = false;
  _snapshot = new Map();
  _tabOwnerUid = null;
  clearTimeout(_pushTimer);
}

// ── Auto-init ──────────────────────────────────────────────────
// Cho phép mini-game/page legacy (math-fun, it-code-lab, do-chu-ghep-van…)
// CHỈ cần nhúng `<script type="module" src="./js/engine/state-sync.js">`
// mà không phải import auth.js. Module này tự đọc `tizia:me` (do auth.js
// trước đó hoặc bootstrapMe đã set) → nếu đã có user → hydrate ngay.
// Nếu chưa có (guest hoặc chưa từng login từ tab này) → bỏ qua; lần sau
// auth.js sẽ gọi hydrateFromServer() tường minh.
if (typeof window !== 'undefined') {
  const tryAutoBoot = () => {
    if (currentUid() != null) hydrateFromServer().catch(() => {});
  };
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', tryAutoBoot, { once: true });
  } else {
    tryAutoBoot();
  }
}
