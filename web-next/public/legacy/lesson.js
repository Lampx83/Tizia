import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const $ = (id) => document.getElementById(id);
const slug = new URLSearchParams(location.search).get('slug') || (location.hash || '').replace('#', '');
const userKey = (() => {
  try {
    let k = localStorage.getItem('player.uid');
    if (!k) { k = 'u-' + Math.random().toString(36).slice(2, 12); localStorage.setItem('player.uid', k); }
    return k;
  } catch { return 'anon'; }
})();

if (!slug) {
  $('content').innerHTML = '<p style="text-align:center;opacity:0.7;padding:60px;">⚠️ Thiếu mã bài. URL phải có ?slug=…</p>';
} else {
  init();
}

async function init() {
  try {
    const res = await fetch('./api/lessons/' + slug);
    if (!res.ok) throw new Error('Bài không tồn tại hoặc đã xoá');
    const lesson = await res.json();
    document.title = 'Tizia · ' + lesson.title;
    $('title').textContent = lesson.title;
    $('meta').textContent =
      (lesson.subject ? lesson.subject + ' · ' : '') +
      (lesson.grade ? 'Lớp ' + lesson.grade + ' · ' : '') +
      (lesson.author ? 'GV: ' + lesson.author + ' · ' : '') +
      lesson.views + ' lượt xem · ' + lesson.likes + ' thích';
    $('likes-count').textContent = lesson.likes;
    $('edit-link').href = './lesson-builder.html?slug=' + lesson.slug;
    $('edit-link').style.display = 'inline-block';
    renderBlocks(lesson.blocks || []);
    $('end').style.display = 'block';
    $('comments-box').style.display = 'block';
    loadComments();
  } catch (e) {
    $('content').innerHTML = '<p style="text-align:center;opacity:0.7;padding:60px;">⚠️ ' + e.message + '</p>';
  }
}

function renderBlocks(blocks) {
  const c = $('content'); c.innerHTML = '';
  blocks.forEach((b, i) => c.appendChild(renderBlock(b, i)));
  // Track view progress for adaptive
  try {
    window.EduAdaptive?.event({
      skill: 'lesson-' + slug, correct: true, domain: 'school', context: slug,
    });
  } catch {}
}

