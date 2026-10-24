// Engagement HUD — Streak · Hearts · Daily Quests (Trục A — Duolingo/Prodigy)
// Auto-mount floating top-right. Tự ẩn cho guest (401). Mọi trang chỉ cần
// import module này 1 lần (auth-header.js đã import sẵn).

const API = {
  state:  '/api/engagement/state',
  ping:   '/api/engagement/ping',
  claim:  '/api/engagement/claim',
  league: '/api/league/me',
};

const TIER_ICO = { bronze:'🥉', silver:'🥈', gold:'🥇', sapphire:'💎', ruby:'🔴', diamond:'💠' };

const KIND_ICO = {
  lesson:   '📘',
  quiz:     '❓',
  minigame: '🎮',
  code:     '💻',
};

// Đích điều hướng khi học sinh bấm "Đi học" trên 1 nhiệm vụ chưa xong.
// Trả về URL phù hợp theo kind — fallback về Không gian học (/space.html).
function questGoHref(kind) {
  switch (kind) {
    case 'lesson':   return '/space.html';
    case 'quiz':     return '/space.html';
    case 'minigame': return '/space.html#mini-games';
    case 'code':     return '/lap-trinh-game.html';
    default:         return '/space.html';
  }
}
const KIND_GO_LABEL = {
  lesson:   '📖 Học bài',
  quiz:     '✏️ Làm bài',
  minigame: '🎮 Chơi ngay',
  code:     '💻 Code',
};

