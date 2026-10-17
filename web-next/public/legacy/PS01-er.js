// Wrap-mount cho trang Next /PS01-er.
// Copy NGUYÊN VĂN nội dung khối <script type="module"> của public/PS01-er.html
// — KHÔNG dịch sang React, KHÔNG đổi hành vi. Engine Three.js (cấp cứu phản vệ ER
// 3D + vitals monitor + hold-to-administer + scoring + POST api/attempts).
//
// Bare-specifier `three` / `three/addons/` được giải qua <script type="importmap">
// mà page.tsx chèn TRƯỚC file này (giữ nguyên map trỏ unpkg CDN như bản gốc).
// Asset ngoài (CDN unpkg three.module.js, OrbitControls, RoomEnvironment) giữ
// nguyên đường dẫn; POST 'api/attempts' (tương đối) → /api/attempts → Express qua
// proxy của Next. Content lâm sàng (actionMap, scenario) hardcode trong script gốc
// → giữ nguyên tại đây (ngoài cây app), CHƯA đưa DB — xem risks.

import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

// ============================================================
// CONFIG
// ============================================================
const T0 = performance.now();

// Vital state — starts critical, improves when correct interventions chosen
const vitals = {
  sbp: 80, dbp: 50, spo2: 88, hr: 130, rr: 28,
  target: { sbp: 80, dbp: 50, spo2: 88, hr: 130, rr: 28 },
};

// Treatment progress
const done = {
  adrIM: false, adrIV: false, o2: false, fluid: false,
  diphen: false, methylp: false, salb: false, repeat: false,
};
const decisions = []; // log entries

// ============================================================
// SCENE
// ============================================================
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xeef3ee);
scene.fog = new THREE.Fog(0xeef3ee, 14, 40);

const camera = new THREE.PerspectiveCamera(44, innerWidth/innerHeight, 0.05, 100);
camera.position.set(1.6, 1.7, 2.2);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(devicePixelRatio);
renderer.setSize(innerWidth, innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.0;
document.body.appendChild(renderer.domElement);

const pmrem = new THREE.PMREMGenerator(renderer);
scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;

const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 1.05, 0);
controls.enableDamping = true;
controls.dampingFactor = 0.08;
controls.maxPolarAngle = Math.PI * 0.51;
controls.minDistance = 1.2;
controls.maxDistance = 5.5;
controls.update();

// Lighting
scene.add(new THREE.AmbientLight(0xffffff, 0.4));
const sun = new THREE.DirectionalLight(0xffffff, 0.85);
sun.position.set(3, 4, 2);
sun.castShadow = true;
sun.shadow.mapSize.set(2048, 2048);
sun.shadow.camera.left = -4; sun.shadow.camera.right = 4;
sun.shadow.camera.top = 4; sun.shadow.camera.bottom = -3;
sun.shadow.bias = -0.0005;
scene.add(sun);
const fill = new THREE.DirectionalLight(0xc8e1ff, 0.3);
fill.position.set(-2, 3, -1);
scene.add(fill);

// ER ceiling exam light (warm)
const spot = new THREE.SpotLight(0xfff5e0, 0.9, 10, Math.PI/5.5, 0.4, 1.3);
spot.position.set(0, 3.6, 0.3);
spot.target.position.set(0, 1.0, 0);
spot.castShadow = true;
scene.add(spot); scene.add(spot.target);

// ============================================================
// ROOM
// ============================================================
const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(12, 8),
  new THREE.MeshStandardMaterial({ color: 0xd8dcd8, roughness: 0.92 })
);
floor.rotation.x = -Math.PI/2;
floor.receiveShadow = true;
scene.add(floor);

const wallMat = new THREE.MeshStandardMaterial({ color: 0xe9eee7, roughness: 0.95 });
const wallBack = new THREE.Mesh(new THREE.PlaneGeometry(12, 4.5), wallMat);
wallBack.position.set(0, 2.25, -1.6); wallBack.receiveShadow = true;
scene.add(wallBack);

const wallSide = new THREE.Mesh(new THREE.PlaneGeometry(8, 4.5), wallMat);
wallSide.position.set(-3.5, 2.25, 0); wallSide.rotation.y = Math.PI/2;
wallSide.receiveShadow = true;
scene.add(wallSide);

// Hospital tile pattern on floor (subtle grid lines)
const tileMat = new THREE.MeshBasicMaterial({ color: 0xc7ccc8 });
for (let i = -5; i <= 5; i++) {
  const ln = new THREE.Mesh(new THREE.PlaneGeometry(12, 0.005), tileMat);
  ln.rotation.x = -Math.PI/2; ln.position.set(0, 0.001, i);
  scene.add(ln);
  const ln2 = new THREE.Mesh(new THREE.PlaneGeometry(0.005, 8), tileMat);
  ln2.rotation.x = -Math.PI/2; ln2.position.set(i, 0.001, 0);
  scene.add(ln2);
}

// ============================================================
// ER BED (stretcher)
// ============================================================
const bedGroup = new THREE.Group();
bedGroup.position.set(0, 0, 0);
scene.add(bedGroup);

const bedFrameMat = new THREE.MeshStandardMaterial({ color: 0xb0b8c0, metalness: 0.7, roughness: 0.35 });
const mattressMat = new THREE.MeshStandardMaterial({ color: 0xfafafa, roughness: 0.85 });
const sheetMat = new THREE.MeshStandardMaterial({ color: 0xe8f0ff, roughness: 0.9 });

// Bed frame
const bedBase = new THREE.Mesh(new THREE.BoxGeometry(2.1, 0.08, 0.85), bedFrameMat);
bedBase.position.set(0, 0.62, 0);
bedBase.castShadow = true; bedBase.receiveShadow = true;
bedGroup.add(bedBase);

// Legs (4)
[[-0.95, 0.31, -0.38],[0.95, 0.31, -0.38],[-0.95, 0.31, 0.38],[0.95, 0.31, 0.38]].forEach(p => {
  const leg = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.62, 0.06), bedFrameMat);
  leg.position.set(...p);
  leg.castShadow = true;
  bedGroup.add(leg);
});

