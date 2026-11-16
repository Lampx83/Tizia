// ============================================================
// Lab Hoá Học Ảo v2 — kéo thả 2 hoá chất → phản ứng + sổ tay + thử thách + huy hiệu.
// ============================================================
// WRAP-MOUNT: bọc toàn bộ script gốc trong một IIFE để các `const` top-level
// (`$`, `CHEMS`, `REACTIONS`…) không rò ra global scope. Nhờ vậy khi Next
// remount (đổi route rồi quay lại / React StrictMode) và nạp lại file này, sẽ
// KHÔNG bị "Identifier already declared". Nội dung bên trong giữ NGUYÊN VĂN.
(function () {
const $ = (s) => document.querySelector(s);
const $$ = (s) => document.querySelectorAll(s);

const CHEMS = {
  HCl:     { name: 'HCl',       label: 'Axit clohiđric',   color: '#fef3c7', edge: '#f59e0b' },
  NaOH:    { name: 'NaOH',      label: 'Bazơ NaOH',         color: '#dbeafe', edge: '#3b82f6' },
  H2SO4:   { name: 'H₂SO₄',     label: 'Axit sunfuric',     color: '#fde68a', edge: '#d97706' },
  NaCl:    { name: 'NaCl',      label: 'Muối ăn',           color: '#f1f5f9', edge: '#94a3b8' },
  AgNO3:   { name: 'AgNO₃',     label: 'Bạc nitrat',        color: '#e0e7ff', edge: '#6366f1' },
  CuSO4:   { name: 'CuSO₄',     label: 'Đồng sunfat',       color: '#bfdbfe', edge: '#2563eb' },
  BaCl2:   { name: 'BaCl₂',     label: 'Bari clorua',       color: '#f3e8ff', edge: '#9333ea' },
  Na2CO3:  { name: 'Na₂CO₃',    label: 'Natri cacbonat',    color: '#dcfce7', edge: '#16a34a' },
  Zn:      { name: 'Zn',        label: 'Kẽm (kim loại)',    color: '#e2e8f0', edge: '#475569' },
  Fe:      { name: 'Fe',        label: 'Sắt (kim loại)',    color: '#fee2e2', edge: '#b91c1c' },
};

function pairKey(a, b) { return [a, b].sort().join('+'); }

// ── DỮ LIỆU PHẢN ỨNG ─────────────────────────────────────────
// cat: kt=kết tủa, kh=sinh khí, dm=đổi màu/thế kim loại, nh=trung hoà, nx=không phản ứng
const REACTIONS = [
  // ── Trung hoà ──
  { a:'HCl', b:'NaOH', cat:'nh',
    eq:'HCl + NaOH → NaCl + H₂O',
    phen:'Trung hoà, không màu, hơi ấm lên.',
    expl:'Axit + bazơ → muối + nước. Phản ứng trung hoà cơ bản, toả nhiệt nhẹ.',
    emit:'heat', liquidColor:'#e0f2fe' },
  { a:'NaOH', b:'H2SO4', cat:'nh',
    eq:'2NaOH + H₂SO₄ → Na₂SO₄ + 2H₂O',
    phen:'Trung hoà, dung dịch hơi ấm.',
    expl:'Axit mạnh + bazơ mạnh → muối trung tính + nước. Toả nhiệt rõ rệt.',
    emit:'heat', liquidColor:'#e0f2fe' },

  // ── Tạo kết tủa ──
  { a:'AgNO3', b:'NaCl', cat:'kt',
    eq:'AgNO₃ + NaCl → AgCl↓ + NaNO₃',
    phen:'Kết tủa trắng đục AgCl xuất hiện tức thì.',
    expl:'AgCl không tan trong nước — phản ứng nhận biết ion Cl⁻ kinh điển.',
    emit:'precip', liquidColor:'#f8fafc', precipColor:'#ffffff' },
  { a:'CuSO4', b:'NaOH', cat:'kt',
    eq:'CuSO₄ + 2NaOH → Cu(OH)₂↓ + Na₂SO₄',
    phen:'Kết tủa xanh lam Cu(OH)₂ rất rõ.',
    expl:'Cu(OH)₂ là kết tủa xanh lam đặc trưng — phản ứng nhận biết ion Cu²⁺.',
    emit:'precip', liquidColor:'#3b82f6', precipColor:'#1d4ed8' },
  { a:'BaCl2', b:'H2SO4', cat:'kt',
    eq:'BaCl₂ + H₂SO₄ → BaSO₄↓ + 2HCl',
    phen:'Kết tủa trắng BaSO₄ rất bền, không tan trong axit.',
    expl:'BaSO₄ là kết tủa trắng bền nhất — dùng nhận biết ion SO₄²⁻.',
    emit:'precip', liquidColor:'#f1f5f9', precipColor:'#ffffff' },
  { a:'BaCl2', b:'Na2CO3', cat:'kt',
    eq:'BaCl₂ + Na₂CO₃ → BaCO₃↓ + 2NaCl',
    phen:'Kết tủa trắng BaCO₃ mịn.',
    expl:'BaCO₃ không tan trong nước nhưng tan trong axit mạnh.',
    emit:'precip', liquidColor:'#f1f5f9', precipColor:'#ffffff' },
  { a:'BaCl2', b:'AgNO3', cat:'kt',
    eq:'BaCl₂ + 2AgNO₃ → 2AgCl↓ + Ba(NO₃)₂',
    phen:'Kết tủa trắng AgCl bám đầy ống.',
    expl:'Ion Ag⁺ gặp Cl⁻ tạo AgCl trắng, Ba(NO₃)₂ tan giữ trong dd.',
    emit:'precip', liquidColor:'#f8fafc', precipColor:'#ffffff' },
  { a:'CuSO4', b:'BaCl2', cat:'kt',
    eq:'CuSO₄ + BaCl₂ → BaSO₄↓ + CuCl₂',
    phen:'Kết tủa trắng BaSO₄, dd vẫn xanh nhạt (CuCl₂).',
    expl:'Ba²⁺ "khoá" SO₄²⁻ thành BaSO₄ — đồng vẫn còn trong dd nhưng ở dạng CuCl₂.',
    emit:'precip', liquidColor:'#7dd3fc', precipColor:'#ffffff' },
  { a:'CuSO4', b:'Na2CO3', cat:'kt',
    eq:'CuSO₄ + Na₂CO₃ → CuCO₃↓ + Na₂SO₄',
    phen:'Kết tủa xanh lục CuCO₃.',
    expl:'CuCO₃ có màu xanh lục/lam đặc trưng, không tan trong nước.',
    emit:'precip', liquidColor:'#86efac', precipColor:'#0d9488' },
  { a:'AgNO3', b:'Na2CO3', cat:'kt',
    eq:'2AgNO₃ + Na₂CO₃ → Ag₂CO₃↓ + 2NaNO₃',
    phen:'Kết tủa vàng nhạt Ag₂CO₃.',
    expl:'Bạc cacbonat có màu vàng nhạt, không tan trong nước.',
    emit:'precip', liquidColor:'#fef9c3', precipColor:'#fde047' },
  { a:'AgNO3', b:'NaOH', cat:'kt',
    eq:'2AgNO₃ + 2NaOH → Ag₂O↓ + 2NaNO₃ + H₂O',
    phen:'Kết tủa nâu đen Ag₂O.',
    expl:'AgOH không bền, ngay lập tức phân huỷ thành Ag₂O màu nâu đen.',
    emit:'precip', liquidColor:'#fef3c7', precipColor:'#451a03' },
  { a:'HCl', b:'AgNO3', cat:'kt',
    eq:'HCl + AgNO₃ → AgCl↓ + HNO₃',
    phen:'Kết tủa trắng AgCl tức thì.',
    expl:'Axit clohiđric + bạc nitrat → kết tủa AgCl + axit nitric.',
    emit:'precip', liquidColor:'#f8fafc', precipColor:'#ffffff' },

  // ── Sinh khí ──
  { a:'Zn', b:'HCl', cat:'kh',
    eq:'Zn + 2HCl → ZnCl₂ + H₂↑',
    phen:'Sủi bọt khí H₂, kẽm tan dần.',
    expl:'Zn đứng trước H trong dãy hoạt động → đẩy H ra khỏi axit.',
    emit:'gas', liquidColor:'#fef9c3' },
  { a:'Fe', b:'HCl', cat:'kh',
    eq:'Fe + 2HCl → FeCl₂ + H₂↑',
    phen:'Sủi bọt H₂, sắt tan dần, dd có màu xanh lục nhạt.',
    expl:'Fe + axit loãng → muối Fe(II) + khí H₂.',
    emit:'gas', liquidColor:'#bbf7d0' },
  { a:'Fe', b:'H2SO4', cat:'kh',
    eq:'Fe + H₂SO₄ → FeSO₄ + H₂↑',
    phen:'Sủi bọt H₂, sắt tan, dd xanh lục nhạt.',
    expl:'Tương tự HCl: Fe + axit loãng → muối Fe(II) + H₂.',
    emit:'gas', liquidColor:'#d1fae5' },
  { a:'Zn', b:'H2SO4', cat:'kh',
    eq:'Zn + H₂SO₄ → ZnSO₄ + H₂↑',
    phen:'Sủi bọt H₂ rất mạnh, kẽm tan nhanh.',
    expl:'Zn hoạt động mạnh hơn Fe → phản ứng nhanh hơn rõ rệt.',
    emit:'gas', liquidColor:'#fef9c3' },
  { a:'HCl', b:'Na2CO3', cat:'kh',
    eq:'Na₂CO₃ + 2HCl → 2NaCl + H₂O + CO₂↑',
    phen:'Sủi bọt khí CO₂ ào ạt.',
    expl:'Axit mạnh đẩy CO₂ ra khỏi muối cacbonat.',
    emit:'gas', liquidColor:'#fef3c7' },
  { a:'H2SO4', b:'Na2CO3', cat:'kh',
    eq:'Na₂CO₃ + H₂SO₄ → Na₂SO₄ + H₂O + CO₂↑',
    phen:'Sủi bọt CO₂ rất mạnh.',
    expl:'H₂SO₄ là axit mạnh, đẩy CO₂ ra khỏi muối cacbonat.',
    emit:'gas', liquidColor:'#fef3c7' },

  // ── Thế kim loại (đổi màu) ──
  { a:'Fe', b:'CuSO4', cat:'dm',
    eq:'Fe + CuSO₄ → FeSO₄ + Cu',
    phen:'Đinh sắt phủ lớp đồng đỏ, dd xanh nhạt dần (FeSO₄).',
    expl:'Fe mạnh hơn Cu trong dãy hoạt động → đẩy Cu ra (phản ứng thế).',
    emit:'precip', liquidColor:'#86efac', precipColor:'#b45309' },
  { a:'Zn', b:'CuSO4', cat:'dm',
    eq:'Zn + CuSO₄ → ZnSO₄ + Cu',
    phen:'Lớp đồng đỏ bám trên kẽm, dd nhạt dần.',
    expl:'Zn mạnh hơn Cu → đẩy Cu ra. ZnSO₄ không màu.',
    emit:'precip', liquidColor:'#bae6fd', precipColor:'#b45309' },
  { a:'Fe', b:'AgNO3', cat:'dm',
    eq:'Fe + 2AgNO₃ → Fe(NO₃)₂ + 2Ag',
    phen:'Bạc kim loại bám trên sắt — ánh xám trắng.',
    expl:'Fe đẩy Ag (yếu hơn) ra khỏi muối → bạc tự do bám lên.',
    emit:'precip', liquidColor:'#bbf7d0', precipColor:'#cbd5e1' },
  { a:'Zn', b:'AgNO3', cat:'dm',
    eq:'Zn + 2AgNO₃ → Zn(NO₃)₂ + 2Ag',
    phen:'Bạc bám lấp lánh trên kẽm.',
    expl:'Zn đẩy Ag ra — tạo bạc kim loại sáng bóng.',
    emit:'precip', liquidColor:'#f1f5f9', precipColor:'#cbd5e1' },

  // ── Không phản ứng (giáo dục) ──
  { a:'CuSO4', b:'HCl', cat:'nx',
    eq:'CuSO₄ + HCl → (không phản ứng)',
    phen:'Không có hiện tượng, dd vẫn xanh lam.',
    expl:'CuCl₂ và H₂SO₄ đều tan, không tạo kết tủa/khí → không xảy ra.',
    emit:null, liquidColor:'#bfdbfe' },
  { a:'HCl', b:'H2SO4', cat:'nx',
    eq:'HCl + H₂SO₄ → (không phản ứng)',
    phen:'Hai axit mạnh cùng tồn tại, không hiện tượng.',
    expl:'Hai axit không phản ứng với nhau trong dd loãng.',
    emit:null, liquidColor:'#fef3c7' },
  { a:'NaOH', b:'Na2CO3', cat:'nx',
    eq:'NaOH + Na₂CO₃ → (không phản ứng)',
    phen:'Hỗn hợp đồng nhất, không màu, không bọt khí.',
    expl:'Cả hai cùng cation Na⁺, không có sản phẩm kết tủa/khí.',
    emit:null, liquidColor:'#dbeafe' },
  { a:'Fe', b:'NaCl', cat:'nx',
    eq:'Fe + NaCl → (không phản ứng)',
    phen:'Sắt vẫn nguyên, dd không đổi màu.',
    expl:'Na mạnh hơn Fe → Fe không đẩy được Na ra khỏi muối.',
    emit:null, liquidColor:'#f1f5f9' },
  { a:'Zn', b:'NaCl', cat:'nx',
    eq:'Zn + NaCl → (không phản ứng)',
    phen:'Kẽm không tan, dd không đổi.',
    expl:'Na mạnh hơn Zn → Zn không đẩy được Na ra khỏi muối.',
    emit:null, liquidColor:'#f1f5f9' },
  { a:'Fe', b:'NaOH', cat:'nx',
    eq:'Fe + NaOH → (không phản ứng ở điều kiện thường)',
    phen:'Sắt nguyên vẹn, không hiện tượng.',
    expl:'Fe không phải kim loại lưỡng tính → không tan trong dd kiềm.',
    emit:null, liquidColor:'#dbeafe' },
  { a:'BaCl2', b:'NaOH', cat:'nx',
    eq:'BaCl₂ + NaOH → (không phản ứng)',
    phen:'Dd trong suốt, không kết tủa.',
    expl:'Ba(OH)₂ tan tốt trong nước → không tạo kết tủa.',
    emit:null, liquidColor:'#dbeafe' },
  { a:'NaCl', b:'Na2CO3', cat:'nx',
    eq:'NaCl + Na₂CO₃ → (không phản ứng)',
    phen:'Hỗn hợp muối tan, không hiện tượng.',
    expl:'Cả hai là muối của Na, không có sản phẩm mới.',
    emit:null, liquidColor:'#f1f5f9' },
  { a:'NaCl', b:'NaOH', cat:'nx',
    eq:'NaCl + NaOH → (không phản ứng)',
    phen:'Hỗn hợp dd trong suốt.',
    expl:'Cùng cation Na⁺, không có driving force để phản ứng.',
    emit:null, liquidColor:'#dbeafe' },
  { a:'NaCl', b:'H2SO4', cat:'nx',
    eq:'NaCl + H₂SO₄ (loãng) → (không đáng kể)',
    phen:'Không có hiện tượng rõ ràng.',
    expl:'Chỉ ở H₂SO₄ đặc, nóng mới giải phóng HCl khí — không xét ở đây.',
    emit:null, liquidColor:'#fef3c7' },
  { a:'NaCl', b:'BaCl2', cat:'nx',
    eq:'NaCl + BaCl₂ → (không phản ứng)',
    phen:'Cả hai cùng có Cl⁻, không tạo sản phẩm mới.',
    expl:'Trao đổi ion không tạo kết tủa/khí → không xảy ra.',
    emit:null, liquidColor:'#f1f5f9' },
  { a:'Fe', b:'Zn', cat:'nx',
    eq:'Fe + Zn → (không phản ứng)',
    phen:'Hai kim loại đứng cạnh nhau, không hiện tượng.',
    expl:'Hai kim loại rắn không tự phản ứng với nhau ở điều kiện thường.',
    emit:null, liquidColor:'#f1f5f9' },
];

const RXN = new Map();
for (const r of REACTIONS) RXN.set(pairKey(r.a, r.b), r);

const TOTAL_REAL = REACTIONS.filter(r => r.cat !== 'nx').length;  // phản ứng thật
const TOTAL_ALL = REACTIONS.length;                                // gồm cả no-react

// ── ACHIEVEMENTS ─────────────────────────────────────────────
const ACHIEVEMENTS = [
  { id:'detective', icon:'🔍', name:'Thám tử', desc:'Khám phá 5 phản ứng',
    check:(d) => countCat(d, ['kt','kh','dm','nh']) >= 5 },
  { id:'precip_master', icon:'⚪', name:'Vua kết tủa', desc:'Khám phá toàn bộ kết tủa',
    check:(d) => countCat(d, ['kt']) >= REACTIONS.filter(r=>r.cat==='kt').length },
  { id:'gas_master', icon:'💨', name:'Bậc thầy khí thể', desc:'Khám phá toàn bộ sinh khí',
    check:(d) => countCat(d, ['kh']) >= REACTIONS.filter(r=>r.cat==='kh').length },
  { id:'neutral_king', icon:'🔥', name:'Hoàng đế trung hoà', desc:'Khám phá toàn bộ trung hoà',
    check:(d) => countCat(d, ['nh']) >= REACTIONS.filter(r=>r.cat==='nh').length },
  { id:'perfect', icon:'🏆', name:'Hoàn hảo', desc:`Khám phá ${TOTAL_REAL} phản ứng thật`,
    check:(d) => countCat(d, ['kt','kh','dm','nh']) >= TOTAL_REAL },
];
function countCat(disc, cats) {
  let n = 0;
  for (const r of REACTIONS) if (disc.has(pairKey(r.a, r.b)) && cats.includes(r.cat)) n++;
  return n;
}

// ── CHALLENGE (rotates hourly) ───────────────────────────────
const CHALLENGES = [
  { id:'find-white-precip', text:'Tìm 1 cặp tạo <b>kết tủa trắng</b>',
    check:(rxn) => rxn.cat === 'kt' && (rxn.precipColor === '#ffffff') },
  { id:'find-gas-co2', text:'Tìm 1 cặp giải phóng <b>khí CO₂</b>',
    check:(rxn) => rxn.cat === 'kh' && rxn.eq.includes('CO₂') },
  { id:'find-gas-h2', text:'Tìm 1 cặp giải phóng <b>khí H₂</b>',
    check:(rxn) => rxn.cat === 'kh' && rxn.eq.includes('H₂↑') },
  { id:'find-displace', text:'Tìm 1 cặp <b>thế kim loại</b> (đổi màu)',
    check:(rxn) => rxn.cat === 'dm' },
  { id:'find-cu-precip', text:'Tìm 1 cặp tạo <b>kết tủa xanh</b> chứa đồng',
    check:(rxn) => rxn.cat === 'kt' && (rxn.eq.includes('Cu(OH)₂') || rxn.eq.includes('CuCO₃')) },
  { id:'find-neutral', text:'Tìm 1 phản ứng <b>trung hoà</b>',
    check:(rxn) => rxn.cat === 'nh' },
  { id:'find-noreact', text:'Tìm 1 cặp <b>không phản ứng</b>',
    check:(rxn) => rxn.cat === 'nx' },
];

// ── STATE ─────────────────────────────────────────────────────
const STORAGE_KEY = 'lab-hoa.discovered';
const XP_KEY = 'lab-hoa.xp';
const BADGE_KEY = 'lab-hoa.badges';
const CHALLENGE_KEY = 'lab-hoa.challenge';
let discovered = new Set();
let badges = new Set();
let xp = 0;
let prediction = null;
let predictOn = false;
try { discovered = new Set(JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')); } catch {}
try { xp = Number(localStorage.getItem(XP_KEY) || 0); } catch {}
try { badges = new Set(JSON.parse(localStorage.getItem(BADGE_KEY) || '[]')); } catch {}

// Daily challenge — deterministic per day so refresh không reset
function todayChallenge() {
  const d = new Date();
  const seed = d.getFullYear() * 1000 + (d.getMonth()+1) * 50 + d.getDate();
  return CHALLENGES[seed % CHALLENGES.length];
}
function challengeKey() {
  const d = new Date();
  return `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`;
}
function isChallengeDone() {
  try {
    const v = JSON.parse(localStorage.getItem(CHALLENGE_KEY) || '{}');
    return v.day === challengeKey() && v.done;
  } catch { return false; }
}
function markChallengeDone() {
  try { localStorage.setItem(CHALLENGE_KEY, JSON.stringify({ day: challengeKey(), done: true })); } catch {}
}

// ── Render kệ ─────────────────────────────────────────────────
const bottlesEl = $('#bottles');
function bottleSvg(edge, color) {
  return `<svg viewBox="0 0 40 50">
    <rect x="14" y="2" width="12" height="6" rx="1.5" fill="${edge}" />
    <path d="M10 12 L10 44 Q10 48 14 48 L26 48 Q30 48 30 44 L30 12 Z"
          fill="${color}" stroke="${edge}" stroke-width="1.6"/>
    <path d="M12 24 L28 24 L28 44 Q28 46 26 46 L14 46 Q12 46 12 44 Z"
          fill="${color}" opacity=".7"/>
  </svg>`;
}
function chemIsUsed(id) {
  for (const k of discovered) {
    const [x, y] = k.split('+');
    if (x === id || y === id) return true;
  }
  return false;
}
function renderShelf() {
  bottlesEl.innerHTML = '';
  for (const [id, c] of Object.entries(CHEMS)) {
    const div = document.createElement('div');
    div.className = 'bottle' + (chemIsUsed(id) ? ' used' : '');
    div.draggable = true;
    div.dataset.chem = id;
    div.innerHTML = `${bottleSvg(c.edge, c.color)}<div class="nm">${c.name}</div><div class="lbl">${c.label}</div>`;
    div.addEventListener('dragstart', (e) => {
      e.dataTransfer.setData('text/chem', id);
      div.classList.add('dragging');
    });
    div.addEventListener('dragend', () => div.classList.remove('dragging'));
    div.addEventListener('click', () => placeChemFirstEmpty(id));
    bottlesEl.appendChild(div);
  }
}
renderShelf();

// ── Slot mixers ───────────────────────────────────────────────
const slots = [null, null];
const slotEls = [$('#slot-1'), $('#slot-2')];

slotEls.forEach((el, idx) => {
  el.addEventListener('dragover', (e) => { e.preventDefault(); el.classList.add('over'); });
  el.addEventListener('dragleave', () => el.classList.remove('over'));
  el.addEventListener('drop', (e) => {
    e.preventDefault();
    el.classList.remove('over');
    const id = e.dataTransfer.getData('text/chem');
    if (id) placeChem(idx, id);
  });
  el.addEventListener('click', () => {
    if (slots[idx]) { slots[idx] = null; renderSlot(idx); updateReactBtn(); }
  });
});

function placeChem(idx, id) {
  if (!CHEMS[id]) return;
  slots[idx] = id;
  renderSlot(idx);
  updateReactBtn();
}
function placeChemFirstEmpty(id) {
  const idx = slots[0] ? (slots[1] ? -1 : 1) : 0;
  if (idx < 0) { toast('Ống đã đủ 2 lọ — bấm Pha trộn hoặc Rửa ống nhé.', 'bad'); return; }
  placeChem(idx, id);
}
function renderSlot(idx) {
  const el = slotEls[idx];
  const id = slots[idx];
  if (!id) {
    el.classList.remove('filled');
    el.innerHTML = `Lọ ${idx+1}<br/><span style="font-size:18px">＋</span>`;
    return;
  }
  const c = CHEMS[id];
  el.classList.add('filled');
  el.innerHTML = `${bottleSvg(c.edge, c.color)}<div class="nm">${c.name}</div>`;
}
function updateReactBtn() {
  $('#btn-react').disabled = !(slots[0] && slots[1]);
}

// Tube cũng nhận drop trực tiếp
const tubeEl = $('#tube');
['#tube', '.tube-area'].forEach(sel => {
  const el = document.querySelector(sel);
  el.addEventListener('dragover', (e) => { e.preventDefault(); tubeEl.classList.add('drop-target'); });
  el.addEventListener('dragleave', () => tubeEl.classList.remove('drop-target'));
  el.addEventListener('drop', (e) => {
    e.preventDefault();
    tubeEl.classList.remove('drop-target');
    const id = e.dataTransfer.getData('text/chem');
    if (id) placeChemFirstEmpty(id);
  });
});

// ── Phản ứng ──────────────────────────────────────────────────
$('#btn-react').addEventListener('click', react);
$('#btn-clear').addEventListener('click', clearTube);
$('#btn-hint').addEventListener('click', hint);

const liquidEl = $('#liquid');
const sedimentEl = $('#sediment');
let sedimentHeight = 0;

function clearTube() {
  slots[0] = null; slots[1] = null;
  renderSlot(0); renderSlot(1);
  updateReactBtn();
  liquidEl.style.color = 'transparent';
  liquidEl.classList.remove('fill', 'fill-full');
  sedimentEl.style.height = '0';
  sedimentEl.style.backgroundColor = 'transparent';
  sedimentHeight = 0;
  tubeEl.classList.remove('hot');
  tubeEl.querySelectorAll('.bubble, .precip').forEach(n => n.remove());
  // Reset prediction
  $$('.predict-btn').forEach(b => b.classList.remove('on'));
  prediction = null;
}

function react() {
  const [a, b] = slots;
  if (!a || !b) return;
  const key = pairKey(a, b);
  const rxn = RXN.get(key);

  if (!rxn) {
    // Cặp chưa định nghĩa trong dataset
    toast('🤔 Cặp này chưa có trong sổ tay — chưa thấy hiện tượng đáng kể.', 'warn');
    renderResult(a, b, {
      cat:'nx',
      eq:`${CHEMS[a].name} + ${CHEMS[b].name} → (không thấy hiện tượng)`,
      phen:'Không có dấu hiệu phản ứng quan sát được.',
      expl:'Cặp này không nằm trong bộ dữ liệu phản ứng phổ thông.',
    }, false);
    return;
  }

  // Visual
  liquidEl.style.color = rxn.liquidColor;
  liquidEl.classList.add('fill-full');
  setTimeout(() => emitEffects(rxn), 350);

  // Kết quả
  const isNew = !discovered.has(key);
  renderResult(a, b, rxn, isNew);

  // Discovery + XP
  let bonus = 0;
  if (prediction && rxn.cat === prediction) {
    bonus = 5;
    toast('🎯 Đoán đúng hiện tượng! +5 XP', 'good');
  } else if (prediction) {
    toast(`Đoán hơi sai — hiện tượng thực tế: ${catLabel(rxn.cat)}`, 'warn');
  }
  prediction = null;
  $$('.predict-btn').forEach(b => b.classList.remove('on'));

  markDiscovered(key, rxn, isNew, bonus);
}

function emitEffects(rxn) {
  tubeEl.querySelectorAll('.bubble, .precip').forEach(n => n.remove());
  tubeEl.classList.remove('hot');

  if (rxn.emit === 'gas') {
    for (let i = 0; i < 10; i++) {
      setTimeout(() => {
        const b = document.createElement('div');
        b.className = 'bubble';
        const size = 6 + Math.random() * 8;
        b.style.width = size + 'px';
        b.style.height = size + 'px';
        b.style.left = (15 + Math.random() * 80) + 'px';
        b.style.setProperty('--dx', (Math.random() * 14 - 7) + 'px');
        tubeEl.appendChild(b);
        setTimeout(() => b.remove(), 1700);
      }, i * 150);
    }
  } else if (rxn.emit === 'precip') {
    // Particles falling
    for (let i = 0; i < 18; i++) {
      setTimeout(() => {
        const p = document.createElement('div');
        p.className = 'precip';
        p.style.left = (12 + Math.random() * 82) + 'px';
        p.style.background = rxn.precipColor || '#ffffff';
        tubeEl.appendChild(p);
        setTimeout(() => p.remove(), 1500);
      }, i * 80);
    }
    // Sediment accumulates
    setTimeout(() => {
      sedimentHeight = Math.min(40, sedimentHeight + 14);
      sedimentEl.style.backgroundColor = rxn.precipColor || '#ffffff';
      sedimentEl.style.height = sedimentHeight + 'px';
    }, 800);
  } else if (rxn.emit === 'heat') {
    tubeEl.classList.add('hot');
    const rect = tubeEl.getBoundingClientRect();
    for (let i = 0; i < 8; i++) {
      const s = document.createElement('div');
      s.className = 'sparkle';
      s.textContent = ['✨','🔥','💫'][i % 3];
      s.style.left = (rect.left + rect.width / 2 + (Math.random() * 90 - 45)) + 'px';
      s.style.top  = (rect.top + Math.random() * rect.height) + 'px';
      document.body.appendChild(s);
      setTimeout(() => s.remove(), 900);
    }
    setTimeout(() => tubeEl.classList.remove('hot'), 1500);
  }
}

function catLabel(cat) {
  return ({kt:'↓ Kết tủa', kh:'↑ Khí', dm:'🎨 Đổi màu', nh:'🔥 Trung hoà', nx:'— Không phản ứng'})[cat] || cat;
}
function renderResult(a, b, rxn, isNew) {
  const tagsHtml = `<span class="tag ${rxn.cat}">${catLabel(rxn.cat)}</span>`
                 + (isNew ? `<span class="tag new">🆕 Mới!</span>` : '');
  $('#result-body').innerHTML = `
    <div class="eq">${rxn.eq}</div>
    <div class="phen">${tagsHtml}<br/><b>Hiện tượng:</b> ${rxn.phen}</div>
    <div class="expl"><b>Giải thích:</b> ${rxn.expl}</div>
  `;
}

// ── Discovery + XP + Badges ───────────────────────────────────
function markDiscovered(key, rxn, isNew, bonus) {
  if (!isNew) {
    if (bonus) {
      xp += bonus; saveXp();
      syncWalletXp(bonus); refreshAll();
    } else {
      toast('🔁 Phản ứng đã biết — ôn lại vẫn tốt!', 'good');
    }
    checkChallenge(rxn);
    return;
  }

  discovered.add(key);
  const gain = 10 + bonus;
  xp += gain;
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify([...discovered])); } catch {}
  saveXp();
  syncWalletXp(gain);
  toast(`🎉 Khám phá mới! +${gain} XP`, 'good');
  checkBadges();
  checkChallenge(rxn);
  refreshAll();
}

function checkChallenge(rxn) {
  if (isChallengeDone()) return;
  const c = todayChallenge();
  if (c.check(rxn)) {
    markChallengeDone();
    xp += 20; saveXp();
    syncWalletXp(20);
    toast('🎯 Hoàn thành thử thách hôm nay! +20 XP', 'good');
    renderChallenge();
    refreshAll();
  }
}

function checkBadges() {
  for (const a of ACHIEVEMENTS) {
    if (!badges.has(a.id) && a.check(discovered)) {
      badges.add(a.id);
      xp += 30; saveXp();
      syncWalletXp(30);
      try { localStorage.setItem(BADGE_KEY, JSON.stringify([...badges])); } catch {}
      toast(`🏆 Huy hiệu mới: ${a.icon} ${a.name}! +30 XP`, 'good');
    }
  }
}

function saveXp() { try { localStorage.setItem(XP_KEY, String(xp)); } catch {} }

function syncWalletXp(gain) {
  if (!gain || !window.fetch) return;
  try {
    fetch('/api/wallet', { credentials: 'include' })
      .then(r => r.ok ? r.json() : null)
      .then(w => {
        if (!w) return;
        fetch('/api/wallet', {
          method: 'PUT', credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...w, xp: (w.xp || 0) + gain }),
        });
      })
      .catch(() => {});
  } catch {}
}

