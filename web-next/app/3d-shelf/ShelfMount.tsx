'use client';

import { useEffect } from 'react';

// Client mount cho trang Next /3d-shelf (Three.js kệ thuốc 3D + WebXR/VR nặng).
// Chiến lược WRAP-MOUNT: KHÔNG viết lại engine. Ở đây chỉ:
//  1) Dựng lại đúng khung DOM tĩnh của <body> gốc (#info) + CSS gốc (chèn nguyên
//     văn vào <head> — engine append canvas/buttons/panels thẳng vào document.body
//     nên CSS phải ở phạm vi document, KHÔNG scope container).
//  2) Inject <script type="importmap"> (map bare specifier `three` + `three/addons/`
//     sang CDN) TRƯỚC khi nạp module — bắt buộc, importmap phải có mặt trước khi
//     module resolve import.
//  3) Nạp public/legacy/3d-shelf.js dạng <script type="module"> (giữ đúng loại vì
//     script gốc dùng `import ...`).
// Effect chạy sau paint → #info đã render → engine querySelector/append an toàn.

const LEGACY_CSS = `
  html, body { margin: 0; height: 100%; overflow: hidden; background: linear-gradient(135deg, #d8d8d8 0%, #f0f0f0 100%); font-family: system-ui, sans-serif; touch-action: none; -webkit-tap-highlight-color: transparent; }
  #info {
    position: absolute; top: 12px; left: 12px;
    background: rgba(255,255,255,0.85); padding: 8px 12px;
    border-radius: 8px; font-size: 13px; color: #333;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    z-index: 10; max-width: calc(100vw - 24px);
  }
  canvas { display: block; touch-action: none; }
  @media (max-width: 720px) {
    #info { font-size: 10px; padding: 6px 10px; }
    /* Help panel (WebXR chrome help) inserted via JS — collapse to small icon on mobile */
    body > div[style*="top:54px"][style*="left:12px"] { font-size: 10px !important; max-width: 220px !important; padding: 6px 10px !important; }
    /* Submit + Reset buttons (bottom-right) and hand toggle (top-right) */
    button { min-height: 44px; }
  }

  /* ====== Object hover tooltip (Unity-style "Press E" label) ====== */
  #hover-label {
    position: absolute; left: 0; top: 0;
    pointer-events: none;
    background: rgba(255,255,255,0.97);
    border-radius: 12px;
    padding: 8px 14px 10px;
    font-family: system-ui, sans-serif;
    font-size: 13px; color: #1f2937;
    box-shadow: 0 6px 18px rgba(0,0,0,0.28), 0 1px 0 #fff inset;
    transform: translate(-50%, calc(-100% - 14px));
    white-space: nowrap;
    opacity: 0; transition: opacity .15s ease-out, transform .12s ease-out;
    z-index: 12;
    border: 1.5px solid rgba(0,0,0,0.08);
  }
  #hover-label.shown { opacity: 1; }
  #hover-label .ht { font-weight: 800; font-size: 14px; letter-spacing: .2px; }
  #hover-label .hs { font-size: 11px; opacity: 0.62; margin-top: 1px; }
  #hover-label .hc {
    display: inline-block; margin-top: 5px;
    padding: 2px 10px; border-radius: 10px;
    font-size: 11px; color: #fff; font-weight: 700;
    background: var(--cat-color, #43a047);
    box-shadow: 0 1px 0 rgba(0,0,0,0.15) inset;
  }
  #hover-label::after {
    content: ''; position: absolute; bottom: -7px; left: 50%;
    transform: translateX(-50%);
    width: 0; height: 0;
    border-left: 8px solid transparent; border-right: 8px solid transparent;
    border-top: 8px solid rgba(255,255,255,0.97);
    filter: drop-shadow(0 2px 2px rgba(0,0,0,0.1));
  }
  #hover-press {
    position: absolute; left: 0; top: 0;
    pointer-events: none;
    background: rgba(0,0,0,0.78);
    color: #fff;
    border-radius: 18px;
    padding: 4px 12px 4px 8px;
    font-family: system-ui, sans-serif;
    font-size: 12px;
    display: inline-flex; align-items: center; gap: 6px;
    transform: translate(-50%, calc(100% + 12px));
    z-index: 12;
    opacity: 0; transition: opacity .15s ease-out;
    box-shadow: 0 4px 12px rgba(0,0,0,0.3);
  }
  #hover-press.shown { opacity: 1; }
  #hover-press .kb {
    display: inline-block; background: #fff; color: #222;
    padding: 1px 6px; border-radius: 4px; font-weight: 700; font-size: 11px;
    box-shadow: 0 1px 0 #888;
  }
`;

// importmap gốc trong public/3d-shelf.html — map bare specifier three CDN.
const IMPORT_MAP = JSON.stringify({
  imports: {
    three: '/vendor/three-0.160/build/three.module.js',
    'three/addons/': '/vendor/three-0.160/examples/jsm/',
  },
});

export default function ShelfMount() {
  useEffect(() => {
    // 1) CSS gốc vào <head> (engine append thẳng vào document.body).
    const style = document.createElement('style');
    style.dataset.shelfLegacy = '1';
    style.textContent = LEGACY_CSS;
    document.head.appendChild(style);

    // 2) importmap — chỉ được có 1 importmap/tài liệu và phải xuất hiện trước khi
    //    bất kỳ module nào resolve import. Guard theo id để không thêm trùng khi
    //    client-navigate quay lại.
    let map: HTMLScriptElement | null = null;
    if (!document.getElementById('shelf-importmap')) {
      map = document.createElement('script');
      map.type = 'importmap';
      map.id = 'shelf-importmap';
      map.textContent = IMPORT_MAP;
      document.head.appendChild(map);
    }

    // 3) Nạp engine vanilla (module). ?ts để re-execute khi quay lại trang.
    const s = document.createElement('script');
    s.type = 'module';
    s.src = `/legacy/3d-shelf.js?ts=${Date.now()}`;
    document.body.appendChild(s);

    return () => {
      s.remove();
      style.remove();
      // importmap KHÔNG gỡ: đã dùng để resolve module; giữ lại vô hại (chỉ map three).
    };
  }, []);

  // Khung DOM tĩnh gốc: chỉ #info. Mọi UI khác (canvas, nút, panel, hover label)
  // do engine tạo động rồi append vào document.body — giữ NGUYÊN hành vi gốc.
  return (
    <div id="info">
      💊 Tizia · Kéo chuột xoay · Cuộn zoom · 🖐️ Bật điều khiển tay rồi pinch để xếp thuốc lên kệ đúng phân loại
    </div>
  );
}