const CSS = `
  .tz-eng-hud {
    position: fixed; top: 64px; right: 16px; z-index: 95;
    display: flex; align-items: center; gap: 10px;
    background: rgba(15,23,42,0.88);
    backdrop-filter: blur(14px);
    border: 1px solid rgba(255,255,255,0.14);
    border-radius: 999px;
    padding: 6px 12px 6px 8px;
    color: #fff;
    font: 600 13px 'Inter', system-ui, sans-serif;
    box-shadow: 0 8px 24px rgba(0,0,0,0.35);
    cursor: pointer;
    transition: transform 0.12s, border-color 0.15s, background 0.15s;
  }
  .tz-eng-hud:hover {
    transform: translateY(-1px);
    border-color: rgba(251,191,36,0.6);
    background: rgba(15,23,42,0.95);
  }
  .tz-eng-hud[hidden] { display: none !important; }
  /* Inline trong header (auth-header có #ev-eng-slot) — bỏ position fixed,
     bỏ shadow, giảm padding, cao vừa header. */
  #ev-eng-slot .tz-eng-hud {
    position: static; top: auto; right: auto;
    padding: 4px 10px 4px 6px;
    background: rgba(255,255,255,0.05);
    border-color: rgba(255,255,255,0.12);
    box-shadow: none;
    gap: 8px;
    font-size: 12px;
  }
  #ev-eng-slot .tz-eng-hud:hover {
    transform: none;
    background: rgba(255,255,255,0.1);
  }
  #ev-eng-slot .tz-eng-hud .tz-eng-streak .flame { font-size: 15px; }
  #ev-eng-slot .tz-eng-hud .tz-eng-streak .num { font-size: 13px; }
  #ev-eng-slot .tz-eng-hud .tz-eng-hearts { font-size: 12px; }
  #ev-eng-slot .tz-eng-hud .tz-eng-league { font-size: 11px; padding: 1px 5px; }
  .tz-eng-league {
    display: inline-flex; align-items: center; gap: 4px;
    text-decoration: none; color: inherit;
    padding: 2px 6px; border-radius: 10px;
    background: rgba(251,191,36,0.12);
    border: 1px solid rgba(251,191,36,0.3);
    font-weight: 700; font-size: 12px;
    transition: background 0.15s;
  }
  .tz-eng-league:hover { background: rgba(251,191,36,0.25); }
  .tz-eng-league .ico { font-size: 13px; line-height: 1; }
  .tz-eng-league .tier { color: #fde68a; }
  .tz-eng-streak {
    display: inline-flex; align-items: center; gap: 4px;
    color: #fbbf24;
  }
  .tz-eng-streak .flame { font-size: 18px; line-height: 1; filter: drop-shadow(0 0 6px rgba(251,146,60,0.6)); }
  .tz-eng-streak .num { font-weight: 800; font-size: 14px; color: #fde68a; }
  .tz-eng-sep { width: 1px; height: 18px; background: rgba(255,255,255,0.16); margin: 0 2px; }
  .tz-eng-hearts {
    display: inline-flex; align-items: center; gap: 3px;
    font-size: 14px;
  }
  .tz-eng-hearts .h { line-height: 1; opacity: 0.3; filter: grayscale(0.7); transition: opacity 0.2s, filter 0.2s; }
  .tz-eng-hearts .h.on { opacity: 1; filter: drop-shadow(0 0 4px rgba(239,68,68,0.6)); }
  .tz-eng-quests {
    display: inline-flex; align-items: center; gap: 4px;
    padding: 2px 8px; border-radius: 999px;
    background: rgba(34,197,94,0.18);
    color: #86efac; font-weight: 700; font-size: 11px;
  }
  .tz-eng-quests .badge {
    display: inline-block; min-width: 14px; padding: 0 4px;
    background: #22c55e; color: #052e16; border-radius: 999px;
    font-size: 10px; line-height: 14px; text-align: center; font-weight: 800;
  }

  /* Refill countdown khi hết heart */
  .tz-eng-refill {
    font-size: 11px; opacity: 0.7; color: #fda4af;
    font-variant-numeric: tabular-nums;
  }

  /* ── Drawer / Modal chi tiết ── */
  .tz-eng-drawer-bg {
    position: fixed; inset: 0; z-index: 200;
    background: rgba(2,6,23,0.65);
    backdrop-filter: blur(6px);
    display: flex; align-items: flex-start; justify-content: center;
    padding: 72px 16px 16px;
    opacity: 0; pointer-events: none; transition: opacity 0.18s;
  }
  .tz-eng-drawer-bg.open { opacity: 1; pointer-events: auto; }
  .tz-eng-drawer {
    width: min(420px, 100%);
    background: linear-gradient(180deg, #1e293b 0%, #0f172a 100%);
    border: 1px solid rgba(255,255,255,0.12);
    border-radius: 18px;
    color: #fff; font-family: 'Inter', system-ui, sans-serif;
    padding: 18px 18px 16px;
    box-shadow: 0 20px 60px rgba(0,0,0,0.5);
    transform: translateY(-8px); transition: transform 0.18s;
  }
  .tz-eng-drawer-bg.open .tz-eng-drawer { transform: translateY(0); }
  .tz-eng-drawer h3 {
    margin: 0 0 4px; font-size: 16px; font-weight: 800;
    background: linear-gradient(135deg, #fbbf24, #f97316);
    -webkit-background-clip: text; background-clip: text; color: transparent;
  }
  .tz-eng-drawer .meta {
    display: flex; gap: 14px; margin: 6px 0 14px;
    font-size: 12px; color: #cbd5e1;
  }
  .tz-eng-drawer .meta b { color: #fde68a; }
  .tz-eng-q {
    display: flex; align-items: center; gap: 10px;
    padding: 10px; margin-bottom: 8px;
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 12px;
  }
  .tz-eng-q.done {
    border-color: rgba(34,197,94,0.45);
    background: rgba(34,197,94,0.08);
  }
  .tz-eng-q.claimed { opacity: 0.55; }
  .tz-eng-q .ico { font-size: 22px; }
  .tz-eng-q .body { flex: 1; min-width: 0; }
  .tz-eng-q .label { font-weight: 600; font-size: 13px; line-height: 1.35; }
  .tz-eng-q .bar {
    height: 5px; margin-top: 5px; background: rgba(255,255,255,0.08);
    border-radius: 999px; overflow: hidden;
  }
  .tz-eng-q .bar .fill {
    height: 100%; background: linear-gradient(90deg, #22c55e, #4ade80);
    transition: width 0.3s;
  }
  .tz-eng-q .prog { font-size: 11px; opacity: 0.7; margin-top: 2px; }
  .tz-eng-q .reward {
    font-size: 11px; color: #fde68a; font-weight: 700; white-space: nowrap;
  }
  .tz-eng-q-btn {
    display: inline-block;
    padding: 6px 12px; border-radius: 8px;
    background: linear-gradient(135deg, #f59e0b, #f97316);
    color: #1e293b; border: none; cursor: pointer;
    font: 700 12px 'Inter', system-ui, sans-serif;
    text-decoration: none; text-align: center;
    transition: transform 0.1s;
  }
  .tz-eng-q-btn:hover { transform: scale(1.05); }
  .tz-eng-q-btn:disabled {
    background: rgba(255,255,255,0.08); color: rgba(255,255,255,0.4);
    cursor: not-allowed; transform: none;
  }
  /* "Đi học/Chơi ngay" — link xanh dương để phân biệt với nút "Nhận" cam */
  .tz-eng-q-go {
    background: linear-gradient(135deg, #38bdf8, #0ea5e9);
    color: #0c1726;
  }
  .tz-eng-close {
    position: absolute; top: 12px; right: 14px;
    background: none; border: none; color: rgba(255,255,255,0.5);
    font-size: 22px; cursor: pointer;
  }
  .tz-eng-close:hover { color: #fff; }

  @media (max-width: 640px) {
    .tz-eng-hud { top: 56px; right: 8px; padding: 5px 10px 5px 7px; font-size: 12px; gap: 8px; }
    .tz-eng-streak .flame { font-size: 16px; }
    .tz-eng-hearts { font-size: 12px; }
  }
`;

