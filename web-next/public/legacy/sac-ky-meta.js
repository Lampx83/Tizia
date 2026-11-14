import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { submitAttempt, getPlayerName, setPlayerName } from '/js/api.js';
import { sfx } from '/js/sfx.js';

// =============================================================
// MULTIPLAYER STATE
// =============================================================
let ws = null;
let myId = null;
let myColor = '#ec4899';
const remotePlayers = new Map(); // id → { name, color, mesh, label, step, score }

// =============================================================
// LOCAL GAME STATE
// =============================================================
const SAMPLES = [
  { id: 'A', hex: 0xef4444, trueRf: 0.30 },
  { id: 'B', hex: 0x3b82f6, trueRf: 0.55 },
  { id: 'C', hex: 0x22c55e, trueRf: 0.78 },
];
let state;
function newState() {
  state = {
    step: 1, score: 0,
    startedAt: performance.now(), finishedAt: null,
    capillary: null, plateSpots: [], chamberFilled: false,
    plateInChamber: false, devProgress: 0, devStartTime: null,
    plateRemoved: false, measurements: {},
  };
}

// =============================================================
// SCENE
// =============================================================
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x1a1f2e);
scene.fog = new THREE.Fog(0x1a1f2e, 12, 35);

const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.set(0, 3, 6);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = true;
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.05;
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 1.5, 0);
controls.minDistance = 3; controls.maxDistance = 14;
controls.maxPolarAngle = Math.PI * 0.49;
controls.enableDamping = true;
controls.dampingFactor = 0.07;

// Lighting
scene.add(new THREE.AmbientLight(0xfff5e6, 0.45));
const sun = new THREE.DirectionalLight(0xfff5e0, 0.7);
sun.position.set(4, 8, 5);
sun.castShadow = true;
sun.shadow.mapSize.set(2048, 2048);
sun.shadow.camera.left = -10; sun.shadow.camera.right = 10;
sun.shadow.camera.top = 10; sun.shadow.camera.bottom = -10;
scene.add(sun);
scene.add(new THREE.PointLight(0xec4899, 0.5, 16, 2));
scene.add(new THREE.PointLight(0xa78bfa, 0.4, 16, 2));

// === BIG LAB ROOM ===
function makeTileTexture() {
  const c = document.createElement('canvas');
  c.width = c.height = 128;
  const ctx = c.getContext('2d');
  ctx.fillStyle = '#e2e8f0'; ctx.fillRect(0, 0, 128, 128);
  ctx.fillStyle = '#94a3b8'; ctx.fillRect(0, 0, 64, 64); ctx.fillRect(64, 64, 64, 64);
  ctx.strokeStyle = 'rgba(0,0,0,0.18)'; ctx.lineWidth = 2;
  ctx.strokeRect(0, 0, 64, 64); ctx.strokeRect(64, 0, 64, 64);
  ctx.strokeRect(0, 64, 64, 64); ctx.strokeRect(64, 64, 64, 64);
  const tex = new THREE.CanvasTexture(c);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(10, 10);
  return tex;
}
const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(30, 24),
  new THREE.MeshStandardMaterial({ map: makeTileTexture(), roughness: 0.8 })
);
floor.rotation.x = -Math.PI / 2;
floor.position.y = -0.05;
floor.receiveShadow = true;
scene.add(floor);

// 4 walls
const wallMat = new THREE.MeshStandardMaterial({ color: 0xc9dce8, roughness: 0.9 });
[[0, 4, -12, 30, 8, 0], [0, 4, 12, 30, 8, Math.PI], [-15, 4, 0, 24, 8, Math.PI/2], [15, 4, 0, 24, 8, -Math.PI/2]].forEach(([x,y,z,w,h,ry]) => {
  const wall = new THREE.Mesh(new THREE.PlaneGeometry(w, h), wallMat);
  wall.position.set(x, y, z); wall.rotation.y = ry;
  scene.add(wall);
});

// Ceiling
const ceiling = new THREE.Mesh(
  new THREE.PlaneGeometry(30, 24),
  new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 1 })
);
ceiling.rotation.x = Math.PI / 2;
ceiling.position.y = 8;
scene.add(ceiling);

