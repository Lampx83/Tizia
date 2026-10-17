// ============================================================
// Primary UI — Tier T2 cho Tiểu học (6-10 tuổi).
// Triết lý: ADVENTURE QUEST — vibe phiêu lưu, có pet bay theo,
// chặng đường, kho báu, sao thưởng. Giữa cute mầm non và lab THPT.
// Render được:
//   - renderQuestLine(host, items, onDone)
//   - renderTreasureHunt(host, items, onDone)
//   - renderQuizPrimaryInline(host, mcqArray)
//   - renderInteractiveTimeline(host, events)
// ============================================================

let _prStyled = false;
function injectPrimaryStyles() {
  if (_prStyled || typeof document === 'undefined') return;
  _prStyled = true;
  const css = `
  /* ── Quest Line ── */
  .qsl-wrap { display:flex; flex-direction:column; gap:14px; padding:8px 0; }
  .qsl-head { display:flex; align-items:center; gap:10px; padding:10px 14px;
    background: linear-gradient(135deg, rgba(251,191,36,.18), rgba(99,102,241,.12));
    border:1px solid rgba(251,191,36,.4); border-radius:14px; font-size:14px; }
  .qsl-head .badge { background:#fbbf24; color:#1f1147; padding:3px 10px; border-radius:999px; font-weight:800; font-size:12px; }
  .qsl-track {
    display:flex; flex-direction:column; gap:6px; padding:18px 14px;
    background: linear-gradient(180deg, rgba(99,102,241,.08), rgba(251,191,36,.08));
    border-radius:18px; position:relative;
  }
  .qsl-step { display:flex; align-items:center; gap:14px; padding:12px 14px;
    background: rgba(255,255,255,.06); border:2px solid rgba(255,255,255,.15);
    border-radius:14px; cursor:pointer; transition: all .18s;
    position:relative; z-index:1; }
  .qsl-step:hover { background: rgba(255,255,255,.12); transform: translateX(4px); border-color:#fbbf24; }
  .qsl-step.done {
    background: linear-gradient(135deg, rgba(34,197,94,.22), rgba(34,197,94,.08));
    border-color: #22c55e;
  }
  .qsl-step.locked { opacity:.45; cursor:not-allowed; }
  .qsl-step.locked:hover { transform:none; background: rgba(255,255,255,.06); border-color: rgba(255,255,255,.15); }
  .qsl-step .num {
    flex:none; width:42px; height:42px; border-radius:50%; background:#1e293b;
    display:flex; align-items:center; justify-content:center;
    font-size:22px; border:3px solid rgba(255,255,255,.18);
  }
  .qsl-step.done .num { background:#22c55e; color:#06281a; border-color:#16a34a;
    animation: qslPop .5s cubic-bezier(.2,.9,.3,1.6); }
  @keyframes qslPop { 0%{transform:scale(1)} 40%{transform:scale(1.3)} 100%{transform:scale(1.1)} }
  .qsl-step .label { font-size:15px; font-weight:700; flex:1; }
  .qsl-step .reward { font-size:13px; color:#fde047; font-weight:700; }
  .qsl-step.done .reward::after { content:' ⭐'; }
  /* Pet bay theo step done */
  .qsl-pet { position:absolute; left:-8px; font-size:30px; transition: top .55s cubic-bezier(.2,.9,.3,1.6);
    pointer-events:none; z-index:2; filter: drop-shadow(0 2px 4px rgba(0,0,0,.3)); }
  .qsl-done-banner { padding: 14px 18px;
    background: linear-gradient(135deg, rgba(251,191,36,.25), rgba(34,197,94,.18));
    border-radius:14px; border:1px solid #fbbf24; text-align:center;
    font-size:16px; font-weight:800; color:#fde047; display:none; }
  .qsl-done-banner.show { display:block; animation: qslPop .55s cubic-bezier(.2,.9,.3,1.6); }

  /* ── Treasure Hunt ── */
  .thx-wrap { display:flex; flex-direction:column; gap:12px; padding:8px 0; }
  .thx-hint { padding: 10px 14px; background: rgba(245,158,11,.12);
    border-left: 3px solid #f59e0b; border-radius:8px; font-size:14px; line-height:1.5; }
  .thx-map { position:relative; width:100%; aspect-ratio: 16/9;
    background:
      radial-gradient(ellipse 40% 40% at 30% 60%, rgba(34,197,94,.25) 0%, transparent 55%),
      radial-gradient(ellipse 50% 40% at 75% 30%, rgba(251,191,36,.2) 0%, transparent 55%),
      radial-gradient(ellipse 30% 50% at 20% 25%, rgba(59,130,246,.18) 0%, transparent 55%),
      linear-gradient(180deg, #134e4a, #1e3a8a);
    border-radius:18px; overflow:hidden; box-shadow: inset 0 0 24px rgba(0,0,0,.4);
    border: 2px solid rgba(251,191,36,.4); }
  .thx-chest { position:absolute; transform: translate(-50%,-50%);
    width: 64px; height: 64px; border-radius: 14px; cursor:pointer; border:none;
    background: rgba(15,23,42,.6); display:flex; align-items:center; justify-content:center;
    font-size: 38px; border: 2px dashed rgba(255,255,255,.4);
    transition: transform .15s, background .15s, border-color .18s; }
  .thx-chest:hover { transform: translate(-50%,-50%) scale(1.15); border-color:#fbbf24; }
  .thx-chest.found { animation: thxOpen .55s cubic-bezier(.2,.9,.3,1.6); border-color:#22c55e;
    background: rgba(34,197,94,.3); cursor:default; }
  @keyframes thxOpen { 40%{transform:translate(-50%,-50%) scale(1.4) rotate(15deg)} 100%{transform:translate(-50%,-50%) scale(1.1) rotate(0)} }
  .thx-chest .tip { position:absolute; bottom: -36px; left:50%; transform:translateX(-50%);
    white-space:nowrap; max-width: 220px; font-size:12px;
    background: #1f2937; color: #fef3c7; padding: 4px 10px; border-radius: 8px;
    opacity:0; transition: opacity .2s; pointer-events:none; }
  .thx-chest.found .tip { opacity:1; }
  .thx-found-list { display:flex; flex-wrap:wrap; gap:8px; min-height:32px; padding:6px 0; }
  .thx-found-list .item { background:rgba(34,197,94,.22); border:1px solid #22c55e;
    color:#bbf7d0; padding:4px 10px; border-radius:999px; font-size:13px; font-weight:700;
    animation: qslPop .4s cubic-bezier(.2,.9,.3,1.6); }
  .thx-progress { text-align:center; font-size:14px; font-weight:800; opacity:.9; }

  /* ── Quiz Primary inline (mcq style "adventure cute") ── */
  .pmq-wrap { display:flex; flex-direction:column; gap:18px; padding:8px 0; }
  .pmq-card { background: linear-gradient(135deg, rgba(255,255,255,.06), rgba(99,102,241,.08));
    border: 2px solid rgba(255,255,255,.12); border-radius:18px; padding: 16px 18px; }
  .pmq-stem { font-size: clamp(18px, 2.4vw, 22px); font-weight:800; line-height:1.45; margin-bottom: 14px; color: #f1f5f9; }
  .pmq-choices { display:grid; gap:10px; grid-template-columns: 1fr; }
  @media (min-width: 540px) { .pmq-choices { grid-template-columns: 1fr 1fr; } }
  .pmq-opt { background: rgba(255,255,255,.06); border: 2px solid rgba(255,255,255,.14);
    color:#fff; padding: 14px 18px; border-radius: 14px; cursor:pointer; user-select:none;
    font-family: inherit; font-size: clamp(15px, 2vw, 17px); font-weight:700; text-align:left;
    display:flex; align-items:center; gap:10px;
    transition: transform .12s, background .15s, border-color .15s; }
  .pmq-opt:hover { background: rgba(99,102,241,.18); border-color:#6366f1; transform: translateY(-2px); }
  .pmq-opt:disabled { cursor:default; }
  .pmq-opt .key { flex:none; width:30px; height:30px; border-radius:8px;
    background: rgba(255,255,255,.12); display:flex; align-items:center; justify-content:center;
    font-weight:900; font-size:14px; }
  .pmq-opt.is-correct { background: rgba(34,197,94,.22); border-color:#22c55e; animation: qslPop .5s cubic-bezier(.2,.9,.3,1.6); }
  .pmq-opt.is-correct .key { background:#22c55e; color:#06281a; }
  .pmq-opt.is-wrong { background: rgba(239,68,68,.2); border-color:#ef4444; animation: pmqWob .45s ease; }
  @keyframes pmqWob { 0%,100%{transform:translateX(0)} 25%{transform:translateX(-8px)} 75%{transform:translateX(8px)} }
  .pmq-fb { margin-top:10px; padding:10px 14px; border-radius:10px; font-size:14px; line-height:1.5; display:none; }
  .pmq-fb.show { display:block; animation: qslPop .35s cubic-bezier(.2,.9,.3,1.6); }
  .pmq-fb.ok { background: rgba(34,197,94,.16); border-left:3px solid #22c55e; color:#bbf7d0; }
  .pmq-fb.bad { background: rgba(239,68,68,.14); border-left:3px solid #ef4444; color:#fecaca; }

  /* ── Interactive Timeline (lịch sử lớp 5, history high school…) ── */
  .ptl-wrap { display:flex; flex-direction:column; gap:12px; padding:8px 0; }
  .ptl-track { position: relative; padding: 16px 12px 12px 36px; }
  .ptl-track::before { content:''; position:absolute; left:18px; top:8px; bottom:8px;
    width:3px; background: linear-gradient(180deg,#6366f1,#fbbf24); border-radius:3px; }
  .ptl-event { position: relative; margin-bottom: 14px; cursor:pointer; }
  .ptl-event:last-child { margin-bottom: 0; }
  .ptl-event::before { content:''; position:absolute; left:-23px; top:4px;
    width:18px; height:18px; border-radius:50%; background:#1e293b; border:3px solid #6366f1;
    transition: all .2s; }
  .ptl-event.opened::before { background:#fbbf24; border-color:#f59e0b;
    box-shadow: 0 0 0 6px rgba(251,191,36,.18); }
  .ptl-event .t { font-weight:800; font-size:14.5px; color:#fbbf24; }
  .ptl-event .d-short { font-size:13.5px; opacity:.85; margin-top:2px; }
  .ptl-event .d-long { display:none; margin-top:8px; padding:10px 14px;
    background: rgba(255,255,255,.05); border-left:3px solid #fbbf24; border-radius:8px;
    font-size:13.5px; line-height:1.55; }
  .ptl-event.opened .d-long { display:block; animation: qslPop .35s cubic-bezier(.2,.9,.3,1.6); }
  .ptl-hint { font-size:12.5px; opacity:.7; }

  /* ── Quiz Primary, Adventure Cute (1 câu/màn, big options, pet companion) ── */
  .pqz-wrap { display:flex; flex-direction:column; gap:18px; padding:8px 0 90px; position:relative; }
  .pqz-progress { display:flex; gap:6px; justify-content:center; flex-wrap:wrap; padding:6px 0; }
  .pqz-progress .star { font-size: 22px; line-height:1; opacity:.4; transition: opacity .2s, transform .25s; }
  .pqz-progress .star.cur { opacity:1; transform: scale(1.25); filter: drop-shadow(0 2px 4px rgba(251,191,36,.5)); }
  .pqz-progress .star.done { opacity:1; }
  .pqz-progress .star.wrong { opacity:1; filter: grayscale(.7); }

  .pqz-card {
    background: linear-gradient(135deg, rgba(255,255,255,.97), rgba(254,243,199,.92));
    border-radius: 28px; padding: 24px; box-shadow: 0 16px 40px rgba(0,0,0,.28);
    color:#1f1147; position:relative; }
  .pqz-num { display:inline-block; background:#fbbf24; color:#1f1147; padding:5px 14px;
    border-radius:999px; font-size:13px; font-weight:900; margin-bottom: 10px; }
  .pqz-stem { font-size: clamp(20px, 2.8vw, 26px); font-weight:800; line-height:1.4; margin-bottom: 18px; }
  .pqz-img { max-width:100%; border-radius:14px; margin: 6px 0 14px; }

  .pqz-choices { display:grid; gap:12px; grid-template-columns: 1fr; }
  @media (min-width: 600px) { .pqz-choices { grid-template-columns: 1fr 1fr; } }
  .pqz-opt {
    border: none; cursor: pointer; user-select:none;
    background: #fff; padding: 16px 18px; border-radius: 18px;
    font-family: inherit; font-size: clamp(16px, 2.1vw, 19px); font-weight:800; color:#1f1147;
    text-align:left; display:flex; align-items:center; gap:14px;
    box-shadow: 0 6px 0 rgba(0,0,0,.12), 0 12px 22px rgba(0,0,0,.14);
    transition: transform .15s, box-shadow .15s, background .15s;
  }
  .pqz-opt:hover:not(.is-disabled) { transform: translateY(-2px); box-shadow: 0 8px 0 rgba(0,0,0,.12), 0 16px 28px rgba(0,0,0,.2); }
  .pqz-opt:active:not(.is-disabled) { transform: translateY(2px); box-shadow: 0 2px 0 rgba(0,0,0,.12); }
  .pqz-opt.is-disabled { cursor:default; }
  .pqz-opt .key {
    flex:none; width:38px; height:38px; border-radius:12px;
    display:flex; align-items:center; justify-content:center;
    font-size:18px; font-weight:900; color:#fff; }
  .pqz-opt.c0 .key { background:#fbbf24; color:#1f1147; }
  .pqz-opt.c1 .key { background:#ef4444; }
  .pqz-opt.c2 .key { background:#22c55e; }
  .pqz-opt.c3 .key { background:#3b82f6; }
  .pqz-opt.c4 .key { background:#a855f7; }
  .pqz-opt.c5 .key { background:#ec4899; }
  .pqz-opt.is-correct {
    background: linear-gradient(135deg, #bbf7d0, #86efac);
    border: 3px solid #22c55e;
    animation: pqzPop .55s cubic-bezier(.2,.9,.3,1.6);
  }
  .pqz-opt.is-correct .key { background:#16a34a; color:#fff; }
  .pqz-opt.is-wrong {
    background: linear-gradient(135deg, #fecaca, #fca5a5);
    animation: pqzWob .45s ease;
  }
  .pqz-opt.is-wrong .key { background:#dc2626; }
  .pqz-opt.is-show-correct {
    background: linear-gradient(135deg, #fef3c7, #fde68a);
    border: 2px solid #fbbf24;
  }
  @keyframes pqzPop { 0%{transform:scale(1)} 40%{transform:scale(1.08)} 100%{transform:scale(1.02)} }
  @keyframes pqzWob { 0%,100%{transform:translateX(0)} 20%{transform:translateX(-12px)} 40%{transform:translateX(12px)} 60%{transform:translateX(-8px)} 80%{transform:translateX(8px)} }

  .pqz-fb { margin-top: 14px; padding: 12px 16px; border-radius: 14px;
    font-size: 15px; font-weight:700; line-height: 1.5;
    background: rgba(255,255,255,.7); animation: pqzPop .35s cubic-bezier(.2,.9,.3,1.6); }
  .pqz-fb.ok  { background: #d1fae5; color:#065f46; border-left: 4px solid #16a34a; }
  .pqz-fb.bad { background: #fee2e2; color:#7f1d1d; border-left: 4px solid #dc2626; }

  .pqz-pet { position:fixed; right: 20px; bottom: 90px; z-index: 40; font-size: 56px;
    line-height: 1; pointer-events:none; user-select:none; transition: transform .35s cubic-bezier(.2,.9,.3,1.6);
    filter: drop-shadow(0 4px 8px rgba(0,0,0,.3)); }
  .pqz-pet.happy { transform: translateY(-12px) rotate(-8deg) scale(1.15); }
  .pqz-pet.sad { transform: translateY(6px) scale(.92); filter: grayscale(.4) drop-shadow(0 4px 8px rgba(0,0,0,.3)); }
  .pqz-bubble { position:fixed; right: 80px; bottom: 110px; z-index: 40;
    background:#fff; color:#1f1147; padding: 8px 14px; border-radius: 18px;
    font-size: 14px; font-weight:800; box-shadow: 0 6px 14px rgba(0,0,0,.2);
    pointer-events:none; opacity:0; transform: translateY(10px); transition: opacity .2s, transform .2s; }
  .pqz-bubble.show { opacity:1; transform: translateY(0); }
  .pqz-bubble::after { content:''; position:absolute; right:-10px; bottom: 10px;
    border: 8px solid transparent; border-left-color: #fff; }

  .pqz-footer { position:sticky; bottom:0; left:0; right:0;
    background: linear-gradient(180deg, transparent, rgba(15,23,42,.95) 40%);
    backdrop-filter: blur(8px); padding: 14px 16px 18px;
    display:flex; justify-content:space-between; align-items:center; gap:12px;
    border-radius: 0 0 14px 14px; }
  .pqz-stats { font-size: 14px; font-weight:800; opacity:.9; }
  .pqz-next-btn { padding: 14px 28px; border:none; border-radius: 999px;
    background: linear-gradient(90deg,#fbbf24,#f59e0b); color:#1f1147;
    font-family: inherit; font-size: 17px; font-weight: 900; cursor:pointer;
    box-shadow: 0 6px 0 rgba(0,0,0,.18), 0 12px 22px rgba(245,158,11,.4);
    transition: transform .15s; }
  .pqz-next-btn:hover { transform: translateY(-2px); }
  .pqz-next-btn:active { transform: translateY(2px); box-shadow: 0 2px 0 rgba(0,0,0,.18); }
  .pqz-next-btn:disabled { opacity:.5; cursor:not-allowed; }

  .pqz-done { text-align:center; padding: 32px 18px; background: linear-gradient(135deg,#fef3c7,#fed7aa);
    border-radius: 28px; color: #1f1147; box-shadow: 0 16px 40px rgba(0,0,0,.28); }
  .pqz-done .big { font-size: 84px; line-height:1; margin-bottom:8px; animation: pqzPop .6s cubic-bezier(.2,.9,.3,1.6); }
  .pqz-done h2 { font-size: clamp(26px, 3.6vw, 32px); margin: 6px 0 8px; font-weight: 900; color: #b45309; }
  .pqz-done .score { font-size: 56px; font-weight: 900; color:#16a34a; line-height:1; }
  .pqz-done .stars-row { font-size: 40px; letter-spacing: 6px; margin: 8px 0 12px; }
  `;
  const s = document.createElement('style'); s.textContent = css; document.head.appendChild(s);
}

