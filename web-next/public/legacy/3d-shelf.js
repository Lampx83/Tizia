// Wrap-mount cho trang Next /3d-shelf.
// Tái sử dụng NGUYÊN VĂN logic của inline <script type="module"> trong
// public/3d-shelf.html — không đổi hành vi (Three.js kệ thuốc 3D + WebXR/VR,
// OrbitControls, pinch-drag qua MediaPipe HandLandmarker, VR-Preview, chấm điểm,
// submit /api/attempts). Giữ text tiếng Việt gốc.
//
// Khác biệt DUY NHẤT so với bản gốc:
//  - Các import bare specifier `three` / `three/addons/` VẪN dựa vào importmap;
//    importmap được inject bởi Mount ('use client') TRƯỚC khi nạp file này.
//  - Đường dẫn tương đối `./js/*`, `./vendor/*`, `./models/*` được đổi thành
//    root-absolute `/js/*`, `/vendor/*`, `/models/*` vì file này serve ở /legacy/
//    (proxy Next fallback sang Express giữ nguyên asset). KHÔNG copy asset.
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { VRButton } from 'three/addons/webxr/VRButton.js';
import { XRControllerModelFactory } from 'three/addons/webxr/XRControllerModelFactory.js';
import { submitAttempt } from '/js/api.js';
import { pickRoundMedicines, getDifficulty } from '/js/medicines.js';
import { sfx } from '/js/sfx.js';
import { XRHandModelFactory } from 'three/addons/webxr/XRHandModelFactory.js';
import { showWelcomeCard } from '/js/welcome-card.js';

showWelcomeCard({
  icon: '🥽',
  title: 'Phòng dược 3D — Hướng dẫn',
  intro: 'Mô phỏng kệ thuốc thật bằng Three.js, hỗ trợ pinch tay & VR.',
  bullets: [
    'Pinch ngón cái + trỏ (hoặc click) vào thùng carton để mở.',
    'Cầm từng hộp thuốc và kéo lên kệ — ô đúng nhóm sẽ glow xanh.',
    'Sai ô sẽ glow đỏ. Nhả ra gần ô đúng để snap.',
    'Bấm "Nộp bài" để lưu điểm, "Làm lại" để chơi lại.',
  ],
  controls: { keys: ['W','A','S','D'], mouse: 'left', extras: [
    { key: 'V', desc: 'vào chế độ VR-Preview (đi quanh phòng)' },
    { key: '🥽', desc: 'ENTER VR nếu có kính (góc dưới)' },
  ] },
  tip: 'Di chuột để xoay · cuộn để zoom · pinch hoặc click trên thùng để mở.',
  persistKey: 'tizia:welcome:3d-shelf',
  dismissLabel: 'Bắt đầu xếp thuốc',
});

const sessionStartedAt = Date.now();
const ROUND_DIFFICULTY = getDifficulty();
const ROUND_MEDICINES = pickRoundMedicines(ROUND_DIFFICULTY.count);
const ROUND_N = ROUND_MEDICINES.length;

// ============================================================
// COLORS — sampled from the photo
// ============================================================
const G_MAIN   = '#1f8a3a';   // primary green
const G_DARK   = '#125a25';   // dark green (leaf veins, text accents)
const G_LIGHT  = '#3aa658';   // lighter green (highlights)
const G_DEEP   = '#0e4a1d';   // deepest green for outlines
const TEXT_DARK = '#222';
const TEXT_BODY = '#333';
const CARTON   = '#ffffff';

// ============================================================
// Wavy band (top or bottom) — characteristic curve of the box
// ============================================================
function wavyBand(ctx, w, yTop, h, flip = false) {
  // flip=false: solid block at top, wavy edge at the bottom
  // flip=true: solid block at bottom (yTop is band-top), wavy edge at top
  ctx.fillStyle = G_MAIN;
  ctx.beginPath();
  if (!flip) {
    ctx.moveTo(0, yTop);
    ctx.lineTo(w, yTop);
    ctx.lineTo(w, yTop + h - 8);
    // wave going right-to-left across the bottom
    const segs = 5;
    for (let i = segs; i >= 0; i--) {
      const x  = (w / segs) * i;
      const cx = (w / segs) * (i + 0.5);
      const cy = yTop + h + (i % 2 === 0 ? 14 : -14);
      ctx.quadraticCurveTo(cx, cy, x, yTop + h - 8);
    }
    ctx.lineTo(0, yTop + h - 8);
  } else {
    // wavy top edge, flat bottom
    ctx.moveTo(0, yTop + 8);
    const segs = 5;
    for (let i = 0; i <= segs; i++) {
      const x  = (w / segs) * i;
      const cx = (w / segs) * (i - 0.5);
      const cy = yTop - 14 + (i % 2 === 0 ? 0 : 28);
      ctx.quadraticCurveTo(cx, cy, x, yTop + 8);
    }
    ctx.lineTo(w, yTop + h);
    ctx.lineTo(0, yTop + h);
  }
  ctx.closePath();
  ctx.fill();
}

// ============================================================
// VIPHA logo — green pill-shape with white text
// ============================================================
function drawVipha(ctx, cx, cy, scale = 1) {
  ctx.save();
  ctx.translate(cx, cy);
  ctx.scale(scale, scale);
  ctx.fillStyle = G_MAIN;
  const w = 220, h = 70;
  ctx.beginPath();
  ctx.moveTo(-w/2 + h/2, -h/2);
  ctx.lineTo(w/2 - h/2, -h/2);
  ctx.arc(w/2 - h/2, 0, h/2, -Math.PI/2, Math.PI/2);
  ctx.lineTo(-w/2 + h/2, h/2);
  ctx.arc(-w/2 + h/2, 0, h/2, Math.PI/2, -Math.PI/2);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = '#fff';
  ctx.font = 'bold 52px "Helvetica Neue", Arial, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('VIPHA', 0, 4);
  ctx.restore();
}

// ============================================================
// "Bona" — large green italic serif
// ============================================================
function drawBona(ctx, cx, cy, size = 200) {
  ctx.fillStyle = G_MAIN;
  ctx.font = `italic 900 ${size}px Georgia, "Times New Roman", serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'alphabetic';
  ctx.fillText('Bona', cx, cy);
}

// ============================================================
// Oval banner with white text inside
// ============================================================
function drawOvalBanner(ctx, cx, cy, w, h, lines, fontSize = 24) {
  ctx.fillStyle = G_MAIN;
  ctx.beginPath();
  ctx.ellipse(cx, cy, w/2, h/2, 0, 0, Math.PI*2);
  ctx.fill();
  ctx.fillStyle = '#fff';
  ctx.font = `bold ${fontSize}px "Helvetica Neue", Arial, sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  const lh = fontSize * 1.1;
  const startY = cy - (lines.length - 1) * lh / 2;
  lines.forEach((l, i) => ctx.fillText(l, cx, startY + i * lh));
}

// ============================================================
// Cannabis-style leaf — 7 fingers fanning from a stem base
// ============================================================
function drawLeaf(ctx, baseX, baseY, length, angle, palette = [G_MAIN, G_DARK, G_LIGHT]) {
  ctx.save();
  ctx.translate(baseX, baseY);
  ctx.rotate(angle);

  // 7 fingers — center longest, outer shorter
  // angles relative to the stem direction (pointing up)
  const fingerAngles = [-0.95, -0.6, -0.28, 0, 0.28, 0.6, 0.95];
  const fingerLens   = [0.45, 0.7, 0.9, 1.0, 0.9, 0.7, 0.45];

  for (let i = 0; i < fingerAngles.length; i++) {
    ctx.save();
    ctx.rotate(fingerAngles[i]);
    const L = length * fingerLens[i];
    // Finger shape — long pointed leaflet
    ctx.fillStyle = i % 2 === 0 ? palette[0] : palette[2];
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(-L*0.12, -L*0.3, -L*0.10, -L*0.7, 0, -L);
    ctx.bezierCurveTo( L*0.10, -L*0.7,  L*0.12, -L*0.3, 0, 0);
    ctx.closePath();
    ctx.fill();
    // dark midvein
    ctx.strokeStyle = palette[1];
    ctx.lineWidth = Math.max(1, L * 0.018);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, -L * 0.95);
    ctx.stroke();
    // serrations — subtle lighter notches
    ctx.fillStyle = palette[1];
    for (let j = 1; j < 6; j++) {
      const t = j / 6;
      const yy = -L * t;
      const xx = L * 0.09 * (1 - t);
      ctx.beginPath();
      ctx.ellipse(-xx, yy, L*0.012, L*0.04, 0.3, 0, Math.PI*2);
      ctx.fill();
      ctx.beginPath();
      ctx.ellipse( xx, yy, L*0.012, L*0.04, -0.3, 0, Math.PI*2);
      ctx.fill();
    }
    ctx.restore();
  }
  // central stem
  ctx.strokeStyle = palette[1];
  ctx.lineWidth = length * 0.025;
  ctx.beginPath();
  ctx.moveTo(0, 0); ctx.lineTo(0, length * 0.3);
  ctx.stroke();
  ctx.restore();
}

// ============================================================
// Brain inside a circle — green outline, brain hint
// ============================================================
function drawBrainBadge(ctx, cx, cy, r) {
  // outer circle
  ctx.fillStyle = '#f4d36b';
  ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI*2); ctx.fill();
  ctx.strokeStyle = G_DARK; ctx.lineWidth = r * 0.06;
  ctx.beginPath(); ctx.arc(cx, cy, r * 0.97, 0, Math.PI*2); ctx.stroke();

  // brain silhouette — two hemispheres
  ctx.save();
  ctx.translate(cx, cy + r * 0.05);
  const br = r * 0.65;
  // left hemisphere
  ctx.fillStyle = '#e89a9a';
  ctx.beginPath();
  ctx.ellipse(-br*0.42, 0, br*0.55, br*0.7, -0.1, 0, Math.PI*2);
  ctx.fill();
  ctx.fillStyle = '#d97a7a';
  ctx.beginPath();
  ctx.ellipse( br*0.42, 0, br*0.55, br*0.7, 0.1, 0, Math.PI*2);
  ctx.fill();
  // central divider
  ctx.strokeStyle = G_DARK; ctx.lineWidth = r * 0.04;
  ctx.beginPath();
  ctx.moveTo(0, -br*0.55); ctx.lineTo(0, br*0.55);
  ctx.stroke();
  // gyri (squiggles)
  ctx.lineWidth = r * 0.03;
  for (let side of [-1, 1]) {
    for (let i = 0; i < 3; i++) {
      ctx.beginPath();
      const y = -br*0.35 + i * br*0.32;
      ctx.moveTo(side * br*0.08, y);
      ctx.quadraticCurveTo(side * br*0.55, y - br*0.05, side * br*0.78, y);
      ctx.stroke();
    }
  }
  ctx.restore();

  // VIPHA banner at top of badge
  ctx.fillStyle = G_MAIN;
  ctx.beginPath();
  ctx.ellipse(cx, cy - r*0.7, r*0.7, r*0.18, 0, 0, Math.PI*2);
  ctx.fill();
  ctx.fillStyle = '#fff';
  ctx.font = `bold ${Math.floor(r*0.24)}px "Helvetica Neue", Arial, sans-serif`;
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  ctx.fillText('VIPHA', cx, cy - r*0.68);
}

