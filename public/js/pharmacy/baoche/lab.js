// ============================================================
// Phòng Bào chế — engine thực hành theo giáo trình DUOC 04.
// Procedure-driven: mỗi BƯỚC = 1 "trạm hero" 3D (thiết bị + animation +
// cổng tiến độ), bám cột "Các bước / Ý nghĩa / Tiêu chuẩn đạt được".
// Dữ liệu: /api/content/baoche-lessons (schema v2). Không hardcode.
// ============================================================
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { submitAttempt, getPlayerName } from '../../api.js';
import { sfx } from '../../sfx.js';
import { showWelcomeCard } from '../../welcome-card.js';
import { STATIONS, buildApparatus, buildLabRoom } from './stations.js?v=7';

const $ = (s) => document.querySelector(s);
const modalRoot = $('#modal-root');

// ---------- Load dataset ----------
const LESSONS = await fetch('/api/content/baoche-lessons', { credentials: 'same-origin' })
  .then(r => r.ok ? r.json() : { items: [] }).then(j => j.items || []).catch(() => []);

if (!LESSONS.length) {
  $('#tb-lesson').textContent = 'Không tải được dữ liệu bài học';
}

// ---------- Scene ----------
const canvas = $('#c');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
renderer.setSize(innerWidth, innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.05;

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x0e1626);
scene.fog = new THREE.Fog(0x0e1626, 7, 18);
// PBR reflections cho thuỷ tinh/kim loại
const pmrem = new THREE.PMREMGenerator(renderer);
scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;

const camera = new THREE.PerspectiveCamera(46, innerWidth / innerHeight, 0.05, 100);
camera.position.set(0, 1.15, 2.35);

const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 0.72, 0);
controls.enablePan = false;
controls.minDistance = 1.2;
controls.maxDistance = 4;
controls.maxPolarAngle = Math.PI * 0.52;
controls.enableDamping = true;
controls.dampingFactor = 0.08;

// Lights — key ấm + fill lạnh + rim
scene.add(new THREE.HemisphereLight(0xc8dbff, 0x1a2130, 0.75));
const key = new THREE.DirectionalLight(0xfff2e0, 1.2);
key.position.set(2.6, 5.5, 3.4); key.castShadow = true;
key.shadow.mapSize.set(2048, 2048);
key.shadow.camera.near = 1; key.shadow.camera.far = 20;
key.shadow.camera.left = -3; key.shadow.camera.right = 3; key.shadow.camera.top = 3; key.shadow.camera.bottom = -3;
key.shadow.bias = -0.0004; key.shadow.normalBias = 0.02;
scene.add(key);
const fill = new THREE.DirectionalLight(0x9fc0ff, 0.35); fill.position.set(-3, 3, 2); scene.add(fill);
const rim = new THREE.DirectionalLight(0xbfe0ff, 0.5); rim.position.set(-1.5, 2.5, -3); scene.add(rim);
const heroSpot = new THREE.SpotLight(0xffffff, 0, 8, Math.PI / 5, 0.45, 1.3);
heroSpot.position.set(0.3, 3.2, 1.1); heroSpot.target.position.set(0, 0.85, 0);
heroSpot.castShadow = true; heroSpot.shadow.mapSize.set(1024, 1024); heroSpot.shadow.bias = -0.0005;
scene.add(heroSpot); scene.add(heroSpot.target);

// Phòng lab (kệ hoá chất, tủ, sàn gạch) — dựng trong stations.js để tách bạch
buildLabRoom(THREE, scene);

// ---------- Runtime state ----------
let recipe = null;
let state = null;
let heroGroup = null;   // current apparatus THREE.Group
let heroTick = null;    // fn(dt, progress, justClicked)

const HERO_Y = 0.74;

