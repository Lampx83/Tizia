// Onboarding 60s — modal 3 bước cho user mới (Duolingo-style "first run").
// Mục đích: HS hiểu HUD engagement trong < 1 phút → tăng D1 retention.
// Auto-mount khi: đã login + chưa thấy onboarding lần nào (localStorage flag).
// Mọi trang import auth-header.js đều có (side-effect import).

const STORAGE_KEY = 'tizia:onboarding:v1:done';

const STYLE = `
  .tz-onb-bg {
    position: fixed; inset: 0; z-index: 500;
    background: rgba(2, 6, 23, 0.78);
    backdrop-filter: blur(10px);
    display: flex; align-items: center; justify-content: center;
    padding: 20px;
    opacity: 0; pointer-events: none;
    transition: opacity 0.25s;
  }
  .tz-onb-bg.open { opacity: 1; pointer-events: auto; }
  .tz-onb {
    width: min(480px, 100%);
    background: linear-gradient(180deg, #1e293b 0%, #0f172a 100%);
    border: 1px solid rgba(251,191,36,0.4);
    border-radius: 22px;
    padding: 26px 26px 22px;
    color: #fff; font-family: 'Inter', system-ui, sans-serif;
    box-shadow: 0 24px 64px rgba(0,0,0,0.6), 0 0 40px rgba(251,191,36,0.15);
    transform: scale(0.92) translateY(10px);
    transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  }
  .tz-onb-bg.open .tz-onb { transform: scale(1) translateY(0); }
  .tz-onb-progress {
    display: flex; gap: 6px; margin-bottom: 16px;
  }
  .tz-onb-progress .pip {
    flex: 1; height: 4px; border-radius: 4px;
    background: rgba(255,255,255,0.08);
    transition: background 0.3s;
  }
  .tz-onb-progress .pip.active {
    background: linear-gradient(90deg, #fbbf24, #f97316);
  }
  .tz-onb h2 {
    margin: 0 0 8px; font-size: 22px; font-weight: 800;
    background: linear-gradient(135deg, #ffffff, #fbbf24, #f97316);
    -webkit-background-clip: text; background-clip: text; color: transparent;
  }
  .tz-onb .sub { margin: 0 0 18px; font-size: 14px; color: #cbd5e1; line-height: 1.5; }
  .tz-onb input, .tz-onb select {
    width: 100%; padding: 12px 14px; margin: 4px 0 16px;
    background: rgba(255,255,255,0.06);
    border: 1px solid rgba(255,255,255,0.18);
    border-radius: 12px;
    color: #fff; font-size: 15px; font-family: inherit;
    transition: border-color 0.15s;
  }
  .tz-onb input:focus, .tz-onb select:focus {
    outline: none; border-color: #fbbf24;
  }
  .tz-onb .pets {
    display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px;
    margin: 12px 0 18px;
    max-height: 50vh; overflow-y: auto; padding: 2px;
  }
  .tz-onb .pets::-webkit-scrollbar { width: 6px; }
  .tz-onb .pets::-webkit-scrollbar-thumb { background: rgba(251,191,36,0.3); border-radius: 6px; }
  .tz-onb .pet {
    padding: 14px 8px; border-radius: 14px;
    background: rgba(255,255,255,0.04);
    border: 2px solid rgba(255,255,255,0.10);
    text-align: center; cursor: pointer;
    transition: transform 0.15s, border-color 0.15s, background 0.15s;
  }
  .tz-onb .pet:hover { transform: translateY(-2px); background: rgba(255,255,255,0.08); }
  .tz-onb .pet.selected {
    border-color: #fbbf24;
    background: rgba(251,191,36,0.12);
    box-shadow: 0 0 20px rgba(251,191,36,0.25);
  }
  .tz-onb .pet .emo { font-size: 36px; line-height: 1; margin-bottom: 6px; display: block; }
  .tz-onb .pet .nm { font-size: 11.5px; font-weight: 700; color: #fde68a; }
  .tz-onb .pet .desc { font-size: 10px; color: #94a3b8; margin-top: 2px; line-height: 1.3; }
  .tz-onb-actions {
    display: flex; gap: 10px; justify-content: space-between; margin-top: 8px;
  }
  .tz-onb-actions .skip {
    background: none; border: none; color: rgba(255,255,255,0.55);
    font-size: 13px; cursor: pointer; padding: 8px 4px;
  }
  .tz-onb-actions .skip:hover { color: #fff; }
  .tz-onb-actions .next {
    background: linear-gradient(135deg, #fbbf24, #f97316);
    color: #1e293b; border: none; cursor: pointer;
    padding: 10px 22px; border-radius: 12px;
    font: 800 14px 'Inter', sans-serif;
    transition: transform 0.12s;
    box-shadow: 0 6px 18px rgba(251,146,60,0.4);
  }
  .tz-onb-actions .next:hover { transform: scale(1.04); }
  .tz-onb-actions .next:disabled {
    background: rgba(255,255,255,0.08); color: rgba(255,255,255,0.4);
    box-shadow: none; cursor: not-allowed; transform: none;
  }
  /* Spotlight cho bước highlight HUD */
  .tz-onb-spotlight {
    position: fixed; pointer-events: none;
    border-radius: 999px; z-index: 499;
    box-shadow: 0 0 0 9999px rgba(2,6,23,0.85), 0 0 30px rgba(251,191,36,0.6);
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  }
  .tz-onb-arrow {
    position: fixed; z-index: 501; pointer-events: none;
    color: #fbbf24; font-size: 40px;
    animation: tz-arrow-pulse 1.2s ease-in-out infinite;
  }
  @keyframes tz-arrow-pulse {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(8px); }
  }
`;

