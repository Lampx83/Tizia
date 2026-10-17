import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { submitAttempt } from '/js/api.js';
import { sfx, isSfxEnabled, toggleSfx } from '/js/sfx.js';

// =============================================================
// STATE
// =============================================================
const SAMPLES = [
  { id: 'A', hex: 0xef4444, trueRf: 0.30, name: 'Mẫu A — Caffeine' },
  { id: 'B', hex: 0x3b82f6, trueRf: 0.55, name: 'Mẫu B — Aspirin' },
  { id: 'C', hex: 0x22c55e, trueRf: 0.78, name: 'Mẫu C — Paracetamol' },
];
const TUTORIALS = {
  0: { n: 0, title: 'Chuẩn bị dung dịch mẫu (Full Mode)', body: 'Theo Unity gốc: <b>(1)</b> Click <b>lọ bột Caffeine</b> → thìa tự múc bột vào cốc vàng. <b>(2)</b> Click <b>cốc vàng</b> để rót dung môi từ lọ pha động vào. <b>(3)</b> Click <b>bộ đun cách thuỷ</b> → cốc bay tới, đun có hơi nước bốc lên. Hoàn tất → chấm mẫu.', hint: '🔬 Mỗi click sẽ phát animation chuẩn Unity. Tổng ~10s pre-prep.' },
  1: { n: 1, title: 'Chuẩn bị bản mỏng', body: 'Đĩa TLC silica gel đã đặt sẵn trên bàn. Đường gốc (origin line) cách mép dưới ~1cm.', hint: 'Click vào lọ mẫu A/B/C để bắt đầu chấm.' },
  2: { n: 2, title: 'Chấm mẫu lên đường gốc', body: 'Click vào 1 lọ mẫu (A/B/C) để hút mao quản, sau đó click lên đĩa TLC.', hint: '💡 Mỗi mẫu chấm 1 lần. Vệt chấm nên nhỏ (≤3mm).' },
  3: { n: 3, title: 'Pha pha động', body: 'Click vào lọ dung môi (chai lớn 💧) để đổ vào bình triển khai.', hint: '💡 Bình kín giúp hơi dung môi bão hoà, Rf ổn định.' },
  4: { n: 4, title: 'Triển khai sắc ký', body: 'Click vào đĩa TLC để đặt vào bình triển khai. Đường gốc phải CAO HƠN mặt dung môi.', hint: '💡 Dung môi mao dẫn lên kéo theo mẫu — tách theo ái lực.' },
  5: { n: 5, title: 'Triển khai đang chạy...', body: 'Quan sát dung môi mao dẫn lên kéo theo 3 mẫu tách dần theo R<sub>f</sub>. Theo Unity gốc thời gian là 30 giây (có thể bấm ⏩ <b>Tăng tốc</b> để rút còn 5s).', hint: '⏳ 30s thực tế · ⏩ Tăng tốc → 5s · Sau đó "Lấy đĩa ra"' },
  6: { n: 6, title: 'Đo hệ số R<sub>f</sub> · soi UV', body: 'Sau khi triển khai, vệt mẫu mờ trên đĩa (silica gel hấp thụ rất ít ánh sáng nhìn thấy). Bấm <b>🔦 UV</b> (góc phải) để soi UV 365nm — vệt phát huỳnh quang sáng. Click vào vệt để đo R<sub>f</sub>.', hint: '💡 Bật UV trước để thấy vệt rõ. Đúng ±0.05 = +30, sai ±0.10 = +15.' },
};

let state;
let fullMode = false;
function newState() {
  state = {
    step: fullMode ? 0 : 1,
    score: 0,
    startedAt: performance.now(),
    finishedAt: null,
    capillary: null,
    plateSpots: [],
    chamberFilled: false,
    plateInChamber: false,
    devProgress: 0,
    devStartTime: null,
    fastForward: false,
    plateRemoved: false,
    measurements: {},
    stepErrors: 0,
    holding: null,
    // Pre-prep (Full Mode) state
    cupPowder: 0,
    cupSolvent: 0,
    cupHeated: false,
    prepDone: !fullMode, // simple mode skips prep
  };
}
newState();

// =============================================================
// SCENE SETUP
// =============================================================
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x1a1f2e);
scene.fog = new THREE.Fog(0x1a1f2e, 10, 28);

const camera = new THREE.PerspectiveCamera(48, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.set(0, 2.8, 5.2);
camera.lookAt(0, 1, 0);

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.1;
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 1, 0);
controls.minDistance = 2.0;
controls.maxDistance = 10;
controls.minPolarAngle = 0.15;
controls.maxPolarAngle = Math.PI * 0.49;
controls.enablePan = true;
controls.panSpeed = 0.4;
controls.enableDamping = true;
controls.dampingFactor = 0.06;
controls.update();

// =============================================================
// LIGHTING
// =============================================================
const ambient = new THREE.AmbientLight(0xfff5e6, 0.42);
scene.add(ambient);

const ceilingLight = new THREE.RectAreaLight(0xffffff, 4, 4, 2);
ceilingLight.position.set(0, 5.0, 0);
ceilingLight.lookAt(0, 0, 0);
scene.add(ceilingLight);

const sun = new THREE.DirectionalLight(0xfff5e0, 0.55);
sun.position.set(4, 8, 5);
sun.castShadow = true;
sun.shadow.mapSize.set(2048, 2048);
sun.shadow.camera.left = -6; sun.shadow.camera.right = 6;
sun.shadow.camera.top = 6; sun.shadow.camera.bottom = -6;
sun.shadow.camera.near = 1; sun.shadow.camera.far = 20;
sun.shadow.bias = -0.0003;
scene.add(sun);

const fillLight = new THREE.PointLight(0xa78bfa, 0.7, 14);
fillLight.position.set(-3, 3, 3);
scene.add(fillLight);

const rimLight = new THREE.DirectionalLight(0xec4899, 0.25);
rimLight.position.set(-3, 2, -3);
scene.add(rimLight);

// =============================================================
// LAB ROOM ENVIRONMENT
// =============================================================
function makeTileTexture(color1 = '#e8eef5', color2 = '#cbd5e1', tileSize = 64, repeat = 6) {
  const c = document.createElement('canvas');
  c.width = c.height = tileSize * 2;
  const ctx = c.getContext('2d');
  ctx.fillStyle = color1;
  ctx.fillRect(0, 0, c.width, c.height);
  ctx.fillStyle = color2;
  ctx.fillRect(0, 0, tileSize, tileSize);
  ctx.fillRect(tileSize, tileSize, tileSize, tileSize);
  // grout lines
  ctx.strokeStyle = 'rgba(0,0,0,0.15)';
  ctx.lineWidth = 2;
  ctx.strokeRect(0, 0, tileSize, tileSize);
  ctx.strokeRect(tileSize, 0, tileSize, tileSize);
  ctx.strokeRect(0, tileSize, tileSize, tileSize);
  ctx.strokeRect(tileSize, tileSize, tileSize, tileSize);
  const tex = new THREE.CanvasTexture(c);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(repeat, repeat);
  return tex;
}

// Floor — tiled
const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(20, 16),
  new THREE.MeshStandardMaterial({
    map: makeTileTexture('#e2e8f0', '#94a3b8', 96, 8),
    roughness: 0.7, metalness: 0.05,
  })
);
floor.rotation.x = -Math.PI / 2;
floor.position.y = -0.05;
floor.receiveShadow = true;
scene.add(floor);

// Back wall — light blue painted
const backWall = new THREE.Mesh(
  new THREE.PlaneGeometry(20, 8),
  new THREE.MeshStandardMaterial({
    color: 0xc9dce8, roughness: 0.9, metalness: 0,
  })
);
backWall.position.set(0, 3, -4);
backWall.receiveShadow = true;
scene.add(backWall);

// Side wall (left)
const leftWall = new THREE.Mesh(
  new THREE.PlaneGeometry(8, 8),
  new THREE.MeshStandardMaterial({ color: 0xc9dce8, roughness: 0.9 })
);
leftWall.position.set(-8, 3, 0);
leftWall.rotation.y = Math.PI / 2;
scene.add(leftWall);

// Side wall (right)
const rightWall = new THREE.Mesh(
  new THREE.PlaneGeometry(8, 8),
  new THREE.MeshStandardMaterial({ color: 0xc9dce8, roughness: 0.9 })
);
rightWall.position.set(8, 3, 0);
rightWall.rotation.y = -Math.PI / 2;
scene.add(rightWall);

// Ceiling
const ceiling = new THREE.Mesh(
  new THREE.PlaneGeometry(20, 16),
  new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 1 })
);
ceiling.rotation.x = Math.PI / 2;
ceiling.position.y = 6;
scene.add(ceiling);

// Skirting (baseboard)
const skirting = new THREE.Mesh(
  new THREE.BoxGeometry(20, 0.18, 0.06),
  new THREE.MeshStandardMaterial({ color: 0x475569 })
);
skirting.position.set(0, 0.04, -3.97);
scene.add(skirting);

// Back shelf with reagents (decoration)
function makeShelf(z) {
  const shelf = new THREE.Group();
  const board = new THREE.Mesh(
    new THREE.BoxGeometry(6, 0.06, 0.5),
    new THREE.MeshStandardMaterial({ color: 0x78350f, roughness: 0.75 })
  );
  shelf.add(board);
  // Support brackets
  for (const x of [-2.8, 0, 2.8]) {
    const b = new THREE.Mesh(
      new THREE.BoxGeometry(0.06, 0.16, 0.5),
      new THREE.MeshStandardMaterial({ color: 0x422006 })
    );
    b.position.set(x, -0.11, 0);
    shelf.add(b);
  }
  // Random reagent bottles on shelf
  const reagentColors = [0xfde047, 0x60a5fa, 0xfb7185, 0x10b981, 0xa78bfa, 0xf97316, 0xfb923c, 0x84cc16, 0xfacc15, 0x06b6d4, 0xe879f9];
  for (let i = -2.5; i <= 2.5; i += 0.4) {
    const r = 0.07 + Math.random() * 0.04;
    const h = 0.25 + Math.random() * 0.15;
    const body = new THREE.Mesh(
      new THREE.CylinderGeometry(r, r, h, 14),
      new THREE.MeshPhysicalMaterial({
        color: reagentColors[Math.floor(Math.random() * reagentColors.length)],
        roughness: 0.4, metalness: 0.1, transparent: true, opacity: 0.85,
      })
    );
    body.position.set(i, h/2 + 0.03, (Math.random() - 0.5) * 0.2);
    body.castShadow = true;
    shelf.add(body);
    // Cap
    const cap = new THREE.Mesh(
      new THREE.CylinderGeometry(r * 0.7, r * 0.7, 0.04, 12),
      new THREE.MeshStandardMaterial({ color: 0x374151 })
    );
    cap.position.set(i, h + 0.05, body.position.z);
    shelf.add(cap);
  }
  shelf.position.set(0, 3.2, z);
  return shelf;
}
scene.add(makeShelf(-3.92));