// ============================================================
// Capsule (white pill, 2 halves)
// ============================================================
function drawCapsule(ctx, cx, cy, w, h, angle = 0) {
  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(angle);
  // full body white
  ctx.fillStyle = '#ffffff';
  ctx.strokeStyle = '#bbb';
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  ctx.moveTo(-w/2 + h/2, -h/2);
  ctx.lineTo(w/2 - h/2, -h/2);
  ctx.arc(w/2 - h/2, 0, h/2, -Math.PI/2, Math.PI/2);
  ctx.lineTo(-w/2 + h/2, h/2);
  ctx.arc(-w/2 + h/2, 0, h/2, Math.PI/2, -Math.PI/2);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  // seam line in middle
  ctx.strokeStyle = '#ccc';
  ctx.beginPath();
  ctx.moveTo(0, -h/2 + 1); ctx.lineTo(0, h/2 - 1);
  ctx.stroke();
  // highlight
  ctx.fillStyle = 'rgba(255,255,255,0.6)';
  ctx.beginPath();
  ctx.ellipse(-w*0.18, -h*0.18, w*0.25, h*0.12, 0, 0, Math.PI*2);
  ctx.fill();
  ctx.restore();
}

// ============================================================
// FRONT FACE TEXTURE — brand-only, centered layout
// ============================================================
function makeFrontTexture() {
  const W = 800, H = 1200;
  const c = document.createElement('canvas');
  c.width = W; c.height = H;
  const ctx = c.getContext('2d');

  ctx.fillStyle = CARTON;
  ctx.fillRect(0, 0, W, H);

  // top wavy band + header text
  wavyBand(ctx, W, 0, 95);
  ctx.fillStyle = '#fff';
  ctx.font = 'bold 30px "Helvetica Neue", Arial, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('Thực phẩm chức năng', W/2, 38);
  ctx.fillText('viên nang cứng', W/2, 74);

  // bottom wavy band + "60 viên nang"
  wavyBand(ctx, W, H - 110, 110, true);
  ctx.fillStyle = '#fff';
  ctx.font = 'bold 40px "Helvetica Neue", Arial, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('60 viên nang', W/2, H - 48);

  // VIPHA logo — moved right
  drawVipha(ctx, W * 0.62, 230, 1.35);

  // "Bona" — large central
  drawBona(ctx, W * 0.55, 470, 260);

  // banner under Bona
  drawOvalBanner(ctx, W * 0.48, 550, 360, 60, ['hoạt huyết, dưỡng não'], 30);

  // Leaves — smaller cluster, lower position so they don't overlap VIPHA/Bona text
  drawLeaf(ctx, 150, 870, 260, -0.20);   // main leaf
  drawLeaf(ctx, 215, 895, 200, 0.55);    // tilted right
  drawLeaf(ctx,  90, 910, 180, -0.80);   // tilted left
  drawLeaf(ctx, 175, 985, 160, 0.05);    // lower center
  drawLeaf(ctx, 240, 960, 150, 0.35);
  drawLeaf(ctx,  70, 985, 140, -0.55);

  // Brain badge — lower-center-right
  drawBrainBadge(ctx, W * 0.62, H * 0.82, 105);

  // 2 capsules near the brain badge
  drawCapsule(ctx, W * 0.34, H * 0.88, 105, 48, -0.4);
  drawCapsule(ctx, W * 0.42, H * 0.93, 105, 48, -0.25);

  // company info just above bottom band
  ctx.fillStyle = '#444';
  ctx.font = '11px "Helvetica Neue", Arial, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('Sản phẩm của', W/2, H - 138);
  ctx.font = 'bold 12px "Helvetica Neue", Arial, sans-serif';
  ctx.fillText('CÔNG TY TNHH PHÁT TRIỂN KINH DOANH VIỆT PHARM', W/2, H - 122);

  return c;
}

// ============================================================
// SIDE FACE TEXTURE — all formula / usage text
// ============================================================
function makeSideTexture() {
  const W = 550, H = 1200;
  const c = document.createElement('canvas');
  c.width = W; c.height = H;
  const ctx = c.getContext('2d');

  ctx.fillStyle = CARTON;
  ctx.fillRect(0, 0, W, H);

  // top band
  wavyBand(ctx, W, 0, 80);
  ctx.fillStyle = '#fff';
  ctx.font = 'bold 18px "Helvetica Neue", Arial, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('Thực phẩm chức năng viên nang cứng', W/2, 48);

  // bottom band
  wavyBand(ctx, W, H - 70, 70, true);
  ctx.fillStyle = '#fff';
  ctx.font = 'bold 22px "Helvetica Neue", Arial, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('60 viên nang', W/2, H - 28);

  // === Body text ===
  const mx = 28;             // left margin
  const rx = W - 28;         // right margin
  let y = 120;
  ctx.textAlign = 'left';

  ctx.fillStyle = G_DARK;
  ctx.font = 'bold 22px "Helvetica Neue", Arial, sans-serif';
  ctx.fillText('CÔNG THỨC (1 viên):', mx, y);
  y += 30;

  const ingredients = [
    ['Đinh Lăng',    '250mg'],
    ['Bạch Quả',     '35mg'],
    ['Xuyên Khung',  '110mg'],
    ['Hồng Hoa',     '45mg'],
    ['Ngải Tâm',     '150mg'],
    ['Cam Thảo',     '15mg'],
    ['Sài Hồ',       '45mg'],
    ['Chỉ Xác',      '45mg'],
    ['Đương Quy',    '110mg'],
    ['Kích Thước',   '110mg'],
    ['Sinh Địa',     '110mg']
  ];
  ctx.fillStyle = TEXT_BODY;
  ctx.font = '18px "Helvetica Neue", Arial, sans-serif';
  ingredients.forEach((it) => {
    ctx.textAlign = 'left';
    ctx.fillText('• ' + it[0], mx, y);
    ctx.textAlign = 'right';
    ctx.fillText(it[1], rx, y);
    y += 24;
  });
  y += 6;
  ctx.textAlign = 'left';
  ctx.font = '15px "Helvetica Neue", Arial, sans-serif';
  ctx.fillText('Phụ liệu: Aerosil, lactose, gelatin vừa', mx, y); y += 19;
  ctx.fillText('đủ 1 viên.', mx, y);
  y += 28;

  function section(title, lines, opts = {}) {
    const titleSize = opts.titleSize || 20;
    const bodySize = opts.bodySize || 17;
    ctx.fillStyle = G_DARK;
    ctx.font = `bold ${titleSize}px "Helvetica Neue", Arial, sans-serif`;
    ctx.fillText(title, mx, y); y += titleSize + 6;
    ctx.fillStyle = TEXT_BODY;
    ctx.font = `${bodySize}px "Helvetica Neue", Arial, sans-serif`;
    lines.forEach(t => { ctx.fillText(t, mx, y); y += bodySize + 5; });
    y += 8;
  }

  section('CÔNG DỤNG:', [
    '- Giúp hoạt huyết, dưỡng não, tăng',
    '  cường lượng máu lưu thông lên não.',
    '- Hỗ trợ làm giảm các chứng đau nửa',
    '  đầu, hoa mắt, chóng mặt do thiểu năng',
    '  tuần hoàn não.'
  ]);

  section('ĐỐI TƯỢNG SỬ DỤNG:', [
    '- Người lớn có các chứng đau đầu, hoa',
    '  mắt, chóng mặt, suy nhược thần kinh,',
    '  mất ngủ, mất tập trung.'
  ]);

  section('CÁCH DÙNG:', [
    '- Người lớn: 1-2 viên/lần x 2-3 lần/ngày.',
    '- Trên 12 tuổi: 1-2 viên/lần x 2 lần/ngày.'
  ]);

  section('BẢO QUẢN:', [
    'Để nơi khô ráo, thoáng mát, dưới 30°C,',
    'tránh ánh sáng, xa tầm tay trẻ em.'
  ]);

  section('HẠN DÙNG:', [
    '36 tháng kể từ ngày sản xuất.'
  ]);

  // Batch info block — Số lô / NSX / HSD / Số đăng ký
  ctx.fillStyle = G_DARK;
  ctx.font = 'bold 18px "Helvetica Neue", Arial, sans-serif';
  ctx.fillText('Số lô SX:', mx, y);
  ctx.fillStyle = TEXT_BODY;
  ctx.font = '17px "Helvetica Neue", Arial, sans-serif';
  ctx.fillText('………………………', mx + 95, y);
  y += 24;

  ctx.fillStyle = G_DARK;
  ctx.font = 'bold 18px "Helvetica Neue", Arial, sans-serif';
  ctx.fillText('NSX:', mx, y);
  ctx.fillStyle = TEXT_BODY;
  ctx.font = '17px "Helvetica Neue", Arial, sans-serif';
  ctx.fillText('……/……/20……', mx + 60, y);
  y += 24;

  ctx.fillStyle = G_DARK;
  ctx.font = 'bold 18px "Helvetica Neue", Arial, sans-serif';
  ctx.fillText('HSD:', mx, y);
  ctx.fillStyle = TEXT_BODY;
  ctx.font = '17px "Helvetica Neue", Arial, sans-serif';
  ctx.fillText('……/……/20……', mx + 60, y);
  y += 24;

  ctx.fillStyle = G_DARK;
  ctx.font = 'bold 18px "Helvetica Neue", Arial, sans-serif';
  ctx.fillText('Số ĐK:', mx, y);
  ctx.fillStyle = TEXT_BODY;
  ctx.font = '17px "Helvetica Neue", Arial, sans-serif';
  ctx.fillText('………………………', mx + 70, y);
  y += 24;

  // Small VIPHA stamp at the very bottom (above the bottom band)
  drawVipha(ctx, W/2, H - 100, 0.5);

  return c;
}

// ============================================================
// TOP / BOTTOM TEXTURE
// ============================================================
function makeTopTexture() {
  const W = 800, H = 550;
  const c = document.createElement('canvas');
  c.width = W; c.height = H;
  const ctx = c.getContext('2d');
  ctx.fillStyle = CARTON;
  ctx.fillRect(0, 0, W, H);
  // green border
  ctx.strokeStyle = G_MAIN; ctx.lineWidth = 18;
  ctx.strokeRect(9, 9, W - 18, H - 18);
  drawVipha(ctx, W/2, H/2 - 50, 1.5);
  drawBona(ctx, W/2, H/2 + 130, 150);
  return c;
}

