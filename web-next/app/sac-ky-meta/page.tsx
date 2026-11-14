'use client';

import { useEffect } from 'react';

// Wrap-mount trang Next /sac-ky-meta (Three.js sắc ký metaverse multiplayer, 996 dòng gốc).
// Chiến lược WRAP-MOUNT: KHÔNG viết lại engine. Ở đây chỉ:
//  1) Dựng lại đúng khung DOM tĩnh của <body> gốc (join-splash/topbar/players/tutorial/
//     chat/panel/modal) + CSS gốc chèn nguyên văn vào <head> — engine append <canvas>
//     thẳng vào document.body nên CSS phải ở phạm vi document, KHÔNG scope container.
//  2) Inject <script type="importmap"> (map bare specifier `three` + `three/addons/`
//     sang CDN unpkg) TRƯỚC khi nạp module — importmap phải có mặt trước khi module resolve.
//  3) Nạp public/legacy/sac-ky-meta.js dạng <script type="module"> (giữ đúng loại vì
//     script gốc dùng `import ...`). Trong legacy js đã sửa 2 import tương đối
//     ./js/api.js + ./js/sfx.js thành tuyệt đối /js/... vì file nay phục vụ từ /legacy/.
// Effect chạy sau paint → skeleton đã render → engine querySelector/append an toàn.