// Lab safety poster (back wall)
const posterCanvas = document.createElement('canvas');
posterCanvas.width = 256; posterCanvas.height = 320;
{
  const c = posterCanvas.getContext('2d');
  c.fillStyle = '#fef3c7'; c.fillRect(0, 0, 256, 320);
  c.fillStyle = '#d97706';
  c.fillRect(0, 0, 256, 50);
  c.fillStyle = 'white';
  c.font = 'bold 22px sans-serif';
  c.textAlign = 'center';
  c.fillText('⚠️ AN TOÀN', 128, 32);
  c.fillStyle = '#7c2d12';
  c.font = 'bold 14px sans-serif';
  c.textAlign = 'left';
  const items = ['• Đeo kính BHLĐ', '• Áo blu trong lab', '• Không hút thuốc', '• Tránh nuốt dung môi', '• Rửa tay sau buổi', '• Báo cáo tai nạn ngay'];
  items.forEach((t, i) => c.fillText(t, 20, 90 + i * 30));
}
const posterTex = new THREE.CanvasTexture(posterCanvas);
const poster = new THREE.Mesh(
  new THREE.PlaneGeometry(1.6, 2.0),
  new THREE.MeshStandardMaterial({ map: posterTex, roughness: 0.9 })
);
poster.position.set(-4.5, 2.4, -3.95);
scene.add(poster);

// TLC Rf chart poster
const chartCanvas = document.createElement('canvas');
chartCanvas.width = 256; chartCanvas.height = 320;
{
  const c = chartCanvas.getContext('2d');
  c.fillStyle = '#f1f5f9'; c.fillRect(0, 0, 256, 320);
  c.fillStyle = '#1e293b'; c.fillRect(0, 0, 256, 44);
  c.fillStyle = 'white'; c.font = 'bold 18px sans-serif'; c.textAlign = 'center';
  c.fillText('SẮC KÝ TLC', 128, 28);
  // Plate diagram
  c.fillStyle = '#fef3c7'; c.fillRect(50, 70, 156, 220);
  c.strokeStyle = '#92400e'; c.lineWidth = 2; c.strokeRect(50, 70, 156, 220);
  // Origin line
  c.strokeStyle = '#6b7280'; c.setLineDash([4, 3]);
  c.beginPath(); c.moveTo(60, 260); c.lineTo(196, 260); c.stroke();
  // Front line
  c.strokeStyle = '#ef4444';
  c.beginPath(); c.moveTo(60, 88); c.lineTo(196, 88); c.stroke();
  c.setLineDash([]);
  // 3 spots
  c.fillStyle = '#ef4444'; c.beginPath(); c.arc(85, 209, 6, 0, Math.PI*2); c.fill();
  c.fillStyle = '#3b82f6'; c.beginPath(); c.arc(128, 165, 6, 0, Math.PI*2); c.fill();
  c.fillStyle = '#22c55e'; c.beginPath(); c.arc(170, 120, 6, 0, Math.PI*2); c.fill();
  // Rf labels
  c.fillStyle = '#1e293b'; c.font = '10px sans-serif'; c.textAlign = 'right';
  c.fillText('Rf=0.30', 48, 213);
  c.fillText('Rf=0.55', 48, 169);
  c.fillText('Rf=0.78', 48, 124);
  c.font = 'italic 11px sans-serif'; c.textAlign = 'center';
  c.fillText('Rf = d_mẫu / d_dung môi', 128, 305);
}
const chartTex = new THREE.CanvasTexture(chartCanvas);
const chart = new THREE.Mesh(
  new THREE.PlaneGeometry(1.6, 2.0),
  new THREE.MeshStandardMaterial({ map: chartTex, roughness: 0.85 })
);
chart.position.set(4.5, 2.4, -3.95);
scene.add(chart);

// Lab bench (main work surface) — marble white with wood edge
const benchGroup = new THREE.Group();
const benchTop = new THREE.Mesh(
  new THREE.BoxGeometry(8, 0.12, 2.6),
  new THREE.MeshStandardMaterial({ color: 0xf1f5f9, roughness: 0.35, metalness: 0.1 })
);
benchTop.position.y = 0;
benchTop.receiveShadow = true;
benchTop.castShadow = true;
benchGroup.add(benchTop);
const benchEdge = new THREE.Mesh(
  new THREE.BoxGeometry(8.05, 0.04, 2.65),
  new THREE.MeshStandardMaterial({ color: 0x78350f, roughness: 0.75 })
);
benchEdge.position.y = -0.08;
benchGroup.add(benchEdge);
// Bench legs (4)
for (const [x, z] of [[-3.7, 1.1], [3.7, 1.1], [-3.7, -1.1], [3.7, -1.1]]) {
  const leg = new THREE.Mesh(
    new THREE.BoxGeometry(0.12, 0.95, 0.12),
    new THREE.MeshStandardMaterial({ color: 0x374151, metalness: 0.6, roughness: 0.4 })
  );
  leg.position.set(x, -0.55, z);
  leg.castShadow = true;
  benchGroup.add(leg);
}
// Bench cabinet under
const cabinet = new THREE.Mesh(
  new THREE.BoxGeometry(7.6, 0.85, 2.3),
  new THREE.MeshStandardMaterial({ color: 0xe2e8f0, roughness: 0.6 })
);
cabinet.position.y = -0.5;
cabinet.castShadow = true;
benchGroup.add(cabinet);
// Drawer handles (3 drawers)
for (const x of [-2, 0, 2]) {
  const handle = new THREE.Mesh(
    new THREE.BoxGeometry(0.4, 0.04, 0.04),
    new THREE.MeshStandardMaterial({ color: 0x6b7280, metalness: 0.7 })
  );
  handle.position.set(x, -0.5, 1.17);
  benchGroup.add(handle);
}
scene.add(benchGroup);

// =============================================================
// INTERACTABLE OBJECTS
// =============================================================
const interactables = {};
function addInteractable(name, group, label) {
  group.userData.name = name;
  group.userData.label = label;
  group.traverse(c => { if (c.isMesh) c.userData.interactable = group; });
  interactables[name] = group;
  return group;
}

// --- Sample bottles A, B, C ---
SAMPLES.forEach((s, i) => {
  const g = new THREE.Group();
  // Body — laboratory bottle (with shoulders)
  const body = new THREE.Mesh(
    new THREE.CylinderGeometry(0.16, 0.16, 0.40, 28),
    new THREE.MeshPhysicalMaterial({
      color: 0xffffff, transparent: true, opacity: 0.35,
      roughness: 0.06, metalness: 0,
      transmission: 0.85, ior: 1.45, thickness: 0.1,
      clearcoat: 0.5, clearcoatRoughness: 0.1,
    })
  );
  body.position.y = 0.22;
  body.castShadow = true;
  g.add(body);
  // Shoulder (sphere top)
  const shoulder = new THREE.Mesh(
    new THREE.SphereGeometry(0.16, 24, 12, 0, Math.PI * 2, 0, Math.PI * 0.4),
    new THREE.MeshPhysicalMaterial({
      color: 0xffffff, transparent: true, opacity: 0.35,
      roughness: 0.06, transmission: 0.85, ior: 1.45,
    })
  );
  shoulder.position.y = 0.42;
  g.add(shoulder);
  // Liquid inside
  const liquid = new THREE.Mesh(
    new THREE.CylinderGeometry(0.14, 0.14, 0.30, 24),
    new THREE.MeshStandardMaterial({ color: s.hex, roughness: 0.3, metalness: 0.05 })
  );
  liquid.position.y = 0.18;
  g.add(liquid);
  // Surface
  const surface = new THREE.Mesh(
    new THREE.CylinderGeometry(0.14, 0.14, 0.005, 24),
    new THREE.MeshStandardMaterial({ color: s.hex, opacity: 0.7, transparent: true, roughness: 0.1 })
  );
  surface.position.y = 0.33;
  g.add(surface);
  // Cap (screwed)
  const cap = new THREE.Mesh(
    new THREE.CylinderGeometry(0.08, 0.08, 0.10, 18),
    new THREE.MeshStandardMaterial({ color: 0x1f1147, roughness: 0.4, metalness: 0.3 })
  );
  cap.position.y = 0.52;
  cap.castShadow = true;
  g.add(cap);
  // Label texture
  const labelC = document.createElement('canvas');
  labelC.width = 120; labelC.height = 80;
  const lctx = labelC.getContext('2d');
  lctx.fillStyle = '#fefce8'; lctx.fillRect(0, 0, 120, 80);
  lctx.strokeStyle = '#d97706'; lctx.lineWidth = 2; lctx.strokeRect(2, 2, 116, 76);
  lctx.fillStyle = '#1e293b';
  lctx.font = 'bold 36px sans-serif'; lctx.textAlign = 'center';
  lctx.fillText(s.id, 60, 42);
  lctx.font = 'bold 9px sans-serif';
  lctx.fillText(s.name.split('— ')[1] || '', 60, 60);
  lctx.font = '8px sans-serif';
  lctx.fillStyle = '#7c2d12';
  lctx.fillText('Đơn nguyên', 60, 72);
  const labelTex = new THREE.CanvasTexture(labelC);
  const label = new THREE.Mesh(
    new THREE.PlaneGeometry(0.22, 0.15),
    new THREE.MeshBasicMaterial({ map: labelTex, transparent: true })
  );
  label.position.set(0, 0.22, 0.165);
  g.add(label);

  g.position.set(-2.6 + i * 0.55, 0.07, 0.4);
  g.userData.type = 'sample';
  g.userData.sampleId = s.id;
  addInteractable('bottle_' + s.id, g, `🧪 ${s.name}`);
  scene.add(g);
});

