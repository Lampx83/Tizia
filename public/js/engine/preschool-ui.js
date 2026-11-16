// ============================================================
// Preschool UI — render quiz/checklist/trace dành riêng cho Mầm non.
// Triết lý: TAP TO TO, SOUND, CONFETTI. Không radio, không bullet, không chữ bé.
// Render được:
//   - renderQuizPreschool(engine, host): Big Bubble Cards 1 câu/màn + TTS + confetti.
//   - renderStickerBoard(host, items, onDone): kéo/tap sticker vào "Bảng Ngoan".
//   - renderTraceCanvas(host, glyph, onDone): tô chữ/số nét đứt.
// ============================================================

// Web Speech API TTS — đọc to câu hỏi/feedback cho bé chưa biết chữ.
// CHỌN GIỌNG THEO CHẤT LƯỢNG (không lấy "giọng vi đầu tiên" — thường là giọng
// compact robot): ưu tiên neural "Natural" (Edge HoaiMy/NamMinh) > "Google
// Tiếng Việt" (Chrome) > Enhanced/Premium (macOS) > thường; trừ điểm compact.
// Bản React tương ứng: web-next/lib/tts.ts — đổi thuật toán thì đổi CẢ HAI.
let _voice = null;
function rankViVoice(v) {
  const n = (v.name || '').toLowerCase();
  const lang = (v.lang || '').toLowerCase().replace('_', '-');
  if (!lang.startsWith('vi') && !/vietnamese/i.test(v.name || '')) return -1e9;
  let s = 0;
  if (/natural/.test(n)) s += 120;
  else if (/online/.test(n)) s += 30;
  if (/google/.test(n)) s += 80;
  if (/enhanced|premium/.test(n)) s += 40;
  if (/compact|espeak|eloquence/.test(n)) s -= 60;
  if (!v.localService) s += 10;
  if (lang === 'vi-vn') s += 15;
  return s;
}
function pickVietnameseVoice() {
  if (_voice || typeof speechSynthesis === 'undefined') return _voice;
  const all = speechSynthesis.getVoices();
  if (!all.length) return null; // chưa nạp — đừng cache null
  const best = all.map(v => [rankViVoice(v), v]).sort((a, b) => b[0] - a[0])[0];
  _voice = best && best[0] > -1e9 ? best[1] : null;
  return _voice;
}
if (typeof speechSynthesis !== 'undefined') {
  // Voice list nạp async ở Chrome — chờ event mới có giọng vi-VN.
  try { speechSynthesis.addEventListener('voiceschanged', () => { _voice = null; pickVietnameseVoice(); }); } catch {}
  pickVietnameseVoice();
}

// ── Server TTS (FPT.AI qua /api/tts, cache server) — probe 1 lần ──────────
// 204 = có key, dùng giọng neural server (mọi máy nghe như nhau);
// 503/lỗi/autoplay chặn → fallback Web Speech với giọng đã xếp hạng ở trên.
let _srvTts = null;
let _srvProbe = null;
function probeServerTts() {
  if (_srvTts !== null) return Promise.resolve(_srvTts);
  if (!_srvProbe) {
    _srvProbe = fetch('/api/tts?probe=1')
      .then(r => (_srvTts = r.status === 204))
      .catch(() => (_srvTts = false));
  }
  return _srvProbe;
}
let _sGen = 0;      // thế hệ phát âm — tăng khi cancel để huỷ audio đang chờ
let _curAudio = null;

function webSpeak(clean, opts) {
  if (typeof speechSynthesis === 'undefined') return;
  const u = new SpeechSynthesisUtterance(clean);
  u.lang = 'vi-VN';
  // rate 0.95/pitch 1.05: chậm nhẹ thân thiện với bé nhưng không ép pitch cao
  // (1.15 cũ làm giọng neural méo, nghe robot).
  u.rate = opts.rate ?? 0.95;
  u.pitch = opts.pitch ?? 1.05;
  const v = pickVietnameseVoice();
  if (v) u.voice = v;
  speechSynthesis.speak(u);
}

