// School Explore Widget — embed vào school.html.
// Hiển thị các hoạt động khả dụng cho trường HS đang vào (theo domain query).
// Chỉ scope:'school' features + filter domain. Cross-school (League/BP/Shop)
// nằm ở HUD/widget global riêng.
//
// Usage trong school.html:
//   <div id="school-explore-host"></div>
//   <script type="module" src="./js/school-explore.js"></script>

const CSS = `
  .tz-se-wrap {
    max-width: 1100px; margin: 18px auto 40px; padding: 0 18px;
  }
  .tz-se-head {
    display: flex; align-items: center; gap: 14px; margin-bottom: 14px;
    flex-wrap: wrap;
  }
  .tz-se-head h2 {
    margin: 0; font-size: 20px; font-weight: 800;
    background: linear-gradient(135deg, #fbbf24, #ec4899);
    -webkit-background-clip: text; background-clip: text; color: transparent;
  }
  .tz-se-head .sub { color: rgba(255,255,255,0.6); font-size: 13px; }
  .tz-se-head .pill {
    margin-left: auto; padding: 5px 12px; border-radius: 999px;
    background: rgba(34,197,94,0.18); color: #86efac;
    font-size: 12px; font-weight: 700;
  }

  .tz-se-tier {
    margin-bottom: 18px;
  }
  .tz-se-tier-h {
    display: flex; align-items: center; gap: 10px; margin-bottom: 10px;
    padding-bottom: 6px; border-bottom: 1px dashed rgba(255,255,255,0.1);
  }
  .tz-se-tier-h .ic {
    width: 24px; height: 24px; border-radius: 6px;
    display: flex; align-items: center; justify-content: center;
    font-size: 12px; font-weight: 800;
  }
  .tz-se-tier-h.t0 .ic { background: rgba(34,197,94,0.2); color: #34d399; }
  .tz-se-tier-h.t1 .ic { background: rgba(251,191,36,0.2); color: #fbbf24; }
  .tz-se-tier-h.t2 .ic { background: rgba(96,165,250,0.2); color: #60a5fa; }
  .tz-se-tier-h.t3 .ic { background: rgba(167,139,250,0.2); color: #a78bfa; }
  .tz-se-tier-h.t4 .ic { background: rgba(236,72,153,0.2); color: #ec4899; }
  .tz-se-tier-h.t5 .ic { background: rgba(220,38,38,0.2); color: #ef4444; }
  .tz-se-tier-h.t6 .ic { background: rgba(245,158,11,0.2); color: #f59e0b; }
  .tz-se-tier-h .nm {
    font-size: 14px; font-weight: 700; color: rgba(255,255,255,0.85);
  }
  .tz-se-tier-h .cnt {
    margin-left: auto; font-size: 11px; color: rgba(255,255,255,0.5);
    font-weight: 700;
  }

  .tz-se-grid {
    display: grid; grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    gap: 10px;
  }
  .tz-se-card {
    background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.10);
    border-radius: 12px; padding: 12px; transition: transform 0.15s, border-color 0.15s;
    text-decoration: none; color: inherit; display: flex; flex-direction: column; gap: 4px;
    position: relative; min-height: 96px;
  }
  .tz-se-card:not(.locked):hover {
    transform: translateY(-2px); border-color: rgba(251,191,36,0.45);
    background: rgba(255,255,255,0.07);
  }
  .tz-se-card.locked {
    opacity: 0.5; cursor: not-allowed; background: rgba(15,23,42,0.45);
    border-style: dashed; pointer-events: none;
  }
  .tz-se-card.locked::after {
    content: '🔒'; position: absolute; top: 8px; right: 8px; font-size: 13px;
  }
  .tz-se-card .ic { font-size: 22px; line-height: 1; }
  .tz-se-card .nm {
    font-weight: 700; font-size: 12.5px; line-height: 1.3;
    color: #fff;
  }
  .tz-se-card .hint {
    font-size: 10.5px; color: rgba(251,191,36,0.85); margin-top: auto;
  }

  .tz-se-empty {
    color: rgba(255,255,255,0.5); text-align: center; padding: 20px;
    font-size: 13px;
  }
`;

const DOMAIN_LABEL = {
  preschool: 'Mầm non', primary: 'Tiểu học',
  secondary: 'THCS', highschool: 'THPT',
  pharmacy: 'Trường Dược', it: 'Trường CNTT', economic: 'Trường Kinh tế',
};

