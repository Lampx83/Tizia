'use client';

import { useEffect } from 'react';

// Wrap-mount cho trang Next /PS01-er (PS01 · Cấp cứu phản vệ ER).
// Engine Three.js NẶNG (ER 3D + vitals monitor canvas + hold-to-administer +
// scoring + POST api/attempts) được GIỮ NGUYÊN trong public/legacy/PS01-er.js —
// KHÔNG viết lại sang React. Client Component này chỉ:
//   1) Dựng lại đúng khung DOM trong <body> gốc (giữ nguyên mọi id/class/data-*
//      để querySelector của engine trúng).
//   2) Chèn <style> scoped gốc.
//   3) useEffect: chèn <script type="importmap"> (map `three`/`three/addons/`
//      → unpkg CDN, y hệt bản gốc) TRƯỚC, rồi chèn <script type="module"
//      src="/legacy/PS01-er.js"> — importmap phải có mặt trước khi module resolve
//      bare-specifier. Cleanup gỡ cả hai + canvas do engine append vào body.
//
// Asset ngoài (CDN three.module.js, OrbitControls, RoomEnvironment) giữ nguyên
// URL. POST 'api/attempts' (tương đối) đi qua proxy Next → Express.

const SCOPED_CSS = `
  /* Nền + khoá cuộn của trang game — gắn vào .ps01-root thay vì html,body để
     KHÔNG phá layout chung của Next. */
  html, body { overflow: hidden; }
  .ps01-root {
    position: fixed; inset: 0; z-index: 40; overflow: hidden;
    background: linear-gradient(180deg, #eef3ee 0%, #cdd9d2 100%);
    font-family: system-ui, -apple-system, "Segoe UI", sans-serif;
    touch-action: none; color: #1f2937;
  }
  /* Canvas WebGL do engine append vào <body> — ép phủ toàn màn hình như bản gốc. */
  body > canvas { display: block; touch-action: none; position: fixed; inset: 0; z-index: 40; }
  .ps01-root a { color: inherit; }

  .ps01-root #topbar {
    position: absolute; top: 12px; left: 50%; transform: translateX(-50%);
    z-index: 41; display: flex; gap: 10px; align-items: center;
    background: rgba(255,255,255,0.94); backdrop-filter: blur(8px);
    padding: 8px 14px; border-radius: 14px; font-size: 13px;
    box-shadow: 0 4px 14px rgba(0,0,0,0.12);
    border: 1px solid rgba(0,0,0,0.06);
  }
  .ps01-root #topbar .pill {
    background: linear-gradient(135deg, #dc2626, #991b1b); color: #fff;
    padding: 4px 10px; border-radius: 14px; font-weight: 700; font-size: 11px; letter-spacing: 0.5px;
  }
  .ps01-root #topbar .lvl-pill {
    background: linear-gradient(135deg, #fbbf24, #f59e0b); color: #3e2723;
    padding: 4px 10px; border-radius: 14px; font-weight: 700; font-size: 11px;
  }
  .ps01-root #topbar .timer {
    font-family: 'SF Mono', Consolas, monospace; font-weight: 700;
    background: rgba(0,0,0,0.06); padding: 4px 10px; border-radius: 10px;
    font-size: 12px;
  }

  .ps01-root a.back {
    position: absolute; top: 12px; left: 12px; z-index: 41;
    background: rgba(255,255,255,0.85); color: #1f2937; padding: 6px 12px; border-radius: 8px;
    text-decoration: none; font-size: 13px; box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  }

  /* ===== Clinical scenario clipboard (left) ===== */
  .ps01-root #scenario {
    position: absolute; top: 60px; left: 12px; z-index: 41;
    width: 290px; max-height: calc(100vh - 110px); overflow-y: auto;
    background:
      repeating-linear-gradient(180deg, #fffef5 0px, #fffef5 27px, #f0e8c8 28px),
      linear-gradient(180deg, #fffdf0, #f7eecc);
    border-radius: 4px 4px 8px 8px;
    box-shadow: 0 8px 28px rgba(0,0,0,0.22), inset 0 1px 0 rgba(255,255,255,0.7);
    border: 1px solid #c9b780; color: #2c1d0a;
    font-size: 12.5px; line-height: 1.5;
  }
  .ps01-root #scenario::before {
    content: ''; position: absolute; left: 50%; top: -14px; transform: translateX(-50%);
    width: 70px; height: 18px; background: linear-gradient(180deg, #b0b0b0, #777);
    border-radius: 4px; box-shadow: 0 2px 4px rgba(0,0,0,0.25);
  }
  .ps01-root #scenario-head {
    background: linear-gradient(180deg, #e1d29f, #ccb878);
    padding: 22px 14px 8px; border-radius: 4px 4px 0 0;
    font-weight: 800; font-size: 14px; text-align: center;
    border-bottom: 1px solid #b39c5e;
  }
  .ps01-root #scenario-body { padding: 10px 14px 12px; }
  .ps01-root #scenario-body .lbl { font-size: 10px; opacity: 0.65; text-transform: uppercase; letter-spacing: 0.6px; margin-top: 8px; font-weight: 700; }
  .ps01-root #scenario-body .pt-line { display: flex; justify-content: space-between; padding: 2px 0; font-family: 'SF Mono', Consolas, monospace; font-size: 11.5px; }
  .ps01-root #scenario-body .pt-line b { color: #7c2d12; }
  .ps01-root #scenario-body .symptom { background: rgba(220,38,38,0.08); padding: 6px 10px; border-radius: 6px; font-size: 11.5px; margin-top: 4px; border-left: 3px solid #dc2626; }
  .ps01-root #scenario-body .vital-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 4px; margin-top: 4px; font-family: 'SF Mono', monospace; font-size: 11px; }
  .ps01-root #scenario-body .vital-grid .v { background: rgba(0,0,0,0.04); padding: 4px 8px; border-radius: 5px; }
  .ps01-root #scenario-body .vital-grid .v.crit { background: rgba(220,38,38,0.15); color: #991b1b; font-weight: 700; }

  /* ===== Decision log (right) ===== */
  .ps01-root #log {
    position: absolute; top: 60px; right: 12px; z-index: 41;
    width: 330px; max-height: calc(100vh - 170px); overflow-y: auto;
    background: rgba(255,255,255,0.96);
    border-radius: 12px; padding: 14px 16px;
    box-shadow: 0 6px 18px rgba(0,0,0,0.18);
    border: 1px solid rgba(0,0,0,0.06);
  }
  .ps01-root #log h3 { margin: 0 0 8px; font-size: 13px; opacity: 0.7; letter-spacing: 0.4px; text-transform: uppercase; }

  /* Live vitals monitor */
  .ps01-root #vitals-monitor {
    background: linear-gradient(135deg, #0a0e14, #131a21);
    border-radius: 8px; padding: 10px 12px; margin-bottom: 10px;
    border: 1px solid #1f2937;
    font-family: 'SF Mono', Consolas, monospace;
    color: #22c55e;
  }
  .ps01-root #vitals-monitor .vrow { display: flex; justify-content: space-between; align-items: baseline; padding: 2px 0; font-size: 12px; }
  .ps01-root #vitals-monitor .vrow .vlabel { color: #6b7280; font-size: 10px; letter-spacing: 0.5px; }
  .ps01-root #vitals-monitor .vrow .vval { font-size: 18px; font-weight: 800; }
  .ps01-root #vitals-monitor .vrow.bp .vval { color: #ef4444; }
  .ps01-root #vitals-monitor .vrow.spo2 .vval { color: #f59e0b; }
  .ps01-root #vitals-monitor .vrow.hr .vval { color: #ef4444; }
  .ps01-root #vitals-monitor .vrow.rr .vval { color: #f59e0b; }
  .ps01-root #vitals-monitor.improving .vrow.bp .vval,
  .ps01-root #vitals-monitor.improving .vrow.spo2 .vval,
  .ps01-root #vitals-monitor.improving .vrow.hr .vval,
  .ps01-root #vitals-monitor.improving .vrow.rr .vval { color: #22c55e; }

  .ps01-root #timeline { font-size: 12.5px; line-height: 1.45; }
  .ps01-root #timeline .entry {
    padding: 8px 10px; border-radius: 8px; margin-bottom: 6px;
    border-left: 3px solid #94a3b8; background: #f3f4f6;
  }
  .ps01-root #timeline .entry.ok { border-left-color: #16a34a; background: #dcfce7; }
  .ps01-root #timeline .entry.warn { border-left-color: #f59e0b; background: #fef3c7; }
  .ps01-root #timeline .entry.bad { border-left-color: #dc2626; background: #fee2e2; }
  .ps01-root #timeline .entry .t { font-size: 10px; opacity: 0.6; font-family: 'SF Mono', monospace; }
  .ps01-root #timeline .entry .a { font-weight: 700; }
  .ps01-root #timeline .entry .f { font-size: 11.5px; opacity: 0.85; margin-top: 2px; }
  .ps01-root #timeline .entry .ref { font-size: 10px; opacity: 0.6; font-style: italic; margin-top: 4px; }
  .ps01-root #timeline .empty { color: #9ca3af; font-style: italic; font-size: 12px; text-align: center; padding: 20px 0; }

  /* ===== Bottom action buttons ===== */
  .ps01-root #actions {
    position: absolute; bottom: 18px; left: 50%; transform: translateX(-50%);
    z-index: 41; display: flex; gap: 8px; flex-wrap: wrap; justify-content: center;
    max-width: calc(100vw - 24px);
    background: rgba(255,255,255,0.95); backdrop-filter: blur(8px);
    padding: 10px 12px; border-radius: 16px;
    box-shadow: 0 6px 24px rgba(0,0,0,0.18); border: 1px solid rgba(0,0,0,0.06);
  }
  .ps01-root #actions .act {
    position: relative; overflow: hidden;
    padding: 10px 14px; font-size: 12.5px; font-weight: 700;
    border: none; border-radius: 10px; cursor: pointer;
    color: white; font-family: inherit;
    transition: transform .1s, filter .15s;
    user-select: none;
    min-width: 130px;
  }
  .ps01-root #actions .act .progress {
    position: absolute; left: 0; bottom: 0; height: 3px; width: 0;
    background: rgba(255,255,255,0.85); transition: width 0.05s linear;
  }
  .ps01-root #actions .act:disabled { opacity: 0.42; cursor: not-allowed; }
  .ps01-root #actions .act:not(:disabled):hover { filter: brightness(1.08); }
  .ps01-root #actions .act:not(:disabled):active { transform: translateY(1px) scale(0.99); }
  .ps01-root #actions .act.done { opacity: 0.5; }
  .ps01-root #actions .act.adr-im { background: linear-gradient(135deg, #dc2626, #991b1b); }
  .ps01-root #actions .act.adr-iv { background: linear-gradient(135deg, #b45309, #78350f); }
  .ps01-root #actions .act.o2 { background: linear-gradient(135deg, #0ea5e9, #0369a1); }
  .ps01-root #actions .act.fluid { background: linear-gradient(135deg, #6366f1, #4338ca); }
  .ps01-root #actions .act.diphen { background: linear-gradient(135deg, #8b5cf6, #6d28d9); }
  .ps01-root #actions .act.methylp { background: linear-gradient(135deg, #db2777, #9d174d); }
  .ps01-root #actions .act.salb { background: linear-gradient(135deg, #14b8a6, #0f766e); }
  .ps01-root #actions .act.repeat { background: linear-gradient(135deg, #f59e0b, #b45309); }
  .ps01-root #actions .submit-btn { background: linear-gradient(135deg, #10b981, #047857); color: #fff; padding: 10px 18px; border:none; border-radius:10px; font-weight:800; cursor:pointer; font-family: inherit; font-size: 13px; }
  .ps01-root #actions .submit-btn:disabled { opacity: 0.45; cursor: not-allowed; }

  /* ===== Hint chip ===== */
  .ps01-root #hint {
    position: absolute; bottom: 100px; left: 50%; transform: translateX(-50%);
    z-index: 41; background: rgba(0,0,0,0.85); color: white;
    padding: 8px 14px; border-radius: 18px; font-size: 12px;
    display: none;
  }
  .ps01-root #hint.shown { display: block; }

  /* ===== Toast ===== */
  .ps01-root #toast {
    position: absolute; top: 60%; left: 50%; transform: translateX(-50%);
    background: rgba(0,0,0,0.88); color: white; padding: 12px 22px;
    border-radius: 22px; font-size: 14px; z-index: 42; display: none;
    box-shadow: 0 6px 22px rgba(0,0,0,0.3);
  }
  .ps01-root #toast.ok { background: linear-gradient(135deg, #16a34a, #15803d); }
  .ps01-root #toast.err { background: linear-gradient(135deg, #dc2626, #b91c1c); }
  .ps01-root #toast.warn { background: linear-gradient(135deg, #f59e0b, #b45309); color: #1f2937; }

  /* ===== Result modal ===== */
  .ps01-root #result-modal {
    display: none;
    position: fixed; inset: 0; z-index: 50;
    background: rgba(15, 23, 42, 0.65); backdrop-filter: blur(4px);
    align-items: center; justify-content: center;
  }
  .ps01-root #result-modal.open { display: flex; }
  .ps01-root #result-card {
    background: white; border-radius: 18px; padding: 26px 30px;
    max-width: 560px; width: 92%;
    box-shadow: 0 30px 80px rgba(0,0,0,0.4);
    max-height: 92vh; overflow-y: auto;
    color: #1f2937;
  }
  .ps01-root #result-card h2 { margin: 0 0 6px; font-size: 22px; }
  .ps01-root #result-card .stars { font-size: 36px; text-align: center; margin: 10px 0 4px; }
  .ps01-root #result-card .score { font-size: 32px; font-weight: 800; text-align: center;
    background: linear-gradient(135deg, #10b981, #047857);
    -webkit-background-clip: text; background-clip: text; color: transparent; }
  .ps01-root #result-card.poor .score { background: linear-gradient(135deg, #ef4444, #b91c1c); -webkit-background-clip: text; background-clip: text; }
  .ps01-root #result-card .row { display: flex; justify-content: space-between; padding: 8px 12px; border-radius: 8px; margin: 4px 0; background: #f3f4f6; font-size: 13px; }
  .ps01-root #result-card .row.true { background: #dcfce7; }
  .ps01-root #result-card .row.bad  { background: #fee2e2; }
  .ps01-root #result-card .refs { background: #eff6ff; padding: 10px 12px; border-radius: 8px; font-size: 11.5px; margin-top: 10px; line-height: 1.5; color: #1e3a8a; }
  .ps01-root #result-card .refs b { display: block; margin-bottom: 4px; font-size: 12px; }
  .ps01-root #result-card .actions-modal { display: flex; gap: 10px; margin-top: 16px; }
  .ps01-root #result-card button { flex: 1; padding: 12px; border: none; border-radius: 10px; font-weight: 700; cursor: pointer; font-family: inherit; font-size: 14px; }
  .ps01-root #result-card .again { background: rgba(0,0,0,0.06); }
  .ps01-root #result-card .home { background: linear-gradient(135deg, #6366f1, #4338ca); color: white; }

  /* ===== Code Blue alarm overlay ===== */
  .ps01-root #alarm {
    position: absolute; inset: 0; pointer-events: none;
    box-shadow: inset 0 0 0 8px rgba(220,38,38,0.0);
    z-index: 40; transition: box-shadow 0.3s;
  }
  .ps01-root #alarm.on { animation: ps01-alarmPulse 1.4s ease-in-out infinite; }
  @keyframes ps01-alarmPulse {
    0%, 100% { box-shadow: inset 0 0 0 8px rgba(220,38,38,0.0); }
    50%      { box-shadow: inset 0 0 80px rgba(220,38,38,0.4); }
  }
`;

