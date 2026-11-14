'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

// Đường chuẩn UV-Vis (Beer–Lambert, hồi quy tuyến tính bình phương tối thiểu).
// Port từ public/calibration-curve.html — giữ nguyên tương tác canvas + quiz tự kiểm
// + text tiếng Việt. Trang gốc có thương hiệu riêng (nền gradient xanh, accent
// #0ea5e9) → dùng scoped CSS lồng trong .cal-scope, không đụng theme tối chung.

// Dung dịch chuẩn (đã đo độ hấp thụ A) — tham số mô phỏng (không phải content DB),
// có nhiễu nhẹ để R²<1 cho thực tế. Đây là dữ liệu mô phỏng bài toán vật lý/hoá,
// không phải catalog nội dung nên giữ trong client như bản gốc.
const STD = [
  { C: 2, A: 0.16 },
  { C: 4, A: 0.33 },
  { C: 6, A: 0.47 },
  { C: 8, A: 0.65 },
  { C: 10, A: 0.79 },
];

function regression(pts: { C: number; A: number }[]) {
  const n = pts.length;
  const mx = pts.reduce((s, p) => s + p.C, 0) / n;
  const my = pts.reduce((s, p) => s + p.A, 0) / n;
  let sxx = 0, sxy = 0, syy = 0;
  for (const p of pts) {
    const dx = p.C - mx, dy = p.A - my;
    sxx += dx * dx; sxy += dx * dy; syy += dy * dy;
  }
  const a = sxy / sxx, b = my - a * mx, r2 = (sxy * sxy) / (sxx * syy);
  return { a, b, r2 };
}

const FIT = regression(STD);
const Cmax = 12, Amax = 1.0;
const CW = 440, CH = 360;
const M = { l: 50, r: 18, t: 18, b: 42 };

function fmt(n: number, d = 2) {
  return (Math.round(n * Math.pow(10, d)) / Math.pow(10, d)).toFixed(d);
}
function concFromA(A: number) {
  return (A - FIT.b) / FIT.a;
}

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

