// ============================================================
// Lớp 12 — Barrel lý thuyết tuần (THPT năm 3 — ôn thi tốt nghiệp)
// ============================================================
// Mỗi file lessons export 1 map { weekId → lesson } khớp id quiz.
// Dùng try/catch dynamic import — không crash nếu 1 môn chưa có.
// ============================================================
let m_toan = {}, m_nv = {}, m_ta = {}, m_ly = {}, m_hoa = {}, m_sinh = {};
let m_su = {}, m_dia = {}, m_gdcd = {}, m_gdqp = {}, m_tin = {}, m_cn = {}, m_hdtn = {};

try { ({ H12TOAN_LESSONS: m_toan } = await import('./toan.js')); } catch {}
try { ({ H12NV_LESSONS:   m_nv   } = await import('./ngu-van.js')); } catch {}
try { ({ H12TA_LESSONS:   m_ta   } = await import('./tieng-anh.js')); } catch {}
try { ({ H12LY_LESSONS:   m_ly   } = await import('./vat-ly.js')); } catch {}
try { ({ H12HOA_LESSONS:  m_hoa  } = await import('./hoa-hoc.js')); } catch {}
try { ({ H12SINH_LESSONS: m_sinh } = await import('./sinh-hoc.js')); } catch {}
try { ({ H12SU_LESSONS:   m_su   } = await import('./lich-su.js')); } catch {}
try { ({ H12DIA_LESSONS:  m_dia  } = await import('./dia-ly.js')); } catch {}
try { ({ H12GDCD_LESSONS: m_gdcd } = await import('./gdcd.js')); } catch {}
try { ({ H12GDQP_LESSONS: m_gdqp } = await import('./gdqp.js')); } catch {}
try { ({ H12TIN_LESSONS:  m_tin  } = await import('./tin-hoc.js')); } catch {}
try { ({ H12CN_LESSONS:   m_cn   } = await import('./cong-nghe.js')); } catch {}
try { ({ H12HDTN_LESSONS: m_hdtn } = await import('./hdtn.js')); } catch {}

export const LOP12_LESSONS = {
  ...(m_toan || {}), ...(m_nv || {}), ...(m_ta || {}), ...(m_ly || {}), ...(m_hoa || {}),
  ...(m_sinh || {}), ...(m_su || {}), ...(m_dia || {}), ...(m_gdcd || {}), ...(m_gdqp || {}),
  ...(m_tin || {}), ...(m_cn || {}), ...(m_hdtn || {}),
};
