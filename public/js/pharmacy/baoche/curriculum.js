// ============================================================
// Chế độ GIÁO TRÌNH cho Phòng Bào chế — chạy TRONG scene của
// compounding-lab.html (tái dùng phòng/ánh sáng/đồ hoạ đẹp sẵn có).
// Kích hoạt khi ?src=baoche. Tự chèn DOM (id prefix bc-), tự đặt trạm 3D
// (buildApparatus từ stations.js) lên bàn, chạy step engine + 2 trục sư phạm.
// Dữ liệu: /api/content/baoche-lessons (schema v2).
// ============================================================
import { STATIONS, buildApparatus } from './stations.js?v=7';

export async function initCurriculum(ctx) {
  const { THREE, scene, camera, controls, renderer, submitAttempt, sfx } = ctx;
  const HERO_Y = 0.95;          // mặt bàn compounding-lab
  const HERO_POS = new THREE.Vector3(0, HERO_Y, 0.2);

  // ---------- ẩn UI free-form của compounding-lab ----------
  const hideIds = ['recipe', 'recipe-fab', 'step', 'step-fab', 'mp-fab', 'action-fab', 'help-fab',
    'hand-btn', 'change-level', 'level-modal', 'skip-step-btn', 'restart-btn', 'lvl-pill', 'topbar-recipe'];
  for (const id of hideIds) { const el = document.getElementById(id); if (el) el.style.display = 'none'; }

  // ---------- style + DOM (bc- prefix) ----------
  const style = document.createElement('style');
  style.textContent = `
    #bc-recipe{position:fixed;left:12px;top:56px;width:280px;max-height:calc(100vh - 72px);overflow:auto;
      background:rgba(15,23,42,.82);border:1px solid rgba(255,255,255,.12);border-radius:14px;padding:14px;z-index:30;backdrop-filter:blur(10px);color:#e5e7eb;font-family:Inter,system-ui,sans-serif}
    #bc-recipe h3{margin:0 0 2px;font-size:15px}
    #bc-recipe .sub{font-size:11px;opacity:.7;margin-bottom:10px}
    #bc-recipe .lbl{font-size:10px;text-transform:uppercase;letter-spacing:.6px;opacity:.6;font-weight:700;margin:12px 0 4px}
    #bc-recipe .frow{display:flex;justify-content:space-between;gap:8px;padding:2px 0;border-bottom:1px dashed rgba(255,255,255,.08);font-size:12px}
    #bc-recipe .frow b{font-variant-numeric:tabular-nums}
    #bc-recipe .qitem{padding:3px 0 3px 16px;position:relative;font-size:12px;opacity:.9}
    #bc-recipe .qitem:before{content:'◦';position:absolute;left:2px;opacity:.6}
    #bc-recipe .method{display:inline-block;background:rgba(34,197,94,.15);border:1px solid rgba(34,197,94,.35);padding:2px 8px;border-radius:6px;font-size:11px;margin-top:4px}
    #bc-equip{position:fixed;right:12px;top:56px;width:200px;background:rgba(15,23,42,.82);border:1px solid rgba(255,255,255,.12);border-radius:12px;padding:10px 12px;z-index:30;font-size:11px;backdrop-filter:blur(10px);color:#e5e7eb;font-family:Inter,system-ui,sans-serif}
    #bc-equip .lbl{font-size:10px;text-transform:uppercase;letter-spacing:.6px;opacity:.6;font-weight:700;margin-bottom:6px}
    #bc-equip .eq{display:flex;align-items:center;gap:7px;padding:3px 0;opacity:.5}
    #bc-equip .eq.on{opacity:1;color:#14b8a6}
    #bc-step{position:fixed;left:50%;bottom:14px;transform:translateX(-50%);width:min(680px,94vw);background:rgba(15,23,42,.86);border:1px solid rgba(255,255,255,.12);border-radius:16px;padding:14px 18px;z-index:30;backdrop-filter:blur(10px);color:#e5e7eb;font-family:Inter,system-ui,sans-serif}
    #bc-rail{display:flex;gap:5px;margin-bottom:9px;overflow-x:auto;padding-bottom:2px}
    #bc-rail .d{flex:0 0 auto;min-width:22px;height:22px;border-radius:6px;border:1px solid rgba(255,255,255,.12);display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:700;opacity:.5;background:rgba(255,255,255,.04)}
    #bc-rail .d.done{opacity:1;background:rgba(34,197,94,.22);border-color:#22c55e;color:#bbf7d0}
    #bc-rail .d.cur{opacity:1;background:rgba(20,184,166,.28);border-color:#14b8a6;color:#fff;box-shadow:0 0 0 2px rgba(20,184,166,.25)}
    #bc-num{font-size:11px;letter-spacing:.6px;font-weight:800;color:#14b8a6;text-transform:uppercase}
    #bc-title{font-size:16px;font-weight:700;margin:3px 0 2px}
    #bc-why{font-size:12px;opacity:.75}
    #bc-std{font-size:12px;margin-top:6px;padding:7px 10px;background:rgba(20,184,166,.10);border-left:3px solid #14b8a6;border-radius:6px}
    #bc-meter{height:9px;background:rgba(255,255,255,.10);border-radius:6px;margin-top:10px;overflow:hidden}
    #bc-meter-bar{height:100%;width:0;background:linear-gradient(90deg,#14b8a6,#22c55e);transition:width .25s}
    #bc-hint{font-size:11px;opacity:.6;margin-top:7px;display:flex;justify-content:space-between}
    #bc-act{margin-top:10px;width:100%;padding:11px;border:0;border-radius:10px;cursor:pointer;background:linear-gradient(135deg,#14b8a6,#0ea5e9);color:#03211d;font-weight:800;font-size:14px}
    #bc-act:hover{filter:brightness(1.08)} #bc-act:disabled{opacity:.6;cursor:default}
    #bc-act.done{background:linear-gradient(135deg,#22c55e,#16a34a)}
    .bc-modal{position:fixed;inset:0;background:rgba(2,6,23,.82);z-index:80;display:flex;align-items:center;justify-content:center;padding:20px;backdrop-filter:blur(6px);font-family:Inter,system-ui,sans-serif;color:#e5e7eb}
    .bc-card{background:#0b1220;border:1px solid rgba(255,255,255,.12);border-radius:18px;padding:22px;max-width:840px;width:100%;max-height:90vh;overflow:auto}
    .bc-card h2{margin:0 0 4px;font-size:22px} .bc-card .desc{opacity:.75;font-size:13px;margin-bottom:16px}
    .bc-lgrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:10px}
    .bc-lcard{background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.12);border-radius:12px;padding:12px;cursor:pointer;transition:.15s}
    .bc-lcard:hover{border-color:#14b8a6;background:rgba(20,184,166,.10);transform:translateY(-2px)}
    .bc-lcard .ic{font-size:28px}.bc-lcard .nm{font-size:13px;font-weight:700;margin-top:4px}.bc-lcard .mt{font-size:11px;opacity:.6;margin-top:3px}
    .bc-lcard .badge{display:inline-block;font-size:10px;background:rgba(20,184,166,.2);border:1px solid rgba(20,184,166,.4);border-radius:5px;padding:1px 6px;margin-top:6px}
    .bc-match{display:grid;grid-template-columns:1fr 1fr;gap:20px}
    .bc-chip{background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.12);border-radius:9px;padding:9px 11px;margin-bottom:7px;font-size:13px;cursor:pointer;transition:.12s}
    .bc-chip:hover{border-color:#14b8a6}.bc-chip.sel{border-color:#14b8a6;background:rgba(20,184,166,.15)}
    .bc-chip.matched{opacity:.45;pointer-events:none;border-color:#22c55e}.bc-chip small{display:block;opacity:.6;font-size:11px;margin-top:2px}
    .bc-btn{padding:11px 18px;border:0;border-radius:10px;cursor:pointer;font-weight:800;font-size:14px;background:linear-gradient(135deg,#14b8a6,#0ea5e9);color:#03211d}
    .bc-btn.ghost{background:transparent;border:1px solid rgba(255,255,255,.12);color:#fff}
    .bc-qcheck{display:flex;align-items:flex-start;gap:10px;padding:10px;border:1px solid rgba(255,255,255,.12);border-radius:10px;margin-bottom:8px;cursor:pointer}
    .bc-qcheck.on{border-color:#22c55e;background:rgba(34,197,94,.10)}
    .bc-qcheck .box{width:20px;height:20px;border-radius:5px;border:2px solid rgba(255,255,255,.12);flex:0 0 auto;margin-top:1px;display:flex;align-items:center;justify-content:center;font-size:13px}
    .bc-qcheck.on .box{border-color:#22c55e;color:#22c55e}
    .bc-row{display:flex;gap:10px;justify-content:center;margin-top:18px;flex-wrap:wrap}
    .bc-score{font-size:52px;font-weight:800;text-align:center;background:linear-gradient(135deg,#fff,#14b8a6);-webkit-background-clip:text;background-clip:text;color:transparent}
    #bc-toast{position:fixed;left:50%;top:64px;transform:translateX(-50%);background:#0b1220;border:1px solid rgba(255,255,255,.12);padding:9px 16px;border-radius:10px;z-index:90;font-size:13px;display:none;font-family:Inter,system-ui,sans-serif;color:#e5e7eb}
    #bc-toast.ok{border-color:#22c55e}#bc-toast.warn{border-color:#f59e0b}
  `;
  document.head.appendChild(style);

  const wrap = document.createElement('div');
  wrap.innerHTML = `
    <div id="bc-recipe"></div>
    <div id="bc-equip"></div>
    <div id="bc-step" style="display:none">
      <div id="bc-rail"></div>
      <div id="bc-num"></div><div id="bc-title"></div><div id="bc-why"></div><div id="bc-std"></div>
      <div id="bc-meter"><div id="bc-meter-bar"></div></div>
      <div id="bc-hint"><span id="bc-hint-t">—</span><span id="bc-frac"></span></div>
      <button id="bc-act"></button>
    </div>
    <div id="bc-toast"></div>
    <div id="bc-modal"></div>`;
  document.body.appendChild(wrap);
  const $ = (s) => wrap.querySelector(s) || document.getElementById(s.replace('#', ''));
  const modalRoot = document.getElementById('bc-modal');
  const byId = (id) => document.getElementById(id);

  // ---------- data ----------
  const LESSONS = await fetch('/api/content/baoche-lessons', { credentials: 'same-origin' })
    .then(r => r.ok ? r.json() : { items: [] }).then(j => j.items || []).catch(() => []);

  // ---------- toast ----------
  const toastEl = byId('bc-toast'); let toastT = null;
  function toast(msg, type = '', ms = 1800) { toastEl.textContent = msg; toastEl.className = type; toastEl.style.display = 'block'; clearTimeout(toastT); toastT = setTimeout(() => toastEl.style.display = 'none', ms); }

  // ---------- hero apparatus ----------
  let recipe = null, state = null, heroGroup = null, heroTick = null;
  function clearHero() { if (heroGroup) { scene.remove(heroGroup); heroGroup.traverse(o => { if (o.geometry) o.geometry.dispose(); if (o.material) (Array.isArray(o.material) ? o.material : [o.material]).forEach(m => m.dispose()); }); heroGroup = null; heroTick = null; } }

  const done = () => { try { return new Set(JSON.parse(localStorage.getItem('tizia:baoche:done') || '[]')); } catch { return new Set(); } };
  const markDone = (id) => { const s = done(); s.add(id); try { localStorage.setItem('tizia:baoche:done', JSON.stringify([...s])); } catch {} };

  // ============================================================
  function startRecipe(r) {
    recipe = r;
    state = { stepIdx: 0, clicks: 0, stepDone: new Array(r.steps.length).fill(false), errors: 0, startedAt: Date.now(),
      roleScore: 0, roleMax: (r.components || []).length, qualityScore: 0, qualityMax: (r.quality || []).length, advancing: false };
    const tb = byId('topbar-recipe'); // reuse compounding-lab topbar text nếu có (đã ẩn) → dùng riêng
    renderRecipePanel(); renderEquip();
    byId('bc-step').style.display = 'block';
    if (state.roleMax > 0) openRoleMatch(); else renderStep();
  }

  function renderRecipePanel() {
    const r = recipe;
    let h = `<h3>${r.icon || '🧪'} ${r.name}</h3><div class="sub">${r.short || ''} · Bài ${r.lesson}</div><span class="method">${r.methodName || r.method}</span>`;
    h += `<div class="lbl">Công thức</div>`;
    for (const f of (r.formula || [])) h += `<div class="frow"><span>${f.name}</span><b>${f.amount || ''} ${f.unit || ''}</b></div>`;
    h += `<div class="lbl">Yêu cầu chất lượng</div>`;
    for (const q of (r.quality || [])) h += `<div class="qitem">${q}</div>`;
    if (r.indication) h += `<div class="lbl">Chỉ định</div><div style="font-size:12px;opacity:.85">${r.indication}</div>`;
    byId('bc-recipe').innerHTML = h;
  }
  function renderEquip() {
    const seen = [];
    for (const s of recipe.steps) { const st = STATIONS[s.action] || STATIONS._default; if (!seen.find(x => x.key === st.key)) seen.push(st); }
    let h = `<div class="lbl">Thiết bị bài này</div>`;
    for (const st of seen) h += `<div class="eq" data-key="${st.key}">${st.icon} ${st.equipName}</div>`;
    byId('bc-equip').innerHTML = h;
  }
  function station() { const s = recipe.steps[state.stepIdx]; return STATIONS[s.action] || STATIONS._default; }
  function renderRail() {
    byId('bc-rail').innerHTML = recipe.steps.map((s, i) => {
      const cls = state.stepDone[i] ? 'done' : (i === state.stepIdx ? 'cur' : '');
      return `<div class="d ${cls}" title="Bước ${i + 1}: ${(s.label || '').replace(/"/g, '&quot;')}">${state.stepDone[i] ? '✓' : (i + 1)}</div>`;
    }).join('');
  }

  function renderStep() {
    const i = state.stepIdx, act = byId('bc-act');
    if (i >= recipe.steps.length) {
      renderRail();
      byId('bc-num').textContent = 'HOÀN TẤT QUY TRÌNH';
      byId('bc-title').textContent = '🎉 Đã thực hiện xong các bước!';
      byId('bc-why').textContent = 'Kiểm tra chất lượng thành phẩm rồi nộp bài.';
      byId('bc-std').textContent = ''; byId('bc-meter-bar').style.width = '100%';
      byId('bc-frac').textContent = `${recipe.steps.length}/${recipe.steps.length}`;
      act.textContent = '🔍 Kiểm tra chất lượng thành phẩm'; act.classList.add('done'); act.disabled = false;
      act.onclick = () => { if (state.qualityMax > 0) openQuality(); else finish(); };
      clearHero(); return;
    }
    const s = recipe.steps[i], st = station();
    state.clicks = 0; renderRail();
    byId('bc-num').textContent = `BƯỚC ${i + 1} / ${recipe.steps.length}`;
    byId('bc-title').textContent = s.label;
    byId('bc-why').textContent = s.purpose ? `Ý nghĩa: ${s.purpose}` : '';
    byId('bc-std').innerHTML = s.standard ? `<b>Tiêu chuẩn:</b> ${s.standard}` : '';
    byId('bc-meter-bar').style.width = '0%';
    byId('bc-frac').textContent = `${i + 1}/${recipe.steps.length}`;
    byId('bc-hint-t').textContent = st.hint(s);
    act.classList.remove('done'); act.disabled = false; act.textContent = `${st.icon} ${st.verb(s)}`; act.onclick = doAction;
    wrap.querySelectorAll('#bc-equip .eq').forEach(e => e.classList.toggle('on', e.dataset.key === st.key));
    clearHero();
    const built = buildApparatus(st.key, THREE, s, recipe);
    heroGroup = built.group; heroGroup.position.copy(HERO_POS); heroTick = built.tick; scene.add(heroGroup);
  }
  function needClicks(st, s) { return st.clicks(s); }
  function doAction() {
    const i = state.stepIdx;
    if (state.advancing || state.stepDone[i]) return;
    const s = recipe.steps[i], st = station(), need = needClicks(st, s);
    state.clicks++;
    const p = Math.min(1, state.clicks / need);
    byId('bc-meter-bar').style.width = (p * 100).toFixed(0) + '%';
    if (heroTick) heroTick(0, p, true);
    try { sfx.tick(); } catch {}
    if (state.clicks >= need) {
      state.stepDone[i] = true; state.advancing = true; byId('bc-act').disabled = true;
      try { sfx.correct(); } catch {}
      toast(`✅ ${s.standard ? s.standard.split('.')[0] : 'Đạt bước ' + (i + 1)}`, 'ok', 1500);
      setTimeout(() => { state.advancing = false; byId('bc-act').disabled = false; advance(); }, 520);
    } else byId('bc-hint-t').textContent = st.progressHint ? st.progressHint(s, p) : `Tiếp tục… ${(p * 100).toFixed(0)}%`;
  }
  function advance() { let i = state.stepIdx + 1; while (i < recipe.steps.length && state.stepDone[i]) i++; state.stepIdx = i; renderStep(); }

  // ---------- pedagogy 1 ----------
  function openRoleMatch() {
    const comps = recipe.components || [];
    const shuffled = comps.map(c => ({ role: c.role, name: c.name }));
    for (let i = shuffled.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]; }
    let sel = null; const matched = {};
    modalRoot.innerHTML = `<div class="bc-modal"><div class="bc-card">
      <h2>📖 Phân tích công thức — ${recipe.name}</h2>
      <div class="desc">Ghép mỗi <b>thành phần</b> với <b>vai trò</b> đúng của nó.</div>
      <div class="bc-match"><div><div class="desc">Thành phần</div><div id="bc-cn"></div></div><div><div class="desc">Vai trò</div><div id="bc-cr"></div></div></div>
      <div class="bc-row" style="justify-content:flex-end"><span id="bc-mc" style="align-self:center;opacity:.7;font-size:13px"></span><button class="bc-btn ghost" id="bc-skip">Bỏ qua</button></div></div></div>`;
    const cn = byId('bc-cn'), cr = byId('bc-cr');
    comps.forEach(c => { const el = document.createElement('div'); el.className = 'bc-chip'; el.dataset.name = c.name;
      el.innerHTML = `${c.name}${c.characteristic ? `<small>${c.characteristic}</small>` : ''}`;
      el.onclick = () => { if (matched[c.name]) return; cn.querySelectorAll('.bc-chip').forEach(x => x.classList.remove('sel')); el.classList.add('sel'); sel = c.name; }; cn.appendChild(el); });
    shuffled.forEach(rr => { const el = document.createElement('div'); el.className = 'bc-chip'; el.dataset.role = rr.name; el.innerHTML = rr.role;
      el.onclick = () => { if (!sel) { toast('Chọn thành phần bên trái trước', 'warn'); return; }
        if (rr.name === sel) { matched[sel] = true; state.roleScore++; cn.querySelector(`.bc-chip[data-name="${CSS.escape(sel)}"]`)?.classList.add('matched'); el.classList.add('matched'); toast('✔ Đúng vai trò', 'ok', 1000); }
        else { state.errors++; toast('✗ Chưa đúng — thử lại', 'warn', 1100); }
        sel = null; cn.querySelectorAll('.bc-chip').forEach(x => x.classList.remove('sel'));
        byId('bc-mc').textContent = `${state.roleScore}/${state.roleMax} đúng`;
        if (state.roleScore >= state.roleMax) setTimeout(closeRole, 650); }; cr.appendChild(el); });
    byId('bc-mc').textContent = `0/${state.roleMax} đúng`; byId('bc-skip').onclick = closeRole;
    try { sfx.open?.(); } catch {}
  }
  function closeRole() { modalRoot.innerHTML = ''; renderStep(); }

  // ---------- pedagogy 2 ----------
  function openQuality() {
    const qs = recipe.quality || []; const checked = new Set();
    modalRoot.innerHTML = `<div class="bc-modal"><div class="bc-card">
      <h2>🔍 Kiểm tra chất lượng — ${recipe.name}</h2>
      <div class="desc">Đối chiếu thành phẩm với tiêu chuẩn giáo trình. Đánh dấu tiêu chuẩn đã đạt.</div>
      <div id="bc-ql"></div><div class="bc-row" style="justify-content:flex-end"><button class="bc-btn" id="bc-qd">Xác nhận &amp; Nộp bài</button></div></div></div>`;
    const list = byId('bc-ql');
    qs.forEach((q, idx) => { const el = document.createElement('div'); el.className = 'bc-qcheck'; el.innerHTML = `<div class="box"></div><div>${q}</div>`;
      el.onclick = () => { if (checked.has(idx)) { checked.delete(idx); el.classList.remove('on'); el.querySelector('.box').textContent = ''; } else { checked.add(idx); el.classList.add('on'); el.querySelector('.box').textContent = '✓'; } }; list.appendChild(el); });
    byId('bc-qd').onclick = () => { state.qualityScore = checked.size; modalRoot.innerHTML = ''; finish(); };
  }

  // ---------- score + submit ----------
  function computeScore() {
    const sp = recipe.steps.length ? state.stepDone.filter(Boolean).length / recipe.steps.length : 1;
    const rp = state.roleMax ? state.roleScore / state.roleMax : 1;
    const qp = state.qualityMax ? state.qualityScore / state.qualityMax : 1;
    let raw = sp * 0.6 + rp * 0.2 + qp * 0.2; raw = Math.max(0, raw - Math.min(0.15, state.errors * 0.01));
    return Math.round(raw * 100);
  }
  async function finish() {
    const score = computeScore(); markDone(recipe.id);
    const res = await submitAttempt({ subject: 'bao-che', activity: 'bao-che-lab', activityId: recipe.id, lesson: recipe.lesson,
      score, maxScore: 100, correct: state.stepDone.filter(Boolean).length, total: recipe.steps.length,
      durationSec: Math.round((Date.now() - state.startedAt) / 1000),
      meta: { method: recipe.method, form: recipe.form, roleScore: state.roleScore, qualityScore: state.qualityScore, errors: state.errors } });
    showResult(score, res);
  }
  function nextRecipe() { const i = LESSONS.findIndex(r => r.id === recipe.id); return i >= 0 && i < LESSONS.length - 1 ? LESSONS[i + 1] : null; }
  function showResult(score, res) {
    try { sfx.perfect?.(); } catch {}
    const saved = res ? '✅ Đã lưu điểm' : '⚠️ Chưa đăng nhập — điểm không được lưu';
    const sd = state.stepDone.filter(Boolean).length; const nx = nextRecipe();
    modalRoot.innerHTML = `<div class="bc-modal"><div class="bc-card" style="max-width:480px;text-align:center">
      <h2>Kết quả — ${recipe.name}</h2><div class="bc-score">${score}</div>
      <div style="opacity:.8;font-size:13px;margin:4px 0 14px">${saved}</div>
      <div style="text-align:left;font-size:13px;line-height:1.9;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.12);border-radius:10px;padding:12px">
        <div>Quy trình: <b>${sd}/${recipe.steps.length}</b> bước</div><div>Phân tích thành phần: <b>${state.roleScore}/${state.roleMax}</b></div>
        <div>Kiểm tra chất lượng: <b>${state.qualityScore}/${state.qualityMax}</b></div><div>Lỗi thao tác: <b>${state.errors}</b></div></div>
      <details style="margin-top:14px;text-align:left"><summary style="cursor:pointer;font-size:13px;opacity:.85;font-weight:700">📋 Xem lại quy trình (${recipe.steps.length} bước)</summary>
        <div style="margin-top:8px;font-size:12px;line-height:1.5;max-height:200px;overflow:auto">${recipe.steps.map((s, i) => `<div style="padding:6px 0;border-bottom:1px solid rgba(255,255,255,.06)"><b style="color:#22c55e">${state.stepDone[i] ? '✓' : '○'} B${i + 1}.</b> ${s.label}${s.standard ? `<div style="opacity:.6;padding-left:20px">→ ${s.standard}</div>` : ''}</div>`).join('')}</div></details>
      <div class="bc-row"><button class="bc-btn ghost" id="bc-again">Làm lại</button><button class="bc-btn ghost" id="bc-pick">Chọn bài khác</button>${nx ? `<button class="bc-btn" id="bc-next">Bài tiếp →</button>` : ''}</div></div></div>`;
    byId('bc-again').onclick = () => { modalRoot.innerHTML = ''; startRecipe(recipe); };
    byId('bc-pick').onclick = openPicker;
    if (nx) byId('bc-next').onclick = () => { modalRoot.innerHTML = ''; startRecipe(nx); };
  }

  // ---------- picker ----------
  function openPicker() {
    const d = done(); const byL = {}; for (const r of LESSONS) (byL[r.lesson] ??= []).push(r);
    const titles = {}; for (const r of LESSONS) titles[r.lesson] = r.lessonTitle || '';
    const dc = LESSONS.filter(r => d.has(r.id)).length;
    let h = `<div class="bc-modal"><div class="bc-card"><h2>🧪 Phòng Bào chế — chọn bài thực hành</h2>
      <div class="desc">12 bài theo giáo trình <b>Thực hành Bào chế</b> (DUOC 04). <b>Đã hoàn thành ${dc}/${LESSONS.length}.</b></div><div id="bc-pb"></div></div></div>`;
    modalRoot.innerHTML = h; const body = byId('bc-pb');
    for (const L of Object.keys(byL).sort((a, b) => a - b)) {
      const head = document.createElement('div'); head.style.cssText = 'font-size:12px;font-weight:800;color:#14b8a6;text-transform:uppercase;letter-spacing:.5px;margin:16px 0 8px';
      head.textContent = `Bài ${L} — ${titles[L]}`; body.appendChild(head);
      const grid = document.createElement('div'); grid.className = 'bc-lgrid';
      for (const r of byL[L]) { const el = document.createElement('div'); el.className = 'bc-lcard';
        const ck = d.has(r.id) ? '<span style="float:right;color:#22c55e">✓</span>' : '';
        el.innerHTML = `<div class="ic">${r.icon || '🧪'}${ck}</div><div class="nm">${r.name}</div><div class="mt">${r.steps.length} bước · ${(r.components || []).length} thành phần</div><span class="badge">${r.methodName || r.method}</span>`;
        el.onclick = () => { modalRoot.innerHTML = ''; startRecipe(r); }; grid.appendChild(el); }
      body.appendChild(grid);
    }
  }

  // ---------- raycast click vào thiết bị + keyboard ----------
  const ray = new THREE.Raycaster(), ptr = new THREE.Vector2(); let downXY = null;
  function hitHero(e) { if (!heroGroup) return false; ptr.x = (e.clientX / innerWidth) * 2 - 1; ptr.y = -(e.clientY / innerHeight) * 2 + 1; ray.setFromCamera(ptr, camera); return ray.intersectObject(heroGroup, true).length > 0; }
  renderer.domElement.addEventListener('pointerdown', (e) => { downXY = [e.clientX, e.clientY]; });
  renderer.domElement.addEventListener('pointerup', (e) => { if (!downXY) return; const moved = Math.hypot(e.clientX - downXY[0], e.clientY - downXY[1]); downXY = null; if (moved > 6) return; if (!state || state.stepIdx >= (recipe?.steps.length ?? 0)) return; const a = byId('bc-act'); if (a && !a.disabled && hitHero(e)) doAction(); });
  addEventListener('keydown', (e) => { if (e.key !== 'Enter' && e.key !== ' ') return; if (/input|textarea/i.test(document.activeElement?.tagName || '')) return; if (modalRoot.querySelector('.bc-modal')) return; const a = byId('bc-act'); if (a && !a.disabled && state && state.stepIdx < (recipe?.steps.length ?? 0)) { e.preventDefault(); doAction(); } });

  // ---------- animation hook (compounding-lab tự render; ta chỉ tick trạm) ----------
  let last = performance.now ? 0 : 0;
  function tickLoop() { requestAnimationFrame(tickLoop); const now = (typeof performance !== 'undefined' && performance.now) ? performance.now() : 0; const dt = 0.016;
    if (heroTick && state) { const need = needClicks(station(), recipe.steps[state.stepIdx]); const p = Math.min(1, state.clicks / need); heroTick(dt, p, false); }
    if (heroGroup) heroGroup.rotation.y = Math.sin(now * 0.0004) * 0.1;
  }
  tickLoop();

  // ---------- điều hướng camera nhìn trạm ----------
  try { controls.target.set(HERO_POS.x, HERO_POS.y + 0.15, HERO_POS.z); } catch {}

  // ---------- start ----------
  const urlId = new URLSearchParams(location.search).get('recipe');
  if (urlId && LESSONS.find(r => r.id === urlId)) startRecipe(LESSONS.find(r => r.id === urlId));
  else if (LESSONS.length) openPicker();
  else toast('Không tải được dữ liệu bài học', 'warn', 4000);
}
