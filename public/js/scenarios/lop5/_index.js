// ============================================================
// Lớp 5 — Barrel: 11 môn.
// ============================================================
let m_toan = {}, m_tv = {}, m_ta = {}, m_kh = {}, m_lsdl = {},
    m_dd = {}, m_an = {}, m_mt = {}, m_gdtc = {}, m_hdtn = {}, m_cn = {}, m_tin = {};

try { ({ P5_TOAN_SCENARIOS:    m_toan } = await import('./toan.js')); } catch {}
try { ({ P5TV_SCENARIOS:       m_tv   } = await import('./tieng-viet.js')); } catch {}
try { ({ P5TA_SCENARIOS:       m_ta   } = await import('./tieng-anh.js')); } catch {}
try { ({ P5KH_SCENARIOS:       m_kh   } = await import('./khoa-hoc.js')); } catch {}
try { ({ P5LSDL_SCENARIOS:     m_lsdl } = await import('./lich-su-dia-ly.js')); } catch {}
try { ({ P5DD_SCENARIOS:       m_dd   } = await import('./dao-duc.js')); } catch {}
try { ({ P5AN_SCENARIOS:       m_an   } = await import('./am-nhac.js')); } catch {}
try { ({ P5MT_SCENARIOS:       m_mt   } = await import('./my-thuat.js')); } catch {}
try { ({ P5GDTC_SCENARIOS:     m_gdtc } = await import('./gdtc.js')); } catch {}
try { ({ P5HDTN_SCENARIOS:     m_hdtn } = await import('./hdtn.js')); } catch {}
try { ({ P5CN_SCENARIOS:       m_cn   } = await import('./cong-nghe.js')); } catch {}
try { ({ P5TIN_SCENARIOS:      m_tin  } = await import('./tin-hoc.js')); } catch {}

let LOP5_LESSONS = {};
try { ({ LOP5_LESSONS } = await import('./lessons/_index.js')); } catch {}

export const PRIMARY_LOP5_SCENARIOS = {
  ...m_toan, ...m_tv, ...m_ta, ...m_kh, ...m_lsdl,
  ...m_dd, ...m_an, ...m_mt, ...m_gdtc, ...m_hdtn, ...m_cn, ...m_tin,
};

for (const [id, sc] of Object.entries(PRIMARY_LOP5_SCENARIOS)) {
  if (LOP5_LESSONS && LOP5_LESSONS[id]) sc.lesson = LOP5_LESSONS[id];
}

// <<EXAM-MERGE-START>>
import { P5AN_EXAMS } from './am-nhac-exam.js';
import { P5CN_EXAMS } from './cong-nghe-exam.js';
import { P5DD_EXAMS } from './dao-duc-exam.js';
import { P5GDTC_EXAMS } from './gdtc-exam.js';
import { P5HDTN_EXAMS } from './hdtn-exam.js';
import { P5KH_EXAMS } from './khoa-hoc-exam.js';
import { P5LSDL_EXAMS } from './lich-su-dia-ly-exam.js';
import { P5TA_EXAMS } from './tieng-anh-exam.js';
import { P5TV_EXAMS } from './tieng-viet-exam.js';
import { P5TIN_EXAMS } from './tin-hoc-exam.js';
import { P5_EXAMS } from './toan-exam.js';
for (const EX of [P5AN_EXAMS, P5CN_EXAMS, P5DD_EXAMS, P5GDTC_EXAMS, P5HDTN_EXAMS, P5KH_EXAMS, P5LSDL_EXAMS, P5TA_EXAMS, P5TV_EXAMS, P5TIN_EXAMS, P5_EXAMS]) Object.assign(PRIMARY_LOP5_SCENARIOS, EX);
// <<EXAM-MERGE-END>>
