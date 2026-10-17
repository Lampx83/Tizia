// ============================================================
// it-year3.js — aggregator cho 8 quiz scenarios Năm 3 CNTT
// Import từ 4 file phần để giữ mỗi file trong giới hạn kích thước.
// _all-content.js và seed script import IT_YEAR3_SCENARIOS từ đây.
// ============================================================

import { I31_QUIZ, I32_QUIZ } from './it-year3-i31-i32.js';
import { I33_QUIZ, I34_QUIZ } from './it-year3-i33-i34.js';
import { I35_QUIZ, I36_QUIZ } from './it-year3-i35-i36.js';
import { I37_QUIZ, I38_QUIZ } from './it-year3-i37-i38.js';

export const IT_YEAR3_SCENARIOS = {
  [I31_QUIZ.id]: I31_QUIZ,
  [I32_QUIZ.id]: I32_QUIZ,
  [I33_QUIZ.id]: I33_QUIZ,
  [I34_QUIZ.id]: I34_QUIZ,
  [I35_QUIZ.id]: I35_QUIZ,
  [I36_QUIZ.id]: I36_QUIZ,
  [I37_QUIZ.id]: I37_QUIZ,
  [I38_QUIZ.id]: I38_QUIZ,
};
