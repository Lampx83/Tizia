import { submitAttempt } from '/js/api.js';
import { pickRoundMedicines, getActiveLevel, scoreToStars, saveLevelResult, LEVELS } from '/js/medicines.js';
import { sfx } from '/js/sfx.js';
// ============================================================
// CONFIG
// ============================================================
const W = 1280, H = 720;
const ROUND_LEVEL = getActiveLevel();
const MEDICINES = pickRoundMedicines(ROUND_LEVEL.count);
const N_MEDS = MEDICINES.length;

const ROUND_TIME = ROUND_LEVEL.time;
const MED_W = N_MEDS >= 10 ? 70 : 80, MED_H = N_MEDS >= 10 ? 96 : 110;
const SLOT_W = N_MEDS >= 10 ? 86 : (N_MEDS >= 8 ? 96 : 110);
const SLOT_H = N_MEDS >= 10 ? 130 : 150;
const SHELF_GAP = N_MEDS >= 10 ? 10 : 14;
const SNAP_DIST = 90;

// Shelf canh phải, carton bên trái — chừa khoảng cho 4-8 ô
const SHELF_TOTAL_W = N_MEDS * SLOT_W + (N_MEDS - 1) * SHELF_GAP;
const SHELF_X = W - SHELF_TOTAL_W - 40;       // 40px margin phải
const SHELF_Y = 200;
const CARTON_X = 40, CARTON_Y = 340, CARTON_W = 260, CARTON_H = 200;
const TABLE_Y = 610;

// ============================================================
// STATE
// ============================================================
const canvas = document.getElementById('game');
canvas.width = W; canvas.height = H;
const ctx = canvas.getContext('2d');

const game = {
  state: 'start',
  score: 0, combo: 0, bestCombo: 0,
  timeLeft: ROUND_TIME,
  cursor: { x: W/2, y: H/2, pinching: false, wasPinching: false, visible: false },
  carton: { x: CARTON_X, y: CARTON_Y, isOpen: false, openProgress: 0, animating: false, shake: 0 },
  medicines: [], slots: [], particles: [],
  grabbed: null, message: '',
};

const handState = {
  landmarker: null, video: null, running: false, lastVideoTime: -1,
};
const camPreview = document.getElementById('cam-preview');
const camCtx = camPreview.getContext('2d');

// ============================================================
// MediaPipe HandLandmarker
// ============================================================
async function initHandTracking() {
  const { HandLandmarker, FilesetResolver } = await import('/vendor/mediapipe/vision_bundle.mjs');
  const fileset = await FilesetResolver.forVisionTasks('/vendor/mediapipe/wasm');
  handState.landmarker = await HandLandmarker.createFromOptions(fileset, {
    baseOptions: {
      modelAssetPath: '/models/hand_landmarker.task',
      delegate: 'GPU',
    },
    runningMode: 'VIDEO',
    numHands: 1,
  });
  const stream = await navigator.mediaDevices.getUserMedia({
    video: { facingMode: 'user', width: 640, height: 480 }, audio: false,
  });
  handState.video = document.createElement('video');
  handState.video.srcObject = stream;
  handState.video.autoplay = true;
  handState.video.muted = true;
  handState.video.playsInline = true;
  await new Promise(r => (handState.video.onloadedmetadata = r));
  await handState.video.play();
  handState.running = true;
  camPreview.style.display = 'block';
}

