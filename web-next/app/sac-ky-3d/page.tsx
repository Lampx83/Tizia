'use client';

import { useEffect } from 'react';

// Wrap-mount trang Next /sac-ky-3d (Three.js sắc ký lớp mỏng TLC 3D — engine nặng 2019 dòng).
// Chiến lược WRAP-MOUNT: KHÔNG viết lại engine sang React. Ở đây chỉ:
//  1) Dựng lại đúng khung DOM tĩnh của <body> gốc (splash/topbar/tutorial/panel/modal…)
//     + CSS gốc chèn nguyên văn vào <head> — engine append <canvas> thẳng vào
//     document.body nên CSS phải ở phạm vi document, KHÔNG scope container.
//  2) Inject <script type="importmap"> (map bare specifier `three` + `three/addons/`
//     sang CDN) TRƯỚC khi nạp module — importmap phải có mặt trước khi module resolve import.
//  3) Nạp public/legacy/sac-ky-3d.js dạng <script type="module"> (giữ đúng loại vì
//     script gốc dùng `import * as THREE ...`).
// Effect chạy sau paint → skeleton đã render → engine querySelector/append an toàn.

// CSS gốc (public/sac-ky-3d.html <style>) — nguyên văn. Engine append <canvas> thẳng
// vào document.body nên để ở phạm vi document, không scope container.
const LEGACY_CSS = `
  html, body { margin: 0; height: 100%; overflow: hidden; background: #1a1f2e; font-family: 'Inter', system-ui, sans-serif; color: white; touch-action: none; }
  canvas { display: block; touch-action: none; }
  .topbar {
    position: fixed; top: 0; left: 0; right: 0; z-index: 10;
    display: flex; gap: 14px; align-items: center;
    padding: 10px 16px;
    background: rgba(0,0,0,0.55);
    backdrop-filter: blur(12px);
    border-bottom: 1px solid rgba(255,255,255,0.08);
    font-size: 13px;
  }
  .topbar a { color: white; opacity: 0.75; text-decoration: none; }
  .topbar a:hover { opacity: 1; }
  .topbar .spacer { flex: 1; }
  .stat { display: inline-flex; gap: 6px; align-items: center; }
  .stat b { color: #a78bfa; font-weight: 700; }
  .step-pill {
    background: linear-gradient(135deg, #a78bfa, #8b5cf6);
    color: white; padding: 5px 12px;
    border-radius: 14px; font-weight: 700; font-size: 12px;
    box-shadow: 0 2px 8px rgba(167,139,250,0.4);
  }
  /* Tutorial overlay panel — Unity-curved-UI style */
  .tutorial {
    position: fixed; bottom: 100px; left: 50%; transform: translateX(-50%);
    background: linear-gradient(135deg, rgba(31,17,71,0.95), rgba(46,16,101,0.95));
    border: 1px solid rgba(167,139,250,0.4);
    border-radius: 18px; padding: 16px 22px;
    max-width: 520px; width: calc(100vw - 40px);
    z-index: 9; backdrop-filter: blur(14px);
    box-shadow: 0 12px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(167,139,250,0.15);
  }
  .tutorial .tut-head {
    display: flex; align-items: center; gap: 10px; margin-bottom: 6px;
  }
  .tutorial .tut-num {
    width: 32px; height: 32px; border-radius: 50%;
    background: linear-gradient(135deg, #a78bfa, #ec4899);
    display: inline-flex; align-items: center; justify-content: center;
    font-weight: 800; font-size: 16px; color: white;
    flex-shrink: 0; box-shadow: 0 0 14px rgba(236,72,153,0.4);
  }
  .tutorial .tut-title {
    font-size: 16px; font-weight: 700; color: #fff;
  }
  .tutorial .tut-body {
    font-size: 13.5px; line-height: 1.55; opacity: 0.92; margin-top: 4px;
  }
  .tutorial .tut-hint {
    font-size: 11px; opacity: 0.65; margin-top: 6px;
    font-style: italic;
  }

  .panel {
    position: fixed; bottom: 16px; left: 50%; transform: translateX(-50%);
    background: rgba(0,0,0,0.65); backdrop-filter: blur(14px);
    border: 1px solid rgba(255,255,255,0.12);
    border-radius: 14px; padding: 10px 16px;
    display: flex; gap: 10px; align-items: center;
    z-index: 10; max-width: 92vw; flex-wrap: wrap; justify-content: center;
  }
  .panel button {
    background: linear-gradient(135deg, #a78bfa, #8b5cf6);
    color: white; border: none;
    padding: 9px 18px; border-radius: 10px;
    font-family: inherit; font-weight: 700; font-size: 13px;
    cursor: pointer;
    box-shadow: 0 4px 14px rgba(139,92,246,0.3);
  }
  .panel button:hover:not(:disabled) { filter: brightness(1.15); transform: translateY(-1px); }
  .panel button:disabled { opacity: 0.4; cursor: not-allowed; box-shadow: none; }
  .panel .ghost { background: rgba(255,255,255,0.1); box-shadow: none; }

  .toast {
    position: fixed; top: 62px; left: 50%; transform: translateX(-50%);
    background: linear-gradient(135deg, rgba(0,0,0,0.9), rgba(31,17,71,0.9));
    color: white; padding: 11px 22px; border-radius: 12px;
    font-size: 14px; z-index: 20;
    border-left: 3px solid #a78bfa;
    box-shadow: 0 8px 30px rgba(0,0,0,0.4);
    animation: tin 0.3s ease;
  }
  @keyframes tin { from { opacity: 0; transform: translate(-50%, -8px); } to { opacity: 1; transform: translate(-50%, 0); } }
  .toast.err { border-left-color: #ef4444; }
  .toast.ok { border-left-color: #10b981; }
  .toast.info { border-left-color: #3b82f6; }

  .modal { position: fixed; inset: 0; background: rgba(0,0,0,0.75); backdrop-filter: blur(10px); display: none; align-items: center; justify-content: center; z-index: 30; padding: 16px; }
  .modal.show { display: flex; }
  .modal-card {
    background: linear-gradient(135deg, #1e293b, #312e81);
    border-radius: 20px; padding: 26px 30px;
    max-width: 520px; width: 100%;
    border: 1px solid rgba(167,139,250,0.3);
    box-shadow: 0 25px 60px rgba(0,0,0,0.5);
  }
  .modal h2 { margin: 0 0 12px; font-size: 26px; }
  .modal .score-big {
    font-size: 68px; font-weight: 800; text-align: center;
    background: linear-gradient(135deg, #a78bfa, #ec4899);
    -webkit-background-clip: text; background-clip: text; color: transparent;
    line-height: 1; margin: 16px 0;
  }
  .modal .row { display: flex; justify-content: space-between; padding: 7px 0; border-bottom: 1px solid rgba(255,255,255,0.08); font-size: 14px; }
  .modal .row b { color: #a78bfa; }
  .modal-btns { display: flex; gap: 10px; margin-top: 20px; justify-content: center; flex-wrap: wrap; }
  .modal-btns button, .modal-btns a { padding: 11px 20px; border-radius: 11px; border: none; font-family: inherit; font-weight: 700; font-size: 14px; cursor: pointer; text-decoration: none; color: white; text-align: center; }
  .modal-btns .primary { background: linear-gradient(135deg, #a78bfa, #8b5cf6); }
  .modal-btns .outline { background: transparent; border: 1px solid rgba(255,255,255,0.2); }

  /* Sound toggle */
  .sfx-toggle {
    position: fixed; top: 56px; right: 16px;
    width: 38px; height: 38px; border-radius: 50%;
    background: rgba(0,0,0,0.55); border: 1px solid rgba(255,255,255,0.12);
    cursor: pointer; z-index: 10;
    display: flex; align-items: center; justify-content: center;
    backdrop-filter: blur(10px); font-size: 16px;
  }

  /* Object label tooltip */
  #hover-label {
    position: absolute; left: 0; top: 0; pointer-events: none;
    background: rgba(31,17,71,0.95); color: white;
    border-radius: 10px; padding: 6px 12px;
    font-size: 12px; opacity: 0;
    transform: translate(-50%, calc(-100% - 12px));
    transition: opacity 0.15s ease;
    box-shadow: 0 4px 14px rgba(0,0,0,0.4), 0 0 0 1px rgba(167,139,250,0.3);
    white-space: nowrap; z-index: 8;
    font-weight: 600;
  }
  #hover-label.show { opacity: 1; }
  #hover-label::after {
    content: ''; position: absolute; bottom: -6px; left: 50%;
    transform: translateX(-50%);
    border: 6px solid transparent; border-top-color: rgba(31,17,71,0.95);
  }

  /* Mobile optimizations */
  @media (max-width: 720px) {
    .topbar { font-size: 11px; padding: 8px 10px; gap: 8px; }
    .topbar a { font-size: 11px; }
    .step-pill { font-size: 10px; padding: 4px 8px; }
    .stat { font-size: 11px; }
    .tutorial {
      bottom: 88px; padding: 12px 16px;
      max-width: calc(100vw - 24px);
    }
    .tutorial .tut-title { font-size: 14px; }
    .tutorial .tut-body { font-size: 12px; }
    .tutorial .tut-hint { font-size: 10px; }
    .tutorial .tut-num { width: 26px; height: 26px; font-size: 14px; }
    .panel { padding: 8px 12px; bottom: 12px; }
    .panel button { padding: 11px 16px; min-height: 44px; font-size: 13px; }
    .sfx-toggle { width: 36px; height: 36px; top: 50px; right: 12px; font-size: 14px; }
    .modal-card { padding: 20px 22px; }
    .modal h2 { font-size: 20px; }
    .modal .score-big { font-size: 48px; }
    .modal .row { font-size: 13px; padding: 5px 0; }
  }

  /* Loading splash */
  .splash {
    position: fixed; inset: 0; background: linear-gradient(135deg, #0f172a, #312e81);
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    z-index: 100; transition: opacity 0.5s;
  }
  .splash.hidden { opacity: 0; pointer-events: none; }
  .splash .logo { font-size: 64px; animation: bounce 1.4s ease infinite; }
  @keyframes bounce { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-12px); } }
  .splash .text { margin-top: 16px; font-size: 14px; opacity: 0.7; }
`;

