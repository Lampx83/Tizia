// Daily Login Bonus — popup modal 7-day chain (Duolingo / Genshin style)
// Tự bật khi user vào app + chưa claim hôm nay. Persist localStorage flag
// "đã thấy hôm nay" để không popup lại sau khi claim.

const KEY_SHOWN = 'tizia:daily:shown';

const CSS = `
  .tz-daily-bg {
    position:fixed; inset:0; z-index:550;
    background:rgba(2,6,23,.78); backdrop-filter:blur(8px);
    display:flex; align-items:center; justify-content:center; padding:20px;
    opacity:0; pointer-events:none; transition:opacity .25s;
  }
  .tz-daily-bg.open { opacity:1; pointer-events:auto; }
  .tz-daily {
    width:min(540px, 100%);
    background:linear-gradient(180deg, #1e293b 0%, #0f172a 100%);
    border:1px solid rgba(251,191,36,.45);
    border-radius:20px; padding:22px;
    color:#fff; font-family:'Inter', sans-serif;
    box-shadow:0 24px 64px rgba(0,0,0,.6), 0 0 40px rgba(251,191,36,.2);
  }
  .tz-daily h2 {
    margin:0 0 4px; font-size:22px; text-align:center;
    background:linear-gradient(135deg, #fbbf24, #f97316);
    -webkit-background-clip:text; background-clip:text; color:transparent;
  }
  .tz-daily .sub { text-align:center; color:#cbd5e1; font-size:13px; margin-bottom:18px; }
  .tz-daily .row { display:grid; grid-template-columns:repeat(7, 1fr); gap:6px; }
  .tz-daily .day {
    background:rgba(255,255,255,.05); border:1px solid rgba(255,255,255,.10);
    border-radius:12px; padding:10px 6px; text-align:center;
    position:relative; transition:transform .15s;
  }
  .tz-daily .day.claimed {
    background:rgba(34,197,94,.15); border-color:var(--good, #22c55e);
  }
  .tz-daily .day.next {
    background:linear-gradient(135deg, rgba(251,191,36,.25), rgba(251,146,60,.15));
    border-color:#fbbf24;
    animation:tz-daily-pulse 1.6s ease-in-out infinite;
  }
  .tz-daily .day.locked { opacity:.45; }
  @keyframes tz-daily-pulse {
    0%, 100% { transform:scale(1); box-shadow:0 0 0 0 rgba(251,191,36,.5); }
    50% { transform:scale(1.05); box-shadow:0 0 0 8px rgba(251,191,36,0); }
  }
  .tz-daily .day .d {
    font-size:10px; color:#cbd5e1; font-weight:700;
    letter-spacing:.5px; text-transform:uppercase;
  }
  .tz-daily .day .ico {
    font-size:22px; margin:6px 0 3px; line-height:1;
    filter: drop-shadow(0 2px 4px rgba(0,0,0,.4));
  }
  .tz-daily .day.locked .ico { filter:grayscale(.8); }
  .tz-daily .day .rew {
    font-size:10.5px; font-weight:700; color:#fde68a;
  }
  .tz-daily .day.jackpot .ico {
    font-size:28px;
    animation:tz-daily-jackpot 1.4s ease-in-out infinite;
  }
  @keyframes tz-daily-jackpot {
    0%, 100% { transform:rotate(-3deg); }
    50% { transform:rotate(5deg); }
  }
  .tz-daily .actions {
    display:flex; gap:10px; margin-top:18px; justify-content:center;
  }
  .tz-daily .actions .claim {
    background:linear-gradient(135deg, #fbbf24, #f97316); color:#1e293b;
    border:none; padding:11px 28px; border-radius:14px;
    font:800 14px 'Inter', system-ui, sans-serif; cursor:pointer; transition:transform .12s;
    box-shadow:0 8px 24px rgba(251,146,60,.4);
  }
  .tz-daily .actions .claim:hover:not(:disabled) { transform:scale(1.05); }
  .tz-daily .actions .claim:disabled { opacity:.5; cursor:not-allowed; }
  .tz-daily .actions .close {
    background:rgba(255,255,255,.08); color:#cbd5e1; border:none;
    padding:11px 20px; border-radius:14px; font:600 13px 'Inter', system-ui, sans-serif; cursor:pointer;
  }
  .tz-daily .got {
    text-align:center; padding:14px; margin-top:14px;
    background:rgba(34,197,94,.12); border-radius:12px;
    color:#86efac; font-weight:700;
  }
`;

