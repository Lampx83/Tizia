'use client';

import { useEffect } from 'react';

// Client mount: dựng đúng khung DOM (thanh thống kê điểm/combo/thời gian + sân
// khấu #stage với vạch hồng + hàng phím #keys + màn hình chờ #center + modal tổng
// kết) mà script vanilla cần, rồi nạp public/legacy/lop2-am-nhac.js SAU khi mount.
// Script gốc là classic script (KHÔNG dùng import) nên nạp bằng <script> thường.
// Script tự dựng nội dung động (phím nốt, nốt rơi) và giữ NGUYÊN hành vi bản HTML
// gốc. Bảng NOTES (7 nốt + tần số chuẩn C4–B4) là CONTENT/hằng số nhạc lý nằm
// trong script legacy — xem GHI CHÚ ở đầu file .js.
//
// Trang gốc dùng nền pastel hồng (bản sắc lớp 2, cấp tiểu học) → dùng CSS scoped
// với hex gốc, không dùng token theme tối chung của web-next.
export default function AmNhacMount() {
  useEffect(() => {
    const s = document.createElement('script');
    s.src = `/legacy/lop2-am-nhac.js?ts=${Date.now()}`;
    document.body.appendChild(s);
    return () => {
      s.remove();
    };
  }, []);

  return (
    <div id="am2-root" className="am2">
      <div className="am2-top">
        <a className="am2-back" href="/space?b=g2&domain=primary">← Lớp 2</a>
        <div>
          <h1>🎵 Đô-Rê-Mi Bay</h1>
          <div className="am2-sub">Âm nhạc Lớp 2 — gõ nốt rơi đúng nhịp</div>
        </div>
        <div className="am2-right">
          <div className="am2-stat">🎯 <span className="v" id="score">0</span></div>
          <div className="am2-stat">🔥 <span className="v" id="combo">0</span></div>
          <div className="am2-stat">⏱ <span className="v" id="time">60s</span></div>
        </div>
      </div>

      <div className="am2-wrap">
        <p className="am2-intro">
          Gõ phím <b>A S D F G H J</b> (hoặc bấm thanh nốt phía dưới) khi nốt rơi tới vạch hồng.
        </p>
        <div className="stage" id="stage">
          <div className="hitline" />
          <div className="keys" id="keys" />
          <div className="center" id="center">
            <div className="big">🎶</div>
            <div>Sẵn sàng hoà nhạc?</div>
            <button id="btn-start">Bắt đầu</button>
          </div>
        </div>
      </div>

      <div className="modal hide" id="modal-over">
        <div className="panel">
          <div className="ic">🎼</div>
          <h2 id="ov-title">Hết giờ!</h2>
          <p id="ov-msg">Một bản nhạc đáng yêu!</p>
          <p>Điểm: <b id="ov-score">0</b> · Combo max: <b id="ov-combo">0</b></p>
          <p>Best: <b id="ov-best">—</b></p>
          <div className="row">
            <button className="btn" id="btn-restart">🔁 Chơi lại</button>
            <a className="btn ghost" href="/space?b=g2&domain=primary">← Về Lớp 2</a>
          </div>
        </div>
      </div>

      <style>{`
        .am2 {
          --bg-1:#fdf2f8; --bg-2:#fce7f3; --accent:#db2777; --ok:#22c55e; --bad:#ef4444;
          --border:rgba(0,0,0,.08); --ink:#1f2937; --muted:#6b7280;
          color:var(--ink);
          font-family:'Inter','Quicksand',system-ui,sans-serif;
          margin:-2rem calc(50% - 50vw) 0; min-height:calc(100vh - 4rem);
          background:radial-gradient(ellipse 90% 50% at 50% 0%, #fbcfe8, transparent),linear-gradient(180deg,var(--bg-1),#fae8ff);
        }
        .am2 *{box-sizing:border-box}
        .am2-top{display:flex;align-items:center;gap:14px;padding:12px 18px;border-bottom:1px solid var(--border);background:rgba(255,255,255,.7);position:sticky;top:0;z-index:5;backdrop-filter:blur(8px)}
        .am2-back{color:var(--ink);text-decoration:none;opacity:.85;font-size:14px;background:rgba(0,0,0,.06);padding:8px 14px;border-radius:10px;font-weight:600}
        .am2-back:hover{background:rgba(0,0,0,.12)}
        .am2-top h1{margin:0;font-size:18px;font-weight:800}
        .am2-top .am2-sub{font-size:12.5px;opacity:.6;font-weight:500}
        .am2-top .am2-right{margin-left:auto;display:flex;gap:10px;align-items:center;font-size:13.5px}
        .am2-stat{background:white;border:1px solid var(--border);border-radius:14px;padding:7px 13px;font-weight:700}
        .am2-stat .v{color:var(--accent);font-size:16px}
        .am2-wrap{max-width:560px;margin:0 auto;padding:18px 14px 60px}
        .am2-intro{text-align:center;margin:6px 0 12px;opacity:.85;font-size:14px}
        .am2 .stage{position:relative;height:62vh;min-height:420px;background:linear-gradient(180deg,#fff1f9,#fdf4ff);
          border-radius:18px;border:1px solid var(--border);overflow:hidden;box-shadow:inset 0 0 20px rgba(219,39,119,.08)}
        .am2 .lane{position:absolute;top:0;bottom:0;width:14.28%;border-left:1px dashed rgba(0,0,0,.06)}
        .am2 .lane:last-child{border-right:1px dashed rgba(0,0,0,.06)}
        .am2 .hitline{position:absolute;left:0;right:0;bottom:64px;height:3px;background:linear-gradient(90deg,#f0abfc,#f472b6,#db2777,#f472b6,#f0abfc);box-shadow:0 0 14px #db2777}
        .am2 .note{position:absolute;width:11.5%;height:42px;border-radius:12px;display:flex;align-items:center;justify-content:center;
          font-weight:900;color:#fff;font-size:16px;left:1.4%;box-shadow:0 4px 12px rgba(0,0,0,.18)}
        .am2 .keys{position:absolute;left:0;right:0;bottom:0;height:64px;display:flex}
        .am2 .key{flex:1;border-right:1px solid rgba(0,0,0,.08);display:flex;flex-direction:column;align-items:center;justify-content:center;font-weight:800;color:var(--ink);background:rgba(255,255,255,.6);cursor:pointer;font-size:14px;user-select:none}
        .am2 .key:last-child{border-right:none}
        .am2 .key small{opacity:.55;font-size:11px;margin-top:2px;font-weight:600}
        .am2 .key.hit{background:#fce7f3}
        .am2 .key.bad{background:#fee2e2}
        .am2 .fx{position:absolute;font-size:24px;font-weight:800;pointer-events:none;animation:am2-rise .8s forwards}
        @keyframes am2-rise{from{opacity:1;transform:translateY(0)}to{opacity:0;transform:translateY(-40px)}}
        .am2 .center{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;flex-direction:column;background:rgba(255,255,255,.85);text-align:center;padding:20px}
        .am2 .center.hide{display:none}
        .am2 .center .big{font-size:60px;margin-bottom:8px}
        .am2 .center button{margin-top:14px;padding:12px 26px;border:none;border-radius:14px;background:var(--accent);color:#fff;font-weight:800;font-size:16px;cursor:pointer}
        .am2 .modal{position:fixed;inset:0;background:rgba(15,23,42,.65);display:flex;align-items:center;justify-content:center;padding:20px;z-index:50}
        .am2 .modal.hide{display:none}
        .am2 .panel{background:#fff;border-radius:20px;max-width:380px;width:100%;padding:28px 26px;text-align:center;box-shadow:0 30px 80px rgba(0,0,0,.4)}
        .am2 .panel .ic{font-size:64px}
        .am2 .panel h2{margin:6px 0 8px;font-size:22px}
        .am2 .panel p{margin:4px 0;color:var(--muted);font-size:14px}
        .am2 .panel .row{display:flex;gap:10px;justify-content:center;margin-top:18px;flex-wrap:wrap}
        .am2 .btn{padding:10px 18px;border-radius:12px;border:none;background:var(--accent);color:#fff;font-weight:700;cursor:pointer;font-size:14px;text-decoration:none;display:inline-block}
        .am2 .btn.ghost{background:rgba(0,0,0,.06);color:var(--ink)}
        .am2 .btn:hover{filter:brightness(1.08)}
      `}</style>
    </div>
  );
}