class EngagementHUD {
  constructor() {
    this.state = null;
    this.timer = null;
    this.injectCSS();
    this.mount();
    this.refresh();
    // Re-poll mỗi 60s (refill heart countdown + giữ snapshot tươi).
    this.timer = setInterval(() => this.refresh(true), 60_000);
  }

  injectCSS() {
    if (document.getElementById('tz-eng-css')) return;
    const s = document.createElement('style');
    s.id = 'tz-eng-css';
    s.textContent = CSS;
    document.head.appendChild(s);
  }

  mount() {
    const hud = document.createElement('button');
    hud.className = 'tz-eng-hud';
    hud.type = 'button';
    hud.hidden = true;
    hud.title = 'Streak · Hearts · Nhiệm vụ hôm nay';
    // HUD MVP — chỉ Streak hiện trước. League/Quest auto-hide nếu feature
    // chưa unlock (data-feature + data-feature-hide-if-locked).
    hud.innerHTML = `
      <a class="tz-eng-league" href="/league.html" title="League tuần" data-league data-feature="league" data-feature-hide-if-locked>
        <span class="ico">🏆</span><span class="tier">…</span>
      </a>
      <span class="tz-eng-sep" data-feature="league" data-feature-hide-if-locked></span>
      <span class="tz-eng-streak" data-feature="hud-streak"><span class="flame">🔥</span><span class="num">0</span></span>
      <span class="tz-eng-sep"></span>
      <span class="tz-eng-hearts" data-h></span>
      <span class="tz-eng-refill" hidden></span>
      <span class="tz-eng-sep" data-feature="daily-quest" data-feature-hide-if-locked></span>
      <span class="tz-eng-quests" data-feature="daily-quest" data-feature-hide-if-locked>📋 <span class="badge">0</span></span>
    `;
    // Bấm vào icon tier không trigger openDrawer — để link tự nhảy
    hud.querySelector('.tz-eng-league').addEventListener('click', (e) => e.stopPropagation());
    hud.addEventListener('click', () => this.openDrawer());
    const slot = document.getElementById('ev-eng-slot');
    (slot || document.body).appendChild(hud);
    this.hud = hud;
    // Header có thể render SAU khi HUD đã mount — khi auth-header phát sự kiện
    // mount, re-parent vào slot để bar nằm gọn trong header.
    document.addEventListener('ev-header-mounted', () => {
      const s = document.getElementById('ev-eng-slot');
      if (s && this.hud.parentElement !== s) s.appendChild(this.hud);
    });

    const bg = document.createElement('div');
    bg.className = 'tz-eng-drawer-bg';
    bg.innerHTML = `
      <div class="tz-eng-drawer" role="dialog" aria-modal="true">
        <button class="tz-eng-close" aria-label="Đóng">×</button>
        <h3>🔥 Nhiệm vụ hôm nay</h3>
        <div class="meta">
          <span>Streak: <b data-streak>0</b> ngày</span>
          <span>Kỷ lục: <b data-longest>0</b></span>
          <span>❤️ <b data-hearts>0/0</b></span>
        </div>
        <div data-quests></div>
      </div>
    `;
    bg.addEventListener('click', (e) => {
      if (e.target === bg || e.target.classList.contains('tz-eng-close')) this.closeDrawer();
    });
    document.body.appendChild(bg);
    this.drawerBg = bg;
    this.drawer = bg.querySelector('.tz-eng-drawer');
  }

