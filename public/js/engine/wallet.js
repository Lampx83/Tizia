// ============================================================
// Wallet & gamification — coin / streak / achievements
// ============================================================
// Toàn bộ state lưu vào localStorage. Engine domain-agnostic;
// catalog achievement đặt ở domains/<id>/achievements.js.
//
// Usage:
//   const w = getWallet();
//   const ev = onLogin();         // cập nhật streak
//   const ev2 = awardForResult(progress, mod, result);
//   for (const a of [...ev.unlocked, ...ev2.unlocked]) showToast(a);
// ============================================================

import { KEYS, lsGet } from './storage.js';
import {
  levelInfo, xpForResult, streakMilestoneReward,
  generateDailyQuests, evalQuest,
} from './gamification.js';

const WALLET_KEY = KEYS.WALLET;
const PROGRESS_KEY = KEYS.PROGRESS;

// ── Anti-regression guard ────────────────────────────────────────────────────
// Trong session, XP/coins/streak có thể TỤT về 0 nếu localStorage bị
// đọc lúc chưa sync xong hoặc bị race condition với syncToLocal(): HUD hiển
// thị Lv 1 trong khi DB vẫn nguyên 10k+ XP. Data trên server không mất; chỉ
// là display tearing.
//
// Nhớ giá trị MAX đã thấy trong session, không bao giờ trả về thấp hơn. Reset khi: (a) đăng xuất (page reload), (b) user_id thay đổi (cùng
// tab nhưng đổi tài khoản — đặt session.uid). Nếu phát hiện regression →
// console.warn + (tuỳ chọn) tiziaTrack để debug sau.
let _sessionMaxXp     = 0;
let _sessionMaxCoins  = 0;
let _sessionUid       = null;

// ── Stale-tab guard ──────────────────────────────────────────────────────────
// Cookie phiên + `tizia:me` dùng CHUNG cho mọi tab/cửa sổ của cùng browser,
// nhưng mỗi tab giữ ví riêng trong bộ nhớ. Khi tab B đăng nhập user khác,
// `tizia:me` đổi cho CẢ tab A — mà tab A không hề hay (không có storage
// listener). Mọi _save() ở tab A sau đó đọc `tizia:me` = user mới → đóng dấu
// nhầm ví XP-cao của user A thành user B rồi PUT bằng cookie user B. Server
// monotonic chỉ tăng → user B bị đẩy lên vĩnh viễn.
//
// Chốt "chủ ví của tab" lúc đồng bộ ví cho 1 user đã xác thực
// (loadWalletFromServer). Mọi save/push sau đó nếu `tizia:me` hiện tại khác
// chủ tab → tab này đã "ôi", TỪ CHỐI ghi/đẩy (không mis-stamp). `_tabOwnerUid`
// CHỈ đổi qua loadWalletFromServer (đăng nhập lại cùng tab) hoặc reset khi
// clearLocalWallet — KHÔNG bị tab khác sửa underneath.
let _tabOwnerUid = null;

/** Tab này có đang chạy cho 1 user nhưng `tizia:me` đã bị tab khác đổi không? */
function _isStaleTab() {
  return _tabOwnerUid != null && _currentUid() !== _tabOwnerUid;
}

// Tab khác đổi `tizia:me` (đăng nhập user khác) → storage event chỉ bắn ở các
// tab KHÔNG gây ra thay đổi, đúng là tab "ôi" cần khoá. Báo cho UI biết để
// hiển thị banner / tự reload; bản thân save/push đã được _isStaleTab chặn.
try {
  window.addEventListener('storage', (e) => {
    if (e.key !== 'tizia:me') return;
    if (_isStaleTab()) {
      console.warn('[wallet] tài khoản đã đổi ở tab khác — tab này bị khoá đồng bộ ví');
      try { window.dispatchEvent(new CustomEvent('tizia:account-changed-elsewhere', {
        detail: { owner: _tabOwnerUid, now: _currentUid() },
      })); } catch {}
    }
  });
} catch {}

