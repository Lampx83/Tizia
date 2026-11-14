import { MEDICINES, shuffle } from '/js/medicines.js';
import { submitAttempt, ensurePlayerName } from '/js/api.js';
import { sfx } from '/js/sfx.js';

const W = 1280, H = 720;
const canvas = document.getElementById('game');
canvas.width = W; canvas.height = H;
const ctx = canvas.getContext('2d');

const SLOT_H = 130;
const SLOT_W_MIN = 80;
const SHELF_Y = 130;
const SHELF_GAP = 12;
const SNAP_DIST = 90;
const MED_W = 70, MED_H = 96;
const TABLE_Y = 580;

const game = {
  state: 'start',          // 'start' | 'playing' | 'over'
  wave: 0,
  score: 0,
  timeLeft: 30,
  startedAt: 0,
  cursor: { x: W/2, y: H/2, pinching: false, wasPinching: false, visible: false },
  medicines: [],
  slots: [],
  grabbed: null,
  particles: [],
  message: '',
  flashTime: 0,
  flashColor: '#10b981',
};

function startWave(n) {
  game.wave = n;
  const count = 2 + n;                         // wave 1: 3 meds → wave 9: 11 meds
  const time = Math.max(8, 30 - (n - 1) * 2);  // wave 1: 30s → wave 12: 8s
  game.timeLeft = time;
  const pool = shuffle(MEDICINES).slice(0, count);
  // Slots: same categories, shuffled order
  const cats = shuffle(pool.map(m => m.category));
  const slotW = Math.max(SLOT_W_MIN, Math.min(110, (W - 80) / count - SHELF_GAP));
  const totalW = count * slotW + (count - 1) * SHELF_GAP;
  const xStart = (W - totalW) / 2;
  game.slots = cats.map((cat, i) => ({
    id: 'slot-' + i, category: cat,
    x: xStart + i * (slotW + SHELF_GAP), y: SHELF_Y, w: slotW, h: SLOT_H,
    placedId: null,
  }));
  // Medicines spawn on table
  const medXStart = (W - count * (MED_W + 18) + 18) / 2;
  game.medicines = pool.map((m, i) => ({
    ...m,
    x: medXStart + i * (MED_W + 18) + MED_W/2,
    y: TABLE_Y - MED_H/2,
    vx: 0, vy: 0,
    slotId: null,
  }));
  game.message = `🔥 Wave ${n} · ${count} loại · ${time}s`;
  sfx.open();
}

function setupGame() {
  game.score = 0;
  game.startedAt = Date.now();
  game.particles = [];
  startWave(1);
  game.state = 'playing';
}

function tryGrab() {
  for (let i = game.medicines.length - 1; i >= 0; i--) {
    const m = game.medicines[i];
    if (inRect(game.cursor.x, game.cursor.y, m.x - MED_W/2, m.y - MED_H/2, MED_W, MED_H)) {
      game.grabbed = m;
      if (m.slotId) { const s = game.slots.find(s => s.id === m.slotId); if (s) s.placedId = null; m.slotId = null; }
      game.medicines.splice(i, 1); game.medicines.push(m);
      sfx.grab();
      return;
    }
  }
}

function tryRelease() {
  if (!game.grabbed) return;
  const m = game.grabbed;
  let best = null, bestDist = Infinity;
  for (const s of game.slots) {
    const cx = s.x + s.w/2, cy = s.y + s.h/2;
    const d = Math.hypot(m.x - cx, m.y - cy);
    if (d < bestDist) { bestDist = d; best = s; }
  }
  if (best && bestDist < SNAP_DIST) {
    if (best.placedId && best.placedId !== m.id) {
      const ex = game.medicines.find(x => x.id === best.placedId);
      if (ex) { ex.x = (W/2) + (Math.random() - 0.5) * 200; ex.y = TABLE_Y - MED_H/2; ex.slotId = null; }
    }
    m.x = best.x + best.w/2;
    m.y = best.y + best.h/2;
    best.placedId = m.id;
    m.slotId = best.id;
    const correct = best.category === m.category;
    if (correct) {
      sfx.correct();
      game.score += 10 + game.wave * 3;
      flash('#10b981');
      checkWaveComplete();
    } else {
      sfx.wrong();
      game.timeLeft = Math.max(0, game.timeLeft - 5);   // -5s penalty
      flash('#ef4444');
      game.message = `❌ Sai! -5s · "${m.name}" thuộc "${m.category}"`;
    }
  }
  game.grabbed = null;
}