// Wheels
[[-0.95, 0.04, -0.38],[0.95, 0.04, -0.38],[-0.95, 0.04, 0.38],[0.95, 0.04, 0.38]].forEach(p => {
  const w = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.04, 16),
    new THREE.MeshStandardMaterial({ color: 0x1f2937, roughness: 0.6 }));
  w.rotation.z = Math.PI/2; w.position.set(...p);
  bedGroup.add(w);
});

// Mattress
const mattress = new THREE.Mesh(new THREE.BoxGeometry(2.0, 0.12, 0.78), mattressMat);
mattress.position.set(0, 0.72, 0);
mattress.castShadow = true; mattress.receiveShadow = true;
bedGroup.add(mattress);

// Sheet
const sheet = new THREE.Mesh(new THREE.BoxGeometry(2.02, 0.02, 0.8), sheetMat);
sheet.position.set(0, 0.79, 0);
sheet.castShadow = true; sheet.receiveShadow = true;
bedGroup.add(sheet);

// Headrest (slight incline)
const headrest = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.1, 0.78), mattressMat);
headrest.position.set(-0.7, 0.85, 0);
headrest.rotation.z = -Math.PI/16;
bedGroup.add(headrest);

// Side rails
const railMat = new THREE.MeshStandardMaterial({ color: 0xd5dade, metalness: 0.8, roughness: 0.25 });
[ -0.4, 0.4 ].forEach(z => {
  const rail = new THREE.Mesh(new THREE.BoxGeometry(1.8, 0.04, 0.04), railMat);
  rail.position.set(0, 0.95, z);
  bedGroup.add(rail);
  // posts
  [-0.7, 0.7].forEach(x => {
    const post = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, 0.3, 12), railMat);
    post.position.set(x, 0.83, z);
    bedGroup.add(post);
  });
});

// ============================================================
// PATIENT (simple humanoid)
// ============================================================
const patientGroup = new THREE.Group();
patientGroup.position.set(0, 0.83, 0);
scene.add(patientGroup);

const skinMat = new THREE.MeshStandardMaterial({ color: 0xfde2c8, roughness: 0.55 });
const skinFlushMat = new THREE.MeshStandardMaterial({ color: 0xf5b5a5, roughness: 0.55 }); // anaphylaxis flushed
const gownMat = new THREE.MeshStandardMaterial({ color: 0xa7d7c5, roughness: 0.78 });
const hairMat = new THREE.MeshStandardMaterial({ color: 0x2b1d10, roughness: 0.75 });

// Torso
const torso = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.62, 0.28), gownMat);
torso.position.set(0.05, 0.05, 0);
torso.castShadow = true;
patientGroup.add(torso);

// Belly bulge (gown)
const belly = new THREE.Mesh(new THREE.SphereGeometry(0.22, 16, 12), gownMat);
belly.position.set(0.15, 0.0, 0);
belly.scale.set(1.1, 0.45, 0.7);
patientGroup.add(belly);

// Head (slightly raised)
const head = new THREE.Mesh(new THREE.SphereGeometry(0.13, 24, 18), skinFlushMat);
head.position.set(-0.66, 0.18, 0);
head.castShadow = true;
patientGroup.add(head);

// Hair
const hair = new THREE.Mesh(new THREE.SphereGeometry(0.135, 24, 18, 0, Math.PI*2, 0, Math.PI*0.55), hairMat);
hair.position.set(-0.66, 0.20, 0);
hair.rotation.x = -0.3;
patientGroup.add(hair);

// Eyes (closed slits = lethargic look)
const eyeMat = new THREE.MeshBasicMaterial({ color: 0x111827 });
[-0.04, 0.04].forEach(z => {
  const e = new THREE.Mesh(new THREE.BoxGeometry(0.005, 0.004, 0.028), eyeMat);
  e.position.set(-0.555, 0.20, z);
  patientGroup.add(e);
});

// Lips (swollen, deep red — hallmark of anaphylaxis)
const lipMat = new THREE.MeshStandardMaterial({ color: 0xb91c1c, roughness: 0.45 });
const upperLip = new THREE.Mesh(new THREE.SphereGeometry(0.024, 12, 8), lipMat);
upperLip.position.set(-0.545, 0.16, 0);
upperLip.scale.set(1, 0.5, 1.6);
patientGroup.add(upperLip);
const lowerLip = new THREE.Mesh(new THREE.SphereGeometry(0.026, 12, 8), lipMat);
lowerLip.position.set(-0.545, 0.135, 0);
lowerLip.scale.set(1, 0.55, 1.8);
patientGroup.add(lowerLip);

// Arms
const armMat = gownMat;
[-1, 1].forEach(zSign => {
  const arm = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.045, 0.55, 12), armMat);
  arm.position.set(0.05, 0.0, zSign * 0.22);
  arm.rotation.x = zSign * 0.05;
  arm.rotation.z = Math.PI/2;
  arm.castShadow = true;
  patientGroup.add(arm);
  // hand
  const hand = new THREE.Mesh(new THREE.SphereGeometry(0.045, 12, 10), skinFlushMat);
  hand.position.set(0.32, 0.0, zSign * 0.22);
  patientGroup.add(hand);
});

// Legs (under sheet — thigh visible since gown rides up)
[-1, 1].forEach(zSign => {
  const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.05, 0.7, 12), gownMat);
  leg.position.set(0.62, -0.03, zSign * 0.12);
  leg.rotation.z = Math.PI/2;
  leg.castShadow = true;
  patientGroup.add(leg);
});

// "Hives" rash spots on neck/arms (subtle red dots)
const rashMat = new THREE.MeshBasicMaterial({ color: 0xdc2626, transparent: true, opacity: 0.55 });
for (let i = 0; i < 18; i++) {
  const r = new THREE.Mesh(new THREE.CircleGeometry(0.012 + Math.random()*0.008, 8), rashMat);
  // place on torso front (gown)
  r.position.set(-0.1 + Math.random()*0.4, 0.05 + Math.random()*0.25, 0.142 + Math.random()*0.002);
  patientGroup.add(r);
}