function updateHandTracking(time) {
  if (!handState.running) return;
  if (handState.video.currentTime === handState.lastVideoTime) return;
  handState.lastVideoTime = handState.video.currentTime;

  const result = handState.landmarker.detectForVideo(handState.video, time);
  camCtx.drawImage(handState.video, 0, 0, camPreview.width, camPreview.height);

  if (!result.landmarks || result.landmarks.length === 0) {
    game.cursor.visible = false;
    if (game.cursor.pinching && game.grabbed) onPinchRelease();
    game.cursor.pinching = false;
    return;
  }

  const lm = result.landmarks[0];
  const thumb = lm[4], index = lm[8];

  // Draw landmarks on preview
  camCtx.fillStyle = '#00ddff';
  for (const p of lm) {
    camCtx.beginPath();
    camCtx.arc(p.x * camPreview.width, p.y * camPreview.height, 3, 0, Math.PI * 2);
    camCtx.fill();
  }
  camCtx.strokeStyle = game.cursor.pinching ? '#ff5722' : '#ffffff';
  camCtx.lineWidth = 2;
  camCtx.beginPath();
  camCtx.moveTo(thumb.x * camPreview.width, thumb.y * camPreview.height);
  camCtx.lineTo(index.x * camPreview.width, index.y * camPreview.height);
  camCtx.stroke();

  const mx = (thumb.x + index.x) / 2;
  const my = (thumb.y + index.y) / 2;
  // Mirror x (selfie) and map to canvas
  game.cursor.x = (1 - mx) * W;
  game.cursor.y = my * H;
  game.cursor.visible = true;

  // Pinch with hysteresis
  const dist = Math.hypot(thumb.x - index.x, thumb.y - index.y);
  game.cursor.wasPinching = game.cursor.pinching;
  if (!game.cursor.pinching && dist < 0.05) game.cursor.pinching = true;
  else if (game.cursor.pinching && dist > 0.08) game.cursor.pinching = false;

  if (game.cursor.pinching && !game.cursor.wasPinching) onPinchStart();
  if (!game.cursor.pinching && game.cursor.wasPinching) onPinchRelease();
}

// ============================================================
// Game logic
// ============================================================
function setupRound() {
  const cats = MEDICINES.map(m => m.category);
  // Only shuffle slot order if this level says so
  if (ROUND_LEVEL.shuffleSlots) {
    for (let i = cats.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cats[i], cats[j]] = [cats[j], cats[i]];
    }
  }
  game.slots = cats.map((cat, i) => ({
    id: 'slot-' + i,
    category: cat,
    x: SHELF_X + i * (SLOT_W + SHELF_GAP),
    y: SHELF_Y,
    w: SLOT_W, h: SLOT_H,
    placedId: null,
  }));
  game.carton.isOpen = false;
  game.carton.openProgress = 0;
  game.carton.animating = false;
  game.medicines = [];
  game.particles = [];
  game.score = 0;
  game.combo = 0;
  game.bestCombo = 0;
  game.timeLeft = ROUND_TIME;
  game.startedAt = Date.now();
  game.grabbed = null;
  game.message = '👋 Pinch lên thùng để mở!';
}

function openCarton() {
  if (game.carton.isOpen || game.carton.animating) return;
  game.carton.animating = true;
  game.carton.shake = 0.3;
  sfx.open();
  spawnParticles(game.carton.x + CARTON_W/2, game.carton.y, '#ffd54f', 12);

  // After flap animation finishes, spring medicines out
  setTimeout(() => {
    const shuffled = [...MEDICINES];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    shuffled.forEach((m, i) => {
      const cx = game.carton.x + CARTON_W/2;
      const spread = -160 + (i + 0.5) * (320 / N_MEDS);   // 4–8 hộp đều spring ra
      game.medicines.push({
        ...m,
        x: cx + spread * 0.25,
        y: game.carton.y - 10,
        vx: spread * 1.4 + (Math.random() - 0.5) * 60,
        vy: -340 - Math.random() * 80,
        slotId: null, dragging: false,
      });
    });
    game.carton.isOpen = true;
    game.carton.animating = false;
    game.message = '✋ Pinch hộp thuốc → kéo đến đúng ô kệ → mở tay để snap';
  }, 420);
}

function onPinchStart() {
  if (game.state !== 'playing') return;
  const { x, y } = game.cursor;
  if (!game.carton.isOpen && pointInRect(x, y, game.carton.x, game.carton.y, CARTON_W, CARTON_H)) {
    openCarton();
    return;
  }
  // Grab medicine — check from top of pile (last drawn) first
  for (let i = game.medicines.length - 1; i >= 0; i--) {
    const m = game.medicines[i];
    if (pointInRect(x, y, m.x - MED_W/2, m.y - MED_H/2, MED_W, MED_H)) {
      game.grabbed = m;
      m.dragging = true;
      sfx.grab();
      if (m.slotId) {
        const s = game.slots.find(s => s.id === m.slotId);
        if (s) s.placedId = null;
        m.slotId = null;
      }
      // Bring to top of pile for stacking order
      game.medicines.splice(i, 1);
      game.medicines.push(m);
      return;
    }
  }
}