// importmap gốc trong public/sac-ky-3d.html — map bare specifier three CDN.
const IMPORT_MAP = JSON.stringify({
  imports: {
    three: '/vendor/three-0.160/build/three.module.js',
    'three/addons/': '/vendor/three-0.160/examples/jsm/',
  },
});

// Khung DOM tĩnh gốc (markup trong <body>) — giữ NGUYÊN mọi id/class/href để engine
// querySelector trúng. <canvas> do engine tạo động (renderer.domElement) rồi append
// thẳng vào document.body.
const SKELETON = `
<div class="splash" id="splash">
  <div class="logo">🧪</div>
  <div class="text">Đang tải phòng thí nghiệm Sắc ký...</div>
</div>

<div class="topbar">
  <a href="/sac-ky-vr">← Hub Sắc ký</a>
  <span class="step-pill" id="step-pill">Bước 2/6 · Chấm mẫu</span>
  <span class="stat">⏱️ <b id="timer">0s</b></span>
  <span class="stat">🎯 <b id="score">0</b></span>
  <span class="spacer"></span>
</div>

<button class="sfx-toggle" id="sfx-toggle" title="Bật/tắt âm thanh">🔊</button>
<button class="sfx-toggle" id="uv-toggle" style="top: 102px; display: none;" title="Bật/tắt đèn UV 365nm">🔦</button>
<button class="sfx-toggle" id="mode-toggle" style="top: 148px; width: auto; padding: 0 12px; font-size: 12px; height: 38px;" title="Chế độ thực hành — Simple (3 bước chấm thẳng) vs Full (chuẩn Unity gốc với pre-prep)">🔬 Simple</button>

<div id="hover-label">Label</div>

<div class="tutorial" id="tutorial">
  <div class="tut-head">
    <span class="tut-num" id="tut-num">2</span>
    <span class="tut-title" id="tut-title">Chấm mẫu lên đường gốc</span>
  </div>
  <div class="tut-body" id="tut-body">
    Click vào 1 trong 3 lọ mẫu (A, B, C) để hút bằng mao quản, sau đó click lên đĩa TLC để chấm vào đường gốc.
  </div>
  <div class="tut-hint" id="tut-hint">💡 Mỗi mẫu chỉ chấm 1 lần. Hoàn thành cả 3 mẫu để tiếp tục.</div>
</div>

<div class="panel">
  <button id="btn-action" disabled>Thao tác</button>
  <button id="btn-restart" class="ghost">↺ Chơi lại</button>
</div>

<div class="modal" id="modal">
  <div class="modal-card">
    <h2>🎉 Thí nghiệm hoàn tất!</h2>
    <div class="score-big" id="modal-score">0</div>
    <div id="modal-details"></div>
    <div class="modal-btns">
      <button class="primary" id="modal-replay">↺ Làm lại</button>
      <a class="outline" href="/sac-ky-vr">← Hub</a>
      <a class="outline" href="/">🏠 Trang chính</a>
    </div>
  </div>
</div>
`;