// Breathing motion target
let breathT = 0;

// ============================================================
// VITALS MONITOR (on stand next to bed)
// ============================================================
const monGroup = new THREE.Group();
monGroup.position.set(0.8, 0, -0.7);
scene.add(monGroup);

// Stand
const standMat = new THREE.MeshStandardMaterial({ color: 0x9ca3af, metalness: 0.6, roughness: 0.5 });
const monStand = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, 1.4, 16), standMat);
monStand.position.set(0, 0.7, 0);
monGroup.add(monStand);
const monBase = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.18, 0.04, 24), standMat);
monBase.position.set(0, 0.02, 0);
monGroup.add(monBase);

// Monitor body
const monBodyMat = new THREE.MeshStandardMaterial({ color: 0x1f2937, roughness: 0.5 });
const monBody = new THREE.Mesh(new THREE.BoxGeometry(0.48, 0.32, 0.08), monBodyMat);
monBody.position.set(0, 1.42, 0);
monBody.castShadow = true;
monGroup.add(monBody);

// Screen — dynamic canvas texture
const screenCanvas = document.createElement('canvas');
screenCanvas.width = 480; screenCanvas.height = 320;
const screenCtx = screenCanvas.getContext('2d');
const screenTex = new THREE.CanvasTexture(screenCanvas);
screenTex.colorSpace = THREE.SRGBColorSpace;
const screen = new THREE.Mesh(
  new THREE.PlaneGeometry(0.42, 0.28),
  new THREE.MeshBasicMaterial({ map: screenTex })
);
screen.position.set(0, 1.42, 0.041);
monGroup.add(screen);

// ECG trace history
const ecgHistory = new Array(120).fill(0);
let ecgPhase = 0;

function drawScreen() {
  const c = screenCtx;
  c.fillStyle = '#0a0e14';
  c.fillRect(0, 0, 480, 320);

  // Top status bar
  c.fillStyle = '#16a34a';
  c.font = 'bold 14px monospace';
  c.fillText('● MONITOR  PATIENT 28F  ER-BED-3', 10, 20);
  c.fillStyle = '#9ca3af';
  c.font = '11px monospace';
  c.fillText(formatTime(), 380, 20);

  // ECG (top half)
  c.strokeStyle = '#22c55e';
  c.lineWidth = 1.5;
  c.beginPath();
  for (let i = 0; i < ecgHistory.length; i++) {
    const x = (i / ecgHistory.length) * 460 + 10;
    const y = 100 - ecgHistory[i] * 35;
    if (i === 0) c.moveTo(x, y); else c.lineTo(x, y);
  }
  c.stroke();

  // SpO2 plethysmography (mid)
  c.strokeStyle = '#fb923c';
  c.lineWidth = 1.2;
  c.beginPath();
  for (let i = 0; i < ecgHistory.length; i++) {
    const x = (i / ecgHistory.length) * 460 + 10;
    const t = i / ecgHistory.length;
    // pulse wave shape, scaled by SpO2 health
    const amp = Math.max(0.3, (vitals.spo2 - 70) / 30);
    const phase = t * 4 + ecgPhase * 0.5;
    const y = 175 - Math.sin(phase) * 18 * amp - Math.max(0, Math.cos(phase * 1.4)) * 8 * amp;
    if (i === 0) c.moveTo(x, y); else c.lineTo(x, y);
  }
  c.stroke();

  // Bottom: numeric values
  const bp = `${Math.round(vitals.sbp)}/${Math.round(vitals.dbp)}`;
  c.fillStyle = vitals.sbp < 90 ? '#ef4444' : '#22c55e';
  c.font = 'bold 38px monospace';
  c.fillText(bp, 10, 270);
  c.fillStyle = '#6b7280'; c.font = '10px monospace';
  c.fillText('NIBP mmHg', 10, 285);

  c.fillStyle = vitals.spo2 < 92 ? '#f59e0b' : '#22c55e';
  c.font = 'bold 38px monospace';
  c.fillText(Math.round(vitals.spo2), 170, 270);
  c.fillStyle = '#6b7280'; c.font = '10px monospace';
  c.fillText('SpO₂ %', 170, 285);

  c.fillStyle = (vitals.hr > 120 || vitals.hr < 50) ? '#ef4444' : '#22c55e';
  c.font = 'bold 38px monospace';
  c.fillText(Math.round(vitals.hr), 280, 270);
  c.fillStyle = '#6b7280'; c.font = '10px monospace';
  c.fillText('HR /min', 280, 285);

  c.fillStyle = vitals.rr > 24 ? '#f59e0b' : '#22c55e';
  c.font = 'bold 38px monospace';
  c.fillText(Math.round(vitals.rr), 390, 270);
  c.fillStyle = '#6b7280'; c.font = '10px monospace';
  c.fillText('RR /min', 390, 285);

  // Alarm bar
  if (vitals.sbp < 90 || vitals.spo2 < 92) {
    c.fillStyle = '#dc2626';
    c.fillRect(0, 295, 480, 25);
    c.fillStyle = '#fff';
    c.font = 'bold 14px monospace';
    c.fillText('!! ANAPHYLAXIS — STAGE III !!', 130, 313);
  }

  screenTex.needsUpdate = true;
}

function tickEcg() {
  // shift left
  ecgHistory.shift();
  ecgPhase += 0.1;
  // periodic QRS spike: period depends on heart rate
  const beatsPerSec = vitals.hr / 60;
  const samplesPerBeat = 60 / beatsPerSec; // 30Hz
  const phase = (ecgPhase * 60 / samplesPerBeat) % 1;
  let v;
  if (phase < 0.04) v = 0.3;         // P
  else if (phase > 0.10 && phase < 0.13) v = -0.4;  // Q
  else if (phase > 0.13 && phase < 0.18) v = 1.8;   // R spike
  else if (phase > 0.18 && phase < 0.22) v = -0.6;  // S
  else if (phase > 0.30 && phase < 0.38) v = 0.5;   // T
  else v = 0;
  ecgHistory.push(v + (Math.random() - 0.5) * 0.04);
}
setInterval(tickEcg, 33);