// ============================================================
// renderQuestLine — chặng đường có pet bay theo.
// items: ['Lập kế hoạch', 'Làm bài tập', ...]  (mỗi item 1 chặng)
// Có thể truyền opts.pet = '🦊' để đổi pet, opts.reward = '+5 sao'.
// ============================================================
export function renderQuestLine(host, items, onDone, opts = {}) {
  injectPrimaryStyles();
  const pet = opts.pet || '🦊';
  const reward = opts.reward || '+1 ⭐';
  const total = items.length;
  let done = 0;

  const wrap = document.createElement('div');
  wrap.className = 'qsl-wrap';
  wrap.innerHTML = `
    <div class="qsl-head">
      <span class="badge">🗺️ Quest</span>
      <span>Hoàn thành từng chặng theo thứ tự, bạn đồng hành ${pet} sẽ chạy theo!</span>
    </div>
    <div class="qsl-track" data-track>
      <div class="qsl-pet" data-pet>${pet}</div>
      ${items.map((it, i) => `
        <div class="qsl-step ${i === 0 ? '' : 'locked'}" data-i="${i}">
          <div class="num">${i + 1}</div>
          <div class="label">${String(it).replace(/</g,'&lt;')}</div>
          <div class="reward">${reward}</div>
        </div>`).join('')}
    </div>
    <div class="qsl-done-banner" data-banner>🏆 Hoàn thành cả chặng đường! ${pet} cảm ơn bạn!</div>
  `;
  host.appendChild(wrap);

  const steps = [...wrap.querySelectorAll('.qsl-step')];
  const pe = wrap.querySelector('[data-pet]');
  const banner = wrap.querySelector('[data-banner]');

  function movePet(i) {
    const s = steps[i];
    if (!s || !pe) return;
    // Đặt pet ngay bên cạnh step active.
    const trackRect = wrap.querySelector('[data-track]').getBoundingClientRect();
    const stepRect = s.getBoundingClientRect();
    pe.style.top = (stepRect.top - trackRect.top + stepRect.height / 2 - 18) + 'px';
  }
  // Initial position
  requestAnimationFrame(() => movePet(0));

  steps.forEach(step => {
    step.addEventListener('click', () => {
      if (step.classList.contains('done') || step.classList.contains('locked')) return;
      step.classList.add('done');
      done++;
      const idx = Number(step.dataset.i);
      // Mở khoá step tiếp theo
      const nextStep = steps[idx + 1];
      if (nextStep) {
        nextStep.classList.remove('locked');
        requestAnimationFrame(() => movePet(idx + 1));
      } else {
        // Hoàn thành toàn bộ
        banner.classList.add('show');
        if (typeof onDone === 'function') setTimeout(() => onDone({ done, total }), 600);
      }
    });
  });
}