// Đọc uid hiện tại từ cache `tizia:me` (set khi login / bootstrapMe). Trả về
// null nếu chưa có — caller phải xử lý: chưa biết user thì KHÔNG trả ví local
// (vì có thể là ví của user trước còn sót trong localStorage).
function _currentUid() {
  try {
    const me = JSON.parse(localStorage.getItem('tizia:me') || 'null');
    return me?.id ?? null;
  } catch { return null; }
}

function _applySessionGuard(w) {
  const curUid = _currentUid();
  if (curUid !== _sessionUid) {
    _sessionUid = curUid;
    _sessionMaxXp = 0;
    _sessionMaxCoins = 0;
  }

  const xp    = Number(w.xp || 0);
  const coins = Number(w.coins || 0);

  if (xp < _sessionMaxXp - 5) {       // tolerance 5 để tránh false positive do làm tròn
    console.warn(`[wallet] XP regression in session: ${xp} < ${_sessionMaxXp} → giữ max (anti-bug #5)`);
    try { window.tiziaTrack?.('wallet_regression', { kind:'xp', cur:xp, max:_sessionMaxXp }); } catch {}
    w.xp = _sessionMaxXp;
  } else if (xp > _sessionMaxXp) {
    _sessionMaxXp = xp;
  }
  if (coins < _sessionMaxCoins - 5) {
    console.warn(`[wallet] Coins regression in session: ${coins} < ${_sessionMaxCoins} → giữ max`);
    try { window.tiziaTrack?.('wallet_regression', { kind:'coins', cur:coins, max:_sessionMaxCoins }); } catch {}
    w.coins = _sessionMaxCoins;
  } else if (coins > _sessionMaxCoins) {
    _sessionMaxCoins = coins;
  }
  return w;
}

/** @returns {import('./types.js').Wallet} */
export function getWallet() {
  try {
    const raw = lsGet(WALLET_KEY);
    if (raw) {
      const w = JSON.parse(raw);
      // ── Cross-user pollution guard (fix bug "ví admin lẫn với enderman")
      // Trước đây WALLET_KEY là 1 slot dùng chung mọi user trên browser →
      // đổi account, localStorage còn ví cũ → loadWalletFromServer merge max
      // rồi push ngược lên DB user mới. Stamp `_uid` lúc save; lúc load nếu
      // ví trong localStorage thuộc UID khác current → vứt, dùng remote.
      const curUid = _currentUid();
      if (curUid != null && w._uid != null && w._uid !== curUid) {
        console.warn(`[wallet] discard local wallet of uid=${w._uid} (current=${curUid}) — cross-user pollution prevented`);
        try { localStorage.removeItem(WALLET_KEY); } catch {}
        return _applySessionGuard(_normalizeWallet({}));
      }
      return _applySessionGuard(_normalizeWallet(w));
    }
  } catch {}
  return _applySessionGuard(_normalizeWallet({}));
}

/** Clear toàn bộ ví trong localStorage. Gọi khi logout, đổi account. */
export function clearLocalWallet() {
  try { localStorage.removeItem(WALLET_KEY); } catch {}
  _sessionMaxXp = 0;
  _sessionMaxCoins = 0;
  _sessionUid = null;
  _tabOwnerUid = null;
}

function _normalizeWallet(w) {
  return {
    _uid: w._uid ?? null,                  // stamp uid (cross-user pollution guard)
    coins: w.coins ?? 0,
    xp: w.xp ?? 0,
    streak: w.streak ?? 0,
    longestStreak: w.longestStreak ?? (w.streak ?? 0),
    streakShields: w.streakShields ?? 0,
    lastVisitDay: w.lastVisitDay ?? '',
    achievements: Array.isArray(w.achievements) ? w.achievements : [],
    vrSessions: w.vrSessions ?? 0,
    metaSessions: w.metaSessions ?? 0,
    quizzesPassed: w.quizzesPassed ?? 0,
    modulesByDay: w.modulesByDay ?? {},   // { 'YYYY-MM-DD': Set<moduleId> } serialized as array
    daily: _normalizeDaily(w.daily, _today()),
    questsClaimed: w.questsClaimed && w.questsClaimed.date === _today()
      ? w.questsClaimed
      : { date: _today(), ids: [] },
  };
}