// CSS gốc (public/sac-ky-meta.html <style>) — nguyên văn. Engine append <canvas> thẳng
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
  .stat b { color: #ec4899; font-weight: 700; }
  .step-pill {
    background: linear-gradient(135deg, #ec4899, #f97316);
    color: white; padding: 5px 12px;
    border-radius: 14px; font-weight: 700; font-size: 12px;
  }
  .badge-live {
    background: rgba(239,68,68,0.25); color: #fca5a5; padding: 3px 9px; border-radius: 10px;
    font-size: 11px; font-weight: 700;
    display: inline-flex; align-items: center; gap: 4px;
  }
  .badge-live::before {
    content: ''; width: 6px; height: 6px; border-radius: 50%; background: #ef4444;
    animation: pulse 1.5s ease infinite;
  }
  @keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.3; } }

  /* Players panel (right) */
  .players-panel {
    position: fixed; top: 56px; right: 16px;
    background: rgba(0,0,0,0.6); backdrop-filter: blur(12px);
    border: 1px solid rgba(255,255,255,0.12);
    border-radius: 14px; padding: 12px 14px;
    width: 220px; max-height: 60vh; overflow-y: auto;
    z-index: 9;
  }
  .players-panel h4 {
    margin: 0 0 8px; font-size: 11px; opacity: 0.6;
    text-transform: uppercase; letter-spacing: 0.5px; font-weight: 700;
  }
  .player-row {
    display: flex; align-items: center; gap: 8px; padding: 5px 0;
    border-bottom: 1px solid rgba(255,255,255,0.06); font-size: 12px;
  }
  .player-row:last-child { border-bottom: none; }
  .player-row .dot {
    width: 12px; height: 12px; border-radius: 50%;
    box-shadow: 0 0 0 2px rgba(255,255,255,0.2);
    flex-shrink: 0;
  }
  .player-row .info { flex: 1; min-width: 0; }
  .player-row .info .name { font-weight: 600; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .player-row .info .meta { font-size: 10px; opacity: 0.6; }
  .player-row.me .info .name::after {
    content: '• Bạn'; margin-left: 4px; font-size: 9px; color: #fbbf24;
  }

  /* Chat */
  .chat {
    position: fixed; bottom: 80px; left: 16px;
    width: 320px; max-width: calc(100vw - 32px);
    background: rgba(0,0,0,0.55); backdrop-filter: blur(12px);
    border: 1px solid rgba(255,255,255,0.12);
    border-radius: 14px; padding: 12px;
    z-index: 9;
  }
  .chat-log {
    max-height: 140px; overflow-y: auto;
    font-size: 12.5px; line-height: 1.5;
    margin-bottom: 8px;
  }
  .chat-msg { padding: 3px 0; }
  .chat-msg .author { font-weight: 700; }
  .chat-msg.system { opacity: 0.6; font-style: italic; }
  .chat-input {
    display: flex; gap: 6px;
  }
  .chat-input input {
    flex: 1; padding: 7px 10px; border-radius: 8px;
    border: 1px solid rgba(255,255,255,0.2);
    background: rgba(255,255,255,0.06); color: white;
    font-family: inherit; font-size: 13px;
  }
  .chat-input input::placeholder { color: rgba(255,255,255,0.4); }
  .chat-input button {
    padding: 7px 12px; border-radius: 8px; border: none;
    background: #ec4899; color: white;
    font-family: inherit; font-weight: 700; font-size: 12px; cursor: pointer;
  }

  /* Bottom action panel */
  .panel {
    position: fixed; bottom: 16px; left: 50%; transform: translateX(-50%);
    background: rgba(0,0,0,0.65); backdrop-filter: blur(14px);
    border: 1px solid rgba(255,255,255,0.12);
    border-radius: 14px; padding: 10px 16px;
    display: flex; gap: 10px; align-items: center;
    z-index: 10;
  }
  .panel button {
    background: linear-gradient(135deg, #ec4899, #f97316);
    color: white; border: none;
    padding: 9px 18px; border-radius: 10px;
    font-family: inherit; font-weight: 700; font-size: 13px;
    cursor: pointer;
  }
  .panel button:hover:not(:disabled) { filter: brightness(1.1); }
  .panel button:disabled { opacity: 0.4; cursor: not-allowed; }
  .panel .ghost { background: rgba(255,255,255,0.1); }

  .toast {
    position: fixed; top: 62px; left: 50%; transform: translateX(-50%);
    background: rgba(0,0,0,0.85); color: white;
    padding: 10px 18px; border-radius: 10px;
    font-size: 14px; z-index: 20;
    border-left: 3px solid #ec4899;
    animation: tin 0.3s;
  }
  @keyframes tin { from { opacity: 0; transform: translate(-50%, -8px); } to { opacity: 1; transform: translate(-50%, 0); } }
  .toast.err { border-left-color: #ef4444; }
  .toast.ok { border-left-color: #10b981; }

  /* Tutorial overlay */
  .tutorial {
    position: fixed; bottom: 80px; right: 16px;
    background: linear-gradient(135deg, rgba(31,17,71,0.95), rgba(46,16,101,0.95));
    border: 1px solid rgba(236,72,153,0.4);
    border-radius: 14px; padding: 12px 16px;
    width: 280px; z-index: 9;
    backdrop-filter: blur(14px);
    box-shadow: 0 8px 30px rgba(0,0,0,0.4);
  }
  .tutorial .tut-head { display: flex; align-items: center; gap: 8px; margin-bottom: 4px; }
  .tutorial .tut-num {
    width: 26px; height: 26px; border-radius: 50%;
    background: linear-gradient(135deg, #ec4899, #f97316);
    display: inline-flex; align-items: center; justify-content: center;
    font-weight: 800; font-size: 13px; color: white; flex-shrink: 0;
  }
  .tutorial .tut-title { font-size: 14px; font-weight: 700; }
  .tutorial .tut-body { font-size: 12px; line-height: 1.45; opacity: 0.92; margin-top: 2px; }
  .tutorial .tut-hint { font-size: 10.5px; opacity: 0.65; margin-top: 4px; font-style: italic; }

  /* Mobile optimizations */
  @media (max-width: 720px) {
    .topbar { font-size: 11px; padding: 8px 10px; gap: 8px; flex-wrap: wrap; }
    .topbar a { font-size: 11px; }
    .step-pill { font-size: 10px; padding: 4px 8px; }
    .stat { font-size: 11px; }
    .badge-live { font-size: 10px; }
    .players-panel {
      width: 180px; padding: 10px 12px; top: 90px;
      font-size: 11px; max-height: 35vh;
    }
    .player-row { font-size: 11px; }
    .chat {
      width: calc(100vw - 32px); bottom: 64px;
      padding: 10px;
    }
    .chat-log { max-height: 90px; font-size: 12px; }
    .chat-input input { font-size: 12px; padding: 6px 8px; }
    .panel { padding: 8px 12px; bottom: 4px; }
    .panel button { padding: 10px 14px; min-height: 44px; font-size: 12px; }
    .join-card { padding: 22px 24px; }
    .join-card h1 { font-size: 22px; }
    .join-card .sub { font-size: 13px; }
    .modal-card { padding: 20px 22px; }
    .modal h2 { font-size: 20px; }
    .modal .score-big { font-size: 48px; }
  }

  /* Splash join */
  .join-splash {
    position: fixed; inset: 0; z-index: 100;
    background: linear-gradient(135deg, #0f172a 0%, #312e81 100%);
    display: flex; align-items: center; justify-content: center;
    transition: opacity 0.4s;
  }
  .join-splash.hidden { opacity: 0; pointer-events: none; }
  .join-card {
    background: rgba(0,0,0,0.4); border: 1px solid rgba(236,72,153,0.4);
    border-radius: 20px; padding: 32px 36px;
    max-width: 460px; width: 90%;
    backdrop-filter: blur(20px);
    box-shadow: 0 20px 60px rgba(0,0,0,0.4);
  }
  .join-card h1 { margin: 0 0 4px; font-size: 28px;
    background: linear-gradient(135deg, #ec4899, #f97316);
    -webkit-background-clip: text; background-clip: text; color: transparent;
  }
  .join-card .sub { opacity: 0.8; font-size: 14px; margin-bottom: 20px; }
  .join-card input {
    width: 100%; padding: 12px 14px; border-radius: 10px;
    border: 1px solid rgba(255,255,255,0.2);
    background: rgba(255,255,255,0.06); color: white;
    font-family: inherit; font-size: 15px;
    margin-bottom: 14px;
  }
  .join-card button {
    width: 100%; padding: 12px 16px; border-radius: 10px;
    background: linear-gradient(135deg, #ec4899, #f97316);
    color: white; border: none;
    font-family: inherit; font-weight: 700; font-size: 15px;
    cursor: pointer;
  }
  .join-card button:hover { filter: brightness(1.1); }

  .modal { position: fixed; inset: 0; background: rgba(0,0,0,0.75); backdrop-filter: blur(8px); display: none; align-items: center; justify-content: center; z-index: 30; padding: 16px; }
  .modal.show { display: flex; }
  .modal-card { background: linear-gradient(135deg, #1e293b, #581c87); border-radius: 18px; padding: 26px; max-width: 460px; width: 100%; border: 1px solid rgba(236,72,153,0.3); }
  .modal h2 { margin: 0 0 12px; font-size: 24px; }
  .modal .score-big { font-size: 64px; font-weight: 800; text-align: center; background: linear-gradient(135deg, #ec4899, #f97316); -webkit-background-clip: text; background-clip: text; color: transparent; line-height: 1; margin: 14px 0; }
  .modal .row { display: flex; justify-content: space-between; padding: 7px 0; border-bottom: 1px solid rgba(255,255,255,0.08); font-size: 14px; }
  .modal-btns { display: flex; gap: 10px; margin-top: 18px; justify-content: center; flex-wrap: wrap; }
  .modal-btns button, .modal-btns a { padding: 10px 18px; border-radius: 10px; border: none; font-family: inherit; font-weight: 700; font-size: 14px; cursor: pointer; text-decoration: none; color: white; text-align: center; }
  .modal-btns .primary { background: linear-gradient(135deg, #ec4899, #f97316); }
  .modal-btns .outline { background: transparent; border: 1px solid rgba(255,255,255,0.2); }
`;

// importmap gốc trong public/sac-ky-meta.html — map bare specifier three CDN.
const IMPORT_MAP = JSON.stringify({
  imports: {
    three: '/vendor/three-0.160/build/three.module.js',
    'three/addons/': '/vendor/three-0.160/examples/jsm/',
  },
});

// Khung DOM tĩnh gốc (markup trong <body>) — giữ NGUYÊN mọi id/class để engine
// querySelector trúng. <canvas> do engine tạo động rồi append vào document.body.
const SKELETON = `
<div class="join-splash" id="join-splash">
  <div class="join-card">
    <h1>🌐 Metaverse Sắc ký</h1>
    <p class="sub">Phòng lab chung với các sinh viên khác. Bạn sẽ thấy avatar người khác chuyển động trong phòng cùng làm thí nghiệm TLC.</p>
    <input type="text" id="name-input" placeholder="Họ tên / mã SV" maxlength="32" />
    <button id="join-btn">🚪 Vào phòng lab</button>
  </div>
</div>

<div class="topbar">
  <a href="/sac-ky-vr">← Hub Sắc ký</a>
  <span class="step-pill" id="step-pill">Bước 2/6 · Chấm mẫu</span>
  <span class="badge-live" id="badge-live">LIVE · 1</span>
  <span class="stat">⏱️ <b id="timer">0s</b></span>
  <span class="stat">🎯 <b id="score">0</b></span>
  <span class="spacer"></span>
</div>

<div class="players-panel">
  <h4>👥 Trong phòng</h4>
  <div id="players-list"></div>
</div>

<div class="tutorial">
  <div class="tut-head">
    <span class="tut-num" id="tut-num">2</span>
    <span class="tut-title" id="tut-title">Chấm mẫu lên đĩa</span>
  </div>
  <div class="tut-body" id="tut-body">Click 1 trong 3 lọ A/B/C, sau đó click lên đĩa TLC.</div>
  <div class="tut-hint" id="tut-hint">💡 Mọi người trong phòng đều thấy bạn đang làm gì.</div>
</div>

<div class="chat">
  <div class="chat-log" id="chat-log">
    <div class="chat-msg system">💬 Chat realtime với cả phòng — nhấn Enter để gửi</div>
  </div>
  <div class="chat-input">
    <input type="text" id="chat-input" placeholder="Gõ tin nhắn..." maxlength="140" />
    <button id="chat-send">→</button>
  </div>
</div>

<div class="panel">
  <button id="btn-action" disabled>Thao tác</button>
  <button id="btn-restart" class="ghost">↺ Chơi lại</button>
</div>

<div class="modal" id="modal">
  <div class="modal-card">
    <h2>🎉 Hoàn thành!</h2>
    <div class="score-big" id="modal-score">0</div>
    <div id="modal-details"></div>
    <div class="modal-btns">
      <button class="primary" id="modal-replay">↺ Làm lại</button>
      <a class="outline" href="/sac-ky-vr">← Hub</a>
    </div>
  </div>
</div>
`;

export default function SacKyMetaPage() {
  useEffect(() => {
    // 1) CSS gốc vào <head> (engine append <canvas> thẳng vào document.body).
    const style = document.createElement('style');
    style.dataset.sacKyMetaLegacy = '1';
    style.textContent = LEGACY_CSS;
    document.head.appendChild(style);

    // 2) importmap — chỉ 1 importmap/tài liệu và phải xuất hiện trước khi bất kỳ
    //    module nào resolve import. Guard theo id để không thêm trùng khi
    //    client-navigate quay lại.
    if (!document.getElementById('sac-ky-meta-importmap')) {
      const map = document.createElement('script');
      map.type = 'importmap';
      map.id = 'sac-ky-meta-importmap';
      map.textContent = IMPORT_MAP;
      document.head.appendChild(map);
    }

    // 3) Nạp engine vanilla (module). ?ts để re-execute khi quay lại trang.
    const script = document.createElement('script');
    script.type = 'module';
    script.src = `/legacy/sac-ky-meta.js?ts=${Date.now()}`;
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