// ============================================================
// IV STAND + NaCl bag
// ============================================================
const ivGroup = new THREE.Group();
ivGroup.position.set(-0.95, 0, -0.55);
scene.add(ivGroup);

const ivBase = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.18, 0.04, 24), standMat);
ivBase.position.set(0, 0.02, 0);
ivGroup.add(ivBase);
const ivPole = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.018, 1.85, 16), standMat);
ivPole.position.set(0, 0.95, 0);
ivPole.castShadow = true;
ivGroup.add(ivPole);
// hook
const ivHook = new THREE.Mesh(new THREE.TorusGeometry(0.04, 0.006, 8, 18, Math.PI), standMat);
ivHook.position.set(0, 1.85, 0);
ivHook.rotation.z = -Math.PI/2;
ivGroup.add(ivHook);

// Saline bag
const bagMat = new THREE.MeshPhysicalMaterial({
  color: 0xf0f8ff, transmission: 0.5, thickness: 0.3,
  roughness: 0.25, metalness: 0,
  attenuationColor: 0xe0f0ff, attenuationDistance: 1.0,
});
const salineBag = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.32, 0.06), bagMat);
salineBag.position.set(0.05, 1.65, 0);
salineBag.castShadow = true;
ivGroup.add(salineBag);
// bag label
const bagLabelCanvas = document.createElement('canvas');
bagLabelCanvas.width = 256; bagLabelCanvas.height = 128;
const bc = bagLabelCanvas.getContext('2d');
bc.fillStyle = '#fff'; bc.fillRect(0,0,256,128);
bc.fillStyle = '#0369a1'; bc.fillRect(0,0,256,28);
bc.fillStyle = '#fff'; bc.font = 'bold 18px sans-serif'; bc.fillText('NaCl 0.9%', 12, 20);
bc.fillStyle = '#0f172a'; bc.font = 'bold 26px sans-serif'; bc.fillText('500 mL', 12, 66);
bc.fillStyle = '#475569'; bc.font = '12px sans-serif'; bc.fillText('Natri clorid 0.9%', 12, 92);
bc.fillText('Sterile · Đẳng trương', 12, 108);
const bagLabelTex = new THREE.CanvasTexture(bagLabelCanvas);
const bagLabel = new THREE.Mesh(
  new THREE.PlaneGeometry(0.14, 0.18),
  new THREE.MeshBasicMaterial({ map: bagLabelTex })
);
bagLabel.position.set(0.05, 1.65, 0.032);
ivGroup.add(bagLabel);

// IV tubing (line going down)
const tubeMat = new THREE.MeshStandardMaterial({ color: 0xfafafa, roughness: 0.4, transparent: true, opacity: 0.85 });
const ivTube = new THREE.Mesh(new THREE.CylinderGeometry(0.004, 0.004, 1.2, 8), tubeMat);
ivTube.position.set(0.05, 1.0, 0);
ivTube.rotation.z = 0.15;
ivGroup.add(ivTube);

// Drip chamber
const dripChamber = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.018, 0.06, 16), bagMat);
dripChamber.position.set(0.05, 1.45, 0);
ivGroup.add(dripChamber);

// ============================================================
// O2 TANK + MASK
// ============================================================
const o2Group = new THREE.Group();
o2Group.position.set(-1.4, 0, 0.4);
scene.add(o2Group);

const o2Mat = new THREE.MeshStandardMaterial({ color: 0x16a34a, metalness: 0.4, roughness: 0.45 });
const o2Tank = new THREE.Mesh(new THREE.CylinderGeometry(0.10, 0.10, 0.65, 24), o2Mat);
o2Tank.position.set(0, 0.4, 0);
o2Tank.castShadow = true;
o2Group.add(o2Tank);
const o2Top = new THREE.Mesh(new THREE.SphereGeometry(0.10, 18, 12, 0, Math.PI*2, 0, Math.PI/2), o2Mat);
o2Top.position.set(0, 0.73, 0);
o2Group.add(o2Top);
// regulator
const regMat = new THREE.MeshStandardMaterial({ color: 0x6b7280, metalness: 0.8, roughness: 0.3 });
const reg = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.08, 0.1), regMat);
reg.position.set(0, 0.82, 0);
o2Group.add(reg);
// O2 label
const o2Label = makeTextLabel('O₂', 0xffffff, 0x16a34a);
o2Label.scale.set(0.16, 0.08, 1);
o2Label.position.set(0, 0.45, 0.105);
o2Group.add(o2Label);

// Mask (rubber, sits on cart)
const maskMat = new THREE.MeshStandardMaterial({ color: 0xe5e7eb, roughness: 0.6, transparent: true, opacity: 0.85 });
const o2Mask = new THREE.Mesh(new THREE.SphereGeometry(0.07, 16, 12, 0, Math.PI*2, 0, Math.PI*0.5), maskMat);
o2Mask.position.set(0.2, 0.88, 0);
o2Mask.rotation.x = -Math.PI/2;
o2Group.add(o2Mask);
// Tubing from tank to mask
const o2Tube = new THREE.Mesh(new THREE.CylinderGeometry(0.006, 0.006, 0.22, 8),
  new THREE.MeshStandardMaterial({ color: 0x14532d, roughness: 0.5 }));
o2Tube.position.set(0.1, 0.85, 0); o2Tube.rotation.z = Math.PI/2;
o2Group.add(o2Tube);

// ============================================================
// CRASH CART with vials
// ============================================================
const cartGroup = new THREE.Group();
cartGroup.position.set(1.55, 0, 0.35);
scene.add(cartGroup);