/** Đọc to text (không async, không chờ). Bỏ emoji; server neural trước, fallback Web Speech. */
export function speak(text, opts = {}) {
  try {
    const clean = String(text || '').replace(/[\u{1F000}-\u{1FFFF}]/gu, '').trim();
    if (!clean) return;
    if (opts.cancel !== false) {
      _sGen += 1;
      try { if (_curAudio) { _curAudio.pause(); _curAudio = null; } } catch {}
      try { speechSynthesis.cancel(); } catch {}
    }
    const myGen = _sGen;
    probeServerTts().then((ok) => {
      if (_sGen !== myGen) return; // đã bị cancel trong lúc probe
      if (!ok) { webSpeak(clean, opts); return; }
      const a = new Audio('/api/tts?text=' + encodeURIComponent(clean));
      _curAudio = a;
      a.onerror = () => { if (_sGen === myGen) webSpeak(clean, opts); };
      a.play().catch(() => { if (_sGen === myGen) webSpeak(clean, opts); });
    });
  } catch {}
}

// ── Confetti đơn giản, không cần lib ──────────────────────────
function confettiBurst(host) {
  const layer = document.createElement('div');
  layer.style.cssText = 'position:fixed;inset:0;pointer-events:none;z-index:9999;overflow:hidden;';
  const colors = ['#fbbf24','#ef4444','#10b981','#3b82f6','#a855f7','#ec4899'];
  for (let i = 0; i < 32; i++) {
    const p = document.createElement('div');
    const size = 8 + Math.random() * 10;
    const left = 30 + Math.random() * 40;
    const top = 30 + Math.random() * 30;
    const dx = (Math.random() - 0.5) * 400;
    const dy = 200 + Math.random() * 300;
    const rot = Math.random() * 720;
    p.style.cssText = `position:absolute;left:${left}%;top:${top}%;width:${size}px;height:${size}px;background:${colors[i%6]};border-radius:${Math.random()>0.5?'50%':'2px'};transform:translate(0,0) rotate(0);transition:transform 1.1s cubic-bezier(.2,.6,.4,1), opacity 1.1s;opacity:1;`;
    layer.appendChild(p);
    requestAnimationFrame(() => {
      p.style.transform = `translate(${dx}px,${dy}px) rotate(${rot}deg)`;
      p.style.opacity = '0';
    });
  }
  document.body.appendChild(layer);
  setTimeout(() => layer.remove(), 1300);
}

