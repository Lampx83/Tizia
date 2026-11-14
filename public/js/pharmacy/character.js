// ── Nhân vật người thật điều khiển được (Ready Player Me + skeletal anim) ──────
// Avatar RPM (cùng bộ xương với thư viện animation RPM → clip áp thẳng, KHÔNG
// cần retarget). Hỗ trợ: click-để-đi trên sàn + WASD, xoay mặt theo hướng đi,
// idle ⇄ walk ⇄ jog cross-fade, camera bám lưng (giữ orbit/zoom của người dùng),
// va chạm AABB với quầy/tủ/tủ lạnh, prompt tương tác khi lại gần, "cầm nắm" hộp
// thuốc gắn vào xương bàn tay phải. Tải asset từ ./models/pharmacy/avatar/.
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const AVATAR_BASE = './models/pharmacy/avatar/';
const _loader = new GLTFLoader();
function loadGLB(url) {
  return new Promise((res, rej) => _loader.load(url, res, undefined, rej));
}

const CLIP_FILES = {
  idle:    'anim/idle.glb',
  walk:    'anim/walk.glb',
  jog:     'anim/jog.glb',
  gesture: 'anim/gesture.glb'
};

// RPM TPose quay mặt về +Z ở rotation.y = 0. Nếu sau kiểm tra trực quan thấy
// nhân vật đi lùi, đổi hằng số này thành Math.PI.
const MODEL_YAW_OFFSET = 0;