// ============================================================
// THREE.JS SCENE
// ============================================================
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(40, innerWidth/innerHeight, 0.1, 100);
camera.position.set(3.8, 3.0, 5);

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setPixelRatio(devicePixelRatio);
renderer.setSize(innerWidth, innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.xr.enabled = true;                  // <— enable WebXR
document.body.appendChild(renderer.domElement);

// VR entry button (appears bottom-center)
const vrBtn = VRButton.createButton(renderer, { optionalFeatures: ['hand-tracking'] });
vrBtn.style.bottom = '60px';
document.body.appendChild(vrBtn);

// ----- Help panel: explains VR status & how to enable it on Chrome -----
const help = document.createElement('div');
help.style.cssText = 'position:absolute;top:54px;left:12px;background:rgba(255,255,255,0.92);padding:10px 14px;border-radius:8px;font-size:12px;color:#222;font-family:system-ui,sans-serif;line-height:1.45;box-shadow:0 2px 8px rgba(0,0,0,0.12);z-index:10;max-width:340px';
help.innerHTML = '<b>Kiểm tra WebXR…</b>';
document.body.appendChild(help);

(async () => {
  let status = '';
  if (!('xr' in navigator)) {
    status = '❌ Trình duyệt không có WebXR. Dùng Chrome ≥ 79 hoặc Edge.';
  } else {
    try {
      const ok = await navigator.xr.isSessionSupported('immersive-vr');
      status = ok
        ? '✅ WebXR sẵn sàng — bấm <b>ENTER VR</b> dưới đáy.'
        : '⚠️ Chrome có WebXR nhưng không thấy thiết bị VR.';
    } catch (e) {
      status = '⚠️ WebXR bị chặn: ' + e.message;
    }
  }
  help.innerHTML = `
    <div style="font-weight:600;margin-bottom:6px">VR · Chrome</div>
    <div style="margin-bottom:6px">${status}</div>
    <div style="color:#555;font-size:11px">
      Cách bật VR trên Chrome desktop:<br>
      • Cài extension <a href="https://chromewebstore.google.com/detail/webxr-api-emulator/mjddjgeghkdijejnciaefnkjmkafnnje" target="_blank">WebXR API Emulator</a> để giả lập kính/controller<br>
      • Hoặc cắm kính thật (Quest Link, WMR…) rồi bấm <b>ENTER VR</b>
    </div>
    <hr style="border:none;border-top:1px solid #ddd;margin:8px 0">
    <div style="color:#555;font-size:11px">
      <b>Chế độ VR-Preview (không cần kính):</b><br>
      Bấm <kbd>V</kbd> để vào • <kbd>W A S D</kbd> đi • chuột nhìn • <kbd>Click</kbd> mở thùng / lấy hộp • <kbd>Esc</kbd> thoát
    </div>`;
})();

// ============================================================
// VR-PREVIEW MODE — first-person walk-around for plain Chrome
// ============================================================
const vrPreview = { active: false, yaw: 0, pitch: 0, keys: {} };
const _pvForward = new THREE.Vector3();
const _pvRight   = new THREE.Vector3();

function enterVRPreview() {
  vrPreview.active = true;
  controls.enabled = false;
  // start near the carton, eye height
  camera.position.set(0, 1.5, 0.6);
  vrPreview.yaw = 0; vrPreview.pitch = -0.1;
  renderer.domElement.requestPointerLock?.();
  setHint('🎮 VR-Preview: WASD đi · chuột nhìn · click mở/lấy · Esc thoát');
}
function exitVRPreview() {
  vrPreview.active = false;
  controls.enabled = true;
  document.exitPointerLock?.();
  setHint('🖱️ Bấm vào thùng để mở');
}
document.addEventListener('keydown', e => {
  if (e.key === 'v' || e.key === 'V') { vrPreview.active ? exitVRPreview() : enterVRPreview(); }
  if (e.key === 'Escape' && vrPreview.active) exitVRPreview();
  vrPreview.keys[e.key.toLowerCase()] = true;
});
document.addEventListener('keyup', e => { vrPreview.keys[e.key.toLowerCase()] = false; });
document.addEventListener('mousemove', e => {
  if (!vrPreview.active || document.pointerLockElement !== renderer.domElement) return;
  vrPreview.yaw   -= e.movementX * 0.0025;
  vrPreview.pitch -= e.movementY * 0.0025;
  vrPreview.pitch = Math.max(-1.3, Math.min(1.3, vrPreview.pitch));
});
function updateVRPreview(dt) {
  if (!vrPreview.active) return;
  // orientation
  const euler = new THREE.Euler(vrPreview.pitch, vrPreview.yaw, 0, 'YXZ');
  camera.quaternion.setFromEuler(euler);
  // movement
  const speed = (vrPreview.keys['shift'] ? 2.5 : 1.2) * dt;
  camera.getWorldDirection(_pvForward);
  _pvForward.y = 0; _pvForward.normalize();
  _pvRight.crossVectors(_pvForward, camera.up).normalize();
  if (vrPreview.keys['w']) camera.position.addScaledVector(_pvForward,  speed);
  if (vrPreview.keys['s']) camera.position.addScaledVector(_pvForward, -speed);
  if (vrPreview.keys['d']) camera.position.addScaledVector(_pvRight,    speed);
  if (vrPreview.keys['a']) camera.position.addScaledVector(_pvRight,   -speed);
  if (vrPreview.keys[' ']) camera.position.y += speed;
  if (vrPreview.keys['c']) camera.position.y -= speed;
  camera.position.y = Math.max(0.3, camera.position.y);
}

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.minDistance = 2.5;
controls.maxDistance = 12;
controls.target.set(0, 1.2, 0);

// ----- VR world group: everything sits inside this so we can scale the
// scene to room-scale (carton ~ 50cm wide on a virtual table at 1m).
const vrWorld = new THREE.Group();
// scale chosen so the ~10-unit-wide carton becomes ~0.5 m in VR
vrWorld.scale.setScalar(0.06);
// lift the world so the carton sits at a comfortable height
vrWorld.position.set(0, 0.9, -0.6);
scene.add(vrWorld);

scene.add(new THREE.AmbientLight(0xffffff, 0.85));
const key = new THREE.DirectionalLight(0xffffff, 0.8);
key.castShadow = true;
key.shadow.mapSize.set(2048, 2048);
key.shadow.camera.left = -5; key.shadow.camera.right = 5;
key.shadow.camera.top = 5;   key.shadow.camera.bottom = -5;
scene.add(key);
scene.add(key.target);
const fill = new THREE.DirectionalLight(0xcfe0ff, 0.3);
scene.add(fill);
scene.add(fill.target);

// In desktop mode keep lights fixed RELATIVE TO THE CAMERA so the lit faces
// and shadows stay in the same position when orbiting.
// In VR (XR presenting) use static world-space lighting (head-tracking already
// gives the user free perspective; chasing the head with lights looks bad).
const _v = new THREE.Vector3(), _r = new THREE.Vector3(), _u = new THREE.Vector3();
function updateLights() {
  const center = controls.target;

  if (renderer.xr.isPresenting) {
    key.position.set(center.x + 0.6, center.y + 1.2, center.z + 0.6);
    key.target.position.copy(center);
    key.target.updateMatrixWorld();
    fill.position.set(center.x - 0.6, center.y + 0.6, center.z - 0.4);
    fill.target.position.copy(center);
    fill.target.updateMatrixWorld();
    return;
  }

  camera.getWorldDirection(_v);                  // camera forward
  _r.crossVectors(_v, camera.up).normalize();    // camera right
  _u.crossVectors(_r, _v).normalize();           // camera up

  // KEY: up-right-behind the viewer
  key.position.copy(center)
    .addScaledVector(_v, -2.5)
    .addScaledVector(_u,  6.0)
    .addScaledVector(_r,  3.5);
  key.target.position.copy(center);
  key.target.updateMatrixWorld();

  // FILL: opposite side, lower
  fill.position.copy(center)
    .addScaledVector(_v, -1.0)
    .addScaledVector(_u,  2.5)
    .addScaledVector(_r, -4.0);
  fill.target.position.copy(center);
  fill.target.updateMatrixWorld();
}

const ground = new THREE.Mesh(
  new THREE.CircleGeometry(12, 64),
  new THREE.ShadowMaterial({ opacity: 0.22 })
);
ground.rotation.x = -Math.PI / 2;
ground.receiveShadow = true;
vrWorld.add(ground);

function texFromCanvas(c) {
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 16;
  t.needsUpdate = true;
  return t;
}

const frontTex = texFromCanvas(makeFrontTexture());
const sideTex  = texFromCanvas(makeSideTexture());
const topTex   = texFromCanvas(makeTopTexture());

// Box dims aligned to canvas aspect ratios
const H = 2.4;
const W = H * (800 / 1200);   // 1.6
const D = H * (550 / 1200);   // 1.1

const matFront = new THREE.MeshStandardMaterial({ map: frontTex, roughness: 0.6, metalness: 0.02 });
const matSide  = new THREE.MeshStandardMaterial({ map: sideTex,  roughness: 0.6, metalness: 0.02 });
const matTop   = new THREE.MeshStandardMaterial({ map: topTex,   roughness: 0.6, metalness: 0.02 });

// Shared geometry & material array for the 48 medicine boxes
const boxGeom = new THREE.BoxGeometry(W, H, D);
const boxMats = [matSide, matSide, matTop, matTop, matFront, matFront];

// ============================================================
// CARTON (shipping box) — holds 48 medicine boxes inside
// ============================================================
function makeCardboardTexture() {
  const c = document.createElement('canvas');
  c.width = 512; c.height = 512;
  const ctx = c.getContext('2d');
  // base kraft color
  const grad = ctx.createLinearGradient(0, 0, 512, 512);
  grad.addColorStop(0, '#c9955c');
  grad.addColorStop(1, '#b07e44');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 512, 512);
  // fiber noise
  for (let i = 0; i < 2400; i++) {
    ctx.fillStyle = `rgba(${80 + Math.random()*40},${50 + Math.random()*30},${20 + Math.random()*20},${0.05 + Math.random()*0.12})`;
    const x = Math.random()*512, y = Math.random()*512;
    ctx.fillRect(x, y, 1 + Math.random()*2, 1 + Math.random()*4);
  }
  // a few longer fiber streaks
  for (let i = 0; i < 50; i++) {
    ctx.strokeStyle = `rgba(80,50,20,${0.05 + Math.random()*0.1})`;
    ctx.lineWidth = 0.6;
    ctx.beginPath();
    const x = Math.random()*512, y = Math.random()*512;
    ctx.moveTo(x, y); ctx.lineTo(x + 30 + Math.random()*50, y + (Math.random()-0.5)*10);
    ctx.stroke();
  }
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.anisotropy = 8;
  return t;
}

const cardboardTex = makeCardboardTexture();
const cardboardMat = new THREE.MeshStandardMaterial({ map: cardboardTex, roughness: 0.95, metalness: 0 });

// ----- Grid: 6 (X) × 2 (Y layers) × 4 (Z) = 48 boxes -----
const NX = 6, NY = 2, NZ = 4;
const PAD = 0.05;          // small spacing between boxes
const WALL = 0.06;         // carton wall thickness

// Carton dimensions sized to fit the grid
const CW = NX * W + (NX + 1) * PAD + 2 * WALL;
const CH = NY * H + (NY + 1) * PAD + WALL;        // floor + boxes + headroom above each layer
const CD = NZ * D + (NZ + 1) * PAD + 2 * WALL;

const carton = new THREE.Group();

// Bottom panel
const bottom = new THREE.Mesh(new THREE.BoxGeometry(CW, WALL, CD), cardboardMat);
bottom.position.y = WALL/2;
bottom.castShadow = true; bottom.receiveShadow = true;
carton.add(bottom);