// --- TLC plate ---
const plateGroup = new THREE.Group();
const plateMesh = new THREE.Mesh(
  new THREE.BoxGeometry(0.62, 1.10, 0.03),
  new THREE.MeshStandardMaterial({ color: 0xfef3c7, roughness: 0.65 })
);
plateMesh.castShadow = true;
plateMesh.receiveShadow = true;
plateGroup.add(plateMesh);

// Plate texture (canvas) — for spots + lines
const plateTexCanvas = document.createElement('canvas');
plateTexCanvas.width = 248; plateTexCanvas.height = 440;
const ptctx = plateTexCanvas.getContext('2d');
function redrawPlateTex() {
  const uv = typeof uvOn !== 'undefined' && uvOn;
  if (uv) {
    ptctx.fillStyle = '#2a1f3d'; // Dark purple base under UV
    ptctx.fillRect(0, 0, 248, 440);
    // Subtle UV-reactive glow
    const gg = ptctx.createRadialGradient(124, 220, 0, 124, 220, 240);
    gg.addColorStop(0, 'rgba(139,92,246,0.4)');
    gg.addColorStop(1, 'rgba(139,92,246,0)');
    ptctx.fillStyle = gg;
    ptctx.fillRect(0, 0, 248, 440);
  } else {
    ptctx.fillStyle = '#fef3c7'; ptctx.fillRect(0, 0, 248, 440);
    // Silica gel texture (subtle noise)
    for (let i = 0; i < 800; i++) {
      ptctx.fillStyle = `rgba(180,150,100,${Math.random() * 0.04})`;
      const x = Math.random() * 248, y = Math.random() * 440;
      ptctx.fillRect(x, y, 2, 2);
    }
  }
  // Border
  ptctx.strokeStyle = uv ? '#a78bfa' : '#92400e'; ptctx.lineWidth = 2;
  ptctx.strokeRect(4, 4, 240, 432);
  // Origin line (dashed)
  const originY = 440 * 0.85;
  ptctx.strokeStyle = '#6b7280'; ptctx.lineWidth = 1.5;
  ptctx.setLineDash([5, 4]);
  ptctx.beginPath();
  ptctx.moveTo(20, originY); ptctx.lineTo(228, originY); ptctx.stroke();
  ptctx.setLineDash([]);
  // 'origin' label
  ptctx.fillStyle = '#6b7280'; ptctx.font = '10px sans-serif';
  ptctx.fillText('origin', 6, originY + 3);
  // Solvent front if developed
  if (state.devProgress >= 1) {
    ptctx.strokeStyle = '#ef4444'; ptctx.lineWidth = 1.5;
    ptctx.setLineDash([4, 3]);
    ptctx.beginPath();
    ptctx.moveTo(20, 22); ptctx.lineTo(228, 22); ptctx.stroke();
    ptctx.setLineDash([]);
    ptctx.fillStyle = '#ef4444'; ptctx.font = '10px sans-serif';
    ptctx.fillText('front', 6, 25);
  }
  // Spots
  for (const spot of state.plateSpots) {
    const s = SAMPLES.find(x => x.id === spot.sampleId);
    const dx = 50 + spot.position * 148;
    const rise = state.devProgress * (440 * 0.7) * s.trueRf;
    const dy = originY - rise;
    const radius = state.devProgress > 0 ? 11 : 7;
    const hex = '#' + s.hex.toString(16).padStart(6, '0');
    // Pre-development spots: visible (capillary just placed). Post-dev: faint until UV (Unity gốc alpha 0.05 → 0.3).
    const isDeveloped = state.devProgress >= 1;
    if (uv) {
      // UV: Spots fluoresce brightly — outer wide glow + bright core
      const wideGlow = ptctx.createRadialGradient(dx, dy, 0, dx, dy, radius * 4);
      wideGlow.addColorStop(0, 'rgba(255,255,255,0.7)');
      wideGlow.addColorStop(0.3, hex + 'aa');
      wideGlow.addColorStop(0.7, hex + '44');
      wideGlow.addColorStop(1, hex + '00');
      ptctx.fillStyle = wideGlow;
      ptctx.beginPath(); ptctx.arc(dx, dy, radius * 4, 0, Math.PI * 2); ptctx.fill();
      ptctx.fillStyle = '#ffffff';
      ptctx.beginPath(); ptctx.arc(dx, dy, radius * 0.7, 0, Math.PI * 2); ptctx.fill();
    } else if (isDeveloped) {
      // Developed, no UV: spots barely visible (Unity alpha=0.05) — encourages player to use UV
      ptctx.globalAlpha = 0.18;
      ptctx.fillStyle = hex;
      ptctx.beginPath(); ptctx.arc(dx, dy, radius * 0.8, 0, Math.PI * 2); ptctx.fill();
      ptctx.globalAlpha = 1;
    } else {
      // Pre-dev: full visibility (just chấm xong) — soft glow + solid
      const grad = ptctx.createRadialGradient(dx, dy, 0, dx, dy, radius * 1.6);
      grad.addColorStop(0, hex + 'cc');
      grad.addColorStop(0.5, hex + '55');
      grad.addColorStop(1, hex + '00');
      ptctx.fillStyle = grad;
      ptctx.beginPath(); ptctx.arc(dx, dy, radius * 1.6, 0, Math.PI * 2); ptctx.fill();
      ptctx.fillStyle = hex;
      ptctx.beginPath(); ptctx.arc(dx, dy, radius, 0, Math.PI * 2); ptctx.fill();
    }
    // Label
    if (state.devProgress >= 1) {
      ptctx.fillStyle = uv ? '#fbbf24' : '#1e293b';
      ptctx.font = 'bold 11px sans-serif';
      ptctx.textAlign = 'center';
      ptctx.fillText(s.id, dx, dy - radius - 6);
      ptctx.textAlign = 'left';
    }
  }
  plateTex.needsUpdate = true;
}
const plateTex = new THREE.CanvasTexture(plateTexCanvas);
plateMesh.material.map = plateTex;
plateMesh.material.needsUpdate = true;
plateGroup.position.set(0, 0.62, -0.2);
plateGroup.userData.type = 'plate';
addInteractable('plate', plateGroup, '📋 Đĩa TLC silica');
scene.add(plateGroup);

// --- Capillary (mao quản) ---
const capGroup = new THREE.Group();
const capStick = new THREE.Mesh(
  new THREE.CylinderGeometry(0.022, 0.024, 0.50, 14),
  new THREE.MeshPhysicalMaterial({ color: 0xffffff, transparent: true, opacity: 0.6, roughness: 0.1, transmission: 0.4 })
);
capStick.position.y = 0.25;
capStick.castShadow = true;
capGroup.add(capStick);
const capTip = new THREE.Mesh(
  new THREE.CylinderGeometry(0.022, 0.022, 0.12, 12),
  new THREE.MeshStandardMaterial({ color: 0xcccccc, visible: false })
);
capTip.position.y = 0.06;
capGroup.add(capTip);
capGroup.position.set(1.2, 0.07, 0.8);
capGroup.rotation.z = -0.18;
addInteractable('capillary', capGroup, '🖊️ Mao quản');
scene.add(capGroup);

// --- Developing chamber (glass jar with lid) ---
const chamberGroup = new THREE.Group();
const cw = 0.85, chHeight = 1.4, cd = 0.5;
const glassMat = new THREE.MeshPhysicalMaterial({
  color: 0xffffff, transparent: true, opacity: 0.18, roughness: 0.02,
  transmission: 0.95, ior: 1.45, thickness: 0.4,
  side: THREE.DoubleSide, clearcoat: 0.8, clearcoatRoughness: 0.05,
});
const chamberFloor = new THREE.Mesh(new THREE.BoxGeometry(cw, 0.025, cd), glassMat);
chamberFloor.position.y = 0.012; chamberGroup.add(chamberFloor);
const chamberW = (a,b,c,x,y,z) => {
  const m = new THREE.Mesh(new THREE.BoxGeometry(a,b,c), glassMat);
  m.position.set(x,y,z); m.castShadow = true; chamberGroup.add(m); return m;
};
chamberW(cw, chHeight, 0.025, 0, chHeight/2, cd/2);
chamberW(cw, chHeight, 0.025, 0, chHeight/2, -cd/2);
chamberW(0.025, chHeight, cd, -cw/2, chHeight/2, 0);
chamberW(0.025, chHeight, cd, cw/2, chHeight/2, 0);
// Glass lid (slightly above)
const chamberLid = new THREE.Mesh(
  new THREE.BoxGeometry(cw + 0.04, 0.04, cd + 0.04),
  new THREE.MeshPhysicalMaterial({ color: 0xa78bfa, transparent: true, opacity: 0.3, roughness: 0.2, metalness: 0.1, transmission: 0.4 })
);
chamberLid.position.y = chHeight + 0.05;
chamberLid.visible = false; // shown when plate placed
chamberGroup.add(chamberLid);
// Solvent inside (initially invisible)
const solventLiquid = new THREE.Mesh(
  new THREE.BoxGeometry(cw - 0.06, 0.28, cd - 0.06),
  new THREE.MeshPhysicalMaterial({ color: 0xa78bfa, transparent: true, opacity: 0.55, roughness: 0.15, transmission: 0.4 })
);
solventLiquid.position.y = 0.15;
solventLiquid.visible = false;
chamberGroup.add(solventLiquid);
// Cardboard base label
const chamberBaseLabelCanvas = document.createElement('canvas');
chamberBaseLabelCanvas.width = 200; chamberBaseLabelCanvas.height = 40;
{
  const c = chamberBaseLabelCanvas.getContext('2d');
  c.fillStyle = '#1e293b'; c.fillRect(0, 0, 200, 40);
  c.fillStyle = 'white'; c.font = 'bold 14px sans-serif'; c.textAlign = 'center';
  c.fillText('TLC Development Chamber', 100, 25);
}
const chamberLabelTex = new THREE.CanvasTexture(chamberBaseLabelCanvas);
const chamberLabel = new THREE.Mesh(
  new THREE.PlaneGeometry(0.7, 0.14),
  new THREE.MeshBasicMaterial({ map: chamberLabelTex })
);
chamberLabel.position.set(0, -0.04, cd/2 + 0.015);
chamberGroup.add(chamberLabel);

