import { submitAttempt } from '/js/api.js';

const SAMPLES = [
  { id: 'A', hex: '#ef4444', trueRf: 0.30 },
  { id: 'B', hex: '#3b82f6', trueRf: 0.55 },
  { id: 'C', hex: '#22c55e', trueRf: 0.78 },
];

let state;
function newState() {
  state = {
    step: 1,
    score: 0,
    startedAt: performance.now(),
    finishedAt: null,
    capillary: null,
    plateSpots: [],
    chamberFilled: false,
    plateInChamber: false,
    devProgress: 0,
    devStartTime: null,
    plateRemoved: false,
    measurements: {},
  };
}

function $(id) { return document.getElementById(id); }
function setHint(t) { $('hint-text').textContent = t; }
function toast(text, kind = '') {
  const el = document.createElement('div');
  el.className = 'toast ' + kind;
  el.textContent = text;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 2000);
}
const TUTORIALS_VR = {
  1: { n: 2, title: 'Chấm mẫu lên đĩa', body: 'Nhìn (gaze) hoặc trigger vào 1 lọ A/B/C để hút mẫu. Trong VR dùng controller.', hint: '💡 Bấm <b>Enter VR</b> (góc phải) để vào kính Quest.' },
  2: { n: 2, title: 'Chấm vào đĩa TLC', body: 'Mao quản đã có mẫu. Gaze/trigger vào đĩa TLC để chấm.', hint: '💡 Cần chấm đủ 3 mẫu A+B+C.' },
  3: { n: 3, title: 'Pha pha động', body: 'Gaze/trigger vào lọ dung môi 💧 lớn để đổ vào bình.', hint: '💡 Bình kín giúp hơi dung môi bão hoà.' },
  4: { n: 4, title: 'Triển khai sắc ký', body: 'Gaze/trigger vào đĩa TLC để đặt vào bình triển khai.', hint: '💡 Đường gốc phải cao hơn mặt dung môi.' },
  5: { n: 4, title: 'Đang triển khai...', body: 'Dung môi đang chạy. Chờ ~5 giây cho mẫu tách.', hint: '⏳ Sau đó "Lấy đĩa ra" để đo Rf.' },
  6: { n: 6, title: 'Đo R<sub>f</sub>', body: 'Gaze/trigger vào đĩa để đo R<sub>f</sub> từng vệt (A→B→C theo thứ tự).', hint: '💡 Đúng ±0.05 = +30. Đo nhanh được bonus.' },
};
function updateUI() {
  $('step-pill').textContent = `Bước ${displayStep()}`;
  $('score').textContent = state.score;
  const stepKey = state.step === 5 && state.devProgress >= 1 ? 6 : state.step;
  const tut = TUTORIALS_VR[stepKey] || TUTORIALS_VR[1];
  $('tut-num').textContent = tut.n;
  $('tut-title').innerHTML = tut.title;
  $('tut-body').innerHTML = tut.body;
  $('tut-hint').innerHTML = tut.hint;
}
function displayStep() {
  if (state.step <= 2) return '2/6 · Chấm mẫu';
  if (state.step === 3) return '3/6 · Pha pha động';
  if (state.step === 4) return '4/6 · Triển khai';
  if (state.step === 5) return state.devProgress >= 1 ? '5/6 · Lấy đĩa ra' : '4/6 · Triển khai';
  return '6/6 · Đo Rf';
}

// Hover highlight: emissive on hovered group
document.querySelectorAll('.interactable').forEach(el => {
  el.addEventListener('mouseenter', () => {
    el.querySelectorAll('a-cylinder, a-box').forEach(c => {
      c.setAttribute('material', 'emissive', '#fbbf24');
      c.setAttribute('material', 'emissiveIntensity', 0.3);
    });
  });
  el.addEventListener('mouseleave', () => {
    el.querySelectorAll('a-cylinder, a-box').forEach(c => {
      c.setAttribute('material', 'emissive', '#000000');
      c.setAttribute('material', 'emissiveIntensity', 0);
    });
  });
  el.addEventListener('click', () => handleClick(el));
});

