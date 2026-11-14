'use client';

import { useEffect } from 'react';

// WRAP-MOUNT của public/2d-arcade.html — game 2D canvas + MediaPipe hand tracking
// (pinch kéo hộp thuốc lên kệ theo nhóm điều trị). KHÔNG viết lại engine: toàn bộ
// script inline gốc nằm nguyên văn ở /public/legacy/2d-arcade.js và được nạp bằng
// <script type="module"> sau khi khung DOM (canvas#game, #cam-preview, #start-overlay,
// #result-modal, #start-btn, #mouse-only) đã render. Engine querySelector theo đúng
// id/class gốc nên skeleton phải giữ nguyên. CSS gốc inline scoped dưới .arcade-root.
//
// Trang này là overlay toàn màn hình (position:fixed; inset:0; z rất cao) để phủ
// header/main của layout dùng chung — vì game gốc chạy full-viewport với canvas
// absolute + overflow hidden, mà ta KHÔNG được sửa layout.tsx/globals.css.
export default function Arcade2DPage() {
  useEffect(() => {
    const s = document.createElement('script');
    s.type = 'module';
    // ?ts để re-execute engine khi client-navigate quay lại trang.
    s.src = `/legacy/2d-arcade.js?ts=${Date.now()}`;
    document.body.appendChild(s);
    return () => {
      s.remove();
    };
  }, []);

  return (
    <div className="arcade-root">
      {/* Khung DOM gốc từ <body> của public/2d-arcade.html — giữ NGUYÊN id/class */}
      <canvas id="game" />
      <canvas id="cam-preview" width={200} height={150} />
      <a href="/" className="back">← Trang chính</a>
      <div id="start-overlay">
        <h1>💊 Tizia · 2D Arcade</h1>
        <p>
          Mở thùng thuốc, cầm từng hộp, xếp lên kệ đúng <b>nhóm điều trị</b>
        </p>
        <p>
          👉 Chụm ngón cái + trỏ trước webcam để <b>pinch</b> — hoặc dùng chuột để kéo
        </p>
        <p className="tip">
          Webcam cần mở qua <code>http://localhost</code> (không phải <code>file://</code>)
        </p>
        <button id="start-btn">▶️ Bắt đầu (webcam)</button>
        <a
          href="#"
          id="mouse-only"
          style={{ color: '#fbbf24', textDecoration: 'none', fontSize: '14px', marginTop: '4px' }}
        >
          🖱️ Chơi bằng chuột (không cần webcam)
        </a>
      </div>
      <div id="result-modal" />

      {/* CSS gốc của public/2d-arcade.html — scoped dưới .arcade-root. Quy tắc
          html,body{overflow:hidden} gốc chuyển sang chính .arcade-root (fixed
          fullscreen) để không đụng layout chung. */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
  .arcade-root {
    position: fixed; inset: 0; z-index: 9999;
    overflow: hidden; background: #1a1a2e;
    font-family: system-ui, sans-serif; user-select: none;
    touch-action: none; -webkit-tap-highlight-color: transparent;
  }
  @media (max-width: 640px) {
    .arcade-root #start-overlay h1 { font-size: 28px !important; }
    .arcade-root #start-overlay p { font-size: 14px !important; }
    .arcade-root #start-btn { font-size: 16px !important; padding: 12px 24px !important; }
    .arcade-root a.back { font-size: 11px !important; padding: 4px 8px !important; }
    .arcade-root #cam-preview { width: 130px !important; height: 100px !important; }
  }
  .arcade-root canvas#game {
    display: block; position: absolute; top: 0; left: 0;
    background: linear-gradient(180deg, #b3e5fc 0%, #fff3e0 60%, #d7ccc8 100%);
  }
  .arcade-root #cam-preview {
    position: absolute; top: 12px; right: 12px;
    border-radius: 8px; background: #000;
    box-shadow: 0 2px 8px rgba(0,0,0,0.3);
    transform: scaleX(-1); display: none; z-index: 10;
  }
  .arcade-root #start-overlay {
    position: absolute; inset: 0; background: rgba(10,10,30,0.88);
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    color: white; z-index: 100; gap: 16px; padding: 20px; text-align: center;
  }
  .arcade-root #start-overlay h1 { font-size: 44px; margin: 0; text-shadow: 0 4px 16px rgba(0,0,0,0.4); }
  .arcade-root #start-overlay p { font-size: 16px; opacity: 0.9; max-width: 540px; line-height: 1.6; margin: 4px 0; }
  .arcade-root #start-overlay .tip { font-size: 13px; opacity: 0.65; }
  .arcade-root #start-btn {
    padding: 14px 32px; font-size: 18px; font-weight: 700;
    background: linear-gradient(135deg, #43a047, #66bb6a); color: white;
    border: none; border-radius: 12px; cursor: pointer;
    box-shadow: 0 4px 12px rgba(0,0,0,0.3); transition: transform 0.15s;
  }
  .arcade-root #start-btn:hover:not(:disabled) { transform: translateY(-2px); }
  .arcade-root #start-btn:disabled { opacity: 0.6; cursor: wait; }
  .arcade-root #result-modal {
    position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%);
    background: white; padding: 28px 36px; border-radius: 18px;
    box-shadow: 0 12px 48px rgba(0,0,0,0.4);
    z-index: 50; display: none; min-width: 380px; max-width: 90vw; text-align: center;
  }
  .arcade-root #result-modal h2 { margin: 0 0 4px; font-size: 24px; }
  .arcade-root #result-modal .score { font-size: 56px; font-weight: 800; color: #1976d2; margin: 8px 0; }
  .arcade-root #result-modal .sub { color: #888; margin-bottom: 18px; font-size: 14px; }
  .arcade-root #result-modal button {
    padding: 12px 28px; font-size: 16px; font-weight: 700;
    background: linear-gradient(135deg, #43a047, #66bb6a); color: white;
    border: none; border-radius: 10px; cursor: pointer; margin: 0 4px;
  }
  .arcade-root #result-modal button.secondary { background: #fafafa; color: #333; border: 1px solid #ccc; }
  .arcade-root a.back { position: absolute; top: 12px; left: 12px; color: white; text-decoration: none; font-size: 13px; background: rgba(0,0,0,0.5); padding: 6px 12px; border-radius: 6px; z-index: 20; }
  .arcade-root a.back:hover { background: rgba(0,0,0,0.7); }
`,
        }}
      />
    </div>
  );
}