function clearHero() {
  if (heroGroup) { scene.remove(heroGroup); disposeTree(heroGroup); heroGroup = null; heroTick = null; }
}
function disposeTree(obj) {
  obj.traverse(o => { if (o.geometry) o.geometry.dispose(); if (o.material) { const m = o.material; (Array.isArray(m) ? m : [m]).forEach(x => x.dispose()); } });
}

// ---------- Toast ----------
const toastEl = $('#toast');
let toastT = null;
function toast(msg, type = '', ms = 1900) {
  toastEl.textContent = msg; toastEl.className = type; toastEl.style.display = 'block';
  clearTimeout(toastT); toastT = setTimeout(() => toastEl.style.display = 'none', ms);
}

// ============================================================
// Recipe / step lifecycle
// ============================================================
function startRecipe(r) {
  recipe = r;
  state = {
    stepIdx: 0,
    clicks: 0,
    stepDone: new Array(r.steps.length).fill(false),
    errors: 0,
    startedAt: Date.now(),
    roleScore: 0, roleMax: (r.components || []).length,
    qualityScore: 0, qualityMax: (r.quality || []).length,
    pedagogyDone: false,
  };
  $('#tb-lesson').innerHTML = `Bài ${r.lesson}: <b>${r.lessonTitle || r.name}</b> — ${r.name}`;
  $('#lvl-pill').textContent = r.methodName || r.method;
  $('#lvl-pill').classList.remove('hidden');
  renderRecipePanel();
  renderEquipHint();
  $('#recipe').classList.remove('hidden');
  $('#equip-hint').classList.remove('hidden');
  $('#step').classList.remove('hidden');
  // Pedagogy gate 1: phân tích công thức trước khi thao tác
  if (state.roleMax > 0) openRoleMatch(); else { state.pedagogyDone = true; renderStep(); }
}

function renderRecipePanel() {
  const r = recipe;
  let h = `<h3>${r.icon || '🧪'} ${r.name}</h3><div class="sub">${r.short || ''}</div>`;
  h += `<span class="method">${r.methodName || r.method}</span>`;
  h += `<div class="lbl">Công thức</div><ul>`;
  for (const f of (r.formula || [])) {
    h += `<div class="frow"><span>${f.name}</span><b>${f.amount || ''} ${f.unit || ''}</b></div>`;
  }
  h += `</ul>`;
  h += `<div class="lbl">Yêu cầu chất lượng</div>`;
  for (const q of (r.quality || [])) h += `<div class="qitem">${q}</div>`;
  if (r.indication) h += `<div class="lbl">Chỉ định</div><div style="font-size:12px;opacity:.85">${r.indication}</div>`;
  $('#recipe').innerHTML = h;
}

function renderEquipHint() {
  const seen = [];
  for (const s of recipe.steps) { const st = STATIONS[s.action] || STATIONS._default; if (!seen.find(x => x.key === st.key)) seen.push(st); }
  let h = `<div class="lbl">Thiết bị bài này</div>`;
  for (const st of seen) h += `<div class="eq" data-key="${st.key}"><span class="dot"></span>${st.icon} ${st.equipName}</div>`;
  $('#equip-hint').innerHTML = h;
}

function currentStation() {
  const s = recipe.steps[state.stepIdx];
  return STATIONS[s.action] || STATIONS._default;
}

function renderRail() {
  const rail = $('#step-rail');
  rail.innerHTML = recipe.steps.map((s, i) => {
    const cls = state.stepDone[i] ? 'done' : (i === state.stepIdx ? 'cur' : '');
    const label = (STATIONS[s.action] || STATIONS._default).icon;
    return `<div class="sdot ${cls}" title="Bước ${i + 1}: ${(s.label || '').replace(/"/g, '&quot;')}">${state.stepDone[i] ? '✓' : (i + 1)}</div>`;
  }).join('');
}