// ── Inject styles 1 lần ───────────────────────────────────────
let _psStyled = false;
function injectPreschoolStyles() {
  if (_psStyled || typeof document === 'undefined') return;
  _psStyled = true;
  const css = `
  /* Big Bubble Quiz — 1 câu/màn, đáp án to + cute */
  .psq-wrap { display:flex; flex-direction:column; gap:18px; align-items:stretch; padding:8px 0 24px; }
  .psq-progress { display:flex; gap:6px; justify-content:center; margin-bottom:4px; font-size:22px; }
  .psq-progress .dot { width:14px; height:14px; border-radius:50%; background:rgba(255,255,255,.18); }
  .psq-progress .dot.done { background:#fbbf24; box-shadow:0 0 0 3px rgba(251,191,36,.25); }
  .psq-progress .dot.cur  { background:#fff; transform:scale(1.25); }
  .psq-stem-wrap { display:flex; align-items:center; gap:14px; justify-content:center; flex-wrap:wrap;
    background:linear-gradient(135deg,rgba(255,255,255,.95),rgba(254,243,199,.95)); color:#1f1147;
    border-radius:28px; padding:22px 26px; box-shadow:0 12px 30px rgba(0,0,0,.25); margin: 4px 0; }
  .psq-stem { font-size: clamp(26px, 4.2vw, 40px); font-weight: 800; line-height:1.25; text-align:center; }
  /* Emoji trong câu hỏi nở to */
  .psq-stem .e { font-size: 1.6em; vertical-align: middle; }
  .psq-tts { width:54px; height:54px; border-radius:50%; border:none; cursor:pointer;
    background:#3b82f6; color:#fff; font-size:24px; box-shadow:0 6px 14px rgba(59,130,246,.4); transition:transform .15s; }
  .psq-tts:hover { transform: scale(1.08); }
  .psq-tts:active { transform: scale(.95); }

  .psq-choices { display:grid; gap:16px; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
    max-width: 720px; width:100%; margin: 4px auto 0; }
  @media (min-width: 720px) { .psq-choices { grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap:20px; } }

  .psq-bubble { position:relative; min-height: 140px; padding: 22px 16px; border-radius: 28px;
    border: 4px solid rgba(255,255,255,.5); cursor: pointer; user-select:none;
    display:flex; flex-direction:column; align-items:center; justify-content:center; gap:8px;
    font-family: inherit; font-size: clamp(22px, 3vw, 32px); font-weight: 800; color: #1f1147;
    box-shadow: 0 10px 0 rgba(0,0,0,.18), 0 18px 30px rgba(0,0,0,.22);
    transition: transform .15s, box-shadow .15s, filter .15s;
  }
  .psq-bubble:hover { transform: translateY(-3px); box-shadow: 0 13px 0 rgba(0,0,0,.18), 0 24px 36px rgba(0,0,0,.28); }
  .psq-bubble:active { transform: translateY(2px); box-shadow: 0 5px 0 rgba(0,0,0,.18), 0 10px 18px rgba(0,0,0,.22); }
  .psq-bubble.is-disabled { cursor: default; }
  .psq-bubble.is-correct { animation: psqPop .55s cubic-bezier(.2,.9,.3,1.6); border-color:#16a34a; filter:saturate(1.2); }
  .psq-bubble.is-wrong   { animation: psqWobble .5s ease; filter:grayscale(.6) brightness(.85); }
  @keyframes psqPop { 0%{transform:scale(1)} 40%{transform:scale(1.18)} 100%{transform:scale(1.05)} }
  @keyframes psqWobble { 0%,100%{transform:translateX(0)} 20%{transform:translateX(-12px)} 40%{transform:translateX(12px)} 60%{transform:translateX(-8px)} 80%{transform:translateX(8px)} }

  /* 6 sắc bong bóng — pastel rực rỡ */
  .psq-bubble.c0 { background: linear-gradient(135deg, #fde68a, #fbbf24); }
  .psq-bubble.c1 { background: linear-gradient(135deg, #fecaca, #f87171); }
  .psq-bubble.c2 { background: linear-gradient(135deg, #bbf7d0, #34d399); }
  .psq-bubble.c3 { background: linear-gradient(135deg, #bfdbfe, #60a5fa); }
  .psq-bubble.c4 { background: linear-gradient(135deg, #e9d5ff, #c084fc); }
  .psq-bubble.c5 { background: linear-gradient(135deg, #fbcfe8, #f472b6); }

  .psq-feedback { text-align:center; font-size: clamp(20px, 3vw, 28px); font-weight: 800;
    min-height: 1.2em; padding: 6px 14px; border-radius: 16px; }
  .psq-feedback.ok  { color:#16a34a; }
  .psq-feedback.bad { color:#dc2626; }
  .psq-next { display:block; margin: 6px auto 0; padding: 14px 36px; border:none; border-radius: 999px;
    font-family: inherit; font-size: clamp(18px, 2.4vw, 22px); font-weight: 800; cursor: pointer;
    background: linear-gradient(90deg,#fbbf24,#f59e0b); color:#1f1147;
    box-shadow: 0 8px 0 rgba(0,0,0,.18), 0 16px 24px rgba(245,158,11,.35);
    transition: transform .15s; }
  .psq-next:hover { transform: translateY(-2px); }
  .psq-next:active { transform: translateY(2px); }
  .psq-next.hide { display:none; }

  .psq-done { text-align:center; padding: 32px 16px; }
  .psq-done .big { font-size: 84px; line-height: 1; margin-bottom: 12px; animation: psqPop .6s cubic-bezier(.2,.9,.3,1.6); }
  .psq-done h2 { font-size: clamp(28px, 4vw, 40px); font-weight: 900; margin: 0 0 8px; color:#fbbf24; }
  .psq-done .stars { font-size: 48px; letter-spacing: 6px; margin: 6px 0 14px; }
  .psq-done p { font-size: clamp(16px, 2.2vw, 20px); opacity: .9; margin: 6px 0 18px; }

  /* Sticker Board — drag/tap stickers vào bảng */
  .psb-wrap { display:flex; flex-direction:column; gap:16px; padding: 8px 0; }
  .psb-board { min-height: 160px; border-radius: 20px; padding: 16px;
    background: linear-gradient(135deg, rgba(254,243,199,.95), rgba(253,224,71,.65));
    border: 4px dashed #f59e0b; display:flex; flex-wrap:wrap; gap:14px; align-content:flex-start;
    justify-content:center; align-items:center; }
  .psb-board::before { content: '⭐ Bảng Ngoan ⭐'; position: absolute; opacity: 0; }
  .psb-board.empty::after { content: 'Tap vào sticker bên dưới để dán lên đây nhé!';
    font-size: 18px; color:#92400e; font-weight: 700; padding: 8px 14px; }
  .psb-board:not(.empty)::after { display:none; }
  .psb-title { text-align:center; font-size: 22px; font-weight: 900; color: #fbbf24; }
  .psb-tray { display:grid; gap:14px; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); }
  .psb-card { border-radius: 22px; padding: 18px 12px 14px; cursor: pointer; user-select: none;
    border: 3px solid rgba(255,255,255,.55); color:#1f1147;
    display:flex; flex-direction:column; align-items:center; gap:8px;
    box-shadow: 0 8px 0 rgba(0,0,0,.16), 0 14px 24px rgba(0,0,0,.18);
    transition: transform .15s, opacity .25s;
    font-family: inherit; font-size: 18px; font-weight: 800; text-align:center; line-height:1.25; }
  .psb-card .emo { font-size: 52px; line-height: 1; }
  .psb-card:hover { transform: translateY(-3px); }
  .psb-card:active { transform: translateY(2px); }
  .psb-card.done { opacity: .35; pointer-events: none; }
  .psb-board .psb-sticker { border-radius: 16px; padding: 10px 14px;
    background: rgba(255,255,255,.92); color:#1f1147; font-weight: 800; font-size: 16px;
    display:flex; align-items:center; gap:8px; box-shadow: 0 4px 0 rgba(0,0,0,.12);
    animation: psqPop .5s cubic-bezier(.2,.9,.3,1.6); }
  .psb-board .psb-sticker .emo { font-size: 32px; line-height:1; }
  .psb-progress { text-align:center; font-size: 18px; font-weight: 800; color:#fbbf24; }

  /* Trace Canvas — tô chữ/số */
  .pst-wrap { display:flex; flex-direction:column; gap:14px; align-items:center; padding: 8px 0; }
  .pst-canvas { width: min(90vw, 460px); aspect-ratio: 1; border-radius: 24px;
    background: #fffbeb; border: 4px solid #fbbf24; touch-action: none; cursor: crosshair;
    box-shadow: 0 10px 30px rgba(0,0,0,.15); }
  .pst-toolbar { display:flex; gap:12px; flex-wrap:wrap; justify-content:center; }
  .pst-btn { padding: 12px 22px; border-radius: 999px; border: none; font-family: inherit;
    font-size: 18px; font-weight: 800; cursor: pointer; color: #1f1147;
    background: rgba(255,255,255,.9); box-shadow: 0 6px 0 rgba(0,0,0,.15); }
  .pst-btn.primary { background: linear-gradient(90deg,#fbbf24,#f59e0b); }
  .pst-btn:active { transform: translateY(2px); box-shadow: 0 2px 0 rgba(0,0,0,.15); }
  .pst-hint { text-align:center; font-size: 20px; font-weight: 800; color: #fbbf24; }
  `;
  const s = document.createElement('style'); s.textContent = css; document.head.appendChild(s);
}

