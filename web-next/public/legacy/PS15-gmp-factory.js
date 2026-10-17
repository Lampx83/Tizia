import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

// ============================================================
// SCENE SETUP
// ============================================================
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xeef2ee);
scene.fog = new THREE.Fog(0xeef2ee, 30, 90);

const camera = new THREE.PerspectiveCamera(45, innerWidth/innerHeight, 0.1, 200);
camera.position.set(0, 22, 22);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(devicePixelRatio);
renderer.setSize(innerWidth, innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.05;
document.body.appendChild(renderer.domElement);

const pmrem = new THREE.PMREMGenerator(renderer);
scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;

const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 0.5, 0);
controls.enableDamping = true;
controls.dampingFactor = 0.08;
controls.maxPolarAngle = Math.PI * 0.48;
controls.minDistance = 4;
controls.maxDistance = 50;
controls.update();

// Lighting
scene.add(new THREE.AmbientLight(0xffffff, 0.45));
const sun = new THREE.DirectionalLight(0xffffff, 0.85);
sun.position.set(12, 18, 8);
sun.castShadow = true;
sun.shadow.mapSize.set(2048, 2048);
sun.shadow.camera.left = -22; sun.shadow.camera.right = 22;
sun.shadow.camera.top = 22; sun.shadow.camera.bottom = -22;
sun.shadow.camera.near = 0.5; sun.shadow.camera.far = 50;
sun.shadow.bias = -0.0005;
scene.add(sun);
const fill = new THREE.DirectionalLight(0xc8e1ff, 0.3);
fill.position.set(-6, 8, -4);
scene.add(fill);

// ============================================================
// FACTORY LAYOUT — 4 rooms in 2x2 grid
//   Each room is 10x10 footprint, separated by corridor.
//   Centers at (-6, -6), (6, -6), (-6, 6), (6, 6) on XZ.
// ============================================================
const ROOM_SIZE = 10;
const ROOMS = {
  D: { center: [-6, 0, -6], color: 0xfbbf24, lineColor: 0xf59e0b,
       iso: 'ISO 9', class: 'CLASS D',
       name: 'Kho · Tiếp nhận nguyên liệu',
       particles: '≤ 3,520,000', ach: '≥ 6 ACH',
       activities: ['Tiếp nhận & quarantine nguyên liệu', 'Lưu trữ & cấp phát', 'Dán nhãn "released" sau QC'],
       ppe: ['Áo blouse, mũ, găng tay', 'Giày bảo hộ', 'Khẩu trang đơn giản'] },
  C: { center: [6, 0, -6], color: 0x34d399, lineColor: 0x059669,
       iso: 'ISO 8', class: 'CLASS C',
       name: 'Pha trộn · Granulation',
       particles: '≤ 3,520,000 (at rest)', ach: '≥ 20 ACH',
       activities: ['Cân nguyên liệu chính xác', 'V-mixer trộn hỗn hợp', 'Tạo hạt (granulation)'],
       ppe: ['Coverall liền thân, mũ trùm', 'Găng tay nitrile 2 lớp', 'Khẩu trang N95', 'Boots dành riêng phòng'] },
  B: { center: [-6, 0, 6], color: 0x60a5fa, lineColor: 0x1d4ed8,
       iso: 'ISO 7', class: 'CLASS B',
       name: 'Dập viên & Bao phim',
       particles: '≤ 352,000 (at rest)', ach: '≥ 30 ACH',
       activities: ['Tablet press đập viên', 'Coating pan bao phim', 'IPC: độ cứng, độ rã'],
       ppe: ['Coverall sterile, áo liền mũ', 'Găng tay khử trùng', 'Khẩu trang FFP3', 'Kính bảo hộ', 'Đi qua airlock'] },
  A: { center: [6, 0, 6], color: 0xf87171, lineColor: 0xb91c1c,
       iso: 'ISO 5', class: 'CLASS A',
       name: 'Vô trùng · Aseptic Filling',
       particles: '≤ 3,520 ≥0.5μm/m³', ach: 'Unidirectional flow ≥0.36 m/s',
       activities: ['Pre-use sterility (PUPSIT)', 'Vial filling line', 'Gloveport isolator'],
       ppe: ['Sterile coverall 1 mảnh', 'Mũ trùm sterile', '2 lớp găng sterile (validated)', 'Mặt nạ + che mặt', 'Boots sterile', 'Đi qua chuỗi airlock'] }
};

// ============================================================
// FLOOR — concrete grey
// ============================================================
const floorMat = new THREE.MeshStandardMaterial({ color: 0xbfc4c2, roughness: 0.92, metalness: 0.02 });
const floor = new THREE.Mesh(new THREE.PlaneGeometry(40, 40), floorMat);
floor.rotation.x = -Math.PI/2;
floor.receiveShadow = true;
scene.add(floor);

// Corridor cross (lighter)
const corridorMat = new THREE.MeshStandardMaterial({ color: 0xe5e7eb, roughness: 0.85 });
const corridorH = new THREE.Mesh(new THREE.PlaneGeometry(28, 2.5), corridorMat);
corridorH.rotation.x = -Math.PI/2; corridorH.position.y = 0.005;
scene.add(corridorH);
const corridorV = new THREE.Mesh(new THREE.PlaneGeometry(2.5, 28), corridorMat);
corridorV.rotation.x = -Math.PI/2; corridorV.position.y = 0.005;
scene.add(corridorV);

// ============================================================
// ROOM FACTORY — floor tile + low walls + signage
// ============================================================
const ROOM_OBJECTS = {};
const ROOM_GROUPS = {};