// Multiple lab benches in a row (so each player has one)
const benchPositions = [
  { x: -7, z: 0 },
  { x: -3, z: 0 },
  { x: 1, z: 0 },
  { x: 5, z: 0 },
  { x: -7, z: 4 },
  { x: -3, z: 4 },
  { x: 1, z: 4 },
  { x: 5, z: 4 },
];
function makeBench(x, z, mine = false) {
  const g = new THREE.Group();
  const top = new THREE.Mesh(
    new THREE.BoxGeometry(3.2, 0.12, 1.6),
    new THREE.MeshStandardMaterial({ color: mine ? 0xfde68a : 0xf1f5f9, roughness: 0.4, metalness: 0.1 })
  );
  top.castShadow = top.receiveShadow = true;
  top.position.y = 0.95;
  g.add(top);
  const cab = new THREE.Mesh(
    new THREE.BoxGeometry(3.0, 0.85, 1.4),
    new THREE.MeshStandardMaterial({ color: 0xe2e8f0, roughness: 0.6 })
  );
  cab.position.y = 0.45;
  cab.castShadow = true;
  g.add(cab);
  // Stool in front
  const stool = new THREE.Mesh(
    new THREE.CylinderGeometry(0.22, 0.22, 0.55, 16),
    new THREE.MeshStandardMaterial({ color: 0x64748b })
  );
  stool.position.set(0, 0.27, 1.4);
  g.add(stool);
  g.position.set(x, 0, z);
  return g;
}

const myBench = makeBench(benchPositions[0].x, benchPositions[0].z, true);
scene.add(myBench);
// Add ghost benches for other players
const ghostBenches = [];
for (let i = 1; i < benchPositions.length; i++) {
  const b = makeBench(benchPositions[i].x, benchPositions[i].z, false);
  ghostBenches.push(b);
  scene.add(b);
}

// Lab equipment on my bench (simplified — copy from 3d but small)
const myEquip = new THREE.Group();
myEquip.position.set(benchPositions[0].x, 1.01, benchPositions[0].z);
scene.add(myEquip);

// Bottles ABC
SAMPLES.forEach((s, i) => {
  const bg = new THREE.Group();
  const body = new THREE.Mesh(
    new THREE.CylinderGeometry(0.12, 0.12, 0.30, 20),
    new THREE.MeshPhysicalMaterial({ color: 0xffffff, transparent: true, opacity: 0.4, roughness: 0.1, transmission: 0.8 })
  );
  body.position.y = 0.18; bg.add(body); body.castShadow = true;
  const liq = new THREE.Mesh(
    new THREE.CylinderGeometry(0.10, 0.10, 0.22, 16),
    new THREE.MeshStandardMaterial({ color: s.hex, roughness: 0.3 })
  );
  liq.position.y = 0.15; bg.add(liq);
  const cap = new THREE.Mesh(
    new THREE.CylinderGeometry(0.06, 0.06, 0.06, 12),
    new THREE.MeshStandardMaterial({ color: 0x1f1147 })
  );
  cap.position.y = 0.36; bg.add(cap);
  const lc = document.createElement('canvas'); lc.width = 60; lc.height = 60;
  const lctx = lc.getContext('2d');
  lctx.fillStyle = '#fefce8'; lctx.fillRect(0, 0, 60, 60);
  lctx.fillStyle = '#1e293b'; lctx.font = 'bold 36px sans-serif'; lctx.textAlign = 'center';
  lctx.fillText(s.id, 30, 42);
  const lt = new THREE.CanvasTexture(lc);
  const label = new THREE.Mesh(new THREE.PlaneGeometry(0.14, 0.10), new THREE.MeshBasicMaterial({ map: lt, transparent: true }));
  label.position.set(0, 0.18, 0.125); bg.add(label);
  bg.position.set(-1.0 + i * 0.35, 0, 0.3);
  bg.userData.type = 'sample';
  bg.userData.sampleId = s.id;
  myEquip.add(bg);
});