/** Per-day activity counters that drive daily quests. Resets each calendar day. */
function _normalizeDaily(d, today) {
  if (!d || d.date !== today) {
    return { date: today, checkin: 0, modulesPassed: 0, minutes: 0, bestCorrect: 0, threeStars: 0, quizzesPassed: 0 };
  }
  return {
    date: today,
    checkin: d.checkin ?? 0,
    modulesPassed: d.modulesPassed ?? 0,
    minutes: d.minutes ?? 0,
    bestCorrect: d.bestCorrect ?? 0,
    threeStars: d.threeStars ?? 0,
    quizzesPassed: d.quizzesPassed ?? 0,
  };
}

function _save(w) {
  // Stamp uid hiện tại để getWallet() biết ví này thuộc về ai. Nếu chưa biết
  // uid (chưa login xong) → KHÔNG ghi vào localStorage; tránh tạo ví "vô chủ"
  // sau này bị merge nhầm khi user thật vừa login xong.
  const curUid = _currentUid();
  if (curUid == null) return;
  // Stale-tab guard: tab này mở cho chủ A nhưng `tizia:me` đã thành B (tab khác
  // đăng nhập) → KHÔNG ghi ví A dưới nhãn B, KHÔNG push (sẽ đẩy bằng cookie B).
  if (_isStaleTab()) {
    console.warn(`[wallet] stale tab (owner=${_tabOwnerUid}, tizia:me=${curUid}) → bỏ qua save/push`);
    return;
  }
  w._uid = curUid;
  try { localStorage.setItem(WALLET_KEY, JSON.stringify(w)); } catch {}
  _schedulePushToServer();
}

// ── Server sync ──
// localStorage là cache; nguồn chân lý là DB. Sau login, loadWalletFromServer()
// kéo ví về và merge MAX với local (xử lý trường hợp client đã có XP cao hơn
// trước khi bản fix sync lên server). Mỗi _save() schedule push 500ms — gộp
// các update gần nhau (vd lên Lv → unlock achievement → quest claim).
let _pushTimer = null;
let _serverSyncEnabled = false;

// Đọc wallet MỚI NHẤT từ localStorage rồi push — KHÔNG capture snapshot tại
// lúc schedule. Tránh race: nếu trong khoảng 500ms loadWalletFromServer ghi
// đè localStorage bằng giá trị merge (XP cao hơn), push sau cùng vẫn dùng
// giá trị mới — không tụt level về lại snapshot cũ.
function _schedulePushToServer() {
  if (!_serverSyncEnabled) return;
  clearTimeout(_pushTimer);
  _pushTimer = setTimeout(() => {
    // Belt-and-suspenders: chặn lần nữa tại thời điểm bắn (tab có thể "ôi"
    // trong 500ms debounce — đăng nhập tab khác xen vào).
    if (_isStaleTab()) {
      console.warn('[wallet] stale tab → huỷ push đã debounce');
      return;
    }
    _pushToServer(getWallet());
  }, 500);
}

async function _pushToServer(w) {
  try {
    await fetch('/api/wallet', {
      method: 'PUT',
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(w),
    });
  } catch {}     // offline → cứ giữ trong localStorage, lần save sau retry
}

/**
 * Pull ví từ server và merge với local (lấy MAX từng field). Gọi sau khi
 * `bootstrapMe()` xác nhận có user — trước thời điểm này không biết user_id
 * nào nên không thể fetch. Nếu cả 2 cùng rỗng → giữ ví rỗng mặc định.
 */