// Pet = TÍNH CÁCH bạn đồng hành, KHÔNG gắn 1 môn (tránh học lệch).
// Pet chỉ ảnh hưởng tone trò chuyện của Thầy AI + skin pet trong trường ảo.
// Hợp cho mọi cấp học, kể cả SV ĐH (có robot-tri, kylan-tre cho SV/người lớn).
// Khớp 1-1 với server/contexts/engagement/pet.js PET_CATALOG.
const PETS = [
  { id: 'cao-lem',    emo: '🦊', name: 'Cáo Lém',     desc: 'Nhanh trí · Ứng biến' },
  { id: 'rua-ben',    emo: '🐢', name: 'Rùa Bền',     desc: 'Kiên trì · Học đều' },
  { id: 'cu-to-mo',   emo: '🦉', name: 'Cú Tò Mò',    desc: 'Ham hỏi · Khám phá' },
  { id: 'rong-dung',  emo: '🐲', name: 'Rồng Dũng',   desc: 'Dám thử · Thử thách' },
  { id: 'meo-sang',   emo: '🐱', name: 'Mèo Sáng',    desc: 'Sáng tạo · Tinh tế' },
  { id: 'ca-heo',     emo: '🐬', name: 'Cá Heo',      desc: 'Đồng đội · Vui vẻ' },
  { id: 'gau-truc',   emo: '🐼', name: 'Gấu Trúc',    desc: 'Bình tĩnh · Tập trung' },
  { id: 'ong-cham',   emo: '🐝', name: 'Ong Chăm',    desc: 'Chăm chỉ · Có tổ chức' },
  { id: 'chim-cc',    emo: '🐧', name: 'Cánh Cụt',    desc: 'Lạc quan · Lan toả' },
  { id: 'ho-con',     emo: '🐯', name: 'Hổ Con',      desc: 'Mạnh mẽ · Tự tin' },
  { id: 'soc-nho',    emo: '🐿️', name: 'Sóc Nhỏ',     desc: 'Nhanh nhẹn · Tích luỹ' },
  { id: 'robot-tri',  emo: '🤖', name: 'Robot Trí',   desc: 'Logic · Phân tích (SV)' },
  { id: 'kylan-tre',  emo: '🦄', name: 'Kỳ Lân Trẻ',  desc: 'Mơ mộng · Cảm hứng' },
];

class Onboarding {
  constructor() {
    // Defense-in-depth: nếu user đã hoàn tất/skip, KHÔNG build DOM dù bị gọi
    // từ bất cứ code path nào (kể cả script cũ trong bfcache).
    if (localStorage.getItem(STORAGE_KEY)) {
      this._skipped = true;
      return;
    }
    this.step = 0;
    this.data = { displayName: '', grade: '', pet: '' };
    this.injectStyle();
    this.build();
  }

  injectStyle() {
    if (document.getElementById('tz-onb-css')) return;
    const s = document.createElement('style');
    s.id = 'tz-onb-css';
    s.textContent = STYLE;
    document.head.appendChild(s);
  }

  build() {
    const bg = document.createElement('div');
    bg.className = 'tz-onb-bg';
    bg.innerHTML = `
      <div class="tz-onb" role="dialog" aria-modal="true">
        <div class="tz-onb-progress">
          <div class="pip"></div><div class="pip"></div>
          <div class="pip"></div><div class="pip"></div>
        </div>
        <div data-body></div>
      </div>
    `;
    document.body.appendChild(bg);
    this.bg = bg;
    this.body = bg.querySelector('[data-body]');
    bg.addEventListener('click', (e) => {
      // Click backdrop = skip (lưu flag để khỏi hiện lại)
      if (e.target === bg) this.skip();
    });
  }

