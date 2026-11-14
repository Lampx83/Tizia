import * as THREE from '/vendor/three-0.160/build/three.module.js';
import { OrbitControls } from '/vendor/three-0.160/examples/jsm/controls/OrbitControls.js';
import { RoomEnvironment } from '/vendor/three-0.160/examples/jsm/environments/RoomEnvironment.js';

// ============================================================
// CONFIG — một số ngưỡng để dễ tinh chỉnh
// ============================================================
const TRUE_CONC_HCL  = 0.0988;             // nồng độ thật, gần 0.1 nhưng không đúng (để SV không đoán)
const VOLUME_HCL_ML  = 25.0;                // ml HCl trong bình
const CONC_NAOH      = 0.100;                // ml NaOH chuẩn
// Volume NaOH cần để đạt điểm tương đương: Veq = Ca*Va/Cb = 24.7 mL
const V_EQUIVALENCE  = (TRUE_CONC_HCL * VOLUME_HCL_ML) / CONC_NAOH;
const BURET_CAPACITY = 50;                   // mL trong buret
const DRIP_FAST_MLS  = 5.0;   // mL / second khi mở van nhanh
const DRIP_SLOW_MLS  = 0.25;  // mL / second khi nhỏ giọt

// ============================================================
// SCENE SETUP
// ============================================================
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xeef2ee);
scene.fog = new THREE.Fog(0xeef2ee, 18, 50);

const camera = new THREE.PerspectiveCamera(42, innerWidth/innerHeight, 0.05, 100);
camera.position.set(0.8, 1.65, 1.85);

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
controls.minDistance = 0.8;
controls.maxDistance = 4;
controls.update();

// Lighting
scene.add(new THREE.AmbientLight(0xffffff, 0.35));
const sun = new THREE.DirectionalLight(0xffffff, 0.85);
sun.position.set(3, 4, 2);
sun.castShadow = true;
sun.shadow.mapSize.set(2048, 2048);
sun.shadow.camera.left = -3.5; sun.shadow.camera.right = 3.5;
sun.shadow.camera.top = 3.5; sun.shadow.camera.bottom = -2;
sun.shadow.camera.near = 0.1; sun.shadow.camera.far = 12;
sun.shadow.bias = -0.0005;
scene.add(sun);
const fill = new THREE.DirectionalLight(0xc8e1ff, 0.28);
fill.position.set(-2, 3, -1);
scene.add(fill);

// Spotlight over the apparatus
const spot = new THREE.SpotLight(0xfff5e0, 0.7, 8, Math.PI/5.5, 0.4, 1.3);
spot.position.set(0, 3.2, 0.5);
spot.target.position.set(0, 0.9, 0);
spot.castShadow = true;
scene.add(spot); scene.add(spot.target);

// ============================================================
// LAB BENCH + BACKDROP
// ============================================================
const benchMat = new THREE.MeshStandardMaterial({ color: 0xf3f0e8, roughness: 0.65, metalness: 0.05 });
const bench = new THREE.Mesh(new THREE.BoxGeometry(4, 0.06, 1.6), benchMat);
bench.position.set(0, 0.78, 0);
bench.receiveShadow = true;
scene.add(bench);

// Bench legs/base
const legMat = new THREE.MeshStandardMaterial({ color: 0xd1cdc0, roughness: 0.8 });
[[-1.85, 0.39, -0.7],[1.85, 0.39, -0.7],[-1.85, 0.39, 0.7],[1.85, 0.39, 0.7]].forEach(p => {
  const leg = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.78, 0.12), legMat);
  leg.position.set(...p);
  leg.castShadow = true; leg.receiveShadow = true;
  scene.add(leg);
});

// Back wall (subtle)
const wallMat = new THREE.MeshStandardMaterial({ color: 0xe7ece4, roughness: 0.95 });
const wall = new THREE.Mesh(new THREE.PlaneGeometry(8, 4), wallMat);
wall.position.set(0, 2, -1.2);
wall.receiveShadow = true;
scene.add(wall);

