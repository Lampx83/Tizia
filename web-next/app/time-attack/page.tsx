'use client';

import { useEffect } from 'react';

// WRAP-MOUNT của public/time-attack.html — game canvas 2D "Time Attack" (xếp
// hộp thuốc lên kệ đúng nhóm điều trị theo từng wave, time giảm dần, sai -5s).
// KHÔNG viết lại engine: toàn bộ script inline gốc (ES module) nằm nguyên văn ở
// /public/legacy/time-attack.js và nạp bằng <script type="module"> sau khi khung
// DOM (canvas#game, #start-overlay, #result-modal, #start-btn) đã render. Engine
// querySelector theo đúng id/class gốc nên skeleton phải giữ nguyên.
//
// Import trong legacy js được đổi từ './js/...' (tương đối theo file HTML gốc)
// sang '/js/...' (tuyệt đối) để proxy về Express qua next.config fallback —
// nếu để tương đối sẽ resolve nhầm thành /legacy/js/... và 404.
//
// Trang là overlay toàn màn hình (position:fixed; inset:0; z rất cao) để phủ
// header/main của layout chung, vì game gốc chạy full-viewport với html,body
// overflow:hidden mà ta KHÔNG được sửa layout.tsx/globals.css.
export default function TimeAttackPage() {
  useEffect(() => {
    const s = document.createElement('script');
    s.type = 'module';
    // ?ts để re-execute engine khi client-navigate quay lại trang.
    s.src = `/legacy/time-attack.js?ts=${Date.now()}`;
    document.body.appendChild(s);
    return () => {
      s.remove();
    };
  }, []);

  return (
    <div className="ta-root">
      {/* Khung DOM gốc từ <body> của public/time-attack.html — giữ NGUYÊN id/class */}
      <canvas id="game" />
      <a className="back" href="/">← Trang chính</a>
      <div id="start-overlay">
        <h1>⚡ TIME ATTACK</h1>
        <p>
          Sống được càng nhiều wave càng tốt!<br />Mỗi wave thêm 1 thuốc · time giảm dần · sai = -5s.
        </p>
        <p style={{ fontSize: '13px', opacity: 0.7 }}>
          Pinch (webcam) hoặc kéo chuột để di chuyển thuốc
        </p>
        <button id="start-btn">⚡ Bắt đầu Wave 1</button>
      </div>
      <div id="result-modal" />

      {/* CSS gốc inline của public/time-attack.html — scoped dưới .ta-root. Quy tắc
          html,body{overflow:hidden;background} gốc chuyển sang chính .ta-root
          (fixed fullscreen) để không đụng layout chung. */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
  .ta-root {
    position: fixed; inset: 0; z-index: 9999;
    overflow: hidden; background: #1a1a2e;
    font-family: system-ui, sans-serif; user-select: none;
    touch-action: none; -webkit-tap-highlight-color: transparent;
  }
  .ta-root canvas#game {
    display: block; position: absolute; top: 0; left: 0;
    background: linear-gradient(180deg, #fef3c7 0%, #fed7aa 60%, #fdba74 100%);
    touch-action: none;
  }
  .ta-root a.back { position: absolute; top: 12px; left: 12px; color: white; text-decoration: none; font-size: 13px; background: rgba(0,0,0,0.5); padding: 6px 12px; border-radius: 6px; z-index: 20; }
  .ta-root a.back:hover { background: rgba(0,0,0,0.7); }
  .ta-root #start-overlay {
    position: absolute; inset: 0; background: rgba(20,10,5,0.92);
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    color: white; z-index: 100; gap: 14px; padding: 20px; text-align: center;
  }
  .ta-root #start-overlay h1 { font-size: 44px; margin: 0; background: linear-gradient(135deg, #fbbf24, #f97316, #ef4444); -webkit-background-clip: text; background-clip: text; color: transparent; }
  .ta-root #start-overlay p { font-size: 15px; opacity: 0.9; max-width: 520px; line-height: 1.6; margin: 4px 0; }
  .ta-root #start-btn {
    padding: 14px 32px; font-size: 18px; font-weight: 700;
    background: linear-gradient(135deg, #f97316, #ef4444); color: white;
    border: none; border-radius: 12px; cursor: pointer; min-height: 50px;
  }
  .ta-root #start-btn:hover { transform: translateY(-2px); }
  .ta-root #result-modal {
    position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%);
    background: white; color: #1f2937; padding: 28px 32px; border-radius: 18px;
    box-shadow: 0 12px 48px rgba(0,0,0,0.4); min-width: 320px; max-width: 90vw; text-align: center;
    z-index: 50; display: none;
  }
  .ta-root #result-modal h2 { margin: 0 0 4px; }
  .ta-root #result-modal .score { font-size: 48px; font-weight: 800; color: #f97316; margin: 8px 0; }
  .ta-root #result-modal button { padding: 11px 22px; font-size: 15px; font-weight: 700; background: linear-gradient(135deg, #f97316, #ef4444); color: white; border: none; border-radius: 10px; cursor: pointer; margin: 4px; }
  .ta-root #result-modal button.secondary { background: #f3f4f6; color: #374151; }
  @media (max-width: 640px) {
    .ta-root #start-overlay h1 { font-size: 30px !important; }
    .ta-root #start-btn { font-size: 16px !important; padding: 12px 22px !important; }
  }
`,
        }}
      />
    </div>
  );
}