function createRoom(key) {
  const r = ROOMS[key];
  const group = new THREE.Group();
  group.position.set(r.center[0], 0, r.center[2]);
  scene.add(group);
  ROOM_GROUPS[key] = group;

  // Color-coded floor strip
  const floorTile = new THREE.Mesh(
    new THREE.PlaneGeometry(ROOM_SIZE - 0.4, ROOM_SIZE - 0.4),
    new THREE.MeshStandardMaterial({ color: r.color, roughness: 0.7, metalness: 0.05, transparent: true, opacity: 0.32 })
  );
  floorTile.rotation.x = -Math.PI/2; floorTile.position.y = 0.01;
  floorTile.receiveShadow = true;
  group.add(floorTile);

  // Indicator border lines (factory marking)
  const lineMat = new THREE.MeshStandardMaterial({ color: r.lineColor, roughness: 0.5, metalness: 0.1, emissive: r.lineColor, emissiveIntensity: 0.15 });
  const halfS = ROOM_SIZE/2 - 0.3;
  [[0, 0, halfS], [0, 0, -halfS]].forEach(p => {
    const ln = new THREE.Mesh(new THREE.BoxGeometry(ROOM_SIZE - 0.4, 0.02, 0.15), lineMat);
    ln.position.set(...p); ln.position.y = 0.02;
    group.add(ln);
  });
  [[halfS, 0, 0], [-halfS, 0, 0]].forEach(p => {
    const ln = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.02, ROOM_SIZE - 0.4), lineMat);
    ln.position.set(...p); ln.position.y = 0.02;
    group.add(ln);
  });

  // Low walls (4 walls, 1.6m height) — leave gaps at corridor side
  const wallMat = new THREE.MeshStandardMaterial({ color: 0xf5f5f4, roughness: 0.85, metalness: 0.05 });
  const wallH = 1.6;
  // Outer walls only (corridor sides open)
  // Determine which walls based on room position vs origin
  const cx = r.center[0], cz = r.center[2];
  // Outer X wall
  const outerX = cx > 0 ? halfS + 0.15 : -halfS - 0.15;
  const wallX = new THREE.Mesh(new THREE.BoxGeometry(0.15, wallH, ROOM_SIZE - 0.4), wallMat);
  wallX.position.set(outerX, wallH/2, 0);
  wallX.castShadow = true; wallX.receiveShadow = true;
  group.add(wallX);
  // Outer Z wall
  const outerZ = cz > 0 ? halfS + 0.15 : -halfS - 0.15;
  const wallZ = new THREE.Mesh(new THREE.BoxGeometry(ROOM_SIZE - 0.4, wallH, 0.15), wallMat);
  wallZ.position.set(0, wallH/2, outerZ);
  wallZ.castShadow = true; wallZ.receiveShadow = true;
  group.add(wallZ);

  // Inner partial walls (toward corridor) — half-length so corridor stays open
  const innerX = cx > 0 ? -halfS - 0.15 : halfS + 0.15;
  const innerZ = cz > 0 ? -halfS - 0.15 : halfS + 0.15;
  const innerWallX = new THREE.Mesh(new THREE.BoxGeometry(0.15, wallH, 3), wallMat);
  innerWallX.position.set(innerX, wallH/2, cz > 0 ? halfS - 1.5 : -halfS + 1.5);
  innerWallX.castShadow = true;
  group.add(innerWallX);
  const innerWallZ = new THREE.Mesh(new THREE.BoxGeometry(3, wallH, 0.15), wallMat);
  innerWallZ.position.set(cx > 0 ? halfS - 1.5 : -halfS + 1.5, wallH/2, innerZ);
  innerWallZ.castShadow = true;
  group.add(innerWallZ);

  // ISO Sign on outer wall — colored plate
  const signCanvas = document.createElement('canvas');
  signCanvas.width = 512; signCanvas.height = 256;
  const sctx = signCanvas.getContext('2d');
  const grd = sctx.createLinearGradient(0, 0, 0, 256);
  grd.addColorStop(0, '#' + r.color.toString(16).padStart(6, '0'));
  grd.addColorStop(1, '#' + r.lineColor.toString(16).padStart(6, '0'));
  sctx.fillStyle = grd; sctx.fillRect(0, 0, 512, 256);
  sctx.strokeStyle = '#fff'; sctx.lineWidth = 8;
  sctx.strokeRect(8, 8, 496, 240);
  sctx.fillStyle = '#fff';
  sctx.textAlign = 'center'; sctx.textBaseline = 'middle';
  sctx.font = 'bold 90px system-ui';
  sctx.fillText(r.iso, 256, 90);
  sctx.font = 'bold 50px system-ui';
  sctx.fillText(r.class, 256, 180);
  const signTex = new THREE.CanvasTexture(signCanvas);
  signTex.colorSpace = THREE.SRGBColorSpace;
  const signMat = new THREE.MeshStandardMaterial({ map: signTex, roughness: 0.5, metalness: 0.1 });
  const sign = new THREE.Mesh(new THREE.PlaneGeometry(2.4, 1.2), signMat);
  // Place sign on outer X wall
  sign.position.set(outerX - (cx > 0 ? 0.1 : -0.1), 1.8, 0);
  sign.rotation.y = cx > 0 ? -Math.PI/2 : Math.PI/2;
  group.add(sign);

  // Hotspot marker (clickable cylinder above floor)
  const hotspotMat = new THREE.MeshStandardMaterial({ color: r.color, emissive: r.color, emissiveIntensity: 0.5, transparent: true, opacity: 0.85 });
  const hotspot = new THREE.Mesh(new THREE.CylinderGeometry(0.45, 0.5, 0.08, 24), hotspotMat);
  hotspot.position.set(0, 0.05, 0);
  hotspot.userData = { room: key, isHotspot: true };
  group.add(hotspot);

  // HEPA filter / vent on ceiling-area (visual symbol)
  const hepaMat = new THREE.MeshStandardMaterial({ color: 0xd1d5db, roughness: 0.6, metalness: 0.4 });
  const hepa = new THREE.Mesh(new THREE.BoxGeometry(1.8, 0.18, 1.8), hepaMat);
  hepa.position.set(-2, 3.4, -2); hepa.castShadow = true;
  group.add(hepa);
  // HEPA grid lines
  const hepaGridMat = new THREE.MeshStandardMaterial({ color: 0x6b7280, roughness: 0.7 });
  for (let i = -1; i <= 1; i += 0.5) {
    const ln = new THREE.Mesh(new THREE.BoxGeometry(1.7, 0.02, 0.04), hepaGridMat);
    ln.position.set(-2, 3.31, -2 + i * 0.7);
    group.add(ln);
  }

  // Pipe from HEPA going to wall (air handling visual)
  const pipeMat = new THREE.MeshStandardMaterial({ color: 0xa1a1aa, roughness: 0.4, metalness: 0.5 });
  const pipe = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.18, 1.8, 16), pipeMat);
  pipe.position.set(-2, 4.3, -2);
  group.add(pipe);

  // Add equipment specific to room
  if (key === 'D') addWarehouse(group, r);
  if (key === 'C') addBlending(group, r);
  if (key === 'B') addTabletPress(group, r);
  if (key === 'A') addAseptic(group, r);

  // Personnel (simple humanoid)
  addPersonnel(group, key, r);

  ROOM_OBJECTS[key] = { hotspot, group };
  return group;
}