chamberGroup.position.set(2.6, 0.07, -0.2);
chamberGroup.userData.type = 'chamber';
chamberGroup.userData.solventLiquid = solventLiquid;
chamberGroup.userData.lid = chamberLid;
addInteractable('chamber', chamberGroup, '🫙 Bình triển khai');
scene.add(chamberGroup);

// --- Solvent bottle (large) ---
const sbGroup = new THREE.Group();
const sbBody = new THREE.Mesh(
  new THREE.CylinderGeometry(0.22, 0.22, 0.62, 28),
  new THREE.MeshPhysicalMaterial({
    color: 0xffffff, transparent: true, opacity: 0.25,
    roughness: 0.06, transmission: 0.85, ior: 1.45,
  })
);
sbBody.position.y = 0.33;
sbBody.castShadow = true;
sbGroup.add(sbBody);
const sbLiquid = new THREE.Mesh(
  new THREE.CylinderGeometry(0.20, 0.20, 0.46, 24),
  new THREE.MeshStandardMaterial({ color: 0xa78bfa, transparent: true, opacity: 0.75, roughness: 0.15 })
);
sbLiquid.position.y = 0.25;
sbGroup.add(sbLiquid);
const sbShoulder = new THREE.Mesh(
  new THREE.SphereGeometry(0.22, 24, 12, 0, Math.PI * 2, 0, Math.PI * 0.4),
  new THREE.MeshPhysicalMaterial({ color: 0xffffff, transparent: true, opacity: 0.25, roughness: 0.06, transmission: 0.85 })
);
sbShoulder.position.y = 0.64;
sbGroup.add(sbShoulder);
const sbCap = new THREE.Mesh(
  new THREE.CylinderGeometry(0.10, 0.10, 0.12, 16),
  new THREE.MeshStandardMaterial({ color: 0x374151, metalness: 0.5, roughness: 0.3 })
);
sbCap.position.y = 0.74;
sbGroup.add(sbCap);
// Label
const sbLabelC = document.createElement('canvas');
sbLabelC.width = 200; sbLabelC.height = 100;
{
  const c = sbLabelC.getContext('2d');
  c.fillStyle = '#f3e8ff'; c.fillRect(0, 0, 200, 100);
  c.strokeStyle = '#7c3aed'; c.lineWidth = 3; c.strokeRect(4, 4, 192, 92);
  c.fillStyle = '#581c87';
  c.font = 'bold 16px sans-serif'; c.textAlign = 'center';
  c.fillText('PHA ĐỘNG', 100, 30);
  c.font = '11px sans-serif';
  c.fillText('Hexane : EtOAc', 100, 52);
  c.fillText('7 : 3 (v/v)', 100, 68);
  c.fillStyle = '#7c2d12'; c.font = 'bold 9px sans-serif';
  c.fillText('⚠ DỄ CHÁY · UV+', 100, 86);
}
const sbLabelTex = new THREE.CanvasTexture(sbLabelC);
const sbLabel = new THREE.Mesh(
  new THREE.PlaneGeometry(0.32, 0.16),
  new THREE.MeshBasicMaterial({ map: sbLabelTex, transparent: true })
);
sbLabel.position.set(0, 0.30, 0.225);
sbGroup.add(sbLabel);
sbGroup.position.set(1.7, 0.07, 0.7);
sbGroup.userData.type = 'solvent';
addInteractable('solvent', sbGroup, '💧 Lọ dung môi');
scene.add(sbGroup);

// =============================================================
// DECORATIVE LAB EQUIPMENT (visual only, matches Unity gốc dụng cụ)
// =============================================================
// Test tube rack (giá ống nghiệm) with 3 test tubes — left side of bench
const rackGroup = new THREE.Group();
const rackBase = new THREE.Mesh(
  new THREE.BoxGeometry(0.65, 0.04, 0.18),
  new THREE.MeshStandardMaterial({ color: 0x6b7280, metalness: 0.5, roughness: 0.4 })
);
rackBase.position.y = 0.02; rackGroup.add(rackBase); rackBase.castShadow = true;
const rackTop = new THREE.Mesh(
  new THREE.BoxGeometry(0.65, 0.025, 0.18),
  new THREE.MeshStandardMaterial({ color: 0x6b7280, metalness: 0.5, roughness: 0.4 })
);
rackTop.position.y = 0.32; rackGroup.add(rackTop);
// 2 vertical rods
for (const xrod of [-0.30, 0.30]) {
  const rod = new THREE.Mesh(
    new THREE.CylinderGeometry(0.012, 0.012, 0.32, 8),
    new THREE.MeshStandardMaterial({ color: 0x9ca3af, metalness: 0.6 })
  );
  rod.position.set(xrod, 0.17, 0); rackGroup.add(rod);
}
// 3 test tubes in rack — Ống nghiệm
const tubeColors = [0xfde047, 0xfb923c, 0x10b981];
for (let i = 0; i < 3; i++) {
  const tube = new THREE.Group();
  const glass = new THREE.Mesh(
    new THREE.CylinderGeometry(0.045, 0.045, 0.42, 14),
    new THREE.MeshPhysicalMaterial({ color: 0xffffff, transparent: true, opacity: 0.25, roughness: 0.05, transmission: 0.9, ior: 1.5 })
  );
  glass.position.y = 0.21; tube.add(glass); glass.castShadow = true;
  // Liquid inside
  const tubeLiq = new THREE.Mesh(
    new THREE.CylinderGeometry(0.04, 0.04, 0.22, 12),
    new THREE.MeshStandardMaterial({ color: tubeColors[i], transparent: true, opacity: 0.75 })
  );
  tubeLiq.position.y = 0.13; tube.add(tubeLiq);
  // Rounded bottom
  const tubeBot = new THREE.Mesh(
    new THREE.SphereGeometry(0.045, 12, 8),
    new THREE.MeshPhysicalMaterial({ color: 0xffffff, transparent: true, opacity: 0.25, roughness: 0.05, transmission: 0.9, ior: 1.5 })
  );
  tubeBot.position.y = 0.02; tube.add(tubeBot);
  tube.position.set(-0.20 + i * 0.20, 0.04, 0);
  rackGroup.add(tube);
}
rackGroup.position.set(-1.8, 0.07, -0.7);
scene.add(rackGroup);

// Funnel (Phễu) + filter paper on a small support stand — middle-left back
const stand = new THREE.Group();
// Iron stand base
const standBase = new THREE.Mesh(
  new THREE.BoxGeometry(0.30, 0.04, 0.20),
  new THREE.MeshStandardMaterial({ color: 0x1f2937, metalness: 0.6, roughness: 0.5 })
);
standBase.position.y = 0.02; stand.add(standBase); standBase.castShadow = true;
// Rod (vertical)
const standRod = new THREE.Mesh(
  new THREE.CylinderGeometry(0.012, 0.012, 0.70, 10),
  new THREE.MeshStandardMaterial({ color: 0x9ca3af, metalness: 0.7 })
);
standRod.position.set(0.10, 0.37, 0); stand.add(standRod); standRod.castShadow = true;
// Ring clamp
const ringClamp = new THREE.Mesh(
  new THREE.TorusGeometry(0.10, 0.012, 8, 24),
  new THREE.MeshStandardMaterial({ color: 0x4b5563, metalness: 0.7 })
);
ringClamp.position.set(-0.05, 0.45, 0);
ringClamp.rotation.x = Math.PI / 2;
stand.add(ringClamp);
// Funnel (cone) in ring
const funnelGroup = new THREE.Group();
const funnelCone = new THREE.Mesh(
  new THREE.ConeGeometry(0.11, 0.18, 24, 1, true),
  new THREE.MeshPhysicalMaterial({ color: 0xffffff, transparent: true, opacity: 0.3, roughness: 0.06, transmission: 0.85, side: THREE.DoubleSide })
);
funnelCone.position.y = 0.09; funnelCone.rotation.x = Math.PI;
funnelGroup.add(funnelCone);
// Funnel stem
const funnelStem = new THREE.Mesh(
  new THREE.CylinderGeometry(0.014, 0.014, 0.16, 12),
  new THREE.MeshPhysicalMaterial({ color: 0xffffff, transparent: true, opacity: 0.3, roughness: 0.06, transmission: 0.85 })
);
funnelStem.position.y = -0.08; funnelGroup.add(funnelStem);
// Filter paper inside funnel (small triangle)
const filterPaper = new THREE.Mesh(
  new THREE.ConeGeometry(0.09, 0.10, 16),
  new THREE.MeshStandardMaterial({ color: 0xfefce8, roughness: 0.85 })
);
filterPaper.position.y = 0.05; filterPaper.rotation.x = Math.PI;
funnelGroup.add(filterPaper);
funnelGroup.position.set(-0.05, 0.45, 0);
stand.add(funnelGroup);
stand.position.set(-1.05, 0.07, -0.7);
scene.add(stand);

// Spoon (Thìa) — on the bench
const spoonGroup = new THREE.Group();
const spoonHandle = new THREE.Mesh(
  new THREE.BoxGeometry(0.22, 0.015, 0.025),
  new THREE.MeshStandardMaterial({ color: 0x9ca3af, metalness: 0.7, roughness: 0.3 })
);
spoonHandle.castShadow = true;
spoonGroup.add(spoonHandle);
const spoonBowl = new THREE.Mesh(
  new THREE.SphereGeometry(0.035, 12, 8, 0, Math.PI * 2, 0, Math.PI / 2),
  new THREE.MeshStandardMaterial({ color: 0xd1d5db, metalness: 0.8, roughness: 0.25, side: THREE.DoubleSide })
);
spoonBowl.position.set(0.12, -0.005, 0);
spoonBowl.rotation.x = Math.PI;
spoonGroup.add(spoonBowl);
spoonGroup.position.set(-0.4, 0.085, 0.75);
spoonGroup.rotation.y = 0.3;
scene.add(spoonGroup);