function onPinchRelease() {
  if (!game.grabbed) return;
  const med = game.grabbed;
  med.dragging = false;
  // Find nearest slot
  let best = null, bestDist = Infinity;
  for (const s of game.slots) {
    const cx = s.x + s.w/2, cy = s.y + s.h/2;
    const d = Math.hypot(med.x - cx, med.y - cy);
    if (d < bestDist) { bestDist = d; best = s; }
  }
  if (best && bestDist < SNAP_DIST) {
    if (best.placedId && best.placedId !== med.id) {
      const ex = game.medicines.find(m => m.id === best.placedId);
      if (ex) { ex.x = game.carton.x + CARTON_W/2; ex.y = TABLE_Y - MED_H/2; ex.vy = -100; ex.slotId = null; }
    }
    med.x = best.x + best.w/2;
    med.y = best.y + best.h/2;
    med.vx = 0; med.vy = 0;
    best.placedId = med.id;
    med.slotId = best.id;

    const correct = best.category === med.category;
    if (correct) {
      game.combo++;
      game.bestCombo = Math.max(game.bestCombo, game.combo);
      const bonus = 10 + Math.min(game.combo - 1, 5) * 5;
      game.score += bonus;
      sfx.correct();
      spawnParticles(med.x, med.y, '#43a047', 18);
      spawnFloatText(med.x, med.y - 30, '+' + bonus, '#2e7d32');
      game.message = `✅ Đúng! +${bonus}${game.combo > 1 ? ` · 🔥 Combo x${game.combo}` : ''}`;
    } else {
      game.combo = 0;
      game.score = Math.max(0, game.score - 5);
      sfx.wrong();
      spawnParticles(med.x, med.y, '#e53935', 14);
      spawnFloatText(med.x, med.y - 30, '-5', '#c62828');
      game.message = `❌ Sai! "${med.name}" thuộc nhóm "${med.category}"`;
    }
    checkRoundComplete();
  } else {
    // Drop on floor — apply small downward velocity
    med.vy = 100;
  }
  game.grabbed = null;
}

function checkRoundComplete() {
  if (!game.medicines.length) return;
  const allPlaced = game.medicines.every(m => m.slotId);
  if (!allPlaced) return;
  const allCorrect = game.medicines.every(m => {
    const s = game.slots.find(s => s.id === m.slotId);
    return s && s.category === m.category;
  });
  if (allCorrect) {
    const timeBonus = Math.floor(game.timeLeft) * 3;
    const comboBonus = game.bestCombo * 5;
    game.score += timeBonus + comboBonus;
    sfx.perfect();
    spawnParticles(W/2, H/2, '#ffd54f', 40);
    spawnFloatText(W/2, H/2 - 40, '🎉 PERFECT!', '#f57c00');
    setTimeout(() => endRound(true, timeBonus, comboBonus), 900);
  }
}