// ============================================================
// EQUIPMENT — ROOM D: Warehouse (boxes, forklift, pallet)
// ============================================================
function addWarehouse(group, r) {
  // Colorful boxes stacked
  const boxColors = [0xef4444, 0x3b82f6, 0xf59e0b, 0x10b981, 0xa855f7, 0xec4899];
  const positions = [
    [-2.5, 0.4, 2.5, 0], [-1.7, 0.4, 2.5, 1], [-2.5, 1.2, 2.5, 2],
    [-1.7, 1.2, 2.5, 3], [-2.1, 2.0, 2.5, 4],
    [2.5, 0.4, 2.5, 5], [3.0, 0.4, 1.7, 0], [2.5, 1.2, 2.5, 2],
  ];
  positions.forEach(p => {
    const box = new THREE.Mesh(
      new THREE.BoxGeometry(0.7, 0.7, 0.7),
      new THREE.MeshStandardMaterial({ color: boxColors[p[3]], roughness: 0.55 })
    );
    box.position.set(p[0], p[1], p[2]);
    box.castShadow = true; box.receiveShadow = true;
    group.add(box);
  });

  // Pallet (wooden brown)
  const palletMat = new THREE.MeshStandardMaterial({ color: 0xa16207, roughness: 0.85 });
  const pallet = new THREE.Mesh(new THREE.BoxGeometry(2.6, 0.12, 1.8), palletMat);
  pallet.position.set(-2.1, 0.06, 2.5);
  pallet.receiveShadow = true; pallet.castShadow = true;
  group.add(pallet);

  // Forklift body (simple)
  const liftMat = new THREE.MeshStandardMaterial({ color: 0xfacc15, roughness: 0.45, metalness: 0.3 });
  const lift = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.8, 1.6), liftMat);
  lift.position.set(2.5, 0.45, -2.0);
  lift.castShadow = true;
  group.add(lift);
  // Lift mast
  const mast = new THREE.Mesh(new THREE.BoxGeometry(0.1, 1.4, 0.1),
    new THREE.MeshStandardMaterial({ color: 0x111827, metalness: 0.7, roughness: 0.3 }));
  mast.position.set(2.5, 1.5, -1.3);
  group.add(mast);
  // Forks
  const forkMat = new THREE.MeshStandardMaterial({ color: 0xe5e7eb, metalness: 0.8, roughness: 0.3 });
  [-0.2, 0.2].forEach(dx => {
    const fork = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.05, 0.9), forkMat);
    fork.position.set(2.5 + dx, 0.1, -0.85);
    group.add(fork);
  });
  // Wheels
  [[-0.5, -0.7],[0.5, -0.7],[-0.5, 0.5],[0.5, 0.5]].forEach(([dx,dz]) => {
    const wheel = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.18, 0.12, 16),
      new THREE.MeshStandardMaterial({ color: 0x1f2937, roughness: 0.85 }));
    wheel.rotation.z = Math.PI/2;
    wheel.position.set(2.5 + dx, 0.18, -2.0 + dz);
    group.add(wheel);
  });

  // Quarantine area (red zone)
  const quarantineMat = new THREE.MeshStandardMaterial({ color: 0xfecaca, transparent: true, opacity: 0.5, roughness: 0.8 });
  const quarantine = new THREE.Mesh(new THREE.PlaneGeometry(2.2, 1.6), quarantineMat);
  quarantine.rotation.x = -Math.PI/2; quarantine.position.set(0, 0.012, -2.5);
  group.add(quarantine);
}

// ============================================================
// EQUIPMENT — ROOM C: Blending (V-mixer, drum, scale)
// ============================================================
function addBlending(group, r) {
  const steel = new THREE.MeshStandardMaterial({ color: 0xd1d5db, metalness: 0.85, roughness: 0.28 });
  const steelDark = new THREE.MeshStandardMaterial({ color: 0x6b7280, metalness: 0.75, roughness: 0.35 });

  // V-mixer base
  const base = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.8, 1.2), steelDark);
  base.position.set(-1.5, 0.4, 0);
  base.castShadow = true; base.receiveShadow = true;
  group.add(base);

  // V-mixer rotating V (two cylinders welded at angle)
  const vMixerGroup = new THREE.Group();
  vMixerGroup.position.set(-1.5, 1.5, 0);
  group.add(vMixerGroup);
  const armA = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.18, 1.2, 24), steel);
  armA.rotation.z = Math.PI/3.5;
  armA.position.set(-0.4, -0.15, 0);
  armA.castShadow = true;
  vMixerGroup.add(armA);
  const armB = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.18, 1.2, 24), steel);
  armB.rotation.z = -Math.PI/3.5;
  armB.position.set(0.4, -0.15, 0);
  armB.castShadow = true;
  vMixerGroup.add(armB);
  // Center connector
  const conn = new THREE.Mesh(new THREE.SphereGeometry(0.22, 16, 12), steel);
  conn.position.set(0, -0.5, 0);
  vMixerGroup.add(conn);
  // Track for animation
  group.userData.vMixer = vMixerGroup;

  // V-mixer support arms
  const arm1 = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 1.2, 12), steelDark);
  arm1.position.set(-2.1, 1.4, 0); arm1.castShadow = true;
  group.add(arm1);
  const arm2 = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 1.2, 12), steelDark);
  arm2.position.set(-0.9, 1.4, 0); arm2.castShadow = true;
  group.add(arm2);

  // Drum (cylindrical container)
  const drum = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.5, 1.0, 24), steel);
  drum.position.set(1.5, 0.5, 1.5);
  drum.castShadow = true; drum.receiveShadow = true;
  group.add(drum);
  // Drum rim
  const rim = new THREE.Mesh(new THREE.TorusGeometry(0.5, 0.04, 8, 24), steelDark);
  rim.rotation.x = Math.PI/2;
  rim.position.set(1.5, 1.0, 1.5);
  group.add(rim);

  // Scale (small table + screen)
  const tableMat = new THREE.MeshStandardMaterial({ color: 0xe5e7eb, roughness: 0.6 });
  const table = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.06, 0.9), tableMat);
  table.position.set(1.8, 0.8, -1.5);
  table.castShadow = true; table.receiveShadow = true;
  group.add(table);
  // Table legs
  [[1.3, 0.4, -1.9],[2.3, 0.4, -1.9],[1.3, 0.4, -1.1],[2.3, 0.4, -1.1]].forEach(p => {
    const leg = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.78, 0.06), steelDark);
    leg.position.set(...p);
    group.add(leg);
  });
  // Scale plate
  const scalePlate = new THREE.Mesh(new THREE.CylinderGeometry(0.25, 0.25, 0.02, 24),
    new THREE.MeshStandardMaterial({ color: 0xf3f4f6, metalness: 0.6, roughness: 0.25 }));
  scalePlate.position.set(1.8, 0.84, -1.5);
  group.add(scalePlate);
  // Scale display
  const screen = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.18, 0.04),
    new THREE.MeshStandardMaterial({ color: 0x111827, emissive: 0x10b981, emissiveIntensity: 0.6 }));
  screen.position.set(1.8, 0.95, -1.85);
  group.add(screen);
}

