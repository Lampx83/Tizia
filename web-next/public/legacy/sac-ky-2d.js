import { submitAttempt, getPlayerName } from '/js/api.js';

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

// === GAME STATE ===
const SAMPLES = [
  { id: 'A', color: '#ef4444', name: 'Mẫu A', trueRf: 0.30 },
  { id: 'B', color: '#3b82f6', name: 'Mẫu B', trueRf: 0.55 },
  { id: 'C', color: '#22c55e', name: 'Mẫu C', trueRf: 0.78 },
];
const TOTAL_STEPS = 6;
let state = null;
function newGame() {
  state = {
    step: 1,
    score: 0,
    startedAt: performance.now(),
    finishedAt: null,
    capillary: null,    // null | 'A' | 'B' | 'C'
    plateSpots: [],     // { sampleId, x:0..1 along origin line }
    chamberFilled: false,
    plateInChamber: false,
    devProgress: 0,     // 0..1 solvent rise progress
    devStartTime: null,
    plateRemoved: false,
    measurements: {},   // { A: rf, B: rf, C: rf } guesses
    measuringSpot: null, // which sample being measured
    stepErrors: 0,
  };
  updateUI();
}

// === COORDINATES (layout) ===
function layout() {
  const cx = W / 2;
  const cy = H / 2;
  const isPortrait = H > W * 1.1;

  // Three sample bottles on left
  const bottles = SAMPLES.map((s, i) => ({
    ...s,
    x: 60 + i * 70, y: cy + 80,
    w: 50, h: 110,
  }));

  // TLC plate (rectangle) in the middle
  const plate = {
    x: cx - 70, y: cy - 40,
    w: 140, h: 200,
    isOver: state.plateInChamber, // for drawing decision
  };

  // Capillary tool
  const capillary = { x: cx + 130, y: cy + 30, w: 12, h: 80 };

  // Developing chamber on right
  const chamber = {
    x: W - 220, y: cy - 80,
    w: 160, h: 240,
  };

  // Solvent bottle
  const solvent = {
    x: W - 80, y: cy + 60,
    w: 50, h: 120,
  };

  return { bottles, plate, capillary, chamber, solvent };
}

// === DRAWING ===
function clear() {
  ctx.fillStyle = '#1e293b';
  ctx.fillRect(0, 0, W, H);
  // Lab bench
  ctx.fillStyle = '#475569';
  ctx.fillRect(0, H * 0.7, W, H * 0.3);
  ctx.fillStyle = '#334155';
  ctx.fillRect(0, H * 0.7, W, 6);
}

function drawBottle(b, label, fillRatio = 0.7, highlight = false) {
  // Neck
  ctx.fillStyle = '#94a3b8';
  ctx.fillRect(b.x + b.w * 0.3, b.y - 14, b.w * 0.4, 14);
  // Body
  ctx.fillStyle = '#e2e8f0';
  ctx.beginPath();
  ctx.roundRect(b.x, b.y, b.w, b.h, 8);
  ctx.fill();
  // Liquid
  ctx.fillStyle = b.color;
  const lh = (b.h - 12) * fillRatio;
  ctx.beginPath();
  ctx.roundRect(b.x + 4, b.y + (b.h - 6 - lh), b.w - 8, lh, 4);
  ctx.fill();
  // Label
  ctx.fillStyle = '#1e293b';
  ctx.font = 'bold 14px Inter, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(label, b.x + b.w / 2, b.y + b.h - 12);

  if (highlight) {
    ctx.strokeStyle = '#fbbf24';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.roundRect(b.x - 4, b.y - 18, b.w + 8, b.h + 22, 10);
    ctx.stroke();
  }
}

