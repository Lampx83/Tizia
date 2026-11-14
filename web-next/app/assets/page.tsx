'use client';

import { useEffect } from 'react';

// WRAP-MOUNT trang "Thư viện Asset 3D" (public/assets.html).
// Engine 3D (three.js + GLTFLoader + OrbitControls, preview .glb/.gltf) KHÔNG viết lại:
// toàn bộ logic gốc nằm nguyên văn ở /public/legacy/assets.js (ES module, bare import
// 'three' / 'three/addons/'). page.tsx chỉ:
//   1) dựng lại đúng khung DOM (mọi id/class để querySelector cũ trúng),
//   2) chèn <style> gốc, scope dưới .assets-root (background full-trang chuyển lên root),
//   3) trong useEffect: chèn <script type="importmap"> ánh xạ 'three' → CDN jsDelivr
//      (giữ NGUYÊN importmap gốc) TRƯỚC, rồi nạp <script type="module" src="/legacy/assets.js">.
// Danh mục asset fetch từ /api/assets (DB) — giữ nguyên trong legacy js, chạy qua proxy Express.

// Nội dung importmap gốc của public/assets.html (three.module.js + examples/jsm/).
const IMPORT_MAP = {
  imports: {
    three: '/vendor/three-0.169/build/three.module.js',
    'three/addons/': '/vendor/three-0.169/examples/jsm/',
  },
};

