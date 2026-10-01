// Client-side helper cho hệ thống đăng nhập Tizia.
// Mọi page đã được server-side gate (chưa login → redirect /login.html), nên ở đây
// chỉ cần helpers gọi API + cache user (đồng bộ) cho UI.

import { KEYS, lsGet, lsSet } from './engine/storage.js';
import { loadWalletFromServer, clearLocalWallet } from './engine/wallet.js';
import { hydrateFromServer as hydrateUserState, flushNow as flushUserState, resetSync as resetUserState } from './engine/state-sync.js';

let _me = null;      // { id, username, display_name, role } hoặc null
let _mePromise = null;

// API base — trang được serve cùng origin nên đường tương đối là OK.
const A = 'api/auth';

export async function login(username, password) {
  const r = await fetch(`${A}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'same-origin',
    body: JSON.stringify({ username, password }),
  });
  const data = await r.json().catch(() => ({}));
  if (r.ok && data?.user) {
    _me = data.user;
    syncToLocal(_me);
    try { window.tiziaTrack?.('login', { method: 'password', role: data.user.role || '' }); } catch {}
    return { ok: true, user: data.user, redirectTo: data.redirectTo || null };
  }
  return { ok: false, error: data?.error || `Lỗi ${r.status}` };
}

// Trục 1: nhận thêm grade/major/cohort/schoolName. Chỉ những field có giá trị mới
// được forward lên server (tránh ghi đè bằng null lúc đăng ký nhanh).
export async function register({ username, displayName, password, role, age,
                                 grade, major, cohort, schoolName }) {
  const body = { username, displayName, password, role, age };
  if (grade != null) body.grade = grade;
  if (major) body.major = major;
  if (cohort) body.cohort = cohort;
  if (schoolName) body.schoolName = schoolName;
  const r = await fetch(`${A}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'same-origin',
    body: JSON.stringify(body),
  });
  const data = await r.json().catch(() => ({}));
  if (r.ok && data?.user) {
    _me = data.user;
    syncToLocal(_me);
    try {
      window.tiziaTrack?.('sign_up', { method: 'password', role: data.user.role || '' });
      // GA4 recommended event "login" — bắn cả 2 để cohort login bao gồm register.
      window.tiziaTrack?.('login', { method: 'register', role: data.user.role || '' });
    } catch {}
    return { ok: true, user: data.user, redirectTo: data.redirectTo || null };
  }
  return { ok: false, error: data?.error || `Lỗi ${r.status}` };
}

// Khai bổ sung profile cho user cũ (Trục 1 backfill). POST /api/auth/complete-profile.
export async function completeProfile({ grade, major, cohort, schoolName }) {
  const body = {};
  if (grade != null) body.grade = grade;
  if (major) body.major = major;
  if (cohort) body.cohort = cohort;
  if (schoolName) body.schoolName = schoolName;
  const r = await fetch(`${A}/complete-profile`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'same-origin',
    body: JSON.stringify(body),
  });
  const data = await r.json().catch(() => ({}));
  if (r.ok && data?.ok) {
    _me = data.user;
    syncToLocal(_me);
    return { ok: true, user: data.user, redirectTo: data.redirectTo || null };
  }
  return { ok: false, error: data?.error || `Lỗi ${r.status}` };
}

export async function logout() {
  try { window.tiziaTrack?.('logout', {}); } catch {}
  // Flush user-state pending lên server TRƯỚC khi gọi /logout (sau khi
  // logout, cookie bị xoá → mọi PUT sẽ 401). Best-effort: nếu mạng lỗi thì
  // chấp nhận mất delta đó, lần đăng nhập kế server hydrate bằng giá trị cũ.
  try { await flushUserState(); } catch {}
  try {
    await fetch(`${A}/logout`, { method: 'POST', credentials: 'same-origin' });
  } catch {}
  _me = null;
  _mePromise = null;
  resetUserState();
  // Xoá cache `tizia:me` + ví local. clearLocalWallet cũng reset _tabOwnerUid
  // và session guards trong wallet.js.
  try { localStorage.removeItem('tizia:me'); } catch {}
  clearLocalWallet();
  // Xoá toàn bộ key local có nguy cơ "lẫn" sang user kế tiếp đăng nhập trên
  // cùng browser. Server vẫn giữ wallet/srs/scn-runs/attempts → user đăng nhập
  // lại trên bất kỳ máy nào sẽ được pull nguyên trạng.
  clearAccountScopedKeys();
  location.replace('login.html');
}

// Mọi key sống ngoài cookie phiên (chứa progress, identity, draft, history…)
// đều phải xoá khi logout VÀ khi phát hiện swap user trên cùng tab. Liệt kê
// thẳng tên thay vì scan prefix vì có cả legacy không có prefix `tizia:`.
const ACCOUNT_SCOPED_LS_KEYS = [
  // Identity / orchestrate
  'class.code', 'player.name', 'playerName', 'player.uid',
  // AI tutor chat history
  'tizia.tutor.history.v1',
  // SRS spaced repetition fallback (server là nguồn chân lý)
  'tizia:srs:v1',
  // Scenario runs cache (server là nguồn chân lý, có MAX merge)
  'tizia:scn-runs',
  // Stars module progress
  'tizia:progress',
  // Mini-game local-only state (math-fun, code-lab, space-quest, do-chu)
  'math2.stars', 'math2.correct',
  'math6.gold', 'math6.xp', 'math6.maxStreak',
  'tizia:space:done',
  // Difficulty / SFX / level đều có thể khác giữa user → reset
  'tizia:difficulty', 'tizia:level',
];

