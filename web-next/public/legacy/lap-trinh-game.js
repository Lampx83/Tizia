// Lưu ý kỹ thuật: code HS chạy trong iframe sandbox để không truy cập DOM/cookie.
// Nhân vật điều khiển qua postMessage protocol giữa iframe ↔ host page.

const LEVELS = [
  {
    title: 'L1: Đi 3 bước',
    desc: 'Viết code đi 3 bước về phía trước. Hàm: <code>forward()</code>',
    grid: 5, hero: [0, 2, 'E'], coins: [], goal: [3, 2],
    reward: { coin: 20, xp: 30 },
  },
  {
    title: 'L2: Quẹo phải',
    desc: 'Đi 2 bước, quẹo phải, đi 2 bước nữa. Hàm: <code>forward()</code>, <code>right()</code>.',
    grid: 5, hero: [0, 0, 'E'], coins: [], goal: [2, 2],
    reward: { coin: 30, xp: 50 },
  },
  {
    title: 'L3: Ăn 3 coin',
    desc: 'Đi qua các ô có coin và <code>pickup()</code> chúng. Cuối cùng tới ô đích.',
    grid: 6, hero: [0, 0, 'E'], coins: [[2,0],[4,0],[4,3]], goal: [4, 5],
    reward: { coin: 40, xp: 70 },
  },
  {
    title: 'L4: Dùng vòng lặp',
    desc: 'Lưới 8x8 — đi đến ô (7,7). Dùng <code>for</code> loop để gọn code.',
    grid: 8, hero: [0, 0, 'E'], coins: [], goal: [7, 7],
    reward: { coin: 60, xp: 110 },
  },
  {
    title: 'L5: Mê cung coin',
    desc: 'Lưới 8x8, 5 coin rải rác. Code thông minh để gom hết coin trước khi tới đích.',
    grid: 8, hero: [0, 0, 'E'], coins: [[2,1],[5,2],[3,5],[6,4],[1,6]], goal: [7, 7],
    reward: { coin: 100, xp: 200 },
  },
];

let currentLv = parseInt(localStorage.getItem('lap-trinh:level') || '0', 10);
let state = null;
let abortRun = false;

const STORAGE_DONE = 'lap-trinh:done';
const done = JSON.parse(localStorage.getItem(STORAGE_DONE) || '[]');

function initLevel(idx) {
  currentLv = idx;
  localStorage.setItem('lap-trinh:level', String(idx));
  const lv = LEVELS[idx];
  state = {
    grid: lv.grid,
    hero: { x: lv.hero[0], y: lv.hero[1], dir: lv.hero[2] },
    coins: lv.coins.map(c => ({ x: c[0], y: c[1], taken: false })),
    coinsCollected: 0,
    coinsMax: lv.coins.length,
    goal: { x: lv.goal[0], y: lv.goal[1] },
    msgs: [],
    finished: false,
  };
  abortRun = true; setTimeout(() => abortRun = false, 100);
  document.getElementById('lv-info').textContent = `Level ${idx + 1} / ${LEVELS.length}`;
  document.getElementById('lv-desc').innerHTML = `<b>${lv.title}</b> — ${lv.desc}`;
  document.getElementById('coin-max').textContent = state.coinsMax;
  document.getElementById('coin-count').textContent = '0';
  document.getElementById('cons').innerHTML = '';
  document.getElementById('status').textContent = 'Sẵn sàng';
  document.getElementById('status').className = 'ok';
  renderTabs();
  draw();
}

function renderTabs() {
  const tabs = document.getElementById('lv-tabs');
  tabs.innerHTML = LEVELS.map((lv, i) => {
    const cls = i === currentLv ? 'cur' : (done.includes(i) ? 'done' : '');
    return `<div class="lv ${cls}" data-i="${i}">${done.includes(i) ? '✓ ' : ''}L${i+1}</div>`;
  }).join('');
  tabs.addEventListener('click', (e) => {
    const el = e.target.closest('.lv');
    if (el) initLevel(Number(el.dataset.i));
  });
}