export default function AssetsPage() {
  useEffect(() => {
    // importmap PHẢI có trong document trước khi module script đầu tiên load, và chỉ
    // được có 1 cái. Chèn nếu chưa tồn tại (client-navigate lại sẽ tái dùng cái cũ).
    if (!document.querySelector('script[type="importmap"]')) {
      const im = document.createElement('script');
      im.type = 'importmap';
      im.textContent = JSON.stringify(IMPORT_MAP);
      // Chèn vào <head> đầu tiên để chắc chắn đứng trước mọi module script.
      document.head.insertBefore(im, document.head.firstChild);
    }

    // Nạp wrap engine. ?ts để re-execute khi quay lại trang (SPA nav).
    const s = document.createElement('script');
    s.type = 'module';
    s.src = `/legacy/assets.js?ts=${Date.now()}`;
    document.body.appendChild(s);
    return () => {
      s.remove();
    };
  }, []);

  return (
    <div className="assets-root">
      <div className="wrap">
        <div className="head">
          <a href="/" className="back">
            ← Trang chủ
          </a>
          <div className="logo">🧱</div>
          <h1>Thư viện Asset 3D</h1>
          <div className="stats" id="stats">
            Đang quét…
          </div>
        </div>
        <p className="tagline">
          Catalogue toàn bộ model 3D (.glb/.gltf) dùng được trong Tizia — phân loại theo gói, tag, kích thước.
          Bấm vào card để xem trước. Có thể copy URL để dùng trong{' '}
          <a href="/lesson-builder" style={{ color: 'inherit' }}>
            Lesson Builder
          </a>
          .
        </p>

        <div className="filters">
          <input type="search" id="q" placeholder="Tìm theo tên file, tag, gói…" />
          <div className="chips" id="cat-chips" />
        </div>

        <div className="grid" id="grid" />
        <div className="empty" id="empty" style={{ display: 'none' }}>
          Không tìm thấy asset phù hợp.
        </div>
      </div>

      <div className="preview-modal" id="modal">
        <div>
          <div className="box" id="box">
            <button className="close" id="close">
              ✕
            </button>
          </div>
          <div className="meta" id="modal-meta" />
        </div>
      </div>

      {/* CSS gốc của public/assets.html — scope dưới .assets-root để không đụng theme
          layout chung của Next. Background full-trang (từ body gốc) chuyển lên root. */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
  .assets-root {
    --bg-1: #0f172a; --bg-2: #1e293b; --bg-3: #312e81;
    --accent: #fbbf24; --accent-2: #f59e0b;
    --card: rgba(255,255,255,0.06); --card-h: rgba(255,255,255,0.12);
    --border: rgba(255,255,255,0.12);
    color: white; min-height: 100vh; padding: 24px 18px;
    font-family: 'Inter', system-ui, sans-serif;
    background:
      radial-gradient(ellipse 80% 50% at 50% 0%, rgba(139,92,246,0.25), transparent),
      linear-gradient(180deg, var(--bg-1) 0%, var(--bg-2) 60%, var(--bg-3) 100%);
  }
  .assets-root, .assets-root * { box-sizing: border-box; }
  .assets-root .wrap { max-width: 1280px; margin: 0 auto; }
  .assets-root .head { display: flex; gap: 14px; align-items: center; margin-bottom: 22px; flex-wrap: wrap; }
  .assets-root .head a.back {
    display: inline-flex; gap: 6px; align-items: center;
    padding: 8px 14px; background: var(--card); border: 1px solid var(--border);
    border-radius: 999px; color: white; text-decoration: none; font-size: 13px;
  }
  .assets-root .head .logo { font-size: 36px; }
  .assets-root .head h1 {
    margin: 0; font-size: 28px; letter-spacing: -0.5px;
    background: linear-gradient(135deg, #ffffff 0%, #fbbf24 60%, #f97316 100%);
    -webkit-background-clip: text; background-clip: text; color: transparent;
  }
  .assets-root .head .stats { margin-left: auto; font-size: 13px; opacity: 0.85; }
  .assets-root .tagline { opacity: 0.85; font-size: 14px; max-width: 740px; line-height: 1.6; margin: 0 0 22px; }
  .assets-root .filters {
    display: flex; gap: 10px; flex-wrap: wrap; align-items: center; margin-bottom: 18px;
    background: var(--card); border: 1px solid var(--border); padding: 14px 18px; border-radius: 14px;
  }
  .assets-root .filters input[type=search] {
    flex: 1; min-width: 200px;
    padding: 10px 14px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.2);
    background: rgba(255,255,255,0.95); color: #1f2937; font-size: 14px; font-family: inherit;
  }
  .assets-root .chips { display: flex; gap: 6px; flex-wrap: wrap; }
  .assets-root .chip {
    padding: 6px 12px; border-radius: 999px; font-size: 12px; cursor: pointer;
    background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.15);
    transition: background 0.15s, border-color 0.15s;
  }
  .assets-root .chip:hover { background: rgba(255,255,255,0.12); }
  .assets-root .chip.active {
    background: linear-gradient(135deg, var(--accent), var(--accent-2));
    color: #3e2723; border-color: transparent; font-weight: 700;
  }
  .assets-root .grid {
    display: grid; gap: 14px;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }
  .assets-root .card {
    background: var(--card); border: 1px solid var(--border); border-radius: 12px;
    overflow: hidden; cursor: grab; user-select: none;
    transition: transform 0.15s, background 0.15s, border-color 0.15s;
  }
  .assets-root .card:hover { background: var(--card-h); transform: translateY(-2px); border-color: rgba(251,191,36,0.4); }
  .assets-root .card .thumb {
    aspect-ratio: 1 / 1; background: linear-gradient(135deg, #1e293b, #312e81);
    display: flex; align-items: center; justify-content: center;
    font-size: 50px; opacity: 0.85; position: relative;
  }
  .assets-root .card .thumb canvas { width: 100% !important; height: 100% !important; display: block; }
  .assets-root .card .info { padding: 10px 12px; }
  .assets-root .card .info .name {
    font-size: 13px; font-weight: 600;
    overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
  }
  .assets-root .card .info .meta { font-size: 11px; opacity: 0.6; margin-top: 3px; }
  .assets-root .card .info .tags { display: flex; gap: 4px; flex-wrap: wrap; margin-top: 6px; }
  .assets-root .card .info .tags span {
    font-size: 9px; padding: 2px 6px; border-radius: 999px;
    background: rgba(251,191,36,0.15); color: var(--accent); font-weight: 600;
  }
  .assets-root .empty {
    text-align: center; padding: 60px 20px; opacity: 0.7; font-size: 14px;
  }
  .assets-root .preview-modal {
    position: fixed; inset: 0; background: rgba(0,0,0,0.85); z-index: 1000;
    display: none; align-items: center; justify-content: center; padding: 24px;
  }
  .assets-root .preview-modal.show { display: flex; }
  .assets-root .preview-modal .box {
    width: 100%; max-width: 720px; aspect-ratio: 4 / 3;
    background: linear-gradient(135deg, #1e293b, #312e81);
    border-radius: 14px; position: relative;
    border: 1px solid rgba(251,191,36,0.5);
  }
  .assets-root .preview-modal .box canvas { width: 100% !important; height: 100% !important; border-radius: 14px; }
  .assets-root .preview-modal .close {
    position: absolute; top: -40px; right: 0; cursor: pointer; color: white;
    font-size: 24px; background: none; border: none;
  }
  .assets-root .preview-modal .meta {
    color: white; font-size: 13px; margin-top: 14px; max-width: 720px;
  }
  .assets-root .preview-modal .meta code { background: rgba(255,255,255,0.08); padding: 2px 8px; border-radius: 6px; font-size: 11px; }
`,
        }}
      />
    </div>
  );
}