function makeWall(w, h, d) {
  const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), cardboardMat);
  m.castShadow = true; m.receiveShadow = true;
  return m;
}
const wallFront = makeWall(CW, CH, WALL); wallFront.position.set(0, CH/2, CD/2 - WALL/2); carton.add(wallFront);
const wallBack  = makeWall(CW, CH, WALL); wallBack.position.set(0, CH/2, -CD/2 + WALL/2); carton.add(wallBack);
const wallLeft  = makeWall(WALL, CH, CD - 2*WALL); wallLeft.position.set(-CW/2 + WALL/2, CH/2, 0); carton.add(wallLeft);
const wallRight = makeWall(WALL, CH, CD - 2*WALL); wallRight.position.set( CW/2 - WALL/2, CH/2, 0); carton.add(wallRight);

// ----- Top flaps (correct hinge mechanics) -----
// Each flap = outer pivot (rotation.y aligns the flap to its wall) wrapping
// an inner pivot (rotation.x is the actual hinge motion).
// Mesh inside extends in inner-local -Z (i.e. toward carton interior when closed).
function makeFlap(w, d, yAngle) {
  const outer = new THREE.Object3D();
  outer.rotation.y = yAngle;
  const inner = new THREE.Object3D();
  outer.add(inner);
  const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, WALL, d), cardboardMat);
  mesh.castShadow = true; mesh.receiveShadow = true;
  mesh.position.set(0, 0, -d/2);   // hinge edge at local origin, extends in -Z
  inner.add(mesh);
  outer.userData = { inner, mesh };
  return outer;
}

// Front: hinge at +Z top edge — closed = extends toward -Z (inward)
const flapFront = makeFlap(CW, CD/2 - WALL, 0);
flapFront.position.set(0, CH, CD/2 - WALL/2);
carton.add(flapFront);
// Back: yAngle = π so local -Z → world +Z (inward from back wall)
const flapBack = makeFlap(CW, CD/2 - WALL, Math.PI);
flapBack.position.set(0, CH, -CD/2 + WALL/2);
carton.add(flapBack);
// Left: yAngle = -π/2 so local -Z → world +X (inward from left wall)
const flapLeft = makeFlap(CD - 2*WALL, CW/2 - WALL, -Math.PI/2);
flapLeft.position.set(-CW/2 + WALL/2, CH, 0);
carton.add(flapLeft);
// Right: yAngle = +π/2 so local -Z → world -X (inward from right wall)
const flapRight = makeFlap(CD - 2*WALL, CW/2 - WALL, Math.PI/2);
flapRight.position.set(CW/2 - WALL/2, CH, 0);
carton.add(flapRight);

const flaps = [flapFront, flapBack, flapLeft, flapRight];
function setFlapAngle(a) { flaps.forEach(f => f.userData.inner.rotation.x = a); }

vrWorld.add(carton);

// ----- Place 48 medicine boxes inside (6 × 2 × 4 grid) -----
const boxes = [];   // { mesh, baseX, baseY, baseZ, ix, iy, iz, state, animT }
const innerLeft = -CW/2 + WALL + PAD;
const innerBack = -CD/2 + WALL + PAD;
const floorTop  = WALL;

for (let iy = 0; iy < NY; iy++) {
  for (let iz = 0; iz < NZ; iz++) {
    for (let ix = 0; ix < NX; ix++) {
      const m = new THREE.Mesh(boxGeom, boxMats);
      m.castShadow = true; m.receiveShadow = true;
      const bx = innerLeft + W/2 + ix * (W + PAD);
      const by = floorTop + PAD + H/2 + iy * (H + PAD);
      const bz = innerBack + D/2 + iz * (D + PAD);
      m.position.set(bx, by, bz);
      vrWorld.add(m);
      boxes.push({
        mesh: m,
        baseX: bx, baseY: by, baseZ: bz,
        ix, iy, iz,
        state: 'in',         // 'in' | 'extracting' | 'out' | 'inserting'
        animT: 0
      });
    }
  }
}

// Re-aim OrbitControls and camera at the carton in WORLD space
// (carton sits inside vrWorld: scale 0.06, position (0, 0.9, -0.6))
vrWorld.updateMatrixWorld(true);
const worldCartonCenter = new THREE.Vector3(0, CH/2, 0).applyMatrix4(vrWorld.matrixWorld);
controls.target.copy(worldCartonCenter);
camera.position.set(worldCartonCenter.x + 0.55, worldCartonCenter.y + 0.25, worldCartonCenter.z + 0.85);
controls.minDistance = 0.3;
controls.maxDistance = 3;

// ============================================================
// TRAINING SCENE — kệ thuốc + 4 loại thuốc + chấm điểm
// (MVP đào tạo: SV bốc thuốc trên bàn → đặt lên đúng ô của kệ)
// ============================================================

// Hide the original VIPHA carton + 48 boxes — keep for future demos, but
// MVP đào tạo dùng kệ và 4 loại thuốc khác nhau.
carton.visible = false;
boxes.forEach(b => b.mesh.visible = false);

// 4-8 loại thuốc — chọn ngẫu nhiên từ catalog dùng chung dựa vào độ khó
const MEDICINES_DATA = ROUND_MEDICINES;

function makeMedTexture(name, category, bgColor, isFront) {
  const c = document.createElement('canvas');
  c.width = isFront ? 800 : 400;
  c.height = 1200;
  const ctx = c.getContext('2d');
  ctx.fillStyle = bgColor; ctx.fillRect(0, 0, c.width, c.height);
  ctx.fillStyle = '#ffffff';
  const m = 40;
  ctx.fillRect(m, m, c.width - 2*m, c.height - 2*m);
  ctx.fillStyle = bgColor;
  ctx.textAlign = 'center';
  ctx.font = `bold ${isFront ? 80 : 50}px system-ui, sans-serif`;
  ctx.fillText(name, c.width/2, isFront ? 350 : 250);
  ctx.font = `${isFront ? 50 : 35}px system-ui, sans-serif`;
  ctx.fillStyle = '#444';
  ctx.fillText(category, c.width/2, isFront ? 450 : 320);
  if (isFront) {
    // pharma cross icon
    ctx.fillStyle = bgColor;
    const cx = c.width/2, cy = 800, s = 90;
    ctx.fillRect(cx - s/4, cy - s, s/2, s*2);
    ctx.fillRect(cx - s, cy - s/4, s*2, s/2);
  }
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 16;
  return t;
}