const TIER_META = [
  { i:0, ic:'🌱', name:'Mở sẵn' },
  { i:1, ic:'🔥', name:'Sau câu quiz đầu' },
  { i:2, ic:'⭐', name:'Streak 3 ngày' },
  { i:3, ic:'⚡', name:'30 câu đúng' },
  { i:4, ic:'🧠', name:'10 kỹ năng' },
  { i:5, ic:'🏆', name:'30 ngày học' },
  { i:6, ic:'💎', name:'Pro/GV' },
];

function getDomain() {
  return new URLSearchParams(location.search).get('domain') || 'pharmacy';
}

function injectCss() {
  if (document.getElementById('tz-se-css')) return;
  const s = document.createElement('style');
  s.id = 'tz-se-css'; s.textContent = CSS;
  document.head.appendChild(s);
}

async function mount() {
  const host = document.getElementById('school-explore-host');
  if (!host) return;
  injectCss();
  const domain = getDomain();
  const label = DOMAIN_LABEL[domain] || domain;
  try {
    const r = await fetch(`/api/features/me?scope=school&domain=${encodeURIComponent(domain)}`, {
      credentials: 'same-origin',
    });
    if (r.status === 401) {
      // Guest: chỉ hiện AI Tutor + module trường (đã có)
      host.innerHTML = `<div class="tz-se-wrap"><div class="tz-se-head">
        <h2>🗺 Khám phá ${label}</h2>
        <span class="sub">Đăng nhập để mở khoá thêm hoạt động.</span>
        <a href="/login.html" class="pill">Đăng nhập →</a>
      </div></div>`;
      return;
    }
    const data = await r.json();
    render(host, data, label);
  } catch (e) {
    console.warn('[school-explore] load failed', e);
  }
}

function render(host, data, label) {
  const groups = {};
  for (const [key, f] of Object.entries(data.features)) {
    if (!groups[f.tier]) groups[f.tier] = [];
    groups[f.tier].push({ ...f, key });
  }
  const total = Object.keys(data.features).length;
  const unlocked = Object.values(data.features).filter(f => f.unlocked).length;

  host.innerHTML = `
    <div class="tz-se-wrap">
      <div class="tz-se-head">
        <h2>🗺 Khám phá ${esc(label)}</h2>
        <span class="sub">Hoạt động trong trường, mở dần theo tiến độ học.</span>
        <span class="pill">Lv ${data.user_tier} · ${unlocked}/${total}</span>
      </div>
      ${TIER_META.map(meta => renderTier(meta, groups[meta.i] || [], data.user_tier)).join('')}
    </div>
  `;
}

function renderTier(meta, items, userTier) {
  if (items.length === 0) return '';
  return `
    <div class="tz-se-tier">
      <div class="tz-se-tier-h t${meta.i}">
        <div class="ic">${meta.ic}</div>
        <div class="nm">${esc(meta.name)}</div>
        <div class="cnt">${items.filter(f=>f.unlocked).length}/${items.length}</div>
      </div>
      <div class="tz-se-grid">
        ${items.map(f => {
          const emoji = (f.name||'').match(/[\p{Emoji}]+/u)?.[0] || '✨';
          const name = (f.name||'').replace(/[\p{Emoji}]+/gu,'').trim();
          if (f.unlocked && f.url) {
            return `
              <a class="tz-se-card" href="${esc(f.url)}">
                <div class="ic">${emoji}</div>
                <div class="nm">${esc(name)}</div>
              </a>
            `;
          }
          if (f.unlocked) {
            return `
              <div class="tz-se-card">
                <div class="ic">${emoji}</div>
                <div class="nm">${esc(name)}</div>
                ${f.desc ? `<div class="hint" style="color:rgba(255,255,255,0.5)">${esc(f.desc)}</div>` : ''}
              </div>
            `;
          }
          return `
            <div class="tz-se-card locked">
              <div class="ic">${emoji}</div>
              <div class="nm">${esc(name)}</div>
              <div class="hint">${esc(f.unlock_text || 'Sắp mở')}</div>
            </div>
          `;
        }).join('')}
      </div>
    </div>
  `;
}

function esc(s) { return String(s||'').replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c])); }

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', mount);
} else {
  mount();
}