// ============================================================
// renderQuizPreschool — Big Bubble Cards, 1 câu/màn.
// ============================================================
/** @param {import('./scenario-engine.js').ScenarioEngine} engine */
export function renderQuizPreschool(engine, host) {
  injectPreschoolStyles();
  const sc = engine.scenario;
  const qs = sc.questions || [];
  const wrap = document.createElement('div');
  wrap.className = 'psq-wrap';
  host.appendChild(wrap);

  const answers = new Array(qs.length).fill(-1);
  let cur = 0;
  let correctCount = 0;

  function emojiWrap(stem) {
    // Bọc emoji trong span.e để CSS phóng to.
    return String(stem || '').replace(
      /(\p{Extended_Pictographic}️?)+/gu,
      (m) => `<span class="e">${m}</span>`
    );
  }

  function renderProgress() {
    const dots = qs.map((_, i) => {
      const cls = i < cur ? 'done' : (i === cur ? 'cur' : '');
      return `<span class="dot ${cls}"></span>`;
    }).join('');
    return `<div class="psq-progress">${dots}</div>`;
  }

  function renderOne(i) {
    const q = qs[i];
    const stemHtml = emojiWrap(q.stem);
    wrap.innerHTML = `
      ${renderProgress()}
      <div class="psq-stem-wrap">
        <button class="psq-tts" type="button" title="Nghe lại câu hỏi" aria-label="Đọc câu hỏi">🔊</button>
        <div class="psq-stem">${stemHtml}</div>
      </div>
      <div class="psq-choices">
        ${q.choices.map((c, ci) => `
          <button class="psq-bubble c${ci % 6}" type="button" data-ci="${ci}">${emojiWrap(c)}</button>
        `).join('')}
      </div>
      <div class="psq-feedback" data-fb></div>
      <button class="psq-next hide" type="button">Câu tiếp →</button>
    `;
    // Đọc câu hỏi
    speak(q.stem);
    wrap.querySelector('.psq-tts').addEventListener('click', () => speak(q.stem));

    const fb = wrap.querySelector('[data-fb]');
    const nextBtn = wrap.querySelector('.psq-next');
    const bubbles = wrap.querySelectorAll('.psq-bubble');

    function lock() {
      bubbles.forEach(b => b.classList.add('is-disabled'));
    }

    bubbles.forEach(btn => {
      btn.addEventListener('click', () => {
        if (btn.classList.contains('is-disabled')) return;
        const ci = Number(btn.dataset.ci);
        const ok = ci === q.answer;
        answers[i] = ci;
        if (ok) {
          btn.classList.add('is-correct');
          lock();
          fb.className = 'psq-feedback ok';
          fb.textContent = '🎉 Đúng rồi! Giỏi quá!';
          confettiBurst(host);
          speak('Đúng rồi! Giỏi quá!');
          correctCount++;
          nextBtn.classList.remove('hide');
          nextBtn.textContent = (i + 1 < qs.length) ? 'Câu tiếp →' : 'Xem kết quả 🏆';
        } else {
          btn.classList.add('is-wrong');
          fb.className = 'psq-feedback bad';
          fb.textContent = '😅 Chưa đúng. Thử lại nha!';
          speak('Chưa đúng. Thử lại nha!');
          // Cho phép thử lại — không lock.
          setTimeout(() => btn.classList.remove('is-wrong'), 600);
        }
      });
    });

    nextBtn.addEventListener('click', () => {
      if (i + 1 < qs.length) {
        cur = i + 1;
        renderOne(cur);
        // Scroll lên đầu cho gọn (đỡ phải kéo lên với màn dài).
        wrap.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        renderDone();
      }
    });
  }

  function renderDone() {
    const stars = Math.max(1, Math.round((correctCount / qs.length) * 3));
    wrap.innerHTML = `
      <div class="psq-done">
        <div class="big">🏆</div>
        <h2>Bé học giỏi quá!</h2>
        <div class="stars">${'⭐'.repeat(stars)}${'☆'.repeat(3 - stars)}</div>
        <p>Đúng <b>${correctCount}/${qs.length}</b> câu. Cô khen bé nhé!</p>
        <button class="psq-next" type="button">Tiếp tục</button>
      </div>
    `;
    confettiBurst(host);
    speak(`Bé học giỏi quá! Đúng ${correctCount} trên ${qs.length} câu!`);
    wrap.querySelector('.psq-next').addEventListener('click', () => {
      engine.complete({ answers, questions: qs });
    });
  }

  renderOne(0);
}

