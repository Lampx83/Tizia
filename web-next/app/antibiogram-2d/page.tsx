'use client';

import { useEffect } from 'react';

// WRAP-MOUNT: trang gốc /public/antibiogram-2d.html là canvas kháng sinh đồ
// (Kirby–Bauer) thuần vanilla. Ở đây tái hiện NGUYÊN VĂN skeleton DOM + <style>
// gốc, rồi nạp toàn bộ script gốc (đã copy sang /public/legacy/antibiogram-2d.js)
// bằng <script type="module">. Engine tự querySelector theo id/class gốc.
// Không viết lại engine.

const STYLE = `
  :root { --bg-1:#0f172a; --bg-2:#1e293b; --accent:#22c55e; --ok:#10b981; --err:#ef4444; --warn:#fbbf24; }
  * { box-sizing:border-box; }
  html,body { margin:0; height:100%; font-family:'Inter',system-ui,sans-serif; color:#fff; overflow:hidden; }
  body { background:radial-gradient(ellipse 80% 50% at 50% 0%, rgba(34,197,94,.16), transparent), linear-gradient(180deg,var(--bg-1),var(--bg-2)); }
  .topbar { position:fixed; top:0; left:0; right:0; z-index:10; display:flex; gap:14px; align-items:center; padding:10px 16px;
    background:rgba(0,0,0,.4); backdrop-filter:blur(10px); border-bottom:1px solid rgba(255,255,255,.08); font-size:13px; }
  .topbar a { color:#fff; opacity:.75; text-decoration:none; } .topbar a:hover { opacity:1; }
  .topbar .spacer { flex:1; }
  .stat { display:inline-flex; gap:6px; align-items:center; } .stat b { color:var(--accent); font-weight:700; }
  .step-pill { background:var(--accent); color:#08311a; padding:4px 10px; border-radius:14px; font-weight:700; font-size:12px; }
  canvas { display:block; position:absolute; top:0; left:0; touch-action:none; }
  .panel { position:fixed; bottom:16px; left:50%; transform:translateX(-50%); background:rgba(0,0,0,.62); backdrop-filter:blur(12px);
    border:1px solid rgba(255,255,255,.12); border-radius:14px; padding:12px 18px; display:flex; gap:10px; align-items:center; z-index:10;
    max-width:94vw; flex-wrap:wrap; justify-content:center; }
  .panel button { background:var(--accent); color:#08311a; border:none; padding:9px 16px; border-radius:10px; font-family:inherit;
    font-weight:700; font-size:13px; cursor:pointer; transition:transform .1s,filter .15s; }
  .panel button:hover:not(:disabled) { transform:translateY(-1px); filter:brightness(1.1); }
  .panel button:disabled { opacity:.4; cursor:not-allowed; }
  .panel button.sir { background:#334155; color:#fff; min-width:54px; }
  .panel button.sir.S { background:#16a34a; } .panel button.sir.I { background:#d97706; } .panel button.sir.R { background:#dc2626; }
  .panel .hint { font-size:13px; opacity:.92; }
  .card { position:fixed; top:54px; right:14px; z-index:9; background:rgba(2,6,23,.7); backdrop-filter:blur(8px);
    border:1px solid rgba(255,255,255,.12); border-radius:12px; padding:10px 12px; font-size:11.5px; max-width:210px; }
  .card h4 { margin:0 0 6px; font-size:12px; color:var(--accent); }
  .card table { border-collapse:collapse; width:100%; } .card td,.card th { padding:2px 4px; text-align:center; }
  .card th { opacity:.7; font-weight:600; } .card td:first-child { text-align:left; font-weight:700; }
  .toast { position:fixed; top:60px; left:50%; transform:translateX(-50%); background:rgba(0,0,0,.85); color:#fff; padding:10px 18px;
    border-radius:10px; font-size:14px; z-index:20; animation:tin .3s ease; border-left:3px solid var(--accent); max-width:90vw; }
  @keyframes tin { from{opacity:0;transform:translate(-50%,-8px);} to{opacity:1;transform:translate(-50%,0);} }
  .toast.err { border-left-color:var(--err); } .toast.ok { border-left-color:var(--ok); }
  .modal { position:fixed; inset:0; z-index:30; background:rgba(0,0,0,.72); backdrop-filter:blur(6px); display:none; align-items:center; justify-content:center; }
  .modal.show { display:flex; }
  .modal-card { background:linear-gradient(135deg,#1e293b,#064e3b); border-radius:16px; padding:24px 28px; max-width:520px; width:90vw;
    border:1px solid rgba(255,255,255,.15); box-shadow:0 20px 60px rgba(0,0,0,.5); }
  .modal h2 { margin:0 0 10px; font-size:23px; } .modal .score { font-size:52px; font-weight:800; text-align:center; color:var(--accent); line-height:1; margin:10px 0; }
  .modal .row { display:flex; justify-content:space-between; padding:6px 0; border-bottom:1px solid rgba(255,255,255,.08); font-size:14px; }
  .modal .row:last-child { border-bottom:none; }
  .modal-btns { display:flex; gap:10px; margin-top:18px; justify-content:center; flex-wrap:wrap; }
  .modal-btns button,.modal-btns a { padding:10px 18px; border-radius:10px; border:none; font-family:inherit; font-weight:700; font-size:14px;
    cursor:pointer; text-decoration:none; color:#fff; text-align:center; }
  .modal-btns .primary { background:var(--accent); color:#08311a; } .modal-btns .outline { background:transparent; border:1px solid rgba(255,255,255,.2); }
  @media (max-width:720px){ .topbar{font-size:11px;padding:8px 10px;gap:8px;flex-wrap:wrap;} .card{max-width:160px;font-size:10px;top:48px;right:8px;}
    .panel button{padding:11px 14px;min-height:44px;} .modal .score{font-size:42px;} }
`;

