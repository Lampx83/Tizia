// ============================================================
// medicines.js — Legacy entry point cho 7 game cũ
// ============================================================
// MEDICINES + ALL_CATEGORIES giờ được tái xuất từ engine (drug-db.js),
// nên cập nhật / mở rộng catalog thuốc chỉ làm Ở ENGINE thôi.
//
// LEVELS, DIFFICULTIES và các helper localStorage thì là logic riêng
// của game "Sắp xếp thuốc" — giữ nguyên ở đây.
// ============================================================

// Re-export catalog thuốc + danh sách nhóm điều trị từ engine
export { MEDICINES, ALL_CATEGORIES } from './engine/drug-db.js';

import { MEDICINES } from './engine/drug-db.js';

// 10 LEVELS — escalating difficulty.
// count = số thuốc/slot · time = thời gian (s) · shuffleSlots = đảo thứ tự ô kệ (khó hơn)
export const LEVELS = [
  { n: 1,  count: 3,  time: 90,  shuffleSlots: false, label: 'Khởi đầu',       desc: '3 loại · 90s · nhẹ nhàng' },
  { n: 2,  count: 4,  time: 80,  shuffleSlots: false, label: 'Làm quen',       desc: '4 loại · 80s' },
  { n: 3,  count: 5,  time: 70,  shuffleSlots: false, label: 'Tăng tốc',       desc: '5 loại · 70s' },
  { n: 4,  count: 6,  time: 60,  shuffleSlots: false, label: 'Bình thường',    desc: '6 loại · 60s' },
  { n: 5,  count: 6,  time: 55,  shuffleSlots: true,  label: 'Đảo kệ',         desc: '6 loại · 55s · ô shuffle' },
  { n: 6,  count: 7,  time: 50,  shuffleSlots: true,  label: 'Khá khó',        desc: '7 loại · 50s · ô shuffle' },
  { n: 7,  count: 8,  time: 45,  shuffleSlots: true,  label: 'Thử thách',      desc: '8 loại · 45s · ô shuffle' },
  { n: 8,  count: 9,  time: 40,  shuffleSlots: true,  label: 'Khó',            desc: '9 loại · 40s' },
  { n: 9,  count: 10, time: 35,  shuffleSlots: true,  label: 'Rất khó',        desc: '10 loại · 35s' },
  { n: 10, count: 16, time: 30,  shuffleSlots: true,  label: 'Boss: đỉnh cao',desc: '16 loại · 30s · FULL CATALOG' },
];

// --- Level progression in localStorage ---
import { KEYS, lsGet, lsSet } from './engine/storage.js';
const LEVEL_KEY = KEYS.LEVEL;
const PROGRESS_KEY = KEYS.PROGRESS;   // {[levelN]: { stars: 0-3, bestScore }}

export function getCurrentLevel() {
  const n = parseInt(lsGet(LEVEL_KEY) || '1', 10);
  return LEVELS.find(l => l.n === n) || LEVELS[0];
}

export function setCurrentLevel(n) {
  const lvl = LEVELS.find(l => l.n === n);
  if (lvl) lsSet(LEVEL_KEY, String(n));
}

export function getProgress() {
  try { return JSON.parse(lsGet(PROGRESS_KEY) || '{}'); }
  catch { return {}; }
}

export function saveLevelResult(n, { stars, score }) {
  const p = getProgress();
  const cur = p[n] || { stars: 0, bestScore: 0 };
  p[n] = {
    stars: Math.max(cur.stars, stars),
    bestScore: Math.max(cur.bestScore, score),
  };
  lsSet(PROGRESS_KEY, JSON.stringify(p));
  return p[n];
}

export function isLevelUnlocked(n) {
  if (n === 1) return true;
  const p = getProgress();
  // Unlock if previous level was beaten with at least 1 star
  return (p[n - 1]?.stars ?? 0) >= 1;
}

// Map a final score percentage (0-100) to star count (0-3)
export function scoreToStars(percent) {
  if (percent >= 95) return 3;
  if (percent >= 75) return 2;
  if (percent >= 50) return 1;
  return 0;
}

// --- Difficulty for older code paths (kept for backward compat) ---
export const DIFFICULTIES = [
  { id: 'easy', label: 'Dễ',  count: 4, desc: '4 loại thuốc' },
  { id: 'med',  label: 'Vừa', count: 6, desc: '6 loại thuốc' },
  { id: 'hard', label: 'Khó', count: 8, desc: '8 loại thuốc' },
];
const DIFFICULTY_KEY = KEYS.DIFFICULTY;
export function getDifficulty() {
  const id = lsGet(DIFFICULTY_KEY) || 'easy';
  return DIFFICULTIES.find(d => d.id === id) || DIFFICULTIES[0];
}
export function setDifficulty(id) {
  if (DIFFICULTIES.some(d => d.id === id)) lsSet(DIFFICULTY_KEY, id);
}

// --- Helpers ---
export function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function pickRoundMedicines(count) {
  const n = Math.min(Math.max(count | 0, 2), MEDICINES.length);
  return shuffle(MEDICINES).slice(0, n);
}

// Helper used by games to read URL ?level=N or fallback to localStorage
export function getActiveLevel() {
  const params = new URLSearchParams(location.search);
  const fromUrl = parseInt(params.get('level') || '', 10);
  if (fromUrl && LEVELS.find(l => l.n === fromUrl)) {
    setCurrentLevel(fromUrl);
    return LEVELS.find(l => l.n === fromUrl);
  }
  return getCurrentLevel();
}
