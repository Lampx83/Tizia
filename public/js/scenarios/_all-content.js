// ============================================================
// _all-content.js — AGGREGATOR CONTENT (chỉ dùng để SEED vào DB).
// ============================================================
// File này gom toàn bộ scenario hardcode (đề quiz + lý thuyết) thành ALL_SCENARIOS.
//
// ⚠️ KHÔNG import file này từ trang FE đang chạy. Browser nạp content qua
// /api/curriculum/* (DB), KHÔNG bundle 19MB content này. File chỉ là NGUỒN SEED:
// `server/scripts/seed-curriculum.mjs` import nó để nạp vào curriculum_content.
//
// Khi sửa/ thêm content gốc: sửa các file lop*/, year*, preschool*… rồi chạy
// seed lại. (Sửa lẻ 1 câu thì dùng admin-curriculum.html — sửa thẳng DB.)
// ============================================================

import { YEAR12_SCENARIOS } from './year1-2.js';
import { ECONOMICS_YEAR1_SCENARIOS } from './economics-year1.js';
import { ECONOMICS_YEAR1B_SCENARIOS } from './economics-year1b.js';
import { ECONOMICS_YEAR2_SCENARIOS } from './economics-year2.js';
import { ECONOMICS_YEAR3_SCENARIOS } from './economics-year3.js';
import { ECONOMICS_YEAR4_SCENARIOS } from './economics-year4.js';
import { IT_YEAR1_SCENARIOS } from './it-year1.js';
import { IT_YEAR2_SCENARIOS } from './it-year2.js';
import { IT_YEAR3_SCENARIOS } from './it-year3.js';
import { IT_YEAR4_SCENARIOS } from './it-year4.js';
import { IT_GAMES_SCENARIOS } from './it-games.js';
import { IT_CAREERS_SCENARIOS } from './it-careers.js';
import { ECONOMICS_GAMES_SCENARIOS } from './economics-games.js';
import { ECONOMICS_CAREERS_SCENARIOS } from './economics-careers.js';
import { ECONOMICS_PRACTICE_SCENARIOS } from './economics-practice.js';
import { L33_SCENARIOS, SCENARIO_L33_QUIZ, SCENARIO_L33_DRAG }
  from './L3.3-tuong-tac-warfarin-clarithromycin.js';
import { YEAR34_SCENARIOS } from './year3-4.js';
import { YEAR5_ADAPTED_SCENARIOS } from './year5-adapted.js';
import { PRACTICE_QUIZZES } from './practice-quizzes.js';
import { SKILL_QUIZZES } from './skill-quizzes.js';
import { PHARMACY_COMMUNITY_SCENARIOS } from './pharmacy-community.js';
import { PHARMACY_INDUSTRY_SCENARIOS } from './pharmacy-industry.js';
import { LIBRARY_CAREER_GAMES_SCENARIOS } from './library-career-games.js';
import { PHARMACY_ADVANCED_SCENARIOS } from './pharmacy-advanced.js';
import { PHARMACY_CAREER_GAMES_SCENARIOS } from './pharmacy-career-games.js';
import { BAO_CHE_LAB_SCENARIOS } from './bao-che-labs.js';
import { PRIMARY_MATH_SCENARIOS } from './primary-math.js';
import { PRIMARY_LOP2_SCENARIOS } from './lop2/_index.js';
import { SECONDARY_LOP6_SCENARIOS } from './lop6/_index.js';
import { SECONDARY_MATH_SCENARIOS } from './secondary-math.js';
import { SECONDARY_LIT_SCENARIOS } from './secondary-literature.js';
import { MATH6_LESSON_SCENARIOS } from './secondary-math6-lessons.js';
import { PRESCHOOL_SCENARIOS } from './preschool-basics.js';
import { PRESCHOOL_FIELDS_SCENARIOS } from './preschool-fields.js';
import { PRIMARY_LOP1_SCENARIOS } from './lop1/_index.js';
let PRIMARY_LOP3_SCENARIOS = {}, PRIMARY_LOP4_SCENARIOS = {}, PRIMARY_LOP5_SCENARIOS = {};
let SECONDARY_LOP7_SCENARIOS = {}, SECONDARY_LOP8_SCENARIOS = {}, SECONDARY_LOP9_SCENARIOS = {};
let HIGHSCHOOL_LOP10_SCENARIOS = {}, HIGHSCHOOL_LOP11_SCENARIOS = {}, HIGHSCHOOL_LOP12_SCENARIOS = {};
let PRESCHOOL_WEEKS_SCENARIOS = {};
try { ({ PRIMARY_LOP3_SCENARIOS  } = await import('./lop3/_index.js')); } catch {}
try { ({ PRIMARY_LOP4_SCENARIOS  } = await import('./lop4/_index.js')); } catch {}
try { ({ PRIMARY_LOP5_SCENARIOS  } = await import('./lop5/_index.js')); } catch {}
try { ({ SECONDARY_LOP7_SCENARIOS } = await import('./lop7/_index.js')); } catch {}
try { ({ SECONDARY_LOP8_SCENARIOS } = await import('./lop8/_index.js')); } catch {}
try { ({ SECONDARY_LOP9_SCENARIOS } = await import('./lop9/_index.js')); } catch {}
try { ({ HIGHSCHOOL_LOP10_SCENARIOS } = await import('./lop10/_index.js')); } catch {}
try { ({ HIGHSCHOOL_LOP11_SCENARIOS } = await import('./lop11/_index.js')); } catch {}
try { ({ HIGHSCHOOL_LOP12_SCENARIOS } = await import('./lop12/_index.js')); } catch {}
try { ({ PRESCHOOL_WEEKS_SCENARIOS } = await import('./preschool-weeks.js')); } catch {}