// Floor (out of focus, blended with fog)
const floor = new THREE.Mesh(new THREE.PlaneGeometry(10, 6), new THREE.MeshStandardMaterial({ color: 0xdfe5dc, roughness: 0.9 }));
floor.rotation.x = -Math.PI/2;
floor.receiveShadow = true;
scene.add(floor);

// ============================================================
// RETORT STAND + BURET
// ============================================================
const stainlessMat = new THREE.MeshStandardMaterial({ color: 0xb0b8c0, metalness: 0.85, roughness: 0.32 });

// Base of stand (heavy disc)
const standBase = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.18, 0.04, 32), stainlessMat);
standBase.position.set(-0.4, 0.83, 0);
standBase.castShadow = true; standBase.receiveShadow = true;
scene.add(standBase);

// Vertical rod
const standRod = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.018, 1.2, 16), stainlessMat);
standRod.position.set(-0.4, 1.43, 0);
standRod.castShadow = true;
scene.add(standRod);

// Clamp (holds buret)
const clampMat = new THREE.MeshStandardMaterial({ color: 0x4a4d52, metalness: 0.7, roughness: 0.4 });
const clampArm = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.025, 0.03), clampMat);
clampArm.position.set(-0.2, 1.85, 0);
clampArm.castShadow = true;
scene.add(clampArm);
const clampHead = new THREE.Mesh(new THREE.TorusGeometry(0.025, 0.008, 8, 24), clampMat);
clampHead.position.set(0, 1.85, 0);
clampHead.rotation.x = Math.PI/2;
scene.add(clampHead);

// Buret tube — glass
const glassMat = new THREE.MeshPhysicalMaterial({
  color: 0xffffff, metalness: 0, roughness: 0.04,
  transmission: 0.95, thickness: 0.4, ior: 1.5,
  attenuationColor: 0xeef5ff, attenuationDistance: 1.5,
  clearcoat: 1, clearcoatRoughness: 0.05,
});
const buret = new THREE.Mesh(
  new THREE.CylinderGeometry(0.022, 0.022, 0.85, 32, 1, true),
  glassMat
);
buret.position.set(0, 1.55, 0);
scene.add(buret);

// Buret bottom taper
const buretTaper = new THREE.Mesh(
  new THREE.CylinderGeometry(0.022, 0.005, 0.08, 16),
  glassMat
);
buretTaper.position.set(0, 1.09, 0);
scene.add(buretTaper);

// Stopcock (van mở/đóng)
const stopcockMat = new THREE.MeshStandardMaterial({ color: 0x5a4030, roughness: 0.5 });
const stopcock = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.04, 0.022), stopcockMat);
stopcock.position.set(0, 1.04, 0);
stopcock.castShadow = true;
scene.add(stopcock);

// Tip (drip outlet)
const tip = new THREE.Mesh(new THREE.CylinderGeometry(0.004, 0.002, 0.05, 12), glassMat);
tip.position.set(0, 1.0, 0);
scene.add(tip);

// Liquid inside buret — NaOH (clear, slight blue tint via env)
const buretLiquidGroup = new THREE.Group();
buret.add(buretLiquidGroup);
const buretLiquidMat = new THREE.MeshPhysicalMaterial({
  color: 0xc8e4ff, transmission: 0.6, thickness: 0.2, roughness: 0.15, metalness: 0,
});
let buretLiquid;
function rebuildBuretLiquid(fillFrac) {
  if (buretLiquid) buretLiquidGroup.remove(buretLiquid);
  const h = 0.82 * fillFrac;
  buretLiquid = new THREE.Mesh(
    new THREE.CylinderGeometry(0.020, 0.020, h, 28),
    buretLiquidMat
  );
  buretLiquid.position.y = -0.42 + h/2;
  buretLiquidGroup.add(buretLiquid);
}
rebuildBuretLiquid(1.0);