// Markup <body> gốc, GIỮ NGUYÊN mọi id/class/href để script cũ querySelector trúng.
const SKELETON = `
<div class="topbar">
  <a href="/space?b=lab_micro&domain=pharmacy">← PTN Vi sinh</a>
  <span class="step-pill" id="step-pill">Bước 1/3</span>
  <span class="stat">🦠 <b id="bug">E. coli</b></span>
  <span class="stat">🎯 <b id="score">0</b></span>
  <span class="spacer"></span>
  <span class="stat" style="opacity:.75" id="hint-text">Chọn 1 khoanh kháng sinh rồi đặt lên đĩa thạch</span>
</div>

<canvas id="canvas"></canvas>

<div class="card">
  <h4>📏 Ngưỡng phiên giải (mm)</h4>
  <table id="bk-table"><thead><tr><th>KS</th><th>S ≥</th><th>R ≤</th></tr></thead><tbody></tbody></table>
  <div style="margin-top:6px;opacity:.7;line-height:1.4">Vòng càng to → càng nhạy (S). Giữa hai ngưỡng = trung gian (I).</div>
</div>

<div class="panel" id="panel">
  <span class="hint" id="panel-hint">Đặt đủ 4 khoanh kháng sinh lên đĩa.</span>
  <button id="btn-incubate" disabled>🌡️ Ủ 35°C · 18h</button>
  <button id="btn-restart">↺ Làm lại</button>
</div>

<div class="modal" id="modal">
  <div class="modal-card">
    <h2 id="modal-title">🎉 Hoàn thành kháng sinh đồ!</h2>
    <div class="score" id="modal-score">0</div>
    <div id="modal-details"></div>
    <div class="modal-btns">
      <button class="primary" id="modal-replay">↺ Làm lại</button>
      <a class="outline" href="/space?b=lab_micro&domain=pharmacy">← PTN Vi sinh</a>
      <a class="outline" href="/school?domain=pharmacy#campus-hero">🏫 Khuôn viên</a>
    </div>
  </div>
</div>
`;

export default function Antibiogram2DPage() {
  useEffect(() => {
    // Skeleton đã render (JSX bên dưới) trước khi effect chạy → nạp engine gốc.
    const script = document.createElement('script');
    script.type = 'module'; // script gốc dùng dynamic import('/js/api.js')
    script.src = `/legacy/antibiogram-2d.js?ts=${Date.now()}`;
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