function renderStep() {
  const i = state.stepIdx;
  const submitBtn = $('#submit-btn');
  const actBtn = $('#act-btn');
  if (i >= recipe.steps.length) {
    // all steps done → quality check gate
    renderRail();
    $('#step-num').textContent = 'HOÀN TẤT QUY TRÌNH';
    $('#step-title').textContent = '🎉 Đã thực hiện xong các bước!';
    $('#step-why').textContent = 'Kiểm tra chất lượng thành phẩm rồi nộp bài.';
    $('#step-std').textContent = '';
    $('#meter-bar').style.width = '100%';
    $('#step-frac').textContent = `${recipe.steps.length}/${recipe.steps.length}`;
    actBtn.textContent = '🔍 Kiểm tra chất lượng thành phẩm';
    actBtn.classList.add('done');
    actBtn.onclick = () => { if (state.qualityMax > 0) openQualityCheck(); else finishAndSubmit(); };
    clearHero();
    heroSpot.intensity = 0;
    return;
  }
  const s = recipe.steps[i];
  const st = currentStation();
  state.clicks = 0;
  renderRail();
  $('#step-num').textContent = `BƯỚC ${i + 1} / ${recipe.steps.length}`;
  $('#step-title').textContent = s.label;
  $('#step-why').textContent = s.purpose ? `Ý nghĩa: ${s.purpose}` : '';
  $('#step-std').innerHTML = s.standard ? `<b>Tiêu chuẩn:</b> ${s.standard}` : '';
  $('#meter-bar').style.width = '0%';
  $('#step-frac').textContent = `${i + 1}/${recipe.steps.length}`;
  $('#step-hint').textContent = st.hint(s);
  actBtn.classList.remove('done');
  actBtn.disabled = false;
  actBtn.textContent = `${st.icon} ${st.verb(s)}`;
  actBtn.onclick = doAction;
  // highlight equip hint
  document.querySelectorAll('#equip-hint .eq').forEach(e => e.classList.toggle('on', e.dataset.key === st.key));
  // build hero apparatus
  clearHero();
  const built = buildApparatus(st.key, THREE, s, recipe);
  heroGroup = built.group;
  heroGroup.position.y = HERO_Y;
  heroTick = built.tick;
  scene.add(heroGroup);
  heroSpot.intensity = 1.4;
  // frame camera softly
  controls.target.set(0, 0.95, 0);
}

function stepClicksNeeded(st, s) {
  return st.clicks(s);
}

function doAction() {
  const i = state.stepIdx;
  if (state.advancing || state.stepDone[i]) return; // chống double-advance khi click nhanh
  const s = recipe.steps[i];
  const st = currentStation();
  const need = stepClicksNeeded(st, s);
  state.clicks++;
  const p = Math.min(1, state.clicks / need);
  $('#meter-bar').style.width = (p * 100).toFixed(0) + '%';
  if (heroTick) heroTick(0, p, true);
  st.onClick && st.onClick(s, state, toast);
  try { sfx.tick(); } catch {}
  if (state.clicks >= need) {
    state.stepDone[i] = true;
    state.advancing = true;
    $('#act-btn').disabled = true;
    try { sfx.correct(); } catch {}
    toast(`✅ ${s.standard ? s.standard.split('.')[0] : 'Đạt bước ' + (i + 1)}`, 'ok', 1600);
    setTimeout(() => { state.advancing = false; $('#act-btn').disabled = false; advance(); }, 550);
  } else {
    $('#step-hint').textContent = st.progressHint ? st.progressHint(s, p) : `Tiếp tục… ${(p * 100).toFixed(0)}%`;
  }
}

function advance() {
  let i = state.stepIdx + 1;
  while (i < recipe.steps.length && state.stepDone[i]) i++;
  state.stepIdx = i;
  renderStep();
}