export async function loadWalletFromServer() {
  _serverSyncEnabled = true;
  // Chốt chủ ví của tab này = user hiện tại (đã được syncToLocal set `tizia:me`
  // TRƯỚC khi gọi hàm này). Đây là nơi DUY NHẤT _tabOwnerUid được gán: đăng
  // nhập lại cùng tab sẽ cập nhật chủ mới; tab khác đổi `tizia:me` thì KHÔNG.
  { const owner = _currentUid(); if (owner != null) _tabOwnerUid = owner; }
  let remote = null;
  let fetchOk = false;
  try {
    const r = await fetch('/api/wallet', { credentials: 'same-origin' });
    if (r.ok) { fetchOk = true; remote = await r.json(); }   // remote=null khi server CHƯA có ví
  } catch {}
  if (!fetchOk) {
    // GET lỗi (mạng / 5xx / 401 race) → TUYỆT ĐỐI không đẩy local lên server,
    // tránh clobber giá trị cao đang có trên DB bằng snapshot local thấp. Chỉ
    // dùng local để render; lần _save kế (server-side monotonic guard) sẽ sync.
    return getWallet();
  }
  // Cross-user guard: nếu localStorage còn ví của UID khác (vd vừa logout
  // admin → login enderman) → vứt sạch, KHÔNG merge max. Phải làm TRƯỚC khi
  // gọi getWallet() vì getWallet đã tự discard nếu _uid mismatch — nhưng nó
  // trả về ví rỗng có _uid=null. Để chắc chắn, gọi clearLocalWallet trực
  // tiếp khi uid hiện tại đã biết và khác _uid local.
  try {
    const curUid = _currentUid();
    const rawLocal = lsGet(WALLET_KEY);
    if (rawLocal) {
      const w = JSON.parse(rawLocal);
      if (curUid != null && w._uid != null && w._uid !== curUid) {
        clearLocalWallet();
      }
    }
  } catch {}
  if (!remote) {
    // Server xác nhận chưa có ví (200 + null) → đẩy local lên lần đầu. An toàn vì
    // server chưa có gì để mất. Monotonic guard phía server vẫn bảo vệ về sau.
    const local = getWallet();
    if (local.xp > 0 || local.coins > 0) _pushToServer(local);
    return local;
  }
  // Merge MAX: nếu local có XP cao hơn (vd user vừa chơi offline), giữ local;
  // ngược lại nhận remote. Field non-numeric (achievements, modulesByDay) ưu
  // tiên remote vì là cumulative state — local chỉ có khi từng được _save().
  const local = getWallet();
  const merged = _normalizeWallet({
    coins:         Math.max(local.coins, remote.coins || 0),
    xp:            Math.max(local.xp, remote.xp || 0),
    streak:        Math.max(local.streak, remote.streak || 0),
    longestStreak: Math.max(local.longestStreak, remote.longestStreak || 0),
    streakShields: Math.max(local.streakShields, remote.streakShields || 0),
    // lastVisitDay lấy theo bản gần nhất (chuỗi YYYY-MM-DD so sánh được)
    lastVisitDay:  (remote.lastVisitDay || '') > (local.lastVisitDay || '')
                     ? remote.lastVisitDay : local.lastVisitDay,
    achievements:  [...new Set([...(local.achievements || []), ...(remote.achievements || [])])],
    vrSessions:    Math.max(local.vrSessions, remote.vrSessions || 0),
    metaSessions:  Math.max(local.metaSessions, remote.metaSessions || 0),
    quizzesPassed: Math.max(local.quizzesPassed, remote.quizzesPassed || 0),
    modulesByDay:  { ...(remote.modulesByDay || {}), ...(local.modulesByDay || {}) },
    // daily + questsClaimed của hôm nay: ưu tiên cái có date khớp today
    daily:         _pickDaily(local.daily, remote.daily),
    questsClaimed: _pickQuestsClaimed(local.questsClaimed, remote.questsClaimed),
  });
  try { localStorage.setItem(WALLET_KEY, JSON.stringify(merged)); } catch {}
  // Nếu merge ra giá trị khác remote → đẩy ngay lên server để DB cũng có bản mới.
  if (merged.xp > (remote.xp || 0) || merged.coins > (remote.coins || 0)) {
    _pushToServer(merged);
  }
  // Báo cho UI biết ví đã được hydrate từ server (dashboard re-render).
  try { window.dispatchEvent(new CustomEvent('tizia:wallet-synced', { detail: merged })); } catch {}
  return merged;
}

