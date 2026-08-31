// ============================================================
// Lớp 7 (THCS) — Barrel: 12 môn × 35 tuần. Dynamic + try/catch
// để chấp nhận môn còn thiếu (không crash khi sinh từng đợt).
// ============================================================
let m_toan = {}, m_nv = {}, m_ta = {}, m_khtn = {}, m_lsdl = {},
    m_gdcd = {}, m_cn = {}, m_th = {}, m_gdtc = {}, m_nt = {},
    m_hdtn = {}, m_gddp = {};

try { ({ S7TOAN_SCENARIOS: m_toan } = await import('./toan.js')); } catch {}
try { ({ S7NV_SCENARIOS:   m_nv   } = await import('./ngu-van.js')); } catch {}
try { ({ S7TA_SCENARIOS:   m_ta   } = await import('./tieng-anh.js')); } catch {}
try { ({ S7KHTN_SCENARIOS: m_khtn } = await import('./khtn.js')); } catch {}
try { ({ S7LSDL_SCENARIOS: m_lsdl } = await import('./lich-su-dia.js')); } catch {}
try { ({ S7GDCD_SCENARIOS: m_gdcd } = await import('./gdcd.js')); } catch {}
try { ({ S7CN_SCENARIOS:   m_cn   } = await import('./cong-nghe.js')); } catch {}
try { ({ S7TIN_SCENARIOS:  m_th   } = await import('./tin-hoc.js')); } catch {}
try { ({ S7GDTC_SCENARIOS: m_gdtc } = await import('./gdtc.js')); } catch {}
try { ({ S7NT_SCENARIOS:   m_nt   } = await import('./nghe-thuat.js')); } catch {}
try { ({ S7HDTN_SCENARIOS: m_hdtn } = await import('./hdtn.js')); } catch {}
try { ({ S7GDDP_SCENARIOS: m_gddp } = await import('./gd-dia-phuong.js')); } catch {}

let LOP7_LESSONS = {};
try { ({ LOP7_LESSONS } = await import('./lessons/_index.js')); } catch {}

export const SECONDARY_LOP7_SCENARIOS = {
  ...m_toan, ...m_nv, ...m_ta, ...m_khtn, ...m_lsdl,
  ...m_gdcd, ...m_cn, ...m_th, ...m_gdtc, ...m_nt,
  ...m_hdtn, ...m_gddp,
};

for (const [id, sc] of Object.entries(SECONDARY_LOP7_SCENARIOS)) {
  if (LOP7_LESSONS && LOP7_LESSONS[id]) sc.lesson = LOP7_LESSONS[id];
}

// <<EXAM-MERGE-START>>
import { S7TOAN_EXAMS } from './toan-exam.js';
import { S7NV_EXAMS } from './ngu-van-exam.js';
import { S7TA_EXAMS } from './tieng-anh-exam.js';
import { S7KHTN_EXAMS } from './khtn-exam.js';
import { S7LSDL_EXAMS } from './lich-su-dia-exam.js';
import { S7GDCD_EXAMS } from './gdcd-exam.js';
import { S7CN_EXAMS } from './cong-nghe-exam.js';
import { S7TIN_EXAMS } from './tin-hoc-exam.js';
import { S7GDTC_EXAMS } from './gdtc-exam.js';
import { S7NT_EXAMS } from './nghe-thuat-exam.js';
import { S7HDTN_EXAMS } from './hdtn-exam.js';
import { S7GDDP_EXAMS } from './gd-dia-phuong-exam.js';
for (const EX of [S7TOAN_EXAMS, S7NV_EXAMS, S7TA_EXAMS, S7KHTN_EXAMS, S7LSDL_EXAMS, S7GDCD_EXAMS, S7CN_EXAMS, S7TIN_EXAMS, S7GDTC_EXAMS, S7NT_EXAMS, S7HDTN_EXAMS, S7GDDP_EXAMS]) Object.assign(SECONDARY_LOP7_SCENARIOS, EX);
// <<EXAM-MERGE-END>>