function makeSlotLabelTexture(text) {
  const c = document.createElement('canvas');
  c.width = 512; c.height = 128;
  const ctx = c.getContext('2d');
  ctx.fillStyle = '#fff3e0'; ctx.fillRect(0, 0, 512, 128);
  ctx.strokeStyle = '#8d6e63'; ctx.lineWidth = 6;
  ctx.strokeRect(3, 3, 506, 122);
  ctx.fillStyle = '#3e2723';
  ctx.font = 'bold 56px system-ui, sans-serif';
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  ctx.fillText(text, 256, 64);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

// ---- Shelf: 4 slot ngang ----
const SLOT_W = 2.5, SLOT_H = 3.5, SLOT_D = 1.5, SHELF_THICK = 0.1;
const SHELF_Y = 1.85, SHELF_Z = -3;
const SHELF_TOTAL_W = MEDICINES_DATA.length * SLOT_W + (MEDICINES_DATA.length + 1) * SHELF_THICK;
const SHELF_X0 = -SHELF_TOTAL_W / 2 + SHELF_THICK + SLOT_W / 2;

const shelf = new THREE.Group();
shelf.position.set(0, SHELF_Y, SHELF_Z);
vrWorld.add(shelf);

const woodMat = new THREE.MeshStandardMaterial({ color: 0xa1887f, roughness: 0.9 });
const woodMatDark = new THREE.MeshStandardMaterial({ color: 0x8d6e63, roughness: 0.95 });

const shelfBack = new THREE.Mesh(
  new THREE.BoxGeometry(SHELF_TOTAL_W, SLOT_H + 2*SHELF_THICK, SHELF_THICK),
  woodMatDark
);
shelfBack.position.z = -SLOT_D/2 - SHELF_THICK/2;
shelfBack.castShadow = true; shelfBack.receiveShadow = true;
shelf.add(shelfBack);

const shelfFloor = new THREE.Mesh(
  new THREE.BoxGeometry(SHELF_TOTAL_W, SHELF_THICK, SLOT_D),
  woodMat
);
shelfFloor.position.y = -SLOT_H/2 - SHELF_THICK/2;
shelfFloor.castShadow = true; shelfFloor.receiveShadow = true;
shelf.add(shelfFloor);

const shelfTop = new THREE.Mesh(
  new THREE.BoxGeometry(SHELF_TOTAL_W, SHELF_THICK, SLOT_D),
  woodMat
);
shelfTop.position.y = SLOT_H/2 + SHELF_THICK/2;
shelfTop.castShadow = true; shelfTop.receiveShadow = true;
shelf.add(shelfTop);

const slots = [];
for (let i = 0; i <= MEDICINES_DATA.length; i++) {
  const divider = new THREE.Mesh(
    new THREE.BoxGeometry(SHELF_THICK, SLOT_H, SLOT_D),
    woodMat
  );
  divider.position.x = -SHELF_TOTAL_W/2 + SHELF_THICK/2 + i * (SLOT_W + SHELF_THICK);
  divider.castShadow = true; divider.receiveShadow = true;
  shelf.add(divider);
}

// Slot record + label plane above each slot.
// localCenter is in vrWorld coords (since shelf is a direct child of vrWorld).
for (let i = 0; i < MEDICINES_DATA.length; i++) {
  const slotXLocal = SHELF_X0 + i * (SLOT_W + SHELF_THICK);
  const med = MEDICINES_DATA[i];
  const label = new THREE.Mesh(
    new THREE.PlaneGeometry(SLOT_W * 0.95, 0.55),
    new THREE.MeshBasicMaterial({ map: makeSlotLabelTexture(med.category), transparent: false })
  );
  label.position.set(slotXLocal, SLOT_H/2 + 0.45, -SLOT_D/2 + 0.02);
  shelf.add(label);

  // Halo glow box bên trong ô — visible khi đang grab + nearest slot trong SNAP_DIST
  const halo = new THREE.Mesh(
    new THREE.BoxGeometry(SLOT_W * 0.92, SLOT_H * 0.92, SLOT_D * 0.85),
    new THREE.MeshBasicMaterial({ color: 0x43a047, transparent: true, opacity: 0, depthWrite: false })
  );
  halo.position.set(slotXLocal, 0, 0);
  halo.renderOrder = -1;
  shelf.add(halo);

  slots.push({
    id: 'slot-' + i,
    category: med.category,
    localCenter: new THREE.Vector3(slotXLocal, SHELF_Y, SHELF_Z),
    halo,
    placedBoxId: null,
  });
}

// ---- Training carton: SV phải pinch vào thùng để mở trước khi lấy thuốc ----
const MED_W = 1.6, MED_H = 2.4, MED_D = 1.1;
const T_WALL = 0.08;
const T_CW = ROUND_N * MED_W + (ROUND_N - 1) * 0.18 + 2 * (T_WALL + 0.18);  // scale theo số thuốc
const T_CH = MED_H + 0.25;                                   // 2.65 — thấp hơn để camera nhìn xuống thấy thuốc khi mở
const T_CD = MED_D + 2 * (T_WALL + 0.2);                     // ~1.66
const TRAINING_CARTON_Z = 3;

const cardboardMatNew = new THREE.MeshStandardMaterial({ color: 0xa1887f, roughness: 0.92 });
function tMesh(g) {
  const m = new THREE.Mesh(g, cardboardMatNew);
  m.castShadow = true; m.receiveShadow = true;
  return m;
}

const trainingCarton = new THREE.Group();
trainingCarton.position.set(0, T_CH/2, TRAINING_CARTON_Z);
vrWorld.add(trainingCarton);

const tBottom    = tMesh(new THREE.BoxGeometry(T_CW, T_WALL, T_CD));
tBottom.position.y = -T_CH/2 + T_WALL/2;
trainingCarton.add(tBottom);
const tWallFront = tMesh(new THREE.BoxGeometry(T_CW, T_CH, T_WALL));
tWallFront.position.z = T_CD/2 - T_WALL/2;
trainingCarton.add(tWallFront);
const tWallBack  = tMesh(new THREE.BoxGeometry(T_CW, T_CH, T_WALL));
tWallBack.position.z = -T_CD/2 + T_WALL/2;
trainingCarton.add(tWallBack);
const tWallLeft  = tMesh(new THREE.BoxGeometry(T_WALL, T_CH, T_CD - 2*T_WALL));
tWallLeft.position.x = -T_CW/2 + T_WALL/2;
trainingCarton.add(tWallLeft);
const tWallRight = tMesh(new THREE.BoxGeometry(T_WALL, T_CH, T_CD - 2*T_WALL));
tWallRight.position.x = T_CW/2 - T_WALL/2;
trainingCarton.add(tWallRight);

// 4 nắp đậy (hinged trên đỉnh, mở ra ngoài như thùng thật)
function makeTFlap(w, d, yAngle) {
  const outer = new THREE.Object3D();
  outer.rotation.y = yAngle;
  const inner = new THREE.Object3D();
  outer.add(inner);
  const m = tMesh(new THREE.BoxGeometry(w, T_WALL, d));
  m.position.set(0, 0, -d/2);
  inner.add(m);
  outer.userData = { inner, mesh: m };
  return outer;
}
const tFlapFront = makeTFlap(T_CW, T_CD/2 - T_WALL, 0);
tFlapFront.position.set(0, T_CH/2, T_CD/2 - T_WALL/2);
trainingCarton.add(tFlapFront);
const tFlapBack = makeTFlap(T_CW, T_CD/2 - T_WALL, Math.PI);
tFlapBack.position.set(0, T_CH/2, -T_CD/2 + T_WALL/2);
trainingCarton.add(tFlapBack);
const tFlapLeft = makeTFlap(T_CD - 2*T_WALL, T_CW/2 - T_WALL, -Math.PI/2);
tFlapLeft.position.set(-T_CW/2 + T_WALL/2, T_CH/2, 0);
trainingCarton.add(tFlapLeft);
const tFlapRight = makeTFlap(T_CD - 2*T_WALL, T_CW/2 - T_WALL, Math.PI/2);
tFlapRight.position.set(T_CW/2 - T_WALL/2, T_CH/2, 0);
trainingCarton.add(tFlapRight);

const trainingFlaps = [tFlapFront, tFlapBack, tFlapLeft, tFlapRight];
function setTrainingFlapAngle(a) { trainingFlaps.forEach(f => f.userData.inner.rotation.x = a); }
setTrainingFlapAngle(0);

// Nhãn "Pinch để mở" — to, đứng trên mặt trước carton, luôn thấy
const openLabel = new THREE.Mesh(
  new THREE.PlaneGeometry(T_CW * 0.7, 0.8),
  new THREE.MeshBasicMaterial({ map: makeSlotLabelTexture('👆 Pinch để mở'), transparent: true })
);
openLabel.position.set(0, 0, T_CD/2 + T_WALL/2 + 0.01);
trainingCarton.add(openLabel);

// State machine cho training carton
let trainingCartonState = 'closed';    // 'closed' | 'opening' | 'open'
let trainingCartonAnimT = 0;
const TRAINING_FLAP_DUR = 0.7;
const TRAINING_FLAP_OPEN_ANGLE = Math.PI * 0.62;

const trainingCartonHits = [
  tBottom, tWallFront, tWallBack, tWallLeft, tWallRight,
  tFlapFront.userData.mesh, tFlapBack.userData.mesh,
  tFlapLeft.userData.mesh, tFlapRight.userData.mesh,
  openLabel,
];

// Vị trí "rest" cho hộp sau khi carton mở — nhô lên trên carton để nhìn rõ
const MED_REVEAL_Y = T_CH + MED_H/2 + 0.15;

function liftMedicine(med, dur = 360) {
  const fromY = med.mesh.position.y;
  const toY = MED_REVEAL_Y;
  const start = performance.now();
  const step = () => {
    const t = Math.min(1, (performance.now() - start) / dur);
    const k = 1 - Math.pow(1 - t, 3);
    med.mesh.position.y = fromY + (toY - fromY) * k;
    if (t < 1) requestAnimationFrame(step);
  };
  step();
}

function openTrainingCarton() {
  if (trainingCartonState !== 'closed') return;
  trainingCartonState = 'opening';
  trainingCartonAnimT = 0;
  openLabel.visible = false;
  sfx.open();
  setHint('✨ Đang mở thùng...');
  // Safety fallback: nếu rAF tick bị throttle thì vẫn promote sang 'open' + reveal sau 1s
  setTimeout(() => {
    if (trainingCartonState === 'opening') {
      trainingCartonState = 'open';
      trainingCartonAnimT = 1;
      setTrainingFlapAngle(TRAINING_FLAP_OPEN_ANGLE);
    }
    medicineBoxes.forEach((m, i) => {
      setTimeout(() => {
        m.mesh.visible = true;
        liftMedicine(m);   // hộp nhô lên trên carton để dễ thấy + dễ pinch
      }, i * 120);
    });
    setHint('✋ Pinch hộp thuốc rồi kéo đến đúng ô kệ');
  }, TRAINING_FLAP_DUR * 1000 + 100);
}

function resetTrainingCarton() {
  trainingCartonState = 'closed';
  trainingCartonAnimT = 0;
  setTrainingFlapAngle(0);
  openLabel.visible = true;
  for (const med of medicineBoxes) {
    med.mesh.position.copy(med.initialPos);
    med.mesh.visible = false;
    med.slotId = null;
  }
}

// ---- 4 hộp thuốc xếp bên trong carton (visible=false đến khi pinch mở) ----
const medGeom = new THREE.BoxGeometry(MED_W, MED_H, MED_D);
const shuffledData = [...MEDICINES_DATA];
for (let i = shuffledData.length - 1; i > 0; i--) {
  const j = Math.floor(Math.random() * (i + 1));
  [shuffledData[i], shuffledData[j]] = [shuffledData[j], shuffledData[i]];
}

const medicineBoxes = [];
const MED_INNER_W = T_CW - 2 * (T_WALL + 0.18);
const MED_STEP = MED_INNER_W / ROUND_N;
shuffledData.forEach((data, i) => {
  const frontTex = makeMedTexture(data.name, data.category, data.color, true);
  const sideTex  = makeMedTexture(data.name, data.category, data.color, false);
  const mats = [
    new THREE.MeshStandardMaterial({ map: sideTex, roughness: 0.6 }),
    new THREE.MeshStandardMaterial({ map: sideTex, roughness: 0.6 }),
    new THREE.MeshStandardMaterial({ color: data.color, roughness: 0.6 }),
    new THREE.MeshStandardMaterial({ color: data.color, roughness: 0.6 }),
    new THREE.MeshStandardMaterial({ map: frontTex, roughness: 0.6 }),
    new THREE.MeshStandardMaterial({ map: frontTex, roughness: 0.6 }),
  ];
  const mesh = new THREE.Mesh(medGeom, mats);
  mesh.castShadow = true; mesh.receiveShadow = true;
  // Carton ở vrWorld(0, T_CH/2, TRAINING_CARTON_Z) — đặt 4 hộp đứng trên sàn carton
  const px = -T_CW/2 + T_WALL + 0.18 + MED_STEP/2 + i * MED_STEP;
  const py = T_WALL + MED_H/2;
  const pz = TRAINING_CARTON_Z;
  mesh.position.set(px, py, pz);
  mesh.visible = false;          // ẩn cho đến khi carton mở
  vrWorld.add(mesh);
  medicineBoxes.push({
    ...data, mesh,
    initialPos: new THREE.Vector3(px, py, pz),
    slotId: null,
  });
});

// ---- Re-target camera + hand-tracking depth plane to training scene ----
vrWorld.updateMatrixWorld(true);
const trainingCenterLocal = new THREE.Vector3(0, 1.5, 0);
const trainingCenterWorld = trainingCenterLocal.clone().applyMatrix4(vrWorld.matrixWorld);
controls.target.copy(trainingCenterWorld);
camera.position.set(trainingCenterWorld.x, trainingCenterWorld.y + 1.25, trainingCenterWorld.z + 1.3);
worldCartonCenter.copy(trainingCenterWorld);   // updateHandTracking projects cursor onto a plane through this point
controls.minDistance = 0.4;
controls.maxDistance = 5;

// Khoảng cách snap (vrWorld local) — pinch nhả gần ô này thì hộp tự bám vào
const SNAP_DIST = SLOT_W * 0.8;

// ============================================================
// VR CONTROLLERS — pointer ray + select event
// ============================================================
const controllerModelFactory = new XRControllerModelFactory();
const controllers = [];
const rayGeom = new THREE.BufferGeometry().setFromPoints([
  new THREE.Vector3(0, 0, 0),
  new THREE.Vector3(0, 0, -1)
]);
const rayMat = new THREE.LineBasicMaterial({ color: 0x66ccff, transparent: true, opacity: 0.7 });

for (let i = 0; i < 2; i++) {
  const controller = renderer.xr.getController(i);
  const ray = new THREE.Line(rayGeom, rayMat);
  ray.scale.z = 4;             // 4 m visible ray
  ray.frustumCulled = false;
  controller.add(ray);
  controller.userData.ray = ray;
  controller.addEventListener('selectstart', onControllerSelect);
  scene.add(controller);
  controllers.push(controller);

  const grip = renderer.xr.getControllerGrip(i);
  grip.add(controllerModelFactory.createControllerModel(grip));
  scene.add(grip);
}

// ----- VR native hand tracking (Quest 2/3, Vision Pro) -----
const handModelFactory = new XRHandModelFactory();
const xrHands = [];
for (let i = 0; i < 2; i++) {
  const hand = renderer.xr.getHand(i);
  hand.add(handModelFactory.createHandModel(hand, 'mesh'));
  hand.userData.pinching = false;
  hand.userData.grabbed = null;
  scene.add(hand);
  xrHands.push(hand);
}

const _xrPinchMid = new THREE.Vector3();
const _xrGrabPlane = new THREE.Plane();
const _xrInv = new THREE.Matrix4();
function updateXRHands() {
  if (!renderer.xr.isPresenting) return;
  for (const hand of xrHands) {
    const thumb = hand.joints?.['thumb-tip'];
    const index = hand.joints?.['index-finger-tip'];
    if (!thumb || !index) continue;
    const tw = new THREE.Vector3(); thumb.getWorldPosition(tw);
    const iw = new THREE.Vector3(); index.getWorldPosition(iw);
    const dist = tw.distanceTo(iw);
    _xrPinchMid.copy(tw).lerp(iw, 0.5);

    const wasPinching = hand.userData.pinching;
    if (!wasPinching && dist < 0.025) hand.userData.pinching = true;
    else if (wasPinching && dist > 0.04) hand.userData.pinching = false;

    // Pinch START → grab nearest visible medicine
    if (hand.userData.pinching && !wasPinching && !hand.userData.grabbed) {
      let best = null, bestDist = Infinity;
      for (const med of medicineBoxes) {
        if (!med.mesh.visible) continue;
        const mw = new THREE.Vector3();
        med.mesh.getWorldPosition(mw);
        const d = _xrPinchMid.distanceTo(mw);
        if (d < bestDist) { bestDist = d; best = med; }
      }
      // Allow grab if hand is within ~12cm of a medicine
      if (best && bestDist < 0.12) {
        hand.userData.grabbed = best;
        if (best.slotId) {
          const sl = slots.find(s => s.id === best.slotId);
          if (sl) sl.placedBoxId = null;
          best.slotId = null;
        }
        handState.grabbed = best;  // share with halo highlight
        sfx.grab();
      }
    }
    // While pinching → drag medicine to pinch midpoint
    if (hand.userData.pinching && hand.userData.grabbed) {
      _xrInv.copy(vrWorld.matrixWorld).invert();
      const local = _xrPinchMid.clone().applyMatrix4(_xrInv);
      hand.userData.grabbed.mesh.position.copy(local);
    }
    // Pinch END → snap or release
    if (!hand.userData.pinching && wasPinching && hand.userData.grabbed) {
      snapMedicineOnRelease(hand.userData.grabbed);
      hand.userData.grabbed = null;
      handState.grabbed = null;
    }
  }
}

const _tmpMat = new THREE.Matrix4();
function onControllerSelect(event) {
  const ctrl = event.target;
  _tmpMat.identity().extractRotation(ctrl.matrixWorld);
  raycaster.ray.origin.setFromMatrixPosition(ctrl.matrixWorld);
  raycaster.ray.direction.set(0, 0, -1).applyMatrix4(_tmpMat);
  handleClick();
}

// ============================================================
// Interaction state
// ============================================================
let cartonState = 'closed';   // 'closed' | 'opening' | 'open' | 'closing'
let cartonAnimT = 0;
const ANIM_DUR_FLAP = 0.9;
const ANIM_DUR_BOX  = 0.7;
const FLAP_OPEN_ANGLE = Math.PI * 0.62;   // positive: swing UP then outward (correct hinge motion)

setFlapAngle(0);

// Hint label
const hint = document.createElement('div');
hint.style.cssText = 'position:absolute;bottom:14px;left:50%;transform:translateX(-50%);background:rgba(0,0,0,0.65);color:#fff;padding:8px 16px;border-radius:20px;font-size:13px;font-family:system-ui,sans-serif;z-index:10;pointer-events:none;transition:opacity .3s';
hint.textContent = '🖱️ Bấm vào thùng để mở';
document.body.appendChild(hint);
function setHint(msg) { hint.textContent = msg; hint.style.opacity = msg ? '1' : '0'; }

// ============================================================
// Raycaster
// ============================================================
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
let dragStart = null;
let mouseDragMed = null;
const _mouseRayDir = new THREE.Vector3();
const _mouseHit = new THREE.Vector3();
const _mouseInvVrWorld = new THREE.Matrix4();

function ndcFromEvent(e) {
  const rect = renderer.domElement.getBoundingClientRect();
  mouse.x = ((e.clientX - rect.left) / rect.width)  * 2 - 1;
  mouse.y = -((e.clientY - rect.top)  / rect.height) * 2 + 1;
}

renderer.domElement.addEventListener('pointerdown', (e) => {
  dragStart = { x: e.clientX, y: e.clientY };
  // Mouse fallback grab — chỉ khi carton đã mở và chưa cầm bằng tay
  if (trainingCartonState === 'open' && !handState.grabbed) {
    ndcFromEvent(e);
    raycaster.setFromCamera(mouse, camera);
    const visMeshes = medicineBoxes.filter(m => m.mesh.visible).map(m => m.mesh);
    const hits = raycaster.intersectObjects(visMeshes, false);
    if (hits.length) {
      mouseDragMed = medicineBoxes.find(m => m.mesh === hits[0].object);
      controls.enabled = false;
      if (mouseDragMed.slotId) {
        const sl = slots.find(x => x.id === mouseDragMed.slotId);
        if (sl) sl.placedBoxId = null;
        mouseDragMed.slotId = null;
      }
      handState.grabbed = mouseDragMed;   // reuse grab state cho hover halo
      setHint('🖱️ Kéo đến đúng ô rồi nhả chuột');
      renderer.domElement.setPointerCapture?.(e.pointerId);
      dragStart = null;
    }
  }
});

renderer.domElement.addEventListener('pointermove', (e) => {
  if (!mouseDragMed) return;
  ndcFromEvent(e);
  raycaster.setFromCamera(mouse, camera);
  camera.getWorldDirection(_mouseRayDir);
  _grabPlane.setFromNormalAndCoplanarPoint(_mouseRayDir, worldCartonCenter);
  if (raycaster.ray.intersectPlane(_grabPlane, _mouseHit)) {
    _mouseInvVrWorld.copy(vrWorld.matrixWorld).invert();
    mouseDragMed.mesh.position.copy(_mouseHit).applyMatrix4(_mouseInvVrWorld);
  }
});

renderer.domElement.addEventListener('pointerup', (e) => {
  if (mouseDragMed) {
    snapMedicineOnRelease(mouseDragMed);
    mouseDragMed = null;
    handState.grabbed = null;
    controls.enabled = true;
    return;
  }
  // VR-Preview (pointer-locked): raycast from screen center
  if (vrPreview.active && document.pointerLockElement === renderer.domElement) {
    mouse.set(0, 0);
    raycaster.setFromCamera(mouse, camera);
    handleClick();
    return;
  }
  if (!dragStart) return;
  const dx = e.clientX - dragStart.x, dy = e.clientY - dragStart.y;
  dragStart = null;
  if (Math.hypot(dx, dy) > 5) return;   // drag, not a click
  ndcFromEvent(e);
  raycaster.setFromCamera(mouse, camera);
  handleClick();
});

// ----- Crosshair shown in VR-Preview mode (so the user knows where they're aiming) -----
const crosshair = document.createElement('div');
crosshair.style.cssText = 'position:absolute;top:50%;left:50%;width:10px;height:10px;margin:-5px 0 0 -5px;border:2px solid #fff;border-radius:50%;box-shadow:0 0 0 1px rgba(0,0,0,0.5);pointer-events:none;z-index:9;display:none';
document.body.appendChild(crosshair);
document.addEventListener('pointerlockchange', () => {
  crosshair.style.display = (document.pointerLockElement === renderer.domElement) ? 'block' : 'none';
});

// Shared click handler — raycaster.ray must already be set by the caller
function handleClick() {
  // Mouse-click cũng có thể mở training carton (cho ai không bật điều khiển tay)
  if (trainingCartonState === 'closed') {
    if (raycaster.intersectObjects(trainingCartonHits, false).length) {
      openTrainingCarton();
      return;
    }
  }
  // Carton 48 hộp cũ (đang ẩn) — bỏ qua nếu không visible
  if (!carton.visible) return;
  if (cartonState === 'closed') {
    const cartonHits = [bottom, wallFront, wallBack, wallLeft, wallRight,
                        flapFront.userData.mesh, flapBack.userData.mesh,
                        flapLeft.userData.mesh, flapRight.userData.mesh];
    if (raycaster.intersectObjects(cartonHits, false).length) {
      cartonState = 'opening'; cartonAnimT = 0;
      setHint('Đang mở thùng…');
    }
  } else if (cartonState === 'open') {
    const hits = raycaster.intersectObjects(boxes.map(b => b.mesh), false);
    if (hits.length) {
      const b = boxes.find(x => x.mesh === hits[0].object);
      if (b.state === 'in') { b.state = 'extracting'; b.animT = 0; setHint('Đang lấy hộp ra…'); }
      else if (b.state === 'out') { b.state = 'inserting'; b.animT = 0; setHint('Đang đặt lại vào thùng…'); }
    }
  }
}

// ============================================================
// HAND TRACKING — MediaPipe HandLandmarker (pinch ngón cái + trỏ để cầm hộp)
// ============================================================
const handState = {
  landmarker: null,
  video: null,
  running: false,
  lastVideoTime: -1,
  pinching: false,
  grabbed: null,
};

// 3D cursor — small sphere that follows the index/thumb midpoint in world space
const handCursor = new THREE.Mesh(
  new THREE.SphereGeometry(0.025, 16, 16),
  new THREE.MeshBasicMaterial({ color: 0x00ddff, transparent: true, opacity: 0.85, depthTest: false })
);
handCursor.renderOrder = 999;
handCursor.visible = false;
scene.add(handCursor);

// UI: toggle button (top-right) + webcam preview canvas with landmarks
const handBtn = document.createElement('button');
handBtn.textContent = '🖐️ Bật điều khiển tay';
handBtn.style.cssText = 'position:absolute;top:12px;right:12px;z-index:11;padding:8px 14px;font-size:13px;font-family:system-ui,sans-serif;background:#1f8a3a;color:#fff;border:none;border-radius:8px;cursor:pointer;box-shadow:0 2px 8px rgba(0,0,0,0.15)';
document.body.appendChild(handBtn);

const camPreview = document.createElement('canvas');
camPreview.width = 200; camPreview.height = 150;
camPreview.style.cssText = 'position:absolute;top:56px;right:12px;z-index:11;border-radius:8px;background:#000;box-shadow:0 2px 8px rgba(0,0,0,0.2);display:none;transform:scaleX(-1)';
document.body.appendChild(camPreview);
const camCtx = camPreview.getContext('2d');

async function initHandTracking() {
  handBtn.disabled = true;
  handBtn.textContent = '⏳ Đang tải MediaPipe…';
  try {
    const { HandLandmarker, FilesetResolver } = await import('/vendor/mediapipe/vision_bundle.mjs');
    const fileset = await FilesetResolver.forVisionTasks('/vendor/mediapipe/wasm');
    handState.landmarker = await HandLandmarker.createFromOptions(fileset, {
      baseOptions: {
        modelAssetPath: '/models/hand_landmarker.task',
        delegate: 'GPU',
      },
      runningMode: 'VIDEO',
      numHands: 1,
    });

    const stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: 'user', width: 640, height: 480 },
      audio: false,
    });
    handState.video = document.createElement('video');
    handState.video.srcObject = stream;
    handState.video.autoplay = true;
    handState.video.muted = true;
    handState.video.playsInline = true;
    await new Promise(r => (handState.video.onloadedmetadata = r));
    await handState.video.play();

    handState.running = true;
    camPreview.style.display = 'block';
    handCursor.visible = true;
    handBtn.textContent = '✋ Tắt điều khiển tay';
    handBtn.style.background = '#b03a3a';
    handBtn.disabled = false;
    setHint('🖐️ Chụm ngón cái + trỏ để cầm hộp · Mở tay để buông');
  } catch (err) {
    handBtn.disabled = false;
    handBtn.textContent = '🖐️ Bật điều khiển tay';
    const msg =
      err.name === 'NotAllowedError' || err.name === 'NotFoundError'
        ? 'Cần cấp quyền camera (mở qua http://localhost, không phải file://)'
        : err.message;
    setHint('❌ Hand tracking lỗi: ' + msg);
  }
}