function drawPlate(p) {
  if (state.plateInChamber) return; // drawn inside chamber later
  // Silica gel plate
  ctx.fillStyle = '#fef3c7';
  ctx.fillRect(p.x, p.y, p.w, p.h);
  ctx.strokeStyle = '#92400e';
  ctx.lineWidth = 2;
  ctx.strokeRect(p.x, p.y, p.w, p.h);
  // Origin line (đường gốc) — 15% from bottom
  const lineY = p.y + p.h * 0.85;
  ctx.strokeStyle = '#6b7280';
  ctx.setLineDash([4, 3]);
  ctx.beginPath();
  ctx.moveTo(p.x + 6, lineY); ctx.lineTo(p.x + p.w - 6, lineY);
  ctx.stroke();
  ctx.setLineDash([]);
  // Solvent front mark (if developed)
  if (state.devProgress >= 1) {
    const frontY = p.y + 6;
    ctx.strokeStyle = '#ef4444';
    ctx.setLineDash([2, 2]);
    ctx.beginPath();
    ctx.moveTo(p.x + 6, frontY); ctx.lineTo(p.x + p.w - 6, frontY);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = '#ef4444';
    ctx.font = '10px Inter';
    ctx.textAlign = 'left';
    ctx.fillText('front', p.x + p.w + 4, frontY + 3);
  }
  // Spots
  for (const s of state.plateSpots) {
    const sample = SAMPLES.find(x => x.id === s.sampleId);
    const dotX = p.x + 20 + s.position * (p.w - 40);
    // If developed, spot has moved up by Rf
    const developedRise = state.devProgress * (p.h * 0.7) * sample.trueRf;
    const dotY = lineY - developedRise;
    ctx.fillStyle = sample.color;
    ctx.beginPath();
    ctx.arc(dotX, dotY, state.devProgress > 0 ? 8 : 6, 0, Math.PI * 2);
    ctx.fill();
    // Tag if measuring
    if (state.measuringSpot === sample.id) {
      ctx.strokeStyle = '#fbbf24';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(dotX, dotY, 14, 0, Math.PI * 2);
      ctx.stroke();
    }
  }
  // Label on origin line
  ctx.fillStyle = '#6b7280';
  ctx.font = '10px Inter';
  ctx.textAlign = 'left';
  ctx.fillText('origin', p.x + p.w + 4, lineY + 3);
}

