// ============================================================
// Lớp 10 — Barrel lý thuyết tuần (THPT năm 1)
// ============================================================
// Mỗi file lessons export 1 map { weekId → lesson } khớp id quiz.
// Dùng try/catch dynamic import — không crash nếu 1 môn chưa có.
// ============================================================
let m_toan = {}, m_nv = {}, m_ta = {}, m_ly = {}, m_hoa = {}, m_sinh = {};
let m_su = {}, m_dia = {}, m_gdcd = {}, m_gdqp = {}, m_tin = {}, m_cn = {}, m_hdtn = {}, m_gddp = {};

try { ({ H10TOAN_LESSONS: m_toan } = await import('./toan.js')); } catch {}
try { ({ H10NV_LESSONS:   m_nv   } = await import('./ngu-van.js')); } catch {}
try { ({ H10TA_LESSONS:   m_ta   } = await import('./tieng-anh.js')); } catch {}
try { ({ H10LY_LESSONS:   m_ly   } = await import('./vat-ly.js')); } catch {}
try { ({ H10HOA_LESSONS:  m_hoa  } = await import('./hoa-hoc.js')); } catch {}
try { ({ H10SINH_LESSONS: m_sinh } = await import('./sinh-hoc.js')); } catch {}
try { ({ H10SU_LESSONS:   m_su   } = await import('./lich-su.js')); } catch {}
try { ({ H10DIA_LESSONS:  m_dia  } = await import('./dia-ly.js')); } catch {}
try { ({ H10GDCD_LESSONS: m_gdcd } = await import('./gdcd.js')); } catch {}
try { ({ H10GDQP_LESSONS: m_gdqp } = await import('./gdqp.js')); } catch {}
try { ({ H10TIN_LESSONS:  m_tin  } = await import('./tin-hoc.js')); } catch {}
try { ({ H10CN_LESSONS:   m_cn   } = await import('./cong-nghe.js')); } catch {}
try { ({ H10HDTN_LESSONS: m_hdtn } = await import('./hdtn.js')); } catch {}
try { ({ H10GDDP_LESSONS: m_gddp } = await import('./gd-dia-phuong.js')); } catch {}

export const LOP10_LESSONS = {
  ...(m_toan || {}), ...(m_nv || {}), ...(m_ta || {}), ...(m_ly || {}), ...(m_hoa || {}),
  ...(m_sinh || {}), ...(m_su || {}), ...(m_dia || {}), ...(m_gdcd || {}), ...(m_gdqp || {}),
  ...(m_tin || {}), ...(m_cn || {}), ...(m_hdtn || {}), ...(m_gddp || {}),
};
