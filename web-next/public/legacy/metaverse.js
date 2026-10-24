// ============================================================================
// public/legacy/metaverse.js — WRAP-MOUNT engine cho trang Next /metaverse.
//
// COPY NGUYÊN VĂN khối <script type="module"> của public/metaverse.html
// (Three.js metaverse 3D — phòng dược chung realtime qua WebSocket + MediaPipe
// pinch). KHÔNG viết lại engine, KHÔNG dịch sang React.
//
// KHÁC BIỆT DUY NHẤT so với bản gốc: các import RELATIVE (`./js/...`,
// `./vendor/...`, `./models/...`) được đổi sang ABSOLUTE (`/js/...`) — vì file
// này phục vụ từ /legacy/metaverse.js nên `./js/api.js` sẽ resolve nhầm sang
// /legacy/js/api.js. Path tuyệt đối resolve đúng qua fallback proxy Next→Express.
//
// - Bare specifier `three` / `three/addons/` vẫn dựa vào <script type="importmap">
//   do MetaverseMount ('use client') inject TRƯỚC khi nạp file này.
// - WebSocket dùng document.baseURI → dưới Next là origin :3200 (xem risks).
// ============================================================================
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { submitAttempt, ensurePlayerName, getPlayerName } from '/js/api.js';
import { sfx } from '/js/sfx.js';
import { showWelcomeCard } from '/js/welcome-card.js';

showWelcomeCard({
  icon: '🌐',
  title: 'Metaverse — Phòng dược chung',
  intro: 'Phòng 3D realtime, mỗi người là một avatar — cùng xếp thuốc lên kệ.',
  bullets: [
    'Pinch ngón cái + trỏ (hoặc click) trên hộp thuốc để cầm.',
    'Kéo lên kệ — ô đúng nhóm glow xanh, sai glow đỏ.',
    'Cursor + avatar của người khác sẽ hiện realtime qua WebSocket.',
    'Bấm "🔄 Reset phòng" để bắt đầu lại cho tất cả.',
  ],
  controls: { keys: ['W','A','S','D'], mouse: 'left' },
  tip: 'Cần webcam HTTPS để pinch. LAN HTTP chỉ chơi được bằng chuột.',
  persistKey: 'tizia:welcome:metaverse',
  dismissLabel: 'Vào phòng',
});

const sessionStart = Date.now();

// ============================================================
// THREE.JS SCENE — pharmacy room
// ============================================================
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xb8d4e3);
scene.fog = new THREE.Fog(0xb8d4e3, 10, 30);

const camera = new THREE.PerspectiveCamera(50, innerWidth/innerHeight, 0.1, 100);
camera.position.set(0, 2.4, 5);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(devicePixelRatio);
renderer.setSize(innerWidth, innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.target.set(0, 1.2, 0);
controls.minDistance = 1.5;
controls.maxDistance = 12;
controls.maxPolarAngle = Math.PI * 0.49;

// ----- Lighting -----
scene.add(new THREE.AmbientLight(0xffffff, 0.6));
const keyLight = new THREE.DirectionalLight(0xfff8e0, 0.9);
keyLight.position.set(4, 8, 4);
keyLight.castShadow = true;
keyLight.shadow.mapSize.set(1024, 1024);
keyLight.shadow.camera.left = -6; keyLight.shadow.camera.right = 6;
keyLight.shadow.camera.top = 6; keyLight.shadow.camera.bottom = -6;
scene.add(keyLight);
const fillLight = new THREE.DirectionalLight(0xc8e2ff, 0.35);
fillLight.position.set(-3, 5, -2);
scene.add(fillLight);

// ----- Pharmacy room: floor + 3 walls + ceiling -----
const ROOM_W = 12, ROOM_D = 10, ROOM_H = 3.5;
const floorTex = makeTileTexture();
const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(ROOM_W, ROOM_D),
  new THREE.MeshStandardMaterial({ map: floorTex, roughness: 0.8 })
);
floor.rotation.x = -Math.PI/2;
floor.receiveShadow = true;
scene.add(floor);

