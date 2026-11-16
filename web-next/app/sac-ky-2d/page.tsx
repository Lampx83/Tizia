'use client';

import { useEffect } from 'react';

// WRAP-MOUNT: trang gốc /public/sac-ky-2d.html là mô phỏng Sắc ký lớp mỏng (TLC)
// bằng canvas 2D thuần vanilla. Ở đây tái hiện NGUYÊN VĂN skeleton DOM + <style>
// gốc, rồi nạp toàn bộ script gốc (đã copy sang /public/legacy/sac-ky-2d.js)
// bằng <script type="module"> (script gốc dùng import từ /js/api.js).
// Engine tự querySelector theo id gốc. Không viết lại engine.

const STYLE = `
  :root {
    --bg-1: #0f172a;
    --bg-2: #1e293b;
    --accent: #a78bfa;
    --ok: #10b981;
    --err: #ef4444;
    --warn: #fbbf24;
  }
  * { box-sizing: border-box; }
  html, body { margin: 0; height: 100%; font-family: 'Inter', system-ui, sans-serif; color: white; overflow: hidden; }
  body {
    background:
      radial-gradient(ellipse 80% 50% at 50% 0%, rgba(139,92,246,0.20), transparent),
      linear-gradient(180deg, var(--bg-1) 0%, var(--bg-2) 100%);
  }
  .topbar {
    position: fixed; top: 0; left: 0; right: 0; z-index: 10;
    display: flex; gap: 14px; align-items: center;
    padding: 10px 16px;
    background: rgba(0,0,0,0.4);
    backdrop-filter: blur(10px);
    border-bottom: 1px solid rgba(255,255,255,0.08);
    font-size: 13px;
  }
  .topbar a { color: white; opacity: 0.7; text-decoration: none; }
  .topbar a:hover { opacity: 1; }
  .topbar .spacer { flex: 1; }
  .stat { display: inline-flex; gap: 6px; align-items: center; }
  .stat b { color: var(--accent); font-weight: 700; }
  .step-pill {
    background: var(--accent); color: #1f1147; padding: 4px 10px;
    border-radius: 14px; font-weight: 700; font-size: 12px;
  }
  canvas { display: block; position: absolute; top: 0; left: 0; touch-action: none; }
  .panel {
    position: fixed; bottom: 16px; left: 50%; transform: translateX(-50%);
    background: rgba(0,0,0,0.6); backdrop-filter: blur(12px);
    border: 1px solid rgba(255,255,255,0.12);
    border-radius: 14px; padding: 12px 18px;
    display: flex; gap: 10px; align-items: center;
    z-index: 10; max-width: 92vw; flex-wrap: wrap; justify-content: center;
  }
  .panel button {
    background: var(--accent); color: #1f1147; border: none;
    padding: 8px 16px; border-radius: 10px;
    font-family: inherit; font-weight: 700; font-size: 13px;
    cursor: pointer; transition: transform 0.1s, filter 0.15s;
  }
  .panel button:hover:not(:disabled) { transform: translateY(-1px); filter: brightness(1.1); }
  .panel button:disabled { opacity: 0.4; cursor: not-allowed; }
  .panel .hint { font-size: 13px; opacity: 0.9; }

  .toast {
    position: fixed; top: 60px; left: 50%; transform: translateX(-50%);
    background: rgba(0,0,0,0.85); color: white;
    padding: 10px 18px; border-radius: 10px;
    font-size: 14px; z-index: 20;
    animation: toastIn 0.3s ease;
    border-left: 3px solid var(--accent);
  }
  @keyframes toastIn { from { opacity: 0; transform: translate(-50%, -8px); } to { opacity: 1; transform: translate(-50%, 0); } }
  .toast.err { border-left-color: var(--err); }
  .toast.ok { border-left-color: var(--ok); }

  .modal {
    position: fixed; inset: 0; z-index: 30;
    background: rgba(0,0,0,0.7); backdrop-filter: blur(6px);
    display: none; align-items: center; justify-content: center;
  }
  .modal.show { display: flex; }
  .modal-card {
    background: linear-gradient(135deg, #1e293b, #312e81);
    border-radius: 16px; padding: 24px 28px;
    max-width: 500px; width: 90vw;
    border: 1px solid rgba(255,255,255,0.15);
    box-shadow: 0 20px 60px rgba(0,0,0,0.5);
  }
  .modal h2 { margin: 0 0 12px; font-size: 24px; }
  .modal .score { font-size: 56px; font-weight: 800; text-align: center; color: var(--accent); line-height: 1; margin: 12px 0; }
  .modal .row { display: flex; justify-content: space-between; padding: 6px 0; border-bottom: 1px solid rgba(255,255,255,0.08); font-size: 14px; }
  .modal .row:last-child { border-bottom: none; }
  .modal-btns { display: flex; gap: 10px; margin-top: 18px; justify-content: center; flex-wrap: wrap; }
  .modal-btns button, .modal-btns a {
    padding: 10px 18px; border-radius: 10px; border: none;
    font-family: inherit; font-weight: 700; font-size: 14px; cursor: pointer;
    text-decoration: none; color: white; text-align: center;
  }
  .modal-btns .primary { background: var(--accent); color: #1f1147; }
  .modal-btns .outline { background: transparent; border: 1px solid rgba(255,255,255,0.2); }

  /* Tutorial overlay panel */
  .tutorial {
    position: fixed; bottom: 80px; left: 50%; transform: translateX(-50%);
    background: linear-gradient(135deg, rgba(31,17,71,0.95), rgba(46,16,101,0.95));
    border: 1px solid rgba(167,139,250,0.4);
    border-radius: 14px; padding: 12px 18px;
    max-width: 460px; width: calc(100vw - 40px);
    z-index: 9; backdrop-filter: blur(14px);
    box-shadow: 0 8px 30px rgba(0,0,0,0.4);
    pointer-events: none;
  }
  .tutorial .tut-head { display: flex; align-items: center; gap: 8px; margin-bottom: 4px; }
  .tutorial .tut-num {
    width: 26px; height: 26px; border-radius: 50%;
    background: linear-gradient(135deg, #a78bfa, #ec4899);
    display: inline-flex; align-items: center; justify-content: center;
    font-weight: 800; font-size: 13px; color: white; flex-shrink: 0;
  }
  .tutorial .tut-title { font-size: 14px; font-weight: 700; }
  .tutorial .tut-body { font-size: 12.5px; line-height: 1.45; opacity: 0.92; margin-top: 2px; }
  .tutorial .tut-hint { font-size: 10.5px; opacity: 0.65; margin-top: 4px; font-style: italic; }

  /* Mobile optimizations */
  @media (max-width: 720px) {
    .topbar { font-size: 11px; padding: 8px 10px; gap: 8px; flex-wrap: wrap; }
    .topbar a { font-size: 11px; }
    .step-pill { font-size: 10px; padding: 3px 8px; }
    .stat { font-size: 11px; }
    .panel { padding: 8px 12px; bottom: 12px; }
    .panel button { padding: 11px 16px; min-height: 44px; font-size: 12px; }
    .panel .hint { font-size: 11px; }
    .modal-card { padding: 20px 22px; }
    .modal h2 { font-size: 20px; }
    .modal .score { font-size: 44px; }
    .modal .row { font-size: 13px; }
  }
`;

