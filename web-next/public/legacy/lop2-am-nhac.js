// ⚠️ WRAP-MOUNT — mirror NGUYÊN VĂN khối <script> inline của trang gốc
// public/lop2-am-nhac.html ("🎵 Đô-Rê-Mi Bay" — game âm nhạc Lớp 2 gõ nốt rơi
// đúng nhịp, canvas-DOM + WebAudio tự tổng hợp âm 7 nốt Đô–Si).
//
// CONTENT ở đây là bảng NOTES (7 nốt: tên + màu + phím tắt + TẦN SỐ CHUẨN C4–B4).
// Đây là hằng số nhạc lý cố định (261.63…493.88 Hz), KHÔNG phải content nghiệp vụ
// biến động → giữ trong file legacy này là hợp lý; nếu muốn quản qua DB thì seed
// một bảng note-frequency rồi fetch, nhưng không bắt buộc (xem risks).
//
// Hành vi GIỮ NGUYÊN trang gốc: WebAudio lazy tạo trong user-gesture, intro melody
// 7 nốt khi bấm Bắt đầu, nốt rơi theo requestAnimationFrame, gõ phím A S D F G H J
// hoặc bấm thanh nốt, chấm PERFECT/GOOD/miss, combo, đồng hồ 60s, modal tổng kết +
// best (localStorage), đồng bộ XP qua /api/wallet (GET rồi PUT) khi đã đăng nhập.
//
// Khác biệt DUY NHẤT so với inline gốc: bọc trong IIFE gắn với #am2-root để
// idempotent (React StrictMode / remount) và không rò biến ra global.