const cartMat = new THREE.MeshStandardMaterial({ color: 0xdc2626, roughness: 0.55, metalness: 0.15 });
const cartTopMat = new THREE.MeshStandardMaterial({ color: 0xfafafa, roughness: 0.4 });
const cart = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.85, 0.45), cartMat);
cart.position.set(0, 0.43, 0);
cart.castShadow = true; cart.receiveShadow = true;
cartGroup.add(cart);
const cartTop = new THREE.Mesh(new THREE.BoxGeometry(0.62, 0.02, 0.47), cartTopMat);
cartTop.position.set(0, 0.87, 0);
cartGroup.add(cartTop);
// drawer lines
for (let i = 0; i < 3; i++) {
  const drawer = new THREE.Mesh(new THREE.BoxGeometry(0.52, 0.005, 0.005),
    new THREE.MeshBasicMaterial({ color: 0x991b1b }));
  drawer.position.set(0, 0.22 + i*0.2, 0.226);
  cartGroup.add(drawer);
  const handle = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.015, 0.015),
    new THREE.MeshStandardMaterial({ color: 0x9ca3af, metalness: 0.7 }));
  handle.position.set(0, 0.22 + i*0.2 + 0.04, 0.232);
  cartGroup.add(handle);
}
// wheels
[[-0.25, 0.04, -0.18],[0.25, 0.04, -0.18],[-0.25, 0.04, 0.18],[0.25, 0.04, 0.18]].forEach(p => {
  const w = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.04, 16),
    new THREE.MeshStandardMaterial({ color: 0x111827 }));
  w.rotation.z = Math.PI/2; w.position.set(...p);
  cartGroup.add(w);
});
// red cross sign
const crossMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
const crossV = new THREE.Mesh(new THREE.PlaneGeometry(0.04, 0.16), crossMat);
crossV.position.set(0, 0.55, 0.226); cartGroup.add(crossV);
const crossH = new THREE.Mesh(new THREE.PlaneGeometry(0.16, 0.04), crossMat);
crossH.position.set(0, 0.55, 0.226); cartGroup.add(crossH);

// Vials on top of cart
const vialDefs = [
  { name: 'ADRENALIN', sub: '1 mg/1 mL', color: 0xfacc15, x: -0.22 },
  { name: 'DIPHENHYDRAMIN', sub: '50 mg/mL', color: 0xa78bfa, x: -0.09 },
  { name: 'METHYLPRED', sub: '125 mg', color: 0xf472b6, x: 0.04 },
  { name: 'SALBUTAMOL', sub: '5 mg neb', color: 0x14b8a6, x: 0.17 },
];
vialDefs.forEach(v => {
  const vGroup = new THREE.Group();
  vGroup.position.set(v.x, 0.91, -0.05);
  cartGroup.add(vGroup);
  const vialGlass = new THREE.MeshPhysicalMaterial({
    color: 0xffffff, transmission: 0.85, thickness: 0.2,
    roughness: 0.08, metalness: 0, ior: 1.5,
  });
  const vial = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.018, 0.07, 18), vialGlass);
  vial.castShadow = true;
  vGroup.add(vial);
  // cap
  const cap = new THREE.Mesh(new THREE.CylinderGeometry(0.019, 0.019, 0.015, 18),
    new THREE.MeshStandardMaterial({ color: v.color, metalness: 0.6, roughness: 0.4 }));
  cap.position.y = 0.042;
  vGroup.add(cap);
  // label
  const lblCanvas = document.createElement('canvas');
  lblCanvas.width = 128; lblCanvas.height = 64;
  const lc = lblCanvas.getContext('2d');
  lc.fillStyle = '#fff'; lc.fillRect(0,0,128,64);
  lc.fillStyle = '#' + v.color.toString(16).padStart(6,'0'); lc.fillRect(0,0,128,14);
  lc.fillStyle = '#000'; lc.font = 'bold 11px sans-serif';
  lc.fillText(v.name, 4, 28);
  lc.font = '9px sans-serif';
  lc.fillText(v.sub, 4, 42);
  const lblTex = new THREE.CanvasTexture(lblCanvas);
  const lblMesh = new THREE.Mesh(
    new THREE.PlaneGeometry(0.04, 0.02),
    new THREE.MeshBasicMaterial({ map: lblTex })
  );
  lblMesh.position.set(0, 0.0, 0.019);
  vGroup.add(lblMesh);
});

// Syringes (laid out)
for (let i = 0; i < 3; i++) {
  const syrGroup = new THREE.Group();
  syrGroup.position.set(-0.15 + i*0.1, 0.89, 0.12);
  cartGroup.add(syrGroup);
  const barrel = new THREE.Mesh(new THREE.CylinderGeometry(0.008, 0.008, 0.08, 12),
    new THREE.MeshPhysicalMaterial({ color: 0xffffff, transmission: 0.7, roughness: 0.1 }));
  barrel.rotation.z = Math.PI/2;
  syrGroup.add(barrel);
  const needle = new THREE.Mesh(new THREE.CylinderGeometry(0.001, 0.001, 0.03, 8),
    new THREE.MeshStandardMaterial({ color: 0xd1d5db, metalness: 0.9 }));
  needle.rotation.z = Math.PI/2;
  needle.position.x = 0.055;
  syrGroup.add(needle);
}

// ============================================================
// Helper — text label sprite
// ============================================================
function makeTextLabel(text, fg = 0xffffff, bg = 0x000000) {
  const c = document.createElement('canvas');
  c.width = 256; c.height = 128;
  const ctx = c.getContext('2d');
  ctx.fillStyle = '#' + bg.toString(16).padStart(6,'0');
  ctx.fillRect(0,0,256,128);
  ctx.fillStyle = '#' + fg.toString(16).padStart(6,'0');
  ctx.font = 'bold 72px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(text, 128, 90);
  const tex = new THREE.CanvasTexture(c);
  return new THREE.Mesh(
    new THREE.PlaneGeometry(1, 0.5),
    new THREE.MeshBasicMaterial({ map: tex, transparent: true })
  );
}

