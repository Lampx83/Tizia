// Pet đồng hành widget — bubble nhỏ bên trái dưới màn hình (đối xứng HUD bên phải).
// Click → mở drawer chi tiết: feed, switch pet, nickname.
// Side-effect import từ auth-header.js.

const CSS = `
  .tz-pet-bubble {
    position: fixed; top: 72px; left: 18px; z-index: 92;
    width: 64px; height: 64px; border-radius: 50%;
    background: radial-gradient(circle at 30% 30%, rgba(251,191,36,0.4), rgba(99,102,241,0.4));
    border: 2px solid rgba(255,255,255,0.15);
    backdrop-filter: blur(10px);
    display: flex; align-items: center; justify-content: center;
    font-size: 34px; line-height: 1;
    cursor: pointer; box-shadow: 0 10px 30px rgba(0,0,0,0.4);
    transition: transform 0.18s, box-shadow 0.18s;
    animation: tz-pet-idle 4s ease-in-out infinite;
  }
  .tz-pet-bubble:hover { transform: scale(1.08); box-shadow: 0 14px 36px rgba(0,0,0,0.5); }
  .tz-pet-bubble[hidden] { display: none !important; }
  /* Inline trong header (auth-header có #ev-pet-slot), bubble nhỏ gọn,
     bỏ floating + animation idle để không nhảy trong header. */
  #ev-pet-slot .tz-pet-bubble {
    position: static; left: auto; top: auto; bottom: auto;
    width: 34px; height: 34px;
    font-size: 19px;
    box-shadow: none;
    animation: none;
    border-color: rgba(255,255,255,0.18);
  }
  #ev-pet-slot .tz-pet-bubble:hover { transform: scale(1.06); box-shadow: 0 4px 12px rgba(0,0,0,0.35); }
  #ev-pet-slot .tz-pet-bubble .badge {
    top: -5px; right: -6px;
    font-size: 8.5px; padding: 1px 5px;
    border-width: 1.5px;
  }
  /* Khi pet nằm trong header, drawer mở từ góc phải-trên thay vì từ bottom-left */
  body:has(#ev-pet-slot .tz-pet-bubble) .tz-pet-drawer-bg {
    align-items: flex-start; justify-content: flex-end;
    padding: 72px 16px 16px;
  }
  .tz-pet-bubble .badge {
    position: absolute; top: -4px; right: -8px;
    background: linear-gradient(135deg, #fbbf24, #f97316);
    color: #1e293b; font-size: 9.5px; font-weight: 800;
    padding: 2px 6px; border-radius: 999px; line-height: 1;
    border: 2px solid #0f172a;
    white-space: nowrap;
  }
  /* 0% là nhiễu thị giác, ẩn cho tới khi pet thật sự có tiến triển */
  .tz-pet-bubble .badge[hidden] { display: none !important; }
  @keyframes tz-pet-idle {
    0%, 100% { transform: translateY(0) rotate(0); }
    50% { transform: translateY(-4px) rotate(2deg); }
  }
  .tz-pet-evolve {
    position: fixed; inset: 0; z-index: 600;
    background: rgba(2,6,23,0.85);
    backdrop-filter: blur(20px);
    display: flex; align-items: center; justify-content: center;
    opacity: 0; pointer-events: none; transition: opacity 0.4s;
  }
  .tz-pet-evolve.open { opacity: 1; pointer-events: auto; }
  .tz-pet-evolve .core {
    text-align: center; color: #fff;
    font-family: 'Inter', system-ui, sans-serif;
  }
  .tz-pet-evolve .star {
    font-size: 120px; animation: tz-evolve-spin 2s linear infinite;
    filter: drop-shadow(0 0 40px rgba(251,191,36,0.8));
  }
  .tz-pet-evolve h2 {
    font-size: 28px; margin: 16px 0 8px;
    background: linear-gradient(135deg, #fbbf24, #ec4899);
    -webkit-background-clip: text; background-clip: text; color: transparent;
  }
  .tz-pet-evolve p { font-size: 16px; color: #cbd5e1; margin: 0 0 16px; }
  .tz-pet-evolve button {
    background: linear-gradient(135deg, #fbbf24, #f97316);
    color: #1e293b; border: none; cursor: pointer;
    padding: 12px 28px; border-radius: 14px;
    font: 800 14px 'Inter', system-ui, sans-serif; box-shadow: 0 8px 24px rgba(251,191,36,0.4);
  }
  @keyframes tz-evolve-spin { from { transform: rotate(0); } to { transform: rotate(360deg); } }

  /* Drawer chi tiết */
  .tz-pet-drawer-bg {
    position: fixed; inset: 0; z-index: 200;
    background: rgba(2,6,23,0.7); backdrop-filter: blur(8px);
    display: flex; align-items: flex-start; justify-content: flex-start;
    padding: 140px 16px 16px;
    opacity: 0; pointer-events: none; transition: opacity 0.2s;
  }
  .tz-pet-drawer-bg.open { opacity: 1; pointer-events: auto; }
  .tz-pet-drawer {
    width: min(360px, 100%);
    background: linear-gradient(180deg, #1e293b 0%, #0f172a 100%);
    border: 1px solid rgba(255,255,255,0.14);
    border-radius: 18px; padding: 18px 20px;
    color: #fff; font-family: 'Inter', system-ui, sans-serif;
    box-shadow: 0 20px 60px rgba(0,0,0,0.5);
    transform: translateY(8px); transition: transform 0.2s;
  }
  .tz-pet-drawer-bg.open .tz-pet-drawer { transform: translateY(0); }
  .tz-pet-drawer .hero {
    display: flex; gap: 12px; align-items: center; margin-bottom: 14px;
  }
  .tz-pet-drawer .sprite {
    width: 64px; height: 64px; border-radius: 50%;
    background: rgba(255,255,255,0.06);
    display: flex; align-items: center; justify-content: center;
    font-size: 36px;
  }
  .tz-pet-drawer .nm-box { flex: 1; min-width: 0; }
  .tz-pet-drawer .nm { font-size: 17px; font-weight: 800; }
  .tz-pet-drawer .stage { font-size: 11.5px; color: #cbd5e1; }
  .tz-pet-drawer .xp-line { font-size: 12px; color: #cbd5e1; margin: 6px 0 4px; display: flex; justify-content: space-between; }
  .tz-pet-drawer .bar { height: 8px; background: rgba(255,255,255,0.08); border-radius: 6px; overflow: hidden; }
  .tz-pet-drawer .bar > i { display: block; height: 100%; background: linear-gradient(90deg, #fbbf24, #ec4899); transition: width 0.4s; }
  .tz-pet-drawer .actions {
    display: flex; gap: 8px; margin-top: 14px;
  }
  .tz-pet-drawer button {
    flex: 1; padding: 9px 12px; border-radius: 10px; border: 1px solid rgba(255,255,255,0.14);
    background: rgba(255,255,255,0.06); color: #fff; font: 700 12.5px 'Inter', system-ui, sans-serif;
    cursor: pointer; transition: background 0.12s;
  }
  .tz-pet-drawer button:hover { background: rgba(255,255,255,0.14); }
  .tz-pet-drawer button.feed {
    background: linear-gradient(135deg, #fbbf24, #f97316); color: #1e293b; border-color: transparent;
  }
  .tz-pet-drawer button:disabled { opacity: 0.5; cursor: not-allowed; }
  .tz-pet-drawer .switch-list {
    display: grid; grid-template-columns: repeat(4, 1fr); gap: 6px;
    margin-top: 12px; padding-top: 12px; border-top: 1px solid rgba(255,255,255,0.08);
    max-height: 220px; overflow-y: auto;
  }
  .tz-pet-drawer .switch-list::-webkit-scrollbar { width: 5px; }
  .tz-pet-drawer .switch-list::-webkit-scrollbar-thumb { background: rgba(251,191,36,0.3); border-radius: 5px; }
  .tz-pet-drawer .switch-list .p {
    text-align: center; padding: 8px 4px; border-radius: 10px;
    background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08);
    cursor: pointer; font-size: 22px;
    transition: background 0.12s, border-color 0.12s;
  }
  .tz-pet-drawer .switch-list .p:hover { background: rgba(255,255,255,0.10); border-color: rgba(251,191,36,0.4); }
  .tz-pet-drawer .switch-list .p.cur { border-color: #fbbf24; background: rgba(251,191,36,0.10); }
  .tz-pet-drawer .feed-msg {
    margin-top: 10px; font-size: 11.5px; color: #fde68a; text-align: center;
  }
  .tz-pet-drawer .close {
    position: absolute; top: 12px; right: 14px;
    background: none; border: none; color: rgba(255,255,255,0.5);
    font-size: 22px; cursor: pointer;
  }
`;

