// ============================================================
// Gamification — PURE logic (no localStorage, no DOM)
// ============================================================
// XP & level curve · rank tiers · avatar/title ladder ·
// daily-quest pool + evaluation · progress aggregation ·
// "next milestone" + recommend-next.
//
// Keep this file SIDE-EFFECT FREE so wallet.js can import it
// without a circular dependency (wallet owns all state/IO).
// ============================================================

// ─────────────────────────────────────────────────────────────
// XP & LEVEL
// ─────────────────────────────────────────────────────────────
// XP needed to advance FROM level L to L+1 (L ≥ 1).
export function xpToNext(level) {
  return 60 + Math.max(1, level) * 40; // L1→2:100, L2→3:140, L3→4:180…
}

/** Total cumulative XP required to *reach* the start of `level`. */
export function cumulativeXp(level) {
  const n = Math.max(1, level) - 1; // levels fully completed
  // Σ_{k=1..n} (60 + 40k) = 60n + 40·n(n+1)/2
  return 60 * n + 40 * (n * (n + 1)) / 2;
}

/**
 * @param {number} totalXp
 * @returns {{ level:number, intoLevel:number, span:number, pct:number, toNext:number }}
 */
export function levelInfo(totalXp) {
  const xp = Math.max(0, totalXp || 0);
  let level = 1;
  while (xp >= cumulativeXp(level + 1)) level++;
  const base = cumulativeXp(level);
  const span = xpToNext(level);
  const intoLevel = xp - base;
  return {
    level,
    intoLevel,
    span,
    toNext: Math.max(0, span - intoLevel),
    pct: Math.min(100, Math.round((intoLevel / span) * 100)),
  };
}

// ─────────────────────────────────────────────────────────────
// RANK · AVATAR · TITLE
// ─────────────────────────────────────────────────────────────
export const RANKS = [
  { min: 1,  key: 'bronze',   name: 'Đồng',      icon: '🥉', color: '#cd7f32' },
  { min: 5,  key: 'silver',   name: 'Bạc',       icon: '🥈', color: '#cbd5e1' },
  { min: 10, key: 'gold',     name: 'Vàng',      icon: '🥇', color: '#fbbf24' },
  { min: 18, key: 'platinum', name: 'Bạch kim',  icon: '💠', color: '#67e8f9' },
  { min: 28, key: 'diamond',  name: 'Kim cương', icon: '💎', color: '#a78bfa' },
  { min: 40, key: 'master',   name: 'Cao thủ',   icon: '👑', color: '#f472b6' },
];

/** @returns {{rank:object, next:object|null, levelsToNext:number}} */
export function rankFor(level) {
  let idx = 0;
  for (let i = 0; i < RANKS.length; i++) if (level >= RANKS[i].min) idx = i;
  const rank = RANKS[idx];
  const next = RANKS[idx + 1] || null;
  return { rank, next, levelsToNext: next ? next.min - level : 0 };
}

const AVATAR_LADDER = ['🐣', '🦊', '🐯', '🦅', '🐉', '👑'];
export function avatarFor(level) {
  const { rank } = rankFor(level);
  const i = RANKS.findIndex(r => r.key === rank.key);
  return AVATAR_LADDER[Math.min(i, AVATAR_LADDER.length - 1)];
}

/**
 * Title from mastery: a subject with strong stars earns a themed title,
 * otherwise a level-based title.
 * @param {{subjects?:Record<string,{stars:number}>}} agg
 */
export function titleFor(agg, level = 1) {
  const subj = agg?.subjects || {};
  const SUBJECT_TITLES = {
    'toan':    'Nhà thám hiểm Toán học',
    'ngu-van': 'Hiệp sĩ Ngữ văn',
    'tieng-anh': 'Sứ giả Tiếng Anh',
    'khtn':    'Nhà khoa học nhí',
  };
  let bestId = null, bestStars = 0;
  for (const [id, s] of Object.entries(subj)) {
    if ((s.stars || 0) > bestStars) { bestStars = s.stars || 0; bestId = id; }
  }
  if (bestId && bestStars >= 6 && SUBJECT_TITLES[bestId]) return SUBJECT_TITLES[bestId];
  if (level >= 40) return 'Huyền thoại học đường';
  if (level >= 28) return 'Bậc thầy tri thức';
  if (level >= 18) return 'Cao thủ luyện thi';
  if (level >= 10) return 'Học giả trẻ';
  if (level >= 5)  return 'Học viên chăm chỉ';
  return 'Tân binh';
}

