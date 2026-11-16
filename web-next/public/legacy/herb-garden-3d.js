import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const HERBS = [
  { id:'ginger',    name:'Gừng',     emoji:'🫚', part:'Thân rễ', use:'Ấm bụng, chống nôn',        color:0x7fa83f, root:0xc08a4a, h:0.9 },
  { id:'mint',      name:'Bạc hà',   emoji:'🌿', part:'Lá',      use:'Giải cảm, sát khuẩn họng',  color:0x39b85a, h:1.3 },
  { id:'licorice',  name:'Cam thảo', emoji:'🍵', part:'Rễ',      use:'Giảm ho, điều vị, giải độc', color:0x6fae3a, root:0xca8a7a, h:1.6 },
  { id:'ginseng',   name:'Nhân sâm', emoji:'🌺', part:'Rễ',      use:'Bồi bổ khí',                color:0x4c9a3a, root:0xe0c49a, h:0.8 },
  { id:'chrysanth', name:'Cúc hoa',  emoji:'🌼', part:'Hoa',     use:'Mát gan, sáng mắt',         color:0x4aa84a, flower:0xffd23f, h:1.1 },
  { id:'fishmint',  name:'Diếp cá',  emoji:'🍃', part:'Lá',      use:'Kháng khuẩn, lợi tiểu',     color:0x57b070, h:0.7 },
];
const HERB_BY_ID = Object.fromEntries(HERBS.map(h => [h.id, h]));

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xa6d8ef);
scene.fog = new THREE.Fog(0xa6d8ef, 22, 46);

const camera = new THREE.PerspectiveCamera(50, innerWidth/innerHeight, 0.1, 100);
camera.position.set(0, 6.5, 12);

const renderer = new THREE.WebGLRenderer({ antialias:true });
renderer.setSize(innerWidth, innerHeight);
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 1, 0);
controls.enableDamping = true; controls.dampingFactor = 0.08;
controls.minDistance = 5; controls.maxDistance = 22;
controls.maxPolarAngle = Math.PI * 0.49;

scene.add(new THREE.HemisphereLight(0xffffff, 0x6b8f4e, 1.0));
const sun = new THREE.DirectionalLight(0xfff3d6, 1.5);
sun.position.set(6, 12, 5); sun.castShadow = true;
sun.shadow.mapSize.set(1024,1024); sun.shadow.camera.left=-14; sun.shadow.camera.right=14; sun.shadow.camera.top=14; sun.shadow.camera.bottom=-14;
scene.add(sun);

// ground
const ground = new THREE.Mesh(new THREE.PlaneGeometry(60,60), new THREE.MeshStandardMaterial({ color:0x6ab14f }));
ground.rotation.x = -Math.PI/2; ground.receiveShadow = true; scene.add(ground);

// garden beds (2 rows of soil)
const soilMat = new THREE.MeshStandardMaterial({ color:0x6b4a2f });
[-1.6, 1.6].forEach(z => {
  const bed = new THREE.Mesh(new THREE.BoxGeometry(11, 0.4, 2.4), soilMat);
  bed.position.set(0, 0.2, z); bed.receiveShadow = true; scene.add(bed);
});

// label sprite
function makeLabel(emoji, name) {
  const c = document.createElement('canvas'); c.width = 256; c.height = 72; const x = c.getContext('2d');
  x.fillStyle = 'rgba(8,12,24,0.82)'; roundRect(x, 6, 6, 244, 60, 14); x.fill();
  x.strokeStyle = 'rgba(91,189,124,0.9)'; x.lineWidth = 3; roundRect(x, 6, 6, 244, 60, 14); x.stroke();
  x.font = '34px sans-serif'; x.textBaseline = 'middle'; x.fillText(emoji, 18, 40);
  x.fillStyle = '#fff'; x.font = 'bold 26px Inter, sans-serif'; x.fillText(name, 64, 40);
  const tex = new THREE.CanvasTexture(c); tex.colorSpace = THREE.SRGBColorSpace;
  const sp = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, transparent:true }));
  sp.scale.set(2.4, 0.68, 1); return sp;
}
function roundRect(ctx, x, y, w, h, r){ ctx.beginPath(); ctx.moveTo(x+r,y); ctx.arcTo(x+w,y,x+w,y+h,r); ctx.arcTo(x+w,y+h,x,y+h,r); ctx.arcTo(x,y+h,x,y,r); ctx.arcTo(x,y,x+w,y,r); ctx.closePath(); }

