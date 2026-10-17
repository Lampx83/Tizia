// Reusable Unity-style welcome card — parchment look-and-feel inspired by chemistry-lab tutorial overlays.
// Usage:
//   import { showWelcomeCard } from './js/welcome-card.js';
//   showWelcomeCard({
//     icon: '💊',
//     title: 'Chào mừng đến phòng dược 3D',
//     intro: 'Hướng dẫn nhanh trước khi bắt đầu',
//     bullets: [
//       'Mở thùng carton bằng cách bấm/pinch lên nó',
//       'Pick-up từng hộp thuốc trong thùng',
//       'Đặt vào ô kệ đúng nhóm điều trị',
//     ],
//     controls: { keys: ['W','A','S','D'], mouse: 'left', extras: [{ key: 'E', desc: 'tương tác' }] },
//     persistKey: 'tizia:welcome:3d-shelf',
//     dismissLabel: 'Bắt đầu',
//   });

import { lsGet, lsSet } from './engine/storage.js';

const STYLE_ID = 'welcome-card-style';

function injectStyle() {
  if (document.getElementById(STYLE_ID)) return;
  const css = `
  .wc-backdrop {
    position: fixed; inset: 0; z-index: 9000;
    background: radial-gradient(ellipse 80% 60% at 50% 50%, rgba(0,0,0,0.55), rgba(0,0,0,0.78));
    backdrop-filter: blur(3px);
    display: flex; align-items: center; justify-content: center;
    padding: 18px; font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
    animation: wc-bd-fade .25s ease-out both;
  }
  @keyframes wc-bd-fade { from { opacity: 0 } to { opacity: 1 } }
  .wc-card {
    position: relative;
    width: min(560px, 100%);
    background:
      linear-gradient(160deg, #f6e3a8 0%, #ecd286 55%, #e1c074 100%);
    color: #3e2a14;
    border-radius: 28px;
    padding: 26px 30px 22px;
    box-shadow:
      0 25px 60px rgba(0,0,0,0.45),
      inset 0 0 0 3px #c39a52,
      inset 0 0 0 6px rgba(255,255,255,0.5),
      inset 0 -8px 18px rgba(120,80,30,0.18);
    animation: wc-pop .35s cubic-bezier(.2,1.3,.5,1) both;
    overflow: hidden;
  }
  @keyframes wc-pop {
    from { transform: scale(.85) translateY(20px); opacity: 0; }
    to { transform: scale(1) translateY(0); opacity: 1; }
  }
  /* Wavy paper-tape edge at the top, visually echoes the Unity hint cards */
  .wc-card::before {
    content: ''; position: absolute; top: 0; left: 0; right: 0; height: 14px;
    background:
      radial-gradient(circle at 8px 14px, transparent 8px, #c39a52 8px 9px, transparent 10px) repeat-x;
    background-size: 26px 14px;
    opacity: .35;
  }
  .wc-card::after {
    content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 14px;
    background:
      radial-gradient(circle at 8px 0, transparent 8px, #c39a52 8px 9px, transparent 10px) repeat-x;
    background-size: 26px 14px;
    opacity: .35;
  }
  .wc-head {
    display: flex; align-items: center; gap: 14px; margin-bottom: 12px;
  }
  .wc-icon {
    width: 48px; height: 48px; flex: 0 0 48px;
    background: radial-gradient(circle at 30% 30%, #fff7d6, #f0c870);
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-size: 26px;
    box-shadow: inset 0 0 0 2px #b3823a, 0 3px 6px rgba(0,0,0,0.2);
  }
  .wc-title { font-size: 22px; font-weight: 800; letter-spacing: -.2px; line-height: 1.15; color: #2c1d0a; }
  .wc-intro { font-size: 13px; opacity: .8; margin-top: 2px; }
  .wc-bullets {
    list-style: none; padding: 0; margin: 0 0 14px;
    display: flex; flex-direction: column; gap: 6px;
  }
  .wc-bullets li {
    font-size: 14px; line-height: 1.5;
    padding-left: 22px; position: relative;
  }
  .wc-bullets li::before {
    content: '–'; position: absolute; left: 4px; top: 0; font-weight: 800; color: #6b431e;
  }
  .wc-controls {
    display: flex; align-items: center; justify-content: center; gap: 18px;
    padding: 12px 6px 6px;
  }
  .wc-keypad {
    display: inline-grid;
    grid-template-columns: repeat(3, 36px);
    grid-template-rows: repeat(2, 36px);
    gap: 6px;
  }
  .wc-key {
    background:
      linear-gradient(180deg, #fefefe 0%, #ddd 100%);
    color: #2c1d0a;
    border-radius: 7px;
    border: 1.5px solid #8b6a3e;
    box-shadow:
      0 3px 0 #826133,
      0 4px 6px rgba(0,0,0,0.25),
      inset 0 1px 0 #fff;
    display: flex; align-items: center; justify-content: center;
    font-size: 14px; font-weight: 700;
    width: 36px; height: 36px;
    user-select: none;
    transition: transform .08s ease;
  }
  .wc-key.wc-empty { background: transparent; border: none; box-shadow: none; }
  .wc-key.wc-press { animation: wc-press 1.4s ease-in-out infinite; }
  @keyframes wc-press {
    0%, 100% { transform: translateY(0); box-shadow: 0 3px 0 #826133, 0 4px 6px rgba(0,0,0,0.25), inset 0 1px 0 #fff; }
    50% { transform: translateY(3px); box-shadow: 0 0 0 #826133, 0 2px 3px rgba(0,0,0,0.25), inset 0 1px 0 #fff; }
  }
  .wc-plus { font-size: 22px; font-weight: 800; color: #6b431e; opacity: .55; }
  .wc-mouse {
    width: 56px; height: 80px;
    position: relative;
  }
  .wc-extras {
    display: flex; flex-direction: column; gap: 8px; align-items: flex-start;
  }
  .wc-extra { display: flex; align-items: center; gap: 8px; font-size: 13px; color: #3e2a14; }
  .wc-foot {
    display: flex; justify-content: space-between; align-items: center;
    margin-top: 8px; gap: 12px; flex-wrap: wrap;
  }
  .wc-persist {
    display: inline-flex; align-items: center; gap: 6px;
    font-size: 12px; color: #5b3d18; cursor: pointer;
  }
  .wc-persist input { accent-color: #8b6a3e; }
  .wc-start {
    background: linear-gradient(180deg, #4caf50 0%, #2e7d32 100%);
    color: #fff;
    border: none; border-radius: 10px;
    padding: 10px 22px; font-size: 14px; font-weight: 700;
    cursor: pointer; font-family: inherit;
    box-shadow: 0 3px 0 #1b5e20, 0 6px 12px rgba(0,0,0,0.25);
    transition: transform .08s ease;
  }
  .wc-start:hover { transform: translateY(-1px); }
  .wc-start:active { transform: translateY(2px); box-shadow: 0 1px 0 #1b5e20, 0 3px 6px rgba(0,0,0,0.25); }
  .wc-tip {
    font-style: italic; font-size: 12px; color: #5b3d18; text-align: center;
    margin-top: 10px; opacity: .8;
  }
  @media (max-width: 520px) {
    .wc-card { padding: 22px 20px 18px; border-radius: 22px; }
    .wc-title { font-size: 18px; }
    .wc-bullets li { font-size: 13px; }
    .wc-controls { gap: 10px; }
    .wc-mouse { width: 46px; height: 66px; }
  }
  `;
  const style = document.createElement('style');
  style.id = STYLE_ID;
  style.textContent = css;
  document.head.appendChild(style);
}