// ============================================================
// renderInlineQuizPreschool — phiên bản đơn 1 câu cho space.html {mcq}.
// items: [{q, o, a, fb}] giống chuẩn space.html mcq.
// ============================================================
export function renderInlineQuizPreschool(host, items) {
  injectPreschoolStyles();
  const wrap = document.createElement('div');
  wrap.className = 'psq-wrap';
  host.appendChild(wrap);

  function emojiWrap(stem) {
    return String(stem || '').replace(/(\p{Extended_Pictographic}️?)+/gu, (m) => `<span class="e">${m}</span>`);
  }
  items.forEach((q, qi) => {
    const card = document.createElement('div');
    card.style.marginBottom = '22px';
    card.innerHTML = `
      <div class="psq-stem-wrap">
        <button class="psq-tts" type="button" title="Nghe lại" aria-label="Đọc câu hỏi">🔊</button>
        <div class="psq-stem">${emojiWrap(q.q)}</div>
      </div>
      <div class="psq-choices">
        ${q.o.map((c, ci) => `
          <button class="psq-bubble c${ci % 6}" type="button" data-ci="${ci}">${emojiWrap(c)}</button>
        `).join('')}
      </div>
      <div class="psq-feedback" data-fb></div>
    `;
    wrap.appendChild(card);
    card.querySelector('.psq-tts').addEventListener('click', () => speak(q.q));
    const fb = card.querySelector('[data-fb]');
    const bubbles = card.querySelectorAll('.psq-bubble');
    bubbles.forEach(btn => {
      btn.addEventListener('click', () => {
        if (btn.classList.contains('is-disabled')) return;
        const ci = Number(btn.dataset.ci);
        const ok = ci === q.a;
        if (ok) {
          btn.classList.add('is-correct');
          bubbles.forEach(b => b.classList.add('is-disabled'));
          fb.className = 'psq-feedback ok';
          fb.textContent = '🎉 Đúng rồi!' + (q.fb ? ' ' + q.fb : '');
          confettiBurst(host);
          speak('Đúng rồi! ' + (q.fb || ''));
        } else {
          btn.classList.add('is-wrong');
          fb.className = 'psq-feedback bad';
          fb.textContent = '😅 Thử lại nha!';
          speak('Chưa đúng. Thử lại nha!');
          setTimeout(() => btn.classList.remove('is-wrong'), 600);
        }
      });
    });
  });
}

