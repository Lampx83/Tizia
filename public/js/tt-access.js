/* Nhà thuốc thực hành — ĐĂNG NHẬP THEO DANH SÁCH LỚP + GHI NHẬT KÝ THAO TÁC (req #245/#247/#248).
 * Chặn trang bằng màn đăng nhập tới khi có phiên hợp lệ từ máy chủ (/api/tt/enroll). Sau đó ghi MỌI thao tác
 * (bước nhiệm vụ, bấm nút, giá trị đã chọn/điền, thông báo lỗi, câu hỏi cho Trợ lý AI…) theo lô về /api/tt/log.
 * Không sửa mã của trang: bắt qua Storage.setItem (bước nhiệm vụ), uỷ quyền sự kiện click/change, và quan sát lỗi. */
(function () {
  'use strict';
  const SKEY = 'tt:session', IKEY = 'tt:identity';
  const $ = (id) => document.getElementById(id);
  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const J = (url, opt) => fetch(url, Object.assign({ credentials: 'same-origin' }, opt)).then(async (r) => { const d = await r.json().catch(() => ({})); if (!r.ok) throw Object.assign(new Error(d.error || ('HTTP ' + r.status)), { status: r.status }); return d; });
  const sget = (k) => { try { return JSON.parse(localStorage.getItem(k)); } catch { return null; } };
  const rawSet = Storage.prototype.setItem;
  const sset = (k, v) => { try { rawSet.call(localStorage, k, JSON.stringify(v)); } catch {} };

  let session = null, identity = null, queue = [], lastAct = Date.now(), open = null;
  const log = (kind, detail) => { if (!session) return; queue.push({ kind, detail: detail === undefined ? null : detail, t: Date.now() }); if (queue.length >= 30) flush(); };
  function flush(beacon) {
    if (!session || !queue.length) return;
    const body = JSON.stringify({ sessionId: session, events: queue.splice(0, 60) });
    if (beacon && navigator.sendBeacon) { navigator.sendBeacon('/api/tt/log', new Blob([body], { type: 'application/json' })); return; }
    fetch('/api/tt/log', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body, keepalive: true, credentials: 'same-origin' }).catch(() => {});
  }
  // req #236: open = nhiệm vụ (3–5) giảng viên đã mở cho lớp; null = chưa biết (đang tải).
  window.TT = { log, get identity() { return identity; }, get open() { return open; }, missionOpen: (n) => n < 3 || (Array.isArray(open) && open.includes(n)) };
  function setOpen(list) {
    const nw = Array.isArray(list) ? list.map(Number).sort() : [];
    if (open && nw.join() === open.join()) return;
    open = nw; window.dispatchEvent(new CustomEvent('tt:open', { detail: open }));
  }
  /* Mỗi lượt của 1 nhiệm vụ: đếm lỗi + câu hỏi trợ lý AI từ lúc bắt đầu tới lúc xong → 'mission_result' cho bảng xếp bậc.
     Lưu localStorage để tải lại trang giữa chừng không mất số đếm. */
  const RKEY = 'tt:runs';
  let runs = sget(RKEY) || {}, activeM = null;
  const saveRuns = () => sset(RKEY, runs);
  const bump = (k) => {
    const m = activeM || (typeof window.ttActiveMission === 'function' ? window.ttActiveMission() : null);   // sau khi tải lại trang
    if (m && runs[m]) { runs[m][k]++; saveRuns(); }
  };

  /* ---------- bắt thao tác ---------- */
  const SKIP = '#ttLogin,#doorPwMask,input[type=password]';
  const labelOf = (el) => (el.getAttribute('aria-label') || el.title || el.textContent || el.value || el.id || '').replace(/\s+/g, ' ').trim().slice(0, 70);
  function hook() {
    // bước nhiệm vụ: trang lưu trạng thái ở localStorage (mission1/2/3) mỗi khi qua bước
    Storage.prototype.setItem = function (k, v) {
      try {
        if (this === localStorage && /^tu-thuoc-mo-phong:(mission[123]|m[123]count|level|key)/.test(k)) {
          const old = (() => { try { return JSON.parse(localStorage.getItem(k)); } catch { return null; } })();
          let nw = null; try { nw = JSON.parse(v); } catch {}
          const m = (k.match(/mission(\d)/) || [])[1];
          if (m && nw && (!old || old.step !== nw.step)) {
            const mn = Number(m);
            log('mission_step', { m: mn, from: old && old.step || null, step: nw.step });
            if (nw.step !== 'done' && nw.step !== 'idle') {
              if (!runs[mn] || !old || old.step === 'done' || old.step === 'idle') { runs[mn] = { t0: Date.now(), errors: 0, asks: 0 }; saveRuns(); }
              activeM = mn;
            }
            if (nw.step === 'done') {
              log('mission_done', { m: mn });
              const r = runs[mn], ctx = (typeof window.ttRunContext === 'function' ? window.ttRunContext(mn) : null) || {};
              if (r) log('mission_result', { m: mn, errors: r.errors, asks: r.asks, ms: Date.now() - r.t0, hintsOff: !!ctx.hintsOff, tier: ctx.tier || 0 });
              delete runs[mn]; saveRuns(); if (activeM === mn) activeM = null;
              flush();
            }
          }
          else if (!m) log('state', { key: k.replace('tu-thuoc-mo-phong:', ''), value: String(v).slice(0, 80) });
        }
      } catch (e) {}
      return rawSet.apply(this, arguments);
    };
    document.addEventListener('click', (e) => {
      lastAct = Date.now();
      const el = e.target.closest('button,a,.pos-tab,.mg-mission,.pm-zone,[data-pkg] .pkg-tabs button,select,input[type=checkbox],input[type=radio],li[data-mission],.med-item,.m2-crate-map,[data-act]');
      if (!el || el.matches(SKIP) || el.closest(SKIP)) return;
      if (el.tagName === 'SELECT' || el.tagName === 'INPUT') return;   // ghi ở sự kiện change (kèm giá trị)
      log('click', { t: labelOf(el), id: el.id || undefined, z: el.dataset && (el.dataset.zone || el.dataset.tab || el.dataset.mission) || undefined });
    }, true);
    document.addEventListener('change', (e) => {
      lastAct = Date.now();
      const el = e.target; if (!el || el.matches(SKIP) || el.closest(SKIP)) return;
      if (!/^(INPUT|SELECT|TEXTAREA)$/.test(el.tagName)) return;
      const val = el.type === 'checkbox' || el.type === 'radio' ? el.checked : String(el.value).slice(0, 120);
      const row = el.closest('tr'); const ctx = row ? row.textContent.replace(/\s+/g, ' ').trim().slice(0, 50) : '';
      log('input', { f: el.id || el.name || el.className || el.tagName, v: val, ctx });
    }, true);
    document.addEventListener('keydown', () => { lastAct = Date.now(); }, true);
    // thông báo lỗi/cảnh báo hiện ra cho người học = câu trả lời sai
    let lastErr = '';
    new MutationObserver((ms) => {
      for (const m of ms) {
        const n = m.target.nodeType === 3 ? m.target.parentElement : m.target;
        const er = n && n.closest && n.closest('.pos-err,#m2Err,#thuErr,#m2LedErr,#hosoErr,.m1-warn');
        if (!er) continue;
        const t = er.textContent.replace(/\s+/g, ' ').trim();
        if (t && t !== lastErr && !/^✔|^✅/.test(t)) { lastErr = t; bump('errors'); log('error', { id: er.id || er.className, msg: t.slice(0, 200) }); }
        else if (!t) lastErr = '';
      }
    }).observe(document.body, { subtree: true, childList: true, characterData: true });
    // phần mềm bán hàng
    const wrap = (name, fn) => { const o = window[name]; if (typeof o !== 'function') return; window[name] = function () { try { fn.apply(this, arguments); } catch {} return o.apply(this, arguments); }; };
    wrap('openPOS', () => log('pos_open'));
    wrap('closePOS', () => log('pos_close'));
    window.addEventListener('edututor:ask', (e) => { bump('asks'); log('tutor_ask', { m: activeM, q: String(e.detail && e.detail.text || '').slice(0, 400) }); });
    // giảng viên có thể mở khoá giữa giờ → hỏi lại mỗi phút
    setInterval(() => { if (document.visibilityState === 'visible') J('/api/tt/me?sessionId=' + encodeURIComponent(session)).then((d) => setOpen(d.open)).catch(() => {}); }, 60000);
    setInterval(() => { if (document.visibilityState === 'visible' && Date.now() - lastAct < 60000) log('heartbeat'); }, 60000);
    setInterval(() => flush(), 4000);
    document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'hidden') flush(true); });
    window.addEventListener('pagehide', () => flush(true));
    log('page_open', { path: location.pathname + location.search });
  }

  /* ---------- màn đăng nhập ---------- */
  const CSS = `#ttLogin{position:fixed;inset:0;z-index:3000;background:linear-gradient(160deg,#cfeaf7,#e8f6ef);display:flex;align-items:center;justify-content:center;padding:16px;font-family:'Nunito',system-ui,sans-serif}
  #ttLogin .tt-card{background:#fff;border-radius:20px;box-shadow:0 14px 40px rgba(20,60,90,.28);padding:22px 24px;width:min(440px,100%);max-height:96vh;overflow:auto;color:#1f3b63}
  #ttLogin h2{margin:0 0 2px;font:800 1.35rem 'Baloo 2',sans-serif} #ttLogin .tt-sub{margin:0 0 12px;font-size:.84rem;opacity:.8}
  #ttLogin .tt-tabs{display:flex;gap:6px;margin-bottom:12px} #ttLogin .tt-tabs button{flex:1;border:2px solid #cfe0f2;background:#f3f8ff;border-radius:12px;padding:8px;font:800 .82rem 'Nunito',sans-serif;color:#2c6aa0;cursor:pointer}
  #ttLogin .tt-tabs button.on{background:#2f7fd8;border-color:#2f7fd8;color:#fff}
  #ttLogin label{display:block;font:800 .78rem 'Nunito',sans-serif;margin:9px 0 3px} #ttLogin label i{color:#c0392b;font-style:normal}
  #ttLogin input,#ttLogin select{width:100%;box-sizing:border-box;border:2px solid #cfe0f2;border-radius:10px;padding:9px 10px;font:600 .95rem 'Nunito',sans-serif;color:#1f3b63;background:#fff}
  #ttLogin input:focus,#ttLogin select:focus{outline:none;border-color:#2f7fd8}
  #ttLogin .tt-go{margin-top:14px;width:100%;border:0;border-radius:14px;padding:11px;background:linear-gradient(180deg,#38b26a,#2c8f55);color:#fff;font:800 1rem 'Baloo 2',sans-serif;cursor:pointer;box-shadow:0 3px 0 #1f6a3e}
  #ttLogin .tt-go[disabled]{opacity:.6;cursor:wait} #ttLogin .tt-err{min-height:1.2em;margin-top:8px;color:#b03a2e;font-weight:700;font-size:.84rem}
  #ttLogin .tt-note{margin-top:10px;font-size:.74rem;opacity:.75;line-height:1.4} #ttLogin .tt-mgr{margin-top:10px;display:flex;gap:8px;flex-wrap:wrap}
  #ttLogin .tt-mgr button,#ttLogin .tt-mgr a{flex:1;text-align:center;border:2px solid #2f7fd8;background:#fff;color:#2f7fd8;border-radius:12px;padding:8px;font:800 .8rem 'Nunito',sans-serif;cursor:pointer;text-decoration:none}
  body.tt-locked #edututor-fab,body.tt-locked #edututor-panel{display:none !important}`;
  function showLogin(cfg) {
    if (!$('ttStyle')) { const st = document.createElement('style'); st.id = 'ttStyle'; st.textContent = CSS; document.head.appendChild(st); }
    document.body.classList.add('tt-locked');
    const last = sget('tt:last') || {};
    const box = document.createElement('div'); box.id = 'ttLogin';
    const classField = cfg.rosterOn
      ? `<select id="ttClass"><option value="">— chọn lớp —</option>${cfg.classes.map((c) => `<option value="${esc(c)}"${last.cls === c ? ' selected' : ''}>${esc(c)}</option>`).join('')}</select>`
      : `<input id="ttClass" value="${esc(last.cls || '')}" placeholder="Ví dụ: Dược 12A" maxlength="60">`;
    box.innerHTML = `<div class="tt-card"><h2>🏥 Nhà thuốc thực hành</h2><p class="tt-sub">Đăng nhập để bắt đầu luyện tập — kết quả và thao tác của bạn được ghi lại cho giảng viên.</p>
      <div class="tt-tabs"><button type="button" data-m="student" class="on">Sinh viên</button><button type="button" data-m="test">Tài khoản thử</button></div>
      <div id="ttStu"><label>Mã sinh viên <i>*</i></label><input id="ttCode" autocomplete="off" value="${esc(last.code || '')}" maxlength="40">
        <label>Họ và tên <i>*</i></label><input id="ttName" autocomplete="name" value="${esc(last.name || '')}" maxlength="120">
        <label>Lớp <i>*</i></label>${classField}</div>
      <div id="ttTst" hidden><label>Tên đăng nhập</label><input id="ttUser" autocomplete="username" maxlength="40"><label>Mật khẩu</label><input id="ttPass" type="password" autocomplete="current-password" maxlength="60"></div>
      <div class="tt-err" id="ttErr"></div><button type="button" class="tt-go" id="ttGo">Vào luyện tập →</button>
      ${cfg.isManager ? `<div class="tt-mgr"><button type="button" id="ttTeacher">👩‍🏫 Vào với tư cách giảng viên</button><a href="/tt-quan-ly.html">📋 Quản lý danh sách &amp; nhật ký</a></div>` : ''}
      <p class="tt-note">${cfg.rosterOn ? 'Chỉ sinh viên có tên trong danh sách lớp do giảng viên tải lên mới vào được.' : 'Giảng viên chưa tải danh sách lớp nên hiện chưa giới hạn người vào.'}</p></div>`;
    document.body.appendChild(box);
    let mode = 'student';
    box.querySelectorAll('.tt-tabs button').forEach((b) => b.addEventListener('click', () => {
      mode = b.dataset.m; box.querySelectorAll('.tt-tabs button').forEach((x) => x.classList.toggle('on', x === b));
      $('ttStu').hidden = mode !== 'student'; $('ttTst').hidden = mode !== 'test'; $('ttErr').textContent = '';
    }));
    const go = async (payload) => {
      const err = $('ttErr'), btn = $('ttGo'); err.textContent = ''; btn.disabled = true;
      try {
        const d = await J('/api/tt/enroll', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
        if (payload.mode === 'student') sset('tt:last', { code: payload.studentCode, name: payload.studentName, cls: payload.className });
        sset(SKEY, { id: d.sessionId, at: Date.now() }); sset(IKEY, d.identity);
        start(d.sessionId, d.identity, d.open);
        box.remove(); document.body.classList.remove('tt-locked');
      } catch (e) { err.textContent = e.message || 'Không đăng nhập được.'; } finally { btn.disabled = false; }
    };
    $('ttGo').addEventListener('click', () => {
      if (mode === 'test') return go({ mode: 'test', username: $('ttUser').value, password: $('ttPass').value });
      const code = $('ttCode').value.trim(), name = $('ttName').value.trim(), cls = $('ttClass').value.trim();
      if (!code || !name || !cls) { $('ttErr').textContent = 'Vui lòng nhập đủ mã sinh viên, họ tên và chọn lớp.'; return; }
      go({ mode: 'student', studentCode: code, studentName: name, className: cls });
    });
    box.addEventListener('keydown', (e) => { if (e.key === 'Enter') $('ttGo').click(); });
    if ($('ttTeacher')) $('ttTeacher').addEventListener('click', () => go({ mode: 'teacher' }));
  }

  function start(sid, ident, openList) {
    session = sid; identity = ident; setOpen(openList);
    try { const u = $('mhUser'); if (u) { u.textContent = '👤 ' + (ident.name || ident.code); setTimeout(() => { u.textContent = '👤 ' + (ident.name || ident.code); }, 1500); } } catch {}
    // "Đổi người dùng" trong menu cài đặt
    try {
      const menu = $('mhMenu');
      if (menu && !$('ttSwitch')) {
        const b = document.createElement('button'); b.type = 'button'; b.id = 'ttSwitch'; b.textContent = '👤 Đổi người dùng';
        b.addEventListener('click', () => { flush(true); try { localStorage.removeItem(SKEY); localStorage.removeItem(IKEY); } catch {} location.reload(); });
        menu.appendChild(b);
      }
    } catch {}
    if (!window.__ttHooked) { window.__ttHooked = true; hook(); }
  }

  async function init() {
    const s = sget(SKEY);
    if (s && s.id && Date.now() - s.at < 11 * 3600000) {
      try { const d = await J('/api/tt/me?sessionId=' + encodeURIComponent(s.id)); start(s.id, d.identity, d.open); return; } catch (e) { if (e.status !== 401) { /* mạng lỗi: vẫn chặn, báo rõ */ } }
    }
    try { showLogin(await J('/api/tt/config')); }
    catch (e) {
      document.body.classList.add('tt-locked');
      const b = document.createElement('div'); b.id = 'ttLogin';
      // 401 = chưa đăng nhập Tizia (trang này cần tài khoản), khác hẳn lỗi mạng: báo đúng và đưa thẳng tới trang đăng nhập.
      const back = encodeURIComponent(location.pathname + location.search);
      b.innerHTML = e.status === 401
        ? '<div class="tt-card"><h2>Đăng nhập để vào nhà thuốc thực hành</h2><p class="tt-sub">Trang này dành cho người học đã có tài khoản Tizia. Đăng nhập xong bạn sẽ quay lại đúng trang này.</p><a class="tt-go" style="display:block;text-align:center;text-decoration:none" href="/login?return=' + back + '">Đăng nhập</a></div>'
        : '<div class="tt-card"><h2>Không kết nối được máy chủ</h2><p class="tt-sub">Kiểm tra mạng rồi tải lại trang.</p><button class="tt-go" onclick="location.reload()">Tải lại</button></div>';
      if (!$('ttStyle')) { const st = document.createElement('style'); st.id = 'ttStyle'; st.textContent = CSS; document.head.appendChild(st); }
      document.body.appendChild(b);
    }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
