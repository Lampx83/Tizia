'use client';

import { useEffect } from 'react';

// WRAP-MOUNT: trang Three.js "PS15 · Tour Nhà máy GMP" (4 cleanroom) của bản
// vanilla, phục vụ nguyên vẹn qua Next.
//  - SKELETON = markup <body> gốc, GIỮ NGUYÊN mọi id/class/data-* để engine cũ
//    querySelector trúng.
//  - STYLE = toàn bộ <style> gốc, chèn qua dangerouslySetInnerHTML.
//  - Engine gốc là ES module dùng bare-import "three" qua <script type="importmap">.
//    Importmap PHẢI được thêm vào document TRƯỚC khi module script chạy, nên effect
//    inject importmap trước rồi mới nạp /legacy/PS15-gmp-factory.js (type="module").

const STYLE = `
  html, body { margin: 0; height: 100%; overflow: hidden;
    background: linear-gradient(180deg, #e8efe9 0%, #c9d5cc 100%);
    font-family: system-ui, -apple-system, "Segoe UI", sans-serif;
    touch-action: none; color: #1f2937; -webkit-tap-highlight-color: transparent; }
  canvas { display: block; touch-action: none; }
  a { color: inherit; }

  /* ===== Top bar ===== */
  #topbar {
    position: absolute; top: 12px; left: 50%; transform: translateX(-50%);
    z-index: 10; display: flex; gap: 10px; align-items: center;
    background: rgba(255,255,255,0.94); backdrop-filter: blur(8px);
    padding: 8px 14px; border-radius: 14px; font-size: 13px;
    box-shadow: 0 4px 14px rgba(0,0,0,0.12);
    border: 1px solid rgba(0,0,0,0.06);
    white-space: nowrap;
  }
  #topbar .pill {
    background: linear-gradient(135deg, #14b8a6, #0f766e); color: #fff;
    padding: 4px 10px; border-radius: 14px; font-weight: 700; font-size: 11px; letter-spacing: 0.5px;
  }
  #topbar .lvl-pill {
    background: linear-gradient(135deg, #fbbf24, #f59e0b); color: #3e2723;
    padding: 4px 10px; border-radius: 14px; font-weight: 700; font-size: 11px;
  }
  a.back {
    position: absolute; top: 12px; left: 12px; z-index: 10;
    background: rgba(255,255,255,0.85); color: #1f2937; padding: 6px 12px; border-radius: 8px;
    text-decoration: none; font-size: 13px; box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  }

  /* ===== Left mini-map ===== */
  #minimap {
    position: absolute; top: 60px; left: 12px; z-index: 10;
    width: 260px;
    background: rgba(255,255,255,0.96);
    border-radius: 12px; padding: 14px;
    box-shadow: 0 6px 18px rgba(0,0,0,0.18);
    border: 1px solid rgba(0,0,0,0.06);
  }
  #minimap h3 { margin: 0 0 8px; font-size: 12px; opacity: 0.7; letter-spacing: 0.4px; text-transform: uppercase; }
  #map-grid {
    display: grid; grid-template-columns: 1fr 1fr; grid-template-rows: 1fr 1fr;
    gap: 6px; width: 100%; aspect-ratio: 1;
    background: #f3f4f6; padding: 6px; border-radius: 8px;
  }
  .map-cell {
    position: relative; border-radius: 8px; cursor: pointer;
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    color: #fff; font-weight: 700; font-size: 12px; text-align: center;
    transition: transform 0.15s, box-shadow 0.15s;
    border: 2px solid transparent; padding: 6px;
  }
  .map-cell:hover { transform: scale(1.04); box-shadow: 0 4px 14px rgba(0,0,0,0.2); }
  .map-cell.active { border-color: #fff; box-shadow: 0 0 0 3px #14b8a6; }
  .map-cell .room-iso { font-size: 18px; font-weight: 800; line-height: 1; }
  .map-cell .room-name { font-size: 9px; opacity: 0.9; margin-top: 2px; letter-spacing: 0.3px; }
  .map-cell .check {
    position: absolute; top: 4px; right: 4px;
    width: 18px; height: 18px; border-radius: 50%;
    background: rgba(255,255,255,0.85); color: #047857;
    display: none; align-items: center; justify-content: center;
    font-size: 12px; font-weight: 800;
  }
  .map-cell.complete .check { display: flex; }
  /* Colors per ISO class */
  .map-cell.room-d { background: linear-gradient(135deg, #fbbf24, #d97706); }
  .map-cell.room-c { background: linear-gradient(135deg, #34d399, #047857); }
  .map-cell.room-b { background: linear-gradient(135deg, #60a5fa, #1d4ed8); }
  .map-cell.room-a { background: linear-gradient(135deg, #f87171, #b91c1c); }

  #map-legend { margin-top: 10px; font-size: 11px; line-height: 1.5; color: #4b5563; }
  #map-legend b { color: #1f2937; }

  /* ===== Right info panel ===== */
  #panel {
    position: absolute; top: 60px; right: 12px; z-index: 10;
    width: 340px; max-height: calc(100vh - 80px); overflow-y: auto;
    background: rgba(255,255,255,0.96);
    border-radius: 12px; padding: 16px 18px;
    box-shadow: 0 6px 18px rgba(0,0,0,0.18);
    border: 1px solid rgba(0,0,0,0.06);
  }
  #panel h3 { margin: 0 0 4px; font-size: 12px; opacity: 0.65; letter-spacing: 0.5px; text-transform: uppercase; }
  #panel h2 {
    margin: 4px 0 10px; font-size: 19px;
    background: linear-gradient(135deg, #14b8a6, #0f766e);
    -webkit-background-clip: text; background-clip: text; color: transparent;
  }
  #room-stats {
    display: grid; grid-template-columns: 1fr 1fr; gap: 6px;
    margin: 8px 0 12px;
  }
  #room-stats .stat {
    background: #f9fafb; border-radius: 8px; padding: 8px 10px;
    border: 1px solid #e5e7eb;
  }
  #room-stats .stat .lbl { font-size: 10px; opacity: 0.6; text-transform: uppercase; letter-spacing: 0.4px; }
  #room-stats .stat .val { font-size: 13px; font-weight: 700; margin-top: 2px; color: #111827; }
  #ppe-list, #activity-list { list-style: none; padding: 0; margin: 4px 0 10px; font-size: 12.5px; }
  #ppe-list li, #activity-list li {
    padding: 4px 0 4px 18px; position: relative;
  }
  #ppe-list li::before { content: '✓'; position: absolute; left: 0; color: #10b981; font-weight: 800; }
  #activity-list li::before { content: '•'; position: absolute; left: 4px; color: #14b8a6; font-weight: 800; font-size: 16px; line-height: 1; }

  /* ===== Challenge card ===== */
  #challenge {
    background: linear-gradient(135deg, #fef9c3, #fef3c7);
    border: 1.5px solid #fbbf24;
    border-radius: 10px; padding: 12px;
    margin-top: 12px;
  }
  #challenge .ctitle { font-size: 12px; font-weight: 800; color: #92400e; letter-spacing: 0.4px; text-transform: uppercase; margin-bottom: 6px; }
  #challenge .qtext { font-size: 13px; font-weight: 600; color: #1f2937; margin-bottom: 10px; line-height: 1.4; }
  #challenge .opts { display: flex; flex-direction: column; gap: 6px; }
  #challenge .opt {
    background: rgba(255,255,255,0.9); border: 1.5px solid #e5e7eb;
    border-radius: 8px; padding: 8px 12px; cursor: pointer;
    font-size: 12.5px; font-family: inherit; text-align: left;
    transition: all 0.15s; line-height: 1.4;
  }
  #challenge .opt:hover { border-color: #14b8a6; background: #f0fdfa; }
  #challenge .opt.correct { background: #dcfce7; border-color: #16a34a; color: #14532d; font-weight: 600; }
  #challenge .opt.wrong { background: #fee2e2; border-color: #dc2626; color: #7f1d1d; }
  #challenge .ref { margin-top: 8px; font-size: 10.5px; opacity: 0.7; font-style: italic; }
  #challenge .done {
    background: #dcfce7; padding: 8px; border-radius: 6px;
    font-size: 12px; color: #14532d; text-align: center;
    border: 1px dashed #16a34a;
  }
  #challenge .navrow { display: flex; gap: 6px; margin-top: 10px; }
  #challenge .nav-btn {
    flex: 1; background: rgba(0,0,0,0.06); color: #1f2937; border: none;
    padding: 6px 10px; border-radius: 6px; font-size: 11px; font-weight: 700; cursor: pointer;
    font-family: inherit;
  }
  #challenge .nav-btn:hover { background: rgba(0,0,0,0.1); }
  #challenge .nav-btn:disabled { opacity: 0.4; cursor: not-allowed; }
  #challenge .nav-dots { font-size: 11px; text-align: center; color: #92400e; font-weight: 700; padding-top: 5px; }

  /* ===== Bottom progress + submit ===== */
  #bottombar {
    position: absolute; bottom: 18px; left: 50%; transform: translateX(-50%);
    z-index: 10; display: flex; gap: 12px; align-items: center;
    background: rgba(255,255,255,0.96); backdrop-filter: blur(8px);
    padding: 10px 16px; border-radius: 16px;
    box-shadow: 0 6px 24px rgba(0,0,0,0.18); border: 1px solid rgba(0,0,0,0.06);
    min-width: 360px;
  }
  #bottombar .progwrap { flex: 1; }
  #bottombar .progtxt { font-size: 11px; font-weight: 700; color: #4b5563; margin-bottom: 4px; letter-spacing: 0.3px; }
  #bottombar .progbar { background: #e5e7eb; height: 8px; border-radius: 4px; overflow: hidden; }
  #bottombar .progbar > div {
    background: linear-gradient(90deg, #10b981, #14b8a6);
    height: 100%; width: 0; transition: width 0.4s;
  }
  #bottombar button {
    padding: 9px 16px; border-radius: 10px; border: none;
    font-family: inherit; font-size: 13px; font-weight: 700; cursor: pointer;
    background: linear-gradient(135deg, #10b981, #047857); color: #fff;
    transition: all 0.15s;
  }
  #bottombar button:hover:not(:disabled) { filter: brightness(1.08); transform: translateY(-1px); }
  #bottombar button:disabled { opacity: 0.4; cursor: not-allowed; background: #9ca3af; }

  /* ===== Result modal ===== */
  #result-modal {
    display: none; position: fixed; inset: 0; z-index: 50;
    background: rgba(15, 23, 42, 0.6); backdrop-filter: blur(4px);
    align-items: center; justify-content: center;
  }
  #result-modal.open { display: flex; }
  #result-card {
    background: white; border-radius: 18px; padding: 28px 32px;
    max-width: 480px; width: 90%;
    box-shadow: 0 30px 80px rgba(0,0,0,0.4);
  }
  #result-card h2 { margin: 0 0 6px; font-size: 22px; }
  #result-card .stars { font-size: 36px; text-align: center; margin: 8px 0 4px; }
  #result-card .score {
    font-size: 36px; font-weight: 800; text-align: center;
    background: linear-gradient(135deg, #10b981, #047857);
    -webkit-background-clip: text; background-clip: text; color: transparent;
  }
  #result-card .sub { text-align: center; font-size: 13px; opacity: 0.7; margin-bottom: 12px; }
  #result-card .row {
    display: flex; justify-content: space-between; padding: 8px 12px;
    border-radius: 8px; margin: 4px 0; background: #f3f4f6; font-size: 13px;
  }
  #result-card .row.ok { background: #dcfce7; }
  #result-card .actions { display: flex; gap: 10px; margin-top: 16px; }
  #result-card button {
    flex: 1; padding: 12px; border: none; border-radius: 10px;
    font-weight: 700; cursor: pointer; font-family: inherit; font-size: 14px;
  }
  #result-card .again { background: rgba(0,0,0,0.06); }
  #result-card .home { background: linear-gradient(135deg, #6366f1, #4338ca); color: white; }

  /* ===== Toast ===== */
  #toast {
    position: absolute; top: 60%; left: 50%; transform: translateX(-50%);
    background: rgba(0,0,0,0.88); color: white; padding: 12px 22px;
    border-radius: 22px; font-size: 14px; z-index: 30; display: none;
    box-shadow: 0 6px 22px rgba(0,0,0,0.3);
  }
  #toast.ok { background: linear-gradient(135deg, #16a34a, #15803d); }
  #toast.err { background: linear-gradient(135deg, #dc2626, #b91c1c); }

  @media (max-width: 900px) {
    #minimap { width: 200px; padding: 10px; }
    #panel { width: 280px; padding: 12px 14px; }
    #bottombar { min-width: 260px; padding: 8px 12px; }
  }
`;