// Plate
const plateGroup = new THREE.Group();
const plateMesh = new THREE.Mesh(
  new THREE.BoxGeometry(0.40, 0.70, 0.02),
  new THREE.MeshStandardMaterial({ color: 0xfef3c7 })
);
plateMesh.castShadow = true;
plateGroup.add(plateMesh);
const plateTexC = document.createElement('canvas');
plateTexC.width = 160; plateTexC.height = 280;
const ptctx = plateTexC.getContext('2d');
function redrawPlate() {
  ptctx.fillStyle = '#fef3c7'; ptctx.fillRect(0, 0, 160, 280);
  ptctx.strokeStyle = '#92400e'; ptctx.lineWidth = 2; ptctx.strokeRect(2, 2, 156, 276);
  ptctx.setLineDash([4, 3]);
  ptctx.strokeStyle = '#6b7280';
  const oy = 280 * 0.85;
  ptctx.beginPath(); ptctx.moveTo(12, oy); ptctx.lineTo(148, oy); ptctx.stroke();
  ptctx.setLineDash([]);
  if (state && state.devProgress >= 1) {
    ptctx.strokeStyle = '#ef4444'; ptctx.setLineDash([3, 2]);
    ptctx.beginPath(); ptctx.moveTo(12, 14); ptctx.lineTo(148, 14); ptctx.stroke();
    ptctx.setLineDash([]);
  }
  if (state) for (const spot of state.plateSpots) {
    const s = SAMPLES.find(x => x.id === spot.sampleId);
    const dx = 30 + spot.position * 100;
    const rise = state.devProgress * (280 * 0.7) * s.trueRf;
    const dy = oy - rise;
    ptctx.fillStyle = '#' + s.hex.toString(16).padStart(6, '0');
    ptctx.beginPath(); ptctx.arc(dx, dy, state.devProgress > 0 ? 7 : 5, 0, Math.PI * 2); ptctx.fill();
  }
  plateTex.needsUpdate = true;
}
const plateTex = new THREE.CanvasTexture(plateTexC);
plateMesh.material.map = plateTex; plateMesh.material.needsUpdate = true;
plateGroup.position.set(0, 0.38, 0);
plateGroup.userData.type = 'plate';
myEquip.add(plateGroup);

// Capillary
const cap = new THREE.Mesh(
  new THREE.CylinderGeometry(0.02, 0.02, 0.35, 10),
  new THREE.MeshStandardMaterial({ color: 0xcccccc })
);
cap.position.set(0.7, 0.18, 0.3);
cap.rotation.z = -0.15;
myEquip.add(cap);

// Chamber (smaller)
const chamberG = new THREE.Group();
const gmat = new THREE.MeshPhysicalMaterial({ color: 0xffffff, transparent: true, opacity: 0.2, roughness: 0.05, transmission: 0.85, ior: 1.45, side: THREE.DoubleSide });
const cw = 0.55, ch = 0.85, cd = 0.32;
const cflr = new THREE.Mesh(new THREE.BoxGeometry(cw, 0.02, cd), gmat);
cflr.position.y = 0.01; chamberG.add(cflr);
[[cw, ch, 0.02, 0, ch/2, cd/2], [cw, ch, 0.02, 0, ch/2, -cd/2], [0.02, ch, cd, -cw/2, ch/2, 0], [0.02, ch, cd, cw/2, ch/2, 0]].forEach(([a,b,c,x,y,z]) => {
  const m = new THREE.Mesh(new THREE.BoxGeometry(a,b,c), gmat);
  m.position.set(x,y,z); chamberG.add(m);
});
const sol = new THREE.Mesh(new THREE.BoxGeometry(cw-0.04, 0.18, cd-0.04), new THREE.MeshStandardMaterial({ color: 0xa78bfa, transparent: true, opacity: 0.55 }));
sol.position.y = 0.10; sol.visible = false; chamberG.add(sol);
chamberG.userData.type = 'chamber';
chamberG.userData.sol = sol;
chamberG.position.set(1.2, 0, 0);
myEquip.add(chamberG);

// Solvent bottle
const sbG = new THREE.Group();
const sb = new THREE.Mesh(
  new THREE.CylinderGeometry(0.15, 0.15, 0.4, 18),
  new THREE.MeshPhysicalMaterial({ color: 0xffffff, transparent: true, opacity: 0.3, roughness: 0.06, transmission: 0.8 })
);
sb.position.y = 0.22; sbG.add(sb);
const sbl = new THREE.Mesh(
  new THREE.CylinderGeometry(0.13, 0.13, 0.30, 14),
  new THREE.MeshStandardMaterial({ color: 0xa78bfa, transparent: true, opacity: 0.7 })
);
sbl.position.y = 0.18; sbG.add(sbl);
sbG.position.set(0.4, 0, -0.3);
sbG.userData.type = 'solvent';
myEquip.add(sbG);

