'use client';

import { useEffect } from 'react';

const STYLE = `
  :root { --bg-1:#dcfce7; --bg-2:#bbf7d0; --accent:#16a34a; --ok:#22c55e; --bad:#ef4444;
    --card:#ffffff; --border:rgba(0,0,0,.08); --ink:#1f2937; --muted:#6b7280; }
  .lop2-the-thao-root *{box-sizing:border-box}
  .lop2-the-thao-root{margin:0;min-height:100vh;font-family:'Inter','Quicksand',system-ui,sans-serif;color:var(--ink);
    background:radial-gradient(ellipse 90% 50% at 50% 0%, #bbf7d0, transparent),linear-gradient(180deg,var(--bg-1),#d9f99d)}
  .lop2-the-thao-root .top{display:flex;align-items:center;gap:14px;padding:12px 18px;border-bottom:1px solid var(--border);background:rgba(255,255,255,.7);position:sticky;top:0;z-index:5;backdrop-filter:blur(8px)}
  .lop2-the-thao-root .back{color:var(--ink);text-decoration:none;opacity:.85;font-size:14px;background:rgba(0,0,0,.06);padding:8px 14px;border-radius:10px;font-weight:600}
  .lop2-the-thao-root .back:hover{background:rgba(0,0,0,.12)}
  .lop2-the-thao-root .top h1{margin:0;font-size:18px;font-weight:800}
  .lop2-the-thao-root .top .sub{font-size:12.5px;opacity:.6;font-weight:500}
  .lop2-the-thao-root .top .right{margin-left:auto;display:flex;gap:10px;align-items:center;font-size:13.5px}
  .lop2-the-thao-root .stat{background:white;border:1px solid var(--border);border-radius:14px;padding:7px 13px;font-weight:700}
  .lop2-the-thao-root .stat .v{color:var(--accent);font-size:16px}
  .lop2-the-thao-root .wrap{max-width:720px;margin:0 auto;padding:18px 18px 60px}
  .lop2-the-thao-root .intro{text-align:center;margin:6px 0 14px;opacity:.85;font-size:14px}
  .lop2-the-thao-root .field{position:relative;width:100%;height:60vh;min-height:380px;background:
    repeating-linear-gradient(0deg,#86efac 0 24px,#4ade80 24px 48px);
    border-radius:18px;border:2px solid #15803d;overflow:hidden;box-shadow:inset 0 0 30px rgba(0,0,0,.15);touch-action:manipulation}
  .lop2-the-thao-root .field::before{content:"";position:absolute;left:50%;top:0;bottom:0;width:3px;background:#fff;opacity:.5;transform:translateX(-50%)}
  .lop2-the-thao-root .field::after{content:"";position:absolute;left:50%;top:50%;width:90px;height:90px;border:3px solid #fff;border-radius:50%;opacity:.5;transform:translate(-50%,-50%)}
  .lop2-the-thao-root .target{position:absolute;width:64px;height:64px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:46px;
    cursor:pointer;transition:transform .15s;animation:pop .2s;user-select:none}
  .lop2-the-thao-root .target:active{transform:scale(.9)}
  @keyframes pop{from{transform:scale(.4)}to{transform:scale(1)}}
  .lop2-the-thao-root .center{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;flex-direction:column;color:#fff;text-shadow:0 2px 6px rgba(0,0,0,.4);pointer-events:none}
  .lop2-the-thao-root .center.hide{display:none}
  .lop2-the-thao-root .center .big{font-size:64px}
  .lop2-the-thao-root .center button{pointer-events:auto;margin-top:14px;padding:12px 26px;border:none;border-radius:14px;background:#fff;color:#15803d;font-weight:800;font-size:16px;cursor:pointer;box-shadow:0 10px 24px rgba(0,0,0,.2)}
  .modal{position:fixed;inset:0;background:rgba(15,23,42,.65);display:flex;align-items:center;justify-content:center;padding:20px;z-index:50}
  .modal.hide{display:none}
  .modal .panel{background:#fff;border-radius:20px;max-width:380px;width:100%;padding:28px 26px;text-align:center;box-shadow:0 30px 80px rgba(0,0,0,.4)}
  .modal .panel .ic{font-size:64px}
  .modal .panel h2{margin:6px 0 8px;font-size:22px}
  .modal .panel p{margin:4px 0;color:var(--muted);font-size:14px}
  .modal .panel .row{display:flex;gap:10px;justify-content:center;margin-top:18px;flex-wrap:wrap}
  .modal .btn{padding:10px 18px;border-radius:12px;border:none;background:var(--accent);color:#fff;font-weight:700;cursor:pointer;font-size:14px}
  .modal .btn.ghost{background:rgba(0,0,0,.06);color:var(--ink)}
  .modal .btn:hover{filter:brightness(1.08)}
`;

const SKELETON = `
<div class="top">
  <a class="back" href="/space?b=g2&domain=primary">← Lớp 2</a>
  <div><h1>⚽ Phản Xạ Cầu Thủ</h1><div class="sub">GDTC — bấm thật nhanh khi quả bóng/cầu xuất hiện</div></div>
  <div class="right">
    <div class="stat">⏱ <span class="v" id="time">30s</span></div>
    <div class="stat">⚽ <span class="v" id="hit">0</span></div>
    <div class="stat">💥 <span class="v" id="miss">0</span></div>
  </div>
</div>

<div class="wrap">
  <p class="intro">Bấm vào ⚽ / 🏐 / 🏸 ngay khi nó hiện trên sân. Bấm trúng sân trống bị trừ điểm. 30 giây — cố ghi nhiều bàn nhé!</p>
  <div class="field" id="field">
    <div class="center" id="center"><div class="big">⚽</div><div>Sẵn sàng tập luyện?</div><button id="btn-start">Bắt đầu</button></div>
  </div>
</div>

<div class="modal hide" id="modal-over">
  <div class="panel">
    <div class="ic" id="ov-ic">🏅</div>
    <h2 id="ov-title">Hết giờ!</h2>
    <p id="ov-msg">Cùng xem thành tích nào.</p>
    <p>Trúng: <b id="ov-hit">0</b> · Hụt: <b id="ov-miss">0</b> · Điểm: <b id="ov-score">0</b></p>
    <p>Best: <b id="ov-best">—</b></p>
    <div class="row">
      <button class="btn" id="btn-restart">🔁 Tập lại</button>
      <a class="btn ghost" href="/space?b=g2&domain=primary">← Về Lớp 2</a>
    </div>
  </div>
</div>
`;

export default function Page() {
  useEffect(() => {
    // 1) ES module gate (nguyên văn từ trang gốc, chạy trước game)
    const gate = document.createElement('script');
    gate.type = 'module';
    gate.textContent =
      'import { applyViewOnlyGate } from "/js/enrollment.js"; applyViewOnlyGate("primary");';
    document.body.appendChild(gate);

    // 2) Game script (classic, gắn listener sau khi DOM skeleton đã render)
    const game = document.createElement('script');
    game.src = '/legacy/lop2-the-thao.js';
    game.async = false;
    document.body.appendChild(game);

    return () => {
      gate.remove();
      game.remove();
    };
  }, []);

  return (
    <div className="lop2-the-thao-root">
      <style dangerouslySetInnerHTML={{ __html: STYLE }} />
      <div dangerouslySetInnerHTML={{ __html: SKELETON }} />
    </div>
  );
}
