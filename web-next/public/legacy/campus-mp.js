// Wrap-mount cho trang Next /campus-mp.
// COPY NGUYÊN VĂN inline <script type="module"> của public/campus-mp.html —
// KHÔNG dịch sang React, KHÔNG đổi hành vi. Canvas 2.5D iso đa người chơi:
// presence real-time qua WebSocket /ws-presence, chọn phòng, chat, di chuyển
// bằng phím/nút, avatar = pet emoji lấy từ /api/pet/me. Content (tên phòng,
// nhãn UI) nằm trong skeleton DOM (page.tsx) + hardcode trong script gốc.
// Asset ngoài (WebSocket, /api/pet/me) chạy qua fallback proxy của Next sang Express.

const canvas = document.getElementById('world');
const ctx = canvas.getContext('2d');
let W = 800, H = 600;
function resize() {
  W = window.innerWidth; H = window.innerHeight;
  canvas.width = W * devicePixelRatio;
  canvas.height = H * devicePixelRatio;
  canvas.style.width = W + 'px';
  canvas.style.height = H + 'px';
  ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
}
window.addEventListener('resize', resize); resize();

const TILE = 48;
const GRID = 16;       // 16x16 logical world
const ORIGIN = () => ({ x: W/2 - (GRID*TILE)/2, y: H/2 - (GRID*TILE)/2 });

const me = { id: null, name: 'Bạn', x: 8, y: 8, dir: 'S', pet: '🦉' };
const others = new Map();   // user_id → {x, y, dir, name, pet}
let ws = null, currentRoom = 'lobby';

function setStatus(text, ok=false) {
  const el = document.getElementById('ws-status');
  el.textContent = text;
  el.classList.toggle('off', !ok);
}

function connect() {
  const proto = location.protocol === 'https:' ? 'wss:' : 'ws:';
  ws = new WebSocket(`${proto}//${location.host}/ws-presence`);
  ws.onopen = () => {
    setStatus('🟢 Online', true);
    sendJoin(currentRoom);
  };
  ws.onclose = () => {
    setStatus('🔴 Mất kết nối', false);
    setTimeout(connect, 3000);
  };
  ws.onerror = () => {};
  ws.onmessage = (e) => {
    let msg; try { msg = JSON.parse(e.data); } catch { return; }
    handle(msg);
  };
}

function send(payload) { if (ws && ws.readyState === 1) ws.send(JSON.stringify(payload)); }
function sendMove() {
  send({ type:'move', x: me.x, y: me.y, dir: me.dir, pet: me.pet });
}
function sendJoin(room) {
  send({ type:'join_room', room });
  others.clear();
  appendChat('sys', `📍 Đã vào phòng "${room}"`);
}

function handle(msg) {
  if (msg.type === 'hello') {
    me.id = msg.you.user_id; me.name = msg.you.name || 'Bạn';
    appendChat('sys', `👋 Xin chào ${me.name}!`);
    for (const p of msg.players || []) {
      if (p.user_id !== me.id) others.set(p.user_id, p);
    }
    renderPlayers();
    sendMove();
  } else if (msg.type === 'room') {
    others.clear();
    for (const p of msg.players || []) {
      if (p.user_id !== me.id) others.set(p.user_id, p);
    }
    renderPlayers();
    sendMove();
  } else if (msg.type === 'join') {
    if (msg.user_id !== me.id) {
      others.set(msg.user_id, { user_id: msg.user_id, name: msg.name, x: 8, y: 8, dir: 'S' });
      appendChat('sys', `→ ${msg.name} đã vào phòng`);
      toast(`👋 ${msg.name} đã vào`);
      renderPlayers();
    }
  } else if (msg.type === 'leave') {
    const p = others.get(msg.user_id);
    if (p) appendChat('sys', `← ${p.name} đã rời phòng`);
    others.delete(msg.user_id);
    renderPlayers();
  } else if (msg.type === 'move') {
    const p = others.get(msg.user_id);
    if (p) { p.x = msg.x; p.y = msg.y; p.dir = msg.dir; p.pet = msg.pet; }
    else others.set(msg.user_id, { user_id: msg.user_id, x: msg.x, y: msg.y, dir: msg.dir, pet: msg.pet });
  } else if (msg.type === 'chat') {
    appendChat(msg.user_id === me.id ? 'me' : 'other', `${msg.name || '?'}: ${msg.text}`);
  } else if (msg.type === 'error' && msg.error === 'unauthorized') {
    setStatus('❌ Cần đăng nhập', false);
    appendChat('sys', 'Hãy đăng nhập trước. Quay lại trang chủ để đăng nhập.');
  }
}

