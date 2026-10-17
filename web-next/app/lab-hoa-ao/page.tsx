'use client';

// ============================================================
// Lab Hoá Học Ảo — WRAP-MOUNT của public/lab-hoa-ao.html.
// Engine gốc (kéo thả hoá chất → phản ứng, sổ tay, thử thách, huy hiệu) là một
// khối <script> classic thuần vanilla DOM. Ở đây KHÔNG viết lại sang React:
//   • STYLE   = nguyên văn khối <style> gốc (custom props :root + selector global).
//   • SKELETON = nguyên văn markup <body> gốc, GIỮ mọi id/class/data-* để
//     querySelector/getElementById của engine trúng.
//   • useEffect nạp /legacy/lab-hoa-ao.js (classic script — script gốc không
//     dùng import). File legacy đã bọc IIFE nên nạp lại khi remount vẫn an toàn.
// Asset ngoài duy nhất: fetch('/api/wallet') để cộng XP — chạy qua next.config
// proxy sang Express, giữ nguyên đường dẫn.
// ============================================================

import { useEffect, useRef } from 'react';

// Nguyên văn khối <style> trong <head> gốc.
const STYLE = `
  :root {
    --bg-1:#dbeafe; --bg-2:#ede9fe; --bg-3:#ffffff;
    --ink:#0f172a; --muted:#475569;
    --accent:#7c3aed; --accent-2:#2563eb;
    --good:#10b981; --bad:#ef4444; --warn:#f59e0b;
    --line:rgba(15,23,42,.1);
  }
  * { box-sizing: border-box; }
  html, body {
    margin: 0; min-height: 100%;
    font-family: 'Inter','Be Vietnam Pro',system-ui,sans-serif;
    color: var(--ink);
    background: linear-gradient(135deg, var(--bg-1) 0%, var(--bg-2) 60%, var(--bg-3) 100%);
  }
  .topbar {
    position: sticky; top: 0; z-index: 30;
    display: flex; align-items: center; gap: 14px;
    padding: 12px 22px;
    background: rgba(255,255,255,.78);
    backdrop-filter: blur(14px);
    border-bottom: 1px solid var(--line);
  }
  .back {
    background: rgba(124,58,237,.1); color: var(--accent);
    padding: 7px 14px; border-radius: 18px;
    text-decoration: none; font-size: 13px; font-weight: 700;
    border: 1px solid rgba(124,58,237,.25);
    transition: background .15s, transform .12s;
  }
  .back:hover { background: rgba(124,58,237,.2); transform: translateX(-2px); }
  .title { font-size: 17px; font-weight: 800; letter-spacing: -.2px; }
  .title .em { font-size: 22px; margin-right: 6px; }
  .stat { margin-left: auto; display: flex; gap: 8px; flex-wrap: wrap; }
  .pill {
    background: #fff; border: 1px solid var(--line);
    padding: 6px 13px; border-radius: 14px;
    font-size: 13px; font-weight: 700; color: var(--ink);
    box-shadow: 0 1px 3px rgba(0,0,0,.04);
  }
  .pill b { color: var(--accent); }

  .lab {
    display: grid; grid-template-columns: 280px 1fr 340px;
    gap: 18px; padding: 18px 22px 30px;
    max-width: 1320px; margin: 0 auto;
  }
  @media (max-width: 1000px) { .lab { grid-template-columns: 1fr; } }

  /* Cột trái — kệ hoá chất */
  .shelf {
    background: rgba(255,255,255,.7);
    border-radius: 18px; padding: 16px;
    border: 1px solid var(--line);
    box-shadow: 0 4px 18px rgba(15,23,42,.05);
  }
  .shelf h3 { margin: 0 0 12px; font-size: 14px; text-transform: uppercase; letter-spacing: .5px; color: var(--muted); }
  .bottles { display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; }
  .bottle {
    position: relative;
    padding: 10px 8px; border-radius: 12px;
    background: linear-gradient(180deg, #fff, #f8fafc);
    border: 1.5px solid var(--line);
    cursor: grab; user-select: none;
    display: flex; flex-direction: column; align-items: center; gap: 4px;
    transition: transform .12s, border-color .15s, box-shadow .15s;
  }
  .bottle:hover { transform: translateY(-2px); border-color: var(--accent); box-shadow: 0 6px 16px rgba(124,58,237,.18); }
  .bottle:active { cursor: grabbing; transform: scale(.97); }
  .bottle.dragging { opacity: .4; }
  .bottle.used { border-color: var(--good); background: linear-gradient(180deg, #f0fdf4, #ecfdf5); }
  .bottle.used::after {
    content: '✓'; position: absolute; top: 4px; right: 4px;
    font-size: 11px; color: var(--good); font-weight: 800;
  }
  .bottle svg { width: 38px; height: 50px; }
  .bottle .nm { font-size: 12.5px; font-weight: 800; }
  .bottle .lbl { font-size: 10.5px; opacity: .65; }

  /* Trung tâm */
  .work {
    background: rgba(255,255,255,.6);
    border-radius: 18px; padding: 20px;
    border: 1px solid var(--line);
    display: flex; flex-direction: column; align-items: center; gap: 16px;
    box-shadow: 0 4px 18px rgba(15,23,42,.05);
  }
  .work h3 { margin: 0; font-size: 14px; text-transform: uppercase; letter-spacing: .5px; color: var(--muted); }

  .mixers {
    display: flex; gap: 10px; min-height: 80px;
    align-items: center; flex-wrap: wrap; justify-content: center;
  }
  .mixer-slot {
    width: 76px; height: 76px;
    border-radius: 14px;
    border: 2.5px dashed rgba(124,58,237,.35);
    background: rgba(255,255,255,.5);
    display: flex; align-items: center; justify-content: center;
    flex-direction: column; gap: 2px;
    transition: background .15s, border-color .15s;
    font-size: 11px; color: var(--muted); text-align: center;
  }
  .mixer-slot.over { background: rgba(124,58,237,.12); border-color: var(--accent); }
  .mixer-slot.filled { background: #fff; border-style: solid; border-color: var(--line); cursor: pointer; }
  .mixer-slot .nm { font-weight: 800; font-size: 12.5px; color: var(--ink); }
  .mixer-slot svg { width: 30px; height: 38px; }

  .tube-area {
    position: relative;
    display: flex; align-items: flex-end; justify-content: center;
    width: 220px; height: 320px;
  }
  .tube {
    position: relative;
    width: 110px; height: 280px;
    border: 4px solid rgba(15,23,42,.3); border-top: none;
    border-radius: 0 0 55px 55px;
    background: linear-gradient(180deg, rgba(255,255,255,.4) 0%, rgba(220,230,250,.25) 100%);
    overflow: hidden;
    transition: border-color .25s, box-shadow .4s;
  }
  .tube::before {
    content: ''; position: absolute; top: -8px; left: -4px; right: -4px; height: 14px;
    border: 4px solid rgba(15,23,42,.3); border-bottom: none;
    border-radius: 6px 6px 0 0; background: rgba(255,255,255,.5);
  }
  .tube.drop-target { border-color: var(--accent); box-shadow: 0 0 0 6px rgba(124,58,237,.15); }
  .tube.hot { box-shadow: 0 0 28px 6px rgba(249,115,22,.6); border-color: #f97316; }
  .liquid {
    position: absolute; left: 0; right: 0; bottom: 0; height: 0;
    background: linear-gradient(180deg, rgba(255,255,255,.3), currentColor);
    color: transparent;
    transition: height .55s ease-out, background-color .5s;
  }
  .liquid.fill { height: 60%; }
  .liquid.fill-full { height: 78%; }
  .sediment {
    position: absolute; left: 0; right: 0; bottom: 0;
    height: 0;
    transition: height .6s ease-out, background-color .4s;
    pointer-events: none;
  }
  .bubble {
    position: absolute; bottom: 0;
    width: 9px; height: 9px; border-radius: 50%;
    background: rgba(255,255,255,.85);
    animation: rise 1.6s linear forwards;
    pointer-events: none;
  }
  @keyframes rise {
    0%   { bottom: 5%; opacity: .9; transform: translateX(0) scale(.6); }
    100% { bottom: 95%; opacity: 0; transform: translateX(var(--dx, 0)) scale(1.3); }
  }
  .precip {
    position: absolute;
    width: 6px; height: 6px; border-radius: 50%;
    animation: fall 1.4s ease-in forwards;
    pointer-events: none;
  }
  @keyframes fall {
    0%   { top: 10%; opacity: 1; }
    100% { top: 75%; opacity: .85; }
  }

  /* Predict bar */
  .predict {
    width: 100%; max-width: 340px;
    background: rgba(255,255,255,.8);
    border: 1px dashed rgba(124,58,237,.35);
    border-radius: 12px; padding: 10px 12px;
    display: none;
  }
  .predict.show { display: block; }
  .predict h4 { margin: 0 0 8px; font-size: 12px; font-weight: 800; color: var(--accent); text-align: center; }
  .predict .opts { display: grid; grid-template-columns: repeat(3, 1fr); gap: 6px; }
  .predict-btn {
    background: #fff; border: 1.5px solid var(--line);
    border-radius: 8px; padding: 7px 4px;
    font-size: 11.5px; font-weight: 700; color: var(--ink);
    cursor: pointer; font-family: inherit;
    transition: border-color .12s, background .12s;
  }
  .predict-btn:hover { border-color: var(--accent); background: #faf5ff; }
  .predict-btn.on { background: var(--accent); color: #fff; border-color: var(--accent); }

  .actions { display: flex; gap: 8px; flex-wrap: wrap; justify-content: center; }
  .btn {
    padding: 10px 18px; border-radius: 12px;
    background: var(--accent); color: #fff;
    font-weight: 800; font-size: 13.5px; font-family: inherit;
    border: none; cursor: pointer;
    box-shadow: 0 4px 12px rgba(124,58,237,.3);
    transition: transform .12s, filter .15s;
  }
  .btn:hover:not(:disabled) { transform: translateY(-1px); filter: brightness(1.06); }
  .btn:disabled { opacity: .35; cursor: not-allowed; box-shadow: none; }
  .btn.ghost {
    background: #fff; color: var(--ink);
    border: 1px solid var(--line); box-shadow: none;
  }
  .btn.ghost:hover:not(:disabled) { background: #f8fafc; }
  .btn.small { padding: 7px 12px; font-size: 12px; }

  /* Cột phải */
  .result {
    background: rgba(255,255,255,.85);
    border-radius: 18px; padding: 16px;
    border: 1px solid var(--line);
    box-shadow: 0 4px 18px rgba(15,23,42,.05);
    display: flex; flex-direction: column; gap: 12px;
  }
  .result h3 { margin: 0; font-size: 14px; text-transform: uppercase; letter-spacing: .5px; color: var(--muted); }
  .result-empty { font-size: 13px; color: var(--muted); padding: 8px 4px; line-height: 1.55; }
  .eq {
    font-size: 16px; font-weight: 800; line-height: 1.4;
    background: linear-gradient(135deg, #f0f9ff, #faf5ff);
    border: 1px solid rgba(124,58,237,.2);
    border-radius: 12px; padding: 12px 14px;
  }
  .phen {
    font-size: 13px; line-height: 1.55;
    background: #fffbeb; border: 1px solid #fde68a;
    border-radius: 10px; padding: 10px 12px;
  }
  .phen b { color: var(--warn); }
  .expl { font-size: 12.5px; line-height: 1.55; color: var(--muted); }
  .tag {
    display: inline-block;
    padding: 3px 9px; border-radius: 8px;
    font-size: 11.5px; font-weight: 700;
    margin-right: 4px; margin-bottom: 4px;
  }
  .tag.kt { background: #dbeafe; color: #1e40af; }
  .tag.kh { background: #fef3c7; color: #92400e; }
  .tag.dm { background: #fce7f3; color: #9d174d; }
  .tag.nh { background: #d1fae5; color: #065f46; }
  .tag.nx { background: #f1f5f9; color: #475569; }
  .tag.new { background: linear-gradient(90deg,#f59e0b,#ef4444); color:#fff; animation: pulse 1.4s infinite; }
  @keyframes pulse { 0%,100%{transform:scale(1)} 50%{transform:scale(1.08)} }

  /* Challenge box */
  .challenge {
    background: linear-gradient(135deg, #fef3c7, #fde68a);
    border: 1px solid #f59e0b;
    border-radius: 12px; padding: 10px 12px;
    font-size: 12.5px; line-height: 1.5;
  }
  .challenge .lab-h { font-weight: 800; color: #b45309; font-size: 11.5px; text-transform: uppercase; letter-spacing: .5px; margin-bottom: 3px; }
  .challenge.done { background: linear-gradient(135deg, #d1fae5, #a7f3d0); border-color: var(--good); }
  .challenge.done .lab-h { color: #065f46; }

  /* Achievements */
  .achievements {
    background: rgba(255,255,255,.7);
    border: 1px solid var(--line);
    border-radius: 12px; padding: 10px 12px;
  }
  .achievements h4 { margin: 0 0 8px; font-size: 11.5px; font-weight: 800; color: var(--muted); text-transform: uppercase; letter-spacing: .5px; }
  .badges { display: grid; grid-template-columns: repeat(5, 1fr); gap: 6px; }
  .badge {
    aspect-ratio: 1; border-radius: 10px;
    display: flex; align-items: center; justify-content: center;
    font-size: 22px;
    background: #f1f5f9; border: 1.5px solid var(--line);
    filter: grayscale(1); opacity: .4;
    cursor: pointer; transition: transform .12s, filter .15s, opacity .15s;
    position: relative;
  }
  .badge.got {
    filter: none; opacity: 1;
    background: linear-gradient(135deg, #fef3c7, #fde68a);
    border-color: #f59e0b;
    box-shadow: 0 2px 8px rgba(245,158,11,.3);
  }
  .badge:hover { transform: scale(1.1); }
  .badge[data-tip]:hover::after {
    content: attr(data-tip);
    position: absolute; bottom: 110%; left: 50%;
    transform: translateX(-50%);
    background: rgba(15,23,42,.92); color: #fff;
    padding: 5px 9px; border-radius: 6px;
    font-size: 10.5px; white-space: nowrap;
    pointer-events: none; z-index: 50;
  }

  .progress-bar {
    margin-top: auto;
    background: #f1f5f9; border-radius: 999px; height: 8px;
    overflow: hidden;
  }
  .progress-bar > div {
    height: 100%; background: linear-gradient(90deg, var(--accent), var(--accent-2));
    transition: width .4s ease;
  }
  .progress-text { font-size: 12px; color: var(--muted); margin-top: 4px; }

  /* Toast */
  .toast {
    position: fixed; bottom: 24px; left: 50%; transform: translateX(-50%) translateY(20px);
    background: rgba(15,23,42,.92); color: #fff;
    padding: 11px 22px; border-radius: 14px;
    font-size: 13.5px; font-weight: 600;
    opacity: 0; pointer-events: none;
    transition: opacity .25s, transform .25s;
    z-index: 100; max-width: 80vw; text-align: center;
  }
  .toast.show { opacity: 1; transform: translateX(-50%) translateY(0); }
  .toast.good { background: rgba(16,185,129,.95); }
  .toast.bad { background: rgba(239,68,68,.95); }
  .toast.warn { background: rgba(245,158,11,.95); }

  .sparkle {
    position: fixed; pointer-events: none;
    font-size: 20px; animation: spark .9s ease-out forwards; z-index: 90;
  }
  @keyframes spark {
    0%   { opacity: 0; transform: scale(.4); }
    30%  { opacity: 1; transform: scale(1.3) rotate(20deg); }
    100% { opacity: 0; transform: scale(.6) translateY(-50px) rotate(-30deg); }
  }

  .legend {
    margin-top: 10px;
    background: rgba(255,255,255,.7);
    border: 1px solid var(--line);
    border-radius: 14px; padding: 10px 12px;
    font-size: 11.5px; color: var(--muted); line-height: 1.5;
  }
  .legend b { color: var(--ink); }
  .hotkey { background:#f1f5f9; border:1px solid var(--line); border-radius:4px; padding:1px 5px; font-family:'JetBrains Mono',monospace; font-size:10.5px; font-weight:700; color:var(--ink); }

  /* Modal sổ tay */
  .modal-bg {
    position: fixed; inset: 0;
    background: rgba(15,23,42,.6); backdrop-filter: blur(6px);
    display: none; align-items: center; justify-content: center;
    z-index: 200; padding: 20px;
  }
  .modal-bg.show { display: flex; animation: fadein .25s; }
  @keyframes fadein { from{opacity:0} to{opacity:1} }
  .modal {
    background: #fff; border-radius: 20px;
    max-width: 880px; width: 100%; max-height: 86vh;
    overflow: hidden; display: flex; flex-direction: column;
    box-shadow: 0 20px 60px rgba(0,0,0,.4);
  }
  .modal-head {
    padding: 16px 22px;
    background: linear-gradient(135deg, var(--accent), var(--accent-2));
    color: #fff;
    display: flex; align-items: center; gap: 14px;
  }
  .modal-head h2 { margin: 0; font-size: 18px; font-weight: 800; }
  .modal-head .mh-stat { margin-left: auto; font-size: 13px; opacity: .9; }
  .modal-close {
    background: rgba(255,255,255,.2); color: #fff;
    border: none; border-radius: 10px;
    width: 32px; height: 32px; font-size: 18px;
    cursor: pointer; font-weight: 800;
  }
  .modal-close:hover { background: rgba(255,255,255,.35); }
  .modal-body { padding: 18px 22px; overflow-y: auto; flex: 1; }
  .modal-tabs { display: flex; gap: 6px; flex-wrap: wrap; margin-bottom: 14px; }
  .modal-tab {
    padding: 6px 12px; border-radius: 14px;
    background: #f1f5f9; border: 1px solid var(--line);
    font-size: 12px; font-weight: 700; cursor: pointer;
    font-family: inherit; color: var(--ink);
  }
  .modal-tab.on { background: var(--accent); color: #fff; border-color: var(--accent); }
  .rxn-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 10px; }
  .rxn-card {
    background: #fff; border: 1px solid var(--line);
    border-radius: 12px; padding: 11px 13px;
    font-size: 12.5px; line-height: 1.45;
    transition: transform .12s, box-shadow .15s;
  }
  .rxn-card.locked {
    background: repeating-linear-gradient(45deg, #f8fafc 0 6px, #f1f5f9 6px 12px);
    color: var(--muted);
    filter: blur(.3px);
  }
  .rxn-card.locked .rxn-eq { color: var(--muted); font-style: italic; }
  .rxn-card .rxn-eq { font-weight: 800; margin-bottom: 4px; font-size: 13px; }
  .rxn-card .rxn-phen { font-size: 11.5px; color: var(--muted); }
  .rxn-card .rxn-tag { display:inline-block; padding:2px 6px; border-radius:6px; font-size:10.5px; font-weight:700; margin-bottom: 4px; }
`;