  async refresh(silent = false) {
    try {
      const [stateRes, leagueRes] = await Promise.all([
        fetch(API.state,  { credentials: 'same-origin' }),
        fetch(API.league, { credentials: 'same-origin' }).catch(() => null),
      ]);
      if (stateRes.status === 401) {
        // Guest — ẩn HUD im lặng.
        this.hud.hidden = true;
        return;
      }
      if (!stateRes.ok) throw new Error('http_' + stateRes.status);
      const data = await stateRes.json();
      // League là optional — server tự ensureMembership; tuy nhiên nếu lỗi
      // không block HUD.
      let league = null;
      if (leagueRes && leagueRes.ok) {
        try { league = await leagueRes.json(); } catch {}
      }
      this.state = data;
      this.league = league;
      this.render();
      this.hud.hidden = false;
    } catch (e) {
      if (!silent) console.warn('[engagement-hud] refresh failed', e.message);
    }
  }

  render() {
    const s = this.state;
    if (!s) return;
    // League tier (nếu có)
    const leagueEl = this.hud.querySelector('.tz-eng-league');
    if (this.league && this.league.tier_meta) {
      leagueEl.hidden = false;
      leagueEl.querySelector('.ico').textContent = this.league.tier_meta.icon;
      leagueEl.querySelector('.tier').textContent =
        this.league.tier_meta.label + (this.league.my_rank ? ` #${this.league.my_rank}` : '');
    } else {
      leagueEl.hidden = true;
    }
    // Streak — ẩn HẲN nếu trường của user không áp streak (ĐH/nghề, xem
    // isStreakEnabledForDomain ở server). Chỉ phổ thông + mầm non mới có 🔥.
    const streakEl = this.hud.querySelector('.tz-eng-streak');
    streakEl.hidden = !!s.streak_hidden;
    if (!s.streak_hidden) streakEl.querySelector('.num').textContent = s.streak;
    // Hearts dot row
    const h = this.hud.querySelector('[data-h]');
    h.innerHTML = '';
    for (let i = 0; i < s.heartsMax; i++) {
      const span = document.createElement('span');
      span.className = 'h' + (i < s.hearts ? ' on' : '');
      span.textContent = '❤';
      h.appendChild(span);
    }
    // Refill countdown
    const refill = this.hud.querySelector('.tz-eng-refill');
    if (s.hearts < s.heartsMax && s.heartsRefillAt) {
      const remaining = Math.max(0, s.heartsRefillAt - Date.now());
      const m = Math.floor(remaining / 60000);
      const sec = Math.floor((remaining % 60000) / 1000);
      refill.hidden = false;
      refill.textContent = `+1 trong ${m}:${String(sec).padStart(2, '0')}`;
    } else {
      refill.hidden = true;
    }
    // Quests badge — show số chưa claim đã đạt target
    const claimable = s.quests.filter(q => !q.claimed && q.progress >= q.target).length;
    const remaining = s.quests.filter(q => !q.claimed).length;
    const badge = this.hud.querySelector('.tz-eng-quests .badge');
    badge.textContent = claimable > 0 ? `!${claimable}` : remaining;

    // Drawer body — cùng luật: ẩn dòng streak nếu trường không áp streak.
    const dStreak = this.drawer.querySelector('[data-streak]');
    dStreak.textContent = s.streak;
    const dStreakRow = dStreak.closest('span') || dStreak.parentElement;
    if (dStreakRow) dStreakRow.hidden = !!s.streak_hidden;
    this.drawer.querySelector('[data-longest]').textContent = s.longestStreak;
    this.drawer.querySelector('[data-hearts]').textContent = `${s.hearts}/${s.heartsMax}`;
    const wrap = this.drawer.querySelector('[data-quests]');
    wrap.innerHTML = '';
    s.quests.forEach(q => {
      const div = document.createElement('div');
      const done = q.progress >= q.target;
      div.className = 'tz-eng-q' + (done ? ' done' : '') + (q.claimed ? ' claimed' : '');
      const pct = Math.min(100, Math.round((q.progress / q.target) * 100));
      div.innerHTML = `
        <span class="ico">${KIND_ICO[q.kind] || '⭐'}</span>
        <div class="body">
          <div class="label">${escapeHtml(q.label)}</div>
          <div class="bar"><div class="fill" style="width:${pct}%"></div></div>
          <div class="prog">${q.progress}/${q.target} · ${pct}%</div>
        </div>
        <div style="display:flex;flex-direction:column;align-items:flex-end;gap:6px">
          <div class="reward">+${q.rewardCoin}🪙 +${q.rewardXp}✨</div>
          ${q.claimed
            ? `<button class="tz-eng-q-btn" disabled>✓ Đã nhận</button>`
            : done
              ? `<button class="tz-eng-q-btn" data-slot="${q.slot}">Nhận</button>`
              : `<a class="tz-eng-q-btn tz-eng-q-go" href="${questGoHref(q.kind)}">${KIND_GO_LABEL[q.kind] || '▶ Đi ngay'}</a>`
          }
        </div>
      `;
      const claimBtn = div.querySelector('button[data-slot]');
      if (claimBtn) claimBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.claim(q.slot);
      });
      wrap.appendChild(div);
    });
  }

  async claim(slot) {
    try {
      const res = await fetch(API.claim, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slot }),
        credentials: 'same-origin',
      });
      const data = await res.json();
      if (!data.ok) {
        console.warn('[engagement-hud] claim failed', data);
        return;
      }
      // Server đã trả snapshot đính kèm.
      if (data.state) {
        this.state = data.state;
        this.render();
      }
      this.toast(`+${data.rewardCoin}🪙 +${data.rewardXp}✨ đã vào ví`);
    } catch (e) {
      console.warn('[engagement-hud] claim error', e);
    }
  }

  openDrawer() {
    this.refresh(true);
    this.drawerBg.classList.add('open');
  }
  closeDrawer() {
    this.drawerBg.classList.remove('open');
  }

  toast(msg) {
    const t = document.createElement('div');
    t.textContent = msg;
    t.style.cssText = `
      position: fixed; left: 50%; bottom: 80px; transform: translateX(-50%);
      background: linear-gradient(135deg, #f59e0b, #f97316); color: #1e293b;
      padding: 10px 16px; border-radius: 999px; font: 700 13px 'Inter', sans-serif;
      box-shadow: 0 8px 24px rgba(0,0,0,0.4); z-index: 300;
      animation: tz-toast-in 0.25s ease;
    `;
    document.body.appendChild(t);
    setTimeout(() => t.remove(), 2200);
  }
}

function escapeHtml(s) {
  return String(s || '').replace(/[&<>"']/g, c => ({
    '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;',
  }[c]));
}

// Auto-mount sau khi DOM sẵn sàng. Không khởi tạo trên trang login/register
// hoặc trang admin riêng (sẽ tự ẩn vì 401 hoặc admin không có user_id chuẩn).
function autoMount() {
  // Tránh double-mount khi cả auth-header.js và trang đều import.
  if (window.__tziaEngagementHud) return;
  window.__tziaEngagementHud = new EngagementHUD();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', autoMount);
} else {
  autoMount();
}

export { EngagementHUD };