  setProgress() {
    this.bg.querySelectorAll('.pip').forEach((p, i) =>
      p.classList.toggle('active', i <= this.step)
    );
  }

  async open() {
    if (this._skipped) return; // Đã bị defense-in-depth chặn ở constructor
    // Bước 0 — chào + tên (prefill từ user nếu có)
    try {
      const me = await fetch('/api/auth/me', { credentials: 'same-origin' }).then(r => r.ok ? r.json() : null);
      if (me?.user) this.data.displayName = me.user.display_name || '';
    } catch {}
    this.bg.classList.add('open');
    this.renderStep();
  }

  close() {
    this.bg.classList.remove('open');
    document.querySelector('.tz-onb-spotlight')?.remove();
    document.querySelector('.tz-onb-arrow')?.remove();
    setTimeout(() => this.bg.remove(), 300);
  }

  skip() {
    localStorage.setItem(STORAGE_KEY, '1');
    this.close();
  }

  async finish() {
    localStorage.setItem(STORAGE_KEY, '1');
    // Nếu user chọn ngành ĐH/CĐ, pre-set ACTIVE_DOMAIN để home page mở đúng trường.
    // Format grade: 'dh:<domain-id>' (vd 'dh:pharmacy') hoặc 'self-learner' (giữ default).
    const g = String(this.data.grade || '');
    if (g.startsWith('dh:')) {
      const domainId = g.slice(3);
      if (domainId && domainId !== 'other') {
        try { localStorage.setItem('tizia:active-domain', domainId); } catch {}
      }
    }
    // Lưu pet + grade vào user_state (Sprint W3 sẽ render pet trong campus).
    try {
      await fetch('/api/user-state', {
        method: 'PUT', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          'engagement.pet': { id: this.data.pet, picked_at: Date.now() },
          'profile.grade': this.data.grade || null,
        }),
        credentials: 'same-origin',
      });
    } catch {}
    // Update display_name nếu user nhập mới
    if (this.data.displayName) {
      try {
        await fetch('/api/auth/me', {
          method: 'PATCH', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ display_name: this.data.displayName }),
          credentials: 'same-origin',
        });
      } catch {}
    }
    this.close();
    // Nhắc HUD refresh state
    try { window.__tziaEngagementHud?.refresh(); } catch {}
  }

  renderStep() {
    this.setProgress();
    if (this.step === 0) return this.renderStepName();
    if (this.step === 1) return this.renderStepGrade();
    if (this.step === 2) return this.renderStepPet();
    if (this.step === 3) return this.renderStepHud();
  }

  renderStepName() {
    this.body.innerHTML = `
      <h2>Chào em! 👋</h2>
      <p class="sub">Em tên gì nhỉ? Thầy AI sẽ gọi tên em mỗi khi trò chuyện.</p>
      <input id="tz-onb-name" type="text" maxlength="40" placeholder="Ví dụ: Minh, An, Linh…" value="${escapeHtml(this.data.displayName)}">
      <div class="tz-onb-actions">
        <button class="skip" data-skip>Bỏ qua hướng dẫn</button>
        <button class="next" data-next>Tiếp tục →</button>
      </div>
    `;
    const input = this.body.querySelector('#tz-onb-name');
    input.focus();
    input.addEventListener('input', e => { this.data.displayName = e.target.value.trim(); });
    input.addEventListener('keydown', e => { if (e.key === 'Enter') this.advance(); });
    this.bindActions();
  }

  renderStepGrade() {
    const g = String(this.data.grade);
    this.body.innerHTML = `
      <h2>Em đang học ở đâu?</h2>
      <p class="sub">Để Tizia gợi ý đúng môn + đúng trường cho em.</p>
      <select id="tz-onb-grade">
        <option value="">-- Chọn cấp học / ngành --</option>
        <optgroup label="🎒 Phổ thông">
          <option value="mam-non" ${g === 'mam-non' ? 'selected' : ''}>Mầm non (Mầm/Chồi/Lá)</option>
          ${Array.from({length: 12}, (_, i) => i + 1).map(n =>
            `<option value="${n}" ${g === String(n) ? 'selected' : ''}>Lớp ${n}</option>`
          ).join('')}
        </optgroup>
        <optgroup label="🎓 Đại học / Cao đẳng">
          <option value="dh:pharmacy"  ${g === 'dh:pharmacy'  ? 'selected' : ''}>💊 Sinh viên Dược</option>
          <option value="dh:it"        ${g === 'dh:it'        ? 'selected' : ''}>💻 Sinh viên CNTT</option>
          <option value="dh:economics" ${g === 'dh:economics' ? 'selected' : ''}>📉 Sinh viên Kinh tế (sắp mở)</option>
          <option value="dh:medicine"  ${g === 'dh:medicine'  ? 'selected' : ''}>⚕️ Sinh viên Y (sắp mở)</option>
          <option value="dh:law"       ${g === 'dh:law'       ? 'selected' : ''}>⚖️ Sinh viên Luật (sắp mở)</option>
          <option value="dh:other"     ${g === 'dh:other'     ? 'selected' : ''}>🎓 Sinh viên ngành khác</option>
        </optgroup>
        <optgroup label="💼 Khác">
          <option value="self-learner" ${g === 'self-learner' ? 'selected' : ''}>👨‍💻 Người đi làm · Tự học</option>
        </optgroup>
      </select>
      <div class="tz-onb-actions">
        <button class="skip" data-back>← Quay lại</button>
        <button class="next" data-next>Tiếp tục →</button>
      </div>
    `;
    const sel = this.body.querySelector('#tz-onb-grade');
    sel.focus();
    sel.addEventListener('change', e => { this.data.grade = e.target.value; });
    this.bindActions();
  }

  renderStepPet() {
    this.body.innerHTML = `
      <h2>Chọn bạn đồng hành 🐾</h2>
      <p class="sub">Pet đi cùng em trong trường ảo + tiến hoá theo em. <b style="color:#fde68a">Pet không khoá môn</b> — chỉ làm Thầy AI trò chuyện hợp tính em hơn. Chọn 1 bạn:</p>
      <div class="pets">
        ${PETS.map(p => `
          <div class="pet ${this.data.pet === p.id ? 'selected' : ''}" data-pet="${p.id}">
            <span class="emo">${p.emo}</span>
            <div class="nm">${p.name}</div>
            <div class="desc">${p.desc}</div>
          </div>
        `).join('')}
      </div>
      <div class="tz-onb-actions">
        <button class="skip" data-back>← Quay lại</button>
        <button class="next" data-next ${this.data.pet ? '' : 'disabled'}>Tiếp tục →</button>
      </div>
    `;
    this.body.querySelectorAll('.pet').forEach(el => {
      el.addEventListener('click', () => {
        this.data.pet = el.dataset.pet;
        this.renderStep();
      });
    });
    this.bindActions();
  }

  renderStepHud() {
    this.body.innerHTML = `
      <h2>Đây là góc Engagement 🔥</h2>
      <p class="sub">Mỗi ngày em vào học sẽ giữ <b style="color:#fbbf24">streak 🔥</b>, làm sai mất <b style="color:#ef4444">hearts ❤</b>, hoàn thành <b style="color:#34d399">3 nhiệm vụ 📋</b> để nhận coin/XP và leo bảng <b style="color:#fbbf24">League tuần 🏆</b>.</p>
      <p class="sub" style="font-size:12.5px;opacity:.75">Nhìn lên góc phải trên cùng — đó là HUD của em.</p>
      <div class="tz-onb-actions">
        <button class="skip" data-back>← Quay lại</button>
        <button class="next" data-next>Bắt đầu học! 🚀</button>
      </div>
    `;
    this.bindActions();
    this.highlightHud();
  }

  highlightHud() {
    const hud = document.querySelector('.tz-eng-hud');
    if (!hud) return;
    const rect = hud.getBoundingClientRect();
    const spot = document.createElement('div');
    spot.className = 'tz-onb-spotlight';
    const padding = 12;
    spot.style.left   = (rect.left   - padding) + 'px';
    spot.style.top    = (rect.top    - padding) + 'px';
    spot.style.width  = (rect.width  + padding * 2) + 'px';
    spot.style.height = (rect.height + padding * 2) + 'px';
    spot.style.borderRadius = '999px';
    document.body.appendChild(spot);
    const arrow = document.createElement('div');
    arrow.className = 'tz-onb-arrow';
    arrow.textContent = '⬆';
    arrow.style.left = (rect.left + rect.width / 2 - 20) + 'px';
    arrow.style.top  = (rect.bottom + 14) + 'px';
    document.body.appendChild(arrow);
  }

  bindActions() {
    this.body.querySelector('[data-next]')?.addEventListener('click', () => this.advance());
    this.body.querySelector('[data-back]')?.addEventListener('click', () => this.back());
    this.body.querySelector('[data-skip]')?.addEventListener('click', () => this.skip());
  }

  advance() {
    if (this.step === 3) { this.finish(); return; }
    this.step++;
    this.renderStep();
  }
  back() {
    if (this.step === 0) return;
    this.step--;
    this.renderStep();
  }
}