class PetWidget {
  constructor() {
    this.pet = null;
    this.catalog = [];
    this.injectCss();
    this.mount();
    this.refresh();
    // Auto-poll mỗi 2 phút để bắt evolve
    setInterval(() => this.refresh(true), 2 * 60 * 1000);
  }

  injectCss() {
    if (document.getElementById('tz-pet-css')) return;
    const s = document.createElement('style');
    s.id = 'tz-pet-css'; s.textContent = CSS;
    document.head.appendChild(s);
  }

  mount() {
    const b = document.createElement('div');
    b.className = 'tz-pet-bubble';
    b.hidden = true;
    b.title = 'Pet đồng hành của em';
    b.innerHTML = `<span class="sprite">🦉</span>`;
    b.addEventListener('click', () => this.openDrawer());
    const slot = document.getElementById('ev-pet-slot');
    (slot || document.body).appendChild(b);
    this.bubble = b;
    // Header có thể render sau khi pet đã mount — reparent vào slot khi sẵn sàng.
    document.addEventListener('ev-header-mounted', () => {
      const s = document.getElementById('ev-pet-slot');
      if (s && this.bubble.parentElement !== s) s.appendChild(this.bubble);
    });

    const bg = document.createElement('div');
    bg.className = 'tz-pet-drawer-bg';
    bg.innerHTML = `
      <div class="tz-pet-drawer">
        <button class="close" aria-label="Đóng">×</button>
        <div data-body></div>
      </div>
    `;
    bg.addEventListener('click', (e) => {
      if (e.target === bg || e.target.classList.contains('close')) this.closeDrawer();
    });
    document.body.appendChild(bg);
    this.drawerBg = bg;
    this.drawerBody = bg.querySelector('[data-body]');

    const ev = document.createElement('div');
    ev.className = 'tz-pet-evolve';
    ev.innerHTML = `
      <div class="core">
        <div class="star">✨</div>
        <h2 data-evo-title>Pet đã tiến hoá!</h2>
        <p data-evo-msg>…</p>
        <button data-evo-close>Tuyệt vời! 🎉</button>
      </div>
    `;
    ev.querySelector('[data-evo-close]').addEventListener('click', () => ev.classList.remove('open'));
    document.body.appendChild(ev);
    this.evolveModal = ev;
  }