// ============================================================
// Pedagogy 1 — Phân tích công thức (ghép vai trò thành phần)
// ============================================================
function openRoleMatch() {
  const comps = recipe.components || [];
  // xáo vai trò bằng Fisher–Yates (đảm bảo hoán vị, không trùng)
  const shuffled = comps.map(c => ({ role: c.role, characteristic: c.characteristic, name: c.name }));
  for (let i = shuffled.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]; }
  let selName = null;
  const matched = {};
  const html = `
    <div class="modal"><div class="card">
      <h2>📖 Phân tích công thức — ${recipe.name}</h2>
      <div class="desc">Ghép mỗi <b>thành phần</b> với <b>vai trò</b> đúng của nó trong công thức. Hiểu vai trò trước khi bào chế.</div>
      <div class="match-wrap">
        <div class="match-col"><div class="mh">Thành phần</div><div id="col-names"></div></div>
        <div class="match-col"><div class="mh">Vai trò</div><div id="col-roles"></div></div>
      </div>
      <div class="row-btns">
        <span id="match-count" style="align-self:center;opacity:.7;font-size:13px"></span>
        <button class="btn" id="match-skip" style="background:transparent;border:1px solid var(--border);color:#fff">Bỏ qua</button>
      </div>
    </div></div>`;
  modalRoot.innerHTML = html;
  const colN = $('#col-names'), colR = $('#col-roles');
  comps.forEach((c, idx) => {
    const el = document.createElement('div'); el.className = 'chip'; el.dataset.name = c.name;
    el.innerHTML = `${c.name}${c.characteristic ? `<small>${c.characteristic}</small>` : ''}`;
    el.onclick = () => { if (matched[c.name]) return; colN.querySelectorAll('.chip').forEach(x => x.classList.remove('sel')); el.classList.add('sel'); selName = c.name; };
    colN.appendChild(el);
  });
  shuffled.forEach((r) => {
    const el = document.createElement('div'); el.className = 'chip role'; el.dataset.role = r.name;
    el.innerHTML = r.role;
    el.onclick = () => {
      if (!selName) { toast('Chọn thành phần bên trái trước', 'warn'); return; }
      const correct = (r.name === selName);
      if (correct) {
        matched[selName] = true; state.roleScore++;
        colN.querySelector(`.chip[data-name="${cssEsc(selName)}"]`)?.classList.add('matched');
        el.classList.add('matched');
        toast('✔ Đúng vai trò', 'ok', 1100);
      } else {
        state.errors++;
        toast('✗ Chưa đúng — thử lại', 'warn', 1200);
      }
      selName = null;
      colN.querySelectorAll('.chip').forEach(x => x.classList.remove('sel'));
      $('#match-count').textContent = `${state.roleScore}/${state.roleMax} đúng`;
      if (state.roleScore >= state.roleMax) { setTimeout(closeRoleMatch, 700); }
    };
    colR.appendChild(el);
  });
  $('#match-count').textContent = `0/${state.roleMax} đúng`;
  $('#match-skip').onclick = closeRoleMatch;
}
function closeRoleMatch() {
  modalRoot.innerHTML = '';
  state.pedagogyDone = true;
  renderStep();
}
function cssEsc(s) { return String(s).replace(/"/g, '\\"'); }

// ============================================================
// Pedagogy 2 — Kiểm tra chất lượng thành phẩm
// ============================================================
function openQualityCheck() {
  const qs = recipe.quality || [];
  const checked = new Set();
  let h = `<div class="modal"><div class="card">
    <h2>🔍 Kiểm tra chất lượng — ${recipe.name}</h2>
    <div class="desc">Đối chiếu thành phẩm với các tiêu chuẩn của giáo trình. Đánh dấu tiêu chuẩn đã đạt (quan sát cảm quan).</div>
    <div id="qlist"></div>
    <div class="row-btns"><button class="btn" id="q-done">Xác nhận &amp; Nộp bài</button></div>
  </div></div>`;
  modalRoot.innerHTML = h;
  const list = $('#qlist');
  qs.forEach((q, idx) => {
    const el = document.createElement('div'); el.className = 'qcheck';
    el.innerHTML = `<div class="box"></div><div>${q}</div>`;
    el.onclick = () => {
      if (checked.has(idx)) { checked.delete(idx); el.classList.remove('on'); el.querySelector('.box').textContent = ''; }
      else { checked.add(idx); el.classList.add('on'); el.querySelector('.box').textContent = '✓'; }
    };
    list.appendChild(el);
  });
  $('#q-done').onclick = () => { state.qualityScore = checked.size; modalRoot.innerHTML = ''; finishAndSubmit(); };
}

// ============================================================
// Scoring + submit
// ============================================================
function computeScore() {
  const stepsDone = state.stepDone.filter(Boolean).length;
  const stepPart = recipe.steps.length ? stepsDone / recipe.steps.length : 1;      // 0..1
  const rolePart = state.roleMax ? state.roleScore / state.roleMax : 1;            // 0..1
  const qualPart = state.qualityMax ? state.qualityScore / state.qualityMax : 1;   // 0..1
  // weight: quy trình 60%, phân tích 20%, chất lượng 20%
  let raw = stepPart * 0.6 + rolePart * 0.2 + qualPart * 0.2;
  raw = Math.max(0, raw - Math.min(0.15, state.errors * 0.01));
  return Math.round(raw * 100);
}

async function finishAndSubmit() {
  const score = computeScore();
  markDone(recipe.id);
  const durationSec = Math.round((Date.now() - state.startedAt) / 1000);
  const res = await submitAttempt({
    subject: 'bao-che',
    activity: 'bao-che-lab',
    activityId: recipe.id,
    lesson: recipe.lesson,
    score,
    maxScore: 100,
    correct: state.stepDone.filter(Boolean).length,
    total: recipe.steps.length,
    durationSec,
    meta: { method: recipe.method, form: recipe.form, roleScore: state.roleScore, qualityScore: state.qualityScore, errors: state.errors },
  });
  showResult(score, res);
}

function showResult(score, res) {
  try { sfx.perfect(); } catch {}
  const saved = res ? '✅ Đã lưu điểm' : '⚠️ Chưa đăng nhập — điểm không được lưu';
  const stepsDone = state.stepDone.filter(Boolean).length;
  modalRoot.innerHTML = `<div class="modal"><div class="card" style="max-width:460px;text-align:center">
    <h2>Kết quả — ${recipe.name}</h2>
    <div class="score-big">${score}</div>
    <div style="opacity:.8;font-size:13px;margin:4px 0 14px">${saved}</div>
    <div style="text-align:left;font-size:13px;line-height:1.9;background:rgba(255,255,255,.04);border:1px solid var(--border);border-radius:10px;padding:12px">
      <div>Quy trình: <b>${stepsDone}/${recipe.steps.length}</b> bước</div>
      <div>Phân tích thành phần: <b>${state.roleScore}/${state.roleMax}</b></div>
      <div>Kiểm tra chất lượng: <b>${state.qualityScore}/${state.qualityMax}</b></div>
      <div>Lỗi thao tác: <b>${state.errors}</b></div>
    </div>
    <details style="margin-top:14px;text-align:left">
      <summary style="cursor:pointer;font-size:13px;opacity:.85;font-weight:700">📋 Xem lại quy trình (${recipe.steps.length} bước)</summary>
      <div style="margin-top:8px;font-size:12px;line-height:1.5;max-height:220px;overflow:auto">
        ${recipe.steps.map((s, i) => `<div style="padding:6px 0;border-bottom:1px solid rgba(255,255,255,.06)">
          <b style="color:var(--accent2)">${state.stepDone[i] ? '✓' : '○'} B${i + 1}.</b> ${s.label}
          ${s.standard ? `<div style="opacity:.6;padding-left:20px">→ ${s.standard}</div>` : ''}</div>`).join('')}
      </div>
    </details>
    <div class="row-btns" style="justify-content:center;margin-top:18px;flex-wrap:wrap">
      <button class="btn ghost" id="r-again">Làm lại</button>
      <button class="btn ghost" id="r-pick">Chọn bài khác</button>
      ${nextRecipe() ? `<button class="btn" id="r-next">Bài tiếp: ${nextRecipe().name} →</button>` : ''}
    </div>
  </div></div>`;
  $('#r-again').onclick = () => { modalRoot.innerHTML = ''; startRecipe(recipe); };
  $('#r-pick').onclick = openPicker;
  const nx = $('#r-next'); if (nx) nx.onclick = () => { modalRoot.innerHTML = ''; startRecipe(nextRecipe()); };
}

function nextRecipe() {
  const idx = LESSONS.findIndex(r => r.id === recipe.id);
  return idx >= 0 && idx < LESSONS.length - 1 ? LESSONS[idx + 1] : null;
}

// ============================================================
// Lesson picker
// ============================================================
function openPicker() {
  const done = getDone();
  const byLesson = {};
  for (const r of LESSONS) (byLesson[r.lesson] ??= []).push(r);
  const lessonTitles = {};
  for (const r of LESSONS) lessonTitles[r.lesson] = r.lessonTitle || '';
  const doneCount = LESSONS.filter(r => done.has(r.id)).length;
  let h = `<div class="modal"><div class="card">
    <h2>🧪 Phòng Bào chế — chọn bài thực hành</h2>
    <div class="desc">12 bài theo giáo trình <b>Thực hành Bào chế</b> (DUOC 04). Mỗi bài: phân tích công thức → thao tác 3D đúng quy trình → kiểm chất lượng. <b>Đã hoàn thành ${doneCount}/${LESSONS.length}.</b></div>
    <div id="pbody"></div></div></div>`;
  modalRoot.innerHTML = h;
  const body = $('#pbody');
  for (const L of Object.keys(byLesson).sort((a, b) => a - b)) {
    const head = document.createElement('div');
    head.style.cssText = 'font-size:12px;font-weight:800;color:var(--accent);text-transform:uppercase;letter-spacing:.5px;margin:16px 0 8px';
    head.textContent = `Bài ${L} — ${lessonTitles[L]}`;
    body.appendChild(head);
    const grid = document.createElement('div'); grid.className = 'lgrid'; grid.id = L === '1' ? 'pgrid' : '';
    for (const r of byLesson[L]) {
      const el = document.createElement('div'); el.className = 'lcard';
      const check = done.has(r.id) ? '<span style="float:right;color:var(--accent2)">✓ đã xong</span>' : '';
      el.innerHTML = `<div class="ic">${r.icon || '🧪'}${check}</div><div class="nm">${r.name}</div>
        <div class="mt">${r.steps.length} bước · ${(r.components || []).length} thành phần</div>
        <span class="badge">${r.methodName || r.method}</span>`;
      el.onclick = () => { modalRoot.innerHTML = ''; startRecipe(r); };
      grid.appendChild(el);
    }
    body.appendChild(grid);
  }
}

// ---------- mobile panel toggles ----------
$('#tg-recipe')?.addEventListener('click', () => { $('#recipe').classList.toggle('show'); $('#equip-hint').classList.remove('show'); });
$('#tg-equip')?.addEventListener('click', () => { $('#equip-hint').classList.toggle('show'); $('#recipe').classList.remove('show'); });

// ---------- tiến độ hoàn thành (localStorage) ----------
const DONE_KEY = 'tizia:baoche:done';
function getDone() { try { return new Set(JSON.parse(localStorage.getItem(DONE_KEY) || '[]')); } catch { return new Set(); } }
function markDone(id) { const s = getDone(); s.add(id); try { localStorage.setItem(DONE_KEY, JSON.stringify([...s])); } catch {} }

// ---------- welcome card (1 lần) ----------
showWelcomeCard({
  icon: '🧪',
  title: 'Phòng Bào chế — thực hành theo giáo trình',
  intro: 'Mỗi bài mô phỏng đúng quy trình bào chế: phân tích công thức → thao tác 3D từng bước → kiểm tra chất lượng thành phẩm.',
  bullets: [
    'Đọc công thức + yêu cầu chất lượng (bảng bên trái) trước khi làm.',
    'Mỗi bước có một thiết bị 3D — bấm nút thao tác (hoặc bấm thẳng vào thiết bị) đến khi đủ tiến độ.',
    'Ghép đúng vai trò thành phần (đầu bài) và đánh dấu tiêu chuẩn đạt (cuối bài) để được điểm cao.',
    'Kéo chuột để xoay · cuộn để phóng to.',
  ],
  tip: 'Điểm = quy trình 60% + phân tích thành phần 20% + kiểm chất lượng 20%.',
  persistKey: 'tizia:welcome:bao-che-lab',
  dismissLabel: 'Bắt đầu',
});

// ---------- init selection ----------
const urlId = new URLSearchParams(location.search).get('recipe');
if (urlId && LESSONS.find(r => r.id === urlId)) startRecipe(LESSONS.find(r => r.id === urlId));
else if (LESSONS.length) openPicker();

// ---------- click / hover trực tiếp lên thiết bị 3D ----------
const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();
let heroHover = false;
function hitHero(e) {
  if (!heroGroup) return false;
  pointer.x = (e.clientX / innerWidth) * 2 - 1; pointer.y = -(e.clientY / innerHeight) * 2 + 1;
  raycaster.setFromCamera(pointer, camera);
  return raycaster.intersectObject(heroGroup, true).length > 0;
}
let downXY = null;
renderer.domElement.addEventListener('pointerdown', (e) => { downXY = [e.clientX, e.clientY]; });
renderer.domElement.addEventListener('pointerup', (e) => {
  if (!downXY) return;
  const moved = Math.hypot(e.clientX - downXY[0], e.clientY - downXY[1]);
  downXY = null;
  if (moved > 6) return;                 // kéo xoay camera → bỏ qua
  if (!state || state.stepIdx >= (recipe?.steps.length ?? 0)) return;
  const act = $('#act-btn');
  if (act && !act.disabled && hitHero(e)) doAction();
});
renderer.domElement.addEventListener('pointermove', (e) => {
  heroHover = hitHero(e);
  renderer.domElement.style.cursor = heroHover ? 'pointer' : 'default';
});

// ---------- bàn phím: Enter/Space thao tác bước hiện tại ----------
addEventListener('keydown', (e) => {
  if (e.key !== 'Enter' && e.key !== ' ') return;
  if (/input|textarea/i.test(document.activeElement?.tagName || '')) return;
  if (modalRoot.querySelector('.modal')) return;      // đang mở modal → nhường
  const act = $('#act-btn');
  if (act && !act.disabled && state && state.stepIdx < (recipe?.steps.length ?? 0)) { e.preventDefault(); doAction(); }
});

// ---------- render loop ----------
const clock = new THREE.Clock();
function animate() {
  requestAnimationFrame(animate);
  const dt = Math.min(0.05, clock.getDelta());
  controls.update();
  if (heroTick) {
    const need = state ? stepClicksNeeded(currentStation(), recipe.steps[state.stepIdx]) : 1;
    const p = state ? Math.min(1, state.clicks / need) : 0;
    heroTick(dt, p, false);
  }
  if (heroGroup) {
    const targetS = heroHover ? 1.05 : 1;
    heroGroup.scale.x += (targetS - heroGroup.scale.x) * 0.15;
    heroGroup.scale.y = heroGroup.scale.z = heroGroup.scale.x;
    heroGroup.rotation.y = Math.sin(clock.elapsedTime * 0.4) * 0.1; // đung đưa nhẹ để lộ khối 3D, giữ mặt trước
  }
  renderer.render(scene, camera);
}
animate();

addEventListener('resize', () => {
  camera.aspect = innerWidth / innerHeight; camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight);
});