// ============================================================
// EQUIPMENT — ROOM B: Tablet press + coating pan
// ============================================================
function addTabletPress(group, r) {
  const steel = new THREE.MeshStandardMaterial({ color: 0xd1d5db, metalness: 0.85, roughness: 0.28 });
  const steelDark = new THREE.MeshStandardMaterial({ color: 0x6b7280, metalness: 0.75, roughness: 0.35 });

  // Tablet press base
  const pressBase = new THREE.Mesh(new THREE.BoxGeometry(1.6, 1.2, 1.4), steelDark);
  pressBase.position.set(-1.5, 0.6, 0);
  pressBase.castShadow = true; pressBase.receiveShadow = true;
  group.add(pressBase);

  // Glass enclosure
  const glassMat = new THREE.MeshPhysicalMaterial({
    color: 0xffffff, metalness: 0, roughness: 0.08,
    transmission: 0.85, thickness: 0.4, ior: 1.5,
    clearcoat: 1, clearcoatRoughness: 0.05,
  });
  const press = new THREE.Mesh(new THREE.CylinderGeometry(0.6, 0.6, 0.9, 24), glassMat);
  press.position.set(-1.5, 1.65, 0);
  group.add(press);
  // Press top
  const pressTop = new THREE.Mesh(new THREE.CylinderGeometry(0.65, 0.65, 0.12, 24), steel);
  pressTop.position.set(-1.5, 2.15, 0);
  pressTop.castShadow = true;
  group.add(pressTop);

  // Animated punch (moves up/down)
  const punchGroup = new THREE.Group();
  punchGroup.position.set(-1.5, 1.65, 0);
  group.add(punchGroup);
  const punch = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.4, 16),
    new THREE.MeshStandardMaterial({ color: 0xe5e7eb, metalness: 0.95, roughness: 0.15 }));
  punch.position.y = 0.3;
  punchGroup.add(punch);
  group.userData.tabletPunch = punchGroup;

  // Tablets emerging (small pile)
  const tabletMat = new THREE.MeshStandardMaterial({ color: 0xfef3c7, roughness: 0.45 });
  for (let i = 0; i < 12; i++) {
    const tablet = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.015, 12), tabletMat);
    const ang = i * 0.5;
    tablet.position.set(-1.5 + Math.cos(ang) * 0.2, 1.21, Math.sin(ang) * 0.2);
    tablet.castShadow = true;
    group.add(tablet);
  }

  // Coating pan (rotating sphere)
  const panBase = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.6, 1.4), steelDark);
  panBase.position.set(1.5, 0.3, 0);
  panBase.castShadow = true;
  group.add(panBase);
  const coatingPan = new THREE.Mesh(new THREE.SphereGeometry(0.55, 24, 16, 0, Math.PI*2, 0, Math.PI*0.65), steel);
  coatingPan.position.set(1.5, 1.0, 0);
  coatingPan.castShadow = true;
  group.add(coatingPan);
  group.userData.coatingPan = coatingPan;
  // Coating pan front opening — small ring
  const panRim = new THREE.Mesh(new THREE.TorusGeometry(0.4, 0.04, 8, 24), steelDark);
  panRim.position.set(1.5, 1.35, 0);
  group.add(panRim);

  // Control panel
  const cpMat = new THREE.MeshStandardMaterial({ color: 0x1f2937, roughness: 0.5, metalness: 0.3 });
  const cp = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.35, 0.06), cpMat);
  cp.position.set(-1.5, 1.1, 0.75);
  group.add(cp);
  // CP screen
  const cpScreen = new THREE.Mesh(new THREE.PlaneGeometry(0.35, 0.2),
    new THREE.MeshStandardMaterial({ color: 0x60a5fa, emissive: 0x60a5fa, emissiveIntensity: 0.6 }));
  cpScreen.position.set(-1.5, 1.13, 0.79);
  group.add(cpScreen);
}