// ============================================================
// UI BINDINGS
// ============================================================
const elBP   = document.getElementById('m-bp');
const elSPO2 = document.getElementById('m-spo2');
const elHR   = document.getElementById('m-hr');
const elRR   = document.getElementById('m-rr');
const elSBP   = document.getElementById('s-bp');
const elSSPO2 = document.getElementById('s-spo2');
const elSHR   = document.getElementById('s-hr');
const elSRR   = document.getElementById('s-rr');
const elMonitor = document.getElementById('vitals-monitor');
const elTimeline = document.getElementById('timeline');
const elTimer = document.getElementById('timer');
const elAlarm = document.getElementById('alarm');
const submitBtn = document.getElementById('submit-btn');

function formatTime() {
  const sec = Math.floor((performance.now() - T0) / 1000);
  const mm = String(Math.floor(sec / 60)).padStart(2, '0');
  const ss = String(sec % 60).padStart(2, '0');
  return `${mm}:${ss}`;
}

function refreshVitals() {
  // Ease towards target
  const k = 0.06;
  vitals.sbp  += (vitals.target.sbp  - vitals.sbp)  * k;
  vitals.dbp  += (vitals.target.dbp  - vitals.dbp)  * k;
  vitals.spo2 += (vitals.target.spo2 - vitals.spo2) * k;
  vitals.hr   += (vitals.target.hr   - vitals.hr)   * k;
  vitals.rr   += (vitals.target.rr   - vitals.rr)   * k;

  const bp = `${Math.round(vitals.sbp)}/${Math.round(vitals.dbp)}`;
  elBP.textContent = bp;
  elSPO2.textContent = Math.round(vitals.spo2);
  elHR.textContent = Math.round(vitals.hr);
  elRR.textContent = Math.round(vitals.rr);
  elSBP.textContent = bp;
  elSSPO2.textContent = Math.round(vitals.spo2) + '%';
  elSHR.textContent = Math.round(vitals.hr);
  elSRR.textContent = Math.round(vitals.rr);

  const stable = vitals.sbp >= 95 && vitals.spo2 >= 94 && vitals.hr <= 110;
  elMonitor.classList.toggle('improving', stable);
  elAlarm.classList.toggle('on', !stable);

  elTimer.textContent = formatTime();
}
setInterval(refreshVitals, 80);

// ============================================================
// DECISION LOGIC + VITALS RESPONSE
// ============================================================
// Action specs — quality, feedback, vital deltas
const actionMap = {
  'adr-im': {
    quality: 'gold', // first-line, correct
    title: 'Adrenalin 0.5 mg IM mặt trước–ngoài đùi (1:1000)',
    feedback: 'Đúng — first-line. 0.5 mg (0.5 mL dd 1 mg/mL) IM đùi giữa cho người lớn ≥50 kg. Tác dụng <5 phút.',
    ref: 'BYT Quyết định 51/2017 · Resuscitation Council UK 2021 · ASCIA',
    cls: 'ok',
    apply: () => { vitals.target.sbp = 105; vitals.target.dbp = 68; vitals.target.spo2 = 93; vitals.target.hr = 110; vitals.target.rr = 22; },
    key: 'adrIM',
    holdMs: 1500,
  },
  'adr-iv': {
    quality: 'danger',
    title: 'Adrenalin IV bolus (KHÔNG đúng ở bước đầu)',
    feedback: '❌ KHÔNG — Adrenalin IV bolus chỉ dùng khi đã ngừng tim hoặc trong tay BS hồi sức có monitor liên tục. Nguy cơ loạn nhịp thất, NMCT, XHN. First-line vẫn là IM đùi.',
    ref: 'BYT 51/2017 · WAO 2020 — IM is first-line',
    cls: 'bad',
    apply: () => { vitals.target.hr = 160; vitals.target.sbp = Math.max(70, vitals.target.sbp - 5); }, // tachy/risk
    key: 'adrIV',
    holdMs: 2000,
  },
  'o2': {
    quality: 'gold',
    title: 'Thở O₂ mặt nạ 10 L/phút',
    feedback: 'Đúng — O₂ lưu lượng cao (mặt nạ không hít lại 10–15 L/phút) cho mọi BN phản vệ có giảm SpO₂.',
    ref: 'BYT 51/2017 Mục 5 · ASCIA',
    cls: 'ok',
    apply: () => { vitals.target.spo2 = Math.max(vitals.target.spo2, 96); vitals.target.rr = Math.min(vitals.target.rr, 20); },
    key: 'o2',
    holdMs: 1200,
  },
  'fluid': {
    quality: 'gold',
    title: 'Truyền NaCl 0.9% 500 mL nhanh (bolus)',
    feedback: 'Đúng — truyền nhanh 500–1000 mL NaCl 0.9% (10–20 mL/kg) cho tụt HA do giãn mạch + thoát mạch. Có thể lặp.',
    ref: 'BYT 51/2017 Mục 6 · RC UK 2021',
    cls: 'ok',
    apply: () => { vitals.target.sbp = Math.max(vitals.target.sbp, 110); vitals.target.dbp = Math.max(vitals.target.dbp, 70); vitals.target.hr = Math.min(vitals.target.hr, 100); },
    key: 'fluid',
    holdMs: 1500,
  },
  'diphen': {
    quality: 'secondary',
    title: 'Diphenhydramin 50 mg IM (thuốc HỖ TRỢ)',
    feedback: '⚠️ Chỉ là thuốc thứ phát — KHÔNG cứu sống, không thay thế Adrenalin. Chỉ dùng SAU khi đã tiêm Adrenalin để giảm ngứa & mề đay.',
    ref: 'AAAAI/ACAAI 2020 Joint Task Force',
    cls: 'warn',
    apply: () => { /* no vital change */ },
    key: 'diphen',
    holdMs: 1500,
  },
  'methylp': {
    quality: 'secondary',
    title: 'Methylprednisolon 80 mg IV (thuốc HỖ TRỢ)',
    feedback: '⚠️ Không phải first-line. Tác dụng sau 4–6h, dùng để giảm pha muộn (biphasic). KHÔNG được dùng thay Adrenalin.',
    ref: 'BYT 51/2017 · ASCIA 2023',
    cls: 'warn',
    apply: () => { /* no immediate vital change */ },
    key: 'methylp',
    holdMs: 1500,
  },
  'salb': {
    quality: 'secondary',
    title: 'Salbutamol khí dung 5 mg',
    feedback: '✓ Hợp lý cho co thắt phế quản tồn tại sau khi tiêm Adrenalin. Không thay thế Adrenalin.',
    ref: 'BYT 51/2017 · GINA 2024',
    cls: 'ok',
    apply: () => { vitals.target.rr = Math.min(vitals.target.rr, 18); vitals.target.spo2 = Math.max(vitals.target.spo2, 95); },
    key: 'salb',
    holdMs: 1500,
  },
  'repeat': {
    quality: 'gold',
    title: 'Lặp Adrenalin 0.5 mg IM sau 5 phút',
    feedback: 'Đúng — nếu sau 5–15 phút BN chưa đáp ứng (HA vẫn thấp, vẫn khó thở) → lặp lại liều IM ở chân đối bên. Có thể lặp ≥3 liều rồi cân nhắc infusion.',
    ref: 'BYT 51/2017 Mục 4 · RC UK 2021',
    cls: 'ok',
    apply: () => { vitals.target.sbp = Math.max(vitals.target.sbp, 118); vitals.target.dbp = Math.max(vitals.target.dbp, 78); vitals.target.hr = Math.min(vitals.target.hr, 92); vitals.target.spo2 = Math.max(vitals.target.spo2, 97); },
    key: 'repeat',
    holdMs: 1500,
  },
};