// Powder jar (Lọ bột) — small jar with powder
const powderJar = new THREE.Group();
const pjBody = new THREE.Mesh(
  new THREE.CylinderGeometry(0.10, 0.10, 0.18, 18),
  new THREE.MeshPhysicalMaterial({ color: 0xffffff, transparent: true, opacity: 0.35, roughness: 0.1, transmission: 0.8 })
);
pjBody.position.y = 0.09; powderJar.add(pjBody); pjBody.castShadow = true;
const pjPowder = new THREE.Mesh(
  new THREE.CylinderGeometry(0.09, 0.09, 0.11, 16),
  new THREE.MeshStandardMaterial({ color: 0xfde68a, roughness: 0.85 })
);
pjPowder.position.y = 0.06; powderJar.add(pjPowder);
const pjCap = new THREE.Mesh(
  new THREE.CylinderGeometry(0.11, 0.11, 0.04, 18),
  new THREE.MeshStandardMaterial({ color: 0x1f1147 })
);
pjCap.position.y = 0.20; powderJar.add(pjCap);
// Label
const pjLabelC = document.createElement('canvas');
pjLabelC.width = 100; pjLabelC.height = 50;
{
  const c = pjLabelC.getContext('2d');
  c.fillStyle = '#fefce8'; c.fillRect(0, 0, 100, 50);
  c.strokeStyle = '#7c2d12'; c.lineWidth = 2; c.strokeRect(2, 2, 96, 46);
  c.fillStyle = '#1e293b'; c.font = 'bold 11px sans-serif'; c.textAlign = 'center';
  c.fillText('BỘT', 50, 20);
  c.font = '9px sans-serif';
  c.fillText('Caffeine', 50, 35);
}
const pjLabel = new THREE.Mesh(
  new THREE.PlaneGeometry(0.16, 0.08),
  new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(pjLabelC), transparent: true })
);
pjLabel.position.set(0, 0.10, 0.101); powderJar.add(pjLabel);
powderJar.position.set(-0.7, 0.07, 0.75);
powderJar.userData.type = 'powder';
addInteractable('powder', powderJar, '🫙 Lọ bột Caffeine');
scene.add(powderJar);

// "Cốc vàng" (yellow cup) — small beaker beside plate
const cocVangGroup = new THREE.Group();
const cv = new THREE.Mesh(
  new THREE.CylinderGeometry(0.08, 0.06, 0.13, 18, 1, true),
  new THREE.MeshPhysicalMaterial({ color: 0xfde047, transparent: true, opacity: 0.45, roughness: 0.1, transmission: 0.6, side: THREE.DoubleSide })
);
cv.position.y = 0.065;
cv.castShadow = true;
cocVangGroup.add(cv);
const cvBot = new THREE.Mesh(
  new THREE.CylinderGeometry(0.06, 0.06, 0.005, 18),
  new THREE.MeshStandardMaterial({ color: 0xfacc15 })
);
cvBot.position.y = 0.003; cocVangGroup.add(cvBot);
// Slight inner liquid (yellow) — initially empty, fills up in pre-prep
const cvLiq = new THREE.Mesh(
  new THREE.CylinderGeometry(0.058, 0.058, 0.06, 14),
  new THREE.MeshStandardMaterial({ color: 0xfacc15, transparent: true, opacity: 0.6 })
);
cvLiq.position.y = 0.04; cvLiq.scale.y = 0.01; cvLiq.visible = false;
cocVangGroup.add(cvLiq);
cocVangGroup.position.set(-1.2, 0.07, 0.55);
cocVangGroup.userData.type = 'cocvang';
cocVangGroup.userData.liquid = cvLiq;
addInteractable('cocvang', cocVangGroup, '🥃 Cốc vàng (CocVang)');
scene.add(cocVangGroup);

// Heating plate (Bộ đun cách thuỷ) — flat hot plate beside chamber
const hotPlateGroup = new THREE.Group();
const hpBase = new THREE.Mesh(
  new THREE.BoxGeometry(0.32, 0.06, 0.30),
  new THREE.MeshStandardMaterial({ color: 0x1f2937, metalness: 0.6, roughness: 0.4 })
);
hpBase.position.y = 0.03; hotPlateGroup.add(hpBase); hpBase.castShadow = true;
// Heating disc
const hpDisc = new THREE.Mesh(
  new THREE.CylinderGeometry(0.11, 0.11, 0.012, 24),
  new THREE.MeshStandardMaterial({ color: 0x374151, metalness: 0.4, roughness: 0.5, emissive: 0xef4444, emissiveIntensity: 0.15 })
);
hpDisc.position.y = 0.066; hotPlateGroup.add(hpDisc);
// Knob
const hpKnob = new THREE.Mesh(
  new THREE.CylinderGeometry(0.025, 0.025, 0.025, 16),
  new THREE.MeshStandardMaterial({ color: 0xef4444, metalness: 0.3 })
);
hpKnob.position.set(0.10, 0.045, 0.12); hotPlateGroup.add(hpKnob);
hotPlateGroup.position.set(1.05, 0.07, -0.7);
hotPlateGroup.userData.type = 'hotplate';
hotPlateGroup.userData.disc = hpDisc;
addInteractable('hotplate', hotPlateGroup, '🔥 Bộ đun cách thuỷ');
scene.add(hotPlateGroup);

// =============================================================
// PARTICLE SYSTEM (smoke for pouring)
// =============================================================
class ParticleBurst {
  constructor(position, color = 0xa78bfa, count = 30) {
    this.particles = [];
    const geo = new THREE.SphereGeometry(0.04, 6, 4);
    const mat = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.7 });
    for (let i = 0; i < count; i++) {
      const m = new THREE.Mesh(geo, mat.clone());
      m.position.copy(position);
      m.userData.vel = new THREE.Vector3(
        (Math.random() - 0.5) * 1.5,
        Math.random() * 1.8 + 0.5,
        (Math.random() - 0.5) * 1.5
      );
      m.userData.life = 1.0;
      this.particles.push(m);
      scene.add(m);
    }
  }
  update(dt) {
    let alive = false;
    for (const m of this.particles) {
      if (m.userData.life <= 0) continue;
      alive = true;
      m.position.x += m.userData.vel.x * dt;
      m.position.y += m.userData.vel.y * dt;
      m.position.z += m.userData.vel.z * dt;
      m.userData.vel.y -= 0.5 * dt; // gravity
      m.userData.life -= dt * 0.7;
      m.material.opacity = Math.max(0, m.userData.life * 0.7);
      m.scale.setScalar(1 + (1 - m.userData.life) * 1.2);
      if (m.userData.life <= 0) scene.remove(m);
    }
    return alive;
  }
}
let activeBursts = [];

// Steam column — vertical rising particles for đun cách thuỷ
class SteamColumn {
  constructor(position, intensity = 1, duration = 4) {
    this.particles = [];
    this.position = position.clone();
    this.intensity = intensity;
    this.duration = duration;
    this.elapsed = 0;
    this.geo = new THREE.SphereGeometry(0.05, 8, 6);
    this.matBase = new THREE.MeshBasicMaterial({ color: 0xf0f4ff, transparent: true, opacity: 0.5 });
  }
  spawn() {
    const m = new THREE.Mesh(this.geo, this.matBase.clone());
    m.position.copy(this.position);
    m.position.x += (Math.random() - 0.5) * 0.06;
    m.position.z += (Math.random() - 0.5) * 0.06;
    m.userData.vel = new THREE.Vector3(
      (Math.random() - 0.5) * 0.15,
      0.4 + Math.random() * 0.3,
      (Math.random() - 0.5) * 0.15
    );
    m.userData.life = 1.0;
    m.userData.maxLife = 1.6 + Math.random() * 0.6;
    this.particles.push(m);
    scene.add(m);
  }
  update(dt) {
    this.elapsed += dt;
    if (this.elapsed < this.duration && Math.random() < 0.5 * this.intensity) {
      this.spawn();
    }
    let alive = this.elapsed < this.duration;
    for (const m of this.particles) {
      if (m.userData.life <= 0) continue;
      alive = true;
      m.position.add(m.userData.vel.clone().multiplyScalar(dt));
      m.userData.vel.x += (Math.random() - 0.5) * dt * 0.4; // sway
      m.userData.life -= dt / m.userData.maxLife;
      m.material.opacity = Math.max(0, m.userData.life * 0.5);
      m.scale.setScalar(1 + (1 - m.userData.life) * 2.5);
      if (m.userData.life <= 0) scene.remove(m);
    }
    if (!alive) {
      for (const m of this.particles) if (m.parent) scene.remove(m);
    }
    return alive;
  }
}
let activeSteams = [];

// =============================================================
// INTERACTION (hover, click, drag)
// =============================================================
const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();
const hoverLabel = document.getElementById('hover-label');
let hoveredObject = null;
let pointerScreen = { x: 0, y: 0 };

function pointerMove(e) {
  const cx = e.clientX ?? e.touches?.[0]?.clientX ?? 0;
  const cy = e.clientY ?? e.touches?.[0]?.clientY ?? 0;
  pointer.x = (cx / window.innerWidth) * 2 - 1;
  pointer.y = -(cy / window.innerHeight) * 2 + 1;
  pointerScreen.x = cx; pointerScreen.y = cy;
}
renderer.domElement.addEventListener('pointermove', pointerMove);
renderer.domElement.addEventListener('pointerdown', pointerMove);

function getInteractableUnderPointer() {
  raycaster.setFromCamera(pointer, camera);
  const hits = raycaster.intersectObjects(Object.values(interactables), true);
  for (const hit of hits) {
    let cur = hit.object;
    while (cur) {
      if (cur.userData.type) return cur;
      cur = cur.parent;
    }
  }
  return null;
}