// ============================================================
// EQUIPMENT — ROOM A: Aseptic isolator + vial line
// ============================================================
function addAseptic(group, r) {
  const steel = new THREE.MeshStandardMaterial({ color: 0xe5e7eb, metalness: 0.7, roughness: 0.25 });
  const steelDark = new THREE.MeshStandardMaterial({ color: 0x6b7280, metalness: 0.75, roughness: 0.35 });

  // Isolator base
  const iBase = new THREE.Mesh(new THREE.BoxGeometry(3.5, 0.85, 1.2), steelDark);
  iBase.position.set(0, 0.42, -1.0);
  iBase.castShadow = true; iBase.receiveShadow = true;
  group.add(iBase);

  // Isolator glass enclosure
  const glassMat = new THREE.MeshPhysicalMaterial({
    color: 0xeff6ff, metalness: 0, roughness: 0.05,
    transmission: 0.9, thickness: 0.3, ior: 1.5,
    clearcoat: 1, clearcoatRoughness: 0.04,
  });
  const isolator = new THREE.Mesh(new THREE.BoxGeometry(3.4, 1.4, 1.1), glassMat);
  isolator.position.set(0, 1.55, -1.0);
  group.add(isolator);
  // Isolator frame
  const frameMat = new THREE.MeshStandardMaterial({ color: 0xa1a1aa, metalness: 0.85, roughness: 0.2 });
  [[-1.7, 1.55, -0.45],[1.7, 1.55, -0.45],[-1.7, 1.55, -1.55],[1.7, 1.55, -1.55]].forEach(p => {
    const frame = new THREE.Mesh(new THREE.BoxGeometry(0.05, 1.4, 0.05), frameMat);
    frame.position.set(...p);
    group.add(frame);
  });
  // Isolator top
  const iTop = new THREE.Mesh(new THREE.BoxGeometry(3.5, 0.08, 1.2), steel);
  iTop.position.set(0, 2.29, -1.0);
  iTop.castShadow = true;
  group.add(iTop);

  // Gloveports — 2 black gloves through front
  const gloveMat = new THREE.MeshStandardMaterial({ color: 0x111827, roughness: 0.6, metalness: 0.1 });
  [-0.55, 0.55].forEach(dx => {
    // Glove port ring
    const ring = new THREE.Mesh(new THREE.TorusGeometry(0.18, 0.04, 12, 24), frameMat);
    ring.position.set(dx, 1.55, -0.45);
    ring.rotation.x = Math.PI/2;
    group.add(ring);
    // Glove (drooping)
    const glove = new THREE.Mesh(new THREE.SphereGeometry(0.16, 16, 12), gloveMat);
    glove.position.set(dx, 1.3, -0.5);
    glove.scale.set(1, 1.6, 1.1);
    group.add(glove);
  });

  // Vials on conveyor inside isolator
  const conveyor = new THREE.Mesh(new THREE.BoxGeometry(3.0, 0.05, 0.3),
    new THREE.MeshStandardMaterial({ color: 0x374151, roughness: 0.7, metalness: 0.4 }));
  conveyor.position.set(0, 0.9, -1.0);
  group.add(conveyor);

  // Animated vials
  const vialsGroup = new THREE.Group();
  group.add(vialsGroup);
  const vialGlassMat = new THREE.MeshPhysicalMaterial({
    color: 0xffffff, metalness: 0, roughness: 0.06,
    transmission: 0.85, thickness: 0.2, ior: 1.5,
  });
  const liquidMat = new THREE.MeshPhysicalMaterial({
    color: 0xfde68a, transmission: 0.55, thickness: 0.18, roughness: 0.18, metalness: 0,
  });
  const vialCount = 8;
  const vials = [];
  for (let i = 0; i < vialCount; i++) {
    const vialGroup = new THREE.Group();
    const vialBody = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.18, 16), vialGlassMat);
    vialBody.position.y = 0.09;
    vialBody.castShadow = true;
    vialGroup.add(vialBody);
    // Liquid inside
    const liquid = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.055, 0.12, 16), liquidMat);
    liquid.position.y = 0.08;
    vialGroup.add(liquid);
    // Cap
    const cap = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.045, 0.04, 12),
      new THREE.MeshStandardMaterial({ color: 0xa1a1aa, metalness: 0.9, roughness: 0.3 }));
    cap.position.y = 0.2;
    vialGroup.add(cap);

    vialGroup.position.set(-1.4 + (i / vialCount) * 2.8, 0.93, -1.0);
    vialsGroup.add(vialGroup);
    vials.push(vialGroup);
  }
  group.userData.vials = vials;

  // Filling nozzle dropping liquid
  const nozzle = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.02, 0.3, 12),
    new THREE.MeshStandardMaterial({ color: 0xe5e7eb, metalness: 0.95, roughness: 0.12 }));
  nozzle.position.set(0, 1.7, -1.0);
  group.add(nozzle);

  // HEPA above (unidirectional flow visualization)
  const hepaA = new THREE.Mesh(new THREE.BoxGeometry(3.4, 0.1, 1.1),
    new THREE.MeshStandardMaterial({ color: 0xddd6fe, roughness: 0.7, emissive: 0xa78bfa, emissiveIntensity: 0.1 }));
  hepaA.position.set(0, 2.25, -1.0);
  group.add(hepaA);
}

// ============================================================
// PERSONNEL — simple humanoid per room
// ============================================================
function addPersonnel(group, key, r) {
  const ppeColor = {
    D: { suit: 0xe5e7eb, mask: 0x60a5fa },     // light gown, simple mask
    C: { suit: 0xf3f4f6, mask: 0x1f2937 },     // coverall, N95
    B: { suit: 0xffffff, mask: 0x6366f1 },     // sterile, FFP3
    A: { suit: 0xfafafa, mask: 0x0ea5e9 },     // full sterile, face shield
  }[key];

  const personGroup = new THREE.Group();
  personGroup.position.set(2.0, 0, -1.2);
  group.add(personGroup);

  // Legs
  const legMat = new THREE.MeshStandardMaterial({ color: ppeColor.suit, roughness: 0.6 });
  [-0.1, 0.1].forEach(dx => {
    const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.8, 12), legMat);
    leg.position.set(dx, 0.4, 0);
    leg.castShadow = true;
    personGroup.add(leg);
  });
  // Torso
  const torso = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.18, 0.7, 16), legMat);
  torso.position.set(0, 1.15, 0);
  torso.castShadow = true;
  personGroup.add(torso);
  // Arms
  [-0.27, 0.27].forEach(dx => {
    const arm = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.6, 12), legMat);
    arm.position.set(dx, 1.15, 0);
    arm.castShadow = true;
    personGroup.add(arm);
  });
  // Head
  const headMat = new THREE.MeshStandardMaterial({ color: 0xfed7aa, roughness: 0.7 });
  const head = new THREE.Mesh(new THREE.SphereGeometry(0.12, 16, 12), headMat);
  head.position.set(0, 1.65, 0);
  head.castShadow = true;
  personGroup.add(head);
  // Hood / cap
  const hood = new THREE.Mesh(new THREE.SphereGeometry(0.135, 16, 12, 0, Math.PI * 2, 0, Math.PI * 0.7), legMat);
  hood.position.set(0, 1.66, 0);
  personGroup.add(hood);
  // Mask
  const mask = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.08, 0.04),
    new THREE.MeshStandardMaterial({ color: ppeColor.mask, roughness: 0.5 }));
  mask.position.set(0, 1.58, 0.1);
  personGroup.add(mask);
  // For room A, add face shield
  if (key === 'A') {
    const shield = new THREE.Mesh(new THREE.SphereGeometry(0.16, 16, 12, 0, Math.PI, 0, Math.PI*0.6),
      new THREE.MeshPhysicalMaterial({ color: 0xffffff, transmission: 0.8, roughness: 0.05, metalness: 0, ior: 1.5 }));
    shield.position.set(0, 1.62, 0.04);
    shield.rotation.y = Math.PI;
    personGroup.add(shield);
  }
}

// Create all 4 rooms
Object.keys(ROOMS).forEach(createRoom);