function appendChat(cls, html) {
  const m = document.createElement('div');
  m.className = 'm ' + cls;
  m.innerHTML = cls === 'me' ? `<b>(em)</b> ${esc(html.replace(/.*?: /, ''))}`
              : cls === 'other' ? `<b>${esc(html.split(': ')[0])}</b>: ${esc(html.split(': ').slice(1).join(': '))}`
              : esc(html);
  document.getElementById('msgs').appendChild(m);
  const msgs = document.getElementById('msgs');
  msgs.scrollTop = msgs.scrollHeight;
}
function esc(s) { return String(s||'').replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c])); }

function renderPlayers() {
  const list = document.getElementById('players');
  const all = [{ user_id: me.id, name: me.name, isMe: true }, ...[...others.values()]];
  list.innerHTML = `<h4>👥 Đang online (${all.length})</h4>` + all.map(p => `
    <div class="p ${p.isMe ? 'me' : ''}">
      <span class="dot"></span>
      <span class="name">${esc(p.name || '?')}</span>
      ${p.isMe ? '<span class="me-tag">YOU</span>' : ''}
    </div>
  `).join('');
}

function toast(text) {
  const t = document.getElementById('toast');
  t.textContent = text;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 1800);
}

function draw() {
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(0, 0, W, H);
  const o = ORIGIN();
  // Tile grid + bg
  for (let y = 0; y < GRID; y++) {
    for (let x = 0; x < GRID; x++) {
      const cx = o.x + x * TILE, cy = o.y + y * TILE;
      ctx.fillStyle = (x + y) % 2 === 0 ? '#1e293b' : '#162033';
      ctx.fillRect(cx, cy, TILE, TILE);
    }
  }
  // Walls border
  ctx.strokeStyle = 'rgba(251,191,36,0.4)';
  ctx.lineWidth = 3;
  ctx.strokeRect(o.x, o.y, GRID * TILE, GRID * TILE);

  // Other players
  for (const p of others.values()) {
    drawPlayer(p.x, p.y, p.name, p.pet || '👤', '#a78bfa');
  }
  // Me
  drawPlayer(me.x, me.y, me.name + ' (em)', me.pet, '#fbbf24');
}

function drawPlayer(x, y, name, pet, ringColor) {
  const o = ORIGIN();
  const cx = o.x + x * TILE + TILE/2;
  const cy = o.y + y * TILE + TILE/2;
  // Ring
  ctx.beginPath();
  ctx.arc(cx, cy + 3, TILE * 0.42, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(0,0,0,0.4)';
  ctx.fill();
  // Avatar circle
  ctx.beginPath();
  ctx.arc(cx, cy, TILE * 0.35, 0, Math.PI * 2);
  ctx.fillStyle = ringColor + '33';
  ctx.fill();
  ctx.strokeStyle = ringColor;
  ctx.lineWidth = 2;
  ctx.stroke();
  // Pet emoji
  ctx.font = `${TILE * 0.5}px sans-serif`;
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  ctx.fillStyle = '#fff';
  ctx.fillText(pet || '👤', cx, cy);
  // Name tag
  ctx.font = '12px Inter';
  ctx.textBaseline = 'top';
  const tw = ctx.measureText(name).width;
  ctx.fillStyle = 'rgba(0,0,0,0.7)';
  ctx.fillRect(cx - tw/2 - 6, cy + TILE*0.35 + 2, tw + 12, 18);
  ctx.fillStyle = '#fff';
  ctx.fillText(name, cx, cy + TILE*0.35 + 4);
}

function tick() {
  draw();
  requestAnimationFrame(tick);
}
tick();

// Controls
function move(dir) {
  me.dir = dir;
  if (dir === 'N') me.y = Math.max(0, me.y - 1);
  if (dir === 'S') me.y = Math.min(GRID-1, me.y + 1);
  if (dir === 'W') me.x = Math.max(0, me.x - 1);
  if (dir === 'E') me.x = Math.min(GRID-1, me.x + 1);
  sendMove();
}
window.addEventListener('keydown', (e) => {
  const k = { ArrowUp:'N', ArrowDown:'S', ArrowLeft:'W', ArrowRight:'E',
              w:'N', s:'S', a:'W', d:'E' }[e.key];
  if (k) { e.preventDefault(); move(k); }
});
document.querySelectorAll('.controls button[data-mv]').forEach(b => {
  b.addEventListener('click', () => move(b.dataset.mv));
});
document.getElementById('room-picker').addEventListener('click', (e) => {
  const el = e.target.closest('.r');
  if (!el) return;
  document.querySelectorAll('.room-picker .r').forEach(r => r.classList.remove('cur'));
  el.classList.add('cur');
  currentRoom = el.dataset.room;
  sendJoin(currentRoom);
});
document.getElementById('chat-in').addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    const text = e.target.value.trim();
    if (text) { send({ type:'chat', text }); e.target.value = ''; }
  }
});

// Bootstrap: lấy pet user → set me.pet, sau đó connect
async function init() {
  try {
    const r = await fetch('/api/pet/me', { credentials: 'same-origin' });
    if (r.ok) { const d = await r.json(); me.pet = d.pet?.sprite || '🦉'; }
  } catch {}
  connect();
}
init();