(function () {
  const root = document.getElementById('am2-root');
  if (!root) return;
  if (root.dataset.mounted === '1') return; // idempotent (StrictMode / remount)
  root.dataset.mounted = '1';

  // Tần số chuẩn 7 nốt quãng C4–B4 (Đô–Si). Mỗi nốt 1 phím tắt.
  const NOTES = [
    { n: 'Đô', c: '#ef4444', k: 'a', f: 261.63 },
    { n: 'Rê', c: '#f97316', k: 's', f: 293.66 },
    { n: 'Mi', c: '#eab308', k: 'd', f: 329.63 },
    { n: 'Fa', c: '#22c55e', k: 'f', f: 349.23 },
    { n: 'Sol', c: '#0ea5e9', k: 'g', f: 392.0 },
    { n: 'La', c: '#8b5cf6', k: 'h', f: 440.0 },
    { n: 'Si', c: '#db2777', k: 'j', f: 493.88 },
  ];

  // WebAudio — tạo lazy khi user bấm Start (browser yêu cầu gesture).
  let audioCtx = null;
  function ensureAudio() {
    if (audioCtx) return audioCtx;
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (!Ctx) return null;
    audioCtx = new Ctx();
    return audioCtx;
  }
  // Tạo 1 nốt piano-like: 2 oscillator (sine + triangle nhẹ) + envelope ADSR ngắn.
  function playNote(freq, dur = 0.4, vol = 0.18) {
    const ctx = ensureAudio();
    if (!ctx) return;
    const t0 = ctx.currentTime;
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0, t0);
    gain.gain.linearRampToValueAtTime(vol, t0 + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.001, t0 + dur);
    gain.connect(ctx.destination);

    const o1 = ctx.createOscillator();
    o1.type = 'sine';
    o1.frequency.value = freq;
    o1.connect(gain);
    const o2 = ctx.createOscillator();
    o2.type = 'triangle';
    o2.frequency.value = freq * 2; // overtone nhẹ
    const g2 = ctx.createGain();
    g2.gain.value = 0.25;
    o2.connect(g2).connect(gain);

    o1.start(t0);
    o2.start(t0);
    o1.stop(t0 + dur + 0.05);
    o2.stop(t0 + dur + 0.05);
  }
  // Âm "tịt" khi miss/lệch quá xa: tần số thấp, ngắn
  function playMiss() {
    const ctx = ensureAudio();
    if (!ctx) return;
    const t0 = ctx.currentTime;
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.001, t0);
    g.gain.linearRampToValueAtTime(0.08, t0 + 0.01);
    g.gain.exponentialRampToValueAtTime(0.001, t0 + 0.18);
    g.connect(ctx.destination);
    const o = ctx.createOscillator();
    o.type = 'sawtooth';
    o.frequency.value = 110;
    o.connect(g);
    o.start(t0);
    o.stop(t0 + 0.2);
  }
  const $ = (s) => root.querySelector(s);
  const stage = $('#stage'),
    keysEl = $('#keys'),
    center = $('#center');
  let activeNotes = [],
    score = 0,
    combo = 0,
    maxCombo = 0,
    timeLeft = 60,
    timer = null,
    raf = null,
    spawnT = null,
    running = false,
    lastTs = 0;

  // Build keys
  NOTES.forEach((nt, i) => {
    const k = document.createElement('div');
    k.className = 'key';
    k.dataset.i = i;
    k.innerHTML = `${nt.n}<small>${nt.k.toUpperCase()}</small>`;
    k.style.borderTop = `3px solid ${nt.c}`;
    k.addEventListener('mousedown', () => hit(i));
    k.addEventListener('touchstart', (e) => {
      e.preventDefault();
      hit(i);
    }, { passive: false });
    keysEl.appendChild(k);
  });

  document.addEventListener('keydown', (e) => {
    if (!running) return;
    const i = NOTES.findIndex((n) => n.k === e.key.toLowerCase());
    if (i >= 0) hit(i);
  });

  function spawn() {
    if (!running) return;
    const lane = Math.floor(Math.random() * NOTES.length);
    const nt = NOTES[lane];
    const el = document.createElement('div');
    el.className = 'note';
    el.textContent = nt.n;
    el.style.background = `linear-gradient(180deg, ${nt.c}cc, ${nt.c})`;
    el.style.left = lane * 14.28 + 1.4 + '%';
    el.style.top = '-50px';
    stage.appendChild(el);
    // Lớp 2 — chậm hơn nhiều: 0.10 → 0.16 (px/ms), tăng dần rất ít theo điểm.
    activeNotes.push({ el, lane, y: -50, vy: 0.1 + Math.min(0.06, score / 2400) });
    // Khoảng spawn 1.2–1.6s, giảm dần nhưng không dưới 800ms để bé kịp nhìn.
    const gap = Math.max(800, 1600 - score * 0.8);
    spawnT = setTimeout(spawn, gap);
  }

  function tick(ts) {
    if (!running) return;
    const dt = lastTs ? ts - lastTs : 16;
    lastTs = ts;
    const h = stage.clientHeight;
    const hitY = h - 64 - 3; // hitline
    for (let i = activeNotes.length - 1; i >= 0; i--) {
      const a = activeNotes[i];
      a.y += a.vy * dt;
      a.el.style.top = a.y + 'px';
      if (a.y > hitY + 38) {
        // miss
        a.el.remove();
        activeNotes.splice(i, 1);
        combo = 0;
        $('#combo').textContent = 0;
        flashKey(a.lane, 'bad');
        playMiss();
      }
    }
    raf = requestAnimationFrame(tick);
  }

  function hit(lane) {
    flashKey(lane, 'hit');
    const h = stage.clientHeight;
    const hitY = h - 64 - 3;
    // Tìm nốt gần vạch nhất trên cùng lane
    let best = -1,
      bestDist = 1e9;
    activeNotes.forEach((a, i) => {
      if (a.lane !== lane) return;
      const d = Math.abs(a.y + 21 - hitY);
      if (d < bestDist) {
        bestDist = d;
        best = i;
      }
    });
    if (best < 0 || bestDist > 60) {
      combo = 0;
      $('#combo').textContent = 0;
      playMiss();
      return;
    }
    const a = activeNotes[best];
    const perfect = bestDist < 20;
    const gained = perfect ? 30 : 15;
    // Phát đúng tần số nốt — chính xác hơn → vang dài hơn 1 chút
    playNote(NOTES[lane].f, perfect ? 0.55 : 0.35, perfect ? 0.22 : 0.16);
    score += gained + combo * 2;
    combo++;
    maxCombo = Math.max(maxCombo, combo);
    $('#score').textContent = score;
    $('#combo').textContent = combo;
    // FX
    const fx = document.createElement('div');
    fx.className = 'fx';
    fx.textContent = perfect ? '✨ PERFECT' : '👍 GOOD';
    fx.style.color = NOTES[lane].c;
    fx.style.left = lane * 14.28 + 2 + '%';
    fx.style.top = hitY - 30 + 'px';
    stage.appendChild(fx);
    setTimeout(() => fx.remove(), 800);
    a.el.remove();
    activeNotes.splice(best, 1);
  }

  function flashKey(i, cls) {
    const k = keysEl.children[i];
    k.classList.add(cls);
    setTimeout(() => k.classList.remove(cls), 140);
  }

  function start() {
    // Mở audio context trong user gesture, sau đó chơi 7 nốt intro để bé nghe
    // được scale Đô-Rê-Mi rồi mới bắt đầu spawn.
    ensureAudio();
    NOTES.forEach((nt, i) => setTimeout(() => playNote(nt.f, 0.28, 0.16), i * 140));

    score = 0;
    combo = 0;
    maxCombo = 0;
    timeLeft = 60;
    activeNotes = [];
    lastTs = 0;
    running = true;
    $('#score').textContent = 0;
    $('#combo').textContent = 0;
    $('#time').textContent = '60s';
    Array.from(stage.querySelectorAll('.note')).forEach((n) => n.remove());
    center.classList.add('hide');
    // Trì hoãn spawn 1.2s để intro melody chạy xong trước khi nốt rơi.
    setTimeout(() => {
      if (running) spawn();
    }, 1200);
    raf = requestAnimationFrame(tick);
    timer = setInterval(() => {
      timeLeft--;
      $('#time').textContent = timeLeft + 's';
      if (timeLeft <= 0) end();
    }, 1000);
  }

  function end() {
    running = false;
    clearInterval(timer);
    clearTimeout(spawnT);
    cancelAnimationFrame(raf);
    activeNotes.forEach((a) => a.el.remove());
    activeNotes = [];
    const key = 'lop2-am-nhac.best';
    const prev = Number(localStorage.getItem(key) || 0);
    const best = Math.max(prev, score);
    if (score > prev) localStorage.setItem(key, score);
    $('#ov-score').textContent = score;
    $('#ov-combo').textContent = maxCombo;
    $('#ov-best').textContent = best;
    $('#ov-title').textContent =
      score >= 800 ? '🏆 Hoà nhạc xuất sắc!' : score >= 400 ? '🌟 Bản nhạc hay!' : '🎶 Hết bản!';
    $('#ov-msg').textContent = maxCombo >= 15 ? 'Combo siêu đỉnh!' : 'Tập gõ nhịp thường xuyên nhé.';
    $('#modal-over').classList.remove('hide');
    try {
      const xp = Math.floor(score / 20);
      if (xp > 0 && window.fetch) {
        fetch('/api/wallet', { credentials: 'include' })
          .then((r) => (r.ok ? r.json() : null))
          .then((w) => {
            if (!w) return;
            fetch('/api/wallet', {
              method: 'PUT',
              credentials: 'include',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ ...w, xp: (w.xp || 0) + xp }),
            });
          });
      }
    } catch {}
  }

  $('#btn-start').addEventListener('click', start);
  $('#btn-restart').addEventListener('click', () => {
    $('#modal-over').classList.add('hide');
    center.classList.remove('hide');
    start();
  });
})();