// ============================================================
// renderTreasureHunt — kho báu giấu trong map.
// items: ['Số 7', 'Hình tam giác', ...] hoặc [{label, x, y, emoji}]
// ============================================================
export function renderTreasureHunt(host, items, onDone) {
  injectPrimaryStyles();
  const GUESS_EMOJI = (s) => {
    if (/sách|đọc|chữ|vần/i.test(s)) return '📚';
    if (/số|đếm|toán|cộng|trừ/i.test(s)) return '🔢';
    if (/hình|vẽ|màu/i.test(s)) return '🎨';
    if (/cây|hoa|lá|thực vật/i.test(s)) return '🌳';
    if (/con vật|chim|cá|thú/i.test(s)) return '🐾';
    if (/sao|trời|mặt trời/i.test(s)) return '⭐';
    return '💎';
  };
  const norm = items.map((it, i) => {
    if (typeof it === 'string') return { label: it, emoji: GUESS_EMOJI(it),
      x: 14 + (i % 4) * 24, y: 22 + Math.floor(i / 4) * 32 };
    return { label: it.label, emoji: it.emoji || GUESS_EMOJI(it.label||''),
      x: it.x ?? (14 + (i % 4) * 24), y: it.y ?? (22 + Math.floor(i / 4) * 32) };
  });
  const total = norm.length;
  let found = 0;

  const wrap = document.createElement('div');
  wrap.className = 'thx-wrap';
  wrap.innerHTML = `
    <div class="thx-hint">🗺️ <b>Săn kho báu:</b> Bấm vào ${total} chiếc rương 💎 trên bản đồ để mở. Mỗi rương ẩn một bí mật!</div>
    <div class="thx-map" data-map>
      ${norm.map((it, i) => `
        <button type="button" class="thx-chest" data-i="${i}" style="left:${it.x}%; top:${it.y}%;">
          📦
          <span class="tip">${it.label.replace(/</g,'&lt;')}</span>
        </button>`).join('')}
    </div>
    <div class="thx-progress">Đã mở <b data-found>0</b>/${total} rương</div>
    <div class="thx-found-list" data-list></div>
  `;
  host.appendChild(wrap);

  const list = wrap.querySelector('[data-list]');
  const foundEl = wrap.querySelector('[data-found]');

  wrap.querySelectorAll('.thx-chest').forEach(btn => {
    btn.addEventListener('click', () => {
      if (btn.classList.contains('found')) return;
      const i = Number(btn.dataset.i);
      btn.classList.add('found');
      btn.firstChild.textContent = norm[i].emoji;
      found++;
      foundEl.textContent = found;
      const tag = document.createElement('span');
      tag.className = 'item';
      tag.textContent = `${norm[i].emoji} ${norm[i].label}`;
      list.appendChild(tag);
      if (found === total) {
        if (typeof onDone === 'function') setTimeout(() => onDone({ found, total }), 600);
      }
    });
  });
}

