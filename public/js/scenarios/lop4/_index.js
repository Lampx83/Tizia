// ============================================================
// Lớp 4 — Barrel: 11 môn (Toán, TV, TA, Khoa học, LS-ĐL, ĐĐ, ÂN, MT, GDTC, HĐTN, CN).
// File thiếu sẽ được skip qua try/catch.
// ============================================================
let m_toan = {}, m_tv = {}, m_ta = {}, m_kh = {}, m_lsdl = {},
    m_dd = {}, m_an = {}, m_mt = {}, m_gdtc = {}, m_hdtn = {}, m_cn = {}, m_tin = {};

try { ({ P4_TOAN_SCENARIOS:    m_toan } = await import('./toan.js')); } catch {}
try { ({ P4TV_SCENARIOS:       m_tv   } = await import('./tieng-viet.js')); } catch {}
try { ({ P4TA_SCENARIOS:       m_ta   } = await import('./tieng-anh.js')); } catch {}
try { ({ P4KH_SCENARIOS:       m_kh   } = await import('./khoa-hoc.js')); } catch {}
try { ({ P4LSDL_SCENARIOS:     m_lsdl } = await import('./lich-su-dia-ly.js')); } catch {}
try { ({ P4DD_SCENARIOS:       m_dd   } = await import('./dao-duc.js')); } catch {}
try { ({ P4AN_SCENARIOS:       m_an   } = await import('./am-nhac.js')); } catch {}
try { ({ P4MT_SCENARIOS:       m_mt   } = await import('./my-thuat.js')); } catch {}
try { ({ P4GDTC_SCENARIOS:     m_gdtc } = await import('./gdtc.js')); } catch {}
try { ({ P4HDTN_SCENARIOS:     m_hdtn } = await import('./hdtn.js')); } catch {}
try { ({ P4CN_SCENARIOS:       m_cn   } = await import('./cong-nghe.js')); } catch {}
try { ({ P4TIN_SCENARIOS:      m_tin  } = await import('./tin-hoc.js')); } catch {}

let LOP4_LESSONS = {};
try { ({ LOP4_LESSONS } = await import('./lessons/_index.js')); } catch {}

export const PRIMARY_LOP4_SCENARIOS = {
  ...m_toan, ...m_tv, ...m_ta, ...m_kh, ...m_lsdl,
  ...m_dd, ...m_an, ...m_mt, ...m_gdtc, ...m_hdtn, ...m_cn, ...m_tin,
};

for (const [id, sc] of Object.entries(PRIMARY_LOP4_SCENARIOS)) {
  if (LOP4_LESSONS && LOP4_LESSONS[id]) sc.lesson = LOP4_LESSONS[id];
}

// <<EXAM-MERGE-START>>
import { P4AN_EXAMS } from './am-nhac-exam.js';
import { P4CN_EXAMS } from './cong-nghe-exam.js';
import { P4DD_EXAMS } from './dao-duc-exam.js';
import { P4GDTC_EXAMS } from './gdtc-exam.js';
import { P4HDTN_EXAMS } from './hdtn-exam.js';
import { P4KH_EXAMS } from './khoa-hoc-exam.js';
import { P4LSDL_EXAMS } from './lich-su-dia-ly-exam.js';
import { P4MT_EXAMS } from './my-thuat-exam.js';
import { P4TA_EXAMS } from './tieng-anh-exam.js';
import { P4TV_EXAMS } from './tieng-viet-exam.js';
import { P4TIN_EXAMS } from './tin-hoc-exam.js';
import { P4_EXAMS } from './toan-exam.js';
for (const EX of [P4AN_EXAMS, P4CN_EXAMS, P4DD_EXAMS, P4GDTC_EXAMS, P4HDTN_EXAMS, P4KH_EXAMS, P4LSDL_EXAMS, P4MT_EXAMS, P4TA_EXAMS, P4TV_EXAMS, P4TIN_EXAMS, P4_EXAMS]) Object.assign(PRIMARY_LOP4_SCENARIOS, EX);
// <<EXAM-MERGE-END>>