// ============================================================
// CHALLENGES — 3 per room × 4 rooms = 12 total
// References: ICH Q7, USP <797> <800>, EU GMP Annex 1 (2022), VN GMP-WHO
// ============================================================
const CHALLENGES = {
  D: [
    {
      q: 'Vật liệu nhận vào kho phải được xử lý thế nào trước khi cấp phát sản xuất?',
      opts: [
        'Cấp phát ngay nếu nhà cung cấp đã GMP',
        'Cách ly (quarantine) → lấy mẫu → QC kiểm → "released"',
        'Trộn lẫn với lô cũ để tiết kiệm',
        'Chỉ kiểm cảm quan rồi nhập kho chính',
      ],
      correct: 1,
      ref: 'ICH Q7 §7.2: Mọi nguyên liệu vào phải qua quarantine trước khi released.',
    },
    {
      q: 'Class D yêu cầu particle ≥0.5μm/m³ TỐI ĐA là bao nhiêu (in operation)?',
      opts: [
        '≤ 3,520 / m³',
        '≤ 352,000 / m³',
        '≤ 3,520,000 / m³',
        'Không giới hạn',
      ],
      correct: 2,
      ref: 'EU GMP Annex 1 (2022) Bảng 1: Grade D in operation ≤ 3,520,000.',
    },
    {
      q: 'Hồ sơ tiếp nhận nguyên liệu CẦN ghi nhận gì?',
      opts: [
        'Chỉ tên và số lượng',
        'Số lô, CoA, ngày nhận, người nhận, tình trạng bao bì',
        'Chỉ ngày và người nhận',
        'Không cần — đã có hoá đơn',
      ],
      correct: 1,
      ref: 'ICH Q7 §6: Đầy đủ traceability cho mọi lô đầu vào.',
    },
  ],
  C: [
    {
      q: 'PPE bắt buộc khi vào Class C (granulation) gồm những gì?',
      opts: [
        'Áo blouse + găng tay',
        'Coverall + mũ trùm + găng nitrile + khẩu trang + boots riêng',
        'Sterile coverall + mặt nạ',
        'Quần áo bình thường',
      ],
      correct: 1,
      ref: 'EU GMP Annex 1: Grade C cần coverall liền thân + bao tóc + boots riêng + găng kép.',
    },
    {
      q: 'Trước khi vào Class C, người vận hành phải làm gì?',
      opts: [
        'Đi thẳng từ ngoài đường vào',
        'Qua airlock 2 cấp: thay quần áo, đeo khẩu trang, sát khuẩn tay',
        'Chỉ cần rửa tay',
        'Chỉ thay giày',
      ],
      correct: 1,
      ref: 'EU GMP Annex 1 §4: Gowning sequence trong changing rooms theo cấp tăng dần.',
    },
    {
      q: 'V-mixer cần validate điều gì để đảm bảo trộn đồng đều?',
      opts: [
        'Chỉ thời gian trộn',
        'Blend uniformity testing tại nhiều điểm trong drum',
        'Không cần validate',
        'Chỉ tốc độ quay',
      ],
      correct: 1,
      ref: 'ICH Q7 §12: Process validation đòi hỏi blend uniformity tại ≥10 vị trí.',
    },
  ],
  B: [
    {
      q: 'Validation tablet press cần test những thông số nào?',
      opts: [
        'Chỉ trọng lượng viên',
        'Trọng lượng, độ cứng, độ dày, độ rã, content uniformity',
        'Chỉ độ cứng',
        'Chỉ kích thước',
      ],
      correct: 1,
      ref: 'ICH Q7 §12 + USP <905>: IPC đầy đủ cho tablet press validation.',
    },
    {
      q: 'Class B (ISO 7) cho phép particle ≥0.5μm/m³ TỐI ĐA at rest là bao nhiêu?',
      opts: [
        '≤ 3,520',
        '≤ 352,000',
        '≤ 3,520,000',
        '≤ 35,200',
      ],
      correct: 1,
      ref: 'EU GMP Annex 1 (2022) Bảng 1: Grade B at rest ≤ 352,000.',
    },
    {
      q: 'Coating pan cần kiểm soát điều gì để đảm bảo độ đồng đều màng phim?',
      opts: [
        'Chỉ thời gian phun',
        'Nhiệt độ, lưu lượng phun, tốc độ quay, độ ẩm khí vào',
        'Chỉ áp suất phun',
        'Không cần',
      ],
      correct: 1,
      ref: 'ICH Q7: Critical process parameters cho coating bao gồm temp, spray rate, pan speed.',
    },
  ],
  A: [
    {
      q: 'Pre-use sterility test cho isolator (PUPSIT) tần suất ra sao?',
      opts: [
        'Hàng năm',
        'Trước MỖI batch filling vô trùng',
        'Khi có sự cố',
        'Không bắt buộc',
      ],
      correct: 1,
      ref: 'EU GMP Annex 1 (2022) §8: PUPSIT bắt buộc cho filter sterilizing dùng aseptic filling.',
    },
    {
      q: 'Tần suất air sampling (viable particle) tại Grade A trong khi sản xuất?',
      opts: [
        'Hàng tuần',
        'Liên tục (continuous) trong suốt thời gian critical operations',
        'Mỗi ngày 1 lần',
        'Mỗi ca 1 lần',
      ],
      correct: 1,
      ref: 'EU GMP Annex 1 (2022) §9.31: Grade A đòi hỏi continuous monitoring particle + viable.',
    },
    {
      q: 'Grade A (ISO 5) particle ≥0.5μm/m³ TỐI ĐA (cả at rest và in operation) là bao nhiêu?',
      opts: [
        '≤ 35,200',
        '≤ 3,520',
        '≤ 352',
        '≤ 35',
      ],
      correct: 1,
      ref: 'EU GMP Annex 1 (2022) Bảng 1 + ISO 14644-1: Grade A ≤ 3,520 particles ≥0.5μm/m³.',
    },
  ],
};

// ============================================================
// STATE
// ============================================================
const state = {
  currentRoom: 'D',
  challengeIdx: 0,
  // answers[room][idx] = -1 (unanswered), 0/1 (incorrect/correct)
  answers: { D: [-1,-1,-1], C: [-1,-1,-1], B: [-1,-1,-1], A: [-1,-1,-1] },
  cameraTarget: null,
  cameraLerpT: 1.0,
  cameraFrom: { pos: new THREE.Vector3(), target: new THREE.Vector3() },
  cameraTo:   { pos: new THREE.Vector3(), target: new THREE.Vector3() },
  startTime: performance.now(),
};

