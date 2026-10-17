'use client';

import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';

// Tốc độ truyền dịch (IV) — port nguyên logic từ public/iv-infusion.html.
// Không có content từ DB: đề bài câu tự-kiểm sinh ngẫu nhiên bằng công thức,
// điểm gửi qua /api/attempts (submitAttempt). Canvas mô phỏng bầu đếm giọt.

// gtt/phút = (V × giọt/mL) ÷ (T × 60);  mL/giờ = V ÷ T
function calc(v: number, t: number, f: number) {
  const mlh = v / t;
  const gtt = (v * f) / (t * 60);
  return { mlh, gtt };
}
function fmt(n: number) {
  return Math.round(n * 10) / 10;
}

// Gửi điểm luyện tập. Guest (401) → degrade im lặng, không cắt ngang.
async function submitAttempt(payload: Record<string, unknown>) {
  try {
    const res = await fetch('/api/attempts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'same-origin',
      body: JSON.stringify(payload),
    });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

const CH = { x: 96, top: 150, bottom: 250, w: 48, fluidY: 228 }; // bầu đếm giọt

export default function IvInfusion() {
  const [vol, setVol] = useState(1000);
  const [time, setTime] = useState(8);
  const [factor, setFactor] = useState(20);

  const [qText, setQText] = useState<string>(
    'Bấm “Câu hỏi mới” để luyện tính tốc độ giọt/phút.',
  );
  const [qShow, setQShow] = useState(false); // hiện ô nhập + nút kiểm tra
  const [qIn, setQIn] = useState('');
  const [qFb, setQFb] = useState<{ kind: 'ok' | 'no'; html: string } | null>(null);
  const [score, setScore] = useState(0);
  const [scoreShown, setScoreShown] = useState(false);

  const qAnsRef = useRef<number | null>(null);
  const qInputRef = useRef<HTMLInputElement>(null);

  // Kết quả tính trực tiếp từ input hợp lệ.
  const valid = vol > 0 && time > 0 && factor > 0;
  const r = valid ? calc(vol, time, factor) : { mlh: 0, gtt: 0 };
  const gttPerMin = valid ? r.gtt : 0;

  // === Canvas: bầu dịch + bầu đếm giọt + giọt rơi ===
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gttRef = useRef(gttPerMin);
  gttRef.current = gttPerMin;

  useEffect(() => {
    const cv = canvasRef.current;
    if (!cv) return;
    const c = cv.getContext('2d');
    if (!c) return;

    let raf = 0;
    let drops: { y: number }[] = [];
    let acc = 0;
    let last = performance.now();

    function draw() {
      if (!c) return;
      c.clearRect(0, 0, 240, 420);
      // Túi dịch IV
      c.fillStyle = '#1e293b';
      c.strokeStyle = '#94a3b8';
      c.lineWidth = 2;
      c.beginPath();
      c.roundRect(78, 20, 84, 110, 12);
      c.fill();
      c.stroke();
      c.fillStyle = 'rgba(106,160,214,0.5)';
      c.beginPath();
      c.roundRect(82, 46, 76, 80, 8);
      c.fill();
      c.fillStyle = '#cbd5e1';
      c.font = '11px Inter';
      c.textAlign = 'center';
      c.fillText('Dịch truyền', 120, 90);
      c.fillRect(116, 12, 8, 10); // móc treo
      // ống túi → bầu đếm
      c.strokeStyle = '#cbd5e1';
      c.lineWidth = 3;
      c.beginPath();
      c.moveTo(120, 130);
      c.lineTo(120, CH.top);
      c.stroke();
      // bầu đếm giọt
      c.fillStyle = 'rgba(255,255,255,0.06)';
      c.strokeStyle = '#cbd5e1';
      c.lineWidth = 2;
      c.beginPath();
      c.roundRect(CH.x, CH.top, CH.w, CH.bottom - CH.top, 6);
      c.fill();
      c.stroke();
      // dịch đọng đáy bầu
      c.fillStyle = 'rgba(106,160,214,0.55)';
      c.beginPath();
      c.roundRect(CH.x + 2, CH.fluidY, CH.w - 4, CH.bottom - CH.fluidY - 2, 4);
      c.fill();
      // đầu nhỏ giọt
      c.fillStyle = '#94a3b8';
      c.fillRect(116, CH.top, 8, 8);
      // giọt
      c.fillStyle = '#bfdbfe';
      for (const d of drops) {
        c.beginPath();
        c.ellipse(120, d.y, 3.2, 4.6, 0, 0, 7);
        c.fill();
      }
      // ống bầu → bệnh nhân
      c.strokeStyle = '#cbd5e1';
      c.lineWidth = 3;
      c.beginPath();
      c.moveTo(120, CH.bottom);
      c.lineTo(120, 300);
      c.lineTo(120, 330);
      c.stroke();
      // cánh tay / kim luồn
      c.fillStyle = '#f1d3b8';
      c.beginPath();
      c.roundRect(70, 330, 100, 40, 10);
      c.fill();
      c.strokeStyle = '#dc2626';
      c.lineWidth = 2;
      c.beginPath();
      c.moveTo(120, 330);
      c.lineTo(120, 348);
      c.stroke();
      c.fillStyle = '#94a3b8';
      c.font = '11px Inter';
      c.fillText('Tĩnh mạch', 120, 388);
      // nhãn tốc độ
      c.fillStyle = '#6aa0d6';
      c.font = 'bold 14px Inter';
      c.fillText(Math.round(gttRef.current) + ' giọt/phút', 120, 410);
    }

    function tick(now: number) {
      const dt = now - last;
      last = now;
      // sinh giọt theo tốc độ (giới hạn hình ảnh 150/phút)
      const rate = Math.min(gttRef.current, 150);
      if (rate > 0) {
        acc += dt;
        const interval = 60000 / rate;
        if (acc >= interval) {
          acc = 0;
          drops.push({ y: CH.top + 8 });
        }
      }
      for (const d of drops) d.y += dt * 0.18;
      drops = drops.filter((d) => d.y < CH.fluidY);
      draw();
      raf = requestAnimationFrame(tick);
    }

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  // === Câu hỏi tự-kiểm ===
  const newQ = useCallback(() => {
    const vArr = [500, 1000, 250, 1500];
    const tArr = [4, 6, 8, 12];
    const fArr = [20, 60];
    const v = vArr[Math.floor(Math.random() * vArr.length)];
    const t = tArr[Math.floor(Math.random() * tArr.length)];
    const f = fArr[Math.floor(Math.random() * fArr.length)];
    qAnsRef.current = Math.round((v * f) / (t * 60));
    setQText(
      `Truyền ${v} mL trong ${t} giờ, bộ dây ${f} giọt/mL. Chỉnh bao nhiêu giọt/phút?`,
    );
    setQShow(true);
    setQIn('');
    setQFb(null);
    setScoreShown(true);
    setTimeout(() => qInputRef.current?.focus(), 0);
  }, []);

  const checkQ = useCallback(() => {
    const ans = qAnsRef.current;
    if (ans == null) return;
    const v = parseFloat(qIn);
    if (isNaN(v)) {
      setQFb({ kind: 'no', html: 'Nhập số giọt/phút.' });
      return;
    }
    const ok = Math.abs(v - ans) <= 1;
    if (ok) {
      setScore((s) => {
        const ns = s + 1;
        setQFb({ kind: 'ok', html: `✓ Chính xác! (${ans} giọt/phút)  +1` });
        submitAttempt({
          version: 'iv-infusion',
          score: ns,
          correct: ns,
          total: ns,
          durationMs: 0,
          details: {},
        });
        return ns;
      });
    } else {
      setQFb({
        kind: 'no',
        html: `✗ Chưa đúng. = (V×giọt/mL)÷(T×60) = <b>${ans}</b> giọt/phút.`,
      });
    }
  }, [qIn]);

  return (
    <div className="w-full">
      <div className="mb-4 flex items-center gap-3 text-sm">
        <Link
          href="/space?b=clinic&domain=pharmacy"
          className="text-muted-foreground hover:text-foreground"
        >
          ← BV Thực hành
        </Link>
        <span className="font-bold">💧 Tốc độ truyền dịch (IV)</span>
        <span className="flex-1" />
        {scoreShown && (
          <span>
            🎯 <span className="font-extrabold text-primary">{score}</span>
          </span>
        )}
      </div>

      <div className="flex flex-wrap items-start justify-center gap-6">
        {/* Canvas trái */}
        <div className="flex flex-[0_0_240px] flex-col items-center">
          <canvas ref={canvasRef} width={240} height={420} className="block" />
        </div>

        {/* Bảng điều khiển phải */}
        <div className="min-w-[280px] max-w-[420px] flex-1">
          <div className="mb-3.5 rounded-2xl border bg-card/60 p-4">
            <label className="my-2 flex items-center justify-between gap-2.5 text-sm">
              <span>Thể tích cần truyền V (mL)</span>
              <input
                type="number"
                value={vol}
                min={1}
                step={50}
                onChange={(e) => setVol(Number(e.target.value))}
                className="w-[130px] rounded-lg border bg-background px-3 py-2 text-sm text-foreground"
              />
            </label>
            <label className="my-2 flex items-center justify-between gap-2.5 text-sm">
              <span>Thời gian truyền T (giờ)</span>
              <input
                type="number"
                value={time}
                min={0.5}
                step={0.5}
                onChange={(e) => setTime(Number(e.target.value))}
                className="w-[130px] rounded-lg border bg-background px-3 py-2 text-sm text-foreground"
              />
            </label>
            <label className="my-2 flex items-center justify-between gap-2.5 text-sm">
              <span>Bộ dây (giọt/mL)</span>
              <select
                value={factor}
                onChange={(e) => setFactor(Number(e.target.value))}
                className="w-[130px] rounded-lg border bg-background px-3 py-2 text-sm text-foreground"
              >
                <option value={20}>20 (dây thường)</option>
                <option value={15}>15</option>
                <option value={60}>60 (micro)</option>
              </select>
            </label>
            <div className="my-2.5 text-center text-sm text-muted-foreground">
              gtt/phút = (V × giọt/mL) ÷ (T × 60)
            </div>
            <div className="flex justify-around gap-4 rounded-xl border border-primary/40 bg-primary/10 px-4 py-3.5 text-center">
              <div>
                <div className="text-3xl font-extrabold text-primary">
                  {valid ? fmt(r.mlh) : '—'}
                </div>
                <div className="text-[11px] uppercase tracking-wide opacity-75">
                  mL / giờ
                </div>
              </div>
              <div>
                <div className="text-3xl font-extrabold text-primary">
                  {valid ? Math.round(r.gtt) : '—'}
                </div>
                <div className="text-[11px] uppercase tracking-wide opacity-75">
                  giọt / phút
                </div>
              </div>
            </div>
          </div>

          {/* Câu hỏi tự-kiểm */}
          <div className="mt-3.5 rounded-xl border border-primary/30 bg-primary/[0.08] px-4 py-3.5">
            <div className="mb-2.5 text-sm leading-relaxed">{qText}</div>
            <div className="flex flex-wrap items-center gap-2">
              {qShow && (
                <input
                  ref={qInputRef}
                  type="number"
                  step={1}
                  placeholder="giọt/phút"
                  value={qIn}
                  onChange={(e) => setQIn(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') checkQ();
                  }}
                  className="w-[130px] rounded-lg border bg-background px-3 py-2 text-sm text-foreground"
                />
              )}
              {qShow && (
                <button
                  onClick={checkQ}
                  className="cursor-pointer rounded-lg bg-primary px-3.5 py-2 text-[13.5px] font-extrabold text-primary-foreground"
                >
                  Kiểm tra
                </button>
              )}
              <button
                onClick={newQ}
                className="cursor-pointer rounded-lg border bg-transparent px-3.5 py-2 text-[13.5px] font-extrabold text-foreground"
              >
                🎲 Câu hỏi mới
              </button>
            </div>
            {qFb && (
              <div
                className={
                  'mt-2.5 text-[13.5px] ' +
                  (qFb.kind === 'ok' ? 'text-emerald-400' : 'text-red-400')
                }
                dangerouslySetInnerHTML={{ __html: qFb.html }}
              />
            )}
          </div>

          <div className="mt-2.5 text-xs leading-relaxed opacity-60">
            mL/giờ = V ÷ T. Số giọt/phút phụ thuộc bộ dây truyền (drip factor):
            dây thường ~20 giọt/mL, bộ micro 60 giọt/mL (truyền nhi/chính xác).
            Số liệu minh hoạ.
          </div>
        </div>
      </div>
    </div>
  );
}