// Volume tick marks on buret (just visual, faux scale)
for (let i = 0; i <= 10; i++) {
  const yFromTop = i * 0.075;
  const tick = new THREE.Mesh(
    new THREE.BoxGeometry(0.045, 0.0025, 0.001),
    new THREE.MeshBasicMaterial({ color: 0x1f2937 })
  );
  tick.position.set(0.025, 1.95 - yFromTop, 0);
  scene.add(tick);
}

// ============================================================
// ERLENMEYER FLASK + ANALYTE + STIR PLATE
// ============================================================
// Magnetic stirrer base
const stirBaseMat = new THREE.MeshStandardMaterial({ color: 0x1f2937, metalness: 0.3, roughness: 0.5 });
const stirBase = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.06, 0.34), stirBaseMat);
stirBase.position.set(0, 0.84, 0);
stirBase.castShadow = true; stirBase.receiveShadow = true;
scene.add(stirBase);

// Plate surface (white ceramic-like)
const platePlate = new THREE.Mesh(
  new THREE.CylinderGeometry(0.13, 0.13, 0.015, 32),
  new THREE.MeshStandardMaterial({ color: 0xf9fafb, roughness: 0.45, metalness: 0.05 })
);
platePlate.position.set(0, 0.875, 0);
platePlate.castShadow = true;
scene.add(platePlate);

// LED indicator on stir base
const led = new THREE.Mesh(
  new THREE.CylinderGeometry(0.008, 0.008, 0.002, 16),
  new THREE.MeshStandardMaterial({ color: 0x22c55e, emissive: 0x22c55e, emissiveIntensity: 1.5 })
);
led.position.set(0.13, 0.871, 0.13);
led.rotation.x = Math.PI/2;
scene.add(led);

// Erlenmeyer flask body (cone + neck)
const flaskGroup = new THREE.Group();
flaskGroup.position.set(0, 0.88, 0);
scene.add(flaskGroup);

// Flask cone (inverted lathe shape)
const flaskPts = [];
for (let i = 0; i <= 16; i++) {
  const t = i / 16;
  // S-curve: wide at base, narrow at neck
  const y = t * 0.16;
  const r = 0.092 - Math.pow(t, 1.8) * 0.078;
  flaskPts.push(new THREE.Vector2(r, y));
}
// Neck section
for (let i = 1; i <= 5; i++) {
  flaskPts.push(new THREE.Vector2(0.022, 0.16 + i * 0.012));
}
const flaskGeo = new THREE.LatheGeometry(flaskPts, 48);
const flask = new THREE.Mesh(flaskGeo, glassMat);
flask.castShadow = true;
flaskGroup.add(flask);

// Liquid inside flask — color animated based on pH
const liquidMat = new THREE.MeshPhysicalMaterial({
  color: 0xfafafa, transmission: 0.55, thickness: 0.3, roughness: 0.18, metalness: 0,
});
let flaskLiquid;
function rebuildFlaskLiquid(fillFrac) {
  if (flaskLiquid) flaskGroup.remove(flaskLiquid);
  const pts = [];
  const liquidLevel = 0.155 * fillFrac;
  for (let i = 0; i <= 16; i++) {
    const t = i / 16 * fillFrac;
    const y = t * 0.16;
    const r = 0.088 - Math.pow(t, 1.8) * 0.078;
    pts.push(new THREE.Vector2(r, y));
  }
  pts.push(new THREE.Vector2(0.088 - Math.pow(fillFrac, 1.8) * 0.078, liquidLevel));
  const geo = new THREE.LatheGeometry(pts, 48);
  flaskLiquid = new THREE.Mesh(geo, liquidMat);
  flaskGroup.add(flaskLiquid);
}
rebuildFlaskLiquid(0.7);