// ─────────────────────────────────────────────────────────────
// XP reward for a completed scenario
// ─────────────────────────────────────────────────────────────
export function xpForResult(result, firstClear) {
  const score = Math.max(0, Math.min(100, result?.score ?? 0));
  const stars = Math.max(0, Math.min(3, result?.stars ?? 0));
  const base = Math.round(score * 0.5) + stars * 10;
  return Math.max(10, base + (firstClear ? 40 : 5));
}

// ─────────────────────────────────────────────────────────────
// STREAK milestones
// ─────────────────────────────────────────────────────────────
export const STREAK_MILESTONES = [3, 7, 14, 30, 60, 100];
/** Reward when a streak first reaches a milestone day. */
export function streakMilestoneReward(streak) {
  if (!STREAK_MILESTONES.includes(streak)) return null;
  const coin = streak * 5;
  const xp = streak * 4;
  // Earn a shield at 7/14/30/… to protect a future missed day.
  const shield = streak >= 7 ? 1 : 0;
  return { coin, xp, shield, streak };
}

// ─────────────────────────────────────────────────────────────
// DAILY QUESTS
// ─────────────────────────────────────────────────────────────
/** Metric keys live on wallet.daily. */
export const QUEST_POOL = [
  { id: 'checkin',    icon: '📅', metric: 'checkin',       goal: 1, label: 'Điểm danh hôm nay',        reward: { xp: 15, coin: 10 } },
  { id: 'one-lesson', icon: '✅', metric: 'modulesPassed', goal: 1, label: 'Hoàn thành 1 bài học',      reward: { xp: 30, coin: 20 } },
  { id: 'two-lessons',icon: '📚', metric: 'modulesPassed', goal: 2, label: 'Hoàn thành 2 bài học',      reward: { xp: 55, coin: 40 } },
  { id: 'study-10',   icon: '⏱️', metric: 'minutes',       goal: 10, label: 'Học đủ 10 phút',           reward: { xp: 25, coin: 15 } },
  { id: 'accuracy-8', icon: '🎯', metric: 'bestCorrect',   goal: 8, label: 'Đúng 8 câu trong 1 bài',    reward: { xp: 40, coin: 25 } },
  { id: 'three-star', icon: '⭐', metric: 'threeStars',    goal: 1, label: 'Đạt 3 sao trong 1 bài',      reward: { xp: 45, coin: 30 } },
];

function _hash(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 16777619); }
  return Math.abs(h);
}

/**
 * Deterministic per-day quest set (so it doesn't reshuffle on reload).
 * Always: check-in + 1 lesson. Plus 1 rotating quest chosen by date hash.
 * @returns {Array<typeof QUEST_POOL[number]>}
 */
export function generateDailyQuests(dateStr) {
  const fixed = [QUEST_POOL[0], QUEST_POOL[1]];
  const rotating = QUEST_POOL.filter(q => !['checkin', 'one-lesson'].includes(q.id));
  const pick = rotating[_hash(dateStr || '') % rotating.length];
  return [...fixed, pick];
}

/** @returns {{progress:number, done:boolean}} */
export function evalQuest(quest, daily) {
  const progress = Math.max(0, daily?.[quest.metric] ?? 0);
  return { progress: Math.min(progress, quest.goal), done: progress >= quest.goal };
}

// ─────────────────────────────────────────────────────────────
// PROGRESS AGGREGATION
// ─────────────────────────────────────────────────────────────
/**
 * @param {import('./types.js').CourseModule[]} modules
 * @param {Record<string,{stars:number}>} progress
 */
