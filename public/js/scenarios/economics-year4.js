// ============================================================
// Trường Kinh tế — Scenarios Năm 4 (E4.1–E4.6)
// ============================================================
// Wrapper: imports từ 3 file nội dung để tránh file quá lớn.
// Xem chi tiết quiz trong economics-year4-a/b/c.js
// ============================================================

import { E41_QUIZ, E42_QUIZ } from './economics-year4-a.js';
import { E43_QUIZ, E44_QUIZ } from './economics-year4-b.js';
import { E45_QUIZ, E46_QUIZ } from './economics-year4-c.js';

export const ECONOMICS_YEAR4_SCENARIOS = {
  [E41_QUIZ.id]: E41_QUIZ,
  [E42_QUIZ.id]: E42_QUIZ,
  [E43_QUIZ.id]: E43_QUIZ,
  [E44_QUIZ.id]: E44_QUIZ,
  [E45_QUIZ.id]: E45_QUIZ,
  [E46_QUIZ.id]: E46_QUIZ,
};
