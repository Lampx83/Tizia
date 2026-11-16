'use client';

import { useEffect } from 'react';

// Client mount cho trang Next /space. Dựng đúng khung DOM (#wrap, #toast,
// #modal) mà logic vanilla của public/space.html cần, kèm toàn bộ CSS gốc
// (scoped trong .space-root), rồi nạp wrap public/legacy/space.js SAU khi mount.
// Wrap đọc ?b= & ?domain= từ URL, fetch bộ nội dung từ DB (/api/content/space-sets),
// dựng banner/rooms/skills/quiz, mở modal phòng với các widget thực hành
// (canvas/audio/SRS), grant kỹ năng — GIỮ NGUYÊN hành vi + text tiếng Việt gốc.
export default function SpaceMount() {
  useEffect(() => {
    document.getElementById('wrap')!.textContent = 'Đang tải…';
    const s = document.createElement('script');
    s.type = 'module';
    // ?ts đảm bảo re-execute khi client-navigate lại vào trang.
    s.src = `/legacy/space.js?ts=${Date.now()}`;
    document.body.appendChild(s);
    return () => {
      s.remove();
    };
  }, []);

  return (
    <div className="space-root">
      <div className="wrap" id="wrap">
        Đang tải…
      </div>
      <div id="toast" />
      <div className="modal" id="modal">
        <div className="modal-card">
          <div className="modal-head">
            <span className="mh-ic" id="m-ic">
              📌
            </span>
            <h3 id="m-title">…</h3>
            <button className="modal-x" id="m-x">
              ✕
            </button>
          </div>
          <div className="modal-body" id="m-body" />
        </div>
      </div>

      {/* CSS gốc của public/space.html — scoped dưới .space-root để không đụng
          theme layout chung. Giữ nguyên biến --accent (đặt runtime bởi wrap). */}
      <style>{`
  .space-root { --bg-1:#0f172a; --bg-2:#1e293b; --bg-3:#312e81; --card:hsl(var(--foreground) / .06); --border:hsl(var(--foreground) / .12); color:hsl(var(--foreground)); }
  .space-root, .space-root * { box-sizing: border-box; }
  .space-root .wrap { max-width:1100px; margin:0 auto; padding:18px 0 70px; }
  .space-root .back { color:hsl(var(--foreground)); text-decoration:none; opacity:.85; font-size:14px; background:hsl(var(--foreground) / .08); padding:8px 13px; border-radius:10px; }
  .space-root .back:hover { opacity:1; background:hsl(var(--foreground) / .15); }
  .space-root .banner { position:relative; overflow:hidden; border-radius:20px; padding:26px 28px; margin-bottom:22px; border:1px solid var(--border); }
  .space-root .banner .ic { font-size:64px; line-height:1; filter:drop-shadow(0 6px 14px rgba(0,0,0,.4)); }
  .space-root .banner h1 { margin:6px 0 6px; font-size:30px; font-weight:800; }
  .space-root .banner p { margin:0; opacity:.9; max-width:760px; line-height:1.55; }
  .space-root .sec-title { font-size:13px; letter-spacing:1px; text-transform:uppercase; opacity:.65; font-weight:800; margin:24px 0 12px; }
  .space-root .rooms { display:grid; gap:14px; grid-template-columns:repeat(auto-fill,minmax(240px,1fr)); }
  .space-root .room { background:var(--card); border:1px solid var(--border); border-radius:16px; padding:16px 17px; cursor:pointer; transition:transform .15s,background .15s,border-color .15s; text-decoration:none; color:hsl(var(--foreground)); display:flex; flex-direction:column; gap:6px; }
  .space-root .room:hover { transform:translateY(-3px); background:hsl(var(--foreground) / .12); border-color:var(--accent); }
  .space-root .room .ri { font-size:30px; }
  .space-root .room h3 { margin:2px 0 0; font-size:16px; }
  .space-root .room .rd { font-size:12.5px; opacity:.8; line-height:1.5; }
  .space-root .room .tag { align-self:flex-start; margin-top:6px; font-size:10px; font-weight:700; letter-spacing:.4px; text-transform:uppercase; padding:2px 8px; border-radius:8px; background:var(--accent); color:#1f1147; }
  .space-root .room .tag.soon { background:#6b7280; color:#fff; }
  .space-root .skills { display:flex; gap:8px; flex-wrap:wrap; }
  .space-root .chip { background:hsl(var(--foreground) / .1); border:1px solid var(--border); padding:6px 12px; border-radius:20px; font-size:12.5px; transition:background .15s, border-color .15s; }
  .space-root .chip b { color:var(--accent); }
  .space-root .chip.earned   { background:rgba(16,185,129,.18); border-color:rgba(16,185,129,.55); }
  .space-root .chip.earned .chip-i { color:#059669; }
  .space-root .chip.pending  { opacity:.55; }
  .space-root .chip.pending .chip-i { color:hsl(var(--foreground) / .55); }
  .space-root .chip .chip-i { font-weight:700; margin-right:4px; }
  .space-root .chip .chip-comp { display:block; font-size:10.5px; opacity:.7; margin-top:2px; font-weight:600; letter-spacing:.2px; }
  .space-root .skills-meta { font-size:12px; opacity:.75; margin:-4px 0 8px; }
  .space-root .quiz { background:var(--card); border:1px solid var(--border); border-radius:16px; padding:18px 20px; margin-top:12px; }
  .space-root .quiz-meta { display:flex; align-items:center; gap:10px; margin:-6px 0 12px; font-size:12.5px; opacity:.8; flex-wrap:wrap; }
  .space-root .quiz-meta .reroll { margin-left:auto; background:hsl(var(--foreground) / .08); border:1px solid var(--border); color:hsl(var(--foreground)); padding:5px 11px; border-radius:8px; font-size:12px; cursor:pointer; font-family:inherit; }
  .space-root .quiz-meta .reroll:hover { background:hsl(var(--foreground) / .16); }
  .space-root .q { margin:0 0 14px; }
  .space-root .q .qt { font-weight:700; margin-bottom:8px; font-size:14.5px; display:flex; align-items:center; gap:8px; flex-wrap:wrap; }
  .space-root .q .qb { font-size:11px; padding:2px 8px; border-radius:999px; font-weight:700; line-height:1.5; white-space:nowrap; }
  .space-root .q .qb.lapse { background:rgba(251,113,133,.18); color:#e11d48; border:1px solid rgba(251,113,133,.4); }
  .space-root .q .qb.due   { background:rgba(34,197,94,.18);  color:#16a34a; border:1px solid rgba(34,197,94,.4); }
  .space-root .q .qb.new   { background:rgba(56,189,248,.18); color:#0284c7; border:1px solid rgba(56,189,248,.4); }
  .space-root .q .qb.review-early { background:rgba(167,139,250,.18); color:#7c3aed; border:1px solid rgba(167,139,250,.4); }
  .space-root .q .opt { display:block; width:100%; text-align:left; background:hsl(var(--foreground) / .05); border:1px solid var(--border); color:hsl(var(--foreground)); padding:9px 13px; border-radius:10px; margin:6px 0; cursor:pointer; font-family:inherit; font-size:13.5px; transition:background .12s; }
  .space-root .q .opt:hover { background:hsl(var(--foreground) / .12); }
  .space-root .q .opt.correct { background:rgba(16,185,129,.35); border-color:#10b981; }
  .space-root .q .opt.wrong { background:rgba(239,68,68,.3); border-color:#ef4444; }
  .space-root .quiz .submit { margin-top:6px; padding:11px 20px; border:none; border-radius:11px; background:var(--accent); color:#1f1147; font-weight:800; font-size:14px; cursor:pointer; }
  .space-root .quiz .submit:hover { filter:brightness(1.08); }
  .space-root .result { margin-top:14px; padding:14px 16px; border-radius:12px; background:rgba(16,185,129,.15); border:1px solid rgba(16,185,129,.4); display:none; }
  .space-root .result.show { display:block; }
  .space-root .result b { color:#059669; }
  .space-root #toast { position:fixed; left:50%; top:18px; transform:translateX(-50%) translateY(-10px); background:hsl(var(--card)); border:1px solid var(--border); color:hsl(var(--foreground)); padding:12px 18px; border-radius:12px; max-width:520px; opacity:0; transition:opacity .2s,transform .2s; z-index:30; box-shadow:0 10px 30px rgba(0,0,0,.4); }
  .space-root #toast.show { opacity:1; transform:translateX(-50%) translateY(0); }
  .space-root .modal { position:fixed; inset:0; background:rgba(8,11,22,.66); backdrop-filter:blur(3px); display:none; align-items:center; justify-content:center; z-index:50; padding:20px; }
  .space-root .modal.show { display:flex; }
  .space-root .modal-card { background:linear-gradient(180deg,#1b2438,#141c2e); border:1px solid var(--border); border-radius:18px; width:100%; max-width:640px; max-height:86vh; display:flex; flex-direction:column; box-shadow:0 24px 60px rgba(0,0,0,.5); animation:space-pop .18s ease; }
  @keyframes space-pop { from{transform:scale(.96);opacity:0} to{transform:scale(1);opacity:1} }
  .space-root .modal-head { display:flex; align-items:center; gap:12px; padding:18px 20px 14px; border-bottom:1px solid var(--border); }
  .space-root .modal-head .mh-ic { font-size:30px; }
  .space-root .modal-head h3 { margin:0; font-size:19px; flex:1; }
  .space-root .modal-x { background:hsl(var(--foreground) / .08); border:none; color:hsl(var(--foreground)); width:34px; height:34px; border-radius:9px; font-size:16px; cursor:pointer; }
  .space-root .modal-x:hover { background:hsl(var(--foreground) / .18); }
  .space-root .modal-body { padding:18px 20px 22px; overflow:auto; line-height:1.6; }
  .space-root .modal-body h4 { margin:18px 0 8px; font-size:15px; color:var(--accent); }
  .space-root .modal-body h4:first-child { margin-top:0; }
  .space-root .modal-body p { margin:0 0 10px; opacity:.92; font-size:14px; }
  .space-root .modal-body ul, .space-root .modal-body ol { margin:0 0 12px; padding-left:20px; }
  .space-root .modal-body li { margin:5px 0; font-size:14px; opacity:.92; }
  .space-root .mb-note { background:rgba(251,191,36,.12); border-left:3px solid var(--accent); padding:10px 14px; border-radius:8px; margin:4px 0 14px; font-size:13.5px; }
  .space-root .mb-cards { display:grid; gap:10px; grid-template-columns:repeat(auto-fill,minmax(150px,1fr)); margin:4px 0 14px; }
  .space-root .mb-card { background:hsl(var(--foreground) / .05); border:1px solid var(--border); border-radius:12px; padding:12px; cursor:pointer; transition: background .15s, transform .12s, border-color .15s; position:relative; overflow:hidden; }
  .space-root .mb-card:hover { background:hsl(var(--foreground) / .1); border-color:var(--accent,#fbbf24); transform: translateY(-2px); }
  .space-root .mb-card .ci { font-size:32px; transition: transform .25s; } .space-root .mb-card .ct { font-weight:700; font-size:13.5px; margin:6px 0 2px; } .space-root .mb-card .cd { font-size:12.5px; opacity:.82; }
  .space-root .mb-card .more { font-size:11px; opacity:.55; margin-top:8px; }
  .space-root .mb-card .more::before { content:'👆 Bấm xem thêm'; }
  .space-root .mb-card.flipped { background: linear-gradient(135deg, rgba(99,102,241,.18), rgba(34,197,94,.12)); border-color: #22c55e; }
  .space-root .mb-card.flipped .ci { transform: scale(1.3) rotate(-8deg); }
  .space-root .mb-card.flipped .more::before { content:'✓ Đã ghi nhớ — bấm lại để gập'; color:#86efac; }
  .space-root .mb-card.flipped::after { content:'⭐'; position:absolute; top:6px; right:8px; font-size:14px; animation: space-cardStar .5s cubic-bezier(.2,.9,.3,1.6); }
  @keyframes space-cardStar { 0%{transform:scale(0) rotate(0)} 60%{transform:scale(1.3) rotate(20deg)} 100%{transform:scale(1) rotate(0)} }
  .space-root .timeline { list-style:none; padding:0; margin:4px 0 8px; }
  .space-root .timeline li { position:relative; padding:0 0 16px 26px; border-left:2px solid hsl(var(--foreground) / .18); }
  .space-root .timeline li:last-child { border-left-color:transparent; padding-bottom:0; }
  .space-root .timeline li::before { content:''; position:absolute; left:-7px; top:2px; width:12px; height:12px; border-radius:50%; background:var(--accent); }
  .space-root .timeline .tl-t { font-weight:700; font-size:14px; } .space-root .timeline .tl-d { font-size:13px; opacity:.85; margin-top:2px; }
  .space-root .flash-grid { display:grid; gap:12px; grid-template-columns:repeat(auto-fill,minmax(150px,1fr)); margin:4px 0 6px; }
  .space-root .flash { perspective:900px; height:128px; cursor:pointer; }
  .space-root .flash-inner { position:relative; width:100%; height:100%; transition:transform .5s; transform-style:preserve-3d; }
  .space-root .flash.flipped .flash-inner { transform:rotateY(180deg); }
  .space-root .flash-face { position:absolute; inset:0; backface-visibility:hidden; border-radius:14px; border:1px solid var(--border); display:flex; flex-direction:column; align-items:center; justify-content:center; text-align:center; padding:10px; }
  .space-root .flash-front { background:hsl(var(--foreground) / .06); }
  .space-root .flash-front .fe { font-size:34px; } .space-root .flash-front .fn { font-weight:700; margin-top:6px; }
  .space-root .flash-back { background:linear-gradient(160deg,var(--accent),hsl(var(--foreground) / .08)); color:#1f1147; transform:rotateY(180deg); font-size:13px; font-weight:600; }
  .space-root .flash-hint { font-size:12px; opacity:.6; text-align:center; margin-top:8px; }
  .space-root .checklist { list-style:none; padding:0; margin:4px 0 6px; }
  .space-root .checklist li { margin:0 0 8px; }
  .space-root .checklist label { display:flex; align-items:flex-start; gap:10px; background:hsl(var(--foreground) / .05); border:1px solid var(--border); border-radius:10px; padding:11px 13px; cursor:pointer; font-size:13.5px; }
  .space-root .checklist label:hover { background:hsl(var(--foreground) / .1); }
  .space-root .checklist input { margin-top:2px; width:17px; height:17px; accent-color:var(--accent); flex-shrink:0; }
  .space-root .checklist label.done { background:rgba(16,185,129,.15); border-color:rgba(16,185,129,.45); }
  .space-root .ck-prog { font-size:13px; font-weight:700; margin-top:6px; }
  .space-root .ck-prog.full { color:#059669; }
  .space-root .goal-in { display:flex; gap:8px; margin:6px 0 4px; }
  .space-root .goal-in input { flex:1; background:hsl(var(--foreground) / .06); border:1px solid var(--border); border-radius:10px; color:hsl(var(--foreground)); padding:10px 13px; font-family:inherit; font-size:14px; }
  .space-root .goal-in button { background:var(--accent); border:none; color:#1f1147; font-weight:800; padding:0 16px; border-radius:10px; cursor:pointer; }
  .space-root .goal-saved { background:rgba(16,185,129,.14); border:1px solid rgba(16,185,129,.4); border-radius:10px; padding:11px 14px; margin-top:8px; font-size:13.5px; display:none; }
  .space-root .goal-saved.show { display:block; }
  .space-root .mcq { background:hsl(var(--foreground) / .04); border:1px solid var(--border); border-radius:12px; padding:14px 16px; margin:4px 0 12px; }
  .space-root .mcq .mcq-q { font-weight:700; font-size:14px; margin-bottom:9px; }
  .space-root .mcq .mcq-o { display:block; width:100%; text-align:left; background:hsl(var(--foreground) / .05); border:1px solid var(--border); color:hsl(var(--foreground)); padding:9px 13px; border-radius:9px; margin:6px 0; cursor:pointer; font-family:inherit; font-size:13.5px; transition:background .12s; }
  .space-root .mcq .mcq-o:hover { background:hsl(var(--foreground) / .12); }
  .space-root .mcq .mcq-o.correct { background:rgba(16,185,129,.32); border-color:#10b981; }
  .space-root .mcq .mcq-o.wrong { background:rgba(239,68,68,.28); border-color:#ef4444; }
  .space-root .mcq .mcq-fb { font-size:13px; margin-top:8px; padding:10px 13px; border-radius:9px; background:rgba(251,191,36,.12); border-left:3px solid var(--accent); display:none; }
  .space-root .mcq .mcq-fb.show { display:block; }
  .space-root .pr { background:rgba(124,92,246,.09); border:1px solid var(--border); border-radius:14px; padding:14px 16px; margin:6px 0 16px; }
  .space-root .pr-h { font-weight:800; font-size:14px; margin-bottom:4px; display:flex; align-items:center; gap:8px; flex-wrap:wrap; }
  .space-root .pr-badge { font-size:9.5px; font-weight:800; letter-spacing:.5px; text-transform:uppercase; background:var(--accent); color:#1f1147; padding:2px 8px; border-radius:7px; }
  .space-root .pr-sub { font-size:12.5px; opacity:.82; margin-bottom:10px; line-height:1.5; }
  .space-root .pr-msg { font-size:13px; margin-top:10px; min-height:18px; font-weight:700; }
  .space-root .pr-msg.ok { color:#059669; } .space-root .pr-msg.bad { color:#dc2626; }
  .space-root .pr-btn { background:var(--accent); border:none; color:#1f1147; font-weight:800; padding:8px 15px; border-radius:9px; cursor:pointer; font-family:inherit; font-size:13px; }
  .space-root .pr-btn:hover { filter:brightness(1.08); }
  .space-root .pr-btn.ghost { background:hsl(var(--foreground) / .1); color:hsl(var(--foreground)); }
  .space-root .pr-row { display:flex; gap:8px; flex-wrap:wrap; align-items:center; }
  .space-root .seg { display:inline-flex; gap:4px; background:hsl(var(--foreground) / .05); border:1px solid var(--border); border-radius:10px; padding:4px; }
  .space-root .seg button { background:transparent; border:none; color:hsl(var(--foreground)); font-family:inherit; font-weight:700; font-size:13px; padding:6px 12px; border-radius:7px; cursor:pointer; }
  .space-root .seg button.on { background:var(--accent); color:#1f1147; }
  .space-root .piano { display:flex; gap:4px; margin:2px 0 10px; }
  .space-root .pk { flex:1; min-width:0; height:90px; border-radius:0 0 8px 8px; border:1px solid rgba(0,0,0,.3); background:linear-gradient(#fff,#e8eaf0); color:#1f2937; font-weight:800; font-size:12px; display:flex; align-items:flex-end; justify-content:center; padding-bottom:9px; cursor:pointer; user-select:none; transition:background .07s,transform .07s; }
  .space-root .pk:hover { background:linear-gradient(#fff,#d6dae6); }
  .space-root .pk.down { background:linear-gradient(var(--accent),#fff); transform:translateY(2px); }
  .space-root .pk.target { box-shadow:inset 0 0 0 3px var(--accent); }
  .space-root .beats { display:flex; gap:10px; margin:10px 0; justify-content:center; }
  .space-root .beat { width:40px; height:40px; border-radius:50%; border:2px solid var(--border); display:flex; align-items:center; justify-content:center; font-weight:800; opacity:.45; transition:.08s; }
  .space-root .beat.strong { border-color:var(--accent); border-width:3px; }
  .space-root .beat.on { opacity:1; background:var(--accent); color:#1f1147; transform:scale(1.15); }
  .space-root .tap-pad { width:100%; padding:18px; border-radius:12px; border:2px dashed var(--border); background:hsl(var(--foreground) / .04); font-weight:800; cursor:pointer; text-align:center; margin-top:8px; color:hsl(var(--foreground)); font-family:inherit; font-size:14px; }
  .space-root .tap-pad:active { background:hsl(var(--foreground) / .14); }
  .space-root .mix-prim { display:flex; gap:8px; margin:4px 0 10px; }
  .space-root .mix-c { flex:1; height:48px; border-radius:10px; border:2px solid transparent; cursor:pointer; font-weight:800; color:#fff; text-shadow:0 1px 3px rgba(0,0,0,.6); display:flex; align-items:center; justify-content:center; font-size:13px; }
  .space-root .mix-c.sel { border-color:hsl(var(--foreground)); box-shadow:0 0 0 2px var(--accent); }
  .space-root .mix-out { height:66px; border-radius:12px; display:flex; align-items:center; justify-content:center; font-weight:800; border:1px solid var(--border); color:#fff; text-shadow:0 1px 3px rgba(0,0,0,.6); font-size:15px; }
  .space-root .draw-c { width:100%; height:230px; background:#fff; border-radius:12px; border:1px solid var(--border); touch-action:none; cursor:crosshair; display:block; }
  .space-root .draw-tools { display:flex; gap:6px; flex-wrap:wrap; align-items:center; margin-bottom:8px; }
  .space-root .sw { width:27px; height:27px; border-radius:50%; border:2px solid hsl(var(--foreground) / .3); cursor:pointer; padding:0; }
  .space-root .sw.sel { border-color:hsl(var(--foreground)); transform:scale(1.14); }
  .space-root .brush { min-width:30px; height:28px; padding:0 7px; border-radius:7px; background:hsl(var(--foreground) / .1); border:1px solid var(--border); color:hsl(var(--foreground)); cursor:pointer; font-family:inherit; font-weight:700; font-size:12px; }
  .space-root .brush.sel { background:var(--accent); color:#1f1147; }
  .space-root .ord-list { display:flex; flex-direction:column; gap:8px; margin:4px 0 10px; }
  .space-root .ord-it { display:flex; align-items:center; gap:11px; text-align:left; width:100%; background:hsl(var(--foreground) / .05); border:1px solid var(--border); color:hsl(var(--foreground)); padding:11px 13px; border-radius:10px; cursor:pointer; font-family:inherit; font-size:13.5px; }
  .space-root .ord-it:hover { background:hsl(var(--foreground) / .1); }
  .space-root .ord-it .num { width:25px; height:25px; flex-shrink:0; border-radius:50%; background:hsl(var(--foreground) / .12); display:flex; align-items:center; justify-content:center; font-weight:800; font-size:12px; }
  .space-root .ord-it.picked .num { background:var(--accent); color:#1f1147; }
  .space-root .ord-it.correct { background:rgba(16,185,129,.22); border-color:#10b981; }
  .space-root .ord-it.wrong { background:rgba(239,68,68,.2); border-color:#ef4444; }
  .space-root .match-grid { display:grid; grid-template-columns:1fr 1fr; gap:8px; margin:4px 0 10px; }
  .space-root .mt { text-align:left; background:hsl(var(--foreground) / .05); border:1px solid var(--border); color:hsl(var(--foreground)); padding:10px 12px; border-radius:10px; cursor:pointer; font-family:inherit; font-size:13px; }
  .space-root .mt:hover { background:hsl(var(--foreground) / .1); }
  .space-root .mt.sel { border-color:var(--accent); background:rgba(124,92,246,.2); }
  .space-root .mt.done { background:rgba(16,185,129,.2); border-color:#10b981; opacity:.65; cursor:default; pointer-events:none; }
  .space-root .mt.bad { background:rgba(239,68,68,.25); border-color:#ef4444; }
  /* Nền TỐI: khôi phục tông màu nhạt gốc (tông đậm phía trên là cho nền sáng) */
  .dark .space-root .q .qb.lapse { color:#fb7185; }
  .dark .space-root .q .qb.due { color:#22c55e; }
  .dark .space-root .q .qb.new { color:#38bdf8; }
  .dark .space-root .q .qb.review-early { color:#a78bfa; }
  .dark .space-root .result b { color:#34d399; }
  .dark .space-root .chip.earned .chip-i { color:#34d399; }
  .dark .space-root .ck-prog.full { color:#34d399; }
  .dark .space-root .pr-msg.ok { color:#34d399; }
  .dark .space-root .pr-msg.bad { color:#fca5a5; }
      `}</style>
    </div>
  );
}