const wallMat = new THREE.MeshStandardMaterial({ color: 0xeef0f4, roughness: 0.95 });
function addWall(w, h, x, y, z, ry) {
  const wall = new THREE.Mesh(new THREE.PlaneGeometry(w, h), wallMat);
  wall.position.set(x, y, z);
  wall.rotation.y = ry;
  wall.receiveShadow = true;
  scene.add(wall);
}
addWall(ROOM_W, ROOM_H, 0, ROOM_H/2, -ROOM_D/2, 0);              // back wall
addWall(ROOM_D, ROOM_H, -ROOM_W/2, ROOM_H/2, 0, Math.PI/2);     // left wall
addWall(ROOM_D, ROOM_H,  ROOM_W/2, ROOM_H/2, 0, -Math.PI/2);    // right wall

const ceiling = new THREE.Mesh(new THREE.PlaneGeometry(ROOM_W, ROOM_D), new THREE.MeshStandardMaterial({ color: 0xfafafa, roughness: 1.0 }));
ceiling.position.y = ROOM_H;
ceiling.rotation.x = Math.PI/2;
scene.add(ceiling);

// Window decoration on back wall
const windowFrame = new THREE.Mesh(
  new THREE.PlaneGeometry(3, 1.5),
  new THREE.MeshStandardMaterial({ color: 0xa0d8ef, emissive: 0x6ab8e0, emissiveIntensity: 0.3, roughness: 0.4 })
);
windowFrame.position.set(0, 2.2, -ROOM_D/2 + 0.02);
scene.add(windowFrame);

// Pharmacy logo on back wall
const logoCanvas = document.createElement('canvas');
logoCanvas.width = 512; logoCanvas.height = 128;
const lctx = logoCanvas.getContext('2d');
lctx.fillStyle = '#0f766e'; lctx.fillRect(0, 0, 512, 128);
lctx.fillStyle = '#ffffff';
lctx.font = 'bold 64px system-ui';
lctx.textAlign = 'center'; lctx.textBaseline = 'middle';
lctx.fillText('💊 PHARMACY', 256, 64);
const logoTex = new THREE.CanvasTexture(logoCanvas);
logoTex.colorSpace = THREE.SRGBColorSpace;
const logo = new THREE.Mesh(
  new THREE.PlaneGeometry(2.4, 0.6),
  new THREE.MeshBasicMaterial({ map: logoTex })
);
logo.position.set(0, 3.05, -ROOM_D/2 + 0.03);
scene.add(logo);

// Counter
const counter = new THREE.Mesh(
  new THREE.BoxGeometry(5, 1, 1.5),
  new THREE.MeshStandardMaterial({ color: 0x6d4c41, roughness: 0.85 })
);
counter.position.set(0, 0.5, 1.5);
counter.castShadow = true; counter.receiveShadow = true;
scene.add(counter);

// ----- Shelf at back -----
const SHELF_X0 = -3, SHELF_Y = 1.6, SHELF_Z = -2;
const shelf = new THREE.Group();
shelf.position.set(0, SHELF_Y, SHELF_Z);
scene.add(shelf);

const woodMat = new THREE.MeshStandardMaterial({ color: 0x8d6e63, roughness: 0.9 });
const shelfBack = new THREE.Mesh(new THREE.BoxGeometry(8.5, 1.6, 0.08), woodMat);
shelfBack.position.set(0, 0, -0.4);
shelfBack.castShadow = true; shelfBack.receiveShadow = true;
shelf.add(shelfBack);
const shelfFloor = new THREE.Mesh(new THREE.BoxGeometry(8.5, 0.08, 0.8), woodMat);
shelfFloor.position.set(0, -0.75, 0);
shelf.add(shelfFloor);
const shelfTop = new THREE.Mesh(new THREE.BoxGeometry(8.5, 0.08, 0.8), woodMat);
shelfTop.position.set(0, 0.75, 0);
shelf.add(shelfTop);