function logDecision(actId) {
  const spec = actionMap[actId];
  if (!spec) return;
  if (done[spec.key]) {
    showToast('Đã thực hiện rồi', 'warn');
    return;
  }

  // Special: if user clicks IM Adrenalin first time, alarm subsides
  done[spec.key] = true;
  spec.apply();

  decisions.push({
    t: formatTime(),
    actId,
    quality: spec.quality,
    title: spec.title,
    feedback: spec.feedback,
    ref: spec.ref,
    cls: spec.cls,
  });
  renderTimeline();
  showToast((spec.cls === 'bad' ? '❌ ' : spec.cls === 'warn' ? '⚠️ ' : '✓ ') + spec.title, spec.cls === 'bad' ? 'err' : spec.cls === 'warn' ? 'warn' : 'ok');

  // Visual: mark button as done
  const btn = document.querySelector(`.act[data-act="${actId}"]`);
  if (btn) btn.classList.add('done');

  // Enable submit when criteria reached
  checkSubmit();
}

function renderTimeline() {
  if (decisions.length === 0) {
    elTimeline.innerHTML = '<div class="empty">Chưa có y lệnh nào — bắt đầu xử trí…</div>';
    return;
  }
  elTimeline.innerHTML = decisions.map(d => `
    <div class="entry ${d.cls}">
      <div class="t">${d.t}</div>
      <div class="a">${d.title}</div>
      <div class="f">${d.feedback}</div>
      <div class="ref">📚 ${d.ref}</div>
    </div>
  `).join('');
  elTimeline.scrollTop = elTimeline.scrollHeight;
}

function checkSubmit() {
  // Allow submit if 3+ actions taken OR core triad done
  const coreDone = done.adrIM && done.o2 && done.fluid;
  const enoughActions = decisions.length >= 3;
  submitBtn.disabled = !(coreDone || enoughActions);
}

// Toast helper
const elToast = document.getElementById('toast');
let toastTimer = null;
function showToast(msg, cls = '') {
  elToast.textContent = msg;
  elToast.className = '';
  if (cls) elToast.classList.add(cls);
  elToast.style.display = 'block';
  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { elToast.style.display = 'none'; }, 2400);
}