// build a stylised plant group
const pickables = [];
const plantGroups = {};
function makePlant(h) {
  const g = new THREE.Group();
  const stemMat = new THREE.MeshStandardMaterial({ color:0x5a7a2e });
  const leafMat = new THREE.MeshStandardMaterial({ color:h.color, flatShading:true });
  const height = h.h;
  // stem
  const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.1, height, 6), stemMat);
  stem.position.y = height/2 + 0.4; stem.castShadow = true; g.add(stem);
  // foliage clusters
  const foliage = new THREE.Group();
  const clusters = h.id==='fishmint' ? 5 : (h.id==='ginger' ? 4 : 3);
  for (let i=0;i<clusters;i++){
    const r = 0.34 + Math.random()*0.18;
    const blob = new THREE.Mesh(new THREE.IcosahedronGeometry(r, 0), leafMat);
    const a = (i/clusters)*Math.PI*2;
    blob.position.set(Math.cos(a)*0.34, height + 0.4 + (Math.random()*0.3 - (h.id==='fishmint'?0.2:0)), Math.sin(a)*0.34);
    blob.castShadow = true; foliage.add(blob);
  }
  // top blob
  const top = new THREE.Mesh(new THREE.IcosahedronGeometry(0.4, 0), leafMat);
  top.position.y = height + 0.7; top.castShadow = true; foliage.add(top);
  g.add(foliage);
  // flowers (chrysanthemum)
  if (h.flower) {
    const fMat = new THREE.MeshStandardMaterial({ color:h.flower, emissive:h.flower, emissiveIntensity:0.15 });
    for (let i=0;i<5;i++){ const f = new THREE.Mesh(new THREE.IcosahedronGeometry(0.16,0), fMat);
      const a=(i/5)*Math.PI*2; f.position.set(Math.cos(a)*0.3, height+0.7+Math.sin(a)*0.2, Math.sin(a)*0.3); f.castShadow=true; g.add(f); }
  }
  // visible root (ginger/ginseng/licorice)
  if (h.root) {
    const rMat = new THREE.MeshStandardMaterial({ color:h.root, roughness:0.9 });
    const root = new THREE.Mesh(new THREE.SphereGeometry(0.34, 8, 6), rMat);
    root.scale.set(1, 0.7, 1); root.position.y = 0.5; root.castShadow = true; g.add(root);
    const r2 = new THREE.Mesh(new THREE.ConeGeometry(0.12, 0.5, 6), rMat);
    r2.position.set(0.18, 0.32, 0); r2.rotation.z = 0.5; g.add(r2);
  }
  // label
  const label = makeLabel(h.emoji, h.name); label.position.y = height + 1.5; g.add(label);
  g.userData.herbId = h.id; g.userData.baseY = 0;
  g.traverse(o => { if (o.isMesh) { o.userData.herbId = h.id; pickables.push(o); } });
  return g;
}

// place 6 plants: 3 per row
HERBS.forEach((h, i) => {
  const g = makePlant(h);
  const col = i % 3, row = Math.floor(i / 3);
  g.position.set((col - 1) * 3.4, 0, row === 0 ? -1.6 : 1.6);
  scene.add(g); plantGroups[h.id] = g;
});