function setHovered(obj) {
  if (obj === hoveredObject) return;
  // Remove outline from old
  if (hoveredObject) {
    hoveredObject.traverse(c => {
      if (c.isMesh && c.userData._origEmissive !== undefined) {
        c.material.emissive?.setHex(c.userData._origEmissive);
        c.material.emissiveIntensity = c.userData._origEmissiveIntensity || 0;
        delete c.userData._origEmissive;
        delete c.userData._origEmissiveIntensity;
      }
    });
  }
  hoveredObject = obj;
  if (obj) {
    obj.traverse(c => {
      if (c.isMesh && c.material.emissive) {
        c.userData._origEmissive = c.material.emissive.getHex();
        c.userData._origEmissiveIntensity = c.material.emissiveIntensity || 0;
        c.material.emissive.setHex(0xfbbf24);
        c.material.emissiveIntensity = 0.25;
      }
    });
    hoverLabel.textContent = obj.userData.label || '';
    hoverLabel.style.left = pointerScreen.x + 'px';
    hoverLabel.style.top = pointerScreen.y + 'px';
    hoverLabel.classList.add('show');
    document.body.style.cursor = 'pointer';
  } else {
    hoverLabel.classList.remove('show');
    document.body.style.cursor = 'default';
  }
}

renderer.domElement.addEventListener('click', () => {
  if (!hoveredObject) return;
  handleClick(hoveredObject);
});

let animating = false;
function handleClick(obj) {
  if (animating) return;
  const t = obj.userData.type;

  // ====== PRE-PREP (Full Mode, step 0) ======
  if (state.step === 0) {
    if (t === 'powder' && state.cupPowder < 3) {
      sfx.grab();
      toast('🥄 Múc bột bằng thìa...', 'info');
      animateSpoonScoop(obj, () => {
        state.cupPowder++;
        const cv = interactables.cocvang;
        cv.userData.liquid.visible = true;
        cv.userData.liquid.scale.y = 0.2 + state.cupPowder * 0.15;
        sfx.correct();
        toast(`✓ Đổ bột vào cốc (${state.cupPowder}/3)`, 'ok');
        if (state.cupPowder >= 3) toast('Đủ bột — Click 🥃 Cốc vàng để hoà dung môi', 'info');
        updateUI();
      });
      return;
    }
    if (t === 'cocvang' && state.cupPowder >= 1 && state.cupSolvent < 3) {
      sfx.grab();
      toast('💧 Đang nhỏ dung môi vào cốc...', 'info');
      animateDropperToCup(obj, () => {
        state.cupSolvent++;
        const cv = interactables.cocvang;
        cv.userData.liquid.scale.y = 0.5 + state.cupSolvent * 0.18;
        sfx.correct();
        toast(`✓ Hoà dung môi (${state.cupSolvent}/3)`, 'ok');
        if (state.cupSolvent >= 3) toast('Đủ dung môi — Click 🔥 Bộ đun cách thuỷ', 'info');
        updateUI();
      });
      return;
    }
    if (t === 'hotplate' && state.cupSolvent >= 1 && !state.cupHeated) {
      sfx.grab();
      toast('🔥 Đun cách thuỷ — chờ ~4 giây...', 'info');
      animateCupToHotPlate(() => {
        state.cupHeated = true;
        state.prepDone = true;
        state.step = 1;
        state.score += 30;
        sfx.perfect();
        toast('✓ Đun xong — dung dịch sẵn sàng. Bây giờ chấm mẫu lên đĩa TLC.', 'ok');
        updateUI();
      });
      return;
    }
    toast('⚠️ Theo thứ tự: Lọ bột → Cốc vàng → Bộ đun cách thuỷ', 'err');
    sfx.wrong();
    return;
  }

  if (state.step <= 2 && t === 'sample') {
    if (state.capillary) {
      toast('⚠️ Mao quản đã có mẫu — chấm lên đĩa TLC trước', 'err');
      sfx.wrong();
      return;
    }
    const sid = obj.userData.sampleId;
    const sample = SAMPLES.find(s => s.id === sid);
    sfx.grab();
    toast(`🧪 Đang hút ${sample.name}...`, 'info');
    animateCapillaryDip(obj, sample.hex, () => {
      state.capillary = sid;
      state.step = 2;
      capTip.material.color.set(sample.hex);
      capTip.material.visible = true;
      capTip.material.needsUpdate = true;
      capGroup.position.y = 0.18;
      toast(`🧪 Đã hút ${sample.name}`, 'ok');
      updateUI();
    });
  } else if (state.step <= 2 && t === 'plate' && state.capillary) {
    if (state.plateSpots.some(s => s.sampleId === state.capillary)) {
      toast(`⚠️ Mẫu ${state.capillary} đã chấm`, 'err'); sfx.wrong();
      return;
    }
    const position = state.plateSpots.length / 3 + 0.16;
    state.plateSpots.push({ sampleId: state.capillary, position });
    state.score += 20;
    toast(`✓ Chấm ${state.capillary} (${state.plateSpots.length}/3)`, 'ok');
    sfx.correct();
    state.capillary = null;
    capTip.material.visible = false;
    capGroup.position.y = 0.07;
    redrawPlateTex();
    if (state.plateSpots.length >= 3) {
      state.step = 3;
      setHint('Click vào lọ dung môi (chai lớn 💧)');
    } else {
      state.step = 1;
    }
  } else if (state.step === 3 && t === 'solvent') {
    toast('💧 Đang đổ dung môi...', 'info');
    sfx.grab();
    animatePourSolvent(() => {
      state.chamberFilled = true;
      state.score += 20;
      state.step = 4;
      toast('✓ Đã đổ dung môi vào bình', 'ok');
      sfx.correct();
      updateUI();
    });
  } else if (state.step === 4 && t === 'plate') {
    state.plateInChamber = true;
    state.devStartTime = performance.now();
    state.score += 20;
    state.step = 5;
    toast('✓ Đặt đĩa — triển khai 30 giây (bấm ⏩ để tăng tốc)', 'ok');
    sfx.grab();
    btnAction.disabled = true;
    btnAction.textContent = '⏩ Tăng tốc';
    animatePlateInto();
    chamberGroup.userData.lid.visible = true;
  } else if (state.step === 6 && t === 'plate' && state.plateRemoved) {
    raycaster.setFromCamera(pointer, camera);
    const hits = raycaster.intersectObject(plateMesh, false);
    if (hits.length === 0) return;
    const uv = hits[0].uv;
    if (!uv) return;
    const px = uv.x * 248;
    const py = (1 - uv.y) * 440;
    for (const spot of state.plateSpots) {
      const s = SAMPLES.find(x => x.id === spot.sampleId);
      if (s.id in state.measurements) continue;
      const dx = 50 + spot.position * 148;
      const rise = (440 * 0.7) * s.trueRf;
      const dy = 440 * 0.85 - rise;
      if (Math.hypot(px - dx, py - dy) < 36) {
        promptRf(s);
        return;
      }
    }
    toast('Click thật chính xác vào tâm vệt mẫu', 'info');
  }
  updateUI();
}

// =============================================================
// ANIMATIONS
// =============================================================
function animateCapillaryDip(sampleObj, sampleHex, onDone) {
  animating = true;
  const startPos = capGroup.position.clone();
  const startRot = capGroup.rotation.z;
  const samplePos = sampleObj.position.clone();
  const aboveBottle = new THREE.Vector3(samplePos.x, samplePos.y + 0.85, samplePos.z);
  const insideBottle = new THREE.Vector3(samplePos.x, samplePos.y + 0.35, samplePos.z);
  const t0 = performance.now();
  function step() {
    const t = (performance.now() - t0) / 1700;
    if (t < 0.25) {
      const e = t / 0.25;
      capGroup.position.lerpVectors(startPos, aboveBottle, smoothEase(e));
      capGroup.rotation.z = startRot * (1 - e);
    } else if (t < 0.42) {
      const e = (t - 0.25) / 0.17;
      capGroup.position.lerpVectors(aboveBottle, insideBottle, smoothEase(e));
    } else if (t < 0.55) {
      // dwell in liquid — tint the tip
      capTip.material.color.set(sampleHex);
      capTip.material.visible = true;
    } else if (t < 0.72) {
      const e = (t - 0.55) / 0.17;
      capGroup.position.lerpVectors(insideBottle, aboveBottle, smoothEase(e));
    } else if (t < 1) {
      const e = (t - 0.72) / 0.28;
      capGroup.position.lerpVectors(aboveBottle, startPos, smoothEase(e));
      capGroup.rotation.z = startRot * e;
    } else {
      capGroup.position.copy(startPos);
      capGroup.rotation.z = startRot;
      animating = false;
      onDone && onDone();
      return;
    }
    requestAnimationFrame(step);
  }
  step();
}

function animatePourSolvent(onDone) {
  animating = true;
  const startPos = sbGroup.position.clone();
  const startRotZ = sbGroup.rotation.z;
  const chamberPos = chamberGroup.position.clone();
  const abovePos = new THREE.Vector3(chamberPos.x - 0.15, 1.0, chamberPos.z + 0.1);
  const targetTiltZ = Math.PI * 0.45;
  let solventShown = false;
  const sl = chamberGroup.userData.solventLiquid;
  const t0 = performance.now();
  function step() {
    const t = (performance.now() - t0) / 2200;
    if (t < 0.25) {
      const e = smoothEase(t / 0.25);
      sbGroup.position.lerpVectors(startPos, abovePos, e);
    } else if (t < 0.42) {
      const e = smoothEase((t - 0.25) / 0.17);
      sbGroup.rotation.z = startRotZ * (1 - e) + (-targetTiltZ) * e;
    } else if (t < 0.78) {
      // Pour phase
      if (!solventShown) {
        solventShown = true;
        sl.visible = true;
        sl.scale.y = 0.05;
      }
      const fill = (t - 0.42) / 0.36;
      sl.scale.y = 0.05 + fill * 0.95;
      sl.position.y = 0.15 + fill * 0.05;
      // Particle stream
      if (Math.random() < 0.6) {
        activeBursts.push(new ParticleBurst(
          new THREE.Vector3(chamberPos.x + 0.05, 0.7, chamberPos.z), 0xa78bfa, 4
        ));
      }
    } else if (t < 0.88) {
      const e = smoothEase((t - 0.78) / 0.10);
      sbGroup.rotation.z = -targetTiltZ * (1 - e) + startRotZ * e;
    } else if (t < 1) {
      const e = smoothEase((t - 0.88) / 0.12);
      sbGroup.position.lerpVectors(abovePos, startPos, e);
    } else {
      sbGroup.position.copy(startPos);
      sbGroup.rotation.z = startRotZ;
      sl.scale.y = 1; sl.position.y = 0.15;
      animating = false;
      onDone && onDone();
      return;
    }
    requestAnimationFrame(step);
  }
  step();
}