function stopHandTracking() {
  handState.running = false;
  handState.video?.srcObject?.getTracks().forEach(t => t.stop());
  handState.video = null;
  camPreview.style.display = 'none';
  handCursor.visible = false;
  if (handState.grabbed) handState.grabbed = null;
  handState.pinching = false;
  handBtn.textContent = '🖐️ Bật điều khiển tay';
  handBtn.style.background = '#1f8a3a';
  setHint('🖐️ Bật điều khiển tay để xếp thuốc lên kệ');
}

// Khi pinch nhả — tìm slot gần nhất, snap nếu đủ gần, else thả về bàn
function snapMedicineOnRelease(med) {
  let best = null, bestDist = Infinity;
  for (const s of slots) {
    const d = med.mesh.position.distanceTo(s.localCenter);
    if (d < bestDist) { bestDist = d; best = s; }
  }
  if (best && bestDist < SNAP_DIST) {
    // Slot đã có hộp khác → đẩy nó về vị trí ban đầu
    if (best.placedBoxId && best.placedBoxId !== med.id) {
      const ex = medicineBoxes.find(m => m.id === best.placedBoxId);
      if (ex) { ex.mesh.position.copy(ex.initialPos); ex.slotId = null; }
    }
    med.mesh.position.copy(best.localCenter);
    best.placedBoxId = med.id;
    med.slotId = best.id;
    if (best.category === med.category) sfx.correct(); else sfx.wrong();
    setHint(`📦 Đặt "${med.name}" vào ô "${best.category}"`);
    return;
  }
  // Không snap → đặt lại trên đỉnh carton ở vị trí xz hiện tại (clamp vào lòng carton)
  med.mesh.position.x = Math.max(-T_CW/2 + MED_W/2, Math.min(T_CW/2 - MED_W/2, med.mesh.position.x));
  med.mesh.position.z = Math.max(TRAINING_CARTON_Z - 0.3, Math.min(TRAINING_CARTON_Z + 0.3, med.mesh.position.z));
  med.mesh.position.y = MED_REVEAL_Y;
  setHint('🖐️ Chụm ngón cái + trỏ để cầm hộp · Nộp bài khi xong');
}