// === REMOTE PLAYER AVATARS ===
const labelSprites = new Map();
function makeAvatarMesh(color) {
  const g = new THREE.Group();
  // Head sphere
  const head = new THREE.Mesh(
    new THREE.SphereGeometry(0.18, 16, 12),
    new THREE.MeshStandardMaterial({ color, roughness: 0.4, metalness: 0.2 })
  );
  head.position.y = 1.5;
  head.castShadow = true;
  g.add(head);
  // Body capsule (cone)
  const body = new THREE.Mesh(
    new THREE.CylinderGeometry(0.2, 0.35, 0.85, 14),
    new THREE.MeshStandardMaterial({ color, roughness: 0.6 })
  );
  body.position.y = 0.85;
  body.castShadow = true;
  g.add(body);
  // Eye dots
  for (const x of [-0.06, 0.06]) {
    const eye = new THREE.Mesh(
      new THREE.SphereGeometry(0.025, 8, 6),
      new THREE.MeshBasicMaterial({ color: 0xffffff })
    );
    eye.position.set(x, 1.52, 0.15);
    g.add(eye);
  }
  return g;
}
function makeNameLabel(text, color) {
  const c = document.createElement('canvas');
  c.width = 256; c.height = 64;
  const ctx = c.getContext('2d');
  ctx.fillStyle = 'rgba(0,0,0,0.7)'; ctx.fillRect(0, 0, 256, 64);
  ctx.strokeStyle = color; ctx.lineWidth = 3; ctx.strokeRect(2, 2, 252, 60);
  ctx.fillStyle = 'white'; ctx.font = 'bold 22px sans-serif'; ctx.textAlign = 'center';
  ctx.fillText(text.slice(0, 16), 128, 40);
  const tex = new THREE.CanvasTexture(c);
  const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, transparent: true }));
  sprite.scale.set(0.8, 0.2, 1);
  return sprite;
}

function addRemotePlayer(p) {
  if (remotePlayers.has(p.id) || p.id === myId) return;
  const mesh = makeAvatarMesh(p.color);
  scene.add(mesh);
  const label = makeNameLabel(p.name, p.color);
  label.position.y = 1.95;
  mesh.add(label);
  // Position at one of the ghost benches (cycle by id)
  const bIdx = (p.id - 1) % ghostBenches.length;
  const bp = benchPositions[(bIdx + 1) % benchPositions.length];
  mesh.position.set(bp.x, 0, bp.z + 1.4);
  mesh.lookAt(bp.x, 1.5, bp.z);
  remotePlayers.set(p.id, { name: p.name, color: p.color, step: p.step || 1, score: p.score || 0, mesh, label });
  refreshPlayersList();
  addChatSystem(`👋 ${p.name} đã vào phòng`);
  sfx.join();
}
function removeRemotePlayer(id) {
  const r = remotePlayers.get(id);
  if (!r) return;
  scene.remove(r.mesh);
  remotePlayers.delete(id);
  refreshPlayersList();
  addChatSystem(`👋 ${r.name} đã rời phòng`);
  sfx.leave();
}

// =============================================================
// INTERACTION (only on my bench)
// =============================================================
const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();
let hoveredObj = null;

renderer.domElement.addEventListener('pointermove', (e) => {
  pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
  pointer.y = -(e.clientY / window.innerHeight) * 2 + 1;
});
renderer.domElement.addEventListener('click', () => {
  raycaster.setFromCamera(pointer, camera);
  const hits = raycaster.intersectObjects(myEquip.children, true);
  for (const hit of hits) {
    let cur = hit.object;
    while (cur && !cur.userData.type) cur = cur.parent;
    if (cur && cur.userData.type) {
      handleClick(cur);
      return;
    }
  }
});