const SKELETON = `
<a class="back" href="/">← Trang chủ</a>

<div id="topbar">
  <span class="pill">PS15</span>
  <span>Tour Nhà máy GMP · 4 Cleanroom</span>
  <span class="lvl-pill">Năm 4 · GMP &amp; QA</span>
</div>

<!-- Left mini-map -->
<div id="minimap">
  <h3>🗺️ Sơ đồ nhà máy</h3>
  <div id="map-grid">
    <div class="map-cell room-d" data-room="D">
      <div class="check">✓</div>
      <div class="room-iso">ISO 9</div>
      <div class="room-name">Class D · Kho</div>
    </div>
    <div class="map-cell room-c" data-room="C">
      <div class="check">✓</div>
      <div class="room-iso">ISO 8</div>
      <div class="room-name">Class C · Trộn</div>
    </div>
    <div class="map-cell room-b" data-room="B">
      <div class="check">✓</div>
      <div class="room-iso">ISO 7</div>
      <div class="room-name">Class B · Dập viên</div>
    </div>
    <div class="map-cell room-a" data-room="A">
      <div class="check">✓</div>
      <div class="room-iso">ISO 5</div>
      <div class="room-name">Class A · Vô trùng</div>
    </div>
  </div>
  <div id="map-legend">
    <b>Click</b> ô để bay tới phòng. Mỗi phòng có 3 câu hỏi GMP cần trả lời.
  </div>
</div>

<!-- Right info panel -->
<div id="panel">
  <h3 id="p-iso">ISO 9 — CLASS D</h3>
  <h2 id="p-name">Phòng Kho · Tiếp nhận nguyên liệu</h2>

  <div id="room-stats">
    <div class="stat">
      <div class="lbl">Particle ≥0.5μm/m³</div>
      <div class="val" id="p-particles">≤ 3,520,000</div>
    </div>
    <div class="stat">
      <div class="lbl">Air changes/hour</div>
      <div class="val" id="p-ach">≥ 6 ACH</div>
    </div>
  </div>

  <h3>🎯 Hoạt động</h3>
  <ul id="activity-list"></ul>

  <h3>🥽 PPE bắt buộc</h3>
  <ul id="ppe-list"></ul>

  <div id="challenge">
    <div class="ctitle">📝 Thử thách GMP</div>
    <div id="ch-content"></div>
    <div class="navrow">
      <button class="nav-btn" id="ch-prev">‹ Trước</button>
      <div class="nav-dots" id="ch-dots">1/3</div>
      <button class="nav-btn" id="ch-next">Tiếp ›</button>
    </div>
  </div>
</div>

<!-- Bottom progress -->
<div id="bottombar">
  <div class="progwrap">
    <div class="progtxt"><span id="prog-text">0 / 12</span> thử thách hoàn thành</div>
    <div class="progbar"><div id="prog-fill"></div></div>
  </div>
  <button id="btn-submit" disabled>✅ Nộp bài</button>
</div>

<!-- Result modal -->
<div id="result-modal">
  <div id="result-card">
    <h2>🏭 Hoàn thành Tour GMP</h2>
    <div class="stars" id="r-stars">⭐⭐⭐</div>
    <div class="score" id="r-score">100/100</div>
    <div class="sub" id="r-sub">Đã trả lời đủ 12 câu hỏi 4 cleanroom</div>
    <div id="r-rows"></div>
    <div class="actions">
      <button class="again" id="r-again">Làm lại</button>
      <button class="home" id="r-home">Về trang chủ</button>
    </div>
  </div>
</div>

<div id="toast"></div>
`;

const IMPORT_MAP = {
  imports: {
    three: '/vendor/three-0.160/build/three.module.js',
    'three/addons/': '/vendor/three-0.160/examples/jsm/',
  },
};

export default function Page() {
  useEffect(() => {
    // Importmap phải có mặt trước khi module script load. Chỉ thêm 1 lần.
    let importmap: HTMLScriptElement | null = null;
    if (!document.querySelector('script[type="importmap"]')) {
      importmap = document.createElement('script');
      importmap.type = 'importmap';
      importmap.textContent = JSON.stringify(IMPORT_MAP);
      document.head.appendChild(importmap);
    }

    const mod = document.createElement('script');
    mod.type = 'module';
    mod.src = '/legacy/PS15-gmp-factory.js';
    document.body.appendChild(mod);

    return () => {
      mod.remove();
      if (importmap) importmap.remove();
    };
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STYLE }} />
      <div dangerouslySetInnerHTML={{ __html: SKELETON }} />
    </>
  );
}
