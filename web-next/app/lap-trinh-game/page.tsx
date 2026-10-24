'use client';

import { useEffect } from 'react';

const STYLE = `
  .ltg-scope {
    --bg:#0b1020; --bg-2:#101733; --card:#151c3a; --card-2:#1d2547;
    --border:#2a3563; --text:#e6e9f5; --text-soft:#9aa3c7;
    --accent:#fbbf24; --good:#34d399; --bad:#fb7185; --purple:#a78bfa;
    min-height:100vh; color:var(--text);
    font-family:'Inter','Be Vietnam Pro',system-ui,sans-serif;
    background: radial-gradient(900px 600px at 20% 0%, rgba(34,197,94,.08), transparent 70%),
                radial-gradient(900px 600px at 90% 30%, rgba(167,139,250,.10), transparent 70%),
                var(--bg);
  }
  .ltg-scope * { box-sizing:border-box; }
  .ltg-scope a { color:inherit; }
  .ltg-scope .top { position:sticky; top:0; z-index:20; backdrop-filter:blur(12px);
    background:rgba(11,16,32,.7); border-bottom:1px solid var(--border);
    padding:12px 18px; display:flex; align-items:center; gap:14px; }
  .ltg-scope .back { text-decoration:none; padding:7px 14px; border-radius:18px;
    background:rgba(255,255,255,.08); border:1px solid var(--border);
    font-size:13px; font-weight:600; color:inherit; }
  .ltg-scope .top h1 { margin:0; font-size:18px; }
  .ltg-scope .top .level-info { margin-left:auto; font-size:13px; color:var(--text-soft); }

  .ltg-scope .wrap { max-width:1180px; margin:0 auto; padding:18px; display:grid;
    grid-template-columns: 1fr 1fr; gap:18px; }

  .ltg-scope .panel { background:var(--card); border:1px solid var(--border); border-radius:16px;
    padding:18px; }
  .ltg-scope .panel h3 { margin:0 0 10px; font-size:14px; font-weight:700; color:var(--text-soft); letter-spacing:.6px; text-transform:uppercase; }

  /* Game canvas */
  .ltg-scope .game-host { background:#020617; border:2px solid var(--border); border-radius:12px;
    aspect-ratio:1; overflow:hidden; position:relative; }
  .ltg-scope .game-host canvas { display:block; width:100%; height:100%; image-rendering:pixelated; }
  .ltg-scope .game-meta { display:flex; gap:14px; margin-top:10px; font-size:12.5px; color:var(--text-soft); }
  .ltg-scope .game-meta b { color:var(--accent); }
  .ltg-scope .game-meta .ok { color:var(--good); }
  .ltg-scope .game-meta .bad { color:var(--bad); }

  /* Editor */
  .ltg-scope .editor { background:#0f172a; border:1px solid var(--border); border-radius:10px;
    overflow:hidden; }
  .ltg-scope .editor textarea {
    width:100%; min-height:280px; padding:12px 14px;
    background:transparent; border:none; outline:none; resize:vertical;
    color:#a7f3d0; font-family:'JetBrains Mono', 'Courier New', monospace;
    font-size:13.5px; line-height:1.55;
  }
  .ltg-scope .editor textarea::placeholder { color:rgba(255,255,255,.25); }
  .ltg-scope .editor-toolbar {
    display:flex; gap:8px; padding:10px;
    border-top:1px solid rgba(255,255,255,0.06);
    background:rgba(255,255,255,0.02);
  }
  .ltg-scope .editor-toolbar button {
    padding:8px 16px; border-radius:10px; border:none; cursor:pointer;
    font:700 13px 'Inter', sans-serif; transition:transform .12s;
  }
  .ltg-scope .editor-toolbar button:hover:not(:disabled) { transform:scale(1.03); }
  .ltg-scope .editor-toolbar .run { background:linear-gradient(135deg, var(--good), #10b981); color:#052e16; }
  .ltg-scope .editor-toolbar .reset { background:rgba(255,255,255,.08); color:var(--text); }
  .ltg-scope .editor-toolbar .hint { background:rgba(167,139,250,.18); color:#c4b5fd; border:1px solid rgba(167,139,250,.4); }
  .ltg-scope .editor-toolbar button:disabled { opacity:.5; cursor:not-allowed; }

  .ltg-scope .console { margin-top:10px; padding:10px 14px; border-radius:10px;
    background:rgba(0,0,0,.4); border:1px solid var(--border);
    font-family:'JetBrains Mono', monospace; font-size:12px;
    color:#cbd5e1; max-height:140px; overflow-y:auto; line-height:1.6; }
  .ltg-scope .console .line.err { color:#fda4af; }
  .ltg-scope .console .line.ok { color:#86efac; }
  .ltg-scope .console .line.info { color:#fde68a; }

  /* Levels */
  .ltg-scope .levels { display:flex; gap:8px; flex-wrap:wrap; margin-bottom:14px; }
  .ltg-scope .levels .lv {
    padding:6px 14px; border-radius:18px;
    background:rgba(255,255,255,.05); border:1px solid var(--border);
    font-size:12.5px; cursor:pointer; font-weight:700;
  }
  .ltg-scope .levels .lv.cur { background:var(--good); color:#052e16; border-color:var(--good); }
  .ltg-scope .levels .lv.done { background:rgba(34,197,94,.18); color:var(--good); }

  .ltg-scope .desc { font-size:13.5px; color:var(--text-soft); margin-bottom:12px; line-height:1.55; }
  .ltg-scope .desc b { color:var(--accent); }
  .ltg-scope .desc code { background:rgba(167,139,250,.16); padding:1px 6px; border-radius:4px;
    color:#c4b5fd; font-family:'JetBrains Mono'; font-size:12.5px; }

  .ltg-scope .victory {
    position:fixed; inset:0; z-index:300;
    background:rgba(2,6,23,.85); backdrop-filter:blur(10px);
    display:flex; align-items:center; justify-content:center;
    opacity:0; pointer-events:none; transition:opacity .3s;
  }
  .ltg-scope .victory.open { opacity:1; pointer-events:auto; }
  .ltg-scope .victory .card {
    background:linear-gradient(180deg, #1e293b, #0f172a);
    border:1px solid rgba(34,197,94,.5); border-radius:18px;
    padding:24px 32px; text-align:center;
  }
  .ltg-scope .victory .star { font-size:72px; animation:ltg-vic-bounce 1.2s ease-in-out infinite; }
  @keyframes ltg-vic-bounce { 0%,100%{transform:scale(1);} 50%{transform:scale(1.2);} }
  .ltg-scope .victory h2 { font-size:24px; margin:8px 0;
    background:linear-gradient(135deg, #fbbf24, #22c55e);
    -webkit-background-clip:text; background-clip:text; color:transparent; }
  .ltg-scope .victory button { background:linear-gradient(135deg, var(--good), #10b981); color:#052e16;
    border:none; padding:11px 24px; border-radius:12px; font:800 14px 'Inter', system-ui, sans-serif; cursor:pointer; }

  @media (max-width:880px) { .ltg-scope .wrap { grid-template-columns:1fr; } }
`;