// Phẳng hoá tất cả scenarios thành 1 object {id → scenario}
export const ALL_SCENARIOS = {
  ...YEAR12_SCENARIOS,
  ...ECONOMICS_YEAR1_SCENARIOS,
  ...ECONOMICS_YEAR1B_SCENARIOS,
  ...ECONOMICS_YEAR2_SCENARIOS,
  ...ECONOMICS_YEAR3_SCENARIOS,
  ...ECONOMICS_YEAR4_SCENARIOS,
  ...IT_YEAR1_SCENARIOS,
  ...IT_YEAR2_SCENARIOS,
  ...IT_YEAR3_SCENARIOS,
  ...IT_YEAR4_SCENARIOS,
  ...IT_GAMES_SCENARIOS,
  ...IT_CAREERS_SCENARIOS,
  ...ECONOMICS_GAMES_SCENARIOS,
  ...ECONOMICS_CAREERS_SCENARIOS,
  ...ECONOMICS_PRACTICE_SCENARIOS,
  [SCENARIO_L33_QUIZ.id]: SCENARIO_L33_QUIZ,
  [SCENARIO_L33_DRAG.id]: SCENARIO_L33_DRAG,
  ...YEAR34_SCENARIOS,
  ...YEAR5_ADAPTED_SCENARIOS,
  ...PRACTICE_QUIZZES,
  ...SKILL_QUIZZES,
  ...PHARMACY_COMMUNITY_SCENARIOS,
  ...PHARMACY_INDUSTRY_SCENARIOS,
  ...LIBRARY_CAREER_GAMES_SCENARIOS,
  ...PHARMACY_ADVANCED_SCENARIOS,
  ...PHARMACY_CAREER_GAMES_SCENARIOS,
  ...BAO_CHE_LAB_SCENARIOS,
  ...PRIMARY_MATH_SCENARIOS,
  ...PRIMARY_LOP1_SCENARIOS,
  ...PRIMARY_LOP2_SCENARIOS,
  ...PRIMARY_LOP3_SCENARIOS,
  ...PRIMARY_LOP4_SCENARIOS,
  ...PRIMARY_LOP5_SCENARIOS,
  ...SECONDARY_LOP6_SCENARIOS,
  ...SECONDARY_LOP7_SCENARIOS,
  ...SECONDARY_LOP8_SCENARIOS,
  ...SECONDARY_LOP9_SCENARIOS,
  ...HIGHSCHOOL_LOP10_SCENARIOS,
  ...HIGHSCHOOL_LOP11_SCENARIOS,
  ...HIGHSCHOOL_LOP12_SCENARIOS,
  ...SECONDARY_MATH_SCENARIOS,
  ...SECONDARY_LIT_SCENARIOS,
  ...MATH6_LESSON_SCENARIOS,
  ...PRESCHOOL_SCENARIOS,
  ...PRESCHOOL_WEEKS_SCENARIOS,
  ...PRESCHOOL_FIELDS_SCENARIOS,
};