export default function SacKy3DPage() {
  useEffect(() => {
    // 1) CSS gốc vào <head> (engine append <canvas> thẳng vào document.body).
    const style = document.createElement('style');
    style.dataset.sacKy3dLegacy = '1';
    style.textContent = LEGACY_CSS;
    document.head.appendChild(style);

    // 2) importmap — chỉ 1 importmap/tài liệu và phải xuất hiện trước khi bất kỳ
    //    module nào resolve import. Guard theo id để không thêm trùng khi
    //    client-navigate quay lại.
    if (!document.getElementById('sac-ky-3d-importmap')) {
      const map = document.createElement('script');
      map.type = 'importmap';
      map.id = 'sac-ky-3d-importmap';
      map.textContent = IMPORT_MAP;
      document.head.appendChild(map);
    }

    // 3) Nạp engine vanilla (module). ?ts để re-execute khi quay lại trang.
    const script = document.createElement('script');
    script.type = 'module';
    script.src = `/legacy/sac-ky-3d.js?ts=${Date.now()}`;
    document.body.appendChild(script);

    return () => {
      script.remove();
      style.remove();
      // <canvas> engine append thẳng vào body → dọn để re-mount sạch.
      document.querySelectorAll('body > canvas').forEach((c) => c.remove());
      // importmap KHÔNG gỡ: đã dùng để resolve module; giữ lại vô hại (chỉ map three).
    };
  }, []);

  return <div dangerouslySetInnerHTML={{ __html: SKELETON }} />;
}
