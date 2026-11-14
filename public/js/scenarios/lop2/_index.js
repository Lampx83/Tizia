// ============================================================
// Lớp 2 — Barrel: gộp tất cả 9 môn × 36 tuần
// ============================================================
import { P2_TOAN_SCENARIOS    } from './toan.js';
import { P2TV_SCENARIOS       } from './tieng-viet.js';
import { P2TA_SCENARIOS       } from './tieng-anh.js';
import { P2GDTC_SCENARIOS     } from './gdtc.js';
import { P2AN_SCENARIOS       } from './am-nhac.js';
import { P2MT_SCENARIOS       } from './my-thuat.js';
import { P2HDTN_SCENARIOS     } from './hdtn.js';
import { P2TNXH_SCENARIOS     } from './tnxh.js';
import { P2DD_SCENARIOS       } from './dao-duc.js';
import { LOP2_LESSONS         } from './lessons/_index.js';

export const PRIMARY_LOP2_SCENARIOS = {
  ...P2_TOAN_SCENARIOS,
  ...P2TV_SCENARIOS,
  ...P2TA_SCENARIOS,
  ...P2GDTC_SCENARIOS,
  ...P2AN_SCENARIOS,
  ...P2MT_SCENARIOS,
  ...P2HDTN_SCENARIOS,
  ...P2TNXH_SCENARIOS,
  ...P2DD_SCENARIOS,
};

// Gắn lý thuyết tuần (📖 Lý thuyết + ✍️ Ví dụ) vào từng scenario.
// module.html sẽ hiện màn "tuần học" (weekly-lesson.js) khi scenario.lesson
// tồn tại; phần ♾️ Học thêm + 🦉 Hỏi cô giáo AI gọi Ollama runtime.
for (const [id, sc] of Object.entries(PRIMARY_LOP2_SCENARIOS)) {
  if (LOP2_LESSONS[id]) sc.lesson = LOP2_LESSONS[id];
}

// <<EXAM-MERGE-START>>
import { P2GDTC_EXAMS } from './gdtc-exam.js';
import { P2HDTN_EXAMS } from './hdtn-exam.js';
import { P2TA_EXAMS } from './tieng-anh-exam.js';
import { P2TNXH_EXAMS } from './tnxh-exam.js';
import { P2_EXAMS } from './toan-exam.js';
for (const EX of [P2GDTC_EXAMS, P2HDTN_EXAMS, P2TA_EXAMS, P2TNXH_EXAMS, P2_EXAMS]) Object.assign(PRIMARY_LOP2_SCENARIOS, EX);
// <<EXAM-MERGE-END>>