export default function PS01ErPage() {
  useEffect(() => {
    // 1) Importmap PHẢI có mặt trước khi module resolve bare-specifier `three`.
    const importmap = document.createElement('script');
    importmap.type = 'importmap';
    importmap.setAttribute('data-ps01', '1');
    importmap.textContent = JSON.stringify({
      imports: {
        three: '/vendor/three-0.160/build/three.module.js',
        'three/addons/': '/vendor/three-0.160/examples/jsm/',
      },
    });
    document.head.appendChild(importmap);

    // 2) Module engine — nạp SAU khi importmap + DOM skeleton đã sẵn sàng.
    //    ?ts để re-execute khi client-navigate quay lại trang.
    const s = document.createElement('script');
    s.type = 'module';
    s.setAttribute('data-ps01', '1');
    s.src = `/legacy/PS01-er.js?ts=${Date.now()}`;
    document.body.appendChild(s);

    return () => {
      importmap.remove();
      s.remove();
      // Engine append <canvas> vào <body> — dọn để không tồn dư khi rời trang.
      document.querySelectorAll('body > canvas').forEach((c) => c.remove());
    };
  }, []);

  return (
    <div className="ps01-root">
      <style dangerouslySetInnerHTML={{ __html: SCOPED_CSS }} />

      <a className="back" href="index.html">← Trang chủ</a>

      <div id="topbar">
        <span className="pill">PS01</span>
        <span>Cấp cứu phản vệ</span>
        <span className="lvl-pill">Năm 4–5 · Dược lâm sàng</span>
        <span className="timer" id="timer">00:00</span>
      </div>

      {/* Clinical scenario clipboard */}
      <div id="scenario">
        <div id="scenario-head">🚑 Tình huống ER</div>
        <div id="scenario-body">
          <div><b>Bệnh nhân:</b> Nữ, 28 tuổi, 55 kg</div>
          <div><b>Tiền sử:</b> Khoẻ mạnh, không dị ứng đã biết</div>

          <div className="lbl">Bệnh sử ngắn</div>
          <div style={{ fontSize: '11.5px' }}>
            Vào ER lúc 10:30, cách đây ~8 phút BN uống <b>Amoxicillin 500 mg</b>
            {' '}(lần đầu, do nha sĩ kê). 5 phút sau xuất hiện ngứa toàn thân,
            sưng môi &amp; lưỡi, khó thở tăng dần.
          </div>

          <div className="lbl">Triệu chứng</div>
          <div className="symptom">
            • Phù mạch môi + lưỡi<br />
            • Khò khè rít hai phổi, thở gắng sức<br />
            • Da nổi mề đay toàn thân, đỏ rực<br />
            • Lơ mơ, vã mồ hôi<br />
            • <b>Đáp ứng phản vệ độ III</b> (Bộ Y Tế)
          </div>

          <div className="lbl">Sinh hiệu hiện tại</div>
          <div className="vital-grid">
            <div className="v crit">HA: <b id="s-bp">80/50</b></div>
            <div className="v crit">SpO₂: <b id="s-spo2">88%</b></div>
            <div className="v crit">Mạch: <b id="s-hr">130</b></div>
            <div className="v crit">NT: <b id="s-rr">28</b></div>
          </div>

          <div className="lbl">Nhiệm vụ</div>
          <div style={{ fontSize: '11.5px' }}>
            Là DS lâm sàng ER, hãy <b>ra y lệnh cấp cứu</b> đúng thứ tự
            theo phác đồ phản vệ. Quyết định của bạn sẽ được ghi lại và
            chấm điểm theo guideline.
          </div>

          <div className="lbl">Mục tiêu</div>
          <div style={{ fontSize: '11.5px' }}>
            ABCDE → Adrenalin → O₂ → Truyền dịch → Theo dõi → Hỗ trợ.
          </div>
        </div>
      </div>

      {/* Decision log + vitals monitor */}
      <div id="log">
        <h3>📊 Monitor &amp; Decision log</h3>

        <div id="vitals-monitor">
          <div className="vrow bp"><span className="vlabel">NIBP mmHg</span><span className="vval" id="m-bp">80/50</span></div>
          <div className="vrow spo2"><span className="vlabel">SpO₂ %</span><span className="vval" id="m-spo2">88</span></div>
          <div className="vrow hr"><span className="vlabel">HR /phút</span><span className="vval" id="m-hr">130</span></div>
          <div className="vrow rr"><span className="vlabel">RR /phút</span><span className="vval" id="m-rr">28</span></div>
        </div>

        <div id="timeline">
          <div className="empty">Chưa có y lệnh nào — bắt đầu xử trí…</div>
        </div>
      </div>

      {/* Action buttons */}
      <div id="actions">
        <button className="act adr-im" data-act="adr-im" title="Giữ 1.5s để tiêm"><span>💉 Adrenalin <b>0.5 mg IM đùi</b></span><span className="progress"></span></button>
        <button className="act adr-iv" data-act="adr-iv" title="Giữ 1.5s để tiêm"><span>⚠️ Adrenalin IV bolus</span><span className="progress"></span></button>
        <button className="act o2" data-act="o2" title="Giữ 1.5s để áp mask"><span>🫁 O₂ mask 10 L/phút</span><span className="progress"></span></button>
        <button className="act fluid" data-act="fluid" title="Giữ 1.5s để mở dây"><span>💧 NaCl 0.9% 500 mL nhanh</span><span className="progress"></span></button>
        <button className="act diphen" data-act="diphen" title="Giữ 1.5s"><span>💊 Diphenhydramin 50 mg IM</span><span className="progress"></span></button>
        <button className="act methylp" data-act="methylp" title="Giữ 1.5s"><span>💊 Methylprednisolon 80 mg IV</span><span className="progress"></span></button>
        <button className="act salb" data-act="salb" title="Giữ 1.5s"><span>🌬️ Salbutamol khí dung</span><span className="progress"></span></button>
        <button className="act repeat" data-act="repeat" title="Giữ 1.5s"><span>🔁 Lặp Adrenalin IM (sau 5&apos;)</span><span className="progress"></span></button>
        <button className="submit-btn" id="submit-btn" disabled>✅ Nộp bài</button>
      </div>

      <div id="hint">Giữ nút ~1.5s để xác nhận y lệnh (mô phỏng thao tác tiêm)</div>
      <div id="toast"></div>
      <div id="alarm" className="on"></div>

      {/* Result modal */}
      <div id="result-modal">
        <div id="result-card">
          <h2 id="r-title">Kết quả xử trí phản vệ</h2>
          <div className="stars" id="r-stars">⭐⭐⭐</div>
          <div className="score" id="r-score">100/100</div>
          <div id="r-rows" style={{ marginTop: '14px' }}></div>
          <div className="refs" id="r-refs"></div>
          <div className="actions-modal">
            <button className="again" id="r-again">Làm lại</button>
            <button className="home" id="r-home">Về trang chủ</button>
          </div>
        </div>
      </div>
    </div>
  );
}
