'use client';

import { useEffect } from 'react';

// ============================================================================
// app/metaverse/page.tsx — WRAP-MOUNT trang Next /metaverse.
//
// Trang gốc public/metaverse.html là Three.js metaverse 3D "phòng dược chung"
// realtime (WebSocket multiplayer + MediaPipe pinch, 855 dòng). Chiến lược
// WRAP-MOUNT: KHÔNG viết lại engine sang React. Ở đây chỉ:
//   1) Dựng lại NGUYÊN VĂN khung DOM tĩnh của <body> gốc (giữ mọi id/class để
//      engine querySelector/getElementById trúng).
//   2) Chèn CSS gốc vào <head> (document scope) — engine append canvas + định vị
//      #hover-label theo innerWidth/innerHeight ở phạm vi document, KHÔNG scope
//      container.
//   3) Inject <script type="importmap"> map bare specifier `three` + `three/addons/`
//      sang CDN TRƯỚC khi nạp module (importmap phải có mặt trước khi module
//      resolve import).
//   4) Nạp public/legacy/metaverse.js dạng <script type="module"> (script gốc là
//      ES module `import ...`).
// Effect chạy sau paint → skeleton đã render → engine append/query an toàn.
//
// Asset ngoài (/js/*, /vendor/*, /models/*, CDN three) giữ NGUYÊN path — tải qua
// fallback proxy Next→Express. Content (thuốc/slot) KHÔNG hardcode ở đây: engine
// nhận từ server snapshot qua WebSocket (giữ nguyên hành vi gốc).
// ============================================================================

const LEGACY_CSS = `
  html, body { margin: 0; height: 100%; overflow: hidden; background: #0b0b1f; font-family: system-ui, sans-serif; touch-action: none; -webkit-tap-highlight-color: transparent; }
  canvas { display: block; touch-action: none; }
  @media (max-width: 640px) {
    #info { font-size: 11px !important; padding: 6px 9px !important; max-width: calc(100vw - 24px); }
    #players { font-size: 11px !important; padding: 8px 10px !important; min-width: auto !important; max-width: 180px; }
    a.back { font-size: 11px !important; padding: 4px 8px !important; }
    .btn-bar button { padding: 8px 10px !important; font-size: 11px !important; min-height: 44px; }
    #cam-preview { width: 120px !important; height: 90px !important; bottom: 70px !important; }
  }
  #info { position: absolute; top: 12px; left: 12px; background: rgba(0,0,0,0.5); color: white; padding: 8px 12px; border-radius: 8px; font-size: 13px; z-index: 5; }
  #players { position: absolute; top: 12px; right: 12px; background: rgba(0,0,0,0.5); color: white; padding: 10px 14px; border-radius: 8px; font-size: 13px; z-index: 5; min-width: 200px; }
  #players h4 { margin: 0 0 6px; font-size: 11px; opacity: 0.7; text-transform: uppercase; letter-spacing: 0.5px; }
  #players .pl { padding: 2px 0; display: flex; align-items: center; gap: 6px; }
  #players .dot { width: 10px; height: 10px; border-radius: 50%; display: inline-block; }
  #players .me { font-weight: 700; }
  .btn-bar { position: absolute; bottom: 14px; left: 50%; transform: translateX(-50%); display: flex; gap: 8px; z-index: 5; }
  .btn-bar button {
    padding: 10px 16px; background: rgba(255,255,255,0.92); color: #1f2937;
    border: none; border-radius: 8px; font-weight: 600; cursor: pointer; font-family: inherit; font-size: 13px;
  }
  .btn-bar button:hover { background: white; }
  .btn-bar button.primary { background: #43a047; color: white; }
  .btn-bar button.primary:hover { background: #66bb6a; }
  .btn-bar button.danger { background: #ef4444; color: white; }
  #cam-preview { position: absolute; bottom: 60px; right: 12px; border-radius: 8px; background: #000; box-shadow: 0 2px 8px rgba(0,0,0,0.3); transform: scaleX(-1); display: none; z-index: 5; }
  #status { position: absolute; bottom: 14px; right: 12px; background: rgba(0,0,0,0.5); color: white; padding: 4px 10px; border-radius: 8px; font-size: 11px; z-index: 5; }
  a.back { position: absolute; top: 12px; left: 50%; transform: translateX(-50%); color: white; text-decoration: none; font-size: 13px; background: rgba(0,0,0,0.5); padding: 6px 12px; border-radius: 6px; z-index: 5; }
  #toast { position: absolute; top: 60px; left: 50%; transform: translateX(-50%); background: rgba(0,0,0,0.85); color: white; padding: 10px 18px; border-radius: 20px; font-size: 14px; z-index: 6; display: none; }
  /* ====== Object hover tooltip ====== */
  #hover-label {
    position: absolute; left: 0; top: 0;
    pointer-events: none;
    background: rgba(255,255,255,0.97);
    border-radius: 12px;
    padding: 8px 14px 10px;
    font-family: system-ui, sans-serif;
    font-size: 13px; color: #1f2937;
    box-shadow: 0 6px 18px rgba(0,0,0,0.32), 0 1px 0 #fff inset;
    transform: translate(-50%, calc(-100% - 14px));
    white-space: nowrap;
    opacity: 0; transition: opacity .15s ease-out;
    z-index: 12; border: 1.5px solid rgba(0,0,0,0.08);
  }
  #hover-label.shown { opacity: 1; }
  #hover-label .ht { font-weight: 800; font-size: 14px; }
  #hover-label .hs { font-size: 11px; opacity: 0.62; }
  #hover-label .hc {
    display: inline-block; margin-top: 5px;
    padding: 2px 10px; border-radius: 10px;
    font-size: 11px; color: #fff; font-weight: 700;
    background: var(--cat-color, #43a047);
  }
  #hover-label::after {
    content: ''; position: absolute; bottom: -7px; left: 50%;
    transform: translateX(-50%);
    width: 0; height: 0;
    border-left: 8px solid transparent; border-right: 8px solid transparent;
    border-top: 8px solid rgba(255,255,255,0.97);
  }
`;