// Detect insecure context: webcam yêu cầu HTTPS hoặc localhost
const SECURE_FOR_CAMERA = window.isSecureContext && !!navigator.mediaDevices?.getUserMedia;
if (!SECURE_FOR_CAMERA) {
  handBtn.textContent = '🖱️ Chỉ có chuột (webcam cần HTTPS)';
  handBtn.style.background = '#6b7280';
  handBtn.style.cursor = 'help';
  handBtn.title = `Webcam chỉ chạy trên HTTPS hoặc localhost. Bạn đang ở: ${location.host}\nChrome chặn camera trên HTTP IP LAN. Dùng chuột để chơi.`;
  handBtn.addEventListener('click', () => {
    setHint('⚠️ Webcam cần HTTPS. Đang ở ' + location.host + ' — chỉ chơi được bằng chuột');
  });
} else {
  handBtn.addEventListener('click', () => {
    handState.running ? stopHandTracking() : initHandTracking();
  });
}

const _handNDC = new THREE.Vector2();
const _grabPlane = new THREE.Plane();
const _grabPoint = new THREE.Vector3();
const _camDir = new THREE.Vector3();
const _grabLocal = new THREE.Vector3();
const _invVrWorld = new THREE.Matrix4();

function updateHandTracking(time) {
  if (!handState.running || !handState.landmarker || !handState.video) return;
  if (renderer.xr.isPresenting) return;
  if (handState.video.currentTime === handState.lastVideoTime) return;
  handState.lastVideoTime = handState.video.currentTime;

  const result = handState.landmarker.detectForVideo(handState.video, time);
  camCtx.drawImage(handState.video, 0, 0, camPreview.width, camPreview.height);

  if (!result.landmarks || result.landmarks.length === 0) {
    handCursor.visible = false;
    if (handState.grabbed) handState.grabbed = null;
    handState.pinching = false;
    return;
  }

  const lm = result.landmarks[0];
  const thumb = lm[4], index = lm[8];

  // Draw landmarks on the preview canvas
  camCtx.fillStyle = '#00ddff';
  for (const p of lm) {
    camCtx.beginPath();
    camCtx.arc(p.x * camPreview.width, p.y * camPreview.height, 3, 0, Math.PI * 2);
    camCtx.fill();
  }
  camCtx.strokeStyle = handState.pinching ? '#ff5722' : '#ffffff';
  camCtx.lineWidth = 2;
  camCtx.beginPath();
  camCtx.moveTo(thumb.x * camPreview.width, thumb.y * camPreview.height);
  camCtx.lineTo(index.x * camPreview.width, index.y * camPreview.height);
  camCtx.stroke();

  // Selfie webcam: mirror x so the cursor matches the user's perspective
  const px = (thumb.x + index.x) / 2;
  const py = (thumb.y + index.y) / 2;
  _handNDC.x = (1 - px) * 2 - 1;
  _handNDC.y = -(py * 2 - 1);
  raycaster.setFromCamera(_handNDC, camera);

  // Project onto a camera-facing plane through the carton center → gives the cursor a sensible depth
  camera.getWorldDirection(_camDir);
  _grabPlane.setFromNormalAndCoplanarPoint(_camDir, worldCartonCenter);
  if (raycaster.ray.intersectPlane(_grabPlane, _grabPoint)) {
    handCursor.position.copy(_grabPoint);
  }

  // Pinch detection with hysteresis (close < 0.05, open > 0.08) to avoid flicker
  const pinchDist = Math.hypot(thumb.x - index.x, thumb.y - index.y);
  const wasPinching = handState.pinching;
  if (!handState.pinching && pinchDist < 0.05) handState.pinching = true;
  else if (handState.pinching && pinchDist > 0.08) handState.pinching = false;

  // Pinch start
  if (handState.pinching && !wasPinching) {
    // 1) Carton còn đóng → pinch vào thùng để mở
    if (trainingCartonState === 'closed') {
      if (raycaster.intersectObjects(trainingCartonHits, false).length) {
        openTrainingCarton();
      }
    } else if (trainingCartonState === 'open') {
      // 2) Carton đã mở → cố bắt một hộp đang hiển thị
      const visibleMeshes = medicineBoxes.filter(m => m.mesh.visible).map(m => m.mesh);
      const hits = raycaster.intersectObjects(visibleMeshes, false);
      if (hits.length) {
        handState.grabbed = medicineBoxes.find(m => m.mesh === hits[0].object);
        if (handState.grabbed.slotId) {
          const s = slots.find(x => x.id === handState.grabbed.slotId);
          if (s) s.placedBoxId = null;
          handState.grabbed.slotId = null;
        }
        setHint('✊ Đang cầm — thả gần ô đúng để snap');
      }
    }
  }

  // Pinch release → snap-to-slot hoặc thả về bàn
  if (!handState.pinching && wasPinching && handState.grabbed) {
    snapMedicineOnRelease(handState.grabbed);
    handState.grabbed = null;
  }

  // While grabbing → move the box to the hand position (convert world → vrWorld local)
  if (handState.grabbed && handState.pinching) {
    _invVrWorld.copy(vrWorld.matrixWorld).invert();
    _grabLocal.copy(_grabPoint).applyMatrix4(_invVrWorld);
    handState.grabbed.mesh.position.copy(_grabLocal);
  }

  handCursor.visible = !handState.grabbed;
  handCursor.material.color.setHex(handState.pinching ? 0xff5722 : 0x00ddff);
}

// ============================================================
// SCORING UI — Nộp bài / Làm lại / kết quả chi tiết
// ============================================================
const submitBtn = document.createElement('button');
submitBtn.textContent = '📝 Nộp bài';
submitBtn.style.cssText = 'position:absolute;bottom:14px;right:12px;z-index:11;padding:10px 18px;font-size:14px;font-weight:600;font-family:system-ui,sans-serif;background:#1976d2;color:#fff;border:none;border-radius:8px;cursor:pointer;box-shadow:0 2px 8px rgba(0,0,0,0.2)';
document.body.appendChild(submitBtn);

const resetBtn = document.createElement('button');
resetBtn.textContent = '🔄 Làm lại';
resetBtn.style.cssText = 'position:absolute;bottom:14px;right:128px;z-index:11;padding:10px 18px;font-size:14px;font-family:system-ui,sans-serif;background:#fafafa;color:#333;border:1px solid #ccc;border-radius:8px;cursor:pointer;box-shadow:0 2px 8px rgba(0,0,0,0.15)';
document.body.appendChild(resetBtn);

const resultPanel = document.createElement('div');
resultPanel.style.cssText = 'position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);z-index:20;background:#fff;padding:24px 28px;border-radius:12px;box-shadow:0 8px 32px rgba(0,0,0,0.3);min-width:380px;max-width:520px;font-family:system-ui,sans-serif;display:none';
document.body.appendChild(resultPanel);