function handleClick(obj) {
  const t = obj.userData.type;
  if (state.step <= 2 && t === 'sample') {
    if (state.capillary) { toast('Chấm lên đĩa trước', 'err'); return; }
    state.capillary = obj.userData.sampleId;
    state.step = 2;
    toast(`🧪 Hút ${obj.userData.sampleId}`, 'ok');
    sfx.grab();
    sendAction('hút mẫu ' + obj.userData.sampleId);
  } else if (state.step <= 2 && t === 'plate' && state.capillary) {
    if (state.plateSpots.some(s => s.sampleId === state.capillary)) {
      toast(`Mẫu ${state.capillary} đã chấm`, 'err'); return;
    }
    const pos = state.plateSpots.length / 3 + 0.16;
    state.plateSpots.push({ sampleId: state.capillary, position: pos });
    state.score += 20;
    toast(`✓ Chấm ${state.capillary}`, 'ok');
    sfx.correct();
    sendAction('chấm ' + state.capillary);
    state.capillary = null;
    redrawPlate();
    if (state.plateSpots.length >= 3) { state.step = 3; }
    else state.step = 1;
  } else if (state.step === 3 && t === 'solvent') {
    state.chamberFilled = true;
    chamberG.userData.sol.visible = true;
    state.score += 20; state.step = 4;
    toast('✓ Đổ dung môi', 'ok');
    sfx.correct();
    sendAction('đổ dung môi');
  } else if (state.step === 4 && t === 'plate') {
    state.plateInChamber = true;
    state.devStartTime = performance.now();
    state.score += 20; state.step = 5;
    toast('✓ Đặt đĩa', 'ok');
    sfx.grab();
    sendAction('triển khai');
    btnAction.disabled = true;
    // Move plate into chamber
    plateGroup.position.set(chamberG.position.x, 0.38, chamberG.position.z);
  } else if (state.step === 6 && t === 'plate' && state.plateRemoved) {
    // Find unmeasured spot
    const next = state.plateSpots.find(sp => !(sp.sampleId in state.measurements));
    if (next) promptRf(SAMPLES.find(s => s.id === next.sampleId));
  }
  updateUI();
  sendProgress();
}

const btnAction = document.getElementById('btn-action');
const btnRestart = document.getElementById('btn-restart');
btnAction.addEventListener('click', () => {
  if (state.step === 5 && state.devProgress >= 1) {
    state.plateInChamber = false;
    state.plateRemoved = true;
    state.step = 6;
    state.score += 20;
    btnAction.textContent = '✓ Hoàn thành đo Rf';
    plateGroup.position.set(0, 0.38, 0); // back to bench center
    sendAction('lấy đĩa ra');
  } else if (state.step === 6) {
    finishGame();
  }
});
btnRestart.addEventListener('click', () => {
  newState();
  redrawPlate();
  chamberG.userData.sol.visible = false;
  plateGroup.position.set(0, 0.38, 0);
  btnAction.disabled = true;
  btnAction.textContent = 'Thao tác';
  updateUI();
});

function promptRf(sample) {
  const g = prompt(`Rf của ${sample.id} (0-1):`, '0.50');
  if (g === null) return;
  const v = parseFloat(g);
  if (isNaN(v) || v < 0 || v > 1) { toast('Rf 0-1', 'err'); return; }
  state.measurements[sample.id] = v;
  const err = Math.abs(v - sample.trueRf);
  let pts = err <= 0.05 ? 30 : err <= 0.10 ? 15 : 0;
  state.score += pts;
  toast(pts > 0 ? `✓ ${sample.id} +${pts}` : `✗ ${sample.id} sai`, pts > 0 ? 'ok' : 'err');
  if (pts > 0) sfx.correct(); else sfx.wrong();
  sendAction('đo Rf ' + sample.id);
  updateUI();
  sendProgress();
}