function flash(color) { game.flashTime = 0.3; game.flashColor = color; }

function checkWaveComplete() {
  const allPlaced = game.medicines.every(m => m.slotId);
  if (!allPlaced) return;
  const allCorrect = game.medicines.every(m => {
    const s = game.slots.find(s => s.id === m.slotId);
    return s && s.category === m.category;
  });
  if (allCorrect) {
    sfx.perfect();
    const bonus = Math.floor(game.timeLeft) * 5;
    game.score += 100 + bonus;
    game.message = `🎯 WAVE ${game.wave} CLEAR! +${100 + bonus}`;
    setTimeout(() => startWave(game.wave + 1), 900);
  }
}

function gameOver() {
  game.state = 'over';
  const dur = Date.now() - game.startedAt;
  ensurePlayerName().then(() => submitAttempt({
    version: 'time-attack',
    score: game.score,
    correct: game.wave,
    total: game.wave,
    durationMs: dur,
    details: { wavesCleared: game.wave - 1 },
  }));
  sfx.wrong();
  const modal = document.getElementById('result-modal');
  modal.innerHTML = `
    <h2>⏱️ Hết giờ!</h2>
    <div style="font-size:14px;opacity:0.7">Tới được Wave ${game.wave}</div>
    <div class="score">${game.score}</div>
    <div style="font-size:13px;color:#666;margin-bottom:14px">${Math.round(dur/1000)}s tổng</div>
    <button id="again">⚡ Chơi lại</button>
    <button class="secondary" onclick="location.href='./'">← Trang chính</button>
  `;
  modal.style.display = 'block';
  document.getElementById('again').onclick = () => { modal.style.display = 'none'; setupGame(); };
}

// ============================================================
// Input
// ============================================================
function inRect(x, y, rx, ry, rw, rh) { return x >= rx && x <= rx + rw && y >= ry && y <= ry + rh; }

canvas.addEventListener('pointerdown', (e) => {
  if (game.state !== 'playing') return;
  const r = canvas.getBoundingClientRect();
  game.cursor.x = ((e.clientX - r.left) / r.width) * W;
  game.cursor.y = ((e.clientY - r.top) / r.height) * H;
  game.cursor.visible = true;
  game.cursor.pinching = true;
  tryGrab();
});
canvas.addEventListener('pointermove', (e) => {
  if (game.state !== 'playing') return;
  if (!game.grabbed) return;
  const r = canvas.getBoundingClientRect();
  game.cursor.x = ((e.clientX - r.left) / r.width) * W;
  game.cursor.y = ((e.clientY - r.top) / r.height) * H;
});
canvas.addEventListener('pointerup', () => {
  if (game.state !== 'playing') return;
  game.cursor.pinching = false;
  tryRelease();
});

// ============================================================
// Update + draw
// ============================================================
function update(dt) {
  if (game.state !== 'playing') return;
  game.timeLeft -= dt;
  if (game.timeLeft <= 0) { game.timeLeft = 0; gameOver(); return; }
  if (game.flashTime > 0) game.flashTime = Math.max(0, game.flashTime - dt);

  for (const m of game.medicines) {
    if (m === game.grabbed) {
      m.x += (game.cursor.x - m.x) * 0.45;
      m.y += (game.cursor.y - m.y) * 0.45;
    }
  }
}

function roundRect(c, x, y, w, h, r) {
  c.beginPath();
  c.moveTo(x + r, y);
  c.lineTo(x + w - r, y); c.quadraticCurveTo(x + w, y, x + w, y + r);
  c.lineTo(x + w, y + h - r); c.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  c.lineTo(x + r, y + h); c.quadraticCurveTo(x, y + h, x, y + h - r);
  c.lineTo(x, y + r); c.quadraticCurveTo(x, y, x + r, y);
  c.closePath();
}