submitBtn.addEventListener('click', () => {
  let correct = 0, placed = 0;
  const items = medicineBoxes.map(med => {
    if (!med.slotId) {
      return `<li style="color:#9e9e9e">⚠️ <b>${med.name}</b> — chưa đặt lên kệ</li>`;
    }
    placed++;
    const slot = slots.find(s => s.id === med.slotId);
    if (slot.category === med.category) {
      correct++;
      return `<li style="color:#2e7d32">✅ <b>${med.name}</b> — đúng ô <b>"${slot.category}"</b></li>`;
    }
    return `<li style="color:#c62828">❌ <b>${med.name}</b> — thuộc "<b>${med.category}</b>", đặt nhầm ở "<b>${slot.category}</b>"</li>`;
  });
  const total = medicineBoxes.length;
  const pct = Math.round((correct / total) * 100);
  const verdict = pct === 100 ? '🎉 Hoàn hảo!' : pct >= 75 ? '👍 Khá tốt' : pct >= 50 ? '🙂 Cần luyện thêm' : '📚 Hãy ôn lại phân loại thuốc';
  resultPanel.innerHTML = `
    <div style="font-size:14px;color:#666;text-align:center">${verdict}</div>
    <div style="font-size:28px;font-weight:700;text-align:center;margin:4px 0 4px;color:${pct === 100 ? '#2e7d32' : pct >= 50 ? '#1976d2' : '#c62828'}">${correct}/${total} · ${pct}%</div>
    <div style="text-align:center;color:#888;font-size:12px;margin-bottom:14px">${placed}/${total} hộp đã đặt lên kệ</div>
    <ul style="list-style:none;padding:0;margin:0 0 16px 0;line-height:1.9;font-size:14px">${items.join('')}</ul>
    <div style="text-align:right;display:flex;gap:8px;justify-content:flex-end">
      <a href="./" style="padding:8px 18px;background:#fafafa;color:#333;border:1px solid #ccc;border-radius:6px;font-size:14px;text-decoration:none">← Trang chính</a>
      <button id="close-result" style="padding:8px 18px;background:#1976d2;color:#fff;border:none;border-radius:6px;font-size:14px;cursor:pointer">Đóng</button>
    </div>
  `;
  resultPanel.style.display = 'block';
  document.getElementById('close-result').onclick = () => resultPanel.style.display = 'none';

  // Submit attempt to backend (score = correct * 25 for a 4-box game, range 0..100)
  submitAttempt({
    version: '3d-shelf',
    score: pct,
    correct,
    total,
    durationMs: Date.now() - sessionStartedAt,
    details: {
      placed,
      breakdown: medicineBoxes.map(med => ({
        name: med.name, category: med.category,
        placedIn: slots.find(s => s.id === med.slotId)?.category ?? null,
      })),
    },
  });
});

resetBtn.addEventListener('click', () => {
  for (const s of slots) s.placedBoxId = null;
  resetTrainingCarton();   // đóng carton + ẩn 4 hộp về vị trí ban đầu
  resultPanel.style.display = 'none';
  setHint('🖐️ Bật điều khiển tay rồi pinch vào thùng để mở');
});

// Cập nhật hint khởi đầu cho phù hợp MVP đào tạo
setHint('🖐️ Bật điều khiển tay rồi pinch vào thùng để mở');

// ============================================================
// HOVER LABEL — DOM tooltip projecting medicine info while mouse/hand hovers
// (inspired by Unity chemistry-lab "Press E to interact" overlay)
// ============================================================
const hoverLabel = document.createElement('div');
hoverLabel.id = 'hover-label';
hoverLabel.innerHTML = '<div class="ht"></div><div class="hs"></div><div class="hc"></div>';
document.body.appendChild(hoverLabel);

const hoverPress = document.createElement('div');
hoverPress.id = 'hover-press';
hoverPress.innerHTML = 'Pinch hoặc <span class="kb">click</span> để cầm';
document.body.appendChild(hoverPress);

let hoverTarget = null;          // current medicine being hovered (renderer-loop projects its world pos)
const _hoverWorld = new THREE.Vector3();
const _hoverProj = new THREE.Vector3();
let lastHoverNDC = { x: 0, y: 0, valid: false };

function setHoverTarget(med) {
  if (med === hoverTarget) return;
  hoverTarget = med;
  if (!med) {
    hoverLabel.classList.remove('shown');
    hoverPress.classList.remove('shown');
    return;
  }
  hoverLabel.style.setProperty('--cat-color', med.color);
  hoverLabel.querySelector('.ht').textContent = med.name;
  hoverLabel.querySelector('.hs').textContent = `${med.dose ?? ''} · ${med.form ?? ''}`.replace(/^\s·\s|·\s$/g, '');
  hoverLabel.querySelector('.hc').textContent = med.category;
  hoverLabel.classList.add('shown');
  // Show "Pinch/click to grab" hint only if user hasn't grabbed yet AND box not placed in slot
  if (!handState.grabbed && !mouseDragMed && !med.slotId) hoverPress.classList.add('shown');
  else hoverPress.classList.remove('shown');
}

function pickHoverFromNDC(x, y) {
  if (trainingCartonState !== 'open') return null;
  mouse.set(x, y);
  raycaster.setFromCamera(mouse, camera);
  const visMeshes = medicineBoxes.filter(m => m.mesh.visible).map(m => m.mesh);
  const hits = raycaster.intersectObjects(visMeshes, false);
  if (!hits.length) return null;
  return medicineBoxes.find(m => m.mesh === hits[0].object) || null;
}

// Cập nhật hover từ chuột (chỉ khi không đang kéo)
renderer.domElement.addEventListener('pointermove', (e) => {
  if (mouseDragMed) { lastHoverNDC.valid = false; return; }
  const rect = renderer.domElement.getBoundingClientRect();
  lastHoverNDC.x = ((e.clientX - rect.left) / rect.width)  * 2 - 1;
  lastHoverNDC.y = -((e.clientY - rect.top)  / rect.height) * 2 + 1;
  lastHoverNDC.valid = true;
  setHoverTarget(pickHoverFromNDC(lastHoverNDC.x, lastHoverNDC.y));
});
renderer.domElement.addEventListener('pointerleave', () => {
  lastHoverNDC.valid = false;
  setHoverTarget(null);
});

// Hand-tracking hover: when MediaPipe hand cursor is near a medicine, highlight that box.
// We expose a function the hand tracking loop can call after updating handCursor.
function updateHoverFromHandCursor() {
  if (!handState.running || handState.grabbed || trainingCartonState !== 'open') return;
  let best = null, bestDist = Infinity;
  // handCursor.position is in world space — convert each medicine to world
  for (const med of medicineBoxes) {
    if (!med.mesh.visible) continue;
    med.mesh.getWorldPosition(_hoverWorld);
    const d = handCursor.position.distanceTo(_hoverWorld);
    if (d < bestDist) { bestDist = d; best = med; }
  }
  // ~25cm in vrWorld scale ≈ 0.25 * 0.06 = 0.015 world units. Use a generous radius.
  if (best && bestDist < 0.08) setHoverTarget(best); else if (!lastHoverNDC.valid) setHoverTarget(null);
}

// Per-frame: project hovered box → screen → position label
function updateHoverLabelPosition() {
  if (!hoverTarget) return;
  hoverTarget.mesh.getWorldPosition(_hoverWorld);
  _hoverProj.copy(_hoverWorld).project(camera);
  if (_hoverProj.z > 1 || _hoverProj.z < -1) {
    hoverLabel.classList.remove('shown');
    hoverPress.classList.remove('shown');
    return;
  }
  const x = (_hoverProj.x * 0.5 + 0.5) * innerWidth;
  const y = (-_hoverProj.y * 0.5 + 0.5) * innerHeight;
  // Approximate object top by offsetting by ~half its height in screen space:
  // We project a second point at the top of the box to anchor the arrow above the object.
  const top = _hoverWorld.clone();
  top.y += MED_H / 2 * vrWorld.scale.y;     // top of the medicine mesh in world space
  top.project(camera);
  const topY = (-top.y * 0.5 + 0.5) * innerHeight;
  hoverLabel.style.left = x + 'px';
  hoverLabel.style.top = Math.max(topY, 60) + 'px';
  hoverPress.style.left = x + 'px';
  hoverPress.style.top = y + 'px';
}

// ============================================================
// Animation tick
// ============================================================
const clock = new THREE.Clock();
const easeOutCubic = t => 1 - Math.pow(1 - t, 3);
const lerp = (a, b, t) => a + (b - a) * t;

addEventListener('resize', () => {
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight);
});

renderer.setAnimationLoop(function tick(time) {
  const dt = clock.getDelta();
  updateHandTracking(time ?? performance.now());
  updateXRHands();
  updateHoverFromHandCursor();
  updateHoverLabelPosition();
  // Re-pick hover when camera moved (orbit) so label sticks to the right box.
  // Only do this if the cursor stayed on screen but the camera scrolled.
  if (lastHoverNDC.valid && !hoverTarget && trainingCartonState === 'open' && !mouseDragMed) {
    setHoverTarget(pickHoverFromNDC(lastHoverNDC.x, lastHoverNDC.y));
  }
  if (hoverTarget && (mouseDragMed || handState.grabbed)) setHoverTarget(null);

  // Training carton flap animation (visual only — state transition handled
  // by setTimeout fallback in openTrainingCarton để chịu được throttle iframe)
  if (trainingCartonState === 'opening') {
    trainingCartonAnimT = Math.min(1, trainingCartonAnimT + dt / TRAINING_FLAP_DUR);
    setTrainingFlapAngle(lerp(0, TRAINING_FLAP_OPEN_ANGLE, easeOutCubic(trainingCartonAnimT)));
  }

  // Hover-slot highlight: khi đang cầm hộp, ô gần nhất glow xanh (đúng nhóm) hoặc đỏ (sai)
  for (const s of slots) s.halo.material.opacity = 0;
  if (handState.grabbed) {
    let best = null, bestDist = Infinity;
    for (const s of slots) {
      const d = handState.grabbed.mesh.position.distanceTo(s.localCenter);
      if (d < bestDist) { bestDist = d; best = s; }
    }
    if (best && bestDist < SNAP_DIST) {
      const correct = best.category === handState.grabbed.category;
      best.halo.material.color.setHex(correct ? 0x43a047 : 0xe53935);
      best.halo.material.opacity = 0.35;
    }
  }

  // Carton flap animation
  if (cartonState === 'opening') {
    cartonAnimT = Math.min(1, cartonAnimT + dt / ANIM_DUR_FLAP);
    setFlapAngle(lerp(0, FLAP_OPEN_ANGLE, easeOutCubic(cartonAnimT)));
    if (cartonAnimT >= 1) { cartonState = 'open'; setHint('🖱️ Bấm vào một hộp thuốc để lấy ra'); }
  } else if (cartonState === 'closing') {
    cartonAnimT = Math.min(1, cartonAnimT + dt / ANIM_DUR_FLAP);
    setFlapAngle(lerp(FLAP_OPEN_ANGLE, 0, easeOutCubic(cartonAnimT)));
    if (cartonAnimT >= 1) { cartonState = 'closed'; setHint('🖱️ Bấm vào thùng để mở'); }
  }

  // Per-box animation
  for (const b of boxes) {
    if (b.state === 'extracting') {
      b.animT = Math.min(1, b.animT + dt / ANIM_DUR_BOX);
      const k = easeOutCubic(b.animT);
      // Lift the box well above the carton, keeping its X/Z column position
      const targetY = CH + H/2 + 0.3 + b.iy * 0.0;
      b.mesh.position.y = lerp(b.baseY, targetY, k);
      if (b.animT >= 1) b.state = 'out';
    } else if (b.state === 'inserting') {
      b.animT = Math.min(1, b.animT + dt / ANIM_DUR_BOX);
      const k = easeOutCubic(b.animT);
      const startY = CH + H/2 + 0.3;
      b.mesh.position.y = lerp(startY, b.baseY, k);
      if (b.animT >= 1) b.state = 'in';
    }
  }

  updateVRPreview(dt);
  updateLights();
  if (!renderer.xr.isPresenting && !vrPreview.active) controls.update();
  renderer.render(scene, camera);
});
