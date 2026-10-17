'use client';

import { useEffect } from 'react';

// Wrap-mount trang "Campus đa người chơi" (campus-mp) của Tizia sang Next.
// KHÔNG viết lại engine: toàn bộ logic canvas 2.5D + WebSocket presence + chat +
// điều khiển nằm trong /public/legacy/campus-mp.js (copy nguyên văn từ inline
// <script type="module"> của public/campus-mp.html). page.tsx chỉ:
//   1. dựng lại DOM skeleton GIỮ NGUYÊN mọi id/class/data-* để script cũ
//      querySelector trúng (#world, #ws-status, #room-picker, #players, #msgs,
//      #chat-in, .controls button[data-mv], #toast);
//   2. chèn CSS gốc scoped dưới .campus-root (không đụng globals/layout chung);
//   3. useEffect append <script type="module" src="/legacy/campus-mp.js">.
// Asset ngoài: WebSocket /ws-presence + fetch /api/pet/me chạy qua fallback
// proxy của Next sang Express. Giữ nguyên text tiếng Việt + hành vi gốc.

export default function CampusMpPage() {
  useEffect(() => {
    // Skeleton đã render (effect chạy sau paint) → script cũ querySelector trúng.
    const s = document.createElement('script');
    s.type = 'module'; // gốc là inline <script type="module">
    // ?ts đảm bảo re-execute khi client-navigate lại vào trang.
    s.src = `/legacy/campus-mp.js?ts=${Date.now()}`;
    document.body.appendChild(s);
    return () => {
      s.remove();
    };
  }, []);

  return (
    <div className="campus-root">
      <div className="top">
        <a className="back" href="/">
          ←
        </a>
        <h1>
          🌍 Campus đa người chơi{' '}
          <span style={{ opacity: 0.6, fontWeight: 400 }}>(beta)</span>
        </h1>
        <span className="ws-status off" id="ws-status">
          ⏸ Chưa kết nối
        </span>
      </div>

      <div className="room-picker" id="room-picker">
        <div className="r cur" data-room="lobby">
          Sảnh chung
        </div>
        <div className="r" data-room="lop2a">
          Lớp 2A
        </div>
        <div className="r" data-room="thu-vien">
          Thư viện
        </div>
        <div className="r" data-room="san-truong">
          Sân trường
        </div>
      </div>

      <div className="players" id="players">
        <h4>👥 Đang online (1)</h4>
        <div className="p me">
          <span className="dot"></span>
          <span className="name">Bạn</span>
          <span className="me-tag">YOU</span>
        </div>
      </div>

      <div className="stage">
        <canvas id="world"></canvas>
      </div>

      <div className="chat">
        <div className="msgs" id="msgs">
          <div className="m sys">Gõ tin nhắn rồi Enter…</div>
        </div>
        <input
          id="chat-in"
          type="text"
          placeholder="Gõ tin nhắn, Enter để gửi"
          maxLength={200}
        />
      </div>

      <div className="controls">
        <button></button>
        <button data-mv="N">⬆</button>
        <button></button>
        <button data-mv="W">⬅</button>
        <button></button>
        <button data-mv="E">➡</button>
        <button></button>
        <button data-mv="S">⬇</button>
        <button></button>
      </div>

      <div className="toast" id="toast"></div>

      {/* CSS gốc của public/campus-mp.html — scoped dưới .campus-root để không
          đụng theme layout chung. Biến màu (--bg…) đặt trên .campus-root thay
          cho :root; full-viewport fixed thay cho html,body overflow:hidden gốc. */}
      <style>{`
  .campus-root {
    --bg:#0b1020; --bg-2:#101733; --card:#151c3a; --card-2:#1d2547;
    --border:#2a3563; --text:#e6e9f5; --text-soft:#9aa3c7;
    --accent:#fbbf24; --good:#34d399; --bad:#fb7185;
    position:fixed; inset:0; overflow:hidden;
    font-family:'Inter','Be Vietnam Pro',system-ui,sans-serif; color:var(--text);
    background:#020617; z-index:0;
  }
  .campus-root * { box-sizing:border-box; }
  .campus-root a { color:inherit; }
  .campus-root .top { position:absolute; top:0; left:0; right:0; z-index:10;
    backdrop-filter:blur(12px); background:rgba(11,16,32,.6);
    padding:10px 14px; display:flex; align-items:center; gap:14px; }
  .campus-root .back { text-decoration:none; padding:6px 12px; border-radius:14px;
    background:rgba(255,255,255,.08); border:1px solid var(--border);
    font-size:12.5px; font-weight:600; color:inherit; }
  .campus-root .top h1 { margin:0; font-size:15px; }
  .campus-root .top .ws-status { margin-left:auto; font-size:12px; padding:4px 12px; border-radius:999px;
    background:rgba(34,197,94,.18); color:#86efac; }
  .campus-root .top .ws-status.off { background:rgba(239,68,68,.18); color:#fda4af; }

  .campus-root .stage { position:absolute; inset:0; }
  .campus-root .stage canvas { display:block; width:100%; height:100%; }

  .campus-root .room-picker {
    position:absolute; top:54px; left:14px; z-index:10;
    display:flex; gap:6px;
  }
  .campus-root .room-picker .r {
    padding:5px 12px; border-radius:14px;
    background:rgba(15,23,42,.85); border:1px solid var(--border);
    font-size:12px; cursor:pointer; transition:background .12s;
  }
  .campus-root .room-picker .r:hover { background:rgba(255,255,255,.10); }
  .campus-root .room-picker .r.cur { background:var(--accent); color:#1e293b; border-color:var(--accent); font-weight:700; }

  .campus-root .players {
    position:absolute; top:54px; right:14px; z-index:10;
    width:240px; max-height:60vh; overflow-y:auto;
    background:rgba(15,23,42,.88); backdrop-filter:blur(10px);
    border:1px solid var(--border); border-radius:14px;
    padding:10px 12px;
  }
  .campus-root .players h4 { margin:0 0 8px; font-size:11px; letter-spacing:1px;
    text-transform:uppercase; color:var(--text-soft); }
  .campus-root .players .p {
    display:flex; gap:8px; align-items:center; padding:6px 0;
    font-size:12.5px; border-top:1px solid rgba(255,255,255,.04);
  }
  .campus-root .players .p:first-child { border-top:none; }
  .campus-root .players .p .dot { width:8px; height:8px; border-radius:50%; background:var(--good); }
  .campus-root .players .p.me .dot { background:var(--accent); }
  .campus-root .players .p .name { flex:1; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
  .campus-root .players .p .me-tag { font-size:10px; color:var(--accent); font-weight:700; }

  .campus-root .chat {
    position:absolute; bottom:14px; left:14px; z-index:10;
    width:min(420px, 60vw);
    background:rgba(15,23,42,.88); backdrop-filter:blur(10px);
    border:1px solid var(--border); border-radius:14px; padding:10px 12px;
  }
  .campus-root .chat .msgs { max-height:160px; overflow-y:auto; font-size:12.5px; line-height:1.5; }
  .campus-root .chat .msgs .m { margin-bottom:4px; }
  .campus-root .chat .msgs .m b { color:var(--accent); }
  .campus-root .chat .msgs .m.sys { color:var(--text-soft); font-style:italic; }
  .campus-root .chat input {
    width:100%; margin-top:6px; padding:7px 10px;
    background:rgba(255,255,255,.06); border:1px solid var(--border);
    border-radius:10px; color:#fff; font-family:inherit; font-size:13px;
  }
  .campus-root .chat input:focus { outline:none; border-color:var(--accent); }

  .campus-root .controls {
    position:absolute; bottom:14px; right:14px; z-index:10;
    display:grid; grid-template-columns:repeat(3, 44px); grid-template-rows:repeat(3, 44px);
    gap:4px; pointer-events:auto;
  }
  .campus-root .controls button {
    background:rgba(15,23,42,.85); backdrop-filter:blur(6px);
    border:1px solid var(--border); color:#fff;
    border-radius:10px; cursor:pointer; font-size:18px;
    transition:background .1s;
  }
  .campus-root .controls button:active { background:var(--accent); color:#1e293b; }
  .campus-root .controls button:nth-child(1), .campus-root .controls button:nth-child(3),
  .campus-root .controls button:nth-child(7), .campus-root .controls button:nth-child(9) { visibility:hidden; }

  .campus-root .toast {
    position:absolute; top:90px; left:50%; transform:translateX(-50%);
    z-index:30; padding:8px 16px; border-radius:999px;
    background:linear-gradient(135deg, var(--accent), #f97316); color:#1e293b;
    font-weight:700; font-size:13px;
    opacity:0; transition:opacity .25s, transform .25s;
    pointer-events:none;
  }
  .campus-root .toast.show { opacity:1; transform:translateX(-50%) translateY(0); }
      `}</style>
    </div>
  );
}