// Room camera presets
const ROOM_VIEWS = {
  D: { pos: new THREE.Vector3(-6, 9, 2), target: new THREE.Vector3(-6, 0.5, -6) },
  C: { pos: new THREE.Vector3(6, 9, 2),  target: new THREE.Vector3(6, 0.5, -6) },
  B: { pos: new THREE.Vector3(-6, 9, 14), target: new THREE.Vector3(-6, 0.5, 6) },
  A: { pos: new THREE.Vector3(6, 9, 14),  target: new THREE.Vector3(6, 0.5, 6) },
  ALL: { pos: new THREE.Vector3(0, 22, 22), target: new THREE.Vector3(0, 0.5, 0) },
};

// ============================================================
// UI BINDINGS
// ============================================================
const $ = (sel) => document.querySelector(sel);
const pIso = $('#p-iso'), pName = $('#p-name');
const pParticles = $('#p-particles'), pAch = $('#p-ach');
const activityList = $('#activity-list'), ppeList = $('#ppe-list');
const chContent = $('#ch-content'), chDots = $('#ch-dots');
const chPrev = $('#ch-prev'), chNext = $('#ch-next');
const progText = $('#prog-text'), progFill = $('#prog-fill');
const btnSubmit = $('#btn-submit');

function setRoom(key, lerpCamera = true) {
  state.currentRoom = key;
  state.challengeIdx = 0;
  const r = ROOMS[key];

  pIso.textContent = `${r.iso} — ${r.class}`;
  pName.textContent = r.name;
  pParticles.textContent = r.particles;
  pAch.textContent = r.ach;
  activityList.innerHTML = r.activities.map(a => `<li>${a}</li>`).join('');
  ppeList.innerHTML = r.ppe.map(p => `<li>${p}</li>`).join('');

  // Highlight active mini-map cell
  document.querySelectorAll('.map-cell').forEach(el => {
    el.classList.toggle('active', el.dataset.room === key);
  });

  // Camera transition
  if (lerpCamera) {
    state.cameraFrom.pos.copy(camera.position);
    state.cameraFrom.target.copy(controls.target);
    state.cameraTo.pos.copy(ROOM_VIEWS[key].pos);
    state.cameraTo.target.copy(ROOM_VIEWS[key].target);
    state.cameraLerpT = 0;
  }

  renderChallenge();
}

function renderChallenge() {
  const room = state.currentRoom;
  const idx = state.challengeIdx;
  const ch = CHALLENGES[room][idx];
  const ans = state.answers[room][idx];

  chDots.textContent = `${idx + 1} / 3`;
  chPrev.disabled = idx === 0;
  chNext.disabled = idx === 2;

  if (ans !== -1) {
    chContent.innerHTML = `
      <div class="qtext">${ch.q}</div>
      <div class="opts">
        ${ch.opts.map((opt, i) => {
          let cls = 'opt';
          if (i === ch.correct) cls += ' correct';
          else if (i === ans && ans !== ch.correct) cls += ' wrong';
          return `<button class="${cls}" disabled>${String.fromCharCode(65 + i)}. ${opt}</button>`;
        }).join('')}
      </div>
      <div class="ref">📖 ${ch.ref}</div>
    `;
  } else {
    chContent.innerHTML = `
      <div class="qtext">${ch.q}</div>
      <div class="opts">
        ${ch.opts.map((opt, i) => `<button class="opt" data-i="${i}">${String.fromCharCode(65 + i)}. ${opt}</button>`).join('')}
      </div>
    `;
    chContent.querySelectorAll('.opt').forEach(btn => {
      btn.addEventListener('click', () => answerChallenge(parseInt(btn.dataset.i, 10)));
    });
  }
}

function answerChallenge(choice) {
  const room = state.currentRoom;
  const idx = state.challengeIdx;
  const ch = CHALLENGES[room][idx];
  const correct = choice === ch.correct;
  state.answers[room][idx] = choice;

  showToast(correct ? '✓ Chính xác!' : '✗ Sai rồi — xem giải thích', correct ? 'ok' : 'err');

  renderChallenge();
  updateProgress();
}

function updateProgress() {
  let done = 0, correctCount = 0;
  Object.keys(state.answers).forEach(room => {
    state.answers[room].forEach((ans, i) => {
      if (ans !== -1) {
        done++;
        if (ans === CHALLENGES[room][i].correct) correctCount++;
      }
    });
    // Mark room as complete on mini-map
    const allDone = state.answers[room].every(a => a !== -1);
    const cell = document.querySelector(`.map-cell[data-room="${room}"]`);
    if (cell) cell.classList.toggle('complete', allDone);
  });
  progText.textContent = `${done} / 12`;
  progFill.style.width = `${(done / 12) * 100}%`;
  btnSubmit.disabled = done < 12;
  state.correctCount = correctCount;
}

// Mini-map click
document.querySelectorAll('.map-cell').forEach(el => {
  el.addEventListener('click', () => setRoom(el.dataset.room));
});

// Challenge nav
chPrev.addEventListener('click', () => {
  if (state.challengeIdx > 0) { state.challengeIdx--; renderChallenge(); }
});
chNext.addEventListener('click', () => {
  if (state.challengeIdx < 2) { state.challengeIdx++; renderChallenge(); }
});

// Submit
btnSubmit.addEventListener('click', submitResult);

// ============================================================
// TOAST
// ============================================================
const toastEl = $('#toast');
let toastTimer;
function showToast(msg, cls = '') {
  toastEl.textContent = msg;
  toastEl.className = cls;
  toastEl.style.display = 'block';
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { toastEl.style.display = 'none'; }, 1700);
}