// ============================================================
// renderQuizPrimaryInline — render MCQ array kiểu "adventure cute".
// Không TTS (HS đã đọc được), font không quá to. Có pet companion ở góc.
// ============================================================
export function renderQuizPrimaryInline(host, items) {
  injectPrimaryStyles();
  const wrap = document.createElement('div');
  wrap.className = 'pmq-wrap';
  host.appendChild(wrap);

  items.forEach((q, qi) => {
    const card = document.createElement('div');
    card.className = 'pmq-card';
    card.innerHTML = `
      <div class="pmq-stem">Câu ${qi + 1}. ${String(q.q || '').replace(/</g,'&lt;')}</div>
      <div class="pmq-choices">
        ${q.o.map((c, ci) => `
          <button type="button" class="pmq-opt" data-ci="${ci}">
            <span class="key">${String.fromCharCode(65 + ci)}</span>
            <span>${String(c).replace(/</g,'&lt;')}</span>
          </button>`).join('')}
      </div>
      <div class="pmq-fb" data-fb></div>
    `;
    wrap.appendChild(card);

    const opts = card.querySelectorAll('.pmq-opt');
    const fb = card.querySelector('[data-fb]');
    opts.forEach(btn => {
      btn.addEventListener('click', () => {
        if (btn.disabled) return;
        const ci = Number(btn.dataset.ci);
        const ok = ci === q.a;
        if (ok) {
          btn.classList.add('is-correct');
          opts.forEach(o => o.disabled = true);
          fb.className = 'pmq-fb ok show';
          fb.innerHTML = `<b>✓ Chính xác!</b> ${q.fb ? ' ' + q.fb : '+10 ⭐'}`;
        } else {
          btn.classList.add('is-wrong');
          fb.className = 'pmq-fb bad show';
          fb.innerHTML = `<b>✗ Chưa đúng.</b> ${q.fb ? ' ' + q.fb : 'Em thử lại nha!'}`;
          setTimeout(() => btn.classList.remove('is-wrong'), 500);
        }
      });
    });
  });
}