const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

function draw() {
  const N = state.grid;
  const cell = canvas.width / N;
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  // Grid
  ctx.strokeStyle = 'rgba(255,255,255,0.06)';
  ctx.lineWidth = 1;
  for (let i = 0; i <= N; i++) {
    ctx.beginPath();
    ctx.moveTo(i * cell, 0); ctx.lineTo(i * cell, canvas.height); ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(0, i * cell); ctx.lineTo(canvas.width, i * cell); ctx.stroke();
  }
  // Goal
  ctx.fillStyle = 'rgba(34,197,94,0.32)';
  ctx.fillRect(state.goal.x * cell, state.goal.y * cell, cell, cell);
  ctx.fillStyle = '#22c55e';
  ctx.font = `${cell * 0.55}px sans-serif`;
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  ctx.fillText('🏁', state.goal.x * cell + cell/2, state.goal.y * cell + cell/2);
  // Coins
  for (const c of state.coins) {
    if (c.taken) continue;
    ctx.fillStyle = '#fbbf24';
    ctx.font = `${cell * 0.6}px sans-serif`;
    ctx.fillText('🪙', c.x * cell + cell/2, c.y * cell + cell/2);
  }
  // Hero
  const hx = state.hero.x * cell + cell/2;
  const hy = state.hero.y * cell + cell/2;
  ctx.save();
  ctx.translate(hx, hy);
  const angle = ({E:0, S:90, W:180, N:270})[state.hero.dir] || 0;
  ctx.rotate(angle * Math.PI / 180);
  ctx.font = `${cell * 0.7}px sans-serif`;
  ctx.fillStyle = '#fff';
  ctx.fillText('🤖', 0, 0);
  ctx.restore();
  // Position
  document.getElementById('pos').textContent = `(${state.hero.x}, ${state.hero.y})`;
}

const DELTAS = { E:[1,0], W:[-1,0], N:[0,-1], S:[0,1] };
const TURN_R = { E:'S', S:'W', W:'N', N:'E' };
const TURN_L = { E:'N', N:'W', W:'S', S:'E' };

function cnsLog(text, cls='') {
  const c = document.getElementById('cons');
  const ln = document.createElement('div');
  ln.className = 'line ' + cls;
  ln.textContent = text;
  c.appendChild(ln);
  c.scrollTop = c.scrollHeight;
}

async function runUserCode() {
  if (state.finished) initLevel(currentLv);
  abortRun = false;
  document.getElementById('cons').innerHTML = '';
  document.getElementById('status').textContent = 'Đang chạy…';
  document.getElementById('status').className = 'info';

  const code = document.getElementById('code').value;
  const stepDelay = 350;
  let stepCount = 0;
  const MAX_STEPS = 200;

  const sleep = ms => new Promise(r => setTimeout(r, ms));

  const api = {
    forward: async () => {
      if (abortRun) throw new Error('aborted');
      if (++stepCount > MAX_STEPS) throw new Error('Quá nhiều bước (∞ loop?)');
      const [dx, dy] = DELTAS[state.hero.dir];
      const nx = state.hero.x + dx, ny = state.hero.y + dy;
      if (nx < 0 || ny < 0 || nx >= state.grid || ny >= state.grid) {
        cnsLog('💥 Đụng tường tại (' + nx + ',' + ny + ')', 'err');
        throw new Error('wall');
      }
      state.hero.x = nx; state.hero.y = ny;
      draw();
      await sleep(stepDelay);
    },
    right: async () => {
      if (abortRun) throw new Error('aborted');
      state.hero.dir = TURN_R[state.hero.dir];
      draw();
      await sleep(stepDelay / 2);
    },
    left: async () => {
      if (abortRun) throw new Error('aborted');
      state.hero.dir = TURN_L[state.hero.dir];
      draw();
      await sleep(stepDelay / 2);
    },
    pickup: async () => {
      if (abortRun) throw new Error('aborted');
      const here = state.coins.find(c => !c.taken && c.x === state.hero.x && c.y === state.hero.y);
      if (here) {
        here.taken = true; state.coinsCollected += 1;
        document.getElementById('coin-count').textContent = state.coinsCollected;
        cnsLog(`✨ Nhặt được coin (${here.x},${here.y})!`, 'ok');
        draw();
      } else {
        cnsLog('⚠️ Không có coin ở đây', 'err');
      }
      await sleep(stepDelay / 2);
    },
    say: (text) => cnsLog('💬 ' + String(text), 'info'),
    sleep,
  };

  try {
    // Build async function with API as scope vars
    const fn = new AsyncFunction(
      'forward', 'right', 'left', 'pickup', 'say', 'sleep',
      `'use strict';\n${code}`
    );
    await fn(api.forward, api.right, api.left, api.pickup, api.say, api.sleep);
    cnsLog('✓ Code chạy xong (' + stepCount + ' bước)', 'ok');
    checkVictory();
  } catch (e) {
    if (e.message !== 'aborted') cnsLog('✗ Lỗi: ' + e.message, 'err');
  } finally {
    document.getElementById('status').textContent = 'Sẵn sàng';
    document.getElementById('status').className = 'ok';
  }
}

