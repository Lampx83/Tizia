'use client';

import { useEffect } from 'react';

// Client mount: dựng đúng khung DOM (thanh thống kê + #dd2-deck + nút ✅/❌ + modal
// tổng kết) mà script vanilla cần, rồi nạp public/legacy/lop2-dao-duc.js SAU khi
// mount. Script đó giữ NGUYÊN hành vi bản HTML gốc (rút 10/15 tình huống, chọn
// hoặc vuốt thẻ, feedback, thanh tiến độ, best localStorage, đồng bộ XP /api/wallet).
// Danh sách POOL (15 tình huống đạo đức) là CONTENT nằm trong script legacy —
// CHƯA có API/DB nên giữ nguồn cũ, xem GHI CHÚ ở đầu file .js.
//
// Trang gốc dùng nền pastel vàng/hổ phách (bản sắc lớp 2, cấp tiểu học) → dùng CSS
// scoped với hex gốc (ghi rõ ở risks), không dùng token theme tối chung của web-next.
export default function DaoDucMount() {
  useEffect(() => {
    const s = document.createElement('script');
    s.src = `/legacy/lop2-dao-duc.js?ts=${Date.now()}`;
    document.body.appendChild(s);
    return () => {
      s.remove();
    };
  }, []);

  return (
    <div id="dd2-root" className="dd2">
      <div className="dd2-top">
        <a className="dd2-back" href="/space?b=g2&domain=primary">← Lớp 2</a>
        <div>
          <h1>🤝 Đúng hay Sai?</h1>
          <div className="dd2-sub">Đạo đức Lớp 2 — chọn ✅ đúng hoặc ❌ sai cho từng tình huống</div>
        </div>
        <div className="dd2-right">
          <div className="dd2-stat">✅ <span className="v" id="dd2-right">0</span></div>
          <div className="dd2-stat">❌ <span className="v" id="dd2-wrong">0</span></div>
          <div className="dd2-stat">📜 <span className="v" id="dd2-cur">0/0</span></div>
        </div>
      </div>

      <div className="dd2-wrap">
        <p className="dd2-intro">
          Đọc tình huống, nếu hành vi đúng → bấm ✅, sai → bấm ❌. Bạn cũng có thể vuốt thẻ sang phải/trái.
        </p>
        <div className="dd2-progress"><div id="dd2-bar" /></div>
        <div className="dd2-deck" id="dd2-deck" />
        <div className="dd2-buttons">
          <button className="dd2-pill no" id="dd2-btn-no" title="Sai">❌</button>
          <button className="dd2-pill yes" id="dd2-btn-yes" title="Đúng">✅</button>
        </div>
        <div className="dd2-feedback" id="dd2-fb">&nbsp;</div>
      </div>

      <div className="dd2-modal hide" id="dd2-modal-over">
        <div className="dd2-panel">
          <div className="ic">🌟</div>
          <h2 id="dd2-ov-title">Hoàn thành!</h2>
          <p id="dd2-ov-msg">Em đã học được nhiều bài học hay.</p>
          <p>Đúng: <b id="dd2-ov-right">0</b>/<b id="dd2-ov-total">0</b> · Điểm: <b id="dd2-ov-score">0</b></p>
          <p>Best: <b id="dd2-ov-best">—</b></p>
          <div className="dd2-panel-row">
            <button className="dd2-btn" id="dd2-btn-restart">🔁 Chơi lại</button>
            <a className="dd2-btn ghost" href="/space?b=g2&domain=primary">← Về Lớp 2</a>
          </div>
        </div>
      </div>

      <style>{`
        .dd2 {
          --bg-1:#fef3c7; --bg-2:#fde68a; --accent:#d97706; --ok:#22c55e; --bad:#ef4444;
          --border:rgba(0,0,0,.08); --ink:#1f2937; --muted:#6b7280;
          color:var(--ink);
          font-family:'Inter','Quicksand',system-ui,sans-serif;
          margin:-2rem calc(50% - 50vw) 0; min-height:calc(100vh - 4rem);
          background:radial-gradient(ellipse 90% 50% at 50% 0%, #fde68a, transparent),linear-gradient(180deg,var(--bg-1),#fef9c3);
        }
        .dd2 *{box-sizing:border-box}
        .dd2-top{display:flex;align-items:center;gap:14px;padding:12px 18px;border-bottom:1px solid var(--border);background:rgba(255,255,255,.75);position:sticky;top:0;z-index:5;backdrop-filter:blur(8px)}
        .dd2-back{color:var(--ink);text-decoration:none;opacity:.85;font-size:14px;background:rgba(0,0,0,.06);padding:8px 14px;border-radius:10px;font-weight:600}
        .dd2-back:hover{background:rgba(0,0,0,.12)}
        .dd2-top h1{margin:0;font-size:18px;font-weight:800}
        .dd2-top .dd2-sub{font-size:12.5px;opacity:.6;font-weight:500}
        .dd2-top .dd2-right{margin-left:auto;display:flex;gap:10px;align-items:center;font-size:13.5px}
        .dd2-stat{background:white;border:1px solid var(--border);border-radius:14px;padding:7px 13px;font-weight:700}
        .dd2-stat .v{color:var(--accent);font-size:16px}
        .dd2-wrap{max-width:520px;margin:0 auto;padding:24px 18px 60px}
        .dd2-intro{text-align:center;margin:6px 0 18px;opacity:.85;font-size:14px}
        .dd2-deck{position:relative;height:340px;display:flex;align-items:center;justify-content:center;margin-bottom:24px}
        .dd2-card{position:absolute;width:100%;background:#fff;border-radius:22px;border:1px solid var(--border);
          box-shadow:0 12px 36px rgba(0,0,0,.12);padding:26px 22px;transition:transform .35s, opacity .35s}
        .dd2-card .dd2-emo{font-size:60px;text-align:center;margin-bottom:8px}
        .dd2-card .dd2-text{font-size:17px;font-weight:700;text-align:center;line-height:1.4;color:var(--ink)}
        .dd2-card.swipeR{transform:translateX(140%) rotate(20deg);opacity:0}
        .dd2-card.swipeL{transform:translateX(-140%) rotate(-20deg);opacity:0}
        .dd2-badge{position:absolute;top:14px;font-size:32px;font-weight:900;padding:6px 12px;border-radius:10px;border:3px solid;opacity:0;transition:opacity .2s}
        .dd2-badge.yes{right:18px;color:var(--ok);border-color:var(--ok);transform:rotate(8deg)}
        .dd2-badge.no{left:18px;color:var(--bad);border-color:var(--bad);transform:rotate(-8deg)}
        .dd2-card.showYes .dd2-badge.yes{opacity:1}
        .dd2-card.showNo .dd2-badge.no{opacity:1}
        .dd2-buttons{display:flex;justify-content:center;gap:24px;margin-bottom:12px}
        .dd2-pill{width:78px;height:78px;border-radius:50%;border:none;font-size:38px;cursor:pointer;box-shadow:0 10px 24px rgba(0,0,0,.18);transition:transform .12s}
        .dd2-pill:active{transform:scale(.92)}
        .dd2-pill.no{background:linear-gradient(180deg,#fca5a5,#ef4444);color:#fff}
        .dd2-pill.yes{background:linear-gradient(180deg,#86efac,#22c55e);color:#fff}
        .dd2-progress{height:8px;background:rgba(0,0,0,.08);border-radius:10px;overflow:hidden;margin-bottom:14px}
        .dd2-progress > div{height:100%;background:linear-gradient(90deg,#fbbf24,#d97706);width:0%;transition:width .3s}
        .dd2-feedback{text-align:center;font-weight:700;min-height:22px;font-size:13.5px;margin-top:10px}
        .dd2-feedback.ok{color:var(--ok)} .dd2-feedback.bad{color:var(--bad)}
        .dd2-modal{position:fixed;inset:0;background:rgba(15,23,42,.65);display:flex;align-items:center;justify-content:center;padding:20px;z-index:50}
        .dd2-modal.hide{display:none}
        .dd2-panel{background:#fff;border-radius:20px;max-width:380px;width:100%;padding:28px 26px;text-align:center;box-shadow:0 30px 80px rgba(0,0,0,.4)}
        .dd2-panel .ic{font-size:64px}
        .dd2-panel h2{margin:6px 0 8px;font-size:22px}
        .dd2-panel p{margin:4px 0;color:var(--muted);font-size:14px}
        .dd2-panel-row{display:flex;gap:10px;justify-content:center;margin-top:18px;flex-wrap:wrap}
        .dd2-btn{padding:10px 18px;border-radius:12px;border:none;background:var(--accent);color:#fff;font-weight:700;cursor:pointer;font-size:14px;text-decoration:none;display:inline-block}
        .dd2-btn.ghost{background:rgba(0,0,0,.06);color:var(--ink)}
        .dd2-btn:hover{filter:brightness(1.08)}
      `}</style>
    </div>
  );
}