function drawChamber(c) {
  // Chamber walls
  ctx.strokeStyle = '#cbd5e1';
  ctx.lineWidth = 3;
  ctx.fillStyle = 'rgba(255,255,255,0.04)';
  ctx.fillRect(c.x, c.y, c.w, c.h);
  ctx.strokeRect(c.x, c.y, c.w, c.h);
  // Solvent fill
  if (state.chamberFilled || state.plateInChamber) {
    const fillH = c.h * 0.18;
    ctx.fillStyle = 'rgba(139,92,246,0.35)';
    ctx.fillRect(c.x + 3, c.y + c.h - fillH, c.w - 6, fillH - 3);
    // Surface line
    ctx.strokeStyle = 'rgba(139,92,246,0.7)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(c.x + 3, c.y + c.h - fillH);
    ctx.lineTo(c.x + c.w - 3, c.y + c.h - fillH);
    ctx.stroke();
  }
  // Plate inside chamber
  if (state.plateInChamber) {
    const plateInnerH = c.h - 20;
    const plateInnerW = c.w - 30;
    const px = c.x + 15;
    const py = c.y + 10;
    ctx.fillStyle = '#fef3c7';
    ctx.fillRect(px, py, plateInnerW, plateInnerH);
    ctx.strokeStyle = '#92400e';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(px, py, plateInnerW, plateInnerH);
    const originY = py + plateInnerH * 0.85;
    ctx.strokeStyle = '#9ca3af';
    ctx.setLineDash([3, 2]);
    ctx.beginPath();
    ctx.moveTo(px + 4, originY); ctx.lineTo(px + plateInnerW - 4, originY);
    ctx.stroke();
    ctx.setLineDash([]);
    // Solvent rising on plate
    const solventRiseOnPlate = state.devProgress * plateInnerH * 0.7;
    const frontY = originY - solventRiseOnPlate;
    if (state.devProgress > 0) {
      ctx.fillStyle = 'rgba(139,92,246,0.20)';
      ctx.fillRect(px, frontY, plateInnerW, originY - frontY + 6);
      ctx.strokeStyle = 'rgba(139,92,246,0.8)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(px, frontY); ctx.lineTo(px + plateInnerW, frontY);
      ctx.stroke();
    }
    // Spots
    for (const s of state.plateSpots) {
      const sample = SAMPLES.find(x => x.id === s.sampleId);
      const dotX = px + 12 + s.position * (plateInnerW - 24);
      const developedRise = state.devProgress * plateInnerH * 0.7 * sample.trueRf;
      const dotY = originY - developedRise;
      ctx.fillStyle = sample.color;
      ctx.globalAlpha = 0.9;
      ctx.beginPath();
      ctx.arc(dotX, dotY, 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;
    }
  }
  // Label
  ctx.fillStyle = '#94a3b8';
  ctx.font = '11px Inter';
  ctx.textAlign = 'center';
  ctx.fillText('Bình triển khai', c.x + c.w / 2, c.y + c.h + 16);
}

function drawCapillary(cap) {
  ctx.fillStyle = '#cbd5e1';
  ctx.fillRect(cap.x, cap.y, cap.w, cap.h);
  if (state.capillary) {
    const sample = SAMPLES.find(s => s.id === state.capillary);
    ctx.fillStyle = sample.color;
    ctx.fillRect(cap.x + 2, cap.y + cap.h - 25, cap.w - 4, 22);
  }
  ctx.fillStyle = '#94a3b8';
  ctx.font = '10px Inter';
  ctx.textAlign = 'center';
  ctx.fillText('mao quản', cap.x + cap.w / 2, cap.y + cap.h + 14);
}

function draw() {
  clear();
  const L = layout();
  // Bottles
  for (const b of L.bottles) {
    drawBottle(b, b.id, 0.75, state.step <= 2 && !state.capillary);
  }
  // Solvent
  drawBottle(L.solvent, '💧', 0.85, state.step === 3 && !state.chamberFilled);
  // Plate
  drawPlate(L.plate);
  // Capillary
  drawCapillary(L.capillary);
  // Chamber
  drawChamber(L.chamber);
  // Origin instruction label
  if (state.step <= 2) {
    ctx.fillStyle = 'rgba(251,191,36,0.7)';
    ctx.font = '13px Inter';
    ctx.textAlign = 'center';
    ctx.fillText('↓ chấm mẫu lên đường gốc ↓', L.plate.x + L.plate.w / 2, L.plate.y + L.plate.h * 0.85 - 18);
  }
}

function hitBox(x, y, b) {
  return x >= b.x && x <= b.x + b.w && y >= b.y - 14 && y <= b.y + b.h;
}

function onCanvasClick(e) {
  const rect = canvas.getBoundingClientRect();
  const x = (e.clientX ?? e.touches?.[0]?.clientX) - rect.left;
  const y = (e.clientY ?? e.touches?.[0]?.clientY) - rect.top;
  const L = layout();

  // Phase: measuring Rf
  if (state.step === 6) {
    if (!state.plateRemoved) return;
    // Click on a spot on the plate
    const p = L.plate;
    const lineY = p.y + p.h * 0.85;
    for (const s of state.plateSpots) {
      const sample = SAMPLES.find(x => x.id === s.sampleId);
      const dotX = p.x + 20 + s.position * (p.w - 40);
      const developedRise = p.h * 0.7 * sample.trueRf;
      const dotY = lineY - developedRise;
      if (Math.hypot(x - dotX, y - dotY) < 16) {
        state.measuringSpot = sample.id;
        promptRf(sample);
        return;
      }
    }
    return;
  }

  // Phase 1-2: pick up sample with capillary, then click plate
  if (state.step <= 2) {
    if (!state.capillary) {
      for (const b of L.bottles) {
        if (hitBox(x, y, b)) {
          state.capillary = b.id;
          toast(`🧪 Mao quản đã hút ${b.name}`);
          setHint(`Click lên đường gốc của đĩa TLC để chấm mẫu ${b.id}`);
          state.step = 2;
          break;
        }
      }
    } else {
      // Click on plate origin line area
      const p = L.plate;
      const lineY = p.y + p.h * 0.85;
      if (x >= p.x && x <= p.x + p.w && Math.abs(y - lineY) < 18) {
        const position = (x - (p.x + 20)) / (p.w - 40);
        if (position < 0 || position > 1) return;
        // Already has this sample?
        if (state.plateSpots.some(s => s.sampleId === state.capillary)) {
          toast(`⚠️ Mẫu ${state.capillary} đã chấm rồi`, 'err');
          return;
        }
        state.plateSpots.push({ sampleId: state.capillary, position });
        toast(`✓ Đã chấm ${state.capillary}`, 'ok');
        state.score += 20;
        state.capillary = null;
        if (state.plateSpots.length >= 3) {
          state.step = 3;
          setHint('Click vào lọ dung môi 💧 để pha vào bình triển khai');
        } else {
          state.step = 1;
          setHint('Click vào lọ tiếp theo (A/B/C) để hút mẫu');
        }
      } else {
        toast('⚠️ Click vào đường gốc trên đĩa TLC', 'err');
        state.stepErrors++;
      }
    }
  } else if (state.step === 3) {
    if (hitBox(x, y, L.solvent)) {
      state.chamberFilled = true;
      state.score += 20;
      state.step = 4;
      toast('✓ Đã đổ dung môi vào bình', 'ok');
      setHint('Click vào đĩa TLC để đặt vào bình triển khai');
    }
  } else if (state.step === 4) {
    if (x >= L.plate.x && x <= L.plate.x + L.plate.w && y >= L.plate.y && y <= L.plate.y + L.plate.h) {
      state.plateInChamber = true;
      state.devStartTime = performance.now();
      state.score += 20;
      state.step = 5;
      toast('✓ Đặt đĩa vào bình — đang triển khai...', 'ok');
      setHint('Đợi dung môi di chuyển hết (5 giây)');
      // Disable action button during animation
      btnAction.disabled = true;
    }
  }
  updateUI();
}

canvas.addEventListener('click', onCanvasClick);
canvas.addEventListener('touchend', (e) => { e.preventDefault(); onCanvasClick(e.changedTouches[0]); }, { passive: false });

// === DEV (development) ANIMATION ===
function tick() {
  if (state.plateInChamber && state.devProgress < 1 && state.devStartTime) {
    const elapsed = (performance.now() - state.devStartTime) / 5000; // 5s
    state.devProgress = Math.min(1, elapsed);
    if (state.devProgress >= 1) {
      state.step = 5; // ready to remove
      btnAction.disabled = false;
      btnAction.textContent = '⬆️ Lấy đĩa ra';
      setHint('Click "Lấy đĩa ra" để chuyển sang đo Rf');
    }
  }
  // Update timer
  if (!state.finishedAt) {
    const t = (performance.now() - state.startedAt) / 1000;
    document.getElementById('timer').textContent = t.toFixed(1) + 's';
  }
  draw();
  requestAnimationFrame(tick);
}

// === UI ===
const btnAction = document.getElementById('btn-action');
const btnRestart = document.getElementById('btn-restart');

btnAction.addEventListener('click', () => {
  if (state.step === 5 && state.devProgress >= 1) {
    state.plateInChamber = false;
    state.plateRemoved = true;
    state.step = 6;
    state.score += 20;
    btnAction.textContent = 'Hoàn thành đo Rf';
    setHint('Click lên từng vệt (A/B/C) trên đĩa để đo Rf');
  } else if (state.step === 6) {
    finishGame();
  }
});

btnRestart.addEventListener('click', () => newGame());

const TUTORIALS_2D = {
  1: { n: 2, title: 'Chấm mẫu lên đường gốc', body: 'Click 1 lọ mẫu (A/B/C) để hút bằng mao quản. Mao quản sẽ đổi màu theo mẫu.', hint: '💡 Cần chấm đủ 3 mẫu để sang bước tiếp.' },
  2: { n: 2, title: 'Chấm vào đĩa TLC', body: 'Mao quản đã có mẫu. Giờ click trực tiếp lên <b>đường gốc</b> (đường chấm chấm dưới đĩa) để chấm.', hint: '💡 Vệt chấm nên nhỏ ≤3mm.' },
  3: { n: 3, title: 'Pha pha động', body: 'Click vào lọ dung môi (chai lớn 💧 bên phải) để pha vào bình triển khai.', hint: '💡 Bình kín giúp hơi dung môi bão hoà, Rf ổn định.' },
  4: { n: 4, title: 'Triển khai sắc ký', body: 'Click vào đĩa TLC để đặt vào bình. Đường gốc phải CAO HƠN mặt dung môi.', hint: '💡 Dung môi kéo mẫu lên theo Rf khác nhau.' },
  5: { n: 4, title: 'Đang triển khai...', body: 'Quan sát dung môi di chuyển + mẫu tách thành các vệt. Chờ ~5 giây.', hint: '⏳ Khi xong, click "Lấy đĩa ra".' },
  6: { n: 6, title: 'Đo hệ số R<sub>f</sub>', body: 'Click trực tiếp lên từng vệt mẫu trên đĩa. Nhập R<sub>f</sub> = vị trí vệt / vị trí front.', hint: '💡 Đúng ±0.05 = +30. Sai ±0.10 = +15.' },
};

function setHint(text) {
  document.getElementById('hint-text').textContent = text;
}

function displayStep() {
  if (state.step <= 2) return '2/6 · Chấm mẫu';
  if (state.step === 3) return '3/6 · Pha pha động';
  if (state.step === 4) return '4/6 · Triển khai';
  if (state.step === 5) return state.devProgress >= 1 ? '5/6 · Lấy đĩa ra' : '4/6 · Triển khai';
  return '6/6 · Đo Rf';
}
function updateUI() {
  document.getElementById('step-pill').textContent = `Bước ${displayStep()}`;
  document.getElementById('score').textContent = state.score;
  const stepKey = state.step === 5 && state.devProgress >= 1 ? 6 : state.step;
  const tut = TUTORIALS_2D[stepKey] || TUTORIALS_2D[1];
  document.getElementById('tut-num').textContent = tut.n;
  document.getElementById('tut-title').innerHTML = tut.title;
  document.getElementById('tut-body').innerHTML = tut.body;
  document.getElementById('tut-hint').innerHTML = tut.hint;
}

function toast(text, kind = '') {
  const el = document.createElement('div');
  el.className = 'toast ' + kind;
  el.textContent = text;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 2000);
}