function svgMouse(highlight = 'left') {
  // SVG mouse icon — body + scroll wheel + highlighted button
  const leftFill = highlight === 'left' ? '#43a047' : '#fff';
  const rightFill = highlight === 'right' ? '#43a047' : '#fff';
  return `
  <svg class="wc-mouse" viewBox="0 0 64 92" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <defs>
      <linearGradient id="wcMouseBody" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#fafafa"/>
        <stop offset="1" stop-color="#cfcfcf"/>
      </linearGradient>
    </defs>
    <path d="M8 30 Q8 6 32 6 Q56 6 56 30 L56 70 Q56 86 32 86 Q8 86 8 70 Z"
          fill="url(#wcMouseBody)" stroke="#8b6a3e" stroke-width="2.5"/>
    <path d="M8 30 Q8 6 32 6 L32 42 L8 42 Z" fill="${leftFill}" opacity="0.85" stroke="#8b6a3e" stroke-width="2"/>
    <path d="M56 30 Q56 6 32 6 L32 42 L56 42 Z" fill="${rightFill}" opacity="0.85" stroke="#8b6a3e" stroke-width="2"/>
    <rect x="29" y="14" width="6" height="14" rx="3" fill="#8b6a3e"/>
    <circle cx="32" cy="20" r="1.5" fill="#fffbe8"/>
  </svg>
  `;
}