function endRound(success, timeBonus = 0, comboBonus = 0) {
  game.state = 'reviewing';

  // Compute breakdown for backend
  const total = game.medicines.length || MEDICINES.length;
  const correctCount = game.medicines.filter(m => {
    const s = game.slots.find(s => s.id === m.slotId);
    return s && s.category === m.category;
  }).length;
  const pct = total ? Math.round(correctCount / total * 100) : 0;
  const stars = scoreToStars(pct);
  saveLevelResult(ROUND_LEVEL.n, { stars, score: game.score });
  const durationMs = game.startedAt ? Date.now() - game.startedAt : null;

  submitAttempt({
    version: '2d-arcade',
    score: game.score,
    correct: correctCount,
    total,
    durationMs,
    details: {
      success, timeBonus, comboBonus, stars,
      level: ROUND_LEVEL.n,
      bestCombo: game.bestCombo,
      medicines: game.medicines.map(m => ({
        id: m.id, name: m.name, category: m.category,
        placedIn: game.slots.find(s => s.id === m.slotId)?.category ?? null,
      })),
    },
  });

  const starsHtml = '⭐'.repeat(stars) + '<span style="opacity:0.25">' + '⭐'.repeat(3 - stars) + '</span>';
  const nextLevel = LEVELS.find(l => l.n === ROUND_LEVEL.n + 1);
  const hasNext = nextLevel && stars >= 1;
  const modal = document.getElementById('result-modal');
  const title = success ? '🏆 Hoàn thành!' : '⏱️ Hết giờ';
  modal.innerHTML = `
    <div style="font-size:12px;opacity:0.7;text-transform:uppercase;letter-spacing:1px;margin-bottom:4px">Level ${ROUND_LEVEL.n} · ${ROUND_LEVEL.label}</div>
    <h2>${title}</h2>
    <div style="font-size:32px;margin:8px 0">${starsHtml}</div>
    <div class="score">${game.score}</div>
    <div class="sub">Đúng ${correctCount}/${total} (${pct}%) ${success ? `· bonus +${timeBonus + comboBonus}` : ''}</div>
    ${hasNext ? `<button id="next-level" style="background:#f59e0b">▶️ Level ${nextLevel.n} — ${nextLevel.label}</button>` : ''}
    <button id="play-again">🔄 Chơi lại</button>
    <button class="secondary" onclick="location.href='./'">← Trang chính</button>
  `;
  modal.style.display = 'block';
  if (hasNext) {
    document.getElementById('next-level').onclick = () => {
      location.href = '2d-arcade.html?level=' + nextLevel.n;
    };
  }
  document.getElementById('play-again').onclick = () => {
    modal.style.display = 'none';
    setupRound();
    game.state = 'playing';
  };
}

function pointInRect(x, y, rx, ry, rw, rh) {
  return x >= rx && x <= rx + rw && y >= ry && y <= ry + rh;
}

function spawnParticles(x, y, color, count) {
  for (let i = 0; i < count; i++) {
    const a = Math.random() * Math.PI * 2;
    const s = 80 + Math.random() * 180;
    game.particles.push({
      x, y, vx: Math.cos(a) * s, vy: Math.sin(a) * s - 60,
      life: 0.8 + Math.random() * 0.5, color, isText: false,
    });
  }
}

function spawnFloatText(x, y, text, color) {
  game.particles.push({ x, y, vx: 0, vy: -80, life: 1.4, color, isText: true, text });
}

// ============================================================
// Per-frame update
// ============================================================
function update(dt) {
  if (game.state === 'playing') {
    game.timeLeft -= dt;
    if (game.timeLeft <= 0) { game.timeLeft = 0; endRound(false); }
  }

  if (game.carton.animating || game.carton.openProgress < 1) {
    game.carton.openProgress = Math.min(1, game.carton.openProgress + dt / 0.4);
  }
  if (game.carton.shake > 0) game.carton.shake = Math.max(0, game.carton.shake - dt * 2);

  for (const m of game.medicines) {
    if (m === game.grabbed) {
      // Smooth follow cursor
      m.x += (game.cursor.x - m.x) * 0.45;
      m.y += (game.cursor.y - m.y) * 0.45;
      m.vx = 0; m.vy = 0;
    } else if (m.slotId) {
      m.vx = 0; m.vy = 0;
    } else {
      m.vy += 1200 * dt;
      m.x += m.vx * dt;
      m.y += m.vy * dt;
      // Floor bounce
      if (m.y + MED_H/2 > TABLE_Y) {
        m.y = TABLE_Y - MED_H/2;
        m.vy *= -0.35;
        m.vx *= 0.75;
        if (Math.abs(m.vy) < 40) m.vy = 0;
        if (Math.abs(m.vx) < 8) m.vx = 0;
      }
      if (m.x < MED_W/2) { m.x = MED_W/2; m.vx *= -0.5; }
      if (m.x > W - MED_W/2) { m.x = W - MED_W/2; m.vx *= -0.5; }
    }
  }

  game.particles = game.particles.filter(p => {
    p.life -= dt;
    p.x += p.vx * dt;
    p.y += p.vy * dt;
    if (!p.isText) p.vy += 600 * dt;
    return p.life > 0;
  });
}