// ============================================================
// renderStickerBoard — thay {check} mầm non.
// items: [{ label: 'Tự xếp dép vào đúng vị trí', emoji: '👟' }, ...]
// onDone: callback khi đủ N sticker.
// ============================================================
export function renderStickerBoard(host, items, onDone) {
  injectPreschoolStyles();

  // Auto-gán emoji nếu thiếu (best-effort theo keywords).
  // Thứ tự matter: cái cụ thể hơn để TRƯỚC. "khăn|chiếu|ngủ" trước "ăn" để câu
  // "gấp khăn, gấp chiếu ngủ" không khớp với "ăn" trong "khăn".
  const EMO_MAP = [
    [/dép|giày/i, '👟'], [/cúc|áo|kéo khoá|khoá/i, '👕'],
    [/khăn|chiếu|ngủ|gấp/i, '🛏️'],
    [/chén|bát|đĩa|khi ăn|cơm/i, '🍽️'],
    [/đồ chơi|hộp/i, '🧸'], [/sách|đọc/i, '📚'],
    [/răng|đánh răng/i, '🪥'], [/rửa tay|rửa/i, '🧼'], [/dọn|quét/i, '🧹'],
  ];
  const guessEmoji = (s) => (EMO_MAP.find(([re]) => re.test(s)) || [, '⭐'])[1];

  const list = (items || []).map(it => {
    if (typeof it === 'string') return { label: it, emoji: guessEmoji(it) };
    return { label: it.label, emoji: it.emoji || guessEmoji(it.label) };
  });
  const total = list.length;
  let done = 0;

  const wrap = document.createElement('div');
  wrap.className = 'psb-wrap';
  wrap.innerHTML = `
    <div class="psb-title">⭐ Bảng Ngoan của bé ⭐</div>
    <div class="psb-board empty" data-board style="position:relative;"></div>
    <div class="psb-progress"><span data-prog>0</span>/${total} sticker</div>
    <div class="psb-tray">
      ${list.map((it, i) => `
        <button class="psb-card c${i % 6}" type="button" data-i="${i}" style="background:var(--c${i%6})">
          <span class="emo">${it.emoji}</span>
          <span class="lbl">${it.label}</span>
        </button>`).join('')}
    </div>
  `;
  // Gán màu cho từng card (CSS variable không reachable từ tray, set inline).
  const palette = ['#fde68a','#fecaca','#bbf7d0','#bfdbfe','#e9d5ff','#fbcfe8'];
  wrap.querySelectorAll('.psb-card').forEach((c, i) => {
    c.style.background = `linear-gradient(135deg, ${palette[i % 6]}, #fff)`;
  });
  host.appendChild(wrap);

  const board = wrap.querySelector('[data-board]');
  const progEl = wrap.querySelector('[data-prog]');

  wrap.querySelectorAll('.psb-card').forEach(card => {
    card.addEventListener('click', () => {
      if (card.classList.contains('done')) return;
      const i = Number(card.dataset.i);
      const it = list[i];
      card.classList.add('done');
      // Sticker bay lên bảng
      const st = document.createElement('div');
      st.className = 'psb-sticker';
      st.innerHTML = `<span class="emo">${it.emoji}</span><span>${it.label}</span>`;
      board.appendChild(st);
      board.classList.remove('empty');
      done++;
      progEl.textContent = done;
      speak(`${it.label}. Bé giỏi quá!`);
      if (done === total) {
        confettiBurst(host);
        const ok = document.createElement('div');
        ok.style.cssText = 'text-align:center;font-size:22px;font-weight:900;color:#16a34a;margin-top:8px;';
        ok.textContent = '🎉 Bé tự lập rồi! Sẵn sàng vào lớp 1!';
        wrap.appendChild(ok);
        speak('Bé tự lập rồi! Sẵn sàng vào lớp một!');
        if (typeof onDone === 'function') setTimeout(() => onDone({ done, total }), 800);
      }
    });
  });
}

