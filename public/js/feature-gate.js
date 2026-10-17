// Feature Gate Client — fetch /api/features/me + hide/lock UI dynamically.
// Cache 60s trong memory + localStorage để không bắn quá nhiều request.
//
// Element gate:
//   [data-feature="league"] → tự hide hoặc thay = "🔒 Mở khi…"
//   [data-feature-hide-if-locked] → ẩn hoàn toàn nếu locked (không show lock card)
//
// HUD/Pet/Daily auto-check khi mount.

const TTL_MS = 60_000;
const KEY_CACHE = 'tizia.features.cache';
let cached = null;
let lastFetch = 0;
let inflight = null;

async function loadFeatures() {
  if (cached && Date.now() - lastFetch < TTL_MS) return cached;
  if (inflight) return inflight;
  inflight = (async () => {
    try {
      const r = await fetch('/api/features/me', { credentials: 'same-origin' });
      if (r.status === 401) {
        // Guest: assume tier 0, no role-only features
        cached = { user_tier: 0, role: 'guest', features: {} };
      } else {
        cached = await r.json();
      }
      lastFetch = Date.now();
      try { localStorage.setItem(KEY_CACHE, JSON.stringify({ at: lastFetch, data: cached })); } catch {}
      return cached;
    } finally { inflight = null; }
  })();
  return inflight;
}

// Try restore from localStorage for instant render
try {
  const raw = localStorage.getItem(KEY_CACHE);
  if (raw) {
    const o = JSON.parse(raw);
    if (Date.now() - o.at < 5 * 60_000) {
      cached = o.data; lastFetch = o.at;
    }
  }
} catch {}

const CSS = `
  .tz-locked {
    position: relative; opacity: 0.55; cursor: not-allowed !important; pointer-events: none;
  }
  .tz-locked::after {
    content: '🔒'; position: absolute; top: 8px; right: 8px;
    background: rgba(15,23,42,0.85); color: #fbbf24;
    width: 28px; height: 28px; border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-size: 14px; box-shadow: 0 2px 6px rgba(0,0,0,0.3);
    pointer-events: auto; cursor: pointer;
  }
  .tz-locked-card {
    padding: 14px; background: rgba(15,23,42,0.5);
    border: 1px dashed rgba(255,255,255,0.15); border-radius: 12px;
    color: #94a3b8; text-align: center; font-size: 12.5px; line-height: 1.5;
  }
  .tz-locked-card b { color: #fbbf24; }

  .tz-feature-hidden { display: none !important; }

  .tz-unlock-toast {
    position: fixed; left: 50%; bottom: 100px; transform: translateX(-50%);
    z-index: 800; padding: 16px 26px;
    background: linear-gradient(135deg, #fbbf24, #f97316);
    color: #1e293b; border-radius: 16px;
    font-weight: 800; font-size: 14px;
    box-shadow: 0 14px 40px rgba(0,0,0,0.4);
    opacity: 0; pointer-events: none;
    transition: opacity 0.3s, transform 0.3s;
  }
  .tz-unlock-toast.show {
    opacity: 1; transform: translateX(-50%) translateY(0);
  }
`;

function injectCss() {
  if (document.getElementById('tz-feature-gate-css')) return;
  const s = document.createElement('style');
  s.id = 'tz-feature-gate-css'; s.textContent = CSS;
  document.head.appendChild(s);
}

function applyGates(root = document) {
  injectCss();
  const data = cached || { features: {} };
  root.querySelectorAll('[data-feature]').forEach(el => {
    const key = el.getAttribute('data-feature');
    const f = data.features[key];
    if (!f) return;        // Unknown feature → treat as unlocked
    if (f.unlocked) {
      el.classList.remove('tz-locked', 'tz-feature-hidden');
      el.title = f.name;
    } else {
      const hideMode = el.hasAttribute('data-feature-hide-if-locked');
      if (hideMode) {
        el.classList.add('tz-feature-hidden');
      } else {
        el.classList.add('tz-locked');
        el.title = `🔒 ${f.unlock_text || 'Sắp mở'}`;
        el.addEventListener('click', (e) => {
          e.preventDefault(); e.stopPropagation();
          showUnlockHint(f);
        }, { once: true, capture: true });
      }
    }
  });
}

function showUnlockHint(f) {
  let toast = document.querySelector('.tz-unlock-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'tz-unlock-toast';
    document.body.appendChild(toast);
  }
  toast.innerHTML = `🔒 <b>${f.name}</b>: ${f.unlock_text || 'Tiếp tục học để mở'}`;
  toast.classList.add('show');
  clearTimeout(toast._t);
  toast._t = setTimeout(() => toast.classList.remove('show'), 2800);
}

// Public helpers
window.__tziaFeatures = {
  async load() { await loadFeatures(); applyGates(); return cached; },
  isUnlocked(key) { return cached?.features?.[key]?.unlocked || false; },
  data() { return cached; },
  reapply() { applyGates(); },
};

// Auto-mount: load + apply
async function autoMount() {
  await loadFeatures();
  applyGates();
  // Re-apply mỗi 5s cho content add động (Pet drawer, HUD, etc.)
  setInterval(() => applyGates(), 5000);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', autoMount);
} else {
  autoMount();
}

export { loadFeatures, applyGates };
