// ============================================================
// Lớp 6 (THCS) — Barrel: gộp 12 môn × 36 tuần (~2 650 câu)
// ============================================================
// Mirror cấu trúc lop2/. Lessons tuần (lý thuyết) ở lessons/<môn>.js,
// được merge vào scenario.lesson ở cuối file.
// ============================================================
import { S6TOAN_SCENARIOS  } from './toan.js';
import { S6NV_SCENARIOS    } from './ngu-van.js';
import { S6TA_SCENARIOS    } from './tieng-anh.js';
import { S6KHTN_SCENARIOS  } from './khtn.js';
import { S6LSDL_SCENARIOS  } from './lich-su-dia.js';
import { S6GDCD_SCENARIOS  } from './gdcd.js';
import { S6CN_SCENARIOS    } from './cong-nghe.js';
import { S6TH_SCENARIOS    } from './tin-hoc.js';
import { S6GDTC_SCENARIOS  } from './gdtc.js';
import { S6NT_SCENARIOS    } from './nghe-thuat.js';
import { S6HDTN_SCENARIOS  } from './hdtn.js';
import { S6GDDP_SCENARIOS  } from './gd-dia-phuong.js';
import { LOP6_LESSONS      } from './lessons/_index.js';

export const SECONDARY_LOP6_SCENARIOS = {
  ...S6TOAN_SCENARIOS,
  ...S6NV_SCENARIOS,
  ...S6TA_SCENARIOS,
  ...S6KHTN_SCENARIOS,
  ...S6LSDL_SCENARIOS,
  ...S6GDCD_SCENARIOS,
  ...S6CN_SCENARIOS,
  ...S6TH_SCENARIOS,
  ...S6GDTC_SCENARIOS,
  ...S6NT_SCENARIOS,
  ...S6HDTN_SCENARIOS,
  ...S6GDDP_SCENARIOS,
};

// Gắn lý thuyết tuần vào từng scenario (module.html hiện màn weekly-lesson).
for (const [id, sc] of Object.entries(SECONDARY_LOP6_SCENARIOS)) {
  if (LOP6_LESSONS[id]) sc.lesson = LOP6_LESSONS[id];
}

// <<EXAM-MERGE-START>>
import { S6CN_EXAMS } from './cong-nghe-exam.js';
import { S6GDTC_EXAMS } from './gdtc-exam.js';
import { S6HDTN_EXAMS } from './hdtn-exam.js';
import { S6KHTN_EXAMS } from './khtn-exam.js';
import { S6LSDL_EXAMS } from './lich-su-dia-exam.js';
import { S6NT_EXAMS } from './nghe-thuat-exam.js';
import { S6NV_EXAMS } from './ngu-van-exam.js';
import { S6TA_EXAMS } from './tieng-anh-exam.js';
import { S6TH_EXAMS } from './tin-hoc-exam.js';
import { S6TOAN_EXAMS } from './toan-exam.js';
for (const EX of [S6CN_EXAMS, S6GDTC_EXAMS, S6HDTN_EXAMS, S6KHTN_EXAMS, S6LSDL_EXAMS, S6NT_EXAMS, S6NV_EXAMS, S6TA_EXAMS, S6TH_EXAMS, S6TOAN_EXAMS]) Object.assign(SECONDARY_LOP6_SCENARIOS, EX);
// <<EXAM-MERGE-END>>