// Markup <body> gốc, GIỮ NGUYÊN mọi id/class/href để script cũ querySelector trúng.
const SKELETON = `
<div class="topbar">
  <a href="/sac-ky-vr">← Hub Sắc ký</a>
  <span class="step-pill" id="step-pill">Bước 1/6</span>
  <span class="stat">⏱️ <b id="timer">0s</b></span>
  <span class="stat">🎯 <b id="score">0</b></span>
  <span class="spacer"></span>
  <span class="stat" style="opacity:0.7" id="hint-text">Click vào 1 lọ mẫu để bắt đầu chấm</span>
</div>

<canvas id="canvas"></canvas>

<div class="tutorial" id="tutorial">
  <div class="tut-head">
    <span class="tut-num" id="tut-num">2</span>
    <span class="tut-title" id="tut-title">Chấm mẫu lên đường gốc</span>
  </div>
  <div class="tut-body" id="tut-body">Click 1 lọ mẫu (A/B/C) để hút bằng mao quản, sau đó click lên đĩa TLC để chấm.</div>
  <div class="tut-hint" id="tut-hint">💡 Mỗi mẫu chỉ chấm 1 lần. Hoàn thành cả 3 mẫu để tiếp tục.</div>
</div>

<div class="panel" id="panel">
  <button id="btn-action" disabled>Thao tác</button>
  <button id="btn-restart">↺ Chơi lại</button>
</div>

<div class="modal" id="modal">
  <div class="modal-card">
    <h2 id="modal-title">🎉 Hoàn thành!</h2>
    <div class="score" id="modal-score">0</div>
    <div id="modal-details"></div>
    <div class="modal-btns">
      <button class="primary" id="modal-replay">↺ Chơi lại</button>
      <a class="outline" href="/sac-ky-vr">← Hub</a>
      <a class="outline" href="/">🏠 Trang chính</a>
    </div>
  </div>
</div>
`;

export default function SacKy2DPage() {
  useEffect(() => {
    // Skeleton đã render (JSX bên dưới) trước khi effect chạy → nạp engine gốc.
    const script = document.createElement('script');
    script.type = 'module'; // script gốc dùng import từ /js/api.js
    script.src = `/legacy/sac-ky-2d.js?ts=${Date.now()}`;
    document.body.appendChild(script);
    return () => {
      script.remove();
    };
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STYLE }} />
      <div dangerouslySetInnerHTML={{ __html: SKELETON }} />
    </>
  );
}