// ----- Slot label texture helper -----
function makeLabel(text, bg='#fff3e0') {
  const c = document.createElement('canvas');
  c.width = 512; c.height = 128;
  const x = c.getContext('2d');
  x.fillStyle = bg; x.fillRect(0, 0, 512, 128);
  x.strokeStyle = '#8d6e63'; x.lineWidth = 6;
  x.strokeRect(3, 3, 506, 122);
  x.fillStyle = '#3e2723';
  x.font = 'bold 56px system-ui';
  x.textAlign = 'center'; x.textBaseline = 'middle';
  x.fillText(text, 256, 64);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

// Slots placeholder — will be initialized from server snapshot
const slotMeshes = new Map();   // slotId → {center, halo, labelMesh, dividers}

// Medicine meshes — initialized from server snapshot
const medMeshes = new Map();    // medId → {mesh, data, ownerId, slotId}

function makeMedMesh(data) {
  const tex = makeMedTexture(data);
  const mats = [
    new THREE.MeshStandardMaterial({ color: data.color, roughness: 0.5 }),
    new THREE.MeshStandardMaterial({ color: data.color, roughness: 0.5 }),
    new THREE.MeshStandardMaterial({ color: data.color, roughness: 0.5 }),
    new THREE.MeshStandardMaterial({ color: data.color, roughness: 0.5 }),
    new THREE.MeshStandardMaterial({ map: tex, roughness: 0.5 }),
    new THREE.MeshStandardMaterial({ map: tex, roughness: 0.5 }),
  ];
  const mesh = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.6, 0.3), mats);
  mesh.castShadow = true;
  return mesh;
}

function makeMedTexture(data) {
  const c = document.createElement('canvas');
  c.width = 400; c.height = 600;
  const x = c.getContext('2d');
  x.fillStyle = data.color; x.fillRect(0, 0, 400, 600);
  x.fillStyle = '#fff'; x.fillRect(30, 30, 340, 540);
  x.fillStyle = data.color;
  x.font = 'bold 40px system-ui';
  x.textAlign = 'center'; x.textBaseline = 'middle';
  x.fillText(data.name, 200, 180);
  x.font = '24px system-ui'; x.fillStyle = '#444';
  x.fillText(data.category, 200, 230);
  // cross
  x.fillStyle = data.color;
  x.fillRect(190, 320, 20, 100);
  x.fillRect(160, 350, 80, 40);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

// ----- Cursor for local player + remote avatars -----
const remotePlayers = new Map();   // id → { sphere, label, name, color }

function makeAvatar(color, name) {
  const group = new THREE.Group();
  const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.07, 16, 16),
    new THREE.MeshStandardMaterial({ color, emissive: color, emissiveIntensity: 0.4 })
  );
  group.add(sphere);
  // Name label above sphere
  const labelCanvas = document.createElement('canvas');
  labelCanvas.width = 256; labelCanvas.height = 64;
  const lc = labelCanvas.getContext('2d');
  lc.fillStyle = color; lc.fillRect(0, 0, 256, 64);
  lc.fillStyle = '#fff';
  lc.font = 'bold 28px system-ui';
  lc.textAlign = 'center'; lc.textBaseline = 'middle';
  lc.fillText(name, 128, 32);
  const labelTex = new THREE.CanvasTexture(labelCanvas);
  labelTex.colorSpace = THREE.SRGBColorSpace;
  const label = new THREE.Sprite(new THREE.SpriteMaterial({ map: labelTex }));
  label.position.y = 0.18;
  label.scale.set(0.4, 0.1, 1);
  group.add(label);
  return { group, sphere, label };
}

const localCursor = new THREE.Mesh(
  new THREE.SphereGeometry(0.06, 16, 16),
  new THREE.MeshBasicMaterial({ color: 0x00ddff, transparent: true, opacity: 0.85, depthTest: false })
);
localCursor.renderOrder = 999;
localCursor.visible = false;
scene.add(localCursor);

// ============================================================
// WebSocket multiplayer
// ============================================================
// Build WS URL via document.baseURI so it works at root OR under /ps prefix
const ws = new WebSocket(new URL('ws', document.baseURI).href.replace(/^http/, 'ws'));
let myId = null;
let myColor = '#00ddff';