function clearAccountScopedKeys() {
  for (const k of ACCOUNT_SCOPED_LS_KEYS) {
    try { localStorage.removeItem(k); } catch {}
  }
  // Quét prefix động: math6.topic.<id>, math2.topic.<id>, code-lab code drafts
  // (tizia:codelab:* nếu sau này đổi), welcome:*, web-playground draft.
  try {
    const toRemove = [];
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (!k) continue;
      if (k.startsWith('math2.topic.') ||
          k.startsWith('math6.topic.') ||
          k.startsWith('tizia:welcome:') ||
          k.startsWith('codelab:') ||
          k.startsWith('webplayground:') ||
          // it-code-lab + it-web-playground dùng prefix 'tizia:it:' — phải
          // wipe khi đổi tài khoản trên cùng browser, kẻo state-sync union
          // 'solved' set + drafts của user cũ vào row server của user mới.
          k.startsWith('tizia:it:codelab:') ||
          k === 'tizia:it:webplay' ||
          k.startsWith('do-chu-ghep-van.')) {
        toRemove.push(k);
      }
    }
    for (const k of toRemove) localStorage.removeItem(k);
  } catch {}
}

// Người dùng tự sửa hồ sơ (tên hiển thị + tuổi + email). Cập nhật cache _me khi thành công.
export async function updateProfile({ displayName, age, email }) {
  const r = await fetch(`${A}/me`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'same-origin',
    body: JSON.stringify({ displayName, age, email }),
  });
  const data = await r.json().catch(() => ({}));
  if (r.ok && data?.user) {
    _me = data.user;
    syncToLocal(_me);
    return { ok: true, user: data.user };
  }
  return { ok: false, error: data?.error || `Lỗi ${r.status}` };
}

export async function fetchMe() {
  if (_mePromise) return _mePromise;
  _mePromise = (async () => {
    try {
      const r = await fetch(`${A}/me`, { credentials: 'same-origin' });
      if (!r.ok) return null;
      const data = await r.json();
      _me = data?.user || null;
      if (_me) syncToLocal(_me);
      return _me;
    } catch { return null; }
  })();
  return _mePromise;
}

// Đồng bộ sang storage để code cũ (api.js: getPlayerName) đọc được mà không cần await.
// Đồng thời kéo ví (XP/coin/streak) từ server về (ví chỉ ở localStorage thì đổi máy / clear cache = mất level).
// Kéo bất đồng bộ, không block UI.
function syncToLocal(user) {
  if (!user) return;
  // Phát hiện đổi tài khoản trên cùng browser: nếu `tizia:me.id` trước đó
  // khác id mới → wipe ví local của user cũ trước khi pull ví user mới về.
  // Tránh loadWalletFromServer() merge max(local_user_cũ, remote_user_mới).
  try {
    const prev = JSON.parse(localStorage.getItem('tizia:me') || 'null');
    if (prev && prev.id !== user.id) {
      clearLocalWallet();
      // Đổi user trên cùng tab → tất cả key global cũng phải dọn để bridge
      // (orchestrate/adaptive/tutor/srs/mini-game) không "kế thừa" của user cũ.
      clearAccountScopedKeys();
    }
  } catch {}
  // Set `tizia:me` để wallet.js (_currentUid) biết user hiện tại; thiếu thì
  // `_applySessionGuard` thấy curUid=null.
  try {
    localStorage.setItem('tizia:me', JSON.stringify({
      id: user.id, username: user.username, role: user.role,
    }));
  } catch {}
  lsSet(KEYS.PLAYER_NAME, user.display_name);
  lsSet(KEYS.ROLE, user.role);
  loadWalletFromServer().catch(() => {});
  // Hydrate user-state KV (mini-game stars, code drafts, tutor history…).
  // Bất đồng bộ — không block UI. Sau khi xong sẽ tự đăng ký listener flush.
  hydrateUserState().catch(() => {});
}

// Truy cập đồng bộ — chỉ khả dụng sau khi fetchMe() đã chạy hoặc sau login().
export function currentUser() { return _me; }

// Tiện cho hiển thị: trả về display_name từ cache (localStorage) ngay cả khi
// chưa await fetchMe — tránh nháy UI rỗng. Server vẫn là nguồn chân lý cho /api/attempts.
export function cachedDisplayName() {
  return _me?.display_name || lsGet(KEYS.PLAYER_NAME) || '';
}

// Tự fetch /me khi script được import. Page đã pass auth-gate → 200; nếu fail (race
// điều kiện hiếm), fallback: redirect login.
export async function bootstrapMe({ redirectOnFail = true } = {}) {
  const user = await fetchMe();
  if (!user && redirectOnFail) {
    const ret = encodeURIComponent(location.pathname + location.search);
    location.replace('login.html?return=' + ret);
  }
  return user;
}
