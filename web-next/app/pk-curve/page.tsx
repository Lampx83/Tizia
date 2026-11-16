'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

// Đường cong Dược động học (PK/TDM) — mô hình 1 ngăn, IV bolus, đa liều.
// Port từ public/pk-curve.html: giữ nguyên canvas chart + 3 slider tham số +
// readout Cmax/Cmin/thời điểm ổn định + verdict + quiz tự kiểm (đạt cửa sổ
// điều trị). Trang gốc có thương hiệu riêng (nền gradient hồng, accent #ec4899)
// → dùng scoped CSS lồng trong .pk-scope, không đụng theme tối chung.

// Tham số mô phỏng dược động học (mô hình toán học, KHÔNG phải content DB):
const Vd = 40; // L (thể tích phân bố, cố định)
const WIN_LO = 10, WIN_HI = 20, TOXIC = 30; // cửa sổ điều trị & ngưỡng độc (mg/L)

// Kích thước canvas (responsive: scale theo CSS, toạ độ nội bộ cố định).
const CW = 760, CH = 420;
const M = { l: 58, r: 26, t: 24, b: 46 };

// Gửi kết quả tự kiểm về backend (giống submitAttempt trong js/api.js).
// Guest (401) → im lặng degrade, không cắt trải nghiệm.
async function submitAttempt(payload: Record<string, unknown>) {
  try {
    const res = await fetch('/api/attempts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'same-origin',
      body: JSON.stringify(payload),
    });
    if (res.status === 401 || !res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

export default function PkCurve() {
  const cvRef = useRef<HTMLCanvasElement>(null);

  const [dose, setDose] = useState(300);
  const [interval, setIntervalH] = useState(12);
  const [thalf, setThalf] = useState(8);
  const [toast, setToast] = useState<string | null>(null);

  // Trạng thái động cho vòng lặp vẽ (dùng ref để không re-render mỗi frame).
  const revealRef = useRef(0);
  const revealStartRef = useRef(0);
  const hoverTRef = useRef<number | null>(null);
  const solvedRef = useRef(false);
  const paramsRef = useRef({ dose, interval, thalf });
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // === PK model (1-compartment, IV bolus, multiple dosing) ===
  const k = useCallback((th: number) => Math.LN2 / th, []);
  const perDose = useCallback((d: number) => d / Vd, []);
  const tmax = useCallback((th: number, itv: number) => Math.min(120, Math.max(5 * th, 4 * itv, 36)), []);
  const conc = useCallback((t: number, d: number, itv: number, th: number) => {
    const kk = k(th), c0 = perDose(d); let c = 0;
    for (let td = 0; td <= t + 1e-9; td += itv) c += c0 * Math.exp(-kk * (t - td));
    return c;
  }, [k, perDose]);
  const cmaxSS = useCallback((d: number, itv: number, th: number) => perDose(d) / (1 - Math.exp(-k(th) * itv)), [k, perDose]);
  const cminSS = useCallback((d: number, itv: number, th: number) => cmaxSS(d, itv, th) * Math.exp(-k(th) * itv), [k, cmaxSS]);
  const tSS = useCallback((th: number) => 5 * th, []);

  // Readout tính từ state hiện tại.
  const cMx = cmaxSS(dose, interval, thalf);
  const cMn = cminSS(dose, interval, thalf);
  const inWin = cMn >= WIN_LO && cMn <= WIN_HI && cMx <= TOXIC;

  let verdictText = '⚠️ Chưa tối ưu';
  if (inWin) verdictText = '✓ Phác đồ hợp lý';
  else if (cMx > TOXIC) verdictText = '⚠️ Đỉnh vượt ngưỡng độc — giảm liều';
  else if (cMn < WIN_LO) verdictText = '⚠️ Đáy dưới ngưỡng — tăng liều / rút ngắn khoảng cách';
  else if (cMn > WIN_HI) verdictText = '⚠️ Đáy quá cao — giảm liều / giãn khoảng cách';

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 3500);
  }, []);

  // Đồng bộ tham số vào ref + reset reveal animation khi slider đổi.
  useEffect(() => {
    paramsRef.current = { dose, interval, thalf };
    revealRef.current = 0;
    revealStartRef.current = (typeof performance !== 'undefined' ? performance.now() : Date.now());
  }, [dose, interval, thalf]);

  // Nộp kết quả khi đạt phác đồ hợp lý (một lần cho tới khi thoát khỏi cửa sổ).
  useEffect(() => {
    if (inWin) {
      if (!solvedRef.current) {
        solvedRef.current = true;
        showToast('🎯 Tuyệt! Đáy trong cửa sổ điều trị, đỉnh dưới ngưỡng độc.');
        submitAttempt({ version: 'pk-curve', score: 100, correct: 1, total: 1, durationMs: 0, details: { dose, interval, thalf, cMx, cMn } });
      }
    } else {
      solvedRef.current = false;
    }
  }, [inWin, dose, interval, thalf, cMx, cMn, showToast]);

  // === vòng lặp vẽ ===
  useEffect(() => {
    const cv = cvRef.current;
    if (!cv) return;
    const c = cv.getContext('2d');
    if (!c) return;
    let raf = 0;

    const plotBox = () => ({ x0: M.l, y0: M.t, x1: CW - M.r, y1: CH - M.b });
    const draw = () => {
      const { dose: d, interval: itv, thalf: th } = paramsRef.current;
      const b = plotBox();
      const tm = tmax(th, itv);
      const ym = Math.max(TOXIC + 8, cmaxSS(d, itv, th) * 1.12);
      const X = (t: number) => b.x0 + (t / tm) * (b.x1 - b.x0);
      const Y = (cc: number) => b.y1 - (cc / ym) * (b.y1 - b.y0);

      c.clearRect(0, 0, CW, CH);
      c.fillStyle = '#0f172a'; c.fillRect(0, 0, CW, CH);

      // cửa sổ điều trị
      c.fillStyle = 'rgba(16,185,129,0.13)';
      c.fillRect(b.x0, Y(WIN_HI), b.x1 - b.x0, Y(WIN_LO) - Y(WIN_HI));
      c.fillStyle = 'rgba(16,185,129,0.85)'; c.font = '11px Inter'; c.textAlign = 'left';
      c.fillText('Cửa sổ điều trị', b.x0 + 8, Y(WIN_HI) + 14);

      // ngưỡng độc
      c.strokeStyle = 'rgba(239,68,68,0.8)'; c.lineWidth = 1.5; c.setLineDash([6, 4]);
      c.beginPath(); c.moveTo(b.x0, Y(TOXIC)); c.lineTo(b.x1, Y(TOXIC)); c.stroke(); c.setLineDash([]);
      c.fillStyle = '#f87171'; c.fillText('Ngưỡng độc (' + TOXIC + ')', b.x0 + 8, Y(TOXIC) - 5);

      // trục
      c.strokeStyle = 'rgba(255,255,255,0.25)'; c.lineWidth = 1.5;
      c.beginPath(); c.moveTo(b.x0, b.y0); c.lineTo(b.x0, b.y1); c.lineTo(b.x1, b.y1); c.stroke();
      // vạch trục y
      c.fillStyle = 'rgba(255,255,255,0.55)'; c.font = '10px Inter'; c.textAlign = 'right';
      for (let cc = 0; cc <= ym; cc += 10) {
        const y = Y(cc); c.fillText(String(cc), b.x0 - 6, y + 3);
        c.strokeStyle = 'rgba(255,255,255,0.06)'; c.beginPath(); c.moveTo(b.x0, y); c.lineTo(b.x1, y); c.stroke();
      }
      c.save(); c.translate(16, (b.y0 + b.y1) / 2); c.rotate(-Math.PI / 2);
      c.textAlign = 'center'; c.fillStyle = 'rgba(255,255,255,0.7)'; c.font = '12px Inter';
      c.fillText('Nồng độ thuốc (mg/L)', 0, 0); c.restore();
      // vạch trục x
      c.textAlign = 'center'; c.fillStyle = 'rgba(255,255,255,0.55)'; c.font = '10px Inter';
      const xStep = tm <= 48 ? 12 : 24;
      for (let t = 0; t <= tm; t += xStep) c.fillText(t + 'h', X(t), b.y1 + 16);
      c.fillStyle = 'rgba(255,255,255,0.7)'; c.font = '12px Inter';
      c.fillText('Thời gian (giờ)', (b.x0 + b.x1) / 2, b.y1 + 34);

      // đánh dấu liều
      for (let td = 0; td <= tm; td += itv) {
        c.strokeStyle = 'rgba(236,72,153,0.45)'; c.lineWidth = 1;
        c.beginPath(); c.moveTo(X(td), b.y1); c.lineTo(X(td), b.y1 - 8); c.stroke();
        c.fillStyle = 'rgba(236,72,153,0.8)'; c.font = '12px Inter';
        c.fillText('💊', X(td), b.y1 - 12);
      }

      // đường cong nồng độ (reveal động)
      const reveal = revealRef.current;
      const N = 360, tEnd = tm * reveal;
      c.strokeStyle = '#ec4899'; c.lineWidth = 2.5; c.beginPath();
      for (let i = 0; i <= N; i++) {
        const t = (i / N) * tEnd; const cc = conc(t, d, itv, th);
        const px = X(t), py = Y(cc);
        if (i === 0) c.moveTo(px, py); else c.lineTo(px, py);
      }
      c.stroke();
      // tô dưới đường cong
      c.lineTo(X(tEnd), b.y1); c.lineTo(b.x0, b.y1); c.closePath();
      c.fillStyle = 'rgba(236,72,153,0.10)'; c.fill();

      // đường dẫn steady-state (phần bên phải)
      if (reveal >= 0.99) {
        const cMxL = cmaxSS(d, itv, th), cMnL = cminSS(d, itv, th);
        c.setLineDash([3, 3]); c.lineWidth = 1;
        c.strokeStyle = 'rgba(248,113,113,0.6)'; c.beginPath(); c.moveTo(b.x1 - 120, Y(cMxL)); c.lineTo(b.x1, Y(cMxL)); c.stroke();
        c.strokeStyle = 'rgba(251,191,36,0.6)'; c.beginPath(); c.moveTo(b.x1 - 120, Y(cMnL)); c.lineTo(b.x1, Y(cMnL)); c.stroke();
        c.setLineDash([]);
      }

      // hover readout
      const hoverT = hoverTRef.current;
      if (hoverT != null) {
        const cc = conc(hoverT, d, itv, th);
        c.strokeStyle = 'rgba(255,255,255,0.35)'; c.lineWidth = 1; c.setLineDash([3, 3]);
        c.beginPath(); c.moveTo(X(hoverT), b.y0); c.lineTo(X(hoverT), b.y1); c.stroke(); c.setLineDash([]);
        c.fillStyle = '#fff'; c.beginPath(); c.arc(X(hoverT), Y(cc), 4, 0, 7); c.fill();
        c.font = 'bold 12px Inter'; c.textAlign = 'left';
        c.fillText(`t=${hoverT.toFixed(1)}h · C=${cc.toFixed(1)} mg/L`, X(hoverT) + 8, Y(cc) - 8);
      }
    };

    const tick = () => {
      const now = (typeof performance !== 'undefined' ? performance.now() : Date.now());
      if (revealRef.current < 1) revealRef.current = Math.min(1, (now - revealStartRef.current) / 900);
      draw();
      raf = requestAnimationFrame(tick);
    };
    revealStartRef.current = (typeof performance !== 'undefined' ? performance.now() : Date.now());
    tick();
    return () => cancelAnimationFrame(raf);
  }, [conc, cmaxSS, cminSS, tmax]);

  // Hover trên canvas → tính t theo toạ độ (bù scale CSS).
  const onMove = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    const cv = cvRef.current;
    if (!cv) return;
    const rect = cv.getBoundingClientRect();
    const scaleX = CW / rect.width;
    const mx = (e.clientX - rect.left) * scaleX;
    const b = { x0: M.l, x1: CW - M.r };
    if (mx < b.x0 || mx > b.x1) { hoverTRef.current = null; return; }
    const tm = tmax(paramsRef.current.thalf, paramsRef.current.interval);
    hoverTRef.current = ((mx - b.x0) / (b.x1 - b.x0)) * tm;
  }, [tmax]);
  const onLeave = useCallback(() => { hoverTRef.current = null; }, []);

  return (
    <div className="pk-scope">
      <style>{scopedCss}</style>

      <div className="topbar">
        <a href="/space?b=clinpharm&domain=pharmacy">← Dược lý – Lâm sàng</a>
        <span className="title">📈 Đường cong Dược động học (PK/TDM)</span>
        <span className="spacer" />
        <span className={`verdict ${inWin ? 'ok' : 'bad'}`}>{verdictText}</span>
      </div>

      <div className="hint">
        🎯 Mục tiêu: chỉnh để nồng độ ĐÁY ổn định nằm trong cửa sổ điều trị (10–20 mg/L)
        mà ĐỈNH không vượt ngưỡng độc (30).
      </div>

      <div className="wrap">
        <canvas
          ref={cvRef}
          width={CW}
          height={CH}
          onMouseMove={onMove}
          onMouseLeave={onLeave}
        />

        <div className="controls">
          <div className="ctrl">
            <label>Liều mỗi lần <b>{dose} mg</b></label>
            <input type="range" min={100} max={800} step={50} value={dose} onChange={(e) => setDose(+e.target.value)} />
          </div>
          <div className="ctrl">
            <label>Khoảng cách liều <b>{interval} h</b></label>
            <input type="range" min={4} max={24} step={2} value={interval} onChange={(e) => setIntervalH(+e.target.value)} />
          </div>
          <div className="ctrl">
            <label>Thời gian bán thải t½ <b>{thalf} h</b></label>
            <input type="range" min={2} max={24} step={1} value={thalf} onChange={(e) => setThalf(+e.target.value)} />
          </div>
          <div className="readout">
            <div className="r cmax"><div className="v">{cMx.toFixed(1)}</div><div className="k">Cmax đỉnh</div></div>
            <div className="r cmin"><div className="v">{cMn.toFixed(1)}</div><div className="k">Cmin đáy</div></div>
            <div className="r ss"><div className="v">{Math.round(tSS(thalf))}h</div><div className="k">Đạt ổn định</div></div>
          </div>
        </div>
      </div>

      {toast && <div className="toast">{toast}</div>}
    </div>
  );
}