// Nguyên văn markup <body> gốc — giữ mọi id/class/data-* cho engine.
const SKELETON = `
<div class="topbar">
  <a class="back" href="/">← Tizia</a>
  <div class="title"><span class="em">🧪</span>Lab Hoá Học Ảo</div>
  <div class="stat">
    <span class="pill">🧬 Khám phá: <b id="st-disc">0</b>/<span id="st-total">0</span></span>
    <span class="pill">🏆 Huy hiệu: <b id="st-badge">0</b>/5</span>
    <span class="pill">⭐ XP: <b id="st-xp">0</b></span>
  </div>
</div>

<div class="lab">
  <!-- Cột trái -->
  <section class="shelf">
    <h3>🧪 Kệ hoá chất</h3>
    <div class="bottles" id="bottles"></div>
    <div class="legend">
      Kéo (hoặc bấm) 2 lọ vào ống nghiệm để pha trộn.<br/>
      <b>↓</b> kết tủa · <b>↑</b> khí bay · <b>✓</b> đã dùng<br/>
      Phím tắt: <span class="hotkey">R</span> pha · <span class="hotkey">C</span> rửa · <span class="hotkey">S</span> sổ tay
    </div>
  </section>

  <!-- Trung tâm -->
  <section class="work">
    <h3>⚗ Ống nghiệm</h3>
    <div class="mixers">
      <div class="mixer-slot" id="slot-1" data-slot="0">Lọ 1<br/><span style="font-size:18px">＋</span></div>
      <div class="mixer-slot" id="slot-2" data-slot="1">Lọ 2<br/><span style="font-size:18px">＋</span></div>
    </div>
    <div class="tube-area">
      <div class="tube" id="tube">
        <div class="liquid" id="liquid"></div>
        <div class="sediment" id="sediment"></div>
      </div>
    </div>

    <div class="predict" id="predict">
      <h4>🔮 ĐOÁN HIỆN TƯỢNG TRƯỚC KHI PHA (+5 XP nếu đúng)</h4>
      <div class="opts">
        <button class="predict-btn" data-pred="kt">↓ Kết tủa</button>
        <button class="predict-btn" data-pred="kh">↑ Sinh khí</button>
        <button class="predict-btn" data-pred="dm">🎨 Đổi màu</button>
        <button class="predict-btn" data-pred="nh">🔥 Trung hoà</button>
        <button class="predict-btn" data-pred="nx">— Không phản ứng</button>
        <button class="predict-btn" data-pred="">Bỏ qua</button>
      </div>
    </div>

    <div class="actions">
      <button class="btn" id="btn-react" disabled>▶ Pha trộn</button>
      <button class="btn ghost" id="btn-clear">🧹 Rửa ống</button>
      <button class="btn ghost small" id="btn-hint">💡 Gợi ý</button>
      <button class="btn ghost small" id="btn-book">📔 Sổ tay</button>
      <button class="btn ghost small" id="btn-predict-toggle">🔮 Đoán</button>
    </div>
  </section>

  <!-- Cột phải -->
  <section class="result">
    <h3>📋 Kết quả</h3>
    <div id="result-body">
      <div class="result-empty">
        Chưa có phản ứng nào.<br/>Chọn 2 hoá chất rồi bấm <b>Pha trộn</b> để khám phá!
      </div>
    </div>

    <div class="challenge" id="challenge">
      <div class="lab-h">🎯 Thử thách hôm nay</div>
      <div id="challenge-body">Đang tải...</div>
    </div>

    <div class="achievements">
      <h4>🏆 Huy hiệu</h4>
      <div class="badges" id="badges"></div>
    </div>

    <div>
      <div class="progress-bar"><div id="pg" style="width:0%"></div></div>
      <div class="progress-text" id="pg-text">0 / 0 phản ứng đã khám phá</div>
    </div>
  </section>
</div>

<!-- Modal sổ tay -->
<div class="modal-bg" id="modal-bg">
  <div class="modal">
    <div class="modal-head">
      <h2>📔 Sổ Tay Phản Ứng</h2>
      <div class="mh-stat" id="mh-stat">0 / 0</div>
      <button class="modal-close" id="modal-close">✕</button>
    </div>
    <div class="modal-body">
      <div class="modal-tabs" id="modal-tabs">
        <button class="modal-tab on" data-cat="">Tất cả</button>
        <button class="modal-tab" data-cat="kt">↓ Kết tủa</button>
        <button class="modal-tab" data-cat="kh">↑ Khí</button>
        <button class="modal-tab" data-cat="dm">🎨 Đổi màu</button>
        <button class="modal-tab" data-cat="nh">🔥 Trung hoà</button>
        <button class="modal-tab" data-cat="nx">— Không phản ứng</button>
      </div>
      <div class="rxn-grid" id="rxn-grid"></div>
    </div>
  </div>
</div>

<div class="toast" id="toast"></div>
`;

export default function LabHoaAoPage() {
  const mounted = useRef(false);

  useEffect(() => {
    // Chặn React StrictMode gọi effect hai lần → nạp engine trùng.
    if (mounted.current) return;
    mounted.current = true;

    // Script gốc là classic (không dùng import) → nạp dạng classic.
    const script = document.createElement('script');
    script.src = '/legacy/lab-hoa-ao.js';
    document.body.appendChild(script);

    return () => {
      script.remove();
      // Dọn sparkle nổi mà engine append vào <body> khi phản ứng toả nhiệt,
      // tránh sót lại sau khi rời trang.
      document.querySelectorAll('body > .sparkle').forEach((n) => n.remove());
    };
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STYLE }} />
      <div dangerouslySetInnerHTML={{ __html: SKELETON }} />
    </>
  );
}
