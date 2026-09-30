// ============================================================
// Lớp 10 (THPT) — Barrel: 13 môn (5 core + 7 mở rộng + GD địa phương).
// ============================================================
let m_toan = {}, m_nv = {}, m_ta = {}, m_ly = {}, m_hoa = {};
let m_sinh = {}, m_su = {}, m_dia = {}, m_gdcd = {};
let m_tin = {}, m_cn = {}, m_gdqp = {}, m_hdtn = {}, m_gddp = {};

try { ({ H10TOAN_SCENARIOS: m_toan } = await import('./toan.js')); } catch {}
try { ({ H10NV_SCENARIOS:   m_nv   } = await import('./ngu-van.js')); } catch {}
try { ({ H10TA_SCENARIOS:   m_ta   } = await import('./tieng-anh.js')); } catch {}
try { ({ H10LY_SCENARIOS:   m_ly   } = await import('./vat-ly.js')); } catch {}
try { ({ H10HOA_SCENARIOS:  m_hoa  } = await import('./hoa-hoc.js')); } catch {}
try { ({ H10SINH_SCENARIOS: m_sinh } = await import('./sinh-hoc.js')); } catch {}
try { ({ H10SU_SCENARIOS:   m_su   } = await import('./lich-su.js')); } catch {}
try { ({ H10DIA_SCENARIOS:  m_dia  } = await import('./dia-ly.js')); } catch {}
try { ({ H10GDCD_SCENARIOS: m_gdcd } = await import('./gdcd.js')); } catch {}
try { ({ H10TIN_SCENARIOS:  m_tin  } = await import('./tin-hoc.js')); } catch {}
try { ({ H10CN_SCENARIOS:   m_cn   } = await import('./cong-nghe.js')); } catch {}
try { ({ H10GDQP_SCENARIOS: m_gdqp } = await import('./gdqp.js')); } catch {}
try { ({ H10HDTN_SCENARIOS: m_hdtn } = await import('./hdtn.js')); } catch {}
try { ({ H10GDDP_SCENARIOS: m_gddp } = await import('./gd-dia-phuong.js')); } catch {}

let LOP10_LESSONS = {};
try { ({ LOP10_LESSONS } = await import('./lessons/_index.js')); } catch {}

export const HIGHSCHOOL_LOP10_SCENARIOS = {
  ...m_toan, ...m_nv, ...m_ta, ...m_ly, ...m_hoa,
  ...m_sinh, ...m_su, ...m_dia, ...m_gdcd,
  ...m_tin, ...m_cn, ...m_gdqp, ...m_hdtn, ...m_gddp,
};

for (const [id, sc] of Object.entries(HIGHSCHOOL_LOP10_SCENARIOS)) {
  if (LOP10_LESSONS && LOP10_LESSONS[id]) sc.lesson = LOP10_LESSONS[id];
}