const playerName = getPlayerName() || ('Khách ' + Math.floor(Math.random()*1000));
const statusEl = document.getElementById('status');
const playerListEl = document.getElementById('player-list');
const toastEl = document.getElementById('toast');

function showToast(msg, ms = 2200) {
  toastEl.textContent = msg;
  toastEl.style.display = 'block';
  clearTimeout(showToast._t);
  showToast._t = setTimeout(() => toastEl.style.display = 'none', ms);
}

ws.addEventListener('open', () => {
  statusEl.textContent = '🟢 Đã kết nối';
  ws.send(JSON.stringify({ type: 'join', name: playerName }));
});

ws.addEventListener('close', () => {
  statusEl.textContent = '🔴 Mất kết nối — refresh để vào lại';
});

ws.addEventListener('message', (ev) => {
  let msg;
  try { msg = JSON.parse(ev.data); } catch { return; }

  switch (msg.type) {
    case 'welcome': {
      myId = msg.id;
      myColor = msg.color;
      localCursor.material.color.setStyle(myColor);
      applySnapshot(msg.snapshot);
      sfx.join();
      showToast(`Chào ${playerName}!`, 2000);
      break;
    }
    case 'join': {
      ensureRemote(msg.player);
      sfx.join();
      showToast(`${msg.player.name} đã vào`, 2000);
      refreshPlayerList();
      break;
    }
    case 'leave': {
      const r = remotePlayers.get(msg.id);
      if (r) { scene.remove(r.group); remotePlayers.delete(msg.id); }
      sfx.leave();
      refreshPlayerList();
      break;
    }
    case 'cursor': {
      const r = remotePlayers.get(msg.id);
      if (r) {
        r.group.position.set(msg.x, msg.y, msg.z);
        const targetScale = msg.pinching ? 1.4 : 1;
        r.sphere.scale.setScalar(targetScale);
      }
      break;
    }
    case 'grab': {
      const m = medMeshes.get(msg.medId);
      if (m) {
        m.ownerId = msg.ownerId;
        m.slotId = null;
        if (msg.ownerId !== myId) {
          // Visual: rim glow to indicate someone else has it
          m.mesh.material.forEach?.(mat => mat.emissive?.setHex(0xffd54f));
        }
      }
      break;
    }
    case 'medpos': {
      const m = medMeshes.get(msg.medId);
      if (m && m.ownerId !== myId) {
        m.mesh.position.set(msg.pos.x, msg.pos.y, msg.pos.z);
      }
      break;
    }
    case 'release': {
      const m = medMeshes.get(msg.medId);
      if (m) {
        m.ownerId = null;
        m.mesh.position.set(msg.pos.x, msg.pos.y, msg.pos.z);
        m.mesh.material.forEach?.(mat => mat.emissive?.setHex(0x000000));
      }
      break;
    }
    case 'snap': {
      const m = medMeshes.get(msg.medId);
      if (m) {
        m.slotId = msg.slotId;
        m.ownerId = null;
        m.mesh.position.set(msg.pos.x, msg.pos.y, msg.pos.z);
        m.mesh.material.forEach?.(mat => mat.emissive?.setHex(0x000000));
        sfx.correct();
        checkAllPlaced();
      }
      break;
    }
    case 'reset': {
      // Re-initialize everything
      for (const m of medMeshes.values()) scene.remove(m.mesh);
      medMeshes.clear();
      for (const s of slotMeshes.values()) {
        scene.remove(s.center);
        scene.remove(s.halo);
        scene.remove(s.labelMesh);
      }
      slotMeshes.clear();
      applySnapshot(msg.snapshot);
      showToast('Phòng đã reset');
      break;
    }
    case 'open-carton': {
      // (Carton system not modeled — purely cosmetic)
      break;
    }
  }
});

function ensureRemote(p) {
  if (p.id === myId) return;
  if (remotePlayers.has(p.id)) return;
  const av = makeAvatar(p.color, p.name);
  av.group.position.set(p.cursor?.x ?? 0, p.cursor?.y ?? 1, p.cursor?.z ?? 0);
  scene.add(av.group);
  remotePlayers.set(p.id, { ...av, name: p.name, color: p.color });
}

