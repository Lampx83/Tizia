// SimulationClient — port từ Pharmacy-AI/src/components/SimulationClient.tsx.
// Wire chat panel + actions → /api/pharmacy/* + scoring panel.
import { buildScene, makeDrugLabelTex, makeDrugBackLabelTex, makeDrugSideLabelTex, getBoxStyle, deviceModelFor } from './scene.js?v=ph0803';
import { loadDrugs } from './catalog.js?v=ph0803';
import { initMobileUI } from './mobile-ui.js?v=ph0803';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// Tải model .glb thiết bị/bao bì trực tiếp (dùng chung cho inspector "mở hộp").
// Ưu tiên model thật thay vẽ tay; lỗi tải thì GIỮ NGUYÊN procedural (không clear).
const _unitGlbCache = new Map();
function unitGlbScene(file) {
  if (!_unitGlbCache.has(file)) {
    _unitGlbCache.set(file, new Promise((res, rej) =>
      new GLTFLoader().load(`./models/pharmacy/devices/${file}`, g => res(g.scene), undefined, rej)));
  }
  return _unitGlbCache.get(file);
}
function swapUnitToGlb(group, file, sizeRef) {
  unitGlbScene(file).then(src => {
    const m = src.clone(true);
    m.traverse(o => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = true; } });
    let bb = new THREE.Box3().setFromObject(m);
    const sz = bb.getSize(new THREE.Vector3());
    m.scale.setScalar(sizeRef / (Math.max(sz.x, sz.y, sz.z) || 1));
    bb = new THREE.Box3().setFromObject(m);
    m.position.sub(bb.getCenter(new THREE.Vector3()));   // canh tâm về gốc group
    while (group.children.length) group.remove(group.children[0]);  // bỏ procedural placeholder
    group.add(m);
  }).catch(() => { /* giữ procedural làm fallback */ });
}
import { openPosTerminal } from './pos.js?v=ph0803';
import { openHdsdEditor, openPackageEditor, PACKAGE_TYPES, RETAIL_FORMS } from './label-editor.js?v=ph0803';
import { STAGE_LABEL } from './rubric.js';

const $ = (id) => document.getElementById(id);

// Số viên trên 1 vỉ — đọc từ quy cách đóng gói (vd "Hộp, 3 vỉ x 14 viên" → 14).
// Mặc định 10 nếu không nhận diện được. Giới hạn 30 để vỉ không quá rộng.
function pillsPerBlister(drug) {
  const s = (drug.pack || drug.retailUnit || '').toLowerCase();
  let m = s.match(/vỉ\s*[x×*]\s*(\d+)/);          // "n vỉ x m viên"
  if (!m) m = s.match(/[x×*]\s*(\d+)\s*viên/);     // "... x m viên"
  if (!m) m = s.match(/(\d+)\s*viên\s*\/\s*vỉ/);   // "m viên/vỉ"
  return m ? Math.min(30, Math.max(1, +m[1])) : 10;
}

// Nhận dạng DẠNG BAO BÌ TRỰC TIẾP (đơn vị nhỏ nhất chứa thuốc): vỉ / gói / ống / lọ.
// Yêu cầu thầy 28/6 #3: phải theo ĐÚNG quy cách đóng gói trong danh mục, KHÔNG
// chỉ suy từ "form". Ví dụ Enterogermina form="Hỗn dịch uống" nhưng quy cách
// "Hộp 02 vỉ x 10 ống x 05ml" → bao bì trực tiếp là ỐNG (không phải lọ).
// Đọc token từ quy cách (pack/packaging) + retailUnit + stockUnit; tách theo
// khoảng trắng/số để khớp ĐÚNG từ "ống" (tránh dính "uống" trong form).
function detectUnitKind(drug) {
  const blob = [drug.pack, drug.packaging, drug.retailUnit, drug.stockUnit]
    .filter(Boolean).join(' ').toLowerCase();
  const tokens = new Set(blob.split(/[\s\d×x*().,\/+\-]+/).filter(Boolean));
  const has = (...ws) => ws.some(w => tokens.has(w));
  // Thứ tự ưu tiên: gói → ống → vỉ → lọ/tuýp/chai → (viên rời) vỉ. Đặt "ống"/"vỉ"
  // trước để quy cách "x vỉ x ống" (ống đựng) hoặc "x vỉ x viên" (vỉ ép) ra đúng.
  if (has('gói', 'cốm', 'sachet')) return 'goi';
  if (has('ống', 'ong', 'ampoule', 'ampul')) return 'ong';
  if (has('vỉ', 'blister')) return 'vi';
  if (has('lọ', 'chai', 'tuýp', 'tuyp', 'tube', 'bottle')) return 'lo';
  if (has('viên', 'nén', 'nang', 'capsule', 'tablet')) return 'vi';
  // Fallback: suy từ form khi danh mục thiếu quy cách.
  const f = (drug.form || '').toLowerCase();
  if (/gói|bột|cốm/.test(f)) return 'goi';
  if (/tiêm|dung dịch tiêm/.test(f)) return 'ong';
  if (/lọ|chai|dung dịch|hỗn dịch|huyền dịch|siro|sirô|nhỏ|xịt|gel|kem|cao|mỡ|dầu/.test(f)) return 'lo';
  return 'vi';
}

// ── Overlay tải (#scene-loading trong markup trang) ─────────────────────────
// Trước đây vào trang trên điện thoại là MẢNG TRẮNG vài giây không báo gì. Overlay
// hiện sẵn từ HTML; ở đây chỉ cập nhật BƯỚC rồi ẩn khi khung 3D đầu tiên đã vẽ.
function setLoadingStep(text) {
  const el = document.getElementById('scene-loading-step');
  if (el) el.textContent = text;
}
function hideSceneLoading() {
  const el = document.getElementById('scene-loading');
  if (!el) return;
  (window.__sceneLoadingTimers || []).forEach(clearTimeout);   // tắt nhắc "mạng chậm"/lỗi
  el.classList.add('is-hidden');
  setTimeout(() => el.remove(), 400);                          // gỡ sau khi fade xong
}
// Ẩn overlay SAU khung hình 3D đầu tiên (2×rAF) để không loé mảng trắng. NHƯNG khi
// tab đang ẩn (mở link ở tab nền) trình duyệt NGƯNG rAF → overlay treo tới mốc 45s
// rồi báo "không tải được" SAI dù scene đã dựng xong. Nên chốt thêm timeout: cái
// nào tới trước thì ẩn (tab ẩn thì chẳng có gì để loé).
function scheduleHideSceneLoading() {
  let done = false;
  const go = () => { if (done) return; done = true; hideSceneLoading(); };
  requestAnimationFrame(() => requestAnimationFrame(go));
  setTimeout(go, 800);
}

// Renderer DÙNG CHUNG cho cửa sổ soi thuốc (inspector). Tạo WebGL context là thao
// tác ĐẮT (100–500ms, máy yếu còn lâu hơn) và trình duyệt giới hạn ~16 context/tab —
// tạo–huỷ mỗi lần mở khiến context của SCENE CHÍNH bị evict → "bấm thuốc load mãi",
// càng mở nhiều càng ì. Tạo 1 lần, tái dùng cả canvas lẫn context cho mọi lần mở.
let _insShared = null;
function acquireInspectorRenderer() {
  if (!_insShared) {
    const canvas = document.createElement('canvas');
    canvas.className = 'ins-canvas';
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    _insShared = { canvas, renderer };
  }
  return _insShared;
}

