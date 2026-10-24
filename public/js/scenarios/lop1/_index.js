// ============================================================
// Lớp 1 — Barrel: gộp tất cả 8 môn × 35 tuần (GDPT 2018, 6 tuổi)
// ============================================================
import { P1_TOAN_SCENARIOS  } from './toan.js';
import { P1TV_SCENARIOS     } from './tieng-viet.js';
import { P1TA_SCENARIOS     } from './tieng-anh.js';
import { P1TNXH_SCENARIOS   } from './tnxh.js';
import { P1DD_SCENARIOS     } from './dao-duc.js';
import { P1AN_SCENARIOS     } from './am-nhac.js';
import { P1MT_SCENARIOS     } from './my-thuat.js';
import { P1GDTC_SCENARIOS   } from './gdtc.js';
import { P1HDTN_SCENARIOS   } from './hdtn.js';
import { LOP1_LESSONS       } from './lessons/_index.js';

export const PRIMARY_LOP1_SCENARIOS = {
  ...P1_TOAN_SCENARIOS,
  ...P1TV_SCENARIOS,
  ...P1TA_SCENARIOS,
  ...P1TNXH_SCENARIOS,
  ...P1DD_SCENARIOS,
  ...P1AN_SCENARIOS,
  ...P1MT_SCENARIOS,
  ...P1GDTC_SCENARIOS,
  ...P1HDTN_SCENARIOS,
};

// Gắn lý thuyết tuần (📖 Lý thuyết + ✍️ Ví dụ) vào từng scenario.
for (const [id, sc] of Object.entries(PRIMARY_LOP1_SCENARIOS)) {
  if (LOP1_LESSONS[id]) sc.lesson = LOP1_LESSONS[id];
}

// <<EXAM-MERGE-START>>
import { P1AN_EXAMS } from './am-nhac-exam.js';
import { P1DD_EXAMS } from './dao-duc-exam.js';
import { P1GDTC_EXAMS } from './gdtc-exam.js';
import { P1HDTN_EXAMS } from './hdtn-exam.js';
import { P1MT_EXAMS } from './my-thuat-exam.js';
import { P1TA_EXAMS } from './tieng-anh-exam.js';
import { P1TV_EXAMS } from './tieng-viet-exam.js';
import { P1TNXH_EXAMS } from './tnxh-exam.js';
import { P1_EXAMS } from './toan-exam.js';
for (const EX of [P1AN_EXAMS, P1DD_EXAMS, P1GDTC_EXAMS, P1HDTN_EXAMS, P1MT_EXAMS, P1TA_EXAMS, P1TV_EXAMS, P1TNXH_EXAMS, P1_EXAMS]) Object.assign(PRIMARY_LOP1_SCENARIOS, EX);
// <<EXAM-MERGE-END>>
