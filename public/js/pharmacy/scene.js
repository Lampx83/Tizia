// GPP 3D Pharmacy scene — full port từ Pharmacy-AI/src/components/scenes/GppScene.tsx.
// Bao gồm: 4 tủ sau + 3 tủ bên + quầy + POS + label tray + pick tray ·
// Fridge 5-ngăn + 13 stocks + door hinge animation · Consult desk · Pharmacist/Patient GLB
// với idle animation · Ceiling fan + AC + 2 plants sway · Tool tray (scissors/tape/pen/notepad)
// · barcode_scanner + receipt_printer · WaitingChair · 11 camera presets với 700ms lerp.
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { CABINETS, ALL_DRUGS, PHARMACY_INFO } from './catalog.js?v=ph0682';
import { DRUG_PLACEMENT } from './drug-placement.js?v=ph0682';
import { createCharacter } from './character.js?v=ph0682';

const MODELS_BASE = './models/pharmacy/';

// ── Thiết bị/dụng cụ y tế đặc thù: TẢI MODEL .glb (CC0/CC-BY) thay vì vẽ tay.
// Khớp theo TÊN (bền với việc đổi id khi tái sinh data). Model trong
// public/models/pharmacy/devices/. opt: {scale,rotY,yOff} tinh chỉnh sau khi xem.
const DEVICE_MODELS = [
  { match: /nhiệt kế/i,  file: 'thermometer.glb' },
  { match: /\bbông\b/i,  file: 'cotton.glb' },
  { match: /\bgạc\b/i,   file: 'gauze.glb' },
  // Khẩu trang + Máy đo huyết áp: chưa có model CC0 tải tự động → giữ hộp tạm,
  // có thể dán link .glb sau (thêm dòng { match:/khẩu trang/i, file:'mask.glb' }).
];
export function deviceModelFor(drug) {
  const n = (drug.brand || drug.name || '') + ' ' + (drug.category || '');
  return DEVICE_MODELS.find(d => d.match.test(n)) || null;
}
const _deviceModelCache = new Map();
function loadDeviceModel(file) {
  if (!_deviceModelCache.has(file)) {
    _deviceModelCache.set(file, new Promise((res, rej) => {
      new GLTFLoader().load(`${MODELS_BASE}devices/${file}`, g => res(g.scene), undefined, rej);
    }));
  }
  return _deviceModelCache.get(file);
}
// Đặt model GLB vào group: scale theo chiều cao style, canh tâm tại gốc (group sẽ
// được đặt tại tâm ô như hộp thường), đáy chạm kệ.
function fitDeviceModel(group, src, style, opt = {}) {
  const m = src.clone(true);
  m.traverse(o => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = true; } });
  let bb = new THREE.Box3().setFromObject(m);
  const size = new THREE.Vector3(); bb.getSize(size);
  const maxDim = Math.max(size.x, size.y, size.z) || 1;
  const target = Math.max(style.w, style.h) * 1.35;           // to vừa ô, dễ nhìn
  m.scale.setScalar((opt.scale || 1) * target / maxDim);
  if (opt.rotY) m.rotation.y = opt.rotY;
  bb = new THREE.Box3().setFromObject(m);
  const c = new THREE.Vector3(); bb.getCenter(c);
  const sz = new THREE.Vector3(); bb.getSize(sz);
  m.position.x -= c.x; m.position.z -= c.z;                   // canh tâm ngang
  m.position.y -= (c.y - sz.y / 2);                           // đáy về 0
  m.position.y -= style.h / 2;                                // group đặt tại tâm ô → kéo xuống nửa chiều cao
  m.position.y += (opt.yOff || 0);
  group.add(m);
}

// ── Deterministic box rendering helpers (port 1-1 từ upstream) ──────────────
const DRUG_ACCENT_PALETTE = [
  '#dc2626','#ea580c','#d97706','#ca8a04','#65a30d','#16a34a','#059669','#0d9488',
  '#0891b2','#0284c7','#2563eb','#4f46e5','#7c3aed','#9333ea','#c026d3','#db2777',
  '#e11d48','#b45309','#92400e','#155e75','#1e40af','#3730a3','#581c87','#831843','#7f1d1d'
];
const TABLET_DIMS = [
  {w:0.078,h:0.135,d:0.050},{w:0.086,h:0.150,d:0.055},{w:0.094,h:0.140,d:0.055},
  {w:0.090,h:0.165,d:0.060},{w:0.082,h:0.155,d:0.050},{w:0.098,h:0.130,d:0.060},
  {w:0.074,h:0.145,d:0.050}
];
const SYRUP_DIMS  = [{w:0.085,h:0.205,d:0.072},{w:0.080,h:0.220,d:0.068},{w:0.090,h:0.185,d:0.075}];
const SPRAY_DIMS  = [{w:0.072,h:0.225,d:0.058},{w:0.065,h:0.205,d:0.055},{w:0.078,h:0.215,d:0.062}];
const DROP_DIMS   = [{w:0.055,h:0.110,d:0.040},{w:0.060,h:0.120,d:0.045},{w:0.050,h:0.100,d:0.038}];
const BOTTLE_DIMS = [{w:0.078,h:0.160,d:0.058},{w:0.083,h:0.150,d:0.062},{w:0.072,h:0.175,d:0.055}];
const TUBE_DIMS   = [{w:0.088,h:0.115,d:0.048},{w:0.078,h:0.130,d:0.045},{w:0.082,h:0.105,d:0.050}];
const AMPOULE_DIMS= [{w:0.065,h:0.125,d:0.045},{w:0.070,h:0.130,d:0.045}];
const SACHET_DIMS = [{w:0.108,h:0.092,d:0.042},{w:0.115,h:0.105,d:0.048}];
const DEVICE_DIMS = [{w:0.085,h:0.160,d:0.055},{w:0.090,h:0.150,d:0.060}];

function hashSku(s) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = (h * 16777619) >>> 0; }
  return h;
}

// Sinh meta deterministic per-SKU (stock + expiry) — không cần thêm field vào
// catalog.js. Cùng SKU luôn ra cùng giá trị, ổn định giữa các lần render.
export function getDrugMeta(drug) {
  const h = hashSku(drug.sku || drug.id);
  // Ưu tiên dữ liệu thật (tồn kho/HSD/số lô) từ danh mục; fallback hash khi thiếu.
  const stock = Number.isFinite(+drug.stock) ? +drug.stock : 5 + (h % 196);
  let expiryMonth, expiryYear;
  const m = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/.exec(String(drug.expDate || ''));
  if (m) { expiryMonth = +m[2]; expiryYear = +m[3]; }
  else {
    const baseM = 1 + (h % 37);
    expiryYear = 2026 + Math.floor((baseM - 1) / 12);
    expiryMonth = ((baseM - 1) % 12) + 1;
  }
  const mm = String(expiryMonth).padStart(2, '0');
  const lot = drug.lot || ('LOT' + h.toString(36).toUpperCase()).slice(0, 9);
  return { stock, expiry: `${mm}/${expiryYear}`, expiryMonth, expiryYear, lot };
}
function lightenHex(hex, amount = 0.18) {
  const m = /^#?([0-9a-f]{6})$/i.exec(hex);
  if (!m) return hex;
  const n = parseInt(m[1], 16);
  const r = (n >> 16) & 0xff, g = (n >> 8) & 0xff, b = n & 0xff;
  const mix = (c) => Math.round(c + (255 - c) * amount);
  return `#${[mix(r), mix(g), mix(b)].map((v) => v.toString(16).padStart(2, '0')).join('')}`;
}
// Làm SẪM/ĐẬM màu (trộn về đen) cho ~20% hộp màu — chữ sẽ chuyển trắng.
function darkenHex(hex, amount = 0.2) {
  const m = /^#?([0-9a-f]{6})$/i.exec(hex || '');
  if (!m) return hex;
  const n = parseInt(m[1], 16);
  const r = (n >> 16) & 0xff, g = (n >> 8) & 0xff, b = n & 0xff;
  const mix = (c) => Math.round(c * (1 - amount));
  return `#${[mix(r), mix(g), mix(b)].map((v) => v.toString(16).padStart(2, '0')).join('')}`;
}
// ~20% SKU dùng hộp màu sẫm + chữ trắng; còn lại nền sáng + chữ đậm (deterministic).
function isColoredBox(drug) { return (hashSku(drug.sku || drug.id || '') % 5) === 0; }
function getDrugColors(drug) {
  const h = hashSku(drug.sku);
  const accent = DRUG_ACCENT_PALETTE[h % DRUG_ACCENT_PALETTE.length];
  return { accent, body: isColoredBox(drug) ? darkenHex(accent, 0.18) : lightenHex(accent, 0.82) };
}
export function getBoxStyle(drug) {
  const h = hashSku(drug.sku);
  const f = drug.form || '';
  let dim;
  if (/siro|hỗn dịch|nước uống/i.test(f))                dim = SYRUP_DIMS[h % SYRUP_DIMS.length];
  else if (/bình xịt|xịt mũi|dung dịch xịt/i.test(f))   dim = SPRAY_DIMS[h % SPRAY_DIMS.length];
  else if (/nhỏ mắt|nhỏ giọt|ống nhỏ/i.test(f) || /^dung dịch nhỏ$/i.test(f)) dim = DROP_DIMS[h % DROP_DIMS.length];
  else if (/^lọ$|^dung dịch$/i.test(f))                  dim = BOTTLE_DIMS[h % BOTTLE_DIMS.length];
  else if (/kem bôi|gel bôi|cao xoa|mỡ/i.test(f))       dim = TUBE_DIMS[h % TUBE_DIMS.length];
  else if (/ống khí dung|ống uống|ống/i.test(f))         dim = AMPOULE_DIMS[h % AMPOULE_DIMS.length];
  else if (/gói|bột/i.test(f))                           dim = SACHET_DIMS[h % SACHET_DIMS.length];
  else if (/miếng dán/i.test(f))                         dim = { w: 0.115, h: 0.085, d: 0.035 };
  else if (/bút|que thử|thiết bị/i.test(f))             dim = DEVICE_DIMS[h % DEVICE_DIMS.length];
  else                                                    dim = TABLET_DIMS[h % TABLET_DIMS.length];
  // Đa dạng size mỗi SKU ±18% per axis từ base dim — đảm bảo không 2 SKU
  // nào hoàn toàn bằng nhau. Lấy 3 byte khác nhau của hash để 3 axis độc lập.
  const scaleW = 0.82 + (((h      ) >>> 0) % 37) / 100; // 0.82..1.18
  const scaleH = 0.82 + (((h >>  8) >>> 0) % 37) / 100;
  const scaleD = 0.88 + (((h >> 16) >>> 0) % 25) / 100; // 0.88..1.12 (đỡ vênh hộp mỏng)
  const variants = ['banner','panel','stripe','twotone','classic','flag'];
  const variant = variants[h % variants.length];
  const copies = 3;
  return {
    w: dim.w * scaleW,
    h: dim.h * scaleH,
    d: dim.d * scaleD,
    variant,
    copies
  };
}

// 11 layout templates → mỗi SKU chọn 1 theo hash để vỏ hộp đa dạng.
const LABEL_VARIANTS = ['band', 'sideStripe', 'frame', 'doubleBand', 'diagonal', 'ribbon', 'pillTop', 'plate', 'topBlock', 'verticalSplit', 'medallion'];
// 10 trang trí nền (watermark) — mỗi SKU chọn 1, vẽ MỜ dưới các lớp text
const DECOR_PATTERNS = ['cross', 'dots', 'capsule', 'corners', 'leaf', 'heart', 'star', 'wave', 'hex', 'rings'];
// 4 badge góc trên-trái (đối với hộp đủ lớn). Pick theo hash khác.
const CORNER_BADGES = ['none', 'newStar', 'fdaShield', 'crossDot'];
// Tên nhà sản xuất Việt — mock ở chân hộp, pick theo hash.
const MFG_NAMES = ['DHG Pharma', 'Imexpharm', 'Stada VN', 'Traphaco', 'Pymepharco', 'Hà Tây Pharma', 'Mediplantex', 'Domesco'];