function promptRf(sample) {
  const guess = prompt(`Đo Rf của mẫu ${sample.id} (vị trí vệt / vị trí front, từ 0 đến 1):`, '0.50');
  if (guess === null) return;
  const v = parseFloat(guess);
  if (isNaN(v) || v < 0 || v > 1) { toast('⚠️ Rf phải từ 0 đến 1', 'err'); return; }
  state.measurements[sample.id] = v;
  const err = Math.abs(v - sample.trueRf);
  let pts = 0;
  if (err <= 0.05) { pts = 30; toast(`🎯 Rf ${sample.id} chính xác! +30`, 'ok'); }
  else if (err <= 0.10) { pts = 15; toast(`✓ Rf ${sample.id} gần đúng +15`, 'ok'); }
  else { pts = 0; toast(`✗ Rf ${sample.id} sai (đáp án ${sample.trueRf.toFixed(2)})`, 'err'); }
  state.score += pts;
  state.measuringSpot = null;
  updateUI();
  // All measured?
  if (Object.keys(state.measurements).length >= 3) {
    setHint('Đã đo cả 3 vệt — click nút "Hoàn thành đo Rf"');
  }
}

async function finishGame() {
  state.finishedAt = performance.now();
  const durationMs = Math.round(state.finishedAt - state.startedAt);
  // Time bonus
  let timeBonus = 0;
  if (durationMs <= 90000) timeBonus = 20;
  else if (durationMs <= 150000) timeBonus = 10;
  state.score += timeBonus;
  // Build details
  const correctRf = Object.entries(state.measurements).filter(([id, v]) => {
    const s = SAMPLES.find(x => x.id === id);
    return Math.abs(v - s.trueRf) <= 0.10;
  }).length;
  const details = {
    samples: SAMPLES.map(s => ({
      id: s.id, trueRf: s.trueRf, measuredRf: state.measurements[s.id] ?? null,
    })),
    timeBonus, stepErrors: state.stepErrors,
  };
  // Submit
  await submitAttempt({
    version: 'sac-ky-2d',
    score: state.score,
    correct: correctRf + (state.plateSpots.length === 3 ? 3 : state.plateSpots.length),
    total: 6,
    durationMs,
    details,
  });
  showModal(durationMs, correctRf, timeBonus);
}

function showModal(durationMs, correctRf, timeBonus) {
  document.getElementById('modal-score').textContent = state.score;
  const list = [
    ['Thời gian', (durationMs / 1000).toFixed(1) + 's'],
    ['Số mẫu chấm đúng', state.plateSpots.length + '/3'],
    ['Đo Rf đúng', correctRf + '/3'],
    ['Sai thao tác', state.stepErrors],
    ['Bonus thời gian', '+' + timeBonus],
  ];
  document.getElementById('modal-details').innerHTML = list.map(([k, v]) => `<div class="row"><span>${k}</span><b>${v}</b></div>`).join('');
  document.getElementById('modal').classList.add('show');
}

document.getElementById('modal-replay').addEventListener('click', () => {
  document.getElementById('modal').classList.remove('show');
  newGame();
});

// Start
newGame();
tick();