const SKELETON = `
<header id="auth-header"></header>

<div class="top">
  <a class="back" href="/">← Trang chủ</a>
  <h1>💻 Lập trình điều khiển nhân vật</h1>
  <span class="level-info" id="lv-info">Level 1 / 5</span>
</div>

<div class="wrap">
  <div class="panel">
    <h3>🎮 Sân chơi</h3>
    <div class="levels" id="lv-tabs"></div>
    <div class="desc" id="lv-desc"></div>
    <div class="game-host">
      <canvas id="game" width="320" height="320"></canvas>
    </div>
    <div class="game-meta">
      <span>🪙 <b id="coin-count">0</b>/<span id="coin-max">0</span></span>
      <span>📍 <span id="pos">(?, ?)</span></span>
      <span id="status" class="ok">Sẵn sàng</span>
    </div>
  </div>

  <div class="panel">
    <h3>⌨ Viết code</h3>
    <div class="editor">
      <textarea id="code" placeholder="// Viết code điều khiển nhân vật ở đây
// Các hàm có sẵn:
//   forward()      → đi tới 1 ô theo hướng đang quay
//   right()        → quay phải 90°
//   left()         → quay trái 90°
//   pickup()       → nhặt coin tại ô hiện tại
//   sleep(ms)      → đợi (tùy chọn)
//   say('xin chào') → nói gì đó

// Ví dụ:
// forward();
// forward();
// right();
// pickup();
"></textarea>
      <div class="editor-toolbar">
        <button class="run" id="run">▶ Chạy</button>
        <button class="reset" id="reset">↻ Reset</button>
        <button class="hint" id="hint">💡 Gợi ý</button>
      </div>
    </div>
    <div class="console" id="cons"></div>
  </div>
</div>

<div class="victory" id="vic">
  <div class="card">
    <div class="star">🏆</div>
    <h2 data-vic-title>Hoàn thành!</h2>
    <p style="color:#cbd5e1" data-vic-msg>Em đã giải xong level.</p>
    <p data-reward style="color:#fde68a;font-weight:700"></p>
    <button data-vic-next>Level kế tiếp →</button>
  </div>
</div>
`;

// Các module script sidecar tải theo trang gốc (đúng thứ tự). Giữ nguyên đường
// dẫn — proxy Next → Express phục vụ được.
const SIDECAR_MODULES = [
  '/js/auth-header.js',
  '/js/engagement-hud.js?v=2026-06-05-r2',
  '/js/onboarding-60s.js?v=2026-06-08-r8',
  '/js/pet-widget.js?v=2026-06-10-tl1',
  '/js/daily-login.js?v=2026-06-07b',
];

export default function LapTrinhGamePage() {
  useEffect(() => {
    const scripts: HTMLScriptElement[] = [];

    // auth-header trước, rồi engine game inline, rồi các widget khác.
    const authHeader = document.createElement('script');
    authHeader.type = 'module';
    authHeader.src = SIDECAR_MODULES[0];
    document.body.appendChild(authHeader);
    scripts.push(authHeader);

    // Engine game (nguyên văn khối <script type="module"> gốc)
    const engine = document.createElement('script');
    engine.type = 'module';
    engine.src = '/legacy/lap-trinh-game.js';
    document.body.appendChild(engine);
    scripts.push(engine);

    // Các widget engagement/pet/daily
    for (const src of SIDECAR_MODULES.slice(1)) {
      const s = document.createElement('script');
      s.type = 'module';
      s.src = src;
      document.body.appendChild(s);
      scripts.push(s);
    }

    return () => {
      for (const s of scripts) s.remove();
    };
  }, []);

  return (
    <div className="ltg-scope">
      <style dangerouslySetInnerHTML={{ __html: STYLE }} />
      <div dangerouslySetInnerHTML={{ __html: SKELETON }} />
    </div>
  );
}