export function aggregateProgress(modules, progress) {
  const prog = progress || {};
  const curriculum = (modules || []).filter(m => m.category === 'curriculum');
  const subjects = {};
  const grades = {};
  let total = 0, passed = 0, stars = 0;
  const perModule = {};

  for (const m of curriculum) {
    const s = Math.max(0, Math.min(3, prog[m.id]?.stars || 0));
    const isPassed = s >= 1;
    perModule[m.id] = { stars: s, pct: Math.round((s / 3) * 100), passed: isPassed };
    total++; stars += s; if (isPassed) passed++;

    const subj = (subjects[m.subject] ||= { total: 0, passed: 0, stars: 0 });
    subj.total++; subj.stars += s; if (isPassed) subj.passed++;

    const gy = m.yearLevel || 1;
    const gr = (grades[gy] ||= { total: 0, passed: 0, stars: 0 });
    gr.total++; gr.stars += s; if (isPassed) gr.passed++;
  }
  for (const s of Object.values(subjects)) s.pct = s.total ? Math.round((s.passed / s.total) * 100) : 0;
  for (const g of Object.values(grades))   g.pct = g.total ? Math.round((g.passed / g.total) * 100) : 0;

  return {
    modules: perModule,
    subjects, grades,
    overall: { total, passed, stars, pct: total ? Math.round((passed / total) * 100) : 0 },
  };
}

/**
 * Pick the single best "do this next" module.
 * Prefers in-progress (1–2 stars) then lowest grade/id not-yet-mastered.
 * @param {(id:string)=>boolean} [hasContent]
 * @returns {{module:object, reason:string}|null}
 */
export function recommendNext(modules, progress, hasContent) {
  const prog = progress || {};
  const has = hasContent || (() => true);
  const cands = (modules || [])
    .filter(m => m.category === 'curriculum' && has(m.id))
    .map(m => ({ m, stars: prog[m.id]?.stars || 0 }))
    .filter(x => x.stars < 3);
  if (!cands.length) return null;
  cands.sort((a, b) => {
    const aIn = a.stars > 0 ? 0 : 1;
    const bIn = b.stars > 0 ? 0 : 1;
    if (aIn !== bIn) return aIn - bIn;                     // in-progress first
    if ((a.m.yearLevel || 1) !== (b.m.yearLevel || 1)) return (a.m.yearLevel || 1) - (b.m.yearLevel || 1);
    return String(a.m.id).localeCompare(String(b.m.id));
  });
  const top = cands[0];
  const reason = top.stars > 0 ? 'Tiếp tục bài đang học' : 'Bắt đầu bài tiếp theo';
  return { module: top.m, reason };
}

/**
 * "Next milestone" toward a subject's Boss (highest-grade module of that subject).
 * @returns {{text:string, subject:string, remaining:number, ready:boolean}|null}
 */
export function nextMilestone(modules, progress, hasContent, subjectLabels = {}) {
  const rec = recommendNext(modules, progress, hasContent);
  if (!rec) return null;
  const subject = rec.module.subject;
  const prog = progress || {};
  const subjMods = (modules || []).filter(m => m.category === 'curriculum' && m.subject === subject);
  if (!subjMods.length) return null;
  const boss = subjMods.reduce((a, b) => ((b.yearLevel || 1) > (a.yearLevel || 1) ? b : a));
  const remaining = subjMods.filter(m => m.id !== boss.id && (prog[m.id]?.stars || 0) < 1).length;
  const label = subjectLabels[subject] || subject;
  const bossDone = (prog[boss.id]?.stars || 0) >= 1;
  if (bossDone) {
    return { text: `Đã chinh phục Boss ${label} 👑: thử đạt 3 sao toàn bộ!`, subject, remaining: 0, ready: true };
  }
  if (remaining === 0) {
    return { text: `Sẵn sàng khiêu chiến Boss ${label} 👑 (${boss.title})!`, subject, remaining: 0, ready: true };
  }
  return { text: `Còn ${remaining} bài để khai mở Boss ${label} 👑`, subject, remaining, ready: false };
}

/** Is this module the "Boss" of its subject (highest grade)? */
export function isBossModule(mod, modules) {
  if (mod.category !== 'curriculum') return false;
  const peers = (modules || []).filter(m => m.category === 'curriculum' && m.subject === mod.subject);
  if (peers.length < 2) return false;
  const maxYear = Math.max(...peers.map(m => m.yearLevel || 1));
  return (mod.yearLevel || 1) === maxYear;
}