// importmap gốc trong public/metaverse.html — map bare specifier three CDN.
const IMPORT_MAP = JSON.stringify({
  imports: {
    three: '/vendor/three-0.160/build/three.module.js',
    'three/addons/': '/vendor/three-0.160/examples/jsm/',
  },
});

export default function MetaversePage() {
  useEffect(() => {
    // 1) CSS gốc vào <head> (engine append canvas thẳng vào document.body).
    const style = document.createElement('style');
    style.dataset.metaverseLegacy = '1';
    style.textContent = LEGACY_CSS;
    document.head.appendChild(style);

    // 2) importmap — chỉ 1/tài liệu, phải có TRƯỚC khi module resolve import.
    //    Guard theo id để không thêm trùng khi client-navigate quay lại.
    if (!document.getElementById('metaverse-importmap')) {
      const map = document.createElement('script');
      map.type = 'importmap';
      map.id = 'metaverse-importmap';
      map.textContent = IMPORT_MAP;
      document.head.appendChild(map);
    }

    // 3) Nạp engine vanilla (module). ?ts để re-execute khi quay lại trang.
    const s = document.createElement('script');
    s.type = 'module';
    s.src = `/legacy/metaverse.js?ts=${Date.now()}`;
    document.body.appendChild(s);

    return () => {
      s.remove();
      style.remove();
      // importmap KHÔNG gỡ: đã dùng để resolve module; giữ lại vô hại.
    };
  }, []);

  // Khung DOM tĩnh gốc của <body> (giữ NGUYÊN mọi id/class/text để engine
  // querySelector/getElementById trúng). Canvas 3D + cam-preview vẽ do engine.
  return (
    <>
      <div id="info">🌐 <b>Metaverse</b> · phòng dược chung — pinch hoặc kéo chuột để cầm thuốc</div>
      <a className="back" href="./">← Trang chính</a>
      <div id="players">
        <h4>👥 Trong phòng</h4>
        <div id="player-list">đang kết nối...</div>
      </div>
      <canvas id="cam-preview" width={180} height={135} />
      <div id="status">⌛ Đang kết nối WS...</div>
      <div id="toast" />
      <div id="hover-label">
        <div className="ht" />
        <div className="hs" />
        <div className="hc" />
      </div>
      <div className="btn-bar">
        <button id="hand-toggle" className="primary">🖐️ Bật webcam</button>
        <button id="reset-btn">🔄 Reset phòng</button>
        <button id="submit-btn">📝 Nộp bài</button>
      </div>
    </>
  );
}
