// Bản gốc: `({ submitAttempt } = await import('./js/api.js'))`. Nhưng api.js
// gọi fetch('api/attempts') bằng đường dẫn TƯƠNG ĐỐI → dưới route Next lồng
// (/antibiogram-2d) sẽ trỏ sai thành /antibiogram-2d/api/attempts. Ở đây dùng
// submitAttempt tự chứa POST tuyệt đối /api/attempts (qua proxy sang Express),
// giữ nguyên payload + degrade âm thầm khi guest (401). Không có content nào ở
// đây — chỉ ghi điểm.
async function submitAttempt(payload) {
  try {
    await fetch('/api/attempts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'same-origin',
      body: JSON.stringify(payload),
    });
  } catch (e) { /* scoring optional */ }
}

// Idempotency guard: dưới React (StrictMode dev nạp effect 2 lần) script có thể
// bị inject 2 lần → tránh gắn trùng listener/rAF loop. Bản gốc chạy 1 lần nên
// hành vi không đổi.
if (window.__ABG2D_MOUNTED__) {
  // đã khởi tạo — không làm gì thêm
} else {
  window.__ABG2D_MOUNTED__ = true;

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let W, H, DPR;
function resize() {
  DPR = Math.min(window.devicePixelRatio || 1, 2);
  W = window.innerWidth; H = window.innerHeight;
  canvas.width = W * DPR; canvas.height = H * DPR;
  canvas.style.width = W + 'px'; canvas.style.height = H + 'px';
  ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
}
resize();
window.addEventListener('resize', resize);

// === DATA: antibiotic discs vs E. coli (illustrative CLSI-style breakpoints) ===
// zone = true inhibition-zone diameter (mm); S if zone>=Sbreak; R if zone<=Rbreak; else I.
const DISCS = [
  { code: 'AMP', name: 'Ampicillin',     zone: 11, S: 17, R: 13 }, // R
  { code: 'CIP', name: 'Ciprofloxacin',  zone: 27, S: 21, R: 15 }, // S
  { code: 'GEN', name: 'Gentamicin',     zone: 14, S: 15, R: 12 }, // I
  { code: 'SXT', name: 'Co-trimoxazol',  zone: 22, S: 16, R: 10 }, // S
];
function trueSIR(d) { return d.zone >= d.S ? 'S' : (d.zone <= d.R ? 'R' : 'I'); }
const SIR_NAME = { S: 'Nhạy cảm (S)', I: 'Trung gian (I)', R: 'Đề kháng (R)' };

let state = null;
function newGame() {
  state = {
    step: 1,                 // 1 place · 2 incubate/measure · 3 done
    score: 0,
    placed: [],              // { code, slot } slot index 0..3
    incubated: false,
    incubateStart: null,
    grow: 0,                 // 0..1 zone growth
    selected: null,          // disc code picked from tray
    measuring: null,         // disc code currently measuring
    answered: {},            // code -> chosen SIR
    startedAt: performance.now(), finishedAt: null,
    lawn: null,
  };
  buildBreakpointTable();
  updatePanel();
  document.getElementById('score').textContent = 0;
  document.getElementById('btn-incubate').disabled = true;
  document.getElementById('btn-incubate').textContent = '🌡️ Ủ 35°C · 18h';
}

function buildBreakpointTable() {
  document.querySelector('#bk-table tbody').innerHTML = DISCS.map(d =>
    `<tr><td>${d.code}</td><td>${d.S}</td><td>${d.R}</td></tr>`).join('');
}

// === LAYOUT ===
function layout() {
  const cx = W * 0.42, cy = H * 0.52;
  const r = Math.min(W * 0.34, H * 0.40, 240);
  const scale = (r * 0.86) / 32;            // px per mm (max ~32mm zone fits)
  // 4 disc slots around centre
  const slotPos = [[-0.42,-0.42],[0.42,-0.42],[-0.42,0.42],[0.42,0.42]]
    .map(([dx,dy]) => ({ x: cx + dx*r, y: cy + dy*r }));
  // tray of discs (bottom-left vertical) — only unplaced shown
  const tray = DISCS.map((d,i) => ({ code:d.code, x: 52, y: H*0.30 + i*64, r:20 }));
  return { cx, cy, r, scale, slotPos, tray };
}

// === DRAW ===
function drawDish(L) {
  // outer rim
  ctx.fillStyle = '#0b1220';
  ctx.beginPath(); ctx.arc(L.cx, L.cy, L.r + 14, 0, 7); ctx.fill();
  ctx.strokeStyle = '#475569'; ctx.lineWidth = 4;
  ctx.beginPath(); ctx.arc(L.cx, L.cy, L.r + 12, 0, 7); ctx.stroke();
  // agar
  const g = ctx.createRadialGradient(L.cx - L.r*0.3, L.cy - L.r*0.3, L.r*0.1, L.cx, L.cy, L.r);
  g.addColorStop(0, '#fbe9a0'); g.addColorStop(1, '#e0c878');
  ctx.fillStyle = g;
  ctx.beginPath(); ctx.arc(L.cx, L.cy, L.r, 0, 7); ctx.fill();
}

function zoneRadiusPx(d, L) { return d.zone * L.scale * state.grow * 0.5; }

function drawLawn(L) {
  if (!state.lawn) {
    state.lawn = [];
    for (let i = 0; i < 1400; i++) {
      const a = Math.random() * Math.PI * 2;
      const rad = Math.sqrt(Math.random()) * (L.r - 6);
      state.lawn.push({ x: L.cx + Math.cos(a)*rad, y: L.cy + Math.sin(a)*rad, s: 1 + Math.random()*1.4 });
    }
  }
  if (!state.incubated && state.grow === 0) return; // no growth yet → clean agar
  // zones (clear circles = no bacteria)
  const zones = state.placed.map(p => {
    const d = DISCS.find(x => x.code === p.code); const s = L.slotPos[p.slot];
    return { x:s.x, y:s.y, r: zoneRadiusPx(d, L) };
  });
  // bacterial lawn dots, skipping inside any zone
  ctx.fillStyle = 'rgba(120,113,108,0.55)';
  for (const pt of state.lawn) {
    let inZone = false;
    for (const z of zones) { if (Math.hypot(pt.x - z.x, pt.y - z.y) < z.r) { inZone = true; break; } }
    if (inZone) continue;
    ctx.beginPath(); ctx.arc(pt.x, pt.y, pt.s, 0, 7); ctx.fill();
  }
  // faint clear-zone shading
  for (const z of zones) {
    if (z.r <= 0) continue;
    ctx.fillStyle = 'rgba(251,233,160,0.5)';
    ctx.beginPath(); ctx.arc(z.x, z.y, z.r, 0, 7); ctx.fill();
    ctx.strokeStyle = 'rgba(34,197,94,0.45)'; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.arc(z.x, z.y, z.r, 0, 7); ctx.stroke();
  }
}

function drawDiscs(L) {
  for (const p of state.placed) {
    const s = L.slotPos[p.slot];
    const measuring = state.measuring === p.code;
    ctx.fillStyle = '#f8fafc';
    ctx.beginPath(); ctx.arc(s.x, s.y, 13, 0, 7); ctx.fill();
    ctx.strokeStyle = measuring ? '#fbbf24' : '#94a3b8'; ctx.lineWidth = measuring ? 3 : 1.5;
    ctx.beginPath(); ctx.arc(s.x, s.y, 13, 0, 7); ctx.stroke();
    ctx.fillStyle = '#1e293b'; ctx.font = 'bold 10px Inter'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText(p.code, s.x, s.y);
  }
  ctx.textBaseline = 'alphabetic';
}

function drawRuler(L) {
  if (!state.measuring) return;
  const p = state.placed.find(p => p.code === state.measuring); if (!p) return;
  const d = DISCS.find(x => x.code === state.measuring);
  const s = L.slotPos[p.slot];
  const rPx = zoneRadiusPx(d, L);
  // diameter line
  ctx.strokeStyle = '#fbbf24'; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(s.x - rPx, s.y); ctx.lineTo(s.x + rPx, s.y); ctx.stroke();
  for (const sx of [-rPx, rPx]) { ctx.beginPath(); ctx.moveTo(s.x + sx, s.y - 6); ctx.lineTo(s.x + sx, s.y + 6); ctx.stroke(); }
  // readout
  const mm = Math.round(d.zone);
  ctx.fillStyle = '#fbbf24'; ctx.font = 'bold 13px Inter'; ctx.textAlign = 'center';
  ctx.fillText(`${mm} mm`, s.x, s.y - rPx - 8);
}

function drawTray(L) {
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  for (const t of L.tray) {
    const isPlaced = state.placed.some(p => p.code === t.code);
    if (isPlaced) continue;
    const sel = state.selected === t.code;
    ctx.fillStyle = sel ? '#fde68a' : '#f8fafc';
    ctx.beginPath(); ctx.arc(t.x, t.y, t.r, 0, 7); ctx.fill();
    ctx.strokeStyle = sel ? '#f59e0b' : '#94a3b8'; ctx.lineWidth = sel ? 3 : 1.5;
    ctx.beginPath(); ctx.arc(t.x, t.y, t.r, 0, 7); ctx.stroke();
    ctx.fillStyle = '#1e293b'; ctx.font = 'bold 11px Inter';
    ctx.fillText(t.code, t.x, t.y);
  }
  ctx.textBaseline = 'alphabetic';
  if (state.step === 1) {
    ctx.fillStyle = 'rgba(148,163,184,0.85)'; ctx.font = '12px Inter'; ctx.textAlign = 'center';
    ctx.fillText('Khay khoanh KS', 52, H*0.30 - 34);
  }
}

function draw() {
  ctx.fillStyle = '#0f172a'; ctx.fillRect(0, 0, W, H);
  const L = layout();
  drawDish(L);
  drawLawn(L);
  drawDiscs(L);
  drawRuler(L);
  drawTray(L);
}

// === INTERACTION ===
function pos(e) {
  const rect = canvas.getBoundingClientRect();
  return { x: (e.clientX ?? e.touches?.[0]?.clientX) - rect.left, y: (e.clientY ?? e.touches?.[0]?.clientY) - rect.top };
}
function onClick(e) {
  const { x, y } = pos(e); const L = layout();
  if (state.step === 1) {
    // pick from tray
    for (const t of L.tray) {
      if (state.placed.some(p => p.code === t.code)) continue;
      if (Math.hypot(x - t.x, y - t.y) < t.r + 4) { state.selected = t.code; setHint(`Đặt khoanh ${t.code} vào 1 vị trí trống trên đĩa`); return; }
    }
    // place on dish
    if (state.selected && Math.hypot(x - L.cx, y - L.cy) < L.r) {
      // nearest free slot
      let best = -1, bd = 1e9;
      L.slotPos.forEach((s, i) => { if (state.placed.some(p => p.slot === i)) return; const dd = Math.hypot(x - s.x, y - s.y); if (dd < bd) { bd = dd; best = i; } });
      if (best < 0) return;
      state.placed.push({ code: state.selected, slot: best });
      toast(`✓ Đặt khoanh ${state.selected}`, 'ok');
      state.selected = null;
      if (state.placed.length >= 4) {
        document.getElementById('btn-incubate').disabled = false;
        setHint('Đã đủ 4 khoanh — bấm "Ủ 35°C · 18h"');
      } else setHint('Chọn khoanh kháng sinh tiếp theo');
      updatePanel();
    }
    return;
  }
  if (state.step === 2 && state.incubated && state.grow >= 1) {
    // click a disc to measure & classify
    for (const p of state.placed) {
      const s = L.slotPos[p.slot];
      if (Math.hypot(x - s.x, y - s.y) < 16) {
        if (state.answered[p.code]) { toast(`KS ${p.code} đã phân loại`, 'err'); return; }
        state.measuring = p.code;
        const d = DISCS.find(x => x.code === p.code);
        setHint(`Vòng vô khuẩn ${p.code} = ${Math.round(d.zone)} mm — phân loại S / I / R?`);
        updatePanel();
        return;
      }
    }
  }
}
canvas.addEventListener('click', onClick);
canvas.addEventListener('touchend', (e) => { e.preventDefault(); onClick(e.changedTouches[0]); }, { passive: false });

// === PANEL / BUTTONS ===
const btnIncubate = document.getElementById('btn-incubate');
const btnRestart = document.getElementById('btn-restart');
btnIncubate.addEventListener('click', () => {
  if (state.placed.length < 4 || state.incubated) return;
  state.incubated = true; state.step = 2; state.incubateStart = performance.now();
  btnIncubate.disabled = true; btnIncubate.textContent = '⏳ Đang ủ...';
  setHint('Quan sát vòng vô khuẩn hình thành quanh các khoanh...');
  updatePanel();
});
btnRestart.addEventListener('click', newGame);

function classify(choice) {
  const code = state.measuring; if (!code) return;
  const d = DISCS.find(x => x.code === code);
  const correct = trueSIR(d);
  state.answered[code] = choice;
  if (choice === correct) { state.score += 18; toast(`🎯 ${code}: đúng — ${SIR_NAME[correct]} (+18)`, 'ok'); }
  else { toast(`✗ ${code}: sai. Vòng ${Math.round(d.zone)}mm → ${SIR_NAME[correct]}`, 'err'); }
  document.getElementById('score').textContent = state.score;
  state.measuring = null;
  if (Object.keys(state.answered).length >= 4) finishGame();
  else { setHint('Bấm vào khoanh kháng sinh khác để đo & phân loại'); updatePanel(); }
}

function updatePanel() {
  const hint = document.getElementById('panel-hint');
  // remove old SIR buttons
  panel.querySelectorAll('.sir').forEach(b => b.remove());
  document.getElementById('step-pill').textContent =
    state.step === 1 ? `Đặt khoanh (${state.placed.length}/4)` : (state.grow < 1 ? 'Đang ủ...' : `Phân loại (${Object.keys(state.answered).length}/4)`);
  if (state.measuring) {
    hint.textContent = `Khoanh ${state.measuring}: phân loại`;
    ['S','I','R'].forEach(c => {
      const b = document.createElement('button'); b.className = 'sir ' + c; b.textContent = c;
      b.addEventListener('click', () => classify(c));
      panel.insertBefore(b, btnIncubate);
    });
  }
}
const panel = document.getElementById('panel');
function setHint(t) { document.getElementById('hint-text').textContent = t; }

// === LOOP ===
function tick() {
  if (state.incubated && state.grow < 1) {
    state.grow = Math.min(1, (performance.now() - state.incubateStart) / 2200);
    if (state.grow >= 1) { setHint('Bấm vào từng khoanh KS để đo vòng & phân loại S/I/R'); updatePanel(); }
  }
  draw();
  requestAnimationFrame(tick);
}

async function finishGame() {
  state.finishedAt = performance.now();
  const durationMs = Math.round(state.finishedAt - state.startedAt);
  const correctCount = DISCS.filter(d => state.answered[d.code] === trueSIR(d)).length;
  setHint('Hoàn thành!');
  try {
    await submitAttempt({ version: 'antibiogram-2d', score: state.score, correct: correctCount, total: 4, durationMs,
      details: { results: DISCS.map(d => ({ code: d.code, zone: d.zone, true: trueSIR(d), chosen: state.answered[d.code] })) } });
  } catch (e) {}
  document.getElementById('modal-score').textContent = state.score;
  const rows = DISCS.map(d => {
    const ok = state.answered[d.code] === trueSIR(d);
    return `<div class="row"><span>${d.code} · ${d.name} — ${Math.round(d.zone)}mm</span><b style="color:${ok?'#34d399':'#f87171'}">${state.answered[d.code]||'–'} ${ok?'✓':'✗ ('+trueSIR(d)+')'}</b></div>`;
  });
  document.getElementById('modal-details').innerHTML = rows.join('') +
    `<div class="row"><span>Phân loại đúng</span><b>${correctCount}/4</b></div>`;
  document.getElementById('modal-title').textContent = correctCount === 4 ? '🏆 Xuất sắc! Kháng sinh đồ chuẩn' : '🎉 Hoàn thành kháng sinh đồ';
  document.getElementById('modal').classList.add('show');
}
document.getElementById('modal-replay').addEventListener('click', () => { document.getElementById('modal').classList.remove('show'); newGame(); });

newGame();
tick();

// Optional auto-play (verification / showcase): ?auto=1 plays a correct run.
if (new URLSearchParams(location.search).has('auto')) {
  setTimeout(() => {
    DISCS.forEach((d, i) => state.placed.push({ code: d.code, slot: i }));
    updatePanel();
    btnIncubate.disabled = false; btnIncubate.click();
    const iv = setInterval(() => {
      if (state.grow >= 1) { clearInterval(iv);
        DISCS.forEach(d => { state.measuring = d.code; classify(trueSIR(d)); });
      }
    }, 150);
  }, 400);
}

} // end idempotency guard