export async function startSimulation({ moduleId = 'gpp' } = {}) {
  // 0. Nạp danh mục thuốc từ DB (content_datasets) TRƯỚC khi buildScene — scene.js
  //    đọc ALL_DRUGS/CABINETS lúc dựng kệ. loadDrugs() fill ALL_DRUGS bằng push.
  setLoadingStep('Đang tải danh mục thuốc…');
  await loadDrugs();

  // 1. Create session on server
  setLoadingStep('Đang tạo phiên thực hành…');
  let session, scenario;
  try {
    const r = await fetch('/api/pharmacy/session', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ moduleId })
    });
    const data = await r.json();
    if (!r.ok) throw new Error(data.error || 'session create failed');
    session = data.session; scenario = data.scenario;
  } catch (e) {
    hideSceneLoading();   // KHÔNG để overlay đứng mãi khi lỗi phiên
    alert('Không khởi tạo được phiên: ' + e.message + '\nKiểm tra đăng nhập?');
    return;
  }

  // 2. Render NPC opening — nguyên tắc 22/07 #1: BỆNH NHÂN KHÔNG NÓI TRƯỚC, dược
  // sĩ phải chào trước. Mô tả cảnh đã GỘP vào `setting` (ô "Đối thoại với" trên
  // cùng) → npcOpening rỗng thì hội thoại bắt đầu TRỐNG, chờ sinh viên mở lời.
  if (scenario.npcOpening) appendBubble('npc', scenario.npcOpening);
  $('npc-role').textContent = scenario.npcRole;
  $('scenario-title').textContent = scenario.title;
  // Yêu cầu gửi từ trang này kèm document.title → để tên tình huống cho AI biết đúng chỗ.
  document.title = `${scenario.title} — Pharmacomm · Tizia`;
  $('scenario-setting').textContent = scenario.setting;

  // 3. Render hints per stage
  $('hints').innerHTML = scenario.stageRules.map(r =>
    `<li><b>${STAGE_LABEL[r.stage]}:</b> ${r.hint}</li>`
  ).join('');

  // 4. Build 3D scene
  // Avatar tuỳ biến: ưu tiên ?avatar=… → avatar đã tạo & nhớ trong localStorage →
  // null (avatar local mặc định, offline). Trình duyệt tải trực tiếp từ CDN RPM.
  const AVATAR_KEY = 'tizia_pharmacy_avatar';
  const AVATAR_HEIGHT_KEY = 'tizia_pharmacy_avatar_height';
  const AVATAR_SKIN_KEY = 'tizia_pharmacy_avatar_skin';
  const AVATAR_SHIRT_KEY = 'tizia_pharmacy_avatar_shirt';
  const AVATAR_COND_KEY = 'tizia_pharmacy_avatar_cond';
  const AVATAR_EXPR_KEY = 'tizia_pharmacy_avatar_expr';
  const AVATAR_HAIR_KEY = 'tizia_pharmacy_avatar_hair';
  const SHIRT_COLORS = ['#2563eb', '#0d9488', '#16a34a', '#e11d48', '#f59e0b', '#6b7280', '#f5f5f5', '#7c3aed'];
  const CONDITIONS = [['none', 'Bình thường'], ['rash', 'Phát ban'], ['hives', 'Mề đay'], ['jaundice', 'Vàng da'], ['pallor', 'Xanh xao'], ['flush', 'Đỏ (sốt)'], ['bruise', 'Bầm tím'], ['cyanosis', 'Tím tái']];
  const EXPRESSIONS = [['none', 'Bình thường'], ['pain', '😣 Đau bụng'], ['worried', '😟 Lo lắng'], ['annoyed', '😖 Đau răng, sốt ruột']];
  const HAIR_SW = [['none', '#3a3330'], ['black', '#1c1816'], ['brown', '#5c3822'], ['gray', '#c8c5c1'], ['blonde', '#c9a460']];
  // Avatar do KỊCH BẢN cast (scenario.avatarUrl — vd OTC-01 = Chị H, NỮ) được ưu
  // tiên hơn lựa chọn đã lưu trong máy: bệnh nhân là NHÂN VẬT của tình huống, không
  // phải avatar cá nhân. ?avatar= vẫn cao nhất (để test). Nút "Khách hàng" vẫn cho
  // đổi tay sau khi vào scene nếu muốn.
  const _avatarUrl = new URLSearchParams(location.search).get('avatar')
    || scenario.avatarUrl
    || (() => { try { return localStorage.getItem(AVATAR_KEY); } catch { return null; } })()
    || null;
  const _avatarHeight = (() => { try { return +localStorage.getItem(AVATAR_HEIGHT_KEY) || 1; } catch { return 1; } })();
  const _avatarSkin = (() => { try { return +localStorage.getItem(AVATAR_SKIN_KEY) || 0; } catch { return 0; } })();
  const _avatarShirt = (() => { try { return localStorage.getItem(AVATAR_SHIRT_KEY) || null; } catch { return null; } })();
  const _avatarCond = (() => { try { return localStorage.getItem(AVATAR_COND_KEY) || 'none'; } catch { return 'none'; } })();
  const _avatarExpr = (() => { try { return localStorage.getItem(AVATAR_EXPR_KEY) || 'none'; } catch { return 'none'; } })();
  const _avatarHair = (() => { try { return localStorage.getItem(AVATAR_HAIR_KEY) || null; } catch { return null; } })();
  setLoadingStep('Đang dựng nhà thuốc 3D…');
  // Khai báo TRƯỚC buildScene vì opts.onNearbyDrugs (callback dưới) tham chiếu tới;
  // callback chỉ chạy sau khi initMobileUI đã gán nên không TDZ.
  let mobileUI = null;
  const sim = buildScene($('scene-canvas'), {
    avatarUrl: _avatarUrl,
    avatarHeight: _avatarHeight,
    skinTone: _avatarSkin,
    shirtColor: _avatarShirt,
    condition: _avatarCond,
    expression: _avatarExpr,
    hairColor: _avatarHair,
    onAction: async (type, payload) => {
      await postAction(type, payload);
    },
    onPosOpen: () => openPos(),
    onLabelOpen: () => openLabel(),
    onLabelPlaceStart: (drugId, label) => openStickerPlacement(drugId, label),
    onPackageOpen: (packageType) => openPackageFlow(packageType),
    onPendingLabelClear: () => { $('pending-label').hidden = true; },
    onBookOpen: (bookId) => openReferenceBook(bookId),
    onInspectDrug: (payload) => openInspector(payload),
    onNotepadOpen: () => openNotepad(),
    onSalesTrayOpen: () => openSalesTray(),
    onRetailBasketOpen: () => openRetailBasket(),
    onWalkPrompt: (txt) => {
      const el = $('walk-prompt');
      if (!el) return;
      el.textContent = txt || '';
      el.hidden = !txt;
    },
    onToast: (msg) => showToast(msg),
    // Ngón tay chạm vùng kệ → liệt kê thuốc quanh đó. CHỈ có ở vỏ mobile (≤820px);
    // nơi khác trả false để scene xử lý chạm như thường.
    onNearbyDrugs: (list) => mobileUI ? (mobileUI.showNear(list), true) : false,
    // Vào/ra immersive VR (Meta Quest) → ẩn/hiện nút trên màn phẳng (headset không
    // thấy DOM nên nút vô nghĩa lúc đang trong VR).
    onXRChange: (inVR) => { const b = document.getElementById('pharm-xr-btn'); if (b) b.hidden = inVR; }
  });
  window.__sim = sim;
  // Cảm xúc ban đầu theo kịch bản (vd OTC-01: mẹ đang lo lắng) — chờ nhân vật sẵn sàng.
  if (scenario.initialExpression) {
    const applyExpr = () => { sim.isCharacterReady?.() ? sim.setAvatarExpression(scenario.initialExpression) : setTimeout(applyExpr, 200); };
    applyExpr();
  }
  // buildScene đã set animation loop → đợi khung hình đầu rồi mới ẩn overlay (ẩn
  // ngay sẽ loé mảng trắng 1 nhịp). Không chờ avatar (.glb) vì model lỗi là treo mãi.
  scheduleHideSceneLoading();
  // Vỏ mobile (≤820px): ngăn kéo "Chọn thuốc" + panel hội thoại thành tab dưới.
  // Trên màn hẹp hộp thuốc chỉ ~6.6px nên KHÔNG chạm trúng được — ngăn kéo là
  // đường đi thay thế (chạm dòng 48px → focus camera + mở thẳng cửa sổ thuốc).
  mobileUI = initMobileUI({ sim, openDrug: (id) => sim.pickDrug(id) });

  // Nút "Vào VR (kính)" — CHỈ hiện trên thiết bị hỗ trợ WebXR immersive (Meta Quest…).
  // Máy thường trả false → không thêm nút → 0 ảnh hưởng. Đeo kính: đứng giữa nhà
  // thuốc, quay đầu 360°, tia tay cầm chọn thuốc → bảng 3D thông tin.
  sim.isXRSupported?.().then(ok => {
    if (!ok) return;
    const b = document.createElement('button');
    b.id = 'pharm-xr-btn'; b.type = 'button';
    b.textContent = '🥽 Vào VR (kính)';
    b.style.cssText = 'position:fixed;top:64px;left:50%;transform:translateX(-50%);z-index:210;' +
      'padding:12px 20px;min-height:46px;border-radius:999px;border:1px solid #22d3ee;' +
      'background:linear-gradient(180deg,#0e7490,#155e75);color:#ecfeff;font:inherit;' +
      'font-size:15px;font-weight:800;cursor:pointer;box-shadow:0 6px 20px rgba(0,0,0,.4)';
    b.addEventListener('click', async () => {
      const started = await sim.startXR?.();
      if (started === false) alert('Không vào được VR. Hãy mở trang bằng trình duyệt Meta Quest và cho phép truy cập VR.');
    });
    document.body.appendChild(b);
  }).catch(() => {});

  // GIỎ RA LẺ — gom các ĐƠN VỊ ra lẻ (vỉ/gói/viên/ống) đã tách khỏi hộp, chờ cho
  // vào bao bì ra lẻ. KHÁC với KHAY BÁN HÀNG (hộp nguyên đem tính tiền).
  const retailBasket = []; // [{ drugId, brand, strength, unit, drug }]
  function addRetailUnit(drug, unit, qty = 1) {
    const n = Math.max(1, Math.floor(qty) || 1);
    for (let i = 0; i < n; i++)
      retailBasket.push({ drugId: drug.id, brand: drug.brand || drug.name, strength: drug.strength || '', unit, drug });
  }

  // Toast nổi giữa-trên màn hình (nhắc thao tác, ví dụ phải đưa thuốc vào khay
  // trước khi dán nhãn). Tự ẩn sau 2.6s.
  let _toastTimer = null;
  function showToast(msg) {
    let t = document.getElementById('pharm-toast');
    if (!t) {
      t = document.createElement('div');
      t.id = 'pharm-toast';
      t.className = 'pharm-toast';
      document.body.appendChild(t);
    }
    t.textContent = msg;
    t.classList.add('show');
    if (_toastTimer) clearTimeout(_toastTimer);
    _toastTimer = setTimeout(() => t.classList.remove('show'), 2600);
  }

  // 5. Helpers
  // Session server lưu IN-MEMORY → server restart/rebuild là mất ("session not
  // found"). Client giữ BẢN SAO transcript + hành động; gặp 404 thì tự tạo phiên
  // mới kèm `restore` rồi làm tiếp — người học không nhận ra gián đoạn, AI vẫn
  // nhớ hội thoại, chấm điểm vẫn đủ hành động.
  const localMsgs = [];
  const localActions = [];
  async function recreateSession() {
    const r = await fetch('/api/pharmacy/session', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ moduleId, restore: { messages: localMsgs, actions: localActions } })
    });
    const d = await r.json();
    if (!r.ok) throw new Error(d.error || 'không tạo lại được phiên');
    session = d.session;
  }
  async function postAction(type, payload) {
    localActions.push({ type, payload: payload || {}, ts: Date.now() });
    try {
      const r = await fetch('/api/pharmacy/action', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId: session.id, type, payload })
      });
      if (r.status === 404) { await recreateSession(); return; }  // restore đã mang theo action này
      const d = await r.json();
      if (d.session) session = d.session;
    } catch {}
  }

  function appendBubble(role, content) {
    const el = document.createElement('div');
    el.className = `bubble ${role}`;
    el.textContent = content;
    $('chat').appendChild(el);
    $('chat').scrollTop = $('chat').scrollHeight;
  }

  async function send() {
    const ta = $('ta');
    const text = ta.value.trim();
    if (!text) return;
    appendBubble('user', text);
    // Bệnh nhân AI rule #11: mời ngồi / mời uống nước → nhân vật 3D ngồi xuống ("cảm ơn"
    // do AI tự trả lời theo persona). Chỉ nhận diện phía dược sĩ (câu vừa gửi).
    if (/(mời[^.?!]{0,14}(ngồi|ghế|uống nước|nước|trà)|\bngồi (ghế|đây|xuống|chờ|nghỉ)|xin mời[^.?!]{0,20}ngồi)/i.test(text)) {
      sim.patientSit?.();
    }
    ta.value = '';
    ta.disabled = true;
    $('send').disabled = true;
    appendBubble('npc', '…');
    const thinking = $('chat').lastChild;
    const scrollBottom = () => { $('chat').scrollTop = $('chat').scrollHeight; };

    // 1 lượt chat: ưu tiên STREAM (SSE — token sinh đến đâu hiện đến đó), lỗi giao
    // thức → fallback endpoint thường. 404 (server restart mất session) → ném
    // sessionLost để vòng ngoài tạo lại phiên (kèm restore) rồi GỬI LẠI câu này.
    const sessionLostErr = () => Object.assign(new Error('session lost'), { sessionLost: true });
    async function chatAttempt() {
      try {
        const r = await fetch('/api/pharmacy/chat-stream', {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sessionId: session.id, message: text })
        });
        if (r.status === 404) throw sessionLostErr();
        if (!r.ok || !r.body || !(r.headers.get('content-type') || '').includes('text/event-stream')) {
          throw new Error('no-stream');
        }
        const reader = r.body.getReader();
        const dec = new TextDecoder();
        let buf = '', shown = '', finalReply = null;
        for (;;) {
          const { done, value } = await reader.read();
          if (done) break;
          buf += dec.decode(value, { stream: true });
          let idx;
          while ((idx = buf.indexOf('\n\n')) >= 0) {
            const chunk = buf.slice(0, idx); buf = buf.slice(idx + 2);
            const line = chunk.split('\n').find(l => l.startsWith('data: '));
            if (!line) continue;
            let j; try { j = JSON.parse(line.slice(6)); } catch { continue; }
            if (j.delta) { shown += j.delta; if (shown.trim()) { thinking.textContent = shown.trimStart(); scrollBottom(); } }
            if (j.done) { finalReply = j.reply || shown; thinking.textContent = finalReply; scrollBottom(); }
          }
        }
        if (finalReply === null && !shown.trim()) throw new Error('empty-stream');
        return finalReply != null ? finalReply : shown.trimStart();
      } catch (e) {
        if (e.sessionLost) throw e;
        // Fallback: endpoint không-stream cũ (server cũ / proxy chặn SSE).
        const r = await fetch('/api/pharmacy/chat', {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sessionId: session.id, message: text })
        });
        if (r.status === 404) throw sessionLostErr();
        const d = await r.json();
        if (!r.ok) throw new Error(d.error || 'chat failed');
        session = d.session;
        const reply = d.session.messages[d.session.messages.length - 1].content;
        thinking.textContent = reply;
        return reply;
      }
    }

    try {
      let reply;
      try {
        reply = await chatAttempt();
      } catch (e) {
        if (!e.sessionLost) throw e;
        await recreateSession();       // phiên mới + khôi phục transcript/hành động
        reply = await chatAttempt();   // gửi lại đúng câu vừa rồi
      }
      // Ghi bản sao SAU khi thành công: nếu phải khôi phục thì restore chưa chứa câu
      // hiện tại → gửi lại không bị trùng tin nhắn trong phiên mới.
      localMsgs.push({ role: 'user', content: text, ts: Date.now() });
      localMsgs.push({ role: 'npc', content: reply, ts: Date.now() });
    } catch (e) {
      thinking.textContent = '[Lỗi: ' + e.message + ']';
    } finally {
      ta.disabled = false; $('send').disabled = false; ta.focus();
    }
  }

  async function finish() {
    if (!confirm('Kết thúc phiên & chấm điểm?')) return;
    try {
      const postScore = () => fetch('/api/pharmacy/score', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId: session.id })
      });
      let r = await postScore();
      // Server restart mất session → khôi phục từ bản sao rồi chấm lại.
      if (r.status === 404) { await recreateSession(); r = await postScore(); }
      const d = await r.json();
      if (!r.ok) throw new Error(d.error || 'score failed');
      renderScore(d.score);
    } catch (e) {
      alert('Chấm điểm thất bại: ' + e.message);
    }
  }

  function renderScore(s) {
    const el = $('score-panel');
    const stages = s.stages.map(st => `<div class="st">
      <b>${STAGE_LABEL[st.stage]}:</b> <span class="sc sc${st.score}">${st.score}/2</span>
      <small>${st.matchedKeywords.length} từ khóa khớp</small>
    </div>`).join('');
    el.innerHTML = `
      <h3>📊 Kết quả SEGUE</h3>
      <div class="total ${s.autoFail ? 'fail' : ''}">
        Tổng: <b>${s.total}/100</b>
        ${s.autoFail ? '<span class="fail-tag">AUTO-FAIL</span>' : ''}
      </div>
      <div class="breakdown">Trọng số: ${s.weighted} · Bonus: +${s.bonus}</div>
      ${s.fatalErrors.length ? '<div class="fatals">' + s.fatalErrors.map(f => `<div class="fatal">⛔ <b>${f.label}</b><br><small>${f.evidence}</small></div>`).join('') + '</div>' : ''}
      <div class="stages">${stages}</div>
      <details><summary>Feedback chi tiết</summary><pre>${s.feedback}</pre></details>
    `;
    el.hidden = false;
  }

  function openPos() {
    const hasRx = !!$('rx-toggle').checked;
    openPosTerminal({
      pickedIds: sim.getPickedIds(),
      pickedItems: sim.getPickedItems?.(),   // kèm dạng bán (hộp/vỉ/gói/ống…)
      hasValidPrescription: hasRx,
      onCheckout: (payload) => postAction('pos_checkout', payload),
      onClose: () => {}
    });
  }
  function openLabel() {
    openHdsdEditor({
      pickedIds: sim.getPickedIds(),
      onCreate: (label) => {
        sim.setPendingLabel(label);
        $('pending-label').hidden = false;
        $('pending-label-text').textContent = `${label.brand} → click hộp ĐÃ ĐƯA VÀO KHAY để dán (không dán trên kệ)`;
        if (!(sim.getPickedIds?.() || []).length) {
          showToast('Chưa có thuốc trong khay. Bấm hộp trên kệ → "Đưa vào khay" trước, rồi click hộp trong khay để dán nhãn.');
        }
      }
    });
  }

  // Overlay: hiện ĐÚNG hình 3D thuốc (hộp HOẶC chai) + kéo nhãn HDSD vào chỗ trống.
  function openStickerPlacement(drugId, label) {
    // getDrugFace3D render chính hình 3D (hộp/chai) → hết cảnh "chai mà hiện hộp".
    const face = sim.getDrugFace3D?.(drugId) || sim.getDrugFace?.(drugId);
    if (!face) { sim.applyHdsdSticker?.(drugId, label, { u: 0.5, v: 0.5 }); return; }
    if (document.querySelector('.sticker-place-overlay')) return;
    const shapeWord = face.isBottle ? 'chai' : 'hộp';
    const overlay = document.createElement('div');
    overlay.className = 'sticker-place-overlay';
    overlay.innerHTML = `
      <div class="sp-modal">
        <div class="sp-head">
          <span>🏷️ Dán nhãn HDSD lên ${shapeWord} <b>${face.brand || ''}</b></span>
          <button class="sp-close" type="button" aria-label="Đóng">✕</button>
        </div>
        <div class="sp-hint">Kéo nhãn tới <b>vùng trống</b> trên ${shapeWord}, không che tên/thông tin thuốc.${face.isBottle ? ' Nhãn sẽ <b>uốn cong ôm thân chai</b> khi dán.' : ''} Rồi bấm <b>Dán</b>.</div>
        <div class="sp-stage">
          <div class="sp-box">
            <canvas class="sp-face"></canvas>
            <canvas class="sp-sticker" title="Kéo nhãn vào vùng trống"></canvas>
          </div>
        </div>
        <div class="sp-foot">
          <button class="sp-cancel" type="button">Huỷ</button>
          <button class="sp-apply" type="button">✅ Dán nhãn</button>
        </div>
      </div>`;
    document.body.appendChild(overlay);
    const cv = overlay.querySelector('.sp-face');
    const box = overlay.querySelector('.sp-box');
    const sticker = overlay.querySelector('.sp-sticker');
    // Vẽ mặt hộp — khung CAO HƠN (hộp to lên, yêu cầu thầy #10) để dễ chọn vùng dán.
    const FACE_H = 460, FACE_W = Math.round(FACE_H * (face.canvas.width / face.canvas.height));
    cv.width = face.canvas.width; cv.height = face.canvas.height;
    cv.getContext('2d').drawImage(face.canvas, 0, 0);
    cv.style.width = FACE_W + 'px'; cv.style.height = FACE_H + 'px';
    box.style.width = FACE_W + 'px'; box.style.height = FACE_H + 'px';
    // Nhãn kéo-thả = ĐÚNG thiết kế nhãn HDSD sẽ in lên hộp (WYSIWYG): render
    // texture nhãn PORTRAIT 360×480 (cùng hàm + cùng tỉ lệ với lúc dán thật).
    const stickerTex = sim.makeHdsdStickerTex?.(label);
    let skRatio = 480 / 360;
    if (stickerTex?.image) {
      sticker.width = stickerTex.image.width; sticker.height = stickerTex.image.height;
      skRatio = stickerTex.image.height / stickerTex.image.width;
      sticker.getContext('2d').drawImage(stickerTex.image, 0, 0);
      stickerTex.dispose?.();
    }
    const SK_W = Math.round(FACE_W * 0.33);   // nhãn NHỎ lại so với hộp (yêu cầu 1), khớp tỉ lệ dán thật ở scene.js
    sticker.style.width = SK_W + 'px';
    sticker.style.height = Math.round(SK_W * skRatio) + 'px';
    // ── Vùng bảo vệ mặt hộp (yêu cầu 2) ──────────────────────────────────────
    // getDrugFace3D render nền TRONG SUỐT (alpha) → dùng alpha khoanh ĐÚNG khung
    // hộp trong ảnh, rồi coi ~48% TRÊN của hộp (tên thuốc + hoạt chất + logo/Rx +
    // số ĐK) là "vùng thông tin" KHÔNG được che. Nhãn HDSD chỉ hợp lệ khi mép trên
    // nằm DƯỚI vạch bảo vệ và không tràn khỏi đáy hộp. (Nhãn HDSD tự IN LẠI tên +
    // hàm lượng nên dán đè phần dưới bao bì là đúng thực tế nhà thuốc.)
    const bounds = boxBoundsFromAlpha(cv);      // {x0,y0,x1,y1} theo tỉ lệ 0..1 của ảnh
    const PROT = 0.48;                          // 48% trên của hộp = vùng bảo vệ
    const protBottom = bounds.y0 + PROT * (bounds.y1 - bounds.y0);
    const TOL = 0.02;
    const rectAt = (x, y, bw, bh, sw, sh) => [x / bw, y / bh, (x + sw) / bw, (y + sh) / bh];
    // Hợp lệ khi: nằm trong bề ngang hộp, MÉP TRÊN nhãn dưới vạch bảo vệ, đáy không tràn.
    const isValidRect = (fx0, fy0, fx1, fy1) =>
      fx0 >= bounds.x0 - TOL && fx1 <= bounds.x1 + TOL &&
      fy0 >= protBottom - TOL && fy1 <= bounds.y1 + TOL;

    let u = 0.5, v = 0.82;               // vị trí đầu: đáy hộp (chỗ hợp lệ)
    let lastValid = true;
    function markValidity(valid) {
      lastValid = valid;
      sticker.style.outlineColor = valid ? 'rgba(34,197,94,0.95)' : 'rgba(239,68,68,0.95)';
      sticker.classList.toggle('sp-sticker-bad', !valid);
      const apply = overlay.querySelector('.sp-apply');
      if (apply) { apply.disabled = !valid; apply.style.opacity = valid ? '' : '0.5'; apply.style.cursor = valid ? '' : 'not-allowed'; }
    }
    // Đặt nhãn tại (x,y) px trong khung, clamp, cập nhật u/v + validity.
    function setPos(x, y) {
      const bw = box.offsetWidth || FACE_W, bh = box.offsetHeight || FACE_H;
      const sw = sticker.offsetWidth, sh = sticker.offsetHeight;
      x = Math.max(0, Math.min(bw - sw, x));
      y = Math.max(0, Math.min(bh - sh, y));
      sticker.style.left = x + 'px'; sticker.style.top = y + 'px';
      u = (x + sw / 2) / bw; v = (y + sh / 2) / bh;
      markValidity(isValidRect(...rectAt(x, y, bw, bh, sw, sh)));
    }
    function place() {
      const bw = box.offsetWidth || FACE_W, bh = box.offsetHeight || FACE_H;
      const sw = sticker.offsetWidth, sh = sticker.offsetHeight;
      setPos(u * bw - sw / 2, v * bh - sh / 2);
      snapToValid(true);                 // hút vào dải dưới hợp lệ ngay từ đầu
    }
    // Căn nhãn vào vùng hợp lệ gần nhất (giữ x trong bề ngang hộp, kẹp y vào dải
    // dưới) → hiệu ứng "hút". Trả false nếu nhãn cao hơn dải trống (không đủ chỗ).
    function snapToValid(silent) {
      const bw = box.offsetWidth || FACE_W, bh = box.offsetHeight || FACE_H;
      const sw = sticker.offsetWidth, sh = sticker.offsetHeight;
      const curX = parseFloat(sticker.style.left) || 0;
      const curY = parseFloat(sticker.style.top) || 0;
      const tx = Math.max(bounds.x0 * bw, Math.min(bounds.x1 * bw - sw, curX));
      const yMin = protBottom * bh, yMax = bounds.y1 * bh - sh;
      let ty, ok;
      if (yMax >= yMin) { ty = Math.max(yMin, Math.min(yMax, curY)); ok = true; }
      else { ty = Math.max(0, yMax); ok = false; }
      animateTo(tx, ty);
      if (!ok && !silent) toastInvalid();
      return ok;
    }
    // Animate trượt nhãn tới (tx,ty) trong ~180ms rồi cập nhật validity.
    function animateTo(tx, ty) {
      const sx = parseFloat(sticker.style.left) || 0;
      const sy = parseFloat(sticker.style.top) || 0;
      const t0 = performance.now(), dur = 180;
      sticker.classList.add('sp-sticker-snap');
      const step = (now) => {
        const k = Math.min(1, (now - t0) / dur);
        const e = 1 - Math.pow(1 - k, 3);   // easeOutCubic (cảm giác hút)
        setPos(sx + (tx - sx) * e, sy + (ty - sy) * e);
        if (k < 1) requestAnimationFrame(step);
        else sticker.classList.remove('sp-sticker-snap');
      };
      requestAnimationFrame(step);
    }
    function toastInvalid() {
      sticker.classList.remove('sp-sticker-flash-ok');
      sticker.classList.add('sp-sticker-flash-bad');
      setTimeout(() => sticker.classList.remove('sp-sticker-flash-bad'), 600);
      showToast?.('Không thể dán nhãn tại vị trí này — nhãn phải nằm ở vùng trống, không che tên/hàm lượng/logo/số ĐK.');
    }
    function flashOk() {
      sticker.classList.add('sp-sticker-flash-ok');
      setTimeout(() => sticker.classList.remove('sp-sticker-flash-ok'), 520);
    }
    place();                       // đặt ngay (đọc offsetWidth ép reflow)
    setTimeout(place, 60);         // chạy lại sau layout cho chắc

    // Kéo-thả (pointer)
    let drag = false, offX = 0, offY = 0;
    sticker.addEventListener('pointerdown', (e) => {
      drag = true; sticker.setPointerCapture(e.pointerId);
      const sr = sticker.getBoundingClientRect();
      offX = e.clientX - sr.left; offY = e.clientY - sr.top;
    });
    sticker.addEventListener('pointermove', (e) => {
      if (!drag) return;
      const r = box.getBoundingClientRect();
      setPos(e.clientX - r.left - offX, e.clientY - r.top - offY);
    });
    sticker.addEventListener('pointerup', () => {
      if (!drag) return;
      drag = false;
      // Thả tay → hút vào vùng trống hợp lệ gần nhất; báo đỏ nếu không có chỗ.
      const ok = snapToValid(false);
      if (ok) flashOk();
    });
    const close = () => { document.removeEventListener('keydown', esc); overlay.remove(); };
    const esc = (e) => { if (e.key === 'Escape') close(); };
    document.addEventListener('keydown', esc);
    overlay.querySelector('.sp-close').addEventListener('click', close);
    overlay.querySelector('.sp-cancel').addEventListener('click', close);
    overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });
    overlay.querySelector('.sp-apply').addEventListener('click', () => {
      if (!lastValid) { toastInvalid(); return; }   // chặn dán vào vùng không hợp lệ
      // u,v đang theo TOÀN ẢNH (gồm lề trong suốt) → quy về toạ độ MẶT HỘP để
      // applyHdsdSticker (dùng hệ mặt hộp) dán đúng chỗ người dùng thả.
      const c01 = (t) => Math.max(0, Math.min(1, t));
      const ub = c01((u - bounds.x0) / Math.max(1e-3, bounds.x1 - bounds.x0));
      const vb = c01((v - bounds.y0) / Math.max(1e-3, bounds.y1 - bounds.y0));
      sim.applyHdsdSticker?.(drugId, label, { u: ub, v: vb });
      close();
    });
  }

  // Khoanh KHUNG hộp trong ảnh mặt hộp bằng ALPHA (nền render trong suốt):
  // trả về {x0,y0,x1,y1} theo tỉ lệ 0..1. Đọc pixel lỗi (taint) → khung mặc định.
  function boxBoundsFromAlpha(faceCanvas) {
    const w = faceCanvas.width, h = faceCanvas.height;
    let data;
    try { data = faceCanvas.getContext('2d').getImageData(0, 0, w, h).data; }
    catch { return { x0: 0.06, y0: 0.05, x1: 0.94, y1: 0.95 }; }
    let x0 = w, y0 = h, x1 = 0, y1 = 0, any = false;
    for (let y = 0; y < h; y += 2) {
      for (let x = 0; x < w; x += 2) {
        if (data[(y * w + x) * 4 + 3] > 128) {
          any = true;
          if (x < x0) x0 = x; if (x > x1) x1 = x;
          if (y < y0) y0 = y; if (y > y1) y1 = y;
        }
      }
    }
    if (!any) return { x0: 0.06, y0: 0.05, x1: 0.94, y1: 0.95 };
    return { x0: x0 / w, y0: y0 / h, x1: x1 / w, y1: y1 / h };
  }

  // Bao bì ra lẻ: chọn đơn vị từ GIỎ RA LẺ + dạng (vỉ/gói/viên/ống) → ghi nhãn phong bì.
  const UNIT_TO_FORM = { 'vỉ': 'vi', 'gói': 'goi', 'viên': 'vien', 'ống': 'ong' };
  const RETAIL_FORM_VN = { vi: 'Vỉ', goi: 'Gói', vien: 'Viên', ong: 'Ống', lo: 'Lọ' };
  function openPackageFlow(packageType) {
    if (document.querySelector('.pkgflow-overlay')) return;
    const pkg = PACKAGE_TYPES[packageType] || PACKAGE_TYPES.white;
    // Nguồn: các ĐƠN VỊ RỜI (vỉ/gói/ống/lọ/viên) đang nằm TRONG KHAY BÁN HÀNG —
    // đóng gói ĐÚNG số lượng đã lấy vào bao bì ra lẻ (yêu cầu CBS 12/07 #2).
    const units = sim.getRetailUnitsInTray?.() || [];
    // [{ value=drugId, drug, unit=unitKind, qty, label }]
    const choices = units.map(u => ({
      value: u.drugId, drug: u.drug, unit: u.unitKind, qty: u.count,
      label: `${u.drug.brand || u.drug.name}${u.drug.strength ? ' · ' + u.drug.strength : ''} (${u.count} ${RETAIL_FORM_VN[u.unitKind] || u.unitKind})`
    }));
    const overlay = document.createElement('div');
    overlay.className = 'pkgflow-overlay';
    overlay.innerHTML = `
      <div class="pkgflow-modal">
        <div class="sp-head">
          <span>✉️ Đóng gói ra lẻ — <b>${pkg.label}</b></span>
          <button class="pkgflow-close" type="button" aria-label="Đóng">✕</button>
        </div>
        <div class="sp-hint">${choices.length
          ? (pkg.airtight
              ? 'Túi zip kín khí — chọn đơn vị rời trong khay để đựng (không in nhãn).'
              : 'Chọn đơn vị rời <b>trong khay bán hàng</b> để đóng vào bao bì. Số lượng đóng đúng bằng số đã lấy; đơn vị rời sẽ được thay bằng bao bì.')
          : 'Chưa có đơn vị rời trong khay. Hãy mở 1 hộp → <b>“Cho … vào khay”</b> để tách vỉ/gói/ống trước.'}</div>
        <label class="le2-field">
          <span class="le2-lbl">Đơn vị rời trong khay bán hàng</span>
          <select class="pkgflow-drug">
            ${choices.length ? choices.map(c => `<option value="${c.value}">${c.label}</option>`).join('')
                             : '<option value="">— Khay chưa có đơn vị rời —</option>'}
          </select>
        </label>
        <div class="sp-foot">
          <button class="pkgflow-cancel" type="button">Huỷ</button>
          <button class="pkgflow-next" type="button" ${choices.length ? '' : 'disabled'}>${pkg.airtight ? '📦 Cho vào túi zip' : '➡️ Ghi nhãn & đóng gói'}</button>
        </div>
      </div>`;
    document.body.appendChild(overlay);
    const sel = overlay.querySelector('.pkgflow-drug');
    const close = () => { document.removeEventListener('keydown', esc); overlay.remove(); };
    const esc = (e) => { if (e.key === 'Escape') close(); };
    document.addEventListener('keydown', esc);
    overlay.querySelector('.pkgflow-close').addEventListener('click', close);
    overlay.querySelector('.pkgflow-cancel').addEventListener('click', close);
    overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });
    overlay.querySelector('.pkgflow-next').addEventListener('click', () => {
      const chosen = choices.find(c => c.value === sel.value);
      if (!chosen) { alert('Khay chưa có đơn vị rời. Mở 1 hộp → “Cho vỉ/gói/ống… vào khay” trước.'); return; }
      const drug = chosen.drug;
      const formType = chosen.unit;
      const qty = chosen.qty;
      const formVN = RETAIL_FORM_VN[formType] || formType;
      postAction('pack_retail', { drugId: drug.id, packageType, formType, qty });
      close();
      if (pkg.airtight) {
        // Túi zip cũng là bao bì ra lẻ → thay đơn vị rời bằng phong bì trong khay.
        const n = sim.packRetailUnitsInTray?.({ drugId: drug.id, packageType, formType, label: { packageType, drugText: `${drug?.brand || drug?.name || ''}${drug?.strength ? ' ' + drug.strength : ''}` } }) || 0;
        alert(`Đã đóng ${n} ${formVN} "${drug?.brand || ''}" vào túi zip kín khí.\n→ Bao bì đã vào KHAY BÁN HÀNG, mở POS để tính tiền.`);
        return;
      }
      openPackageEditor({
        drug, formType, packageType,
        onCreate: (lbl) => {
          postAction('pack_label', { ...lbl, qty });
          // Đóng gói xong → thay N đơn vị rời trong khay bằng 1 BAO BÌ RA LẺ có nhãn
          // (đúng số lượng); đơn vị rời biến mất — yêu cầu CBS 12/07 #2.
          const n = sim.packRetailUnitsInTray?.({ drugId: drug.id, packageType, formType, label: lbl }) || 0;
          showToast?.(`Đã đóng gói ${n} ${formVN} "${drug.brand || ''}" vào ${pkg.label} → bao bì đã vào KHAY BÁN HÀNG.`);
        }
      });
    });
  }

  // Notepad modal — bấm vào tờ giấy/bút trên bàn tư vấn để mở sổ ghi chép.
  // Nội dung lưu localStorage per-session để giữ giữa các phiên.
  function openNotepad() {
    if (document.querySelector('.notepad-overlay')) return;
    const KEY = 'tizia:pharm:notes';
    const overlay = document.createElement('div');
    overlay.className = 'notepad-overlay';
    overlay.innerHTML = `
      <div class="notepad-modal">
        <div class="notepad-head">
          <span>📝 Sổ ghi chép tư vấn</span>
          <button class="notepad-close" type="button" aria-label="Đóng">✕</button>
        </div>
        <textarea class="notepad-area" placeholder="Ghi chép triệu chứng, dị ứng, thuốc đang dùng, lời khuyên..."></textarea>
        <div class="notepad-foot">
          <span class="notepad-saved">Tự lưu khi gõ</span>
          <button class="notepad-clear" type="button">🗑 Xoá hết</button>
          <button class="notepad-done" type="button">✅ Xong</button>
        </div>
      </div>`;
    document.body.appendChild(overlay);
    const ta = overlay.querySelector('.notepad-area');
    const saved = overlay.querySelector('.notepad-saved');
    ta.value = localStorage.getItem(KEY) || '';
    ta.focus();
    const save = () => { localStorage.setItem(KEY, ta.value); saved.textContent = '✓ Đã lưu'; };
    ta.addEventListener('input', save);
    const close = () => { overlay.remove(); document.removeEventListener('keydown', esc); };
    const esc = (e) => { if (e.key === 'Escape') close(); };
    overlay.querySelector('.notepad-close').addEventListener('click', close);
    overlay.querySelector('.notepad-done').addEventListener('click', close);
    overlay.querySelector('.notepad-clear').addEventListener('click', () => { ta.value = ''; save(); });
    overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });
    document.addEventListener('keydown', esc);
  }

  // Sales tray modal — bấm vào khay bán hàng để xem danh sách hộp thuốc đã
  // chuẩn bị (= picked drugs hiện tại). Hiện snapshot, không thay đổi pick.
  function openSalesTray() {
    if (document.querySelector('.salestray-overlay')) return;
    const picked = sim.getPickedIds();
    const catMap = {};
    (sim.getCatalog?.() || []).forEach(it => { catMap[it.drug.id] = it; });
    const overlay = document.createElement('div');
    overlay.className = 'salestray-overlay';
    overlay.innerHTML = `
      <div class="salestray-modal">
        <div class="salestray-head">
          <span>🛒 Khay bán hàng — đã chuẩn bị (${picked.length})</span>
          <button class="salestray-close" type="button" aria-label="Đóng">✕</button>
        </div>
        <div class="salestray-body">
          ${picked.length === 0
            ? '<div class="salestray-empty">Chưa có thuốc nào trong khay.<br>Click vào hộp thuốc trên kệ để đưa vào khay.</div>'
            : '<ul class="salestray-list">' + picked.map(id => {
                const it = catMap[id];
                const name = it ? (it.drug.brand || it.drug.name || id) : id;
                return `<li><button class="salestray-item" type="button" data-id="${id}">💊 ${name} <span class="sti-go">› xem chi tiết</span></button></li>`;
              }).join('') + '</ul>'}
        </div>
        <div class="salestray-foot">
          <button class="salestray-done" type="button">Đóng</button>
        </div>
      </div>`;
    document.body.appendChild(overlay);
    const close = () => { overlay.remove(); document.removeEventListener('keydown', esc); };
    const esc = (e) => { if (e.key === 'Escape') close(); };
    overlay.querySelector('.salestray-close').addEventListener('click', close);
    overlay.querySelector('.salestray-done').addEventListener('click', close);
    overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });
    // Bấm 1 thuốc trong khay → mở cửa sổ chi tiết (ẩn nút "Đưa vào khay" vì đã ở khay).
    overlay.querySelectorAll('.salestray-item').forEach(btn => {
      btn.addEventListener('click', () => {
        const it = catMap[btn.dataset.id];
        if (!it) return;
        close();
        openInspector({ drug: it.drug, meta: it.meta, fromTray: true, returnToShelf: () => {}, confirmToTray: () => {} });
      });
    });
    document.addEventListener('keydown', esc);
  }

  // 6. Camera preset buttons
  // Góc nhìn — gom các preset vào 1 dropdown gọn (thay vì dải nút wrap 2 hàng che ngăn tủ).
  const camSelect = $('cam-select');
  const presetKeys = Object.keys(sim.cameraPresets);
  // Phím tắt cho preset thứ 11 trở đi (sau 1–9 + 0): q w e r t y u… để MỌI góc nhìn
  // đều có phím tắt. Không xung WASD vì hotkey góc nhìn bị chặn khi đang đi dạo.
  const EXTRA_KEYS = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i'];
  const hotFor = (i) => i < 9 ? `${i + 1}` : i === 9 ? '0' : (EXTRA_KEYS[i - 10] || '');
  function applyPreset(key) {
    if (!sim.cameraPresets[key]) return;
    sim.setCameraPreset(key);
    if (camSelect) camSelect.value = key;
  }
  if (camSelect) {
    camSelect.innerHTML = Object.entries(sim.cameraPresets).map(([k, p], i) => {
      const h = hotFor(i);
      const hot = h ? ` [${h.toUpperCase()}]` : '';
      return `<option value="${k}" ${k === 'default' ? 'selected' : ''}>${p.label}${hot}</option>`;
    }).join('');
    camSelect.addEventListener('change', () => applyPreset(camSelect.value));
  }
  // 6a1. HOTKEY góc nhìn: 1–9 + 0 cho 10 góc đầu, q w e… cho các góc còn lại (mọi
  // góc đều có phím). [ ] lùi/tiến tuần tự. Bỏ qua khi gõ ô nhập / có modal / đi dạo.
  document.addEventListener('keydown', (e) => {
    const a = document.activeElement;
    if (a && (a.tagName === 'INPUT' || a.tagName === 'TEXTAREA' || a.isContentEditable)) return;
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    if (sim.isWalkMode && sim.isWalkMode()) return;   // đi dạo: WASD để di chuyển, không bắt hotkey góc nhìn
    if (document.querySelector('.inspector-overlay, .pos-overlay, .label-overlay-v2, .pkg-overlay, .pkgflow-overlay, .salestray-overlay, .sticker-place-overlay, .notepad-overlay, .rpm-overlay')) return;
    let idx = -1;
    if (/^[1-9]$/.test(e.key)) idx = +e.key - 1;
    else if (e.key === '0') idx = 9;
    else if (EXTRA_KEYS.includes(e.key.toLowerCase())) idx = 10 + EXTRA_KEYS.indexOf(e.key.toLowerCase());
    else if (e.key === '[' || e.key === ']') {
      const cur = camSelect ? presetKeys.indexOf(camSelect.value) : 0;
      idx = (cur + (e.key === ']' ? 1 : -1) + presetKeys.length) % presetKeys.length;
    }
    if (idx >= 0 && idx < presetKeys.length) { applyPreset(presetKeys[idx]); e.preventDefault(); }
  });
  // 6a-cancel. Huỷ nhãn HDSD đang chờ dán (con trỏ đang "mang" nhãn).
  const pendingCancel = $('pending-label-cancel');
  if (pendingCancel) {
    pendingCancel.addEventListener('click', () => {
      sim.setPendingLabel(null);
      $('pending-label').hidden = true;
      showToast('Đã huỷ nhãn đang chờ dán.');
    });
  }

  // 6a2. Nút bật/tắt chế độ đi dạo (nhập vai nhân vật người thật).
  const walkBtn = $('walk-toggle');
  if (walkBtn && sim.setWalkMode) {
    walkBtn.addEventListener('click', () => {
      const on = !sim.isWalkMode();
      sim.setWalkMode(on);
      walkBtn.classList.toggle('active', on);
      walkBtn.textContent = on ? '🚶 Thoát đi dạo' : '🚶 Đi dạo (nhập vai)';
      const hint = $('walk-hint');
      if (hint) hint.hidden = !on;
      if (!on) { const p = $('walk-prompt'); if (p) p.hidden = true; }
    });
  }

  // 6a3. Chọn nhân vật (bệnh nhân) — SELF-HOST, không phụ thuộc Ready Player Me
  // (RPM bị chặn ở mạng VN). Chỉ chọn Nam/Nữ + chỉnh chiều cao/vóc dáng; nhớ qua
  // localStorage. Avatar nạp từ ./models/pharmacy/avatar/ trên chính tizia.vn.
  const avatarBtn = $('avatar-create');
  if (avatarBtn && sim.reloadAvatar) {
    const PRESETS = {
      nam: './models/pharmacy/avatar/Masculine_TPose.glb',
      nu: './models/pharmacy/avatar/Feminine_TPose.glb'
    };
    let overlay = null;
    const closeAvatarModal = () => { if (overlay) { overlay.remove(); overlay = null; } };
    function applyAvatar(url) {
      if (!url) return;
      try { localStorage.setItem(AVATAR_KEY, url); } catch {}
      sim.reloadAvatar(url);
      // reloadAvatar tạo lại nhân vật → áp lại chiều cao đang chọn
      const h = sim.getAvatarHeight ? sim.getAvatarHeight() : 1;
      setTimeout(() => sim.setAvatarHeight && sim.setAvatarHeight(h), 80);
    }
    avatarBtn.addEventListener('click', () => {
      if (overlay) return;
      const curH = sim.getAvatarHeight ? sim.getAvatarHeight() : 1;
      const curSkin = sim.getAvatarSkin ? sim.getAvatarSkin() : 0;
      const curShirt = sim.getAvatarShirt ? sim.getAvatarShirt() : null;
      const curCond = sim.getAvatarCondition ? sim.getAvatarCondition() : 'none';
      const curExpr = sim.getAvatarExpression ? sim.getAvatarExpression() : 'none';
      const curHair = sim.getAvatarHair ? (sim.getAvatarHair() || 'none') : 'none';
      // {i: index thật trong SKIN_TONES, c: màu xem trước} — xếp sáng → đậm.
      const SKIN_SW = [
        { i: 2, c: '#fadcc8' }, // rất sáng
        { i: 1, c: '#f0c7a8' }, // sáng
        { i: 0, c: '#e3b491' }, // mặc định
        { i: 3, c: '#bd8b62' }, // ngăm
        { i: 4, c: '#9a6a45' }, // nâu
        { i: 5, c: '#6e4a34' }  // đậm
      ];
      const isNu = (() => { try { return (localStorage.getItem(AVATAR_KEY) || '').includes('Feminine'); } catch { return false; } })();
      overlay = document.createElement('div');
      overlay.className = 'rpm-overlay';
      overlay.innerHTML = `
        <div class="rpm-modal rpm-modal-sm">
          <div class="rpm-head"><b>👤 Khách hàng</b>
            <button class="rpm-close" type="button" aria-label="Đóng">✕</button></div>
          <div class="rpm-body">
            <div class="rpm-section">Giới tính</div>
            <div class="rpm-presets">
              <button class="rpm-preset ${isNu ? '' : 'on'}" data-k="nam" type="button">🧑 Nam</button>
              <button class="rpm-preset ${isNu ? 'on' : ''}" data-k="nu" type="button">👩 Nữ</button>
            </div>
            <div class="rpm-section">Chiều cao / vóc dáng</div>
            <div class="rpm-slider">
              <span>Thấp</span>
              <input id="rpm-height" type="range" min="0.9" max="1.12" step="0.01" value="${curH}" />
              <span>Cao</span>
            </div>
            <div id="rpm-hval" class="rpm-msg"></div>
            <div class="rpm-section">Tông da</div>
            <div class="rpm-swatches" id="rpm-skins">
              ${SKIN_SW.map(o => `<button class="rpm-sw ${o.i === curSkin ? 'on' : ''}" data-skin="${o.i}" style="background:${o.c}"></button>`).join('')}
            </div>
            <div class="rpm-section">Màu tóc</div>
            <div class="rpm-swatches" id="rpm-hairs">
              ${HAIR_SW.map(([v, c]) => `<button class="rpm-sw ${v === curHair ? 'on' : ''}" data-hair="${v}" style="background:${c}" title="${v}"></button>`).join('')}
            </div>
            <div class="rpm-section">Màu áo</div>
            <div class="rpm-swatches" id="rpm-shirts">
              ${SHIRT_COLORS.map(c => `<button class="rpm-sw ${c === curShirt ? 'on' : ''}" data-shirt="${c}" style="background:${c}"></button>`).join('')}
            </div>
            <div class="rpm-section">Tình trạng da (bệnh lý)</div>
            <div class="rpm-presets rpm-wrap" id="rpm-conds">
              ${CONDITIONS.map(([v, t]) => `<button class="rpm-chip ${v === curCond ? 'on' : ''}" data-cond="${v}" type="button">${t}</button>`).join('')}
            </div>
            <div class="rpm-section">Biểu cảm / tư thế</div>
            <div class="rpm-presets rpm-wrap" id="rpm-exprs">
              ${EXPRESSIONS.map(([v, t]) => `<button class="rpm-chip ${v === curExpr ? 'on' : ''}" data-expr="${v}" type="button">${t}</button>`).join('')}
            </div>
          </div>
        </div>`;
      document.body.appendChild(overlay);
      const presets = overlay.querySelectorAll('.rpm-preset');
      presets.forEach(b => b.addEventListener('click', () => {
        presets.forEach(x => x.classList.toggle('on', x === b));
        applyAvatar(PRESETS[b.dataset.k]);
      }));
      const slider = overlay.querySelector('#rpm-height');
      const hval = overlay.querySelector('#rpm-hval');
      const showH = (v) => { hval.textContent = 'Khoảng ' + Math.round(170 * v) + ' cm'; };
      showH(+slider.value);
      slider.addEventListener('input', () => {
        const v = +slider.value;
        sim.setAvatarHeight && sim.setAvatarHeight(v);
        try { localStorage.setItem(AVATAR_HEIGHT_KEY, String(v)); } catch {}
        showH(v);
      });
      overlay.querySelectorAll('#rpm-skins .rpm-sw').forEach(b => b.addEventListener('click', () => {
        overlay.querySelectorAll('#rpm-skins .rpm-sw').forEach(x => x.classList.toggle('on', x === b));
        const t = +b.dataset.skin; sim.setAvatarSkin && sim.setAvatarSkin(t);
        try { localStorage.setItem(AVATAR_SKIN_KEY, String(t)); } catch {}
      }));
      overlay.querySelectorAll('#rpm-hairs .rpm-sw').forEach(b => b.addEventListener('click', () => {
        overlay.querySelectorAll('#rpm-hairs .rpm-sw').forEach(x => x.classList.toggle('on', x === b));
        const h = b.dataset.hair; sim.setAvatarHair && sim.setAvatarHair(h === 'none' ? null : h);
        try { localStorage.setItem(AVATAR_HAIR_KEY, h); } catch {}
      }));
      overlay.querySelectorAll('#rpm-shirts .rpm-sw').forEach(b => b.addEventListener('click', () => {
        overlay.querySelectorAll('#rpm-shirts .rpm-sw').forEach(x => x.classList.toggle('on', x === b));
        const hex = b.dataset.shirt; sim.setAvatarShirt && sim.setAvatarShirt(hex);
        try { localStorage.setItem(AVATAR_SHIRT_KEY, hex); } catch {}
      }));
      overlay.querySelectorAll('#rpm-conds .rpm-chip').forEach(b => b.addEventListener('click', () => {
        overlay.querySelectorAll('#rpm-conds .rpm-chip').forEach(x => x.classList.toggle('on', x === b));
        const c = b.dataset.cond; sim.setAvatarCondition && sim.setAvatarCondition(c);
        try { localStorage.setItem(AVATAR_COND_KEY, c); } catch {}
      }));
      overlay.querySelectorAll('#rpm-exprs .rpm-chip').forEach(b => b.addEventListener('click', () => {
        overlay.querySelectorAll('#rpm-exprs .rpm-chip').forEach(x => x.classList.toggle('on', x === b));
        const e = b.dataset.expr; sim.setAvatarExpression && sim.setAvatarExpression(e);
        try { localStorage.setItem(AVATAR_EXPR_KEY, e); } catch {}
      }));
      overlay.querySelector('.rpm-close').addEventListener('click', closeAvatarModal);
      overlay.addEventListener('click', (e) => { if (e.target === overlay) closeAvatarModal(); });
    });
  }

  // (Đã bỏ nút ▲▼ NGĂN — dùng kéo pan / hotkey góc nhìn thay thế.)

  // Nhãn TIẾP XÚC TRỰC TIẾP (TT 3.2) IN THẲNG lên vỉ/lọ/ống — canvas để dán lên
  // mô hình 3D đơn vị ra lẻ (thay vì chỉ hiện card HTML). Trắng, viền nhóm, Rx +
  // tên + thành phần (≤3 hoạt chất) + Lô/HSD + nhà SX.
  function makeContactLabelTex(drug, meta) {
    const W = 360, H = 200, SS = 3;
    const c = document.createElement('canvas'); c.width = W * SS; c.height = H * SS;
    const ctx = c.getContext('2d'); ctx.scale(SS, SS);
    const rr = (x, y, w, h, r) => { ctx.beginPath(); ctx.roundRect(x, y, w, h, r); };
    ctx.fillStyle = '#ffffff'; rr(3, 3, W - 6, H - 6, 12); ctx.fill();
    ctx.strokeStyle = drug.groupAccent || '#0d9488'; ctx.lineWidth = 3; ctx.stroke();
    ctx.textBaseline = 'middle'; ctx.textAlign = 'left';
    let x = 18, y = 30;
    if (drug.isRx) {
      ctx.fillStyle = '#b91c1c'; rr(x, y - 13, 36, 26, 7); ctx.fill();
      ctx.fillStyle = '#fff'; ctx.font = 'bold 15px Inter, sans-serif'; ctx.textAlign = 'center';
      ctx.fillText('Rx', x + 18, y); ctx.textAlign = 'left'; x += 46;
    }
    ctx.fillStyle = '#0f172a'; ctx.font = 'bold 21px Inter, sans-serif';
    ctx.fillText((drug.brand || drug.name || '').slice(0, 22), x, y);
    y += 30;
    const comp = String(drug.activeIngredient || drug.generic || '');
    const nAct = comp.split(/;|\s\+\s/).map(s => s.trim()).filter(Boolean).length;
    if (comp && nAct <= 3) {
      ctx.fillStyle = '#334155'; ctx.font = '13px Inter, sans-serif';
      const words = comp.split(' '); let line = '';
      for (const w of words) {
        const t = line ? line + ' ' + w : w;
        if (ctx.measureText(t).width > W - 36 && line) { ctx.fillText(line, 18, y); y += 18; line = w; }
        else line = t;
      }
      if (line) { ctx.fillText(line, 18, y); y += 18; }
    }
    // Dạng bào chế + số ĐK lưu hành (TT 01/VBHN-BYT, nhãn tiếp xúc trực tiếp).
    y = Math.max(y, 104);
    ctx.fillStyle = '#475569'; ctx.font = '12px Inter, sans-serif';
    if (drug.form) { ctx.fillText(`Dạng: ${String(drug.form).slice(0, 40)}`, 18, y); y += 17; }
    const reg = drug.regNo || drug.sdk;
    if (reg) { ctx.fillText(`SĐK: ${reg}`, 18, y); y += 17; }
    y = Math.max(y, 150);
    const lot = drug.lot || meta?.lot || '—', exp = drug.expDate || meta?.expiry || '—';
    ctx.fillStyle = '#0f172a'; ctx.font = 'bold 14px Inter, sans-serif';
    ctx.fillText(`Lô: ${lot}`, 18, y); ctx.fillText(`HSD: ${exp}`, 180, y);
    ctx.fillStyle = '#64748b'; ctx.font = '12px Inter, sans-serif';
    ctx.fillText((drug.manufacturer || '—').slice(0, 44), 18, 184);
    const tex = new THREE.CanvasTexture(c); tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }

  // P3: Inspector modal — hộp thuốc zoom giữa màn hình, tự xoay, drag xoay,
  // info panel + 2 nút (Đưa vào khay / Trả về kệ). Dùng mini-scene Three.js riêng.
  function openInspector({ drug, meta, confirmToTray, returnToShelf, fromTray = false }) {
    // Khi mở từ khay bán hàng (hoặc thuốc đã nằm trong khay) → ẩn nút "Đưa vào
    // khay" vì đã ở trên khay rồi.
    const alreadyInTray = fromTray || (sim.getPickedIds?.() || []).includes(drug.id);
    // Quy cách bao bì ngoài: carton (hộp) vs bottle/infusion (chai). Chai bán
    // NGUYÊN CHAI (không tách lẻ) → ẩn nút "Tách lẻ", chỉ "Đưa vào khay".
    const pkgKind = (() => {
      const f = (drug.form || '').toLowerCase();
      const p = (drug.pack || drug.packaging || '').trim().toLowerCase();
      if (/truyền/.test(f)) return 'infusion';
      if (/^chai/.test(p) && !/hộp/.test(p)) return 'bottle';
      return 'carton';
    })();
    const overlay = document.createElement('div');
    overlay.className = 'inspector-overlay';
    overlay.innerHTML = `
      <div class="inspector-modal">
        <button class="ins-close" type="button" aria-label="Đóng">✕</button>
        <div class="inspector-3d"></div>
        <div class="inspector-info">
          <!-- Phần cuộn (thông tin + nhãn). 3 nút nằm NGOÀI vùng cuộn → ghim sát
               đáy dialog, không bị nội dung che/đẩy (thầy yêu cầu sát đáy). -->
          <div class="ins-scroll">
            <div class="ins-head">
              <div class="ins-brand">${drug.brand || drug.name}</div>
              <div class="ins-generic">${drug.generic || ''} · ${drug.strength || ''}</div>
              ${drug.isRx ? '<span class="ins-tag ins-rx">Rx · Kê đơn</span>' : '<span class="ins-tag ins-otc">OTC</span>'}
              ${drug.isAntibiotic ? '<span class="ins-tag ins-abx">Kháng sinh</span>' : ''}
              ${drug.isHazardPregnancy ? '<span class="ins-tag ins-warn">⚠️ Thai kỳ</span>' : ''}
            </div>
            <!-- Bỏ bảng thông tin trùng với nhãn — chỉ giữ thông tin VẬN HÀNH
                 không có trên nhãn: tồn kho, đơn giá, mã vạch. -->
            <div class="ins-meta">
              <span>📦 Tồn kho: <b>${meta.stock} hộp</b></span>
              <span>💵 Đơn giá: <b>${(drug.unitPrice || 0).toLocaleString('vi')} đ</b></span>
              <span>🏷️ <code>${drug.barcode || drug.sku || '—'}</code></span>
            </div>
            <!-- Yêu cầu thầy #5: BỎ panel nhãn mô phỏng — mọi thông tin nhãn đã in
                 ĐẦY ĐỦ lên hộp + bao bì trực tiếp. (Bỏ luôn dòng hướng dẫn xoay hộp.) -->
          </div>
          <div class="ins-actions">
            <button class="ins-return" type="button">↩ Trả về kệ</button>
            ${pkgKind === 'carton' ? `<button class="ins-retail" type="button">🔓 Tách lẻ (${drug.unit || 'đơn vị'})</button>` : ''}
            ${alreadyInTray ? '' : '<button class="ins-confirm" type="button">📥 Đưa vào khay (Quét barcode)</button>'}
          </div>
        </div>
      </div>`;
    document.body.appendChild(overlay);

    // Canvas + WebGL context DÙNG CHUNG (acquireInspectorRenderer) — không tạo
    // context mới mỗi lần mở (nguyên nhân "bấm thuốc load mãi" trên máy yếu).
    const { canvas, renderer } = acquireInspectorRenderer();
    overlay.querySelector('.inspector-3d').appendChild(canvas);
    const fit = () => {
      const w = canvas.clientWidth, h = canvas.clientHeight;
      renderer.setSize(w, h, false);
    };
    const scene2 = new THREE.Scene();
    scene2.background = new THREE.Color(0x0f172a);
    const camera2 = new THREE.PerspectiveCamera(35, 1, 0.01, 10);
    // Distance trước đây fixed 0.62m cho box 0.27m cao. Nay box đổi theo dạng,
    // distance tỷ lệ với chiều cao + chiều rộng để box luôn lọt khung.
    // Tính sau khi build box (xem dưới).
    camera2.position.set(0.0, 0.05, 0.62);
    // Lighting sáng hơn (ambient 0.9 + 2 dir 1.1 / 0.5) để màu accent đỏ/cam
    // trên nhãn hộp hiển thị đúng tông, không bị tối thành xám.
    const ambient = new THREE.AmbientLight(0xffffff, 0.9);
    scene2.add(ambient);
    const dir1 = new THREE.DirectionalLight(0xffffff, 1.1);
    dir1.position.set(0.3, 0.5, 0.4);
    scene2.add(dir1);
    const dir2 = new THREE.DirectionalLight(0xffffff, 0.5);
    dir2.position.set(-0.3, -0.2, -0.4);
    scene2.add(dir2);
    // OrbitControls cho drag xoay manual
    const ctrl = new OrbitControls(camera2, canvas);
    ctrl.enableDamping = true;
    ctrl.minDistance = 0.18; ctrl.maxDistance = 1.2;
    ctrl.enablePan = false;
    ctrl.autoRotate = true;
    ctrl.autoRotateSpeed = 1.5;
    // Khi user kéo → tắt auto-rotate
    ctrl.addEventListener('start', () => { ctrl.autoRotate = false; });

    // Build hộp thuốc 3D — DÙNG CHÍNH makeDrugLabelTex từ scene.js để
    // tem inspector KHỚP 100% với tem trên kệ (cùng variant + watermark +
    // badge theo hash SKU). Trước đây inspector vẽ riêng → 2 nơi khác nhau.
    const body = drug.bodyColor || '#f8fafc';
    // Lấy ĐÚNG dim hộp như trên kệ (theo dạng bào chế + scale per-SKU).
    // Nhân lên ~1.7x để hộp inspector to gấp ~2 so với shelf (xem cho rõ),
    // nhưng GIỮ TỶ LỆ → spray cao thì inspector cũng cao, tablet hộp ngắn thì
    // inspector ngắn — KHÔNG còn fix cứng 0.18×0.27.
    const style = getBoxStyle(drug);
    const SCALE = 1.7;
    const w = style.w * SCALE;
    const h = style.h * SCALE;
    const d = style.d * SCALE;
    // Camera lùi đủ xa: dist ≈ max(w,h) × 1.9 để hộp cao lẫn rộng đều lọt khung
    const camDist = Math.max(w, h) * 1.9;
    camera2.position.set(0, 0, camDist);
    ctrl.minDistance = camDist * 0.4;
    ctrl.maxDistance = camDist * 3;
    ctrl.update();
    const boxMat = new THREE.MeshStandardMaterial({ color: body, roughness: 0.75 });
    const accent = drug.groupAccent || '#0d9488';
    // NHÃN ÁP TRỰC TIẾP lên mặt hộp (multi-material) — KHÔNG còn plane nổi + dải
    // stripe 3D như trước → hết z-fighting, dải trang trí không đè chữ (chữ nằm
    // trong texture, luôn là lớp trên cùng của mặt hộp).
    const tex = makeDrugLabelTex(drug); tex.anisotropy = 4;
    const frontMat = new THREE.MeshStandardMaterial({ map: tex, roughness: 0.6 });
    // Mặt SAU: nhãn CHI TIẾT đủ trường TT 01/VBHN-BYT (yêu cầu #4) — xoay hộp để
    // đọc đủ Thành phần/Quy cách/SĐK/Lô/NSX-HSD/Bảo quản/Cơ sở SX/Xuất xứ.
    const tex2 = makeDrugBackLabelTex(drug); tex2.anisotropy = 4;
    const backMat = new THREE.MeshStandardMaterial({ map: tex2, roughness: 0.6 });
    // Bao bì NGOÀI phải đúng QUY CÁCH đóng gói: "Chai …ml"/dịch truyền → CHAI
    // thật (không có hộp giấy ngoài). Khớp packType()+buildBottlePackage() của
    // scene.js để inspector hiện đúng hình như trên kệ (user phản ánh: kệ là chai
    // nhưng bấm vào lại ra hộp).
    const sideTex = makeDrugSideLabelTex(drug);
    // pkgKind đã tính ở đầu openInspector (dùng chung cho nút + 3D).
    const devMain = deviceModelFor(drug);
    if (devMain) {
      // THIẾT BỊ có model .glb → hiển thị CHÍNH model đó (khớp 100% với trên kệ),
      // không dựng hộp giấy. Auto-rotate của OrbitControls xoay quanh gốc.
      const g = new THREE.Group();
      scene2.add(g);
      swapUnitToGlb(g, devMain.file, Math.max(w, h) * 1.05);
    } else if (pkgKind === 'carton') {
      // HỘP GIẤY: BoxGeometry material order +X,-X,+Y,-Y,+Z(trước),-Z(sau).
      const box = new THREE.Mesh(new THREE.BoxGeometry(w, h, d),
        [boxMat, boxMat, boxMat, boxMat, frontMat, backMat]);
      scene2.add(box);
      // Mặt ±X: side label (brand dọc) — plane lệch ra 4mm + polygonOffset tránh z-fight.
      const mkSideMat = () => new THREE.MeshStandardMaterial({
        map: sideTex, roughness: 0.7,
        polygonOffset: true, polygonOffsetFactor: -4, polygonOffsetUnits: -4
      });
      const sideR = new THREE.Mesh(new THREE.PlaneGeometry(d * 0.88, h * 0.94), mkSideMat());
      sideR.position.x = w / 2 + 0.004; sideR.rotation.y = Math.PI / 2; scene2.add(sideR);
      const sideL = new THREE.Mesh(new THREE.PlaneGeometry(d * 0.88, h * 0.94), mkSideMat());
      sideL.position.x = -w / 2 - 0.004; sideL.rotation.y = -Math.PI / 2; scene2.add(sideL);
    } else {
      // CHAI / DỊCH TRUYỀN: thân trụ + vai + cổ + nắp + nhãn IN TRỰC TIẾP cuốn
      // quanh ~120° mặt trước. Dịch truyền: thuỷ tinh trong mờ, nắp màu nhóm.
      const isInf = pkgKind === 'infusion';
      const r = Math.min(w, d) * 0.5;
      const bodyH = h * (isInf ? 0.76 : 0.70);
      const neckR = r * 0.40, neckH = h * 0.10, capH = h * 0.11, baseY = -h / 2;
      const glassMat = new THREE.MeshStandardMaterial({
        color: new THREE.Color(isInf ? '#dbeafe' : body),
        roughness: isInf ? 0.15 : 0.45, metalness: 0,
        transparent: isInf, opacity: isInf ? 0.5 : 1
      });
      const bodyMesh = new THREE.Mesh(new THREE.CylinderGeometry(r, r, bodyH, 28), glassMat);
      bodyMesh.position.y = baseY + bodyH / 2; scene2.add(bodyMesh);
      const shoulder = new THREE.Mesh(new THREE.CylinderGeometry(neckR, r, h * 0.10, 28), glassMat);
      shoulder.position.y = baseY + bodyH + h * 0.05; scene2.add(shoulder);
      const neck = new THREE.Mesh(new THREE.CylinderGeometry(neckR, neckR, neckH, 20), glassMat);
      neck.position.y = baseY + bodyH + h * 0.10 + neckH / 2; scene2.add(neck);
      const cap = new THREE.Mesh(new THREE.CylinderGeometry(neckR * 1.25, neckR * 1.25, capH, 20),
        new THREE.MeshStandardMaterial({ color: new THREE.Color(accent), roughness: 0.5 }));
      cap.position.y = h / 2 - capH / 2; scene2.add(cap);
      const label = new THREE.Mesh(
        new THREE.CylinderGeometry(r * 1.01, r * 1.01, bodyH * 0.82, 28, 1, true, -Math.PI * 0.34, Math.PI * 0.68),
        new THREE.MeshStandardMaterial({ map: tex, roughness: 0.7, side: THREE.DoubleSide,
          polygonOffset: true, polygonOffsetFactor: -6, polygonOffsetUnits: -6 })
      );
      label.position.y = baseY + bodyH * 0.46; scene2.add(label);
    }

    // Nếu hộp/chai này ĐÃ được dán nhãn HDSD (trong khay) → HIỆN sticker trên mô
    // hình 3D inspector tại đúng vị trí đã dán, dùng CHÍNH hàm vẽ nhãn lúc dán
    // (sim.makeHdsdStickerTex) để khớp 100%. Sửa lỗi: dán rồi xem 3D không thấy nhãn.
    const _applied = sim.getLabels?.()[drug.id];
    if (_applied && _applied.placement) {
      const uu = Math.max(0, Math.min(1, _applied.placement.u ?? 0.5));
      const vv = Math.max(0, Math.min(1, _applied.placement.v ?? 0.5));
      const skTex = sim.makeHdsdStickerTex?.(_applied);
      if (skTex) {
        skTex.anisotropy = 4;
        const skMat = new THREE.MeshStandardMaterial({ map: skTex, roughness: 0.6, side: THREE.DoubleSide,
          polygonOffset: true, polygonOffsetFactor: -8, polygonOffsetUnits: -8 });
        // Tỉ lệ nhãn PORTRAIT 360:480 (khớp bản soạn). Chai → UỐN TRÒN, hộp → phẳng.
        if (pkgKind === 'carton') {
          const faceW = w * 0.92, faceH = h * 0.88;
          const sw = Math.min(faceW * 0.42, faceH * 0.62 * (360 / 480));
          const sh = sw * (480 / 360);
          let scx = (uu - 0.5) * faceW, scy = (0.5 - vv) * faceH;
          scx = Math.max(-faceW / 2 + sw / 2, Math.min(faceW / 2 - sw / 2, scx));
          scy = Math.max(-faceH / 2 + sh / 2, Math.min(faceH / 2 - sh / 2, scy));
          const skMesh = new THREE.Mesh(new THREE.PlaneGeometry(sw, sh), skMat);
          skMesh.position.set(scx, scy, d / 2 + 0.0015); // SÁT mặt hộp (chạm)
          scene2.add(skMesh);
        } else {
          // Chai: cylinder segment ôm thân.
          const r = Math.min(w, d) * 0.5;
          const bodyH = h * 0.74, baseY = -h / 2;
          const sh = Math.min(bodyH * 0.6, r * 2.0 * (480 / 360));
          const sw = sh * (360 / 480);
          const arc = Math.min(Math.PI * 0.72, sw / r);
          const skMesh = new THREE.Mesh(
            new THREE.CylinderGeometry(r * 1.02, r * 1.02, sh, 28, 1, true, -arc / 2, arc), skMat);
          let scy = baseY + bodyH * (1 - vv);
          scy = Math.max(baseY + sh / 2, Math.min(baseY + bodyH - sh / 2, scy));
          skMesh.position.set(0, scy, 0);
          scene2.add(skMesh);
        }
      }
    }

    // Gom toàn bộ BAO BÌ (hộp/chai + nhãn) vào 1 group để THU NHỎ + lùi sang bên
    // khi mở lấy đơn vị, để focus vào vật vừa lấy ra. (Đèn giữ nguyên ở scene2.)
    const pkgGroup = new THREE.Group();
    [...scene2.children].filter(c => !c.isLight).forEach(c => pkgGroup.add(c));
    scene2.add(pkgGroup);

    // ── "Mở hộp lấy vỉ/gói/lọ/ống" — đơn vị nhỏ nhất bên trong hộp, trượt ra khi tách lẻ ──
    const formStr = (drug.form || '').toLowerCase();
    const catStr = (drug.category || '').toLowerCase();
    const nameStr = (drug.brand || drug.name || '').toLowerCase();
    const hay = formStr + ' ' + catStr + ' ' + nameStr;
    // Bao bì trực tiếp suy từ QUY CÁCH đóng gói (đúng dạng đóng gói thật).
    let unitKind = detectUnitKind(drug);
    // Thiết bị / dụng cụ y tế — KHÔNG phải vỉ thuốc; mở hộp ra phải là CHÍNH món đó.
    let deviceKind = null;
    if (/dụng cụ|thiết bị/.test(catStr)
        || /nhiệt kế|khẩu trang|bơm tiêm|kim tiêm|xy lanh|que thử|test nhanh|băng|gạc|bông y tế|găng|máy đo/.test(hay)) {
      unitKind = 'device';
      if (/nhiệt kế/.test(hay)) deviceKind = 'thermometer';
      else if (/khẩu trang/.test(hay)) deviceKind = 'mask';
      else if (/bơm tiêm|kim tiêm|xy lanh|syringe/.test(hay)) deviceKind = 'syringe';
      else if (/băng|gạc|bông|urgo/.test(hay)) deviceKind = 'gauze';
      else deviceKind = 'generic';
    }
    const unitWordVN = { vi: 'vỉ', goi: 'gói', lo: 'lọ', ong: 'ống', device: 'thiết bị' }[unitKind];
    // Dựng mesh 3D 1 ĐƠN VỊ ra lẻ (vỉ/gói/lọ/ống/thiết bị) theo dạng đóng gói thật.
    // Tách thành hàm (w,h,d) để DÙNG LẠI: vừa hiện trong inspector (dims scale),
    // vừa đưa vào KHAY BÁN HÀNG (dims thật của hộp) — yêu cầu 2 (khay đa dạng).
    function makeUnit(w, h, d) {
      const g = new THREE.Group();
      const foil = new THREE.MeshStandardMaterial({ color: 0xcbd5e1, metalness: 0.6, roughness: 0.35 });
      const acc = new THREE.MeshStandardMaterial({ color: accent, roughness: 0.5 });
      if (unitKind === 'vi') {
        // Vỉ ép: màng nhôm MỎNG + BO GÓC (như thật) + viên trong bầu nhựa trong.
        const per = pillsPerBlister(drug);
        const rows = per <= 7 ? 1 : per <= 14 ? 2 : per <= 21 ? 3 : Math.ceil(per / 8);
        const cols = Math.ceil(per / rows);
        const sheetW = w * Math.min(0.86, 0.40 + cols * 0.058), sheetD = d * 0.72; // nhỏ gọn hơn
        // Tấm nhôm BO GÓC: ExtrudeGeometry từ rounded-rect, RẤT MỎNG (0.0012), phẳng XZ.
        const FT = 0.0012, rc = Math.min(sheetW, sheetD) * 0.16;
        const rr = new THREE.Shape();
        { const x = -sheetW / 2, y = -sheetD / 2, w0 = sheetW, d0 = sheetD, r = rc;
          rr.moveTo(x + r, y);
          rr.lineTo(x + w0 - r, y); rr.quadraticCurveTo(x + w0, y, x + w0, y + r);
          rr.lineTo(x + w0, y + d0 - r); rr.quadraticCurveTo(x + w0, y + d0, x + w0 - r, y + d0);
          rr.lineTo(x + r, y + d0); rr.quadraticCurveTo(x, y + d0, x, y + d0 - r);
          rr.lineTo(x, y + r); rr.quadraticCurveTo(x, y, x + r, y); }
        const foilGeo = new THREE.ExtrudeGeometry(rr, { depth: FT, bevelEnabled: false, curveSegments: 6 });
        foilGeo.rotateX(-Math.PI / 2); foilGeo.translate(0, -FT / 2, 0); // mỏng quanh y=0, phẳng XZ
        const sheet = new THREE.Mesh(foilGeo,
          new THREE.MeshStandardMaterial({ color: 0xeef2f6, metalness: 0.5, roughness: 0.32, side: THREE.DoubleSide }));
        g.add(sheet);
        // Nhãn tiếp xúc IN nhỏ gọn lên màng nhôm mặt sau (child của tấm → dính chặt).
        {
          const cTex = makeContactLabelTex(drug, meta); cTex.anisotropy = 4;
          const lh = sheetD * 0.74, lw = Math.min(sheetW * 0.82, lh * (360 / 200));
          const lab = new THREE.Mesh(new THREE.PlaneGeometry(lw, lh),
            new THREE.MeshStandardMaterial({ map: cTex, roughness: 0.5, side: THREE.DoubleSide,
              polygonOffset: true, polygonOffsetFactor: -4, polygonOffsetUnits: -4 }));
          lab.rotation.x = Math.PI / 2; lab.position.set(0, -FT / 2 - 0.0002, 0); // flush mặt sau
          sheet.add(lab);
        }
        const clearMat = new THREE.MeshStandardMaterial({ color: 0xffffff, transparent: true, opacity: 0.20, roughness: 0.08, metalness: 0 });
        const px = sheetW / (cols + 0.4), pz = sheetD / (rows + 0.3);
        const rad = Math.min(px, pz) * 0.40;
        let placed = 0;
        for (let r = 0; r < rows && placed < per; r++) for (let c = 0; c < cols && placed < per; c++) {
          const cx = (c - (cols - 1) / 2) * px, cz = (r - (rows - 1) / 2) * pz;
          const pill = new THREE.Mesh(new THREE.SphereGeometry(rad, 14, 10), acc);
          pill.scale.set(1, 0.42, 1); pill.position.set(cx, FT / 2 + rad * 0.42, cz); g.add(pill); // SÁT mặt nhôm
          const dome = new THREE.Mesh(new THREE.SphereGeometry(rad * 1.14, 14, 8, 0, Math.PI * 2, 0, Math.PI / 2), clearMat);
          dome.position.set(cx, FT / 2, cz); g.add(dome); // bầu nhựa nằm TRÊN mặt nhôm
          placed++;
        }
      } else if (unitKind === 'device') {
        const metal = new THREE.MeshStandardMaterial({ color: 0xb8bcc4, metalness: 0.85, roughness: 0.25 });
        if (deviceKind === 'thermometer') {
          // Nhiệt kế điện tử: thân bo tròn trắng + đầu cảm biến kim loại + màn LCD.
          const white = new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.45 });
          const L = Math.max(h, w) * 0.95, rad = w * 0.05;
          const bodyc = new THREE.Mesh(new THREE.CapsuleGeometry(rad, L - rad * 2, 6, 16), white);
          bodyc.rotation.z = Math.PI / 2; g.add(bodyc);
          const tip = new THREE.Mesh(new THREE.SphereGeometry(rad * 1.15, 16, 12), metal);
          tip.position.x = -L / 2 + rad * 0.4; g.add(tip);
          const lcd = new THREE.Mesh(new THREE.BoxGeometry(rad * 2.6, rad * 1.8, rad * 0.5),
            new THREE.MeshStandardMaterial({ color: 0x0b1220, roughness: 0.4 }));
          lcd.position.set(L * 0.22, 0, rad * 0.9); g.add(lcd);
          const scr = new THREE.Mesh(new THREE.PlaneGeometry(rad * 2.0, rad * 1.2),
            new THREE.MeshStandardMaterial({ color: 0x9bf6c0, emissive: 0x14532d, emissiveIntensity: 0.6 }));
          scr.position.set(L * 0.22, 0, rad * 1.16); g.add(scr);
        } else if (deviceKind === 'mask') {
          // Khẩu trang y tế: tấm dẹt 3 nếp gấp + 2 dây đeo tai.
          const mw = Math.max(w, h) * 0.85, mh = mw * 0.6;
          const blue = new THREE.MeshStandardMaterial({ color: 0x7cc3e6, roughness: 0.75, side: THREE.DoubleSide });
          g.add(new THREE.Mesh(new THREE.BoxGeometry(mw, mh, 0.006), blue));
          for (let i = -1; i <= 1; i++) {
            const pl = new THREE.Mesh(new THREE.BoxGeometry(mw, mh * 0.08, 0.010),
              new THREE.MeshStandardMaterial({ color: 0x5fb0d6, roughness: 0.7 }));
            pl.position.set(0, i * mh * 0.24, 0.004); g.add(pl);
          }
          const loopMat = new THREE.MeshStandardMaterial({ color: 0xe2e8f0 });
          [-1, 1].forEach(s => {
            const lp = new THREE.Mesh(new THREE.TorusGeometry(mh * 0.34, mw * 0.012, 8, 20), loopMat);
            lp.position.set(s * mw * 0.5, 0, 0); lp.rotation.y = Math.PI / 2; g.add(lp);
          });
        } else if (deviceKind === 'syringe') {
          // Bơm tiêm: ống bơm trong + pít-tông + kim.
          const L = Math.max(h, w) * 0.85, r = w * 0.07;
          const clear = new THREE.MeshStandardMaterial({ color: 0xeaf2fb, transparent: true, opacity: 0.5, roughness: 0.2 });
          const wht = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.5 });
          const barrel = new THREE.Mesh(new THREE.CylinderGeometry(r, r, L * 0.55, 18), clear); barrel.rotation.z = Math.PI / 2; g.add(barrel);
          const plunger = new THREE.Mesh(new THREE.CylinderGeometry(r * 0.7, r * 0.7, L * 0.5, 16), wht); plunger.rotation.z = Math.PI / 2; plunger.position.x = L * 0.34; g.add(plunger);
          const thumb = new THREE.Mesh(new THREE.CylinderGeometry(r * 1.5, r * 1.5, r * 0.4, 16), wht); thumb.rotation.z = Math.PI / 2; thumb.position.x = L * 0.56; g.add(thumb);
          const needle = new THREE.Mesh(new THREE.CylinderGeometry(r * 0.12, r * 0.12, L * 0.35, 8), metal); needle.rotation.z = Math.PI / 2; needle.position.x = -L * 0.45; g.add(needle);
        } else if (deviceKind === 'gauze') {
          // Băng/gạc: miếng đệm trắng mềm + viền.
          const pw = Math.max(w, h) * 0.7;
          g.add(new THREE.Mesh(new THREE.BoxGeometry(pw * 1.04, pw * 0.74, pw * 0.10),
            new THREE.MeshStandardMaterial({ color: 0xe5e7eb, roughness: 0.9 })));
          g.add(new THREE.Mesh(new THREE.BoxGeometry(pw, pw * 0.68, pw * 0.16),
            new THREE.MeshStandardMaterial({ color: 0xfafafa, roughness: 0.95 })));
        } else {
          // Dụng cụ chung: khối bo nhẹ.
          g.add(new THREE.Mesh(new THREE.BoxGeometry(w * 0.5, h * 0.42, d * 0.5),
            new THREE.MeshStandardMaterial({ color: 0xe2e8f0, roughness: 0.6 })));
        }
      } else if (unitKind === 'goi') {
        // Gói bột/cốm: túi giấy-nhôm DẸT bo góc + mép răng cưa (crimp) 2 đầu +
        // dải accent đầu túi — giống mẫu gói Hapacol thầy gửi.
        const gw = w * 0.80, gd = d * 0.94, gt = 0.009, rc = Math.min(gw, gd) * 0.14;
        const foilMat = new THREE.MeshStandardMaterial({ color: 0xeef2f6, metalness: 0.4, roughness: 0.42, side: THREE.DoubleSide });
        const sh = new THREE.Shape();
        { const x = -gw / 2, y = -gd / 2, W0 = gw, D0 = gd, r = rc;
          sh.moveTo(x + r, y); sh.lineTo(x + W0 - r, y); sh.quadraticCurveTo(x + W0, y, x + W0, y + r);
          sh.lineTo(x + W0, y + D0 - r); sh.quadraticCurveTo(x + W0, y + D0, x + W0 - r, y + D0);
          sh.lineTo(x + r, y + D0); sh.quadraticCurveTo(x, y + D0, x, y + D0 - r);
          sh.lineTo(x, y + r); sh.quadraticCurveTo(x, y, x + r, y); }
        const geo = new THREE.ExtrudeGeometry(sh, { depth: gt, bevelEnabled: true, bevelThickness: 0.002, bevelSize: 0.002, bevelSegments: 2, curveSegments: 8 });
        geo.rotateX(-Math.PI / 2); geo.translate(0, -gt / 2, 0);
        g.add(new THREE.Mesh(geo, foilMat));
        // Mép răng cưa (gân nổi) ở 2 đầu sâu (±Z).
        const ribMat = new THREE.MeshStandardMaterial({ color: 0xc2cad4, metalness: 0.45, roughness: 0.55 });
        [-1, 1].forEach(s => {
          for (let i = 0; i < 9; i++) {
            const rib = new THREE.Mesh(new THREE.BoxGeometry(gw * 0.018, gt * 1.25, gd * 0.10), ribMat);
            rib.position.set(-gw / 2 + gw * (i + 0.5) / 9, 0, s * (gd / 2 - gd * 0.05));
            g.add(rib);
          }
        });
        // Dải accent đầu túi.
        const hdr = new THREE.Mesh(new THREE.BoxGeometry(gw, gt * 1.05, gd * 0.13), acc);
        hdr.position.set(0, 0, -gd * 0.36); g.add(hdr);
      } else if (unitKind === 'lo') {
        // Lọ/chai: thân thuỷ tinh có vai + cổ + nắp vặn màu nhóm — giống mẫu chai
        // siro HoAstex. Siro/hỗn dịch → thuỷ tinh nâu hổ phách; còn lại → trắng trong.
        const r = w * 0.22, bodyH = h * 0.46;
        const glassCol = /siro|sirô|hỗn dịch|huyền dịch|dung dịch|dầu/.test(formStr) ? '#7c3a12' : '#d9eef3';
        const glass = new THREE.MeshStandardMaterial({ color: new THREE.Color(glassCol), roughness: 0.22, metalness: 0, transparent: true, opacity: 0.9 });
        const body = new THREE.Mesh(new THREE.CylinderGeometry(r, r * 0.97, bodyH, 28), glass); body.position.y = bodyH / 2; g.add(body);
        const shoulder = new THREE.Mesh(new THREE.CylinderGeometry(r * 0.44, r, h * 0.07, 28), glass); shoulder.position.y = bodyH + h * 0.035; g.add(shoulder);
        const neck = new THREE.Mesh(new THREE.CylinderGeometry(r * 0.44, r * 0.44, h * 0.05, 20), glass); neck.position.y = bodyH + h * 0.07 + h * 0.025; g.add(neck);
        const cap = new THREE.Mesh(new THREE.CylinderGeometry(r * 0.52, r * 0.52, h * 0.10, 24), acc); cap.position.y = bodyH + h * 0.095 + h * 0.05; g.add(cap);
      } else {
        // Ống: TIÊM → thuỷ tinh trong, cổ thắt + chỏm nhọn + vạch bẻ màu.
        // UỐNG → ỐNG NHỰA TRONG (thành trắng trong mờ) có DUNG DỊCH màu bên trong,
        // nắp vặn trắng. KHÔNG còn đế/vỉ nhựa cam phía sau (yêu cầu CBS 12/07 #3).
        const isInject = /tiêm/.test(formStr);
        const r = isInject ? w * 0.10 : Math.max(w, d) * 0.16, bodyH = h * (isInject ? 0.50 : 0.52);
        if (isInject) {
          const mat = new THREE.MeshStandardMaterial({ color: new THREE.Color('#eaf2fb'), roughness: 0.15, metalness: 0, transparent: true, opacity: 0.55 });
          const body = new THREE.Mesh(new THREE.CylinderGeometry(r, r, bodyH, 22), mat); body.position.y = bodyH / 2; g.add(body);
          const neck = new THREE.Mesh(new THREE.CylinderGeometry(r * 0.45, r, h * 0.06, 16), mat); neck.position.y = bodyH + h * 0.03; g.add(neck);
          const tip = new THREE.Mesh(new THREE.ConeGeometry(r * 0.45, h * 0.10, 16), mat); tip.position.y = bodyH + h * 0.06 + h * 0.05; g.add(tip);
          const ring = new THREE.Mesh(new THREE.CylinderGeometry(r * 1.05, r * 1.05, h * 0.02, 16), acc); ring.position.y = bodyH * 0.66; g.add(ring);
        } else {
          // Nhựa trong: thành ống trắng mờ (opacity thấp) để thấy dung dịch bên trong.
          const wallMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.1, metalness: 0, transparent: true, opacity: 0.26 });
          // Dung dịch màu (nâu hổ phách nhạt) — trụ nhỏ hơn thành, chừa khoảng trống miệng ống.
          const liqMat = new THREE.MeshStandardMaterial({ color: new THREE.Color('#c07f28'), roughness: 0.25, metalness: 0, transparent: true, opacity: 0.9 });
          const fillH = bodyH * 0.8;
          const liq = new THREE.Mesh(new THREE.CylinderGeometry(r * 0.88, r * 0.88, fillH, 22), liqMat); liq.position.y = fillH / 2; g.add(liq);
          const body = new THREE.Mesh(new THREE.CylinderGeometry(r, r, bodyH, 22), wallMat); body.position.y = bodyH / 2; g.add(body);
          // Vai bo + nắp vặn TRẮNG (nhựa) thay cho nắp vàng kim cũ.
          const shoulder = new THREE.Mesh(new THREE.CylinderGeometry(r * 0.52, r, h * 0.05, 22), wallMat); shoulder.position.y = bodyH + h * 0.025; g.add(shoulder);
          const capMat = new THREE.MeshStandardMaterial({ color: 0xf1f5f9, roughness: 0.4, metalness: 0.05 });
          const cap = new THREE.Mesh(new THREE.CylinderGeometry(r * 0.56, r * 0.56, h * 0.10, 20), capMat); cap.position.y = bodyH + h * 0.05 + h * 0.05; g.add(cap);
        }
      }
      // IN nhãn tiếp xúc trực tiếp LÊN đơn vị ra lẻ. VỈ đã in thẳng lên màng nhôm
      // ở khối dựng vỉ phía trên (child của tấm nhôm) → ở đây chỉ xử lý gói/lọ/ống.
      if (unitKind === 'goi' || unitKind === 'lo' || unitKind === 'ong') {
        const cTex = makeContactLabelTex(drug, meta); cTex.anisotropy = 4;
        const cMat = new THREE.MeshStandardMaterial({ map: cTex, roughness: 0.55, side: THREE.DoubleSide,
          polygonOffset: true, polygonOffsetFactor: -6, polygonOffsetUnits: -6 });
        if (unitKind === 'goi') {
          // Gói (túi dẹt mỏng): nhãn in mặt TRÊN, ngay trên mặt túi.
          const pw = w * 0.66, ph = pw * (200 / 360);
          const lab = new THREE.Mesh(new THREE.PlaneGeometry(pw, ph), cMat);
          lab.rotation.x = -Math.PI / 2; lab.position.set(0, 0.0075, 0);
          g.add(lab);
        } else {
          // Lọ/ống đứng → nhãn UỐN quanh thân (khớp bán kính thân ở trên).
          const isInjectU = /tiêm/.test(formStr);
          const r = (unitKind === 'lo') ? w * 0.22 : (isInjectU ? w * 0.10 : Math.max(w, d) * 0.16);
          const cy = (unitKind === 'lo') ? h * 0.28 : h * 0.22;
          const ph = Math.min((unitKind === 'lo' ? h * 0.55 : h * 0.58) * 0.7, r * 2 * (200 / 360) * 1.6);
          const arc = Math.PI * 0.95;
          const lab = new THREE.Mesh(
            new THREE.CylinderGeometry(r * 1.03, r * 1.03, ph, 24, 1, true, -arc / 2, arc), cMat);
          lab.position.set(0, cy, 0); g.add(lab);
        }
      }
      g.traverse(o => { if (o.isMesh) o.castShadow = true; });
      // Căn giữa nội dung về gốc → khi trượt ra nằm NGANG TẦM hộp (không lệch cao/thấp).
      const bb = new THREE.Box3().setFromObject(g);
      const ctr = bb.getCenter(new THREE.Vector3());
      g.children.forEach(ch => ch.position.sub(ctr));
      // Ưu tiên MODEL .glb cho đơn vị có model thật (hạn chế vẽ tay). Vỉ/gói/ống
      // chưa có glb phù hợp → giữ procedural.
      const unitGlbFile =
        (unitKind === 'device' && deviceKind === 'thermometer') ? 'thermometer.glb' :
        (unitKind === 'device' && /bông/.test(hay)) ? 'cotton.glb' :
        (unitKind === 'device' && deviceKind === 'gauze') ? 'gauze.glb' :
        (unitKind === 'lo' && /kem|gel|mỡ|tuýp|tuyp|cao xoa|\bbôi\b/.test(formStr)) ? 'tube.glb' :
        // Chỉ lọ ĐỰNG VIÊN dùng model nhựa pillbottle; lọ DỊCH (siro/hỗn dịch/dung
        // dịch/nhỏ) giữ chai thuỷ tinh procedural (model pillbottle trông sai dạng).
        (unitKind === 'lo' && !/siro|sirô|hỗn dịch|huyền dịch|dung dịch|dầu|nhỏ|xịt|nước/.test(formStr)) ? 'pillbottle.glb' : null;
      if (unitGlbFile) swapUnitToGlb(g, unitGlbFile, Math.max(w, h) * 0.9);
      return g;
    }
    const unit = makeUnit(w, h, d);
    unit.visible = false;
    scene2.add(unit);
    // extractTarget: 0 = trong hộp, 1 = đã lấy ra. extractT lerp dần tới target →
    // mở/CẤT đều có animation, có thể đảo chiều (cất vỉ trở lại hộp).
    let extractTarget = 0, extractT = 0;
    const extractFrom = new THREE.Vector3(0, 0, 0);
    // Lấy ra: chỉ nhô ra trước 1 CHÚT (sát hộp) + lệch phải (hộp lùi trái).
    const extractTo = new THREE.Vector3(Math.max(w, h) * 0.14, h * 0.10, d / 2 + Math.max(w, h) * 0.30);

    let stopped = false;
    function tick() {
      if (stopped) return;
      const animating = Math.abs(extractT - extractTarget) > 0.0005;
      if (animating) {
        extractT += Math.sign(extractTarget - extractT) * 0.04;
        extractT = Math.max(0, Math.min(1, extractT));
      }
      const t = extractT;
      const e = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; // easeInOutCubic
      unit.visible = t > 0.004;
      if (unit.visible) {
        unit.position.lerpVectors(extractFrom, extractTo, e);
        unit.rotation.y = e * 0.5;
        // KHÔNG lật — giữ MẶT CÓ THUỐC (bầu/vỉ) NGỬA LÊN; chỉ ngả nhẹ cho thấy 3D.
        unit.rotation.x = -e * 0.30;
        if (unitKind === 'goi') unit.rotation.z = -e * 0.3;
      }
      // Thu nhỏ + lùi hộp sang trái để nhường focus cho đơn vị.
      pkgGroup.scale.setScalar(1 - e * 0.5);
      pkgGroup.position.set(-e * Math.max(w, h) * 0.5, 0, 0);
      // Camera FOCUS: chỉ chỉnh KHI đang animate (mở/cất) — target bám theo đơn vị
      // (auto-rotate + drag → xoay quanh CHÍNH vật) + zoom gần dần. Animate xong thì
      // BUÔNG cho user tự xoay/zoom (không giành lại).
      if (animating) {
        ctrl.target.lerp(extractTo.clone().multiplyScalar(e), 0.12);
        const dir = camera2.position.clone().sub(ctrl.target);
        let want = THREE.MathUtils.lerp(camDist, Math.max(w, h) * 1.2, e);
        want = Math.max(ctrl.minDistance, Math.min(ctrl.maxDistance, want));
        dir.setLength(THREE.MathUtils.lerp(dir.length(), want, 0.1));
        camera2.position.copy(ctrl.target).add(dir);
      }
      ctrl.update();
      renderer.render(scene2, camera2);
      requestAnimationFrame(tick);
    }
    fit(); requestAnimationFrame(tick);
    const onResize = () => fit();
    window.addEventListener('resize', onResize);

    function close() {
      stopped = true;
      window.removeEventListener('resize', onResize);
      document.removeEventListener('keydown', insEsc);
      // KHÔNG dispose renderer — context dùng chung, giữ cho lần mở sau (mở lại
      // tức thì). Chỉ dọn tài nguyên của RIÊNG lần mở này: listener OrbitControls
      // gắn trên canvas chung, geometry (VRAM) + 3 texture tự tạo.
      ctrl.dispose();
      scene2.traverse((o) => { o.geometry?.dispose?.(); });
      renderer.renderLists?.dispose?.();
      tex.dispose(); tex2.dispose(); sideTex.dispose();
      overlay.remove();
    }
    overlay.querySelector('.ins-return').addEventListener('click', () => {
      returnToShelf?.();
      close();
    });
    // Nút X góc phải trên — đóng inspector (trả thuốc về kệ).
    overlay.querySelector('.ins-close').addEventListener('click', () => {
      returnToShelf?.();
      close();
    });
    // Click nền tối ngoài modal cũng đóng.
    overlay.addEventListener('click', (e) => { if (e.target === overlay) { returnToShelf?.(); close(); } });
    // Phím ESC đóng.
    const insEsc = (e) => { if (e.key === 'Escape') { returnToShelf?.(); close(); } };
    document.addEventListener('keydown', insEsc);
    // Nút XANH (ins-confirm): chưa lấy đơn vị ra → đưa NGUYÊN HỘP vào khay; đang
    // lấy ra rồi → "Cho … vào GIỎ RA LẺ".
    const greenBtn = overlay.querySelector('.ins-confirm');
    // Yêu cầu thầy #12: chọn SỐ LƯỢNG đơn vị lấy ra (nhiều gói/vỉ/ống) và với VỈ
    // có thể "Cắt viên" (lấy vài viên trong vỉ). Stepper hiện khi đã mở hộp.
    let retailMode = unitKind;                    // 'vi'|'goi'|'ong'|'lo'; vỉ đổi được sang 'vien'
    let retailQty = 1;
    const perBlister = pillsPerBlister(drug);
    const curUnitWord = () => retailMode === 'vien' ? 'viên' : unitWordVN;
    const curMax = () => retailMode === 'vien' ? perBlister : 30;
    let qtyWrap = null, valEl = null;
    if (pkgKind === 'carton' && unitKind !== 'device') {
      qtyWrap = document.createElement('div');
      qtyWrap.className = 'ins-qty'; qtyWrap.style.display = 'none';
      qtyWrap.innerHTML = `
        ${unitKind === 'vi' ? `<div class="insq-modes"><button type="button" class="insq-mode insq-on" data-m="vi">Nguyên vỉ</button><button type="button" class="insq-mode" data-m="vien">Cắt viên</button></div>` : ''}
        <div class="insq-row"><span class="insq-lbl">Số lượng</span>
          <button class="insq-minus" type="button">−</button>
          <span class="insq-val">1</span>
          <button class="insq-plus" type="button">+</button>
          <span class="insq-unit"></span>
        </div>`;
      const actions = overlay.querySelector('.ins-actions');
      actions.parentNode.insertBefore(qtyWrap, actions);
      valEl = qtyWrap.querySelector('.insq-val');
      const unitEl = qtyWrap.querySelector('.insq-unit');
      const refreshQty = () => {
        retailQty = Math.max(1, Math.min(curMax(), retailQty));
        valEl.textContent = retailQty;
        unitEl.textContent = curUnitWord() + (retailMode === 'vien' ? ` (1 vỉ ${perBlister} viên)` : '');
        if (greenBtn) greenBtn.textContent = `📥 Cho ${retailQty} ${curUnitWord()} vào khay`;
      };
      qtyWrap.querySelector('.insq-minus').addEventListener('click', () => { retailQty--; refreshQty(); });
      qtyWrap.querySelector('.insq-plus').addEventListener('click', () => { retailQty++; refreshQty(); });
      qtyWrap.querySelectorAll('.insq-mode').forEach(b => b.addEventListener('click', () => {
        qtyWrap.querySelectorAll('.insq-mode').forEach(x => x.classList.toggle('insq-on', x === b));
        retailMode = b.dataset.m; retailQty = 1; refreshQty();
      }));
      qtyWrap._refresh = refreshQty;
    }
    greenBtn?.addEventListener('click', () => {
      if (extractTarget === 1) {
        const word = curUnitWord();
        // Đưa ĐƠN VỊ ra lẻ THẲNG vào KHAY BÁN HÀNG dưới dạng mesh 3D đúng hình
        // (vỉ/gói/ống/lọ… — KHÔNG phải hộp) — mỗi đơn vị 1 vật trong khay, bán ở
        // POS + trả kệ/xoá được như hộp. (yêu cầu 2 phần khay bán hàng)
        const n = sim.pickUnitToTray?.({
          drugId: drug.id, drug, unitKind, qty: retailQty,
          build: () => makeUnit(style.w, style.h, style.d),
        }) || 0;
        postAction('retail_split', { drugId: drug.id, unit: word, qty: n });
        close();
        showToast(n
          ? `Đã cho ${n} ${word} "${drug.brand}" vào khay bán hàng.`
          : 'Khay bán hàng đã đầy (tối đa 8 món) — thanh toán bớt rồi thêm tiếp.');
      } else {
        confirmToTray?.();
        close();
      }
    });
    // Nút "Mở hộp lấy đơn vị" CHỈ có với HỘP GIẤY (carton). Bấm = TOGGLE mở ↔ CẤT
    // vỉ trở lại hộp (đảo được). Khi đã lấy ra: nút xanh đổi thành "Cho … vào giỏ".
    const retailBtn = overlay.querySelector('.ins-retail');
    if (retailBtn) {
      retailBtn.textContent = `🔓 Mở hộp lấy ${unitWordVN}`;
      retailBtn.addEventListener('click', () => {
        if (extractTarget === 0) {
          extractTarget = 1; unit.visible = true;
          retailBtn.textContent = `📦 Cất ${unitWordVN} vào hộp`;
          if (qtyWrap) { qtyWrap.style.display = ''; qtyWrap._refresh?.(); }
          else if (greenBtn) greenBtn.textContent = `📥 Cho ${unitWordVN} vào khay`;
          postAction('open_box_unit', { drugId: drug.id, unit: unitWordVN });
        } else {
          extractTarget = 0;
          retailBtn.textContent = `🔓 Mở hộp lấy ${unitWordVN}`;
          if (qtyWrap) qtyWrap.style.display = 'none';
          if (greenBtn && !alreadyInTray) greenBtn.textContent = `📥 Đưa vào khay (Quét barcode)`;
          postAction('close_box_unit', { drugId: drug.id, unit: unitWordVN });
        }
      });
    }
    postAction('inspect_drug', { drugId: drug.id });
  }

  // P2: Modal tra cứu Dược thư 2018 / MIMS Pharmacy.
  function openReferenceBook(bookId) {
    const isDuocThu = bookId === 'duocthu2018';
    const meta = isDuocThu
      ? { title: '📕 Dược thư Quốc gia 2018', accent: '#7f1d1d',
          subtitle: 'Bộ Y tế – Dược thư Quốc gia Việt Nam (NXB Y học)' }
      : { title: '📒 MIMS Pharmacy Việt Nam', accent: '#b45309',
          subtitle: 'Cập nhật thông tin kê đơn & tương tác thuốc thực hành' };
    const catalog = sim.getCatalog ? sim.getCatalog() : [];
    const overlay = document.createElement('div');
    overlay.className = 'pos-overlay book-overlay';
    overlay.innerHTML = `
      <div class="book-modal">
        <div class="book-head" style="background:${meta.accent}">
          <div>
            <div class="book-title">${meta.title}</div>
            <div class="book-sub">${meta.subtitle}</div>
          </div>
          <button class="book-close" type="button">✕</button>
        </div>
        <div class="book-body">
          <div class="book-left">
            <input class="book-search" type="search" placeholder="🔎 Nhập tên thuốc / hoạt chất / SKU…"/>
            <div class="book-list"></div>
          </div>
          <div class="book-right">
            <div class="book-empty">Chọn 1 thuốc để xem chuyên luận đầy đủ.</div>
          </div>
        </div>
      </div>`;
    document.body.appendChild(overlay);
    const $$ = (s) => overlay.querySelector(s);
    const norm = (s) => (s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
    function renderList(q) {
      const qn = norm(q.trim());
      const matches = catalog.filter(({ drug }) =>
        !qn || norm(drug.brand).includes(qn) || norm(drug.name).includes(qn) ||
        norm(drug.generic).includes(qn) || norm(drug.sku).includes(qn)
      ).slice(0, 50);
      $$('.book-list').innerHTML = matches.length
        ? matches.map(({ drug }) => `
          <div class="book-row" data-id="${drug.id}">
            <div><b>${drug.brand || drug.name}</b> <span class="book-sku">${drug.sku}</span></div>
            <div style="color:#94a3b8;font-size:11px">${drug.generic || ''} · ${drug.strength || ''}</div>
          </div>`).join('')
        : '<div style="padding:14px;color:#94a3b8">Không có kết quả.</div>';
    }
    function renderDetail(id) {
      const entry = catalog.find(c => c.drug.id === id);
      if (!entry) return;
      const { drug, meta: m } = entry;
      $$('.book-right').innerHTML = `
        <div class="book-detail">
          <h2>${drug.brand || drug.name}</h2>
          <div class="book-detail-sub">${drug.generic || ''} · ${drug.strength || ''}</div>
          <table class="book-detail-tbl">
            <tr><td>Hoạt chất</td><td>${drug.generic || '—'}</td></tr>
            <tr><td>Hàm lượng</td><td>${drug.strength || '—'}</td></tr>
            <tr><td>Dạng bào chế</td><td>${drug.form || '—'}</td></tr>
            <tr><td>Phân nhóm</td><td>${drug.category || '—'}</td></tr>
            <tr><td>Quy cách</td><td>${drug.pack || '—'}</td></tr>
            <tr><td>Đơn vị nhỏ nhất</td><td>${drug.retailUnit || '—'}</td></tr>
            <tr><td>Barcode</td><td><code>${drug.barcode || '—'}</code></td></tr>
            <tr><td>Hạn dùng</td><td>${m.expiry}</td></tr>
            <tr><td>Tồn kho</td><td>${m.stock} hộp</td></tr>
            <tr><td>Đơn giá</td><td>${(drug.unitPrice || 0).toLocaleString('vi')} đ</td></tr>
            <tr><td>Kê đơn</td><td>${drug.isRx ? '✅ Có (Rx)' : '❌ Không (OTC)'}</td></tr>
            <tr><td>Kháng sinh</td><td>${drug.isAntibiotic ? '✅' : '—'}</td></tr>
            <tr><td>Cẩn trọng thai kỳ</td><td>${drug.isHazardPregnancy ? '⚠️ CÓ' : '—'}</td></tr>
          </table>
          ${isDuocThu ? `
            <h3>Chuyên luận (Dược thư)</h3>
            <p><b>Chỉ định:</b> Theo hướng dẫn chuyên ngành — xem chi tiết trong Dược thư Quốc gia 2018, chuyên luận ${drug.generic || drug.name}.</p>
            <p><b>Liều dùng:</b> Cần tham khảo bác sĩ/bộ Y tế cho từng đối tượng.</p>
            <p><b>Chống chỉ định:</b> Mẫn cảm với thành phần hoạt chất, các trường hợp đặc biệt theo chuyên luận.</p>
            <p><b>Tác dụng KMM:</b> Tham khảo Dược thư.</p>
          ` : `
            <h3>Thông tin MIMS</h3>
            <p><b>Cảnh báo tương tác:</b> Kiểm tra tương tác với các thuốc khác trên đơn trước khi giao.</p>
            <p><b>Lưu ý kê đơn:</b> Theo dõi BN sau dùng 24-48h, hỏi tiền sử dị ứng.</p>
            <p><b>Khuyến cáo:</b> Tham khảo MIMS Pharmacy Việt Nam phiên bản mới nhất.</p>
          `}
        </div>`;
    }
    $$('.book-close').addEventListener('click', () => overlay.remove());
    $$('.book-search').addEventListener('input', (e) => renderList(e.target.value));
    $$('.book-list').addEventListener('click', (e) => {
      const r = e.target.closest('.book-row');
      if (r) renderDetail(r.dataset.id);
    });
    renderList('');
    postAction('open_reference_book', { bookId });
  }

  // 7. Modal handlers: Prescription / Doctor phone / Senior pharmacist
  // P6a: Đơn thuốc theo Thông tư 26/2025/TT-BYT — mẫu chuẩn pháp lý.
  function openPrescription() {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();
    const rxCode = 'ĐT-' + Date.now().toString().slice(-8);
    const overlay = document.createElement('div');
    overlay.className = 'rx-overlay';
    overlay.innerHTML = `
      <div class="rx-modal">
        <div class="rx-tools">
          <button class="rx-print" type="button">🖨️ In</button>
          <button class="rx-close-x" type="button">✕</button>
        </div>
        <div class="rx-page">
          <div class="rx-head">
            <div class="rx-org">
              <div class="rx-org-line1">SỞ Y TẾ TP. HỒ CHÍ MINH</div>
              <div class="rx-org-line2">PHÒNG KHÁM ĐA KHOA AN BÌNH</div>
              <div class="rx-org-line3">Địa chỉ: 123 Lê Lợi, Q.1, TP.HCM · ĐT: 028.3823.4567</div>
              <div class="rx-org-line3">Mã CSKCB: 79-002-A8 · MST: 0301234567</div>
            </div>
            <div class="rx-logo">⚕</div>
          </div>
          <div class="rx-title">
            <div>ĐƠN THUỐC</div>
            <div class="rx-subtitle">(Ban hành theo Thông tư số 26/2025/TT-BYT ngày 30/06/2025 của Bộ Y tế)</div>
          </div>
          <div class="rx-meta-grid">
            <div><b>Số đơn:</b> ${rxCode}</div>
            <div><b>Ngày kê:</b> ${dd}/${mm}/${yyyy}</div>
          </div>
          <table class="rx-bn-tbl">
            <tr><td><b>Họ và tên BN:</b></td><td colspan="3">LÊ THỊ LAN</td></tr>
            <tr><td><b>Năm sinh:</b></td><td>1997 (28 tuổi)</td><td><b>Giới tính:</b></td><td>Nữ</td></tr>
            <tr><td><b>Cân nặng:</b></td><td>56 kg</td><td><b>CCCD:</b></td><td>079197012345</td></tr>
            <tr><td><b>Địa chỉ:</b></td><td colspan="3">456 Trần Hưng Đạo, P.Cầu Ông Lãnh, Q.1, TP.HCM</td></tr>
            <tr><td><b>Số BHYT:</b></td><td colspan="3">SV4 79 123 4567890</td></tr>
            <tr><td><b>Chẩn đoán:</b></td><td colspan="3"><b>Viêm họng cấp do virus (J02.9)</b> – Thai 12 tuần (Z34.0)</td></tr>
          </table>
          <div class="rx-prescribed">
            <table class="rx-drug-tbl">
              <thead>
                <tr>
                  <th style="width:5%">STT</th>
                  <th style="width:42%">Tên thuốc · Hàm lượng · Dạng bào chế</th>
                  <th style="width:10%">SL</th>
                  <th style="width:43%">Liều · Cách dùng</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td><b>PARACETAMOL</b> 500mg · Viên nén</td>
                  <td>15 viên</td>
                  <td>Uống 1 viên/lần × 3 lần/ngày × 5 ngày, khi sốt > 38.5°C, cách nhau ≥ 4 giờ</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td><b>VITAMIN C</b> 500mg · Viên sủi</td>
                  <td>7 viên</td>
                  <td>Hoà 1 viên/cốc nước, uống sáng × 7 ngày sau ăn</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td><b>NƯỚC MUỐI SINH LÝ</b> 0.9% · Dung dịch súc miệng</td>
                  <td>1 chai</td>
                  <td>Súc họng 3 lần/ngày sau khi đánh răng và trước ngủ</td>
                </tr>
              </tbody>
            </table>
            <div class="rx-warn">
              ⚠ <b>KHÔNG kê kháng sinh</b> — Viêm họng do virus không có chỉ định kháng sinh.<br>
              Tự ý dùng kháng sinh trong giai đoạn thai kỳ có thể gây hại cho thai nhi.
            </div>
            <div class="rx-instr">
              <b>Lời dặn của bác sĩ:</b><br>
              • Uống đủ nước (≥ 2 lít/ngày), nghỉ ngơi, súc họng nước muối ấm.<br>
              • Tái khám sau 5–7 ngày nếu chưa đỡ hoặc sốt ≥ 39°C kéo dài.<br>
              • Báo BS ngay nếu khó thở, đau ngực, phát ban.<br>
              • Tuyệt đối <u>không tự ý dùng kháng sinh</u> hoặc thuốc khác mà chưa hỏi BS.
            </div>
          </div>
          <div class="rx-footer">
            <div class="rx-sign-box">
              <div class="rx-sign-title">Người mua thuốc</div>
              <div class="rx-sign-line"></div>
              <div class="rx-sign-name">(Ký, ghi rõ họ tên)</div>
            </div>
            <div class="rx-sign-box">
              <div class="rx-sign-title">Người kê đơn</div>
              <div class="rx-sign-stamp">
                <div class="rx-stamp">[Đã ký]</div>
                <b>BS. NGUYỄN VĂN A</b><br>
                <span style="font-size:11px">CCHN: 002345/BYT-CCHN</span><br>
                <span style="font-size:11px">SĐT: 0912 345 678</span>
              </div>
            </div>
          </div>
          <div class="rx-note-foot">
            * Đơn thuốc có giá trị trong 5 ngày kể từ ngày kê. Mỗi lần lấy thuốc, dược sĩ phải ghi rõ ngày, số lượng đã giao và ký xác nhận lên đơn.<br>
            * Thuốc kháng sinh, thuốc kê đơn không được tự ý mua/bán ngoài đơn (Khoản 4 Điều 6 Thông tư 26/2025/TT-BYT).
          </div>
        </div>
      </div>`;
    document.body.appendChild(overlay);
    overlay.querySelector('.rx-close-x').addEventListener('click', () => overlay.remove());
    overlay.querySelector('.rx-print').addEventListener('click', () => window.print());
    postAction('view_prescription', { ts: Date.now(), rxCode });
  }

  function openDoctorPhone() {
    const CORRECT = '0912345678';
    const overlay = document.createElement('div');
    overlay.className = 'pos-overlay phone-overlay';
    overlay.innerHTML = `
      <div class="phone-modal">
        <div class="phone-head">
          <div class="phone-title">📞 ĐIỆN THOẠI – LIÊN HỆ BÁC SĨ KÊ ĐƠN</div>
        </div>
        <div class="phone-body">
          <div class="phone-prompt">Nhập số điện thoại của bác sĩ ghi trên đơn:</div>
          <div class="phone-display" data-placeholder="0xxx xxx xxx"></div>
          <div class="phone-pad">
            ${['1','2','3','4','5','6','7','8','9','*','0','⌫']
              .map(k => `<button class="phone-key" data-key="${k}" type="button">${k}</button>`).join('')}
          </div>
          <button class="phone-call" type="button" disabled>📞 Gọi</button>
          <div class="phone-hint">Mẹo: số đúng là <b>0912 345 678</b> (in trên đơn thuốc).</div>
        </div>
        <div class="phone-foot">
          <button class="phone-hangup" type="button">✕ Cúp máy</button>
        </div>
      </div>`;
    document.body.appendChild(overlay);
    const $disp = overlay.querySelector('.phone-display');
    const $call = overlay.querySelector('.phone-call');
    let dialed = '';
    function format(s) {
      // 4-3-3 grouping for 10-digit VN mobile
      const parts = [s.slice(0,4), s.slice(4,7), s.slice(7,10)].filter(Boolean);
      return parts.join(' ');
    }
    function render() {
      $disp.textContent = format(dialed) || '';
      $disp.classList.toggle('phone-display-empty', dialed.length === 0);
      $call.disabled = dialed.length < 10;
    }
    overlay.querySelectorAll('.phone-key').forEach(b => {
      b.addEventListener('click', () => {
        const k = b.dataset.key;
        if (k === '⌫') dialed = dialed.slice(0, -1);
        else if (dialed.length < 11) dialed += k;
        render();
      });
    });
    function close() { overlay.remove(); }
    overlay.querySelector('.phone-hangup').addEventListener('click', close);
    $call.addEventListener('click', () => {
      const cleaned = dialed.replace(/\D/g, '');
      const correct = cleaned === CORRECT;
      postAction('call_doctor', { dialed: cleaned, correct });
      close();
      if (correct) openDoctorChat();
      else alert('❌ Số không đúng. Hãy đối chiếu lại đơn thuốc.');
    });
    render();
  }

  // P6b: Chat box ảo với BS sau khi gọi đúng số. Sinh viên nhắn → BS reply
  // canned responses theo từ khoá (kháng sinh / thai / dị ứng / liều / tương tác).
  function openDoctorChat() {
    const overlay = document.createElement('div');
    overlay.className = 'pos-overlay doctor-chat-overlay';
    overlay.innerHTML = `
      <div class="dc-modal">
        <div class="dc-head">
          <div class="dc-avatar">🧑‍⚕️</div>
          <div>
            <div class="dc-name">BS. Nguyễn Văn A</div>
            <div class="dc-status">🟢 Đang trực tuyến · PK Đa khoa An Bình</div>
          </div>
          <button class="dc-close" type="button">📴 Cúp máy</button>
        </div>
        <div class="dc-body" id="dc-body"></div>
        <div class="dc-foot">
          <input class="dc-input" placeholder="Nhập tin nhắn cho BS…" autocomplete="off"/>
          <button class="dc-send" type="button">Gửi ▶</button>
        </div>
      </div>`;
    document.body.appendChild(overlay);
    const body = overlay.querySelector('#dc-body');
    const input = overlay.querySelector('.dc-input');
    const REPLIES = [
      { kw: ['chào','xin chào','dạ','alo'], reply: 'Alo, dược sĩ cần tư vấn gì về đơn thuốc của BN Lan?' },
      { kw: ['kháng sinh','amox','antibiotic'], reply: 'BN viêm họng do virus + đang mang thai 12 tuần thì KHÔNG kê kháng sinh. Anh kê paracetamol + vitamin C + súc họng nước muối đủ rồi.' },
      { kw: ['thai','mang thai','pregnancy'], reply: 'Đúng rồi, BN đang thai 12 tuần. Cẩn thận thuốc thuộc nhóm cấm — đặc biệt tetracyclin, fluoroquinolon, NSAID quá liều.' },
      { kw: ['dị ứng','allergy'], reply: 'BN chưa khai dị ứng với thuốc nào trong tiền sử. Nếu dược sĩ thấy nghi vấn, hỏi lại BN trước khi giao.' },
      { kw: ['liều','dose','dosage'], reply: 'Paracetamol max 4g/ngày người lớn — đơn của tôi là 1.5g/ngày (1v × 3 lần × 500mg) an toàn cho thai phụ.' },
      { kw: ['tương tác','interaction','phối hợp'], reply: 'Paracetamol + Vitamin C + NaCl 0.9% không có tương tác có ý nghĩa lâm sàng. Yên tâm cấp phát.' },
      { kw: ['thay','đổi','khác'], reply: 'Nếu BN không sẵn paracetamol viên nén, có thể dùng paracetamol gói sủi cùng hàm lượng. Bú nước muối thì có thể dùng NaCl 0.9% chai khác cũng được.' },
      { kw: ['bệnh','tình trạng','triệu'], reply: 'BN khám tôi 2 ngày trước, sốt nhẹ 38°C, đau họng, không khó thở, không phát ban. Diễn tiến nhẹ, theo dõi tại nhà 5-7 ngày.' },
      { kw: ['cảm ơn','tks','thanks'], reply: 'Không có gì. Có gì thắc mắc tiếp dược sĩ cứ liên hệ. Chúc dược sĩ làm việc hiệu quả.' }
    ];
    function addBubble(role, text) {
      const el = document.createElement('div');
      el.className = 'dc-bubble dc-' + role;
      el.textContent = text;
      body.appendChild(el);
      body.scrollTop = body.scrollHeight;
    }
    addBubble('doctor', 'Alo dược sĩ?');
    function send() {
      const v = input.value.trim();
      if (!v) return;
      addBubble('me', v);
      input.value = '';
      const lower = v.toLowerCase();
      const r = REPLIES.find(x => x.kw.some(k => lower.includes(k))) || { reply: 'Dược sĩ cứ tự cân nhắc, đơn của tôi là đúng theo phác đồ rồi.' };
      setTimeout(() => addBubble('doctor', r.reply), 600 + Math.random() * 400);
      postAction('chat_doctor', { message: v });
    }
    overlay.querySelector('.dc-send').addEventListener('click', send);
    input.addEventListener('keydown', (e) => { if (e.key === 'Enter') send(); });
    overlay.querySelector('.dc-close').addEventListener('click', () => overlay.remove());
    input.focus();
  }

  function applySenior(seniorOn) {
    document.body.classList.toggle('senior-mode', seniorOn);
    if ($('btn-senior')) $('btn-senior').textContent = seniorOn ? '👨‍⚕️ DS đại học · ON' : '👨‍⚕️ DS đại học';
    postAction('senior_pharmacist', { active: seniorOn });
  }
  function toggleSenior() {
    const seniorOn = document.body.classList.contains('senior-mode');
    if (seniorOn) { applySenior(false); return; }
    // Mở modal mời DS đại học (avatar + mô tả + button Bật)
    const overlay = document.createElement('div');
    overlay.className = 'pos-overlay senior-overlay';
    overlay.innerHTML = `
      <div class="senior-modal">
        <div class="senior-head">
          <div class="senior-title">👩‍🎓 Mời Dược sĩ Đại học (phụ trách chuyên môn)</div>
        </div>
        <div class="senior-body">
          <p class="senior-intro">
            Trong tình huống cần thay thế thuốc, tư vấn vượt thẩm quyền của dược sĩ trung học,
            sinh viên có thể mời <b>DS đại học</b> ra hỗ trợ.
          </p>
          <div class="senior-card">
            <div class="senior-avatar">👩‍⚕️</div>
            <div>
              <div class="senior-name">DS. ĐH Phạm Thị Hà</div>
              <div class="senior-role">Dược sĩ Đại học · Phụ trách chuyên môn</div>
              <div class="senior-place">Nhà thuốc Thực Hành</div>
            </div>
          </div>
          <p class="senior-note">
            Khi bật chế độ này, sinh viên tiếp tục đóng vai <b>DS đại học</b>; có thể:
            quyết định thay thế thuốc, tư vấn các nhóm Rx có cảnh báo, hoặc xử lý ca tế nhị ở
            khu vực tư vấn riêng.
          </p>
          <div class="senior-actions">
            <button class="senior-close" type="button">Đóng</button>
            <button class="senior-confirm" type="button">✅ Bật chế độ DS đại học</button>
          </div>
        </div>
      </div>`;
    document.body.appendChild(overlay);
    overlay.querySelector('.senior-close').addEventListener('click', () => overlay.remove());
    overlay.querySelector('.senior-confirm').addEventListener('click', () => {
      applySenior(true);
      overlay.remove();
    });
  }

  // 8. Stats bar: update khi pick/label thay đổi
  function updateStats() {
    if (!sim) return;
    const picked = sim.getPickedIds();
    const labels = sim.getLabels();
    const labeled = Object.keys(labels).length;
    // Mẫu số = số hộp ĐÃ LẤY vào giỏ; nhưng dược sĩ cũng dán được lên hộp ngay
    // trên kệ (chưa lấy) → khi đó picked.length=0 gây hiển thị "X/0" khó hiểu.
    // Dùng max() để mẫu số luôn ≥ tử số.
    const denom = Math.max(picked.length, labeled);
    if ($('stat-picked')) $('stat-picked').textContent = picked.length;
    if ($('stat-labeled')) $('stat-labeled').textContent = `${labeled}/${denom || '—'}`;
    if ($('labels-status')) $('labels-status').textContent = labeled
      ? `Đã dán nhãn HDSD lên ${labeled} hộp.`
      : 'Chưa có nhãn nào được dán. Mở khay dụng cụ trên quầy hoặc nút "Soạn nhãn mới".';
  }
  setInterval(updateStats, 800);

  // 9. Wire UI
  $('send').addEventListener('click', send);
  $('ta').addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); }
  });
  $('finish').addEventListener('click', finish);
  $('btn-pos').addEventListener('click', openPos);
  $('btn-label').addEventListener('click', openLabel);
  if ($('btn-rx')) $('btn-rx').addEventListener('click', openPrescription);
  if ($('btn-doctor')) $('btn-doctor').addEventListener('click', openDoctorPhone);
  if ($('btn-senior')) $('btn-senior').addEventListener('click', toggleSenior);

  // ── P1: Tooltip hover hộp thuốc (tên + HD + tồn kho) ─────────────────
  const tt = $('drug-tooltip');
  const canvas = $('scene-canvas');
  if (tt && canvas && sim.getDrugAtPointer) {
    let rafTooltip = 0;
    canvas.addEventListener('pointermove', (e) => {
      if (rafTooltip) return;
      rafTooltip = requestAnimationFrame(() => {
        rafTooltip = 0;
        const r = sim.getDrugAtPointer(e.clientX, e.clientY);
        if (!r) { tt.hidden = true; return; }
        const { drug, meta } = r;
        const lowStock = meta.stock < 20;
        const soonExpiry = meta.expiryYear === 2026 && meta.expiryMonth <= 6;
        tt.innerHTML = `
          <div class="tt-brand">${drug.brand || drug.name}</div>
          <div class="tt-generic">${drug.generic || ''}${drug.strength ? ' · ' + drug.strength : ''}</div>
          <div class="tt-row"><span>Dạng</span><span>${drug.form || '—'}</span></div>
          <div class="tt-row"><span>SKU</span><span>${drug.sku}</span></div>
          <div class="tt-row"><span>Hạn dùng</span><span class="${soonExpiry ? 'tt-warn' : ''}">${meta.expiry}</span></div>
          <div class="tt-row"><span>Tồn kho</span><span class="${lowStock ? 'tt-warn' : ''}">${meta.stock} hộp</span></div>
          <div class="tt-row"><span>Đơn vị</span><span>${drug.retailUnit || '—'}</span></div>
        `;
        tt.hidden = false;
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left + 14;
        const y = e.clientY - rect.top + 14;
        tt.style.left = Math.min(x, rect.width - 280) + 'px';
        tt.style.top  = Math.min(y, rect.height - 200) + 'px';
      });
    });
    canvas.addEventListener('pointerleave', () => { tt.hidden = true; });
  }

  // ── P1: Search box tìm theo tên/SKU ─────────────────────────────────
  const searchInput = $('drug-search-input');
  const searchResults = $('drug-search-results');
  if (searchInput && searchResults && sim.getCatalog) {
    const catalog = sim.getCatalog();
    function render(q) {
      const norm = (s) => (s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
      const qn = norm(q.trim());
      if (!qn) { searchResults.innerHTML = ''; return; }
      const matches = catalog.filter(({ drug }) =>
        norm(drug.brand).includes(qn) ||
        norm(drug.name).includes(qn) ||
        norm(drug.generic).includes(qn) ||
        norm(drug.sku).includes(qn)
      ).slice(0, 12);
      searchResults.innerHTML = matches.length
        ? matches.map(({ drug, meta }) => `
            <div class="ds-row" data-id="${drug.id}">
              <div>
                <div class="ds-brand">${drug.brand || drug.name}</div>
                <div class="ds-sku">${drug.sku} · ${drug.strength || ''}</div>
              </div>
              <div style="text-align:right;font-size:11px">
                <div>HD ${meta.expiry}</div>
                <div>Tồn ${meta.stock}</div>
              </div>
            </div>`).join('')
        : '<div style="color:#94a3b8;font-size:12px;padding:6px">Không tìm thấy.</div>';
    }
    let searchTimer;
    searchInput.addEventListener('input', () => {
      clearTimeout(searchTimer);
      searchTimer = setTimeout(() => render(searchInput.value), 120);
    });
    searchResults.addEventListener('click', (e) => {
      const row = e.target.closest('.ds-row');
      if (!row) return;
      sim.focusDrug(row.dataset.id);
    });
  }
}