function smoothEase(t) {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
}

// =============================================================
// PRE-PREP ANIMATIONS (Full Mode)
// =============================================================
function animateSpoonScoop(powderObj, onDone) {
  animating = true;
  const startPos = spoonGroup.position.clone();
  const startRotY = spoonGroup.rotation.y;
  const startRotZ = spoonGroup.rotation.z;
  const powderPos = powderObj.position.clone();
  const cup = interactables.cocvang.position.clone();
  const abovePowder = new THREE.Vector3(powderPos.x, 0.40, powderPos.z);
  const dipPowder = new THREE.Vector3(powderPos.x, 0.22, powderPos.z);
  const aboveCup = new THREE.Vector3(cup.x, 0.45, cup.z);
  const tiltCup = new THREE.Vector3(cup.x, 0.30, cup.z);
  const t0 = performance.now();
  function step() {
    const t = (performance.now() - t0) / 2400;
    if (t < 0.20) {
      const e = smoothEase(t / 0.20);
      spoonGroup.position.lerpVectors(startPos, abovePowder, e);
      spoonGroup.rotation.y = startRotY * (1 - e);
      spoonGroup.rotation.z = 0;
    } else if (t < 0.32) {
      const e = (t - 0.20) / 0.12;
      spoonGroup.position.lerpVectors(abovePowder, dipPowder, e);
    } else if (t < 0.42) {
      // dwell — scooping
    } else if (t < 0.55) {
      const e = (t - 0.42) / 0.13;
      spoonGroup.position.lerpVectors(dipPowder, abovePowder, e);
    } else if (t < 0.78) {
      const e = smoothEase((t - 0.55) / 0.23);
      spoonGroup.position.lerpVectors(abovePowder, aboveCup, e);
    } else if (t < 0.88) {
      const e = (t - 0.78) / 0.10;
      // Tilt spoon to drop powder
      spoonGroup.position.lerpVectors(aboveCup, tiltCup, e);
      spoonGroup.rotation.z = -e * Math.PI * 0.4;
      // particle dust
      if (Math.random() < 0.5) {
        activeBursts.push(new ParticleBurst(
          new THREE.Vector3(cup.x, 0.25, cup.z), 0xfde68a, 2
        ));
      }
    } else if (t < 1) {
      const e = (t - 0.88) / 0.12;
      spoonGroup.position.lerpVectors(tiltCup, startPos, smoothEase(e));
      spoonGroup.rotation.z = -Math.PI * 0.4 * (1 - e) + startRotZ * e;
      spoonGroup.rotation.y = startRotY * e;
    } else {
      spoonGroup.position.copy(startPos);
      spoonGroup.rotation.y = startRotY;
      spoonGroup.rotation.z = startRotZ;
      animating = false;
      onDone && onDone();
      return;
    }
    requestAnimationFrame(step);
  }
  step();
}

function animateDropperToCup(cupObj, onDone) {
  // Use the existing solvent bottle to drip into cup
  animating = true;
  const startPos = sbGroup.position.clone();
  const startRotZ = sbGroup.rotation.z;
  const cupPos = cupObj.position.clone();
  const aboveCup = new THREE.Vector3(cupPos.x, 0.7, cupPos.z + 0.05);
  const t0 = performance.now();
  function step() {
    const t = (performance.now() - t0) / 2000;
    if (t < 0.28) {
      const e = smoothEase(t / 0.28);
      sbGroup.position.lerpVectors(startPos, aboveCup, e);
    } else if (t < 0.4) {
      const e = (t - 0.28) / 0.12;
      sbGroup.rotation.z = startRotZ * (1 - e) + (-Math.PI * 0.35) * e;
    } else if (t < 0.72) {
      // Drip particles
      if (Math.random() < 0.5) {
        activeBursts.push(new ParticleBurst(
          new THREE.Vector3(cupPos.x, 0.35, cupPos.z), 0xa78bfa, 2
        ));
      }
    } else if (t < 0.84) {
      const e = (t - 0.72) / 0.12;
      sbGroup.rotation.z = -Math.PI * 0.35 * (1 - e) + startRotZ * e;
    } else if (t < 1) {
      const e = (t - 0.84) / 0.16;
      sbGroup.position.lerpVectors(aboveCup, startPos, smoothEase(e));
    } else {
      sbGroup.position.copy(startPos);
      sbGroup.rotation.z = startRotZ;
      animating = false;
      onDone && onDone();
      return;
    }
    requestAnimationFrame(step);
  }
  step();
}

function animateCupToHotPlate(onDone) {
  animating = true;
  const cup = interactables.cocvang;
  const startPos = cup.position.clone();
  const hp = interactables.hotplate.position.clone();
  const onPlate = new THREE.Vector3(hp.x, 0.14, hp.z);
  // Increase emissive on hot disc
  const disc = interactables.hotplate.userData.disc;
  const t0 = performance.now();
  let steamStarted = false;
  function step() {
    const t = (performance.now() - t0) / 6000;
    if (t < 0.15) {
      const e = smoothEase(t / 0.15);
      cup.position.lerpVectors(startPos, onPlate, e);
    } else if (t < 0.85) {
      // Heating phase — steam VFX, disc glow stronger
      if (!steamStarted) {
        steamStarted = true;
        activeSteams.push(new SteamColumn(
          new THREE.Vector3(hp.x, 0.20, hp.z), 1.2, 3.6
        ));
        disc.material.emissiveIntensity = 0.6;
      }
      // Subtle bubble shake
      cup.position.x = onPlate.x + Math.sin(performance.now() * 0.02) * 0.005;
      cup.position.z = onPlate.z + Math.cos(performance.now() * 0.018) * 0.005;
    } else if (t < 1) {
      const e = (t - 0.85) / 0.15;
      cup.position.lerpVectors(onPlate, startPos, smoothEase(e));
      disc.material.emissiveIntensity = 0.6 * (1 - e) + 0.15 * e;
    } else {
      cup.position.copy(startPos);
      disc.material.emissiveIntensity = 0.15;
      animating = false;
      onDone && onDone();
      return;
    }
    requestAnimationFrame(step);
  }
  step();
}

// =============================================================
// UV MODE (lift step 6: glow spots under UV light)
// =============================================================
let uvOn = false;
const originalIntensities = {
  ambient: ambient.intensity,
  ceiling: ceilingLight.intensity,
  sun: sun.intensity,
  fill: fillLight.intensity,
  rim: rimLight.intensity,
  bg: scene.background.getHex(),
};
const uvPointLight = new THREE.PointLight(0x8b5cf6, 0, 4, 1.5);
uvPointLight.position.set(0, 1.5, 0);
scene.add(uvPointLight);

function setUVMode(on) {
  uvOn = on;
  const o = originalIntensities;
  if (on) {
    ambient.intensity = 0.06;
    ceilingLight.intensity = 0.2;
    sun.intensity = 0.08;
    fillLight.intensity = 0.05;
    rimLight.intensity = 0.0;
    scene.background.setHex(0x1a0a3a);
    uvPointLight.intensity = 3.5;
    uvPointLight.position.copy(plateGroup.position).add(new THREE.Vector3(0, 0.5, 0.3));
    document.getElementById('uv-toggle').textContent = '🔦 UV ON';
    document.getElementById('uv-toggle').style.background = 'rgba(139,92,246,0.6)';
    sfx.grab();
  } else {
    ambient.intensity = o.ambient;
    ceilingLight.intensity = o.ceiling;
    sun.intensity = o.sun;
    fillLight.intensity = o.fill;
    rimLight.intensity = o.rim;
    scene.background.setHex(o.bg);
    uvPointLight.intensity = 0;
    document.getElementById('uv-toggle').textContent = '🔦';
    document.getElementById('uv-toggle').style.background = '';
  }
  redrawPlateTex();
}

function animatePlateInto() {
  const startPos = plateGroup.position.clone();
  const endPos = new THREE.Vector3(2.6, 0.62, -0.2);
  const startRot = plateGroup.rotation.y;
  const t0 = performance.now();
  function step() {
    const t = Math.min(1, (performance.now() - t0) / 1100);
    const e = 1 - Math.pow(1 - t, 3);
    plateGroup.position.lerpVectors(startPos, endPos, e);
    plateGroup.rotation.y = startRot * (1 - e);
    if (t < 1) requestAnimationFrame(step);
  }
  step();
}
function animatePlateOut() {
  const startPos = plateGroup.position.clone();
  const endPos = new THREE.Vector3(0, 0.62, -0.2);
  const t0 = performance.now();
  chamberGroup.userData.lid.visible = false;
  function step() {
    const t = Math.min(1, (performance.now() - t0) / 1100);
    const e = 1 - Math.pow(1 - t, 3);
    plateGroup.position.lerpVectors(startPos, endPos, e);
    if (t < 1) requestAnimationFrame(step);
  }
  step();
}
function smoothCameraTo(target, lookAt = null, duration = 1200) {
  const startPos = camera.position.clone();
  const startTarget = controls.target.clone();
  const t0 = performance.now();
  function step() {
    const t = Math.min(1, (performance.now() - t0) / duration);
    const e = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    camera.position.lerpVectors(startPos, target, e);
    if (lookAt) {
      controls.target.lerpVectors(startTarget, lookAt, e);
    }
    controls.update();
    if (t < 1) requestAnimationFrame(step);
  }
  step();
}

// =============================================================
// UI
// =============================================================
const btnAction = document.getElementById('btn-action');
const btnRestart = document.getElementById('btn-restart');
const sfxToggle = document.getElementById('sfx-toggle');

