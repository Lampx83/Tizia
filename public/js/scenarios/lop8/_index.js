// ============================================================
// Lớp 8 (THCS) — Barrel: 12 môn × 35 tuần (mở rộng dần).
// ============================================================
let m_toan = {}, m_nv = {}, m_ta = {}, m_khtn = {}, m_lsdl = {},
    m_gdcd = {}, m_cn = {}, m_th = {}, m_gdtc = {}, m_nt = {},
    m_hdtn = {}, m_gddp = {};

try { ({ S8TOAN_SCENARIOS: m_toan } = await import('./toan.js')); } catch {}
try { ({ S8NV_SCENARIOS:   m_nv   } = await import('./ngu-van.js')); } catch {}
try { ({ S8TA_SCENARIOS:   m_ta   } = await import('./tieng-anh.js')); } catch {}
try { ({ S8KHTN_SCENARIOS: m_khtn } = await import('./khtn.js')); } catch {}
try { ({ S8LSDL_SCENARIOS: m_lsdl } = await import('./lich-su-dia.js')); } catch {}
try { ({ S8GDCD_SCENARIOS: m_gdcd } = await import('./gdcd.js')); } catch {}
try { ({ S8CN_SCENARIOS:   m_cn   } = await import('./cong-nghe.js')); } catch {}
try { ({ S8TIN_SCENARIOS:  m_th   } = await import('./tin-hoc.js')); } catch {}
try { ({ S8GDTC_SCENARIOS: m_gdtc } = await import('./gdtc.js')); } catch {}
try { ({ S8NT_SCENARIOS:   m_nt   } = await import('./nghe-thuat.js')); } catch {}
try { ({ S8HDTN_SCENARIOS: m_hdtn } = await import('./hdtn.js')); } catch {}
try { ({ S8GDDP_SCENARIOS: m_gddp } = await import('./gd-dia-phuong.js')); } catch {}

let LOP8_LESSONS = {};
try { ({ LOP8_LESSONS } = await import('./lessons/_index.js')); } catch {}

export const SECONDARY_LOP8_SCENARIOS = {
  ...m_toan, ...m_nv, ...m_ta, ...m_khtn, ...m_lsdl,
  ...m_gdcd, ...m_cn, ...m_th, ...m_gdtc, ...m_nt,
  ...m_hdtn, ...m_gddp,
};

for (const [id, sc] of Object.entries(SECONDARY_LOP8_SCENARIOS)) {
  if (LOP8_LESSONS && LOP8_LESSONS[id]) sc.lesson = LOP8_LESSONS[id];
}

// <<EXAM-MERGE-START>>
import { S8CN_EXAMS } from './cong-nghe-exam.js';
import { S8GDDP_EXAMS } from './gd-dia-phuong-exam.js';
import { S8GDCD_EXAMS } from './gdcd-exam.js';
import { S8GDTC_EXAMS } from './gdtc-exam.js';
import { S8HDTN_EXAMS } from './hdtn-exam.js';
import { S8KHTN_EXAMS } from './khtn-exam.js';
import { S8LSDL_EXAMS } from './lich-su-dia-exam.js';
import { S8NT_EXAMS } from './nghe-thuat-exam.js';
import { S8NV_EXAMS } from './ngu-van-exam.js';
import { S8TA_EXAMS } from './tieng-anh-exam.js';
import { S8TIN_EXAMS } from './tin-hoc-exam.js';
import { S8TOAN_EXAMS } from './toan-exam.js';
for (const EX of [S8CN_EXAMS, S8GDDP_EXAMS, S8GDCD_EXAMS, S8GDTC_EXAMS, S8HDTN_EXAMS, S8KHTN_EXAMS, S8LSDL_EXAMS, S8NT_EXAMS, S8NV_EXAMS, S8TA_EXAMS, S8TIN_EXAMS, S8TOAN_EXAMS]) Object.assign(SECONDARY_LOP8_SCENARIOS, EX);
// <<EXAM-MERGE-END>>