// ============================================================
// Drawing
// ============================================================
function draw() {
  ctx.clearRect(0, 0, W, H);

  // Floor shadow band
  const grad = ctx.createLinearGradient(0, TABLE_Y - 20, 0, H);
  grad.addColorStop(0, 'rgba(120, 90, 70, 0)');
  grad.addColorStop(1, 'rgba(80, 50, 30, 0.35)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, TABLE_Y - 20, W, H - TABLE_Y + 20);
  // Floor line
  ctx.strokeStyle = 'rgba(80,50,30,0.4)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(0, TABLE_Y); ctx.lineTo(W, TABLE_Y);
  ctx.stroke();

  drawShelf();
  for (const s of game.slots) drawSlot(s);
  drawCarton(game.carton);
  // Floor shadows for medicines
  for (const m of game.medicines) drawMedicineShadow(m);
  for (const m of game.medicines) drawMedicine(m);
  for (const p of game.particles) drawParticle(p);
  if (game.cursor.visible) drawCursor();
  drawHUD();
}

function drawShelf() {
  const totalW = SHELF_TOTAL_W;
  // Back panel
  ctx.fillStyle = '#4e342e';
  ctx.fillRect(SHELF_X - 16, SHELF_Y - 24, totalW + 32, SLOT_H + 48);
  // Top board
  ctx.fillStyle = '#6d4c41';
  ctx.fillRect(SHELF_X - 24, SHELF_Y - 32, totalW + 48, 14);
  ctx.fillStyle = '#5d4037';
  ctx.fillRect(SHELF_X - 24, SHELF_Y - 32, totalW + 48, 4);
  // Bottom board
  ctx.fillStyle = '#6d4c41';
  ctx.fillRect(SHELF_X - 24, SHELF_Y + SLOT_H + 14, totalW + 48, 14);
  // Slot interior bg
  for (let i = 0; i < N_MEDS; i++) {
    const x = SHELF_X + i * (SLOT_W + SHELF_GAP);
    const g = ctx.createLinearGradient(x, SHELF_Y, x, SHELF_Y + SLOT_H);
    g.addColorStop(0, '#fafafa');
    g.addColorStop(1, '#e0e0e0');
    ctx.fillStyle = g;
    ctx.fillRect(x, SHELF_Y, SLOT_W, SLOT_H);
  }
}

function drawSlot(s) {
  ctx.strokeStyle = '#6d4c41';
  ctx.lineWidth = 2;
  ctx.strokeRect(s.x, s.y, s.w, s.h);
  // Label tag below
  const labelY = s.y + s.h + 30;
  ctx.fillStyle = '#fff8e1';
  ctx.strokeStyle = '#8d6e63';
  ctx.lineWidth = 2;
  roundRect(ctx, s.x + 4, labelY, s.w - 8, 28, 6, true, true);
  ctx.fillStyle = '#3e2723';
  ctx.font = 'bold 13px system-ui';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(s.category, s.x + s.w/2, labelY + 14);
}

function drawCarton(c) {
  const sx = c.shake > 0 ? (Math.random() - 0.5) * 6 * c.shake : 0;
  const sy = c.shake > 0 ? (Math.random() - 0.5) * 6 * c.shake : 0;
  ctx.save();
  ctx.translate(sx, sy);
  // Body shadow
  ctx.fillStyle = 'rgba(0,0,0,0.25)';
  ctx.beginPath();
  ctx.ellipse(c.x + CARTON_W/2, c.y + CARTON_H + 6, CARTON_W/2.2, 12, 0, 0, Math.PI * 2);
  ctx.fill();
  // Body
  const g = ctx.createLinearGradient(c.x, c.y, c.x, c.y + CARTON_H);
  g.addColorStop(0, '#b08968');
  g.addColorStop(1, '#8d6e51');
  ctx.fillStyle = g;
  ctx.fillRect(c.x, c.y, CARTON_W, CARTON_H);
  // Tape seam
  ctx.fillStyle = 'rgba(0,0,0,0.18)';
  ctx.fillRect(c.x + CARTON_W/2 - 2, c.y, 4, CARTON_H);
  // Outline
  ctx.strokeStyle = '#5d4037';
  ctx.lineWidth = 3;
  ctx.strokeRect(c.x, c.y, CARTON_W, CARTON_H);
  // Flaps (hinge at top)
  const t = c.openProgress;
  const flapW = CARTON_W / 2;
  const angle = t * Math.PI * 0.55;
  // Left flap
  ctx.save();
  ctx.translate(c.x + CARTON_W/2, c.y);
  ctx.rotate(-angle);
  const lg = ctx.createLinearGradient(-flapW, -12, -flapW, 0);
  lg.addColorStop(0, '#a47551');
  lg.addColorStop(1, '#b08968');
  ctx.fillStyle = lg;
  ctx.fillRect(-flapW, -12, flapW, 12);
  ctx.strokeStyle = '#5d4037';
  ctx.lineWidth = 2;
  ctx.strokeRect(-flapW, -12, flapW, 12);
  ctx.restore();
  // Right flap
  ctx.save();
  ctx.translate(c.x + CARTON_W/2, c.y);
  ctx.rotate(angle);
  const rg = ctx.createLinearGradient(0, -12, 0, 0);
  rg.addColorStop(0, '#a47551');
  rg.addColorStop(1, '#b08968');
  ctx.fillStyle = rg;
  ctx.fillRect(0, -12, flapW, 12);
  ctx.strokeStyle = '#5d4037';
  ctx.lineWidth = 2;
  ctx.strokeRect(0, -12, flapW, 12);
  ctx.restore();
  // Label
  if (!c.isOpen) {
    ctx.fillStyle = 'rgba(255,255,255,0.92)';
    roundRect(ctx, c.x + 30, c.y + CARTON_H/2 - 36, CARTON_W - 60, 72, 8, true, false);
    ctx.fillStyle = '#5d4037';
    ctx.font = 'bold 24px system-ui';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('THÙNG THUỐC', c.x + CARTON_W/2, c.y + CARTON_H/2 - 8);
    ctx.font = '14px system-ui';
    ctx.fillStyle = c.animating ? '#e65100' : '#5d4037';
    ctx.fillText(c.animating ? '✨ Đang mở...' : '👆 Pinch để mở', c.x + CARTON_W/2, c.y + CARTON_H/2 + 18);
  }
  ctx.restore();
}

function drawMedicineShadow(m) {
  if (m.slotId) return;
  if (m === game.grabbed) {
    ctx.fillStyle = 'rgba(0,0,0,0.25)';
    ctx.beginPath();
    ctx.ellipse(m.x, Math.min(TABLE_Y + 4, m.y + MED_H), MED_W * 0.5, 6, 0, 0, Math.PI * 2);
    ctx.fill();
  } else if (m.y + MED_H/2 >= TABLE_Y - 5) {
    ctx.fillStyle = 'rgba(0,0,0,0.2)';
    ctx.beginPath();
    ctx.ellipse(m.x, TABLE_Y + 2, MED_W * 0.45, 5, 0, 0, Math.PI * 2);
    ctx.fill();
  }
}

function drawMedicine(m) {
  ctx.save();
  if (m === game.grabbed) {
    ctx.shadowColor = 'rgba(0,0,0,0.4)';
    ctx.shadowBlur = 16;
    ctx.shadowOffsetY = 8;
  }
  // Body
  ctx.fillStyle = m.color;
  roundRect(ctx, m.x - MED_W/2, m.y - MED_H/2, MED_W, MED_H, 8, true, false);
  // Inner white panel
  ctx.fillStyle = '#ffffff';
  roundRect(ctx, m.x - MED_W/2 + 6, m.y - MED_H/2 + 6, MED_W - 12, MED_H - 12, 4, true, false);
  // Brand short
  ctx.fillStyle = m.color;
  ctx.font = 'bold 16px system-ui';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(m.short, m.x, m.y - 28);
  // Cross icon
  ctx.fillStyle = m.color;
  const cs = 8;
  ctx.fillRect(m.x - cs/2, m.y - 12, cs, cs * 2.4);
  ctx.fillRect(m.x - cs, m.y - 12 + cs * 0.7, cs * 2, cs);
  // Category tag at bottom
  ctx.fillStyle = m.color;
  ctx.font = 'bold 9px system-ui';
  ctx.fillText(m.category.toUpperCase(), m.x, m.y + MED_H/2 - 14);
  ctx.restore();
}

function drawParticle(p) {
  if (p.isText) {
    ctx.fillStyle = p.color;
    ctx.font = 'bold 26px system-ui';
    ctx.textAlign = 'center';
    ctx.globalAlpha = Math.min(1, p.life / 0.6);
    ctx.fillText(p.text, p.x, p.y);
    ctx.globalAlpha = 1;
  } else {
    ctx.fillStyle = p.color;
    ctx.globalAlpha = Math.min(1, p.life * 1.5);
    ctx.beginPath();
    ctx.arc(p.x, p.y, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;
  }
}

function drawCursor() {
  const { x, y, pinching } = game.cursor;
  const r = pinching ? 16 : 22;
  ctx.strokeStyle = pinching ? '#ff5722' : '#00bcd4';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.stroke();
  ctx.fillStyle = pinching ? 'rgba(255,87,34,0.25)' : 'rgba(0,188,212,0.18)';
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.arc(x, y, 3, 0, Math.PI * 2);
  ctx.fill();
}

function drawHUD() {
  // Top bar
  ctx.fillStyle = 'rgba(255,255,255,0.94)';
  ctx.fillRect(0, 0, W, 60);
  ctx.strokeStyle = 'rgba(0,0,0,0.08)';
  ctx.beginPath(); ctx.moveTo(0, 60); ctx.lineTo(W, 60); ctx.stroke();

  ctx.fillStyle = '#1a237e';
  ctx.font = 'bold 26px system-ui';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  ctx.fillText('💯 ' + game.score, 24, 30);

  if (game.combo > 1) {
    ctx.fillStyle = '#ff6f00';
    ctx.font = 'bold 18px system-ui';
    ctx.fillText('🔥 Combo x' + game.combo, 180, 30);
  }

  // Title
  ctx.fillStyle = '#37474f';
  ctx.font = '600 16px system-ui';
  ctx.textAlign = 'center';
  ctx.fillText(`💊 Level ${ROUND_LEVEL.n} · ${ROUND_LEVEL.label}`, W/2, 30);

  // Timer
  const lowTime = game.timeLeft < 10;
  ctx.fillStyle = lowTime ? '#c62828' : '#1a237e';
  ctx.font = 'bold 26px system-ui';
  ctx.textAlign = 'right';
  const t = Math.ceil(game.timeLeft);
  ctx.fillText('⏱️ ' + t + 's', W - 24, 30);
  if (lowTime && Math.floor(performance.now() / 250) % 2 === 0) {
    ctx.fillStyle = 'rgba(198, 40, 40, 0.4)';
    ctx.fillRect(W - 130, 0, 130, 60);
  }

  // Message bar
  if (game.message) {
    ctx.fillStyle = 'rgba(0,0,0,0.72)';
    const mw = ctx.measureText(game.message).width + 40;
    roundRect(ctx, W/2 - mw/2, H - 56, mw, 36, 18, true, false);
    ctx.fillStyle = 'white';
    ctx.font = '15px system-ui';
    ctx.textAlign = 'center';
    ctx.fillText(game.message, W/2, H - 38);
  }
}

function roundRect(ctx, x, y, w, h, r, fill, stroke) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
  if (fill) ctx.fill();
  if (stroke) ctx.stroke();
}

// ============================================================
// Loop + resize
// ============================================================
let lastTime = performance.now();
function tick(time) {
  const dt = Math.min(0.05, (time - lastTime) / 1000);
  lastTime = time;
  updateHandTracking(time);
  update(dt);
  draw();
  requestAnimationFrame(tick);
}

function resize() {
  const scale = Math.min(innerWidth / W, innerHeight / H);
  canvas.style.transform = `scale(${scale})`;
  canvas.style.transformOrigin = 'top left';
  canvas.style.left = ((innerWidth - W * scale) / 2) + 'px';
  canvas.style.top  = ((innerHeight - H * scale) / 2) + 'px';
}
addEventListener('resize', resize);
resize();

// ============================================================
// Start
// ============================================================
function launchGame() {
  document.getElementById('start-overlay').style.display = 'none';
  setupRound();
  game.state = 'playing';
  lastTime = performance.now();
  requestAnimationFrame(tick);
}

// Webcam yêu cầu secure context (HTTPS hoặc localhost). Trên LAN IP qua HTTP,
// navigator.mediaDevices undefined → ẩn nút webcam, gợi ý chơi bằng chuột.
const SECURE_FOR_CAMERA = window.isSecureContext && !!navigator.mediaDevices?.getUserMedia;
if (!SECURE_FOR_CAMERA) {
  const overlay = document.getElementById('start-overlay');
  const note = document.createElement('div');
  note.style.cssText = 'background:rgba(251,191,36,0.15);border:1px solid #fbbf24;padding:10px 16px;border-radius:8px;font-size:13px;color:#fde68a;max-width:520px;line-height:1.5;margin:4px 0';
  note.innerHTML = `⚠️ <b>Webcam chỉ chạy qua HTTPS hoặc localhost.</b><br>
    Bạn đang truy cập <code style="background:rgba(0,0,0,0.3);padding:1px 5px;border-radius:3px">${location.host}</code> qua HTTP — Chrome chặn camera ở chế độ này.<br>
    👉 Chơi bằng chuột/touch (không cần webcam) phía dưới.`;
  overlay.insertBefore(note, document.getElementById('start-btn'));
  document.getElementById('start-btn').style.display = 'none';
  const mouseLink = document.getElementById('mouse-only');
  mouseLink.style.cssText = 'background:linear-gradient(135deg,#fbbf24,#f97316);color:#3e2723;padding:14px 28px;border-radius:12px;font-weight:700;font-size:17px;text-decoration:none;display:inline-block;margin-top:8px';
  mouseLink.textContent = '🖱️ Chơi bằng chuột';
}

document.getElementById('start-btn').addEventListener('click', async () => {
  const btn = document.getElementById('start-btn');
  btn.disabled = true;
  btn.textContent = '⏳ Đang tải MediaPipe…';
  try {
    await initHandTracking();
    launchGame();
  } catch (err) {
    btn.disabled = false;
    btn.textContent = '▶️ Thử webcam lại';
    const insecure = /undefined.*getUserMedia/i.test(err.message) || !window.isSecureContext;
    const msg = insecure
      ? `⚠️ Webcam chỉ chạy trên HTTPS hoặc localhost.\nBạn đang ở: ${location.host}\n\n→ Bấm "Chơi bằng chuột" để chơi không cần camera.`
      : (err.name === 'NotAllowedError' || err.name === 'NotFoundError')
        ? '⚠️ Cần cấp quyền camera trong trình duyệt.'
        : '⚠️ ' + err.message;
    alert('Không khởi động được webcam:\n\n' + msg);
  }
});

document.getElementById('mouse-only').addEventListener('click', (e) => {
  e.preventDefault();
  launchGame();
});

// Mouse / touch fallback — works whether MediaPipe enabled or not
canvas.addEventListener('pointerdown', (e) => {
  if (game.state !== 'playing') return;
  const rect = canvas.getBoundingClientRect();
  game.cursor.x = ((e.clientX - rect.left) / rect.width) * W;
  game.cursor.y = ((e.clientY - rect.top) / rect.height) * H;
  game.cursor.visible = true;
  game.cursor.wasPinching = game.cursor.pinching;
  game.cursor.pinching = true;
  onPinchStart();
  e.preventDefault();
});
canvas.addEventListener('pointermove', (e) => {
  if (game.state !== 'playing') return;
  if (!game.cursor.pinching && !game.grabbed) return;
  const rect = canvas.getBoundingClientRect();
  game.cursor.x = ((e.clientX - rect.left) / rect.width) * W;
  game.cursor.y = ((e.clientY - rect.top) / rect.height) * H;
});
canvas.addEventListener('pointerup', () => {
  if (game.state !== 'playing') return;
  if (!game.cursor.pinching) return;
  game.cursor.wasPinching = true;
  game.cursor.pinching = false;
  onPinchRelease();
});
canvas.addEventListener('pointercancel', () => {
  if (game.cursor.pinching) { game.cursor.pinching = false; onPinchRelease(); }
});