function renderBlock(b, i) {
  const el = document.createElement('div');
  el.className = 'b b-' + b.type;
  switch (b.type) {
    case 'heading':
      el.innerHTML = b.level === 3 ? `<h3>${escape(b.text)}</h3>` : `<h2>${escape(b.text)}</h2>`;
      break;
    case 'text':
      el.textContent = b.text || '';
      break;
    case 'image':
      el.innerHTML = `<img src="${escape(b.url)}" alt="${escape(b.alt)}" loading="lazy" />${b.caption ? `<div class="cap">${escape(b.caption)}</div>` : ''}`;
      break;
    case 'video': {
      let u = b.url || '';
      if (/youtube\.com\/watch\?v=/.test(u)) u = u.replace('watch?v=', 'embed/');
      if (/youtu\.be\//.test(u)) u = u.replace('youtu.be/', 'www.youtube.com/embed/');
      el.innerHTML = `<iframe src="${escape(u)}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
      break;
    }
    case 'quiz': {
      el.innerHTML = `
        <div class="stem">${escape(b.stem)}</div>
        ${(b.options||[]).map((o, j) => `<div class="opt" data-i="${j}">${String.fromCharCode(65+j)}. ${escape(o)}</div>`).join('')}
        <div class="explain">💡 ${escape(b.explain || '')}</div>
      `;
      el.querySelectorAll('.opt').forEach((opt) => {
        opt.addEventListener('click', () => {
          if (el.classList.contains('answered')) return;
          el.classList.add('answered');
          const chosen = +opt.dataset.i;
          el.querySelectorAll('.opt').forEach((e2, j) => {
            if (j === b.correct) e2.classList.add('correct');
            else if (j === chosen) e2.classList.add('wrong');
          });
          // Push adaptive
          try { window.EduAdaptive?.event({ skill: 'lesson-' + slug + '-q' + i, correct: chosen === b.correct, domain: 'school', context: slug }); } catch {}
        });
      });
      break;
    }
    case '3d-model':
      el.innerHTML = b.caption ? `<div class="cap">${escape(b.caption)}</div>` : '';
      setTimeout(() => mountGlb(el, b.url), 100);
      break;
    case 'ai-tutor':
      el.className = 'b cta';
      el.innerHTML = `<div class="ico">🦉</div>
        <div><h3>Hỏi AI Tutor về bài này</h3><p>${escape(b.prompt || 'Bấm để mở tutor và đặt câu hỏi.')}</p></div>
        <div class="arrow">→</div>`;
      el.addEventListener('click', () => {
        if (window.EduTutor?.open) window.EduTutor.open();
        else alert('AI Tutor chưa sẵn sàng. Tải lại trang nhé.');
      });
      break;
    case 'ai-character':
      el.className = 'b cta';
      el.innerHTML = `<div class="ico">👤</div>
        <div><h3>Gặp danh nhân</h3><p>Bấm để chat với nhân vật ${escape(b.characterId)} (AI đóng vai)</p></div>
        <div class="arrow">→</div>`;
      el.addEventListener('click', () => window.open('./history-vn.html#char=' + b.characterId, '_blank'));
      break;
    case 'patient-sim':
      el.className = 'b cta';
      el.innerHTML = `<div class="ico">🩺</div>
        <div><h3>Mô phỏng bệnh nhân</h3><p>Bấm để thực hành ca lâm sàng ${escape(b.caseId)}</p></div>
        <div class="arrow">→</div>`;
      el.addEventListener('click', () => window.open('./patient-sim.html#case=' + b.caseId, '_blank'));
      break;
    case 'negotiation':
      el.className = 'b cta';
      el.innerHTML = `<div class="ico">🤝</div>
        <div><h3>Mô phỏng đàm phán</h3><p>Bấm để chơi kịch bản ${escape(b.scenarioId)}</p></div>
        <div class="arrow">→</div>`;
      el.addEventListener('click', () => window.open('./negotiation.html#scenario=' + b.scenarioId, '_blank'));
      break;
    case 'link':
      el.innerHTML = `<a class="b-link" href="${escape(b.url)}" target="_blank">🔗 ${escape(b.label || b.url)}</a>`;
      break;
    case 'callout':
      el.className = 'b b-callout ' + (b.kind || 'info');
      el.innerHTML = escape(b.text);
      break;
    case 'divider':
      el.className = 'b-divider';
      break;
    default:
      el.textContent = '[' + b.type + ']';
  }
  return el;
}

function mountGlb(container, url) {
  if (!url) {
    container.innerHTML += '<div style="padding:30px;text-align:center;opacity:0.6;">⚠️ Chưa có URL model</div>';
    return;
  }
  const w = container.clientWidth, h = container.clientHeight || 300;
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(w, h); renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  container.appendChild(renderer.domElement);
  const scene = new THREE.Scene();
  const cam = new THREE.PerspectiveCamera(45, w / h, 0.1, 1000);
  cam.position.set(4, 3, 5);
  scene.add(new THREE.AmbientLight(0xffffff, 0.8));
  const dl = new THREE.DirectionalLight(0xfbbf24, 1); dl.position.set(5, 8, 4); scene.add(dl);
  const controls = new OrbitControls(cam, renderer.domElement);
  controls.enableDamping = true; controls.autoRotate = true; controls.autoRotateSpeed = 1.5;
  new GLTFLoader().load(url, (g) => {
    const r = g.scene;
    const bbox = new THREE.Box3().setFromObject(r);
    const size = bbox.getSize(new THREE.Vector3()).length() || 1;
    const center = bbox.getCenter(new THREE.Vector3());
    r.position.sub(center); r.scale.setScalar(3 / size);
    scene.add(r);
  }, undefined, () => {
    container.innerHTML += '<div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;color:#fca5a5;">⚠️ Không tải được model</div>';
  });
  (function loop(){ requestAnimationFrame(loop); controls.update(); renderer.render(scene, cam); })();
}

// LIKE
$('like').addEventListener('click', async () => {
  const res = await fetch('./api/lessons/' + slug + '/like', {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userKey }),
  });
  const data = await res.json();
  $('like').classList.toggle('on', data.liked);
  // Refresh count
  const lr = await fetch('./api/lessons/' + slug).then(r => r.json()).catch(() => null);
  if (lr) $('likes-count').textContent = lr.likes;
});

// SHARE
$('share').addEventListener('click', async () => {
  const url = location.href;
  try {
    if (navigator.share) {
      await navigator.share({ title: $('title').textContent, url });
    } else {
      await navigator.clipboard.writeText(url);
      $('share').textContent = '✓ Đã copy';
      setTimeout(() => $('share').textContent = '🔗 Share', 2000);
    }
  } catch {}
});

// COMMENTS
async function loadComments() {
  try {
    const r = await fetch('./api/lessons/' + slug + '/comments');
    const d = await r.json();
    const list = $('comments-list');
    if (!d.items?.length) {
      list.innerHTML = '<p style="opacity:0.6;font-size:13px;">Chưa có phản hồi nào. Bạn là người đầu tiên?</p>';
      return;
    }
    list.innerHTML = d.items.map(c => `
      <div class="item">
        <div class="author">${escape(c.author || 'Ẩn danh')} <span class="when">· ${timeAgo(c.created_at)}</span></div>
        <div class="text">${escape(c.text)}</div>
      </div>
    `).join('');
  } catch {}
}
$('cmt-send').addEventListener('click', async () => {
  const text = $('cmt-input').value.trim();
  if (!text) return;
  const author = $('cmt-name').value.trim() || 'Ẩn danh';
  await fetch('./api/lessons/' + slug + '/comments', {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ author, text }),
  });
  $('cmt-input').value = '';
  loadComments();
});

function escape(s) {
  return String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[c]));
}
function timeAgo(t) {
  const s = Math.floor((Date.now() - t) / 1000);
  if (s < 60) return s + 's';
  if (s < 3600) return Math.floor(s/60) + 'p';
  if (s < 86400) return Math.floor(s/3600) + 'h';
  return Math.floor(s/86400) + 'd';
}