const TUTORIALS_META = {
  1: { n: 2, title: 'Chấm mẫu lên đĩa', body: 'Click 1 lọ A/B/C để hút mẫu vào mao quản.', hint: '💡 Người khác sẽ thấy "✨ bạn đang hút mẫu" trong chat.' },
  2: { n: 2, title: 'Chấm vào đĩa TLC', body: 'Mao quản đã có mẫu — click vào đĩa TLC trên bàn để chấm.', hint: '💡 Cần chấm đủ 3 mẫu (A+B+C).' },
  3: { n: 3, title: 'Pha pha động', body: 'Click vào lọ dung môi để đổ vào bình triển khai.', hint: '💡 Mọi người trong phòng cùng làm độc lập.' },
  4: { n: 4, title: 'Triển khai sắc ký', body: 'Click vào đĩa TLC để đặt vào bình triển khai.', hint: '💡 Đường gốc phải cao hơn mặt dung môi.' },
  5: { n: 4, title: 'Đang triển khai...', body: 'Dung môi đang chạy. Chờ ~5 giây.', hint: '⏳ Có thể chat với các SV khác trong khi chờ.' },
  6: { n: 6, title: 'Đo R<sub>f</sub>', body: 'Click vào đĩa TLC để đo R<sub>f</sub> từng vệt theo thứ tự A→B→C.', hint: '💡 Đo nhanh để tăng bonus thời gian.' },
};
function updateUI() {
  const stepMap = { 1: '2/6 · Chấm mẫu', 2: '2/6 · Chấm mẫu', 3: '3/6 · Pha pha động', 4: '4/6 · Triển khai', 5: state.devProgress >= 1 ? '5/6 · Lấy đĩa ra' : '4/6 · Triển khai', 6: '6/6 · Đo Rf' };
  document.getElementById('step-pill').textContent = `Bước ${stepMap[state.step] || ''}`;
  document.getElementById('score').textContent = state.score;
  const stepKey = state.step === 5 && state.devProgress >= 1 ? 6 : state.step;
  const tut = TUTORIALS_META[stepKey] || TUTORIALS_META[1];
  document.getElementById('tut-num').textContent = tut.n;
  document.getElementById('tut-title').innerHTML = tut.title;
  document.getElementById('tut-body').innerHTML = tut.body;
  document.getElementById('tut-hint').innerHTML = tut.hint;
}
function toast(text, kind = '') {
  const el = document.createElement('div');
  el.className = 'toast ' + kind; el.textContent = text;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 2000);
}
function refreshPlayersList() {
  const ul = document.getElementById('players-list');
  const all = [];
  // Me first
  if (myId) all.push({ id: myId, name: getPlayerName() || 'Bạn', color: myColor, step: state?.step ?? 1, score: state?.score ?? 0, me: true });
  for (const [id, p] of remotePlayers) all.push({ id, ...p });
  ul.innerHTML = all.map(p => `
    <div class="player-row ${p.me ? 'me' : ''}">
      <div class="dot" style="background:${p.color}"></div>
      <div class="info">
        <div class="name">${p.name}</div>
        <div class="meta">Bước ${p.step ?? 1} · 🎯 ${p.score ?? 0}</div>
      </div>
    </div>`).join('');
  document.getElementById('badge-live').textContent = `LIVE · ${all.length}`;
}

// =============================================================
// WEBSOCKET
// =============================================================
function connect() {
  const proto = location.protocol === 'https:' ? 'wss:' : 'ws:';
  const base = location.pathname.replace(/\/[^/]*$/, '');
  const wsUrl = `${proto}//${location.host}${base}/ws-sacky`;
  ws = new WebSocket(wsUrl);
  ws.addEventListener('open', () => {
    ws.send(JSON.stringify({ type: 'join', name: getPlayerName() || 'Học viên' }));
  });
  ws.addEventListener('message', (e) => {
    let msg; try { msg = JSON.parse(e.data); } catch { return; }
    handleWsMsg(msg);
  });
  ws.addEventListener('close', () => {
    toast('Mất kết nối phòng', 'err');
    setTimeout(connect, 2000);
  });
}

function handleWsMsg(msg) {
  switch (msg.type) {
    case 'welcome': {
      myId = msg.id; myColor = msg.color;
      for (const p of msg.snapshot.players) {
        if (p.id !== myId) addRemotePlayer(p);
      }
      refreshPlayersList();
      addChatSystem(`Đã vào phòng · ${msg.snapshot.players.length} người`);
      break;
    }
    case 'join': addRemotePlayer(msg.player); break;
    case 'leave': removeRemotePlayer(msg.id); break;
    case 'avatar': {
      const r = remotePlayers.get(msg.id);
      if (r) {
        r.mesh.position.set(msg.x, msg.y - 1.5, msg.z); // ground
        r.mesh.rotation.y = msg.ry || 0;
      }
      break;
    }
    case 'progress': {
      const r = remotePlayers.get(msg.id);
      if (r) { r.step = msg.step; r.score = msg.score; refreshPlayersList(); }
      break;
    }
    case 'action': {
      const r = remotePlayers.get(msg.id);
      if (r) addChatSystem(`✨ ${r.name} đang ${msg.name}`);
      break;
    }
    case 'chat': addChat(msg.name, msg.color, msg.text); break;
  }
}

function sendProgress() {
  if (!ws || ws.readyState !== 1) return;
  ws.send(JSON.stringify({ type: 'progress', step: state.step, score: state.score }));
  refreshPlayersList();
}
function sendAction(name) {
  if (!ws || ws.readyState !== 1) return;
  ws.send(JSON.stringify({ type: 'action', name }));
}