  async refresh(silent = false) {
    try {
      // Gate: chỉ show Pet khi feature unlocked
      try {
        const f = window.__tziaFeatures;
        if (f) {
          await f.load();
          if (!f.isUnlocked('pet')) { this.bubble.hidden = true; return; }
        }
      } catch {}
      const r = await fetch('/api/pet/me', { credentials: 'same-origin' });
      if (r.status === 401) { this.bubble.hidden = true; return; }
      if (!r.ok) throw new Error('http_' + r.status);
      const data = await r.json();
      const prevStage = this.pet?.stage;
      this.pet = data.pet;
      this.catalog = data.catalog || [];
      this.bubble.hidden = false;
      this.render();
      if (prevStage != null && this.pet.stage > prevStage) {
        this.showEvolve();
      }
    } catch (e) {
      if (!silent) console.warn('[pet] refresh', e.message);
    }
  }

  render() {
    if (!this.pet) return;
    this.bubble.querySelector('.sprite').textContent = this.pet.sprite;
    // Badge stage hoặc XP%
    let badge = this.bubble.querySelector('.badge');
    if (!badge) {
      badge = document.createElement('span');
      badge.className = 'badge';
      this.bubble.appendChild(badge);
    }
    const pct = this.pet.progress_pct || 0;
    if (this.pet.stage >= 2) {
      badge.hidden = false;
      badge.textContent = '👑';
    } else if (pct >= 1) {
      badge.hidden = false;
      badge.textContent = `${pct}%`;
    } else {
      // Pet mới — không đẩy badge "0%" che mất sprite. Chỉ hiện khi có XP.
      badge.hidden = true;
    }
  }

