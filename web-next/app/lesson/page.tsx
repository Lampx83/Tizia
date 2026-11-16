'use client';

import { useEffect } from 'react';

// Trang Next /lesson — wrap-mount trang bài giảng động gốc public/lesson.html.
// Chiến lược WRAP-MOUNT: KHÔNG viết lại engine. Ở đây chỉ:
//  1) Dựng lại NGUYÊN khung DOM tĩnh của <body> gốc (head/actions/#content/#end/
//     #comments-box) qua dangerouslySetInnerHTML — giữ NGUYÊN mọi id/class để
//     script cũ querySelector trúng. Nội dung block (text/quiz/3D/canvas) do
//     legacy/lesson.js fetch từ /api/lessons/:slug rồi render động.
//  2) Chèn <style> gốc (nguyên văn) vào document — engine render block với các
//     class .b-*, .cta, .comments... nên CSS phải ở phạm vi document.
//  3) Inject <script type="importmap"> map bare specifier `three` + `three/addons/`
//     sang CDN (bắt buộc có mặt trước khi module resolve import).
//  4) Nạp legacy/lesson.js dạng <script type="module"> (script gốc dùng `import`),
//     rồi 4 script phụ trợ gốc (pwa-register, tutor-floating, adaptive-bridge,
//     orchestrate-bridge) — giữ đúng type + thứ tự + attribute (data-domain,
//     type=module) như bản gốc.
// Effect chạy sau paint → skeleton đã render → engine querySelector an toàn.

