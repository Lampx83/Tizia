'use client';

import { useEffect, useRef } from 'react';

// Scoped styles copied verbatim from the original inline <style> block.
const STYLE = `
  html, body { margin: 0; height: 100%; overflow: hidden;
    background: linear-gradient(180deg, #e8efe9 0%, #c9d5cc 100%);
    font-family: system-ui, sans-serif; touch-action: none; color: #1f2937; }
  canvas { display: block; touch-action: none; }
  a { color: inherit; }

  #topbar {
    position: absolute; top: 12px; left: 50%; transform: translateX(-50%);
    z-index: 10; display: flex; gap: 10px; align-items: center;
    background: rgba(255,255,255,0.94); backdrop-filter: blur(8px);
    padding: 8px 14px; border-radius: 14px; font-size: 13px;
    box-shadow: 0 4px 14px rgba(0,0,0,0.12);
    border: 1px solid rgba(0,0,0,0.06);
  }
  #topbar .pill {
    background: linear-gradient(135deg, #14b8a6, #0f766e); color: #fff;
    padding: 4px 10px; border-radius: 14px; font-weight: 700; font-size: 11px; letter-spacing: 0.5px;
  }
  #topbar .lvl-pill {
    background: linear-gradient(135deg, #fbbf24, #f59e0b); color: #3e2723;
    padding: 4px 10px; border-radius: 14px; font-weight: 700; font-size: 11px;
  }

  a.back {
    position: absolute; top: 12px; left: 12px; z-index: 10;
    background: rgba(255,255,255,0.85); color: #1f2937; padding: 6px 12px; border-radius: 8px;
    text-decoration: none; font-size: 13px; box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  }

  /* ===== Instruction clipboard (left) ===== */
  #recipe {
    position: absolute; top: 60px; left: 12px; z-index: 10;
    width: 280px;
    background:
      repeating-linear-gradient(180deg, #fffef5 0px, #fffef5 27px, #f0e8c8 28px),
      linear-gradient(180deg, #fffdf0, #f7eecc);
    border-radius: 4px 4px 8px 8px;
    box-shadow: 0 8px 28px rgba(0,0,0,0.22), inset 0 1px 0 rgba(255,255,255,0.7);
    border: 1px solid #c9b780; color: #2c1d0a;
    font-size: 13px; line-height: 1.5;
  }
  #recipe::before {
    content: ''; position: absolute; left: 50%; top: -14px; transform: translateX(-50%);
    width: 70px; height: 18px; background: linear-gradient(180deg, #b0b0b0, #777);
    border-radius: 4px; box-shadow: 0 2px 4px rgba(0,0,0,0.25);
  }
  #recipe-head {
    background: linear-gradient(180deg, #e1d29f, #ccb878);
    padding: 24px 14px 8px; border-radius: 4px 4px 0 0;
    font-weight: 800; font-size: 14px; text-align: center;
    border-bottom: 1px solid #b39c5e;
  }
  #recipe-body { padding: 10px 14px 12px; }
  #recipe-body .lbl { font-size: 10px; opacity: 0.65; text-transform: uppercase; letter-spacing: 0.6px; margin-top: 8px; font-weight: 700; }
  #recipe-body ul { list-style: none; padding: 0; margin: 4px 0 8px; }
  #recipe-body ul li {
    display: flex; justify-content: space-between; padding: 2px 0;
    font-family: 'SF Mono', Consolas, monospace; font-size: 12px;
  }
  #recipe-body .formula { background: rgba(0,0,0,0.05); padding: 6px 10px; border-radius: 6px; font-family: 'SF Mono', monospace; font-size: 12px; }

  /* ===== Right panel: live pH + curve + counter ===== */
  #panel {
    position: absolute; top: 60px; right: 12px; z-index: 10;
    width: 320px;
    background: rgba(255,255,255,0.96);
    border-radius: 12px; padding: 14px 18px;
    box-shadow: 0 6px 18px rgba(0,0,0,0.18);
    border: 1px solid rgba(0,0,0,0.06);
  }
  #panel h3 { margin: 0 0 8px; font-size: 13px; opacity: 0.7; letter-spacing: 0.4px; text-transform: uppercase; }
  #ph-display {
    font-family: 'SF Mono', monospace;
    font-size: 38px; font-weight: 800;
    background: linear-gradient(135deg, #14b8a6, #0f766e);
    -webkit-background-clip: text; background-clip: text; color: transparent;
    text-align: center; line-height: 1; margin: 4px 0;
  }
  #ph-label { text-align: center; font-size: 12px; opacity: 0.7; margin-bottom: 8px; }
  #volume-display { text-align: center; font-family: 'SF Mono', monospace; font-size: 18px; margin-top: 4px; }
  #volume-display .unit { opacity: 0.6; font-size: 13px; }
  #curve-canvas { width: 100%; height: 130px; background: #f9fafb; border-radius: 8px; border: 1px solid #e5e7eb; margin: 10px 0 8px; }
  #endpoint-indicator {
    text-align: center; font-size: 13px; padding: 6px 10px; border-radius: 8px;
    background: rgba(0,0,0,0.04); color: #6b7280; transition: all 0.3s;
  }
  #endpoint-indicator.near { background: rgba(251,191,36,0.18); color: #92400e; font-weight: 600; }
  #endpoint-indicator.past { background: rgba(236,72,153,0.18); color: #9d174d; font-weight: 600; }

  /* ===== Bottom drip control ===== */
  #drip-control {
    position: absolute; bottom: 24px; left: 50%; transform: translateX(-50%);
    z-index: 10; display: flex; gap: 12px; align-items: center;
    background: rgba(255,255,255,0.95); backdrop-filter: blur(8px);
    padding: 10px 14px; border-radius: 16px;
    box-shadow: 0 6px 24px rgba(0,0,0,0.18); border: 1px solid rgba(0,0,0,0.06);
  }
  #drip-control button {
    padding: 10px 18px; border-radius: 10px; border: none;
    font-family: inherit; font-size: 13px; font-weight: 700; cursor: pointer;
    transition: all 0.15s;
  }
  #drip-control .drip-btn {
    background: linear-gradient(135deg, #0ea5e9, #0369a1); color: white;
    min-width: 120px; user-select: none;
  }
  #drip-control .drip-btn:hover { background: linear-gradient(135deg, #38bdf8, #0284c7); transform: translateY(-1px); }
  #drip-control .drip-btn:active { transform: translateY(1px) scale(0.98); }
  #drip-control .drip-btn.fast { background: linear-gradient(135deg, #ef4444, #b91c1c); }
  #drip-control .submit { background: linear-gradient(135deg, #10b981, #047857); color: white; }
  #drip-control .submit:hover { background: linear-gradient(135deg, #34d399, #059669); }
  #drip-control .reset { background: rgba(0,0,0,0.06); color: #1f2937; }

  /* ===== Result modal ===== */
  #result-modal {
    display: none;
    position: fixed; inset: 0; z-index: 50;
    background: rgba(15, 23, 42, 0.6); backdrop-filter: blur(4px);
    align-items: center; justify-content: center;
  }
  #result-modal.open { display: flex; }
  #result-card {
    background: white; border-radius: 18px; padding: 28px 32px;
    max-width: 520px; width: 90%;
    box-shadow: 0 30px 80px rgba(0,0,0,0.4);
  }
  #result-card h2 { margin: 0 0 6px; font-size: 22px; }
  #result-card .stars { font-size: 36px; text-align: center; margin: 12px 0 6px; }
  #result-card .score { font-size: 32px; font-weight: 800; text-align: center;
    background: linear-gradient(135deg, #10b981, #047857);
    -webkit-background-clip: text; background-clip: text; color: transparent; }
  #result-card.poor .score { background: linear-gradient(135deg, #ef4444, #b91c1c); -webkit-background-clip: text; background-clip: text; }
  #result-card .row { display: flex; justify-content: space-between; padding: 8px 12px; border-radius: 8px; margin: 4px 0; background: #f3f4f6; font-size: 14px; }
  #result-card .row.true { background: #dcfce7; }
  #result-card .actions { display: flex; gap: 10px; margin-top: 16px; }
  #result-card button { flex: 1; padding: 12px; border: none; border-radius: 10px; font-weight: 700; cursor: pointer; font-family: inherit; font-size: 14px; }
  #result-card .again { background: rgba(0,0,0,0.06); }
  #result-card .home { background: linear-gradient(135deg, #6366f1, #4338ca); color: white; }
`;