function _pickDaily(a, b) {
  const today = _today();
  if (a?.date === today && b?.date !== today) return a;
  if (b?.date === today && a?.date !== today) return b;
  // Cùng ngày → max từng counter. Khác ngày → cái mới hơn.
  if (a?.date === b?.date) {
    return {
      date: a?.date || today,
      checkin:       Math.max(a?.checkin || 0, b?.checkin || 0),
      modulesPassed: Math.max(a?.modulesPassed || 0, b?.modulesPassed || 0),
      minutes:       Math.max(a?.minutes || 0, b?.minutes || 0),
      bestCorrect:   Math.max(a?.bestCorrect || 0, b?.bestCorrect || 0),
      threeStars:    Math.max(a?.threeStars || 0, b?.threeStars || 0),
      quizzesPassed: Math.max(a?.quizzesPassed || 0, b?.quizzesPassed || 0),
    };
  }
  return (a?.date || '') > (b?.date || '') ? a : b;
}

function _pickQuestsClaimed(a, b) {
  if (a?.date !== b?.date) {
    return (a?.date || '') > (b?.date || '') ? a : b;
  }
  return { date: a.date, ids: [...new Set([...(a?.ids || []), ...(b?.ids || [])])] };
}

/** Public save (used by gamification UI flows). */
export function saveWallet(w) { _save(w); }

/** Today as YYYY-MM-DD (local). */
export function todayStr() { return _today(); }

/** Level/rank snapshot from current XP. */
export function getLevelInfo() { return levelInfo(getWallet().xp); }