function draw() {
  ctx.clearRect(0, 0, W, H);

  // Flash overlay
  if (game.flashTime > 0) {
    ctx.fillStyle = game.flashColor;
    ctx.globalAlpha = game.flashTime;
    ctx.fillRect(0, 0, W, H);
    ctx.globalAlpha = 1;
  }

  // Floor
  ctx.fillStyle = 'rgba(120, 50, 0, 0.18)';
  ctx.fillRect(0, TABLE_Y - 8, W, 8);

  // Slots
  for (const s of game.slots) {
    ctx.fillStyle = '#fff8e1';
    roundRect(ctx, s.x, s.y, s.w, s.h, 8); ctx.fill();
    ctx.strokeStyle = '#92400e';
    ctx.lineWidth = 2; ctx.stroke();
    ctx.fillStyle = '#92400e';
    ctx.font = 'bold 11px system-ui';
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    // Wrap text if too long
    const words = s.category.split(' ');
    if (words.length === 1) ctx.fillText(s.category, s.x + s.w/2, s.y + s.h - 12);
    else { ctx.fillText(words[0], s.x + s.w/2, s.y + s.h - 22); ctx.fillText(words.slice(1).join(' '), s.x + s.w/2, s.y + s.h - 8); }
  }

  // Medicines
  for (const m of game.medicines) {
    ctx.save();
    if (m === game.grabbed) { ctx.shadowColor = 'rgba(0,0,0,0.35)'; ctx.shadowBlur = 14; ctx.shadowOffsetY = 6; }
    ctx.fillStyle = m.color;
    roundRect(ctx, m.x - MED_W/2, m.y - MED_H/2, MED_W, MED_H, 6); ctx.fill();
    ctx.fillStyle = '#ffffff';
    roundRect(ctx, m.x - MED_W/2 + 5, m.y - MED_H/2 + 5, MED_W - 10, MED_H - 10, 3); ctx.fill();
    ctx.fillStyle = m.color;
    ctx.font = 'bold 11px system-ui';
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText(m.short, m.x, m.y - 4);
    ctx.font = '9px system-ui';
    ctx.fillStyle = '#444';
    ctx.fillText(m.dose, m.x, m.y + 12);
    ctx.fillStyle = m.color;
    ctx.font = 'bold 8px system-ui';
    ctx.fillText(m.category.toUpperCase().slice(0, 10), m.x, m.y + MED_H/2 - 9);
    ctx.restore();
  }

  // HUD
  ctx.fillStyle = 'rgba(31, 41, 55, 0.92)';
  ctx.fillRect(0, 0, W, 56);
  ctx.fillStyle = '#fbbf24'; ctx.font = 'bold 24px system-ui'; ctx.textAlign = 'left'; ctx.textBaseline = 'middle';
  ctx.fillText(`⚡ Wave ${game.wave}`, 20, 28);
  ctx.fillStyle = '#fff'; ctx.font = 'bold 22px system-ui';
  ctx.fillText('💯 ' + game.score, 220, 28);
  const lowTime = game.timeLeft < 5;
  ctx.fillStyle = lowTime ? '#ef4444' : '#fff';
  ctx.font = 'bold 28px system-ui'; ctx.textAlign = 'right';
  ctx.fillText('⏱️ ' + game.timeLeft.toFixed(1) + 's', W - 20, 28);

  if (game.message) {
    ctx.fillStyle = 'rgba(0,0,0,0.72)';
    const mw = ctx.measureText(game.message).width + 40;
    roundRect(ctx, W/2 - mw/2, H - 50, mw, 34, 17); ctx.fill();
    ctx.fillStyle = '#fff'; ctx.font = '14px system-ui'; ctx.textAlign = 'center';
    ctx.fillText(game.message, W/2, H - 33);
  }
}

let lastTime = performance.now();
function tick(time) {
  const dt = Math.min(0.05, (time - lastTime) / 1000);
  lastTime = time;
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

document.getElementById('start-btn').addEventListener('click', () => {
  document.getElementById('start-overlay').style.display = 'none';
  setupGame();
  lastTime = performance.now();
  requestAnimationFrame(tick);
});