// ── Hint ─────────────────────────────────────────────────────
function hint() {
  // Tìm 1 phản ứng thật chưa khám phá → gợi ý 1 chất, đố chất còn lại
  const undisc = REACTIONS.filter(r => r.cat !== 'nx' && !discovered.has(pairKey(r.a, r.b)));
  if (!undisc.length) {
    toast('🎓 Em đã khám phá hết các phản ứng — đỉnh quá!', 'good');
    return;
  }
  const pick = undisc[Math.floor(Math.random() * undisc.length)];
  const which = Math.random() < .5 ? pick.a : pick.b;
  toast(`💡 Gợi ý: thử bắt đầu với ${CHEMS[which].name} — còn lại em đoán nhé!`, 'warn');
}

// ── Predict mode ─────────────────────────────────────────────
const predictBar = $('#predict');
$('#btn-predict-toggle').addEventListener('click', () => {
  predictOn = !predictOn;
  predictBar.classList.toggle('show', predictOn);
  $('#btn-predict-toggle').textContent = predictOn ? '🔮 Đoán ✓' : '🔮 Đoán';
  if (!predictOn) {
    prediction = null;
    $$('.predict-btn').forEach(b => b.classList.remove('on'));
  }
});
$$('.predict-btn').forEach(b => {
  b.addEventListener('click', () => {
    const v = b.dataset.pred;
    if (!v) { prediction = null; $$('.predict-btn').forEach(x => x.classList.remove('on')); return; }
    prediction = v;
    $$('.predict-btn').forEach(x => x.classList.remove('on'));
    b.classList.add('on');
  });
});