function applySnapshot(snap) {
  // Players
  for (const p of snap.players) {
    if (p.id !== myId) ensureRemote(p);
  }
  // Slots
  for (let i = 0; i < snap.slots.length; i++) {
    const s = snap.slots[i];
    const center = new THREE.Vector3(s.pos.x, s.pos.y, s.pos.z);
    // Visual slot: just a label above + halo box
    const labelMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(1.8, 0.4),
      new THREE.MeshBasicMaterial({ map: makeLabel(s.category) })
    );
    labelMesh.position.copy(center);
    labelMesh.position.y += 0.8;
    labelMesh.position.z = SHELF_Z - 0.39;
    scene.add(labelMesh);

    const halo = new THREE.Mesh(
      new THREE.BoxGeometry(1.6, 1.3, 0.6),
      new THREE.MeshBasicMaterial({ color: 0x43a047, transparent: true, opacity: 0, depthWrite: false })
    );
    halo.position.copy(center);
    halo.position.z = SHELF_Z;
    scene.add(halo);

    slotMeshes.set(s.id, { center, halo, labelMesh, category: s.category });
  }
  // Medicines
  for (const m of snap.meds) {
    const mesh = makeMedMesh(m);
    mesh.position.set(m.pos.x, m.pos.y, m.pos.z);
    scene.add(mesh);
    medMeshes.set(m.id, { mesh, data: m, ownerId: m.ownerId, slotId: m.slotId });
  }
  refreshPlayerList();
}

function refreshPlayerList() {
  const items = [
    `<div class="pl me"><span class="dot" style="background:${myColor}"></span>${escapeHtml(playerName)} (bạn)</div>`,
    ...[...remotePlayers.values()].map(r =>
      `<div class="pl"><span class="dot" style="background:${r.color}"></span>${escapeHtml(r.name)}</div>`
    ),
  ];
  playerListEl.innerHTML = items.join('') || 'chỉ có bạn';
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, c => ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[c]));
}

function send(msg) {
  if (ws.readyState === 1) ws.send(JSON.stringify(msg));
}

// Throttle cursor updates to ~20Hz
let lastCursorSend = 0;
function sendCursor() {
  const now = performance.now();
  if (now - lastCursorSend < 50) return;
  lastCursorSend = now;
  send({ type: 'cursor', x: localCursor.position.x, y: localCursor.position.y, z: localCursor.position.z, pinching });
}

// ============================================================
// Local input — mouse drag (primary) + MediaPipe pinch (toggle)
// ============================================================
const raycaster = new THREE.Raycaster();
const mouseNDC = new THREE.Vector2();
let pinching = false, wasPinching = false;
let grabbedMed = null;
const _grabPlane = new THREE.Plane();
const _grabPoint = new THREE.Vector3();
const _camDir = new THREE.Vector3();

function ndcFromEvent(e) {
  const rect = renderer.domElement.getBoundingClientRect();
  mouseNDC.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
  mouseNDC.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
}

function projectCursor() {
  raycaster.setFromCamera(mouseNDC, camera);
  camera.getWorldDirection(_camDir);
  _grabPlane.setFromNormalAndCoplanarPoint(_camDir, controls.target);
  if (raycaster.ray.intersectPlane(_grabPlane, _grabPoint)) {
    localCursor.position.copy(_grabPoint);
    localCursor.visible = true;
  }
}

// ====== Hover label (Unity-style) ======
const hoverLabelEl = document.getElementById('hover-label');
let hoverTarget = null;
const _hoverProj = new THREE.Vector3();
const _hoverWorld = new THREE.Vector3();

