// ============================================================
// Lớp 9 (THCS) — Barrel: 12 môn × 35 tuần. Năm thi vào 10.
// ============================================================
let m_toan = {}, m_nv = {}, m_ta = {}, m_khtn = {}, m_lsdl = {},
    m_gdcd = {}, m_cn = {}, m_th = {}, m_gdtc = {}, m_nt = {},
    m_hdtn = {}, m_gddp = {};

try { ({ S9TOAN_SCENARIOS: m_toan } = await import('./toan.js')); } catch {}
try { ({ S9NV_SCENARIOS:   m_nv   } = await import('./ngu-van.js')); } catch {}
try { ({ S9TA_SCENARIOS:   m_ta   } = await import('./tieng-anh.js')); } catch {}
try { ({ S9KHTN_SCENARIOS: m_khtn } = await import('./khtn.js')); } catch {}
try { ({ S9LSDL_SCENARIOS: m_lsdl } = await import('./lich-su-dia.js')); } catch {}
try { ({ S9GDCD_SCENARIOS: m_gdcd } = await import('./gdcd.js')); } catch {}
try { ({ S9CN_SCENARIOS:   m_cn   } = await import('./cong-nghe.js')); } catch {}
try { ({ S9TIN_SCENARIOS:  m_th   } = await import('./tin-hoc.js')); } catch {}
try { ({ S9GDTC_SCENARIOS: m_gdtc } = await import('./gdtc.js')); } catch {}
try { ({ S9NT_SCENARIOS:   m_nt   } = await import('./nghe-thuat.js')); } catch {}
try { ({ S9HDTN_SCENARIOS: m_hdtn } = await import('./hdtn.js')); } catch {}
try { ({ S9GDDP_SCENARIOS: m_gddp } = await import('./gd-dia-phuong.js')); } catch {}

let LOP9_LESSONS = {};
try { ({ LOP9_LESSONS } = await import('./lessons/_index.js')); } catch {}

export const SECONDARY_LOP9_SCENARIOS = {
  ...m_toan, ...m_nv, ...m_ta, ...m_khtn, ...m_lsdl,
  ...m_gdcd, ...m_cn, ...m_th, ...m_gdtc, ...m_nt,
  ...m_hdtn, ...m_gddp,
};

for (const [id, sc] of Object.entries(SECONDARY_LOP9_SCENARIOS)) {
  if (LOP9_LESSONS && LOP9_LESSONS[id]) sc.lesson = LOP9_LESSONS[id];
}

// <<EXAM-MERGE-START>>
import { S9NV_EXAMS } from './ngu-van-exam.js';
import { S9TA_EXAMS } from './tieng-anh-exam.js';
import { S9TOAN_EXAMS } from './toan-exam.js';
for (const EX of [S9NV_EXAMS, S9TA_EXAMS, S9TOAN_EXAMS]) Object.assign(SECONDARY_LOP9_SCENARIOS, EX);
// <<EXAM-MERGE-END>>
