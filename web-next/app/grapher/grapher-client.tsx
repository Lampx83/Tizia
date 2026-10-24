'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

// ── Port nguyên hành vi từ public/grapher.html ──
// Trang tương tác thuần: canvas vẽ đồ thị + slider hệ số + phần củng cố (quiz cố định
// gắn với công cụ, ghi tiến độ vào localStorage). Không gọi API, không auth-gate.

type FnType = 'linear' | 'quad' | 'sin';

const W = 700;
const H = 520;
const SCALE = 26; // px mỗi đơn vị
const cx = W / 2;
const cy = H / 2;
const toX = (wx: number) => cx + wx * SCALE;
const toY = (wy: number) => cy - wy * SCALE;

const TYPES: Record<FnType, { label: string; uses: string[] }> = {
  linear: { label: 'Bậc nhất', uses: ['a', 'b'] },
  quad: { label: 'Bậc hai', uses: ['a', 'b', 'c'] },
  sin: { label: 'Lượng giác (sin)', uses: ['a', 'b', 'c'] },
};

const fmt = (v: number) => (v >= 0 ? '+' : '−') + Math.abs(v).toFixed(1);

// Phần củng cố: bộ 3 câu cố định gắn với công cụ (scaffolding sư phạm), không phải
// nội dung nghiệp vụ trong DB → giữ nguyên như bản gốc (chưa có API).
const QUIZ = [
  { q: 'Đồ thị hàm số bậc hai y = ax² + bx + c (a≠0) là đường gì?', o: ['Parabol', 'Đường thẳng', 'Đường tròn', 'Hình sin'], a: 0, fb: 'Hàm bậc hai luôn cho đồ thị là một parabol.' },
  { q: 'Parabol y = ax² + bx + c có a > 0 thì bề lõm hướng?', o: ['Lên trên (có điểm thấp nhất)', 'Xuống dưới', 'Sang phải', 'Sang trái'], a: 0, fb: 'a>0 ⇒ bề lõm lên trên, đỉnh là điểm thấp nhất (giá trị nhỏ nhất).' },
  { q: 'Hàm bậc nhất y = ax + b với a < 0 thì hàm số?', o: ['Nghịch biến (đồ thị đi xuống)', 'Đồng biến', 'Không đổi', 'Tuần hoàn'], a: 0, fb: 'a<0 ⇒ x tăng thì y giảm ⇒ nghịch biến, đường thẳng dốc xuống.' },
] as const;