function _today() {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function _daysBetween(a, b) {
  if (!a || !b) return Infinity;
  const da = new Date(a + 'T00:00:00');
  const db = new Date(b + 'T00:00:00');
  return Math.round((db - da) / 86400000);
}

// ─────────────────────────────────────────────────────────────
// Events
// ─────────────────────────────────────────────────────────────

/**
 * Gọi 1 lần khi user mở trang — cập nhật streak (có streak-shield),
 * điểm danh cho daily quest, và thưởng mốc streak.
 * @returns {{wallet, streakIncreased:boolean, shieldUsed:boolean, milestone:object|null}}
 */
export function onLogin() {
  const w = getWallet();
  const today = _today();
  const before = w.streak;
  let shieldUsed = false;
  let milestone = null;

  if (w.lastVisitDay === today) {
    // already counted today, no-op
  } else {
    const gap = _daysBetween(w.lastVisitDay, today);
    if (gap === 1) {
      w.streak = (w.streak || 0) + 1;
    } else if (gap === 2 && w.streakShields > 0) {
      // Missed exactly one day but a shield saves the streak (counts today).
      w.streakShields -= 1;
      w.streak = (w.streak || 0) + 1;
      shieldUsed = true;
    } else {
      w.streak = 1;
    }
    w.lastVisitDay = today;

    // Milestone reward (only when streak grew into a new milestone day).
    if (w.streak > before) {
      const r = streakMilestoneReward(w.streak);
      if (r) {
        w.coins += r.coin;
        w.xp += r.xp;
        w.streakShields += r.shield;
        milestone = r;
      }
    }
  }

  // Daily check-in (drives the "Điểm danh" quest); resets via getWallet each day.
  w.daily.checkin = 1;
  if ((w.streak || 0) > (w.longestStreak || 0)) w.longestStreak = w.streak;
  _save(w);
  return { wallet: w, streakIncreased: w.streak > before, shieldUsed, milestone };
}

/** True nếu user CHƯA học gì hôm nay (streak đang "có nguy cơ" cho ngày mai). */
export function streakAtRisk() {
  const w = getWallet();
  return (w.daily.modulesPassed || 0) === 0;
}

/**
 * Sau khi scenario complete: cập nhật coin, quizzesPassed,
 * modulesByDay, kiểm achievement.
 * @param {Object} progress - module-stars progress map (key tizia:progress)
 * @param {import('./types.js').CourseModule} mod
 * @param {{ stars:number, score:number }} result
 * @param {import('./types.js').Achievement[]} [catalog]
 */
export function awardForResult(progress, mod, result, catalog = []) {
  const w = getWallet();
  const today = _today();
  const stars = Math.max(0, Math.min(3, result?.stars ?? 0));
  const prevStars = progress?.[mod?.id]?.stars || 0;
  const firstClear = prevStars < 1 && stars >= 1;

  // Snapshot daily quest state BEFORE this action (to detect newly-completed).
  const dailyBefore = { ...w.daily };

  // Coin: base (stars × 10) + streak bonus × 2, + first-clear bonus.
  const coinsGained = stars * (mod?.rewardCoin ? Math.max(1, Math.floor(mod.rewardCoin / 10)) : 10)
    + (w.streak * 2) + (firstClear ? 25 : 0);
  w.coins += coinsGained;

  // XP
  const levelBefore = levelInfo(w.xp).level;
  const xpGained = xpForResult(result, firstClear);
  w.xp += xpGained;
  const levelAfterInfo = levelInfo(w.xp);
  const levelAfter = levelAfterInfo.level;

  const isQuiz = result?.scenarioId?.includes('quiz') || result?.kind === 'quiz';
  if (isQuiz && stars >= 1) w.quizzesPassed += 1;

  // Daily activity counters
  if (stars >= 1) {
    const dayList = new Set(w.modulesByDay[today] || []);
    dayList.add(mod.id);
    w.modulesByDay[today] = [...dayList];
    w.daily.modulesPassed = dayList.size;          // distinct modules passed today
  }
  if (stars === 3) w.daily.threeStars = (w.daily.threeStars || 0) + 1;
  const correct = result?.details?.correct;
  if (typeof correct === 'number') w.daily.bestCorrect = Math.max(w.daily.bestCorrect || 0, correct);
  if (isQuiz && stars >= 1) w.daily.quizzesPassed = (w.daily.quizzesPassed || 0) + 1;
  const mins = Math.max(1, Math.round((result?.durationMs || 0) / 60000));
  w.daily.minutes = (w.daily.minutes || 0) + mins;

  // Detect quests completed by THIS action
  const questsCompleted = _newlyCompletedQuests(dailyBefore, w.daily, today);
  // Auto-grant quest rewards
  let questCoin = 0, questXp = 0;
  const claimedIds = new Set(w.questsClaimed.ids);
  for (const q of questsCompleted) {
    if (claimedIds.has(q.id)) continue;
    claimedIds.add(q.id);
    questCoin += q.reward.coin; questXp += q.reward.xp;
  }
  if (questCoin || questXp) {
    w.coins += questCoin; w.xp += questXp;
    w.questsClaimed = { date: today, ids: [...claimedIds] };
  }
  const levelFinal = levelInfo(w.xp).level;

  _save(w);

  // Evaluate achievements against progress INCLUDING this result's stars,
  // so a "đạt 3★ ở module X" badge can unlock on the same completion.
  const progressForCheck = {
    ...(progress || {}),
    [mod.id]: { stars: Math.max(prevStars, stars), timestamp: Date.now() },
  };

  return {
    wallet: w,
    coinsGained: coinsGained + questCoin,
    xpGained: xpGained + questXp,
    levelBefore,
    levelAfter: levelFinal,
    levelUp: levelFinal > levelBefore,
    firstClear,
    questsCompleted,
    unlocked: checkAchievements(progressForCheck, w, catalog),
  };
}

/** Compare daily counters before/after and return quests newly satisfied. */
function _newlyCompletedQuests(before, after, today) {
  const quests = generateDailyQuests(today);
  const out = [];
  for (const q of quests) {
    const wasDone = evalQuest(q, before).done;
    const nowDone = evalQuest(q, after).done;
    if (!wasDone && nowDone) out.push(q);
  }
  return out;
}

/** Current daily quests with live progress (for UI panels). */
export function getDailyQuests() {
  const w = getWallet();
  const claimed = new Set(w.questsClaimed.ids);
  return generateDailyQuests(w.daily.date).map(q => {
    const { progress, done } = evalQuest(q, w.daily);
    return { ...q, progress, done, claimed: claimed.has(q.id) };
  });
}

/** Add study minutes (heartbeat from learning pages). */
export function recordStudyMinutes(mins) {
  const w = getWallet();
  w.daily.minutes = (w.daily.minutes || 0) + Math.max(0, mins);
  _save(w);
  return w;
}

/** Track 1 lần vào VR mode. */
export function noteVRSession(catalog = []) {
  const w = getWallet();
  w.vrSessions += 1;
  _save(w);
  return { wallet: w, unlocked: checkAchievements(getProgress(), w, catalog) };
}

/** Track 1 lần vào Metaverse. */
export function noteMetaverseVisit(catalog = []) {
  const w = getWallet();
  w.metaSessions += 1;
  _save(w);
  return { wallet: w, unlocked: checkAchievements(getProgress(), w, catalog) };
}

// ─────────────────────────────────────────────────────────────
// Achievement engine
// ─────────────────────────────────────────────────────────────

/**
 * Check all achievements in catalog; mark new ones as unlocked.
 * @returns {import('./types.js').Achievement[]} newly unlocked
 */
export function checkAchievements(progress, wallet, catalog) {
  if (!Array.isArray(catalog) || catalog.length === 0) return [];
  const unlocked = new Set(wallet.achievements);
  const newly = [];
  const totalStars = Object.values(progress || {}).reduce((s, p) => s + (p?.stars || 0), 0);
  const today = _today();
  const todayModules = (wallet.modulesByDay?.[today] || []).length;

  for (const a of catalog) {
    if (unlocked.has(a.id)) continue;
    if (_satisfies(a.trigger, { wallet, progress, totalStars, todayModules })) {
      unlocked.add(a.id);
      newly.push(a);
    }
  }
  if (newly.length) {
    wallet.achievements = [...unlocked];
    _save(wallet);
  }
  return newly;
}

function _satisfies(trigger, ctx) {
  if (!trigger) return false;
  if (trigger.quizzesPassed != null && ctx.wallet.quizzesPassed < trigger.quizzesPassed) return false;
  if (trigger.modulesIn1Day != null && ctx.todayModules < trigger.modulesIn1Day) return false;
  if (trigger.streak != null && ctx.wallet.streak < trigger.streak) return false;
  if (trigger.totalStars != null && ctx.totalStars < trigger.totalStars) return false;
  if (trigger.vrSessions != null && ctx.wallet.vrSessions < trigger.vrSessions) return false;
  if (trigger.metaverseVisit != null && ctx.wallet.metaSessions < trigger.metaverseVisit) return false;
  if (trigger.moduleStars) {
    for (const [mid, need] of Object.entries(trigger.moduleStars)) {
      if ((ctx.progress?.[mid]?.stars ?? 0) < need) return false;
    }
  }
  if (trigger.yearComplete != null) {
    // Caller cần inject `_yearModuleCounts` via global; skip if missing
    const counts = ctx.yearCounts?.[trigger.yearComplete];
    if (!counts || counts.passed < counts.total) return false;
  }
  return true;
}

// ─────────────────────────────────────────────────────────────
// Progress helpers (legacy compat)
// ─────────────────────────────────────────────────────────────

export function getProgress() {
  try {
    const raw = lsGet(PROGRESS_KEY);
    if (!raw) return {};
    const obj = JSON.parse(raw);
    // Cross-user pollution guard: progress stamp uid khi save. Nếu uid hiện tại
    // khác → vứt, trả map rỗng (server scenario-runs / wallet là nguồn chân lý
    // cho XP/coin; progress chỉ là cache stars để render module list).
    const curUid = _currentUid();
    if (curUid != null && obj && obj._uid != null && obj._uid !== curUid) {
      try { localStorage.removeItem(PROGRESS_KEY); } catch {}
      return {};
    }
    // Loại field nội bộ _uid khỏi map trả ra để caller không lẫn vào module id.
    const { _uid, ...stars } = obj || {};
    return stars;
  } catch {
    return {};
  }
}

export function setProgress(p) {
  // Stamp uid; nếu chưa biết user (chưa login xong) → bỏ qua giống wallet, tránh
  // tạo ví "vô chủ" lẫn sang user kế.
  const curUid = _currentUid();
  if (curUid == null) return;
  if (_isStaleTab()) return;
  try {
    localStorage.setItem(PROGRESS_KEY, JSON.stringify({ ...p, _uid: curUid }));
  } catch {}
}

/** Cập nhật stars cho 1 module (chỉ nếu cao hơn lần trước). */
export function recordModuleStars(moduleId, stars) {
  const p = getProgress();
  const cur = p[moduleId]?.stars || 0;
  if (stars > cur) {
    p[moduleId] = { stars, timestamp: Date.now() };
    setProgress(p);
  }
  return p;
}

// ─────────────────────────────────────────────────────────────
// Scenario-runs — đếm số lần hoàn thành theo familyId
// (familyId ổn định kể cả khi scenario id được random hoá mỗi lần)
// ─────────────────────────────────────────────────────────────

const SCN_RUNS_KEY = KEYS.SCN_RUNS;

export function getScenarioRunsMap() {
  try {
    const raw = lsGet(SCN_RUNS_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch { return {}; }
}

export function getScenarioRuns(familyId) {
  if (!familyId) return null;
  const m = getScenarioRunsMap();
  return m[familyId] || null;
}

export function recordScenarioRun(familyId, stars, score) {
  if (!familyId) return;
  try {
    const m = getScenarioRunsMap();
    const cur = m[familyId] || { runs: 0, bestStars: 0, bestScore: 0, lastTs: 0 };
    cur.runs = (cur.runs || 0) + 1;
    if ((stars || 0) > (cur.bestStars || 0)) cur.bestStars = stars || 0;
    if ((score || 0) > (cur.bestScore || 0)) cur.bestScore = score || 0;
    cur.lastTs = Date.now();
    m[familyId] = cur;
    localStorage.setItem(SCN_RUNS_KEY, JSON.stringify(m));
  } catch {}
  // Stale tab (tài khoản đã đổi ở tab khác) → không POST: tránh đẩy run của
  // user này sang user kia bằng cookie hiện hành. Cache local vẫn giữ.
  if (_isStaleTab()) return;
  // Fire-and-forget gửi server để cross-device. Khi response về, replace local
  // bằng số liệu DB (nguồn chân lý) — chống lệch nếu user dùng nhiều tab/máy.
  try {
    fetch('/api/scenario-runs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'same-origin',
      body: JSON.stringify({ familyId, stars: stars || 0, score: score || 0 }),
    }).then(r => r.ok ? r.json() : null).then(server => {
      if (!server || !server.familyId) return;
      try {
        const m2 = getScenarioRunsMap();
        m2[server.familyId] = {
          runs: server.runs | 0,
          bestStars: server.bestStars | 0,
          bestScore: server.bestScore | 0,
          lastTs: Number(server.lastTs) || Date.now(),
        };
        localStorage.setItem(SCN_RUNS_KEY, JSON.stringify(m2));
      } catch {}
    }).catch(() => {}); // guest / network lỗi → bỏ qua, cache local vẫn dùng được
  } catch {}
}

/** Pull bản DB về và merge MAX vào localStorage (gọi khi mở module.html). */
export async function loadScenarioRunsFromServer() {
  try {
    const r = await fetch('/api/scenario-runs', { credentials: 'same-origin' });
    if (!r.ok) return null;                                     // 401 guest → bỏ qua
    const server = await r.json();
    if (!server || typeof server !== 'object') return null;
    const local = getScenarioRunsMap();
    const merged = { ...local };
    for (const [fid, sv] of Object.entries(server)) {
      const lc = local[fid] || { runs: 0, bestStars: 0, bestScore: 0, lastTs: 0 };
      merged[fid] = {
        runs:      Math.max(lc.runs | 0,      sv.runs | 0),
        bestStars: Math.max(lc.bestStars | 0, sv.bestStars | 0),
        bestScore: Math.max(lc.bestScore | 0, sv.bestScore | 0),
        lastTs:    Math.max(Number(lc.lastTs) || 0, Number(sv.lastTs) || 0),
      };
    }
    localStorage.setItem(SCN_RUNS_KEY, JSON.stringify(merged));
    return merged;
  } catch { return null; }
}