export async function createCharacter(ctx) {
  const {
    scene, camera, controls, canvas,
    colliders = [], bounds = null,
    spawn = { x: 0, z: 3.0, heading: Math.PI },
    avatarUrl = null,
    interactables = [],
    onPrompt = null
  } = ctx;

  // 1. Nạp avatar: ưu tiên URL RPM tuỳ biến (đẹp) → fallback TPose local (offline).
  let gltf = null;
  if (avatarUrl) {
    try { gltf = await loadGLB(avatarUrl); }
    catch (e) { console.warn('[character] avatar tuỳ biến lỗi, dùng local:', e); }
  }
  if (!gltf) gltf = await loadGLB(AVATAR_BASE + 'Masculine_TPose.glb');

  const model = gltf.scene;
  model.traverse(o => {
    if (o.isMesh) { o.castShadow = true; o.receiveShadow = true; o.frustumCulled = false; }
  });

  // ── Diện mạo: tô lại texture atlas để đổi TÔNG DA + MÀU ÁO (tạo nhiều loại
  // bệnh nhân). Da nhận diện theo tông màu ấm (robust cả nam/nữ); áo ở vùng
  // dưới-trái atlas. Giữ ảnh gốc để tô lại không bị chồng màu.
  let _skinMat = null, _baseImg = null;
  model.traverse(o => { if (o.isMesh && o.material && o.material.map && !_skinMat) _skinMat = o.material; });
  // m = nhân (làm tối), l = kéo về trắng (làm sáng). Index 0 = mặc định.
  const SKIN_TONES = [
    { m: [1, 1, 1], l: 0 },                 // 0 mặc định
    { m: [1.0, 0.99, 0.97], l: 0.18 },      // 1 sáng
    { m: [1.0, 0.97, 0.94], l: 0.34 },      // 2 rất sáng (hồng nhạt)
    { m: [0.85, 0.70, 0.58], l: 0 },        // 3 ngăm
    { m: [0.66, 0.48, 0.38], l: 0 },        // 4 nâu
    { m: [0.48, 0.34, 0.26], l: 0 }         // 5 đậm
  ];
  let _skinTone = Math.max(0, Math.min(SKIN_TONES.length - 1, ctx.skinTone || 0));
  let _shirtHex = ctx.shirtColor || null;            // null = giữ áo gốc
  let _condition = ctx.condition || 'none';          // bệnh lý ngoài da: none|rash|hives|jaundice|pallor|flush|bruise|cyanosis
  let _hairColor = ctx.hairColor || null;            // null=giữ gốc; 'gray'|'brown'|'blonde'|'black'
  const HAIR_COLORS = { gray: [200, 197, 193], brown: [92, 56, 34], blonde: [201, 164, 96], black: [28, 24, 22] };
  const SHIRT_RECT = { x0: 0.0, x1: 0.50, y0: 0.50, y1: 1.0 };
  function _hexToHsl(hex) {
    const m = /^#?([0-9a-f]{6})$/i.exec(hex || ''); if (!m) return null;
    const n = parseInt(m[1], 16); const r = (n >> 16 & 255) / 255, g = (n >> 8 & 255) / 255, b = (n & 255) / 255;
    const mx = Math.max(r, g, b), mn = Math.min(r, g, b); let hh = 0, s = 0; const l = (mx + mn) / 2;
    if (mx !== mn) { const dd = mx - mn; s = l > 0.5 ? dd / (2 - mx - mn) : dd / (mx + mn);
      hh = mx === r ? (g - b) / dd + (g < b ? 6 : 0) : mx === g ? (b - r) / dd + 2 : (r - g) / dd + 4; hh /= 6; }
    return { h: hh, s, l };
  }
  function _hslToRgb(h, s, l) {
    if (s === 0) { const v = l * 255; return [v, v, v]; }
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s; const p = 2 * l - q;
    const f = (t) => { if (t < 0) t += 1; if (t > 1) t -= 1; if (t < 1 / 6) return p + (q - p) * 6 * t; if (t < 1 / 2) return q; if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6; return p; };
    return [f(h + 1 / 3) * 255, f(h) * 255, f(h - 1 / 3) * 255];
  }
  // Lấy mẫu màu nền áo (vùng dưới, tránh logo ở ngực) để tô phẳng → xoá chữ.
  function _sampleShirt(d, w, H) {
    let r = 0, g = 0, b = 0, n = 0;
    const x0 = (0.05 * w) | 0, x1 = (0.45 * w) | 0, y0 = (0.83 * H) | 0, y1 = (0.97 * H) | 0;
    for (let y = y0; y < y1; y += 2) for (let x = x0; x < x1; x += 2) { const i = (y * w + x) << 2; r += d[i]; g += d[i + 1]; b += d[i + 2]; n++; }
    if (!n) return null;
    const hex = '#' + [r / n, g / n, b / n].map(v => Math.round(v).toString(16).padStart(2, '0')).join('');
    return _hexToHsl(hex);
  }
  // Vùng DA HỞ để hiện nốt bệnh (mề đay/bầm/mẩn): mặt (trên-trái) + bàn tay
  // (dưới-phải atlas). KHÔNG lên cánh tay/tóc. (tune trực quan)
  function _inCondRegion(x, y, w, H) {
    const u = x / w, v = y / H;
    return (u < 0.42 && v < 0.42) || (u > 0.66 && v > 0.34 && v < 0.72);
  }
  // Vẽ bệnh lý ngoài da lên 1 pixel da → trả [r,g,b]. spotOk=true → được phép hiện
  // NỐT (mề đay/bầm/mẩn) ở pixel này (đã giới hạn vùng mặt+tay + đủ sáng).
  function _applyCondition(cond, x, y, r, g, b, spotOk) {
    if (cond === 'jaundice') {            // vàng da (toàn da)
      r = Math.min(255, r * 1.02 + 16); g = Math.min(255, g + 10); b = b * 0.6;
    } else if (cond === 'pallor') {       // xanh xao / nhợt nhạt (toàn da)
      const lum = (r + g + b) / 3;
      r = Math.min(255, r * 0.55 + lum * 0.45 + 14); g = Math.min(255, g * 0.55 + lum * 0.45 + 20); b = Math.min(255, b * 0.55 + lum * 0.45 + 28);
    } else if (cond === 'flush') {        // đỏ bừng (sốt — toàn da)
      r = Math.min(255, r + 42); g = g * 0.9; b = b * 0.86;
    } else if (cond === 'cyanosis') {     // tím tái (xanh tím toàn da — thiếu oxy)
      r = r * 0.76; g = g * 0.82; b = Math.min(255, b * 0.95 + 24);
    } else if (spotOk && (cond === 'rash' || cond === 'hives')) {  // mẩn đỏ / mề đay — chỉ mặt+tay, thưa
      const sh = cond === 'hives' ? 3 : 1;
      const hsh = ((((x >> sh) * 73856093) ^ ((y >> sh) * 19349663)) >>> 0) % 100;
      if (hsh < (cond === 'hives' ? 8 : 11)) {
        r = Math.min(255, r + (cond === 'hives' ? 84 : 58)); g = g * 0.72; b = b * 0.7;
      }
    } else if (spotOk && cond === 'bruise') {       // bầm tím — chỉ mặt+tay, thưa
      const hsh = ((((x >> 2) * 73856093) ^ ((y >> 2) * 19349663)) >>> 0) % 100;
      if (hsh < 7) { r = r * 0.6 + 26; g = g * 0.5 + 16; b = Math.min(255, b * 0.72 + 58); }
    }
    return [r, g, b];
  }
  function applyAppearance() {
    if (!_skinMat || !_skinMat.map) return;
    if (!_baseImg) _baseImg = _skinMat.map.image;
    const img = _baseImg; if (!img || !img.width) return;
    const w = img.width, H = img.height;
    const cv = document.createElement('canvas'); cv.width = w; cv.height = H;
    const cx = cv.getContext('2d'); cx.drawImage(img, 0, 0);
    const idata = cx.getImageData(0, 0, w, H); const d = idata.data;
    const skin = SKIN_TONES[_skinTone]; const skinOn = _skinTone > 0;
    const condOn = _condition && _condition !== 'none';
    const hair = (_hairColor && HAIR_COLORS[_hairColor]) || null;   // tô tóc
    const hairX = 0.52 * w, hairY = 0.5 * H;                        // vùng đầu (trên-trái)
    const shirt = _shirtHex ? _hexToHsl(_shirtHex) : _sampleShirt(d, w, H);
    const sx0 = SHIRT_RECT.x0 * w, sx1 = SHIRT_RECT.x1 * w, sy0 = SHIRT_RECT.y0 * H, sy1 = SHIRT_RECT.y1 * H;
    for (let y = 0; y < H; y++) {
      const inShirtRow = shirt && y >= sy0 && y < sy1;
      for (let x = 0; x < w; x++) {
        const i = (y * w + x) << 2;
        let r = d[i], g = d[i + 1], b = d[i + 2];
        if (skinOn || condOn || hair) {
          const mx = Math.max(r, g, b), mn = Math.min(r, g, b); const sat = mx === 0 ? 0 : (mx - mn) / mx;
          if (r > g && g >= b && sat > 0.12 && sat < 0.8 && mx > 55) {   // pixel da
            if (skinOn) {
              r *= skin.m[0]; g *= skin.m[1]; b *= skin.m[2];
              if (skin.l) { r += (255 - r) * skin.l; g += (255 - g) * skin.l; b += (255 - b) * skin.l; }
            }
            if (condOn && mx > 90) {   // mx>90: chỉ da sáng → loại tóc/bóng tối
              const spotOk = _inCondRegion(x, y, w, H);
              const c = _applyCondition(_condition, x, y, r, g, b, spotOk); r = c[0]; g = c[1]; b = c[2];
            }
          } else if (hair && x < hairX && y < hairY) {
            // pixel tóc = tối + KHÔNG phải da, ở vùng đầu → tô màu tóc giữ chút biến thiên.
            const lum = (r + g + b) / 3;
            if (lum < 78) { const k = 0.45 + lum / 130; r = hair[0] * k; g = hair[1] * k; b = hair[2] * k; }
          }
        }
        if (inShirtRow && x >= sx0 && x < sx1) {
          const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
          // Tô PHẲNG quanh độ sáng của màu áo (biến thiên rất nhỏ) → chữ logo biến mất.
          const L = Math.min(0.97, Math.max(0.06, shirt.l));   // phẳng tuyệt đối → xoá sạch logo
          const rgb = _hslToRgb(shirt.h, shirt.s, L); r = rgb[0]; g = rgb[1]; b = rgb[2];
        }
        d[i] = r; d[i + 1] = g; d[i + 2] = b;
      }
    }
    cx.putImageData(idata, 0, 0);
    const old = _skinMat.map;
    const tex = new THREE.CanvasTexture(cv);
    tex.flipY = old.flipY; tex.colorSpace = old.colorSpace; tex.wrapS = old.wrapS; tex.wrapT = old.wrapT;
    _skinMat.map = tex; _skinMat.needsUpdate = true;
  }

  // Chuẩn hoá chiều cao về ~1.7m + đặt chân chạm sàn y=0.
  let box = new THREE.Box3().setFromObject(model);
  const h = box.max.y - box.min.y;
  if (h > 0.1 && (h < 1.2 || h > 2.4)) {
    const s = 1.7 / h; model.scale.setScalar(s);
    box = new THREE.Box3().setFromObject(model);
  }
  model.position.y -= box.min.y;
  applyAppearance();   // luôn chạy: tối thiểu để xoá logo "Ready Player Me" trên áo

  const root = new THREE.Group();
  root.add(model);
  root.position.set(spawn.x, 0, spawn.z);
  let heading = spawn.heading ?? Math.PI;
  root.rotation.y = heading;
  // Chiều cao/vóc dáng: scale đều quanh gốc chân (chân vẫn chạm sàn).
  let heightScale = Math.max(0.8, Math.min(1.25, ctx.heightScale || 1));
  root.scale.setScalar(heightScale);
  scene.add(root);

  // 2. Nạp các clip animation (anim-only, cùng tên xương với avatar).
  const clips = {};
  await Promise.all(Object.entries(CLIP_FILES).map(async ([k, url]) => {
    try { const g = await loadGLB(AVATAR_BASE + url); clips[k] = g.animations[0]; }
    catch (e) { console.warn('[character] clip lỗi', k, e); }
  }));

  // 3. Mixer + actions. idle/walk/jog blend bằng weight; gesture chạy 1 lần.
  const mixer = new THREE.AnimationMixer(model);
  const actions = {};
  for (const [k, clip] of Object.entries(clips)) {
    if (!clip) continue;
    const a = mixer.clipAction(clip);
    a.enabled = true; a.play();
    a.setEffectiveWeight(k === 'idle' ? 1 : 0);
    if (k === 'gesture') { a.setLoop(THREE.LoopOnce, 1); a.clampWhenFinished = true; }
    actions[k] = a;
  }
  const wTarget = { idle: 1, walk: 0, jog: 0, gesture: 0 };

  // Xương bàn tay phải → gắn hộp thuốc khi "cầm nắm".
  const rightHand = model.getObjectByName('RightHand') || model.getObjectByName('mixamorigRightHand');
  let carried = null;

  // ── Tư thế thủ công (procedural): ngồi + vươn tay — KHÔNG cần clip Mixamo ────
  // Sau mixer.update(), slerp quaternion vài xương từ pose-animation về pose-đích
  // theo trọng số (0=giữ anim, 1=ngồi/với hẳn). Tên xương RPM = Mixamo bỏ tiền tố.
  const _bn = (n) => model.getObjectByName(n) || model.getObjectByName('mixamorig' + n);
  const bones = {
    hips: _bn('Hips'), spine: _bn('Spine'), spine1: _bn('Spine1'), spine2: _bn('Spine2'),
    neck: _bn('Neck'), head: _bn('Head'),
    upLegL: _bn('LeftUpLeg'), upLegR: _bn('RightUpLeg'),
    legL: _bn('LeftLeg'), legR: _bn('RightLeg'),
    footL: _bn('LeftFoot'), footR: _bn('RightFoot'),
    armR: _bn('RightArm'), foreR: _bn('RightForeArm'),
    armL: _bn('LeftArm'), foreL: _bn('LeftForeArm')
  };
  const _qeuler = (x, y, z) => new THREE.Quaternion().setFromEuler(new THREE.Euler(x, y, z));
  // Hằng tư thế — tinh chỉnh trực quan. SIT.drop = hạ hông xuống mặt ghế.
  const SIT = {
    upLeg: _qeuler(-1.45, 0, 0),   // đùi gập ra trước (ngang) — tuned trực quan
    leg: _qeuler(-1.95, 0, 0),     // gập gối sâu → cẳng chân thẳng xuống dưới gối
    foot: _qeuler(0.35, 0, 0),     // bàn chân phẳng trên sàn
    spine: _qeuler(0.12, 0, 0),
    drop: 0.66                     // hạ hông xuống mặt ghế đẩu, bàn chân chạm sàn
  };
  const REACH = {
    arm: _qeuler(0, -1.25, -0.5),  // cánh tay phải đưa ra trước (xoay quanh trục đứng)
    fore: _qeuler(0, -0.2, 0)
  };
  // Biểu cảm qua TƯ THẾ (avatar không có morph mặt). Mỗi state = góc xương đắp lên
  // tư thế đứng. Tinh chỉnh trực quan như SIT.
  const EXPR = {
    // Đau bụng: gập người + cúi đầu + MỘT tay phải ôm bụng (tay trái buông tự nhiên).
    pain: {
      spine: _qeuler(0.34, 0, 0), spine1: _qeuler(0.22, 0, 0), spine2: _qeuler(0.10, 0, 0),
      neck: _qeuler(0.30, 0, 0), head: _qeuler(0.18, 0, 0),
      armR: _qeuler(0, -0.42, -1.05), foreR: _qeuler(0, 0, -2.15)    // 1 tay phải co ôm bụng
    },
    // Lo lắng: hơi cúi + nghiêng đầu nhẹ
    worried: {
      spine: _qeuler(0.10, 0, 0), neck: _qeuler(0.22, 0, 0.10), head: _qeuler(0.14, 0, 0.12)
    },
    // Đau răng + sốt ruột (OTC-02, yêu cầu #117): tay phải đưa lên ôm má, đầu nghiêng
    // về phía tay, thân hơi vặn. Nhịp "sống" bên dưới cho lắc nhanh → ra vẻ bồn chồn.
    annoyed: {
      spine: _qeuler(0.06, 0, -0.05), neck: _qeuler(0.12, 0, -0.14), head: _qeuler(0.04, 0, -0.18),
      armR: _qeuler(0.35, -0.35, -2.15), foreR: _qeuler(0, 0, -2.35)   // tinh chỉnh trực quan 29/07
    }
  };
  function poseSlerp(bone, targetQuat, w) { if (bone) bone.quaternion.slerp(targetQuat, w); }
  const _qadd = new THREE.Quaternion();
  function poseAdd(bone, x, y, z) { if (bone) { _qadd.setFromEuler(new THREE.Euler(x, y, z)); bone.quaternion.multiply(_qadd); } }
  let _t = 0;   // đồng hồ cho chuyển động "sống" (thở/lắc nhẹ)

  // Ghế đẩu hiện ra dưới mông khi ngồi (để không lơ lửng). Cylinder cao SEAT_H,
  // tự đặt dưới nhân vật + lùi nhẹ về phía sau lưng. Không dịch chuyển nhân vật.
  let SEAT_H = 0.38;
  const stool = new THREE.Mesh(
    new THREE.CylinderGeometry(0.19, 0.205, 1, 24),
    new THREE.MeshStandardMaterial({ color: 0x3b82a6, roughness: 0.7, metalness: 0.05 })
  );
  stool.castShadow = true; stool.receiveShadow = true; stool.visible = false;
  scene.add(stool);

  // ── Trạng thái điều khiển ──────────────────────────────────────────────────
  const pos = root.position;
  let moveTarget = null;
  let enabled = false;
  let gesturing = false;
  let sitting = false, sitW = 0;       // ngồi: cờ + trọng số ease
  let reaching = false, reachW = 0, reachTimer = 0;  // vươn tay
  let _expr = (ctx.expression && ctx.expression !== 'none') ? ctx.expression : null, exprW = 0;  // biểu cảm/tư thế
  let nearInteractable = null;
  const keys = { w: false, a: false, s: false, d: false, shift: false };
  const RADIUS = 0.30, WALK_SPD = 1.35, JOG_SPD = 2.7, TURN_RATE = 9;
  const prevPos = pos.clone();

  // ── Raycast sàn cho click-để-đi ────────────────────────────────────────────
  const ray = new THREE.Raycaster();
  const ndc = new THREE.Vector2();
  const floorPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
  const hitPt = new THREE.Vector3();
  function screenToFloor(ev) {
    const r = canvas.getBoundingClientRect();
    ndc.x = ((ev.clientX - r.left) / r.width) * 2 - 1;
    ndc.y = -((ev.clientY - r.top) / r.height) * 2 + 1;
    ray.setFromCamera(ndc, camera);
    return ray.ray.intersectPlane(floorPlane, hitPt) ? hitPt.clone() : null;
  }

  // ── Va chạm: chặn nếu lọt vào AABB (đã nới theo bán kính) ──────────────────
  function blocked(x, z) {
    if (bounds && (x < bounds.minX || x > bounds.maxX || z < bounds.minZ || z > bounds.maxZ)) return true;
    for (const c of colliders) {
      if (x > c.minX - RADIUS && x < c.maxX + RADIUS && z > c.minZ - RADIUS && z < c.maxZ + RADIUS) return true;
    }
    return false;
  }
  function tryMove(dx, dz) {
    // Tách trục để trượt dọc tường thay vì kẹt cứng.
    if (!blocked(pos.x + dx, pos.z)) pos.x += dx;
    if (!blocked(pos.x, pos.z + dz)) pos.z += dz;
  }

  // ── Vươn tay + cầm nắm + ngồi ──────────────────────────────────────────────
  function triggerReach() {            // vươn tay phải ra ~1s rồi thu về
    reaching = true; reachTimer = 1.1;
  }
  function toggleSit() {               // ngồi xuống / đứng dậy
    sitting = !sitting;
    if (sitting) { moveTarget = null; keys.w = keys.a = keys.s = keys.d = false; }
    return sitting;
  }
  function toggleCarry() {
    if (!rightHand) return false;
    if (carried) { rightHand.remove(carried); carried.geometry.dispose(); carried.material.dispose(); carried = null; return false; }
    const g = new THREE.BoxGeometry(0.062, 0.105, 0.038);
    const m = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.55, metalness: 0.05 });
    const boxMesh = new THREE.Mesh(g, m);
    boxMesh.castShadow = true;
    boxMesh.position.set(0, -0.02, 0.05);
    boxMesh.rotation.set(0.35, 0, 0);
    // Dải màu giữa hộp cho giống vỉ/hộp thuốc.
    const band = new THREE.Mesh(
      new THREE.BoxGeometry(0.064, 0.026, 0.04),
      new THREE.MeshStandardMaterial({ color: 0x2563eb, roughness: 0.5 }));
    band.position.y = 0.012; boxMesh.add(band);
    rightHand.add(boxMesh); carried = boxMesh; return true;
  }

  // ── Input (chỉ tác dụng khi enabled) ───────────────────────────────────────
  function inTextField() {
    const a = document.activeElement;
    return a && (a.tagName === 'INPUT' || a.tagName === 'TEXTAREA' || a.isContentEditable);
  }
  function onKeyDown(e) {
    if (!enabled || inTextField()) return;
    const k = e.key.toLowerCase();
    if (k === 'w' || k === 'arrowup') keys.w = true;
    else if (k === 's' || k === 'arrowdown') keys.s = true;
    else if (k === 'a' || k === 'arrowleft') keys.a = true;
    else if (k === 'd' || k === 'arrowright') keys.d = true;
    else if (k === 'shift') { keys.shift = true; return; }
    else if (k === 'e') {
      triggerReach();
      if (nearInteractable?.onActivate) nearInteractable.onActivate(); else toggleCarry();
      e.preventDefault(); return;
    } else if (k === 'f') {
      toggleSit();
      e.preventDefault(); return;
    } else return;
    if (sitting) toggleSit();   // bấm phím đi → tự đứng dậy
    moveTarget = null;          // bấm phím → huỷ đích click
    e.preventDefault();
  }
  function onKeyUp(e) {
    const k = e.key.toLowerCase();
    if (k === 'w' || k === 'arrowup') keys.w = false;
    else if (k === 's' || k === 'arrowdown') keys.s = false;
    else if (k === 'a' || k === 'arrowleft') keys.a = false;
    else if (k === 'd' || k === 'arrowright') keys.d = false;
    else if (k === 'shift') keys.shift = false;
  }
  function onCanvasClick(e) {
    if (!enabled) return;
    const p = screenToFloor(e);
    if (p) { if (sitting) toggleSit(); moveTarget = p; }
  }
  window.addEventListener('keydown', onKeyDown);
  window.addEventListener('keyup', onKeyUp);
  canvas.addEventListener('click', onCanvasClick);

  // ── Bật/tắt chế độ đi dạo ──────────────────────────────────────────────────
  function setEnabled(on) {
    enabled = on;
    if (on) {
      prevPos.copy(pos);
      const fwd = new THREE.Vector3(Math.sin(heading), 0, Math.cos(heading));
      camera.position.copy(pos.clone().addScaledVector(fwd, -3.0)).setY(1.85);
      controls.target.copy(pos.clone().setY(1.35));
      controls.minDistance = 1.2; controls.maxDistance = 9;
    }
    onPrompt?.(null);
  }

  // ── Update mỗi frame ───────────────────────────────────────────────────────
  const _fwd = new THREE.Vector3(), _right = new THREE.Vector3(), _dir = new THREE.Vector3(), _up = new THREE.Vector3(0, 1, 0), _seatTmp = new THREE.Vector3();
  function update(dt) {
    mixer.update(dt);
    let vx = 0, vz = 0;
    if (enabled && !gesturing && !sitting) {
      if (keys.w || keys.a || keys.s || keys.d) {
        camera.getWorldDirection(_fwd); _fwd.y = 0; _fwd.normalize();
        _right.crossVectors(_fwd, _up).normalize();
        _dir.set(0, 0, 0);
        if (keys.w) _dir.add(_fwd);
        if (keys.s) _dir.sub(_fwd);
        if (keys.d) _dir.add(_right);
        if (keys.a) _dir.sub(_right);
        if (_dir.lengthSq() > 1e-6) { _dir.normalize(); const sp = keys.shift ? JOG_SPD : WALK_SPD; vx = _dir.x * sp; vz = _dir.z * sp; }
      } else if (moveTarget) {
        const dx = moveTarget.x - pos.x, dz = moveTarget.z - pos.z, d = Math.hypot(dx, dz);
        if (d > 0.10) { vx = dx / d * WALK_SPD; vz = dz / d * WALK_SPD; } else moveTarget = null;
      }
    }
    const speed = Math.hypot(vx, vz);
    if (speed > 0.001) {
      tryMove(vx * dt, vz * dt);
      const want = Math.atan2(vx, vz) + MODEL_YAW_OFFSET;
      let diff = want - heading;
      while (diff > Math.PI) diff -= 2 * Math.PI;
      while (diff < -Math.PI) diff += 2 * Math.PI;
      heading += diff * Math.min(1, TURN_RATE * dt);
      root.rotation.y = heading;
    }

    // Trộn weight locomotion.
    const jogging = speed > WALK_SPD + 0.4;
    wTarget.idle = (speed < 0.05 && !gesturing) ? 1 : 0;
    wTarget.walk = (speed >= 0.05 && !jogging && !gesturing) ? 1 : 0;
    wTarget.jog = (jogging && !gesturing) ? 1 : 0;
    wTarget.gesture = gesturing ? 1 : 0;
    for (const k of ['idle', 'walk', 'jog', 'gesture']) {
      const a = actions[k]; if (!a) continue;
      const cur = a.getEffectiveWeight();
      a.setEffectiveWeight(cur + (wTarget[k] - cur) * Math.min(1, 12 * dt));
    }

    // Tư thế thủ công override SAU khi mixer đã set pose-animation lên xương.
    sitW += ((sitting ? 1 : 0) - sitW) * Math.min(1, 8 * dt);
    if (reaching) { reachTimer -= dt; if (reachTimer <= 0) reaching = false; }
    reachW += ((reaching ? 1 : 0) - reachW) * Math.min(1, 9 * dt);
    if (sitW > 0.002) {
      poseSlerp(bones.upLegL, SIT.upLeg, sitW); poseSlerp(bones.upLegR, SIT.upLeg, sitW);
      poseSlerp(bones.legL, SIT.leg, sitW); poseSlerp(bones.legR, SIT.leg, sitW);
      poseSlerp(bones.footL, SIT.foot, sitW); poseSlerp(bones.footR, SIT.foot, sitW);
      poseSlerp(bones.spine, SIT.spine, sitW);
    }
    root.position.y = -SIT.drop * sitW;
    // Ghế dưới mông: hiện khi ngồi, đặt lùi nhẹ về sau lưng, cao SEAT_H chạm sàn.
    if (sitting || sitW > 0.02) {
      const bx = Math.sin(heading), bz = Math.cos(heading); // hướng trước mặt
      // Tự canh cao ghế theo xương hông (robust mọi avatar) — mặt ghế ngay dưới mông.
      const hipY = bones.hips ? bones.hips.getWorldPosition(_seatTmp).y : 0.4;
      const seatTop = Math.max(0.14, hipY - 0.07 + SEAT_H - 0.38);
      stool.scale.y = seatTop;
      stool.position.set(pos.x - bx * 0.10, seatTop / 2, pos.z - bz * 0.10);
      stool.rotation.y = heading;
      stool.visible = true;
    } else {
      stool.visible = false;
    }
    if (reachW > 0.002) {
      poseSlerp(bones.armR, REACH.arm, reachW);
      poseSlerp(bones.foreR, REACH.fore, reachW);
    }
    // Biểu cảm/tư thế (đau, lo lắng) — đắp lên thân trên khi đứng (không ngồi).
    exprW += (((_expr && !sitting) ? 1 : 0) - exprW) * Math.min(1, 7 * dt);
    if (exprW > 0.002 && _expr && EXPR[_expr]) {
      const e = EXPR[_expr];
      for (const k in e) poseSlerp(bones[k], e[k], exprW);
    }

    // Chuyển động "sống" — thở + lắc nhẹ, KHÁC nhau theo trạng thái (đắp delta nhỏ
    // mỗi frame lên xương; gốc đã reset bởi mixer/pose nên không cộng dồn).
    _t += dt;
    let amp = 0.013, freq = 1.25, hd = 0.012, swy = 0.012;        // bình thường: nhẹ, đều
    if (_expr === 'pain') { amp = 0.024; freq = 0.85; hd = 0.018; swy = 0.014; }      // thở chậm, nặng nhọc
    else if (_expr === 'worried') { amp = 0.012; freq = 1.9; hd = 0.030; swy = 0.024; } // bồn chồn, đầu động nhiều
    else if (_expr === 'annoyed') { amp = 0.016; freq = 2.3; hd = 0.026; swy = 0.032; } // sốt ruột: lắc nhanh, đảo người
    const breathe = Math.sin(_t * freq), slow = Math.sin(_t * freq * 0.45 + 0.6);
    poseAdd(bones.spine1 || bones.spine, breathe * amp, 0, slow * swy * 0.4);
    poseAdd(bones.spine2, breathe * amp * 0.6, 0, 0);
    poseAdd(bones.head, breathe * hd * 0.4 + slow * hd, slow * swy * 0.8, 0);
    poseAdd(bones.hips, 0, 0, slow * swy * 0.5);

    // Camera bám: dịch camera + target đúng bằng delta nhân vật (giữ orbit/zoom),
    // rồi kéo nhẹ target về ngực nhân vật cho mượt.
    if (enabled) {
      const ddx = pos.x - prevPos.x, ddy = pos.y - prevPos.y, ddz = pos.z - prevPos.z;
      camera.position.x += ddx; camera.position.y += ddy; camera.position.z += ddz;
      controls.target.x += ddx; controls.target.y += ddy; controls.target.z += ddz;
      controls.target.lerp(new THREE.Vector3(pos.x, 1.35, pos.z), 0.06);

      if (interactables.length) {
        let best = null, bd = Infinity;
        for (const it of interactables) { const d = pos.distanceTo(it.pos); if (d < bd) { bd = d; best = it; } }
        nearInteractable = (best && bd < 1.4) ? best : null;
        onPrompt?.(nearInteractable ? `Nhấn E — ${nearInteractable.label}` : null);
      }
    }
    prevPos.copy(pos);
  }

  function dispose() {
    window.removeEventListener('keydown', onKeyDown);
    window.removeEventListener('keyup', onKeyUp);
    canvas.removeEventListener('click', onCanvasClick);
    scene.remove(root);
  }

  return {
    root, update, setEnabled, dispose,
    isEnabled: () => enabled,
    toggleCarry, triggerReach, toggleSit,
    isSitting: () => sitting,
    setMoveTarget: (p) => { moveTarget = p; },
    setHeightScale: (s) => { heightScale = Math.max(0.8, Math.min(1.25, s)); root.scale.setScalar(heightScale); },
    getHeightScale: () => heightScale,
    setSkinTone: (t) => { _skinTone = Math.max(0, Math.min(SKIN_TONES.length - 1, t | 0)); applyAppearance(); },
    setShirtColor: (hex) => { _shirtHex = hex || null; applyAppearance(); },
    setSkinCondition: (c) => { _condition = c || 'none'; applyAppearance(); },
    getSkinCondition: () => _condition,
    setHairColor: (h) => { _hairColor = h || null; applyAppearance(); },
    getHairColor: () => _hairColor,
    setExpression: (e) => { _expr = (e && e !== 'none') ? e : null; },
    getExpression: () => _expr || 'none',
    _setExprPose: (state, key, x, y, z) => { if (EXPR[state]) EXPR[state][key] = _qeuler(x, y, z); },
    getSkinTone: () => _skinTone,
    getShirtColor: () => _shirtHex,
    _setShirtRect: (x0, x1, y0, y1) => { SHIRT_RECT.x0 = x0; SHIRT_RECT.x1 = x1; SHIRT_RECT.y0 = y0; SHIRT_RECT.y1 = y1; applyAppearance(); },
    // Tinh chỉnh trực quan: đổi góc khớp ngồi/vươn rồi xem ngay.
    _setPose: (group, key, x, y, z) => { (group === 'reach' ? REACH : SIT)[key] = _qeuler(x, y, z); },
    _setDrop: (d) => { SIT.drop = d; },
    _setSeat: (h) => { SEAT_H = h; }
  };
}