// Stir bar in flask (small ellipse)
const stirBar = new THREE.Mesh(
  new THREE.CapsuleGeometry(0.008, 0.05, 4, 12),
  new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.2, metalness: 0.4 })
);
stirBar.rotation.x = Math.PI/2;
stirBar.position.set(0, 0.005, 0);
flaskGroup.add(stirBar);

// Drop particle (visible when dripping)
const dropMat = new THREE.MeshPhysicalMaterial({
  color: 0xb8d8ff, transmission: 0.6, thickness: 0.2, roughness: 0.1, metalness: 0,
});
const drop = new THREE.Mesh(new THREE.SphereGeometry(0.005, 12, 8), dropMat);
drop.visible = false;
scene.add(drop);

// ============================================================
// STATE
// ============================================================
const state = {
  volumeAdded: 0,       // mL NaOH đã thêm
  buretRemaining: BURET_CAPACITY,
  pH: 1.0,
  isDripping: 'none',   // 'none' | 'slow' | 'fast'
  reactionMoles: VOLUME_HCL_ML * TRUE_CONC_HCL / 1000,
  // Curve points
  curvePoints: [{ v: 0, ph: 1.0 }],
};

// ============================================================
// pH MODEL — strong acid + strong base
// Dùng cân bằng điện tích + Kw để tránh discontinuity tại equivalence.
//   [H⁺] − [OH⁻] = Ca − Cb         (electroneutrality)
//   [H⁺] · [OH⁻] = Kw = 10⁻¹⁴
// → [H⁺]² − (Ca − Cb)[H⁺] − Kw = 0
// → [H⁺] = ((Ca − Cb) + √((Ca − Cb)² + 4Kw)) / 2   (chọn nghiệm dương)
// ============================================================
const Kw = 1e-14;
function computePh(vAdded) {
  const totalVolL = (VOLUME_HCL_ML + vAdded) / 1000;
  const Ca = (VOLUME_HCL_ML / 1000) * TRUE_CONC_HCL / totalVolL;  // HCl dilution
  const Cb = (vAdded / 1000) * CONC_NAOH / totalVolL;             // NaOH dilution
  const delta = Ca - Cb;
  const H = (delta + Math.sqrt(delta * delta + 4 * Kw)) / 2;
  return -Math.log10(H);
}

// ============================================================
// COLOR ANIMATION
// ============================================================
function liquidColorForPh(ph) {
  // Phenolphthalein: colorless below pH 8.2, pink 8.2→10, deep magenta >10
  if (ph < 7.5) return new THREE.Color(0xfafafa);
  if (ph < 8.2) {
    const t = (ph - 7.5) / 0.7;
    return new THREE.Color(0xfafafa).lerp(new THREE.Color(0xfde7f3), t);
  }
  if (ph < 9.5) {
    const t = (ph - 8.2) / 1.3;
    return new THREE.Color(0xfde7f3).lerp(new THREE.Color(0xec4899), t);
  }
  return new THREE.Color(0xec4899).lerp(new THREE.Color(0xbe185d), Math.min(1, (ph - 9.5) / 2));
}

// ============================================================
// UI BINDINGS
// ============================================================
const phDisplay = document.getElementById('ph-display');
const volAddedSpan = document.getElementById('vol-added');
const endpointIndicator = document.getElementById('endpoint-indicator');
const curveCanvas = document.getElementById('curve-canvas');
const curveCtx = curveCanvas.getContext('2d');