  openDrawer() {
    if (!this.pet) return;
    this.renderDrawer();
    this.drawerBg.classList.add('open');
  }
  closeDrawer() { this.drawerBg.classList.remove('open'); }

  renderDrawer() {
    const p = this.pet;
    this.drawerBody.innerHTML = `
      <div class="hero">
        <div class="sprite">${p.sprite}</div>
        <div class="nm-box">
          <div class="nm">${esc(p.name)}</div>
          <div class="stage">${p.stage_label} · ${esc(p.base_name)}${p.personality ? ' · ' + esc(p.personality) : ''}</div>
        </div>
      </div>
      <div class="xp-line">
        <span>XP: <b style="color:#fbbf24">${p.xp}</b> / ${p.stage_xp_end}</span>
        <span>${p.progress_pct}%</span>
      </div>
      <div class="bar"><i style="width:${p.progress_pct}%"></i></div>
      <div class="actions">
        <button class="feed" data-feed ${p.can_feed ? '' : 'disabled'}>
          ${p.can_feed ? `🍎 Cho ăn (-${p.feed_cost}🪙 +${p.feed_xp}✨)` : '⏳ Pet đang no'}
        </button>
        <button data-rename>✏️ Đổi tên</button>
      </div>
      <div class="feed-msg" data-msg></div>
      <div class="switch-list">
        ${this.catalog.map(c => `
          <div class="p ${c.id === p.pet_id ? 'cur' : ''}" data-pet="${c.id}" title="${esc(c.name)}">
            ${c.stages[p.stage] || c.stages[0]}
          </div>
        `).join('')}
      </div>
    `;
    this.drawerBody.querySelector('[data-feed]')?.addEventListener('click', () => this.feed());
    this.drawerBody.querySelector('[data-rename]')?.addEventListener('click', () => this.rename());
    this.drawerBody.querySelectorAll('[data-pet]').forEach(el => {
      el.addEventListener('click', () => this.switchPet(el.dataset.pet));
    });
  }

  async feed() {
    try {
      const r = await fetch('/api/pet/feed', { method: 'POST', credentials: 'same-origin' });
      const data = await r.json();
      if (!data.ok) {
        const msg = this.drawerBody.querySelector('[data-msg]');
        if (msg) msg.textContent = data.message || data.error || 'Không cho ăn được.';
        return;
      }
      this.pet = data.pet;
      this.render();
      this.renderDrawer();
      const msg = this.drawerBody.querySelector('[data-msg]');
      if (msg) msg.textContent = `+${data.gained.xp} XP · ${data.gained.coins} 🪙`;
      if (data.evolved) this.showEvolve();
      // Refresh HUD coin
      try { window.__tziaEngagementHud?.refresh(); } catch {}
    } catch (e) {
      console.warn('[pet] feed', e);
    }
  }

  async switchPet(petId) {
    if (petId === this.pet.pet_id) return;
    try {
      const r = await fetch('/api/pet/switch', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pet_id: petId }), credentials: 'same-origin',
      });
      const data = await r.json();
      if (data.ok) { this.pet = data.pet; this.render(); this.renderDrawer(); }
    } catch (e) { console.warn('[pet] switch', e); }
  }

  async rename() {
    const name = prompt('Đặt tên cho pet của em:', this.pet.name);
    if (name == null) return;
    try {
      const r = await fetch('/api/pet/nickname', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nickname: name }), credentials: 'same-origin',
      });
      const data = await r.json();
      if (data.ok) { this.pet = data.pet; this.render(); this.renderDrawer(); }
    } catch (e) { console.warn('[pet] rename', e); }
  }

  showEvolve() {
    const ev = this.evolveModal;
    ev.querySelector('[data-evo-title]').textContent = '✨ Pet đã tiến hoá!';
    ev.querySelector('[data-evo-msg]').textContent =
      `${this.pet.name} bây giờ là ${this.pet.stage_label.toLowerCase()} ${this.pet.sprite}`;
    ev.classList.add('open');
  }
}

function esc(s) { return String(s||'').replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c])); }

function autoMount() {
  if (window.__tziaPetWidget) return;
  window.__tziaPetWidget = new PetWidget();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', autoMount);
} else {
  autoMount();
}

export { PetWidget };