// ============================================================
// SUBMIT — POST /api/attempts
// ============================================================
async function submitResult() {
  const total = 12;
  const correct = state.correctCount || 0;
  const score = Math.round((correct / total) * 100);
  const stars = score >= 90 ? 3 : score >= 70 ? 2 : score >= 50 ? 1 : 0;
  const durationMs = Math.round(performance.now() - state.startTime);

  // Update modal
  document.getElementById('r-stars').textContent = '⭐'.repeat(stars) + '☆'.repeat(3 - stars);
  document.getElementById('r-score').textContent = `${score}/100`;
  document.getElementById('r-sub').textContent = `Đúng ${correct}/${total} câu · Thời gian ${(durationMs/1000).toFixed(0)}s`;
  const rowsHtml = Object.keys(ROOMS).map(room => {
    const r = ROOMS[room];
    const roomCorrect = state.answers[room].filter((a, i) => a === CHALLENGES[room][i].correct).length;
    return `<div class="row ${roomCorrect === 3 ? 'ok' : ''}"><span>${r.iso} · ${r.class}</span><b>${roomCorrect}/3 đúng</b></div>`;
  }).join('');
  document.getElementById('r-rows').innerHTML = rowsHtml;
  document.getElementById('result-modal').classList.add('open');

  try {
    await fetch('/api/attempts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        version: 'PS15-gmp-tour',
        playerName: (localStorage.getItem('tizia:playerName') || 'Ẩn danh'),
        classCode: localStorage.getItem('tizia:classCode') || undefined,
        score, correct, total, durationMs,
        details: JSON.stringify({
          kind: 'gmp-factory-tour',
          stars,
          perRoom: Object.fromEntries(Object.keys(ROOMS).map(k => [
            k, state.answers[k].map((a, i) => ({ choice: a, correct: CHALLENGES[k][i].correct, ok: a === CHALLENGES[k][i].correct }))
          ])),
        }),
      }),
    });
  } catch (e) { console.warn('submit failed', e); }
}

document.getElementById('r-again').addEventListener('click', () => {
  Object.keys(state.answers).forEach(k => state.answers[k] = [-1,-1,-1]);
  state.challengeIdx = 0; state.startTime = performance.now();
  document.querySelectorAll('.map-cell').forEach(el => el.classList.remove('complete'));
  document.getElementById('result-modal').classList.remove('open');
  setRoom('D');
  updateProgress();
});
document.getElementById('r-home').addEventListener('click', () => location.href = '/index.html');

// ============================================================
// RAYCAST — click hotspots in 3D
// ============================================================
const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();
renderer.domElement.addEventListener('pointerdown', (e) => {
  const rect = renderer.domElement.getBoundingClientRect();
  pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
  pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
  raycaster.setFromCamera(pointer, camera);
  const hotspots = Object.values(ROOM_OBJECTS).map(o => o.hotspot);
  const hits = raycaster.intersectObjects(hotspots, false);
  if (hits.length > 0) {
    setRoom(hits[0].object.userData.room);
  }
});

// ============================================================
// ANIMATION LOOP
// ============================================================
let lastT = performance.now();
function render(t) {
  const dt = (t - lastT) / 1000;
  lastT = t;

  // V-mixer rotation
  const vmix = ROOM_GROUPS.C && ROOM_GROUPS.C.userData.vMixer;
  if (vmix) vmix.rotation.x += dt * 1.5;

  // Tablet punch bobbing
  const punch = ROOM_GROUPS.B && ROOM_GROUPS.B.userData.tabletPunch;
  if (punch) {
    punch.position.y = Math.abs(Math.sin(t * 0.006)) * 0.2;
  }

  // Coating pan rotation
  const pan = ROOM_GROUPS.B && ROOM_GROUPS.B.userData.coatingPan;
  if (pan) pan.rotation.y += dt * 0.8;

  // Vials sliding on conveyor
  const vials = ROOM_GROUPS.A && ROOM_GROUPS.A.userData.vials;
  if (vials) {
    vials.forEach((v, i) => {
      v.position.x += dt * 0.3;
      if (v.position.x > 1.5) v.position.x = -1.5;
    });
  }

  // Hotspot pulse
  Object.values(ROOM_OBJECTS).forEach((o, i) => {
    const s = 1 + Math.sin(t * 0.003 + i) * 0.08;
    o.hotspot.scale.set(s, 1, s);
  });

  // Camera lerp
  if (state.cameraLerpT < 1) {
    state.cameraLerpT = Math.min(1, state.cameraLerpT + dt * 1.4);
    // Ease-out cubic
    const e = 1 - Math.pow(1 - state.cameraLerpT, 3);
    camera.position.lerpVectors(state.cameraFrom.pos, state.cameraTo.pos, e);
    controls.target.lerpVectors(state.cameraFrom.target, state.cameraTo.target, e);
  }

  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(render);
}

// ============================================================
// RESIZE
// ============================================================
window.addEventListener('resize', () => {
  camera.aspect = innerWidth/innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight);
});

// ============================================================
// KEYBOARD NAV (WASD + arrows to switch rooms; 0 = overview)
// ============================================================
window.addEventListener('keydown', (e) => {
  if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
  const k = e.key.toLowerCase();
  if (k === '1') setRoom('D');
  else if (k === '2') setRoom('C');
  else if (k === '3') setRoom('B');
  else if (k === '4') setRoom('A');
  else if (k === '0') {
    state.cameraFrom.pos.copy(camera.position);
    state.cameraFrom.target.copy(controls.target);
    state.cameraTo.pos.copy(ROOM_VIEWS.ALL.pos);
    state.cameraTo.target.copy(ROOM_VIEWS.ALL.target);
    state.cameraLerpT = 0;
  } else if (k === 'arrowleft' || k === 'a') {
    if (state.challengeIdx > 0) { state.challengeIdx--; renderChallenge(); }
  } else if (k === 'arrowright' || k === 'd') {
    if (state.challengeIdx < 2) { state.challengeIdx++; renderChallenge(); }
  } else if (k === 'arrowup' || k === 'w') {
    // Cycle rooms: D→C→B→A→D
    const order = ['D', 'C', 'B', 'A'];
    const i = order.indexOf(state.currentRoom);
    setRoom(order[(i + 1) % 4]);
  } else if (k === 'arrowdown' || k === 's') {
    const order = ['D', 'C', 'B', 'A'];
    const i = order.indexOf(state.currentRoom);
    setRoom(order[(i + 3) % 4]);
  }
});

// ============================================================
// INIT
// ============================================================
setRoom('D', false);
updateProgress();
showToast('🏭 Click ô trên sơ đồ hoặc nhấn 1/2/3/4 để khám phá phòng', 'ok');

requestAnimationFrame(render);

// Debug hook for tutor demo
window.__gmp = {
  state,
  setRoom,
  answerAll: () => {
    Object.keys(CHALLENGES).forEach(room => {
      CHALLENGES[room].forEach((ch, i) => state.answers[room][i] = ch.correct);
    });
    updateProgress(); renderChallenge();
  },
};