// =============================================================
// CHAT
// =============================================================
function addChat(name, color, text) {
  const log = document.getElementById('chat-log');
  const div = document.createElement('div');
  div.className = 'chat-msg';
  div.innerHTML = `<span class="author" style="color:${color}">${name}:</span> ${escapeHtml(text)}`;
  log.appendChild(div);
  log.scrollTop = log.scrollHeight;
}
function addChatSystem(text) {
  const log = document.getElementById('chat-log');
  const div = document.createElement('div');
  div.className = 'chat-msg system';
  div.textContent = text;
  log.appendChild(div);
  log.scrollTop = log.scrollHeight;
}
function escapeHtml(s) { return String(s).replace(/[&<>"']/g, c => ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[c])); }

document.getElementById('chat-send').addEventListener('click', sendChat);
document.getElementById('chat-input').addEventListener('keydown', e => {
  if (e.key === 'Enter') sendChat();
});
function sendChat() {
  const inp = document.getElementById('chat-input');
  const text = inp.value.trim();
  if (!text || !ws || ws.readyState !== 1) return;
  ws.send(JSON.stringify({ type: 'chat', text }));
  inp.value = '';
}

// =============================================================
// JOIN
// =============================================================
const nameInp = document.getElementById('name-input');
nameInp.value = getPlayerName() || '';
document.getElementById('join-btn').addEventListener('click', () => {
  const n = nameInp.value.trim();
  if (n) setPlayerName(n);
  document.getElementById('join-splash').classList.add('hidden');
  newState();
  updateUI();
  refreshPlayersList();
  connect();
});

// =============================================================
// MAIN LOOP
// =============================================================
let lastSent = 0;
function tick() {
  // Animate development
  if (state && state.plateInChamber && state.devProgress < 1 && state.devStartTime) {
    state.devProgress = Math.min(1, (performance.now() - state.devStartTime) / 5000);
    redrawPlate();
    if (state.devProgress >= 1) {
      btnAction.disabled = false;
      btnAction.textContent = '⬆️ Lấy đĩa ra';
      updateUI();
    }
  }
  if (state && !state.finishedAt) {
    document.getElementById('timer').textContent = ((performance.now() - state.startedAt)/1000).toFixed(1) + 's';
  }

  // Send camera as avatar position 10Hz
  const now = performance.now();
  if (ws && ws.readyState === 1 && now - lastSent > 100) {
    ws.send(JSON.stringify({
      type: 'avatar',
      x: camera.position.x, y: camera.position.y, z: camera.position.z,
      rx: 0, ry: Math.atan2(camera.position.x - controls.target.x, camera.position.z - controls.target.z),
    }));
    lastSent = now;
  }

  // Smooth-update remote avatars labels rotation toward camera
  for (const [, r] of remotePlayers) {
    if (r.label) r.label.lookAt(camera.position);
  }

  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(tick);
}
tick();

async function finishGame() {
  state.finishedAt = performance.now();
  const ms = Math.round(state.finishedAt - state.startedAt);
  const correctRf = Object.entries(state.measurements).filter(([id, v]) => {
    const s = SAMPLES.find(x => x.id === id);
    return Math.abs(v - s.trueRf) <= 0.10;
  }).length;
  await submitAttempt({
    version: 'sac-ky-meta',
    score: state.score, correct: correctRf + state.plateSpots.length, total: 6,
    durationMs: ms,
    details: { samples: SAMPLES.map(s => ({ id: s.id, trueRf: s.trueRf, measuredRf: state.measurements[s.id] ?? null })) },
  });
  document.getElementById('modal-score').textContent = state.score;
  document.getElementById('modal-details').innerHTML = [
    ['⏱️ Thời gian', (ms/1000).toFixed(1) + 's'],
    ['🧪 Mẫu chấm', state.plateSpots.length + '/3'],
    ['📏 Đo Rf đúng', correctRf + '/3'],
    ['👥 Trong phòng', (remotePlayers.size + 1) + ' người'],
  ].map(([k,v]) => `<div class="row"><span>${k}</span><b>${v}</b></div>`).join('');
  document.getElementById('modal').classList.add('show');
}
document.getElementById('modal-replay').addEventListener('click', () => {
  document.getElementById('modal').classList.remove('show');
  btnRestart.click();
});

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
