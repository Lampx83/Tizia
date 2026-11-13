/* Nhà thuốc thực hành (tu-thuoc-mo-phong.html) — mã chính. Tách khỏi HTML 14/11/2026 để trình duyệt lưu đệm.
   Sửa file này / style.css / data.js thì đổi ?v= tương ứng trong tu-thuoc-mo-phong.html — không đổi thì
   người học giữ bản cũ tới 1 ngày (Cache-Control max-age=86400). */

/* ---------- parse CSV (quote-aware) ---------- */
function parseCSV(text){
  const rows=[]; let row=[], field='', inQ=false;
  for(let i=0;i<text.length;i++){
    const c=text[i];
    if(inQ){
      if(c==='"'){ if(text[i+1]==='"'){field+='"';i++;} else inQ=false; }
      else field+=c;
    }else{
      if(c==='"') inQ=true;
      else if(c===','){ row.push(field); field=''; }
      else if(c==='\n'){ row.push(field); rows.push(row); row=[]; field=''; }
      else if(c==='\r'){}
      else field+=c;
    }
  }
  if(field.length||row.length){ row.push(field); rows.push(row); }
  return rows;
}

const rows = parseCSV(CSV_DATA.trim());
const header = rows[0].map(h=>h.trim());
const allRecords = rows.slice(1).filter(r=>r[0]).map(r=>{
  const o={}; header.forEach((h,i)=> o[h]=(r[i]||'').trim());
  /* req #249 (phản hồi): tên hiển thị khắp trang = cột I "Tên thuốc chuẩn" (vd "Betaloc 50 H60v AstraZeneca"),
     không phải "Mẫu thuốc TH" (vd "Metoprolol vỉ"). Tên mẫu cũ giữ ở _gen làm KHOÁ (tiến độ đã lưu, ảnh, phân loại kê đơn). */
  o._gen = o['Tên hoạt chất'];
  if(o['Tên biệt dược']) o['Tên hoạt chất'] = o['Tên biệt dược'];
  return o;
});

/* req #161 (ThS Hương Lý) — tách hai tủ: THUỐC KÊ ĐƠN và THUỐC KHÔNG KÊ ĐƠN.
   Bấm tủ nào trên sơ đồ thì trang mở với ?tu=rx hoặc ?tu=otc và chỉ dựng các
   thuốc thuộc loại đó. Phân loại theo Thông tư 07/2017/TT-BYT (Danh mục thuốc
   không kê đơn): thuốc KHÔNG có trong danh mục, mọi thuốc tiêm/truyền và kháng
   sinh đường toàn thân đều là thuốc kê đơn. Khóa = "STT Buổi|Tên hoạt chất" (Aspirin
   bài giảm đau là OTC, Aspirin 81mg bài tim mạch là kê đơn). */
const OTC_NAMES = new Set(["Buổi 2|Xylomethazolin nhỏ mắt", "Buổi 4|Paracetamol vỉ", "Buổi 4|Pallas ống", "Buổi 4|Hapacol gói", "Buổi 4|Decolgen vỉ", "Buổi 4|Efferalgan viên đặt", "Buổi 4|Voltaren tuyp", "Buổi 4|Mofen hoặc Ibudor vỉ", "Buổi 4|Nurofen siro", "Buổi 4|Aspirin vỉ", "Buổi 4|Alaxan vỉ", "Buổi 4|Pharmaton vỉ", "Buổi 4|Uniferon B9 vỉ", "Buổi 4|Folacid vỉ", "Buổi 4|Vitamin B6 vỉ", "Buổi 4|Vitamin PP vỉ", "Buổi 4|Vitamin B2 lọ", "Buổi 4|Vitamin E vỉ", "Buổi 4|Vitamin B1-B6-B12 vỉ", "Buổi 4|Vitamin C vỉ", "Buổi 4|Vitamin C lọ", "Buổi 4|Vitamin B1 vỉ", "Buổi 5|Loratadin vỉ", "Buổi 5|Cetirizine vỉ", "Buổi 5|Clorpheniramin vỉ", "Buổi 5|Theralene vỉ", "Buổi 5|Theralene lọ siro", "Buổi 5|Promethazin tuyp", "Buổi 5|Halodimenal vỉ", "Buổi 5|Erolin lọ siro", "Buổi 5|Xyral vỉ", "Buổi 5|Acyclovir tuyp", "Buổi 7|Newchoice vỉ", "Buổi 7|Postinor vỉ", "Buổi 10|Nước uống Hye lyte lọ", "Buổi 10|Berberin lọ", "Buổi 10|Oresol gói cam", "Buổi 10|Oresol gói 27,9g", "Buổi 10|Edoper vỉ", "Buổi 10|Maloox vỉ", "Buổi 10|Yumangel gói", "Buổi 10|Phosphaslugel gói", "Buổi 10|Noigel gói", "Buổi 10|Gastrolpulgit gói", "Buổi 10|Bisacodyl vỉ", "Buổi 10|Biosubtyl gói", "Buổi 10|Sorbitol gói", "Buổi 11|Mekocitrin viêm ngậm", "Buổi 11|Acemuc gói", "Buổi 11|Acetyl stein vỉ", "Buổi 11|Bromhexin vỉ", "Buổi 11|Terpin – codein vỉ", "Buổi 12|Calcrem tuyp", "Buổi 12|Nystatin tuyp"]);
const TU_MODE = new URLSearchParams(location.search).get('tu') === 'otc' ? 'otc' : 'rx';
const TU_NAME = TU_MODE === 'otc' ? 'Tủ thuốc không kê đơn' : 'Tủ thuốc kê đơn';
const drugClass = rec => OTC_NAMES.has(rec['STT Buổi'] + '|' + (rec._gen || rec['Tên hoạt chất'])) ? 'otc' : 'rx';
// Thuốc phải kiểm soát đặc biệt — các nhóm theo Luật Dược / Thông tư 18/2026/TT-BYT; thuốc nào thuộc nhóm nào lấy từ cột KSĐB của danh mục
const M3_KIND = { narc:'Thuốc gây nghiện', psy:'Thuốc hướng thần', pre:'Thuốc tiền chất', combo:'Thuốc dạng phối hợp có chứa dược chất gây nghiện',
  toxic:'Thuốc độc', banned:'Thuốc thuộc danh mục chất bị cấm sử dụng trong một số ngành, lĩnh vực' };
function ksdbKind(r){
  const t = ((r && r['KSĐB']) || '').toLowerCase();
  if(!t || t === 'không') return null;
  if(/phối hợp/.test(t)) return 'combo'; if(/bị cấm/.test(t)) return 'banned'; if(/độc/.test(t)) return 'toxic';
  if(/hướng thần/.test(t)) return 'psy'; if(/tiền chất/.test(t)) return 'pre'; if(/gây nghiện/.test(t)) return 'narc';
  return null;
}
// req #235 (29/10): thuốc kiểm soát đặc biệt (cột KSĐB) KHÔNG nằm lẫn trong tủ theo nhóm dược lý nữa mà xếp vào
// tủ riêng có khoá ở trang tủ kê đơn, mỗi loại một ngăn — kể cả thuốc KSĐB không kê đơn (Terpin – codein).
const KS_ORDER = ['narc','psy','pre','combo','toxic','banned'];
const records = allRecords.filter(rec => ksdbKind(rec) ? TU_MODE === 'rx' : drugClass(rec) === TU_MODE);

/* group by "Nhóm dược lý" (pharmacology class, column D of the sheet)
   rather than by teaching session, preserving first-seen order */
/* golden-angle hue stepping (~137.5°) guarantees each new group's hue lands
   far around the color wheel from the ones before it, so neighbouring
   cabinets never end up as near-identical shades of blue/gray */
function hueForIndex(i){ return Math.round((i*137.508) % 360); }
function buoiSortKey(b){ return parseInt((b||'').replace(/\D/g,''),10) || 0; }
const sessions = [];
const byGroup = {};
// KSĐB xếp SAU mọi nhóm dược lý để số thứ tự (mã) các tủ cũ giữ nguyên.
const ksLast = r => ksdbKind(r) ? 1 + KS_ORDER.indexOf(ksdbKind(r)) : 0;
records.slice().sort((a,b)=> ksLast(a) - ksLast(b)).forEach(rec=>{
  const kind = ksdbKind(rec);
  const key = kind ? `🔒 ${M3_KIND[kind]} · ngăn tủ kiểm soát đặc biệt (có khoá)`
                   : ((rec['Nhóm dược lý']||'').trim() || rec['Tên Bài']);
  if(!byGroup[key]){
    byGroup[key] = { topic:key, items:[], buoiSet:new Set(), hue: hueForIndex(sessions.length), ks: !!kind };
    sessions.push(byGroup[key]);
  }
  byGroup[key].items.push(rec);
  if(rec['STT Buổi']) byGroup[key].buoiSet.add(rec['STT Buổi']);
});
sessions.forEach(s=>{ s.buoi = Array.from(s.buoiSet).sort((a,b)=>buoiSortKey(a)-buoiSortKey(b)).join(', '); });
let uid=0;

/* every item renders as the same "hộp thuốc" carton, 4 per shelf row.
   Every cabinet always has exactly 5 shelf rows (20 slots) so cabinets
   stay the same height; sessions with more than 20 drugs are split into
   several numbered cabinets filled in order (first 20, then the rest),
   and a cabinet's unused trailing shelf rows are simply left empty
   rather than padded with repeated stock. */
const COLS = 4;
const CAPACITY = 20; // 5 shelf rows x 4 columns
function cssId(s){ return s.normalize('NFD').replace(/[̀-ͯ]/g,'').replace(/[^a-zA-Z0-9]+/g,'-').replace(/^-+|-+$/g,''); }
const cabinets = [];
let groupIdx = 0;
sessions.forEach(s=>{
  groupIdx++;
  const chunks = [];
  for(let idx=0; idx<s.items.length; idx+=CAPACITY){
    chunks.push(s.items.slice(idx, idx+CAPACITY));
  }
  if(chunks.length===0) chunks.push([]);
  chunks.forEach((chunk,ci)=>{
    const id = 'tu-g'+groupIdx+'-'+cssId(s.topic)+(chunks.length>1?('-'+(ci+1)):'');
    const label = chunks.length>1 ? `${s.buoi} · Tủ ${ci+1}/${chunks.length}` : s.buoi;
    const part = chunks.length>1 ? `(Tủ ${ci+1}/${chunks.length})` : '';
    cabinets.push({ id, label, part, buoi:s.buoi, topic:s.topic, hue:s.hue, items:chunk, realCount:chunk.length, ks:s.ks });
    chunk.forEach(it=>{ it._cabinetId = id; it._cabinetLabel = label; });
  });
});

/* ---------- real photos: drop a file named "<slug>.jpg" (or .png) into
   the hop-thuoc/ folder, matching the drug's "Tên hoạt chất" ---------- */
const PHOTO_DIR = 'hop-thuoc/';
const PHOTO_EXTS = ['jpg','png','jpeg'];
/* slugs that actually have a real photo file in hop-thuoc/ — used to pick
   realistic "new delivery" items for the putaway drag-and-drop exercise */
const PHOTO_SLUGS = new Set([
  'metoprolol-vi','adrenalin-ong-tiem','atropin-sulfas-ong-tiem','dopegyt-vi',
  'amoxicillin-vi','paracetamol-vi','amoxicillin-875mg-clavulanic-acid-125mg',
  'berberin-lo','omeprazol-vi','nospa-vi','hapacol-goi','hydrasec-goi',
  'decolgen-vi','acemuc-goi','voltaren-tuyp','diclofenac-vi','alphachymochipsin',
  'dich-truyen-nacl-0-9','clorpheniramin-vi','enalapril-vi','atenolon-vi',
  'furosemid-vi','nifedipin-vi','betamethason-tuyp',
  // bổ sung đợt 2
  'penicillin-lo','cefuroxime-lo','cefalexin-vi','cefotaxime-lo','cefuroxime-vi',
  'cefixime-vi','tetracyclin-vi','tetracyclin-tuyp','doxycicllin-vi','haloperidol-vi',
  'lincomycin-vi','metronidazol-vi','levofloxacin-vi','ciprofloxacin-vi','trimeseptol-vi',
  'sulfaguanidin-vi','pantoprazol-vi','methophan-vi','meloxicam-hoac-mebilax-hoac-mobic-vi',
  'indomethacin-vi','alaxan-vi','folacid-vi','vitamin-pp-vi','vitamin-e-vi',
  'xylomethazolin-nho-mat','loratadin-vi','acyclovir-tuyp','telmisartan-vi','salbutamol-vi',
  'digoxin-vi','ery-child-goi-bot','phosphaslugel-goi','uniferon-b9-vi','vitamin-b6-vi'
]);
function slugify(name){
  return (name||'')
    .toLowerCase()
    .replace(/đ/g,'d')
    .normalize('NFD').replace(/[̀-ͯ]/g,'')
    .replace(/[^a-z0-9]+/g,'-')
    .replace(/^-+|-+$/g,'');
}
/* product photos are usually shot on a plain white/pale studio backdrop,
   which reads as ugly excess whitespace once boxed into a small shelf
   slot. Trim the near-white margin from the edges (in-browser, via
   canvas) so the box itself fills its slot — works for any future photo
   without needing it pre-cropped. */
function autoCropWhite(imgEl){
  const w = imgEl.naturalWidth, h = imgEl.naturalHeight;
  if(!w || !h) return;
  const src = document.createElement('canvas');
  src.width = w; src.height = h;
  const sctx = src.getContext('2d');
  sctx.drawImage(imgEl,0,0);
  let data;
  try{ data = sctx.getImageData(0,0,w,h).data; }
  catch(e){ return; } // local file:// canvases can be tainted — just skip cropping then
  const THRESH = 243;
  function rowIsWhite(y){
    for(let x=0;x<w;x+=2){ const i=(y*w+x)*4; if(data[i]<THRESH||data[i+1]<THRESH||data[i+2]<THRESH) return false; }
    return true;
  }
  function colIsWhite(x){
    for(let y=0;y<h;y+=2){ const i=(y*w+x)*4; if(data[i]<THRESH||data[i+1]<THRESH||data[i+2]<THRESH) return false; }
    return true;
  }
  let top=0, bottom=h-1, left=0, right=w-1;
  while(top<bottom && rowIsWhite(top)) top++;
  while(bottom>top && rowIsWhite(bottom)) bottom--;
  while(left<right && colIsWhite(left)) left++;
  while(right>left && colIsWhite(right)) right--;
  const pad = Math.round(Math.min(w,h)*0.015);
  top=Math.max(0,top-pad); left=Math.max(0,left-pad);
  bottom=Math.min(h-1,bottom+pad); right=Math.min(w-1,right+pad);
  const cw = right-left+1, ch = bottom-top+1;
  if(cw<=0 || ch<=0 || (cw===w && ch===h)) return; // nothing worth cropping
  const out = document.createElement('canvas');
  out.width = cw; out.height = ch;
  out.getContext('2d').drawImage(src,left,top,cw,ch,0,0,cw,ch);
  imgEl.src = out.toDataURL('image/jpeg',0.92);
}
function attachPhoto(imgEl, slug){
  let i=0;
  imgEl.addEventListener('load', ()=>{
    const btn = imgEl.closest('.med-item');
    btn.classList.add('has-photo');
    if(!imgEl.dataset.cropped){
      imgEl.dataset.cropped = '1';
      autoCropWhite(imgEl); // may reset src, which re-fires this same load handler once cropped
    }
  });
  imgEl.addEventListener('error', ()=>{
    i++;
    if(i<PHOTO_EXTS.length) imgEl.src = PHOTO_DIR+slug+'.'+PHOTO_EXTS[i];
    else imgEl.remove(); // no photo yet: drawn box underneath stays visible
  });
  imgEl.src = PHOTO_DIR+slug+'.'+PHOTO_EXTS[0];
}

/* the sheet has no real stock-on-hand count, so each drug gets a plausible
   illustrative quantity (most have just 1 box; some have a few) — that's
   what drives the qty badge and the interactive FEFO hover panel below */
function illustrativeQty(){
  // giữ tồn kho luôn DƯỚI 3 hộp để việc kiểm soát FEFO nhanh gọn
  const r = Math.random();
  if(r < 0.12) return 0; // hết hàng
  if(r < 0.60) return 1;
  return 2;              // tối đa 2 hộp
}
function applyStock(btn, qty){
  btn.dataset.qty = String(qty);
  if(qty===0){
    btn.classList.add('out-of-stock');
    btn._units = [];
    const badge = document.createElement('span');
    badge.className = 'qty-badge out-of-stock-badge';
    badge.textContent = 'Hết hàng';
    btn.appendChild(badge);
    return;
  }
  const badge = document.createElement('span');
  badge.className = 'qty-badge';
  badge.textContent = 'x'+qty;
  btn.appendChild(badge);
  btn._units = makeIllustrativeUnits(qty);
}

/* the sheet only records ONE expiry date per drug (often blank) — real
   per-box lot/expiry data doesn't exist. To let learners practice FEFO
   (First-Expired-First-Out: the soonest-to-expire box goes in front and
   gets dispensed first) we generate clearly-labelled illustrative
   lot numbers/expiry dates, one per physical box, sorted soonest-first. */
function makeIllustrativeUnits(count){
  const units = [];
  let monthsAhead = 5 + Math.floor(Math.random()*4);
  for(let i=0;i<count;i++){
    monthsAhead += 4 + Math.floor(Math.random()*4);
    const d = new Date();
    d.setMonth(d.getMonth()+monthsAhead);
    const lot = 'L' + String(20000+Math.floor(Math.random()*79999));
    units.push({ lot, expiry: d });
  }
  // shuffle: the shelf isn't guaranteed to already be in FEFO order —
  // that's exactly what the learner practices fixing
  for(let i=units.length-1;i>0;i--){
    const j = Math.floor(Math.random()*(i+1));
    [units[i],units[j]] = [units[j],units[i]];
  }
  return units;
}
function unitsInFefoOrder(units){
  return units.every((u,i)=> i===0 || units[i-1].expiry <= u.expiry);
}
function fmtDate(d){
  return String(d.getDate()).padStart(2,'0')+'/'+String(d.getMonth()+1).padStart(2,'0')+'/'+d.getFullYear();
}

/* ---------- render ---------- */
const cabinetsRow = document.getElementById('cabinetsRow');
const sceneEl = document.querySelector('.pharmacy-scene');
const cabinetColEl = document.querySelector('.cabinet-col');
const pharmacyScreenEl = document.getElementById('pharmacyScreen');
const statsBar = document.getElementById('statsBar');

const totalDrugs = records.length;
document.getElementById('tuTitle').textContent = TU_NAME.toUpperCase();
if(new URLSearchParams(location.search).has('tu')) document.title = TU_NAME + ' · Nhà thuốc thực hành';
{ const sw = document.getElementById('tuSwitch');
  sw.href = '?tu=' + (TU_MODE === 'otc' ? 'rx' : 'otc');
  sw.textContent = 'Sang ' + (TU_MODE === 'otc' ? 'tủ thuốc kê đơn' : 'tủ thuốc không kê đơn') + ' →'; }
statsBar.innerHTML = `
  <span class="chip">Tổng số thuốc: <b>${totalDrugs}</b></span>
  <span class="chip">Số tủ: <b>${cabinets.length}</b></span>
`;

/* dropdown = fastest way to reach a specific cabinet: one click, zero
   typing/scanning — faster than searching a drug name and picking it
   out of a result list just to jump to the cabinet that holds it */
const cabinetTabs = document.getElementById('cabinetTabs');

/* navigate to a cabinet by id (used by search results) — activates its
   tab so it becomes the single visible cabinet, even if it sits outside
   the current practice window */
function scrollToCabinet(id){
  const idx = cabinets.findIndex(c=>c.id===id);
  if(idx<0) return;
  showCabinet(idx);
  const glass = cabinets[idx]._tu && cabinets[idx]._tu.querySelector('.tu-glass');
  if(glass){ glass.classList.add('flash'); setTimeout(()=>glass.classList.remove('flash'), 900); }
}
function esc(s){ return (s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;'); }

/* each cabinet is tinted by its group's hue (same hue for every sub-cabinet
   of a split group) so a session broken into several cabinets still reads
   as one visual group, distinct from neighbouring groups on the shelf */
function cabinetPalette(hue){
  return {
    wood: `hsl(${hue},55%,20%)`,
    woodLight: `hsl(${hue},50%,31%)`,
    woodDark: `hsl(${hue},65%,11%)`,
    trim: `hsl(${hue},45%,91%)`,
  };
}

cabinets.forEach((cab,cabIdx)=>{
  const tu = document.createElement('div');
  tu.className = 'tu-thuoc';
  tu.id = cab.id;
  const pal = cabinetPalette(cab.hue);
  tu.style.setProperty('--wood', pal.wood);
  tu.style.setProperty('--wood-light', pal.woodLight);
  tu.style.setProperty('--wood-dark', pal.woodDark);
  tu.style.setProperty('--trim', pal.trim);

  tu.innerHTML = `
    <div class="tu-plaque" title="${esc(cab.topic)}">${esc(cab.topic)}</div>
    <div class="tu-cornice"></div>
    <div class="tu-frame">
      <div class="tu-glass"></div>
    </div>
    <div class="tu-base"></div>
  `;

  const glass = tu.querySelector('.tu-glass');

  /* always build all 5 shelf rows so every cabinet is the same height;
     rows/cells beyond this group's actual stock are simply left empty */
  const totalRows = CAPACITY / COLS;
  const rows = [];
  for(let r=0;r<totalRows;r++){
    const row = document.createElement('div');
    row.className = 'shelf-row';
    glass.appendChild(row);
    rows.push(row);
  }

  cab.items.forEach((it,i)=>{
    const row = rows[Math.floor(i/COLS)];
    const light = 90 - (i%3)*8;
    const dark = light-20;
    const btn = document.createElement('button');
    btn.className = 'med-item';
    btn.id = 'box'+(uid++);
    btn.style.setProperty('--c', `hsl(${cab.hue},55%,${light}%)`);
    btn.style.setProperty('--c2', `hsl(${cab.hue},55%,${dark}%)`);
    btn.innerHTML = `<span class="icon"><span class="shape-medbox">
        <span class="band"></span>
        <span class="label">${dnRec(it)}</span>
        <span class="barcode"></span>
      </span></span>${it['Link google drive']?'<span class="photo-dot"></span>':''}`;
    btn.dataset.search = (it['Tên hoạt chất']+' '+it['Tên biệt dược']+' '+it['STT Buổi']+' '+it['Tên Bài']+' '+cab.label).toLowerCase();
    btn.dataset.drug = it['Tên hoạt chất'];
    const img = document.createElement('img');
    img.className = 'real-photo';
    img.alt = '';
    img.loading = 'lazy';
    attachPhoto(img, slugify(it._gen||it['Tên hoạt chất']));
    btn.querySelector('.icon').appendChild(img);
    { const q1 = m1CabQty(it['Tên hoạt chất']); applyStock(btn, q1 != null ? q1 : illustrativeQty()); }
    it._btn = btn;
    it._cabIdx = cabIdx;
    btn.addEventListener('click', e=> {
      e.stopPropagation();
      cancelHideTooltip();
      if(tooltip.classList.contains('show') && tooltip._btn === btn){ hideTooltip(); return; }
      showTooltip(e, it, cab, btn);
    });
    row.appendChild(btn);
  });

  cab._tu = tu;
  cabinetsRow.appendChild(tu);
});

/* ---------- delivery cart: putaway drag-and-drop exercise ----------
   picks 5 random items that have a real photo, shows them as a "new
   delivery", and asks the user to drag each one onto its own actual box
   on the shelf. correctness = dropped exactly on that same drug's
   existing .med-item (not just "somewhere in the right tủ"). */
const photoItems = cabinets.flatMap(cab=>cab.items).filter(it=>PHOTO_SLUGS.has(slugify(it._gen||it['Tên hoạt chất'])));
const cartItemsEl = document.getElementById('cartItems');   // the carton's single-box slot
const cartProgressEl = document.getElementById('cartProgress');
const cartMsgEl = document.getElementById('cartMsg');
const cartonBtn = document.getElementById('cartonBtn');
const cartonHint = document.getElementById('cartonHint');
let cartPlacedCount = 0, cartTotal = 0, cartFastClean = 0;
let cartMsgTimer = null;
/* the current "lô" (batch) dispenses one drug at a time: click the carton
   to pop the next drug out; only after it's correctly shelved does the next
   one come out. */
let deliveryQueue = [];      // items still inside the carton, waiting to pop out
let currentCartBox = null;   // the drug currently out of the carton (or null)
let pendingDispense = false;  // a FEFO fix is owed before the next drug pops
/* while set, a just-delivered box broke FEFO order on the shelf — no
   further deliveries may be placed until the learner fixes that box's
   order (via the ▲▼ controls in its hover panel) and it re-checks OK */
let fefoBlockedBtn = null;

/* ---------- gamified auto-progression ----------
   The learner no longer picks a level. They always start at the easiest
   tier and climb automatically by MASTERY, measured with a progress bar:
   placing a box in the right spot quickly pushes the bar UP; placing it
   slowly, or dropping it on the wrong box, pushes the bar DOWN. Fill the
   bar to 100% to unlock the next (harder) tier — more cabinets in play.

   Rewards:
   - ⭐ Sao: earned for a fast, first-try correct placement. 5-in-a-row = combo bonus.
   - 🛡️ Thẻ Khiên: 1 free shield for every 8 stars (and on each promotion / new title).
     A shield is spent automatically to CANCEL a would-be drop in the bar
     ("đổi thẻ để không bị lùi tiến độ").
   - 🎖️ Danh hiệu: honorary rank by total stars (Học viên → Bậc thầy Dược lý). */
const TIERS = [
  { name:'Siêu dễ',    cabinets:2  },
  { name:'Dễ',         cabinets:4  },
  { name:'Trung bình', cabinets:8  },
  { name:'Khó',        cabinets:12 },
  { name:'Rất khó',    cabinets:18 },
];
const TITLES = [
  { min:0,  name:'Học viên' },
  { min:5,  name:'Học viên khá' },
  { min:12, name:'Học viên xuất sắc' },
  { min:25, name:'Dược sĩ thực tập' },   // đạt mốc này được cấp 🔑 mở cửa nhà thuốc
  { min:45, name:'Chuyên gia dược lý' },
  { min:70, name:'Bậc thầy Dược lý' },
];
const KEY_TITLE = 'Dược sĩ thực tập';
const STARS_PER_SHIELD = 8;
// Namespaced để tránh đụng localStorage của app khác khi chạy chung origin (host AI Portal/Tizia).
// mỗi tủ (kê đơn / không kê đơn) lên hạng riêng vì số tủ và bộ thuốc khác nhau
const LS_GAME = 'tu-thuoc-mo-phong:game_v2' + (TU_MODE === 'otc' ? ':otc' : '');
const LS_MASTERY = 'tu-thuoc-mo-phong:drug_mastery';
function loadGame(){
  try{ const g=JSON.parse(localStorage.getItem(LS_GAME)); if(g && typeof g.tier==='number') return g; }catch(e){}
  return { tier:0, progress:0, stars:0, shields:0, combo:0, shieldsFromStars:0, plays:0 };
}
function saveGame(){ localStorage.setItem(LS_GAME, JSON.stringify(game)); }
function loadMastery(){ try{ return JSON.parse(localStorage.getItem(LS_MASTERY)) || {}; }catch(e){ return {}; } }
function saveMastery(m){ localStorage.setItem(LS_MASTERY, JSON.stringify(m)); }
/* req #174: cấp độ (số tủ hiện ra) phụ thuộc SỐ LẦN CHƠI — mỗi lần chơi = hoàn
   thành 1 lô hàng (xếp hết các thùng của lô) — KHÔNG còn phụ thuộc việc xếp
   đúng/nhanh bao nhiêu hộp. Cứ PLAYS_PER_TIER lần chơi thì lên 1 cấp. */
const PLAYS_PER_TIER = 2;
let game = loadGame();
if(typeof game.plays !== 'number') game.plays = game.tier * PLAYS_PER_TIER;   // giữ cấp người chơi đã đạt
let mastery = loadMastery();
/* req #174: khi đang KIỂM TỦ cho nhiệm vụ 1, số tủ hiện ra phải đủ để chứa các
   thuốc được yêu cầu dự trù (không được ẩn mất tủ có thuốc cần kiểm). */
function m1CabNeed(){
  try{
    let names = [];
    if(getM1State().step === 'checking') names = getM1Items().filter(it => it.cabinet === TU_MODE).map(it => it.name);
    const m3n = m3SortItemsFor(TU_MODE); if(m3n) names = names.concat(m3n);   // req #225: tủ phải hiện ra để sắp xếp
    let mx = 0;
    names.forEach(nm => {
      const i = cabinets.findIndex(c => c.items.some(r => r['Tên hoạt chất'] === nm || r._gen === nm));
      if(i >= 0 && !cabinets[i].ks && i + 1 > mx) mx = i + 1;   // tủ KSĐB luôn mở, không kéo rộng số tủ theo mức
    });
    return mx;
  }catch(e){ return 0; }
}
// Tủ kiểm soát đặc biệt (req #235) là tủ riêng cố định như tủ lạnh: luôn mở ở mọi mức, không tính vào số tủ theo mức.
function cabOpen(i){ return i < cartWindow || !!(cabinets[i] && cabinets[i].ks); }
function tierCabinets(){ return Math.min(Math.max(TIERS[game.tier].cabinets, m1CabNeed()), cabinets.length); }
let cartWindow = tierCabinets();
function drugSlugOf(it){ return slugify(it._gen||it['Tên hoạt chất']); }
function currentTitle(){ let t=TITLES[0]; for(const x of TITLES){ if(game.stars>=x.min) t=x; } return t; }

const gpTier = document.getElementById('gpTier');
const gpTitle = document.getElementById('gpTitle');
const gpBar = document.getElementById('gpBar');
const gpBarWrap = document.getElementById('gpBarWrap');
const gpBarLabel = document.getElementById('gpBarLabel');
const gpStars = document.getElementById('gpStars');
const gpShields = document.getElementById('gpShields');
/* on the mobile layout the tier/progress detail starts collapsed to an
   icon-only strip (stars/shields/lot) — tapping the panel (or its ℹ️
   toggle) reveals the full detail. No-op on desktop, where .gp-detail
   is always shown via CSS regardless of this class. */
const gamePanelEl = document.getElementById('gamePanel');
gamePanelEl.addEventListener('click', ()=> gamePanelEl.classList.toggle('gp-open'));
function renderGameUI(){
  const T = TIERS[game.tier];
  game.progress = game.tier >= TIERS.length-1 ? 100 : ((game.plays % PLAYS_PER_TIER) / PLAYS_PER_TIER) * 100;
  gpTier.textContent = `${T.name} · ${tierCabinets()} tủ`;
  gpTitle.textContent = '🎖️ ' + currentTitle().name;
  gpBar.style.width = Math.max(0, Math.min(100, game.progress)) + '%';
  gpBarLabel.textContent = Math.round(game.progress) + '%';
  gpStars.textContent = '⭐ ' + game.stars;
  gpShields.textContent = '🛡️ ' + game.shields;
}
function flashBar(kind){ gpBarWrap.classList.remove('gain','loss','shield'); void gpBarWrap.offsetWidth; gpBarWrap.classList.add(kind); setTimeout(()=>gpBarWrap.classList.remove(kind), 650); }
function popEl(el){ el.classList.remove('gp-pop'); void el.offsetWidth; el.classList.add('gp-pop'); setTimeout(()=>el.classList.remove('gp-pop'), 460); }
/* keep updateMasteryUI name working (called from pickDelivery) */
function updateMasteryUI(){ renderGameUI(); }

/* award stars, rolling out shields (every STARS_PER_SHIELD) and titles.
   returns a message fragment describing any bonus earned. */
function addStars(k){
  if(k<=0) return '';
  const beforeTitle = currentTitle().name;
  game.stars += k;
  popEl(gpStars);
  let extra = '';
  const earnedShields = Math.floor(game.stars / STARS_PER_SHIELD);
  if(earnedShields > (game.shieldsFromStars||0)){
    const gained = earnedShields - (game.shieldsFromStars||0);
    game.shields += gained; game.shieldsFromStars = earnedShields;
    extra += ` 🛡️ +${gained} thẻ Khiên`;
  }
  const afterTitle = currentTitle().name;
  if(afterTitle !== beforeTitle){
    game.shields += 2;
    extra += ` 🎖️ Phong danh hiệu: ${afterTitle}! (+2 🛡️)`;
    /* reaching "Dược sĩ thực tập" (25⭐) grants the key that unlocks the
       pharmacy door on the overview map */
    if(afterTitle === KEY_TITLE && typeof earnKey === 'function' && !hasKey){
      earnKey();
      extra += ` 🔑 Đủ trình Dược sĩ thực tập — nhận CHÌA KHÓA mở cửa nhà thuốc!`;
    }
  }
  return extra;
}

/* move the progress bar by delta%. Negative deltas are absorbed by a shield
   if one is available (bar stays put). Filling to 100% promotes a tier. */
function applyProgress(){ renderGameUI(); return { shielded:false, promoted:false }; }
/* ghi nhận 1 lần chơi (xong 1 lô) → có thể lên cấp. Trả về true nếu vừa lên cấp. */
function registerPlay(){
  game.plays = (game.plays || 0) + 1;
  const newTier = Math.min(TIERS.length-1, Math.floor(game.plays / PLAYS_PER_TIER));
  let promoted = false;
  if(newTier > game.tier){ game.tier = newTier; game.shields += 1; promoted = true; }
  cartWindow = tierCabinets();
  renderGameUI();
  return promoted;
}
/* weighted random sample without replacement — rarely-mastered drugs are
   far more likely to be picked than ones already nailed several times */
function weightedPick(items, n){
  const pool = items.map(it=>({ it, w: 1/(1+(mastery[drugSlugOf(it)]||0)) }));
  const picks = [];
  for(let k=0; k<n && pool.length; k++){
    const total = pool.reduce((s,p)=>s+p.w, 0);
    let r = Math.random()*total, idx = 0;
    for(; idx<pool.length-1; idx++){ r -= pool[idx].w; if(r<=0) break; }
    picks.push(pool[idx].it);
    pool.splice(idx,1);
  }
  return picks;
}

function showCartMsg(text, ok){
  cartMsgEl.textContent = text;
  cartMsgEl.className = 'cart-msg show ' + (ok?'ok':'bad');
  clearTimeout(cartMsgTimer);
  cartMsgTimer = setTimeout(()=>{ cartMsgEl.classList.remove('show'); }, 2400);
}

/* a new physical box just arrived on the shelf for this drug: bump stock
   by one unit. Placed at the FRONT (naive default) — since fresh stock
   usually expires later than what's already there, this is exactly the
   kind of naive putaway that breaks FEFO and gives the learner something
   real to fix, rather than silently landing in the right spot. */
function receiveNewStock(btn){
  if(btn.classList.contains('out-of-stock')){
    btn.classList.remove('out-of-stock');
    const oldBadge = btn.querySelector('.qty-badge');
    if(oldBadge) oldBadge.remove();
  }
  let monthsAhead = 8 + Math.floor(Math.random()*8);
  const d = new Date();
  d.setMonth(d.getMonth()+monthsAhead);
  const lot = 'L' + String(20000+Math.floor(Math.random()*79999));
  if(!btn._units) btn._units = [];
  // giữ tồn < 3 hộp: chỉ để lại tối đa 1 hộp cũ trước khi nhập hộp mới
  // (không sắp xếp lại — để người học vẫn tự kiểm soát FEFO giữa 2 hộp)
  while(btn._units.length >= 2) btn._units.pop();
  btn._units.unshift({ lot, expiry: d });
  btn.dataset.qty = String(btn._units.length);
  let badge = btn.querySelector('.qty-badge');
  if(!badge){
    badge = document.createElement('span');
    btn.appendChild(badge);
  }
  badge.className = 'qty-badge';
  badge.textContent = 'x'+btn._units.length;
}

/* ---------- single-cabinet view + tab navigation ----------
   only ONE cabinet is on screen at a time (as large as it can be); the
   rest are display:none. A tab bar lists exactly the cabinets in the
   current practice window; clicking a tab swaps in that cabinet. */
let activeCabIdx = 0;

function buildTabs(){
  const html = [];
  cabinets.forEach((cab,idx)=>{
    if(!cabOpen(idx)) return;
    const pal = cabinetPalette(cab.hue);
    html.push(
      `<button type="button" class="cab-tab" data-idx="${idx}" title="${esc(cab.topic)}${cab.part?(' '+esc(cab.part)):''} · gõ số ${idx+1} để nhảy nhanh" style="--wood:${pal.wood};--wood-dark:${pal.woodDark}">`+
        `<span class="ct-num">${idx+1}</span>`+
        `<span class="ct-topic">${esc(cab.topic)}${cab.part?(' '+esc(cab.part)):''}</span>`+
        `<span class="ct-dot"></span>`+
      `</button>`);
  });
  cabinetTabs.innerHTML = html.join('');
}

function showCabinet(idx){
  if(idx==null || idx<0 || idx>=cabinets.length) idx = 0;
  activeCabIdx = idx;
  cabinets.forEach((cab,i)=>{ if(cab._tu) cab._tu.style.display = (i===idx) ? '' : 'none'; });
  [...cabinetTabs.children].forEach(t=> t.classList.toggle('active', parseInt(t.dataset.idx,10)===idx));
  const at = cabinetTabs.querySelector('.cab-tab.active');
  if(at) at.scrollIntoView({behavior:'smooth', inline:'center', block:'nearest'});
  syncBoxSize();
}

/* rebuild the tab bar for the current window and keep a valid cabinet on
   screen (called on init, on level change, and when a level-up unlocks a
   new cabinet) */
function applyCabinetVisibility(){
  buildTabs();
  if(!cabOpen(activeCabIdx)) activeCabIdx = 0;
  showCabinet(activeCabIdx);
}

cabinetTabs.addEventListener('click', e=>{
  const t = e.target.closest('.cab-tab');
  if(t) showCabinet(parseInt(t.dataset.idx,10));
});

/* start a fresh lô of 5 drugs waiting inside the carton (nothing popped out
   yet — the learner clicks the carton to dispense the first one) */
function pickDelivery(){
  applyCabinetVisibility();
  const m3names = (typeof m3SortItemsFor === 'function') ? m3SortItemsFor(TU_MODE) : null;   // req #225: chỉ sắp xếp đúng các thuốc của nhiệm vụ 3
  if(m3names){
    deliveryQueue = photoItems.filter(it => (m3names.includes(it['Tên hoạt chất']) || m3names.includes(it._gen)));
    if(!deliveryQueue.length) deliveryQueue = weightedPick(photoItems, Math.min(5, photoItems.length));
  } else {
    let poolItems = photoItems.filter(it=> it._cabIdx < cartWindow);
    if(poolItems.length===0) poolItems = photoItems; // window too narrow to have any photographed drug — fall back rather than show an empty carton
    deliveryQueue = weightedPick(poolItems, Math.min(5, poolItems.length));
  }
  cartTotal = deliveryQueue.length; cartPlacedCount = 0; cartFastClean = 0;
  currentCartBox = null; pendingDispense = false;
  cartItemsEl.innerHTML = '';
  updateCartProgress();
  updateMasteryUI();
  updateCartonHint();
}

/* pop the next drug out of the carton as a draggable box */
function dispenseNext(){
  if(currentCartBox && !currentCartBox.classList.contains('placed')) return; // one already out
  if(!deliveryQueue.length){ currentCartBox = null; updateCartonHint(); return; }
  const it = deliveryQueue.shift();
  /* deliberately does NOT auto-switch to the target medicine's cabinet —
     part of the exercise is for the learner to work out which tủ a drug
     belongs to and navigate the tabs there themselves before dragging. */
  const box = document.createElement('div');
  box.className = 'cart-box';
  box.dataset.targetId = it._btn.id;
  box._it = it;
  box.innerHTML = `<img src="${PHOTO_DIR}${drugSlugOf(it)}.jpg" alt=""><span>${esc(it['Tên hoạt chất']||'')}</span>`;
  makeBoxDraggable(box);
  cartItemsEl.innerHTML = '';
  cartItemsEl.appendChild(box);
  currentCartBox = box;
  box._t0 = performance.now();   // start the speed clock for this box
  updateCartonHint();
}

function updateCartonHint(){
  const hasOut = currentCartBox && !currentCartBox.classList.contains('placed');
  if(hasOut){
    cartonHint.textContent = 'Kéo hộp vào tủ →';
    cartonBtn.classList.remove('ready'); cartonBtn.classList.add('waiting');
  } else if(pendingDispense){
    cartonHint.textContent = '⚠️ Sửa FEFO hộp vừa xếp';
    cartonBtn.classList.remove('ready'); cartonBtn.classList.add('waiting');
  } else if(deliveryQueue.length){
    cartonHint.textContent = `Bấm để lấy hộp (còn ${deliveryQueue.length})`;
    cartonBtn.classList.add('ready'); cartonBtn.classList.remove('waiting');
  } else {
    cartonHint.textContent = 'Hết lô — bấm để nhận lô mới';
    cartonBtn.classList.add('ready'); cartonBtn.classList.remove('waiting');
  }
}

cartonBtn.addEventListener('click', ()=>{
  if(currentCartBox && !currentCartBox.classList.contains('placed')){
    currentCartBox.classList.add('shake');
    setTimeout(()=>currentCartBox.classList.remove('shake'), 400);
    showCartMsg('Kéo hộp đang lấy ra vào tủ trước đã!', false);
    return;
  }
  if(pendingDispense){
    showCartMsg('⚠️ Sửa xong thứ tự FEFO của hộp vừa xếp thì hộp kế mới ra!', false);
    return;
  }
  if(!deliveryQueue.length){ pickDelivery(); }   // finished lô → start a new one
  dispenseNext();
});

function updateCartProgress(){
  cartProgressEl.textContent = `Lô ${cartPlacedCount}/${cartTotal}`;
}

document.getElementById('cartRefresh').addEventListener('click', pickDelivery);

function attemptDrop(cartBox, droppedOn){
  if(!cartBox || cartBox.classList.contains('placed')) return;
  const targetId = cartBox.dataset.targetId;

  if(fefoBlockedBtn){
    cartBox.classList.add('shake');
    setTimeout(()=>cartBox.classList.remove('shake'), 400);
    fefoBlockedBtn.classList.add('fefo-alert-pulse');
    setTimeout(()=>fefoBlockedBtn.classList.remove('fefo-alert-pulse'), 650);
    showCartMsg('📦 Hãy bấm vào hộp vừa nhập để kiểm tra & sắp xếp FEFO trước khi xếp hộp khác!', false);
    return;
  }

  if(droppedOn && droppedOn.id === targetId){
    const elapsed = (performance.now() - (cartBox._t0 || performance.now())) / 1000;
    const firstTry = cartBox.dataset.wrongAttempted !== '1';
    receiveNewStock(droppedOn);
    cartBox.classList.add('placed');
    cartBox.querySelector('span').textContent = '✓ Đã xếp';
    droppedOn.classList.add('delivery-hit');
    setTimeout(()=>droppedOn.classList.remove('delivery-hit'), 1300);
    cartPlacedCount++;
    updateCartProgress();

    /* spaced-repetition weighting: a clean first-try placement makes this
       drug rarer in future lots so practice focuses on the shaky ones */
    if(firstTry){ const slug = drugSlugOf(cartBox._it); mastery[slug] = (mastery[slug]||0)+1; saveMastery(mastery); }

    /* score the placement: speed + first-try decide the progress delta and
       whether a ⭐ is earned. Slow or fumbled placements push the bar down. */
    let delta, star=false, tag;
    if(!firstTry){ delta=-5; tag='❌ Có nhầm vị trí'; }
    else if(elapsed<=4){ delta=15; star=true; tag='⚡ Xuất sắc'; }
    else if(elapsed<=8){ delta=10; star=true; tag='✅ Nhanh'; }
    else if(elapsed<=14){ delta=4; tag='🙂 Đạt'; }
    else { delta=-7; tag='🐢 Hơi chậm'; }

    let bonus='';
    if(star){
      cartFastClean++;              // fast + first-try placement in this lô
      game.combo = (game.combo||0)+1;
      let earn = 1;
      if(game.combo % 5 === 0){ earn += 3; bonus += ` 🔥 Combo x${game.combo}! +3⭐`; }
      bonus += addStars(earn);
    } else {
      game.combo = 0;
    }

    const res = applyProgress();
    const deltaTxt = '';
    let promoMsg = '';
    /* xong cả lô = 1 lần chơi → đủ PLAYS_PER_TIER lần thì lên cấp (mở thêm tủ) */
    if(cartPlacedCount===cartTotal && typeof m3ModeDone === 'function'){ promoMsg = m3ModeDone(TU_MODE); }
    saveGame();

    const good = delta>=0 || res.shielded;
    if(!unitsInFefoOrder(droppedOn._units)){
      fefoBlockedBtn = droppedOn;
      pendingDispense = true;   // next drug won't pop out until FEFO is fixed
      droppedOn.classList.add('fefo-warning');
      updateCartonHint();
      showCartMsg(`${tag} ${deltaTxt}${bonus}${promoMsg} · 📦 Bấm vào hộp vừa xếp để kiểm tra & sắp xếp FEFO!`, good);
    } else if(cartPlacedCount<cartTotal){
      showCartMsg(`${tag} ${deltaTxt}${bonus}${promoMsg}`, good);
      setTimeout(dispenseNext, 600);
    } else {
      showCartMsg(`${tag} ${deltaTxt}${bonus}${promoMsg} · 🎉 Xong lô! Bấm thùng nhận lô mới.`, true);
      updateCartonHint();
    }
  } else if(droppedOn){
    cartBox.dataset.wrongAttempted = '1';
    cartBox.classList.add('shake');
    setTimeout(()=>cartBox.classList.remove('shake'), 400);
    showCartMsg('❌ Sai vị trí rồi, thử lại! (xếp sai sẽ bị lùi tiến độ)', false);
  }
  // dropped on empty space (no box underneath) → just let it settle back, no penalty
}

/* one pointerdown → pointermove → pointerup gesture drags the box. Pointer
   Events unify mouse, touch and pen, so this also works on phones/tablets —
   the old HTML5 drag-and-drop API this replaced never fires from a touch
   gesture on iOS/Android, which made the whole putaway exercise unusable
   on mobile. */
let dragOverTarget = null;
function makeBoxDraggable(box){
  box.addEventListener('pointerdown', e=>{
    if(box.classList.contains('placed')) return;
    if(e.pointerType==='mouse' && e.button!==0) return;
    e.preventDefault();
    hideTooltip();   // don't let an open detail panel cover the drop target
    const rect = box.getBoundingClientRect();
    const offX = e.clientX - rect.left, offY = e.clientY - rect.top;
    const startX = e.clientX, startY = e.clientY;
    const homeParent = box.parentNode, homeNext = box.nextSibling;
    let moved = false;
    box.classList.add('dragging');
    box.style.position = 'fixed';
    box.style.left = rect.left+'px';
    box.style.top = rect.top+'px';
    box.style.width = rect.width+'px';
    box.style.zIndex = 200;
    box.style.pointerEvents = 'none';   // so elementFromPoint sees what's underneath, not the box itself
    document.body.appendChild(box);

    function setHover(el){
      const over = el && el.closest ? el.closest('.med-item') : null;
      if(over === dragOverTarget) return;
      if(dragOverTarget) dragOverTarget.classList.remove('drop-target');
      dragOverTarget = over || null;
      if(dragOverTarget) dragOverTarget.classList.add('drop-target');
    }
    function onMove(ev){
      if(!moved && Math.abs(ev.clientX-startX)+Math.abs(ev.clientY-startY) > 6) moved = true;
      box.style.left = (ev.clientX - offX)+'px';
      box.style.top = (ev.clientY - offY)+'px';
      setHover(document.elementFromPoint(ev.clientX, ev.clientY));
    }
    function finish(ev, commit){
      document.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerup', onUp);
      document.removeEventListener('pointercancel', onCancel);
      setHover(null);
      const hitEl = commit ? document.elementFromPoint(ev.clientX, ev.clientY) : null;
      const target = hitEl && hitEl.closest ? hitEl.closest('.med-item') : null;
      box.style.pointerEvents = '';
      box.classList.remove('dragging');

      /* correct slot → leave the box exactly where the mouse released it
         (it stays "landed" on the shelf) instead of snapping back to the
         carton; remove it shortly after, once the shelf's own stock badge
         has taken over showing the new box. Any other outcome (miss /
         wrong shelf / cancelled) keeps the old behaviour: snap back to
         the carton slot first, then react there (shake, message). */
      const willLand = commit && moved && target && !fefoBlockedBtn && target.id === box.dataset.targetId;
      if(willLand){
        box.style.pointerEvents = 'none';
        attemptDrop(box, target);
        setTimeout(()=>box.remove(), 450);
      } else {
        box.style.position = ''; box.style.left = ''; box.style.top = ''; box.style.width = ''; box.style.zIndex = '';
        if(homeNext) homeParent.insertBefore(box, homeNext); else homeParent.appendChild(box);
        if(commit && moved) attemptDrop(box, target);
      }
    }
    function onUp(ev){ finish(ev, true); }
    function onCancel(ev){ finish(ev, false); }
    /* listen on document, not on box itself: box goes pointer-events:none
       right after this (so elementFromPoint can see what's underneath it),
       and relying on setPointerCapture to keep routing events to box
       regardless turned out to not hold up reliably under real mouse
       input once the box is reparented + made pointer-events:none —
       the drag would silently freeze mid-gesture. Document-level
       listeners have no such dependency. */
    document.addEventListener('pointermove', onMove);
    document.addEventListener('pointerup', onUp);
    document.addEventListener('pointercancel', onCancel);
  });
}

if(photoItems.length){ pickDelivery(); }
else { document.getElementById('deliveryCart').style.display = 'none'; applyCabinetVisibility(); }

/* size the single visible cabinet as large as it fits. The cabinet fills
   the scene height via flex (align-items:stretch), so we read the height
   the shelf rows settled on and derive the box width from it (box aspect
   is fixed 122:90). On a wide screen height is the binding dimension and
   the cabinet is centred horizontally in the scene. If the derived width
   would overflow a narrow scene, we fall back to a width-fit instead. */
function syncBoxSize(){
  const tu = cabinets[activeCabIdx] && cabinets[activeCabIdx]._tu;
  if(!tu || tu.style.display==='none') return;
  const row = tu.querySelector('.shelf-row');
  if(!row) return;
  /* measure the cabinet's own chrome live (frame/glass/row padding + the
     gaps between the 4 box columns) instead of a hardcoded constant, so
     tightening any of that padding for mobile is picked up automatically —
     no second constant to keep in sync with the CSS. */
  const frameCS = getComputedStyle(tu.querySelector('.tu-frame'));
  const glassCS = getComputedStyle(tu.querySelector('.tu-glass'));
  const rowCS = getComputedStyle(row);
  const chromeW = parseFloat(frameCS.paddingLeft) + parseFloat(frameCS.paddingRight)
                + parseFloat(glassCS.paddingLeft) + parseFloat(glassCS.paddingRight)
                + parseFloat(rowCS.paddingLeft) + parseFloat(rowCS.paddingRight)
                + parseFloat(rowCS.columnGap || rowCS.gap || '0') * (COLS - 1);
  const rowVPad = parseFloat(rowCS.paddingTop) + parseFloat(rowCS.paddingBottom);

  /* below the mobile breakpoint #pharmacyScreen switches to a stacked
     column layout (see CSS) where .cabinet-col is full-width instead of
     sharing a row with .side-panel — read that straight from the computed
     style so this stays in sync with the CSS breakpoint automatically. The
     cabinet must show all 5 rows without its own scrollbar, so the box size
     always has to satisfy BOTH the available height (rows still divide
     .tu-glass's real height via flex, read below) and the available width
     — only that width cap differs between the two layouts. */
  const stacked = getComputedStyle(pharmacyScreenEl).flexDirection === 'column';
  let availW;
  if(stacked){
    cabinetColEl.style.width = '';   // CSS gives it 100% width here — no circularity to guard against
    /* .cabinets-row already stretches to .pharmacy-scene's content width
       (flex column, default align-items:stretch), so its own clientWidth
       minus its own side padding is exactly the space .tu-thuoc gets —
       measured, not guessed, so shrinking either element's padding on
       mobile grows the boxes automatically with no risk of overflow. */
    const rowContainerCS = getComputedStyle(cabinetsRow);
    availW = cabinetsRow.clientWidth - parseFloat(rowContainerCS.paddingLeft) - parseFloat(rowContainerCS.paddingRight);
  } else {
    /* cap the cabinet width so it never eats more than ~58% of the viewport
       (the control panel keeps the rest); use the viewport for the cap, NOT
       the column's own width (which is JS-driven and would be circular). */
    availW = window.innerWidth * 0.68 - 34;
  }
  const rowH = row.getBoundingClientRect().height; // flex has already filled the height
  let boxH = rowH - rowVPad;
  if(boxH <= 0) return;
  let boxW = boxH * 122/90;
  let tuW = boxW*4 + chromeW;
  if(tuW > availW){                 // too tall/narrow a viewport: cap by width
    boxW = (availW - chromeW) / 4;
    tuW = availW;
  }
  if(boxW <= 0) return;
  /* whichever dimension ended up binding, re-derive the OTHER one from the
     fixed 122:90 carton aspect ratio — otherwise the width-capped branch
     above would leave boxH at its original (taller) value and every box
     would render squished toward square instead of its real carton shape. */
  boxH = boxW * 90/122;
  document.documentElement.style.setProperty('--box-w', boxW+'px');
  document.documentElement.style.setProperty('--box-h', boxH+'px');
  document.documentElement.style.setProperty('--tu-w', tuW+'px');
  /* give the whole cabinet column an explicit width that fits the cabinet
     (+ side-wall padding); the scene inside is width:100% of it. Setting an
     explicit width avoids a circular width:auto against the JS-driven cabinet.
     In stacked mode CSS already pins it to 100%, so leave it alone. */
  if(!stacked) cabinetColEl.style.width = (tuW + 34) + 'px';
}
/* the scene needs a settled layout before the shelf-row height is
   meaningful, so run sizing after layout — not only at parse time */
syncBoxSize();
requestAnimationFrame(()=>requestAnimationFrame(syncBoxSize));
window.addEventListener('load', syncBoxSize);
/* fonts/images can settle the row height a little late; re-sync a few times */
[60,180,400,800].forEach(ms=> setTimeout(syncBoxSize, ms));
/* and, most reliably, re-size whenever the cabinet column's own height
   changes (initial layout + any viewport change). Guard on height so the
   width changes syncBoxSize itself makes don't cause a feedback loop. */
if(window.ResizeObserver){
  let _lastColH = 0;
  const ro = new ResizeObserver(()=>{
    const h = cabinetColEl.clientHeight;
    if(Math.abs(h - _lastColH) > 1){ _lastColH = h; syncBoxSize(); }
  });
  ro.observe(cabinetColEl);
}
window.addEventListener('resize', ()=>{
  clearTimeout(window._boxResizeT);
  window._boxResizeT = setTimeout(syncBoxSize, 120);
});

/* ---------- hover tooltip / interactive FEFO panel ---------- */
const tooltip = document.getElementById('tooltip');
let hideTimer = null;
function cancelHideTooltip(){ if(hideTimer){ clearTimeout(hideTimer); hideTimer=null; } }
function scheduleHideTooltip(){ cancelHideTooltip(); hideTimer = setTimeout(hideTooltip, 220); }
// detail panel now opens on click (not hover); close it when clicking outside
document.addEventListener('click', e=>{
  if(!tooltip.classList.contains('show')) return;
  if(tooltip.contains(e.target)) return;
  if(e.target.closest && e.target.closest('.med-item')) return;
  hideTooltip();
});

function showTooltip(e, it, s, btn){
  tooltip._btn = btn; tooltip._it = it; tooltip._s = s;
  if(btn._units){
    tooltip.dataset.mode = 'interactive';
    tooltip.style.pointerEvents = 'auto';
    renderFefoPanel();
    positionNearBox(btn);
  } else {
    tooltip.dataset.mode = 'simple';
    tooltip.style.pointerEvents = 'none';
    const photo = btn.querySelector('.real-photo');
    const photoHTML = photo ? `<img class="t-photo" src="${photo.currentSrc||photo.src}" alt="">` : '';
    tooltip.innerHTML = `
      ${photoHTML}
      <div class="t-name">${it['Tên hoạt chất'] ? dnRec(it) : '(Chưa rõ tên)'}</div>
      ${it['Dạng bào chế']||it['Đường dùng'] ? `<div class="t-row">${esc(it['Dạng bào chế'])}${it['Đường dùng']?(' · '+esc(it['Đường dùng'])):''}</div>` : ''}
      <div class="t-row">${s.buoi} · ${esc(s.topic)}</div>
      ${it['Hạn sử dụng'] ? `<div class="t-row">HSD: ${esc(it['Hạn sử dụng'])}</div>` : ''}
      <div class="t-hint">Bấm để xem đầy đủ thông tin</div>
    `;
    moveTooltip(e);
  }
  tooltip.classList.add('show');
}

function moveTooltip(e){
  if(tooltip.dataset.mode==='interactive') return; // pinned near the box instead
  const pad = 16;
  let x = e.clientX + pad;
  let y = e.clientY + pad;
  const rect = tooltip.getBoundingClientRect();
  if(x + rect.width + 10 > window.innerWidth) x = e.clientX - rect.width - pad;
  if(y + rect.height + 10 > window.innerHeight) y = e.clientY - rect.height - pad;
  x = Math.max(8, Math.min(x, window.innerWidth - rect.width - 8));
  tooltip.style.left = x+'px';
  tooltip.style.top = y+'px';
}
function positionNearBox(btn){
  // position:fixed content lays out even while opacity:0, so this can be
  // measured synchronously — no off-screen flash needed before showing
  const r = btn.getBoundingClientRect();
  const tw = tooltip.offsetWidth, th = tooltip.offsetHeight;
  let x = r.right + 10;
  if(x + tw + 10 > window.innerWidth) x = r.left - tw - 10;
  // on a narrow phone the tooltip can be wider than the space on either
  // side of the box — fall back to clamping within the viewport instead
  x = Math.max(8, Math.min(x, window.innerWidth - tw - 8));
  let y = r.top - (th-r.height)/2;
  y = Math.max(10, Math.min(y, window.innerHeight - th - 10));
  tooltip.style.left = x+'px';
  tooltip.style.top = y+'px';
}
function hideTooltip(){
  tooltip.classList.remove('show');
  // an invisible interactive panel keeps pointer-events:auto and would still
  // sit over the shelf, silently swallowing drag-drops onto boxes underneath
  tooltip.style.pointerEvents = 'none';
}

/* -- interactive FEFO panel: reorder the boxes, check FEFO order, sell -- */
function fefoLabel(i,len){ return i===0?'Hộp ngoài':i===len-1?'Hộp trong cùng':`Hộp giữa ${i}`; }
function renderFefoPanel(){
  const btn = tooltip._btn, it = tooltip._it, s = tooltip._s;
  const units = btn._units;
  const photo = btn.querySelector('.real-photo');
  const photoHTML = photo ? `<img class="t-photo" src="${photo.currentSrc||photo.src}" alt="">` : '';

  if(!units || units.length===0){
    tooltip.innerHTML = `${photoHTML}<div class="t-name">${esc(it['Tên hoạt chất'])}</div><div class="t-row">📦 Hết hàng trên kệ</div>`;
    return;
  }
  const rows = units.map((u,i)=>`
    <div class="fefo-row" data-i="${i}">
      <span class="fefo-drag" title="Kéo để đổi vị trí">⠿</span>
      <span class="fefo-pos">${fefoLabel(i,units.length)}</span>
      <span class="fefo-meta">Lô ${u.lot} · HD ${fmtDate(u.expiry)}</span>
      <span class="fefo-move">
        <button type="button" data-act="up" data-i="${i}" ${i===0?'disabled':''} title="Đưa ra ngoài hơn">▲</button>
        <button type="button" data-act="down" data-i="${i}" ${i===units.length-1?'disabled':''} title="Đưa vào trong hơn">▼</button>
      </span>
    </div>`).join('');
  let feedback = tooltip.dataset.feedback || '';
  if(!feedback && btn===fefoBlockedBtn){
    feedback = `<div class="fefo-feedback info">📦 Hộp vừa nhập kho — hãy tự kiểm tra: đưa hộp có hạn dùng gần nhất (dòng tô vàng) ra ngoài cùng bằng ▲▼, rồi bấm "Kiểm tra thứ tự".</div>`;
  }

  tooltip.innerHTML = `
    ${photoHTML}
    <div class="t-name">${esc(it['Tên hoạt chất']||'(Chưa rõ tên)')}</div>
    <div class="t-row">Tồn kho: <b>${units.length} hộp</b>${btn===fefoBlockedBtn?' · <b style="color:#c0392b">🔒 Đang khoá xếp hàng mới</b>':''}</div>
    <div class="fefo-list">${rows}</div>
    ${feedback}
    <div class="fefo-actions">
      <button type="button" data-act="check">Kiểm tra thứ tự</button>
      <button type="button" data-act="info">ℹ️ Thông tin đầy đủ</button>
    </div>
    <div class="fefo-export">
      <label>Xuất <input type="number" class="fefo-qty" min="1" max="${units.length}" value="1"> hộp</label>
      <button type="button" data-act="export">Xuất</button>
      <div class="fefo-export-hint">Lấy từ hộp ngoài vào trong</div>
    </div>
    <div class="t-hint">Nhấp ra vùng trống để đóng</div>
  `;
  makeFefoRowsDraggable();
}

/* drag a fefo-row's handle up/down to reorder the lots — an alternative
   to the ▲▼ buttons. Other rows shift live to preview the drop slot;
   the actual units array is only reordered on release, then the whole
   panel re-renders (which re-runs this to reattach handles). Listens on
   document rather than the row itself for the same reason the carton
   putaway drag does: pointer-events:none + reparenting during a drag
   can't be trusted to keep routing events back to the source element. */
function makeFefoRowsDraggable(){
  const rows = [...tooltip.querySelectorAll('.fefo-row')];
  rows.forEach(row=>{
    const handle = row.querySelector('.fefo-drag');
    if(!handle) return;
    handle.addEventListener('pointerdown', e=>{
      if(e.pointerType==='mouse' && e.button!==0) return;
      const btn = tooltip._btn;
      const units = btn && btn._units;
      if(!units || units.length<2) return;
      e.preventDefault();
      const startIndex = Number(row.dataset.i);
      const rowH = row.getBoundingClientRect().height + 5; // + .fefo-list gap
      const startY = e.clientY;
      let curIndex = startIndex;
      row.classList.add('fefo-row-dragging');

      function onMove(ev){
        const dy = ev.clientY - startY;
        row.style.transform = `translateY(${dy}px)`;
        let newIndex = startIndex + Math.round(dy / rowH);
        newIndex = Math.max(0, Math.min(units.length-1, newIndex));
        if(newIndex === curIndex) return;
        curIndex = newIndex;
        rows.forEach((r,ri)=>{
          if(r===row) return;
          let shift = 0;
          if(startIndex < curIndex && ri>startIndex && ri<=curIndex) shift = -1;
          else if(startIndex > curIndex && ri>=curIndex && ri<startIndex) shift = 1;
          r.style.transform = shift ? `translateY(${shift*rowH}px)` : '';
        });
      }
      function finish(){
        document.removeEventListener('pointermove', onMove);
        document.removeEventListener('pointerup', onUp);
        document.removeEventListener('pointercancel', onUp);
        if(curIndex !== startIndex){
          const [moved] = units.splice(startIndex,1);
          units.splice(curIndex,0,moved);
          tooltip.dataset.feedback = '';
          if(btn===fefoBlockedBtn && unitsInFefoOrder(units)){
            fefoBlockedBtn = null;
            btn.classList.remove('fefo-warning');
            tooltip.dataset.feedback = `<div class="fefo-feedback ok">✅ Đúng rồi — hộp hạn dùng gần nhất đã ở ngoài cùng (FEFO). Có thể xếp tiếp hàng mới!</div>`;
            if(pendingDispense){
              pendingDispense = false;
              if(deliveryQueue.length){ showCartMsg('✅ Đã sửa đúng FEFO — hộp kế đang ra!', true); setTimeout(dispenseNext, 500); }
              else { showCartMsg('🎉 Đã sửa xong FEFO và hết lô! Bấm thùng nhận lô mới.', true); updateCartonHint(); }
            } else {
              showCartMsg('✅ Đã sửa đúng FEFO — tiếp tục xếp hàng nào!', true);
            }
          }
        }
        renderFefoPanel();
        positionNearBox(btn);
      }
      function onUp(ev){ finish(); }
      document.addEventListener('pointermove', onMove);
      document.addEventListener('pointerup', onUp);
      document.addEventListener('pointercancel', onUp);
    });
  });
}
tooltip.addEventListener('click', e=>{
  const btnEl = e.target.closest('[data-act]');
  if(!btnEl) return;
  // keep the panel open: re-rendering detaches this button, so don't let the
  // click bubble to the document handler that closes on outside-clicks
  e.stopPropagation();
  const btn = tooltip._btn;
  if(!btn || !btn._units) return;
  const units = btn._units;
  const act = btnEl.dataset.act;
  if(act==='info'){ openModal(tooltip._it, tooltip._s, btn); return; }
  if(act==='up' || act==='down'){
    const i = Number(btnEl.dataset.i);
    const j = act==='up' ? i-1 : i+1;
    if(j<0 || j>=units.length) return;
    [units[i], units[j]] = [units[j], units[i]];
    tooltip.dataset.feedback = '';
  } else if(act==='check'){
    const ok = unitsInFefoOrder(units);
    tooltip.dataset.feedback = ok
      ? `<div class="fefo-feedback ok">✅ Đúng rồi — hộp hạn dùng gần nhất đã ở ngoài cùng (FEFO)</div>`
      : `<div class="fefo-feedback bad">❌ Chưa đúng — hãy dùng ▲▼ để đưa hộp có hạn dùng gần nhất ra ngoài cùng</div>`;
  } else if(act==='export'){
    const input = tooltip.querySelector('.fefo-qty');
    const n = Math.max(1, Math.min(units.length, parseInt(input && input.value, 10) || 1));
    units.splice(0, n); // dispense from the front (outer) box inward
    btn.dataset.qty = String(units.length);
    let badge = btn.querySelector('.qty-badge');
    if(units.length>1){ if(badge) badge.textContent = 'x'+units.length; }
    else if(units.length===1){ if(badge) badge.remove(); }
    else {
      btn.classList.add('out-of-stock');
      if(badge){ badge.className = 'qty-badge out-of-stock-badge'; badge.textContent = 'Hết hàng'; }
      else {
        badge = document.createElement('span');
        badge.className = 'qty-badge out-of-stock-badge';
        badge.textContent = 'Hết hàng';
        btn.appendChild(badge);
      }
    }
    tooltip.dataset.feedback = `<div class="fefo-feedback ok">✅ Đã xuất ${n} hộp, lấy từ ngoài vào trong</div>`;
  }
  if(btn===fefoBlockedBtn && (units.length===0 || unitsInFefoOrder(units))){
    fefoBlockedBtn = null;
    btn.classList.remove('fefo-warning');
    if(act!=='export') tooltip.dataset.feedback = `<div class="fefo-feedback ok">✅ Đúng rồi — hộp hạn dùng gần nhất đã ở ngoài cùng (FEFO). Có thể xếp tiếp hàng mới!</div>`;
    if(pendingDispense){
      pendingDispense = false;
      if(deliveryQueue.length){ showCartMsg('✅ Đã sửa đúng FEFO — hộp kế đang ra!', true); setTimeout(dispenseNext, 500); }
      else { showCartMsg('🎉 Đã sửa xong FEFO và hết lô! Bấm thùng nhận lô mới.', true); updateCartonHint(); }
    } else {
      showCartMsg('✅ Đã sửa đúng FEFO — tiếp tục xếp hàng nào!', true);
    }
  }
  renderFefoPanel();
  positionNearBox(btn);
});

/* ---------- modal (full detail on click) ---------- */
const overlay = document.getElementById('overlay');
const mName = document.getElementById('mName');
const mBrand = document.getElementById('mBrand');
const mFields = document.getElementById('mFields');
const mFoot = document.getElementById('mFoot');

function field(label, value){
  const missing = !value;
  return `<dt>${label}</dt><dd class="${missing?'missing':''}">${missing?'Chưa cập nhật':esc(value)}</dd>`;
}

const mFefo = document.getElementById('mFefo');
function openModal(it, s, btn){
  hideTooltip();
  mName.textContent = it['Tên hoạt chất'] || '(Chưa rõ tên)';
  mBrand.textContent = `${s.buoi} · ${s.topic}`;
  mFields.innerHTML = [
    field('Tên biệt dược', it['Tên biệt dược']),
    field('Dạng bào chế', it['Dạng bào chế']),
    field('Đường dùng', it['Đường dùng']),
    field('Nơi sản xuất', it['Nơi sản xuất']),
    field('Nước sản xuất', it['Nước sản xuất']),
    field('Số kiểm soát', it['Số kiểm soát']),
    field('Số đăng ký', it['Số đăng ký']),
    field('Hạn sử dụng', it['Hạn sử dụng']),
    field('Điều kiện bảo quản', it['Điều kiện bảo quản']),
    field('Tên file ảnh cần lưu', `${slugify(it._gen||it['Tên hoạt chất'])}.jpg (trong thư mục hop-thuoc/)`),
  ].join('');
  mFoot.innerHTML = it['Link google drive']
    ? `<a href="${esc(it['Link google drive'])}" target="_blank" rel="noopener">🔗 Xem ảnh trên Google Drive</a>`
    : '';

  const units = btn && btn._units;
  if(units && units.length>=1){
    const soonestExpiry = units.reduce((min,u)=> u.expiry<min?u.expiry:min, units[0].expiry);
    const correct = unitsInFefoOrder(units);
    const rows = units.map((u,i)=>{
      const label = fefoLabel(i,units.length);
      return `<tr class="${u.expiry.getTime()===soonestExpiry.getTime()?'soonest':''}"><td>${label}${i===0?' (đang ở ngoài)':''}</td><td>${u.lot}</td><td>${fmtDate(u.expiry)}</td></tr>`;
    }).join('');
    mFefo.innerHTML = `
      <div class="fefo-title">📦 ${units.length} hộp trên kệ · <span class="tag">minh hoạ FEFO</span></div>
      <div class="fefo-note">Số lô/hạn dùng dưới đây là dữ liệu minh hoạ (sheet gốc chưa có hạn dùng riêng từng hộp) để luyện nguyên tắc Hết hạn trước – Xuất trước. Hàng tô vàng là hộp có hạn dùng gần nhất — nên được xếp ra ngoài. ${units.length>1?(correct?'✅ Thứ tự hiện tại đã đúng FEFO.':'❌ Thứ tự hiện tại chưa đúng — bấm vào hộp trên kệ để sắp xếp lại.'):''}</div>
      <table>
        <tr><th>Vị trí</th><th>Số lô</th><th>Hạn dùng</th></tr>
        ${rows}
      </table>
    `;
  } else if(units && units.length===0){
    mFefo.innerHTML = `<div class="fefo-title">📦 Hết hàng trên kệ</div>`;
  } else {
    mFefo.innerHTML = '';
  }
  overlay.classList.add('open');
}
document.getElementById('mClose').addEventListener('click', ()=> overlay.classList.remove('open'));
overlay.addEventListener('click', e=>{ if(e.target===overlay) overlay.classList.remove('open'); });
document.addEventListener('keydown', e=>{ if(e.key==='Escape') overlay.classList.remove('open'); });

/* ---------- search (also reports which tủ/buổi each match lives in) ---------- */
const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');
const SEARCH_RESULTS_MAX = 40;

searchInput.addEventListener('input', ()=>{
  const q = searchInput.value.trim().toLowerCase();
  document.querySelectorAll('.med-item').forEach(box=>{
    if(!q){ box.classList.remove('dim','hit'); return; }
    const match = box.dataset.search.includes(q);
    box.classList.toggle('dim', !match);
    box.classList.toggle('hit', match);
  });

  if(!q){ searchResults.classList.remove('show'); searchResults.innerHTML=''; return; }

  const seen = new Set();
  const matches = [];
  records.forEach(it=>{
    const key = it['Tên hoạt chất']+'|'+it._cabinetId;
    if(seen.has(key)) return;
    const hay = (it['Tên hoạt chất']+' '+it['Tên biệt dược']+' '+it['STT Buổi']+' '+it['Tên Bài']+' '+it._cabinetLabel).toLowerCase();
    if(hay.includes(q)){ seen.add(key); matches.push(it); }
  });

  if(matches.length===0){
    searchResults.innerHTML = `<div class="sr-empty">Không tìm thấy thuốc nào khớp "${esc(searchInput.value)}"</div>`;
  } else {
    const shown = matches.slice(0, SEARCH_RESULTS_MAX);
    const more = matches.length - shown.length;
    searchResults.innerHTML =
      `<div class="sr-count">${matches.length} kết quả — bấm để đến đúng tủ</div>` +
      shown.map(it=>
        `<button type="button" data-cabinet="${esc(it._cabinetId)}"><b>${esc(it['Tên hoạt chất'])}</b><span class="sr-buoi">${esc(it._cabinetLabel)}</span></button>`
      ).join('') +
      (more>0 ? `<div class="sr-count">+ ${more} kết quả khác, gõ cụ thể hơn để thu hẹp</div>` : '');
  }
  searchResults.classList.add('show');
});
searchResults.addEventListener('click', e=>{
  const btn = e.target.closest('button[data-cabinet]');
  if(btn) scrollToCabinet(btn.dataset.cabinet);
});

/* ==================================================================
   MAIN SCREEN = walkable pharmacy overview. The student walks to the
   "Sảnh Tiền Thực Hành GPP" to practice cabinet putaway and earn stars;
   reaching the "Dược sĩ thực tập" title (25⭐, see addStars()) grants a
   🔑 Chìa khóa, then the student goes through the 🚪 Cửa ra vào to enter
   (unlock) the pharmacy practice (cabinets + carton).
   ================================================================== */
const pMap = document.getElementById('pharmacyMap');
const pChar = document.getElementById('pmChar');
const pZoneEls = [...pMap.querySelectorAll('.pm-zone')];
const pmZoneLabel = document.getElementById('pmZone');
const mapKeyEl = document.getElementById('mapKey');
const mapActionEl = document.getElementById('mapAction');
/* req (giảng viên): bấm phím mũi tên thì nhân vật chạy hơi nhanh.
   C_SPEED trước đây là 4,4 px MỖI KHUNG HÌNH — vừa nhanh, vừa phụ thuộc màn
   hình: máy 120Hz chạy nhanh gấp đôi máy 60Hz. Nay đổi sang px MỖI GIÂY và
   nhân với thời gian thực của khung, nên tốc độ như nhau trên mọi máy.
   4,4 px/khung ≈ 264 px/giây → hạ còn 180 px/giây. */
const P_W = 1180, P_H = 936, C_W = 34, C_H = 30, C_SPEED = 180, P_BORDER = 4;   // req #164: kích thước ảnh sơ đồ
/* req (giảng viên): đi ngang nhanh thêm 10% so với đi dọc. Tách riêng tốc độ
   theo từng trục thay vì một con số chung. */
const C_SPEED_X = Math.round(C_SPEED * 1.10);   // 198 px/giây — trái/phải
const C_SPEED_Y = C_SPEED;                      // 180 px/giây — lên/xuống
/* req (giảng viên): dược sĩ trèo được cả lên tường. Trước đây chỉ chặn ở MÉP
   ẢNH, mà tường lại nằm bên trong ảnh nên phần tường vẫn đi được. Ảnh sơ đồ vẽ
   theo phối cảnh → sàn là một HÌNH THANG, càng xuống gần người xem càng rộng.
   Các số dưới đây đo bằng cách phủ đa giác lên chính ảnh rồi soi mắt thường.
   Xét theo ĐIỂM CHÂN của nhân vật, không phải cả khung: đầu che lên tường phía
   sau là bình thường, chỉ bàn chân mới phải nằm trên sàn. */
const FLOOR = { top:168, bottom:705, lx0:143, lx1:84, rx0:1087, rx1:1175 };
const FLOOR_DOOR = { x0:480, x1:760, y1:800 };   // khe cửa kính — bước xuống để ra mặt tiền
/* req (giảng viên): dược sĩ vẫn trèo lên vách phòng tư vấn và đứng cả lên bàn
   máy tính. Những thứ này được VẼ SẴN trong ảnh sơ đồ nhưng không có vùng bấm
   nào phủ lên, nên trước giờ không chặn gì cả. Toạ độ dưới đây đo bằng cách dò
   màu gạch sàn trên chính ảnh (lưới 20px). Vách trái của phòng cố ý cắt làm
   hai đoạn để CHỪA CỬA — muốn vào phòng thì phải đi qua cửa. */
const P_SOLID = [
  { x:852,  y:425, w:298, h:110, ten:'bàn máy tính + vách sau + giá tài liệu' },
  { x:930,  y:686, w:250, h:26,  ten:'tường mặt tiền phía phải (cao hơn bên trái)' },
  // Chỉ VÁCH KÍNH phía trên mới chặn. Dải phía dưới nó là CÁNH CỬA GỖ đang mở
  // — đi xuyên qua cánh cửa thì được, nên để trống làm lối vào phòng.
  { x:855,  y:532, w:76,  h:80,  ten:'vách kính trái (phía trên cửa)' },
  { x:992,  y:548, w:56,  h:64,  ten:'ghế đẩu trong phòng' },
  { x:1112, y:628, w:44,  h:46,  ten:'chậu cây góc phòng' },
];
function pOnFloor(fx, fy){
  if(fy > FLOOR.bottom)
    return fy <= FLOOR_DOOR.y1 && fx >= FLOOR_DOOR.x0 && fx <= FLOOR_DOOR.x1;
  if(fy < FLOOR.top) return false;
  const t = (fy - FLOOR.top) / (FLOOR.bottom - FLOOR.top);
  return fx >= FLOOR.lx0 + (FLOOR.lx1 - FLOOR.lx0) * t
      && fx <= FLOOR.rx0 + (FLOOR.rx1 - FLOOR.rx0) * t;
}
/* req (giảng viên): "bước chân cần nhanh hơn". Nhịp 1,1s quá thong thả so với
   tốc độ đi → trông như trượt chân. Suy nhịp từ chính tốc độ: một chu kỳ = 2
   bước, mỗi bước ≈ 2·(dài chân 13px)·sin(biên độ 22°). Khớp tuyệt đối ra ~0,11s
   — nhanh thành nhoè, nên giữ lại chút trượt chân (hệ số 0,22) → ~0,5s, nhanh
   gấp đôi hiện tại. Người nhún 1 nhịp mỗi BƯỚC nên bằng nửa chu kỳ. */
const PM_STRIDE = 4 * 13 * Math.sin(22 * Math.PI / 180);
/* Nhịp = quãng một chu kỳ ÷ tốc độ, nhân hệ số "trượt chân" cho dễ nhìn.
   Hai hướng chỉnh riêng theo đúng yêu cầu của giảng viên qua từng lượt xem:
     · ngang: 0,22 → 0,20  ⇒ 0,49s → 0,54s  (chậm lại 10%)
     · dọc  : 0,29 → 0,264 ⇒ 0,37s → 0,41s  (chậm lại 10%)
   Hệ số càng NHỎ thì nhịp càng CHẬM. */
const PM_DUR = PM_STRIDE / (C_SPEED * 0.20);
/* Đi lên/xuống nhìn thẳng nên gần như không thấy sải chân, chỉ thấy chân nhấc
   lên hạ xuống — vẫn giữ nhanh hơn lúc đi ngang một chút. */
const PM_DUR_V = PM_STRIDE / (C_SPEED * 0.264);
const mapStage = document.getElementById('mapStage');
let mapScale = 1;
let charX = 588, charY = 690, targetX = null, targetY = null;   // đứng ngay trong lối vào
const pKeys = {};
let pRects = [];
let pRaf = null;
let pHereZone = null;
/* req #159: chìa khóa có được khi (a) đã qua màn 10 Pharma Crush hoặc Pharma Sort
   (hai trò đọc/ghi prog.max = màn cao nhất đã mở, qua màn 10 thì max ≥ 11), hoặc
   (b) đã mở bằng mật khẩu / mốc sao cũ (khóa 'tu-thuoc-mo-phong:key'). */
const KEY_LEVEL = 10;
function gameMax(k){ try{ return (JSON.parse(localStorage.getItem(k) || '{}').max) || 1; }catch(e){ return 1; } }
/* bảng "Các khu vực trong nhà thuốc" — dựng từ chính các vùng bấm để khỏi lệch nhau */
const LEGEND_BG = { 'z-rx':'#2f7fd8','z-otc':'#2e9b53','z-nondrug':'#8b5cf6','z-special':'#2f3e5c','z-receive':'#f59e0b',
  'z-process':'#dc2626','z-dispense':'#14b8a6','z-fridge':'#3b82f6','z-fire':'#ef4444','z-cashier':'#2563eb',
  'z-consult':'#1d4ed8','z-wait':'#16a34a','z-entrance':'#225C4E' };
(function buildLegend(){
  const ul = document.getElementById('mapLegendList'); if(!ul) return;
  pZoneEls.forEach(z => {
    const cls = [...z.classList].find(c => LEGEND_BG[c]);
    const li = document.createElement('li');
    const go = z.dataset.zone === 'tu-rx' || z.dataset.zone === 'tu-otc';
    if(go) li.className = 'go';
    li.innerHTML = '<span class="ml-ico" style="background:' + (LEGEND_BG[cls]||'#64748b') + '">' + z.dataset.ico + '</span><span>' + z.dataset.short + '</span>' + (go ? '<b>Xếp thuốc →</b>' : '');
    li.addEventListener('mouseenter', () => z.classList.add('lg-hover'));
    li.addEventListener('mouseleave', () => z.classList.remove('lg-hover'));
    li.addEventListener('click', () => z.dispatchEvent(new MouseEvent('click', { bubbles:true })));
    ul.appendChild(li);
  });
})();
/* thanh tiêu đề: điểm = tổng sao của hai tủ; tên người học lấy từ phiên Tizia */
(function initMapHeader(){
  const starsOf = k => { try{ return (JSON.parse(localStorage.getItem(k) || '{}').stars) || 0; }catch(e){ return 0; } };
  const pts = starsOf('tu-thuoc-mo-phong:game_v2') + starsOf('tu-thuoc-mo-phong:game_v2:otc');
  document.getElementById('mhPoints').textContent = pts.toLocaleString('vi-VN');
  let nm = ''; try{ nm = localStorage.getItem('tizia:playerName') || ''; }catch(e){}
  if(nm) document.getElementById('mhUser').textContent = '👤 ' + nm;
  document.getElementById('mhTrophy').addEventListener('click', () => {
    const t = TITLES.filter(x => pts >= x.min).pop() || TITLES[0];
    const nx = TITLES.find(x => x.min > pts);
    pmZoneLabel.textContent = '🏆 Danh hiệu hiện tại: ' + t.name + (nx ? ' — cần thêm ' + (nx.min - pts) + '⭐ để đạt "' + nx.name + '"' : ' — cao nhất!');
  });
  const menu = document.getElementById('mhMenu');
  document.getElementById('mhGear').addEventListener('click', e => { e.stopPropagation(); menu.hidden = !menu.hidden; });
  menu.addEventListener('click', e => {
    e.stopPropagation();
    const b = e.target.closest('[data-act]'); if(!b) return;
    menu.hidden = true;
    if(b.dataset.act === 'facade') showFacade();
    else if(b.dataset.act === 'home'){ charX = 588; charY = 690; targetX = targetY = null; pPath = null; pPendingZone = null; }
    else if(b.dataset.act === 'legend'){ document.body.classList.toggle('legend-off'); fitMap(); }
    else if(b.dataset.act === 'guide'){ document.getElementById('mapGuide').classList.toggle('hidden-manual'); }
  });
  document.addEventListener('click', () => { menu.hidden = true; });

  /* req #164 (phản hồi): nút xem sơ đồ toàn màn hình. Fullscreen áp cho
     #mapStage (map + 2 bảng bên) chứ không phải cả trang, để tránh phóng to
     luôn cả nút Cài đặt/⛶ (đang neo theo viewport) đè lên nội dung. */
  const fsBtn = document.getElementById('mhFullscreen');
  /* req #251: phóng to CẢ TRANG (không chỉ #mapStage) — các cửa sổ (phần mềm bán hàng, sổ, xem lại bao bì…) nằm ngoài #mapStage
     nên trước đây khi toàn màn hình bấm Quầy thu ngân thì cửa sổ mở ra nhưng bị ẩn. */
  const docEl = document.documentElement;
  function isFs(){ return document.fullscreenElement || document.webkitFullscreenElement; }
  function updateFsBtn(){
    fsBtn.textContent = isFs() ? '✕' : '⛶';
    fsBtn.title = isFs() ? 'Thoát toàn màn hình' : 'Xem toàn màn hình';
    setTimeout(fitMap, 60);
  }
  fsBtn.addEventListener('click', () => {
    if(isFs()){
      (document.exitFullscreen || document.webkitExitFullscreen)?.call(document);
    } else if(docEl.requestFullscreen){
      docEl.requestFullscreen().catch(() => { pmZoneLabel.textContent = '⚠️ Trình duyệt không cho xem toàn màn hình.'; });
    } else if(docEl.webkitRequestFullscreen){
      docEl.webkitRequestFullscreen();
    } else {
      pmZoneLabel.textContent = '⚠️ Trình duyệt này không hỗ trợ xem toàn màn hình.';
    }
  });
  document.addEventListener('fullscreenchange', updateFsBtn);
  document.addEventListener('webkitfullscreenchange', updateFsBtn);
  /* req #246: màn cảm ứng không có "rê chuột" — bấm icon để mở/đóng bảng bên */
  document.querySelectorAll('#mapGuide .side-ico,#mapLegend .side-ico').forEach(ic => ic.addEventListener('click', e => {
    e.stopPropagation(); const box = ic.parentElement; const was = box.classList.contains('open');
    document.querySelectorAll('#mapGuide,#mapLegend').forEach(x => x.classList.remove('open')); if(!was) box.classList.add('open');
  }));
  document.addEventListener('click', e => { if(!e.target.closest('#mapGuide,#mapLegend')) document.querySelectorAll('#mapGuide,#mapLegend').forEach(x => x.classList.remove('open')); });
})();

/* =====================================================================
   req #169 (ThS Hương Lý) — Nhiệm vụ 1: Lập dự trù và mua thuốc.
   Luôn mở sẵn (không khóa như 4 nhiệm vụ kia). Quy trình 5 bước cô mô tả:
   1) Máy tính ở Quầy thu ngân → Phần mềm bán hàng → tab Dự trù: hệ thống
      báo 4 mặt hàng cần kiểm (2 ở tủ Rx, 2 ở tủ OTC) + tồn kho theo phần mềm.
   2) Rời máy tính, đến đúng tủ kiểm thực tế từng mặt hàng — khớp thì tick,
      sai thì sửa lại số tồn thực tế (checklist nổi trên màn tủ).
   3) Quay lại máy tính: bảng tổng hợp tồn thực tế cả 4 mặt hàng.
   4) Xem lịch sử bán 1 tuần từng mặt hàng.
   5) Điền số lượng cần đặt cho tất cả — xong nhiệm vụ.
   Bản đầu tiên: chỉ tab "Dự trù" có nghiệp vụ thật, 4 tab kia (Quản lý thuốc,
   Bán hàng, Thực nhập, Quản lý nhà cung ứng) để "sắp có" — sẽ gắn dần khi tới
   nhiệm vụ 2/4/5. Vật phẩm cố định (không random) để theo dõi tiến độ được. */
const LS_M1 = 'tu-thuoc-mo-phong:mission1';
function getM1State(){
  try{
    const s = JSON.parse(localStorage.getItem(LS_M1));
    if(s && s.step) return s;
  }catch(e){}
  return { step:'dutru', confirmed:{}, actual:{}, orders:{} };
}
function saveM1State(s){
  localStorage.setItem(LS_M1, JSON.stringify(s));
  try{ applyM1Highlight(); }catch(e){}
  try{ window.renderMissionChecklist?.(); }catch(e){}
}
/* req #174: làm sáng VÙNG cần tới ở bước tiếp theo trên sơ đồ (Quầy thu ngân
   hoặc tủ còn thuốc chưa kiểm) để người học biết phải làm gì tiếp. */
function applyM1Highlight(){
  document.querySelectorAll('.pm-zone.m1-next').forEach(z => z.classList.remove('m1-next'));
  const m3h = (typeof getM3State === 'function') ? getM3State() : { step:'idle' };
  if(m3CrateStep(m3h.step)){ document.querySelector('.pm-zone.z-receive')?.classList.add('m1-next'); return; }
  if(m3h.step === 'sort'){
    if(!(m3h.done && m3h.done.rx) && (m3h.roomItems||[]).some(it => it.cabinet === 'rx')) document.querySelector('.pm-zone.z-rx')?.classList.add('m1-next');
    if(!(m3h.done && m3h.done.otc) && (m3h.roomItems||[]).some(it => it.cabinet === 'otc')) document.querySelector('.pm-zone.z-otc')?.classList.add('m1-next');
    return;
  }
  const m2 = (typeof getM2State === 'function') ? getM2State() : { step:'idle' };
  if(m2.step !== 'idle' && m2.step !== 'done'){
    const q = { deliver:'.pm-zone.z-entrance', inbox:'.pm-zone.z-receive', packaging:'.pm-zone.z-receive', quality:'.pm-zone.z-receive', price:'.pm-zone.z-receive', ledger:'#zCashier', toProcess:'.pm-zone.z-process', mail:'#zCashier' }[m2.step];
    if(q) document.querySelector(q)?.classList.add('m1-next');
    return;
  }
  const st = getM1State();
  if(st.step === 'done') return;
  if(st.step === 'checking'){
    const pend = getM1Items().filter(it => !st.confirmed[it.key]);
    if(pend.some(it => it.cabinet === 'rx')) document.querySelector('.pm-zone.z-rx')?.classList.add('m1-next');
    if(pend.some(it => it.cabinet === 'otc')) document.querySelector('.pm-zone.z-otc')?.classList.add('m1-next');
  } else {
    document.getElementById('zCashier')?.classList.add('m1-next');
  }
}
function m1HashNum(s, min, max){
  let h = 0; for(let i=0;i<s.length;i++){ h = (h*31 + s.charCodeAt(i)) | 0; }
  h = Math.abs(h);
  return min + (h % (max - min + 1));
}
var M1_ITEMS = null;
// req #174: đơn vị tính theo QUY CÁCH ĐÓNG GÓI (hộp/lọ…), không lấy đơn vị nhỏ nhất.
function m1UnitOf(name, rec){
  const q = rec && m1StdPack(rec);
  if(q) return q.big;
  return /nhỏ mắt|nhỏ mũi|siro|xịt|lọ|dung dịch/i.test(name) ? 'lọ' : 'hộp';
}
// req #261: tên chuẩn cột I ghi sẵn quy cách ("Betaloc 50 H60v …" = Hộp 60 viên; "… L60ml" = Lọ 60 ml; "H10ô" = Hộp 10 ống;
// "H24g" = Hộp 24 gói; "TU20g" = Tuýp 20 g). Đọc quy cách từ đó để khớp với bao bì/hoá đơn người học đang xem.
function m1StdPack(rec){
  const std = (rec && rec['Tên hoạt chất']) || '';
  const m = std.match(/(?:^|\s)(H|L|V|TU|Túi)\s?(\d+)\s?(v|ô|g|ml|lọ|bút|liều)?(?=\s|$)/);
  if(!m) return null;
  const n = Number(m[2]), u = m[3] || '';
  const ct = { H:['Hộp','hộp'], L:['Lọ','lọ'], V:['Vỉ','vỉ'], TU:['Tuýp','tuýp'], 'Túi':['Túi','túi'] }[m[1]];
  const word = (m[1] !== 'H' && u === 'g') ? 'g' : ({ v:'viên', 'ô':'ống', g:'gói', 'lọ':'lọ', 'bút':'bút', ml:'ml', 'liều':'liều' }[u] || '');
  let unit = 'viên', per = n;
  if(m[1] === 'H'){ unit = u === 'ô' ? 'ống' : u === 'g' ? 'gói' : u === 'lọ' ? 'lọ' : u === 'bút' ? 'bút' : 'viên'; }
  else if(m[1] === 'L'){ if(u === 'v'){ unit = 'viên'; } else { unit = 'lọ'; per = 1; } }
  else if(m[1] === 'V'){ unit = 'viên'; }
  else { unit = ct[1]; per = 1; }
  return { big: ct[1], unit, per, spec: `${ct[0]} ${n}${word && !(m[1] === 'H' && u === '') ? ' ' + word : ''}` };
}
// req #224: quy cách đóng gói + đơn vị nhỏ nhất (dùng cho niêm yết giá & sổ kiểm nhập).
function m1PackInfo(it){
  const rec0 = it.key ? m1RecOf(it.key) : null;   // quy cách suy từ tên MẪU (vd "… ống tiêm"), không từ tên thuốc chuẩn hiển thị
  const q = rec0 && m1StdPack(rec0);
  if(q) return { unit:q.unit, per:q.per, spec:q.spec, big:q.big };
  const n = ((rec0 && rec0._gen) || it.name).toLowerCase();
  if(/ống/.test(n)) return { unit:'ống', per:10, spec:'Hộp 10 ống' };
  if(/nhỏ mắt|nhỏ mũi|xịt|siro|dung dịch|lọ/.test(n)) return { unit:'lọ', per:1, spec:'Hộp 1 lọ' };
  if(/tuýp|tuyp|gel|kem|mỡ/.test(n)) return { unit:'tuýp', per:1, spec:'Hộp 1 tuýp' };
  if(/gói|cốm|bột/.test(n)) return { unit:'gói', per:20, spec:'Hộp 20 gói' };
  const bl = m1HashNum(it.key+'bl',0,1) ? 3 : 10;
  return { unit:'viên', per:bl*10, spec:`Hộp ${bl} vỉ × 10 viên` };
}
// req #235: bảo quản lạnh theo ĐÚNG điều kiện bảo quản ghi trong danh mục (không bốc ngẫu nhiên nữa)
function m1IsCold(r){ return /^(chưa dùng:\s*)?(bảo quản lạnh|tủ lạnh)/i.test(((r && r['Điều kiện bảo quản']) || '').trim()); }
/* req #254 (ThS Hương Lý): MỌI NƠI ghi tên thuốc = tên cột I (in đậm) + "(Hoạt chất, hàm lượng/nồng độ — cột H)" chữ nhỏ hơn.
   dn() nhận 1 mặt hàng (có key/name) hoặc 1 bản ghi danh mục; trả về HTML đã escape. */
function dnRec(r){
  const nm = r && r['Tên hoạt chất'], st = r && r['Hoạt chất, hàm lượng/nồng độ'];
  return `<b class="dn">${esc(nm || '')}</b>` + (st ? ` <small class="dn-s">(${esc(st)})</small>` : '');
}
function dn(it){
  if(!it) return '';
  const rec = typeof it === 'string' ? allRecords.find(x => x['Tên hoạt chất'] === it || x._gen === it)
    : ((it.key && m1RecOf(it.key)) || allRecords.find(x => x['Tên hoạt chất'] === it.name || x._gen === it.name));
  if(rec) return dnRec(rec);
  return `<b class="dn">${esc(typeof it === 'string' ? it : it.name)}</b>`;
}
function m1RecOf(key){ return allRecords.find(r => m1KeyOf(r) === key) || null; }
// req #258: tiền đồng gõ theo hoá đơn "64.000" — ô type=number hiểu là 64 (dấu chấm thập phân). Ô tiền dùng text
// và đọc bằng viMoney: "64.000" / "64,000" / "64 000" / "64000" đều = 64000; "64,5" = 64,5.
function viMoney(v){
  const t = String(v == null ? '' : v).trim().replace(/\s/g, '');
  if(!t) return NaN;
  if(/^\d{1,3}([.,]\d{3})+$/.test(t)) return Number(t.replace(/[.,]/g, ''));
  return Number(t.replace(',', '.'));
}
function m1PkgPrice(it){ return 12000 + m1HashNum(it.key+'p', 0, 78) * 1000; }   // giá nhập / 1 đơn vị đóng gói (chưa VAT)
// req #226: danh mục thuốc của các nhiệm vụ 1-2-3 MỞ RỘNG dần theo mức độ — mức 1 lấy thuốc trong 2 tủ
// đầu, rồi 4 tủ, 8, 12, 18… Mỗi lượt chơi mới bốc ngẫu nhiên 2 thuốc kê đơn + 2 thuốc không kê đơn.
function m1ItemsKey(){ return 'tu-thuoc-mo-phong:m1items'; }
function m1TierCabs(){ return [2,4,8,12,18]; }
function m1SharedTier(){
  let t = 0;
  for(const k of ['tu-thuoc-mo-phong:game_v2','tu-thuoc-mo-phong:game_v2:otc']){
    try{ const g = JSON.parse(localStorage.getItem(k) || 'null'); if(g && typeof g.tier === 'number') t = Math.max(t, g.tier); }catch(e){}
  }
  return Math.min(m1TierCabs().length - 1, t);
}
function m1ClassPool(cls, nCab){
  const groups = [], byKey = {};
  allRecords.filter(r => r['Tên hoạt chất'] && drugClass(r) === cls).forEach(r => {
    const k = (r['Nhóm dược lý']||'').trim() || r['Tên Bài'];
    if(!byKey[k]){ byKey[k] = []; groups.push(byKey[k]); }
    byKey[k].push(r);
  });
  const cabs = [];
  groups.forEach(g => { for(let i = 0; i < g.length; i += 20) cabs.push(g.slice(i, i + 20)); });
  const pool = cabs.slice(0, nCab).flat().filter(r => PHOTO_SLUGS.has(slugify(r._gen||r['Tên hoạt chất'])));
  return pool;
}
function m1KeyOf(r){ return r['STT Buổi'] + '|' + (r._gen || r['Tên hoạt chất']); }
function m1GenerateKeys(){
  const nCab = m1TierCabs()[m1SharedTier()];
  // req #236: mỗi lượt bốc ngẫu nhiên 2–4 thuốc (có cả thuốc kê đơn và không kê đơn)
  const total = 2 + Math.floor(Math.random() * 3);
  const nRx = total === 2 ? 1 : total === 4 ? 2 : (Math.random() < .5 ? 1 : 2), nOtc = total - nRx;
  const pick = (cls, n) => {
    let pool = m1ClassPool(cls, nCab);
    if(pool.length < n) pool = allRecords.filter(r => r['Tên hoạt chất'] && drugClass(r) === cls);
    const out = [];
    while(out.length < n && pool.length){ out.push(pool.splice(Math.floor(Math.random()*pool.length), 1)[0]); }
    return out.map(m1KeyOf);
  };
  return [...pick('rx', nRx), ...pick('otc', nOtc)];
}
function m1ResetItems(){ try{ localStorage.removeItem(m1ItemsKey()); localStorage.removeItem('tu-thuoc-mo-phong:m1ksdb'); }catch(e){} M1_ITEMS = null; M1_KS = null; }
/* req #250 (ThS Hương Lý): NHÁNH THUỐC KIỂM SOÁT ĐẶC BIỆT trong nhiệm vụ 1 (giáo trình KNTH tại CSBL thuốc, bài 1, bước 2.1 + 4):
   thuốc gây nghiện / hướng thần / tiền chất dự trù 1 lần/năm, ≤150% so với năm trước, lập ĐƠN MUA + BÁO CÁO XUẤT–NHẬP–TỒN gửi SỞ Y TẾ,
   chỉ được mua sau khi Sở Y tế phê duyệt. Số liệu và biểu mẫu chỉ là MẪU MINH HOẠ (không có giá trị pháp lý). */
var M1_KS = null;
function getM1Ksdb(){
  if(M1_KS) return M1_KS;
  let key = null; try{ key = JSON.parse(localStorage.getItem('tu-thuoc-mo-phong:m1ksdb') || 'null'); }catch(e){}
  const okKind = r => ['narc','psy','pre','combo'].includes(ksdbKind(r));
  let rec = key && allRecords.find(r => m1KeyOf(r) === key);
  if(!rec || !okKind(rec)){
    const pool = allRecords.filter(r => r['Tên hoạt chất'] && okKind(r));
    rec = pool.length ? pool[Math.floor(Math.random()*pool.length)] : null;
    try{ localStorage.setItem('tu-thuoc-mo-phong:m1ksdb', JSON.stringify(rec ? m1KeyOf(rec) : null)); }catch(e){}
  }
  M1_KS = rec ? [(() => { const k = m1KeyOf(rec);
    const lastYear = 2 * m1HashNum(k+'ly', 8, 30);           // chẵn để 150% là số nguyên
    const tonDau = m1HashNum(k+'td', 4, 14), nhap = m1HashNum(k+'nh', 14, 40), xuat = Math.min(tonDau + nhap - 1, m1HashNum(k+'xu', 10, 38));
    return { key:k, name:rec['Tên hoạt chất'], kind:ksdbKind(rec), unit:m1UnitOf(rec._gen || rec['Tên hoạt chất'], rec), spec: rec['Hoạt chất, hàm lượng/nồng độ'] || '', form: rec['Dạng bào chế'] || '',
      lastYear, maxQty: lastYear * 1.5, tonDau, nhap, xuat, tonCuoi: tonDau + nhap - xuat };
  })()] : [];
  return M1_KS;
}
function m1KsNext(st){ return getM1Ksdb().length ? 'ksdb' : 'supplier'; }
/* req #263 (ThS Hương Lý): đơn hàng theo Mẫu số 12 và báo cáo theo Mẫu số 13 cô gửi. Tên cơ sở, số liệu, ngày tháng đều giả định;
   mọi biểu mẫu có dấu mờ MẪU MINH HOẠ, không dựng chữ ký hay con dấu. */
function viDate(d){ return `${String(d.getDate()).padStart(2,'0')}/${String(d.getMonth()+1).padStart(2,'0')}/${d.getFullYear()}`; }
function ksPeriod(it){
  const y = new Date().getFullYear() - 1, m = m1HashNum(it.key+'km', 1, 12), d = m1HashNum(it.key+'kd', 1, 28);
  const p2 = n => String(n).padStart(2,'0');
  return { prevFrom:`${p2(d)}/${p2(m)}/${y-1}`, prevTo:`${p2(d)}/${p2(m)}/${y}`, prevToIso:`${y}-${p2(m)}-${p2(d)}`, today:viDate(new Date()) };
}
function ksDrugCell(it){
  const pk = pkgData({ name:it.name, key:it.key });
  return `${dn(it)}<br><small>${esc(it.form)}${it.form ? ' · ' : ''}${esc(m1PackInfo(it).spec)} · Số GĐKLH: ${esc(pk.reg)}${pk.realReg ? '' : ' (số minh hoạ)'}</small>`;
}
const KS_WM = '<div class="wm">MẪU MINH HOẠ · KHÔNG CÓ GIÁ TRỊ PHÁP LÝ</div>';
const KS_ORG = '<div class="ks-org">NHÀ THUỐC TIZIA PHARMA (cơ sở mô phỏng)<br><span style="font-weight:600">Số: ……… (minh hoạ)</span></div>';
function ksOrderDoc(st, ks, stage){
  const edit = stage === 'edit', approved = stage === 'approved';
  const toCell = edit ? `<select id="ksTo"><option value="">— chọn nơi nhận —</option>${['Bộ Y tế','Cục Quản lý Dược','Sở Y tế'].map(o => `<option${st.ks.to === o ? ' selected' : ''}>${o}</option>`).join('')}</select>` : esc(st.ks.to || 'Sở Y tế');
  const nccCell = edit ? `<select id="ksNcc" style="max-width:100%"><option value="">— chọn công ty —</option>${M1_SUPPLIERS.map(x => `<option${st.ks.ncc === x.name ? ' selected' : ''}>${esc(x.name)}</option>`).join('')}</select>` : esc(st.ks.ncc || '……');
  return `<div class="m2-inv ks-doc">${KS_WM}<div class="ks-no">Mẫu số 12</div>${KS_ORG}
    <div class="ks-title">Đơn hàng mua thuốc gây nghiện, thuốc hướng thần, thuốc tiền chất, thuốc dạng phối hợp có chứa tiền chất/nguyên liệu làm thuốc là dược chất gây nghiện/dược chất hướng thần/tiền chất dùng làm thuốc/nhượng lại nguyên liệu làm thuốc là dược chất gây nghiện/dược chất hướng thần/tiền chất dùng làm thuốc</div>
    <div class="ks-center">Kính gửi: ${toCell}</div>
    <div class="ks-scroll"><table class="pos-table"><thead><tr><th>TT</th><th>Nguyên liệu/Tên thuốc, hoạt chất dạng bào chế nồng độ/hàm lượng, quy cách đóng gói, số GĐKLH hoặc GPNK</th><th>Đơn vị tính</th><th>Số lượng đề nghị mua/nhượng lại</th><th>Duyệt</th><th>Ghi chú</th></tr>
      <tr><th></th><th>(1)</th><th>(2)</th><th>(3)</th><th>(4)</th><th>(5)</th></tr></thead><tbody>
      ${ks.map((it, i) => `<tr><td style="text-align:center">${i+1}</td><td>${ksDrugCell(it)}</td><td style="text-align:center">${esc(it.unit)}</td><td style="text-align:center">${st.ks.qty[it.key]}</td><td style="text-align:center">${approved ? st.ks.qty[it.key] : (stage === 'pending' ? 'Chờ duyệt' : '')}</td><td>Cơ sở đề nghị được mua tại công ty ${nccCell}</td></tr>`).join('')}</tbody></table></div>
    <div>Nhà thuốc Tizia Pharma cam kết sử dụng thuốc/nguyên liệu đúng mục đích và chịu trách nhiệm trước pháp luật về tính chính xác, hợp lệ của các thông tin, giấy tờ trong hồ sơ.</div>
    <div class="ks-sign"><div><b>Nơi nhận:</b><br>- Như trên;<br>- Lưu tại cơ sở.</div>
      <div class="c">…, ngày ${st.ks.sentAt || '…'}<br><b>NGƯỜI ĐẠI DIỆN THEO PHÁP LUẬT/NGƯỜI ĐƯỢC ỦY QUYỀN</b><br><i>(Ký, ghi rõ họ tên, chức danh, đóng dấu nếu có — mẫu)</i></div>
      <div class="c">${approved ? `Ngày ${st.ks.approvedAt || '…'} (minh hoạ)` : 'Số ……, ngày …'}<br>Chấp thuận của cơ quan quản lý:<br>Đơn hàng này gồm ${approved ? `01 trang ${String(ks.length).padStart(2,'0')} khoản` : '…. trang …. khoản'}<br>Đơn hàng này có giá trị một năm kể từ ngày ký ban hành<br><b>CƠ QUAN CHẤP THUẬN</b><br><i>(${approved ? 'Đã chấp thuận — mẫu minh hoạ, không có chữ ký và con dấu' : 'Ký tên, đóng dấu'})</i></div></div></div>`;
}
function ksReportDoc(st, ks, edit){
  const per = ksPeriod(ks[0]);
  const num = (cls, it) => `<input type="number" min="0" class="${cls}" data-k="${esc(it.key)}">`;
  return `<div class="m2-inv ks-doc">${KS_WM}<div class="ks-no">Mẫu số 13</div>${KS_ORG}
    <div class="ks-title">Báo cáo xuất - nhập - tồn thuốc gây nghiện/thuốc hướng thần/thuốc tiền chất/thuốc dạng phối hợp có chứa tiền chất/nguyên liệu làm thuốc là dược chất gây nghiện/dược chất hướng thần/tiền chất dùng làm thuốc</div>
    <div class="ks-center"><i>(Từ ngày ${edit ? '<input type="date" id="ksFrom">' : per.prevTo} đến ngày ${st.ks.sentAt || per.today})</i></div>
    <div class="ks-center">Kính gửi: ${esc(st.ks.to || 'Sở Y tế')}</div>
    <div class="ks-scroll"><table class="pos-table"><thead><tr><th>TT</th><th>Nguyên liệu/Tên thuốc, dạng bào chế, nồng độ/hàm lượng, quy cách đóng gói, số GĐKLH hoặc GPNK</th><th>Đơn vị tính</th><th>Số lượng tồn kho kỳ báo cáo trước chuyển sang</th><th>Số lượng nhập trong kỳ báo cáo</th><th>Tổng số</th><th>Số lượng xuất trong kỳ báo cáo</th><th>Tồn kho cuối kỳ báo cáo</th><th>Tên/Địa chỉ khách hàng</th><th>Ghi chú</th></tr>
      <tr>${[1,2,3,4,5,6,7,8,9,10].map(n => `<th>(${n})</th>`).join('')}</tr></thead><tbody>
      ${ks.map((it, i) => `<tr><td style="text-align:center">${i+1}</td><td>${ksDrugCell(it)}</td><td style="text-align:center">${esc(it.unit)}</td><td style="text-align:center">${it.tonDau}</td><td style="text-align:center">${it.nhap}</td><td style="text-align:center">${edit ? num('ks-tong', it) : it.tonDau + it.nhap}</td><td style="text-align:center">${it.xuat}</td><td style="text-align:center">${edit ? num('ks-t', it) : it.tonCuoi}</td><td>Theo bảng thống kê khách hàng kèm theo (minh hoạ)</td><td></td></tr>`).join('')}</tbody></table></div>
    <div>* Báo cáo gửi kèm Đơn hàng của cơ sở gửi ${esc(st.ks.to || 'Sở Y tế')}.</div>
    <div class="ks-sign"><div><b>Nơi nhận:</b><br>- Như trên;<br>- Lưu tại cơ sở.</div>
      <div class="c">…, ngày ${st.ks.sentAt || '…'}<br><b>NGƯỜI ĐẠI DIỆN THEO PHÁP LUẬT/NGƯỜI ĐƯỢC ỦY QUYỀN</b><br><i>(Ký, ghi rõ họ tên, chức danh, đóng dấu nếu có — mẫu)</i></div></div>
    <div class="ks-notes"><b>Ghi chú:</b><br><mark>- Kỳ báo cáo: ngày đầu của kỳ là ngày kết thúc của kỳ báo cáo nộp kèm Đơn hàng liền trước được phê duyệt.</mark><br>- Cột (9): chỉ áp dụng đối với cơ sở kinh doanh; có bảng thống kê danh sách khách hàng kèm theo số lượng và thời điểm xuất hàng tương ứng.</div></div>`;
}
function renderKsdbBranch(st){
  const ks = getM1Ksdb(); st.ks = st.ks || { qty:{}, xntOk:false, sent:false, approved:false };
  const U = it => it.unit[0].toUpperCase() + it.unit.slice(1);
  const banner = '<div style="background:#fff4d6;border:1px solid #e3c36b;border-radius:8px;padding:6px 10px;font-size:.74rem;margin:6px 0">⚠️ Biểu mẫu dưới đây là <b>MẪU MINH HOẠ – KHÔNG CÓ GIÁ TRỊ PHÁP LÝ</b>; số liệu là giả định để luyện tập.</div>';
  const kindOf = it => M3_KIND[it.kind] || 'Thuốc kiểm soát đặc biệt';
  const head = `<p class="pos-note">🔒 Trong danh sách có <b>thuốc kiểm soát đặc biệt</b>: <b>${ks.map(it => dn(it)).join(', ')}</b> (${esc(kindOf(ks[0]))}).
    Loại này <b>không đặt thẳng nhà cung ứng</b>: phải <b>dự trù 1 lần/năm</b> bằng <b>Đơn hàng mua thuốc</b> kèm <b>Báo cáo xuất – nhập – tồn</b>, <b>gửi Sở Y tế</b> và <b>chỉ được mua sau khi được phê duyệt</b>.</p>${banner}`;
  const done = st.ks.sent && st.ks.approved;
  if(!ks.every(it => st.ks.qty[it.key] != null)){
    posPanel.innerHTML = head + `<p class="pos-note"><b>Bước 1 — Tính số lượng dự trù.</b> Số lượng đề nghị mua <b>không quá 150% so với năm trước</b>. Điền <b>số lượng tối đa</b> được phép đề nghị cho từng thuốc:</p>
      <table class="pos-table"><thead><tr><th>Thuốc</th><th>Hàm lượng / dạng</th><th>Đã nhập năm trước</th><th>SL tối đa được đề nghị</th></tr></thead><tbody>
      ${ks.map(it => `<tr><td>${dn(it)}</td><td>${esc(it.spec)} ${esc(it.form)}</td><td>${it.lastYear} ${it.unit}</td><td><input type="number" min="0" class="ks-q" data-k="${esc(it.key)}" style="width:90px;padding:4px 6px;border:1px solid #caa25a;border-radius:6px"> ${it.unit}</td></tr>`).join('')}</tbody></table>
      <button type="button" class="pos-btn" id="ksQtyOk">✅ Kiểm tra</button><div class="pos-err" id="ksErr"></div>`;
    document.getElementById('ksQtyOk').addEventListener('click', () => {
      const bad = [];
      posPanel.querySelectorAll('.ks-q').forEach(inp => { const it = ks.find(x => x.key === inp.dataset.k); if(Number(inp.value) !== it.maxQty) bad.push(it); else st.ks.qty[it.key] = it.maxQty; });
      if(bad.length){ document.getElementById('ksErr').textContent = '⚠️ Chưa đúng — ô này điền số lượng TỐI ĐA = số đã nhập năm trước × 150%. ' + bad.map(b => `${b.name}: ${b.lastYear} ${b.unit} × 150% = ?`).join('; ') + '.'; return; }
      saveM1State(st); renderKsdbBranch(st);
    });
    return;
  }
  if(!st.ks.xntOk){
    const per = ksPeriod(ks[0]);
    posPanel.innerHTML = head + `<p class="pos-note"><b>Bước 2 — Báo cáo xuất – nhập – tồn</b> (Mẫu số 13, gửi kèm đơn hàng). Kỳ báo cáo nộp kèm đơn hàng liền trước đã được phê duyệt: <b>từ ${per.prevFrom} đến ${per.prevTo}</b>. Hãy điền <b>ngày đầu kỳ</b>, cột <b>Tổng số (6)</b> và <b>Tồn kho cuối kỳ (8)</b>:</p>
      ${ksReportDoc(st, ks, true)}
      <button type="button" class="pos-btn" id="ksXntOk">✅ Kiểm tra</button><div class="pos-err" id="ksErr"></div>`;
    document.getElementById('ksXntOk').addEventListener('click', () => {
      const err = document.getElementById('ksErr');
      if(document.getElementById('ksFrom').value !== per.prevToIso){ err.textContent = '⚠️ Chưa đúng ngày đầu kỳ — ngày đầu của kỳ là ngày KẾT THÚC của kỳ báo cáo nộp kèm đơn hàng liền trước được phê duyệt.'; return; }
      const badTong = [], badCuoi = [];
      ks.forEach(it => {
        const v = c => Number(posPanel.querySelector(`.${c}[data-k="${CSS.escape(it.key)}"]`).value);
        if(v('ks-tong') !== it.tonDau + it.nhap) badTong.push(it.name);
        if(v('ks-t') !== it.tonCuoi) badCuoi.push(it.name);
      });
      if(badTong.length){ err.textContent = '⚠️ Chưa đúng cột (6) — tổng số = tồn kỳ trước chuyển sang (4) + nhập trong kỳ (5). Tính lại cho: ' + badTong.join(', ') + '.'; return; }
      if(badCuoi.length){ err.textContent = '⚠️ Chưa đúng cột (8) — tồn cuối kỳ = tổng số (6) − xuất trong kỳ (7). Tính lại cho: ' + badCuoi.join(', ') + '.'; return; }
      st.ks.xntOk = true; saveM1State(st); renderKsdbBranch(st);
    });
    return;
  }
  if(!st.ks.sent){
    posPanel.innerHTML = head + `<p class="pos-note"><b>Bước 3 — Lập đơn hàng và gửi.</b> Điền <b>nơi nhận</b> và <b>công ty đề nghị được mua</b> trên đơn hàng (Mẫu số 12), soát lại báo cáo kèm theo, <b>người đại diện theo pháp luật ký</b> rồi gửi:</p>
      ${ksOrderDoc(st, ks, 'edit')}${ksReportDoc(st, ks, false)}
      <label style="display:flex;gap:8px;align-items:center;font-size:.82rem;margin:8px 0"><input type="checkbox" id="ksSign"> Người đại diện theo pháp luật đã ký tên (mẫu) và thông tin đã được kiểm tra.</label>
      <button type="button" class="pos-btn" id="ksSend" disabled>📨 Gửi đơn hàng + báo cáo</button><div class="pos-err" id="ksErr"></div>`;
    document.getElementById('ksSign').addEventListener('change', e => { document.getElementById('ksSend').disabled = !e.target.checked; });
    document.getElementById('ksSend').addEventListener('click', () => {
      const to = document.getElementById('ksTo').value, ncc = document.getElementById('ksNcc').value, err = document.getElementById('ksErr');
      if(to !== 'Sở Y tế'){ err.textContent = '⚠️ Chưa đúng nơi nhận — đơn hàng và báo cáo của nhà thuốc gửi Sở Y tế.'; return; }
      if(!ncc){ err.textContent = '⚠️ Chọn công ty đề nghị được mua ở cột Ghi chú.'; return; }
      st.ks.to = to; st.ks.ncc = ncc; st.ks.sent = true; st.ks.sentAt = viDate(new Date()); saveM1State(st); renderKsdbBranch(st);
    });
    return;
  }
  if(!st.ks.approved){
    posPanel.innerHTML = head + `${ksOrderDoc(st, ks, 'pending')}${ksReportDoc(st, ks, false)}<div class="pos-soon" style="color:#8a5a00">⏳ Đã gửi Sở Y tế — đang <b>chờ phê duyệt</b>. Chưa được mua thuốc kiểm soát đặc biệt khi chưa có phê duyệt.</div>
      <button type="button" class="pos-btn" id="ksCheck">🔄 Kiểm tra phản hồi của Sở Y tế</button>`;
    document.getElementById('ksCheck').addEventListener('click', e => {
      e.target.disabled = true; e.target.textContent = 'Đang kiểm tra…';
      setTimeout(() => { st.ks.approved = true; st.ks.approvedAt = viDate(new Date()); saveM1State(st); renderKsdbBranch(st); }, 1200);
    });
    return;
  }
  posPanel.innerHTML = head + `${ksOrderDoc(st, ks, 'approved')}${ksReportDoc(st, ks, false)}<div class="pos-soon" style="color:#1f7a3d">✅ <b>Sở Y tế đã phê duyệt</b> đơn hàng (mẫu minh hoạ). Bây giờ mới được đặt mua thuốc kiểm soát đặc biệt cùng các thuốc khác.</div>
    <button type="button" class="pos-btn" id="ksNext">➡️ Sang chọn nhà cung ứng</button>`;
  document.getElementById('ksNext').addEventListener('click', () => {
    st.step = 'supplier'; saveM1State(st); window.refreshMissionsList?.();
    posPanel.innerHTML = '<div class="pos-soon" style="color:#1f7a3d">✅ Đã được duyệt dự trù thuốc kiểm soát đặc biệt.<br>Sang tab "Quản lý nhà cung ứng" để chọn nhà cung ứng và gửi đơn đặt hàng.</div>';
  });
}
function getM1Items(){
  if(M1_ITEMS) return M1_ITEMS;
  let keys = null;
  try{ keys = JSON.parse(localStorage.getItem(m1ItemsKey()) || 'null'); }catch(e){}
  const byKey = {}; allRecords.forEach(r => { if(r['Tên hoạt chất']) byKey[m1KeyOf(r)] = r; });
  if(!Array.isArray(keys) || keys.length < 2 || keys.some(k => !byKey[k])){
    // người chơi đang dở nhiệm vụ 1 từ trước → giữ bộ 4 thuốc cũ để không vỡ tiến độ
    if(localStorage.getItem('tu-thuoc-mo-phong:mission1')){
      const legacy = c => allRecords.filter(r => r['Tên hoạt chất'] && drugClass(r) === c).slice(0, 2).map(m1KeyOf);
      keys = [...legacy('rx'), ...legacy('otc')];
    } else keys = m1GenerateKeys();
    try{ localStorage.setItem(m1ItemsKey(), JSON.stringify(keys)); }catch(e){}
  }
  M1_ITEMS = keys.map(key => {
    const r = byKey[key];
    const ton = m1HashNum(key+'k',1,2);   // hộp; tủ chỉ chứa 1–2 hộp mỗi loại
    const it = { key, name: r['Tên hoạt chất'], cabinet: drugClass(r), tonKho: ton, tonThuc: ton, unit: m1UnitOf(r._gen || r['Tên hoạt chất'], r), banTuan: m1HashNum(key+'b',6,38),
                 cold: m1IsCold(r) };
    it.pack = m1PackInfo(it);
    return it;
  });
  // req #174: tồn trong phần mềm KHỚP thực tế, trừ tối đa 1 mặt hàng lệch (1↔2 hộp).
  if(M1_ITEMS.length){
    const mi = m1HashNum('m1-mismatch', 0, M1_ITEMS.length - 1);
    M1_ITEMS[mi].tonThuc = 3 - M1_ITEMS[mi].tonKho;
  }
  return M1_ITEMS;
}
// Số hộp thực tế ghi trên tủ cho thuốc thuộc nhiệm vụ 1 (null = không thuộc nhiệm vụ 1).
function m1CabQty(drugName){
  try{ const it = getM1Items().find(x => x.name === drugName); return it ? it.tonThuc : null; }
  catch(e){ return null; }
}
// req #169 (phản hồi): "số ngày cần dự trù" — chu kỳ nhập hàng chuẩn của nhà
// thuốc, dùng cho công thức SL đặt = Bán/tuần ÷ 7 × số ngày − tồn. Đang để
// tạm 10 ngày (chưa có giáo trình nêu con số chính thức) — đổi ở đây nếu cô
// Hương Lý cho biết chu kỳ thật của nhà thuốc.
// req #170 (phản hồi lần 2): số ngày dự trù TÙY NHÓM HÀNG — hàng bán nhanh đặt thường xuyên
// (chu kỳ ngắn), hàng bán chậm đặt thưa hơn (chu kỳ dài). Phân nhóm theo lượng bán/tuần.
function m1Days(it){ return it.banTuan >= 30 ? 2 : it.banTuan >= 15 ? 5 : 10; }
function m1Group(it){ return it.banTuan >= 30 ? 'bán nhanh' : it.banTuan >= 15 ? 'bán vừa' : 'bán chậm'; }
function m1OrderQty(it, tonThuc){
  return Math.max(0, Math.round(it.banTuan / 7 * m1Days(it) - tonThuc));
}

// req #169 (phản hồi): 3 nhà cung ứng "gợi ý" ở tab Quản lý nhà cung ứng —
// A thiếu giấy phân phối thuốc tốt (GDP) nên KHÔNG đạt chuẩn; B và C đều đủ
// 3 loại giấy tờ hợp pháp, phải so tiếp giá/thời gian giao hàng để chọn C
// (tốt nhất). Không dựng lại ảnh chứng nhận thật — chỉ liệt kê dạng checklist
// để không tạo ra thứ trông như giấy tờ nhà nước thật.
const M1_DOCS = [
  { k:'dkkd', label:'Giấy đăng ký kinh doanh' },
  { k:'ddk',  label:'Giấy chứng nhận đủ điều kiện kinh doanh dược' },
  { k:'gdp',  label:'Giấy chứng nhận GDP (Thực hành tốt phân phối thuốc)' },
];
const M1_SUPPLIERS = [
  { id:'A', name:'Công ty TNHH Dược phẩm An Phát', dkkd:true, ddk:true, gdp:false,
    price:'210.000đ/hộp', ship:'3 ngày' },
  { id:'B', name:'Công ty CP Thương mại Dược phẩm Quốc Anh', dkkd:true, ddk:true, gdp:true,
    price:'220.000đ/hộp', ship:'2 ngày' },
  { id:'C', name:'Công ty CP Dược phẩm Việt Tín', dkkd:true, ddk:true, gdp:true,
    price:'185.000đ/hộp', ship:'1 ngày', best:true },
];

const posOverlay = document.getElementById('posOverlay');
const posPanel = document.getElementById('posPanel');
// req #169 (phản hồi): mở phần mềm CHỈ khi bấm vào máy tính ở Quầy thu ngân —
// bấm vào THẺ nhiệm vụ ở sidebar giờ chỉ nhắc bước đang làm (xem m1Hint()).
function openPOS(){
  const st = getM1State();
  posOverlay.style.display = 'flex';
  try{ const c = document.getElementById('posClock'); if(c){ const d = new Date(); c.textContent = `🕒 ${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')} · ${d.toLocaleDateString('vi-VN')}`; } }catch(e){}
  const m2mail = getM2State().step === 'mail';
  if(m2mail){ st.nhaccSub = 'thu'; saveM1State(st); }
  const m2ledger = getM2State().step === 'ledger';
  const wantTab = m2ledger ? 'thucnhap' : (m2mail || st.step === 'supplier' || st.step === 'order') ? 'nhacc' : 'dutru';
  document.querySelectorAll('#posTabs .pos-tab').forEach(b => b.classList.toggle('active', b.dataset.tab === wantTab));
  if(wantTab === 'nhacc') renderNhaCCTab(); else if(wantTab === 'thucnhap') renderThucNhapTab(); else renderDuTruTab();
}
function closePOS(){ posOverlay.style.display = 'none'; try{ m2CloseRef(); }catch(e){} }
document.getElementById('posClose').addEventListener('click', closePOS);
posOverlay.addEventListener('click', e => { if(e.target === posOverlay) closePOS(); });
document.getElementById('posTabs').addEventListener('click', e => {
  const b = e.target.closest('.pos-tab'); if(!b) return;
  document.querySelectorAll('#posTabs .pos-tab').forEach(x => x.classList.toggle('active', x === b));
  if(b.dataset.tab === 'dutru') renderDuTruTab();
  else if(b.dataset.tab === 'nhacc') renderNhaCCTab();
  else if(b.dataset.tab === 'quanly') renderQuanLyTab();
  else if(b.dataset.tab === 'thucnhap') renderThucNhapTab();
  else posPanel.innerHTML = '<div class="pos-soon">🔒 Tab này sẽ có nghiệp vụ ở các nhiệm vụ sau (2, 4, 5).</div>';
});

// req #169 (phản hồi): lời nhắc khi bấm vào THẺ nhiệm vụ 1 (không mở phần
// mềm nữa) — đọc đúng bước đang làm để chỉ dẫn tiếp, không lặp lại từ đầu.
function m1Hint(){
  const st = getM1State();
  const text = st.step === 'dutru'
      ? '🖥️ Nhiệm vụ 1: đi tới Quầy thu ngân, bấm vào máy tính để mở Phần mềm bán hàng.'
    : st.step === 'checking'
      ? '🔍 Nhiệm vụ 1: đến tủ thuốc kê đơn hoặc không kê đơn để kiểm tra hàng — xem thẻ nổi góc màn hình.'
    : st.step === 'return'
      ? '🖥️ Nhiệm vụ 1: quay lại máy tính ở Quầy thu ngân để chốt số lượng cần đặt.'
    : st.step === 'ksdb'
      ? '🔒 Nhiệm vụ 1: thuốc kiểm soát đặc biệt — lập đơn mua + báo cáo xuất–nhập–tồn, gửi Sở Y tế chờ phê duyệt (máy tính ở Quầy thu ngân → tab Dự trù).'
    : st.step === 'supplier' || st.step === 'order'
      ? '🖥️ Nhiệm vụ 1: quay lại máy tính, sang tab "Quản lý nhà cung ứng" để chọn nhà cung ứng và gửi đơn đặt hàng.'
      : '✅ Nhiệm vụ 1 đã hoàn thành! Có thể bấm lại để luyện tập.';
  pmZoneLabel.textContent = text;
}

// req #174: tab "Quản lý thuốc" — tồn kho trong phần mềm, tính theo ĐƠN VỊ ĐÓNG GÓI
// (hộp/lọ…) khớp với số hộp ở tủ (tối đa 1 mặt hàng lệch để người học phát hiện).
/* req #253 (ThS Hương Lý): tab Quản lý thuốc = TOÀN BỘ danh mục thuốc (Mã thuốc, tên thuốc, dạng bào chế, quy cách đóng gói,
   đơn vị tính, nơi sản xuất, tồn, phân nhóm), bấm tiêu đề cột để sắp xếp, có ô tìm một thuốc cụ thể. Các thuốc thuộc nhiệm vụ 1
   được tô nổi và dùng đúng tồn kho trong phần mềm của nhiệm vụ; thuốc khác có tồn minh hoạ cố định theo từng thuốc. */
var QL = { key:'code', dir:1, q:'' };
function qlRows(){
  const m1 = {}; try{ getM1Items().forEach(it => { m1[it.key] = it; }); }catch(e){}
  return allRecords.filter(r => r['Tên hoạt chất']).map((r, i) => {
    const key = m1KeyOf(r), it = m1[key];
    const pack = (it && it.pack) || m1PackInfo({ name: r['Tên hoạt chất'], key });
    return { code: 'T' + String(i + 1).padStart(3, '0'), rec: r, name: r['Tên hoạt chất'], form: r['Dạng bào chế'] || '', spec: pack.spec,
      unit: it ? it.unit : m1UnitOf(r._gen || r['Tên hoạt chất'], r), maker: r['Nơi sản xuất'] || '', ton: it ? it.tonKho : m1HashNum(key + 'qlt', 0, 12),
      group: (r['Nhóm dược lý'] || '').replace(/-$/, ''), m1: !!it, gen: r._gen || '' };
  });
}
function renderQuanLyTab(){
  const COLS = [['code','Mã thuốc'],['name','Tên thuốc'],['form','Dạng bào chế'],['spec','Quy cách đóng gói'],['unit','ĐVT'],['maker','Nơi sản xuất'],['ton','Tồn (PM)'],['group','Phân nhóm']];
  const fold = v => String(v||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/đ/g,'d').toLowerCase();
  const all = qlRows(), q = fold(QL.q).trim();
  const rows = all.filter(r => !q || fold(Object.keys(r).filter(k => k !== 'rec').map(k => r[k]).join(' ')).includes(q))
    .sort((a, b) => (QL.key === 'ton' ? a.ton - b.ton : String(a[QL.key]).localeCompare(String(b[QL.key]), 'vi', { numeric:true })) * QL.dir);
  const n1 = all.filter(r => r.m1).length;
  posPanel.innerHTML = `
    <p class="pos-note">📋 Danh mục thuốc của nhà thuốc (${all.length} mặt hàng). Tồn tính theo <b>đơn vị đóng gói</b> (hộp, lọ…). ${n1 ? `Các thuốc <b>tô vàng</b> là mặt hàng cần kiểm ở nhiệm vụ 1.` : ''}</p>
    <div style="display:flex;gap:8px;align-items:center;margin:6px 0"><input type="search" id="qlSearch" placeholder="🔎 Tìm thuốc (mã, tên, hoạt chất, nơi sản xuất, nhóm…)" value="${esc(QL.q)}" style="flex:1;padding:7px 10px;border:1px solid #caa25a;border-radius:8px;font:inherit"><span class="pos-hint">${rows.length}/${all.length}</span></div>
    <div style="max-height:46vh;overflow:auto;border:1px solid #e3d6b5;border-radius:8px">
    <table class="pos-table" style="margin:0"><thead><tr>${COLS.map(([k, t]) => `<th data-ql="${k}" style="cursor:pointer;position:sticky;top:0;background:#f3ead2;white-space:nowrap">${t}${QL.key === k ? (QL.dir > 0 ? ' ▲' : ' ▼') : ''}</th>`).join('')}</tr></thead><tbody>
      ${rows.map(r => `<tr${r.m1 ? ' style="background:#fff3c4;font-weight:700"' : ''}><td>${r.code}</td><td>${dnRec(r.rec)}</td><td>${esc(r.form)}</td><td>${esc(r.spec)}</td><td>${esc(r.unit)}</td><td>${esc(r.maker)}</td><td>${r.ton}</td><td>${esc(r.group)}</td></tr>`).join('') || '<tr><td colspan="8">Không có thuốc nào khớp.</td></tr>'}
    </tbody></table></div>`;
  posPanel.querySelectorAll('[data-ql]').forEach(th => th.addEventListener('click', () => {
    QL.dir = QL.key === th.dataset.ql ? -QL.dir : 1; QL.key = th.dataset.ql; renderQuanLyTab();
  }));
  const inp = document.getElementById('qlSearch');
  inp.addEventListener('input', () => { QL.q = inp.value; const pos = inp.selectionStart; renderQuanLyTab(); const n = document.getElementById('qlSearch'); n.focus(); n.setSelectionRange(pos, pos); });
}
// Các đáp số gợi ý cho 1 mặt hàng: 1 đúng + 3 sai do nhầm công thức, xáo theo hash để cố định.
function m1QtyChoices(it, ton){
  const right = m1OrderQty(it, ton);
  const wrongs = [
    Math.max(0, Math.round(it.banTuan / 7 * m1Days(it))),        // quên trừ tồn
    Math.max(0, it.banTuan - ton),                                    // quên ÷7 × ngày
    Math.max(0, Math.round(it.banTuan / 7 * m1Days(it) + ton)),  // cộng thay vì trừ tồn
  ];
  const set = [right];
  for(const w of wrongs){ if(!set.includes(w)) set.push(w); }
  for(let k = 1; set.length < 4; k++){ if(!set.includes(right + k)) set.push(right + k); }
  return set.sort((a,b) => m1HashNum(it.key+'c'+a,0,999) - m1HashNum(it.key+'c'+b,0,999));
}
function renderDuTruTab(){
  const items = getM1Items();
  const st = getM1State();
  if(st.step === 'dutru'){
    posPanel.innerHTML = `
      <p class="pos-note">📦 Phần mềm phát hiện <b>${items.length} mặt hàng</b> cần kiểm tra trước khi lập dự trù. Số ngày dự trù <b>tuỳ nhóm hàng</b>: hàng bán nhanh đặt thường xuyên (chu kỳ ngắn), hàng bán chậm đặt thưa hơn (chu kỳ dài).</p>
      <table class="pos-table"><thead><tr><th>Tên thuốc</th><th>Tồn kho (PM)</th><th>Số ngày cần dự trù</th><th>Vị trí</th></tr></thead><tbody>
        ${items.map(it => `<tr><td>${dn(it)}</td><td>${it.tonKho} ${it.unit}</td><td>${m1Days(it)} ngày <span class="pos-hint">(${m1Group(it)})</span></td><td>${it.cabinet==='rx'?'Tủ thuốc kê đơn':'Tủ thuốc không kê đơn'}</td></tr>`).join('')}
      </tbody></table>
      <p class="pos-note">👉 Rời máy tính, đến đúng tủ kiểm tra thực tế từng mặt hàng trước khi lên đơn.</p>
      <button type="button" class="pos-btn" id="posGoCheck">🚶 Rời máy tính, đi kiểm tủ →</button>`;
    document.getElementById('posGoCheck').addEventListener('click', () => {
      st.step = 'checking'; saveM1State(st); closePOS();
      pmZoneLabel.textContent = '📋 Nhiệm vụ 1: đến tủ thuốc kê đơn hoặc không kê đơn để kiểm tra hàng.';
      window.refreshMissionsList?.();
    });
  } else if(st.step === 'checking'){
    const left = items.filter(it => !st.confirmed[it.key]).length;
    posPanel.innerHTML = `<p class="pos-note">🔍 Còn <b>${left} mặt hàng</b> chưa kiểm xong. Đến tủ tương ứng (xem thẻ nổi góc màn hình khi ở trong tủ) để kiểm và xác nhận từng mặt hàng.</p>`;
  } else if(st.step === 'return'){
    // req #179: hỏi CÔNG THỨC dạng điền khuyết; trả lời đúng thì phần mềm tự tính luôn
    // số lượng cần đặt (không còn chọn đáp số trắc nghiệm).
    const rows = items.map(it => { const ton = st.actual[it.key] != null ? st.actual[it.key] : it.tonKho; return { it, ton }; });
    const table = withQty => `<table class="pos-table"><thead><tr><th>Tên thuốc</th><th>Tồn thực tế</th><th>Bán/tuần</th><th>Số ngày dự trù</th>${withQty?'<th>SL cần đặt</th>':''}</tr></thead><tbody>
        ${rows.map(({it,ton}) => `<tr>
          <td>${dn(it)}</td>
          <td>${ton} ${it.unit}</td>
          <td>${it.banTuan}<span class="pos-hint">lịch sử bán</span></td>
          <td>${m1Days(it)} ngày</td>
          ${withQty ? `<td><b>${m1OrderQty(it, ton)} ${it.unit}</b></td>` : ''}
        </tr>`).join('')}
      </tbody></table>`;
    if(!st.formulaOk){
      posPanel.innerHTML = `
        <p class="pos-note">✅ Đã kiểm xong thực tế. Xem bảng <b>lịch sử bán 1 tuần</b>, rồi <b>điền công thức</b> tính số lượng cần đặt — điền đúng, phần mềm sẽ tính giúp số lượng cho từng mặt hàng.</p>
        ${table(false)}
        <p class="pos-note" style="line-height:2.4" id="fmLine"></p>
        <p class="pos-note" style="font-size:.76rem;opacity:.75">Gợi ý: lấy lượng bán 1 tuần chia cho số ngày trong tuần, nhân với số ngày cần dự trù, rồi trừ đi lượng đang còn ở tủ.</p>
        <button type="button" class="pos-btn" id="posFormula">✅ Kiểm tra công thức</button>
        <div class="pos-err" id="posErr"></div>`;
      // req #170 (phản hồi lần 3): mỗi lần chơi khuyết CÁC CHỖ KHÁC NHAU của công thức (chọn ngẫu
      // nhiên 3 trong 4 vị trí, lưu vào trạng thái để không đổi khi mở lại).
      if(!Array.isArray(st.fmBlanks)){
        const idx = [0,1,2,3].sort(() => Math.random() - .5).slice(0,3);
        st.fmBlanks = [0,1,2,3].map(i => idx.includes(i)); saveM1State(st);
      }
      const FM = [
        { show:'Bán/tuần', ph:'vế 1', ok: v => /\bban\b/.test(v) && /\btuan\b/.test(v), hint:'số hạng đầu (lượng gì bán được trong 1 tuần?)' },
        { show:'7', ph:'số chia', ok: v => v === '7' || v === 'bay', hint:'số chia (1 tuần có bao nhiêu ngày?)' },
        { show:'số ngày dự trù', ph:'thừa số nhân', ok: v => /\bngay\b/.test(v), hint:'thừa số nhân (số gì cần nhân với lượng bán mỗi ngày?)' },
        { show:'Tồn thực tế', ph:'số bị trừ', ok: v => /\bton\b/.test(v), hint:'số bị trừ (lượng còn ở tủ gọi là gì?)' },
      ];
      const cell = i => st.fmBlanks[i]
        ? `<input type="text" class="m1-fm" data-i="${i}" size="${i===1?4:14}" placeholder="${FM[i].ph}" style="padding:4px 6px;border:1px solid #caa25a;border-radius:6px;font:inherit;">`
        : `<b>${esc(FM[i].show)}</b>`;
      document.getElementById('fmLine').innerHTML = `SL đặt = ${cell(0)} ÷ ${cell(1)} × ${cell(2)} − ${cell(3)}`;
      const norm = v => String(v||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/đ/g,'d').toLowerCase().replace(/[^a-z0-9 ]/g,' ').replace(/\s+/g,' ').trim();
      document.getElementById('posFormula').addEventListener('click', () => {
        const errEl = document.getElementById('posErr');
        const bad = [];
        posPanel.querySelectorAll('.m1-fm').forEach(inp => { const i = Number(inp.dataset.i); if(!FM[i].ok(norm(inp.value))) bad.push(FM[i].hint); });
        if(!bad.length){ st.formulaOk = true; saveM1State(st); renderDuTruTab(); return; }
        errEl.textContent = '⚠️ Chưa đúng ở: ' + bad.join('; ') + '. Đọc lại gợi ý rồi điền lại nhé.';
      });
    } else {
      posPanel.innerHTML = `
        <p class="pos-note">🎉 Công thức đúng: <b>SL đặt = Bán/tuần ÷ 7 × số ngày dự trù − Tồn thực tế</b>. Phần mềm đã tính số lượng cần đặt cho từng mặt hàng:</p>
        ${table(true)}
        <button type="button" class="pos-btn" id="posSubmit">✅ Xác nhận đặt hàng</button>`;
      document.getElementById('posSubmit').addEventListener('click', () => {
        rows.forEach(({it,ton}) => { st.orders[it.key] = String(m1OrderQty(it, ton)); });
        st.step = m1KsNext(st); saveM1State(st);
        if(st.step === 'ksdb'){ renderKsdbBranch(st); window.refreshMissionsList?.(); return; }
        posPanel.innerHTML = `<div class="pos-soon" style="color:#1f7a3d">✅ Đã lập xong số lượng cần đặt cho ${items.length} mặt hàng!<br>Sang tab "Quản lý nhà cung ứng" để chọn nhà cung ứng và gửi đơn đặt hàng.</div>`;
        window.refreshMissionsList?.();
      });
    }
  } else if(st.step === 'ksdb'){
    renderKsdbBranch(st);
  } else if(st.step === 'supplier' || st.step === 'order'){
    posPanel.innerHTML = `<div class="pos-soon" style="color:#1f7a3d">✅ Đã lập xong số lượng cần đặt.<br>Sang tab "Quản lý nhà cung ứng" để chọn nhà cung ứng và gửi đơn đặt hàng.</div>`;
  } else {
    posPanel.innerHTML = `<div class="pos-soon" style="color:#1f7a3d">🎉 Bạn đã hoàn thành nhiệm vụ 1!</div>
      <button type="button" class="pos-btn" id="posRestart">🔁 Luyện lại từ đầu</button>`;
    document.getElementById('posRestart').addEventListener('click', () => {
      m1ResetItems(); saveM1State({ step:'dutru', confirmed:{}, actual:{}, orders:{}, supplier:null, formulaOk:false, fmBlanks:null });
      renderDuTruTab(); window.refreshMissionsList?.();
    });
  }
}

// req #169 (phản hồi): tab "Quản lý nhà cung ứng" — 2 thẻ con: chọn hồ sơ nhà
// cung ứng (lọc theo giấy tờ hợp pháp rồi so giá/thời gian giao), rồi lập +
// gửi đơn đặt hàng. Chỉ có nghiệp vụ thật khi đã lập xong số lượng (bước
// 'supplier' trở đi) — bấm sớm hơn thì báo cần hoàn thành tab Dự trù trước.
function renderNhaCCTab(){
  const st = getM1State();
  const m2mail = getM2State().step === 'mail';
  if(!m2mail && (st.step === 'dutru' || st.step === 'checking' || st.step === 'return' || st.step === 'ksdb')){
    posPanel.innerHTML = '<div class="pos-soon">🔒 Chưa tới bước này — hoàn thành tab Dự trù (lập đủ số lượng cần đặt) trước.</div>';
    return;
  }
  const sub = (m2mail && st.nhaccSub === 'thu') ? 'thu' : (st.nhaccSub === 'thu' ? 'hoso' : (st.nhaccSub || 'hoso'));
  posPanel.innerHTML = `
    <div class="pos-tabs" style="margin-bottom:12px">
      ${m2mail ? `<button type="button" class="pos-tab${sub==='thu'?' active':''}" data-sub="thu">✉️ Gửi thư cho nhà cung ứng</button>` : ''}
      <button type="button" class="pos-tab${sub==='hoso'?' active':''}" data-sub="hoso">📁 Hồ sơ nhà cung ứng</button>
      <button type="button" class="pos-tab${sub==='donhang'?' active':''}" data-sub="donhang"${st.step==='order'||st.supplier?'':' disabled'}>🧾 Lập đơn đặt hàng</button>
    </div>
    <div id="nhaccBody"></div>`;
  posPanel.querySelectorAll('[data-sub]').forEach(b => b.addEventListener('click', () => {
    if(b.disabled) return;
    st.nhaccSub = b.dataset.sub; saveM1State(st); renderNhaCCTab();
  }));
  if(sub === 'thu') renderThuSub(); else if(sub === 'hoso') renderHoSoSub(st); else renderDonHangSub(st);
}
// req #170 (phản hồi lần 2): giúp người học HÌNH DUNG hồ sơ — hiện thẻ minh hoạ từng giấy tờ với
// các mục cần soát (tên doanh nghiệp, phạm vi, hiệu lực). Cố ý là thẻ tóm tắt có chữ "MẪU MINH HOẠ",
// không quốc huy/con dấu, số giấy là số giả — để không lẫn với giấy tờ nhà nước thật.
const M1_DOC_FIELDS = {
  dkkd: [['Nội dung','Giấy chứng nhận đăng ký doanh nghiệp'],['Mã số doanh nghiệp','0xxxxxxxxx (số minh hoạ)'],['Ngành nghề','Bán buôn thuốc, dụng cụ y tế'],['Tình trạng','Đang hoạt động']],
  ddk:  [['Nội dung','Giấy chứng nhận đủ điều kiện kinh doanh dược'],['Số giấy','xxx/ĐKKDD (số minh hoạ)'],['Phạm vi','Bán buôn thuốc'],['Hiệu lực','Còn hiệu lực']],
  gdp:  [['Nội dung','Giấy chứng nhận đạt Thực hành tốt phân phối thuốc (GDP)'],['Số giấy','xxx/GDP (số minh hoạ)'],['Phạm vi','Phân phối, bảo quản, vận chuyển thuốc'],['Hiệu lực','Còn hiệu lực']],
};
function m1DocCards(sup){
  const card = d => {
    const has = !!sup[d.k];
    if(!has) return `<div style="border:1px dashed #c9b98f;border-radius:8px;padding:6px 8px;margin-top:6px;font-size:.7rem;color:#a33">✖ ${esc(d.label)}: <b>không có trong hồ sơ</b></div>`;
    return `<div style="position:relative;overflow:hidden;border:1px solid #cdbb8a;border-radius:8px;background:#fffdf6;padding:6px 8px 6px;margin-top:6px;font-size:.7rem;line-height:1.45">
      <div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;transform:rotate(-18deg);font:800 .9rem 'Nunito',sans-serif;color:rgba(180,60,60,.13);pointer-events:none;text-align:center">MẪU MINH HOẠ · KHÔNG CÓ GIÁ TRỊ PHÁP LÝ</div>
      <b style="color:#5c4a2c">📄 ${esc(d.label)}</b>
      ${M1_DOC_FIELDS[d.k].map(([k,v]) => `<div><span style="opacity:.65">${k}:</span> ${k==='Nội dung'?esc(v):k==='Tên'?esc(v):esc(v)}</div>`).join('')}
      <div><span style="opacity:.65">Tên đơn vị:</span> ${esc(sup.name)}</div>
    </div>`;
  };
  return `<div style="font-size:.72rem"><div style="opacity:.75">Hồ sơ của <b>${esc(sup.name)}</b> — khi soát cần xem: <b>đúng tên đơn vị</b>, <b>đúng phạm vi</b>, <b>còn hiệu lực</b>.</div><div style="display:flex;gap:8px;flex-wrap:wrap">${M1_DOCS.map(d => `<div style="flex:1 1 200px;min-width:190px">${card(d)}</div>`).join('')}</div></div>`;
}
function renderHoSoSub(st){
  const body = document.getElementById('nhaccBody');
  const chosen = st.supplier;
  st.ticks = st.ticks || {};
  st.viewed = st.viewed || {};
  // req #174: KHÔNG tick sẵn — người học mở hồ sơ từng nhà cung ứng, xem họ có những
  // giấy tờ nào rồi tự tick. Đủ cả 3 giấy tờ mới hiện giá + thời gian giao hàng.
  body.innerHTML = `
    <p class="pos-note">Mở <b>hồ sơ</b> từng nhà cung ứng, kiểm tra họ có những giấy tờ nào rồi <b>tự tick</b> vào các giấy tờ đó. Chỉ nhà cung ứng có <b>đủ 3 giấy tờ</b> mới được mua hàng; nếu nhiều nơi đủ giấy tờ, so tiếp <b>giá &amp; thời gian giao hàng</b>.</p>
    <table class="pos-table"><thead><tr><th>Nhà cung ứng</th><th>ĐK kinh doanh</th><th>Đủ điều kiện KD dược</th><th>GDP (Thực hành tốt phân phối)</th><th>Giá</th><th>Giao hàng</th><th></th></tr></thead><tbody>
      ${M1_SUPPLIERS.map(s => { const t = st.ticks[s.id] || {}; const all = t.dkkd && t.ddk && t.gdp; return `<tr class="${chosen===s.id?'pos-sup-chosen':''}">
        <td>${esc(s.name)}<br><button type="button" class="pos-btn" style="padding:3px 8px;font-size:.68rem;margin-top:4px" data-view="${s.id}">🔍 ${st.viewed[s.id]?'Ẩn hồ sơ':'Xem hồ sơ'}</button>
</td>
        ${M1_DOCS.map(d => `<td><input type="checkbox" data-tick="${s.id}:${d.k}"${t[d.k]?' checked':''}></td>`).join('')}
        <td>${all ? s.price : '—'}</td>
        <td>${all ? s.ship : '—'}</td>
        <td><button type="button" class="pos-btn" style="padding:5px 10px;font-size:.74rem" data-pick="${s.id}">${chosen===s.id?'Đã chọn':'Chọn'}</button></td>
      </tr>${st.viewed[s.id] ? `<tr><td colspan="7" style="background:#fbf7ec">${m1DocCards(s)}</td></tr>` : ''}`; }).join('')}
    </tbody></table>
    <div class="pos-err" id="hosoErr"></div>`;
  body.querySelectorAll('[data-view]').forEach(btn => btn.addEventListener('click', () => {
    st.viewed[btn.dataset.view] = !st.viewed[btn.dataset.view]; saveM1State(st); renderHoSoSub(st);
  }));
  body.querySelectorAll('[data-tick]').forEach(cb => cb.addEventListener('change', () => {
    const [id, k] = cb.dataset.tick.split(':');
    (st.ticks[id] = st.ticks[id] || {})[k] = cb.checked; saveM1State(st); renderHoSoSub(st);
  }));
  body.querySelectorAll('[data-pick]').forEach(btn => btn.addEventListener('click', () => {
    const s = M1_SUPPLIERS.find(x => x.id === btn.dataset.pick);
    const errEl = document.getElementById('hosoErr');
    const t = st.ticks[s.id] || {};
    if(!st.viewed[s.id]){ errEl.textContent = `⚠️ Bạn chưa mở hồ sơ của ${s.name} — bấm "Xem hồ sơ" và tick các giấy tờ họ có trước khi chọn.`; return; }
    if(M1_DOCS.some(d => !!t[d.k] !== !!s[d.k])){ errEl.textContent = `⚠️ Phần tick của bạn chưa khớp hồ sơ của ${s.name} — đối chiếu lại từng giấy tờ trong "Hồ sơ đang có".`; return; }
    if(!s.dkkd || !s.ddk || !s.gdp){
      errEl.textContent = `⚠️ ${s.name} chưa đủ giấy tờ hợp pháp (thiếu ${!s.gdp?'giấy chứng nhận GDP':!s.ddk?'giấy đủ điều kiện kinh doanh dược':'giấy đăng ký kinh doanh'}) — không đạt chuẩn, chọn nhà cung ứng khác.`;
      return;
    }
    // renderNhaCCTab() vẽ lại toàn bộ panel — đặt lại chữ cảnh báo SAU khi vẽ lại.
    const warn = s.best ? '' : `${s.name} đủ giấy tờ, nhưng còn nhà cung ứng khác giá tốt hơn / giao nhanh hơn — cân nhắc so sánh thêm trước khi chọn.`;
    st.supplier = s.id; saveM1State(st); renderNhaCCTab();
    const newErrEl = document.getElementById('hosoErr'); if(newErrEl) newErrEl.textContent = warn;
  }));
}
// req #174 (phản hồi): "số lần chơi" = số lần HOÀN THÀNH NHIỆM VỤ (xong nhiệm vụ 1, hoặc xong 1
// lô ở nhiệm vụ 3). Xong nhiệm vụ 1 tính cho cả hai tủ (kê đơn + không kê đơn).
function m1PracticeCount(){ try{ return Number(localStorage.getItem('tu-thuoc-mo-phong:m1count')) || 0; }catch(e){ return 0; } }
// req #236: mức độ tính theo LƯỢT (hoàn thành cả chuỗi nhiệm vụ 1 → 3), không tính từng nhiệm vụ — xem m3Finish
function m1CountPlay(){
  try{ localStorage.setItem('tu-thuoc-mo-phong:m1count', String(m1PracticeCount() + 1)); }catch(e){}
}
function renderDonHangSub(st){
  const body = document.getElementById('nhaccBody');
  const items = getM1Items();
  const supplier = M1_SUPPLIERS.find(s => s.id === st.supplier);
  if(st.step === 'order' && st.orderSent){
    body.innerHTML = `<div class="pos-soon" style="color:#1f7a3d">✅ ${esc(supplier.name)} đã chấp nhận đơn đặt hàng — hẹn giao hàng sau <b>${supplier.ship}</b>.</div>
      <button type="button" class="pos-btn" id="posFinish">🎉 Hoàn thành nhiệm vụ 1</button>`;
    document.getElementById('posFinish').addEventListener('click', () => {
      st.step = 'done'; saveM1State(st);
      m1CountPlay();
      posPanel.innerHTML = `<div class="pos-soon" style="color:#1f7a3d">🎉 Đã lập xong dự trù, chọn nhà cung ứng &amp; gửi đơn mua thuốc cho ${items.length} mặt hàng!<br>Đóng lại để về sơ đồ — có thể bấm "Luyện lại" ở thẻ nhiệm vụ bất cứ lúc nào.</div>`;
      window.refreshMissionsList?.();
    });
    return;
  }
  body.innerHTML = `
    <p class="pos-note">Kính gửi: <b>${esc(supplier.name)}</b></p>
    <table class="pos-table"><thead><tr><th>Sản phẩm</th><th>Quy cách</th><th>SL</th><th>ĐVT</th></tr></thead><tbody>
      ${items.map(it => `<tr><td>${dn(it)}</td><td>${it.unit[0].toUpperCase()+it.unit.slice(1)}</td><td>${st.orders[it.key]}</td><td>${it.unit[0].toUpperCase()+it.unit.slice(1)}</td></tr>`).join('')}
      ${(st.ks && st.ks.approved ? getM1Ksdb() : []).map(it => `<tr><td>${dn(it)} 🔒<br><span class="pos-hint">thuốc kiểm soát đặc biệt — đã được Sở Y tế phê duyệt</span></td><td>${it.unit[0].toUpperCase()+it.unit.slice(1)}</td><td>${st.ks.qty[it.key]}</td><td>${it.unit[0].toUpperCase()+it.unit.slice(1)}</td></tr>`).join('')}
    </tbody></table>
    <label style="display:flex;gap:8px;align-items:center;font-size:.82rem;margin:8px 0"><input type="checkbox" id="posOrderCheck"> Tôi đã kiểm tra kỹ thông tin đơn đặt hàng.</label>
    <button type="button" class="pos-btn" id="posOrderSend" disabled>📨 Gửi đơn đặt hàng cho nhà cung ứng</button>`;
  const check = document.getElementById('posOrderCheck'), sendBtn = document.getElementById('posOrderSend');
  check.addEventListener('change', () => { sendBtn.disabled = !check.checked; });
  sendBtn.addEventListener('click', () => {
    st.step = 'order'; st.orderSent = true; saveM1State(st);
    renderDonHangSub(st); window.refreshMissionsList?.();
  });
}

/* =====================================================================
   req #215 (ThS Hương Lý) — NHIỆM VỤ 2: Kiểm nhập thuốc, niêm yết giá.
   Mở khoá khi đã hoàn thành tối thiểu 1 lần nhiệm vụ 1. Các bước:
   1) ra cửa → xe (ô tô/xe máy, ngẫu nhiên) dừng trước cửa → bấm thùng hàng → thùng vào khu chờ kiểm nhập
   2) bấm thùng ở khu chờ kiểm nhập → hoá đơn VAT: đối chiếu tên công ty với nhà cung ứng đã đặt ở NV1
   3) so số lượng thực nhận với hoá đơn (ban đầu luôn khớp; luyện >3 lần thỉnh thoảng lệch — lệch thì
      chuyển thùng sang khu hàng chờ xử lý, ra quầy thu ngân → Quản lý nhà cung ứng → gửi thư báo sai lệch)
   4) soi bao bì từng sản phẩm (móp méo, ẩm mốc, chữ nhoè)
   Bước "niêm yết giá" sẽ bổ sung khi cô có yêu cầu tiếp theo. Hoá đơn chỉ là MẪU MINH HOẠ. */
const LS_M2 = 'tu-thuoc-mo-phong:mission2', LS_M2N = 'tu-thuoc-mo-phong:m2count';
function m2Count(){ try{ return Number(localStorage.getItem(LS_M2N)) || 0; }catch(e){ return 0; } }
function getM2State(){
  try{ const x = JSON.parse(localStorage.getItem(LS_M2)); if(x && x.step) return x; }catch(e){}
  return { step:'idle' };
}
function saveM2State(x){
  localStorage.setItem(LS_M2, JSON.stringify(x));
  try{ applyM1Highlight(); }catch(e){}
  try{ m2Sync(); }catch(e){}
  try{ window.refreshMissionsList?.(); }catch(e){}
  try{ window.renderMissionChecklist?.(); }catch(e){}
}
function m2Unlocked(){ return m1PracticeCount() >= 1; }
function m2Active(){ const x = getM2State(); return x.step !== 'idle' && x.step !== 'done'; }
const M2_DEFECTS = { dent:'móp méo', mold:'ẩm mốc', blur:'chữ nhoè, mờ', expired:'đã quá hạn dùng' };
function startM2(){
  const m1 = getM1State();
  const sup = M1_SUPPLIERS.find(x => x.id === m1.supplier) || M1_SUPPLIERS[2];
  const n = m2Count();
  const items = getM1Items().map(it => ({ key:it.key, name:it.name, unit:it.unit, cold:it.cold, pack:it.pack, qty: Number(m1.orders && m1.orders[it.key]) || m1OrderQty(it, it.tonKho) }));
  // Cấp độ đầu luôn khớp số lượng; luyện >3 lần thì thi thoảng lệch 1 mặt hàng.
  const mis = (n > 3 && Math.random() < .5) ? Math.floor(Math.random()*items.length) : -1;
  const dfe = (n >= 1 && Math.random() < .5) ? Math.floor(Math.random()*items.length) : -1;
  items.forEach((it, i) => {
    it.recv = i === mis ? (it.qty > 1 ? it.qty - 1 - Math.floor(Math.random()*Math.min(2, it.qty-1)) : it.qty + 1) : it.qty;
    it.defect = i === dfe ? ['dent','mold','blur'][Math.floor(Math.random()*3)] : null;
    // req #235: hạn dùng thật (khớp ảnh) đã qua → sản phẩm không đạt, người học phải đọc HSD trên bao bì để phát hiện
    if(pkgExpired(it)) it.defect = 'expired';
    // req #224 bước 5: sản phẩm CÓ niêm phong hay KHÔNG (cố định theo thuốc); lỗi cảm quan ngẫu nhiên từ lần luyện thứ 2
    it.sealed = m1HashNum(it.key+'seal', 0, 1) === 1;
    it.q5 = null;
  });
  if(n >= 1 && Math.random() < .5){
    const d5 = items[Math.floor(Math.random()*items.length)];
    d5.q5 = d5.sealed ? 'seal' : ['inout','color','shape'][Math.floor(Math.random()*3)];
  }
  saveM2State({ step:'deliver', vehicle: Math.random() < .5 ? '🚐' : '🛵', supplierId: sup.id, supplierName: sup.name, items, mismatch: mis, sub:'invoice', pack:{} });
}
function m2Hint(){
  const x = getM2State();
  if(!m2Unlocked()) return '🔒 Nhiệm vụ 2: hoàn thành tối thiểu 1 lần Nhiệm vụ 1 để mở khoá.';
  return x.step === 'deliver' ? '🚪 Nhiệm vụ 2: ra cửa ra vào — sẽ có xe giao hàng dừng trước cửa. Bấm vào thùng hàng để nhận.'
    : x.step === 'inbox' ? '📦 Nhiệm vụ 2: bấm vào thùng hàng ở Khu vực chờ kiểm nhập để kiểm tra hoá đơn và hàng.'
    : x.step === 'toProcess' ? (x.mailKind === 'quality' ? '⚠️ Nhiệm vụ 2 (bước 6): có sản phẩm không đạt — bấm vào Khu vực hàng chờ xử lý để chuyển sản phẩm đó sang.' : '⚠️ Nhiệm vụ 2: số lượng không khớp — bấm vào Khu vực hàng chờ xử lý để chuyển thùng hàng sang đó.')
    : x.step === 'mail' ? '✉️ Nhiệm vụ 2: đến Quầy thu ngân, mở máy tính → Quản lý nhà cung ứng → Gửi thư cho nhà cung ứng.'
    : x.step === 'packaging' ? '🔍 Nhiệm vụ 2: bấm thùng ở Khu vực chờ kiểm nhập để kiểm tra bao bì từng sản phẩm.'
    : x.step === 'quality' ? '🔬 Nhiệm vụ 2 (bước 5): bấm thùng ở Khu vực chờ kiểm nhập để kiểm tra chất lượng sản phẩm bằng cảm quan.'
    : x.step === 'price' ? '🏷️ Nhiệm vụ 2 (bước 7): bấm thùng ở Khu vực chờ kiểm nhập để niêm yết giá cho các sản phẩm đạt.'
    : x.step === 'ledger' ? '📒 Nhiệm vụ 2 (bước 8): đến Quầy thu ngân, mở máy tính → tab Thực nhập để ghi sổ kiểm nhập.'
    : '✅ Nhiệm vụ 2 đã xong. Bấm để luyện tập lại.';
}
function m2Click(){
  const x = getM2State();
  if(m2Unlocked() && (x.step === 'idle' || x.step === 'done')){ startM2(); }
  pmZoneLabel.textContent = m2Hint();
}
// Modal dùng chung cho nhiệm vụ 2
function m2Modal(title, bodyHtml){
  let ov = document.getElementById('m2Overlay');
  if(!ov){
    ov = document.createElement('div'); ov.className = 'overlay'; ov.id = 'm2Overlay';
    ov.innerHTML = '<div class="modal pos-modal"><div class="modal-head"><div><h2 id="m2Title"></h2><div class="sub">Nhiệm vụ 2 · Kiểm nhập thuốc, niêm yết giá</div></div><button type="button" id="m2Close">✕</button></div><div class="modal-body pos-body" id="m2Body"></div></div>';
    document.body.appendChild(ov);
    ov.addEventListener('click', e => { if(e.target === ov) ov.style.display = 'none'; });
    ov.querySelector('#m2Close').addEventListener('click', () => { ov.style.display = 'none'; });
  }
  ov.querySelector('#m2Title').textContent = title;
  ov.querySelector('#m2Body').innerHTML = bodyHtml;
  ov.style.display = 'flex';
  return ov.querySelector('#m2Body');
}
function m2CloseModal(){ const ov = document.getElementById('m2Overlay'); if(ov) ov.style.display = 'none'; }

// Đồng bộ hiển thị: thùng hàng trên sơ đồ + xe giao hàng ở mặt tiền + biểu ngữ.
function m2Sync(){
  const x = getM2State();
  document.body.classList.toggle('m2-enter', x.step === 'inbox');
  let crate = document.getElementById('m2CrateMap');
  const m3 = getM3State(); const m3crate = m3CrateStep(m3.step);
  const at = m3crate ? [175, 268] : (x.step === 'inbox' || x.step === 'packaging' || x.step === 'quality' || x.step === 'price' || x.step === 'ledger') ? [175, 268] : (x.step === 'toProcess' || x.step === 'mail') ? [160, 402] : null;
  if(at && typeof pMap !== 'undefined' && pMap){
    if(!crate){
      crate = document.createElement('button'); crate.type = 'button'; crate.id = 'm2CrateMap'; crate.className = 'm2-crate-map'; crate.textContent = '📦';
      crate.addEventListener('click', ev => { ev.stopPropagation(); m2OpenCrate(); });
      pMap.appendChild(crate);
    }
    crate.style.left = at[0] + 'px'; crate.style.top = at[1] + 'px'; crate.style.display = '';
    crate.innerHTML = m3crate ? '📦<span class="m2-tag">Đã kiểm nhập, chờ sắp xếp</span>' : '📦';
  } else if(crate){ crate.style.display = 'none'; }
  // mặt tiền
  const fs = document.getElementById('facadeScreen');
  let dv = document.getElementById('m2Delivery'), bn = document.getElementById('m2Banner');
  const show = x.step === 'deliver' && fs && document.body.classList.contains('view-facade');
  if(show){
    if(!dv){
      dv = document.createElement('div'); dv.id = 'm2Delivery';
      dv.innerHTML = '<div class="m2-unit"></div>';
      fs.appendChild(dv);
    }
    // req #216: xe dừng GIỮA cửa nhà thuốc (phía nhà thuốc); xe máy có người lái, thùng hàng nằm trên xe, nhấp nháy.
    const unit = dv.querySelector('.m2-unit');
    unit.innerHTML = (x.vehicle === '🛵' ? M2_BIKE_SVG : M2_CAR_SVG) + '<div class="m2-say">👇 Bấm vào thùng hàng đang nhấp nháy để nhận hàng</div>';
    unit.querySelector('.m2-crate-g').addEventListener('click', ev => {
      ev.stopPropagation();
      const cur = getM2State(); cur.step = 'inbox'; saveM2State(cur);
      const msg = '✅ Nhận hàng thành công! Hãy đi vào trong nhà thuốc, đến Khu vực chờ kiểm nhập để kiểm nhập hàng.';
      pmZoneLabel.textContent = msg;
      m2FacadeToast(msg);
    });
    if(!bn){ bn = document.createElement('div'); bn.id = 'm2Banner'; fs.appendChild(bn); }
    bn.textContent = '🚚 Xe giao hàng đã dừng trước cửa nhà thuốc — bấm vào thùng hàng đang nhấp nháy để nhận hàng!';
    dv.classList.remove('leaving'); dv.classList.remove('arrived'); void dv.offsetWidth;
    setTimeout(() => dv.classList.add('arrived'), 60);
  } else {
    if(dv && x.step !== 'deliver'){ dv.classList.add('leaving'); setTimeout(() => { document.getElementById('m2Delivery')?.remove(); }, 2100); }
    else dv?.remove();
    bn?.remove();
  }
}
function m2FacadeToast(msg){
  const fs = document.getElementById('facadeScreen'); if(!fs) return;
  document.getElementById('m2Toast')?.remove();
  const t = document.createElement('div'); t.id = 'm2Toast'; t.className = ''; t.textContent = msg;
  t.style.cssText = 'position:absolute;left:50%;top:14px;transform:translateX(-50%);z-index:41;background:#2e8256;color:#fff;font:800 1rem Nunito,sans-serif;padding:10px 20px;border-radius:14px;box-shadow:0 4px 14px rgba(0,0,0,.35);max-width:90vw;text-align:center';
  fs.appendChild(t); setTimeout(() => t.remove(), 9000);
}
const M2_BIKE_SVG = `<svg viewBox="0 0 300 200" xmlns="http://www.w3.org/2000/svg" aria-label="Xe máy giao hàng">
  <circle cx="70" cy="165" r="24" fill="#222"/><circle cx="70" cy="165" r="10" fill="#999"/>
  <circle cx="225" cy="165" r="24" fill="#222"/><circle cx="225" cy="165" r="10" fill="#999"/>
  <rect x="88" y="128" width="120" height="28" rx="14" fill="#2a9df4"/>
  <rect x="56" y="82" width="16" height="78" rx="7" fill="#2a9df4" transform="rotate(-12 64 120)"/>
  <rect x="44" y="72" width="44" height="9" rx="4" fill="#333"/><circle cx="52" cy="92" r="7" fill="#ffe14a"/>
  <rect x="120" y="112" width="78" height="15" rx="7" fill="#1b1b1b"/>
  <rect x="186" y="106" width="76" height="8" fill="#555"/>
  <rect x="122" y="52" width="36" height="62" rx="14" fill="#e67e22"/>
  <rect x="128" y="112" width="15" height="48" rx="7" fill="#34495e"/>
  <line x1="150" y1="72" x2="76" y2="78" stroke="#e67e22" stroke-width="11" stroke-linecap="round"/>
  <circle cx="140" cy="36" r="17" fill="#f1c27d"/><path d="M123 36 A17 17 0 0 1 157 36 Z" fill="#c0392b"/>
  <g class="m2-crate-g"><rect x="190" y="58" width="72" height="48" rx="4" fill="#c98d3d" stroke="#7a5230" stroke-width="3"/>
    <rect x="221" y="58" width="10" height="48" fill="#e9c98a"/><text x="226" y="90" font-size="20" text-anchor="middle">📦</text></g>
</svg>`;
const M2_CAR_SVG = `<svg viewBox="0 0 300 200" xmlns="http://www.w3.org/2000/svg" aria-label="Xe van giao hàng">
  <g transform="translate(300,0) scale(-1,1)">
  <rect x="16" y="46" width="176" height="108" rx="10" fill="#f2f4f7" stroke="#9aa5b1" stroke-width="3"/>
  <path d="M192 78 H238 Q262 82 272 110 V154 H192 Z" fill="#2a9df4" stroke="#1b6fae" stroke-width="3"/>
  <path d="M204 88 H236 Q252 92 258 108 H204 Z" fill="#bfe6f7"/>
  <rect x="24" y="62" width="70" height="80" rx="6" fill="#3b3f46"/>
  <path d="M8 60 L24 62 V142 L8 146 Z" fill="#c9d0d8" stroke="#9aa5b1" stroke-width="2"/>
  <g class="m2-crate-g"><rect x="30" y="84" width="58" height="56" rx="3" fill="#c98d3d" stroke="#7a5230" stroke-width="3"/>
    <rect x="52" y="84" width="9" height="56" fill="#e9c98a"/><rect x="36" y="94" width="14" height="10" fill="#fff" opacity=".85"/></g>
  <circle cx="78" cy="160" r="23" fill="#222"/><circle cx="78" cy="160" r="10" fill="#999"/>
  <circle cx="226" cy="160" r="23" fill="#222"/><circle cx="226" cy="160" r="10" fill="#999"/>
  </g>
  <text x="164" y="108" font-size="15" font-weight="800" fill="#5b6675" text-anchor="middle">GIAO HÀNG</text>
</svg>`;
function m2OpenCrate(){
  const x = getM2State();
  if(m3Active() && m3CrateStep(getM3State().step)){ m3OpenCrate(); return; }
  if(x.step === 'inbox' || x.step === 'packaging' || x.step === 'quality' || x.step === 'price') m2RenderInspect();
  else pmZoneLabel.textContent = m2Hint();
}
function m2RenderInspect(){
  const x = getM2State();
  if(x.step === 'quality') return m2RenderQuality();
  if(x.step === 'price') return m2RenderPrice();
  if(x.step === 'packaging' || x.sub === 'pack') return m2RenderPack();
  if(x.sub === 'qty') return m2RenderQty();
  m2RenderInvoice();
}
// Đọc số tiền bằng chữ (tiếng Việt) — dùng cho dòng "Số tiền viết bằng chữ" của hoá đơn mẫu.
function viWords(n){
  const d = ['không','một','hai','ba','bốn','năm','sáu','bảy','tám','chín'];
  const three = (x, full) => {
    const tr = Math.floor(x/100), ch = Math.floor((x%100)/10), dv = x%10; let r = '';
    if(tr > 0 || full) r += d[tr] + ' trăm';
    if(ch > 1){ r += ' ' + d[ch] + ' mươi'; if(dv === 1) r += ' mốt'; else if(dv === 5) r += ' lăm'; else if(dv > 0) r += ' ' + d[dv]; }
    else if(ch === 1){ r += ' mười'; if(dv === 5) r += ' lăm'; else if(dv > 0) r += ' ' + d[dv]; }
    else if(dv > 0){ if(tr > 0 || full) r += ' lẻ'; r += ' ' + d[dv]; }
    return r.trim();
  };
  if(n === 0) return 'Không đồng chẵn';
  const units = ['', ' nghìn', ' triệu', ' tỷ'], gs = [];
  for(let x = n; x > 0; x = Math.floor(x/1000)) gs.push(x % 1000);
  const parts = [];
  for(let i = gs.length - 1; i >= 0; i--){ if(gs[i] > 0) parts.push(three(gs[i], i < gs.length - 1) + units[i]); }
  const out = parts.join(' ').replace(/\s+/g, ' ').trim();
  return out.charAt(0).toUpperCase() + out.slice(1) + ' đồng chẵn';
}
// Hoá đơn VAT MẪU (bố cục gần giống hoá đơn điện tử thật để người học làm quen; toàn bộ số liệu là GIẢ).
function m2InvoiceHtml(x){
  const fmt = v => v.toLocaleString('vi-VN');
  const now = new Date(), dd = String(now.getDate()).padStart(2,'0'), mm = String(now.getMonth()+1).padStart(2,'0');
  const rows = x.items.map((it,i) => {
    const price = 12000 + m1HashNum(it.key+'p', 0, 78) * 1000, amt = price * it.qty;
    return { i: i+1, name: it.name, nameHtml: dn(it), unit: it.unit[0].toUpperCase()+it.unit.slice(1), qty: it.qty, price, amt };
  });
  const sub = rows.reduce((a,r) => a + r.amt, 0), vat = Math.round(sub * 0.05), tot = sub + vat;
  const mst = 'MST giả ' + String(m1HashNum(x.supplierName, 100000, 999999));
  return `<div class="m2-inv" style="font-size:.74rem;line-height:1.5"><div class="wm">HOÁ ĐƠN MẪU MINH HOẠ · KHÔNG CÓ GIÁ TRỊ PHÁP LÝ</div>
    <div style="display:flex;justify-content:space-between;gap:10px;flex-wrap:wrap">
      <div style="text-align:center;flex:1 1 220px"><b style="font-size:.95rem">HÓA ĐƠN GIÁ TRỊ GIA TĂNG</b><br>(VAT INVOICE)<br>Ngày (day) ${dd} tháng (month) ${mm} năm (year) ${now.getFullYear()}</div>
      <div>Mẫu số - Ký hiệu (Serial No.): <b>1C26TMH</b><br>Số (Invoice No.): <b>00000014</b><br>Mã của Cơ quan thuế: (mẫu minh hoạ)</div></div>
    <hr style="border:0;border-top:1px solid #cdbb8a;margin:6px 0">
    <div>Đơn vị bán (Seller): <b>${esc(x.supplierName.toUpperCase())}</b><br>Mã số thuế (Tax Code): ${mst}<br>Địa chỉ (Address): (địa chỉ minh hoạ), Hà Nội<br>Số tài khoản (Account No.): (minh hoạ)</div>
    <hr style="border:0;border-top:1px solid #cdbb8a;margin:6px 0">
    <div>Người mua (Buyer):<br>Đơn vị (Company name): <b>NHÀ THUỐC THỰC HÀNH</b><br>Mã số thuế (Tax Code): MST giả 000000<br>Hình thức thanh toán (Payment method): Chuyển khoản</div>
    <table class="pos-table" style="margin-top:8px;font-size:.72rem"><thead><tr><th>STT (No.)</th><th>Tên hàng hóa, dịch vụ (Description)</th><th>Đơn vị tính (Unit)</th><th>Số lượng (Quantity)</th><th>Đơn giá (Unit Price)</th><th>Thành tiền (Amount)</th><th>Thuế suất</th><th>Tiền thuế</th></tr></thead><tbody>
      ${rows.map(r => `<tr><td>${r.i}</td><td>${r.nameHtml}</td><td>${r.unit}</td><td>${r.qty}</td><td>${fmt(r.price)}</td><td>${fmt(r.amt)}</td><td>5%</td><td>${fmt(Math.round(r.amt*0.05))}</td></tr>`).join('')}
    </tbody></table>
    <div style="text-align:right">Cộng tiền hàng (Sub total): <b>${fmt(sub)}</b><br>Tiền thuế GTGT (VAT amount): <b>${fmt(vat)}</b><br>Tổng cộng tiền thanh toán (Total payment): <b>${fmt(tot)}</b></div>
    <div>Số tiền viết bằng chữ (Amount in words): <i>${viWords(tot)}</i></div>
    <div style="display:flex;justify-content:space-between;margin-top:8px"><span>Người mua hàng (Buyer)</span><span>Người bán hàng (Seller)<br><small>(chữ ký minh hoạ — mẫu)</small></span></div></div>`;
}
function m2RenderInvoice(){
  const x = getM2State();
  const body = m2Modal('🧾 Kiểm tra hoá đơn VAT', `
    <p class="pos-note">📌 Ở Nhiệm vụ 1, bạn đã gửi đơn dự trù cho: <b>${esc(x.supplierName)}</b>.</p>
    ${m2InvoiceHtml(x)}
    <p class="pos-note" style="margin-top:8px">Đối chiếu <b>đơn vị bán (Seller)</b> trên hoá đơn với công ty bạn đã dự trù. Nếu <b>đúng</b> thì tick vào ô bên dưới để sang bước tiếp theo.</p>
    <label style="display:flex;gap:8px;align-items:center;font-weight:700;cursor:pointer"><input type="checkbox" id="m2InvTick"> Hoá đơn đúng với công ty tôi đã dự trù ở Nhiệm vụ 1</label>
    <button type="button" class="pos-btn" id="m2InvOk" style="margin-top:8px">➡️ Sang bước tiếp theo</button><div class="pos-err" id="m2Err"></div>`);
  body.querySelector('#m2InvOk').addEventListener('click', () => {
    const err = body.querySelector('#m2Err');
    if(!body.querySelector('#m2InvTick').checked){ err.textContent = '⚠️ Hãy đối chiếu tên đơn vị bán trên hoá đơn với công ty đã dự trù rồi tick vào ô xác nhận.'; return; }
    x.sub = 'qty'; saveM2State(x); m2RenderQty();
  });
}
function m2RenderQty(){
  const x = getM2State();
  const body = m2Modal('📦 Kiểm tra số lượng trong thùng', `
    <p class="pos-note">✅ Đã đối chiếu xong công ty. Kiểm tra hàng từng mặt hàng: so <b>số hộp trong thùng</b> với <b>hoá đơn</b> rồi tick <b>Khớp</b> hoặc <b>Không khớp</b>. Tick xong mới sang mặt hàng tiếp theo.</p>
    <div style="display:flex;gap:14px;flex-wrap:wrap;align-items:flex-start">
      <div style="flex:1 1 380px;min-width:0">
        <div id="m2Closed" style="text-align:center"><button type="button" class="pos-btn" id="m2OpenBox" style="font-size:1rem;padding:14px 26px">📦 Bấm vào thùng để mở</button></div>
        <div id="m2OpenWrap" class="m2-openbox" hidden></div>
      </div>
      <div style="flex:1 1 380px;min-width:0"><div style="font:800 .8rem Nunito,sans-serif;margin-bottom:4px">🧾 Hoá đơn để đối chiếu</div>${m2InvoiceHtml(x)}</div>
    </div><div class="pos-err" id="m2Err"></div>`);
  const err = body.querySelector('#m2Err'), wrap = body.querySelector('#m2OpenWrap');
  let cur = 0;
  const finish = () => {
    if(x.items.some(it => it.recv !== it.qty)){
      x.step = 'toProcess'; saveM2State(x); m2CloseModal();
      pmZoneLabel.textContent = '⚠️ Số lượng không khớp — bấm vào Khu vực hàng chờ xử lý để chuyển thùng hàng sang đó.';
    } else { x.step = 'packaging'; x.sub = 'pack'; saveM2State(x); m2RenderPack(); }
  };
  const showItem = () => {
    const it = x.items[cur];
    wrap.innerHTML = `<div class="m2-tile"><div style="font:800 .9rem Nunito,sans-serif;color:#5c3a0a;margin-bottom:4px">Mặt hàng ${cur+1}/${x.items.length}: 💊 ${dn(it)}</div>
      <div style="line-height:0">${Array.from({length: it.recv}, () => `<img class="m2-mb-img" alt="Hộp ${esc(it.name)}" src="${PHOTO_DIR}${slugify(it.name)}.jpg" onerror="this.replaceWith(Object.assign(document.createElement('span'),{className:'m2-mb'}))">`).join('')}</div>
      <div style="margin:8px 0">Tổng số hộp trong thùng: <b>${it.recv} ${it.unit}</b> · Trên hoá đơn: <b>${it.qty} ${it.unit}</b></div>
      <label style="margin-right:18px;cursor:pointer;font-weight:800"><input type="checkbox" data-v="1"> Khớp</label>
      <label style="cursor:pointer;font-weight:800"><input type="checkbox" data-v="0"> Không khớp</label></div>`;
    wrap.querySelectorAll('input[data-v]').forEach(cb => cb.addEventListener('change', () => {
      if(!cb.checked) return;
      wrap.querySelectorAll('input[data-v]').forEach(o => { if(o !== cb) o.checked = false; });
      const truth = it.recv === it.qty ? '1' : '0';
      if(cb.dataset.v !== truth){ err.textContent = '⚠️ Chưa đúng — so lại số hộp trong thùng với số lượng trên hoá đơn.'; return; }
      err.textContent = '';
      wrap.querySelectorAll('input[data-v]').forEach(o => { o.disabled = true; });
      setTimeout(() => { cur++; if(cur < x.items.length) showItem(); else finish(); }, 500);
    }));
  };
  body.querySelector('#m2OpenBox').addEventListener('click', () => { body.querySelector('#m2Closed').hidden = true; wrap.hidden = false; showItem(); });
}
function m2RenderPack(){
  const x = getM2State();
  const cards = x.items.map((it,i) => `<button type="button" data-i="${i}" class="${x.pack[i] != null ? (x.pack[i] === (it.defect ? 'bad' : 'ok') ? (x.pack[i]) : '') : ''}">${x.pack[i] != null ? (x.pack[i]==='ok'?'✅ ':'❌ ') : '🔍 '}${dn(it)}</button>`).join('');
  const body = m2Modal('🔍 Kiểm tra cảm quan bao bì', `
    <p class="pos-note">Bấm từng sản phẩm, quan sát bao bì: <b>còn nguyên vẹn, sạch sẽ</b>, không <b>móp méo</b>, <b>ẩm mốc</b>; thông tin trên bao bì <b>rõ nét</b>, không nhoè, không mờ; <b>còn hạn dùng</b>.</p>
    <div class="m2-pk">${cards}</div><div id="m2Insp"></div><div class="pos-err" id="m2Err"></div>`);
  const insp = body.querySelector('#m2Insp'), err = body.querySelector('#m2Err');
  const finishIfDone = () => {
    if(x.items.every((it,i) => x.pack[i] === (it.defect ? 'bad' : 'ok'))){
      x.step = 'quality'; saveM2State(x); m2RenderQuality();
    }
  };
  body.querySelectorAll('.m2-pk button').forEach(b => b.addEventListener('click', () => {
    const i = Number(b.dataset.i), it = x.items[i];
    err.textContent = '';
    insp.innerHTML = `<div style="text-align:center"><b>${dn(it)}</b>
      <div class="m2-pack ${it.defect || ''}" id="m2Pack"></div>
      ${PKG_FACES[it.key] ? '<details class="m2-faces"><summary>🔎 Xem các mặt hộp (số lô, hạn dùng…)</summary>' + pkgViewer(it) + '</details>' : ''}
      <button type="button" class="pos-btn" data-v="ok">✅ Bao bì đạt</button>
      <button type="button" class="pos-btn" data-v="bad" style="background:#b03a2e">❌ Bao bì không đạt</button></div>`;
    const pk = insp.querySelector('#m2Pack'), slug = slugify(it.name.split(' ')[0]);
    const label = `<div class="ph">📦 ${dn(it)}<br><small>Thông tin thuốc trên bao bì</small></div>`;
    const full = slugify(it.name);
    const slugOk = (typeof PHOTO_SLUGS !== 'undefined') ? (PHOTO_SLUGS.has(full) ? full : (PHOTO_SLUGS.has(slug) ? slug : null)) : null;
    if(slugOk){
      const im = new Image(); im.alt = it.name; im.onerror = () => { pk.innerHTML = label; }; im.src = PHOTO_DIR + slugOk + '.' + ((typeof PHOTO_EXTS !== 'undefined' && PHOTO_EXTS[0]) || 'jpg'); pk.appendChild(im);
    } else pk.innerHTML = label;
    insp.querySelectorAll('[data-v]').forEach(btn => btn.addEventListener('click', () => {
      const truth = it.defect ? 'bad' : 'ok';
      if(btn.dataset.v !== truth){ err.textContent = it.defect ? '⚠️ Quan sát kỹ lại — bao bì này có dấu hiệu không đạt.' : '⚠️ Bao bì này còn nguyên vẹn, sạch, chữ rõ nét — chưa cần loại.'; return; }
      x.pack[i] = truth; saveM2State(x);
      err.textContent = it.defect === 'expired' ? '✔ Đúng — sản phẩm đã quá hạn dùng (HSD in trên bao bì), không đạt.' : it.defect ? `✔ Đúng — bao bì ${M2_DEFECTS[it.defect]}, không đạt.` : '';
      b.classList.add(truth); b.textContent = (truth==='ok' ? '✅ ' : '❌ ') + it.name;
      insp.innerHTML = '';
      finishIfDone();
    }));
  }));
}
// ===================== req #224: bước 5–8 của nhiệm vụ 2 =====================
const M2_PROBLEMS = [
  ['qty','Số lượng thực nhận KHÔNG khớp hoá đơn'], ['dent','Bao bì móp méo, hư hỏng'], ['mold','Bao bì ẩm mốc'],
  ['blur','Thông tin trên bao bì mờ, nhoè'], ['seal','Niêm phong bị rách, không còn nguyên vẹn'],
  ['inout','Bao bì trực tiếp và bao bì ngoài không thống nhất'], ['color','Màu sắc sản phẩm bất thường'],
  ['shape','Hình dáng, thể chất sản phẩm bất thường'], ['inv','Tên đơn vị bán trên hoá đơn không đúng'],
];
const M2_REASON_TXT = { expired:'sản phẩm đã quá hạn dùng', dent:'bao bì móp méo', mold:'bao bì ẩm mốc', blur:'thông tin trên bao bì mờ, nhoè', seal:'niêm phong bị rách', inout:'bao bì trong và ngoài không thống nhất', color:'màu sắc bất thường', shape:'hình dáng, thể chất bất thường' };
function m2Reasons(it){ const r = []; if(it.defect) r.push(it.defect); if(it.q5) r.push(it.q5); return r; }
function m2PhotoUrl(name){ const sl = slugify(name); return PHOTO_SLUGS.has(sl) ? PHOTO_DIR + sl + '.jpg' : null; }
function m2SealSvg(broken){
  return `<svg viewBox="0 0 220 130" width="220" height="130" xmlns="http://www.w3.org/2000/svg" aria-label="Hộp thuốc có niêm phong">
    <rect x="20" y="30" width="180" height="80" rx="6" fill="#fff" stroke="#9aa5b1" stroke-width="3"/>
    <rect x="20" y="30" width="180" height="22" rx="6" fill="#dfe8ef"/>
    ${broken
      ? `<path d="M80 22 L100 34 L92 46 L112 40 L108 58 L60 58 Z" fill="#37a26b" transform="rotate(-8 90 40)"/><path d="M122 30 H190 V50 H130 L140 40 Z" fill="#37a26b"/><path d="M84 46 l10 14 l8 -12" stroke="#c0392b" stroke-width="2" fill="none"/>`
      : `<rect x="20" y="30" width="180" height="22" fill="#37a26b" opacity=".9"/><text x="110" y="46" font-size="12" font-weight="800" fill="#fff" text-anchor="middle">NIÊM PHONG</text>`}
    <rect x="40" y="70" width="140" height="10" rx="3" fill="#cfd8df"/><rect x="40" y="86" width="90" height="8" rx="3" fill="#dfe6ec"/></svg>`;
}
function m2InnerSvg(name){
  return `<svg viewBox="0 0 220 130" width="220" height="130" xmlns="http://www.w3.org/2000/svg" aria-label="Bao bì trực tiếp">
    <rect x="15" y="20" width="190" height="90" rx="8" fill="#e8edf1" stroke="#9aa5b1" stroke-width="3"/>
    ${[0,1,2,3,4].map(i => `<ellipse cx="${48+i*32}" cy="50" rx="11" ry="9" fill="#f7f7f7" stroke="#b8c2cb"/>`).join('')}
    <text x="110" y="88" font-size="12" font-weight="800" fill="#33526f" text-anchor="middle">${esc(name.slice(0,22))}</text>
    <text x="110" y="102" font-size="9" fill="#5b6675" text-anchor="middle">Lô sản xuất — HSD (minh hoạ)</text></svg>`;
}
function m2PillSvg(kind){
  const base = kind === 'color' ? '#d9b44a' : '#fbfbfb', edge = kind === 'color' ? '#8a6a1a' : '#b8c2cb';
  const pills = [0,1,2,3,4,5].map(i => {
    const cx = 40 + (i%3)*60, cy = 40 + Math.floor(i/3)*44;
    if(kind === 'shape' && (i === 1 || i === 4)) return `<path d="M${cx-16} ${cy} A16 14 0 0 1 ${cx+2} ${cy-13} L${cx-3} ${cy+2} L${cx+6} ${cy+12} A16 14 0 0 1 ${cx-16} ${cy} Z" fill="${base}" stroke="${edge}"/><circle cx="${cx+14}" cy="${cy+10}" r="2" fill="${base}" stroke="${edge}"/><circle cx="${cx+20}" cy="${cy+4}" r="1.5" fill="${base}" stroke="${edge}"/>`;
    return `<ellipse cx="${cx}" cy="${cy}" rx="18" ry="14" fill="${base}" stroke="${edge}" stroke-width="1.5"/>${kind === 'color' && i%2 ? `<circle cx="${cx-4}" cy="${cy-3}" r="3" fill="#7a5a12"/>` : ''}<line x1="${cx-8}" y1="${cy}" x2="${cx+8}" y2="${cy}" stroke="${edge}" stroke-width="1" opacity=".6"/>`;
  }).join('');
  return `<svg viewBox="0 0 220 110" width="220" height="110" xmlns="http://www.w3.org/2000/svg" aria-label="Sản phẩm"><rect x="5" y="5" width="210" height="100" rx="8" fill="#f2f4f7"/>${pills}</svg>`;
}
function m2RenderQuality(){
  const x = getM2State();
  x.q5ok = x.q5ok || {};
  const cards = () => x.items.map((it,i) => `<button type="button" data-i="${i}" class="${x.q5ok[i] ? (it.q5 ? 'bad' : 'ok') : ''}">${x.q5ok[i] ? (it.q5 ? '❌ ' : '✅ ') : '🔬 '}${dn(it)} <small>(${it.sealed ? 'có niêm phong' : 'không niêm phong'})</small></button>`).join('');
  const body = m2Modal('🔬 Bước 5 — Kiểm tra chất lượng bằng cảm quan', `
    <p class="pos-note">Bấm từng sản phẩm. <b>Có niêm phong:</b> kiểm tra niêm phong còn nguyên vẹn. <b>Không có niêm phong:</b> kiểm tra bao bì trực tiếp và bao bì ngoài có thống nhất không, rồi quan sát sản phẩm (màu sắc, thể chất, hình dáng…).</p>
    <div class="m2-pk" id="m2Cards">${cards()}</div><div id="m2Insp"></div><div class="pos-err" id="m2Err"></div>`);
  const insp = body.querySelector('#m2Insp'), err = body.querySelector('#m2Err');
  const refresh = () => { body.querySelector('#m2Cards').innerHTML = cards(); bind(); };
  const finish = () => {
    if(!x.items.every((it,i) => x.q5ok[i])) return;
    const fails = x.items.filter(it => m2Reasons(it).length);
    if(fails.length){
      x.step = 'toProcess'; x.mailKind = 'quality'; saveM2State(x); m2CloseModal();
      pmZoneLabel.textContent = '⚠️ Bước 6: có sản phẩm không đạt — bấm vào Khu vực hàng chờ xử lý để chuyển sản phẩm đó sang.';
    } else { x.step = 'price'; saveM2State(x); m2RenderPrice(); }
  };
  const bind = () => body.querySelectorAll('#m2Cards button').forEach(b => b.addEventListener('click', () => {
    const i = Number(b.dataset.i), it = x.items[i]; err.textContent = '';
    if(x.q5ok[i]) return;
    const photo = m2PhotoUrl(it.name);
    const other = x.items.find(o => o !== it) || it;
    if(it.sealed){
      insp.innerHTML = `<div style="text-align:center"><b>${dn(it)}</b> — bao bì có niêm phong<div>${m2SealSvg(it.q5 === 'seal')}</div>
        <label style="margin-right:14px"><input type="radio" name="q5s" value="ok"> Niêm phong còn nguyên vẹn</label>
        <label><input type="radio" name="q5s" value="bad"> Niêm phong bị rách, hở</label>
        <div style="margin-top:8px"><button type="button" class="pos-btn" id="q5Ok">Xác nhận sản phẩm này</button></div></div>`;
    } else {
      const grp = (nm, a, b) => `<div style="margin:4px 0"><label style="margin-right:14px"><input type="radio" name="${nm}" value="ok"> ${a}</label><label><input type="radio" name="${nm}" value="bad"> ${b}</label></div>`;
      insp.innerHTML = `<div style="text-align:center"><b>${dn(it)}</b> — bao bì không có niêm phong
        <div style="display:flex;gap:8px;flex-wrap:wrap;justify-content:center;margin:6px 0">
          <div><small>Bao bì ngoài</small><br>${photo ? `<img src="${photo}" alt="" style="width:150px;height:110px;object-fit:contain;background:#fff;border:1px solid #d8c9a3;border-radius:6px">` : `<div class="ph">${esc(it.name)}</div>`}</div>
          <div><small>Bao bì trực tiếp</small><br>${m2InnerSvg(it.q5 === 'inout' ? other.name : it.name)}</div>
          <div><small>Sản phẩm</small><br>${m2PillSvg(it.q5)}</div></div>
        <div style="text-align:left;display:inline-block">
          ${grp('q5a','Bao bì trong và ngoài thống nhất','Không thống nhất')}
          ${grp('q5b','Màu sắc bình thường','Màu sắc bất thường')}
          ${grp('q5c','Hình dáng, thể chất bình thường','Hình dáng, thể chất bất thường')}</div>
        <div style="margin-top:8px"><button type="button" class="pos-btn" id="q5Ok">Xác nhận sản phẩm này</button></div></div>`;
    }
    insp.querySelector('#q5Ok').addEventListener('click', () => {
      const v = n => insp.querySelector(`input[name=${n}]:checked`)?.value;
      let ok;
      if(it.sealed){ const a = v('q5s'); if(!a){ err.textContent = '⚠️ Chọn tình trạng niêm phong.'; return; } ok = (a === 'bad') === (it.q5 === 'seal'); }
      else {
        const a = v('q5a'), c = v('q5b'), d = v('q5c'); if(!a || !c || !d){ err.textContent = '⚠️ Chọn đủ 3 nhận xét.'; return; }
        ok = (a === 'bad') === (it.q5 === 'inout') && (c === 'bad') === (it.q5 === 'color') && (d === 'bad') === (it.q5 === 'shape');
      }
      if(!ok){ err.textContent = '⚠️ Chưa đúng — quan sát kỹ lại hình ảnh rồi chọn lại.'; return; }
      x.q5ok[i] = true; saveM2State(x); err.textContent = it.q5 ? `✔ Đúng — ${M2_REASON_TXT[it.q5]}, sản phẩm không đạt.` : '✔ Đúng — sản phẩm đạt yêu cầu cảm quan.';
      insp.innerHTML = ''; refresh(); finish();
    });
  }));
  bind();
}
// Bước 7: niêm yết giá bán cho sản phẩm ĐẠT — tính trên đơn vị đóng gói NHỎ NHẤT (viên, ống, lọ, tuýp…).
function m2RenderPrice(){
  const x = getM2State();
  const pass = x.items.filter(it => !m2Reasons(it).length);
  if(!pass.length){ x.step = 'done'; saveM2State(x); m2FinishDone(); return; }
  // req #237: chỉ hiện GIÁ NHẬP (sau VAT) theo đơn vị nhỏ nhất và ô GIÁ BÁN. Giá bán ≥ giá nhập → đồng ý;
  // thấp hơn giá nhập → hỏi lại "có chắc chắn không", người học xác nhận thì vẫn đồng ý.
  const cost = it => (m1PkgPrice(it) * 1.05) / m1PackInfo(it).per;
  const fmt = v => v.toLocaleString('vi-VN', { maximumFractionDigits: 1 });
  const body = m2Modal('🏷️ Bước 7 — Niêm yết giá bán', `
    <p class="pos-note">Ghi <b>giá bán</b> cho các sản phẩm <b>đạt</b>, tính theo <b>đơn vị đóng gói nhỏ nhất</b> (viên, ống, lọ, tuýp…).</p>
    <table class="pos-table"><thead><tr><th>Sản phẩm</th><th>Quy cách</th><th>Giá nhập (sau VAT) / đơn vị nhỏ nhất</th><th>Giá bán niêm yết / đơn vị nhỏ nhất (đ)</th></tr></thead><tbody>
      ${pass.map((it,i) => `<tr><td>${dn(it)}</td><td>${m1PackInfo(it).spec}</td>
        <td><b>${fmt(cost(it))} đ/${m1PackInfo(it).unit}</b></td>
        <td><input type="text" inputmode="decimal" autocomplete="off" data-s="${i}" style="width:90px;padding:4px 6px;border:1px solid #caa25a;border-radius:6px"> đ/${m1PackInfo(it).unit}</td></tr>`).join('')}
    </tbody></table><button type="button" class="pos-btn" id="m2PriceOk">✅ Niêm yết giá</button><div class="pos-err" id="m2Err"></div><div id="m2PriceAsk"></div>`);
  const ask = body.querySelector('#m2PriceAsk');
  body.querySelector('#m2PriceOk').addEventListener('click', () => {
    const err = body.querySelector('#m2Err'); err.textContent = ''; ask.innerHTML = '';
    const low = [];
    for(let i = 0; i < pass.length; i++){
      const sv = body.querySelector(`[data-s="${i}"]`).value, it = pass[i];
      if(sv === '' || !(viMoney(sv) > 0)){ err.textContent = '⚠️ Nhập giá bán cho tất cả sản phẩm.'; return; }
      if(viMoney(sv) < cost(it)) low.push(`${esc(it.name)} (${fmt(viMoney(sv))} đ &lt; giá nhập ${fmt(cost(it))} đ)`);
    }
    if(low.length){
      ask.innerHTML = `<div class="pos-note" style="background:#fff1e6;border:1px solid #e0a070;border-radius:8px;padding:8px 10px;margin-top:8px">⚠️ Giá bán của <b>${low.join(', ')}</b> thấp hơn giá nhập. Bạn có chắc chắn bán thấp hơn giá nhập không?<br>
        <button type="button" class="pos-btn" id="m2LowYes" style="margin-top:6px">Có, vẫn niêm yết</button> <button type="button" class="pos-btn" id="m2LowNo" style="margin-top:6px;background:#9aa89f">Sửa lại giá</button></div>`;
      ask.querySelector('#m2LowNo').addEventListener('click', () => { ask.innerHTML = ''; });
      ask.querySelector('#m2LowYes').addEventListener('click', done);
      return;
    }
    done();
  });
  function done(){
    x.step = 'ledger'; saveM2State(x); m2CloseModal();
    pmZoneLabel.textContent = '📒 Bước 8: đến Quầy thu ngân, mở máy tính → tab Thực nhập để ghi sổ kiểm nhập.';
  }
}
// req #224 (bước 8): người học không thể nhớ hết thông tin để điền sổ → cho xem lại bao bì nhiều mặt + hoá đơn.
// Thông tin KHÔNG liệt kê sẵn: người học tự đọc trên các mặt bao bì (trước / sau / bên).
// req #235 (29/10): thuốc có ảnh chụp thật → số lô ("Số kiểm soát") và hạn dùng lấy đúng theo danh mục, khớp số in trên ảnh
// để người học đối chiếu khi quan sát bao bì. Thuốc chưa có ảnh và hàng tồn trong tủ vẫn dùng lô/hạn minh hoạ.
function pkgRealLot(it, rec){
  if(!(it && it.key && typeof PKG_FACES !== 'undefined' && PKG_FACES[it.key])) return null;
  const lot = (rec || {})['Số kiểm soát'], exp = (rec || {})['Hạn sử dụng'];
  return lot && exp ? { lot, exp, realLot: true } : null;
}
function pkgExpired(it){
  const r = pkgRealLot(it, it && it.key && m1RecOf(it.key)); if(!r) return false;
  const m = String(r.exp).match(/(\d{1,2})\/(\d{1,2})\/(\d{4})/);
  return !!m && new Date(+m[3], m[2]-1, +m[1], 23, 59) < new Date();
}
function pkgData(it){
  const rec = (it.key && m1RecOf(it.key)) || allRecords.find(r => r['Tên hoạt chất'] === it.name || r._gen === it.name) || {};
  const k = it.key || it.name, d = new Date();
  const base = (typeof getM1Items === 'function' ? getM1Items().find(a => a.key === it.key) : null) || it;
  const pack = m1PackInfo({ name: it.name, key: k });
  const cold = it.cold != null ? !!it.cold : m1IsCold(rec);
  const maker = [rec['Nơi sản xuất'], rec['Nước sản xuất']].filter(Boolean).join(' – ');
  return { name: it.name, brand: rec['Tên biệt dược'] || '', strength: rec['Hoạt chất, hàm lượng/nồng độ'] || '',
    form: [rec['Dạng bào chế'], rec['Đường dùng'] ? 'Đường dùng: ' + rec['Đường dùng'] : ''].filter(Boolean).join(' · '),
    maker: maker || 'Công ty SX (minh hoạ)', realReg: !!rec['Số đăng ký'],
    reg: rec['Số đăng ký'] || `VD-${10000 + m1HashNum(k+'dk',0,89999)}-24`,
    ...(pkgRealLot(it, rec) || { lot: `LO${m1HashNum(k+'lo',1000,9999)}`, exp: `${String(m1HashNum(k+'hd',1,12)).padStart(2,'0')}/${d.getFullYear()+2}`, realLot: false }),
    store: rec['Điều kiện bảo quản'] || (cold ? 'Bảo quản trong tủ lạnh 2–8°C, tránh ánh sáng, không để đông băng.' : 'Bảo quản nơi khô, nhiệt độ không quá 30°C, tránh ánh sáng.'),
    spec: pack.spec, kind: ksdbKind(rec), rx: (it.cabinet === 'rx' || base.cabinet === 'rx' || (rec['STT Buổi'] && drugClass(rec) === 'rx')) };
}
// req #224/#235: ảnh chụp THẬT các mặt hộp thuốc (từ cột "Link google drive" của Danh mục 1) — có thì người học
// đọc thông tin trực tiếp trên bao bì thật; thuốc chưa có ảnh vẫn dùng bao bì dựng 3 mặt bên dưới.
// Chỉ mục ảnh: khoá "Buổi|Tên thuốc" → thư mục + số ảnh (sinh từ cột Link google drive của danh mục 1)
const PKG_FACES = {"Buổi 2|Metoprolol vỉ":{"dir":"buoi-2-metoprolol-vi","n":8},"Buổi 2|Adrenalin ống tiêm":{"dir":"buoi-2-adrenalin-ong-tiem","n":7},"Buổi 2|Atropin sulfas ống tiêm":{"dir":"buoi-2-atropin-sulfas-ong-tiem","n":6},"Buổi 2|Dopegyt vỉ":{"dir":"buoi-2-dopegyt-vi","n":6},"Buổi 2|Xylomethazolin nhỏ mắt":{"dir":"buoi-2-xylomethazolin-nho-mat","n":7},"Buổi 2|Atenolol vỉ":{"dir":"buoi-2-atenolol-vi","n":6},"Buổi 2|Salbutamol vỉ":{"dir":"buoi-2-salbutamol-vi","n":4},"Buổi 3|Haloperidol vỉ":{"dir":"buoi-3-haloperidol-vi","n":4},"Buổi 4|Paracetamol vỉ":{"dir":"buoi-4-paracetamol-vi","n":6},"Buổi 4|Hapacol gói":{"dir":"buoi-4-hapacol-goi","n":6},"Buổi 4|Decolgen vỉ":{"dir":"buoi-4-decolgen-vi","n":6},"Buổi 4|Voltaren tuyp":{"dir":"buoi-4-voltaren-tuyp","n":12},"Buổi 4|Diclofenac vỉ":{"dir":"buoi-4-diclofenac-vi","n":9},"Buổi 4|Meloxicam (hoặc Mebilax hoặc Mobic) vỉ":{"dir":"buoi-4-meloxicam-hoac-mebilax-hoac-mobic-vi","n":9},"Buổi 4|Alphachymochipsin":{"dir":"buoi-4-alphachymochipsin","n":8},"Buổi 4|Aspirin vỉ":{"dir":"buoi-4-aspirin-vi","n":6},"Buổi 4|Indomethacin vỉ":{"dir":"buoi-4-indomethacin-vi","n":7},"Buổi 4|Alaxan vỉ":{"dir":"buoi-4-alaxan-vi","n":7},"Buổi 4|Pharmaton vỉ":{"dir":"buoi-4-pharmaton-vi","n":5},"Buổi 4|Uniferon B9 vỉ":{"dir":"buoi-4-uniferon-b9-vi","n":8},"Buổi 4|Folacid vỉ":{"dir":"buoi-4-folacid-vi","n":7},"Buổi 4|Vitamin B6 vỉ":{"dir":"buoi-4-vitamin-b6-vi","n":5},"Buổi 4|Vitamin PP vỉ":{"dir":"buoi-4-vitamin-pp-vi","n":7},"Buổi 4|Vitamin B12 ống tiêm":{"dir":"buoi-4-vitamin-b12-ong-tiem","n":4},"Buổi 4|Vitamin E vỉ":{"dir":"buoi-4-vitamin-e-vi","n":7},"Buổi 4|Vitamin B1 vỉ":{"dir":"buoi-4-vitamin-b1-vi","n":7},"Buổi 4|Dịch truyền NaCl 0,9%":{"dir":"buoi-4-dich-truyen-nacl-0-9","n":2},"Buổi 5|Loratadin vỉ":{"dir":"buoi-5-loratadin-vi","n":8},"Buổi 5|Clorpheniramin vỉ":{"dir":"buoi-5-clorpheniramin-vi","n":7},"Buổi 5|Acyclovir tuyp":{"dir":"buoi-5-acyclovir-tuyp","n":7},"Buổi 6|Digoxin vỉ":{"dir":"buoi-6-digoxin-vi","n":6},"Buổi 6|Furosemid vỉ":{"dir":"buoi-6-furosemid-vi","n":5},"Buổi 6|Telmisartan vỉ":{"dir":"buoi-6-telmisartan-vi","n":7},"Buổi 6|Nifedipin vỉ":{"dir":"buoi-6-nifedipin-vi","n":6},"Buổi 7|Betamethason tuyp":{"dir":"buoi-7-betamethason-tuyp","n":9},"Buổi 8|Atorvastatin 10mg vỉ":{"dir":"buoi-8-atorvastatin-10mg-vi","n":7},"Buổi 8|Atoris 20mg vỉ":{"dir":"buoi-8-atoris-20mg-vi","n":9},"Buổi 8|Glucovance vỉ":{"dir":"buoi-8-glucovance-vi","n":12},"Buổi 9|Amoxicillin vỉ":{"dir":"buoi-9-amoxicillin-vi","n":7},"Buổi 9|Penicillin lọ":{"dir":"buoi-9-penicillin-lo","n":3},"Buổi 9|Cefuroxime lọ":{"dir":"buoi-9-cefuroxime-lo","n":6},"Buổi 9|Cefalexin vỉ":{"dir":"buoi-9-cefalexin-vi","n":6},"Buổi 9|Cefotaxime lọ":{"dir":"buoi-9-cefotaxime-lo","n":7},"Buổi 9|Cefuroxime vỉ":{"dir":"buoi-9-cefuroxime-vi","n":6},"Buổi 9|Cefixime vỉ":{"dir":"buoi-9-cefixime-vi","n":6},"Buổi 9|Ery child gói bột":{"dir":"buoi-9-ery-child-goi-bot","n":4},"Buổi 9|Tetracyclin vỉ":{"dir":"buoi-9-tetracyclin-vi","n":7},"Buổi 9|Tetracyclin tuyp":{"dir":"buoi-9-tetracyclin-tuyp","n":5},"Buổi 9|Doxycicllin vỉ":{"dir":"buoi-9-doxycicllin-vi","n":5},"Buổi 9|Lincomycin vỉ":{"dir":"buoi-9-lincomycin-vi","n":8},"Buổi 9|Metronidazol vỉ":{"dir":"buoi-9-metronidazol-vi","n":6},"Buổi 9|Levofloxacin vỉ":{"dir":"buoi-9-levofloxacin-vi","n":6},"Buổi 9|Ciprofloxacin vỉ":{"dir":"buoi-9-ciprofloxacin-vi","n":5},"Buổi 9|Trimeseptol vỉ":{"dir":"buoi-9-trimeseptol-vi","n":8},"Buổi 9|Amoxicillin (875mg), Clavulanic acid (125mg)":{"dir":"buoi-9-amoxicillin-875mg-clavulanic-acid-125mg","n":9},"Buổi 10|Berberin lọ":{"dir":"buoi-10-berberin-lo","n":2},"Buổi 10|Omeprazol vỉ":{"dir":"buoi-10-omeprazol-vi","n":7},"Buổi 10|Pantoprazol vỉ":{"dir":"buoi-10-pantoprazol-vi","n":7},"Buổi 10|Nospa vỉ":{"dir":"buoi-10-nospa-vi","n":9},"Buổi 10|Phosphaslugel gói":{"dir":"buoi-10-phosphaslugel-goi","n":6},"Buổi 10|Hydrasec gói":{"dir":"buoi-10-hydrasec-goi","n":8},"Buổi 11|Methophan vỉ":{"dir":"buoi-11-methophan-vi","n":9},"Buổi 11|Acemuc gói":{"dir":"buoi-11-acemuc-goi","n":8},"Buổi 5|Cetirizine vỉ":{"dir":"buoi-5-cetirizine-vi","n":5},"Buổi 7|Methyl prednisolon vỉ":{"dir":"buoi-7-methyl-prednisolon-vi","n":6},"Buổi 9|Ampicillin vỉ":{"dir":"buoi-9-ampicillin-vi","n":5},"Buổi 9|Gentamicin nhỏ mắt":{"dir":"buoi-9-gentamicin-nho-mat","n":6},"Buổi 9|Erythromycin vỉ":{"dir":"buoi-9-erythromycin-vi","n":9},"Buổi 10|Maloox vỉ":{"dir":"buoi-10-maloox-vi","n":6}};
// Bao bì 3 mặt: trước (ảnh thật nếu có) · sau (thành phần, số ĐK, lô, HSD, nhà SX) · bên (bảo quản, quy cách, lưu ý)
function pkgViewer(it){
  const real = it.key && PKG_FACES[it.key];
  if(real && real.n){
    const faces = Array.from({ length: real.n }, (_, i) => `<div class="pkg-face" data-face="p${i}"${i ? ' hidden' : ''}><img loading="lazy" src="hop-thuoc/mat/${real.dir}/${i+1}.jpg" alt="${esc(it.name)} — ảnh ${i+1}"></div>`).join('');
    const btns = Array.from({ length: real.n }, (_, i) => `<button type="button"${i ? '' : ' class="on"'} data-f="p${i}">Ảnh ${i+1}</button>`).join('');
    return `<div class="pkg" data-pkg><div class="pkg-tabs">${btns}<button type="button" class="zoom" data-zoom>🔍 Phóng to</button></div>${faces}<div class="fine" style="font-size:.72rem;color:#6b7a90;margin-top:4px">Ảnh chụp các mặt hộp thuốc thật — bấm Ảnh 1, Ảnh 2… để xem từng mặt.</div></div>`;
  }
  const dd = pkgData(it), photo = m2PhotoUrl(it.name), e = esc;
  const banner = (['narc','psy','pre'].includes(dd.kind) ? `<div class="bn">${M3_KIND[dd.kind].toUpperCase()}</div>` : '') + (dd.rx ? '<div class="bn rx">Rx · Thuốc bán theo đơn</div>' : '');
  const front = `<div class="pkg-face" data-face="front">${photo ? `<img src="${photo}" alt="Mặt trước ${e(it.name)}" onerror="this.remove()">` : ''}<div class="pkg-gen">${banner}<h4>${e(dd.brand || it.name)}</h4><div>${e(dd.strength)}</div><div>${e(dd.form)}</div><div class="fine">Hộp thuốc — mặt trước (hình minh hoạ)</div></div></div>`;
  const back = `<div class="pkg-face" data-face="back" hidden><div class="pkg-gen">${banner}<h4>${e(it.name)}</h4><table><tbody>
      <tr><th>Thành phần / hàm lượng</th><td>${e(dd.strength || it.name)}</td></tr>${dd.form ? `<tr><th>Dạng bào chế</th><td>${e(dd.form)}</td></tr>` : ''}<tr><th>Số đăng ký (SĐK)</th><td>${e(dd.reg)}${dd.realReg ? '' : ' <small>(số minh hoạ)</small>'}</td></tr>
      <tr><th>Số lô SX</th><td>${dd.lot}${dd.realLot ? '' : ' <small>(minh hoạ)</small>'}</td></tr><tr><th>Hạn dùng (HSD)</th><td>${dd.exp}${dd.realLot ? '' : ' <small>(minh hoạ)</small>'}</td></tr><tr><th>Nhà sản xuất</th><td>${e(dd.maker)}</td></tr></tbody></table></div></div>`;
  const side = `<div class="pkg-face" data-face="side" hidden><div class="pkg-gen">${banner}<table><tbody>
      <tr><th>Bảo quản</th><td>${e(dd.store)}</td></tr><tr><th>Quy cách đóng gói</th><td>${e(dd.spec)}</td></tr></tbody></table>
      <div class="fine">Đọc kỹ hướng dẫn sử dụng trước khi dùng. Để xa tầm tay trẻ em.</div></div></div>`;
  return `<div class="pkg" data-pkg><div class="pkg-tabs"><button type="button" class="on" data-f="front">Mặt trước</button><button type="button" data-f="back">Mặt sau</button><button type="button" data-f="side">Mặt bên</button><button type="button" class="zoom" data-zoom>🔍 Phóng to</button></div>${front}${back}${side}</div>`;
}
document.addEventListener('click', ev => {
  const b = ev.target.closest && ev.target.closest('[data-pkg] .pkg-tabs button');
  if(!b) return;
  const root = b.closest('[data-pkg]');
  if(b.hasAttribute('data-zoom')){
    const cur = root.querySelector('.pkg-face:not([hidden])'); if(!cur) return;
    let ov = document.getElementById('m2ZoomOverlay');
    if(!ov){ ov = document.createElement('div'); ov.className = 'overlay'; ov.id = 'm2ZoomOverlay'; document.body.appendChild(ov); ov.addEventListener('click', () => { ov.style.display = 'none'; }); }
    ov.innerHTML = ''; const c = cur.cloneNode(true); c.hidden = false; ov.appendChild(c); ov.style.display = 'flex';
    return;
  }
  root.querySelectorAll('.pkg-tabs button[data-f]').forEach(x => x.classList.toggle('on', x === b));
  root.querySelectorAll('.pkg-face').forEach(f => { f.hidden = f.dataset.face !== b.dataset.f; });
});
function m2RenderRef(idx){
  const x = getM2State(), pass = x.items.filter(it => !m2Reasons(it).length);
  let ov = document.getElementById('m2RefOverlay');
  if(!ov){
    ov = document.createElement('div'); ov.className = 'overlay ref-dock'; ov.id = 'm2RefOverlay';
    ov.innerHTML = '<div class="modal pos-modal"><div class="modal-head"><div><h2>🔎 Xem lại bao bì và hoá đơn để điền sổ</h2><div class="sub">Bấm từng mặt / từng ảnh để đọc thông tin trên bao bì</div></div><button type="button" id="m2RefClose">✕</button></div><div class="modal-body pos-body" id="m2RefBody"></div></div>';
    document.body.appendChild(ov);
    ov.querySelector('#m2RefClose').addEventListener('click', m2CloseRef);
  }
  const it = pass[idx];
  const tabs = pass.map((p,i) => `<button type="button" class="pos-btn" data-r="${i}" style="${i === idx ? '' : 'background:#9aa89f'};margin:0 6px 6px 0">${esc(p.name)}</button>`).join('');
  const body = ov.querySelector('#m2RefBody');
  body.innerHTML = `<div>${tabs}</div>
    <div style="display:flex;gap:14px;flex-wrap:wrap;align-items:flex-start">
      <div style="flex:1 1 360px;min-width:0">
        <div style="font:800 .8rem Nunito,sans-serif;margin-bottom:4px">📦 Hộp thuốc: ${dn(it)}</div>
        ${pkgViewer(it)}
        <p class="pos-note" style="margin-top:8px">Số lượng thực nhận (đã đếm ở bước kiểm tra số lượng): <b>${it.recv} ${it.unit}</b>. Đơn giá, số lượng đặt: xem <b>hoá đơn</b> bên cạnh.</p></div>
      <div style="flex:1 1 380px;min-width:0"><div style="font:800 .8rem Nunito,sans-serif;margin-bottom:4px">🧾 Hoá đơn</div>${m2InvoiceHtml(x)}</div></div>`;
  body.querySelectorAll('[data-r]').forEach(b => b.addEventListener('click', () => m2RenderRef(Number(b.dataset.r))));
  ov.style.display = 'flex'; document.body.classList.add('ref-open');
}
function m2CloseRef(){ const ov = document.getElementById('m2RefOverlay'); if(ov) ov.style.display = 'none'; document.body.classList.remove('ref-open'); }
// Bước 8: sổ kiểm nhập (tab "Thực nhập" của phần mềm bán hàng) theo biểu mẫu cô gửi.
function renderThucNhapTab(){
  const x = getM2State();
  if(x.step !== 'ledger'){ posPanel.innerHTML = '<div class="pos-soon">🔒 Tab này dùng ở Nhiệm vụ 2 (bước 8 — ghi sổ kiểm nhập) sau khi đã niêm yết giá.</div>'; return; }
  const pass = x.items.filter(it => !m2Reasons(it).length);
  const d = new Date(), dt = `${String(d.getDate()).padStart(2,'0')}/${String(d.getMonth()+1).padStart(2,'0')}/${d.getFullYear()}`;
  const rec = it => m1RecOf(it.key) || allRecords.find(r => r['Tên hoạt chất'] === it.name || r._gen === it.name) || {};
  const specs = () => [...new Set(['Hộp 3 vỉ × 10 viên','Hộp 10 vỉ × 10 viên','Hộp 10 ống','Hộp 1 lọ','Hộp 1 tuýp','Hộp 20 gói','Hộp 30 viên','Hộp 100 viên', ...pass.map(it => m1PackInfo(it).spec)])].sort((a,b) => a.localeCompare(b, 'vi', { numeric:true }));
  const sel = (nm, opts) => `<select data-f="${nm}" style="padding:3px;border:1px solid #caa25a;border-radius:6px;max-width:130px"><option value="">— chọn —</option>${opts.map(o => `<option>${esc(o)}</option>`).join('')}</select>`;
  const th = ['Ngày/tháng/năm','Tên thuốc, hàm lượng nồng độ','Số ĐK/GPNK','Số lô, hạn dùng','Nhà SX/nhập khẩu','Cơ sở cung cấp','Số hóa đơn/chứng từ','Điều kiện bảo quản','Quy cách đóng gói','Số lượng','Đơn vị tính','Đơn giá (đ, chưa VAT)'];
  posPanel.innerHTML = `
    <div class="ledger-title">SỔ NHẬP VÀ KIỂM SOÁT CHẤT LƯỢNG THUỐC</div>
    <p class="pos-note">📒 <b>Sổ kiểm nhập thuốc</b> (mẫu). Các cột thông tin đã điền từ hoá đơn và nhãn; điền nốt <b>điều kiện bảo quản, quy cách đóng gói, số lượng, đơn vị tính, đơn giá</b> cho các sản phẩm đạt. Không nhớ thông tin? Bấm <b>🔎 Xem lại hình</b> ở từng dòng: bao bì và hoá đơn mở ở bên phải, sổ vẫn hiện bên trái để vừa đối chiếu vừa điền.</p>
    <div style="overflow-x:auto"><table class="pos-table" style="font-size:.72rem;min-width:900px"><thead><tr>${th.map(h => `<th>${h}</th>`).join('')}</tr></thead><tbody>
      ${pass.map((it,i) => { const r = rec(it), pk = pkgData(it); return `<tr data-i="${i}"><td>${dt}<br><button type="button" class="pos-btn m2-ref" data-r="${i}" style="padding:3px 8px;font-size:.7rem;margin-top:4px">🔎 Xem lại hình</button></td><td>${dn(it)}</td>
        <td>${esc(pk.reg)}${pk.realReg ? '' : ' <small>(số minh hoạ)</small>'}</td><td>${pk.lot} / ${pk.exp}</td>
        <td>${esc(pk.maker)}</td><td>${esc(x.supplierName)}</td><td>00000014</td>
        <td>${sel('cold', ['Nhiệt độ thường, dưới 30°C, tránh ánh sáng','Tủ lạnh 2–8°C'])}</td><td>${sel('spec', specs())}</td>
        <td><input type="number" min="0" data-f="qty" style="width:64px;padding:3px;border:1px solid #caa25a;border-radius:6px"></td>
        <td>${sel('unit', ['hộp','lọ','vỉ','viên','ống','tuýp','gói','túi'])}</td>
        <td><input type="text" inputmode="decimal" autocomplete="off" data-f="price" style="width:84px;padding:3px;border:1px solid #caa25a;border-radius:6px"></td></tr>`; }).join('')}
    </tbody></table></div>
    <button type="button" class="pos-btn" id="m2LedgerOk">📝 Ghi sổ</button><div class="pos-err" id="m2LedErr"></div>`;
  posPanel.querySelectorAll('.m2-ref').forEach(b => b.addEventListener('click', () => m2RenderRef(Number(b.dataset.r))));
  document.getElementById('m2LedgerOk').addEventListener('click', () => {
    const err = document.getElementById('m2LedErr');
    for(const tr of posPanel.querySelectorAll('tbody tr')){
      const it = pass[Number(tr.dataset.i)], g = n => tr.querySelector(`[data-f="${n}"]`).value;
      if(!g('cold') || !g('spec') || g('qty') === '' || !g('unit') || g('price') === ''){ err.textContent = '⚠️ Điền đủ các ô của tất cả sản phẩm.'; return; }
      if((g('cold').startsWith('Tủ lạnh')) !== !!it.cold){ err.textContent = `⚠️ Điều kiện bảo quản của "${it.name}" chưa đúng — đọc lại nhãn bảo quản.`; return; }
      if(g('spec') !== m1PackInfo(it).spec){ err.textContent = `⚠️ Quy cách đóng gói của "${it.name}" chưa đúng.`; return; }
      if(Number(g('qty')) !== it.recv){ err.textContent = `⚠️ Số lượng của "${it.name}" chưa đúng — theo số thực nhận.`; return; }
      if(g('unit') !== (m1PackInfo(it).big || it.unit)){ err.textContent = `⚠️ Đơn vị tính của "${it.name}" chưa đúng — đơn vị đóng gói lớn nhất (hộp, lọ…).`; return; }
      if(!(Math.abs(viMoney(g('price')) - m1PkgPrice(it)) <= 1)){ err.textContent = `⚠️ Đơn giá của "${it.name}" chưa đúng — lấy giá nhập trên hoá đơn (chưa VAT).`; return; }
    }
    x.step = 'done'; saveM2State(x); m2FinishDone();
  });
}
function m2FinishDone(){
  try{ localStorage.setItem(LS_M2N, String(m2Count() + 1)); }catch(e){}
  m2RoundIfLast();
  const msg = '🎉 Hoàn thành nhiệm vụ 2: đã kiểm nhập, niêm yết giá và ghi sổ.';
  const ov = document.getElementById('m2Overlay');
  if(ov && ov.style.display !== 'none') ov.querySelector('#m2Body').innerHTML = `<div class="pos-soon" style="color:#1f7a3d">${msg}</div>`;
  else posPanel.innerHTML = `<div class="pos-soon" style="color:#1f7a3d">${msg}</div>`;
  pmZoneLabel.textContent = msg;
  window.refreshMissionsList?.();
}
// ===================== req #225: NHIỆM VỤ 3 — Bảo quản thuốc và sắp xếp hàng hoá =====================
// Chỉ mở khoá khi đã hoàn thành tối thiểu 1 lần nhiệm vụ 2. Thùng hàng (sau kiểm nhập) nằm ở khu chờ kiểm nhập, dán thẻ
// "Đã kiểm nhập, chờ sắp xếp". Bước 2: phân loại theo điều kiện bảo quản; bước 3: phân loại ngành hàng (tick đúng thì có thùng
// hàng ở tủ tương ứng); rồi vào tủ bấm thùng để sắp xếp như thiết kế cũ (kéo hộp vào đúng vị trí, FEFO).
function getM3State(){ try{ const v = JSON.parse(localStorage.getItem('tu-thuoc-mo-phong:mission3')); if(v && v.step) return v; }catch(e){} return { step:'idle' }; }
function saveM3State(x){
  localStorage.setItem('tu-thuoc-mo-phong:mission3', JSON.stringify(x));
  try{ applyM1Highlight(); }catch(e){}
  try{ m2Sync(); }catch(e){}
  try{ window.refreshMissionsList?.(); }catch(e){}
  try{ if(typeof renderM1Checklist === 'function') renderM1Checklist(); }catch(e){}
  try{ window.renderMissionChecklist?.(); }catch(e){}
}
// req #236: nhiệm vụ 3 (và 4, 5) còn cần GIẢNG VIÊN mở khoá cho lớp (trang tt-quan-ly); nhiệm vụ 1, 2 luôn mở.
function ttMissionOpen(n){ return !window.TT || !window.TT.missionOpen || window.TT.missionOpen(n); }
function m3Unlocked(){ return m2Count() >= 1 && ttMissionOpen(3); }
function m3LockText(){ return m2Count() < 1 ? 'hoàn thành tối thiểu 1 lần Nhiệm vụ 2 để mở khoá' : 'chờ giảng viên mở khoá cho lớp'; }
function m3CrateStep(st){ return st === 'stored' || st === 'fridge' || st === 'classify' || st === 'special'; }
function m3Active(){ const x = getM3State(); return m3CrateStep(x.step) || x.step === 'sort'; }
// Danh sách tên thuốc cần sắp xếp trong tủ `mode` (null nếu nhiệm vụ 3 không ở bước sắp xếp / tủ này đã xong)
function m3SortItemsFor(mode){
  const x = getM3State();
  if(x.step !== 'sort' || (x.done && x.done[mode])) return null;
  const names = (x.roomItems || []).filter(it => it.cabinet === mode).map(it => it.name);
  return names.length ? names : null;
}
function m3CartVisible(){ return !!m3SortItemsFor(TU_MODE); }
function startM3(){
  const m2 = getM2State();
  const src = (m2.items && m2.items.length ? m2.items.filter(it => !m2Reasons(it).length) : []);
  const all = getM1Items();
  const toItem = (key, name, cold, cabinet) => { const kind = ksdbKind(m1RecOf(key)); return { key, name, cold: !!cold, cabinet: kind && !cold ? 'special' : cabinet, skind: kind }; };
  const list = (src.length ? src : all).map(it => { const base = all.find(a => a.key === it.key) || it; return toItem(it.key, it.name, base.cold, base.cabinet); });
  // req #235: từ mức Dễ trở lên, thùng hàng có thêm hàng nhập: 1 thuốc phải kiểm soát đặc biệt và 1 thuốc bảo quản lạnh
  // (lấy THẬT từ danh mục — cột KSĐB và Điều kiện bảo quản), nếu bộ thuốc của lượt chưa có
  if(m1SharedTier() >= 1){
    const pickRec = f => { const pool = allRecords.filter(r => r['Tên hoạt chất'] && f(r) && !list.some(x => x.key === m1KeyOf(r))); const withPhoto = pool.filter(r => PHOTO_SLUGS.has(slugify(r._gen||r['Tên hoạt chất']))); const pl = withPhoto.length ? withPhoto : pool; return pl.length ? pl[Math.floor(Math.random() * pl.length)] : null; };
    if(!list.some(x => x.cabinet === 'special')){ const r = pickRec(r => ksdbKind(r) && !m1IsCold(r)); if(r) list.push(toItem(m1KeyOf(r), r['Tên hoạt chất'], false, drugClass(r))); }
    if(!list.some(x => x.cold)){ const r = pickRec(r => m1IsCold(r) && !ksdbKind(r)); if(r) list.push(toItem(m1KeyOf(r), r['Tên hoạt chất'], true, drugClass(r))); }
  }
  saveM3State({ step:'stored', items:list, cls:{}, done:{}, roomItems:[], fridge:{} });
}
function m3Hint(){
  const x = getM3State();
  if(!m3Unlocked()) return '🔒 Nhiệm vụ 3: ' + m3LockText() + '.';
  return x.step === 'stored' ? '📦 Nhiệm vụ 3: bấm vào thùng hàng có thẻ "Đã kiểm nhập, chờ sắp xếp" ở Khu vực chờ kiểm nhập để bắt đầu.'
    : x.step === 'fridge' ? '🧊 Nhiệm vụ 3: bấm vào thùng hàng để xếp thuốc bảo quản lạnh vào tủ lạnh.'
    : x.step === 'classify' ? '📋 Nhiệm vụ 3 (bước 3): bấm vào thùng hàng ở Khu vực chờ kiểm nhập để phân loại theo ngành hàng.'
    : x.step === 'special' ? '🔒 Nhiệm vụ 3: bấm vào thùng hàng để phân loại và xếp thuốc kiểm soát đặc biệt vào đúng ngăn.'
    : x.step === 'sort' ? '🗄️ Nhiệm vụ 3: thùng hàng đã tới tủ tương ứng — vào tủ thuốc kê đơn / không kê đơn, bấm thùng để sắp xếp.'
    : '✅ Nhiệm vụ 3 đã xong. Bấm để luyện tập lại.';
}
function m3Click(){
  const x = getM3State();
  if(m3Unlocked() && (x.step === 'idle' || x.step === 'done')) startM3();
  pmZoneLabel.textContent = m3Hint();
}
function m3OpenCrate(){
  const x = getM3State();
  if(x.step === 'stored') m3RenderStorage();
  else if(x.step === 'fridge') m3RenderFridge();
  else if(x.step === 'classify') m3RenderClassify();
  else if(x.step === 'special') m3RenderSpecial();
  else pmZoneLabel.textContent = m3Hint();
}
function m3Photo(name, w){ const u = m2PhotoUrl(name); return u ? `<img src="${u}" alt="" style="width:${w}px;height:${Math.round(w*.75)}px;object-fit:contain;background:#fff;border:1px solid #d8c9a3;border-radius:6px">` : `<div class="ph" style="width:${w}px">${esc(name)}</div>`; }
function m3Modal(title, html){
  const ov = document.getElementById('m2Overlay');
  const body = m2Modal(title, html);
  const sub = document.querySelector('#m2Overlay .sub'); if(sub) sub.textContent = 'Nhiệm vụ 3 · Bảo quản thuốc và sắp xếp hàng hoá';
  return body;
}
// Sau khi xếp xong tủ lạnh / phân loại: chuyển bước kế tiếp (đặc biệt → sắp xếp tủ → hoàn thành)
function m3AfterClassify(x){
  const sortItems = (x.roomItems || []).filter(it => it.cabinet === 'rx' || it.cabinet === 'otc');
  const special = (x.roomItems || []).filter(it => it.cabinet === 'special');
  if(special.length){ x.step = 'special'; saveM3State(x); return 'special'; }
  if(sortItems.length){ x.step = 'sort'; x.done = {}; saveM3State(x); return 'sort'; }
  x.step = 'done'; saveM3State(x); m3Finish(); return 'done';
}
// Bước 2: đọc nhãn → phân loại theo điều kiện bảo quản (người học tự đọc trên bao bì, không in sẵn)
function m3RenderStorage(){
  const x = getM3State();
  const body = m3Modal('🌡️ Bước 2 — Phân loại theo điều kiện bảo quản', `
    <p class="pos-note">Bấm từng <b>mặt / ảnh</b> của bao bì, tự đọc <b>điều kiện bảo quản</b> của từng sản phẩm rồi chọn nơi bảo quản phù hợp. Bấm <b>🔍 Phóng to</b> nếu chữ nhỏ.</p>
    ${x.items.map((it,i) => `<div class="m2-tile" data-i="${i}" style="display:flex;gap:14px;align-items:flex-start;flex-wrap:wrap">
      <div style="flex:1 1 380px;min-width:0"><b>${dn(it)}</b>${pkgViewer(it)}</div>
      <div style="flex:1 1 220px"><div style="font-weight:800;margin-bottom:6px">Nơi bảo quản phù hợp:</div>
        <label style="display:block;margin-bottom:6px"><input type="radio" name="st${i}" value="room"> Nhiệt độ thường (dưới 30°C)</label>
        <label style="display:block"><input type="radio" name="st${i}" value="cold"> Tủ lạnh (2–8°C)</label></div></div>`).join('')}
    <button type="button" class="pos-btn" id="m3StOk">✅ Xác nhận phân loại</button><div class="pos-err" id="m2Err"></div>`);
  body.querySelector('#m3StOk').addEventListener('click', () => {
    const err = body.querySelector('#m2Err');
    for(let i = 0; i < x.items.length; i++){
      const v = body.querySelector(`input[name=st${i}]:checked`)?.value;
      if(!v){ err.textContent = '⚠️ Chọn nơi bảo quản cho tất cả sản phẩm.'; return; }
      if((v === 'cold') !== x.items[i].cold){ err.textContent = `⚠️ "${x.items[i].name}" chưa đúng — đọc lại thông tin bảo quản trên bao bì (mặt bên).`; return; }
    }
    x.roomItems = x.items.filter(it => !it.cold);
    if(x.items.some(it => it.cold)){
      x.step = 'fridge'; saveM3State(x);
      body.innerHTML = `<div class="pos-soon" style="color:#1f7a3d">✅ Đúng rồi!<br>Có ${x.items.filter(it => it.cold).length} sản phẩm bảo quản lạnh — hãy xếp vào tủ lạnh.</div><button type="button" class="pos-btn" id="m3Next">🧊 Xếp vào tủ lạnh</button>`;
      body.querySelector('#m3Next').addEventListener('click', m3RenderFridge);
      return;
    }
    if(m3AfterClassify2(x)) return;
    x.step = 'classify'; saveM3State(x);
    body.innerHTML = `<div class="pos-soon" style="color:#1f7a3d">✅ Đúng rồi!<br>Tiếp theo (bước 3): bấm thùng để phân loại theo ngành hàng.</div><button type="button" class="pos-btn" id="m3Next">➡️ Sang bước 3</button>`;
    body.querySelector('#m3Next').addEventListener('click', m3RenderClassify);
  });
}
// (không còn sản phẩm phải phân loại ngành hàng → chuyển thẳng)
function m3AfterClassify2(x){
  if((x.roomItems || []).length) return false;
  x.step = 'done'; saveM3State(x); m3Finish('Tất cả sản phẩm đều bảo quản lạnh — đã xếp vào tủ lạnh.');
  const b = document.getElementById('m2Body'); if(b) b.innerHTML = '<div class="pos-soon" style="color:#1f7a3d">🎉 Tất cả sản phẩm đã được xếp vào tủ lạnh — hoàn thành nhiệm vụ 3!</div>';
  return true;
}
// Bước 2b: xếp thuốc bảo quản lạnh vào tủ lạnh
function m3RenderFridge(){
  const x = getM3State();
  x.fridge = x.fridge || {};
  const cold = x.items.filter(it => it.cold);
  const draw = () => {
    const placed = cold.filter(it => x.fridge[it.key]), left = cold.filter(it => !x.fridge[it.key]);
    body.innerHTML = `<p class="pos-note">Thuốc cần <b>bảo quản lạnh 2–8°C</b>: xếp vào <b>tủ lạnh</b>, không để sát thành tủ / ngăn đá để tránh đông băng, tránh ánh sáng, theo dõi nhiệt độ tủ hằng ngày.</p>
      <div style="display:flex;gap:14px;flex-wrap:wrap">
        <div style="flex:1 1 280px"><div style="font-weight:800;margin-bottom:6px">📦 Chờ xếp</div>${left.map(it => `<button type="button" class="pos-btn" data-k="${esc(it.key)}" style="display:block;margin-bottom:6px">${dn(it)} → 🧊 Xếp vào tủ lạnh</button>`).join('') || '<i>Đã xếp hết.</i>'}</div>
        <div style="flex:1 1 280px;border:3px solid #7fb6d9;border-radius:12px;background:#eaf6fd;padding:10px"><div style="font-weight:800;margin-bottom:6px">🧊 Tủ lạnh 2–8°C</div>${placed.map(it => `<div style="background:#fff;border:1px solid #bcd9ea;border-radius:8px;padding:6px 10px;margin-bottom:6px">✅ ${dn(it)}</div>`).join('') || '<i>Chưa có sản phẩm.</i>'}</div></div>`;
    body.querySelectorAll('[data-k]').forEach(b => b.addEventListener('click', () => { x.fridge[b.dataset.k] = true; saveM3State(x); draw(); if(!cold.some(it => !x.fridge[it.key])) setTimeout(finishFridge, 400); }));
  };
  const finishFridge = () => {
    if(m3AfterClassify2(x)) return;
    x.step = 'classify'; saveM3State(x);
    body.innerHTML = `<div class="pos-soon" style="color:#1f7a3d">✅ Đã xếp xong thuốc bảo quản lạnh vào tủ lạnh.<br>Tiếp theo (bước 3): phân loại các sản phẩm còn lại theo ngành hàng.</div><button type="button" class="pos-btn" id="m3Next">➡️ Sang bước 3</button>`;
    body.querySelector('#m3Next').addEventListener('click', m3RenderClassify);
  };
  const body = m3Modal('🧊 Bước 2 — Xếp thuốc bảo quản lạnh vào tủ lạnh', '');
  draw();
}
// Bước 3: phân loại ngành hàng (thuốc / không phải thuốc → kê đơn / không kê đơn / kiểm soát đặc biệt)
function m3RenderClassify(){
  const x = getM3State();
  const body = m3Modal('🗂️ Bước 3 — Phân loại theo ngành hàng', `
    <p class="pos-note">Xem bao bì (các mặt) để xác định mỗi sản phẩm là <b>thuốc</b> hay <b>sản phẩm không phải thuốc</b> (mỹ phẩm, dụng cụ, vật tư y tế, thực phẩm bảo vệ sức khỏe). Nếu là thuốc, chọn tiếp: <b>kê đơn</b>, <b>không kê đơn</b> hay <b>kiểm soát đặc biệt</b>. Tick đúng thì thùng hàng sẽ chuyển tới tủ tương ứng.</p>
    ${x.roomItems.map((it,i) => `<div class="m2-tile" data-i="${i}" style="display:flex;gap:14px;align-items:flex-start;flex-wrap:wrap">
      <div style="flex:1 1 380px;min-width:0"><b>${dn(it)}</b>${pkgViewer(it)}</div>
      <div style="flex:1 1 240px">
        <label style="margin-right:14px"><input type="radio" name="k${i}" value="drug"> Thuốc</label>
        <label><input type="radio" name="k${i}" value="non"> Sản phẩm không phải thuốc</label>
        <div class="sub" data-sub="${i}" hidden style="margin-top:8px">
          <label style="display:block;margin-bottom:4px"><input type="radio" name="g${i}" value="rx"> Thuốc kê đơn</label>
          <label style="display:block;margin-bottom:4px"><input type="radio" name="g${i}" value="otc"> Thuốc không kê đơn</label>
          <label style="display:block"><input type="radio" name="g${i}" value="special"> Thuốc kiểm soát đặc biệt</label></div></div></div>`).join('')}
    <button type="button" class="pos-btn" id="m3ClOk">✅ Xác nhận</button><div class="pos-err" id="m2Err"></div>`);
  body.querySelectorAll('input[name^=k]').forEach(r => r.addEventListener('change', () => {
    const i = r.name.slice(1); body.querySelector(`[data-sub="${i}"]`).hidden = r.value !== 'drug';
  }));
  body.querySelector('#m3ClOk').addEventListener('click', () => {
    const err = body.querySelector('#m2Err');
    for(let i = 0; i < x.roomItems.length; i++){
      const it = x.roomItems[i], k = body.querySelector(`input[name=k${i}]:checked`)?.value;
      if(!k){ err.textContent = '⚠️ Chọn thuốc / không phải thuốc cho tất cả sản phẩm.'; return; }
      if(k !== 'drug'){ err.textContent = `⚠️ "${it.name}" là thuốc — chọn "Thuốc" rồi phân nhóm.`; return; }
      const g = body.querySelector(`input[name=g${i}]:checked`)?.value;
      if(!g){ err.textContent = '⚠️ Chọn nhóm thuốc (kê đơn / không kê đơn / kiểm soát đặc biệt).'; return; }
      if(g !== it.cabinet){ err.textContent = it.cabinet === 'special' ? `⚠️ "${it.name}" chưa đúng nhóm — đối chiếu hoạt chất với danh mục thuốc phải kiểm soát đặc biệt.` : (g === 'special' ? `⚠️ "${it.name}" không thuộc danh mục thuốc phải kiểm soát đặc biệt.` : `⚠️ "${it.name}" chưa đúng nhóm — xem lại bao bì (thuốc bán theo đơn hay không).`); return; }
    }
    const nxt = m3AfterClassify(x);
    if(nxt === 'special'){
      body.innerHTML = `<div class="pos-soon" style="color:#1f7a3d">✅ Đúng rồi!<br>Có thuốc kiểm soát đặc biệt — phân loại và xếp vào đúng ngăn theo quy định.</div><button type="button" class="pos-btn" id="m3Next">🔒 Phân loại thuốc kiểm soát đặc biệt</button>`;
      body.querySelector('#m3Next').addEventListener('click', m3RenderSpecial);
    } else if(nxt === 'sort'){
      m2CloseModal();
      pmZoneLabel.textContent = '🗄️ Đúng rồi! Thùng hàng đã chuyển tới các tủ tương ứng — vào tủ thuốc kê đơn / không kê đơn, bấm thùng để sắp xếp.';
    } else {
      body.innerHTML = '<div class="pos-soon" style="color:#1f7a3d">🎉 Hoàn thành nhiệm vụ 3!</div>';
    }
  });
}
// Bước 4: thuốc kiểm soát đặc biệt — phân loại (gây nghiện / hướng thần / tiền chất) rồi xếp vào đúng ngăn của tủ riêng có khoá
// (Thông tư 18/2026/TT-BYT: bảo quản tại kho hoặc tủ riêng có khoá chắc chắn, không để lẫn với thuốc khác; ghi sổ theo dõi xuất – nhập – tồn)
function m3RenderSpecial(){
  const x = getM3State();
  const sp = (x.roomItems || []).filter(it => it.cabinet === 'special');
  const kinds = Object.keys(M3_KIND);
  const body = m3Modal('🔒 Bước 4 — Thuốc kiểm soát đặc biệt', `
    <p class="pos-note">Theo <b>Thông tư 18/2026/TT-BYT</b>, thuốc phải kiểm soát đặc biệt cất trong <b>tủ riêng có khoá chắc chắn</b>, <b>không để lẫn với thuốc khác</b> và phải <b>ghi sổ theo dõi xuất – nhập – tồn</b>. Đọc <b>thành phần</b> trên bao bì, đối chiếu danh mục để <b>phân loại</b> rồi chọn <b>ngăn</b> phù hợp.</p>
    ${sp.map((it,i) => `<div class="m2-tile" data-i="${i}" style="display:flex;gap:14px;align-items:flex-start;flex-wrap:wrap">
      <div style="flex:1 1 380px;min-width:0"><b>${dn(it)}</b>${pkgViewer(it)}</div>
      <div style="flex:1 1 260px">
        <div style="font-weight:800;margin-bottom:4px">1. Phân loại:</div>
        ${kinds.map(k => `<label style="display:block;margin-bottom:3px"><input type="radio" name="sk${i}" value="${k}"> ${M3_KIND[k]}</label>`).join('')}
        <div style="font-weight:800;margin:8px 0 4px">2. Xếp vào ngăn (tủ riêng có khoá):</div>
        ${kinds.map((k,n) => `<label style="display:block;margin-bottom:3px"><input type="radio" name="sn${i}" value="${k}"> Ngăn ${n+1} — ${M3_KIND[k].toLowerCase()}</label>`).join('')}
        <label style="display:block;margin-top:8px"><input type="checkbox" name="sl${i}"> Đã ghi sổ theo dõi xuất – nhập – tồn</label></div></div>`).join('')}
    <button type="button" class="pos-btn" id="m3SpOk">✅ Xác nhận</button><div class="pos-err" id="m2Err"></div>`);
  body.querySelector('#m3SpOk').addEventListener('click', () => {
    const err = body.querySelector('#m2Err');
    for(let i = 0; i < sp.length; i++){
      const it = sp[i], t = body.querySelector(`input[name=sk${i}]:checked`)?.value, n = body.querySelector(`input[name=sn${i}]:checked`)?.value;
      if(!t || !n){ err.textContent = `⚠️ "${it.name}": chọn loại thuốc và ngăn.`; return; }
      if(t !== it.skind){ err.textContent = `⚠️ "${it.name}" chưa đúng loại — đối chiếu hoạt chất (${esc(pkgData(it).strength || it.name)}) với danh mục thuốc phải kiểm soát đặc biệt.`; return; }
      if(n !== it.skind){ err.textContent = `⚠️ "${it.name}" xếp sai ngăn — mỗi loại thuốc kiểm soát đặc biệt có ngăn riêng, không để lẫn.`; return; }
      if(!body.querySelector(`input[name=sl${i}]`).checked){ err.textContent = `⚠️ "${it.name}": phải ghi sổ theo dõi xuất – nhập – tồn riêng.`; return; }
    }
    x.specialDone = true;
    const sortItems = (x.roomItems || []).filter(it => it.cabinet === 'rx' || it.cabinet === 'otc');
    if(sortItems.length){
      x.step = 'sort'; x.done = {}; saveM3State(x); m2CloseModal();
      pmZoneLabel.textContent = '🗄️ Đã xếp thuốc kiểm soát đặc biệt vào đúng ngăn. Thùng hàng còn lại đã chuyển tới tủ thuốc kê đơn / không kê đơn — bấm thùng để sắp xếp.';
    } else {
      x.step = 'done'; saveM3State(x); m3Finish();
      body.innerHTML = '<div class="pos-soon" style="color:#1f7a3d">🎉 Đã xếp thuốc kiểm soát đặc biệt vào đúng ngăn — hoàn thành nhiệm vụ 3!</div>';
    }
  });
}
// Gọi từ màn tủ khi xếp xong lô của tủ `mode`
function m3ModeDone(mode){
  const x = getM3State();
  if(x.step !== 'sort') return '';
  x.done = x.done || {}; x.done[mode] = true;
  const need = [...new Set((x.roomItems || []).map(it => it.cabinet).filter(m => m === 'rx' || m === 'otc'))];
  if(need.every(m => x.done[m])){ x.step = 'done'; saveM3State(x); m3Finish(); return ' 🎉 Hoàn thành nhiệm vụ 3!'; }
  saveM3State(x);
  return ' ✅ Xong tủ này — sang tủ còn lại để sắp xếp nốt.';
}
function m3Finish(msg){
  try{ localStorage.setItem('tu-thuoc-mo-phong:m3count', String((Number(localStorage.getItem('tu-thuoc-mo-phong:m3count')) || 0) + 1)); }catch(e){}
  m2CountPlay();
  // req #236: xong cả chuỗi nhiệm vụ = hết 1 lượt → lượt kế tiếp bốc 2–4 thuốc KHÁC
  try{
    m1ResetItems();
    saveM1State({ step:'dutru', confirmed:{}, actual:{}, orders:{}, supplier:null, formulaOk:false, fmBlanks:null });
    saveM2State({ step:'idle' });
  }catch(e){}
  try{ window.refreshMissionsList?.(); }catch(e){}
  if(msg){ pmZoneLabel.textContent = msg; }
}
// ===================== req #241: bảng các bước của từng nhiệm vụ (cột phải) =====================
// Bấm thẻ nhiệm vụ ở cột trái → cột phải hiện các việc cần làm của nhiệm vụ đó, chia bước nhỏ, đánh dấu tiến độ.
let mcSel = null;
function mcSteps(n){
  const step = (list, cur) => list.map((t, i) => ({ t: t[0], hint: t[1], done: i < cur, cur: i === cur }));
  if(n === 1){
    const st = getM1State(), items = getM1Items();
    const hasKs = getM1Ksdb().length > 0;   // req #250: có thuốc kiểm soát đặc biệt → thêm 1 bước gửi Sở Y tế
    const ord = { dutru:0, checking:1, return:2, ksdb:3, supplier:3 + (hasKs?1:0), order: (st.orderSent ? 5 : 4) + (hasKs?1:0), done:5 + (hasKs?1:0) };
    let cur = ord[st.step] != null ? ord[st.step] : 0;
    if(st.step === 'supplier' && st.supplier) cur = 4 + (hasKs?1:0);
    const ok = items.filter(it => st.confirmed && st.confirmed[it.key]).length;
    const ksStep = hasKs ? [[`Thuốc kiểm soát đặc biệt (${getM1Ksdb().map(x => x.name).join(', ')}): lập đơn mua + báo cáo xuất–nhập–tồn, gửi Sở Y tế chờ phê duyệt`, 'Tab Dự trù — SL tối đa 150% năm trước; chỉ mua sau khi Sở Y tế duyệt']] : [];
    return step([
      ['Mở phần mềm ở Quầy thu ngân, xem danh sách mặt hàng cần kiểm', 'Đi tới máy tính ở Quầy thu ngân → tab Dự trù'],
      [`Đến tủ kiểm tra tồn kho thực tế từng mặt hàng (${ok}/${items.length})`, 'Đối chiếu số hộp trên tủ với số trong phần mềm'],
      ['Quay lại máy tính, điền công thức và lập dự trù số lượng cần đặt', 'SL đặt = Bán/tuần ÷ 7 × số ngày dự trù − tồn thực tế'],
      ...ksStep,
      ['Chọn nhà cung ứng đủ giấy tờ hợp pháp, giá và thời gian giao tốt nhất', 'Tab Quản lý nhà cung ứng'],
      ['Kiểm tra và gửi đơn đặt hàng cho nhà cung ứng', 'Tick xác nhận rồi bấm Gửi đơn'],
    ], st.step === 'done' ? 5 + (hasKs?1:0) : cur);
  }
  if(n === 2){
    const x = getM2State();
    if(!m2Unlocked()) return null;
    const issue = x.step === 'toProcess' || x.step === 'mail' || !!x.mailKind || (x.items || []).some(it => it.recv !== it.qty || m2Reasons(it).length);
    const ord = { idle:0, deliver:0, inbox: x.sub === 'qty' ? 2 : 1, packaging:3, quality:4, toProcess:5, mail:5, price:6, ledger:7, done:8 };
    const cur = ord[x.step] != null ? ord[x.step] : 0;
    const out = step([
      ['Ra mặt tiền nhận thùng hàng từ xe giao hàng', 'Thùng hàng được đặt ở Khu vực chờ kiểm nhập'],
      ['Kiểm tra hoá đơn VAT: đối chiếu đơn vị bán với nhà cung ứng đã đặt', 'Bấm thùng hàng ở Khu vực chờ kiểm nhập'],
      ['Kiểm tra số lượng thực nhận so với hoá đơn', 'Tick Khớp / Không khớp từng mặt hàng'],
      ['Kiểm tra cảm quan bao bì (móp méo, ẩm mốc, chữ mờ)', ''],
      ['Kiểm tra chất lượng cảm quan (niêm phong, màu sắc, hình dạng)', ''],
      ['Xử lý hàng không đạt: chuyển khu chờ xử lý, gửi thư nhà cung ứng', 'Chỉ làm khi có sai lệch'],
      ['Niêm yết giá bán theo đơn vị nhỏ nhất', ''],
      ['Ghi sổ nhập và kiểm soát chất lượng (tab Thực nhập)', 'Bấm 🔎 Xem lại hình để đối chiếu bao bì, hoá đơn'],
    ], cur);
    if(cur > 5 && !issue){ out[5].skip = true; out[5].t += ' — không có, bỏ qua'; }
    return out;
  }
  if(n === 3){
    if(!m3Unlocked()) return null;
    const x = getM3State();
    const hasCold = (x.items || []).some(it => it.cold), hasSp = (x.roomItems || x.items || []).some(it => it.cabinet === 'special');
    const ord = { idle:0, stored:0, fridge:1, classify:2, special:3, sort:4, done:5 };
    const cur = ord[x.step] != null ? ord[x.step] : 0;
    const out = step([
      ['Mở thùng "Đã kiểm nhập, chờ sắp xếp", đọc bao bì và phân loại theo điều kiện bảo quản', 'Khu vực chờ kiểm nhập'],
      ['Xếp thuốc bảo quản lạnh vào tủ lạnh 2–8°C', 'Chỉ làm khi có thuốc bảo quản lạnh'],
      ['Phân loại theo ngành hàng: thuốc kê đơn / không kê đơn / kiểm soát đặc biệt', ''],
      ['Phân loại thuốc kiểm soát đặc biệt và xếp vào đúng ngăn tủ có khoá', 'Chỉ làm khi có thuốc kiểm soát đặc biệt'],
      [`Sắp xếp vào tủ kê đơn / không kê đơn theo FEFO${x.step === 'sort' ? ` (đã xong: ${['rx','otc'].filter(m => x.done && x.done[m]).length} tủ)` : ''}`, 'Vào tủ, bấm thùng hàng, kéo hộp vào đúng vị trí'],
    ], cur);
    if(x.step && x.step !== 'idle' && x.step !== 'stored'){
      if(!hasCold && cur > 1){ out[1].skip = true; out[1].t += ' — không có, bỏ qua'; }
      if(!hasSp && cur > 3){ out[3].skip = true; out[3].t += ' — không có, bỏ qua'; }
    }
    return out;
  }
  return null;
}
function renderMissionChecklist(){
  const el = document.getElementById('mcPanel'); if(!el) return;
  const NAMES = ['Lập dự trù và mua thuốc','Kiểm nhập thuốc, niêm yết giá','Bảo quản thuốc và sắp xếp hàng hóa','Kiểm kê và kiểm soát chất lượng định kỳ','Xử lý thuốc bị thu hồi'];
  let n = mcSel;
  if(!n){ n = (typeof m3Active === 'function' && m3Active()) ? 3 : (typeof m2Active === 'function' && m2Active()) ? 2 : 1; }
  const steps = mcSteps(n);
  const tabs = NAMES.map((t,i) => `<button type="button" data-mc="${i+1}" class="${i+1 === n ? 'on' : ''}" title="${esc(t)}" ${i >= 3 ? 'disabled' : ''}>NV${i+1}</button>`).join('');
  let body;
  if(!steps) body = `<p class="mc-sub">${n >= 4 ? '🔒 Nhiệm vụ này đang được xây dựng theo giáo trình.' : n === 3 ? `🔒 Nhiệm vụ 3: ${m3LockText()}.` : `🔒 Hoàn thành tối thiểu 1 lần nhiệm vụ ${n-1} để mở khoá.`}</p>`;
  else if(hintsOffFor(n)) body = `<p class="mc-sub">🧭 Bạn đã hoàn thành nhiệm vụ này ${missionDoneCount(n)} lần — bảng các bước đã được ẩn để bạn tự thực hiện.<br>Cần hỗ trợ: bấm <b>Trợ lý AI</b> (câu hỏi được ghi lại cho giảng viên).</p>`;
  else {
    const done = steps.filter(x => x.done || x.skip).length, pct = Math.round(done / steps.length * 100);
    body = `<div class="mc-bar"><i style="width:${pct}%"></i></div><p class="mc-sub">Tiến độ: ${done}/${steps.length} bước${done === steps.length ? ' · 🎉 đã hoàn thành' : ''}</p>
      <ol class="mc-steps">${steps.map((x,i) => `<li class="${x.skip ? 'skip done' : x.done ? 'done' : x.cur ? 'cur' : ''}"><span class="mk">${x.done || x.skip ? '✓' : i+1}</span><span><span class="tx">${esc(x.t)}</span>${x.cur && x.hint ? `<small>👉 ${esc(x.hint)}</small>` : ''}</span></li>`).join('')}</ol>`;
  }
  el.innerHTML = `<div class="mc-tabs">${tabs}</div><h3 class="mc-head">📋 Nhiệm vụ ${n}: ${esc(NAMES[n-1])}</h3>${body}`;
  el.querySelectorAll('[data-mc]').forEach(b => b.addEventListener('click', () => { mcSel = Number(b.dataset.mc); renderMissionChecklist(); }));
}
window.renderMissionChecklist = renderMissionChecklist;
// ===================== req #236: ẩn gợi ý sau 2 lần hoàn thành một nhiệm vụ =====================
// Bậc "Làm đúng" đòi người học tự làm không cần hỗ trợ → từ lần thứ 3 của mỗi nhiệm vụ: ẩn bảng các bước, dòng chỉ dẫn
// trên bản đồ, ghi chú gợi ý trong phần mềm; thông báo lỗi chỉ còn nói CHỖ sai, bỏ phần chỉ cách sửa (sau dấu " — ").
// Người học cần hỗ trợ thì hỏi Trợ lý AI — câu hỏi được ghi lại cho giảng viên phân tích.
const HINT_FREE_AFTER = 2;
function missionDoneCount(n){ return n === 1 ? m1PracticeCount() : n === 2 ? m2Count() : n === 3 ? m3Count() : 0; }
function hintsOffFor(n){ return missionDoneCount(n) >= HINT_FREE_AFTER; }
function activeMissionN(){ return (typeof m3Active === 'function' && m3Active()) ? 3 : (typeof m2Active === 'function' && m2Active()) ? 2 : 1; }
function curTierIdx(){
  let plays = 0; for(const k of ['tu-thuoc-mo-phong:game_v2','tu-thuoc-mo-phong:game_v2:otc']){ try{ const g = JSON.parse(localStorage.getItem(k)||'null'); if(g && typeof g.plays === 'number') plays = Math.max(plays, g.plays); }catch(e){} }
  return Math.min(4, Math.floor(plays / PLAYS_PER_TIER));
}
// tt-access.js đọc hàm này khi một nhiệm vụ xong để ghi 'mission_result' (bảng xếp bậc của giảng viên).
window.ttRunContext = (n) => ({ hintsOff: hintsOffFor(n), tier: curTierIdx() });
window.ttActiveMission = activeMissionN;
const NOHINT_ZONE = '🧭 Gợi ý đã ẩn (bạn đã làm nhiệm vụ này 2 lần) — tự thực hiện; cần hỗ trợ hãy hỏi Trợ lý AI.';
function syncNoHint(){ document.body.classList.toggle('tt-nohint', hintsOffFor(activeMissionN())); }
(function(){
  const ERR_SEL = '.pos-err,#m2Err,#thuErr,#m2LedErr,#hosoErr,.m1-warn';
  const STEP_RE = /Nhiệm vụ\s*\d|Bước\s*\d|\bbấm\b|đi tới|quay lại|đến tủ|sang tab/i;
  new MutationObserver(ms => {
    syncNoHint();
    if(!document.body.classList.contains('tt-nohint')) return;
    for(const m of ms){
      const n = m.target.nodeType === 3 ? m.target.parentElement : m.target;
      if(!n || !n.closest) continue;
      if(n.closest('#pmZone')){
        const z = document.getElementById('pmZone');
        if(z.textContent !== NOHINT_ZONE && STEP_RE.test(z.textContent) && !/^🎉|^✅/.test(z.textContent)) z.textContent = NOHINT_ZONE;
        continue;
      }
      const er = n.closest(ERR_SEL);
      if(er && !er.dataset.trimmed){
        const t = er.textContent; const k = t.indexOf(' — ');
        if(k > 0 && /^⚠️/.test(t)){ er.dataset.trimmed = '1'; er.textContent = t.slice(0, k).replace(/[.。]$/, '') + '. Kiểm tra lại.'; delete er.dataset.trimmed; }
      }
    }
  }).observe(document.body, { subtree:true, childList:true, characterData:true });
  setInterval(syncNoHint, 2000); syncNoHint();
  window.addEventListener('tt:open', () => { try{ window.refreshMissionsList?.(); renderMissionChecklist(); }catch(e){} });
})();
function m3Count(){ try{ return Number(localStorage.getItem('tu-thuoc-mo-phong:m3count')) || 0; }catch(e){ return 0; } }
// Hoàn thành 1 LƯỢT (nhiệm vụ 1 → 3) = 1 lần chơi, tính cho cả hai tủ; đủ PLAYS_PER_TIER lượt thì lên mức.
// req #236: 1 lượt = chuỗi các nhiệm vụ ĐANG MỞ cho người học. Khi giảng viên chưa mở NV3, lượt kết thúc ở NV2
// (lên mức vẫn chạy) và lượt sau bốc bộ thuốc khác như khi xong NV3.
function m2RoundIfLast(){
  if(ttMissionOpen(3)) return;
  try{ m2CountPlay(); m1ResetItems(); saveM1State({ step:'dutru', confirmed:{}, actual:{}, orders:{}, supplier:null, formulaOk:false, fmBlanks:null }); }catch(e){}
}
function m2CountPlay(){
  try{
    registerPlay(); saveGame(); applyCabinetVisibility();
    const otherKey = 'tu-thuoc-mo-phong:game_v2' + (TU_MODE === 'otc' ? '' : ':otc');
    const g = JSON.parse(localStorage.getItem(otherKey) || 'null') || { tier:0, progress:0, stars:0, shields:0, combo:0, shieldsFromStars:0, plays:0 };
    g.plays = (typeof g.plays === 'number' ? g.plays : (g.tier||0) * PLAYS_PER_TIER) + 1;
    g.tier = Math.max(g.tier||0, Math.min(TIERS.length-1, Math.floor(g.plays / PLAYS_PER_TIER)));
    localStorage.setItem(otherKey, JSON.stringify(g));
  }catch(e){}
}
// Thư báo sai lệch gửi nhà cung ứng — tab "Quản lý nhà cung ứng" của phần mềm bán hàng.
function renderThuSub(){
  const x = getM2State(), body = document.getElementById('nhaccBody');
  const kind = x.mailKind === 'quality' ? 'quality' : 'qty';
  const d = new Date(), dt = `${String(d.getDate()).padStart(2,'0')}/${String(d.getMonth()+1).padStart(2,'0')}/${d.getFullYear()}`;
  const short = x.items.some(it => it.recv < it.qty), over = x.items.some(it => it.recv > it.qty);
  // req #222/#224: thư soạn sẵn — người học chỉ tick vấn đề + đề nghị (không gõ chữ).
  const rows = kind === 'qty'
    ? `<table class="pos-table" style="font-size:.8rem"><thead><tr><th>Tên thuốc</th><th>Số lượng trên hoá đơn</th><th>Số lượng thực nhận</th></tr></thead><tbody>
        ${x.items.map(it => { const bad = it.recv !== it.qty; return `<tr style="${bad ? 'background:#ffd9a8;font-weight:800;color:#a02510' : ''}"><td>${bad ? '⚠️ ' : ''}${dn(it)}</td><td>${it.qty} ${it.unit}</td><td>${it.recv} ${it.unit}${bad ? ' ← không khớp' : ''}</td></tr>`; }).join('')}</tbody></table>`
    : `<table class="pos-table" style="font-size:.8rem"><thead><tr><th>Tên thuốc</th><th>Kết quả kiểm tra khi nhập hàng</th></tr></thead><tbody>
        ${x.items.map(it => { const rs = m2Reasons(it); return `<tr style="${rs.length ? 'background:#ffd9a8;font-weight:800;color:#a02510' : ''}"><td>${rs.length ? '⚠️ ' : ''}${dn(it)}</td><td>${rs.length ? 'Không đạt: ' + rs.map(r => M2_REASON_TXT[r]).join('; ') : 'Đạt'}</td></tr>`; }).join('')}</tbody></table>`;
  const REQS = kind === 'qty'
    ? [['Bổ sung số hàng còn thiếu', short], ['Nhận lại phần hàng giao thừa', over], ['Điều chỉnh lại hoá đơn cho khớp thực nhận', true], ['Đổi lô hàng khác', false]]
    : [['Đổi sản phẩm không đạt sang lô khác', true], ['Trả lại sản phẩm không đạt', true], ['Bổ sung số hàng còn thiếu', false], ['Điều chỉnh lại hoá đơn cho khớp thực nhận', false]];
  const expected = kind === 'qty' ? ['qty'] : [...new Set(x.items.flatMap(m2Reasons))];
  body.innerHTML = `
    <div class="m2-inv" style="font-size:.84rem;line-height:1.7">
      <p style="margin:0 0 6px"><b>Kính gửi: ${esc(x.supplierName)}</b></p>
      <p style="margin:0 0 6px">Nhà thuốc thực hành đã nhận lô hàng giao ngày ${dt}. Qua kiểm nhập, chúng tôi ghi nhận như sau (mặt hàng có vấn đề được tô màu):</p>
      ${rows}
      <p style="margin:6px 0 2px"><b>Vấn đề ghi nhận khi nhập hàng</b> (tick vào):</p>
      ${M2_PROBLEMS.map(([k,t]) => `<label style="display:block;cursor:pointer"><input type="checkbox" data-prob="${k}"> ${t}</label>`).join('')}
      <p style="margin:6px 0 2px"><b>Đề nghị nhà cung ứng</b> (tick vào):</p>
      ${REQS.map(([t],i) => `<label style="display:block;cursor:pointer"><input type="checkbox" data-req="${i}"> ${t}</label>`).join('')}
      <p style="margin:8px 0 0">Rất mong nhận được phản hồi sớm. Trân trọng cảm ơn!<br><i>Nhà thuốc thực hành</i></p>
    </div>
    <button type="button" class="pos-btn" id="thuSend" style="margin-top:8px">📨 Gửi thư</button><div class="pos-err" id="thuErr"></div>`;
  document.getElementById('thuSend').addEventListener('click', () => {
    const err = document.getElementById('thuErr');
    const probs = [...body.querySelectorAll('[data-prob]:checked')].map(c => c.dataset.prob);
    if(!probs.length){ err.textContent = '⚠️ Hãy tick các vấn đề đã xảy ra khi nhập hàng.'; return; }
    if(probs.some(p => !expected.includes(p))){ err.textContent = '⚠️ Có vấn đề bạn tick chưa xảy ra trong lô hàng này — chỉ tick vấn đề đã ghi nhận.'; return; }
    if(expected.some(p => !probs.includes(p))){ err.textContent = '⚠️ Còn vấn đề đã ghi nhận nhưng bạn chưa tick — xem lại kết quả kiểm tra ở bảng trên.'; return; }
    const reqs = [...body.querySelectorAll('[data-req]:checked')].map(c => Number(c.dataset.req));
    if(!reqs.length){ err.textContent = '⚠️ Tick ít nhất một đề nghị gửi nhà cung ứng.'; return; }
    if(!reqs.every(r => REQS[r][1])){ err.textContent = '⚠️ Đề nghị chưa phù hợp với tình trạng hàng.'; return; }
    const pass = x.items.filter(it => !m2Reasons(it).length);
    if(kind === 'quality' && pass.length){
      x.step = 'price'; saveM2State(x);
      body.innerHTML = `<div class="pos-soon" style="color:#1f7a3d">✅ Đã gửi thư cho ${esc(x.supplierName)}. Sản phẩm không đạt được giữ ở khu chờ xử lý.<br>Tiếp theo (bước 7): quay lại Khu vực chờ kiểm nhập, bấm thùng để niêm yết giá cho các sản phẩm đạt.</div>`;
      pmZoneLabel.textContent = '🏷️ Bước 7: bấm thùng ở Khu vực chờ kiểm nhập để niêm yết giá cho các sản phẩm đạt.';
      return;
    }
    x.step = 'done'; saveM2State(x);
    try{ localStorage.setItem(LS_M2N, String(m2Count() + 1)); }catch(e){}
    m2RoundIfLast();
    body.innerHTML = `<div class="pos-soon" style="color:#1f7a3d">✅ Đã gửi thư cho ${esc(x.supplierName)}. Hàng được giữ ở khu chờ xử lý cho tới khi nhà cung ứng phản hồi.<br>🎉 Hoàn thành nhiệm vụ 2 (nhánh xử lý hàng không đạt).</div>`;
    window.refreshMissionsList?.();
  });
}

/* Checklist nổi trên màn tủ (view-pharmacy) khi nhiệm vụ 1 đang ở bước kiểm
   thực tế — chỉ hiện các mặt hàng thuộc ĐÚNG tủ đang mở (rx/otc). */
function renderM1Checklist(){
  const panel = document.getElementById('m1Checklist');
  if(!panel) return;
  const st = getM1State();
  // req #169 (phản hồi): "Hàng mới về" (thùng hàng + đơn) là nghiệp vụ RIÊNG
  // của nhiệm vụ 3 (Bảo quản — sắp xếp) — hiện cùng lúc với checklist nhiệm
  // vụ 1 gây rối, ẩn đi khi đang kiểm tủ cho nhiệm vụ 1.
  const cartEl = document.getElementById('deliveryCart');
  if(cartEl) cartEl.style.display = (st.step === 'checking' || !m3CartVisible()) ? 'none' : '';
  if(st.step !== 'checking'){
    panel.hidden = true;
    if(cartWindow > tierCabinets()){ cartWindow = tierCabinets(); applyCabinetVisibility(); }
    return;
  }
  const items = getM1Items().filter(it => it.cabinet === TU_MODE);
  if(!items.length){ panel.hidden = true; return; }
  // req #174: đảm bảo tủ chứa thuốc cần kiểm đang hiện, và nhảy tới tủ đó.
  if(m1CabNeed() > cartWindow){ cartWindow = tierCabinets(); applyCabinetVisibility(); }
  { const pendNow = items.filter(it => !st.confirmed[it.key]);
    const idxOf = it => cabinets.findIndex(c => c.items.some(r => r['Tên hoạt chất'] === it.name || r._gen === it.name));
    if(pendNow.length && !pendNow.some(it => idxOf(it) === activeCabIdx)){ const j = idxOf(pendNow[0]); if(j >= 0) showCabinet(j); } }
  const pending = items.filter(it => !st.confirmed[it.key]);
  panel.hidden = false;
  if(!pending.length){
    const allDone = getM1Items().every(it => st.confirmed[it.key]);
    panel.innerHTML = `<h5>📋 Kiểm tủ — Nhiệm vụ 1</h5><div class="m1-done">${allDone ? '✅ Đã kiểm xong tất cả! Quay lại Quầy thu ngân để chốt đơn.' : '✅ Xong tủ này! Sang tủ còn lại để kiểm nốt.'}</div>`;
    // req #171 (phản hồi): trước đây hiện lại "Hàng mới về" NGAY khi kiểm
    // xong hết (allDone), trong khi thẻ "Đã kiểm xong tất cả!" vẫn còn hiện
    // trên chính màn này — 2 nghiệp vụ hiện chồng lên nhau như cũ. Đổi
    // step sang 'return' nhưng GIỮ ẩn cho tới khi rời màn tủ này; tủ Rx/OTC
    // vào lại sau (renderM1Checklist() chạy lại lúc đó) sẽ tự hiện đúng.
    if(allDone){ st.step = 'return'; saveM1State(st); window.refreshMissionsList?.(); }
    return;
  }
  panel.innerHTML = `<h5>📋 Kiểm tủ — còn ${pending.length} mặt hàng</h5><div style="font-size:.7rem;opacity:.8;margin-bottom:4px">So số hộp ghi trên tủ (x…) với tồn phần mềm (PM).</div>` + pending.map(it => {
    const ci = cabinets.findIndex(c => c.items.some(r => r['Tên hoạt chất'] === it.name || r._gen === it.name));
    return `
    <div class="m1-item" data-key="${esc(it.key)}">
      <span>${dn(it)} <i style="opacity:.6">(PM: ${it.tonKho} ${it.unit}${ci>=0?' · Tủ số '+(ci+1):''})</i></span>
      <span class="m1-btns">
        <button type="button" class="m1-ok" data-act="ok">✅ Đúng</button>
        <button type="button" class="m1-bad" data-act="bad">❌ Sai</button>
      </span>
    </div>`; }).join('');
  panel.querySelectorAll('.m1-item').forEach(row => {
    const key = row.dataset.key;
    const it1 = getM1Items().find(x => x.key === key);
    row.querySelector('[data-act="ok"]').addEventListener('click', () => {
      if(it1 && it1.tonThuc !== it1.tonKho){
        row.querySelector('.m1-warn')?.remove();
        row.insertAdjacentHTML('beforeend', '<div class="m1-warn" style="color:#b91c1c;font-size:.72rem;margin-top:4px">⚠️ Số hộp trên tủ chưa khớp với PM — đếm lại rồi bấm ❌ Sai để sửa tồn thực tế.</div>');
        return;
      }
      st.confirmed[key] = true; saveM1State(st); renderM1Checklist();
    });
    row.querySelector('[data-act="bad"]').addEventListener('click', () => {
      row.insertAdjacentHTML('beforeend', `<div class="m1-fix">Tồn thực tế: <input type="number" min="0" step="1" class="m1-fix-in"><button type="button" class="m1-ok" data-act="save">Lưu</button></div>`);
      row.querySelector('[data-act="save"]').addEventListener('click', () => {
        const v = row.querySelector('.m1-fix-in').value;
        if(v === '' || Number(v) < 0) return;
        if(it1 && Number(v) !== it1.tonThuc){
          row.querySelector('.m1-warn')?.remove();
          row.insertAdjacentHTML('beforeend', '<div class="m1-warn" style="color:#b91c1c;font-size:.72rem;margin-top:4px">⚠️ Số này chưa đúng — đếm lại số hộp ghi trên tủ (x…).</div>');
          return;
        }
        st.actual[key] = Number(v); st.confirmed[key] = true; saveM1State(st); renderM1Checklist();
      });
    });
  });
}

/* req #164 (phản hồi): thẻ "Hướng dẫn luyện tập" — nhiệm vụ hiện tại lấy từ
   danh hiệu/sao thật (không hard-code), mẹo dược sĩ xoay vòng, sổ tay dược sĩ
   mở hộp thoại riêng (không đụng tới modal chi tiết thuốc). Nội dung "Công cụ
   hỗ trợ" còn là placeholder — chờ phạm vi hệ 5 nhiệm vụ ở #163 mới có tool
   thật để gắn vào đây. */
(function initMapGuide(){
  const starsOf = k => { try{ return (JSON.parse(localStorage.getItem(k) || '{}').stars) || 0; }catch(e){ return 0; } };
  const rxS = starsOf('tu-thuoc-mo-phong:game_v2'), otcS = starsOf('tu-thuoc-mo-phong:game_v2:otc');
  const titleOf = s => { let t = TITLES[0]; for(const x of TITLES){ if(s >= x.min) t = x; } return t; };

  // req #168 (ThS Hương Lý): 5 nhiệm vụ lớn của nghề dược sĩ tại nhà thuốc,
  // mở lần lượt (làm xong nhiệm vụ trước mới hiện nhiệm vụ sau) — trong đó
  // "Bảo quản & sắp xếp hàng hóa" là nhiệm vụ ĐÃ có trò chơi thật (xếp thuốc
  // vào tủ Rx/OTC ở màn này), 4 nhiệm vụ còn lại đang chờ xây theo giáo trình
  // (xem #163). Bấm vào dòng có trò chơi thật là chơi được ngay.
  // req #169: nhiệm vụ 1 giờ cũng có trò chơi thật (phần mềm bán hàng ở
  // Quầy thu ngân) — đọc trạng thái từ localStorage để hiện đúng bước/số sao.
  const m1state = (typeof getM1State === 'function') ? getM1State() : { step:'dutru' };
  const MISSIONS = [
    { name:'Lập dự trù và mua thuốc', play:true, m1:true },
    { name:'Kiểm nhập thuốc, niêm yết giá', m2:true },
    { name:'Bảo quản thuốc và sắp xếp hàng hóa', m3:true },
    { name:'Kiểm kê và kiểm soát chất lượng định kỳ' },
    { name:'Xử lý thuốc bị thu hồi' },
  ];
  const missionsEl = document.getElementById('mgMissions');
  // req #226: thanh mức độ (rất dễ → rất khó) dùng CHUNG cho cả 3 nhiệm vụ — mức càng cao thuốc bốc từ càng nhiều tủ.
  function renderLevel(){
    const el = document.getElementById('mgLevel'); if(!el) return;
    const names = ['Siêu dễ','Dễ','Trung bình','Khó','Rất khó'], cabs = [2,4,8,12,18];
    let plays = 0; for(const k of ['tu-thuoc-mo-phong:game_v2','tu-thuoc-mo-phong:game_v2:otc']){ try{ const g = JSON.parse(localStorage.getItem(k)||'null'); if(g && typeof g.plays === 'number') plays = Math.max(plays, g.plays); }catch(e){} }
    const tier = Math.min(4, Math.floor(plays / PLAYS_PER_TIER)), inTier = tier >= 4 ? PLAYS_PER_TIER : plays % PLAYS_PER_TIER;
    el.innerHTML = `<div style="font:800 .72rem 'Nunito',sans-serif;color:#26405f">Mức độ: <b>${names[tier]}</b> · thuốc trong ${cabs[tier]} tủ</div>
      <div style="height:8px;background:#dfe6ee;border-radius:6px;overflow:hidden;margin:3px 0"><div style="height:100%;width:${tier>=4?100:Math.round(inTier/PLAYS_PER_TIER*100)}%;background:#2e8256"></div></div>
      <div style="font:600 .62rem 'Nunito',sans-serif;color:#8a97ab">${tier>=4 ? 'Đã đạt mức cao nhất' : inTier + '/' + PLAYS_PER_TIER + ' lượt hoàn thành (nhiệm vụ 1 → ' + (ttMissionOpen(3) ? 3 : 2) + ') để lên mức tiếp theo'}</div>
      <div style="margin-top:6px;font:700 .66rem 'Nunito',sans-serif;color:#26405f">📚 Danh mục thuốc:
        <label style="display:block;font-weight:600;margin-top:2px"><input type="radio" name="mgCat" value="1" checked> Danh mục 1 — Môn Dược lý (${allRecords.length} thuốc)</label>
        <label style="display:block;font-weight:600;color:#8a97ab" title="Đang chờ giảng viên cung cấp"><input type="radio" name="mgCat" value="2" disabled> Danh mục 2 — Nhà thuốc mô phỏng (sắp có)</label></div>`;
  }
  function renderMissions(){
    renderLevel();
    missionsEl.innerHTML = MISSIONS.map((m,i) => {
      const n = i+1;
      if(m.m1){
        const st = (typeof getM1State === 'function') ? getM1State() : { step:'dutru' };
        const label = st.step === 'done' ? `🔁 Luyện tập · ${m1PracticeCount()} lần →`
          : st.step === 'return' || st.step === 'ksdb' ? '🖥️ Chốt đơn →'
          : st.step === 'checking' ? '🔍 Đang làm →'
          : '▶ Chơi →';
        return `<li class="mg-mission play${st.step==='done'?'':' current'}" data-mission="${n}">
          <span class="mg-mission-n">${n}</span>
          <span class="mg-mission-tx">${m.name}</span>
          <span class="mg-mission-st">${label}</span>
        </li>`;
      }
      if(m.m2){
        if(!m2Unlocked()) return `<li class="mg-mission soon" data-mission="${n}" title="Hoàn thành tối thiểu 1 lần nhiệm vụ 1 để mở khoá">
          <span class="mg-mission-n">${n}</span><span class="mg-mission-tx">${m.name}</span><span class="mg-mission-st">🔒 Xong NV1 để mở</span></li>`;
        const x2 = getM2State();
        const lb2 = x2.step === 'idle' ? '▶ Chơi →' : x2.step === 'done' ? `🔁 Luyện tập · ${m2Count()} lần →` : '🔍 Đang làm →';
        return `<li class="mg-mission play${x2.step==='done'?'':' current'}" data-mission="${n}"><span class="mg-mission-n">${n}</span><span class="mg-mission-tx">${m.name}</span><span class="mg-mission-st">${lb2}</span></li>`;
      }
      if(m.m3){
        if(!m3Unlocked()) return `<li class="mg-mission soon" data-mission="${n}" title="${m3LockText()}"><span class="mg-mission-n">${n}</span><span class="mg-mission-tx">${m.name}</span><span class="mg-mission-st">${m2Count() < 1 ? '🔒 Xong NV2 để mở' : '🔒 Chờ GV mở khoá'}</span></li>`;
        const x3 = getM3State();
        const lb3 = x3.step === 'idle' ? '▶ Chơi →' : x3.step === 'done' ? `🔁 Luyện tập · ${m3Count()} lần →` : '🔍 Đang làm →';
        return `<li class="mg-mission play${x3.step==='done'?'':' current'}" data-mission="${n}"><span class="mg-mission-n">${n}</span><span class="mg-mission-tx">${m.name}</span><span class="mg-mission-st">${lb3}</span></li>`;
      }
      if(m.play){
        const done = rxS + otcS;
        return `<li class="mg-mission play current" data-mission="${n}">
          <span class="mg-mission-n">${n}</span>
          <span class="mg-mission-tx">${m.name}</span>
          <span class="mg-mission-st">${done}⭐ · Chơi →</span>
        </li>`;
      }
      return `<li class="mg-mission soon" data-mission="${n}">
        <span class="mg-mission-n">${n}</span>
        <span class="mg-mission-tx">${m.name}</span>
        <span class="mg-mission-st">🔒 Sắp ra mắt</span>
      </li>`;
    }).join('');
    // req #169 (phản hồi): bấm vào THẺ nhiệm vụ không mở luôn phần mềm bán
    // hàng nữa — chỉ CHỈ DẪN bước đang làm; phải tự đi tới máy tính ở Quầy
    // thu ngân và bấm vào đó mới mở được (giống game thật, không tắt tuỳ ý).
    missionsEl.querySelector('[data-mission="1"]')?.addEventListener('click', () => { if(typeof m1Hint === 'function') m1Hint(); });
    missionsEl.querySelector('[data-mission="2"]')?.addEventListener('click', () => { if(typeof m2Click === 'function') m2Click(); });
    missionsEl.querySelector('[data-mission="3"]')?.addEventListener('click', () => { if(typeof m3Click === 'function') m3Click(); });
    // req #241: bấm thẻ nhiệm vụ → cột phải hiện các bước của nhiệm vụ đó
    missionsEl.querySelectorAll('[data-mission]').forEach(li => li.addEventListener('click', () => { mcSel = Number(li.dataset.mission); try{ renderMissionChecklist(); }catch(e){}
      // req #260: trên điện thoại danh sách nhiệm vụ nằm DƯỚI bản đồ — bấm "Chơi" chỉ đổi dòng chỉ dẫn + tô sáng vùng làm tiếp ở trên
      // (ngoài khung nhìn) nên người học tưởng không có gì xảy ra. Kéo bản đồ lên khung nhìn để thấy chỉ dẫn và vùng nhấp nháy.
      if(!li.classList.contains('soon')){
        const mp = document.querySelector('.pharmacy-map');
        if(mp && mp.offsetParent){
          let sc = mp.parentElement; while(sc && !(/(auto|scroll)/.test(getComputedStyle(sc).overflowY) && sc.scrollHeight > sc.clientHeight)) sc = sc.parentElement;
          const r = mp.getBoundingClientRect(), box = sc ? sc.getBoundingClientRect() : { top:0 };
          if(sc ? (r.top < box.top || r.bottom > box.top + sc.clientHeight) : (r.top < 0 || r.bottom > window.innerHeight)){
            const top = Math.max(0, r.top - box.top + (sc ? sc.scrollTop : window.scrollY) - 76);
            (sc || window).scrollTo({ top, behavior:'auto' });
          }
        }
      } }));
    try{ renderMissionChecklist(); }catch(e){}
  }
  if(missionsEl){ renderMissions(); window.refreshMissionsList = renderMissions; }
  try{ applyM1Highlight(); }catch(e){}
  try{ m2Sync(); }catch(e){}

  const TIPS = [
    'Luôn xếp thuốc theo nguyên tắc FEFO — thuốc hết hạn SỚM đưa ra phía trước, dễ lấy trước.',
    'Thuốc kê đơn (Rx) chỉ cấp phát khi có đơn thuốc hợp lệ của bác sĩ.',
    'Kiểm tra "5 Đúng" trước khi giao thuốc: đúng thuốc – đúng người – đúng liều – đúng đường dùng – đúng thời điểm.',
    'Vắc xin, insulin và các thuốc cần lạnh phải giữ ở 2–8°C, không để chung khoang đông đá.',
    'Thuốc kiểm soát đặc biệt (gây nghiện, hướng thần) luôn phải cất trong tủ có khóa riêng, ghi sổ theo dõi.',
    'Khi nhận hàng mới, đối chiếu số lô – hạn dùng – số lượng với phiếu giao hàng trước khi nhập tủ.',
  ];
  const mgTip = document.getElementById('mgTip');
  if(mgTip) mgTip.textContent = TIPS[Math.floor(Math.random() * TIPS.length)];

  const gbOverlay = document.getElementById('gbOverlay');
  const gbBody = document.getElementById('gbBody');
  document.getElementById('mgBookBtn')?.addEventListener('click', () => {
    gbBody.innerHTML = `
      <p><b>Nguyên tắc GPP cơ bản khi bảo quản &amp; sắp xếp:</b></p>
      <ul style="margin:6px 0 14px;padding-left:18px;line-height:1.6">
        <li><b>FEFO</b> (First Expired, First Out) — thuốc hết hạn trước xếp ra ngoài, lấy trước.</li>
        <li>Phân khu rõ: <b>Rx</b> (kê đơn) · <b>OTC</b> (không kê đơn) · kiểm soát đặc biệt (có khóa) · sản phẩm không phải thuốc.</li>
        <li>Bảo quản lạnh <b>2–8°C</b> cho vắc xin, insulin và các thuốc ghi rõ yêu cầu này trên nhãn.</li>
        <li>Hàng mới về phải qua khu <b>chờ kiểm nhập</b>, đối chiếu đủ trước khi lên tủ.</li>
        <li>Thuốc cận hạn/hư hỏng chuyển sang khu <b>chờ xử lý</b>, không để lẫn với hàng còn bán được.</li>
      </ul>
      <p><b>5 Đúng khi cấp phát thuốc:</b></p>
      <ul style="margin:6px 0 0;padding-left:18px;line-height:1.6">
        <li>Đúng người bệnh · Đúng thuốc · Đúng liều dùng · Đúng đường dùng · Đúng thời điểm</li>
      </ul>
      <p style="margin-top:14px;opacity:.7;font-size:.82rem">Nội dung chi tiết theo giáo trình 5 nhiệm vụ sẽ được bổ sung khi hệ nhiệm vụ chính thức triển khai.</p>`;
    gbOverlay.style.display = 'flex';
  });
  document.getElementById('gbClose')?.addEventListener('click', () => { gbOverlay.style.display = 'none'; });
  gbOverlay?.addEventListener('click', e => { if(e.target === gbOverlay) gbOverlay.style.display = 'none'; });
})();
let hasKey = localStorage.getItem('tu-thuoc-mo-phong:key') === '1'
  || gameMax('pharma_crush_progress_v1') > KEY_LEVEL || gameMax('pharma_sort_progress_v1') > KEY_LEVEL;

function pComputeRects(){
  pRects = pZoneEls
    .map(z=>({ el:z, x:z.offsetLeft, y:z.offsetTop, w:z.offsetWidth, h:z.offsetHeight }))
    .filter(r=>r.w > 0 && r.h > 0);   // vùng đang ẩn (vd Khu ra lẻ) không tính
  pBuildGrid();
}
/* req (giảng viên): dược sĩ KHÔNG được giẫm lên quầy thu ngân và các khu vực
   khác — chúng là quầy, tủ, kệ, ghế thật. Trước đây mọi phần tử có data-zone
   đều được cho đi xuyên qua (chú thích cũ chỉ đúng với sơ đồ Sảnh ở màn khác),
   nên thực tế không có vật cản nào ngoài 4 bức tường. Nay chỉ LỐI VÀO là chỗ
   đứng lên được, còn lại phải đi vòng và đứng sát cạnh. */
const P_WALKABLE = new Set(['door']);
/* Phòng tư vấn là CĂN PHÒNG có cửa, không phải món đồ — lòng phòng đi được,
   còn vách và bàn đã chặn riêng trong P_SOLID với một khe chừa làm cửa. */
const P_WALK_CLASS = 'z-consult';
function pCollide(px, py){
  if(!pOnFloor(px + C_W/2, py + C_H)) return true;   // bàn chân phải ở trên sàn
  for(const r of P_SOLID)
    if(px < r.x + r.w && px + C_W > r.x && py < r.y + r.h && py + C_H > r.y) return true;
  for(const r of pRects){
    if(P_WALKABLE.has(r.el.dataset.zone) || r.el.classList.contains(P_WALK_CLASS)) continue;
    if(px < r.x + r.w && px + C_W > r.x && py < r.y + r.h && py + C_H > r.y) return true;
  }
  return false;
}
/* ---------- TÌM ĐƯỜNG kiểu unit game chiến thuật ----------
   req (giảng viên): bấm sang chỗ khác thì phải tìm lối đi hợp lý, không lao
   thẳng đường chéo rồi dí vào quầy. Lưới 10px; mỗi ô ghi sẵn "đặt nhân vật ở
   đây có chạm gì không" — tức đã tính cả kích thước người, nên đường tìm ra
   dùng thẳng được, không cần nới thêm. A* 8 hướng với hàm ước lượng octile,
   cấm lách chéo qua khe hẹp giữa hai vật cản, xong "kéo dây" bỏ bớt các khúc
   gãy thừa của lưới để đường đi mượt như người thật. */
const PG = 10;
let pGrid = null, pGW = 0, pGH = 0;
function pBuildGrid(){
  pGW = Math.ceil(P_W / PG); pGH = Math.ceil(P_H / PG);
  pGrid = new Uint8Array(pGW * pGH);
  for(let gy = 0; gy < pGH; gy++)
    for(let gx = 0; gx < pGW; gx++)
      if(pCollide(gx * PG, gy * PG)) pGrid[gy * pGW + gx] = 1;
  /* Bịt các TÚI CỤT: vài khe hẹp kẹt giữa tường – tủ – kệ tuy "không chạm gì"
     nhưng không thông ra sàn chính (vd ô 8×10px ở góc trên bên trái). Nếu để
     lại, hàm tìm ô trống gần nhất có thể chọn trúng một túi như vậy rồi A* báo
     không có đường. Loang một lượt từ chỗ nhân vật đang đứng, ô nào không tới
     được thì coi như vật cản. */
  const seed = (x, y) => (pCollide(x, y) ? null : (Math.round(y / PG) * pGW + Math.round(x / PG)));
  const si = seed(charX, charY) ?? seed(588, 690) ?? pGrid.findIndex(v => v === 0);
  if(si == null || si < 0) return;
  const seen = new Uint8Array(pGW * pGH), q = [si]; seen[si] = 1;
  for(let h = 0; h < q.length; h++){
    const c = q[h], cx = c % pGW, cy = (c / pGW) | 0;
    for(const [dx, dy] of [[1,0],[-1,0],[0,1],[0,-1]]){
      const nx = cx + dx, ny = cy + dy;
      if(nx < 0 || ny < 0 || nx >= pGW || ny >= pGH) continue;
      const ni = ny * pGW + nx;
      if(seen[ni] || pGrid[ni]) continue;
      seen[ni] = 1; q.push(ni);
    }
  }
  for(let i = 0; i < pGrid.length; i++) if(!pGrid[i] && !seen[i]) pGrid[i] = 1;
}
const pBlocked = (gx, gy) =>
  gx < 0 || gy < 0 || gx >= pGW || gy >= pGH || pGrid[gy * pGW + gx] === 1;
/* Ô trống gần nhất — bấm trúng quầy thì đi tới mép quầy chứ không đứng im. */
function pNearestFree(gx, gy){
  if(!pBlocked(gx, gy)) return [gx, gy];
  for(let r = 1; r <= 30; r++)
    for(let dy = -r; dy <= r; dy++)
      for(let dx = -r; dx <= r; dx++){
        if(Math.max(Math.abs(dx), Math.abs(dy)) !== r) continue;
        if(!pBlocked(gx + dx, gy + dy)) return [gx + dx, gy + dy];
      }
  return null;
}
function pHeapPush(h, n){
  h.push(n); let c = h.length - 1;
  while(c > 0){ const q = (c - 1) >> 1;
    if(h[q][0] <= h[c][0]) break;
    const t = h[q]; h[q] = h[c]; h[c] = t; c = q; }
}
function pHeapPop(h){
  const top = h[0], last = h.pop();
  if(h.length){ h[0] = last; let q = 0;
    for(;;){ const l = q*2+1, r = l+1; let m = q;
      if(l < h.length && h[l][0] < h[m][0]) m = l;
      if(r < h.length && h[r][0] < h[m][0]) m = r;
      if(m === q) break;
      const t = h[q]; h[q] = h[m]; h[m] = t; q = m; } }
  return top;
}
const PDIR = [[1,0],[-1,0],[0,1],[0,-1],[1,1],[1,-1],[-1,1],[-1,-1]];
function pAStar(sx, sy, gx, gy){
  const N = pGW * pGH, si = sy*pGW + sx, gi = gy*pGW + gx;
  if(si === gi) return [gi];
  const g = new Float64Array(N).fill(Infinity);
  const from = new Int32Array(N).fill(-1);
  const done = new Uint8Array(N);
  const K = Math.SQRT2;
  const oct = i => { const x = i % pGW, y = (i / pGW) | 0;
    const dx = Math.abs(x - gx), dy = Math.abs(y - gy);
    return (dx + dy) + (K - 2) * Math.min(dx, dy); };
  const heap = []; g[si] = 0; pHeapPush(heap, [oct(si), si]);
  while(heap.length){
    const cur = pHeapPop(heap)[1];
    if(cur === gi) break;
    if(done[cur]) continue; done[cur] = 1;
    const cx = cur % pGW, cy = (cur / pGW) | 0;
    for(const [dx, dy] of PDIR){
      const nx = cx + dx, ny = cy + dy;
      if(pBlocked(nx, ny)) continue;
      if(dx && dy && (pBlocked(cx + dx, cy) || pBlocked(cx, cy + dy))) continue;
      const ni = ny*pGW + nx, ng = g[cur] + (dx && dy ? K : 1);
      if(ng < g[ni]){ g[ni] = ng; from[ni] = cur; pHeapPush(heap, [ng + oct(ni), ni]); }
    }
  }
  if(from[gi] === -1) return null;
  const out = []; for(let i = gi; i !== -1; i = from[i]) out.push(i);
  return out.reverse();
}
/* Nối thẳng được hai điểm không? (dò dọc đoạn, bước 4px) */
function pClear(ax, ay, bx, by){
  const d = Math.hypot(bx - ax, by - ay), n = Math.max(1, Math.ceil(d / 4));
  for(let i = 1; i <= n; i++){ const t = i / n;
    if(pCollide(ax + (bx - ax) * t, ay + (by - ay) * t)) return false; }
  return true;
}
/* Trả về danh sách điểm mốc (toạ độ góc trên–trái của nhân vật). */
function pPlanPath(tx, ty){
  if(!pGrid) pBuildGrid();
  const s = pNearestFree(Math.round(charX / PG), Math.round(charY / PG));
  const e = pNearestFree(Math.round(tx / PG),    Math.round(ty / PG));
  if(!s || !e) return null;
  const cells = pAStar(s[0], s[1], e[0], e[1]);
  if(!cells) return null;
  const pts = cells.map(i => [(i % pGW) * PG, ((i / pGW) | 0) * PG]);
  pts[0] = [charX, charY];                        // xuất phát từ chỗ đang đứng
  const out = []; let i = 0;
  while(i < pts.length - 1){                      // kéo dây
    let j = pts.length - 1;
    while(j > i + 1 && !pClear(pts[i][0], pts[i][1], pts[j][0], pts[j][1])) j--;
    out.push(pts[j]); i = j;
  }
  return out.length ? out : null;
}

/* Chỗ đứng sát CẠNH một vùng (không đè lên). Bản đầu chỉ thử 4 hướng cố định
   (dưới → trên → phải → trái) nên chịu thua hai tủ tường hàng trên: phía dưới
   vướng kệ, ba phía kia đều ra ngoài sàn. Nay quét cả lưới đi được — vốn đã
   lược bỏ chỗ không tới nổi — lấy ô vừa sát vùng (đủ gần để vùng sáng lên)
   vừa gần nhân vật nhất. */
function pStandBeside(z){
  if(!pGrid) pBuildGrid();
  const zx = z.offsetLeft, zy = z.offsetTop, zw = z.offsetWidth, zh = z.offsetHeight;
  let best = null, bs = Infinity;
  for(let gy = 0; gy < pGH; gy++)
    for(let gx = 0; gx < pGW; gx++){
      if(pBlocked(gx, gy)) continue;
      const x = gx * PG, y = gy * PG, cx = x + C_W/2, cy = y + C_H/2;
      const dx = Math.max(zx - cx, 0, cx - (zx + zw));
      const dy = Math.max(zy - cy, 0, cy - (zy + zh));
      const d = Math.hypot(dx, dy);
      if(d > 44) continue;                       // phải đủ gần để vùng sáng lên
      const sc = d * 4 + Math.hypot(x - charX, y - charY) * 0.15;
      if(sc < bs){ bs = sc; best = [x, y]; }
    }
  return best || [charX, charY];
}
function pUpdateZone(){
  const ccx = charX + C_W/2, ccy = charY + C_H/2;
  let best = null, bd = 1e9;
  for(const r of pRects){
    const dx = Math.max(r.x - ccx, 0, ccx - (r.x+r.w));
    const dy = Math.max(r.y - ccy, 0, ccy - (r.y+r.h));
    const d = Math.hypot(dx, dy);
    if(d < bd){ bd = d; best = r; }
  }
  pZoneEls.forEach(z=> z.classList.remove('here'));
  if(best && bd < 46){   // đứng sát cạnh quầy thì tâm nhân vật cách mép ~21px
    best.el.classList.add('here');
    pmZoneLabel.textContent = 'Bạn đang ở: ' + best.el.dataset.name;
    pHereZone = best.el.dataset.zone ? best.el : null;
  } else {
    pmZoneLabel.textContent = 'Đang ở lối đi / khu vực khách';
    pHereZone = null;
  }
  renderMapAction();
}
function renderMapAction(){
  const hz = pHereZone && pHereZone.dataset.zone;
  if(hz === 'tu-rx' || hz === 'tu-otc'){
    mapActionEl.innerHTML = '<button class="act-btn" data-act="go">⏎ Sắp xếp thuốc vào ' + (hz === 'tu-otc' ? 'tủ thuốc không kê đơn' : 'tủ thuốc kê đơn') + '</button>';
  } else if(pHereZone && pHereZone.dataset.zone === 'door'){
    mapActionEl.innerHTML = '<button class="act-btn" data-act="go">🚪 Ra ngoài mặt tiền</button>';
  } else {
    mapActionEl.innerHTML = '';
  }
}
let pLast = 0, pPath = null, pPendingZone = null;
function pLoop(ts){
  const dt = Math.min(0.05, (ts - (pLast || ts)) / 1000); pLast = ts;
  const stepX = C_SPEED_X * dt, stepY = C_SPEED_Y * dt;   // quãng đi trong khung này
  const step  = Math.min(stepX, stepY);                   // ngưỡng "đã tới đích"
  let vx = (pKeys.right?1:0) - (pKeys.left?1:0);
  let vy = (pKeys.down?1:0) - (pKeys.up?1:0);
  if(vx || vy){ targetX = targetY = null; pPath = null; pPendingZone = null; }
  else if(pPath){
    while(pPath.length){                      // tới mốc nào thì bỏ mốc đó
      const dx = pPath[0][0] - charX, dy = pPath[0][1] - charY, d = Math.hypot(dx, dy);
      if(d <= step * 1.2){ pPath.shift(); continue; }
      vx = dx/d; vy = dy/d; break;
    }
    if(!pPath.length){                        // đã tới đích
      pPath = null; targetX = targetY = null;
      if(pPendingZone){ const z = pPendingZone; pPendingZone = null; doZoneAction(z); }
    }
  }
  if(vx || vy){
    const len = Math.hypot(vx, vy) || 1;
    vx = vx/len * stepX; vy = vy/len * stepY;
    // Nếu vì lý do nào đó đang đứng lọt trong vật cản thì cho đi tự do để
    // thoát ra, khỏi kẹt cứng một chỗ.
    const stuck = pCollide(charX, charY);
    if(stuck || !pCollide(charX + vx, charY)) charX += vx;
    if(stuck || !pCollide(charX, charY + vy)) charY += vy;
    // Đi ngang chủ đạo → dáng xoạc chân bình thường (khớp .flip lật mặt);
    // đi dọc chủ đạo (lên/xuống) → dáng bước nhẹ, không xoạc ngang sai hướng.
    if(Math.abs(vx) >= Math.abs(vy)){
      pChar.classList.add('walk','v-side'); pChar.classList.remove('walk-v','v-front','v-back');
    } else {
      pChar.classList.add('walk-v', vy > 0 ? 'v-front' : 'v-back'); pChar.classList.remove('walk', 'v-side', vy > 0 ? 'v-back' : 'v-front');
    }
    if(vx > 0.15) pChar.classList.add('flip'); else if(vx < -0.15) pChar.classList.remove('flip');
  } else {
    pChar.classList.remove('walk','walk-v','v-side','v-back');
  }
  pChar.style.left = charX + 'px';
  pChar.style.top = charY + 'px';
  pUpdateZone();
  pRaf = requestAnimationFrame(pLoop);
}
function pStart(){
  pChar.style.setProperty('--pm-dur',   PM_DUR.toFixed(2) + 's');
  pChar.style.setProperty('--pm-bob',   (PM_DUR / 2).toFixed(2) + 's');
  pChar.style.setProperty('--pm-dur-v', PM_DUR_V.toFixed(2) + 's');
  pChar.style.setProperty('--pm-bob-v', (PM_DUR_V / 2).toFixed(2) + 's');
  pLast = 0; requestAnimationFrame(()=>{ pComputeRects(); if(!pRaf) pRaf = requestAnimationFrame(pLoop); }); }
function pStop(){ if(pRaf){ cancelAnimationFrame(pRaf); pRaf = null; } for(const k in pKeys) pKeys[k]=false; }

/* scale the whole scene so it always fits the viewport (map is 900×700) */
function fitMap(){
  if(!document.body.classList.contains('view-map')) return;
  pMap.style.transform = 'none';
  const topY = pMap.getBoundingClientRect().top;
  const availH = window.innerHeight - topY - 12;   // req #164 (phản hồi): nút hành động giờ nổi đè lên sơ đồ, không còn chiếm hàng riêng bên dưới
  const availW = (mapStage.clientWidth || window.innerWidth) - 6;
  const legendEl = document.getElementById('mapLegend');
  const guideEl = document.getElementById('mapGuide');
  // req (tối ưu mobile): dưới 980px hai bảng này xếp CHỒNG XUỐNG DƯỚI sơ đồ
  // (flex-column) chứ không còn cạnh bên (grid) — không được trừ bề rộng của
  // chúng ra khỏi availW nữa, kẻo sơ đồ bị bóp nhỏ vô lý dù đang đứng một
  // mình trên hàng riêng.
  const sideBySide = window.innerWidth > 980;
  const legendW = sideBySide ? 66 : 0;   // req #246: bảng bên thu thành dải icon 54px, bung ra thì đè lên sơ đồ
  // req #164 (phản hồi): quên trừ bảng "Hướng dẫn luyện tập" bên TRÁI — chỉ trừ
  // legendW nên ở màn hình rộng (nhất là bấm toàn màn hình) sơ đồ bị tính to
  // hơn thực tế, tràn ra ngoài khiến 2 bảng bên bị cắt (overflow:hidden +
  // justify-content:center clip đều hai bên).
  const guideW = sideBySide ? 66 : 0;
  // req #156: trước đây chặn ở 1 nên màn hình rộng vẫn hiện sơ đồ bé tí. Cho
  // phóng to tới 1,7 lần để lấp khung, vẫn giữ đúng tỉ lệ (không méo).
  mapScale = Math.max(0.3, Math.min(1.4, (availW - legendW - guideW)/P_W, availH/P_H));
  pMap.style.transform = 'scale(' + mapScale + ')';
  pMap.style.width = P_W + 'px'; pMap.style.height = P_H + 'px';
  // req (tối ưu mobile): 2 dòng dưới đây (bù bề ngang + ép chiều cao khung)
  // chỉ đúng khi sơ đồ với 2 bảng bên nằm CẠNH NHAU trên 1 hàng (desktop
  // grid) — .map-stage lúc đó chỉ cần cao bằng sơ đồ. Ở chế độ xếp CHỒNG
  // (mobile, xem media 980px), .map-stage phải cao đủ chứa cả 2 bảng xếp
  // dưới sơ đồ; ép height + margin-right kiểu desktop làm nó cắt (clip)
  // gần hết nội dung bên dưới. Bỏ cả hai, để flex-column tự tính chiều cao.
  if(sideBySide){
    pMap.style.marginRight = (P_W * mapScale - P_W) + 'px';   // transform không đổi layout → bù bề ngang
    pMap.style.marginBottom = '0px';
    mapStage.style.height = (P_H * mapScale) + 'px';
    // req #246 (phản hồi): bảng bên bung ra nằm TRONG phần trống hai bên sơ đồ (không chèn vào sơ đồ) khi màn đủ rộng
    try{
      const sr = mapStage.getBoundingClientRect(), mr = pMap.getBoundingClientRect();
      const gl = mr.left - sr.left, gr = sr.right - mr.right;
      mapStage.style.setProperty('--gl', Math.max(0, gl - 12) + 'px'); mapStage.style.setProperty('--gr', Math.max(0, gr - 12) + 'px');
      mapStage.classList.toggle('gut-ok', gl >= 190 && gr >= 190);
    }catch(e){}
  } else {
    pMap.style.marginRight = (P_W * mapScale - P_W) + 'px';   // vẫn cần bù ngang để canh giữa đúng
    // req (tối ưu mobile): transform không đổi layout, nên dù NHÌN sơ đồ bé
    // lại, nó vẫn CHIẾM chỗ theo kích thước gốc (936px cao) trong dòng chảy
    // flex-column — hụt luôn 1 khoảng trắng to giữa sơ đồ và 2 bảng xếp dưới.
    // Bù âm margin-bottom để bảng kế tiếp trồi lên sát mép sơ đồ đã co lại.
    pMap.style.marginBottom = (P_H * mapScale - P_H) + 'px';
    mapStage.style.height = 'auto';
  }
}
window.addEventListener('resize', fitMap);

/* lock/unlock the pharmacy-interior zones based on whether the key is held */
function applyLocks(){
  document.querySelectorAll('.pm-zone.lockable').forEach(z=> z.classList.toggle('locked', !hasKey));
  mapKeyEl.textContent = hasKey ? '🔑 Đã có Chìa khóa' : '🔒 Chưa có Chìa khóa';
  mapKeyEl.className = 'map-key ' + (hasKey ? 'has' : 'locked');
  document.body.classList.toggle('has-key', hasKey);
  document.body.classList.toggle('key-fresh', hasKey && localStorage.getItem('tu-thuoc-mo-phong:keyseen') !== '1');
  renderKeyGuide();
  renderMapAction();
}
// req #239: hướng dẫn mở cửa hiện NGAY trên mặt tiền (không phải bấm cửa mới thấy), kèm tiến độ của người học ở 2 trò chơi
function renderKeyGuide(){
  const el = document.getElementById('fKeyGuide'); if(!el) return;
  if(hasKey){ el.innerHTML = ''; return; }
  const passed = k => Math.max(0, Math.min(KEY_LEVEL, gameMax(k) - 1));
  const c = passed('pharma_crush_progress_v1'), so = passed('pharma_sort_progress_v1');
  el.innerHTML = `<h4>🔒 Cửa nhà thuốc đang khóa — cách nhận 🔑 chìa khóa</h4>
    <ol><li>Chơi <b>Pharma Crush</b> hoặc <b>Pharma Sort</b> và qua hết <b>màn ${KEY_LEVEL}</b> ở <b>một</b> trong hai trò (chỉ cần một trò).<br>
      <small>Tiến độ của bạn: Pharma Crush đã qua <b>${c}/${KEY_LEVEL}</b> màn · Pharma Sort đã qua <b>${so}/${KEY_LEVEL}</b> màn.</small></li>
      <li>Quay lại trang này: cửa tự mở, bấm vào cánh cửa để vào nhà thuốc.</li>
      <li>Nếu giảng viên đã cho <b>mật khẩu</b>: bấm "Nhập mật khẩu" để vào ngay.</li></ol>
    <div class="kg-btns"><a href="/pharma-crush.html">💊 Chơi Pharma Crush</a><a href="/pharma-sort.html">🗂️ Chơi Pharma Sort</a><button type="button" id="kgPw">🔑 Nhập mật khẩu</button></div>`;
  el.querySelector('#kgPw').addEventListener('click', () => openDoorPw());
}

/* ---- view switching: map <-> pharmacy ---- */
/* req #154 — bấm cửa kính: trượt hai cánh ra hai bên rồi mới vào sơ đồ nhà thuốc.
   Đợi đúng thời gian chạy hiệu ứng (0,95s) để người xem kịp thấy cửa mở, sau đó
   mới đổi màn; cánh cửa được đặt lại vị trí để lần sau quay ra vẫn thấy cửa đóng. */
let facadeOpening = false;
function enterThroughDoors(){
  if(facadeOpening) return;
  // req #160: chưa có chìa khóa thì hỏi mật khẩu thay vì cho vào luôn
  if(!hasKey){ openDoorPw(); return; }
  facadeOpening = true;
  try{ localStorage.setItem('tu-thuoc-mo-phong:keyseen','1'); }catch(e){}
  document.body.classList.remove('key-fresh');
  document.body.classList.add('doors-open');
  setTimeout(() => {
    showMap();
    document.body.classList.remove('doors-open');
    facadeOpening = false;
  }, 1000);
}
function showFacade(){
  stopHandTracking();
  document.body.classList.remove('view-map','view-pharmacy','doors-open');
  document.body.classList.add('view-facade');
  history.replaceState(null, '', location.pathname);
  try{ m2Sync(); }catch(e){}
}
document.getElementById('fDoorHit')?.addEventListener('click', enterThroughDoors);
document.getElementById('fGoCrush')?.addEventListener('click', (e) => { e.stopPropagation(); location.href = '/pharma-crush.html'; });
document.getElementById('fGoSort')?.addEventListener('click',  (e) => { e.stopPropagation(); location.href = '/pharma-sort.html'; });

function showMap(){
  stopHandTracking(); document.body.classList.remove('view-pharmacy','view-facade'); document.body.classList.add('view-map');
  // F5 giữ nguyên màn sơ đồ thay vì bật lại mặt tiền — xem điểm khởi động cuối file.
  history.replaceState(null, '', location.pathname + '?view=map');
  pStart(); fitMap(); requestAnimationFrame(fitMap); setTimeout(fitMap,60);
  try{ m2Sync(); applyM1Highlight(); }catch(e){}
}
function showPharmacy(){
  pStop();
  document.body.classList.remove('view-map','view-facade'); document.body.classList.add('view-pharmacy');
  /* the cabinet was in a hidden screen so it never got sized — size it now,
     directly (layout is synchronous) plus a couple of timer retries in case
     fonts/images settle the row height a touch late */
  if(typeof syncBoxSize==='function'){ syncBoxSize(); requestAnimationFrame(syncBoxSize); setTimeout(syncBoxSize,80); setTimeout(syncBoxSize,240); }
  // req #169: hiện/ẩn checklist nhiệm vụ 1 mỗi lần vào màn tủ (kể cả vào
  // thẳng bằng URL ?tu=rx|otc, không chỉ đi qua sơ đồ).
  if(typeof renderM1Checklist === 'function') renderM1Checklist();
}
document.getElementById('toMapBtn').addEventListener('click', showMap);
document.getElementById('mobileMapBtn').addEventListener('click', showMap);

/* ---- zone interaction ---- */
function doZoneAction(zone){
  const z = zone && zone.dataset.zone;
  // req #156: sảnh đã dời ra NGOÀI cửa (là khu luyện tập Crush/Sort), nên trong
  // sơ đồ chính các TỦ là nơi vào thực hiện nghiệp vụ bảo quản – sắp xếp hàng hoá.
  // req #161: chỉ hai tủ Kê đơn / Không kê đơn mở màn xếp thuốc, đúng loại tủ đã bấm.
  if(z === 'tu-rx' || z === 'tu-otc'){
    const mode = z === 'tu-otc' ? 'otc' : 'rx';
    if(mode === TU_MODE && new URLSearchParams(location.search).has('tu')) showPharmacy();
    else location.href = location.pathname + '?tu=' + mode;
  }
  else if(z === 'info'){
    // req #169: máy tính ở quầy thu ngân là nơi mở "Phần mềm bán hàng" cho
    // nhiệm vụ 1 — các khu "info" khác vẫn chỉ hiện chú thích như cũ, chờ
    // nghiệp vụ riêng ở các nhiệm vụ sau.
    const m2s = getM2State();
    if(zone.id === 'zCashier' && typeof openPOS === 'function') openPOS();
    else if(zone.classList.contains('z-receive') && (['inbox','packaging','quality','price'].includes(m2s.step) || m3CrateStep(getM3State().step))) m2OpenCrate();
    else if(zone.classList.contains('z-process') && m2s.step === 'toProcess'){
      m2s.step = 'mail'; saveM2State(m2s);
      pmZoneLabel.textContent = '✉️ Thùng hàng đã chuyển sang khu chờ xử lý — đến Quầy thu ngân, mở máy tính → Quản lý nhà cung ứng → Gửi thư cho nhà cung ứng.';
    }
    else pmZoneLabel.textContent = zone.dataset.name + ' — khu vực này sẽ có nghiệp vụ riêng ở các nhiệm vụ sau.';
  }
  else if(z === 'door'){ showFacade(); }
}
mapActionEl.addEventListener('click', e=>{
  if(e.target.closest('#unlockPwBtn')){ askUnlockPassword(); return; }
  const b=e.target.closest('.act-btn'); if(b && !b.disabled && pHereZone) doZoneAction(pHereZone);
});

/* click on the floor → walk there */
pMap.addEventListener('click', e=>{
  /* clicking directly on an interactive area (Sảnh / Cửa ra vào) triggers it
     right away — walk the pharmacist there first, then open it */
  const zoneEl = e.target.closest('.pm-zone[data-zone]');
  if(zoneEl){
    // Đang đứng ngay đó rồi thì mở luôn; còn lại thì ĐI BỘ tới (trước đây dịch
    // chuyển tức thời, trông như xuyên tường) rồi mới mở khi tới nơi.
    if(pHereZone === zoneEl){ pPath = null; pPendingZone = null; doZoneAction(zoneEl); return; }
    const [nx, ny] = P_WALKABLE.has(zoneEl.dataset.zone)
      ? [zoneEl.offsetLeft + zoneEl.offsetWidth/2 - C_W/2,
         zoneEl.offsetTop  + zoneEl.offsetHeight/2 - C_H/2]
      : pStandBeside(zoneEl);
    const path = pPlanPath(nx, ny);
    if(path){ pPath = path; pPendingZone = zoneEl; targetX = nx; targetY = ny; }
    else { charX = nx; charY = ny; pChar.style.left = charX+'px'; pChar.style.top = charY+'px';
           doZoneAction(zoneEl); }                    // không có lối thì mở luôn
    return;
  }
  const r = pMap.getBoundingClientRect();
  const cx = Math.max(0, Math.min(P_W - C_W, (e.clientX - r.left)/mapScale - P_BORDER - C_W/2));
  const cy = Math.max(0, Math.min(P_H - C_H, (e.clientY - r.top )/mapScale - P_BORDER - C_H/2));
  pPendingZone = null;
  pPath = pPlanPath(cx, cy);
  targetX = pPath ? cx : null; targetY = pPath ? cy : null;
});

function earnKey(){ hasKey = true; localStorage.setItem('tu-thuoc-mo-phong:key','1'); applyLocks(); }
document.getElementById('mapKey')?.addEventListener('click', () => { if(!hasKey) openDoorPw(); });

/* req #152 (ThS Hương Lý) — mở khóa cửa nhà thuốc bằng mật khẩu giảng viên.
   Bình thường sinh viên phải đạt danh hiệu "Dược sĩ thực tập" (25⭐) mới có chìa
   khóa; giảng viên cần vào thẳng để dạy/demo nên có lối mở bằng mật khẩu.
   Mật khẩu do MÁY CHỦ kiểm (/api/gpp/unlock-level) — không nằm trong mã nguồn
   trang này, xem source cũng không thấy. Đổi mật khẩu: biến GPP_LEVEL_PASSWORD. */
const doorPwMask = document.getElementById('doorPwMask');
const doorPwInput = document.getElementById('doorPwInput');
const doorPwErr = document.getElementById('doorPwErr');
function openDoorPw(){
  doorPwErr.textContent = ''; doorPwInput.value = '';
  doorPwMask.hidden = false; setTimeout(() => doorPwInput.focus(), 30);
}
function closeDoorPw(){ doorPwMask.hidden = true; }
async function submitDoorPw(){
  doorPwErr.textContent = '';
  try{
    const r = await fetch('/api/gpp/unlock-level', {
      method:'POST', headers:{'Content-Type':'application/json'},
      body: JSON.stringify({ level: 0, password: doorPwInput.value })
    });
    if(!r.ok){
      const d = await r.json().catch(()=>({}));
      doorPwErr.textContent = d.error || 'Mật khẩu không đúng.'; doorPwInput.select(); return;
    }
    earnKey(); closeDoorPw();
    if(document.body.classList.contains('view-facade')) enterThroughDoors();
  }catch(err){
    doorPwErr.textContent = 'Không kết nối được máy chủ để kiểm tra mật khẩu.';
  }
}
function askUnlockPassword(){ openDoorPw(); }
document.getElementById('doorPwGo').addEventListener('click', submitDoorPw);
document.getElementById('doorPwCancel').addEventListener('click', closeDoorPw);
doorPwInput.addEventListener('keydown', e => { if(e.key === 'Enter') submitDoorPw(); if(e.key === 'Escape') closeDoorPw(); });
doorPwMask.addEventListener('click', e => { if(e.target === doorPwMask) closeDoorPw(); });

/* req #159 — con đường trước nhà thuốc: thỉnh thoảng thả một phương tiện / người đi
   ngang qua. Mỗi "diễn viên" là nhóm emoji SVG; emoji mặc định quay mặt sang trái,
   đi sang phải thì lật ngang cả nhóm. Chỉ chạy khi đang ở màn mặt tiền và đã có khóa. */
// req #164 (phản hồi): người & xe quá nhỏ so với ngôi nhà — tăng cỡ ~1.6 lần
// (giữ nguyên tỉ lệ tương đối giữa các loại) để tương xứng với mặt tiền 2 tầng.
// req #167: 3 kiểu "người" (chú, cô, em bé) vẽ bằng SVG riêng (đầu + thân + 2
// chân xoay được), thay cho emoji 🚶 tĩnh — xem personSVG() + .rw-leg bên dưới.
// req (giảng viên): người đi NGANG màn hình mà hai chân lại đặt cạnh nhau như
// nhìn từ trước → mỗi chân xoay quanh một khớp hông riêng, đỉnh bước thành dáng
// xoạc chân. Sửa: hai đùi dùng CHUNG một khớp hông giữa thân (dáng nhìn
// nghiêng), chân/tay phía xa tô sẫm hơn để mắt tách được hai bên.
const P_MAN   = { scale:1.35, skin:'#f0c191', shirt:'#2f6fb0', pants:'#33445c' };
const P_WOMAN = { scale:1.3, skin:'#f0c191', shirt:'#d9548a', pants:'#7a3253', hair:'#3a2418' };
const P_CHILD = { scale:0.9, skin:'#f4c9a0', shirt:'#e8a63a', pants:'#3d6b8a' };
const ROAD_KINDS = [
  { w:3, y:806, speed:430, parts:[{t:'🚗',fs:147}] },
  { w:1, y:806, speed:400, parts:[{t:'🚕',fs:147}] },
  { w:1, y:880, speed:300, parts:[{t:'🚚',fs:160}] },
  // req #159 (phản hồi): xe máy vẽ TRƯỚC (làm nền, to rõ), thùng hàng nhỏ hơn
  // vẽ SAU đè lên baga sau xe. req #167: thêm người ngồi lái (đầu+thân, không
  // vẽ chân vì đang ngồi) ngồi giữa xe, vẽ sau xe — trước để trống trông như
  // xe chạy không người.
  { w:3, y:880, speed:330, parts:[
    {t:'🛵',fs:138},
    {rider:{scale:1.5, skin:'#f0c191', shirt:'#c0392b'}, dx:-10, dy:-46},
    {t:'📦',fs:45,dx:29,dy:-48},
  ] },
  { w:2, y:880, speed:170, parts:[{t:'🚴',fs:118}] },
  { w:1, y:728, speed:70,  parts:[{person:P_MAN}], walk:true },
  { w:1, y:728, speed:80,  parts:[{person:P_WOMAN}], walk:true },
  // req #167 (phản hồi lần 2): chó VẪN bị chê "cạnh đầu em bé" — đưa hẳn xuống
  // ngang chân/đầu gối em bé (không phải ngang vai/đầu như trước), dây dắt nối
  // từ tay em bé (ngang hông, y quanh -30 theo scale) xuống tới cổ chó.
  { w:1, y:728, speed:55,  parts:[{t:'🐕',fs:30,dx:-30,dy:-2},{person:P_CHILD}], leash:true, walk:true },
];
const fActors = document.getElementById('fActors');
const SVGNS = 'http://www.w3.org/2000/svg';
function svgEl(name, attrs){
  const el = document.createElementNS(SVGNS, name);
  for(const k in attrs) el.setAttribute(k, attrs[k]);
  return el;
}
// Người đi bộ: đầu tròn + thân + 2 chân — 2 chân mang class rw-leg-l/rw-leg-r,
// DÙNG LẠI đúng 2 keyframe pm-step-a/pm-step-b của nhân vật dược sĩ trong sơ đồ
// (xem CSS .rw-leg) nên chân thật sự thay nhau bước, không còn đứng im.
// Tô sẫm một màu để làm bên "phía xa" của dáng nhìn nghiêng.
function shade(hex, f){
  const n = parseInt(hex.slice(1), 16), d = v => Math.round(v * f);
  return '#' + [d(n >> 16), d((n >> 8) & 255), d(n & 255)]
    .map(v => v.toString(16).padStart(2, '0')).join('');
}
// Tay: bọc trong <g> riêng vì cả cánh tay lẫn bàn tay cùng xoay quanh khớp vai.
function armSVG(o, s, side){
  const far = side === 'r';
  const g = svgEl('g', { class:`rw-arm rw-arm-${side}` });
  g.appendChild(svgEl('rect', { x:-4*s, y:-58*s, width:8*s, height:32*s, rx:4*s,
    fill: far ? shade(o.shirt,.74) : shade(o.shirt,.88) }));
  g.appendChild(svgEl('circle', { cx:0, cy:-28*s, r:4.6*s,
    fill: far ? shade(o.skin,.85) : o.skin }));
  return g;
}
// Người đi bộ nhìn NGHIÊNG: thứ tự vẽ từ xa tới gần —
// chân xa → tay xa → thân → chân gần → tay gần → đầu.
function personSVG(inner, o, dx, dy){
  const s = o.scale, X = dx||0, Y = dy||0;
  const g = svgEl('g', { transform: `translate(${X},${Y})` });
  const leg = (side, fill) => svgEl('rect', { class:`rw-leg rw-leg-${side}`,
    x:-5.5*s, y:-24*s, width:11*s, height:30*s, rx:5*s, fill });

  g.appendChild(leg('r', shade(o.pants, .72)));
  g.appendChild(armSVG(o, s, 'r'));
  g.appendChild(svgEl('rect', { x:-16*s, y:-64*s, width:32*s, height:42*s, rx:12*s, fill:o.shirt }));
  g.appendChild(leg('l', o.pants));
  g.appendChild(armSVG(o, s, 'l'));
  // Tóc: vành tóc quanh đỉnh đầu + búi phía sau gáy (mặt quay sang trái theo
  // hướng vẽ gốc). Trước đây path tóc nằm ở ngang ngực nên bị thân che kín.
  if(o.hair){
    g.appendChild(svgEl('circle', { cx:0, cy:-81*s, r:17.5*s, fill:o.hair }));
    g.appendChild(svgEl('circle', { cx:13*s, cy:-72*s, r:6.5*s, fill:o.hair }));
  }
  g.appendChild(svgEl('circle', { cx:0, cy:-78*s, r:17*s, fill:o.skin }));
  inner.appendChild(g);
}
// Người ngồi lái xe máy — chỉ đầu + thân (không vẽ chân vì đang gập ngồi).
function riderSVG(inner, o, dx, dy){
  const s = o.scale, X = dx||0, Y = dy||0;
  const g = svgEl('g', { transform: `translate(${X},${Y})` });
  g.appendChild(svgEl('rect', { x:-13*s, y:-30*s, width:26*s, height:32*s, rx:11*s, fill:o.shirt }));
  g.appendChild(svgEl('circle', { cx:0, cy:-42*s, r:13*s, fill:o.skin }));
  inner.appendChild(g);
}
let roadActors = [], roadLast = 0, roadNext = 0;
function spawnActor(){
  const tot = ROAD_KINDS.reduce((a,k)=>a+k.w,0); let r = Math.random()*tot, kind = ROAD_KINDS[0];
  for(const k of ROAD_KINDS){ if((r -= k.w) < 0){ kind = k; break; } }
  // làn trên (y 806) chạy sang trái, làn dưới sang phải; vỉa hè đi cả hai chiều
  const dir = kind.y === 806 ? -1 : kind.y === 880 ? 1 : (Math.random() < .5 ? -1 : 1);
  const g = document.createElementNS(SVGNS,'g'), inner = document.createElementNS(SVGNS,'g');
  if(dir > 0) inner.setAttribute('transform','scale(-1,1)');
  if(kind.leash){
    const l = document.createElementNS(SVGNS,'path');
    l.setAttribute('d','M-8,-23 Q-16,-13 -26,-3'); l.setAttribute('stroke','#b3261e'); l.setAttribute('stroke-width','2.5'); l.setAttribute('fill','none');
    inner.appendChild(l);
  }
  for(const p of kind.parts){
    if(p.person){ personSVG(inner, p.person, p.dx, p.dy); continue; }
    if(p.rider){ riderSVG(inner, p.rider, p.dx, p.dy); continue; }
    const t = document.createElementNS(SVGNS,'text');
    t.setAttribute('x', p.dx||0); t.setAttribute('y', p.dy||0); t.setAttribute('font-size', p.fs);
    t.setAttribute('text-anchor','middle'); t.textContent = p.t; inner.appendChild(t);
  }
  g.appendChild(inner); fActors.appendChild(g);
  const x = dir > 0 ? -120 : 1720;
  // req #159 (phản hồi): người đi bộ "bước" — nhún người lên xuống theo quãng
  // đường đã đi (không phải theo thời gian) nên nhịp bước luôn đều dù tốc độ
  // khác nhau; xe cộ (walk=false) đứng yên theo chiều dọc như cũ.
  const v = dir*kind.speed*(0.85+Math.random()*0.3);
  // req (giảng viên): chân "dao động hơi nhanh". Nhịp bước trước đây cố định
  // .46s bất kể đi nhanh hay chậm nên bàn chân quay tít hơn thân người di
  // chuyển. Nay tính theo quãng đường thật: một chu kỳ = 2 bước, mỗi bước dài
  // ≈ 2·(dài chân 30)·sin(biên độ 24°) → người lớn ra ~0,9s, em bé đi chậm thì
  // bước cũng thưa theo.
  const per = kind.parts.find(p => p.person);
  if(per){
    const stride = 4 * 30 * per.person.scale * Math.sin(24 * Math.PI / 180);
    g.style.setProperty('--rw-dur', (stride / Math.abs(v)).toFixed(2) + 's');
  }
  roadActors.push({ g, x, y:kind.y, v, walk:!!kind.walk, dist:0 });
}
function roadTick(ts){
  requestAnimationFrame(roadTick);
  if(!hasKey || !document.body.classList.contains('view-facade') || document.hidden){ roadLast = ts; return; }
  const dt = Math.min(0.05, (ts - (roadLast||ts))/1000); roadLast = ts;
  if(ts >= roadNext && roadActors.length < 6){ spawnActor(); roadNext = ts + 1200 + Math.random()*2800; }
  roadActors = roadActors.filter(a => {
    a.x += a.v*dt;
    if(a.x < -200 || a.x > 1800){ a.g.remove(); return false; }
    let ty = a.y;
    if(a.walk){ a.dist += Math.abs(a.v)*dt; ty += Math.sin(a.dist/16) * 2.6; }
    a.g.setAttribute('transform', 'translate(' + a.x.toFixed(1) + ',' + ty.toFixed(1) + ')');
    return true;
  });
}
requestAnimationFrame(roadTick);

/* ---- keyboard: steer in map view, Enter to interact ---- */
const P_KEYMAP = { arrowup:'up', w:'up', arrowdown:'down', s:'down', arrowleft:'left', a:'left', arrowright:'right', d:'right' };
document.addEventListener('keydown', e=>{
  if(!document.body.classList.contains('view-map')) return;
  // req #176: đang gõ trong ô nhập (vd hộp gửi yêu cầu) thì KHÔNG bắt phím — trước đây
  // W/A/S/D và Enter bị chặn nên không gõ được tiếng Việt.
  const ae = document.activeElement, tg = ae && ae.tagName;
  if(e.isComposing || tg==='INPUT' || tg==='TEXTAREA' || tg==='SELECT' || (ae && ae.isContentEditable)) return;
  if(e.key === 'Enter'){ if(pHereZone){ doZoneAction(pHereZone); e.preventDefault(); } return; }
  const dir = P_KEYMAP[e.key.toLowerCase()];
  if(dir){ pKeys[dir] = true; e.preventDefault(); }
});
document.addEventListener('keyup', e=>{
  const dir = P_KEYMAP[e.key.toLowerCase()];
  if(dir){ pKeys[dir] = false; }
});

/* ---- keyboard: on the pharmacy screen, type a tủ's number to jump
   straight to it (matches the number badge on its tab). Digits typed in
   quick succession combine — e.g. "1" then "8" within the pause window
   jumps to tủ 18 — like typing a channel number, so multi-digit tủ are
   reachable without hunting through the tab bar. */
let cabJumpBuf = '', cabJumpT = null;
document.addEventListener('keydown', e=>{
  if(!document.body.classList.contains('view-pharmacy')) return;
  if(e.ctrlKey || e.metaKey || e.altKey) return;
  if(!/^[0-9]$/.test(e.key)) return;
  const tag = document.activeElement && document.activeElement.tagName;
  if(tag==='INPUT' || tag==='TEXTAREA' || tag==='SELECT') return;
  e.preventDefault();
  cabJumpBuf += e.key;
  clearTimeout(cabJumpT);
  cabJumpT = setTimeout(()=>{ cabJumpBuf=''; }, 600);
  const idx = parseInt(cabJumpBuf,10) - 1;
  if(idx>=0 && idx<cabinets.length && cabOpen(idx)) showCabinet(idx);
});

/* ---- hand tracking: pinch (ngón cái + ngón trỏ) qua webcam để kéo hộp
   thuốc vào tủ mà không cần chuột/chạm. Dùng chung @mediapipe/tasks-vision
   đã có sẵn ở /vendor/mediapipe (như compounding-lab.html) nhưng ở đây
   không có scene 3D — chụm tay được ánh xạ THẲNG sang toạ độ màn hình
   (clientX/clientY), rồi PHÁT LẠI làm PointerEvent thật lên đúng cơ chế
   kéo-thả pointerdown/move/up mà makeBoxDraggable() đã dùng cho chuột/chạm
   — không phải viết lại luật kéo-thả/FEFO/chấm điểm riêng cho tay. */
const HAND_POINTER_ID = 9001;
const handBtnEl = document.getElementById('handBtn');
const handCamEl = document.getElementById('handCamPreview');
const handCamCtx = handCamEl.getContext('2d');
const handCursorEl = document.getElementById('handCursor');
const HAND_SECURE = window.isSecureContext && !!navigator.mediaDevices?.getUserMedia;
const handState = { running:false, landmarker:null, video:null, lastVideoTime:-1, pinching:false, grabbing:false, sx:undefined, sy:undefined };

let handPreloadPromise = null;
function preloadHand(){
  if(handPreloadPromise) return handPreloadPromise;
  handPreloadPromise = (async () => {
    const { HandLandmarker, FilesetResolver } = await import('./vendor/mediapipe/vision_bundle.mjs');
    const fileset = await FilesetResolver.forVisionTasks('./vendor/mediapipe/wasm');
    handState.landmarker = await HandLandmarker.createFromOptions(fileset, {
      baseOptions: { modelAssetPath: './models/hand_landmarker.task', delegate: 'GPU' },
      runningMode: 'VIDEO', numHands: 1,
    });
  })();
  return handPreloadPromise;
}

async function startHandTracking(){
  handBtnEl.disabled = true;
  handBtnEl.textContent = '⏳ Đang tải...';
  try{
    await preloadHand();
    handBtnEl.textContent = '📷 Đang mở camera...';
    const stream = await navigator.mediaDevices.getUserMedia({ video:{ facingMode:'user', width:640, height:480 }, audio:false });
    handState.video = document.createElement('video');
    handState.video.srcObject = stream;
    handState.video.autoplay = true; handState.video.muted = true; handState.video.playsInline = true;
    await new Promise(r => (handState.video.onloadedmetadata = r));
    await handState.video.play();
    handState.running = true;
    handBtnEl.classList.add('active');
    handBtnEl.textContent = '✋ Tắt xếp bằng tay';
    handBtnEl.disabled = false;
    handCamEl.classList.add('shown');
    handCursorEl.classList.add('shown');
    showCartMsg('🖐️ Đưa tay vào khung camera. Chụm ngón cái + trỏ để cầm hộp, thả ra để đặt xuống.', true);
  }catch(err){
    handBtnEl.disabled = false;
    handBtnEl.textContent = '🖐️ Xếp bằng tay (camera)';
    showCartMsg('❌ Không mở được camera: ' + (err.message || err.name), false);
  }
}

function stopHandTracking(){
  if(!handState.running) return;
  handState.running = false;
  handState.video?.srcObject?.getTracks().forEach(t => t.stop());
  handState.video = null;
  handState.pinching = false;
  releaseHandGrab();
  handBtnEl.classList.remove('active');
  handBtnEl.textContent = '🖐️ Xếp bằng tay (camera)';
  handCamEl.classList.remove('shown');
  handCursorEl.classList.remove('shown','pinching');
}

if(!HAND_SECURE){
  handBtnEl.disabled = true;
  handBtnEl.title = 'Cần HTTPS (hoặc localhost) để dùng camera';
}else{
  handBtnEl.addEventListener('click', () => handState.running ? stopHandTracking() : startHandTracking());
}

/* chụm xuống: nếu tay đang trỏ vào 1 nút bấm (thùng hàng, đổi lô, tab tủ…)
   thì coi như bấm nút đó — để có thể chạy CẢ LƯỢT chơi chỉ bằng tay, không
   riêng phần kéo-thả. Không có nút nào ở dưới thì mới cầm hộp đang chờ. */
function handPinchDown(clientX, clientY){
  const el = document.elementFromPoint(clientX, clientY);
  const btn = el && el.closest ? el.closest('button:not(#handBtn)') : null;
  if(btn && !btn.disabled){ btn.click(); return; }
  const box = currentCartBox;
  if(!box || box.classList.contains('placed')) return;
  /* "cầm" hộp: pointerdown ngay tại tâm hộp (giữ nguyên vị trí ban đầu) rồi
     pointermove thẳng tới vị trí tay thật — hộp bay tới nằm dưới tay ngay
     lập tức thay vì lệch theo đúng điểm chụm (tay đưa vào khung hình khó mà
     chụm trúng hộp bé xíu như dùng chuột). */
  const rect = box.getBoundingClientRect();
  box.dispatchEvent(new PointerEvent('pointerdown', {
    clientX: rect.left+rect.width/2, clientY: rect.top+rect.height/2,
    pointerId: HAND_POINTER_ID, pointerType:'touch', isPrimary:true, bubbles:true, cancelable:true, button:0,
  }));
  handState.grabbing = true;
  document.dispatchEvent(new PointerEvent('pointermove', {
    clientX, clientY, pointerId: HAND_POINTER_ID, pointerType:'touch', isPrimary:true, bubbles:true, cancelable:true,
  }));
}
function handPinchMove(clientX, clientY){
  if(!handState.grabbing) return;
  document.dispatchEvent(new PointerEvent('pointermove', {
    clientX, clientY, pointerId: HAND_POINTER_ID, pointerType:'touch', isPrimary:true, bubbles:true, cancelable:true,
  }));
}
function releaseHandGrab(clientX, clientY){
  if(!handState.grabbing) return;
  handState.grabbing = false;
  document.dispatchEvent(new PointerEvent('pointerup', {
    clientX: clientX ?? 0, clientY: clientY ?? 0,
    pointerId: HAND_POINTER_ID, pointerType:'touch', isPrimary:true, bubbles:true, cancelable:true,
  }));
}

function updateHand(time){
  if(!handState.running || !handState.landmarker || !handState.video) return;
  if(handState.video.currentTime === handState.lastVideoTime) return;
  handState.lastVideoTime = handState.video.currentTime;
  const result = handState.landmarker.detectForVideo(handState.video, time);
  handCamCtx.drawImage(handState.video, 0, 0, handCamEl.width, handCamEl.height);

  if(!result.landmarks || !result.landmarks.length){
    if(handState.pinching){ handState.pinching = false; releaseHandGrab(); }
    handCursorEl.classList.remove('shown');
    return;
  }
  handCursorEl.classList.add('shown');
  const lm = result.landmarks[0];
  const t = lm[4], idx = lm[8];   // đầu ngón cái, đầu ngón trỏ
  handCamCtx.fillStyle = '#38bdf8';
  for(const p of lm){ handCamCtx.beginPath(); handCamCtx.arc(p.x*handCamEl.width, p.y*handCamEl.height, 3, 0, Math.PI*2); handCamCtx.fill(); }
  handCamCtx.strokeStyle = handState.pinching ? '#ef4444' : '#38bdf8';
  handCamCtx.lineWidth = 2;
  handCamCtx.beginPath();
  handCamCtx.moveTo(t.x*handCamEl.width, t.y*handCamEl.height);
  handCamCtx.lineTo(idx.x*handCamEl.width, idx.y*handCamEl.height);
  handCamCtx.stroke();

  // toạ độ màn hình: lật ngang (preview đang lật CSS để giống soi gương) rồi
  // làm mượt (EMA) để bớt rung tay trước khi phát PointerEvent
  const px = (t.x+idx.x)/2, py = (t.y+idx.y)/2;
  const mx = 1-px, my = py;
  if(handState.sx===undefined){ handState.sx=mx; handState.sy=my; }
  handState.sx += (mx-handState.sx)*0.4;
  handState.sy += (my-handState.sy)*0.4;
  const clientX = handState.sx*window.innerWidth, clientY = handState.sy*window.innerHeight;
  handCursorEl.style.left = clientX+'px';
  handCursorEl.style.top = clientY+'px';

  const pinchDist = Math.hypot(t.x-idx.x, t.y-idx.y);
  const wasPinching = handState.pinching;
  if(!handState.pinching && pinchDist < 0.05) handState.pinching = true;
  else if(handState.pinching && pinchDist > 0.08) handState.pinching = false;
  handCursorEl.classList.toggle('pinching', handState.pinching);

  if(handState.pinching && !wasPinching) handPinchDown(clientX, clientY);
  else if(handState.pinching) handPinchMove(clientX, clientY);
  else if(!handState.pinching && wasPinching) releaseHandGrab(clientX, clientY);
}
(function handLoop(t){ updateHand(t); requestAnimationFrame(handLoop); })();

/* req (tối ưu mobile): mặt tiền vẽ theo khung 16:9 (1600×900) + preserveAspectRatio
   "slice" — trên điện thoại dọc (rất cao, rất hẹp) "slice" phải cắt bỏ gần hết
   hai bên để lấp đầy chiều cao, chỉ còn thấy một dải hẹp ở giữa biển hiệu (mất cả
   hai logo, mất luôn nút Pharma Crush/Sort). Đổi sang "meet" khi màn hình dọc/hẹp
   hơn hẳn 16:9 — nhìn thấy trọn cảnh (viền trên dưới trống bù vào), còn màn ngang
   bình thường vẫn giữ "slice" để lấp đầy khung như cũ. */
const facadeSvgEl = document.getElementById('facadeSvg');
function fitFacade(){
  const isPortraitNarrow = (window.innerWidth / window.innerHeight) < (1600/900) * 0.7;
  facadeSvgEl.setAttribute('preserveAspectRatio', isPortraitNarrow ? 'xMidYMid meet' : 'xMidYMid slice');
}
fitFacade();
window.addEventListener('resize', fitFacade);

/* ---- boot: req #154 — mở ở MẶT TIỀN nhà thuốc, phải bấm cửa mới vào sơ đồ ----
   pStart()/fitMap() vẫn chạy sẵn trong showMap() khi người dùng bước qua cửa. */
applyLocks();
// req #161: vào bằng ?tu=rx|otc (bấm tủ trên sơ đồ) thì mở thẳng tủ đó.
// req #164 (phản hồi): vào bằng ?view=map (đã qua cửa) thì F5 vẫn ở lại sơ đồ, không bị đẩy ra mặt tiền.
{
  const bootParams = new URLSearchParams(location.search);
  if(bootParams.has('tu')) showPharmacy();
  else if(bootParams.get('view') === 'map') showMap();
  else showFacade();
}