const scopedCss = `
.pk-scope { --bg-1:#0f172a; --bg-2:#1e293b; --accent:#ec4899; --ok:#10b981; --err:#ef4444; --warn:#fbbf24;
  margin:-1rem calc(50% - 50vw); padding:0 0 40px; min-height:100vh; color:#fff;
  background:radial-gradient(ellipse 80% 50% at 50% 0%, rgba(236,72,153,.16), transparent), linear-gradient(180deg,var(--bg-1),var(--bg-2)); }
.pk-scope * { box-sizing:border-box; }
.pk-scope .topbar { position:sticky; top:0; z-index:10; display:flex; gap:14px; align-items:center; padding:10px 16px;
  background:rgba(0,0,0,.4); backdrop-filter:blur(10px); border-bottom:1px solid rgba(255,255,255,.08); font-size:13px; flex-wrap:wrap; }
.pk-scope .topbar a { color:#fff; opacity:.75; text-decoration:none; } .pk-scope .topbar a:hover { opacity:1; }
.pk-scope .topbar .title { font-weight:700; } .pk-scope .topbar .spacer { flex:1; }
.pk-scope .verdict { padding:5px 12px; border-radius:14px; font-weight:700; font-size:12.5px; background:#334155; }
.pk-scope .verdict.ok { background:var(--ok); color:#04241a; } .pk-scope .verdict.bad { background:#7f1d1d; color:#fecaca; }
.pk-scope .hint { font-size:13px; opacity:.85; text-align:center; max-width:900px; margin:14px auto 0; padding:0 16px; }
.pk-scope .wrap { max-width:900px; margin:16px auto 0; padding:0 16px; }
.pk-scope canvas { display:block; width:100%; height:auto; background:#0f172a; border:1px solid rgba(255,255,255,.1); border-radius:12px; touch-action:none; }
.pk-scope .controls { margin-top:16px; background:rgba(2,6,23,.82); border:1px solid rgba(255,255,255,.1); border-radius:14px;
  padding:14px 18px; display:flex; gap:22px; align-items:flex-end; flex-wrap:wrap; justify-content:center; }
.pk-scope .ctrl { display:flex; flex-direction:column; gap:4px; min-width:170px; flex:1; }
.pk-scope .ctrl label { font-size:12px; opacity:.85; display:flex; justify-content:space-between; }
.pk-scope .ctrl label b { color:var(--accent); }
.pk-scope .ctrl input[type=range] { width:100%; accent-color:var(--accent); }
.pk-scope .readout { display:flex; gap:16px; align-items:center; padding:8px 14px; background:rgba(255,255,255,.05); border:1px solid rgba(255,255,255,.12); border-radius:12px; }
.pk-scope .readout .r { text-align:center; } .pk-scope .readout .r .v { font-size:18px; font-weight:800; } .pk-scope .readout .r .k { font-size:10.5px; opacity:.7; text-transform:uppercase; letter-spacing:.5px; }
.pk-scope .readout .r.cmax .v { color:#f87171; } .pk-scope .readout .r.cmin .v { color:#fbbf24; } .pk-scope .readout .r.ss .v { color:#a5b4fc; }
.pk-scope .toast { position:fixed; top:70px; left:50%; transform:translateX(-50%); background:rgba(0,0,0,.85); color:#fff; padding:10px 18px;
  border-radius:10px; font-size:14px; z-index:20; border-left:3px solid var(--accent); }
@media (max-width:720px){ .pk-scope .topbar{font-size:11px;} .pk-scope .ctrl{min-width:130px;} .pk-scope .readout{gap:10px;padding:6px 10px;} .pk-scope .readout .r .v{font-size:15px;} }
`;