function setHoverTarget(entry) {
  if (entry === hoverTarget) return;
  hoverTarget = entry;
  if (!entry) { hoverLabelEl.classList.remove('shown'); return; }
  const d = entry.data;
  hoverLabelEl.style.setProperty('--cat-color', d.color);
  hoverLabelEl.querySelector('.ht').textContent = d.name;
  hoverLabelEl.querySelector('.hs').textContent = `${d.dose ?? ''}${d.form ? ' · ' + d.form : ''}`.trim();
  hoverLabelEl.querySelector('.hc').textContent = d.category;
  hoverLabelEl.classList.add('shown');
}

renderer.domElement.addEventListener('pointermove', (e) => {
  ndcFromEvent(e);
  projectCursor();
  sendCursor();
  // Hover detection — only when not dragging an object
  if (!grabbedMed) {
    raycaster.setFromCamera(mouseNDC, camera);
    const meshes = [...medMeshes.values()].map(m => m.mesh);
    const hits = raycaster.intersectObjects(meshes, false);
    if (hits.length) {
      const entry = [...medMeshes.values()].find(m => m.mesh === hits[0].object);
      setHoverTarget(entry || null);
    } else setHoverTarget(null);
  } else setHoverTarget(null);
});
renderer.domElement.addEventListener('pointerleave', () => setHoverTarget(null));

renderer.domElement.addEventListener('pointerdown', (e) => {
  ndcFromEvent(e);
  projectCursor();
  pinching = true;
  // Find nearest medicine to cursor
  const meshes = [...medMeshes.values()].filter(m => !m.ownerId || m.ownerId === myId).map(m => m.mesh);
  const hits = raycaster.intersectObjects(meshes, false);
  if (hits.length) {
    const entry = [...medMeshes.values()].find(m => m.mesh === hits[0].object);
    if (entry) {
      grabbedMed = entry;
      send({ type: 'grab', medId: grabbedMed.data.id });
      controls.enabled = false;
      sfx.grab();
    }
  }
  sendCursor();
});

renderer.domElement.addEventListener('pointerup', () => {
  pinching = false;
  if (grabbedMed) {
    // Check snap
    let best = null, bestDist = Infinity;
    for (const [sid, s] of slotMeshes) {
      const d = grabbedMed.mesh.position.distanceTo(s.center);
      if (d < bestDist) { bestDist = d; best = { sid, s }; }
    }
    if (best && bestDist < 0.8) {
      send({ type: 'snap', medId: grabbedMed.data.id, slotId: best.sid });
      const correct = best.s.category === grabbedMed.data.category;
      if (correct) showToast(`✅ ${grabbedMed.data.name} đúng "${best.s.category}"`);
      else { sfx.wrong(); showToast(`❌ ${grabbedMed.data.name} → "${best.s.category}" (sai)`); }
    } else {
      send({ type: 'release', medId: grabbedMed.data.id });
    }
    grabbedMed = null;
    controls.enabled = true;
    sfx.release();
  }
  sendCursor();
});

// ============================================================
// MediaPipe webcam (optional)
// ============================================================
const camPreview = document.getElementById('cam-preview');
const camCtx = camPreview.getContext('2d');
const handState = { running: false, landmarker: null, video: null, lastT: -1 };