// ============================================================
// renderTraceCanvas — tô chữ/số nét đứt.
// glyph: 'A' | '0' | '3' | ... — chữ/số đơn lẻ.
// ============================================================
export function renderTraceCanvas(host, glyph, opts = {}) {
  injectPreschoolStyles();
  const wrap = document.createElement('div');
  wrap.className = 'pst-wrap';
  wrap.innerHTML = `
    <div class="pst-hint">✏️ Bé tô theo nét đứt: <b style="font-size:36px">${glyph || 'A'}</b></div>
    <canvas class="pst-canvas" width="460" height="460"></canvas>
    <div class="pst-toolbar">
      <button type="button" class="pst-btn" data-clear>🧹 Xoá để tô lại</button>
      <button type="button" class="pst-btn primary" data-done>✅ Bé tô xong rồi</button>
    </div>
  `;
  host.appendChild(wrap);

  const canvas = wrap.querySelector('canvas');
  const ctx = canvas.getContext('2d');

  function drawGlyph() {
    const W = canvas.width, H = canvas.height;
    ctx.clearRect(0, 0, W, H);
    // Glyph nét đứt to ở giữa canvas
    ctx.save();
    ctx.font = `900 ${Math.floor(H * 0.85)}px "Inter", system-ui, sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.strokeStyle = '#fbbf24';
    ctx.lineWidth = 6;
    ctx.setLineDash([14, 12]);
    ctx.strokeText(String(glyph || 'A'), W / 2, H / 2);
    // Bóng mờ bên trong cho dễ tô
    ctx.setLineDash([]);
    ctx.fillStyle = 'rgba(254, 243, 199, 0.6)';
    ctx.fillText(String(glyph || 'A'), W / 2, H / 2);
    ctx.restore();
  }
  drawGlyph();

  // Vẽ tô (free-draw) lên trên — gradient cầu vồng theo thời gian.
  let drawing = false, last = null, startTime = 0;
  function pos(ev) {
    const r = canvas.getBoundingClientRect();
    const t = ev.touches?.[0] || ev;
    return { x: (t.clientX - r.left) * canvas.width / r.width, y: (t.clientY - r.top) * canvas.height / r.height };
  }
  function start(ev) { drawing = true; last = pos(ev); if (!startTime) startTime = Date.now(); ev.preventDefault?.(); }
  function move(ev) {
    if (!drawing) return;
    const p = pos(ev);
    const hue = ((Date.now() - startTime) / 8) % 360;
    ctx.save();
    ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.lineWidth = 14;
    ctx.strokeStyle = `hsl(${hue} 85% 55%)`;
    ctx.beginPath(); ctx.moveTo(last.x, last.y); ctx.lineTo(p.x, p.y); ctx.stroke();
    ctx.restore();
    last = p; ev.preventDefault?.();
  }
  function end() { drawing = false; last = null; }
  canvas.addEventListener('pointerdown', start);
  canvas.addEventListener('pointermove', move);
  canvas.addEventListener('pointerup', end);
  canvas.addEventListener('pointercancel', end);
  canvas.addEventListener('pointerleave', end);

  wrap.querySelector('[data-clear]').addEventListener('click', () => { drawGlyph(); startTime = 0; });
  wrap.querySelector('[data-done]').addEventListener('click', () => {
    confettiBurst(host);
    speak('Bé tô đẹp quá!');
    const ok = document.createElement('div');
    ok.style.cssText = 'text-align:center;font-size:22px;font-weight:900;color:#16a34a;margin-top:8px;';
    ok.textContent = '🎉 Bé tô đẹp quá!';
    wrap.appendChild(ok);
    if (typeof opts.onDone === 'function') setTimeout(() => opts.onDone(), 800);
  });
}