function refreshUI() {
  phDisplay.textContent = state.pH.toFixed(2);
  volAddedSpan.textContent = state.volumeAdded.toFixed(2);

  // pH color gradient for display
  let g;
  if (state.pH < 4) g = 'linear-gradient(135deg, #ef4444, #b91c1c)';
  else if (state.pH < 7) g = 'linear-gradient(135deg, #f59e0b, #d97706)';
  else if (state.pH < 8) g = 'linear-gradient(135deg, #10b981, #047857)';
  else if (state.pH < 10) g = 'linear-gradient(135deg, #ec4899, #be185d)';
  else g = 'linear-gradient(135deg, #6366f1, #4338ca)';
  phDisplay.style.background = g;
  phDisplay.style.webkitBackgroundClip = 'text';
  phDisplay.style.color = 'transparent';

  // Endpoint hint
  const dist = state.volumeAdded - V_EQUIVALENCE;
  endpointIndicator.classList.remove('near', 'past');
  if (state.pH >= 8.2 && state.pH < 10) {
    endpointIndicator.textContent = '🌸 Đã đến điểm tương đương — DỪNG LẠI và đo!';
    endpointIndicator.classList.add('near');
  } else if (state.pH >= 10) {
    endpointIndicator.textContent = '🔴 Quá điểm — đã thừa NaOH (kết quả sẽ kém chính xác)';
    endpointIndicator.classList.add('past');
  } else if (state.pH >= 6) {
    endpointIndicator.textContent = '⚠️ Sắp đến điểm — chỉ nhỏ giọt CHẬM';
    endpointIndicator.classList.add('near');
  } else {
    endpointIndicator.textContent = '⚪ Còn xa điểm tương đương — có thể mở van NHANH';
  }
}

// Curve drawing
function drawCurve() {
  const w = curveCanvas.width;
  const h = curveCanvas.height;
  curveCtx.clearRect(0, 0, w, h);

  // Grid
  curveCtx.strokeStyle = '#e5e7eb';
  curveCtx.lineWidth = 1;
  for (let v = 0; v <= 40; v += 10) {
    const x = (v / 40) * w;
    curveCtx.beginPath(); curveCtx.moveTo(x, 0); curveCtx.lineTo(x, h); curveCtx.stroke();
  }
  for (let p = 0; p <= 14; p += 2) {
    const y = h - (p / 14) * h;
    curveCtx.beginPath(); curveCtx.moveTo(0, y); curveCtx.lineTo(w, y); curveCtx.stroke();
  }
  // Axes labels
  curveCtx.fillStyle = '#9ca3af';
  curveCtx.font = '10px system-ui';
  curveCtx.fillText('pH', 4, 12);
  curveCtx.fillText('V NaOH (mL)', w - 70, h - 4);

  // Equivalence line (vertical, dashed)
  curveCtx.strokeStyle = '#f59e0b';
  curveCtx.setLineDash([3, 3]);
  curveCtx.beginPath();
  const xEq = (V_EQUIVALENCE / 40) * w;
  curveCtx.moveTo(xEq, 0); curveCtx.lineTo(xEq, h);
  curveCtx.stroke();
  curveCtx.setLineDash([]);

  // Curve
  curveCtx.strokeStyle = '#0ea5e9';
  curveCtx.lineWidth = 2;
  curveCtx.beginPath();
  state.curvePoints.forEach((pt, i) => {
    const x = (pt.v / 40) * w;
    const y = h - (pt.ph / 14) * h;
    if (i === 0) curveCtx.moveTo(x, y); else curveCtx.lineTo(x, y);
  });
  curveCtx.stroke();

  // Current point
  const lastPt = state.curvePoints[state.curvePoints.length - 1];
  const cx = (lastPt.v / 40) * w;
  const cy = h - (lastPt.ph / 14) * h;
  curveCtx.fillStyle = '#0369a1';
  curveCtx.beginPath();
  curveCtx.arc(cx, cy, 4, 0, Math.PI * 2);
  curveCtx.fill();
}