// Vẽ watermark + chấm góc + viền trên nền — gọi NGAY SAU khi tô body, TRƯỚC khi vẽ variant.
function drawLabelDecoration(ctx, accent, decor, w, h) {
  ctx.save();
  ctx.globalAlpha = 0.08;
  ctx.fillStyle = accent;
  if (decor === 'cross') {
    const cx = w / 2, cy = h * 0.58, t = 30, s = 90;
    ctx.fillRect(cx - t/2, cy - s/2, t, s);
    ctx.fillRect(cx - s/2, cy - t/2, s, t);
  } else if (decor === 'dots') {
    for (let y = 24; y < h - 30; y += 22) {
      for (let x = 12; x < w; x += 22) {
        ctx.beginPath(); ctx.arc(x, y, 2.5, 0, Math.PI * 2); ctx.fill();
      }
    }
  } else if (decor === 'capsule') {
    ctx.translate(w/2, h*0.55);
    ctx.rotate(-Math.PI / 5);
    const cw = 150, ch = 44;
    ctx.beginPath();
    ctx.moveTo(-cw/2 + ch/2, -ch/2);
    ctx.lineTo(cw/2 - ch/2, -ch/2);
    ctx.arc(cw/2 - ch/2, 0, ch/2, -Math.PI/2, Math.PI/2);
    ctx.lineTo(-cw/2 + ch/2, ch/2);
    ctx.arc(-cw/2 + ch/2, 0, ch/2, Math.PI/2, -Math.PI/2);
    ctx.closePath(); ctx.fill();
    ctx.globalAlpha = 0.05;
    ctx.fillStyle = '#000';
    ctx.fillRect(-3, -ch/2, 6, ch);
  } else if (decor === 'corners') {
    const sz = 30;
    ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(sz, 0); ctx.lineTo(0, sz); ctx.closePath(); ctx.fill();
    ctx.beginPath(); ctx.moveTo(w, 0); ctx.lineTo(w - sz, 0); ctx.lineTo(w, sz); ctx.closePath(); ctx.fill();
    ctx.beginPath(); ctx.moveTo(0, h); ctx.lineTo(sz, h); ctx.lineTo(0, h - sz); ctx.closePath(); ctx.fill();
    ctx.beginPath(); ctx.moveTo(w, h); ctx.lineTo(w - sz, h); ctx.lineTo(w, h - sz); ctx.closePath(); ctx.fill();
  } else if (decor === 'leaf') {
    // 3 chiếc lá nghiêng (thuốc thảo dược)
    ctx.translate(w/2, h*0.55);
    for (let i = -1; i <= 1; i++) {
      ctx.save();
      ctx.rotate(i * Math.PI / 3.5);
      ctx.beginPath();
      ctx.ellipse(0, -40, 14, 40, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  } else if (decor === 'heart') {
    // Trái tim ở giữa (thuốc tim mạch / chăm sóc)
    ctx.translate(w/2, h*0.55);
    ctx.scale(2, 2);
    ctx.beginPath();
    ctx.moveTo(0, 12);
    ctx.bezierCurveTo(-22, -8, -28, 6, 0, 28);
    ctx.bezierCurveTo(28, 6, 22, -8, 0, 12);
    ctx.closePath(); ctx.fill();
  } else if (decor === 'star') {
    // 5 ngôi sao rải
    const pts = [[w*0.18, h*0.32], [w*0.78, h*0.40], [w*0.42, h*0.68], [w*0.82, h*0.78], [w*0.22, h*0.82]];
    pts.forEach(([cx, cy]) => {
      ctx.beginPath();
      for (let k = 0; k < 10; k++) {
        const r = k % 2 === 0 ? 14 : 6;
        const a = k * Math.PI / 5 - Math.PI / 2;
        const x = cx + r * Math.cos(a), y = cy + r * Math.sin(a);
        k === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.closePath(); ctx.fill();
    });
  } else if (decor === 'wave') {
    // Sóng nước (siro/dung dịch)
    ctx.strokeStyle = accent; ctx.lineWidth = 3;
    for (let y = 80; y < h - 30; y += 24) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      for (let x = 0; x <= w; x += 16) {
        ctx.lineTo(x, y + Math.sin(x / 16) * 6);
      }
      ctx.stroke();
    }
  } else if (decor === 'hex') {
    // Lưới lục giác (phân tử / hoá học)
    ctx.strokeStyle = accent; ctx.lineWidth = 2;
    const r = 18;
    for (let row = 0; row * r * 1.5 < h; row++) {
      for (let col = 0; col * r * Math.sqrt(3) < w; col++) {
        const cx = col * r * Math.sqrt(3) + (row % 2 ? r * Math.sqrt(3) / 2 : 0);
        const cy = row * r * 1.5 + r;
        if (cy > h - 30 || cy < 30) continue;
        ctx.beginPath();
        for (let k = 0; k < 6; k++) {
          const a = k * Math.PI / 3;
          const x = cx + r * 0.9 * Math.cos(a), y = cy + r * 0.9 * Math.sin(a);
          k === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.closePath(); ctx.stroke();
      }
    }
  } else if (decor === 'rings') {
    // 3 vòng tròn đồng tâm ở góc dưới-phải
    ctx.strokeStyle = accent; ctx.lineWidth = 6;
    for (let r = 30; r <= 100; r += 24) {
      ctx.beginPath(); ctx.arc(w - 10, h - 20, r, Math.PI, Math.PI * 1.5); ctx.stroke();
    }
  }
  ctx.restore();
}

// Dải hologram (gradient nhiều màu) — vẽ thay 1 dải đơn sắc khi hash chọn.
function drawHoloGradient(ctx, x, y, w, h) {
  const g = ctx.createLinearGradient(x, y, x + w, y);
  g.addColorStop(0, '#a855f7');
  g.addColorStop(0.25, '#3b82f6');
  g.addColorStop(0.5, '#10b981');
  g.addColorStop(0.75, '#f59e0b');
  g.addColorStop(1, '#ef4444');
  ctx.fillStyle = g;
  ctx.fillRect(x, y, w, h);
}

// Badge ở góc trên-trái (NEW / FDA shield / dấu thập + chấm). Pick theo hash, có khi rỗng.
function drawCornerBadge(ctx, badge, accent) {
  if (badge === 'none') return;
  ctx.save();
  if (badge === 'newStar') {
    ctx.fillStyle = '#ef4444';
    ctx.beginPath();
    const cx = 22, cy = 22;
    for (let k = 0; k < 16; k++) {
      const r = k % 2 === 0 ? 20 : 12;
      const a = k * Math.PI / 8;
      const x = cx + r * Math.cos(a), y = cy + r * Math.sin(a);
      k === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    ctx.closePath(); ctx.fill();
    ctx.fillStyle = '#ffffff'; ctx.font = 'bold 11px Inter, sans-serif';
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText('MỚI', 22, 22);
  } else if (badge === 'fdaShield') {
    // Hình khiên
    ctx.fillStyle = accent;
    ctx.beginPath();
    ctx.moveTo(8, 6); ctx.lineTo(36, 6);
    ctx.lineTo(36, 26); ctx.quadraticCurveTo(36, 40, 22, 44);
    ctx.quadraticCurveTo(8, 40, 8, 26); ctx.closePath(); ctx.fill();
    ctx.fillStyle = '#ffffff'; ctx.font = 'bold 11px Inter, sans-serif';
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText('GMP', 22, 22);
  } else if (badge === 'crossDot') {
    ctx.fillStyle = accent;
    ctx.fillRect(14, 6, 8, 32);
    ctx.fillRect(6, 18, 32, 8);
    ctx.beginPath(); ctx.arc(22, 22, 4, 0, Math.PI * 2);
    ctx.fillStyle = '#ffffff'; ctx.fill();
  }
  ctx.restore();
}

// QR code mock — lưới 7x7 chấm theo seed SKU, ở góc trái-đáy
function drawQrMock(ctx, sku, x, y, cell = 4) {
  ctx.save();
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(x, y, cell * 7, cell * 7);
  ctx.fillStyle = '#ffffff';
  let seed = 0;
  for (let i = 0; i < sku.length; i++) seed = (seed * 31 + sku.charCodeAt(i)) | 0;
  for (let i = 0; i < 49; i++) {
    if ((seed >> (i % 30)) & 1) {
      ctx.fillRect(x + (i % 7) * cell, y + Math.floor(i / 7) * cell, cell, cell);
    }
  }
  // 3 ô finder ở góc
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(x, y, cell * 2, cell * 2);
  ctx.fillRect(x + cell * 5, y, cell * 2, cell * 2);
  ctx.fillRect(x, y + cell * 5, cell * 2, cell * 2);
  ctx.restore();
}

// Mini-barcode + REG tag dưới đáy hộp (đứng sau QR 7x7 ở góc trái)
function drawLabelBottomStrip(ctx, accent, textDark, sku, w) {
  const baseY = 268;
  // Barcode giả — bắt đầu sau QR (x=42)
  ctx.fillStyle = textDark ? '#0f172a' : '#f1f5f9';
  const bx = 42;
  const seed = (sku || '').split('').reduce((a, c) => a + c.charCodeAt(0), 0);
  let x = bx;
  for (let i = 0; i < 22 && x < w - 60; i++) {
    const bw = ((seed >> i) & 3) + 1;
    if (i % 2 === 0) ctx.fillRect(x, baseY, bw, 21);
    x += bw + 1;
  }
  // REG tag bên phải — sticker vuông
  ctx.fillStyle = accent;
  ctx.fillRect(w - 50, baseY, 42, 21);
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 10px "Courier New", monospace';
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  ctx.fillText('VD-' + (sku || '').slice(-4).toUpperCase(), w - 29, baseY + 11);
}

// Nhãn mặt bên (+X / -X) — narrow + tall, brand xoay 90°. Chỉ áp cho hộp đủ dày.
export function makeDrugSideLabelTex(drug) {
  const c = document.createElement('canvas');
  c.width = 96; c.height = 320;
  const ctx = c.getContext('2d');
  const accent = drug.groupAccent || '#0d9488';
  const body   = drug.bodyColor || '#f8fafc';
  const textDark = drug.textDark !== false;
  const darkText = textDark ? '#0f172a' : '#ffffff';
  const subText  = textDark ? '#475569' : '#cbd5e1';
  const brand    = (drug.brand || drug.name || '').slice(0, 20);
  const strength = (drug.strength || '').slice(0, 18);
  const generic  = (drug.generic || '').slice(0, 22);

  ctx.fillStyle = body; ctx.fillRect(0, 0, 96, 320);
  // Dải accent đầu + đuôi
  ctx.fillStyle = accent;
  ctx.fillRect(0, 0, 96, 18);
  ctx.fillRect(0, 302, 96, 18);
  ctx.fillRect(0, 158, 96, 4);
  // Hatching trang trí chéo bên dưới chia 2
  ctx.save();
  ctx.globalAlpha = 0.08; ctx.strokeStyle = accent; ctx.lineWidth = 2;
  for (let y = 170; y < 290; y += 12) {
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(96, y - 24); ctx.stroke();
  }
  ctx.restore();

  // Brand xoay 90° (đọc từ dưới lên)
  ctx.save();
  ctx.translate(48, 90);
  ctx.rotate(-Math.PI / 2);
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  ctx.fillStyle = darkText;
  ctx.font = 'bold 22px Inter, sans-serif';
  ctx.fillText(brand, 0, -8);
  ctx.fillStyle = subText;
  ctx.font = 'italic 16px Inter, sans-serif';
  ctx.fillText(generic, 0, 16);
  ctx.restore();
  // Strength dọc nửa dưới
  ctx.save();
  ctx.translate(48, 240);
  ctx.rotate(-Math.PI / 2);
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  ctx.fillStyle = accent;
  ctx.font = 'bold 22px Inter, sans-serif';
  ctx.fillText(strength, 0, 0);
  ctx.restore();
  // Mã SKU nhỏ ở đáy
  ctx.fillStyle = textDark ? '#7c2d12' : '#fed7aa';
  ctx.font = 'bold 11px "Courier New", monospace';
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  ctx.fillText((drug.sku || '').toUpperCase(), 48, 314);

  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  return tex;
}

// Vẽ text căn giữa, TỰ THU NHỎ font khi quá rộng — tránh tràn ra ngoài mép
// canvas khi brand/generic dài (vd "Cloramphenicol nhỏ mắt"). Đọc ctx.font
// hiện tại để parse size, scale xuống nếu cần, restore font ban đầu sau khi vẽ.
function fitText(ctx, text, cx, cy, maxW) {
  if (!text) return;
  const orig = ctx.font;
  // ctx.font format: "[style] [weight] <size>px <family>"
  const m = /(\d+(?:\.\d+)?)px/.exec(orig);
  if (!m) { ctx.fillText(text, cx, cy); return; }
  const basePx = parseFloat(m[1]);
  let px = basePx;
  let w = ctx.measureText(text).width;
  while (w > maxW && px > 9) {
    px -= 1;
    ctx.font = orig.replace(/(\d+(?:\.\d+)?)px/, px + 'px');
    w = ctx.measureText(text).width;
  }
  ctx.fillText(text, cx, cy);
  ctx.font = orig;
}

// Các dòng cảnh báo/khuyến cáo BẮT BUỘC trên nhãn bao bì NGOÀI theo TT 01/VBHN-BYT.
// Trả về mảng {t: text, c: màu, b: in đậm} theo dạng bào chế + đường dùng của thuốc.
function drugRegulatoryLines(drug) {
  const f = (drug.form || '').toLowerCase();
  const pack = (drug.pack || drug.packaging || '').toLowerCase();
  const fp = f + ' ' + pack;
  const lines = [];
  if (drug.isRx) lines.push({ t: '℞ Thuốc kê đơn', c: '#dc2626', b: true });
  if (/truyền/.test(f)) lines.push({ t: 'Tiêm truyền tĩnh mạch (tttm)', c: '#1d4ed8', b: true });
  else if (/tiêm/.test(f)) lines.push({ t: 'Tiêm bắp/tĩnh mạch (tb/ttm)', c: '#1d4ed8', b: true });
  const drop = [];
  if (/nhỏ mắt|tra mắt/.test(f)) drop.push('mắt');
  if (/nhỏ mũi|xịt mũi/.test(f)) drop.push('mũi');
  if (/nhỏ tai/.test(f)) drop.push('tai');
  if (drop.length) lines.push({ t: 'Thuốc nhỏ ' + drop.join(', '), c: '#0f766e', b: true });
  else if (/dùng ngoài|bôi|kem|gel|mỡ|cao xoa|dán|xức/.test(f)) lines.push({ t: 'Thuốc dùng ngoài', c: '#0f766e', b: true });
  if (/ống/.test(fp) && /uống/.test(fp)) lines.push({ t: 'Không được tiêm', c: '#b45309', b: true });
  if (/hỗn dịch|bột pha|cốm pha|sủi/.test(f)) lines.push({ t: 'Lắc kỹ trước khi dùng', c: '#7c2d12', b: false });
  lines.push({ t: 'Để xa tầm tay trẻ em', c: '#334155', b: false });
  lines.push({ t: 'Đọc kỹ hướng dẫn sử dụng trước khi dùng', c: '#334155', b: false });
  return lines;
}

export function makeDrugLabelTex(drug) {
  const c = document.createElement('canvas');
  const MAIN_H = 320, REG_H = 150;
  // Render ở độ phân giải GẤP 3 (SS=3) rồi scale ctx → chữ SẮC NÉT, hết mờ
  // (yêu cầu thầy #6: chữ trên nhãn rõ ràng, dễ đọc). Toạ độ vẽ giữ nguyên.
  const SS = 3;
  c.width = 256 * SS; c.height = (MAIN_H + REG_H) * SS;
  const ctx = c.getContext('2d');
  ctx.scale(SS, SS);
  const accent = drug.groupAccent || '#0d9488';
  const body   = drug.bodyColor || '#f8fafc';
  const textDark = drug.textDark !== false;
  const darkText = textDark ? '#0f172a' : '#ffffff';
  const subText  = textDark ? '#475569' : '#cbd5e1';
  const mutedText= textDark ? '#64748b' : '#e2e8f0';
  const brand    = (drug.brand || drug.name || '').slice(0, 16);
  // Quy tắc TT 01/VBHN-BYT (yêu cầu #6): <3 hoạt chất → ghi hoạt chất+hàm lượng
  // ngay dưới tên thuốc; ≥3 hoạt chất → KHÔNG ghi dưới tên (đưa vào mục Thành
  // phần ở mặt sau). Đếm hoạt chất tách theo ';' hoặc ' + '.
  const _nAct = String(drug.activeIngredient || drug.generic || '')
    .split(/;|\s\+\s/).map(s => s.trim()).filter(Boolean).length;
  const underName = (_nAct > 0 && _nAct < 3) ? (drug.activeIngredient || drug.generic || '') : '';
  const generic  = underName.slice(0, 30);
  const strength = (drug.strength || '').slice(0, 20);
  const form     = (drug.form || '').slice(0, 26);
  // Padding 12px mỗi bên — text không được tràn quá vùng này
  const MAX_TEXT_W = 256 - 24;
  const meta = getDrugMeta(drug);
  const h = hashSku(drug.sku || drug.id || drug.name || '');
  const variant = LABEL_VARIANTS[h % LABEL_VARIANTS.length];
  const brandFonts = ['Inter, sans-serif', 'Georgia, serif', '"Trebuchet MS", sans-serif', 'Verdana, sans-serif'];
  const brandFont = brandFonts[(h >> 3) % brandFonts.length];
  const decor = DECOR_PATTERNS[(h >> 5) % DECOR_PATTERNS.length];

  ctx.fillStyle = body; ctx.fillRect(0, 0, 256, MAIN_H + REG_H);
  drawLabelDecoration(ctx, accent, decor, 256, 320);
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle';

  if (variant === 'band') {
    ctx.fillStyle = accent;
    ctx.fillRect(0, 0, 256, 36);
    ctx.fillRect(0, 44, 256, 4);
    ctx.fillStyle = darkText; ctx.font = `bold 40px ${brandFont}`;
    fitText(ctx, brand, 128, 100, MAX_TEXT_W);
    ctx.fillStyle = subText; ctx.font = '22px Inter, sans-serif';
    fitText(ctx, generic, 128, 160, MAX_TEXT_W);
    ctx.fillStyle = accent; ctx.font = 'bold 32px Inter, sans-serif';
    fitText(ctx, strength, 128, 215, MAX_TEXT_W);
    ctx.fillStyle = mutedText; ctx.font = '20px Inter, sans-serif';
    fitText(ctx, form, 128, 262, MAX_TEXT_W);
  } else if (variant === 'sideStripe') {
    ctx.fillStyle = accent; ctx.fillRect(0, 0, 22, 320);
    ctx.fillStyle = darkText; ctx.font = `bold 36px ${brandFont}`;
    fitText(ctx, brand, 140, 80, MAX_TEXT_W);
    ctx.fillStyle = subText; ctx.font = 'italic 22px Inter, sans-serif';
    fitText(ctx, generic, 140, 130, MAX_TEXT_W);
    ctx.fillStyle = accent;
    ctx.beginPath(); ctx.arc(140, 200, 40, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#ffffff'; ctx.font = 'bold 22px Inter, sans-serif';
    fitText(ctx, strength.replace(/\s+/g, ''), 140, 200, MAX_TEXT_W);
    ctx.fillStyle = mutedText; ctx.font = '20px Inter, sans-serif';
    fitText(ctx, form, 140, 262, MAX_TEXT_W);
  } else if (variant === 'frame') {
    ctx.strokeStyle = accent; ctx.lineWidth = 4;
    ctx.strokeRect(18, 28, 220, 78);
    ctx.fillStyle = darkText; ctx.font = `bold 34px ${brandFont}`;
    fitText(ctx, brand, 128, 67, MAX_TEXT_W);
    ctx.fillStyle = subText; ctx.font = '22px Inter, sans-serif';
    fitText(ctx, generic, 128, 142, MAX_TEXT_W);
    ctx.fillStyle = accent; ctx.font = 'bold 34px Inter, sans-serif';
    fitText(ctx, strength, 128, 200, MAX_TEXT_W);
    ctx.fillStyle = accent; ctx.fillRect(78, 222, 100, 2);
    ctx.fillStyle = mutedText; ctx.font = '20px Inter, sans-serif';
    fitText(ctx, form, 128, 258, MAX_TEXT_W);
  } else if (variant === 'doubleBand') {
    ctx.fillStyle = accent;
    ctx.fillRect(0, 0, 256, 10);
    ctx.fillRect(0, 16, 256, 4);
    ctx.fillStyle = darkText; ctx.font = `bold 42px ${brandFont}`;
    fitText(ctx, brand, 128, 75, MAX_TEXT_W);
    ctx.fillStyle = subText; ctx.font = '22px Inter, sans-serif';
    fitText(ctx, generic, 128, 125, MAX_TEXT_W);
    ctx.fillStyle = accent; ctx.fillRect(50, 160, 156, 2);
    ctx.fillStyle = accent; ctx.font = 'bold 36px Inter, sans-serif';
    fitText(ctx, strength, 128, 210, MAX_TEXT_W);
    ctx.fillStyle = mutedText; ctx.font = '20px Inter, sans-serif';
    fitText(ctx, form, 128, 262, MAX_TEXT_W);
  } else if (variant === 'diagonal') {
    ctx.fillStyle = accent;
    ctx.beginPath();
    ctx.moveTo(0, 0); ctx.lineTo(256, 0); ctx.lineTo(256, 32); ctx.lineTo(0, 72); ctx.closePath();
    ctx.fill();
    ctx.fillStyle = darkText; ctx.font = `bold 40px ${brandFont}`;
    fitText(ctx, brand, 128, 115, MAX_TEXT_W);
    ctx.fillStyle = subText; ctx.font = '22px Inter, sans-serif';
    fitText(ctx, generic, 128, 165, MAX_TEXT_W);
    ctx.fillStyle = accent; ctx.font = 'bold 32px Inter, sans-serif';
    fitText(ctx, strength, 128, 220, MAX_TEXT_W);
    ctx.fillStyle = mutedText; ctx.font = '20px Inter, sans-serif';
    fitText(ctx, form, 128, 263, MAX_TEXT_W);
  } else if (variant === 'ribbon') {
    ctx.fillStyle = darkText; ctx.font = `bold 36px ${brandFont}`;
    fitText(ctx, brand, 128, 58, MAX_TEXT_W);
    ctx.fillStyle = subText; ctx.font = 'italic 20px Inter, sans-serif';
    fitText(ctx, generic, 128, 102, MAX_TEXT_W);
    ctx.fillStyle = accent;
    ctx.beginPath();
    ctx.moveTo(0, 140); ctx.lineTo(256, 130);
    ctx.lineTo(256, 200); ctx.lineTo(0, 210);
    ctx.closePath(); ctx.fill();
    ctx.fillStyle = '#ffffff'; ctx.font = 'bold 30px Inter, sans-serif';
    fitText(ctx, strength, 128, 170, MAX_TEXT_W);
    ctx.fillStyle = mutedText; ctx.font = '20px Inter, sans-serif';
    fitText(ctx, form, 128, 260, MAX_TEXT_W);
  } else if (variant === 'pillTop') {
    ctx.fillStyle = accent;
    const px = 128, py = 50, pw = 220, ph = 60;
    ctx.beginPath();
    ctx.moveTo(px - pw/2 + ph/2, py - ph/2);
    ctx.lineTo(px + pw/2 - ph/2, py - ph/2);
    ctx.arc(px + pw/2 - ph/2, py, ph/2, -Math.PI/2, Math.PI/2);
    ctx.lineTo(px - pw/2 + ph/2, py + ph/2);
    ctx.arc(px - pw/2 + ph/2, py, ph/2, Math.PI/2, -Math.PI/2);
    ctx.closePath(); ctx.fill();
    ctx.fillStyle = '#ffffff'; ctx.font = `bold 28px ${brandFont}`;
    fitText(ctx, brand, 128, 50, MAX_TEXT_W);
    ctx.fillStyle = darkText; ctx.font = '22px Inter, sans-serif';
    fitText(ctx, generic, 128, 130, MAX_TEXT_W);
    ctx.fillStyle = accent; ctx.font = 'bold 36px Inter, sans-serif';
    fitText(ctx, strength, 128, 200, MAX_TEXT_W);
    ctx.fillStyle = mutedText; ctx.font = '20px Inter, sans-serif';
    fitText(ctx, form, 128, 260, MAX_TEXT_W);
  } else if (variant === 'plate') {
    ctx.fillStyle = accent; ctx.fillRect(0, 0, 256, 4);
    ctx.globalAlpha = 0.18; ctx.fillStyle = accent;
    ctx.fillRect(16, 36, 224, 78);
    ctx.globalAlpha = 1;
    ctx.fillStyle = darkText; ctx.font = `bold 38px ${brandFont}`;
    fitText(ctx, brand, 128, 75, MAX_TEXT_W);
    ctx.fillStyle = subText; ctx.font = '22px Inter, sans-serif';
    fitText(ctx, generic, 128, 145, MAX_TEXT_W);
    ctx.fillStyle = accent; ctx.font = 'bold 30px Inter, sans-serif';
    fitText(ctx, strength, 128, 205, MAX_TEXT_W);
    ctx.fillStyle = mutedText; ctx.font = '20px Inter, sans-serif';
    fitText(ctx, form, 128, 260, MAX_TEXT_W);
  } else if (variant === 'topBlock') {
    // 40% trên đầy màu accent chứa brand trắng, có dải hologram phía dưới
    ctx.fillStyle = accent; ctx.fillRect(0, 0, 256, 110);
    drawHoloGradient(ctx, 0, 110, 256, 8);
    ctx.fillStyle = '#ffffff'; ctx.font = `bold 42px ${brandFont}`;
    fitText(ctx, brand, 128, 60, MAX_TEXT_W);
    ctx.fillStyle = subText; ctx.font = '22px Inter, sans-serif';
    fitText(ctx, generic, 128, 150, MAX_TEXT_W);
    ctx.fillStyle = accent; ctx.font = 'bold 36px Inter, sans-serif';
    fitText(ctx, strength, 128, 210, MAX_TEXT_W);
    ctx.fillStyle = mutedText; ctx.font = '20px Inter, sans-serif';
    fitText(ctx, form, 128, 262, MAX_TEXT_W);
  } else if (variant === 'verticalSplit') {
    // Chia dọc 2 màu — trái accent, phải body
    ctx.fillStyle = accent; ctx.fillRect(0, 0, 96, 320);
    ctx.save();
    ctx.translate(48, 160);
    ctx.rotate(-Math.PI / 2);
    ctx.fillStyle = '#ffffff'; ctx.font = `bold 34px ${brandFont}`;
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    fitText(ctx, brand, 0, 0, MAX_TEXT_W);
    ctx.restore();
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillStyle = darkText; ctx.font = `bold 26px ${brandFont}`;
    fitText(ctx, (drug.brand || '').slice(0, 12), 176, 75, MAX_TEXT_W);
    ctx.fillStyle = subText; ctx.font = '20px Inter, sans-serif';
    fitText(ctx, generic.slice(0, 16), 176, 135, MAX_TEXT_W);
    ctx.fillStyle = accent; ctx.font = 'bold 28px Inter, sans-serif';
    fitText(ctx, strength, 176, 195, MAX_TEXT_W);
    ctx.fillStyle = mutedText; ctx.font = '18px Inter, sans-serif';
    fitText(ctx, form.slice(0, 18), 176, 245, MAX_TEXT_W);
  } else { // 'medallion'
    // Huy chương tròn lớn chứa strength + brand quanh nó
    ctx.fillStyle = darkText; ctx.font = `bold 38px ${brandFont}`;
    fitText(ctx, brand, 128, 50, MAX_TEXT_W);
    ctx.fillStyle = subText; ctx.font = 'italic 20px Inter, sans-serif';
    fitText(ctx, generic, 128, 90, MAX_TEXT_W);
    // Vòng ngoài
    ctx.strokeStyle = accent; ctx.lineWidth = 6;
    ctx.beginPath(); ctx.arc(128, 175, 52, 0, Math.PI * 2); ctx.stroke();
    // Vòng trong
    ctx.fillStyle = accent;
    ctx.beginPath(); ctx.arc(128, 175, 42, 0, Math.PI * 2); ctx.fill();
    // Strength giữa
    ctx.fillStyle = '#ffffff'; ctx.font = 'bold 24px Inter, sans-serif';
    fitText(ctx, strength.replace(/\s+/g, ''), 128, 175, MAX_TEXT_W);
    // 2 ngôi sao 2 bên huy chương
    [60, 196].forEach((cx) => {
      ctx.fillStyle = accent;
      ctx.beginPath();
      for (let k = 0; k < 10; k++) {
        const r = k % 2 === 0 ? 12 : 5;
        const a = k * Math.PI / 5 - Math.PI / 2;
        const x = cx + r * Math.cos(a), y = 175 + r * Math.sin(a);
        k === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.closePath(); ctx.fill();
    });
    ctx.fillStyle = mutedText; ctx.font = '20px Inter, sans-serif';
    fitText(ctx, form, 128, 258, MAX_TEXT_W);
  }

  // Badge góc trên-trái (NEW / GMP / cross)
  const badge = CORNER_BADGES[(h >> 7) % CORNER_BADGES.length];
  drawCornerBadge(ctx, badge, accent);

  if (drug.isRx) {
    ctx.fillStyle = '#dc2626';
    ctx.beginPath(); ctx.arc(232, 22, 15, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#ffffff'; ctx.font = 'bold 18px Georgia, serif';
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText('Rx', 232, 23);
  } else if (drug.isOtc || /OTC/i.test(drug.category || '')) {
    ctx.fillStyle = '#16a34a';
    ctx.fillRect(206, 6, 44, 22);
    ctx.fillStyle = '#ffffff'; ctx.font = 'bold 14px Inter, sans-serif';
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText('OTC', 228, 17);
  }
  // Mini-barcode + REG tag (y=268-289)
  drawLabelBottomStrip(ctx, accent, textDark, drug.sku, 256);
  // QR-code mock ở góc trái-đáy (cùng hàng với barcode strip)
  drawQrMock(ctx, drug.sku || '', 12, 268, 3);
  // HD/LOT + cơ sở SX THẬT + footer mô phỏng CBS (TT: nhãn mô phỏng phải có dòng này)
  ctx.fillStyle = textDark ? '#7c2d12' : '#fed7aa';
  ctx.font = 'bold 11px "Courier New", monospace';
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  ctx.fillText(`HD ${meta.expiry} · Lô ${meta.lot}`, 128, 296);
  const mfg = (drug.manufacturer || '').trim()
    || MFG_NAMES[((h >>> 9) % MFG_NAMES.length + MFG_NAMES.length) % MFG_NAMES.length] || MFG_NAMES[0];
  ctx.fillStyle = subText; ctx.font = 'italic 10px Inter, sans-serif';
  fitText(ctx, `SX: ${mfg}`, 128, 306, 244);

  // ── Ký hiệu Rx góc TRÊN-TRÁI (TT 01: cạnh tên thuốc) ──
  if (drug.isRx) {
    ctx.fillStyle = '#dc2626'; ctx.font = 'bold 22px Georgia, serif';
    ctx.textAlign = 'left'; ctx.textBaseline = 'top';
    ctx.fillText('℞', 8, 6);
  }
  // ── Vùng cảnh báo/khuyến cáo BẮT BUỘC (nhãn bao bì ngoài) ──
  ctx.fillStyle = accent; ctx.fillRect(0, MAIN_H, 256, 3);
  ctx.fillStyle = '#fffdf7'; ctx.fillRect(0, MAIN_H + 3, 256, REG_H - 3);
  ctx.textAlign = 'left'; ctx.textBaseline = 'middle';
  let ry = MAIN_H + 16;
  for (const ln of drugRegulatoryLines(drug)) {
    ctx.fillStyle = ln.c;
    ctx.font = `${ln.b ? 'bold ' : ''}15px Inter, sans-serif`;
    fitText(ctx, ln.t, 12, ry, 232);
    ry += 19;
  }

  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  return tex;
}

// Nhãn MẶT SAU hộp — in ĐỦ trường nhãn bao bì ngoài theo TT 01/VBHN-BYT (yêu cầu
// thầy 28/6 #4: mọi thông tin nhãn mô phỏng phải in lên hộp). Mặt trước giữ nhận
// diện thương hiệu; mặt sau là "nhãn chi tiết" để dược sĩ xoay hộp đọc trong 3D.
export function makeDrugBackLabelTex(drug) {
  const W = 280, H = 470, SS = 3;
  const c = document.createElement('canvas'); c.width = W * SS; c.height = H * SS;
  const ctx = c.getContext('2d'); ctx.scale(SS, SS);
  const accent = drug.groupAccent || '#0d9488';
  const meta = getDrugMeta(drug);
  ctx.fillStyle = '#ffffff'; ctx.fillRect(0, 0, W, H);
  // Header accent + tên thuốc.
  ctx.fillStyle = accent; ctx.fillRect(0, 0, W, 42);
  ctx.fillStyle = '#ffffff'; ctx.textAlign = 'left'; ctx.textBaseline = 'middle';
  ctx.font = 'bold 20px Inter, sans-serif';
  fitText(ctx, (drug.brand || drug.name || '').slice(0, 22), W / 2, 21, W - 60);
  if (drug.isRx) {
    ctx.fillStyle = '#ffffff'; ctx.font = 'bold 15px Georgia, serif';
    ctx.textAlign = 'right'; ctx.fillText('℞ Rx', W - 10, 21); ctx.textAlign = 'left';
  }
  ctx.textBaseline = 'top';
  let iy = 52;
  const field = (label, value, strong = false) => {
    const val = String(value ?? '').trim();
    if (!val) return;
    ctx.fillStyle = '#64748b'; ctx.font = 'bold 11px Inter, sans-serif';
    ctx.fillText(label, 12, iy);
    const labW = ctx.measureText(label).width + 6;
    ctx.fillStyle = strong ? accent : '#1f2937';
    ctx.font = `${strong ? 'bold ' : ''}13px Inter, sans-serif`;
    const maxW = W - 24, words = val.split(' ');
    let line = '', first = true;
    const flush = () => { ctx.fillText(line, first ? 12 + labW : 12, iy); iy += 16; first = false; line = ''; };
    for (const wd of words) {
      const t = line ? line + ' ' + wd : wd;
      const avail = first ? maxW - labW : maxW;
      if (ctx.measureText(t).width > avail && line) flush();
      line = line ? line + ' ' + wd : wd;
    }
    if (line) flush();
    iy += 4;
  };
  const lot = drug.lot || meta.lot || '—';
  const reg = drug.regNo || drug.sdk || '—';
  const mfgD = drug.mfgDate || '—';
  const expD = drug.expDate || meta.expiry || '—';
  field('Thành phần, hàm lượng:', drug.activeIngredient || drug.generic, true);
  field('Dạng bào chế:', drug.form);
  field('Quy cách đóng gói:', drug.packaging || drug.pack);
  field('Chỉ định, cách dùng, CCĐ:', 'Xin đọc trong tờ hướng dẫn sử dụng thuốc.');
  field('Số giấy ĐK lưu hành:', reg);
  field('Số lô SX:', lot);
  field('NSX – HSD:', `${mfgD} – ${expD}`);
  field('Tiêu chuẩn chất lượng:', 'TCCS');
  field('Bảo quản:', drug.storage || 'Nơi khô, dưới 30°C, tránh ánh sáng.');
  field('Cơ sở sản xuất:', drug.manufacturer);
  if (drug.country && !/việt\s*nam/i.test(drug.country)) field('Xuất xứ:', drug.country);
  // Khuyến cáo bắt buộc.
  ctx.fillStyle = '#b91c1c'; ctx.font = 'bold 12px Inter, sans-serif';
  iy += 2; ctx.fillText('Để xa tầm tay trẻ em.', 12, iy); iy += 16;
  ctx.fillText('Đọc kỹ hướng dẫn sử dụng trước khi dùng.', 12, iy);
  // Footer mô phỏng.
  ctx.fillStyle = accent; ctx.fillRect(0, H - 22, W, 22);
  ctx.fillStyle = '#ffffff'; ctx.font = 'italic 10px Inter, sans-serif';
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  ctx.fillText('Dữ liệu mô phỏng CBS – Chỉ dùng cho đào tạo dược', W / 2, H - 11);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace; tex.anisotropy = 4;
  return tex;
}

// Cache texture nhãn theo (loại|drug|màu) — MỌI bản sao cùng thuốc DÙNG CHUNG 1
// texture thay vì mỗi hộp sinh canvas 256×320 riêng. Giảm mạnh RAM GPU + thời gian
// dựng cảnh → mượt trên Safari/mobile (trước: ~1000 texture, sau: ~số thuốc).
const _drugTexCache = new Map();
function cachedDrugTex(kind, drug, bodyHex, accentHex) {
  const key = `${kind}|${drug.id || drug.sku}|${bodyHex}|${accentHex}`;
  let t = _drugTexCache.get(key);
  if (!t) {
    if (kind === 'labelBack') {
      // Nhãn MẶT SAU = nhãn CHI TIẾT (đủ trường TT 01/VBHN-BYT). Lật ngang để đọc
      // xuôi khi nhìn từ phía sau hộp (tủ kính 2 mặt).
      const props = { ...drug, bodyColor: bodyHex, groupAccent: accentHex, textDark: drug.textDark !== false };
      t = makeDrugBackLabelTex(props);
      t.wrapS = THREE.RepeatWrapping; t.repeat.x = -1; t.needsUpdate = true;
    } else {
      const props = { ...drug, bodyColor: bodyHex, groupAccent: accentHex, textDark: drug.textDark !== false };
      t = kind === 'side' ? makeDrugSideLabelTex(props) : makeDrugLabelTex(props);
    }
    _drugTexCache.set(key, t);
  }
  return t;
}

// Nhãn IN trên phong bì BAO BÌ RA LẺ (trắng/vàng/hồng) — mẫu của thầy:
// logo + tên nhà thuốc + "Số điện thoại" (KHÔNG có dòng "Dược sĩ") + tiêu đề đặc biệt
// (vàng=DÙNG NGOÀI, hồng=KIỂM SOÁT ĐẶC BIỆT) + các dòng ô trống để dược sĩ điền tay.
function makePkgLabelTex({ color = '#ffffff', special = '', textColor = '#1f2937' }) {
  const c = document.createElement('canvas');
  c.width = 300; c.height = 380;
  const ctx = c.getContext('2d');
  ctx.fillStyle = color; ctx.fillRect(0, 0, 300, 380);
  ctx.strokeStyle = '#9ca3af'; ctx.lineWidth = 3; ctx.strokeRect(4, 4, 292, 372);
  ctx.textAlign = 'left'; ctx.textBaseline = 'top';
  // Header: logo tròn + nhà thuốc + SĐT
  ctx.fillStyle = '#b91c1c'; ctx.beginPath(); ctx.arc(30, 34, 16, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#fff'; ctx.font = 'bold 18px Inter'; ctx.textAlign = 'center';
  ctx.fillText('⚕', 30, 24);
  ctx.fillStyle = textColor; ctx.textAlign = 'left';
  ctx.font = 'bold 13px Inter'; ctx.fillText('Nhà thuốc 35 Đoàn Thị Điểm', 56, 18);
  ctx.font = '12px Inter'; ctx.fillText('Số điện thoại: 0972560XXX', 56, 36);
  let y = 64;
  if (special) {
    ctx.fillStyle = textColor; ctx.font = 'bold 16px Inter'; ctx.textAlign = 'center';
    ctx.fillText(special, 150, y); y += 26; ctx.textAlign = 'left';
  }
  ctx.fillStyle = textColor; ctx.font = 'bold 14px Inter'; ctx.textAlign = 'center';
  ctx.fillText('Tên thuốc, Nồng độ/Hàm lượng:', 150, y); y += 30; ctx.textAlign = 'left';
  const line = (yy) => { ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(20, yy); ctx.lineTo(280, yy); ctx.stroke(); };
  line(y); y += 26;
  ctx.font = 'bold 12px Inter'; ctx.fillText('- Cách dùng, liều dùng:', 18, y); y += 22; line(y); y += 22; line(y); y += 24;
  ctx.fillText('- Hạn dùng:', 18, y); y += 22; line(y); y += 24;
  ctx.font = 'italic bold 12px Inter'; ctx.fillText('*Lưu ý:', 18, y); y += 22; line(y);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

// Mỗi LOẠI thuốc = stack hộp xếp dọc Z. Hàm trả về MỘT hộp. detailed=false (các hộp
// phía SAU, bị che bởi hộp trước) chỉ vẽ THÂN → bỏ tem/nhãn/side để tiết kiệm draw call.
// Bao bì NGOÀI đúng quy cách: hầu hết "Hộp X vỉ…" → hộp giấy (carton). Riêng
// "Chai …ml" (không hộp) và dịch truyền → chai thật (không có hộp ngoài).
function packType(drug) {
  const f = (drug.form || '').toLowerCase();
  const p = (drug.pack || drug.packaging || '').trim().toLowerCase();
  if (/truyền/.test(f)) return 'infusion';
  if (/^chai/.test(p) && !/hộp/.test(p)) return 'bottle';
  return 'carton';
}

// Dựng hình CHAI/DỊCH TRUYỀN bằng geometry (thân trụ + vai + cổ + nắp) + nhãn
// cuốn quanh mặt trước. Dịch truyền: thuỷ tinh trong, nắp xanh.
function buildBottlePackage(drug, style, pkg, bodyHex, accentHex, detailed) {
  const sub = new THREE.Group();
  const r = Math.min(style.w, style.d) * 0.5;
  const bodyH = style.h * (pkg === 'infusion' ? 0.76 : 0.70);
  const neckR = r * 0.40;
  const neckH = style.h * 0.10;
  const capH = style.h * 0.11;
  const baseY = -style.h / 2;
  const isInf = pkg === 'infusion';
  const glassMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color(isInf ? '#dbeafe' : bodyHex),
    roughness: isInf ? 0.15 : 0.45, metalness: 0.0,
    transparent: isInf, opacity: isInf ? 0.5 : 1
  });
  const bodyMesh = new THREE.Mesh(new THREE.CylinderGeometry(r, r, bodyH, 24), glassMat);
  bodyMesh.position.y = baseY + bodyH / 2; bodyMesh.castShadow = true; bodyMesh.receiveShadow = true;
  sub.add(bodyMesh);
  const shoulder = new THREE.Mesh(new THREE.CylinderGeometry(neckR, r, style.h * 0.10, 24), glassMat);
  shoulder.position.y = baseY + bodyH + style.h * 0.05; sub.add(shoulder);
  const neck = new THREE.Mesh(new THREE.CylinderGeometry(neckR, neckR, neckH, 18), glassMat);
  neck.position.y = baseY + bodyH + style.h * 0.10 + neckH / 2; sub.add(neck);
  const cap = new THREE.Mesh(
    new THREE.CylinderGeometry(neckR * 1.25, neckR * 1.25, capH, 18),
    new THREE.MeshStandardMaterial({ color: new THREE.Color(accentHex), roughness: 0.5 })
  );
  cap.position.y = style.h / 2 - capH / 2; sub.add(cap);
  if (detailed) {
    // Nhãn cuốn quanh mặt trước (~120°) — hình trụ hở để nhãn ôm thân chai.
    const labelTex = cachedDrugTex('label', drug, bodyHex, accentHex);
    const label = new THREE.Mesh(
      new THREE.CylinderGeometry(r * 1.01, r * 1.01, bodyH * 0.82, 24, 1, true, -Math.PI * 0.34, Math.PI * 0.68),
      new THREE.MeshStandardMaterial({ map: labelTex, roughness: 0.7, side: THREE.DoubleSide,
        polygonOffset: true, polygonOffsetFactor: -6, polygonOffsetUnits: -6 })
    );
    label.position.y = baseY + bodyH * 0.46;
    sub.add(label);
  }
  return sub;
}

function buildSingleDrugBox(drug, style, detailed = true, backLabel = false, withSides = true) {
  const colors = getDrugColors(drug);
  // Body + ACCENT theo brand thật (DRUG_PLACEMENT.brandColor) để hộp trên kệ
  // và hộp zoom inspector ĐỒNG MÀU (shelf không lệch màu so với label inspector).
  // Fallback hash-based khi placement không inject brandColor.
  const bodyHex = drug.bodyColor || colors.body;
  const accentHex = drug.groupAccent || colors.accent;
  // Thiết bị/dụng cụ y tế đặc thù → TẢI model .glb (không vẽ tay cho giống thật).
  const dev = deviceModelFor(drug);
  if (dev) {
    const grp = new THREE.Group();
    loadDeviceModel(dev.file)
      .then(src => fitDeviceModel(grp, src, style, dev))
      .catch(() => { // model lỗi → hộp dự phòng
        grp.add(new THREE.Mesh(new THREE.BoxGeometry(style.w, style.h, style.d),
          new THREE.MeshStandardMaterial({ color: new THREE.Color(bodyHex), roughness: 0.75 })));
      });
    return grp;
  }
  // Chai/dịch truyền → hình trụ thật (bao bì ngoài đúng quy cách, không hộp giấy).
  const pkg = packType(drug);
  if (pkg !== 'carton') return buildBottlePackage(drug, style, pkg, bodyHex, accentHex, detailed);
  const sub = new THREE.Group();
  const body = new THREE.Color(bodyHex);
  const bodyMat = new THREE.MeshStandardMaterial({ color: body, roughness: 0.75, metalness: 0.05 });
  const box = new THREE.Mesh(new THREE.BoxGeometry(style.w, style.h, style.d), bodyMat);
  box.castShadow = true; box.receiveShadow = true;
  sub.add(box);
  if (!detailed) return sub; // hộp phía sau (bị che) chỉ cần thân — tối ưu hiệu năng

  // Không có mesh stripe/flag 3D (nhô ra trước mặt body sẽ đè LÊN vùng tên thuốc).
  // Trang trí nằm hoàn toàn TRONG texture
  // nhãn (drawLabelDecoration + accent fills), luôn ở DƯỚI lớp chữ → tên thuốc
  // (text) luôn hiển thị trên cùng.
  const variant = style.variant || 'banner';

  // Nhãn dán mặt NGOÀI (+z) — group + brand + strength để dược sĩ nhận diện từ xa.
  // Merge accent/body color của drug để tem đồng bộ với màu thân hộp.
  const labelTex = cachedDrugTex('label', drug, bodyHex, accentHex);
  const labelMat = new THREE.MeshStandardMaterial({
    map: labelTex, roughness: 0.7,
    polygonOffset: true, polygonOffsetFactor: -6, polygonOffsetUnits: -6
  });
  const label = new THREE.Mesh(
    new THREE.PlaneGeometry(style.w * 0.92, style.h * 0.88),
    labelMat
  );
  // Đẩy label ra 5mm so với mặt body (trước chỉ 0.8mm → fight rõ).
  label.position.set(0, 0, style.d / 2 + 0.005);
  sub.add(label);
  // Nhãn MẶT SAU (cho hộp trong tủ kính 2 mặt) — để nhìn từ phía sau quầy vẫn thấy thông tin.
  if (backLabel) {
    const backMat = new THREE.MeshStandardMaterial({
      map: cachedDrugTex('labelBack', drug, bodyHex, accentHex), roughness: 0.7,
      polygonOffset: true, polygonOffsetFactor: -6, polygonOffsetUnits: -6
    });
    const back = new THREE.Mesh(new THREE.PlaneGeometry(style.w * 0.92, style.h * 0.88), backMat);
    back.position.set(0, 0, -style.d / 2 - 0.005);
    back.rotation.y = Math.PI;
    sub.add(back);
  }

  // Nhãn MẶT BÊN — chỉ áp khi hộp đủ dày (d >= 0.04m) để side label nhìn rõ,
  // và khi hash chọn variant ưu tiên có side (band/frame/doubleBand/pillTop/plate).
  const sideEnabled = withSides && style.d >= 0.04 && ['band', 'frame', 'doubleBand', 'pillTop', 'plate'].includes(variant);
  if (sideEnabled) {
    const sideTex = cachedDrugTex('side', drug, bodyHex, accentHex);
    const sideMat = new THREE.MeshStandardMaterial({
      map: sideTex, roughness: 0.7,
      polygonOffset: true, polygonOffsetFactor: -6, polygonOffsetUnits: -6
    });
    // Mặt +X (nhìn từ phải sang)
    const sideR = new THREE.Mesh(
      new THREE.PlaneGeometry(style.d * 0.85, style.h * 0.88),
      sideMat
    );
    sideR.position.set(style.w / 2 + 0.005, 0, 0);
    sideR.rotation.y = Math.PI / 2;
    sub.add(sideR);
    // Mặt -X (nhìn từ trái sang) — reuse texture nhưng flip để chữ không bị soi gương
    const sideMatL = new THREE.MeshStandardMaterial({
      map: sideTex, roughness: 0.7,
      polygonOffset: true, polygonOffsetFactor: -6, polygonOffsetUnits: -6
    });
    const sideL = new THREE.Mesh(
      new THREE.PlaneGeometry(style.d * 0.85, style.h * 0.88),
      sideMatL
    );
    sideL.position.set(-style.w / 2 - 0.005, 0, 0);
    sideL.rotation.y = -Math.PI / 2;
    sub.add(sideL);
  }
  return sub;
}

// ── Procedural textures (port từ compounding-lab.html) — sàn gạch + tường tile + bàn marble
function makePharmacyFloorTex() {
  const c = document.createElement('canvas');
  c.width = c.height = 1024;
  const x = c.getContext('2d');
  // Sàn nhà thuốc: tile trắng kem sạch (khác lab dùng brick nâu)
  x.fillStyle = '#d6d8d0'; x.fillRect(0, 0, 1024, 1024); // grout
  const tileSize = 256, gap = 5;
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      const hue = 35 + Math.random() * 6;
      const sat = 8 + Math.random() * 6;
      const lig = 86 + Math.random() * 4;
      const px = i * tileSize + gap, py = j * tileSize + gap;
      const w = tileSize - gap * 2, h = tileSize - gap * 2;
      const g = x.createLinearGradient(px, py, px + w, py + h);
      g.addColorStop(0, `hsl(${hue}, ${sat}%, ${lig + 3}%)`);
      g.addColorStop(0.5, `hsl(${hue}, ${sat}%, ${lig}%)`);
      g.addColorStop(1, `hsl(${hue}, ${sat}%, ${lig - 3}%)`);
      x.fillStyle = g;
      const r = 3;
      x.beginPath();
      x.moveTo(px + r, py);
      x.lineTo(px + w - r, py); x.quadraticCurveTo(px + w, py, px + w, py + r);
      x.lineTo(px + w, py + h - r); x.quadraticCurveTo(px + w, py + h, px + w - r, py + h);
      x.lineTo(px + r, py + h); x.quadraticCurveTo(px, py + h, px, py + h - r);
      x.lineTo(px, py + r); x.quadraticCurveTo(px, py, px + r, py);
      x.closePath(); x.fill();
      for (let k = 0; k < 50; k++) {
        x.fillStyle = `rgba(120,120,120,${0.02 + Math.random() * 0.04})`;
        x.fillRect(px + Math.random() * w, py + Math.random() * h, 1 + Math.random(), 1 + Math.random());
      }
      x.strokeStyle = 'rgba(255,255,255,0.12)';
      x.lineWidth = 1;
      x.beginPath();
      x.moveTo(px + 3, py + 3); x.lineTo(px + w - 3, py + 3);
      x.stroke();
    }
  }
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.anisotropy = 8;
  return t;
}
function makePharmacyWallTex() {
  const c = document.createElement('canvas');
  c.width = c.height = 512;
  const x = c.getContext('2d');
  x.fillStyle = '#eaf0ea'; x.fillRect(0, 0, 512, 512);
  x.strokeStyle = '#b8c5bd'; x.lineWidth = 2.5;
  for (let i = 0; i <= 4; i++) {
    x.beginPath(); x.moveTo(i * 128, 0); x.lineTo(i * 128, 512); x.stroke();
    x.beginPath(); x.moveTo(0, i * 128); x.lineTo(512, i * 128); x.stroke();
  }
  for (let i = 0; i < 4; i++) for (let j = 0; j < 4; j++) {
    const g = x.createLinearGradient(i * 128, j * 128, (i + 1) * 128, (j + 1) * 128);
    g.addColorStop(0, 'rgba(255,255,255,0.10)');
    g.addColorStop(1, 'rgba(0,0,0,0.04)');
    x.fillStyle = g; x.fillRect(i * 128, j * 128, 128, 128);
  }
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.repeat.set(3, 1.5);
  return t;
}
function makeCounterMarbleTex(w = 1024, h = 512) {
  const c = document.createElement('canvas');
  c.width = w; c.height = h;
  const x = c.getContext('2d');
  const g = x.createLinearGradient(0, 0, w, h);
  g.addColorStop(0, '#f7ecd8'); g.addColorStop(0.5, '#ecdcc0'); g.addColorStop(1, '#dcc8a4');
  x.fillStyle = g; x.fillRect(0, 0, w, h);
  x.strokeStyle = 'rgba(120,90,60,0.15)';
  for (let i = 0; i < 10; i++) {
    x.beginPath(); x.lineWidth = 0.4 + Math.random() * 1.2;
    let px = Math.random() * w, py = 0;
    x.moveTo(px, py);
    while (py < h) {
      px += (Math.random() - 0.5) * 60; py += 10 + Math.random() * 20;
      x.lineTo(px, py);
    }
    x.stroke();
  }
  for (let i = 0; i < 800; i++) {
    x.fillStyle = `rgba(100,75,45,${Math.random() * 0.04})`;
    x.fillRect(Math.random() * w, Math.random() * h, 1, 1);
  }
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.anisotropy = 8;
  return t;
}

// ── GLB loader helper (auto-scale + ground at y=0) ──────────────────────────
const gltfLoader = new GLTFLoader();
function loadGLB(url) {
  return new Promise((resolve, reject) => {
    gltfLoader.load(url, (gltf) => resolve(gltf), undefined, reject);
  });
}
function autoScaleGLB(obj, targetSize) {
  const box = new THREE.Box3().setFromObject(obj);
  const size = new THREE.Vector3();
  box.getSize(size);
  const max = Math.max(size.x, size.y, size.z) || 1;
  const s = targetSize / max;
  obj.scale.setScalar(s);
  const newBox = new THREE.Box3().setFromObject(obj);
  obj.position.y -= newBox.min.y;
  obj.traverse((o) => {
    if (o.isMesh) { o.castShadow = true; o.receiveShadow = true; }
  });
  return obj;
}

// ── Camera presets — label match upstream Pharmacy-AI ───────────────────────
const CAMERA_PRESETS = {
  default:        { label: 'Toàn cảnh',                pos: [3.4, 4.0, 5.5],     target: [0, 0.9, -0.4],         minDist: 2.5, maxDist: 14 },
  fridge:         { label: 'Tủ lạnh 2-8°C',            pos: [-1.6, 1.6, 1.5],    target: [-3.6, 1.0, 1.45],      minDist: 0.8, maxDist: 5  },
  counter:        { label: 'Quầy giao dịch',           pos: [0.0, 1.62, 4.7],    target: [0.0, 1.42, 1.4],       minDist: 1.5, maxDist: 9  },
  consult:        { label: 'Khu tư vấn',               pos: [-1.9, 1.7, 1.4],    target: [-3.85, 0.75, -0.25],   minDist: 1.0, maxDist: 7  },
  // Góc nhìn tủ SONG SONG MẶT ĐẤT (vuông góc tường) — yêu cầu thầy: pos.y = target.y
  // → camera ngang tầm, không cúi xuống. Lùi xa (z=1.25) để thấy nhiều ngăn; user
  // có thể kéo dọc (pan) lên/xuống xem ngăn trên/dưới.
  cab_rx_1:       { label: 'Kê đơn 1',                 pos: [-2.82, 1.30, 1.25], target: [-2.82, 1.30, -2.125],  minDist: 1.2, maxDist: 6 },
  cab_rx_2:       { label: 'Kê đơn 2',                 pos: [-0.94, 1.30, 1.25], target: [-0.94, 1.30, -2.125],  minDist: 1.2, maxDist: 6 },
  cab_otc_1:      { label: 'OTC 1',                    pos: [ 0.94, 1.30, 1.25], target: [ 0.94, 1.30, -2.125],  minDist: 1.2, maxDist: 6 },
  cab_otc_2:      { label: 'OTC 2',                    pos: [ 2.82, 1.30, 1.25], target: [ 2.82, 1.30, -2.125],  minDist: 1.2, maxDist: 6 },
  cab_special:    { label: 'Kiểm soát đặc biệt',       pos: [ 1.20, 1.6, -1.18], target: [ 4.10, 0.90, -1.18],   minDist: 1.0, maxDist: 6 },
  cab_supp_1:     { label: 'Không phải thuốc 1',       pos: [ 1.20, 2.0,  0.45], target: [ 4.10, 1.20,  0.45],   minDist: 1.2, maxDist: 6 },
  cab_supp_2:     { label: 'Không phải thuốc 2',       pos: [ 1.20, 2.0,  2.23], target: [ 4.10, 1.20,  2.23],   minDist: 1.2, maxDist: 6 },
  front_drawers:  { label: 'Tủ quầy trước',            pos: [ 0.0,  2.2,  4.8],  target: [ 0.0, 0.6,  1.2],      minDist: 1.5, maxDist: 8 },
  // Dược sĩ POV — đứng SÁT mép sau quầy (Z ≈ 0.4, lùi ra sau counter back-edge
  // 0.95 khoảng 55cm), mắt 1.7m, target NẰM TRÊN mặt quầy (z=1.45, y=1.06) để
  // ưu tiên thấy POS + 2 khay + dải trưng bày — công cụ thao tác chính của dược sĩ.
  pharmacist:     { label: 'Dược sĩ (sau quầy)',       pos: [ 0.3,  1.66, 0.05], target: [ 0.3, 1.45, 2.0],      minDist: 0.8, maxDist: 6 }
};

// ── Fridge stock (13 items, port 1-1) ───────────────────────────────────────
const FRIDGE_STOCKS = [
  { id: 'frg_vaccine_bcg', label: 'Vaccine BCG',     color: '#bae6fd', shelf: 'topShelf',    x: -0.20 },
  { id: 'frg_vaccine_flu', label: 'Cúm mùa',         color: '#a7f3d0', shelf: 'topShelf',    x:  0.00 },
  { id: 'frg_vaccine_hpv', label: 'HPV Gardasil',    color: '#fbcfe8', shelf: 'topShelf',    x:  0.20 },
  { id: 'frg_vaccine_td',  label: 'Td uốn ván',      color: '#c7d2fe', shelf: 'midDivider',  x: -0.20 },
  { id: 'frg_vaccine_var', label: 'Thuỷ đậu',        color: '#fef08a', shelf: 'midDivider',  x:  0.20 },
  { id: 'frg_insulin',     label: 'Insulin glargine',color: '#fde68a', shelf: 'bottomMid2',  x: -0.22 },
  { id: 'frg_eyedrop',     label: 'Tobradex 5ml',    color: '#ddd6fe', shelf: 'bottomMid2',  x:  0.02 },
  { id: 'frg_insulin_apr', label: 'Insulin aspart',  color: '#fed7aa', shelf: 'bottomMid2',  x:  0.22 },
  { id: 'frg_probiotic',   label: 'Enterogermina',   color: '#fecaca', shelf: 'bottomMid1',  x: -0.20 },
  { id: 'frg_eyedrop_2',   label: 'Cravit 5ml',      color: '#ccfbf1', shelf: 'bottomMid1',  x:  0.20 },
  { id: 'frg_humanal',     label: 'Albumin HSA',     color: '#e9d5ff', shelf: 'bottomFloor', x: -0.20 },
  { id: 'frg_gonal',       label: 'Gonal-F',         color: '#bbf7d0', shelf: 'bottomFloor', x:  0.20 }
];
const FRIDGE_SHELF_Y = {
  bottomFloor: 0.07, bottomMid1: 0.42, bottomMid2: 0.74, midDivider: 1.06, topShelf: 1.34
};

// ── Build the entire scene graph ────────────────────────────────────────────
export function buildScene(canvas, opts = {}) {
  // Renderer config — copy từ compounding-lab.html (PBR + soft shadow + ACES tone mapping).
  const renderer = new THREE.WebGLRenderer({
    canvas, antialias: true, alpha: false,
    logarithmicDepthBuffer: true
  });
  // Cap pixelRatio 1.5 (yêu cầu tối ưu): màn Retina không cần 2x → giảm ~44% pixel
  // phải vẽ, đỡ giật mà nhìn vẫn nét.
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
  renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFShadowMap;   // rẻ hơn PCFSoft, đỡ nặng
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  // Master brightness — slider chỉnh đồng bộ exposure + cường độ TẤT CẢ đèn + environment.
  // Single-knob để tránh trường hợp giảm exposure nhưng vẫn cháy do lights cộng dồn.
  const BASE_EXPOSURE = 0.7;
  renderer.toneMappingExposure = BASE_EXPOSURE;

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xeef2ee);
  scene.fog = new THREE.Fog(0xeef2ee, 14, 38);

  // Camera near/far thu hẹp + logarithmicDepthBuffer → Z-buffer precision đủ cho mọi
  // khoảng cách trong phòng 9m, giảm Z-fighting toàn bộ scene.
  const camera = new THREE.PerspectiveCamera(48, canvas.clientWidth / canvas.clientHeight, 0.3, 30);
  camera.position.set(...CAMERA_PRESETS.default.pos);

  const controls = new OrbitControls(camera, canvas);
  controls.target.set(...CAMERA_PRESETS.default.target);
  controls.enableDamping = true;
  controls.dampingFactor = 0.08;
  controls.enablePan = true;            // cho kéo (2 ngón / giữ chuột phải) để xem hết ngăn TRÊN–DƯỚI
  controls.screenSpacePanning = true;   // kéo theo trục dọc màn hình (không trượt theo mặt sàn)
  controls.minDistance = CAMERA_PRESETS.default.minDist;
  controls.maxDistance = CAMERA_PRESETS.default.maxDist;
  controls.maxPolarAngle = Math.PI / 2.1;
  // 2-finger pinch trên trackpad → tăng tốc zoom ×3 (trước default = 1).
  controls.zoomSpeed = 3.0;

  // Lighting — port nguyên recipe từ compounding-lab.html (phòng bào chế).
  // PBR environment + ambient nhẹ + sun directional có soft shadow + fill xanh + 3 đèn trần ấm vàng.
  const pmrem = new THREE.PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(new RoomEnvironment(renderer), 0.04).texture;
  pmrem.dispose();
  const BASE_ENV_INTENSITY = 0.45;
  scene.environmentIntensity = BASE_ENV_INTENSITY;

  const ambient = new THREE.AmbientLight(0xffffff, 0.18);
  scene.add(ambient);

  const sun = new THREE.DirectionalLight(0xffffff, 0.5);
  sun.position.set(2.2, 4.2, 2.4);
  sun.castShadow = true;
  sun.shadow.mapSize.set(2048, 2048);
  sun.shadow.camera.left = -3.5; sun.shadow.camera.right = 3.5;
  sun.shadow.camera.top = 3.5;  sun.shadow.camera.bottom = -2;
  sun.shadow.camera.near = 0.1; sun.shadow.camera.far = 12;
  sun.shadow.bias = -0.0005;
  scene.add(sun);

  // Fill ánh sáng xanh nhạt từ phía sau
  const fill = new THREE.DirectionalLight(0xc8e1ff, 0.16);
  fill.position.set(-2, 3, -1);
  scene.add(fill);

  // Đèn trần: đã gỡ bỏ theo yêu cầu — chỉ giữ sun + fill + ambient + environment.
  // ceilSpots vẫn khai báo (rỗng) để applyBrightness().forEach không vỡ.
  const ceilSpots = [];

  // ── Master brightness knob ────────────────────────────────────────────────
  // 1 = ánh sáng gốc; <1 tối, >1 sáng hơn. Scale đồng bộ tất cả light source +
  // environment + tone mapping exposure để không có nguồn sáng nào "lọt lưới".
  const BASE_INTENSITIES = {
    ambient: ambient.intensity,
    sun: sun.intensity,
    fill: fill.intensity,
    spots: ceilSpots.map(s => s.intensity),
  };
  let currentBrightness = 1.0;
  function applyBrightness(v, persist) {
    const f = Math.max(0.2, Math.min(1.6, Number(v) || 1.0));
    currentBrightness = f;
    ambient.intensity = BASE_INTENSITIES.ambient * f;
    sun.intensity     = BASE_INTENSITIES.sun * f;
    fill.intensity    = BASE_INTENSITIES.fill * f;
    ceilSpots.forEach((s, i) => { s.intensity = BASE_INTENSITIES.spots[i] * f; });
    scene.environmentIntensity = BASE_ENV_INTENSITY * f;
    renderer.toneMappingExposure = BASE_EXPOSURE * f;
    if (persist) { try { localStorage.setItem('pharmacy3d.brightness', String(f)); } catch {} }
  }
  // Mặc định 0.8 — quầy thuốc ngoài đời ánh sáng dịu, không chói; user có thể
  // kéo slider lên/xuống. Setting cũ trong localStorage vẫn được tôn trọng.
  const _saved = parseFloat(localStorage.getItem('pharmacy3d.brightness') || '');
  applyBrightness(Number.isFinite(_saved) ? _saved : 0.8, false);

  // Room dims — BACK_Z = -2.4 (KHÔNG phải -ROOM_D/2) để tủ sát quầy hơn, view không trống.
  const ROOM_W = 9, ROOM_D = 9, ROOM_H = 3.6;
  const BACK_Z = -2.4;
  const RIGHT_X = ROOM_W / 2;
  // Sàn + trần chỉ phủ đúng phần phòng từ tường sau (BACK_Z) ra phía trước (ROOM_D/2),
  // không kéo dài ra phía sau tường — tránh lộ "đuôi" khi xoay camera.
  const sideDepth = ROOM_D / 2 - BACK_Z;
  const sideCenterZ = (BACK_Z + ROOM_D / 2) / 2;

  // Floor — sàn gạch tile trắng kem; tile ~3m/repeat
  const floorTex = makePharmacyFloorTex();
  floorTex.repeat.set(3, Math.max(1, Math.round(sideDepth / 3)));
  const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(ROOM_W, sideDepth),
    new THREE.MeshStandardMaterial({ map: floorTex, roughness: 0.85, metalness: 0.04 })
  );
  floor.rotation.x = -Math.PI / 2;
  floor.position.z = sideCenterZ;
  floor.receiveShadow = true;
  scene.add(floor);

  // Walls — tile xanh nhạt giống lab, chỉ 3 mặt (KHÔNG tường trước).
  const wallMat = new THREE.MeshStandardMaterial({ map: makePharmacyWallTex(), roughness: 0.82 });
  const backWall = new THREE.Mesh(new THREE.BoxGeometry(ROOM_W, ROOM_H, 0.1), wallMat);
  backWall.position.set(0, ROOM_H / 2, BACK_Z - 0.05);
  scene.add(backWall);
  const leftWall = new THREE.Mesh(new THREE.BoxGeometry(0.1, ROOM_H, sideDepth), wallMat);
  leftWall.position.set(-ROOM_W / 2 - 0.05, ROOM_H / 2, sideCenterZ);
  scene.add(leftWall);
  const rightWall = new THREE.Mesh(new THREE.BoxGeometry(0.1, ROOM_H, sideDepth), wallMat);
  rightWall.position.set(ROOM_W / 2 + 0.05, ROOM_H / 2, sideCenterZ);
  scene.add(rightWall);
  // Trần — chỉ phủ đúng phần phòng trong khung tường (BACK_Z → ROOM_D/2).
  const ceil = new THREE.Mesh(
    new THREE.PlaneGeometry(ROOM_W, sideDepth),
    new THREE.MeshStandardMaterial({ color: 0xfafbfd, roughness: 0.9 })
  );
  ceil.position.set(0, ROOM_H, sideCenterZ);
  ceil.rotation.x = Math.PI / 2;
  scene.add(ceil);

  // ── CABINETS — port theo "Bản mô tả nhà thuốc chỉnh sửa 1.docx" ─────────
  // 4 tủ sau lưng: 2 Rx + 2 OTC, mỗi tủ 7 ngăn, banner "THUỐC KÊ ĐƠN Rx"/"THUỐC KHÔNG KÊ ĐƠN OTC".
  // 3 tủ bên: special_control (4 ngăn, thấp hơn, cửa kính) + 2 "Sản phẩm KP thuốc".
  const drugMeshes = []; // { mesh, drug, homePosition }
  // Tất cả cánh có thể click mở/đóng (counter bays + tủ kiểm soát đặc biệt + fridge).
  // Khai báo Ở ĐÂY (trước buildCabinet) để các closure đẩy hinge vào.
  const openableDoors = [];
  const BACK_CAB_W = 1.7, BACK_CAB_H = 2.30, BACK_CAB_D = 0.55, BACK_CAB_GAP = 0.18;
  const backCabs = CABINETS.filter(c => c.zone === 'back');
  const BACK_TOTAL_W = backCabs.length * BACK_CAB_W + (backCabs.length - 1) * BACK_CAB_GAP;
  const SIDE_CAB_W = 1.6, SIDE_CAB_H_TALL = 2.30, SIDE_CAB_H_LOW = 1.40, SIDE_CAB_D = 0.55, SIDE_CAB_GAP = 0.18;
  const sideCabs = CABINETS.filter(c => c.zone === 'side');
  const SIDE_TOTAL_W = sideCabs.length * SIDE_CAB_W + (sideCabs.length - 1) * SIDE_CAB_GAP;
  const COUNTER_W = 4.2, COUNTER_H = 1.0, COUNTER_D = 0.63, COUNTER_Z = 1.42; // mỏng hơn ~10% + đẩy ra gần cửa

  // Helper: tạo CanvasTexture cho banner / shelf-label.
  function makeTextTexture(text, opts = {}) {
    const w = opts.w || 512, h = opts.h || 96;
    const canvas = document.createElement('canvas');
    canvas.width = w; canvas.height = h;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = opts.bg || '#ffffff';
    ctx.fillRect(0, 0, w, h);
    if (opts.border) {
      ctx.strokeStyle = opts.border;
      ctx.lineWidth = 4;
      ctx.strokeRect(2, 2, w - 4, h - 4);
    }
    ctx.fillStyle = opts.color || '#0f172a';
    ctx.font = `bold ${opts.fontSize || 36}px Inter, system-ui, sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    // Multi-line wrapping
    const words = text.split(/\s+/);
    const lines = [];
    let line = '';
    const maxWidth = w - 24;
    for (const word of words) {
      const test = line ? line + ' ' + word : word;
      if (ctx.measureText(test).width > maxWidth && line) {
        lines.push(line);
        line = word;
      } else {
        line = test;
      }
    }
    if (line) lines.push(line);
    const lineH = (opts.fontSize || 36) * 1.15;
    const startY = h / 2 - (lines.length - 1) * lineH / 2;
    lines.forEach((l, i) => ctx.fillText(l, w / 2, startY + i * lineH));
    const tex = new THREE.CanvasTexture(canvas);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }

  function buildCabinet(cab, W, H, D, shelfCount, opts = {}) {
    const cabGroup = new THREE.Group();
    // Body teal-green giống screenshot upstream
    const frameMat = new THREE.MeshStandardMaterial({ color: cab.accent, roughness: 0.55, metalness: 0.05 });
    const back = new THREE.Mesh(new THREE.BoxGeometry(W, H, 0.05), frameMat);
    back.position.set(0, H / 2, -D / 2 + 0.025);
    cabGroup.add(back);

    // Banner — TRẮNG bo tròn, chữ teal đậm, đặt PHÍA TRÊN tủ như screenshot
    const bannerH = 0.35;
    const bannerW = W * 0.95;
    const bannerTex = makeTextTexture(cab.label, {
      w: 1024, h: 256,
      bg: '#ffffff',
      color: '#0f766e',  // teal đậm
      fontSize: 80
    });
    const bannerMat = new THREE.MeshStandardMaterial({
      map: bannerTex, roughness: 0.55,
      polygonOffset: true, polygonOffsetFactor: -6, polygonOffsetUnits: -6
    });
    // Banner đẩy ra trước nóc tủ 8cm (trước 10cm) — đứng riêng, ko z-fight.
    const banner = new THREE.Mesh(new THREE.BoxGeometry(bannerW, bannerH, 0.04), bannerMat);
    banner.position.set(0, H + bannerH / 2 - 0.02, D / 2 + 0.08);
    cabGroup.add(banner);

    // Side rails — cùng màu teal cho liền mạch
    const railL = new THREE.Mesh(new THREE.BoxGeometry(0.04, H, D), frameMat);
    railL.position.set(-W / 2 + 0.02, H / 2, 0); cabGroup.add(railL);
    const railR = new THREE.Mesh(new THREE.BoxGeometry(0.04, H, D), frameMat);
    railR.position.set(W / 2 - 0.02, H / 2, 0); cabGroup.add(railR);
    // Đáy tủ (kick board)
    const baseRail = new THREE.Mesh(new THREE.BoxGeometry(W, 0.12, D), frameMat);
    baseRail.position.set(0, 0.06, 0); cabGroup.add(baseRail);
    // Nóc tủ — kín đỉnh, cùng accent color cho liền mạch với khung tủ.
    const topPanel = new THREE.Mesh(new THREE.BoxGeometry(W, 0.06, D), frameMat);
    topPanel.position.set(0, H - 0.03, 0);
    topPanel.castShadow = topPanel.receiveShadow = true;
    cabGroup.add(topPanel);

    // Shelves — màu cream giống screenshot
    const shelfMat = new THREE.MeshStandardMaterial({ color: 0xfef3c7, roughness: 0.65 });
    const shelfYs = [];
    const usableH = H - 0.25;
    for (let s = 0; s < shelfCount; s++) {
      const y = 0.18 + s * usableH / shelfCount;
      shelfYs.push(y);
      const shelf = new THREE.Mesh(new THREE.BoxGeometry(W - 0.06, 0.04, D - 0.04), shelfMat);
      shelf.position.set(0, y, 0); shelf.receiveShadow = true;
      cabGroup.add(shelf);
    }

    // (Nhãn nhóm dược lý render Ở DƯỚI — sau khi đã biết shelfLabelOverride
    // do auto-split kệ đông.)

    // Cửa kính tủ kiểm soát đặc biệt — 2 CÁNH mở 2 bên (kiểu tủ trưng bày).
    // Hinge trái ở mép trái, hinge phải ở mép phải. Click cánh → mở/đóng.
    if (opts.glassDoor) {
      // Kính transparent (KHÔNG transmission) — tránh transmission render-pass nặng
      // trên Safari/mobile; vẫn trong suốt nhờ opacity.
      const glassMat = new THREE.MeshStandardMaterial({
        color: 0xbfdbfe, transparent: true, opacity: 0.28, roughness: 0.08, metalness: 0.0
      });
      const glassW = W - 0.08;
      // Cao kín gần như toàn mặt tủ: từ trên base kick (~y=0.12) lên sát nóc
      // (~y=H-0.04). Hinge nâng lên giữa khoảng đó để door cân.
      const glassH = H - 0.16;
      const glassCenterY = H / 2 + 0.04;
      const halfW = (glassW - 0.01) / 2; // chừa khe 1cm giữa 2 cánh
      const frameT = 0.018;
      const frameMatLocal = new THREE.MeshStandardMaterial({ color: cab.accent || 0x0d9488, roughness: 0.5 });
      const handleMat = new THREE.MeshStandardMaterial({ color: 0xcbd5e1, metalness: 0.7, roughness: 0.3 });

      // side: -1 = cánh trái (hinge mép trái, mở ra ngoài -Y), +1 = cánh phải
      const addDoor = (side) => {
        const hinge = new THREE.Group();
        // side=-1 → hinge ở -glassW/2 (mở -π/2.6 = mở sang trái khi đứng nhìn vào)
        // side=+1 → hinge ở +glassW/2 (mở +π/2.6 = mở sang phải)
        hinge.position.set(side * glassW / 2, glassCenterY, D / 2 + 0.03);
        cabGroup.add(hinge);
        // Mở RA NGOÀI (về phía trước cabinet, mở rộng góc để nhìn vào trong rõ):
        // cánh trái xoay +, cánh phải xoay − quanh trục Y → 2 cánh "tách" ra
        hinge.userData = { isOpen: false, openAngle: side * Math.PI / 2.1 };
        openableDoors.push(hinge);

        // Anchor: cánh trái mở rộng từ hinge sang phải (+halfW/2),
        // cánh phải mở rộng từ hinge sang trái (-halfW/2).
        const panelCx = -side * halfW / 2;
        const panel = new THREE.Mesh(
          new THREE.BoxGeometry(halfW, glassH, 0.018),
          glassMat
        );
        panel.position.set(panelCx, 0, 0);
        panel.userData = { fridgeDoor: hinge };
        hinge.add(panel);
        // Khung kính 4 thanh viền
        [[panelCx,                       glassH / 2 - frameT / 2, halfW, frameT],
         [panelCx,                      -glassH / 2 + frameT / 2, halfW, frameT],
         [panelCx - halfW / 2 + frameT / 2,                    0, frameT, glassH],
         [panelCx + halfW / 2 - frameT / 2,                    0, frameT, glassH]].forEach(p => {
          const bar = new THREE.Mesh(new THREE.BoxGeometry(p[2], p[3], 0.020), frameMatLocal);
          bar.position.set(p[0], p[1], 0.005);
          bar.userData = { fridgeDoor: hinge };
          hinge.add(bar);
        });
        // Tay nắm — đặt sát mép GIỮA (đối diện hinge) cho 2 cánh đối xứng
        const handle = new THREE.Mesh(
          new THREE.CylinderGeometry(0.010, 0.010, 0.08, 12),
          handleMat
        );
        handle.rotation.z = Math.PI / 2;
        // Mép giữa của cánh: cánh trái = +halfW (gần khe), cánh phải = -halfW
        const handleX = -side * (halfW - 0.04);
        handle.position.set(handleX, 0, 0.026);
        handle.userData = { fridgeDoor: hinge };
        hinge.add(handle);
      };
      addDoor(-1);
      addDoor(+1);
    }

    // Distribute drugs onto shelves theo DRUG_PLACEMENT: mỗi drug có
    // shelfIdx CỐ ĐỊNH (theo nhóm dược lý). Trong cùng 1 ngăn, các drugs dàn
    // ngang trục X. Mỗi drug = stack 3 hộp xếp dọc Z (ngoài→trong). Mỗi hộp
    // là 1 entry độc lập trong drugMeshes để pick từng hộp một.
    const drugsForCab = ALL_DRUGS.filter(d => {
      const p = DRUG_PLACEMENT[d.id];
      return p && p.cabinetId === cab.id;
    });
    // Group by shelfIdx
    const byShelf = new Map();
    for (const drug of drugsForCab) {
      const p = DRUG_PLACEMENT[drug.id];
      if (p.shelfIdx < 0 || p.shelfIdx >= shelfCount) continue;
      if (!byShelf.has(p.shelfIdx)) byShelf.set(p.shelfIdx, []);
      byShelf.get(p.shelfIdx).push({ drug, placement: p });
    }
    // Auto-split kệ đông (>MAX_PER_SHELF): lặp đến khi MỌI ngăn ≤ MAX.
    // Tìm ngăn TRỐNG GẦN NHẤT theo khoảng cách Manhattan; mỗi lần split chỉ
    // chuyển ½ items sang ngăn mới. Cho phép split nhiều lần (1 group có thể
    // chiếm 3+ ngăn nếu cần). Ngăn phụ không in nhãn — đã có ngăn chính.
    // Nới cao để auto-split KHÔNG dời thuốc khỏi ngăn đã gán theo sơ đồ tủ.
    // Ngăn đông (>~10 thuốc) được xử lý bằng co bề ngang hộp ở vòng đặt bên dưới.
    const MAX_PER_SHELF = 99;
    const usableWForCalc = W - 0.20;
    const shelfLabelOverride = new Map();
    // shelfIdx → mép trái tích lũy của các ô con (phân số 0..1), tính ở vòng đặt
    // hộp theo trọng số số thuốc. Vòng dựng vách/nhãn dùng lại để khớp vị trí.
    const cellEdgesByShelf = new Map();
    const findEmptyShelf = (origin) => {
      // Quét theo bán kính tăng dần (1,2,3,...) — ưu tiên ngăn TRÊN (origin+k)
      // trước rồi tới ngăn DƯỚI (origin-k), để overflow đi xuống một cách
      // tự nhiên (giống thực tế bày kệ).
      for (let k = 1; k < shelfCount; k++) {
        for (const n of [origin + k, origin - k]) {
          if (n >= 0 && n < shelfCount && !byShelf.has(n)) return n;
        }
      }
      return null;
    };
    let safety = 0;
    while (safety++ < 50) {
      // Chọn ngăn đông nhất hiện tại
      let densestIdx = -1, densestCount = 0;
      for (const [si, items] of byShelf) {
        if (items.length > densestCount) { densestCount = items.length; densestIdx = si; }
      }
      if (densestCount <= MAX_PER_SHELF) break;
      const target = findEmptyShelf(densestIdx);
      if (target == null) break; // Không còn ngăn trống → đành chấp nhận
      const items = byShelf.get(densestIdx);
      const mid = Math.ceil(items.length / 2);
      byShelf.set(densestIdx, items.slice(0, mid));
      byShelf.set(target, items.slice(mid));
      shelfLabelOverride.set(target, '__EMPTY__');
    }
    for (const [shelfIdx, items] of byShelf) {
      const usableW = W - 0.20;
      // Số ô con trên ngăn (nhiều nhóm dược lý chung 1 ngăn → vách " · ").
      const cells = Math.max(1, ...items.map(it => it.placement.cells || 1));
      const byCell = new Map();
      for (const it of items) {
        const c = Math.min(Math.max(it.placement.cell || 0, 0), cells - 1);
        if (!byCell.has(c)) byCell.set(c, []);
        byCell.get(c).push(it);
      }
      // Bề ngang mỗi ô con TỈ LỆ với số thuốc trong ô (yêu cầu thầy 28/6 #1):
      // vách ngăn tự dịch về phía nhóm ÍT thuốc (vd Phụ khoa Rx 2 thuốc → ô hẹp,
      // dồn sát nhau) còn nhóm NHIỀU thuốc (Tiêu hóa Rx) trải rộng → mọi thuốc
      // trên ngăn được dàn ĐỀU một mật độ. edges[] = mép trái tích lũy (phân số 0..1)
      // để vòng dựng vách/nhãn phía dưới dùng CHUNG → vách khớp đúng chỗ chia hộp.
      const weights = [];
      for (let c = 0; c < cells; c++) weights.push(Math.max(1, (byCell.get(c) || []).length));
      const totW = weights.reduce((a, b) => a + b, 0) || 1;
      const edges = [0];
      for (let c = 0; c < cells; c++) edges.push(edges[c] + weights[c] / totW);
      cellEdgesByShelf.set(shelfIdx, edges);
      for (const [c, cellItems] of byCell) {
        const perCell = cellItems.length;
        const cellW = usableW * (weights[c] / totW);
        const slotW = cellW / Math.max(perCell, 1);
        const cellLeft = -usableW / 2 + edges[c] * usableW;
        cellItems.forEach(({ drug, placement }, slotIdx) => {
          // Inject brand color + groupLabel để buildSingleDrugBox dùng (Phase H).
          // Yêu cầu thầy: CHỈ ~20% hộp đổi sang màu SẪM/ĐẬM + chữ TRẮNG; còn lại
          // giữ nền sáng + chữ đậm như cũ. isColoredBox() chọn ~20% theo hash SKU.
          const _accentC = placement.brandColor || drug.groupAccent || '#0d9488';
          const _colored = isColoredBox(drug);
          const _bodyC = _colored ? darkenHex(_accentC, 0.18) : lightenHex(_accentC, 0.82);
          const drugWithBrand = {
            ...drug,
            groupAccent: _accentC,
            groupLabel: placement.groupLabel || drug.groupLabel,
            bodyColor: _bodyC,
            textDark: !_colored   // hộp màu sẫm → chữ sáng/trắng; hộp sáng → chữ đậm
          };
          const style = getBoxStyle(drugWithBrand);
          // Co bề ngang hộp cho vừa slot (ngăn đông theo sơ đồ) — giữ chiều cao,
          // co ngang + sâu để không chồng lên hộp kế bên.
          const maxW = slotW * 0.9;
          if (style.w > maxW) { const k = maxW / style.w; style.w *= k; style.d *= Math.max(k, 0.72); }
          // Số hộp = ĐÚNG tồn kho (cột "Tồn kho", bỏ giới hạn 12). Dàn ĐỀU theo
          // chiều NGANG để lấp đầy bề rộng slot (yêu cầu: ngăn bớt trống, hàng
          // tiêm/dịch truyền trải ngang). Hàng trước phủ hết các cột rồi mới xếp
          // lùi vào sâu (Z) cho các hộp còn lại — nhìn từ ngoài luôn thấy đầy mặt.
          // TỐI ƯU HIỆU NĂNG (yêu cầu thầy): chỉ DỰNG tối đa N hộp/thuốc thay vì
          // cả tồn kho (có thuốc tồn ~200 → 200 mesh!). Tồn kho THẬT vẫn hiện ở
          // inspector (getDrugMeta) — đây chỉ là số hộp bày trên kệ.
          const STOCK_RENDER_CAP = 14;
          const stock = Math.min(STOCK_RENDER_CAP, Math.max(1, Math.round(Number(drug.stock) || 1)));
          style.copies = stock;
          const slotLeft = cellLeft + slotIdx * slotW;
          const y = shelfYs[shelfIdx] + 0.02 + style.h / 2;
          let pitchZ = style.d * 1.05;
          const zCap = Math.max(1, Math.floor((D - 0.08) / pitchZ));   // hộp tối đa xếp sâu 1 cột
          const colPitchMin = style.w * 1.06;
          const maxCols = Math.max(1, Math.floor((slotW * 0.97) / colPitchMin)); // cột vừa bề ngang slot
          const minCols = Math.ceil(stock / zCap);                     // đủ cột để không tràn quá sâu
          const nCols = Math.max(minCols, Math.min(maxCols, stock));
          const subW = slotW / nCols;                                  // mỗi cột 1 ô con → dàn đều
          if (style.w > subW * 0.92) {                                 // co hộp nếu cột hẹp
            const k = (subW * 0.92) / style.w; style.w *= k; style.d *= Math.max(k, 0.7);
            pitchZ = style.d * 1.05;
          }
          const frontEdgeZ = D / 2 - 0.025 - style.d / 2;
          for (let i = 0; i < stock; i++) {
            const cx = i % nCols;                       // lấp hết hàng trước rồi mới lùi vào sâu
            const dr = Math.floor(i / nCols);
            const colX = slotLeft + subW * (cx + 0.5);
            const z = frontEdgeZ - dr * pitchZ;
            // MỌI hộp đều có nhãn mặt trước (yêu cầu thầy: lấy hộp ngoài cùng đi
            // không lộ hộp trắng). Nhãn mặt BÊN chỉ ở hàng trước (tiết kiệm draw call).
            const box = buildSingleDrugBox(drugWithBrand, style, true, false, dr === 0);
            box.position.set(colX, y, z);
            box.userData = {
              drugId: drug.id, drug: drugWithBrand, style,
              boxIndex: i, homePosition: box.position.clone(), cabinet: cab
            };
            cabGroup.add(box);
            drugMeshes.push(box);
          }
        });
      }
    }

    // Nhãn nhóm dược lý dán mép TRƯỚC mỗi ngăn (sau auto-split để dùng được
    // shelfLabelOverride). Nếu nhãn có dấu " · " → 2 nhóm chia chung 1 ngăn:
    //   • render 2 nhãn nhỏ half-width
    //   • thêm 1 VÁCH NGĂN ĐỨNG dày 4cm giữa ngăn (chia làm 2 ô)
    const shelfH = usableH / shelfCount;
    if (Array.isArray(cab.shelfLabels) || shelfLabelOverride.size > 0) {
      // Nhãn in TRỰC TIẾP lên mép trước khay — không còn là biển nổi 7cm.
      // Cao bằng độ dày khay (4cm), dài bằng mép trước khay (W-0.06),
      // đặt tại tâm Y của shelf, Z = mặt trước khay; polygonOffset đẩy ra trước
      // tránh z-fight với mặt gỗ shelf bên dưới.
      const labelTagH = 0.052;        // cao hơn để chữ TO, dễ đọc khi lấy thuốc
      const labelTagW = W - 0.06;
      const labelTagZ = D / 2 - 0.018;
      const labelThk = 0.004;
      for (let s = 0; s < shelfCount; s++) {
        // Override '__EMPTY__' = ngăn phụ overflow, không render text
        const ovr = shelfLabelOverride.get(s);
        if (ovr === '__EMPTY__') continue;
        const text = (ovr || (cab.shelfLabels && cab.shelfLabels[s]) || '').trim();
        if (!text) continue;
        const labelMat = (str, widthM) => {
          const tex = makeTextTexture(str.toUpperCase(), {   // IN HOA + đậm cho dễ nhận biết
            w: Math.max(768, widthM * 2400), h: 132,
            bg: '#fffbeb', color: '#7c2d12', fontSize: 58
          });
          return new THREE.MeshStandardMaterial({
            map: tex, roughness: 0.55,
            polygonOffset: true, polygonOffsetFactor: -6, polygonOffsetUnits: -6
          });
        };
        const parts = text.split(' · ').map(t => t.trim()).filter(Boolean);
        const n = parts.length;
        if (n > 1) {
          // Nhiều nhóm dược lý chung 1 ngăn → chia ô theo TRỌNG SỐ số thuốc (khớp
          // vòng đặt hộp) → vách đứng dịch về phía nhóm ít thuốc. Fallback chia đều
          // nếu thiếu dữ liệu edges.
          const ed = cellEdgesByShelf.get(s);
          const useEdges = ed && ed.length === n + 1;
          const segLeft = (ci) => (useEdges ? ed[ci] : ci / n) * usableWForCalc;
          const segW = (ci) => (useEdges ? ed[ci + 1] - ed[ci] : 1 / n) * usableWForCalc;
          parts.forEach((p, ci) => {
            const cw = segW(ci);
            const innerW = Math.max(0.05, cw - 0.03);
            const tag = new THREE.Mesh(
              new THREE.BoxGeometry(innerW, labelTagH, labelThk),
              labelMat(p, innerW)
            );
            tag.position.set(-usableWForCalc / 2 + segLeft(ci) + cw / 2, shelfYs[s], labelTagZ);
            cabGroup.add(tag);
          });
          const dividerH = shelfH * 0.92;
          const dividerY = shelfYs[s] + dividerH / 2 + 0.025;
          const dividerMat = new THREE.MeshStandardMaterial({
            color: cab.accent || 0x0d9488, roughness: 0.55
          });
          const dThk = 0.012;
          for (let k = 1; k < n; k++) {
            const dv = new THREE.Mesh(
              new THREE.BoxGeometry(dThk, dividerH, D - 0.06),
              dividerMat
            );
            dv.position.set(-usableWForCalc / 2 + segLeft(k), dividerY, 0);
            cabGroup.add(dv);
          }
        } else {
          // Nhãn đơn full width
          const tag = new THREE.Mesh(
            new THREE.BoxGeometry(labelTagW, labelTagH, labelThk),
            labelMat(text, labelTagW)
          );
          tag.position.set(0, shelfYs[s], labelTagZ);
          cabGroup.add(tag);
        }
      }
    }
    return cabGroup;
  }

  // 4 tủ sau lưng — mỗi tủ 7 ngăn (theo docx)
  backCabs.forEach((cab, i) => {
    const x = -BACK_TOTAL_W / 2 + BACK_CAB_W / 2 + i * (BACK_CAB_W + BACK_CAB_GAP);
    const g = buildCabinet(cab, BACK_CAB_W, BACK_CAB_H, BACK_CAB_D, cab.shelves || 7);
    g.position.set(x, 0, BACK_Z + BACK_CAB_D / 2);
    scene.add(g);
  });
  // 3 tủ bên — special_control thấp + cửa kính (hẹp hơn, dịch ra giữa phòng),
  // supp_1/supp_2 cao bình thường. Mỗi cab có width riêng nên positioning
  // theo width cộng dồn thay vì SIDE_CAB_W cố định.
  const sideCabWidths = sideCabs.map(cab =>
    cab.glassDoor ? 1.30 : SIDE_CAB_W // tủ kiểm soát đặc biệt hẹp hơn 30cm
  );
  const sideTotalW = sideCabWidths.reduce((a, w) => a + w, 0)
    + (sideCabs.length - 1) * SIDE_CAB_GAP;
  let zCursor = -sideTotalW / 2 + 0.6;
  sideCabs.forEach((cab, i) => {
    const isLow = cab.lowProfile;
    const H = isLow ? SIDE_CAB_H_LOW : SIDE_CAB_H_TALL;
    const w = sideCabWidths[i];
    const z = zCursor + w / 2;
    zCursor += w + SIDE_CAB_GAP;
    const g = buildCabinet(cab, w, H, SIDE_CAB_D, cab.shelves || 5, { glassDoor: !!cab.glassDoor });
    // Tất cả tủ side đều sát tường phải
    g.position.set(RIGHT_X - SIDE_CAB_D / 2, 0, z);
    g.rotation.y = -Math.PI / 2;
    scene.add(g);
  });

  // Front counter — mặt bàn kem + body chia 4 NGĂN × 2 TẦNG. 2 ngăn ngoài cùng
  // (1, 4) là tủ KÍNH trưng bày "Thuốc dùng ngoài Rx" / "Thuốc dùng ngoài OTC";
  // 2 ngăn giữa (2, 3) là tủ KÍN tránh sáng đựng "Thuốc chờ xử lý" / "Hồ sơ tài
  // liệu". Mỗi ngăn dán nhãn mặt trước (+z, hướng về khách).
  const counter = new THREE.Group();
  const counterTop = new THREE.Mesh(
    new THREE.BoxGeometry(COUNTER_W + 0.1, 0.08, COUNTER_D + 0.1),
    new THREE.MeshStandardMaterial({ color: 0xfef3c7, roughness: 0.45, metalness: 0.05 })
  );
  counterTop.position.set(0, COUNTER_H, COUNTER_Z);
  counterTop.castShadow = counterTop.receiveShadow = true;
  counter.add(counterTop);

  const COUNTER_BODY_H = COUNTER_H - 0.08;
  const CABINET_BAYS = [
    { idx: 0, label: 'Thuốc dùng ngoài Rx',  type: 'glass', accent: '#0ea5e9' },
    { idx: 1, label: 'Thuốc dùng ngoài OTC', type: 'glass', accent: '#0ea5e9' },
    { idx: 2, label: 'Thuốc chờ xử lý',      type: 'solid', accent: '#0d9488' },
    { idx: 3, label: 'Hồ sơ tài liệu',       type: 'glass', accent: '#0d9488' }
  ];
  const BAY_W = COUNTER_W / CABINET_BAYS.length; // 1.05m mỗi ngăn
  const BAY_GAP = 0.02;
  const tealMat = new THREE.MeshStandardMaterial({ color: 0x0d9488, roughness: 0.5, metalness: 0.1 });
  const innerDarkMat = new THREE.MeshStandardMaterial({ color: 0x065f46, roughness: 0.7 });
  const glassMat = new THREE.MeshStandardMaterial({
    color: 0xbfdbfe, transparent: true, opacity: 0.26, roughness: 0.08, metalness: 0.0,
    side: THREE.DoubleSide  // tủ kính 2 mặt — nhìn xuyên cả trước lẫn sau
  });

  CABINET_BAYS.forEach((bay) => {
    const bayGroup = new THREE.Group();
    const cx = -COUNTER_W / 2 + BAY_W / 2 + bay.idx * BAY_W;
    bayGroup.position.set(cx, COUNTER_BODY_H / 2, COUNTER_Z);
    counter.add(bayGroup);
    // Vỏ ngăn (5 mặt — bỏ mặt trước để lộ nội thất)
    const wallT = 0.02;
    const w = BAY_W - BAY_GAP;
    const d = COUNTER_D;
    // Mặt sau — tủ KÍNH 2 MẶT: ngăn glass dùng kính ở mặt sau để dược sĩ nhìn +
    // lấy thuốc dùng ngoài từ phía sau quầy (theo docx).
    const back = new THREE.Mesh(new THREE.BoxGeometry(w, COUNTER_BODY_H, wallT), bay.type === 'glass' ? glassMat : tealMat);
    back.position.set(0, 0, -d / 2 + wallT / 2);
    bayGroup.add(back);
    // 2 vách trái/phải
    const sideL = new THREE.Mesh(new THREE.BoxGeometry(wallT, COUNTER_BODY_H, d), tealMat);
    sideL.position.set(-w / 2 + wallT / 2, 0, 0); bayGroup.add(sideL);
    const sideR = new THREE.Mesh(new THREE.BoxGeometry(wallT, COUNTER_BODY_H, d), tealMat);
    sideR.position.set( w / 2 - wallT / 2, 0, 0); bayGroup.add(sideR);
    // Đáy + nóc + vạch GIỮA (chia 2 tầng)
    const floor = new THREE.Mesh(new THREE.BoxGeometry(w, wallT, d), tealMat);
    floor.position.set(0, -COUNTER_BODY_H / 2 + wallT / 2, 0); bayGroup.add(floor);
    const ceil = new THREE.Mesh(new THREE.BoxGeometry(w, wallT, d), tealMat);
    ceil.position.set(0, COUNTER_BODY_H / 2 - wallT / 2, 0); bayGroup.add(ceil);
    const midShelf = new THREE.Mesh(
      new THREE.BoxGeometry(w - 0.01, wallT, d - 0.01),
      new THREE.MeshStandardMaterial({ color: 0xfef3c7, roughness: 0.55 })
    );
    midShelf.position.set(0, 0, 0); bayGroup.add(midShelf);

    // Mặt trước: 2 CÁNH mở 2 bên (tủ 2 cánh). Mỗi cánh = hinge group riêng,
    // hinge ở mép NGOÀI, mở ra trước (về phía khách hàng).
    const doorInsetY = 0.06;
    const doorH = COUNTER_BODY_H - doorInsetY;
    const doorFrontZ = d / 2 + 0.030;
    const fullPanelW = w - 0.04;
    const halfPanelW = (fullPanelW - 0.01) / 2; // chừa khe 1cm giữa 2 cánh
    const frameT = 0.012;
    const handleMatBay = new THREE.MeshStandardMaterial({ color: 0xcbd5e1, metalness: 0.7, roughness: 0.3 });
    const panelMat = bay.type === 'glass' ? glassMat : innerDarkMat;
    const panelThk = bay.type === 'glass' ? 0.015 : 0.02;

    // zSign = +1 cửa mặt TRƯỚC (khách), -1 cửa mặt SAU (dược sĩ).
    const addBayDoor = (side, zSign = 1) => {
      const hinge = new THREE.Group();
      hinge.position.set(side * fullPanelW / 2, 0, zSign * doorFrontZ);
      bayGroup.add(hinge);
      hinge.userData = { isOpen: false, openAngle: zSign * side * Math.PI / 2.2 };
      openableDoors.push(hinge);
      const panelCx = -side * halfPanelW / 2;
      const panel = new THREE.Mesh(
        new THREE.BoxGeometry(halfPanelW, doorH, panelThk),
        panelMat
      );
      panel.position.set(panelCx, 0, 0);
      panel.userData = { fridgeDoor: hinge };
      hinge.add(panel);
      if (bay.type === 'glass') {
        [[panelCx,                          doorH / 2 - frameT / 2, halfPanelW, frameT],
         [panelCx,                         -doorH / 2 + frameT / 2, halfPanelW, frameT],
         [panelCx - halfPanelW / 2 + frameT / 2,                 0, frameT, doorH],
         [panelCx + halfPanelW / 2 - frameT / 2,                 0, frameT, doorH]].forEach(p => {
          const bar = new THREE.Mesh(new THREE.BoxGeometry(p[2], p[3], 0.014), tealMat);
          bar.position.set(p[0], p[1], zSign * 0.008);
          bar.userData = { fridgeDoor: hinge };
          hinge.add(bar);
        });
      }
      const handle = new THREE.Mesh(
        new THREE.CylinderGeometry(0.010, 0.010, 0.07, 12),
        handleMatBay
      );
      handle.rotation.z = Math.PI / 2;
      handle.position.set(-side * (halfPanelW - 0.04), 0, zSign * 0.018);
      handle.userData = { fridgeDoor: hinge };
      hinge.add(handle);
    };
    // TẤT CẢ tủ quầy: mặt TRƯỚC CỐ ĐỊNH (kính trong với tủ glass / kín với tủ solid —
    // nhìn được nhưng KHÔNG mở) + cửa MỞ phía SAU để dược sĩ thao tác (yêu cầu thầy).
    const pharmacistAccess = true;
    const frontPane = new THREE.Mesh(
      new THREE.BoxGeometry(fullPanelW, doorH, 0.012),
      bay.type === 'glass' ? glassMat : innerDarkMat
    );
    frontPane.position.set(0, 0, doorFrontZ);
    bayGroup.add(frontPane);
    // Tủ KÍN (chờ xử lý): mặt trước đặc che mất khay giữa → thêm 1 THANH NGANG
    // ở giữa mặt trước cho giống các tủ kính (vốn lộ vạch khay giữa qua kính).
    if (bay.type !== 'glass') {
      const midBar = new THREE.Mesh(
        new THREE.BoxGeometry(fullPanelW, 0.035, 0.02),
        new THREE.MeshStandardMaterial({ color: 0xfef3c7, roughness: 0.5 })
      );
      midBar.position.set(0, 0, doorFrontZ + 0.013);
      bayGroup.add(midBar);
    }
    addBayDoor(-1, -1); addBayDoor(+1, -1);

    // Nhãn mặt trước — đặt CHÍCH PHÍA TRÊN cánh, lệch ra trước thêm 4cm so
    // với mặt body để không bao giờ z-fight với cánh/khung.
    const tex = makeTextTexture(bay.label.toUpperCase(), {
      w: 768, h: 96, bg: '#ffffff', color: bay.accent, fontSize: 44
    });
    const labelMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(w * 0.86, 0.07),
      new THREE.MeshStandardMaterial({
        map: tex, transparent: true,
        polygonOffset: true, polygonOffsetFactor: -4, polygonOffsetUnits: -4
      })
    );
    // y = mép trên cánh; z = trước cánh 3cm (cánh đã ở d/2+0.012 → label ở d/2+0.05)
    labelMesh.position.set(0, doorH / 2 + 0.02, d / 2 + 0.05);
    bayGroup.add(labelMesh);
    // Nhãn mặt SAU (phía dược sĩ) — "dán nhãn trước và sau" (docx): tủ dùng ngoài + tủ hồ sơ.
    if (pharmacistAccess || bay.idx === 3) {
      const texB = makeTextTexture(bay.label.toUpperCase(), {
        w: 768, h: 96, bg: '#ffffff', color: bay.accent, fontSize: 44
      });
      const labelB = new THREE.Mesh(
        new THREE.PlaneGeometry(w * 0.86, 0.07),
        new THREE.MeshStandardMaterial({
          map: texB, transparent: true,
          polygonOffset: true, polygonOffsetFactor: -4, polygonOffsetUnits: -4
        })
      );
      labelB.position.set(0, doorH / 2 + 0.02, -d / 2 - 0.05);
      labelB.rotation.y = Math.PI;
      bayGroup.add(labelB);
    }
  });
  scene.add(counter);

  // ── Thuốc DÙNG NGOÀI / NHỎ MẮT-MŨI — XẾP TRONG TỦ KÍNH dưới quầy ────────────
  // Trước đây bày pad TRÊN mặt quầy (che lối, ở phía khách). Theo docx: cho hết
  // XUỐNG ngăn tủ kính 2 mặt, dược sĩ nhìn/lấy từ phía sau. Ngăn 0 = nhỏ mắt+mũi,
  // ngăn 1 = thuốc dùng ngoài (bôi da); mỗi ngăn xếp 2 tầng (dưới + trên khay giữa).
  const frontDrugs = ALL_DRUGS.filter(d => (d.cabinetId || '').startsWith('front_'));
  const renderBayDrugs = (bayIdx, drugs) => {
    if (!drugs.length) return;
    const bayCx = -COUNTER_W / 2 + BAY_W / 2 + bayIdx * BAY_W;
    const usableW = BAY_W - 0.16;
    const frontZ = COUNTER_Z + COUNTER_D / 2 - 0.10;     // gần mặt kính trước
    // Đáy 2 tầng (world Y) — ĐÚNG mặt kệ: tầng dưới = mặt sàn ngăn (~wallT),
    // tầng trên = mặt trên khay giữa (COUNTER_BODY_H/2 + wallT/2). Trước đây
    // +0.05/+0.04 khiến hộp lơ lửng cách kệ ~3cm.
    const tierBaseY = [0.022, COUNTER_BODY_H / 2 + 0.012];
    const half = Math.ceil(drugs.length / 2);
    [drugs.slice(0, half), drugs.slice(half)].forEach((tier, t) => {
      if (!tier.length) return;
      const cols = Math.min(tier.length, 7);
      const slotW = usableW / cols;
      tier.forEach((drug, idx) => {
        const style = getBoxStyle(drug);
        const maxW = slotW * 0.82;
        if (style.w > maxW) { const k = maxW / style.w; style.w *= k; style.d *= Math.max(k, 0.7); }
        style.copies = 1;
        const col = idx % cols, row = Math.floor(idx / cols);
        const x = bayCx - usableW / 2 + slotW / 2 + col * slotW;
        const y = tierBaseY[t] + style.h / 2;
        const z = frontZ - row * (style.d * 1.25);
        // backLabel=true: tủ kính 2 mặt → hộp có nhãn cả mặt sau (dược sĩ nhìn từ sau quầy).
        const box = buildSingleDrugBox(drug, style, true, true);
        box.position.set(x, y, z);
        box.userData = {
          drugId: drug.id, drug, style, boxIndex: 0,
          homePosition: box.position.clone(),
          cabinet: CABINETS.find(c => c.id === drug.cabinetId)
        };
        scene.add(box);
        drugMeshes.push(box);
      });
    });
  };
  // Chia theo Rx/OTC để khớp nhãn ngăn "Thuốc dùng ngoài Rx" / "Thuốc dùng ngoài OTC".
  // (Danh mục dùng ngoài hiện toàn OTC → ngăn Rx trống, sẽ đầy khi có thuốc dùng ngoài Rx.)
  renderBayDrugs(0, frontDrugs.filter(d => d.isRx));
  renderBayDrugs(1, frontDrugs.filter(d => !d.isRx));

  // ── P② Props BÁN LẺ trên mặt quầy (chỗ vừa giải phóng) ─────────────────────
  const propY = COUNTER_H + 0.04; // mặt quầy
  const propLabel = (text, w, bg, x, y, z, tiltX = -0.5) => {
    const m = new THREE.Mesh(
      new THREE.PlaneGeometry(w, w * 0.16),
      new THREE.MeshStandardMaterial({
        map: makeTextTexture(text, { w: 512, h: 96, bg, color: '#ffffff', fontSize: 54 }),
        transparent: true, polygonOffset: true, polygonOffsetFactor: -4, polygonOffsetUnits: -4
      })
    );
    m.position.set(x, y, z); m.rotation.x = tiltX; scene.add(m);
  };

  // Yêu cầu thầy #8: ĐÃ BỎ "GIỎ RA LẺ" riêng — gom chức năng vào KHAY BÁN HÀNG
  // (nay tạo dáng giỏ hở, xem khối pickTray bên dưới). Đơn vị ra lẻ cho vào BAO
  // BÌ RA LẺ (trắng/vàng/hồng/kín khí) rồi ghi nhãn.

  // HỘP RA LẺ — hộp kính trong, bên trong có khay inox + thanh gạt; nhãn "HỘP RA LẺ".
  const dispense = new THREE.Group();
  dispense.position.set(-1.5, propY, COUNTER_Z - 0.02);
  (() => {
    const glass = new THREE.MeshStandardMaterial({ color: 0xe0f2fe, transparent: true, opacity: 0.30, roughness: 0.08, metalness: 0.0, side: THREE.DoubleSide });
    const dw = 0.32, dh = 0.17, dd = 0.22, gt = 0.006;
    const mk = (w, h, d, x, y, z) => { const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), glass); m.position.set(x, y, z); dispense.add(m); };
    mk(dw, gt, dd, 0, gt / 2, 0);          // đáy
    mk(dw, gt, dd, 0, dh, 0);              // nóc
    mk(dw, dh, gt, 0, dh / 2, dd / 2);     // trước
    mk(dw, dh, gt, 0, dh / 2, -dd / 2);    // sau
    mk(gt, dh, dd, -dw / 2, dh / 2, 0);    // trái
    mk(gt, dh, dd, dw / 2, dh / 2, 0);     // phải
    const inox = new THREE.MeshStandardMaterial({ color: 0xcbd5e1, metalness: 0.7, roughness: 0.3 });
    const tray = new THREE.Mesh(new THREE.BoxGeometry(dw * 0.7, 0.012, dd * 0.6), inox); tray.position.set(0, 0.02, 0); dispense.add(tray);
    const spatula = new THREE.Mesh(new THREE.CylinderGeometry(0.005, 0.005, dw * 0.5, 8), inox); spatula.rotation.z = Math.PI / 2; spatula.position.set(0, 0.035, dd * 0.18); dispense.add(spatula);
  })();
  dispense.traverse(o => { if (o.isMesh) o.userData = { labelClick: true }; });
  dispense.userData = { labelClick: true };
  scene.add(dispense);
  propLabel('HỘP RA LẺ', 0.26, '#16a34a', -1.5, propY + 0.205, COUNTER_Z - 0.02, 0);

  // BAO BÌ RA LẺ — 1 KHAY trên quầy chứa 4 loại RIÊNG BIỆT: phong bì trắng/vàng/hồng
  // (có nhãn in theo mẫu, click để ghi nhãn + đựng vỉ/gói/viên/ống) + túi zip kín khí.
  const PKG_DEFS = [
    { type: 'white',  color: 0xffffff, hex: '#ffffff', outline: 0xcbd5e1, special: '' },
    { type: 'yellow', color: 0xfde68a, hex: '#fde68a', outline: 0xd97706, special: 'THUỐC DÙNG NGOÀI' },
    { type: 'pink',   color: 0xfbcfe8, hex: '#fbcfe8', outline: 0xbe185d, special: 'KIỂM SOÁT ĐẶC BIỆT' },
    { type: 'zip',    color: 0xcffafe, hex: '#cffafe', outline: 0x0891b2, airtight: true }
  ];
  // Tray bao bì ra lẻ đặt BÊN CẠNH "HỘP RA LẺ" (lệch phải, sát mép trước quầy)
  // để không che hộp ra lẻ.
  const PKG_TRAY_X = -1.02, PKG_TRAY_Z = COUNTER_Z + 0.30;
  const pkgTray = new THREE.Mesh(
    new THREE.BoxGeometry(0.56, 0.012, 0.20),
    new THREE.MeshStandardMaterial({ color: 0xe7e5e4, roughness: 0.6 })
  );
  pkgTray.position.set(PKG_TRAY_X, propY + 0.006, PKG_TRAY_Z);
  pkgTray.receiveShadow = true;
  scene.add(pkgTray);
  PKG_DEFS.forEach((p, i) => {
    const g = new THREE.Group();
    g.position.set(PKG_TRAY_X + (i - 1.5) * 0.13, propY + 0.012, PKG_TRAY_Z + 0.02);
    g.rotation.x = -0.42; // dựng nghiêng ra trước để thấy mặt nhãn
    const body = new THREE.Mesh(
      new THREE.BoxGeometry(0.10, 0.13, p.airtight ? 0.008 : 0.004),
      new THREE.MeshStandardMaterial({
        color: p.color, roughness: p.airtight ? 0.2 : 0.85,
        transparent: !!p.airtight, opacity: p.airtight ? 0.62 : 1, metalness: p.airtight ? 0.1 : 0
      })
    );
    body.position.y = 0.065; body.castShadow = true;
    g.add(body);
    if (p.airtight) {
      // Túi zip: thanh khoá zip trên miệng túi
      const strip = new THREE.Mesh(
        new THREE.BoxGeometry(0.092, 0.008, 0.01),
        new THREE.MeshStandardMaterial({ color: p.outline })
      );
      strip.position.set(0, 0.125, 0.005);
      g.add(strip);
    } else {
      // Nhãn in theo mẫu (mặt +Z)
      const face = new THREE.Mesh(
        new THREE.PlaneGeometry(0.094, 0.122),
        new THREE.MeshStandardMaterial({
          map: makePkgLabelTex({ color: p.hex, special: p.special }), roughness: 0.7,
          polygonOffset: true, polygonOffsetFactor: -4, polygonOffsetUnits: -4
        })
      );
      face.position.set(0, 0.065, 0.0035);
      g.add(face);
    }
    g.traverse(o => { if (o.isMesh) o.userData = { packageClick: true, packageType: p.type }; });
    g.userData = { packageClick: true, packageType: p.type };
    scene.add(g);
  });
  propLabel('BAO BÌ RA LẺ', 0.20, '#7c3aed', PKG_TRAY_X, propY + 0.20, PKG_TRAY_Z);

  // POS computer — port theo upstream: T-base + trụ + khớp xoay + 2 màn back-to-back
  // (15.6" cho dược sĩ, CFD 10" cho khách) + bàn phím nghiêng + chuột.
  const POS_X = 1.45;
  const pos = new THREE.Group();
  pos.scale.setScalar(0.72);

  // Đế chữ T
  const posBase = new THREE.Mesh(
    new THREE.BoxGeometry(0.5, 0.04, 0.42),
    new THREE.MeshStandardMaterial({ color: 0x0f172a, metalness: 0.35, roughness: 0.45 })
  );
  posBase.position.set(0, 0.025, 0); pos.add(posBase);
  const posBaseRim = new THREE.Mesh(
    new THREE.BoxGeometry(0.52, 0.012, 0.44),
    new THREE.MeshStandardMaterial({ color: 0x1f2937 })
  );
  posBaseRim.position.set(0, 0.005, 0); pos.add(posBaseRim);
  // Trụ
  const posStem = new THREE.Mesh(
    new THREE.BoxGeometry(0.08, 0.32, 0.08),
    new THREE.MeshStandardMaterial({ color: 0x0f172a, metalness: 0.35, roughness: 0.45 })
  );
  posStem.position.set(0, 0.22, 0); pos.add(posStem);
  // Khớp xoay (cylinder)
  const posJoint = new THREE.Mesh(
    new THREE.CylinderGeometry(0.055, 0.055, 0.07, 24),
    new THREE.MeshStandardMaterial({ color: 0x1f2937, metalness: 0.6, roughness: 0.3 })
  );
  posJoint.position.set(0, 0.38, 0); pos.add(posJoint);

  // ──── Màn chính 15.6" cho DƯỢC SĨ (hướng -z, vào phía sau quầy) ────
  const monitorMain = new THREE.Group();
  monitorMain.position.set(0, 0.48, -0.08);
  monitorMain.rotation.set(0.05, Math.PI, 0);
  const mainBezel = new THREE.Mesh(
    new THREE.BoxGeometry(0.92, 0.62, 0.06),
    new THREE.MeshStandardMaterial({ color: 0x0a0f1c, metalness: 0.55, roughness: 0.4 })
  );
  monitorMain.add(mainBezel);
  // Thanh đáy bezel
  const mainBottomBar = new THREE.Mesh(
    new THREE.BoxGeometry(0.92, 0.06, 0.061),
    new THREE.MeshStandardMaterial({ color: 0x0f172a })
  );
  mainBottomBar.position.set(0, -0.27, 0.001);
  monitorMain.add(mainBottomBar);
  // Screen texture (canvas) — UI giống upstream
  const mainScreenTex = (() => {
    const c = document.createElement('canvas');
    c.width = 860; c.height = 500;
    const ctx = c.getContext('2d');
    // Background
    const grad = ctx.createLinearGradient(0, 0, 0, 500);
    grad.addColorStop(0, '#0b1220'); grad.addColorStop(1, '#0f1f3a');
    ctx.fillStyle = grad; ctx.fillRect(0, 0, 860, 500);
    // Top status bar
    ctx.fillStyle = '#0d9488';
    ctx.fillRect(0, 0, 860, 50);
    ctx.fillStyle = '#ffffff'; ctx.font = 'bold 26px Inter, sans-serif';
    ctx.textBaseline = 'middle'; ctx.textAlign = 'left';
    ctx.fillText('★ Pharma-POS v1.0', 16, 25);
    ctx.fillStyle = '#a7f3d0'; ctx.font = 'bold 22px Inter, sans-serif';
    ctx.textAlign = 'right';
    ctx.fillText('● online · DS001', 844, 25);
    // Body
    ctx.fillStyle = '#bae6fd'; ctx.font = 'bold 40px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('F2: DANH MỤC  ·  F9: THANH TOÁN', 430, 180);
    ctx.fillStyle = '#e2e8f0'; ctx.font = '28px Inter, sans-serif';
    ctx.fillText('Danh mục: 180 SKU', 430, 240);
    // Green CTA
    ctx.fillStyle = '#22c55e'; ctx.font = 'bold 50px Inter, sans-serif';
    ctx.fillText('🛒 NHẤN ĐỂ MỞ POS', 430, 340);
    // Footer ticks
    ctx.fillStyle = '#0ea5e9'; ctx.fillRect(0, 480, 860, 6);
    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  })();
  const mainScreen = new THREE.Mesh(
    new THREE.PlaneGeometry(0.86, 0.5),
    new THREE.MeshStandardMaterial({
      map: mainScreenTex, emissive: 0x082f49, emissiveIntensity: 0.45,
      polygonOffset: true, polygonOffsetFactor: -2, polygonOffsetUnits: -2
    })
  );
  mainScreen.position.set(0, 0.025, 0.035);
  mainScreen.userData = { posClick: true };
  monitorMain.add(mainScreen);
  pos.add(monitorMain);

  // ──── Màn phụ CFD 10" cho KHÁCH (hướng +z) ────
  const monitorCFD = new THREE.Group();
  monitorCFD.position.set(0, 0.48, 0.08);
  monitorCFD.rotation.set(0.05, 0, 0);
  const cfdBezel = new THREE.Mesh(
    new THREE.BoxGeometry(0.56, 0.4, 0.05),
    new THREE.MeshStandardMaterial({ color: 0x0a0f1c, metalness: 0.55, roughness: 0.4 })
  );
  monitorCFD.add(cfdBezel);
  const cfdScreenTex = (() => {
    const c = document.createElement('canvas');
    c.width = 520; c.height = 320;
    const ctx = c.getContext('2d');
    const grad = ctx.createLinearGradient(0, 0, 0, 320);
    grad.addColorStop(0, '#0c4a6e'); grad.addColorStop(1, '#0e7490');
    ctx.fillStyle = grad; ctx.fillRect(0, 0, 520, 320);
    ctx.fillStyle = '#ecfeff'; ctx.font = 'bold 22px Inter, sans-serif';
    ctx.textBaseline = 'middle'; ctx.textAlign = 'center';
    ctx.fillText('NHÀ THUỐC GPP · KHÁCH HÀNG', 260, 50);
    ctx.fillStyle = '#bae6fd'; ctx.font = 'bold 26px Inter, sans-serif';
    ctx.fillText('TỔNG TIỀN PHẢI THANH TOÁN', 260, 110);
    ctx.fillStyle = '#fef3c7'; ctx.font = 'bold 75px Inter, sans-serif';
    ctx.fillText('— ₫', 260, 200);
    ctx.fillStyle = '#cbd5e1'; ctx.font = '18px Inter, sans-serif';
    ctx.fillText('(đã gồm 8% VAT) — Cảm ơn quý khách!', 260, 280);
    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  })();
  const cfdScreen = new THREE.Mesh(
    new THREE.PlaneGeometry(0.52, 0.32),
    new THREE.MeshStandardMaterial({
      map: cfdScreenTex, emissive: 0x0ea5e9, emissiveIntensity: 0.4,
      polygonOffset: true, polygonOffsetFactor: -2, polygonOffsetUnits: -2
    })
  );
  cfdScreen.position.set(0, 0.02, 0.03);
  monitorCFD.add(cfdScreen);
  pos.add(monitorCFD);

  // ──── Bàn phím nghiêng ────
  const kbBase = new THREE.Mesh(
    new THREE.BoxGeometry(0.55, 0.025, 0.2),
    new THREE.MeshStandardMaterial({ color: 0x1f2937, roughness: 0.55 })
  );
  kbBase.rotation.x = 0.08;
  kbBase.position.set(0, 0.015, -0.32);
  pos.add(kbBase);
  const kbKeys = new THREE.Mesh(
    new THREE.BoxGeometry(0.51, 0.005, 0.17),
    new THREE.MeshStandardMaterial({ color: 0x475569 })
  );
  kbKeys.rotation.x = 0.08;
  kbKeys.position.set(0, 0.029, -0.32);
  pos.add(kbKeys);
  // Chuột (bên trái bàn phím khi nhìn từ phía dược sĩ)
  const mouse = new THREE.Mesh(
    new THREE.BoxGeometry(0.08, 0.028, 0.13),
    new THREE.MeshStandardMaterial({ color: 0x1f2937, roughness: 0.55 })
  );
  mouse.position.set(-0.35, 0.018, -0.32); pos.add(mouse);

  // Click vào BẤT KỲ phần nào của máy (đế/trụ/bezel/màn trước-sau/bàn phím) đều
  // mở phần mềm bán hàng — không chỉ riêng màn hình mặt sau như trước.
  pos.traverse(o => { if (o.isMesh) o.userData.posClick = true; });

  pos.position.set(POS_X, COUNTER_H + 0.05, COUNTER_Z - 0.05);
  scene.add(pos);

  // (Khay bán hàng duy nhất là `pickTray` ở giữa quầy — xem khối bên dưới.
  //  Click vào pickTray sẽ mở modal danh sách thuốc đã đưa vào khay.)

  // ── P2: Máy quét barcode (handheld) — đặt phẳng trên quầy cạnh POS ─────
  // Body teal-xám có handle, lens trong suốt, LED đỏ. Click → fire scan event.
  const scannerGroup = new THREE.Group();
  scannerGroup.position.set(POS_X - 0.42, COUNTER_H + 0.08, COUNTER_Z + 0.15);
  scannerGroup.rotation.y = -0.4;
  scene.add(scannerGroup);
  const scBody = new THREE.Mesh(
    new THREE.BoxGeometry(0.08, 0.06, 0.14),
    new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.5, metalness: 0.3 })
  );
  scBody.castShadow = true; scannerGroup.add(scBody);
  // Tay nắm cong xuống
  const scHandle = new THREE.Mesh(
    new THREE.BoxGeometry(0.05, 0.10, 0.05),
    new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.6 })
  );
  scHandle.position.set(0, -0.06, -0.03);
  scHandle.rotation.x = 0.25;
  scannerGroup.add(scHandle);
  // Lens trong suốt phía trước (mặt +z)
  const scLens = new THREE.Mesh(
    new THREE.BoxGeometry(0.06, 0.04, 0.005),
    new THREE.MeshPhysicalMaterial({
      color: 0x7c2d12, transparent: true, opacity: 0.7,
      roughness: 0.15, metalness: 0.1
    })
  );
  scLens.position.set(0, 0, 0.072); scannerGroup.add(scLens);
  // LED đỏ scanning (emissive — sẽ pulse khi quét)
  const scLED = new THREE.Mesh(
    new THREE.CircleGeometry(0.007, 16),
    new THREE.MeshStandardMaterial({
      color: 0xef4444, emissive: 0xef4444, emissiveIntensity: 0.5
    })
  );
  scLED.position.set(0, 0.025, 0.073);
  scannerGroup.add(scLED);
  scannerGroup.userData = { scanner: true, led: scLED };

  // Tia laser đỏ (Plane) — bắn ra mặt +z khi quét, mặc định ẩn.
  const scanBeam = new THREE.Mesh(
    new THREE.PlaneGeometry(0.04, 0.6),
    new THREE.MeshBasicMaterial({
      color: 0xef4444, transparent: true, opacity: 0.0, side: THREE.DoubleSide
    })
  );
  scanBeam.rotation.x = -Math.PI / 2;
  scanBeam.position.set(0, 0, 0.30);
  scannerGroup.add(scanBeam);

  // ── P2: Máy in hóa đơn — POS receipt printer ────────────────────────────
  const printerGroup = new THREE.Group();
  printerGroup.position.set(POS_X + 0.42, COUNTER_H + 0.05, COUNTER_Z - 0.20);
  printerGroup.rotation.y = 0.3;
  scene.add(printerGroup);
  const prBody = new THREE.Mesh(
    new THREE.BoxGeometry(0.14, 0.10, 0.18),
    new THREE.MeshStandardMaterial({ color: 0xe2e8f0, roughness: 0.45 })
  );
  prBody.position.y = 0.05; prBody.castShadow = true;
  printerGroup.add(prBody);
  const prSlot = new THREE.Mesh(
    new THREE.BoxGeometry(0.10, 0.012, 0.02),
    new THREE.MeshStandardMaterial({ color: 0x0f172a })
  );
  prSlot.position.set(0, 0.106, 0.092);
  printerGroup.add(prSlot);
  // Cuộn giấy nhỏ nhô ra slot (sẽ animate kéo dài khi in)
  const prPaper = new THREE.Mesh(
    new THREE.PlaneGeometry(0.085, 0.10),
    new THREE.MeshStandardMaterial({
      color: 0xfffef0, side: THREE.DoubleSide, roughness: 0.85
    })
  );
  prPaper.position.set(0, 0.155, 0.092);
  prPaper.rotation.x = 0.2;
  prPaper.visible = false; // ẩn ban đầu, hiện khi in
  printerGroup.add(prPaper);
  // Indicator xanh
  const prLED = new THREE.Mesh(
    new THREE.CircleGeometry(0.006, 16),
    new THREE.MeshStandardMaterial({
      color: 0x22c55e, emissive: 0x22c55e, emissiveIntensity: 0.7
    })
  );
  prLED.position.set(-0.06, 0.087, 0.091);
  printerGroup.add(prLED);
  printerGroup.userData = { printer: true, paper: prPaper };

  // ── P2: Dược thư + MIMS Pharmacy — 2 cuốn sách tra cứu ─────────────
  // Vẽ bìa MÔ PHỎNG NHƯ THẬT (theo ảnh thầy gửi): Dược thư bìa xanh lá, MIMS bìa
  // trắng chữ MIMS đỏ + dải đỏ dưới. Trả về CanvasTexture cho mặt bìa trên.
  function makeBookCoverTex(kind) {
    const c = document.createElement('canvas'); c.width = 360; c.height = 480;
    const ctx = c.getContext('2d');
    ctx.textAlign = 'center';
    if (kind === 'duocthu') {
      // Bìa xanh lá đậm như bản thật (NXB Khoa học và Kỹ thuật, lần XB thứ ba, Tập I A–H).
      ctx.fillStyle = '#0e4a2c'; ctx.fillRect(0, 0, 360, 480);
      ctx.strokeStyle = '#cfe9d8'; ctx.lineWidth = 2; ctx.strokeRect(12, 12, 336, 456);
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 24px Georgia, serif'; ctx.fillText('BỘ Y TẾ', 180, 60);
      ctx.font = 'bold 33px Georgia, serif';
      ['DƯỢC THƯ', 'QUỐC GIA VIỆT NAM'].forEach((t, i) => ctx.fillText(t, 180, 150 + i * 42));
      ctx.font = 'italic 16px Georgia, serif';
      ctx.fillText('(Vietnamese National', 180, 232); ctx.fillText('Drug Formulary)', 180, 254);
      ctx.font = '17px Georgia, serif'; ctx.fillText('Lần xuất bản thứ ba', 180, 300);
      ctx.font = 'bold 19px Georgia, serif'; ctx.fillText('Tập I', 180, 336);
      // Biểu tượng rắn–gậy (caduceus) đơn giản
      ctx.strokeStyle = '#ffffff'; ctx.lineWidth = 2.5;
      ctx.beginPath(); ctx.moveTo(180, 352); ctx.lineTo(180, 392); ctx.stroke();
      ctx.beginPath(); ctx.arc(180, 360, 8, 0.2, Math.PI); ctx.arc(180, 376, 8, Math.PI + 0.2, Math.PI * 2); ctx.stroke();
      ctx.font = 'bold 20px Georgia, serif'; ctx.fillText('(A – H)', 180, 420);
      ctx.font = '12px Georgia, serif'; ctx.fillText('NHÀ XUẤT BẢN KHOA HỌC VÀ KỸ THUẬT', 180, 458);
    } else { // mims — bìa trắng, MIMS đỏ + logo chấm tròn, PHARMACY hồng, dải đỏ dưới
      ctx.fillStyle = '#ffffff'; ctx.fillRect(0, 0, 360, 480);
      ctx.fillStyle = '#e11d48'; ctx.font = '900 80px Arial, sans-serif';
      ctx.textAlign = 'left'; ctx.fillText('MIMS', 60, 120);
      // logo: cụm chấm tròn đỏ bên phải chữ MIMS
      ctx.fillStyle = '#e11d48';
      for (let a = 0; a < 8; a++) { const ang = a / 8 * Math.PI * 2; ctx.beginPath(); ctx.arc(282 + Math.cos(ang) * 18, 96 + Math.sin(ang) * 18, 6, 0, Math.PI * 2); ctx.fill(); }
      ctx.beginPath(); ctx.arc(282, 96, 7, 0, Math.PI * 2); ctx.fill();
      ctx.textAlign = 'center';
      ctx.fillStyle = '#ec4899'; ctx.font = '900 46px Arial, sans-serif'; ctx.fillText('PHARMACY', 180, 175);
      ctx.fillStyle = '#334155'; ctx.font = 'bold 18px Arial, sans-serif'; ctx.fillText('PATIENT COUNSELLING GUIDE', 180, 215);
      ctx.fillStyle = '#0f172a'; ctx.font = 'bold 22px Arial, sans-serif'; ctx.fillText('VIETNAM • 2025/2026', 180, 270);
      ctx.fillStyle = '#e11d48'; ctx.fillRect(0, 300, 360, 34);
      ctx.fillStyle = '#ffffff'; ctx.font = 'bold 15px Arial, sans-serif'; ctx.fillText('WWW.MIMS.COM', 270, 322);
      // khối hồng nhạt phía dưới (vùng ảnh sản phẩm như bìa thật)
      ctx.fillStyle = '#fce7f0'; ctx.fillRect(20, 348, 320, 116);
      ctx.fillStyle = '#9d174d'; ctx.font = 'italic 13px Arial, sans-serif'; ctx.fillText('Ấn phẩm tra cứu nhà thuốc thực hành', 180, 412);
    }
    const tex = new THREE.CanvasTexture(c); tex.colorSpace = THREE.SRGBColorSpace; tex.anisotropy = 4;
    return tex;
  }
  function buildBook(opts) {
    const g = new THREE.Group();
    const coverMat = new THREE.MeshStandardMaterial({ color: opts.color, roughness: 0.55 });
    const pagesMat = new THREE.MeshStandardMaterial({ color: 0xfef9c3, roughness: 0.7 });
    const W = opts.w, D = opts.d, H = opts.thickness;
    // Pages (lõi giấy)
    const pages = new THREE.Mesh(new THREE.BoxGeometry(W - 0.005, H - 0.004, D - 0.005), pagesMat);
    g.add(pages);
    // Cover (bọc ngoài, dày hơn 0.5mm)
    const cover = new THREE.Mesh(new THREE.BoxGeometry(W, H, D), coverMat);
    g.add(cover);
    // Bìa thật (opts.coverTex). Tủ hồ sơ là tủ KÍNH 2 MẶT → dán bìa lên CẢ HAI mặt lớn
    // (±y) để đọc XUÔI từ phía KHÁCH lẫn phía DƯỢC SĨ (không bị soi gương/ngược).
    const titleTex = opts.coverTex || makeTextTexture(opts.title, {
      w: 768, h: 256, bg: opts.color, color: '#fef9c3', fontSize: 64
    });
    const titleGeo = new THREE.PlaneGeometry(opts.coverTex ? W * 0.96 : W * 0.78, opts.coverTex ? D * 0.96 : D * 0.42);
    // Mặt +y (sau khi dựng đứng → hướng DƯỢC SĨ, phía sau quầy): texture xoay 180°.
    const titleTexPh = titleTex.clone();
    titleTexPh.wrapS = THREE.RepeatWrapping; titleTexPh.wrapT = THREE.RepeatWrapping;
    titleTexPh.repeat.set(-1, -1); titleTexPh.needsUpdate = true;
    const titlePlane = new THREE.Mesh(titleGeo, new THREE.MeshStandardMaterial({
      map: titleTexPh, roughness: 0.55, polygonOffset: true, polygonOffsetFactor: -6, polygonOffsetUnits: -6
    }));
    titlePlane.rotation.x = -Math.PI / 2;
    titlePlane.position.set(0, H / 2 + 0.001, 0);
    g.add(titlePlane);
    // Mặt -y (hướng KHÁCH, phía trước quầy): texture thường.
    const titlePlaneBack = new THREE.Mesh(titleGeo, new THREE.MeshStandardMaterial({
      map: titleTex, roughness: 0.55, polygonOffset: true, polygonOffsetFactor: -6, polygonOffsetUnits: -6
    }));
    titlePlaneBack.rotation.x = Math.PI / 2;
    titlePlaneBack.position.set(0, -H / 2 - 0.001, 0);
    g.add(titlePlaneBack);
    // Spine label (mặt bên +x): chữ viết dọc
    const spineTex = makeTextTexture(opts.spine || opts.title, {
      w: 768, h: 96, bg: opts.color, color: '#fef9c3', fontSize: 44
    });
    const spinePlane = new THREE.Mesh(
      new THREE.PlaneGeometry(D * 0.85, H * 0.7),
      new THREE.MeshStandardMaterial({
        map: spineTex, roughness: 0.55,
        polygonOffset: true, polygonOffsetFactor: -6, polygonOffsetUnits: -6
      })
    );
    spinePlane.rotation.y = Math.PI / 2;
    spinePlane.position.set(W / 2 + 0.001, 0, 0);
    g.add(spinePlane);
    g.userData = { bookId: opts.id, bookTitle: opts.title };
    return g;
  }
  // Đặt 2 cuốn ĐỨNG trong tủ "Hồ sơ tài liệu" (ngăn 3, cửa kính) — bìa hướng ra khách.
  const bay3X = -COUNTER_W / 2 + BAY_W / 2 + 3 * BAY_W; // tâm ngăn hồ sơ
  const bookZ = COUNTER_Z + COUNTER_D / 2 - 0.15;       // sát mặt kính trước
  const shelfTopY = COUNTER_BODY_H / 2 + 0.02;          // mặt khay giữa của ngăn

  const duocThu = buildBook({
    id: 'duocthu2018',
    title: 'DƯỢC THƯ 2018',
    spine: 'DƯỢC THƯ QUỐC GIA',
    color: 0x14532d,                        // xanh lá đậm như bản thật
    coverTex: makeBookCoverTex('duocthu'),
    w: 0.17, d: 0.235, thickness: 0.055
  });
  duocThu.position.set(bay3X - 0.13, shelfTopY + 0.235 / 2, bookZ);
  duocThu.rotation.x = -Math.PI / 2;        // dựng đứng, bìa quay ra trước
  scene.add(duocThu);

  const mims = buildBook({
    id: 'mims2024',
    title: 'MIMS PHARMACY',
    spine: 'MIMS PHARMACY',
    color: 0x991b1b,                        // gáy đỏ (bìa trắng ở mặt trên)
    coverTex: makeBookCoverTex('mims'),
    w: 0.155, d: 0.215, thickness: 0.05
  });
  mims.position.set(bay3X + 0.13, shelfTopY + 0.215 / 2, bookZ);
  mims.rotation.x = -Math.PI / 2;
  scene.add(mims);

  // ── Khay BÁN HÀNG (pick tray) — port 1-1 từ upstream: mặt khay + 4 viền gờ + nhãn ──
  // Đặt trong khoảng x∈[-0.20, 0.30] — giữa rìa phải khu trưng bày (≈-0.31)
  // và khay dụng cụ (CX=0.66). Có khe hở ~10cm sang khay dụng cụ để 2 khay tách
  // bạch rõ ràng, không nhập nhằng với dãy thuốc trưng bày bên trái.
  const PICK_TRAY_W = 0.50, PICK_TRAY_D = 0.34, PICK_TRAY_T = 0.022, PICK_TRAY_RIM = 0.01;
  const PICK_TRAY_CX = 0.05;
  const PICK_TRAY_CZ = COUNTER_Z + 0.20;
  // Mặt quầy ở y = COUNTER_H + 0.04 (counterTop dày 0.08, tâm tại COUNTER_H).
  // Đặt khay NẰM TRÊN mặt quầy, không bị chôn vào mesh counter top.
  const PICK_TRAY_CY = COUNTER_H + 0.04 + PICK_TRAY_T / 2;
  const pickTray = new THREE.Group();
  pickTray.position.set(PICK_TRAY_CX, PICK_TRAY_CY, PICK_TRAY_CZ);
  scene.add(pickTray);
  const pickBase = new THREE.Mesh(
    new THREE.BoxGeometry(PICK_TRAY_W, PICK_TRAY_T, PICK_TRAY_D),
    new THREE.MeshStandardMaterial({ color: 0xe2e8f0, roughness: 0.55, metalness: 0.05 })
  );
  pickBase.userData = { salesTrayClick: true };
  pickTray.add(pickBase);
  // Yêu cầu thầy #8: KHAY BÁN HÀNG đổi dạng GIỎ HỞ (4 thành cao màu xanh nhựa
  // giống "giỏ ra lẻ" cũ — nay đã bỏ giỏ ra lẻ riêng). Thành cao 8.5cm để đựng
  // hộp/đơn vị thuốc, mặt trước thấp hơn cho dễ nhìn vào trong.
  const WALL_H = 0.085, WALL_T = 0.012;
  const rimMat = new THREE.MeshStandardMaterial({ color: 0x38bdf8, roughness: 0.5, side: THREE.DoubleSide });
  [
    // [x, y, z, w, h, d] — thành sau cao, thành trước thấp (0.05) cho dễ thấy bên trong
    [0,                        PICK_TRAY_T / 2 + WALL_H / 2,  -PICK_TRAY_D / 2 + WALL_T / 2, PICK_TRAY_W, WALL_H, WALL_T],
    [0,                        PICK_TRAY_T / 2 + 0.05 / 2,     PICK_TRAY_D / 2 - WALL_T / 2, PICK_TRAY_W, 0.05,   WALL_T],
    [-PICK_TRAY_W / 2 + WALL_T / 2, PICK_TRAY_T / 2 + WALL_H / 2, 0,                         WALL_T,      WALL_H, PICK_TRAY_D],
    [ PICK_TRAY_W / 2 - WALL_T / 2, PICK_TRAY_T / 2 + WALL_H / 2, 0,                         WALL_T,      WALL_H, PICK_TRAY_D]
  ].forEach(p => {
    const m = new THREE.Mesh(new THREE.BoxGeometry(p[3], p[4], p[5]), rimMat);
    m.position.set(p[0], p[1], p[2]);
    m.userData = { salesTrayClick: true };
    pickTray.add(m);
  });
  // Nhãn "KHAY BÁN HÀNG" — nền vàng kem + viền cam để nổi bật giống tool tray
  const pickTrayLabelTex = (() => {
    const c = document.createElement('canvas');
    c.width = 1024; c.height = 96;
    const ctx = c.getContext('2d');
    ctx.fillStyle = '#fef3c7'; ctx.fillRect(0, 0, 1024, 96);
    ctx.strokeStyle = '#0284c7'; ctx.lineWidth = 4;
    ctx.strokeRect(2, 2, 1020, 92);
    ctx.fillStyle = '#0c4a6e'; ctx.font = 'bold 36px Inter, sans-serif';
    ctx.textBaseline = 'middle'; ctx.textAlign = 'center';
    ctx.fillText('🛒 KHAY BÁN HÀNG · click để xem danh sách', 512, 48);
    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  })();
  const pickTrayLabel = new THREE.Mesh(
    new THREE.PlaneGeometry(PICK_TRAY_W * 0.7, 0.05),
    new THREE.MeshStandardMaterial({
      map: pickTrayLabelTex, transparent: true,
      polygonOffset: true, polygonOffsetFactor: -2, polygonOffsetUnits: -2
    })
  );
  pickTrayLabel.rotation.x = -Math.PI / 2;
  pickTrayLabel.position.set(0, PICK_TRAY_T / 2 + 0.001, -PICK_TRAY_D / 2 + 0.05);
  pickTray.add(pickTrayLabel);

  // Slot tâm X,Z cố định — Y sẽ được tính theo box.h (xem pickSub) để hộp NGỒI
  // chính giữa khay (đáy hộp = mặt khay), không lơ lửng / không xuyên qua tray.
  // Khay hẹp lại còn 0.50m nên slot pitch X giảm xuống 0.11 cho 4 cột vẫn vừa.
  const TRAY_SLOTS_XZ = [];
  for (let r = 0; r < 2; r++) for (let c = 0; c < 4; c++) {
    TRAY_SLOTS_XZ.push({
      x: PICK_TRAY_CX + (c - 1.5) * 0.11,
      z: PICK_TRAY_CZ + (r - 0.5) * 0.14
    });
  }
  const TRAY_TOP_Y = COUNTER_H + 0.04 + PICK_TRAY_T;
  function pickSlotPos(idx, boxH = 0.14) {
    const xz = TRAY_SLOTS_XZ[Math.min(idx, TRAY_SLOTS_XZ.length - 1)];
    // Đáy hộp ngồi sát mặt khay (+1mm tránh z-fight)
    return new THREE.Vector3(xz.x, TRAY_TOP_Y + boxH / 2 + 0.001, xz.z);
  }

  // ── KHAY DỤNG CỤ + RA LẺ + NHÃN HDSD (tool tray) — port 1-1 upstream ──
  // Group co lại 0.55× (mặt khay ≈0.52m sau scale) để 2 khay (bán hàng + dụng cụ)
  // cùng nằm gọn trong khoảng x∈[-0.20, 0.95] giữa rìa khu trưng bày (≈-0.31)
  // và máy POS (scanner ≈1.03, computer 1.45). Khe hở ≥10cm với pick tray và ≥6cm
  // với scanner để dược sĩ nhìn ra ngay 2 vùng chức năng tách biệt.
  const TOOLTRAY_X = 0.66;
  const TT_SCALE = 0.55;
  const TW = 0.95, TD = 0.42;
  const toolTrayGroup = new THREE.Group();
  toolTrayGroup.position.set(TOOLTRAY_X, COUNTER_H + 0.04 + 0.01 * TT_SCALE, COUNTER_Z - 0.05);
  toolTrayGroup.scale.setScalar(TT_SCALE);
  scene.add(toolTrayGroup);
  // Yêu cầu thầy #9: BỎ cụm dụng cụ (kéo/băng dính/bút/khay) trên quầy — gây rối
  // mắt. Soạn nhãn HDSD nay chỉ qua NÚT "Soạn nhãn mới" trên màn hình. Ẩn nguyên
  // group (raycaster bỏ qua object .visible=false → không còn click vào khay).
  toolTrayGroup.visible = false;

  // Khay nền (click để soạn nhãn HDSD)
  const toolTrayBase = new THREE.Mesh(
    new THREE.BoxGeometry(TW, 0.02, TD),
    new THREE.MeshStandardMaterial({ color: 0xe7e5e4, roughness: 0.6 })
  );
  toolTrayBase.userData = { labelClick: true };
  toolTrayGroup.add(toolTrayBase);
  // Nhãn "KHAY DỤNG CỤ + RA LẺ + NHÃN HDSD"
  const toolTrayLabelTex = (() => {
    const c = document.createElement('canvas');
    c.width = 1024; c.height = 96;
    const ctx = c.getContext('2d');
    ctx.fillStyle = '#fde68a'; ctx.fillRect(0, 0, 1024, 96);
    ctx.strokeStyle = '#d97706'; ctx.lineWidth = 4;
    ctx.strokeRect(2, 2, 1020, 92);
    ctx.fillStyle = '#1f2937'; ctx.font = 'bold 38px Inter, sans-serif';
    ctx.textBaseline = 'middle'; ctx.textAlign = 'center';
    ctx.fillText('KHAY DỤNG CỤ + RA LẺ + NHÃN HDSD · click để soạn nhãn', 512, 48);
    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  })();
  const toolTrayLabel = new THREE.Mesh(
    new THREE.PlaneGeometry(TW * 0.92, 0.06),
    new THREE.MeshStandardMaterial({
      map: toolTrayLabelTex, transparent: true,
      polygonOffset: true, polygonOffsetFactor: -2, polygonOffsetUnits: -2
    })
  );
  toolTrayLabel.rotation.x = -Math.PI / 2;
  toolTrayLabel.position.set(0, 0.012, -TD / 2 + 0.05);
  toolTrayGroup.add(toolTrayLabel);

  // Hộp RA LẺ (pill counter) — vàng kem, viền cam, gạt chia + 4 viên thuốc giả
  const pillCounter = new THREE.Group();
  pillCounter.position.set(-0.36, 0.012, 0.05);
  toolTrayGroup.add(pillCounter);
  const pillPad = new THREE.Mesh(
    new THREE.BoxGeometry(0.2, 0.025, 0.16),
    new THREE.MeshStandardMaterial({ color: 0xfef3c7, roughness: 0.5 })
  );
  pillCounter.add(pillPad);
  // Viền 4 cạnh
  [
    [0, 0.02, -0.08, 0.2, 0.04, 0.01],
    [0, 0.02,  0.08, 0.2, 0.04, 0.01],
    [-0.1, 0.02, 0, 0.01, 0.04, 0.16],
    [ 0.1, 0.02, 0, 0.01, 0.04, 0.16]
  ].forEach(p => {
    const m = new THREE.Mesh(new THREE.BoxGeometry(p[3], p[4], p[5]),
      new THREE.MeshStandardMaterial({ color: 0xf59e0b }));
    m.position.set(p[0], p[1], p[2]);
    pillCounter.add(m);
  });
  // Gạt chia
  const divider = new THREE.Mesh(
    new THREE.BoxGeometry(0.005, 0.04, 0.14),
    new THREE.MeshStandardMaterial({ color: 0x0f172a })
  );
  divider.position.set(0, 0.025, 0);
  pillCounter.add(divider);
  // 4 viên thuốc giả
  [[-0.05,-0.04],[-0.03,0.02],[0.04,-0.03],[0.06,0.05]].forEach(([dx, dz], i) => {
    const pill = new THREE.Mesh(
      new THREE.CylinderGeometry(0.012, 0.012, 0.006, 14),
      new THREE.MeshStandardMaterial({ color: i % 2 === 0 ? 0xffffff : 0xfbbf24, roughness: 0.5 })
    );
    pill.position.set(dx, 0.022, dz);
    pillCounter.add(pill);
  });

  // (Bao bì ra lẻ trắng/vàng/hồng + túi zip ĐÃ DỜI sang KHAY "BAO BÌ RA LẺ"
  //  riêng trên quầy — click để ghi nhãn + đóng gói. Không để trùng ở khay dụng cụ.)

  // Xấp giấy dính HDSD (4 lớp) — màu trắng + 1 lớp vàng kem trên cùng
  const stickerPile = new THREE.Group();
  stickerPile.position.set(0.38, 0.012, -0.08);
  stickerPile.rotation.y = 0.1;
  for (let i = 0; i < 4; i++) {
    const sheet = new THREE.Mesh(
      new THREE.BoxGeometry(0.09, 0.003, 0.06),
      new THREE.MeshStandardMaterial({ color: i === 3 ? 0xfef9c3 : 0xffffff, roughness: 0.65 })
    );
    sheet.position.y = 0.003 + i * 0.0035;
    stickerPile.add(sheet);
  }
  toolTrayGroup.add(stickerPile);

  // Tool GLB targets: scissors/tape/pen/notepad — vị trí trong khay 0.95×0.42
  const TOOL_TARGETS = [
    { url: 'scissors.glb', position: [0.05, 0.012, 0.12], rotY:  Math.PI / 4,   size: 0.16 },
    { url: 'tape.glb',     position: [0.22, 0.012, 0.12], rotY: -Math.PI / 6,   size: 0.11 },
    { url: 'pen.glb',      position: [-0.1, 0.012, 0.13], rotY:  Math.PI / 2.5, size: 0.14 },
    { url: 'notepad.glb',  position: [0.38, 0.012, 0.05], rotY:  Math.PI / 12,  size: 0.16 }
  ];

  // ── FRIDGE — custom mesh, 5 shelves, 2 doors, 13 stocks (port 1-1) ───────
  const fridgeGroup = new THREE.Group();
  // Sát tường trái — back panel cách wall 9cm (innerMat đổi màu sáng nên còn z-fight cũng không lộ).
  fridgeGroup.position.set(-ROOM_W / 2 + 0.42, 0, COUNTER_Z + 0.1);
  fridgeGroup.rotation.y = Math.PI / 2;
  scene.add(fridgeGroup);

  const fridgeMat = new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.4, metalness: 0.05 });
  // Mặt trong tủ lạnh — trắng sáng như tủ thật, tránh "đen đen + shadow acne" lộ ra sau cánh
  const innerMat = new THREE.MeshStandardMaterial({ color: 0xf1f5f9, roughness: 0.7 });
  const shelfMat = new THREE.MeshStandardMaterial({ color: 0xe2e8f0, roughness: 0.55, transparent: true, opacity: 0.92 });

  // Side panels + back + ceiling + bottom + middle divider
  const sideL = new THREE.Mesh(new THREE.BoxGeometry(0.04, 1.7, 0.7), fridgeMat);
  sideL.position.set(-0.37, 0.85, 0); fridgeGroup.add(sideL);
  const sideR = new THREE.Mesh(new THREE.BoxGeometry(0.04, 1.7, 0.7), fridgeMat);
  sideR.position.set(0.37, 0.85, 0); fridgeGroup.add(sideR);
  const fridgeBack = new THREE.Mesh(new THREE.BoxGeometry(0.78, 1.7, 0.04), innerMat);
  fridgeBack.position.set(0, 0.85, -0.33); fridgeGroup.add(fridgeBack);
  const fridgeTop = new THREE.Mesh(new THREE.BoxGeometry(0.78, 0.04, 0.7), fridgeMat);
  fridgeTop.position.set(0, 1.68, 0); fridgeGroup.add(fridgeTop);
  const fridgeBottom = new THREE.Mesh(new THREE.BoxGeometry(0.74, 0.02, 0.66), new THREE.MeshStandardMaterial({ color: 0xcbd5e1, roughness: 0.6 }));
  fridgeBottom.position.set(0, 0.06, 0); fridgeGroup.add(fridgeBottom);
  const fridgeMid = new THREE.Mesh(new THREE.BoxGeometry(0.74, 0.02, 0.66), new THREE.MeshStandardMaterial({ color: 0xcbd5e1, roughness: 0.6 }));
  fridgeMid.position.set(0, 1.05, 0); fridgeGroup.add(fridgeMid);
  // 3 interior shelves
  ['topShelf','bottomMid2','bottomMid1'].forEach(k => {
    const sh = new THREE.Mesh(new THREE.BoxGeometry(0.74, 0.015, 0.62), shelfMat);
    sh.position.set(0, FRIDGE_SHELF_Y[k], 0); fridgeGroup.add(sh);
  });
  // LED inside
  const fridgeLED = new THREE.Mesh(
    new THREE.BoxGeometry(0.5, 0.02, 0.05),
    new THREE.MeshStandardMaterial({ color: 0xfef9c3, emissive: 0xfde68a, emissiveIntensity: 0.2 })
  );
  fridgeLED.position.set(0, 1.66, 0); fridgeGroup.add(fridgeLED);
  // Outside indicator
  const fridgeInd = new THREE.Mesh(
    new THREE.CircleGeometry(0.014, 16),
    new THREE.MeshStandardMaterial({ color: 0x22c55e, emissive: 0x22c55e, emissiveIntensity: 0.7 })
  );
  fridgeInd.position.set(0.3, 1.66, 0.36); fridgeGroup.add(fridgeInd);
  // Base
  const fridgeBase = new THREE.Mesh(
    new THREE.BoxGeometry(0.8, 0.05, 0.72),
    new THREE.MeshStandardMaterial({ color: 0x475569 })
  );
  fridgeBase.position.set(0, 0.025, 0); fridgeGroup.add(fridgeBase);

  // 2 doors (hinge at right edge, rotate +π/2.2 when open)
  const doorMat = new THREE.MeshStandardMaterial({ color: 0xe2e8f0, roughness: 0.45, metalness: 0.1 });
  function buildFridgeDoor(centerY, width, height) {
    const hinge = new THREE.Group();
    // Door hinge ra trước sideL/sideR thêm 1.5cm để khe mặt sau cánh (z≈0.36)
    // không z-fight với mép trước vách (z=0.35).
    hinge.position.set(width / 2, centerY, 0.375);
    const panel = new THREE.Mesh(new THREE.BoxGeometry(width, height, 0.025), doorMat);
    panel.position.set(-width / 2, 0, 0);
    panel.castShadow = true;
    hinge.add(panel);
    // handle
    const handle = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.28, 0.025), new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.6 }));
    handle.position.set(-width + 0.05, 0, 0.022);
    hinge.add(handle);
    panel.userData = { fridgeDoor: hinge };
    handle.userData = { fridgeDoor: hinge };
    hinge.userData = { isOpen: false, targetY: 0 };
    return hinge;
  }
  const topDoor = buildFridgeDoor(1.37, 0.74, 0.62);
  fridgeGroup.add(topDoor);
  const botDoor = buildFridgeDoor(0.55, 0.74, 1.0);
  fridgeGroup.add(botDoor);
  // Fridge stock items — hộp 3D có:
  //  · Thân nền màu nhạt theo stock.color
  //  · Banner accent đậm ở đỉnh (chéo gradient)
  //  · Nhãn canvas dán mặt +z với tên thuốc + chữ "BẢO QUẢN 2-8°C"
  //  · Một vạch chấm bi nhỏ (lot mock-up) để trông như hộp thật.
  // Helper: tạo texture nhãn fridge stock (canvas 256×192).
  function makeFridgeStockTex(stock) {
    const c = document.createElement('canvas');
    c.width = 256; c.height = 192;
    const ctx = c.getContext('2d');
    // Body
    ctx.fillStyle = stock.color || '#dbeafe';
    ctx.fillRect(0, 0, 256, 192);
    // Banner accent đậm hơn 30% — derive từ stock.color
    const m = /^#?([0-9a-f]{6})$/i.exec(stock.color || '');
    let accent = '#0369a1';
    if (m) {
      const n = parseInt(m[1], 16);
      const r = Math.max(0, ((n>>16)&0xff) - 50);
      const g = Math.max(0, ((n>>8) &0xff) - 50);
      const b = Math.max(0, ( n     &0xff) - 50);
      accent = `rgb(${r},${g},${b})`;
    }
    ctx.fillStyle = accent;
    ctx.fillRect(0, 0, 256, 38);
    // Snowflake icon "❄" + nhãn cold-chain
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 22px Inter, sans-serif';
    ctx.textAlign = 'left'; ctx.textBaseline = 'middle';
    ctx.fillText('❄ BẢO QUẢN 2-8°C', 12, 20);
    // Tên thuốc
    ctx.fillStyle = '#0f172a';
    ctx.font = 'bold 28px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText((stock.label || '').slice(0, 16), 128, 92);
    // Vạch nhãn mã lô — line stippled
    ctx.strokeStyle = accent; ctx.lineWidth = 2;
    ctx.setLineDash([6, 4]);
    ctx.beginPath(); ctx.moveTo(28, 130); ctx.lineTo(228, 130); ctx.stroke();
    ctx.setLineDash([]);
    // Lot + EXP mock
    ctx.fillStyle = '#475569';
    ctx.font = '16px Inter, sans-serif';
    ctx.fillText('LOT  ' + stock.id.slice(-6).toUpperCase() + '   EXP 12/26', 128, 155);
    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = 4;
    return tex;
  }
  const fridgeItems = [];
  FRIDGE_STOCKS.forEach((stock) => {
    const group = new THREE.Group();
    // Thân hộp
    const body = new THREE.Mesh(
      new THREE.BoxGeometry(0.10, 0.11, 0.08),
      new THREE.MeshStandardMaterial({ color: stock.color, roughness: 0.55 })
    );
    body.castShadow = true;
    group.add(body);
    // Nhãn canvas dán mặt +z (mặt cửa khi mở tủ lạnh)
    const tex = makeFridgeStockTex(stock);
    const labelMat = new THREE.MeshStandardMaterial({
      map: tex, roughness: 0.55,
      polygonOffset: true, polygonOffsetFactor: -3, polygonOffsetUnits: -3
    });
    const label = new THREE.Mesh(new THREE.PlaneGeometry(0.092, 0.103), labelMat);
    label.position.set(0, 0, 0.041);
    group.add(label);
    // Dải accent mỏng ở cạnh dưới mặt trước (giả "tem niêm phong")
    const seal = new THREE.Mesh(
      new THREE.BoxGeometry(0.092, 0.012, 0.003),
      new THREE.MeshStandardMaterial({ color: '#dc2626', roughness: 0.5,
        polygonOffset: true, polygonOffsetFactor: -2, polygonOffsetUnits: -2 })
    );
    seal.position.set(0, -0.044, 0.042);
    group.add(seal);

    const y = FRIDGE_SHELF_Y[stock.shelf] + 0.055;
    group.position.set(stock.x, y, 0.05);
    group.userData = {
      drugId: stock.id, isFridgeStock: true,
      // Đủ field cho inspector (sku BẮT BUỘC — hashSku đọc .length) + nhãn mô phỏng.
      drug: {
        id: stock.id, sku: ('VAC-' + stock.id).replace(/[^a-z0-9-]/gi, '').slice(0, 14).toUpperCase(),
        brand: stock.label, name: stock.label, generic: stock.label, activeIngredient: stock.label,
        strength: '', form: 'Dung dịch tiêm', pack: 'Hộp 1 lọ', category: 'Thuốc bảo quản lạnh 2–8°C',
        retailUnit: 'lọ', unit: 'lọ', storage: 'Bảo quản 2–8°C, tránh ánh sáng',
        isRx: true, isAntibiotic: false, unitPrice: 50000, barcode: '893' + String(stock.id).replace(/\D/g, '').slice(0, 9)
      },
      style: getBoxStyle({ id: stock.id, sku: 'VAC-' + stock.id, form: 'lọ' }),
      boxIndex: 0,
      homePosition: group.position.clone()
    };
    fridgeGroup.add(group);
    fridgeItems.push(group);
    drugMeshes.push(group);
  });

  // ── CONSULT DESK (round table + 2 chairs) ─────────────────────────────────
  const consult = new THREE.Group();
  // Sát TƯỜNG TRÁI, GIỮA tủ lạnh (z≈1.45) và tủ kê đơn (z≈-2.1); lệch trái khỏi mép
  // tủ (x≈-3.55) nên KHÔNG che mặt tủ. Bàn nhỏ gọn (yêu cầu thầy).
  consult.position.set(-3.85, 0, -0.25);
  scene.add(consult);
  const table = new THREE.Mesh(new THREE.CylinderGeometry(0.36, 0.36, 0.04, 32), new THREE.MeshStandardMaterial({ color: 0xfef3c7, roughness: 0.45 }));
  table.position.y = 0.74; table.castShadow = table.receiveShadow = true; consult.add(table);
  const tableLeg = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.08, 0.72, 16), new THREE.MeshStandardMaterial({ color: 0x92400e }));
  tableLeg.position.y = 0.36; consult.add(tableLeg);
  const tableBase = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.22, 0.04, 24), new THREE.MeshStandardMaterial({ color: 0x92400e }));
  tableBase.position.y = 0.02; consult.add(tableBase);
  function buildChair() {
    const ch = new THREE.Group();
    const seat = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.05, 0.5), new THREE.MeshStandardMaterial({ color: 0x0ea5e9, roughness: 0.6 }));
    seat.position.y = 0.45; seat.castShadow = true; ch.add(seat);
    const back = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.55, 0.05), new THREE.MeshStandardMaterial({ color: 0x0ea5e9, roughness: 0.6 }));
    back.position.set(0, 0.78, -0.22); back.castShadow = true; ch.add(back);
    [[-0.2,-0.2],[0.2,-0.2],[-0.2,0.2],[0.2,0.2]].forEach(([x, z]) => {
      const leg = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.45, 0.04), new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.4 }));
      leg.position.set(x, 0.22, z); leg.castShadow = true; ch.add(leg);
    });
    return ch;
  }
  const chA = buildChair(); chA.position.set(0, 0, -0.52); consult.add(chA);
  const chB = buildChair(); chB.position.set(0, 0, 0.52); chB.rotation.y = Math.PI; consult.add(chB);

  // Trên mặt bàn tư vấn — TỜ GIẤY + BÚT để dược sĩ ghi chép. Click vào giấy
  // hoặc bút → mở notepad modal (handler ở simulation.js, dùng userData.noteOpen).
  const tableTopY = 0.74 + 0.02 + 0.001; // mặt trên của bàn tròn
  // Tờ giấy A5 — hơi nghiêng cho tự nhiên
  const paperGeo = new THREE.PlaneGeometry(0.21, 0.297);
  // Texture: nền trắng kem + 8 dòng kẻ ngang + tiêu đề "GHI CHÉP"
  const paperTex = (() => {
    const c = document.createElement('canvas');
    c.width = 420; c.height = 594;
    const ctx = c.getContext('2d');
    ctx.fillStyle = '#fffbeb'; ctx.fillRect(0, 0, 420, 594);
    // Tiêu đề
    ctx.fillStyle = '#0f766e'; ctx.font = 'bold 28px Inter, sans-serif';
    ctx.textAlign = 'left'; ctx.textBaseline = 'top';
    ctx.fillText('GHI CHÉP TƯ VẤN', 28, 28);
    // Đường gạch chân
    ctx.strokeStyle = '#0d9488'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(28, 70); ctx.lineTo(392, 70); ctx.stroke();
    // 16 dòng kẻ ngang
    ctx.strokeStyle = '#cbd5e1'; ctx.lineWidth = 1;
    for (let i = 0; i < 16; i++) {
      const y = 110 + i * 28;
      ctx.beginPath(); ctx.moveTo(28, y); ctx.lineTo(392, y); ctx.stroke();
    }
    // Footer hint
    ctx.fillStyle = '#94a3b8'; ctx.font = 'italic 14px Inter, sans-serif';
    ctx.fillText('Bấm vào tờ giấy để mở sổ ghi chép', 28, 565);
    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  })();
  const paper = new THREE.Mesh(
    paperGeo,
    new THREE.MeshStandardMaterial({ map: paperTex, roughness: 0.85,
      polygonOffset: true, polygonOffsetFactor: -2, polygonOffsetUnits: -2 })
  );
  paper.rotation.x = -Math.PI / 2;
  paper.rotation.z = 0.12;
  paper.position.set(-0.12, tableTopY, 0.04);
  paper.castShadow = paper.receiveShadow = true;
  paper.userData = { notepadClick: true, hint: 'Mở sổ ghi chép' };
  consult.add(paper);
  // Bút viết — cylinder dài, mảnh, đặt chéo trên giấy
  const penBody = new THREE.Mesh(
    new THREE.CylinderGeometry(0.005, 0.005, 0.14, 12),
    new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.45, metalness: 0.2 })
  );
  penBody.rotation.z = Math.PI / 2;
  penBody.rotation.y = 0.35;
  penBody.position.set(0.08, tableTopY + 0.005, 0.12);
  penBody.castShadow = true;
  penBody.userData = { notepadClick: true, hint: 'Mở sổ ghi chép' };
  consult.add(penBody);
  // Đầu bút (cone) bạc
  const penTip = new THREE.Mesh(
    new THREE.ConeGeometry(0.005, 0.018, 12),
    new THREE.MeshStandardMaterial({ color: 0xcbd5e1, metalness: 0.7, roughness: 0.3 })
  );
  penTip.position.copy(penBody.position);
  penTip.position.x -= 0.07 * Math.cos(0.35);
  penTip.position.z -= 0.07 * Math.sin(0.35);
  penTip.rotation.z = Math.PI / 2;
  penTip.rotation.y = 0.35;
  penTip.userData = { notepadClick: true, hint: 'Mở sổ ghi chép' };
  consult.add(penTip);

  // ── P6c: Nhân vật DS Đại học (capsule + áo blouse) — hiển thị khi senior-mode bật ─
  const seniorPharmacist = new THREE.Group();
  seniorPharmacist.position.set(0, 0, -1.2); // đứng phía sau chair A
  seniorPharmacist.visible = false; // ẩn ban đầu, JS toggle khi senior-mode ON
  consult.add(seniorPharmacist);
  // Quần xám/đen
  const spPants = new THREE.Mesh(
    new THREE.CylinderGeometry(0.14, 0.16, 0.7, 16),
    new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.7 })
  );
  spPants.position.y = 0.35; spPants.castShadow = true;
  seniorPharmacist.add(spPants);
  // Áo blouse trắng
  const spCoat = new THREE.Mesh(
    new THREE.CylinderGeometry(0.18, 0.20, 0.55, 16),
    new THREE.MeshStandardMaterial({ color: 0xfafafa, roughness: 0.5 })
  );
  spCoat.position.y = 0.95; spCoat.castShadow = true;
  seniorPharmacist.add(spCoat);
  // Đầu (sphere) + tóc
  const spHead = new THREE.Mesh(
    new THREE.SphereGeometry(0.13, 24, 24),
    new THREE.MeshStandardMaterial({ color: 0xfde68a, roughness: 0.55 })
  );
  spHead.position.y = 1.35; spHead.castShadow = true;
  seniorPharmacist.add(spHead);
  const spHair = new THREE.Mesh(
    new THREE.SphereGeometry(0.135, 24, 24, 0, Math.PI * 2, 0, Math.PI / 1.8),
    new THREE.MeshStandardMaterial({ color: 0x4c2a1e, roughness: 0.7 })
  );
  spHair.position.y = 1.38;
  seniorPharmacist.add(spHair);
  // Kính (2 ring nhỏ)
  const spGlassMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, metalness: 0.4 });
  const spGlassL = new THREE.Mesh(new THREE.TorusGeometry(0.025, 0.005, 8, 16), spGlassMat);
  spGlassL.position.set(-0.04, 1.36, 0.115); seniorPharmacist.add(spGlassL);
  const spGlassR = new THREE.Mesh(new THREE.TorusGeometry(0.025, 0.005, 8, 16), spGlassMat);
  spGlassR.position.set( 0.04, 1.36, 0.115); seniorPharmacist.add(spGlassR);
  // Ống nghe (stethoscope) quanh cổ
  const spSteth = new THREE.Mesh(
    new THREE.TorusGeometry(0.10, 0.008, 8, 24, Math.PI * 1.2),
    new THREE.MeshStandardMaterial({ color: 0x1e40af, roughness: 0.5 })
  );
  spSteth.position.set(0, 1.22, 0.08);
  spSteth.rotation.x = Math.PI / 2;
  seniorPharmacist.add(spSteth);
  // Nameplate bay phía trên đầu
  const spNameTex = makeTextTexture('DS. ĐH PHẠM THỊ HÀ', {
    w: 768, h: 96, bg: '#ecfdf5', color: '#065f46', fontSize: 44
  });
  const spName = new THREE.Mesh(
    new THREE.PlaneGeometry(0.62, 0.08),
    new THREE.MeshStandardMaterial({
      map: spNameTex, transparent: true,
      polygonOffset: true, polygonOffsetFactor: -6, polygonOffsetUnits: -6
    })
  );
  spName.position.y = 1.65;
  seniorPharmacist.add(spName);
  // Watch global body class để toggle visible
  const seniorObserver = new MutationObserver(() => {
    seniorPharmacist.visible = document.body.classList.contains('senior-mode');
  });
  seniorObserver.observe(document.body, { attributes: true, attributeFilter: ['class'] });

  // ── WAITING CHAIR (3-seat) ────────────────────────────────────────────────
  function buildWaitingChair() {
    const wch = new THREE.Group();
    const base = new THREE.Mesh(new THREE.BoxGeometry(1.8, 0.05, 0.45), new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.4 }));
    base.position.y = 0.45; base.castShadow = true; wch.add(base);
    [-0.6, 0, 0.6].forEach(x => {
      const seat = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.03, 0.4), new THREE.MeshStandardMaterial({ color: 0x0ea5e9, roughness: 0.7 }));
      seat.position.set(x, 0.48, 0); seat.castShadow = true; wch.add(seat);
      const back = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.4, 0.04), new THREE.MeshStandardMaterial({ color: 0x0ea5e9, roughness: 0.7 }));
      back.position.set(x, 0.78, -0.2); back.castShadow = true; wch.add(back);
    });
    [-0.85, 0.85].forEach(x => {
      const leg = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.45, 0.45), new THREE.MeshStandardMaterial({ color: 0x334155, metalness: 0.5 }));
      leg.position.set(x, 0.22, 0); leg.castShadow = true; wch.add(leg);
    });
    return wch;
  }
  const waiting = buildWaitingChair();
  waiting.position.set(-ROOM_W / 2 + 0.4, 0, 2.8);
  waiting.rotation.y = Math.PI / 2;
  scene.add(waiting);

  // ── CEILING FAN ───────────────────────────────────────────────────────────
  const fan = new THREE.Group();
  fan.position.set(0, ROOM_H - 0.45, 0.4);
  scene.add(fan);
  const fanRod = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, 0.36, 12), new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.85, roughness: 0.25 }));
  fanRod.position.y = 0.18; fan.add(fanRod);
  const fanHub = new THREE.Mesh(new THREE.CylinderGeometry(0.13, 0.16, 0.1, 24), new THREE.MeshStandardMaterial({ color: 0x475569, metalness: 0.7, roughness: 0.4 }));
  fan.add(fanHub);
  const fanDisk = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.13, 0.04, 24), new THREE.MeshStandardMaterial({ color: 0xcbd5e1, metalness: 0.85, roughness: 0.25 }));
  fanDisk.position.y = 0.07; fan.add(fanDisk);
  const fanBlades = new THREE.Group();
  for (let i = 0; i < 4; i++) {
    const bladeGroup = new THREE.Group();
    bladeGroup.rotation.y = (i * Math.PI) / 2;
    const blade = new THREE.Mesh(new THREE.BoxGeometry(0.85, 0.018, 0.2), new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.6 }));
    blade.position.set(0.55, -0.02, 0);
    blade.rotation.x = 0.18;
    blade.castShadow = true;
    bladeGroup.add(blade);
    fanBlades.add(bladeGroup);
  }
  fan.add(fanBlades);

  // ── AC UNITS on back wall ─────────────────────────────────────────────────
  function buildAC() {
    const ac = new THREE.Group();
    const body = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.4, 0.32), new THREE.MeshStandardMaterial({ color: 0xfafafa, roughness: 0.4 }));
    body.castShadow = true; ac.add(body);
    const vent = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.06, 0.02), new THREE.MeshStandardMaterial({ color: 0xe2e8f0 }));
    vent.position.set(0, -0.18, 0.16); ac.add(vent);
    const led = new THREE.Mesh(new THREE.CircleGeometry(0.018, 16), new THREE.MeshStandardMaterial({ color: 0x22c55e, emissive: 0x22c55e, emissiveIntensity: 0.6 }));
    led.position.set(-0.6, 0.12, 0.165); ac.add(led);
    // Brand text "Inveter" — dán mặt trước, mép phải, chữ xám nhạt mảnh.
    const brandTex = makeTextTexture('Inveter', {
      w: 384, h: 96, bg: '#fafafa', color: '#94a3b8', fontSize: 56
    });
    const brand = new THREE.Mesh(
      new THREE.PlaneGeometry(0.24, 0.06),
      new THREE.MeshStandardMaterial({
        map: brandTex, transparent: true, roughness: 0.6,
        polygonOffset: true, polygonOffsetFactor: -2, polygonOffsetUnits: -2
      })
    );
    brand.position.set(0.55, 0.08, 0.161);
    ac.add(brand);
    return ac;
  }
  const ac1 = buildAC(); ac1.position.set(-1.5, ROOM_H - 0.5, BACK_Z + 0.04); scene.add(ac1);
  const ac2 = buildAC(); ac2.position.set( 1.5, ROOM_H - 0.5, BACK_Z + 0.04); scene.add(ac2);

  // ── GLB models (async load) ──────────────────────────────────────────────
  const plantGroups = []; // { group, phase }
  const charMixers = [];

  async function loadAllModels() {
    // Tool tray items
    for (const t of TOOL_TARGETS) {
      try {
        const gltf = await loadGLB(MODELS_BASE + t.url);
        const obj = gltf.scene;
        obj.rotation.y = t.rotY;
        autoScaleGLB(obj, t.size);
        obj.position.x = t.position[0];
        obj.position.z = t.position[2];
        toolTrayGroup.add(obj);
      } catch (e) { console.warn('Tool model load failed:', t.url, e); }
    }
    // Barcode scanner + receipt printer next to POS
    for (const m of [
      { url: 'barcode_scanner.glb', position: [0.85, COUNTER_H, COUNTER_Z - 0.15], rotY: -Math.PI / 5, size: 0.22 },
      { url: 'receipt_printer.glb', position: [1.0,  COUNTER_H, COUNTER_Z + 0.18], rotY:  Math.PI,     size: 0.24 }
    ]) {
      try {
        const gltf = await loadGLB(MODELS_BASE + m.url);
        const obj = gltf.scene;
        obj.rotation.y = m.rotY;
        autoScaleGLB(obj, m.size);
        obj.position.set(m.position[0], m.position[1] + obj.position.y, m.position[2]);
        scene.add(obj);
      } catch (e) { console.warn('Counter model load failed:', m.url, e); }
    }
    // Plants × 2 with sway animation — đặt SÁT 2 góc trước (sát tường bên + ra
    // gần cửa/mặt tiền) để gọn, không chắn lối.
    for (const p of [
      { x: -ROOM_W / 2 + 0.55, z: 4.05, phase: 0 },
      { x:  ROOM_W / 2 - 0.55, z: 4.05, phase: 1.2 }
    ]) {
      try {
        const gltf = await loadGLB(MODELS_BASE + 'plant.glb');
        const obj = gltf.scene;
        autoScaleGLB(obj, 0.85);
        const wrap = new THREE.Group();
        wrap.add(obj);
        wrap.position.set(p.x, 0, p.z);
        scene.add(wrap);
        plantGroups.push({ group: wrap, phase: p.phase });
      } catch (e) { console.warn('Plant load failed:', e); }
    }
    // Sofa: bỏ theo yêu cầu.
    // Pharmacist + Patient: bỏ theo yêu cầu — không phù hợp với view nhà thuốc.
  }
  loadAllModels();

  // ── Nhân vật người thật điều khiển được (Phase walkable) ───────────────────
  // AABB chặn va chạm (world-space) + biên phòng. Bán kính nhân vật cộng trong
  // character.js. Quầy ngang giữa, tủ ốp tường sau, tủ lạnh trái, tủ phụ phải.
  let character = null;
  const _charColliders = [
    { minX: -COUNTER_W / 2, maxX: COUNTER_W / 2, minZ: COUNTER_Z - COUNTER_D / 2, maxZ: COUNTER_Z + COUNTER_D / 2 }, // quầy
    { minX: -4.2, maxX: 4.2, minZ: BACK_Z, maxZ: BACK_Z + 0.7 },   // dải tủ ốp tường sau
    { minX: -4.2, maxX: -3.3, minZ: 0.9, maxZ: 2.1 },              // tủ lạnh + góc trái
    { minX: 3.3, maxX: 4.2, minZ: -1.2, maxZ: 2.9 }                // tủ phụ phải
  ];
  const _charBounds = { minX: -ROOM_W / 2 + 0.35, maxX: ROOM_W / 2 - 0.35, minZ: BACK_Z + 0.35, maxZ: ROOM_D / 2 - 0.35 };
  const _charInteractables = [
    { pos: new THREE.Vector3(0, 0, COUNTER_Z + 0.7), label: 'Quầy giao dịch' },
    { pos: new THREE.Vector3(-3.2, 0, COUNTER_Z + 0.1), label: 'Tủ lạnh 2–8°C' },
    { pos: new THREE.Vector3(-1.9, 0, BACK_Z + 0.9), label: 'Tủ kê đơn' },
    { pos: new THREE.Vector3(1.9, 0, BACK_Z + 0.9), label: 'Tủ OTC' }
  ];
  let _walkWanted = false;
  let _avatarHeight = opts.avatarHeight || 1;
  let _skinTone = opts.skinTone || 0;
  let _shirtColor = opts.shirtColor || null;
  let _condition = opts.condition || 'none';
  let _expression = opts.expression || 'none';
  let _hairColor = opts.hairColor || null;
  // Tạo (hoặc tạo lại khi đổi avatar) nhân vật. Giữ nguyên trạng thái đi dạo.
  function spawnCharacter(url) {
    const wasWalking = _walkWanted || !!character?.isEnabled?.();
    character?.dispose();
    character = null;
    return createCharacter({
      scene, camera, controls, canvas,
      colliders: _charColliders,
      bounds: _charBounds,
      interactables: _charInteractables,
      spawn: { x: 0, z: 3.0, heading: Math.PI },
      avatarUrl: url || opts.avatarUrl || null,
      heightScale: _avatarHeight,
      skinTone: _skinTone,
      shirtColor: _shirtColor,
      condition: _condition,
      expression: _expression,
      hairColor: _hairColor,
      onPrompt: (txt) => opts.onWalkPrompt?.(txt)
    }).then(c => { character = c; if (wasWalking) c.setEnabled(true); opts.onCharacterReady?.(); return c; })
      .catch(e => console.warn('[scene] nhân vật lỗi:', e));
  }
  // Nhân vật BỆNH NHÂN đứng trong hiệu thuốc (tính năng "đi dạo / nhập vai" tạm tắt,
  // chỉ chọn nam/nữ + chiều cao). Bật đi dạo lại bằng setWalkMode(true).
  spawnCharacter();

  // ── Camera preset switching with 700ms lerp ───────────────────────────────
  let currentPreset = 'default';
  let presetStartedAt = null;
  function setCameraPreset(key) {
    if (!CAMERA_PRESETS[key]) return;
    currentPreset = key;
    presetStartedAt = performance.now();
    _panVel.set(0, 0, 0);      // huỷ pan đang chờ khi nhảy preset mới
    opts.onPresetChange?.(key);
  }

  // ── Pan camera theo ngăn tủ (nút ▲▼ + phím mũi tên ←↑↓→) ───────────────────
  // Dời ĐỒNG THỜI target và camera.position một lượng BẰNG NHAU → giữ nguyên góc
  // nghiêng + khoảng cách (offset không đổi nên OrbitControls không tranh chấp).
  // Dọc theo trục Y (lên/xuống ngăn) + ngang theo trục "phải" của camera (trái/
  // phải). _panVel là vận tốc pan còn lại, render loop ease & áp dụng mỗi frame.
  const _panVel = new THREE.Vector3();
  const _panRight = new THREE.Vector3();
  const VPAN_STEP = 0.34, VPAN_MIN_Y = 0.22, VPAN_MAX_Y = 2.15;
  function _panBy(x, y, z) { presetStartedAt = null; _panVel.x += x; _panVel.y += y; _panVel.z += z; }
  function nudgeVertical(dir) { _panBy(0, dir * VPAN_STEP, 0); }
  function nudgeHorizontal(dir) {
    _panRight.setFromMatrixColumn(camera.matrix, 0); _panRight.y = 0; // trục phải, giữ ngang
    if (_panRight.lengthSq() < 1e-6) return;
    _panRight.normalize().multiplyScalar(dir * VPAN_STEP);
    _panBy(_panRight.x, 0, _panRight.z);
  }
  // Phím mũi tên: ↑↓ trượt ngăn trên/dưới, ←→ trượt trái/phải. Bỏ qua khi đang
  // gõ trong ô nhập hoặc có modal mở (để không cướp phím của chat/inspector).
  function _onKeyNav(e) {
    const a = document.activeElement;
    if (a && (a.tagName === 'INPUT' || a.tagName === 'TEXTAREA' || a.isContentEditable)) return;
    if (document.querySelector('.inspector-overlay, .pos-overlay, .salestray-overlay, .notepad-overlay, .le2-overlay')) return;
    let h = true;
    if (e.key === 'ArrowUp') nudgeVertical(+1);
    else if (e.key === 'ArrowDown') nudgeVertical(-1);
    else if (e.key === 'ArrowLeft') nudgeHorizontal(-1);
    else if (e.key === 'ArrowRight') nudgeHorizontal(+1);
    else h = false;
    if (h) e.preventDefault();
  }
  window.addEventListener('keydown', _onKeyNav);

  // ── Render loop ──────────────────────────────────────────────────────────
  const clock = new THREE.Clock();
  const _focusMarkers = [];   // mũi tên/vòng đánh dấu thuốc tìm được (focusDrug)
  function render() {
    const dt = Math.min(clock.getDelta(), 0.05);
    const t = clock.elapsedTime;

    // Marker focus: nảy nhẹ + hết hạn sau 5s.
    for (let i = _focusMarkers.length - 1; i >= 0; i--) {
      const fm = _focusMarkers[i];
      const age = t - fm.born;
      if (age > 5) {
        scene.remove(fm.grp);
        fm.grp.traverse(o => { o.geometry?.dispose?.(); o.material?.dispose?.(); });
        _focusMarkers.splice(i, 1);
      } else if (fm.grp.children[0]) {
        fm.grp.children[0].position.y += Math.sin(t * 6) * 0.0015; // nảy mũi tên
      }
    }

    // Fan rotation
    fanBlades.rotation.y += dt * 4.5;
    // Plants sway
    plantGroups.forEach(({ group, phase }) => {
      group.rotation.z = Math.sin((t + phase) * 0.9) * 0.04;
      group.rotation.x = Math.cos((t + phase) * 0.7) * 0.025;
    });
    // Fridge doors lerp toward target
    [topDoor, botDoor].forEach(d => {
      const tgt = d.userData.isOpen ? Math.PI / 2.2 : 0;
      d.rotation.y += (tgt - d.rotation.y) * 0.18;
    });
    // Generic openable doors (counter bays + tủ kiểm soát đặc biệt) — mỗi
    // hinge có openAngle riêng (counter mở -70°, side cab mở +85°).
    openableDoors.forEach(d => {
      const tgt = d.userData.isOpen ? (d.userData.openAngle ?? -Math.PI / 2.6) : 0;
      d.rotation.y += (tgt - d.rotation.y) * 0.18;
    });
    // Fridge LED brightens when any door open
    const anyOpen = topDoor.userData.isOpen || botDoor.userData.isOpen;
    fridgeLED.material.emissiveIntensity = anyOpen ? 1.4 : 0.2;
    // Character animations
    charMixers.forEach(m => m.update(dt));
    // Nhân vật điều khiển được (di chuyển + anim + camera bám khi bật đi dạo)
    if (character) character.update(dt);

    // P2: Scanner LED pulse + beam tia laser
    const now = performance.now();
    const scanning = now < scanUntil;
    scLED.material.emissiveIntensity = scanning ? 1.6 + Math.sin(now * 0.05) * 0.4 : 0.5;
    scanBeam.material.opacity = scanning ? 0.55 : 0;

    // P2: Printer paper grow effect — kéo dài giấy ra slot trong 2.5s
    if (now < printUntil) {
      const remaining = (printUntil - now) / 2500;
      prPaper.scale.y = 0.05 + (1 - remaining) * 1.4; // 0.05 → 1.45
      prPaper.position.y = 0.155 - (1 - remaining) * 0.05;
    } else if (prPaper.visible && now > printUntil + 4000) {
      // Auto ẩn giấy sau 4s tiếp theo (giả như khách lấy hóa đơn)
      prPaper.visible = false;
    }

    // Drug pick lerp — hộp BAY VÒNG CUNG (peak Y +15cm) thay vì straight line
    // để vừa đẹp vừa không xuyên qua counter top.
    drugMeshes.forEach(m => {
      const target = m.userData.targetPosition;
      if (!target) return;
      const speed = 1 - Math.pow(0.001, dt);
      m.position.lerp(target, speed);
      // Arc lift: bow Y theo khoảng cách phẳng (xz) từ midpoint
      const startY = (m.userData.homePosition || target).y;
      const endY = target.y;
      const flatDistTotal = Math.hypot(
        (m.userData.homePosition?.x ?? target.x) - target.x,
        (m.userData.homePosition?.z ?? target.z) - target.z
      );
      const flatDistRemain = Math.hypot(m.position.x - target.x, m.position.z - target.z);
      const t = flatDistTotal > 0.01 ? 1 - flatDistRemain / flatDistTotal : 1;
      const arcLift = 0.18 * 4 * t * (1 - t); // parabola peak ~18cm at t=0.5
      m.position.y = (startY + (endY - startY) * t) + arcLift;
      if (m.position.distanceTo(target) < 0.003 && flatDistRemain < 0.01) {
        m.position.copy(target);
        m.userData.targetPosition = null;
      }
    });

    // Camera preset lerp (within 700ms after change) — disable damping during
    // transition to prevent OrbitControls from fighting the lerp.
    if (presetStartedAt != null) {
      const elapsed = performance.now() - presetStartedAt;
      const p = CAMERA_PRESETS[currentPreset];
      if (elapsed > 700) {
        // Snap to final target on last frame to avoid leftover error
        controls.target.copy(new THREE.Vector3(...p.target));
        camera.position.copy(new THREE.Vector3(...p.pos));
        controls.minDistance = p.minDist;
        controls.maxDistance = p.maxDist;
        controls.enableDamping = true;
        presetStartedAt = null;
      } else {
        controls.enableDamping = false;
        controls.target.lerp(new THREE.Vector3(...p.target), 0.12);
        camera.position.lerp(new THREE.Vector3(...p.pos), 0.12);
        controls.minDistance = p.minDist;
        controls.maxDistance = p.maxDist;
      }
    }

    // Pan camera — ease target + camera cùng một lượng (giữ offset). Clamp Y
    // trong khoảng kệ; X/Z tự do (như kéo chuột phải).
    if (_panVel.x || _panVel.y || _panVel.z) {
      const sx = _panVel.x * 0.18, sy = _panVel.y * 0.18, sz = _panVel.z * 0.18;
      controls.target.x += sx; controls.target.y += sy; controls.target.z += sz;
      camera.position.x += sx; camera.position.y += sy; camera.position.z += sz;
      _panVel.x -= sx; _panVel.y -= sy; _panVel.z -= sz;
      if (controls.target.y < VPAN_MIN_Y) { const c = VPAN_MIN_Y - controls.target.y; controls.target.y += c; camera.position.y += c; _panVel.y = 0; }
      else if (controls.target.y > VPAN_MAX_Y) { const c = VPAN_MAX_Y - controls.target.y; controls.target.y += c; camera.position.y += c; _panVel.y = 0; }
      if (Math.abs(_panVel.x) + Math.abs(_panVel.y) + Math.abs(_panVel.z) < 0.001) _panVel.set(0, 0, 0);
    }

    controls.update();
    renderer.render(scene, camera);
  }
  renderer.setAnimationLoop(render);

  // Resize
  function resize() {
    const w = canvas.clientWidth, h = canvas.clientHeight;
    if (w === 0 || h === 0) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
  window.addEventListener('resize', resize);
  setTimeout(resize, 0);

  // ── Raycaster ────────────────────────────────────────────────────────────
  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();
  // `picked` lưu THỨ TỰ các sub-mesh đã pick (mỗi hộp 1 entry), tối đa 8 hộp.
  // Cho phép 1 drug bị pick nhiều hộp (3) và unpick LIFO.
  const picked = [];
  const labelsByDrug = new Map();
  let pendingLabel = null;
  // Hộp ĐANG nhắm để dán nhãn HDSD — PHẢI là hộp đã đưa vào KHAY bán hàng
  // (userData.picked), không dán lên hộp trên kệ. Set khi click hộp trong khay
  // lúc đang có pendingLabel; dùng cho getDrugFace + applyHdsdSticker.
  let labelTargetSub = null;

  function findDrugAncestor(o) {
    let cur = o;
    while (cur) {
      if (cur.userData && cur.userData.drugId) return cur;
      cur = cur.parent;
    }
    return null;
  }
  function findFridgeDoor(o) {
    let cur = o;
    while (cur) {
      if (cur.userData && cur.userData.fridgeDoor) return cur.userData.fridgeDoor;
      cur = cur.parent;
    }
    return null;
  }
  function findBookAncestor(o) {
    let cur = o;
    while (cur) {
      if (cur.userData && cur.userData.bookId) return cur;
      cur = cur.parent;
    }
    return null;
  }
  function clickAt(clientX, clientY) {
    const r = canvas.getBoundingClientRect();
    pointer.x = ((clientX - r.left) / r.width) * 2 - 1;
    pointer.y = -((clientY - r.top) / r.height) * 2 + 1;
    raycaster.setFromCamera(pointer, camera);
    const hits = raycaster.intersectObjects(scene.children, true);
    // Duyệt từ GẦN→XA. Quy tắc:
    //  • THUỐC ưu tiên cao nhất — kể cả nằm SAU cửa kính (kính trong suốt cho click)
    //    → thuốc trong tủ lạnh / tủ kính bấm được bình thường như trên kệ.
    //  • CỬA (kính/tay nắm) chỉ mở khi KHÔNG có thuốc/vật tương tác phía trước và
    //    KHÔNG bị VẬT CHE đặc chắn — tránh "bấm vật che → cửa sau vẫn mở".
    //  • Vật KHÔNG tương tác, KHÔNG phải cửa/thuốc = vật cản đặc → DỪNG (chặn cửa sau).
    let firstDoor = null;
    for (const h of hits) {
      const ud = h.object.userData || {};
      if (ud.posClick) return { kind: 'pos' };
      if (ud.packageClick) return { kind: 'package', packageType: ud.packageType };
      if (ud.retailBasketClick) return { kind: 'retail_basket' };
      if (ud.labelClick) return { kind: 'label' };
      if (ud.notepadClick) return { kind: 'notepad' };
      if (ud.salesTrayClick) return { kind: 'sales_tray' };
      const book = findBookAncestor(h.object);
      if (book) return { kind: 'book', book };
      const drugGroup = findDrugAncestor(h.object);
      if (drugGroup && drugGroup.userData.drug) return { kind: 'drug', group: drugGroup };
      const door = findFridgeDoor(h.object);
      if (door) { if (!firstDoor) firstDoor = door; continue; } // kính: cho click xuyên qua tìm thuốc
      break; // vật cản đặc (kệ/tường/prop/quầy) → không xét tiếp lớp phía sau
    }
    return firstDoor ? { kind: 'door', door: firstDoor } : null;
  }

  // Pick logic: click TRÊN KỆ → opts.onInspectDrug callback (P3 modal). Nếu
  // không có callback → direct pick (backward compat).
  // Click TRONG TRAY (sub đã `picked`) → unpick chính hộp đó.
  function pickDrug(drugIdOrSub) {
    // Chuẩn hoá về 1 hộp `sub` của thuốc (string → hộp ngoài cùng).
    let sub = drugIdOrSub;
    if (typeof drugIdOrSub === 'string') {
      const boxes = drugMeshes
        .filter(g => g.userData.drugId === drugIdOrSub)
        .sort((a, b) => a.userData.boxIndex - b.userData.boxIndex);
      sub = boxes[0];
      if (!sub) return false;
    }
    const drugId = sub.userData.drugId;
    const boxes = drugMeshes.filter(g => g.userData.drugId === drugId);
    const remaining = boxes
      .filter(b => !b.userData.picked)
      .sort((a, b) => a.userData.boxIndex - b.userData.boxIndex);
    // CLICK hộp = LUÔN mở thông tin chi tiết (inspector). KHÔNG còn bay ra/bay
    // về kệ khi click — pick (đưa vào khay) / trả về kệ làm qua NÚT trong modal.
    // ENRICH drug giống buildSingleDrugBox để inspector vẽ tem KHỚP 100% với
    // hộp trên kệ (groupAccent ưu tiên brand rồi mới hash → body & label cùng tông).
    if (typeof opts.onInspectDrug === 'function') {
      const display = remaining[0] || sub;     // hộp để hiển thị/đóng gói
      const rawDrug = display.userData.drug;
      const colors = getDrugColors(rawDrug);
      const enrichedDrug = {
        ...rawDrug,
        bodyColor: rawDrug.bodyColor || colors.body,
        groupAccent: rawDrug.groupAccent || colors.accent,
        textDark: rawDrug.textDark !== false
      };
      opts.onInspectDrug({
        drug: enrichedDrug,
        meta: getDrugMeta(rawDrug),
        confirmToTray: () => {
          // Sinh viên xác nhận đưa vào khay → quét barcode + lerp
          const target = remaining[0];
          if (!target) return;               // hết hộp để lấy
          triggerBarcodeScan();
          setTimeout(() => pickSub(target), 700);
        },
        returnToShelf: () => {
          // Chỉ trả về kệ nếu CHÍNH hộp đang xem đang nằm trong khay
          // (mở từ khay bán hàng). Click hộp trên kệ → đóng modal không làm gì.
          if (sub.userData.picked) unpickSub(sub);
        }
      });
      return true;
    }
    // Fallback (không có onInspectDrug): toggle pick/unpick như cũ.
    if (sub.userData.picked) return unpickSub(sub);
    if (remaining.length === 0) return false;
    return pickSub(remaining[0]);
  }
  function pickSub(sub) {
    if (picked.length >= 8) return false;
    sub.userData.picked = true;
    picked.push(sub);
    const slotIdx = picked.length - 1;
    const boxH = sub.userData?.style?.h || 0.14;
    // Reparent về SCENE, giữ world transform. Trước đây thuốc trong tủ là con
    // của cabGroup (local-space) nhưng pickSlotPos trả WORLD-space → lerp local
    // → vị trí lệch sang ô khác (đáy phòng / lơ lửng giữa quầy + tủ). Sau khi
    // attach vào scene, lerp local == lerp world → hộp hạ cánh đúng trên khay.
    if (sub.parent && sub.parent !== scene) {
      // Lưu parent + homePosition gốc (local) để unpick trả về kệ đúng chỗ.
      sub.userData.originalParent = sub.parent;
      sub.userData.originalLocalHome = sub.userData.homePosition.clone();
      scene.attach(sub);
      // Sau attach, sub.position đã được chuyển sang world. Cập nhật homePosition
      // sang WORLD để arc-lift dùng đúng startY/startXZ.
      sub.userData.homePosition = sub.position.clone();
    }
    sub.userData.targetPosition = pickSlotPos(slotIdx, boxH);
    opts.onAction?.('pick_box', { drugId: sub.userData.drugId, boxIndex: sub.userData.boxIndex });
    return true;
  }
  function unpickSub(sub) {
    sub.userData.picked = false;
    const idx = picked.indexOf(sub);
    if (idx >= 0) picked.splice(idx, 1);
    // Yêu cầu thầy #10: trả hộp về kệ → HỦY nhãn HDSD đã dán, trả về trạng thái
    // ban đầu (gỡ mesh sticker + xoá bản ghi nhãn của thuốc này).
    const oldSticker = sub.getObjectByName('hdsd-sticker');
    if (oldSticker) { sub.remove(oldSticker); oldSticker.material?.map?.dispose?.(); oldSticker.material?.dispose?.(); oldSticker.geometry?.dispose?.(); }
    labelsByDrug.delete(sub.userData.drugId);
    // Đưa về kệ gốc: reparent lại cabGroup + dùng homePosition LOCAL gốc.
    if (sub.userData.originalParent) {
      sub.userData.originalParent.attach(sub);
      sub.userData.homePosition = sub.userData.originalLocalHome.clone();
      sub.userData.originalParent = null;
    }
    sub.userData.targetPosition = sub.userData.homePosition.clone();
    // Reflow các hộp còn lại để bít chỗ trống — mỗi hộp theo h riêng
    picked.forEach((s, i) => {
      const h = s.userData?.style?.h || 0.14;
      s.userData.targetPosition = pickSlotPos(i, h);
    });
    opts.onAction?.('unpick_box', { drugId: sub.userData.drugId, boxIndex: sub.userData.boxIndex });
    return true;
  }
  function attachLabelToPickedDrug(drugId, label) {
    labelsByDrug.set(drugId, label);
    opts.onAction?.('label_dose', { drugId, label });
  }

  // Hộp ngoài cùng (boxIndex nhỏ nhất, có nhãn mặt +Z) của 1 thuốc.
  function frontDrugBox(drugId) {
    const list = drugMeshes
      .filter(m => m.userData.drugId === drugId && m.userData.style)
      .sort((a, b) => (a.userData.boxIndex || 0) - (b.userData.boxIndex || 0));
    return list[0] || null;
  }

  // getDrugFace — trả canvas mặt trước hộp + kích thước để overlay 2D phóng to.
  function getDrugFace(drugId) {
    // Ưu tiên hộp đang nhắm trong khay; fallback hộp ngoài cùng trên kệ.
    const sub = (labelTargetSub && labelTargetSub.userData.drugId === drugId)
      ? labelTargetSub : frontDrugBox(drugId);
    if (!sub) return null;
    const drug = sub.userData.drug;
    const tex = makeDrugLabelTex(drug);
    const style = sub.userData.style;
    return {
      canvas: tex.image,          // canvas 256×320 của mặt trước
      brand: drug.brand || drug.name || '',
      style: { w: style.w, h: style.h, d: style.d },
      already: labelsByDrug.has(drugId)
    };
  }

  // getDrugFace3D — render CHÍNH hình 3D của thuốc (hộp HOẶC chai, đúng quy cách)
  // ra ảnh canvas để cửa sổ dán nhãn hiện đúng hình (thay vì mặt phẳng hộp).
  // Render 1 LẦN bằng renderer tạm rồi dispose ngay (không giữ WebGL context).
  function getDrugFace3D(drugId, pxW = 460, pxH = 560) {
    const sub = (labelTargetSub && labelTargetSub.userData.drugId === drugId)
      ? labelTargetSub : frontDrugBox(drugId);
    if (!sub) return null;
    const drug = sub.userData.drug;
    const style = sub.userData.style;
    const isBottle = packType(drug) !== 'carton';
    const clone = sub.clone(true);
    const oldS = clone.getObjectByName('hdsd-sticker');
    if (oldS && oldS.parent) oldS.parent.remove(oldS);
    clone.position.set(0, 0, 0); clone.rotation.set(0, 0, 0); clone.scale.set(1, 1, 1);
    const rs = new THREE.Scene();
    rs.add(clone);
    rs.add(new THREE.AmbientLight(0xffffff, 1.0));
    const dl = new THREE.DirectionalLight(0xffffff, 0.65); dl.position.set(1, 2, 3); rs.add(dl);
    const cam = new THREE.PerspectiveCamera(32, pxW / pxH, 0.01, 20);
    const dist = Math.max(style.w, style.h) * 2.5;
    cam.position.set(0, 0, dist); cam.lookAt(0, 0, 0);
    let out = null;
    try {
      const r = new THREE.WebGLRenderer({ antialias: true, alpha: true, preserveDrawingBuffer: true });
      r.setPixelRatio(1); r.setSize(pxW, pxH); r.outputColorSpace = THREE.SRGBColorSpace;
      r.render(rs, cam);
      out = document.createElement('canvas'); out.width = pxW; out.height = pxH;
      out.getContext('2d').drawImage(r.domElement, 0, 0);
      r.forceContextLoss?.(); r.dispose();
    } catch (e) { return null; }
    return {
      canvas: out, brand: drug.brand || drug.name || '', isBottle,
      style: { w: style.w, h: style.h, d: style.d }, already: labelsByDrug.has(drugId)
    };
  }

  // Vẽ nhãn HDSD nhỏ (dán lên hộp) — pharmacy + tên thuốc + liều S/T/C/T + thời điểm.
  function _timingTextScene(l) {
    const map = { before_meal: 'Trước ăn', after_meal: 'Sau ăn', with_meal: 'Cùng bữa ăn', any: 'Bất kỳ' };
    const base = map[l.timing] || 'Bất kỳ';
    if ((l.timing === 'before_meal' || l.timing === 'after_meal') && l.mealOffsetMin > 0) return `${base} ${l.mealOffsetMin}'`;
    return base;
  }
  // Tỉ lệ nhãn HDSD = PORTRAIT 360×480, tông VÀNG KEM giống HỆT bản xem trước
  // trong trình soạn nhãn (.le2-sticker): nền #fef3c7, viền cam #d97706, ô liều
  // vàng #fde68a, chữ nâu — để "soạn" và "dán lên" GIỐNG NHAU (màu + shape).
  const HDSD_W = 360, HDSD_H = 480;
  function makeHdsdStickerTex(label) {
    const c = document.createElement('canvas');
    c.width = HDSD_W; c.height = HDSD_H;
    const ctx = c.getContext('2d');
    const FONT = "'Courier New', monospace";
    const rr = (x, y, w, h, r) => { ctx.beginPath(); ctx.roundRect(x, y, w, h, r); };
    // Nền kem + viền cam bo góc
    ctx.fillStyle = '#fef3c7'; rr(4, 4, HDSD_W - 8, HDSD_H - 8, 18); ctx.fill();
    ctx.strokeStyle = '#d97706'; ctx.lineWidth = 4; ctx.stroke();
    ctx.textBaseline = 'middle';
    let y = 30;
    // Header nhà thuốc — căn giữa, gạch dưới cam
    ctx.fillStyle = '#7c2d12'; ctx.font = `bold 14px ${FONT}`; ctx.textAlign = 'center';
    ctx.fillText(`${PHARMACY_INFO.name} · ĐT ${PHARMACY_INFO.phone}`, HDSD_W / 2, y);
    y += 16;
    ctx.strokeStyle = '#d97706'; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(22, y); ctx.lineTo(HDSD_W - 22, y); ctx.stroke();
    y += 26;
    // Tiêu đề + gạch đứt
    ctx.fillStyle = '#422006'; ctx.font = `800 22px ${FONT}`; ctx.textAlign = 'left';
    ctx.fillText('HƯỚNG DẪN SỬ DỤNG', 24, y);
    y += 18;
    ctx.setLineDash([7, 4]); ctx.strokeStyle = '#b45309'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(22, y); ctx.lineTo(HDSD_W - 22, y); ctx.stroke(); ctx.setLineDash([]);
    y += 28;
    // BN
    ctx.fillStyle = '#422006'; ctx.font = `15px ${FONT}`;
    ctx.fillText(`BN: ${(label.patient || 'Khách vãng lai').slice(0, 28)}`, 24, y);
    y += 30;
    // Tên thuốc (đậm, lớn)
    ctx.font = `800 24px ${FONT}`;
    ctx.fillText((label.brand || '').slice(0, 22), 24, y);
    y += 26;
    // Hoạt chất / hàm lượng — tự xuống dòng theo bề ngang
    ctx.fillStyle = '#5b3a1a'; ctx.font = `15px ${FONT}`;
    const words = String(label.strength || label.generic || '').split(' ');
    let line = '';
    for (const w of words) {
      const test = line ? line + ' ' + w : w;
      if (ctx.measureText(test).width > HDSD_W - 48 && line) { ctx.fillText(line, 24, y); y += 19; line = w; }
      else line = test;
    }
    if (line) { ctx.fillText(line, 24, y); y += 19; }
    y += 10;
    // Lưới liều S/T/C/T — ô vàng, số nâu đậm
    const cells = [['Sáng', label.morning], ['Trưa', label.noon], ['Chiều', label.afternoon], ['Tối', label.evening]];
    const gx0 = 24, gap = 8, cw = (HDSD_W - 48 - 3 * gap) / 4, ch = 58;
    cells.forEach(([t, n], i) => {
      const x = gx0 + i * (cw + gap);
      ctx.fillStyle = '#fde68a'; rr(x, y, cw, ch, 8); ctx.fill();
      ctx.fillStyle = '#78350f'; ctx.font = `12px ${FONT}`; ctx.textAlign = 'center';
      ctx.fillText(t, x + cw / 2, y + 16);
      ctx.fillStyle = '#422006'; ctx.font = `800 26px ${FONT}`;
      ctx.fillText(String(n ?? 0), x + cw / 2, y + 38);
    });
    y += ch + 26;
    // Thời điểm + tổng liều/ngày
    const total = (label.morning || 0) + (label.noon || 0) + (label.afternoon || 0) + (label.evening || 0);
    ctx.textAlign = 'left'; ctx.fillStyle = '#78350f'; ctx.font = `bold 15px ${FONT}`;
    ctx.fillText(`🕒 ${_timingTextScene(label)} · ${total} viên/ngày`, 24, y);
    y += 26;
    if (label.notes) {
      ctx.fillStyle = '#7c2d12'; ctx.font = `13px ${FONT}`;
      ctx.fillText(('📝 ' + label.notes).slice(0, 40), 24, y);
    }
    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }

  // applyHdsdSticker — dán plane nhãn HDSD lên mặt trước hộp tại toạ độ uv (overlay 2D).
  function applyHdsdSticker(drugId, label, placement) {
    // Dán lên CHÍNH hộp trong khay đã nhắm (không phải hộp trên kệ).
    const sub = (labelTargetSub && labelTargetSub.userData.drugId === drugId)
      ? labelTargetSub : frontDrugBox(drugId);
    if (!sub) return false;
    const style = sub.userData.style;
    // Gỡ sticker cũ nếu dán lại
    const old = sub.getObjectByName('hdsd-sticker');
    if (old) sub.remove(old);
    const u = Math.max(0, Math.min(1, placement?.u ?? 0.5));
    const v = Math.max(0, Math.min(1, placement?.v ?? 0.5));
    const mat = new THREE.MeshStandardMaterial({
      map: makeHdsdStickerTex(label), roughness: 0.6, side: THREE.DoubleSide,
      polygonOffset: true, polygonOffsetFactor: -8, polygonOffsetUnits: -8
    });
    let sticker;
    const isBottle = packType(sub.userData.drug) !== 'carton';
    if (isBottle) {
      // CHAI/DỊCH TRUYỀN: nhãn UỐN TRÒN ôm theo thân chai (cylinder segment),
      // không phẳng. v điều khiển độ cao dọc thân.
      const r = Math.min(style.w, style.d) * 0.5;
      const bodyH = style.h * 0.74, baseY = -style.h / 2;
      const sh = Math.min(bodyH * 0.6, r * 2.0 * (HDSD_H / HDSD_W));
      const sw = sh * (HDSD_W / HDSD_H);
      const arc = Math.min(Math.PI * 0.72, sw / r);
      sticker = new THREE.Mesh(
        new THREE.CylinderGeometry(r * 1.015, r * 1.015, sh, 28, 1, true, -arc / 2, arc), mat);
      let cy = baseY + bodyH * (1 - v);
      cy = Math.max(baseY + sh / 2, Math.min(baseY + bodyH - sh / 2, cy));
      sticker.position.set(0, cy, 0);
    } else {
      // HỘP GIẤY: nhãn phẳng dán mặt trước +Z, tỉ lệ PORTRAIT 360:480.
      // Nhãn NHỎ lại (yêu cầu thầy #10: nhãn đang quá to so với hộp).
      const faceW = style.w * 0.92, faceH = style.h * 0.88;
      const sw = Math.min(faceW * 0.42, faceH * 0.62 * (HDSD_W / HDSD_H));
      const sh = sw * (HDSD_H / HDSD_W);
      let cx = (u - 0.5) * faceW, cy = (0.5 - v) * faceH;
      cx = Math.max(-faceW / 2 + sw / 2, Math.min(faceW / 2 - sw / 2, cx));
      cy = Math.max(-faceH / 2 + sh / 2, Math.min(faceH / 2 - sh / 2, cy));
      sticker = new THREE.Mesh(new THREE.PlaneGeometry(sw, sh), mat);
      sticker.position.set(cx, cy, style.d / 2 + 0.0012); // SÁT mặt hộp (chạm), polygonOffset chống z-fight
    }
    sticker.name = 'hdsd-sticker';
    sub.add(sticker);
    labelsByDrug.set(drugId, { ...label, placement: { u, v } });
    opts.onAction?.('label_dose', { drugId, label });
    pendingLabel = null;
    labelTargetSub = null;
    opts.onPendingLabelClear?.();
    return true;
  }

  // Chọn thuốc/POS/sách… xử lý trên POINTERUP (không phải pointerdown) + ngưỡng
  // kéo, để: (1) kéo xoay không vô tình mở modal; (2) OrbitControls nhận đủ
  // pointerup → reset trạng thái xoay. Mở modal HOÃN 1 nhịp (setTimeout 0) để
  // controls xử lý xong pointerup TRƯỚC, tránh lỗi camera tự xoay sau khi đóng
  // modal (pointerup bị overlay nuốt mất → controls kẹt state ROTATE).
  let _pdX = 0, _pdY = 0, _pdBtn = -1;
  canvas.addEventListener('pointerdown', (e) => { _pdX = e.clientX; _pdY = e.clientY; _pdBtn = e.button; });
  canvas.addEventListener('pointerup', (e) => {
    if (_pdBtn !== 0 || e.button !== 0) return;                       // chỉ chuột trái
    if (Math.abs(e.clientX - _pdX) > 6 || Math.abs(e.clientY - _pdY) > 6) return; // đã kéo → bỏ qua
    const hit = clickAt(e.clientX, e.clientY);
    if (!hit) return;
    const act = () => {
      if (hit.kind === 'pos') opts.onPosOpen?.();
      else if (hit.kind === 'package') opts.onPackageOpen?.(hit.packageType);
      else if (hit.kind === 'retail_basket') opts.onRetailBasketOpen?.();
      else if (hit.kind === 'label') opts.onLabelOpen?.();
      else if (hit.kind === 'notepad') opts.onNotepadOpen?.();
      else if (hit.kind === 'sales_tray') opts.onSalesTrayOpen?.();
      else if (hit.kind === 'book') opts.onBookOpen?.(hit.book.userData.bookId);
      else if (hit.kind === 'door') hit.door.userData.isOpen = !hit.door.userData.isOpen;
      else if (hit.kind === 'drug') {
        const sub = hit.group;
        if (pendingLabel) {
          // CHỈ dán nhãn HDSD lên hộp ĐÃ ĐƯA VÀO KHAY bán hàng (userData.picked),
          // KHÔNG cho dán trên kệ. Hộp trên kệ → nhắc đưa vào khay trước.
          if (sub.userData.picked) {
            labelTargetSub = sub;
            opts.onLabelPlaceStart?.(sub.userData.drugId, pendingLabel);
          } else {
            opts.onToast?.('Hãy bấm hộp → "Đưa vào khay (Quét barcode)" trước, rồi mới dán nhãn HDSD lên hộp trong khay.');
          }
        } else {
          pickDrug(sub);
        }
      }
    };
    setTimeout(act, 0);
  });

  // ── Hover detect cho tooltip + search focus ─────────────────────────────
  function getDrugAtPointer(clientX, clientY) {
    const r = canvas.getBoundingClientRect();
    pointer.x = ((clientX - r.left) / r.width) * 2 - 1;
    pointer.y = -((clientY - r.top) / r.height) * 2 + 1;
    raycaster.setFromCamera(pointer, camera);
    const hits = raycaster.intersectObjects(scene.children, true);
    for (const h of hits) {
      const sub = findDrugAncestor(h.object);
      if (sub && sub.userData.drug) {
        return {
          drug: sub.userData.drug,
          meta: getDrugMeta(sub.userData.drug),
          sub
        };
      }
    }
    return null;
  }
  function getCatalog() {
    // Trả về ALL_DRUGS + meta cho search/list. Dedupe theo drugId vì mỗi drug
    // có 3 box trong drugMeshes.
    const seen = new Set();
    const out = [];
    for (const m of drugMeshes) {
      const d = m.userData.drug;
      if (!d || seen.has(d.id)) continue;
      seen.add(d.id);
      out.push({ drug: d, meta: getDrugMeta(d) });
    }
    return out;
  }
  // ── P2/P4: Trigger scanner beam + printer paper (animation effect) ─────
  let scanUntil = 0, printUntil = 0;
  function triggerBarcodeScan() {
    scanUntil = performance.now() + 700;
    opts.onAction?.('barcode_scan', { ts: Date.now() });
  }
  function triggerPrintReceipt() {
    printUntil = performance.now() + 2500;
    prPaper.visible = true;
    prPaper.scale.y = 0.05;
    opts.onAction?.('print_receipt', { ts: Date.now() });
  }
  function getScannerWorldPos() {
    const v = new THREE.Vector3();
    scannerGroup.getWorldPosition(v);
    return v;
  }

  function focusDrug(drugId) {
    // Tìm box ngoài cùng (boxIndex=0) của drug.
    const candidates = drugMeshes
      .filter(m => m.userData.drugId === drugId)
      .sort((a, b) => (a.userData.boxIndex || 0) - (b.userData.boxIndex || 0));
    if (candidates.length === 0) return false;
    const box0 = candidates[0];
    const target = new THREE.Vector3();
    box0.getWorldPosition(target);
    // Camera VUÔNG GÓC mặt hộp (yêu cầu thầy): lấy pháp tuyến +Z của hộp trong
    // world (tủ bên xoay 90° → pháp tuyến ±X), bỏ thành phần Y để nhìn ngang tầm.
    const quat = new THREE.Quaternion(); box0.getWorldQuaternion(quat);
    const normal = new THREE.Vector3(0, 0, 1).applyQuaternion(quat);
    normal.y = 0;
    if (normal.lengthSq() < 1e-4) normal.set(0, 0, 1);
    normal.normalize();
    const newPos = target.clone().addScaledVector(normal, 1.25);
    newPos.y = target.y + 0.12;          // gần như ngang tầm hộp
    CAMERA_PRESETS._focused = {
      label: '🎯 ' + (box0.userData.drug?.brand || drugId),
      pos: [newPos.x, newPos.y, newPos.z],
      target: [target.x, target.y, target.z],
      minDist: 0.4, maxDist: 4
    };
    setCameraPreset('_focused');
    // MARKER rõ ràng: mũi tên vàng chỉ xuống + vòng sáng ôm mặt hộp, tồn tại ~5s.
    const style = box0.userData.style || { h: 0.14, w: 0.08, d: 0.05 };
    const glowMat = () => new THREE.MeshStandardMaterial({ color: 0xfacc15, emissive: 0xf59e0b, emissiveIntensity: 1.0 });
    const marker = new THREE.Group();
    marker.position.copy(target);
    const cone = new THREE.Mesh(new THREE.ConeGeometry(0.04, 0.085, 18), glowMat());
    cone.position.y = style.h / 2 + 0.11; cone.rotation.x = Math.PI; marker.add(cone);
    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(Math.max(style.w, style.h) * 0.62, 0.006, 10, 30), glowMat());
    ring.position.copy(normal.clone().multiplyScalar(style.d / 2 + 0.012));
    ring.quaternion.copy(quat); marker.add(ring);
    scene.add(marker);
    _focusMarkers.push({ grp: marker, born: clock.elapsedTime });
    // Pulse emissive trên thân hộp ~5s.
    candidates.forEach(m => m.traverse(o => {
      if (o.material && o.material.emissive !== undefined) {
        o.material.emissive = new THREE.Color(0xf59e0b);
        o.material.emissiveIntensity = 0.6;
        setTimeout(() => { if (o.material) o.material.emissiveIntensity = 0; }, 5000);
      }
    }));
    return true;
  }

  return {
    scene, camera, renderer, controls,
    cameraPresets: CAMERA_PRESETS,
    setCameraPreset,
    nudgeVertical,
    nudgeHorizontal,
    setExposure: (v) => applyBrightness(v, true),
    getExposure: () => currentBrightness,
    getCurrentPreset: () => currentPreset,
    setWalkMode: (on) => { _walkWanted = on; presetStartedAt = null; _panVel.set(0, 0, 0); character?.setEnabled(on); },
    isWalkMode: () => !!character?.isEnabled(),
    isCharacterReady: () => !!character,
    getCharacter: () => character,
    reloadAvatar: (url) => spawnCharacter(url),
    setAvatarHeight: (s) => { _avatarHeight = Math.max(0.8, Math.min(1.25, s)); character?.setHeightScale(_avatarHeight); },
    getAvatarHeight: () => _avatarHeight,
    setAvatarSkin: (t) => { _skinTone = t | 0; character?.setSkinTone(_skinTone); },
    getAvatarSkin: () => _skinTone,
    setAvatarShirt: (hex) => { _shirtColor = hex || null; character?.setShirtColor(_shirtColor); },
    setAvatarCondition: (c) => { _condition = c || 'none'; character?.setSkinCondition(_condition); },
    getAvatarCondition: () => _condition,
    setAvatarExpression: (e) => { _expression = e || 'none'; character?.setExpression(_expression); },
    getAvatarExpression: () => _expression,
    setAvatarHair: (h) => { _hairColor = h || null; character?.setHairColor(_hairColor); },
    getAvatarHair: () => _hairColor,
    getAvatarShirt: () => _shirtColor,
    getPickedIds: () => picked.map(s => s.userData.drugId),
    getLabels: () => Object.fromEntries(labelsByDrug.entries()),
    setPendingLabel: (l) => { pendingLabel = l; if (!l) labelTargetSub = null; },
    pickDrug,
    // Đưa 1 hộp của thuốc vào KHAY BÁN HÀNG (không mở inspector) — dùng sau khi
    // đóng gói ra lẻ để món hàng hiện trong khay như các thuốc khác.
    pickToTray: (drugId) => {
      const boxes = drugMeshes
        .filter(g => g.userData.drugId === drugId && !g.userData.picked)
        .sort((a, b) => (a.userData.boxIndex || 0) - (b.userData.boxIndex || 0));
      if (!boxes.length) return false;
      triggerBarcodeScan();
      return pickSub(boxes[0]);
    },
    attachLabelToPickedDrug,
    getDrugFace,
    getDrugFace3D,
    applyHdsdSticker,
    makeHdsdStickerTex,
    getDrugAtPointer,
    getCatalog,
    focusDrug,
    triggerBarcodeScan,
    triggerPrintReceipt,
    getScannerWorldPos,
    dispose: () => {
      renderer.setAnimationLoop(null);
      renderer.dispose();
      window.removeEventListener('resize', resize);
      window.removeEventListener('keydown', _onKeyNav);
      character?.dispose();
    }
  };
}