// Webcam yêu cầu HTTPS hoặc localhost
const SECURE_FOR_CAMERA = window.isSecureContext && !!navigator.mediaDevices?.getUserMedia;
const handToggleBtn = document.getElementById('hand-toggle');
if (!SECURE_FOR_CAMERA) {
  handToggleBtn.textContent = '🖱️ Chỉ chuột (webcam cần HTTPS)';
  handToggleBtn.style.background = '#6b7280';
  handToggleBtn.title = `Webcam cần HTTPS hoặc localhost. Bạn đang ở ${location.host} — Chrome chặn camera. Dùng chuột để chơi.`;
  handToggleBtn.addEventListener('click', () => {
    showToast('⚠️ Webcam cần HTTPS. Đang chơi bằng chuột');
  });
} else handToggleBtn.addEventListener('click', async () => {
  const btn = document.getElementById('hand-toggle');
  if (handState.running) {
    handState.running = false;
    handState.video?.srcObject?.getTracks().forEach(t => t.stop());
    camPreview.style.display = 'none';
    btn.textContent = '🖐️ Bật webcam';
    return;
  }
  btn.disabled = true; btn.textContent = '⏳ Đang tải...';
  try {
    const { HandLandmarker, FilesetResolver } = await import('/vendor/mediapipe/vision_bundle.mjs');
    const fileset = await FilesetResolver.forVisionTasks('/vendor/mediapipe/wasm');
    handState.landmarker = await HandLandmarker.createFromOptions(fileset, {
      baseOptions: { modelAssetPath: '/models/hand_landmarker.task', delegate: 'GPU' },
      runningMode: 'VIDEO', numHands: 1,
    });
    const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user', width: 640, height: 480 }, audio: false });
    handState.video = document.createElement('video');
    handState.video.srcObject = stream;
    handState.video.autoplay = true; handState.video.muted = true; handState.video.playsInline = true;
    await new Promise(r => handState.video.onloadedmetadata = r);
    await handState.video.play();
    handState.running = true;
    camPreview.style.display = 'block';
    btn.disabled = false; btn.textContent = '✋ Tắt webcam';
  } catch (err) {
    btn.disabled = false; btn.textContent = '🖐️ Bật webcam';
    alert('Lỗi: ' + err.message);
  }
});

function updateHand(time) {
  if (!handState.running || !handState.video) return;
  if (handState.video.currentTime === handState.lastT) return;
  handState.lastT = handState.video.currentTime;
  const result = handState.landmarker.detectForVideo(handState.video, time);
  camCtx.drawImage(handState.video, 0, 0, camPreview.width, camPreview.height);
  if (!result.landmarks?.length) {
    if (pinching) { pinching = false; if (grabbedMed) { send({ type: 'release', medId: grabbedMed.data.id }); grabbedMed = null; controls.enabled = true; } }
    return;
  }
  const lm = result.landmarks[0];
  const t = lm[4], idx = lm[8];
  camCtx.fillStyle = '#00ddff';
  for (const p of lm) { camCtx.beginPath(); camCtx.arc(p.x * camPreview.width, p.y * camPreview.height, 2.5, 0, Math.PI*2); camCtx.fill(); }
  // Convert hand to NDC + project (same as mouse)
  const px = (t.x + idx.x)/2, py = (t.y + idx.y)/2;
  mouseNDC.x = (1 - px) * 2 - 1;
  mouseNDC.y = -(py * 2 - 1);
  projectCursor();
  const d = Math.hypot(t.x - idx.x, t.y - idx.y);
  wasPinching = pinching;
  if (!pinching && d < 0.05) pinching = true;
  else if (pinching && d > 0.08) pinching = false;
  if (pinching && !wasPinching) {
    raycaster.setFromCamera(mouseNDC, camera);
    const meshes = [...medMeshes.values()].filter(m => !m.ownerId || m.ownerId === myId).map(m => m.mesh);
    const hits = raycaster.intersectObjects(meshes, false);
    if (hits.length) {
      grabbedMed = [...medMeshes.values()].find(m => m.mesh === hits[0].object);
      if (grabbedMed) { send({ type: 'grab', medId: grabbedMed.data.id }); sfx.grab(); }
    }
  }
  if (!pinching && wasPinching && grabbedMed) {
    let best = null, bestDist = Infinity;
    for (const [sid, s] of slotMeshes) {
      const d2 = grabbedMed.mesh.position.distanceTo(s.center);
      if (d2 < bestDist) { bestDist = d2; best = { sid, s }; }
    }
    if (best && bestDist < 0.8) {
      send({ type: 'snap', medId: grabbedMed.data.id, slotId: best.sid });
    } else send({ type: 'release', medId: grabbedMed.data.id });
    grabbedMed = null; sfx.release();
  }
  sendCursor();
}

