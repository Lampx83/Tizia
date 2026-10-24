// === WRAP-MOUNT: nội dung NGUYÊN VĂN khối <script type="module"> của
// public/assets.html — chỉ đổi 1 chỗ: fetch('./api/assets') → fetch('/api/assets')
// vì trang Next phục vụ ở /assets (không phải /assets.html), path tương đối
// './api/assets' sẽ trỏ sai sang /assets/api/assets. Import bare 'three' /
// 'three/addons/' được resolve bởi <script type="importmap"> mà page.tsx chèn.
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const grid = document.getElementById('grid');
const statsEl = document.getElementById('stats');
const emptyEl = document.getElementById('empty');
const qEl = document.getElementById('q');
const chipsEl = document.getElementById('cat-chips');
const modal = document.getElementById('modal');
const box = document.getElementById('box');
const modalMeta = document.getElementById('modal-meta');
document.getElementById('close').addEventListener('click', closeModal);
modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });

const CAT_ICON = {
  building: '🏢', urban: '🏙', campus: '🏫', education: '🎓',
  nature: '🌳', plant: '🌱', street: '🛣', park: '🌲',
  vehicle: '🚗', character: '🧑', food: '🍞', classroom: '📚',
  lab: '🧪', science: '🔬', sport: '⚽', outdoor: '☂',
  misc: '🧱', other: '❓',
};

let ASSETS = [];
let activeCat = 'all';

(async function init() {
  try {
    const res = await fetch('/api/assets', { cache: 'no-store' });
    const data = await res.json();
    ASSETS = data.items || [];
    statsEl.textContent = `${data.count} model · ${Object.keys(data.packs || {}).length} gói · cập nhật ${new Date(data.scannedAt).toLocaleTimeString('vi-VN')}`;
    renderChips(data.tags || {});
    render();
  } catch (e) {
    statsEl.textContent = '⚠ Không tải được catalogue.';
    console.error(e);
  }
})();

function renderChips(tagCount) {
  const allCats = new Set(['all']);
  for (const a of ASSETS) allCats.add(a.category);
  chipsEl.innerHTML = [...allCats].map(c => `
    <div class="chip ${c==='all'?'active':''}" data-cat="${c}">
      ${c === 'all' ? '🌐 Tất cả' : (CAT_ICON[c] || '🧱') + ' ' + c} (${c==='all' ? ASSETS.length : ASSETS.filter(a => a.category === c).length})
    </div>
  `).join('');
  chipsEl.querySelectorAll('.chip').forEach(el => {
    el.addEventListener('click', () => {
      chipsEl.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
      el.classList.add('active');
      activeCat = el.dataset.cat;
      render();
    });
  });
}

qEl.addEventListener('input', render);

function render() {
  const q = qEl.value.trim().toLowerCase();
  const items = ASSETS.filter(a => {
    if (activeCat !== 'all' && a.category !== activeCat) return false;
    if (!q) return true;
    return a.name.toLowerCase().includes(q)
      || a.file.toLowerCase().includes(q)
      || a.tags.some(t => t.toLowerCase().includes(q));
  });

  emptyEl.style.display = items.length ? 'none' : 'block';
  grid.innerHTML = items.map((a, i) => `
    <div class="card" data-idx="${i}" draggable="true" data-url="${a.url}">
      <div class="thumb" data-url="${a.url}">${CAT_ICON[a.category] || '🧱'}</div>
      <div class="info">
        <div class="name" title="${a.file}">${escape(a.name)}</div>
        <div class="meta">${a.format.toUpperCase()} · ${a.sizeHuman}</div>
        <div class="tags">${a.tags.slice(0, 4).map(t => `<span>${t}</span>`).join('')}</div>
      </div>
    </div>
  `).join('');

  grid.querySelectorAll('.card').forEach((el) => {
    el.addEventListener('click', () => openPreview(items[+el.dataset.idx]));
    el.addEventListener('dragstart', (e) => {
      // Cho phép kéo URL vào input field hoặc Lesson Builder (sau này)
      e.dataTransfer.setData('text/plain', new URL(el.dataset.url, location.href).toString());
      e.dataTransfer.setData('application/x-tizia-asset', el.dataset.url);
    });
  });
}

function escape(s) {
  return String(s).replace(/[&<>"]/g, c => ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;' }[c]));
}

// === 3D preview với GLTFLoader + OrbitControls ===
let renderer, scene, camera, controls, rafId;
function openPreview(a) {
  modal.classList.add('show');
  modalMeta.innerHTML = `
    <b>${escape(a.name)}</b> · ${a.format.toUpperCase()} · ${a.sizeHuman}<br>
    URL: <code>${escape(a.url)}</code><br>
    Tags: ${a.tags.map(t => `<span style="display:inline-block;padding:2px 8px;background:rgba(251,191,36,0.15);border-radius:999px;font-size:11px;color:#fbbf24;margin:2px;">${t}</span>`).join('')}
  `;
  // Wipe + rebuild
  box.querySelectorAll('canvas').forEach(c => c.remove());
  if (rafId) cancelAnimationFrame(rafId);

  const w = box.clientWidth, h = box.clientHeight;
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(w, h);
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  box.appendChild(renderer.domElement);

  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 1000);
  camera.position.set(4, 3, 5);
  scene.add(new THREE.AmbientLight(0xffffff, 0.7));
  const dl = new THREE.DirectionalLight(0xfbbf24, 1.2);
  dl.position.set(5, 8, 4); scene.add(dl);

  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.autoRotate = true; controls.autoRotateSpeed = 1.5;

  if (a.format === 'glb' || a.format === 'gltf') {
    new GLTFLoader().load(a.url, (gltf) => {
      const root = gltf.scene;
      const bbox = new THREE.Box3().setFromObject(root);
      const size = bbox.getSize(new THREE.Vector3()).length() || 1;
      const center = bbox.getCenter(new THREE.Vector3());
      root.position.sub(center);
      const scale = 3 / size;
      root.scale.setScalar(scale);
      scene.add(root);
      controls.target.set(0, 0, 0);
    }, undefined, (err) => {
      box.innerHTML = '<div style="color:#f87171;padding:20px;">Lỗi tải model: ' + (err.message || 'không rõ') + '</div>';
    });
  } else {
    box.innerHTML = '<div style="color:white;padding:20px;">Preview chỉ hỗ trợ GLB/GLTF lúc này. Format ' + a.format + ' chưa có viewer.</div>';
  }

  (function loop() {
    rafId = requestAnimationFrame(loop);
    controls.update();
    renderer.render(scene, camera);
  })();
}

function closeModal() {
  modal.classList.remove('show');
  if (rafId) cancelAnimationFrame(rafId);
  if (renderer) { renderer.dispose(); }
  box.querySelectorAll('canvas').forEach(c => c.remove());
}