// Body markup copied verbatim from the original <body>; every id/class kept so
// the legacy engine's querySelector/getElementById calls hit. Only the two
// root-relative navigation hrefs were made absolute (they used to resolve from
// the site root; under the /L2-1-titration/ route a bare "index.html" would
// resolve wrong).
const SKELETON = `
<a class="back" href="/">← Trang chủ</a>

<div id="topbar">
  <span class="pill">L2.1</span>
  <span>Chuẩn độ acid–base</span>
  <span class="lvl-pill">Năm 2 · Hoá phân tích</span>
</div>

<!-- Instruction clipboard -->
<div id="recipe">
  <div id="recipe-head">📋 Bài thí nghiệm</div>
  <div id="recipe-body">
    <div><b>Mục tiêu:</b> Xác định nồng độ HCl bằng dung dịch NaOH 0.100 M chuẩn (phenolphthalein làm chỉ thị).</div>

    <div class="lbl">Dụng cụ</div>
    <ul>
      <li><span>Buret 50 mL</span><span>NaOH 0.100 M</span></li>
      <li><span>Bình tam giác</span><span>HCl + chỉ thị</span></li>
      <li><span>Máy khuấy từ</span><span>—</span></li>
    </ul>

    <div class="lbl">Hoá chất</div>
    <ul>
      <li><span>HCl</span><span id="rcp-vol-hcl">25.0 mL</span></li>
      <li><span>Phenolphthalein</span><span>2 giọt</span></li>
      <li><span>NaOH chuẩn</span><span>0.100 M</span></li>
    </ul>

    <div class="lbl">Công thức tính</div>
    <div class="formula">
      C<sub>HCl</sub> × V<sub>HCl</sub> = C<sub>NaOH</sub> × V<sub>NaOH</sub><br>
      → C<sub>HCl</sub> = (V<sub>NaOH</sub> × 0.100) / 25.0
    </div>

    <div class="lbl">Quy trình</div>
    <div style="font-size:11.5px">
      1. Quan sát màu hồng nhạt đầu tiên xuất hiện<br>
      2. Mở buret CHẬM khi gần điểm tương đương<br>
      3. Khi giữ được màu hồng bền 30s → ghi V<sub>NaOH</sub><br>
      4. Bấm <b>"Hoàn thành"</b> để chấm điểm
    </div>
  </div>
</div>

<!-- Live measurement panel -->
<div id="panel">
  <h3>📊 Theo dõi trực tiếp</h3>
  <div id="ph-display">1.0</div>
  <div id="ph-label">pH dung dịch trong bình</div>

  <canvas id="curve-canvas" width="280" height="130"></canvas>

  <div id="volume-display">
    NaOH đã thêm: <b id="vol-added">0.0</b> <span class="unit">mL</span>
  </div>

  <div id="endpoint-indicator">⚪ Chưa đến điểm tương đương</div>
</div>

<!-- Drip control -->
<div id="drip-control">
  <button class="drip-btn" id="btn-fast">⚡ Mở van NHANH (giữ)</button>
  <button class="drip-btn" id="btn-slow">💧 Nhỏ giọt CHẬM (giữ)</button>
  <button class="reset" id="btn-reset">↺ Làm lại</button>
  <button class="submit" id="btn-submit">✅ Hoàn thành</button>
</div>

<!-- Result modal -->
<div id="result-modal">
  <div id="result-card">
    <h2 id="r-title">Kết quả chuẩn độ</h2>
    <div class="stars" id="r-stars">⭐⭐⭐</div>
    <div class="score" id="r-score">100/100</div>
    <div id="r-rows" style="margin-top:14px"></div>
    <div class="actions">
      <button class="again" id="r-again">Làm lại</button>
      <button class="home" id="r-home">Về trang chủ</button>
    </div>
  </div>
</div>
`;

export default function L2Titration() {
  const mounted = useRef(false);

  useEffect(() => {
    // Guard against React StrictMode double-invoke duplicating the engine.
    if (mounted.current) return;
    mounted.current = true;

    // The original script is an ES module (uses `import`); load it as such.
    const script = document.createElement('script');
    script.type = 'module';
    script.src = '/legacy/L2-1-titration.js';
    document.body.appendChild(script);

    return () => {
      script.remove();
      // Remove the WebGL canvas the engine appended to <body> so navigating
      // away doesn't leave a stray fullscreen canvas behind.
      document.querySelectorAll('body > canvas').forEach((c) => c.remove());
    };
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STYLE }} />
      <div dangerouslySetInnerHTML={{ __html: SKELETON }} />
    </>
  );
}