function keyHtml(label, opts = {}) {
  if (!label) return '<div class="wc-key wc-empty"></div>';
  const cls = opts.press ? 'wc-key wc-press' : 'wc-key';
  return `<div class="${cls}">${label}</div>`;
}

function keypadHtml(keys) {
  // keys = array of strings up to 4 (top row 1, bottom row 3). Default = WASD layout.
  // Support either an array of 4 (e.g. ['W','A','S','D']) or arbitrary.
  const k = keys || ['W','A','S','D'];
  if (k.length >= 4) {
    return `
    <div class="wc-keypad">
      ${keyHtml('')}${keyHtml(k[0], { press: true })}${keyHtml('')}
      ${keyHtml(k[1])}${keyHtml(k[2])}${keyHtml(k[3])}
    </div>`;
  }
  // Fallback: single row
  return `<div class="wc-keypad" style="grid-template-columns:repeat(${k.length}, 36px);grid-template-rows:36px">
    ${k.map(label => keyHtml(label)).join('')}
  </div>`;
}

function extrasHtml(extras) {
  if (!extras?.length) return '';
  return `<div class="wc-extras">
    ${extras.map(({ key, desc }) => `<div class="wc-extra">${keyHtml(key)} <span>${desc}</span></div>`).join('')}
  </div>`;
}

/**
 * Show a tutorial overlay. Returns a Promise that resolves to { dontShowAgain: boolean } when dismissed.
 * If persistKey is provided and the user previously checked 'don't show', resolves immediately without rendering.
 */
export function showWelcomeCard(opts = {}) {
  injectStyle();
  const {
    icon = '💊',
    title = 'Tizia',
    intro = '',
    bullets = [],
    controls = {},
    persistKey = '',
    dismissLabel = 'Bắt đầu',
    tip = '',
  } = opts;

  // Skip if user opted out previously (auto-migrate old `pharmacysim:*` key)
  if (persistKey && lsGet(persistKey) === 'hidden') {
    return Promise.resolve({ dontShowAgain: true, skipped: true });
  }

  return new Promise((resolve) => {
    const backdrop = document.createElement('div');
    backdrop.className = 'wc-backdrop';
    backdrop.innerHTML = `
      <div class="wc-card" role="dialog" aria-modal="true" aria-labelledby="wc-title">
        <div class="wc-head">
          <div class="wc-icon">${icon}</div>
          <div>
            <div class="wc-title" id="wc-title">${title}</div>
            ${intro ? `<div class="wc-intro">${intro}</div>` : ''}
          </div>
        </div>
        <ul class="wc-bullets">
          ${bullets.map(b => `<li>${b}</li>`).join('')}
        </ul>
        <div class="wc-controls">
          ${controls.keys !== null ? keypadHtml(controls.keys) : ''}
          ${controls.keys !== null && controls.mouse !== null ? '<div class="wc-plus">+</div>' : ''}
          ${controls.mouse !== null ? svgMouse(controls.mouse || 'left') : ''}
          ${extrasHtml(controls.extras)}
        </div>
        ${tip ? `<div class="wc-tip">${tip}</div>` : ''}
        <div class="wc-foot">
          ${persistKey ? `<label class="wc-persist"><input type="checkbox" id="wc-dont"> Không hiện lại lần sau</label>` : '<span></span>'}
          <button type="button" class="wc-start" id="wc-start">${dismissLabel}</button>
        </div>
      </div>
    `;
    document.body.appendChild(backdrop);

    const card = backdrop.querySelector('.wc-card');
    const startBtn = backdrop.querySelector('#wc-start');
    const dontEl = backdrop.querySelector('#wc-dont');

    function close() {
      const dontShowAgain = !!dontEl?.checked;
      if (dontShowAgain && persistKey) lsSet(persistKey, 'hidden');
      backdrop.style.animation = 'wc-bd-fade .18s ease-in reverse forwards';
      card.style.animation = 'wc-pop .18s ease-in reverse forwards';
      setTimeout(() => { backdrop.remove(); }, 180);
      resolve({ dontShowAgain, skipped: false });
    }

    startBtn.addEventListener('click', close);
    backdrop.addEventListener('click', (e) => { if (e.target === backdrop) close(); });
    const onKey = (e) => {
      if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') {
        e.preventDefault(); close();
        document.removeEventListener('keydown', onKey);
      }
    };
    document.addEventListener('keydown', onKey);

    // Auto-focus the start button for keyboard accessibility
    setTimeout(() => startBtn.focus(), 50);
  });
}
