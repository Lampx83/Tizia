'use client';

import { useEffect } from 'react';

// ── WRAP-MOUNT: "Phân Loại Rác — HĐTN Lớp 2" ──────────────────────────────────
// Client Component dựng đúng khung DOM (mọi id/class/data-* GIỮ NGUYÊN như bản
// HTML gốc) để script vanilla querySelector trúng, rồi nạp:
//   1. /js/enrollment.js (module) — cổng view-only cho domain "primary" (như gốc).
//   2. /legacy/lop2-phan-loai-rac.js (classic) — TOÀN BỘ engine game gốc.
// KHÔNG viết lại logic sang React. Hành vi/text/tiếng Việt giữ y hệt bản gốc.
//
// CSS gốc scoped dưới #pl-rac-root để không đè theme chung của web-next; các
// class/id con (.stage .item .bin #right #time #modal-over …) giữ NGUYÊN vì
// script cũ trỏ đúng vào chúng.
//
// CONTENT: mảng ITEMS (15 vật rác) hardcode trong file legacy — gốc cũng
// hardcode, chưa có /api. Xem risks. XP đồng bộ qua /api/wallet (proxy Express).
export default function Lop2PhanLoaiRac() {
  useEffect(() => {
    // 1) Cổng view-only (module, như <script type="module"> gốc).
    const gate = document.createElement('script');
    gate.type = 'module';
    gate.textContent =
      'import { applyViewOnlyGate } from "/js/enrollment.js"; applyViewOnlyGate("primary");';
    document.body.appendChild(gate);

    // 2) Engine game (classic script, KHÔNG module). Append sau khi DOM đã render
    //    (effect chạy sau paint) nên querySelector chắc chắn trúng.
    const engine = document.createElement('script');
    engine.src = `/legacy/lop2-phan-loai-rac.js?ts=${Date.now()}`;
    document.body.appendChild(engine);

    return () => {
      gate.remove();
      engine.remove();
    };
  }, []);

  return (
    <div id="pl-rac-root">
      <div className="top">
        <a className="back" href="/space?b=g2&domain=primary">
          ← Lớp 2
        </a>
        <div>
          <h1>♻️ Phân Loại Rác</h1>
          <div className="sub">HĐTN — kéo rác vào đúng thùng để bảo vệ môi trường</div>
        </div>
        <div className="right">
          <div className="stat">
            ✅ <span className="v" id="right">0</span>
          </div>
          <div className="stat">
            ❌ <span className="v" id="wrong">0</span>
          </div>
          <div className="stat">
            ⏱ <span className="v" id="time">60s</span>
          </div>
        </div>
      </div>

      <div className="wrap">
        <p className="intro">
          Vật rơi từ trên — <b>kéo</b> bằng chuột/ngón tay vào thùng đúng. 🟢 Tái chế · 🟤 Hữu cơ ·
          🔴 Vô cơ.
        </p>
        <div className="stage" id="stage">
          <div className="bins" id="bins">
            <div className="bin green" data-cat="recycle">
              <div className="em">♻️</div>
              Tái chế
              <br />
              <small style={{ opacity: 0.85 }}>chai, giấy, lon</small>
            </div>
            <div className="bin brown" data-cat="organic">
              <div className="em">🍂</div>
              Hữu cơ
              <br />
              <small style={{ opacity: 0.85 }}>rau, lá, cơm</small>
            </div>
            <div className="bin red" data-cat="other">
              <div className="em">🗑️</div>
              Vô cơ
              <br />
              <small style={{ opacity: 0.85 }}>pin, túi nilon</small>
            </div>
          </div>
          <div className="center" id="center">
            <div className="big">♻️</div>
            <div>Sẵn sàng giữ Trái Đất xanh?</div>
            <button id="btn-start">Bắt đầu</button>
          </div>
        </div>
      </div>

      <div className="modal hide" id="modal-over">
        <div className="panel">
          <div className="ic">🌍</div>
          <h2 id="ov-title">Hết giờ!</h2>
          <p id="ov-msg">Em đã giúp Trái Đất sạch hơn.</p>
          <p>
            Đúng: <b id="ov-right">0</b> · Sai: <b id="ov-wrong">0</b> · Điểm: <b id="ov-score">0</b>
          </p>
          <p>
            Best: <b id="ov-best">—</b>
          </p>
          <div className="row">
            <button className="btn" id="btn-restart">
              🔁 Chơi lại
            </button>
            <a className="btn ghost" href="/space?b=g2&domain=primary">
              ← Về Lớp 2
            </a>
          </div>
        </div>
      </div>

      <style>{`
        #pl-rac-root{
          --bg-1:#ecfeff; --bg-2:#cffafe; --accent:#0891b2; --ok:#22c55e; --bad:#ef4444;
          --border:rgba(0,0,0,.08); --ink:#1f2937; --muted:#6b7280;
          --bin-green:#16a34a; --bin-brown:#a16207; --bin-red:#dc2626;
          color:var(--ink);
          font-family:'Inter','Quicksand',system-ui,sans-serif;
          margin:-2rem calc(50% - 50vw) 0; min-height:calc(100vh - 4rem);
          background:radial-gradient(ellipse 90% 50% at 50% 0%, #a5f3fc, transparent),linear-gradient(180deg,var(--bg-1),#e0f2fe);
        }
        #pl-rac-root *{box-sizing:border-box}
        #pl-rac-root .top{display:flex;align-items:center;gap:14px;padding:12px 18px;border-bottom:1px solid var(--border);background:rgba(255,255,255,.75);position:sticky;top:0;z-index:5;backdrop-filter:blur(8px)}
        #pl-rac-root .back{color:var(--ink);text-decoration:none;opacity:.85;font-size:14px;background:rgba(0,0,0,.06);padding:8px 14px;border-radius:10px;font-weight:600}
        #pl-rac-root .back:hover{background:rgba(0,0,0,.12)}
        #pl-rac-root .top h1{margin:0;font-size:18px;font-weight:800}
        #pl-rac-root .top .sub{font-size:12.5px;opacity:.6;font-weight:500}
        #pl-rac-root .top .right{margin-left:auto;display:flex;gap:10px;align-items:center;font-size:13.5px}
        #pl-rac-root .stat{background:white;border:1px solid var(--border);border-radius:14px;padding:7px 13px;font-weight:700}
        #pl-rac-root .stat .v{color:var(--accent);font-size:16px}
        #pl-rac-root .wrap{max-width:760px;margin:0 auto;padding:18px 16px 60px}
        #pl-rac-root .intro{text-align:center;margin:6px 0 14px;opacity:.85;font-size:14px}
        #pl-rac-root .stage{position:relative;width:100%;height:62vh;min-height:440px;background:linear-gradient(180deg,#cffafe 0%,#bae6fd 90%,#9ee0c1 100%);
          border-radius:18px;border:1px solid var(--border);overflow:hidden;box-shadow:inset 0 0 20px rgba(0,0,0,.08);touch-action:none}
        #pl-rac-root .item{position:absolute;width:52px;height:52px;border-radius:14px;background:#fff;
          display:flex;align-items:center;justify-content:center;font-size:32px;box-shadow:0 6px 16px rgba(0,0,0,.18);
          cursor:grab;user-select:none;border:2px solid rgba(0,0,0,.06)}
        #pl-rac-root .item.drag{cursor:grabbing;transform:scale(1.1);z-index:10;box-shadow:0 12px 28px rgba(0,0,0,.28)}
        #pl-rac-root .bins{position:absolute;left:0;right:0;bottom:0;display:flex;gap:8px;padding:8px}
        #pl-rac-root .bin{flex:1;height:120px;border-radius:16px 16px 8px 8px;display:flex;flex-direction:column;align-items:center;justify-content:flex-end;
          padding:8px 4px;font-weight:800;color:#fff;font-size:13px;text-align:center;line-height:1.2;border:3px solid rgba(0,0,0,.15);position:relative}
        #pl-rac-root .bin .em{font-size:30px;margin-bottom:2px}
        #pl-rac-root .bin.green{background:linear-gradient(180deg, #22c55e, var(--bin-green))}
        #pl-rac-root .bin.brown{background:linear-gradient(180deg, #ca8a04, var(--bin-brown))}
        #pl-rac-root .bin.red{background:linear-gradient(180deg, #ef4444, var(--bin-red))}
        #pl-rac-root .bin.hover{outline:3px solid #fff;outline-offset:-6px;filter:brightness(1.15)}
        #pl-rac-root .center{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;flex-direction:column;background:rgba(255,255,255,.9);text-align:center;padding:20px;z-index:20}
        #pl-rac-root .center.hide{display:none}
        #pl-rac-root .center .big{font-size:60px;margin-bottom:8px}
        #pl-rac-root .center button{margin-top:14px;padding:12px 26px;border:none;border-radius:14px;background:var(--accent);color:#fff;font-weight:800;font-size:16px;cursor:pointer}
        #pl-rac-root .modal{position:fixed;inset:0;background:rgba(15,23,42,.65);display:flex;align-items:center;justify-content:center;padding:20px;z-index:50}
        #pl-rac-root .modal.hide{display:none}
        #pl-rac-root .panel{background:#fff;border-radius:20px;max-width:380px;width:100%;padding:28px 26px;text-align:center;box-shadow:0 30px 80px rgba(0,0,0,.4)}
        #pl-rac-root .panel .ic{font-size:64px}
        #pl-rac-root .panel h2{margin:6px 0 8px;font-size:22px}
        #pl-rac-root .panel p{margin:4px 0;color:var(--muted);font-size:14px}
        #pl-rac-root .panel .row{display:flex;gap:10px;justify-content:center;margin-top:18px;flex-wrap:wrap}
        #pl-rac-root .btn{padding:10px 18px;border-radius:12px;border:none;background:var(--accent);color:#fff;font-weight:700;cursor:pointer;font-size:14px;text-decoration:none;display:inline-block}
        #pl-rac-root .btn.ghost{background:rgba(0,0,0,.06);color:var(--ink)}
        #pl-rac-root .btn:hover{filter:brightness(1.08)}
      `}</style>
    </div>
  );
}