// === picking ===
const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();
let downXY = null;
renderer.domElement.addEventListener('pointerdown', e => downXY = [e.clientX, e.clientY]);
renderer.domElement.addEventListener('pointerup', e => {
  if (!downXY) return;
  const moved = Math.hypot(e.clientX - downXY[0], e.clientY - downXY[1]);
  downXY = null;
  if (moved > 6) return; // was a drag (orbit)
  const r = renderer.domElement.getBoundingClientRect();
  pointer.x = ((e.clientX - r.left) / r.width) * 2 - 1;
  pointer.y = -((e.clientY - r.top) / r.height) * 2 + 1;
  raycaster.setFromCamera(pointer, camera);
  const hits = raycaster.intersectObjects(pickables, false);
  if (hits.length) selectHerb(hits[0].object.userData.herbId);
});

let highlighted = null;
function selectHerb(id) {
  const h = HERB_BY_ID[id]; if (!h) return;
  // highlight
  if (highlighted) highlighted.scale.set(1,1,1);
  highlighted = plantGroups[id]; highlighted.scale.set(1.12, 1.12, 1.12);
  // info card
  document.getElementById('info-ic').textContent = h.emoji;
  document.getElementById('info-name').textContent = h.name;
  document.getElementById('info-part').textContent = h.part;
  document.getElementById('info-use').textContent = h.use;
  document.getElementById('info').classList.add('show');
  if (quest.active) checkQuest(id);
}
document.getElementById('info-x').addEventListener('click', () => document.getElementById('info').classList.remove('show'));
window.__pick = selectHerb; // test/demo hook

// === quest mode ===
const quest = { active:false, queue:[], idx:0, score:0 };
const questEl = document.getElementById('quest');
function toast(m){ const t=document.getElementById('toast'); t.textContent=m; t.style.display='block'; clearTimeout(t._t); t._t=setTimeout(()=>t.style.display='none',2200); }
function startQuest(){
  quest.active = true; quest.queue = HERBS.map(h=>h.id).sort(()=>Math.random()-0.5); quest.idx = 0; quest.score = 0;
  document.getElementById('score-wrap').style.display = 'inline';
  document.getElementById('quest-btn').textContent = '✕ Dừng đố';
  questEl.classList.add('show'); askQuest();
}
function stopQuest(){ quest.active=false; questEl.classList.remove('show'); document.getElementById('quest-btn').textContent='🎯 Đố vui'; }
function askQuest(){
  const h = HERB_BY_ID[quest.queue[quest.idx]];
  questEl.innerHTML = `Câu ${quest.idx+1}/6 · Tìm cây dùng <b>${h.part.toLowerCase()}</b> để <b>${h.use.toLowerCase()}</b> — bấm vào cây đó!`;
  document.getElementById('score').textContent = quest.score;
}
function checkQuest(id){
  const want = quest.queue[quest.idx];
  if (id === want){ quest.score++; toast('🎯 Chính xác! +1'); quest.idx++;
    document.getElementById('score').textContent = quest.score;
    if (quest.idx >= quest.queue.length){ questEl.innerHTML = `🏆 Hoàn thành! Đúng <b>${quest.score}/6</b> cây.`; quest.active=false;
      document.getElementById('quest-btn').textContent='↺ Chơi lại'; }
    else setTimeout(askQuest, 700);
  } else { toast('✗ Chưa đúng — đọc lại bộ phận dùng & công dụng nhé'); }
}
document.getElementById('quest-btn').addEventListener('click', () => { if (quest.active) stopQuest(); else startQuest(); });

// === loop ===
const clock = new THREE.Clock();
function animate(){
  const t = clock.getElapsedTime();
  for (const id in plantGroups){ plantGroups[id].rotation.z = Math.sin(t*1.2 + id.length) * 0.03; }
  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
animate();
document.getElementById('loading').style.display = 'none';

addEventListener('resize', () => {
  camera.aspect = innerWidth/innerHeight; camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight);
});

if (new URLSearchParams(location.search).has('auto')) setTimeout(() => selectHerb('chrysanth'), 600);
