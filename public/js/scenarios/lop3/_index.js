// ============================================================
// Lớp 3 — Barrel: gộp 9 môn (file thiếu sẽ skip qua try/catch).
// ============================================================
let m_toan = {}, m_tv = {}, m_ta = {}, m_tnxh = {},
    m_dd = {}, m_an = {}, m_mt = {}, m_gdtc = {}, m_hdtn = {},
    m_tin = {}, m_cn = {};

try { ({ P3_TOAN_SCENARIOS:    m_toan } = await import('./toan.js')); } catch {}
try { ({ P3TV_SCENARIOS:       m_tv   } = await import('./tieng-viet.js')); } catch {}
try { ({ P3TA_SCENARIOS:       m_ta   } = await import('./tieng-anh.js')); } catch {}
try { ({ P3TNXH_SCENARIOS:     m_tnxh } = await import('./tnxh.js')); } catch {}
try { ({ P3DD_SCENARIOS:       m_dd   } = await import('./dao-duc.js')); } catch {}
try { ({ P3AN_SCENARIOS:       m_an   } = await import('./am-nhac.js')); } catch {}
try { ({ P3MT_SCENARIOS:       m_mt   } = await import('./my-thuat.js')); } catch {}
try { ({ P3GDTC_SCENARIOS:     m_gdtc } = await import('./gdtc.js')); } catch {}
try { ({ P3HDTN_SCENARIOS:     m_hdtn } = await import('./hdtn.js')); } catch {}
try { ({ P3TIN_SCENARIOS:      m_tin  } = await import('./tin-hoc.js')); } catch {}
try { ({ P3CN_SCENARIOS:       m_cn   } = await import('./cong-nghe.js')); } catch {}

let LOP3_LESSONS = {};
try { ({ LOP3_LESSONS } = await import('./lessons/_index.js')); } catch {}

export const PRIMARY_LOP3_SCENARIOS = {
  ...m_toan, ...m_tv, ...m_ta, ...m_tnxh,
  ...m_dd, ...m_an, ...m_mt, ...m_gdtc, ...m_hdtn,
  ...m_tin, ...m_cn,
};

for (const [id, sc] of Object.entries(PRIMARY_LOP3_SCENARIOS)) {
  if (LOP3_LESSONS && LOP3_LESSONS[id]) sc.lesson = LOP3_LESSONS[id];
}

// <<EXAM-MERGE-START>>
import { P3AN_EXAMS } from './am-nhac-exam.js';
import { P3CN_EXAMS } from './cong-nghe-exam.js';
import { P3DD_EXAMS } from './dao-duc-exam.js';
import { P3GDTC_EXAMS } from './gdtc-exam.js';
import { P3HDTN_EXAMS } from './hdtn-exam.js';
import { P3MT_EXAMS } from './my-thuat-exam.js';
import { P3TA_EXAMS } from './tieng-anh-exam.js';
import { P3TV_EXAMS } from './tieng-viet-exam.js';
import { P3TIN_EXAMS } from './tin-hoc-exam.js';
import { P3TNXH_EXAMS } from './tnxh-exam.js';
import { P3_EXAMS } from './toan-exam.js';
for (const EX of [P3AN_EXAMS, P3CN_EXAMS, P3DD_EXAMS, P3GDTC_EXAMS, P3HDTN_EXAMS, P3MT_EXAMS, P3TA_EXAMS, P3TV_EXAMS, P3TIN_EXAMS, P3TNXH_EXAMS, P3_EXAMS]) Object.assign(PRIMARY_LOP3_SCENARIOS, EX);
// <<EXAM-MERGE-END>>