// ============================================================
// Animation loop
// ============================================================
function tick(time) {
  controls.update();
  updateHand(time);

  // Drag grabbed medicine to cursor
  if (grabbedMed) {
    grabbedMed.mesh.position.copy(localCursor.position);
    send({ type: 'move', medId: grabbedMed.data.id, x: localCursor.position.x, y: localCursor.position.y, z: localCursor.position.z });
  }

  // Update hover-label position
  if (hoverTarget) {
    hoverTarget.mesh.getWorldPosition(_hoverWorld);
    _hoverProj.copy(_hoverWorld).project(camera);
    if (_hoverProj.z > 1 || _hoverProj.z < -1) hoverLabelEl.classList.remove('shown');
    else {
      hoverLabelEl.classList.add('shown');
      const top = _hoverWorld.clone(); top.y += 0.32;
      top.project(camera);
      hoverLabelEl.style.left = ((_hoverProj.x * 0.5 + 0.5) * innerWidth) + 'px';
      hoverLabelEl.style.top  = Math.max(60, (-top.y * 0.5 + 0.5) * innerHeight) + 'px';
    }
  }

  // Hover halo for grabbed medicine
  for (const s of slotMeshes.values()) s.halo.material.opacity = 0;
  if (grabbedMed) {
    let best = null, bestDist = Infinity;
    for (const [sid, s] of slotMeshes) {
      const d = grabbedMed.mesh.position.distanceTo(s.center);
      if (d < bestDist) { bestDist = d; best = s; }
    }
    if (best && bestDist < 0.8) {
      const correct = best.category === grabbedMed.data.category;
      best.halo.material.color.setHex(correct ? 0x43a047 : 0xe53935);
      best.halo.material.opacity = 0.3;
    }
  }

  renderer.render(scene, camera);
}
renderer.setAnimationLoop(tick);

addEventListener('resize', () => {
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight);
});

// ============================================================
// UI buttons
// ============================================================
document.getElementById('reset-btn').addEventListener('click', () => {
  send({ type: 'reset' });
});

document.getElementById('submit-btn').addEventListener('click', async () => {
  let correct = 0, placed = 0;
  const total = medMeshes.size;
  const breakdown = [];
  for (const m of medMeshes.values()) {
    if (m.slotId) {
      placed++;
      const slot = slotMeshes.get(m.slotId);
      const ok = slot?.category === m.data.category;
      if (ok) correct++;
      breakdown.push({ name: m.data.name, category: m.data.category, placedIn: slot?.category ?? null });
    } else {
      breakdown.push({ name: m.data.name, category: m.data.category, placedIn: null });
    }
  }
  const pct = total ? Math.round(correct / total * 100) : 0;
  await ensurePlayerName();
  const res = await submitAttempt({
    version: 'metaverse',
    score: pct,
    correct, total,
    durationMs: Date.now() - sessionStart,
    details: { placed, breakdown },
  });
  if (res?.newBadges?.length) sfx.badge();
  if (correct === total && total > 0) sfx.perfect();
  showToast(`📝 Đã nộp: ${correct}/${total} (${pct}%)${res?.newBadges?.length ? ' · 🎁 +' + res.newBadges.length + ' badge' : ''}`, 4000);
});

function checkAllPlaced() {
  let all = true, allCorrect = true;
  for (const m of medMeshes.values()) {
    if (!m.slotId) { all = false; break; }
    const slot = slotMeshes.get(m.slotId);
    if (slot?.category !== m.data.category) allCorrect = false;
  }
  if (all && allCorrect) {
    sfx.perfect();
    showToast('🎉 Tất cả đúng! Bấm "Nộp bài" để lưu điểm.', 4000);
  }
}

// ============================================================
// Floor tile texture (procedural)
// ============================================================
function makeTileTexture() {
  const c = document.createElement('canvas');
  c.width = c.height = 512;
  const x = c.getContext('2d');
  x.fillStyle = '#e5e7eb'; x.fillRect(0, 0, 512, 512);
  x.strokeStyle = '#cbd5e1'; x.lineWidth = 2;
  for (let i = 0; i <= 8; i++) {
    x.beginPath(); x.moveTo(i * 64, 0); x.lineTo(i * 64, 512); x.stroke();
    x.beginPath(); x.moveTo(0, i * 64); x.lineTo(512, i * 64); x.stroke();
  }
  const t = new THREE.CanvasTexture(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.repeat.set(4, 4);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}