export default function GrapherClient() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [type, setType] = useState<FnType>('quad');
  const [a, setA] = useState(1);
  const [b, setB] = useState(0);
  const [c, setC] = useState(0);
  const [domain, setDomain] = useState<string | null>(null);

  // Quiz state
  const [answered, setAnswered] = useState<Set<number>>(new Set());
  const [picked, setPicked] = useState<Record<number, number>>({});
  const [toast, setToast] = useState('');
  const toastT = useRef<ReturnType<typeof setTimeout> | null>(null);

  const f = useCallback(
    (x: number) => {
      if (type === 'linear') return a * x + b;
      if (type === 'quad') return a * x * x + b * x + c;
      return a * Math.sin(b * x + c);
    },
    [type, a, b, c],
  );

  // ── init từ query string: domain / type / auto ──
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setDomain(params.get('domain'));
    const qType = params.get('type');
    if (qType === 'linear' || qType === 'quad' || qType === 'sin') {
      applyType(qType);
    } else {
      applyType('quad');
    }
    if (params.get('auto') === '1') {
      setA(0.5);
      setB(-1);
      setC(-2);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Đặt hệ số mặc định gợi ý cho từng loại (giống setType bản gốc).
  function applyType(k: FnType) {
    setType(k);
    if (k === 'quad') {
      setA(1);
      setB(0);
      setC(0);
    } else if (k === 'linear') {
      setA(1);
      setB(0);
    } else {
      setA(2);
      setB(1);
      setC(0);
    }
  }

  // ── vẽ ──
  useEffect(() => {
    const cv = canvasRef.current;
    if (!cv) return;
    const ctx = cv.getContext('2d');
    if (!ctx) return;

    // grid
    ctx.clearRect(0, 0, W, H);
    ctx.lineWidth = 1;
    const ux = Math.floor(W / 2 / SCALE);
    const uy = Math.floor(H / 2 / SCALE);
    ctx.strokeStyle = 'rgba(255,255,255,.07)';
    ctx.fillStyle = 'rgba(255,255,255,.4)';
    ctx.font = '10px ui-monospace,monospace';
    for (let i = -ux; i <= ux; i++) {
      const x = toX(i);
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, H);
      ctx.stroke();
      if (i !== 0 && i % 2 === 0) ctx.fillText(String(i), x + 2, cy + 12);
    }
    for (let j = -uy; j <= uy; j++) {
      const y = toY(j);
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(W, y);
      ctx.stroke();
      if (j !== 0 && j % 2 === 0) ctx.fillText(String(j), cx + 4, y - 2);
    }
    // trục
    ctx.strokeStyle = 'rgba(255,255,255,.45)';
    ctx.lineWidth = 1.6;
    ctx.beginPath();
    ctx.moveTo(0, cy);
    ctx.lineTo(W, cy);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(cx, 0);
    ctx.lineTo(cx, H);
    ctx.stroke();
    ctx.fillStyle = 'rgba(255,255,255,.55)';
    ctx.fillText('x', W - 12, cy - 6);
    ctx.fillText('y', cx + 6, 12);
    ctx.fillText('O', cx + 4, cy + 13);

    // curve
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 2.4;
    ctx.beginPath();
    let started = false;
    for (let px = 0; px <= W; px++) {
      const wx = (px - cx) / SCALE;
      const wy = f(wx);
      const py = toY(wy);
      if (py < -200 || py > H + 200) {
        started = false;
        continue;
      }
      if (!started) {
        ctx.moveTo(px, py);
        started = true;
      } else {
        ctx.lineTo(px, py);
      }
    }
    ctx.stroke();
    // điểm đặc biệt cho parabol: đỉnh
    if (type === 'quad' && a !== 0) {
      const vx = -b / (2 * a);
      const vy = f(vx);
      ctx.fillStyle = '#fde68a';
      ctx.beginPath();
      ctx.arc(toX(vx), toY(vy), 4, 0, 7);
      ctx.fill();
    }
  }, [type, a, b, c, f]);

  // ── phương trình hiển thị ──
  let eq: string;
  if (type === 'linear') eq = `y = ${a.toFixed(1)}·x ${fmt(b)}`;
  else if (type === 'quad') eq = `y = ${a.toFixed(1)}·x² ${fmt(b)}·x ${fmt(c)}`;
  else eq = `y = ${a.toFixed(1)}·sin( ${b.toFixed(1)}·x ${fmt(c)} )`;

  // ── info (HTML như bản gốc) ──
  function infoHtml(): string {
    let h = '';
    if (type === 'linear') {
      const trend = a > 0 ? 'đồng biến (đi lên)' : a < 0 ? 'nghịch biến (đi xuống)' : 'hàm hằng (đường ngang)';
      h = `<h3>Đường thẳng</h3>Hệ số góc <span class="k">a=${a.toFixed(1)}</span> ⇒ ${trend}.<br>Cắt trục Oy tại <span class="k">(0; ${b.toFixed(1)})</span>.`;
      if (a !== 0) h += `<br>Nghiệm (cắt Ox): <span class="k">x = ${(-b / a).toFixed(2)}</span>.`;
    } else if (type === 'quad') {
      if (a === 0) {
        h = `<h3>Lưu ý</h3>Khi <span class="k">a=0</span> thì không còn là hàm bậc hai (thành đường thẳng).`;
      } else {
        const vx = -b / (2 * a);
        const vy = a * vx * vx + b * vx + c;
        const D = b * b - 4 * a * c;
        const lom = a > 0 ? 'lên trên (có giá trị nhỏ nhất)' : 'xuống dưới (có giá trị lớn nhất)';
        h = `<h3>Parabol</h3>Bề lõm hướng ${lom}.<br>Đỉnh <span class="k">I(${vx.toFixed(2)}; ${vy.toFixed(2)})</span>.<br>Biệt thức <span class="k">Δ = ${D.toFixed(2)}</span> ⇒ `;
        if (D > 0) {
          const r1 = (-b - Math.sqrt(D)) / (2 * a);
          const r2 = (-b + Math.sqrt(D)) / (2 * a);
          h += `hai nghiệm <span class="k">x₁=${Math.min(r1, r2).toFixed(2)}, x₂=${Math.max(r1, r2).toFixed(2)}</span>.`;
        } else if (Math.abs(D) < 1e-9) {
          h += `nghiệm kép <span class="k">x = ${(-b / (2 * a)).toFixed(2)}</span>.`;
        } else {
          h += `vô nghiệm (không cắt Ox).`;
        }
      }
    } else {
      const T = b !== 0 ? (2 * Math.PI) / Math.abs(b) : Infinity;
      h = `<h3>Hàm sin</h3>Biên độ <span class="k">|a| = ${Math.abs(a).toFixed(1)}</span>.<br>Chu kì <span class="k">T = 2π/|b| = ${isFinite(T) ? T.toFixed(2) : '∞'}</span>.<br>Dịch pha theo <span class="k">c = ${c.toFixed(1)}</span>.`;
    }
    return h;
  }

  function showToast(m: string) {
    setToast(m);
    if (toastT.current) clearTimeout(toastT.current);
    toastT.current = setTimeout(() => setToast(''), 2400);
  }

  function answer(qi: number, oi: number) {
    if (answered.has(qi)) return;
    const it = QUIZ[qi];
    const correct = oi === it.a;
    setPicked((p) => ({ ...p, [qi]: oi }));
    const next = new Set(answered);
    next.add(qi);
    setAnswered(next);
    if (correct) showToast('✓ Củng cố: +1');
    if (next.size === QUIZ.length) {
      try {
        const k = 'tizia:space:done';
        const d = JSON.parse(localStorage.getItem(k) || '{}');
        d.grapher = Math.max(d.grapher || 0, QUIZ.length);
        localStorage.setItem(k, JSON.stringify(d));
      } catch {
        /* ignore */
      }
      showToast('🏆 Hoàn thành phần củng cố đồ thị!');
    }
  }

  const backHref = '/school' + (domain ? '?domain=' + encodeURIComponent(domain) : '') + '#campus-hero';
  const uses = TYPES[type].uses;
  const setVal = { a: setA, b: setB, c: setC } as const;
  const vals = { a, b, c };

  return (
    <div className="grapher-root">
      <style>{grapherCss}</style>
      <div className="top">
        <a className="back" href={backHref}>
          ← Khuôn viên trường
        </a>
        <div>
          <h1>
            📈 Đồ thị hàm số <span className="sub">— kéo hệ số, xem đồ thị đổi ngay</span>
          </h1>
        </div>
        <div className="prog">{answered.size}/3 củng cố</div>
      </div>

      <div className="wrap">
        <div className="panel">
          <div className="types">
            {(Object.keys(TYPES) as FnType[]).map((k) => (
              <button key={k} className={k === type ? 'active' : ''} onClick={() => applyType(k)}>
                {TYPES[k].label}
              </button>
            ))}
          </div>
          <canvas ref={canvasRef} width={W} height={H} />
        </div>

        <div className="panel">
          <div className="eq">{eq}</div>
          <div className="sliders">
            {(['a', 'b', 'c'] as const).map((id) => (
              <div key={id} className={'row' + (id === 'c' && !uses.includes('c') ? ' hide' : '')}>
                <label>{id}</label>
                <input
                  type="range"
                  min={-5}
                  max={5}
                  step={0.1}
                  value={vals[id]}
                  onChange={(e) => setVal[id](parseFloat(e.target.value))}
                />
                <span className="val">{vals[id].toFixed(1)}</span>
              </div>
            ))}
          </div>
          <button className="reset" onClick={() => applyType(type)}>
            ↺ Đặt lại hệ số
          </button>
          <div className="info" style={{ marginTop: 14 }} dangerouslySetInnerHTML={{ __html: infoHtml() }} />

          <div className="reinforce">
            <h3 style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: '.5px', opacity: 0.55, margin: '14px 0 2px' }}>
              💡 Củng cố
            </h3>
            {QUIZ.map((it, qi) => {
              const done = answered.has(qi);
              const pick = picked[qi];
              const correct = done && pick === it.a;
              return (
                <div className="q" key={qi}>
                  <div className="qt">
                    {qi + 1}. {it.q}
                  </div>
                  {it.o.map((o, oi) => {
                    let cls = 'opt';
                    if (done && oi === it.a) cls += ' ok';
                    else if (done && oi === pick) cls += ' no';
                    return (
                      <button key={oi} className={cls} onClick={() => answer(qi, oi)}>
                        {o}
                      </button>
                    );
                  })}
                  <div className={'fb' + (done ? ' show' : '')}>
                    {done ? (correct ? '✓ Đúng! ' : '✗ Chưa đúng. ') + it.fb : ''}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className={'toast' + (toast ? ' show' : '')}>{toast}</div>
    </div>
  );
}

// CSS gốc scoped dưới .grapher-root — giữ thương hiệu amber/dark riêng của trang.
const grapherCss = `
.grapher-root { --accent:#f59e0b; --card:rgba(255,255,255,.05); --border:rgba(255,255,255,.12); --ok:#22c55e; color:#e5edf7; }
.grapher-root .top { display:flex; align-items:center; gap:14px; padding:12px 0 14px; margin-bottom:8px; border-bottom:1px solid var(--border); }
.grapher-root .back { color:#fff; text-decoration:none; opacity:.85; font-size:13.5px; background:rgba(255,255,255,.08); padding:7px 12px; border-radius:9px; }
.grapher-root .back:hover { opacity:1; background:rgba(255,255,255,.16); }
.grapher-root .top h1 { margin:0; font-size:17px; font-weight:800; }
.grapher-root .top .sub { font-size:12.5px; opacity:.6; font-weight:500; }
.grapher-root .top .prog { margin-left:auto; font-size:13px; font-weight:700; background:rgba(245,158,11,.16); border:1px solid rgba(245,158,11,.45); color:#fcd34d; padding:6px 12px; border-radius:20px; }
.grapher-root .wrap { display:grid; grid-template-columns:1fr 320px; gap:16px; }
@media (max-width:880px){ .grapher-root .wrap{ grid-template-columns:1fr; } }
.grapher-root .panel { background:var(--card); border:1px solid var(--border); border-radius:14px; padding:14px 16px; }
.grapher-root canvas { width:100%; height:auto; display:block; background:#070b16; border-radius:11px; border:1px solid var(--border); }
.grapher-root .types { display:flex; gap:8px; margin-bottom:12px; flex-wrap:wrap; }
.grapher-root .types button { background:rgba(255,255,255,.06); border:1px solid var(--border); color:#cbd5e1; font-size:13px; font-weight:600; padding:8px 13px; border-radius:10px; cursor:pointer; font-family:inherit; }
.grapher-root .types button:hover { background:rgba(255,255,255,.12); }
.grapher-root .types button.active { background:rgba(245,158,11,.16); border-color:rgba(245,158,11,.5); color:#fde68a; }
.grapher-root .eq { font-family:ui-monospace,monospace; font-size:18px; font-weight:700; color:#fde68a; margin:2px 0 14px; }
.grapher-root .sliders .row { display:grid; grid-template-columns:30px 1fr 56px; align-items:center; gap:10px; margin:9px 0; }
.grapher-root .sliders .row label { font-weight:800; font-family:ui-monospace,monospace; }
.grapher-root .sliders input[type=range]{ width:100%; accent-color:var(--accent); }
.grapher-root .sliders .val { font-family:ui-monospace,monospace; font-size:13px; text-align:right; opacity:.9; }
.grapher-root .sliders .row.hide { display:none; }
.grapher-root .info { font-size:13px; line-height:1.6; }
.grapher-root .info h3 { font-size:12px; text-transform:uppercase; letter-spacing:.5px; opacity:.55; margin:0 0 6px; }
.grapher-root .info .k { color:#fcd34d; font-family:ui-monospace,monospace; }
.grapher-root .reinforce { margin-top:4px; }
.grapher-root .q { border-top:1px solid var(--border); padding:11px 0 4px; }
.grapher-root .q .qt { font-size:13px; font-weight:700; margin-bottom:7px; }
.grapher-root .q .opt { display:block; width:100%; text-align:left; background:rgba(255,255,255,.04); border:1px solid var(--border); color:#e5edf7; padding:7px 10px; border-radius:9px; margin:4px 0; font-size:12.5px; cursor:pointer; font-family:inherit; }
.grapher-root .q .opt:hover { background:rgba(255,255,255,.09); }
.grapher-root .q .opt.ok { background:rgba(34,197,94,.2); border-color:#22c55e; }
.grapher-root .q .opt.no { background:rgba(239,68,68,.18); border-color:#ef4444; }
.grapher-root .q .fb { font-size:12px; margin-top:5px; opacity:0; transition:.2s; color:#bbf7d0; }
.grapher-root .q .fb.show{ opacity:.95; }
.grapher-root .reset { margin-top:10px; background:rgba(255,255,255,.08); color:#fff; border:none; border-radius:9px; padding:8px 13px; font-weight:700; font-size:12.5px; cursor:pointer; }
.grapher-root .toast { position:fixed; left:50%; bottom:22px; transform:translateX(-50%) translateY(20px); background:var(--ok); color:#04210f; font-weight:800; padding:12px 22px; border-radius:13px; box-shadow:0 12px 30px rgba(0,0,0,.4); opacity:0; transition:.3s; z-index:20; }
.grapher-root .toast.show { opacity:1; transform:translateX(-50%) translateY(0); }
`;