// ============================================================
// DRIP LOOP
// ============================================================
let lastT = performance.now();
function dripTick(dtMs) {
  if (state.isDripping === 'none') return;
  if (state.buretRemaining <= 0) return;

  const rate = state.isDripping === 'fast' ? DRIP_FAST_MLS : DRIP_SLOW_MLS;
  const dV = (rate * dtMs / 1000);
  state.volumeAdded += dV;
  state.buretRemaining = Math.max(0, state.buretRemaining - dV);

  state.pH = computePh(state.volumeAdded);

  // Update curve points (max every 0.05 mL or every 0.5 pH)
  const lastPt = state.curvePoints[state.curvePoints.length - 1];
  if (state.volumeAdded - lastPt.v > 0.05 || Math.abs(state.pH - lastPt.ph) > 0.3) {
    state.curvePoints.push({ v: state.volumeAdded, ph: state.pH });
  }

  // Visual: buret liquid level
  rebuildBuretLiquid(state.buretRemaining / BURET_CAPACITY);

  // Flask liquid color
  const c = liquidColorForPh(state.pH);
  liquidMat.color.copy(c);

  // Show drop animation
  drop.visible = state.isDripping !== 'none';
  drop.position.set(0, 0.98 - (Math.sin(performance.now()/120) * 0.04), 0);
}

// ============================================================
// CONTROLS — drip buttons
// ============================================================
const btnFast = document.getElementById('btn-fast');
const btnSlow = document.getElementById('btn-slow');
const btnReset = document.getElementById('btn-reset');
const btnSubmit = document.getElementById('btn-submit');

function bindHold(btn, kind) {
  const start = () => { state.isDripping = kind; btn.classList.add('fast'); };
  const stop  = () => { state.isDripping = 'none'; drop.visible = false; btn.classList.remove('fast'); };
  btn.addEventListener('mousedown', start);
  btn.addEventListener('touchstart', e => { e.preventDefault(); start(); }, { passive: false });
  btn.addEventListener('mouseup', stop);
  btn.addEventListener('mouseleave', stop);
  btn.addEventListener('touchend', stop);
  btn.addEventListener('touchcancel', stop);
}
bindHold(btnFast, 'fast');
bindHold(btnSlow, 'slow');

btnReset.addEventListener('click', () => resetTitration());
btnSubmit.addEventListener('click', () => submitResult());

function resetTitration() {
  state.volumeAdded = 0;
  state.buretRemaining = BURET_CAPACITY;
  state.pH = 1.0;
  state.curvePoints = [{ v: 0, ph: 1.0 }];
  liquidMat.color.set(0xfafafa);
  rebuildBuretLiquid(1.0);
  document.getElementById('result-modal').classList.remove('open');
}