btnAction.addEventListener('click', () => {
  // Fast-forward during development (compressed from 30s → 5s remaining)
  if (state.step === 5 && state.devProgress < 1 && !state.fastForward) {
    state.fastForward = true;
    // Compress remaining time: target current progress + 5s remaining
    const remainingNow = (1 - state.devProgress) * 30000;
    const compressed = Math.min(remainingNow, 5000);
    state.devStartTime = performance.now() - (state.devProgress * 5000);
    toast('⏩ Tăng tốc triển khai', 'info');
    sfx.tick();
    return;
  }
  if (state.step === 5 && state.devProgress >= 1) {
    state.plateInChamber = false;
    state.plateRemoved = true;
    state.step = 6;
    state.score += 20;
    btnAction.textContent = '✓ Hoàn thành đo Rf';
    sfx.grab();
    animatePlateOut();
    smoothCameraTo(new THREE.Vector3(0, 2.0, 3.5), new THREE.Vector3(0, 1, -0.2), 1000);
  } else if (state.step === 6) {
    finishGame();
  }
});
btnRestart.addEventListener('click', () => {
  newState();
  if (uvOn) setUVMode(false);
  redrawPlateTex();
  chamberGroup.userData.solventLiquid.visible = false;
  chamberGroup.userData.lid.visible = false;
  plateGroup.position.set(0, 0.62, -0.2);
  plateGroup.rotation.y = 0;
  capTip.material.visible = false;
  capGroup.position.y = 0.07;
  capGroup.rotation.z = -0.18;
  sbGroup.position.set(1.7, 0.07, 0.7);
  sbGroup.rotation.z = 0;
  btnAction.disabled = true;
  btnAction.textContent = 'Thao tác';
  smoothCameraTo(new THREE.Vector3(0, 2.8, 5.2), new THREE.Vector3(0, 1, 0), 800);
  updateUI();
});
sfxToggle.addEventListener('click', () => {
  const on = toggleSfx();
  sfxToggle.textContent = on ? '🔊' : '🔇';
});
sfxToggle.textContent = isSfxEnabled() ? '🔊' : '🔇';

// UV toggle
document.getElementById('uv-toggle').addEventListener('click', () => setUVMode(!uvOn));

// Mode toggle (Simple vs Full)
document.getElementById('mode-toggle').addEventListener('click', () => {
  fullMode = !fullMode;
  document.getElementById('mode-toggle').textContent = fullMode ? '🔬 Full' : '🔬 Simple';
  document.getElementById('mode-toggle').style.background = fullMode ? 'rgba(236,72,153,0.5)' : '';
  toast(fullMode ? '🔬 Chuyển sang Full Mode — có pre-prep chuẩn Unity gốc' : '🔬 Simple Mode — chấm mẫu thẳng', 'info');
  // Reset state to apply mode
  if (uvOn) setUVMode(false);
  newState();
  redrawPlateTex();
  chamberGroup.userData.solventLiquid.visible = false;
  chamberGroup.userData.lid.visible = false;
  plateGroup.position.set(0, 0.62, -0.2);
  plateGroup.rotation.y = 0;
  capTip.material.visible = false;
  capGroup.position.y = 0.07;
  // Reset cup
  const cv = interactables.cocvang;
  if (cv) { cv.userData.liquid.visible = false; cv.userData.liquid.scale.y = 0.01; }
  btnAction.disabled = true;
  btnAction.textContent = 'Thao tác';
  updateUI();
});

function promptRf(sample) {
  const guess = prompt(`📏 Đo R_f của ${sample.name} (0.00 – 1.00):\n\n💡 Nhập số thập phân, ví dụ 0.50`, '0.50');
  if (guess === null) return;
  const v = parseFloat(guess);
  if (isNaN(v) || v < 0 || v > 1) { toast('⚠️ Rf phải trong [0, 1]', 'err'); sfx.wrong(); return; }
  state.measurements[sample.id] = v;
  const err = Math.abs(v - sample.trueRf);
  let pts = 0;
  if (err <= 0.05) { pts = 30; toast(`🎯 Rf ${sample.id} chính xác! +${pts}`, 'ok'); sfx.perfect(); }
  else if (err <= 0.10) { pts = 15; toast(`✓ Rf ${sample.id} gần đúng +${pts}`, 'ok'); sfx.correct(); }
  else { toast(`✗ Rf ${sample.id} sai. Đáp án ${sample.trueRf.toFixed(2)}`, 'err'); sfx.wrong(); }
  state.score += pts;
  updateUI();
  if (Object.keys(state.measurements).length >= 3) {
    setHint('Đã đo cả 3 vệt — click "Hoàn thành đo Rf" để xem kết quả');
  }
}

function displayStep() {
  const totalSteps = fullMode ? 7 : 6;
  const stepMap = fullMode ? {
    0: { n: 1, label: 'Chuẩn bị mẫu' },
    1: { n: 2, label: 'Chấm mẫu' },
    2: { n: 2, label: 'Chấm mẫu' },
    3: { n: 3, label: 'Pha pha động' },
    4: { n: 4, label: 'Triển khai' },
    5: { n: state.devProgress >= 1 ? 6 : 4, label: state.devProgress >= 1 ? 'Lấy đĩa ra' : 'Triển khai' },
    6: { n: 7, label: 'Đo Rf' },
  } : {
    1: { n: 2, label: 'Chấm mẫu' },
    2: { n: 2, label: 'Chấm mẫu' },
    3: { n: 3, label: 'Pha pha động' },
    4: { n: 4, label: 'Triển khai' },
    5: { n: state.devProgress >= 1 ? 5 : 4, label: state.devProgress >= 1 ? 'Lấy đĩa ra' : 'Triển khai' },
    6: { n: 6, label: 'Đo Rf' },
  };
  const s = stepMap[state.step] || { n: state.step, label: '' };
  return `${s.n}/${totalSteps} · ${s.label}`;
}
function updateUI() {
  document.getElementById('step-pill').textContent = `Bước ${displayStep()}`;
  document.getElementById('score').textContent = state.score;
  // Update tutorial
  const stepKey = state.step === 5 && state.devProgress >= 1 ? 6 : state.step;
  const tut = TUTORIALS[stepKey] || TUTORIALS[2];
  document.getElementById('tut-num').textContent = tut.n;
  document.getElementById('tut-title').innerHTML = tut.title;
  document.getElementById('tut-body').innerHTML = tut.body;
  document.getElementById('tut-hint').innerHTML = tut.hint;
  // Show UV button only at step 6 (measuring)
  document.getElementById('uv-toggle').style.display = (state.step === 6 && state.plateRemoved) ? 'flex' : 'none';
}
function setHint(t) { /* hint via tutorial panel */ }
function toast(text, kind = '') {
  const el = document.createElement('div');
  el.className = 'toast ' + kind;
  el.innerHTML = text;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 2200);
}

async function finishGame() {
  state.finishedAt = performance.now();
  const durationMs = Math.round(state.finishedAt - state.startedAt);
  const timeBonus = durationMs <= 90000 ? 30 : durationMs <= 150000 ? 15 : 0;
  state.score += timeBonus;
  const correctRf = Object.entries(state.measurements).filter(([id, v]) => {
    const s = SAMPLES.find(x => x.id === id);
    return Math.abs(v - s.trueRf) <= 0.10;
  }).length;
  sfx.perfect();
  await submitAttempt({
    version: 'sac-ky-3d',
    score: state.score,
    correct: correctRf + state.plateSpots.length,
    total: 6,
    durationMs,
    details: {
      samples: SAMPLES.map(s => ({ id: s.id, trueRf: s.trueRf, measuredRf: state.measurements[s.id] ?? null })),
      timeBonus, stepErrors: state.stepErrors,
    },
  });
  document.getElementById('modal-score').textContent = state.score;
  document.getElementById('modal-details').innerHTML = [
    ['⏱️ Thời gian', (durationMs/1000).toFixed(1) + 's'],
    ['🧪 Mẫu chấm', state.plateSpots.length + '/3'],
    ['📏 Đo Rf đúng', correctRf + '/3'],
    ['⚡ Bonus thời gian', '+' + timeBonus],
  ].map(([k,v]) => `<div class="row"><span>${k}</span><b>${v}</b></div>`).join('');
  document.getElementById('modal').classList.add('show');
}
document.getElementById('modal-replay').addEventListener('click', () => {
  document.getElementById('modal').classList.remove('show');
  btnRestart.click();
});

// =============================================================
// MAIN LOOP
// =============================================================
let lastTick = performance.now();
function tick() {
  const now = performance.now();
  const dt = Math.min(0.05, (now - lastTick) / 1000);
  lastTick = now;

  // Update hovered object
  setHovered(getInteractableUnderPointer());
  // Update hover label position
  if (hoveredObject) {
    hoverLabel.style.left = pointerScreen.x + 'px';
    hoverLabel.style.top = pointerScreen.y + 'px';
  }

  // Update particle bursts + steam columns
  activeBursts = activeBursts.filter(b => b.update(dt));
  activeSteams = activeSteams.filter(s => s.update(dt));

  // Development animation — 30s like Unity original (or fast-forwarded)
  if (state.plateInChamber && state.devProgress < 1 && state.devStartTime) {
    const elapsed = (performance.now() - state.devStartTime) / (state.fastForward ? 5000 : 30000);
    state.devProgress = Math.min(1, elapsed);
    redrawPlateTex();
    const sl = chamberGroup.userData.solventLiquid;
    sl.scale.y = 1 + state.devProgress * 0.4;
    sl.position.y = 0.15 + state.devProgress * 0.05;
    if (state.devProgress >= 1) {
      btnAction.disabled = false;
      btnAction.textContent = '⬆️ Lấy đĩa ra';
      sfx.tick();
      updateUI();
    }
  }
  if (!state.finishedAt) {
    document.getElementById('timer').textContent = ((performance.now() - state.startedAt)/1000).toFixed(1) + 's';
  }

  // Subtle plate float when held in chamber
  if (state.plateInChamber) {
    plateGroup.position.y = 0.62 + Math.sin(now * 0.002) * 0.005;
  }

  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(tick);
}
redrawPlateTex();
updateUI();
tick();

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Hide splash after first frame
setTimeout(() => document.getElementById('splash').classList.add('hidden'), 300);