const AsyncFunction = Object.getPrototypeOf(async function(){}).constructor;

function checkVictory() {
  if (state.finished) return;
  if (state.hero.x !== state.goal.x || state.hero.y !== state.goal.y) {
    cnsLog('🚩 Chưa tới ô đích', 'info'); return;
  }
  if (state.coinsCollected < state.coinsMax) {
    cnsLog(`💰 Còn ${state.coinsMax - state.coinsCollected} coin chưa nhặt`, 'info'); return;
  }
  state.finished = true;
  if (!done.includes(currentLv)) {
    done.push(currentLv);
    localStorage.setItem(STORAGE_DONE, JSON.stringify(done));
  }
  const lv = LEVELS[currentLv];
  const vic = document.getElementById('vic');
  vic.querySelector('[data-vic-title]').textContent = `🏆 Hoàn thành ${lv.title}!`;
  vic.querySelector('[data-vic-msg]').textContent = 'Em đã giải xong level bằng code.';
  vic.querySelector('[data-reward]').textContent = `+${lv.reward.coin} 🪙 · +${lv.reward.xp} ✨`;
  vic.classList.add('open');
  // Reward server: tận dụng claim quest code (chỉ cộng tracking, không trigger
  // chấm thực; gold/coin sẽ vào ví khi user làm các nhiệm vụ chính thức).
  fetch('/api/engagement/track', {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ kind: 'code', amount: 1 }),
    credentials: 'same-origin',
  }).catch(() => {});
  renderTabs();
  // Refresh widgets
  setTimeout(() => { try { window.__tziaEngagementHud?.refresh(); } catch{} try { window.__tziaPetWidget?.refresh(); } catch{} }, 500);
}

document.getElementById('run').addEventListener('click', runUserCode);
document.getElementById('reset').addEventListener('click', () => initLevel(currentLv));
document.getElementById('hint').addEventListener('click', () => {
  const hints = [
    'Gõ: forward(); forward(); forward();',
    'Gõ: forward(); forward(); right(); forward(); forward();',
    'Đi từng ô, đến ô có coin thì pickup(); rồi đi tiếp.',
    'Vòng lặp: for (let i = 0; i < 7; i++) { await forward(); }',
    'Chia làm 2 đoạn: gom coin trước, rồi đi đến goal.',
  ];
  cnsLog('💡 ' + hints[currentLv], 'info');
});

document.getElementById('vic').querySelector('[data-vic-next]').addEventListener('click', () => {
  document.getElementById('vic').classList.remove('open');
  if (currentLv + 1 < LEVELS.length) initLevel(currentLv + 1);
});

initLevel(currentLv);