// ============================================================
// SUBMIT
// ============================================================
async function submitResult() {
  const measuredV = state.volumeAdded;
  // Học sinh đoán nồng độ HCl từ measured volume
  const computedCa = (measuredV * CONC_NAOH) / VOLUME_HCL_ML;
  const errorPct = Math.abs(computedCa - TRUE_CONC_HCL) / TRUE_CONC_HCL * 100;

  // Scoring tuned theo pedagogy thực tế:
  //   - Endpoint phenolphthalein chính thức ở pH 8.2–10 → vol 24.71–24.85 (~0.6%)
  //   - Sai số <1% (vol 24.45–24.95) = chấp nhận được (88+)
  //   - "Overshoot nặng" = pH > 11 hoặc vol > 25.2 (đã thừa rõ rệt)
  let score;
  const overshoot = state.pH > 11.0;
  if (errorPct < 0.5) score = 100;       // 24.58–24.82 mL
  else if (errorPct < 1) score = 92;     // 24.45–24.95 mL
  else if (errorPct < 2) score = 78;     // 24.21–25.19 mL
  else if (errorPct < 5) score = 60;     // 23.5–26.0 mL
  else if (errorPct < 10) score = 40;
  else score = 20;
  if (overshoot) score = Math.min(score, 50);

  const stars = score >= 95 ? 3 : score >= 75 ? 2 : score >= 50 ? 1 : 0;

  // Update modal UI
  document.getElementById('r-stars').textContent = '⭐'.repeat(stars) + '☆'.repeat(3 - stars);
  document.getElementById('r-score').textContent = `${score}/100`;
  document.getElementById('result-card').classList.toggle('poor', score < 50);
  document.getElementById('r-rows').innerHTML = `
    <div class="row ${errorPct < 2 ? 'true' : ''}"><span>V<sub>NaOH</sub> đo được</span><b>${measuredV.toFixed(2)} mL</b></div>
    <div class="row ${errorPct < 2 ? 'true' : ''}"><span>V<sub>NaOH</sub> đúng (lý thuyết)</span><b>${V_EQUIVALENCE.toFixed(2)} mL</b></div>
    <div class="row ${errorPct < 2 ? 'true' : ''}"><span>C<sub>HCl</sub> tính được</span><b>${computedCa.toFixed(4)} M</b></div>
    <div class="row ${errorPct < 2 ? 'true' : ''}"><span>C<sub>HCl</sub> thật</span><b>${TRUE_CONC_HCL.toFixed(4)} M</b></div>
    <div class="row ${errorPct < 2 ? 'true' : ''}"><span>Sai số</span><b>${errorPct.toFixed(2)} %</b></div>
    ${overshoot ? '<div class="row" style="background:#fee2e2"><span>⚠️ Cảnh báo</span><b>Đã vượt điểm tương đương</b></div>' : ''}
  `;
  document.getElementById('result-modal').classList.add('open');

  // Submit to backend (engine schema)
  try {
    await fetch('/api/attempts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        version: 'L2.1-titration-01',
        playerName: (localStorage.getItem('tizia:playerName') || 'Ẩn danh'),
        classCode: localStorage.getItem('tizia:classCode') || undefined,
        score,
        correct: errorPct < 2 ? 1 : 0,
        total: 1,
        durationMs: Math.round(performance.now()),
        details: JSON.stringify({
          kind: 'titration',
          measuredV, expectedV: V_EQUIVALENCE,
          computedCa, trueCa: TRUE_CONC_HCL,
          errorPct, overshoot, stars,
        }),
      }),
    });
  } catch (e) { console.warn('submit failed', e); }
}

document.getElementById('r-again').addEventListener('click', () => resetTitration());
document.getElementById('r-home').addEventListener('click', () => location.href = '/index.html');

// ============================================================
// MAIN LOOPS
// ============================================================
// Drip + UI refresh — chạy bằng setInterval để không bị tab-throttle
// (rAF bị browser pause khi tab không active → khoá dòng giả lập).
const SIM_STEP_MS = 50; // 20Hz đủ mượt cho UI text
let simAccumDt = 0;
setInterval(() => {
  dripTick(SIM_STEP_MS);
  refreshUI();
  drawCurve();
}, SIM_STEP_MS);

// 3D render — vẫn dùng rAF (khi tab active thì 60fps, khi background browser
// tự throttle đỡ tốn CPU; không ảnh hưởng simulation vì đã tách)
function render3D(t) {
  const dt = t - lastT;
  lastT = t;
  stirBar.rotation.y += dt * 0.012; // stir bar spins
  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(render3D);
}

// Resize
window.addEventListener('resize', () => {
  camera.aspect = innerWidth/innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight);
});

// Initial pH
state.pH = computePh(0);
refreshUI();
drawCurve();

requestAnimationFrame(render3D);

// Debug hook — dùng cho test tự động + giảng viên có thể demo nhanh:
// window.__lab.setVolume(24.7) → nhảy đến điểm tương đương ngay
window.__lab = {
  state,
  setVolume(v) {
    state.volumeAdded = v;
    state.buretRemaining = Math.max(0, BURET_CAPACITY - v);
    state.pH = computePh(v);
    state.curvePoints.push({ v, ph: state.pH });
    rebuildBuretLiquid(state.buretRemaining / BURET_CAPACITY);
    liquidMat.color.copy(liquidColorForPh(state.pH));
    refreshUI(); drawCurve();
  },
  computePh,
  V_EQUIVALENCE,
};