// ============================================================
// renderInteractiveTimeline — timeline lịch sử click expand.
// events: [{t: '1945', d: 'Cách mạng Tháng 8', detail: '...long text...'}]
// ============================================================
export function renderInteractiveTimeline(host, events) {
  injectPrimaryStyles();
  const wrap = document.createElement('div');
  wrap.className = 'ptl-wrap';
  wrap.innerHTML = `
    <div class="ptl-hint">👆 Bấm vào mỗi mốc để xem chi tiết.</div>
    <div class="ptl-track">
      ${events.map((e, i) => `
        <div class="ptl-event" data-i="${i}">
          <div class="t">${String(e.t || '').replace(/</g,'&lt;')}</div>
          <div class="d-short">${String(e.d || '').replace(/</g,'&lt;')}</div>
          ${e.detail ? `<div class="d-long">${String(e.detail).replace(/</g,'&lt;')}</div>` : ''}
        </div>`).join('')}
    </div>
  `;
  host.appendChild(wrap);
  wrap.querySelectorAll('.ptl-event').forEach(ev => {
    ev.addEventListener('click', () => ev.classList.toggle('opened'));
  });
}

// ============================================================
// renderQuizPrimary — Quiz cho Tiểu học. Adventure Cute vibe.
// 1 câu/màn, options A/B/C/D card to + màu, pet 🦊 cổ vũ, progress sao.
// Dùng từ scenario-engine.js qua dispatcher.
// ============================================================
/** @param {import('./scenario-engine.js').ScenarioEngine} engine */
export function renderQuizPrimary(engine, host) {
  injectPrimaryStyles();
  const PETS = ['🦊', '🐻', '🐰', '🐼', '🐯', '🐨'];
  const pet = PETS[Math.floor(Math.random() * PETS.length)];

  const sc = engine.scenario;
  const qs = sc.questions || [];
  const total = qs.length;
  const answers = new Array(total).fill(-1);
  const correctness = new Array(total).fill(null); // null | true | false
  let cur = 0;

  const wrap = document.createElement('div');
  wrap.className = 'pqz-wrap';
  host.appendChild(wrap);

  // Pet companion + speech bubble
  const petEl = document.createElement('div');
  petEl.className = 'pqz-pet';
  petEl.textContent = pet;
  document.body.appendChild(petEl);
  const bubble = document.createElement('div');
  bubble.className = 'pqz-bubble';
  document.body.appendChild(bubble);

  function showBubble(text, kind, ms = 1400) {
    bubble.textContent = text;
    bubble.classList.add('show');
    petEl.classList.remove('happy', 'sad');
    if (kind === 'happy') petEl.classList.add('happy');
    else if (kind === 'sad') petEl.classList.add('sad');
    clearTimeout(bubble._t);
    bubble._t = setTimeout(() => {
      bubble.classList.remove('show');
      petEl.classList.remove('happy', 'sad');
    }, ms);
  }

  function progressHtml() {
    return `<div class="pqz-progress">${qs.map((_, i) => {
      let cls = '';
      if (i === cur) cls = 'cur';
      else if (correctness[i] === true) cls = 'done';
      else if (correctness[i] === false) cls = 'wrong';
      const sym = correctness[i] === true ? '⭐'
                : correctness[i] === false ? '✖️'
                : (i === cur ? '⭐' : '☆');
      return `<span class="star ${cls}">${sym}</span>`;
    }).join('')}</div>`;
  }

  function renderCard() {
    const q = qs[cur];
    const locked = correctness[cur] !== null;
    wrap.innerHTML = `
      ${progressHtml()}
      <div class="pqz-card">
        <span class="pqz-num">Câu ${cur + 1}/${total}</span>
        <div class="pqz-stem">${String(q.stem || '').replace(/</g,'&lt;')}</div>
        ${q.image ? `<img src="${q.image}" class="pqz-img" alt=""/>` : ''}
        <div class="pqz-choices">
          ${q.choices.map((c, ci) => `
            <button type="button" class="pqz-opt c${ci % 6}${locked ? ' is-disabled' : ''}" data-ci="${ci}">
              <span class="key">${String.fromCharCode(65 + ci)}</span>
              <span>${String(c).replace(/</g,'&lt;')}</span>
            </button>`).join('')}
        </div>
        <div class="pqz-fb" data-fb style="display:none;"></div>
      </div>
      <div class="pqz-footer">
        <div class="pqz-stats">Câu ${cur + 1} / ${total} · Đúng: <b>${correctness.filter(c => c === true).length}</b></div>
        <button type="button" class="pqz-next-btn" data-next>${
          (cur === total - 1) ? (locked ? 'Xem kết quả 🏆' : 'Câu cuối nhé!') : 'Câu tiếp →'
        }</button>
      </div>
    `;

    const opts = wrap.querySelectorAll('.pqz-opt');
    const fb = wrap.querySelector('[data-fb]');
    const nextBtn = wrap.querySelector('[data-next]');
    nextBtn.disabled = !locked;

    // Nếu đã locked (quay lại câu cũ), hiện feedback luôn.
    if (locked) {
      opts.forEach(o => {
        const ci = Number(o.dataset.ci);
        if (ci === q.answer) o.classList.add('is-correct');
        else if (ci === answers[cur]) o.classList.add('is-wrong');
      });
      const ok = correctness[cur];
      fb.style.display = 'block';
      fb.className = 'pqz-fb ' + (ok ? 'ok' : 'bad');
      fb.innerHTML = ok
        ? `<b>🎉 Đúng rồi!</b> ${q.explanation ? ' ' + String(q.explanation).replace(/</g,'&lt;') : '+10 ⭐'}`
        : `<b>😅 Chưa đúng.</b> Đáp án đúng: <b>${String(q.choices[q.answer] || '').replace(/</g,'&lt;')}</b>${q.explanation ? '. ' +  String(q.explanation).replace(/</g,'&lt;') : ''}`;
    }

    opts.forEach(btn => {
      btn.addEventListener('click', () => {
        if (btn.classList.contains('is-disabled')) return;
        const ci = Number(btn.dataset.ci);
        const ok = ci === q.answer;
        answers[cur] = ci;
        correctness[cur] = ok;
        opts.forEach(o => {
          o.classList.add('is-disabled');
          const oci = Number(o.dataset.ci);
          if (oci === q.answer) o.classList.add('is-correct');
          if (oci === ci && !ok) o.classList.add('is-wrong');
        });
        fb.style.display = 'block';
        fb.className = 'pqz-fb ' + (ok ? 'ok' : 'bad');
        fb.innerHTML = ok
          ? `<b>🎉 Chính xác!</b>${q.explanation ? ' ' + String(q.explanation).replace(/</g,'&lt;') : ' +10 ⭐'}`
          : `<b>😅 Chưa đúng.</b> Đáp án đúng: <b>${String(q.choices[q.answer] || '').replace(/</g,'&lt;')}</b>${q.explanation ? '. ' +  String(q.explanation).replace(/</g,'&lt;') : ''}`;
        if (ok) showBubble('Tuyệt vời!', 'happy');
        else showBubble('Cố lên!', 'sad');
        nextBtn.disabled = false;
        if (cur === total - 1) nextBtn.textContent = 'Xem kết quả 🏆';
        // Update progress stars
        wrap.querySelector('.pqz-progress').outerHTML = progressHtml();
      });
    });

    nextBtn.addEventListener('click', () => {
      if (nextBtn.disabled) return;
      if (cur < total - 1) {
        cur++;
        renderCard();
        wrap.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        renderDone();
      }
    });
  }

  function renderDone() {
    const correctCount = correctness.filter(c => c === true).length;
    const pct = total ? Math.round(correctCount / total * 100) : 0;
    const stars = Math.max(1, Math.round((correctCount / total) * 3));
    petEl.remove(); bubble.remove();
    wrap.innerHTML = `
      <div class="pqz-done">
        <div class="big">${correctCount === total ? '🏆' : (correctCount >= total * 0.7 ? '🎉' : '💪')}</div>
        <h2>${correctCount === total ? 'Hoàn hảo!' : (correctCount >= total * 0.7 ? 'Giỏi lắm!' : 'Cố lên nha!')}</h2>
        <div class="score">${correctCount}/${total}</div>
        <div class="stars-row">${'⭐'.repeat(stars)}${'☆'.repeat(3 - stars)}</div>
        <p style="opacity:.85;margin:6px 0 16px;font-size:16px;font-weight:700;">Em đạt ${pct}%, pet ${pet} tự hào về em!</p>
        <button type="button" class="pqz-next-btn" data-final>Tiếp tục</button>
      </div>
    `;
    wrap.querySelector('[data-final]').addEventListener('click', () => {
      engine.complete({ answers, questions: qs });
    });
  }

  // Cleanup pet khi user rời trang
  const cleanup = () => { petEl.remove(); bubble.remove(); };
  window.addEventListener('beforeunload', cleanup, { once: true });

  renderCard();
}