function handleClick(el) {
  if (el.classList.contains('sample')) {
    onSampleClick(el.dataset.sample);
  } else if (el.dataset.type === 'plate') {
    onPlateClick();
  } else if (el.dataset.type === 'solvent') {
    onSolventClick();
  } else if (el.dataset.type === 'chamber') {
    // For now treat as plate-into-chamber if user is at step 4
    if (state.step === 4) onPlateClick(true);
  }
}

function onSampleClick(sid) {
  if (state.step > 2) return;
  if (state.capillary) { toast('Mao quản đã có mẫu — chấm trước', 'err'); return; }
  state.capillary = sid;
  const s = SAMPLES.find(x => x.id === sid);
  const cap = $('cap-tip');
  cap.setAttribute('color', s.hex);
  cap.setAttribute('visible', true);
  state.step = 2;
  toast(`🧪 Hút mẫu ${sid}`, 'ok');
  setHint(`Click vào đĩa TLC để chấm mẫu ${sid}`);
  updateUI();
}

function onPlateClick(viaChamber = false) {
  if (state.step <= 2 && state.capillary) {
    if (state.plateSpots.some(s => s.sampleId === state.capillary)) {
      toast(`Mẫu ${state.capillary} đã chấm`, 'err'); return;
    }
    const pos = state.plateSpots.length / 3 + 0.16;
    state.plateSpots.push({ sampleId: state.capillary, position: pos });
    state.score += 20;
    toast(`✓ Chấm ${state.capillary}`, 'ok');
    state.capillary = null;
    $('cap-tip').setAttribute('visible', false);
    drawSpots();
    if (state.plateSpots.length >= 3) {
      state.step = 3;
      setHint('Click vào lọ dung môi (💧) để đổ vào bình');
    } else {
      state.step = 1;
      setHint('Click lọ tiếp theo (A/B/C)');
    }
    updateUI();
  } else if (state.step === 4 || viaChamber) {
    if (state.step !== 4) return;
    state.plateInChamber = true;
    state.devStartTime = performance.now();
    state.score += 20;
    state.step = 5;
    toast('✓ Đặt đĩa vào bình', 'ok');
    setHint('Đợi dung môi triển khai (5 giây)');
    $('btn-action').disabled = true;
    movePlateInto();
    updateUI();
  } else if (state.step === 6 && state.plateRemoved) {
    // Cycle through unmeasured spots
    const next = state.plateSpots.find(sp => !(sp.sampleId in state.measurements));
    if (next) promptRf(SAMPLES.find(s => s.id === next.sampleId));
  }
}

function onSolventClick() {
  if (state.step !== 3) return;
  state.chamberFilled = true;
  $('chamber-solvent').setAttribute('visible', true);
  state.score += 20;
  state.step = 4;
  toast('✓ Đổ dung môi', 'ok');
  setHint('Click vào đĩa TLC để đặt vào bình triển khai');
  updateUI();
}

function drawSpots() {
  const spots = $('spots');
  spots.innerHTML = '';
  for (const sp of state.plateSpots) {
    const s = SAMPLES.find(x => x.id === sp.sampleId);
    const x = -0.25 + sp.position * 0.5;
    const rise = state.devProgress * 0.7 * s.trueRf;
    const y = -0.4 + rise;
    const dot = document.createElement('a-sphere');
    dot.setAttribute('position', `${x} ${y} 0.04`);
    dot.setAttribute('radius', state.devProgress > 0 ? '0.035' : '0.025');
    dot.setAttribute('color', s.hex);
    spots.appendChild(dot);
  }
}

function movePlateInto() {
  const plate = $('plate-group');
  plate.setAttribute('animation', 'property: position; to: 2.5 0.65 0; dur: 800; easing: easeOutQuad');
}
function movePlateOut() {
  const plate = $('plate-group');
  plate.setAttribute('animation', 'property: position; to: 0 0.65 0; dur: 800; easing: easeOutQuad');
}