// ============================================================
// HOLD-TO-ADMINISTER button binding
// ============================================================
document.querySelectorAll('.act').forEach(btn => {
  const actId = btn.dataset.act;
  const spec = actionMap[actId];
  const progressEl = btn.querySelector('.progress');
  let holdStart = 0;
  let raf = null;
  const HOLD_MS = spec.holdMs;

  const start = (e) => {
    if (btn.disabled || btn.classList.contains('done')) return;
    e && e.preventDefault();
    holdStart = performance.now();
    document.getElementById('hint').classList.add('shown');
    const step = () => {
      const elapsed = performance.now() - holdStart;
      const pct = Math.min(100, (elapsed / HOLD_MS) * 100);
      progressEl.style.width = pct + '%';
      if (elapsed >= HOLD_MS) {
        progressEl.style.width = '0%';
        document.getElementById('hint').classList.remove('shown');
        logDecision(actId);
        holdStart = 0;
        return;
      }
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
  };
  const stop = () => {
    if (raf) cancelAnimationFrame(raf);
    progressEl.style.width = '0%';
    document.getElementById('hint').classList.remove('shown');
    holdStart = 0;
  };

  btn.addEventListener('mousedown', start);
  btn.addEventListener('touchstart', start, { passive: false });
  btn.addEventListener('mouseup', stop);
  btn.addEventListener('mouseleave', stop);
  btn.addEventListener('touchend', stop);
  btn.addEventListener('touchcancel', stop);
});

// ============================================================
// SUBMIT & SCORING
// ============================================================
submitBtn.addEventListener('click', () => submitResult());

function scoreCase() {
  let score = 0;
  const breakdown = [];

  // Critical correct actions
  if (done.adrIM) { score += 45; breakdown.push({ k: 'Adrenalin 0.5 mg IM (first-line)', s: '+45', ok: true }); }
  else            { breakdown.push({ k: 'Adrenalin 0.5 mg IM (first-line)', s: 'BỎ SÓT — bệnh nhân tử vong nguy cơ cao', ok: false }); }

  if (done.o2)    { score += 12; breakdown.push({ k: 'O₂ mặt nạ 10 L/phút', s: '+12', ok: true }); }
  else            { breakdown.push({ k: 'O₂ mặt nạ', s: 'thiếu', ok: false }); }

  if (done.fluid) { score += 13; breakdown.push({ k: 'Truyền NaCl 0.9% nhanh', s: '+13', ok: true }); }
  else            { breakdown.push({ k: 'Truyền dịch nhanh', s: 'thiếu', ok: false }); }

  if (done.repeat) { score += 10; breakdown.push({ k: 'Đánh giá lại + lặp Adrenalin', s: '+10', ok: true }); }
  else             { breakdown.push({ k: 'Đánh giá lại sau 5 phút', s: 'không lặp', ok: false }); }

  // Supportive (after Adrenalin only — only if Adrenalin was given)
  if (done.salb && done.adrIM)   { score += 6;  breakdown.push({ k: 'Salbutamol (hỗ trợ)', s: '+6', ok: true }); }
  if (done.diphen && done.adrIM) { score += 6;  breakdown.push({ k: 'Diphenhydramin (sau Adrenalin)', s: '+6', ok: true }); }
  if (done.methylp && done.adrIM){ score += 8;  breakdown.push({ k: 'Methylprednisolon (sau Adrenalin)', s: '+8', ok: true }); }

  // Penalties
  if (done.adrIV) {
    score -= 25;
    breakdown.push({ k: 'Tiêm Adrenalin IV bolus ở bước đầu', s: '-25 (nguy hiểm)', ok: false });
  }
  if ((done.diphen || done.methylp) && !done.adrIM) {
    score -= 20;
    breakdown.push({ k: 'Dùng antihistamin/corticoid THAY Adrenalin', s: '-20 (sai phác đồ)', ok: false });
  }

  score = Math.max(0, Math.min(100, score));
  return { score, breakdown };
}

async function submitResult() {
  const { score, breakdown } = scoreCase();
  const stars = score >= 90 ? 3 : score >= 70 ? 2 : score >= 50 ? 1 : 0;

  document.getElementById('r-stars').textContent = '⭐'.repeat(stars) + '☆'.repeat(3 - stars);
  document.getElementById('r-score').textContent = `${score}/100`;
  document.getElementById('result-card').classList.toggle('poor', score < 60);
  document.getElementById('r-title').textContent = score >= 90 ? '🏆 Xử trí xuất sắc'
    : score >= 70 ? '👍 Xử trí đạt yêu cầu' : score >= 50 ? '⚠️ Có sai sót — cần xem lại' : '❌ Sai phác đồ nghiêm trọng';

  document.getElementById('r-rows').innerHTML = breakdown.map(b =>
    `<div class="row ${b.ok ? 'true' : 'bad'}"><span>${b.k}</span><b>${b.s}</b></div>`
  ).join('');

  document.getElementById('r-refs').innerHTML = `
    <b>📚 Tham khảo</b>
    • Bộ Y Tế VN — Thông tư 51/2017/TT-BYT: Hướng dẫn phòng & xử trí phản vệ.<br>
    • Resuscitation Council UK — Emergency Treatment of Anaphylaxis (2021 update).<br>
    • ASCIA (Úc) — Acute Management of Anaphylaxis Guidelines (2023).<br>
    • WAO Anaphylaxis Guidance 2020.
  `;
  document.getElementById('result-modal').classList.add('open');

  // Submit attempt to backend
  const durationMs = Math.round(performance.now() - T0);
  try {
    await fetch('api/attempts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        version: 'PS01-er-anaphylaxis',
        playerName: localStorage.getItem('tizia:playerName') || 'Ẩn danh',
        classCode: localStorage.getItem('tizia:classCode') || undefined,
        score,
        correct: score >= 70 ? 1 : 0,
        total: 1,
        durationMs,
        details: JSON.stringify({
          kind: 'anaphylaxis-er',
          done,
          decisions: decisions.map(d => ({ t: d.t, act: d.actId, quality: d.quality })),
          finalVitals: {
            sbp: Math.round(vitals.sbp), dbp: Math.round(vitals.dbp),
            spo2: Math.round(vitals.spo2), hr: Math.round(vitals.hr), rr: Math.round(vitals.rr),
          },
          stars,
        }),
      }),
    });
  } catch (e) { console.warn('submit failed', e); }
}

document.getElementById('r-again').addEventListener('click', () => location.reload());
document.getElementById('r-home').addEventListener('click', () => location.href = 'index.html');

// ============================================================
// RENDER LOOP
// ============================================================
let lastT = performance.now();
function render3D(t) {
  const dt = (t - lastT) / 1000;
  lastT = t;

  // Patient breathing — labored when struggling, calmer when stable
  breathT += dt * (vitals.rr / 16);
  const breathAmp = vitals.spo2 < 92 ? 0.025 : 0.012;
  torso.scale.y = 1 + Math.sin(breathT * 2) * breathAmp;
  belly.scale.y = 0.45 + Math.sin(breathT * 2) * breathAmp * 0.5;

  // If stable, slight lip color recovery
  const flush = Math.max(0, Math.min(1, (vitals.spo2 - 88) / 8));
  lipMat.color.lerp(new THREE.Color(0xb91c1c).lerp(new THREE.Color(0xe07370), flush), 0.05);

  // Screen draw
  drawScreen();

  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(render3D);
}

window.addEventListener('resize', () => {
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight);
});

requestAnimationFrame(render3D);

// Initial state pulse: critical
elAlarm.classList.add('on');

// Initial hint
setTimeout(() => showToast('🚨 BN sốc phản vệ — hãy ra y lệnh ngay!', 'err'), 600);

// Debug hook
window.__ps01 = { vitals, done, decisions, actionMap };