// ── Sổ tay modal ─────────────────────────────────────────────
const modalBg = $('#modal-bg');
$('#btn-book').addEventListener('click', openModal);
$('#modal-close').addEventListener('click', closeModal);
modalBg.addEventListener('click', (e) => { if (e.target === modalBg) closeModal(); });
$$('.modal-tab').forEach(t => {
  t.addEventListener('click', () => {
    $$('.modal-tab').forEach(x => x.classList.remove('on'));
    t.classList.add('on');
    renderBook(t.dataset.cat);
  });
});

function openModal() {
  modalBg.classList.add('show');
  renderBook('');
  $('#mh-stat').textContent = `${discovered.size} / ${TOTAL_ALL} đã khám phá`;
}
function closeModal() { modalBg.classList.remove('show'); }

function renderBook(cat) {
  const grid = $('#rxn-grid');
  const list = cat ? REACTIONS.filter(r => r.cat === cat) : REACTIONS;
  grid.innerHTML = list.map(r => {
    const k = pairKey(r.a, r.b);
    const got = discovered.has(k);
    if (!got) {
      return `<div class="rxn-card locked">
        <div class="rxn-tag tag ${r.cat}">${catLabel(r.cat)}</div>
        <div class="rxn-eq">${CHEMS[r.a].name} + ${CHEMS[r.b].name} → ???</div>
        <div class="rxn-phen">Chưa khám phá — hãy pha 2 lọ này!</div>
      </div>`;
    }
    return `<div class="rxn-card">
      <div class="rxn-tag tag ${r.cat}">${catLabel(r.cat)}</div>
      <div class="rxn-eq">${r.eq}</div>
      <div class="rxn-phen">${r.phen}</div>
    </div>`;
  }).join('') || '<p style="color:#64748b">Không có phản ứng nào trong nhóm này.</p>';
}

