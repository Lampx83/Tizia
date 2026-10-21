// ============================================================
// Lớp 1, Barrel lý thuyết tuần: gộp 8 môn × 35 tuần.
// File chưa tồn tại sẽ trả về {} (no-op) qua try/catch import động.
// Khi agent sinh xong từng môn, chỉ cần import thêm vào đây.
// ============================================================
let mod_toan = {}, mod_tv = {}, mod_ta = {}, mod_tnxh = {},
    mod_dd = {}, mod_an = {}, mod_mt = {}, mod_gdtc = {}, mod_hdtn = {};

try { ({ P1_TOAN_LESSONS: mod_toan } = await import('./toan.js')); } catch {}
try { ({ P1TV_LESSONS:    mod_tv   } = await import('./tieng-viet.js')); } catch {}
try { ({ P1TA_LESSONS:    mod_ta   } = await import('./tieng-anh.js')); } catch {}
try { ({ P1TNXH_LESSONS:  mod_tnxh } = await import('./tnxh.js')); } catch {}
try { ({ P1DD_LESSONS:    mod_dd   } = await import('./dao-duc.js')); } catch {}
try { ({ P1AN_LESSONS:    mod_an   } = await import('./am-nhac.js')); } catch {}
try { ({ P1MT_LESSONS:    mod_mt   } = await import('./my-thuat.js')); } catch {}
try { ({ P1GDTC_LESSONS:  mod_gdtc } = await import('./gdtc.js')); } catch {}
try { ({ P1HDTN_LESSONS:  mod_hdtn } = await import('./hdtn.js')); } catch {}

export const LOP1_LESSONS = {
  ...(mod_toan  || {}),
  ...(mod_tv    || {}),
  ...(mod_ta    || {}),
  ...(mod_tnxh  || {}),
  ...(mod_dd    || {}),
  ...(mod_an    || {}),
  ...(mod_mt    || {}),
  ...(mod_gdtc  || {}),
  ...(mod_hdtn  || {}),
};