const LEGACY_CSS = `
  :root {
    --bg-1: #0f172a; --bg-2: #1e293b; --bg-3: #312e81;
    --accent: #fbbf24; --success: #10b981; --info: #0ea5e9; --danger: #ef4444;
    --card: rgba(255,255,255,0.06); --card-h: rgba(255,255,255,0.12);
    --border: rgba(255,255,255,0.12);
  }
  * { box-sizing: border-box; }
  html, body { margin: 0; min-height: 100vh; font-family: 'Inter', system-ui, sans-serif; }
  body {
    color: white; padding: 0 0 40px;
    background:
      radial-gradient(ellipse 80% 50% at 50% 0%, rgba(139,92,246,0.2), transparent),
      linear-gradient(180deg, var(--bg-1), var(--bg-2) 60%, var(--bg-3));
    min-height: 100vh;
  }
  .head {
    padding: 14px 20px; display: flex; gap: 14px; align-items: center; flex-wrap: wrap;
    background: rgba(15,23,42,0.65); backdrop-filter: blur(10px);
    border-bottom: 1px solid var(--border);
  }
  .head a.back { padding: 7px 12px; background: var(--card); border: 1px solid var(--border); border-radius: 999px; color: white; text-decoration: none; font-size: 12px; }
  .head .title-area { flex: 1; min-width: 200px; }
  .head h1 { margin: 0; font-size: 20px; }
  .head .meta { font-size: 11px; opacity: 0.7; margin-top: 2px; }
  .head .actions { display: flex; gap: 6px; }
  .head .actions button {
    padding: 6px 12px; border-radius: 8px; border: 1px solid var(--border);
    background: rgba(255,255,255,0.08); color: white; cursor: pointer; font-size: 12px;
  }
  .head .like.on { background: linear-gradient(135deg, #ef4444, #b91c1c); border-color: transparent; }

  .wrap { max-width: 880px; margin: 0 auto; padding: 24px 18px; }
  .b { margin: 14px 0; }

  /* heading */
  .b-heading h2, .b-heading h3 {
    background: linear-gradient(135deg, #ffffff, #fbbf24, #f97316);
    -webkit-background-clip: text; background-clip: text; color: transparent;
    margin: 26px 0 10px;
  }
  .b-heading h2 { font-size: 26px; }
  .b-heading h3 { font-size: 20px; }

  /* text */
  .b-text { font-size: 15px; line-height: 1.7; opacity: 0.93; }

  /* image */
  .b-image { text-align: center; }
  .b-image img { max-width: 100%; border-radius: 12px; box-shadow: 0 6px 20px rgba(0,0,0,0.4); }
  .b-image .cap { margin-top: 6px; font-size: 12px; opacity: 0.7; font-style: italic; }

  /* video */
  .b-video iframe { width: 100%; aspect-ratio: 16/9; border: 0; border-radius: 12px; }

  /* quiz */
  .b-quiz {
    background: var(--card); border: 1px solid var(--border);
    border-radius: 12px; padding: 16px;
  }
  .b-quiz .stem { font-weight: 600; font-size: 15px; line-height: 1.5; margin-bottom: 10px; }
  .b-quiz .opt {
    padding: 10px 14px; border-radius: 10px; cursor: pointer; font-size: 14px;
    background: rgba(255,255,255,0.05); margin: 6px 0;
    transition: background 0.15s;
  }
  .b-quiz .opt:hover { background: rgba(255,255,255,0.1); }
  .b-quiz .opt.correct { background: rgba(16,185,129,0.25); border-left: 3px solid #10b981; }
  .b-quiz .opt.wrong { background: rgba(239,68,68,0.25); border-left: 3px solid #ef4444; }
  .b-quiz .explain { font-size: 13px; opacity: 0.85; margin-top: 10px; padding: 10px 14px; background: rgba(14,165,233,0.1); border-radius: 8px; display: none; }
  .b-quiz.answered .explain { display: block; }

  /* 3d-model */
  .b-3d {
    background: linear-gradient(135deg, #1e293b, #312e81); border-radius: 12px;
    aspect-ratio: 4/3; max-height: 400px; position: relative; overflow: hidden;
    border: 1px solid var(--border);
  }
  .b-3d canvas { width: 100% !important; height: 100% !important; }
  .b-3d .cap {
    position: absolute; left: 12px; bottom: 10px; font-size: 12px;
    background: rgba(0,0,0,0.5); padding: 4px 10px; border-radius: 6px;
  }

  /* AI tutor / character / patient / negotiation — CTA card */
  .cta {
    background: linear-gradient(135deg, rgba(251,191,36,0.18), rgba(249,115,22,0.1));
    border: 1px solid rgba(251,191,36,0.4);
    border-radius: 14px; padding: 18px; display: flex; gap: 14px; align-items: center;
    cursor: pointer; transition: transform 0.15s, border-color 0.15s;
  }
  .cta:hover { transform: translateY(-2px); border-color: var(--accent); }
  .cta .ico { font-size: 38px; }
  .cta h3 { margin: 0 0 4px; font-size: 16px; }
  .cta p { margin: 0; font-size: 13px; opacity: 0.85; }
  .cta .arrow { margin-left: auto; font-size: 22px; opacity: 0.6; }

  /* link */
  .b-link {
    display: inline-flex; gap: 8px; align-items: center;
    padding: 8px 14px; background: rgba(14,165,233,0.15); border: 1px solid rgba(14,165,233,0.3);
    border-radius: 999px; color: #7dd3fc; text-decoration: none;
  }
  .b-link:hover { background: rgba(14,165,233,0.25); }

  /* callout */
  .b-callout {
    border-left: 4px solid; padding: 12px 16px; border-radius: 8px;
    font-size: 14px; line-height: 1.6;
  }
  .b-callout.info { border-color: #0ea5e9; background: rgba(14,165,233,0.1); }
  .b-callout.warn { border-color: #f59e0b; background: rgba(245,158,11,0.1); }
  .b-callout.tip { border-color: #10b981; background: rgba(16,185,129,0.1); }
  .b-callout.danger { border-color: #ef4444; background: rgba(239,68,68,0.1); }

  /* divider */
  .b-divider { border-top: 1px solid var(--border); margin: 24px 0; }

  .end {
    margin: 40px auto 0; max-width: 600px;
    background: var(--card); border: 1px solid var(--border); border-radius: 14px;
    padding: 20px; text-align: center;
  }
  .end h3 { margin: 0 0 10px; }
  .end button {
    padding: 10px 18px; border: none; border-radius: 10px;
    background: linear-gradient(135deg, #fbbf24, #f97316); color: #3e2723;
    font-weight: 700; cursor: pointer; margin: 4px;
  }

  /* comments */
  .comments {
    max-width: 800px; margin: 30px auto 0;
    background: var(--card); border: 1px solid var(--border); border-radius: 14px; padding: 18px;
  }
  .comments h3 { margin: 0 0 12px; font-size: 15px; }
  .comments .item {
    border-left: 3px solid var(--info); padding: 8px 12px; margin: 8px 0;
    background: rgba(255,255,255,0.04); border-radius: 8px;
  }
  .comments .item .author { font-weight: 600; font-size: 12px; color: #7dd3fc; }
  .comments .item .text { font-size: 13px; opacity: 0.9; line-height: 1.5; margin-top: 4px; }
  .comments .item .when { font-size: 10px; opacity: 0.5; }
  .comments .new {
    display: flex; gap: 6px; margin-top: 10px; align-items: flex-end;
  }
  .comments input, .comments textarea {
    flex: 1; padding: 8px 12px; border-radius: 8px;
    border: 1px solid rgba(255,255,255,0.2); background: rgba(255,255,255,0.06);
    color: white; font-family: inherit; font-size: 13px;
  }
  .comments button {
    padding: 8px 16px; border-radius: 8px; border: none; cursor: pointer;
    background: linear-gradient(135deg, #fbbf24, #f97316); color: #3e2723; font-weight: 700;
  }
`;

