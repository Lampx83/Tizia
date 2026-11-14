'use client';

import { useEffect } from 'react';

// Wrap-mount trang Next /herb-garden-3d (Three.js vườn dược liệu 3D nặng).
// Chiến lược WRAP-MOUNT: KHÔNG viết lại engine. Ở đây chỉ:
//  1) Dựng lại đúng khung DOM tĩnh của <body> gốc (topbar/quest/info/toast/loading)
//     + CSS gốc chèn nguyên văn vào <head> — engine append <canvas> thẳng vào
//     document.body nên CSS phải ở phạm vi document, KHÔNG scope container.
//  2) Inject <script type="importmap"> (map bare specifier `three` + `three/addons/`
//     sang CDN) TRƯỚC khi nạp module — importmap phải có mặt trước khi module resolve import.
//  3) Nạp public/legacy/herb-garden-3d.js dạng <script type="module"> (giữ đúng loại
//     vì script gốc dùng `import ...`).
// Effect chạy sau paint → skeleton đã render → engine querySelector/append an toàn.

// CSS gốc (public/herb-garden-3d.html) — nguyên văn. Engine append <canvas> thẳng
// vào document.body nên để ở phạm vi document, không scope container.
const LEGACY_CSS = `
  :root { --accent:#5bbd7c; --ok:#10b981; --err:#ef4444; }
  * { box-sizing:border-box; }
  html,body { margin:0; height:100%; font-family:'Inter',system-ui,sans-serif; color:#fff; overflow:hidden; background:#0f172a; }
  canvas { display:block; touch-action:none; }
  .topbar { position:fixed; top:0; left:0; right:0; z-index:10; display:flex; gap:14px; align-items:center; padding:10px 16px;
    background:rgba(0,0,0,.35); backdrop-filter:blur(10px); border-bottom:1px solid rgba(255,255,255,.08); font-size:13px; }
  .topbar a { color:#fff; opacity:.8; text-decoration:none; } .topbar a:hover { opacity:1; }
  .topbar .title { font-weight:700; } .topbar .spacer { flex:1; }
  .topbar .score { color:var(--accent); font-weight:800; }
  .btn { background:var(--accent); color:#08311a; border:none; padding:8px 14px; border-radius:10px; font-family:inherit; font-weight:700; font-size:13px; cursor:pointer; }
  .btn:hover { filter:brightness(1.08); }
  .quest { position:fixed; top:52px; left:50%; transform:translateX(-50%); z-index:9; background:rgba(2,6,23,.78); backdrop-filter:blur(8px);
    border:1px solid rgba(91,189,124,.5); border-radius:12px; padding:9px 16px; font-size:14px; display:none; max-width:92vw; text-align:center; }
  .quest.show { display:block; }
  .quest b { color:var(--accent); }
  .info { position:fixed; left:18px; bottom:18px; z-index:9; width:300px; max-width:calc(100vw - 36px); background:rgba(2,6,23,.82);
    backdrop-filter:blur(12px); border:1px solid rgba(255,255,255,.14); border-radius:16px; padding:16px 18px; transform:translateY(140%); transition:transform .3s; }
  .info.show { transform:translateY(0); }
  .info .ic { font-size:40px; } .info h3 { margin:4px 0 8px; font-size:20px; }
  .info .kv { font-size:13.5px; margin:5px 0; } .info .kv b { color:var(--accent); }
  .info .x { position:absolute; top:10px; right:12px; cursor:pointer; opacity:.6; font-size:18px; } .info .x:hover { opacity:1; }
  .hint { position:fixed; left:50%; bottom:16px; transform:translateX(-50%); z-index:8; font-size:12.5px; opacity:.7; text-align:center; pointer-events:none; }
  .loading { position:fixed; inset:0; display:flex; align-items:center; justify-content:center; font-size:16px; opacity:.8; z-index:20; }
  .toast { position:fixed; top:96px; left:50%; transform:translateX(-50%); background:rgba(0,0,0,.85); color:#fff; padding:10px 18px;
    border-radius:10px; font-size:14px; z-index:20; border-left:3px solid var(--accent); display:none; }
  @media (max-width:720px){ .info{width:calc(100vw - 36px);} }
`;

// importmap gốc trong public/herb-garden-3d.html — map bare specifier three CDN.
const IMPORT_MAP = JSON.stringify({
  imports: {
    three: '/vendor/three-0.160/build/three.module.js',
    'three/addons/': '/vendor/three-0.160/examples/jsm/',
  },
});

// Khung DOM tĩnh gốc (markup trong <body>) — giữ NGUYÊN mọi id/class để engine
// querySelector trúng. <canvas> do engine tạo động rồi append vào document.body.
const SKELETON = `
<div class="topbar">
  <a href="/space?b=garden&domain=pharmacy">← Vườn dược liệu</a>
  <span class="title">🌿 Vườn dược liệu 3D</span>
  <span class="spacer"></span>
  <span id="score-wrap" style="display:none">🎯 <span class="score" id="score">0</span>/6</span>
  <button class="btn" id="quest-btn">🎯 Đố vui</button>
</div>

<div class="quest" id="quest"></div>
<div class="hint">🖱️ Kéo để xoay · cuộn để phóng to · bấm vào cây để xem thông tin</div>

<div class="info" id="info">
  <span class="x" id="info-x">✕</span>
  <div class="ic" id="info-ic">🌿</div>
  <h3 id="info-name">—</h3>
  <div class="kv">🌱 Bộ phận dùng: <b id="info-part">—</b></div>
  <div class="kv">💊 Công dụng: <b id="info-use">—</b></div>
</div>

<div class="toast" id="toast"></div>
<div class="loading" id="loading">Đang dựng vườn dược liệu 3D…</div>
`;

export default function HerbGarden3DPage() {
  useEffect(() => {
    // 1) CSS gốc vào <head> (engine append <canvas> thẳng vào document.body).
    const style = document.createElement('style');
    style.dataset.herbGardenLegacy = '1';
    style.textContent = LEGACY_CSS;
    document.head.appendChild(style);

    // 2) importmap — chỉ 1 importmap/tài liệu và phải xuất hiện trước khi bất kỳ
    //    module nào resolve import. Guard theo id để không thêm trùng khi
    //    client-navigate quay lại.
    if (!document.getElementById('herb-garden-importmap')) {
      const map = document.createElement('script');
      map.type = 'importmap';
      map.id = 'herb-garden-importmap';
      map.textContent = IMPORT_MAP;
      document.head.appendChild(map);
    }

    // 3) Nạp engine vanilla (module). ?ts để re-execute khi quay lại trang.
    const script = document.createElement('script');
    script.type = 'module';
    script.src = `/legacy/herb-garden-3d.js?ts=${Date.now()}`;
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