export default function CalibrationCurve() {
  const cvRef = useRef<HTMLCanvasElement>(null);
  const qInRef = useRef<HTMLInputElement>(null);

  const [built, setBuilt] = useState(false);
  const [sampleA, setSampleA] = useState(0.45);
  const [score, setScore] = useState(0);

  // Câu tự kiểm hiện tại (A ngẫu nhiên) + phản hồi.
  const [qA, setQA] = useState<number | null>(null);
  const [qInput, setQInput] = useState('');
  const [fb, setFb] = useState<{ ok: boolean; html: string } | null>(null);

  const X = useCallback((C: number) => M.l + (C / Cmax) * (CW - M.l - M.r), []);
  const Y = useCallback((A: number) => (CH - M.b) - (A / Amax) * (CH - M.b - M.t), []);

  const draw = useCallback(() => {
    const cv = cvRef.current;
    if (!cv) return;
    const c = cv.getContext('2d');
    if (!c) return;
    c.clearRect(0, 0, CW, CH);
    // grid + axes
    c.strokeStyle = 'rgba(255,255,255,0.08)';
    c.fillStyle = 'rgba(255,255,255,0.55)';
    c.font = '10px Inter';
    c.lineWidth = 1;
    c.textAlign = 'right'; c.textBaseline = 'middle';
    for (let A = 0; A <= Amax + 1e-9; A += 0.2) {
      const y = Y(A);
      c.beginPath(); c.moveTo(M.l, y); c.lineTo(CW - M.r, y); c.stroke();
      c.fillText(A.toFixed(1), M.l - 6, y);
    }
    c.textAlign = 'center'; c.textBaseline = 'top';
    for (let C = 0; C <= Cmax; C += 2) {
      const x = X(C);
      c.fillText(String(C), x, CH - M.b + 6);
    }
    c.strokeStyle = 'rgba(255,255,255,0.35)'; c.lineWidth = 1.5;
    c.beginPath(); c.moveTo(M.l, M.t); c.lineTo(M.l, CH - M.b); c.lineTo(CW - M.r, CH - M.b); c.stroke();
    c.fillStyle = 'rgba(255,255,255,0.7)'; c.font = '11px Inter';
    c.fillText('Nồng độ C (mg/L)', (M.l + CW - M.r) / 2, CH - 16);
    c.save(); c.translate(14, (M.t + CH - M.b) / 2); c.rotate(-Math.PI / 2);
    c.fillText('Độ hấp thụ A', 0, 0); c.restore();
    // regression line
    if (built) {
      c.strokeStyle = '#0ea5e9'; c.lineWidth = 2.5; c.beginPath();
      c.moveTo(X(0), Y(FIT.b)); c.lineTo(X(Cmax), Y(FIT.a * Cmax + FIT.b)); c.stroke();
    }
    // standard points
    c.fillStyle = '#fbbf24';
    for (const s of STD) { c.beginPath(); c.arc(X(s.C), Y(s.A), 5, 0, 7); c.fill(); }
    // sample projection
    if (built) {
      const C = concFromA(sampleA);
      c.strokeStyle = 'rgba(16,185,129,0.8)'; c.lineWidth = 1.5; c.setLineDash([4, 3]);
      c.beginPath(); c.moveTo(M.l, Y(sampleA)); c.lineTo(X(C), Y(sampleA)); c.lineTo(X(C), CH - M.b); c.stroke();
      c.setLineDash([]);
      c.fillStyle = '#34d399'; c.beginPath(); c.arc(X(C), Y(sampleA), 5, 0, 7); c.fill();
      c.font = 'bold 11px Inter'; c.textAlign = 'left';
      c.fillText(`mẫu: A=${fmt(sampleA)} → C=${fmt(C, 1)}`, X(C) + 6, Y(sampleA) - 8);
    }
  }, [built, sampleA, X, Y]);

  useEffect(() => { draw(); }, [draw]);

  // ?auto → tự dựng đường chuẩn (giữ hành vi bản gốc, dùng cho auto-verify).
  useEffect(() => {
    if (new URLSearchParams(window.location.search).has('auto')) {
      const t = setTimeout(() => setBuilt(true), 400);
      return () => clearTimeout(t);
    }
  }, []);

  const newQ = useCallback(() => {
    const v = Math.round((0.1 + Math.random() * 0.8) * 100) / 100;
    setQA(v);
    setQInput('');
    setFb(null);
    requestAnimationFrame(() => qInRef.current?.focus());
  }, []);

  const checkQ = useCallback(() => {
    let cur = qA;
    if (cur == null) { cur = Math.round((0.1 + Math.random() * 0.8) * 100) / 100; setQA(cur); }
    const want = concFromA(cur);
    const v = parseFloat(qInput);
    if (isNaN(v)) { setFb({ ok: false, html: 'Nhập C (mg/L).' }); return; }
    const ok = Math.abs(v - want) <= Math.max(0.3, Math.abs(want) * 0.05);
    if (ok) {
      const next = score + 1;
      setScore(next);
      setFb({ ok: true, html: `✓ Đúng! C=(A−b)/a=${fmt(want, 1)} mg/L  +1` });
      submitAttempt({ version: 'calibration-curve', score: next, correct: next, total: next, durationMs: 0, details: {} });
    } else {
      setFb({ ok: false, html: `✗ Chưa đúng. C=(A−b)/a = (${fmt(cur)}−${fmt(FIT.b, 3)})/${fmt(FIT.a, 3)} = <b>${fmt(want, 1)}</b> mg/L.` });
    }
  }, [qA, qInput, score]);

  const qText = qA == null
    ? 'Tự kiểm: tính C từ A của mẫu (dùng phương trình đường chuẩn).'
    : `Mẫu có <b>A = ${fmt(qA)}</b>. Tính nồng độ C (mg/L)?`;

  return (
    <div className="cal-scope">
      <style>{scopedCss}</style>

      <div className="topbar">
        <a href="/space?b=lab_qc&domain=pharmacy">← PTN Kiểm nghiệm</a>
        <span className="title">📈 Đường chuẩn UV-Vis (định lượng)</span>
        <span className="spacer" />
        {score > 0 && <span>🎯 <span className="score">{score}</span></span>}
      </div>

      <div className="wrap">
        <div className="left">
          <canvas ref={cvRef} width={CW} height={CH} />
        </div>
        <div className="right">
          <div className="card">
            <h3 style={{ margin: '0 0 8px', fontSize: 15 }}>Dung dịch chuẩn (đã đo độ hấp thụ A)</h3>
            <table>
              <thead><tr><th>C (mg/L)</th><th>Độ hấp thụ A</th></tr></thead>
              <tbody>
                {STD.map((s, i) => (
                  <tr key={i}><td>{s.C}</td><td>{s.A.toFixed(2)}</td></tr>
                ))}
              </tbody>
            </table>
            <button
              className="btn"
              style={{ marginTop: 10 }}
              disabled={built}
              onClick={() => setBuilt(true)}
            >
              📈 Dựng đường chuẩn (hồi quy)
            </button>
            {built && (
              <div
                className="eq"
                dangerouslySetInnerHTML={{
                  __html: `A = <b>${fmt(FIT.a, 3)}</b>·C + <b>${fmt(FIT.b, 3)}</b> &nbsp; <small>R² = ${fmt(FIT.r2, 4)}</small>`,
                }}
              />
            )}
          </div>

          {built && (
            <div className="card">
              <h3 style={{ margin: '0 0 6px', fontSize: 15 }}>Mẫu thử (chưa biết nồng độ)</h3>
              <div className="ctrl">
                <span>A đo được</span>
                <input
                  type="range" min={0.05} max={0.95} step={0.01} value={sampleA}
                  onChange={(e) => setSampleA(+e.target.value)}
                />
                <b>{fmt(sampleA)}</b>
              </div>
              <div className="res">→ Nồng độ suy ra: <b>{fmt(concFromA(sampleA), 1)}</b> mg/L</div>
              <div className="quiz">
                <div className="q" dangerouslySetInnerHTML={{ __html: qText }} />
                <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
                  <input
                    ref={qInRef}
                    type="number" step={0.1} placeholder="C (mg/L)"
                    value={qInput}
                    onChange={(e) => setQInput(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter') checkQ(); }}
                  />
                  <button className="btn" onClick={checkQ}>Kiểm tra</button>
                  <button className="btn ghost" onClick={newQ}>🎲 A khác</button>
                </div>
                {fb && (
                  <div
                    className={`qfb show ${fb.ok ? 'ok' : 'no'}`}
                    dangerouslySetInnerHTML={{ __html: fb.html }}
                  />
                )}
              </div>
            </div>
          )}

          <div className="note">
            Định luật Beer–Lambert: A = ε·l·C → A tỉ lệ tuyến tính với nồng độ. Dựng đường chuẩn
            A = a·C + b từ các dung dịch chuẩn (hồi quy bình phương tối thiểu), R² càng gần 1 càng
            tốt; rồi suy <b>C = (A − b) / a</b> cho mẫu thử.
          </div>
        </div>
      </div>
    </div>
  );
}

const scopedCss = `
.cal-scope { --bg-1:#0f172a; --bg-2:#1e293b; --accent:#0ea5e9; --ok:#10b981; --err:#ef4444;
  margin:-1rem calc(50% - 50vw); padding:0; min-height:100vh; color:#fff;
  background:radial-gradient(ellipse 80% 50% at 50% 0%, rgba(14,165,233,.16), transparent), linear-gradient(180deg,var(--bg-1),var(--bg-2)); }
.cal-scope * { box-sizing:border-box; }
.cal-scope .topbar { position:sticky; top:0; z-index:10; display:flex; gap:14px; align-items:center; padding:10px 16px;
  background:rgba(0,0,0,.4); backdrop-filter:blur(10px); border-bottom:1px solid rgba(255,255,255,.08); font-size:13px; }
.cal-scope .topbar a { color:#fff; opacity:.8; text-decoration:none; } .cal-scope .topbar a:hover { opacity:1; }
.cal-scope .topbar .title { font-weight:700; } .cal-scope .topbar .spacer { flex:1; } .cal-scope .topbar .score { color:var(--accent); font-weight:800; }
.cal-scope .wrap { max-width:900px; margin:0 auto; padding:18px 18px 60px; display:flex; gap:24px; flex-wrap:wrap; align-items:flex-start; justify-content:center; }
.cal-scope .left { flex:0 0 420px; max-width:100%; }
.cal-scope canvas { display:block; background:rgba(255,255,255,.03); border:1px solid rgba(255,255,255,.1); border-radius:12px; width:100%; height:auto; }
.cal-scope .right { flex:1; min-width:260px; max-width:380px; }
.cal-scope .card { background:rgba(255,255,255,.05); border:1px solid rgba(255,255,255,.12); border-radius:14px; padding:16px 18px; margin-bottom:14px; }
.cal-scope table { width:100%; border-collapse:collapse; font-size:13px; }
.cal-scope th,.cal-scope td { padding:5px 6px; text-align:center; border-bottom:1px solid rgba(255,255,255,.08); }
.cal-scope th { opacity:.7; font-weight:600; }
.cal-scope .eq { font-size:15px; font-weight:700; color:var(--accent); margin:6px 0; } .cal-scope .eq small { color:#fff; opacity:.7; font-weight:600; }
.cal-scope .ctrl { display:flex; align-items:center; gap:10px; margin:10px 0; font-size:14px; } .cal-scope .ctrl input[type=range]{ flex:1; accent-color:var(--accent); }
.cal-scope .res { font-size:15px; } .cal-scope .res b { color:var(--accent); font-size:20px; }
.cal-scope .btn { background:var(--accent); color:#042435; border:none; padding:10px 15px; border-radius:10px; font-family:inherit; font-weight:800; font-size:13.5px; cursor:pointer; }
.cal-scope .btn.ghost { background:transparent; border:1px solid rgba(255,255,255,.25); color:#fff; }
.cal-scope .btn:disabled { opacity:.45; cursor:not-allowed; }
.cal-scope .quiz { margin-top:12px; background:rgba(14,165,233,.08); border:1px solid rgba(14,165,233,.3); border-radius:12px; padding:14px 16px; }
.cal-scope .quiz .q { font-size:13.5px; margin-bottom:9px; line-height:1.5; }
.cal-scope .quiz input[type=number]{ width:110px; background:#1e293b; color:#fff; border:1px solid rgba(255,255,255,.2); border-radius:9px; padding:8px 10px; font-family:inherit; }
.cal-scope .qfb { margin-top:9px; font-size:13.5px; display:none; } .cal-scope .qfb.show{display:block;} .cal-scope .qfb.ok{color:#34d399;} .cal-scope .qfb.no{color:#f87171;}
.cal-scope .note { font-size:12px; opacity:.6; margin-top:8px; line-height:1.5; }
`;