// Khung DOM tĩnh gốc (markup trong <body> gốc). Giữ NGUYÊN mọi id/class/onclick
// để legacy/lesson.js querySelector trúng. Nội dung #content do engine render động.
const SKELETON = `
<div class="head">
  <a href="./" class="back">←</a>
  <div class="title-area">
    <h1 id="title">Đang tải…</h1>
    <div class="meta" id="meta">—</div>
  </div>
  <div class="actions">
    <button id="like" class="like">❤️ <span id="likes-count">0</span></button>
    <button id="share">🔗 Share</button>
    <a id="edit-link" href="#" style="display:none;">✏️ Sửa</a>
  </div>
</div>

<div class="wrap" id="content">
  <p style="text-align:center;opacity:0.6;padding:60px 20px;">Đang tải bài giảng…</p>
</div>

<div class="end" id="end" style="display:none;">
  <h3>🎉 Bạn đã học hết bài!</h3>
  <p style="opacity:0.85;font-size:14px;line-height:1.5;">Cảm ơn em đã học. Chia sẻ phản hồi để giáo viên cải thiện bài giảng tốt hơn nhé.</p>
  <button onclick="document.getElementById('cmt-input').focus()">💬 Viết phản hồi</button>
  <button onclick="location.href='./marketplace'">📚 Xem bài giảng khác</button>
</div>

<div class="comments" id="comments-box" style="display:none;">
  <h3>💬 Phản hồi từ học sinh</h3>
  <div id="comments-list">—</div>
  <div class="new">
    <input id="cmt-name" placeholder="Tên (tuỳ chọn)" style="max-width:160px;" />
    <input id="cmt-input" placeholder="Viết phản hồi…" />
    <button id="cmt-send">Gửi</button>
  </div>
</div>
`;

// importmap gốc — map bare specifier three CDN (jsDelivr 0.169.0 như bản gốc).
const IMPORT_MAP = JSON.stringify({
  imports: {
    three: '/vendor/three-0.169/build/three.module.js',
    'three/addons/': '/vendor/three-0.169/examples/jsm/',
  },
});

export default function LessonPage() {
  useEffect(() => {
    // 1) CSS gốc vào <head> (engine render block ở phạm vi document).
    const style = document.createElement('style');
    style.dataset.lessonLegacy = '1';
    style.textContent = LEGACY_CSS;
    document.head.appendChild(style);

    // 2) importmap — chỉ 1/tài liệu, phải có trước khi module resolve import.
    let map: HTMLScriptElement | null = null;
    if (!document.getElementById('lesson-importmap')) {
      map = document.createElement('script');
      map.type = 'importmap';
      map.id = 'lesson-importmap';
      map.textContent = IMPORT_MAP;
      document.head.appendChild(map);
    }

    // 3) Nạp engine chính (module) — script gốc dùng `import`.
    const main = document.createElement('script');
    main.type = 'module';
    main.src = `/legacy/lesson.js?ts=${Date.now()}`;
    document.body.appendChild(main);

    // 4) Script phụ trợ gốc — giữ đúng type/attribute/thứ tự như bản HTML gốc.
    //    <script src="./js/pwa-register.js" defer>
    //    <script src="./js/tutor-floating.js" data-domain="school" defer>
    //    <script src="./js/adaptive-bridge.js" type="module">
    //    <script src="./js/orchestrate-bridge.js" defer>
    const extras: HTMLScriptElement[] = [];
    const addScript = (src: string, opts: { module?: boolean; defer?: boolean; attrs?: Record<string, string> } = {}) => {
      const el = document.createElement('script');
      el.src = src;
      if (opts.module) el.type = 'module';
      if (opts.defer) el.defer = true;
      if (opts.attrs) for (const [k, v] of Object.entries(opts.attrs)) el.setAttribute(k, v);
      document.body.appendChild(el);
      extras.push(el);
    };
    addScript('/js/pwa-register.js', { defer: true });
    addScript('/js/tutor-floating.js', { defer: true, attrs: { 'data-domain': 'school' } });
    addScript('/js/adaptive-bridge.js', { module: true });
    addScript('/js/orchestrate-bridge.js', { defer: true });

    return () => {
      main.remove();
      extras.forEach((e) => e.remove());
      style.remove();
      // importmap KHÔNG gỡ: đã dùng để resolve module; giữ lại vô hại.
    };
  }, []);

  // Skeleton tĩnh gốc — engine bơm nội dung động vào #content sau khi fetch.
  return <div dangerouslySetInnerHTML={{ __html: SKELETON }} />;
}
