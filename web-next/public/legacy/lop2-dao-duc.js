// Trang trải nghiệm đạo đức Lớp 2 (wrap-mount ngoài cây app/ của Next).
// CONTENT (15 tình huống: tình huống + đúng/sai + lời giải) đã chuyển vào DB
// content_datasets(collection='lop2-dao-duc') và fetch runtime qua
// GET /api/content/lop2-dao-duc — KHÔNG còn hardcode POOL trong code.
//
// Hành vi GIỮ NGUYÊN trang gốc: rút 10/15 tình huống ngẫu nhiên, chọn ✅/❌ hoặc
// vuốt thẻ, feedback từng câu, thanh tiến độ, modal tổng kết + best (localStorage),
// đồng bộ XP qua /api/wallet (GET rồi PUT) khi đã đăng nhập.

(function () {
  const root = document.getElementById('dd2-root');
  if (!root) return;
  if (root.dataset.mounted === '1') return; // idempotent (StrictMode / remount)
  root.dataset.mounted = '1';

  let POOL = [];

  const $ = (s) => root.querySelector(s);
  const deck = $('#dd2-deck');
  let queue = [], idx = 0, right = 0, wrong = 0, total = 10, currentEl = null;

  function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function renderCard() {
    deck.innerHTML = '';
    if (idx >= queue.length) { end(); return; }
    const q = queue[idx];
    const el = document.createElement('div');
    el.className = 'dd2-card';
    el.innerHTML = `<div class="dd2-emo">${q.e}</div><div class="dd2-text">${q.t}</div>
      <div class="dd2-badge yes">ĐÚNG</div><div class="dd2-badge no">SAI</div>`;
    deck.appendChild(el);
    currentEl = el;
    $('#dd2-cur').textContent = (idx + 1) + '/' + total;
    $('#dd2-bar').style.width = ((idx) / total * 100) + '%';
  }

  function answer(picked) {
    if (!currentEl) return;
    const q = queue[idx];
    const correct = (picked === q.ok);
    if (correct) {
      right++; $('#dd2-right').textContent = right;
      $('#dd2-fb').textContent = '✅ ' + q.f; $('#dd2-fb').className = 'dd2-feedback ok';
    } else {
      wrong++; $('#dd2-wrong').textContent = wrong;
      $('#dd2-fb').textContent = '❌ ' + q.f; $('#dd2-fb').className = 'dd2-feedback bad';
    }
    currentEl.classList.add(picked ? 'swipeR' : 'swipeL');
    currentEl.classList.add(picked ? 'showYes' : 'showNo');
    currentEl = null;
    setTimeout(() => { idx++; renderCard(); }, 380);
  }

  // Swipe / drag
  let dragX0 = null, curDX = 0;
  function bindSwipe() {
    deck.addEventListener('pointerdown', (e) => {
      if (!currentEl) return;
      dragX0 = e.clientX; curDX = 0;
      currentEl.style.transition = 'none';
    });
    deck.addEventListener('pointermove', (e) => {
      if (dragX0 == null || !currentEl) return;
      curDX = e.clientX - dragX0;
      currentEl.style.transform = `translateX(${curDX}px) rotate(${curDX * 0.05}deg)`;
      currentEl.classList.toggle('showYes', curDX > 40);
      currentEl.classList.toggle('showNo', curDX < -40);
    });
    deck.addEventListener('pointerup', () => {
      if (dragX0 == null || !currentEl) { dragX0 = null; return; }
      currentEl.style.transition = '';
      if (curDX > 80) answer(true);
      else if (curDX < -80) answer(false);
      else { currentEl.style.transform = ''; currentEl.classList.remove('showYes', 'showNo'); }
      dragX0 = null; curDX = 0;
    });
  }

  function start() {
    if (!POOL.length) { deck.innerHTML = '<div class="dd2-text">Chưa có nội dung.</div>'; return; }
    total = Math.min(10, POOL.length);
    queue = shuffle([...POOL]).slice(0, total);
    idx = 0; right = 0; wrong = 0;
    $('#dd2-right').textContent = 0; $('#dd2-wrong').textContent = 0;
    $('#dd2-fb').textContent = ' '; $('#dd2-fb').className = 'dd2-feedback';
    renderCard();
  }

  function end() {
    $('#dd2-bar').style.width = '100%';
    const score = right * 15 - wrong * 4;
    const safe = Math.max(0, score);
    const key = 'lop2-dao-duc.best';
    const prev = Number(localStorage.getItem(key) || 0);
    const best = Math.max(prev, safe);
    if (safe > prev) localStorage.setItem(key, safe);
    $('#dd2-ov-right').textContent = right; $('#dd2-ov-total').textContent = total;
    $('#dd2-ov-score').textContent = safe; $('#dd2-ov-best').textContent = best;
    $('#dd2-ov-title').textContent = right >= 9 ? '🏆 Học sinh gương mẫu!' : right >= 7 ? '🌟 Tốt lắm!' : '👍 Cố gắng nhé!';
    $('#dd2-ov-msg').textContent = right >= 9 ? 'Em rất hiểu và sống đẹp!' : 'Đọc kĩ tình huống lần sau nhé.';
    $('#dd2-modal-over').classList.remove('hide');
    try {
      const xp = Math.floor(safe / 10);
      if (xp > 0 && window.fetch) {
        fetch('/api/wallet', { credentials: 'same-origin' }).then((r) => r.ok ? r.json() : null).then((w) => {
          if (!w) return;
          fetch('/api/wallet', {
            method: 'PUT', credentials: 'same-origin',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...w, xp: (w.xp || 0) + xp }),
          });
        });
      }
    } catch (_) { /* best-effort */ }
  }

  $('#dd2-btn-yes').addEventListener('click', () => answer(true));
  $('#dd2-btn-no').addEventListener('click', () => answer(false));
  $('#dd2-btn-restart').addEventListener('click', () => { $('#dd2-modal-over').classList.add('hide'); start(); });
  bindSwipe();

  // Nạp content từ DB (content_datasets) qua endpoint generic, rồi mới start.
  deck.innerHTML = '<div class="dd2-text">Đang tải…</div>';
  fetch('/api/content/lop2-dao-duc', { credentials: 'same-origin' })
    .then((r) => (r.ok ? r.json() : null))
    .then((data) => {
      const items = data && Array.isArray(data.items) ? data.items : [];
      POOL = items;
      start();
    })
    .catch(() => { POOL = []; start(); });
})();