// ── Achievement render ───────────────────────────────────────
function renderBadges() {
  const el = $('#badges');
  el.innerHTML = ACHIEVEMENTS.map(a => `
    <div class="badge ${badges.has(a.id) ? 'got' : ''}" data-tip="${a.name} — ${a.desc}">
      ${a.icon}
    </div>
  `).join('');
}

// ── Challenge render ─────────────────────────────────────────
function renderChallenge() {
  const c = todayChallenge();
  const done = isChallengeDone();
  const el = $('#challenge');
  el.classList.toggle('done', done);
  $('#challenge-body').innerHTML = done
    ? `✅ Đã hoàn thành: ${c.text}<br/><small>Quay lại ngày mai để thử thử thách mới!</small>`
    : `${c.text}<br/><small>+20 XP khi hoàn thành</small>`;
}

// ── Refresh all UI ───────────────────────────────────────────
function refreshAll() {
  $('#st-disc').textContent = discovered.size;
  $('#st-total').textContent = TOTAL_ALL;
  $('#st-xp').textContent = xp;
  $('#st-badge').textContent = badges.size;
  const pct = Math.min(100, Math.round((discovered.size / TOTAL_ALL) * 100));
  $('#pg').style.width = pct + '%';
  $('#pg-text').textContent = `${discovered.size} / ${TOTAL_ALL} phản ứng đã khám phá`;
  renderBadges();
  renderShelf();
}

// ── Toast ─────────────────────────────────────────────────────
function toast(msg, kind) {
  const el = $('#toast');
  el.innerHTML = msg;
  el.className = 'toast show' + (kind ? ' ' + kind : '');
  clearTimeout(toast._t);
  toast._t = setTimeout(() => el.classList.remove('show'), 2400);
}

// ── Keyboard shortcuts ───────────────────────────────────────
document.addEventListener('keydown', (e) => {
  if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
  if (modalBg.classList.contains('show')) {
    if (e.key === 'Escape') closeModal();
    return;
  }
  if (e.key === 'r' || e.key === 'R') { if (!$('#btn-react').disabled) react(); }
  else if (e.key === 'c' || e.key === 'C') clearTube();
  else if (e.key === 's' || e.key === 'S') openModal();
});

// ── Init ─────────────────────────────────────────────────────
refreshAll();
renderChallenge();
})();