const btnAction = $('btn-action');
btnAction.addEventListener('click', () => {
  if (state.step === 5 && state.devProgress >= 1) {
    state.plateInChamber = false;
    state.plateRemoved = true;
    state.step = 6;
    state.score += 20;
    btnAction.textContent = 'Hoàn thành đo Rf';
    setHint('Click vào đĩa TLC để đo Rf từng vệt (lần lượt A→B→C)');
    movePlateOut();
    updateUI();
  } else if (state.step === 6) {
    finishGame();
  }
});

$('btn-restart').addEventListener('click', () => {
  newState();
  drawSpots();
  $('chamber-solvent').setAttribute('visible', false);
  $('plate-group').setAttribute('position', '0 0.65 0');
  $('cap-tip').setAttribute('visible', false);
  btnAction.disabled = true;
  btnAction.textContent = 'Thao tác';
  setHint('Click hoặc gaze vào lọ mẫu — bấm "Enter VR" để vào kính');
  updateUI();
});

function promptRf(sample) {
  const guess = prompt(`Đo Rf của mẫu ${sample.id} (0-1):`, '0.50');
  if (guess === null) return;
  const v = parseFloat(guess);
  if (isNaN(v) || v < 0 || v > 1) { toast('Rf 0-1', 'err'); return; }
  state.measurements[sample.id] = v;
  const err = Math.abs(v - sample.trueRf);
  let pts = err <= 0.05 ? 30 : err <= 0.10 ? 15 : 0;
  state.score += pts;
  toast(pts > 0 ? `✓ ${sample.id} +${pts}` : `✗ ${sample.id} sai (${sample.trueRf.toFixed(2)})`, pts > 0 ? 'ok' : 'err');
  updateUI();
  if (Object.keys(state.measurements).length >= 3) {
    setHint('Đã đo xong — click "Hoàn thành đo Rf"');
  }
}

async function finishGame() {
  state.finishedAt = performance.now();
  const durationMs = Math.round(state.finishedAt - state.startedAt);
  const timeBonus = durationMs <= 90000 ? 20 : durationMs <= 150000 ? 10 : 0;
  state.score += timeBonus;
  const correctRf = Object.entries(state.measurements).filter(([id, v]) => {
    const s = SAMPLES.find(x => x.id === id);
    return Math.abs(v - s.trueRf) <= 0.10;
  }).length;
  await submitAttempt({
    version: 'sac-ky-vr-web',
    score: state.score,
    correct: correctRf + state.plateSpots.length,
    total: 6,
    durationMs,
    details: { samples: SAMPLES.map(s => ({ id: s.id, trueRf: s.trueRf, measuredRf: state.measurements[s.id] ?? null })), timeBonus },
  });
  $('modal-score').textContent = state.score;
  $('modal-details').innerHTML = [
    ['Thời gian', (durationMs/1000).toFixed(1) + 's'],
    ['Mẫu chấm', state.plateSpots.length + '/3'],
    ['Đo Rf đúng', correctRf + '/3'],
    ['Bonus', '+' + timeBonus],
  ].map(([k,v]) => `<div class="row"><span>${k}</span><b>${v}</b></div>`).join('');
  $('modal').classList.add('show');
}
$('modal-replay').addEventListener('click', () => {
  $('modal').classList.remove('show');
  $('btn-restart').click();
});

// Update loop
newState();
updateUI();
function loop() {
  if (state.plateInChamber && state.devProgress < 1 && state.devStartTime) {
    state.devProgress = Math.min(1, (performance.now() - state.devStartTime) / 5000);
    drawSpots();
    if (state.devProgress >= 1) {
      btnAction.disabled = false;
      btnAction.textContent = '⬆️ Lấy đĩa ra';
      setHint('Triển khai xong — click "Lấy đĩa ra"');
      updateUI();
    }
  }
  if (!state.finishedAt) {
    $('timer').textContent = ((performance.now() - state.startedAt)/1000).toFixed(1) + 's';
  }
  requestAnimationFrame(loop);
}
loop();