function escapeHtml(s) {
  return String(s || '').replace(/[&<>"']/g, c => ({
    '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;',
  }[c]));
}

function cleanLingeringModal() {
  // BFCache restore hoặc page-state cũ có thể để lại modal trong DOM dù
  // script mới đã quyết định KHÔNG hiện. Dọn dẹp + style bị inject 2 lần.
  document.querySelectorAll('.tz-onb-bg').forEach(m => m.remove());
}

async function maybeShow() {
  // Mutex đồng bộ — auth-header.js VÀ trang đều import file này (2 module
  // instance khác URL), cả 2 gọi maybeShow() gần như cùng lúc ở DOMContentLoaded.
  // Không dùng flag "đã chạy" vĩnh viễn: pageshow (bfcache) bên dưới cố ý gọi
  // lại maybeShow() sau khi hoàn tất, nên chỉ khoá lúc đang chạy, mở lại ở finally.
  if (window.__tziaOnboardingRunning) return;
  window.__tziaOnboardingRunning = true;
  try {
    return await maybeShowInner();
  } finally {
    window.__tziaOnboardingRunning = false;
  }
}

async function maybeShowInner() {
  // 1) Đã hoàn thành/skip ở thiết bị này → bỏ qua ngay.
  if (localStorage.getItem(STORAGE_KEY)) { cleanLingeringModal(); return; }
  // 2) Phải đăng nhập (HUD đã ẩn cho guest)
  let me = null;
  try {
    const r = await fetch('/api/auth/me', { credentials: 'same-origin' });
    if (!r.ok) return;
    me = await r.json();
    if (!me?.user) return;
  } catch { return; }
  // 3) Safety net: user đã hoàn tất hồ sơ → coi như xong onboarding luôn.
  //    Áp dụng cho admin/teacher/pupil-có-grade/student-có-major.
  const u = me.user;
  if (u.profile_complete === true || u.role === 'admin' || u.role === 'teacher') {
    localStorage.setItem(STORAGE_KEY, '1'); // state-sync sẽ flush lên server
    cleanLingeringModal();
    return;
  }
  // 4) Quan trọng — kiểm tra server-side state TRƯỚC khi mở modal: tránh race với
  //    state-sync hydrate (chạy bất đồng bộ qua dynamic import của pwa-register.js).
  //    Nếu user đã hoàn thành/skip ở MÁY KHÁC, server sẽ có flag, đồng bộ về local
  //    rồi return — không phiền user bằng popup lần nữa.
  try {
    const r = await fetch('/api/user-state', { credentials: 'same-origin' });
    if (r.ok) {
      const state = await r.json();
      const entry = state[STORAGE_KEY];
      if (entry?.value) {
        try { localStorage.setItem(STORAGE_KEY, entry.value); } catch {}
        cleanLingeringModal();
        return;
      }
    }
  } catch { /* ignore — fall through to show */ }
  // 5) Đợi HUD mount xong để spotlight đúng vị trí
  await new Promise(r => setTimeout(r, 800));
  const onb = new Onboarding();
  await onb.open();
}

// BFCache safety: nếu page khôi phục từ memory, modal cũ có thể còn trong DOM.
// Re-evaluate (sẽ tự clean nếu flag đã set hoặc safety net hit).
window.addEventListener('pageshow', (e) => {
  if (e.persisted) maybeShow();
});

// MutationObserver phòng vệ: nếu bất cứ code path nào (script cũ cache, bfcache,
// tab khác) chèn `.tz-onb-bg` vào DOM trong khi flag đã set → tự gỡ ngay.
try {
  const guard = new MutationObserver(() => {
    if (!localStorage.getItem(STORAGE_KEY)) return;
    document.querySelectorAll('.tz-onb-bg').forEach(el => el.remove());
  });
  guard.observe(document.documentElement, { childList: true, subtree: true });
} catch {}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', maybeShow);
} else {
  maybeShow();
}

// Expose để dev có thể test thủ công: __tziaShowOnboarding()
window.__tziaShowOnboarding = () => {
  localStorage.removeItem(STORAGE_KEY);
  new Onboarding().open();
};