class DailyLogin {
  constructor() {
    this.state = null;
    this.injectCss();
    this.build();
  }
  injectCss() {
    if (document.getElementById('tz-daily-css')) return;
    const s = document.createElement('style');
    s.id = 'tz-daily-css'; s.textContent = CSS;
    document.head.appendChild(s);
  }
  build() {
    const bg = document.createElement('div');
    bg.className = 'tz-daily-bg';
    bg.innerHTML = `<div class="tz-daily" data-host></div>`;
    bg.addEventListener('click', (e) => {
      if (e.target === bg) this.close();
    });
    document.body.appendChild(bg);
    this.bg = bg; this.host = bg.querySelector('[data-host]');
  }
  async show() {
    try {
      const r = await fetch('/api/daily/me', { credentials:'same-origin' });
      if (r.status === 401) return;
      const d = await r.json();
      if (!d.can_claim) return;
      this.state = d;
      this.render();
      this.bg.classList.add('open');
    } catch {}
  }
  close() { this.bg.classList.remove('open'); }
  render(claimed = false) {
    const d = this.state;
    const next = d.next_streak;
    this.host.innerHTML = `
      <h2>🎁 Phần thưởng đăng nhập hằng ngày</h2>
      <div class="sub">Chuỗi 7 ngày — ngày 7 jackpot. Bỏ lỡ ngày là reset!</div>
      <div class="row">
        ${d.rewards.map(r => {
          const isClaimed = r.day < next;
          const isNext = r.day === next && !claimed;
          const isLocked = r.day > next && !claimed;
          const cls = (isClaimed ? 'claimed' : '') + (isNext ? ' next' : '') + (isLocked ? ' locked' : '') + (r.day === 7 ? ' jackpot' : '');
          return `
            <div class="day ${cls}">
              <div class="d">Ngày ${r.day}</div>
              <div class="ico">${r.day === 7 ? '🏆' : (r.bonus ? '🎁' : '🪙')}</div>
              <div class="rew">+${r.coin}🪙<br>+${r.xp}✨</div>
            </div>
          `;
        }).join('')}
      </div>
      ${claimed
        ? `<div class="got">✓ Đã nhận thưởng ngày ${next} hôm nay! Quay lại ngày mai.</div>`
        : `<div class="actions">
            <button class="claim" data-claim>🎁 Nhận thưởng ngày ${next}</button>
            <button class="close" data-close>Để sau</button>
          </div>`}
    `;
    this.host.querySelector('[data-claim]')?.addEventListener('click', () => this.claim());
    this.host.querySelector('[data-close]')?.addEventListener('click', () => this.close());
  }
  async claim() {
    try {
      const r = await fetch('/api/daily/claim', { method:'POST', credentials:'same-origin' });
      const d = await r.json();
      if (!d.ok) return;
      this.state.next_streak = d.new_streak;
      this.state.can_claim = false;
      this.render(true);
      try { window.__tziaEngagementHud?.refresh(); } catch {}
      localStorage.setItem(KEY_SHOWN, new Date().toISOString().slice(0, 10));
    } catch {}
  }
}

// Auto-show 1 lần / ngày sau khi page load 1.5s + feature unlocked
async function autoShow() {
  const today = new Date(Date.now() + 7*3600_000).toISOString().slice(0, 10);
  if (localStorage.getItem(KEY_SHOWN) === today) return;
  // Claim ĐỒNG BỘ, trước await bên dưới — auth-header.js VÀ trang đều import
  // file này (2 module instance khác URL), cả 2 gọi autoShow() gần như cùng
  // lúc. `window.__tziaDaily` cũ chỉ set SAU await f.load() nên cả 2 lọt qua
  // check cũ trước khi cái nào set được flag → 2 popup. Cờ riêng, set ngay.
  if (window.__tziaDailyClaimed) return;
  window.__tziaDailyClaimed = true;
  // Gate: chỉ show Daily Bonus khi feature unlocked
  try {
    const f = window.__tziaFeatures;
    if (f) {
      await f.load();
      if (!f.isUnlocked('daily-bonus')) return;
    }
  } catch {}
  const dl = new DailyLogin();
  window.__tziaDaily = dl;
  setTimeout(() => dl.show(), 1500);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', autoShow);
} else {
  autoShow();
}

window.__tziaShowDaily = () => {
  localStorage.removeItem(KEY_SHOWN);
  (window.__tziaDaily || new DailyLogin()).show();
};

export { DailyLogin };
